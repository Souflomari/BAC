# Migration summary — Conditional probability item bank (STAGING EVAL)

**Audience:** you (the human gate). This is the plain-language account of
what the prepared migration does and why, framed as product/pedagogy
impact — not a line-by-line code review. You authorize the push as a
decision ("the branch-test is green, proceed"), informed by this summary
and the machinery's verdict.

**File it describes:**
`content/maths/probabilites-conditionnelles/staging-migration/001_eval_items_conditional_probability.sql`

---

## The one critical caveat, up front

**No branch-test was run, and nothing touched any database.** I have no
Supabase CLI, no PowerShell, and no connection to production or staging
in this environment — by design for this eval. So this file is *prepared*,
not *validated against a live database*. **You must run
`scripts/branch-test.ps1` against the staging project and see it exit
clean before this is applied anywhere.** Until then, treat it as a draft.

This is also a **disposable, staging-only eval file.** It lives outside
the real `backend/supabase/migrations/` history on purpose, because our
production-sync state is still unverified after the dormancy, and slipping
an eval file into the numbered history could disturb that. It is a proof
that the item bank *can* land cleanly in the right shape — not the real
landing.

---

## What it puts into the database

Two things, both for the SMA conditional-probability skill
(`sma_prob_conditionnelle`):

1. **The 8 misconceptions** — the diagnostic spine of the notion. These
   are the eight specific wrong mental models a student can hold about
   conditional probability (e.g. "P(A|B) and P(B|A) are the same thing,"
   "independent means the events can't happen together," "you add along a
   tree branch instead of multiplying," "you divide by the wrong thing
   when reading a tree backwards"). Each is stored with its French label,
   a description of the wrong model, the principle it violates, and a
   worked distinguishing example — the full shape the diagnosis engine
   expects.

2. **The 24 practice questions** — three per misconception. Each question
   is built so that picking a specific wrong answer reveals a specific
   misconception. That tagging is what turns a wrong answer into a
   *diagnosis* ("this student thinks independence means no overlap")
   rather than just a wrong mark. Three-per-misconception is the agreed
   floor below which a diagnosis isn't trustworthy.

Why this matters for the product: this is the raw material that lets the
tutor notice *which* misunderstanding a student is running and respond to
it, instead of just saying "wrong, try again." It is the conditional-
probability slice of the misconception-driven tutoring the vision calls
for.

### A note on "dual-tagged" answers

Some misconceptions are cousins — for example, "independent means
overlap is zero" and "independent means you add the probabilities" can
both be reached on the same independence question, just via different
wrong answers. Where one wrong answer is genuinely reachable by more than
one wrong model, it is tagged to *both*. That is intended and pedagogically
honest — it is not a flaw in the questions. The correct answer is never
tagged to any misconception (tagging a correct answer would be a real
defect; none of these do it).

---

## What the safety check inside the migration guarantees

Every migration we ship must prove it actually did what it claims — the
worst failure we have had is a migration that *appears* to succeed while
silently changing nothing. This file ends with a verification block that
**aborts and rolls everything back** unless all of the following are true
afterward:

- **Exactly 8 misconceptions** are on the skill — and they are the *exact
  eight expected ones*, by identity, not just "eight of something."
- Every misconception has the full required shape (label, description,
  the principle it contradicts, the worked example with all its parts).
- **Exactly 24 questions** are on the skill — and they are the *exact 24
  expected ones*, by identity, all attached to the right skill.
- **Each of the 8 misconceptions is covered by at least 3 questions** —
  the trustworthiness floor.
- **No question tags a misconception that doesn't exist** — no dangling
  references.

In plain terms: it checks both *how many* and *which exact ones*, for both
the misconceptions and the questions. A no-op or a half-finished run
cannot pass.

---

## The open issue you should know about (real, not a formality)

**The SMA skill this content belongs on does not exist yet in our real
migration history.** Our curriculum seed built the SMA maths skills for
analysis, derivatives, logarithms, exponentials, sequences, integrals,
differential equations, and complex numbers — but **no SMA probability
topic or skill at all.** There is an older, unprefixed `conditional_prob`
skill, but per our two-parallel-banks decision (ADR 0011) this SMA content
must *not* land on that one — it serves the other stream and carries the
old, untagged questions.

What this means:

- For this **staging eval**, the file safely creates a clearly-fake
  placeholder skill (with obviously-fake "eval" identifiers) *only if* the
  real one is absent — so the proof can run end-to-end on staging without
  inventing a production identity.
- For the **real migration**, this is a genuine blocker: the real SMA
  probability topic and skill must be created and confirmed against the
  live database first, and the placeholder scaffold deleted. I have left
  this as a clearly-marked TODO in the file and have **not** invented any
  production identifier. This is the kind of decision that needs the live
  schema in front of us, after the production-sync check passes — it is
  not something to guess.

---

## What you need to do to apply this (in order)

1. **Run the production-sync check first** (separately — it is out of
   scope for this eval and was not run here). No migration ships until
   that passes.
2. Copy the SQL file into `backend/supabase/migrations/` **only when doing
   the real landing**, renumbered to the next sequential number, and
   resolve the SMA skill-code/UUID reconciliation above (create the real
   SMA probability topic+skill; delete the staging scaffold block). For a
   pure staging dry-run of *this* file as-is, the scaffold lets it run
   self-contained.
3. **Run `scripts/branch-test.ps1` against the staging project.** Confirm
   it exits clean: per-stream/state assertions, RLS checks, and the
   cardinality/identity assertions all green.
4. Only then, with a green branch-test, **authorize the push as a
   decision.** I will not push to production autonomously, and I will not
   push without a green branch-test — both are absolute.

---

## A few honest notes

- **No new RLS surface is created here.** This file only adds content
  (misconceptions and questions) onto tables that already exist and were
  locked down in their own creating migrations. It creates no new
  per-user-state table and no new write-RPC, so there is no new access-
  control grant to set. If the real landing ends up needing a new
  write-path, that is where the service-role-only grant rules apply — not
  here.
- **One small inconsistency in the source items file:** one question
  (the medical-screening reversal item) has a one-letter typo in its
  skill code in `items.yaml` (`sma_prob_conditionnelles`, with a trailing
  "s"). I normalized it to the correct `sma_prob_conditionnelle` when
  landing it, so all 24 questions attach to the same skill. Flagging it so
  the source file can be corrected upstream — I did not edit the item
  file.
- **The pedagogy itself is still pre-validation.** The spec notes the
  notion was authored autonomously and has **not** had your domain-judgment
  pass (the misconception set, the difficulty placement, the Bayes/notation
  scope calls). Landing it on staging for a mechanical proof does not
  substitute for that editorial gate.
```
