import raw from '@docs/components/badge.md?raw';
import { allStates, doDont, iconic, meta, section } from '../_stories.js';

export default {
  title: 'Badge',
  id: 'atoms-badge',
  tags: ['autodocs'],
  parameters: meta('badge', '567:30581', raw),
};

export const Default = iconic('badge');
export const AllStates = allStates(() => section('h-badge'));
export const DoAndDont = doDont('badge', raw);
