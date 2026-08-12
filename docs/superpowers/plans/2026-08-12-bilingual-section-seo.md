# Bilingual Section SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish 18 fast, indexable RU/EN feature pages that connect section-specific search intent to UltyMyLife and its Telegram Mini App.

**Architecture:** A single typed-by-convention content module supplies nine feature records in two languages. A dependency-free Node generator renders static HTML, sitemap, and robots files; a separate self-check validates metadata, hreflang, schema, internal links, and lightweight delivery. Existing home pages gain crawlable feature directories and organization-level schema without changing the React bundle.

**Tech Stack:** Node.js ESM, static HTML/CSS, JSON-LD, XML sitemap, existing npm test/build pipeline.

## Global Constraints

- Production origin is exactly `https://ultymylife.com`.
- English Telegram CTA is `https://t.me/UltyMyLife_bot/umlminiapp`.
- Russian Telegram CTA is `https://t.me/UltyMyLife_bot/umlminiapp?startapp=lang_ru`.
- Generate nine feature routes per language: habits, tasks, workouts, breathing-meditation, mental-fitness, sleep, ai-assistant, personal-progress, progress-analytics.
- Every page needs unique people-first copy, one H1, canonical, reciprocal hreflang, x-default, Open Graph, Twitter metadata, visible FAQ, internal links, and JSON-LD.
- Pages must not load the React application bundle, video, or looping animation.
- Do not invent section-specific Telegram deep-link parameters.
- Reuse current RU and EN product artwork.

---

### Task 1: SEO Contract Test

**Files:**
- Create: `scripts/seo-selfcheck.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: generated route folders, `index.html`, `ru/index.html`, `sitemap.xml`, `robots.txt`.
- Produces: exit code 0 only when all bilingual SEO invariants pass.

- [ ] **Step 1: Write failing test**

Create a dependency-free Node check enumerating nine slugs and both locales. Assert every route exists; titles and descriptions are unique; canonical and `en`, `ru`, `x-default` alternates are correct; one H1 exists; CTA matches locale; FAQ and JSON-LD types exist; no app bundle or video tag exists; sitemap contains all 20 canonical URLs; robots references sitemap; both home pages link all localized routes.

- [ ] **Step 2: Run test to verify failure**

Run: `node scripts/seo-selfcheck.mjs`

Expected: FAIL because feature route HTML does not exist.

- [ ] **Step 3: Wire test script**

Set package scripts to:

```json
"test": "node scripts/site-selfcheck.mjs && node scripts/seo-selfcheck.mjs",
"generate:seo": "node scripts/generate-seo-pages.mjs"
```

- [ ] **Step 4: Commit test contract**

```powershell
git add scripts/seo-selfcheck.mjs package.json
git commit -m "test: define bilingual SEO contract"
```

### Task 2: Bilingual Content Model

**Files:**
- Create: `scripts/seo-content.mjs`

**Interfaces:**
- Produces: `SITE`, `FEATURES`, `featurePath(slug, locale)`, and `telegramUrl(locale)` exports.
- Each feature record contains `slug`, `image.en`, `image.ru`, and localized `name`, `title`, `description`, `eyebrow`, `lead`, `benefits`, `how`, and `faq` fields.

- [ ] **Step 1: Add nine complete feature records**

Write unique RU/EN copy for habits, tasks, workouts, breathing and meditation, mental fitness, sleep, AI assistant, personal progress, and progress analytics. Each page must answer what the feature does, who it helps, how it works inside Telegram, and what the user can try next.

- [ ] **Step 2: Validate content through self-check**

Run: `node scripts/seo-selfcheck.mjs`

Expected: still FAIL only because renderer output is absent, not because content exports fail.

- [ ] **Step 3: Commit content source**

```powershell
git add scripts/seo-content.mjs
git commit -m "content: add bilingual feature SEO copy"
```

### Task 3: Static Page Generator and Shared Design

**Files:**
- Create: `scripts/generate-seo-pages.mjs`
- Create: `assets/seo-pages.css`
- Create: `<slug>/index.html` for nine English routes
- Create: `ru/<slug>/index.html` for nine Russian routes

**Interfaces:**
- Consumes: exports from `scripts/seo-content.mjs`.
- Produces: static route HTML with deterministic canonical URLs and shared stylesheet.

- [ ] **Step 1: Build escaping and schema helpers**

Implement `escapeHtml`, `safeJson`, `absoluteUrl`, `renderFaq`, `renderRelated`, and `renderSchemas` in generator. Schema graph must include `WebPage`, `SoftwareApplication`, `BreadcrumbList`, `FAQPage`, and `ImageObject`.

- [ ] **Step 2: Render accessible feature pages**

Generate semantic header, breadcrumb, one H1, benefit cards, Telegram explanation, visible FAQ, three related feature links, language switch, home link, and primary Telegram CTA. Use explicit image dimensions and `loading="eager"` only on hero artwork.

- [ ] **Step 3: Add lightweight responsive CSS**

Create dark brand styling with minimal glow, readable 68ch text width, two-column desktop hero, single-column mobile layout, visible focus states, and `prefers-reduced-motion` support. Do not add continuous animation.

- [ ] **Step 4: Generate pages**

Run: `npm.cmd run generate:seo`

Expected: 18 route files created.

- [ ] **Step 5: Run SEO contract**

Run: `node scripts/seo-selfcheck.mjs`

Expected: only home-link, sitemap, or robots assertions remain failing.

- [ ] **Step 6: Commit pages and generator**

```powershell
git add scripts/generate-seo-pages.mjs assets/seo-pages.css habits tasks workouts breathing-meditation mental-fitness sleep ai-assistant personal-progress progress-analytics ru/habits ru/tasks ru/workouts ru/breathing-meditation ru/mental-fitness ru/sleep ru/ai-assistant ru/personal-progress ru/progress-analytics
git commit -m "feat: generate bilingual feature landing pages"
```

### Task 4: Crawl Discovery and Home Entity Metadata

**Files:**
- Modify: `index.html`
- Modify: `ru/index.html`
- Create: `sitemap.xml`
- Create: `robots.txt`

**Interfaces:**
- Consumes: route map from `scripts/seo-content.mjs`.
- Produces: static home-page discovery links, site-level JSON-LD, image-aware multilingual sitemap, and crawler policy.

- [ ] **Step 1: Add home JSON-LD**

Add `Organization`, `WebSite`, and `SoftwareApplication` graph using production origin, current brand, localized description, and existing Telegram Mini App URL.

- [ ] **Step 2: Add crawlable feature directories**

After the React root, add a compact localized navigation block linking all nine same-language feature pages. Load `assets/seo-pages.css` and style this as a clean final directory, not hidden SEO text.

- [ ] **Step 3: Generate sitemap and robots**

Generator writes 20 URLs: two home pages and 18 feature pages. Each URL carries reciprocal `xhtml:link` entries and product image metadata. `robots.txt` allows crawling and declares `https://ultymylife.com/sitemap.xml`.

- [ ] **Step 4: Run full test suite**

Run: `npm.cmd test`

Expected: PASS for existing site checks and new SEO checks.

- [ ] **Step 5: Commit crawl infrastructure**

```powershell
git add index.html ru/index.html sitemap.xml robots.txt scripts/generate-seo-pages.mjs assets/seo-pages.css
git commit -m "feat: add multilingual crawl discovery"
```

### Task 5: Build, Browser QA, Graph, and Deployment

**Files:**
- Modify: `design-qa.md`
- Update generated graph files under `graphify-out/` locally only.

**Interfaces:**
- Consumes: completed static SEO implementation.
- Produces: verified production-ready commit on `main`.

- [ ] **Step 1: Run build and tests**

Run: `npm.cmd test`

Run: `npm.cmd run build`

Expected: both exit 0.

- [ ] **Step 2: Run local browser QA**

Open one RU and one EN feature page at desktop and mobile widths. Confirm title/H1, image, FAQ, language switch, related links, and CTA. Check console for errors and confirm existing home route still renders.

- [ ] **Step 3: Record QA**

Append exact checked routes, viewport sizes, and results to `design-qa.md`.

- [ ] **Step 4: Refresh graph**

Run: `graphify update .`

Expected: graph update completes successfully. Keep `graphify-out/` uncommitted unless already tracked.

- [ ] **Step 5: Review diff and commit QA**

Run: `git diff --check`

Run: `git status --short`

```powershell
git add design-qa.md
git commit -m "docs: record feature page SEO QA"
```

- [ ] **Step 6: Push deployment**

Run: `git push origin main`

Expected: push succeeds and GitHub Pages deployment begins.

