'use client';

import { Zap, Info } from 'lucide-react';

/** Static export: multi-source enrichment requires server-side APIs (see credit-union-signal-radar). */
export default function LiveIntelCard(_props: { cuId: string }) {
  return (
    <div className="bg-slate-800/60 rounded-xl border border-slate-700 overflow-hidden">
      <div className="bg-slate-800 border-b border-slate-700 px-4 py-3 flex items-center gap-2">
        <Zap className="w-4 h-4 text-amber-400" />
        <p className="text-white font-semibold text-sm">Live Intelligence</p>
      </div>
      <div className="p-4 flex gap-3">
        <Info className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
        <div className="text-sm text-slate-400 leading-relaxed space-y-2">
          <p>
            News, job postings, website scraping, and NCUA enrichment run through backend routes in the standalone{' '}
            <span className="text-slate-300">credit-union-signal-radar</span> app. Those endpoints are not shipped with this static export.
          </p>
          <p className="text-slate-500 text-xs">
            This page includes precomputed NCUA + Callahan scoring only. To restore live feeds, proxy those APIs or embed this UI next to a server runtime.
          </p>
        </div>
      </div>
    </div>
  );
}
