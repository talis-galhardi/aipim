// Aipim Theme: applies a theme made in the Aipim theme builder (theme-builder/) to the variables of an Aipim Figma file.
// It changes the color primitives (collection "Primitives", color/<ramp>/<tone>) and points every semantic role
// (collection "Semantic", modes Light and Dark) at the tone the builder chose. It only edits variables that already
// exist in the file and never creates or deletes one, so components, styles and bindings stay as they are.
// It works on the file's own (local) variables: run it in your copy of the Aipim file, then publish the library.
// Aipim design system · https://github.com/talis-galhardi/aipim · MIT License · Copyright (c) 2026 Talis Galhardi

// The window starts short and then takes the height of its content (the UI sends it, see ui.html).
figma.showUI(__html__, { width: 420, height: 420, themeColors: true });

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return { r: parseInt(h.slice(0, 2), 16) / 255, g: parseInt(h.slice(2, 4), 16) / 255, b: parseInt(h.slice(4, 6), 16) / 255 };
}

async function apply(theme, dryRun) {
  if (!theme || theme.format !== 'aipim-theme' || !theme.primitives || !theme.semantic) {
    throw new Error('not-a-theme');
  }
  // Every color is checked before anything is written, so a theme edited by hand never lands half applied.
  if (Object.values(theme.primitives).some(hex => !/^#[0-9a-f]{6}$/i.test(hex))) throw new Error('bad-color');
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  const byName = {};
  for (const c of collections) {
    for (const id of c.variableIds) {
      const v = await figma.variables.getVariableByIdAsync(id);
      if (v && v.resolvedType === 'COLOR') byName[`${c.name}::${v.name}`] = { v, c };
    }
  }
  const prim = collections.find(c => c.name === 'Primitives');
  const sem = collections.find(c => c.name === 'Semantic');
  if (!prim || !sem) throw new Error('no-aipim');

  const report = { primitives: 0, roles: 0, missing: [] };
  for (const [name, hex] of Object.entries(theme.primitives)) {
    const hit = byName[`Primitives::${name}`];
    if (!hit) { report.missing.push(name); continue; }
    if (!dryRun) hit.v.setValueForMode(prim.modes[0].modeId, hexToRgb(hex));
    report.primitives++;
  }
  for (const [modeName, roles] of Object.entries(theme.semantic)) {
    const mode = sem.modes.find(m => m.name === modeName);
    if (!mode) { report.missing.push(`mode ${modeName}`); continue; }
    for (const [role, target] of Object.entries(roles)) {
      const hit = byName[`Semantic::${role}`], to = byName[`Primitives::${target}`];
      if (!hit || !to) { report.missing.push(hit ? target : role); continue; }
      if (!dryRun) hit.v.setValueForMode(mode.modeId, figma.variables.createVariableAlias(to.v));
      report.roles++;
    }
  }
  report.missing = [...new Set(report.missing)];
  return report;
}

figma.ui.onmessage = async msg => {
  if (msg.type === 'resize') { figma.ui.resize(420, Math.min(Math.max(msg.height, 240), 800)); return; }
  if (msg.type !== 'apply' && msg.type !== 'check') return;
  try {
    const theme = JSON.parse(msg.text);
    const report = await apply(theme, msg.type === 'check');
    figma.ui.postMessage({ type: 'done', dryRun: msg.type === 'check', report });
  } catch (err) {
    figma.ui.postMessage({ type: 'error', code: err instanceof SyntaxError ? 'not-json' : err.message });
  }
};
