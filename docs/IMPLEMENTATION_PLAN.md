# RECLAIM — Implementation Plan & Milestone Execution

## 1. System Overview & Technology Stack
- **Framework**: Next.js 15 App Router + React 19 + TypeScript (Strict Mode)
- **Styling**: Tailwind CSS with custom RECLAIM botanical lab tokens per `DESIGN.md`
- **Icons**: Lucide React
- **Data Persistence**: Local-first storage adapter (`localStorage`) with JSON backup/restore
- **Testing**: Vitest for unit/integration verification

## 2. Route Hierarchy & Ownership Map

```
/                            → Command Center (Overview, KPIs, Queue, Categories)
/assignments                 → Assignment Library (Search, Category/Status Filters, Grid/Table)
/assignments/[id]            → Assignment Workbench (Dual-Truth Editor, Tasks, Notes, Publish)
/analytics                   → Research & Analytics Lab (Awaiting-Data Panels, Provenance)
/timeline                    → Course Chronology (July–October 2026 Chronology)
/library                     → Evidence Vault (File Uploads, Sandbox Validation, MIME detection)
/showcase                    → Faculty Showcase (Curated, Read-Only Published Items)
/presentation                → Faculty Presentation Mode (Keyboard-Operated Projector View)
/settings                    → Settings & Data Portability (Themes, Backup Export/Import)
```

## 3. Wave Execution Milestones

- [x] **Wave 0 — Inspection & Capability Census**: Audited repository, verified 14-record seed, discovered MCP (`browsermcp`) and local skills.
- [x] **Wave 1 — Scaffolding & Contracts**: Scaffolding with TypeScript strict, Tailwind tokens, `src/types/domain.ts`, and responsive `AppShell`.
- [x] **Wave 2 — Parallel Route Construction**: Delivered all 9 functional routes, dual-truth status engine, local persistence context, and keyboard presentation view.
- [x] **Wave 3 — Integration & Cross-Module Binding**: Bound storage context across all pages, connected assignment file linkages to vault, and validated seed ingestion.
- [x] **Wave 4 — Adversarial Testing & Verification**: Ran `typecheck`, `test`, `build`, and HTTP route verification against live production server (`http://localhost:3000`). All passed.
- [x] **Wave 5 — Documentation & Delivery**: Created `TEST_REPORT.md`, `DECISIONS.md`, `PRIVACY_AND_LIMITATIONS.md`, `CAPABILITIES.md`, and updated `README.md`.
