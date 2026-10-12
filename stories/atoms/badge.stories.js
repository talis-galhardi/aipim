import raw from '@docs/components/badge.md?raw';
import { doDont } from '../_dodont.js';
import { iconic } from '../_iconic.js';
import { T } from '../../.storybook/i18n.js';
import { meta, section } from '../_gallery.js';

export default {
  title: 'Badge',
  id: 'atoms-badge',
  tags: ['autodocs'],
  parameters: meta('badge', '567:30581', raw),
};

// The most recognizable variation: the first story, so it is on top of the page and in the thumbnail.
export const Default = iconic('badge');

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { tags: ['!dev'], name: T.allStates, render: () => section('h-badge') };

// One right and one wrong example, with the captions of the spec.
export const DoAndDont = doDont('badge', raw);
