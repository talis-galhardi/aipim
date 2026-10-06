import raw from '../docs/en/components/alert.md?raw';
import { meta, section } from './_gallery.js';

export default {
  title: 'Components/Alert',
  tags: ['autodocs'],
  parameters: meta('alert', '83:188', raw),
};

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => section('h-alert') };
