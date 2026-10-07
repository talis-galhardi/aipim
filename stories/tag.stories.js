import raw from '../docs/en/components/tag.md?raw';
import { doDont } from './_dodont.js';
import { iconic } from './_iconic.js';
import { meta, section } from './_gallery.js';

export default {
  title: 'Atoms/Tag',
  tags: ['autodocs'],
  parameters: meta('tag', '104:431', raw),
};

// The most recognizable variation: the first story, so it is on top of the page and in the thumbnail.
export const Default = iconic('tag');

// Every state and variant, cut from components/web/examples/index.html.
export const AllStates = { name: 'All states', render: () => section('h-tag') };

// One right and one wrong example, with the captions of the spec.
export const DoAndDont = doDont('tag', raw);
