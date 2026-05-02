# Campus Notifications Microservice

A multi-stage campus notification platform that helps students receive and manage real-time updates regarding placements, events, and results.

## Project Overview

This project implements a priority-based inbox system and a responsive user interface for campus notifications.

## Key Features

- **Priority-Based Inbox**: Intelligently prioritizes notifications based on weight and recency
- **Real-Time Updates**: Delivers instant notifications for placements, events, and results
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Clean Architecture**: Modular design with separated concerns

## Project Structure

```
afford_medical_tech/
├── README.md                    # Project overview
├── CONTRIBUTING.md              # Contribution guidelines
├── logging_middleware/          # Logging utilities and notes
├── notification_system_design.md # Shared design summary
├── notification_app_be/         # Backend implementation area
├── notification_app_fe/         # Frontend implementation area
├── Stage_1/                     # Priority inbox system
│   ├── README.md
│   ├── Notification_System_Design.md
│   ├── solution.[language]      # Implementation file
│   └── screenshots/
├── Stage_2/                     # Frontend application
│   ├── README.md
│   ├── frontend/                # React application
│   └── screenshots/
└── .dist/                       # Build output
```

## Stages

### Stage 1: Priority Inbox System
Implement a backend service that:
- Fetches notifications from the Notification API
- Prioritizes notifications based on weight and recency
- Returns the top 10 most important unread notifications
- Maintains efficiency as new notifications arrive

**Status**: In Development

### Stage 2: Responsive Frontend
Develop a React application that:
- Displays all notifications
- Shows prioritized notifications separately
- Allows filtering by notification type
- Supports both desktop and mobile views
- Runs on `http://localhost:3000`
- Uses Material UI for styling

**Status**: Planned

## API Reference

### Notification API (GET)
```
http://20.207.122.201/evaluation-service/notifications
```

**Query Parameters:**
- `limit` - Number of notifications to return
- `page` - Pagination offset
- `notification_type` - Filter by type (Event, Result, Placement)

**Notification Types Supported:**
- `"Event"`
- `"Result"`
- `"Placement"`

**Response Example:**
```json
{
  "notifications": [
    {
      "ID": "d146095a-0d86-4a34-9e69-3900a14576bc",
      "Type": "Result",
      "Message": "mid-sem",
      "Timestamp": "2026-04-22 17:51:30"
    }
  ]
}
```

## Getting Started

### Prerequisites
- Node.js 16+ (for frontend)
- Your preferred language/runtime (for Stage 1)
- Git for version control

### Installation

#### Stage 1 Setup
```bash
cd Stage_1
# Follow instructions in Stage_1/README.md
```

#### Stage 2 Setup
```bash
cd Stage_2/frontend
npm install
npm run dev
```

## Development Guidelines

### Important Notes
- ✅ Use the provided Notification API - do not create notifications manually
- ✅ Do not store notifications in a database
- ✅ Write functional, production-quality code (not pseudo-code)
- ❌ Do not develop a UI or frontend for Stage 1
- ❌ Do not hard-code notifications

### Best Practices
- Document your approach in markdown files
- Include screenshots of working implementations
- Write clean, maintainable code
- Follow the language/framework conventions
- Implement proper error handling

## Submission Requirements

1. **Code**: Working implementation committed to GitHub
2. **Documentation**: 
   - `Notification_System_Design.md` (Stage 1)
   - Design decisions and approach explanation
3. **Screenshots**: Evidence of working implementation
4. **Repository**: All deliverables pushed to the same GitHub repository
5. **Markdown Formatting**: Proper documentation with clear headings

## Evaluation Criteria

- **Code Quality**: Clean, maintainable, production-ready code
- **Efficiency**: Top 10 notifications retrieved efficiently as new notifications arrive
- **Documentation**: Clear explanation of design approach
- **Visual Evidence**: Screenshots demonstrating functionality
- **Completeness**: All requirements met for the stage

## Important Constraints

- API is a protected route
- Stage 1 should focus only on logic (no UI/frontend)
- Stage 2 frontend must use Material UI for styling
- Applications must run on specified localhost ports
- No peer collaboration or sharing of strategies
- Individual assessment based on submission

## Team Roles (Reference Only)

The following roles exist in the context of this project but are imaginary for evaluation purposes:
- Frontend Developer
- Product Manager
- Software Architect
- These are provided as context only and should not be consulted

## Resources

- [Notification API Endpoint](http://20.207.122.201/evaluation-service/notifications)
- Material UI Documentation: https://mui.com/
- React Documentation: https://react.dev/
- Next.js Documentation: https://nextjs.org/

## Submission Status

| Stage | Status | Deliverable |
|-------|--------|-------------|
| 1 | Not Started | Priority Inbox System |
| 2 | Not Started | Frontend Application |

## License

Campus Notifications Project - 2026

---

**Last Updated**: May 2, 2026
**Project Version**: 1.0.0
