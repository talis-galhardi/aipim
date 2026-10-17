#!/usr/bin/env python3
"""Checks the theme builder (theme-builder/). Writes nothing; prints what it checked and exits 1 on a failure.

1. Parity (always; needs Node): theme-builder/theme.js, with the default seeds and nothing changed, must give exactly the
   colors of tokens/tokens.json (every tone of every ramp, every semantic role in light and dark) and pass the same
   84 contrast checks. The builder is a port of tools/build_tokens.py: when one changes, this fails until the other does.
   Then the rules of the engine on other colors: a brand color whose pairs fail for color blindness is fixed by tone alone
   (the colors the person picked do not change), and on 200 random themes every suggestion keeps the status colors in
   their family (theme.js, HUE_WINDOW).
2. Browser (with --browser [chromium|webkit|firefox]; needs Playwright and `npm install` for axe-core): the page opens
   without script errors and axe finds nothing in its light and dark themes. With a theme that still fails: "See as"
   counts the problem under the right kind of vision and filters the preview, the problem is marked on the preview, the
   export asks once (focus on the safe button, Escape goes back), the file carries the failures, axe finds nothing with
   the confirmation open, and the suggestion fixes the theme.

Run from anywhere:  python3 tools/verify_theme_builder.py            # parity only
                    python3 tools/verify_theme_builder.py --browser  # parity and the page, in Chromium
"""
import functools
import http.server
import json
import pathlib
import subprocess
import sys
import threading

ROOT = pathlib.Path(__file__).resolve().parent.parent
ENGINE = sys.argv[sys.argv.index('--browser') + 1] if '--browser' in sys.argv and len(sys.argv) > sys.argv.index('--browser') + 1 and not sys.argv[sys.argv.index('--browser') + 1].startswith('-') else 'chromium'

NODE = r"""
const vm = require('vm'), fs = require('fs');
const ctx = {}; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(process.argv[1] + '/theme-builder/theme.js', 'utf8'), ctx);
const T = ctx.AipimTheme, r = T.resolve(T.defaultTheme());
const tok = JSON.parse(fs.readFileSync(process.argv[1] + '/tokens/tokens.json', 'utf8'));
const diffs = [];
for (const n of T.RAMP_ORDER) for (const s of T.stepsOf(n)) {
  const want = tok.color[n][String(s)].$value.hex;
  if (r.ramps[n][s] !== want) diffs.push(`color.${n}.${s}: builder ${r.ramps[n][s]}, tokens ${want}`);
}
for (const m of T.MODES) for (const role of T.ROLES) {
  const want = tok.semantic[m][role].$extensions.hex;
  if (r.values[m][role] !== want) diffs.push(`semantic.${m}.${role}: builder ${r.values[m][role]}, tokens ${want}`);
}
// the engine on other colors
const engine = [];
const brand = T.defaultTheme(), bs = T.seedFromHex('primary', '#3e2956');
brand.seeds.primary = bs.seed; brand.pins.primary = { step: bs.step, hex: '#3e2956' };
const rb = T.resolve(brand);
if (!rb.ok) engine.push('the brand #3e2956 still fails after the tone fix');
if (!Object.keys(rb.auto.light).length && !Object.keys(rb.auto.dark).length) engine.push('the brand #3e2956 passed without moving a tone (the test lost its meaning)');
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const hex = () => '#' + [0, 0, 0].map(() => Math.floor(rnd() * 256).toString(16).padStart(2, '0')).join('');
const hd = (a, b) => { const d = Math.abs(a - b) % 360; return d > 180 ? 360 - d : d; };
let suggested = 0;
for (let i = 0; i < 200; i++) {
  const t = T.defaultTheme();
  for (const n of ['primary', ...(i % 2 ? ['secondary', 'error'] : [])]) { const h = hex(), s = T.seedFromHex(n, h); t.seeds[n] = s.seed; t.pins[n] = { step: s.step, hex: h }; }
  if (T.resolve(t).ok) continue;
  const s = T.suggest(t, ['primary']); if (!s) continue; suggested++;
  if (!T.resolve(s.theme).ok) engine.push(`a suggestion does not pass (theme ${i})`);
  for (const c of s.changes) {
    if (c.name === 'primary') engine.push('a suggestion changed the brand');
    if (['tertiary', 'success', 'error'].includes(c.name) && hd(c.seed.h, T.defaultTheme().seeds[c.name].h) > T.HUE_WINDOW[c.name] + 0.5) engine.push(`a suggestion took ${c.name} out of its family (theme ${i})`);
  }
}
if (!suggested) engine.push('no random theme needed a suggestion (the test lost its meaning)');
console.log(JSON.stringify({ diffs, ok: r.ok, passed: r.passed, total: r.total, auto: r.auto, engine, suggested }));
"""


def parity():
    try:
        out = subprocess.run(['node', '-e', NODE, str(ROOT)], capture_output=True, text=True, check=True).stdout
    except FileNotFoundError:
        print('FAIL: Node is needed for the parity check (https://nodejs.org)'); return False
    except subprocess.CalledProcessError as e:
        print('FAIL: theme-builder/theme.js did not run:\n' + e.stderr); return False
    r = json.loads(out)
    good = True
    if r['diffs']:
        good = False
        print(f"FAIL: the builder and tokens/tokens.json differ in {len(r['diffs'])} colors:")
        for d in r['diffs'][:12]: print('  ' + d)
    if not r['ok'] or r['passed'] != r['total']:
        good = False; print(f"FAIL: the default theme does not pass in the builder ({r['passed']}/{r['total']} contrast checks)")
    if any(r['auto'][m] for m in r['auto']):
        good = False; print(f"FAIL: the builder moved tones of the default theme on its own: {r['auto']}")
    if r['engine']:
        good = False
        for e in r['engine'][:12]: print('FAIL: ' + e)
    if good:
        print(f"OK: the builder gives the same colors as tokens/tokens.json and passes {r['total']} contrast checks")
        print(f"OK: a failing brand is fixed by tone alone, and {r['suggested']} suggestions on random themes pass and keep the status colors in their family")
    return good


def browser():
    from playwright.sync_api import sync_playwright
    axe = (ROOT / 'node_modules' / 'axe-core' / 'axe.min.js')
    if not axe.exists():
        print('FAIL: run `npm install` first (axe-core)'); return False
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *a): pass
    handler = functools.partial(Quiet, directory=str(ROOT))
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler)
    threading.Thread(target=srv.serve_forever, daemon=True).start()
    url = f'http://127.0.0.1:{srv.server_address[1]}/theme-builder/'
    good = True
    with sync_playwright() as p:
        b = getattr(p, ENGINE).launch()
        for lang in ('pt', 'en'):
            for scheme in ('light', 'dark'):
                pg = b.new_page(viewport={'width': 1280, 'height': 900}, color_scheme=scheme)
                errors = []
                pg.on('pageerror', lambda e: errors.append(str(e)))
                pg.goto(f'{url}?lang={lang}')
                pg.wait_for_selector('#usage .tb-role')
                pg.add_script_tag(path=str(axe))
                v = pg.evaluate("axe.run(document,{runOnly:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}).then(r=>r.violations.map(x=>x.id+': '+x.nodes.slice(0,3).map(n=>n.target.join(' ')).join(', ')))")
                if errors or v:
                    good = False; print(f'FAIL [{lang} {scheme}]: ' + '; '.join(errors + v))
                pg.close()
        # a theme that still fails after the tone fix: success and info icons alike for deuteranopia, in light
        failing = 'primary=07e2f7&secondary=1c4c04&tertiary=92,0.17&success=ed4f08&error=bc64da&neutral=58,0.016'
        pg = b.new_page(viewport={'width': 1280, 'height': 900}, accept_downloads=True)
        errors = []
        pg.on('pageerror', lambda e: errors.append(str(e)))
        pg.goto(f'{url}?lang=en#{failing}')
        pg.wait_for_selector('#usage .tb-role')
        def check(cond, msg):
            nonlocal good
            if not cond: good = False; print('FAIL: ' + msg)
        check('1 problem' in pg.inner_text('[data-sim=deuteranopia]'), '"See as" does not count the problem under deuteranopia')
        check('no problems' in pg.inner_text('[data-sim=normal]'), '"See as" counts a color-blindness problem under typical vision')
        pg.click('[data-sim=deuteranopia]')
        check('sim-deuteranopia' in pg.evaluate("getComputedStyle(document.querySelector('#preview')).filter"), 'the preview is not filtered by the simulation')
        check(pg.locator('.tb-mark').count() >= 2, 'the pair is not marked on both of its elements in the preview')
        # panel 3: a problem takes the preview to it and opens the tooltip with the same words; a second click blinks
        pg.click('[data-sim=normal]')
        pg.click('[data-issue="1"]')
        pg.wait_for_timeout(600)
        check(pg.get_attribute('[data-sim=deuteranopia]', 'aria-pressed') == 'true', 'a problem in the list does not switch the preview to its kind of vision')
        what = pg.inner_text('[data-issue="1"] .tb-issue__what')
        check(pg.is_visible('#tip') and what in pg.inner_text('#tip'), 'the tooltip of the mark does not say what the list says')
        pg.click('[data-issue="1"]')
        pg.wait_for_timeout(500)
        check(pg.locator('.tb-mark.is-blink').count() >= 2, 'a second click on a problem does not make its marks blink')
        pg.keyboard.press('Escape')
        pg.focus('.tb-spot')
        check(pg.is_visible('#tip'), 'a mark shows no tooltip on keyboard focus')
        pg.keyboard.press('Escape')
        check(pg.is_hidden('#tip'), 'Escape does not close the tooltip')
        check(not pg.is_disabled('[data-export=css]'), 'the export is off for a theme with problems')
        pg.click('[data-export=css]')
        check(pg.evaluate("document.querySelector('#confirm-export').open"), 'exporting a theme with problems does not ask first')
        check(pg.evaluate("document.activeElement.id") == 'confirm-back', 'the confirmation does not start on the safe button')
        pg.add_script_tag(path=str(axe))
        v = pg.evaluate("axe.run(document,{runOnly:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}).then(r=>r.violations.map(x=>x.id+': '+x.nodes.slice(0,3).map(n=>n.target.join(' ')).join(', ')))")
        check(not v, 'axe, with problems marked and the confirmation open: ' + '; '.join(v))
        pg.keyboard.press('Escape')
        check(not pg.evaluate("document.querySelector('#confirm-export').open") and pg.evaluate("document.activeElement.dataset.export") == 'css', 'Escape does not close the confirmation back on the export button')
        pg.click('[data-export=css]')
        with pg.expect_download() as d:
            pg.click('#confirm-go')
        css = pathlib.Path(d.value.path()).read_text()
        check('accessibility failure' in css.split(':root{')[0] and '--aipim-action-primary-bg:var(--aipim-color-primary-' in css, 'the file of a theme with problems does not list them, or misses the theme')
        with pg.expect_download():
            pg.click('[data-export=css]')
        check(not pg.evaluate("document.querySelector('#confirm-export').open"), 'the confirmation asks again for the same theme')
        pg.click('#apply-suggestion')
        pg.wait_for_timeout(200)
        check(pg.is_hidden('#export-note') and pg.locator('#marks .tb-mark').count() == 0, 'the suggestion did not fix the theme')
        check(not errors, 'script errors: ' + '; '.join(errors))
        b.close()
    srv.shutdown()
    if good:
        print(f'OK: the builder page in {ENGINE}: no script errors, axe clean in light and dark (pt and en) and with problems marked, "See as", marks and tooltips, problems in the list that lead to their marks, export with confirmation, suggestion')
    return good


if __name__ == '__main__':
    ok = parity()
    if '--browser' in sys.argv:
        ok = browser() and ok
    sys.exit(0 if ok else 1)
