#!/usr/bin/env python3
"""Checks the numbers that the docs write by hand against the repository.

The README, AGENTS.md, the Storybook pages and the docs say how many components, icons, illustrations and contrast
checks Aipim has, and when the current version came out. Those numbers are counted here from the source (the specs,
icons/icons.json, illustrations/illustrations.json, the contrast table of docs/en/color.md, package.json and
CHANGELOG.md), and every text that says otherwise fails, in English and in Portuguese, in digits or in words.

    python3 tools/check_facts.py

CHANGELOG.md and docs/figma-sync-log.md are history, so they keep the numbers of their time. No dependencies.
"""
import json
import re
import subprocess
import sys

from aipim_tools import ROOT, read, specs

SKIP = re.compile(r'^(CHANGELOG\.md|docs/figma-sync-log\.md|llms-full\.txt|package-lock\.json|tokens/|icons/|illustrations/svg/)')
WORDS = {
    'en': 'zero one two three four five six seven eight nine ten eleven twelve thirteen fourteen fifteen sixteen seventeen '
          'eighteen nineteen twenty'.split(),
    'pt': 'zero um dois três quatro cinco seis sete oito nove dez onze doze treze quatorze quinze dezesseis dezessete '
          'dezoito dezenove vinte'.split(),
}
TENS = {'en': {60: 'sixty', 80: 'eighty'}, 'pt': {60: 'sessenta', 80: 'oitenta'}}
ONES = {'en': WORDS['en'][:10], 'pt': ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove']}


def number(word):
    """A number written in digits or in words (up to the eighties, which is what the docs need)."""
    word = word.lower()
    if word.isdigit():
        return int(word)
    for lang in ('en', 'pt'):
        if word in WORDS[lang]:
            return WORDS[lang].index(word)
        for tens, name in TENS[lang].items():
            for sep in ('-', ' e '):
                for i, one in enumerate(ONES[lang][1:], 1):
                    if word == f'{name}{sep}{one}':
                        return tens + i
            if word == name:
                return tens
    return None


def facts():
    color = read('docs/en/color.md')
    table = color[color.index('## Accessibility'):]
    table = table[:table.index('\n## ', 4)] if '\n## ' in table[4:] else table
    checks = sum(1 for line in table.split('\n') if line.startswith('|') and ' on `' in line)
    released = re.findall(r'^## \[(\d+\.\d+\.\d+)\] - (\d{4}-\d{2}-\d{2})', read('CHANGELOG.md'), re.M)[0]
    return {
        'components': len(specs()),
        'icons': len(json.loads(read('icons/icons.json'))['icons']),
        'illustrations': len(json.loads(read('illustrations/illustrations.json'))['illustrations']),
        'checks': checks,
        'rules': len(re.findall(r'^\d+\. \*\*', read('AGENTS.md')[read('AGENTS.md').index('## The rules'):].split('\n## ')[0], re.M)),
        'version': json.loads(read('package.json'))['version'],
        'released': released,
    }


NUM = r"(\d+|[a-zà-ú]+(?:[- ]e?[ -]?[a-zà-ú]+)?)"
NOUNS = {
    'components': r'(?:components?|componentes?)',
    'icons': r'(?:icons|ícones)',
    'illustrations': r'(?:illustrations|ilustrações)',
    'rules': r'(?:rules|regras)',
    'checks': r'(?:contrast checks|color contrast checks|checks of contrast|checagens de contraste|pares de contraste|contrast pairs|color pairs|pares de cores|checagens)',
}
# Words that may sit between the number and the noun ("20 HTML and CSS components", "64 ícones de linha").
BETWEEN = r'(?:\s+(?:web|html|and|css|e|line|linha|de|own|color|cor|wcag|2\.2|in|the))*\s+'


def main():
    f = facts()
    files = subprocess.run(['git', 'ls-files'], cwd=ROOT, capture_output=True, text=True).stdout.split()
    files = [p for p in files if re.search(r'\.(md|mdx|txt|json|js|py|html)$', p) and not SKIP.search(p)]
    problems = []
    for rel in files:
        text = read(rel)
        for key, noun in NOUNS.items():
            for m in re.finditer(rf'\b{NUM}{BETWEEN}{noun}\b', text, re.I):
                n = number(m.group(1))
                # A much smaller number is a part, not the total ("six icons are platform logos", "four illustrations").
                if n is None or n == f[key] or abs(n - f[key]) > f[key] / 2:
                    continue
                # "84 checks" is the contrast table; other checks (the 200 random themes, the 57 tones) are not counts of it.
                if key == 'checks' and not re.search(r'contrast|contraste|pairs|pares|color', m.group(0), re.I) and n != 84:
                    continue
                line = text.count('\n', 0, m.start()) + 1
                problems.append(f'{rel}:{line}: "{m.group(0).strip()}" but there are {f[key]} {key}')
        version, date = f['released']
        for m in re.finditer(r'(?:released|lançad[ao]|publicad[ao]) (?:on |em )?(\d{4}-\d{2}-\d{2})', text):
            if m.group(1) != date:
                line = text.count('\n', 0, m.start()) + 1
                problems.append(f'{rel}:{line}: says "{m.group(0)}", but CHANGELOG.md dates {version} on {date}')
    if f['version'] != f['released'][0]:
        problems.append(f"package.json is at {f['version']}, but the newest release in CHANGELOG.md is {f['released'][0]}")
    for p in problems:
        print('  ' + p)
    if problems:
        print(f'{len(problems)} fact(s) out of date.')
        return 1
    print(f"OK: {f['components']} components, {f['icons']} icons, {f['illustrations']} illustrations, {f['rules']} rules in AGENTS.md, "
          f"{f['checks']} contrast checks and {f['version']} ({f['released'][1]}) agree everywhere")
    return 0


if __name__ == '__main__':
    sys.exit(main())
