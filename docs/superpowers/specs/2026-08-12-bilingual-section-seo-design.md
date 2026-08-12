# Bilingual Section SEO Design

## Goal

Make `https://ultymylife.com` eligible to rank for English and Russian searches connected to every UltyMyLife product section, then send qualified visitors into the Telegram Mini App.

SEO cannot guarantee a ranking position or immediate indexing. Success means search engines can crawl, understand, index, and correctly localize useful pages for each product area.

## Search Architecture

Create nine English and nine Russian static landing pages:

| Topic | English URL | Russian URL |
| --- | --- | --- |
| Habits | `/habits/` | `/ru/habits/` |
| Tasks | `/tasks/` | `/ru/tasks/` |
| Workouts | `/workouts/` | `/ru/workouts/` |
| Breathing and meditation | `/breathing-meditation/` | `/ru/breathing-meditation/` |
| Mental fitness | `/mental-fitness/` | `/ru/mental-fitness/` |
| Sleep | `/sleep/` | `/ru/sleep/` |
| AI assistant | `/ai-assistant/` | `/ru/ai-assistant/` |
| Personal progress | `/personal-progress/` | `/ru/personal-progress/` |
| Progress analytics | `/progress-analytics/` | `/ru/progress-analytics/` |

Each URL is self-canonical. Every English/Russian pair reciprocally declares `hreflang="en"`, `hreflang="ru"`, and `hreflang="x-default"`. The English version is `x-default`.

## Page Content

Every page must contain unique, people-first copy rather than keyword variants or thin doorway content:

- one descriptive H1 matching the user problem;
- concise explanation of what the feature does;
- three concrete outcomes or capabilities;
- how the feature works inside Telegram;
- a product screenshot with descriptive alt text;
- three topic-specific FAQ questions and answers;
- contextual links to at least three related UltyMyLife pages;
- primary CTA to the Telegram Mini App;
- secondary CTA back to the complete product overview.

The current Mini App supports language entry links only. English pages use `https://t.me/UltyMyLife_bot/umlminiapp`; Russian pages use `https://t.me/UltyMyLife_bot/umlminiapp?startapp=lang_ru`. Topic-specific deep links remain a centralized future extension, not guessed URL parameters.

## Metadata

Every page gets unique:

- `<title>`;
- meta description;
- canonical URL;
- reciprocal hreflang links;
- Open Graph title, description, URL, image, locale, and alternate locale;
- Twitter card metadata;
- robots directive `index,follow,max-image-preview:large`;
- descriptive image width, height, loading, and alt attributes.

Root English and Russian home pages also receive improved Organization, WebSite, and SoftwareApplication JSON-LD plus internal links to every feature page.

## Structured Data

Every feature page includes one JSON-LD `@graph` containing:

- `WebPage` with canonical URL and language;
- `SoftwareApplication` describing UltyMyLife as a Telegram Mini App without invented ratings or pricing claims;
- `BreadcrumbList` linking home and feature page;
- `FAQPage` matching visible FAQ content exactly;
- `ImageObject` for the supplied interface screenshot.

Markup must be valid JSON and represent visible page content. No fake reviews, ratings, testimonials, download counts, or unsupported claims.

## Crawl and Discovery

Create:

- root `robots.txt` allowing public content and declaring sitemap URL;
- root `sitemap.xml` listing home pages and all 18 feature pages with reciprocal `xhtml:link` language alternates;
- image annotations in sitemap entries for feature screenshots;
- a visible feature directory on both home pages so crawlers and users can reach every page through normal links.

Legal pages remain crawlable but stay outside the primary product sitemap because they are not search-acquisition targets.

## Visual and Performance Rules

Feature pages use a dedicated lightweight static template and shared stylesheet. They must not load the existing React/Framer bundle, autoplay video, continuous animations, blur-heavy layers, or large unused assets. Mobile and desktop layouts preserve the existing dark cyan/blue/violet design language.

English pages use supplied English PNG interface posters. Russian pages use existing compressed Russian JPG posters. Above-the-fold images use eager loading and `fetchpriority="high"`; below-the-fold images use lazy loading.

## Generation Architecture

Use a single data source and deterministic generator:

- `scripts/seo-content.mjs`: bilingual page data, metadata, related links, FAQ, and image mapping;
- `scripts/generate-seo-pages.mjs`: HTML, sitemap, and robots generation;
- `assets/seo-pages.css`: shared lightweight feature-page styles;
- generated `*/index.html` and `ru/*/index.html` outputs.

Generated files are committed so GitHub Pages serves them as static HTML. Generator output must be deterministic to keep reviews stable.

## Validation

Extend `scripts/site-selfcheck.mjs` or add `scripts/seo-selfcheck.mjs` to verify:

- exactly 18 feature pages exist;
- every page has one H1, unique title, unique description, canonical, reciprocal hreflang, JSON-LD, FAQ, screenshot, CTA, and internal links;
- canonical and sitemap URLs use `https://ultymylife.com`;
- every sitemap URL resolves to a generated file;
- no duplicate titles or descriptions;
- robots references the canonical sitemap;
- English and Russian pages use the correct Mini App link;
- generated HTML contains no React bundle or autoplay video;
- JSON-LD and sitemap parse successfully.

Run syntax checks, all self-checks, `git diff --check`, and browser QA at desktop and mobile widths before deployment.

## Post-deployment Work

Code can prepare discovery but cannot submit or verify ownership automatically. After deployment, owner should:

1. add and verify `ultymylife.com` in Google Search Console and Bing Webmaster Tools;
2. submit `https://ultymylife.com/sitemap.xml`;
3. inspect the home page and representative feature URLs;
4. monitor impressions, queries, indexing status, and Core Web Vitals;
5. improve pages from real search queries instead of adding keyword-stuffed duplicates.

