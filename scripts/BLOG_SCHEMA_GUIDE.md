# Blog Schema and Seeding Guide

## 📋 Strapi Content Type Schema

### Collection: `blogs`

**Display Name**: Blog  
**API ID**: `blog`  
**Draft & Publish**: Enabled

### Fields:

| Field | Type | Required | Max Length | Description |
|-------|------|----------|------------|-------------|
| `title` | String | ✅ | 255 | Blog post title |
| `slug` | UID | ✅ | - | URL-friendly identifier (targets title) |
| `excerpt` | Text | ❌ | 500 | Short description/summary |
| `content` | RichText | ✅ | - | Main blog content |
| `featuredImage` | Media | ✅ | - | Main blog image (single) |
| `author` | String | ✅ | 100 | Author name |
| `authorImage` | Media | ❌ | - | Author profile image |
| `publishedDate` | Date | ✅ | - | Publication date |
| `readTime` | String | ❌ | 20 | Estimated reading time |
| `publication` | String | ❌ | 100 | Publication name (e.g., "The Startup") |
| `tags` | Relation | ❌ | - | Many-to-many with tags |
| `category` | Relation | ❌ | - | Many-to-one with categories |
| `seoTitle` | String | ❌ | 60 | SEO title |
| `seoDescription` | Text | ❌ | 160 | SEO description |
| `featured` | Boolean | ❌ | - | Featured blog (default: false) |
| `status` | Enum | ❌ | - | draft/published/archived (default: draft) |

## 🚀 How to Create the Schema in Strapi

### Method 1: Using Strapi Admin Panel

1. **Go to Content-Type Builder**
   - Navigate to Strapi Admin → Content-Type Builder

2. **Create New Collection Type**
   - Click "Create new collection type"
   - Name: `Blog`
   - API ID: `blog`
   - Enable "Draft & Publish"

3. **Add Fields** (in order):
   ```
   title (Text) - Required, Max length: 255
   slug (Text) - Required, Target field: title
   excerpt (Text) - Max length: 500
   content (Rich text) - Required
   featuredImage (Media) - Required, Single, Images only
   author (Text) - Required, Max length: 100
   authorImage (Media) - Single, Images only
   publishedDate (Date) - Required
   readTime (Text) - Max length: 20
   publication (Text) - Max length: 100
   featured (Boolean) - Default: false
   status (Enumeration) - Values: draft, published, archived, Default: draft
   seoTitle (Text) - Max length: 60
   seoDescription (Text) - Max length: 160
   ```

4. **Save and Restart**
   - Click "Save" and restart Strapi

### Method 2: Using Schema File

1. **Copy the schema file**:
   ```bash
   cp scripts/strapi-blog-schema.json src/api/blog/content-types/blog/schema.json
   ```

2. **Restart Strapi**

## 📝 Blog Data Structure

The JSON file contains blog entries with the following structure:

```json
{
  "title": "Blog Post Title",
  "slug": "url-friendly-slug",
  "excerpt": "Short description...",
  "content": "Full blog content in markdown...",
  "author": "Author Name",
  "publishedDate": "2025-10-15",
  "readTime": "5 min read",
  "featuredImage": 22,
  "featured": true,
  "status": "published"
}
```

## 🎯 Image Mapping

The blog images reference existing Strapi media IDs:

| Image Path | Strapi ID | Description |
|------------|-----------|-------------|
| `/section_images/oct15-1.webp` | 22 | When the Game Changes |
| `/section_images/oct15-2.webp` | 23 | Piggy Banks to Product Hooks |
| `/section_images/pankajblog.webp` | 24 | From Pixels to People |
| `/section_images/callahan.webp` | 25 | Credit Union Lessons |
| `/section_images/genz.png` | 26 | Digital Onboarding |

## 🚀 Seeding Commands

### Basic Seeding
```bash
npm run seed:blogs
```

### Clear and Re-seed
```bash
npm run seed:blogs:clear
```

### Dry Run (Preview)
```bash
node scripts/seed-blogs.js --dry-run
```

### Custom File
```bash
node scripts/seed-blogs.js scripts/seed-data/custom-blogs.json
```

## 📊 Sample Blog Data

The seed file includes 5 sample blogs:

1. **"When the Game Changes"** - Featured blog about community lending
2. **"From Piggy Banks to Product Hooks"** - Featured blog about credit union strategy  
3. **"From Pixels to People"** - Company reflection blog
4. **"Members Want Yield, Loans, and Love"** - Trend analysis blog
5. **"Mastering Digital Onboarding"** - Gen Z banking blog

## 🔧 Troubleshooting

### Schema Issues
- **Field not found**: Check field names match exactly
- **Validation errors**: Verify required fields and max lengths
- **Media errors**: Ensure image IDs exist in Strapi media library

### Seeding Issues
- **Connection errors**: Check Strapi URL and API token
- **Permission errors**: Verify API token has create/update permissions
- **Image errors**: Confirm media IDs exist in Strapi

### Content Issues
- **Rich text not rendering**: Check markdown formatting
- **Images not loading**: Verify media relations are correct
- **Slugs not working**: Check UID field configuration

## 📚 Next Steps

1. **Create the schema** in Strapi admin
2. **Upload images** to Strapi media library
3. **Update image IDs** in the JSON file if needed
4. **Run the seed script**
5. **Test the API** endpoints
6. **Update frontend** to use Strapi data

## 🎨 Frontend Integration

After seeding, update your frontend to fetch from Strapi:

```typescript
// Fetch blogs from Strapi
const blogs = await StrapiAPI.find('blogs', {
  populate: ['featuredImage', 'authorImage'],
  sort: ['publishedDate:desc'],
  filters: { status: 'published' }
});
```

The blog data will be available at `/api/blogs` with full content, images, and metadata! 🎉
