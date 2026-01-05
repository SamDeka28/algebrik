"use client";

import { LucideIcon } from "lucide-react";
import AssetList from "./AssetList";

interface SectionPageProps {
  title: string;
  icon: LucideIcon;
  description: string;
  category: string;
  strapiCollection?: string;
}

export default function SectionPage({
  title,
  icon: Icon,
  description,
  category,
  strapiCollection = "vault-assets",
}: SectionPageProps) {
  return (
    <div
      className="p-8 space-y-6 bg-gray-50 min-h-screen"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.02) 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
      }}
    >
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        </div>
        <p className="text-gray-600 text-lg ml-[52px]">{description}</p>
      </div>

      {/* Asset Count and List */}
      <div>
        <AssetList category={category} strapiCollection={strapiCollection} />
      </div>
    </div>
  );
}

