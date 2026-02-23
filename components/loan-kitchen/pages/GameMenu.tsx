import React, { useEffect, useState } from 'react';
import { Play, BookOpen, Trophy } from 'lucide-react';
import { getLeaderboard, LeaderboardEntry } from '@/lib/loan-kitchen/data/leaderboard';
interface GameMenuProps {
  onStart: () => void;
  onHowTo: () => void;
}
export function GameMenu({ onStart, onHowTo }: GameMenuProps) {
  const [tab, setTab] = useState<'menu' | 'leaderboard'>('menu');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  useEffect(() => {
    setLeaderboard(getLeaderboard());
  }, [tab]);
  const RANK_ICONS = ['🥇', '🥈', '🥉'];
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-blue-600 p-8 text-center">
          <div className="text-6xl mb-4">🏦</div>
          <h1 className="text-4xl font-black text-white tracking-tight mb-2">
            LOAN<span className="text-blue-200">KITCHEN</span>
          </h1>
          <p className="text-blue-100 font-medium">
            High-Speed Lending Simulation · Powered by Algebrik AI
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex bg-slate-100 p-1 mx-6 mt-6 rounded-xl">
          <button
            onClick={() => setTab('menu')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${tab === 'menu' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-700'}`}>

            Menu
          </button>
          <button
            onClick={() => setTab('leaderboard')}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all flex items-center justify-center space-x-1.5 ${tab === 'leaderboard' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-700'}`}>

            <Trophy className="w-3.5 h-3.5" />
            <span>Leaderboard</span>
          </button>
        </div>

        <div className="p-6">
          {tab === 'menu' &&
          <div className="space-y-3">
              <button
              onClick={onStart}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center space-x-3 transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-blue-600/20">

                <Play className="w-6 h-6 fill-current" />
                <span className="text-lg">START SHIFT</span>
              </button>

              <button
              onClick={onHowTo}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-4 px-6 rounded-xl flex items-center justify-center space-x-3 transition-colors">

                <BookOpen className="w-6 h-6" />
                <span>HOW TO PLAY</span>
              </button>

              {leaderboard.length > 0 &&
            <div className="pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-slate-500 text-sm">
                    <span>Top Score</span>
                    <div className="flex items-center text-yellow-500 font-bold space-x-1">
                      <Trophy className="w-4 h-4" />
                      <span>{leaderboard[0].score.toLocaleString()}</span>
                      <span className="text-slate-400 font-normal">
                        by {leaderboard[0].name}
                      </span>
                    </div>
                  </div>
                </div>
            }
            </div>
          }

          {tab === 'leaderboard' &&
          <div className="rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-yellow-500" />
                <span className="font-black text-slate-700 text-sm">
                  Top Scores
                </span>
              </div>
              {leaderboard.length === 0 ?
            <div className="p-8 text-center text-slate-400 text-sm">
                  No scores yet — play a shift to get on the board!
                </div> :

            <div className="divide-y divide-slate-100">
                  {leaderboard.map((entry, i) =>
              <div
                key={i}
                className="flex items-center px-4 py-3 space-x-3">

                      <span className="text-lg w-6 text-center shrink-0">
                        {i < 3 ?
                  RANK_ICONS[i] :

                  <span className="text-slate-400 text-sm font-bold">
                            {i + 1}
                          </span>
                  }
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="text-slate-800 font-bold text-sm truncate">
                          {entry.name}
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
                    </div>
              )}
                </div>
            }
            </div>
          }
        </div>

        <div className="bg-slate-50 p-4 text-center text-slate-400 text-xs border-t border-slate-100">
          v1.0.0 · Magic Patterns Bank Corp
        </div>
      </div>
    </div>);

}