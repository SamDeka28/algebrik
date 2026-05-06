'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import type { ScoredCreditUnion, FilterState, DataMeta } from '@/types/signal-radar';
import FilterPanel from '@/components/signal-radar/Dashboard/FilterPanel';
import StatsBar from '@/components/signal-radar/Dashboard/StatsBar';
import OpportunityTable from '@/components/signal-radar/Dashboard/OpportunityTable';
import { useRouter } from 'next/navigation';
import {
  Loader2,
  AlertCircle,
  RefreshCw,
  LayoutList,
  Map as MapIcon,
  Flame,
  Thermometer,
  Minus,
  TrendingUp,
} from 'lucide-react';
import { CREDIT_UNIONS_JSON } from '@/lib/signal-radar/constants';

const RadarMap = dynamic(() => import('@/components/signal-radar/Map/RadarMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-900">
      <Loader2 className="w-6 h-6 animate-spin text-slate-500" />
    </div>
  ),
});

const DEFAULT_FILTERS: FilterState = {
  states: [],
  scoreMin: 0,
  scoreMax: 100,
  assetMin: 0,
  assetMax: Infinity,
  opportunity: 'all',
  priority: 'all',
};

export default function SignalRadarDashboardPage() {
  const router = useRouter();
  const [allCUs, setAllCUs] = useState<ScoredCreditUnion[]>([]);
  const [meta, setMeta] = useState<DataMeta | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [view, setView] = useState<'table' | 'map'>('table');
  const [highlightId, setHighlightId] = useState<string | undefined>();

  async function loadData(cacheBust = false) {
    const url = cacheBust ? `${CREDIT_UNIONS_JSON}?t=${Date.now()}` : CREDIT_UNIONS_JSON;
    const r = await fetch(url);
    if (!r.ok) throw new Error(`Could not load dataset (${r.status}). Run npm run generate:signal-radar.`);
    const d = (await r.json()) as { error?: string; data?: ScoredCreditUnion[]; meta?: DataMeta };
    if (d.error) throw new Error(d.error);
    setAllCUs(d.data ?? []);
    if (d.meta) setMeta(d.meta);
  }

  useEffect(() => {
    loadData()
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await loadData(true);
    } catch (e) {
      console.error('Refresh failed:', e);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const filtered = useMemo(
    () =>
      allCUs.filter((cu) => {
        if (filters.states.length > 0 && !filters.states.includes(cu.state)) return false;
        if (cu.intentScore < filters.scoreMin || cu.intentScore > filters.scoreMax) return false;
        if (filters.opportunity !== 'all' && cu.opportunity !== filters.opportunity && cu.opportunity !== 'both')
          return false;
        if (filters.priority !== 'all' && cu.priority !== filters.priority) return false;
        return true;
      }),
    [allCUs, filters],
  );

  const stats = useMemo(
    () => ({
      hot: filtered.filter((c) => c.priority === 'hot').length,
      warm: filtered.filter((c) => c.priority === 'warm').length,
      cold: filtered.filter((c) => c.priority === 'cold').length,
      avg: filtered.length
        ? Math.round(filtered.reduce((s, c) => s + c.intentScore, 0) / filtered.length)
        : 0,
    }),
    [filtered],
  );

  const handleSelect = useCallback(
    (cu: ScoredCreditUnion) => router.push(`/signal-radar/cu/?id=${encodeURIComponent(cu.id)}`),
    [router],
  );
  const handleHover = useCallback((cu: ScoredCreditUnion | null) => setHighlightId(cu?.id), []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] bg-slate-900">
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="relative w-16 h-16">
            <div className="w-16 h-16 border-4 border-indigo-500/20 rounded-full absolute" />
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin absolute" />
          </div>
          <div>
            <p className="text-white font-semibold text-lg">Loading Signal Radar</p>
            <p className="text-slate-400 text-sm mt-1">Reading static NCUA + Callahan snapshot…</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] bg-slate-900 px-4">
        <div className="bg-red-900/20 border border-red-700/50 rounded-2xl p-8 max-w-md text-center">
          <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
          <p className="text-white font-semibold mb-1">Failed to load data</p>
          <p className="text-red-300 text-sm">{error}</p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 hover:bg-red-500 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const sourceLabel =
    meta?.source === 'ncua_live'
      ? 'Live NCUA'
      : meta?.source === 'ncua_cache'
        ? 'Cached NCUA'
        : meta?.source === 'ncua_custom'
          ? 'Custom Data'
          : 'Sample data';
  const isLive = meta?.source !== 'sample';

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)] overflow-hidden bg-slate-900">
      <div className="flex items-center gap-0 px-4 py-2.5 border-b border-slate-800 bg-slate-900/95 flex-shrink-0 flex-wrap">
        <div className="flex items-center gap-3 flex-1 flex-wrap">
          <div className="flex items-center gap-1.5 text-sm">
            <TrendingUp className="w-4 h-4 text-slate-400" />
            <span className="text-white font-semibold tabular-nums">{filtered.length.toLocaleString()}</span>
            <span className="text-slate-400">CUs</span>
          </div>
          <div className="w-px h-4 bg-slate-700 hidden sm:block" />
          <div className="flex items-center gap-1.5 text-sm">
            <Flame className="w-4 h-4 text-red-400" />
            <span className="text-red-300 font-semibold tabular-nums">{stats.hot.toLocaleString()}</span>
            <span className="text-slate-500 text-xs">hot</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Thermometer className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 font-semibold tabular-nums">{stats.warm.toLocaleString()}</span>
            <span className="text-slate-500 text-xs">warm</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm">
            <Minus className="w-4 h-4 text-slate-500" />
            <span className="text-slate-400 font-semibold tabular-nums">{stats.cold.toLocaleString()}</span>
            <span className="text-slate-500 text-xs">cold</span>
          </div>
          <div className="w-px h-4 bg-slate-700 hidden sm:block" />
          <span className="text-slate-400 text-xs">
            Avg score: <span className="text-slate-200 font-semibold">{stats.avg}</span>
          </span>
        </div>

        <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700 p-0.5 mt-2 sm:mt-0">
          <button
            type="button"
            onClick={() => setView('table')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              view === 'table' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <LayoutList className="w-3.5 h-3.5" />
            Table
          </button>
          <button
            type="button"
            onClick={() => setView('map')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              view === 'map' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <MapIcon className="w-3.5 h-3.5" />
            Map
          </button>
        </div>

        <div className="flex items-center gap-3 ml-0 sm:ml-4 mt-2 sm:mt-0 w-full sm:w-auto justify-end">
          <div className="flex items-center gap-1.5 text-xs">
            <div className={`w-1.5 h-1.5 rounded-full ${isLive ? 'bg-emerald-400' : 'bg-amber-400'}`} />
            <span className={isLive ? 'text-emerald-300' : 'text-amber-300'}>{sourceLabel}</span>
            {meta && <span className="text-slate-600">· Callahan Q3 2024</span>}
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg border border-slate-700 disabled:opacity-50 transition-colors"
          >
            {refreshing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <RefreshCw className="w-3.5 h-3.5" />}
            {refreshing ? 'Refreshing…' : 'Reload data'}
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden min-h-0">
        <div className="w-56 flex-shrink-0 overflow-y-auto border-r border-slate-800 bg-slate-900 hidden md:block">
          <FilterPanel filters={filters} onChange={setFilters} totalCount={filtered.length} />
        </div>

        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <div className="md:hidden border-b border-slate-800 p-2 bg-slate-900 max-h-[40vh] overflow-y-auto">
            <FilterPanel filters={filters} onChange={setFilters} totalCount={filtered.length} />
          </div>
          <div className="relative min-h-0 flex-1">
            {view === 'table' ? (
              <OpportunityTable creditUnions={filtered} />
            ) : (
              <div className="absolute inset-0 min-h-[320px]">
                <RadarMap
                  creditUnions={filtered.slice(0, 600)}
                  onSelect={handleSelect}
                  highlightId={highlightId}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {false && <StatsBar creditUnions={filtered} />}
    </div>
  );
}
