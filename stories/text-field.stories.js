import raw from '../docs/en/components/text-field.md?raw';
import { meta, section } from './_gallery.js';

export default {
  title: 'Components/Text field',
  tags: ['autodocs'],
  parameters: meta('text-field', '73:308', raw),
};

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => section('h-field') };
