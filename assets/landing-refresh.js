(function () {
  "use strict";

  const LINKS = {
    ru: "https://t.me/UltyMyLife_bot/umlminiapp?startapp=lang_ru",
    en: "https://t.me/UltyMyLife_bot/umlminiapp",
  };

  const MEDIA = [
    { keys: ["привычки", "habits"], video: "/assets/product/habits.mp4", ru: "/assets/product/habits.jpg", en: "/assets/product/en/habits.png" },
    { keys: ["задачи", "tasks"], video: "/assets/product/tasks.mov", ru: "/assets/product/tasks.jpg", en: "/assets/product/en/tasks.png" },
    { keys: ["тренировки", "workouts"], video: "/assets/product/training.mov", ru: "/assets/product/training.jpg", en: "/assets/product/en/training.png" },
    { keys: ["дыхание", "восстановление", "breathing", "recovery"], video: "/assets/product/recovery.mp4", ru: "/assets/product/recovery.jpg", en: "/assets/product/en/recovery.png" },
    { keys: ["ментальный фитнес", "ум", "mental fitness", "mind"], video: "/assets/product/mental.mp4", ru: "/assets/product/mental.jpg", en: "/assets/product/en/mental.png" },
    { keys: ["сон", "sleep"], video: "/assets/product/sleep.mp4", ru: "/assets/product/sleep.jpg", en: "/assets/product/en/sleep.png" },
    { keys: ["ai-помощник", "ai assistant", "профиль", "profile", "статистика", "statistics"], video: "/assets/product/home.mov", ru: "/assets/product/home.jpg", en: "/assets/product/en/home.png" },
  ];

  const COPY = {
    ru: {
      nav: ["Продукт", "Проблема", "Возможности", "Как работает", "Попробовать"],
      heroTitle: 'Соберите день<br>в одной системе <span>внутри Telegram</span>',
      heroText: "Привычки, задачи, тренировки, восстановление, сон и развитие ума — рядом каждый день. Ничего скачивать не нужно.",
      sections: {
        problem: ["Знакомая проблема", "Слишком много приложений — слишком мало ясности", "Когда планы, здоровье и прогресс разбросаны по разным сервисам, поддерживать ритм становится сложнее."],
        solution: ["Всё в одном месте", "Выберите, что хотите улучшить", "Откройте любой раздел, посмотрите его в действии и начните пользоваться прямо в Telegram."],
        telegram: ["Прямо в Telegram", "Начните там, где уже проводите каждый день", "Бот напомнит о важном, а Mini App откроет все инструменты одним нажатием — без новой регистрации и установки."],
        audience: ["Для вашего ритма", "Подстройте систему под себя", "Начните с одной цели: держать фокус, больше двигаться, лучше спать или спокойнее восстанавливаться."],
        pilots: ["Попробуйте вместе", "Запустите UltyMyLife для себя или своей команды", "Проверьте продукт в реальной жизни и поделитесь тем, чего вам не хватает."],
        status: ["Уже работает", "Продукт развивается вместе с пользователями", "Основные разделы, сайт и две языковые версии уже доступны. Следующие шаги строим на вашей обратной связи."],
        grants: ["Дальше — больше", "Помогите сделать UltyMyLife полезнее", "Ищем сообщества, экспертов и партнёров, которые хотят вместе улучшать ежедневный опыт пользователей."],
      },
      cards: [
        ["Привычки", "Закрепляйте полезные действия и замечайте прогресс каждый день."],
        ["Задачи", "Соберите планы на день и удерживайте главное перед глазами."],
        ["Тренировки", "Записывайте нагрузку и наблюдайте, как растёт ваша форма."],
        ["Восстановление", "Снижайте напряжение с дыханием, медитацией и прогулками."],
        ["Ментальный фитнес", "Тренируйте память, логику, скорость и концентрацию."],
        ["Сон", "Отслеживайте режим и находите ритм, после которого больше сил."],
        ["AI‑помощник", "Получайте понятные подсказки на основе вашего дня и целей."],
        ["Профиль", "Храните цели, показатели и личный прогресс в одном месте."],
        ["Статистика", "Смотрите общую картину и понимайте, что действительно работает."],
      ],
      try: "Попробовать в Telegram",
      close: "Закрыть",
      watch: "Посмотреть раздел",
      fallback: "Видео не загрузилось, но раздел уже можно открыть в Telegram.",
      proof: "Интерфейс внутри Telegram",
      telegramIntro: "UltyMyLife — всё для развития в одном месте. Привычки и задачи, тренировки и сон, восстановление и развитие ума.",
      telegramReminder: "⏰ Пора проверить привычки",
      openMini: "Открыть Mini App",
      bot: "UltyMyLife: привычки • задачи",
      completed: "Уже реализовано",
      plans: "Следующие шаги",
      doneItems: [
        ["Telegram Mini App", "Открывается прямо внутри Telegram без установки."],
        ["Основные разделы", "Привычки, задачи, тренировки, восстановление, ум, сон и профиль."],
        ["Отдельный сайт", "Полноценная точка входа для пользователей и партнёров уже работает."],
        ["Русская и английская версии", "Продукт и сайт готовы для пользователей из разных стран."],
      ],
      planItems: [
        ["Отдельное приложение", "Версия вне Telegram для тех, кому нужен самостоятельный app."],
        ["Новые интеграции", "Связь с wellness, fitness и productivity‑сервисами."],
        ["Рост продукта", "Больше сценариев, партнёрств и возможностей для пользователей."],
      ],
      finalTitle: "Попробуйте собрать свой день в UltyMyLife",
      finalText: "Начните с привычек, задач или тренировок. Остальное подключите, когда будет нужно.",
      finalCta: "Открыть UltyMyLife",
      pilotTitle: "Попробуйте UltyMyLife в своём ритме",
      pilotText: "Откройте Mini App, выберите один раздел и проживите с ним неделю. Так проще понять, что действительно помогает именно вам.",
      pilotSteps: [["1", "Выберите одну цель"], ["2", "Пользуйтесь 7 дней"], ["3", "Посмотрите свой прогресс"]],
      pilotCta: "Открыть Mini App",
    },
    en: {
      nav: ["Product", "Why it’s hard", "Features", "How it works", "Try it"],
      heroTitle: 'Bring your day<br>together <span>inside Telegram</span>',
      heroText: "Habits, tasks, workouts, recovery, sleep and mind training — always within reach. Nothing new to install.",
      sections: {
        problem: ["A familiar problem", "Too many apps. Not enough clarity.", "When plans, health and progress live in separate tools, staying consistent takes more effort than it should."],
        solution: ["Everything together", "Choose what you want to improve", "Open any section, see it in action and start using it right inside Telegram."],
        telegram: ["Built into Telegram", "Start where you already spend your day", "The bot brings you back to what matters, while the Mini App opens every tool in one tap — no new account or install."],
        audience: ["Made for your rhythm", "Shape the system around you", "Start with one goal: stay focused, move more, sleep better or recover with less stress."],
        pilots: ["Try it together", "Use UltyMyLife solo or with your community", "Put the product into your real routine and tell us what would make it better."],
        status: ["Available now", "Built with real user feedback", "Core sections, the website and two language versions are live. Your experience guides what comes next."],
        grants: ["Help it grow", "Make UltyMyLife more useful", "We welcome communities, experts and partners who want to improve everyday wellbeing with us."],
      },
      cards: [
        ["Habits", "Make useful actions stick and see your progress every day."],
        ["Tasks", "Bring today’s plans together and keep your priorities visible."],
        ["Workouts", "Log your training and watch your strength build over time."],
        ["Recovery", "Lower stress with breathing, meditation and mindful walks."],
        ["Mental fitness", "Train memory, logic, speed and focus in short sessions."],
        ["Sleep", "Track your rhythm and learn what helps you wake up with energy."],
        ["AI assistant", "Get clear suggestions based on your goals and daily activity."],
        ["Profile", "Keep goals, metrics and personal progress in one place."],
        ["Statistics", "See the full picture and learn what actually works for you."],
      ],
      try: "Try in Telegram",
      close: "Close",
      watch: "See this section",
      fallback: "The video could not load, but you can already try this section in Telegram.",
      proof: "Works inside Telegram",
      telegramIntro: "UltyMyLife brings your growth tools together: habits and tasks, workouts and sleep, recovery and mind training.",
      telegramReminder: "⏰ Time to check your habits",
      openMini: "Open Mini App",
      bot: "UltyMyLife: habits • tasks",
      completed: "Already live",
      plans: "What’s next",
      doneItems: [
        ["Telegram Mini App", "Opens right inside Telegram with nothing to install."],
        ["Core sections", "Habits, tasks, workouts, recovery, mind, sleep and profile."],
        ["Standalone website", "A complete entry point for users and partners is live."],
        ["English and Russian", "The product and website already support both audiences."],
      ],
      planItems: [
        ["Standalone app", "An option beyond Telegram for people who want a dedicated app."],
        ["New integrations", "Connections with wellness, fitness and productivity services."],
        ["Product growth", "More useful scenarios, partnerships and user tools."],
      ],
      finalTitle: "Bring your day together with UltyMyLife",
      finalText: "Start with habits, tasks or workouts. Add everything else when you need it.",
      finalCta: "Open UltyMyLife",
      pilotTitle: "Try UltyMyLife at your own pace",
      pilotText: "Open the Mini App, choose one section and use it for a week. You’ll quickly see what genuinely helps you.",
      pilotSteps: [["1", "Choose one goal"], ["2", "Use it for 7 days"], ["3", "See your progress"]],
      pilotCta: "Open Mini App",
    },
  };

  const lang = () => (location.pathname.startsWith("/ru") ? "ru" : "en");
  const text = (node, value) => { if (node && value && node.textContent !== value) node.textContent = value; };
  const content = () => COPY[lang()];
  const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

  function mediaFor(title) {
    const normalized = title.toLowerCase().replace(/‑/g, "-").trim();
    const item = MEDIA.find((entry) => entry.keys.some((key) => normalized.includes(key)));
    const fallback = MEDIA[6];
    const selected = item || fallback;
    return { video: selected.video, poster: selected[lang()] };
  }

  function setSectionCopy(id, values) {
    const section = document.getElementById(id);
    if (!section) return;
    const heading = section.querySelector("h2");
    const eyebrow = heading?.previousElementSibling;
    const paragraph = heading?.nextElementSibling;
    text(eyebrow, values[0]);
    text(heading, values[1]);
    text(paragraph, values[2]);
  }

  function refreshNavigation() {
    const c = content();
    const header = document.querySelector("header");
    if (!header) return;
    const brand = header.querySelector("a");
    if (brand) {
      const value = brand.textContent.trim();
      if (value.includes("UltyMyLife")) brand.textContent = "UltyMyLife";
    }
    const navTargets = ["product", "problem", "solution", "journey", "contacts"];
    header.querySelectorAll("nav a").forEach((link, index) => {
      text(link, c.nav[index]);
      const target = navTargets[index];
      if (target) link.setAttribute("href", `${lang() === "ru" ? "/ru/" : "/"}#${target}`);
    });
  }

  function refreshHero() {
    const c = content();
    const hero = document.getElementById("top");
    const copy = hero?.querySelector(".hero-copy");
    const heading = copy?.querySelector("h1");
    const paragraph = heading?.nextElementSibling;
    if (heading) heading.innerHTML = c.heroTitle;
    paragraph?.remove();
    const heroBadges = lang() === "ru"
      ? [["Привычки", "/ru/habits/"], ["Тренировки", "/ru/workouts/"], ["Дыхание", "/ru/breathing-meditation/"], ["Тренировка ума", "/ru/mental-fitness/"], ["ИИ-подсказки", "/ru/ai-assistant/"], ["Сон", "/ru/sleep/"]]
      : [["Habits", "/habits/"], ["Workouts", "/workouts/"], ["Breathing", "/breathing-meditation/"], ["Mental fitness", "/mental-fitness/"], ["AI assistant", "/ai-assistant/"], ["Sleep", "/sleep/"]];
    hero?.querySelectorAll(".hero-badges span").forEach((badge, index) => {
      const item = heroBadges[index];
      if (!item) return;
      const link = document.createElement("a");
      link.className = "hero-topic-link";
      link.href = item[1];
      link.textContent = item[0];
      badge.replaceWith(link);
    });

    let phBadge = copy?.querySelector(".hero-ph-badge");
    if (!phBadge && copy) {
      phBadge = document.createElement("div");
      phBadge.className = "hero-ph-badge";
      phBadge.dataset.i18nIgnore = "true";
      phBadge.innerHTML = `<a href="https://www.producthunt.com/products/ultymylife?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-ultymylife-2-0" target="_blank" rel="noopener noreferrer"><img alt="UltyMyLife 2.0 - Habits, tasks, workouts, sleep, mind, recovery &amp; AI insights | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1236379&amp;theme=dark&amp;t=1788081201734"></a>`;
      const ctaRow = copy.querySelector(".mt-9");
      const switcher = copy.querySelector(".hero-screen-switcher");
      const badges = copy.querySelector(".hero-badges");
      if (ctaRow) {
        ctaRow.after(phBadge);
      } else if (switcher) {
        switcher.before(phBadge);
      } else if (badges) {
        badges.after(phBadge);
      } else {
        copy.appendChild(phBadge);
      }
    }
  }

  function stopHeroMotion() {
    const hero = document.getElementById("top");
    if (!hero) return;
    const stage = hero.querySelector(".hero-device-stage");
    stage?.classList.add("hero-device-static");
    hero.querySelectorAll(".hero-shot,.floating-card,.hero-ring").forEach((node) => node.classList.add("hero-decoration-static"));
  }

  function refreshEnglishMedia() {
    if (lang() !== "en") return;
    const replacements = {
      "home.jpg": "home.png", "habits.jpg": "habits.png", "tasks.jpg": "tasks.png",
      "training.jpg": "training.png", "recovery.jpg": "recovery.png",
      "mental.jpg": "mental.png", "sleep.jpg": "sleep.png",
    };
    document.querySelectorAll('img[src*="/product/"], video[poster*="/product/"]').forEach((element) => {
      const attr = element.tagName === "VIDEO" ? "poster" : "src";
      const source = element.getAttribute(attr) || "";
      const name = Object.keys(replacements).find((key) => source.endsWith(key));
      const replacement = name ? `/assets/product/en/${replacements[name]}` : "";
      if (replacement && source !== replacement) element.setAttribute(attr, replacement);
      if (element.tagName === "IMG") {
        element.loading = "lazy";
        element.decoding = "async";
      }
    });
  }

  const PRODUCT_COPY = {
    ru: {
      "Главный экран": ["Ваш день с первого взгляда", "Сразу видите привычки, задачи, тренировки и восстановление — без переходов между приложениями.", "Выберите, чему уделить внимание сегодня, и вернитесь к этому в один тап.", ["всё важное на одном экране", "быстрый переход к нужному разделу", "ваш прогресс всегда рядом"]],
      "Привычки": ["Действия, которые становятся системой", "Добавляйте полезные привычки, отмечайте выполнение и сохраняйте серии без лишних таблиц.", "Начните с одного простого действия и наблюдайте, как растёт регулярность.", ["понятные серии", "гибкие цели", "быстрая отметка выполнения"]],
      "Задачи": ["Главное на сегодня — перед глазами", "Соберите планы, выделите приоритеты и отмечайте выполненное прямо рядом с привычками.", "Меньше переключений — больше внимания тому, что важно сейчас.", ["фокус дня", "статусы задач", "быстрый обзор недели"]],
      "Тренировки": ["Видите не только занятие, но и прогресс", "Записывайте тренировки, нагрузку и активность, чтобы сохранять ритм без сложного дневника.", "История помогает понять, где вы стали сильнее и когда нужен отдых.", ["календарь тренировок", "история нагрузки", "динамика активности"]],
      "Восстановление": ["Быстрый способ вернуть спокойствие", "Выберите дыхание, медитацию или прогулку под своё состояние и свободное время.", "Короткие практики помогают сделать паузу именно тогда, когда она нужна.", ["дыхательные практики", "медитации", "осознанные прогулки"]],
      "Ментальный фитнес": ["Короткая тренировка для внимания и памяти", "Развивайте скорость, логику, память и концентрацию через небольшие игровые упражнения.", "Несколько минут в день легче встроить в график и сохранить регулярность.", ["память и логика", "скорость реакции", "личные результаты"]],
      "Сон": ["Понимайте, какой режим даёт больше сил", "Отмечайте длительность и качество сна, чтобы увидеть закономерности своего самочувствия.", "Календарь покажет, когда режим помогает восстановлению, а когда сбивается.", ["длительность сна", "оценка качества", "история по дням"]],
    },
    en: {
      "Home screen": ["Your day at a glance", "See habits, tasks, workouts and recovery together — without jumping between apps.", "Choose what matters today and return to it in one tap.", ["everything on one screen", "quick section access", "progress always visible"]],
      "Habits": ["Turn small actions into a system", "Add useful habits, check them off and keep streaks without complicated tracking.", "Start with one simple action and watch consistency grow.", ["clear streaks", "flexible goals", "one-tap check-ins"]],
      "Tasks": ["Keep today’s priorities visible", "Bring plans together, choose what matters and complete tasks next to your habits.", "Less switching means more attention for what matters now.", ["daily focus", "task statuses", "weekly overview"]],
      "Workouts": ["See progress beyond a single workout", "Log sessions, workload and activity without maintaining a complicated diary.", "Your history shows where you improved and when it is time to recover.", ["training calendar", "workload history", "activity trends"]],
      "Recovery": ["A quick way back to balance", "Choose breathing, meditation or a mindful walk for your current state and available time.", "Short practices make it easier to pause exactly when you need it.", ["breathing practices", "meditations", "mindful walks"]],
      "Mental fitness": ["Short training for memory and focus", "Build speed, logic, memory and concentration through quick game-like exercises.", "A few minutes fits into your day and makes consistency easier.", ["memory and logic", "reaction speed", "personal results"]],
      "Sleep": ["Learn which rhythm gives you energy", "Track sleep duration and quality to discover patterns in how you feel.", "The calendar shows when your routine supports recovery and when it slips.", ["sleep duration", "quality score", "daily history"]],
    },
  };

  function refreshDynamicProduct() {
    refreshEnglishMedia();
    const tabs = document.querySelectorAll(".product-tab");
    const tabCopy = lang() === "ru" ? [
      ["Главный экран", "Обзор дня"], ["Привычки", "Ежедневный ритм"], ["Задачи", "Фокус дня"],
      ["Тренировки", "Дневник тренировок"], ["Дыхание и медитации", "Практики восстановления"],
      ["Ментальный фитнес", "Тренировка ума"], ["Сон", "Качество сна"],
    ] : [
      ["Home screen", "Overview"], ["Habits", "Daily rhythm"], ["Tasks", "Daily focus"],
      ["Workouts", "Training diary"], ["Recovery", "Recovery practices"],
      ["Mental fitness", "Mind training"], ["Sleep", "Sleep quality"],
    ];
    tabs.forEach((tab, index) => {
      text(tab.querySelector(".product-tab-title"), tabCopy[index]?.[0]);
      text(tab.querySelector(".product-tab-text"), tabCopy[index]?.[1]);
    });
    const activeTab = document.querySelector(".product-tab.is-active");
    const activeIndex = Array.from(tabs).indexOf(activeTab);
    const activeTitle = tabCopy[activeIndex]?.[0];
    const values = Object.values(PRODUCT_COPY[lang()])[activeIndex];
    const panel = document.querySelector(".product-feature-panel");
    if (!values || !panel) return;
    const copy = panel.querySelector(".product-feature-copy");
    copy?.classList.add("uml-product-copy-clean");
    const heading = copy?.querySelector("h3");
    const paragraphs = copy?.querySelectorAll(":scope > p");
    text(heading, activeTitle);
    paragraphs?.forEach((paragraph) => paragraph.remove());
    copy?.querySelector("div:first-child")?.remove();
    copy?.querySelector(".mt-6")?.remove();
    let summary = copy?.querySelector(".uml-product-summary");
    if (!summary && copy) {
      summary = document.createElement("p");
      summary.className = "uml-product-summary";
      heading?.after(summary);
    }
    text(summary, values[1]);
    document.querySelectorAll(".hero-module-button,.product-tab,.hero-real-phone-button").forEach((button) => {
      if (button.dataset.umlDynamicReady) return;
      button.dataset.umlDynamicReady = "true";
      button.addEventListener("click", scheduleProductRefresh);
    });
  }

  let lastTrigger = null;
  function closeModal() {
    const modal = document.querySelector(".uml-feature-modal");
    if (!modal) return;
    const video = modal.querySelector("video");
    if (video) { video.pause(); video.removeAttribute("src"); video.load(); }
    modal.remove();
    document.body.classList.remove("uml-modal-open");
    lastTrigger?.focus();
  }

  function openModal(feature, trigger) {
    closeModal();
    const c = content();
    const media = mediaFor(feature.title);
    lastTrigger = trigger;
    const modal = document.createElement("div");
    modal.className = "uml-feature-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-labelledby", "uml-modal-title");
    modal.dataset.i18nIgnore = "true";
    modal.innerHTML = `<div class="uml-modal-backdrop" data-modal-close></div>
      <div class="uml-modal-panel">
        <button class="uml-modal-close" type="button" data-modal-close aria-label="${c.close}">×</button>
        <div class="uml-modal-media"><div class="uml-modal-poster-bg" style="background-image:url('${media.poster}')"></div><video poster="${media.poster}" muted loop playsinline preload="metadata"></video><p class="uml-video-fallback">${c.fallback}</p></div>
        <div class="uml-modal-copy"><p class="uml-modal-kicker">${c.watch}</p><h2 id="uml-modal-title">${feature.title}</h2><p>${feature.text}</p>
        <a class="uml-modal-cta" href="${LINKS[lang()]}" target="_blank" rel="noreferrer">${c.try}<span aria-hidden="true">↗</span></a></div>
      </div>`;
    document.body.appendChild(modal);
    document.body.classList.add("uml-modal-open");
    const video = modal.querySelector("video");
    video.addEventListener("error", () => modal.classList.add("is-video-fallback"), { once: true });
    video.addEventListener("loadeddata", () => modal.classList.remove("is-video-fallback"));
    video.src = media.video;
    if (!reducedMotion()) video.play().catch(() => {});
    modal.querySelectorAll("[data-modal-close]").forEach((button) => button.addEventListener("click", closeModal));
    modal.querySelector(".uml-modal-close").focus();
  }

  function refreshFeatureCards() {
    const c = content();
    const section = document.getElementById("solution");
    const cards = section?.querySelectorAll(".feature-card");
    const featurePaths = [
      "habits", "tasks", "workouts", "breathing-meditation", "mental-fitness", "sleep",
      "ai-assistant", "personal-progress", "progress-analytics",
    ];
    if (!cards?.length) return;
    cards.forEach((card, index) => {
      const feature = c.cards[index];
      const slug = featurePaths[index];
      if (!feature) return;
      const heading = card.querySelector("h3");
      const paragraph = heading?.nextElementSibling;
      text(heading, feature[0]);
      text(paragraph, feature[1]);
      card.setAttribute("role", "link");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `${c.watch}: ${feature[0]}`);
      card.dataset.featurePath = `/${lang() === "ru" ? "ru/" : ""}${slug}/`;
      if (card.dataset.umlReady) return;
      card.dataset.umlReady = "true";
      card.addEventListener("click", () => { location.href = card.dataset.featurePath; });
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          location.href = card.dataset.featurePath;
        }
      });
    });
  }

  function refreshProductProof() {
    const c = content();
    document.querySelectorAll(".product-floating-proof span").forEach((node) => text(node, c.proof));
  }

  function refreshTelegram() {
    const section = document.getElementById("telegram");
    const grid = section?.querySelector(".grid.gap-5");
    const old = grid?.children?.[1];
    if (!old || old.classList.contains("uml-telegram-preview")) return;
    const c = content();
    const preview = document.createElement("div");
    preview.className = "uml-telegram-preview";
    preview.dataset.i18nIgnore = "true";
    preview.innerHTML = `<div class="uml-chat-wallpaper">
      <div class="uml-chat-header"><span class="uml-chat-back">‹</span><div><strong>${c.bot}</strong><small>${lang() === "ru" ? "бот" : "bot"}</small></div><span class="uml-chat-avatar">◉</span></div>
      <div class="uml-chat-intro"><strong>${lang() === "ru" ? "Что умеет этот бот?" : "What can this bot do?"}</strong><p>${c.telegramIntro}</p><small>${lang() === "ru" ? "Основные функции бесплатны. Открывается прямо в Telegram." : "Core features are free. Opens right inside Telegram."}</small></div>
      <span class="uml-chat-date">${lang() === "ru" ? "сегодня" : "today"}</span>
      <div class="uml-chat-reminder">${c.telegramReminder}<time>12:10</time></div>
      <a href="${LINKS[lang()]}" target="_blank" rel="noreferrer" class="uml-chat-open"><span>▣</span>${c.openMini}</a>
    </div>`;
    old.replaceWith(preview);
  }

  function roadmapCard(title, description, isNext = false) {
    if (isNext) return `<div class="uml-roadmap-item"><span aria-hidden="true">&#8599;</span><div><h3>${title}</h3><p>${description}</p></div></div>`;
    return `<div class="uml-roadmap-item"><span aria-hidden="true">✓</span><div><h3>${title}</h3><p>${description}</p></div></div>`;
  }

  function refreshRoadmap() {
    const section = document.getElementById("status");
    const grid = section?.querySelector(".grid.gap-5");
    if (!grid || grid.dataset.umlReady) return;
    const c = content();
    grid.dataset.umlReady = "true";
    grid.innerHTML = `<div class="uml-roadmap-column is-done"><p class="uml-roadmap-label">${c.completed}</p>${c.doneItems.map((item) => roadmapCard(item[0], item[1])).join("")}</div>
      <div class="uml-roadmap-column is-next"><p class="uml-roadmap-label">${c.plans}</p>${c.planItems.map((item) => roadmapCard(item[0], item[1], true)).join("")}</div>`;
  }

  function refreshFinalCta() {
    const c = content();
    const final = document.querySelector(".final-cta");
    if (!final) return;
    final.classList.add("uml-final-line");
    final.dataset.i18nIgnore = "true";
    final.innerHTML = `<h2>${c.finalTitle}</h2><a class="primary-button" href="${LINKS[lang()]}" target="_blank" rel="noreferrer">${c.finalCta}<span aria-hidden="true">&#8599;</span></a>`;
    return;
    const heading = final.querySelector("h2");
    text(heading?.previousElementSibling, lang() === "ru" ? "Начните сегодня" : "Start today");
    const paragraph = heading?.nextElementSibling;
    text(heading, c.finalTitle);
    paragraph?.remove();
    const links = final.querySelectorAll("a");
    links.forEach((link) => {
      if (/deck\.pdf/i.test(link.getAttribute("href") || "")) link.remove();
      else if ((link.getAttribute("href") || "").includes("UltyMyLife_bot")) {
        link.setAttribute("href", LINKS[lang()]);
        const nodes = Array.from(link.childNodes).filter((node) => node.nodeType === Node.TEXT_NODE);
        if (nodes[0]) nodes[0].nodeValue = c.finalCta;
      }
    });
  }

  function refreshPilots() {
    const grid = document.querySelector("#pilots .grid.gap-5");
    if (!grid || grid.classList.contains("uml-pilot-experience")) return;
    const c = content();
    grid.className = "uml-pilot-experience";
    grid.dataset.i18nIgnore = "true";
    grid.innerHTML = `<div class="uml-pilot-main"><span class="uml-pilot-badge">7 ${lang() === "ru" ? "дней" : "days"}</span><h3>${c.pilotTitle}</h3><p>${c.pilotText}</p><a href="${LINKS[lang()]}" target="_blank" rel="noreferrer" class="uml-pilot-cta">${c.pilotCta}<span>↗</span></a></div><div class="uml-pilot-steps">${c.pilotSteps.map(([number, label]) => `<div><span>${number}</span><strong>${label}</strong></div>`).join("")}</div>`;
  }

  function refreshJourney() {
    const grid = document.querySelector(".journey-grid");
    if (!grid) return;
    grid.classList.add("uml-journey-compact");
    const titles = lang() === "ru" ? ["Откройте Mini App", "Выберите один фокус", "Отмечайте действие", "Смотрите результат"] : ["Open the Mini App", "Choose one focus", "Check in daily", "See your progress"];
    const descriptions = lang() === "ru" ? ["Один тап из Telegram — без установки и новой регистрации.", "Начните с привычки, задачи, тренировки или восстановления.", "Быстрая отметка занимает несколько секунд.", "Серии и статистика показывают, что помогает вам двигаться дальше."] : ["One tap from Telegram — no install or new account.", "Start with a habit, task, workout or recovery practice.", "A quick check-in takes only a few seconds.", "Streaks and stats reveal what helps you keep going."];
    grid.querySelectorAll(".journey-card").forEach((card, index) => { text(card.querySelector("h3"), titles[index]); text(card.querySelector("p"), descriptions[index]); });
  }

  const COMPACT_CARDS = {
    ru: {
      problem: [
        ["Всё в разных местах", "Планы, здоровье и прогресс приходится собирать по нескольким приложениям."],
        ["Лишние подписки", "Простые функции разбросаны по платным сервисам."],
        ["Сложный старт", "Установка и новые аккаунты мешают начать прямо сейчас."],
        ["Нет общей картины", "Трудно понять, что помогает вам двигаться вперёд."],
      ],
      audience: [
        ["Фокус и порядок", "Привычки и задачи рядом — легче удерживать главное."],
        ["Движение и форма", "Тренировки, нагрузка и восстановление в одной истории."],
        ["Спокойствие", "Дыхание и медитации для паузы в нужный момент."],
        ["Сон и внимание", "Режим сна, память, логика и концентрация."],
      ],
      grants: [
        ["Акселераторы", "Помогают быстрее проверять и развивать продукт."],
        ["Пилотные группы", "Пробуют UltyMyLife в реальной жизни."],
        ["Эксперты", "Усиливают продукт, AI и выход на рынок."],
        ["Партнёры", "Помогают масштабировать полезные сценарии."],
      ],
    },
    en: {
      problem: [
        ["Everything is scattered", "Plans, health and progress live across several apps."],
        ["Too many subscriptions", "Basic tools are split between paid services."],
        ["Too much setup", "Downloads and new accounts get in the way of starting."],
        ["No complete picture", "It is hard to see what truly moves you forward."],
      ],
      audience: [
        ["Focus and order", "Keep habits and tasks together so priorities stay clear."],
        ["Movement and fitness", "See workouts, load and recovery in one history."],
        ["Calm", "Use breathing and meditation when you need a pause."],
        ["Sleep and attention", "Connect sleep, memory, logic and focus."],
      ],
      grants: [
        ["Accelerators", "Help test and develop the product faster."],
        ["Pilot groups", "Try UltyMyLife in real life."],
        ["Experts", "Strengthen product, AI and go-to-market."],
        ["Partners", "Help scale useful everyday scenarios."],
      ],
    },
  };

  function refreshCompactCards() {
    Object.entries(COMPACT_CARDS[lang()]).forEach(([sectionId, items]) => {
      document.querySelectorAll(`#${sectionId} > .grid.gap-4 > div`).forEach((card, index) => {
        text(card.querySelector("h3"), items[index]?.[0]);
        text(card.querySelector("p"), items[index]?.[1]);
      });
    });
  }

  function removeSectionDescriptions() {
    ["problem", "product", "solution", "telegram", "audience", "pilots", "status", "grants"].forEach((id) => {
      document.querySelector(`#${id} > .mb-10.max-w-3xl > p.mt-5`)?.remove();
    });
  }

  function refreshFooter() {
    const footer = document.querySelector("footer");
    const inner = footer?.firstElementChild;
    if (!inner) return;
    const ru = lang() === "ru";
    inner.className = "uml-footer-refined";
    inner.dataset.i18nIgnore = "true";
    inner.innerHTML = `<div class="uml-footer-meta"><span>© 2026 UltyMyLife</span><div class="uml-footer-ph-badge"><a href="https://www.producthunt.com/products/ultymylife?embed=true&amp;utm_source=badge-featured&amp;utm_medium=badge&amp;utm_campaign=badge-ultymylife-2-0" target="_blank" rel="noopener noreferrer"><img alt="UltyMyLife 2.0 - Habits, tasks, workouts, sleep, mind, recovery &amp; AI insights | Product Hunt" width="250" height="54" src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1236379&amp;theme=dark&amp;t=1788081201734"></a></div><nav class="uml-legal-links" aria-label="${ru ? "Правовые документы" : "Legal"}"><a href="${ru ? "/ru/privacy" : "/privacy"}">${ru ? "Конфиденциальность" : "Privacy"}</a><a href="${ru ? "/ru/terms" : "/terms"}">${ru ? "Условия" : "Terms"}</a></nav></div>`;
  }

  function refreshRemainingLabels() {
    const replacements = lang() === "ru" ? {
      "Life OS": "Вся жизнь в одном месте",
      "Focus day": "Фокус дня",
      "Training diary": "Дневник тренировок",
      "Recovery": "Восстановление",
      "Mind training": "Тренировка ума",
      "Sleep quality": "Качество сна",
      "Start now": "Начните сегодня",
      "visual proof": "Экраны продукта",
      "Telegram-native interface": "Интерфейс внутри Telegram",
      "Команды и сообщества, готовые протестировать Telegram-native wellbeing систему.": "Для команд и сообществ, которые хотят вместе укреплять полезные привычки и видеть общий прогресс.",
      "Telegram Mini App for habits, training and mental fitness": "Привычки, задачи, тренировки и восстановление прямо в Telegram",
    } : {
      "Telegram Mini App for habits, training and mental fitness": "Habits, tasks, workouts and recovery — right inside Telegram",
    };
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const value = node.nodeValue?.trim();
      if (value && replacements[value]) node.nodeValue = node.nodeValue.replace(value, replacements[value]);
    }
  }

  function refreshAll() {
    if (!document.getElementById("top") || document.body.dataset.umlRefreshReady) return false;
    document.body.dataset.umlRefreshReady = "true";
    document.body.classList.add("uml-refreshed", "uml-low-glow", "uml-performance");
    stopHeroMotion();
    const c = content();
    refreshNavigation();
    refreshHero();
    Object.entries(c.sections).forEach(([id, values]) => setSectionCopy(id, values));
    refreshFeatureCards();
    refreshProductProof();
    refreshEnglishMedia();
    refreshTelegram();
    refreshRoadmap();
    refreshFinalCta();
    refreshPilots();
    refreshJourney();
    refreshCompactCards();
    removeSectionDescriptions();
    refreshRemainingLabels();
    refreshFooter();
    document.querySelectorAll("img").forEach((image) => { image.loading = "lazy"; image.decoding = "async"; });
    return true;
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.querySelector(".uml-feature-modal")) closeModal();
  });

  let productRefreshQueued = false;
  function scheduleProductRefresh() {
    if (productRefreshQueued) return;
    productRefreshQueued = true;
    requestAnimationFrame(() => {
      productRefreshQueued = false;
      refreshDynamicProduct();
    });
  }
  function initializeRefresh(attempt = 0) {
    if (refreshAll()) {
      requestAnimationFrame(refreshDynamicProduct);
      return;
    }
    if (attempt < 100) setTimeout(() => initializeRefresh(attempt + 1), 50);
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => initializeRefresh());
  else initializeRefresh();

  const root = document.getElementById("root");
  if (root && window.MutationObserver) {
    const observer = new MutationObserver(() => {
      if (!document.body.dataset.umlRefreshReady && document.getElementById("top")) {
        initializeRefresh();
      }
    });
    observer.observe(root, { childList: true, subtree: true });
  }
})();
