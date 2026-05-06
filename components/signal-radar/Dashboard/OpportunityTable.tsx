'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import type { ScoredCreditUnion } from '@/types/signal-radar';
import { ChevronUp, ChevronDown, ArrowRight } from 'lucide-react';

interface Props {
  creditUnions: ScoredCreditUnion[];
}

type SortKey = 'intentScore' | 'assets' | 'name' | 'state' | 'algebrikFit';

function fmt(v: number): string {
  if (v >= 1e9) return `$${(v / 1e9).toFixed(1)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(0)}M`;
  return `$${(v / 1e3).toFixed(0)}K`;
}

const PRIORITY_CFG = {
  hot:  { dot: 'bg-red-500',   text: 'text-red-300',   bg: 'bg-red-500/10 border-red-500/20',   label: 'HOT'  },
  warm: { dot: 'bg-amber-500', text: 'text-amber-300', bg: 'bg-amber-500/10 border-amber-500/20', label: 'WARM' },
  cold: { dot: 'bg-slate-500', text: 'text-slate-400', bg: 'bg-slate-700/40 border-slate-600/30', label: 'COLD' },
};

const OPP_CFG = {
  DAO:  'text-blue-300 bg-blue-500/10 border-blue-500/20',
  LOS:  'text-violet-300 bg-violet-500/10 border-violet-500/20',
  both: 'text-indigo-300 bg-indigo-500/10 border-indigo-500/20',
};

const LOS_BADGES: Record<string, { label: string; color: string }> = {
  legacy:       { label: 'Legacy LOS',    color: 'text-amber-300 bg-amber-900/30 border-amber-700/30' },
  competitor:   { label: 'Competitor LOS', color: 'text-red-300 bg-red-900/30 border-red-700/30' },
  undeclared:   { label: 'LOS Unknown',   color: 'text-slate-400 bg-slate-700/30 border-slate-600/30' },
  modern_other: { label: 'Modern LOS',    color: 'text-emerald-300 bg-emerald-900/30 border-emerald-700/30' },
  none:         { label: 'No LOS Data',   color: 'text-slate-500 bg-slate-800 border-slate-700' },
};

function getLOSStatus(cu: ScoredCreditUnion): string {
  const sig = cu.signals.find(s => s.id === 'losStatus');
  if (!sig) return 'none';
  if (sig.subScore >= 70) return 'legacy';
  if (sig.subScore <= 15) return 'competitor';
  if (sig.subScore === 50) return 'undeclared';
  return 'modern_other';
}

function ScoreBar({ score, priority }: { score: number; priority: 'hot' | 'warm' | 'cold' }) {
  const colors = { hot: 'bg-red-500', warm: 'bg-amber-500', cold: 'bg-slate-500' };
  return (
    <div className="flex items-center gap-2 min-w-[80px]">
      <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${colors[priority]}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-white font-bold text-sm tabular-nums w-6 text-right">{score}</span>
    </div>
  );
}

function SortHeader({ label, sortKey, current, dir, onClick }: {
  label: string; sortKey: SortKey; current: SortKey; dir: 'asc' | 'desc';
  onClick: (k: SortKey) => void;
}) {
  const active = current === sortKey;
  return (
    <th
      className={`px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider cursor-pointer select-none whitespace-nowrap
        ${active ? 'text-white' : 'text-slate-400 hover:text-slate-200'} transition-colors`}
      onClick={() => onClick(sortKey)}
    >
      <div className="flex items-center gap-1">
        {label}
        {active
          ? dir === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />
          : <ChevronDown className="w-3 h-3 opacity-20" />
        }
      </div>
    </th>
  );
}

const PAGE_SIZE = 50;

export default function OpportunityTable({ creditUnions }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>('intentScore');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);

  function handleSort(k: SortKey) {
    if (k === sortKey) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(k); setSortDir('desc'); setPage(1); }
  }

  const sorted = useMemo(() => {
    return [...creditUnions].sort((a, b) => {
      let diff = 0;
      if (sortKey === 'name') diff = a.name.localeCompare(b.name);
      else if (sortKey === 'state') diff = a.state.localeCompare(b.state);
      else diff = (a[sortKey] as number) - (b[sortKey] as number);
      return sortDir === 'asc' ? diff : -diff;
    });
  }, [creditUnions, sortKey, sortDir]);

  const visible = sorted.slice(0, page * PAGE_SIZE);
  const hasMore = visible.length < sorted.length;

  if (creditUnions.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-slate-500 text-sm">
        No credit unions match the current filters
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="overflow-y-auto flex-1">
        <table className="w-full text-sm border-collapse">
          <thead className="sticky top-0 z-10">
            <tr className="bg-slate-900 border-b border-slate-700">
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400 w-10">#</th>
              <SortHeader label="Credit Union" sortKey="name" current={sortKey} dir={sortDir} onClick={handleSort} />
              <SortHeader label="State" sortKey="state" current={sortKey} dir={sortDir} onClick={handleSort} />
              <SortHeader label="Assets" sortKey="assets" current={sortKey} dir={sortDir} onClick={handleSort} />
              <SortHeader label="Intent Score" sortKey="intentScore" current={sortKey} dir={sortDir} onClick={handleSort} />
              <SortHeader label="Fit Score" sortKey="algebrikFit" current={sortKey} dir={sortDir} onClick={handleSort} />
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">LOS Status</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Opportunity</th>
              <th className="px-4 py-2.5 text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">Priority</th>
              <th className="px-4 py-2.5 w-8" />
            </tr>
          </thead>
          <tbody>
            {visible.map((cu, idx) => {
              const p = PRIORITY_CFG[cu.priority];
              const losStatus = getLOSStatus(cu);
              const los = LOS_BADGES[losStatus];
              return (
                <tr
                  key={cu.id}
                  className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors group"
                >
                  <td className="px-4 py-3 text-slate-500 text-xs tabular-nums">{idx + 1}</td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-white font-medium text-sm leading-tight group-hover:text-indigo-300 transition-colors">
                        {cu.name}
                      </p>
                      <p className="text-slate-500 text-xs mt-0.5">{cu.city}, {cu.state}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-slate-300 text-xs font-mono bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">{cu.state}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-200 text-sm tabular-nums font-medium">{fmt(cu.assets)}</td>
                  <td className="px-4 py-3">
                    <ScoreBar score={cu.intentScore} priority={cu.priority} />
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-slate-300 text-sm font-semibold tabular-nums">{cu.algebrikFit}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded border ${los.color}`}>{los.label}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${OPP_CFG[cu.opportunity]}`}>
                      {cu.opportunity === 'both' ? 'DAO + LOS' : cu.opportunity}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded border w-fit ${p.bg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${p.dot}`} />
                      <span className={p.text}>{p.label}</span>
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <Link
                      href={`/signal-radar/cu/?id=${encodeURIComponent(cu.id)}`}
                      className="flex items-center justify-center w-7 h-7 rounded-lg bg-slate-700/50 hover:bg-indigo-600 text-slate-400 hover:text-white transition-colors"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {hasMore && (
          <div className="flex justify-center py-4 border-t border-slate-800">
            <button
              onClick={() => setPage(p => p + 1)}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors"
            >
              Load more ({sorted.length - visible.length} remaining)
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
