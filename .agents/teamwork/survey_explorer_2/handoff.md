# Handoff Report: Data Model & Dual-Truth Seed Survey

**Author**: `survey_explorer_2` (Data Model & Dual-Truth Seed Specialist)  
**Task ID**: Wave 0 Data Architecture Survey  
**Working Directory**: `/home/anonymous/EWEM-dashboard/RECLAIM/.agents/teamwork/survey_explorer_2/`  
**Handoff Type**: Hard (Investigation and audit complete)  
**Recipient**: Lead Orchestrator (`11e40888-31d4-4e3b-8ef0-645213a227fe`)  

---

## 1. Observation

1. **Seed Dataset Inventory (`data/assignments.seed.json`)**:
   - Total records: Exactly 14 assignment objects in `assignments` array (lines 5–271).
   - Dashboard IDs: Strictly sequential `EW-01` through `EW-14`.
   - Verbatim raw portal titles preserved:
     - `EW-01: "Toxic Chemicals_Any 5"` (line 7)
     - `EW-02: "Assignment 2_Submit the Class Activity_Map of e waste"` (line 26)
     - `EW-03: "Assignment 3_Elemental Recovery Process Update"` (line 45)
     - `EW-04: "Assignment Zero_Check AAP"` (line 64)
     - `EW-05: "Assignment 1_E waste Traker"` (line 83, preserves original single 'k' spelling)
     - `EW-06: "E waste India Vs World Data Task_Class Activity"` (line 102)
     - `EW-07: "Carbon Footprint Task_Excel activity Task"` (line 121)
     - `EW-08: "TE CMPN C PPT_State tracker submission Folder"` (line 140)
     - `EW-09: "E Waste Recovery Process_Modification for Design Patent"` (line 159)
     - `EW-10: "Indian Companies Following E waste Rules_Comparative Study"` (line 178)
     - `EW-11: "Novel Idea_E waste_Pitch Deck Submit Folder_CMPN C"` (line 197)
     - `EW-12: "Campaign For E Waste in Campus_Class Activity"` (line 216)
     - `EW-13: "LEED Certification of Green Buildings in India"` (line 235)
     - `EW-14: "Case Studies E waste"` (line 254)
   - Clean `displayTitle` strings are populated separately for all 14 records (e.g. `Assignment 1 — E-Waste Tracker`).

2. **Four Dimensions of Truth States in Seed**:
   - `portalBadgeObserved`: `false` for `EW-01` (`portalBadgeText: null`); `true` for `EW-02..EW-14` (`portalBadgeText: "Turned in"`). Exactly 13 green badges observed in portal screenshots.
   - `actualSubmissionStatus`: `'unverified'` for all 14 records.
   - `workStatus`: `'not_reviewed'` for all 14 records.
   - `qualityStatus`: `'not_assessed'` for all 14 records.
   - `dueDate`: `null`, `grade`: `null`, `published`: `false`, `files`: `[]`, `tasks`: `[]`, `sources`: `[]` for all 14 records.

3. **Category Breakdown**:
   - `Data Analytics & Tracking`: 4 records (`EW-05`, `EW-06`, `EW-07`, `EW-08`).
   - `Technical & Recovery Processes`: 3 records (`EW-02`, `EW-03`, `EW-09`).
   - `Research, Policy & Sustainability`: 4 records (`EW-01`, `EW-10`, `EW-13`, `EW-14`).
   - `Innovation & Awareness`: 2 records (`EW-11`, `EW-12`).
   - `Assessment / Administrative`: 1 record (`EW-04`).
   - Total sum: 4 + 3 + 4 + 2 + 1 = 14 records.

4. **Timeline Dates & Same-Day Collision**:
   - Temporal range: 2026-07-24 (`EW-01`) to 2026-10-04 (`EW-14`).
   - On `2026-07-28`, two assignments share the identical portal activity date:
     - `EW-02` (`Assignment 2 — E-Waste Map`)
     - `EW-03` (`Assignment 3 — Elemental Recovery Process Update`)
   - In `src/app/assignments/page.tsx:47`, sorting uses only `a.portalActivityDate.localeCompare(b.portalActivityDate)`, which yields `0` on July 28 and lacks a secondary key tie-breaker.
   - In `src/app/timeline/page.tsx:23-26`, tie-breaker is properly implemented:
     ```typescript
     const comp = a.portalActivityDate.localeCompare(b.portalActivityDate);
     if (comp !== 0) return comp;
     return a.id.localeCompare(b.id);
     ```

5. **Persistence & Portability Implementation (`src/lib/storage/StorageContext.tsx`)**:
   - In `exportBackup()` (lines 115–124), the export JSON includes `version: 1`, `exportedAt`, `profile`, `assignments`, and `analyticsMetrics`.
   - In `importBackup()` (lines 126–148), only `assignments` and `profile` are restored. `analyticsMetrics` is omitted:
     ```typescript
     setAssignments(data.assignments);
     localStorage.setItem(STORAGE_KEYS.ASSIGNMENTS, JSON.stringify(data.assignments));
     if (data.profile) {
       setProfile(data.profile);
       localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(data.profile));
     }
     ```
   - Validation checks only `data.assignments.length !== 14`. It does not check that IDs belong to `EW-01..EW-14` or validate status enums.

6. **Automated Verification Command Results**:
   - Test execution: `npm test` (`vitest run`) passed 5 of 5 tests in `tests/seedIntegrity.test.ts` (duration 269ms).
   - Typecheck execution: `npm run typecheck` (`tsc --noEmit`) exited with code 2 and 3 errors:
     - `src/app/layout.tsx:4:8 - error TS2882: Cannot find module or type declarations for side-effect import of '../styles/globals.css'`.
     - `tests/seedIntegrity.test.ts:17:12 - error TS18048: 'ew01' is possibly 'undefined'`.
     - `tests/seedIntegrity.test.ts:18:12 - error TS18048: 'ew01' is possibly 'undefined'`.

7. **Presentation Key Handler (`src/app/presentation/page.tsx:55-65`)**:
   - Line 91 UI indicates "Exit (Esc)".
   - Lines 56–62 keyboard handler checks `ArrowRight`, `Space`, and `ArrowLeft`, but does not listen for `Escape`.

---

## 2. Logic Chain

1. **Seed Completeness**:
   - Observation 1 and 2 confirm all 14 assignments exist, with identical chronological IDs `EW-01` to `EW-14`, correct category mappings, and raw portal titles matching `AGENTS.md`.
   - Therefore, the baseline data foundation is complete and strictly adheres to the domain brief.

2. **Dual-Truth Integrity**:
   - Observation 2 confirms `portalBadgeObserved` is true for 13 items and false for EW-01, while `actualSubmissionStatus` is `'unverified'` for all 14.
   - Observation 3 confirms category counts match the 4/3/4/2/1 distribution required.
   - In `src/app/page.tsx:114-131`, KPI cards display "13 / 14 Observed Portal Badges" and "0 / 14 Verified Complete".
   - Therefore, the application successfully avoids the prohibited claims ("13 completed" or "93% finished") and maintains zero-fabrication standards.

3. **Chronology & Sorting Stability**:
   - Observation 4 shows two distinct assignments occur on `2026-07-28`.
   - If an array sort comparator returns 0 without a secondary criterion, modern JavaScript engines preserve stable order, but reversing sort direction or re-filtering can cause non-deterministic swapping.
   - Therefore, `assignments/page.tsx` should adopt the tie-breaking comparator already present in `timeline/page.tsx`.

4. **Persistence Gaps**:
   - Observation 5 shows `importBackup()` ignores `analyticsMetrics` and lacks schema validation for enum fields.
   - If a student modifies an analytics metric or imports a corrupted JSON, application state is either partially updated or susceptible to invalid values.
   - Therefore, `StorageContext.tsx` requires an import validation patch and restoration of `analyticsMetrics`.

5. **Typecheck Errors**:
   - Observation 6 identifies 3 TS errors blocking clean `npm run typecheck`.
   - Fixing `seedIntegrity.test.ts` non-null assertion on `ew01` and declaring CSS module types will clear these errors.

---

## 3. Caveats

1. **Binary Storage Limitations**: IndexedDB is not yet connected to `StorageContext.tsx`. Currently, uploaded file records in `src/app/library/page.tsx` store metadata in state/localStorage, but binary file payloads should not be written to `localStorage` due to the 5MB browser quota.
2. **Dynamic Due Dates**: `dueDate` in the seed is `null` for all 14 assignments as mandated. If faculty deadlines are provided later, the workbench must allow editing `dueDate` without altering `portalActivityDate`.
3. **No Code Edits Performed**: In accordance with the Explorer role constraints, this investigation is read-only. Proposed code improvements are provided as concrete specifications for subsequent implementation agents.

---

## 4. Conclusion

The data model and seed dataset in `data/assignments.seed.json` are fully authoritative, robust, and completely aligned with `AGENTS.md` and `PROJECT_BRIEF.md`. The 4 orthogonal truth dimensions, 13 observed portal badges, 0 verified completed baseline, 4/3/4/2/1 category distribution, and zero-fabrication constraints are solidly modeled.

To ensure production-grade robustness in Wave 1 and Wave 2, the following targeted enhancements are recommended:
1. Update `StorageContext.tsx:importBackup()` to validate canonical IDs (`EW-01`..`EW-14`) and restore `data.analyticsMetrics`.
2. Add deterministic secondary sorting by `id` on `src/app/assignments/page.tsx`.
3. Add `Escape` key navigation to `src/app/presentation/page.tsx`.
4. Fix `tests/seedIntegrity.test.ts` type assertion on `ew01` to clear TypeScript strict typechecking.

---

## 5. Verification Method

To independently verify all findings in this report, execute the following commands and inspections:

1. **Seed Data & Category Verification**:
   ```bash
   npm test
   ```
   *Expected output*: `✓ tests/seedIntegrity.test.ts (5 tests) passed`. Confirms 14 assignments, sequential IDs, 13 badges observed, 4/3/4/2/1 category distribution, and unverified baseline.

2. **TypeScript Compilation Inspection**:
   ```bash
   npm run typecheck
   ```
   *Expected output*: Exits with code 2, demonstrating the 3 documented errors in `src/app/layout.tsx` and `tests/seedIntegrity.test.ts`.

3. **Seed Integrity Manual Verification**:
   Inspect `data/assignments.seed.json`:
   - Line 6–23: `EW-01` has `portalBadgeObserved: false`, `portalBadgeText: null`.
   - Line 25–61: `EW-02` and `EW-03` both have `portalActivityDate: "2026-07-28"`.
   - Line 83: `EW-05` preserves `Assignment 1_E waste Traker`.

4. **Persistence Code Inspection**:
   Inspect `src/lib/storage/StorageContext.tsx:126-148` to verify that `setAnalytics` is omitted during backup import.
