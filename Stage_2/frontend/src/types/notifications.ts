// Type definitions for Notifications

export interface Notification {
  ID: string;
  Type: 'Event' | 'Result' | 'Placement';
  Message: string;
  Timestamp: string;
  viewed?: boolean;
  priorityScore?: number;
}

export interface NotificationResponse {
  notifications: Notification[];
}

export interface FilterOptions {
  type?: 'Event' | 'Result' | 'Placement' | 'All';
  viewStatus?: 'all' | 'unread';
  limit?: number;
  page?: number;
}

export interface PriorityScore {
  notification: Notification;
  score: number;
  typeWeight: number;
  recencyScore: number;
}
