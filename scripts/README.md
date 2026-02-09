# Strapi Seeding Scripts

Scripts to seed data from JSON files into your Strapi CMS.

## 📁 Structure

```
scripts/
├── seed.js          # JavaScript version (recommended)
├── seed.ts          # TypeScript version
├── seed-data/       # JSON data files
│   └── news-articles.json
└── README.md        # This file
```

## 🚀 Quick Start

### 1. Prepare Your Environment

Make sure your `.env.local` file has the Strapi configuration:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=your-api-token-here
```

### 2. Run the Seed Script

**Using JavaScript (Recommended):**
```bash
node scripts/seed.js news-articles scripts/seed-data/news-articles.json
```

**Using TypeScript:**
```bash
npx ts-node scripts/seed.ts news-articles scripts/seed-data/news-articles.json
```

## 📖 Usage

### Basic Command

```bash
node scripts/seed.js <content-type> <json-file> [options]
```

### Options

- `--clear` - Delete all existing entries before seeding
- `--dry-run` - Preview what would be created without actually creating

### Examples

**Seed news articles:**
```bash
node scripts/seed.js news-articles scripts/seed-data/news-articles.json
```

**Clear and re-seed:**
```bash
node scripts/seed.js news-articles scripts/seed-data/news-articles.json --clear
```

**Dry run (preview only):**
```bash
node scripts/seed.js news-articles scripts/seed-data/news-articles.json --dry-run
```

**Clear and seed with dry run:**
```bash
node scripts/seed.js news-articles scripts/seed-data/news-articles.json --clear --dry-run
```

## 📝 Creating JSON Data Files

Create a JSON file with an array of objects. Each object represents one entry:

```json
[
  {
    "title": "Article Title",
    "author": "Author Name",
    "description": "Article description...",
    "link": "https://example.com/article",
    "image": "/path/to/image.jpg"
  },
  {
    "title": "Another Article",
    "author": "Another Author",
    "description": "Another description...",
    "link": "https://example.com/article2",
    "image": "/path/to/image2.jpg"
  }
]
```

Save your JSON file in `scripts/seed-data/` directory.

## 🎯 Seeding Different Content Types

You can seed any Strapi content type. Just make sure:

1. The content type exists in Strapi
2. The JSON structure matches your Strapi content type fields
3. You have proper permissions (API token with write access)

### Example: Seed Insights

**1. Create `scripts/seed-data/insights.json`:**
```json
[
  {
    "title": "Insight Title",
    "link": "https://youtube.com/watch?v=...",
    "description": "Insight description"
  }
]
```

**2. Run the seed:**
```bash
node scripts/seed.js insights scripts/seed-data/insights.json
```

### Example: Seed Tools

**1. Create `scripts/seed-data/tools.json`:**
```json
[
  {
    "title": "Tool Name",
    "description": "Tool description",
    "buttonText": "Try Now",
    "buttonLink": "https://example.com"
  }
]
```

**2. Run the seed:**
```bash
node scripts/seed.js tools scripts/seed-data/tools.json
```

## 🔍 Troubleshooting

### Error: Cannot connect to Strapi

**Problem:** Script can't connect to Strapi server.

**Solution:**
- Make sure Strapi is running
- Check `NEXT_PUBLIC_STRAPI_URL` in `.env.local`
- Verify the URL is correct (usually `http://localhost:1337`)

### Error: Unauthorized

**Problem:** API token is missing or invalid.

**Solution:**
- Check `NEXT_PUBLIC_STRAPI_API_TOKEN` in `.env.local`
- Make sure the token has proper permissions
- Generate a new API token in Strapi admin panel:
  - Settings → API Tokens → Create new API Token
  - Select type: "Full access" or "Custom" with create/read/update/delete permissions

### Error: Content type not found

**Problem:** The content type doesn't exist in Strapi.

**Solution:**
- Verify the content type name (it should match the API ID in Strapi)
- Create the content type in Strapi admin panel first
- Check for typos in the content type name

### Error: Field validation failed

**Problem:** JSON data doesn't match Strapi content type structure.

**Solution:**
- Review your Strapi content type structure
- Make sure JSON fields match Strapi field names
- Check required fields are present in JSON
- Verify field types match (string, number, boolean, etc.)

## 🔧 Advanced Usage

### Seeding with Media Files

For local images, use paths relative to your `public` folder:
```json
{
  "image": "/section_images/blog/image.jpg"
}
```

For external images, use full URLs:
```json
{
  "image": "https://example.com/image.jpg"
}
```

### Batch Seeding Multiple Content Types

Create a bash script to seed multiple types:

```bash
#!/bin/bash
node scripts/seed.js news-articles scripts/seed-data/news-articles.json
node scripts/seed.js insights scripts/seed-data/insights.json
node scripts/seed.js tools scripts/seed-data/tools.json
echo "All content seeded!"
```

### Custom Rate Limiting

Edit the sleep time in the script to adjust rate limiting:

```javascript
// In seed.js, change this line:
await sleep(100); // 100ms between requests

// To something like:
await sleep(500); // 500ms (slower, safer)
```

## 📊 Output Example

```
═══════════════════════════════════════════
     Strapi Seeding Script
═══════════════════════════════════════════

Content Type: news-articles
JSON File:    scripts/seed-data/news-articles.json
Strapi URL:   http://localhost:1337
Clear First:  No
Dry Run:      No

✓ Loaded 22 items from JSON

Starting to seed 22 entries...

✓ [1/22] Algebrik AI Partners with Scienaptic AI...
✓ [2/22] Algebrik AI and Housetable Announce...
✓ [3/22] Algebrik AI Partners with Spinwheel...
...

═══════════════════════════════════════════
     Summary
═══════════════════════════════════════════
Successful: 22
Failed:     0
Total:      22
```

## 🎨 Tips

1. **Always test with `--dry-run` first** to preview changes
2. **Use `--clear` carefully** - it deletes all existing data!
3. **Keep JSON files version controlled** for reproducible seeds
4. **Create separate JSON files** for different environments (dev, staging, prod)
5. **Use descriptive file names** like `news-articles-2025.json`

## 📚 Resources

- [Strapi API Documentation](https://docs.strapi.io/dev-docs/api/rest)
- [Creating API Tokens in Strapi](https://docs.strapi.io/user-docs/settings/API-tokens)

