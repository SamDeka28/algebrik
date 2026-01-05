"use client";

import { Download, ExternalLink, TrendingUp, Shield, Lock } from "lucide-react";
import { trackActivity } from "@/lib/activity-tracker";
import { getSession } from "@/lib/auth-client";

interface AssetCardProps {
  id?: number;
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

export default function AssetCard({
  id,
  type,
  title,
  description,
  tags,
  status,
  date,
  actionType = "download",
  trend,
  badge,
  badgeColor,
  isInternal = false,
  fileUrl,
}: AssetCardProps) {
  const handleClick = () => {
    // Track activity (async, don't wait for it)
    const session = getSession();
    if (session) {
      const action = actionType === "download" ? 'downloaded' : 'opened';
      trackActivity(
        session.email,
        session.name,
        session.email,
        action,
        title,
        id || 0
      ).catch(err => console.error('Failed to track activity:', err));
    }

    // Ensure fileUrl is a valid string
    if (!fileUrl) {
      console.warn('No file URL provided for asset:', title);
      alert('File URL is not available for this asset.');
      return;
    }

    // Convert to string if it's not already
    let urlString = '';
    if (typeof fileUrl === 'string') {
      urlString = fileUrl;
    } else {
      console.error('fileUrl is not a string:', fileUrl, 'type:', typeof fileUrl);
      alert('Invalid file URL format. Please check the asset configuration.');
      return;
    }

    // Validate and normalize URL
    let finalUrl = urlString;
    try {
      // Try to create URL object to validate
      const url = new URL(urlString);
      finalUrl = urlString;
    } catch (e) {
      // If relative URL, make it absolute
      if (urlString.startsWith('/')) {
        finalUrl = urlString;
      } else if (urlString.startsWith('http')) {
        // Already absolute, use as is
        finalUrl = urlString;
      } else {
        console.error('Invalid URL format:', urlString);
        alert('Invalid file URL format. Please check the asset configuration.');
        return;
      }
    }

    if (actionType === "open" || type === "LINK") {
      // Open in new tab
      window.open(finalUrl, '_blank', 'noopener,noreferrer');
    } else {
      // Download file - force download behavior
      // Extract filename from URL or use title
      let filename = title.replace(/\s+/g, '-');
      try {
        const urlObj = new URL(finalUrl);
        const urlPath = urlObj.pathname;
        const urlFilename = urlPath.split('/').pop();
        if (urlFilename && urlFilename.includes('.')) {
          filename = decodeURIComponent(urlFilename);
        } else {
          // Add extension based on type if not present
          const extension = type === 'VIDEO' ? '.mp4' : type === 'DECK' ? '.pdf' : '.pdf';
          filename = `${filename}${extension}`;
        }
      } catch (e) {
        // If URL parsing fails, use title with default extension
        filename = `${filename}.pdf`;
      }
      
      // For downloads, try to fetch as blob first (handles CORS better)
      // If that fails, fall back to direct link
      fetch(finalUrl, { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch file');
          }
          return response.blob();
        })
        .then(blob => {
          // Create blob URL and trigger download
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = filename;
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          
          // Clean up
          setTimeout(() => {
            window.URL.revokeObjectURL(blobUrl);
            if (document.body.contains(link)) {
              document.body.removeChild(link);
            }
          }, 100);
        })
        .catch(err => {
          // Fallback: Use direct link (may open in new tab for some file types)
          console.warn('Could not fetch as blob, using direct link:', err);
          const link = document.createElement('a');
          link.href = finalUrl;
          link.download = filename;
          link.style.display = 'none';
          document.body.appendChild(link);
          link.click();
          
          setTimeout(() => {
            if (document.body.contains(link)) {
              document.body.removeChild(link);
            }
          }, 100);
        });
    }
  };
  const typeColors = {
    DECK: "bg-purple-100 text-purple-700",
    DOC: "bg-blue-100 text-blue-700",
    LINK: "bg-green-100 text-green-700",
    VIDEO: "bg-red-100 text-red-700",
    "ONE-PAGER": "bg-orange-100 text-orange-700",
  };

  const badgeColors: Record<string, string> = {
    LOS: "bg-blue-100 text-blue-700",
    BRE: "bg-orange-100 text-orange-700",
    POS: "bg-green-100 text-green-700",
    DAO: "bg-purple-100 text-purple-700",
    default: badgeColor || "bg-gray-100 text-gray-700",
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-5 hover:shadow-md transition-shadow relative">
      {trend && (
        <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded">
          {trend}
        </div>
      )}
      
      <div className="flex items-start justify-between mb-3">
        <span
          className={`text-xs font-semibold px-2 py-1 rounded ${typeColors[type] || typeColors.DOC}`}
        >
          {type}
        </span>
        {badge && (
          <span
            className={`text-xs font-semibold px-2 py-1 rounded ${
              badgeColors[badge] || badgeColors.default
            }`}
          >
            {badge}
          </span>
        )}
      </div>

      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-2">{description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map((tag, index) => (
          <span
            key={index}
            className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500 flex items-center gap-1">
          {isInternal ? (
            <>
              <Lock className="w-3 h-3 text-orange-500" />
              <span className="text-orange-600 font-medium">{status}</span>
            </>
          ) : (
            <>
              <Shield className="w-3 h-3 text-green-500" />
              <span className="text-green-600 font-medium">{status}</span>
            </>
          )}
          <span className="mx-2">•</span>
          <span>
            {date
              ? new Date(date).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'N/A'}
          </span>
        </div>
        <button
          onClick={handleClick}
          disabled={!fileUrl}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            actionType === "download"
              ? "text-blue-600 hover:text-blue-700 disabled:text-gray-300 disabled:cursor-not-allowed"
              : "text-gray-700  disabled:bg-gray-100 disabled:cursor-not-allowed"
          }`}
        >
          {actionType === "download" ? (
            <>
              <Download className="w-4 h-4" />
              Get
            </>
          ) : (
            <>
              <ExternalLink className="w-4 h-4" />
              Open
            </>
          )}
        </button>
      </div>
    </div>
  );
}

