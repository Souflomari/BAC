# BacPrep — Launch Day Checklist

Goal: get a working public URL today on Vercel + production Supabase.

> Your existing project ref appears to be `iwoydyudjondihzzsqay` (referenced in `backend/seed/seed_remote.sh`). Replace below if different.

---

## Step 1 — Apply backend migrations (5 min)

```bash
cd backend/supabase
supabase link --project-ref iwoydyudjondihzzsqay   # use your project ref
supabase db push
```

This applies all 6 migrations to production:
- 001_initial_schema.sql
- 002_bac_exams.sql
- 003_add_interactive_item_types.sql
- 004_exam_analytics_and_sync.sql
- 005_rpc_functions.sql           ← atomic XP / activity / session updates (NEW)
- 006_daily_quests.sql             ← daily quests table + increment RPC (NEW)

> If your project already had 001-004 applied previously, `db push` will skip them and only apply 005 + 006.

If you haven't seeded curriculum content yet (subjects, topics, skills, items, past exams):
```bash
cd ../seed
export SUPABASE_ACCESS_TOKEN="<your_personal_access_token_from_supabase_dashboard>"
bash seed_remote.sh
```

This seeds: structural data + 78 content files (math, physics, SVT, philosophy, arabic, french, english, accounting, business, econ, engineering, etc.) and past Bac exam questions.

## Step 2 — Deploy edge functions (2 min)

```bash
supabase functions deploy next-session
supabase functions deploy submit-answer
supabase functions deploy progress
supabase functions deploy daily-quests
```

(Optional, if used) `exam-analytics`.

## Step 3 — Configure local env (1 min)

From the Supabase dashboard → Project Settings → API, copy:
- Project URL (e.g., `https://abcd1234.supabase.co`)
- `anon` public key

Then in `mobile/bac_app/`:
```bash
cp .env.example .env.production
# Edit .env.production, paste in URL and anon key
```

## Step 4 — Install Vercel CLI (1 min)

```bash
npm i -g vercel
vercel login
```

## Step 5 — Deploy (2 min)

From `mobile/bac_app/`:
```bash
.\deploy.ps1
```

The script:
1. Reads `.env.production`
2. Runs `flutter build web --release` with the values injected via `--dart-define`
3. Calls `vercel --prod` to deploy `build/web/`

You'll get a URL like `https://bacprep-xyz.vercel.app`. **That's your live site.**

## Step 6 — Smoke test (5 min)

Open the URL in an incognito window and verify:

- [ ] Splash → login screen loads
- [ ] Sign up with a new email
- [ ] Onboarding completes (stream → exam date → start)
- [ ] Home shows daily quests + exam readiness card
- [ ] Tap "Start session" → questions render
- [ ] Answer one question → XP increments, explanation panel shows
- [ ] Switch to dark mode (Settings → Theme → Dark)
- [ ] Switch language to Arabic → RTL layout works
- [ ] Sign out → splash → login

## Step 7 — Tell people (after smoke test passes)

Share the Vercel URL. Custom domain (`bacprep.ma` etc.) is a 10-min job for later — you don't need it for v1.

---

## Troubleshooting

**"Failed to fetch" / network errors after sign-up**
→ Supabase URL or anon key wrong in `.env.production`. Double-check, rebuild.

**"relation does not exist" errors**
→ Migrations not applied. Re-run `supabase db push`.

**Daily quests don't load on home**
→ `daily-quests` edge function not deployed. Re-run `supabase functions deploy daily-quests`.

**Edge function errors mentioning `increment_xp`**
→ Migration 005 not applied. Re-run `supabase db push`.

**RLS blocking everything**
→ Make sure your auth user signed in successfully (check browser DevTools → Application → Local Storage for `sb-…-auth-token`).

---

## Subsequent deploys

Just run `.\deploy.ps1` again. Vercel keeps the same project, just bumps the version.

For a preview URL (not promoted to prod):
```bash
.\deploy.ps1 -Preview
```
