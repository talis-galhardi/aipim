import raw from '../docs/en/components/toast.md?raw';
import { doDont } from './_dodont.js';
import { meta, parts } from './_gallery.js';

export default {
  title: 'Components/Toast',
  tags: ['autodocs'],
  parameters: meta('toast', '83:326', raw),
};

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => parts('h-toast') };

// One right and one wrong example, with the captions of the spec.
export const DoAndDont = doDont('toast', raw);
