# Task Assignment: E2E Testing Track — Opaque-Box Test Suite

## Role: E2E Test Writer (Requirement-Driven Testing)
- Working Directory: /home/anonymous/EWEM-dashboard/RECLAIM/.agents/teamwork/e2e_test_writer/
- Input files to read:
  - /home/anonymous/EWEM-dashboard/RECLAIM/.agents/teamwork/ORIGINAL_REQUEST.md
  - /home/anonymous/EWEM-dashboard/RECLAIM/AGENTS.md
  - /home/anonymous/EWEM-dashboard/RECLAIM/DESIGN.md
  - /home/anonymous/EWEM-dashboard/RECLAIM/.agents/teamwork/orchestrator/PROJECT.md
  - /home/anonymous/EWEM-dashboard/RECLAIM/data/assignments.seed.json

## Exclusive File Ownership
You have exclusive write access to:
- `/home/anonymous/EWEM-dashboard/RECLAIM/tests/e2e/` (directory and tests within)
- `/home/anonymous/EWEM-dashboard/RECLAIM/tests/tier1_features.test.ts` (create)
- `/home/anonymous/EWEM-dashboard/RECLAIM/tests/tier2_boundaries.test.ts` (create)
- `/home/anonymous/EWEM-dashboard/RECLAIM/tests/tier3_combinations.test.ts` (create)
- `/home/anonymous/EWEM-dashboard/RECLAIM/tests/tier4_scenarios.test.ts` (create)
- `/home/anonymous/EWEM-dashboard/RECLAIM/TEST_INFRA.md` (create)
- `/home/anonymous/EWEM-dashboard/RECLAIM/TEST_READY.md` (create when suite is complete)

DO NOT modify files outside your ownership (especially `src/`).

## Mandatory Integrity Warning
DO NOT CHEAT. All tests must be genuine, validating real requirements. DO NOT create trivial tautological tests. An auditor will independently verify your work.

## Methodology & Objectives
Design and write a comprehensive opaque-box test suite across 4 tiers:
1. Create `TEST_INFRA.md` documenting test philosophy, feature inventory, architecture, and coverage thresholds.
2. Tier 1 (`tests/tier1_features.test.ts`): Feature coverage verifying all 14 assignments, 13 observed badges, 0 verified complete, 4/3/4/2/1 categories, all 9 route definitions, and persistence contracts.
3. Tier 2 (`tests/tier2_boundaries.test.ts`): Boundary conditions — July 28 same-day collision (`EW-02` vs `EW-03`), single 'k' spelling in `EW-05` ("Traker"), empty files arrays, null due dates/grades, backup schema limits, invalid JSON import rejection.
4. Tier 3 (`tests/tier3_combinations.test.ts`): Feature interactions — filter + search combinations, work status transitions combined with quality status, published flag filtering (ensuring only published items appear in showcase).
5. Tier 4 (`tests/tier4_scenarios.test.ts`): Real-world workflows — student updating review status, adding checklist items, exporting backup, importing backup on fresh session, faculty viewing showcase without draft leakage.
6. Run `npm test` with your tests and ensure they execute properly.
7. Generate `TEST_READY.md` summarizing the test suite with execution commands and tier breakdown.
8. Write your completion report in `/home/anonymous/EWEM-dashboard/RECLAIM/.agents/teamwork/e2e_test_writer/handoff.md` and message the orchestrator.


## 2026-10-12T19:53:55Z
You are e2e_test_writer. Read /home/anonymous/EWEM-dashboard/RECLAIM/.agents/teamwork/e2e_test_writer/DISPATCH.md and /home/anonymous/EWEM-dashboard/RECLAIM/.agents/teamwork/ORIGINAL_REQUEST.md.
Follow all instructions in DISPATCH.md with exclusive file ownership.
Design and implement the 4-tier requirement-driven opaque-box test suite (Tier 1-4) in tests/, create TEST_INFRA.md, and create TEST_READY.md when complete.
Write your handoff report to /home/anonymous/EWEM-dashboard/RECLAIM/.agents/teamwork/e2e_test_writer/handoff.md and notify the orchestrator.
