#!/usr/bin/env python3
"""Checks the web components in a real browser. Writes nothing; prints what it checked and exits 1 on a failure.

Needs Playwright for Python with Chromium (pip install playwright; playwright install chromium) and `npm install` (for axe-core).
Options: `--browser webkit` or `--browser firefox` (run `playwright install webkit firefox` first) check the same things in another engine;
`--forced-colors` loads the pages in forced-colors mode (an emulation, not the real Windows High Contrast mode).
Run from anywhere:  python3 tools/verify_web.py

What it checks on components/web/examples/index.html (served locally):
  - axe-core in the light and dark themes
  - keyboard: tabs arrows, dismiss with Enter, the modal opening and closing
  - the Brazilian field: typing, a value that came with the page, Backspace on the mask, the check when leaving and the error going away
  - the select (the prompt option is muted) and the combobox: filtering, the arrows, Enter, Escape, a click, the error when leaving
  - the date picker: the calendar opening on the date, the keys, Tab kept inside, choosing, the range error, axe on the open calendar
  - the avatar and its group (sizes, overlap), the list item (heights, hover only where it acts, focus ring, disabled link, switch row) and the accordion (open and close by key and click, one open at a time)
  - reflow at 200% zoom (640 CSS px) and 320 CSS px, a root font of 200%, and WCAG 1.4.12 text spacing:
    no horizontal page scroll and no text cut off by its own box
"""
import json
import pathlib
import sys

from playwright.sync_api import sync_playwright

from aipim_tools import ROOT, Checks, serve

ROOT = pathlib.Path(ROOT)
PAGE = '/components/web/examples/index.html'
AXE = ROOT / 'node_modules' / 'axe-core' / 'axe.min.js'
# The helper text of the disabled fields is flagged by axe, but disabled controls are exempt from WCAG 1.4.3.
KNOWN_AXE = {'#f5-help > span', '#s5-help > span', '#c4-help > span', '#d4-help > span:nth-child(2)', '#d4-help > .aipim-datepicker__weekday'}

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

check = Checks()
BROWSER = sys.argv[sys.argv.index('--browser') + 1] if '--browser' in sys.argv else 'chromium'
PAGE_OPTS = {'forced_colors': 'active'} if '--forced-colors' in sys.argv else {}


def main():
    if not AXE.exists():
        sys.exit('axe-core is missing. Run `npm install` in the repository root first.')
    with serve(ROOT) as base, sync_playwright() as p:
        url = base + PAGE
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
            # The colors change with a short transition: measuring before it ends reads a color in between (WebKit was
            # caught mid-way now and then, which made this check fail at random). Wait for every transition to finish.
            # Only transitions: the spinner turns forever, so its animation never finishes.
            page.evaluate("Promise.all(document.getAnimations().filter((a) => typeof CSSTransition !== 'undefined' && a instanceof CSSTransition).map((a) => a.finished.catch(() => {})))")
            page.wait_for_timeout(50)
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

        print('Brazilian field')
        value = lambda sel: page.input_value(sel)
        invalid = lambda sel: page.get_attribute(sel, 'aria-invalid') == 'true'
        helper = lambda sel: page.text_content(f'{sel}-help span')
        check('a value that came with the page gets its mask', value('#b2') == '12.ABC.345/01DE-35' and value('#b4') == '(11) 98765-4321' and value('#b6') == 'R$ 1.234,50', f"{value('#b2')} {value('#b4')} {value('#b6')}")
        page.click('#b1'); page.keyboard.type('1234567890')
        check('cpf: the mask goes in while typing', value('#b1') == '123.456.789-0', value('#b1'))
        page.keyboard.press('Tab')
        check('cpf: leaving it short shows the error', invalid('#b1') and helper('#b1') == 'A CPF has 11 digits. Check if one is missing.', helper('#b1'))
        page.click('#b1'); page.keyboard.press('End'); page.keyboard.type('9')
        check('cpf: a valid value clears the error at once and brings the helper back', not invalid('#b1') and helper('#b1') == 'Type only the numbers' and value('#b1') == '123.456.789-09', f"{value('#b1')} {helper('#b1')}")
        page.keyboard.press('ArrowLeft'); page.keyboard.press('ArrowLeft'); page.keyboard.press('Backspace')
        check('cpf: backspace on the dash deletes the digit before it', value('#b1') == '123.456.780-9' and page.evaluate("document.activeElement.selectionStart") == 10, f"{value('#b1')} at {page.evaluate('document.activeElement.selectionStart')}")
        page.fill('#b1', ''); page.keyboard.type('12345678900'); page.keyboard.press('Tab')
        check('cpf: wrong check digits show the error', invalid('#b1') and 'swapped' in helper('#b1'), helper('#b1'))
        page.fill('#b2', ''); page.click('#b2'); page.keyboard.type('12abc34501de35'); page.keyboard.press('Tab')
        check('cnpj: letters become capitals and a valid one passes', value('#b2') == '12.ABC.345/01DE-35' and not invalid('#b2'), value('#b2'))
        page.fill('#b4', ''); page.click('#b4'); page.keyboard.type('1093334444'); page.keyboard.press('Tab')
        check('phone: an area code that does not exist shows the error', value('#b4') == '(10) 9333-4444' and invalid('#b4'), value('#b4'))
        page.click('#b5'); page.keyboard.type('31022024'); page.keyboard.press('Tab')
        check('date: a day that does not exist shows the error', value('#b5') == '31/02/2024' and invalid('#b5') and 'does not exist' in helper('#b5'), value('#b5'))
        page.fill('#b6', ''); page.click('#b6'); page.keyboard.type('1500'); page.keyboard.press('Tab')
        check('money: thousands while typing, two decimals on leaving', value('#b6') == 'R$ 1.500,00', value('#b6'))
        page.click('#b7'); page.keyboard.press('Tab')
        check('an error from the server stays when the person only passes by', invalid('#b7'), helper('#b7'))
        page.fill('#b7', '529.982.247-25'); page.keyboard.press('Tab')
        check('an error from the server goes away with its own helper text', not invalid('#b7') and helper('#b7') == 'Type only the numbers', helper('#b7'))

        print('Select')
        color = lambda sel: page.evaluate(f"getComputedStyle(document.querySelector('{sel}')).color")
        # In forced colors the system picks the text color of every field.
        if not PAGE_OPTS:
            check('the prompt option is muted and a chosen option is not', color('#s1') != color('#s2'), f"{color('#s1')} {color('#s2')}")
        page.focus('#s1'); page.keyboard.press('Tab')
        check('select: Tab leaves to the next field', page.evaluate('document.activeElement.id') == 's2')

        print('Combobox')
        expanded = lambda sel: page.get_attribute(sel, 'aria-expanded') == 'true'
        active = lambda sel: page.get_attribute(sel, 'aria-activedescendant')
        shown = lambda sel: page.evaluate(f"[...document.querySelectorAll('{sel}-list [role=option]:not([hidden])')].map(o => o.textContent)")
        stored = lambda sel: page.evaluate(f"document.querySelector('{sel}').closest('.aipim-combobox').querySelector('[type=hidden]').value")
        page.click('#c1'); page.keyboard.press('Escape'); page.keyboard.type('sao')
        check('typing opens the list and filters it, without caring for accents', expanded('#c1') and shown('#c1') == ['São Paulo'] and not active('#c1'), str(shown('#c1')))
        page.keyboard.press('ArrowDown')
        check('Down puts the option under the arrows, with focus kept in the field', active('#c1') == 'c1-sp' and page.get_attribute('#c1-sp', 'aria-selected') == 'true' and page.evaluate('document.activeElement.id') == 'c1')
        page.keyboard.press('Enter')
        check('Enter chooses it, closes the list and stores its value', page.input_value('#c1') == 'São Paulo' and stored('#c1') == 'SP' and not expanded('#c1'), f"{page.input_value('#c1')} {stored('#c1')}")
        page.keyboard.press('ArrowDown')
        check('Down on a closed list opens every option, from the one chosen', expanded('#c1') and len(shown('#c1')) == 27 and active('#c1') == 'c1-sp')
        page.keyboard.press('Escape')
        check('Escape closes the list and keeps the value', not expanded('#c1') and page.input_value('#c1') == 'São Paulo')
        page.keyboard.press('Escape')
        check('Escape on a closed list clears the field and says so to a screen reader', page.input_value('#c1') == '' and stored('#c1') == '' and page.text_content('#c1 ~ [role=status]') == 'Field cleared', page.text_content('#c1 ~ [role=status]'))
        page.keyboard.press('ArrowUp')
        check('Up on a closed list starts at the last option', active('#c1') == 'c1-to')
        page.keyboard.press('ArrowDown')
        check('the arrows wrap around the list', active('#c1') == 'c1-ac')
        page.keyboard.press('Escape'); page.keyboard.type('xyz'); page.wait_for_timeout(600)
        check('no match shows the empty message and the count', shown('#c1') == [] and page.is_visible('#c1 ~ .aipim-combobox__popup .aipim-combobox__empty') and page.text_content('#c1 ~ [role=status]') == '0 options', page.text_content('#c1 ~ [role=status]'))
        page.keyboard.press('Tab')
        check('leaving with a text that is not an option shows the error', invalid('#c1') and helper('#c1').startswith('Choose one of the options') and not expanded('#c1'), helper('#c1'))
        page.fill('#c1', ''); page.click('#c1'); page.keyboard.type('rio grande do sul'); page.keyboard.press('Tab')
        check('a name typed in full becomes the option and clears the error', page.input_value('#c1') == 'Rio Grande do Sul' and stored('#c1') == 'RS' and not invalid('#c1') and helper('#c1') == 'Type part of the name', page.input_value('#c1'))
        page.click('#c3'); page.click('#c3-ba')
        check('a click on an option chooses it and clears an error from the server', page.input_value('#c3') == 'Bahia' and not invalid('#c3') and page.evaluate('document.activeElement.id') == 'c3', page.input_value('#c3'))

        print('Date picker')
        button = lambda sel: f'{sel} ~ .aipim-datepicker__button'
        is_open = lambda sel: page.get_attribute(button(sel), 'aria-expanded') == 'true'
        focused = lambda: page.evaluate("(() => { const a = document.activeElement; return a.classList.contains('aipim-datepicker__day') ? a.getAttribute('aria-label').replace(/, selected$/, '') : a.className || a.id; })()")
        title = lambda sel: page.text_content(f'{sel} ~ .aipim-datepicker__popup .aipim-datepicker__month')
        check('the button shows once the script is ready and says the date in the field', page.is_visible(button('#d1')) and page.get_attribute(button('#d2'), 'aria-label') == 'Choose date, Friday, November 20, 2026', page.get_attribute(button('#d2'), 'aria-label'))
        check('a disabled field has a disabled button', page.is_disabled(button('#d4')))
        weekday = lambda sel: page.evaluate(f"(() => {{ const w = document.querySelector('{sel}-help .aipim-datepicker__weekday'); return w && !w.hidden && w.getClientRects().length ? w.textContent : ''; }})()")
        check('a valid date shows its day of the week under the helper text; an empty or out-of-range one does not', weekday('#d2') == 'Friday, November 20' and weekday('#d1') == '' and weekday('#d3') == '', f"{weekday('#d2')!r} {weekday('#d1')!r} {weekday('#d3')!r}")
        page.click(button('#d2'))
        check('the button opens the calendar on the date in the field, with focus on that day', is_open('#d2') and focused() == 'Friday, November 20, 2026' and title('#d2') == 'November 2026', f'{focused()} {title("#d2")}')
        found = page.evaluate("axe.run(document.querySelector('#d2 ~ .aipim-datepicker__popup')).then(r => r.violations.flatMap(v => v.nodes.map(n => v.id + ' ' + n.target.join(' '))))")
        check('no axe violations in the open calendar', not found, ', '.join(found))
        page.keyboard.press('ArrowRight'); page.keyboard.press('ArrowDown')
        check('the arrows move by day and by week', focused() == 'Saturday, November 28, 2026', focused())
        page.keyboard.press('Home')
        check('Home goes to the Sunday of the week', focused() == 'Sunday, November 22, 2026', focused())
        page.keyboard.press('PageDown')
        check('Page Down shows the next month on the same day', focused() == 'Tuesday, December 22, 2026' and title('#d2') == 'December 2026', focused())
        page.keyboard.press('Shift+PageUp')
        check('Shift+Page Up goes back a year', focused() == 'Monday, December 22, 2025', focused())
        page.keyboard.press('Shift+PageDown'); page.keyboard.press('ArrowRight'); page.keyboard.press('Enter')
        tabs0 = page.evaluate("document.querySelectorAll('.aipim-datepicker__day[tabindex=\"0\"]').length")
        check('no day is in the tab order: the focus is moved by the script, so a screen reader keeps announcing it', tabs0 == 0, str(tabs0))
        check('a day outside the range cannot be chosen', is_open('#d2') and page.get_attribute('.aipim-datepicker__day[aria-label="Wednesday, December 23, 2026"]', 'aria-disabled') == 'true')
        page.keyboard.press('Tab'); first = focused(); page.keyboard.press('Tab'); second = focused(); page.keyboard.press('Tab')
        check('Tab goes round the month buttons and the day, inside the calendar', 'aipim-datepicker__prev' in first and 'aipim-datepicker__next' in second and focused() == 'Wednesday, December 23, 2026', f'{first} {second} {focused()}')
        page.keyboard.press('Escape')
        check('Escape closes it and puts focus back on the button', not is_open('#d2') and 'aipim-datepicker__button' in focused() and page.input_value('#d2') == '20/11/2026')
        page.keyboard.press('Enter'); page.keyboard.press('ArrowLeft'); page.keyboard.press('Space')
        check('Space chooses a day: the field gets the date, the calendar closes, focus is back on the button', page.input_value('#d2') == '19/11/2026' and not is_open('#d2') and 'aipim-datepicker__button' in focused() and page.get_attribute(button('#d2'), 'aria-label').endswith('November 19, 2026'), page.input_value('#d2'))
        page.click(button('#d3')); page.click('.aipim-datepicker__day[aria-label="Friday, December 18, 2026"]')
        check('a click on a day chooses it and clears the range error', page.input_value('#d3') == '18/12/2026' and not invalid('#d3') and helper('#d3') == 'From 02/11 to 18/12', page.input_value('#d3'))
        page.click(button('#d1'))
        check('with an empty field, the calendar opens on today, with today marked and focused', page.evaluate("document.activeElement.getAttribute('aria-current')") == 'date')
        page.click('h1')
        check('a click outside closes the calendar', not is_open('#d1'))
        page.fill('#d2', ''); page.click('#d2'); page.keyboard.type('01112026'); page.keyboard.press('Tab')
        check('a typed date outside the range shows the error when leaving', invalid('#d2') and helper('#d2') == 'Choose a date between 02/11/2026 and 18/12/2026.', helper('#d2'))
        page.click('#d2'); page.keyboard.press('Backspace'); page.keyboard.type('6')
        check('the range error stays while the date is still outside it, with no day of the week', invalid('#d2') and weekday('#d2') == '')
        page.fill('#d2', ''); page.keyboard.type('05112026')
        check('a date inside the range clears the error at once and shows its day of the week', not invalid('#d2') and helper('#d2') == 'From 02/11 to 18/12' and weekday('#d2') == 'Thursday, November 5', f"{helper('#d2')} {weekday('#d2')!r}")

        print('Avatar, list item and accordion')
        ev = page.evaluate
        sizes = ev("[...document.querySelector('section[aria-labelledby=h-avatar] .row').querySelectorAll('.aipim-avatar')].map(a => { const r = a.getBoundingClientRect(); return [r.width, r.height, getComputedStyle(a).borderTopLeftRadius]; })")
        check('avatar: 32, 40 and 48px circles', [x[:2] for x in sizes] == [[32, 32], [40, 40], [48, 48]] and all(float(x[2][:-2]) >= 16 for x in sizes), str(sizes))
        overlaps = ev("[...document.querySelectorAll('section[aria-labelledby=h-avatar] .aipim-avatar-group')].map(g => { const [a, b] = g.querySelectorAll('.aipim-avatar'); return Math.round(a.getBoundingClientRect().right - b.getBoundingClientRect().left); })")
        check('avatar group: the avatars overlap by 6, 8 and 12px', overlaps == [6, 8, 12], str(overlaps))
        check('avatar group: the ring is 3px in the color of the page', ev("(() => { const cs = getComputedStyle(document.querySelector('.aipim-avatar-group > .aipim-avatar')); return cs.boxShadow.includes('3px') || cs.outlineWidth === '3px'; })()"))
        widths = ev("[...document.querySelectorAll('section[aria-labelledby=h-avatar] .aipim-avatar-group')].map(g => g.getBoundingClientRect().width)")
        check('avatar group: the ring takes no room, so four avatars are 110, 136 and 156px wide', widths == [110, 136, 156], str(widths))

        row = lambda i: f'#l{i}-t'
        rect = lambda sel: ev(f"(() => {{ const r = document.querySelector('{sel}').closest('.aipim-list-item__row').getBoundingClientRect(); return [r.width, r.height]; }})()")
        check('list item: a row with a title and a description is 69px high, a row with only a title 48px', rect(row(1))[1] == 69 and rect(row(5))[1] == 48, f'{rect(row(1))} {rect(row(5))}')
        bg = lambda sel: ev(f"getComputedStyle(document.querySelector('{sel}').closest('.aipim-list-item__row')).backgroundColor")
        page.hover(row(1)); page.wait_for_timeout(200)
        acts = bg(row(1))
        page.hover(row(4)); page.wait_for_timeout(200)
        shows = bg(row(4))
        clear = lambda c: c == 'transparent' or c.endswith(', 0)')  # in forced colors the transparent one is white with no alpha
        check('list item: only the row that acts has a hover fill', (not clear(acts) or PAGE_OPTS) and clear(shows), f'{acts} / {shows}')
        page.keyboard.press('Escape'); ev("document.querySelector('#l1-t').closest('a').focus()")  # a key first, so the focus counts as the keyboard's
        # Firefox and WebKit do not call a focus from a script the keyboard's after a mouse move, so there the ring is not drawn to be measured.
        ring = ev("(() => { const a = document.activeElement, cs = getComputedStyle(a); return [a.className, cs.outlineWidth, parseFloat(cs.outlineOffset), a.matches(':focus-visible')]; })()")
        check('list item: the link row takes focus with a 3px ring inside the row (where the engine shows it)', 'aipim-list-item__row' in ring[0] and (not ring[3] or (ring[1] == '3px' and ring[2] < 0)), str(ring))
        check('list item: a disabled link takes no focus and no click', ev("(() => { const a = document.querySelector('#l8-t').closest('a'); return a.tabIndex === -1 && getComputedStyle(a).pointerEvents === 'none'; })()"))
        page.click(row(7)); on = ev("document.querySelector('#l7-t').closest('label').querySelector('input').checked")
        check('list item: a click on the title of a row with a switch turns it on', on is True)
        page.evaluate("document.querySelector('#l7-t').closest('label').querySelector('input').focus()"); page.keyboard.press('Space')
        check('list item: Space turns the switch off again', ev("document.querySelector('#l7-t').closest('label').querySelector('input').checked") is False)

        check('list item: the divider takes no height, so an item is as high as its row', ev("(() => { const li = document.querySelector('#l1-t').closest('li'); return li.getBoundingClientRect().height === li.firstElementChild.getBoundingClientRect().height; })()"))
        check('list item: the last item of a list has no divider', ev("getComputedStyle(document.querySelector('#l3-t').closest('li'), '::after').content") == 'none')
        check('accordion: a closed item is 44px high with its divider', ev("document.querySelectorAll('section[aria-labelledby=h-accordion] details')[2].getBoundingClientRect().height") == 44)
        heads = lambda: ev("[...document.querySelectorAll('section[aria-labelledby=h-accordion] details')].map(d => d.open)")
        check('accordion: the first item starts open, the others closed', heads() == [True, False, False], str(heads()))
        page.click('section[aria-labelledby=h-accordion] details:nth-child(2) summary')
        check('accordion: opening an item closes the other one of the same name', heads() == [False, True, False], str(heads()))
        page.focus('section[aria-labelledby=h-accordion] details:nth-child(3) summary'); page.keyboard.press('Enter')
        check('accordion: Enter on the focused header opens the item', heads() == [False, False, True], str(heads()))
        page.keyboard.press('Space')
        check('accordion: Space closes it', heads() == [False, False, False], str(heads()))
        check('accordion: the header is at least 44px high', ev("document.querySelector('.aipim-accordion__header').getBoundingClientRect().height") >= 44)
        page.keyboard.press('Space'); page.wait_for_timeout(300)
        check('accordion: the chevron turns up when the item is open', ev("getComputedStyle(document.querySelector('.aipim-accordion[open] .aipim-accordion__chevron')).transform") not in ('none', 'matrix(1, 0, 0, 1, 0, 0)'))
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
        # A panel starts at its top: when the top of the screen is below the top edge of the list, choosing a tab scrolls the
        # page so the list is at the top of the screen, at the same height every time; when the top of the screen is above
        # that edge, the page does not move.
        pg = browser.new_page(viewport={'width': 1280, 'height': 600}, **PAGE_OPTS)
        pg.goto(url); pg.wait_for_timeout(300)
        pg.evaluate("""(() => {
          const tail = document.createElement('div'); tail.style.height = '3000px'; document.body.append(tail);
          document.querySelectorAll('[role=tabpanel]').forEach((p) => { p.style.minHeight = '1500px'; });
        })()""")
        TOP = "document.querySelector('.aipim-tabs').getBoundingClientRect().top"
        CLICK = "document.querySelector('.aipim-tabs [role=tab][aria-selected=false]').click()"  # not a Playwright click: it would scroll first
        pg.evaluate(f"window.scrollTo(0, {TOP} + window.scrollY + 300)"); pg.wait_for_timeout(100)
        before = pg.evaluate(TOP)
        pg.evaluate(CLICK); pg.wait_for_timeout(200)
        first = pg.evaluate(TOP)
        check('tabs: choosing a tab with the list scrolled out of view brings the list to the top', before < 0 and 0 <= first <= 24, f'{before} -> {first}')
        pg.evaluate(CLICK); pg.wait_for_timeout(200)
        second = pg.evaluate(TOP)
        pg.evaluate(f"window.scrollTo(0, window.scrollY + 700)"); pg.wait_for_timeout(100)
        pg.evaluate(CLICK); pg.wait_for_timeout(200)
        third = pg.evaluate(TOP)
        # Up to 1px apart: WebKit rounds the scroll position to a whole pixel, and the list may sit at a fraction of one.
        check('tabs: tab after tab the list is at the same height', abs(first - second) <= 1 and abs(first - third) <= 1, f'{first}, {second}, {third}')
        pg.evaluate(f"window.scrollTo(0, window.scrollY + {TOP} - 200)"); pg.wait_for_timeout(100)
        y0 = pg.evaluate("window.scrollY")
        pg.evaluate(CLICK); pg.wait_for_timeout(200)
        y1 = pg.evaluate("window.scrollY")
        check('tabs: with the top of the screen above the list, choosing a tab does not move the page', abs(y1 - y0) < 1, f'{y0} -> {y1}')
        # A sticky list (or inside a sticky box) is read where it sits in the page: the same height at the top, no drift.
        pg.evaluate("""(() => {
          const list = document.querySelector('.aipim-tabs');
          list.style.position = 'sticky'; list.style.top = '0'; list.style.zIndex = '5';
        })()""")
        pg.evaluate("window.scrollTo(0, 0)"); pg.wait_for_timeout(50)
        natural = pg.evaluate("(() => { const l = document.querySelector('.aipim-tabs'); l.style.position = 'static'; const v = l.getBoundingClientRect().top + window.scrollY; l.style.position = 'sticky'; return v; })()")
        pg.evaluate(f"window.scrollTo(0, {natural} + 900)"); pg.wait_for_timeout(100)
        pg.evaluate(CLICK); pg.wait_for_timeout(200)
        s1 = pg.evaluate("window.scrollY")
        pg.evaluate(CLICK); pg.wait_for_timeout(200)
        s2 = pg.evaluate("window.scrollY")
        pg.evaluate(CLICK); pg.wait_for_timeout(200)
        s3 = pg.evaluate("window.scrollY")
        check('tabs: with a sticky list, the page goes to the list and stays there tab after tab', abs(s1 - (natural - 16)) < 2 and abs(s2 - s1) < 1 and abs(s3 - s1) < 1, f'natural {natural}: {s1}, {s2}, {s3}')
        pg.close()
        browser.close()

    sys.exit(check.finish())


if __name__ == '__main__':
    main()
