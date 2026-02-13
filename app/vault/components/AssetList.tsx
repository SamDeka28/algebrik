"use client";

import { useEffect, useState } from "react";
import AssetCard from "./AssetCard";
import { Loader2, FolderOpen, Plus } from "lucide-react";
import { getSession } from "@/lib/auth-client";

interface Asset {
  id: number;
  type: "DECK" | "DOC" | "LINK" | "VIDEO" | "ONE-PAGER";
  title: string;
  description: string;
  tags: string[];
  status: string;
  date: string;
  actionType?: "download" | "open";
  trend?: string;
  badge?: string;
  badgeColor?: string;
  isInternal?: boolean;
  fileUrl?: string;
}

interface AssetListProps {
  category: string;
  strapiCollection?: string;
}

export default function AssetList({ category, strapiCollection }: AssetListProps) {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAssets() {
      try {
        setLoading(true);
        
        // If Strapi collection is provided, fetch from Strapi
        if (strapiCollection) {
          const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
          const strapiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || '';
          
          // Build query string manually to avoid URLSearchParams encoding issues
          const filterParam = `filters[category][$eq]=${encodeURIComponent(category)}`;
          const populateParam = 'populate=*';
          const sortParam = 'sort[0]=createdAt:desc';
          const queryString = `${filterParam}&${populateParam}&${sortParam}`;
          
          const apiUrl = `${strapiUrl}/api/${strapiCollection}?${queryString}`;
          
          const response = await fetch(apiUrl, {
            headers: {
              'Authorization': strapiToken ? `Bearer ${strapiToken}` : '',
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            // If 404 or empty collection, just return empty array (not an error)
            if (response.status === 404) {
              setAssets([]);
              setLoading(false);
              return;
            }
            throw new Error('Failed to fetch assets');
          }

          const data = await response.json();
          let items = data?.data || data || [];
          
          // If no items found, that's fine - just show empty state
          if (!items || items.length === 0) {
            setAssets([]);
            setLoading(false);
            return;
          }
          
          // Get user session to check internal access
          const userSession = getSession();
          const isInternal = userSession?.isInternal || false;
          
          // Filter out internal-only assets for non-internal users
          if (!isInternal) {
            items = items.filter((item: any) => {
              const attributes = item.attributes || item;
              const itemIsInternal = attributes.isInternal === true;
              const itemCategory = attributes.category;
              return !itemIsInternal && itemCategory !== 'internal-only';
            });
          }
          
          // Get Strapi URL once for file URL construction
          const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
          
          // Transform Strapi data to Asset format
          const transformedAssets: Asset[] = items.map((item: any) => {
            const attributes = item.attributes || item;
            // Handle tags - could be array or comma-separated string
            let tagsArray: string[] = [];
            if (Array.isArray(attributes.tags)) {
              tagsArray = attributes.tags;
            } else if (typeof attributes.tags === 'string') {
              tagsArray = attributes.tags.split(',').map((t: string) => t.trim());
            }
            
            const isInternal = attributes.isInternal || attributes.category === 'internal-only' || false;
            
            // Determine action type
            const actionType = attributes.actionType || (attributes.type === 'LINK' ? 'open' : 'download');
            
            // Extract file URL based on action type
            let fileUrl = '';
            
            // Helper function to safely extract URL string from Strapi media
            const extractMediaUrl = (value: any): string => {
              if (!value) return '';
              // Handle Strapi v5 structure: file.data.attributes.url
              if (value.attributes?.url && typeof value.attributes.url === 'string') {
                return value.attributes.url;
              }
              // Handle Strapi v4 structure or flat: file.url
              if (value.url && typeof value.url === 'string') {
                return value.url;
              }
              // Handle nested data wrapper
              if (value.data) {
                return extractMediaUrl(value.data);
              }
              return '';
            };
            
            if (actionType === 'download') {
              // For downloads, look for 'file' media field
              if (attributes.file) {
                const fileData = attributes.file.data || attributes.file;
                const relativeUrl = extractMediaUrl(fileData);
                
                if (relativeUrl) {
                  // Construct full URL for Strapi media
                  fileUrl = relativeUrl.startsWith('http') 
                    ? relativeUrl 
                    : `${strapiBaseUrl}${relativeUrl}`;
                }
              }
            } else if (actionType === 'open') {
              // For open actions, look for 'fileUrl' text field
              if (attributes.fileUrl) {
                if (typeof attributes.fileUrl === 'string') {
                  fileUrl = attributes.fileUrl;
                } else if (attributes.fileUrl.url && typeof attributes.fileUrl.url === 'string') {
                  // Handle if it's accidentally stored as an object
                  fileUrl = attributes.fileUrl.url;
                }
              }
            }
            
            // Final validation - ensure it's a string
            if (fileUrl && typeof fileUrl !== 'string') {
              console.warn('fileUrl is not a string after extraction:', fileUrl, 'for asset:', attributes.title);
              fileUrl = '';
            }
            
            return {
              id: item.id || item.documentId,
              type: (attributes.type || 'DOC').toUpperCase() as Asset['type'],
              title: attributes.title || '',
              description: attributes.description || '',
              tags: tagsArray,
              status: isInternal ? 'Internal only' : 'External OK',
              date: attributes.date || attributes.updatedAt || attributes.publishedAt || new Date().toISOString(),
              actionType: actionType,
              trend: attributes.trend,
              badge: attributes.badge,
              badgeColor: attributes.badgeColor,
              isInternal: isInternal,
              fileUrl: fileUrl,
            };
          });
          
          setAssets(transformedAssets);
        } else {
          // For now, use empty array - will be populated from Strapi
          setAssets([]);
        }
      } catch (err) {
        console.error('Error fetching assets:', err);
        // Only show error for actual network/server errors
        // For empty collections, we'll just show the empty state
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        // Only set error if it's a real network/server issue, not just empty results
        if (!errorMessage.includes('404') && !errorMessage.includes('empty')) {
          setError('Unable to load assets. Please try again later.');
        }
        setAssets([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAssets();
  }, [category, strapiCollection]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (assets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <FolderOpen className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No assets yet</h3>
        <p className="text-gray-500 text-center max-w-md mb-6">
          This section is empty.
        </p>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Plus className="w-4 h-4" />
          <span>Assets will appear automatically once added</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <p className="text-sm text-gray-600">
          <span className="font-semibold text-gray-900">{assets.length}</span> {assets.length === 1 ? 'asset' : 'assets'}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {assets.map((asset) => (
          <AssetCard
            key={asset.id}
            type={asset.type as "DECK" | "DOC" | "LINK" | "VIDEO" | "ONE-PAGER"}
            title={asset.title}
            description={asset.description}
            tags={asset.tags}
            status={asset.status}
            date={asset.date}
            actionType={asset.actionType}
            trend={asset.trend}
            badge={asset.badge}
            badgeColor={asset.badgeColor}
            isInternal={asset.isInternal}
            fileUrl={asset.fileUrl}
          />
        ))}
      </div>
    </>
  );
}

