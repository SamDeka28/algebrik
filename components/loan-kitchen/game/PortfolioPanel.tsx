import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Activity } from 'lucide-react';
interface PortfolioPanelProps {
  stats: {
    totalLoans: number;
    totalVolume: number;
    defaultRate: number;
    health: number;
  };
}
export function PortfolioPanel({ stats }: PortfolioPanelProps) {
  return (
    <div className="bg-white border-t border-slate-200 p-4 h-24 flex items-center justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="flex items-center space-x-8 max-w-7xl mx-auto w-full">
        {/* Total Loans */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-bold uppercase">
              Booked Loans
            </div>
            <div className="text-xl font-bold text-slate-800">
              {stats.totalLoans}
            </div>
          </div>
        </div>

        {/* Volume */}
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 text-green-600 rounded-lg">
            <DollarSign className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-bold uppercase">
              Total Volume
            </div>
            <div className="text-xl font-bold text-slate-800">
              ${(stats.totalVolume / 1000).toFixed(1)}k
            </div>
          </div>
        </div>

        {/* Default Rate */}
        <div className="flex items-center space-x-3">
          <div
            className={`p-2 rounded-lg ${stats.defaultRate > 0.05 ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-600'}`}>

            <TrendingDown className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-bold uppercase">
              Default Rate
            </div>
            <div
              className={`text-xl font-bold ${stats.defaultRate > 0.05 ? 'text-red-600' : 'text-slate-800'}`}>

              {(stats.defaultRate * 100).toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Health Bar */}
        <div className="flex-1 ml-8">
          <div className="flex justify-between mb-1">
            <span className="text-xs font-bold text-slate-500 uppercase">
              Portfolio Health
            </span>
            <span
              className={`text-xs font-bold ${stats.health > 80 ? 'text-green-600' : 'text-red-600'}`}>

              {Math.round(stats.health)}%
            </span>
          </div>
          <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${stats.health > 80 ? 'bg-green-500' : stats.health > 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
              style={{
                width: `${stats.health}%`
              }} />

          </div>
        </div>
      </div>
    </div>);

}