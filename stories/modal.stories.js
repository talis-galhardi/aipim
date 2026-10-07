import raw from '../docs/en/components/modal.md?raw';
import { doDont } from './_dodont.js';
import { iconic } from './_iconic.js';
import { meta, section } from './_gallery.js';

export default {
  title: 'Organisms/Modal',
  tags: ['autodocs'],
  parameters: meta('modal', '104:563', raw),
};

// The most recognizable variation: the first story, so it is on top of the page and in the thumbnail.
export const Default = iconic('modal');

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => section('h-modal') };


// One right and one wrong example, with the captions of the spec.
export const DoAndDont = doDont('modal', raw);
