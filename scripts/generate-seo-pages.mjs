import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { featureTour } from '../assets/product/tour.js';
import { FEATURES, SITE, featurePath, telegramUrl } from './seo-content.mjs';

const root = resolve(import.meta.dirname, '..');

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
}

function safeJson(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

function absoluteUrl(path) {
  return new URL(path, SITE.origin).href;
}

function videoFor(feature) {
  return {
    habits: '/assets/product/habits.mp4', tasks: '/assets/product/tasks.mov', workouts: '/assets/product/training.mov',
    'breathing-meditation': '/assets/product/recovery.mp4', 'mental-fitness': '/assets/product/mental.mp4', sleep: '/assets/product/sleep.mp4',
    'ai-assistant': '/assets/product/home.mov', 'personal-progress': '/assets/product/home.mov', 'progress-analytics': '/assets/product/home.mov',
  }[feature.slug];
}

function renderFaq(items) {
  return items.map(({ question, answer }) => `
          <details>
            <summary>${escapeHtml(question)}</summary>
            <p>${escapeHtml(answer)}</p>
          </details>`).join('');
}

function relatedFeatures(feature) {
  const index = FEATURES.findIndex(({ slug }) => slug === feature.slug);
  return [1, 2, 3].map((offset) => FEATURES[(index + offset) % FEATURES.length]);
}

function renderRelated(feature, locale) {
  return relatedFeatures(feature).map((related) => `
          <a class="related-card" href="${featurePath(related.slug, locale)}">
            <span>${escapeHtml(related[locale].name)}</span><span aria-hidden="true">→</span>
          </a>`).join('');
}

function renderSchemas(feature, locale) {
  const copy = feature[locale];
  const path = featurePath(feature.slug, locale);
  const url = absoluteUrl(path);
  const home = locale === 'ru' ? `${SITE.origin}/ru/` : `${SITE.origin}/`;
  const homeName = locale === 'ru' ? 'Главная' : 'Home';
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage', '@id': `${url}#webpage`, url, name: copy.title,
        description: copy.description, inLanguage: locale, isPartOf: { '@id': `${SITE.origin}/#website` },
        primaryImageOfPage: { '@id': `${url}#primaryimage` },
      },
      {
        '@type': 'SoftwareApplication', '@id': `${SITE.origin}/#app`, name: SITE.name,
        applicationCategory: 'LifestyleApplication', operatingSystem: 'Telegram',
        url: telegramUrl(locale), description: copy.description,
      },
      {
        '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [
          { '@type': 'ListItem', position: 1, name: homeName, item: home },
          { '@type': 'ListItem', position: 2, name: copy.name, item: url },
        ],
      },
      {
        '@type': 'FAQPage', '@id': `${url}#faq`, mainEntity: copy.faq.map(({ question, answer }) => ({
          '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer },
        })),
      },
      {
        '@type': 'ImageObject', '@id': `${url}#primaryimage`, contentUrl: absoluteUrl(feature.image[locale]),
        caption: `${SITE.name} — ${copy.name}`, representativeOfPage: true,
      },
    ],
  };
}

function screenImage(screen, { eager = false } = {}) {
  return `<img src="${screen.preview}" width="${screen.previewWidth}" height="${screen.previewHeight}" alt="${escapeHtml(screen.title)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}

function renderPage(feature, locale) {
  const isRu = locale === 'ru';
  const copy = feature[locale];
  const path = featurePath(feature.slug, locale);
  const canonical = absoluteUrl(path);
  const enUrl = absoluteUrl(featurePath(feature.slug, 'en'));
  const ruUrl = absoluteUrl(featurePath(feature.slug, 'ru'));
  const imageUrl = absoluteUrl(feature.image[locale]);
  const tour = featureTour(locale, feature.slug);
  const [primary, companion, ...details] = tour.screens;
  const fallback = {
    title: isRu ? 'Экран UltyMyLife' : 'UltyMyLife screen',
    src: feature.image[locale], preview: feature.image[locale], previewWidth: 825, previewHeight: 1539,
  };
  const heroScreen = primary ?? fallback;
  const otherLocale = isRu ? 'en' : 'ru';
  const otherLabel = isRu ? 'EN' : 'RU';
  const homePath = isRu ? '/ru/' : '/';
  const homeLabel = isRu ? 'На главную' : 'Home';
  const webApp = `https://app.ultymylife.com/?lang=${locale}`;
  const labels = isRu ? {
    benefits: 'Что вы получите', how: 'Как это работает', faq: 'Частые вопросы', related: 'Другие возможности',
    try: 'Открыть в Telegram', web: 'Открыть веб-приложение', nav: 'Возможности UltyMyLife', demo: 'Посмотрите раздел в действии', play: 'Запустить видео', fullScreen: 'Открыть экран целиком',
  } : {
    benefits: 'What you get', how: 'How it works', faq: 'Frequently asked questions', related: 'Explore more',
    try: 'Open in Telegram', web: 'Open web app', nav: 'UltyMyLife features', demo: 'A closer look', fullScreen: 'Open full screenshot',
  };

  return `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">
    <meta http-equiv="Pragma" content="no-cache">
    <meta http-equiv="Expires" content="0">
    <title>${escapeHtml(copy.title)}</title>
    <meta name="description" content="${escapeHtml(copy.description)}">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <meta name="theme-color" content="#080a0b">
    <link rel="canonical" href="${canonical}">
    <link rel="alternate" hreflang="en" href="${enUrl}">
    <link rel="alternate" hreflang="ru" href="${ruUrl}">
    <link rel="alternate" hreflang="x-default" href="${enUrl}">
    <link rel="icon" href="/assets/favicon.png?v=bloom" type="image/png" sizes="64x64">
    <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" sizes="180x180">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&amp;family=Golos+Text:wght@400..700&amp;family=Instrument+Serif:ital@0;1&amp;display=swap" rel="stylesheet">
    <link rel="stylesheet" href="/assets/product/device.css?v=2">
    <link rel="stylesheet" href="/assets/seo-pages.css?v=7">
    <link rel="stylesheet" href="/assets/feature-video.css?v=6">
    <script src="/assets/feature-video.js?v=5" defer></script>
    <meta property="og:type" content="website">
    <meta property="og:site_name" content="${SITE.name}">
    <meta property="og:title" content="${escapeHtml(copy.title)}">
    <meta property="og:description" content="${escapeHtml(copy.description)}">
    <meta property="og:url" content="${canonical}">
    <meta property="og:image" content="${imageUrl}">
    <meta property="og:locale" content="${isRu ? 'ru_RU' : 'en_US'}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeHtml(copy.title)}">
    <meta name="twitter:description" content="${escapeHtml(copy.description)}">
    <meta name="twitter:image" content="${imageUrl}">
    <script type="application/ld+json">${safeJson(renderSchemas(feature, locale))}</script>
  </head>
  <body>
    <header class="site-header">
      <a class="brand" href="${homePath}" data-studio-home aria-label="${SITE.name} — ${homeLabel}"><img src="/assets/brand-mark.png" alt="" width="24" height="24">${SITE.name}</a>
      <nav aria-label="${labels.nav}">
        <a href="${featurePath(feature.slug, otherLocale)}" lang="${otherLocale}">${otherLabel}</a>
        <a class="header-cta" href="${telegramUrl(locale)}" rel="noopener">${labels.try}</a>
      </nav>
    </header>
    <main>
      <div class="breadcrumbs"><a href="${homePath}" data-studio-home>${homeLabel}</a><span aria-hidden="true">/</span><span>${escapeHtml(copy.name)}</span></div>
      <section class="feature-hero">
        <div class="hero-copy">
          <p class="eyebrow">${escapeHtml(copy.eyebrow)}</p>
          <h1>${escapeHtml(copy.name)}</h1>
          <p class="lead">${escapeHtml(copy.lead)}</p>
          <div class="cta-row">
            <a class="primary-button" href="${telegramUrl(locale)}" rel="noopener">${labels.try}<span aria-hidden="true">↗</span></a>
            <a class="secondary-button" href="${webApp}">${labels.web}<span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <figure class="product-art" style="--art-tone:${tour.tone}">
          <div class="feature-devices">
            <a class="uml-device feature-device-main" href="${heroScreen.src}" target="_blank" rel="noopener" aria-label="${labels.fullScreen} — ${escapeHtml(heroScreen.title)}">
              <span class="device-camera" aria-hidden="true"></span>${screenImage(heroScreen, { eager: true })}
            </a>${companion ? `
            <a class="uml-device feature-device-companion" href="${companion.src}" target="_blank" rel="noopener" aria-label="${labels.fullScreen} — ${escapeHtml(companion.title)}"><span class="device-camera" aria-hidden="true"></span>${screenImage(companion)}</a>` : ''}
          </div>
          <figcaption><span aria-hidden="true"></span> ${escapeHtml(copy.name)} <a href="${heroScreen.src}" target="_blank" rel="noopener">${labels.fullScreen} <span aria-hidden="true">↗</span></a></figcaption>
        </figure>
      </section>
      <section class="content-section" aria-labelledby="benefits-title">
        <p class="section-kicker">${labels.benefits}</p>
        <h2 id="benefits-title">${escapeHtml(copy.eyebrow)}</h2>
        <ul class="benefit-grid">${copy.benefits.map(benefit => `
          <li>${escapeHtml(benefit)}</li>`).join('')}
        </ul>
      </section>
      <section class="feature-demo"${isRu ? ' data-feature-video' : ''} aria-labelledby="demo-title">
        <div class="feature-demo-copy"><p class="section-kicker">${labels.demo}</p><h2 id="demo-title">${escapeHtml(copy.name)}</h2>${isRu
          ? `<p>${escapeHtml(copy.lead)}</p>`
          : `<a class="secondary-button feature-full" href="${heroScreen.src}" target="_blank" rel="noopener">${labels.fullScreen}<span aria-hidden="true">↗</span></a>`}</div>
        ${isRu ? `<div class="feature-video-wrap">
          <video class="feature-video" poster="${feature.image[locale]}" preload="none" muted playsinline controls data-video-src="${videoFor(feature)}"></video>
          <button class="feature-video-play" type="button" data-video-play aria-label="${labels.play}"><span aria-hidden="true">▶</span><span>${labels.play}</span></button>
        </div>` : `<div class="feature-detail">
          ${(details.length ? details : [companion || heroScreen]).map(screen => `<a href="${screen.src}" target="_blank" rel="noopener" aria-label="${labels.fullScreen} — ${escapeHtml(screen.title)}">${screenImage(screen)}<span>${escapeHtml(screen.title)} <span aria-hidden="true">↗</span></span></a>`).join('')}
        </div>`}
      </section>
      <section class="how-section" aria-labelledby="how-title">
        <div><p class="section-kicker">${labels.how}</p><h2 id="how-title">${escapeHtml(copy.name)} + Telegram</h2></div>
        <p>${escapeHtml(copy.how)}</p>
      </section>
      <section class="faq content-section" aria-labelledby="faq-title">
        <p class="section-kicker">${labels.faq}</p>
        <h2 id="faq-title">${labels.faq}</h2>
        <div class="faq-list">${renderFaq(copy.faq)}</div>
      </section>
      <section class="final-cta">
        <p class="eyebrow">${SITE.name}</p>
        <h2>${isRu ? 'Начните с одного полезного раздела' : 'Start with one useful section'}</h2>
        <a class="primary-button" href="${telegramUrl(locale)}" rel="noopener">${labels.try}<span aria-hidden="true">↗</span></a>
      </section>
      <section class="related content-section" aria-labelledby="related-title">
        <p class="section-kicker">${labels.related}</p>
        <h2 id="related-title">${labels.related}</h2>
        <div class="related-grid">${renderRelated(feature, locale)}</div>
      </section>
    </main>
    <footer><a href="${homePath}" data-studio-home>${SITE.name}</a><a href="https://www.producthunt.com/products/ultymylife" target="_blank" rel="noopener noreferrer">Product Hunt <span aria-hidden="true">↗</span></a><span>© 2026 ${SITE.name}</span></footer>
  </body>
</html>
`;
}

function sitemapEntry(path, imagePath, imageTitle) {
  const url = absoluteUrl(path);
  const slug = path.replace(/^\/ru\//, '/').split('/').filter(Boolean)[0];
  const isHome = !slug;
  const enPath = isHome ? '/' : `/${slug}/`;
  const ruPath = isHome ? '/ru/' : `/ru/${slug}/`;
  return `  <url>
    <loc>${url}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${absoluteUrl(enPath)}"/>
    <xhtml:link rel="alternate" hreflang="ru" href="${absoluteUrl(ruPath)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${absoluteUrl(enPath)}"/>
    <image:image><image:loc>${absoluteUrl(imagePath)}</image:loc><image:title>${escapeHtml(imageTitle)}</image:title></image:image>
    <lastmod>2026-08-12</lastmod>
  </url>`;
}

async function generate() {
  for (const feature of FEATURES) {
    for (const locale of ['en', 'ru']) {
      const directory = resolve(root, locale === 'ru' ? `ru/${feature.slug}` : feature.slug);
      await mkdir(directory, { recursive: true });
      await writeFile(resolve(directory, 'index.html'), renderPage(feature, locale), 'utf8');
    }
  }

  const entries = [
    sitemapEntry('/', '/assets/product/en/screens/home.webp', 'UltyMyLife Telegram Mini App'),
    sitemapEntry('/ru/', '/assets/product/ru/screens/home.webp', 'UltyMyLife — система внутри Telegram'),
  ];
  for (const feature of FEATURES) {
    entries.push(sitemapEntry(featurePath(feature.slug, 'en'), feature.image.en, feature.en.name));
    entries.push(sitemapEntry(featurePath(feature.slug, 'ru'), feature.image.ru, feature.ru.name));
  }
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries.join('\n')}
</urlset>
`;
  await writeFile(resolve(root, 'sitemap.xml'), sitemap, 'utf8');
  await writeFile(resolve(root, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE.origin}/sitemap.xml\n`, 'utf8');
  console.log(`Generated ${FEATURES.length * 2} SEO pages plus sitemap.xml and robots.txt.`);
}

await generate();
