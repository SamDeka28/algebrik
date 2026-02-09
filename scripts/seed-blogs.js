#!/usr/bin/env node
/**
 * Blog Seeding Script
 * Seeds blog data from JSON into Strapi
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
    file: args.find(arg => arg.endsWith('.json')) || 'scripts/seed-data/blogs.json',
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
    console.log(`${colors.yellow}Fetching existing blog entries...${colors.reset}`);
    const response = await strapiClient.get(`/blogs?pagination[pageSize]=1000`);
    const existing = response.data.data;
    
    if (existing.length === 0) {
      console.log(`${colors.gray}No existing blog entries found.${colors.reset}`);
      return 0;
    }

    console.log(`${colors.yellow}Found ${existing.length} existing blog entries${colors.reset}`);

    if (dryRun) {
      console.log(`${colors.cyan}[DRY RUN] Would delete ${existing.length} blog entries${colors.reset}`);
      return existing.length;
    }

    let deleted = 0;
    for (const entry of existing) {
      try {
        await strapiClient.delete(`/blogs/${entry.id}`);
        deleted++;
        process.stdout.write(`\r${colors.gray}Deleting... ${deleted}/${existing.length}${colors.reset}`);
      } catch (error) {
        console.error(`\n${colors.red}Failed to delete blog entry ${entry.id}:${colors.reset}`, error.message);
      }
    }

    console.log(`\n${colors.green}✓ Deleted ${deleted} blog entries${colors.reset}`);
    return deleted;
  } catch (error) {
    console.error(`${colors.red}Error clearing blog entries:${colors.reset}`, error.message);
    throw error;
  }
}

/**
 * Seed blog data
 */
async function seedBlogData(data, dryRun) {
  let success = 0;
  let failed = 0;

  console.log(`${colors.blue}Starting to seed ${data.length} blog entries...${colors.reset}\n`);

  for (let i = 0; i < data.length; i++) {
    const blog = data[i];
    const displayTitle = blog.title || `Blog ${i + 1}`;
    
    try {
      if (dryRun) {
        console.log(`${colors.cyan}[DRY RUN] Would create:${colors.reset} ${displayTitle}`);
        success++;
      } else {
        // Prepare the blog data for Strapi
        const blogData = {
          title: blog.title,
          slug: blog.slug,
          excerpt: blog.excerpt,
          content: blog.content,
          author: blog.author,
          publishedDate: blog.publishedDate,
          readTime: blog.readTime,
          publication: blog.publication,
          featured: blog.featured || false,
          status: blog.status || 'published',
          featuredImage: blog.featuredImage,
          authorImage: blog.authorImage,
          seoTitle: blog.seoTitle,
          seoDescription: blog.seoDescription,
        };

        await strapiClient.post('/blogs', { data: blogData });
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
  console.log(`${colors.cyan}     Blog Seeding Script${colors.reset}`);
  console.log(`${colors.cyan}═══════════════════════════════════════════${colors.reset}\n`);

  const options = parseArgs();

  console.log(`${colors.gray}JSON File:${colors.reset}    ${options.file}`);
  console.log(`${colors.gray}Strapi URL:${colors.reset}   ${STRAPI_URL}`);
  console.log(`${colors.gray}Clear First:${colors.reset}  ${options.clear ? 'Yes' : 'No'}`);
  console.log(`${colors.gray}Dry Run:${colors.reset}      ${options.dryRun ? 'Yes' : 'No'}`);
  console.log('');

  // Load data
  const data = loadJsonData(options.file);
  console.log(`${colors.green}✓ Loaded ${data.length} blog entries from JSON${colors.reset}\n`);

  // Clear if requested
  if (options.clear) {
    await clearExistingEntries(options.dryRun);
    console.log('');
  }

  // Seed data
  const result = await seedBlogData(data, options.dryRun);

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
