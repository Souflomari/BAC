# BacPrep

A Moroccan Baccalauréat exam prep app. Long-form textbook chapters,
adaptive quizzes, past exam papers (annales), and 33 native interactive
widgets for math/physics/chemistry/SVT.

**Live:** https://bacapp.vercel.app

**Status:** functional spine + 32 SMA chapters + 32 SMB chapters as v2
long-form lessons. SMA + SMB exam papers seeded for 2023–2024. Detailed
status in [PROJECT_STATUS.md](PROJECT_STATUS.md).

## Stack

| Layer | Tech |
|---|---|
| Frontend | Flutter 3.x (web + iOS/Android-ready, single codebase) |
| State | Riverpod (FutureProvider, StreamProvider, Notifier) |
| Routing | `go_router` with `ShellRoute` |
| Backend | Supabase — Postgres + Auth + Storage + Edge Functions |
| LaTeX | `flutter_math_fork` |
| Web hosting | Vercel |
| Observability | Sentry + PostHog SDKs (no-op when env unset) |

## Quick start

```powershell
# Install Flutter deps
cd mobile\bac_app
flutter pub get

# Run web in dev (replace with your Supabase project)
flutter run -d chrome `
  --dart-define=SUPABASE_URL=https://your-project.supabase.co `
  --dart-define=SUPABASE_ANON_KEY=your-anon-key
```

For production deploys, see [PROJECT_STATUS.md §9](PROJECT_STATUS.md#9-deployment-runbook).

## Repository layout

```
mobile/bac_app/        Flutter app
  lib/
    config/            Theme tokens, router
    models/            Profile, Subject, Skill, LessonV2, Item, Exam
    providers/         Riverpod providers (auth, progress, exam, ...)
    screens/           Routed screens (auth, home, subjects, lesson, exams, profile)
    services/          ApiService (Supabase wrapper), CacheService (Hive),
                       NotificationService, AnalyticsService
    widgets/           Papier design system + interactive math/physics/chemistry widgets
    l10n/              Generated AppLocalizations + .arb sources (FR + AR)
  web/                 PWA shell (index.html, manifest, robots.txt, sitemap.xml)
backend/
  supabase/
    migrations/        SQL migrations 001–020+ (idempotent, applied via supabase db push)
    functions/         Deno edge functions (progress, daily-quests, delete-self-account, ...)
  seed/                Dart scripts that emit seed migrations for content
shared/                Skill maps (per-stream JSON) + skill-map validator
PROJECT_STATUS.md      Current state, runbook, outstanding TODOs (canonical)
ARCHITECTURE.md        Subsystem overviews + how things fit together
CONTRIBUTING.md        How to run, style, tests, migrations
```

## Where to start reading code

- **Routing & app shell:** [lib/config/router.dart](mobile/bac_app/lib/config/router.dart), [lib/screens/shell/app_shell.dart](mobile/bac_app/lib/screens/shell/app_shell.dart)
- **A representative screen:** [lib/screens/subjects/long_lesson_screen.dart](mobile/bac_app/lib/screens/subjects/long_lesson_screen.dart) — the v2 lesson reader
- **A representative interactive widget:** [lib/widgets/math/derivative_graph_widget.dart](mobile/bac_app/lib/widgets/math/derivative_graph_widget.dart)
- **The Papier design system:** [lib/config/theme.dart](mobile/bac_app/lib/config/theme.dart) (color tokens), [lib/widgets/papier/papier_primitives.dart](mobile/bac_app/lib/widgets/papier/papier_primitives.dart) (text styles)
- **A migration:** [backend/supabase/migrations/014_long_lessons_sma_complete.sql](backend/supabase/migrations/014_long_lessons_sma_complete.sql)

## Status & follow-ups

PROJECT_STATUS.md §11 lists the current outstanding TODOs (e.g. PC + SVT
stream content, Arabic translation pass, real Sentry/PostHog DSN
provisioning).

## License

Private. Not yet open-sourced.
