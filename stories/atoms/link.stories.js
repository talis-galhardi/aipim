import raw from '@docs/components/link.md?raw';
import { allStates, doDont, iconic, meta, section } from '../_stories.js';

export default {
  title: 'Link',
  id: 'atoms-link',
  tags: ['autodocs'],
  parameters: meta('link', '60:239', raw),
};

export const Default = iconic('link');
export const AllStates = allStates(() => section('h-link'));
export const DoAndDont = doDont('link', raw);
