#!/usr/bin/env node
/**
 * Strapi Seeding Script (JavaScript version)
 * 
 * Usage:
 *   node scripts/seed.js <content-type> <json-file>
 * 
 * Examples:
 *   node scripts/seed.js news-articles scripts/seed-data/news-articles.json
 *   node scripts/seed.js insights scripts/seed-data/insights.json --clear
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Color codes
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m',
};

// Configuration
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337';
const STRAPI_TOKEN = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || '';
console.log(STRAPI_TOKEN);
const API_PREFIX = '/api';

// Create axios instance
const strapiClient = axios.create({
  baseURL: `${STRAPI_URL}${API_PREFIX}`,
  headers: {
    'Content-Type': 'application/json',
    ...(STRAPI_TOKEN && { Authorization: `Bearer ${STRAPI_TOKEN}` }),
  },
});

/**
 * Parse command line arguments
 */
function parseArgs() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error(`${colors.red}Error: Missing required arguments${colors.reset}`);
    console.log('\nUsage: node scripts/seed.js <content-type> <json-file> [options]');
    console.log('\nOptions:');
    console.log('  --clear    Delete all existing entries before seeding');
    console.log('  --dry-run  Show what would be created without actually creating');
    console.log('\nExamples:');
    console.log('  node scripts/seed.js news-articles scripts/seed-data/news-articles.json');
    console.log('  node scripts/seed.js insights scripts/seed-data/insights.json --clear');
    process.exit(1);
  }

  const [contentType, jsonFile] = args;
  const options = {
    clear: args.includes('--clear'),
    dryRun: args.includes('--dry-run'),
  };

  return { contentType, jsonFile, options };
}

/**
 * Load JSON data
 */
function loadJsonData(filePath) {
  try {
    const absolutePath = path.resolve(process.cwd(), filePath);
    const fileContent = fs.readFileSync(absolutePath, 'utf-8');
    const data = JSON.parse(fileContent);

    if (!Array.isArray(data)) {
      throw new Error('JSON file must contain an array of objects');
    }

    return data;
  } catch (error) {
    console.error(`${colors.red}Error loading JSON file:${colors.reset}`, error.message);
    process.exit(1);
  }
}

/**
 * Sleep helper
 */
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Clear existing entries
 */
async function clearExistingEntries(contentType, dryRun) {
  try {
    console.log(`${colors.yellow}Fetching existing entries...${colors.reset}`);
    const response = await strapiClient.get(`/${contentType}?pagination[pageSize]=1000`);
    const existing = response.data.data;
    
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
        await strapiClient.delete(`/${contentType}/${entry.id}`);
        deleted++;
        process.stdout.write(`\r${colors.gray}Deleting... ${deleted}/${existing.length}${colors.reset}`);
      } catch (error) {
        console.error(`\n${colors.red}Failed to delete entry ${entry.id}:${colors.reset}`, error.message);
      }
    }

    console.log(`\n${colors.green}✓ Deleted ${deleted} entries${colors.reset}`);
    return deleted;
  } catch (error) {
    console.error(`${colors.red}Error clearing entries:${colors.reset}`, error.message);
    throw error;
  }
}

/**
 * Seed data
 */
async function seedData(contentType, data, dryRun) {
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
        await strapiClient.post(`/${contentType}`, { data: item });
        console.log(`${colors.green}✓${colors.reset} [${i + 1}/${data.length}] ${displayTitle}`);
        success++;
      }
    } catch (error) {
      console.error(`${colors.red}✗${colors.reset} [${i + 1}/${data.length}] ${displayTitle}`);
      console.error(`  ${colors.red}Error:${colors.reset}`, error.response?.data?.error?.message || error.message);
      failed++;
    }

    // Add small delay
    if (!dryRun && i < data.length - 1) {
      await sleep(100);
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
  console.log(`${colors.gray}Strapi URL:${colors.reset}   ${STRAPI_URL}`);
  console.log(`${colors.gray}Clear First:${colors.reset}  ${options.clear ? 'Yes' : 'No'}`);
  console.log(`${colors.gray}Dry Run:${colors.reset}      ${options.dryRun ? 'Yes' : 'No'}`);
  console.log('');

  // Load data
  const data = loadJsonData(jsonFile);
  console.log(`${colors.green}✓ Loaded ${data.length} items from JSON${colors.reset}\n`);

  // Clear if requested
  if (options.clear) {
    await clearExistingEntries(contentType, options.dryRun);
    console.log('');
  }

  // Seed data
  const result = await seedData(contentType, data, options.dryRun);

  // Summary
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
  process.exit(result.failed > 0 ? 1 : 0);
}

// Run
main().catch((error) => {
  console.error(`\n${colors.red}Fatal error:${colors.reset}`, error);
  process.exit(1);
});

