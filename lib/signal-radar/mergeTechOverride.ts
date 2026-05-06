import type { CallahanEnrichment, ScoredCreditUnion } from '@/types/signal-radar';
import type { CallahanRecord } from './callahanCore';
import { calcEnhancedAlgebrikFit } from './callahanCore';

/** Match server-side override scoring for static-export tech stack edits */
export function mergedRecordFromCuAndPatch(
  cu: ScoredCreditUnion,
  override: Partial<CallahanEnrichment>,
): CallahanRecord {
  const existing = cu.callahanData ?? {} as Partial<CallahanEnrichment>;

  return {
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
}

export function computeFitAfterTechPatch(cu: ScoredCreditUnion, override: Partial<CallahanEnrichment>): number {
  return calcEnhancedAlgebrikFit(cu.intentScore, mergedRecordFromCuAndPatch(cu, override));
}
