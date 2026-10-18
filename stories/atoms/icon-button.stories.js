import raw from '@docs/components/icon-button.md?raw';
import { allStates, doDont, iconic, meta, section } from '../_stories.js';

export default {
  title: 'Icon button',
  id: 'atoms-icon-button',
  tags: ['autodocs'],
  parameters: meta('icon-button', '175:348', raw),
};

export const Default = iconic('icon-button');
export const AllStates = allStates(() => section('h-iconbutton'));
export const DoAndDont = doDont('icon-button', raw);
