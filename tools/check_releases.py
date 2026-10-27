#!/usr/bin/env python3
"""Checks that the What's new and Roadmap pages of the Storybook follow CHANGELOG.md and ROADMAP.md.

The two pages are written by hand, as a short summary for people, so they are not generated. This check fails when
they fall behind: every version released in CHANGELOG.md needs a section on What's new, and every version of the
ROADMAP.md table that is not done needs one on Roadmap (and a done one must leave it). The Portuguese pages follow
the English ones through check_translation.py.

    python3 tools/check_releases.py

No dependencies.
"""
import re
import sys

from aipim_tools import read

WHATS_NEW = 'stories/en/whats-new.mdx'
ROADMAP = 'stories/en/roadmap.mdx'


def headings(rel):
    return [line[3:] for line in read(rel).splitlines() if line.startswith('## ')]


def main():
    problems = []

    released = re.findall(r'^## \[(\d+\.\d+\.\d+)\]', read('CHANGELOG.md'), re.M)
    shipped = ' '.join(h.split(' · ')[0] for h in headings(WHATS_NEW))
    for version in released:
        if not re.search(rf'(?<![\d.]){re.escape(version)}(?![\d.])', shipped):
            problems.append(f'{WHATS_NEW}: no section for {version}, released in CHANGELOG.md')

    rows = re.findall(r'^\| (v\d+\.\d+) \| ([^|]+) \|', read('ROADMAP.md'), re.M)
    planned = {h.split(' · ')[0] for h in headings(ROADMAP)}
    for version, status in rows:
        done = status.strip().startswith('Done')
        if done and version in planned:
            problems.append(f'{ROADMAP}: {version} is done in ROADMAP.md, move it to {WHATS_NEW}')
        if not done and version not in planned:
            problems.append(f'{ROADMAP}: no section for {version}, planned in ROADMAP.md')

    for p in problems:
        print('  ' + p)
    if problems:
        print(f'{len(problems)} page(s) behind CHANGELOG.md or ROADMAP.md.')
        return 1
    print(f'OK: What\'s new has the {len(released)} released versions, Roadmap the {len(planned)} planned ones.')
    return 0


if __name__ == '__main__':
    sys.exit(main())
