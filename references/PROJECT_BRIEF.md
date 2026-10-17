# RECLAIM — Product and Engineering Master Brief
## E-Waste Intelligence & Management Studio

### PRODUCT DESIGN AND ENGINEERING ROLE
Act as a senior product designer, creative director, UX architect, frontend engineer, and meticulous technical lead. Plan and implement an original, polished, real, responsive web application named **RECLAIM — E-Waste Intelligence & Management Studio**. The result should be appropriate both for the student's private assignment management and for presenting genuine coursework to faculty. This is an actual working application, not just a Figma-style mockup or a collection of decorative cards.

### PROVIDED REFERENCE & ORIGINALITY RULES
I will attach a friend's `Index.html` as a reference and, if available, screenshots of my assignment portal. Inspect the HTML to understand its green portfolio aesthetic, assignment navigation, file preview behavior, theme handling, and grading/export concepts. It is INSPIRATION ONLY. Do not reuse its personal identifiers, professor details, roll number, student name, embedded essays/research, intellectual property, source code, or text. Do not simply clone the interface. The reference is a monolithic HTML document with embedded content, local browser storage, client-controlled owner mode, and grading tools; those are not a secure multi-device workflow. Use more maintainable architecture and more deliberate interactions. The attached reference does not define my definitive assignment inventory; the 14-item register below does.

### PRODUCT STRATEGY
Give RECLAIM two complementary modes:
1. **Workspace mode**: private operating dashboard to review, organize, complete, improve and track all assignments, tasks, files, notes and evidence.
2. **Showcase mode**: elegant, read-only, faculty-facing portfolio to present finalized work and real analyses, with an optional guided presentation experience.
Never confuse the two. Drafts, unfinished notes and private files should not appear publicly unless explicitly published.

### BRAND / DESIGN LANGUAGE
Name: **RECLAIM**. Subtitle: **E-Waste Intelligence & Management Studio**. Tagline candidate: "From discarded devices to meaningful data" (editable and not an official institutional tagline).
Visual style: premium environmental intelligence lab, editorial typography, restrained scientific/data-inspired visuals, exceptional hierarchy and spacing. This should look like a bespoke award-quality student product, not a stock admin template.
Color system: dark graphite `#0B1110`, elevated panel `#151D1A`, muted surface `#1C2922`, main text `#EFF5EF`, muted text `#91A69B`, emerald `#32CF89`, electric lime `#C4F46D`, restrained cyan `#79CFDA`, amber for genuine warnings. Support an equally polished light theme. Avoid loud gradients everywhere, neon overload, heavy glow, fake glassmorphism, and unreadable thin gray text.
Typography: a clear modern sans (e.g. Geist or Manrope) combined with a distinctive editorial headline face (e.g. Instrument Serif), and a restrained monospaced face for metrics and IDs. Use locally available/web-safe fallbacks. Original design system; do not duplicate the friend's Fraunces-based page.
Layout: desktop sidebar ~240px, contextual header ~72px, fluid main grid, controlled max width ~1480px. Tablet collapses sidebar; mobile uses accessible drawer/bottom navigation where appropriate. 8px spacing system, restrained 12–18px corner radii, strong empty states, thoughtful hover/focus/animation, respects reduced motion. Aim for polished designs at 390, 768, 1280, and 1440px.

### AUTHORITATIVE 14-ASSIGNMENT SEED REGISTER
Preserve exact/raw portal titles in a `portalTitle` field. Use clean, readable `displayTitle` separately. Assign chronological IDs below (these are dashboard IDs, not original course assignment numbers). Dates represent dates shown in portal screenshots, NOT confirmed due dates. Treat the year as 2026 per screenshot day/date alignment, but keep dates editable if later corrected.

| Dashboard ID | Portal date | Portal assignment title | Proposed category |
|---|---|---|---|
| EW-01 | 2026-07-24 | Toxic Chemicals_Any 5 | Research, Policy & Sustainability |
| EW-02 | 2026-07-28 | Assignment 2_Submit the Class Activity_Map of e waste | Technical & Recovery Processes |
| EW-03 | 2026-07-28 | Assignment 3_Elemental Recovery Process Update | Technical & Recovery Processes |
| EW-04 | 2026-07-31 | Assignment Zero_Check AAP | Assessment / Administrative |
| EW-05 | 2026-08-02 | Assignment 1_E waste Traker | Data Analytics & Tracking |
| EW-06 | 2026-08-04 | E waste India Vs World Data Task_Class Activity | Data Analytics & Tracking |
| EW-07 | 2026-08-11 | Carbon Footprint Task_Excel activity Task | Data Analytics & Tracking |
| EW-08 | 2026-08-12 | TE CMPN C PPT_State tracker submission Folder | Data Analytics & Tracking |
| EW-09 | 2026-08-19 | E Waste Recovery Process_Modification for Design Patent | Technical & Recovery Processes |
| EW-10 | 2026-09-02 | Indian Companies Following E waste Rules_Comparative Study | Research, Policy & Sustainability |
| EW-11 | 2026-09-06 | Novel Idea_E waste_Pitch Deck Submit Folder_CMPN C | Innovation & Awareness |
| EW-12 | 2026-09-09 | Campaign For E Waste in Campus_Class Activity | Innovation & Awareness |
| EW-13 | 2026-09-29 | LEED Certification of Green Buildings in India | Research, Policy & Sustainability |
| EW-14 | 2026-10-04 | Case Studies E waste | Research, Policy & Sustainability |

**CRITICAL INTEGRITY REQUIREMENT:** Screenshots show a green "Turned in" badge beside EW-02 through EW-14, and no confirmed green badge for EW-01. This is screenshot evidence only, NOT independent proof that the actual assignments, files, or grading are complete. The student explicitly says actual work is not all finished. Model these as separate variables:
- `portalBadgeObserved`: `true` for EW-02–EW-14, `false` for EW-01, with `portalBadgeText: "Turned in"` only where visually observed.
- `actualSubmissionStatus`: `unverified` for ALL 14, until user checks.
- `workStatus`: `not_reviewed` for ALL 14, until files and instructions are examined.
- `qualityStatus`: `not_assessed` for ALL 14.
- `grades`: absent/null by default.
- `dueDate`: null (the portal dates are displayed submission/activity dates, not confirmed deadlines).
Never display "13 assignments completed", "93% complete", invented scores, fabricated impact metrics, automatic grades or fictional files. It is fine to state "13 portal badges observed" and "14 assignment records". Where calculation is impossible show “Not evaluated yet” or “Awaiting data,” not fake percentages.

### NAVIGATION / ROUTES
1. `/` — Overview / Command Center: bespoke editorial welcome, total 14 records, verification state, evidence coverage, actionable next steps, chronological activity strip, categories distribution (4/3/4/2/1), outstanding reviews, recent work. Cards are clickable and powered by records, not mock figures.
2. `/assignments` — Assignment Library: table/grid toggle, search, category filters, portal badge filter, actual work status filter, sortable dates, pinned assignments, bulk review actions, progress context, accessible responsive cards.
3. `/assignments/[id]` — Deep assignment workbench: original title and clean title, ID, portal date, separate status fields, official requirements (initially empty), user notes, objective, tasks/checklist, deliverables, files and previews, data insights, citations/sources, feedback, revision history, quality-review checklist, and a publish-to-showcase toggle. Empty sections should explain how to add material.
4. `/analytics` — Research & Data Lab: sections for India vs world e-waste, state tracker, carbon-footprint workbook, company compliance comparison, elemental recovery process, toxic substances, LEED and case-study findings. Initially show well-designed **awaiting-data panels**; implement real charts/maps/calculators only when source datasets and units are available. Every chart needs source, period, unit and calculation method.
5. `/timeline` — Course chronology and milestones: show 14 dated records across July–October 2026, distinguish recorded portal activity date from manually-added deadlines, and show milestones/tasks if provided.
6. `/library` — Evidence Vault: assignment-linked files, filename/type/size, uploads, drag-drop, safe preview support for PDF, images, text, CSV, XLSX, DOCX; provide download for unsupported types such as PPTX unless robust conversion is implemented. Search and filter by assignment. No imaginary preloaded files.
7. `/showcase` — Public-facing, read-only, publication-controlled display of selected completed assignment work, real insights, sources and artifacts. Default private until published.
8. `/presentation` — Full-screen presenter view with keyboard controls, concise subject narrative, selected real highlights, assignment index and source-backed visuals. Gracefully show incomplete slots as unpublished; never manufacture scientific claims.
9. `/settings` — Editable student/course metadata placeholders (do not borrow friend's details), theme, reduced motion, data management, backup/export/import, publish settings, and storage transparency.

### UNIQUE DIFFERENTIATORS
- **Dual Truth Status**: portal badge vs actual verified completion vs quality review — separate visual labels and counts.
- **Evidence Chain**: every insight/claim can link back to an uploaded assignment file, worksheet, source and page/section, and is clearly tagged `observed`, `user-provided`, `calculated` or `unverified`.
- **Completion Quality Checklist**: requirements reviewed, files attached, calculations validated, citations checked, presentation polished; optional weighted readiness only if weights are defined and labeled.
- **From coursework to story**: a narrative pathway of observe → measure → recover → regulate → innovate → communicate; connect assignments without inventing dependencies.
- **Professor-ready presentation mode**: full-screen keyboard-operated walkthrough, accessible charts, citations, and print-friendly handouts.
- **Strong empty states**: gorgeous, meaningful “Awaiting evidence” states instead of fabricated analytics.
Keep these coherent; avoid feature bloat in the initial version.

### DATA MODEL
Use TypeScript and a validated seed dataset. Define an `Assignment` type with at least:
`id`, `portalTitle`, `displayTitle`, `portalDate`, `category`, `portalBadgeObserved`, `portalBadgeText?`, `actualSubmissionStatus`, `workStatus`, `qualityStatus`, `dueDate?`, `priority?`, `requirements[]`, `checklist[]`, `notes`, `summary?`, `deliverables[]`, `fileIds[]`, `evidenceRefs[]`, `insights[]`, `grade?`, `feedback?`, `published`, `updatedAt`, `auditHistory[]`.
Enums:
- actualSubmissionStatus = `unverified | not_submitted | submitted | resubmission_needed`
- workStatus = `not_reviewed | planned | in_progress | ready_for_review | verified_complete`
- qualityStatus = `not_assessed | needs_improvement | meets_requirements | polished`
Also model file metadata, sources/citations, analytics datasets (units, dates, source), presentation slides, and app settings. Do not expose private uploads in public routes.

### TECHNICAL IMPLEMENTATION
Preferred stack: Next.js App Router + TypeScript + Tailwind CSS + shadcn/ui or accessible Radix primitives + Lucide icons + Recharts for actual chart data. Use a well-structured reusable component system, clean CSS tokens, strict lint/type checks. Check the project's existing environment before deciding exact package versions.
For a first working local MVP with no backend credentials: seed the records and persist editable metadata locally; consider IndexedDB for local file blobs. Provide a visible "Stored on this device" explanation, reliable JSON export/import with schema validation, and a warning that clearing browser data or switching devices may lose unsynced changes. Never pretend local storage is shared cloud persistence. Prepare a clean storage service abstraction so a later authenticated Supabase/Postgres + Storage implementation is straightforward. Do not ask for credentials or invent environment variables before they are needed.
Secure authenticated admin controls if/when cloud deployment introduces mutable shared data. Do NOT copy friend's easy-to-toggle `?edit` / local client-side "owner" authorization concept as security. Public showcase must be read-only, published items only, and publish decisions under authenticated control when the backend exists.
PDF preview with PDF.js or safe browser-native viewing; spreadsheet render with SheetJS-compatible tooling if licensing fits project; DOCX preview using sanitized conversion; safe fallback for unsupported files. Sanitize converted HTML, validate extensions/MIME/size, prevent script execution in uploads, avoid rendering hostile HTML unsandboxed. Do not embed huge PDF base64 payloads in app source.
No paid services required for local build. Give a documented deployment path suitable for Vercel if applicable. Keep secrets server-only.

### ACCESSIBILITY / INTERACTION / PERFORMANCE
Semantic headings, proper focus management, keyboard navigation, contrast-aware theme, accessible input labels, useful loading/error/empty states, responsive charts and tables, reduced-motion support, no layout overflow at 390px, dark/light theme persistence, snappy interaction without gimmicks. Search, filter, sort, theme toggle, status editing, assignment navigation, task toggles and importing/exporting data must actually work. If a feature is not built, label it as "planned" rather than showing a dead button.

### IMPLEMENTATION PHASES
**Phase A (build now, end-to-end):** original visual system; Next.js app scaffold; seed all 14 records exactly; overview; assignment browser/search/filter; detailed assignment pages; editable status and checklist; timeline; theme switcher; functioning local persistence and backup/export; graceful evidence/analytics empty states; mobile responsive UI; README.
**Phase B (after I upload actual files):** evidence vault uploads/previews; worksheet parsing and source-backed analytics; assignment-specific tasks and feedback; showcase publishing logic; file/data citations.
**Phase C (polish + deployment):** full presentation mode, cloud authentication/persistence if requested, final content review, export/print, production hardening, deployment.
Be capable of implementing A now without pretending B/C is done. If time allows implement more, but correctness beats flashy half-working extras.

### OUTPUT REQUIREMENTS & ACCEPTANCE TESTS
Before coding, briefly produce an architecture plan, route map, component breakdown, status model and design rationale. Then implement the working project, not merely a strategy response or a static picture. Use a componentized folder structure and reusable typed fixtures/data selectors. Provide project tree, install/run commands, README, any environment variable template without real secrets, and an explicit list of what works now vs what awaits future material.
Verify:
- EXACTLY 14 seeded assignments in the specified chronological order, with correct dates and exact raw portal titles.
- All actual work statuses initially `not_reviewed`, no invented files/marks/deadlines/completion percentages.
- EW-01 has no confirmed badge; EW-02 to EW-14 preserve only badge observation.
- Dashboard category distribution is exactly 4 analytics, 3 technical, 4 research, 2 innovation, 1 administrative.
- Search, filters, navigation, theme and editable status/checklist persist after reload.
- Mobile layout, keyboard controls and accessibility basics work.
- Tests/build pass (`npm run lint`, typecheck, `npm run build`, plus interaction or E2E tests where available).
- Data export and import round-trip properly, with clear errors for invalid files.
- No copied friend details, friend submissions, lorem-ipsum findings or stock fake data.
- Showcase cannot expose unpublished private material.
Using Antigravity CLI execution tooling, run and inspect the UI at desktop and mobile sizes, fix errors and broken interactions. If unable to run a command, state what was not verified.

### DESIGN REVIEW STANDARD
Evaluate every page against: distinctive original identity, hierarchy, usefulness, evidence integrity, responsiveness, accessibility, coherent states, and professor-ready presentation quality. Avoid generic admin-dashboard composition or 10 cards that all look alike. Build a highly intentional homepage with editorial moments and polished but restrained microinteractions. Make it original, ambitious and trustworthy.

### REQUIRED FIRST EXECUTION MILESTONE
1. Confirm how you will use the friend reference without copying it.
2. Summarize the architecture, route hierarchy and major interface modules.
3. Point out any source gaps without inventing details.
4. Implement Phase A in the available coding environment, showing actual working code and verification. Do not stop after providing a plan. Use sensible defaults where noncritical choices are unspecified.
