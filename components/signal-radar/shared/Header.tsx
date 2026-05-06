'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Map, Zap } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900 border-b border-slate-700 h-14">
      <div className="flex items-center justify-between h-full px-4">
        <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg">
          <div className="w-7 h-7 bg-indigo-500 rounded-lg flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span>Signal Radar</span>
          <span className="text-slate-400 font-normal text-sm hidden sm:inline">Credit Union GTM Intelligence</span>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              pathname === '/' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Map className="w-4 h-4" />
            Dashboard
          </Link>
          <Link
            href="/outreach"
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              pathname === '/outreach' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            Top Opportunities
          </Link>
        </nav>
      </div>
    </header>
  );
}
