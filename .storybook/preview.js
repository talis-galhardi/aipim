import '@fontsource/antonio/600.css';
import '@fontsource/antonio/700.css';
import '@fontsource/karla/400.css';
import '@fontsource/karla/700.css';
import '../tokens/build/css/aipim.css';
import '../components/web/aipim-components.css';
import './preview.css';
import '../components/web/aipim.js';
import { createElement as h, Fragment } from 'react';
import { Title, Description, Primary, Stories } from '@storybook/addon-docs/blocks';
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
export const initialGlobals = { theme: 'light' };

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
  // The docs page opens with the component, then the spec, then the other stories (do and don't, playground).
  docs: { page: () => h(Fragment, null, h(Title), h(Primary), h(Description), h(Stories, { includePrimary: false, title: 'More stories' })) },
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
