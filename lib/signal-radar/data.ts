import type { CreditUnion, ScoredCreditUnion, DataMeta, CallahanEnrichment } from '@/types/signal-radar';
import { loadNCUAData, generateSampleData } from './ncua';
import { getCoordinates } from './geocode';
import { scoreCreditUnion } from './scoring';
import { getCallahanRecord, buildCallahanSignals, calcEnhancedAlgebrikFit } from './callahan';
import type { CallahanRecord } from './callahanCore';

interface CacheEntry {
  data: ScoredCreditUnion[];
  meta: DataMeta;
}

let _cache: CacheEntry | null = null;

function parseNum(v: string | undefined): number {
  if (!v) return 0;
  const n = parseFloat(v.replace(/[^0-9.-]/g, ''));
  return isNaN(n) ? 0 : n;
}

function parseYear(dateStr: string | undefined): number {
  if (!dateStr) return 1970;
  const parts = dateStr.split('/');
  const y = parts.length === 3 ? parseInt(parts[2]) : parseInt(dateStr.slice(-4));
  return isNaN(y) || y < 1900 || y > 2026 ? 1970 : y;
}

export async function getAllScoredCUs(force = false): Promise<{ data: ScoredCreditUnion[]; meta: DataMeta }> {
  if (_cache && !force) return _cache;

  const { records, source } = await loadNCUAData();

  const cus: CreditUnion[] = records
    .filter(r => r.CU_NUMBER && r.CU_NAME && r.STATE_CODE)
    .map(r => {
      const [lat, lng] = getCoordinates(r.CITY || '', r.STATE_CODE || '');
      return {
        id: r.CU_NUMBER.trim(),
        name: r.CU_NAME.trim(),
        state: r.STATE_CODE.trim().toUpperCase(),
        city: r.CITY ? r.CITY.trim() : '',
        lat, lng,
        assets: parseNum(r.ACCT_010),
        members: parseNum(r.ACCT_083),
        loans: parseNum(r.ACCT_025A),
        shares: parseNum(r.ACCT_018),
        assets_prev: parseNum(r.ACCT_010_PREV),
        members_prev: parseNum(r.ACCT_083_PREV),
        loans_prev: parseNum(r.ACCT_025A_PREV),
        loans_prev_yr: parseNum(r.ACCT_025A_PREV),
        operating_expenses: parseNum(r.ACCT_031),
        delinquent_loans: parseNum(r.ACCT_748),
        chartered: parseYear(r.JOIN_DATE),
      };
    })
    .filter(cu => cu.assets > 0);

  // Score with NCUA data
  const ncuaScored = cus.map(scoreCreditUnion);

  // Enrich with Callahan data where available
  const enriched: ScoredCreditUnion[] = ncuaScored.map(cu => {
    const callahan = getCallahanRecord(cu.id);
    if (!callahan) return cu;

    const callahanSignals = buildCallahanSignals(callahan);
    const enhancedFit = calcEnhancedAlgebrikFit(cu.algebrikFit, callahan);

    const callahanData: CallahanEnrichment = {
      coreProcessor: callahan.core,
      consumerLOS: callahan.clos,
      mobileApp: callahan.mob,
      eSignProvider: callahan.esign,
      onlineBanking: callahan.ob,
      roa: callahan.roa,
      efficiencyRatio: callahan.eff,
      loanGrowth12m: callahan.lg,
      website: callahan.url,
      netWorthRatio: callahan.nwr,
    };

    return {
      ...cu,
      algebrikFit: enhancedFit,
      signals: [...cu.signals, ...callahanSignals],
      callahanData,
    };
  });

  let sorted = enriched.sort((a, b) => b.intentScore - a.intentScore);

  // Safety net: if pipeline produced 0 CUs (bad NCUA data slipped through), fall back to sample data
  if (sorted.length === 0) {
    console.warn('[Data] Pipeline produced 0 CUs — falling back to sample data');
    const sampleRecords = generateSampleData();
    const sampleCUs = sampleRecords
      .filter(r => r.CU_NUMBER && r.CU_NAME && r.STATE_CODE)
      .map(r => {
        const [lat, lng] = getCoordinates(r.CITY || '', r.STATE_CODE || '');
        return {
          id: r.CU_NUMBER.trim(), name: r.CU_NAME.trim(),
          state: r.STATE_CODE.trim().toUpperCase(), city: r.CITY ? r.CITY.trim() : '',
          lat, lng,
          assets: parseNum(r.ACCT_010), members: parseNum(r.ACCT_083),
          loans: parseNum(r.ACCT_025A), shares: parseNum(r.ACCT_018),
          assets_prev: parseNum(r.ACCT_010_PREV), members_prev: parseNum(r.ACCT_083_PREV),
          loans_prev: parseNum(r.ACCT_025A_PREV), loans_prev_yr: parseNum(r.ACCT_025A_PREV),
          operating_expenses: parseNum(r.ACCT_031), delinquent_loans: parseNum(r.ACCT_748),
          chartered: parseYear(r.JOIN_DATE),
        };
      })
      .filter(cu => cu.assets > 0);
    sorted = sampleCUs.map(scoreCreditUnion).sort((a, b) => b.intentScore - a.intentScore);
  }

  const meta: DataMeta = {
    lastUpdated: new Date().toISOString(),
    source,
    totalRecords: sorted.length,
  };

  _cache = { data: sorted, meta };
  console.log(`[Data] Scored ${sorted.length} CUs | Source: ${source} | Callahan-enriched: ${enriched.filter(c => c.callahanData).length}`);
  return _cache;
}

export async function getCUById(id: string): Promise<ScoredCreditUnion | null> {
  const { data } = await getAllScoredCUs();
  return data.find(cu => cu.id === id) ?? null;
}

export function invalidateCache() {
  _cache = null;
  console.log('[Data] Cache invalidated — will re-fetch on next request');
}

/**
 * Apply a manual tech stack override to a specific CU in the in-memory cache.
 * Re-computes the Algebrik Fit Score using the overridden LOS/core data.
 * Returns the new algebrikFit value, or null if the CU is not in cache.
 */
export function applyOverrideToCache(id: string, override: Partial<CallahanEnrichment>): number | null {
  if (!_cache) return null;
  const idx = _cache.data.findIndex(c => c.id === id);
  if (idx === -1) return null;

  const cu = _cache.data[idx];
  const existing = cu.callahanData ?? {} as Partial<CallahanEnrichment>;

  // Build a synthetic CallahanRecord merging override over existing Callahan data
  const mergedRec: CallahanRecord = {
    n: cu.name,
    st: cu.state,
    ci: cu.city,
    a: cu.assets,
    core: override.coreProcessor !== undefined ? override.coreProcessor : existing.coreProcessor ?? null,
    clos: override.consumerLOS !== undefined ? override.consumerLOS : existing.consumerLOS ?? null,
    comlos: null,
    esign: override.eSignProvider !== undefined ? override.eSignProvider : existing.eSignProvider ?? null,
    mob: override.mobileApp !== undefined ? override.mobileApp : existing.mobileApp ?? null,
    ob: override.onlineBanking !== undefined ? override.onlineBanking : existing.onlineBanking ?? null,
    eff: existing.efficiencyRatio ?? null,
    roa: existing.roa ?? null,
    lg: existing.loanGrowth12m ?? null,
    lts: null,
    mfte: null,
    nwr: existing.netWorthRatio ?? null,
    url: existing.website ?? null,
  };

  const newFit = calcEnhancedAlgebrikFit(cu.intentScore, mergedRec);
  const newCallahanData: CallahanEnrichment = {
    coreProcessor: mergedRec.core,
    consumerLOS: mergedRec.clos,
    mobileApp: mergedRec.mob,
    eSignProvider: mergedRec.esign,
    onlineBanking: mergedRec.ob,
    roa: mergedRec.roa,
    efficiencyRatio: mergedRec.eff,
    loanGrowth12m: mergedRec.lg,
    website: mergedRec.url,
    netWorthRatio: mergedRec.nwr,
  };

  _cache.data[idx] = { ...cu, algebrikFit: newFit, callahanData: newCallahanData };
  return newFit;
}

/**
 * Remove a manual override from a specific CU.
 * Invalidates the full cache so data is re-loaded from source on next request.
 */
export function removeOverrideFromCache(_id: string): void {
  // Full cache invalidation ensures the CU gets re-enriched from Callahan source
  invalidateCache();
}
