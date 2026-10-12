import raw from '@docs/components/radio.md?raw';
import { doDont } from '../_dodont.js';
import { iconic } from '../_iconic.js';
import { T } from '../../.storybook/i18n.js';
import { meta, parts } from '../_gallery.js';

export default {
  title: 'Radio',
  id: 'atoms-radio',
  tags: ['autodocs'],
  parameters: meta('radio', '74:114', raw),
};

// The most recognizable variation: the first story, so it is on top of the page and in the thumbnail.
export const Default = iconic('radio');

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { tags: ['!dev'], name: T.allStates, render: () => parts('h-choice', [1, 2]) };

// One right and one wrong example, with the captions of the spec.
export const DoAndDont = doDont('radio', raw);
