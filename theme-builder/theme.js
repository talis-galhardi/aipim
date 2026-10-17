/* Aipim theme builder: the color engine.
 *
 * A port of the color part of tools/build_tokens.py (seeds -> ramps -> semantic roles -> checks), so a theme made in
 * the browser is the same theme the script would make. With the default seeds and no changes it must give exactly the
 * colors in tokens/tokens.json: tools/verify_theme_builder.py checks that, so if you change the script, change this too.
 *
 * What the builder adds on top of the script:
 *  - a color can come from a hex ("the brand color"): its hue and chroma become the seed and, when pinned, the hex itself
 *    replaces the nearest tone of the ramp, so the brand color is in the palette as typed;
 *  - each semantic role starts at the script's tone and, if a check fails, moves to the nearest tone that passes
 *    ("auto"); the person can also pick a tone by hand ("manual"), and a manual tone is never moved;
 *  - outputs: a CSS file to load after aipim.css, and a JSON the Figma plugin reads.
 *
 * Plain script, no modules: it works opened straight from the disk (file://), where browsers block ES modules.
 * Sets globalThis.AipimTheme.
 *
 * Aipim design system · https://github.com/talis-galhardi/aipim · MIT License · Copyright (c) 2026 Talis Galhardi
 */
(function (root) {
  'use strict';

  // ---------------------------------------------------------------------------------------------------------------
  // Color math (OKLCH <-> sRGB), as in build_tokens.py
  // ---------------------------------------------------------------------------------------------------------------
  function oklchToLin(L, C, h) {
    const a = C * Math.cos(h * Math.PI / 180), b = C * Math.sin(h * Math.PI / 180);
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.2914855480 * b;
    const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
    return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
      -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
      -0.0041960863 * l - 0.7034186147 * m + 1.7076147010 * s];
  }
  const inGamut = rgb => rgb.every(v => v >= -1e-4 && v <= 1 + 1e-4);
  function enc(v) { v = Math.min(1, Math.max(0, v)); return v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055; }
  // Python's round() rounds halves to even; Math.round rounds them up. Same rule here so hexes match the script.
  function pyRound(x) { const f = Math.floor(x), d = x - f; if (d === 0.5) return f % 2 === 0 ? f : f + 1; return Math.round(x); }
  const hex2 = n => n.toString(16).padStart(2, '0');
  const toHex = lin => '#' + lin.map(v => hex2(pyRound(enc(v) * 255))).join('');
  function fromHex(h) { h = h.replace('#', ''); return [0, 2, 4].map(i => parseInt(h.slice(i, i + 2), 16) / 255); }
  const lin = c => c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  function lum(h) { const [r, g, b] = fromHex(h).map(lin); return 0.2126 * r + 0.7152 * g + 0.0722 * b; }
  function contrast(a, b) { const la = lum(a), lb = lum(b); return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05); }
  function make(L, C, h) {
    let c = C;
    while (c > 0 && !inGamut(oklchToLin(L, c, h))) c -= 0.002;
    return toHex(oklchToLin(L, Math.max(c, 0), h));
  }
  function toOklab(h) {
    const [r, g, b] = fromHex(h).map(lin);
    const l = (0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b) ** (1 / 3);
    const m = (0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b) ** (1 / 3);
    const s = (0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b) ** (1 / 3);
    return [0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s,
      1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s,
      0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s];
  }
  function toOklch(h) {
    const [L, a, b] = toOklab(h);
    return { L, C: Math.hypot(a, b), h: ((Math.atan2(b, a) * 180 / Math.PI) + 360) % 360 };
  }
  const isHex = s => /^#?[0-9a-f]{6}$/i.test(String(s).trim());
  const normHex = s => '#' + String(s).trim().replace('#', '').toLowerCase();

  // ---------------------------------------------------------------------------------------------------------------
  // Scales, as in build_tokens.py
  // ---------------------------------------------------------------------------------------------------------------
  const COLORS = ['primary', 'secondary', 'tertiary', 'success', 'error'];
  const RAMP_ORDER = [...COLORS, 'neutral'];
  const DEFAULT_SEEDS = {
    primary: { h: 36, c: 0.190 }, secondary: { h: 255, c: 0.220 }, tertiary: { h: 92, c: 0.170 },
    success: { h: 155, c: 0.150 }, error: { h: 6, c: 0.210 }, neutral: { h: 58, c: 0.016 },
  };
  const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
  const LIGHT = [0.975, 0.950, 0.910, 0.850, 0.770, 0.690, 0.600, 0.510, 0.420, 0.330, 0.240];
  const CHROMA = [0.10, 0.20, 0.38, 0.58, 0.82, 1.0, 1.0, 0.92, 0.78, 0.62, 0.46];
  const LIGHT_NUDGE = { secondary: { 400: 0.79 }, tertiary: { 300: 0.88 } };
  const CHROMA_NUDGE = { tertiary: { 300: 1.0 } };
  const TONES = STEPS.slice(1, -1);
  const NL = [0.985, 0.962, 0.925, 0.865, 0.78, 0.69, 0.585, 0.485, 0.385, 0.29, 0.20];
  const NC = [0.35, 0.5, 0.7, 0.85, 1.0, 1.0, 1.0, 1.0, 0.9, 0.8, 0.7];
  const NEUTRAL_STEPS = [...STEPS, 1000];
  const stepsOf = name => name === 'neutral' ? NEUTRAL_STEPS : TONES;

  // lightness and chroma factor of a tone, with the per-ramp nudges
  function toneSpec(name, step) {
    if (name === 'neutral') {
      if (step === 1000) return { L: 0.15, f: null };
      const i = STEPS.indexOf(step); return { L: NL[i], f: NC[i] };
    }
    const i = STEPS.indexOf(step);
    return { L: (LIGHT_NUDGE[name] || {})[step] ?? LIGHT[i], f: (CHROMA_NUDGE[name] || {})[step] ?? CHROMA[i] };
  }

  function buildRamp(name, seed, pin) {
    const r = {};
    for (const s of stepsOf(name)) {
      if (name === 'neutral' && s === 1000) { r[s] = make(0.15, 0.010, seed.h); continue; }
      const { L, f } = toneSpec(name, s); r[s] = make(L, seed.c * f, seed.h);
    }
    if (pin && pin.hex && r[pin.step] !== undefined) r[pin.step] = pin.hex;
    return r;
  }

  // A hex in, a seed out: its hue, and the chroma that puts the hex's own vividness on the tone nearest its lightness.
  // `step` is that nearest tone, where the hex goes when pinned.
  function seedFromHex(name, hex) {
    hex = normHex(hex);
    const { L, C, h } = toOklch(hex);
    let best = null;
    for (const s of stepsOf(name)) {
      if (s === 1000) continue;
      const spec = toneSpec(name, s), d = Math.abs(spec.L - L);
      if (!best || d < best.d) best = { s, d, f: spec.f };
    }
    const c = Math.min(0.37, C / (best.f || 1));
    return { seed: { h: Math.round(h * 10) / 10, c: Math.round(c * 1000) / 1000 }, step: best.s };
  }

  // ---------------------------------------------------------------------------------------------------------------
  // Semantic roles: the script's tone for each, per theme
  // ---------------------------------------------------------------------------------------------------------------
  const SEMANTIC = {
    light: {
      'bg.canvas': ['neutral', 100], 'bg.surface': ['neutral', 50], 'bg.sunken': ['neutral', 200], 'bg.scrim': ['neutral', 1000],
      'text.primary': ['neutral', 950], 'text.secondary': ['neutral', 800], 'text.muted': ['neutral', 700], 'text.inverse': ['neutral', 50],
      'border.subtle': ['neutral', 300], 'border.strong': ['neutral', 600],
      'action.primary.bg': ['primary', 700], 'action.primary.text': ['neutral', 50], 'action.primary.hover': ['primary', 800],
      'action.secondary.bg': ['secondary', 700], 'action.secondary.text': ['neutral', 50], 'action.secondary.hover': ['secondary', 800],
      'link': ['secondary', 800], 'link.hover': ['secondary', 900], 'link.visited': ['primary', 800], 'focus.ring': ['secondary', 700],
      'accent.bg': ['tertiary', 300], 'accent.text': ['neutral', 950],
      'success.bg': ['success', 100], 'success.text': ['success', 800], 'success.icon': ['success', 700],
      'warning.bg': ['tertiary', 100], 'warning.text': ['tertiary', 900], 'warning.icon': ['tertiary', 800],
      'error.bg': ['error', 100], 'error.text': ['error', 800], 'error.icon': ['error', 600],
      'info.bg': ['secondary', 100], 'info.text': ['secondary', 800], 'info.icon': ['secondary', 600],
      'tint.primary': ['primary', 300], 'tint.secondary': ['secondary', 300], 'tint.tertiary': ['tertiary', 300], 'tint.success': ['success', 300], 'tint.error': ['error', 300],
      'tint.text': ['neutral', 950], 'tint.text.muted': ['neutral', 800],
    },
    dark: {
      'bg.canvas': ['neutral', 950], 'bg.surface': ['neutral', 900], 'bg.sunken': ['neutral', 1000], 'bg.scrim': ['neutral', 1000],
      'text.primary': ['neutral', 50], 'text.secondary': ['neutral', 200], 'text.muted': ['neutral', 300], 'text.inverse': ['neutral', 950],
      'border.subtle': ['neutral', 800], 'border.strong': ['neutral', 500],
      'action.primary.bg': ['primary', 400], 'action.primary.text': ['neutral', 950], 'action.primary.hover': ['primary', 300],
      'action.secondary.bg': ['secondary', 400], 'action.secondary.text': ['neutral', 950], 'action.secondary.hover': ['secondary', 300],
      'link': ['secondary', 400], 'link.hover': ['secondary', 300], 'link.visited': ['primary', 300], 'focus.ring': ['secondary', 300],
      'accent.bg': ['tertiary', 300], 'accent.text': ['neutral', 950],
      'success.bg': ['success', 900], 'success.text': ['success', 200], 'success.icon': ['success', 200],
      'warning.bg': ['tertiary', 900], 'warning.text': ['tertiary', 200], 'warning.icon': ['tertiary', 300],
      'error.bg': ['error', 900], 'error.text': ['error', 200], 'error.icon': ['error', 500],
      'info.bg': ['secondary', 900], 'info.text': ['secondary', 200], 'info.icon': ['secondary', 400],
      'tint.primary': ['primary', 800], 'tint.secondary': ['secondary', 800], 'tint.tertiary': ['tertiary', 800], 'tint.success': ['success', 800], 'tint.error': ['error', 800],
      'tint.text': ['neutral', 50], 'tint.text.muted': ['neutral', 200],
    },
  };
  const ROLES = Object.keys(SEMANTIC.light);
  const MODES = ['light', 'dark'];
  // A hover keeps its distance from its resting color: when the resting tone moves, the hover moves with it.
  const FOLLOWS = { 'action.primary.hover': 'action.primary.bg', 'action.secondary.hover': 'action.secondary.bg', 'link.hover': 'link' };

  // ---------------------------------------------------------------------------------------------------------------
  // Checks, as in build_tokens.py (with the labels the builder shows)
  // ---------------------------------------------------------------------------------------------------------------
  const CHECKS = [
    ['text.primary', 'bg.canvas', 7, 'Body text (AAA)', 'Texto do corpo (AAA)'],
    ['text.primary', 'bg.surface', 7, 'Body text on card (AAA)', 'Texto do corpo no card (AAA)'],
    ['text.secondary', 'bg.canvas', 7, 'Secondary text (AAA)', 'Texto secundário (AAA)'],
    ['text.secondary', 'bg.surface', 7, 'Secondary text on card (AAA)', 'Texto secundário no card (AAA)'],
    ['text.muted', 'bg.canvas', 4.5, 'Supporting text (AA)', 'Texto de apoio (AA)'],
    ['text.muted', 'bg.surface', 4.5, 'Supporting text on card (AA)', 'Texto de apoio no card (AA)'],
    ['text.muted', 'bg.sunken', 4.5, 'Supporting text on recessed area (AA)', 'Texto de apoio na área rebaixada (AA)'],
    ['border.strong', 'bg.canvas', 3, 'Field border (UI 3:1)', 'Borda de campo (UI 3:1)'],
    ['border.strong', 'bg.surface', 3, 'Field border on card (UI 3:1)', 'Borda de campo no card (UI 3:1)'],
    ['action.primary.text', 'action.primary.bg', 4.5, 'Primary button (AA)', 'Botão primário (AA)'],
    ['action.primary.text', 'action.primary.hover', 4.5, 'Primary button on hover (AA)', 'Botão primário no hover (AA)'],
    ['action.primary.bg', 'bg.canvas', 3, 'Primary button against background (UI 3:1)', 'Botão primário contra o fundo (UI 3:1)'],
    ['action.primary.bg', 'bg.surface', 3, 'Primary button on card (UI 3:1)', 'Botão primário no card (UI 3:1)'],
    ['action.secondary.text', 'action.secondary.bg', 4.5, 'Secondary button (AA)', 'Botão secundário (AA)'],
    ['action.secondary.text', 'action.secondary.hover', 4.5, 'Secondary button on hover (AA)', 'Botão secundário no hover (AA)'],
    ['action.secondary.bg', 'bg.canvas', 3, 'Secondary button against background (UI 3:1)', 'Botão secundário contra o fundo (UI 3:1)'],
    ['link', 'bg.canvas', 7, 'Link (AAA)', 'Link (AAA)'],
    ['link', 'bg.surface', 7, 'Link on card (AAA)', 'Link no card (AAA)'],
    ['link.hover', 'bg.canvas', 7, 'Link on hover (AAA)', 'Link no hover (AAA)'],
    ['link.hover', 'bg.surface', 7, 'Link on hover on card (AAA)', 'Link no hover no card (AAA)'],
    ['link.visited', 'bg.canvas', 4.5, 'Visited link (AA)', 'Link visitado (AA)'],
    ['focus.ring', 'bg.canvas', 3, 'Focus ring (3:1)', 'Anel de foco (3:1)'],
    ['focus.ring', 'bg.surface', 3, 'Focus ring on card (3:1)', 'Anel de foco no card (3:1)'],
    ['accent.text', 'accent.bg', 7, 'Text on accent (AAA)', 'Texto sobre o destaque (AAA)'],
    ['success.text', 'success.bg', 7, 'Success, text (AAA)', 'Sucesso, texto (AAA)'],
    ['success.icon', 'success.bg', 3, 'Success, icon (3:1)', 'Sucesso, ícone (3:1)'],
    ['warning.text', 'warning.bg', 7, 'Warning, text (AAA)', 'Aviso, texto (AAA)'],
    ['warning.icon', 'warning.bg', 3, 'Warning, icon (3:1)', 'Aviso, ícone (3:1)'],
    ['error.text', 'error.bg', 7, 'Error, text (AAA)', 'Erro, texto (AAA)'],
    ['error.icon', 'error.bg', 3, 'Error, icon (3:1)', 'Erro, ícone (3:1)'],
    ['info.text', 'info.bg', 7, 'Info, text (AAA)', 'Informação, texto (AAA)'],
    ['info.icon', 'info.bg', 3, 'Info, icon (3:1)', 'Informação, ícone (3:1)'],
  ];
  const TINT_PT = { primary: 'principal', secondary: 'secundária', tertiary: 'destaque', success: 'sucesso', error: 'erro' };
  for (const t of COLORS) CHECKS.push(['tint.text', `tint.${t}`, 7, `Text on ${t} tint (AAA)`, `Texto sobre o tint ${TINT_PT[t]} (AAA)`]);
  for (const t of COLORS) CHECKS.push(['tint.text.muted', `tint.${t}`, 4.5, `Supporting text on ${t} tint (AA)`, `Texto de apoio sobre o tint ${TINT_PT[t]} (AA)`]);

  const CVD = {
    protanopia: [[0.152286, 1.052583, -0.204868], [0.114503, 0.786281, 0.099216], [-0.003882, -0.048116, 1.051998]],
    deuteranopia: [[0.367322, 0.860646, -0.227968], [0.280085, 0.672501, 0.047413], [-0.011820, 0.042940, 0.968881]],
    tritanopia: [[1.255528, -0.076749, -0.178779], [-0.078411, 0.930809, 0.147602], [0.004733, 0.691367, 0.303900]],
  };
  function sim(h, mat) {
    const c = fromHex(h).map(lin);
    return toHex([0, 1, 2].map(i => Math.max(0, Math.min(1, mat[i][0] * c[0] + mat[i][1] * c[1] + mat[i][2] * c[2]))));
  }
  function deltaE(a, b) { const p = toOklab(a), q = toOklab(b); return 100 * Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]); }
  const CVD_PAIRS = [['success.icon', 'error.icon'], ['error.icon', 'action.primary.bg'], ['warning.icon', 'success.icon'],
    ['action.secondary.bg', 'action.primary.bg'], ['success.icon', 'info.icon'], ['link', 'text.primary']];
  const CVD_MIN = 8, LINK_VS_TEXT_MIN = 20;

  // ---------------------------------------------------------------------------------------------------------------
  // Resolve a theme: ramps, the tone of every role (auto or manual), the hexes and every check
  // ---------------------------------------------------------------------------------------------------------------
  // theme = { seeds: {name: {h, c}}, pins: {name: {step, hex}}, manual: {light: {role: step}, dark: {...}} }
  function defaultTheme() {
    return { seeds: JSON.parse(JSON.stringify(DEFAULT_SEEDS)), pins: {}, manual: { light: {}, dark: {} } };
  }

  function contrastChecksOf(mode, role) {
    return CHECKS.filter(c => c[0] === role || c[1] === role);
  }

  function resolve(theme) {
    const ramps = {};
    for (const n of RAMP_ORDER) ramps[n] = buildRamp(n, theme.seeds[n] || DEFAULT_SEEDS[n], (theme.pins || {})[n]);
    const steps = {}, auto = {};
    for (const mode of MODES) {
      const manual = ((theme.manual || {})[mode]) || {};
      const st = {}; auto[mode] = {};
      for (const role of ROLES) st[role] = manual[role] ?? SEMANTIC[mode][role][1];
      const nearest = (list, want) => list.includes(want) ? want : list.reduce((a, b) => Math.abs(b - want) < Math.abs(a - want) ? b : a);
      const followersOf = base => Object.keys(FOLLOWS).filter(h => FOLLOWS[h] === base && manual[h] === undefined);
      // set a role and drag its hover along (a hover keeps its distance from the resting color)
      const setRole = (role, s) => {
        st[role] = s;
        for (const h of followersOf(role)) {
          st[h] = nearest(stepsOf(SEMANTIC[mode][h][0]), s + SEMANTIC[mode][h][1] - SEMANTIC[mode][role][1]);
        }
      };
      for (const base of new Set(Object.values(FOLLOWS))) if (manual[base] !== undefined) setRole(base, st[base]);
      const hexOf = role => ramps[SEMANTIC[mode][role][0]][st[role]];
      const passes = c => contrast(hexOf(c[0]), hexOf(c[1])) >= c[2];
      // Fix failing pairs: move one free role (and its hover) to the nearest tone, counted from the script's tone, that
      // passes every check the role is in. A move is only accepted when all of those pass, so nothing that passed breaks.
      // Repeat until a full pass fixes nothing; what is left is a real failure (a manual tone, or no tone works).
      for (let round = 0; round < 40; round++) {
        let progress = false;
        for (const failing of CHECKS.filter(c => !passes(c))) {
          // a pair with a tone picked by hand is the person's call: it stays failing, nothing moves around it
          if (passes(failing) || manual[failing[0]] !== undefined || manual[failing[1]] !== undefined) continue;
          for (const role of [failing[0], failing[1]]) {
            const def = SEMANTIC[mode][role][1];
            const cands = stepsOf(SEMANTIC[mode][role][0]).slice().sort((a, b) => Math.abs(a - def) - Math.abs(b - def) || a - b);
            const keep = st[role], keepF = followersOf(role).map(h => [h, st[h]]);
            const related = new Set([role, ...followersOf(role)]);
            let done = false;
            for (const s of cands) {
              if (s === keep) continue;
              setRole(role, s);
              if (CHECKS.filter(c => related.has(c[0]) || related.has(c[1])).every(passes)) { done = true; break; }
            }
            if (done) { auto[mode][role] = st[role]; progress = true; break; }
            st[role] = keep; for (const [h, v] of keepF) st[h] = v;
          }
        }
        if (!progress) break;
      }
      steps[mode] = st;
    }
    const values = {};
    for (const mode of MODES) {
      values[mode] = {};
      for (const role of ROLES) values[mode][role] = ramps[SEMANTIC[mode][role][0]][steps[mode][role]];
    }
    // checks
    const contrastResults = [];
    for (const mode of MODES) for (const [fg, bg, min, en, pt] of CHECKS) {
      const r = contrast(values[mode][fg], values[mode][bg]);
      contrastResults.push({ mode, fg, bg, min, en, pt, ratio: r, ok: r >= min });
    }
    const cvd = [];
    for (const mode of MODES) for (const [a, b] of CVD_PAIRS) {
      const row = { mode, a, b, normal: deltaE(values[mode][a], values[mode][b]) };
      for (const [k, mat] of Object.entries(CVD)) row[k] = deltaE(sim(values[mode][a], mat), sim(values[mode][b], mat));
      row.worst = Math.min(row.normal, row.protanopia, row.deuteranopia, row.tritanopia);
      row.worstKind = ['normal', 'protanopia', 'deuteranopia', 'tritanopia'].reduce((x, y) => row[y] < row[x] ? y : x);
      row.ok = row.worst >= CVD_MIN;
      cvd.push(row);
    }
    const linkText = MODES.map(mode => {
      const d = deltaE(values[mode].link, values[mode]['text.primary']);
      return { mode, delta: d, min: LINK_VS_TEXT_MIN, ok: d >= LINK_VS_TEXT_MIN };
    });
    const failures = contrastResults.filter(r => !r.ok).length + cvd.filter(r => !r.ok).length + linkText.filter(r => !r.ok).length;
    return { ramps, steps, auto, values, contrast: contrastResults, cvd, linkText, failures, ok: failures === 0,
      passed: contrastResults.filter(r => r.ok).length, total: contrastResults.length };
  }

  // ---------------------------------------------------------------------------------------------------------------
  // When a color-blindness or link check fails, look for a nearby hue of one of the colors involved that passes
  // ---------------------------------------------------------------------------------------------------------------
  // Greedy: try a hue shift of each color involved (the brand last), keep the one that leaves the fewest failures,
  // and repeat, up to three colors. Returns the list of changes and the fixed theme, or null if nothing works.
  function suggest(theme, locked) {
    let current = JSON.parse(JSON.stringify(theme));
    let res = resolve(current);
    if (res.ok) return null;
    const changes = [];
    for (let round = 0; round < 3 && !res.ok; round++) {
      const involved = new Set();
      for (const r of res.cvd) if (!r.ok) { involved.add(SEMANTIC[r.mode][r.a][0]); involved.add(SEMANTIC[r.mode][r.b][0]); }
      for (const r of res.linkText) if (!r.ok) involved.add('secondary');
      for (const r of res.contrast) if (!r.ok) { involved.add(SEMANTIC[r.mode][r.fg][0]); involved.add(SEMANTIC[r.mode][r.bg][0]); }
      const order = ['secondary', 'tertiary', 'success', 'error', 'primary', 'neutral']
        .filter(n => involved.has(n) && !(locked || []).includes(n) && !changes.some(c => c.name === n));
      let best = null;
      for (const name of order) {
        for (let d = 10; d <= 180; d += 10) {
          for (const sign of [1, -1]) {
            const t = JSON.parse(JSON.stringify(current));
            const sd = t.seeds[name] || DEFAULT_SEEDS[name];
            t.seeds[name] = { h: ((sd.h + sign * d) % 360 + 360) % 360, c: sd.c };
            if (t.pins && t.pins[name]) delete t.pins[name];
            const r = resolve(t);
            if (!best || r.failures < best.r.failures) best = { name, t, r };
            if (r.ok) break;
          }
          if (best && best.r.ok && best.name === name) break;
        }
        if (best && best.r.ok) break;
      }
      if (!best || best.r.failures >= res.failures) return null;
      current = best.t; res = best.r;
      changes.push({ name: best.name, seed: current.seeds[best.name] });
    }
    if (!res.ok) return null;
    for (const c of changes) c.hex = res.ramps[c.name][c.name === 'neutral' ? 500 : 600];
    return { changes, theme: current };
  }

  // ---------------------------------------------------------------------------------------------------------------
  // Outputs
  // ---------------------------------------------------------------------------------------------------------------
  const kebab = k => k.replace(/\./g, '-');
  const slash = k => k.replace(/\./g, '/');

  function toCSS(res, meta) {
    const o = [`/* Aipim theme, made with the Aipim theme builder${meta ? ' · ' + meta : ''}.`,
      '   Load it AFTER aipim.css: it replaces the color primitives and the semantic roles, light and dark. */', ':root{'];
    for (const n of RAMP_ORDER) for (const s of stepsOf(n)) o.push(`  --aipim-color-${n}-${s}:${res.ramps[n][s]};`);
    const sem = (mode, ind) => ROLES.map(r => `${ind}--aipim-${kebab(r)}:var(--aipim-color-${SEMANTIC[mode][r][0]}-${res.steps[mode][r]});`);
    o.push(...sem('light', '  '), '}');
    o.push('@media (prefers-color-scheme:dark){', '  :root:not([data-theme="light"]){', ...sem('dark', '    '), '  }', '}');
    o.push(':root[data-theme="dark"]{', ...sem('dark', '  '), '}');
    return o.join('\n') + '\n';
  }

  // What the Figma plugin reads: the primitives as hex, and each semantic role as an alias to a primitive, per mode.
  // Names are the Figma variable names (color/primary/700, action/primary/bg).
  function toFigma(res) {
    const primitives = {};
    for (const n of RAMP_ORDER) for (const s of stepsOf(n)) primitives[`color/${n}/${s}`] = res.ramps[n][s];
    const semantic = { Light: {}, Dark: {} };
    for (const [mode, name] of [['light', 'Light'], ['dark', 'Dark']]) {
      for (const r of ROLES) semantic[name][slash(r)] = `color/${SEMANTIC[mode][r][0]}/${res.steps[mode][r]}`;
    }
    return { format: 'aipim-theme', version: 1, primitives, semantic };
  }

  // The theme in a short string for the address bar, so a theme can be shared as a link.
  function encode(theme) {
    const p = [];
    for (const n of RAMP_ORDER) {
      const s = theme.seeds[n], pin = (theme.pins || {})[n];
      p.push(pin ? `${n}=${pin.hex.slice(1)}` : `${n}=${s.h},${s.c}`);
    }
    for (const m of MODES) for (const [r, s] of Object.entries((theme.manual || {})[m] || {})) p.push(`${m[0]}.${r}=${s}`);
    return p.join('&');
  }
  function decode(str) {
    const t = defaultTheme();
    for (const part of String(str || '').replace(/^#/, '').split('&')) {
      const [k, v] = part.split('=');
      if (!k || v === undefined) continue;
      if (RAMP_ORDER.includes(k)) {
        if (/^[0-9a-f]{6}$/i.test(v)) { const r = seedFromHex(k, v); t.seeds[k] = r.seed; t.pins[k] = { step: r.step, hex: normHex(v) }; }
        else { const [h, c] = v.split(',').map(Number); if (isFinite(h) && isFinite(c)) t.seeds[k] = { h, c }; }
      } else if (/^[ld]\./.test(k)) {
        const mode = k[0] === 'l' ? 'light' : 'dark', role = k.slice(2), s = Number(v);
        if (ROLES.includes(role) && stepsOf(SEMANTIC[mode][role][0]).includes(s)) t.manual[mode][role] = s;
      }
    }
    return t;
  }

  root.AipimTheme = {
    COLORS, RAMP_ORDER, DEFAULT_SEEDS, SEMANTIC, ROLES, MODES, CHECKS, CVD_PAIRS, CVD_MIN, LINK_VS_TEXT_MIN, FOLLOWS,
    stepsOf, buildRamp, seedFromHex, defaultTheme, resolve, suggest, toCSS, toFigma, encode, decode,
    contrast, deltaE, isHex, normHex, toOklch, contrastChecksOf,
  };
})(typeof globalThis !== 'undefined' ? globalThis : this);
