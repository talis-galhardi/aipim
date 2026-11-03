// The "Default" story of each component: its most recognizable variation, alone and at its real size.
// It is the first story, so it is the one on top of the docs page and the one Chromatic shows first.
// The full set of states stays in "All states".
import { L, T } from '../.storybook/i18n.js';
import { stage } from './_stage.js';
import { wide, icon, button, iconButton, checkbox, radio, switchEl, alert, toast, dialog, tabBar, topBar, card, select, combobox, datepicker, avatarGroup, listRows, accordion, UF, PIX } from './_dodont.js';

// The markup a person copies: the component and nothing else. How it sits on a stage is in DRAWN, below.
const ICONIC = {
  alert: alert('error', L('Payment declined', 'Pagamento recusado'), L('Check your card details and try again.', 'Confira os dados do cartão e tente de novo.')),
  badge: `<span class="aipim-badge" aria-hidden="true">1</span><span>${L('Create the file', 'Crie o arquivo')}</span>`,
  button: button(L('Save', 'Salvar')),
  card: `<article class="aipim-card aipim-card--interactive"><div class="aipim-card__media">${icon('image', 'aipim-icon--lg')}</div><div class="aipim-card__body"><h3 class="aipim-card__title"><a class="aipim-card__link" href="#">${L('Interactive card', 'Card interativo')}</a></h3><p class="aipim-card__text">${L('The whole card is one link and one focus stop.', 'O card inteiro é um link e uma parada de foco.')}</p><span class="aipim-card__action">${L('Learn more', 'Saiba mais')}</span></div></article>`,
  checkbox: checkbox(L('Email me the receipt', 'Mandar o recibo por e-mail'), true),
  'empty-state': `<div class="aipim-empty-state"><h2 class="aipim-empty-state__title">${L('No projects yet', 'Nenhum projeto ainda')}</h2><p class="aipim-empty-state__description">${L('Create your first project to get started.', 'Crie seu primeiro projeto para começar.')}</p>${button(L('Create project', 'Criar projeto'))}</div>`,
  'icon-button': iconButton('close', L('Close', 'Fechar')),
  link: L('<p>Read the <a class="aipim-link" href="#">accessibility notes</a> before you ship.</p>', '<p>Leia as <a class="aipim-link" href="#">notas de acessibilidade</a> antes de publicar.</p>'),
  modal: `<button class="aipim-button" type="button" command="show-modal" commandfor="delete-modal"><span>${L('Delete project', 'Excluir o projeto')}</span></button>`
    + `<dialog class="aipim-modal" id="delete-modal" aria-labelledby="delete-title"><div class="aipim-modal__header"><h2 class="aipim-modal__title" id="delete-title">${L('Delete project?', 'Excluir o projeto?')}</h2><button class="aipim-icon-button" type="button" aria-label="${L('Close', 'Fechar')}" command="close" commandfor="delete-modal">${icon('close')}</button></div>`
    + `<p class="aipim-modal__body">${L('This cannot be undone. All files in the project will be removed.', 'Não dá para desfazer. Todos os arquivos do projeto serão apagados.')}</p>`
    + `<div class="aipim-modal__actions"><button class="aipim-button aipim-button--outline" type="button" command="close" commandfor="delete-modal"><span>${L('Cancel', 'Cancelar')}</span></button><button class="aipim-button" type="button"><span>${L('Confirm', 'Confirmar')}</span></button></div></dialog>`,
  radio: `<fieldset class="aipim-choice-group"><legend class="aipim-choice-group__legend">${L('Plan', 'Plano')}</legend>${radio('plan-default', L('Monthly', 'Mensal'), true)}${radio('plan-default', L('Yearly', 'Anual'), false)}</fieldset>`,
  switch: switchEl(L('Notifications', 'Notificações'), true),
  'tab-bar': tabBar(true),
  tabs: `<div class="aipim-tabs" role="tablist" aria-label="${L('Sections', 'Seções')}"><button class="aipim-tab" role="tab" id="d-t1" aria-selected="true" aria-controls="d-p1" type="button"><span>${L('Overview', 'Visão geral')}</span></button>`
    + `<button class="aipim-tab" role="tab" id="d-t2" aria-selected="false" aria-controls="d-p2" type="button"><span>${L('Details', 'Detalhes')}</span></button>`
    + `<button class="aipim-tab" role="tab" id="d-t3" aria-selected="false" aria-controls="d-p3" type="button"><span>${L('Activity', 'Atividade')}</span></button></div>`
    + `<div role="tabpanel" id="d-p1" aria-labelledby="d-t1" tabindex="0">${L('Overview content.', 'Conteúdo da visão geral.')}</div>`
    + `<div role="tabpanel" id="d-p2" aria-labelledby="d-t2" tabindex="0" hidden></div>`
    + `<div role="tabpanel" id="d-p3" aria-labelledby="d-t3" tabindex="0" hidden></div>`,
  tag: '<span class="aipim-tag aipim-tag--accent"><span>Design</span></span>',
  'brazilian-field': `<div class="aipim-field"><label class="aipim-field__label" for="d-b1">CPF</label><input class="aipim-field__control" id="d-b1" type="text" inputmode="numeric" data-aipim-format="cpf" aria-describedby="d-b1-help" value="123.456.789-09"><p class="aipim-field__helper" aria-live="polite" id="d-b1-help"><svg class="aipim-icon aipim-field__icon" aria-hidden="true"><use href="#aipim-error"></use></svg><span>${L('Type only the numbers', 'Digite só os números')}</span></p></div>`,
  accordion: accordion([[L('When does Pix arrive?', 'Quando o Pix cai na conta?'), L('Pix arrives in seconds, at any hour, including holidays.', 'O Pix cai em segundos, a qualquer hora, inclusive em feriados.')], [L('Can I cancel a scheduled Pix?', 'Posso cancelar um Pix agendado?'), L('Open the schedule in the app and choose cancel.', 'Abra o agendamento no aplicativo e escolha cancelar.')]]),
  avatar: avatarGroup([['TG', 'Talis Galhardi'], ['AV', 'Ana Vieira'], ['LU', 'Lucas Ueda']], 3),
  'list-item': listRows([[L('Pix key', 'Chave Pix'), L('CPF or email', 'CPF ou e-mail'), 'user'], [L('Bills', 'Boletos'), L('Pay and schedule', 'Pagar e agendar'), 'calendar']]),
  combobox: combobox('d-cb1', L('State', 'Estado'), L('Type part of the name', 'Digite parte do nome'), UF, L('No state with that name', 'Nenhum estado com esse nome')),
  datepicker: datepicker('d-dp1', L('Delivery date', 'Data de entrega'), L('From 02/11 to 18/12', 'De 02/11 a 18/12'), 'data-aipim-min="2026-11-02" data-aipim-max="2026-12-18" value="20/11/2026"'),
  select: select('d-sl1', L('Pix key type', 'Tipo de chave Pix'), L('The kind of key you registered at your bank', 'O tipo de chave que você cadastrou no banco'), PIX(), L('Choose one', 'Escolha uma')),
  'text-field': `<div class="aipim-field"><label class="aipim-field__label" for="d-f1">${L('Email', 'E-mail')}</label><input class="aipim-field__control" id="d-f1" type="text" aria-describedby="d-f1-help" placeholder="${L('name@example.com', 'nome@exemplo.com')}"><p class="aipim-field__helper" aria-live="polite" id="d-f1-help"><span>${L('Used only for receipts', 'Usado só para recibos')}</span></p></div>`,
  toast: toast('success', L('Item saved.', 'Item salvo.'), true),
  'top-bar': topBar(L('Messages', 'Mensagens')),
};

// How a component sits on a stage or on the canvas, which is not part of what a person copies: a width to fill, a row. The
// modal is the one case where the two differ in kind: it is copied closed, with the button that opens it, and drawn open.
const fit = (markup) => `<div class="demo-fit">${markup}</div>`;
const group = (markup) => `<div class="aipim-choice-group">${markup}</div>`;
const DRAWN = {
  accordion: fit,
  badge: (markup) => `<div class="demo-row">${markup}</div>`,
  'brazilian-field': fit,
  card: fit,
  checkbox: group,
  combobox: fit,
  datepicker: fit,
  'list-item': fit,
  modal: () => dialog(L('Delete project?', 'Excluir o projeto?'), L('This cannot be undone. All files in the project will be removed.', 'Não dá para desfazer. Todos os arquivos do projeto serão apagados.'), `${button(L('Cancel', 'Cancelar'), 'aipim-button--outline')}${button(L('Confirm', 'Confirmar'))}`),
  select: fit,
  switch: group,
  'tab-bar': wide,
  'text-field': fit,
  'top-bar': wide,
};

export function iconic(name) {
  return {
    name: T.default,
    // The most recognizable variation at its real size; the other states are in "All states".
    // On a docs page it sits in the stage with its markup beside it, the same block as the Playground of the components
    // that have one. Alone (the canvas, Chromatic) it is the component and nothing else.
    render: (args, context) => {
      const drawn = DRAWN[name] ? DRAWN[name](ICONIC[name]) : ICONIC[name];
      return context?.viewMode === 'docs' ? stage(drawn, ICONIC[name]) : drawn;
    },
    // Hidden from the sidebar (still built, still visited by Chromatic and the a11y tests): a component is one page, and
    // this story opens the page of a component with no Playground.
    tags: ['!dev'],
  };
}
