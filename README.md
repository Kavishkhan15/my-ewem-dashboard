# My EWEM Dashboard — Kavish Khan

**Personal E-Waste & Environmental Management Assignment Portfolio**

> **Student:** Kavish Khan  
> **Roll No.:** 24102C0036  
> **Course:** E-Waste & Environmental Management — Semester 5

A personal academic dashboard built on Next.js to organise and display my 13 EWEM coursework deliverables. Includes assignment cards with category filtering, interactive document previews (PDF, XLSX, DOCX, HTML), and file downloads.

---

## Assignment Collection

| ID | Title | Category | Files |
| :---: | :--- | :--- | :---: |
| KV-01 | Toxic Chemicals — Any Five | Research, Policy & Sustainability | PDF |
| KV-02 | E-Waste Tracker — State Data | Data Analytics & Tracking | XLSX |
| KV-03 | Assignment 3 — Recovery Process Changes | Technical & Recovery Processes | PDF |
| KV-04 | E-Waste: India vs World | Data Analytics & Tracking | PDF |
| KV-05 | E-Waste EPR Calculator Report | Data Analytics & Tracking | PDF |
| KV-06 | E-Waste Simple Task | Research, Policy & Sustainability | PDF |
| KV-07 | Africa's E-Waste Paradox — Presentation | Research, Policy & Sustainability | *(local only, 19MB)* |
| KV-08 | ShareKart Presentation | Innovation & Awareness | PDF |
| KV-09 | PCB Poster — E-Waste Campus Awareness | Innovation & Awareness | HTML |
| KV-10 | PCB Quiz — Interactive E-Waste Quiz | Innovation & Awareness | HTML |
| KV-11 | E-Waste Case Study Reports | Research, Policy & Sustainability | PDF |
| KV-12 | E-Waste General Assignment | Research, Policy & Sustainability | PDF |
| KV-13 | Research Paper — Kavish Khan | Academic Research | DOCX |

> **Note:** `Africa_s_E-Waste_Paradox.pptx` (19 MB) is excluded from this repository due to GitHub file size limits. It is available locally in the `ewem/` folder.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS
- **Document Viewers:** PDF.js, SheetJS, mammoth.js
- **Icons:** Lucide React

---

## Local Installation

### Prerequisites
- Node.js 20.x or 22.x LTS
- npm 10.x+

### Run

```bash
git clone https://github.com/Kavishkhan15/my-ewem-dashboard.git
cd my-ewem-dashboard
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other commands

```bash
npm run build      # Production build
npm run typecheck  # TypeScript check
npm test           # Unit tests
```

---

## Project Structure

```
├── ewem/                        # Original assignment files (source)
├── public/coursework/files/     # Files served by the dashboard
├── src/
│   ├── app/                     # Next.js App Router pages
│   ├── components/              # UI components and document viewers
│   ├── data/
│   │   └── assignments.seed.json  # Assignment metadata (KV-01..KV-13)
│   └── lib/                     # Storage adapters
├── data/
│   └── assignments.seed.json    # Authoritative seed copy
└── README.md
```

---

## Attribution

This dashboard is adapted from the original project by [kasim672](https://github.com/kasim672/EWEM-dashboard), shared for educational reference. All coursework files in this repository are original submissions by Kavish Khan (24102C0036).

---

## License

MIT — see [LICENSE](LICENSE) for details. Coursework deliverables belong to the respective author.
