"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Filter, LogOut, Loader2 } from "lucide-react";
import { getSession, clearSession, type User } from "@/lib/auth-client";
import SearchResults from "./SearchResults";

interface SearchAsset {
  id: number;
  title: string;
  description: string;
  type: string;
  category: string;
  tags: string[];
}

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchAsset[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUser(getSession());
  }, []);

  // Close search results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Search functionality
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        await performSearch(searchQuery.trim());
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 300); // Debounce search by 300ms

    return () => clearTimeout(searchTimeout);
  }, [searchQuery]);

  async function performSearch(query: string) {
    setIsSearching(true);
    setShowResults(true);

    try {
      const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
      const strapiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || '';
      const userSession = getSession();
      const isInternal = userSession?.isInternal || false;

      // Fetch all assets and filter client-side (more reliable than complex Strapi queries)
      const populateParam = 'populate=*';
      const sortParam = 'sort[0]=updatedAt:desc';
      const queryString = `${populateParam}&${sortParam}`;
      const apiUrl = `${strapiUrl}/api/vault-assets?${queryString}`;

      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': strapiToken ? `Bearer ${strapiToken}` : '',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Search failed:', response.status, errorText);
        throw new Error(`Search failed: ${response.status}`);
      }

      const data = await response.json();
      let items = data?.data || [];

      // Filter out internal-only assets for non-internal users
      if (!isInternal) {
        items = items.filter((item: any) => {
          const attributes = item.attributes || item;
          const itemIsInternal = attributes.isInternal === true;
          const itemCategory = attributes.category;
          return !itemIsInternal && itemCategory !== 'internal-only';
        });
      }

      // Client-side search filtering
      const searchLower = query.toLowerCase();
      items = items.filter((item: any) => {
        const attributes = item.attributes || item;
        const title = (attributes.title || '').toLowerCase();
        const description = (attributes.description || '').toLowerCase();
        
        // Handle tags - could be array or string
        let tagsText = '';
        if (Array.isArray(attributes.tags)) {
          tagsText = attributes.tags.join(' ').toLowerCase();
        } else if (typeof attributes.tags === 'string') {
          tagsText = attributes.tags.toLowerCase();
        }

        return (
          title.includes(searchLower) ||
          description.includes(searchLower) ||
          tagsText.includes(searchLower)
        );
      });

      // Limit to 10 results
      items = items.slice(0, 10);

      console.log('Search results count:', items.length);

      // Transform results
      const results: SearchAsset[] = items.map((item: any) => {
        const attributes = item.attributes || item;
        let tagsArray: string[] = [];
        if (Array.isArray(attributes.tags)) {
          tagsArray = attributes.tags;
        } else if (typeof attributes.tags === 'string') {
          tagsArray = attributes.tags.split(',').map((t: string) => t.trim());
        }

        return {
          id: item.id || item.documentId,
          title: attributes.title || '',
          description: attributes.description || '',
          type: attributes.type || 'DOC',
          category: attributes.category || 'dashboard',
          tags: tagsArray,
        };
      });

      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      clearSession();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Error logging out:", error);
      setIsLoggingOut(false);
    }
  };

  const initials = user?.name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "U";

  return (
    <header className="bg-gray-50 border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <div className="relative flex-1" ref={searchRef}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search assets, tags, descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (searchResults.length > 0) {
                  setShowResults(true);
                }
              }}
              className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {isSearching && (
              <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 animate-spin" />
            )}
            {showResults && searchQuery.trim().length >= 2 && (
              <SearchResults
                results={searchResults}
                onClose={() => setShowResults(false)}
                searchQuery={searchQuery}
              />
            )}
          </div>
          <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <Filter className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* User Profile with Logout */}
        {user && (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
              {user.picture ? (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                initials
              )}
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-600">Sales</p>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50"
              title="Logout"
            >
              {isLoggingOut ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <LogOut className="w-4 h-4" />
              )}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

