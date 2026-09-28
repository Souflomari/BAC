# Contributing

A small project, mostly one person + an AI pair. A few conventions worth
keeping. Pair with [README.md](README.md) for orientation, `.claude/CLAUDE.md`
for the full index, and `docs/Rules/RULES.md` for the build discipline.

---

## Toolchain

The app is a **Next.js** project in `web/`. Node (see `web/package.json` for the
pinned versions) + npm.

```bash
cd web
npm install
npm run dev          # local dev server
npm run build        # production build (prebuild runs the token --check)
npm run dom-truth    # rendered-truth harness (computed-style assertions, headless)
npm run token-gate   # design-token guard (bars arbitrary token values)
npm run item-stats   # item length-tell report (measurement only)
```

Content validation: `node web/scripts/validate-content.mjs` (add `--strict`
for the sourcing gate).

---

## Code style

- **Tools first**: prefer `Read`/`Edit`/`Glob`/`Grep` over shell for file ops.
- **Tokens, not hex**: use the named token aliases (`text-secondary`,
  `bg-surface-raised`, `tracking-eyebrow`, …). The single source is
  `web/src/lib/tokens.ts`; `scripts/token-gate.mjs` rejects arbitrary values
  (`-[var(--…)]`, `-[#hex]`, …). Add a token to `tokens.ts` (and `docs/design/
  TOKENS.md`) before using it; a deliberate one-off carries a `token-gate-allow`
  marker.
- **Comments earn their place**: explain WHY (a hidden constraint, a workaround),
  not WHAT — well-named identifiers do that.
- **Don't add error handling for impossible states**; validate at boundaries.

---

## Database migrations (the gated 10%)

Production-touching DB work is **human-gated** and flows only through migration
files under `backend/supabase/migrations/` — see `docs/Rules/RULES.md §3` and the
non-negotiables in `.claude/CLAUDE.md`. In short:

- Migrations are **append-only** — never edit one that has run on production;
  write a new one.
- Every migration ships a **verify block** asserting post-state cardinality +
  identity, not just structure.
- **RLS** is enabled in the creating migration; per-user-state write RPCs get
  service_role-only grants.
- No production push without a passing branch-test (`scripts/branch-test.ps1`)
  **and** explicit human authorization.

---

## Authoring content

Lessons and items are **files** under `content/<subject>/<notion>/`
(`lesson.md` + `items.yaml`, plus `media/` for coded figures). They are validated
by `web/scripts/validate-content.mjs` and rendered by the Next.js app — there are
no Dart encoders. The agent roster that produces content is `docs/agents/ROSTER.md`.

---

## Commit messages

Descriptive, with sections when a change spans subsystems:

```
<area>: <one-line summary>

<paragraph or two of context: what changed and why>

Co-Authored-By: ...
```

A model-identifier grep runs before every commit — do not commit model IDs into
code, comments, commit messages, or any repo artifact.

---

## Sensitive files

- Anon keys are public; do not commit other secrets.
- **Service-role keys belong in the Supabase dashboard env, never in this repo
  and never in Vercel.**
