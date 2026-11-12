import { connectInfographicViewer } from "./infographic-viewer.js?v=2";

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

function createPoster(entry, sizes, loading = "eager") {
  const image = new Image(entry.width, entry.height);
  image.alt = entry.alt;
  image.decoding = "async";
  image.loading = loading;
  image.sizes = sizes;
  image.srcset = `${entry.small} ${entry.smallWidth}w, ${entry.src} ${entry.width}w`;
  image.src = entry.small;
  return image;
}

function connectGallery(scope, locale, initialIndex = 0) {
  const entries = JSON.parse(scope.querySelector("#showcase-entries").textContent);
  const tabs = [...scope.querySelectorAll("[data-module]")];
  const switcher = scope.querySelector(".demo-switcher");
  const panel = scope.querySelector("#gallery-panel");
  const title = panel.querySelector(".demo-copy h3");
  const description = panel.querySelector(".demo-copy p");
  const detail = panel.querySelector(".demo-detail");
  const poster = panel.querySelector(".demo-poster");
  const posterSizes = poster.querySelector("img").sizes;

  let currentIndex = 0;
  let selection = 0;
  let animation;

  switcher.setAttribute("role", "tablist");
  panel.setAttribute("role", "tabpanel");
  tabs.forEach(tab => {
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", panel.id);
  });

  function showEntry(index, image) {
    const entry = entries[index];
    currentIndex = index;
    tabs.forEach((tab, tabIndex) => {
      const active = tabIndex === index;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panel.setAttribute("aria-labelledby", tabs[index].id);
    if (!image) return;

    title.textContent = entry.title;
    description.textContent = entry.description;
    detail.href = entry.href;
    poster.href = entry.src;
    poster.querySelector("img").replaceWith(image);
  }

  async function select(index) {
    const request = ++selection;
    if (index === currentIndex) return;

    const image = createPoster(entries[index], posterSizes);
    try {
      await image.decode();
    } catch {
      // Keep the visible poster if the next one fails to load.
      return;
    }
    if (request !== selection) return;

    showEntry(index, image);
    animation?.cancel();
    if (!reducedMotion.matches) {
      animation = panel.animate([{ opacity: .65 }, { opacity: 1 }], {
        duration: 210,
        easing: "ease-out",
      });
    }
  }

  switcher.addEventListener("click", event => {
    const tab = event.target.closest("[data-module]");
    if (!tab || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    select(Number(tab.dataset.module));
  });

  switcher.addEventListener("keydown", event => {
    const tab = event.target.closest("[data-module]");
    if (!tab) return;
    const index = Number(tab.dataset.module);
    const last = tabs.length - 1;
    const next = {
      ArrowLeft: index === 0 ? last : index - 1,
      ArrowRight: index === last ? 0 : index + 1,
      Home: 0,
      End: last,
    }[event.key];
    if (next !== undefined) {
      event.preventDefault();
      tabs[next].focus();
      select(next);
    } else if (event.key === " ") {
      event.preventDefault();
      select(index);
    }
  });

  const initialPoster = initialIndex === 0 ? null : createPoster(entries[initialIndex], posterSizes, "lazy");
  showEntry(initialIndex, initialPoster);
  const disconnectViewer = connectInfographicViewer({ trigger: poster, select, getIndex: () => currentIndex, entries, locale });

  return {
    getIndex: () => currentIndex,
    destroy() {
      selection++;
      animation?.cancel();
      disconnectViewer?.();
    },
  };
}

let gallery = connectGallery(document, document.documentElement.lang);
let navigation = 0;
const localizedPages = new Map();
const landmarks = "body > header, body > main, body > footer";
const scrollSections = "main > section, body > footer";

async function loadPage(url) {
  const path = url.pathname;
  if (!localizedPages.has(path)) {
    const response = await fetch(path);
    if (!response.ok) throw new Error("Could not load the localized landing page");
    localizedPages.set(path, await response.text());
  }
  // The template is inert, so the alternate language's default poster stays lazy.
  const template = document.createElement("template");
  template.innerHTML = localizedPages.get(path);
  return template.content;
}

async function changeLanguage(url, locale, push = true) {
  const request = ++navigation;
  if (locale === document.documentElement.lang) return;

  try {
    const localized = await loadPage(url);
    if (request !== navigation) return;
    const next = [
      localized.querySelector("header"),
      localized.querySelector("main"),
      localized.querySelector("footer"),
    ];
    const nextTitle = localized.querySelector("title");
    const nextLanguage = next[0]?.querySelector('.language a[aria-current="page"]');
    if (nextLanguage?.lang !== locale || next.some(node => !node) || !nextTitle) {
      throw new Error("The localized landing page is incomplete");
    }

    const sections = [...document.querySelectorAll(scrollSections)];
    const sectionIndex = sections.findLastIndex(section => section.getBoundingClientRect().top <= 1);
    const section = sections[sectionIndex];
    const top = section?.getBoundingClientRect().top ?? 0;
    const focusLanguage = document.activeElement?.matches(".language a");
    const selected = gallery.getIndex();

    gallery.destroy();
    document.documentElement.lang = locale;
    document.title = nextTitle.textContent;
    gallery = connectGallery(localized, locale, selected);
    document.querySelectorAll(landmarks).forEach((node, index) => node.replaceWith(next[index]));
    if (push) history.pushState(null, "", url);

    const replacement = document.querySelectorAll(scrollSections)[sectionIndex];
    if (replacement) {
      window.scrollBy({ top: replacement.getBoundingClientRect().top - top, behavior: "instant" });
    }
    if (focusLanguage) nextLanguage.focus({ preventScroll: true });
  } catch {
    if (request !== navigation) return;
    if (push) location.assign(url);
    else location.replace(url);
  }
}

document.addEventListener("click", event => {
  const language = event.target.closest(".language a[lang]");
  if (!language || event.defaultPrevented || event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();

  const url = new URL(language.href);
  url.search = location.search;
  url.searchParams.delete("lang");
  url.hash = location.hash;
  changeLanguage(url, language.lang);
});

window.addEventListener("popstate", () => {
  const url = new URL(location.href);
  const language = [...document.querySelectorAll(".language a[lang]")]
    .find(link => new URL(link.href).pathname === url.pathname);
  if (language) changeLanguage(url, language.lang, false);
});
