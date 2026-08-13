(() => {
  document.querySelectorAll('[data-feature-video]').forEach((player) => {
    const video = player.querySelector('video[data-video-src]');
    const button = player.querySelector('[data-video-play]');
    if (!video || !button) return;
    button.addEventListener('click', () => {
      if (!video.src) video.src = video.dataset.videoSrc;
      player.classList.add('is-playing');
      video.play().catch(() => player.classList.remove('is-playing'));
    });
    video.addEventListener('play', () => player.classList.add('is-playing'));
    video.addEventListener('pause', () => player.classList.remove('is-playing'));
  });
})();
