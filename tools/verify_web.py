#!/usr/bin/env python3
"""Checks the web components in a real browser. Writes nothing; prints what it checked and exits 1 on a failure.

Needs Playwright for Python with Chromium (pip install playwright; playwright install chromium) and `npm install` (for axe-core).
Options: `--browser webkit` or `--browser firefox` (run `playwright install webkit firefox` first) check the same things in another engine;
`--forced-colors` loads the pages in forced-colors mode (an emulation, not the real Windows High Contrast mode).
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
    // Something inside a box that scrolls sideways (the tabs list) can be off screen: you reach it by scrolling that box.
    let inScroller = false;
    for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) { if (['auto', 'scroll'].includes(getComputedStyle(a).overflowX)) { inScroller = true; break; } }
    if (!inScroller && r.right > de.clientWidth + 1) issues.push('beyond the viewport: ' + (el.className || tag));
    // Only a box that hides its overflow loses text. One that scrolls does not.
    if (['hidden', 'clip'].includes(cs.overflowX) && el.scrollWidth - el.clientWidth > 1) issues.push('clipped: ' + (el.className || tag) + ' "' + (el.textContent || '').trim().slice(0, 20) + '"');
  });
  if (de.scrollWidth - de.clientWidth > 0) issues.push('horizontal page scroll of ' + (de.scrollWidth - de.clientWidth) + 'px');
  return issues.slice(0, 10);
}"""

failures = []
BROWSER = sys.argv[sys.argv.index('--browser') + 1] if '--browser' in sys.argv else 'chromium'
PAGE_OPTS = {'forced_colors': 'active'} if '--forced-colors' in sys.argv else {}


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
        browser = getattr(p, BROWSER).launch()
        page = browser.new_page(viewport={'width': 1280, 'height': 900}, **PAGE_OPTS)
        page.goto(url)
        page.wait_for_timeout(500)
        page.add_script_tag(path=str(AXE))
        version = page.evaluate('axe.version')
        print(f'axe-core {version}, {BROWSER} {browser.version}' + (', forced colors' if PAGE_OPTS else ''))

        print('Accessibility (axe)')
        for theme in ('light', 'dark'):
            page.evaluate(f"document.documentElement.setAttribute('data-theme','{theme}')")
            page.wait_for_timeout(150)
            # In forced colors the system picks the colors, so axe cannot measure contrast there (and WCAG leaves it to the user's palette).
            axe_options = "{rules: {'color-contrast': {enabled: false}}}" if PAGE_OPTS else '{}'
            found = page.evaluate(f"axe.run({axe_options}).then(r => r.violations.flatMap(v => v.nodes.map(n => v.id + ' ' + n.target.join(' '))))")
            unexpected = [f for f in found if f.split(' ', 1)[1] not in KNOWN_AXE]
            check(f'no axe violations in the {theme} theme', not unexpected, ', '.join(unexpected))
        page.evaluate("document.documentElement.setAttribute('data-theme','light')")

        if PAGE_OPTS:
            print('Forced colors')
            # The icon button is left out on purpose: its icon is the visible graphic, it follows the system text color and its focus ring is Highlight.
            bare = page.evaluate("""() => {
              const sel = '.aipim-button, .aipim-field__control, .aipim-checkbox__box, .aipim-radio__circle, .aipim-switch__track, .aipim-tag, .aipim-card, .aipim-alert, .aipim-toast, .aipim-tab[aria-selected=true]';
              return [...document.querySelectorAll(sel)].filter(el => { const cs = getComputedStyle(el); const hasBorder = parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== 'none'; const hasOutline = parseFloat(cs.outlineWidth) > 0 && cs.outlineStyle !== 'none'; const after = getComputedStyle(el, '::after'); const hasBar = ['borderBottomWidth','borderLeftWidth'].some(k => parseFloat(cs[k]) > 0) || (after.content !== 'none' && parseFloat(after.height) > 0); return !(hasBorder || hasOutline || hasBar); }).map(el => el.className.split(' ')[0]).filter((v, i, a) => a.indexOf(v) === i);
            }""")
            check('forced colors: controls and containers keep a visible edge', not bare, ', '.join(bare))

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
            pg = browser.new_page(viewport=viewport, **PAGE_OPTS)
            pg.goto(url); pg.wait_for_timeout(300)
            if css:
                pg.add_style_tag(content=css)
            pg.wait_for_timeout(150)
            issues = pg.evaluate(REFLOW_JS)
            check(label, not issues, '; '.join(issues))
            pg.close()

        print('Tabs')
        # A narrow list: the tabs scroll sideways inside the list, the page does not, and the focus ring is not clipped.
        pg = browser.new_page(viewport={'width': 320, 'height': 800}, **PAGE_OPTS)
        pg.goto(url); pg.wait_for_timeout(300)
        pg.evaluate("document.querySelector('.aipim-tabs').style.maxWidth='260px'")
        info = pg.evaluate("(() => { const l = document.querySelector('.aipim-tabs'); return {scrolls: l.scrollWidth > l.clientWidth, page: document.documentElement.scrollWidth > document.documentElement.clientWidth, h: l.getBoundingClientRect().height + parseFloat(getComputedStyle(l).marginTop) + parseFloat(getComputedStyle(l).marginBottom)}; })()")
        check('tabs: a narrow list scrolls sideways, the page does not', info['scrolls'] and not info['page'], str(info))
        check('tabs: the list takes 44px of layout height', abs(info['h'] - 44) < 0.5, str(info['h']))
        pg.focus('#t1'); pg.keyboard.press('End'); pg.wait_for_timeout(400)
        ring = pg.evaluate("(() => { const t = document.activeElement, l = t.parentElement.getBoundingClientRect(), r = t.getBoundingClientRect(), g = 6; return {left: r.left - g - l.left, right: l.right - (r.right + g), top: r.top - g - l.top, bottom: l.bottom - (r.bottom + g)}; })()")
        # 1px of tolerance: WebKit rounds the scroll position to a whole pixel, which can leave half a pixel of the 3px ring outside.
        check('tabs: the focused tab is scrolled into view with its focus ring inside the list', all(v >= -1 for v in ring.values()), str(ring))
        pg.close()
        browser.close()

    server.shutdown()
    print()
    print('All checks passed.' if not failures else f'{len(failures)} check(s) failed.')
    sys.exit(1 if failures else 0)


if __name__ == '__main__':
    main()
