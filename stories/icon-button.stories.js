import raw from '../docs/en/components/icon-button.md?raw';
import { meta, section } from './_gallery.js';

export default {
  title: 'Components/Icon button',
  tags: ['autodocs'],
  parameters: meta('icon-button', '175:348', raw),
};

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => section('h-iconbutton') };
