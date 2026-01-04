/**
 * Utility functions for Strapi API
 */

import { strapiConfig } from './config';
import type { StrapiQueryParams, StrapiMedia } from './types';

/**
 * Build query string from Strapi query parameters
 */
export const buildQueryString = (params: StrapiQueryParams): string => {
  const queryParams = new URLSearchParams();

  // Handle populate
  if (params.populate) {
    if (typeof params.populate === 'string') {
      queryParams.append('populate', params.populate);
    } else if (Array.isArray(params.populate)) {
      params.populate.forEach((item) => {
        queryParams.append('populate[]', item);
      });
    } else {
      // Deep populate object
      Object.entries(params.populate).forEach(([key, value]) => {
        queryParams.append(`populate[${key}]`, JSON.stringify(value));
      });
    }
  }

  // Handle fields
  if (params.fields) {
    params.fields.forEach((field) => {
      queryParams.append('fields[]', field);
    });
  }

  // Handle filters
  if (params.filters) {
    Object.entries(params.filters).forEach(([key, value]) => {
      if (typeof value === 'object' && !Array.isArray(value)) {
        Object.entries(value).forEach(([operator, operatorValue]) => {
          queryParams.append(`filters[${key}][${operator}]`, String(operatorValue));
        });
      } else {
        queryParams.append(`filters[${key}]`, String(value));
      }
    });
  }

  // Handle sort
  if (params.sort) {
    if (Array.isArray(params.sort)) {
      params.sort.forEach((sortField) => {
        queryParams.append('sort[]', sortField);
      });
    } else {
      queryParams.append('sort', params.sort);
    }
  }

  // Handle pagination
  if (params.pagination) {
    Object.entries(params.pagination).forEach(([key, value]) => {
      if (value !== undefined) {
        queryParams.append(`pagination[${key}]`, String(value));
      }
    });
  }

  // Handle publication state
  if (params.publicationState) {
    queryParams.append('publicationState', params.publicationState);
  }

  // Handle locale
  if (params.locale) {
    queryParams.append('locale', params.locale);
  }

  return queryParams.toString();
};

/**
 * Get full URL for Strapi media
 */
export const getStrapiMediaUrl = (media?: StrapiMedia | string | null): string => {
  if (!media) return '';

  // If it's a string (direct URL)
  if (typeof media === 'string') {
    return media.startsWith('http') ? media : `${strapiConfig.baseURL}${media}`;
  }

  // If it's a StrapiMedia object
  const url = media?.url;
  if (!url) return '';

  return url.startsWith('http') ? url : `${strapiConfig.baseURL}${url}`;
};

/**
 * Get formatted Strapi media with different sizes
 */
export const getStrapiMediaFormats = (media?: StrapiMedia | null) => {
  if (!media) return null;

  const { url, formats } = media;

  return {
    original: getStrapiMediaUrl(url),
    large: formats?.large ? getStrapiMediaUrl(formats.large.url) : getStrapiMediaUrl(url),
    medium: formats?.medium ? getStrapiMediaUrl(formats.medium.url) : getStrapiMediaUrl(url),
    small: formats?.small ? getStrapiMediaUrl(formats.small.url) : getStrapiMediaUrl(url),
    thumbnail: formats?.thumbnail ? getStrapiMediaUrl(formats.thumbnail.url) : getStrapiMediaUrl(url),
  };
};

/**
 * Extract data from Strapi response
 */
export const extractStrapiData = <T>(response: any): T => {
  // Handle single entity response
  if (response?.data?.data && !Array.isArray(response.data.data)) {
    return response.data.data;
  }

  // Handle collection response
  if (response?.data?.data && Array.isArray(response.data.data)) {
    return response.data.data;
  }

  // Handle direct data
  if (response?.data) {
    return response.data;
  }

  return response;
};

/**
 * Flatten Strapi entity attributes
 */
export const flattenStrapiEntity = (entity: any): any => {
  if (!entity) return entity;

  const { id, documentId, attributes } = entity;
  
  if (!attributes) return entity;

  // Recursively flatten nested relations
  const flattened: any = { id, documentId, ...attributes };

  Object.keys(flattened).forEach((key) => {
    const value = flattened[key];

    if (value?.data) {
      if (Array.isArray(value.data)) {
        flattened[key] = value.data.map(flattenStrapiEntity);
      } else {
        flattened[key] = flattenStrapiEntity(value.data);
      }
    }
  });

  return flattened;
};

/**
 * Flatten Strapi collection response
 */
export const flattenStrapiResponse = <T = any>(response: any): T[] => {
  const data = extractStrapiData(response);

  if (Array.isArray(data)) {
    return data.map(flattenStrapiEntity) as unknown as T[];
  }

  return [flattenStrapiEntity(data)] as unknown as T[];
};

