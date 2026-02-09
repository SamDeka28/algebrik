# Strapi v5 Changes

This utilities library is built for **Strapi v5**. Here are the key differences from v4:

## Key Changes in Strapi v5

### 1. Document ID Field
All entities now include a `documentId` field in addition to `id`:

```typescript
{
  id: 1,
  documentId: "gd100wbisz3vsu1hkgvv4sbx", // New in v5
  attributes: {
    // ...
  }
}
```

### 2. Media Structure (IMPORTANT!)
**Media objects are now flat** - they are NOT wrapped in an `attributes` object anymore:

#### Strapi v4 (Old):
```typescript
{
  id: 1,
  attributes: {
    name: "image.jpg",
    url: "/uploads/image.jpg",
    width: 1920,
    height: 1080,
    formats: { /* ... */ }
  }
}
```

#### Strapi v5 (New):
```typescript
{
  id: 12,
  documentId: "gd100wbisz3vsu1hkgvv4sbx",
  name: "healthcheck.webp",
  url: "/uploads/healthcheck_3fb4d618d5.webp",
  width: 296,
  height: 296,
  formats: {
    thumbnail: {
      name: "thumbnail_healthcheck.webp",
      url: "/uploads/thumbnail_healthcheck_3fb4d618d5.webp",
      // ...
    }
  },
  publishedAt: "2025-10-18T10:30:09.356Z",
  provider_metadata: null
}
```

### 3. Image Format Changes
Image formats now include `sizeInBytes` field:

```typescript
{
  thumbnail: {
    name: "thumbnail_image.jpg",
    size: 2.09,         // Size in KB
    sizeInBytes: 2086,  // New in v5
    url: "/uploads/thumbnail_image.jpg"
  }
}
```

### 4. Provider Metadata
The field is now `provider_metadata` (with underscore) instead of `providerMetadata`:

```typescript
{
  provider_metadata: null // or object with provider-specific data
}
```

## Migration Guide

If you're migrating from Strapi v4 utilities:

### Update Media Handling

**Before (v4):**
```typescript
const imageUrl = media?.attributes?.url;
const formats = media?.attributes?.formats;
```

**After (v5):**
```typescript
const imageUrl = media?.url;
const formats = media?.formats;
```

### Update Type Definitions

**Before (v4):**
```typescript
interface BlogAttributes {
  coverImage?: {
    data: {
      id: number;
      attributes: {
        url: string;
        // ...
      };
    };
  };
}
```

**After (v5):**
```typescript
import { StrapiMedia } from '@/lib/strapi';

interface BlogAttributes {
  coverImage?: StrapiMedia; // Flat structure, no .data.attributes
}
```

### Using Media URLs

The utility functions handle both formats:

```typescript
import { getStrapiMediaUrl, getStrapiMediaFormats } from '@/lib/strapi';

// Works with Strapi v5 media object
const url = getStrapiMediaUrl(blog.coverImage);

// Get all format URLs
const formats = getStrapiMediaFormats(blog.coverImage);
console.log(formats);
// {
//   original: 'http://localhost:1337/uploads/image.jpg',
//   large: 'http://localhost:1337/uploads/large_image.jpg',
//   medium: 'http://localhost:1337/uploads/medium_image.jpg',
//   small: 'http://localhost:1337/uploads/small_image.jpg',
//   thumbnail: 'http://localhost:1337/uploads/thumbnail_image.jpg'
// }
```

## Compatibility Notes

- These utilities are designed specifically for **Strapi v5**
- For Strapi v4, you would need to modify the `StrapiMedia` type to nest properties under `attributes`
- The API endpoints structure (`/api/*`) remains the same between v4 and v5
- Query parameters and filters work the same way

## Testing Your Integration

Test that media URLs are working correctly:

```typescript
import { getStrapiMediaUrl } from '@/lib/strapi';

// Should handle all these cases:
const url1 = getStrapiMediaUrl('/uploads/image.jpg'); // Relative path
const url2 = getStrapiMediaUrl('http://cdn.example.com/image.jpg'); // Full URL
const url3 = getStrapiMediaUrl(mediaObject); // StrapiMedia object
const url4 = getStrapiMediaUrl(null); // Returns empty string
```

## Resources

- [Strapi v5 Documentation](https://docs.strapi.io/)
- [Strapi v5 Migration Guide](https://docs.strapi.io/dev-docs/migration/v4-to-v5/introduction)
- [Strapi v5 REST API](https://docs.strapi.io/dev-docs/api/rest)

