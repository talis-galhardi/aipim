// What every component story file uses, in one import. Each component page has the same three stories:
// - Default: the most recognizable variation, first, so it is on top of the page and in the thumbnail (_iconic.js).
// - All states: every state and variant, cut from components/web/examples/index.html (_gallery.js).
// - Do and don't: one right and one wrong example, with the captions of the spec (_dodont.js).
// A fourth, Playground, is opt-in (ROADMAP.md, "Until then, in v1.x"): controls that change classes and
// attributes, with the markup they produce under it, for the components whose variants combine.
// All four are hidden from the sidebar: a component is one page there.
import { T } from '../.storybook/i18n.js';
import { stage } from './_stage.js';

export { a11yRules, meta, parts, section } from './_gallery.js';
export { doDont } from './_dodont.js';
export { iconic } from './_iconic.js';

export const allStates = (render) => ({ tags: ['!dev'], name: T.allStates, render });

// A Playground story: `renderMarkup(args)` builds the real markup from the controls, shown live and, under it,
// as text to copy. `wrapStage` only changes how the live preview sits on the canvas; the code block always shows
// renderMarkup's own output, the markup a person would actually copy into their page.
export function playground({ args, argTypes, parameters, renderMarkup, wrapStage = (markup) => markup }) {
  return {
    tags: ['!dev'],
    args,
    argTypes,
    parameters,
    render: (resolvedArgs) => {
      const markup = renderMarkup(resolvedArgs);
      return stage(wrapStage(markup, resolvedArgs), markup);
    },
  };
}
