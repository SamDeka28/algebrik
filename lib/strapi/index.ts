/**
 * Strapi Utilities - Main Export File
 * 
 * Usage examples:
 * 
 * 1. Basic API calls:
 *    import { StrapiAPI } from '@/lib/strapi';
 *    const blogs = await StrapiAPI.find('blogs', { populate: '*' });
 * 
 * 2. Create custom service:
 *    import { createStrapiService } from '@/lib/strapi';
 *    const blogService = createStrapiService<Blog>('blogs');
 *    const blogs = await blogService.find({ populate: '*' });
 * 
 * 3. Use utilities:
 *    import { getStrapiMediaUrl, flattenStrapiEntity } from '@/lib/strapi';
 */

// Export main API
export { StrapiAPI, createStrapiService } from './api';

// Export client
export { strapiClient, default as client } from './client';

// Export config
export { strapiConfig, default as config } from './config';

// Export types
export type {
  StrapiResponse,
  StrapiCollectionResponse,
  StrapiEntity,
  StrapiMedia,
  StrapiImageFormat,
  StrapiQueryParams,
  StrapiError,
  StrapiErrorResponse,
  StrapiMeta,
} from './types';

// Export utilities
export {
  buildQueryString,
  getStrapiMediaUrl,
  getStrapiMediaFormats,
  extractStrapiData,
  flattenStrapiEntity,
  flattenStrapiResponse,
} from './utils';

