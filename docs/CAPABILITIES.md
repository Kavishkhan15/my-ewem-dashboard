# RECLAIM MAGNUM — Capability Inventory & Runtime Census

**Audited At:** 2026-10-13  
**Auditor:** Supreme Lead Orchestrator (`reclaim-orchestrator`)  
**Operating Environment:** Linux x86_64, Node v24.21.0, npm 11.19.0, Google Antigravity CLI  

## 1. Antigravity CLI Runtime & Teamwork Surface

- **Native Execution Surface:** Google Antigravity CLI (Agentic Pair Programming & Multi-Agent Engine).
- **Subagent Invocation Mechanism:** Native `invoke_subagent` and `manage_subagents` tools available.
- **Pre-Registered Workspace Specialist Agents (20):**
  1. `reclaim-orchestrator` (Lead Orchestrator)
  2. `reference-auditor` (Audit & Originality)
  3. `solution-architect` (Domain contracts & ADRs)
  4. `design-system` (Tokens, typography, components)
  5. `app-shell` (Navigation, layout, responsiveness)
  6. `command-center` (Route `/` Overview)
  7. `assignment-library` (Route `/assignments` Search & Filters)
  8. `assignment-workbench` (Route `/assignments/[id]` Workbench)
  9. `quality-workflow` (State machine & checklist engine)
  10. `persistence` (Local storage & schema migration)
  11. `evidence-vault` (Route `/library` File pipeline)
  12. `research-analytics` (Route `/analytics` Lab)
  13. `timeline` (Route `/timeline` Chronology)
  14. `showcase` (Route `/showcase` Faculty portfolio)
  15. `presentation` (Route `/presentation` Keyboard slides)
  16: `settings-portability` (Route `/settings` Backup/Import)
  17. `security-privacy` (Auditor for sanitization & authorization)
  18. `accessibility` (WCAG 2.2 AA & responsive reviewer)
  19. `qa-engineer` (Test automation & integration verification)
  20. `release-performance` (Build, bundle & release auditor)
- **Teamwork Slash Command (`/teamwork-preview`):** Active. Draft prompt artifact established and user approval gate active per Teamwork workflow.

## 2. MCP Server Census

| Server | Config Source | Registered Tools | Connection Status | Project Relevance | Usage Decision |
|---|---|---|---|---|---|
| `browsermcp` | `~/.gemini/config/mcp_config.json` | `browser_navigate`, `browser_snapshot`, `browser_click`, `browser_hover`, `browser_type`, `browser_screenshot`, etc. | Available (Lazy-loaded) | High (Real visual QA, multi-viewport rendering, keyboard check) | Authorized & Active for Wave 4 verification |

## 3. Discovered Workspace & Global Skills

| Skill | Source | Scope & Capability | Usage in RECLAIM |
|---|---|---|---|
| `reclaim-delivery` | `.agents/skills/reclaim-delivery` | End-to-end delivery protocols, domain interface rules, DoD | Core execution blueprint |
| `reclaim-data-integrity` | `.agents/skills/reclaim-data-integrity` | Exact 14-record seed validator, 4 truth dimensions | Data validation & state machine |
| `reclaim-parallel-delivery` | `.agents/skills/reclaim-parallel-delivery` | Concurrency tracking, exclusive file ownership | Agent task orchestration |
| `reclaim-premium-ui` | `.agents/skills/reclaim-premium-ui` | Design system tokens, micro-motion, typography | Design system & component build |
| `reclaim-evidence-research` | `.agents/skills/reclaim-evidence-research` | File validation, citation provenance, research analytics | Vault & Analytics modules |
| `reclaim-qa-release` | `.agents/skills/reclaim-qa-release` | Automated test suite, bundle verification, release gates | QA & Release phases |
| `browser-qa` / `impeccable` | Plugin skills | Visual testing, typography, responsive critique | Visual QA support |

## 4. Boundaries & Security Guardrails

1. Zero copying of reference student identifying metadata, roll numbers, faculty names, or private coursework.
2. Local-first storage with explicit "Device-Local" indicators; no secret cloud provisioning.
3. No external repository pushes or public deployments without explicit user command.
4. Strict sanitization of uploaded files, safe preview sandboxing, no arbitrary script execution.
