'use client';

import { useState } from 'react';
import type { FilterState } from '@/types/signal-radar';
import { SlidersHorizontal, ChevronDown, X } from 'lucide-react';

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HI','ID','IL','IN',
  'IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH',
  'NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT',
  'VT','VA','WA','WV','WI','WY',
];

interface Props {
  filters: FilterState;
  onChange: (f: FilterState) => void;
  totalCount: number;
}

export default function FilterPanel({ filters, onChange, totalCount }: Props) {
  const [statesOpen, setStatesOpen] = useState(false);

  function update(patch: Partial<FilterState>) {
    onChange({ ...filters, ...patch });
  }

  function toggleState(s: string) {
    const next = filters.states.includes(s)
      ? filters.states.filter(x => x !== s)
      : [...filters.states, s];
    update({ states: next });
  }

  function clearAll() {
    onChange({
      states: [], scoreMin: 0, scoreMax: 100,
      assetMin: 0, assetMax: Infinity,
      opportunity: 'all', priority: 'all',
    });
  }

  const hasFilters = filters.states.length > 0 || filters.priority !== 'all' ||
    filters.opportunity !== 'all' || filters.scoreMin > 0 || filters.scoreMax < 100;

  return (
    <div className="p-3 text-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2 text-white font-semibold">
          <SlidersHorizontal className="w-4 h-4 text-indigo-400" />
          Filters
        </div>
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-xs">{totalCount.toLocaleString()} shown</span>
          {hasFilters && (
            <button onClick={clearAll} className="text-indigo-400 text-xs hover:text-indigo-300 flex items-center gap-1">
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Priority */}
      <div className="mb-3">
        <label className="text-slate-400 text-[10px] uppercase tracking-wide mb-1.5 block">Priority</label>
        <div className="grid grid-cols-4 gap-1">
          {(['all', 'hot', 'warm', 'cold'] as const).map(p => (
            <button
              key={p}
              onClick={() => update({ priority: p })}
              className={`py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                filters.priority === p
                  ? p === 'hot' ? 'bg-red-500 text-white'
                    : p === 'warm' ? 'bg-amber-500 text-white'
                    : p === 'cold' ? 'bg-emerald-500 text-white'
                    : 'bg-indigo-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Opportunity */}
      <div className="mb-3">
        <label className="text-slate-400 text-[10px] uppercase tracking-wide mb-1.5 block">Opportunity</label>
        <div className="grid grid-cols-4 gap-1">
          {(['all', 'DAO', 'LOS', 'both'] as const).map(o => (
            <button
              key={o}
              onClick={() => update({ opportunity: o })}
              className={`py-1 rounded-md text-xs font-medium capitalize transition-colors ${
                filters.opportunity === o
                  ? 'bg-indigo-500 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {o}
            </button>
          ))}
        </div>
      </div>

      {/* Score Range */}
      <div className="mb-3">
        <label className="text-slate-400 text-[10px] uppercase tracking-wide mb-1.5 flex justify-between">
          <span>Score Range</span>
          <span className="text-slate-300">{filters.scoreMin}–{filters.scoreMax}</span>
        </label>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-[10px] w-5">Min</span>
            <input
              type="range" min={0} max={100} step={5}
              value={filters.scoreMin}
              onChange={e => update({ scoreMin: Math.min(parseInt(e.target.value), filters.scoreMax - 5) })}
              className="flex-1 accent-indigo-500 h-1"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-slate-500 text-[10px] w-5">Max</span>
            <input
              type="range" min={0} max={100} step={5}
              value={filters.scoreMax}
              onChange={e => update({ scoreMax: Math.max(parseInt(e.target.value), filters.scoreMin + 5) })}
              className="flex-1 accent-indigo-500 h-1"
            />
          </div>
        </div>
      </div>

      {/* States */}
      <div>
        <button
          onClick={() => setStatesOpen(v => !v)}
          className="text-slate-400 text-[10px] uppercase tracking-wide mb-1.5 flex items-center justify-between w-full hover:text-slate-300"
        >
          <span>
            States
            {filters.states.length > 0 && (
              <span className="ml-1 bg-indigo-500 text-white rounded-full px-1.5 text-[9px]">
                {filters.states.length}
              </span>
            )}
          </span>
          <ChevronDown className={`w-3 h-3 transition-transform ${statesOpen ? 'rotate-180' : ''}`} />
        </button>

        {filters.states.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-1.5">
            {filters.states.map(s => (
              <button
                key={s}
                onClick={() => toggleState(s)}
                className="flex items-center gap-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded px-1.5 py-0.5 text-[10px] hover:bg-indigo-500/30"
              >
                {s} <X className="w-2.5 h-2.5" />
              </button>
            ))}
          </div>
        )}

        {statesOpen && (
          <div className="grid grid-cols-6 gap-0.5 max-h-32 overflow-y-auto">
            {US_STATES.map(s => (
              <button
                key={s}
                onClick={() => toggleState(s)}
                className={`py-0.5 rounded text-[10px] font-medium transition-colors ${
                  filters.states.includes(s)
                    ? 'bg-indigo-500 text-white'
                    : 'bg-slate-700 text-slate-400 hover:bg-slate-600 hover:text-white'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
