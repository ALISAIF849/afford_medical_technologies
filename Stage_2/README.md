# Stage 2: Responsive Frontend Application

## Objective

Develop a responsive React/Next.js frontend application that displays all notifications with advanced filtering and prioritization features. The application must work seamlessly across desktop and mobile devices.

## Requirements

### Functional Requirements

- **Display All Notifications**: Show complete list of notifications from API
- **Priority Display**: Show prioritized notifications separately from regular notifications
- **Type Filtering**: Filter notifications by type (Event, Result, Placement)
- **Responsive Design**: Work on both desktop (1920px) and mobile (375px+) devices
- **Distinction Between Views**: Clear visual separation between new and already viewed notifications
- **View Status Tracking**: Mark notifications as viewed based on user interaction
- **Material UI Only**: Use Material UI exclusively for styling (no CSS libraries, native CSS only)

### Technical Requirements

- **Framework**: React 18+ or Next.js 13+
- **Port**: Must run on `http://localhost:3000`
- **Styling**: Material UI (@mui/material)
- **Language**: TypeScript or JavaScript
- **Build**: Standard React build process
- **Error Handling**: Graceful handling of API failures
- **Performance**: Optimized rendering and data fetching

### Non-Functional Requirements

- **No pseudo-code**: Production-ready implementation only
- **Code Quality**: Clean, maintainable, well-structured code
- **Responsiveness**: Optimal UX on all screen sizes
- **Accessibility**: Proper semantic HTML and ARIA labels
- **Performance**: Fast load times and smooth interactions

## Application Structure

### Page Layout

#### Main Notifications Page
```
┌─────────────────────────────────────┐
│  Campus Notifications Platform      │
├─────────────────────────────────────┤
│  [Filter Buttons] [Refresh Button]  │
├─────────────────────────────────────┤
│                                     │
│  Priority Notifications (Top 10)    │
│  ┌─────────────────────────────┐   │
│  │ [Notification Item]         │   │
│  │ [Notification Item]         │   │
│  └─────────────────────────────┘   │
│                                     │
│  All Notifications                  │
│  ┌─────────────────────────────┐   │
│  │ [Notification Item] (New)   │   │
│  │ [Notification Item] (Viewed)│   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

### Features

#### 1. Notifications Display
- **Header**: Shows app title and status
- **Filter Controls**: Buttons to filter by type
- **Priority Section**: Top 10 notifications displayed prominently
- **All Notifications**: Complete list with view status indicator
- **Pagination**: Load more functionality (if implementing)

#### 2. Notification Item Component
```
┌────────────────────────────────┐
│ [Icon] [Type Badge]            │
│ Message Text                   │
│ Timestamp | ID                 │
│ [Mark as Read Button]          │
└────────────────────────────────┘
```

#### 3. Filter System
- **Show All**: Display all notifications
- **Placements**: Show only placement notifications
- **Results**: Show only result notifications
- **Events**: Show only event notifications
- **Unread Only**: Show only new/unviewed notifications

#### 4. Responsive Behavior

**Desktop (1920px)**
- Full sidebar (optional)
- Multiple columns (if applicable)
- Expanded detail view on hover

**Tablet (768px)**
- Single column layout
- Collapsible navigation
- Touch-friendly buttons

**Mobile (375px)**
- Full-screen single column
- Stacked layout
- Large tap targets (min 44px)

## Tech Stack

### Dependencies

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "next": "^14.0.0", // if using Next.js
    "@mui/material": "^5.0.0",
    "@emotion/react": "^11.0.0",
    "@emotion/styled": "^11.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "tailwindcss": "^3.0.0" // For utility support only
  }
}
```

### Folder Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── NotificationList.tsx
│   │   ├── NotificationItem.tsx
│   │   ├── FilterBar.tsx
│   │   ├── PrioritySection.tsx
│   │   └── Header.tsx
│   ├── pages/ (if Next.js)
│   │   ├── index.tsx
│   │   └── _app.tsx
│   ├── hooks/
│   │   ├── useNotifications.ts
│   │   ├── useFilter.ts
│   │   └── useViewStatus.ts
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── notifications.ts
│   ├── styles/
│   │   └── theme.ts
│   ├── App.tsx
│   └── index.tsx
├── public/
├── package.json
├── tsconfig.json
└── next.config.js (if Next.js)
```

## Implementation Guide

### Step 1: Project Setup
```bash
npx create-react-app frontend --template typescript
# or
npx create-next-app@latest frontend --typescript
```

### Step 2: Install Material UI
```bash
npm install @mui/material @emotion/react @emotion/styled
```

### Step 3: Create Core Components
1. Header component with app title
2. Filter bar with type buttons
3. Notification item component
4. Notifications list container
5. Priority section wrapper

### Step 4: Implement API Integration
- Create API service to fetch notifications
- Implement error handling
- Add loading states
- Cache results if appropriate

### Step 5: Add State Management
- Track current notifications
- Manage filter selections
- Track viewed/unviewed status
- Handle pagination

### Step 6: Implement Responsiveness
- Use Material UI's Grid system
- Create responsive components
- Test on multiple screen sizes
- Optimize mobile experience

### Step 7: Polish & Optimize
- Add animations/transitions
- Improve loading states
- Implement skeleton screens
- Test performance

## API Integration

### Fetch Notifications
```javascript
GET http://20.207.122.201/evaluation-service/notifications
Query Parameters:
- limit: number of notifications
- page: pagination offset
- notification_type: filter by type
```

### Response Structure
```javascript
{
  notifications: [
    {
      ID: string,
      Type: "Event" | "Result" | "Placement",
      Message: string,
      Timestamp: string (YYYY-MM-DD HH:MM:SS)
    }
  ]
}
```

## Styling Guidelines

### Material UI Theme
```typescript
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});
```

### Component Styling
- Use `sx` prop for inline styles
- Use `styled` components for complex styling
- Follow Material UI design principles
- Maintain consistent spacing and sizing

### Color Scheme
- **Placements**: Green (#4caf50)
- **Results**: Blue (#2196f3)
- **Events**: Orange (#ff9800)
- **Unviewed**: Badge or highlight
- **Priority**: Star or badge indicator

## Responsive Design Breakpoints

```typescript
const breakpoints = {
  xs: 0,      // Mobile: 0px+
  sm: 600,    // Tablet: 600px+
  md: 960,    // Small desktop: 960px+
  lg: 1280,   // Desktop: 1280px+
  xl: 1920,   // Large desktop: 1920px+
};
```

## Features to Implement

### Essential
- [ ] Display all notifications
- [ ] Filter by notification type
- [ ] Show priority notifications (top 10)
- [ ] Mark as read/unread
- [ ] Responsive design
- [ ] Load data from API

### Nice to Have
- [ ] Search functionality
- [ ] Sorting options
- [ ] Notification count badges
- [ ] Refresh button
- [ ] Dark mode toggle
- [ ] Settings panel
- [ ] Delete notifications
- [ ] Archive notifications

## Deliverables

1. **Complete Frontend Application**
   - All source code in `frontend/` directory
   - `package.json` with all dependencies
   - Clear entry point

2. **README for Frontend**
   - Setup instructions
   - Running instructions
   - Environment setup

3. **Screenshots**
   - Desktop view (multiple screens)
   - Mobile view (multiple screens)
   - Filter functionality
   - Responsive behavior
   - Error states (if applicable)

4. **Code Quality**
   - TypeScript for type safety
   - Proper component structure
   - Reusable components
   - Clean code practices

## Running the Application

```bash
# Install dependencies
cd frontend
npm install

# Start development server
npm run dev

# Open browser
# http://localhost:3000
```

## Testing Checklist

- [ ] App loads successfully on http://localhost:3000
- [ ] Notifications fetched from API
- [ ] All notification types displayed correctly
- [ ] Filter buttons work for each type
- [ ] Responsive on mobile (375px)
- [ ] Responsive on desktop (1920px)
- [ ] View status tracked correctly
- [ ] Priority notifications displayed
- [ ] Material UI styling applied
- [ ] No console errors
- [ ] Accessibility features present

## Submission Checklist

Before committing to GitHub:
- [ ] Application runs without errors
- [ ] All features implemented and tested
- [ ] Code is clean and well-commented
- [ ] `package.json` has all dependencies
- [ ] README is complete with setup instructions
- [ ] Screenshots show all functionality
- [ ] Responsive design verified
- [ ] No hardcoded URLs (use environment variables)
- [ ] Error handling implemented
- [ ] Ready for production deployment

## Evaluation Criteria

- **UI/UX Design** (25%): Clean layout, good user experience
- **Responsiveness** (25%): Works on all screen sizes
- **Feature Completeness** (25%): All requirements implemented
- **Code Quality** (15%): Clean, maintainable code
- **Screenshots/Evidence** (10%): Visual proof of working application

## Common Issues & Solutions

### Issue: API Connection Failed
- Check network connectivity
- Verify API endpoint URL
- Check for CORS issues
- Use proxy if needed

### Issue: Material UI Styling Not Working
- Verify MUI is properly installed
- Check theme provider is wrapping app
- Verify imports are correct

### Issue: Responsive Layout Broken
- Use MUI Grid component
- Check breakpoint settings
- Test with browser dev tools

## Next Steps

1. Set up React/Next.js project
2. Install Material UI
3. Create component structure
4. Implement API integration
5. Add state management
6. Build filter functionality
7. Implement responsive design
8. Test thoroughly
9. Optimize performance
10. Take final screenshots
11. Commit to GitHub

---

**Status**: Not Started  
**Estimated Time**: 15-20 hours  
**Difficulty**: Intermediate to Advanced
