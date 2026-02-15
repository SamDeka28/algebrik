"use client";

import { motion } from 'framer-motion';
import { BarChart3, Users, TrendingUp, AlertTriangle, Info } from 'lucide-react';
import { KPIData, ComparisonData } from '@/lib/deals/types';

interface KPICardsProps {
  data: KPIData;
  comparison: ComparisonData | null;
}

function ChangeIndicator({ change }: { change: number }) {
  if (change === 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-xs text-gray-500">
        <span>0</span>
      </span>
    );
  }

  if (change > 0) {
    return (
      <span className="inline-flex items-center gap-0.5 text-xs text-green-600">
        <span>+{change}</span>
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-0.5 text-xs text-red-600">
      <span>{change}</span>
    </span>
  );
}

export function KPICards({ data, comparison }: KPICardsProps) {
  const cards = [
    {
      label: 'Total Deals',
      subtitle: '(Selected Filters)',
      value: data.totalDeals,
      change: comparison?.changes.totalDeals,
      icon: BarChart3,
      className: 'bg-blue-50 border-blue-200',
      iconColor: 'text-blue-600',
    },
    {
      label: 'Active Demos',
      subtitle: '',
      value: data.totalDemos,
      change: comparison?.changes.totalDemos,
      icon: Users,
      className: 'bg-teal-50 border-teal-200',
      iconColor: 'text-teal-600',
    },
    {
      label: 'Late-Stage Pipeline',
      subtitle: '',
      value: data.totalLateStage,
      change: comparison?.changes.totalLateStage,
      icon: TrendingUp,
      className: 'bg-purple-50 border-purple-200',
      iconColor: 'text-purple-600',
    },
    {
      label: 'Deals Missing State',
      subtitle: '',
      value: data.unknownStateDeals,
      change: comparison?.changes.unknownStateDeals,
      icon: AlertTriangle,
      className: 'bg-gray-50 border-gray-200',
      iconColor: 'text-gray-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, i) => {
        const Icon = card.icon;
        return (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className={`${card.className} rounded-lg border p-5`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-1.5 mb-2">
                  <p className="text-sm font-medium text-gray-700">
                    {card.label}
                    {card.subtitle && (
                      <span className="text-xs opacity-70 ml-1">{card.subtitle}</span>
                    )}
                  </p>
                </div>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold tracking-tight text-gray-900">
                    {card.value.toLocaleString()}
                  </p>
                  {card.change !== undefined && (
                    <ChangeIndicator change={card.change} />
                  )}
                </div>
              </div>
              <Icon className={`h-6 w-6 ${card.iconColor} opacity-70`} />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
