# Tasks

## 1. Database Models

- [x] 1.1 Add ConfigBaseline model to Prisma schema
- [x] 1.2 Add ConfigDrift model to Prisma schema
- [x] 1.3 Add AlertRule model to Prisma schema
- [x] 1.4 Add inline migration for new tables in server.ts

## 2. Configuration Drift - API

- [x] 2.1 Create /api/drift GET - list monitored configs with drift status
- [x] 2.2 Create /api/drift POST - add config file to monitor
- [x] 2.3 Create /api/drift DELETE - remove config from monitoring
- [x] 2.4 Create /api/drift POST (check) - trigger drift check for a config
- [x] 2.5 Create /api/drift/history GET - get drift history for a config

## 3. Configuration Drift - Frontend

- [x] 3.1 Create /drift page layout
- [x] 3.2 Create ConfigDriftList component (left panel, file list with status)
- [x] 3.3 Create ConfigDriftDetail component (right panel, diff view)
- [x] 3.4 Create AddConfigModal component (add file path to monitor)
- [x] 3.5 Create DriftTimeline component (drift history visualization)

## 4. Alert System - API

- [x] 4.1 Create /api/alerts GET - list alerts with filters
- [x] 4.2 Create /api/alerts POST - create manual alert
- [x] 4.3 Create /api/alerts PUT - acknowledge/resolve alert
- [x] 4.4 Create /api/alerts DELETE - delete alert
- [x] 4.5 Create /api/alert-rules GET - list alert rules
- [x] 4.6 Create /api/alert-rules POST - create alert rule
- [x] 4.7 Create /api/alert-rules PUT - update alert rule
- [x] 4.8 Create /api/alert-rules DELETE - delete alert rule

## 5. Alert System - Frontend

- [x] 5.1 Update /monitor page with alert dashboard layout
- [x] 5.2 Create AlertSummaryCards component (severity counts)
- [x] 5.3 Create AlertList component (active alerts with actions)
- [x] 5.4 Create AlertHistory component (past alerts with filters)
- [x] 5.5 Create AlertRuleManager component (CRUD for rules)
- [x] 5.6 Create AddAlertRuleModal component

## 6. Integration

- [x] 6.1 Auto-generate alert on config drift detection
- [x] 6.2 Add drift status indicator to navigation
- [x] 6.3 Add alert count badge to navigation

## 7. Build & Deploy

- [ ] 7.1 Build test
- [ ] 7.2 Deploy to production
