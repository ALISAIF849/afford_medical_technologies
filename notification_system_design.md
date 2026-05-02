# Notification System Design

## Overview

This repository implements a campus notification system that prioritizes Placement, Result, and Event updates by type and recency.

## Priority Logic

- Placement notifications receive the highest type weight.
- Result notifications receive medium weight.
- Event notifications receive lower weight.
- More recent notifications receive a higher recency score.

## Delivery Structure

- Stage_1 contains the backend priority-inbox design and implementation guidance.
- Stage_2/frontend contains the React frontend that displays filters, priority ranking, and notification details.

## Rendering Strategy

- Show a visible dashboard immediately.
- Fall back to demo notifications when the API returns no data.
- Keep the UI responsive and accessible across screen sizes.

## Logging Strategy

- Centralize request logging in the API client.
- Log request, response, and error states to help debug connectivity issues.
