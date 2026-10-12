// Parts of this file change markup that Storybook owns (the menu groups, the bar of a phone). Each one is listed in
// .storybook/README.md with the markup it needs, and tools/verify_storybook.py checks them against a build.
import '@fontsource/antonio/700.css';
import '@fontsource/karla/400.css';
import '@fontsource/karla/700.css';
import { createElement as h } from 'react';
import { addons, types, useGlobals } from 'storybook/manager-api';
import { IconButton } from 'storybook/internal/components';
import { MoonIcon, SunIcon } from '@storybook/icons';
import { GLOBALS_UPDATED, SET_GLOBALS } from 'storybook/internal/core-events';
import { light, dark } from './theme.js';

const THEME_KEY = 'aipim-sb-theme';
const pick = (mode) => {
  // manager-head.html styles a few parts by mode (the selected row), so the page says which one is on.
  document.documentElement.setAttribute('data-aipim-theme', mode === 'dark' ? 'dark' : 'light');
  return mode === 'dark' ? dark : light;
};

// The theme the page opens with, the same rule as preview.js: the address (globals=theme:dark) wins, then the
// last choice of the person, then the system.
const stored = () => { try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; } };
const system = () => (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
const fromUrl = () => ((new URLSearchParams(window.location.search).get('globals') || '').match(/theme:(light|dark)/) || [])[1];

// A component is one page: its docs page already shows the stories (default, all states, do and don't, playground),
// so they do not repeat as an accordion in the sidebar. The stories stay reachable by their own URL (iframe.html?id=...).
// A filter here, not only the !dev tag: Storybook reads tags from the source text, so it never sees the ones that the
// helpers (iconic(), doDont()) put on a story, and those two would stay in the sidebar.
const hiddenInSidebar = (item) => item.type === 'story' && /^(Atoms|Molecules|Organisms)\//.test(item.title || '');

addons.setConfig({
  theme: pick(fromUrl() || stored() || system()),
  sidebar: { filters: { patterns: (item) => !hiddenInSidebar(item) } },
});

// The theme control of the toolbar changes the preview; this makes the sidebar and the toolbars follow it too.
addons.register('aipim/theme', (api) => {
  const channel = addons.getChannel();
  const follow = ({ globals }) => { if (globals && globals.theme) api.setOptions({ theme: pick(globals.theme) }); };
  channel.on(SET_GLOBALS, follow);
  channel.on(GLOBALS_UPDATED, follow);
});

// One button for the theme: the icon is the mode that is on (sun, moon) and the label says what a press does. It replaces
// the toolbar menu that only showed the word "Light" and looked like a label. The choice is written by preview.js.
function ThemeToggle() {
  const [globals, updateGlobals] = useGlobals();
  const mode = globals.theme === 'dark' ? 'dark' : 'light';
  const next = mode === 'dark' ? 'light' : 'dark';
  return h(IconButton, {
    ariaLabel: `Theme: ${mode}. Switch to ${next}`,
    tooltip: `Theme: ${mode}. Switch to ${next}`,
    onClick: () => updateGlobals({ theme: next }),
  }, h(mode === 'dark' ? MoonIcon : SunIcon));
}

addons.register('aipim/theme-toggle', () => {
  addons.add('aipim/theme-toggle/tool', {
    type: types.TOOL,
    title: 'Theme',
    match: ({ viewMode }) => viewMode === 'story' || viewMode === 'docs',
    render: ThemeToggle,
  });
});

// The name of the browser tab: "Button · Aipim Design System", not "Atoms / Button - Docs ⋅ Storybook".
const BRAND = 'Aipim Design System';
const tidyTitle = () => {
  const t = document.title;
  if (!t || t.endsWith(` · ${BRAND}`)) return;
  const name = t.replace(/\s*⋅\s*Storybook$/, '').replace(/\s+-\s+Docs$/, '').replace(/\s*⋅\s*/g, ' · ');
  const last = name.split(' / ').pop();
  document.title = `${last || name} · ${BRAND}`;
};
// The bar of a phone names the page as "Atoms/Button/Docs": the last word is the kind of page, which is noise. The text
// node is edited in place, so Storybook's own updates keep working.
const tidyBar = () => {
  const bar = document.querySelector('header[role="banner"] button');
  if (!bar) return;
  const walker = document.createTreeWalker(bar, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (/\/Docs$/.test(n.nodeValue)) n.nodeValue = n.nodeValue.replace(/\/Docs$/, '');
  }
};
let queued = false;
const tidy = () => {
  if (queued) return;
  queued = true;
  requestAnimationFrame(() => { queued = false; tidyTitle(); tidyBar(); });
};
new MutationObserver(tidy).observe(document.documentElement, { childList: true, subtree: true, characterData: true });
tidy();

// The groups of the menu open and close with a short slide. Storybook mounts and unmounts the rows of a group, so
// closing plays the slide first and then lets the click through, and opening plays it on the rows that appear.
const still = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const SLIDE = { duration: 180, easing: 'cubic-bezier(0.2, 0, 0, 1)' };
const rowsOf = (header) => {
  const rows = [];
  for (let n = header.nextElementSibling; n && n.getAttribute('data-nodetype') !== 'root'; n = n.nextElementSibling) rows.push(n);
  return rows;
};
let opening = 0;
document.addEventListener('click', (e) => {
  const btn = e.target instanceof Element ? e.target.closest('button[data-action="collapse-root"]') : null;
  if (!btn || btn.dataset.aipimGo || still()) return;
  if (btn.getAttribute('aria-expanded') !== 'true') { opening = performance.now() + 500; return; }
  const header = btn.closest('[data-nodetype="root"]');
  const rows = header ? rowsOf(header).filter((r) => r.getBoundingClientRect().height > 0) : [];
  if (!rows.length) return;
  e.preventDefault();
  e.stopPropagation();
  const done = rows.map((r) => {
    r.style.overflow = 'hidden';
    const px = `${r.getBoundingClientRect().height}px`;
    return r.animate([{ height: px, minHeight: px, opacity: 1 }, { height: '0px', minHeight: '0px', opacity: 0 }], { ...SLIDE, fill: 'forwards' }).finished;
  });
  Promise.all(done).catch(() => {}).then(() => {
    btn.dataset.aipimGo = '1';
    btn.click();
    delete btn.dataset.aipimGo;
  });
}, true);
new MutationObserver((records) => {
  if (performance.now() > opening || still()) return;
  for (const rec of records) {
    for (const n of rec.addedNodes) {
      if (!(n instanceof HTMLElement) || !n.matches('[data-nodetype="document"], [data-nodetype="component"], [data-nodetype="group"]')) continue;
      const h = n.getBoundingClientRect().height;
      if (!h) continue;
      n.style.overflow = 'hidden';
      const a = n.animate([{ height: '0px', minHeight: '0px', opacity: 0 }, { height: `${h}px`, minHeight: `${h}px`, opacity: 1 }], SLIDE);
      a.onfinish = () => { n.style.overflow = ''; };
    }
  }
}).observe(document.documentElement, { childList: true, subtree: true });
