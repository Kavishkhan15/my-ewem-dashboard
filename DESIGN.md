# RECLAIM — Design Constitution

> Design authority for all screen/UI decisions. This file is actively referenced by `AGENTS.md`; it is not automatically loaded merely because it is named `DESIGN.md`. Designers, frontend builders, accessibility reviewers and test agents must read it.

## Product personality

**RECLAIM: E-Waste Intelligence & Management Studio**. Think *environmental research observatory meets premium editorial instrument*, not an eco clip-art site and not a generic admin dashboard. User experience must feel crafted, confident, scientific, and instantly navigable. A faculty member should understand what exists, what is verified, what is still being worked on, and why the results matter within 30 seconds.

The interface has two personalities within one identity:

- **Private Workspace**: pragmatic, editable, fast, accessible, transparent about missing information.
- **Public Showcase**: serene, narrative, selective, read-only, never exposes drafts or private uploads.

## Visual art direction

- **Atmosphere:** dark graphite botanical lab; subtle diagrammatic structures, fine hairline separators, sparse deliberate color, large intentional negative space.
- **Geometry:** coherent 8px spacing scale, 1px lines, 12–18px radii, generous container padding, meaningful varied card proportions, grids with clear rhythm.
- **Avoid:** gradient overload, infinite glows, glassmorphism wallpaper, dozens of identically sized tiles, random nature photographs, meaningless particle effects, copied green portfolio hero, fake charts/data, emojis as brand system.
- **Original hero**: high-quality visual hierarchy anchored by a domain concept (e.g. *observe → measure → recover → govern → reimagine*) paired with meaningful assignment status, not a huge generic marketing slogan.
- **UI density:** information-rich on desktop but never cramped. Expose progressively, not all controls at once.

### Design tokens (initial proposal; refine after rendered testing)

| Semantic token | Dark | Light | Role |
|---|---|---|---|
| `--canvas` | `#0B1110` | `#F5F8F4` | Page background |
| `--surface` | `#151D1A` | `#FFFFFF` | Primary panels |
| `--surface-raised` | `#1C2922` | `#EDF3ED` | Elevated/hover UI |
| `--text` | `#EFF5EF` | `#14241D` | Primary typography |
| `--text-muted` | `#A4B9AD` | `#556B5F` | Supporting text |
| `--border` | `#314037` | `#D8E4DA` | Dividers / controls |
| `--emerald` | `#32CF89` | `#147A4B` | Primary accent/action |
| `--lime` | `#C4F46D` | `#527B10` | Rare focal emphasis |
| `--cyan` | `#79CFDA` | `#116979` | Data/cross-reference accent |
| `--amber` | `#F2BC6E` | `#8D5A12` | True attention/warnings |
| `--danger` | `#F48F87` | `#A52D28` | Errors only |

Actual implementation must check and tune accessible foreground/background contrast per component, not assume any table value works for every combination. Status meaning must never depend solely on hue.

### Typography

- Display/editorial: Instrument Serif or another licensed high-quality serif **with fallbacks**.
- UI/body: Geist, Manrope, or similarly readable sans; numerals use tabular alignment for KPIs/timelines.
- Technical labels: restrained monospace only for IDs, units, source markers or tiny data captions.
- Scale suggestions: display 52–76px desktop / 34–48px mobile; H1 40–52; H2 26–34; H3 19–24; body 15–17; metadata 12–14px. Tune line height and breaks manually.
- No unreadable microcopy or low contrast. Avoid stock headline clichés and fabricated campus names/labels.

### Layout

- Desktop: 232–264px navigation rail, compact global header, content max ~1440–1520px, 12-column fluid grid, 24–32px gutters.
- Tablet: collapsible rail, 8-column logic, actions remain discoverable.
- Mobile: accessible drawer or well-judged compact bottom nav; no sideways overflow; forms become one column; tables use legitimate horizontal containment or cards.
- Key viewport QA: **390×844, 768×1024, 1280×800, 1440×900** and 320px smoke-check.
- Header/rail should not consume most of the mobile viewport.
- Focus state clearly outlined and visible even in dark mode. Always restore focus after dialog close.

## Core page compositions

### `/` — Command Center

Editorial welcome + concise one-sentence intent. Strong hero carries **14 records** and **verification state**, with visually distinct compact actionable cards. Present (a) review queue, (b) assignment categories (4/3/4/2/1), (c) timeline, (d) activity summary; source-linked only. Use a small meaningful ring/bar for exact category counts if helpful, **not a false 93%-complete radial chart**. Strong empty state for unknown actual progress. CTA: *Review an assignment*, not a decorative "Get started" button.

### `/assignments` — Library

Designed for *locating, comparing and acting*: search with clear affordance, explicit badges separating Portal Observation / Work State / Quality, category and state chips, keyboard-accessible sort/filter, dense and spacious list modes, pin/bookmark optionally. Each row/cell must show why it matters without horizontal chaos.

### `/assignments/[id]` — Workbench

Elegant assignment title with original title preserved (expandable), portal activity date clearly distinguished from due date. Main content has overview, actual requirements, checklist, files, evidence, reflections, quality gate; right rail shows task/status controls and provenance. At mobile widths use stacked panels and sticky action affordance only when not intrusive.

### `/analytics` — Research Lab

A modular analytic notebook, not a collection of placeholders pretending to be scientific results. Planned areas: India/world e-waste, state tracker, carbon Excel, company-rule comparisons, recovery processes, hazardous chemicals, LEED, case studies. Each available chart must declare title, scope, metric, *unit*, *period*, *source* and *calculation method*; legends and tooltips support color-blind and keyboard-accessible interpretation. Dataset absent → elegant "Add a source dataset" state. Do not present sample metric as measured finding.

### `/timeline` — Course history

July to October 2026 chronology with recorded portal activity, 14 item anchors, and independently added future deadlines. Clear axis/time labeling. Two same-day records on July 28 should both remain distinct. No invented time commitments.

### `/library` — Evidence Vault

High-fidelity drag/drop + keyboard file selector, type badges, trust/safety information, size, status, assignment association, safe previews, downloads; empty and error states. Make supported formats explicit. Do not render uploaded HTML with full page permissions.

### `/showcase` & `/presentation`

Gallery-first, editorial case studies, cover/abstract/method/results/evidence/outcome. Published content only. Presentation: full-screen progression with left/right keys, skip navigation, escape exit, real citation footer; strong readable hierarchy at projector scale. If no assignment published, show professional explanation, not fictional showcase pieces.

### `/settings`

Functional theme controls, light/dark/system; local storage state + warning; backup and restore; editable course/student placeholders; publishing controls with explicit visibility. Do not ingest your friend's identity.

## Motion and micro-interactions

- Use animation as feedback: 120–200ms emphasis transitions, purposeful page progression, minimal subtle chart enter *only when charts hold real data*.
- Prefer transform/opacity; respect `prefers-reduced-motion`; do not animate major layout unexpectedly.
- Hover and click actions have visible state changes. Avoid cursor:pointer for inert cards.
- Skeletons only while actual async work is pending; no fake loading screens for static data.

## Component states: mandatory

Every interactive component needs: default, hover, focus-visible, active/selected, disabled when relevant, loading, no-data, validation error, success. Every route must have meaningful empty and error states. Preserve written work on failed save, and explain how to recover.

## Data visualization constitution

- Always label exact denominator/time unit/source. Never equate portal green badge with verified completion.
- Charts should answer an identifiable question. Prefer fewer charts with clear insights, sources, downloadable table views, uncertainty labels and accessible text alternatives.
- Bar charts for category counts; line charts for real time series; maps only with verified comparable geographies; never decorative heatmaps with synthetic values.
- High contrast palettes distinguish categories by both labels and shapes/patterns when useful. Zero baseline for comparative bars unless explicitly justified.

## Faculty presentation quality bar

A first-time faculty viewer should be able to answer: What is RECLAIM? What coursework is represented? What did the student actually submit/verify? Which datasets support claims? Which features demonstrate technical ability? What needs further work? Every proof point should open to evidence. Build a cohesive research narrative instead of simply a growing collection of assignment screenshots.

## Originality & references

Do not copy the friend's Fraunces hero, identifiers, report content, embedded tables, quiz, presentation, or code. Reference it only as a list of feature ideas: file browsing, portal cards, tabs, grades concept, theme support. RECLAIM uses its own design language, wording, implementations and unique Dual-Truth Status/Evidence Chain system.

## Visual QA rubric (score with evidence, do not self-award)

Evaluate originality, information hierarchy, legibility, spacing rhythm, visual coherence, interaction usefulness, responsiveness, accessibility, error/empty/loading states, correctness of claims and presentation polish. Conduct actual browser reviews at all target viewports and both themes. Record issues with screenshots and changes. Fix high-impact flaws before spending time on decorative flourish.
