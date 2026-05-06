'use client';

import { useEffect, useState, useMemo } from 'react';
import type { ScoredCreditUnion } from '@/types/signal-radar';
import Link from 'next/link';
import { Flame, ArrowRight, Loader2, Building2 } from 'lucide-react';
import ScoreBadge from '@/components/signal-radar/shared/ScoreBadge';
import { CREDIT_UNIONS_JSON } from '@/lib/signal-radar/constants';

function formatAssets(v: number): string {
  if (v >= 1e9) return `$${(v / 1e9).toFixed(1)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(0)}M`;
  return `$${(v / 1e3).toFixed(0)}K`;
}

const OPP_COLORS: Record<string, string> = {
  DAO: 'border-blue-500/40 bg-blue-500/5 text-blue-300',
  LOS: 'border-purple-500/40 bg-purple-500/5 text-purple-300',
  both: 'border-indigo-500/40 bg-indigo-500/5 text-indigo-300',
};

export default function SignalRadarOutreachPage() {
  const [allCUs, setAllCUs] = useState<ScoredCreditUnion[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(CREDIT_UNIONS_JSON)
      .then((r) => r.json())
      .then((d: { data?: ScoredCreditUnion[] }) => setAllCUs(d.data ?? []))
      .finally(() => setLoading(false));
  }, []);

  const topByScore = useMemo(
    () => [...allCUs].sort((a, b) => b.intentScore - a.intentScore).slice(0, 50),
    [allCUs],
  );
  const hot = useMemo(() => topByScore.filter((c) => c.priority === 'hot'), [topByScore]);
  const warm = useMemo(() => topByScore.filter((c) => c.priority === 'warm'), [topByScore]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 min-h-[calc(100vh-3.5rem)] overflow-y-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Flame className="w-6 h-6 text-red-400" />
          Top Opportunities
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Highest-intent credit unions ready for outreach — sorted by signal score
        </p>
      </div>

      <section className="mb-8">
        <h2 className="text-red-400 font-semibold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          Hot ({hot.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {hot.map((cu) => (
            <CUCard key={cu.id} cu={cu} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-amber-400 font-semibold text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          Warm ({warm.length})
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
          {warm.map((cu) => (
            <CUCard key={cu.id} cu={cu} />
          ))}
        </div>
      </section>
    </div>
  );
}

function CUCard({ cu }: { cu: ScoredCreditUnion }) {
  const topSignal = [...cu.signals].sort((a, b) => b.subScore - a.subScore)[0];
  const growthSig = cu.signals.find((s) => s.id === 'assetGrowth');

  return (
    <Link
      href={`/signal-radar/cu/?id=${encodeURIComponent(cu.id)}`}
      className="group bg-slate-800 border border-slate-700 hover:border-slate-500 rounded-xl p-4 transition-all hover:bg-slate-750 block"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <Building2 className="w-4 h-4 text-slate-500 shrink-0" />
          <div className="min-w-0">
            <p className="text-white font-semibold text-sm truncate group-hover:text-indigo-300 transition-colors">
              {cu.name}
            </p>
            <p className="text-slate-400 text-xs">
              {cu.city}, {cu.state}
            </p>
          </div>
        </div>
        <ScoreBadge score={cu.intentScore} priority={cu.priority} size="sm" />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <span className="text-slate-400 text-xs">{formatAssets(cu.assets)}</span>
        {growthSig && growthSig.rawValue > 0 && (
          <>
            <span className="text-slate-600">·</span>
            <span className="text-emerald-400 text-xs">+{growthSig.rawValue}% YoY</span>
          </>
        )}
        <span
          className={`ml-auto text-[10px] px-2 py-0.5 rounded-full border font-medium ${OPP_COLORS[cu.opportunity]}`}
        >
          {cu.opportunity === 'both' ? 'DAO + LOS' : cu.opportunity}
        </span>
      </div>

      {topSignal && (
        <p className="text-slate-400 text-xs line-clamp-2 mb-3">{topSignal.insight}</p>
      )}

      <div className="flex items-center justify-between">
        <div className="flex gap-1 flex-1">
          {cu.signals.slice(0, 5).map((s) => (
            <div
              key={s.id}
              className={`h-1 flex-1 rounded-full ${s.subScore >= 70 ? 'bg-red-500' : s.subScore >= 45 ? 'bg-amber-500' : 'bg-slate-600'}`}
              title={`${s.label}: ${s.subScore}/100`}
            />
          ))}
        </div>
        <ArrowRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 transition-colors ml-3 shrink-0" />
      </div>
    </Link>
  );
}
