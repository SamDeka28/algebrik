import React, { useState } from 'react';
import { ActiveLoan, STATIONS, StaffMember } from '@/lib/loan-kitchen/data/gameData';
import {
  UserX,
  AlertTriangle,
  Clock,
  WifiOff,
  Flame,
  HeadphonesIcon,
  CheckCircle } from
'lucide-react';
const ALGEBRIK_LOGO = "/loan-kitchen-logo.png";

interface StationPanelProps {
  activeLoans: ActiveLoan[];
  onProcess: (loanId: string) => void;
  staffAssignments: Record<string, string | null>;
  staffMembers: StaffMember[];
  aiModules: Record<string, boolean>;
  legacyModules: Record<string, boolean>;
  glitchStations: Record<string, number>;
  maxPerStation: number;
}
export function StationPanel({
  activeLoans,
  onProcess,
  staffAssignments,
  staffMembers,
  aiModules,
  legacyModules,
  glitchStations,
  maxPerStation
}: StationPanelProps) {
  // Track which stations have raised a support ticket (for permanent glitches)
  const [ticketsRaised, setTicketsRaised] = useState<Record<string, boolean>>(
    {}
  );
  const raiseTicket = (stationId: string) => {
    setTicketsRaised((prev) => ({
      ...prev,
      [stationId]: true
    }));
  };
  const getAssignedStaff = (stationId: string): StaffMember | null => {
    const staffId = staffAssignments[stationId];
    if (!staffId) return null;
    return staffMembers.find((s) => s.id === staffId) ?? null;
  };
  return (
    <div className="flex-1 bg-slate-50 p-4 overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {STATIONS.map((station, index) => {
          const loansAtStation = activeLoans.filter(
            (l) => l.currentStationIndex === index
          );
          const activeCount = loansAtStation.length;
          const isFull = activeCount >= maxPerStation;
          const StationIcon = station.icon;
          const assignedStaff = getAssignedStaff(station.id);
          const hasStaff = !!assignedStaff;
          const hasAI = aiModules[station.id];
          const hasLegacy = legacyModules?.[station.id] ?? false;
          const isGlitched = (glitchStations?.[station.id] ?? 0) > 0;
          const glitchCountdown = glitchStations?.[station.id] ?? 0;
          const isPermanentGlitch = glitchCountdown === 999;
          const hasCriticalLoan = loansAtStation.some(
            (l) => l.patience / l.maxPatience < 0.2
          );
          return (
            <div
              key={station.id}
              className={`bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col transition-all ${isGlitched ? 'border-red-500 shadow-red-200 shadow-md' : hasCriticalLoan ? 'border-red-400 shadow-red-100 shadow-md' : isFull ? 'border-red-400 shadow-red-100 shadow-md' : hasAI ? 'border-blue-300 shadow-blue-100 shadow-md' : hasLegacy ? 'border-orange-300 shadow-orange-100' : hasStaff ? 'border-slate-200' : 'border-amber-300 shadow-amber-100'}`}
              style={{
                minHeight: '220px'
              }}>

              {/* Station Header */}
              <div
                className={`${station.color} p-2.5 text-white flex items-center justify-between`}>

                <div className="flex items-center space-x-1.5 min-w-0">
                  <StationIcon className="w-4 h-4 shrink-0" />
                  <span className="font-bold text-xs truncate">
                    {station.name}
                  </span>
                </div>
                <div className="flex items-center space-x-1 shrink-0">
                  <span
                    className={`text-[9px] font-black px-1.5 py-0.5 rounded ${isFull ? 'bg-red-600 text-white animate-pulse' : 'bg-white/20 text-white'}`}>

                    {activeCount}/{maxPerStation}
                  </span>

                  {/* Algebrik AI badge */}
                  {hasAI &&
                  <span className="bg-white/20 border border-white/40 px-1.5 py-0.5 rounded flex items-center space-x-1">
                      <img
                      src={ALGEBRIK_LOGO}
                      alt="Algebrik AI"
                      className="w-3.5 h-3.5 rounded-sm" />

                      <span className="text-[9px] font-black text-white">
                        AI
                      </span>
                    </span>
                  }

                  {hasLegacy && !hasAI &&
                  <span className="text-[9px] bg-orange-400/90 text-white font-black px-1.5 py-0.5 rounded flex items-center space-x-0.5">
                      <span>💾</span>
                      <span>LEGACY</span>
                    </span>
                  }

                  {hasStaff ?
                  <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded">
                      {assignedStaff.emoji}
                    </span> :

                  <span className="text-[9px] bg-amber-400/80 text-amber-900 font-bold px-1.5 py-0.5 rounded">
                      <UserX className="w-2.5 h-2.5" />
                    </span>
                  }
                </div>
              </div>

              {/* Status bars */}
              {isGlitched &&
              <div className="bg-red-600 px-2.5 py-1 flex items-center space-x-1.5 animate-pulse">
                  <WifiOff className="w-3 h-3 text-red-200 shrink-0" />
                  <span className="text-[10px] text-red-100 font-black">
                    {isPermanentGlitch ?
                  'PERMANENT FAILURE — CASCADE COLLAPSE' :
                  `SYSTEM ERROR — ${glitchCountdown}s OFFLINE`}
                  </span>
                </div>
              }

              {!isGlitched && hasAI &&
              <div className="bg-blue-600 px-2.5 py-1 flex items-center space-x-1.5">
                  <img
                  src={ALGEBRIK_LOGO}
                  alt="Algebrik AI"
                  className="w-3.5 h-3.5 rounded-sm shrink-0" />

                  <span className="text-[10px] text-blue-100 font-bold">
                    Algebrik AI — Auto-Processing
                  </span>
                </div>
              }

              {!isGlitched && hasLegacy && !hasAI &&
              <div className="bg-orange-500 px-2.5 py-1 flex items-center space-x-1.5">
                  <span className="text-[10px] text-orange-100 font-bold">
                    💾 Legacy System — Manual Only · Glitch Risk
                  </span>
                </div>
              }

              {/* Station Content */}
              <div className="flex-1 p-2.5 bg-slate-50 relative overflow-y-auto">
                {/* Glitch overlay */}
                {isGlitched &&
                <div className="absolute inset-0 bg-red-900/20 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center rounded-b-xl border-2 border-red-400/30 px-3">
                    <WifiOff className="w-7 h-7 text-red-500 mb-1" />
                    <span className="text-xs font-black text-red-700">
                      SYSTEM ERROR
                    </span>
                    <span className="text-[10px] text-red-500 mt-0.5 text-center">
                      {isPermanentGlitch ?
                    'Permanent failure — cascade collapse' :
                    `Back online in ${glitchCountdown}s`}
                    </span>

                    {/* Contact Support button — only for permanent (cascade) glitches */}
                    {isPermanentGlitch &&
                  <div className="mt-2.5">
                        {ticketsRaised[station.id] ?
                    <div className="flex items-center space-x-1.5 bg-emerald-100 border border-emerald-300 text-emerald-700 text-[9px] font-black px-2.5 py-1.5 rounded-lg">
                            <CheckCircle className="w-3 h-3 shrink-0" />
                            <span>Ticket Raised (ETA: 48 Hours)</span>
                          </div> :

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        raiseTicket(station.id);
                      }}
                      className="flex items-center space-x-1.5 bg-white border border-red-300 text-red-700 text-[9px] font-black px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition-colors shadow-sm">

                            <HeadphonesIcon className="w-3 h-3 shrink-0" />
                            <span>Contact Support</span>
                          </button>
                    }
                      </div>
                  }
                  </div>
                }

                {!hasStaff && !isGlitched &&
                <div className="absolute inset-0 bg-amber-50/80 backdrop-blur-[1px] z-10 flex flex-col items-center justify-center rounded-b-xl">
                    <UserX className="w-6 h-6 text-amber-500 mb-1" />
                    <span className="text-xs font-bold text-amber-700 text-center px-2">
                      Assign Staff
                    </span>
                  </div>
                }

                {loansAtStation.length === 0 ?
                <div className="h-full flex flex-col items-center justify-center text-slate-400 py-4">
                    <StationIcon className="w-6 h-6 opacity-30 mb-1" />
                    <span className="text-xs">Idle</span>
                    {hasAI &&
                  <div className="flex items-center space-x-1 mt-1">
                        <img
                      src={ALGEBRIK_LOGO}
                      alt="Algebrik AI"
                      className="w-3.5 h-3.5 rounded-sm opacity-70" />

                        <span className="text-[9px] text-blue-400 font-bold">
                          AI Standby
                        </span>
                      </div>
                  }
                    {hasLegacy && !hasAI &&
                  <span className="text-[9px] text-orange-400 font-bold mt-1">
                        💾 Legacy Ready
                      </span>
                  }
                  </div> :

                <div className="space-y-2">
                    {loansAtStation.map((loan) => {
                    const isAutoProcessing = loan.autoProcessing === true;
                    const isWaiting = loan.waitingForStation === true;
                    const needsManualReview =
                    !isAutoProcessing && !isWaiting && hasAI;
                    const patiencePct =
                    loan.patience / loan.maxPatience * 100;
                    const isCritical = patiencePct < 20;
                    const isWarning = patiencePct < 45;
                    return (
                      <div
                        key={loan.id}
                        onClick={() =>
                        !isAutoProcessing &&
                        !isWaiting &&
                        !isGlitched &&
                        hasStaff &&
                        onProcess(loan.id)
                        }
                        className={`bg-white rounded-lg border shadow-sm transition-all group relative overflow-hidden ${isGlitched ? 'border-red-200 opacity-50 cursor-not-allowed' : isCritical ? 'border-red-400 shadow-red-100 cursor-pointer animate-pulse' : isWaiting ? 'border-orange-300 bg-orange-50/50 cursor-default' : isAutoProcessing ? 'border-blue-300 bg-blue-50/50 cursor-default' : needsManualReview ? 'border-amber-400 cursor-pointer hover:border-amber-500 hover:shadow-md' : hasStaff ? 'border-slate-200 cursor-pointer hover:border-blue-400 hover:shadow-md' : 'border-slate-200 cursor-not-allowed opacity-60'}`}>

                          {/* Patience urgency stripe */}
                          <div
                          className={`h-1.5 w-full transition-all duration-1000 ${isCritical ? 'bg-red-500' : isWarning ? 'bg-yellow-400' : 'bg-emerald-400'}`}
                          style={{
                            width: `${patiencePct}%`
                          }} />


                          <div className="p-2">
                            <div className="flex justify-between items-center mb-1">
                              <div className="flex items-center space-x-1.5 min-w-0">
                                <span className="text-base shrink-0">
                                  {loan.avatar}
                                </span>
                                <div className="min-w-0">
                                  <div className="text-[10px] font-bold text-slate-700 truncate">
                                    {loan.name}
                                  </div>
                                  <div className="text-[9px] text-slate-500 uppercase">
                                    {loan.type}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-1 shrink-0">
                                <span
                                className={`text-[9px] font-black px-1 py-0.5 rounded ${isCritical ? 'bg-red-100 text-red-700' : isWarning ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>

                                  {Math.round(patiencePct)}%
                                </span>
                                <div
                                className={`text-[9px] font-bold px-1 py-0.5 rounded ${loan.riskGrade === 'A' ? 'bg-green-100 text-green-700' : loan.riskGrade === 'F' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>

                                  {loan.riskGrade}
                                </div>
                              </div>
                            </div>

                            {/* Patience bar */}
                            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-1.5">
                              <div
                              className={`h-full rounded-full transition-all duration-1000 ${isCritical ? 'bg-red-500' : isWarning ? 'bg-yellow-400' : 'bg-emerald-400'}`}
                              style={{
                                width: `${patiencePct}%`
                              }} />

                            </div>

                            {/* Progress bar */}
                            <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                              {isWaiting ?
                            <div className="h-full bg-orange-400 w-full" /> :
                            isAutoProcessing ?
                            <div
                              className="h-full bg-blue-500 transition-all duration-1000 ease-linear"
                              style={{
                                width: `${loan.progress}%`
                              }} /> :


                            <div
                              className={`h-full transition-all duration-300 ${station.color}`}
                              style={{
                                width: `${loan.progress}%`
                              }} />

                            }
                            </div>

                            {/* Status label */}
                            <div className="mt-1 text-center">
                              {isCritical && !isAutoProcessing && !isWaiting ?
                            <span className="text-[9px] font-black text-red-600 flex items-center justify-center space-x-0.5">
                                  <Flame className="w-2.5 h-2.5" />
                                  <span>LEAVING SOON! PROCESS NOW</span>
                                </span> :
                            isWaiting ?
                            <span className="text-[9px] font-bold text-orange-600 flex items-center justify-center space-x-0.5">
                                  <Clock className="w-2.5 h-2.5" />
                                  <span>Waiting — Next Stage Full</span>
                                </span> :
                            isAutoProcessing ?
                            <span className="text-[9px] font-bold text-blue-600 flex items-center justify-center space-x-1">
                                  <img
                                src={ALGEBRIK_LOGO}
                                alt="Algebrik AI"
                                className="w-3 h-3 rounded-sm animate-pulse" />

                                  <span>
                                    AI Processing… {loan.autoProcessTimer}s
                                  </span>
                                </span> :
                            needsManualReview ?
                            <span className="text-[9px] font-bold text-amber-600 flex items-center justify-center space-x-0.5">
                                  <AlertTriangle className="w-2.5 h-2.5" />
                                  <span>Manual Review</span>
                                </span> :
                            hasStaff ?
                            <span className="text-[9px] font-bold text-blue-600">
                                  {hasLegacy ? '💾 ' : ''}
                                  {station.actionLabel}
                                </span> :
                            null}
                            </div>
                          </div>
                        </div>);

                  })}
                  </div>
                }
              </div>
            </div>);

        })}
      </div>
    </div>);

}