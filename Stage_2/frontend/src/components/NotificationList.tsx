/**
 * NotificationList Component
 * 
 * Displays a list of notifications with loading, error, and empty states.
 * Handles all the edge cases: no data, errors, and loading spinners.
 */

import React from 'react';
import { Box, Typography, Alert, CircularProgress } from '@mui/material';
import { NotificationItem } from './NotificationItem';
import { Notification } from '../types/notifications';

interface NotificationListProps {
  notifications: Notification[];     // Array of notifications to display
  isLoading?: boolean;               // Whether data is currently loading
  error?: string;                    // Error message if something went wrong
  onToggleView?: (id: string) => void;  // Callback to mark as read/unread
  title?: string;                    // Section title
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  isLoading = false,
  error,
  onToggleView,
  title = 'All Notifications',
}) => {
  // Show spinner while loading
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  // Show error message if something broke
  if (error) {
    return <Alert severity="error">Error loading notifications: {error}</Alert>;
  }

  // Show empty state if no notifications match the filter
  if (notifications.length === 0) {
    return (
      <Alert severity="info">
        No notifications found. Try adjusting your filters.
      </Alert>
    );
  }

  return (
    <Box>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 2,
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}
      >
        {title}
      </Typography>

      {/* Render each notification as a card */}
      <Box>
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.ID}
            notification={notification}
            onToggleView={onToggleView}
          />
        ))}
      </Box>
    </Box>
  );
};
