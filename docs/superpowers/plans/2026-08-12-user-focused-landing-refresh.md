# User-Focused Landing Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refresh both landing locales with user-focused copy, localized product media, interactive video modals, a realistic Telegram block, corrected roadmap status, and smoother mobile behavior.

**Architecture:** Keep the current production React bundle intact. Add a small post-render enhancement layer that observes the generated page, applies deterministic localized content and structure, and owns modal behavior; add a separate stylesheet for visual and mobile-performance overrides. Extend the existing self-check to make these enhancements testable without a browser.

**Tech Stack:** Static HTML, bundled React output, vanilla JavaScript DOM enhancement, CSS, Node.js self-check.

## Global Constraints

- Keep current routes, legal pages, Telegram URLs, and product media structure.
- Do not add external dependencies.
- English route uses supplied English images; Russian route keeps Russian product images.
- All user-facing Russian copy must be Russian.
- All feature cards must remain usable with keyboard and assistive technology.
- Mobile experience must avoid staggered heavy transitions and respect `prefers-reduced-motion`.

---

### Task 1: Add regression checks for refresh assets and entry points

**Files:**
- Modify: `scripts/site-selfcheck.mjs`
- Modify: `index.html`
- Modify: `ru/index.html`

**Interfaces:**
- Consumes: existing static route files and `read(file)` helper.
- Produces: required `assets/landing-refresh.js`, `assets/landing-refresh.css`, and route includes enforced by self-check.

- [ ] **Step 1: Add failing asset and include checks**

Add `assets/landing-refresh.js`, `assets/landing-refresh.css`, and seven English images to `required`. Assert both landing HTML files include the refresh script and stylesheet.

- [ ] **Step 2: Run check and confirm failure**

Run: `npm test`

Expected: FAIL with missing refresh asset.

- [ ] **Step 3: Add refresh script and stylesheet tags**

Load `landing-refresh.js` with `defer` after `i18n.js`; load `landing-refresh.css` after the bundled stylesheet in both routes.

- [ ] **Step 4: Run check and confirm next expected missing-asset failure**

Run: `npm test`

Expected: FAIL naming the first missing English image.

- [ ] **Step 5: Commit entry-point test and wiring**

```powershell
git add scripts/site-selfcheck.mjs index.html ru/index.html
git commit -m "test: define landing refresh entry points"
```

### Task 2: Add English product media and locale-aware media mapping

**Files:**
- Create: `assets/product/en/home.jpg`
- Create: `assets/product/en/recovery.jpg`
- Create: `assets/product/en/tasks.jpg`
- Create: `assets/product/en/habits.jpg`
- Create: `assets/product/en/sleep.jpg`
- Create: `assets/product/en/training.jpg`
- Create: `assets/product/en/mental.jpg`
- Create: `assets/landing-refresh.js`
- Test: `scripts/site-selfcheck.mjs`

**Interfaces:**
- Consumes: `document.documentElement.lang`, existing `/assets/product/*` videos and posters.
- Produces: `FEATURE_MEDIA` mapping and `getFeatureMedia(title, lang)` returning `{video, poster}`.

- [ ] **Step 1: Add failing mapping assertions**

Check refresh source contains all nine normalized feature keys, seven English poster paths, and home-video reuse for AI assistant, profile, and statistics.

- [ ] **Step 2: Run check and confirm failure**

Run: `npm test`

Expected: FAIL with missing media mapping.

- [ ] **Step 3: Copy supplied English images into stable asset names**

Copy `MainEN.png`, `RecoveryEN.png`, `TaskEN.png`, `HabitsEN.png`, `SleepEN.png`, `trainingEN.png`, and `mindEN.png` into the paths above without modifying source files.

- [ ] **Step 4: Implement locale-aware mapping**

Create an IIFE exposing no globals. Define aliases for RU/EN card titles and map each to the appropriate existing video plus locale-specific poster. Use `home.mov` for AI assistant, profile, and statistics.

- [ ] **Step 5: Run check**

Run: `npm test`

Expected: PASS for assets and mapping checks.

- [ ] **Step 6: Commit media layer**

```powershell
git add assets/product/en assets/landing-refresh.js scripts/site-selfcheck.mjs
git commit -m "feat: add localized product media mapping"
```

### Task 3: Rewrite user-facing RU and EN copy

**Files:**
- Modify: `assets/landing-refresh.js`
- Modify: `assets/i18n.js`
- Test: `scripts/site-selfcheck.mjs`

**Interfaces:**
- Consumes: generated section IDs, headings, cards, and language from route.
- Produces: `COPY.ru` and `COPY.en` content sets applied by `applyUserCopy(root, lang)`.

- [ ] **Step 1: Add failing copy checks**

Assert refresh source includes user-benefit hero copy, localized modal CTA labels, localized Telegram proof labels, and no pitch-deck CTA creation. Assert Russian source includes `Интерфейс внутри Telegram`.

- [ ] **Step 2: Run check and confirm failure**

Run: `npm test`

Expected: FAIL with missing user-focused copy.

- [ ] **Step 3: Define complete localized content sets**

Cover navigation, hero, problem, product showcase, solution, Telegram, journey, audience, pilots, roadmap, growth, final CTA, modal benefits, and footer. Copy must address the reader directly and end major sections with a clear reason to try.

- [ ] **Step 4: Apply copy after React render**

Use stable section IDs and card order. Mark injected nodes with `data-i18n-ignore` so the existing translator does not overwrite them. Update metadata through existing i18n hooks where applicable.

- [ ] **Step 5: Remove final pitch-deck CTA and translate proof label**

Remove only the anchor targeting `deck.pdf`; preserve Mini App and founder CTAs. Replace `Telegram-native interface` with localized proof text on RU.

- [ ] **Step 6: Run check**

Run: `npm test`

Expected: PASS for copy assertions.

- [ ] **Step 7: Commit copy refresh**

```powershell
git add assets/landing-refresh.js assets/i18n.js scripts/site-selfcheck.mjs
git commit -m "feat: rewrite landing copy for users"
```

### Task 4: Add accessible feature video modal

**Files:**
- Modify: `assets/landing-refresh.js`
- Create: `assets/landing-refresh.css`
- Test: `scripts/site-selfcheck.mjs`

**Interfaces:**
- Consumes: `getFeatureMedia(title, lang)`, solution cards, localized Mini App link.
- Produces: `openFeatureModal(feature)`, `closeFeatureModal()`, `.uml-feature-modal`, and accessible card buttons.

- [ ] **Step 1: Add failing modal-source checks**

Assert dialog role, `aria-modal`, Escape handler, backdrop close, close button, video `playsinline muted loop`, localized CTA, focus restoration, and body lock hooks exist.

- [ ] **Step 2: Run check and confirm failure**

Run: `npm test`

Expected: FAIL with missing modal behavior.

- [ ] **Step 3: Convert nine feature cards to accessible triggers**

Set `role="button"`, `tabindex="0"`, localized `aria-label`, click handler, and Enter/Space handler. Preserve card layout.

- [ ] **Step 4: Implement modal lifecycle**

Create dialog on demand. Insert localized heading, benefit, poster-backed video, CTA, and close control. Focus close control after open; restore triggering card after close. Pause and clear video source on close.

- [ ] **Step 5: Add modal and trigger styling**

Use a centered dark glass panel, bounded portrait video, high-contrast controls, visible focus rings, scrollable content on short screens, and a stable backdrop.

- [ ] **Step 6: Add video fallback behavior**

On video error, add `.is-video-fallback`, keep poster visible, show localized fallback line, and leave CTA enabled.

- [ ] **Step 7: Run check**

Run: `npm test`

Expected: PASS for modal-source checks.

- [ ] **Step 8: Commit modal**

```powershell
git add assets/landing-refresh.js assets/landing-refresh.css scripts/site-selfcheck.mjs
git commit -m "feat: open product videos from feature cards"
```

### Task 5: Refresh Telegram proof and roadmap state

**Files:**
- Modify: `assets/landing-refresh.js`
- Modify: `assets/landing-refresh.css`
- Test: `scripts/site-selfcheck.mjs`

**Interfaces:**
- Consumes: `#telegram`, `#status`, localized content set.
- Produces: `.uml-telegram-preview`, corrected completed/planned roadmap groups.

- [ ] **Step 1: Add failing structure checks**

Assert Telegram preview source includes intro message, reminder, blue Open Mini App control, and wallpaper class. Assert completed roadmap keys include website and international markets while plan keys exclude them.

- [ ] **Step 2: Run check and confirm failure**

Run: `npm test`

Expected: FAIL with missing Telegram preview or roadmap grouping.

- [ ] **Step 3: Replace Telegram illustration content**

Build a localized visual inspired by the provided screenshot: bot chrome, patterned wallpaper, intro bubble, date chip, reminder bubble, and blue CTA bar linked to the correct Telegram URL.

- [ ] **Step 4: Move completed roadmap entries**

Rebuild both columns from localized arrays so website and international markets render under completed work. Keep standalone app, adjacent integrations, and company growth under plans.

- [ ] **Step 5: Style preview and roadmap additions**

Use CSS-only wallpaper marks or lightweight gradients; no new large decorative bitmap. Keep contrast and responsive sizing.

- [ ] **Step 6: Run check**

Run: `npm test`

Expected: PASS for Telegram and roadmap assertions.

- [ ] **Step 7: Commit proof and roadmap**

```powershell
git add assets/landing-refresh.js assets/landing-refresh.css scripts/site-selfcheck.mjs
git commit -m "feat: refresh Telegram proof and roadmap status"
```

### Task 6: Tune hierarchy, background, and mobile performance

**Files:**
- Modify: `assets/landing-refresh.css`
- Modify: `assets/landing-refresh.js`
- Test: `scripts/site-selfcheck.mjs`

**Interfaces:**
- Consumes: existing hero/header classes and Framer Motion inline styles.
- Produces: hierarchy overrides and mobile/reduced-motion performance policy.

- [ ] **Step 1: Add failing performance-style checks**

Assert stylesheet contains mobile breakpoint, `prefers-reduced-motion`, reduced backdrop filters, disabled decorative animation, and hero/header spacing selectors.

- [ ] **Step 2: Run check and confirm failure**

Run: `npm test`

Expected: FAIL with missing performance policy.

- [ ] **Step 3: Tune desktop hierarchy and background**

Raise `.hero-copy`, add wordmark/menu gap, and reduce texture pseudo-element opacity approximately 50% without removing color glows.

- [ ] **Step 4: Add mobile fast path**

At `max-width: 767px`, remove large backdrop filters and card hover transforms, disable decorative animation, and force reveal elements to stable `opacity:1; transform:none` without stagger.

- [ ] **Step 5: Add reduced-motion policy**

Disable transitions, animations, smooth scrolling, and autoplay setup when `matchMedia('(prefers-reduced-motion: reduce)')` matches.

- [ ] **Step 6: Lazy-load offscreen media**

Set generated product images to `loading="lazy" decoding="async"`; do not assign modal video `src` before modal open.

- [ ] **Step 7: Run check**

Run: `npm test`

Expected: PASS for performance assertions.

- [ ] **Step 8: Commit performance work**

```powershell
git add assets/landing-refresh.js assets/landing-refresh.css scripts/site-selfcheck.mjs
git commit -m "perf: smooth landing interactions on mobile"
```

### Task 7: Refresh Graphify and verify desktop/mobile behavior

**Files:**
- Modify: `graphify-out/*`
- Test: `scripts/site-selfcheck.mjs`

**Interfaces:**
- Consumes: complete landing refresh.
- Produces: updated project graph and verification evidence.

- [ ] **Step 1: Run automated checks**

Run: `npm test`

Expected: `Landing site self-check passed`.

- [ ] **Step 2: Update code graph**

Run: `graphify update .`

Expected: changed JS and test files re-indexed successfully.

- [ ] **Step 3: Verify English desktop route**

At 1440x900, confirm raised hero, nav spacing, English images, rewritten copy, modal behavior, Telegram preview, roadmap groups, and removed pitch-deck CTA.

- [ ] **Step 4: Verify Russian desktop route**

At 1440x900, confirm Russian media, no stray English labels, correct Telegram deep link, all nine modals, and corrected roadmap groups.

- [ ] **Step 5: Verify phone routes**

At 390x844, scroll both locales through all sections. Confirm no visible reveal stalls, horizontal overflow, trapped scrolling, cropped modal controls, or heavy animation jank.

- [ ] **Step 6: Verify keyboard and reduced motion**

Tab to a feature card, open with Enter, close with Escape, confirm focus restoration. Emulate reduced motion and confirm non-essential animations/autoplay are disabled.

- [ ] **Step 7: Review diff and final status**

Run: `git diff --check` and `git status --short`.

Expected: no whitespace errors; only intended refresh files and Graphify output changed.

- [ ] **Step 8: Commit final verification adjustments**

```powershell
git add graphify-out assets scripts index.html ru/index.html
git commit -m "chore: verify localized landing refresh"
```

