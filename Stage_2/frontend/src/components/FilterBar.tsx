import React from 'react';
import { Box, Button, ButtonGroup, Typography } from '@mui/material';

interface FilterBarProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  unreadCount?: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activeFilter,
  onFilterChange,
  unreadCount = 0,
}) => {
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
      <Box display="flex" alignItems="center" gap={1}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Filter by Type:
        </Typography>
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
