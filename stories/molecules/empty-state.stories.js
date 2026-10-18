import raw from '@docs/components/empty-state.md?raw';
import { allStates, doDont, iconic, meta, section } from '../_stories.js';

export default {
  title: 'Empty state',
  id: 'molecules-empty-state',
  tags: ['autodocs'],
  parameters: meta('empty-state', '84:166', raw),
};

export const Default = iconic('empty-state');
export const AllStates = allStates(() => section('h-empty'));
export const DoAndDont = doDont('empty-state', raw);
