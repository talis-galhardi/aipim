import raw from '@docs/components/tag.md?raw';
import { allStates, doDont, iconic, meta, section } from '../_stories.js';

export default {
  title: 'Tag',
  id: 'atoms-tag',
  tags: ['autodocs'],
  parameters: meta('tag', '104:431', raw),
};

export const Default = iconic('tag');
export const AllStates = allStates(() => section('h-tag'));
export const DoAndDont = doDont('tag', raw);
