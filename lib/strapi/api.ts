/**
 * Strapi API methods
 * Generic CRUD operations for Strapi content types
 */

import { strapiClient } from './client';
import { buildQueryString, extractStrapiData } from './utils';
import type {
  StrapiResponse,
  StrapiCollectionResponse,
  StrapiEntity,
  StrapiQueryParams,
} from './types';

/**
 * Generic Strapi API class
 */
export class StrapiAPI {
  /**
   * Get a collection of entries from a content type
   */
  static async find<T>(
    contentType: string,
    params?: StrapiQueryParams
  ): Promise<StrapiEntity<T>[]> {
    try {
      const queryString = params ? buildQueryString(params) : '';
      const url = `/${contentType}${queryString ? `?${queryString}` : ''}`;
      
      const response = await strapiClient.get<StrapiCollectionResponse<StrapiEntity<T>>>(url);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching ${contentType}:`, error);
      throw error;
    }
  }

  /**
   * Get a single entry by ID
   */
  static async findOne<T>(
    contentType: string,
    id: number | string,
    params?: StrapiQueryParams
  ): Promise<StrapiEntity<T>> {
    try {
      const queryString = params ? buildQueryString(params) : '';
      const url = `/${contentType}/${id}${queryString ? `?${queryString}` : ''}`;
      
      const response = await strapiClient.get<StrapiResponse<StrapiEntity<T>>>(url);
      return response.data.data;
    } catch (error) {
      console.error(`Error fetching ${contentType} with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create a new entry
   */
  static async create<T>(
    contentType: string,
    data: Partial<T>
  ): Promise<StrapiEntity<T>> {
    try {
      const response = await strapiClient.post<StrapiResponse<StrapiEntity<T>>>(
        `/${contentType}`,
        { data }
      );
      return response.data.data;
    } catch (error) {
      console.error(`Error creating ${contentType}:`, error);
      throw error;
    }
  }

  /**
   * Update an existing entry
   */
  static async update<T>(
    contentType: string,
    id: number | string,
    data: Partial<T>
  ): Promise<StrapiEntity<T>> {
    try {
      const response = await strapiClient.put<StrapiResponse<StrapiEntity<T>>>(
        `/${contentType}/${id}`,
        { data }
      );
      return response.data.data;
    } catch (error) {
      console.error(`Error updating ${contentType} with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Delete an entry
   */
  static async delete<T>(
    contentType: string,
    id: number | string
  ): Promise<StrapiEntity<T>> {
    try {
      const response = await strapiClient.delete<StrapiResponse<StrapiEntity<T>>>(
        `/${contentType}/${id}`
      );
      return response.data.data;
    } catch (error) {
      console.error(`Error deleting ${contentType} with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Get entries count
   */
  static async count(
    contentType: string,
    params?: Pick<StrapiQueryParams, 'filters'>
  ): Promise<number> {
    try {
      const queryString = params ? buildQueryString(params) : '';
      const url = `/${contentType}/count${queryString ? `?${queryString}` : ''}`;
      
      const response = await strapiClient.get<number>(url);
      return response.data;
    } catch (error) {
      console.error(`Error counting ${contentType}:`, error);
      throw error;
    }
  }
}

/**
 * Create a custom API service for a specific content type
 */
export const createStrapiService = <T>(contentType: string) => {
  return {
    find: (params?: StrapiQueryParams) => StrapiAPI.find<T>(contentType, params),
    findOne: (id: number | string, params?: StrapiQueryParams) =>
      StrapiAPI.findOne<T>(contentType, id, params),
    create: (data: Partial<T>) => StrapiAPI.create<T>(contentType, data),
    update: (id: number | string, data: Partial<T>) =>
      StrapiAPI.update<T>(contentType, id, data),
    delete: (id: number | string) => StrapiAPI.delete<T>(contentType, id),
    count: (params?: Pick<StrapiQueryParams, 'filters'>) =>
      StrapiAPI.count(contentType, params),
  };
};

export default StrapiAPI;

