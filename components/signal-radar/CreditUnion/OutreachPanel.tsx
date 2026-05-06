'use client';

import { Sparkles, AlertTriangle } from 'lucide-react';

/** Groq-backed outreach requires a server route with GROQ_API_KEY — not included in static export. */
export default function OutreachPanel(_props: { cuId: string }) {
  return (
    <div className="bg-slate-800/60 rounded-xl border border-slate-700 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-indigo-400" />
        <h3 className="text-white font-semibold">AI Outreach Generator</h3>
      </div>
      <div className="flex gap-3 bg-slate-900/40 border border-slate-700/80 rounded-lg p-4 text-sm text-slate-400">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
        <p className="leading-relaxed">
          Outreach drafts are generated server-side with Groq in the Signal Radar project. Static hosting cannot safely expose model keys.
          Run the full Next.js radar app or add your own API route and point a fork of this component at it.
        </p>
      </div>
    </div>
  );
}
