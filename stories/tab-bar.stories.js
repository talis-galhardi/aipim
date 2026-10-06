import raw from '../docs/en/components/tab-bar.md?raw';
import { meta, parts } from './_gallery.js';

export default {
  title: 'Components/Tab bar',
  tags: ['autodocs'],
  parameters: meta('tab-bar', '92:354', raw),
};

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => parts('h-nav', [2]) };
