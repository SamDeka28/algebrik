'use client';

import type { Signal } from '@/types/signal-radar';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface Props {
  signals: Signal[];
}

function formatRawValue(sig: Signal): string {
  if (sig.id === 'assetSize') {
    const m = sig.rawValue / 1_000_000;
    return m >= 1000 ? `$${(m / 1000).toFixed(1)}B` : `$${Math.round(m)}M`;
  }
  if (sig.id === 'assetGrowth' || sig.id === 'memberGrowth') return `${sig.rawValue}%`;
  if (sig.id === 'loanToShare') return `${sig.rawValue}%`;
  if (sig.id === 'digitalGap') return `${sig.rawValue}`;
  return String(sig.rawValue);
}

const DIRECTION_ICONS = {
  positive: TrendingUp,
  warning: TrendingDown,
  neutral: Minus,
};

const DIRECTION_COLORS = {
  positive: 'text-emerald-400',
  warning: 'text-red-400',
  neutral: 'text-slate-400',
};

export default function SignalBreakdown({ signals }: Props) {
  return (
    <div className="space-y-3">
      {signals.map(sig => {
        const Icon = DIRECTION_ICONS[sig.direction];
        const iconColor = DIRECTION_COLORS[sig.direction];
        const barWidth = `${sig.subScore}%`;
        const barColor = sig.subScore >= 70 ? 'bg-red-500' : sig.subScore >= 45 ? 'bg-amber-500' : 'bg-emerald-500';

        return (
          <div key={sig.id} className="bg-slate-800/60 rounded-lg p-3 border border-slate-700">
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <Icon className={`w-4 h-4 flex-shrink-0 ${iconColor}`} />
                <div>
                  <p className="text-white text-sm font-medium">{sig.label}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{sig.insight}</p>
                </div>
              </div>
              <div className="flex-shrink-0 ml-3 text-right">
                <p className="text-white font-bold text-sm">{sig.subScore}<span className="text-slate-500 font-normal">/100</span></p>
                <p className="text-slate-500 text-[10px]">weight {sig.weight}%</p>
              </div>
            </div>
            <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${barColor}`}
                style={{ width: barWidth }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-slate-500 text-[10px]">Value: {formatRawValue(sig)}</span>
              <span className="text-slate-500 text-[10px]">Contribution: {Math.round(sig.subScore * sig.weight / 100)}pts</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
