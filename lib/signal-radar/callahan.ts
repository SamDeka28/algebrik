/**
 * Callahan index loader (Node / build script only — uses fs).
 */

import fs from 'fs';
import path from 'path';
import callahanRaw from '@/data/signal-radar/callahan.json';
import type { CallahanRecord } from './callahanCore';

export type { CallahanRecord, LOSStatus } from './callahanCore';
export {
  classifyLOS,
  coreCompatibilityScore,
  buildCallahanSignals,
  calcEnhancedAlgebrikFit,
} from './callahanCore';

const callahanIndex = callahanRaw as Record<string, CallahanRecord>;

const CUSTOM_CALLAHAN_FILE = path.join(process.cwd(), '.custom-data', 'callahan-custom.json');
let _customCallahanIndex: Record<string, CallahanRecord> | null = null;
let _customCallahanLoaded = false;

function loadCustomCallahan(): Record<string, CallahanRecord> | null {
  if (_customCallahanLoaded) return _customCallahanIndex;
  _customCallahanLoaded = true;
  try {
    if (fs.existsSync(CUSTOM_CALLAHAN_FILE)) {
      const raw = JSON.parse(fs.readFileSync(CUSTOM_CALLAHAN_FILE, 'utf8')) as Record<string, CallahanRecord>;
      if (typeof raw === 'object' && raw !== null && Object.keys(raw).length > 0) {
        _customCallahanIndex = raw;
        console.log(`[Callahan] Loaded custom data: ${Object.keys(raw).length} records`);
        return raw;
      }
    }
  } catch { /* ignore */ }
  return null;
}

export function invalidateCallahanCache() {
  _customCallahanIndex = null;
  _customCallahanLoaded = false;
}

export function getCallahanRecord(charterNumber: string): CallahanRecord | null {
  const custom = loadCustomCallahan();
  if (custom && charterNumber in custom) return custom[charterNumber];
  return callahanIndex[charterNumber] ?? null;
}

export function getCallahanStats(): { total: number; custom: number; bundled: number } {
  const custom = loadCustomCallahan();
  const bundled = Object.keys(callahanIndex).length;
  const customCount = custom ? Object.keys(custom).length : 0;
  return { total: bundled + customCount, custom: customCount, bundled };
}
