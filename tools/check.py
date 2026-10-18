#!/usr/bin/env python3
"""Every quick check of the repository, in one command. The list lives here only: CI, AGENTS.md and CONTRIBUTING.md
call this script.

    python3 tools/check.py      # or: npm run check

Each check runs even when one before it fails, and the summary says which failed. They need only Python, and Node
for the theme builder. The checks in a browser are separate: npm run check:browser.
"""
import subprocess
import sys

from aipim_tools import ROOT

CHECKS = [
    ('the palette passes contrast and color blindness, and the tokens are up to date', 'build_tokens.py --check'),
    ('the theme builder gives the same colors as the tokens', 'verify_theme_builder.py'),
    ('the colors in the specs come from the tokens', 'build_specs.py --check'),
    ('the CSS bundle and the icons of the gallery and the theme builder', 'build_web.py --check'),
    ('the AI files and the lists of components', 'build_ai.py --check'),
    ('the six tutorials', 'build_tutorials.py --check'),
    ('the numbers in the docs (components, icons, checks, version)', 'check_facts.py'),
    ('the writing rules, in English and Portuguese', 'check_copy.py'),
    ('the Portuguese docs are in step with the English ones', 'check_translation.py'),
]


def main():
    failed = []
    for what, command in CHECKS:
        print(f'\n== {what}', flush=True)
        if subprocess.run([sys.executable, *f'tools/{command}'.split()], cwd=ROOT).returncode:
            failed.append(what)
    print()
    if failed:
        print('Failed:\n' + '\n'.join(f'  - {w}' for w in failed))
        return 1
    print(f'All {len(CHECKS)} checks passed.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
