import raw from '../docs/en/components/top-bar.md?raw';
import { doDont } from './_dodont.js';
import { meta, parts } from './_gallery.js';

export default {
  title: 'Components/Top bar',
  tags: ['autodocs'],
  parameters: meta('top-bar', '93:314', raw),
};

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => parts('h-nav', [0, 1]) };

// One right and one wrong example, with the captions of the spec.
export const DoAndDont = doDont('top-bar', raw);
