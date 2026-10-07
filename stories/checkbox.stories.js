import raw from '../docs/en/components/checkbox.md?raw';
import { doDont } from './_dodont.js';
import { iconic } from './_iconic.js';
import { meta, parts } from './_gallery.js';

export default {
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  parameters: meta('checkbox', '74:83', raw),
};

// The most recognizable variation: the first story, so it is on top of the page and in the thumbnail.
export const Default = iconic('checkbox');

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => parts('h-choice', [0]) };

// One right and one wrong example, with the captions of the spec.
export const DoAndDont = doDont('checkbox', raw);
