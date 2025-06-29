"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function HubSpotMeetingEmbed() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render anything until component is mounted on client
  if (!mounted) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-100 rounded-lg h-[600px] flex items-center justify-center">
            <div className="text-gray-500">Loading meeting scheduler...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* HubSpot Meeting Embed */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div 
            className="meetings-iframe-container" 
            data-src="https://meetings-na2.hubspot.com/algebrik/partner-with-algebrik?embed=true"
            style={{ minHeight: '600px' }}
          />
        </div>
      </div>

      {/* HubSpot Script */}
      <Script
        src="https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (typeof window !== 'undefined' && (window as any).MeetingsEmbedCode) {
            (window as any).MeetingsEmbedCode.init();
          }
        }}
      />
    </>
  );
} 