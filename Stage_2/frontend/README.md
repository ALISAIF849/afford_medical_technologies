# Frontend Setup Instructions

This is the React frontend application for the Campus Notifications Microservice (Stage 2).

## Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

```bash
# Navigate to frontend directory
cd Stage_2/frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Application will open at http://localhost:3000
```

### Available Scripts

```bash
# Development server with hot reload
npm run dev
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Project Structure

```
src/
├── components/          # Reusable React components
│   ├── NotificationList.tsx
│   ├── NotificationItem.tsx
│   ├── FilterBar.tsx
│   ├── PrioritySection.tsx
│   └── Header.tsx
├── pages/              # Page components (if using Next.js)
├── hooks/              # Custom React hooks
│   ├── useNotifications.ts
│   ├── useFilter.ts
│   └── useViewStatus.ts
├── services/           # API and utility services
│   └── api.ts
├── types/              # TypeScript type definitions
│   └── notifications.ts
├── styles/             # Global styles and theme
│   └── theme.ts
├── App.tsx             # Root component
└── main.tsx            # Entry point
```

## Key Components

### NotificationList
- Displays all notifications
- Handles pagination
- Shows view status

### NotificationItem
- Single notification display
- Type badge
- Mark as read button
- Timestamp display

### FilterBar
- Filter by notification type
- Show All / Placements / Results / Events
- Unread only toggle

### PrioritySection
- Shows top 10 notifications
- Different styling from regular list

## API Integration

The application fetches notifications from:
```
GET http://20.207.122.201/evaluation-service/notifications
```

Query Parameters:
- `limit` - Number of notifications
- `page` - Pagination offset
- `notification_type` - Filter by type

## Styling

- Using Material UI (@mui/material) exclusively
- No native CSS or other CSS libraries
- Responsive design for mobile, tablet, desktop
- Dark/Light theme support (optional)

## Environment Variables

Create a `.env` file in the frontend directory:

```
REACT_APP_API_ENDPOINT=http://20.207.122.201/evaluation-service
REACT_APP_MAX_NOTIFICATIONS=10
```

## Responsive Design

### Breakpoints
- **Mobile**: < 600px
- **Tablet**: 600px - 960px
- **Desktop**: > 960px

The application automatically adapts to screen size using Material UI's responsive Grid system.

## Testing

```bash
# Run test suite
npm test

# Run with coverage
npm test -- --coverage

# Run specific test
npm test -- NotificationItem.test.tsx
```

## Building for Production

```bash
# Create production build
npm run build

# Build output in ./build directory
# Ready for deployment
```

## Troubleshooting

### Port 3000 Already in Use
```bash
# Use a different port
PORT=3001 npm start
```

### CORS Issues
- Ensure API endpoint is correctly configured
- Check network tab in browser developer tools
- May need to configure CORS proxy

### Styling Not Applied
- Verify MUI imports are correct
- Check theme provider wraps the app
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## Performance Optimization

- Code splitting with React.lazy()
- Memoization with React.memo()
- Pagination to limit rendered items
- Efficient state management

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Additional Resources

- [Material UI Documentation](https://mui.com/)
- [React Documentation](https://react.dev/)
- [React Hooks Guide](https://react.dev/reference/react)

## Next Steps

1. Install dependencies: `npm install`
2. Create required components
3. Implement API integration
4. Add state management
5. Build filter functionality
6. Test responsiveness
7. Optimize performance
8. Deploy (when ready)

---

For detailed requirements, see [README.md](./README.md)
