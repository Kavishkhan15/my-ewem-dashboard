# RECLAIM — Data Model & Dual-Truth Seed Survey Report

**Author**: `survey_explorer_2` (Data Model & Dual-Truth Seed Specialist)  
**Date**: 2026-10-12 / 2026-10-13  
**Target Repository**: `/home/anonymous/EWEM-dashboard/RECLAIM`  
**Working Directory**: `/home/anonymous/EWEM-dashboard/RECLAIM/.agents/teamwork/survey_explorer_2/`  

---

## 1. Executive Summary

This survey provides a comprehensive audit of the assignment data models, seed dataset (`data/assignments.seed.json`), dual-truth status dimensions, category distribution, course chronology, persistence architecture, and zero-fabrication rules for the **RECLAIM — E-Waste Intelligence & Management Studio**.

### Key Findings
1. **Authoritative 14-Assignment Seed**: Exactly 14 assignment records (`EW-01` to `EW-14`) exist in `data/assignments.seed.json`. Raw portal titles (including verbatim strings like `Assignment 1_E waste Traker`) are strictly preserved alongside clean editorial display titles.
2. **Four Orthogonal Truth Dimensions**: The architecture strictly separates screenshot badge observations (13 green "Turned in" badges observed, 0 on EW-01) from verified submissions (0 of 14 verified), work status (0 of 14 reviewed), and quality status (0 of 14 assessed). Due dates, grades, and files default to `null` or empty.
3. **Category Balance**: The 14 assignments decompose into exactly **4 Data Analytics & Tracking**, **3 Technical & Recovery Processes**, **4 Research, Policy & Sustainability**, **2 Innovation & Awareness**, and **1 Assessment / Administrative** (4/3/4/2/1 distribution).
4. **Course Chronology & July 28 Tie-Break**: Portal activity dates span July 24 to October 4, 2026. A crucial same-day collision occurs on July 28, 2026 (`EW-02` E-Waste Map and `EW-03` Elemental Recovery Process), requiring deterministic secondary sorting by sequential ID. Portal activity dates must never be represented as confirmed due dates.
5. **Persistence & Portability Gaps**: The current `StorageContext.tsx` provides localStorage persistence, but `importBackup()` omits restoring `analytics` state and lacks runtime validation of assignment IDs and status enums.
6. **Verification Health**: Vitest unit test (`tests/seedIntegrity.test.ts`) passes 5/5 assertions. Strict `tsc --noEmit` fails on minor typing issues in `tests/seedIntegrity.test.ts` and `layout.tsx` CSS declarations.

---

## 2. Authoritative 14-Assignment Inventory Audit

The machine-readable seed at `data/assignments.seed.json` was inspected line-by-line against `AGENTS.md`, `references/PROJECT_BRIEF.md`, and `ORIGINAL_REQUEST.md`.

### Complete 14-Assignment Seed Register

| ID | Portal Activity Date | Exact Raw `portalTitle` | Clean `displayTitle` | Category | Observed Badge | Actual Subm. Status | Work Status | Quality Status |
|:---|:---|:---|:---|:---|:---|:---|:---|:---|
| **EW-01** | 2026-07-24 | `Toxic Chemicals_Any 5` | Toxic Chemicals — Any Five | Research, Policy & Sustainability | `false` (`null`) | `unverified` | `not_reviewed` | `not_assessed` |
| **EW-02** | 2026-07-28 | `Assignment 2_Submit the Class Activity_Map of e waste` | Assignment 2 — E-Waste Map | Technical & Recovery Processes | `true` (`Turned in`) | `unverified` | `not_reviewed` | `not_assessed` |
| **EW-03** | 2026-07-28 | `Assignment 3_Elemental Recovery Process Update` | Assignment 3 — Elemental Recovery Process | Technical & Recovery Processes | `true` (`Turned in`) | `unverified` | `not_reviewed` | `not_assessed` |
| **EW-04** | 2026-07-31 | `Assignment Zero_Check AAP` | Assignment Zero — Check AAP | Assessment / Administrative | `true` (`Turned in`) | `unverified` | `not_reviewed` | `not_assessed` |
| **EW-05** | 2026-08-02 | `Assignment 1_E waste Traker` | Assignment 1 — E-Waste Tracker | Data Analytics & Tracking | `true` (`Turned in`) | `unverified` | `not_reviewed` | `not_assessed` |
| **EW-06** | 2026-08-04 | `E waste India Vs World Data Task_Class Activity` | E-Waste: India vs World | Data Analytics & Tracking | `true` (`Turned in`) | `unverified` | `not_reviewed` | `not_assessed` |
| **EW-07** | 2026-08-11 | `Carbon Footprint Task_Excel activity Task` | Carbon Footprint — Excel Activity | Data Analytics & Tracking | `true` (`Turned in`) | `unverified` | `not_reviewed` | `not_assessed` |
| **EW-08** | 2026-08-12 | `TE CMPN C PPT_State tracker submission Folder` | State Tracker — Presentation | Data Analytics & Tracking | `true` (`Turned in`) | `unverified` | `not_reviewed` | `not_assessed` |
| **EW-09** | 2026-08-19 | `E Waste Recovery Process_Modification for Design Patent` | E-Waste Recovery — Design Patent Modification | Technical & Recovery Processes | `true` (`Turned in`) | `unverified` | `not_reviewed` | `not_assessed` |
| **EW-10** | 2026-09-02 | `Indian Companies Following E waste Rules_Comparative Study` | Indian E-Waste Rules — Company Comparison | Research, Policy & Sustainability | `true` (`Turned in`) | `unverified` | `not_reviewed` | `not_assessed` |
| **EW-11** | 2026-09-06 | `Novel Idea_E waste_Pitch Deck Submit Folder_CMPN C` | Novel E-Waste Idea — Pitch Deck | Innovation & Awareness | `true` (`Turned in`) | `unverified` | `not_reviewed` | `not_assessed` |
| **EW-12** | 2026-09-09 | `Campaign For E Waste in Campus_Class Activity` | Campus E-Waste Awareness Campaign | Innovation & Awareness | `true` (`Turned in`) | `unverified` | `not_reviewed` | `not_assessed` |
| **EW-13** | 2026-09-29 | `LEED Certification of Green Buildings in India` | LEED-Certified Buildings in India | Research, Policy & Sustainability | `true` (`Turned in`) | `unverified` | `not_reviewed` | `not_assessed` |
| **EW-14** | 2026-10-04 | `Case Studies E waste` | E-Waste Case Studies | Research, Policy & Sustainability | `true` (`Turned in`) | `unverified` | `not_reviewed` | `not_assessed` |

### Key Observations on Seed Data
- **Sequential Dashboard IDs**: `EW-01` through `EW-14`. These are internal dashboard keys and must not overwrite the university portal's original assignment naming (e.g., `Assignment Zero`, `Assignment 1`, `Assignment 2`, `Assignment 3`).
- **Verbatim Raw Strings**:
  - `EW-05` contains the exact portal typo `Assignment 1_E waste Traker` with a single 'k'. The clean display title corrects this to `Assignment 1 — E-Waste Tracker`.
  - `EW-08` contains departmental class codes `TE CMPN C PPT_State tracker submission Folder`. Clean display title is `State Tracker — Presentation`.
  - `EW-11` contains `Novel Idea_E waste_Pitch Deck Submit Folder_CMPN C`. Clean display title is `Novel E-Waste Idea — Pitch Deck`.
- **Default Baseline State**:
  - `dueDate`: `null` for all 14.
  - `grade`: `null` for all 14.
  - `published`: `false` for all 14.
  - `tasks`: `[]` for all 14.
  - `files`: `[]` for all 14.
  - `sources`: `[]` for all 14.
  - `notes`: `""` for all 14.

---

## 3. The 4 Orthogonal Truth Dimensions & Status Architecture

A core innovation of RECLAIM is decomposing the naive "done vs not done" boolean into four independent, verifiable dimensions:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        RECLAIM 4-DIMENSION TRUTH                       │
├──────────────────────────┬─────────────────────────────────────────────┤
│ 1. Portal Badge Observed │ Visual observation in screenshots (13 / 14) │
├──────────────────────────┼─────────────────────────────────────────────┤
│ 2. Actual Submission     │ Independent verification (0 / 14 verified)  │
├──────────────────────────┼─────────────────────────────────────────────┤
│ 3. Work Readiness        │ Student audit/progress stage (0 / 14 ready) │
├──────────────────────────┼─────────────────────────────────────────────┤
│ 4. Quality Assessment    │ Academic evaluation & polish (0 / 14 eval)  │
└──────────────────────────┴─────────────────────────────────────────────┘
```

### Dimension 1: Portal Screenshot Badge Observation
- **Variable**: `portalBadgeObserved: boolean` & `portalBadgeText: 'Turned in' | null`
- **Current Observation**:
  - `EW-01`: `portalBadgeObserved = false`, `portalBadgeText = null` (no green badge confirmed in portal screenshot).
  - `EW-02..EW-14`: `portalBadgeObserved = true`, `portalBadgeText = 'Turned in'` (green badge visibly present in screenshot).
  - Aggregate: **13 portal badges observed of 14**.
- **Truth Boundary**: This is an empirical record of what appeared in the portal interface. It does **not** prove submission validity, file completeness, or faculty acceptance.

### Dimension 2: Actual Submission Verification
- **Variable**: `actualSubmissionStatus`
- **Enum States**:
  - `'unverified'` — Initial baseline for all 14 records.
  - `'not_submitted'` — Confirmed that no submission exists or was recorded.
  - `'submitted'` — Independently verified submission with files or receipts.
  - `'resubmission_needed'` — Required revision requested by faculty or self-audit.
- **Initial Count**: Exactly **0 verified completed submissions**.

### Dimension 3: Work Readiness & Checklist Status
- **Variable**: `workStatus`
- **Enum States**:
  - `'not_reviewed'` — Default baseline. Files and requirements unexamined.
  - `'planned'` — Tasks defined, deliverables scoped.
  - `'in_progress'` — Active drafting or dataset analysis underway.
  - `'ready_for_review'` — Work complete, awaiting self or peer audit.
  - `'verified_complete'` — All requirements, files, and citations verified.
- **Initial Count**: Exactly **14 not reviewed**, **0 verified complete**.

### Dimension 4: Academic Quality & Grade Assessment
- **Variable**: `qualityStatus`
- **Enum States**:
  - `'not_assessed'` — Default baseline.
  - `'needs_improvement'` — Gaps in methodology, data, or formatting.
  - `'meets_requirements'` — Satisfies core coursework expectations.
  - `'polished'` — High-distinction portfolio standard.
- **Grade Field**: `grade: number | null` (must remain `null` until actual grades or scores are confirmed).

### Showcase Publication Gate
- **Variable**: `published: boolean`
- **Rule**: Controls visibility in `/showcase` and `/presentation`.
- **Default**: `false` for all 14 assignments.
- **Security Boundary**: Unverified assignments, personal reflections, and draft notes must never leak to faculty-facing views. Only records explicitly set to `published === true` are presented.

---

## 4. Category Breakdown & Curriculum Structure

The 14 coursework assignments are classified into 5 distinct categories, reflecting the interdisciplinary structure of Electronic Waste & Environmental Management (EW/EM):

```
Category Distribution (14 Total Records):
┌──────────────────────────────────────┬───────┬────────────┬────────────────────────┐
│ Category                             │ Count │ Percentage │ Assignment IDs         │
├──────────────────────────────────────┼───────┼────────────┼────────────────────────┤
│ Data Analytics & Tracking            │   4   │   28.6%    │ EW-05, EW-06, EW-07,   │
│                                      │       │            │ EW-08                  │
├──────────────────────────────────────┼───────┼────────────┼────────────────────────┤
│ Technical & Recovery Processes       │   3   │   21.4%    │ EW-02, EW-03, EW-09    │
├──────────────────────────────────────┼───────┼────────────┼────────────────────────┤
│ Research, Policy & Sustainability    │   4   │   28.6%    │ EW-01, EW-10, EW-13,   │
│                                      │       │            │ EW-14                  │
├──────────────────────────────────────┼───────┼────────────┼────────────────────────┤
│ Innovation & Awareness               │   2   │   14.3%    │ EW-11, EW-12           │
├──────────────────────────────────────┼───────┼────────────┼────────────────────────┤
│ Assessment / Administrative          │   1   │    7.1%    │ EW-04                  │
├──────────────────────────────────────┼───────┼────────────┼────────────────────────┤
│ Total                                │  14   │  100.0%    │ EW-01 through EW-14    │
└──────────────────────────────────────┴───────┴────────────┴────────────────────────┘
```

### Curricular Narrative Path
The categories map directly to the student's research cycle:
1. **Administrative & Baseline Setup**: `EW-04` (Assignment Zero — Check AAP) sets course expectations.
2. **Foundational Toxicity & Baseline Science**: `EW-01` (Toxic Chemicals) establishes hazardous substance risks.
3. **Recovery Engineering**: `EW-02` (Map), `EW-03` (Elemental Recovery), `EW-09` (Patent Modification) explore hydrometallurgical and mechanical extraction.
4. **Data Analytics & Carbon Lifecycle**: `EW-05` (Tracker), `EW-06` (India vs World), `EW-07` (Carbon Footprint), `EW-08` (State Tracker) quantify waste volumes and emissions.
5. **Corporate Compliance & Green Infrastructure**: `EW-10` (Company Compliance), `EW-13` (LEED Green Buildings), `EW-14` (Case Studies) audit regulatory frameworks.
6. **Campus & Societal Innovation**: `EW-11` (Pitch Deck), `EW-12` (Campus Campaign) translate findings into institutional action.

---

## 5. Course Chronology & Timeline Rules

### Temporal Span
The 14 coursework events occurred between **July 24, 2026** and **October 4, 2026**.

```
Timeline Distribution (2026):
  July 2026     (4 records): EW-01 (Jul 24), EW-02 (Jul 28), EW-03 (Jul 28), EW-04 (Jul 31)
  August 2026   (5 records): EW-05 (Aug 02), EW-06 (Aug 04), EW-07 (Aug 11), EW-08 (Aug 12), EW-09 (Aug 19)
  September 2026(4 records): EW-10 (Sep 02), EW-11 (Sep 06), EW-12 (Sep 09), EW-13 (Sep 29)
  October 2026  (1 record) : EW-14 (Oct 04)
```

### Critical Chronology Rules
1. **Portal Activity Date ≠ Due Date**:
   - `portalActivityDate` represents when the task was recorded/active on the portal.
   - It is **not** an official submission deadline.
   - The UI must never display `portalActivityDate` with a "Due Date" label.
   - `dueDate` remains `null` until confirmed by syllabus or faculty announcement.
2. **July 28 Same-Day Distinct Ordering**:
   - `EW-02` (`Assignment 2_Submit the Class Activity_Map of e waste`) and `EW-03` (`Assignment 3_Elemental Recovery Process Update`) both carry `portalActivityDate: "2026-07-28"`.
   - **Requirement**: In all chronological views, timeline streams, and sort functions, ties must be broken deterministically by `id` (`EW-02` before `EW-03`).
   - *Observation in `src/app/assignments/page.tsx:47`*:
     ```typescript
     // Current code:
     const comp = a.portalActivityDate.localeCompare(b.portalActivityDate);
     return sortOrder === 'asc' ? comp : -comp;
     ```
     When `portalActivityDate` is identical, this returns `0`, which relies on unstable browser sort order when reversed.
   - *Fix Proposal*:
     ```typescript
     // Deterministic tie-breaker:
     const comp = a.portalActivityDate.localeCompare(b.portalActivityDate);
     if (comp !== 0) return sortOrder === 'asc' ? comp : -comp;
     return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
     ```

---

## 6. Local-First Persistence & Portability Architecture

### Current Implementation in `src/lib/storage/`
- **Provider**: `StorageContext.tsx` provides React state hydrated from browser `localStorage`.
- **Storage Keys**:
  - `reclaim_assignments_v1`
  - `reclaim_profile_v1`
  - `reclaim_analytics_v1`
  - `reclaim_files_v1`
  - `reclaim_theme_v1`
- **Initial Seed Hydration**: `seedData.ts` transforms `data/assignments.seed.json` into typed `Assignment[]` with timestamps.

### Export/Import Backup Schema Contract

```typescript
export interface ReclaimBackupData {
  version: 1;
  exportedAt: string; // ISO 8601
  profile: StudentProfile;
  assignments: Assignment[]; // Exactly 14 records
  analyticsMetrics: AnalyticsMetric[];
}
```

### Storage Audit & Gap Analysis
1. **Incomplete Backup Import**:
   In `StorageContext.tsx:126-148`:
   ```typescript
   setAssignments(data.assignments);
   localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(data.assignments));
   if (data.profile) {
     setProfile(data.profile);
     localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(data.profile));
   }
   ```
   **Defect**: `data.analyticsMetrics` is ignored during import. If a user customizes analytics metadata or attaches datasets, importing a backup wipes out or ignores their metrics.
   **Remedy**: Add `if (data.analyticsMetrics) { setAnalytics(data.analyticsMetrics); localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(data.analyticsMetrics)); }`.
2. **Shallow Import Validation**:
   `importBackup` currently only checks:
   - `!data.version`
   - `!Array.isArray(data.assignments)`
   - `data.assignments.length !== 14`
   **Gap**: It does not check that assignment IDs are the canonical set `EW-01`..`EW-14`, nor does it validate category strings or status enums. A corrupted backup could inject invalid data into application state.
3. **File Payload Strategy**:
   `FileRecord` holds metadata and optional `contentUrl`. For an in-browser local MVP, storing multi-megabyte base64 strings in `localStorage` can trigger `QuotaExceededError` (5MB limit in most browsers).
   **Recommendation**: File blobs should be stored in IndexedDB (or blob URLs in memory during session), while metadata resides in `StorageContext`.

---

## 7. Zero-Fabrication Rules & Academic Integrity Enforcement

RECLAIM enforces a zero-tolerance policy against synthetic or misleading claims:

| Banned Practice | Why It Is Prohibited | RECLAIM Truthful Standard |
|:---|:---|:---|
| *"13 completed assignments"* | Confuses screenshot badge with verified coursework. | Display: **"13 portal badges observed"** |
| *"93% coursework complete"* | Fabricates completion percentage. | Display: **"0 / 14 verified completed submissions"** |
| Fake grades (e.g. `95/100`) | Invented faculty feedback. | Display: **"Awaiting faculty grade" (`null`)** |
| Fictional CO2 savings (e.g. `450 kg CO2 saved`) | Unsubstantiated environmental calculations. | Display: **"Awaiting raw Excel workbook upload (EW-07)"** |
| Pre-populated dummy files (e.g. `report.pdf`) | Fabricates submitted deliverables. | Display: **"No evidence files attached yet" (`files: []`)** |
| Automatic public publishing | Risks leaking unverified draft notes. | Default: **`published: false` for all 14 assignments** |

### Analytics Lab Guardrails (`/analytics`)
All 5 research modules (`AN-01` to `AN-05`) in `seedData.ts` and `src/app/analytics/page.tsx`:
- Have `hasData: false`
- Have `provenance: 'unverified'`
- Display structured metadata: `metric`, `unit`, `period`, `source`, `method`
- Feature clean, empty-state containers stating: *"Awaiting Source Dataset Upload — In accordance with strict academic integrity, zero synthetic or fabricated statistics are displayed."*

---

## 8. Codebase Audit & Build Health

### Test Suite Execution
- **Command**: `npm test` (`vitest run`)
- **Result**: **PASS** (1 test file, 5 tests passed in 269ms).
  - `contains exactly 14 assignment records` (passed)
  - `contains sequential IDs from EW-01 through EW-14` (passed)
  - `observes green badges on exactly 13 assignments (EW-02 to EW-14, false for EW-01)` (passed)
  - `initializes actual submission and review states to unverified/not_reviewed` (passed)
  - `matches exact category distribution: 4 Data, 3 Technical, 4 Research, 2 Innovation, 1 Admin` (passed)

### TypeScript Strict Compilation Audit
- **Command**: `npm run typecheck` (`tsc --noEmit`)
- **Result**: **FAIL** (3 errors in 2 files):
  1. `src/app/layout.tsx:4:8`: `error TS2882: Cannot find module or type declarations for side-effect import of '../styles/globals.css'`.
  2. `tests/seedIntegrity.test.ts:17:12`: `error TS18048: 'ew01' is possibly 'undefined'`.
  3. `tests/seedIntegrity.test.ts:18:12`: `error TS18048: 'ew01' is possibly 'undefined'`.

### Presentation Mode Keyboard Navigation Audit
- In `src/app/presentation/page.tsx:55-65`:
  The exit button states `"Exit (Esc)"`, but the `useEffect` listener only checks:
  ```typescript
  if (e.key === 'ArrowRight' || e.key === ' ') { ... }
  else if (e.key === 'ArrowLeft') { ... }
  ```
  `e.key === 'Escape'` is not intercepted to trigger navigation back to `/` or router exit.

---

## 9. Concrete Recommendations for Wave 1 / Wave 2 Specialists

1. **Storage Specialist (`StorageContext.tsx`)**:
   - Restore `analyticsMetrics` in `importBackup()`.
   - Add schema validation function `validateBackupSchema(data: any): boolean` checking all 14 IDs (`EW-01`..`EW-14`), category strings, and status enums.
   - Clarify `lastModified` timestamp update on every edit.
2. **Library / Workbench Specialist (`assignments/page.tsx` & `timeline/page.tsx`)**:
   - In `assignments/page.tsx`, add secondary tie-breaker `a.id.localeCompare(b.id)` on identical `portalActivityDate`.
   - In `assignments/[id]/page.tsx`, ensure `dueDate` can be set by the student, clearly distinct from `portalActivityDate`.
3. **Presentation Specialist (`presentation/page.tsx`)**:
   - Bind `e.key === 'Escape'` to router push back to previous route.
4. **Test Engineer (`tests/seedIntegrity.test.ts`)**:
   - Fix `const ew01 = rawSeed.assignments.find(...)` strict check using non-null assertion or guard `expect(ew01).toBeDefined(); if (!ew01) return;`.
5. **App Shell Specialist (`layout.tsx`)**:
   - Ensure `globals.css` side-effect declaration is recognized in TypeScript compiler.
