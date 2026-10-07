import raw from '../docs/en/components/tabs.md?raw';
import { doDont } from './_dodont.js';
import { iconic } from './_iconic.js';
import { meta, parts } from './_gallery.js';

export default {
  title: 'Molecules/Tabs',
  tags: ['autodocs'],
  parameters: meta('tabs', '92:398', raw),
};

// The most recognizable variation: the first story, so it is on top of the page and in the thumbnail.
export const Default = iconic('tabs');

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => parts('h-nav', [3]) };

// One right and one wrong example, with the captions of the spec.
export const DoAndDont = doDont('tabs', raw);
