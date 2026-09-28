# Day 2 notes — U1 fix, truth instrument, first sight of the real hierarchy

**Date:** 2026-07-02 · Companion to `docs/audits/fable-ui-content-audit.md`
(the Day-1 audit; finding numbers below refer to it). Audience: the owner
today; Opus/Sonnet 4.8 for Days 3+.

---

## 1. What was fixed (U1 and its siblings)

`web/src/lib/utils.ts` now uses `extendTailwindMerge` with every custom token
family registered. The empirical sweep (run with the real tailwind-merge 2.6.1
before fixing) convicted **three families, not one**:

| Family | Default-config behavior | Live impact before the fix |
|---|---|---|
| `fontSize` (text-h1 … text-caption, 10 keys) | misclassified as text **color** → silently deleted by any following text color, incl. `text-accent` | **every cn() headline/label at 16px** — the audit's U1 table, plus both Eyebrow tones, stems, captions, step indicators |
| `fontWeight` (`font-regular`) | misclassified as font **family** → `font-regular font-serif` deletes one of the two (order decides which) | latent — one live usage (`ChoiceButton.tsx:134`), no family class in the same call |
| `boxShadow` (`shadow-elevation-0..4`, `subtle`, `soft`) | lands in the shadow-**color** group | dedupe among elevations coincidentally correct; latent collision with any real shadow-color class |
| `duration-*`, `ease-*`, `max-w-*` customs | matched **no** group → conflicting pairs BOTH kept; stylesheet order (not call order) silently wins | latent — no live same-family pair found in one cn() today |
| `bp-medium/expanded` modifiers, `ring-focus` | correctly handled by default config | safe — verified, no change needed |

All families are now registered; all nine behavioral cases verify correct
(victims preserved, intra-family conflicts dedupe last-wins).
**Maintenance rule (written into utils.ts):** a new custom key in
`tailwind.config.ts` must be registered in the matching classGroup in the same
commit.

## 2. The truth instrument — `web/scripts/dom-truth.mjs` (`npm run dom-truth`)

CI-shaped: production build → headless battery → PASS/FAIL table → non-zero
exit on any violation. **39 checks, 0 failures on the fixed build.**
Expectations are derived, never hardcoded: font sizes/line-heights parsed from
`tailwind.config.ts`; prose heading sizes parsed from `globals.css`; colors
resolved from the CSS custom properties at runtime and compared to computed
element color; spacing from the 8-pt grid rule (TOKENS.md §3). The battery
covers the full U1 measured table, the code-verified victims (eyebrows both
tones, stems, choice rows, step indicator, figcaption, "Ouvrir" row), two
regression tripwires that were always green (prose h2, items h2), the two
de-jargon guards, and a representative padding check.
Known gap (TODO in file): post-answer states (`<summary>`, correctness rows)
need one driven interaction — battery v2.

## 3. De-jargon (dispatched Day-5 items, moved up)

- `content/pc/rlc-serie/lesson.md` — R8 heading is now "Exercice de type bac";
  the à-sourcer status moved to an HTML comment beside it (renders nothing;
  the C2 sourcing DEBT remains in-file for authors and in spec.md — not
  deleted). dom-truth guards against authoring flags re-rendering.
- `MarginRail.tsx` — resting labels are now the human section names
  ("Accroche", "Le mécanisme", …), derived by cutting the title at " : " /
  " (". R-codes no longer render anywhere in the rail (kept internally for
  anchor matching). Full title on hover/`title`. The expanded rail column
  widened 64→176px to hold words (`globals.css` grid, flagged below); the
  medium rail is dots-only with hover titles.

## 4. Layout-fallout list

**Mechanical breakage found: none.** All three breakpoints × both themes render
without overflow, clipping, or collisions (verified on the post-u1 matrix).
The restored sizes fit because the layouts were designed for them — they had
simply never rendered.

**Taste-level rebalancing for Day 3/4 (deliberately NOT fixed today):**
1. Rail label truncation — 3 of 10 short titles ellipsize at 176px ("Établir
   l'équation diffé…", "R est le frein, pas le m…", "L'entretien des
   oscillat…"). Options: author explicit short labels in content, widen rail,
   or 2-line clamp. (Also: 176px was my mechanical choice — final rail
   proportion is a Day-3 decision.)
2. Rail/scroll-spy lag — now conspicuous with worded labels: "Accroche" stays
   active deep into R1 (pre-existing, audit U7; IntersectionObserver
   thresholds in `MarginRail.tsx:113-130`).
3. Rail top edge does not align optically with the breadcrumb baseline.
4. The in-prose rung tags ("R0" beside section headings) still render — the
   rail is de-jargoned but prose headings keep codes. Keep/replace/drop is a
   Day-3 call (numbered sections "1." might serve wayfinding better).
5. The doubled labels (breadcrumb+eyebrow; home section h2 + card eyebrow) are
   MORE glaring now that both render at designed sizes — U3 unchanged, Day 3.

## 5. Taste pass v1 — first sight of the designed hierarchy

**(a) What the fix resolved on its own.** The notion page now has a real
masthead: 30px/700 serif title clearly above its 22px section headings — the
inversion is gone; the page reads titled. Home went from "wireframe" to
"plain but ordered": 36→18→20→18px hierarchy is legible, cards read as items
under sections. The 404 has an actual display moment. Eyebrows/captions
dropped to their designed 12px, which quiets the chrome — the *proportions*
of the warm-editorial design exist for the first time. A large fraction of
"AI slop" was, as diagnosed, this one bug.

**(b) Taste gaps that remain (Day-3 agenda).** U2 stands — see (c). U3 stands:
doubled labels, card-for-everything, figure-internal bold titles, no shared
spine (wordmark still aligns to nothing; the rail's new width makes the
missing spine more visible). U4 stands: home is still a void with two cards
and no footer; nothing full-bleed anywhere; uniform rhythm. U5 stands: no
footer/anchors/selection/metadata. U6 stands: nothing is primary on home.

**(c) What the restored hierarchy newly reveals.** The 30px masthead,
actually rendering, **confirms U2**: it titles the page but it is not a
*moment* — over a 5,000-word lesson it reads like a section label with an
eyebrow, not like the front door of a chapter. The gap to "Google-great" is
now clearly *scale drama + masthead treatment* (band, metadata line, space),
not typographic discipline — the discipline is real and now visible. Second
revelation: with words in the rail, the page suddenly has *navigation
character* — and it makes the missing footer/metadata layer feel more absent,
not less. Third: at 36px, home's "Notions" title exposes how little else the
page offers — the void is now unmistakably a *content* problem (U6/periphery),
not a rendering one.

## 6. Ledger (owner decisions parked, per dispatch)

- None blocking. Day-3 taste decisions queued: display-scale top end; rail
  final width + short-label policy; in-prose rung-tag treatment; which doubled
  label dies (card eyebrow vs section heading); footer contents; home primary
  element.

## 7. Verification state

- `npm run build` clean · `npm run dom-truth` → 39 checks, 0 failures,
  exit 0 · full matrix re-shot to `web/shots/post-u1/` (site + components +
  before/after collages in `compare/`); the pre-fix matrix is preserved
  untouched in `web/shots/site/` and `web/shots/r1/` as "before" evidence.
- No production-touching work; content edit limited to the two dispatched
  de-jargon items; calm core untouched (no new motion, no new accent moments).
