import '@fontsource/antonio/600.css';
import '@fontsource/antonio/700.css';
import '@fontsource/karla/400.css';
import '@fontsource/karla/700.css';
import '../tokens/build/css/aipim.css';
import '../components/web/aipim-components.css';
import './preview.css';
import '../components/web/aipim.js';
import { sprite } from '../stories/_gallery.js';

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
    if (typeof out === 'string') wrap.insertAdjacentHTML('beforeend', out);
    else wrap.append(out);
    // Indeterminate is a property, not an attribute; tabs need the optional script.
    wrap.querySelectorAll('[data-indeterminate]').forEach((i) => { i.indeterminate = true; });
    if (window.Aipim) window.Aipim.init(wrap);
    return wrap;
  },
];

export const parameters = {
  layout: 'padded',
  controls: { expanded: true },
  a11y: { test: 'error' },
};
