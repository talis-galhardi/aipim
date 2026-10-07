import raw from '../docs/en/components/icon-button.md?raw';
import { doDont } from './_dodont.js';
import { iconic } from './_iconic.js';
import { meta, section } from './_gallery.js';

export default {
  title: 'Components/Icon button',
  tags: ['autodocs'],
  parameters: meta('icon-button', '175:348', raw),
};

// The most recognizable variation: the first story, so it is on top of the page and in the thumbnail.
export const Default = iconic('icon-button');

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => section('h-iconbutton') };

// One right and one wrong example, with the captions of the spec.
export const DoAndDont = doDont('icon-button', raw);
