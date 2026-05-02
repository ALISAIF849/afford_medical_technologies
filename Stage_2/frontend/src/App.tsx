// Placeholder for React App component
// Replace with your implementation

import React, { useState, useEffect } from 'react';
import { Container, Box, Alert, Snackbar } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Header } from './components/Header';
import { FilterBar } from './components/FilterBar';
import { PrioritySection } from './components/PrioritySection';
import { NotificationList } from './components/NotificationList';
import { fetchNotifications } from './services/api';
import { filterByType, getUnreadNotifications, calculatePriorityScore } from './hooks/useNotifications';
import { Notification, PriorityScore } from './types/notifications';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#fafafa',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
  },
});

function App() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [filteredNotifications, setFilteredNotifications] = useState<Notification[]>([]);
  const [priorityNotifications, setPriorityNotifications] = useState<PriorityScore[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string }>({
    open: false,
    message: '',
  });

  // Fetch notifications from API
  const loadNotifications = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchNotifications();
      let notifs = response.notifications || [];
      
      // If no notifications from API, show message
      if (notifs.length === 0) {
        setError('No notifications available from the API. Check if the endpoint is accessible at http://20.207.122.201/evaluation-service/notifications');
        setNotifications([]);
        setFilteredNotifications([]);
        setPriorityNotifications([]);
      } else {
        // Initialize viewed status
        const notificationsWithViewStatus = notifs.map((n) => ({
          ...n,
          viewed: false,
        }));

        setNotifications(notificationsWithViewStatus);
        
        // Calculate priority and get top 10
        const scored = notificationsWithViewStatus.map((n) => ({
          notification: n,
          score: calculatePriorityScore(n),
          typeWeight: 0,
          recencyScore: 0,
        }));
        const top10 = scored.sort((a, b) => b.score - a.score).slice(0, 10);
        setPriorityNotifications(top10);
        
        // Apply initial filter
        applyFilter('All', notificationsWithViewStatus);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Failed to fetch notifications';
      setError(`Error: ${errorMsg}`);
      console.error('Load error:', err);
      setNotifications([]);
      setFilteredNotifications([]);
      setPriorityNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  // Apply filter to notifications
  const applyFilter = (filterType: string, notifs: Notification[]) => {
    let filtered = notifs;

    if (filterType === 'unread') {
      filtered = getUnreadNotifications(notifs);
    } else if (filterType !== 'All') {
      filtered = filterByType(notifs, filterType);
    }

    setFilteredNotifications(filtered);
  };

  // Handle filter change
  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    applyFilter(newFilter, notifications);
  };

  // Toggle notification view status
  const handleToggleView = (id: string) => {
    const updated = notifications.map((n) =>
      n.ID === id ? { ...n, viewed: !n.viewed } : n
    );
    setNotifications(updated);
    applyFilter(filter, updated);
    setSnackbar({
      open: true,
      message: `Notification marked as ${
        notifications.find((n) => n.ID === id)?.viewed ? 'unread' : 'read'
      }`,
    });
  };

  // Refresh notifications
  const handleRefresh = async () => {
    setRefreshing(true);
    await loadNotifications();
    setRefreshing(false);
    setSnackbar({
      open: true,
      message: 'Notifications refreshed successfully',
    });
  };

  // Load notifications on mount
  useEffect(() => {
    loadNotifications();
  }, []);

  const unreadCount = getUnreadNotifications(notifications).length;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ bgcolor: '#fafafa', minHeight: '100vh', py: 3 }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Header
            totalNotifications={notifications.length}
            onRefresh={handleRefresh}
            isRefreshing={refreshing}
          />

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Filter Bar */}
          <FilterBar
            activeFilter={filter}
            onFilterChange={handleFilterChange}
            unreadCount={unreadCount}
          />

          {/* Priority Section */}
          {filter === 'All' && (
            <PrioritySection
              notifications={priorityNotifications}
              onToggleView={handleToggleView}
            />
          )}

          {/* Notifications List */}
          <NotificationList
            notifications={filteredNotifications}
            isLoading={loading}
            error={error || undefined}
            onToggleView={handleToggleView}
            title={
              filter === 'unread'
                ? `Unread Notifications (${filteredNotifications.length})`
                : `${filter === 'All' ? 'All' : filter} Notifications (${
                    filteredNotifications.length
                  })`
            }
          />
        </Container>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        message={snackbar.message}
      />
    </ThemeProvider>
  );
}

export default App;
