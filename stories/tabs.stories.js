import raw from '../docs/en/components/tabs.md?raw';
import { meta, parts } from './_gallery.js';

export default {
  title: 'Components/Tabs',
  tags: ['autodocs'],
  parameters: meta('tabs', '92:398', raw),
};

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => parts('h-nav', [3]) };
