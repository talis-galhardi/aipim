import raw from '@docs/components/card.md?raw';
import { doDont } from '../_dodont.js';
import { iconic } from '../_iconic.js';
import { T } from '../../.storybook/i18n.js';
import { meta, section } from '../_gallery.js';

export default {
  title: 'Card',
  id: 'molecules-card',
  tags: ['autodocs'],
  parameters: meta('card', '104:362', raw),
};

// The most recognizable variation: the first story, so it is on top of the page and in the thumbnail.
export const Default = iconic('card');

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { tags: ['!dev'], name: T.allStates, render: () => section('h-card') };

// One right and one wrong example, with the captions of the spec.
export const DoAndDont = doDont('card', raw);
