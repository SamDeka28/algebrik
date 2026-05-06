export interface RawNCUARecord {
  CU_NUMBER: string;
  CU_NAME: string;
  CITY: string;
  STATE_CODE: string;
  CYCLE_DATE: string;
  ACCT_010: string;
  ACCT_083: string;
  ACCT_025A: string;
  ACCT_018: string;
  ACCT_031?: string;
  ACCT_748?: string;
  ACCT_010_PREV?: string;
  ACCT_083_PREV?: string;
  ACCT_025A_PREV?: string;
  ACCT_031_PREV?: string;
  JOIN_DATE?: string;
  [key: string]: string | undefined;
}

export interface CreditUnion {
  id: string;
  name: string;
  state: string;
  city: string;
  lat: number;
  lng: number;
  assets: number;
  members: number;
  loans: number;
  shares: number;
  assets_prev: number;
  members_prev: number;
  loans_prev: number;
  loans_prev_yr: number;
  operating_expenses: number;
  delinquent_loans: number;
  chartered: number;
}

export interface Signal {
  id: string;
  label: string;
  rawValue: number;
  subScore: number;
  weight: number;
  direction: 'positive' | 'warning' | 'neutral';
  insight: string;
  source: 'NCUA' | 'Callahan' | 'Derived';
}

export interface CallahanEnrichment {
  coreProcessor: string | null;
  consumerLOS: string | null;
  mobileApp: string | null;
  eSignProvider: string | null;
  onlineBanking: string | null;
  roa: number | null;
  efficiencyRatio: number | null;
  loanGrowth12m: number | null;
  website: string | null;
  netWorthRatio: number | null;
}

export interface ScoredCreditUnion extends CreditUnion {
  intentScore: number;
  priority: 'hot' | 'warm' | 'cold';
  signals: Signal[];
  narrative: string;
  opportunity: 'DAO' | 'LOS' | 'both';
  algebrikFit: number;
  callahanData?: CallahanEnrichment;
}

export interface OutreachContent {
  cold_email: { subject: string; body: string };
  linkedin_message: string;
  sales_pov: string[];
}

export interface FilterState {
  states: string[];
  scoreMin: number;
  scoreMax: number;
  assetMin: number;
  assetMax: number;
  opportunity: 'all' | 'DAO' | 'LOS' | 'both';
  priority: 'all' | 'hot' | 'warm' | 'cold';
}

export interface DataMeta {
  lastUpdated: string;
  source: 'ncua_live' | 'ncua_cache' | 'ncua_custom' | 'sample';
  totalRecords: number;
  cacheAgeDays?: number;
}

export type SignalTag = 'CONSOLIDATION' | 'TECH_MODERNIZATION' | 'GROWTH' | 'LEADERSHIP_CHANGE' | 'REGULATORY' | 'NEUTRAL';

export interface EnrichmentNewsItem {
  headline: string;
  source: string;
  url: string;
  date: string;
  tag: SignalTag;
}

export interface EnrichmentResult {
  cuId: string;
  cuName: string;
  news: EnrichmentNewsItem[];
  jobs: { count: number; roles: string[]; sources: ('linkedin' | 'indeed')[] };
  websiteSignals: { keyword: string; context: string }[];
  regulatoryFlags: { title: string; date: string; severity: 'warning' | 'info' }[];
  overallEnrichmentScore: number;
  fetchedAt: string;
  partialFailures: string[];
}
