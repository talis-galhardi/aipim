// The stage and the markup under it, the same block on the Playground and on the Default story of a component that has no
// Playground. The stage has its own theme switch, top right: it changes the theme of the component in the stage and
// nothing else, and the choice is kept for the next page (localStorage). Until a person chooses, the stage has no
// data-theme of its own and follows the page. preview.js scopes the tokens to `.pg__stage[data-theme]` and answers the click.
import { T } from '../.storybook/i18n.js';
import { icon } from './_dodont.js';

export const STAGE_THEME_KEY = 'aipim-sb-stage-theme';
export const storedStageTheme = () => {
  try { const v = localStorage.getItem(STAGE_THEME_KEY); return v === 'dark' || v === 'light' ? v : null; } catch (e) { return null; }
};

const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// A plain, best-effort indenter for display only: it never touches the markup that is actually rendered, only
// the copy shown under it. One tag or text run per line, and a tag that closes itself right back out
// ("<use>" inside an icon, "<span>Design</span>") stays on one line instead of splitting in two or three.
function prettyHtml(html) {
  const protect = html.replace(/(<([a-z0-9-]+)(?:\s[^>]*)?>)(<\/\2>)/g, (m, open, name, close) => `${open}\u0000${close}`);
  const lines = protect.replace(/>\s*</g, '>\n<').split('\n').map((l) => l.replace(/\u0000/g, ''));
  let depth = 0;
  return lines.map((line) => {
    const closes = /^<\//.test(line);
    const selfContained = /^<([a-z0-9-]+)[^>]*>.*<\/\1>$/i.test(line) || /\/>$/.test(line) || /^<(input|br|img|hr)\b[^>]*>$/i.test(line);
    if (closes) depth = Math.max(0, depth - 1);
    const out = '  '.repeat(depth) + line;
    if (!closes && !selfContained && /^</.test(line)) depth++;
    return out;
  }).join('\n');
}


// `markup` is what the stage shows; `shown` is the markup a person would copy, when it is not the same (a tag styled
// --inverse needs a dark tile around it to mean anything, and the tile is not part of the markup).
export function stage(markup, shown = markup) {
  const theme = storedStageTheme();
  return `<div class="pg"><div class="pg__stage"${theme ? ` data-theme="${theme}"` : ''}>${markup}`
    + `<button class="pg__theme" type="button" role="switch" aria-checked="${theme === 'dark'}" aria-label="${T.stageTheme}" data-pg-theme>${icon('moon', 'pg__theme-moon')}${icon('sun', 'pg__theme-sun')}</button></div>`
    + `<div class="pg__code"><div class="pg__code-head"><p class="pg__code-label">${T.markup}</p>`
    + `<button class="aipim-icon-button aipim-icon-button--sm" type="button" data-pg-copy aria-label="${T.copyMarkup}" title="${T.copyMarkup}">${icon('copy')}</button></div>`
    + `<pre class="pg__pre" tabindex="0" role="region" aria-label="${T.markup}"><code>${escapeHtml(prettyHtml(shown))}</code></pre></div></div>`;
}
