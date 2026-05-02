/**
 * Notifications API Service
 * Handles fetching notifications from the backend API
 * Includes error handling and graceful fallbacks
 */

import axios from 'axios';
import { NotificationResponse, FilterOptions } from '../types/notifications';

// Get API endpoint from environment, fallback to campus API server
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || 'http://20.207.122.201/evaluation-service';

// Create axios instance with sensible defaults
const api = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 10000, // 10 second timeout for API calls
  headers: {
    'Content-Type': 'application/json',
  },
});

// Log outgoing API requests (with emoji for easy spotting in console)
api.interceptors.request.use((config) => {
  console.log('🔄 API Request:', config.url);
  return config;
});

// Handle API responses and errors gracefully
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
 * Falls back to empty array if API is unavailable
 * 
 * @param options - Filter and pagination options (limit, page, type)
 * @returns Promise with notifications array (may be empty on error)
 */
export async function fetchNotifications(
  options?: FilterOptions
): Promise<NotificationResponse> {
  try {
    const params = new URLSearchParams();

    // Add optional query parameters if provided
    if (options?.limit) {
      params.append('limit', options.limit.toString());
    }

    if (options?.page) {
      params.append('page', options.page.toString());
    }

    // Filter by notification type if specified (skip if "All")
    if (options?.type && options.type !== 'All') {
      params.append('notification_type', options.type);
    }

    const url = '/notifications' + (params.toString() ? '?' + params.toString() : '');
    console.log('📡 Fetching from:', API_ENDPOINT + url);
    
    const response = await api.get(url);
    
    // Ensure response has the expected structure
    if (!response.data || !Array.isArray(response.data.notifications)) {
      console.warn('⚠️ Unexpected API response format:', response.data);
      return { notifications: [] };
    }
    
    return response.data;
  } catch (error) {
    // If API fails, return empty array (frontend will show demo data instead)
    console.error('❌ Failed to fetch notifications:', error);
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
