# BacPrep — Web deploy script
# Usage:
#   .\deploy.ps1                   # uses .env.production
#   .\deploy.ps1 -Preview          # deploys to preview URL (not production)
#
# Requires:
#   - flutter on PATH (or set $env:FLUTTER_HOME)
#   - vercel CLI installed:  npm i -g vercel
#   - .env.production file in this directory with:
#       SUPABASE_URL=https://xxx.supabase.co
#       SUPABASE_ANON_KEY=eyJhbGciOi...

param(
    [switch]$Preview = $false,
    [string]$EnvFile = ".env.production"
)

$ErrorActionPreference = "Stop"

# ---- Resolve flutter ----
$flutter = if ($env:FLUTTER_HOME) { Join-Path $env:FLUTTER_HOME 'bin\flutter.bat' } else { 'C:\flutter\bin\flutter.bat' }
if (-not (Test-Path $flutter)) {
    $cmd = Get-Command flutter -ErrorAction SilentlyContinue
    if ($cmd) { $flutter = $cmd.Source } else { throw "flutter not found. Set `$env:FLUTTER_HOME or install at C:\flutter." }
}

# ---- Load env file ----
if (-not (Test-Path $EnvFile)) {
    throw "$EnvFile not found. Copy .env.example to $EnvFile and fill in your Supabase prod values."
}

$envVars = @{}
Get-Content $EnvFile | ForEach-Object {
    $line = $_.Trim()
    if ($line -and -not $line.StartsWith('#')) {
        $idx = $line.IndexOf('=')
        if ($idx -gt 0) {
            $key = $line.Substring(0, $idx).Trim()
            $value = $line.Substring($idx + 1).Trim().Trim('"').Trim("'")
            $envVars[$key] = $value
        }
    }
}

if (-not $envVars.ContainsKey('SUPABASE_URL') -or -not $envVars.ContainsKey('SUPABASE_ANON_KEY')) {
    throw "$EnvFile must define SUPABASE_URL and SUPABASE_ANON_KEY."
}

Write-Host "==> Building Flutter web (release)..." -ForegroundColor Cyan
Write-Host "    SUPABASE_URL = $($envVars['SUPABASE_URL'])"

& $flutter build web --release `
    --dart-define=SUPABASE_URL=$($envVars['SUPABASE_URL']) `
    --dart-define=SUPABASE_ANON_KEY=$($envVars['SUPABASE_ANON_KEY'])

if ($LASTEXITCODE -ne 0) {
    throw "flutter build failed."
}

Write-Host ""
Write-Host "==> Deploying to Vercel..." -ForegroundColor Cyan

$vercelArgs = @('--yes')
if (-not $Preview) {
    $vercelArgs += '--prod'
}

$vercelCmd = "C:\Users\soufiane.lomari\AppData\Local\ms-playwright-go\1.50.1\vercel.cmd"
& $vercelCmd @vercelArgs

Write-Host ""
Write-Host "==> Done." -ForegroundColor Green
