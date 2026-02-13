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
  status?: string; // For filtering internal/external
}

interface FilterOptions {
  type: string[];
  category: string[];
  showInternalOnly: boolean | null; // null = show all, true = only internal, false = only external
}

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchAsset[]>([]);
  const [allSearchResults, setAllSearchResults] = useState<SearchAsset[]>([]); // Store unfiltered results
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    type: [],
    category: [],
    showInternalOnly: null,
  });
  const searchRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setUser(getSession());
  }, []);

  // Close search results and filter dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Apply filters to search results
  useEffect(() => {
    if (allSearchResults.length === 0) {
      setSearchResults([]);
      return;
    }

    let filtered = [...allSearchResults];

    // Filter by type
    if (filters.type.length > 0) {
      filtered = filtered.filter(asset => 
        filters.type.includes(asset.type.toUpperCase())
      );
    }

    // Filter by category
    if (filters.category.length > 0) {
      filtered = filtered.filter(asset => 
        filters.category.includes(asset.category)
      );
    }

    // Filter by internal/external status
    if (filters.showInternalOnly !== null) {
      filtered = filtered.filter(asset => {
        const isInternal = asset.status === 'Internal only' || asset.category === 'internal-only';
        return filters.showInternalOnly ? isInternal : !isInternal;
      });
    }

    setSearchResults(filtered);
  }, [filters, allSearchResults]);

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
      
      // Try to refresh isInternal status from Strapi if user session exists
      let isInternal = userSession?.isInternal || false;
      if (userSession?.email) {
        try {
          // Check current isInternal status from Strapi
          const queryParams = new URLSearchParams();
          queryParams.append('filters[email]', userSession.email);
          queryParams.append('populate', '*');
          
          const userCheckResponse = await fetch(
            `${strapiUrl}/api/users?${queryParams.toString()}`,
            {
              headers: {
                'Authorization': strapiToken ? `Bearer ${strapiToken}` : '',
                'Content-Type': 'application/json',
              },
            }
          );
          
          if (userCheckResponse.ok) {
            const userData = await userCheckResponse.json();
            const users = userData?.data || userData || [];
            const strapiUser = Array.isArray(users) ? users[0] : users;
            if (strapiUser) {
              const userAttributes = strapiUser.attributes || strapiUser;
              const strapiIsInternal = userAttributes.isInternal || false;
              
              // Update session if isInternal status changed
              if (strapiIsInternal !== isInternal && userSession) {
                const updatedSession = { ...userSession, isInternal: strapiIsInternal };
                localStorage.setItem('vault_session', JSON.stringify(updatedSession));
                isInternal = strapiIsInternal;
                console.log('Search: Updated isInternal status from Strapi:', strapiIsInternal);
              }
            }
          }
        } catch (error) {
          console.error('Search: Error refreshing user status:', error);
        }
      }
      
      // Debug: Log user session info
      console.log('Search: User session:', {
        email: userSession?.email,
        name: userSession?.name,
        isInternal: isInternal,
        sessionIsInternal: userSession?.isInternal
      });

      // Fetch all assets and filter client-side (more reliable than complex Strapi queries)
      // Use pagination to fetch all assets (Strapi defaults to 25 per page)
      const populateParam = 'populate=*';
      const sortParam = 'sort[0]=updatedAt:desc';
      const paginationParam = 'pagination[pageSize]=1000'; // Fetch up to 1000 items
      const queryString = `${populateParam}&${sortParam}&${paginationParam}`;
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
      
      console.log('Search: Initial fetch - items count:', items.length, 'isInternal:', isInternal);
      console.log('Search: Pagination meta:', data?.meta?.pagination);
      
      // If pagination exists and there are more pages, fetch them
      if (data?.meta?.pagination && data.meta.pagination.pageCount > 1) {
        const totalPages = data.meta.pagination.pageCount;
        const allItems = [...items];
        
        console.log('Search: Fetching additional pages:', totalPages - 1);
        
        // Fetch remaining pages
        for (let page = 2; page <= totalPages; page++) {
          const pageQueryString = `${populateParam}&${sortParam}&pagination[page]=${page}&pagination[pageSize]=1000`;
          const pageApiUrl = `${strapiUrl}/api/vault-assets?${pageQueryString}`;
          
          try {
            const pageResponse = await fetch(pageApiUrl, {
              headers: {
                'Authorization': strapiToken ? `Bearer ${strapiToken}` : '',
                'Content-Type': 'application/json',
              },
            });
            
            if (pageResponse.ok) {
              const pageData = await pageResponse.json();
              allItems.push(...(pageData?.data || []));
            }
          } catch (error) {
            console.error(`Error fetching page ${page}:`, error);
          }
        }
        
        items = allItems;
        console.log('Search: After fetching all pages - items count:', items.length);
      }

      // Log ALL titles before filtering to see what we have
      console.log('Search: ALL titles before filtering:', items.map((item: any) => {
        const attrs = item.attributes || item;
        return {
          title: attrs.title,
          isInternal: attrs.isInternal,
          category: attrs.category
        };
      }));
      
      // Filter out internal-only assets for non-internal users (consistent with AssetList)
      if (!isInternal) {
        items = items.filter((item: any) => {
          const attributes = item.attributes || item;
          const itemIsInternal = attributes.isInternal === true;
          const itemCategory = attributes.category;
          return !itemIsInternal && itemCategory !== 'internal-only';
        });
        console.log('Search: After filtering (non-internal user) - items count:', items.length);
      } else {
        console.log('Search: Internal user - keeping all items including internal-only');
      }

      // Client-side search filtering
      // Normalize search query: lowercase and trim
      const normalizedQuery = query.toLowerCase().trim();
      
      // Debug: Log what we're searching for and total items before filtering
      console.log('Search: Query:', normalizedQuery);
      console.log('Search: Total items before search filter:', items.length);
      
      // Log all titles for debugging
      const allTitles = items.map((item: any) => {
        const attrs = item.attributes || item;
        return attrs.title || '';
      });
      console.log('Search: All titles:', allTitles.filter((t: string) => 
        t.toLowerCase().includes('empeople') || 
        t.toLowerCase().includes('ithink') || 
        t.toLowerCase().includes('february')
      ));
      
      items = items.filter((item: any) => {
        const attributes = item.attributes || item;
        
        // Normalize and combine all searchable text
        const title = (attributes.title || '').toLowerCase();
        const description = (attributes.description || '').toLowerCase();
        const category = (attributes.category || '').toLowerCase();
        
        // Handle tags - could be array or string
        let tagsText = '';
        if (Array.isArray(attributes.tags)) {
          tagsText = attributes.tags.join(' ').toLowerCase();
        } else if (typeof attributes.tags === 'string') {
          tagsText = attributes.tags.toLowerCase();
        }
        
        // Combine all searchable fields
        const searchableText = `${title} ${description} ${category} ${tagsText}`;
        
        // Simple, flexible matching: check if any part of the query matches any part of the text
        // This handles cases like "empeople" matching "Empeople CU / Algebrik..."
        const queryLower = normalizedQuery.toLowerCase();
        
        // Strategy 1: Direct substring match (most flexible)
        const directMatch = searchableText.includes(queryLower);
        
        // Strategy 2: Word-by-word matching (each query word appears somewhere)
        const queryWords = queryLower.split(/\s+/).filter(w => w.length > 0);
        const allWordsMatch = queryWords.length > 0 && queryWords.every(word => {
          // For very short words (1-2 chars), check if they appear as whole words or parts
          if (word.length <= 2) {
            // Check if word appears in the text (as substring, not requiring word boundaries)
            return searchableText.includes(word);
          }
          // For longer words, check substring match
          return searchableText.includes(word);
        });
        
        // Strategy 3: Normalized matching (remove special chars for flexible matching)
        const normalizeForSearch = (text: string) => {
          return text
            .replace(/[^\w\s]/g, ' ')  // Replace special chars with space
            .replace(/\s+/g, ' ')        // Normalize multiple spaces
            .trim();
        };
        
        const normalizedSearchable = normalizeForSearch(searchableText);
        const normalizedQueryClean = normalizeForSearch(queryLower);
        const normalizedMatch = normalizedSearchable.includes(normalizedQueryClean);
        
        // Strategy 4: Individual word matching in normalized text
        const normalizedWordsMatch = queryWords.length > 0 && queryWords.every(word => {
          return normalizedSearchable.includes(word);
        });
        
        const matches = directMatch || allWordsMatch || normalizedMatch || normalizedWordsMatch;
        
        // Debug: Log ALL items that contain keywords we're looking for
        if (title.includes('empeople') || title.includes('ithink') || title.includes('february') || 
            title.includes('cu') || title.includes('los') || title.includes('demo')) {
          console.log('Search: Checking item:', {
            title: attributes.title,
            matches,
            directMatch,
            allWordsMatch,
            normalizedMatch,
            normalizedWordsMatch,
            query: queryLower,
            searchableText: searchableText.substring(0, 150)
          });
        }
        
        return matches;
      });
      
      console.log('Search: Items after filter:', items.length);

      // Sort results by relevance (title matches first, then description)
      items.sort((a: any, b: any) => {
        const aAttrs = a.attributes || a;
        const bAttrs = b.attributes || b;
        const aTitle = (aAttrs.title || '').toLowerCase();
        const bTitle = (bAttrs.title || '').toLowerCase();
        const normalizedQueryLower = normalizedQuery.toLowerCase();
        
        // Prioritize title matches
        const aTitleMatch = aTitle.includes(normalizedQueryLower);
        const bTitleMatch = bTitle.includes(normalizedQueryLower);
        
        if (aTitleMatch && !bTitleMatch) return -1;
        if (!aTitleMatch && bTitleMatch) return 1;
        
        // If both match in title, prioritize exact matches
        if (aTitleMatch && bTitleMatch) {
          const aExact = aTitle === normalizedQueryLower || aTitle.startsWith(normalizedQueryLower);
          const bExact = bTitle === normalizedQueryLower || bTitle.startsWith(normalizedQueryLower);
          if (aExact && !bExact) return -1;
          if (!aExact && bExact) return 1;
        }
        
        return 0;
      });

      // Limit to 20 results (increased from 10)
      items = items.slice(0, 20);

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

        const isInternal = attributes.isInternal === true || attributes.category === 'internal-only';
        
        return {
          id: item.id || item.documentId,
          title: attributes.title || '',
          description: attributes.description || '',
          type: attributes.type || 'DOC',
          category: attributes.category || 'dashboard',
          tags: tagsArray,
          status: isInternal ? 'Internal only' : 'External OK',
        };
      });

      setAllSearchResults(results);
      // Apply filters will happen in useEffect
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
      setAllSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }

  const handleFilterChange = (filterType: keyof FilterOptions, value: any) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const toggleFilterType = (type: string) => {
    setFilters(prev => ({
      ...prev,
      type: prev.type.includes(type)
        ? prev.type.filter(t => t !== type)
        : [...prev.type, type],
    }));
  };

  const toggleFilterCategory = (category: string) => {
    setFilters(prev => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category],
    }));
  };

  const clearFilters = () => {
    setFilters({
      type: [],
      category: [],
      showInternalOnly: null,
    });
  };

  const hasActiveFilters = filters.type.length > 0 || filters.category.length > 0 || filters.showInternalOnly !== null;

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
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className={`p-2 hover:bg-gray-200 rounded-lg transition-colors relative ${
                hasActiveFilters ? 'bg-blue-50' : ''
              }`}
              title="Filter results"
            >
              <Filter className={`w-5 h-5 ${hasActiveFilters ? 'text-blue-600' : 'text-gray-600'}`} />
              {hasActiveFilters && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-blue-600 rounded-full"></span>
              )}
            </button>
            
            {showFilterDropdown && (
              <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900">Filter Results</h3>
                  {hasActiveFilters && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-blue-600 hover:text-blue-700"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                
                {/* Type Filter */}
                <div className="mb-4">
                  <label className="text-xs font-medium text-gray-700 mb-2 block">Type</label>
                  <div className="flex flex-wrap gap-2">
                    {['DECK', 'DOC', 'LINK', 'VIDEO', 'ONE-PAGER'].map((type) => (
                      <button
                        key={type}
                        onClick={() => toggleFilterType(type)}
                        className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                          filters.type.includes(type)
                            ? 'bg-blue-100 border-blue-500 text-blue-700'
                            : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Category Filter */}
                <div className="mb-4">
                  <label className="text-xs font-medium text-gray-700 mb-2 block">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {['pitch-decks', 'demos', 'one-pagers', 'proof-credibility', 'campaigns-content', 'objection-handling', 'chatbots', 'internal-only'].map((category) => (
                      <button
                        key={category}
                        onClick={() => toggleFilterCategory(category)}
                        className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                          filters.category.includes(category)
                            ? 'bg-blue-100 border-blue-500 text-blue-700'
                            : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {category.replace('-', ' ')}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Internal/External Filter */}
                <div>
                  <label className="text-xs font-medium text-gray-700 mb-2 block">Access</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleFilterChange('showInternalOnly', filters.showInternalOnly === false ? null : false)}
                      className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                        filters.showInternalOnly === false
                          ? 'bg-blue-100 border-blue-500 text-blue-700'
                          : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      External Only
                    </button>
                    <button
                      onClick={() => handleFilterChange('showInternalOnly', filters.showInternalOnly === true ? null : true)}
                      className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                        filters.showInternalOnly === true
                          ? 'bg-blue-100 border-blue-500 text-blue-700'
                          : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      Internal Only
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
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

