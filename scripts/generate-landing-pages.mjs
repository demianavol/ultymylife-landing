import { writeFile } from 'node:fs/promises';
import { SITE, featurePath, telegramUrl } from './seo-content.mjs';

const groups = [
  ['habits', 'tasks'],
  ['workouts', 'sleep', 'breathing-meditation', 'mental-fitness'],
  ['personal-progress', 'progress-analytics', 'ai-assistant'],
];

const copy = {
  en: {
    title: 'UltyMyLife — self-development in one place',
    description: 'Habits, tasks, workouts, sleep, stress relief and AI insights in one Telegram Mini App.',
    applicationDescription: 'Habits, tasks, workouts, sleep, recovery and mental fitness in one Telegram Mini App.',
    socialImage: '/assets/product/en/home.png',
    heading: ['Habits, plans and progress', 'in one place'],
    intro: 'Plan your day, build routines and see how you’re doing over time. All inside Telegram.',
    navigation: ['How it works', 'Features', 'FAQ'],
    navLabel: 'Main navigation',
    launch: 'Open in Telegram',
    explore: 'Explore the app',
    skip: 'Skip to content',
    heroAlt: 'UltyMyLife home screen with sections for habits, tasks, sleep, workouts and recovery',
    scenariosHeading: 'Make it part of your day',
    scenarios: [
      ['Plan your day', 'Put the important things first', 'Set priorities for today, check off tasks and keep your daily habits in view.', 'tasks', 'The task planner in UltyMyLife'],
      ['Take care of yourself', 'Find a rhythm that works for you', 'Log workouts and sleep, take a breathing break or fit in a short mental fitness session.', 'sleep', 'The sleep tracker in UltyMyLife'],
      ['See your progress', 'See how your routines add up', 'Review your activity and patterns over time, and use the AI assistant to reflect on what you track.', 'home', 'The UltyMyLife home screen with metrics and access to the AI assistant'],
    ],
    featuresHeading: 'Find the tools you need',
    features: {
      habits: ['Habits', 'Daily routines and streaks'],
      tasks: ['Tasks', 'Plans and priorities for today'],
      workouts: ['Workouts', 'Training log and activity history'],
      sleep: ['Sleep', 'Duration, notes and consistency'],
      'breathing-meditation': ['Breathing and meditation', 'Short practices to pause and reset'],
      'mental-fitness': ['Mental fitness', 'Exercises for memory, focus and logic'],
      'personal-progress': ['Personal progress', 'An overview of your daily activity'],
      'progress-analytics': ['Progress analytics', 'Patterns across the things you track'],
      'ai-assistant': ['AI assistant', 'Prompts based on the data you track'],
    },
    startHeading: 'Get started in Telegram',
    start: [
      ['Open the Mini App', 'Tap the button on a device with Telegram.'],
      ['Choose a section', 'Start with a habit, a task or whatever you want to track today.'],
    ],
    faq: [
      ['Do I need to install anything?', 'UltyMyLife opens inside Telegram. There’s no separate app to install.'],
      ['Do I need to use every section?', 'You can start with any one section and add others when you need them.'],
      ['Is UltyMyLife free?', 'The core features are free.'],
    ],
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',
    language: 'Language',
  },
  ru: {
    title: 'UltyMyLife — всё для развития в одном месте',
    description: 'Привычки, задачи, тренировки, сон, антистресс-практики и ИИ-анализ в одном Telegram Mini App.',
    socialDescription: 'Основные функции бесплатны. Приложение открывается прямо в Telegram.',
    applicationDescription: 'Привычки, задачи, тренировки, сон, восстановление и развитие ума в одном Telegram Mini App.',
    socialImage: '/assets/product/home.jpg',
    heading: ['Привычки, планы и прогресс —', 'в одном месте'],
    intro: 'Планируйте день, отмечайте привычки и следите за своим прогрессом прямо в Telegram.',
    navigation: ['Как работает', 'Возможности', 'FAQ'],
    navLabel: 'Главное меню',
    launch: 'Открыть в Telegram',
    explore: 'Посмотреть приложение',
    skip: 'Перейти к содержимому',
    heroAlt: 'Главный экран UltyMyLife с разделами привычек, задач, сна, тренировок и восстановления',
    scenariosHeading: 'UltyMyLife в вашем дне',
    scenarios: [
      ['Спланировать день', 'Выберите главное на сегодня', 'Расставьте приоритеты, отмечайте сделанное и держите ежедневные привычки под рукой.', 'tasks', 'Планировщик задач в UltyMyLife'],
      ['Позаботиться о себе', 'Найдите свой ритм', 'Записывайте тренировки и сон, делайте паузы на дыхание или выделите несколько минут на тренировку ума.', 'sleep', 'Трекер сна в UltyMyLife'],
      ['Увидеть прогресс', 'Замечайте, что меняется со временем', 'Следите за активностью, ищите закономерности и используйте ИИ-помощника, чтобы осмыслить то, что отслеживаете.', 'home', 'Главный экран UltyMyLife с метриками и входом в ИИ-помощник'],
    ],
    featuresHeading: 'Выберите, с чего начать',
    features: {
      habits: ['Привычки', 'Ежедневные действия и серии'],
      tasks: ['Задачи', 'Планы и приоритеты на день'],
      workouts: ['Тренировки', 'Дневник и история занятий'],
      sleep: ['Сон', 'Длительность, заметки и режим'],
      'breathing-meditation': ['Дыхание и медитации', 'Короткие практики для паузы и отдыха'],
      'mental-fitness': ['Ментальный фитнес', 'Упражнения на память, внимание и логику'],
      'personal-progress': ['Личный прогресс', 'Обзор ежедневной активности'],
      'progress-analytics': ['Аналитика прогресса', 'Закономерности в ваших записях'],
      'ai-assistant': ['ИИ-помощник', 'Подсказки на основе того, что вы отслеживаете'],
    },
    startHeading: 'Начните прямо в Telegram',
    start: [
      ['Откройте Mini App', 'Нажмите кнопку на устройстве, где есть Telegram.'],
      ['Выберите раздел', 'Добавьте первую привычку, задачу или то, за чем хотите следить сегодня.'],
    ],
    faq: [
      ['Нужно ли что-то устанавливать?', 'UltyMyLife открывается внутри Telegram. Отдельное приложение устанавливать не нужно.'],
      ['Обязательно пользоваться всеми разделами?', 'Можно начать с любого раздела и подключать остальные по мере необходимости.'],
      ['UltyMyLife бесплатный?', 'Основные функции бесплатны.'],
    ],
    privacy: 'Конфиденциальность',
    terms: 'Условия',
    contact: 'Связаться',
    language: 'Язык',
  },
};

function screenshot(locale, screen, alt, eager = false) {
  const base = `/assets/product/landing/${locale}/${screen}`;
  const sizes = eager ? '(max-width: 720px) 230px, 300px' : '(max-width: 720px) 180px, 230px';
  const height = screen === 'home' ? 1280 : 1384;
  return `<img src="${base}-640.webp" srcset="${base}-360.webp 360w, ${base}-640.webp 640w"
            sizes="${sizes}" width="640" height="${height}" alt="${alt}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
}

function renderLanding(locale) {
  const c = copy[locale];
  const home = locale === 'ru' ? '/ru/' : '/';
  const enUrl = SITE.origin + '/';
  const ruUrl = SITE.origin + '/ru/';
  const appUrl = telegramUrl(locale);
  const launch = (kind = 'primary') => `<a class="button button--${kind}" href="${appUrl}">${c.launch} <span aria-hidden="true">↗</span></a>`;
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': enUrl + '#organization', name: SITE.name, url: enUrl, logo: SITE.origin + '/assets/logo.jpg' },
      { '@type': 'WebSite', '@id': enUrl + '#website', name: SITE.name, url: enUrl, publisher: { '@id': enUrl + '#organization' }, inLanguage: ['en', 'ru'] },
      { '@type': 'SoftwareApplication', '@id': enUrl + '#app', name: SITE.name, applicationCategory: 'LifestyleApplication', operatingSystem: 'Telegram', url: appUrl, description: c.applicationDescription },
    ],
  };
  const tabs = c.scenarios.map(([label], i) =>
    `<button type="button" id="scenario-tab-${i}" data-scenario-tab>${label}</button>`).join('\n            ');
  const panels = c.scenarios.map(([label, heading, description, screen, alt], i) => {
    const links = groups[i].map(slug => `<a href="${featurePath(slug, locale)}">${c.features[slug][0]} <span aria-hidden="true">↗</span></a>`);
    return `<article class="scenario-panel tone-${i}" id="scenario-${i}" data-scenario-panel>
          <div class="scenario-copy">
            <p class="scenario-label">${label}</p>
            <h3>${heading}</h3>
            <p>${description}</p>
            <div class="scenario-links">${links.join('')}</div>
          </div>
          <div class="scenario-media">${screenshot(locale, screen, alt)}</div>
        </article>`;
  }).join('\n        ');
  const cards = groups.map((group, i) => group.map(slug => {
    const [name, detail] = c.features[slug];
    return `<li><a class="feature-card tone-${i}" href="${featurePath(slug, locale)}">
            <span class="feature-dot" aria-hidden="true"></span><span><strong>${name}</strong><small>${detail}</small></span><span class="feature-arrow" aria-hidden="true">↗</span>
          </a></li>`;
  }).join('\n          ')).join('\n          ');
  const faq = c.faq.map(([question, answer]) =>
    `<details><summary>${question}</summary><p>${answer}</p></details>`).join('\n          ');
  const steps = c.start.map(([title, detail]) =>
    `<li><strong>${title}</strong><p>${detail}</p></li>`).join('\n            ');

  return `<!doctype html>
<!-- Generated by scripts/generate-landing-pages.mjs. -->
<html lang="${locale}">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${c.title}</title>
    <meta name="description" content="${c.description}">
    <meta name="theme-color" content="#11171c">
    <link rel="canonical" href="${SITE.origin + home}">
    <link rel="alternate" hreflang="en" href="${enUrl}">
    <link rel="alternate" hreflang="ru" href="${ruUrl}">
    <link rel="alternate" hreflang="x-default" href="${enUrl}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${c.title}">
    <meta property="og:description" content="${c.socialDescription ?? c.description}">
    <meta property="og:image" content="${SITE.origin + c.socialImage}">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="${SITE.origin + c.socialImage}">
    <link rel="icon" href="/assets/logo.jpg">
    <link rel="stylesheet" href="/assets/site.css?v=1">
    <link rel="stylesheet" href="/assets/landing.css?v=1">
    <script type="application/ld+json">${JSON.stringify(structuredData)}</script>
    <script src="/assets/landing.js?v=1" defer></script>
  </head>
  <body class="landing">
    <a class="skip-link" href="#main">${c.skip}</a>
    <header class="landing-header shell" id="top">
      <a class="site-brand" href="${home}"><img src="/assets/logo.jpg" width="34" height="34" alt="">UltyMyLife</a>
      <nav class="landing-nav" aria-label="${c.navLabel}">
        <a href="#product">${c.navigation[0]}</a>
        <a href="#solution">${c.navigation[1]}</a>
        <a href="#faq">${c.navigation[2]}</a>
      </nav>
      <div class="header-actions">
        <nav class="languages" aria-label="${c.language}">
          <a href="/" hreflang="en" lang="en"${locale === 'en' ? ' aria-current="page"' : ''}>EN</a>
          <a href="/ru/" hreflang="ru" lang="ru"${locale === 'ru' ? ' aria-current="page"' : ''}>RU</a>
        </nav>
        ${launch('quiet')}
      </div>
    </header>

    <main id="main">
      <section class="hero shell" id="problem" aria-labelledby="hero-title">
        <div class="hero-copy">
          <p class="hero-label">Telegram Mini App</p>
          <h1 id="hero-title">${c.heading[0]} <span>${c.heading[1]}</span></h1>
          <p class="hero-intro">${c.intro}</p>
          <div class="hero-actions">
            ${launch()}
            <a class="explore-link" href="#product">${c.explore} <span aria-hidden="true">↓</span></a>
          </div>
        </div>
        <figure class="hero-media">
          <div class="hero-frame">${screenshot(locale, 'home', c.heroAlt, true)}</div>
        </figure>
      </section>

      <section class="section shell" id="product" aria-labelledby="scenarios-title">
        <span id="audience"></span>
        <h2 id="scenarios-title">${c.scenariosHeading}</h2>
        <div class="scenarios" data-scenarios>
          <div class="scenario-tabs" data-scenario-tabs aria-labelledby="scenarios-title" hidden>
            ${tabs}
          </div>
          ${panels}
        </div>
      </section>

      <section class="section shell" id="solution" aria-labelledby="features-title">
        <h2 id="features-title">${c.featuresHeading}</h2>
        <ul class="feature-grid">
          ${cards}
        </ul>
      </section>

      <section class="section shell" id="telegram" aria-labelledby="start-title">
        <div class="start-panel" id="pilots">
          <div>
            <h2 id="start-title">${c.startHeading}</h2>
            ${launch()}
          </div>
          <ol class="start-steps">
            ${steps}
          </ol>
        </div>
      </section>

      <section class="section faq shell" id="faq" aria-labelledby="faq-title">
        <h2 id="faq-title"><span id="status">FAQ</span></h2>
        <div class="faq-list">
          ${faq}
        </div>
      </section>
    </main>

    <footer class="landing-footer shell" id="contacts">
      <span id="partners"></span><span id="grants"></span>
      <div class="footer-brand"><a class="site-brand" href="${home}"><img src="/assets/logo.jpg" width="34" height="34" alt="">UltyMyLife</a><small>© 2026 UltyMyLife</small></div>
      <div class="footer-links">
        <a href="${home}privacy">${c.privacy}</a>
        <a href="${home}terms">${c.terms}</a>
        <a href="https://t.me/demianworkself">${c.contact}</a>
        <a href="https://www.producthunt.com/products/ultymylife?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-ultymylife-2-0">Product Hunt <span aria-hidden="true">↗</span></a>
      </div>
    </footer>
  </body>
</html>
`;
}

await Promise.all(Object.keys(copy).map(locale => {
  const path = locale === 'ru' ? '../ru/index.html' : '../index.html';
  return writeFile(new URL(path, import.meta.url), renderLanding(locale), 'utf8');
}));
