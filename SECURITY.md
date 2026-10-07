# Security policy

Aipim is CSS, a small script (`components/web/aipim.js`), design tokens, icons and the Python tools that generate them. It has no server and collects no data. A security problem here is most likely one of these:

- the script or a component letting untrusted content run (for example through `innerHTML`),
- a dependency or a GitHub Actions workflow that could be abused to publish a bad package,
- a file in the package (`aipim-ds` on npm) that should not be there.

## Supported versions

Only the latest published version of `aipim-ds` gets fixes. Until 1.0.0 that is the newest `0.x`.

## How to report

Please **do not open a public issue** for a vulnerability.

Use GitHub's private report: on the repository, open **Security** and choose **Report a vulnerability** (or go to <https://github.com/talis-galhardi/aipim/security/advisories/new>). Say what you found, how to reproduce it and which version it affects.

This is a one-person project, so the answer is best effort: expect an acknowledgment within about a week, and a fix, or a clear reason why not, after that. When a fix is published, the report is credited in the changelog unless you prefer to stay anonymous.

## What is already in place

- The package is published by a GitHub Actions workflow with npm trusted publishing and provenance, with no long-lived npm token.
- The CI workflow only reads the repository. The release workflow runs only when a version tag is pushed and has just the permissions it needs to publish. The actions both use are pinned by commit and kept up to date by Dependabot.
- The package ships only the files listed in `package.json`.
