"use client";

import { X, FileText, Download, ExternalLink } from "lucide-react";
import Link from "next/link";

interface SearchAsset {
  id: number;
  title: string;
  description: string;
  type: string;
  category: string;
  tags: string[];
}

interface SearchResultsProps {
  results: SearchAsset[];
  onClose: () => void;
  searchQuery: string;
}

export default function SearchResults({ results, onClose, searchQuery }: SearchResultsProps) {
  if (results.length === 0) {
    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold text-gray-900">Search Results</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-gray-500">No results found for "{searchQuery}"</p>
        </div>
      </div>
    );
  }

  const getCategoryPath = (category: string) => {
    if (category === "dashboard") return "/vault";
    return `/vault/${category}`;
  };

  const getTypeIcon = (type: string) => {
    switch (type.toUpperCase()) {
      case "DECK":
      case "DOC":
      case "ONE-PAGER":
        return FileText;
      case "LINK":
        return ExternalLink;
      default:
        return Download;
    }
  };

  return (
    <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
      <div className="p-2">
        <div className="flex items-center justify-between mb-2 px-2">
          <h3 className="text-sm font-semibold text-gray-900">
            {results.length} {results.length === 1 ? "result" : "results"} for "{searchQuery}"
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="space-y-1">
          {results.map((asset) => {
            const Icon = getTypeIcon(asset.type);
            const categoryPath = getCategoryPath(asset.category);
            return (
              <Link
                key={asset.id}
                href={categoryPath}
                onClick={onClose}
                className="block p-3 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="flex items-start gap-3">
                  <Icon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {asset.title}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">
                      {asset.description}
                    </p>
                    {asset.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {asset.tags.slice(0, 3).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

