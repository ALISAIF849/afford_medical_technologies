import React from 'react';
import { Card, CardContent, Chip, Box, IconButton, Typography, Tooltip } from '@mui/material';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import MarkEmailUnreadIcon from '@mui/icons-material/MarkEmailUnread';
import { Notification } from '../types/notifications';

interface NotificationItemProps {
  notification: Notification;
  priorityScore?: number;
  onToggleView?: (id: string) => void;
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  priorityScore,
  onToggleView,
}) => {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Placement':
        return '#4caf50';
      case 'Result':
        return '#2196f3';
      case 'Event':
        return '#ff9800';
      default:
        return '#9c27b0';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Card
      sx={{
        mb: 2,
        bgcolor: notification.viewed ? '#fafafa' : '#f0f8ff',
        borderLeft: `4px solid ${getTypeColor(notification.Type)}`,
        '&:hover': {
          boxShadow: 3,
        },
        transition: 'all 0.2s ease',
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Box flex={1}>
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
