# Quick Start - Strapi Seeding

## 🚀 Run It Now

```bash
# Test with dry run first
npm run seed:news -- --dry-run

# Seed the news articles
npm run seed:news

# Clear and re-seed
npm run seed:clear
```

## 📝 Custom Content Type

```bash
# Create your JSON file in scripts/seed-data/
# Then run:
node scripts/seed.js <content-type> scripts/seed-data/<your-file>.json

# Example for insights:
node scripts/seed.js insights scripts/seed-data/insights.json
```

## ⚠️ Before You Start

1. Make sure Strapi is running
2. Check your `.env.local` has:
   ```env
   NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
   NEXT_PUBLIC_STRAPI_API_TOKEN=your-token-here
   ```
3. The content type must exist in Strapi first!

## 🎯 Common Commands

```bash
# Dry run (preview only)
node scripts/seed.js news-articles scripts/seed-data/news-articles.json --dry-run

# Clear and seed
node scripts/seed.js news-articles scripts/seed-data/news-articles.json --clear

# Seed multiple types
node scripts/seed.js news-articles scripts/seed-data/news-articles.json
node scripts/seed.js insights scripts/seed-data/insights.json
node scripts/seed.js tools scripts/seed-data/tools.json
```

## 🐛 Troubleshooting

**Can't connect?**
- Is Strapi running? Check `http://localhost:1337`
- Is the URL in `.env.local` correct?

**Unauthorized?**
- Check your API token in `.env.local`
- Generate a new token: Strapi Admin → Settings → API Tokens

**Content type not found?**
- Create it in Strapi admin first
- Check the content type name matches exactly

That's it! 🎉

