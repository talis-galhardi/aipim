import '@fontsource/antonio/600.css';
import '@fontsource/antonio/700.css';
import '@fontsource/karla/400.css';
import '@fontsource/karla/700.css';
import '../tokens/build/css/aipim.css';
import '../components/web/aipim-components.css';
import './preview.css';
import '../components/web/aipim.js';
import { createElement as h, Fragment, useEffect, useState } from 'react';
import { addons } from 'storybook/preview-api';
import { GLOBALS_UPDATED, SET_GLOBALS, UPDATE_GLOBALS } from 'storybook/internal/core-events';
import { DocsContainer, Title, Primary } from '@storybook/addon-docs/blocks';
import { ComponentTabs } from './docs-tabs.js';
import { light, dark } from './theme.js';
import { sprite, a11yRules } from '../stories/_gallery.js';

export const globalTypes = {
  theme: {
    description: 'Aipim theme (data-theme)',
    toolbar: {
      title: 'Theme',
      icon: 'circlehollow',
      items: [{ value: 'light', title: 'Light' }, { value: 'dark', title: 'Dark' }],
      dynamicTitle: true,
    },
  },
};

// The theme the preview opens with: the last choice of the person, then the system. The address (globals=theme:dark)
// still wins, because Storybook applies it over the initial globals.
const THEME_KEY = 'aipim-sb-theme';
const storedTheme = () => { try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; } };
const systemTheme = () => (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
export const initialGlobals = { theme: storedTheme() === 'dark' || storedTheme() === 'light' ? storedTheme() : systemTheme() };

// data-theme follows the theme control on every page, also the ones without a story (the Foundations and Guides
// pages are Markdown only, so no decorator runs there), and the choice is kept for the next visit.
const applyTheme = (mode) => document.documentElement.setAttribute('data-theme', mode === 'dark' ? 'dark' : 'light');
applyTheme(initialGlobals.theme);
const onGlobals = ({ globals }) => { if (globals && globals.theme) applyTheme(globals.theme); };
// UPDATE_GLOBALS is what the toolbar sends when the person picks a theme (the other events also fire when the page opens),
// so only a real choice is kept, and a first visit keeps following the system.
const onChoice = ({ globals }) => {
  if (!globals || !globals.theme) return;
  try { localStorage.setItem(THEME_KEY, globals.theme); } catch (e) { /* private mode: the choice is just not kept */ }
};
try {
  const channel = addons.getChannel();
  channel.on(SET_GLOBALS, onGlobals);
  channel.on(GLOBALS_UPDATED, onGlobals);
  channel.on(UPDATE_GLOBALS, onChoice);
} catch (e) { /* no channel while Storybook is not running */ }

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
  return h(DocsContainer, { context, theme: mode === 'dark' ? dark : light }, children);
}

// A link inside a demo is a picture of a link. Storybook's iframe sends links to the parent window (<base target="_parent">),
// so a click on href="#" would take the whole page to the bare iframe and leave the Storybook. Demo links go nowhere.
document.addEventListener('click', (e) => {
  const link = e.target instanceof Element ? e.target.closest('.aipim-sb a[href]') : null;
  if (link) { e.preventDefault(); e.stopPropagation(); }
}, true);

// A docs page's plain Markdown tables (a component's "Tokens used", Color's "Accessibility (WCAG 2.2)", Shape &
// elevation's "Stacking order") render through Storybook's own Description block, not previewTable()/typeTable(),
// so they carry none of the data-label cells preview.css reads to relabel a stacked row below 640px — every
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
    requestAnimationFrame(() => { queued = false; labelTables(document); });
  }).observe(document.documentElement, { childList: true, subtree: true });
}

export const decorators = [
  (story, context) => {
    document.documentElement.setAttribute('data-theme', context.globals.theme === 'dark' ? 'dark' : 'light');
    const out = story();
    const wrap = document.createElement('div');
    wrap.className = 'aipim-sb';
    wrap.innerHTML = sprite;
    // The content sits in its own box so the canvas can center it (this is what the Chromatic snapshot shows).
    const box = document.createElement('div');
    box.className = 'aipim-sb__content';
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
  // The docs page opens with the component, then tabs: the spec (overview), the other stories (all states, do and don't,
  // playground), the code, the tokens and the accessibility notes. The tabs are the design system's own.
  docs: { container: AipimDocsContainer, page: () => h(Fragment, null, h(Title), h(Primary), h(ComponentTabs)) },
  // Every story is captured in both themes, so the Chromatic thumbnails show light and dark.
  chromatic: { modes: { light: { theme: 'light' }, dark: { theme: 'dark' } } },
  // The sidebar follows the atomic design order: foundations first, then atoms, molecules, organisms, then the guides.
  options: {
    storySort: {
      order: ['Introduction', 'Foundations', ['Color', 'Typography', 'Space & layout', 'Shape & elevation', 'Motion & touch', 'Icons & illustrations'], 'Atoms', 'Molecules', 'Organisms', 'Guides'],
    },
  },
  controls: { expanded: true },
  a11y: { test: 'error', config: a11yRules() },
};
