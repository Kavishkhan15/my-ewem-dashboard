# RECLAIM MAGNUM — Architecture Decisions Record (ADR)

## ADR-001: Next.js 15 App Router & React 19 Foundation
- **Context**: RECLAIM requires 9 distinct routes spanning complex interactive state (workbench, evidence upload, JSON backup) and fast static presentations.
- **Decision**: Adopt Next.js 15 App Router with TypeScript strict mode and Tailwind CSS.
- **Rationale**: Provides native client/server boundaries, optimal code-splitting, zero-configuration routing for `/assignments/[id]`, and instant local execution with no paid cloud dependencies.

## ADR-002: Four-Dimension Truth Model
- **Context**: The assignment portal displays green "Turned in" badges, but the student researcher has not independently verified completion, grades, or quality.
- **Decision**: Separate status tracking into 4 orthogonal dimensions:
  1. `portalBadgeObserved` (boolean + exact text `'Turned in'` where visually observed)
  2. `actualSubmissionStatus` (`unverified` | `submitted` | `not_submitted` | `resubmission_needed`)
  3. `workStatus` (`not_reviewed` | `planned` | `in_progress` | `ready_for_review` | `verified_complete`)
  4. `qualityStatus` (`not_assessed` | `needs_improvement` | `meets_requirements` | `polished`)
- **Rationale**: Precludes false claims of completion ("13 completed" or "93% finished"), maintaining strict academic integrity while allowing progressive auditing.

## ADR-003: Local-First Persistence with Portability & Schema Validation
- **Context**: The application must work out-of-the-box in local development without mandatory cloud credentials (Supabase/PostgreSQL).
- **Decision**: Implement a local-first React Context storage adapter backed by browser `localStorage` with explicit UI indicators ("Local Device Only"). Provide complete JSON backup export and schema-validated import round-trips.
- **Rationale**: Immediate zero-config execution, zero credential exposure, full data portability, and seamless future migration to authenticated backend storage.

## ADR-004: Faculty Showcase Read-Only Publishing Gate
- **Context**: Unfinished coursework, drafts, personal reflections, and unverified files must never leak to faculty evaluators.
- **Decision**: Enforce a strict `published: boolean` gate. Only assignments explicitly reviewed and toggled to `published = true` render in `/showcase` and `/presentation`.
- **Rationale**: Guarantees confidentiality for in-progress student work while enabling professional faculty presentation.
