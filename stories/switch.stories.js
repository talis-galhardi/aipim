import raw from '../docs/en/components/switch.md?raw';
import { meta, parts } from './_gallery.js';

export default {
  title: 'Components/Switch',
  tags: ['autodocs'],
  parameters: meta('switch', '74:149', raw),
};

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => parts('h-choice', [3]) };
