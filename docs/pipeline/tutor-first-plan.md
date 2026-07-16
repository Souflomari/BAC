# Tutor-first push — execution plan (2026-07-16)

> **Owner decision (2026-07-16):** emphasis = *make it a tutor first*. The
> engine lane runs NOW. SVT stays frozen for a later push; the
> philosophy-in-Arabic direction is deferred. Everything else follows the
> completion evaluation's recommendations
> (`docs/audits/completion-evaluation-2026-07.md` §8).
>
> **Model routing (owner-directed):** the engine lane's high-judgment work
> (event contracts, payload semantics, wiring, verification design) is done
> by the strongest planning/audit model in this session; later high-volume
> lanes (guided-arc UI, exam-rehearsal surface, SVT content, cleanup) are
> executed by the workhorse model from the briefs this plan defines. This
> matches RULES §5: the risky, subtly-wrong-is-costly work gets the deeper
> model; volume execution gets the fast one.

---

## Lane E — the engine (RUNS NOW)

**Goal:** the adaptive tutor engine goes from *built-but-dark* to
*live-behind-one-owner-sitting*. Everything autonomous lands first, so the
owner-gated cutover is one short, scripted session.

### Ground truth this plan is built on (verified 2026-07-16)

- `learner-model.ts` is pure + unit-tested; `useStudentState()` + the
  dashboard read path are fully wired; `configureEmitter` IS already called
  by the auth provider (`provider.tsx:241`).
- The ONLY missing client piece: `recordAnswerEvent` / `recordChapterVisit`
  have **zero call sites**. `McqItem` / `CheckpointItem` compute correctness
  locally and never emit; no chapter-visit emit exists.
- The emitter (`web/src/lib/events/emitter.ts`) is fire-and-forget, hard
  no-op unless `NEXT_PUBLIC_AUTH_MODE=live` + a real session token; never
  throws into the learning session; page-lifetime-bounded retry only.
- The edge function `record-notion-event` is complete: JWT-verified user id,
  service_role-only RPCs, best-effort exhibition write
  (`is_correct===false && misconception_id`), best-effort clearing check
  (`is_correct===true && item_misconceptions.length>0`, ≥2 distinct correct
  targeting items since last exhibition, restricted by the static
  `item-misconceptions.json` map).
- Draft migrations 048/049/050 have RLS + SELECT-self policies +
  service_role-only write RPCs + self-verify blocks. They live in
  `docs/drafts/migrations/` and are NOT picked up by `supabase db push`
  until promoted.

### Locked contract decisions (E-1 … E-5)

1. **`item_misconceptions` (client-computed)** = the set of non-null
   `misconception` values on the item's own `choices` — EXACTLY the
   definition `build-learner-inputs.mjs` uses for the server-side map
   (`primary_misconception` is NOT consulted; empty array for untagged
   items, e.g. SVT). One shared payload-builder function owns this so the
   definition can never fork between call sites.
2. **`choice_index`** = 0-based index of the chosen choice in the AUTHORED
   choices array (the items.yaml order), independent of the display
   shuffle. Rationale: the file is the source of truth; the rendered order
   is derivable (deterministic shuffle) but the authored index is directly
   reconstructible against content. NULL for `exercise_reveal` (draft-048).
3. **`exercise_reveal` events**: one per question reveal, `item_id` =
   `"<exercise_id>:<question_id>"` (e.g. `r-bac:q3` — globally unambiguous
   within the notion, fits TEXT ≤200, and the fold/read layer treats
   `exercise_reveal` by kind, never by id format). `choice_index`,
   `is_correct`, `misconception_id` all NULL; `item_misconceptions` = [].
4. **`notion_id`** = `"<subject>/<slug>"` — must match the key format of
   `learner-model-data.json` / `item-misconceptions.json` (confirm against
   the generated file at implementation time; one grep).
5. **Context plumbing**: a small client `AttemptEventProvider` mounted in
   `NotionPageView` (around `ChapterShell`, ~line 267) carrying
   `notionId`; a `useAttemptRecorder()` hook combines it with
   `useChapter().current` and returns recorders. Fail-safe: outside the
   provider the hook returns inert no-ops (same philosophy as
   `useChapter()`'s fallback — never throw, never fabricate).

### E1 — wire the write path (autonomous, this session)

- `web/src/lib/events/attempt-context.tsx` (new): provider + hook + the
  single shared payload builder.
- `NotionPageView.tsx`: mount the provider; add a chapter-visit recorder
  (emits on every chapter activation incl. the initial one, with
  `chapters_total` = ChapterShell's total).
- `McqItem.tsx` (`kind:"item"`) and `CheckpointItem.tsx`
  (`kind:"checkpoint"`): emit from `handleSelect` at the moment the answer
  commits — chosen choice's authored index, its `misconception` tag (null
  when absent/correct), `is_correct`, and the item's targets.
- `AttemptFirstExercise.tsx` (`kind:"exercise_reveal"`): emit from the
  reveal commit per locked decision 3.
- **Calm-core invariant:** zero UI change. No new visible element, no state
  read, nothing awaited. The emit is a side effect of an action the student
  already took.

### E2 — verification (autonomous, this session)

- **Unit tests** (`web/scripts/test-attempt-events.mjs`, `node --test`,
  same pattern as `test-learner-model.mjs`): payload-builder semantics
  (targets definition, authored choice_index under shuffle, null field
  rules, reveal composite ids) + an emitter wire-shape round-trip with a
  stubbed `fetch` + stubbed token getter under in-process
  `NEXT_PUBLIC_AUTH_MODE=live` (asserts URL, bearer header, exact JSON body
  against the edge function's validator rules) and the off-mode silence
  (zero fetch calls).
- **dom-truth additions:** (a) off-mode network silence — answer an MCQ in
  the real rendered app while intercepting requests; assert ZERO calls to
  `record-notion-event` (guards the "off build is byte-identical" promise);
  (b) the existing full battery stays green (no visual/behavior drift).
- Full gate: `npm run build` + `node scripts/dom-truth.mjs` +
  `node --test scripts/test-attempt-events.mjs scripts/test-learner-model.mjs`.

### E3 — cutover runbook (autonomous, this session)

`docs/pipeline/engine-cutover-runbook.md`: the owner-sitting script —
S1 production-sync check (existing `production-sync-session.md`, GO/NO-GO)
→ S2 promote drafts 048/049/050 to real numbered migrations + staging +
branch-test + edge deploy + the staging e2e transcript (signup → wrong
answer ×2 on a tagged distractor → misconception Active → 2 distinct
correct → Cleared → dashboard `data-state-source` + NextUp predicate) →
S3 Vercel envs (service_role NEVER in Vercel) + explicit authorization +
prod push + smoke. Mode B throughout: the container cannot reach Supabase;
the owner executes prepared statements/scripts, the session verifies
outputs.

### Lane E acceptance

- [ ] All four call sites emit; payload builder unit-proven against the
      edge validator's exact rules.
- [ ] Off-mode: dom-truth proves zero emitter traffic; build byte-behavior
      identical (existing battery green).
- [ ] `build-learner-inputs.mjs` re-run; generated map fresh at HEAD.
- [ ] Runbook committed; RC-6/P5 task remains the owner-gated tail.

---

## After the engine (defined, not started — workhorse-model lanes)

- **Lane G — guided arc + edge engagement** (post-cutover; needs real
  state): the planned "today's session" arc, mastery map filling in,
  milestone/streak periphery per DESIGN-BIBLE §8 — reward real progress
  only, calm core untouched.
- **Lane X — exam rehearsal**: full-paper assembly from the verified sujets
  banks + timed surface (periphery, never inside a lesson) + self-scoring
  against the transcribed barème. Spec-first (RULES: spec lands before
  code).
- **Lane C — integrity cleanup** (any time, low risk): tag the 2 untagged
  PC item files; philo secondary-source upgrades where official scans are
  reachable; length-tell calibration pass (philo 8%, PC 53%, maths 36% →
  25-35% band); delete stale Flutter-era `GO_LIVE.md`.
- **Owner dockets** (sittings, not sessions): cadre validation ×3
  (maths/philo/svt) incl. the SExp exclusion question and the 2 philo
  scope exceptions; the SVT unfreeze decision (opens the SVT push); the
  philosophy-in-Arabic direction (deferred by owner decision 2026-07-16).

## Deferred by explicit owner decision (2026-07-16)

- **SVT full build** (sujets bank, document-based raisonnement exercise
  type, 11 conversions, tagging) — a later push.
- **Philosophy Arabic-composition training** (+ AR/RTL) — later decision.

---

## Execution log

- _(maintained per step: date, what, sha)_
