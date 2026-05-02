import React from 'react';
import { Box, Typography, Alert, CircularProgress } from '@mui/material';
import { NotificationItem } from './NotificationItem';
import { Notification } from '../types/notifications';

interface NotificationListProps {
  notifications: Notification[];
  isLoading?: boolean;
  error?: string;
  onToggleView?: (id: string) => void;
  title?: string;
}

export const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  isLoading = false,
  error,
  onToggleView,
  title = 'All Notifications',
}) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" py={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">Error loading notifications: {error}</Alert>;
  }

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
