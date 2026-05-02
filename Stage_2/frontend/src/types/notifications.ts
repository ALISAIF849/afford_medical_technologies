/**
 * Notification Types and Interfaces
 * 
 * Defines the shape of notifications, API responses, and related data structures.
 * All notifications have an ID, type, message, and timestamp.
 */

/**
 * A single notification from the API
 */
export interface Notification {
  ID: string;                                    // Unique identifier
  Type: 'Event' | 'Result' | 'Placement';      // What kind of notification this is
  Message: string;                              // The actual message content
  Timestamp: string;                            // When it was created
  viewed?: boolean;                             // Whether user has read it
  priorityScore?: number;                       // Calculated importance score
}

/**
 * API response structure when fetching notifications
 */
export interface NotificationResponse {
  notifications: Notification[];
}

/**
 * Options for filtering and pagination when fetching notifications
 */
export interface FilterOptions {
  type?: 'Event' | 'Result' | 'Placement' | 'All';  // Filter by type
  viewStatus?: 'all' | 'unread';                    // Show all or unread only
  limit?: number;                                   // How many to fetch
  page?: number;                                    // Page for pagination
}

/**
 * A notification with its calculated priority score
 * Used for ranking and sorting notifications
 */
export interface PriorityScore {
  notification: Notification;   // The actual notification
  score: number;               // Combined priority score (0-100)
  typeWeight: number;          // Type importance (30% of score)
  recencyScore: number;        // Freshness factor (70% of score)
}
