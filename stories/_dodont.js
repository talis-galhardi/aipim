// "Do and don't" stories: one right and one wrong example per component, drawn with the real components.
// The captions come from the "Do and don't" section of each spec, so the text has one source.
// The wrong examples break a rule on purpose (a field with no label, an icon with no name), so these stories skip axe.

export const icon = (name, cls = '') => `<svg class="aipim-icon ${cls}" aria-hidden="true"><use href="#aipim-${name}"></use></svg>`;
export const button = (label, cls = '') => `<button class="aipim-button ${cls}" type="button"><span>${label}</span></button>`;
export const iconButton = (name, label) => `<button class="aipim-icon-button" type="button"${label ? ` aria-label="${label}"` : ''}>${icon(name)}</button>`;
export const stack = (inner, gap = 16) => `<div style="display:flex;flex-direction:column;gap:${gap}px;align-items:flex-start">${inner}</div>`;
export const wide = (inner) => `<div style="inline-size:390px;max-inline-size:100%">${inner}</div>`;
const note = (text) => `<code class="dd__code">${text}</code>`;

export const checkbox = (label, checked) => `<label class="aipim-checkbox"><input class="aipim-checkbox__input" type="checkbox"${checked ? ' checked' : ''}><span class="aipim-checkbox__box" aria-hidden="true"></span><span class="aipim-checkbox__label">${label}</span></label>`;
export const radio = (name, label, checked) => `<label class="aipim-radio"><input class="aipim-radio__input" type="radio" name="${name}"${checked ? ' checked' : ''}><span class="aipim-radio__circle" aria-hidden="true"></span><span class="aipim-radio__label">${label}</span></label>`;
export const switchEl = (label, on) => `<label class="aipim-switch"><input class="aipim-switch__input" type="checkbox" role="switch"${on ? ' checked' : ''}><span class="aipim-switch__track" aria-hidden="true"></span><span class="aipim-switch__label">${label}</span></label>`;
export const alert = (kind, title, message) => `<div class="aipim-alert aipim-alert--${kind}" role="${kind === 'error' ? 'alert' : 'status'}">${icon(kind === 'error' ? 'error' : 'info', 'aipim-alert__icon')}<div class="aipim-alert__content">${title ? `<p class="aipim-alert__title">${title}</p>` : ''}<p class="aipim-alert__message">${message}</p></div></div>`;
export const toast = (kind, message, undo) => `<div class="aipim-toast aipim-toast--${kind}" style="animation:none">${icon(kind === 'error' ? 'error' : 'success', 'aipim-toast__icon')}<p class="aipim-toast__message">${message}</p>${undo ? `<button class="aipim-button aipim-button--ghost aipim-button--sm" type="button"><span>Undo</span></button>` : ''}</div>`;
export const dialog = (title, body, actions) => `<dialog open class="aipim-modal" style="position:static;margin:0" aria-label="${title}"><div class="aipim-modal__header"><h2 class="aipim-modal__title">${title}</h2>${iconButton('close', 'Close')}</div><p class="aipim-modal__body">${body}</p><div class="aipim-modal__actions">${actions}</div></dialog>`;
export const tabBar = (labels) => wide(`<nav class="aipim-tab-bar" aria-label="Main">${[['home', 'Home'], ['search', 'Search'], ['bell', 'Alerts'], ['chat', 'Messages']].map(([i, l], k) => `<a class="aipim-tab-bar__item" href="#"${k === 0 ? ' aria-current="page"' : ''}><span class="aipim-tab-bar__icon">${icon(i)}</span>${labels ? `<span class="aipim-tab-bar__label">${l}</span>` : ''}</a>`).join('')}</nav>`);
export const tabs = (names) => `<div class="aipim-tabs" role="tablist" aria-label="Sections">${names.map((n, k) => `<button class="aipim-tab" role="tab" aria-selected="${k === 0}" type="button"><span>${n}</span></button>`).join('')}</div>`;
export const topBar = (title) => wide(`<header class="aipim-top-bar"><a class="aipim-icon-button" href="#" aria-label="Back">${icon('arrow-left')}</a><h1 class="aipim-top-bar__title">${title}</h1>${iconButton('search', 'Search')}${iconButton('more-vertical', 'More actions')}</header>`);
export const card = (title, text, extra = '') => `<article class="aipim-card aipim-card--interactive"><div class="aipim-card__body"><h3 class="aipim-card__title"><a class="aipim-card__link" href="#">${title}</a></h3><p class="aipim-card__text">${text}</p>${extra}</div></article>`;

import { a11yRules } from './_gallery.js';

// [do, don't] markup for each component.
export const EXAMPLES = {
  alert: [
    alert('error', 'Payment declined', 'Check your card details and try again.'),
    alert('error', '', 'Something went wrong.'),
  ],
  button: [
    stack(`<div style="display:flex;gap:12px">${button('Save')}${button('Cancel', 'aipim-button--outline')}</div>`),
    stack(`<div style="display:flex;gap:12px">${button('Save')}${button('Cancel')}</div>`),
  ],
  card: [
    card('Spring collection', 'One link for the whole card: it is one focus stop.', '<span class="aipim-card__action">Learn more</span>'),
    `<article class="aipim-card"><div class="aipim-card__body"><h3 class="aipim-card__title">Spring collection</h3><article class="aipim-card"><div class="aipim-card__body"><h3 class="aipim-card__title">Linen shirt</h3><p class="aipim-card__text">A card inside a card.</p></div></article></div></article>`,
  ],
  checkbox: [
    `<fieldset class="aipim-choice-group"><legend class="aipim-choice-group__legend">Notify me by</legend>${checkbox('Email', true)}${checkbox('SMS', false)}${checkbox('Push', true)}</fieldset>`,
    `<fieldset class="aipim-choice-group"><legend class="aipim-choice-group__legend">Plan</legend>${checkbox('Monthly', true)}${checkbox('Yearly', true)}</fieldset>`,
  ],
  'empty-state': [
    `<div class="aipim-empty-state"><h2 class="aipim-empty-state__title">No projects yet</h2><p class="aipim-empty-state__description">Create your first project to get started.</p>${button('Create project')}</div>`,
    `<div class="aipim-empty-state"><h2 class="aipim-empty-state__title">Nothing here</h2></div>`,
  ],
  'icon-button': [
    stack(`<div style="display:flex;gap:12px">${iconButton('close', 'Close')}${iconButton('search', 'Search')}${iconButton('add', 'Add')}</div>${note('aria-label="Close"')}`, 12),
    stack(`<div style="display:flex;gap:12px">${iconButton('image')}${iconButton('loading')}${iconButton('external-link')}</div>${note('no aria-label')}`, 12),
  ],
  link: [
    `<p style="margin:0">Read the <a class="aipim-link" href="#">accessibility notes</a> before you ship.</p>`,
    `<p style="margin:0"><a class="aipim-link" href="#">Click here</a> to read the accessibility notes before you ship.</p>`,
  ],
  modal: [
    dialog('Delete project?', 'This cannot be undone. All files in the project will be removed.', `${button('Cancel', 'aipim-button--outline')}${button('Confirm')}`),
    dialog('Welcome back!', 'Here is a tip: you can press the slash key to search from any page.', button('Got it')),
  ],
  radio: [
    `<fieldset class="aipim-choice-group"><legend class="aipim-choice-group__legend">Plan</legend>${radio('plan-do', 'Monthly', true)}${radio('plan-do', 'Yearly', false)}${radio('plan-do', 'Lifetime', false)}</fieldset>`,
    `<div class="aipim-choice-group">${radio('plan-dont', 'Send me the newsletter', true)}</div>`,
  ],
  switch: [
    `<div class="aipim-choice-group">${switchEl('Notifications', true)}</div>`,
    `<div class="aipim-choice-group">${switchEl('Turn notifications on', true)}</div>`,
  ],
  'tab-bar': [tabBar(true), tabBar(false)],
  tabs: [
    tabs(['Overview', 'Details', 'Activity']),
    tabs(['Overview']),
  ],
  badge: [
    `<span style="display:flex;align-items:center;gap:var(--aipim-space-12)"><span class="aipim-badge" aria-hidden="true">1</span><span>Create the file</span></span>`,
    `<span class="aipim-badge aipim-badge--filled" aria-hidden="true">3</span>`,
  ],
  tag: [
    `<span class="aipim-tag"><span>Design</span></span>`,
    `<span class="aipim-tag"><span>This project is about design</span></span>`,
  ],
  'text-field': [
    `<div class="aipim-field"><label class="aipim-field__label" for="dd-do">Date of birth</label><input class="aipim-field__control" id="dd-do" type="text" aria-describedby="dd-do-help" placeholder="DD/MM/YYYY"><p class="aipim-field__helper" id="dd-do-help"><span>Use day, month and year</span></p></div>`,
    `<div class="aipim-field"><input class="aipim-field__control" type="text" placeholder="Date of birth"></div>`,
  ],
  toast: [
    toast('success', 'Item deleted.', true),
    toast('error', 'Payment failed. Check your card details.', false),
  ],
  'top-bar': [
    topBar('Messages'),
    topBar('Quarterly report for the northern region'),
  ],
};

// Turns "Do: say what happened (`code`)." into HTML, without the leading label.
const caption = (raw, label) => {
  const line = raw.split('\n').find((l) => l.startsWith(`- ${label}:`)) || '';
  return line.replace(`- ${label}:`, '').trim().replace(/`([^`]+)`/g, '<code>$1</code>');
};

export function doDont(name, raw) {
  const [good, bad] = EXAMPLES[name];
  const pane = (kind, label, markup) => `<figure class="dd__item dd__item--${kind}"><div class="dd__stage">${markup}</div><figcaption class="dd__caption"><svg class="aipim-icon" aria-hidden="true"><use href="#aipim-${kind === 'do' ? 'success' : 'error'}"></use></svg><span><strong>${label === 'Do' ? 'Do' : 'Don’t'}.</strong> ${caption(raw, label === 'Do' ? 'Do' : 'Don\'t')}</span></figcaption></figure>`;
  return {
    name: 'Do and don’t',
    // The wrong examples break these rules on purpose (an icon button or a tab with no name), and two bars on one page repeat a landmark.
    parameters: { a11y: { test: 'off', config: a11yRules('button-name', 'link-name', 'landmark-unique', 'landmark-no-duplicate-banner') } },
    render: () => `<div class="dd">${pane('do', 'Do', good)}${pane('dont', 'Don\'t', bad)}</div>`,
  };
}
