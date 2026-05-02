# Stage 1: Priority Inbox System

Build a backend service that ranks notifications by type and recency, keeping the top 10 most important items ready at all times.

## What You're Building

Your job is to create the logic that sorts campus notifications intelligently. When the app needs notifications, your service should fetch them from the API, score each one based on what it is and when it arrived, then return the top 10.

## The API

You'll fetch notifications from:

```
GET http://20.207.122.201/evaluation-service/notifications
```

Query parameters are available:
- `limit` - How many to fetch
- `page` - For pagination
- `notification_type` - Filter by type

The API returns notifications like this:

```json
{
  "notifications": [
    {
      "ID": "unique-identifier",
      "Type": "Result|Event|Placement",
      "Message": "notification message",
      "Timestamp": "YYYY-MM-DD HH:MM:SS"
    }
  ]
}
```

Three notification types exist:
- `Placement` - High priority (companies, internships)
- `Result` - Medium priority (grades, assessments)
- `Event` - Low priority (workshops, announcements)

## How to Approach It

### 1. Fetch the Data
Connect to the API and pull notifications. Handle errors gracefully.

### 2. Score Each Notification
Each notification gets a priority score based on:
- **Type**: Placement scores higher than Result, which scores higher than Event
- **Age**: Newer notifications score higher than old ones

A good formula is: `(Type_Weight × 30%) + (Recency_Score × 70%)`

For example:
- Placement weight = 100, Result = 66, Event = 33
- Recency scores from 0-70 based on how fresh the notification is (24-hour window)

### 3. Return the Top 10
Sort by score and give back the 10 highest-scoring notifications.

### 4. Keep it Fresh
As new notifications arrive, your service should update the rankings continuously.

## What You'll Submit

You need three things:

1. **Your Code** (`solution.[language]`)
   - Working implementation in whatever language you choose
   - Clean and readable, with comments where it helps
   - Main entry point should be obvious

2. **Design Document** (`Notification_System_Design.md`)
   - Explain your scoring formula and why it works
   - Include a quick flow diagram (text or ASCII is fine)
   - Talk about how you'd handle new notifications arriving constantly
   - Think about efficiency—how does it handle lots of notifications?

3. **Screenshots**
   - Save them in a `screenshots/` folder
   - Show your code running and outputting the top 10
   - Include console output if relevant

## Pick Your Language

Use whatever you're comfortable with:
- **Python** — Data processing is easy, great for quick implementation
- **JavaScript/TypeScript** — Node.js if that's your thing
- **Java** — Enterprise feel, lots of libraries
- **Go** — Clean and fast
- **Rust** — If performance matters most
- **C++** — Go for it if you want

## What Success Looks Like

Your code should output something like:

```
Priority Inbox - Top 10 Notifications
=====================================

1. [Score: 95] [Placement] CSX Corporation hiring - 2026-04-22 17:51:18
2. [Score: 92] [Placement] AMD Inc. hiring - 2026-04-22 17:49:42
3. [Score: 88] [Result] mid-sem - 2026-04-22 17:51:30
4. [Score: 85] [Event] tech-fest - 2026-04-22 17:50:06
5. [Score: 82] [Result] project-review - 2026-04-22 17:50:42
...
```

## Before You Submit

- [ ] Code compiles/runs without errors
- [ ] API connection works
- [ ] Priority sorting is correct
- [ ] Top 10 displayed properly
- [ ] Handles all three notification types
- [ ] Handles lots of notifications without slowing down
- [ ] Design doc explains your approach
- [ ] Screenshots captured

## File Structure

Keep it simple:

```
Stage_1/
├── README.md
├── Notification_System_Design.md
├── solution.[language]
└── screenshots/
    ├── output_1.png
    └── (more as needed)
```

## How to Build It

1. Pick your language
2. Create the solution file
3. Connect to the API
4. Build the scoring algorithm
5. Test it with real notifications
6. Write your design doc
7. Grab some screenshots
8. Commit to GitHub

## How You'll Be Scored

- **Code quality & efficiency** (40%) — Does it work well? Is it fast?
- **Correct priority math** (30%) — Does your algorithm actually rank them right?
- **Documentation** (20%) — Can someone understand your approach?
- **Screenshots** (10%) — Proof it's working
