#!/usr/bin/env python3
"""Checks the prose of the docs against the writing rules of Aipim (CONTRIBUTING.md, "Writing").

The rules come from the maintainer's copy guide. A script catches only what a script can see: the words and
phrases on the blocked lists, the em dash, a gerund or participle tacked on to the end of a sentence, and an
exclamation mark or an ellipsis in the prose. Rhythm, lists of three and a claim without a fact are for the person
who writes and the one who reviews.

Code (fenced blocks and `inline code`), HTML comments and text in quotes are left out: a quote is an example of
interface text, and microcopy may say "Saved!" or "Sending...".

    python3 tools/check_copy.py            # every docs file, in English and in Portuguese
    python3 tools/check_copy.py FILE...    # only these files

Exit code 0 when nothing is found.
"""
import glob
import os
import re
import sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Files written in English and in Portuguese. The changelog keeps its history as it was written.
FILES = ['README.md', 'ROADMAP.md', 'docs/figma-sync-log.md', 'AGENTS.md', 'CONTRIBUTING.md', 'CLAUDE.md', 'SECURITY.md', 'LICENSE-DESIGN.md', 'THIRD-PARTY.md',
         '.storybook/README.md', '.github/pull_request_template.md',
         'docs/**/*.md', 'stories/**/*.mdx', '.storybook/i18n.js']

WORDS_EN = [
    r'comprehensive', r'foundational', r'nuanced', r'impactful', r'robust(ly|ness)?', r'seamless(ly)?',
    r'leverag(e|es|ed|ing)', r'utili[sz](e|es|ed|ing|ation)', r'facilitat(e|es|ed|ing)', r'demonstrat(e|es|ed|ing)',
    r'initiat(e|es|ed|ing)', r'delv(e|es|ed|ing)', r'landscapes?', r'tapestry', r'testament', r'treasure trove',
    r'embark(s|ed|ing)?', r'unlock(s|ed|ing)?', r'elevat(e|es|ed|ing)', r'foster(s|ed|ing)?', r'paramount', r'boundless',
    r'unparalleled', r'cutting-edge', r'game-changer', r'revolutioni[sz](e|es|ed|ing)', r'empower(s|ed|ing|ment)?',
    r'holistic(ally)?', r'synerg(y|ies)', r'streamlin(e|es|ed|ing)', r'transformative', r'pivotal', r'crucial(ly)?',
    r'underscor(e|es|ed|ing)', r'showcas(e|es|ed|ing)', r'intricate', r'meticulous(ly)?', r'realm', r'enhanc(e|es|ed|ing|ement)',
    r'world-class', r'state-of-the-art',
]
PHRASES_EN = [
    r"it'?s important to note", r"it'?s worth noting", r'generally speaking', r'to some extent', r'from a broader perspective',
    r"in today'?s", r'in the ever-evolving', r'in the world of', r"whether you'?re", r"it'?s not just", r"this isn'?t just",
    r"let'?s dive", r'the result\?', r"here'?s the kicker", r'the best part\?', r"here'?s the thing", r'let that sink in',
    r'at the end of the day', r'\bultimately\b', r'in conclusion', r'^overall,', r'\bmoreover\b', r'\bfurthermore\b',
    r"i'?m (thrilled|excited|humbled|honou?red)", r'actionable insights', r'data-driven solutions', r'user-centric',
    r'click here', r'picture this', r'ever wondered',
]
WORDS_PT = [
    r'abrangentes?', r'multifacetad[oa]s?', r'robust[oa]s?', r'inovador(a|es|as)?', r'escal[áa]ve(l|is)', r'sinérgic[oa]s?',
    r'cruciai?s?', r'alavanc\w*', r'impulsion\w*', r'foment\w*', r'turbin\w*', r'empodera\w*', r'transformador(a|es|as)?',
    r'revolucionári[oa]s?', r'disruptiv[oa]s?', r'panorama', r'vanguarda', r'de ponta', r'desvend\w*', r'desbrav\w*',
    r'holístic[oa]s?', r'tapeçaria', r'divisor de águas', r'no coração de', r'potencializ\w*', r'outrossim', r'destarte',
]
PHRASES_PT = [
    r'é importante (ressaltar|destacar|notar)', r'vale (ressaltar|destacar)', r'cabe ressaltar', r'de modo geral',
    r'em certa medida', r'sob uma perspectiva', r'no cenário atual', r'no mundo de hoje', r'cada vez mais', r'seja você',
    r'nesse sentido', r'nesse contexto', r'diante disso', r'diante do exposto', r'não é apenas', r'não se trata de',
    r'mais do que \w+, é', r'vamos mergulhar', r'o resultado\?', r'aqui está o segredo', r'a boa notícia é que',
    r'e isso muda tudo', r'ao final do dia', r'em suma', r'em conclusão', r'tenho o prazer', r'estou feliz em',
    r'centrad[oa] no usuário', r'clique aqui', r'imagine isso',
]
# A gerund or participle tacked on to the end of a sentence after a comma: cut it and write a new sentence.
TAIL_EN = r', (ensuring|enabling|allowing|providing|making sure|resulting in|leading to|helping|contributing to)\b'
TAIL_PT = r', (garantindo|permitindo|proporcionando|contribuindo|possibilitando|assegurando|tornando|gerando|resultando)\b'

RULES = [
    ('em dash', re.compile('—')),
    ('blocked word', re.compile(r'\b(' + '|'.join(WORDS_EN) + r')\b', re.I)),
    ('blocked phrase', re.compile('(' + '|'.join(PHRASES_EN) + ')', re.I | re.M)),
    ('palavra bloqueada', re.compile(r'(?<![\w-])(' + '|'.join(WORDS_PT) + r')(?![\w-])', re.I)),
    ('expressão bloqueada', re.compile('(' + '|'.join(PHRASES_PT) + ')', re.I | re.M)),
    ('tacked-on gerund', re.compile(TAIL_EN, re.I)),
    ('gerúndio de arremate', re.compile(TAIL_PT, re.I)),
    ('exclamation mark in prose', re.compile(r'(?<![!<\[(])!(?=\s|$)')),
    ('ellipsis in prose', re.compile(r'\.\.\.|…')),
]


def prose(text, js=False):
    """The text with code, comments, quotes and link targets blanked out, so line numbers stay the same."""
    blank = lambda m: re.sub(r'[^\n]', ' ', m.group(0))
    if js:
        # In a script only the strings are text a person reads; the rest is code.
        kept = []
        for m in re.finditer(r"'((?:[^'\\\n]|\\.)*)'", text):
            kept.append((m.start(1), m.group(1)))
        out = re.sub(r'[^\n]', ' ', text)
        chars = list(out)
        for start, s in kept:
            chars[start:start + len(s)] = s
        text = ''.join(chars)
    text = re.sub(r'^(```|~~~)[\s\S]*?^\1', blank, text, flags=re.M)
    text = re.sub(r'<!--[\s\S]*?-->', blank, text)
    text = re.sub(r'^---\n[\s\S]*?\n---\n', blank, text)
    text = re.sub(r'`[^`\n]*`', blank, text)
    text = re.sub(r'"[^"\n]*"|“[^”\n]*”', blank, text)
    text = re.sub(r'\]\([^)\n]*\)', blank, text)
    text = re.sub(r'<[^>\n]+>', blank, text)
    text = re.sub(r'^(import|export) .*$', blank, text, flags=re.M)
    text = re.sub(r'https?://\S+', blank, text)
    return text


def check(path):
    with open(path, encoding='utf-8') as f:
        raw = f.read()
    text = prose(raw, js=path.endswith('.js'))
    found = []
    for n, line in enumerate(text.split('\n'), 1):
        for name, rx in RULES:
            for m in rx.finditer(line):
                found.append((n, name, m.group(0).strip()))
    return found


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('-')]
    paths = [os.path.abspath(a) for a in args] if args else sorted({p for g in FILES for p in glob.glob(os.path.join(ROOT, g), recursive=True)})
    total = 0
    for p in paths:
        for n, name, hit in check(p):
            print(f'{os.path.relpath(p, ROOT)}:{n}: {name}: {hit}')
            total += 1
    print(f'{len(paths)} files, {total} found.' if total else f'{len(paths)} files, nothing found.')
    sys.exit(1 if total else 0)


if __name__ == '__main__':
    main()
