#!/usr/bin/env node
/**
 * Deals Seeding Script
 * Seeds deal data from JSON into Strapi
 */

const fs = require('fs');
const path = require('path');
const axios = require('axios');

// Load environment variables from .env.local or .env
// Try .env.local first (takes precedence), then .env
const dotenv = require('dotenv');
const envLocalPath = path.resolve(process.cwd(), '.env.local');
const envPath = path.resolve(process.cwd(), '.env');

// Load .env.local if it exists
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
}

// Load .env if it exists (will not override .env.local values)
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath, override: false });
}

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

  const options = {
    clear: args.includes('--clear'),
    dryRun: args.includes('--dry-run'),
    file: args.find(arg => arg.endsWith('.json')) || 'dummy-deals-data.json',
  };

  return options;
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
async function clearExistingEntries(dryRun) {
  try {
    console.log(`${colors.yellow}Fetching existing deal entries...${colors.reset}`);
    
    // Fetch all deals with pagination
    let allDeals = [];
    let page = 1;
    let hasMore = true;
    
    while (hasMore) {
      const response = await strapiClient.get(`/deals?pagination[page]=${page}&pagination[pageSize]=100`);
      const deals = response.data.data || [];
      allDeals = allDeals.concat(deals);
      
      const pagination = response.data.meta?.pagination;
      hasMore = pagination && page < pagination.pageCount;
      page++;
    }
    
    if (allDeals.length === 0) {
      console.log(`${colors.gray}No existing deal entries found.${colors.reset}`);
      return 0;
    }

    console.log(`${colors.yellow}Found ${allDeals.length} existing deal entries${colors.reset}`);

    if (dryRun) {
      console.log(`${colors.cyan}[DRY RUN] Would delete ${allDeals.length} deal entries${colors.reset}`);
      return allDeals.length;
    }

    let deleted = 0;
    for (const entry of allDeals) {
      try {
        await strapiClient.delete(`/deals/${entry.id}`);
        deleted++;
        process.stdout.write(`\r${colors.gray}Deleting... ${deleted}/${allDeals.length}${colors.reset}`);
      } catch (error) {
        console.error(`\n${colors.red}Failed to delete deal entry ${entry.id}:${colors.reset}`, error.message);
      }
    }

    console.log(`\n${colors.green}✓ Deleted ${deleted} deal entries${colors.reset}`);
    return deleted;
  } catch (error) {
    console.error(`${colors.red}Error clearing deal entries:${colors.reset}`, error.message);
    if (error.response) {
      console.error(`${colors.red}Response:${colors.reset}`, JSON.stringify(error.response.data, null, 2));
    }
    throw error;
  }
}

/**
 * Seed deal data
 */
async function seedDealData(data, dryRun) {
  let success = 0;
  let failed = 0;

  console.log(`${colors.blue}Starting to seed ${data.length} deal entries...${colors.reset}\n`);

  for (let i = 0; i < data.length; i++) {
    const deal = data[i];
    const displayName = deal.company || `Deal ${i + 1}`;
    
    try {
      if (dryRun) {
        console.log(`${colors.cyan}[DRY RUN] Would create:${colors.reset} ${displayName} (${deal.state})`);
        success++;
      } else {
        // Prepare the deal data for Strapi
        // Field names in Strapi are capitalized (Company, State, Stages, Amount, Created)
        const dealData = {
          Company: deal.company,
          State: deal.state,
          Stages: deal.stages,
          Amount: deal.amount,
          Created: deal.created,
        };

        await strapiClient.post('/deals', { data: dealData });
        console.log(`${colors.green}✓${colors.reset} [${i + 1}/${data.length}] ${displayName} (${deal.state})`);
        success++;
      }
    } catch (error) {
      console.error(`${colors.red}✗${colors.reset} [${i + 1}/${data.length}] ${displayName}`);
      if (error.response) {
        const status = error.response.status;
        const statusText = error.response.statusText;
        const responseData = error.response.data;
        
        if (responseData?.error) {
          const errorMsg = responseData.error.message || JSON.stringify(responseData.error);
          console.error(`  ${colors.red}Error (${status} ${statusText}):${colors.reset}`, errorMsg);
          
          // Show full error details for first failure to help debug
          if (i === 0 && responseData.error.details) {
            console.error(`  ${colors.yellow}Details:${colors.reset}`, JSON.stringify(responseData.error.details, null, 2));
          }
        } else if (responseData) {
          console.error(`  ${colors.red}Error (${status} ${statusText}):${colors.reset}`, JSON.stringify(responseData, null, 2));
        } else {
          console.error(`  ${colors.red}Error (${status} ${statusText}):${colors.reset}`, error.message);
        }
      } else {
        console.error(`  ${colors.red}Error:${colors.reset}`, error.message);
      }
      failed++;
    }

    // Add small delay to avoid rate limiting
    if (!dryRun && i < data.length - 1) {
      await sleep(200);
    }
  }

  return { success, failed };
}

/**
 * Main function
 */
async function main() {
  console.log(`\n${colors.cyan}═══════════════════════════════════════════${colors.reset}`);
  console.log(`${colors.cyan}     Deal Seeding Script${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════${colors.reset}\n`);

  const options = parseArgs();

  console.log(`${colors.gray}JSON File:${colors.reset}    ${options.file}`);
  console.log(`${colors.gray}Strapi URL:${colors.reset}   ${STRAPI_URL}`);
  console.log(`${colors.gray}API Token:${colors.reset}    ${STRAPI_TOKEN ? STRAPI_TOKEN.substring(0, 20) + '...' : colors.red + 'NOT SET' + colors.reset}`);
  console.log(`${colors.gray}Clear First:${colors.reset}  ${options.clear ? 'Yes' : 'No'}`);
  console.log(`${colors.gray}Dry Run:${colors.reset}      ${options.dryRun ? 'Yes' : 'No'}`);
  console.log('');
  
  if (!STRAPI_TOKEN) {
    console.error(`${colors.red}Error: NEXT_PUBLIC_STRAPI_API_TOKEN is not set!${colors.reset}`);
    console.error(`${colors.yellow}Please set it in your .env.local or .env file${colors.reset}`);
    console.error(`${colors.yellow}Current working directory: ${process.cwd()}${colors.reset}`);
    console.error(`${colors.yellow}Looking for:${colors.reset}`);
    console.error(`  - ${envLocalPath} ${fs.existsSync(envLocalPath) ? colors.green + '✓' + colors.reset : colors.red + '✗' + colors.reset}`);
    console.error(`  - ${envPath} ${fs.existsSync(envPath) ? colors.green + '✓' + colors.reset : colors.red + '✗' + colors.reset}`);
    
    // Show what env vars are available
    console.error(`\n${colors.yellow}Available NEXT_PUBLIC_* env vars:${colors.reset}`);
    Object.keys(process.env)
      .filter(key => key.startsWith('NEXT_PUBLIC_'))
      .forEach(key => {
        console.error(`  ${key}: ${process.env[key] ? process.env[key].substring(0, 20) + '...' : 'undefined'}`);
      });
    
    process.exit(1);
  }

  // Load data
  const data = loadJsonData(options.file);
  console.log(`${colors.green}✓ Loaded ${data.length} deal entries from JSON${colors.reset}\n`);

  // Clear if requested
  if (options.clear) {
    await clearExistingEntries(options.dryRun);
    console.log('');
  }

  // Seed data
  const result = await seedDealData(data, options.dryRun);

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
  if (error.response) {
    console.error(`${colors.red}Response:${colors.reset}`, JSON.stringify(error.response.data, null, 2));
  }
  process.exit(1);
});
