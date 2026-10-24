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
export const toast = (kind, message, undo) => `<div class="aipim-toast aipim-toast--${kind}" style="animation:none">${icon(kind === 'error' ? 'error' : 'success', 'aipim-toast__icon')}<p class="aipim-toast__message">${message}</p>${undo ? `<button class="aipim-button aipim-button--ghost aipim-button--sm" type="button"><span>${L('Undo', 'Desfazer')}</span></button>` : ''}</div>`;
export const dialog = (title, body, actions) => `<dialog open class="aipim-modal" style="position:static;margin:0" aria-label="${title}"><div class="aipim-modal__header"><h2 class="aipim-modal__title">${title}</h2>${iconButton('close', L('Close', 'Fechar'))}</div><p class="aipim-modal__body">${body}</p><div class="aipim-modal__actions">${actions}</div></dialog>`;
export const tabBar = (labels) => wide(`<nav class="aipim-tab-bar" aria-label="${L('Main', 'Principal')}">${[['home', L('Home', 'Início')], ['search', L('Search', 'Buscar')], ['bell', L('Alerts', 'Alertas')], ['chat', L('Messages', 'Mensagens')]].map(([i, l], k) => `<a class="aipim-tab-bar__item" href="#"${k === 0 ? ' aria-current="page"' : ''}><span class="aipim-tab-bar__icon">${icon(i)}</span>${labels ? `<span class="aipim-tab-bar__label">${l}</span>` : ''}</a>`).join('')}</nav>`);
export const tabs = (names) => `<div class="aipim-tabs" role="tablist" aria-label="${L('Sections', 'Seções')}">${names.map((n, k) => `<button class="aipim-tab" role="tab" aria-selected="${k === 0}" type="button"><span>${n}</span></button>`).join('')}</div>`;
export const topBar = (title) => wide(`<header class="aipim-top-bar"><a class="aipim-icon-button" href="#" aria-label="${L('Back', 'Voltar')}">${icon('arrow-left')}</a><h1 class="aipim-top-bar__title">${title}</h1>${iconButton('search', L('Search', 'Buscar'))}${iconButton('more-vertical', L('More actions', 'Mais ações'))}</header>`);
export const card = (title, text, extra = '') => `<article class="aipim-card aipim-card--interactive"><div class="aipim-card__body"><h3 class="aipim-card__title"><a class="aipim-card__link" href="#">${title}</a></h3><p class="aipim-card__text">${text}</p>${extra}</div></article>`;

import { a11yRules } from './_gallery.js';
import { L, SPEC_DO, SPEC_DONT, T } from '../.storybook/i18n.js';

// [do, don't] markup for each component.
export const EXAMPLES = {
  alert: [
    alert('error', L('Payment declined', 'Pagamento recusado'), L('Check your card details and try again.', 'Confira os dados do cartão e tente de novo.')),
    alert('error', '', L('Something went wrong.', 'Algo deu errado.')),
  ],
  button: [
    stack(`<div style="display:flex;gap:12px">${button(L('Save', 'Salvar'))}${button(L('Cancel', 'Cancelar'), 'aipim-button--outline')}</div>`),
    stack(`<div style="display:flex;gap:12px">${button(L('Save', 'Salvar'))}${button(L('Cancel', 'Cancelar'))}</div>`),
  ],
  card: [
    card(L('Spring collection', 'Coleção de primavera'), L('One link for the whole card: it is one focus stop.', 'Um link para o card inteiro: é uma parada de foco só.'), `<span class="aipim-card__action">${L('Learn more', 'Saiba mais')}</span>`),
    `<article class="aipim-card"><div class="aipim-card__body"><h3 class="aipim-card__title">${L('Spring collection', 'Coleção de primavera')}</h3><article class="aipim-card"><div class="aipim-card__body"><h3 class="aipim-card__title">${L('Linen shirt', 'Camisa de linho')}</h3><p class="aipim-card__text">${L('A card inside a card.', 'Um card dentro de um card.')}</p></div></article></div></article>`,
  ],
  checkbox: [
    `<fieldset class="aipim-choice-group"><legend class="aipim-choice-group__legend">${L('Notify me by', 'Avisar por')}</legend>${checkbox(L('Email', 'E-mail'), true)}${checkbox('SMS', false)}${checkbox('Push', true)}</fieldset>`,
    `<fieldset class="aipim-choice-group"><legend class="aipim-choice-group__legend">${L('Plan', 'Plano')}</legend>${checkbox(L('Monthly', 'Mensal'), true)}${checkbox(L('Yearly', 'Anual'), true)}</fieldset>`,
  ],
  'empty-state': [
    `<div class="aipim-empty-state"><h2 class="aipim-empty-state__title">${L('No projects yet', 'Nenhum projeto ainda')}</h2><p class="aipim-empty-state__description">${L('Create your first project to get started.', 'Crie seu primeiro projeto para começar.')}</p>${button(L('Create project', 'Criar projeto'))}</div>`,
    `<div class="aipim-empty-state"><h2 class="aipim-empty-state__title">${L('Nothing here', 'Nada aqui')}</h2></div>`,
  ],
  'icon-button': [
    stack(`<div style="display:flex;gap:12px">${iconButton('close', L('Close', 'Fechar'))}${iconButton('search', L('Search', 'Buscar'))}${iconButton('add', L('Add', 'Adicionar'))}</div>${note(L('aria-label="Close"', 'aria-label="Fechar"'))}`, 12),
    stack(`<div style="display:flex;gap:12px">${iconButton('image')}${iconButton('loading')}${iconButton('external-link')}</div>${note(L('no aria-label', 'sem aria-label'))}`, 12),
  ],
  link: [
    L('<p style="margin:0">Read the <a class="aipim-link" href="#">accessibility notes</a> before you ship.</p>', '<p style="margin:0">Leia as <a class="aipim-link" href="#">notas de acessibilidade</a> antes de publicar.</p>'),
    L('<p style="margin:0"><a class="aipim-link" href="#">Click here</a> to read the accessibility notes before you ship.</p>', '<p style="margin:0"><a class="aipim-link" href="#">Clique aqui</a> para ler as notas de acessibilidade antes de publicar.</p>'),
  ],
  modal: [
    dialog(L('Delete project?', 'Excluir o projeto?'), L('This cannot be undone. All files in the project will be removed.', 'Não dá para desfazer. Todos os arquivos do projeto serão apagados.'), `${button(L('Cancel', 'Cancelar'), 'aipim-button--outline')}${button(L('Confirm', 'Confirmar'))}`),
    dialog(L('Welcome back!', 'Que bom ver você de novo!'), L('Here is a tip: you can press the slash key to search from any page.', 'Uma dica: aperte a tecla barra para buscar de qualquer página.'), button(L('Got it', 'Entendi'))),
  ],
  radio: [
    `<fieldset class="aipim-choice-group"><legend class="aipim-choice-group__legend">${L('Plan', 'Plano')}</legend>${radio('plan-do', L('Monthly', 'Mensal'), true)}${radio('plan-do', L('Yearly', 'Anual'), false)}${radio('plan-do', L('Lifetime', 'Vitalício'), false)}</fieldset>`,
    `<div class="aipim-choice-group">${radio('plan-dont', L('Send me the newsletter', 'Quero receber a newsletter'), true)}</div>`,
  ],
  switch: [
    `<div class="aipim-choice-group">${switchEl(L('Notifications', 'Notificações'), true)}</div>`,
    `<div class="aipim-choice-group">${switchEl(L('Turn notifications on', 'Ligar as notificações'), true)}</div>`,
  ],
  'tab-bar': [tabBar(true), tabBar(false)],
  tabs: [
    tabs([L('Overview', 'Visão geral'), L('Details', 'Detalhes'), L('Activity', 'Atividade')]),
    tabs([L('Overview', 'Visão geral')]),
  ],
  badge: [
    `<span style="display:flex;align-items:center;gap:var(--aipim-space-12)"><span class="aipim-badge" aria-hidden="true">1</span><span>${L('Create the file', 'Crie o arquivo')}</span></span>`,
    `<span class="aipim-badge aipim-badge--filled" aria-hidden="true">3</span>`,
  ],
  tag: [
    `<span class="aipim-tag"><span>Design</span></span>`,
    `<span class="aipim-tag"><span>${L('This project is about design', 'Este projeto é sobre design')}</span></span>`,
  ],
  'brazilian-field': [
    `<div class="aipim-field"><label class="aipim-field__label" for="dd-br-do">CPF</label><input class="aipim-field__control" id="dd-br-do" type="text" inputmode="numeric" data-aipim-format="cpf" aria-describedby="dd-br-do-help" value="123.4"><p class="aipim-field__helper" id="dd-br-do-help"><span>${L('Type only the numbers', 'Digite só os números')}</span></p></div>`,
    `<div class="aipim-field"><label class="aipim-field__label" for="dd-br-dont">CPF</label><input class="aipim-field__control" id="dd-br-dont" type="text" placeholder="000.000.000-00" value="1234"></div>`,
  ],
  'text-field': [
    `<div class="aipim-field"><label class="aipim-field__label" for="dd-do">${L('Date of birth', 'Data de nascimento')}</label><input class="aipim-field__control" id="dd-do" type="text" aria-describedby="dd-do-help" placeholder="${L('DD/MM/YYYY', 'DD/MM/AAAA')}"><p class="aipim-field__helper" id="dd-do-help"><span>${L('Use day, month and year', 'Use dia, mês e ano')}</span></p></div>`,
    `<div class="aipim-field"><input class="aipim-field__control" type="text" placeholder="${L('Date of birth', 'Data de nascimento')}"></div>`,
  ],
  toast: [
    toast('success', L('Item deleted.', 'Item excluído.'), true),
    toast('error', L('Payment failed. Check your card details.', 'O pagamento falhou. Confira os dados do cartão.'), false),
  ],
  'top-bar': [
    topBar(L('Messages', 'Mensagens')),
    topBar(L('Quarterly report for the northern region', 'Relatório trimestral da região Norte')),
  ],
};

// Turns "Do: say what happened (`code`)." into HTML, without the leading label.
// The spec of each language uses its own labels ("Do:" and "Don't:", or "Faça:" and "Não faça:").
const caption = (raw, label) => {
  const line = raw.split('\n').find((l) => l.startsWith(`- ${label}:`)) || '';
  return line.replace(`- ${label}:`, '').trim().replace(/`([^`]+)`/g, '<code>$1</code>');
};

export function doDont(name, raw) {
  const [good, bad] = EXAMPLES[name];
  // The wrong example is a picture of a mistake (an icon button or a tab with no name): it is hidden from screen readers
  // and from the keyboard, so the page itself does not have the mistake. The caption under it says what is wrong.
  const pane = (kind, label, markup) => `<figure class="dd__item dd__item--${kind}"><div class="dd__stage"${kind === 'dont' ? ' aria-hidden="true" inert' : ''}>${markup}</div><figcaption class="dd__caption"><svg class="aipim-icon" aria-hidden="true"><use href="#aipim-${kind === 'do' ? 'success' : 'error'}"></use></svg><span><strong>${label === 'Do' ? T.do : T.dont}.</strong> ${caption(raw, label === 'Do' ? SPEC_DO : SPEC_DONT)}</span></figcaption></figure>`;
  return {
    name: T.doDont,
    // The wrong examples break these rules on purpose (an icon button or a tab with no name), and two bars on one page repeat a landmark.
    parameters: { a11y: { test: 'off', config: a11yRules('button-name', 'link-name', 'landmark-unique', 'landmark-no-duplicate-banner') } },
    render: () => `<div class="dd">${pane('do', 'Do', good)}${pane('dont', 'Don\'t', bad)}</div>`,
    // Hidden from the sidebar, same reasoning as Default in _iconic.js: the Docs page already shows this story
    // inline under "More stories", so its own sidebar entry was a second, unlabeled copy of the same thing.
    tags: ['!dev'],
  };
}
