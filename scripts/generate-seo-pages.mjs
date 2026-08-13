import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
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

function renderPage(feature, locale) {
  const isRu = locale === 'ru';
  const copy = feature[locale];
  const path = featurePath(feature.slug, locale);
  const canonical = absoluteUrl(path);
  const enUrl = absoluteUrl(featurePath(feature.slug, 'en'));
  const ruUrl = absoluteUrl(featurePath(feature.slug, 'ru'));
  const imageUrl = absoluteUrl(feature.image[locale]);
  const otherLocale = isRu ? 'en' : 'ru';
  const otherLabel = isRu ? 'EN' : 'RU';
  const homePath = isRu ? '/ru/' : '/';
  const homeLabel = isRu ? 'На главную' : 'Home';
  const labels = isRu ? {
    benefits: 'Что вы получите', how: 'Как это работает', faq: 'Частые вопросы', related: 'Другие возможности',
    try: 'Попробовать в Telegram', mini: 'Открывается внутри Telegram', nav: 'Возможности UltyMyLife', demo: 'Посмотрите раздел в действии', play: 'Запустить видео',
  } : {
    benefits: 'What you get', how: 'How it works', faq: 'Frequently asked questions', related: 'Explore more',
    try: 'Try it in Telegram', mini: 'Opens inside Telegram', nav: 'UltyMyLife features', demo: 'See the section in action', play: 'Play video',
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
    <meta name="theme-color" content="#07090f">
    <link rel="canonical" href="${canonical}">
    <link rel="alternate" hreflang="en" href="${enUrl}">
    <link rel="alternate" hreflang="ru" href="${ruUrl}">
    <link rel="alternate" hreflang="x-default" href="${enUrl}">
    <link rel="icon" href="/assets/logo.jpg">
    <link rel="stylesheet" href="/assets/seo-pages.css?v=4">
    <link rel="stylesheet" href="/assets/feature-video.css?v=4">
    <script src="/assets/feature-video.js?v=3" defer></script>
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
      <a class="brand" href="${homePath}" aria-label="${SITE.name} — ${homeLabel}">${SITE.name}</a>
      <nav aria-label="${labels.nav}">
        <a href="${featurePath(feature.slug, otherLocale)}" lang="${otherLocale}">${otherLabel}</a>
        <a class="header-cta" href="${telegramUrl(locale)}" rel="noopener">${labels.try}</a>
      </nav>
    </header>
    <main>
      <div class="breadcrumbs"><a href="${homePath}">${homeLabel}</a><span aria-hidden="true">/</span><span>${escapeHtml(copy.name)}</span></div>
      <section class="feature-hero">
        <div class="hero-copy">
          <p class="eyebrow">${escapeHtml(copy.eyebrow)}</p>
          <h1>${escapeHtml(copy.name)}</h1>
          <p class="lead">${escapeHtml(copy.lead)}</p>
          <div class="cta-row">
            <a class="primary-button" href="${telegramUrl(locale)}" rel="noopener">${labels.try}<span aria-hidden="true">↗</span></a>
            <span class="telegram-note">${labels.mini}</span>
          </div>
        </div>
        <figure class="product-art">
          <img src="${feature.image[locale]}" width="853" height="1844" alt="${escapeHtml(`${SITE.name} — ${copy.name}`)}" loading="eager" fetchpriority="high">
        </figure>
      </section>
      <section class="content-section" aria-labelledby="benefits-title">
        <p class="section-kicker">${labels.benefits}</p>
        <h2 id="benefits-title">${escapeHtml(copy.eyebrow)}</h2>
        <div class="benefit-grid">${copy.benefits.map((benefit, index) => `
          <article><span class="number">0${index + 1}</span><p>${escapeHtml(benefit)}</p></article>`).join('')}
        </div>
      </section>
      <section class="feature-demo" data-feature-video aria-labelledby="demo-title">
        <div class="feature-demo-copy"><p class="section-kicker">${labels.demo}</p><h2 id="demo-title">${escapeHtml(copy.name)}</h2><p>${escapeHtml(copy.lead)}</p></div>
        <div class="feature-video-wrap">
          <video class="feature-video" poster="${feature.image[locale]}" preload="none" playsinline controls data-video-src="${videoFor(feature)}"></video>
          <button class="feature-video-play" type="button" data-video-play aria-label="${labels.play}"><span aria-hidden="true">▶</span><span>${labels.play}</span></button>
        </div>
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
    <footer><a href="${homePath}">${SITE.name}</a><span>© 2026 ${SITE.name}</span></footer>
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
    sitemapEntry('/', '/assets/product/en/home.png', 'UltyMyLife Telegram Mini App'),
    sitemapEntry('/ru/', '/assets/product/home.jpg', 'UltyMyLife — система внутри Telegram'),
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
