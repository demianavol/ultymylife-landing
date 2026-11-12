import { englishScreens } from './tour-en.js';

const russianFrame = (id, title) => {
  const src = `/assets/product/ru/screens/${id}.webp`;
  return { id, title, src, preview: src, width: 825, height: 1539, previewWidth: 825, previewHeight: 1539 };
};

const russianScreens = {
  home: [russianFrame('home', 'Обзор дня'), russianFrame('sections', 'Все разделы')],
  habits: [russianFrame('habits', 'Привычки на сегодня')],
  tasks: [russianFrame('tasks', 'Приоритеты и фокус')],
  training: [russianFrame('training', 'Дневник тренировок')],
  recovery: [russianFrame('recovery', 'Дыхание и медитации')],
  mental: [russianFrame('mental', 'Упражнения для ума')],
  sleep: [russianFrame('sleep', 'Календарь сна')],
};

const captions = {
  'main-menu': 'Day overview', 'info-menu': 'Section guide',
  'new-habit': 'Habit library', 'workout-state': 'Wellbeing log', 'cardio-entry': 'New cardio session',
  recovery: 'Breathing and meditation', mind: 'Mind training', records: 'Leaderboard',
  'new-entry': 'Log a night of sleep', 'premium-offer': 'Upgrade to Pro',
  'premium-activated': 'Premium confirmation', ai: 'AI preview',
};

export const tourGroups = [
  ['home', '#b4e2f0', 'Home screen', 'Главный экран'],
  ['habits', '#7bddba', 'Habits', 'Привычки'],
  ['tasks', '#90c7fb', 'Tasks', 'Задачи'],
  ['training', '#9dc9e7', 'Workouts', 'Тренировки'],
  ['recovery', '#79daca', 'Recovery', 'Восстановление'],
  ['mental', '#c4a9fa', 'Mental fitness', 'Ментальный фитнес'],
  ['sleep', '#b0aafc', 'Sleep', 'Сон'],
  ['premium', '#ebc47f', 'Premium & AI', 'Premium и ИИ'],
  ['onboarding', '#9ad2fd', 'Getting started', 'Первые шаги'],
].map(([id, tone, en, ru]) => ({
  id, tone, title: { en, ru }, ru: russianScreens[id] || [],
  en: englishScreens[id].map(frame => ({ ...frame, title: captions[frame.id] || frame.title })),
}));

export function tourScreen(locale, group, id) {
  const screens = tourGroups.find(entry => entry.id === group)?.[locale] || [];
  return id ? screens.find(frame => frame.id === id) : screens[0];
}

const featureScreens = {
  habits: ['habits', 'habits', 'calendar', 'analytics', 'new-habit'],
  tasks: ['tasks', 'tasks', 'analytics', 'new-task'],
  workouts: ['training', 'training', 'calendar', 'workout', 'strength-analytics'],
  'breathing-meditation': ['recovery', 'recovery', 'journal', 'analytics', 'practice-catalog'],
  'mental-fitness': ['mental', 'mind', 'progress', 'math', 'memory'],
  sleep: ['sleep', 'sleep', 'devices', 'analytics', 'new-entry'],
  'ai-assistant': ['premium', 'ai', 'premium-offer', 'premium-activated'],
  'personal-progress': ['home', 'profile', 'main-menu', 'settings'],
  'progress-analytics': ['habits', 'analytics', 'calendar', 'habits'],
};

export function featureTour(locale, slug) {
  const [group, ...ids] = featureScreens[slug];
  const tone = tourGroups.find(entry => entry.id === group).tone;
  return {
    tone,
    screens: locale === 'ru' ? [tourScreen(locale, group)].filter(Boolean)
      : ids.map(id => tourScreen(locale, group, id)).filter(Boolean),
  };
}
