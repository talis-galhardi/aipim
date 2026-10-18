// What every component story file uses, in one import. Each component page has the same three stories:
// - Default: the most recognizable variation, first, so it is on top of the page and in the thumbnail (_iconic.js).
// - All states: every state and variant, cut from components/web/examples/index.html (_gallery.js).
// - Do and don't: one right and one wrong example, with the captions of the spec (_dodont.js).
// All three are hidden from the sidebar: a component is one page there.
import { T } from '../.storybook/i18n.js';

export { a11yRules, meta, parts, section } from './_gallery.js';
export { doDont } from './_dodont.js';
export { iconic } from './_iconic.js';

export const allStates = (render) => ({ tags: ['!dev'], name: T.allStates, render });
