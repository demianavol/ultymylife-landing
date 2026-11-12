(() => {
  if (new URLSearchParams(location.search).get('from') === 'studio') {
    const preview = document.documentElement.lang === 'ru' ? '/studio-preview/' : '/studio-preview/?lang=en';
    document.querySelectorAll('[data-studio-home]').forEach(link => { link.href = preview; });
    document.querySelectorAll('.site-header a[lang], .related-card').forEach(link => {
      const url = new URL(link.href);
      url.searchParams.set('from', 'studio');
      link.href = url.href;
    });
  }

  document.querySelectorAll('[data-feature-video]').forEach((player) => {
    const video = player.querySelector('video[data-video-src]');
    const button = player.querySelector('[data-video-play]');
    if (!video || !button) return;
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let autoEnabled = true;

    const play = () => {
      if (!video.src) video.src = video.dataset.videoSrc;
      video.play().catch(() => {});
    };
    button.addEventListener('click', play);
    video.addEventListener('playing', () => player.classList.add('is-playing'));
    video.addEventListener('pause', () => {
      if (visible) autoEnabled = false;
    });
    video.addEventListener('error', () => player.classList.remove('is-playing'));

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= .6;
        if (visible && autoEnabled && !reducedMotion.matches && !video.ended) play();
        if (!visible && !video.paused) video.pause();
      }, { threshold: .6 });
      observer.observe(video);
    }
  });
})();
