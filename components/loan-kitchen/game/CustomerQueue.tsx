import React from 'react';
import { Customer } from '@/lib/loan-kitchen/data/gameData';
import { User, DollarSign, AlertCircle, UserMinus, Lock } from 'lucide-react';
interface CustomerQueueProps {
  queue: Customer[];
  onAccept: (id: string) => void;
  lastDroppedName: string | null;
  activeLoansCount: number;
  maxLoans: number;
}
export function CustomerQueue({
  queue,
  onAccept,
  lastDroppedName,
  activeLoansCount,
  maxLoans
}: CustomerQueueProps) {
  const systemFull = activeLoansCount >= maxLoans;
  return (
    <div className="w-64 bg-slate-100 border-r border-slate-300 flex flex-col h-full overflow-hidden">
      <div className="p-3 bg-slate-200 border-b border-slate-300">
        <h2 className="font-bold text-slate-700 flex items-center text-sm">
          <User className="w-4 h-4 mr-2" />
          Queue ({queue.length})
        </h2>
        {/* System capacity bar */}
        <div className="mt-1.5">
          <div className="flex justify-between items-center mb-0.5">
            <span className="text-[10px] text-slate-500 font-bold uppercase">
              System Capacity
            </span>
            <span
              className={`text-[10px] font-black ${systemFull ? 'text-red-600' : 'text-slate-600'}`}>

              {activeLoansCount}/{maxLoans}
            </span>
          </div>
          <div className="w-full bg-slate-300 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${activeLoansCount >= maxLoans ? 'bg-red-500' : activeLoansCount >= maxLoans * 0.7 ? 'bg-yellow-500' : 'bg-emerald-500'}`}
              style={{
                width: `${activeLoansCount / maxLoans * 100}%`
              }} />

          </div>
        </div>
      </div>

      {lastDroppedName &&
      <div className="mx-3 mt-3 bg-red-100 border border-red-300 text-red-700 text-xs font-bold px-3 py-2 rounded-lg flex items-center space-x-2 animate-pulse">
          <UserMinus className="w-4 h-4 shrink-0" />
          <span>{lastDroppedName} -200 pts</span>
        </div>
      }

      {systemFull &&
      <div className="mx-3 mt-2 bg-red-50 border border-red-300 text-red-700 text-xs font-bold px-3 py-2 rounded-lg flex items-center space-x-2">
          <Lock className="w-4 h-4 shrink-0" />
          <span>System full — process loans faster!</span>
        </div>
      }

      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {queue.length === 0 &&
        <div className="text-center text-slate-400 py-8 italic text-sm">
            No customers waiting...
          </div>
        }

        {queue.map((customer) => {
          const isLeaving = customer.patience < 15;
          const isWarning = customer.patience < 40;
          return (
            <div
              key={customer.id}
              onClick={() => !systemFull && onAccept(customer.id)}
              className={`bg-white p-3 rounded-lg shadow-sm relative overflow-hidden group border transition-all ${systemFull ? 'opacity-50 cursor-not-allowed border-slate-200' : isLeaving ? 'border-red-400 animate-pulse shadow-red-100 cursor-pointer hover:shadow-md' : isWarning ? 'border-yellow-300 cursor-pointer hover:shadow-md' : 'border-slate-200 cursor-pointer hover:shadow-md hover:scale-[1.02]'}`}>

              <div className="absolute bottom-0 left-0 h-1.5 bg-slate-200 w-full">
                <div
                  className={`h-full transition-all duration-1000 ${customer.patience < 20 ? 'bg-red-500' : customer.patience < 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                  style={{
                    width: `${customer.patience}%`
                  }} />

              </div>

              <div className="flex justify-between items-start mb-1">
                <span className="text-2xl">{customer.avatar}</span>
                <div className="flex flex-col items-end space-y-1">
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${customer.type === 'Mortgage' ? 'bg-purple-100 text-purple-700' : customer.type === 'Business' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>

                    {customer.type}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${customer.riskGrade === 'A' || customer.riskGrade === 'B' ? 'bg-green-100 text-green-700' : customer.riskGrade === 'F' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>

                    Grade {customer.riskGrade}
                  </span>
                </div>
              </div>

              <h3 className="font-bold text-slate-800 text-sm truncate">
                {customer.name}
              </h3>

              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center text-slate-600 text-xs">
                  <DollarSign className="w-3 h-3 mr-0.5" />
                  {customer.amount.toLocaleString()}
                </div>
                <span
                  className={`text-[10px] font-bold ${customer.patience < 20 ? 'text-red-600' : customer.patience < 50 ? 'text-yellow-600' : 'text-green-600'}`}>

                  {Math.round(customer.patience)}%
                </span>
              </div>

              {isLeaving &&
              <div className="absolute top-1 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-bounce whitespace-nowrap">
                  LEAVING!
                </div>
              }
              {isWarning && !isLeaving &&
              <div className="absolute top-2 right-2 text-yellow-500">
                  <AlertCircle className="w-4 h-4" />
                </div>
              }
            </div>);

        })}
      </div>
    </div>);

}