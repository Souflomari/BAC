# BacPrep — Changelog

User-facing release notes. For commit-level history, see `git log`.

## 2026-05-09 — Integral run

### New
- **Find in chapter** (`Cmd/Ctrl + F`): a sticky search bar opens at the
  top of any long-form lesson. Matches highlight by section; ↑/↓ jump
  between matches.
- **Share** any chapter via the share icon in the lesson header. Web:
  uses native `navigator.share` if available, else copies the URL to
  the clipboard with a toast.
- **Email-verification banner**: a soft, dismissable banner appears at
  the top of every authed tab when your email isn't verified yet. Tap
  "Renvoyer" to trigger a fresh confirmation email. The router gate
  remains soft — you can still use the app while unverified.
- **A11y tooltips** added to the zoom + bound-adjust buttons in the
  function graph, area-under-curve, and complex-plane interactive
  widgets.

### Internal
- **README + ARCHITECTURE + CONTRIBUTING** docs added to the repo.
- **GitHub Actions CI** workflow lints + tests + builds web on every
  push and PR (`.github/workflows/ci.yml`).
- **Test baseline** (23 tests): models (Item, Profile, LessonV2) and
  services (CacheService).

## 2026-05-09 — Content run

### New
- **32 SMB v2 long-form lessons** (Math + Physique-Chimie). SMB
  students no longer hit placeholder cards. Migration 017.
- **129 quiz items** for the 32 SMA-specific (`sma_*`) skills that had
  zero items before. Migration 018.
- **8 SMB exam papers + 24 questions** (Math + PC × 2023+2024 ×
  normale + rattrapage). Pattern-authored. Migration 020.

## 2026-05-08 — Apple/Google polish run

- Loading skeletons across primary screens.
- ErrorRetryWidget on every error callback.
- Lesson checkpoint progress persists across sessions (migration 015).
- Page transitions (180ms fade + 4px slide) replace `NoTransitionPage`.
- Papier-styled toast widget.
- Hover lift + theme toggle in top nav.
- ProgressScreen + SettingsScreen responsive.
- New `/profile` screen.
- Global search modal (`Cmd/Ctrl + K`).
- Continue-learning card on Home.
- Lesson prev/next chapter navigation.
- Custom 404 page.
- Loader rebrand to Papier (cream + italic + ink rule).

## 2026-05-08 — Account hardening + observability

- **Verify-email screen** at `/verify-email` post-signup.
- **Profile edit** bottom sheet (display name + avatar upload via
  Supabase Storage). Migration 016.
- **Account deletion** with double-confirm and edge function
  (`delete-self-account`).
- **Stream-switch confirmation dialog**.
- **Sentry** + **PostHog** SDKs wired (no-op when env unset).
- **Print** button on long lessons (web `window.print()`).
- **Keyboard help dialog** (`?` key).
- **Mobile bottom-sheet profile menu** at width < 800.
- **Onboarding step indicator** corrected (was "2/4", now "2/2").
- **robots.txt** + **sitemap.xml** added.
- Loading + error coverage on exam + leaderboard screens.

## 2026-05-07 (and earlier) — Foundation

- 32 SMA chapters as v2 long-form lessons.
- 33 interactive widgets (math, physics, chemistry, SVT,
  animations).
- Public landing page, auth, onboarding, dashboard, lesson, session
  screens.
- Migrations 001–014.
