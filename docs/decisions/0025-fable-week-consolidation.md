# ADR 0025 — The Fable week: consolidated decisions (2026-06-27 → 07-03)

**Status:** accepted (owner-dispatched sprint; taste calls remain
FABLE-DECIDED / OWNER-REVIEW-PENDING as itemized in
`docs/audits/fable-day3-ledger.md` §3/§7).
**Context:** a one-week sprint on a frontier model (session pinned to
`claude-fable-5`) with a hard end date, dispatched day-by-day by the owner,
under two standing constraints: everything must outlive the week
(maintainable by standard models cold), and RULES.md's production gate holds
absolutely (no production-touching work happened; none did).

This ADR consolidates the week's decisions in one place. Detail lives in the
amended canon docs; this is the index and the reasoning of record.

## 1. Diagnosis before change (Day 1)

`docs/audits/fable-ui-content-audit.md` — the owner's "AI slop" verdict was
decomposed into findings U1–U8 (UI) and C1–C6 (content), each tagged
[ENCODABLE] or [TASTE]. The audit's core discovery: the entire type
hierarchy rendered at 16px because tailwind-merge silently deleted
unregistered custom `text-*` keys (U1) — while every prior audit cited
source classes as evidence (U8). Those two findings shaped the week's
epistemology: rendered truth only, and self-granted validation is not
validation.

## 2. Decisions of record

1. **The U1 rule.** Custom Tailwind keys register in `cn()`'s
   `extendTailwindMerge` classGroups in the same commit
   (`web/src/lib/utils.ts`). Bible §13.
2. **Rendered truth + the instrument** (bible §13; Day 4). Visual claims
   only from rendered DOM. `web/scripts/dom-truth.mjs` is the standing
   battery: expectations DERIVED from token sources (self-syncing, never
   hardcoded), unique-port hardened, exit-code CI-shaped.
3. **Deployed truth** (§13; Day 5). A push/CI/platform-Ready event is not
   deployment evidence; the language is "pushed, deployment unverified."
   Applied inward too: an issued edit is not an applied change.
4. **Guards target classes, not instances** (§13; July-2026 external-audit
   amendment). Born from the authoring-comment leak: instance-guards ran
   green while the class failed. See §4 below.
5. **Page anatomy** (bible §11; Day 4): the PageShell spine; masthead band
   (A3, display-lg 56px tier — restraint governs COUNT, not size); every
   page ends (footer C1); LessonEnd session-close; honest-state home (B1);
   no doubled labels; no internal vocabulary student-side; full-bleed = the
   band only. Build specs: `docs/design/PAGE-ANATOMY-SPECS.md` (tightened
   twice by the Day-7 portability loop).
6. **Web-native texture** (bible §12; Day 4): themed selection, heading
   anchors, computable-facts metadata line.
7. **The honest-state rule** (Day 4): no fabricated progress, sourcing, or
   student knowledge, ever. `SessionState` contract in `lib/session.ts`;
   resume/progress render only from real persisted state (which does not
   exist yet — production-lane, human-gated). dom-truth guards the absence.
8. **Content grammars** (Day 5): template v2 with measurable per-rung boxes
   (`docs/pipeline/NOTION-TEMPLATE-V2.md`); attempt-first summit
   (`AttemptFirstExercise` — reasoning NEVER in DOM pre-commit); the R0
   commit-checkpoint hook pattern; exemplars in
   `docs/pipeline/EXEMPLARS.md`. R8 bac sourcing remains BLOCKING-open:
   `sourcing.status: unsourced` = notion not done. Nothing was faked.
9. **Richness systems** (Day 6): the `Derivation` component (learner-paced
   stepped math; steps beyond current NOT in DOM); display-math discipline
   (role-based component-vs-narrated boundary, tightened Day 7); COVER-SPEC
   + the coded cover set (one motif, figure palette, dark by construction,
   data-cover/data-motif pair); motion-decision rule (dynamic rung → beat
   engine or recorded static-suffices); followability ordinals + rung
   boundary rhythm; `fill` verb single-shot engine constraint
   (MOTION-CHOREOGRAPHY.md).
10. **The portability protocol** (Day 7): dispatch briefs point at governing
    docs and machine acceptance rows, state prerequisite assumptions, and
    never restate specs (`docs/pipeline/day7-briefs/README.md`). The
    spec-tightening loop demonstrably converges (two passes: 7 divergences
    → rhythm-level micro-choices). Eleven spec bugs found by cold executors
    were closed same-day. `web/src/lib/subjects.ts` became the one home of
    subject labels after both cold runs flagged (and one reproduced) the
    duplication drift.
11. **Chrome preferences may persist locally** (July-2026): the theme
    toggle stores an explicit device preference (localStorage). This does
    NOT touch the honest-state rule, which governs learning state; the
    FontSizeStepper's non-persistence is now recorded debt, not a rule.

## 3. The executor-honesty record

The Day-7 test ran on the harness's `sonnet` alias (documented as Sonnet 5);
no Sonnet 4.8 ID exists in the environment. Verdicts say "sonnet-alias,
cold." A newer executor makes the test easier; the claim is calibrated
accordingly. (Ledger §7.)

## 4. The external-audit event (July 2026) and what it changed

An independent design audit of the deployed preview
(`docs/audits/external-design-audit-2026-07.md`) corroborated the week's
direction (editorial voice/pedagogy rated at/above the SOTA references; the
A3 masthead praised as deployed) and found what the in-repo instruments
could not:

- **Internal authoring text rendered student-visible — five fragments, two
  mechanisms** (the audit said three; measurement found five): four HTML
  comments (react-markdown v9 hardcodes `allowDangerousHtml` and, with
  `skipHtml` unset, replaces raw nodes with their literal text —
  `node_modules/react-markdown/lib/index.js:355-361`; the "enhancement-slot
  comment" convention was never render-safe) plus one *authored* italic
  note in the maths ramp table ("Questions à sourcer…" — ordinary markdown,
  no comment involved). Fix: `stripAuthoringComments` at the loader
  (annotation cannot render by construction — also immune to the latent
  comment-straddles-marker segmentation hazard) + the authored note edited
  out + the class guard (no authoring lexicon, any page, case-aware) +
  template §E rule.
- **The dom-truth notText guards were 60-characters deep** — discovered
  while writing the class guard; all notText assertions now test full text.
- **"Verified both themes" was true of a harness-forced state**: the shots
  harness toggled the `.dark` class manually; no user-facing control
  existed. Fix: the theme toggle (OS default + persisted explicit choice,
  no-flash), and the §13 three-legs rule.
- Measured finishing defects (prose measure, contrast, head metadata,
  breadcrumb title, math accessibility) — fixed and instrumented per the
  final-batch report in the ledger.

The lesson is structural, not incidental: **every instrument sees only what
it was told to see.** The QA loop is therefore three-legged — dom-truth
(mechanical), gestalt vs named references (taste), periodic external
fresh-eye audit of the deployed site (novelty + user-reachable truth).

## Retractions and Corrections

- The Day-4 "dom-truth hardened" claim was false when made (ledger §5
  correction); re-applied for real on Day 5. This incident produced the
  deployed-truth clause.
- The week's "both themes verified" claims (Days 4–7) were true of the CSS
  and of harness-forced renders, not of any user-reachable state, until the
  theme toggle shipped in the final batch. The screenshots themselves
  remain valid evidence of the dark token set.
