/** Base path for exported Signal Radar routes on the marketing site */
export const SIGNAL_RADAR_BASE = '/signal-radar';

/** Static dataset produced by `npm run generate:signal-radar` */
export const CREDIT_UNIONS_JSON = `${SIGNAL_RADAR_BASE}/credit-unions.json`;

const OVERRIDE_STORAGE_KEY = 'algebrik-signal-radar-tech-overrides';

export type StoredTechOverride = {
  coreProcessor?: string | null;
  consumerLOS?: string | null;
  mobileApp?: string | null;
  eSignProvider?: string | null;
  onlineBanking?: string | null;
};

export function readStoredOverrides(): Record<string, StoredTechOverride> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(OVERRIDE_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, StoredTechOverride>;
    return typeof parsed === 'object' && parsed !== null ? parsed : {};
  } catch {
    return {};
  }
}

export function writeStoredOverride(cuId: string, patch: StoredTechOverride) {
  if (typeof window === 'undefined') return;
  const all = readStoredOverrides();
  all[cuId] = { ...all[cuId], ...patch };
  localStorage.setItem(OVERRIDE_STORAGE_KEY, JSON.stringify(all));
}

export function deleteStoredOverride(cuId: string) {
  if (typeof window === 'undefined') return;
  const all = readStoredOverrides();
  delete all[cuId];
  localStorage.setItem(OVERRIDE_STORAGE_KEY, JSON.stringify(all));
}
