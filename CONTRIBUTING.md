# Contributing to BacPrep

This is a small project, mostly authored by one person + AI pair. Even
so, a few conventions are worth keeping. Pair with [README.md](README.md)
for the high-level orientation and [ARCHITECTURE.md](ARCHITECTURE.md)
for "how things fit."

---

## Local toolchain

This project is developed on Windows. Paths assume a default install
of Flutter and the Supabase CLI. Adjust as needed.

| Tool | Path |
|---|---|
| Flutter | `C:\flutter\bin\flutter.bat` |
| Dart | `C:\flutter\bin\dart.bat` |
| Supabase CLI | `C:\Users\soufiane.lomari\supabase-cli\supabase.exe` |
| Vercel CLI | `C:\Users\soufiane.lomari\AppData\Local\ms-playwright-go\1.50.1\vercel.cmd` |

For PowerShell, prefix paths and use `&` for spaces:
```powershell
& "C:\flutter\bin\flutter.bat" pub get
```

---

## Running the app locally

```powershell
cd mobile\bac_app

# First time
& "C:\flutter\bin\flutter.bat" pub get

# Dev (Chrome)
$url = (Get-Content .env.production | Where-Object { $_ -match "^SUPABASE_URL=" }) -replace "SUPABASE_URL=", ""
$key = (Get-Content .env.production | Where-Object { $_ -match "^SUPABASE_ANON_KEY=" }) -replace "SUPABASE_ANON_KEY=", ""

& "C:\flutter\bin\flutter.bat" run -d chrome `
  --dart-define=SUPABASE_URL=$url `
  --dart-define=SUPABASE_ANON_KEY=$key
```

Production build + Vercel deploy: see [PROJECT_STATUS.md §9](PROJECT_STATUS.md#9-deployment-runbook).

---

## Code style

- **Tools first**: prefer `Read`/`Edit`/`Glob`/`Grep` over Bash for
  file ops.
- **Tokens, not hex**: use `Papier.*` color tokens; use `PapierType.*`
  text helpers. Don't introduce new colors.
- **No unnecessary comments**: well-named identifiers explain WHAT.
  Comments earn their place by explaining WHY (a hidden constraint, a
  workaround for a specific bug, a non-obvious invariant).
- **Don't add error handling for impossible states**. Trust internal
  guarantees; only validate at system boundaries.
- **Const everywhere it lints clean**. Prefer `const` constructors.

Lint pass: `flutter analyze --no-pub`. Goal is zero new errors per PR;
info-level lints (`prefer_const_constructors`) are tolerated as a
constant-time tax we don't pay all at once.

---

## Database migrations

Migrations are numbered sequentially (`001_`, `002_`, ..., `020_`) and
must be idempotent.

```powershell
# Apply all pending migrations to the linked Supabase project
cd backend
& "C:\Users\soufiane.lomari\supabase-cli\supabase.exe" db push --include-all

# Verify state
& "C:\Users\soufiane.lomari\supabase-cli\supabase.exe" migration list
```

Idempotency rules of thumb:
- `INSERT INTO …` → add `ON CONFLICT (…) DO NOTHING` (or `DO UPDATE`
  if you actually want re-runs to refresh).
- `CREATE POLICY …` → precede with `DROP POLICY IF EXISTS …`.
- `CREATE TABLE …` → use `IF NOT EXISTS`.
- `UPDATE …` is naturally idempotent if it sets the same value each
  run.

---

## Authoring content

Long-form v2 lessons live in `backend/seed/json_encode_long_lessons*.dart`.
The encoders read compact Dart literals + emit JSONB into a SQL
migration (`014_*.sql`, `017_*.sql`, etc.).

```powershell
# Re-emit the SMB lesson migration
& "C:\flutter\bin\dart.bat" backend\seed\json_encode_long_lessons_smb.dart
# Then apply
cd backend
& "C:\Users\soufiane.lomari\supabase-cli\supabase.exe" db push --include-all
```

Block schema is defined in
[lib/models/lesson_v2.dart](mobile/bac_app/lib/models/lesson_v2.dart);
field names must match exactly (`title_fr`, `body_fr`, `caption_fr`,
`steps_fr`, etc.). Interactive widget slugs must appear in
[shared/validate_skill_map.dart](shared/validate_skill_map.dart)'s
`wiredSlugs` set.

---

## Testing

The project has a baseline test suite under `mobile/bac_app/test/`.
Run:

```powershell
cd mobile\bac_app
& "C:\flutter\bin\flutter.bat" test
```

Add tests for:
- new model parsing (`fromJson`/`toJson` round-trip)
- new providers (mock the API service)
- new widget edge cases (loading, empty, error states)

Tests run in CI (see `.github/workflows/ci.yml`).

---

## Commit messages

The repo uses fairly long, descriptive commit messages with sections
when the change spans multiple subsystems. Pattern:

```
<area>: <one-line summary>

<paragraph or two of context: what changed and why>

<bullet list of modified subsystems if multi-area>

Co-Authored-By: ...
```

Examples in `git log` (see commits like `phase A+B: account hardening
+ observability SDKs` or `content: 32 SMB v2 long-form lessons`).

---

## Sensitive files

- `.env.production` — Supabase URL + anon key. Anon key is public, but
  do not commit other secrets.
- Service-role keys belong in Supabase dashboard env, not in this repo.

---

## Where to put new things

| New thing | Location |
|---|---|
| A new screen | `lib/screens/<area>/<name>_screen.dart` |
| A new widget | `lib/widgets/<area>/<name>_widget.dart` (or `lib/widgets/papier/` if it's design-system) |
| A new provider | `lib/providers/<area>_provider.dart` |
| A new model | `lib/models/<name>.dart` (and `models.dart` re-export if public) |
| A new edge function | `backend/supabase/functions/<name>/index.ts` |
| A new migration | `backend/supabase/migrations/0NN_<short_name>.sql` |
| A new content seed | `backend/seed/json_encode_<area>.dart` (Dart encoder) |
