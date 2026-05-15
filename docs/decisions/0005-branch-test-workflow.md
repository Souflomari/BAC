# ADR 0005 — Branch-test workflow (Path A: second Supabase project)

**Status.** Accepted, 2026-05-15. Amended 2026-05-16 (script v2 — see §"Amendments").
**Owner.** supabase-architect.
**Related.**
- [ADR 0003](0003-out-of-band-prerequisites-recovery.md) — established the
  branch-test rule that this ADR makes operational.
- [ADR 0004](0004-sma-prereq-backfill.md) — documented the second
  consecutive skip and called for K-2 resolution.
- [ADR 0007](0007-misconception-schema.md) — first real-use firing of
  the script + the operational rule for `pg_policies.roles` recorded in
  §"Amendments → 2026-05-16" below.
- `docs/grounding/known-issues.md` K-2 (no branch-tested deploy workflow,
  sev-1 before the first expand-contract migration).

---

## Context

ADRs 0003 and 0004 documented a rule ("branch-test before any prod push
to curriculum tables") that we then violated twice in two days. The
blocker was infrastructure, not discipline:

- Supabase managed branching (`supabase branches create`) returned
  HTTP 402 — Pro plan only. The BacPrep project is on Free tier.
- Local `supabase db reset` requires Docker Desktop running on the dev
  machine. Docker was not running.
- No separate "staging" project existed.

Stage 3.5 of the cleanup answers the K-2 finding by choosing one of two
paths the user laid out:

- **Path A (free):** a second Supabase project, scripts that link/push/
  verify/unlink-relink.
- **Path B (paid):** upgrade BacPrep to Pro, use managed branches.

This ADR documents the chosen path and the workflow that now ships.

## Decision

### Path chosen: **A — second Supabase project**

A second project, `bac-app-staging` (ref `miscjaztsputtdalwcjp`), was
provisioned on the same Free-tier org as production (`BacPrep`, ref
`iwoydyudjondihzzsqay`), in the same region (Central EU / Frankfurt).
Free tier permits 2 projects per org; this consumes the second slot.

Rationale:

- **Cost: $0 recurring.** The next stages of this cleanup are still
  scoped to a solo founder; a $25-30/month commitment for managed
  branching was deferred until value-of-branching meets that bar.
- **Stable persistent staging.** Each branch test pushes only the
  pending migrations, then unlinks; we do not pay the cost of
  reprovisioning a managed branch each run.
- **No CI dependency.** The dev machine drives the workflow; no
  GitHub Actions or external runner is required.

Trade-offs accepted (re-visit later):

- **Schema drift risk.** Staging diverges from prod the moment a
  migration is applied to staging but not prod. The script's link/push/
  unlink dance is designed to make this hard to forget, but the burden
  is on the developer to run the script before every prod push.
- **Pg_dump-based bootstrap is one-time.** Staging was seeded from
  `pg_dump prod` on 2026-05-15. If prod's schema drifts from staging in
  an out-of-band way (it shouldn't, but ADR 0003 documents that this has
  happened), staging needs to be re-bootstrapped. ADR 0003's
  no-out-of-band-writes rule keeps this from becoming a routine concern.
- **Pg_dump is large.** The portable PostgreSQL 17 client tools live
  under `~/.cache/pgtools/pgsql/bin/` on the dev machine (~330 MB
  extracted). Not committed; the README will tell future devs to
  re-download via the URL in §Bootstrap below.

### How staging was bootstrapped (one-time, 2026-05-15)

A first attempt to seed staging by replaying migrations 001-042 from
zero **failed**, surfacing accumulated K-3 debt:

- Migration `004_exam_analytics_and_sync.sql` references columns
  (`p.year`, `p.stream`) that don't exist on `user_exam_progress` —
  they live on `bac_exams` (alias `b`). The corrected version is in
  `_apply_002_to_006_idempotent.sql`, which `supabase db push` skips
  because the filename doesn't match the timestamp pattern. Prod
  somehow ended up with the corrected view; a fresh DB exposes the
  original bug.
- Migration `009_items_math.sql` (and 010, 018, 027) FK-fail without
  rows that come from `backend/seed/seed_data.sql` — the same orphan
  file ADR 0003 captured the prereq portion of.

Pivot: pg_dump prod's `public` and `supabase_migrations` schemas (with
`--exclude-table-data` for user-state tables to avoid auth.users FK
violations on staging), then `psql -f` the dump into staging. Staging
ends up with exactly prod's curriculum + system state, no replay debt.

Bootstrap commands (recorded for the one-time reproducibility):

```bash
# Get portable PG client tools (one-time; the user has them under
# ~/.cache/pgtools/pgsql/bin/).
curl -sSL -o ~/.cache/pgtools/pg17.zip \
  https://get.enterprisedb.com/postgresql/postgresql-17.9-3-windows-x64-binaries.zip
unzip -q ~/.cache/pgtools/pg17.zip -d ~/.cache/pgtools/
export PATH="$HOME/.cache/pgtools/pgsql/bin:$PATH"

# Dump prod's public + supabase_migrations, skipping user-state data.
PGPASSWORD=$(cat ~/.cache/_prod_db_pw) pg_dump \
  -h aws-1-eu-central-1.pooler.supabase.com -p 5432 \
  -U postgres.iwoydyudjondihzzsqay -d postgres \
  --no-owner --no-privileges \
  -n public -n supabase_migrations \
  --exclude-table-data='public.profiles' \
  --exclude-table-data='public.user_*' \
  --exclude-table-data='public.sessions' \
  --exclude-table-data='public.daily_activity' \
  --exclude-table-data='public.daily_quests' \
  --exclude-table-data='public.offline_exam_answers' \
  -f ~/.cache/prod_dump.sql

# Reset staging public + supabase_migrations.
PGPASSWORD=$(cat ~/.cache/bac-app-staging-db-password.txt) psql \
  -h aws-1-eu-central-1.pooler.supabase.com -p 5432 \
  -U postgres.miscjaztsputtdalwcjp -d postgres -v ON_ERROR_STOP=1 \
  -c "DROP SCHEMA IF EXISTS public CASCADE; DROP SCHEMA IF EXISTS supabase_migrations CASCADE;"

# Apply dump.
PGPASSWORD=$(cat ~/.cache/bac-app-staging-db-password.txt) psql \
  -h aws-1-eu-central-1.pooler.supabase.com -p 5432 \
  -U postgres.miscjaztsputtdalwcjp -d postgres -v ON_ERROR_STOP=1 \
  -f ~/.cache/prod_dump.sql

# Restore Supabase default grants on the public schema (dump used
# --no-privileges, which wipes the anon/authenticated/service_role
# GRANTs Supabase initializes).
PGPASSWORD=$(cat ~/.cache/bac-app-staging-db-password.txt) psql \
  -h aws-1-eu-central-1.pooler.supabase.com -p 5432 \
  -U postgres.miscjaztsputtdalwcjp -d postgres -v ON_ERROR_STOP=1 <<'EOF'
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL ROUTINES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
  GRANT ALL ON TABLES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
  GRANT ALL ON ROUTINES TO postgres, anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public
  GRANT ALL ON SEQUENCES TO postgres, anon, authenticated, service_role;
EOF
```

Post-bootstrap, staging contains:

- 9 badges, 13 subjects, 52 stream_subjects, 108 topics, 288 skills,
  1838 items, 201 skill_prerequisites — identical row counts to prod.
- 40 rows in `supabase_migrations.schema_migrations`, mirroring prod's
  history (001-018, 020-034, 036-042).
- All 39 RLS policies and 31 indexes from prod.
- Empty user-state tables (profiles, sessions, user_*) — by design, so
  prod's auth.users IDs don't leak into staging.

Verified per-stream attribution on staging matches the ADR 0004
canonical baseline exactly: SMA=98, SMB=31, PC=21, SVT=9, humanities=42,
total=201, cross-stream=0.

### The script: `scripts/branch-test.ps1`

PowerShell 5.1 (Windows native; runs without admin) is the host shell.
The script:

1. **Resolves the staging password** from one of:
   - `$env:SUPABASE_STAGING_DB_PASSWORD` (CI-friendly).
   - `~/.cache/bac-app-staging-db-password.txt` (dev machine; chmod 600).
   - Interactive `Read-Host -AsSecureString` prompt (fallback).
2. **Links the CLI to staging** (`supabase link --project-ref miscjaztsputtdalwcjp`).
3. **Pushes pending migrations** (`supabase db push`) — applies any
   migrations on disk that staging hasn't yet seen, recorded in
   `supabase_migrations.schema_migrations` on the staging side.
4. **Fetches staging's anon key** via `supabase projects api-keys`.
5. **Runs the canonical sanity-check suite via REST against staging:**
   - **Per-stream attribution.** Pulls all `skill_prerequisites` and
     `skills` (with subject embed), buckets by code prefix +
     `subjects.code` fallback, asserts counts match the expected
     baseline (defaults to ADR 0004 numbers; override via
     `-ExpectedBaselineJson <path>` for migrations that change the
     baseline).
   - **RLS proof.** Attempts an anon INSERT into `public.subjects` and
     asserts a 401/403 response. If it succeeds, RLS isn't enforcing.
   - **Read-path intact.** Asserts an anon SELECT on `public.skills`
     returns at least one row.
6. **Re-links CLI to prod** in a `finally` block — runs UNCONDITIONALLY,
   even if every check above failed. This ensures the user is never
   left in a state where the next `supabase db push` accidentally
   targets staging.
7. **Captures every step** to `.audit-logs/branch-test-<timestamp>.log`.
   Both stdout and stderr of each step are appended, prefixed with the
   step name.
8. **Exit code is 0 only if every check passed.** Non-zero exit means:
   read the log, fix what's broken, do **not** push to prod.

The script and its dependencies survived eight iterations of
Windows-PowerShell-specific debugging that surfaced rules worth
recording for any future native-exe orchestration in PS:

- **`2>&1` on native exes wraps each stderr line in an ErrorRecord**
  under PS 5.1 even if the exe exits 0. Wrap in
  `$ErrorActionPreference = 'Continue'` and rely on `$LASTEXITCODE`,
  not exceptions.
- **PowerShell parameter binding consumes positional args greedily
  before `ValueFromRemainingArguments`.** A function param like
  `[string]$StdinLine` placed before `[ValueFromRemainingArguments]
  [object[]]$Arguments` will grab the first non-flag positional
  argument — `'link'` — and pipe it to stdin instead of passing it as
  the subcommand. Pass args as an explicit `[string[]]` instead of
  relying on `ValueFromRemainingArguments`.
- **`Range` is a restricted HTTP header in `System.Net.HttpWebRequest`
  on PS 5.1.** `Invoke-RestMethod -Headers @{ Range = ... }` throws
  `"L'en-tête 'Range' doit être modifié à l'aide de la propriété ou
  méthode adéquate"`. Use PostgREST's `?limit=N` query string instead.
- **`Invoke-WebRequest` in PS 5.1 prompts interactively for credentials
  on 401 responses** if the script is non-interactive. Use
  `Invoke-RestMethod` everywhere; it doesn't.

And one rule that surfaced on the first real-use firing of the script,
on the SQL side rather than the PowerShell side (ADR 0007 §"Branch
test — first real-use firing"):

- **`pg_policies.roles` is `name[]`, not `text[]`.** Any DO `$verify$`
  block that asserts policy role membership with
  `roles @> ARRAY['authenticated']` fails on
  Postgres 17 / Supabase with `operator does not exist: name[] @>
  text[]`. The cast `roles::text[] @> ARRAY['authenticated']` resolves
  the operator. Same rule applies for any future verify block that
  joins or filters on `pg_policies.roles`. ADR 0007 §supabase-architect
  has the full incident record.

### Usage

Before any `supabase db push` against prod that touches a curriculum
table:

```powershell
# From repo root, Windows PowerShell:
.\scripts\branch-test.ps1
```

For migrations that change the per-stream baseline (the count of any
stream's edges changes), supply the new expected baseline:

```powershell
# Example: a future SMB-fix migration changes SMB=31 → SMB=45.
.\scripts\branch-test.ps1 -ExpectedBaselineJson .\scripts\baselines\043.json
```

The JSON file shape (only the keys you want to override; missing keys
fall back to ADR 0004 defaults):

```json
{
  "SMA": 98, "SMB": 45, "PC": 21, "SVT": 9, "humanities": 42,
  "total": 215
}
```

To skip the push and just validate staging's current state (e.g. after
someone else pushed to staging):

```powershell
.\scripts\branch-test.ps1 -SkipPush
```

### Operational rules — enforced by this ADR

1. **Every prod push that touches a curriculum table runs
   `scripts/branch-test.ps1` first.** If exit code ≠ 0, do not push.
2. **The script unconditionally re-links to prod on exit.** Never
   leave staging linked at the end of a session.
3. **When a migration changes the per-stream baseline,** the migration
   author updates the expected baseline (either as the script's
   default, by editing ADR 0004's table, or via a
   `scripts/baselines/<N>.json` file). The new baseline becomes
   canonical the moment the migration ships to prod.
4. **Staging schema drift is a bug.** If `branch-test.ps1` fails with
   drift detected, the fix is to re-bootstrap staging from prod (see
   bootstrap commands above) — not to patch staging by hand.
5. **`~/.cache/_prod_db_pw` and `~/.cache/bac-app-staging-db-password.txt`
   are never committed.** They're gitignored implicitly because they
   live outside the repo, but a hook to enforce this lives in K-2's
   follow-up.

### Amendments — 2026-05-16 (script v2)

After the first real-use firing of the script (ADR 0007's misconception
migration), the v1 suite proved adequate as a *baseline-drift* gate but
left the per-migration-artifact validation (was the new column actually
created with the right default? do the new indexes exist?) to each
migration's own `DO $verify$` block. ADR 0007 §"Canonical sanity-check
additions" laid out what the suite should grow to cover. Script v2
adds those checks for the misconception schema.

**Four checks added** (run after the v1 read-path / RLS / baseline
checks, so a failure here is the same "do not push" signal):

| # | Check | Means |
|---|---|---|
| D | anon write denied on `user_misconception_states` (RLS proof) | Migration 043's RLS + INSERT policy actually fires for anon. |
| D-bis | anon SELECT on `user_misconception_states` returns `[]` | The SELECT policy's `auth.uid() = user_id` correctly filters anon (where `auth.uid()` is NULL) to zero rows. |
| E | `skills.common_misconceptions` default round-trips as `[]` | The `[]::jsonb` default in migration 043 survives a write/read cycle. Drift means out-of-band content authoring. |
| F | `items.distractor_misconceptions` default round-trips as `{}` | Same shape for items.distractor_misconceptions. |
| G | All four misconception indexes exist in `pg_indexes` | `idx_skills_common_misconceptions_gin`, `idx_items_distractor_misconceptions_gin`, `idx_user_misconception_states_active`, `idx_user_misconception_states_misconception`. |

(D and D-bis are listed as a single "check D" in the user's spec but
ship as two distinct Invoke-Step blocks in the script because they
test orthogonal RLS behaviours — write-denied vs read-filtered.)

**New script dependency: `psql`.** Check G needs to read `pg_indexes`,
which PostgREST doesn't expose. The script now resolves `psql.exe` from:

- `Get-Command psql` (PATH lookup)
- `~/.cache/pgtools/pgsql/bin/psql.exe` (the portable PG client tools
  installed for the staging bootstrap; see §Bootstrap above)
- `C:/Program Files/PostgreSQL/{17,18}/bin/psql.exe` (winget install)

If `psql` is **not** found, the script logs a `WARN` and *skips* check G
rather than failing — every other misconception check still fires via
REST, so staging is still substantially validated. Operators who want
the index check enforced must put `psql` on PATH.

**Refactor: `Assert-AnonDenied` helper.** Both RLS-proof checks share
the same PS 5.1 / PS 7+ exception-shape variance the original
`subjects` check discovered. A single helper now wraps the
`401|403`-or-message pattern; both call sites collapse to one line.

**Script version: 2.** Recorded in the script's `.SYNOPSIS` header
("Script version: 2") and referenced by the date and ADR link. Any
future amendment to the suite increments this number and lands a
matching amendment block here.

## Consequences

- **K-2 closed for additive curriculum-table migrations.** Future
  prereq/skill/topic/badge migrations can be branch-tested in ≤ 11
  seconds via a single script invocation (v2 timing: ~11s vs v1's
  ~10s; the index check adds ~1s of psql round-trip).
- **K-2 not yet closed for expand-contract migrations.** This script
  doesn't validate data-shape changes that drop/rename columns. The
  first expand-contract migration will need an additional
  pre/post-state diff check that this script doesn't currently
  perform.
- **The third branch-test skip would now be inexcusable.** Every
  precondition the prior two ADRs flagged is met: staging exists,
  script works, password handling is documented, ~10s runtime. ADRs
  0003 §5 and 0004 §5 are now obsolete as explanations for skipping;
  the only remaining valid reason to skip is "the migration doesn't
  touch curriculum tables".
- **`.audit-logs/` keeps a permanent record** of every branch-test run.
  Useful for traceability when a regression is found later.
- **`scripts/baselines/` is reserved** for per-migration expected-
  baseline JSON files. Not created yet; will appear with the first
  migration that changes the per-stream count.

## Pending follow-ups

- [ ] **Pre-commit hook** that runs `branch-test.ps1` if any file under
      `backend/supabase/migrations/` is staged. Stops the K-3 anti-
      pattern at the developer's machine, not at the dashboard.
- [ ] **Expand-contract diff check.** For migrations that change
      column shape, the script needs a `pg_dump --schema-only` of
      staging before-and-after, with the diff printed for review.
- [ ] **`scripts/baselines/` discipline.** When the first migration
      changes the baseline, decide whether the JSON file lives in the
      repo (versioned) or is a one-shot artifact in `~/.cache/`.
      Repo-versioned is easier to reproduce; the file would be tiny.
- [ ] **Migration 004 / `_apply_002_to_006_idempotent.sql` cleanup.**
      The fact that staging cannot replay 001 → 042 from zero is a
      latent bug. A future ADR should either: (a) write a corrective
      migration that supersedes 004's bug, or (b) document
      `_apply_002_to_006_idempotent.sql` as a special-case file that
      the dev runs manually before any zero-replay attempt. Not urgent
      because staging is bootstrapped via pg_dump, but it's a smell.
- [ ] **`backend/seed/seed_data.sql` reconciliation.** It's still the
      sole source of unprefixed subjects/topics/skills/items in the
      DB; the K-3 anti-pattern is only half-closed (ADR 0003 captured
      the prereq portion). A follow-up should backfill the rest into
      versioned migrations.

- [ ] **Suite checks for non-misconception schemas.** Script v2 added
      four checks specific to migration 043's schema. Future migrations
      that introduce comparable invariants (new RLS-enforced tables,
      new JSONB columns with defaults, new compound indexes) should
      grow the suite the same way — at the time the migration ships,
      not retroactively. Each addition increments the script version
      and lands an Amendment block here.
