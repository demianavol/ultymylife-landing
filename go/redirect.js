(() => {
  const API = 'https://api.ultymylife.com/api/marketing/click';
  const TELEGRAM = 'https://t.me/UltyMyLife_bot/umlminiapp?startapp=';
  const code = new URLSearchParams(window.location.search).get('c') || '';
  const status = document.getElementById('status');
  const button = document.getElementById('continue');
  const validCode = /^[A-Za-z0-9_-]{8,20}$/.test(code);

  function fallbackLink() {
    const language = code.startsWith('e') ? 'en' : 'ru';
    return `${TELEGRAM}${encodeURIComponent(`cmp_${code}_0_${language}`)}`;
  }

  function showLink(link, message) {
    status.textContent = message;
    button.href = link;
    button.hidden = false;
  }

  if (!validCode) {
    showLink('https://t.me/UltyMyLife_bot/umlminiapp', 'Ссылка повреждена. Можно открыть приложение без рекламной метки.');
    return;
  }

  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), 2500);
  fetch(API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
    signal: controller.signal,
  })
    .then(async response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const payload = await response.json();
      if (typeof payload.deepLink !== 'string' || !payload.deepLink.startsWith('https://t.me/UltyMyLife_bot/')) throw new Error('Invalid redirect');
      return payload.deepLink;
    })
    .catch(() => fallbackLink())
    .then(link => {
      showLink(link, 'Если Telegram не открылся автоматически, нажмите кнопку.');
      window.location.replace(link);
    })
    .finally(() => window.clearTimeout(timer));
})();
