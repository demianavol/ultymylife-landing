# Mobile Natural Flow Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace broken mobile viewport snapping and clipped rails with readable one-column mobile/tablet layouts while preserving desktop.

**Architecture:** Override only rules inside `max-width: 768px` blocks. Keep landing and generated feature-page layouts separate, protect expected CSS contracts with Node self-checks, then validate generated output and viewport widths.

**Tech Stack:** Static HTML, CSS, Node.js generators and self-checks.

## Global Constraints

- Desktop above 768 px remains unchanged.
- No vertical scroll snap or artificial viewport-height sections.
- Mobile containers use 20 px side padding and full-width one-column cards.
- Product tabs are the only intentional horizontal scroller.
- Media always uses `object-fit: contain`.

---

### Task 1: Lock new mobile contract

**Files:**
- Modify: `scripts/site-selfcheck.mjs`
- Modify: `scripts/seo-selfcheck.mjs`

- [ ] Replace old snap assertions with assertions for natural flow, one-column grids, 20 px gutters, full-width CTA, and no mobile viewport minimums.
- [ ] Run `npm.cmd test`; verify failure against current CSS.

### Task 2: Rebuild landing mobile rules

**Files:**
- Modify: `assets/landing-refresh.css`
- Modify: `index.html`
- Modify: `ru/index.html`

- [ ] Remove vertical and card-rail snap rules from mobile breakpoint.
- [ ] Set compact section spacing, readable type, one-column cards, large product screenshot, mobile tabs, buttons, CTA, and footer.
- [ ] Add 480 px narrow-phone refinements.
- [ ] Bump landing asset version and run landing self-check.

### Task 3: Rebuild feature-page mobile rules

**Files:**
- Modify: `assets/seo-pages.css`
- Modify: `assets/feature-video.css`
- Modify: `scripts/generate-seo-pages.mjs`
- Regenerate: 18 feature page HTML files.

- [ ] Replace snap and rails with natural one-column layout.
- [ ] Make hero artwork and video large, contained, and content-driven.
- [ ] Compact FAQ, CTA, related cards, and footer spacing.
- [ ] Add 480 px refinements, bump feature asset version, regenerate pages, and run SEO self-check.

### Task 4: Verify and publish

**Files:**
- Update code graph after source changes.

- [ ] Run full tests and `git diff --check`.
- [ ] Verify CSS contains no mobile vertical snap or `100svh` section policy.
- [ ] Verify generated CTA order and asset versions.
- [ ] Run Graphify incremental update.
- [ ] Commit scoped files and push `main`.
