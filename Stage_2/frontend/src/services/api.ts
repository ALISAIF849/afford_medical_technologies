/**
 * API Service for Notifications
 * Handles all HTTP requests to the notifications API
 */

import axios from 'axios';
import { NotificationResponse, FilterOptions } from '../types/notifications';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT || 'http://20.207.122.201/evaluation-service';

const api = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for logging
api.interceptors.request.use((config) => {
  console.log('🔄 API Request:', config.url);
  return config;
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.data);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.message);
    if (error.response?.status === 0) {
      console.error('CORS or network error - ensure API is accessible');
    }
    throw error;
  }
);

/**
 * Fetch notifications from the API
 * @param options - Filter and pagination options
 * @returns Promise containing notifications
 */
export async function fetchNotifications(
  options?: FilterOptions
): Promise<NotificationResponse> {
  try {
    const params = new URLSearchParams();

    if (options?.limit) {
      params.append('limit', options.limit.toString());
    }

    if (options?.page) {
      params.append('page', options.page.toString());
    }

    if (options?.type && options.type !== 'All') {
      params.append('notification_type', options.type);
    }

    const url = '/notifications' + (params.toString() ? '?' + params.toString() : '');
    console.log('📡 Fetching from:', API_ENDPOINT + url);
    
    const response = await api.get(url);
    
    // Ensure response has notifications array
    if (!response.data || !Array.isArray(response.data.notifications)) {
      console.warn('⚠️ Unexpected API response format:', response.data);
      return { notifications: [] };
    }
    
    return response.data;
  } catch (error) {
    console.error('❌ Failed to fetch notifications:', error);
    // Return empty array instead of throwing
    return { notifications: [] };
  }
}

/**
 * Get a single notification by ID
 * @param id - Notification ID
 * @returns Promise containing the notification
 */
export async function getNotificationById(id: string) {
  try {
    const response = await api.get(`/notifications/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Failed to fetch notification ${id}:`, error);
    throw error;
  }
}

export default api;
