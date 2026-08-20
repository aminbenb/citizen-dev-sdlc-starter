---
name: new-page
description: Use this skill whenever adding a new screen/page to this app. Scaffolds a page that follows the repo's conventions (data layer usage, file location, required test) instead of re-deriving the pattern each time.
---

# Adding a new page

This encodes the pattern every page in this repo should follow, so quality
doesn't depend on whoever's building it remembering the rules from
`AGENTS.md` by heart.

## Steps

1. **Add data access to the data layer first, not the page.** If the page
   needs data that isn't already exposed by `src/lib/data/client.ts`, add a
   typed function there (and a type in `src/lib/data/types.ts` if needed)
   before writing the page. The page should only ever import from
   `client.ts` — never call `fetch` directly.

2. **Create the page file** at `src/pages/<Name>Page.tsx`. Keep it thin: it
   fetches via the data layer, holds minimal local state (loading/error/data),
   and composes components from `src/components/`. Business logic belongs in
   the data layer or a helper, not in the page.

3. **Build presentational pieces in `src/components/`**, not inline in the
   page, if they're more than a couple of elements or likely to be reused.

4. **Write the test.** Every new page gets a file in `src/__tests__/`
   that renders the page and asserts on real content — e.g., that a known
   mock deal name appears — not just that the component doesn't throw. See
   `src/__tests__/DealsPage.test.tsx` for the pattern to copy.

5. **Wire it up** wherever this app's navigation lives (currently just
   `src/App.tsx`, since this template has one page).

6. **Run the local gates before committing:** `npm run lint`,
   `npm run typecheck`, `npm test`. These also run automatically via the
   pre-commit/pre-push hooks — running them yourself first just means you
   find out sooner.

## What "done" looks like

A page that reads through the shared data layer, has a real test, passes
lint/typecheck/test, and was committed with a message following the
`commit-message` skill. If any of those is missing, it's not done — it's a
prototype that will get flagged at the promotion review in
`docs/PROMOTION.md`.
