/**
 * Strapi v5 Usage Examples
 * Copy and modify these examples for your use cases
 */

import { StrapiAPI, createStrapiService, type StrapiEntity, type StrapiMedia } from './index';

// ============================================================================
// EXAMPLE 1: Define your content types
// ============================================================================

interface BlogAttributes {
  title: string;
  content: string;
  slug: string;
  excerpt?: string;
  publishedAt: string;
  author?: {
    data: StrapiEntity<AuthorAttributes>;
  };
  coverImage?: StrapiMedia; // In Strapi v5, media is not wrapped in .data
  tags?: {
    data: StrapiEntity<TagAttributes>[];
  };
}

interface AuthorAttributes {
  name: string;
  email: string;
  bio?: string;
  avatar?: StrapiMedia; // In Strapi v5, media is not wrapped in .data
}

interface TagAttributes {
  name: string;
  slug: string;
}

// ============================================================================
// EXAMPLE 2: Create typed services
// ============================================================================

export const blogService = createStrapiService<BlogAttributes>('blogs');
export const authorService = createStrapiService<AuthorAttributes>('authors');
export const tagService = createStrapiService<TagAttributes>('tags');

// ============================================================================
// EXAMPLE 3: Fetch all blogs with pagination
// ============================================================================

export async function getAllBlogs(page = 1, pageSize = 10) {
  try {
    const blogs = await blogService.find({
      populate: ['author', 'coverImage', 'tags'],
      sort: ['publishedAt:desc'],
      pagination: {
        page,
        pageSize,
      },
    });

    return blogs;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

// ============================================================================
// EXAMPLE 4: Fetch a single blog by slug
// ============================================================================

export async function getBlogBySlug(slug: string) {
  try {
    const blogs = await blogService.find({
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: {
        author: {
          populate: ['avatar'],
        },
        coverImage: true,
        tags: true,
      },
    });

    return blogs[0] || null;
  } catch (error) {
    console.error(`Error fetching blog with slug ${slug}:`, error);
    return null;
  }
}

// ============================================================================
// EXAMPLE 5: Search blogs
// ============================================================================

export async function searchBlogs(query: string) {
  try {
    const blogs = await blogService.find({
      filters: {
        $or: [
          {
            title: {
              $containsi: query, // case-insensitive
            },
          },
          {
            excerpt: {
              $containsi: query,
            },
          },
        ],
      },
      populate: ['author', 'coverImage'],
      sort: ['publishedAt:desc'],
    });

    return blogs;
  } catch (error) {
    console.error('Error searching blogs:', error);
    return [];
  }
}

// ============================================================================
// EXAMPLE 6: Get blogs by tag
// ============================================================================

export async function getBlogsByTag(tagSlug: string) {
  try {
    const blogs = await blogService.find({
      filters: {
        tags: {
          slug: {
            $eq: tagSlug,
          },
        },
      },
      populate: ['author', 'coverImage', 'tags'],
      sort: ['publishedAt:desc'],
    });

    return blogs;
  } catch (error) {
    console.error(`Error fetching blogs for tag ${tagSlug}:`, error);
    return [];
  }
}

// ============================================================================
// EXAMPLE 7: Get recent blogs
// ============================================================================

export async function getRecentBlogs(limit = 5) {
  try {
    const blogs = await blogService.find({
      populate: ['coverImage'],
      sort: ['publishedAt:desc'],
      pagination: {
        pageSize: limit,
      },
    });

    return blogs;
  } catch (error) {
    console.error('Error fetching recent blogs:', error);
    return [];
  }
}

// ============================================================================
// EXAMPLE 8: Get blogs by author
// ============================================================================

export async function getBlogsByAuthor(authorId: number) {
  try {
    const blogs = await blogService.find({
      filters: {
        author: {
          id: {
            $eq: authorId,
          },
        },
      },
      populate: ['coverImage', 'tags'],
      sort: ['publishedAt:desc'],
    });

    return blogs;
  } catch (error) {
    console.error(`Error fetching blogs for author ${authorId}:`, error);
    return [];
  }
}

// ============================================================================
// EXAMPLE 9: Get blog statistics
// ============================================================================

export async function getBlogStats() {
  try {
    const totalBlogs = await blogService.count();
    const publishedBlogs = await blogService.count({
      filters: {
        publishedAt: {
          $notNull: true,
        },
      },
    });

    return {
      total: totalBlogs,
      published: publishedBlogs,
      draft: totalBlogs - publishedBlogs,
    };
  } catch (error) {
    console.error('Error fetching blog stats:', error);
    return { total: 0, published: 0, draft: 0 };
  }
}

// ============================================================================
// EXAMPLE 10: Using direct StrapiAPI (without service)
// ============================================================================

export async function getCustomContent() {
  try {
    // Fetch any content type
    const data = await StrapiAPI.find('custom-content-type', {
      populate: '*',
    });

    return data;
  } catch (error) {
    console.error('Error fetching custom content:', error);
    return [];
  }
}

// ============================================================================
// EXAMPLE 11: Create a new blog (requires authentication)
// ============================================================================

export async function createBlog(blogData: Partial<BlogAttributes>) {
  try {
    const newBlog = await blogService.create(blogData);
    return newBlog;
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
}

// ============================================================================
// EXAMPLE 12: Update a blog
// ============================================================================

export async function updateBlog(id: number, updates: Partial<BlogAttributes>) {
  try {
    const updatedBlog = await blogService.update(id, updates);
    return updatedBlog;
  } catch (error) {
    console.error(`Error updating blog ${id}:`, error);
    throw error;
  }
}

// ============================================================================
// EXAMPLE 13: Delete a blog
// ============================================================================

export async function deleteBlog(id: number) {
  try {
    await blogService.delete(id);
    return true;
  } catch (error) {
    console.error(`Error deleting blog ${id}:`, error);
    return false;
  }
}

// ============================================================================
// EXAMPLE 14: Get blogs with date range filter
// ============================================================================

export async function getBlogsInDateRange(startDate: string, endDate: string) {
  try {
    const blogs = await blogService.find({
      filters: {
        publishedAt: {
          $gte: startDate,
          $lte: endDate,
        },
      },
      populate: ['author', 'coverImage'],
      sort: ['publishedAt:desc'],
    });

    return blogs;
  } catch (error) {
    console.error('Error fetching blogs in date range:', error);
    return [];
  }
}

// ============================================================================
// EXAMPLE 15: Get featured blogs (custom field example)
// ============================================================================

export async function getFeaturedBlogs() {
  try {
    const blogs = await blogService.find({
      filters: {
        featured: {
          $eq: true,
        },
      },
      populate: ['author', 'coverImage'],
      sort: ['publishedAt:desc'],
      pagination: {
        pageSize: 6,
      },
    });

    return blogs;
  } catch (error) {
    console.error('Error fetching featured blogs:', error);
    return [];
  }
}

