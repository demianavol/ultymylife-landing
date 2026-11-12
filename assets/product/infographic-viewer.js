const labelsByLanguage = {
  ru: {
    close: "Закрыть просмотр",
    previous: "Предыдущий раздел",
    next: "Следующий раздел",
    zoomOut: "Уменьшить изображение",
    zoomIn: "Увеличить изображение",
    reset: "Вписать изображение в экран",
    image: "Область изображения",
    controls: "Управление просмотром",
  },
  en: {
    close: "Close viewer",
    previous: "Previous section",
    next: "Next section",
    zoomOut: "Zoom out",
    zoomIn: "Zoom in",
    reset: "Fit image to screen",
    image: "Image area",
    controls: "Viewer controls",
  },
};

const scales = [1, 1.5, 2, 3, 4];

export function connectInfographicViewer({
  trigger,
  select,
  getIndex,
  entries,
  locale = document.documentElement.lang,
}) {
  const dialog = document.createElement("dialog");
  if (typeof dialog.showModal !== "function") return;

  const labels = locale.startsWith("ru") ? labelsByLanguage.ru : labelsByLanguage.en;
  dialog.id = "infographic-viewer";
  dialog.className = "infographic-viewer";
  dialog.setAttribute("aria-labelledby", "infographic-viewer-title");
  dialog.innerHTML = `
    <div class="infographic-viewer-layout">
      <header class="infographic-viewer-header">
        <h2 id="infographic-viewer-title" aria-live="polite"></h2>
        <button class="infographic-viewer-button" type="button" data-action="close" autofocus><span aria-hidden="true">×</span></button>
      </header>
      <div class="infographic-viewer-scroll" role="region" tabindex="0">
        <div class="infographic-viewer-stage"><img draggable="false" alt=""></div>
      </div>
      <div class="infographic-viewer-controls" role="group">
        <button class="infographic-viewer-button" type="button" data-action="previous"><span aria-hidden="true">←</span></button>
        <div class="infographic-viewer-zoom">
          <button class="infographic-viewer-button" type="button" data-action="zoomOut"><span aria-hidden="true">−</span></button>
          <button class="infographic-viewer-button infographic-viewer-fit" type="button" data-action="reset"><span aria-hidden="true">100%</span></button>
          <button class="infographic-viewer-button" type="button" data-action="zoomIn"><span aria-hidden="true">+</span></button>
        </div>
        <button class="infographic-viewer-button" type="button" data-action="next"><span aria-hidden="true">→</span></button>
      </div>
    </div>`;
  document.body.append(dialog);

  const title = dialog.querySelector("h2");
  const viewport = dialog.querySelector(".infographic-viewer-scroll");
  const stage = dialog.querySelector(".infographic-viewer-stage");
  const image = dialog.querySelector("img");
  const controls = dialog.querySelector(".infographic-viewer-controls");
  const buttons = Object.fromEntries([...dialog.querySelectorAll("[data-action]")].map(button => {
    const action = button.dataset.action;
    button.setAttribute("aria-label", labels[action]);
    button.title = labels[action];
    return [action, button];
  }));
  const zoomLevel = buttons.reset.firstElementChild;
  const formatZoom = new Intl.NumberFormat(locale, { style: "percent" });
  viewport.setAttribute("aria-label", labels.image);
  controls.setAttribute("aria-label", labels.controls);
  trigger.setAttribute("aria-haspopup", "dialog");
  trigger.setAttribute("aria-controls", dialog.id);

  let index = 0;
  let scaleIndex = 0;
  let drag;

  function resize(keepCenter = false) {
    if (!dialog.open) return;

    const padding = parseFloat(getComputedStyle(stage).paddingInlineStart);
    const areaWidth = Math.max(1, viewport.clientWidth - 2 * padding);
    const areaHeight = Math.max(1, viewport.clientHeight - 2 * padding);
    const { width, height } = entries[index];
    const factor = Math.min(areaWidth / width, areaHeight / height, 1) * scales[scaleIndex];
    const centerX = (viewport.scrollLeft + viewport.clientWidth / 2) / viewport.scrollWidth;
    const centerY = (viewport.scrollTop + viewport.clientHeight / 2) / viewport.scrollHeight;

    image.style.width = Math.floor(width * factor) + "px";
    image.style.height = Math.floor(height * factor) + "px";

    viewport.scrollTo({
      left: keepCenter ? viewport.scrollWidth * centerX - viewport.clientWidth / 2 : 0,
      top: keepCenter ? viewport.scrollHeight * centerY - viewport.clientHeight / 2 : 0,
      behavior: "instant",
    });
  }

  function zoom(nextScaleIndex, keepCenter = true) {
    scaleIndex = Math.max(0, Math.min(scales.length - 1, nextScaleIndex));
    const percent = formatZoom.format(scales[scaleIndex]);
    zoomLevel.textContent = percent;
    buttons.reset.setAttribute("aria-label", labels.reset + " · " + percent);
    buttons.zoomOut.setAttribute("aria-disabled", String(scaleIndex === 0));
    buttons.zoomIn.setAttribute("aria-disabled", String(scaleIndex === scales.length - 1));
    viewport.classList.toggle("is-zoomed", scaleIndex > 0);
    resize(keepCenter);
  }

  function render() {
    const entry = entries[index];
    title.textContent = entry.title;
    image.alt = entry.alt || entry.title;
    image.width = entry.width;
    image.height = entry.height;
    image.src = entry.src;
    zoom(0, false);
  }

  function step(direction) {
    index = (index + direction + entries.length) % entries.length;
    render();
    select(index);
  }

  trigger.addEventListener("click", event => {
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    index = getIndex();
    render();
    document.documentElement.classList.add("infographic-viewer-open");
    dialog.showModal();
    resize();
    window.addEventListener("resize", resizeToViewport);
  });

  function resizeToViewport() {
    resize(true);
  }

  function stopViewing() {
    document.documentElement.classList.remove("infographic-viewer-open");
    window.removeEventListener("resize", resizeToViewport);
  }

  function restoreFocus() {
    stopViewing();
    trigger.focus({ preventScroll: true });
  }

  dialog.addEventListener("close", restoreFocus);
  buttons.close.addEventListener("click", () => dialog.close());
  buttons.previous.addEventListener("click", () => step(-1));
  buttons.next.addEventListener("click", () => step(1));
  buttons.zoomOut.addEventListener("click", () => zoom(scaleIndex - 1));
  buttons.zoomIn.addEventListener("click", () => zoom(scaleIndex + 1));
  buttons.reset.addEventListener("click", () => zoom(0));

  dialog.addEventListener("keydown", event => {
    if (event.ctrlKey || event.metaKey || event.altKey) return;
    if (event.key === "+" || event.key === "=") zoom(scaleIndex + 1);
    else if (event.key === "-") zoom(scaleIndex - 1);
    else if (event.key === "0") zoom(0);
    else if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      const direction = event.key === "ArrowLeft" ? -1 : 1;
      if (event.shiftKey && scaleIndex > 0) viewport.scrollLeft += direction * 48;
      else step(direction);
    } else return;
    event.preventDefault();
  });

  viewport.addEventListener("pointerdown", event => {
    if (event.pointerType !== "mouse" || event.button !== 0 || scaleIndex === 0 || event.target !== image) return;
    drag = { x: event.clientX, y: event.clientY, left: viewport.scrollLeft, top: viewport.scrollTop };
    viewport.setPointerCapture(event.pointerId);
    viewport.classList.add("is-dragging");
  });
  viewport.addEventListener("pointermove", event => {
    if (!drag) return;
    viewport.scrollLeft = drag.left + drag.x - event.clientX;
    viewport.scrollTop = drag.top + drag.y - event.clientY;
  });
  viewport.addEventListener("lostpointercapture", () => {
    drag = undefined;
    viewport.classList.remove("is-dragging");
  });

  return () => {
    dialog.removeEventListener("close", restoreFocus);
    if (dialog.open) dialog.close();
    stopViewing();
    dialog.remove();
  };
}
