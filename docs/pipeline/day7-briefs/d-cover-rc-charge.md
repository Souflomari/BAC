# Brief (d) — a new cover motif from COVER-SPEC: rc-charge

**Task.** The notion `content/pc/rc-charge/` exists (its first section was
authored separately). Give it its own cover: a new per-notion motif in the
coded cover set, per the cover spec. Today it falls back to the generic PC
motif — after your change, the home shelf and session card must show an
rc-charge-specific cover.

**Governing docs (read in this order):**

1. `docs/design/COVER-SPEC.md` — the whole spec: language, composition,
   geometry, palette rules, placement. Your motif must be indistinguishable
   in language from the existing set.
2. `web/src/components/covers/Cover.tsx` — the coded starter set and the
   motif registry you are extending (read its header comment).
3. `docs/Product/DESIGN-BIBLE.md` §6 (the generated-visual language the
   spec applies).

**Design constraints (from the spec — restated here only as scope, the spec
is authoritative):** ONE motif, subject-true for *this* notion (what is the
single truest object or curve of the RC step-response chapter? — your
call, and the call is part of the test), figure-palette CSS vars only, one
accent hue, works in dark mode by construction, composition per the spec's
geometry rules.

**Deliverables.**

- The new motif + registry entry in `web/src/components/covers/Cover.tsx`
  (slug `rc-charge`), house comment style.

**Acceptance boxes:**

- [ ] `cd web && npm run build` passes.
- [ ] Home (`/`) renders `[data-cover='rc-charge']` on the rc-charge shelf
      card (and on the session card side panel if rc-charge is the
      suggested notion that day).
- [ ] Zero hard-coded colors — every fill/stroke a `var(--figure-*)` (or
      the surface var the spec names); stroke weights within the spec's
      band.
- [ ] Text never inside the cover art.

**Report back:** the motif you chose and why it is the notion's truest
object, and any question the docs should have answered but did not.
