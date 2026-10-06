#!/usr/bin/env python3
"""Checks the web components in a real browser. Writes nothing; prints what it checked and exits 1 on a failure.

Needs Playwright for Python with Chromium (pip install playwright; playwright install chromium) and `npm install` (for axe-core).
Run from anywhere:  python3 tools/verify_web.py

What it checks on components/web/examples/index.html (served locally):
  - axe-core in the light and dark themes
  - keyboard: tabs arrows, dismiss with Enter, the modal opening and closing
  - reflow at 200% zoom (640 CSS px) and 320 CSS px, a root font of 200%, and WCAG 1.4.12 text spacing:
    no horizontal page scroll and no text cut off by its own box
"""
import functools
import http.server
import json
import pathlib
import sys
import threading

from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
PAGE = '/components/web/examples/index.html'
AXE = ROOT / 'node_modules' / 'axe-core' / 'axe.min.js'
# The disabled field's helper text is flagged by axe, but disabled controls are exempt from WCAG 1.4.3.
KNOWN_AXE = {'#f5-help > span'}

# Looks for text that escapes its own box. visually-hidden text and native input scrolling are by design.
REFLOW_JS = """() => {
  const de = document.documentElement, issues = [];
  document.querySelectorAll('main *').forEach(el => {
    const tag = el.tagName.toLowerCase();
    if (['svg', 'use', 'path', 'symbol', 'input'].includes(tag)) return;
    if (el.closest('dialog:not([open])') || el.closest('[hidden]') || el.closest('.aipim-visually-hidden') || el.classList.contains('aipim-visually-hidden')) return;
    const r = el.getBoundingClientRect(); if (!r.width) return;
    const cs = getComputedStyle(el);
    if (r.right > de.clientWidth + 1) issues.push('beyond the viewport: ' + (el.className || tag));
    if (cs.overflowX !== 'visible' && el.scrollWidth - el.clientWidth > 1) issues.push('clipped: ' + (el.className || tag) + ' "' + (el.textContent || '').trim().slice(0, 20) + '"');
  });
  if (de.scrollWidth - de.clientWidth > 0) issues.push('horizontal page scroll of ' + (de.scrollWidth - de.clientWidth) + 'px');
  return issues.slice(0, 10);
}"""

failures = []


def check(name, ok, detail=''):
    print(('  ok   ' if ok else '  FAIL ') + name + (f': {detail}' if detail and not ok else ''))
    if not ok:
        failures.append(name)


def main():
    if not AXE.exists():
        sys.exit('axe-core is missing. Run `npm install` in the repository root first.')
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *args):
            pass

    handler = functools.partial(Quiet, directory=str(ROOT))
    server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler)
    threading.Thread(target=server.serve_forever, daemon=True).start()
    url = f'http://127.0.0.1:{server.server_port}{PAGE}'

    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={'width': 1280, 'height': 900})
        page.goto(url)
        page.wait_for_timeout(500)
        page.add_script_tag(path=str(AXE))
        version = page.evaluate('axe.version')
        print(f'axe-core {version}, Chromium {browser.version}')

        print('Accessibility (axe)')
        for theme in ('light', 'dark'):
            page.evaluate(f"document.documentElement.setAttribute('data-theme','{theme}')")
            page.wait_for_timeout(150)
            found = page.evaluate("axe.run().then(r => r.violations.flatMap(v => v.nodes.map(n => v.id + ' ' + n.target.join(' '))))")
            unexpected = [f for f in found if f.split(' ', 1)[1] not in KNOWN_AXE]
            check(f'no axe violations in the {theme} theme', not unexpected, ', '.join(unexpected))
        page.evaluate("document.documentElement.setAttribute('data-theme','light')")

        print('Keyboard')
        page.focus('#t1'); page.keyboard.press('ArrowRight')
        check('tabs: right arrow selects the next tab', page.evaluate('document.activeElement.id') == 't2' and page.get_attribute('#t2', 'aria-selected') == 'true')
        page.keyboard.press('End')
        check('tabs: End goes to the last enabled tab', page.get_attribute('#t3', 'aria-selected') == 'true')
        before = page.evaluate("document.querySelectorAll('.aipim-alert').length")
        page.focus('.aipim-alert .aipim-dismiss'); page.keyboard.press('Enter')
        check('alert: Enter on dismiss removes it', page.evaluate("document.querySelectorAll('.aipim-alert').length") == before - 1)
        page.click('#show-toast'); page.wait_for_timeout(200)
        check('toast: the live demo adds a toast', page.evaluate("document.querySelectorAll('#toast-region .aipim-toast').length") == 1)
        page.click('button[commandfor=demo-modal]'); page.wait_for_timeout(200)
        check('modal: opens', page.evaluate("document.getElementById('demo-modal').open"))
        page.keyboard.press('Escape'); page.wait_for_timeout(200)
        check('modal: Escape closes it', not page.evaluate("document.getElementById('demo-modal').open"))
        page.close()

        print('Reflow and text size')
        cases = [
            ('200% zoom (640 CSS px)', {'width': 640, 'height': 900}, None),
            ('320 CSS px', {'width': 320, 'height': 800}, None),
            ('root font size 200%', {'width': 1280, 'height': 900}, 'html{font-size:200%}'),
            ('text spacing (WCAG 1.4.12)', {'width': 1280, 'height': 900},
             '*{line-height:1.5 !important;letter-spacing:.12em !important;word-spacing:.16em !important} p{margin-bottom:2em !important}'),
        ]
        for label, viewport, css in cases:
            pg = browser.new_page(viewport=viewport)
            pg.goto(url); pg.wait_for_timeout(300)
            if css:
                pg.add_style_tag(content=css)
            pg.wait_for_timeout(150)
            issues = pg.evaluate(REFLOW_JS)
            check(label, not issues, '; '.join(issues))
            pg.close()
        browser.close()

    server.shutdown()
    print()
    print('All checks passed.' if not failures else f'{len(failures)} check(s) failed.')
    sys.exit(1 if failures else 0)


if __name__ == '__main__':
    main()
