import raw from '@docs/components/tab-bar.md?raw';
import { doDont } from '../_dodont.js';
import { iconic } from '../_iconic.js';
import { T } from '../../.storybook/i18n.js';
import { meta, parts } from '../_gallery.js';

export default {
  title: 'Tab bar',
  id: 'organisms-tab-bar',
  tags: ['autodocs'],
  parameters: meta('tab-bar', '92:354', raw),
};

// The most recognizable variation: the first story, so it is on top of the page and in the thumbnail.
export const Default = iconic('tab-bar');

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { tags: ['!dev'], name: T.allStates, render: () => parts('h-nav', [2]) };

// One right and one wrong example, with the captions of the spec.
export const DoAndDont = doDont('tab-bar', raw);
