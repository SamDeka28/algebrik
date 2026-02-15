"use client";

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { KPICards } from './KPICards';
import { FilterBar } from './FilterBar';
import { USMap } from './USMap';
import { StateDrawer } from './StateDrawer';
import { useDeals } from '@/lib/deals/useDeals';
import { DealFilters, DealsByState } from '@/lib/deals/types';

export function DealMap() {
  const [filters, setFilters] = useState<DealFilters>({
    timeRange: 730, // Default to 2 years to show more deals
    stages: [],
    ownerId: null,
    comparePrevious: false,
  });

  const [selectedState, setSelectedState] = useState<string | null>(null);

  const { deals, dealsByState, kpiData, comparisonData, maxDealsInState, stages, owners, loading, error } = useDeals(filters);

  // Get the selected state data
  const selectedStateData = useMemo<DealsByState | null>(() => {
    if (!selectedState) return null;
    return dealsByState.find(state => state.stateCode === selectedState) || null;
  }, [selectedState, dealsByState]);

  const handleStateClick = (stateCode: string, hasDeals: boolean) => {
    if (!hasDeals) return;
    setSelectedState(stateCode);
  };

  const handleCloseDrawer = () => {
    setSelectedState(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading deal data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Deal Momentum Map</h2>
        <p className="text-gray-600">Geographic view of deals by US state</p>
      </div>

      {/* KPI Cards */}
      <KPICards data={kpiData} comparison={comparisonData} />

      {/* Filter Bar */}
      <FilterBar
        filters={filters}
        stages={stages}
        owners={owners}
        onFiltersChange={setFilters}
      />

      {/* Map */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <USMap
          dealsByState={dealsByState}
          maxDeals={maxDealsInState}
          onStateClick={handleStateClick}
        />
      </motion.div>

      {/* State Drawer */}
      <StateDrawer
        isOpen={selectedState !== null}
        onClose={handleCloseDrawer}
        stateData={selectedStateData}
        deals={deals}
      />
    </div>
  );
}
