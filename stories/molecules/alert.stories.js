import raw from '@docs/components/alert.md?raw';
import { allStates, doDont, iconic, meta, section } from '../_stories.js';

export default {
  title: 'Alert',
  id: 'molecules-alert',
  tags: ['autodocs'],
  parameters: meta('alert', '83:188', raw),
};

export const Default = iconic('alert');
export const AllStates = allStates(() => section('h-alert'));
export const DoAndDont = doDont('alert', raw);
