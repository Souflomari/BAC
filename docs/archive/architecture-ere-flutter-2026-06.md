# architecture.md — what exists today

A faithful description of the live MVP, anchored to files in the repo as of
this audit. Pairs with `schema-reconciliation.md` (the migration-path verdict)
and `known-issues.md` (the reconciled dislike-list backlog). The agent
definitions at `.claude/Agents/` describe the *target*; this document
describes what they will actually be working against.

---

## 1. Stack — the first audit finding

The dislike list states "Stack (assumed, confirm during audit): Next.js +
Supabase." It is not. The MVP is:

- **Frontend:** Flutter 3.x + Dart, Riverpod for state, `go_router` for
  routing, deployed as a Flutter Web build to Vercel
  (`mobile/bac_app/`, `pubspec.yaml`, `vercel.json`).
- **Backend:** Supabase (Postgres + Auth + Storage + Edge Functions), project
  ref `iwoydyudjondihzzsqay`, EU-Central region
  (`backend/supabase/`).

Next.js does not appear anywhere in the repo. `nextjs-frontend` as currently
written has no codebase to act on. This is not just a label mismatch — it
gates the agent architecture and, almost certainly, the dislike list's #1
complaint ("feels like an app put on a bigger screen, not a real website").
That cross-cutting decision is the subject of `schema-reconciliation.md` §6
— it is not a schema question and is left out of this file.

For the rest of this document, "the frontend" means the Flutter Web app.

---

## 2. Repository layout

Top-level:

- `mobile/bac_app/` — the Flutter app (148 .dart files, ~55k lines).
- `backend/supabase/` — `migrations/` (36 numbered SQL files, gaps at 019
  and 035), `functions/` (5 Deno edge functions), `config.toml`.
- `backend/seed/` — Dart and Python encoders that read JSON skill maps and
  emit the seed migration SQL.
- `shared/` — `skill_map_*.json` per filière (the actual curriculum
  source-of-truth today), `validate_skill_map.dart`, and a legacy
  `types/models.ts`.
- `curriculum/` — empty. The `bac-curriculum` agent specifies this as
  canonical, but it has not been populated.
- `docs/grounding/`, `docs/decisions/` — empty before this audit; the
  three documents this audit produces land in `docs/grounding/`.
- `admin/exam_importer/` — one `index.html`, exploratory.
- `mockups/` — historical static HTML mockups, not wired.
- Root markdown: `PROJECT_STATUS.md` (972 lines, the active dev journal —
  contains both architecture truth and aspirational state, read
  defensively), `ARCHITECTURE.md` (mostly accurate), `HANDOFF.md`,
  `CHANGELOG.md`, `CONTRIBUTING.md`, `README.md`, `GO_LIVE.md`.

Toolchain assumptions in `PROJECT_STATUS.md` are Windows-specific (paths
like `C:\flutter\bin\flutter.bat`); the audit treats these as
informational only.

---

## 3. Frontend — Flutter Web

### 3.1 Routing and shell

`lib/config/router.dart` configures a `GoRouter` with a top-level
`redirect` that gates auth (unauthenticated → `/landing`). Authenticated
routes are wrapped in a `ShellRoute` that renders `AppShell`. On mobile
widths `AppShell` paints a bottom `PapierTabBar`; on width ≥ 800 it
switches to a top `PapierTopNav`. Page transitions are a custom 180 ms
fade + 4 px slide (`_papierPage`), replacing the default
`NoTransitionPage`.

Tab roots: `/home`, `/subjects`, `/progress`, `/settings`. Non-tab routes
include `/lesson/:skillId`, `/session/:skillId`, `/exams`,
`/exam/:examId`, `/onboarding/stream`, `/login`, `/verify-email`,
`/profile`, `/docs`.

### 3.2 State (Riverpod)

- `lib/providers/auth_provider.dart` — `authStateProvider` (Stream over
  `SupabaseClient.auth.onAuthStateChange`), `profileProvider`,
  `authActionsProvider`.
- `lib/providers/progress_provider.dart` — `subjectsProvider`,
  `topicsProvider`, `skillsProvider`, `userSkillStatesProvider`, and
  derived aggregators (`allTopicsProvider`, `allSkillsProvider` feed
  global search).
- `lib/providers/lesson_progress_provider.dart` —
  `LessonProgressNotifier extends FamilyAsyncNotifier<Set<String>,
  String>`, debounced (800 ms) upsert to `user_lesson_progress`. Also
  exposes `continueLearningProvider` for the home-screen "Continue
  learning" card.
- `lib/providers/session_provider.dart` — session generation and answer
  submission.
- `lib/providers/connectivity_provider.dart` — `isOnlineProvider`.

### 3.3 Models

`lib/models/`:

- `profile.dart` — `Profile`, `BacStream` enum (mirrors the Postgres
  enum's 10 streams), `ContentLanguage`.
- `skill.dart` — `Subject`, `Topic`, `Skill`, `UserSkillState`,
  `EnrichedSkillState`, `MasteryLevel`.
- `lesson_v2.dart` — sealed-class hierarchy: `LessonBlock` (`paragraph`,
  `heading`, `formula`, `callout`, `example`, `interactive`,
  `checkpoint`, `try_it`, `divider`) inside `LessonSection` inside
  `LessonV2`. Parses the `skills.lesson` JSONB column when
  `version == 2`.
- `exam_paper.dart` — newer sealed-class: `ExamPaper`, `Exercice`,
  `Question`, `Subpart`, `QuestionSolution`, `SolutionStep`. Parses
  `skills.exam_paper` JSONB (column added in migration 029).
- `item.dart` — quiz items; `ItemType` enum carries 30+ values, several
  beyond what the Postgres `item_type` enum admits (see §4.3).

### 3.4 Services

- `lib/services/api_service.dart` (651 lines) — single `SupabaseClient`
  wrapper. Auth, profile, curriculum reads, items, sessions, exams,
  edge-function invocations. The only file in the app that talks directly
  to Supabase.
- `lib/services/cache_service.dart` — Hive boxes for offline-friendly
  caching. Per `PROJECT_STATUS.md`, plumbed but the v2-lesson
  read-through wrapper is not yet implemented.
- `lib/services/sync_service.dart` — flush pending answers when
  connectivity returns; reads `offline_exam_answers`.
- `lib/services/notification_service.dart` —
  `flutter_local_notifications` wrapper for daily reminders.
- `lib/services/analytics_service.dart` — PostHog wrapper, no-op when
  `POSTHOG_API_KEY` build-define is empty.

### 3.5 Design system: Papier

`lib/config/theme.dart` defines:

- Colour tokens: `Papier.bg`, `Papier.ink`, `Papier.surface`,
  `Papier.red`, `Papier.gold`, `Papier.indigo`, `Papier.green`,
  `Papier.line`, `Papier.line2`.
- Text helpers: `PapierType.italic / serif / body / smallCaps / mono /
  display1 / display2 / display3`. Uses `google_fonts` (Garamond italic
  base).
- Spacing tokens `Spacing.xs/sm/md/lg/xl/xxl` (4/8/16/24/32/48 px).

`lib/widgets/papier/` carries the primitives (`PapierTopNav`,
`PapierTabBar`, `PapierToast`, `PaperGrain`, `DoubleRule`, `Fleuron`).
Convention is never to hardcode hex or use raw Material text styles —
everything goes through `Papier.*` / `PapierType.*`.

### 3.6 Interactive widget catalogue

Native Flutter widgets implementing the manipulable surfaces referenced
in `lesson_v2`'s `interactive` blocks. 33 wired, dispatched by `slug` in
`lib/widgets/lesson_card_widget.dart`:

| Domain | Count | Examples |
|---|---|---|
| Math | 20 | `function_graph`, `derivative_graph`, `sequence_viz`, `area_curve`, `complex_plane`, `epsilon_delta_visualizer`, `slope_field`, `monte_carlo_simulator`, `euclid_visualizer`, `geometry_3d_viewer` |
| Physics | 13 | `force_diagram`, `projectile`, `circuit`, `wave`, `rlc`, `motion_simulator`, `refraction_simulator`, `e_field_uniform`, `b_field_uniform`, `nuclear_decay_simulator`, `pendulum_lab`, `am_modulation`, `capacitor_charge` |
| Chemistry | 6 | `titration_simulator`, `acid_base_ph`, `equilibrium_qr_k`, `kinetics_reactor`, `daniell_cell`, `esterification_animator` |
| Animations | 1 (10 sub) | `concept_animation` with `animation_id` switch over 10 Manim-style sequences |
| SVT (legacy) | 3 | `punnett_square`, `dna_replication`, `cell_division` |

All widgets take `({Item item, bool isAnswered, void Function onAnswer})`
and read parameters from `item.question['sim_config']` or
`['graph_config']` where present.

`PROJECT_STATUS.md` flags six widgets as expensive on first build
(`titration_simulator`, `e_field_uniform`, `b_field_uniform`,
`geometry_3d_viewer`, `slope_field`, `epsilon_delta_visualizer`). The
landing page already had to swap a live `epsilon_delta_visualizer` for a
static painter after it froze the tab.

These widgets are the genuine differentiator of the MVP and the
highest-cost asset to reproduce. Any stack-pivot proposal has to account
for them explicitly — see `schema-reconciliation.md` §6.

### 3.7 Lesson rendering — two screens, three content surfaces

`lib/screens/subjects/lesson_screen.dart` dispatches on
`lesson?['version'] == 2`. Two underlying screens exist:

- `lesson_screen.dart` (v1 cards), legacy SMB content.
- `long_lesson_screen.dart` (v2 long-form sections + checkpoints +
  try-it).

Once migration 029 added `skills.exam_paper`, the long-form screen
appends an `ExamPaperView` after the last lesson section (single scroll).
So a single skill can carry up to three surfaces: v1 cards (legacy),
v2 sections (current authoring target), and a Bac-style paper. The dual
lesson schema is a transitional state, not a finished design.

### 3.8 Build, deploy, observability

`mobile/bac_app/deploy.ps1` runs `flutter build web --release` with
`--dart-define=SUPABASE_URL=...` and `--dart-define=SUPABASE_ANON_KEY=...`,
then `vercel --prod`. Build outputs are uploaded as static assets; index
bootstrap wires a `controllerchange` reload to bust stale service workers
(`PROJECT_STATUS.md` §11 flags this as fragile).

`.github/workflows/ci.yml` (per `PROJECT_STATUS.md`) runs
`flutter analyze --no-fatal-infos`, `flutter test`, `flutter build web`
on push and PR via `subosito/flutter-action@v2`. Tests: 23 passing, of
which 17 are model tests and the rest are pre-existing.

Sentry and PostHog SDKs are wired but no-op until build-define DSN /
API key is set. Per `PROJECT_STATUS.md` neither account is provisioned.
The learner-model agent's aggregate loop and the dislike list's
"perceived sluggishness" check both depend on telemetry that does not
currently flow.

---

## 4. Backend — Postgres via Supabase

### 4.1 Migration set

36 numbered migrations under `backend/supabase/migrations/`, plus
`_apply_002_to_006_idempotent.sql` (a remediation helper). **Gaps at 019
and 035** are intentional per `PROJECT_STATUS.md` (019 was reserved for
SMB items that turned out not to be needed; 035 was reserved for PC items
not yet authored). Numbering should be considered append-only — the
ordinals are gappy, not corrupt.

Migrations are uniformly idempotent: `ON CONFLICT DO NOTHING`,
`CREATE TABLE IF NOT EXISTS`, `DROP POLICY IF EXISTS ... CREATE POLICY`,
`jsonb_set` guards. None ship a down migration — see
`schema-reconciliation.md` §7 for the expand-contract implication.

### 4.2 Tables (live count: 17)

User state (six tables, all with RLS enabled in the creating migration):

- `profiles` (001) — PK references `auth.users(id)`, populated by trigger
  `handle_new_user` on signup. Carries `bac_stream`, `bac_year`,
  `preferred_language`, `daily_goal_minutes`, streak/XP counters,
  `onboarding_completed`.
- `user_skill_states` (001) — per-(user, skill) SRS state.
  `half_life_hours`, `last_reviewed_at`, `mastery` (enum), `num_attempts`,
  `num_correct`, `current_streak`, `best_streak`, `estimated_ability`.
  Strength is computed at query time by `compute_strength(half_life,
  last_reviewed)` returning `2^(-Δh / half_life)`.
- `user_item_history` (001) — every answer attempt. `is_correct`,
  `response_time_ms`, `user_answer` JSONB, `difficulty_at_time`, optional
  `session_id`.
- `sessions` (001) — practice/review/mock_exam sessions, `subject_ids[]`,
  `skill_ids[]`.
- `user_badges` (001), `daily_activity` (001), plus
  `user_exam_progress` (002), `user_exam_favorites` (002),
  `user_exam_question_bookmarks` (004), `offline_exam_answers` (004),
  `daily_quests` (006), `user_lesson_progress` (015).

Curriculum (six tables, **RLS not enabled** — see §4.4 and
`schema-reconciliation.md` §5.1):

- `subjects` (001) — `code`, `name_fr/ar`, `color`, `exam_type`.
- `stream_subjects` (001) — many-to-many with `coefficient`,
  `is_optional`. Drives which subjects a filière sees.
- `topics` (001) — chapter level, FK `subject_id`.
- `skills` (001) — sub-chapter / notion level. FK `topic_id`. Carries
  `lesson` JSONB (added in 007) and `exam_paper` JSONB (added in 029).
- `skill_prerequisites` (001) — DAG edges `(skill_id,
  prerequisite_skill_id)`. PK composite. **See §5.1 for the data-gap
  finding.**
- `items` (001) — quiz items, FK `skill_id`. JSONB `question`,
  `explanation`, `hint`, plus `item_type`, `difficulty_level`, `tags[]`.

Exam corpus (two tables + ancillary, RLS enabled):

- `bac_exams` (002) — exam metadata: `year`, `session`
  (`normale` / `rattrapage` / `speciale`), `stream`, `subject_id`,
  `pdf_url`.
- `exam_questions` (002) — per-question rows. FK to `bac_exams` and
  optional `skill_id`. JSONB `question` (stem + figure + item_type) and
  `answer` (steps[] + final_answer + grading_notes + common_mistakes +
  tips).

Gamification: `badges` (001, RLS not enabled — declared but inert).

### 4.3 Item types — enum drift, apparent only

The Postgres `item_type` enum (001) originally enumerated eight values
(`mcq`, `numeric`, `short_text`, `true_false`, `ordering`, `fill_blank`,
`matching`, `multi_step`). Migration 003 appends four more (`graph`,
`simulate`, `dragPoint`, `adjustSlider`). The Dart `ItemType` enum
carries 30+ values (`limit`, `derivative`, `chain_rule`, `ipp`,
`complex_mult`, `recurrence`, `projectile`, `punnett`, etc.).

Reading the migrations: the granular Dart values are dispatch keys read
off the `question.widgetType` JSON field (v1 convention) or block-level
`widget_type` (v2 convention). The enum column itself only ever stores
one of its twelve allowed values. What looks like drift is a two-layer
naming convention; not a bug. Confirm once at runtime by
`SELECT DISTINCT item_type FROM items;`.

### 4.4 RLS coverage — partial

`ALTER TABLE ... ENABLE ROW LEVEL SECURITY` appears for: `profiles`,
`user_skill_states`, `user_item_history`, `sessions`, `user_badges`,
`daily_activity`, `bac_exams`, `exam_questions`, `user_exam_progress`,
`user_exam_favorites`, `user_exam_question_bookmarks`,
`offline_exam_answers`, `daily_quests`, `user_lesson_progress`.

It does **not** appear for: `subjects`, `stream_subjects`, `topics`,
`skills`, `skill_prerequisites`, `items`, `badges`. Each of these has a
"Public read" policy declared in migration 001 — but a `CREATE POLICY`
without RLS enabled is a no-op. The implication is covered in
`schema-reconciliation.md` §5.1.

### 4.5 Edge functions (Deno)

`backend/supabase/functions/`:

- `progress/` — comprehensive progress summary, used by
  `progressProvider`.
- `next-session/` — daily-quest scheduling logic.
- `submit-answer/` — grades an item attempt, updates SRS state
  (`user_skill_states`), logs to `user_item_history`, calls
  `upsert_daily_activity` + `increment_xp` RPCs.
- `daily-quests/` — generates today's three quest rows.
- `delete-self-account/` — service-role-scoped cascade delete for GDPR.

The runtime path for an answer submission: client → edge function →
several RPCs → state updated → client refetches. The agents' "scheduler"
will need to slot into this same path.

### 4.6 RPCs

In migration 005 + scattered through later migrations:

- `increment_xp(uuid, int)` — atomic XP add.
- `upsert_daily_activity(uuid, date, bool, int)` — atomic daily-activity
  upsert with conditional `items_correct` increment.
- `add_session_minutes(uuid, date, int)` — session minutes upsert.
- `increment_quest_progress(uuid, int)` — quest progress with bonus-XP
  return.
- `compute_strength(numeric, timestamptz)` — half-life decay (immutable).
- `get_user_weak_areas(uuid)` (004) — **broken**: references
  `uss.mastery_percentage` and `uss.correct`, columns that do not exist
  on `user_skill_states`. Either dead code or a latent runtime error.

All state-mutating RPCs are `SECURITY DEFINER` + `SET search_path =
public` + `GRANT EXECUTE TO authenticated, service_role` after
`REVOKE ALL FROM PUBLIC`. The pattern is correct.

### 4.7 Triggers

- `on_auth_user_created` (001) — `AFTER INSERT ON auth.users` calls
  `handle_new_user()` which inserts a `profiles` row with `id` and an
  optional `display_name` from `raw_user_meta_data`. The
  `auth.users` ↔ `public.profiles` separation is clean and the client
  never queries `auth.users` directly (confirmed by grep over `lib/`).
- `profiles_updated_at`, `items_updated_at`,
  `update_bac_exams_updated_at`, `update_exam_questions_updated_at`,
  `update_user_exam_progress_updated_at` — `updated_at` bumps.

### 4.8 Storage

One bucket: `avatars` (migration 016). Public read, owner-write policies
on the bucket. No bucket for exam PDFs — `bac_exams.pdf_url` strings are
placeholders pointing to `bacapp.vercel.app/annales/...` paths that
appear not to exist yet (per `PROJECT_STATUS.md` §11).

---

## 5. Content state — what is actually seeded

### 5.1 Curriculum content

| Stream | Source JSON | Skills in source | Skills in DB seed | Prereq edges in DB |
|---|---|---|---|---|
| SMA | `shared/skill_map_sciences_maths_a.json` | 108 | 108 (mig 012) | **0** |
| SMB | `shared/skill_map_sciences_maths_b.json` | 32 | 32 (legacy `seed_data.sql`, unprefixed codes) | **0** |
| PC | `shared/skill_map_pc.json` | 31 | 28 (mig 032) | 21 |
| SVT | `shared/skill_map_svt.json` | 25 | 25 (mig 036) | 9 |

Of the source JSON, 89/108 SMA skills, 22/32 SMB skills, 19/31 PC skills,
and 9/25 SVT skills carry a non-empty `prerequisites` array. The PC and
SVT seed encoders propagate this into `skill_prerequisites`; the SMA and
SMB encoders do not. This is the largest data gap in the system and the
dominant cause of the dislike list's §4–§5 complaints. See
`schema-reconciliation.md` §2 for the verdict on fixing it.

### 5.2 Lesson content (`skills.lesson` JSONB)

Two versions coexist:

- **v1 cards**: `{ "cards": [{"type":"theory",...}, {"type":"interactive",
  "widgetType":"function_graph", "config":{...}}] }`. Used by SMB
  (32 chapters) and many SMA skills.
- **v2 long-form**: `{ "version":2, "title_fr":..., "sections":
  [{"kind":"prerequisite|notion|methode|exemples|exercices",
  "blocks":[...]}] }`. Used for 32 SMA chapters (mig 013–014), 32 SMB
  chapters (mig 017), 31 PC chapters (mig 033), 25 SVT chapters
  (mig 037).

Total v2 coverage today: ~120 chapters across all four filières. The
`exam_paper` column (mig 029) is populated for 95 of these (32 SMA +
32 SMB + 31 PC). SVT exam papers shipped in mig 038 (25 more, taking
the total to ~120).

Multiple migrations rewrite the same JSONB column (mig 011 patches
`widgetType` onto v1 first cards; mig 023/024/025/026/028 patch
explanations via PL/pgSQL `jsonb_set` helpers; mig 027 rewrites
`items.explanation`). The `lesson` column is best understood as
"current-state JSONB managed by an append-only chain of patches", not as
an immutable seeded payload.

### 5.3 Items

`items` row counts by inserting migration (count of `INSERT INTO
public.items` statements):

- 009 (math): 299 inserts
- 010 (physics + SVT): 288 inserts
- 018 (SMA-specific): 129 inserts
- 039 (SVT): 200 inserts

Total ≈ 916 items, minus any that conflict on idempotent re-runs. The
`PROJECT_STATUS.md` narrative ("587 items targeting the SMB skill set"
etc.) is broadly consistent. Migration 027 is an `UPDATE`, not new
inserts — it expands the existing 129 SMA-specific item explanations to
~5× depth.

### 5.4 Exam corpus

- `bac_exams`: ~24 SMA papers (legacy `bac_exams_seed*.sql` files in
  `backend/seed/`) + 8 SMB papers (mig 020), plus whatever the PC/SVT
  encoders shipped (needs a DB read to confirm).
- `exam_questions`: 80 SMA questions (mig 022, expanded by mig 024),
  80 SMB questions (mig 021, expanded by mig 023). The "24 placeholders"
  noted in `PROJECT_STATUS.md` §11 are pattern-authored and tagged
  `placeholder`.
- `skills.exam_paper`: 95 synthetic Bac-style papers (one per SMA/SMB/PC
  skill that has them), authored alongside the long-form lessons. These
  are *not* real past exams — they are topic-coherent practice papers.

The two surfaces (`bac_exams + exam_questions` vs `skills.exam_paper`)
are intentionally distinct and answer different needs. The
exam-ingestion agent's pipeline output lands in `bac_exams +
exam_questions`; the synthetic papers were authored to give every skill
a practice surface without waiting for real-PDF ingestion.

### 5.5 Bank topology — two parallel item banks per scientific subject

**The structural fact that hid for five ADRs:** items and misconceptions
for the same conceptual skill live on **two different `skills.id` rows**,
keyed by stream.

For every scientific-subject skill (math, physics, svt), the seed flow
produced two skill rows:

- The **unprefixed row** (e.g. `skills.code = 'limit_calc'`,
  `id = 33333333-0000-0000-0000-000000000007`). Created by
  `seed_data.sql` early in the project's life, predates the `sma_`
  prefix convention. Serves **SM-B students** (whose unit "Calcul de
  limites" is the same content as SM-A's). All ~916 items shipped via
  migrations 009 / 010 / 018 / 039 attach to **these unprefixed UUIDs**
  (see migration 009 line 1+: `SELECT '44444444-…','33333333-0000-…'`).

- The **SMA-prefixed row** (e.g. `skills.code = 'sma_limit_calc'`,
  `id = 33333333-aaaa-0000-0000-000000000002`). Created by `json_encode_sma.dart`
  (mig 012) when the SMA-prefix convention landed. Serves **SM-A students**.
  Carries no items — the bank under it is empty. ADR-tracked
  artifacts under SMA (`common_misconceptions` from migration 045,
  authored misconceptions from `backend/seed/misconceptions/*.json`)
  attach here.

Same dual-row structure for `pc_*` (mig 032) and `svt_*` (mig 036),
though the misconception layer has only been authored on SMA so far.

**Why this matters at the data-model level.** A naïve query
"give me the misconceptions on the limits skill, joined with the items
that diagnose them" hits NULL on every join — the misconceptions are on
row A, the items are on row B, the FK is satisfied by either but the
two never meet. The skill-attribution mismatch is invisible to
RLS, to migration safety, and to ordinary SELECT queries that hit one
side only. It became visible only when ADR 0011's coverage audit asked
"what items diagnose these misconceptions?" and the answer was zero.

**Why this is the right model (per ADR 0011 §"Skill attribution
decision: option (a)").** SM-A and SM-B carry separate cadres de
référence; the same mathematical content is examined under different
rules, with different difficulty bands, in different exam formats.
Treating them as one skill would couple two distinct examined surfaces
through shared diagnostic state — contaminating per-user state across
filières that should be tracked independently. Treating them as two
parallel banks is the correct attribution; the data model already
reflects it, the audit just hadn't surfaced it.

**Operational rules.** When authoring content for a scientific-subject
skill, the agent must explicitly choose which row it attaches to:

1. **Misconceptions, distractor-tagged items, and any
   misconception-driven authoring** attach to the **SMA-prefixed row**
   (`code` starts with `sma_`, `id` in the `33333333-aaaa-…` range).
   This is where the diagnostic surface for SM-A students lives.
2. **The legacy item bank** on the unprefixed row continues to serve
   SM-B students. Don't migrate, don't duplicate, don't merge. SMB
   misconception authoring is its own future workstream (post-MVP)
   that lands its own per-skill JSON files on the unprefixed `code`.
3. **PC and SVT** mirror the SMA pattern — items on the `pc_` / `svt_`
   prefixed rows, paired with the unprefixed rows that the legacy
   bank attaches to.

**How to tell which row you're on:**

```sql
SELECT id, code FROM public.skills
WHERE code IN ('limit_calc', 'sma_limit_calc');
-- limit_calc      33333333-0000-0000-0000-000000000007  ← legacy / SM-B items
-- sma_limit_calc  33333333-aaaa-0000-0000-000000000002  ← SMA misconceptions
```

The `sma_` / `pc_` / `svt_` prefix in `code` is the canonical signal of
intent. UUID family (`33333333-0000-…` vs `33333333-aaaa-…` /
`-cccc-…` / `-dddd-…`) is the canonical signal of which stream the row
serves.

ADR 0008's misconception ID format (`mc.<subjects.code>.<skills.code>.<short-label>`)
is keyed off the SMA-prefixed `code`, which is what makes the
diagnostic surface SMA-specific by construction. Any future SMB
misconception authoring will use the unprefixed `code` in its IDs.

---

## 6. Authoring pipeline

The flow that produces seed migrations:

```
shared/skill_map_<filière>.json      (curriculum source-of-truth)
        │
        ▼
backend/seed/json_encode_<filière>.dart   (Dart encoders)
backend/seed/json_encode_long_lessons*.dart
backend/seed/json_encode_exam_papers_*.dart
backend/seed/json_encode_items_*.dart
backend/seed/encode_sma_lesson_explanations.py
        │  (one-shot run, regenerates the SQL file)
        ▼
backend/supabase/migrations/0NN_<thing>.sql
        │
        │  supabase db push
        ▼
Live database
```

Two convention notes for any agent that touches this pipeline:

1. **Re-running an encoder rewrites the migration file in place.** This
   only works because every migration is idempotent. The expand-contract
   discipline the `supabase-architect` demands cannot be enforced through
   the encoder pattern alone — every "rewrite" of an existing migration
   needs to ship as a *new* numbered migration that operates on the live
   data.
2. **Validation happens out-of-band.** `shared/validate_skill_map.dart`
   checks the JSON skill maps before encoding. There is no schema
   validation between the JSON and the running DB. An encoder bug that
   produces a structurally-valid but semantically-wrong JSONB payload
   (e.g. the SMA prereq omission) will pass.

The pedagogy-auditor and bac-curriculum agents will want to land their
notion registry and misconception tagging into this same pipeline rather
than into a parallel one — see `schema-reconciliation.md` §2 and §3.

---

## 7. What is notably absent

Things the agents will look for and not find:

- **Notion-level taxonomy.** The schema's deepest level is `skills`,
  which corresponds to a chapter sub-skill, not a leaf "notion" in the
  `bac-curriculum` sense. The 6-level Filière → Matière → Unité →
  Chapitre → Section → Notion model has to be either compressed onto the
  3-level `Subject → Topic → Skill` model or extended with new tables.
  See `schema-reconciliation.md` §2.
- **Prerequisite edges for SMA + SMB.** Table exists, source data
  exists, encoder discards it. Pure data backfill.
- **Misconception-tagged distractors.** The string
  `"common_mistakes": [...]` appears in 80+ `exam_questions.answer`
  payloads and in `items.explanation`, but as free text. No stable
  `misconception_id`, no link from a specific MCQ distractor to a
  misconception, no per-(student, misconception) state. The
  `learner-model` agent already flags this as a known dormant area until
  tagging exists.
- **Cadre de référence metadata.** The bac-curriculum agent's
  `cadre_ref` status (`in` / `out` / `partial`) is not represented
  anywhere in the schema or the JSON skill maps.
- **Examinability vs in-program distinction.** All skills are treated as
  examinable. The agent specifies this as a feature; the MVP does not
  express it.
- **Two representations per notion** (developed + précis). v2 lessons
  carry the *developed* form; the compressed précis the pedagogy-auditor
  spine #7 requires has no schema home.
- **Forgetting-risk surface.** The data is there (`half_life`,
  `last_reviewed_at`) and the `compute_strength` function is correct,
  but no screen surfaces "these are slipping" to the student.
- **"What to study today" surface.** The scheduler logic the
  learner-model agent will produce has no home screen to render into
  today. The dashboard at `/home` shows streak, XP, "continue learning",
  daily quests — but not a notion-level priority list.
- **Telemetry events** for readiness pass rates, stalls,
  notion-to-exam-success. The aggregate-loop hook the learner-model
  agent's second hat depends on is dormant.
- **Down migrations + branch-tested migration workflow.** Every
  migration is idempotent forward, none has a downward. No mention of
  Supabase branching in the deploy runbook.

These are tracked in `known-issues.md` with severity scoring; cited here
for orientation.

---

## 8. Working assumptions for the agents

1. **Brownfield with live data.** Per the supabase-architect's hard
   rule, treat the production DB as carrying real student state. No
   destructive migration without backup + sign-off. Whether actual
   students currently use `bacapp.vercel.app` is unverified by this
   audit — the URL is live per `PROJECT_STATUS.md`, but the assumption
   stands regardless.
2. **Migration discipline.** Append-only, idempotent, expand-contract.
   New numbered file for every change, even when re-running an encoder.
3. **No greenfield surfaces.** Every domain — curriculum, content, exam
   corpus, student state — has live data. Even the empty surfaces
   (notion taxonomy, misconception tagging) sit on top of existing data
   and have to evolve it, not replace it.
4. **The frontend question is unresolved.** The audit does not pick
   between keeping Flutter and pivoting to Next.js. The choice gates the
   `nextjs-frontend` agent's existence. See `schema-reconciliation.md`
   §6.

The schema-reconciliation document picks up from here.
