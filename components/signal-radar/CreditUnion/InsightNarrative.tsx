'use client';

import { Lightbulb } from 'lucide-react';

interface Props {
  narrative: string;
  opportunity: 'DAO' | 'LOS' | 'both';
}

const OPP_DESCRIPTIONS = {
  DAO: {
    label: 'Digital Account Opening',
    description: 'This credit union shows signals aligned with a Digital Account Opening evaluation — rapid membership growth and digital engagement demand.',
    color: 'border-blue-500/40 bg-blue-500/5',
    textColor: 'text-blue-300',
  },
  LOS: {
    label: 'Loan Origination System',
    description: 'This credit union shows signals aligned with a Loan Origination System evaluation — elevated loan-to-share ratio and asset growth pressure.',
    color: 'border-purple-500/40 bg-purple-500/5',
    textColor: 'text-purple-300',
  },
  both: {
    label: 'DAO + LOS',
    description: 'This credit union shows strong signals for both Digital Account Opening and Loan Origination — a high-value dual-opportunity account.',
    color: 'border-indigo-500/40 bg-indigo-500/5',
    textColor: 'text-indigo-300',
  },
};

export default function InsightNarrative({ narrative, opportunity }: Props) {
  const opp = OPP_DESCRIPTIONS[opportunity];

  return (
    <div className="space-y-3">
      <div className={`rounded-lg border p-3 ${opp.color}`}>
        <p className={`text-xs font-semibold uppercase tracking-wide mb-1 ${opp.textColor}`}>
          Primary Opportunity: {opp.label}
        </p>
        <p className="text-slate-300 text-sm">{opp.description}</p>
      </div>

      <div className="bg-slate-800/60 rounded-lg border border-slate-700 p-4">
        <div className="flex items-center gap-2 mb-2">
          <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0" />
          <p className="text-white text-sm font-semibold">Why Now</p>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed">{narrative}</p>
      </div>
    </div>
  );
}
