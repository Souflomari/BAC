# BacPrep - Go Live Guide

## Step 1: Create Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Name: `bacprep-prod`
4. Database Password: (save this securely!)
5. Region: Choose closest to Morocco (eu-west-3 is good)
6. Wait for project to be ready (~2 min)

## Step 2: Get Supabase Credentials

Once project is ready:
1. Go to Project Settings (gear icon) → API
2. Copy these values:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon/public key**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

## Step 3: Configure Flutter App

Run this command (replace with your actual values):

```powershell
cd F:\APP\mobile\bac_app

# Create .env file for build-time variables
@"
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
"@ | Out-File -FilePath ".env" -Encoding UTF8
```

Then update `lib/main.dart`:

```dart
await Supabase.initialize(
  url: const String.fromEnvironment('SUPABASE_URL'),
  anonKey: const String.fromEnvironment('SUPABASE_ANON_KEY'),
);
```

## Step 4: Run Database Migrations

In your Supabase Dashboard → SQL Editor, run these scripts in order:

1. **Migration 002**: Copy from `backend/supabase/migrations/002_bac_exams.sql`
2. **Migration 003**: Copy from `backend/supabase/migrations/003_add_interactive_item_types.sql`
3. **Migration 004**: Copy from `backend/supabase/migrations/004_exam_analytics_and_sync.sql`
4. **Seed Data**: Copy from `backend/supabase/seed_setup.sql`

Or use Supabase CLI (if installed):
```powershell
cd F:\APP\backend
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase db push
```

## Step 5: Deploy Web App

### Option A: Vercel (Recommended)

```powershell
cd F:\APP\mobile\bac_app
npm install -g vercel
vercel login
vercel --prod
```

When prompted:
- Set up and deploy? **Y**
- Which scope? Choose your account
- Link to existing project? **N**
- What's your project's name? `bacprep`
- In which directory is your code located? `build/web`
- Want to override settings? **N**

### Option B: Netlify

```powershell
cd F:\APP\mobile\bac_app
npm install -g netlify-cli
netlify login
netlify deploy --prod --dir=build/web
```

### Option C: GitHub Pages (Free)

```powershell
cd F:\APP\mobile\bac_app

# Build the web app
flutter build web --release

# Create a deployment branch
git init (if not already)
git add build/web
git commit -m "Deploy web app"
git branch -M gh-pages
git push origin gh-pages
```

Then in GitHub → Settings → Pages → Source: `gh-pages branch`

### Option D: Supabase Hosting (Beta)

```powershell
cd F:\APP\backend
supabase functions deploy --project-ref YOUR_PROJECT_REF
```

## Step 6: Build & Test Locally

```powershell
cd F:\APP\mobile\bac_app
flutter build web --release
# Then serve it
cd build/web
python -m http.server 8080
# Visit http://localhost:8080
```

## Environment Variables for Production

When deploying, set these environment variables:

| Variable | Value |
|----------|-------|
| `SUPABASE_URL` | `https://xxxxx.supabase.co` |
| `SUPABASE_ANON_KEY` | `your-anon-key` |

## Post-Deployment Checklist

- [ ] Users can register/login
- [ ] Exams are visible in /exams
- [ ] Interactive widgets work
- [ ] Database has seed data (39 exams, 10+ questions)
- [ ] Analytics dashboard accessible
- [ ] Mobile responsive (test on phone)

## Quick Deploy (All-in-One Script)

Run this for a complete local setup:

```powershell
cd F:\APP\mobile\bac_app

# Build release
flutter build web --release

# Start local server
cd build/web
python -m http.server 8080
Write-Host "App running at http://localhost:8080"
Write-Host "Or try http://10.3.150.17:8080 from other devices"
```

## Your Live URL

After deployment, your app will be at:
- **Vercel**: `https://bacprep.vercel.app`
- **Netlify**: `https://bacprep.netlify.app`
- **GitHub Pages**: `https://yourusername.github.io/bacprep`
- **Supabase**: Via Supabase Studio

---

**Next: Run the setup and get your live URL!**
