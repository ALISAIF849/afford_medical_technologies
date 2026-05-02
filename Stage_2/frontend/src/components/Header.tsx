import React from 'react';
import { Box, Typography, Button, Tooltip } from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

interface HeaderProps {
  totalNotifications?: number;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  totalNotifications = 0,
  onRefresh,
  isRefreshing = false,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 4,
        pb: 3,
        borderBottom: '2px solid #1976d2',
      }}
    >
      <Box display="flex" alignItems="center" gap={2}>
        <NotificationsActiveIcon sx={{ fontSize: 32, color: '#1976d2' }} />
        <Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#1976d2',
              m: 0,
            }}
          >
            Campus Notifications
          </Typography>
          <Typography variant="caption" sx={{ color: '#666' }}>
            AFFORDMED Platform
          </Typography>
        </Box>
      </Box>

      <Box display="flex" alignItems="center" gap={2}>
        {totalNotifications > 0 && (
          <Typography
            variant="body2"
            sx={{
              bgcolor: '#f5f5f5',
              px: 2,
              py: 1,
              borderRadius: 1,
              fontWeight: 600,
            }}
          >
            {totalNotifications} notifications
          </Typography>
        )}

        {onRefresh && (
          <Tooltip title="Refresh notifications">
            <span>
              <Button
                variant="outlined"
                size="small"
                onClick={onRefresh}
                disabled={isRefreshing}
                startIcon={<RefreshIcon sx={{ animation: isRefreshing ? 'spin 1s linear infinite' : 'none' }} />}
                sx={{
                  '@keyframes spin': {
                    '0%': { transform: 'rotate(0deg)' },
                    '100%': { transform: 'rotate(360deg)' },
                  },
                }}
              >
                Refresh
              </Button>
            </span>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
};
