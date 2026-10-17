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
      colorsH: '1. Suas cores', usageH: '2. Onde cada tom é usado', usageLead: 'Cada uso começa no tom do Aipim. Se uma checagem falha, ele vai sozinho para o tom mais próximo que passa (marcado como automático). Você pode escolher outro tom, mas se ele não passar, o tema não pode ser exportado.',
      checksH: '3. Checagens', exportH: '4. Exportar', light: 'Claro', dark: 'Escuro', reset: 'Voltar às cores do Aipim',
      pin: 'Manter este tom exato', pinHelp: 'Seu hex entra na escala no tom {step}.', hexLabel: 'Hex de {name}', pickLabel: 'Escolher {name}',
      auto: 'Automático', autoMoved: 'automático', manual: 'manual', backToAuto: 'Voltar ao automático de {role}',
      toneOf: 'Tom de {role}', allPass: 'Tudo passa: {n} checagens de contraste WCAG 2.2 e as de daltonismo, nos temas claro e escuro.',
      someFail: '{n} {checks} não {pass}. Enquanto houver falhas, o tema não pode ser exportado.', check1: 'checagem', checkN: 'checagens', pass1: 'passa', passN: 'passam',
      needs: 'precisa de {min}:1', cvdMsg: '{a} e {b} ficam parecidos demais para quem tem {kind} (diferença {d}, precisa de {min})',
      linkMsg: 'O link não se destaca o bastante do texto (diferença {d}, precisa de {min})',
      kinds: { normal: 'visão comum', protanopia: 'protanopia', deuteranopia: 'deuteranopia', tritanopia: 'tritanopia' },
      suggestH: 'Sugestão que passa', suggestApply: 'Aplicar sugestão', suggestNone: 'Não achei uma troca automática. Escolha outro tom à mão ou mude uma das cores.',
      suggestText: 'Trocar {list}.', to: 'para',
      dlCss: 'Baixar CSS', copyFigma: 'Copiar para o Figma', copyLink: 'Copiar link do tema', copied: 'Copiado', blocked: 'Corrija as checagens acima para exportar.',
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
      colorsH: '1. Your colors', usageH: '2. Where each tone is used', usageLead: 'Each use starts on the Aipim tone. If a check fails, it moves by itself to the nearest tone that passes (marked as auto). You can pick another tone, but if it fails, the theme cannot be exported.',
      checksH: '3. Checks', exportH: '4. Export', light: 'Light', dark: 'Dark', reset: 'Back to the Aipim colors',
      pin: 'Keep this exact tone', pinHelp: 'Your hex goes into the scale at tone {step}.', hexLabel: '{name} hex', pickLabel: 'Pick {name}',
      auto: 'Auto', autoMoved: 'auto', manual: 'manual', backToAuto: 'Back to auto for {role}',
      toneOf: '{role} tone', allPass: 'Everything passes: {n} WCAG 2.2 contrast checks and the color-blindness ones, in light and dark.',
      someFail: '{n} {checks} {pass} not pass. While anything fails, the theme cannot be exported.', check1: 'check', checkN: 'checks', pass1: 'does', passN: 'do',
      needs: 'needs {min}:1', cvdMsg: '{a} and {b} look too alike for people with {kind} (difference {d}, needs {min})',
      linkMsg: 'The link does not stand out enough from the text (difference {d}, needs {min})',
      kinds: { normal: 'typical vision', protanopia: 'protanopia', deuteranopia: 'deuteranopia', tritanopia: 'tritanopia' },
      suggestH: 'A fix that passes', suggestApply: 'Apply suggestion', suggestNone: 'No automatic fix found. Pick another tone by hand or change one of the colors.',
      suggestText: 'Change {list}.', to: 'to',
      dlCss: 'Download CSS', copyFigma: 'Copy for Figma', copyLink: 'Copy theme link', copied: 'Copied', blocked: 'Fix the checks above to export.',
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
  let usageMode = 'light', previewMode = 'light';
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
  }

  function renderColors() {
    const box = $('#colors');
    box.innerHTML = T.RAMP_ORDER.map(n => {
      const [name, help] = COLOR_NAMES[n][lang], hex = anchorHex(n), pinned = !!theme.pins[n];
      const steps = T.stepsOf(n).filter(s => n !== 'neutral' || (s >= 100 && s <= 900));
      return `<div class="tb-color" data-color="${n}">
        <label class="tb-swatch" style="background:${hex}"><span class="aipim-visually-hidden">${esc(t('pickLabel', { name }))}</span><input type="color" value="${hex}" data-pick="${n}"></label>
        <div class="tb-color__text"><p class="tb-color__name">${esc(name)}</p><p class="tb-color__help">${esc(help)}</p></div>
        <input class="tb-hex" type="text" value="${hex}" spellcheck="false" maxlength="7" aria-label="${esc(t('hexLabel', { name }))}" data-hex="${n}">
        <div class="tb-ramp" aria-hidden="true">${steps.map(s => `<span class="tb-ramp__tone${pinned && theme.pins[n].step === s ? ' is-pinned' : ''}" style="background:${res.ramps[n][s]}" title="${s} ${res.ramps[n][s]}"></span>`).join('')}</div>
        <label class="aipim-checkbox tb-pin"${theme.pins[n] || theme._hex[n] ? '' : ' hidden'}><input class="aipim-checkbox__input" type="checkbox" data-pin="${n}"${pinned ? ' checked' : ''}><span class="aipim-checkbox__box" aria-hidden="true"></span><span class="aipim-checkbox__label">${esc(t('pin'))}${pinned ? ` <span class="tb-muted">${esc(t('pinHelp', { step: theme.pins[n].step }))}</span>` : ''}</span></label>
      </div>`;
    }).join('');
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

  function failureLines() {
    const L = { light: t('light'), dark: t('dark') }, out = [];
    for (const r of res.contrast) if (!r.ok) out.push(`${L[r.mode]} · ${lang === 'pt' ? r.pt : r.en}: ${num(r.ratio, 2)}:1, ${t('needs', { min: num(r.min, r.min % 1 ? 1 : 0) })}`);
    for (const r of res.cvd) if (!r.ok) out.push(`${L[r.mode]} · ${t('cvdMsg', { a: roleName(r.a), b: roleName(r.b), kind: COPY[lang].kinds[r.worstKind], d: num(r.worst), min: T.CVD_MIN })}`);
    for (const r of res.linkText) if (!r.ok) out.push(`${L[r.mode]} · ${t('linkMsg', { d: num(r.delta), min: T.LINK_VS_TEXT_MIN })}`);
    return out;
  }

  let lastSuggestion = null;
  function renderChecks() {
    const box = $('#checks');
    if (res.ok) {
      lastSuggestion = null;
      box.innerHTML = `<div class="aipim-alert aipim-alert--success" role="status">${icon('success').replace('aipim-icon', 'aipim-icon aipim-alert__icon')}<div class="aipim-alert__content"><p class="aipim-alert__message">${esc(t('allPass', { n: res.total }))}</p></div></div>`;
      return;
    }
    const lines = failureLines(), n = lines.length;
    lastSuggestion = T.suggest(theme, ['primary']);
    // the way out goes inside the same alert, so the problem and its fix are read together
    const sug = lastSuggestion
      ? `<div class="tb-suggest"><span class="tb-suggest__swatches" aria-hidden="true">${lastSuggestion.changes.map(c => `<span style="background:${c.hex}"></span>`).join('')}</span>
         <p><strong>${esc(t('suggestH'))}:</strong> ${esc(t('suggestText', { list: lastSuggestion.changes.map(c => `${colorName(c.name)} ${t('to')} ${c.hex}`).join(', ') }))}</p>
         <button class="aipim-button aipim-button--secondary aipim-button--sm" type="button" id="apply-suggestion"><span>${esc(t('suggestApply'))}</span></button></div>`
      : `<p class="tb-suggest">${esc(t('suggestNone'))}</p>`;
    box.innerHTML = `<div class="aipim-alert aipim-alert--error" role="alert">${icon('error').replace('aipim-icon', 'aipim-icon aipim-alert__icon')}<div class="aipim-alert__content"><p class="aipim-alert__title">${esc(t('someFail', { n, checks: n === 1 ? t('check1') : t('checkN'), pass: n === 1 ? t('pass1') : t('passN') }))}</p><ul class="tb-fails">${lines.map(l => `<li>${esc(l)}</li>`).join('')}</ul>${sug}</div></div>`;
  }

  function renderExport() {
    for (const b of document.querySelectorAll('[data-export]')) b.disabled = !res.ok;
    $('#export-blocked').hidden = res.ok;
    $('.tb-how').hidden = !res.ok;
  }

  // The preview gets the theme as inline custom properties: every primitive and every semantic role as a hex, for
  // the mode shown. Semantic roles are set directly (not as var()) because aipim.css resolves them on :root.
  function renderPreview() {
    setTabs('[data-preview-mode]', 'previewMode', previewMode, '#preview-panel');
    const el = $('#preview'), st = [];
    for (const n of T.RAMP_ORDER) for (const s of T.stepsOf(n)) st.push(`--aipim-color-${n}-${s}:${res.ramps[n][s]}`);
    for (const r of T.ROLES) st.push(`--aipim-${r.replace(/\./g, '-')}:${res.values[previewMode][r]}`);
    st.push(`color-scheme:${previewMode}`);
    el.setAttribute('style', st.join(';'));
    el.dataset.mode = previewMode;
  }

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
    res = T.resolve(theme);
    if (!opts.keepColors) renderColors();
    renderUsage(); renderChecks(); renderExport(); renderPreview();
    history.replaceState(null, '', location.pathname + location.search + '#' + T.encode(theme));
  }

  // ---------------------------------------------------------------------------------------------------------------
  // Events
  // ---------------------------------------------------------------------------------------------------------------
  function setColor(n, hex, keepInput) {
    hex = T.normHex(hex);
    const r = T.seedFromHex(n, hex);
    theme._hex[n] = hex;
    theme.seeds[n] = r.seed;
    const pinBox = document.querySelector(`[data-pin="${n}"]`);
    const wantPin = pinBox && !pinBox.closest('label').hidden ? pinBox.checked : true;
    if (wantPin) theme.pins[n] = { step: r.step, hex }; else delete theme.pins[n];
    update({ keepColors: keepInput });
    if (keepInput) {
      // refresh this row without losing focus in its text field
      const row = document.querySelector(`[data-color="${n}"]`);
      $('.tb-swatch', row).style.background = hex; $('[data-pick]', row).value = hex;
      const steps = T.stepsOf(n).filter(s => n !== 'neutral' || (s >= 100 && s <= 900));
      $('.tb-ramp', row).innerHTML = steps.map(s => `<span class="tb-ramp__tone${theme.pins[n] && theme.pins[n].step === s ? ' is-pinned' : ''}" style="background:${res.ramps[n][s]}" title="${s} ${res.ramps[n][s]}"></span>`).join('');
      const pin = $('[data-pin]', row); pin.checked = !!theme.pins[n]; pin.closest('label').hidden = false;
    }
  }

  document.addEventListener('input', e => {
    const pick = e.target.dataset.pick, hexIn = e.target.dataset.hex;
    if (pick) { setColor(pick, e.target.value, true); $(`[data-hex="${pick}"]`).value = e.target.value; }
    if (hexIn && T.isHex(e.target.value)) setColor(hexIn, e.target.value, true);
  });
  document.addEventListener('change', e => {
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
    if (b.id === 'apply-suggestion' && lastSuggestion) {
      for (const c of lastSuggestion.changes) { theme.seeds[c.name] = c.seed; delete theme.pins[c.name]; delete theme._hex[c.name]; }
      update();
    }
    if (b.id === 'reset') { theme = T.defaultTheme(); theme._hex = {}; update(); }
    if (b.id === 'lang') { lang = lang === 'pt' ? 'en' : 'pt'; const u = new URL(location.href); u.searchParams.set('lang', lang); history.replaceState(null, '', u); renderStatic(); update(); }
    if (b.dataset.export === 'css' && res.ok) download('aipim-theme.css', T.toCSS(res, location.href), 'text/css');
    if (b.dataset.export === 'figma' && res.ok) copy(JSON.stringify(T.toFigma(res)), b);
    if (b.dataset.export === 'link' && res.ok) copy(location.href, b);
    if (b.id === 'fallback-close') $('#fallback').close();
  });

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
