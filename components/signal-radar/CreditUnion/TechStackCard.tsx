'use client';

import { useState, useEffect } from 'react';
import type { ScoredCreditUnion } from '@/types/signal-radar';
import { Monitor, Smartphone, FileSignature, Globe, Server, CheckCircle2, HelpCircle, Pencil } from 'lucide-react';
import TechStackOverrideModal from './TechStackOverrideModal';

interface TechStackData {
  coreProcessor?: string | null;
  consumerLOS?: string | null;
  mobileApp?: string | null;
  eSignProvider?: string | null;
  onlineBanking?: string | null;
  website?: string | null;
}

interface Props {
  cuId: string;
  /** Merged tech row (Callahan + any stored override) */
  data: TechStackData;
  /** Callahan-only baseline for reset after clear */
  baseData: TechStackData;
  /** Scored CU for client-side fit recompute */
  scoringCu: ScoredCreditUnion;
  algebrikFit: number;
  /** Original fit from static JSON (before local override) */
  baseFit: number;
  hasManualOverride?: boolean;
  onOverrideSaved?: (newFit: number, newData: TechStackData) => void;
  onOverrideCleared?: () => void;
}

const COMPETITOR_LOS = ['meridianlink', 'origence', 'temenos', 'finastra', 'sync1', 'visifi', 'nymbus', 'q2', 'ncino'];
const LEGACY_LOS = ['enhanced loan application', 'fiserv: velocity', 'fiserv: loan director', 'lendervp', 'nsloan', 'decisionlender'];

function losClassify(v: string | null | undefined): 'none' | 'legacy' | 'competitor' | 'modern' | 'undeclared' {
  if (!v) return 'undeclared';
  const k = v.toLowerCase();
  if (COMPETITOR_LOS.some(c => k.includes(c))) return 'competitor';
  if (LEGACY_LOS.some(c => k.includes(c))) return 'legacy';
  return 'modern';
}

function StackRow({ icon: Icon, label, value, isLOS = false, isOverridden = false }: {
  icon: React.ElementType; label: string; value: string | null | undefined; isLOS?: boolean; isOverridden?: boolean;
}) {
  const hasData = !!value;
  const losClass = isLOS ? losClassify(value) : null;

  const badge = isLOS && losClass
    ? losClass === 'competitor'
      ? <span className="text-[9px] px-1.5 py-0.5 bg-red-900/40 text-red-300 border border-red-700/40 rounded-full ml-1">Competitor</span>
      : losClass === 'legacy'
      ? <span className="text-[9px] px-1.5 py-0.5 bg-amber-900/40 text-amber-300 border border-amber-700/40 rounded-full ml-1">Legacy — replaceable</span>
      : losClass === 'undeclared'
      ? <span className="text-[9px] px-1.5 py-0.5 bg-slate-700 text-slate-400 border border-slate-600 rounded-full ml-1">Not declared</span>
      : <span className="text-[9px] px-1.5 py-0.5 bg-blue-900/40 text-blue-300 border border-blue-700/40 rounded-full ml-1">Modern</span>
    : null;

  return (
    <div className="flex items-center gap-2.5 py-2 border-b border-slate-700/50 last:border-0">
      <Icon className={`w-4 h-4 flex-shrink-0 ${hasData ? 'text-slate-400' : 'text-slate-600'}`} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1">
          <p className="text-slate-400 text-[10px] uppercase tracking-wide">{label}</p>
          {isOverridden && hasData && (
            <span className="text-[9px] px-1.5 py-0.5 bg-indigo-900/40 text-indigo-300 border border-indigo-700/40 rounded-full">You entered</span>
          )}
        </div>
        <div className="flex items-center gap-1 flex-wrap">
          {hasData ? (
            <p className="text-white text-xs truncate">{value}</p>
          ) : (
            <p className="text-slate-500 text-xs italic">Not in Callahan data</p>
          )}
          {badge}
        </div>
      </div>
      {hasData
        ? <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
        : <HelpCircle className="w-4 h-4 text-slate-600 flex-shrink-0" />
      }
    </div>
  );
}

const FIT_COLORS = {
  high: { bar: 'bg-indigo-500', text: 'text-indigo-400', label: 'Strong Fit' },
  medium: { bar: 'bg-amber-500', text: 'text-amber-400', label: 'Moderate Fit' },
  low: { bar: 'bg-slate-500', text: 'text-slate-400', label: 'Weak Fit' },
};

export default function TechStackCard({
  cuId,
  baseData,
  scoringCu,
  data: initialData,
  algebrikFit: initialFit,
  baseFit,
  hasManualOverride = false,
  onOverrideSaved,
  onOverrideCleared,
}: Props) {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(initialData);
  const [algebrikFit, setAlgebrikFit] = useState(initialFit);
  const [isOverridden, setIsOverridden] = useState(hasManualOverride);

  useEffect(() => {
    setData(initialData);
    setAlgebrikFit(initialFit);
    setIsOverridden(hasManualOverride);
  }, [initialData, initialFit, hasManualOverride]);

  const fitTier = algebrikFit >= 65 ? 'high' : algebrikFit >= 40 ? 'medium' : 'low';
  const fitColors = FIT_COLORS[fitTier];

  function handleSaved(newFit: number, newData: TechStackData) {
    setAlgebrikFit(newFit);
    setData(newData);
    setIsOverridden(true);
    setShowModal(false);
    onOverrideSaved?.(newFit, newData);
  }

  function handleCleared() {
    setData(baseData);
    setAlgebrikFit(baseFit);
    setIsOverridden(false);
    setShowModal(false);
    onOverrideCleared?.();
  }

  return (
    <>
      <div className="bg-slate-800/60 rounded-xl border border-slate-700 overflow-hidden">
        {/* Algebrik Fit Header */}
        <div className="bg-slate-800 border-b border-slate-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="text-white font-semibold text-sm">Algebrik Fit Score</p>
              <p className="text-slate-400 text-xs mt-0.5">Based on LOS landscape, size, financial pressure &amp; core compatibility</p>
            </div>
            <div className="text-right">
              <p className={`text-2xl font-black ${fitColors.text}`}>{algebrikFit}</p>
              <p className={`text-[10px] font-semibold uppercase tracking-wide ${fitColors.text}`}>{fitColors.label}</p>
            </div>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all ${fitColors.bar}`} style={{ width: `${algebrikFit}%` }} />
          </div>
          {/* Show cap warning when no tech stack data available */}
          {!data.coreProcessor && !data.consumerLOS && !data.mobileApp && !data.onlineBanking && !data.eSignProvider && !isOverridden && (
            <p className="mt-2 text-amber-400/80 text-[10px] flex items-center gap-1">
              <span>⚠</span>
              Score capped at 70 — tech stack unknown. Use <span className="font-semibold">&quot;Add intel&quot;</span> to unlock full scoring.
            </p>
          )}
        </div>

        {/* Tech Stack */}
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-semibold">
              Technology Stack
              {isOverridden && <span className="ml-2 text-indigo-400 normal-case tracking-normal font-normal">(manually updated)</span>}
            </p>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-1 text-[10px] text-slate-400 hover:text-indigo-300 transition-colors px-2 py-1 rounded hover:bg-slate-700"
              title="Manually enter or override tech stack"
            >
              <Pencil className="w-3 h-3" />
              {isOverridden ? 'Edit override' : 'Add intel'}
            </button>
          </div>
          <StackRow icon={Server} label="Core Processor" value={data.coreProcessor} isOverridden={isOverridden} />
          <StackRow icon={FileSignature} label="Consumer LOS" value={data.consumerLOS} isLOS isOverridden={isOverridden} />
          <StackRow icon={Smartphone} label="Mobile Banking App" value={data.mobileApp} isOverridden={isOverridden} />
          <StackRow icon={Globe} label="Online Banking Platform" value={data.onlineBanking} isOverridden={isOverridden} />
          <StackRow icon={Monitor} label="eSignature Provider" value={data.eSignProvider} isOverridden={isOverridden} />
          {data.website && (
            <div className="flex items-center gap-2 pt-2 mt-1">
              <Globe className="w-4 h-4 text-indigo-400" />
              <a href={data.website} target="_blank" rel="noopener noreferrer"
                 className="text-indigo-400 hover:text-indigo-300 text-xs underline underline-offset-2">
                {data.website}
              </a>
            </div>
          )}
        </div>

        <div className="px-4 pb-3 text-slate-500 text-[10px]">
          Source: Callahan &amp; Associates Q3 2024 · Missing fields = not captured (not confirmed absence).
          {isOverridden && ' · Fields marked "You entered" are from your manual intel.'}
        </div>
      </div>

      {showModal && (
        <TechStackOverrideModal
          cuId={cuId}
          scoringCu={scoringCu}
          currentData={data}
          onSaved={handleSaved}
          onCleared={handleCleared}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
}
