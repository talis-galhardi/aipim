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
