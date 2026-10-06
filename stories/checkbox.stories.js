import raw from '../docs/en/components/checkbox.md?raw';
import { meta, parts } from './_gallery.js';

export default {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  parameters: meta('checkbox', '74:83', raw),
};

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => parts('h-choice', [0]) };
