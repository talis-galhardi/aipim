import raw from '@docs/components/modal.md?raw';
import { doDont } from '../_dodont.js';
import { iconic } from '../_iconic.js';
import { T } from '../../.storybook/i18n.js';
import { meta, section } from '../_gallery.js';

export default {
  title: 'Modal',
  id: 'organisms-modal',
  tags: ['autodocs'],
  parameters: meta('modal', '104:563', raw),
};

// The most recognizable variation: the first story, so it is on top of the page and in the thumbnail.
export const Default = iconic('modal');

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { tags: ['!dev'], name: T.allStates, render: () => section('h-modal') };


// One right and one wrong example, with the captions of the spec.
export const DoAndDont = doDont('modal', raw);
