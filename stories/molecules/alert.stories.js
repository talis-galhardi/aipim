import raw from '@docs/components/alert.md?raw';
import { icon } from '../_dodont.js';
import { allStates, doDont, iconic, meta, playground, section } from '../_stories.js';

export default {
  title: 'Alert',
  id: 'molecules-alert',
  tags: ['autodocs'],
  parameters: meta('alert', '83:188', raw),
};

export const Default = iconic('alert');
export const AllStates = allStates(() => section('h-alert'));
export const DoAndDont = doDont('alert', raw);

// Kind, an optional title (clear it for the message-only variant) and the dismiss button. The role follows the
// kind, as aipim.js and the spec do: role="alert" for error, role="status" for the rest.
export const Playground = playground({
  args: { kind: 'info', title: 'Title', message: 'Check your card and try again.', dismissible: true },
  argTypes: { kind: { control: 'inline-radio', options: ['info', 'success', 'warning', 'error'] } },
  renderMarkup: ({ kind, title, message, dismissible }) => {
    const cls = kind !== 'info' ? ` aipim-alert--${kind}` : '';
    const role = kind === 'error' ? 'alert' : 'status';
    const dismiss = dismissible ? `<button class="aipim-dismiss" type="button" aria-label="Dismiss" data-aipim-dismiss>${icon('close')}</button>` : '';
    return `<div class="aipim-alert${cls}" role="${role}">${icon(kind, 'aipim-alert__icon')}<div class="aipim-alert__content">${title ? `<p class="aipim-alert__title">${title}</p>` : ''}<p class="aipim-alert__message">${message}</p></div>${dismiss}</div>`;
  },
});
