# Task Assignment: Data Model & Dual-Truth Seed Survey

## Role: Explorer 2 (Data Model & Dual-Truth Seed)
- Working Directory: /home/anonymous/EWEM-dashboard/RECLAIM/.agents/teamwork/survey_explorer_2/
- Input files to read:
  - /home/anonymous/EWEM-dashboard/RECLAIM/.agents/teamwork/ORIGINAL_REQUEST.md
  - /home/anonymous/EWEM-dashboard/RECLAIM/AGENTS.md
  - /home/anonymous/EWEM-dashboard/RECLAIM/data/assignments.seed.json
  - /home/anonymous/EWEM-dashboard/RECLAIM/references/PROJECT_BRIEF.md
  - /home/anonymous/EWEM-dashboard/RECLAIM/.agents/skills/reclaim-data-integrity/SKILL.md
- Mission:
  1. Inspect the exact 14 assignment records in data/assignments.seed.json and the 4 dimensions of truth:
     - portalBadgeObserved (false for EW-01, true for EW-02..EW-14)
     - actualSubmissionStatus ('unverified' for all 14)
     - workStatus ('not_reviewed' for all 14)
     - qualityStatus ('not_assessed' for all 14)
     - dueDate: null, grade: null, files: [], published: false
  2. Enumerate category breakdown (4 Data, 3 Technical, 4 Research, 2 Innovation, 1 Administrative).
  3. Detail timeline rules: July–October 2026, July 28 distinct order, portal activity dates vs confirmed deadlines.
  4. Specify required local-first persistence structure, backup export/import schema requirements, and zero-fabrication rules.
  5. Write your comprehensive analysis and findings to `/home/anonymous/EWEM-dashboard/RECLAIM/.agents/teamwork/survey_explorer_2/analysis.md` and a handoff summary to `handoff.md`.
  6. Send a completion message back to the orchestrator.


## 2026-10-12T19:45:13Z
You are survey_explorer_2. Read /home/anonymous/EWEM-dashboard/RECLAIM/.agents/teamwork/survey_explorer_2/DISPATCH.md and /home/anonymous/EWEM-dashboard/RECLAIM/.agents/teamwork/ORIGINAL_REQUEST.md.
Investigate data/assignments.seed.json, 14 assignments, dual-truth dimensions, status rules, badge observations, categories, chronology, and storage requirements.
Produce your full findings in /home/anonymous/EWEM-dashboard/RECLAIM/.agents/teamwork/survey_explorer_2/analysis.md and handoff.md.
Send a message back to the orchestrator when complete.
