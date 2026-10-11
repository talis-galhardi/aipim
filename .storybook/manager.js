import '@fontsource/antonio/700.css';
import '@fontsource/karla/400.css';
import '@fontsource/karla/700.css';
import { addons } from 'storybook/manager-api';
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
