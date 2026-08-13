# Landing Typography and Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply approved Playfair Display/Golos Text typography, linked hero topics, and compact legal-only footer to RU/EN landing pages.

**Architecture:** Keep existing runtime refresh layer. Extend `refreshHero()` to replace badge spans with anchors, simplify `refreshFooter()`, and centralize font application in refresh CSS. Static checks guard generated runtime behavior and HTML font assets.

**Tech Stack:** Static HTML, CSS, vanilla JavaScript, Node self-checks.

## Global Constraints

- Preserve layout, colors, responsive sizing, and feature-page templates.
- Apply changes to both RU and EN landing pages.
- Keep system font fallbacks.

---

### Task 1: Add failing landing contracts

**Files:**
- Modify: `scripts/site-selfcheck.mjs`

- [ ] Assert both landing HTML files load Playfair Display and Golos Text.
- [ ] Assert runtime contains semantic hero topic links and no footer upper row.
- [ ] Run `npm test`; expect failure because production code lacks new contracts.

### Task 2: Implement typography, links, and footer

**Files:**
- Modify: `index.html`
- Modify: `ru/index.html`
- Modify: `assets/landing-refresh.js`
- Modify: `assets/landing-refresh.css`

- [ ] Replace landing Google Fonts URLs with Playfair Display and Golos Text.
- [ ] Build localized hero anchor mapping in `refreshHero()`.
- [ ] Render only footer meta/legal row in `refreshFooter()`.
- [ ] Apply display/body font families and interactive badge states in CSS.
- [ ] Bump landing refresh asset cache versions.
- [ ] Run `npm test`; expect pass.

### Task 3: Verify

**Files:**
- Test: `scripts/site-selfcheck.mjs`

- [ ] Run `npm run build`.
- [ ] Check RU/EN at mobile and desktop widths with browser.
- [ ] Confirm zero horizontal scrolling and correct link destinations.
- [ ] Run `graphify update .`, commit, and push `main`.
