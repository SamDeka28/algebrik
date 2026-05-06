'use client';

import { Suspense, useEffect, useState, useCallback, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import type { ScoredCreditUnion, CallahanEnrichment } from '@/types/signal-radar';
import ScoreGauge from '@/components/signal-radar/CreditUnion/ScoreGauge';
import SignalBreakdown from '@/components/signal-radar/CreditUnion/SignalBreakdown';
import InsightNarrative from '@/components/signal-radar/CreditUnion/InsightNarrative';
import OutreachPanel from '@/components/signal-radar/CreditUnion/OutreachPanel';
import TechStackCard from '@/components/signal-radar/CreditUnion/TechStackCard';
import LiveIntelCard from '@/components/signal-radar/CreditUnion/LiveIntelCard';
import {
  ArrowLeft,
  MapPin,
  Users,
  DollarSign,
  Calendar,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { CREDIT_UNIONS_JSON, readStoredOverrides, type StoredTechOverride } from '@/lib/signal-radar/constants';
import { computeFitAfterTechPatch } from '@/lib/signal-radar/mergeTechOverride';

function formatAssets(v: number): string {
  if (v >= 1e12) return `$${(v / 1e12).toFixed(2)}T`;
  if (v >= 1e9) return `$${(v / 1e9).toFixed(1)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(0)}M`;
  return `$${(v / 1e3).toFixed(0)}K`;
}

function growthPct(current: number, prev: number): string {
  if (!prev) return 'N/A';
  const pct = ((current - prev) / prev) * 100;
  const sign = pct >= 0 ? '+' : '';
  return `${sign}${pct.toFixed(1)}%`;
}

const OPP_COLORS: Record<string, string> = {
  DAO: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
  LOS: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
  both: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/30',
};

interface TechStackData {
  coreProcessor?: string | null;
  consumerLOS?: string | null;
  mobileApp?: string | null;
  eSignProvider?: string | null;
  onlineBanking?: string | null;
  website?: string | null;
}

function baseTechFromCu(cu: ScoredCreditUnion): TechStackData {
  return {
    coreProcessor: cu.callahanData?.coreProcessor ?? null,
    consumerLOS: cu.callahanData?.consumerLOS ?? null,
    mobileApp: cu.callahanData?.mobileApp ?? null,
    eSignProvider: cu.callahanData?.eSignProvider ?? null,
    onlineBanking: cu.callahanData?.onlineBanking ?? null,
    website: cu.callahanData?.website ?? null,
  };
}

function mergeTech(base: TechStackData, patch: StoredTechOverride): TechStackData {
  return {
    coreProcessor: patch.coreProcessor !== undefined ? patch.coreProcessor : base.coreProcessor,
    consumerLOS: patch.consumerLOS !== undefined ? patch.consumerLOS : base.consumerLOS,
    mobileApp: patch.mobileApp !== undefined ? patch.mobileApp : base.mobileApp,
    eSignProvider: patch.eSignProvider !== undefined ? patch.eSignProvider : base.eSignProvider,
    onlineBanking: patch.onlineBanking !== undefined ? patch.onlineBanking : base.onlineBanking,
    website: base.website,
  };
}

function CreditUnionDetailInner() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();

  const [cu, setCu] = useState<ScoredCreditUnion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [storedPatch, setStoredPatch] = useState<StoredTechOverride | null>(null);

  const reloadOverridesForCu = useCallback((cuRow: ScoredCreditUnion) => {
    const raw = readStoredOverrides()[cuRow.id];
    setStoredPatch(raw && Object.keys(raw).length ? raw : null);
  }, []);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError('Missing charter id');
      return;
    }

    fetch(CREDIT_UNIONS_JSON)
      .then((r) => r.json())
      .then((d: { data?: ScoredCreditUnion[]; error?: string }) => {
        if (d.error) throw new Error(d.error);
        const row = (d.data ?? []).find((c) => c.id === id);
        if (!row) throw new Error('Credit union not found');
        setCu(row);
        reloadOverridesForCu(row);
      })
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, [id, reloadOverridesForCu]);

  const baseTechMemo = useMemo(() => (cu ? baseTechFromCu(cu) : null), [cu]);
  const mergedTechMemo = useMemo(() => {
    if (!baseTechMemo) return null;
    return storedPatch ? mergeTech(baseTechMemo, storedPatch) : baseTechMemo;
  }, [baseTechMemo, storedPatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
        <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
      </div>
    );
  }

  if (error || !cu) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)] px-4">
        <div className="text-center">
          <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
          <p className="text-white font-semibold">{error ?? 'Credit union not found'}</p>
          <button
            type="button"
            onClick={() => router.push('/signal-radar/')}
            className="mt-3 text-indigo-400 text-sm hover:text-indigo-300"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const baseTech = baseTechMemo!;
  const mergedTech = mergedTechMemo!;
  const displayFit = storedPatch
    ? computeFitAfterTechPatch(cu, storedPatch as Partial<CallahanEnrichment>)
    : cu.algebrikFit;

  const loanToShare = cu.shares > 0 ? ((cu.loans / cu.shares) * 100).toFixed(1) : 'N/A';

  return (
    <div className="min-h-[calc(100vh-3.5rem)] overflow-y-auto pb-16">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <button
          type="button"
          onClick={() => router.push('/signal-radar/')}
          className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Radar
        </button>

        <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 mb-4">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex-1">
              <div className="flex items-start gap-3 mb-3">
                <div>
                  <h1 className="text-2xl font-bold text-white leading-tight">{cu.name}</h1>
                  <div className="flex items-center gap-1.5 mt-1 text-slate-400 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>
                      {cu.city}, {cu.state}
                    </span>
                  </div>
                </div>
                <span
                  className={`ml-auto shrink-0 px-2.5 py-1 rounded-lg border text-xs font-semibold ${OPP_COLORS[cu.opportunity]}`}
                >
                  {cu.opportunity === 'both' ? 'DAO + LOS' : cu.opportunity}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-900/60 rounded-lg p-3">
                  <DollarSign className="w-4 h-4 text-slate-500 mb-1" />
                  <p className="text-white font-bold text-lg">{formatAssets(cu.assets)}</p>
                  <p className="text-slate-400 text-[10px] uppercase tracking-wide">Total Assets</p>
                  <p
                    className={`text-[10px] mt-0.5 font-medium ${parseFloat(growthPct(cu.assets, cu.assets_prev)) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}
                  >
                    {growthPct(cu.assets, cu.assets_prev)} YoY
                  </p>
                </div>
                <div className="bg-slate-900/60 rounded-lg p-3">
                  <Users className="w-4 h-4 text-slate-500 mb-1" />
                  <p className="text-white font-bold text-lg">{cu.members.toLocaleString()}</p>
                  <p className="text-slate-400 text-[10px] uppercase tracking-wide">Members</p>
                  <p
                    className={`text-[10px] mt-0.5 font-medium ${parseFloat(growthPct(cu.members, cu.members_prev)) >= 0 ? 'text-emerald-400' : 'text-red-400'}`}
                  >
                    {growthPct(cu.members, cu.members_prev)} YoY
                  </p>
                </div>
                <div className="bg-slate-900/60 rounded-lg p-3">
                  <DollarSign className="w-4 h-4 text-slate-500 mb-1" />
                  <p className="text-white font-bold text-lg">{loanToShare}%</p>
                  <p className="text-slate-400 text-[10px] uppercase tracking-wide">Loan-to-Share</p>
                  <p
                    className={`text-[10px] mt-0.5 font-medium ${parseFloat(loanToShare) >= 70 ? 'text-amber-400' : 'text-slate-400'}`}
                  >
                    {parseFloat(loanToShare) >= 85 ? 'Near capacity' : parseFloat(loanToShare) >= 70 ? 'Elevated' : 'Normal'}
                  </p>
                </div>
                <div className="bg-slate-900/60 rounded-lg p-3">
                  <Calendar className="w-4 h-4 text-slate-500 mb-1" />
                  <p className="text-white font-bold text-lg">{cu.chartered}</p>
                  <p className="text-slate-400 text-[10px] uppercase tracking-wide">Chartered</p>
                  <p className="text-slate-500 text-[10px] mt-0.5">{new Date().getFullYear() - cu.chartered} years old</p>
                </div>
              </div>
            </div>

            <div className="shrink-0 flex flex-col items-center">
              <ScoreGauge score={cu.intentScore} priority={cu.priority} />
              <p className="text-slate-500 text-xs mt-2 text-center">Charter #{cu.id}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div>
            <h2 className="text-slate-400 font-semibold mb-3 text-sm uppercase tracking-wide">Signal Breakdown</h2>
            <SignalBreakdown signals={cu.signals} />
          </div>
          <div>
            <h2 className="text-slate-400 font-semibold mb-3 text-sm uppercase tracking-wide">Intelligence Summary</h2>
            <InsightNarrative narrative={cu.narrative} opportunity={cu.opportunity} />
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-slate-400 font-semibold mb-3 text-sm uppercase tracking-wide">
            Technology Stack &amp; Algebrik Fit
            {storedPatch && displayFit !== cu.algebrikFit && (
              <span className="ml-2 text-indigo-400 normal-case tracking-normal font-normal text-xs">
                · fit {displayFit} (adjusted from your intel)
              </span>
            )}
          </h2>
          <TechStackCard
            cuId={cu.id}
            scoringCu={cu}
            baseData={baseTech}
            data={mergedTech}
            algebrikFit={displayFit}
            baseFit={cu.algebrikFit}
            hasManualOverride={!!storedPatch}
            onOverrideSaved={() => {
              const next = readStoredOverrides()[cu.id];
              setStoredPatch(next && Object.keys(next).length ? next : null);
            }}
            onOverrideCleared={() => {
              setStoredPatch(null);
            }}
          />
        </div>

        <div className="mb-4">
          <h2 className="text-slate-400 font-semibold mb-3 text-sm uppercase tracking-wide">Live Intelligence</h2>
          <LiveIntelCard cuId={cu.id} />
        </div>

        <div>
          <h2 className="text-slate-400 font-semibold mb-3 text-sm uppercase tracking-wide">Outreach Generator</h2>
          <OutreachPanel cuId={cu.id} />
        </div>
      </div>
    </div>
  );
}

export default function SignalRadarCuPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center min-h-[calc(100vh-3.5rem)]">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
        </div>
      }
    >
      <CreditUnionDetailInner />
    </Suspense>
  );
}
