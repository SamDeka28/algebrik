import React from 'react';
import {
  Clock,
  Trophy,
  Zap,
  TrendingUp,
  Heart,
  UserMinus,
  Star,
  ShoppingCart,
  Pause } from
'lucide-react';
interface HUDProps {
  timeLeft: number;
  score: number;
  streak: number;
  level: number;
  portfolioHealth: number;
  droppedCustomers: number;
  brandEquity: number;
  isPaused: boolean;
  onOpenShop: () => void;
}
export function HUD({
  timeLeft,
  score,
  streak,
  level,
  portfolioHealth,
  droppedCustomers,
  brandEquity,
  isPaused,
  onOpenShop
}: HUDProps) {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  const isLowTime = timeLeft < 30;
  const isCriticalHealth = portfolioHealth < 30;
  const isWarningHealth = portfolioHealth < 60;
  const isCriticalBrand = brandEquity < 30;
  const isWarningBrand = brandEquity < 60;
  return (
    <div className="bg-slate-900 text-white px-3 py-2 flex items-center justify-between shadow-lg border-b border-slate-700 gap-2">
      {/* Left: Timer + Score */}
      <div className="flex items-center space-x-4 shrink-0">
        <div className="flex items-center space-x-1.5">
          <div
            className={`p-1.5 rounded-lg ${isPaused ? 'bg-yellow-600' : isLowTime ? 'bg-red-600 animate-pulse' : 'bg-slate-800'}`}>

            {isPaused ?
            <Pause className="w-4 h-4" /> :

            <Clock className="w-4 h-4" />
            }
          </div>
          <span
            className={`text-xl font-bold font-mono ${isPaused ? 'text-yellow-400' : isLowTime ? 'text-red-400' : 'text-white'}`}>

            {isPaused ? 'PAUSED' : timeString}
          </span>
        </div>

        <div className="flex items-center space-x-1.5">
          <div className="p-1.5 bg-blue-600 rounded-lg">
            <Trophy className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-blue-300 uppercase font-bold leading-none">
              Score
            </div>
            <div className="text-base font-bold leading-tight">
              {score.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* Center: Portfolio Health + Brand Equity */}
      <div className="flex items-center space-x-4 flex-1 justify-center">
        <div className="flex items-center space-x-1.5">
          <div
            className={`p-1.5 rounded-lg ${isCriticalHealth ? 'bg-red-600 animate-pulse' : isWarningHealth ? 'bg-yellow-600' : 'bg-slate-800'}`}>

            <Heart className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-bold leading-none mb-0.5">
              Portfolio
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-20 bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${isCriticalHealth ? 'bg-red-500 animate-pulse' : isWarningHealth ? 'bg-yellow-500' : 'bg-emerald-500'}`}
                  style={{
                    width: `${portfolioHealth}%`
                  }} />

              </div>
              <span
                className={`text-xs font-bold font-mono ${isCriticalHealth ? 'text-red-400' : isWarningHealth ? 'text-yellow-400' : 'text-emerald-400'}`}>

                {Math.round(portfolioHealth)}%
              </span>
            </div>
          </div>
        </div>

        <div className="w-px h-8 bg-slate-700" />

        <div className="flex items-center space-x-1.5">
          <div
            className={`p-1.5 rounded-lg ${isCriticalBrand ? 'bg-pink-700 animate-pulse' : isWarningBrand ? 'bg-orange-600' : 'bg-slate-800'}`}>

            <Star className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-bold leading-none mb-0.5">
              Brand Equity
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-20 bg-slate-700 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ${isCriticalBrand ? 'bg-pink-500 animate-pulse' : isWarningBrand ? 'bg-orange-500' : 'bg-violet-500'}`}
                  style={{
                    width: `${brandEquity}%`
                  }} />

              </div>
              <span
                className={`text-xs font-bold font-mono ${isCriticalBrand ? 'text-pink-400' : isWarningBrand ? 'text-orange-400' : 'text-violet-400'}`}>

                {Math.round(brandEquity)}%
              </span>
              {isCriticalBrand &&
              <span className="text-[9px] font-bold text-pink-400 animate-pulse uppercase">
                  LOW!
                </span>
              }
            </div>
          </div>
        </div>
      </div>

      {/* Right: Streak + Dropped + Shop */}
      <div className="flex items-center space-x-3 shrink-0">
        {droppedCustomers > 0 &&
        <div className="flex items-center space-x-1">
            <div className="p-1.5 bg-rose-700 rounded-lg">
              <UserMinus className="w-4 h-4" />
            </div>
            <div>
              <div className="text-[10px] text-rose-300 uppercase font-bold leading-none">
                Left
              </div>
              <div className="text-base font-bold leading-tight text-rose-400">
                {droppedCustomers}
              </div>
            </div>
          </div>
        }

        <div className="flex items-center space-x-1">
          <div
            className={`p-1.5 rounded-lg ${streak > 2 ? 'bg-orange-500 animate-bounce' : 'bg-slate-800'}`}>

            <Zap
              className={`w-4 h-4 ${streak > 2 ? 'text-white' : 'text-yellow-400'}`} />

          </div>
          <div>
            <div className="text-[10px] text-slate-400 uppercase font-bold leading-none">
              Streak
            </div>
            <div className="text-base font-bold leading-tight text-yellow-400">
              x{streak}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1">
          <div className="p-1.5 bg-purple-600 rounded-lg">
            <TrendingUp className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-purple-300 uppercase font-bold leading-none">
              Lvl
            </div>
            <div className="text-base font-bold leading-tight">{level}</div>
          </div>
        </div>

        <button
          onClick={onOpenShop}
          className="flex items-center space-x-1.5 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-black text-xs px-3 py-2 rounded-xl transition-colors shadow-lg shadow-yellow-500/20">

          <ShoppingCart className="w-4 h-4" />
          <span>SHOP</span>
        </button>
      </div>
    </div>);

}