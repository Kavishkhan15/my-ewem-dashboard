---
name: reclaim-qa-release
description: Use for release gates, actual test execution, threat review, visual inspection, performance, privacy and independent integration acceptance.
---

# Independent QA and Release Protocol

1. Inventory the actual source tree, scripts, package manager, environment and installed MCP/browser tools; don't invent runnable commands.
2. Require lint, TypeScript strict typecheck, unit/integration tests, production build and meaningful Playwright/browser E2E (or report precise blockers).
3. Verify all nine routes; all 14 records; date/labels; filtered result count; edit-save-refresh; backup-export/import-roundtrip; storage errors; upload safe fallback; no leaked private showcase.
4. Test narrow mobile, tablet, desktop; both themes; keyboard only; focus return; file chooser; reduced motion and readable labels.
5. Audit dependency risks, uploaded file previews, XSS vectors, invalid JSON inputs and secrets in repository/build artifacts.
6. Run tests **after integration**. Capture exact commands, exit codes, environment, screenshot paths and known caveats. Never mark a pass based on the agent's intention.
7. Gate handoff on truthful reports: `docs/TEST_REPORT.md`, `docs/SECURITY_REVIEW.md`, `docs/ACCESSIBILITY_REPORT.md`, `docs/AGENT_LEDGER.md` and final `README.md`.
8. Ask user permission before pushing, publishing, configuring paid infrastructure or changing external systems; local dev and test are authorized.
