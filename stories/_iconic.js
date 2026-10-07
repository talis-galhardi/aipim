// The "Default" story of each component: its most recognizable variation, alone and a little larger.
// It is the first story, so it is the one on top of the docs page and the one Chromatic shows first.
// The full set of states stays in "All states".
import { icon, button, iconButton, checkbox, radio, switchEl, alert, toast, dialog, tabBar, topBar, card } from './_dodont.js';

const ICONIC = {
  alert: alert('error', 'Payment declined', 'Check your card details and try again.'),
  button: button('Save'),
  card: `<article class="aipim-card aipim-card--interactive" style="inline-size:320px"><div class="aipim-card__media">${icon('image', 'aipim-icon--lg')}</div><div class="aipim-card__body"><h3 class="aipim-card__title"><a class="aipim-card__link" href="#">Interactive card</a></h3><p class="aipim-card__text">The whole card is one link and one focus stop.</p><span class="aipim-card__action">Learn more</span></div></article>`,
  checkbox: `<div class="aipim-choice-group">${checkbox('Email me the receipt', true)}</div>`,
  'empty-state': `<div class="aipim-empty-state"><h2 class="aipim-empty-state__title">No projects yet</h2><p class="aipim-empty-state__description">Create your first project to get started.</p>${button('Create project')}</div>`,
  'icon-button': iconButton('close', 'Close'),
  link: '<p style="margin:0">Read the <a class="aipim-link" href="#">accessibility notes</a> before you ship.</p>',
  modal: dialog('Delete project?', 'This cannot be undone. All files in the project will be removed.', `${button('Cancel', 'aipim-button--outline')}${button('Confirm')}`),
  radio: `<fieldset class="aipim-choice-group"><legend class="aipim-choice-group__legend">Plan</legend>${radio('plan-default', 'Monthly', true)}${radio('plan-default', 'Yearly', false)}</fieldset>`,
  switch: `<div class="aipim-choice-group">${switchEl('Notifications', true)}</div>`,
  'tab-bar': tabBar(true),
  tabs: `<div class="aipim-tabs" role="tablist" aria-label="Sections"><button class="aipim-tab" role="tab" id="d-t1" aria-selected="true" aria-controls="d-p1" type="button"><span>Overview</span></button><button class="aipim-tab" role="tab" id="d-t2" aria-selected="false" aria-controls="d-p2" type="button"><span>Details</span></button><button class="aipim-tab" role="tab" id="d-t3" aria-selected="false" aria-controls="d-p3" type="button"><span>Activity</span></button></div><div role="tabpanel" id="d-p1" aria-labelledby="d-t1" tabindex="0" style="padding-block:var(--aipim-space-16)">Overview content.</div><div role="tabpanel" id="d-p2" aria-labelledby="d-t2" tabindex="0" hidden></div><div role="tabpanel" id="d-p3" aria-labelledby="d-t3" tabindex="0" hidden></div>`,
  tag: '<span class="aipim-tag aipim-tag--accent"><span>Design</span></span>',
  'text-field': `<div class="aipim-field" style="inline-size:320px"><label class="aipim-field__label" for="d-f1">Email</label><input class="aipim-field__control" id="d-f1" type="text" aria-describedby="d-f1-help" placeholder="name@example.com"><p class="aipim-field__helper" id="d-f1-help"><span>Used only for receipts</span></p></div>`,
  toast: toast('success', 'Item saved.', true),
  'top-bar': topBar('Messages'),
};

export function iconic(name) {
  return {
    name: 'Default',
    // Zoomed so the component fills a thumbnail; the full-size components are in "All states".
    render: () => `<div class="aipim-sb__zoom">${ICONIC[name]}</div>`,
  };
}
