import { T } from '../../.storybook/i18n.js';
import raw from '@docs/components/top-bar.md?raw';
import { doDont } from '../_dodont.js';
import { iconic } from '../_iconic.js';
import { a11yRules, meta, parts } from '../_gallery.js';

export default {
  title: 'Top bar',
  id: 'organisms-top-bar',
  tags: ['autodocs'],
  parameters: { ...meta('top-bar', '93:314', raw), a11y: { config: a11yRules('landmark-unique', 'landmark-no-duplicate-banner') } },
};

// The most recognizable variation: the first story, so it is on top of the page and in the thumbnail.
export const Default = iconic('top-bar');

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { tags: ['!dev'], name: T.allStates, render: () => parts('h-nav', [0, 1]) };

// One right and one wrong example, with the captions of the spec.
export const DoAndDont = doDont('top-bar', raw);
