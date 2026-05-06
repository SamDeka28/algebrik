import type { CreditUnion, Signal, ScoredCreditUnion } from '@/types/signal-radar';

/**
 * Signal Detection Engine v2
 *
 * 7 signals derived entirely from free NCUA call report data.
 * Age-based "digital gap" has been removed — it was a proxy, not a signal.
 *
 * Signal weights (must sum to 100):
 *   Asset Size Fit           18%  — Is this CU in Algebrik's addressable range?
 *   Asset Growth Rate        20%  — Rapid growth creates infrastructure urgency
 *   Loan-to-Share Ratio      18%  — High ratio = origination capacity under pressure
 *   Member Growth Rate       15%  — Fast member growth → digital onboarding demand
 *   Loan Portfolio Growth    14%  — Direct demand signal for LOS expansion
 *   Operating Inefficiency   10%  — High expense ratio → cost-reduction motivation
 *   Delinquency Pressure      5%  — High delinquency → underwriting/workflow gap
 *
 * Algebrik Fit Score (separate from intent score):
 *   Based on size band alignment + loan growth + efficiency gap
 *   Weighted toward what Algebrik specifically solves (cloud-native LOS + digital lending UX)
 */

function clamp(v: number, min = 0, max = 100): number {
  return Math.max(min, Math.min(max, v));
}

// ─── Signal 1: Asset Size Fit ─────────────────────────────────────────────────
// Algebrik targets credit unions where digital lending ROI is highest.
// Too small: limited budget. Too large: existing enterprise contracts.
// Sweet spot: $100M–$5B assets.
function assetSizeScore(assets: number): { subScore: number; insight: string } {
  const m = assets / 1_000_000;
  let subScore: number;

  if (m < 10)         subScore = 0;
  else if (m < 50)    subScore = clamp((m - 10) / 40 * 35);          // 0→35
  else if (m < 100)   subScore = clamp(35 + (m - 50) / 50 * 25);     // 35→60
  else if (m < 500)   subScore = clamp(60 + (m - 100) / 400 * 35);   // 60→95
  else if (m <= 5000) subScore = 100;                                 // peak sweet spot
  else if (m <= 20000) subScore = clamp(100 - (m - 5000) / 15000 * 25); // 100→75
  else                subScore = clamp(100 - (m - 5000) / 80000 * 55);  // gradual decline

  const fmt = m >= 1000 ? `$${(m / 1000).toFixed(1)}B` : `$${Math.round(m)}M`;
  const band = m < 50 ? 'below addressable range' :
               m < 100 ? 'entry range' :
               m <= 5000 ? 'prime addressable range' : 'enterprise — likely contracted';

  return {
    subScore,
    insight: `${fmt} in total assets — ${band} for Algebrik's cloud-native LOS`,
  };
}

// ─── Signal 2: Asset Growth Rate ─────────────────────────────────────────────
function assetGrowthScore(assets: number, assets_prev: number): { subScore: number; rawValue: number; insight: string } {
  if (!assets_prev || assets_prev <= 0) return { subScore: 25, rawValue: 0, insight: 'Prior period assets unavailable' };
  const pct = (assets - assets_prev) / assets_prev * 100;

  const subScore = pct < 0 ? 0 : pct < 2 ? 20 : pct < 5 ? 45 : pct < 8 ? 70 : pct < 12 ? 88 : 100;

  return {
    subScore, rawValue: Math.round(pct * 10) / 10,
    insight: pct < 0
      ? `Assets contracted ${Math.abs(pct).toFixed(1)}% YoY — declining demand`
      : pct < 2 ? `Assets grew ${pct.toFixed(1)}% YoY — stable, low urgency`
      : pct < 5 ? `Assets grew ${pct.toFixed(1)}% YoY — moderate growth creates capacity need`
      : `Assets grew ${pct.toFixed(1)}% YoY — rapid expansion strains current infrastructure`,
  };
}

// ─── Signal 3: Loan-to-Share Ratio ───────────────────────────────────────────
// Primary LOS signal: high ratio = origination running near capacity
function loanToShareScore(loans: number, shares: number): { subScore: number; rawValue: number; insight: string } {
  if (!shares || shares <= 0) return { subScore: 25, rawValue: 0, insight: 'Share data unavailable' };
  const ratio = (loans / shares) * 100;

  const subScore = ratio < 40 ? 10 : ratio < 55 ? 30 : ratio < 65 ? 50 : ratio < 75 ? 68 : ratio < 85 ? 85 : 100;

  return {
    subScore, rawValue: Math.round(ratio * 10) / 10,
    insight: ratio >= 85
      ? `Loan-to-share ${ratio.toFixed(1)}% — critically near capacity, direct LOS replacement signal`
      : ratio >= 75
      ? `Loan-to-share ${ratio.toFixed(1)}% — elevated pressure, origination workflow at risk`
      : ratio >= 65
      ? `Loan-to-share ${ratio.toFixed(1)}% — moderate, room to grow before pressure hits`
      : `Loan-to-share ${ratio.toFixed(1)}% — low utilization, limited origination urgency`,
  };
}

// ─── Signal 4: Member Growth Rate ────────────────────────────────────────────
// Primary DAO signal: fast member growth → manual onboarding doesn't scale
function memberGrowthScore(members: number, members_prev: number): { subScore: number; rawValue: number; insight: string } {
  if (!members_prev || members_prev <= 0) return { subScore: 25, rawValue: 0, insight: 'Prior member data unavailable' };
  const pct = (members - members_prev) / members_prev * 100;

  const subScore = pct < 0 ? 0 : pct < 1 ? 20 : pct < 2 ? 40 : pct < 3.5 ? 60 : pct < 5 ? 80 : 100;

  return {
    subScore, rawValue: Math.round(pct * 10) / 10,
    insight: pct < 0
      ? `Membership declined ${Math.abs(pct).toFixed(1)}% YoY — attrition risk`
      : pct < 1 ? `Membership grew ${pct.toFixed(1)}% — flat, limited onboarding pressure`
      : pct < 3.5 ? `Membership grew ${pct.toFixed(1)}% — steady growth requiring scalable digital onboarding`
      : `Membership grew ${pct.toFixed(1)}% YoY — rapid growth, manual account opening becomes a bottleneck`,
  };
}

// ─── Signal 5: Loan Portfolio Growth Rate ────────────────────────────────────
// Direct demand signal: growing loan book requires better origination tooling
function loanGrowthScore(loans: number, loans_prev: number): { subScore: number; rawValue: number; insight: string } {
  if (!loans_prev || loans_prev <= 0) return { subScore: 25, rawValue: 0, insight: 'Prior loan data unavailable' };
  const pct = (loans - loans_prev) / loans_prev * 100;

  const subScore = pct < 0 ? 0 : pct < 3 ? 25 : pct < 6 ? 45 : pct < 10 ? 65 : pct < 15 ? 85 : 100;

  return {
    subScore, rawValue: Math.round(pct * 10) / 10,
    insight: pct < 0
      ? `Loan portfolio shrank ${Math.abs(pct).toFixed(1)}% — declining origination demand`
      : pct < 3 ? `Loan portfolio grew ${pct.toFixed(1)}% — modest, limited tooling pressure`
      : pct < 6 ? `Loan portfolio grew ${pct.toFixed(1)}% — solid growth indicates active origination`
      : `Loan portfolio grew ${pct.toFixed(1)}% YoY — strong growth demands scalable origination infrastructure`,
  };
}

// ─── Signal 6: Operating Inefficiency ────────────────────────────────────────
// Replaces age-based "digital gap" — uses real financial data
// Operating expense ratio = operating expenses / total assets
// High ratio = inefficiency = direct cost-reduction motivation for digital tools
function operatingEfficiencyScore(operating_expenses: number, assets: number): { subScore: number; rawValue: number; insight: string } {
  if (!operating_expenses || !assets || assets <= 0) {
    return { subScore: 30, rawValue: 0, insight: 'Operating expense data unavailable' };
  }
  const ratio = (operating_expenses / assets) * 100; // as % of assets

  // Industry benchmark: ~3% is efficient, >4.5% is high, >6% is a red flag
  const subScore = ratio < 2 ? 10 : ratio < 3 ? 30 : ratio < 4 ? 50 : ratio < 5 ? 70 : ratio < 6 ? 88 : 100;

  return {
    subScore, rawValue: Math.round(ratio * 100) / 100,
    insight: ratio < 3
      ? `Operating expense ratio ${ratio.toFixed(2)}% of assets — lean operation, lower cost-reduction urgency`
      : ratio < 4.5
      ? `Operating expense ratio ${ratio.toFixed(2)}% — above benchmark, efficiency gains available through automation`
      : `Operating expense ratio ${ratio.toFixed(2)}% — significantly above industry norm, strong motivation to reduce costs via digital tools`,
  };
}

// ─── Signal 7: Delinquency Pressure ──────────────────────────────────────────
// High delinquency rate → underwriting/origination workflow gaps
// Suggests inadequate risk assessment or collections tooling
function delinquencyScore(delinquent_loans: number, total_loans: number): { subScore: number; rawValue: number; insight: string } {
  if (!delinquent_loans || !total_loans || total_loans <= 0) {
    return { subScore: 20, rawValue: 0, insight: 'Delinquency data not available in current period' };
  }
  const rate = (delinquent_loans / total_loans) * 100;

  // Industry benchmark: <1% excellent, 1–2% normal, 2–4% elevated, >4% concerning
  const subScore = rate < 0.5 ? 5 : rate < 1 ? 20 : rate < 1.5 ? 40 : rate < 2.5 ? 60 : rate < 4 ? 80 : 100;

  return {
    subScore, rawValue: Math.round(rate * 100) / 100,
    insight: rate < 1
      ? `Delinquency rate ${rate.toFixed(2)}% — healthy portfolio, strong underwriting`
      : rate < 2.5
      ? `Delinquency rate ${rate.toFixed(2)}% — above benchmark, improved origination decisioning would help`
      : `Delinquency rate ${rate.toFixed(2)}% — significantly elevated, points to underwriting workflow gaps addressable through modern LOS`,
  };
}

// ─── Narrative Generator ──────────────────────────────────────────────────────
function generateNarrative(cu: CreditUnion, signals: Signal[], opportunity: string): string {
  const assets = cu.assets / 1_000_000;
  const fmt = assets >= 1000 ? `$${(assets / 1000).toFixed(1)}B` : `$${Math.round(assets)}M`;

  const ag = signals.find(s => s.id === 'assetGrowth');
  const mg = signals.find(s => s.id === 'memberGrowth');
  const ls = signals.find(s => s.id === 'loanToShare');
  const lg = signals.find(s => s.id === 'loanGrowth');
  const oe = signals.find(s => s.id === 'operatingEfficiency');

  const topTwo = [...signals].sort((a, b) => b.subScore - a.subScore).slice(0, 2);
  const parts: string[] = [`${cu.name} is a ${fmt} credit union in ${cu.city}, ${cu.state}.`];

  if (ag && ag.rawValue > 4) {
    parts.push(`Assets grew ${ag.rawValue.toFixed(1)}% year-over-year, putting mounting pressure on their existing infrastructure to keep pace.`);
  }
  if (ls && ls.rawValue > 70) {
    parts.push(`With a loan-to-share ratio of ${ls.rawValue.toFixed(1)}%, their origination capacity is operating near the ceiling — a definitive signal that current workflows cannot sustain continued growth.`);
  }
  if (lg && lg.rawValue > 5) {
    parts.push(`The loan portfolio grew ${lg.rawValue.toFixed(1)}% in the same period — volume growth that makes manual or legacy origination untenable.`);
  }
  if (mg && mg.rawValue > 2) {
    parts.push(`Membership expanding at ${mg.rawValue.toFixed(1)}% YoY creates friction in manual onboarding processes — exactly the gap a Digital Account Opening platform eliminates.`);
  }
  if (oe && oe.rawValue > 4) {
    parts.push(`Their operating expense ratio of ${oe.rawValue.toFixed(2)}% is above industry norms, indicating inefficiencies that technology-driven automation can directly address.`);
  }

  const window = topTwo.some(s => s.subScore >= 80) ? '6–12 months' : '12–18 months';
  parts.push(`The convergence of ${topTwo.map(s => s.label.toLowerCase()).join(' and ')} places ${cu.name} in an estimated ${window} buying window for ${opportunity === 'both' ? 'both DAO and LOS solutions' : `a ${opportunity} solution`}.`);

  return parts.join(' ');
}

// ─── Opportunity + Algebrik Fit ───────────────────────────────────────────────
function mapOpportunity(signals: Signal[]): 'DAO' | 'LOS' | 'both' {
  const ls = signals.find(s => s.id === 'loanToShare')?.subScore ?? 0;
  const lg = signals.find(s => s.id === 'loanGrowth')?.subScore ?? 0;
  const ag = signals.find(s => s.id === 'assetGrowth')?.subScore ?? 0;
  const mg = signals.find(s => s.id === 'memberGrowth')?.subScore ?? 0;

  const losScore = (ls * 0.45) + (lg * 0.35) + (ag * 0.2);
  const daoScore = (mg * 0.65) + (ag * 0.35);

  if (losScore >= 55 && daoScore >= 55) return 'both';
  return losScore >= daoScore ? 'LOS' : 'DAO';
}

/**
 * Algebrik Fit Score — how closely does this CU match Algebrik's ideal customer profile?
 * Algebrik is a cloud-native LOS built for credit unions focused on:
 * - Digital lending experience (member-first UX)
 * - Integrations with major CU cores (Jack Henry, Fiserv, Corelation, etc.)
 * - Mid-to-large credit unions ready to modernize origination workflows
 *
 * Fit factors: asset size alignment + loan growth pressure + operational efficiency gap
 */
function calcAlgebrikFit(signals: Signal[], assets: number): number {
  const assetFit = signals.find(s => s.id === 'assetSize')?.subScore ?? 0;
  const loanGrowth = signals.find(s => s.id === 'loanGrowth')?.subScore ?? 0;
  const loanToShare = signals.find(s => s.id === 'loanToShare')?.subScore ?? 0;
  const opEfficiency = signals.find(s => s.id === 'operatingEfficiency')?.subScore ?? 0;

  // Algebrik sweet spot: $200M–$3B, high loan growth, LOS strain, operational inefficiency
  const m = assets / 1_000_000;
  const sizeBonus = (m >= 200 && m <= 3000) ? 15 : (m >= 100 && m <= 5000) ? 8 : 0;

  // Cap at 70 when no Callahan tech stack data is available.
  // A score above 70 requires confirmed tech stack intel (via Callahan or manual override).
  // "Good NCUA signals" alone cannot justify a 90–100 fit — we don't know their LOS/core yet.
  return Math.min(70, Math.round(
    (assetFit * 0.25) +
    (loanGrowth * 0.30) +
    (loanToShare * 0.25) +
    (opEfficiency * 0.20) +
    sizeBonus
  ));
}

// ─── Main Scorer ──────────────────────────────────────────────────────────────
export function scoreCreditUnion(cu: CreditUnion): ScoredCreditUnion {
  const asResult = assetSizeScore(cu.assets);
  const agResult = assetGrowthScore(cu.assets, cu.assets_prev);
  const lsResult = loanToShareScore(cu.loans, cu.shares);
  const mgResult = memberGrowthScore(cu.members, cu.members_prev);
  const lgResult = loanGrowthScore(cu.loans, cu.loans_prev_yr);
  const oeResult = operatingEfficiencyScore(cu.operating_expenses, cu.assets);
  const dqResult = delinquencyScore(cu.delinquent_loans, cu.loans);

  const signals: Signal[] = [
    {
      id: 'assetSize', label: 'Asset Size Fit', weight: 18, source: 'NCUA',
      rawValue: cu.assets, subScore: asResult.subScore,
      direction: asResult.subScore >= 60 ? 'positive' : asResult.subScore >= 30 ? 'neutral' : 'warning',
      insight: asResult.insight,
    },
    {
      id: 'assetGrowth', label: 'Asset Growth Rate', weight: 20, source: 'NCUA',
      rawValue: agResult.rawValue, subScore: agResult.subScore,
      direction: agResult.subScore >= 50 ? 'positive' : agResult.subScore >= 25 ? 'neutral' : 'warning',
      insight: agResult.insight,
    },
    {
      id: 'loanToShare', label: 'Loan-to-Share Ratio', weight: 18, source: 'NCUA',
      rawValue: lsResult.rawValue, subScore: lsResult.subScore,
      direction: lsResult.subScore >= 70 ? 'positive' : lsResult.subScore >= 40 ? 'neutral' : 'warning',
      insight: lsResult.insight,
    },
    {
      id: 'memberGrowth', label: 'Member Growth Rate', weight: 15, source: 'NCUA',
      rawValue: mgResult.rawValue, subScore: mgResult.subScore,
      direction: mgResult.subScore >= 50 ? 'positive' : mgResult.subScore >= 25 ? 'neutral' : 'warning',
      insight: mgResult.insight,
    },
    {
      id: 'loanGrowth', label: 'Loan Portfolio Growth', weight: 14, source: 'NCUA',
      rawValue: lgResult.rawValue, subScore: lgResult.subScore,
      direction: lgResult.subScore >= 50 ? 'positive' : lgResult.subScore >= 25 ? 'neutral' : 'warning',
      insight: lgResult.insight,
    },
    {
      id: 'operatingEfficiency', label: 'Operating Inefficiency', weight: 10, source: 'NCUA',
      rawValue: oeResult.rawValue, subScore: oeResult.subScore,
      direction: oeResult.subScore >= 60 ? 'positive' : oeResult.subScore >= 30 ? 'neutral' : 'warning',
      insight: oeResult.insight,
    },
    {
      id: 'delinquency', label: 'Delinquency Pressure', weight: 5, source: 'NCUA',
      rawValue: dqResult.rawValue, subScore: dqResult.subScore,
      direction: dqResult.subScore >= 50 ? 'positive' : dqResult.subScore >= 20 ? 'neutral' : 'warning',
      insight: dqResult.insight,
    },
  ];

  const intentScore = Math.round(
    signals.reduce((sum, s) => sum + (s.subScore * s.weight) / 100, 0)
  );

  const priority: 'hot' | 'warm' | 'cold' =
    intentScore >= 70 ? 'hot' : intentScore >= 45 ? 'warm' : 'cold';

  const opportunity = mapOpportunity(signals);
  const algebrikFit = calcAlgebrikFit(signals, cu.assets);
  const narrative = generateNarrative(cu, signals, opportunity);

  return { ...cu, intentScore, priority, signals, narrative, opportunity, algebrikFit };
}
