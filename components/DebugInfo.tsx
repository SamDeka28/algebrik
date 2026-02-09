"use client"
import { useEffect, useState } from "react";

interface DebugInfoProps {
  slug: string;
  blogData: any;
  error: string | null;
}

export default function DebugInfo({ slug, blogData, error }: DebugInfoProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-90 text-white p-4 rounded-lg text-xs max-w-sm z-50">
      <h3 className="font-bold mb-2">🐛 Debug Info</h3>
      <div className="space-y-1">
        <div><strong>Slug:</strong> {slug}</div>
        <div><strong>Blog Found:</strong> {blogData ? '✅ Yes' : '❌ No'}</div>
        <div><strong>Error:</strong> {error || 'None'}</div>
        {blogData && (
          <div><strong>Title:</strong> {blogData.title}</div>
        )}
      </div>
    </div>
  );
}
