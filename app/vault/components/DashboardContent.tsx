"use client";

import { useEffect, useState } from "react";
import { Star, Clock, Sparkles, TrendingUp, Download, Eye, Handshake, User as UserIcon, Trophy, Loader2 } from "lucide-react";
import Link from "next/link";
import AssetCard from "./AssetCard";
import { getSession, type User } from "@/lib/auth-client";
import { fetchActivities, formatTimeAgo, type Activity } from "@/lib/activity-tracker";
import { DealMap } from "./DealMap/DealMap";

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
  category?: string; // Add category to Asset interface
}

export default function DashboardContent() {
  const [user, setUser] = useState<User | null>(null);
  const [allAssets, setAllAssets] = useState<Asset[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);

  const currentHour = new Date().getHours();
  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 18
      ? "Good afternoon"
      : "Good evening";

  useEffect(() => {
    const session = getSession();
    setUser(session);
    
    // Load activities from Strapi (team-wide)
    async function loadActivities() {
      const recentActivities = await fetchActivities(10);
      setActivities(recentActivities);
    }
    loadActivities();
    
    async function fetchAllAssets() {
      try {
        setLoading(true);
        setError(null);

        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
        const strapiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || '';

        // Fetch all assets (we'll filter client-side for simplicity and reliability)
        const userSession = getSession();
        const isInternal = userSession?.isInternal || false;
        
        // Simple query - fetch all and filter client-side
        const populateParam = 'populate=*';
        const sortParam = 'sort[0]=updatedAt:desc';
        const queryString = `${populateParam}&${sortParam}`;
        const apiUrl = `${strapiUrl}/api/vault-assets?${queryString}`;
        
        console.log('Fetching assets from:', apiUrl);
        console.log('User isInternal:', isInternal);

        const response = await fetch(apiUrl, {
          headers: {
            'Authorization': strapiToken ? `Bearer ${strapiToken}` : '',
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch assets');
        }

        const data = await response.json();
        let items = data?.data || data || [];
        
        console.log('Fetched items count (before filtering):', items.length);
        
        // Filter out internal-only assets for non-internal users (client-side)
        if (!isInternal) {
          items = items.filter((item: any) => {
            const attributes = item.attributes || item;
            const itemIsInternal = attributes.isInternal === true;
            const itemCategory = attributes.category;
            return !itemIsInternal && itemCategory !== 'internal-only';
          });
          console.log('Fetched items count (after filtering):', items.length);
        }
        
        if (items.length > 0) {
          console.log('Sample item:', items[0]);
        }

        const strapiBaseUrl = process.env.NEXT_PUBLIC_STRAPI_URL || '';

        // Helper function to safely extract URL string
        const extractUrlString = (value: any): string => {
          if (!value) return '';
          if (typeof value === 'string') return value;
          if (value.url && typeof value.url === 'string') return value.url;
          if (value.attributes?.url && typeof value.attributes.url === 'string') return value.attributes.url;
          return '';
        };

        // Transform Strapi data to Asset format
        const transformedAssets: Asset[] = items.map((item: any) => {
          const attributes = item.attributes || item;
          let tagsArray: string[] = [];
          if (Array.isArray(attributes.tags)) {
            tagsArray = attributes.tags;
          } else if (typeof attributes.tags === 'string') {
            tagsArray = attributes.tags.split(',').map((t: string) => t.trim());
          }

          const isInternal = attributes.isInternal || attributes.category === 'internal-only' || false;
          const actionType = attributes.actionType || (attributes.type === 'LINK' ? 'open' : 'download');

          let fileUrl = '';

          if (actionType === 'download') {
            if (attributes.file) {
              const fileData = attributes.file.data || attributes.file;
              const extracted = extractUrlString(fileData);
              if (extracted && !extracted.startsWith('http')) {
                fileUrl = `${strapiBaseUrl}${extracted}`;
              } else {
                fileUrl = extracted;
              }
            } else if (attributes.fileUrl) {
              fileUrl = extractUrlString(attributes.fileUrl);
            }
          } else if (actionType === 'open') {
            if (attributes.fileUrl) {
              fileUrl = extractUrlString(attributes.fileUrl);
            } else if (attributes.file) {
              const fileData = attributes.file.data || attributes.file;
              const extracted = extractUrlString(fileData);
              if (extracted && !extracted.startsWith('http')) {
                fileUrl = `${strapiBaseUrl}${extracted}`;
              } else {
                fileUrl = extracted;
              }
            }
          }

          if (fileUrl && typeof fileUrl !== 'string') {
            fileUrl = '';
          }

          return {
            id: item.id || item.documentId,
            type: (attributes.type || 'DOC').toUpperCase() as Asset['type'],
            title: attributes.title || '',
            description: attributes.description || '',
            tags: tagsArray,
            status: isInternal ? 'Internal only' : 'External OK',
            date: attributes.date || attributes.updatedAt || attributes.publishedAt || attributes.createdAt || new Date().toISOString(),
            actionType: actionType,
            trend: attributes.trend,
            badge: attributes.badge,
            badgeColor: attributes.badgeColor,
            isInternal: isInternal,
            fileUrl: fileUrl,
            category: attributes.category || '', // Include category in transformed asset
          };
        });

        console.log('Transformed assets count:', transformedAssets.length);
        if (transformedAssets.length > 0) {
          console.log('Sample transformed asset:', transformedAssets[0]);
        }
        setAllAssets(transformedAssets);
      } catch (err) {
        console.error('Error fetching assets:', err);
        setError('Unable to load dashboard data. Please try again later.');
        setAllAssets([]);
      } finally {
        setLoading(false);
      }
    }

    fetchAllAssets();
    
    // Refresh activities periodically (every 10 seconds for team-wide updates)
    const activityInterval = setInterval(async () => {
      const recentActivities = await fetchActivities(10);
      setActivities(recentActivities);
    }, 10000);
    
    return () => clearInterval(activityInterval);
  }, []);

  // Calculate summary metrics from actual data
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  // Top performing: assets with trend indicators showing percentage growth
  const topPerforming = allAssets.filter(asset => asset.trend && asset.trend.includes('%')).length;
  
  // Fresh content: assets created/updated in the last 7 days
  const freshContent = allAssets.filter(asset => {
    const assetDate = new Date(asset.date);
    return assetDate >= oneWeekAgo;
  }).length;
  
  // Curated for Sales: assets that are sales-focused
  // This includes:
  // 1. Assets with "Sales" tag
  // 2. Assets in sales-related categories (pitch-decks, demos, objection-handling)
  // 3. Assets with sales stage tags (Discovery, Late stage, Early stage)
  const curatedForSales = allAssets.filter(asset => {
    const hasSalesTag = asset.tags.some(tag => 
      ['Sales', 'Discovery', 'Late stage', 'Early stage'].includes(tag)
    );
    const isSalesCategory = asset.category && ['pitch-decks', 'demos', 'objection-handling'].includes(asset.category);
    return hasSalesTag || isSalesCategory;
  }).length;
  
  // High engagement: assets with any trend indicator
  const highEngagement = allAssets.filter(asset => asset.trend).length;

  const summaryCards = [
    {
      icon: Star,
      value: topPerforming.toString(),
      label: "Top performing assets",
      color: "text-yellow-500",
    },
    {
      icon: Clock,
      value: freshContent.toString(),
      label: "Fresh content this week",
      color: "text-blue-500",
    },
    {
      icon: Sparkles,
      value: curatedForSales.toString(),
      label: "Curated for Sales",
      color: "text-purple-500",
    },
    {
      icon: TrendingUp,
      value: highEngagement.toString(),
      label: "High engagement assets",
      color: "text-green-500",
    },
  ];

  // Get recently updated assets (sorted by updatedAt, limit to 4)
  const recentlyUpdated = allAssets
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 4);

  // Get most used assets (assets with trend indicators, or fallback to most recent)
  const mostUsed = allAssets
    .filter(asset => asset.trend)
    .sort((a, b) => {
      // Sort by trend percentage if available
      const aTrend = parseFloat(a.trend?.replace(/[^0-9.-]/g, '') || '0');
      const bTrend = parseFloat(b.trend?.replace(/[^0-9.-]/g, '') || '0');
      return bTrend - aTrend;
    })
    .slice(0, 4);

  // If not enough assets with trends, fill with most recent
  if (mostUsed.length < 4) {
    const remaining = allAssets
      .filter(asset => !mostUsed.some(used => used.id === asset.id))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 4 - mostUsed.length);
    mostUsed.push(...remaining);
  }

  // Map activities to display format
  const displayActivities = activities.map((activity) => {
    const Icon = activity.action === 'downloaded' ? Download : activity.action === 'viewed' ? Eye : Download;
    return {
      user: activity.userName,
      action: activity.action,
      asset: activity.assetTitle,
      time: formatTimeAgo(activity.timestamp),
      icon: Icon,
    };
  });

  // If no activities, show a placeholder
  const finalActivities = displayActivities.length > 0 
    ? displayActivities 
    : [
        {
          user: user?.name || "You",
          action: "downloaded" as const,
          asset: allAssets[0]?.title || "an asset",
          time: "No recent activity",
          icon: Download,
        },
      ];

  // Calculate impact metrics from actual data
  const totalAssets = allAssets.length;
  const assetsWithTrends = allAssets.filter(asset => asset.trend).length;
  
  const impactMetrics = [
    { icon: Download, value: totalAssets.toString(), change: null, label: "Total assets" },
    { icon: Handshake, value: curatedForSales.toString(), change: null, label: "Sales assets" },
    { icon: Eye, value: assetsWithTrends.toString(), change: null, label: "Engaged assets" },
    { icon: UserIcon, value: freshContent.toString(), change: null, label: "New this week" },
  ];

  if (loading) {
    return (
      <div 
        className="p-8 space-y-8 bg-gray-50 min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.02) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      >
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="p-8 space-y-8 bg-gray-50 min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.02) 1px, transparent 1px)`,
          backgroundSize: '20px 20px',
        }}
      >
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="p-8 space-y-8 bg-gray-50 min-h-screen"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.02) 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
      }}
    >
      {/* Greeting and Headline */}
      <div className="flex flex-col justify-center items-center">
        <p className="text-gray-600 mb-2">{greeting}, {user?.name || 'there'}</p>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Everything you need to{" "}
          <span className="bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
            win deals
          </span>
        </h1>
        <p className="text-gray-600 text-lg">— nothing you don't.</p>
        <p className="text-sm text-gray-500 mt-2 flex items-center gap-1">
          <Star className="w-4 h-4" />
          Armed with the right assets, you're unstoppable
        </p>
      </div>

      {/* Deal Map */}
      <div>
        <DealMap />
      </div>

      {/* General Analytics and Recent Activities - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Analytics */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            General Analytics
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {summaryCards.map((card, index) => {
              const Icon = card.icon;
              return (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg border border-gray-200 p-4"
                >
                  <Icon className={`w-5 h-5 ${card.color} mb-2`} />
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {card.value}
                  </div>
                  <div className="text-xs text-gray-600">{card.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Activity */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <h2 className="text-lg font-semibold text-gray-900">
              Live Activity
            </h2>
          </div>
          <div className="space-y-4 overflow-y-auto flex-1 max-h-[400px] pr-2">
            {finalActivities.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <div key={index} className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span>{" "}
                      {activity.action}{" "}
                      <span className="font-medium">{activity.asset}</span>
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recently Updated */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Recently Updated
          </h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentlyUpdated.length > 0 ? (
            recentlyUpdated.map((asset) => (
              <AssetCard key={asset.id} {...asset} id={asset.id} />
            ))
          ) : (
            <div className="col-span-4 text-center py-8 text-gray-500">
              No assets available yet
            </div>
          )}
        </div>
      </div>

      {/* Most Used Assets */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">
            Most Used Assets
          </h2>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            View all →
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {mostUsed.length > 0 ? (
            mostUsed.map((asset) => (
              <AssetCard key={asset.id} {...asset} id={asset.id} />
            ))
          ) : (
            <div className="col-span-4 text-center py-8 text-gray-500">
              No assets available yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

