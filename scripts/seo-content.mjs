export const SITE = {
  origin: 'https://ultymylife.com',
  name: 'UltyMyLife',
  telegram: {
    en: 'https://t.me/UltyMyLife_bot/umlminiapp',
    ru: 'https://t.me/UltyMyLife_bot/umlminiapp?startapp=lang_ru',
  },
};

const faq = (en, ru) => ({ en, ru });

export const FEATURES = [
  {
    slug: 'habits', image: { en: '/assets/product/en/habits.png', ru: '/assets/product/recovery.jpg' },
    en: {
      name: 'Habit tracker', title: 'Habit tracker in Telegram — build routines that stick | UltyMyLife',
      description: 'Track daily habits, streaks and progress inside Telegram. Build useful routines without installing another habit tracker app.',
      eyebrow: 'Daily habits without another app',
      lead: 'Turn the actions you want to repeat into a clear daily rhythm. UltyMyLife keeps habits, streaks and life areas together inside Telegram.',
      benefits: ['Create habits for health, learning or productivity', 'See today’s actions and current streaks at a glance', 'Mark progress where you already communicate every day'],
      how: 'Open the Mini App, add one action you want to repeat and check it off each day. Your habit history stays next to tasks, workouts, sleep and recovery.',
      faq: [
        faq('Do I need a separate habit tracker app?', 'Нужно ли отдельное приложение для привычек?'),
        faq('No. The tracker opens as a Telegram Mini App, so there is nothing else to install.', 'Нет. Трекер открывается как Mini App внутри Telegram — ничего дополнительно устанавливать не нужно.'),
        faq('Can I track different areas of life?', 'Можно вести привычки для разных сфер жизни?'),
        faq('Yes. Group daily actions around health, growth, productivity and your own priorities.', 'Да. Ежедневные действия можно распределять по здоровью, развитию, продуктивности и своим направлениям.'),
      ],
    },
    ru: {
      name: 'Трекер привычек', title: 'Трекер привычек в Telegram — серии и прогресс | UltyMyLife',
      description: 'Отслеживайте привычки, серии и ежедневный прогресс прямо в Telegram. Формируйте полезные действия без отдельного приложения.',
      eyebrow: 'Полезные привычки рядом каждый день',
      lead: 'Превратите нужные действия в понятный ежедневный ритм. UltyMyLife объединяет привычки, серии и сферы жизни прямо внутри Telegram.',
      benefits: ['Создавайте привычки для здоровья, развития и продуктивности', 'Сразу видите действия на сегодня и текущие серии', 'Отмечайте прогресс там, где уже общаетесь каждый день'],
      how: 'Откройте Mini App, добавьте одно действие и отмечайте выполнение каждый день. История привычки будет рядом с задачами, тренировками, сном и восстановлением.',
      faq: [],
    },
  },
  {
    slug: 'tasks', image: { en: '/assets/product/en/tasks.png', ru: '/assets/product/habits.jpg' },
    en: {
      name: 'Task planner', title: 'Task planner in Telegram — organize your day | UltyMyLife',
      description: 'Plan tasks, choose priorities and track completion in a Telegram Mini App. Keep today’s focus beside your habits and goals.',
      eyebrow: 'A calmer way to plan today',
      lead: 'Collect plans in one clear view, choose what matters now and stop carrying unfinished tasks in your head.',
      benefits: ['Separate work, home and personal priorities', 'See what is active, planned or completed', 'Keep tasks connected to habits and personal goals'],
      how: 'Add a task, choose its group and deadline, then return to a short daily view. UltyMyLife helps you focus on the next useful action instead of a crowded list.',
      faq: [faq('Can I use it as a daily planner?', 'Можно использовать как планировщик дня?'), faq('Yes. The task screen is designed around today’s priorities and completion status.', 'Да. Экран задач построен вокруг приоритетов на сегодня и статусов выполнения.')],
    },
    ru: {
      name: 'Планировщик задач', title: 'Планировщик задач в Telegram — фокус на день | UltyMyLife',
      description: 'Планируйте задачи, выбирайте приоритеты и отмечайте выполнение в Telegram Mini App. Держите фокус дня рядом с привычками и целями.',
      eyebrow: 'Планы на день без перегруженного списка',
      lead: 'Соберите задачи в одном понятном экране, выберите главное и перестаньте держать незавершённые дела в голове.',
      benefits: ['Разделяйте работу, дом и личные приоритеты', 'Видите задачи в работе, в планах и выполненные', 'Связывайте дела с привычками и личными целями'],
      how: 'Добавьте задачу, выберите категорию и срок, а затем возвращайтесь к короткому обзору дня. UltyMyLife помогает видеть следующий важный шаг, а не бесконечный список.',
      faq: [],
    },
  },
  {
    slug: 'workouts', image: { en: '/assets/product/en/training.png', ru: '/assets/product/training.jpg' },
    en: {
      name: 'Workout diary', title: 'Workout diary in Telegram — log training progress | UltyMyLife',
      description: 'Keep a workout diary, training calendar and activity history inside Telegram. See consistency and progress without a separate fitness log.',
      eyebrow: 'Your training history in one view',
      lead: 'Record workouts while the details are fresh, see active days in the calendar and keep momentum visible between sessions.',
      benefits: ['Log workouts and training duration', 'Review activity by day and month', 'Track consistency next to recovery and sleep'],
      how: 'Open the training diary after a session, add the activity and use the calendar to see your rhythm. Your records stay connected to the rest of your daily system.',
      faq: [faq('Is this only for gym workouts?', 'Это только для тренировок в зале?'), faq('No. Use the diary for any activity you want to record and review consistently.', 'Нет. В дневник можно добавлять любую активность, которую вы хотите регулярно отслеживать.')],
    },
    ru: {
      name: 'Дневник тренировок', title: 'Дневник тренировок в Telegram — календарь и прогресс | UltyMyLife',
      description: 'Ведите дневник тренировок, календарь активности и историю занятий внутри Telegram. Следите за регулярностью без отдельного фитнес-трекера.',
      eyebrow: 'История тренировок перед глазами',
      lead: 'Записывайте занятия, пока детали свежи, смотрите активные дни в календаре и сохраняйте ощущение движения между тренировками.',
      benefits: ['Фиксируйте тренировки и их длительность', 'Смотрите активность по дням и месяцам', 'Сопоставляйте регулярность с восстановлением и сном'],
      how: 'После занятия откройте дневник, добавьте активность и проверьте свой ритм по календарю. Записи остаются частью общей системы дня.',
      faq: [],
    },
  },
  {
    slug: 'breathing-meditation', image: { en: '/assets/product/en/recovery.png', ru: '/assets/product/mental.jpg' },
    en: {
      name: 'Breathing and meditation', title: 'Breathing exercises and meditation in Telegram | UltyMyLife',
      description: 'Use breathing exercises, meditation and recovery practices in Telegram. Create a simple pause for stress relief and daily balance.',
      eyebrow: 'Recovery when you need a pause',
      lead: 'Move from tension to a calmer state with short breathing, meditation and walking practices collected in one recovery section.',
      benefits: ['Start a short breathing practice in a few taps', 'Keep meditation and recovery sessions together', 'Build a repeatable pause into a busy day'],
      how: 'Choose breathing, meditation or walking, complete a short practice and return when you need to reset. Session history helps make recovery part of your routine.',
      faq: [faq('Are the practices suitable for beginners?', 'Практики подходят новичкам?'), faq('Yes. You can begin with a short session and build a comfortable rhythm gradually.', 'Да. Можно начать с короткой сессии и постепенно подобрать комфортный ритм.')],
    },
    ru: {
      name: 'Дыхание и медитации', title: 'Дыхательные практики и медитации в Telegram | UltyMyLife',
      description: 'Дыхательные упражнения, медитации и восстановительные практики внутри Telegram. Сделайте короткую паузу для спокойствия и баланса.',
      eyebrow: 'Восстановление в нужный момент',
      lead: 'Переключитесь из напряжения в более спокойное состояние с помощью коротких практик дыхания, медитации и ходьбы.',
      benefits: ['Запускайте короткую дыхательную практику в пару нажатий', 'Храните медитации и восстановительные сессии вместе', 'Добавьте понятную паузу в насыщенный день'],
      how: 'Выберите дыхание, медитацию или ходьбу, завершите короткую практику и возвращайтесь к ней, когда нужно перезагрузиться. История сессий помогает сделать восстановление регулярным.',
      faq: [],
    },
  },
  {
    slug: 'mental-fitness', image: { en: '/assets/product/en/mental.png', ru: '/assets/product/sleep.jpg' },
    en: {
      name: 'Mental fitness', title: 'Mental fitness games for memory, logic and focus | UltyMyLife',
      description: 'Train memory, logic, speed and focus with short mental fitness activities inside Telegram. Track scores and build a regular brain-training rhythm.',
      eyebrow: 'Short workouts for your mind',
      lead: 'Give memory, logic, speed and attention a regular place in your day through quick activities that are easy to return to.',
      benefits: ['Choose memory, logic, speed or focus', 'See scores, streaks and personal bests', 'Fit a short mental session into your daily system'],
      how: 'Pick the mental skill you want to practice, complete a short activity and follow your score over time. The section stays next to the habits that support your progress.',
      faq: [faq('How long does a mental workout take?', 'Сколько длится тренировка ума?'), faq('Activities are designed to fit into a short break, so regular practice feels manageable.', 'Активности рассчитаны на короткий перерыв, поэтому регулярная практика не перегружает день.')],
    },
    ru: {
      name: 'Тренировка ума', title: 'Тренировка памяти, логики и внимания в Telegram | UltyMyLife',
      description: 'Тренируйте память, логику, скорость и внимание короткими заданиями внутри Telegram. Следите за очками, сериями и личными результатами.',
      eyebrow: 'Короткие тренировки для ума',
      lead: 'Уделите памяти, логике, скорости и вниманию постоянное место в дне с помощью коротких активностей, к которым легко возвращаться.',
      benefits: ['Выбирайте память, логику, скорость или фокус', 'Следите за очками, сериями и личными рекордами', 'Добавляйте короткую тренировку ума в свой ритм'],
      how: 'Выберите навык, пройдите короткую активность и наблюдайте за результатом со временем. Раздел остаётся рядом с привычками, которые поддерживают ваш прогресс.',
      faq: [],
    },
  },
  {
    slug: 'sleep', image: { en: '/assets/product/en/sleep.png', ru: '/assets/product/tasks.jpg' },
    en: {
      name: 'Sleep tracker', title: 'Sleep tracker in Telegram — duration and consistency | UltyMyLife',
      description: 'Track sleep duration, consistency and personal sleep notes in Telegram. Review your calendar and understand your recovery rhythm.',
      eyebrow: 'See your sleep rhythm clearly',
      lead: 'Record sleep without a complicated dashboard. A simple calendar and summary make duration and consistency easier to understand.',
      benefits: ['Log sleep duration and daily notes', 'Review weekly averages and stronger nights', 'Compare sleep with workouts, habits and recovery'],
      how: 'Add a sleep entry, review the calendar and notice patterns across the week. Keeping sleep beside the rest of your routine makes the bigger picture easier to see.',
      faq: [faq('Does UltyMyLife replace a medical sleep monitor?', 'UltyMyLife заменяет медицинский мониторинг сна?'), faq('No. It is a personal tracking tool for routine and reflection, not a medical device.', 'Нет. Это инструмент личного отслеживания режима, а не медицинское устройство.')],
    },
    ru: {
      name: 'Трекер сна', title: 'Трекер сна в Telegram — длительность и режим | UltyMyLife',
      description: 'Отслеживайте длительность, регулярность и заметки о сне в Telegram. Смотрите календарь и лучше понимайте свой ритм восстановления.',
      eyebrow: 'Понятная картина вашего сна',
      lead: 'Записывайте сон без сложных графиков. Простой календарь и сводка помогают увидеть длительность и регулярность.',
      benefits: ['Фиксируйте длительность сна и заметки', 'Смотрите средние значения и лучшие ночи', 'Сопоставляйте сон с тренировками и восстановлением'],
      how: 'Добавьте запись о сне, посмотрите календарь и замечайте закономерности недели. Когда сон находится рядом с остальными привычками, общая картина становится яснее.',
      faq: [],
    },
  },
  {
    slug: 'ai-assistant', image: { en: '/assets/product/en/home.png', ru: '/assets/product/home.jpg' },
    en: {
      name: 'AI assistant', title: 'AI assistant for habits, tasks and daily reflection | UltyMyLife',
      description: 'Use an AI-ready personal system in Telegram to review habits, tasks and recovery context. Get clearer prompts from the data you choose to track.',
      eyebrow: 'Your daily context, ready for useful prompts',
      lead: 'Bring the signals from your day together so AI support can start from your habits, tasks and recovery context instead of a blank chat.',
      benefits: ['Keep relevant daily context in one system', 'Use prompts around habits, planning and reflection', 'Stay in control of what you choose to track'],
      how: 'Build your day through the core sections, then use the AI-ready menu when you want help reviewing direction or choosing the next step.',
      faq: [faq('Does the AI decide what I should do?', 'ИИ решает, что мне делать?'), faq('No. It supports reflection and planning; your priorities and decisions stay yours.', 'Нет. Он помогает с анализом и планированием, но приоритеты и решения остаются за вами.')],
    },
    ru: {
      name: 'ИИ-помощник', title: 'ИИ-помощник для привычек, задач и самоанализа | UltyMyLife',
      description: 'Используйте AI-ready систему в Telegram для анализа привычек, задач и восстановления. Получайте более полезные подсказки на основе выбранных данных.',
      eyebrow: 'Контекст вашего дня для полезных подсказок',
      lead: 'Соберите сигналы дня вместе, чтобы ИИ-помощник опирался на ваши привычки, задачи и восстановление, а не начинал с пустого чата.',
      benefits: ['Храните важный контекст дня в одной системе', 'Используйте подсказки для привычек, планов и рефлексии', 'Сами выбирайте, какие данные отслеживать'],
      how: 'Собирайте день в основных разделах, а затем открывайте AI-ready меню, когда нужна помощь с анализом направления или следующим шагом.',
      faq: [],
    },
  },
  {
    slug: 'personal-progress', image: { en: '/assets/product/en/home.png', ru: '/assets/product/home.jpg' },
    en: {
      name: 'Personal progress', title: 'Personal progress tracker for habits and goals | UltyMyLife',
      description: 'Track personal progress across habits, tasks, training, sleep and recovery in one Telegram Mini App. See how daily actions add up.',
      eyebrow: 'One place for the progress you create daily',
      lead: 'Stop judging progress from one perfect day. See the small actions across different life areas that build your longer-term direction.',
      benefits: ['Bring goals and daily actions into one view', 'Notice consistency across different life areas', 'Return to the next step without rebuilding context'],
      how: 'Choose the areas that matter, track a few useful actions and review how they develop together. UltyMyLife keeps your system flexible as priorities change.',
      faq: [faq('Do I have to use every section?', 'Нужно использовать все разделы?'), faq('No. Start with one or two areas and connect more only when they become useful.', 'Нет. Начните с одного-двух направлений и подключайте остальные, когда они понадобятся.')],
    },
    ru: {
      name: 'Личный прогресс', title: 'Трекер личного прогресса, привычек и целей | UltyMyLife',
      description: 'Отслеживайте личный прогресс в привычках, задачах, тренировках, сне и восстановлении в одном Telegram Mini App.',
      eyebrow: 'Прогресс, который складывается каждый день',
      lead: 'Не оценивайте себя по одному идеальному дню. Смотрите на небольшие действия в разных сферах, которые формируют долгосрочное движение.',
      benefits: ['Объединяйте цели и ежедневные действия', 'Замечайте регулярность в разных сферах жизни', 'Возвращайтесь к следующему шагу без потери контекста'],
      how: 'Выберите важные направления, отслеживайте несколько полезных действий и смотрите, как они развиваются вместе. Система остаётся гибкой, когда меняются приоритеты.',
      faq: [],
    },
  },
  {
    slug: 'progress-analytics', image: { en: '/assets/product/en/home.png', ru: '/assets/product/home.jpg' },
    en: {
      name: 'Progress analytics', title: 'Progress analytics for habits, sleep and workouts | UltyMyLife',
      description: 'Review progress analytics across habits, tasks, workouts, sleep and recovery. Turn daily records into a clearer picture inside Telegram.',
      eyebrow: 'Understand the pattern behind your days',
      lead: 'Individual check-ins become more useful when you can see them together. UltyMyLife helps turn daily records into a readable personal picture.',
      benefits: ['Review streaks, scores and calendar history', 'Compare signals from several life areas', 'Use patterns to adjust your next actions'],
      how: 'Keep lightweight records in the sections you use. Return to summaries and calendars to notice what supports your rhythm and where it changes.',
      faq: [faq('Do analytics require data from every section?', 'Для аналитики нужны данные из всех разделов?'), faq('No. Analytics become useful from the sections you choose to use consistently.', 'Нет. Полезная картина формируется из тех разделов, которыми вы пользуетесь регулярно.')],
    },
    ru: {
      name: 'Аналитика прогресса', title: 'Аналитика привычек, сна и тренировок | UltyMyLife',
      description: 'Смотрите аналитику привычек, задач, тренировок, сна и восстановления. Превращайте ежедневные записи в понятную картину внутри Telegram.',
      eyebrow: 'Закономерности за отдельными днями',
      lead: 'Отдельные отметки становятся полезнее, когда видны вместе. UltyMyLife превращает ежедневные записи в понятную личную картину.',
      benefits: ['Смотрите серии, результаты и историю в календаре', 'Сопоставляйте сигналы из разных сфер жизни', 'Используйте закономерности для следующих действий'],
      how: 'Ведите короткие записи в нужных разделах. Возвращайтесь к сводкам и календарям, чтобы замечать, что поддерживает ваш ритм и где он меняется.',
      faq: [],
    },
  },
];

for (const feature of FEATURES) {
  if (!feature.ru.faq.length) feature.ru.faq = feature.en.faq.map((item) => ({ question: item.ru, answer: item.en === item.question ? item.ru : item.ru }));
}

// Normalize bilingual FAQ pairs into visible localized Q&A objects.
const ruAnswers = {
  habits: ['Нет. Трекер открывается как Mini App внутри Telegram — ничего дополнительно устанавливать не нужно.', 'Да. Действия можно распределять по здоровью, развитию, продуктивности и своим направлениям.'],
  tasks: ['Да. Экран задач построен вокруг приоритетов на сегодня и статусов выполнения.'],
  workouts: ['Нет. В дневник можно добавлять любую активность, которую вы хотите регулярно отслеживать.'],
  'breathing-meditation': ['Да. Можно начать с короткой сессии и постепенно подобрать комфортный ритм.'],
  'mental-fitness': ['Активности рассчитаны на короткий перерыв, поэтому регулярная практика не перегружает день.'],
  sleep: ['Нет. Это инструмент личного отслеживания режима, а не медицинское устройство.'],
  'ai-assistant': ['Нет. Он помогает с анализом и планированием, но приоритеты и решения остаются за вами.'],
  'personal-progress': ['Нет. Начните с одного-двух направлений и подключайте остальные, когда они понадобятся.'],
  'progress-analytics': ['Нет. Полезная картина формируется из тех разделов, которыми вы пользуетесь регулярно.'],
};

for (const feature of FEATURES) {
  feature.en.faq = feature.en.faq.filter((_, index) => index % 2 === 0).map((pair, index) => ({ question: pair.en, answer: feature.en.faq[index * 2 + 1].en }));
  feature.ru.faq = feature.en.faq.map((item, index) => ({
    question: [...(feature.slug === 'habits' ? ['Нужно ли отдельное приложение для привычек?', 'Можно вести привычки для разных сфер жизни?'] : [
      feature.slug === 'tasks' ? 'Можно использовать как планировщик дня?' :
      feature.slug === 'workouts' ? 'Это только для тренировок в зале?' :
      feature.slug === 'breathing-meditation' ? 'Практики подходят новичкам?' :
      feature.slug === 'mental-fitness' ? 'Сколько длится тренировка ума?' :
      feature.slug === 'sleep' ? 'UltyMyLife заменяет медицинский мониторинг сна?' :
      feature.slug === 'ai-assistant' ? 'ИИ решает, что мне делать?' :
      feature.slug === 'personal-progress' ? 'Нужно использовать все разделы?' :
      'Для аналитики нужны данные из всех разделов?'
    ])][index],
    answer: ruAnswers[feature.slug][index],
  }));
}

const sharedFaq = {
  en: [
    { question: 'Will my progress stay connected to other sections?', answer: 'Yes. Your activity remains part of the same UltyMyLife system alongside the sections you choose to use.' },
    { question: 'Can I return to this section later?', answer: 'Yes. Open UltyMyLife in Telegram whenever you want to continue and review your current progress.' },
    { question: 'Where can I open UltyMyLife?', answer: 'Open it from the UltyMyLife Telegram bot or any Mini App link.' },
  ],
  ru: [
    { question: 'Прогресс будет связан с другими разделами?', answer: 'Да. Активность остаётся частью общей системы UltyMyLife рядом с теми разделами, которыми вы пользуетесь.' },
    { question: 'Можно вернуться к этому разделу позже?', answer: 'Да. Откройте UltyMyLife в Telegram, когда захотите продолжить и посмотреть текущий прогресс.' },
    { question: 'Где открыть UltyMyLife?', answer: 'Откройте его через бота UltyMyLife в Telegram или по ссылке на Mini App.' },
  ],
};

for (const feature of FEATURES) {
  feature.en.faq.push(...sharedFaq.en);
  feature.ru.faq.push(...sharedFaq.ru);
}

export function featurePath(slug, locale) {
  return locale === 'ru' ? `/ru/${slug}/` : `/${slug}/`;
}

export function telegramUrl(locale) {
  return SITE.telegram[locale];
}
