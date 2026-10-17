---
name: reclaim-data-integrity
description: Validates the exact 14-item RECLAIM assignment seed, badges, chronology, and separate completion statuses; load whenever changing assignment data or progress analytics.
---

# Data Integrity Protocol

1. Read `data/assignments.seed.json`, source register in `AGENTS.md`, and user-supplied coursework. The register has **14** chronological IDs, EW-01..EW-14.
2. Preserve `portalTitle` literally, `displayTitle` separately. Preserve the correct 2026 portal activity dates. Never convert portal activity into a due date.
3. Distinguish four orthogonal states: screenshot badge observation; independently verified submission; actual work/checklist; academic quality/feedback. EW-01 has no confirmed badge. EW-02..EW-14 show an observed badge, but **none** are independently verified.
4. New records start actualSubmissionStatus=unverified, workStatus=not_reviewed, qualityStatus=not_assessed; dueDate and grade null; unpublished; no files or metrics.
5. Every UI summary must declare its denominator and state dimension (e.g. `13 badges observed of 14`, not `93% complete`).
6. Validate updates and imports with runtime schema; reject unknown IDs, duplicate IDs, invalid dates, impossible statuses, corrupted backups; offer recoverable errors.
7. Test after transformations: count, uniqueness, dates, categories 4/3/4/2/1, statuses and privacy defaults; attach command output to `docs/TEST_REPORT.md`.
8. When claims cannot be verified, label them unknown. Never infer faculty approval, legal compliance, deadlines or measured environmental outcomes from assignment titles.
