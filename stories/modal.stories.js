import raw from '../docs/en/components/modal.md?raw';
import { meta, section } from './_gallery.js';

export default {
  title: 'Components/Modal',
  tags: ['autodocs'],
  parameters: meta('modal', '104:563', raw),
};

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => section('h-modal') };
