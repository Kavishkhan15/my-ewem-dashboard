# Original User Request

## 2026-10-12T19:41:07Z

Use a very large team of agents.

Build RECLAIM MAGNUM — the complete, original, premium E-Waste Intelligence & Management Studio web application using Next.js App Router, TypeScript strict, Tailwind CSS, Lucide icons, and accessible Radix primitives. Grounded in the authoritative 14-assignment EW/EM seed data, featuring dual-truth status tracking, secure evidence vault, research analytics lab, course timeline, faculty showcase, keyboard presentation mode, and verified local-first persistence with schema-validated JSON backup/import.

Working directory: /home/anonymous/EWEM-dashboard/RECLAIM
Integrity mode: development

## Requirements

### R1. Complete 9-Route Web Application Architecture & Visual System
- Deliver an original, premium research-observatory dark/light visual system per `DESIGN.md` (dark graphite `#0B1110`, elevated `#151D1A`, text `#EFF5EF`, accents emerald `#32CF89`, electric lime `#C4F46D`, cyan `#79CFDA`, amber warnings).
- Implement responsive app shell and all 9 navigable routes:
  1. `/` — Command Center: 14 records summary, 13 observed portal badges, actionable review queue, exact category distribution (4 Data, 3 Technical, 4 Research, 2 Innovation, 1 Administrative), activity chronology strip.
  2. `/assignments` — Assignment Library: searchable, filterable (category, observed badge, work status), sortable, list/grid toggle, accessible multi-state badges.
  3. `/assignments/[id]` — Assignment Workbench: raw `portalTitle`, clean `displayTitle`, dual-truth status editor, requirements placeholder, checklist/task management, evidence placeholders, publication toggle.
  4. `/analytics` — Research & Data Lab: source-grounded analytic notebook with truthful "Awaiting source dataset" states, structured metadata (source, unit, period, method), and verifiable demo metrics when dataset is attached.
  5. `/timeline` — Course Chronology: 14 chronological portal activity dates (July–October 2026), separate user-confirmed deadlines, July 28 same-day distinct ordering.
  6. `/library` — Evidence Vault: assignment-linked uploads, safe file handling (PDF, image, text, CSV), download fallbacks, size/type validation, zero arbitrary code execution.
  7. `/showcase` — Faculty Showcase: curated, read-only view displaying strictly published coursework items. Zero leakage of unverified or private drafts.
  8. `/presentation` — Faculty Presentation Mode: full-screen, keyboard-navigable (`Left`/`Right`/`Esc`), slide progress, projector-scale typography, citation footer.
  9. `/settings` — Settings & Data Management: theme toggle (dark/light/system), local storage transparency, profile/course metadata placeholders, validated JSON backup export and import with recovery.

### R2. Authoritative Data Integrity & Dual-Truth State Machine
- Ingest exact 14 assignment records from `data/assignments.seed.json` without alteration of IDs (`EW-01` to `EW-14`), portal dates, or raw titles.
- Strict 4-dimension truth model:
  - `portalBadgeObserved`: `false` for `EW-01`, `true` for `EW-02..EW-14` (`portalBadgeText: 'Turned in'`).
  - `actualSubmissionStatus`: default `'unverified'` for all 14.
  - `workStatus`: default `'not_reviewed'` for all 14.
  - `qualityStatus`: default `'not_assessed'` for all 14.
  - `dueDate`: `null`, `grade`: `null`, `files`: `[]`, `published`: `false` for all 14.
- Ban fabricated metrics: no "13 completed", no "93% finished", no synthetic carbon/grade numbers.

### R3. Data Persistence, Portability & Privacy Guardrails
- Local-first persistence using browser storage adapter with explicit device-local indicators.
- Validated JSON backup export and import round-trip with schema checking.
- Absolute isolation: zero reference student identifying data or private coursework in application bundles.
- Read-only showcase enforcement ensuring unpublished items remain private.

### R4. Automated Verification & Quality Gates
- Codebase must pass strict typechecking (`npm run typecheck` or `tsc --noEmit`), linting (`npm run lint`), unit/integration test suite (`npm test`), and production build (`npm run build`).
- Independent QA verification across mobile (390px), tablet (768px), and desktop (1280px/1440px) viewports with dark and light theme validation.
- Delivery of comprehensive audit documentation: `README.md`, `docs/IMPLEMENTATION_PLAN.md`, `docs/CAPABILITIES.md`, `docs/AGENT_LEDGER.md`, `docs/DECISIONS.md`, `docs/TEST_REPORT.md`, `docs/PRIVACY_AND_LIMITATIONS.md`.

## Acceptance Criteria

### Data & Architecture Integrity
- [ ] Exactly 14 assignment records loaded with chronological IDs `EW-01` through `EW-14` and raw titles matching `data/assignments.seed.json`.
- [ ] Initial state truthfully reflects 13 observed portal badges and 0 verified completed submissions.
- [ ] All 9 planned routes render without runtime exceptions or missing assets.

### Interaction & Persistence
- [ ] Assignment search, category filter, and status filters filter the 14 records in real-time.
- [ ] Assignment Workbench edits (work status, quality status, checklist toggles, notes, published flag) persist across browser reloads.
- [ ] JSON backup export generates valid schema-compliant file; importing valid backup restores application state cleanly.
- [ ] Showcase route displays only items explicitly marked `published = true`; unverified assignments remain hidden.
- [ ] Presentation mode navigates slides via arrow keys and exits cleanly with Escape.

### Engineering & Verification Gates
- [ ] TypeScript strict mode compiles with zero type errors (`tsc --noEmit`).
- [ ] Unit and component tests pass without errors.
- [ ] Production build succeeds (`npm run build`) and generates standalone client/server output.
- [ ] Browser testing confirms layout stability and zero horizontal overflow at 390px, 768px, and 1280px.
- [ ] Complete documentation suite written in `docs/` and root `README.md`.

## 2026-10-12T19:42:07Z

Please continue execution of the RECLAIM MAGNUM project according to the plan. Proceed with creating the required files, scaffolding the Next.js application, implementing domain models, visual system, all 9 routes, and verification.
