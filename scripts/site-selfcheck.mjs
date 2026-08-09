import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
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

const pages = required.filter((file) => file.endsWith('.html')).map(read);
const all = pages.join('\n');
const rootPage = read('index.html');
const ruPage = read('ru/index.html');
const privacy = read('privacy/index.html');
const ruPrivacy = read('ru/privacy/index.html');
const terms = read('terms/index.html');
const ruTerms = read('ru/terms/index.html');
const consent = read('consent/index.html');
const ruConsent = read('ru/consent/index.html');
const cname = read('CNAME').trim();

if (!rootPage.includes('<html lang="en">')) throw new Error('Root landing must be English');
if (!ruPage.includes('<html lang="ru">')) throw new Error('/ru landing must be Russian');
if (!ruPage.includes('<base href="/"')) throw new Error('/ru landing must resolve generated assets from the custom-domain root');
if (!rootPage.includes('https://ultymylife.com/')) throw new Error('Root canonical URL is missing');
if (!ruPage.includes('https://ultymylife.com/ru')) throw new Error('Russian canonical URL is missing');
if (!all.includes('https://t.me/UltyMyLife_bot/umlminiapp')) throw new Error('Telegram Mini App CTA is missing');
if (!all.includes('https://t.me/demianworkself')) throw new Error('Verified contact is missing');
if (/Draft|Черновик|заготовк|placeholder/i.test(all)) throw new Error('Draft or placeholder wording remains in a public page');
if (/возврат\w*\s+(?:не\s+)?(?:предусмотр|осуществ)|no refunds?/i.test(all))
  throw new Error('Unsupported absolute no-refund wording remains');
for (const detail of ['Авольстийный Демиан Любовьевич', '165049581998', '326169000017372']) {
  if (!ruPrivacy.includes(detail) || !ruTerms.includes(detail) || !ruConsent.includes(detail))
    throw new Error(`Russian legal pages are missing operator detail: ${detail}`);
}
for (const page of [privacy, ruPrivacy, terms, ruTerms, consent, ruConsent]) {
  if (!page.includes('2026-08-09')) throw new Error('Legal page is missing version/effective date');
}
if (!ruTerms.includes('18+')) throw new Error('Russian Terms must state the 18+ restriction');
if (!ruPrivacy.includes('7 календарных дней')) throw new Error('Russian Privacy Policy must state the deletion grace period');
if (!ruConsent.includes('Согласие на обработку персональных данных'))
  throw new Error('Standalone Russian personal-data consent is missing');
if (!consent.includes('Consent to Personal Data Processing'))
  throw new Error('Standalone English personal-data consent is missing');
for (const statement of [
  'Содержимое задач, привычек и пользовательских заметок шифруется на устройстве до отправки резервной копии.',
  'Оператор не хранит ключ расшифровки в своей базе.',
  'В удалённый ИИ не передаются названия, описания и заметки пользователя.',
]) {
  if (!ruPrivacy.includes(statement) || !ruConsent.includes(statement))
    throw new Error(`Russian privacy pages are missing confidentiality statement: ${statement}`);
}
for (const statement of [
  'Task, habit, and user note content is encrypted on the device before the backup is sent.',
  'The Operator does not store the decryption key in its database.',
  'User-created names, descriptions, and notes are not sent to the remote AI.',
]) {
  if (!privacy.includes(statement) || !consent.includes(statement))
    throw new Error(`English privacy pages are missing confidentiality statement: ${statement}`);
}
if (ruPrivacy.includes('До трансграничной передачи оператор должен') || ruPrivacy.includes('Конкретная инфраструктура должна поддерживать') || ruConsent.includes('Моё действие не заменяет обязанность Оператора'))
  throw new Error('Internal Russian compliance instructions remain in public legal pages');
if (privacy.includes('Before a cross-border transfer, Controller must') || consent.includes("My action does not replace Controller’s duty"))
  throw new Error('Internal English compliance instructions remain in public legal pages');
for (const route of ['/privacy', '/terms', '/consent']) {
  if (!all.includes(`href="${route}"`) || !all.includes(`href="/ru${route}"`))
    throw new Error(`RU/EN legal cross-link is missing: ${route}`);
}
if (/USERNAME_PLACEHOLDER|EMAIL_PLACEHOLDER/.test(all)) throw new Error('Placeholder contact remains in a public page');
if (!read('assets/i18n.js').includes('https://t.me/demianworkself')) throw new Error('Generated landing contact repair is missing');
const i18n = read('assets/i18n.js');
if (!i18n.includes('https://t.me/UltyMyLife_bot/umlminiapp')) throw new Error('English Mini App deep link is missing');
if (!i18n.includes('https://t.me/UltyMyLife_bot/umlminiapp?startapp=lang_ru')) throw new Error('Russian Mini App deep link is missing');
if (!i18n.includes('currentLang === "ru" ? MINI_APP_LINKS.ru : MINI_APP_LINKS.en'))
  throw new Error('Mini App CTA is not selected from the current landing language');
if (!i18n.includes('/consent')) throw new Error('Generated landing footer is missing Consent links');
if (cname !== 'ultymylife.com') throw new Error('Landing CNAME must publish ultymylife.com');
if (/ultimatelife/i.test(all + read('assets/i18n.js'))) throw new Error('Misspelled domain remains');

console.log('Landing site self-check passed');
