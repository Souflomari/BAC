# DASHBOARD-V2-SPEC — le tableau de bord devient le visage du tuteur

> **What.** Lane G of `docs/pipeline/mastery-push-plan.md`. Owner finding
> (first live editorial pass, 2026-07-23): *"just a bar showing
> advancement — the whole is not developed enough."* This spec EXTENDS
> `DASHBOARD-SPEC.md` (v1 anatomy + the StudentState contract stay in
> force) and consumes the now-LIVE engine (learner-model, journal,
> misconception states). Authority: VISION (« guided-primary », « knows
> the student », engagement at the edges only) → DESIGN-BIBLE §7/§8 →
> DASHBOARD-SPEC v1 → this file. Spec gates with the owner BEFORE build.

## 1. The guided session arc (replaces the single SessionCard pointer)

The front door becomes a PLANNED SEQUENCE of 2–4 steps, each a quiet card
in one column — the tutor's plan for today, with the WHY always stated:

1. **Reprise** (present only when a misconception is Active): « Tu avais
   confondu ⟨label from items.yaml misconceptions[].label⟩ — on la
   retraite d'abord. » → deep-link to the notion/chapter that taught it.
2. **Continuer / Nouveau**: the in-progress notion (« entamé ») or the
   next parcours notion — « Reprends au chapitre 4 » / « Nouvelle
   notion : ⟨title⟩ ».
3. **Pratiquer** (present when the current notion has bank entries —
   BANK-SPEC): « 2 sujets du bac t'attendent sur ⟨notion⟩ » → the
   S'entraîner chapter.
4. **Réviser** (present when a notion is « à revoir » per the 21-day
   rule): « Ça fait ⟨n⟩ jours — un passage rapide sur ⟨notion⟩. »

Rules: max 4 steps, at least 1 (parcours fallback — today's behavior);
priority order exactly as numbered (mirrors nextUpRecommendation's ladder,
extended with Pratiquer); ONE primary action still (`data-primary-action`
on step 1's CTA only — v1 invariant §5 holds); free roam untouched below
the arc; steps carry `data-arc-step="reprise|continuer|pratiquer|reviser"`
for dom-truth. All copy states the reason — the arc must read as a tutor
who knows you, never as a generic checklist. Signed-out/off-mode: the arc
collapses to today's zero-state card exactly (byte-identical rendering —
honest-state).

## 2. Mastery map v2

- v1's per-notion token grid stays; ADD per-unit grouping headers with an
  honest state summary per unit (« 3 lu · 1 exercé · 8 non ouverts » —
  counts, never %).
- Per-notion popover on click (calm, no route change): the five-state
  label, last visit (« il y a 3 jours »), items answered/correct counts,
  bank progress (« sujets faits : 1/4 » when a bank exists), active
  misconception labels if any. Every number from StudentState/journal —
  nothing computed client-side beyond display.
- « exercé » definition unchanged (learner-model); bank reveals already
  feed it.

## 3. Practice-aware progress (needs BANK-SPEC live)

SubjectProgress's fact-line gains the exercise dimension: « Maths — 3
notions lues · 5 sujets du bac faits ». Counts from the journal
(`exercise_reveal` distinct entry ids ∩ bank ids). Absent (not zero) when
no banks exist for the subject yet — honest absence rule.

## 4. Milestones + streak (DESIGN-BIBLE §8 — edges only, real progress only)

- **Milestones** (MilestoneSlot finally renders): first notion « exercé »,
  first misconception Cleared, first bank sujet done, each notion reaching
  « exercé ». One quiet card on the dashboard when NEWLY earned (since
  last dashboard visit), then it lives in /moi's history. No confetti; a
  calm sentence: « Première notion exercée — Probabilités. » Derived
  entirely from the journal (no new tables): earned = state exists,
  newly = since the previous dashboard read (client compares against a
  `lastSeenAt` it reads from the journal's latest dashboard-visit… NO —
  no fabricated client memory: v1 rule. Instead: « newly earned » =
  earned within the last 7 days by timestamps already in the data.
  Simple, honest, stateless).
- **Streak**: « ⟨n⟩ jours d'étude cette semaine » computed from journal
  event days — a FACT, not a compulsion loop: no fire emoji, no « don't
  break it » framing, no notifications. Renders only with ≥2 days.
- Both live ONLY on the dashboard/periphery — never inside a lesson
  (calm-core; dom-truth's in-lesson vocabulary guard already bans it).

## 5. /moi — the account page (middleware already reserves the route)

One column, calm: identity (email, filière picker — same control as
onboarding), per-subject diagnostic detail (the mastery map v2 popover
data, expanded, misconceptions Active/Cleared history per notion),
milestone history, sign-out. No settings soup — only what exists. Auth
required (redirect to /connexion when signed out — middleware pattern).

## 6. Freshness

`useStudentState` refetches on window focus and on route return to `/`
(today: fetch-once). Debounced ≥30s. No polling, no websockets — a
focus-refetch is enough for the « I studied, the dashboard noticed »
feel the owner missed.

## 7. Harness (same-commit with the build)

dom-truth additions: arc anatomy (≤4 steps, exactly one
data-primary-action, step order matches the priority ladder given seeded
state is impossible off-mode — so assert the OFF-mode collapse is
byte-identical to v1's zero-state, plus the data-arc-step vocabulary
guard); milestone/streak vocabulary BANNED inside `.notion-content`
(extend the existing guard lexicon); /moi off-mode redirect; popover
honest-state (no %, no fabricated numbers — the existing vocabulary guard
covers it, extend to the popover surface).

## 8. Out of scope (stays deferred)

Bac-readiness % (banned by honest-state until a defensible model exists);
notifications/email; social; adaptive re-explanation; exam mode (B4).

## Retraits et corrections

_(append-only)_
