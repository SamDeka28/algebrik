# Strapi Utilities

A modular and type-safe Strapi v5 integration for Next.js with axios and interceptors.

## 📁 Structure

```
lib/strapi/
├── index.ts       # Main export file
├── config.ts      # Configuration
├── client.ts      # Axios client with interceptors
├── types.ts       # TypeScript types
├── utils.ts       # Utility functions
├── api.ts         # API methods
└── README.md      # Documentation
```

## 🚀 Setup

### 1. Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
NEXT_PUBLIC_STRAPI_API_TOKEN=your-api-token-here
```

### 2. Installation

Axios is already installed as part of the setup.

## 📖 Usage

### Basic API Calls

```typescript
import { StrapiAPI } from '@/lib/strapi';

// Fetch all entries
const blogs = await StrapiAPI.find('blogs', {
  populate: '*',
  sort: ['publishedAt:desc'],
  pagination: { pageSize: 10 }
});

// Fetch single entry
const blog = await StrapiAPI.findOne('blogs', 1, {
  populate: ['author', 'coverImage']
});

// Create entry
const newBlog = await StrapiAPI.create('blogs', {
  title: 'My New Blog',
  content: 'Blog content...'
});

// Update entry
const updatedBlog = await StrapiAPI.update('blogs', 1, {
  title: 'Updated Title'
});

// Delete entry
await StrapiAPI.delete('blogs', 1);

// Count entries
const count = await StrapiAPI.count('blogs', {
  filters: { published: true }
});
```

### Custom Service

Create a typed service for a specific content type:

```typescript
import { createStrapiService } from '@/lib/strapi';

// Define your content type
interface Blog {
  title: string;
  content: string;
  slug: string;
  publishedAt: string;
  author: {
    name: string;
    email: string;
  };
}

// Create service
const blogService = createStrapiService<Blog>('blogs');

// Use the service
const blogs = await blogService.find({
  populate: ['author'],
  filters: { slug: 'my-blog-post' }
});

const blog = await blogService.findOne(1, {
  populate: '*'
});
```

### Query Parameters

```typescript
import { StrapiQueryParams } from '@/lib/strapi';

const params: StrapiQueryParams = {
  // Populate relations
  populate: '*', // populate all
  // OR
  populate: ['author', 'comments'],
  // OR deep populate
  populate: {
    author: {
      populate: ['avatar']
    }
  },

  // Select specific fields
  fields: ['title', 'slug', 'publishedAt'],

  // Filters
  filters: {
    title: {
      $contains: 'React'
    },
    publishedAt: {
      $gte: '2024-01-01'
    }
  },

  // Sorting
  sort: ['publishedAt:desc'],
  // OR
  sort: 'title:asc',

  // Pagination
  pagination: {
    page: 1,
    pageSize: 10
  },
  // OR
  pagination: {
    start: 0,
    limit: 10
  },

  // Publication state
  publicationState: 'live', // or 'preview'

  // Locale (for i18n)
  locale: 'en'
};
```

### Media/Image Handling

```typescript
import { getStrapiMediaUrl, getStrapiMediaFormats } from '@/lib/strapi';

// Get single media URL (Strapi v5 - media is flat, no .data wrapper)
const imageUrl = getStrapiMediaUrl(blog.attributes.coverImage);

// Get all formats
const imageFormats = getStrapiMediaFormats(blog.attributes.coverImage);
console.log(imageFormats);
// {
//   original: 'http://...',
//   large: 'http://...',
//   medium: 'http://...',
//   small: 'http://...',
//   thumbnail: 'http://...'
// }

// Use in Next.js Image
<Image
  src={imageUrl}
  alt={blog.attributes.title}
  width={800}
  height={600}
/>
```

### Flatten Strapi Response

Strapi returns nested data structures. Use utilities to flatten them:

```typescript
import { flattenStrapiEntity, flattenStrapiResponse } from '@/lib/strapi';

// Original Strapi response
const response = await StrapiAPI.findOne('blogs', 1, { populate: '*' });
// {
//   id: 1,
//   attributes: {
//     title: 'My Blog',
//     author: {
//       data: {
//         id: 2,
//         attributes: { name: 'John' }
//       }
//     }
//   }
// }

// Flatten single entity
const blog = flattenStrapiEntity(response);
// {
//   id: 1,
//   title: 'My Blog',
//   author: {
//     id: 2,
//     name: 'John'
//   }
// }

// Flatten array response
const blogs = await StrapiAPI.find('blogs', { populate: '*' });
const flatBlogs = flattenStrapiResponse(blogs);
```

### Direct Client Usage

Use the axios client directly for custom requests:

```typescript
import { strapiClient } from '@/lib/strapi';

// Custom GET request
const response = await strapiClient.get('/custom-endpoint');

// Custom POST request
const data = await strapiClient.post('/custom-endpoint', {
  data: { key: 'value' }
});

// The client has interceptors configured for:
// - Authorization (automatic token injection)
// - Logging (in development)
// - Error handling
```

## 🎨 TypeScript Types

### StrapiEntity

```typescript
interface StrapiEntity<T> {
  id: number;
  attributes: T & {
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
  };
}
```

### StrapiResponse

```typescript
interface StrapiResponse<T> {
  data: T;
  meta?: StrapiMeta;
}

interface StrapiCollectionResponse<T> {
  data: T[];
  meta?: StrapiMeta;
}
```

### StrapiMedia

```typescript
interface StrapiMedia {
  id: number;
  attributes: {
    name: string;
    alternativeText?: string;
    url: string;
    formats?: {
      thumbnail?: StrapiImageFormat;
      small?: StrapiImageFormat;
      medium?: StrapiImageFormat;
      large?: StrapiImageFormat;
    };
    // ... more properties
  };
}
```

## 🔧 Advanced Usage

### Custom Interceptors

Modify `lib/strapi/client.ts` to add custom interceptors:

```typescript
// Add custom request interceptor
client.interceptors.request.use(
  (config) => {
    // Add custom headers, modify request, etc.
    config.headers['X-Custom-Header'] = 'value';
    return config;
  }
);

// Add custom response interceptor
client.interceptors.response.use(
  (response) => {
    // Transform response data
    return response;
  },
  (error) => {
    // Handle specific errors
    if (error.response?.status === 401) {
      // Redirect to login, refresh token, etc.
    }
    return Promise.reject(error);
  }
);
```

### Server-Side Rendering (SSR)

```typescript
// app/blogs/page.tsx
import { StrapiAPI } from '@/lib/strapi';

export default async function BlogsPage() {
  // Fetch data on server
  const blogs = await StrapiAPI.find('blogs', {
    populate: '*',
    sort: ['publishedAt:desc']
  });

  return (
    <div>
      {blogs.map(blog => (
        <article key={blog.id}>
          <h2>{blog.attributes.title}</h2>
          <p>{blog.attributes.excerpt}</p>
        </article>
      ))}
    </div>
  );
}
```

### Client-Side Fetching

```typescript
'use client';

import { useState, useEffect } from 'react';
import { StrapiAPI, StrapiEntity } from '@/lib/strapi';

interface Blog {
  title: string;
  content: string;
}

export default function BlogsList() {
  const [blogs, setBlogs] = useState<StrapiEntity<Blog>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await StrapiAPI.find<Blog>('blogs');
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {blogs.map(blog => (
        <div key={blog.id}>{blog.attributes.title}</div>
      ))}
    </div>
  );
}
```

## 🛡️ Error Handling

The client automatically handles errors with interceptors. Errors are logged in development mode.

```typescript
try {
  const blog = await StrapiAPI.findOne('blogs', 999);
} catch (error) {
  if (axios.isAxiosError(error)) {
    console.error('Status:', error.response?.status);
    console.error('Data:', error.response?.data);
  }
}
```

## 📝 Filter Operators

Strapi supports various filter operators:

```typescript
filters: {
  // Exact match
  title: 'My Blog',
  
  // Operators
  views: { $gt: 100 },           // greater than
  views: { $gte: 100 },          // greater than or equal
  views: { $lt: 1000 },          // less than
  views: { $lte: 1000 },         // less than or equal
  
  title: { $contains: 'React' }, // contains
  slug: { $startsWith: 'how' },  // starts with
  slug: { $endsWith: 'guide' },  // ends with
  
  // Arrays
  tags: { $in: ['react', 'next'] },
  
  // Dates
  publishedAt: { $gte: '2024-01-01' },
  
  // Logical operators
  $or: [
    { title: { $contains: 'React' } },
    { title: { $contains: 'Next' } }
  ]
}
```

## 🎯 Best Practices

1. **Create Services**: Create typed services for each content type
2. **Use Types**: Define TypeScript interfaces for your content types
3. **Error Handling**: Always wrap API calls in try-catch blocks
4. **Populate Wisely**: Only populate relations you need
5. **Pagination**: Use pagination for large datasets
6. **Cache**: Consider caching responses for better performance
7. **Environment Variables**: Never commit API tokens

## 🔗 Resources

- [Strapi Documentation](https://docs.strapi.io/)
- [Strapi REST API](https://docs.strapi.io/dev-docs/api/rest)
- [Axios Documentation](https://axios-http.com/)

