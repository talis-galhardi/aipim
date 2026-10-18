import raw from '@docs/components/toast.md?raw';
import { allStates, doDont, iconic, meta, parts } from '../_stories.js';

export default {
  title: 'Toast',
  id: 'molecules-toast',
  tags: ['autodocs'],
  parameters: meta('toast', '83:326', raw),
};

export const Default = iconic('toast');
export const AllStates = allStates(() => parts('h-toast'));
export const DoAndDont = doDont('toast', raw);
