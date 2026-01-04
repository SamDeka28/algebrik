# News Articles Seeding Guide

## 📝 What Changed

### 1. **Reversed Order in JSON**
The `news-articles.json` file has been **reversed** so that:
- **Index 0** = **Newest article** (OTTOMOTO® Partners with Algebrik AI...)
- **Last index** = **Oldest article** (Algebrik AI Partners with Scienaptic AI...)

This matches chronological order with newest first.

### 2. **Images Reference Strapi IDs**
Instead of using file paths, the JSON now references the **actual Strapi media IDs**:
- `"image": 14` → References the already-uploaded `b.webp` image
- `"image": 20` → References the already-uploaded `prnewswire.jpg` image
- etc.

### 3. **Image Mapping**
| Strapi ID | Image File | Used By |
|-----------|------------|---------|
| 14 | b.webp | BusinessWire articles (most common) |
| 15 | t.webp | Yahoo Finance (Jesse Frugé article) |
| 16 | ya.webp | Yahoo Finance articles |
| 17 | p.webp | Pulse 2.0 article |
| 18 | ff.webp | Fintech Futures article |
| 19 | teamalgebrik.webp | Team Algebrik articles |
| 20 | prnewswire.jpg | PR Newswire articles |
| 21 | creditunion | Credit Union Connection article |

### 4. **Sorting in Frontend**
Updated BlogCarousel.tsx to sort by `createdAt:desc`:
```typescript
const news = await StrapiAPI.find("news-articles", {
  populate: "*",
  sort: ["createdAt:desc"]
});
```

### 5. **Field Mapping**
Based on your Strapi structure, the JSON now uses:
- `source`: Can be `null` for many entries
- `description`: Can be `null` for many entries
- `image`: **Strapi media ID** (integer) that references already-uploaded images

## 🚀 How to Seed

### Step 1: Verify Images Exist in Strapi
Go to Strapi Media Library and confirm these IDs exist:
- ID 14 (b.webp)
- ID 15 (t.webp)
- ID 16 (ya.webp)
- ID 17 (p.webp)
- ID 18 (ff.webp)
- ID 19 (teamalgebrik.webp)
- ID 20 (prnewswire.jpg)
- ID 21 (creditunion image)

### Step 2: Delete Existing Entries in Strapi
Go to Strapi admin panel and delete all news-articles entries.

### Step 3: Run the Seed Script
```bash
npm run seed:news
```

Or with clearing:
```bash
npm run seed:clear
```

## 📋 Data Order (Newest to Oldest)

1. OTTOMOTO® Partners with Algebrik AI (Latest) - Image ID: 14
2. Algebrik AI Partners with Auto Exam - Image ID: 14
3. Algebrik AI Announces Visionary Advisory Board - Image ID: 14
4. Algebrik AI: $4 Million (Series A) Raised - Image ID: 17
5. Algebrik AI Strengthens Founding Leadership - Image ID: 14
6. Algebrik AI Expands Founding Leadership Team - Image ID: 15
7. Algebrik AI Secures $4M in Series A - Image ID: 14
8. Scienaptic AI co-founder steps down - Image ID: 18
9. Algebrik AI and Plaid Join Forces - Image ID: 14
10. Algebrik AI and Corelation Announce Integration - Image ID: 14
11. Algebrik AI Partners with Carleton - Image ID: 14
12. Algebrik AI and Conductiv Elevate Lending - Image ID: 19
13. Algebrik AI Joins the Jack Henry™ Vendor - Image ID: 14
14. Algebrik AI Partners with Equifax® - Image ID: 19
15. Algebrik AI Partners with TruStage™ - Image ID: 16
16. Algebrik AI and Kinective Partner - Image ID: 16
17. United Financial Credit Union Selects - Image ID: 20
18. Algebrik AI and Open Lending Partner - Image ID: 20
19. Family Financial Credit Union Chooses - Image ID: 20
20. Algebrik AI Partners with Spinwheel - Image ID: 20
21. Algebrik AI and Housetable Announce - Image ID: 21
22. Algebrik AI Partners with Scienaptic AI (Oldest) - Image ID: 16

## 🎯 Expected Behavior

When you seed and fetch from Strapi:
- Strapi will return entries sorted by `createdAt:desc`
- The frontend will display the newest article first
- The featured news card (top of page) will show the newest article
- The grid below will show all articles in chronological order (newest first)
- **All images will automatically load from Strapi's media library**

## 🔍 Verification

After seeding, check:
1. ✅ Strapi admin shows 22 news articles
2. ✅ Frontend displays OTTOMOTO® article as the featured article
3. ✅ Grid shows articles in chronological order (newest first)
4. ✅ All images are loading correctly from Strapi media library
5. ✅ All links are working
6. ✅ Image field shows the correct media reference in Strapi admin

## 📊 Fields Used

Required fields:
- `title` ✅
- `author` ✅
- `link` ✅
- `image` ✅ (now uses Strapi media ID)
- `role` ✅

Optional fields:
- `source` (can be null)
- `description` (can be null)

## 🐛 Troubleshooting

**Images not showing?**
- Verify the media IDs match your Strapi media library
- Check that images with IDs 14-21 exist in Strapi
- Run this in Strapi console to verify: `strapi.query('plugin::upload.file').findMany()`

**Wrong image IDs?**
- If your Strapi has different image IDs, update `image-mapping.json`
- Then update the image field in `news-articles.json` with correct IDs
- You can find IDs in Strapi Media Library or from the API response

**Wrong order?**
- Verify `sort: ["createdAt:desc"]` is set in the fetch query
- Check that seed script created entries in correct order

**Missing data?**
- Some entries have `null` for source/description - this is normal
- The frontend handles these gracefully

## 📝 Notes

- Images are referenced by their **Strapi media ID** (integer), not file paths
- The same image can be used by multiple articles (e.g., ID 14 for BusinessWire)
- The `createdAt` timestamp from Strapi determines the display order
- External images (like Credit Union Connection) are uploaded to Strapi as ID 21
- The seed script will create relations to existing media automatically

## 🔧 If Image IDs Don't Match

If your Strapi has different image IDs:

1. Check current IDs in Strapi:
   ```bash
   # In Strapi admin, go to Media Library
   # Note the ID of each image
   ```

2. Update `scripts/image-mapping.json` with your IDs

3. Update `news-articles.json` with correct IDs

4. Re-run the seed script
