// The Storybook chrome, through Storybook's own APIs only (theme, sidebar filter, a toolbar tool). Nothing here reads or
// restyles markup that Storybook owns: see .storybook/README.md.
import '@fontsource/antonio/700.css';
import '@fontsource/karla/400.css';
import '@fontsource/karla/700.css';
import { createElement as h } from 'react';
import { addons, types, useGlobals } from 'storybook/manager-api';
import { IconButton } from 'storybook/internal/components';
import { GlobeIcon, MoonIcon, SunIcon } from '@storybook/icons';
import { GLOBALS_UPDATED, SET_GLOBALS } from 'storybook/internal/core-events';
import { light, dark } from './theme.js';
import { OTHER, T } from './i18n.js';

const THEME_KEY = 'aipim-sb-theme';
const pick = (mode) => (mode === 'dark' ? dark : light);

// The theme the page opens with, the same rule as preview.js: the address (globals=theme:dark) wins, then the
// last choice of the person, then the system.
const stored = () => { try { return localStorage.getItem(THEME_KEY); } catch (e) { return null; } };
const system = () => (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
const fromUrl = () => ((new URLSearchParams(window.location.search).get('globals') || '').match(/theme:(light|dark)/) || [])[1];

// A component is one page: its docs page already shows the stories (default, all states, do and don't, playground),
// so they do not repeat as an accordion in the sidebar. The stories stay reachable by their own URL (iframe.html?id=...).
// A filter here, not only the !dev tag: Storybook reads tags from the source text, so it never sees the ones that the
// helpers (iconic(), doDont()) put on a story, and those two would stay in the sidebar.
// The ids are the same in both languages (atoms-button--default), the titles are not.
const hiddenInSidebar = (item) => item.type === 'story' && /^(atoms|molecules|organisms)-/.test(item.id || '');

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
    ariaLabel: T.theme(mode, next),
    tooltip: T.theme(mode, next),
    onClick: () => updateGlobals({ theme: next }),
  }, h(mode === 'dark' ? MoonIcon : SunIcon));
}

addons.register('aipim/theme-toggle', () => {
  addons.add('aipim/theme-toggle/tool', {
    type: types.TOOL,
    title: T.themeTool,
    match: ({ viewMode }) => viewMode === 'story' || viewMode === 'docs',
    render: ThemeToggle,
  });
});

// The other language, at the same page: the two builds share the ids of the pages, so the address only changes folder.
// A link, not a menu: there are two languages, and the label is the name of the other one in its own language.
function LanguageLink() {
  const go = () => { window.location.href = `${OTHER.base}${window.location.search}${window.location.hash}`; };
  return h(IconButton, { ariaLabel: OTHER.title, tooltip: OTHER.title, onClick: go },
    h(GlobeIcon), h('span', { lang: OTHER.lang, style: { marginInlineStart: 6 } }, OTHER.label));
}

addons.register('aipim/language', () => {
  addons.add('aipim/language/tool', {
    type: types.TOOL,
    title: T.language,
    match: ({ viewMode }) => viewMode === 'story' || viewMode === 'docs',
    render: LanguageLink,
  });
});
