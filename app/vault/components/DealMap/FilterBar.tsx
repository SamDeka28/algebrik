"use client";

import { Calendar, Layers, Users, GitCompare } from 'lucide-react';
import { DealFilters, DealOwner, DealStage } from '@/lib/deals/types';

interface FilterBarProps {
  filters: DealFilters;
  stages: DealStage[];
  owners: DealOwner[];
  onFiltersChange: (filters: DealFilters) => void;
}

export function FilterBar({ filters, stages, owners, onFiltersChange }: FilterBarProps) {
  const handleStageToggle = (stageId: string) => {
    const newStages = filters.stages.includes(stageId)
      ? filters.stages.filter(s => s !== stageId)
      : [...filters.stages, stageId];
    onFiltersChange({ ...filters, stages: newStages });
  };

  const selectedStageLabels = stages
    .filter(s => filters.stages.includes(s.id))
    .map(s => s.label);

  return (
    <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl bg-white border border-gray-200">
      {/* Time Range */}
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 text-gray-500" />
        <select
          value={filters.timeRange}
          onChange={(e) =>
            onFiltersChange({ ...filters, timeRange: parseInt(e.target.value) as 30 | 60 | 90 | 365 | 730 })
          }
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="30">Last 30 days</option>
          <option value="60">Last 60 days</option>
          <option value="90">Last 90 days</option>
          <option value="365">Last year</option>
          <option value="730">Last 2 years</option>
        </select>
      </div>

      {/* Stages Multi-Select */}
      <div className="relative">
        <button
          onClick={() => {
            const dropdown = document.getElementById('stage-dropdown');
            dropdown?.classList.toggle('hidden');
          }}
          className={`flex items-center gap-2 px-3 py-1.5 text-sm border rounded-lg ${
            filters.stages.length > 0
              ? 'bg-blue-50 border-blue-300 text-blue-700'
              : 'bg-white border-gray-300 text-gray-700'
          } hover:bg-gray-50`}
        >
          <Layers className="h-4 w-4" />
          <span>
            {filters.stages.length === 0
              ? 'All Stages'
              : filters.stages.length === stages.length
                ? 'All Stages'
                : `${filters.stages.length} Stage${filters.stages.length > 1 ? 's' : ''}`}
          </span>
        </button>
        <div
          id="stage-dropdown"
          className="hidden absolute top-full left-0 mt-1 w-72 bg-white border border-gray-200 rounded-lg shadow-lg z-10 p-4"
        >
          <div className="space-y-2 max-h-[240px] overflow-y-auto">
            {stages.map((stage) => {
              const isSelected = filters.stages.includes(stage.id);
              return (
                <label
                  key={stage.id}
                  className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleStageToggle(stage.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-900">{stage.label}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>

      {/* Deal Owner */}
      {/* <div className="flex items-center gap-2">
        <Users className="h-4 w-4 text-gray-500" />
        <select
          value={filters.ownerId || 'all'}
          onChange={(e) =>
            onFiltersChange({ ...filters, ownerId: e.target.value === 'all' ? null : e.target.value })
          }
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Owners</option>
          {owners.map((owner) => (
            <option key={owner.id} value={owner.id}>
              {owner.name}
            </option>
          ))}
        </select>
      </div> */}

      {/* Compare Toggle */}
      <div className="flex items-center gap-2 ml-auto border-l border-gray-200 pl-4">
        <GitCompare className="h-4 w-4 text-gray-500" />
        <label className="text-sm text-gray-700 cursor-pointer flex items-center gap-2">
          <input
            type="checkbox"
            checked={filters.comparePrevious}
            onChange={(e) =>
              onFiltersChange({ ...filters, comparePrevious: e.target.checked })
            }
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          Compare with previous period
        </label>
      </div>
    </div>
  );
}
