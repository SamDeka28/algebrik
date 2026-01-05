"use client";

import { Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AccessDenied() {
  return (
    <div
      className="p-8 flex items-center justify-center min-h-screen bg-gray-50"
      style={{
        backgroundImage: `radial-gradient(circle, rgba(0,0,0,0.02) 1px, transparent 1px)`,
        backgroundSize: '20px 20px',
      }}
    >
      <div className="max-w-md w-full bg-white rounded-lg border border-gray-200 shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Lock className="w-8 h-8 text-orange-600" />
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Restricted</h1>
        <p className="text-gray-600 mb-6">
          This section is restricted to internal team members only. You don't have permission to access this content.
        </p>
        
        <Link
          href="/vault"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}

