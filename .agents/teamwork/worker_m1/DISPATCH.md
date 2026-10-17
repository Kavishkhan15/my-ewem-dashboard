# Task Assignment: Milestone M1 — Foundation, Contracts & Build Pipeline

## Role: Worker M1 (Foundation & Build Infrastructure)
- Working Directory: /home/anonymous/EWEM-dashboard/RECLAIM/.agents/teamwork/worker_m1/
- Input files to read:
  - /home/anonymous/EWEM-dashboard/RECLAIM/.agents/teamwork/ORIGINAL_REQUEST.md
  - /home/anonymous/EWEM-dashboard/RECLAIM/AGENTS.md
  - /home/anonymous/EWEM-dashboard/RECLAIM/.agents/teamwork/orchestrator/PROJECT.md
  - /home/anonymous/EWEM-dashboard/RECLAIM/.agents/teamwork/survey_explorer_1/analysis.md
  - /home/anonymous/EWEM-dashboard/RECLAIM/.agents/teamwork/survey_explorer_2/analysis.md

## Exclusive File Ownership
You have exclusive write access to:
- `/home/anonymous/EWEM-dashboard/RECLAIM/src/types/global.d.ts` (create)
- `/home/anonymous/EWEM-dashboard/RECLAIM/src/lib/storage/seedData.ts` (edit)
- `/home/anonymous/EWEM-dashboard/RECLAIM/src/lib/storage/StorageContext.tsx` (edit)
- `/home/anonymous/EWEM-dashboard/RECLAIM/.eslintrc.json` (create)
- `/home/anonymous/EWEM-dashboard/RECLAIM/vitest.config.ts` (create)
- `/home/anonymous/EWEM-dashboard/RECLAIM/tests/seedIntegrity.test.ts` (edit)
- `/home/anonymous/EWEM-dashboard/RECLAIM/next.config.js` (optional edit)

DO NOT modify files outside your ownership.

## Mandatory Integrity Warning
DO NOT CHEAT. All implementations must be genuine. DO NOT hardcode test results, create dummy/facade implementations, or circumvent the intended task. A auditor will independently verify your work. Integrity violations WILL be detected and your work WILL be rejected.

## Tasks
1. Create `src/types/global.d.ts` with `declare module '*.css';` and any necessary declarations so side-effect CSS imports in Next.js layout compile under TypeScript strict mode.
2. In `src/lib/storage/seedData.ts`, fix the import path to `../../../data/assignments.seed.json` and fix typing `(item: any)` to satisfy strict typechecking.
3. Create `.eslintrc.json` with `{ "extends": "next/core-web-vitals" }` so `npm run lint` runs cleanly and non-interactively.
4. Create `vitest.config.ts` using `@vitejs/plugin-react`, setting test environment to `jsdom`, and configuring resolve alias `@` -> path to `./src`.
5. In `src/lib/storage/StorageContext.tsx`:
   - Enhance `importBackup()`: validate that imported assignments contain exactly 14 items with IDs matching `EW-01` through `EW-14`.
   - Restore `analyticsMetrics` during backup import and update localStorage.
6. In `tests/seedIntegrity.test.ts`: fix the type narrowing / assertion on `ew01` so `npm run typecheck` does not report TS18048.
7. Run and verify commands:
   - `npm run typecheck` (must exit 0 with 0 errors)
   - `npm run lint` (must exit 0 without prompting)
   - `npm test` (must pass 5/5 tests)
   - `npm run build` (must successfully compile production Next.js build)
8. Document all commands and results in `/home/anonymous/EWEM-dashboard/RECLAIM/.agents/teamwork/worker_m1/handoff.md`.
9. Send a completion message to the orchestrator.


## 2026-10-12T19:53:55Z
You are worker_m1. Read /home/anonymous/EWEM-dashboard/RECLAIM/.agents/teamwork/worker_m1/DISPATCH.md and /home/anonymous/EWEM-dashboard/RECLAIM/.agents/teamwork/ORIGINAL_REQUEST.md.
Follow all instructions in DISPATCH.md with exclusive file ownership.
Create src/types/global.d.ts, .eslintrc.json, vitest.config.ts; update src/lib/storage/seedData.ts, src/lib/storage/StorageContext.tsx, and tests/seedIntegrity.test.ts.
Run npm run typecheck, npm run lint, npm test, and npm run build.
Ensure all commands pass with exit code 0.
Write your complete handoff report to /home/anonymous/EWEM-dashboard/RECLAIM/.agents/teamwork/worker_m1/handoff.md and notify the orchestrator.
