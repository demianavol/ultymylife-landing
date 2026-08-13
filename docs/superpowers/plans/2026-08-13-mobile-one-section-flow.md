# Mobile One-Section Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Adapt both landing pages and all bilingual feature pages for a phone-first, one-semantic-section-per-swipe flow without cropping content.

**Architecture:** Add CSS-first mobile scroll-snap policies to the existing landing and feature stylesheets. Keep feature-page structure generated from one template, move CTA before related links there, and protect behavior with source-level self-checks.

**Tech Stack:** Static HTML, CSS, JavaScript generators, Node.js self-checks.

## Global Constraints

- Use adaptive `scroll-snap-type: y proximity` only at widths up to 780 px.
- Use `100svh`; never hide or crop essential content to force an exact viewport.
- Preserve media aspect ratios with `object-fit: contain`.
- Disable snap and smooth behavior under `prefers-reduced-motion`.
- Apply matching behavior to RU/EN landing pages and all 18 feature pages.

---

### Task 1: Feature-page mobile contract and order

**Files:**
- Modify: `scripts/seo-selfcheck.mjs`
- Modify: `scripts/generate-seo-pages.mjs`

**Interfaces:**
- Consumes: existing `renderPage(feature, locale)` HTML generator.
- Produces: CTA before related section; generated pages with shared mobile hooks.

- [ ] Add failing assertions for CTA-before-related order, proximity snap, `100svh`, horizontal rails, and reduced-motion snap removal.
- [ ] Run `node scripts/seo-selfcheck.mjs`; confirm new assertions fail.
- [ ] Move `.final-cta` before `.related` in generator.
- [ ] Run `npm.cmd run generate:seo`.

### Task 2: Feature-page mobile layout

**Files:**
- Modify: `assets/seo-pages.css`
- Modify: `assets/feature-video.css`

**Interfaces:**
- Consumes: `.feature-hero`, `.content-section`, `.benefit-grid`, `.feature-demo`, `.how-section`, `.faq`, `.final-cta`, `.related-grid`.
- Produces: mobile viewport sections and native horizontal snap rails.

- [ ] Add mobile `scroll-snap-type:y proximity` and section alignment.
- [ ] Size compact sections with `min-height:calc(100svh - 64px)` while allowing natural overflow.
- [ ] Convert benefit and related grids to horizontal native-scroll rails.
- [ ] Keep video portrait ratio and compact it to available viewport height.
- [ ] Disable snap under reduced motion.
- [ ] Regenerate feature pages and run `node scripts/seo-selfcheck.mjs`; expect PASS.

### Task 3: Landing-page mobile layout

**Files:**
- Modify: `scripts/site-selfcheck.mjs`
- Modify: `assets/landing-refresh.css`

**Interfaces:**
- Consumes: existing landing section IDs and refreshed card grids.
- Produces: RU/EN mobile section snapping and horizontal card rails.

- [ ] Add failing assertions for landing proximity snap, `100svh`, horizontal rails, and reduced-motion opt-out.
- [ ] Run `node scripts/site-selfcheck.mjs`; confirm failure.
- [ ] Add mobile scroll snap to main sections with safe scroll margins.
- [ ] Make hero and normal sections viewport-oriented without fixed clipping.
- [ ] Convert dense problem, solution, audience, grant, and journey grids to horizontal rails.
- [ ] Keep product panel and modal naturally scrollable.
- [ ] Run `node scripts/site-selfcheck.mjs`; expect PASS.

### Task 4: Verification and graph refresh

**Files:**
- Regenerate: all 18 feature-page `index.html` files.
- Update: `graphify-out/graph.json` and related Graphify outputs (untracked local artifacts).

**Interfaces:**
- Consumes: final source and generated HTML.
- Produces: verified site output and current code graph.

- [ ] Run `npm.cmd test`; expect both self-checks PASS.
- [ ] Search generated pages to confirm CTA occurs before related links in all 18 files.
- [ ] Inspect 360 px and desktop layouts in browser; confirm no page overflow or cropped media.
- [ ] Run `graphify . --update --code-only --no-viz`.
- [ ] Review diff, commit source/generated files, and push `main`.
