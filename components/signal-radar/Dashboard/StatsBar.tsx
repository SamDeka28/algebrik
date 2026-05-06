'use client';

import type { ScoredCreditUnion } from '@/types/signal-radar';
import { TrendingUp, Flame, Thermometer, Snowflake } from 'lucide-react';

interface Props {
  creditUnions: ScoredCreditUnion[];
}

export default function StatsBar({ creditUnions }: Props) {
  const hot = creditUnions.filter(c => c.priority === 'hot').length;
  const warm = creditUnions.filter(c => c.priority === 'warm').length;
  const cold = creditUnions.filter(c => c.priority === 'cold').length;
  const avg = creditUnions.length
    ? Math.round(creditUnions.reduce((s, c) => s + c.intentScore, 0) / creditUnions.length)
    : 0;

  const stats = [
    { label: 'Total CUs', value: creditUnions.length.toLocaleString(), icon: TrendingUp, color: 'text-indigo-400' },
    { label: 'Hot', value: hot.toLocaleString(), icon: Flame, color: 'text-red-400' },
    { label: 'Warm', value: warm.toLocaleString(), icon: Thermometer, color: 'text-amber-400' },
    { label: 'Cold', value: cold.toLocaleString(), icon: Snowflake, color: 'text-emerald-400' },
    { label: 'Avg Score', value: `${avg}/100`, icon: TrendingUp, color: 'text-slate-300' },
  ];

  return (
    <div className="grid grid-cols-5 gap-2 mb-3">
      {stats.map(s => (
        <div key={s.label} className="bg-slate-800 rounded-lg p-2.5 border border-slate-700 text-center">
          <s.icon className={`w-4 h-4 mx-auto mb-1 ${s.color}`} />
          <p className="text-white font-bold text-lg leading-none">{s.value}</p>
          <p className="text-slate-400 text-[10px] mt-0.5 uppercase tracking-wide">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
