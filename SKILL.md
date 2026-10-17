---
name: reclaim-delivery
description: Use when designing, implementing, integrating, reviewing, or testing the RECLAIM EW/EM dashboard and 14-assignment portfolio. Coordinates safe Antigravity CLI teamwork, source-grounded data, original UI, storage, previews, accessibility, testing, and faculty showcase readiness.
---

# Skill: Deliver RECLAIM End to End

**Skill scope:** local project delivery through the Google Antigravity CLI; reusable methodology and concrete checklists. Canonical discoverable installation: `.agents/skills/reclaim-delivery/SKILL.md` (the root `SKILL.md` is a convenient user copy only).

## Trigger and prerequisites

Load this skill when the task mentions RECLAIM, EW/EM dashboard, assignment management, faculty showcase, presentation, repository UI, independent QA or deployment preparation. Read `AGENTS.md` and `DESIGN.md` first; treat `references/PROJECT_BRIEF.md` and `data/assignments.seed.json` as data contract and fixture. If any is missing, report and recreate from verified sources only.

## Protocol 0: capability census

Inspect (without changing untrusted or user-wide configuration):

1. Workspace structure, package manager, git state, existing routes/tests/build scripts, private reference boundaries.
2. Native Antigravity CLI agent/teamwork capacity, model/plan constraints and effective concurrent workers. If the CLI's `/teamwork-preview` requires approval, pause for that required approval and then proceed.
3. MCP connectors/servers visible under the CLI's `/mcp` manager and relevant read-only config scopes (`.agents/mcp_config.json`, `~/.gemini/config/mcp_config.json` when authorized). For each: purpose, status, tools, scopes, security risk, chosen action(s).
4. Skills discoverable in workspace `.agents/skills`, global CLI skills and plugin-provided skills. Use every **relevant** registered skill without blindly executing irrelevant ones.
5. Native browser test/render capabilities, real filesystem, network limits, package installations required, permission gates.

Write `docs/CAPABILITIES.md` with verified tool names, actual health and intended use; do not claim availability from documentation alone. Never create/enable extra integrations without user permission.

## Protocol 1: assemble parallel delivery plan

Use the 20 roles in `AGENTS.md`. Up to 15–20 active workers when the CLI **really supports it**, otherwise use as many as can do productive independent work. Do not burn slots on duplicate research or competing edits. Establish dependency graph and exclusive file ownership before spawning writers.

Each delegated task has this contract:

```text
TASK_ID:
ROLE:
GOAL:
INPUT_FILES:
FILES_OWNED:        # exclusive write ownership
INTERFACES_CONSUMED:
INTERFACES_PROVIDED:
ACCEPTANCE_TESTS:
TIME_BUDGET_OR_MILESTONE:
HANDOFF_ARTIFACT:
```

Default ownership proposals (adjust after repository inspection): design tokens/primitives → `src/styles/**`, `src/components/ui/**`; nav shell → `src/components/shell/**`; assignment types → `src/lib/domain/**`; seed+storage → `src/data/**`, `src/lib/storage/**`; routes → `src/app/<route>/**`; tests → `tests/**`; docs → `docs/**`. Reserve global `package.json`, `tsconfig`, route layout and shared schema to the architect/integrator to prevent conflicts.

## Protocol 2: define domain interfaces

Implement/validate types before consuming them:

```ts
type ActualSubmissionStatus =
  | 'unverified' | 'not_submitted' | 'submitted' | 'resubmission_needed';
type WorkStatus =
  | 'not_reviewed' | 'planned' | 'in_progress'
  | 'ready_for_review' | 'verified_complete';
type QualityStatus =
  | 'not_assessed' | 'needs_improvement'
  | 'meets_requirements' | 'polished';

type Assignment = {
  id: string;
  portalTitle: string;
  displayTitle: string;
  portalActivityDate: string;
  dueDate: string | null;
  category: string;
  portalBadgeObserved: boolean;
  portalBadgeText: 'Turned in' | null;
  actualSubmissionStatus: ActualSubmissionStatus;
  workStatus: WorkStatus;
  qualityStatus: QualityStatus;
  grade: number | null;
  published: boolean;
};
```

Extend with explicitly sourced instructions, tasks, links, files, sources, evidence, comments and audit metadata. Keep stable IDs. The **14 assignment records** and categories in `data/assignments.seed.json` must remain exact. Imported data requires schema validation and a safe migration strategy; never silently discard user edits.

## Protocol 3: implement the MVP completely

1. Scaffold/retain a typed Next.js app after checking existing repo; prefer Radix primitives and strongly typed local storage adapter. Use React Server/Client boundaries correctly.
2. Global navigation, layout and dark/light/system theme with persistence and reduced motion.
3. Command Center: 14 records, user-facing action queue, honest unknown completion, 13 *observed portal badges* rather than 13 finished assignments, real category totals.
4. Assignment library: full search, category/actual-status filters, sorting, clickable entries, no dead controls.
5. Assignment workbench: edit actual status, tasks, notes, quality steps; attachment placeholders, persistence with reload.
6. Timeline: correct portal chronology; separately editable confirmed deadlines, never conflate dates.
7. Settings: clear local-storage explanation, JSON import/export with validation, recoverable errors, backup roundtrip.
8. Analytics/Evidence/Showcase/Presentation: working architecture and honest incomplete-data states. If implementing full features, only claim success after actual tests and proper privacy rules.
9. Document run commands and limitations. Don't wait for absent coursework to ship the core app.

## Protocol 4: secure document pipeline (when built)

- File type/size/extension/MIME validation and user-friendly failure messages.
- Safe previews for PDF/image/plain text/CSV; DOCX and spreadsheets only through reviewed, maintained parsers and sanitized outputs. PPTX/other binary gets download fallback until verified conversion exists.
- Never execute uploaded JavaScript, use `dangerouslySetInnerHTML` with unsanitized data, or render arbitrary iframe content with expansive permissions.
- Store local blobs outside bundled source; show whether persistence is device-local. Keep file associations and imports consistent.
- When public sharing is implemented, only explicitly published, safe-to-share derived assets may be visible. Do not expose private notes and draft files.

## Protocol 5: analytics provenance

For any computed metric or visual:

```text
metric_name, value, unit, geography, reporting_period,
source_name, source_uri_or_evidence_file, source_page_or_sheet,
method_formula, confidence_status, verified_at
```

If any crucial source element is missing, use a labelled placeholder state and add a task to request that material later. Do not silently use sample research from your friend's project or the internet as if it were the student's coursework. Keep optional public contextual data explicitly separated and cited with date/source.

## Protocol 6: visual validation

- Review output under both light and dark modes at 390, 768, 1280, 1440px widths (320px smoke check).
- Inspect headings, hero, grid rhythm, interactivity, sidebar/drawer, focus rings, filters, modals, chart labels and footer.
- Verify no horizontal overflow, missing contrast, clipped stats, unreadable tiny text, inert decorative controls or keyboard traps.
- Capture real screenshots if native browser tools allow it and note the screenshots' paths in the test report; **never generate simulated screenshots** as evidence of a run.
- Log issues and resolution links. Update design tokens based on actual output, not guesswork.

## Protocol 7: testing and independent release gates

Run available equivalent commands, recording exact results:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
npm run test:e2e
```

Adapt script names based on `package.json`; add sensible scripts where missing. The final independent reviewer must verify:

- JSON seed contains exactly 14 unique IDs, correct dates/raw titles/category totals.
- Badges: EW-01 unconfirmed, EW-02..14 observed; **all** actual and quality statuses unverified/unassessed by default; no fake grades.
- Search/filter/sort, assignment links, notes/task/status mutation persist after refresh.
- Export → clear/import on test profile → match assignment edits and no data loss; invalid backups rejected without clobbering state.
- Public/showcase mode does not expose unpublished content (including through API endpoints/metadata).
- XSS and uploaded-file edge tests; keyboard and responsive smoke tests; app startup and production build.
- No copied personal details/content from the friend's HTML in source or output.

Maintain `docs/TEST_REPORT.md` with command, date, environment, PASS/FAIL/BLOCKED, logs/evidence, issues and follow-up. Do not misreport unrun tests as passed.

## Protocol 8: truthful delivery

Provide README, screenshot evidence only if captured, command to run locally, architecture diagram (text or Mermaid), exact route feature matrix, actual concurrency count, MCP/skill usage ledger, QA report, risks, and user-material checklist. Separate:

- Implemented and tested.
- Implemented but not independently verified.
- Not implemented or waiting on assignment materials.
- Blocked by capabilities/permissions.

The team's success is measured by **working, trustworthy software**, not the number of tokens, agent names, tools listed, or panels drawn.
