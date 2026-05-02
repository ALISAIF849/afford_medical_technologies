/**
 * FilterBar Component
 * 
 * Provides filter buttons to show notifications by type (Placements, Results, Events)
 * or show only unread items. Helps users focus on what matters most.
 */

import React from 'react';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';

interface FilterBarProps {
  activeFilter: string;              // Which filter is currently selected
  onFilterChange: (filter: string) => void;  // Callback when user clicks a filter
  unreadCount?: number;              // Number of unread items (for display)
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activeFilter,
  onFilterChange,
  unreadCount = 0,
}) => {
  // Available filter options: type filters + unread-only
  const filters = [
    { label: 'All', value: 'All' },
    { label: 'Placements', value: 'Placement' },
    { label: 'Results', value: 'Result' },
    { label: 'Events', value: 'Event' },
    { label: 'Unread Only', value: 'unread' },
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        mb: 3,
        p: 2,
        bgcolor: '#f5f5f5',
        borderRadius: 1,
        flexWrap: 'wrap',
        gap: 2,
      }}
    >
      {/* Filter label and buttons */}
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Filter by Type:
        </Typography>
        {/* Show unread count badge if there are unread notifications */}
        {unreadCount > 0 && (
          <Typography
            variant="caption"
            sx={{
              bgcolor: '#ff9800',
              color: 'white',
              px: 1.5,
              py: 0.5,
              borderRadius: 1,
              fontWeight: 'bold',
            }}
          >
            {unreadCount} unread
          </Typography>
        )}
      </Box>

      <ButtonGroup variant="outlined" size="small">
        {filters.map((filter) => (
          <Button
            key={filter.value}
            onClick={() => onFilterChange(filter.value)}
            variant={activeFilter === filter.value ? 'contained' : 'outlined'}
            color={activeFilter === filter.value ? 'primary' : 'inherit'}
            sx={{
              textTransform: 'none',
              fontWeight: activeFilter === filter.value ? 'bold' : 'normal',
            }}
          >
            {filter.label}
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};
