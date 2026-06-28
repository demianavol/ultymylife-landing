(function () {
  const STORE_KEY = "ultymylife_lang";
  const SUPPORTED = new Set(["ru", "en"]);
  const pageCopy = {
    ru: {
      title: "UltyMyLife — система управления жизнью внутри Telegram",
      description:
        "Привычки, задачи, тренировки, дыхательные практики и ментальное здоровье в одном Telegram Mini App.",
    },
    en: {
      title: "UltyMyLife — life management inside Telegram",
      description:
        "Habits, tasks, workouts, breathing practices and mental fitness in one Telegram Mini App.",
    },
  };

  const en = {
    "Продукт": "Product",
    "Проблемы": "Problems",
    "Возможности": "Features",
    "Пилоты": "Pilots",
    "Слишком много приложений": "Too many apps",
    "Каждая сфера жизни живёт отдельно, а пользователь тратит энергию на переключение контекста.":
      "Every part of life sits in a separate app, so the user spends energy switching context.",
    "Подписка за базовые функции": "Subscriptions for basic features",
    "В одном сервисе привычки, в другом тренировки, в третьем медитации. В итоге приходится платить сразу за несколько простых инструментов.":
      "Habits live in one service, workouts in another, meditation in a third. The user ends up paying for several simple tools at once.",
    "Нужно скачивать и регистрироваться": "Downloads and sign-ups get in the way",
    "Каждый новый инструмент просит установку, аккаунт, уведомления и отдельный вход. До полезного действия пользователь часто просто не доходит.":
      "Every new tool asks for an install, an account, notifications and a separate login. Many users never reach the useful action.",
    "Прогресс не собирается в систему": "Progress never becomes a system",
    "Когда задачи, привычки, тренировки и восстановление живут отдельно, сложно увидеть общую картину дня и удержать дисциплину.":
      "When tasks, habits, workouts and recovery live separately, it is hard to see the full day and stay disciplined.",
    "Привычки": "Habits",
    "Ежедневные действия, серии, сферы жизни и понятный прогресс.":
      "Daily actions, streaks, life areas and clear progress.",
    "Задачи": "Tasks",
    "Планы, фокус дня и контроль выполнения без отдельного task manager.":
      "Plans, daily focus and completion tracking without a separate task manager.",
    "Тренировки": "Workouts",
    "Дневник нагрузок, история активности и быстрый обзор прогресса.":
      "Training log, activity history and a quick view of progress.",
    "Дыхание": "Breathing",
    "Практики восстановления, антистресса, медитации и баланса.":
      "Recovery, anti-stress, meditation and balance practices.",
    "Ментальный фитнес": "Mental fitness",
    "Счёт, память, логика и фокус как регулярная тренировка ума.":
      "Math, memory, logic and focus as regular mind training.",
    "Сон": "Sleep",
    "Режим, длительность и самочувствие для контроля восстановления.":
      "Schedule, duration and wellbeing for recovery control.",
    "AI-помощник": "AI assistant",
    "Подсказки и персональные сценарии для привычек, задач и восстановления.":
      "Prompts and personal scenarios for habits, tasks and recovery.",
    "Профиль": "Profile",
    "Метрики, цели и личная история прогресса собраны в одном аккуратном экране.":
      "Metrics, goals and personal progress history collected on one clean screen.",
    "Статистика": "Statistics",
    "Единая картина дисциплины, состояния и повседневных результатов.":
      "One picture of discipline, wellbeing and daily results.",
    "Вход за один клик": "One-click entry",
    "Mini App открывается прямо из бота или ссылки, без установки отдельного приложения.":
      "The Mini App opens directly from a bot or link, without installing a separate app.",
    "Напоминания рядом": "Reminders stay nearby",
    "Пуши и сообщения остаются в привычной Telegram-среде, где пользователь уже общается каждый день.":
      "Pushes and messages stay in the familiar Telegram environment where the user already talks every day.",
    "Рост через каналы": "Growth through channels",
    "Продукт удобно распространять через Telegram-каналы, чаты и тематические сообщества.":
      "The product is easy to distribute through Telegram channels, chats and niche communities.",
    "Челленджи и пилоты": "Challenges and pilots",
    "Можно быстро собрать группу, запустить привычку или тренировочный сценарий и получить обратную связь.":
      "You can quickly gather a group, launch a habit or workout scenario and collect feedback.",
    "Понятно разным рынкам": "Clear across markets",
    "Формат Telegram хорошо подходит для СНГ и международной аудитории без сложного onboarding.":
      "The Telegram format works well for CIS and international audiences without complex onboarding.",
    "Привычки и задачи": "Habits and tasks",
    "Для тех, кто хочет отслеживать, контролировать и анализировать ежедневные действия, планы и прогресс. Основные функции доступны бесплатно.":
      "For people who want to track, control and analyze daily actions, plans and progress. Core features are free.",
    "Спорт и здоровье": "Sport and health",
    "Тренировочный дневник, восстановление и динамика для спортсменов, тренеров и людей, которые следят за формой.":
      "Training diary, recovery and dynamics for athletes, coaches and people who care about fitness.",
    "Дыхание и медитации": "Breathing and meditation",
    "Практики дыхания под разные состояния: фокус, стресс, восстановление и первый опыт медитации.":
      "Breathing practices for different states: focus, stress, recovery and first meditation experience.",
    "Сон и интеллект": "Sleep and cognition",
    "Отслеживание сна для тех, у кого есть проблемы с режимом, плюс тренировка памяти, логики и внимания.":
      "Sleep tracking for people with schedule issues, plus memory, logic and attention training.",
    "Бесплатный тест": "Free test",
    "Проверить продукт на своей группе без входного бюджета.":
      "Test the product with your own group without an upfront budget.",
    "Челлендж для аудитории": "Audience challenge",
    "Запустить привычку, тренировку или wellness-сценарий под свой формат.":
      "Launch a habit, workout or wellness scenario in your own format.",
    "Обратная связь команды": "Team feedback",
    "Быстро обсудить результаты, идеи и нужные доработки.":
      "Quickly discuss results, ideas and needed improvements.",
    "Раннее партнёрство": "Early partnership",
    "Зайти в продукт до масштабирования и предложить свой сценарий.":
      "Join before scaling and suggest your own use case.",
    "Рабочий продукт внутри Telegram, который можно открыть без установки.":
      "A working product inside Telegram that opens without installation.",
    "Основные модули": "Core modules",
    "Привычки, задачи, тренировки, дыхание, ментальный фитнес, сон и профиль.":
      "Habits, tasks, workouts, breathing, mental fitness, sleep and profile.",
    "Обратная связь": "Feedback",
    "Собираем первые сценарии использования и улучшаем новую версию продукта.":
      "We collect first usage scenarios and improve the next product version.",
    "Отдельное приложение": "Standalone app",
    "Вынести продукт за пределы Telegram для пользователей, которым нужен самостоятельный app.":
      "Take the product beyond Telegram for users who need a standalone app.",
    "Отдельный сайт": "Standalone website",
    "Сделать полноценную веб-точку входа для продукта, партнёров и международной аудитории.":
      "Build a full web entry point for the product, partners and international audience.",
    "Зарубежные рынки": "International markets",
    "Адаптировать продукт под зарубежные страны, языки и каналы распространения.":
      "Adapt the product for foreign markets, languages and distribution channels.",
    "Смежные приложения": "Adjacent apps",
    "Начать сотрудничество с wellness, fitness, productivity и health-tech продуктами.":
      "Start partnerships with wellness, fitness, productivity and health-tech products.",
    "Полноценная компания": "Full-scale company",
    "Собрать команду, партнёрства и операционную модель для масштабирования.":
      "Build the team, partnerships and operating model for scale.",
    "Гранты и акселераторы": "Grants and accelerators",
    "Поддержка для ускорения разработки, продуктовых экспериментов и выхода на пилоты.":
      "Support for faster development, product experiments and pilot launches.",
    "Пилотные группы": "Pilot groups",
    "Команды и сообщества, готовые протестировать Telegram-native wellbeing систему.":
      "Teams and communities ready to test a Telegram-native wellbeing system.",
    "Эксперты по запуску": "Launch experts",
    "Нужны люди, которые помогут с продуктом, рынком, AI, B2B-продажами и выходом к первым партнёрам.":
      "We need people who can help with product, market, AI, B2B sales and first partner access.",
    "Pre-seed партнёры": "Pre-seed partners",
    "Ранние партнёры, которым интересен рынок productivity и mental fitness.":
      "Early partners interested in the productivity and mental fitness market.",
    "Главный экран": "Home screen",
    "Вся жизнь в одном месте": "Your life in one place",
    "Ежедневные ритуалы": "Daily rituals",
    "Задачи под контролем": "Tasks under control",
    "Дневник тренировок": "Training diary",
    "Восстановление": "Recovery",
    "Дыхание и баланс": "Breathing and balance",
    "Раздел ум": "Mind section",
    "Качество сна": "Sleep quality",
    "Единая точка входа в привычки, задачи, восстановление, сон, тренировки и ментальный фитнес.":
      "One entry point for habits, tasks, recovery, sleep, workouts and mental fitness.",
    "Пользователь видит систему целиком, а не набор разрозненных инструментов.":
      "The user sees the whole system, not a set of disconnected tools.",
    "профиль и метрики": "profile and metrics",
    "разделы по сферам жизни": "sections by life area",
    "быстрый доступ к AI-ready меню": "quick access to an AI-ready menu",
    "Трекинг ежедневных действий по сферам жизни: здоровье, развитие, продуктивность и личные ритуалы.":
      "Daily action tracking by life area: health, growth, productivity and personal rituals.",
    "Помогает удерживать маленькие действия, из которых складывается дисциплина.":
      "Helps keep the small actions that compound into discipline.",
    "серии и прогресс": "streaks and progress",
    "сферы жизни": "life areas",
    "чек-ин без лишних экранов": "check-in without extra screens",
    "Создание, отслеживание и выполнение задач рядом с привычками и личными целями.":
      "Create, track and complete tasks next to habits and personal goals.",
    "Задачи не отрываются от общего состояния дня и личного прогресса.":
      "Tasks stay connected to the day state and personal progress.",
    "статус выполнения": "completion status",
    "категории задач": "task categories",
    "быстрый дневной обзор": "quick daily overview",
    "Календарь, история нагрузки и быстрый обзор активности для фитнес-аудитории и тренеров.":
      "Calendar, workload history and a quick activity overview for fitness users and coaches.",
    "Тренировки становятся частью общей системы самоуправления, а не отдельным дневником.":
      "Workouts become part of the full self-management system, not a separate diary.",
    "история нагрузок": "workload history",
    "календарь активности": "activity calendar",
    "контроль выполненных тренировок": "completed workout control",
    "Дыхание, медитации и закаливание собраны в одном разделе для ежедневного баланса.":
      "Breathing, meditation and cold exposure live in one section for daily balance.",
    "Wellness-сценарии работают рядом с задачами и тренировками, а не в отдельном приложении.":
      "Wellness scenarios work next to tasks and workouts, not in a separate app.",
    "дыхательные сессии": "breathing sessions",
    "медитации": "meditations",
    "антистресс-практики": "anti-stress practices",
    "Счёт, память, логика и фокус как отдельные упражнения для тренировки ума.":
      "Math, memory, logic and focus as separate exercises for training the mind.",
    "Продукт выходит за рамки habit tracker и закрывает направление mental fitness.":
      "The product goes beyond a habit tracker and covers mental fitness.",
    "память и логика": "memory and logic",
    "фокус и реакция": "focus and reaction",
    "очки и рекорды": "points and records",
    "Режим, длительность и самочувствие в понятном календарном интерфейсе.":
      "Schedule, duration and wellbeing in a clear calendar interface.",
    "Восстановление измеряется не абстрактно, а через регулярные отметки и динамику.":
      "Recovery is measured through regular check-ins and dynamics, not vague feelings.",
    "календарь сна": "sleep calendar",
    "оценка самочувствия": "wellbeing rating",
    "последние 7 дней": "last 7 days",
    "Открыть в Telegram": "Open in Telegram",
    "Пользователь заходит через бота или ссылку, без App Store, установки и регистрации в новом сервисе.":
      "The user enters through a bot or link, without App Store, installation or registration in a new service.",
    "Выбрать фокус дня": "Choose the daily focus",
    "Привычки, задачи, тренировка, дыхание или ментальная тренировка становятся понятным дневным сценарием.":
      "Habits, tasks, workout, breathing or mental training become a clear daily scenario.",
    "Отмечать прогресс": "Mark progress",
    "Мини-интерфейс даёт быстрый чек-ин, серии, статусы и визуальную обратную связь.":
      "The mini interface gives fast check-ins, streaks, statuses and visual feedback.",
    "Запустить пилот": "Launch a pilot",
    "Тренер, HR или Telegram-канал может собрать группу и проверить вовлечение на живой аудитории.":
      "A coach, HR team or Telegram channel can gather a group and test engagement with a live audience.",
    "Основная навигация": "Main navigation",
    "Открыть Mini App": "Open Mini App",
    "UltyMyLife — система управления жизнью ": "UltyMyLife — life management ",
    "внутри Telegram": "inside Telegram",
    "система": "life",
    "управления": "management",
    "жизнью": "system",
    "Привычки, задачи, тренировки, дыхательные практики и ментальное здоровье в одном Telegram Mini App. Без лишних приложений.":
      "Habits, tasks, workouts, breathing practices and mental fitness in one Telegram Mini App. No extra apps.",
    "Переключить экран приложения": "Switch app screen",
    "Переключи экран продукта": "Switch product screen",
    "Смотреть демо": "View demo",
    "Демонстрация продукта": "Product demo",
    "Живой продукт внутри Telegram": "A live product inside Telegram",
    "Показываем реальные сценарии Mini App: привычки, задачи, тренировки, дыхание, сон и ментальный фитнес открываются прямо в Telegram без установки отдельного приложения.":
      "We show real Mini App scenarios: habits, tasks, workouts, breathing, sleep and mental fitness open directly in Telegram without installing a separate app.",
    "Экраны UltyMyLife": "UltyMyLife screens",
    "Нажимай на модули": "Tap the modules",
    "Проблема": "Problem",
    "Боль: всё разрознено": "The pain: everything is fragmented",
    "Привычки в одном приложении, задачи в другом, тренировки в третьем, дыхание и медитации — где-то ещё. Чем больше инструментов, тем сложнее удерживать систему.":
      "Habits are in one app, tasks in another, workouts in a third, breathing and meditation somewhere else. The more tools, the harder it is to keep a system.",
    "Решение": "Solution",
    "Всё в Telegram": "Everything in Telegram",
    "UltyMyLife объединяет базовые инструменты самоуправления прямо внутри Telegram: привычки, задачи, тренировки, дыхание, сон, AI-подсказки, профиль и статистику.":
      "UltyMyLife brings core self-management tools into Telegram: habits, tasks, workouts, breathing, sleep, AI prompts, profile and statistics.",
    "Бот": "Bot",
    "точка входа": "entry point",
    "Каналы": "Channels",
    "охват аудитории": "audience reach",
    "Напоминания": "Reminders",
    "возврат в продукт": "product return",
    "Челленджи": "Challenges",
    "групповая вовлечённость": "group engagement",
    "Почему Telegram Mini App": "Why Telegram Mini App",
    "Пользователю не нужно скачивать отдельное приложение. UltyMyLife открывается внутри Telegram и использует привычные механики: бота, напоминания, каналы, челленджи и комьюнити.":
      "The user does not need to download a separate app. UltyMyLife opens inside Telegram and uses familiar mechanics: bot, reminders, channels, challenges and community.",
    "Сегодня 3 фокуса: вода, тренировка и дыхание. Открыть Mini App?":
      "Today has 3 focuses: water, workout and breathing. Open the Mini App?",
    "Да, открыть Mini App": "Yes, open Mini App",
    "Mini App внутри Telegram": "Mini App inside Telegram",
    "Механика роста в Telegram": "Growth mechanics in Telegram",
    "Через эти каналы пользователь заходит, возвращается и участвует в групповых сценариях.":
      "Through these channels, the user enters, returns and joins group scenarios.",
    "Как это работает": "How it works",
    "Из ссылки в Telegram — в ежедневную систему": "From a Telegram link to a daily system",
    "Аудитория": "Audience",
    "Кому полезно": "Who it helps",
    "UltyMyLife закрывает повседневные сценарии самоконтроля: привычки, задачи, тренировки, дыхание, интеллект и сон в одном удобном месте.":
      "UltyMyLife covers daily self-control scenarios: habits, tasks, workouts, breathing, cognition and sleep in one convenient place.",
    "Открыты к предложениям": "Open to proposals",
    "Ищем инвесторов, партнёров, пилотные группы, заинтересованных пользователей и людей с идеями по развитию продукта.":
      "We are looking for investors, partners, pilot groups, interested users and people with product ideas.",
    "Пилот помогает быстро проверить продукт на живой аудитории, собрать обратную связь и собрать сценарии для масштабирования.":
      "A pilot helps test the product with a live audience, collect feedback and find scenarios for scaling.",
    "Обсудить пилот": "Discuss a pilot",
    "Написать основателю": "Message the founder",
    "Партнёр получает": "Partner gets",
    "Статус": "Status",
    "Дорожная карта": "Roadmap",
    "Показываем, что уже реализовано в продукте и какие шаги нужны для роста в отдельное приложение, сайт, международный рынок и полноценную компанию.":
      "We show what is already implemented and what steps are needed to grow into a standalone app, website, international market and full-scale company.",
    "Уже реализовано": "Already built",
    "Планы роста": "Growth plans",
    "Экраны продукта": "Product screens",
    "Рост": "Growth",
    "Что мы ищем": "What we are looking for",
    "UltyMyLife ищет грантовую поддержку, акселераторы, менторов, пилотные аудитории и партнёров для масштабирования продукта.":
      "UltyMyLife is looking for grants, accelerators, mentors, pilot audiences and partners to scale the product.",
    "Попробуйте UltyMyLife или обсудите партнёрство": "Try UltyMyLife or discuss a partnership",
    "Мы строим Telegram-native систему для привычек, тренировок, дыхания и ментального фитнеса.":
      "We are building a Telegram-native system for habits, workouts, breathing and mental fitness.",
    "Скачать pitch deck": "Download pitch deck",
  };

  const originals = new WeakMap();
  const originalAttrs = new WeakMap();
  let currentLang = "ru";
  let applying = false;

  function normalizedLang(value) {
    return SUPPORTED.has(value) ? value : null;
  }

  function getInitialLang() {
    const urlLang = normalizedLang(new URLSearchParams(window.location.search).get("lang"));
    if (urlLang) return urlLang;
    const savedLang = normalizedLang(localStorage.getItem(STORE_KEY));
    if (savedLang) return savedLang;
    return navigator.language && navigator.language.toLowerCase().startsWith("ru") ? "ru" : "en";
  }

  function translateValue(value) {
    const direct = en[value];
    if (direct) return direct;
    const match = value.match(/^(.+) в UltyMyLife$/);
    if (match && en[match[1]]) return `${en[match[1]]} in UltyMyLife`;
    return null;
  }

  function translateTextNode(node) {
    if (!node.nodeValue || !node.nodeValue.trim()) return;
    const parent = node.parentElement;
    if (!parent || parent.closest("[data-i18n-ignore]")) return;
    if (/^(SCRIPT|STYLE|NOSCRIPT|SVG)$/.test(parent.tagName)) return;

    if (currentLang === "ru") {
      const original = originals.get(node);
      if (original) node.nodeValue = original;
      return;
    }

    const raw = originals.get(node) || node.nodeValue;
    const trimmed = raw.trim();
    const translated = translateValue(trimmed);
    if (!translated) return;
    originals.set(node, raw);
    node.nodeValue = raw.replace(trimmed, translated);
  }

  function translateAttributes(element) {
    const attrs = ["aria-label", "alt", "title", "placeholder"];
    let stored = originalAttrs.get(element);

    if (currentLang === "ru") {
      if (!stored) return;
      attrs.forEach((attr) => {
        if (stored[attr] != null) element.setAttribute(attr, stored[attr]);
      });
      return;
    }

    attrs.forEach((attr) => {
      const value = stored && stored[attr] ? stored[attr] : element.getAttribute(attr);
      if (!value) return;
      const translated = translateValue(value.trim());
      if (!translated) return;
      if (!stored) {
        stored = {};
        originalAttrs.set(element, stored);
      }
      stored[attr] = value;
      element.setAttribute(attr, value.replace(value.trim(), translated));
    });
  }

  function fixStandaloneLinks(root) {
    root.querySelectorAll('a[href="/ultymylife/deck.pdf"]').forEach((link) => {
      link.setAttribute("href", "deck.pdf");
    });
  }

  function walk(root) {
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) translateTextNode(walker.currentNode);
    if (root.nodeType === Node.ELEMENT_NODE) {
      translateAttributes(root);
      root.querySelectorAll("[aria-label], [alt], [title], [placeholder]").forEach(translateAttributes);
      fixStandaloneLinks(root);
    }
  }

  function updateHead() {
    const copy = pageCopy[currentLang];
    document.documentElement.lang = currentLang;
    document.title = copy.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", copy.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", copy.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", copy.description);
  }

  function updateSwitch() {
    document.querySelectorAll("[data-lang-option]").forEach((button) => {
      const active = button.dataset.langOption === currentLang;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  }

  function applyLang(lang) {
    currentLang = lang;
    localStorage.setItem(STORE_KEY, lang);
    updateHead();
    applying = true;
    walk(document.body);
    applying = false;
    updateSwitch();
  }

  function addSwitch() {
    if (document.querySelector(".uml-lang-switch")) return;
    const headerRow = document.querySelector("header > div");
    if (!headerRow) return;
    const cta = headerRow.querySelector('a[href*="UltyMyLife_bot"]');
    const html =
      '<div class="uml-lang-switch" data-i18n-ignore role="group" aria-label="Language">' +
      '<button type="button" data-lang-option="ru" aria-pressed="false">RU</button>' +
      '<button type="button" data-lang-option="en" aria-pressed="false">EN</button>' +
      "</div>";
    if (cta) cta.insertAdjacentHTML("beforebegin", html);
    else headerRow.insertAdjacentHTML("beforeend", html);
    headerRow.querySelector(".uml-lang-switch")?.addEventListener("click", (event) => {
      const button = event.target.closest("[data-lang-option]");
      if (!button) return;
      applyLang(button.dataset.langOption);
    });
  }

  function addStyles() {
    if (document.getElementById("uml-i18n-style")) return;
    document.head.insertAdjacentHTML(
      "beforeend",
      '<style id="uml-i18n-style">' +
        ".uml-lang-switch{display:inline-flex;align-items:center;gap:2px;margin-left:auto;margin-right:.55rem;border:1px solid rgba(255,255,255,.14);border-radius:999px;background:rgba(255,255,255,.055);padding:3px;backdrop-filter:blur(18px)}" +
        ".uml-lang-switch button{min-width:34px;height:30px;border-radius:999px;color:rgba(255,255,255,.62);font:800 12px/1 Inter,Manrope,system-ui,sans-serif;letter-spacing:0;background:transparent;transition:background .18s ease,color .18s ease}" +
        ".uml-lang-switch button.is-active{background:linear-gradient(135deg,#61f4ff,#3aa7ff);color:#02060c}" +
        "@media(max-width:640px){.uml-lang-switch{margin-right:.4rem}.uml-lang-switch button{min-width:31px;height:28px;font-size:11px}}" +
        "</style>",
    );
  }

  function init() {
    currentLang = getInitialLang();
    addStyles();
    addSwitch();
    applyLang(currentLang);
    const observer = new MutationObserver(() => {
      if (applying) return;
      applying = true;
      addSwitch();
      walk(document.body);
      applying = false;
      updateSwitch();
    });
    observer.observe(document.body, { childList: true, subtree: true, characterData: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
