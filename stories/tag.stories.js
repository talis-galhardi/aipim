import raw from '../docs/en/components/tag.md?raw';
import { doDont } from './_dodont.js';
import { meta, section } from './_gallery.js';

export default {
  title: 'Components/Tag',
  tags: ['autodocs'],
  parameters: meta('tag', '104:431', raw),
};

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => section('h-tag') };

// One right and one wrong example, with the captions of the spec.
export const DoAndDont = doDont('tag', raw);
