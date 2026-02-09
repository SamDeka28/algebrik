/**
 * TypeScript types for Strapi API responses
 */

// Base Strapi response structure
export interface StrapiResponse<T> {
  data: T;
  meta?: StrapiMeta;
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta?: StrapiMeta;
}

export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

// Strapi entity structure (v5 format)
export interface StrapiEntity<T> {
  id: number;
  documentId: string;
  attributes: T & {
    createdAt: string;
    updatedAt: string;
    publishedAt?: string;
  };
}

// Media/Upload file type (Strapi v5 format)
export interface StrapiMedia {
  id: number;
  documentId: string;
  name: string;
  alternativeText?: string | null;
  caption?: string | null;
  width: number;
  height: number;
  formats?: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  } | null;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: string | null;
  provider: string;
  provider_metadata?: any | null;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  sizeInBytes: number;
  path?: string | null;
  url: string;
}

// Query parameters for Strapi requests
export interface StrapiQueryParams {
  populate?: string | string[] | Record<string, any>;
  fields?: string[];
  filters?: Record<string, any>;
  sort?: string | string[];
  pagination?: {
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  publicationState?: 'live' | 'preview';
  locale?: string;
}

// Error response
export interface StrapiError {
  status: number;
  name: string;
  message: string;
  details?: Record<string, any>;
}

export interface StrapiErrorResponse {
  error: StrapiError;
}

