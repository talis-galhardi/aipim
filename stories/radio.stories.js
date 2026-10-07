import raw from '../docs/en/components/radio.md?raw';
import { doDont } from './_dodont.js';
import { meta, parts } from './_gallery.js';

export default {
  title: 'Components/Radio',
  tags: ['autodocs'],
  parameters: meta('radio', '74:114', raw),
};

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => parts('h-choice', [1, 2]) };

// One right and one wrong example, with the captions of the spec.
export const DoAndDont = doDont('radio', raw);
