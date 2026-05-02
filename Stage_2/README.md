# Stage 2: Responsive Frontend

Build a clean React frontend that shows all notifications, highlights the important ones, and lets users filter and explore the feed.

## What You're Building

A notification dashboard that fetches from the API and displays them nicely. It should work equally well on a phone, tablet, or desktop, and always show something useful even if the API is down.

## Key Features

- **Full notification feed** with all items from the API
- **Priority preview** showing the top 10 ranked notifications
- **Filters** for notification types and unread status
- **View tracking** to mark notifications as read/unread
- **Mobile-friendly** layout that works everywhere
- **Fallback content** so the app never shows a blank page

## Tech Stack

You're using:
- **React 18** for the UI
- **Material UI** for components and styling
- **TypeScript** for type safety
- **Vite** for fast builds (not Create React App)
- **Axios** for API calls

The app runs on **http://localhost:3000**.

## Project Layout

```
frontend/
├── src/
│   ├── App.tsx           # Main component
│   ├── main.tsx          # Entry point (Vite standard)
│   ├── index.css         # Global styles
│   ├── components/       # UI components
│   ├── services/         # API calls
│   ├── hooks/            # Custom hooks
│   └── types/            # TypeScript types
├── index.html            # Root HTML
├── vite.config.ts        # Vite config
└── package.json
```

## Getting Started

```bash
cd Stage_2/frontend
npm install
npm run dev
```

Then visit **http://localhost:3000** in your browser. You'll see notifications immediately, either from the API or from fallback demo data.

## How It Works

### Fetching Data
The app pulls notifications from:
```
GET http://20.207.122.201/evaluation-service/notifications
```

You can pass query params like `limit`, `page`, and `notification_type` to filter.

### Priority Ranking
Each notification gets a score based on:
- **Type weight**: Placement (100) > Result (66) > Event (33)
- **Recency**: Newer is better (70% of the score)
- **Formula**: `(Type Weight × 30%) + (Recency × 70%)`

The app displays the top 10 in a special section, then the full list below.

### Responsive Design
- **Desktop**: Full width with side-by-side sections
- **Tablet**: Stacked sections, touch-friendly buttons
- **Mobile**: Compact layout, large tap targets

## Key Components

- **Header** — Title and refresh button
- **FilterBar** — Buttons to show All/Placements/Results/Events/Unread
- **PrioritySection** — Top 10 notifications ranked
- **NotificationList** — Full feed with all notifications
- **NotificationItem** — Individual notification cards

## Styling

Material UI handles most of the look and feel. Customizations:
- **Placement**: Green badges (#16a34a)
- **Result**: Blue badges (#2563eb)
- **Event**: Orange badges (#f59e0b)
- **Light theme** with subtle gradient background

## API Notes

The API is protected, so if it's not available, the app shows demo notifications automatically. This means the app always has something to display.

Response format:
```json
{
  "notifications": [
    {
      "ID": "unique-id",
      "Type": "Placement|Result|Event",
      "Message": "Your message here",
      "Timestamp": "2026-04-22 17:51:18"
    }
  ]
}
```

## Building for Production

```bash
npm run build
```

This creates an optimized version in the `dist/` folder ready to deploy.

## Next: Stage 1

The frontend is just the UI. Behind the scenes, there should be a backend service (Stage 1) that handles the priority logic and top 10 selection, though this frontend can work standalone with its own priority calculation.
