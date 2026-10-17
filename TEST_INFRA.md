# RECLAIM MAGNUM — Test Infrastructure & Methodology Specification

## 1. Testing Philosophy

The RECLAIM test architecture implements **Requirement-Driven Opaque-Box Testing**. The suite validates system behaviors, boundary resilience, state machine orthogonality, and end-to-end user workflows against specifications codified in `AGENTS.md`, `DESIGN.md`, `ORIGINAL_REQUEST.md`, and `data/assignments.seed.json`, strictly treating component implementations as black boxes.

### Core Testing Pillars:
1. **Four-Dimension Truth Model Integrity**:
   - Portal Badge Observation (`portalBadgeObserved: boolean`, `portalBadgeText: string | null`)
   - Actual Submission Status (`actualSubmissionStatus: 'unverified' | 'not_submitted' | 'submitted' | 'resubmission_needed'`)
   - Work / Checklist Status (`workStatus: 'not_reviewed' | 'planned' | 'in_progress' | 'ready_for_review' | 'verified_complete'`)
   - Quality / Faculty Assessment (`qualityStatus: 'not_assessed' | 'needs_improvement' | 'meets_requirements' | 'polished'`)
   *The test suite rigorously verifies that these four dimensions never cross-contaminate.*
2. **Zero-Fabrication Enforcement**:
   - Asserts zero synthetic percentage completions (no false "13 of 14 completed" or "93% finished").
   - Asserts unverified fields default strictly to `null` (`dueDate: null`, `grade: null`) and empty collections (`files: []`, `tasks: []`).
   - Asserts Analytics Lab remains in truthful "Awaiting Source Dataset" states until verified datasets are uploaded.
3. **Faculty Showcase Isolation (Zero-Draft Leakage)**:
   - Asserts unpublished coursework (`published: false`) remains strictly confidential and inaccessible from `/showcase` and public presentation flows.
4. **Resilient Local-First Persistence & Schema Migration**:
   - Tests `localStorage` persistence, error handling, backup serialization/deserialization, and schema validation with rejection of corrupted data.

---

## 2. 4-Tier Test Suite Architecture

The test suite is organized into four distinct, progressive tiers, plus an end-to-end route mounting verification suite:

```
tests/
├── seedIntegrity.test.ts          # Baseline seed data sanity check
├── tier1_features.test.ts         # Tier 1: Canonical Feature & Contract Coverage
├── tier2_boundaries.test.ts       # Tier 2: Boundary Conditions & Edge Case Resilience
├── tier3_combinations.test.ts     # Tier 3: Multi-Faceted Feature Interactions & Matrices
├── tier4_scenarios.test.ts        # Tier 4: End-to-End Real-World User Workflows
└── e2e/
    └── routes.test.tsx            # End-to-End Route Mounting & DOM Integration
```

### Tier Breakdown

| Tier | File | Scope & Objectives | Test Count Target |
|---|---|---|---|
| **Tier 1** | `tests/tier1_features.test.ts` | **Feature Coverage**: Ingests exact 14 assignments, verifies 13 observed badges (EW-02..EW-14) and 0 on EW-01; validates 4/3/4/2/1 category distribution; verifies all 9 route contracts, and reactive storage context primitives. | 12+ tests |
| **Tier 2** | `tests/tier2_boundaries.test.ts` | **Boundary Conditions**: July 28 activity date collision (`EW-02` vs `EW-03`); title discrepancies (single 'k' typo in `EW-05` "Traker"); null defaults (`dueDate`, `grade`); empty collections; 10MB upload ceiling; malformed JSON backup rejection. | 10+ tests |
| **Tier 3** | `tests/tier3_combinations.test.ts` | **Feature Interactions**: Complex matrix of Search + Category Filter + Status Filter + Sort order; orthogonal state transitions (WorkStatus vs QualityStatus); showcase gating matrix; live reactive badge counters. | 10+ tests |
| **Tier 4** | `tests/tier4_scenarios.test.ts` | **Real-World Scenarios**: Full student review cycle with tasks and notes; evidence attachment and classification; backup export, storage reset, and full roundtrip restore; faculty presentation slide progression. | 6+ scenarios |
| **E2E** | `tests/e2e/routes.test.tsx` | **Route Integration**: Renders all 9 Next.js pages within `StorageProvider` and `AppShell`, asserting DOM elements, navigation links, and theme switching. | 10+ tests |

---

## 3. Authoritative Source Registry

Every expected value across all tests is derived exclusively from authoritative project specifications:
- `data/assignments.seed.json`: Canonical record of 14 assignments, portal titles, display titles, categories, activity dates, and badge observations.
- `AGENTS.md` & `references/PROJECT_BRIEF.md`: Truth model definitions, category quotas (Data: 4, Technical: 3, Research: 4, Innovation: 2, Admin: 1), and security constraints.
- `DESIGN.md`: Research observatory design system tokens, layout conventions, and UI component behavior.
- `src/types/domain.ts`: Strict TypeScript contract definitions for `Assignment`, `StudentProfile`, `AnalyticsMetric`, and `ReclaimBackupData`.

---

## 4. Execution & Verification Commands

The test suite runs under Vitest in a simulated `jsdom` environment with full React 19 testing library support.

### Complete Suite Execution:
```bash
npm test
```

### Running Individual Tiers:
```bash
# Tier 1: Feature Coverage
npx vitest run tests/tier1_features.test.ts

# Tier 2: Boundary Conditions
npx vitest run tests/tier2_boundaries.test.ts

# Tier 3: Feature Combinations
npx vitest run tests/tier3_combinations.test.ts

# Tier 4: End-to-End Scenarios
npx vitest run tests/tier4_scenarios.test.ts

# E2E Routes Integration
npx vitest run tests/e2e/routes.test.tsx
```

### Typechecking & Static Validation:
```bash
npm run typecheck
npm run lint
```

---

## 5. Coverage & Quality Thresholds

- **100% Assignment Record Audit**: All 14 records (`EW-01` through `EW-14`) individually verified for schema adherence and data fidelity.
- **100% Route Coverage**: All 9 routes (`/`, `/assignments`, `/assignments/[id]`, `/analytics`, `/timeline`, `/library`, `/showcase`, `/presentation`, `/settings`) tested for successful rendering and error boundaries.
- **Zero Fabrication**: No test may assert or allow synthetic percentages, artificial due dates, or ungrounded statistics.
- **State Independence**: Every test suite establishes its own isolated storage environment via mock `localStorage` and fresh context state, preventing cross-test contamination.
