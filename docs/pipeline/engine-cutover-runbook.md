# Engine cutover — the owner-sitting runbook (Lane E, tutor-first push)

> **What this is.** The script for taking the adaptive tutor engine from
> *built-and-wired-but-dark* to *live*, in three owner-synchronous sittings.
> Written 2026-07-16, after the autonomous half landed (client write-path
> wired at all four surfaces, payload semantics unit-proven, off-mode
> network silence guarded in dom-truth — see
> `docs/pipeline/tutor-first-plan.md` Lane E).
>
> **Mode B throughout** (probed + ledgered): this session's container cannot
> reach Supabase over raw TCP. The owner executes the prepared statements/
> commands on their machine; the session verifies outputs. **Every
> production-safety non-negotiable in `docs/Rules/RULES.md` §3 applies** —
> nothing here overrides the human gate; this document only makes the
> gated path efficient.

---

## What is already true (verified, so the sittings don't re-litigate it)

- Client: `configureEmitter` wired in the auth provider; all four emit
  surfaces live (`McqItem`, `CheckpointItem`, `AttemptFirstExercise`
  reveal, `ChapterVisitRecorder`); payloads built by one shared module
  (`web/src/lib/events/payload.ts`) whose semantics are unit-tested against
  the edge validator's exact rules (`npm run test-attempt-events`, 12/12).
- Off/mock builds are byte-behavior identical: emitter hard-gated;
  dom-truth sweep proves zero emitter traffic across all answer surfaces.
- Read layer: `learner-model.ts` unit-tested; `useStudentState()` +
  dashboard components consume the real `StudentState` contract already.
- Backend design: drafts 048 (event journal + progress fold + RPCs), 049
  (notion misconception states + RPCs), 050 (auth→profile trigger) with
  RLS, SELECT-self-only policies, service_role-only write grants, and
  self-verify blocks. Edge fn `record-notion-event` complete;
  `item-misconceptions.json` regenerated fresh (48 notions with coverage).
- Prod migrations run 001–047 (gaps 019/035 intentional). Next numbers:
  **048, 049, 050**.

## Sitting 1 — production-sync check + staging revival (~30–40 min, read-only)

1. Owner un-pauses/restores **staging** (`miscjaztsputtdalwcjp`) from the
   Supabase dashboard (it was unreachable at the 07-11 probe — likely
   paused).
2. Run `docs/pipeline/production-sync-session.md` sections A–D **verbatim**
   against **prod** (`iwoydyudjondihzzsqay`): migration bijection 001–047,
   RLS/grants sample, the 201 prereq edges, the staging trigger gap,
   orphans. Read-only throughout.
3. Verdict: **GO** lifts the "production sync UNVERIFIED" flag (CLAUDE.md
   non-negotiable) → Sitting 2 may proceed. **NO-GO** → findings ledgered,
   engine stays dark, nothing else in this runbook runs.
4. Dated compte-rendu → the campaign ledger
   (`docs/audits/remediation-campaign-2026-07.md`, Gate log).

## Sitting 2 — staging: migrate, deploy, prove the loop end-to-end (~1–2 h)

1. **Promote the drafts — DÉJÀ FAIT, ne pas rejouer.** Cette étape était
   « copier `docs/drafts/migrations/draft-048…/049…/050….sql` vers
   `backend/supabase/migrations/` ». La promotion a eu lieu :
   `backend/supabase/migrations/048_user_events_and_notion_progress.sql`,
   `049_user_notion_misconception_states.sql` et
   `050_staging_close_auth_trigger_gap.sql` sont dans l'arbre, et
   `docs/drafts/` n'existe plus. Reprendre à l'étape 2. (Corrigé le
   2026-09-05 : le pas nommait un répertoire disparu, et une étape
   introuvable dans un runbook de bascule PRODUCTION est le pire endroit
   où laisser pourrir un chemin.)
2. Owner applies to **staging**; the migrations' own verify blocks must
   pass (cardinality + grant assertions — they raise on failure).
3. `scripts/branch-test.ps1` green on the owner's machine against staging.
4. Deploy the edge function to staging:
   `supabase functions deploy record-notion-event` (with its regenerated
   `item-misconceptions.json` alongside; set `SUPABASE_SERVICE_ROLE_KEY`
   as a function secret — **never** in any frontend env). Re-link prod
   afterwards if the CLI was linked to staging (the ADR 0005 trap).
5. **Staging e2e — the evidence transcript** (local build with staging env
   + `NEXT_PUBLIC_AUTH_MODE=live` + staging URL/anon key):
   - sign up a throwaway student (draft-050 trigger creates the profile);
   - open a converted notion; navigate chapters → `user_answer_events` /
     `user_notion_progress` rows appear (visit kind);
   - answer the SAME tagged distractor wrong twice →
     `user_notion_misconception_states` row, exhibitions = 2 → dashboard
     shows the misconception ACTIVE (`data-state-source`), NextUp fires
     `misconception-active`;
   - answer 2 DISTINCT items targeting that misconception correctly →
     `cleared_at` set (the edge fn's clearing check) → dashboard reflects
     Cleared;
   - reveal an exercise question → `exercise_reveal` event recorded;
   - delete the throwaway user; capture every step's SQL/UI evidence into
     the ledger.

## Sitting 3 — production authorization (~30 min)

1. Owner reviews the Sitting-2 evidence transcript.
2. Owner applies 048/049/050 to **prod** (same files, verify blocks pass);
   deploys the edge function to prod.
3. Vercel env vars: `NEXT_PUBLIC_AUTH_MODE=live`,
   `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   **`SUPABASE_SERVICE_ROLE_KEY` never goes to Vercel** — it lives only as
   a Supabase function secret.
4. Explicit owner authorization → deploy → smoke: sign-up, one answer, one
   dashboard read on the deployed site.
5. Compte-rendu → ledger; flip RC-6/P5 to done; the guided-arc lane
   (tutor-first plan, Lane G) is now unblocked.

## Rollback (any sitting)

The frontend is dark-by-default: removing `NEXT_PUBLIC_AUTH_MODE=live`
from Vercel returns the app to today's off build (emitter silent, dashboard
zero-state) with **no migration rollback needed** — the tables simply stop
receiving traffic. Migrations are append-only history and are NOT reverted
(RULES §3); a NO-GO after Sitting 2 just leaves staging ahead of prod,
which is the normal state between sittings.
