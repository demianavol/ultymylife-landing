import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const required = [
  'CNAME',
  'index.html',
  'ru/index.html',
  'privacy/index.html',
  'ru/privacy/index.html',
  'terms/index.html',
  'ru/terms/index.html',
  'consent/index.html',
  'ru/consent/index.html',
  'assets/legal.css',
];

for (const file of required) {
  if (!fs.existsSync(path.join(root, file))) throw new Error(`Missing public route file: ${file}`);
}

const pages = required.filter(file => file.endsWith('.html')).map(read);
const all = pages.join('\n');
const rootPage = read('index.html');
const ruPage = read('ru/index.html');
const privacy = read('privacy/index.html');
const ruPrivacy = read('ru/privacy/index.html');
const terms = read('terms/index.html');
const ruTerms = read('ru/terms/index.html');
const consentRedirect = read('consent/index.html');
const ruConsentRedirect = read('ru/consent/index.html');
const i18n = read('assets/i18n.js');
const cname = read('CNAME').trim();

if (!rootPage.includes('<html lang="en">')) throw new Error('Root landing must be English');
if (!ruPage.includes('<html lang="ru">')) throw new Error('/ru landing must be Russian');
if (!ruPage.includes('<base href="/"')) throw new Error('/ru landing must resolve assets from the domain root');
if (!rootPage.includes('https://ultymylife.com/')) throw new Error('Root canonical URL is missing');
if (!ruPage.includes('https://ultymylife.com/ru')) throw new Error('Russian canonical URL is missing');
if (!all.includes('https://t.me/UltyMyLife_bot/umlminiapp')) throw new Error('Telegram Mini App CTA is missing');
if (!all.includes('https://t.me/demianworkself')) throw new Error('Verified contact is missing');
if (/Draft|Черновик|заготовк|placeholder/i.test(all)) throw new Error('Draft wording remains in a public page');
if (/возврат\w*\s+(?:не\s+)?(?:предусмотр|осуществ)|no refunds?/i.test(all))
  throw new Error('Unsupported absolute no-refund wording remains');

for (const detail of ['Авольстийный Демиан Любовьевич', '165049581998', '326169000017372']) {
  if (!ruPrivacy.includes(detail) || !ruTerms.includes(detail))
    throw new Error(`Russian legal pages are missing operator detail: ${detail}`);
}
for (const page of [privacy, ruPrivacy, terms, ruTerms]) {
  if (!page.includes('2026-08-09')) throw new Error('Legal page is missing version/effective date');
}
if (!ruTerms.includes('18+')) throw new Error('Russian Terms must state the 18+ restriction');
if (!ruPrivacy.includes('7 календарных дней')) throw new Error('Russian Privacy must state deletion grace period');
if (!ruPrivacy.includes('<h1>Политика в отношении обработки персональных данных</h1>'))
  throw new Error('Russian Privacy title must use the statutory processing-policy name');
for (const page of [privacy, ruPrivacy, terms, ruTerms]) {
  if (/<p class="notice">/i.test(page)) throw new Error('Legal pages must not contain short-summary notice blocks');
}
for (const page of [terms, ruTerms]) {
  if (/<nav class="toc"/i.test(page)) throw new Error('Terms must not contain a contents navigation block');
}
if (!ruTerms.includes('далее — UltyMyLife')) throw new Error('Russian Terms must define UltyMyLife once');
if (!terms.includes('hereinafter UltyMyLife')) throw new Error('English Terms must define UltyMyLife once');
if (!ruPrivacy.includes('<h2>9. Сроки хранения данных</h2>')) throw new Error('Russian Privacy must use the concise retention heading');
if (!privacy.includes('<h2>9. Data retention periods</h2>')) throw new Error('English Privacy must use the concise retention heading');
for (const statement of [
  'Нельзя использовать UltyMyLife для незаконных действий, мошенничества, спама, взлома сервиса или нарушения прав других пользователей.',
  'You may not use UltyMyLife for illegal activity, fraud, spam, hacking the service, or violating other users’ rights.',
  'Пользователь самостоятельно выбирает подходящую нагрузку и практики.',
  'The user independently chooses an appropriate workload and practices.',
]) {
  if (!all.includes(statement)) throw new Error(`Legal pages missing concise copy: ${statement}`);
}
for (const removed of [
  'Никакое положение не освобождает', 'No provision releases', 'Данные не продаются', 'Data is not sold',
  'Абсолютной защиты не существует', 'Absolute protection does not exist', 'Исполнитель', 'Contractor',
]) {
  if (all.includes(removed)) throw new Error(`Removed legal boilerplate remains: ${removed}`);
}
if (ruTerms.includes('записей о самочувствии') || terms.includes('well-being records'))
  throw new Error('Terms describe a standalone well-being-record feature that code does not confirm');
for (const statement of [
  'По умолчанию AI-кэш считается действующим 24 часа.',
  'Просроченные строки AI-кэша автоматически не удаляются.',
  'Для событий аналитики отдельный срок автоматического удаления кодом не установлен.',
]) {
  if (!ruPrivacy.includes(statement)) throw new Error(`Russian Privacy missing retention fact: ${statement}`);
}
if (/основн\w+ баз\w+[^.]{0,80}(?:наход|размещ|хран)[^.]{0,40}(?:Росс|РФ)|локализац\w+[^.]{0,50}(?:Росс|РФ)/i.test(ruPrivacy))
  throw new Error('Russian database localization is not confirmed by code or workspace configuration');

if (!/<meta[^>]+http-equiv=["']refresh["'][^>]+url=\/privacy/i.test(consentRedirect))
  throw new Error('/consent must redirect to /privacy');
if (!/<meta[^>]+http-equiv=["']refresh["'][^>]+url=\/ru\/privacy/i.test(ruConsentRedirect))
  throw new Error('/ru/consent must redirect to /ru/privacy');
if (!consentRedirect.includes('href="/privacy"') || !ruConsentRedirect.includes('href="/ru/privacy"'))
  throw new Error('Legacy consent redirects need clickable Privacy fallbacks');

const activeLegalPages = [privacy, ruPrivacy, terms, ruTerms, i18n].join('\n');
if (/href=["'](?:\/ru)?\/consent["']/i.test(activeLegalPages))
  throw new Error('Active pages must not link to a standalone consent document');
if (/Personal-data consent is requested separately|Согласие на обработку персональных данных оформляется отдельно/i.test(activeLegalPages))
  throw new Error('Terms still require separate general personal-data consent');
if (/Potential health data|Возможные сведения о здоровье|health data also requires separate consent|для данных о здоровье.+отдельное согласие/i.test(activeLegalPages))
  throw new Error('Wellness data is still automatically classified as health data');
if (/biometric identification|биометрическ\w+ идентификац|solely automated legally significant|юридически значим\w+ автоматизирован/i.test(activeLegalPages))
  throw new Error('Unused biometric or legally significant AI wording remains');

for (const statement of [
  'UltyMyLife does not store the decryption key in its database.',
  'User-created names, descriptions, and notes are not sent to Groq.',
]) {
  if (!privacy.includes(statement)) throw new Error(`English Privacy missing: ${statement}`);
}
for (const statement of [
  'UltyMyLife не хранит ключ расшифровки в своей базе.',
  'Созданные пользователем названия, описания и заметки не передаются в Groq.',
]) {
  if (!ruPrivacy.includes(statement)) throw new Error(`Russian Privacy missing: ${statement}`);
}
if (!privacy.includes('diagnoses, treatment information, medicines, or medical documents'))
  throw new Error('English medical free-text warning is missing');
if (!ruPrivacy.includes('диагнозы, сведения о лечении, лекарства или медицинские документы'))
  throw new Error('Russian medical free-text warning is missing');

if (ruPrivacy.includes('До трансграничной передачи оператор должен') || ruPrivacy.includes('Конкретная инфраструктура должна поддерживать'))
  throw new Error('Internal Russian compliance instructions remain public');
if (privacy.includes('Before a cross-border transfer, Controller must'))
  throw new Error('Internal English compliance instructions remain public');

for (const route of ['/privacy', '/terms']) {
  if (!all.includes(`href="${route}"`) || !all.includes(`href="/ru${route}"`))
    throw new Error(`RU/EN legal cross-link is missing: ${route}`);
}
if (/USERNAME_PLACEHOLDER|EMAIL_PLACEHOLDER/.test(all)) throw new Error('Placeholder contact remains public');
if (!i18n.includes('https://t.me/demianworkself')) throw new Error('Generated landing contact repair is missing');
if (!i18n.includes('https://t.me/UltyMyLife_bot/umlminiapp')) throw new Error('English Mini App deep link is missing');
if (!i18n.includes('https://t.me/UltyMyLife_bot/umlminiapp?startapp=lang_ru')) throw new Error('Russian Mini App deep link is missing');
if (!i18n.includes('currentLang === "ru" ? MINI_APP_LINKS.ru : MINI_APP_LINKS.en'))
  throw new Error('Mini App CTA is not selected from current language');
if (i18n.includes('/consent')) throw new Error('Generated landing footer still links to Consent');
if (cname !== 'ultymylife.com') throw new Error('Landing CNAME must publish ultymylife.com');
if (/ultimatelife/i.test(all + i18n)) throw new Error('Misspelled domain remains');

console.log('Landing site self-check passed');
