/**
 * Pure Callahan scoring helpers (safe for browser bundles — no fs).
 */

import type { Signal } from '@/types/signal-radar';

export interface CallahanRecord {
  n: string;
  st: string;
  ci: string;
  a: number;
  core: string | null;
  clos: string | null;
  comlos: string | null;
  esign: string | null;
  mob: string | null;
  ob: string | null;
  eff: number | null;
  roa: number | null;
  lg: number | null;
  lts: number | null;
  mfte: number | null;
  nwr: number | null;
  url: string | null;
}

const DIRECT_COMPETITORS = new Set([
  'meridianlink consumer', 'origence: arc os', 'temenos: infinity',
  'finastra: fusion consumerbot', 'sync1 systems', 'visifi', 'crif digital next',
  'finastra: origination', 'nymbus', 'q2', 'ncino',
]);

const LEGACY_EMBEDDED = new Set([
  'enhanced loan application (ela) - symitar/jha', 'fiserv: velocity',
  'fiserv: loan director', 'cu*answers: lendervp', 'share one: nsloan',
  'tci: decisionlender', 'flex', 'cspi', 'compusource',
]);

export type LOSStatus = 'undeclared' | 'legacy' | 'competitor' | 'modern_other';

export function classifyLOS(clos: string | null): { status: LOSStatus; label: string } {
  if (!clos) return { status: 'undeclared', label: 'Not disclosed in Callahan data' };
  const key = clos.toLowerCase();
  if (DIRECT_COMPETITORS.has(key) || [...DIRECT_COMPETITORS].some(c => key.includes(c.split(':')[0]))) {
    return { status: 'competitor', label: clos };
  }
  if (LEGACY_EMBEDDED.has(key) || [...LEGACY_EMBEDDED].some(c => key.includes(c.split(':')[0].split('(')[0].trim()))) {
    return { status: 'legacy', label: clos };
  }
  return { status: 'modern_other', label: clos };
}

const MODERN_CORES = [
  'jack henry: symitar', 'symitar', 'corelation: keystone', 'fiserv: dna',
  'fiserv: portico', 'cu*answers: cu*base', 'flex',
];
const LEGACY_CORES = [
  'fedcomp', 'compusource', 'ami information', 'cspi:', 'mdt:',
  'sharetec', 'fis: mercury',
];

export function coreCompatibilityScore(core: string | null): number {
  if (!core) return 30;
  const key = core.toLowerCase();
  if (MODERN_CORES.some(c => key.includes(c.toLowerCase()))) return 90;
  if (LEGACY_CORES.some(c => key.includes(c.toLowerCase()))) return 50;
  return 65;
}

export function buildCallahanSignals(rec: CallahanRecord): Signal[] {
  const signals: Signal[] = [];

  const { status: losStatus, label: losLabel } = classifyLOS(rec.clos);
  const losScore = losStatus === 'undeclared' ? 50
                : losStatus === 'legacy' ? 75
                : losStatus === 'competitor' ? 10
                : 35;
  signals.push({
    id: 'losStatus',
    label: 'LOS Landscape',
    rawValue: losScore,
    subScore: losScore,
    weight: 0,
    source: 'Callahan',
    direction: losScore >= 70 ? 'positive' : losScore >= 45 ? 'neutral' : 'warning',
    insight: losStatus === 'undeclared'
      ? 'LOS status not captured in Callahan data — requires discovery call to confirm'
      : losStatus === 'legacy'
      ? `Using legacy/embedded system (${losLabel}) — active replacement candidate for Algebrik`
      : losStatus === 'competitor'
      ? `Using competitor platform (${losLabel}) — displacement play, requires strong differentiation`
      : `Using ${losLabel} — modern platform in place, evaluate fit gap`,
  });

  const gapFields: [string, string | null][] = [
    ['Mobile Banking App', rec.mob],
    ['eSignature Provider', rec.esign],
    ['Online Banking', rec.ob],
    ['Commercial LOS', rec.comlos],
  ];
  const gaps = gapFields.filter(([, v]) => !v).map(([k]) => k);
  const gapScore = Math.round((gaps.length / gapFields.length) * 100);
  signals.push({
    id: 'techGap',
    label: 'Technology Stack Gap',
    rawValue: gaps.length,
    subScore: gapScore,
    weight: 0,
    source: 'Callahan',
    direction: gapScore >= 60 ? 'positive' : gapScore >= 30 ? 'neutral' : 'warning',
    insight: gaps.length === 0
      ? 'Digitally equipped — mobile, eSign, and online banking all present'
      : `Missing: ${gaps.join(', ')} — significant digital infrastructure gaps`,
  });

  if (rec.eff !== null) {
    const eff = rec.eff * 100;
    const effScore = eff < 60 ? 10 : eff < 70 ? 35 : eff < 80 ? 65 : eff < 90 ? 85 : 100;
    signals.push({
      id: 'callahanEfficiency',
      label: 'Operating Efficiency Ratio',
      rawValue: Math.round(eff * 10) / 10,
      subScore: effScore,
      weight: 0,
      source: 'Callahan',
      direction: effScore >= 65 ? 'positive' : effScore >= 35 ? 'neutral' : 'warning',
      insight: `Efficiency ratio ${eff.toFixed(1)}% — ${eff >= 80 ? 'above industry norm, strong cost-reduction motivation' : eff >= 70 ? 'near industry average, moderate efficiency pressure' : 'lean operation, lower cost-reduction urgency'}`,
    });
  }

  if (rec.roa !== null) {
    const roa = rec.roa * 100;
    const roaScore = roa > 1.0 ? 15 : roa > 0.5 ? 35 : roa > 0 ? 60 : roa > -0.5 ? 80 : 70;
    signals.push({
      id: 'returnOnAssets',
      label: 'Return on Assets (ROA)',
      rawValue: Math.round(roa * 100) / 100,
      subScore: roaScore,
      weight: 0,
      source: 'Callahan',
      direction: roa < 0.3 ? 'positive' : roa < 0.7 ? 'neutral' : 'warning',
      insight: roa < 0
        ? `ROA ${roa.toFixed(2)}% — operating at a loss, urgent need to reduce costs via automation`
        : roa < 0.5
        ? `ROA ${roa.toFixed(2)}% — below average profitability, efficiency investments have clear ROI`
        : `ROA ${roa.toFixed(2)}% — healthy profitability, less cost-reduction urgency`,
    });
  }

  if (rec.lg !== null) {
    const lg = rec.lg * 100;
    const lgScore = lg < 0 ? 0 : lg < 3 ? 25 : lg < 6 ? 45 : lg < 10 ? 65 : lg < 15 ? 85 : 100;
    signals.push({
      id: 'callahanLoanGrowth',
      label: 'Loan Growth (12-Month)',
      rawValue: Math.round(lg * 10) / 10,
      subScore: lgScore,
      weight: 0,
      source: 'Callahan',
      direction: lgScore >= 50 ? 'positive' : lgScore >= 25 ? 'neutral' : 'warning',
      insight: lg < 0
        ? `Loan portfolio contracted ${Math.abs(lg).toFixed(1)}% — declining origination demand`
        : `Loan portfolio grew ${lg.toFixed(1)}% in the last 12 months — ${lg >= 10 ? 'rapid growth demands scalable LOS' : 'steady growth, moderate tooling pressure'}`,
    });
  }

  return signals;
}

export function calcEnhancedAlgebrikFit(baseScore: number, rec: CallahanRecord): number {
  const { status: losStatus } = classifyLOS(rec.clos);
  const losBonus = losStatus === 'legacy' ? 20 : losStatus === 'competitor' ? -10 : 0;

  const coreScore = coreCompatibilityScore(rec.core) / 100 * 15;

  const roaBonus = rec.roa !== null && rec.roa < 0.005 ? 10 : 0;

  const gapFields = [rec.mob, rec.esign, rec.ob].filter(v => !v).length;
  const gapBonus = gapFields * 2;

  const m = rec.a / 1_000_000;
  const sizeBonus = (m >= 200 && m <= 3000) ? 12 : (m >= 100 && m <= 5000) ? 6 : 0;

  return Math.min(100, Math.round(baseScore * 0.35 + losBonus + coreScore + roaBonus + gapBonus + sizeBonus));
}
