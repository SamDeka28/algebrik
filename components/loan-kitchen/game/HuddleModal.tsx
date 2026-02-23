import React, { useState, createElement } from 'react';
import { HuddleEvent, HuddleDecision } from '@/lib/loan-kitchen/data/huddleData';
import { STATIONS } from '@/lib/loan-kitchen/data/gameData';
import {
  X,
  AlertTriangle,
  Info,
  CheckCircle,
  TrendingDown,
  ChevronRight } from
'lucide-react';
interface HuddleModalProps {
  huddle: HuddleEvent;
  onDecide: (decision: HuddleDecision) => void;
  onClose: () => void;
}
const STATUS_STYLES = {
  good: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  warning: 'text-amber-700 bg-amber-50 border-amber-200',
  critical: 'text-red-700 bg-red-50 border-red-200',
  neutral: 'text-slate-600 bg-slate-50 border-slate-200'
};
const FLAG_STYLES = {
  critical: {
    bg: 'bg-red-100 border-red-300 text-red-800',
    icon: <AlertTriangle className="w-3.5 h-3.5" />
  },
  warning: {
    bg: 'bg-amber-100 border-amber-300 text-amber-800',
    icon: <AlertTriangle className="w-3.5 h-3.5" />
  },
  info: {
    bg: 'bg-blue-100 border-blue-300 text-blue-800',
    icon: <Info className="w-3.5 h-3.5" />
  }
};
const STATION_HEADER_COLORS: Record<string, string> = {
  account: 'bg-blue-600',
  pos: 'bg-purple-600',
  origination: 'bg-yellow-600',
  decisioning: 'bg-red-700',
  analytics: 'bg-emerald-700'
};
export function HuddleModal({ huddle, onDecide, onClose }: HuddleModalProps) {
  const [hoveredDecision, setHoveredDecision] = useState<HuddleDecision | null>(
    null
  );
  const station = STATIONS[huddle.stationIndex];
  const headerColor = STATION_HEADER_COLORS[huddle.stationId];
  const hasCriticalFlags = huddle.flags.some((f) => f.severity === 'critical');
  const decisionButtons: {
    key: HuddleDecision;
    config: typeof huddle.decisions.approve;
    style: string;
    icon: React.ReactNode;
  }[] = [
  {
    key: 'approve',
    config: huddle.decisions.approve,
    style:
    huddle.decisions.approve.pointDelta < 0 ?
    'bg-red-50 border-red-300 text-red-700 hover:bg-red-100' :
    'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100',
    icon: <CheckCircle className="w-4 h-4" />
  },
  {
    key: 'flag',
    config: huddle.decisions.flag,
    style: 'bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100',
    icon: <AlertTriangle className="w-4 h-4" />
  },
  {
    key: 'reject',
    config: huddle.decisions.reject,
    style:
    huddle.decisions.reject.pointDelta > 0 ?
    'bg-emerald-50 border-emerald-300 text-emerald-700 hover:bg-emerald-100' :
    'bg-red-50 border-red-300 text-red-700 hover:bg-red-100',
    icon: <TrendingDown className="w-4 h-4" />
  }];

  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div
          className={`${headerColor} p-4 text-white flex items-start justify-between shrink-0`}>

          <div className="flex items-center space-x-3">
            <div className="p-2 bg-white/20 rounded-lg">
              {createElement(station.icon, {
                className: 'w-5 h-5'
              })}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-black text-lg leading-none">
                  {huddle.title}
                </span>
                <span className="text-xs bg-white/20 font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
                  Huddle
                </span>
              </div>
              <p className="text-white/70 text-xs mt-0.5">{huddle.subtitle}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/20 rounded-lg transition-colors ml-2 shrink-0">

            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Customer Info Bar */}
        <div className="bg-slate-800 px-4 py-2.5 flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3">
            <span className="text-2xl">{huddle.customer.avatar}</span>
            <div>
              <div className="text-white font-bold text-sm">
                {huddle.customer.name}
              </div>
              <div className="text-slate-400 text-xs">
                {huddle.customer.type} · $
                {huddle.customer.amount.toLocaleString()}
              </div>
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-black border ${huddle.customer.riskGrade === 'A' || huddle.customer.riskGrade === 'B' ? 'bg-emerald-900/50 border-emerald-600 text-emerald-300' : huddle.customer.riskGrade === 'F' ? 'bg-red-900/50 border-red-600 text-red-300' : 'bg-amber-900/50 border-amber-600 text-amber-300'}`}>

            Grade {huddle.customer.riskGrade}
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Risk Flags */}
          {huddle.flags.length > 0 &&
          <div className="px-4 pt-4 pb-2 space-y-2">
              {huddle.flags.map((flag, i) => {
              const style = FLAG_STYLES[flag.severity];
              return (
                <div
                  key={i}
                  className={`flex items-start space-x-2 px-3 py-2 rounded-lg border text-xs font-medium ${style.bg}`}>

                    <span className="mt-0.5 shrink-0">{style.icon}</span>
                    <div>
                      <span className="font-black">{flag.label}</span>
                      <span className="mx-1.5 opacity-50">—</span>
                      <span className="opacity-80">{flag.description}</span>
                    </div>
                  </div>);

            })}
            </div>
          }

          {/* Data Points Grid */}
          <div className="px-4 py-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
              Risk Indicators
            </div>
            <div className="grid grid-cols-2 gap-2">
              {huddle.dataPoints.map((dp, i) =>
              <div
                key={i}
                className={`px-3 py-2 rounded-lg border text-xs ${STATUS_STYLES[dp.status]}`}>

                  <div className="font-bold opacity-60 mb-0.5">{dp.label}</div>
                  <div className="font-black text-sm">{dp.value}</div>
                </div>
              )}
            </div>
          </div>

          {/* Recommended Decision */}
          <div className="px-4 pb-3">
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-2">
              System Recommendation
            </div>
            <div
              className={`px-3 py-2 rounded-lg text-xs font-bold flex items-center space-x-2 ${huddle.recommendedDecision === 'approve' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : huddle.recommendedDecision === 'reject' ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-amber-50 text-amber-700 border border-amber-200'}`}>

              <ChevronRight className="w-3.5 h-3.5 shrink-0" />
              <span>
                Recommended:{' '}
                <span className="uppercase">{huddle.recommendedDecision}</span>
                {huddle.recommendedDecision === 'reject' &&
                hasCriticalFlags &&
                ' — Critical flags detected'}
                {huddle.recommendedDecision === 'approve' &&
                ' — Meets all criteria'}
                {huddle.recommendedDecision === 'flag' &&
                ' — Borderline case, escalate'}
              </span>
            </div>
          </div>
        </div>

        {/* Decision Buttons */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-2 shrink-0">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wide mb-3">
            Your Decision
          </div>
          {decisionButtons.map(({ key, config, style, icon }) =>
          <button
            key={key}
            onClick={() => onDecide(key)}
            onMouseEnter={() => setHoveredDecision(key)}
            onMouseLeave={() => setHoveredDecision(null)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border-2 font-bold text-sm transition-all ${style}`}>

              <div className="flex items-center space-x-2">
                {icon}
                <span>{config.label}</span>
              </div>
              <div className="flex items-center space-x-3">
                {hoveredDecision === key &&
              <span className="text-xs opacity-70 font-normal max-w-[180px] text-right leading-tight">
                    {config.description}
                  </span>
              }
                <span
                className={`text-sm font-black font-mono ${config.pointDelta > 0 ? 'text-emerald-600' : 'text-red-600'}`}>

                  {config.pointDelta > 0 ? '+' : ''}
                  {config.pointDelta}
                </span>
              </div>
            </button>
          )}
        </div>
      </div>
    </div>);

}