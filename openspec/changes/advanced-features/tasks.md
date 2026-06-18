# Tasks

## 1. Knowledge Base (KEDB) - Frontend

- [x] 1.1 Create /kedb page layout with search and list
- [x] 1.2 Create KnowledgeEntryCard component (display entry)
- [x] 1.3 Create KnowledgeEntryForm component (add/edit entry)
- [x] 1.4 Create /api/kedb GET/POST/PUT/DELETE API routes
- [x] 1.5 Add KEDB navigation link to sidebar

## 2. Runbook Automation - Frontend

- [x] 2.1 Create /runbooks page layout with list
- [x] 2.2 Create RunbookCard component (display runbook)
- [x] 2.3 Create RunbookEditor component (step-by-step workflow builder)
- [x] 2.4 Create RunbookExecutor component (run with confirmation)
- [x] 2.5 Create /api/runbooks GET/POST/PUT/DELETE API routes
- [x] 2.6 Create /api/runbooks/execute POST route
- [x] 2.7 Add Runbooks navigation link to sidebar

## 3. Audit Logging

- [x] 3.1 Add AuditLog model to Prisma schema
- [x] 3.2 Add inline migration for AuditLog table in server.ts
- [x] 3.3 Create /api/audit GET route (list with filters)
- [x] 3.4 Create /api/audit/export GET route (CSV export)
- [x] 3.5 Create /audit page with log viewer
- [x] 3.6 Add audit logging middleware helper
- [x] 3.7 Add Audit navigation link to sidebar

## 4. AI Enhancement

- [x] 4.1 Create /api/ai/diagnose POST route (symptom → suggestions)
- [x] 4.2 Create /api/ai/config-recommend POST route (needs → config)
- [x] 4.3 Create /api/ai/query POST route (natural language → answer)
- [x] 4.4 Create AIDiagnosePanel component (diagnostic suggestions)
- [x] 4.5 Create AIConfigPanel component (config recommendations)
- [x] 4.6 Integrate AI panels into existing pages

## 5. Batch Operations

- [x] 5.1 Create /batch page layout with server group selector
- [x] 5.2 Create BatchCommander component (execute commands on multiple servers)
- [x] 5.3 Create BatchResult component (show results per server)
- [x] 5.4 Create /api/batch/execute POST route
- [x] 5.5 Add Batch navigation link to sidebar

## 6. Certificate Monitoring

- [x] 6.1 Add CertMonitor model to Prisma schema
- [x] 6.2 Add inline migration for CertMonitor table in server.ts
- [x] 6.3 Create /api/certs GET/POST/DELETE API routes
- [x] 6.4 Create /api/certs/check POST route (check certificate status)
- [x] 6.5 Create /certs page layout with cert list
- [x] 6.6 Create CertCard component (certificate details)
- [x] 6.7 Create AddCertModal component
- [x] 6.8 Integrate cert expiration alerts into alert system
- [x] 6.9 Add Certs navigation link to sidebar

## 7. Build & Deploy

- [ ] 7.1 Build test
- [ ] 7.2 Deploy to production
