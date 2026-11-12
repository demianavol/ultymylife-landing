import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { featureTour, tourGroups } from '../assets/product/tour.js';

const root = resolve(import.meta.dirname, '..');
const origin = 'https://ultymylife.com';
const slugs = [
  'habits',
  'tasks',
  'workouts',
  'breathing-meditation',
  'mental-fitness',
  'sleep',
  'ai-assistant',
  'personal-progress',
  'progress-analytics',
];
const failures = [];
const titles = new Set();
const descriptions = new Set();
const mediaBySlug = {
  habits: { image: 'habits', video: 'habits.mp4' },
  tasks: { image: 'tasks', video: 'tasks.mov' },
  workouts: { image: 'training', video: 'training.mov' },
  'breathing-meditation': { image: 'recovery', video: 'recovery.mp4' },
  'mental-fitness': { image: 'mental', video: 'mental.mp4' },
  sleep: { image: 'sleep', video: 'sleep.mp4' },
  'ai-assistant': { image: 'home', video: 'home.mov' },
  'personal-progress': { image: 'home', video: 'home.mov' },
  'progress-analytics': { image: 'home', video: 'home.mov' },
};

function fail(message) {
  failures.push(message);
}

function read(relativePath) {
  const path = resolve(root, relativePath);
  if (!existsSync(path)) {
    fail(`Missing ${relativePath}`);
    return '';
  }
  return readFileSync(path, 'utf8');
}

function matches(html, pattern) {
  return pattern.test(html);
}

function count(html, pattern) {
  return [...html.matchAll(pattern)].length;
}

for (const locale of ['en', 'ru']) {
  const telegram = locale === 'ru'
    ? 'https://t.me/UltyMyLife_bot/umlminiapp?startapp=lang_ru'
    : 'https://t.me/UltyMyLife_bot/umlminiapp';

  for (const slug of slugs) {
    const relativePath = locale === 'ru' ? `ru/${slug}/index.html` : `${slug}/index.html`;
    const html = read(relativePath);
    if (!html) continue;

    const canonicalPath = locale === 'ru' ? `/ru/${slug}/` : `/${slug}/`;
    const canonical = `${origin}${canonicalPath}`;
    const enUrl = `${origin}/${slug}/`;
    const ruUrl = `${origin}/ru/${slug}/`;
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];

    if (!title) fail(`${relativePath}: missing title`);
    else if (titles.has(title)) fail(`${relativePath}: duplicate title`);
    else titles.add(title);

    if (!description) fail(`${relativePath}: missing description`);
    else if (descriptions.has(description)) fail(`${relativePath}: duplicate description`);
    else descriptions.add(description);

    if (!html.includes(`<link rel="canonical" href="${canonical}">`)) fail(`${relativePath}: wrong canonical`);
    if (!html.includes(`<link rel="alternate" hreflang="en" href="${enUrl}">`)) fail(`${relativePath}: missing en hreflang`);
    if (!html.includes(`<link rel="alternate" hreflang="ru" href="${ruUrl}">`)) fail(`${relativePath}: missing ru hreflang`);
    if (!html.includes(`<link rel="alternate" hreflang="x-default" href="${enUrl}">`)) fail(`${relativePath}: missing x-default`);
    if (count(html, /<h1\b/g) !== 1) fail(`${relativePath}: expected one H1`);
    if (!html.includes(`href="${telegram}"`)) fail(`${relativePath}: wrong Telegram CTA`);
    if (!matches(html, /<section[^>]+class="[^"]*\bfaq\b[^"]*"/)) fail(`${relativePath}: missing visible FAQ`);
    for (const type of ['WebPage', 'SoftwareApplication', 'BreadcrumbList', 'FAQPage', 'ImageObject']) {
      if (!html.includes(`"@type":"${type}"`)) fail(`${relativePath}: missing ${type} schema`);
    }
    if (!matches(html, /property="og:title"/) || !matches(html, /name="twitter:card"/)) fail(`${relativePath}: missing social metadata`);
    if (matches(html, /index-[A-Za-z0-9_-]+\.js|autoplay/)) fail(`${relativePath}: not lightweight`);
    if (locale === 'ru' && !matches(html, /class="feature-video"[^>]*preload="none" muted playsinline controls[^>]*data-video-src=/)) fail(`${relativePath}: missing muted, lazy product video`);
    if (locale === 'en' && html.includes('data-video-src')) fail(`${relativePath}: Russian video on English page`);
    if (count(html, /<details>/g) < 4) fail(`${relativePath}: expected at least four FAQ items`);
    const questions = [...html.matchAll(/<summary>([^<]+)<\/summary>/g)].map((match) => match[1].trim().toLocaleLowerCase(locale));
    if (new Set(questions).size !== questions.length) fail(`${relativePath}: duplicate FAQ questions`);
    if (slug === 'habits' && questions.some((question) => question.includes(locale === 'ru' ? 'устанавливать отдельное приложение' : 'install another app'))) fail(`${relativePath}: semantically repeated app-install FAQ`);
    const expectedMedia = mediaBySlug[slug];
    const expectedImage = `/assets/product/${locale}/screens/${expectedMedia.image}.webp`;
    const heroScreen = featureTour(locale, slug).screens[0];
    if (!existsSync(resolve(root, expectedImage.slice(1))) || !html.includes(`property="og:image" content="${origin}${expectedImage}"`)) fail(`${relativePath}: wrong social screenshot`);
    if (!html.includes(`class="uml-device feature-device-main" href="${heroScreen?.src ?? expectedImage}"`)) fail(`${relativePath}: missing full screenshot link`);
    if (locale === 'ru' && (!html.includes(`poster="${expectedImage}"`) || !html.includes(`data-video-src="/assets/product/${expectedMedia.video}"`))) fail(`${relativePath}: wrong section video`);
    if (!html.includes('/assets/seo-pages.css?v=7') || !html.includes('/assets/feature-video.css?v=6') || !html.includes('/assets/feature-video.js?v=5')) fail(`${relativePath}: feature assets must be cache-versioned`);
    if (!html.includes('<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">')) fail(`${relativePath}: HTML cache prevention missing`);
    if (html.indexOf('<section class="final-cta">') > html.indexOf('<section class="related content-section"')) fail(`${relativePath}: final CTA must appear before related features`);
  }
}

for (const group of tourGroups) {
  for (const locale of ['en', 'ru']) {
    for (const frame of group[locale]) {
      for (const url of new Set([frame.src, frame.preview])) {
        if (!url.startsWith(`/assets/product/${locale === 'en' ? 'tour/en' : 'ru'}/`) || !existsSync(resolve(root, url.slice(1)))) {
          fail(`Invalid ${locale} gallery image: ${url}`);
        }
      }
    }
  }
}

const featureVideoCss = read('assets/feature-video.css');
if (!/aspect-ratio:\s*853\s*\/\s*1844/.test(featureVideoCss)) fail('feature video: expected original portrait ratio');
if (!/object-fit:\s*contain/.test(featureVideoCss)) fail('feature video: expected uncropped content');

const seoPagesCss = read('assets/seo-pages.css');
if (!/grid-template-columns:\s*1fr\b/.test(seoPagesCss)) fail('feature mobile: one-column layout missing');

const sitemap = read('sitemap.xml');
const expectedUrls = [`${origin}/`, `${origin}/ru/`];
for (const slug of slugs) expectedUrls.push(`${origin}/${slug}/`, `${origin}/ru/${slug}/`);
for (const url of expectedUrls) {
  if (!sitemap.includes(`<loc>${url}</loc>`)) fail(`sitemap.xml: missing ${url}`);
}
if (count(sitemap, /<url>/g) !== 20) fail('sitemap.xml: expected 20 URL entries');
if (!sitemap.includes('xmlns:xhtml="http://www.w3.org/1999/xhtml"')) fail('sitemap.xml: missing hreflang namespace');
if (!sitemap.includes('xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"')) fail('sitemap.xml: missing image namespace');

const robots = read('robots.txt');
if (!robots.includes('User-agent: *') || !robots.includes('Allow: /')) fail('robots.txt: crawling not allowed');
if (!robots.includes(`Sitemap: ${origin}/sitemap.xml`)) fail('robots.txt: sitemap missing');

for (const locale of ['en', 'ru']) {
  const homePath = locale === 'ru' ? 'ru/index.html' : 'index.html';
  const home = read(homePath);
  if (home.includes('seo-pages.css')) fail(`${homePath}: feature-page CSS must not override the app landing`);
  if (home.includes('seo-feature-directory')) fail(`${homePath}: feature directory belongs in the product cards, not after the footer`);
  for (const type of ['Organization', 'WebSite', 'SoftwareApplication']) {
    if (!home.includes(`"@type":"${type}"`)) fail(`${homePath}: missing ${type} schema`);
  }
}

for (const locale of ['en', 'ru']) {
  const prefix = locale === 'ru' ? '/ru/' : '/';
  const home = read(locale === 'ru' ? 'ru/index.html' : 'index.html');
  for (const slug of slugs) {
    if (!home.includes(`<a href="${prefix}${slug}/"`)) fail(`Landing ${locale}: missing link to ${slug}`);
  }
}

if (failures.length) {
  console.error(`SEO self-check failed (${failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log('SEO self-check passed: 18 feature pages, 20 sitemap URLs, RU/EN metadata valid.');
