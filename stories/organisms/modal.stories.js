import raw from '@docs/components/modal.md?raw';
import { allStates, doDont, iconic, meta, section } from '../_stories.js';

export default {
  title: 'Modal',
  id: 'organisms-modal',
  tags: ['autodocs'],
  parameters: meta('modal', '104:563', raw),
};

export const Default = iconic('modal');
export const AllStates = allStates(() => section('h-modal'));
export const DoAndDont = doDont('modal', raw);
