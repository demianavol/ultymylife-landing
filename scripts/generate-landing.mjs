import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { tourScreen } from '../assets/product/tour.js';
import { telegramUrl } from './seo-content.mjs';

const root = resolve(import.meta.dirname, '..');
const fontUrl = 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,500;1,600&amp;family=Golos+Text:wght@400..700&amp;family=Instrument+Serif:ital@0;1&amp;display=swap';

const sections = [
  {
    id: 'habits', route: 'habits', title: { ru: 'Привычки', en: 'Habits' },
    description: {
      ru: 'Откройте список на сегодня и отмечайте выполненное по ходу дня.',
      en: 'See what’s on your list today and check things off as you go.',
    },
  },
  {
    id: 'tasks', route: 'tasks', title: { ru: 'Задачи', en: 'Tasks' },
    description: {
      ru: 'Разложите дела по срочности и важности. Для выбранной задачи можно включить таймер.',
      en: 'Sort tasks by urgency and importance, then start a timer for the one you pick.',
    },
  },
  {
    id: 'training', route: 'workouts', title: { ru: 'Тренировки', en: 'Training' },
    description: {
      ru: 'Выбирайте упражнения из библиотеки и возвращайтесь к записям прошлых тренировок.',
      en: 'Pick exercises from the library and revisit your past workout entries.',
    },
  },
  {
    id: 'recovery', route: 'breathing-meditation', title: { ru: 'Восстановление', en: 'Recovery' },
    description: {
      ru: 'Выберите дыхательную технику или медитацию и запустите практику с подсказками.',
      en: 'Choose a breathing exercise or meditation and follow the guided session.',
    },
  },
  {
    id: 'mind', route: 'mental-fitness', title: { ru: 'Тренировка ума', en: 'Mind' },
    description: {
      ru: 'Выберите короткое упражнение и сравните свой результат с личным рекордом.',
      en: 'Choose a quick exercise and see how you score against your personal best.',
    },
  },
  {
    id: 'sleep', route: 'sleep', title: { ru: 'Сон', en: 'Sleep' },
    description: {
      ru: 'Записывайте сон и самочувствие по утрам, чтобы сравнивать ночи в календаре.',
      en: 'Log your sleep and how you feel in the morning, then compare nights in the calendar.',
    },
  },
];

const copy = {
  ru: {
    headline: ['Соберите день', 'в одной системе'],
    intro: 'Привычки, задачи, тренировки, сон и развитие — в одном приложении',
    heroTelegram: 'Открыть в Телеграме',
    heroBrowser: 'Открыть в браузере',
    web: 'Открыть веб-приложение',
    telegram: 'Открыть в Telegram',
    navigation: 'Навигация',
    language: 'Язык',
    gallery: 'Приложение в действии',
    features: 'Возможности',
    detail: 'Подробнее о разделе',
    view: 'Открыть инфографику целиком',
    poster: 'Инфографика раздела',
    start: 'Как начать',
    steps: [
      ['Откройте приложение', 'В Telegram или в браузере. Установка не нужна.'],
      ['Выберите раздел', 'Например, добавьте задачу, которую хотите выполнить сегодня.'],
      ['Сделайте первую отметку', 'Отметьте выполненное и возвращайтесь к своим записям, чтобы видеть прогресс.'],
    ],
    final: 'Начните с одного дела',
    extraNav: 'Ещё в приложении',
    extras: ['Профиль', 'Статистика', 'ИИ-помощник'],
    footerNav: 'Информация о сайте',
    privacy: 'Конфиденциальность',
    terms: 'Условия',
    contact: 'Контакты',
  },
  en: {
    headline: ['Bring your day', 'together'],
    intro: 'Habits, tasks, workouts, sleep, and personal growth in one app',
    heroTelegram: 'Open in Telegram',
    heroBrowser: 'Open in browser',
    web: 'Open web app',
    telegram: 'Open in Telegram',
    navigation: 'Navigation',
    language: 'Language',
    gallery: 'UltyMyLife in action',
    features: 'Features',
    detail: 'Learn about this feature',
    view: 'Open full-size infographic',
    poster: 'Infographic for',
    start: 'Getting started',
    steps: [
      ['Open the app', 'Use Telegram or your browser. No installation needed.'],
      ['Pick a section', 'For example, add a task you want to finish today.'],
      ['Log your first action', 'Mark it done and return to your entries to see your progress.'],
    ],
    final: 'Start with one thing',
    extraNav: 'More in the app',
    extras: ['Profile', 'Statistics', 'AI assistant'],
    footerNav: 'Site information',
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',
  },
};

const extraRoutes = ['personal-progress', 'progress-analytics', 'ai-assistant'];
const arrow = '<span aria-hidden="true">↗</span>';
const posterAssets = {
  en: { directory: '/assets/product/showcase', width: 1122, height: 1402, smallWidth: 560 },
  ru: { directory: '/assets/product/showcase/ru', width: 1086, height: 1448, smallWidth: 558 },
};
const russianHeroScreens = {
  habits: { title: 'Привычки на сегодня', height: 972 },
  home: { title: 'Обзор дня', height: 1124 },
  mental: { title: 'Упражнения для ума', height: 932 },
};

function heroScreen(locale, group) {
  if (locale === 'en') return tourScreen(locale, group);
  return { ...russianHeroScreens[group], src: `/assets/product/ru/hero/${group}.webp`, width: 430 };
}

function button(href, title, variant) {
  return `<a class="button ${variant}" href="${href}">${title}${arrow}</a>`;
}

function renderLanding(locale, preview) {
  const text = copy[locale];
  const prefix = locale === 'ru' ? '/ru/' : '/';
  const web = `https://app.ultymylife.com/?lang=${locale}`;
  const telegram = telegramUrl(locale);
  const featureHref = route => `${prefix}${route}/${preview ? '?from=studio' : ''}`;
  const languageLinks = preview
    ? { ru: '/studio-preview/', en: '/studio-preview/en/' }
    : { ru: '/ru/', en: '/' };
  const productHunt = 'https://www.producthunt.com/products/ultymylife' +
    (preview ? '' : '?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-ultymylife-2-0');
  const { directory, width, height, smallWidth } = posterAssets[locale];
  const entries = sections.map(({ id, route, title, description }) => ({
    title: title[locale], description: description[locale], href: featureHref(route),
    src: `${directory}/${id}.webp`, small: `${directory}/${id}-${smallWidth}.webp`,
    width, height, smallWidth, alt: `${text.poster} «${title[locale]}»`,
  }));
  const [first] = entries;
  const phones = [['left', 'habits'], ['main', 'home'], ['right', 'mental']];
  return `<header class="topbar glass">
  <a class="brand" href="#top"><img src="/assets/brand-mark.png" alt="" width="27" height="27">UltyMyLife</a>
  <nav class="main-nav" aria-label="${text.navigation}">
    <a href="#product">${text.features}</a>
    <a href="#telegram">${text.start}</a>
  </nav>
  <div class="language" aria-label="${text.language}">
    ${Object.entries(languageLinks).map(([lang, href]) => `<a href="${href}" lang="${lang}"${lang === locale ? ' aria-current="page"' : ''}>${lang.toUpperCase()}</a>`).join('')}
  </div>
</header>
<main>
  <section class="hero" id="top">
    <div class="hero-copy" id="problem">
      <h1><span>${text.headline[0]}</span> <em>${text.headline[1]}</em></h1>
      <p>${text.intro}</p>
      <div class="hero-actions">
        ${button(telegram, text.heroTelegram, 'button-primary')}
        ${button(web, text.heroBrowser, 'button-secondary')}
      </div>
    </div>
    <div class="hero-media">
      ${phones.map(([position, group]) => {
        const screen = heroScreen(locale, group);
        return `<div class="uml-device hero-device hero-device-${position}">
        <span class="device-camera" aria-hidden="true"></span>
        <img src="${screen.src}" alt="${screen.title}" width="${screen.width}" height="${screen.height}"${position === 'main' ? ' fetchpriority="high"' : ' decoding="async"'}>
      </div>`;
      }).join('')}
    </div>
  </section>
  <section class="demo frame" id="product" aria-labelledby="gallery-title">
    <span id="solution" class="anchor-alias" aria-hidden="true"></span>
    <h2 id="gallery-title">${text.gallery}</h2>
    <nav class="demo-switcher" aria-label="${text.features}">
      ${entries.map((entry, index) => `<a href="${entry.href}" id="section-tab-${index}" data-module="${index}">${entry.title}</a>`).join('')}
    </nav>
    <div class="demo-scene" id="gallery-panel">
      <div class="demo-copy">
        <h3>${first.title}</h3>
        <p>${first.description}</p>
        <a class="demo-detail text-link" href="${first.href}">${text.detail}<span aria-hidden="true">→</span></a>
      </div>
      <a class="demo-poster" href="${first.src}" aria-label="${text.view}">
        <img src="${first.small}" srcset="${first.small} ${first.smallWidth}w, ${first.src} ${first.width}w" sizes="(max-width: 720px) calc(100vw - 40px), (max-width: 1000px) 52vw, 490px" width="${first.width}" height="${first.height}" alt="${first.alt}" loading="lazy" decoding="async">
        <span class="poster-expand" aria-hidden="true">⤢</span>
      </a>
    </div>
    <script type="application/json" id="showcase-entries">${JSON.stringify(entries)}</script>
  </section>
  <section class="start frame" id="telegram" aria-labelledby="start-title">
    <h2 id="start-title">${text.start}</h2>
    <ol id="journey">
      ${text.steps.map(([title, description], index) => `<li${index === 2 ? ' id="pilots"' : ''}><h3>${title}</h3><p>${description}</p></li>`).join('')}
    </ol>
  </section>
  <section class="final frame" aria-labelledby="final-title">
    <h2 id="final-title">${text.final}</h2>
    <div class="final-actions">
      ${button(telegram, text.telegram, 'button-primary')}
      ${button(web, text.web, 'button-secondary')}
    </div>
  </section>
</main>
<footer class="frame" id="contacts">
  <span id="partners" class="anchor-alias" aria-hidden="true"></span>
  <span id="status" class="anchor-alias" aria-hidden="true"></span>
  <span id="grants" class="anchor-alias" aria-hidden="true"></span>
  <nav aria-label="${text.extraNav}" id="audience">
    ${extraRoutes.map((route, index) => `<a href="${featureHref(route)}">${text.extras[index]}</a>`).join('')}
  </nav>
  <div class="footer-bottom">
    <span>© 2026 UltyMyLife</span>
    <nav aria-label="${text.footerNav}">
      <a href="${prefix}privacy">${text.privacy}</a>
      <a href="${prefix}terms">${text.terms}</a>
      <a href="https://t.me/demianworkself">${text.contact}</a>
      <a href="${productHunt}">Product Hunt</a>
    </nav>
  </div>
</footer>`;
}

const sharedHead = `<link rel="icon" href="/assets/favicon.png?v=bloom" type="image/png" sizes="64x64">
    <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" sizes="180x180">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="${fontUrl}" rel="stylesheet">
    <link rel="preload" href="/studio-preview/art/home.webp" as="image">
    <link rel="stylesheet" href="/assets/product/device.css?v=2">
    <link rel="stylesheet" href="/assets/product/landing.css?v=3">
    <link rel="stylesheet" href="/assets/product/infographic-viewer.css?v=1">
    <script type="module" src="/assets/product/landing.js?v=2"></script>`;

const legacyLanguage = (language, path) => `<script>
    if (new URLSearchParams(location.search).get("lang")?.toLowerCase() === "${language}") {
      location.replace("${path}" + location.search + location.hash);
    }
    </script>`;

async function generateHome(locale) {
  const file = resolve(root, locale === 'ru' ? 'ru/index.html' : 'index.html');
  const source = await readFile(file, 'utf8');
  const head = source.slice(0, source.indexOf('</head>')).trimEnd()
    .replace(/<!-- landing:assets -->[\s\S]*?<!-- \/landing:assets -->\s*/g, '')
    .replace(/^    <base href="\/" \/>\r?\n/m, '');
  await writeFile(file, `${head.trimEnd()}
    <!-- landing:assets -->
    ${locale === 'en' ? legacyLanguage('ru', '/ru/') + '\n    ' : ''}${sharedHead}
    <!-- /landing:assets -->
  </head>
  <body>
${renderLanding(locale, false)}
  </body>
</html>
`);
}

async function generatePreview(locale) {
  const folder = resolve(root, locale === 'ru' ? 'studio-preview' : 'studio-preview/en');
  await mkdir(folder, { recursive: true });
  await writeFile(resolve(folder, 'index.html'), `<!doctype html>
<html lang="${locale}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex,nofollow">
    <meta name="theme-color" content="#080a0b">
    <title>UltyMyLife</title>
    ${locale === 'ru' ? legacyLanguage('en', '/studio-preview/en/') + '\n    ' : ''}${sharedHead}
  </head>
  <body>
${renderLanding(locale, true)}
  </body>
</html>
`);
}

await Promise.all(['ru', 'en'].flatMap(locale => [generateHome(locale), generatePreview(locale)]));
console.log('Generated RU/EN landing pages and local studio previews.');
