# Frontend Setup Instructions

This is the React frontend application for the campus notifications microservice.

## Quick Start

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

```bash
cd Stage_2/frontend
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

## Project Structure

```text
src/
├── components/
├── hooks/
├── services/
├── types/
├── App.tsx
└── main.tsx
```

## Key Components

### Header
- Displays the app title
- Shows notification count and refresh action

### FilterBar
- Filter by notification type
- Show All / Placements / Results / Events / Unread Only

### PrioritySection
- Shows the top-priority notifications

### NotificationList
- Displays the full notification feed
- Handles empty, loading, and error states

## API Integration

The application fetches notifications from:

```text
GET http://20.207.122.201/evaluation-service/notifications
```

## Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_ENDPOINT=http://20.207.122.201/evaluation-service
```

## Styling

- Material UI is used for the component system and styling layer
- The layout is responsive for desktop and mobile screens

## Build for Production

```bash
npm run build
```

Build output is generated in `dist/`.

## Troubleshooting

- If the page looks stale, hard refresh the browser.
- If the API returns no data, the app falls back to demo notifications so the UI still renders.