import raw from '../docs/en/components/tabs.md?raw';
import { doDont } from './_dodont.js';
import { meta, parts } from './_gallery.js';

export default {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  parameters: meta('tabs', '92:398', raw),
};

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => parts('h-nav', [3]) };

// One right and one wrong example, with the captions of the spec.
export const DoAndDont = doDont('tabs', raw);
