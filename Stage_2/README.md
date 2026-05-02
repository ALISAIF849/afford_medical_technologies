# Stage 2: Responsive Frontend Application

## Objective

Build a responsive React frontend application that displays campus notifications with filtering, priority ranking, and clear viewed/unread status.

## Requirements

### Functional Requirements

- Display notifications from the API or a safe fallback dataset
- Show top-priority notifications separately from the full feed
- Filter by notification type: Event, Result, Placement
- Support unread-only filtering
- Work on desktop and mobile screen sizes
- Use Material UI for the frontend UI layer

### Technical Requirements

- Framework: React 18+
- Port: `http://localhost:3000`
- Styling: Material UI
- Language: TypeScript or JavaScript
- Build: Standard React build process
- Error handling: Graceful handling of API failures

### Non-Functional Requirements

- Production-ready implementation only
- Clean, maintainable, well-structured code
- Responsive layout for all supported devices
- Accessible semantic HTML and ARIA labels where needed

## Application Structure

### Main Notifications Page

- Header with title, status, and refresh control
- Filter buttons for category and unread state
- Priority section showing the top 10 notifications
- Full notifications list with view status indicators

### Responsive Behavior

- Desktop: wider layout with summary panels and stacked sections
- Tablet: single-column sections with touch-friendly controls
- Mobile: compact stacked layout with large tap targets

## Tech Stack

### Dependencies

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "@mui/material": "^5.0.0",
    "@emotion/react": "^11.0.0",
    "@emotion/styled": "^11.0.0"
  },
  "devDependencies": {
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0"
  }
}
```

### Folder Structure

```text
frontend/
├── src/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   ├── types/
│   ├── App.tsx
│   └── main.tsx
├── public/
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Implementation Notes

- The app is configured as a Vite frontend on port 3000.
- The UI includes a demo fallback so it never renders as a blank page.
- Notification priority is based on type weight and recency.

## API Integration

### Fetch Notifications

```text
GET http://20.207.122.201/evaluation-service/notifications
```

Query parameters:
- `limit`
- `page`
- `notification_type`

### Response Structure

```text
{
  "notifications": [
    {
      "ID": "string",
      "Type": "Event" | "Result" | "Placement",
      "Message": "string",
      "Timestamp": "string"
    }
  ]
}
```

## Styling Guidelines

- Use Material UI for structure and component styling
- Keep the layout responsive and readable
- Use consistent spacing, borders, and color accents for type badges

## Build and Run

```bash
cd Stage_2/frontend
npm install
npm run dev
```

The app runs at `http://localhost:3000`.
