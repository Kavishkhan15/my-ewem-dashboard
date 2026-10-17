# Project: RECLAIM MAGNUM

## Architecture
- Framework: Next.js 15 App Router with TypeScript strict mode, Tailwind CSS, Lucide icons, accessible Radix primitives, Recharts.
- Design System: Research-observatory theme per DESIGN.md (dark graphite `#0B1110`, elevated surface `#151D1A`, text `#EFF5EF`, emerald `#32CF89`, electric lime `#C4F46D`, cyan `#79CFDA`, amber `#F2BC6E`, danger `#F48F87`).
- Data Engine: Local-first reactive storage (`StorageContext.tsx`) with schema-validated JSON backup export/import, backing 14 authoritative EW/EM assignments with four orthogonal truth dimensions.
- Security & Privacy: Zero student identifying data or private coursework in bundles; read-only showcase showing strictly `published === true` items; sanitized uploads without arbitrary execution.

## Code Layout
- `src/types/`: Domain contracts (`domain.ts`), global declarations (`global.d.ts`). Owned by M1.
- `src/lib/storage/`: Seed data loader (`seedData.ts`), persistence & reactive context (`StorageContext.tsx`). Owned by M1.
- `src/components/shell/`: Global navigation and layout shell (`AppShell.tsx`).
- `src/components/ui/`: Shared accessible primitives (`primitives.tsx`).
- `src/app/page.tsx`: Route `/` (Command Center). Owned by M2.
- `src/app/assignments/page.tsx`: Route `/assignments` (Assignment Library). Owned by M2.
- `src/app/assignments/[id]/page.tsx`: Route `/assignments/[id]` (Assignment Workbench). Owned by M2.
- `src/app/analytics/page.tsx`: Route `/analytics` (Research & Data Lab). Owned by M3.
- `src/app/timeline/page.tsx`: Route `/timeline` (Course Chronology). Owned by M3.
- `src/app/library/page.tsx`: Route `/library` (Evidence Vault). Owned by M3.
- `src/app/showcase/page.tsx`: Route `/showcase` (Faculty Showcase). Owned by M4.
- `src/app/presentation/page.tsx`: Route `/presentation` (Faculty Presentation Mode). Owned by M4.
- `src/app/settings/page.tsx`: Route `/settings` (Settings & Data Management). Owned by M4.
- `tests/`: Automated unit and integration tests. Owned by E2E Testing Track / M5.
- `docs/`: Comprehensive architecture and audit documentation. Owned by M5.

## Feature Inventory
| # | Feature | Description | Milestone | Source |
|---|---------|-------------|-----------|--------|
| 1 | Authoritative 14-Assignment Seed Ingestion | 14 records `EW-01`..`EW-14`, raw portal titles, display titles, 4 truth dimensions | M1 | Survey |
| 2 | Build & TypeScript Fixes | Declare CSS imports in `global.d.ts`, fix seed import path and strict types | M1 | Survey |
| 3 | Linting Configuration | `.eslintrc.json` configured for non-interactive `npm run lint` | M1 | Survey |
| 4 | Vitest Setup | `vitest.config.ts` configured with jsdom, react plugin, and path aliases | M1 | Survey |
| 5 | Storage Context & Backup Validation | Backup import validates `EW-01`..`EW-14`, restores `analyticsMetrics` | M1 | Survey |
| 6 | Command Center (`/`) | 14 summary, 13 observed badges, 0 verified complete, 4/3/4/2/1 categories, review queue | M2 | Survey |
| 7 | Assignment Library (`/assignments`) | Real-time search, filters (category, badge, status), sort with July 28 tie-breaker | M2 | Survey |
| 8 | Assignment Workbench (`/assignments/[id]`) | Dual-truth status editor, checklist management, notes, publication toggle | M2 | Survey |
| 9 | Research & Data Lab (`/analytics`) | Analytical notebook with "Awaiting source dataset" states, structured metadata | M3 | Survey |
| 10 | Course Chronology (`/timeline`) | 14 portal activity dates, July 28 distinct order, user-confirmed deadlines | M3 | Survey |
| 11 | Evidence Vault (`/library`) | Assignment-linked uploads, safe file handling (PDF/img/txt/csv), download fallbacks | M3 | Survey |
| 12 | Faculty Showcase (`/showcase`) | Curated, read-only view displaying strictly published coursework, zero draft leakage | M4 | Survey |
| 13 | Faculty Presentation (`/presentation`) | Full-screen, keyboard navigation (`ArrowLeft`, `ArrowRight`, `Escape`), slide progress | M4 | Survey |
| 14 | Settings & Portability (`/settings`) | Theme toggle, local storage transparency, profile placeholders, JSON backup round-trip | M4 | Survey |
| 15 | E2E Test Suite (Tiers 1-4) | Opaque-box requirement-driven tests covering all features and boundaries | E2E Track | Survey |
| 16 | Cross-Cutting Verification | Responsive checks (390, 768, 1280, 1440px), WCAG 2.2 AA accessibility, security review | M5 | Survey |
| 17 | Comprehensive Documentation | `README.md`, `docs/IMPLEMENTATION_PLAN.md`, `AGENT_LEDGER.md`, `DECISIONS.md`, etc. | M5 | Survey |
| 18 | Forensic Integrity Audit | Independent verification of zero-fabrication and authenticity | M5 | Survey |

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| M1 | Foundation, Contracts & Build Pipeline | Types, seed loader, storage adapter, build & lint configs | none | READY |
| M2 | Core Workspaces & Assignment Management | `/`, `/assignments`, `/assignments/[id]` | M1 | PENDING |
| M3 | Research Lab, Timeline & Evidence Vault | `/analytics`, `/timeline`, `/library` | M1 | PENDING |
| M4 | Presentation, Showcase & Settings | `/showcase`, `/presentation`, `/settings` | M1 | PENDING |
| M5 | Final Integration, QA & Documentation | E2E pass, responsive/a11y/security QA, audit docs, forensic audit | M2, M3, M4, E2E Track | PENDING |
| E2E | E2E Testing Track | Comprehensive requirement-driven opaque-box test suite (Tiers 1-4) | none | READY |

## Interface Contracts

### StorageContext ↔ All Routes
```typescript
interface StorageContextValue {
  assignments: Assignment[];
  profile: StudentProfile;
  analyticsMetrics: AnalyticsMetric[];
  updateAssignment: (id: string, updates: Partial<Assignment>) => void;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  updateMetric: (id: string, updates: Partial<AnalyticsMetric>) => void;
  resetToSeed: () => void;
  exportBackup: () => string;
  importBackup: (jsonString: string) => { success: boolean; error?: string };
}
```

### Assignment Domain Contract (`src/types/domain.ts`)
```typescript
interface Assignment {
  id: string; // 'EW-01' through 'EW-14'
  portalActivityDate: string; // YYYY-MM-DD
  portalTitle: string; // verbatim raw portal string
  displayTitle: string; // cleaned human title
  category: AssignmentCategory;
  portalBadgeObserved: boolean; // false for EW-01, true for EW-02..EW-14
  portalBadgeText: string | null; // 'Turned in' when observed
  actualSubmissionStatus: 'unverified' | 'submitted_draft' | 'submitted_final' | 'verified_complete';
  workStatus: 'not_reviewed' | 'in_progress' | 'needs_revision' | 'ready_for_review';
  qualityStatus: 'not_assessed' | 'developing' | 'competent' | 'exemplary';
  dueDate: string | null;
  grade: string | null;
  published: boolean;
  notes?: string;
  checklist?: { id: string; text: string; done: boolean }[];
  files?: EvidenceFile[];
}
```
