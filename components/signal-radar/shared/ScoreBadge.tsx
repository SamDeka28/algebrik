'use client';

interface Props {
  score: number;
  priority: 'hot' | 'warm' | 'cold';
  size?: 'sm' | 'md' | 'lg';
}

const COLORS = {
  hot: 'bg-red-500/15 text-red-300 border-red-500/35',
  warm: 'bg-amber-500/15 text-amber-300 border-amber-500/35',
  cold: 'bg-slate-600/40 text-slate-300 border-slate-500/40',
};

const DOTS = {
  hot: 'bg-red-500',
  warm: 'bg-amber-500',
  cold: 'bg-emerald-500',
};

const SIZES = {
  sm: 'text-xs px-1.5 py-0.5 gap-1',
  md: 'text-sm px-2.5 py-1 gap-1.5',
  lg: 'text-base px-3 py-1.5 gap-2',
};

export default function ScoreBadge({ score, priority, size = 'md' }: Props) {
  return (
    <span className={`inline-flex items-center rounded-full border font-semibold ${COLORS[priority]} ${SIZES[size]}`}>
      <span className={`w-2 h-2 rounded-full ${DOTS[priority]}`} />
      {score}
      <span className="font-normal opacity-70 text-[0.85em]">/100</span>
      <span className="ml-0.5 uppercase tracking-wide text-[0.75em]">{priority}</span>
    </span>
  );
}
