# Citizen Dev SDLC Starter

A small, working reference repo accompanying the Beyond the Harness presentation. 
It implements the five SDLC building blocks the write-up describes around a deliberately trivial one-page app.

**Start with [`AGENTS.md`](./AGENTS.md).** That's the file an AI coding
harness (or a human) reads first, and it explains the one enforced rule this
whole template exists to demonstrate: all data access goes through
`src/lib/data/client.ts`, and that's not a convention, it's an ESLint rule
that fails the build if you break it.

## Where each building block lives

| Building block                        | Where                                                                                      |
| ------------------------------------- | ------------------------------------------------------------------------------------------ |
| Shared data layer                     | `src/lib/data/client.ts`, `src/lib/data/types.ts`                                          |
| Templated repo + project-context file | This repo's structure + `AGENTS.md` (`CLAUDE.md` points to it)                             |
| Skills for repeatable procedures      | `.claude/skills/new-page/`, `.claude/skills/commit-message/`                               |
| Hooks for non-optional checks         | `.husky/pre-commit`, `.husky/pre-push`, mirrored server-side in `.github/workflows/ci.yml` |
| Review & promotion pathway            | `docs/PROMOTION.md`, `CODEOWNERS`                                                          |

## Quick start

```bash
npm install       # also installs the git hooks via the "prepare" script
npm run dev       # starts the app at http://localhost:5173
npm run lint
npm run typecheck
npm test
npm run scan-secrets
```

Try breaking the enforced rule on purpose: add `fetch("/api/x")` inside
`src/pages/DealsPage.tsx` and run `npm run lint`. It fails, with a message
pointing back to `AGENTS.md` — that's the "encoded in the tools, not a
policy document" principle, made concrete.

## What this is not

This is not a production application. There's no auth, no real backend, no
deployment config beyond CI running its checks. It's the scaffolding a real
internal tool would be forked from - see `docs/PROMOTION.md` for what has to
be added before something built on this template is allowed to touch real
data.
