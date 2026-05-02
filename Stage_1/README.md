# Stage 1: Priority Inbox System

## Objective

Implement a backend service that fetches notifications from the provided API and maintains a priority-based inbox that always displays the top 10 most important unread notifications.

## Requirements

### Functional Requirements
- Fetch notifications from the Notification API endpoint
- Implement priority calculation based on:
  - **Weight**: Placement > Result > Event (higher weight = higher priority)
  - **Recency**: Newer notifications have higher priority
- Return the top 10 most important unread notifications
- Maintain efficiency as new notifications continuously arrive

### Non-Functional Requirements
- Write production-quality, functional code (not pseudo-code)
- Do NOT store notifications in a database
- Do NOT hard-code or manually create notifications
- Use only the provided API to fetch notifications
- Code should be clean, well-organized, and maintainable

## Notification API

### Endpoint
```
GET http://20.207.122.201/evaluation-service/notifications
```

### Constraints
- This is a protected route
- Query parameters: `limit`, `page`, `notification_type`

### Notification Types
- `"Event"` - Low priority
- `"Result"` - Medium priority
- `"Placement"` - High priority

### Response Format
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

## Implementation Strategy

### Step 1: API Integration
- Create a module to fetch notifications from the API
- Handle authentication/protected route requirements
- Implement pagination if needed

### Step 2: Priority Calculation
Define a scoring system that considers:
- Notification type weight (Placement > Result > Event)
- Time since notification (recency)
- Combine weights to create final priority score

### Step 3: Maintain Top 10
- Implement efficient filtering algorithm
- Keep track of viewed vs unviewed notifications
- Update as new notifications arrive

### Step 4: Output
- Return sorted list of top 10 notifications
- Display with priority ranking
- Include all notification details

## Deliverables

1. **Solution File** (`solution.[language]`)
   - Working implementation in your chosen language
   - Main entry point should be clearly marked
   - Include inline documentation

2. **Design Document** (`Notification_System_Design.md`)
   - Explanation of priority algorithm
   - Data flow diagram (text or ASCII art)
   - Complexity analysis
   - Design decisions and rationale
   - How new notifications are handled
   - Efficiency approach

3. **Screenshots**
   - Place in `screenshots/` folder
   - Evidence of code running successfully
   - Console output showing top 10 notifications
   - Multiple test runs if possible

## Language Choices

You may implement in any language of your choice. Popular options:
- **Python**: Quick to implement, good for data processing
- **JavaScript/TypeScript**: If you prefer Node.js
- **Java**: Enterprise approach
- **Go**: Performance-focused
- **Rust**: Systems programming approach
- **C++**: Performance-critical

## Example Output Format

```
Priority Inbox - Top 10 Notifications
=====================================

1. [Priority Score: 95] [Placement] CSX Corporation hiring - 2026-04-22 17:51:18
2. [Priority Score: 92] [Placement] Advanced Micro Devices Inc. hiring - 2026-04-22 17:49:42
3. [Priority Score: 88] [Result] mid-sem - 2026-04-22 17:51:30
4. [Priority Score: 85] [Event] tech-fest - 2026-04-22 17:50:06
5. [Priority Score: 82] [Result] project-review - 2026-04-22 17:50:42
...
```

## Testing Checklist

- [ ] API connection successful
- [ ] Notifications fetched correctly
- [ ] Priority sorting works as expected
- [ ] Top 10 notifications returned
- [ ] Handles multiple notification types
- [ ] Efficient with large datasets
- [ ] Clear and readable output
- [ ] Screenshots captured and saved

## File Structure

```
Stage_1/
├── README.md                    # This file
├── Notification_System_Design.md
├── solution.[language]          # Your implementation
├── screenshots/
│   ├── output_1.png
│   ├── output_2.png
│   └── ...
└── [other files as needed]
```

## Tips for Success

1. **Understand the Algorithm First**
   - Clearly define your priority calculation
   - Document the formula before coding

2. **Test with Real Data**
   - Use actual API responses
   - Test with different notification types
   - Verify priority sorting

3. **Write Clear Code**
   - Use meaningful variable names
   - Add comments for complex logic
   - Structure with functions/classes

4. **Design for Scale**
   - Consider efficiency as notifications grow
   - Optimize for retrieval speed
   - Plan for real-time updates

5. **Document Thoroughly**
   - Explain your approach
   - Include examples
   - Show your thinking process

## Submission Checklist

Before submitting, ensure:
- [ ] Code is complete and working
- [ ] No pseudo-code, only production-ready implementation
- [ ] `Notification_System_Design.md` is detailed and clear
- [ ] Screenshots show working output
- [ ] All files are in this directory
- [ ] Ready to be committed to GitHub

## Next Steps

1. Choose your programming language
2. Create `solution.[language]` file
3. Implement API integration
4. Build priority algorithm
5. Test and refine
6. Create `Notification_System_Design.md`
7. Take screenshots
8. Commit to GitHub

---

**Evaluation Criteria**:
- Code quality and efficiency (40%)
- Correct priority calculation (30%)
- Documentation and design explanation (20%)
- Screenshots and evidence (10%)
