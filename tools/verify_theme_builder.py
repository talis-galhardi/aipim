#!/usr/bin/env python3
"""Checks the theme builder (theme-builder/). Writes nothing; prints what it checked and exits 1 on a failure.

1. Parity (always; needs Node): theme-builder/theme.js, with the default seeds and nothing changed, must give exactly the
   colors of tokens/tokens.json (every tone of every ramp, every semantic role in light and dark) and pass the same
   88 contrast checks. The builder is a port of tools/build_tokens.py: when one changes, this fails until the other does.
   Then the rules of the engine on other colors: changing one color never moves a tone of another (a brand color whose
   pairs fail for color blindness shows the problem, and the tones of the other colors stay); the suggestion fixes that
   brand by tone alone, without touching it; and on 200 random themes every suggestion keeps the brand and keeps the
   status colors in their family (theme.js, HUE_WINDOW); and 100 random themes (randomTheme) all pass.
2. Browser (with --browser [chromium|webkit|firefox]; needs Playwright and `npm install` for axe-core): the page opens
   without script errors and axe finds nothing in its light and dark themes. With a theme that still fails: "See as"
   counts the problem under the right kind of vision and filters the preview, the problem is marked on the preview, the
   export asks once (focus on the safe button, Escape goes back), the file carries the failures, axe finds nothing with
   the confirmation open, and the suggestion fixes the theme. On a phone, the bar at the bottom shows the status, axe
   finds nothing and the bar leads to the summary. The hue and intensity bars of a color change its seed and the link,
   work from the keyboard, and a typed hex moves them.

Run from anywhere:  python3 tools/verify_theme_builder.py            # parity only
                    python3 tools/verify_theme_builder.py --browser  # parity and the page, in Chromium
"""
import json
import pathlib
import subprocess
import sys

from aipim_tools import ROOT, serve

ROOT = pathlib.Path(ROOT)
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
if (rb.ok) engine.push('the brand #3e2956 passes (the test lost its meaning)');
for (const m of T.MODES) for (const role of T.ROLES) if (T.SEMANTIC[m][role][0] !== 'primary' && rb.steps[m][role] !== r.steps[m][role]) engine.push(`changing the primary moved ${m} ${role}`);
const sb = T.suggest(brand, ['primary']);
if (!sb || !T.resolve(sb.theme).ok) engine.push('no suggestion fixes the brand #3e2956');
else {
  if (sb.changes.length || !sb.tones.length) engine.push('the suggestion for the brand #3e2956 is not a tone fix');
  if (sb.tones.some(c => T.SEMANTIC[c.mode][c.role][0] === 'primary')) engine.push('the suggestion for the brand #3e2956 moved a tone of the brand');
}
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
  for (const c of s.tones) if (T.SEMANTIC[c.mode][c.role][0] === 'primary') engine.push(`a suggestion moved a tone of the brand (theme ${i})`);
}
if (!suggested) engine.push('no random theme needed a suggestion (the test lost its meaning)');
// the random theme: always passes, and is not the default theme in disguise
for (let i = 0; i < 100; i++) {
  const t = T.randomTheme(rnd);
  if (!T.resolve(t).ok) engine.push(`a random theme does not pass (${T.encode(t)})`);
  if (JSON.stringify(t.seeds) === JSON.stringify(T.DEFAULT_SEEDS)) engine.push('a random theme fell back to the default colors');
}
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
        print(f"OK: changing a color never moves another, a failing brand is fixed by a tone suggestion, and {r['suggested']} suggestions on random themes pass and keep the status colors in their family, and 100 random themes pass")
    return good


def browser():
    from playwright.sync_api import sync_playwright
    axe = (ROOT / 'node_modules' / 'axe-core' / 'axe.min.js')
    if not axe.exists():
        print('FAIL: run `npm install` first (axe-core)'); return False
    good = True
    with serve(ROOT) as base, sync_playwright() as p:
        url = base + '/theme-builder/'
        b = getattr(p, ENGINE).launch()
        for lang in ('pt', 'en'):
            for scheme in ('light', 'dark'):
                pg = b.new_page(viewport={'width': 1280, 'height': 900}, color_scheme=scheme)
                errors = []
                pg.on('pageerror', lambda e: errors.append(str(e)))
                pg.goto(f'{url}?lang={lang}')
                pg.wait_for_selector('#usage .tb-group')
                pg.add_script_tag(path=str(axe))
                v = pg.evaluate("axe.run(document,{runOnly:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}).then(r=>r.violations.map(x=>x.id+': '+x.nodes.slice(0,3).map(n=>n.target.join(' ')).join(', ')))")
                if errors or v:
                    good = False; print(f'FAIL [{lang} {scheme}]: ' + '; '.join(errors + v))
                pg.close()
        # a theme with one problem: success and info icons alike for deuteranopia, in light (the other pairs that fail
        # with these colors are fixed by tones picked by hand)
        failing = ('primary=07e2f7&secondary=1c4c04&tertiary=92,0.17&success=ed4f08&error=bc64da&neutral=58,0.016'
                   '&l.warning.icon=900&l.action.secondary.bg=800&d.warning.icon=400&d.action.secondary.bg=300')
        pg = b.new_page(viewport={'width': 1280, 'height': 900}, accept_downloads=True)
        errors = []
        pg.on('pageerror', lambda e: errors.append(str(e)))
        pg.goto(f'{url}?lang=en#{failing}')
        pg.wait_for_selector('#usage .tb-group')
        def check(cond, msg):
            nonlocal good
            if not cond: good = False; print('FAIL: ' + msg)
        check('1 problem' in pg.inner_text('[data-sim=deuteranopia]'), '"See as" does not count the problem under deuteranopia')
        check('no problems' in pg.inner_text('[data-sim=normal]'), '"See as" counts a color-blindness problem under typical vision')
        # the text under "See as" keeps one height, so the preview does not move when the kind of vision changes
        tops = set()
        for k in ('protanopia', 'tritanopia', 'normal'):
            pg.click(f'[data-sim={k}]')
            tops.add(round(pg.evaluate("document.querySelector('#preview').getBoundingClientRect().top")))
        check(len(tops) == 1, 'the preview moves up and down when the kind of vision changes')
        pg.click('[data-sim=deuteranopia]')
        check('sim-deuteranopia' in pg.evaluate("getComputedStyle(document.querySelector('#preview')).filter"), 'the preview is not filtered by the simulation')
        check(pg.locator('.tb-mark').count() >= 2, 'the pair is not marked on both of its elements in the preview')
        # panel 3: a problem takes the preview to it and opens the tooltip with the same words; a second click blinks
        pg.click('[data-sim=normal]')
        pg.click('[data-issue="1"]')
        pg.wait_for_timeout(600)
        check(pg.get_attribute('[data-sim=deuteranopia]', 'aria-pressed') == 'true', 'a problem in the list does not switch the preview to its kind of vision')
        check(pg.evaluate('document.scrollingElement.scrollTop') == 0, 'going to a problem scrolls the whole page, so the header leaves the screen')
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
        # the usage list opens the groups with a problem and keeps the others closed
        check(pg.evaluate("[...document.querySelectorAll('#usage details')].every(d => d.open === !!d.querySelector('.tb-role.is-bad'))"), 'the usage list does not open exactly the groups with a problem')
        pg.click('[data-group=bg] summary')
        check(pg.evaluate("document.querySelector('[data-group=bg]').open"), 'a closed group does not open on a click')
        pg.click('[data-usage-mode=dark]'); pg.click('[data-usage-mode=light]')
        check(pg.evaluate("document.querySelector('[data-group=bg]').open"), 'a group the person opened closes again on the next update')
        # the preview's mock titles are not headings of the page
        check(pg.locator('#preview h1, #preview h2, #preview h3, #preview h4').count() == 0, 'the preview adds headings to the page outline')
        pg.click('#apply-suggestion')
        pg.wait_for_timeout(200)
        check(pg.is_hidden('#export-note') and pg.locator('#marks .tb-mark').count() == 0, 'the suggestion did not fix the theme')
        check(not errors, 'script errors: ' + '; '.join(errors))
        # each row of "Your colors" is the picker: the hue bar changes the seed (and the link), drops the kept hex, works
        # from the keyboard and keeps the focus
        pg = b.new_page(viewport={'width': 1280, 'height': 900})
        pg.goto(f'{url}?lang=en#primary=d9471b')
        pg.wait_for_selector('#usage .tb-group')
        was = pg.evaluate("getComputedStyle(document.querySelector('#preview')).getPropertyValue('--aipim-action-primary-bg').trim()")
        pg.focus('#hue-primary')
        for _ in range(30): pg.keyboard.press('ArrowRight')
        pg.wait_for_timeout(400)
        now = pg.evaluate("getComputedStyle(document.querySelector('#preview')).getPropertyValue('--aipim-action-primary-bg').trim()")
        check(now != was and 'primary=66,' in pg.evaluate('location.hash') and pg.is_hidden('[data-pin=primary]'), 'the hue bar does not change the color, the link, or the kept hex')
        check(pg.evaluate('document.activeElement.id') == 'hue-primary' and pg.get_attribute('#hue-primary', 'aria-valuetext') == '66 degrees', 'the hue bar loses the focus or does not say its value')
        # a drag fires far more history changes than Safari allows (100 in 10 seconds): the address waits for the bar to rest
        pg.evaluate("window.__hist = 0; const r = history.replaceState.bind(history); history.replaceState = (...a) => { window.__hist++; return r(...a); }; 0")
        for _ in range(60): pg.keyboard.press('ArrowRight')
        pg.wait_for_timeout(400)
        check(pg.evaluate('window.__hist') <= 3, f"a drag writes the address {pg.evaluate('window.__hist')} times, Safari stops at 100 in 10 seconds")
        # the copied link is the theme itself, even before the address follows
        pg.context.grant_permissions(['clipboard-read', 'clipboard-write']) if ENGINE == 'chromium' else None
        link = pg.evaluate("location.origin + location.pathname + location.search + '#' + AipimTheme.encode(AipimTheme.decode(location.hash))")
        for _ in range(5): pg.keyboard.press('ArrowRight')
        pg.click('[data-export=link]')
        pg.wait_for_timeout(400)
        copied = pg.evaluate('navigator.clipboard.readText()') if ENGINE == 'chromium' else pg.input_value('#fallback-text') if pg.evaluate("document.querySelector('#fallback').open") else None
        if copied is not None:
            check(copied != link and copied.split('#')[1] == pg.evaluate("location.hash.slice(1)"), 'the copied link is not the theme on the screen')
        if pg.evaluate("document.querySelector('#fallback').open"): pg.click('#fallback-close')
        pg.focus('#hue-primary')
        pg.fill('[data-hex=secondary]', '#7a3cc8')
        pg.wait_for_timeout(200)
        check(pg.input_value('#hue-secondary') != '255' and pg.is_checked('[data-pin=secondary]'), 'a typed hex does not move the bars, or is not kept exact')
        pg.close()
        # a shared link with a kept hex: unticking the box and ticking it again brings the hex back
        pg = b.new_page(viewport={'width': 1280, 'height': 900})
        pg.goto(f'{url}?lang=en#primary=d9471b')
        pg.wait_for_selector('#usage .tb-group')
        pg.click('label:has([data-pin=primary])')
        check(not pg.is_checked('[data-pin=primary]') and pg.is_visible('label:has([data-pin=primary])'), 'on a shared link, unticking "Keep this exact tone" hides the box for good')
        pg.click('label:has([data-pin=primary])')
        pg.wait_for_timeout(400)
        check('primary=d9471b' in pg.evaluate('location.hash'), 'ticking the box again does not bring the kept hex back')
        pg.close()
        # on a phone the summary is at the bottom: a bar keeps the status in sight and leads to it
        pg = b.new_page(viewport={'width': 390, 'height': 844})
        pg.goto(f'{url}?lang=en#{failing}')
        pg.wait_for_selector('#usage .tb-group')
        pg.wait_for_timeout(200)
        check(pg.is_visible('#bar') and '1 problem' in pg.inner_text('#bar'), 'on a phone, the bar does not show the status of the theme')
        pg.add_script_tag(path=str(axe))
        v = pg.evaluate("axe.run(document,{runOnly:['wcag2a','wcag2aa','wcag21a','wcag21aa','wcag22aa']}).then(r=>r.violations.map(x=>x.id+': '+x.nodes.slice(0,3).map(n=>n.target.join(' ')).join(', ')))")
        check(not v, 'axe, on a phone: ' + '; '.join(v))
        pg.click('#bar-go')
        pg.wait_for_timeout(900)
        check(pg.evaluate("document.activeElement.id") == 'summary' and pg.is_hidden('#bar'), 'the bar does not lead to the summary, or stays over it')
        b.close()
    if good:
        print(f'OK: the builder page in {ENGINE}: no script errors, axe clean in light and dark (pt and en) and with problems marked, "See as", marks and tooltips, problems in the list that lead to their marks, export with confirmation, suggestion, the color bars, the status bar on a phone')
    return good


if __name__ == '__main__':
    ok = parity()
    if '--browser' in sys.argv:
        ok = browser() and ok
    sys.exit(0 if ok else 1)
