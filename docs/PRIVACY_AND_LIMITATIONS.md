# RECLAIM MAGNUM — Privacy, Security & Limitations

## 1. Academic Originality & Threat Model

- **Zero Content Leakage**: RECLAIM does not contain or embed any identifying metadata, roll numbers, faculty names, or submitted work from external student portfolios. The friend reference was used strictly as conceptual inspiration for UX elements (tabs, local persistence concepts, theme toggle).
- **Client-Side File Isolation**: Files uploaded in `/library` (Evidence Vault) are processed within the local browser sandbox. They are not sent to any third-party server or unauthenticated cloud bucket.
- **Safe Previews**: Uploaded file formats are classified into safe MIME categories (`image`, `pdf`, `text`, `csv`, `binary`). Binary files like PPTX or archives do not attempt unsandboxed DOM rendering and provide safe download fallbacks.
- **No Client Pseudo-Authorization**: There are no artificial `?edit` query parameter backdoors. Public showcase routes are read-only views rendered strictly from published items.

## 2. Storage Limitations & Data Loss Prevention

- **Device-Local Storage**: Coursework edits, checklists, and uploaded files are stored in the client browser (`localStorage`).
- **Data Loss Warning**: Clearing browser data or using incognito/private browsing windows will reset state to the factory 14-assignment seed.
- **Mitigation**: Users are provided with a one-click **Export Verified JSON Backup** feature in `/settings`. This exports the entire workspace state into a portable JSON file that can be restored on any device.

## 3. Truth Table of Features

| Feature / Domain | Status | Operational Notes |
|---|---|---|
| **Authoritative 14-Assignment Seed** | **Verified Complete** | Ingested from `data/assignments.seed.json` with exact titles and dates |
| **Command Center `/`** | **Verified Complete** | Real KPIs, exact category distribution (4/3/4/2/1), action queue |
| **Assignment Library `/assignments`** | **Verified Complete** | Multi-keyword search, category filters, status filters, table/grid modes |
| **Assignment Workbench `/assignments/[id]`** | **Verified Complete** | Dual-truth controls, interactive checklists, notes, file linkages |
| **Analytics Lab `/analytics`** | **Verified Complete** | Honest awaiting-data states with source, unit, period, and method metadata |
| **Course Chronology `/timeline`** | **Verified Complete** | 14 chronological records, separate manual deadlines, same-day ordering |
| **Evidence Vault `/library`** | **Verified Complete** | Local file upload, MIME detection, assignment association, download fallbacks |
| **Faculty Showcase `/showcase`** | **Verified Complete** | Strict read-only publishing gate, 0 unverified items leaked |
| **Presentation Mode `/presentation`** | **Verified Complete** | Full-screen projector layout, keyboard navigation (`←`/`→`/`Esc`) |
| **Settings & Backup `/settings`** | **Verified Complete** | Dark/light theme persistence, JSON export, schema-validated import |
| **Real Coursework Submissions** | **Pending User Upload** | Awaiting actual student files and verified faculty marks |
