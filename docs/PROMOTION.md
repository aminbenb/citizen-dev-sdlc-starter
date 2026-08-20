# Promotion pathway: prototype → reviewed → production

This is the fifth SDLC building block from the Task 3 deep-dive: a defined
path from "an associate built this over a weekend" to "the firm runs this."
Skipping this step is how a firm ends up with three overlapping email
workflow tools and nobody who can say which one is current.

## Stage 1 — Prototype

Anyone can get here. Fork this template, build against the mock data layer,
iterate freely. Nothing at this stage touches real firm data or a real
deployment. There is no review gate, on purpose — the entire value of citizen
development is speed at this stage, and slowing it down here defeats the
point.

**Exit criteria to move to Stage 2:** the prototype does something a real
user wants, and its author wants it to keep existing past the current deal or
project.

## Stage 2 — Candidate for promotion

Open a pull request against `main`. `CODEOWNERS` automatically requests
review from the platform engineering function — not to relitigate the whole
idea, but to check the things that are cheap to check now and expensive to
fix later:

- Does it use the shared data layer (`src/lib/data/client.ts`), or does it
  have its own copy of data that belongs in the canonical schema?
- Does CI pass — lint, typecheck, tests, secret scan? (It has to; this isn't
  optional, see `AGENTS.md`.)
- Is there at least one real test for the new behavior?
- Does it duplicate something another team already built? (This is the
  single most common finding at this stage — two teams solving the same
  problem with incompatible schemas.)
- Does it touch anything that needs auth, PII, or LP data? If yes, this
  moves to a heavier review — this template does not include an auth layer,
  by design, and that gap has to be closed deliberately, not silently.

This review is meant to be fast — hours, not weeks. Most of what would
otherwise be manual review here is already caught by the automated gates;
the human review is for the things automation can't check, like "does this
duplicate something else."

## Stage 3 — Production

Merged to `main`, deployed through the platform team's pipeline, and added to
the internal tool registry — the point being that it now shows up somewhere
a CTO can see it, instead of being knowable only to the person who built it.
Ownership is joint: the original author stays the domain expert on what it
should do; the platform team owns keeping it running, secure, and connected
to the shared data layer as that layer evolves.

## If it doesn't get promoted

Most prototypes shouldn't become production tools, and that's a fine
outcome — not a failure. If a prototype is retired, its requirements get
captured in a short note before the repo is archived: what problem it solved,
who used it, why it didn't get promoted. That note is what lets someone six
months later avoid rebuilding the same thing from scratch, or fold the need
into something that already exists.
