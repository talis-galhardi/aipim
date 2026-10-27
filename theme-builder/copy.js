/* Aipim theme builder: the words of the page, in Portuguese and English. app.js draws the page with them.
 * Plain script, so the page also works opened straight from the disk. Sets globalThis.AipimThemeCopy.
 * Aipim design system · https://github.com/talis-galhardi/aipim · MIT License · Copyright (c) 2026 Talis Galhardi
 */
(function (root) {
  'use strict';
  const COPY = {
    pt: {
      title: 'Construtor de temas', lead: 'Escolha uma cor para cada papel. O construtor cria nove tons de cada uma, do claro ao escuro, e coloca em cada componente o tom que passa nas checagens de acessibilidade.',
      colorsH: 'Suas cores', usageH: 'Onde cada tom é usado', usageLead: 'Cada uso começa no tom do Aipim. Se uma checagem de contraste falha, ele vai sozinho para o tom mais próximo que passa (marcado como automático). Duas cores parecidas demais nunca mudam sozinhas: aparecem como problema. Você pode escolher outro tom à mão; se ele não passar, as checagens e a prévia mostram onde.',
      summaryH: 'Resumo do tema', exportH: 'Exportar', light: 'Claro', dark: 'Escuro', reset: 'Voltar às cores do Aipim', random: 'Tema aleatório',
      pin: 'Manter este tom exato', pinHelp: 'Seu hex entra na escala no tom {step}.', hexLabel: 'Hex de {name}', hue: 'Matiz', hueText: '{n} graus', chroma: 'Intensidade',
      auto: 'Automático', autoMoved: 'automático', manual: 'manual', backToAuto: 'Voltar ao automático de {role}',
      toneOf: 'Tom de {role}', lineContrast: 'Contraste WCAG 2.2', lineCvd: 'Daltonismo', lineLink: 'Links no texto', lineOf: '{a} de {b}',
      okTitle: 'Pronto para exportar', okSub: 'Tudo passa, nos temas claro e escuro.', issuesH: 'O que não passa', seeSummary: 'Ver resumo',
      contrastMsg: '{label}: contraste {r}:1, precisa de {min}:1', cvdMsg: '{a} e {b} ficam quase iguais para {who} (diferença {d}, precisa de {min})',
      linkMsg: 'O link não se destaca o bastante do texto (diferença {d}, precisa de {min})', everyone: 'todo mundo', whoKinds: 'quem tem {kinds}', and: 'e',
      whyContrast: 'Por que importa: com pouco contraste, o texto fica difícil de ler para quem tem baixa visão, com reflexo na tela ou com o brilho baixo.',
      whyLink: 'Por que importa: a cor ajuda a achar os links no meio do texto, junto com o sublinhado.',
      marksLabel: 'Problemas marcados na prévia', spotLabel: 'Problema {n}', notInPreview: 'Não aparece nesta prévia.', goHint: 'Mostrar na prévia',
      whyCvd: 'Por que importa: quando duas cores ficam iguais para quem tem daltonismo, a diferença entre os dois elementos some. Em "Ver como", na prévia, dá para ver do jeito dessas pessoas.',
      kinds: { normal: 'visão comum', protanopia: 'protanopia', deuteranopia: 'deuteranopia', tritanopia: 'tritanopia' },
      suggestH: 'Sugestão que passa', suggestLooking: 'Procurando uma sugestão que passa.', suggestApply: 'Aplicar sugestão', suggestNone: 'Não achei uma troca pequena que resolva. Escolha outro tom à mão ou mude uma das cores.',
      suggestText: 'A cor fica na mesma família, o mais perto possível da que você escolheu.',
      suggestTones: 'Os tons sugeridos ficam como escolhidos à mão: mudar outra cor depois não mexe neles.',
      dlCss: 'Baixar CSS', copyFigma: 'Copiar para o Figma', copyLink: 'Copiar link do tema', copied: 'Copiado',
      exportNote: 'Você ainda pode exportar. Antes, o construtor mostra o que não funciona e pede uma confirmação.',
      problem1: 'problema', problemN: 'problemas',
      confirmTitle: 'Exportar com {n} {problems} de acessibilidade?', confirmLead: 'O tema vai sair do jeito que está. Quem usar o produto pode ter dificuldade nestes pontos:',
      confirmFile: 'A lista também vai num comentário no começo do arquivo.', confirmBack: 'Voltar e corrigir', confirmGo: 'Exportar com {n} {problems}',
      simH: 'Ver como', showMarks: 'Marcar os problemas na prévia', simOk: 'sem problemas', simCount: '{n} {problems}',
      simNote: 'As simulações são aproximadas e mostram a forma mais forte de cada condição, com o modelo de Machado, Oliveira e Fernandes (2009), o mesmo das checagens.',
      sims: {
        normal: ['Visão comum', 'As cores como a maioria das pessoas vê. Os problemas marcados aqui (contraste, ou duas cores iguais para todo mundo) atingem qualquer pessoa.'],
        protanopia: ['Protanopia', 'Sem os cones do vermelho. Faz parte do daltonismo vermelho-verde, que atinge cerca de 8% dos homens e 0,4% das mulheres de origem europeia.'],
        deuteranopia: ['Deuteranopia', 'Sem os cones do verde. Também faz parte do daltonismo vermelho-verde (cerca de 8% dos homens e 0,4% das mulheres de origem europeia).'],
        tritanopia: ['Tritanopia', 'Sem os cones do azul. É rara: cerca de 5 em cada 100 mil pessoas.'],
      },
      howCode: 'No código: carregue o arquivo baixado depois do aipim.css.', howFigma: 'No Figma: no seu arquivo do Aipim, abra o plugin Aipim Theme, cole e aplique.',
      previewH: 'Prévia', previewLead: 'Componentes reais do Aipim com o seu tema.', copyFallback: 'Copie o texto abaixo:',
      close: 'Fechar', lang: 'English', langCode: 'en', docs: 'Documentação', docsHref: 'https://talisgalhardi.com/aipim/?path=/docs/theme-builder--docs',
      skip: 'Pular para o construtor',
      pvBar: 'Projetos', pvEyebrow: 'Hoje', pvCardTitle: 'Lançamento da versão 2', pvCardText: 'A revisão final está pronta. Confira as', pvLink: 'notas da versão',
      pvTag: 'Design', pvNew: 'Novo', pvPublish: 'Publicar', pvPreview: 'Pré-visualizar', pvCancel: 'Cancelar', pvEmail: 'E-mail', pvEmailError: 'Digite um e-mail válido',
      pvNews: 'Receber novidades', pvMonthly: 'Mensal', pvNotify: 'Notificações', pvYearly: 'Anual',
      pvInfo: 'A sincronização roda toda noite.', pvSuccess: 'Projeto publicado.', pvWarning: 'Seu plano vence em 3 dias.', pvError: 'Não foi possível salvar.',
      pvTint1: 'Principal', pvTint2: 'Secundária', pvTint3: 'Destaque', pvTint4: 'Sucesso', pvTintText: 'Texto sobre o tint.', pvTab1: 'Visão geral', pvTab2: 'Detalhes', pvTab3: 'Atividade',
      // the labels of the checks in theme.js, by their English label
      checks: {
        'Body text (AAA)': 'Texto do corpo (AAA)', 'Body text on card (AAA)': 'Texto do corpo no card (AAA)',
        'Secondary text (AAA)': 'Texto secundário (AAA)', 'Secondary text on card (AAA)': 'Texto secundário no card (AAA)',
        'Supporting text (AA)': 'Texto de apoio (AA)', 'Supporting text on card (AA)': 'Texto de apoio no card (AA)',
        'Supporting text on recessed area (AA)': 'Texto de apoio na área rebaixada (AA)', 'Inverse text (AAA)': 'Texto invertido (AAA)',
        'Field border (UI 3:1)': 'Borda de campo (UI 3:1)', 'Field border on card (UI 3:1)': 'Borda de campo no card (UI 3:1)',
        'Primary button (AA)': 'Botão primário (AA)', 'Primary button on hover (AA)': 'Botão primário no hover (AA)',
        'Primary button against background (UI 3:1)': 'Botão primário contra o fundo (UI 3:1)', 'Primary button on card (UI 3:1)': 'Botão primário no card (UI 3:1)',
        'Secondary button (AA)': 'Botão secundário (AA)', 'Secondary button on hover (AA)': 'Botão secundário no hover (AA)',
        'Secondary button against background (UI 3:1)': 'Botão secundário contra o fundo (UI 3:1)',
        'Link (AAA)': 'Link (AAA)', 'Link on card (AAA)': 'Link no card (AAA)', 'Link on hover (AAA)': 'Link no hover (AAA)', 'Link on hover on card (AAA)': 'Link no hover no card (AAA)',
        'Visited link (AA)': 'Link visitado (AA)', 'Visited link on card (AA)': 'Link visitado no card (AA)',
        'Focus ring (3:1)': 'Anel de foco (3:1)', 'Focus ring on card (3:1)': 'Anel de foco no card (3:1)', 'Text on accent (AAA)': 'Texto sobre o destaque (AAA)',
        'Success, text (AAA)': 'Sucesso, texto (AAA)', 'Success, icon (3:1)': 'Sucesso, ícone (3:1)', 'Warning, text (AAA)': 'Aviso, texto (AAA)', 'Warning, icon (3:1)': 'Aviso, ícone (3:1)',
        'Error, text (AAA)': 'Erro, texto (AAA)', 'Error, icon (3:1)': 'Erro, ícone (3:1)', 'Info, text (AAA)': 'Informação, texto (AAA)', 'Info, icon (3:1)': 'Informação, ícone (3:1)',
      },
      groups: { bg: 'Fundos', text: 'Texto', border: 'Bordas e foco', action: 'Botões', link: 'Links', accent: 'Destaque', feedback: 'Avisos', tint: 'Tints (cards coloridos)' },
    },
    en: {
      title: 'Theme builder', lead: 'Pick one color for each role. The builder makes nine tones of each, light to dark, and gives every component the tone that passes the accessibility checks.',
      colorsH: 'Your colors', usageH: 'Where each tone is used', usageLead: 'Each use starts on the Aipim tone. If a contrast check fails, it moves by itself to the nearest tone that passes (marked as auto). Two colors that look too alike never change by themselves: they show as a problem. You can pick another tone by hand; if it fails, the checks and the preview show where.',
      summaryH: 'Theme summary', exportH: 'Export', light: 'Light', dark: 'Dark', reset: 'Back to the Aipim colors', random: 'Random theme',
      pin: 'Keep this exact tone', pinHelp: 'Your hex goes into the scale at tone {step}.', hexLabel: '{name} hex', hue: 'Hue', hueText: '{n} degrees', chroma: 'Intensity',
      auto: 'Auto', autoMoved: 'auto', manual: 'manual', backToAuto: 'Back to auto for {role}',
      toneOf: '{role} tone', lineContrast: 'WCAG 2.2 contrast', lineCvd: 'Color blindness', lineLink: 'Links in text', lineOf: '{a} of {b}',
      okTitle: 'Ready to export', okSub: 'Everything passes, in light and dark.', issuesH: 'What does not pass', seeSummary: 'See summary',
      contrastMsg: '{label}: contrast {r}:1, needs {min}:1', cvdMsg: '{a} and {b} look almost the same to {who} (difference {d}, needs {min})',
      linkMsg: 'The link does not stand out enough from the text (difference {d}, needs {min})', everyone: 'everyone', whoKinds: 'people with {kinds}', and: 'and',
      whyContrast: 'Why it matters: with low contrast, text is hard to read for people with low vision, with glare on the screen or with the brightness down.',
      whyLink: 'Why it matters: color helps people find the links inside the text, together with the underline.',
      marksLabel: 'Problems marked on the preview', spotLabel: 'Problem {n}', notInPreview: 'Not on this preview.', goHint: 'Show on the preview',
      whyCvd: 'Why it matters: when two colors look the same to someone with color blindness, the difference between the two elements is gone. Use "See as" on the preview to see it their way.',
      kinds: { normal: 'typical vision', protanopia: 'protanopia', deuteranopia: 'deuteranopia', tritanopia: 'tritanopia' },
      suggestH: 'A fix that passes', suggestLooking: 'Looking for a fix that passes.', suggestApply: 'Apply suggestion', suggestNone: 'No small change fixes it. Pick another tone by hand or change one of the colors.',
      suggestText: 'Each color stays in its family, as close as possible to the one you picked.',
      suggestTones: 'The suggested tones stay as picked by hand: changing another color later does not move them.',
      dlCss: 'Download CSS', copyFigma: 'Copy for Figma', copyLink: 'Copy theme link', copied: 'Copied',
      exportNote: 'You can still export. First, the builder shows what does not work and asks you to confirm.',
      problem1: 'problem', problemN: 'problems',
      confirmTitle: 'Export with {n} accessibility {problems}?', confirmLead: 'The theme goes out as it is. People using the product may struggle here:',
      confirmFile: 'The list also goes into a comment at the top of the file.', confirmBack: 'Go back and fix', confirmGo: 'Export with {n} {problems}',
      simH: 'See as', showMarks: 'Mark the problems on the preview', simOk: 'no problems', simCount: '{n} {problems}',
      simNote: 'The simulations are approximate and show the strongest form of each condition, with the model of Machado, Oliveira and Fernandes (2009), the same as the checks.',
      sims: {
        normal: ['Typical vision', 'Colors as most people see them. The problems marked here (contrast, or two colors that look the same to everyone) affect anyone.'],
        protanopia: ['Protanopia', 'No red cones. Part of red-green color blindness, which affects about 8% of men and 0.4% of women of European descent.'],
        deuteranopia: ['Deuteranopia', 'No green cones. Also part of red-green color blindness (about 8% of men and 0.4% of women of European descent).'],
        tritanopia: ['Tritanopia', 'No blue cones. Rare: about 5 in 100,000 people.'],
      },
      howCode: 'In code: load the downloaded file after aipim.css.', howFigma: 'In Figma: in your Aipim file, open the Aipim Theme plugin, paste and apply.',
      previewH: 'Preview', previewLead: 'Real Aipim components with your theme.', copyFallback: 'Copy the text below:',
      close: 'Close', lang: 'Português', langCode: 'pt', docs: 'Docs', docsHref: 'https://talisgalhardi.com/aipim/en/?path=/docs/theme-builder--docs',
      skip: 'Skip to the builder',
      pvBar: 'Projects', pvEyebrow: 'Today', pvCardTitle: 'Version 2 launch', pvCardText: 'The final review is ready. Read the', pvLink: 'release notes',
      pvTag: 'Design', pvNew: 'New', pvPublish: 'Publish', pvPreview: 'Preview', pvCancel: 'Cancel', pvEmail: 'Email', pvEmailError: 'Enter a valid email',
      pvNews: 'Get news', pvMonthly: 'Monthly', pvNotify: 'Notifications', pvYearly: 'Yearly',
      pvInfo: 'Sync runs every night.', pvSuccess: 'Project published.', pvWarning: 'Your plan ends in 3 days.', pvError: 'Could not save.',
      pvTint1: 'Primary', pvTint2: 'Secondary', pvTint3: 'Accent', pvTint4: 'Success', pvTintText: 'Text on the tint.', pvTab1: 'Overview', pvTab2: 'Details', pvTab3: 'Activity',
      groups: { bg: 'Backgrounds', text: 'Text', border: 'Borders and focus', action: 'Buttons', link: 'Links', accent: 'Accent', feedback: 'Feedback', tint: 'Tints (colored cards)' },
    },
  };
  const COLOR_NAMES = {
    primary: { pt: ['Principal', 'Botões principais e a marca'], en: ['Primary', 'Main buttons and the brand'] },
    secondary: { pt: ['Secundária', 'Links, foco, botões secundários e informação'], en: ['Secondary', 'Links, focus, secondary buttons and info'] },
    tertiary: { pt: ['Destaque', 'Destaques e avisos'], en: ['Accent', 'Highlights and warnings'] },
    success: { pt: ['Sucesso', 'Confirmações'], en: ['Success', 'Confirmations'] },
    error: { pt: ['Erro', 'Erros e ações destrutivas'], en: ['Error', 'Errors and destructive actions'] },
    neutral: { pt: ['Neutra', 'Fundos, textos e bordas'], en: ['Neutral', 'Backgrounds, text and borders'] },
  };
  const ROLE_NAMES = {
    'bg.canvas': ['Page background', 'Fundo da página'], 'bg.surface': ['Surface (cards)', 'Superfície (cards)'], 'bg.sunken': ['Recessed area', 'Área rebaixada'], 'bg.scrim': ['Scrim (behind modals)', 'Véu (atrás de modais)'],
    'text.primary': ['Main text', 'Texto principal'], 'text.secondary': ['Secondary text', 'Texto secundário'], 'text.muted': ['Supporting text', 'Texto de apoio'], 'text.inverse': ['Inverse text', 'Texto invertido'],
    'border.subtle': ['Subtle border', 'Borda sutil'], 'border.strong': ['Strong border (fields)', 'Borda forte (campos)'], 'focus.ring': ['Focus ring', 'Anel de foco'],
    'action.primary.bg': ['Primary button', 'Botão primário'], 'action.primary.text': ['Primary button text', 'Texto do botão primário'], 'action.primary.hover': ['Primary button, hover', 'Botão primário, hover'],
    'action.secondary.bg': ['Secondary button', 'Botão secundário'], 'action.secondary.text': ['Secondary button text', 'Texto do botão secundário'], 'action.secondary.hover': ['Secondary button, hover', 'Botão secundário, hover'],
    'link': ['Link', 'Link'], 'link.hover': ['Link, hover', 'Link, hover'], 'link.visited': ['Visited link', 'Link visitado'],
    'accent.bg': ['Accent background', 'Fundo de destaque'], 'accent.text': ['Text on accent', 'Texto sobre o destaque'],
    'success.bg': ['Success background', 'Fundo de sucesso'], 'success.text': ['Success text', 'Texto de sucesso'], 'success.icon': ['Success icon', 'Ícone de sucesso'],
    'warning.bg': ['Warning background', 'Fundo de aviso'], 'warning.text': ['Warning text', 'Texto de aviso'], 'warning.icon': ['Warning icon', 'Ícone de aviso'],
    'error.bg': ['Error background', 'Fundo de erro'], 'error.text': ['Error text', 'Texto de erro'], 'error.icon': ['Error icon', 'Ícone de erro'],
    'info.bg': ['Info background', 'Fundo de informação'], 'info.text': ['Info text', 'Texto de informação'], 'info.icon': ['Info icon', 'Ícone de informação'],
    'tint.primary': ['Primary tint', 'Tint principal'], 'tint.secondary': ['Secondary tint', 'Tint secundário'], 'tint.tertiary': ['Accent tint', 'Tint de destaque'], 'tint.success': ['Success tint', 'Tint de sucesso'], 'tint.error': ['Error tint', 'Tint de erro'],
    'tint.text': ['Text on tints', 'Texto sobre os tints'], 'tint.text.muted': ['Supporting text on tints', 'Texto de apoio sobre os tints'],
  };

  // the tint checks are made in a loop in build_tokens.py, so their labels are too
  const TINT_PT = { primary: 'principal', secondary: 'secundária', tertiary: 'destaque', success: 'sucesso', error: 'erro' };
  for (const [t, pt] of Object.entries(TINT_PT)) {
    COPY.pt.checks[`Text on ${t} tint (AAA)`] = `Texto sobre o tint ${pt} (AAA)`;
    COPY.pt.checks[`Supporting text on ${t} tint (AA)`] = `Texto de apoio sobre o tint ${pt} (AA)`;
  }

  root.AipimThemeCopy = { COPY, COLOR_NAMES, ROLE_NAMES };
})(typeof globalThis !== 'undefined' ? globalThis : this);
