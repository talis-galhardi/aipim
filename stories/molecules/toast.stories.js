import raw from '@docs/components/toast.md?raw';
import { doDont } from '../_dodont.js';
import { iconic } from '../_iconic.js';
import { T } from '../../.storybook/i18n.js';
import { meta, parts } from '../_gallery.js';

export default {
  title: 'Toast',
  id: 'molecules-toast',
  tags: ['autodocs'],
  parameters: meta('toast', '83:326', raw),
};

// The most recognizable variation: the first story, so it is on top of the page and in the thumbnail.
export const Default = iconic('toast');

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { tags: ['!dev'], name: T.allStates, render: () => parts('h-toast') };

// One right and one wrong example, with the captions of the spec.
export const DoAndDont = doDont('toast', raw);
