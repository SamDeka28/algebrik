import React, { useEffect, useState } from 'react';
import {
  RotateCcw,
  Home,
  Trophy,
  AlertTriangle,
  TrendingDown,
  Star } from
'lucide-react';
import { GameOverReason } from '@/hooks/loan-kitchen/useGameEngine';
import {
  addLeaderboardEntry,
  isHighScore,
  getLeaderboard,
  LeaderboardEntry } from
'@/lib/loan-kitchen/data/leaderboard';
const ALGEBRIK_LOGO = "/loan-kitchen-logo.png";

interface ResultsScreenProps {
  score: number;
  stats: {
    totalLoans: number;
    totalVolume: number;
    defaultRate: number;
    health: number;
  };
  brandEquity: number;
  gameOverReason: GameOverReason;
  onRestart: () => void;
  onMenu: () => void;
  algebrikActive?: boolean;
}
export function ResultsScreen({
  score,
  stats,
  brandEquity,
  gameOverReason,
  onRestart,
  onMenu,
  algebrikActive = false
}: ResultsScreenProps) {
  const [name, setName] = useState('');
  const [saved, setSaved] = useState(false);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const highScore = isHighScore(score);
  useEffect(() => {
    setLeaderboard(getLeaderboard());
  }, [saved]);
  const isPortfolioCollapse = gameOverReason === 'portfolio';
  const isBrandCollapse = gameOverReason === 'brand';
  const isLegacyCollapse = gameOverReason === 'legacy_collapse';
  // Brand collapse while already using Algebrik → "Better Luck Next Time" (no upsell)
  const isBrandCollapseWithAlgebrik = isBrandCollapse && algebrikActive;
  // Show Algebrik CTA only when NOT already using Algebrik
  const isAlgebrikCTA = (isLegacyCollapse || isBrandCollapse) && !algebrikActive;
  const isWin =
  !isPortfolioCollapse &&
  !isBrandCollapse &&
  !isLegacyCollapse &&
  stats.health > 50;
  const headerConfig = isLegacyCollapse ?
  {
    bg: 'bg-gradient-to-br from-slate-900 via-red-950 to-slate-900',
    icon: <span className="text-4xl">💾</span>,
    title: 'LEGACY SYSTEM COLLAPSE',
    subtitle:
    'Your entire stack crashed. You could have been on the leaderboard.'
  } :
  isPortfolioCollapse ?
  {
    bg: 'bg-red-700',
    icon: <TrendingDown className="w-10 h-10 text-white" />,
    title: 'PORTFOLIO COLLAPSE',
    subtitle: 'Too many bad loans approved.'
  } :
  isBrandCollapse ?
  {
    bg: isBrandCollapseWithAlgebrik ?
    'bg-gradient-to-br from-slate-700 via-slate-600 to-slate-800' :
    'bg-gradient-to-br from-pink-800 via-pink-700 to-rose-800',
    icon: isBrandCollapseWithAlgebrik ?
    <span className="text-4xl">🍀</span> :

    <Star className="w-10 h-10 text-white" />,

    title: isBrandCollapseWithAlgebrik ?
    'BETTER LUCK NEXT TIME' :
    'BRAND COLLAPSE',
    subtitle: isBrandCollapseWithAlgebrik ?
    'Even with Algebrik AI, brand equity needs attention. Keep queues short!' :
    'Customer experience failures destroyed your brand equity.'
  } :
  isWin ?
  {
    bg: 'bg-blue-700',
    icon: <Trophy className="w-10 h-10 text-white" />,
    title: 'SHIFT COMPLETE',
    subtitle: 'Great work today, officer!'
  } :
  {
    bg: 'bg-red-600',
    icon: <AlertTriangle className="w-10 h-10 text-white" />,
    title: 'DEPARTMENT CLOSED',
    subtitle: 'Portfolio health critical!'
  };
  const handleSave = () => {
    if (!name.trim()) return;
    addLeaderboardEntry({
      name: name.trim(),
      score,
      loans: stats.totalLoans,
      health: Math.round(stats.health),
      brandEquity: Math.round(brandEquity)
    });
    setSaved(true);
    setShowLeaderboard(true);
  };
  const RANK_ICONS = ['🥇', '🥈', '🥉'];
  // Tailored copy per collapse type
  const algebrikCtaCopy = isLegacyCollapse ?
  'Algebrik AI auto-processes loans, chains stages seamlessly, and never crashes. Experience lending like never before — no downtime, no glitches, just speed.' :
  'Algebrik AI keeps customers moving fast — auto-processing clean loans means shorter queues, happier customers, and a brand that thrives.';
  return (
    <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className={`${headerConfig.bg} p-6 text-center shrink-0`}>
          <div className="inline-flex p-3 rounded-full bg-white/20 mb-3">
            {headerConfig.icon}
          </div>
          <h2 className="text-2xl font-black text-white mb-1">
            {headerConfig.title}
          </h2>
          <p className="text-white/80 text-sm">{headerConfig.subtitle}</p>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6">
            {/* ── Algebrik AI CTA — shown for legacy/brand collapse when NOT already using Algebrik ── */}
            {isAlgebrikCTA &&
            <div className="mb-5 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-2xl p-5 text-center shadow-sm">
                <img
                src={ALGEBRIK_LOGO}
                alt="Algebrik AI"
                className="w-16 h-16 rounded-2xl mx-auto mb-3 shadow-lg" />

                <div className="font-black text-blue-900 text-lg mb-1">
                  Try Again with Algebrik AI
                </div>
                <div className="text-blue-600 text-sm leading-relaxed mb-3">
                  {algebrikCtaCopy}
                </div>
                <div className="flex items-center justify-center flex-wrap gap-2 text-xs">
                  {[
                {
                  icon: '🤖',
                  label: 'Auto-Processing'
                },
                {
                  icon: '⚡',
                  label: 'Stage Chaining'
                },
                {
                  icon: '🛡️',
                  label: 'Zero Downtime'
                },
                {
                  icon: '📈',
                  label: 'Higher Scores'
                }].
                map((f) =>
                <span
                  key={f.label}
                  className="flex items-center space-x-1 bg-blue-100 text-blue-700 font-bold px-2.5 py-1 rounded-full">

                      <span>{f.icon}</span>
                      <span>{f.label}</span>
                    </span>
                )}
                </div>
              </div>
            }

            {/* ── Better Luck Next Time — brand collapse while already using Algebrik ── */}
            {isBrandCollapseWithAlgebrik &&
            <div className="mb-5 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-slate-200 rounded-2xl p-5 text-center shadow-sm">
                <div className="text-4xl mb-2">🍀</div>
                <div className="font-black text-slate-800 text-lg mb-1">
                  Better Luck Next Time!
                </div>
                <div className="text-slate-600 text-sm leading-relaxed mb-3">
                  You were using <strong>Algebrik AI</strong> — great choice!
                  But brand equity still needs care. Accept customers faster,
                  process loans quickly, and keep queues short to keep your
                  brand healthy.
                </div>
                <div className="flex items-center justify-center flex-wrap gap-2 text-xs">
                  {[
                {
                  icon: '⚡',
                  label: 'Accept Faster'
                },
                {
                  icon: '😊',
                  label: 'Happy Customers'
                },
                {
                  icon: '📉',
                  label: 'Short Queues'
                },
                {
                  icon: '🏆',
                  label: 'You Got This'
                }].
                map((f) =>
                <span
                  key={f.label}
                  className="flex items-center space-x-1 bg-blue-100 text-blue-700 font-bold px-2.5 py-1 rounded-full">

                      <span>{f.icon}</span>
                      <span>{f.label}</span>
                    </span>
                )}
                </div>
              </div>
            }

            {/* Score */}
            <div className="text-center mb-4">
              <div className="text-xs text-slate-500 uppercase font-bold mb-1">
                Final Score
              </div>
              <div className="text-4xl font-black text-slate-800">
                {score.toLocaleString()}
              </div>
              {isLegacyCollapse &&
              <div className="text-xs font-bold text-red-500 mt-1">
                  💾 Legacy collapse ended your run early
                </div>
              }
              {isBrandCollapse &&
              <div className="text-xs font-bold text-pink-500 mt-1">
                  ⭐ Brand equity hit zero
                </div>
              }
              {highScore && !saved && !isAlgebrikCTA &&
              <div className="text-xs font-bold text-yellow-600 mt-1">
                  🏆 Top 10 Score!
                </div>
              }
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              {[
              {
                label: 'Loans Booked',
                value: stats.totalLoans
              },
              {
                label: 'Volume',
                value: `$${(stats.totalVolume / 1000).toFixed(0)}k`
              },
              {
                label: 'Portfolio Health',
                value: `${Math.round(stats.health)}%`,
                critical: isPortfolioCollapse
              },
              {
                label: 'Brand Equity',
                value: `${Math.round(brandEquity)}%`,
                critical: isBrandCollapse
              }].
              map(({ label, value, critical }) =>
              <div
                key={label}
                className={`p-3 rounded-xl border text-center ${critical ? 'bg-red-50 border-red-200' : 'bg-slate-50 border-slate-100'}`}>

                  <div className="text-[10px] text-slate-500 font-bold uppercase mb-0.5">
                    {label}
                  </div>
                  <div
                  className={`text-lg font-bold ${critical ? 'text-red-600' : 'text-slate-800'}`}>

                    {value}
                  </div>
                </div>
              )}
            </div>

            {/* Save to leaderboard */}
            {highScore && !saved &&
            <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                <div className="text-xs font-bold text-yellow-700 mb-2">
                  🏆 You made the leaderboard! Enter your name:
                </div>
                <div className="flex space-x-2">
                  <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                  placeholder="Your name..."
                  maxLength={20}
                  autoFocus
                  className="flex-1 text-sm border border-yellow-300 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-yellow-400" />

                  <button
                  onClick={handleSave}
                  disabled={!name.trim()}
                  className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-slate-900 font-bold text-xs px-3 py-1.5 rounded-lg transition-colors">

                    Save
                  </button>
                </div>
              </div>
            }
            {saved &&
            <div className="mb-4 p-2 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-xs font-bold text-emerald-700">
                ✅ Score saved!
              </div>
            }

            {/* Leaderboard toggle */}
            <button
              onClick={() => setShowLeaderboard((v) => !v)}
              className="w-full flex items-center justify-between px-3 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl mb-3 transition-colors">

              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="text-sm font-bold text-slate-700">
                  Leaderboard
                </span>
              </div>
              <span className="text-slate-400 text-xs">
                {showLeaderboard ? '▲ Hide' : '▼ Show'}
              </span>
            </button>

            {showLeaderboard &&
            <div className="mb-4 rounded-xl border border-slate-200 overflow-hidden">
                {leaderboard.length === 0 ?
              <div className="p-4 text-center text-slate-400 text-sm">
                    No scores yet.
                  </div> :

              <div className="divide-y divide-slate-100">
                    {leaderboard.map((entry, i) => {
                  const isCurrentScore =
                  saved &&
                  entry.name === name.trim() &&
                  entry.score === score;
                  return (
                    <div
                      key={i}
                      className={`flex items-center px-3 py-2.5 space-x-3 ${isCurrentScore ? 'bg-yellow-50' : ''}`}>

                          <span className="text-base w-6 text-center shrink-0">
                            {i < 3 ?
                        RANK_ICONS[i] :

                        <span className="text-slate-400 text-xs font-bold">
                                {i + 1}
                              </span>
                        }
                          </span>
                          <div className="flex-1 min-w-0">
                            <div
                          className={`font-bold text-sm truncate ${isCurrentScore ? 'text-yellow-700' : 'text-slate-800'}`}>

                              {entry.name} {isCurrentScore && '← You'}
                            </div>
                            <div className="text-slate-400 text-[10px]">
                              {entry.loans} loans · {entry.date}
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div
                          className={`font-black text-sm ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-slate-400' : i === 2 ? 'text-amber-500' : 'text-slate-500'}`}>

                              {entry.score.toLocaleString()}
                            </div>
                            <div className="text-[10px] text-slate-400">
                              ❤️ {entry.health}% · ⭐ {entry.brandEquity}%
                            </div>
                          </div>
                        </div>);

                })}
                  </div>
              }
              </div>
            }

            {/* Actions */}
            <div className="space-y-2">
              <button
                onClick={onRestart}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl flex items-center justify-center space-x-2 transition-colors">

                {isAlgebrikCTA ?
                <>
                    <img
                    src={ALGEBRIK_LOGO}
                    alt="Algebrik"
                    className="w-4 h-4 rounded-sm" />

                    <span>Try Again with Algebrik AI</span>
                  </> :
                isBrandCollapseWithAlgebrik ?
                <>
                    <RotateCcw className="w-4 h-4" />
                    <span>Try Again</span>
                  </> :

                <>
                    <RotateCcw className="w-4 h-4" />
                    <span>Start Next Shift</span>
                  </>
                }
              </button>
              <button
                onClick={onMenu}
                className="w-full bg-white border-2 border-slate-200 hover:bg-slate-50 text-slate-700 font-bold py-2.5 px-6 rounded-xl flex items-center justify-center space-x-2 transition-colors">

                <Home className="w-4 h-4" />
                <span>Back to Menu</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>);

}