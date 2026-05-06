'use client';

export default function MapLegend() {
  return (
    <div className="absolute bottom-6 right-4 z-[400] bg-white/95 backdrop-blur rounded-xl shadow-lg border border-slate-200 p-3 text-xs">
      <p className="font-semibold text-slate-700 mb-2 text-[11px] uppercase tracking-wide">Intent Score</p>
      <div className="flex items-center gap-1.5 mb-1">
        <div className="w-4 h-4 rounded-full bg-red-500 opacity-80 flex-shrink-0" />
        <span className="text-slate-600">Hot (≥70)</span>
      </div>
      <div className="flex items-center gap-1.5 mb-1">
        <div className="w-3.5 h-3.5 rounded-full bg-amber-400 opacity-80 flex-shrink-0" />
        <span className="text-slate-600">Warm (45–69)</span>
      </div>
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-full bg-emerald-500 opacity-80 flex-shrink-0" />
        <span className="text-slate-600">Cold (&lt;45)</span>
      </div>
      <div className="mt-2 pt-2 border-t border-slate-100 text-slate-400 text-[10px]">
        Circle size = score magnitude
      </div>
    </div>
  );
}
