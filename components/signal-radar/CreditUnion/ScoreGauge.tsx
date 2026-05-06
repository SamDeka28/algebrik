'use client';

interface Props {
  score: number;
  priority: 'hot' | 'warm' | 'cold';
}

const CFG = {
  hot:  { hex: '#ef4444', label: 'HIGH PRIORITY',     badge: 'bg-red-500/10 text-red-300 border-red-500/30' },
  warm: { hex: '#f59e0b', label: 'MODERATE PRIORITY',  badge: 'bg-amber-500/10 text-amber-300 border-amber-500/30' },
  cold: { hex: '#64748b', label: 'LOW PRIORITY',       badge: 'bg-slate-600/30 text-slate-400 border-slate-600/50' },
};

export default function ScoreGauge({ score, priority }: Props) {
  const { hex, label, badge } = CFG[priority];
  const deg = Math.round((score / 100) * 360);

  return (
    <div className="flex flex-col items-center gap-3">
      {/* CSS conic-gradient ring — no recharts, no layout dependency */}
      <div
        className="w-36 h-36 rounded-full flex items-center justify-center"
        style={{ background: `conic-gradient(${hex} ${deg}deg, #1e293b ${deg}deg)`, padding: '5px' }}
      >
        <div className="w-full h-full bg-slate-900 rounded-full flex flex-col items-center justify-center">
          <span className="text-4xl font-black text-white leading-none tracking-tight">{score}</span>
          <span className="text-slate-500 text-xs mt-0.5">/ 100</span>
        </div>
      </div>
      <span className={`text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full border ${badge}`}>
        {label}
      </span>
    </div>
  );
}
