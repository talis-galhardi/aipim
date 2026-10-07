import raw from '../docs/en/components/tab-bar.md?raw';
import { doDont } from './_dodont.js';
import { meta, parts } from './_gallery.js';

export default {
  title: 'Components/Tab bar',
  tags: ['autodocs'],
  parameters: meta('tab-bar', '92:354', raw),
};

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => parts('h-nav', [2]) };

// One right and one wrong example, with the captions of the spec.
export const DoAndDont = doDont('tab-bar', raw);
