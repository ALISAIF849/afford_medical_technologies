# Notification System Design Document

## Table of Contents
1. [Overview](#overview)
2. [Algorithm Design](#algorithm-design)
3. [Data Flow](#data-flow)
4. [Implementation Details](#implementation-details)
5. [Complexity Analysis](#complexity-analysis)
6. [Design Decisions](#design-decisions)
7. [Testing Strategy](#testing-strategy)

## Overview

This document describes the design and implementation of a priority-based notification inbox system that efficiently maintains the top 10 most important notifications from a campus notification API.

### Problem Statement

The campus notification system receives a high volume of notifications regarding placements, events, and results. Users need a priority inbox that automatically displays the 10 most important unread notifications based on:
- Notification type importance
- Temporal recency

### Solution Summary

[Add your solution summary here after implementation]

## Algorithm Design

### Priority Calculation Formula

**Priority Score = (Type Weight × 30) + (Recency Score × 70)**

#### Type Weights
- Placement: 100
- Result: 66
- Event: 33

#### Recency Score Calculation
[Describe your recency calculation here]

### Pseudocode Structure

```
function getPriority10Notifications(allNotifications):
    for each notification in allNotifications:
        calculate priority score
        mark if unviewed
    
    filter unviewed notifications
    sort by priority score descending
    return top 10
```

## Data Flow

### System Architecture

```
[Notification API]
        ↓
  [API Client Module]
        ↓
  [Priority Calculator]
        ↓
  [Sorting Engine]
        ↓
  [Top 10 Filter]
        ↓
   [Output Display]
```

### Process Flow

1. **Fetch Phase**: Retrieve notifications from API
2. **Parse Phase**: Extract relevant fields
3. **Score Phase**: Calculate priority for each notification
4. **Filter Phase**: Keep only unviewed notifications
5. **Sort Phase**: Order by priority descending
6. **Limit Phase**: Select top 10
7. **Display Phase**: Output formatted results

## Implementation Details

### Key Components

#### 1. API Client
- Handles authentication for protected route
- Manages pagination if needed
- Error handling and retries
- Caching strategy (if applicable)

#### 2. Priority Calculator
- Encapsulates scoring logic
- Handles all notification types
- Validates timestamp formats
- Applies weight calculations

#### 3. Notification Manager
- Maintains current notification list
- Tracks viewed/unviewed status
- Updates with new arrivals
- Manages top 10 selection

#### 4. Output Formatter
- Formats priority scores
- Displays notification details
- Shows ranking position
- Renders in readable format

### Data Structures

[Describe the data structures you'll use here]

## Complexity Analysis

### Time Complexity

[Your analysis here]

### Space Complexity

[Your analysis here]

### Scalability Considerations

[Your scalability analysis here]

## Design Decisions

### Decision 1: [Your Decision]
- **Rationale**: [Why you chose this approach]
- **Alternatives Considered**: [Other options and why they were rejected]
- **Trade-offs**: [What you gained and what you sacrificed]

### Decision 2: Handling Real-Time Updates
- **Approach**: [How you handle continuous new notifications]
- **Efficiency**: [How you maintain efficiency as notifications arrive]

### Decision 3: Unviewed Notification Tracking
- **Approach**: [How you track which notifications are viewed]
- **Persistence**: [Whether this is in-memory or persistent]

## Testing Strategy

### Unit Tests
- Test priority calculation with known values
- Test sorting algorithm
- Test edge cases (empty list, single notification, etc.)

### Integration Tests
- Test API connection
- Test end-to-end flow
- Test with various notification types

### Test Cases

[List your test cases here]

## Example Scenarios

### Scenario 1: Mixed Notification Types
Given:
- 5 Placement notifications (timestamps vary)
- 8 Result notifications (timestamps vary)
- 10 Event notifications (timestamps vary)

Expected: Top 10 contains highest priority across all types

### Scenario 2: New Notification Arrival
Given:
- Current top 10 list
- New Placement notification with very recent timestamp

Expected: New notification may enter top 10 if priority is high enough

## Performance Optimization

### Strategies Implemented

1. **Efficient Sorting**: [Your sorting approach]
2. **Memory Management**: [How you manage memory]
3. **API Optimization**: [Pagination or batching strategy]

### Metrics

- Average calculation time: [To be filled after implementation]
- Memory usage: [To be filled after implementation]
- API calls per operation: [To be filled after implementation]

## Edge Cases Handled

- [ ] Empty notification list
- [ ] All notifications of same type
- [ ] Notifications with identical timestamps
- [ ] Missing or malformed data
- [ ] API unavailability
- [ ] Very large notification lists

## Future Enhancements

1. Database persistence for viewed status
2. User preferences for type weights
3. Batch updates for multiple new notifications
4. Notification expiration/archival
5. Multi-user support with personalization

## Conclusion

[Add your conclusion after implementation]

---

**Document Version**: 1.0  
**Last Updated**: [Date of completion]  
**Author**: [Your name]  
**Status**: [Draft/In Progress/Completed]
