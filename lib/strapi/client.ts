/**
 * Axios client with interceptors for Strapi API
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosError } from 'axios';
import strapiConfig from './config';

/**
 * Create and configure axios instance for Strapi
 */
const createStrapiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: `${strapiConfig.baseURL}${strapiConfig.apiPrefix}`,
    timeout: strapiConfig.timeout,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      // Add authorization token if available
      if (strapiConfig.apiToken) {
        config.headers.Authorization = `Bearer ${strapiConfig.apiToken}`;
      }

      // Log requests in development
      if (strapiConfig.enableLogging) {
        console.log(`[Strapi Request] ${config.method?.toUpperCase()} ${config.url}`, {
          params: config.params,
          data: config.data,
        });
      }

      return config;
    },
    (error) => {
      if (strapiConfig.enableLogging) {
        console.error('[Strapi Request Error]', error);
      }
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response) => {
      // Log responses in development
      if (strapiConfig.enableLogging) {
        console.log(`[Strapi Response] ${response.config.url}`, {
          status: response.status,
          data: response.data,
        });
      }

      return response;
    },
    (error: AxiosError) => {
      // Handle errors
      if (strapiConfig.enableLogging) {
        console.error('[Strapi Response Error]', {
          url: error.config?.url,
          status: error.response?.status,
          message: error.message,
          data: error.response?.data,
        });
      }

      // You can add custom error handling here
      // For example, redirect to login on 401, show toast notifications, etc.
      if (error.response?.status === 401) {
        console.error('Unauthorized access - check your API token');
      }

      if (error.response?.status === 404) {
        console.error('Resource not found');
      }

      if (error.response?.status === 500) {
        console.error('Server error - please try again later');
      }

      return Promise.reject(error);
    }
  );

  return client;
};

// Export singleton instance
export const strapiClient = createStrapiClient();

export default strapiClient;

