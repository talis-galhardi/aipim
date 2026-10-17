/* Aipim theme builder: the page. The color engine is theme.js (AipimTheme); this file only draws the controls, the
 * live preview and the exports. Plain script, so the page also works opened straight from the disk.
 * Aipim design system · https://github.com/talis-galhardi/aipim · MIT License · Copyright (c) 2026 Talis Galhardi
 */
(function () {
  'use strict';
  const T = window.AipimTheme;
  const $ = (sel, el = document) => el.querySelector(sel);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);

  // ---------------------------------------------------------------------------------------------------------------
  // Words
  // ---------------------------------------------------------------------------------------------------------------
  const COPY = {
    pt: {
      title: 'Construtor de temas', lead: 'Escolha uma cor para cada papel. O construtor cria nove tons de cada uma, do claro ao escuro, e coloca em cada componente o tom que passa nas checagens de acessibilidade.',
      colorsH: 'Suas cores', usageH: 'Onde cada tom é usado', usageLead: 'Cada uso começa no tom do Aipim. Se uma checagem falha, ele vai sozinho para o tom mais próximo que passa (marcado como automático). Você pode escolher outro tom à mão; se ele não passar, as checagens e a prévia mostram onde.',
      summaryH: 'Resumo do tema', exportH: 'Exportar', light: 'Claro', dark: 'Escuro', reset: 'Voltar às cores do Aipim',
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
      groups: { bg: 'Fundos', text: 'Texto', border: 'Bordas e foco', action: 'Botões', link: 'Links', accent: 'Destaque', feedback: 'Avisos', tint: 'Tints (cards coloridos)' },
    },
    en: {
      title: 'Theme builder', lead: 'Pick one color for each role. The builder makes nine tones of each, light to dark, and gives every component the tone that passes the accessibility checks.',
      colorsH: 'Your colors', usageH: 'Where each tone is used', usageLead: 'Each use starts on the Aipim tone. If a check fails, it moves by itself to the nearest tone that passes (marked as auto). You can pick another tone by hand; if it fails, the checks and the preview show where.',
      summaryH: 'Theme summary', exportH: 'Export', light: 'Light', dark: 'Dark', reset: 'Back to the Aipim colors',
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
  const GROUPS = [
    ['bg', ['bg.canvas', 'bg.surface', 'bg.sunken', 'bg.scrim']],
    ['text', ['text.primary', 'text.secondary', 'text.muted', 'text.inverse']],
    ['border', ['border.subtle', 'border.strong', 'focus.ring']],
    ['action', ['action.primary.bg', 'action.primary.text', 'action.primary.hover', 'action.secondary.bg', 'action.secondary.text', 'action.secondary.hover']],
    ['link', ['link', 'link.hover', 'link.visited']],
    ['accent', ['accent.bg', 'accent.text']],
    ['feedback', ['success.bg', 'success.text', 'success.icon', 'warning.bg', 'warning.text', 'warning.icon', 'error.bg', 'error.text', 'error.icon', 'info.bg', 'info.text', 'info.icon']],
    ['tint', ['tint.primary', 'tint.secondary', 'tint.tertiary', 'tint.success', 'tint.error', 'tint.text', 'tint.text.muted']],
  ];

  // ---------------------------------------------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------------------------------------------
  let lang = (new URLSearchParams(location.search).get('lang') || (navigator.language || '').slice(0, 2)) === 'pt' ? 'pt' : 'en';
  if (document.documentElement.lang.startsWith('pt') && !new URLSearchParams(location.search).get('lang')) lang = 'pt';
  let theme = T.decode(location.hash);
  theme._hex = {};
  let usageMode = 'light', previewMode = 'light', simKind = 'normal', showMarks = true;
  // the theme (as its link) the person already agreed to export with problems: asked once per theme, not per click
  let confirmedFor = null, pendingExport = null;
  let res = null;
  const t = (k, vars) => { let s = COPY[lang][k]; for (const [a, b] of Object.entries(vars || {})) s = s.split('{' + a + '}').join(b); return s; };
  const colorName = n => COLOR_NAMES[n][lang][0];
  const roleName = r => ROLE_NAMES[r][lang === 'pt' ? 1 : 0];
  const num = (x, d = 1) => x.toFixed(d).replace('.', lang === 'pt' ? ',' : '.');
  const anchorHex = n => (theme.pins[n] && theme.pins[n].hex) || res.ramps[n][n === 'neutral' ? 500 : 600];
  const icon = id => `<svg class="aipim-icon" aria-hidden="true"><use href="#aipim-${id}"></use></svg>`;

  // ---------------------------------------------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------------------------------------------
  function renderStatic() {
    document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
    document.title = `${t('title')} · Aipim`;
    for (const el of document.querySelectorAll('[data-t]')) el.textContent = t(el.dataset.t);
    // The docs link goes to the page about the builder, in the language of the page.
    $('#docs').href = t('docsHref');
    $('#lang').textContent = t('lang');
    $('#lang').setAttribute('lang', t('langCode'));
    $('#fallback-close').setAttribute('aria-label', t('close'));
    $('#confirm-close').setAttribute('aria-label', t('close'));
  }

  // The simulation filters for the preview, made from the matrices the checks use (theme.js), so the preview shows
  // exactly what is measured. feColorMatrix works in linear RGB by default, like the checks.
  document.body.insertAdjacentHTML('beforeend', `<svg width="0" height="0" style="position:absolute" aria-hidden="true">${T.CVD_KINDS.map(k =>
    `<filter id="sim-${k}" color-interpolation-filters="linearRGB"><feColorMatrix type="matrix" values="${T.CVD[k].map(r => r.join(' ') + ' 0 0').join(' ')} 0 0 0 1 0"/></filter>`).join('')}</svg>`);

  // The intensity bar runs from gray to the most vivid seed the builder takes from a hex (0.37, theme.js). The neutral
  // stays near gray, so its bar ends much sooner and a step on it is still a small change.
  const CHROMA_MAX = n => (n === 'neutral' ? 0.06 : 0.37);
  const pct = n => Math.round(Math.min(1, theme.seeds[n].c / CHROMA_MAX(n)) * 100);
  const deg = n => Math.round(theme.seeds[n].h) % 360;
  // The number on a tone sits on any color, so its ink is the end of the neutral scale with more contrast.
  function toneInk(hex) {
    const light = res.ramps.neutral[50], dark = res.ramps.neutral[950];
    return T.contrast(hex, light) >= T.contrast(hex, dark) ? light : dark;
  }

  // Each row is the picker of its color: who it is and its hex; the nine tones the builder makes from it; and the two
  // bars that make those tones (hue and intensity, the seed of the scale). The tone that holds the hex the person typed,
  // when it is kept exact, wears a ring.
  const scaleHtml = n => T.stepsOf(n).filter(s => n !== 'neutral' || (s >= 100 && s <= 900)).map(s =>
    `<span class="tb-scale__tone${theme.pins[n] && theme.pins[n].step === s ? ' is-pinned' : ''}" style="background:${res.ramps[n][s]};color:${toneInk(res.ramps[n][s])}" title="${s} · ${res.ramps[n][s]}"><span>${s}</span></span>`).join('');
  const pinHtml = n => `${esc(t('pin'))}${theme.pins[n] ? ` <span class="tb-muted">${esc(t('pinHelp', { step: theme.pins[n].step }))}</span>` : ''}`;
  const hueTrack = n => `linear-gradient(to right in oklch longer hue,oklch(0.68 ${Math.max(0.06, Math.min(0.16, theme.seeds[n].c))} 0),oklch(0.68 ${Math.max(0.06, Math.min(0.16, theme.seeds[n].c))} 360))`;
  const chromaTrack = n => `linear-gradient(to right,oklch(0.62 0 ${deg(n)}),oklch(0.62 ${CHROMA_MAX(n)} ${deg(n)}))`;
  function renderColors() {
    $('#colors').innerHTML = T.RAMP_ORDER.map(n => {
      const [name, help] = COLOR_NAMES[n][lang], hex = anchorHex(n);
      return `<div class="tb-color" data-color="${n}">
        <div class="tb-color__head"><div class="tb-color__text"><p class="tb-color__name">${esc(name)}</p><p class="tb-color__help">${esc(help)}</p></div>
          <label class="tb-field"><span class="tb-field__chip" style="background:${hex}"></span><input class="tb-hex" type="text" value="${hex}" spellcheck="false" maxlength="7" aria-label="${esc(t('hexLabel', { name }))}" data-hex="${n}"></label></div>
        <div class="tb-scale" aria-hidden="true">${scaleHtml(n)}</div>
        <div class="tb-adjust">
          <div class="tb-ctl"><div class="tb-ctl__top"><label for="hue-${n}">${esc(t('hue'))}</label><output for="hue-${n}" data-out="hue">${deg(n)}°</output></div>
            <input class="tb-range" type="range" id="hue-${n}" min="0" max="359" step="1" value="${deg(n)}" data-hue="${n}" aria-valuetext="${esc(t('hueText', { n: deg(n) }))}" style="--track:${hueTrack(n)};--thumb:${hex}"></div>
          <div class="tb-ctl"><div class="tb-ctl__top"><label for="chroma-${n}">${esc(t('chroma'))}</label><output for="chroma-${n}" data-out="chroma">${pct(n)}%</output></div>
            <input class="tb-range" type="range" id="chroma-${n}" min="0" max="100" step="1" value="${pct(n)}" data-chroma="${n}" aria-valuetext="${pct(n)}%" style="--track:${chromaTrack(n)};--thumb:${hex}"></div>
        </div>
        <label class="aipim-checkbox tb-pin"${theme.pins[n] || theme._hex[n] ? '' : ' hidden'}><input class="aipim-checkbox__input" type="checkbox" data-pin="${n}"${theme.pins[n] ? ' checked' : ''}><span class="aipim-checkbox__box" aria-hidden="true"></span><span class="aipim-checkbox__label">${pinHtml(n)}</span></label>
      </div>`;
    }).join('');
  }
  // After a change made in a row, refresh that row without rebuilding it, so the field or the bar in use keeps the focus
  // (and a bar being dragged keeps the pointer).
  function refreshRow(n) {
    const row = document.querySelector(`[data-color="${n}"]`), hex = anchorHex(n), active = document.activeElement;
    $('.tb-field__chip', row).style.background = hex;
    if ($('[data-hex]', row) !== active) $('[data-hex]', row).value = hex;
    $('.tb-scale', row).innerHTML = scaleHtml(n);
    const hue = $('[data-hue]', row), chroma = $('[data-chroma]', row);
    if (hue !== active) hue.value = deg(n);
    if (chroma !== active) chroma.value = pct(n);
    hue.setAttribute('aria-valuetext', t('hueText', { n: deg(n) })); chroma.setAttribute('aria-valuetext', `${pct(n)}%`);
    $('[data-out="hue"]', row).textContent = `${deg(n)}°`; $('[data-out="chroma"]', row).textContent = `${pct(n)}%`;
    hue.style.setProperty('--track', hueTrack(n)); chroma.style.setProperty('--track', chromaTrack(n));
    for (const r of [hue, chroma]) r.style.setProperty('--thumb', hex);
    const pin = $('[data-pin]', row); pin.checked = !!theme.pins[n]; pin.closest('label').hidden = !(theme.pins[n] || theme._hex[n]);
    $('.aipim-checkbox__label', pin.closest('label')).innerHTML = pinHtml(n);
  }

  function failingRoles(mode) {
    const bad = new Set();
    for (const r of res.contrast) if (r.mode === mode && !r.ok) { bad.add(r.fg); bad.add(r.bg); }
    for (const r of res.cvd) if (r.mode === mode && !r.ok) { bad.add(r.a); bad.add(r.b); }
    for (const r of res.linkText) if (r.mode === mode && !r.ok) { bad.add('link'); bad.add('text.primary'); }
    return bad;
  }

  function renderUsage() {
    setTabs('[data-usage-mode]', 'usageMode', usageMode, '#usage');
    const mode = usageMode, manual = theme.manual[mode], bad = failingRoles(mode);
    $('#usage').innerHTML = GROUPS.map(([g, roles]) => `<fieldset class="tb-group"><legend class="tb-group__legend">${esc(COPY[lang].groups[g])}</legend>${roles.map(role => {
      const [ramp, def] = T.SEMANTIC[mode][role], cur = res.steps[mode][role], isManual = manual[role] !== undefined;
      const isAuto = !isManual && cur !== def;
      const tones = T.stepsOf(ramp);
      const autoStep = isManual ? def : cur;
      const id = `u-${mode}-${role.replace(/\./g, '-')}`;
      return `<div class="tb-role${bad.has(role) ? ' is-bad' : ''}">
        <span class="tb-role__chip" style="background:${res.values[mode][role]}" aria-hidden="true"></span>
        <label class="tb-role__name" for="${id}">${esc(roleName(role))}${isAuto ? ` <span class="aipim-tag aipim-tag--accent tb-flag">${esc(t('autoMoved'))}</span>` : ''}${isManual ? ` <span class="aipim-tag tb-flag">${esc(t('manual'))}</span>` : ''}${bad.has(role) ? ` ${icon('error')}` : ''}</label>
        <select class="tb-select" id="${id}" data-role="${role}" aria-label="${esc(t('toneOf', { role: roleName(role) }))}">
          <option value="auto"${isManual ? '' : ' selected'}>${esc(t('auto'))} (${autoStep})</option>
          ${tones.map(s => `<option value="${s}"${isManual && cur === s ? ' selected' : ''}>${s} · ${res.ramps[ramp][s]}</option>`).join('')}
        </select>
      </div>`;
    }).join('')}</fieldset>`).join('');
  }

  // Every failure once, in order: what fails, in which mode, the two roles it is about (to mark them on the preview) and
  // who it affects ('all' for contrast and the link, or the kinds of vision a color pair fails for).
  function failureItems() {
    const L = { light: t('light'), dark: t('dark') }, out = [];
    const list = xs => xs.length < 2 ? xs.join('') : `${xs.slice(0, -1).join(', ')} ${t('and')} ${xs[xs.length - 1]}`;
    for (const r of res.contrast) if (!r.ok) out.push({ mode: r.mode, roles: [r.fg, r.bg], kinds: 'all',
      text: `${L[r.mode]} · ${t('contrastMsg', { label: lang === 'pt' ? r.pt : r.en, r: num(r.ratio, 2), min: num(r.min, r.min % 1 ? 1 : 0) })}` });
    for (const r of res.cvd) if (!r.ok) {
      const kinds = r.normal < r.min ? 'all' : T.CVD_KINDS.filter(k => r[k] < r.min);
      const who = kinds === 'all' ? t('everyone') : t('whoKinds', { kinds: list(kinds.map(k => COPY[lang].sims[k][0].toLowerCase())) });
      out.push({ mode: r.mode, roles: [r.a, r.b], kinds, cvd: true,
        text: `${L[r.mode]} · ${t('cvdMsg', { a: roleName(r.a), b: lower(roleName(r.b)), who, d: num(r.worst), min: T.CVD_MIN })}` });
    }
    for (const r of res.linkText) if (!r.ok) out.push({ mode: r.mode, roles: ['link', 'text.primary'], kinds: 'all', link: true,
      text: `${L[r.mode]} · ${t('linkMsg', { d: num(r.delta), min: T.LINK_VS_TEXT_MIN })}` });
    out.forEach((it, i) => { it.n = i + 1; it.why = t(it.cvd ? 'whyCvd' : it.link ? 'whyLink' : 'whyContrast'); });
    return out;
  }
  const problems = n => (n === 1 ? t('problem1') : t('problemN'));
  const lower = s => s.charAt(0).toLowerCase() + s.slice(1);
  // an item shows under a simulation when it fails for everyone, or for that kind of vision
  const itemIn = (it, kind) => it.kinds === 'all' || (kind !== 'normal' && it.kinds.includes(kind));

  // The summary reads like the summary of an order: the six colors, one line per kind of check, what does not pass with
  // the fix that passes, and the status right above the export.
  // Looking for a fix takes far longer than the rest of an update, so while a bar is dragged it waits until the bar
  // stops for a moment, and the summary says it is looking.
  let lastSuggestion = null, fixTimer = 0;
  function renderSummary(opts = {}) {
    clearTimeout(fixTimer);
    $('#sum-dots').innerHTML = T.RAMP_ORDER.map(n => `<span style="background:${anchorHex(n)}"></span>`).join('');
    const line = (label, rows) => {
      const ok = rows.filter(r => r.ok).length, all = ok === rows.length;
      return `<div class="tb-line${all ? '' : ' is-bad'}"><dt>${esc(label)}</dt><dd>${icon(all ? 'check' : 'error')}<span>${esc(t('lineOf', { a: ok, b: rows.length }))}</span></dd></div>`;
    };
    $('#sum-lines').innerHTML = line(t('lineContrast'), res.contrast) + line(t('lineCvd'), res.cvd) + line(t('lineLink'), res.linkText);

    const items = res.ok ? [] : failureItems(), n = items.length;
    const looking = n && opts.deferFix;
    lastSuggestion = n && !looking ? T.suggest(theme, ['primary']) : null;
    if (looking) fixTimer = setTimeout(() => renderSummary(), 250);
    // the fix sits right under the problems, like a discount right under the items: one change per color, from → to
    const sug = !n ? '' : looking ? `<div class="tb-fix"><p class="tb-fix__title">${esc(t('suggestH'))}</p><p class="tb-muted">${esc(t('suggestLooking'))}</p></div>` : lastSuggestion
      ? `<div class="tb-fix"><p class="tb-fix__title">${esc(t('suggestH'))}</p>
         <ul class="tb-fix__list">${lastSuggestion.changes.map(c => `<li><span class="tb-fix__name">${esc(colorName(c.name))}</span><span class="tb-fix__swatch" style="background:${c.from}" aria-hidden="true"></span><span class="tb-hexval">${c.from}</span>${icon('arrow-right')}<span class="tb-fix__swatch" style="background:${c.hex}" aria-hidden="true"></span><span class="tb-hexval">${c.hex}</span></li>`).join('')}</ul>
         <p class="tb-muted">${esc(t('suggestText'))}</p>
         <button class="aipim-button aipim-button--secondary aipim-button--sm" type="button" id="apply-suggestion"><span>${esc(t('suggestApply'))}</span></button></div>`
      : `<div class="tb-fix"><p class="tb-muted">${esc(t('suggestNone'))}</p></div>`;
    $('#checks').hidden = !n;
    $('#checks').innerHTML = !n ? '' : `<p class="tb-summary__label">${esc(t('issuesH'))}</p>
      <ol class="tb-issues">${items.map(it => {
        const body = `<span class="tb-issue__n" aria-hidden="true">${it.n}</span><span class="tb-issue__text"><span class="tb-issue__what">${esc(it.text)}</span><span class="tb-issue__why">${esc(it.why)}</span>${elementsFor(it).length ? '' : `<span class="tb-issue__note">${esc(t('notInPreview'))}</span>`}</span>`;
        return `<li>${elementsFor(it).length ? `<button class="tb-issue" type="button" data-issue="${it.n}" aria-describedby="go-hint">${body}${icon('arrow-right')}</button>` : `<div class="tb-issue tb-issue--static">${body}</div>`}</li>`;
      }).join('')}</ol><span class="aipim-visually-hidden" id="go-hint">${esc(t('goHint'))}</span>${sug}`;

    // the status, like the total of an order: ready, or how many problems go along (the export still works, it asks first)
    const title = n ? `${n} ${problems(n)}` : t('okTitle');
    $('#sum-total').className = `tb-total${n ? ' is-bad' : ''}`;
    $('#sum-total').innerHTML = `<span class="tb-total__icon">${icon(n ? 'warning' : 'success')}</span><span class="tb-total__text"><span class="tb-total__title">${esc(title)}</span>${n
      ? `<span class="tb-total__sub" id="export-note">${esc(t('exportNote'))}</span>` : `<span class="tb-total__sub">${esc(t('okSub'))}</span>`}</span>`;
    $('#bar-status').innerHTML = `${icon(n ? 'warning' : 'success')}<span>${esc(title)}</span>`;
    $('#bar-status').className = `tb-bar__status${n ? ' is-bad' : ''}`;
  }

  // The preview gets the theme as inline custom properties: every primitive and every semantic role as a hex, for
  // the mode shown. Semantic roles are set directly (not as var()) because aipim.css resolves them on :root.
  function renderPreview() {
    setTabs('[data-preview-mode]', 'previewMode', previewMode, '#preview-panel');
    const el = $('#preview'), st = [];
    for (const n of T.RAMP_ORDER) for (const s of T.stepsOf(n)) st.push(`--aipim-color-${n}-${s}:${res.ramps[n][s]}`);
    for (const r of T.ROLES) st.push(`--aipim-${r.replace(/\./g, '-')}:${res.values[previewMode][r]}`);
    st.push(`color-scheme:${previewMode}`);
    if (simKind !== 'normal') st.push(`filter:url(#sim-${simKind})`);
    el.setAttribute('style', st.join(';'));
    el.dataset.mode = previewMode;
    renderSim(); renderMarks();
  }

  // "See as": one button per kind of vision, each with the problems it has in the mode on the preview
  function renderSim() {
    const items = res.ok ? [] : failureItems().filter(it => it.mode === previewMode);
    $('#sim-options').innerHTML = ['normal', ...T.CVD_KINDS].map(k => {
      const n = items.filter(it => (k === 'normal' ? it.kinds === 'all' : it.kinds !== 'all' && it.kinds.includes(k))).length;
      // the count is a small badge (a number, or a check); the words are there for screen readers
      const words = n ? t('simCount', { n, problems: problems(n) }) : t('simOk');
      return `<button class="tb-seg__opt tb-sim__opt${n ? ' has-problems' : ''}" type="button" data-sim="${k}" aria-pressed="${k === simKind}"><span class="tb-sim__name">${esc(COPY[lang].sims[k][0])}</span><span class="tb-count" aria-hidden="true">${n || icon('check')}</span><span class="aipim-visually-hidden">, ${esc(words)}</span></button>`;
    }).join('');
    // Light and dark carry their own count, so a problem in the other theme is in sight without a sentence that comes
    // and goes.
    const all = res.ok ? [] : failureItems();
    for (const m of ['light', 'dark']) {
      const n = all.filter(it => it.mode === m).length;
      $(`[data-count="${m}"]`).innerHTML = n || icon('check');
      $(`[data-count="${m}"]`).closest('button').classList.toggle('has-problems', !!n);
      $(`[data-count-words="${m}"]`).textContent = `, ${n ? t('simCount', { n, problems: problems(n) }) : t('simOk')}`;
    }
    // Every description sits in the same cell and only the current one shows, so the box is always as tall as the longest
    // and the preview below never jumps when the kind of vision changes.
    $('#sim-desc').innerHTML = ['normal', ...T.CVD_KINDS].map(k => `<span${k === simKind ? '' : ' aria-hidden="true"'}>${esc(COPY[lang].sims[k][1])}</span>`).join('');
  }

  // The marks: a dashed frame and the number of the failure (the same number as in the checks) on each element of the
  // preview that shows one of its two roles, so a pair that looks the same is marked on both sides. The page background
  // and the body text are on almost every element, so they are only marked when the other role is not on the preview.
  const GENERIC = new Set(['bg.canvas', 'bg.surface', 'text.primary']);
  // the elements of the preview a problem is about (the same in every kind of vision)
  function elementsFor(it) {
    const find = r => [...$('#preview').querySelectorAll('[data-roles]')].filter(e => e.dataset.roles.split(' ').includes(r));
    const els = it.roles.filter(r => !GENERIC.has(r)).flatMap(find);
    return [...new Set(els.length ? els : it.roles.flatMap(find))];
  }
  // A frame around each element with a problem, and on its top edge one numbered spot per problem. A spot is a button:
  // its name is the problem in words, and on hover or focus it shows the same words as a tooltip. Both elements of a
  // pair get the spot, and pointing at one lights up the other.
  function renderMarks() {
    const box = $('#marks'), wrap = box.parentElement;
    hideTip();
    box.innerHTML = '';
    box.setAttribute('aria-label', t('marksLabel'));
    if (!showMarks || res.ok) return;
    const base = wrap.getBoundingClientRect(), byEl = new Map();
    for (const it of failureItems()) {
      if (it.mode !== previewMode || !itemIn(it, simKind)) continue;
      for (const e of elementsFor(it)) byEl.set(e, [...(byEl.get(e) || []), it]);
    }
    for (const [e, its] of byEl) {
      const r = e.getBoundingClientRect();
      box.insertAdjacentHTML('beforeend', `<span class="tb-mark" data-ns=" ${its.map(it => it.n).join(' ')} " style="left:${r.left - base.left}px;top:${r.top - base.top}px;width:${r.width}px;height:${r.height}px"><span class="tb-mark__spots">${its.map(it =>
        `<button class="tb-spot" type="button" data-n="${it.n}" aria-label="${esc(`${t('spotLabel', { n: it.n })}. ${it.text}. ${it.why}`)}">${it.n}</button>`).join('')}</span></span>`);
    }
  }

  // ---- tooltip ----
  // A tooltip opened from the list is pinned: it stays until Escape, a click elsewhere or a scroll by the person, not
  // only while the pointer is on the spot. navUntil ignores the scroll the builder itself makes to reach the mark.
  let tipFor = null, tipTimer = null, tipPinned = false, navUntil = 0;
  function showTip(spot, pinned) {
    clearTimeout(tipTimer); tipPinned = !!pinned;
    const it = failureItems().find(x => x.n === Number(spot.dataset.n)), tip = $('#tip');
    if (!it) return;
    tip.innerHTML = `<span class="tb-tip__n" aria-hidden="true">${it.n}</span><span><strong>${esc(it.text)}</strong><span>${esc(it.why)}</span></span>`;
    tip.hidden = false; tipFor = spot;
    const r = spot.getBoundingClientRect(), w = tip.offsetWidth, h = tip.offsetHeight, gap = 8;
    const left = Math.max(gap, Math.min(innerWidth - w - gap, r.left + r.width / 2 - w / 2));
    const top = r.top - h - gap > gap ? r.top - h - gap : r.bottom + gap;
    tip.style.left = `${left}px`; tip.style.top = `${top}px`;
    for (const m of document.querySelectorAll('.tb-mark')) m.classList.toggle('is-active', m.dataset.ns.includes(` ${it.n} `));
  }
  function hideTip() {
    clearTimeout(tipTimer);
    const tip = $('#tip'); if (tip) tip.hidden = true; tipFor = null; tipPinned = false;
    for (const m of document.querySelectorAll('.tb-mark.is-active')) m.classList.remove('is-active');
  }
  // leaving the spot gives the pointer time to reach the tooltip, which stays while the pointer is on it
  const hideSoon = () => { clearTimeout(tipTimer); tipTimer = setTimeout(hideTip, 250); };
  document.addEventListener('pointerover', e => {
    const spot = e.target.closest('.tb-spot');
    if (spot) showTip(spot, tipPinned && spot === tipFor); else if (e.target.closest('#tip')) clearTimeout(tipTimer); else if (tipFor && !tipPinned && !tipFor.matches(':focus')) hideSoon();
  });
  document.addEventListener('focusin', e => { const spot = e.target.closest('.tb-spot'); if (spot) showTip(spot); else if (tipFor) hideTip(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && tipFor) { hideTip(); } });
  for (const el of ['.tb-panel', '.tb-stage', '.tb-results']) $(el).addEventListener('scroll', () => tipFor && Date.now() > navUntil && hideTip(), { passive: true });
  window.addEventListener('scroll', () => tipFor && Date.now() > navUntil && hideTip(), { passive: true });
  document.addEventListener('pointerdown', e => { if (tipFor && !e.target.closest('.tb-spot, #tip, [data-issue]')) hideTip(); });

  // ---- from the list to the problem ----
  // The first click puts the preview in the mode and the kind of vision of the problem, scrolls to its mark and opens
  // its tooltip. A second click on the same problem makes the mark blink, to find it again.
  let lastIssue = null;
  const reduceMotion = () => window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function goToIssue(n) {
    const it = failureItems().find(x => x.n === n); if (!it) return;
    const again = lastIssue === n && $(`.tb-spot[data-n="${n}"]`);
    lastIssue = n;
    if (!again) {
      previewMode = it.mode;
      if (!itemIn(it, simKind)) simKind = it.kinds === 'all' ? 'normal' : it.kinds[0];
      showMarks = true; $('#show-marks').checked = true;
      renderPreview();
    }
    const spot = $(`.tb-spot[data-n="${n}"]`); if (!spot) return;
    navUntil = Date.now() + 900;
    spot.scrollIntoView({ block: 'center', inline: 'nearest', behavior: reduceMotion() ? 'auto' : 'smooth' });
    setTimeout(() => {
      showTip(spot, true);
      if (again) for (const m of document.querySelectorAll('.tb-mark')) if (m.dataset.ns.includes(` ${n} `)) {
        m.classList.remove('is-blink'); void m.offsetWidth; m.classList.add('is-blink');
        setTimeout(() => m.classList.remove('is-blink'), 1400);
      }
    }, reduceMotion() ? 0 : 350);
  }

  // the bar with the status shows only while the summary is out of sight (it is always in sight with three panels)
  if (window.IntersectionObserver) new IntersectionObserver(([e]) => { $('#bar').hidden = e.isIntersecting; }).observe($('.tb-summary'));
  $('#bar-go').addEventListener('click', e => {
    e.preventDefault();
    $('#summary').scrollIntoView({ block: 'start', behavior: reduceMotion() ? 'auto' : 'smooth' });
    $('#summary').focus({ preventScroll: true });
  });

  // the marks follow the layout of the preview (a narrower window, the fonts arriving)
  if (window.ResizeObserver) new ResizeObserver(() => res && renderMarks()).observe($('#preview'));

  // Light/Dark switches are tabs: one tab stop, arrows move between them (WAI-ARIA tabs pattern)
  function setTabs(sel, key, value, panel) {
    for (const b of document.querySelectorAll(sel)) {
      const on = b.dataset[key] === value;
      b.setAttribute('aria-selected', String(on)); b.tabIndex = on ? 0 : -1;
      if (on) $(panel).setAttribute('aria-labelledby', b.id);
    }
  }
  document.addEventListener('keydown', e => {
    const tab = e.target.closest('[role="tab"]');
    if (!tab || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)) return;
    const tabs = [...tab.parentElement.querySelectorAll('[role="tab"]')], i = tabs.indexOf(tab);
    const next = e.key === 'Home' ? tabs[0] : e.key === 'End' ? tabs[tabs.length - 1] : tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
    e.preventDefault(); next.click(); next.focus();
  });

  function update(opts = {}) {
    res = T.resolve(theme); lastIssue = null;
    if (!opts.keepColors) renderColors();
    renderUsage(); renderPreview(); renderSummary({ deferFix: opts.deferFix });
    history.replaceState(null, '', location.pathname + location.search + '#' + T.encode(theme));
  }

  // ---------------------------------------------------------------------------------------------------------------
  // Events
  // ---------------------------------------------------------------------------------------------------------------
  function setColor(n, hex) {
    hex = T.normHex(hex);
    const r = T.seedFromHex(n, hex);
    theme._hex[n] = hex;
    theme.seeds[n] = r.seed;
    const pinBox = document.querySelector(`[data-pin="${n}"]`);
    const wantPin = pinBox && !pinBox.closest('label').hidden ? pinBox.checked : true;
    if (wantPin) theme.pins[n] = { step: r.step, hex }; else delete theme.pins[n];
    update({ keepColors: true }); refreshRow(n);
  }
  // The bars change the seed itself. The color no longer comes from a typed hex, so that hex stops being kept in the
  // scale. A drag fires many inputs; the page redraws once per frame.
  let frame = 0;
  function setSeed(n, key, value) {
    const sd = theme.seeds[n];
    theme.seeds[n] = key === 'h' ? { h: value, c: sd.c } : { h: sd.h, c: Math.round(value / 100 * CHROMA_MAX(n) * 1000) / 1000 };
    delete theme.pins[n]; delete theme._hex[n];
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => { update({ keepColors: true, deferFix: true }); refreshRow(n); });
  }

  document.addEventListener('input', e => {
    const d = e.target.dataset;
    if (d.hex && T.isHex(e.target.value)) setColor(d.hex, e.target.value);
    if (d.hue) setSeed(d.hue, 'h', Number(e.target.value));
    if (d.chroma) setSeed(d.chroma, 'c', Number(e.target.value));
  });
  document.addEventListener('change', e => {
    if (e.target.id === 'show-marks') { showMarks = e.target.checked; renderMarks(); }
    const pin = e.target.dataset.pin, role = e.target.dataset.role;
    if (pin) {
      const hex = theme._hex[pin] || (theme.pins[pin] && theme.pins[pin].hex);
      if (e.target.checked && hex) { theme.pins[pin] = { step: T.seedFromHex(pin, hex).step, hex }; } else delete theme.pins[pin];
      update();
    }
    if (role) {
      if (e.target.value === 'auto') delete theme.manual[usageMode][role];
      else theme.manual[usageMode][role] = Number(e.target.value);
      update({ keepColors: true });
      const again = document.querySelector(`[data-role="${role}"]`); if (again) again.focus();
    }
    // the text field already updated the theme while typing: on leaving it, only put back a value that is not a hex
    if (e.target.dataset.hex && !T.isHex(e.target.value)) e.target.value = anchorHex(e.target.dataset.hex);
  });
  document.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.usageMode) { usageMode = b.dataset.usageMode; renderUsage(); }
    if (b.dataset.previewMode) { previewMode = b.dataset.previewMode; renderPreview(); }
    if (b.dataset.issue) goToIssue(Number(b.dataset.issue));
    if (b.dataset.sim) { simKind = b.dataset.sim; renderPreview(); const again = document.querySelector(`[data-sim="${simKind}"]`); if (again) again.focus(); }
    if (b.id === 'apply-suggestion' && lastSuggestion) {
      for (const c of lastSuggestion.changes) {
        theme.seeds[c.name] = c.seed; delete theme._hex[c.name];
        if (c.pinned) theme.pins[c.name] = { step: c.step, hex: c.hex }; else delete theme.pins[c.name];
      }
      update();
    }
    if (b.id === 'reset') { theme = T.defaultTheme(); theme._hex = {}; update(); }
    if (b.id === 'lang') { lang = lang === 'pt' ? 'en' : 'pt'; const u = new URL(location.href); u.searchParams.set('lang', lang); history.replaceState(null, '', u); renderStatic(); update(); }
    // the link is a draft to share, not an export: it never asks
    if (b.dataset.export === 'link') copy(location.href, b);
    else if (b.dataset.export) {
      if (res.ok || confirmedFor === T.encode(theme)) runExport(b.dataset.export, b);
      else openConfirm(b.dataset.export, b);
    }
    if (b.id === 'confirm-go') { confirmedFor = T.encode(theme); $('#confirm-export').close(); runExport(...pendingExport); }
    if (b.id === 'confirm-back' || b.id === 'confirm-close') $('#confirm-export').close();
    if (b.id === 'fallback-close') $('#fallback').close();
  });

  function runExport(kind, btn) {
    if (kind === 'css') download('aipim-theme.css', T.toCSS(res, location.href), 'text/css');
    if (kind === 'figma') copy(JSON.stringify(T.toFigma(res)), btn);
  }
  function openConfirm(kind, btn) {
    const items = failureItems(), n = items.length;
    pendingExport = [kind, btn];
    $('#confirm-title').textContent = t('confirmTitle', { n, problems: problems(n) });
    $('#confirm-lead').textContent = t('confirmLead');
    $('#confirm-list').innerHTML = items.map(it => `<li>${esc(it.text)}</li>`).join('');
    $('#confirm-go span').textContent = t('confirmGo', { n, problems: problems(n) });
    $('#confirm-export').showModal();
    $('#confirm-back').focus();
  }
  // on closing (Escape included), the focus goes back to the button that asked
  $('#confirm-export').addEventListener('close', () => { if (pendingExport) pendingExport[1].focus(); });

  function download(name, text, type) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type }));
    a.download = name; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
  }
  async function copy(text, btn) {
    try {
      await navigator.clipboard.writeText(text);
      const label = $('span', btn), was = label.textContent;
      label.textContent = t('copied'); setTimeout(() => { label.textContent = was; }, 1600);
    } catch (err) {
      $('#fallback-text').value = text; $('#fallback').showModal(); $('#fallback-text').select();
    }
  }

  renderStatic();
  update();
})();
