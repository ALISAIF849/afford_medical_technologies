import React from 'react';
import { Box, Typography, Divider, Alert } from '@mui/material';
import { NotificationItem } from './NotificationItem';
import { Notification, PriorityScore } from '../types/notifications';

interface PrioritySectionProps {
  notifications: PriorityScore[];
  onToggleView?: (id: string) => void;
}

export const PrioritySection: React.FC<PrioritySectionProps> = ({
  notifications,
  onToggleView,
}) => {
  if (notifications.length === 0) {
    return (
      <Box mb={4}>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: '#1976d2',
            textTransform: 'uppercase',
            letterSpacing: 0.5,
          }}
        >
          ⭐ Top 10 Priority Notifications
        </Typography>
        <Alert severity="info">No priority notifications at this time.</Alert>
      </Box>
    );
  }

  return (
    <Box mb={4}>
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 2,
          color: '#1976d2',
          textTransform: 'uppercase',
          letterSpacing: 0.5,
        }}
      >
        ⭐ Top 10 Priority Notifications
      </Typography>

      <Box
        sx={{
          bgcolor: '#e3f2fd',
          p: 2,
          borderRadius: 1,
          border: '1px solid #1976d2',
        }}
      >
        {notifications.map((item, index) => (
          <React.Fragment key={item.notification.ID}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography
                variant="h6"
                sx={{
                  bgcolor: '#1976d2',
                  color: 'white',
                  width: 40,
                  height: 40,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  fontWeight: 'bold',
                }}
              >
                {index + 1}
              </Typography>
              <Box flex={1}>
                <NotificationItem
                  notification={item.notification}
                  priorityScore={item.score}
                  onToggleView={onToggleView}
                />
              </Box>
            </Box>
            {index < notifications.length - 1 && <Divider sx={{ my: 1 }} />}
          </React.Fragment>
        ))}
      </Box>
    </Box>
  );
};
