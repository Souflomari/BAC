# BAC — a Moroccan baccalauréat prep app

A preparation app for Moroccan science-stream *2ème Bac* students (SM-A, SM-B,
Sciences Physiques, SVT — French first). The goal is to replace private tutoring
with a patient, omniscient, infinitely-available tutor that takes a struggling
student to excelling at the bac.

**Read `docs/product/VISION.md` before making any product decision** — it is the
canonical statement of what the app is and why.

## Stack

| Layer | Tech |
|---|---|
| Frontend | **Next.js** (App Router) + React + Tailwind, in `web/` |
| Backend | **Supabase** (Postgres + Auth + Storage + Edge Functions) |
| Deploy | **Vercel** |
| Content | authored as files under `content/` (Markdown lessons + YAML items) |

> The app was rebuilt from a Flutter Web MVP to Next.js (ADR 0016). No Flutter
> remains in the running app; any lingering Flutter artifacts are to be deleted,
> never patched (`docs/Rules/RULES.md`).

## Develop

```bash
cd web
npm install
npm run dev          # local dev server
npm run build        # production build (runs the token --check first)
npm run dom-truth    # the rendered-truth harness (computed-style assertions)
npm run token-gate   # the design-token guard (one consumption syntax)
```

Content is validated by `web/scripts/validate-content.mjs`; item length-tells by
`web/scripts/item-stats.mjs`.

## Where things live

- **`.claude/CLAUDE.md`** — the orientation index (read first in any session).
- **`docs/product/VISION.md`** — the product vision (the north star).
- **`docs/Rules/RULES.md`** — how we work (build discipline, gates, cadence).
- **`docs/agents/ROSTER.md`** — the agent roster (who does what, which model).
- **`docs/decisions/`** — the ADR trail (numbered, append-only).
- **`docs/HANDOFF.md`** — the current handoff / open-gates list.
- **`docs/design/`** — the design specs (TOKENS, DESIGN-BIBLE, page anatomies…).

## Production safety (always in force)

Production pushes are human-gated; no autonomous push to production. Schema and
seed data flow only through migration files (append-only, with verify blocks).
See `docs/Rules/RULES.md` and the non-negotiables in `.claude/CLAUDE.md`.

## License

Private. Not yet open-sourced.
