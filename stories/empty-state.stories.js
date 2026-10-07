import raw from '../docs/en/components/empty-state.md?raw';
import { doDont } from './_dodont.js';
import { iconic } from './_iconic.js';
import { meta, section } from './_gallery.js';

export default {
  title: 'Molecules/Empty state',
  tags: ['autodocs'],
  parameters: meta('empty-state', '84:166', raw),
};

// The most recognizable variation: the first story, so it is on top of the page and in the thumbnail.
export const Default = iconic('empty-state');

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => section('h-empty') };

// One right and one wrong example, with the captions of the spec.
export const DoAndDont = doDont('empty-state', raw);
