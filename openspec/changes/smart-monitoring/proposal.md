# Smart Monitoring (Phase 2)

## Summary

Add intelligent monitoring capabilities: configuration drift detection and alert aggregation. These features help operations teams proactively identify issues and centralize alert management.

## Motivation

- Configuration drift is a silent killer — servers gradually deviate from baseline without anyone noticing
- Alert fatigue from multiple sources makes real issues easy to miss
- Operations teams need a unified view of system health

## Scope

### Configuration Drift Detection
- Monitor specified config files for changes (hash comparison)
- Store baseline snapshots, detect deviations
- Visual diff when drift is detected
- Drift history timeline

### Alert Aggregation
- Centralized alert dashboard
- Multiple severity levels (critical, warning, info)
- Alert rules definition (threshold-based)
- Alert deduplication and grouping
- Alert history and acknowledgment

## Non-Goals
- Real-time agent-based monitoring (out of scope)
- Auto-remediation (future phase)
- Integration with external monitoring systems (future)

## Success Criteria
- User can add config files to monitor and see drift status
- User can view all alerts in one place
- User can define simple threshold-based alert rules
