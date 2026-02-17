"use client";

import { useState, useMemo, useCallback, useEffect } from 'react';
import { geoAlbersUsa, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DealsByState,
  StageCount,
  MapStageCategory,
  STAGE_COLORS,
  getStageColorWithIntensity,
} from '@/lib/deals/types';

const FIPS_TO_STATE: Record<string, string> = {
  '01': 'AL', '02': 'AK', '04': 'AZ', '05': 'AR', '06': 'CA',
  '08': 'CO', '09': 'CT', '10': 'DE', '11': 'DC', '12': 'FL',
  '13': 'GA', '15': 'HI', '16': 'ID', '17': 'IL', '18': 'IN',
  '19': 'IA', '20': 'KS', '21': 'KY', '22': 'LA', '23': 'ME',
  '24': 'MD', '25': 'MA', '26': 'MI', '27': 'MN', '28': 'MS',
  '29': 'MO', '30': 'MT', '31': 'NE', '32': 'NV', '33': 'NH',
  '34': 'NJ', '35': 'NM', '36': 'NY', '37': 'NC', '38': 'ND',
  '39': 'OH', '40': 'OK', '41': 'OR', '42': 'PA', '44': 'RI',
  '45': 'SC', '46': 'SD', '47': 'TN', '48': 'TX', '49': 'UT',
  '50': 'VT', '51': 'VA', '53': 'WA', '54': 'WV', '55': 'WI',
  '56': 'WY',
};

interface TooltipData {
  x: number;
  y: number;
  stateCode: string;
  stateName: string;
  totalDeals: number;
  topStages: StageCount[];
  dominantStage: string;
  dominantCategory: MapStageCategory;
  isEmpty: boolean;
}

interface USMapProps {
  dealsByState: DealsByState[];
  maxDeals: number;
  onStateClick: (stateCode: string, hasDeals: boolean) => void;
}

const LEGEND_ITEMS: { category: MapStageCategory; label: string; stages: string[] }[] = [
  { 
    category: 'demo', 
    label: 'Demo / Discovery',
    stages: ['Qualified to Buy', 'Appointment Scheduled', 'Demo/Presentation Scheduled', 'Demo Completed', 'Deep Dive Demo Scheduled']
  },
  { 
    category: 'proposal', 
    label: 'Proposal / Evaluation',
    stages: ['Pricing Questionnaire Sent/RFP Received', 'Pricing Shared/ RFP Submitted']
  },
  { 
    category: 'lateStage', 
    label: 'Late Stage / Negotiation',
    stages: ['Negotiation/Final Review']
  },
  { 
    category: 'won', 
    label: 'Closed-Won!',
    stages: ['Closed-Won!']
  },
  { 
    category: 'lost', 
    label: 'Closed-Lost',
    stages: ['Closed-Lost']
  },
];

export function USMap({ dealsByState, maxDeals, onStateClick }: USMapProps) {
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const [geographyData, setGeographyData] = useState<any>(null);
  const [hoveredState, setHoveredState] = useState<string | null>(null);

  // Load geography data
  useEffect(() => {
    fetch('/states-10m.json')
      .then((res) => res.json())
      .then((data) => {
        const states = feature(data, (data as any).objects.states);
        setGeographyData(states);
      })
      .catch((err) => {
        console.error('Failed to load geography data:', err);
      });
  }, []);

  const stateDataMap = useMemo(() => {
    const map = new Map<string, DealsByState>();
    dealsByState.forEach((state) => {
      map.set(state.stateCode, state);
    });
    return map;
  }, [dealsByState]);

  const getStateStyle = useCallback((stateCode: string): { fill: string; strokeDasharray?: string } => {
    const stateData = stateDataMap.get(stateCode);
    if (!stateData || stateData.totalDeals === 0) {
      return { fill: '#e2e8f0' };
    }
    
    const allOther = stateData.dominantStageCategory === 'other';
    if (allOther) {
      return {
        fill: '#9ca3af',
        strokeDasharray: '4,2'
      };
    }
    
    return {
      fill: getStageColorWithIntensity(
        stateData.dominantStageCategory,
        stateData.totalDeals,
        maxDeals
      )
    };
  }, [maxDeals, stateDataMap]);

  const handleMouseEnter = (stateCode: string, event: React.MouseEvent) => {
    const stateData = stateDataMap.get(stateCode);
    const isEmpty = !stateData || stateData.totalDeals === 0;

    setTooltip({
      x: event.clientX,
      y: event.clientY,
      stateCode,
      stateName: stateData?.stateName || stateCode,
      totalDeals: stateData?.totalDeals || 0,
      topStages: stateData?.stages.slice(0, 3) || [],
      dominantStage: stateData?.dominantStage || 'None',
      dominantCategory: stateData?.dominantStageCategory || 'other',
      isEmpty,
    });
    setHoveredState(stateCode);
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    setTooltip((prev) =>
      prev ? { ...prev, x: event.clientX, y: event.clientY } : null
    );
  };

  const handleMouseLeave = () => {
    setTooltip(null);
    setHoveredState(null);
  };

  const handleClick = (stateCode: string) => {
    const stateData = stateDataMap.get(stateCode);
    const hasDeals = stateData && stateData.totalDeals > 0;
    onStateClick(stateCode, !!hasDeals);
  };

  if (!geographyData) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  const width = 960;
  const height = 600;
  const projection = geoAlbersUsa().scale(1000).translate([width / 2, height / 2]);
  const path = geoPath().projection(projection);

  return (
    <div className="relative">
      <div className="rounded-2xl overflow-hidden bg-white border border-gray-200 p-4">
        {/* Legend */}
        <div className="mb-4 p-4 rounded-xl bg-gray-50 border border-gray-200">
          <div className="flex flex-wrap items-start gap-6">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Color = Dominant Stage Category
              </p>
              <div className="space-y-2">
                {LEGEND_ITEMS.map(({ category, label, stages }) => (
                  <div key={category} className="flex items-start gap-2">
                    <div
                      className="w-4 h-4 rounded mt-0.5 flex-shrink-0"
                      style={{ backgroundColor: STAGE_COLORS[category].base }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-gray-900">{label}</div>
                      <div className="text-xs text-gray-600 mt-0.5">
                        {stages.map((stage, idx) => (
                          <span key={idx}>
                            {stage}
                            {idx < stages.length - 1 && <span className="text-gray-400"> • </span>}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-l border-gray-200 pl-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                Intensity = Deal Volume
              </p>
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  <div className="w-6 h-4 rounded-l" style={{ backgroundColor: STAGE_COLORS.demo.light }} />
                  <div className="w-6 h-4" style={{ backgroundColor: STAGE_COLORS.demo.base }} />
                  <div className="w-6 h-4 rounded-r" style={{ backgroundColor: STAGE_COLORS.demo.dark }} />
                </div>
                <span className="text-xs text-gray-500">Low → High</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map */}
        <div style={{ width: '100%', height: '500px', minHeight: '400px', overflow: 'hidden' }}>
          <svg
            viewBox={`0 0 ${width} ${height}`}
            style={{ width: '100%', height: '100%' }}
            preserveAspectRatio="xMidYMid meet"
          >
            {(geographyData as any).features.map((feature: any) => {
              const fips = feature.id;
              const stateCode = FIPS_TO_STATE[fips];
              if (!stateCode) return null;

              const stateData = stateDataMap.get(stateCode);
              const hasDeals = stateData && stateData.totalDeals > 0;
              const style = getStateStyle(stateCode);
              const isHovered = hoveredState === stateCode;

              return (
                <path
                  key={fips}
                  d={path(feature) || ''}
                  fill={style.fill}
                  stroke="#ffffff"
                  strokeWidth={0.75}
                  strokeDasharray={style.strokeDasharray}
                  style={{
                    outline: 'none',
                    cursor: hasDeals ? 'pointer' : 'default',
                    filter: isHovered && hasDeals ? 'brightness(1.15)' : 'none',
                    transition: 'filter 0.2s',
                  }}
                  onMouseEnter={(e) => handleMouseEnter(stateCode, e)}
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => handleClick(stateCode)}
                />
              );
            })}
          </svg>
        </div>
      </div>

      {/* Tooltip */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed z-50 pointer-events-none min-w-[220px] bg-white border border-gray-200 rounded-lg shadow-lg p-3"
            style={{
              left: tooltip.x + 15,
              top: tooltip.y - 10,
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900">{tooltip.stateName}</span>
              <span className="text-xs font-mono text-gray-500">{tooltip.stateCode}</span>
            </div>

            {tooltip.isEmpty ? (
              <div className="py-2 text-center">
                <p className="text-sm text-gray-500">No activity</p>
                <p className="text-xs text-gray-400 mt-1">No deals in selected filters</p>
              </div>
            ) : (
              <>
                <div className="text-2xl font-bold text-blue-600 mb-3">
                  {tooltip.totalDeals.toLocaleString()} <span className="text-sm font-normal text-gray-500">deals</span>
                </div>

                <div className="mb-3 p-2 rounded-lg bg-gray-50">
                  <p className="text-xs font-medium text-gray-500 mb-1">Dominant Stage</p>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: STAGE_COLORS[tooltip.dominantCategory].base }}
                    />
                    <span className="font-medium text-gray-900">{tooltip.dominantStage}</span>
                  </div>
                </div>

                {tooltip.topStages.length > 0 && (
                  <div className="space-y-1.5">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Stage Breakdown (Top 3)</p>
                    {tooltip.topStages.map((stage) => (
                      <div key={stage.stage} className="flex items-center justify-between text-sm">
                        <span className="text-gray-900">{stage.stageLabel}</span>
                        <span className="font-mono text-gray-500">{stage.count}</span>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
