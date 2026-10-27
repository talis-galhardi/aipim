import raw from '@docs/components/list-item.md?raw';
import { allStates, doDont, iconic, meta, section } from '../_stories.js';

export default {
  title: 'List item',
  id: 'molecules-list-item',
  tags: ['autodocs'],
  parameters: meta('list-item', '1434:1849', raw),
};

export const Default = iconic('list-item');
export const AllStates = allStates(() => section('h-listitem'));
export const DoAndDont = doDont('list-item', raw);
