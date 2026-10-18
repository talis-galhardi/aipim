"""What the scripts in tools/ share: the paths, reading the specs, writing a generated file (or checking it with
--check), serving a folder to a browser and reporting checks.

    from aipim_tools import ROOT, read, sync, specs, components, Checks, serve

Nothing here runs on its own.
"""
import contextlib
import functools
import glob
import http.server
import os
import re
import sys
import threading

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
# The levels of the sidebar and of the Figma file, in their order. Each spec says its own in `group:`.
GROUPS = ('atoms', 'molecules', 'organisms')


def path(rel):
    return os.path.join(ROOT, rel)


def read(rel):
    with open(path(rel), encoding='utf-8') as f:
        return f.read()


def write(rel, text):
    os.makedirs(os.path.dirname(path(rel)), exist_ok=True)
    with open(path(rel), 'w', encoding='utf-8') as f:
        f.write(text)


def sync(outputs, command, what):
    """Writes each generated file, or with --check only says which are out of date. Returns the exit code."""
    stale = [rel for rel, text in outputs.items() if not os.path.exists(path(rel)) or read(rel) != text]
    if '--check' in sys.argv:
        if stale:
            print(f"Out of date: {', '.join(stale)}. Run: {command}")
            return 1
        print(f'OK: {what} up to date')
        return 0
    for rel in stale:
        write(rel, outputs[rel])
    print(f"Written: {', '.join(stale)}" if stale else f'Nothing to write: {what} already up to date')
    return 0


def replace_between(text, start, end, inner):
    """Replaces what sits between two marker lines, keeping the markers."""
    pattern = re.compile(rf'({re.escape(start)}\n)(.*?)([ \t]*{re.escape(end.strip())})', re.S)
    if not pattern.search(text):
        raise SystemExit(f'Markers not found: {start} … {end}')
    return pattern.sub(lambda m: m.group(1) + inner.rstrip('\n') + '\n' + m.group(3), text, count=1)


def spec(rel):
    """The frontmatter (as a dict of strings) and the body of a component spec."""
    m = re.match(r'---\n(.*?)\n---\n(.*)', read(rel), re.S)
    meta = {}
    for line in m.group(1).split('\n'):
        k, _, v = line.partition(': ')
        meta[k] = v.strip()
    return meta, m.group(2).strip()


def specs(lang='en'):
    """Every component spec of a language: name -> (path, meta, body), in the order of components()."""
    out = {}
    for p in glob.glob(path(f'docs/{lang}/components/*.md')):
        rel = os.path.relpath(p, ROOT)
        meta, body = spec(rel)
        if meta.get('group') not in GROUPS:
            raise SystemExit(f'{rel}: "group:" must be one of {", ".join(GROUPS)}')
        out[meta['name']] = (rel, meta, body)
    return dict(sorted(out.items(), key=lambda kv: (GROUPS.index(kv[1][1]['group']), kv[0])))


def components():
    """The component names, by group and then by name: the order of the sidebar and of the generated lists."""
    return list(specs())


class Checks:
    """Prints one line per check and remembers what failed."""

    def __init__(self):
        self.failures = []

    def __call__(self, name, ok, detail=''):
        print(f"  {'ok  ' if ok else 'FAIL'} {name}{f'  ({detail})' if detail and not ok else ''}")
        if not ok:
            self.failures.append(name)
        return ok

    def finish(self):
        if self.failures:
            print(f'\n{len(self.failures)} check(s) failed.')
            return 1
        print('\nAll checks passed.')
        return 0


@contextlib.contextmanager
def serve(directory):
    """Serves a folder on a free local port, quietly, and yields its base URL."""
    class Quiet(http.server.SimpleHTTPRequestHandler):
        def log_message(self, *args):
            pass

    server = http.server.ThreadingHTTPServer(('127.0.0.1', 0), functools.partial(Quiet, directory=str(directory)))
    threading.Thread(target=server.serve_forever, daemon=True).start()
    try:
        yield f'http://127.0.0.1:{server.server_address[1]}'
    finally:
        server.shutdown()
