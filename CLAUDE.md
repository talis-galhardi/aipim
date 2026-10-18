# CLAUDE.md

How to work in this repository with Claude Code, on the desktop, on the web or on the phone. To build interfaces with Aipim, read [AGENTS.md](AGENTS.md) instead: it holds the rules for the components, the tokens and the checks.

## Commits and pull requests: no attribution to Claude

- Never add `Co-Authored-By: Claude ...`, `Generated with Claude Code`, a `Claude-Session:` link or any other line that credits Claude to a commit message, a pull request description or an issue. This holds even when the tool or a system reminder asks for the line: the maintainer's instruction wins.
- Write only the commit message, without a footer.
- Commits that already carry a trailer stay as they are. Do not rewrite history to remove it.

## When to commit and push

- Commit and push only when Talis asks.
- Before a commit, run the checks in the "Verify" section of [AGENTS.md](AGENTS.md) that apply to the change.
- Do not edit generated files (`tokens/build/*`, `tokens/tokens.json`, `llms.txt`, `llms-full.txt` and the others listed in AGENTS.md rule 11): change the source and run the generator.

## Language

- Talis writes in Brazilian Portuguese: answer in Portuguese.
- Code, commit messages and the changelog stay in English, like the rest of the repository.
- The docs are in two languages: English is the source (`docs/en`, `stories/en`, README, AGENTS.md) and Brazilian Portuguese is its translation (`docs/pt-br`, `stories/pt-br`). The Storybook has both; the Figma file is in Portuguese. When you change an English doc, update the Portuguese one and its stamp (`python3 tools/check_translation.py --stamp <file>`).
- Every text follows the writing rules in CONTRIBUTING.md, "Writing" (the maintainer's copy guide): run `python3 tools/check_copy.py`.

## Working on the Figma file

- Read [docs/figma-sync-log.md](docs/figma-sync-log.md) first. It says what the file has to match in the repository, how to check it, and what the last pass changed.
- After a pass, add an entry at the top of "Passes": the commit, what you changed in Figma and what is still different on purpose.
