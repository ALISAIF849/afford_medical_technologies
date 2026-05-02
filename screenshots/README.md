# Project Screenshots

Screenshots of the working Campus Notifications application on `http://localhost:3000`.

## Dashboard Overview

**File**: `dashboard-overview.png`

![Dashboard Overview](dashboard-overview.png)

Shows the main dashboard with:
- Priority inbox header with stats (Placements: 2, Results: 2, Events: 2, Unread: 6)
- Priority preview section showing top ranked items with priority scores
- Filter buttons (All, Placements, Results, Events, Unread Only)
- Reset demo button to reload notifications

## Notification Feed

**File**: `notification-feed.png`

Shows the notification board with:
- Individual notification cards with color-coded left borders
- Type badges: **Placement** (green), **Result** (blue), **Event** (orange)
- Priority scores displayed (#100, #88, #76, #91, etc.)
- New/unread indicators on each notification
- Mark read/unread action buttons for interaction
- Timestamp and ID information for each notification

## Adding Screenshots to This Folder

To make the screenshots visible in GitHub:

1. **Save your screenshots** as PNG files:
   - `dashboard-overview.png`
   - `notification-feed.png`

2. **Place them in this folder**: `screenshots/`

3. **Commit and push to GitHub**:
   ```bash
   git add screenshots/*.png
   git commit -m "Add app screenshots"
   git push
   ```

4. **GitHub will automatically display them** in this README.

## Screenshot Evidence

Both screenshots demonstrate:
✅ React 18 + Material UI frontend running on Vite  
✅ Priority ranking algorithm working (Type 30% + Recency 70%)  
✅ Demo notifications with all three types (Placement, Result, Event)  
✅ Filter functionality by type and unread status  
✅ Read/unread toggle capability  
✅ Responsive, polished UI design with gradients and badges  
✅ Color-coded visual hierarchy for notification types  

## How to Generate Screenshots

To capture your own screenshots:

```bash
cd Stage_2/frontend
npm install
npm run dev
```

Then:
1. Open `http://localhost:3000` in your browser
2. Use your browser's screenshot tool or a tool like Snagit/Greenshot
3. Save as PNG in this folder
4. Commit and push to make them visible on GitHub

**Captured on**: May 2, 2026  
**Environment**: localhost:3000 | React 18 | Material UI 5.14 | Vite 5.4
