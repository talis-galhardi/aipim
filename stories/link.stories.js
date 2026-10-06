import raw from '../docs/en/components/link.md?raw';
import { meta, section } from './_gallery.js';

export default {
  title: 'Components/Link',
  tags: ['autodocs'],
  parameters: meta('link', '60:239', raw),
};

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => section('h-link') };
