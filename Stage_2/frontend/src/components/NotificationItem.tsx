/**
 * NotificationItem Component
 * 
 * Renders a single notification as a card.
 * Shows type badge, priority score, timestamp, and a toggle button for read/unread.
 */

import React from 'react';
import { Card, CardContent, Chip, Box, IconButton, Typography, Tooltip } from '@mui/material';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import { Notification } from '../types/notifications';

interface NotificationItemProps {
  notification: Notification;        // The notification data
  priorityScore?: number;            // Optional priority score to display
  onToggleView?: (id: string) => void;  // Callback to toggle read/unread
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  priorityScore,
  onToggleView,
}) => {
  // Get the color associated with each notification type
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Placement':
        return '#4caf50'; // Green
      case 'Result':
        return '#2196f3'; // Blue
      case 'Event':
        return '#ff9800'; // Orange
      default:
        return '#9c27b0'; // Purple
    }
  };

  // Format timestamp in a readable way
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Card
      sx={{
        mb: 2,
        // Unread notifications have a light blue background for visibility
        bgcolor: notification.viewed ? '#fafafa' : '#f0f8ff',
        // Color-coded left border based on type
        borderLeft: `4px solid ${getTypeColor(notification.Type)}`,
        '&:hover': {
          boxShadow: 3,
        },
        transition: 'all 0.2s ease',
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          {/* Main content: score, type, message, and timestamp */}
          <Box flex={1}>
            {/* Badges for priority score, type, and new indicator */}
            <Box display="flex" gap={1} alignItems="center" mb={1}>
              {priorityScore !== undefined && (
                <Chip
                  label={`Priority: ${priorityScore.toFixed(0)}`}
                  size="small"
                  variant="outlined"
                  color="primary"
                />
              )}
              <Chip
                label={notification.Type}
                size="small"
                sx={{
                  bgcolor: getTypeColor(notification.Type),
                  color: 'white',
                  fontWeight: 'bold',
                }}
              />
              {!notification.viewed && (
                <Chip
                  label="New"
                  size="small"
                  color="error"
                  variant="filled"
                />
              )}
            </Box>

            {/* Notification message */}
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              {notification.Message}
            </Typography>

            <Box display="flex" gap={2} sx={{ opacity: 0.7 }}>
              <Typography variant="caption">
                📅 {formatDate(notification.Timestamp)}
              </Typography>
              <Typography variant="caption">
                🆔 {notification.ID.substring(0, 8)}...
              </Typography>
            </Box>
          </Box>

          {onToggleView && (
            <Tooltip title={notification.viewed ? 'Mark as unread' : 'Mark as read'}>
              <IconButton
                size="small"
                onClick={() => onToggleView(notification.ID)}
                sx={{ ml: 2 }}
              >
                {notification.viewed ? (
                  <MarkEmailUnreadIcon />
                ) : (
                  <MarkEmailReadIcon />
                )}
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};
