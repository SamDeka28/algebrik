export interface Deal {
  id: string;
  name: string;
  stage: string;
  stageLabel: string;
  state: string; // Normalized 2-letter code or "Unknown"
  amount: number | null;
  owner: string | null;
  ownerId: string | null;
  createDate: string;
  lastActivityDate: string | null;
}

export interface DealsByState {
  stateCode: string;
  stateName: string;
  totalDeals: number;
  totalAmount: number;
  stages: StageCount[];
  dominantStage: string;
  dominantStageCategory: MapStageCategory;
  demoPercent: number;
  lateStagePercent: number;
  wonPercent: number;
}

export interface StageCount {
  stage: string;
  stageLabel: string;
  count: number;
}

export interface DealFilters {
  timeRange: 30 | 60 | 90 | 365 | 730;
  stages: string[];
  ownerId: string | null;
  comparePrevious: boolean;
}

export interface DealOwner {
  id: string;
  name: string;
}

export interface DealStage {
  id: string;
  label: string;
  displayOrder: number;
}

export interface KPIData {
  totalDeals: number;
  totalDemos: number;
  totalLateStage: number;
  unknownStateDeals: number;
}

export interface ComparisonData {
  current: KPIData;
  previous: KPIData;
  changes: {
    totalDeals: number;
    totalDemos: number;
    totalLateStage: number;
    unknownStateDeals: number;
  };
}

export type MapStageCategory = 'demo' | 'proposal' | 'lateStage' | 'won' | 'lost' | 'other';

export const STAGE_FUNNEL_ORDER: Record<MapStageCategory, number> = {
  demo: 1,
  proposal: 2,
  lateStage: 3,
  won: 4,
  lost: 5,
  other: 0,
};

export const STAGE_COLORS: Record<MapStageCategory, { base: string; light: string; dark: string }> = {
  demo: { base: '#3b82f6', light: '#93c5fd', dark: '#1d4ed8' },
  proposal: { base: '#eab308', light: '#fde047', dark: '#a16207' },
  lateStage: { base: '#8b5cf6', light: '#c4b5fd', dark: '#6d28d9' },
  won: { base: '#22c55e', light: '#86efac', dark: '#15803d' },
  lost: { base: '#ef4444', light: '#fca5a5', dark: '#b91c1c' },
  other: { base: '#6b7280', light: '#d1d5db', dark: '#374151' },
};

// Map Strapi stages to categories
export function getMapStageCategory(stageLabel: string): MapStageCategory {
  const lower = stageLabel.toLowerCase();
  
  if (lower.includes('qualified to buy') || lower.includes('appointment scheduled') || 
      lower.includes('demo scheduled') || lower.includes('demo completed') || 
      lower.includes('deep dive demo')) {
    return 'demo';
  }
  if (lower.includes('pricing questionnaire') || lower.includes('pricing shared') || 
      lower.includes('prizing questionnaire') || lower.includes('rsp received') ||
      lower.includes('rep submitted')) {
    return 'proposal';
  }
  if (lower.includes('negotiation') || lower.includes('final review')) {
    return 'lateStage';
  }
  if (lower.includes('closed (won)') || lower.includes('closed won') || 
      (lower.includes('closed') && lower.includes('won'))) {
    return 'won';
  }
  if (lower.includes('closed (lost)') || lower.includes('closed lost') || 
      (lower.includes('closed') && lower.includes('lost'))) {
    return 'lost';
  }
  
  return 'other';
}

export function isDemo(stageLabel: string): boolean {
  const lower = stageLabel.toLowerCase();
  return (
    lower.includes('demo') || 
    lower.includes('qualified') || 
    lower.includes('appointment scheduled')
  );
}

export function isLateStage(stageLabel: string): boolean {
  const lower = stageLabel.toLowerCase();
  return (
    lower.includes('proposal') ||
    lower.includes('negotiation') ||
    lower.includes('pricing') ||
    lower.includes('prizing') || // Handle typo in "Prizing questionnaire"
    lower.includes('questionnaire') || // "Prizing questionnaire sent / RSP received"
    lower.includes('rsp received') || // "Prizing questionnaire sent / RSP received"
    lower.includes('rep submitted') || // "Pricing shared / Rep submitted"
    lower.includes('final review')
  );
}

export function isWon(stageLabel: string): boolean {
  const lower = stageLabel.toLowerCase();
  return lower.includes('won') || lower.includes('closed won');
}

export function getStageColorWithIntensity(
  category: MapStageCategory,
  dealCount: number,
  maxDeals: number
): string {
  const colors = STAGE_COLORS[category];
  const intensity = Math.min(dealCount / maxDeals, 1);
  
  if (intensity < 0.33) {
    return colors.light;
  } else if (intensity < 0.66) {
    return colors.base;
  } else {
    return colors.dark;
  }
}
