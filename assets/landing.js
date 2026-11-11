const scenarios = document.querySelector('[data-scenarios]');

if (scenarios) {
  const tabList = scenarios.querySelector('[data-scenario-tabs]');
  const tabs = [...tabList.querySelectorAll('[data-scenario-tab]')];
  const panels = [...scenarios.querySelectorAll('[data-scenario-panel]')];

  function select(index) {
    tabs.forEach((tab, position) => {
      const active = index === position;
      tab.setAttribute('aria-selected', active);
      tab.tabIndex = active ? 0 : -1;
      panels[position].hidden = !active;
    });
  }

  tabs.forEach((tab, index) => {
    const panel = panels[index];
    tab.setAttribute('role', 'tab');
    tab.setAttribute('aria-controls', panel.id);
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', tab.id);
    panel.tabIndex = 0;

    tab.addEventListener('click', () => select(index));
    tab.addEventListener('keydown', event => {
      const destinations = {
        ArrowLeft: (index + tabs.length - 1) % tabs.length,
        ArrowRight: (index + 1) % tabs.length,
        Home: 0,
        End: tabs.length - 1,
      };
      if (!Object.hasOwn(destinations, event.key)) return;

      const next = destinations[event.key];
      event.preventDefault();
      select(next);
      tabs[next].focus();
    });
  });

  tabList.setAttribute('role', 'tablist');
  select(0);
  tabList.hidden = false;
  scenarios.classList.add('is-interactive');
}
