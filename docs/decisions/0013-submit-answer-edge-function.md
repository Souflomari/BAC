# ADR 0013 — submit-answer misconception write path + edge-function assurance

**Status.** Accepted, 2026-05-18.
**Owner.** learner-model (accumulation contract + FK round-trip),
supabase-architect (RPC shape + service_role boundary + the assurance
mechanism), bac-curriculum (existence-validation read + deprecation
forward rule).
**Related.**
- [ADR 0005](0005-branch-test-workflow.md) — established the
  branch-test workflow for migrations. This ADR establishes the
  parallel for edge functions.
- [ADR 0007](0007-misconception-schema.md) — defined the misconception
  schema this write path populates.
- [ADR 0011](0011-distractor-tagging-strategy.md) — caught the FK
  semantic mismatch this function structurally avoids.
- [ADR 0012](0012-misconception-items-sma-limit-calc.md) — items the
  function tags now feed real diagnostic events through.
- [`backend/supabase/migrations/047_rpc_record_misconception_exhibited.sql`](backend/supabase/migrations/047_rpc_record_misconception_exhibited.sql)
- [`backend/supabase/functions/_shared/misconception_event.ts`](backend/supabase/functions/_shared/misconception_event.ts)
  + [`_test.ts`](backend/supabase/functions/_shared/misconception_event_test.ts)
- [`backend/supabase/functions/submit-answer/index.ts`](backend/supabase/functions/submit-answer/index.ts)
- [`scripts/edge-function-smoke-test.ps1`](scripts/edge-function-smoke-test.ps1)

---

## Context

Step 4 (final) of the misconception slice — the write path that closes
the pipeline behaviorally. Until this PR the misconception schema, the
items, and the JSONB tagging all existed; nothing wrote to
`user_misconception_states`. ADR 0011 caught a load-bearing structural
bug at the planning stage (the FK semantic mismatch). ADR 0012 closed
that gap by attaching items to `sma_limit_calc` directly. This PR
exercises the round trip behaviorally for the first time.

It also introduces a new piece of project infrastructure on the scale
of the branch-test workflow: **`scripts/edge-function-smoke-test.ps1`**,
the assurance mechanism for edge functions. There is no `DO $verify$`
for edge code; that gap is what this script closes.

## Decision A — RPC shape (supabase-architect §1)

A new RPC `public.record_misconception_exhibited(p_user_id UUID,
p_skill_id UUID, p_misconception_id TEXT) RETURNS VOID` ships as
**migration 047**. Atomic upsert, `SECURITY DEFINER`, granted ONLY to
`service_role` — explicitly NOT to `authenticated` (unlike the
existing counter RPCs in migration 005). The grant restriction is
load-bearing: if `authenticated` had EXECUTE, any logged-in user could
inflate their own `exhibited_count` arbitrarily by calling the RPC
directly with a synthesized `misconception_id`. With the grant
restricted to `service_role`, the edge function is the sole write
surface, and the edge function does the existence validation on
`skills.common_misconceptions[].id`.

Body of the RPC:

```sql
INSERT INTO public.user_misconception_states (
  user_id, skill_id, misconception_id,
  exhibited_count, first_exhibited_at, last_exhibited_at
) VALUES (
  p_user_id, p_skill_id, p_misconception_id, 1, NOW(), NOW()
)
ON CONFLICT (user_id, skill_id, misconception_id) DO UPDATE
  SET exhibited_count   = public.user_misconception_states.exhibited_count + 1,
      last_exhibited_at = NOW();
-- first_exhibited_at intentionally NOT in the DO UPDATE clause.
-- updated_at auto-bumped by the existing trigger (migration 043).
```

This is the atomic-counter idiom this codebase already uses for
`increment_xp`, `update_session_stats`, `upsert_daily_activity`
(migration 005). Atomicity matters because concurrent submissions for
the same (user, skill, misconception) would race against a
read-modify-write upsert; `ON CONFLICT … DO UPDATE SET col = col + 1`
serializes correctly.

## Decision B — Accumulation contract (learner-model §1, §2)

**On a wrong answer matching a tagged distractor: `(a) increment` +
bump `last_exhibited_at`.** Each event counted; no debounce in v1.
`first_exhibited_at` set once on INSERT, never touched on conflict.

**On a correct answer at a misconception-tagged item: `(d) skip in
v1` — write nothing.** ADR 0011's resolution floor (3 consecutive
correct answers on tagged items, no lapse) cannot be evaluated at v1's
1-item-per-misconception coverage; building the counter machinery now
would write state that cannot be correctly interpreted. The Active /
Cleared / Unassessed output contract (now a hard rule in
`.claude/agents/learner-model.md`) already classifies "no resolution
evidence" as Unassessed.

**The function writes raw exhibition events; it does not classify.**
Active / Cleared / Unassessed is the read layer's job. The function
must not pre-empt it by collapsing "no row" into "no misconception"
or setting `resolved_at` based on its own threshold logic.

## Decision C — Validation reads (bac-curriculum §1, §2, §3)

**Canonical existence check:** `skills.common_misconceptions[].id` —
scan the JSONB array on the parent skill row, search by `.id` equality.
No denormalized table. The validation is the only structural guard
between `items.distractor_misconceptions` and
`user_misconception_states.misconception_id` because neither column
has a database-level FK to a misconception registry. ADR 0007 chose
this trade — schema simplicity over referential integrity — and the
edge function shoulders the integrity guard at the application layer.

**Forward rule for `deprecated_at`:** when a misconception entry's
`deprecated_at` is non-null (future migration; field not yet present),
the function SKIPS the write and emits a structured `warn`-level log
with payload `{event: 'misconception_tag_deprecated', item_id,
skill_id, candidate_misconception_id, chosen_choice_index}`.
Deprecation at the taxonomy level silences runtime accumulation; the
item's stale tag becomes an authoring debt issue, not a reason to
keep writing.

**Phantom-tag log payload** (when validation fails — the typo / stale
tag scenario):

```jsonc
{
  "event": "misconception_tag_phantom",
  "item_id": "<uuid>",
  "skill_id": "<uuid>",
  "candidate_misconception_id": "<string>",
  "chosen_choice_index": <0..3>,
  "session_id": "<opaque>"
}
```

No `user_id` — PII. `session_id` is sufficient correlation for any
support escalation.

## Decision D — Dual-client pattern (supabase-architect §2)

Keep the existing `submit-answer` structure: a `userClient` with the
forwarded JWT for identity + RLS-gated reads. Add an `adminClient`
(`service_role`) **scoped narrowly to the misconception RPC call
only**. Mirror of `delete-self-account/index.ts`'s pattern.

Rejected:
- **Whole function as service_role** — bypasses RLS on the unrelated
  reads (`user_skill_states`, `items`, `user_item_history`); a future
  bug passing a malformed `user.id` from the request body would silently
  return another user's data.
- **Separate edge function** — would require a second network round-
  trip on every answer submission, duplicating the item-skill-context
  payload over the wire.

`user.id` comes from `userClient.auth.getUser()` — JWT-verified, NOT
body-derived. The body never overrides the identity the function
writes for. Same security boundary as `delete-self-account`.

## Decision E — Edge-function assurance mechanism (the load-bearing
question)

**Option (D) — Hybrid: unit tests + integration smoke test.** This
becomes the convention for every future edge function the way
`scripts/branch-test.ps1` became the convention for migrations.

### E.1 Unit tests — `_shared/<name>.ts` + `_shared/<name>_test.ts`

Pure decision logic is extracted from the edge function and tested
with `deno test`. The convention exists already
(`_shared/srs.ts` + `_shared/srs_test.ts`); this ADR adds
`_shared/misconception_event.ts` and its 18-test sibling. Covers what
unit tests can: index-to-misconception mapping, phantom-tag detection,
skill-mismatch detection, deprecated-entry handling, choice-range
validation, wire-format tolerance.

Runs in 23ms; no network. Catches algorithmic bugs in CI-friendly
time. **Required before deploy** — the smoke test's first step is a
Deno-test gate (option A as a hard precondition for option C).

### E.2 Integration smoke test — `scripts/edge-function-smoke-test.ps1`

End-to-end verification against staging. Provisions a fresh test
user, mints a real JWT, invokes the deployed function, asserts state
changes via service_role REST (bypassing RLS), unconditionally cleans
up.

**Test-user lifecycle** (mirrors `branch-test.ps1`'s finally-cleanup
pattern):

```
admin.auth.createUser({email:'edge-smoke-<ts>-a@bacprep.internal', email_confirm:true})
↓
INSERT INTO public.profiles (id=<user_id>) — see "trigger gap" below
↓
auth.token (grant_type=password) → JWT
↓
POST /functions/v1/<name> with the JWT
↓
[assertions via service_role REST]
↓
finally: admin.auth.deleteUser(user_id)
  // CASCADE on profiles.id wipes all dependent rows
  // (user_skill_states, user_misconception_states, etc.)
```

**The six post-invoke assertions:**

| # | What | Verifies |
|---|---|---|
| A1 | First wrong distractor → INSERT a state row, `exhibited_count = 1`, both timestamps set | Insert path works |
| A2 | Second wrong distractor → `exhibited_count = 2`, `first_exhibited_at` unchanged, `last_exhibited_at` advances | Atomicity + accumulation contract |
| A3 | Correct answer → no new row, existing counters unchanged | v1 resolution-deferred contract |
| A4 | Wrong on a different misconception's item → separate state row, prior unchanged | Multi-misconception isolation |
| A5 | Owner JWT reads own state rows | RLS SELECT policy on `auth.uid() = user_id` |
| A6 | Second user's JWT reads zero of first user's rows | RLS isolation across users |

**Plus the FK round-trip check** (learner-model §3):

```sql
-- via PostgREST embed
SELECT misconception_id, exhibited_count, skill:skill_id(code)
FROM user_misconception_states
WHERE user_id = <test_user> AND resolved_at IS NULL;
```

Expected: rows joined to `skills.code = 'sma_limit_calc'`. This is the
behavioral version of the structural check that ADR 0011 caught.

**Runtime: ~9 seconds end-to-end.**

### E.3 The trigger-gap finding (caught by the smoke test on first run)

The first smoke-test run failed on A1 with FK violation
`user_misconception_states_user_id_fkey`. Investigation: staging is
missing the `on_auth_user_created` trigger that auto-inserts a
`profiles` row on `auth.users` INSERT. The ADR 0005 staging bootstrap
used `pg_dump -n public -n supabase_migrations` — the trigger lives on
`auth.users` (in the `auth` schema) and was never dumped. The trigger
function `public.handle_new_user` was dumped (it's in public); only
the binding to auth.users was lost.

**Fix scope:** the smoke test now explicitly inserts a profiles row
after `admin.createUser` (`INSERT INTO public.profiles (id = <uid>) ON
CONFLICT DO NOTHING`). The smoke test's setup compensates for the
staging-specific gap; the gap itself is documented but not closed in
this PR (a separate migration could re-create the trigger on staging,
but that's a one-time cleanup orthogonal to the function).

**Prod is unaffected** — the trigger exists there. The smoke test
guards `Target=prod` to read-only assertions, so the profile-insert
workaround never runs against prod data anyway.

**This is exactly what the smoke test exists to catch.** A unit test
would never have surfaced this. The hybrid pyramid earned its keep on
its first real-use firing.

### E.4 What this means for future edge functions

For every edge function this codebase ships from now on:

1. Extract pure decision logic into `backend/supabase/functions/_shared/<name>.ts`.
2. Write `_shared/<name>_test.ts` with Deno tests covering the
   decision space.
3. Add an assertion block to `scripts/edge-function-smoke-test.ps1`
   (or a per-function script if the assertions become too divergent;
   defer that decision until a 2nd edge function actually needs it).
4. The smoke test's `Target=prod` mode runs read-only assertions only;
   the write-side assertions run against staging exclusively.
5. CLI must end re-linked to the project it started linked to
   (mirror `branch-test.ps1`'s discipline).

## What landed (the four artifacts)

| File | Role |
|---|---|
| `backend/supabase/migrations/047_rpc_record_misconception_exhibited.sql` | The RPC + grant matrix + verify block |
| `backend/supabase/functions/_shared/misconception_event.ts` | Pure decision logic |
| `backend/supabase/functions/_shared/misconception_event_test.ts` | 18 Deno unit tests, all green |
| `backend/supabase/functions/submit-answer/index.ts` | Extended with adminClient + misconception write |
| `scripts/edge-function-smoke-test.ps1` | The assurance mechanism — 6 assertions + FK round-trip |

## Branch-test result

Migration 047:
```
.audit-logs/branch-test-20260518-125928.log
EXIT 0, 11/11 checks, ~12s
Verify NOTICE: record_misconception_exhibited(UUID, UUID, TEXT)
  SECURITY DEFINER, EXECUTE granted to service_role only
  (authenticated/anon/public denied). Migration 043 invariants intact.
  Prereq baseline unchanged.
```

## Smoke-test result — first real-use firing

```
.audit-logs/edge-smoke-20260518-140307.log
EXIT 0, 6 assertions + FK round-trip, ~9s

A1: exhibited_count=1; first=2026-05-18T12:03:12.782845+00:00; last=2026-05-18T12:03:12.782845+00:00
A2: exhibited_count=2; first=unchanged; last=advanced
A3: exhibited_count unchanged at 2 across correct submission
A4: M3 row created (count=1); M1 row unchanged (count=2)
A5: user1 sees 2 of its own rows via authenticated JWT
A6: user2 sees 0 rows of user1's state (RLS isolation OK)
FK round-trip: 2 unresolved misconception rows for user1 on
  sma_limit_calc (joined via skill.code)
```

The atomic-counter idiom in the RPC produced the right monotonicity
(A1 → A2: 1 → 2, `first_exhibited_at` unchanged, `last_exhibited_at`
advanced by ~1.8s — the deliberate `Start-Sleep -Seconds 1` between
the two POSTs proved the timestamp delta is real, not just clock noise).

The FK round-trip behavioral check returned the rows ADR 0011 §3
predicted should be findable — the bug ADR 0011 caught at planning
time is now closed both structurally (ADR 0012) AND behaviorally
(this PR).

## Prod deploy

```
Re-linked CLI to prod (iwoydyudjondihzzsqay)
supabase functions deploy submit-answer
→ Deployed Functions on project iwoydyudjondihzzsqay: submit-answer
```

The function on prod now serves real students. The first time a
student picks a misconception-tagged distractor (B or C on M1's item,
B on M2's, B on M3's, B or C on M4's — see ADR 0012's per-item
layout), a state row appears.

## Consequences

- **The misconception pipeline is wired end-to-end** for the four
  authored misconceptions on `sma_limit_calc`. Future scheduler /
  diagnostic UI can read `user_misconception_states` and trust the
  shape.
- **The Active/Cleared/Unassessed contract** (added to learner-model.md
  as a hard rule in ADR 0012's precursors) is now testable — the
  v1's `exhibited_count` floor of 1 maps to a UI sub-state, not to
  "no misconception detected", per learner-model's hard rule.
- **`scripts/edge-function-smoke-test.ps1` is the canonical
  assurance mechanism** for edge functions. Future edge functions
  extend it with their own assertion block. The pattern matches
  `branch-test.ps1`'s status as the migration assurance.
- **The staging trigger gap is documented** but not closed in this PR.
  A future ADR may add a corrective migration that recreates
  `on_auth_user_created` on staging idempotently. Prod is unaffected;
  the workaround in the smoke test (profile-insert with
  ignore-duplicates) is sufficient for write-side assertions.
- **The phantom-tag guard is now a hot code path.** Authoring
  discipline on `items.distractor_misconceptions` becomes critical —
  any typo'd misconception ID will silently drop diagnostic events
  (with a log) rather than write phantom state rows. ADR 0010's
  encoder validates IDs at encode time; bac-curriculum's ID-format
  rule (ADR 0008 §2) helps; the function's runtime guard is the last
  line of defense.

## Pending follow-ups

- [ ] **Staging trigger gap.** Re-create `on_auth_user_created` on
      staging via a small SQL fix-up OR document as a known staging
      delta. Optionally: ship a migration that adds the trigger
      idempotently to BOTH projects (`CREATE TRIGGER IF NOT EXISTS`
      isn't supported; use `DROP IF EXISTS` then `CREATE`).

- [ ] **Resolution path (v2+).** When item coverage reaches the
      3-per-misconception floor (ADR 0011), implement the
      consecutive-correct counter and `resolved_at` write path. Sched-
      uled after `sma_limit_ops` and `sma_asymptotes` authoring lands.

- [ ] **Diagnostic-output contract spec.** The Active / Cleared /
      Unassessed state machine the function feeds into needs a
      concrete output shape for the UI/scheduler to consume. Owner:
      learner-model (the hard rule from ADR 0012 §precursors is the
      contract; the implementation is open).

- [ ] **Edge-function smoke test parameterization.** Today the script
      is submit-answer-specific. The second edge function that ships
      will surface whether to factor common scaffolding (test-user
      lifecycle, JWT mint, cleanup) into a shared module. Decide at
      that point, not now.

- [ ] **`supabase functions logs`** — the CLI version pinned in this
      project doesn't have the logs subcommand. The Management API
      route works; the smoke test's debug field workaround was
      sufficient for this PR but a real `functions logs` flow would be
      cleaner. Tracked as a CLI-upgrade prerequisite.

- [ ] **Phantom-tag telemetry.** Today the function writes to stdout/
      stderr via `console.error` / `console.warn`. A future
      observability slice will route these into a structured
      telemetry pipeline (PostHog / Sentry / dedicated logs table).
      learner-model and pedagogy-auditor consume the output for the
      continuous-improvement loop.
