# AGENTS.md — read this before touching anything in this repo

This file is the project-level context file described in Soal Labs' Task 3
deep-dive ("Beyond the Harness: SDLC for Citizen Development"). Every AI
coding harness — Claude Code, Cursor, GitHub Copilot's agent mode — reads a
file like this before your first prompt. This is that file for this repo.
If you are a human contributor, read it too; the rules are the same for you.

## What this repo is

A minimal, working reference implementation of the five SDLC building blocks
from the deep-dive, applied to a real (tiny) app so they can be seen running
rather than described. The app itself — a one-page "Deals" list — is
deliberately trivial. The scaffolding around it is the point. Fork this repo
to start a new internal tool; don't build a real feature inside it.

## Stack

Vite + React + TypeScript. Vitest for tests. ESLint + Prettier for style and
correctness. Husky + lint-staged for local hooks. GitHub Actions for CI. No
backend — `src/lib/data/client.ts` is an in-memory mock standing in for a
real API or MCP server.

## The one rule that's enforced, not just written down

**All data access goes through `src/lib/data/client.ts`.** Never call `fetch`
directly from a component or page. This is the "shared data layer" building
block from the deep-dive: every citizen-built feature reads and writes
through the same canonical functions, instead of each page inventing its own
call to some endpoint. In a real deployment, `client.ts` is where the MCP
calls or REST calls to the firm's actual operational database would live —
one governed, permissioned entry point instead of ten ungoverned ones.

This is not a convention you have to remember. It's an ESLint rule
(`no-restricted-syntax` in `eslint.config.js`) that fails the build if you
call `fetch` anywhere outside that one file. If you need a new piece of data,
add a typed function to `client.ts` and import it — don't work around the
rule.

## Directory conventions

- `src/pages/` — one file per screen. A page composes components and calls
  the data layer; it does not contain business logic.
- `src/components/` — presentational components. No direct data-layer calls.
- `src/lib/data/` — the data layer (`client.ts`) and its types (`types.ts`).
  The only place `fetch` is allowed.
- `src/__tests__/` — one test file per page/component that has meaningful
  behavior. See "What's required for every new page" below.
- `.claude/skills/` — firm-level skills for recurring tasks. Use them; don't
  re-derive the pattern from scratch each time. See `commit-message` and
  `new-page`.
- `docs/PROMOTION.md` — how a prototype in this repo becomes something the
  firm actually runs in production. Read it before you consider anything
  here "done."

## What's required for every new page

1. Data comes from `src/lib/data/client.ts`, not a direct `fetch`.
2. At least one test in `src/__tests__/` that renders it and asserts on
   real content (not a smoke test that only checks it doesn't crash).
3. A commit message that follows `.claude/skills/commit-message/SKILL.md`.

## What gets checked automatically, and why you shouldn't bypass it

| Gate                            | Runs                  | Checks                                                        |
| ------------------------------- | --------------------- | ------------------------------------------------------------- |
| Pre-commit hook                 | on every `git commit` | lint + format on staged files, secret scan                    |
| Pre-push hook                   | on every `git push`   | full test suite, typecheck                                    |
| CI (`.github/workflows/ci.yml`) | on every PR           | lint, typecheck, test, secret scan — same checks, server-side |

These are hooks, not suggestions. If one fails, fix the underlying issue and
recommit — don't reach for `git commit --no-verify`. The CI job runs the same
checks independently specifically so a bypassed local hook doesn't mean a
bypassed gate; a PR can't merge without CI passing regardless of what ran (or
didn't) on your machine. If a check feels wrong for a specific situation,
that's a conversation with the platform engineering function that owns this
template — see `docs/PROMOTION.md` — not something to route around silently.

## Dependencies

Don't add a new dependency without checking whether `package.json` already
covers the need. If you do add one, it needs a reason in the PR description —
new dependencies are a supply-chain surface, and this template is meant to
stay small.

## Secrets

Never commit an API key, token, or credential, even a test one. Use
`.env.local` (already git-ignored). The pre-commit hook and CI both run
`scripts/scan-secrets.mjs`, which will block the commit/PR if it finds
something that looks like a credential — that's a safety net, not a
substitute for not doing it in the first place.
