/**
 * Builds public/signal-radar/credit-unions.json for static export.
 * Run from repo root: npx tsx scripts/generate-signal-radar-data.ts
 */

import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { getAllScoredCUs } from '../lib/signal-radar/data';

async function main() {
  const { data, meta } = await getAllScoredCUs(true);
  const outDir = path.join(process.cwd(), 'public/signal-radar');
  mkdirSync(outDir, { recursive: true });
  const filePath = path.join(outDir, 'credit-unions.json');
  writeFileSync(filePath, JSON.stringify({ data, meta }), 'utf8');
  console.log(`[signal-radar] Wrote ${data.length} credit unions → ${filePath}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
