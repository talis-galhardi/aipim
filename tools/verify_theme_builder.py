#!/usr/bin/env python3
"""Checks the theme builder (theme-builder/). Writes nothing; prints what it checked and exits 1 on a failure.

1. Parity (always; needs Node): theme-builder/theme.js, with the default seeds and nothing changed, must give exactly the
   colors of tokens/tokens.json (every tone of every ramp, every semantic role in light and dark) and pass the same
   84 contrast checks. The builder is a port of tools/build_tokens.py: when one changes, this fails until the other does.
2. Browser (with --browser [chromium|webkit|firefox]; needs Playwright and `npm install` for axe-core): the page opens
   without script errors, axe finds nothing in its light and dark themes, a brand color that fails the color-blindness
   checks blocks the export, the suggestion fixes it, and the CSS download works.

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
console.log(JSON.stringify({ diffs, ok: r.ok, passed: r.passed, total: r.total, auto: r.auto }));
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
    if good:
        print(f"OK: the builder gives the same colors as tokens/tokens.json and passes {r['total']} contrast checks")
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
        pg = b.new_page(viewport={'width': 1280, 'height': 900}, accept_downloads=True)
        pg.goto(f'{url}?lang=en')
        pg.fill('[data-hex=primary]', '#820ad1')
        pg.wait_for_timeout(200)
        if not pg.is_disabled('[data-export=css]'):
            good = False; print('FAIL: a theme that fails the color-blindness checks can still be exported')
        pg.click('#apply-suggestion')
        pg.wait_for_timeout(200)
        if pg.is_disabled('[data-export=css]'):
            good = False; print('FAIL: the suggestion did not fix the theme')
        with pg.expect_download() as d:
            pg.click('[data-export=css]')
        css = pathlib.Path(d.value.path()).read_text()
        if '--aipim-action-primary-bg:var(--aipim-color-primary-' not in css or '#820ad1' not in css:
            good = False; print('FAIL: the CSS download is missing the theme')
        b.close()
    srv.shutdown()
    if good:
        print(f'OK: the builder page in {ENGINE}: no script errors, axe clean in light and dark (pt and en), export blocks and unblocks, CSS download')
    return good


if __name__ == '__main__':
    ok = parity()
    if '--browser' in sys.argv:
        ok = browser() and ok
    sys.exit(0 if ok else 1)
