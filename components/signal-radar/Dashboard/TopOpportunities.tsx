'use client';

import Link from 'next/link';
import type { ScoredCreditUnion } from '@/types/signal-radar';
import ScoreBadge from '@/components/signal-radar/shared/ScoreBadge';
import { ChevronRight, MapPin } from 'lucide-react';

interface Props {
  creditUnions: ScoredCreditUnion[];
  onHover?: (cu: ScoredCreditUnion | null) => void;
  limit?: number;
}

function formatAssets(v: number): string {
  if (v >= 1e12) return `$${(v / 1e12).toFixed(1)}T`;
  if (v >= 1e9) return `$${(v / 1e9).toFixed(1)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(0)}M`;
  return `$${(v / 1e3).toFixed(0)}K`;
}

const OPP_COLORS = {
  DAO: 'bg-blue-900/60 text-blue-300 border-blue-700',
  LOS: 'bg-purple-900/60 text-purple-300 border-purple-700',
  both: 'bg-indigo-900/60 text-indigo-300 border-indigo-700',
};

export default function TopOpportunities({ creditUnions, onHover, limit = 15 }: Props) {
  const top = creditUnions.slice(0, limit);

  if (top.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-slate-500 text-sm">
        No results match current filters
      </div>
    );
  }

  return (
    <div className="space-y-1 overflow-y-auto flex-1">
      {top.map((cu, idx) => (
        <Link
          key={cu.id}
          href={`/signal-radar/cu/?id=${encodeURIComponent(cu.id)}`}
          onMouseEnter={() => onHover?.(cu)}
          onMouseLeave={() => onHover?.(null)}
          className="group flex items-center gap-2.5 p-2 rounded-lg hover:bg-slate-700/60 transition-colors border border-transparent hover:border-slate-600"
        >
          <span className="text-slate-500 text-xs w-4 text-right flex-shrink-0">{idx + 1}</span>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-medium truncate group-hover:text-indigo-300 transition-colors">
              {cu.name}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <MapPin className="w-3 h-3 text-slate-500 flex-shrink-0" />
              <span className="text-slate-400 text-[10px] truncate">{cu.city}, {cu.state}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 text-[10px]">{formatAssets(cu.assets)}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className={`text-[9px] px-1.5 py-0.5 rounded border font-medium ${OPP_COLORS[cu.opportunity]}`}>
              {cu.opportunity}
            </span>
            <ScoreBadge score={cu.intentScore} priority={cu.priority} size="sm" />
            <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-slate-400" />
          </div>
        </Link>
      ))}
    </div>
  );
}
