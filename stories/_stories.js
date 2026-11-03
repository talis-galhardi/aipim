// What every component story file uses, in one import. Each component page has the same three stories:
// - Default: the most recognizable variation, first, so it is on top of the page and in the thumbnail (_iconic.js).
// - All states: every state and variant, cut from components/web/examples/index.html (_gallery.js).
// - Do and don't: one right and one wrong example, with the captions of the spec (_dodont.js).
// A fourth, Playground, is opt-in (ROADMAP.md, "Until then, in v1.x"): controls that change classes and
// attributes, with the markup they produce under it, for the components whose variants combine.
// All four are hidden from the sidebar: a component is one page there.
import { T } from '../.storybook/i18n.js';
import { icon } from './_dodont.js';

export { a11yRules, meta, parts, section } from './_gallery.js';
export { doDont } from './_dodont.js';
export { iconic } from './_iconic.js';

export const allStates = (render) => ({ tags: ['!dev'], name: T.allStates, render });

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

// A Playground story: `renderMarkup(args)` builds the real markup from the controls, shown live and, under it,
// as text to copy. `wrapStage` only changes how the live preview sits on the canvas (a tag styled --inverse
// needs a dark tile around it to mean anything); the code block always shows renderMarkup's own output, the
// markup a person would actually copy into their page.
export function playground({ args, argTypes, parameters, renderMarkup, wrapStage = (markup) => markup }) {
  return {
    tags: ['!dev'],
    args,
    argTypes,
    parameters,
    render: (resolvedArgs) => {
      const markup = renderMarkup(resolvedArgs);
      return `<div class="pg"><div class="pg__stage">${wrapStage(markup, resolvedArgs)}</div>`
        + `<div class="pg__code"><div class="pg__code-head"><p class="pg__code-label">${T.markup}</p>`
        + `<button class="aipim-icon-button aipim-icon-button--sm" type="button" data-pg-copy aria-label="${T.copyMarkup}" title="${T.copyMarkup}">${icon('copy')}</button></div>`
        + `<pre class="pg__pre"><code>${escapeHtml(prettyHtml(markup))}</code></pre></div></div>`;
    },
  };
}
