import raw from '@docs/components/avatar.md?raw';
import { allStates, doDont, iconic, meta, section } from '../_stories.js';

export default {
  title: 'Avatar',
  id: 'atoms-avatar',
  tags: ['autodocs'],
  parameters: meta('avatar', '1433:1723', raw),
};

export const Default = iconic('avatar');
export const AllStates = allStates(() => section('h-avatar'));
export const DoAndDont = doDont('avatar', raw);
