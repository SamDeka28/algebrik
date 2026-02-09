#!/usr/bin/env ts-node
/**
 * Strapi Seeding Script
 * 
 * Usage:
 *   npx ts-node scripts/seed.ts <content-type> <json-file>
 * 
 * Examples:
 *   npx ts-node scripts/seed.ts news-articles scripts/seed-data/news-articles.json
 *   npx ts-node scripts/seed.ts insights scripts/seed-data/insights.json --clear
 * 
 * Options:
 *   --clear    Delete all existing entries before seeding
 *   --dry-run  Show what would be created without actually creating
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { StrapiAPI } from '../lib/strapi';

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

interface SeedOptions {
  clear: boolean;
  dryRun: boolean;
}

/**
 * Parse command line arguments
 */
function parseArgs(): { contentType: string; jsonFile: string; options: SeedOptions } {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error(`${colors.red}Error: Missing required arguments${colors.reset}`);
    console.log('\nUsage: npx ts-node scripts/seed.ts <content-type> <json-file> [options]');
    console.log('\nOptions:');
    console.log('  --clear    Delete all existing entries before seeding');
    console.log('  --dry-run  Show what would be created without actually creating');
    console.log('\nExamples:');
    console.log('  npx ts-node scripts/seed.ts news-articles scripts/seed-data/news-articles.json');
    console.log('  npx ts-node scripts/seed.ts insights scripts/seed-data/insights.json --clear');
    process.exit(1);
  }

  const [contentType, jsonFile] = args;
  const options: SeedOptions = {
    clear: args.includes('--clear'),
    dryRun: args.includes('--dry-run'),
  };

  return { contentType, jsonFile, options };
}

/**
 * Load JSON data from file
 */
function loadJsonData(filePath: string): any[] {
  try {
    const absolutePath = resolve(process.cwd(), filePath);
    const fileContent = readFileSync(absolutePath, 'utf-8');
    const data = JSON.parse(fileContent);

    if (!Array.isArray(data)) {
      throw new Error('JSON file must contain an array of objects');
    }

    return data;
  } catch (error: any) {
    console.error(`${colors.red}Error loading JSON file:${colors.reset}`, error.message);
    process.exit(1);
  }
}

/**
 * Clear all existing entries
 */
async function clearExistingEntries(contentType: string, dryRun: boolean): Promise<number> {
  try {
    console.log(`${colors.yellow}Fetching existing entries...${colors.reset}`);
    const existing = await StrapiAPI.find(contentType, { pagination: { pageSize: 1000 } });
    
    if (existing.length === 0) {
      console.log(`${colors.gray}No existing entries found.${colors.reset}`);
      return 0;
    }

    console.log(`${colors.yellow}Found ${existing.length} existing entries${colors.reset}`);

    if (dryRun) {
      console.log(`${colors.cyan}[DRY RUN] Would delete ${existing.length} entries${colors.reset}`);
      return existing.length;
    }

    let deleted = 0;
    for (const entry of existing) {
      try {
        await StrapiAPI.delete(contentType, entry.id);
        deleted++;
        process.stdout.write(`\r${colors.gray}Deleting... ${deleted}/${existing.length}${colors.reset}`);
      } catch (error: any) {
        console.error(`\n${colors.red}Failed to delete entry ${entry.id}:${colors.reset}`, error.message);
      }
    }

    console.log(`\n${colors.green}✓ Deleted ${deleted} entries${colors.reset}`);
    return deleted;
  } catch (error: any) {
    console.error(`${colors.red}Error clearing entries:${colors.reset}`, error.message);
    throw error;
  }
}

/**
 * Seed data to Strapi
 */
async function seedData(
  contentType: string,
  data: any[],
  dryRun: boolean
): Promise<{ success: number; failed: number }> {
  let success = 0;
  let failed = 0;

  console.log(`${colors.blue}Starting to seed ${data.length} entries...${colors.reset}\n`);

  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const displayTitle = item.title || item.name || `Item ${i + 1}`;
    
    try {
      if (dryRun) {
        console.log(`${colors.cyan}[DRY RUN] Would create:${colors.reset} ${displayTitle}`);
        success++;
      } else {
        await StrapiAPI.create(contentType, item);
        console.log(`${colors.green}✓${colors.reset} [${i + 1}/${data.length}] ${displayTitle}`);
        success++;
      }
    } catch (error: any) {
      console.error(`${colors.red}✗${colors.reset} [${i + 1}/${data.length}] ${displayTitle}`);
      console.error(`  ${colors.red}Error:${colors.reset}`, error.response?.data?.error?.message || error.message);
      failed++;
    }

    // Add small delay to avoid rate limiting
    if (!dryRun && i < data.length - 1) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
  }

  return { success, failed };
}

/**
 * Main function
 */
async function main() {
  console.log(`\n${colors.cyan}═══════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}     Strapi Seeding Script${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════${colors.reset}\n`);

  const { contentType, jsonFile, options } = parseArgs();

  console.log(`${colors.gray}Content Type:${colors.reset} ${contentType}`);
  console.log(`${colors.gray}JSON File:${colors.reset}    ${jsonFile}`);
  console.log(`${colors.gray}Clear First:${colors.reset}  ${options.clear ? 'Yes' : 'No'}`);
  console.log(`${colors.gray}Dry Run:${colors.reset}      ${options.dryRun ? 'Yes' : 'No'}`);
  console.log('');

  // Load data
  const data = loadJsonData(jsonFile);
  console.log(`${colors.green}✓ Loaded ${data.length} items from JSON${colors.reset}\n`);

  // Clear existing entries if requested
  if (options.clear) {
    await clearExistingEntries(contentType, options.dryRun);
    console.log('');
  }

  // Seed data
  const result = await seedData(contentType, data, options.dryRun);

  // Print summary
  console.log(`\n${colors.cyan}═══════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}     Summary${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.green}Successful:${colors.reset} ${result.success}`);
  console.log(`${colors.red}Failed:${colors.reset}     ${result.failed}`);
  console.log(`${colors.gray}Total:${colors.reset}      ${result.success + result.failed}`);
  
  if (options.dryRun) {
    console.log(`\n${colors.yellow}This was a dry run. No data was actually created.${colors.reset}`);
  }

  console.log('');

  // Exit with appropriate code
  process.exit(result.failed > 0 ? 1 : 0);
}

// Run the script
main().catch((error) => {
  console.error(`\n${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});

