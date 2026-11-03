import '@fontsource/antonio/600.css';
import '@fontsource/antonio/700.css';
import '@fontsource/karla/400.css';
import '@fontsource/karla/700.css';
import '../tokens/build/css/aipim.css';
import tokensCss from '../tokens/build/css/aipim.css?raw';
import '../components/web/aipim-components.css';
// The order is the order of the cascade.
import './styles/stories.css';
import './styles/page.css';
import './styles/stage.css';
import './styles/facts.css';
import './styles/component-page.css';
import './styles/foundations.css';
import './styles/storybook-fixes.css';
import '../components/web/aipim.js';
import { createElement as h, useEffect, useState } from 'react';
import { addons } from 'storybook/preview-api';
import { GLOBALS_UPDATED, SET_GLOBALS } from 'storybook/internal/core-events';
import { DocsContainer } from '@storybook/addon-docs/blocks';
import { ComponentScroll } from './docs-scroll.js';
import { copyText } from './docs-tabs.js';
import { T } from './i18n.js';
import { light, dark } from './theme.js';
import { sprite, a11yRules } from '../stories/_gallery.js';
import { STAGE_THEME_KEY } from '../stories/_stage.js';

export const globalTypes = {
  theme: {
    // No toolbar item: the page follows the system, and the theme is chosen on the stage of each component (below).
    description: 'Aipim theme (data-theme)',
  },
};

// The theme of the page: the system's. The address (globals=theme:dark) still wins, because Storybook applies it over the
// initial globals, and Chromatic uses it to take each story in both themes.
const systemTheme = () => (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
export const initialGlobals = { theme: systemTheme() };

// data-theme follows the globals on every page, also the ones without a story (the Foundations and Guides pages are
// Markdown only, so no decorator runs there).
const applyTheme = (mode) => document.documentElement.setAttribute('data-theme', mode === 'dark' ? 'dark' : 'light');
applyTheme(initialGlobals.theme);
const onGlobals = ({ globals }) => { if (globals && globals.theme) { applyTheme(globals.theme); syncStageToggles(); } };
try {
  const channel = addons.getChannel();
  channel.on(SET_GLOBALS, onGlobals);
  channel.on(GLOBALS_UPDATED, onGlobals);
} catch (e) { /* no channel while Storybook is not running */ }

// The theme of a stage. The tokens only change on `:root[data-theme]`, so the same two blocks are written again for
// `.pg__stage[data-theme]`, read from the generated stylesheet: the dark block as it is, and the light values of the same
// properties (the rest does not change between the two, and the reduced-motion durations must stay as `:root` has them).
// A stage with no data-theme follows the page, until a person chooses on its button; the choice is kept for the next page.
const declarations = (css) => new Map([...css.matchAll(/(--[\w-]+):([^;]+);/g)].map((m) => [m[1], m[2].trim()]));
const lightTokens = declarations((tokensCss.match(/^:root\{([\s\S]*?)^\}/m) || [])[1] || '');
const darkTokens = declarations((tokensCss.match(/^:root\[data-theme="dark"\]\{([\s\S]*?)^\}/m) || [])[1] || '');
const rule = (mode, props) => `.pg__stage[data-theme="${mode}"]{${[...props].map(([k, v]) => `${k}:${v}`).join(';')};color-scheme:${mode}}`;
const stageTokens = document.createElement('style');
stageTokens.textContent = rule('dark', darkTokens) + rule('light', new Map([...darkTokens.keys()].map((k) => [k, lightTokens.get(k)]).filter(([, v]) => v)));
document.head.append(stageTokens);
const stageMode = (stage) => stage.getAttribute('data-theme') || document.documentElement.getAttribute('data-theme') || 'light';
function syncStageToggles() {
  document.querySelectorAll('.pg__stage').forEach((stage) => {
    const button = stage.querySelector('[data-pg-theme]');
    if (!button) return;
    const mode = stageMode(stage);
    if (button.dataset.mode !== mode) button.dataset.mode = mode;
    button.setAttribute('aria-checked', String(mode === 'dark'));
  });
}
document.addEventListener('click', (e) => {
  const button = e.target instanceof Element ? e.target.closest('[data-pg-theme]') : null;
  const stage = button?.closest('.pg__stage');
  if (!stage) return;
  const next = stageMode(stage) === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem(STAGE_THEME_KEY, next); } catch (err) { /* private mode: it holds on this page only */ }
  document.querySelectorAll('.pg__stage').forEach((x) => x.setAttribute('data-theme', next));
  syncStageToggles();
});

// The docs blocks (the toolbar over each story, code blocks, controls) take the Storybook theme of the mode.
function AipimDocsContainer({ context, children }) {
  const [mode, setMode] = useState(() => document.documentElement.getAttribute('data-theme') || 'light');
  useEffect(() => {
    const channel = addons.getChannel();
    const follow = ({ globals }) => { if (globals && globals.theme) setMode(globals.theme); };
    channel.on(SET_GLOBALS, follow);
    channel.on(GLOBALS_UPDATED, follow);
    return () => { channel.off(SET_GLOBALS, follow); channel.off(GLOBALS_UPDATED, follow); };
  }, []);
  // The icon sprite, once per docs page: an MDX page with no story has no decorator to bring it.
  return h(DocsContainer, { context, theme: mode === 'dark' ? dark : light },
    h('div', { className: 'sb-unstyled', 'aria-hidden': 'true', dangerouslySetInnerHTML: { __html: sprite } }), children);
}

// A link inside a demo is a picture of a link. Storybook's iframe sends links to the parent window (<base target="_parent">),
// so a click on href="#" would take the whole page to the bare iframe and leave the Storybook. Demo links go nowhere.
document.addEventListener('click', (e) => {
  const link = e.target instanceof Element ? e.target.closest('.doc-story a[href]') : null;
  if (link) { e.preventDefault(); e.stopPropagation(); }
}, true);

// The copy button of a code box. The icon and the label say "Copied" for a moment, the same feedback Storybook's own Source
// block gives, so every code block of a page reads as one pattern.
document.addEventListener('click', (e) => {
  const button = e.target instanceof Element ? e.target.closest('[data-pg-copy]') : null;
  const code = button?.closest('.pg__code')?.querySelector('.pg__pre code');
  if (!code) return;
  copyText(code.textContent).then(() => {
    const use = button.querySelector('use');
    const icon = use.getAttribute('href');
    const label = button.getAttribute('aria-label');
    use.setAttribute('href', '#aipim-check');
    button.setAttribute('aria-label', T.copied);
    button.setAttribute('title', T.copied);
    setTimeout(() => {
      use.setAttribute('href', icon);
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
    }, 1500);
  }).catch(() => {});
});

// A docs page's plain Markdown tables (a component's "Tokens used", Color's "Accessibility (WCAG 2.2)", Shape &
// elevation's "Stacking order") render through Storybook's own Description block, not previewTable()/typeTable(),
// so they carry none of the data-label cells the styles read to relabel a stacked row below 640px — every
// value in the row read identically (five of them for "Tokens used": applies to, state, token, light, dark),
// which is what made the mobile layout confusing rather than just tight. The header text is already there
// (the table's own <th>), just on a sibling element CSS cannot reach, so a cell that lacks data-label is
// labeled here from its column's header the moment the table appears in the page.
if (typeof document !== 'undefined') {
  const labelTables = (root) => {
    root.querySelectorAll('.sbdocs-content table').forEach((table) => {
      const headers = Array.from(table.querySelectorAll(':scope > thead th')).map((th) => th.textContent.trim());
      if (!headers.length) return;
      table.querySelectorAll(':scope > tbody > tr').forEach((tr) => {
        Array.from(tr.children).forEach((td, i) => {
          if (!td.hasAttribute('data-label') && headers[i]) td.setAttribute('data-label', headers[i]);
        });
      });
    });
  };
  // Storybook changes the DOM in bursts; one pass per frame is enough, so the page is not scanned for every mutation.
  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; labelTables(document); syncStageToggles(); });
  }).observe(document.documentElement, { childList: true, subtree: true });
}

export const decorators = [
  (story, context) => {
    document.documentElement.setAttribute('data-theme', context.globals.theme === 'dark' ? 'dark' : 'light');
    const out = story();
    const wrap = document.createElement('div');
    wrap.className = 'doc-story';
    wrap.innerHTML = sprite;
    // The content sits in its own box so the canvas can center it (this is what the Chromatic snapshot shows).
    const box = document.createElement('div');
    box.className = 'doc-story__content';
    if (typeof out === 'string') box.innerHTML = out;
    else box.append(out);
    wrap.append(box);
    // Indeterminate is a property, not an attribute; tabs need the optional script.
    wrap.querySelectorAll('[data-indeterminate]').forEach((i) => { i.indeterminate = true; });
    if (window.Aipim) window.Aipim.init(wrap);
    return wrap;
  },
];

export const parameters = {
  layout: 'fullscreen',
  docs: { container: AipimDocsContainer, page: ComponentScroll },
  // Every story is captured in both themes, so the Chromatic thumbnails show light and dark.
  chromatic: { modes: { light: { theme: 'light' }, dark: { theme: 'dark' } } },
  // The sidebar follows the atomic design order: foundations first, then atoms, molecules, organisms, then the guides.
  options: {
    storySort: {
      // Storybook reads this list from the file without running it, so it names the pages in both languages: each build
      // has only the names of its own language, and the others match nothing.
      order: [
        'Introduction', 'Introdução', "What's new", 'Novidades', 'Roadmap', 'Theme builder', 'Construtor de temas',
        'Foundations', ['Color', 'Typography', 'Space & layout', 'Shape & elevation', 'Motion & touch', 'Icons & illustrations'],
        'Fundamentos', ['Cor', 'Tipografia', 'Espaço e layout', 'Forma e elevação', 'Movimento e toque', 'Ícones e ilustrações'],
        'Atoms', 'Átomos', 'Molecules', 'Moléculas', 'Organisms', 'Organismos', 'Guides', 'Guias',
      ],
    },
  },
  controls: { expanded: true },
  a11y: { test: 'error', config: a11yRules() },
};
