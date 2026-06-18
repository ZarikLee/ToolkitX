# Smart Monitoring - Design

## Architecture

### Configuration Drift Detection

```
┌─────────────────────────────────────────┐
│           Drift Detection               │
├─────────────────────────────────────────┤
│                                         │
│  Config Files ──→ Hash Comparison       │
│       │              │                  │
│       ▼              ▼                  │
│  Baseline DB    Drift Detected?         │
│       │              │                  │
│       │         Yes  │  No              │
│       │          │   │                  │
│       ▼          ▼   ▼                  │
│  Store New    Alert + Diff View         │
│  Baseline     Store Drift Record        │
│                                         │
└─────────────────────────────────────────┘
```

**Storage:**
- `ConfigBaseline` model: stores file path, content hash, last checked time
- `ConfigDrift` model: stores drift records (before/after hashes, detected time)

**Detection Logic:**
1. User adds config file path to monitor
2. System reads file, computes SHA-256 hash
3. Compares with stored baseline
4. If different → record drift, store diff, trigger alert

### Alert Aggregation

```
┌─────────────────────────────────────────┐
│           Alert System                  │
├─────────────────────────────────────────┤
│                                         │
│  Sources:                               │
│  ├── Config Drift Detection             │
│  ├── Alert Rules (threshold-based)      │
│  └── Manual Alerts                      │
│       │                                 │
│       ▼                                 │
│  Alert Pipeline                         │
│  ├── Deduplication (same source+type)   │
│  ├── Grouping (by severity)             │
│  └── Priority Assignment                │
│       │                                 │
│       ▼                                 │
│  Alert Dashboard                        │
│  ├── Active Alerts (by severity)        │
│  ├── Alert History                      │
│  └── Acknowledge/Resolve                │
│                                         │
└─────────────────────────────────────────┘
```

**Storage:**
- `AlertRule` model: name, condition, threshold, severity, enabled
- `AlertEvent` model: rule_id, message, severity, status (active/acknowledged/resolved), timestamps

**Alert Rules:**
- Simple threshold-based: CPU > 90% for 5 minutes, disk > 85%, etc.
- Config drift: automatic alert on drift detection

## Components

### New Pages
- `/monitor` — Alert dashboard (reuses existing monitor page structure)
- `/drift` — Configuration drift detection page

### New API Routes
- `/api/drift` — CRUD for monitored configs and drift records
- `/api/alerts` — CRUD for alerts and alert rules

### New Database Models
- `ConfigBaseline` — monitored file baselines
- `ConfigDrift` — drift detection records
- `AlertRule` — alert rule definitions
- `AlertEvent` — alert event records

## UI Design

### Drift Detection Page
- Left: list of monitored config files with status indicators (green/yellow/red)
- Right: selected file details, drift history timeline, diff view

### Alert Dashboard
- Top: severity summary cards (critical/warning/info counts)
- Middle: active alerts list with acknowledge/resolve buttons
- Bottom: alert history with filters

## Decisions

- **Polling-based**: Check configs every N minutes (configurable), not real-time
- **Server-side file reading**: Use Node.js fs module, no agent needed
- **Hash comparison**: SHA-256 for integrity check, full diff for visualization
- **Existing AlertEvent model**: Reuse the existing model from Prisma schema
