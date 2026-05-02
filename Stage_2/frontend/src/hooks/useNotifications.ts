import { Notification, PriorityScore } from '../types/notifications';

/**
 * Notification Utilities
 * Helper functions for calculating priority, filtering, and sorting notifications
 * The priority algorithm balances type (what it is) with recency (how fresh it is)
 */

// How important each notification type is (out of 100)
// Placements are most important, Results are medium, Events are lowest
export const TYPE_WEIGHTS: Record<string, number> = {
  Placement: 100, // High priority: hiring, internships, career opportunities
  Result: 66,     // Medium priority: grades, assessments, evaluations
  Event: 33,      // Lower priority: workshops, announcements, general events
};

/**
 * Calculate how important a notification is (0-100 scale)
 * 
 * Scoring formula: 30% type weight + 70% recency
 * This means fresh notifications matter, but important types bubble up
 * 
 * Example: A 1-hour-old Placement scores higher than a 12-hour-old Event,
 * even though the Event is more recent
 * 
 * @param notification - The notification to score
 * @param currentTime - Current time (defaults to now)
 * @returns Score from 0-100
 */
export function calculatePriorityScore(
  notification: Notification,
  currentTime: Date = new Date()
): number {
  // Step 1: Get type score (contributes 30% of final score)
  const typeWeight = TYPE_WEIGHTS[notification.Type] || 0;
  const typeScore = (typeWeight / 100) * 30;

  // Step 2: Get recency score (contributes 70% of final score)
  // Newer notifications get higher scores, older ones decay to 0 over 24 hours
  const notificationTime = new Date(notification.Timestamp);
  const ageInMinutes = (currentTime.getTime() - notificationTime.getTime()) / (1000 * 60);
  const maxAgeInMinutes = 24 * 60; // 24-hour window
  const recencyScore = Math.max(0, 70 - (ageInMinutes / maxAgeInMinutes) * 70);

  // Step 3: Combine the two scores
  return typeScore + recencyScore;
}

/**
 * Sort notifications highest-priority first
 * Returns scored notifications so you can see both the ranking and the scores
 * 
 * @param notifications - Array of notifications to rank
 * @returns Sorted array with priority scores included
 */
export function sortByPriority(notifications: Notification[]): PriorityScore[] {
  const scored = notifications.map((notification) => ({
    notification,
    score: calculatePriorityScore(notification),
    typeWeight: TYPE_WEIGHTS[notification.Type] || 0,
    recencyScore: 0,
  }));

  // Sort descending: highest score first
  return scored.sort((a, b) => b.score - a.score);
}

/**
 * Get the top N most important notifications
 * Useful for showing a "top 10" preview or summary section
 * 
 * @param notifications - Array of notifications
 * @param limit - How many to return (default: 10)
 * @returns Top N notifications ranked by priority
 */
export function getTopNotifications(notifications: Notification[], limit: number = 10) {
  const sorted = sortByPriority(notifications);
  return sorted.slice(0, limit);
}

/**
 * Filter notifications by type
 * Show only Placements, Results, or Events (or all of them)
 * 
 * @param notifications - Array to filter
 * @param type - "Placement" | "Result" | "Event" | "All"
 * @returns Filtered notifications
 */
export function filterByType(notifications: Notification[], type: string) {
  if (type === 'All') return notifications;
  return notifications.filter((n) => n.Type === type);
}

/**
 * Show only unread/new notifications
 * Useful for a "What's new?" view that filters out already-seen items
 * 
 * @param notifications - Array to filter
 * @returns Only the unread notifications
 */
export function getUnreadNotifications(notifications: Notification[]) {
  return notifications.filter((n) => !n.viewed);
}
