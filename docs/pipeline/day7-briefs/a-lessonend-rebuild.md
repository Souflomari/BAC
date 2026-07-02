# Brief (a) — rebuild the LessonEnd component from its spec

**Task.** The component `web/src/components/notion/LessonEnd.tsx` has been
removed from the working tree. Rebuild it from its spec so the notion page
compiles and renders its session-close moment again.

**This is a spec-fidelity exercise:** build from the documentation alone.
Do NOT consult git history (git log/show/diff) for any previous
implementation of this file — if the spec and the surrounding code are not
enough, that gap is exactly what this task exists to reveal; note every
such question in your report.

**Governing docs (read in this order):**

1. `docs/design/PAGE-ANATOMY-SPECS.md` — §LessonEnd (purpose, anatomy, data
   contract, invariants) and the ground rules at the top of the file.
2. `docs/Product/DESIGN-BIBLE.md` §8 (periphery/session close), §11 (page
   anatomy), §13 (rendered truth).
3. `docs/design/COMPONENT-STATES.md` — the state-layer / focus-ring
   conventions every interactive element carries.
4. `docs/design/TOKENS.md` — the token set you are allowed to use.

**Wiring that already exists (do not change it):** the caller in
`web/src/components/notion/NotionPageView.tsx` imports
`{ LessonEnd } from "@/components/notion/LessonEnd"` and renders
`<LessonEnd next={nextNotion} />` where `nextNotion: NotionMeta | null`.
Match that interface.

**Deliverables.**

- `web/src/components/notion/LessonEnd.tsx`, built to spec, with a header
  comment stating its purpose and pointing at its spec (house style: every
  component explains itself to the next maintainer).

**Acceptance boxes (all must hold):**

- [ ] `cd web && npm run build` passes.
- [ ] The rendered notion page (`/notions/pc/rlc-serie`) carries
      `[data-lesson-end]` containing "Et maintenant", per the spec's
      invariants.
- [ ] Tokens only — no raw hex/px outside the token set; no new Tailwind
      keys (if you believe you need one, that is a report-worthy question).
- [ ] Interactive elements carry `.state-layer` + `.focus-ring` with a
      host-matched `--focus-radius`.
- [ ] The honest-state rule holds (no fabricated student state, no
      progressbar).

**Report back:** what you built, the decisions the spec left to you (list
them explicitly), and any question the docs should have answered but did
not.
