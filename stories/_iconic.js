// The "Default" story of each component: its most recognizable variation, alone and at its real size.
// It is the first story, so it is the one on top of the docs page and the one Chromatic shows first.
// The full set of states stays in "All states".
import { L, T } from '../.storybook/i18n.js';
import { icon, button, iconButton, checkbox, radio, switchEl, alert, toast, dialog, tabBar, topBar, card } from './_dodont.js';

const ICONIC = {
  alert: alert('error', L('Payment declined', 'Pagamento recusado'), L('Check your card details and try again.', 'Confira os dados do cartão e tente de novo.')),
  badge: `<span style="display:flex;align-items:center;gap:var(--aipim-space-12)"><span class="aipim-badge" aria-hidden="true">1</span><span>${L('Create the file', 'Crie o arquivo')}</span></span>`,
  button: button(L('Save', 'Salvar')),
  card: `<article class="aipim-card aipim-card--interactive" style="inline-size:320px;max-inline-size:100%"><div class="aipim-card__media">${icon('image', 'aipim-icon--lg')}</div><div class="aipim-card__body"><h3 class="aipim-card__title"><a class="aipim-card__link" href="#">${L('Interactive card', 'Card interativo')}</a></h3><p class="aipim-card__text">${L('The whole card is one link and one focus stop.', 'O card inteiro é um link e uma parada de foco.')}</p><span class="aipim-card__action">${L('Learn more', 'Saiba mais')}</span></div></article>`,
  checkbox: `<div class="aipim-choice-group">${checkbox(L('Email me the receipt', 'Mandar o recibo por e-mail'), true)}</div>`,
  'empty-state': `<div class="aipim-empty-state"><h2 class="aipim-empty-state__title">${L('No projects yet', 'Nenhum projeto ainda')}</h2><p class="aipim-empty-state__description">${L('Create your first project to get started.', 'Crie seu primeiro projeto para começar.')}</p>${button(L('Create project', 'Criar projeto'))}</div>`,
  'icon-button': iconButton('close', L('Close', 'Fechar')),
  link: L('<p style="margin:0">Read the <a class="aipim-link" href="#">accessibility notes</a> before you ship.</p>', '<p style="margin:0">Leia as <a class="aipim-link" href="#">notas de acessibilidade</a> antes de publicar.</p>'),
  modal: dialog(L('Delete project?', 'Excluir o projeto?'), L('This cannot be undone. All files in the project will be removed.', 'Não dá para desfazer. Todos os arquivos do projeto serão apagados.'), `${button(L('Cancel', 'Cancelar'), 'aipim-button--outline')}${button(L('Confirm', 'Confirmar'))}`),
  radio: `<fieldset class="aipim-choice-group"><legend class="aipim-choice-group__legend">${L('Plan', 'Plano')}</legend>${radio('plan-default', L('Monthly', 'Mensal'), true)}${radio('plan-default', L('Yearly', 'Anual'), false)}</fieldset>`,
  switch: `<div class="aipim-choice-group">${switchEl(L('Notifications', 'Notificações'), true)}</div>`,
  'tab-bar': tabBar(true),
  tabs: `<div class="aipim-tabs" role="tablist" aria-label="${L('Sections', 'Seções')}"><button class="aipim-tab" role="tab" id="d-t1" aria-selected="true" aria-controls="d-p1" type="button"><span>${L('Overview', 'Visão geral')}</span></button><button class="aipim-tab" role="tab" id="d-t2" aria-selected="false" aria-controls="d-p2" type="button"><span>${L('Details', 'Detalhes')}</span></button><button class="aipim-tab" role="tab" id="d-t3" aria-selected="false" aria-controls="d-p3" type="button"><span>${L('Activity', 'Atividade')}</span></button></div><div role="tabpanel" id="d-p1" aria-labelledby="d-t1" tabindex="0" style="padding-block:var(--aipim-space-16)">${L('Overview content.', 'Conteúdo da visão geral.')}</div><div role="tabpanel" id="d-p2" aria-labelledby="d-t2" tabindex="0" hidden></div><div role="tabpanel" id="d-p3" aria-labelledby="d-t3" tabindex="0" hidden></div>`,
  tag: '<span class="aipim-tag aipim-tag--accent"><span>Design</span></span>',
  'text-field': `<div class="aipim-field" style="inline-size:320px;max-inline-size:100%"><label class="aipim-field__label" for="d-f1">${L('Email', 'E-mail')}</label><input class="aipim-field__control" id="d-f1" type="text" aria-describedby="d-f1-help" placeholder="${L('name@example.com', 'nome@exemplo.com')}"><p class="aipim-field__helper" id="d-f1-help"><span>${L('Used only for receipts', 'Usado só para recibos')}</span></p></div>`,
  toast: toast('success', L('Item saved.', 'Item salvo.'), true),
  'top-bar': topBar(L('Messages', 'Mensagens')),
};

export function iconic(name) {
  return {
    name: T.default,
    // The most recognizable variation at its real size; the other states are in "All states".
    render: () => ICONIC[name],
    // Hidden from the sidebar (still built, still the Docs page's own Primary preview, still visited by
    // Chromatic and the a11y tests): a reader clicking a component in the sidebar got a disclosure list of
    // Default/All states/Do and don't before they ever reached the actual spec, and each of those three, opened
    // on its own, is the same markup the Docs page already shows them inline, with no spec text around it to
    // say what makes it different from the others. One destination per component removes that detour.
    tags: ['!dev'],
  };
}
