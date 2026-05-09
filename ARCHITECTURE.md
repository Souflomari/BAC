# BacPrep — Architecture

A snapshot of how the pieces fit together. Pairs with [PROJECT_STATUS.md](PROJECT_STATUS.md)
(which tracks what's shipped vs. outstanding) and [CONTRIBUTING.md](CONTRIBUTING.md)
(how to run the project locally).

---

## Big picture

```
┌──────────────────────────────────────┐         ┌──────────────────────────┐
│ Flutter web app (Vercel)             │   API   │ Supabase                 │
│                                      │ ──────► │                          │
│  • Riverpod state                    │  RLS    │  • Postgres (skills,     │
│  • Papier design system              │  HTTPS  │    items, exams,         │
│  • 33 interactive widgets            │         │    profiles, ...)        │
│  • LessonV2 reader                   │         │  • Auth (email/password) │
│  • Hive offline cache                │         │  • Storage (avatars/)    │
│                                      │         │  • Edge functions        │
└──────────────────────────────────────┘         └──────────────────────────┘
       │                                                       │
       ▼                                                       ▼
  ┌────────────┐                                       ┌──────────────┐
  │ PostHog    │ events                                │ Sentry       │
  │ (optional) │ ◄─────────────                        │ (optional)   │
  └────────────┘                                       └──────────────┘
```

PostHog and Sentry are wired but no-op when their build-time env vars
(`POSTHOG_API_KEY`, `SENTRY_DSN`) are empty.

---

## Frontend layers

### Routing
[lib/config/router.dart](mobile/bac_app/lib/config/router.dart) — go_router
with a top-level `redirect` that gates auth (unauthed → `/landing`),
plus an `errorBuilder` that renders the Papier-styled 404 (`NotFoundScreen`).

The `ShellRoute` wraps the four main tab routes (`/home`, `/subjects`,
`/progress`, `/settings`) with `AppShell`, which renders the bottom
`PapierTabBar` (mobile) or top `PapierTopNav` (desktop).

Page transitions use a custom `_papierPage` (180ms fade + 4px slide)
instead of `NoTransitionPage`.

### State (Riverpod)
- `lib/providers/auth_provider.dart` — `authStateProvider`
  (StreamProvider over Supabase auth changes), `profileProvider`,
  `authActionsProvider` (signUp/signIn/signOut/updateDisplayName/uploadAvatar/deleteSelfAccount).
- `lib/providers/progress_provider.dart` — subjects, topics, skills,
  user skill states, derived stats. Heavy aggregations are memoized
  via `ref.watch` chains.
- `lib/providers/lesson_progress_provider.dart` — debounced upsert
  (800ms) to `user_lesson_progress` when a checkpoint passes; plus
  `continueLearningProvider` for the home-screen "Continue learning"
  card.

### Models
- `lib/models/profile.dart` — `Profile`, `BacStream` enum (10 filières),
  `ContentLanguage` enum.
- `lib/models/lesson_v2.dart` — sealed `LessonBlock` family (paragraph,
  heading, formula, callout, example, interactive, checkpoint, try_it,
  divider) inside `LessonSection` inside `LessonV2`. JSON shape stored
  in `skills.lesson` JSONB column.
- `lib/models/skill.dart` — `Subject`, `Topic`, `Skill`, `UserSkillState`,
  `EnrichedSkillState`.
- `lib/models/item.dart` — quiz items (mcq/numeric/ordering/short_text).

### Services
- `lib/services/api_service.dart` — single SupabaseClient wrapper.
  Auth, profile, curriculum, items, sessions, exams, edge fn invokes.
- `lib/services/cache_service.dart` — Hive boxes for offline-friendly
  caching.
- `lib/services/notification_service.dart` — `flutter_local_notifications`
  wrapper for daily reminders.
- `lib/services/analytics_service.dart` — PostHog wrapper, no-op when
  `POSTHOG_API_KEY` is empty.

### Design system: Papier
A cream + ink + italic Garamond aesthetic. Lives in:
- `lib/config/theme.dart` — color tokens (`Papier.bg`, `Papier.ink`,
  `Papier.surface`, `Papier.red`, `Papier.gold`, `Papier.indigo`,
  `Papier.green`, `Papier.line`, `Papier.line2`, ...) plus `PapierType`
  text helpers (italic, serif, body, smallCaps, mono, displayN).
- `lib/widgets/papier/` — `PapierTopNav`, `PapierTabBar`,
  `PapierToast`, `papier_primitives.dart` (DoubleRule, PaperGrain,
  Fleuron, etc.).

Rules of thumb:
- All foreground colors via `Papier.*` tokens. Never hardcoded hex.
- All text via `PapierType.*` helpers (which use `google_fonts`).
- All page transitions via `_papierPage` in `router.dart`.

### Interactive widgets (33 of them)
Each `lib/widgets/{math,physics,chemistry,svt,animations}/<slug>_widget.dart`
takes `(Item item, bool isAnswered, void Function onAnswer)` and is
dispatched by slug in [lib/widgets/lesson_card_widget.dart](mobile/bac_app/lib/widgets/lesson_card_widget.dart).
The canonical wired-slug list is in [shared/validate_skill_map.dart](shared/validate_skill_map.dart)'s
`wiredSlugs` set — used both at lesson-authoring time (via
`_interactive('slug')` in `json_encode_long_lessons*.dart`) and at
runtime dispatch.

---

## Backend layers

### Database (Postgres via Supabase)
Migrations are sequential SQL files in [backend/supabase/migrations/](backend/supabase/migrations/),
applied via `supabase db push`. Highlights:

- **001** initial schema (subjects, topics, skills, items, profiles,
  user_skill_states, sessions, ...).
- **002** `bac_exams` + `exam_questions`.
- **009/010** SMA-shared item bank (587 items targeting the original
  non-prefixed skill set, which serves SMB).
- **012** SMA-specific skill layer (`sma_*` codes, `33333333-aaaa-…`
  UUIDs).
- **013/014** v2 long-form lessons for 32 SMA chapters.
- **015** `user_lesson_progress` (checkpoint persistence).
- **016** `avatars` storage bucket + RLS.
- **017** v2 long-form lessons for 32 SMB chapters.
- **018** items for the SMA-specific layer (~129 new items).
- **020** SMB past exam papers (8 papers + 24 patterned questions).

All migrations are idempotent (`ON CONFLICT DO NOTHING` + `IF NOT EXISTS`
+ `DROP POLICY IF EXISTS` ahead of `CREATE POLICY`).

### Edge functions (Deno)
[backend/supabase/functions/](backend/supabase/functions/):
- `progress` — comprehensive progress summary (used by `progressProvider`).
- `next-session` — daily-quest scheduling.
- `submit-answer` — grades an item attempt and updates SRS state.
- `daily-quests` — generates today's quests.
- `delete-self-account` — service-role-scoped cascade delete (GDPR).

### Seed authoring
Hand-authored content lives as Dart scripts in [backend/seed/](backend/seed/)
that emit SQL migrations:
- `json_encode_sma.dart` reads `shared/skill_map_sciences_maths_a.json`
  and emits the SMA skill seed (migration 012).
- `json_encode_long_lessons.dart` defines 32 SMA chapters in compact
  Dart and emits migration 014 (full-text v2 lessons as JSONB UPDATEs).
- `json_encode_long_lessons_smb.dart` ditto for 32 SMB chapters → 017.
- `json_encode_items_sma.dart` defines pattern-authored items for the
  SMA-specific skills → 018.

---

## Auth, account, and content lifecycle

### Sign-up flow
1. User submits email/password on `/login` (signup mode).
2. `apiService.signUp` calls `auth.signUp()`. Supabase sends a
   confirmation email automatically.
3. UI redirects to `/verify-email?email=…`.
4. User can click "Continuer" to enter the app without verifying
   (soft gate — the `EmailVerifyBanner` widget will nudge them on
   every authed tab until they verify).

### Stream switch
Settings → "Filière" opens a confirmation dialog → `/onboarding/stream`
on confirm. The stream change does NOT migrate progress — it only
changes which subjects/chapters the user sees.

### Lesson rendering
- v1 (legacy cards): `lib/screens/subjects/lesson_screen.dart`
- v2 (long-form): `lib/screens/subjects/long_lesson_screen.dart`

Router decides via `lesson?['version'] == 2` on the JSONB field.

---

## What's NOT yet implemented (top of mind)

See PROJECT_STATUS.md §11 for the canonical list. Highlights:

- **PC + SVT skill maps** — only SMA and SMB are seeded.
- **Real Sentry/PostHog DSNs** — SDKs wired, accounts not provisioned.
- **Code-splitting** for the 50+ interactive widgets — currently all
  eager-loaded.
- **Arabic translation of v2 lesson content** — schema supports it,
  no content authored.
- **Real Bac PDF URLs** for SMB annales — placeholders shipped in
  migration 020.
