import raw from '../docs/en/components/modal.md?raw';
import { doDont } from './_dodont.js';
import { meta, section } from './_gallery.js';

export default {
  title: 'Components/Modal',
  tags: ['autodocs'],
  parameters: meta('modal', '104:563', raw),
};

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => section('h-modal') };

// The dialog already open, so the page and its snapshot show what a person sees. It is open without showModal(), so no scrim.
export const Open = {
  name: 'Open',
  render: () => section('h-modal')
    .replace(/<div class="row">[\s\S]*?<\/div>\s*(?=<dialog)/, '')
    .replace('<dialog class="aipim-modal"', '<dialog open style="position:static;margin:0" class="aipim-modal"'),
};

// One right and one wrong example, with the captions of the spec.
export const DoAndDont = doDont('modal', raw);
