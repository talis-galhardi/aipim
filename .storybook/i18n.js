// The language of the Storybook. There are two builds: Portuguese (pt-BR, the default, at /aipim/) and English (at
// /aipim/en/). main.js picks the docs folder (docs/pt-br or docs/en) and writes the language into the page, before any
// script runs, as window.AIPIM_LOCALE. This file holds the texts of the Storybook itself: the tabs, the pager, the
// labels of the facts, and the words inside the examples, so a component in the Portuguese build speaks Portuguese.
// Component, variant and token names stay in English in both: they are the names in the code.
export const LOCALE = (typeof window !== 'undefined' && window.AIPIM_LOCALE) || 'pt-BR';
export const PT = LOCALE === 'pt-BR';

// One text in both languages, written side by side so the meaning stays close to its translation.
export const L = (en, pt) => (PT ? pt : en);

// The other build, at the same page: the ids of the pages are the same in both languages.
export const OTHER = PT
  ? { label: 'English', title: 'Read this page in English', base: './en/', lang: 'en' }
  : { label: 'Português', title: 'Ler esta página em português', base: '../', lang: 'pt-BR' };

// The order of the sidebar, with the label of each page, for the previous and next links.
export const PAGES = [
  ['introduction--docs', L('Introduction', 'Introdução')], ['theme-builder--docs', L('Theme builder', 'Construtor de temas')],
  ['foundations-color--docs', L('Color', 'Cor')], ['foundations-typography--docs', L('Typography', 'Tipografia')],
  ['foundations-space-layout--docs', L('Space & layout', 'Espaço e layout')], ['foundations-shape-elevation--docs', L('Shape & elevation', 'Forma e elevação')],
  ['foundations-motion-touch--docs', L('Motion & touch', 'Movimento e toque')], ['foundations-icons-illustrations--docs', L('Icons & illustrations', 'Ícones e ilustrações')],
  // components:start
  ['atoms-badge--docs', 'Badge'],
  ['atoms-button--docs', 'Button'],
  ['atoms-checkbox--docs', 'Checkbox'],
  ['atoms-icon-button--docs', 'Icon button'],
  ['atoms-link--docs', 'Link'],
  ['atoms-radio--docs', 'Radio'],
  ['atoms-switch--docs', 'Switch'],
  ['atoms-tag--docs', 'Tag'],
  ['molecules-alert--docs', 'Alert'],
  ['molecules-brazilian-field--docs', 'Brazilian field'],
  ['molecules-card--docs', 'Card'],
  ['molecules-combobox--docs', 'Combobox'],
  ['molecules-empty-state--docs', 'Empty state'],
  ['molecules-select--docs', 'Select'],
  ['molecules-tabs--docs', 'Tabs'],
  ['molecules-text-field--docs', 'Text field'],
  ['molecules-toast--docs', 'Toast'],
  ['organisms-modal--docs', 'Modal'],
  ['organisms-tab-bar--docs', 'Tab bar'],
  ['organisms-top-bar--docs', 'Top bar'],
  // components:end
  ['guides-tutorials-ai-agents--docs', L('Tutorial: AI agents', 'Tutorial: agentes de IA')], ['guides-tutorials-designers--docs', L('Tutorial: Designers', 'Tutorial: designers')],
  ['guides-tutorials-developers--docs', L('Tutorial: Developers', 'Tutorial: desenvolvedores')],
  ['guides-voice-and-microcopy--docs', L('Voice and microcopy', 'Voz e microcopy')],
];

// The texts of the Storybook around the docs.
export const T = {
  theme: (mode, next) => L(`Theme: ${mode}. Switch to ${next}`, `Tema: ${mode === 'dark' ? 'escuro' : 'claro'}. Mudar para ${next === 'dark' ? 'escuro' : 'claro'}`),
  themeTool: L('Theme', 'Tema'),
  language: L('Language', 'Idioma'),
  sections: L('Sections of this page', 'Seções desta página'),
  onThisPage: L('On this page', 'Nesta página'),
  previous: L('Previous', 'Anterior'),
  next: L('Next', 'Próxima'),
  pager: L('Previous and next page', 'Página anterior e próxima'),
  newTab: L('(opens in a new tab)', '(abre numa nova aba)'),
  overview: L('Overview', 'Visão geral'),
  examples: L('Examples', 'Exemplos'),
  code: L('Code', 'Código'),
  tokens: 'Tokens',
  a11y: L('Accessibility', 'Acessibilidade'),
  doDont: L("Do and don't", 'Faça e não faça'),
  do: L('Do', 'Faça'),
  dont: L('Don’t', 'Não faça'),
  default: L('Default', 'Padrão'),
  allStates: L('All states', 'Todos os estados'),
  playground: 'Playground',
  status: 'Status',
  group: L('Group', 'Grupo'),
  related: L('Related', 'Relacionados'),
  spec: L('Spec', 'Especificação'),
  lastVerified: L('Last verified', 'Última verificação em'),
  whatWasChecked: L('what was checked', 'o que foi verificado'),
  statusValue: { stable: L('Stable', 'Estável'), beta: 'Beta', draft: L('Draft', 'Rascunho') },
  level: { atoms: L('Atoms', 'Átomos'), molecules: L('Molecules', 'Moléculas'), organisms: L('Organisms', 'Organismos') },
};

// The headings of a component spec that open their own tab. The spec of each language uses its own words.
export const SPEC_TABS = [[/^(code examples|exemplos de código)/i, 'code'], [/^(tokens used|tokens usados)/i, 'tokens'], [/^(accessibility|acessibilidade)/i, 'a11y']];
export const SPEC_DO_DONT = /^## (Do and don't|Faça e não faça)[\s\S]*?(?=^## |(?![\s\S]))/m;
export const SPEC_DO = PT ? 'Faça' : 'Do';
export const SPEC_DONT = PT ? 'Não faça' : "Don't";

// The words inside the gallery of components (components/web/examples/index.html), which the stories cut their markup from.
// The page itself stays in English: it is the page the browser tests open. Names of variants and sizes stay as they are.
export const GALLERY_PT = {
  '3 unread': '3 não lidas',
  '8 digits': '8 dígitos',
  'A longer card title here': 'Um título de card mais longo aqui',
  'A short description of what is inside this card.': 'Uma descrição curta do que tem neste card.',
  'Action': 'Ação',
  'Activity': 'Atividade',
  'Activity content.': 'Conteúdo de atividade.',
  'Add': 'Adicionar',
  'Alerts': 'Alertas',
  'Amount': 'Valor',
  'Back': 'Voltar',
  'CPF or CNPJ': 'CPF ou CNPJ',
  'Cancel': 'Cancelar',
  'Card title': 'Título do card',
  'Check your card and try again.': 'Confira os dados do cartão e tente de novo.',
  'Choose one': 'Escolha uma',
  'Choose one of the options in the list. Type part of the name to find it.': 'Escolha uma das opções da lista. Digite parte do nome para encontrar.',
  'Choose the type of key': 'Escolha o tipo de chave',
  'Close': 'Fechar',
  'Confirm': 'Confirmar',
  'Create the file': 'Crie o arquivo',
  'Date of birth': 'Data de nascimento',
  'Day, month and year': 'Dia, mês e ano',
  'Delete project?': 'Excluir o projeto?',
  'Details': 'Detalhes',
  'Details content.': 'Conteúdo de detalhes.',
  'Disabled': 'Desativado',
  'Disabled on': 'Ligado e desativado',
  'Dismiss': 'Dispensar',
  'Email': 'E-mail',
  'Enter a valid email': 'Digite um e-mail válido',
  'External link': 'Link externo',
  'Eyebrow': 'Sobretítulo',
  'Home': 'Início',
  'In reais': 'Em reais',
  'Interactive card': 'Card interativo',
  'Learn more': 'Saiba mais',
  'Letters and numbers, as on the card': 'Letras e números, como no cartão',
  'Lifetime': 'Vitalício',
  'Live': 'Ao vivo',
  'Main': 'Principal',
  'Message': 'Mensagem',
  'Message only': 'Só a mensagem',
  'Message only.': 'Só a mensagem.',
  'Messages': 'Mensagens',
  'Mobile phone': 'Celular',
  'Monthly': 'Mensal',
  'More actions': 'Mais ações',
  'No state with that name': 'Nenhum estado com esse nome',
  'Nothing here yet': 'Nada aqui ainda',
  'Notifications': 'Notificações',
  'Open modal': 'Abrir modal',
  'Overview': 'Visão geral',
  'Overview content.': 'Conteúdo da visão geral.',
  'Pix key type': 'Tipo de chave Pix',
  'Plan': 'Plano',
  'Random key': 'Chave aleatória',
  'Read the': 'Leia as',
  'Remove design': 'Remover design',
  'Search': 'Buscar',
  'Sections': 'Seções',
  'Show a toast': 'Mostrar um toast',
  'State': 'Estado',
  'The kind of key you registered at your bank': 'O tipo de chave que você cadastrou no banco',
  'The whole card is one link and one focus stop.': 'O card inteiro é um link e uma parada de foco.',
  'These digits do not make a valid CPF. Check if one was swapped.': 'Esses números não formam um CPF válido. Confira se algum foi trocado.',
  'This cannot be undone. All files in the project will be removed.': 'Não dá para desfazer. Todos os arquivos do projeto serão apagados.',
  'Title': 'Título',
  'Title only, scrolled': 'Só o título, com rolagem',
  'Type only the numbers': 'Digite só os números',
  'Type part of the name': 'Digite parte do nome',
  'Unavailable': 'Indisponível',
  'Undo': 'Desfazer',
  'Used only for receipts': 'Usado só para recibos',
  'When there is something to show, it will appear in this space.': 'Quando houver algo para mostrar, vai aparecer aqui.',
  'With text': 'Com texto',
  'With the area code': 'Com o DDD',
  'Yearly': 'Anual',
  'accessibility notes': 'notas de acessibilidade',
  'before you ship.': 'antes de publicar.',
  'dd/mm/yyyy': 'dd/mm/aaaa',
  'name@example.com': 'nome@exemplo.com',
};
