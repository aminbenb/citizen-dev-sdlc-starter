---
name: commit-message
description: Use this skill when writing a commit message in this repo, so history stays scannable and every commit says what changed and why, not just "updates".
---

# Writing a commit message

## Format

```
<type>: <short summary, imperative mood, under 72 chars>

<optional body: why this change, not a restatement of the diff>
```

`<type>` is one of: `feat`, `fix`, `chore`, `docs`, `test`, `refactor`.

## Rules

- Imperative mood: "add deal filter", not "added" or "adds".
- The summary says what changed. The body (if there is one) says why —
  skip the body if the summary already makes that obvious.
- One logical change per commit. If the summary needs "and" to describe it,
  it's probably two commits.
- Never write a summary that only restates the file name, e.g. "update
  DealsPage.tsx". Say what changed about it.

## Examples

Good:

```
feat: add stage filter to deals list

Deal team asked to narrow the pipeline view by stage during standup
review; matches the filter pattern already used elsewhere in the app.
```

Not good:

```
updates
```

```
fix stuff
```

```
WIP
```

## Why this is a skill and not just a note in AGENTS.md

Commit messages are the audit trail described in the deep-dive's "review and
promotion pathway" — when something breaks or needs to be understood six
months later, the commit log is often the only record of why a change was
made. A skill makes the pattern something to invoke and follow consistently,
rather than a rule to remember.
