# Design QA

- Source visual truth: `C:/Users/jousy/AppData/Local/Temp/codex-clipboard-b28bc7cd-2ee7-4da0-9086-4776ea475633.png`
- Implementation screenshot: `C:/Users/jousy/Documents/GitHub/ultymylife-landing/hero-implementation-qa.png`
- Viewport: 1440 x 900 CSS px, desktop, deviceScaleFactor 1
- State: Russian landing, top of page, default home screen selected
- Source pixels: 2048 x 1060; implementation pixels: 1424 x 891. Compared after matching desktop crop and first-screen state.

## Full-view comparison evidence

Original regression had title clipped under fixed header and removed decorative cards behind main device. Revised implementation restores main device, two rear product cards, glow ring, and floating proof cards while keeping all motion disabled. Hero copy begins at y=265, safely below 65px header.

## Focused region comparison evidence

Hero left: title, paragraph, switcher, and CTAs retain hierarchy and no clipping. Hero right: layered product showcase restored. Exact source screenshot had English state while current implementation capture uses Russian state; layout and visual asset structure are equivalent.

## Required fidelity surfaces

- Fonts and typography: Manrope/Inter hierarchy retained; heading wrap stable and fully visible.
- Spacing and layout: balanced two-column hero restored; header does not overlap content.
- Colors and tokens: cyan-blue-violet palette and restrained glow retained.
- Image quality: original supplied product posters used; no placeholder or generated replacement.
- Copy and content: Russian locale remains Russian; controls keep current localized labels.

## Comparison history

1. P1: hero title clipped by fixed header. Fix: desktop copy transform changed from -180px to -90px. Post-fix evidence: title fully visible, copy top 265px.
2. P1: decorative right-side showcase removed. Fix: keep hero shots, ring, and floating cards in DOM; apply static classes only. Post-fix evidence: 2 hero shots, 5 floating cards, and 1 ring rendered.

## Findings

No actionable P0/P1/P2 differences remain for requested regression fix.

## Primary interactions and console

- Hero module switching remains available.
- Hero phone button remains available.
- Runtime motion hook stays disabled to prevent continuous frame work.
- No new script syntax or site self-check errors.

## Final result

final result: passed

## 2026-08-12 — Bilingual feature SEO pages

- Automated contract: 18 static feature pages, 20 sitemap URLs, unique titles/descriptions, canonical, reciprocal RU/EN hreflang, x-default, JSON-LD, social metadata, FAQ, and Telegram CTA passed.
- HTTP smoke test: `/`, `/ru/`, all 18 feature routes, `/sitemap.xml`, and `/robots.txt` returned 200 locally.
- Desktop QA: `/habits/` at 1265px viewport; one H1, product image, two FAQ items, three related links, RU switch, correct English Telegram CTA, no horizontal overflow, no console errors.
- Mobile QA: `/ru/habits/` at 390x844; localized H1 and metadata, product image visible, correct EN switch and Russian Telegram CTA, no horizontal overflow, no console errors.
- Landing regression: `/ru/` retains original 68.48px H1 sizing, `translate(-30px, -90px)` hero position, nine crawlable directory links, and no horizontal overflow.
- Performance: feature pages load static HTML/CSS and product artwork only; no React bundle, video, autoplay, or looping animation.
- Build note: repository has no build script because GitHub Pages serves committed static files directly; HTTP route verification replaces a nonexistent build step.

Final result: passed

## 2026-08-13 — Feature card routes and click-to-load video

- Landing desktop QA: 9 cards in `#solution`; each exposes role `link` and opens its matching SEO route. The after-footer SEO directory is absent.
- Feature-page QA: `/habits/` starts with a poster and `preload="none"`; video `src` is empty before Play, then becomes `/assets/product/habits.mp4` only after user activation. No console errors.
- Mapping: habits, tasks, workouts, recovery/breathing, mental fitness, and sleep use their own demo media. AI assistant, personal progress, and progress analytics use the approved main-screen demo.
