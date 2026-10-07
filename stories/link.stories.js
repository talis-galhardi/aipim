import raw from '../docs/en/components/link.md?raw';
import { doDont } from './_dodont.js';
import { meta, section } from './_gallery.js';

export default {
  title: 'Components/Link',
  tags: ['autodocs'],
  parameters: meta('link', '60:239', raw),
};

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => section('h-link') };

// One right and one wrong example, with the captions of the spec.
export const DoAndDont = doDont('link', raw);
