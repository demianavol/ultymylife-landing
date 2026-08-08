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
const cname = read('CNAME').trim();

if (!rootPage.includes('<html lang="en">')) throw new Error('Root landing must be English');
if (!ruPage.includes('<html lang="ru">')) throw new Error('/ru landing must be Russian');
if (!ruPage.includes('<base href="/"')) throw new Error('/ru landing must resolve generated assets from the custom-domain root');
if (!rootPage.includes('https://ultymylife.com/')) throw new Error('Root canonical URL is missing');
if (!ruPage.includes('https://ultymylife.com/ru')) throw new Error('Russian canonical URL is missing');
if (!all.includes('https://t.me/UltyMyLife_bot/umlminiapp')) throw new Error('Telegram Mini App CTA is missing');
if (!all.includes('https://t.me/demianworkself')) throw new Error('Verified contact is missing');
if (!privacy.includes('Draft') || !ruPrivacy.includes('Черновик')) throw new Error('Privacy pages must be marked as drafts');
if (/USERNAME_PLACEHOLDER|EMAIL_PLACEHOLDER/.test(all)) throw new Error('Placeholder contact remains in a public page');
if (!read('assets/i18n.js').includes('https://t.me/demianworkself')) throw new Error('Generated landing contact repair is missing');
const i18n = read('assets/i18n.js');
if (!i18n.includes('https://t.me/UltyMyLife_bot/umlminiapp')) throw new Error('English Mini App deep link is missing');
if (!i18n.includes('https://t.me/UltyMyLife_bot/umlminiapp?startapp=lang_ru')) throw new Error('Russian Mini App deep link is missing');
if (!i18n.includes('currentLang === "ru" ? MINI_APP_LINKS.ru : MINI_APP_LINKS.en'))
  throw new Error('Mini App CTA is not selected from the current landing language');
if (cname !== 'ultymylife.com') throw new Error('Landing CNAME must publish ultymylife.com');
if (/ultimatelife/i.test(all + read('assets/i18n.js'))) throw new Error('Misspelled domain remains');

console.log('Landing site self-check passed');
