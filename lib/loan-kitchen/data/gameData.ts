import { Users, CreditCard, FileText, Scale, PieChart } from 'lucide-react';

export type LoanType =
'Personal' |
'Auto' |
'Mortgage' |
'Business' |
'LineOfCredit';
export type RiskGrade = 'A' | 'B' | 'C' | 'D' | 'F';
export type StationId =
'account' |
'pos' |
'origination' |
'decisioning' |
'analytics';

export type ShopItemId =
'hire_staff' |
'ai_account' |
'ai_pos' |
'ai_origination' |
'ai_decisioning' |
'ai_analytics' |
'legacy_account' |
'legacy_pos' |
'legacy_origination' |
'legacy_decisioning' |
'legacy_analytics';

export interface Customer {
  id: string;
  name: string;
  type: LoanType;
  amount: number;
  creditScore: number;
  dti: number; // Debt to Income ratio
  ltv: number; // Loan to Value ratio
  riskGrade: RiskGrade;
  patience: number; // 0-100, decreases over time
  maxPatience: number;
  avatar: string;
}

export interface ActiveLoan extends Customer {
  currentStationIndex: number;
  progress: number; // 0-100 for current station
  status: 'processing' | 'completed' | 'failed';
  startTime: number;
  autoProcessTimer?: number;
  autoProcessing?: boolean;
  waitingForStation?: boolean; // true when next station is full and loan can't advance
}

export interface Station {
  id: StationId;
  name: string;
  icon: any;
  color: string;
  duration: number; // Base seconds to complete
  description: string;
  actionLabel: string;
}

export const STATIONS: Station[] = [
{
  id: 'account',
  name: 'Account Opening',
  icon: Users,
  color: 'bg-blue-500',
  duration: 3,
  description: 'Verify Identity',
  actionLabel: 'Verify ID'
},
{
  id: 'pos',
  name: 'Point of Sale',
  icon: CreditCard,
  color: 'bg-purple-500',
  duration: 4,
  description: 'Select Product',
  actionLabel: 'Select Product'
},
{
  id: 'origination',
  name: 'Origination',
  icon: FileText,
  color: 'bg-yellow-500',
  duration: 5,
  description: 'Collect Data',
  actionLabel: 'Input Data'
},
{
  id: 'decisioning',
  name: 'Decisioning',
  icon: Scale,
  color: 'bg-red-500',
  duration: 6,
  description: 'Risk Review',
  actionLabel: 'Review Risk'
},
{
  id: 'analytics',
  name: 'Portfolio',
  icon: PieChart,
  color: 'bg-green-500',
  duration: 3,
  description: 'Final Booking',
  actionLabel: 'Book Loan'
}];


export const LOAN_TYPES: Record<
  LoanType,
  {min: number;max: number;difficulty: number;}> =
{
  Personal: { min: 5000, max: 50000, difficulty: 1 },
  Auto: { min: 15000, max: 80000, difficulty: 2 },
  Mortgage: { min: 150000, max: 800000, difficulty: 3 },
  Business: { min: 50000, max: 500000, difficulty: 3 },
  LineOfCredit: { min: 10000, max: 100000, difficulty: 2 }
};

export const NAMES = [
'Alex Rivera',
'Jordan Lee',
'Casey Smith',
'Taylor Doe',
'Morgan Chen',
'Riley Johnson',
'Quinn Davis',
'Avery Wilson',
'Jamie Miller',
'Drew Brown',
'Sam Wilson',
'Charlie Thomas',
'Peyton Moore',
'Skyler Jackson',
'Reese White'];


export const AVATARS = [
'👨‍💼',
'👩‍💼',
'👨‍🏭',
'👩‍🏫',
'👨‍⚕️',
'👩‍⚖️',
'👨‍🌾',
'👩‍🍳',
'👨‍🔧',
'👩‍🔬'];


export const GAME_CONFIG = {
  ROUND_DURATION: 180,
  SPAWN_RATE_MIN: 4400, // 10% slower
  SPAWN_RATE_MAX: 7700, // 10% slower
  PATIENCE_DECAY: 3.6, // 10% slower decay
  TICK_RATE: 1000,
  PORTFOLIO_HEALTH_GAME_OVER: 30,
  BRAND_EQUITY_GAME_OVER: 20
};

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  emoji: string;
  stationId: StationId;
  efficiency: number;
}

export const STAFF_MEMBERS: StaffMember[] = [
{
  id: 'teller1',
  name: 'Maria Santos',
  role: 'Teller',
  emoji: '👩‍💼',
  stationId: 'account',
  efficiency: 1.0
},
{
  id: 'rm1',
  name: 'James Park',
  role: 'Relationship Mgr',
  emoji: '👨‍💼',
  stationId: 'pos',
  efficiency: 1.0
},
{
  id: 'lo1',
  name: 'Priya Patel',
  role: 'Loan Officer',
  emoji: '👩‍🏫',
  stationId: 'origination',
  efficiency: 1.0
},
{
  id: 'uw1',
  name: 'Derek Chen',
  role: 'Underwriter',
  emoji: '👨‍⚖️',
  stationId: 'decisioning',
  efficiency: 1.0
},
{
  id: 'pa1',
  name: 'Sofia Reyes',
  role: 'Portfolio Analyst',
  emoji: '👩‍🔬',
  stationId: 'analytics',
  efficiency: 1.0
}];


export interface ShopItem {
  id: ShopItemId;
  name: string;
  description: string;
  cost: number;
  emoji: string;
  maxPurchases: number;
  category: 'staff' | 'ai' | 'legacy';
  stationId?: StationId;
}

export const SHOP_ITEMS: ShopItem[] = [
{
  id: 'hire_staff',
  name: 'Hire Extra Staff',
  description:
  'Add a flexible staff member who can be assigned to any station.',
  cost: 500,
  emoji: '🧑‍💼',
  maxPurchases: 3,
  category: 'staff'
},
{
  id: 'ai_account',
  name: 'Algebrik AI — Account',
  description:
  'AI-powered ID verification. Auto-processes clean loans, chains to next stage.',
  cost: 800,
  emoji: '🤖',
  maxPurchases: 1,
  category: 'ai',
  stationId: 'account'
},
{
  id: 'ai_pos',
  name: 'Algebrik AI — POS',
  description:
  'Smart product matching engine. Auto-processes and chains automatically.',
  cost: 800,
  emoji: '🤖',
  maxPurchases: 1,
  category: 'ai',
  stationId: 'pos'
},
{
  id: 'ai_origination',
  name: 'Algebrik AI — Origination',
  description:
  'Automated document collection. Auto-processes and chains automatically.',
  cost: 1000,
  emoji: '🤖',
  maxPurchases: 1,
  category: 'ai',
  stationId: 'origination'
},
{
  id: 'ai_decisioning',
  name: 'Algebrik AI — Decisioning',
  description:
  'ML-powered credit risk engine. Clearer recommendations, faster decisions.',
  cost: 1500,
  emoji: '🧠',
  maxPurchases: 1,
  category: 'ai',
  stationId: 'decisioning'
},
{
  id: 'ai_analytics',
  name: 'Algebrik AI — Portfolio',
  description: 'Real-time portfolio optimization and automated loan booking.',
  cost: 800,
  emoji: '🤖',
  maxPurchases: 1,
  category: 'ai',
  stationId: 'analytics'
},
// Legacy Software — cheaper but siloed, glitch-prone
{
  id: 'legacy_account',
  name: 'Legacy Software — Account',
  description:
  "Old ID system. Speeds up processing but systems don't talk. Prone to glitches.",
  cost: 300,
  emoji: '💾',
  maxPurchases: 1,
  category: 'legacy',
  stationId: 'account'
},
{
  id: 'legacy_pos',
  name: 'Legacy Software — POS',
  description:
  'Outdated POS terminal. Faster clicks but no automation. Glitches over time.',
  cost: 300,
  emoji: '💾',
  maxPurchases: 1,
  category: 'legacy',
  stationId: 'pos'
},
{
  id: 'legacy_origination',
  name: 'Legacy Software — Origination',
  description:
  'Old data entry system. Reduces huddle complexity but causes data errors.',
  cost: 350,
  emoji: '💾',
  maxPurchases: 1,
  category: 'legacy',
  stationId: 'origination'
},
{
  id: 'legacy_decisioning',
  name: 'Legacy Software — Decisioning',
  description:
  'Outdated risk model. Faster decisions but higher chance of bad approvals.',
  cost: 400,
  emoji: '💾',
  maxPurchases: 1,
  category: 'legacy',
  stationId: 'decisioning'
},
{
  id: 'legacy_analytics',
  name: 'Legacy Software — Portfolio',
  description:
  'Old booking system. Works but causes reconciliation errors over time.',
  cost: 300,
  emoji: '💾',
  maxPurchases: 1,
  category: 'legacy',
  stationId: 'analytics'
}];
