import raw from '../docs/en/components/badge.md?raw';
import { doDont } from './_dodont.js';
import { iconic } from './_iconic.js';
import { meta, section } from './_gallery.js';

export default {
  title: 'Atoms/Badge',
  tags: ['autodocs'],
  parameters: meta('badge', '567:30581', raw),
};

// The most recognizable variation: the first story, so it is on top of the page and in the thumbnail.
export const Default = iconic('badge');

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => section('h-badge') };

// One right and one wrong example, with the captions of the spec.
export const DoAndDont = doDont('badge', raw);
