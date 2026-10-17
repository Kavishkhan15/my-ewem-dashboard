# RECLAIM MAGNUM — Design System, 9-Route Architecture & UX Specification Survey

**Document ID:** `SURVEY-EXP-03`  
**Agent:** `survey_explorer_3` (Design System, 9 Routes & UX Specification Explorer)  
**Date:** 2026-10-12 / 2026-10-13  
**Status:** Complete Read-Only Investigation  
**Target Root:** `/home/anonymous/EWEM-dashboard/RECLAIM`  

---

## 1. Executive Summary & Problem Boundary

This investigation establishes the definitive UX architecture, design system specifications, route blueprints, accessibility protocols, and documentation criteria for **RECLAIM — E-Waste Intelligence & Management Studio**. Grounded in `DESIGN.md`, `AGENTS.md`, `references/PROJECT_BRIEF.md`, and the authoritative 14-assignment seed dataset (`data/assignments.seed.json`), this survey provides the concrete contracts and UX blueprints required for subsequent specialist agent waves.

### Key Discoveries & Status:
1. **Visual Direction:** The aesthetic is an *environmental research observatory meets premium editorial instrument*—characterized by a dark graphite canvas (`#0B1110`), elevated panels (`#151D1A`), hairline borders (`#314037`), and crisp bone typography (`#EFF5EF`), accented with deliberate emerald (`#32CF89`), electric lime (`#C4F46D`), cyan (`#79CFDA`), and amber warnings (`#F2BC6E`).
2. **Architecture Status:** Wave 1 foundational scaffolding is partially established in `src/` (layout, partial app shell, UI primitives, domain types, storage provider, initial `/` and `/assignments`). Seven routes (`/assignments/[id]`, `/analytics`, `/timeline`, `/library`, `/showcase`, `/presentation`, `/settings`) remain to be implemented in Wave 2.
3. **Data Integrity:** The seed verification test `tests/seedIntegrity.test.ts` passes completely (5 of 5 tests), confirming 14 sequential records (`EW-01` to `EW-14`), 13 observed portal badges, and 0 verified complete submissions at baseline.
4. **Current Build Blockers:** The TypeScript compiler (`tsc --noEmit`) and production build (`next build`) currently report type errors:
   - `TS2882: Cannot find module or type declarations for side-effect import of '@/styles/globals.css'` in `src/app/layout.tsx:4`
   - `TS2307: Cannot find module '../../data/assignments.seed.json'` in `src/lib/storage/seedData.ts:2`
   These errors stem from missing Next.js type environment declarations (`next-env.d.ts`) and TypeScript `tsconfig.json` include scopes. Actionable fixes are detailed in Section 8.

---

## 2. Design System & Environmental Research Observatory Aesthetic

### 2.1 Color Palette & Semantic Design Tokens

The visual language rejects generic SaaS dashboards, eco clip-art, neon oversaturation, and glassmorphism wallpaper. It implements a dual-personality palette: a pragmatic, high-density **Private Workspace** and a serene, narrative **Public Showcase**.

| Semantic Token | Dark Mode Hex | Light Mode Hex | Contrast Ratio (Dark) | Contrast Ratio (Light) | Role & Usage Rule |
|---|---|---|---|---|---|
| `--canvas` | `#0B1110` | `#F5F8F4` | Baseline (Page) | Baseline (Page) | Background canvas. Evokes deep graphite botanical slate. |
| `--surface` | `#151D1A` | `#FFFFFF` | N/A | N/A | Primary panel cards, sidebar, table containers. |
| `--surface-raised` | `#1C2922` | `#EDF3ED` | N/A | N/A | Elevated states, dropdown menus, modal backgrounds, hover containers. |
| `--text` | `#EFF5EF` | `#14241D` | **17.5:1** on canvas | **14.2:1** on canvas | Primary headings, titles, active labels, body copy. Exceeds WCAG AAA. |
| `--text-muted` | `#A4B9AD` | `#556B5F` | **6.2:1** on surface | **5.3:1** on surface | Secondary metadata, dates, captions, supporting descriptions. Exceeds WCAG AA (4.5:1). |
| `--border` | `#314037` | `#D8E4DA` | **2.5:1** (structural) | **2.8:1** (structural) | 1px hairline dividers, card outlines, table row separators. |
| `--emerald` | `#32CF89` | `#147A4B` | **10.5:1** on canvas | **6.1:1** on canvas | Primary action buttons, verified indicators, active nav marker, pulse dot. |
| `--lime` | `#C4F46D` | `#527B10` | **15.2:1** on canvas | **4.9:1** on surface | Rare focal emphasis, polished quality tag, patent/innovation badge. |
| `--cyan` | `#79CFDA` | `#116979` | **11.8:1** on canvas | **6.4:1** on canvas | Scientific metrics, data analytics categories, cross-reference links. |
| `--amber` | `#F2BC6E` | `#8D5A12` | **10.9:1** on canvas | **6.7:1** on canvas | True warnings, unverified submission alerts, pending review status. |
| `--danger` | `#F48F87` | `#A52D28` | **7.8:1** on canvas | **7.4:1** on surface | Critical errors, not-submitted alerts, deletion confirmations only. |

*Implementation Note:* Hue must never be the sole conveyor of status. Every badge, indicator, and alert must pair color with explicit text and iconography.

### 2.2 Typography Hierarchy & Font Stack

RECLAIM pairs an editorial serif for intellectual gravitas with a clean grotesque sans for operational precision and a monospace face for scientific data points.

1. **Editorial Display:** `Instrument Serif` (fallback: `Georgia`, `serif`).
   - Used for primary hero headlines, route titles, and showcase narrative callouts.
   - Distinct from the friend's reference which used `Fraunces`.
2. **Interface Sans:** `Geist Sans` or `Manrope` (fallback: `system-ui`, `-apple-system`, `sans-serif`).
   - Used for general UI, buttons, table contents, and form inputs.
   - Numerals must utilize tabular alignment (`font-variant-numeric: tabular-nums`) for KPI counters and timeline dates.
3. **Restrained Monospace:** `Geist Mono` (fallback: `ui-monospace`, `monospace`).
   - Used exclusively for assignment IDs (`EW-01` to `EW-14`), portal dates (`2026-07-24`), metric units (`kg CO2e`), and JSON export schema indicators.

#### Responsive Type Scale:

| Level | Desktop Size / Line-Height | Mobile Size / Line-Height | Tracking | Font Family |
|---|---|---|---|---|
| **Display Hero** | 56px / 1.1 | 36px / 1.15 | `-0.02em` | Instrument Serif |
| **H1 (Page Title)** | 40px / 1.2 | 28px / 1.25 | `-0.015em` | Instrument Serif / Geist Sans Bold |
| **H2 (Section Header)** | 28px / 1.3 | 22px / 1.3 | `-0.01em` | Geist Sans SemiBold |
| **H3 (Card Header)** | 20px / 1.4 | 18px / 1.4 | `-0.005em` | Geist Sans Medium |
| **Body (Default)** | 16px / 1.6 | 15px / 1.55 | `0` | Geist Sans Regular |
| **Body Small** | 14px / 1.5 | 13px / 1.5 | `0` | Geist Sans Regular |
| **Metadata / Caption** | 12px / 1.4 | 11px / 1.4 | `+0.02em` | Geist Mono / Geist Sans |

### 2.3 Spatial Grid, Geometry & Radii

- **Grid System:** Strict 8px baseline rhythm (`space-2 = 8px`, `space-4 = 16px`, `space-6 = 24px`, `space-8 = 32px`).
- **Corner Radii:** Controlled, elegant radii:
  - Cards & primary panels: `rounded-xl` (12px) or `rounded-2xl` (16px).
  - Buttons, inputs & dropdowns: `rounded-lg` (8px).
  - Status badges & pill tags: `rounded-full` (9999px).
- **Hairline Borders:** 1px borders using `border-border` (`#314037` in dark, `#D8E4DA` in light) to establish crisp, architectural separation without visual heaviness.
- **Elevation:** Subtle shadows (`shadow-sm` on panels, `shadow-md` on modals); never heavy drop-shadows or blurry glow overlays.

### 2.4 Motion & Micro-Interactions

- **Duration:** Micro-interactions range strictly between 120ms and 200ms (`transition-all duration-150 ease-out`).
- **Permitted Motion:** Subtle opacity shifts, slight scale transforms on active states (`active:scale-[0.98]`), gentle pulse indicator on the RECLAIM live beacon.
- **Banned Motion:** Infinite floating animations, massive parallax scrolls, decorative particle networks, jarring layout reflows.
- **Accessibility:** Must strictly adhere to `prefers-reduced-motion: reduce`. When active, animations degrade to instant transitions.

### 2.5 Component State Machine (9 Mandatory States)

Every interactive component across all routes must explicitly implement and handle nine distinct states:
1. `default`: Rest state with crisp contrast and accessible borders.
2. `hover`: Subtle surface elevation (`hover:bg-surface-raised`), 150ms ease.
3. `focus-visible`: High-contrast emerald outline (`outline: 2px solid var(--emerald)`, `outline-offset: 2px`).
4. `active / selected`: Visual confirmation of selection (`scale-[0.99]`, distinct border highlight).
5. `disabled`: Reduced opacity (50%), cursor `not-allowed`, zero pointer events.
6. `loading`: Skeleton placeholder matching exact dimensions, or localized spinner; never blank screens.
7. `empty / no-data`: Tailored, reassuring empty state explaining what is missing and providing an action.
8. `validation-error`: Amber/danger highlight with contextual inline error message and recovery instruction.
9. `success`: Green check feedback, toast notification, or transient badge confirmation.

### 2.6 Anti-Patterns & Violations to Prohibit

- **NO Cloned Portfolios:** Do not copy the friend's reference `Index.html`, student name, roll number, or `Fraunces` layout.
- **NO Fabricated Progress:** Never render a "93% Complete" or "13/14 Done" radial chart. Green portal badges are observations, NOT verified submissions.
- **NO Fake Datasets:** Never display mock scientific carbon savings or state collection tonnage as real research without attached data.
- **NO Glassmorphism Wallpaper:** No heavy backdrop-blur cards that impede text legibility.
- **NO Dead Interactive Elements:** Every button and toggle must be wired to real state or explicitly labeled "Planned in Phase B".

---

## 3. Complete 9-Route Functional & UX Specifications

```
                              ┌───────────────────────────────────────────────┐
                              │            RECLAIM APPLICATION SHELL          │
                              │ (Sidebar Rail 256px / Top Header 56px Mobile) │
                              └──────────────────────┬────────────────────────┘
                                                     │
         ┌───────────────┬───────────────────────────┼───────────────────────────┬───────────────┐
         │               │                           │                           │               │
         ▼               ▼                           ▼                           ▼               ▼
     Route 1:        Route 2:                    Route 3:                    Route 4:        Route 5:
   Command Center  Assignment Library      Assignment Workbench        Analytics Lab   Course Timeline
       (`/`)        (`/assignments`)       (`/assignments/[id]`)       (`/analytics`)    (`/timeline`)
         │               │                           │                           │               │
         │               ├─────────┬─────────────────┘                           │               │
         │               │         │                                             │               │
         ▼               ▼         ▼                                             ▼               ▼
     Route 6:        Route 7:  Route 8:                                      Route 9:
  Evidence Vault  Showcase   Presentation                              Settings & Data
   (`/library`)  (`/showcase`) (`/presentation`)                       (`/settings`)
```

### 3.1 Route 1: `/` (Command Center)

- **Role:** Central mission control delivering executive transparency over the 14 EW/EM assignments.
- **Header & Hero:**
  - Editorial welcome title: "E-Waste Intelligence & Management Studio".
  - Subtitle: "From discarded circuitry to systematic evidence."
  - Beacon status badge: "Dual-Truth Verification Engine Active".
  - Primary CTAs: "Open Assignment Library" (links to `/assignments`) and "Faculty Showcase" (links to `/showcase`, displaying active count).
- **KPI Metrics Ribbon (4 Cards):**
  1. *Coursework Register:* **14** Tracked Assignments (`100% cataloged`).
  2. *Portal Badges Observed:* **13** "Turned in" badges observed in LMS screenshots (`EW-01` unconfirmed). Callout: "Observations only — not verified work."
  3. *Verified Submissions:* **0** Verified Complete (default state until student audits files).
  4. *Pending Audit Queue:* **14** Awaiting Review (actionable operating workload).
- **Core Modules:**
  - **Action Review Queue:** Highlights the top 3 unreviewed assignments (`workStatus === 'not_reviewed'`) with one-click jump to their workbenches.
  - **Category Distribution (4/3/4/2/1):**
    - Data Analytics & Tracking: **4**
    - Technical & Recovery Processes: **3**
    - Research, Policy & Sustainability: **4**
    - Innovation & Awareness: **2**
    - Assessment / Administrative: **1**
    - Interactive bar/ring visualization showing absolute counts (never misleading percentages). Clicking a category navigates to `/assignments?category=...`.
  - **Activity Chronology Strip:** Horizontal timeline preview showing portal activity milestones spanning July 24 to October 04, 2026.
  - **Truth Architecture Callout:** Editorial notice clearly differentiating screenshot observations from independent verification.

### 3.2 Route 2: `/assignments` (Assignment Library)

- **Role:** High-performance search, filtering, and comparison studio across all 14 assignments.
- **Controls & Toolbar:**
  - Real-time text search (matches ID, `displayTitle`, `portalTitle`, and keywords).
  - Category selector chips (All, Data Analytics, Technical, Research, Innovation, Assessment).
  - Dual-Truth Status Filter:
    - Filter by Observed Portal Badge (`All`, `Observed "Turned in"`, `Not Observed`).
    - Filter by Actual Work Status (`All`, `Not Reviewed`, `Planned`, `In Progress`, `Ready for Review`, `Verified Complete`).
    - Filter by Quality Status (`All`, `Not Assessed`, `Needs Improvement`, `Meets Requirements`, `Polished`).
  - Sort selector: Chronological Portal Date (asc/desc), ID (`EW-01` to `EW-14`), Title.
  - View Switcher: Grid View vs. Tabular List View.
- **Grid View Composition:**
  - Responsive cards (`sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`).
  - Card anatomy:
    - Top: ID badge (`EW-XX`), Category chip, Portal Activity Date.
    - Title: Clean `displayTitle` with tooltip revealing exact raw `portalTitle`.
    - Status Row: Observed Badge pill (`Turned in (Observed)` or `Not Observed`) paired with Actual Work Status pill.
    - Progress Footer: Attached file count, task completion tally (e.g. `0/3 Tasks`), and action button ("Open Workbench →").
- **Table View Composition:**
  - High-density, keyboard-navigable tabular display.
  - Explicit columns: ID, Portal Title (raw), Category, Portal Date, Observed Badge, Work Status, Quality Status, Published Flag, Actions.
  - Sortable column headers with aria-sort attributes.
- **Empty State:** If filters yield 0 results, display search reset button and friendly message.

### 3.3 Route 3: `/assignments/[id]` (Assignment Workbench)

- **Role:** Deep operational workbench for auditing, writing, uploading, and publishing an individual assignment.
- **Header & Provenance:**
  - Breadcrumbs: `Assignments / EW-XX`.
  - Display Title: Prominent H1 (`displayTitle`).
  - Raw Portal Title Callout: Collapsible/expandable box displaying verbatim string (e.g., `Assignment 2_Submit the Class Activity_Map of e waste`).
  - Date Clarification: Clearly differentiates `Portal Activity Date: YYYY-MM-DD` from user-confirmed `Due Date: [Editable Date Input]`.
- **Dual-Truth Control Console (Right Rail / Sticky Header):**
  - Observed Portal Badge (Read-only observation).
  - Actual Submission Status Selector: `unverified` | `not_submitted` | `submitted` | `resubmission_needed`.
  - Work Progress Selector: `not_reviewed` | `planned` | `in_progress` | `ready_for_review` | `verified_complete`.
  - Quality Assessment Selector: `not_assessed` | `needs_improvement` | `meets_requirements` | `polished`.
  - Showcase Publication Toggle: Switch controlling `published: boolean` with explicit warning: "Publishing exposes this assignment on the faculty showcase."
- **Workbench Sections:**
  1. *Requirements & Objectives:* Rich text or markdown area for student notes and formal assignment specifications.
  2. *Checklist & Tasks:* Interactive task list. Add new tasks, toggle completion checkboxes, delete tasks.
  3. *Deliverables & Evidence Vault Link:* File upload drag-drop zone and list of attached `FileRecord` items with instant preview and download buttons.
  4. *Evidence Chain & Citations:* Structured citation manager (Source Title, URL, Citation text, Verification Date).
  5. *Quality Verification Gate:* 5-point audit checklist:
     - [ ] Official portal instructions examined.
     - [ ] Primary coursework files attached.
     - [ ] Calculations, code, or datasets validated.
     - [ ] Academic citations and bibliography verified.
     - [ ] Presentation polish approved for faculty showcase.
- **State Persistence:** All edits persist immediately to local storage via `updateAssignment(id, updates)`.

### 3.4 Route 4: `/analytics` (Research & Data Lab)

- **Role:** Scientific analytical notebook connecting coursework claims to actual empirical datasets.
- **Guiding Rule:** **Zero fabricated research charts.** If raw data is absent, render an elegant, informative "Awaiting Source Dataset" laboratory panel.
- **8 Core Analytical Modules:**
  1. `AN-01`: *India vs Global E-Waste Generation* (`EW-06`) — Per-capita and total mass metrics (CPCB vs Global E-Waste Monitor).
  2. `AN-02`: *State-Wise Dismantler & Collection Capacity* (`EW-08`) — State tracker data across Indian states (MTA capacity).
  3. `AN-03`: *Device Lifecycle Carbon Footprint* (`EW-07`) — CO2e savings from recovery parsed from Excel activity.
  4. `AN-04`: *Hazardous Toxic Substance Distribution* (`EW-01`) — Lead, Mercury, Cadmium, PBDE, BFR parts-per-million presence in PCBs.
  5. `AN-05`: *Corporate Compliance with E-Waste Management Rules* (`EW-10`) — EPR target fulfillment comparison matrix.
  6. `AN-06`: *Elemental Recovery Process Efficiency* (`EW-03`, `EW-09`) — Pyrometallurgical vs hydrometallurgical recovery yields for Gold, Copper, Silver.
  7. `AN-07`: *Green Building LEED Certification* (`EW-13`) — Energy efficiency and materials credits across Indian certified projects.
  8. `AN-08`: *E-Waste Case Studies Matrix* (`EW-14`) — Formal vs informal recycling sector outcomes.
- **Module Card Architecture:**
  - Header: Metric ID, Title, Scope, Target Unit, Target Period.
  - Provenance Badge: `unverified` | `user-provided` | `observed` | `calculated`.
  - Awaiting State: Clean laboratory diagram illustrating what data structure (e.g. CSV, Excel, JSON) is required to unlock live charts, with a direct CTA: "Attach Dataset in Workbench".
  - Interactive Demo Toggle: An optional "Toggle Verified Demo Data" switch allowing faculty to test Recharts visualizations (bar, line, and composition charts) with explicit "Demo Dataset" labeling.

### 3.5 Route 5: `/timeline` (Course Chronology)

- **Role:** Visual chronological journey through the semester from July 24 to October 04, 2026.
- **Chronological Registry (14 Anchor Points):**
  - July 24, 2026: `EW-01` (Toxic Chemicals_Any 5)
  - July 28, 2026: `EW-02` (Assignment 2_Submit the Class Activity_Map of e waste)
  - July 28, 2026: `EW-03` (Assignment 3_Elemental Recovery Process Update)
    *(Crucial: July 28 features two distinct assignments submitted on the same day; they must render as separate chronological cards with distinct times/ordering).*
  - July 31, 2026: `EW-04` (Assignment Zero_Check AAP)
  - August 02, 2026: `EW-05` (Assignment 1_E waste Traker)
  - August 04, 2026: `EW-06` (E waste India Vs World Data Task_Class Activity)
  - August 11, 2026: `EW-07` (Carbon Footprint Task_Excel activity Task)
  - August 12, 2026: `EW-08` (TE CMPN C PPT_State tracker submission Folder)
  - August 19, 2026: `EW-09` (E Waste Recovery Process_Modification for Design Patent)
  - September 02, 2026: `EW-10` (Indian Companies Following E waste Rules_Comparative Study)
  - September 06, 2026: `EW-11` (Novel Idea_E waste_Pitch Deck Submit Folder_CMPN C)
  - September 09, 2026: `EW-12` (Campaign For E Waste in Campus_Class Activity)
  - September 29, 2026: `EW-13` (LEED Certification of Green Buildings in India)
  - October 04, 2026: `EW-14` (Case Studies E waste)
- **Visual Design:**
  - Vertical chronological axis with month dividers (July, August, September, October 2026).
  - Node markers color-coded by category.
  - Clear labeling: "Portal Activity Date: YYYY-MM-DD" vs "Student Target Deadline: [Not Set]".
  - Card click action navigates directly to `/assignments/[id]`.

### 3.6 Route 6: `/library` (Evidence Vault)

- **Role:** Central repository for student file assets, research papers, worksheets, and presentations.
- **Upload Pipeline:**
  - Drag-and-drop zone with browse button.
  - Assignment association dropdown (binds file to `EW-01` through `EW-14`).
  - Client-side validation: Max file size (e.g. 15MB), permitted MIME types (PDF, PNG, JPG, CSV, TXT, DOCX, XLSX, PPTX).
  - Safe base64 or blob URL generation for client-side storage.
- **Evidence Grid & File Cards:**
  - Displays file icon based on type, file name, formatted size (`KB/MB`), upload date, and associated assignment link.
  - Trust & Safety Indicator: `Verified Safe` pill (confirms no executable scripts).
  - Actions: Safe Preview modal, Download file, Delete file.
- **Safe Preview Modal:**
  - PDF: Native browser embed or sandboxed canvas.
  - Images: Constrained aspect ratio lightbox with zoom.
  - CSV / Plain Text: Sandboxed monospace table / text viewer.
  - DOCX / PPTX: Safe document info card with direct "Download to View" fallback (prevents insecure unsandboxed DOM rendering).
- **Empty State:** "Evidence Vault Empty. Upload coursework documents or worksheets from your assignments to build your verifiable academic archive."

### 3.7 Route 7: `/showcase` (Faculty Showcase)

- **Role:** Curated, serene, read-only portfolio presented to professors and external evaluators.
- **Strict Privacy Barrier:**
  - Only assignments with `published === true` are rendered.
  - Zero leakage of internal draft notes, unverified checklists, or raw scratchpad files.
- **Empty State (Default Initialization):**
  - Because all 14 assignments start with `published: false`, the initial state must be an elegant academic placeholder:
  - "Faculty Showcase in Preparation: No assignments have been published for public presentation yet. Review your coursework and mark ready assignments as 'Published' in the Assignment Workbench."
- **Published Assignment Presentation:**
  - Magazine-style editorial layout:
    - Academic title (`displayTitle`), Category badge, Verified Date.
    - Executive Abstract / Research Problem.
    - Methodology & Key Findings.
    - Attached Verified Evidence (downloadable final PDFs/reports).
    - Academic Citations & Source Provenance.
  - Read-only: No status dropdowns, no edit buttons, no internal delete actions.

### 3.8 Route 8: `/presentation` (Faculty Presentation Mode)

- **Role:** Full-screen, projector-scale presentation deck with keyboard controls for classroom defense.
- **Display & Projector Typography:**
  - Scaled typography: Headlines 48–64px, body text 22–26px, metadata 16–18px.
  - High-contrast color enforcement ensuring readability on low-lumen projectors.
- **Keyboard Navigation Controls:**
  - `ArrowRight` or `Space`: Advance to next slide.
  - `ArrowLeft`: Return to previous slide.
  - `Escape`: Exit presentation mode (returns to previous view or shows exit confirmation).
  - Visual controls: On-screen "Previous" / "Next" buttons, slide counter (`Slide 3 of 8`), and progress rail.
- **Slide Deck Structure (8 Curated Slides):**
  - **Slide 1:** *Title & Abstract* — RECLAIM Studio, student credentials, academic mission.
  - **Slide 2:** *Curriculum Architecture* — 14 assignments, 5 core categories, Dual-Truth methodology.
  - **Slide 3:** *Data Analytics & Tracking* — India vs World, State Tracker, Carbon Footprint.
  - **Slide 4:** *Technical & Recovery Processes* — E-Waste mapping, pyrometallurgy, design patent for recovery.
  - **Slide 5:** *Research, Policy & Sustainability* — Hazardous chemicals, Indian E-Waste Rules compliance, LEED buildings, case studies.
  - **Slide 6:** *Innovation & Campus Awareness* — Pitch deck, campus collection campaigns.
  - **Slide 7:** *Evidence Chain & Verification* — Dual-truth comparison between LMS badge observations and independent verification.
  - **Slide 8:** *Conclusions & Defense Q&A* — Final reflections, faculty review portal.
- **Footers:** Standard citation footer on every slide citing source frameworks (CPCB, Global E-Waste Monitor, Basel Convention).

### 3.9 Route 9: `/settings` (Settings & Portability Lab)

- **Role:** Student profile customization, theme preferences, storage transparency, and disaster recovery.
- **Module 1: Appearance & Accessibility:**
  - Theme selector: Dark, Light, System.
  - Reduced Motion toggle: Forces `prefers-reduced-motion` across all studio animations.
- **Module 2: Student & Course Metadata:**
  - Form fields: Student Name, Student ID / Roll Number, Course Name, Institution, Academic Year.
  - Clean placeholders (`Student Researcher`, `EW-EM-2026`).
  - Does NOT pre-fill or borrow private student identifiers from reference files.
- **Module 3: Local Storage Transparency:**
  - Storage engine indicator: "Device-Local Persistence Active (`localStorage`)".
  - Storage breakdown table: Lists key names (`reclaim_assignments_v1`, `reclaim_profile_v1`, `reclaim_files_v1`), item counts, and approximate KB size.
  - Privacy Warning: "All coursework data resides entirely within your local browser. Clearing browser cookies or cache will erase unexported progress."
- **Module 4: Backup Export, Import & Recovery:**
  - **Export Backup Button:** Triggers download of formatted JSON (`reclaim-backup-YYYY-MM-DD.json`). Validates version header (`version: 1`).
  - **Import Backup File Picker:**
    - Schema validation parser: Inspects JSON structure, validates version, checks for required assignment array, confirms 14 records with IDs `EW-01` through `EW-14`.
    - Safe error handling: If invalid JSON or corrupted schema is uploaded, displays explicit error toast without crashing or corrupting state.
  - **Reset to Seed:** Red button with confirmation dialog restoring the pristine 14-record initial seed.

---

## 4. Dual-Truth State Machine & Integrity Rules

### 4.1 Four Distinct Dimensions of Truth

```
┌────────────────────────────────────────────────────────────────────────┐
│                        DIMENSION 1: PORTAL OBSERVATION                 │
│         What was observed in LMS screenshots (Immutable Observation)   │
│         Values: portalBadgeObserved = true/false                       │
│                 portalBadgeText = "Turned in" | null                   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (Independent from)
┌───────────────────────────────────▼────────────────────────────────────┐
│                    DIMENSION 2: ACTUAL SUBMISSION STATUS               │
│         Whether student actually submitted final deliverables          │
│         Values: unverified | not_submitted | submitted | resubmission_needed│
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (Independent from)
┌───────────────────────────────────▼────────────────────────────────────┐
│                       DIMENSION 3: WORK PROGRESS                       │
│         Actual completion state of files, tasks, and requirements      │
│         Values: not_reviewed | planned | in_progress | ready_for_review│
│                 | verified_complete                                    │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ (Independent from)
┌───────────────────────────────────▼────────────────────────────────────┐
│                     DIMENSION 4: QUALITY ASSESSMENT                    │
│         Evaluation against academic excellence criteria                │
│         Values: not_assessed | needs_improvement | meets_requirements  │
│                 | polished                                             │
└────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Exact 14-Assignment Seed Alignment

The table below reflects the exact ground truth established in `data/assignments.seed.json`:

| ID | Portal Date | Exact Raw `portalTitle` | Clean `displayTitle` | Category | Observed Badge | Work Status |
|---|---|---|---|---|---|---|
| **EW-01** | 2026-07-24 | `Toxic Chemicals_Any 5` | Toxic Chemicals — Any Five | Research, Policy & Sustainability | `false` (None) | `not_reviewed` |
| **EW-02** | 2026-07-28 | `Assignment 2_Submit the Class Activity_Map of e waste` | Assignment 2 — E-Waste Map | Technical & Recovery Processes | `true` (`Turned in`) | `not_reviewed` |
| **EW-03** | 2026-07-28 | `Assignment 3_Elemental Recovery Process Update` | Assignment 3 — Elemental Recovery Process | Technical & Recovery Processes | `true` (`Turned in`) | `not_reviewed` |
| **EW-04** | 2026-07-31 | `Assignment Zero_Check AAP` | Assignment Zero — Check AAP | Assessment / Administrative | `true` (`Turned in`) | `not_reviewed` |
| **EW-05** | 2026-08-02 | `Assignment 1_E waste Traker` | Assignment 1 — E-Waste Tracker | Data Analytics & Tracking | `true` (`Turned in`) | `not_reviewed` |
| **EW-06** | 2026-08-04 | `E waste India Vs World Data Task_Class Activity` | India vs. World Data Task | Data Analytics & Tracking | `true` (`Turned in`) | `not_reviewed` |
| **EW-07** | 2026-08-11 | `Carbon Footprint Task_Excel activity Task` | Carbon Footprint Excel Task | Data Analytics & Tracking | `true` (`Turned in`) | `not_reviewed` |
| **EW-08** | 2026-08-12 | `TE CMPN C PPT_State tracker submission Folder` | State Tracker Submission Presentation | Data Analytics & Tracking | `true` (`Turned in`) | `not_reviewed` |
| **EW-09** | 2026-08-19 | `E Waste Recovery Process_Modification for Design Patent` | Recovery Process Design Patent | Technical & Recovery Processes | `true` (`Turned in`) | `not_reviewed` |
| **EW-10** | 2026-09-02 | `Indian Companies Following E waste Rules_Comparative Study` | Indian Companies Rule Compliance Study | Research, Policy & Sustainability | `true` (`Turned in`) | `not_reviewed` |
| **EW-11** | 2026-09-06 | `Novel Idea_E waste_Pitch Deck Submit Folder_CMPN C` | Novel Idea Pitch Deck | Innovation & Awareness | `true` (`Turned in`) | `not_reviewed` |
| **EW-12** | 2026-09-09 | `Campaign For E Waste in Campus_Class Activity` | Campus E-Waste Campaign | Innovation & Awareness | `true` (`Turned in`) | `not_reviewed` |
| **EW-13** | 2026-09-29 | `LEED Certification of Green Buildings in India` | LEED Green Building Certification Study | Research, Policy & Sustainability | `true` (`Turned in`) | `not_reviewed` |
| **EW-14** | 2026-10-04 | `Case Studies E waste` | E-Waste Comprehensive Case Studies | Research, Policy & Sustainability | `true` (`Turned in`) | `not_reviewed` |

### 4.3 Baseline State Invariants
- `totalRecords`: Exactly **14**.
- `portalBadgeObserved`: Exactly **13** `true`, exactly **1** `false` (`EW-01`).
- `actualSubmissionStatus`: Exactly **14** `'unverified'`.
- `workStatus`: Exactly **14** `'not_reviewed'`.
- `qualityStatus`: Exactly **14** `'not_assessed'`.
- `dueDate`: Exactly **14** `null`.
- `grade`: Exactly **14** `null`.
- `published`: Exactly **14** `false`.
- `files`: Exactly **14** empty arrays `[]`.
- `tasks`: Exactly **14** empty arrays `[]`.

---

## 5. Accessibility & Responsive Viewport QA Matrix

### 5.1 WCAG 2.2 AA Compliance Standards
- **Color Contrast:** All body text and headings achieve > 4.5:1 against their containing surface. Metadata achieves > 4.5:1. Active borders achieve > 3.0:1.
- **Focus Rings:** Explicit global focus ring defined in `src/styles/globals.css`:
  ```css
  *:focus-visible {
    outline: 2px solid var(--emerald);
    outline-offset: 2px;
  }
  ```
- **Semantic Structure:** Every page contains exactly one `<h1>`, followed by hierarchical `<h2>` and `<h3>` tags. Interactive actions utilize native `<button>` or `<Link>` elements, never clickable `<div>` without keyboard handlers.
- **Screen Reader Support:** All icon-only buttons include `aria-label` (e.g., `aria-label="Toggle Theme"`, `aria-label="Grid view"`). Dialogs implement `aria-modal="true"` and `role="dialog"`.

### 5.2 Multi-Viewport Responsive Matrix

| Viewport Width | Device Target | Navigation Rail Layout | Content Layout | Overflow Rule | Touch Targets |
|---|---|---|---|---|---|
| **320px** | Small Mobile Smoke Check | Hidden drawer; menu button | Single column (`grid-cols-1`); cards stack vertically | `overflow-x: hidden`; no horizontal scroll | Min 44×44px |
| **390px** | iPhone 12/13/14/15 | 56px top header + slide-in drawer | Single column cards; compact search bar; condensed table/card view | Zero horizontal scroll | Min 44×44px |
| **768px** | iPad / Tablet Portrait | Collapsed navigation sidebar or drawer | 2-column bento grids; 8-column layout logic | Contained scroll for wide tables | Min 40×40px |
| **1280px** | Standard Laptop | Fixed 256px sidebar navigation rail | 3-column / 4-column bento grids; max width 1280px | Full view | Min 36×36px |
| **1440px+** | Pro Desktop / 4K Monitor | Fixed 256px sidebar navigation rail | Fluid 12-column grid; max width 1480px; generous 32px gutters | Full view | Min 36×36px |

### 5.3 Global Keyboard Interaction Architecture

| Key / Key Combination | Context | Triggered Action |
|---|---|---|
| `Tab` / `Shift + Tab` | Global | Move forward / backward through interactive focus order. |
| `Enter` / `Space` | Global | Activate focused button, link, or toggle. |
| `ArrowRight` / `Space` | Presentation Mode (`/presentation`) | Advance to next presentation slide. |
| `ArrowLeft` | Presentation Mode (`/presentation`) | Return to previous presentation slide. |
| `Escape` | Presentation Mode | Exit presentation mode to previous route. |
| `Escape` | Modals & Mobile Drawer | Close open modal or mobile navigation drawer, returning focus to trigger. |
| `Escape` | Search Inputs | Clear active search text query. |

---

## 6. Privacy Perimeter, Originality & Security Guardrails

### 6.1 Absolute Isolation from Reference Student Identity
- The friend's reference `Index.html` is strictly quarantined.
- Under NO circumstance may the friend's name, roll number, college name, professor name, or submitted essay text be committed to `src/`, `public/`, or production bundles.
- Seed student profile defaults to generic placeholder:
  - Name: `Student Researcher`
  - ID: `EW-EM-2026`
  - Course: `Electronic Waste & Environmental Management (EW/EM)`
  - Institution: `Department of Computer Engineering`

### 6.2 Public Showcase Read-Only Enclosure
- The `/showcase` route enforces a strict publication filter: `assignments.filter(a => a.published)`.
- Unpublished assignments (`published === false`) must never leak their title, files, or notes into public views.
- No editing tools, status modifiers, or file delete buttons are rendered on `/showcase`.

### 6.3 Local-First Storage Transparency & Device Isolation
- All student data is stored client-side in the browser's `localStorage` under distinct keys:
  - `reclaim_assignments_v1`
  - `reclaim_profile_v1`
  - `reclaim_analytics_v1`
  - `reclaim_files_v1`
  - `reclaim_theme_v1`
- The UI must prominently display "Local Device Only" with a hard drive icon in the sidebar and settings page.
- Clear user warnings must state that clearing browser cache or switching devices will wipe state unless backed up via JSON export.

### 6.4 Uploaded File Sandboxing & XSS Mitigation
- Uploaded files are stored as safe data URLs or object URLs.
- Zero raw HTML execution: Never render uploaded HTML directly into the DOM (`dangerouslySetInnerHTML` is prohibited for user uploads).
- Previews for text, CSV, and markdown must be sanitized. Previews for PDF must use sandboxed iframes (`sandbox="allow-scripts"` prohibited or constrained) or canvas rendering.
- Unsupported files (e.g. DOCX, PPTX) fall back to safe binary download links.

---

## 7. Required Documentation Suite Specifications

The repository requires a complete, verified documentation suite under `docs/` and root `README.md`. Below is the required content specification for each deliverable:

1. **`README.md` (Root):**
   - Studio title, tagline, and mission overview.
   - Core architecture: Next.js 15 App Router, TypeScript strict, Tailwind CSS, Lucide icons.
   - Dual-truth philosophy and 14-assignment inventory table.
   - Local-first persistence and backup instructions.
   - Quickstart guide: installation (`npm install`), development (`npm run dev`), testing (`npm test`), typecheck (`npm run typecheck`), build (`npm run build`).
   - Privacy, security, and originality statement.

2. **`docs/IMPLEMENTATION_PLAN.md`:**
   - Full master execution plan detailing the 5 waves (Wave 0 to Wave 5).
   - Component decomposition, route mapping, and directory structure.
   - Concurrency allocations and non-overlapping file ownership rules.

3. **`docs/CAPABILITIES.md`:**
   - Runtime environment audit (Node v24.21.0, npm 11.19.0, Antigravity CLI).
   - MCP tool registry (`browsermcp`).
   - Skills inventory (`reclaim-delivery`, `reclaim-data-integrity`, `reclaim-premium-ui`, etc.).
   - Permission boundaries and constraints.

4. **`docs/AGENT_LEDGER.md`:**
   - Live roster of all 20 allocated agent roles and their exclusive path boundaries.
   - Concurrency tracking and milestone logs.

5. **`docs/DECISIONS.md` (ADRs 001–006):**
   - **ADR-001:** Next.js 15 App Router with TypeScript Strict Mode.
   - **ADR-002:** Dual-Truth 4-Dimension State Machine for Academic Integrity.
   - **ADR-003:** Local-First Persistence with Validated JSON Portability.
   - **ADR-004:** Environmental Research Observatory Design Tokens & Typography.
   - **ADR-005:** Strictly Gated Read-Only Faculty Showcase.
   - **ADR-006:** Keyboard-Driven Fullscreen Presentation Engine.

6. **`docs/TEST_REPORT.md`:**
   - Actual test execution logs: Vitest unit tests, TypeScript compiler output, Next.js production build output.
   - Visual inspection across 390px, 768px, 1280px, and 1440px viewports.
   - Accessibility audit results (WCAG 2.2 AA).

7. **`docs/PRIVACY_AND_LIMITATIONS.md`:**
   - Detailed threat model and data perimeter description.
   - Absence of remote tracking or external telemetry.
   - Device-local storage caveats and disaster recovery procedures.

8. **`docs/ACCEPTANCE_CHECKLIST.md`:**
   - Exhaustive 15+ item acceptance checklist verified with actual terminal command outputs.

---

## 8. Existing Codebase Audit, Verification Evidence & Build Diagnosis

### 8.1 Current Implementation Inventory

| File Path | Status | Observations & Contents |
|---|---|---|
| `data/assignments.seed.json` | **Complete** | Authoritative 14-record seed with exact titles, dates, categories, and initial states. |
| `src/types/domain.ts` | **Complete** | Full TypeScript definitions for `Assignment`, `TaskItem`, `FileRecord`, `AnalyticsMetric`, `StudentProfile`, `ReclaimBackupData`. |
| `src/lib/storage/StorageContext.tsx` | **Complete** | React Context provider managing local storage persistence, theme toggling, CRUD, and backup import/export. |
| `src/lib/storage/seedData.ts` | **Needs Typing Fix** | Imports `assignments.seed.json` and creates initial records. Has TS error due to JSON import typing. |
| `src/components/ui/primitives.tsx` | **Complete** | Contains `cn()`, `StatusBadge` (with strict 4-dimension styling), `Card`, and `Button` primitives. |
| `src/components/shell/AppShell.tsx` | **Complete** | Sidebar navigation rail (256px), mobile header (56px) with drawer, theme toggle, and local storage indicator. |
| `src/app/page.tsx` | **Complete** | Route `/` Command Center: Hero, 4 KPI cards, Action Queue, Category distribution (4/3/4/2/1), Timeline strip. |
| `src/app/assignments/page.tsx` | **Complete** | Route `/assignments` Library: Search, category filter, status filter, sort, grid/table view toggle. |
| `src/app/assignments/[id]/page.tsx` | **Missing (Wave 2)** | Route `/assignments/[id]` Workbench. |
| `src/app/analytics/page.tsx` | **Missing (Wave 2)** | Route `/analytics` Research & Data Lab. |
| `src/app/timeline/page.tsx` | **Missing (Wave 2)** | Route `/timeline` Course Chronology. |
| `src/app/library/page.tsx` | **Missing (Wave 2)** | Route `/library` Evidence Vault. |
| `src/app/showcase/page.tsx` | **Missing (Wave 2)** | Route `/showcase` Faculty Showcase. |
| `src/app/presentation/page.tsx` | **Missing (Wave 2)** | Route `/presentation` Faculty Presentation Mode. |
| `src/app/settings/page.tsx` | **Missing (Wave 2)** | Route `/settings` Settings & Portability. |
| `tests/seedIntegrity.test.ts` | **Verified Pass** | 5 unit tests validating 14 records, sequential IDs, 13 badges, initial states, category counts. |

### 8.2 Vitest Seed Integrity Test Execution (Verified)

Executed: `npm test`  
Result: **5 of 5 tests passed** (Duration: 233ms).

```text
 ✓ tests/seedIntegrity.test.ts (5 tests) 6ms
   ✓ Authoritative 14-Assignment Seed Integrity (5)
     ✓ contains exactly 14 assignment records 2ms
     ✓ contains sequential IDs from EW-01 through EW-14 1ms
     ✓ observes green badges on exactly 13 assignments (EW-02 to EW-14, false for EW-01) 1ms
     ✓ initializes actual submission and review states to unverified/not_reviewed 1ms
     ✓ matches exact category distribution: 4 Data, 3 Technical, 4 Research, 2 Innovation, 1 Admin 0ms

 Test Files  1 passed (1)
      Tests  5 passed (5)
```

### 8.3 TypeScript & Production Build Failure Analysis

Execution of `npm run typecheck` (`tsc --noEmit`) revealed 3 compiler errors:
1. `src/app/layout.tsx:4:8 - error TS2882: Cannot find module or type declarations for side-effect import of '@/styles/globals.css'`
2. `src/lib/storage/seedData.ts:2:21 - error TS2307: Cannot find module '../../data/assignments.seed.json' or its corresponding type declarations.`
3. `src/lib/storage/seedData.ts:4:75 - error TS7006: Parameter 'item' implicitly has an 'any' type.`

Execution of `npm run build` (`next build`) similarly halts at:
```text
Failed to compile.
./src/app/layout.tsx:4:8
Type error: Cannot find module or type declarations for side-effect import of '@/styles/globals.css'.
```

### 8.4 Concrete Remediation Recommendations for Wave 1 / Wave 2 Specialist Agents

To resolve the compiler and build blockers cleanly:

1. **Create Next.js Type Environment Declaration (`next-env.d.ts`):**
   Create root `next-env.d.ts` referencing Next.js types:
   ```typescript
   /// <reference types="next" />
   /// <reference types="next/image-types/global" />

   // NOTE: This file should not be edited
   // see https://nextjs.org/docs/app/api-reference/config/typescript for more information.
   ```
2. **Update `tsconfig.json` Includes & JSON Scopes:**
   Ensure `tsconfig.json` includes `data/**/*.json` or create a type declaration `src/types/json.d.ts`:
   ```typescript
   declare module '*.json' {
     const value: any;
     export default value;
   }
   declare module '*.css' {
     const content: { [className: string]: string };
     export default content;
   }
   ```
3. **Explicitly Type `item` Parameter in `src/lib/storage/seedData.ts`:**
   In line 4 of `src/lib/storage/seedData.ts`, replace `(item) =>` with `(item: any) =>` or use typed assignment interface.
4. **Implement Missing 7 Routes in Parallel (Wave 2 Roles):**
   Assign non-overlapping directory ownership to specialist agents per `docs/AGENT_LEDGER.md`:
   - Route `/assignments/[id]`: Agent `assignment-workbench`
   - Route `/analytics`: Agent `research-analytics`
   - Route `/timeline`: Agent `timeline`
   - Route `/library`: Agent `evidence-vault`
   - Route `/showcase`: Agent `showcase`
   - Route `/presentation`: Agent `presentation`
   - Route `/settings`: Agent `settings-portability`

---
*Report synthesized and verified by `survey_explorer_3` in read-only investigation mode.*
