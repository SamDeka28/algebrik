"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { Deal, DealsByState, STAGE_COLORS, MapStageCategory, getMapStageCategory } from '@/lib/deals/types';
import { format } from 'date-fns';

interface StateDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  stateData: DealsByState | null;
  deals: Deal[];
}

export function StateDrawer({ isOpen, onClose, stateData, deals }: StateDrawerProps) {
  if (!stateData || !isOpen) return null;

  // Get deals for this state
  const stateDeals = deals.filter(deal => deal.state === stateData.stateCode);

  // Calculate stage percentages
  const stagePercentages = stateData.stages.map(stage => ({
    ...stage,
    percentage: stateData.totalDeals > 0 
      ? Math.round((stage.count / stateData.totalDeals) * 100) 
      : 0,
    category: getMapStageCategory(stage.stageLabel),
  }));

  // Format date helper
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'MMM d');
    } catch {
      return dateString;
    }
  };

  // Format amount helper
  const formatAmount = (amount: number | null) => {
    if (!amount) return '—';
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    }
    if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}k`;
    }
    return `$${amount.toFixed(0)}`;
  };

  // Get stage color
  const getStageColor = (category: MapStageCategory) => {
    return STAGE_COLORS[category]?.base || STAGE_COLORS.other.base;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop - Darker with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/75 backdrop-blur-md z-40"
            onClick={onClose}
            style={{ 
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              backdropFilter: 'blur(8px)',
            }}
          />

          {/* Drawer - Full height */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 w-full max-w-2xl bg-white shadow-2xl z-50 flex flex-col"
            style={{ 
              height: '100vh',
              maxHeight: '100vh',
            }}
          >
            {/* Header - Fixed */}
            <div className="flex-shrink-0 px-8 py-6 border-b border-gray-200 bg-white">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {stateData.stateName}
                  </h2>
                  <p className="text-sm text-gray-500">Deal Momentum Overview</p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors -mt-1"
                  aria-label="Close drawer"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Content - Scrollable */}
            <div className="flex-1 overflow-y-auto">
              <div className="px-8 py-8 space-y-8">
                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                    <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">
                      Total Deals
                    </p>
                    <p className="text-4xl font-bold text-blue-900">{stateData.totalDeals}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                    <p className="text-xs font-semibold text-purple-700 uppercase tracking-wide mb-2">
                      Dominant Stage
                    </p>
                    <span
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium"
                      style={{
                        backgroundColor: getStageColor(stateData.dominantStageCategory),
                        color: '#ffffff',
                      }}
                    >
                      {stateData.dominantStage}
                    </span>
                  </div>
                </div>

                {/* Stage Breakdown */}
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Stage Breakdown</h3>
                  <div className="space-y-4">
                    {stagePercentages.map((stage) => (
                      <div key={stage.stage}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-900">{stage.stageLabel}</span>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-bold text-gray-900">{stage.count}</span>
                            <span className="text-xs text-gray-500 w-12 text-right">{stage.percentage}%</span>
                          </div>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-500"
                            style={{
                              width: `${stage.percentage}%`,
                              backgroundColor: getStageColor(stage.category),
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Deals Table */}
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Deals ({stateDeals.length})
                    </h3>
                  </div>
                  {stateDeals.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Deal Name
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Stage
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Amount
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                              Created
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                          {stateDeals.map((deal) => {
                            const dealCategory = getMapStageCategory(deal.stageLabel);
                            const dealColor = getStageColor(dealCategory);
                            return (
                              <tr key={deal.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                                  {deal.name}
                                </td>
                                <td className="px-6 py-4 text-sm">
                                  <span
                                    className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium"
                                    style={{
                                      backgroundColor: `${dealColor}15`,
                                      color: dealColor,
                                      border: `1px solid ${dealColor}30`,
                                    }}
                                  >
                                    {deal.stageLabel}
                                  </span>
                                </td>
                                <td className="px-6 py-4 text-sm font-medium text-gray-700">
                                  {formatAmount(deal.amount)}
                                </td>
                                <td className="px-6 py-4 text-sm text-gray-500">
                                  {formatDate(deal.createDate)}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <p className="font-medium">No deals found for this state</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
