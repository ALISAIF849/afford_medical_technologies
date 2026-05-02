import { Notification, PriorityScore } from '../types/notifications';

/**
 * Custom hook for managing notifications
 * TODO: Implement your notification fetching and state management logic
 */

// Type weights for priority calculation
export const TYPE_WEIGHTS: Record<string, number> = {
  Placement: 100,
  Result: 66,
  Event: 33,
};

/**
 * Calculate priority score for a notification
 * Priority = (Type Weight × 30%) + (Recency Score × 70%)
 * 
 * @param notification - The notification to score
 * @param currentTime - Current time for recency calculation
 * @returns Priority score (0-100)
 */
export function calculatePriorityScore(
  notification: Notification,
  currentTime: Date = new Date()
): number {
  // Get type weight
  const typeWeight = TYPE_WEIGHTS[notification.Type] || 0;
  const typeScore = (typeWeight / 100) * 30;

  // Calculate recency score (newer = higher)
  const notificationTime = new Date(notification.Timestamp);
  const ageInMinutes = (currentTime.getTime() - notificationTime.getTime()) / (1000 * 60);
  const maxAgeInMinutes = 24 * 60; // 24 hours
  const recencyScore = Math.max(0, 70 - (ageInMinutes / maxAgeInMinutes) * 70);

  return typeScore + recencyScore;
}

/**
 * Sort notifications by priority score
 * @param notifications - Array of notifications
 * @returns Sorted array with priority scores
 */
export function sortByPriority(notifications: Notification[]): PriorityScore[] {
  const scored = notifications.map((notification) => ({
    notification,
    score: calculatePriorityScore(notification),
    typeWeight: TYPE_WEIGHTS[notification.Type] || 0,
    recencyScore: 0,
  }));

  return scored.sort((a, b) => b.score - a.score);
}

/**
 * Get top N notifications
 * @param notifications - Array of notifications
 * @param limit - Number of top notifications to return (default: 10)
 * @returns Top N notifications sorted by priority
 */
export function getTopNotifications(notifications: Notification[], limit: number = 10) {
  const sorted = sortByPriority(notifications);
  return sorted.slice(0, limit);
}

/**
 * Filter notifications by type
 * @param notifications - Array of notifications
 * @param type - Type to filter by
 * @returns Filtered notifications
 */
export function filterByType(notifications: Notification[], type: string) {
  if (type === 'All') return notifications;
  return notifications.filter((n) => n.Type === type);
}

/**
 * Filter unread notifications
 * @param notifications - Array of notifications
 * @returns Only unread notifications
 */
export function getUnreadNotifications(notifications: Notification[]) {
  return notifications.filter((n) => !n.viewed);
}
