"use client";

import { useMemo, useState, useEffect } from 'react';
import { subDays, isAfter } from 'date-fns';
import {
  Deal,
  DealFilters,
  DealsByState,
  KPIData,
  ComparisonData,
  StageCount,
  getMapStageCategory,
  STAGE_FUNNEL_ORDER,
  MapStageCategory,
  isDemo,
  isLateStage,
  isWon,
} from './types';
import { normalizeState, getStateName, ALL_STATE_CODES } from './stateNormalizer';

// Strapi stage mapping
const STRAPI_STAGES = [
  { id: 'qualified-to-buy', label: 'Qualified to buy' },
  { id: 'appointment-scheduled', label: 'Appointment scheduled' },
  { id: 'demo-scheduled', label: 'Demo scheduled' },
  { id: 'demo-completed', label: 'Demo completed' },
  { id: 'deep-dive-demo-scheduled', label: 'Deep dive demo scheduled' },
  { id: 'pricing-questionnaire-sent', label: 'Prizing questionnaire sent / RSP received' },
  { id: 'pricing-shared', label: 'Pricing shared / Rep submitted' },
  { id: 'negotiation-final-review', label: 'Negotiation / final review' },
  { id: 'closed-won', label: 'Closed (won)' },
  { id: 'closed-lost', label: 'Closed (lost)' },
  { id: 'deal-deferred', label: 'Deal deferred / gone cold' },
];

export function useDeals(filters: DealFilters) {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDeals() {
      try {
        setLoading(true);
        setError(null);

        const strapiUrl = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
        const strapiToken = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || '';

        // Fetch all deals with pagination
        let allItems: any[] = [];
        let page = 1;
        const pageSize = 100; // Strapi default is 25, so we'll fetch 100 per page
        let hasMore = true;

        while (hasMore) {
          const queryString = `populate=*&sort[0]=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
          const apiUrl = `${strapiUrl}/api/deals?${queryString}`;

          const response = await fetch(apiUrl, {
            headers: {
              'Authorization': strapiToken ? `Bearer ${strapiToken}` : '',
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch deals');
          }

          const data = await response.json();
          const items = data?.data || data || [];
          
          if (Array.isArray(items)) {
            allItems = [...allItems, ...items];
          } else if (Array.isArray(data)) {
            allItems = [...allItems, ...data];
          }

          // Check if there are more pages
          const pagination = data?.pagination || data?.meta?.pagination;
          if (pagination) {
            hasMore = page < pagination.pageCount;
          } else {
            // If no pagination info, check if we got fewer items than pageSize
            hasMore = items.length === pageSize;
          }
          
          page++;
        }

        const items = allItems;

        // Transform Strapi data to Deal format
        // Strapi uses capitalized field names: State, Stages, Company, Amount, Created
        const transformedDeals: Deal[] = items.map((item: any) => {
          // Handle both Strapi v4 (attributes) and v5 (direct) formats
          const data = item.attributes || item;
          
          // Strapi fields are capitalized
          const stateValue = data.State || data.state || '';
          const state = normalizeState(stateValue);
          
          const stageLabel = data.Stages || data.stages || 'Unknown';
          // Create a stage ID from the label
          const stageId = stageLabel.toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[()]/g, '')
            .replace(/\//g, '-')
            .replace(/\s*\/\s*/g, '-');
          
          // Parse amount (stored as string in Strapi)
          let amount: number | null = null;
          const amountValue = data.Amount || data.amount;
          if (amountValue) {
            const parsed = parseFloat(String(amountValue).replace(/[^0-9.-]/g, ''));
            if (!isNaN(parsed)) {
              amount = parsed;
            }
          }

          // Get company name
          const companyName = data.Company || data.company || `Deal ${item.id || item.documentId}`;
          
          // Get created date (Strapi uses Created field, fallback to createdAt)
          const createdDate = data.Created || data.created || data.createdAt || new Date().toISOString();

          return {
            id: String(item.id || item.documentId),
            name: companyName,
            stage: stageId,
            stageLabel: stageLabel,
            state: state,
            amount: amount,
            owner: null,
            ownerId: null,
            createDate: createdDate,
            lastActivityDate: data.updatedAt || createdDate,
          };
        });

        setDeals(transformedDeals);
      } catch (err) {
        console.error('Error fetching deals:', err);
        setError('Failed to load deals');
        setDeals([]);
      } finally {
        setLoading(false);
      }
    }

    fetchDeals();
  }, []);

  const filteredDeals = useMemo(() => {
    let result = [...deals];
    
    // Apply time range filter
    if (filters.timeRange) {
      const cutoff = subDays(new Date(), filters.timeRange);
      result = result.filter(deal => {
        const dealDate = new Date(deal.createDate);
        // Check if deal date is after the cutoff date
        return dealDate >= cutoff;
      });
    }
    
    // Apply stage filter
    if (filters.stages.length > 0) {
      result = result.filter(deal => filters.stages.includes(deal.stage));
    }
    
    // Apply owner filter (if we have owner data)
    if (filters.ownerId) {
      result = result.filter(deal => deal.ownerId === filters.ownerId);
    }
    
    return result;
  }, [deals, filters.timeRange, filters.stages, filters.ownerId]);

  const previousPeriodDeals = useMemo(() => {
    if (!filters.comparePrevious) return [];
    
    const now = new Date();
    const currentPeriodStart = subDays(now, filters.timeRange);
    const previousPeriodStart = subDays(currentPeriodStart, filters.timeRange);
    
    let result = deals.filter(deal => {
      const createDate = new Date(deal.createDate);
      return createDate >= previousPeriodStart && createDate < currentPeriodStart;
    });
    
    if (filters.stages.length > 0) {
      result = result.filter(deal => filters.stages.includes(deal.stage));
    }
    
    if (filters.ownerId) {
      result = result.filter(deal => deal.ownerId === filters.ownerId);
    }
    
    return result;
  }, [deals, filters.timeRange, filters.stages, filters.ownerId, filters.comparePrevious]);

  const dealsByState = useMemo((): DealsByState[] => {
    const stateMap = new Map<string, Deal[]>();
    
    ALL_STATE_CODES.forEach(code => {
      stateMap.set(code, []);
    });
    
    filteredDeals.forEach(deal => {
      if (deal.state !== 'Unknown') {
        const current = stateMap.get(deal.state) || [];
        current.push(deal);
        stateMap.set(deal.state, current);
      }
    });
    
    return Array.from(stateMap.entries()).map(([stateCode, deals]) => {
      const stageCounts = new Map<string, StageCount>();
      deals.forEach(deal => {
        const existing = stageCounts.get(deal.stage);
        if (existing) {
          existing.count++;
        } else {
          stageCounts.set(deal.stage, {
            stage: deal.stage,
            stageLabel: deal.stageLabel,
            count: 1,
          });
        }
      });
      
      const stages = Array.from(stageCounts.values())
        .sort((a, b) => b.count - a.count);
      
      let dominantStage = 'None';
      let dominantStageCategory: MapStageCategory = 'other';
      
      if (stages.length > 0) {
        const maxCount = stages[0].count;
        const tiedStages = stages.filter(s => s.count === maxCount);
        
        if (tiedStages.length > 1) {
          tiedStages.sort((a, b) => {
            const orderA = STAGE_FUNNEL_ORDER[getMapStageCategory(a.stageLabel)];
            const orderB = STAGE_FUNNEL_ORDER[getMapStageCategory(b.stageLabel)];
            return orderB - orderA;
          });
        }
        
        dominantStage = tiedStages[0].stageLabel;
        dominantStageCategory = getMapStageCategory(dominantStage);
      }
      
      const totalDeals = deals.length;
      const demoCount = deals.filter(d => isDemo(d.stageLabel)).length;
      const lateStageCount = deals.filter(d => isLateStage(d.stageLabel)).length;
      const wonCount = deals.filter(d => isWon(d.stageLabel)).length;
      
      return {
        stateCode,
        stateName: getStateName(stateCode),
        totalDeals,
        totalAmount: deals.reduce((sum, d) => sum + (d.amount || 0), 0),
        stages,
        dominantStage,
        dominantStageCategory,
        demoPercent: totalDeals > 0 ? Math.round((demoCount / totalDeals) * 100) : 0,
        lateStagePercent: totalDeals > 0 ? Math.round((lateStageCount / totalDeals) * 100) : 0,
        wonPercent: totalDeals > 0 ? Math.round((wonCount / totalDeals) * 100) : 0,
      };
    });
  }, [filteredDeals]);

  const kpiData = useMemo((): KPIData => {
    const unknownDeals = filteredDeals.filter(d => d.state === 'Unknown');
    const demoDeals = filteredDeals.filter(d => isDemo(d.stageLabel));
    const lateStageDeals = filteredDeals.filter(d => isLateStage(d.stageLabel));
    
    return {
      totalDeals: filteredDeals.length,
      totalDemos: demoDeals.length,
      totalLateStage: lateStageDeals.length,
      unknownStateDeals: unknownDeals.length,
    };
  }, [filteredDeals]);

  const comparisonData = useMemo((): ComparisonData | null => {
    if (!filters.comparePrevious) return null;
    
    const current = kpiData;
    const previousUnknown = previousPeriodDeals.filter(d => d.state === 'Unknown');
    const previousDemo = previousPeriodDeals.filter(d => isDemo(d.stageLabel));
    const previousLateStage = previousPeriodDeals.filter(d => isLateStage(d.stageLabel));
    
    const previous: KPIData = {
      totalDeals: previousPeriodDeals.length,
      totalDemos: previousDemo.length,
      totalLateStage: previousLateStage.length,
      unknownStateDeals: previousUnknown.length,
    };
    
    return {
      current,
      previous,
      changes: {
        totalDeals: current.totalDeals - previous.totalDeals,
        totalDemos: current.totalDemos - previous.totalDemos,
        totalLateStage: current.totalLateStage - previous.totalLateStage,
        unknownStateDeals: current.unknownStateDeals - previous.unknownStateDeals,
      },
    };
  }, [kpiData, previousPeriodDeals, filters.comparePrevious]);

  const maxDealsInState = useMemo(() => {
    return Math.max(...dealsByState.map(s => s.totalDeals), 1);
  }, [dealsByState]);

  const stages = useMemo(() => {
    return STRAPI_STAGES.map((s, idx) => {
      // Create ID from label to match what we use in transformed deals
      const stageId = s.label.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[()]/g, '')
        .replace(/\//g, '-')
        .replace(/\s*\/\s*/g, '-');
      return {
        id: stageId,
        label: s.label,
        displayOrder: idx + 1,
      };
    });
  }, []);

  const owners: any[] = []; // Empty for now, can be populated from Strapi if needed

  return {
    deals: filteredDeals,
    dealsByState,
    kpiData,
    comparisonData,
    maxDealsInState,
    stages,
    owners,
    loading,
    error,
  };
}
