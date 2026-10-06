import raw from '../docs/en/components/card.md?raw';
import { meta, section } from './_gallery.js';

export default {
  title: 'Components/Card',
  tags: ['autodocs'],
  parameters: meta('card', '104:362', raw),
};

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => section('h-card') };
