# Contributing Guidelines

## Project Overview

This is an AFFORDMED Campus Notifications Microservice project developed across multiple stages. Each stage builds upon previous work and involves individual contributions.

## Important Guidelines

### Submission Guidelines
1. **Individual Work**: Each submission must be your own original work
2. **No Peer Collaboration**: Do not discuss strategies or solutions with peers
3. **No Consulting Team Members**: Do not ask other roles (PM, Architect, Frontend Dev, etc.) for guidance on your solution
4. **GitHub Submission**: All work must be committed and pushed to the GitHub repository created for this project
5. **Regular Commits**: Commit your work frequently with meaningful commit messages

### Code Quality Standards

#### Required
- ✅ Production-ready code (no pseudo-code)
- ✅ Proper error handling
- ✅ Well-structured and organized
- ✅ Meaningful variable names
- ✅ Code comments for complex logic
- ✅ Consistent formatting
- ✅ Type safety (TypeScript preferred)

#### Not Allowed
- ❌ Hard-coded values or test data
- ❌ Placeholder or stub implementations
- ❌ Uncommitted or incomplete work
- ❌ Copied code without attribution
- ❌ Pseudo-code as final submission
- ❌ Auto-generated or AI-only code without review

### Documentation Requirements

Each stage requires:
1. **README.md** - Setup and usage instructions
2. **Design Document** - Explanation of approach and design decisions
3. **Screenshots** - Visual evidence of working implementation
4. **Source Code** - Complete, functional implementation
5. **Commit History** - Clear progression of work

### Git Workflow

#### Setting Up Your Repository

```bash
# Clone your repository
git clone <your-repo-url>
cd afford_medical_tech

# Create a feature branch for each stage
git checkout -b stage-1-implementation
git checkout -b stage-2-frontend
```

#### Committing Work

```bash
# Commit frequently with meaningful messages
git add .
git commit -m "Stage 1: Implement API client module"
git commit -m "Stage 1: Add priority calculation logic"
git commit -m "Stage 1: Complete notification system with tests"

# Push to remote
git push origin stage-1-implementation
```

#### Commit Message Format

```
[Stage X] Brief description of changes

- Added feature/fixed issue
- Updated documentation
- Improved performance

Closes #issue-number (if applicable)
```

### File Organization

```
afford_medical_tech/
├── README.md
├── CONTRIBUTING.md
├── Stage_1/
│   ├── README.md
│   ├── Notification_System_Design.md
│   ├── solution.[language]
│   ├── [supporting files]
│   └── screenshots/
├── Stage_2/
│   ├── README.md
│   ├── frontend/
│   │   ├── src/
│   │   ├── public/
│   │   ├── package.json
│   │   └── [React/Next.js files]
│   └── screenshots/
└── .dist/
```

## Development Workflow

### Before You Start

1. Read the complete deliverable requirements
2. Understand the API and data format
3. Plan your approach
4. Document your design decisions

### During Development

1. Work on feature branches
2. Commit frequently with meaningful messages
3. Test your code thoroughly
4. Write clear code with comments
5. Follow language/framework conventions

### Before Submission

1. Verify all requirements are met
2. Test on real data from the API
3. Ensure code is production-quality
4. Write comprehensive documentation
5. Capture screenshots of working app
6. Perform final code review
7. Push all commits to GitHub

## Code Review Checklist

Before submitting your work:

- [ ] Code compiles/runs without errors
- [ ] No console warnings or errors
- [ ] All features implemented
- [ ] Code is well-commented
- [ ] Follows language conventions
- [ ] Error handling implemented
- [ ] Documentation is complete
- [ ] Screenshots are clear and relevant
- [ ] Git history is clean and meaningful
- [ ] No sensitive information in code

## Naming Conventions

### Variables and Functions
```javascript
// camelCase for variables and functions
const notificationList = [];
function calculatePriority() {}

// UPPER_CASE for constants
const API_ENDPOINT = 'http://...';
const MAX_NOTIFICATIONS = 10;
```

### Classes and Components
```typescript
// PascalCase for classes and components
class NotificationManager {}
function NotificationItem() {}
```

### Files and Folders
```
// kebab-case for files and folders
notification-item.tsx
api-service.ts
Stage_1/  // Use descriptive stage names
```

## Testing Requirements

### Unit Tests (Recommended)
- Test core algorithms
- Test edge cases
- Test error conditions

### Integration Tests (Recommended)
- Test API integration
- Test complete workflows
- Test with real data

### Manual Testing (Required)
- Test on real API
- Test all features
- Test on different devices/screen sizes
- Document test results in screenshots

## Documentation Standards

### Code Comments
```javascript
// Use for single-line explanations
const priority = type === 'Placement' ? 100 : 50; // Higher weight for placements

/**
 * Calculate notification priority based on type and timestamp
 * @param {Object} notification - The notification object
 * @param {string} notification.Type - Type of notification
 * @param {string} notification.Timestamp - Timestamp string
 * @returns {number} Priority score (0-100)
 */
function calculatePriority(notification) {
  // Implementation
}
```

### README Format
- Clear project description
- Setup instructions
- Usage examples
- API documentation
- File structure explanation
- Troubleshooting guide

### Design Document Format
- Problem statement
- Solution overview
- Algorithm explanation
- Data flow diagrams
- Implementation details
- Complexity analysis
- Design decisions with rationale

## Handling Issues

### If You Get Stuck

1. Review the requirements again
2. Check the API documentation
3. Look at example responses
4. Test with simple cases first
5. Break down complex problems

### Not Allowed

- ❌ Asking peers for help
- ❌ Copying code from others
- ❌ Using AI to generate entire solutions
- ❌ Consulting team members
- ❌ Sharing approaches with peers

### Acceptable Help

- ✅ Reading official documentation
- ✅ Using StackOverflow for language syntax
- ✅ Checking framework documentation
- ✅ Reviewing your own notes
- ✅ Learning from public tutorials (then applying independently)

## Security Considerations

### Sensitive Information

Never commit:
- API keys or credentials
- Passwords or tokens
- Private configuration files
- Sensitive user data

Use environment variables:
```javascript
const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
const API_KEY = process.env.REACT_APP_API_KEY;
```

### .gitignore Requirements

```
node_modules/
.env
.env.local
.DS_Store
*.log
build/
dist/
.dist/
```

## Performance Considerations

### Code Optimization
- Minimize API calls
- Optimize sorting algorithms
- Cache data appropriately
- Use efficient data structures
- Profile for bottlenecks

### Frontend Performance
- Lazy load components
- Optimize bundle size
- Use code splitting
- Implement pagination
- Cache API responses

## Accessibility

### Requirements
- Semantic HTML
- ARIA labels where appropriate
- Keyboard navigation support
- Sufficient color contrast
- Alt text for images

### Testing
- Test with keyboard only
- Test with screen reader
- Verify color contrast
- Test mobile accessibility

## Stage-Specific Guidelines

### Stage 1: Priority Inbox System
- Focus on algorithm correctness
- Optimize for efficiency
- No UI needed
- Document approach clearly
- Test with real API data

### Stage 2: Frontend
- Ensure responsive design
- Use only Material UI for styling
- Test on multiple devices
- Implement proper error handling
- Optimize user experience

## Questions & Support

For questions about:
- **Requirements**: Refer to the deliverables document
- **API**: Use the endpoint and examples provided
- **Technical Issues**: Check documentation and frameworks
- **General Guidance**: Review this CONTRIBUTING.md file

## Final Checklist

Before pushing to GitHub:
- [ ] All requirements met
- [ ] Code reviewed and tested
- [ ] Documentation complete
- [ ] Screenshots captured
- [ ] Commit history clean
- [ ] No sensitive data
- [ ] Works from fresh clone
- [ ] Ready for evaluation

---

**Last Updated**: May 2, 2026  
**Version**: 1.0
