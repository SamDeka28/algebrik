/**
 * Strapi Configuration
 * Central configuration for Strapi API connection
 * Compatible with Strapi v5
 */

export const strapiConfig = {
  // Base URL for Strapi API - defaults to localhost if not set
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
  
  // API prefix (usually '/api' for Strapi v4+)
  apiPrefix: '/api',
  
  // Authentication token (if using private APIs)
  apiToken: process.env.NEXT_PUBLIC_STRAPI_API_TOKEN || '',
  
  // Request timeout in milliseconds
  timeout: 10000,
  
  // Enable/disable request logging
  enableLogging: process.env.NODE_ENV === 'development',
} as const;

export default strapiConfig;

