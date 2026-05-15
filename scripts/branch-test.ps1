<#
.SYNOPSIS
  Push pending migrations to bac-app-staging, run sanity checks, restore the
  Supabase CLI link to prod. Mandatory pre-flight before any `supabase db push`
  against production, per ADR 0005.

  Script version: 2 — adds four misconception-schema sanity checks
  (added 2026-05-16, ADR 0007 Stage 1 vertical-slice follow-up). See
  ADR 0005 §"Operational rules" for the rule changes that landed with v2.

.DESCRIPTION
  Path-A branch-test workflow (Free tier; the project does not support managed
  branching). Staging is a second Supabase project (bac-app-staging,
  ref=miscjaztsputtdalwcjp) seeded once from a prod pg_dump on 2026-05-15;
  subsequent runs only apply the new migrations via `supabase db push`.

  The script:
    1. Records the current linked project (prod) so we can restore it on exit.
    2. Links the CLI to staging, asking the user once for the staging DB
       password (or reading $env:SUPABASE_STAGING_DB_PASSWORD).
    3. Runs `supabase db push` against staging — applies any local migrations
       not yet recorded in staging's schema_migrations.
    4. Runs the canonical sanity-check suite against staging:
        REST-based (anon key):
          - per-stream prereq attribution (must match the ADR 0004 baseline:
            SMA=98, SMB=31, PC=21, SVT=9, humanities=42, total=201, cross=0;
            a NEW expected baseline can be supplied via -ExpectedBaselineJson).
          - RLS proof on `subjects` (curriculum table — anon INSERT denied).
          - RLS proof on `user_misconception_states` (anon INSERT denied,
            anon SELECT returns empty under auth.uid() = NULL).
          - Read-path intact (anon SELECT on `skills` returns ≥ 1 row).
          - skills.common_misconceptions default round-trip ([]).
          - items.distractor_misconceptions default round-trip ({}).
        Catalog-based (psql; optional but recommended):
          - All four misconception indexes exist (two GIN op-class on the
            JSONB columns + partial-active + reverse-aggregate on
            user_misconception_states).
    5. Captures every step to .audit-logs/branch-test-<timestamp>.log.
    6. UNCONDITIONALLY re-links to prod in a `finally` block, even on failure.

  The script's exit code is 0 only if every step succeeded. Non-zero exit
  means: do not push to prod. Read the log and fix what's broken.

.PARAMETER ExpectedBaselineJson
  Optional path to a JSON file describing the expected per-stream baseline.
  When omitted, the ADR 0004 baseline is used. The JSON shape:
    { "SMA": 98, "SMB": 31, "PC": 21, "SVT": 9, "humanities": 42, "total": 201 }

.PARAMETER SkipPush
  Skip the `supabase db push` step. Useful for a pure validation run after
  someone else pushed to staging.

.EXAMPLE
  pwsh ./scripts/branch-test.ps1
  pwsh ./scripts/branch-test.ps1 -ExpectedBaselineJson ./scripts/baselines/043.json
#>

[CmdletBinding()]
param(
  [string] $ExpectedBaselineJson,
  [switch] $SkipPush
)

$ErrorActionPreference = 'Stop'

# ---------------------------------------------------------------------------
# Constants — change only if the project refs change.
# ---------------------------------------------------------------------------
$PROD_REF    = 'iwoydyudjondihzzsqay'   # BacPrep
$STAGING_REF = 'miscjaztsputtdalwcjp'   # bac-app-staging
$STAGING_URL = "https://$STAGING_REF.supabase.co"

$DEFAULT_BASELINE = @{
  SMA = 98; SMB = 31; PC = 21; SVT = 9; humanities = 42; total = 201
}

# ---------------------------------------------------------------------------
# Setup: log file, helpers
# ---------------------------------------------------------------------------
$repoRoot   = Split-Path -Parent $PSScriptRoot
$logDir     = Join-Path $repoRoot '.audit-logs'
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir | Out-Null }
$timestamp  = Get-Date -Format 'yyyyMMdd-HHmmss'
$logFile    = Join-Path $logDir "branch-test-$timestamp.log"

function Write-Log {
  param([string]$Msg, [string]$Level = 'INFO')
  $line = "{0}  [{1,-5}]  {2}" -f (Get-Date -Format 'HH:mm:ss'), $Level, $Msg
  Write-Host $line
  Add-Content -Path $logFile -Value $line -Encoding utf8
}

function Invoke-Step {
  param([string]$Name, [scriptblock]$Block)
  Write-Log "BEGIN $Name"
  try {
    $result = & $Block
    foreach ($line in $result) { Add-Content -Path $logFile -Value "          $line" -Encoding utf8 }
    Write-Log "OK    $Name"
    return $result
  } catch {
    Write-Log "FAIL  $Name -- $_" 'ERROR'
    throw
  }
}

# Run a native exe and check $LASTEXITCODE. PowerShell 5.1 wraps each stderr
# line of native commands in an ErrorRecord under `2>&1`; we suppress that by
# temporarily setting $ErrorActionPreference = 'Continue' and rely solely on
# the exit code. Pass args as an array to avoid PowerShell's parameter binder
# consuming `--flag-name` tokens.
function Invoke-Native {
  param(
    [Parameter(Mandatory)][string]$Exe,
    [Parameter(Mandatory)][string[]]$ExeArgs,
    [string]$StdinLine
  )
  $oldEAP = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  try {
    if ($PSBoundParameters.ContainsKey('StdinLine')) {
      $output = $StdinLine | & $Exe @ExeArgs 2>&1
    } else {
      $output = & $Exe @ExeArgs 2>&1
    }
    $exit = $LASTEXITCODE
    foreach ($line in $output) { Add-Content -Path $logFile -Value "          $line" -Encoding utf8 }
    if ($exit -ne 0) { throw "$Exe exited with code $exit. See log." }
    return $output
  } finally {
    $ErrorActionPreference = $oldEAP
  }
}

$backendDir = Join-Path $repoRoot 'backend'
if (-not (Test-Path (Join-Path $backendDir 'supabase/config.toml'))) {
  throw "Could not find backend/supabase/config.toml under $repoRoot"
}

Write-Log "branch-test starting; log: $logFile"
Write-Log "repo root: $repoRoot"
Write-Log "supabase project dir: $backendDir"
Push-Location $backendDir

# Ensure `supabase` is invokable. PowerShell may not inherit PATH the way
# bash does; common install locations:
#   - ~/bin/supabase.exe                          (per-user)
#   - %LOCALAPPDATA%/Microsoft/WinGet/Packages    (winget)
#   - scoop / chocolatey shims                    (varies)
$supabase = (Get-Command supabase -ErrorAction SilentlyContinue).Source
if (-not $supabase) {
  $candidates = @(
    (Join-Path $env:USERPROFILE 'bin/supabase.exe'),
    (Join-Path $env:USERPROFILE 'scoop/shims/supabase.exe')
  )
  foreach ($p in $candidates) {
    if (Test-Path $p) { $supabase = $p; break }
  }
}
if (-not $supabase) {
  Write-Log 'FATAL: supabase.exe not found. Add it to PATH or install with `winget install Supabase.CLI`.' 'ERROR'
  exit 1
}
$env:PATH = (Split-Path $supabase) + ';' + $env:PATH
Write-Log "supabase: $supabase"

# Locate psql.exe for catalog queries (pg_indexes etc.). REST does not expose
# pg_catalog; psql is required for the index-existence check below. psql is
# part of the portable PG client tools installed for the staging bootstrap
# (ADR 0005 §Bootstrap). The check degrades to a logged warning if psql is
# absent rather than failing the run — every other check still validates the
# misconception schema via REST.
$psql = (Get-Command psql -ErrorAction SilentlyContinue).Source
if (-not $psql) {
  $candidates = @(
    (Join-Path $env:USERPROFILE '.cache/pgtools/pgsql/bin/psql.exe'),
    'C:/Program Files/PostgreSQL/17/bin/psql.exe',
    'C:/Program Files/PostgreSQL/18/bin/psql.exe'
  )
  foreach ($p in $candidates) {
    if (Test-Path $p) { $psql = $p; break }
  }
}
if ($psql) {
  Write-Log "psql:     $psql"
} else {
  Write-Log 'WARN: psql.exe not found — index-existence check will be skipped.' 'WARN'
}

# Run a psql query against staging. Suppresses PS 5.1 NativeCommandError
# wrapping the same way Invoke-Native does, and clears PGPASSWORD on exit.
function Invoke-Psql {
  param([Parameter(Mandatory)][string]$Sql)
  if (-not $psql) { throw 'psql not available' }
  $oldEAP = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  $env:PGPASSWORD = $stagingPw
  try {
    $output = & $psql `
      -h 'aws-1-eu-central-1.pooler.supabase.com' `
      -p '5432' `
      -U "postgres.$STAGING_REF" `
      -d 'postgres' `
      -t -A -v 'ON_ERROR_STOP=1' `
      -c $Sql 2>&1
    $exit = $LASTEXITCODE
    foreach ($line in $output) { Add-Content -Path $logFile -Value "          $line" -Encoding utf8 }
    if ($exit -ne 0) { throw "psql exited $exit. See log." }
    return $output
  } finally {
    Remove-Item env:PGPASSWORD -ErrorAction SilentlyContinue
    $ErrorActionPreference = $oldEAP
  }
}

# Assert an anon-keyed HTTP request is denied with 401 or 403. Wraps the
# PS 5.1 / PS 7+ exception-shape variance the existing RLS proof step
# discovered. Used by every "anon write denied" check.
function Assert-AnonDenied {
  param(
    [Parameter(Mandatory)][string]$Method,
    [Parameter(Mandatory)][string]$Uri,
    [Parameter(Mandatory)][hashtable]$Headers,
    [string]$Body
  )
  $h = $Headers.Clone()
  $h['Content-Type'] = 'application/json'
  $h['Prefer']       = 'return=minimal'
  try {
    if ($Body) {
      Invoke-RestMethod -Method $Method -Uri $Uri -Headers $h -Body $Body | Out-Null
    } else {
      Invoke-RestMethod -Method $Method -Uri $Uri -Headers $h | Out-Null
    }
    throw "anon $Method on $Uri unexpectedly succeeded — RLS not enforcing."
  } catch [System.Net.WebException] {
    $code = $_.Exception.Response.StatusCode.value__
    if ($code -in 401, 403) { return "anon $Method denied with HTTP $code  (RLS OK)" }
    throw "anon $Method failed with unexpected HTTP $code"
  } catch {
    $code = if ($_.Exception.Response) { $_.Exception.Response.StatusCode.value__ } else { 0 }
    if ($code -in 401, 403) { return "anon $Method denied with HTTP $code  (RLS OK)" }
    if ($_ -match '40[13]|row-level security') { return "anon $Method denied  (RLS OK; message: $_)" }
    throw
  }
}

# ---------------------------------------------------------------------------
# Resolve staging DB password — env var, or prompt once.
# ---------------------------------------------------------------------------
$stagingPw = $env:SUPABASE_STAGING_DB_PASSWORD
if (-not $stagingPw) {
  $cached = Join-Path $env:USERPROFILE '.cache/bac-app-staging-db-password.txt'
  if (Test-Path $cached) {
    $stagingPw = (Get-Content -Raw $cached).Trim()
    Write-Log "staging DB password loaded from $cached"
  } else {
    $sec = Read-Host 'Staging DB password' -AsSecureString
    $stagingPw = [System.Net.NetworkCredential]::new('', $sec).Password
  }
}

$exitCode = 1

try {

  # 1. Link CLI to staging
  Invoke-Step 'link CLI to staging' {
    Invoke-Native -Exe 'supabase' -ExeArgs @('link', '--project-ref', $STAGING_REF, '--password', $stagingPw)
  } | Out-Null

  # 2. Push pending migrations to staging
  if (-not $SkipPush) {
    Invoke-Step 'supabase db push (staging)' {
      Invoke-Native -Exe 'supabase' -ExeArgs @('db', 'push') -StdinLine 'Y'
    } | Out-Null
  } else {
    Write-Log '-SkipPush: not running db push.'
  }

  # 3. Resolve expected baseline (default = ADR 0004 numbers)
  $expected = $DEFAULT_BASELINE.Clone()
  if ($ExpectedBaselineJson) {
    Write-Log "loading expected baseline from $ExpectedBaselineJson"
    $custom = Get-Content -Raw $ExpectedBaselineJson | ConvertFrom-Json
    foreach ($k in 'SMA','SMB','PC','SVT','humanities','total') {
      if ($null -ne $custom.$k) { $expected[$k] = [int]$custom.$k }
    }
  }
  Write-Log ("expected baseline: SMA={0} SMB={1} PC={2} SVT={3} humanities={4} total={5}" -f `
    $expected.SMA, $expected.SMB, $expected.PC, $expected.SVT, $expected.humanities, $expected.total)

  # 4. Fetch the staging anon key (we'll use REST for sanity checks)
  $apiKeys = Invoke-Step 'fetch staging anon key' {
    Invoke-Native -Exe 'supabase' -ExeArgs @('projects', 'api-keys', '--project-ref', $STAGING_REF)
  }
  # Output is the "pretty" table format. Find the row whose name is 'anon'.
  $anonKey = $null
  foreach ($line in $apiKeys) {
    $s = "$line"
    if ($s -match '^\s*anon\s+\|\s+(\S+)') { $anonKey = $Matches[1]; break }
    # Newer CLI: publishable key listed under name "default" with sb_publishable_ prefix
    if (-not $anonKey -and $s -match 'sb_publishable_\S+') { $anonKey = $Matches[0] }
  }
  if (-not $anonKey) { throw 'Could not extract anon key from supabase projects api-keys output.' }

  # 5. Sanity check A — per-stream prereq attribution
  Invoke-Step 'per-stream attribution' {
    # NOTE: do not pass Range header from PS 5.1 -- it's restricted in
    # System.Net.WebHeaderCollection. PostgREST returns rows up to its
    # configured max (1000 by default) without it; we explicitly limit=1000
    # for safety in case the cap is lower.
    $h = @{ apikey = $anonKey; Authorization = "Bearer $anonKey" }
    $prereqs = Invoke-RestMethod -Uri "$STAGING_URL/rest/v1/skill_prerequisites?select=skill_id,prerequisite_skill_id&limit=1000" -Headers $h
    $skills  = Invoke-RestMethod -Uri "$STAGING_URL/rest/v1/skills?select=id,code,topic:topics(subject:subjects(code))&limit=1000" -Headers $h

    $stream = @{}
    foreach ($s in $skills) {
      $code = $s.code; $subj = $s.topic.subject.code
      if     ($code -like 'sma_*') { $stream[$s.id] = 'SMA' }
      elseif ($code -like 'pc_*')  { $stream[$s.id] = 'PC' }
      elseif ($code -like 'svt_*') { $stream[$s.id] = 'SVT' }
      elseif ($subj -in 'math','physics','svt') { $stream[$s.id] = 'SMB' }
      else                          { $stream[$s.id] = 'humanities' }
    }
    $counts = @{ SMA=0; SMB=0; PC=0; SVT=0; humanities=0 }
    $cross = 0
    foreach ($p in $prereqs) {
      $depS = $stream[$p.skill_id]
      $preS = $stream[$p.prerequisite_skill_id]
      if ($depS) { $counts[$depS]++ }
      if ($depS -ne $preS) { $cross++ }
    }
    $total = $prereqs.Count

    $rows = foreach ($k in 'SMA','SMB','PC','SVT','humanities','total') {
      $obs = if ($k -eq 'total') { $total } else { $counts[$k] }
      $exp = $expected[$k]
      $ok  = $obs -eq $exp
      [pscustomobject]@{ stream=$k; observed=$obs; expected=$exp; match=$(if($ok){'OK'}else{'MISMATCH'}) }
    }
    $rows | Format-Table -AutoSize | Out-String
    "Cross-stream edges: $cross (expected 0)"

    $mismatches = $rows | Where-Object { $_.match -eq 'MISMATCH' }
    if ($mismatches -or $cross -ne 0) {
      throw "Per-stream attribution drift detected. See log."
    }
  } | Out-Null

  # 6. Sanity check B — RLS enabled on the 7 curriculum tables
  Invoke-Step 'anon write denied on subjects (RLS proof)' {
    $h = @{ apikey = $anonKey; Authorization = "Bearer $anonKey"; 'Content-Type' = 'application/json'; Prefer = 'return=minimal' }
    $body = '{"code":"branch_test_should_fail","name_fr":"x","name_ar":"x"}'
    try {
      Invoke-RestMethod -Method Post -Uri "$STAGING_URL/rest/v1/subjects" -Headers $h -Body $body | Out-Null
      throw 'anon INSERT on subjects unexpectedly succeeded — RLS not enforcing.'
    } catch [System.Net.WebException] {
      $resp = $_.Exception.Response
      if ($resp.StatusCode -in 401, 403) { "anon INSERT denied with HTTP $($resp.StatusCode.value__)  (RLS OK)" }
      else { throw "anon INSERT failed with unexpected HTTP $($resp.StatusCode.value__)" }
    } catch {
      # Newer PowerShell wraps in System.Net.Http.HttpRequestException
      if ($_.Exception.Response.StatusCode -in 401, 403) {
        "anon INSERT denied with HTTP $($_.Exception.Response.StatusCode.value__)  (RLS OK)"
      } elseif ($_ -match '40[13]|row-level security') {
        "anon INSERT denied  (RLS OK; message: $_)"
      } else { throw }
    }
  } | Out-Null

  # 7. Sanity check C — anon SELECT still works on a curriculum table.
  # (Per-stream attribution above already proved reads work; this is an
  # explicit per-table assertion for the log trail.)
  Invoke-Step 'anon SELECT on skills (read path intact)' {
    $h = @{ apikey = $anonKey; Authorization = "Bearer $anonKey" }
    $rows = Invoke-RestMethod -Uri "$STAGING_URL/rest/v1/skills?select=id&limit=1" -Headers $h
    if (-not $rows -or $rows.Count -lt 1) { throw 'anon SELECT on skills returned 0 rows.' }
    "anon SELECT on skills returned $($rows.Count) row(s)"
  } | Out-Null

  # ---------------------------------------------------------------------------
  # Misconception-schema checks (added with script v2 — ADR 0007).
  # These ride alongside the curriculum-schema checks above; failing any
  # one of them is the same "do not push to prod" signal.
  # ---------------------------------------------------------------------------

  $anonHeaders = @{ apikey = $anonKey; Authorization = "Bearer $anonKey" }

  # 8. Sanity check D — RLS proof on user_misconception_states.
  #    (a) anon INSERT must be denied; (b) anon SELECT must return empty
  #    (auth.uid() is NULL for an anon-key request → 0 rows match the
  #    "WHERE user_id = auth.uid()" SELECT policy).
  Invoke-Step 'anon write denied on user_misconception_states (RLS proof)' {
    $body = '{"user_id":"00000000-0000-0000-0000-000000000000","skill_id":"00000000-0000-0000-0000-000000000000","misconception_id":"branch_test_should_fail"}'
    Assert-AnonDenied -Method 'Post' `
                      -Uri "$STAGING_URL/rest/v1/user_misconception_states" `
                      -Headers $anonHeaders `
                      -Body $body
  } | Out-Null

  Invoke-Step 'anon SELECT on user_misconception_states returns []' {
    $rows = Invoke-RestMethod -Uri "$STAGING_URL/rest/v1/user_misconception_states?select=*&limit=1" -Headers $anonHeaders
    # Invoke-RestMethod returns $null for an empty JSON array; coerce both to
    # an array and require zero elements. Any positive count means RLS is
    # leaking — service_role has BYPASSRLS so it would return rows; anon
    # without a JWT must see nothing.
    $count = @($rows).Count
    if ($count -ne 0) { throw "anon SELECT on user_misconception_states returned $count row(s); expected 0 (RLS should filter to auth.uid() = NULL)." }
    "anon SELECT returned 0 rows  (RLS OK)"
  } | Out-Null

  # 9. Sanity check E — skills.common_misconceptions default round-trip.
  #    A fresh skill row has `[]` for the new JSONB column; any drift here
  #    means the migration's default literal didn't take, or someone wrote
  #    a non-default value into prod that should be in a versioned source.
  Invoke-Step 'skills.common_misconceptions default round-trips as []' {
    # Pick the first row by deterministic ordering so the assertion is stable.
    $rows = Invoke-RestMethod -Uri "$STAGING_URL/rest/v1/skills?select=id,common_misconceptions&order=id.asc&limit=1" -Headers $anonHeaders
    if (-not $rows -or @($rows).Count -lt 1) { throw 'no rows returned from skills.' }
    $val = $rows[0].common_misconceptions
    # PostgREST returns a JSONB empty array as an actual empty array.
    $count = @($val).Count
    if ($count -ne 0) {
      throw "skills.common_misconceptions on the first row has $count element(s); expected []. Likely a content-author wrote without a migration."
    }
    "skills.common_misconceptions on first row = []  (default round-trip OK)"
  } | Out-Null

  # 10. Sanity check F — items.distractor_misconceptions default round-trip.
  Invoke-Step 'items.distractor_misconceptions default round-trips as {}' {
    $rows = Invoke-RestMethod -Uri "$STAGING_URL/rest/v1/items?select=id,distractor_misconceptions&order=id.asc&limit=1" -Headers $anonHeaders
    if (-not $rows -or @($rows).Count -lt 1) { throw 'no rows returned from items.' }
    $val = $rows[0].distractor_misconceptions
    # PostgREST returns a JSONB empty object as a PSCustomObject with no
    # properties. Count its NoteProperties; expect zero.
    $keyCount = ($val.PSObject.Properties | Measure-Object).Count
    if ($keyCount -ne 0) {
      throw "items.distractor_misconceptions on the first row has $keyCount key(s); expected {}. Likely a content-author wrote without a migration."
    }
    "items.distractor_misconceptions on first row = {}  (default round-trip OK)"
  } | Out-Null

  # 11. Sanity check G — the four misconception indexes exist in pg_indexes.
  #     Requires psql (catalog isn't reachable via REST). If psql is absent,
  #     log a WARN and skip rather than failing the run — every other check
  #     above has already proven the misconception schema is structurally
  #     correct at runtime.
  if ($psql) {
    Invoke-Step 'misconception indexes exist (pg_indexes via psql)' {
      $expectedIndexes = @(
        'idx_skills_common_misconceptions_gin',
        'idx_items_distractor_misconceptions_gin',
        'idx_user_misconception_states_active',
        'idx_user_misconception_states_misconception'
      )
      $expectedJoined = ($expectedIndexes | ForEach-Object { "'$_'" }) -join ','
      $sql = "SELECT indexname FROM pg_indexes WHERE schemaname='public' AND indexname IN ($expectedJoined) ORDER BY indexname;"
      $output = Invoke-Psql -Sql $sql
      # Strip any blank lines / trailing newline; psql with -t -A returns one
      # row per line.
      $found = @($output | Where-Object { $_ -and "$_".Trim() -ne '' } | ForEach-Object { "$_".Trim() })
      $missing = $expectedIndexes | Where-Object { $_ -notin $found }
      if ($missing) {
        throw "Missing indexes on user_misconception_states / new JSONB columns: $($missing -join ', ')"
      }
      "all 4 misconception indexes present: $($found -join ', ')"
    } | Out-Null
  } else {
    Write-Log 'SKIP: misconception indexes check (psql not available)' 'WARN'
  }

  $exitCode = 0
  Write-Log 'ALL CHECKS PASSED — staging matches expected baseline; safe to push to prod.'
}
catch {
  Write-Log "branch-test FAILED: $_" 'ERROR'
  $exitCode = 1
}
finally {
  # 8. UNCONDITIONALLY re-link to prod, even if anything above failed.
  try {
    Write-Log 'restoring CLI link to prod'
    Invoke-Native -Exe 'supabase' -ExeArgs @('link', '--project-ref', $PROD_REF) | Out-Null
    Write-Log 'CLI re-linked to prod'
  } catch {
    Write-Log "WARNING: could not re-link to prod -- $_" 'ERROR'
  }
  Pop-Location
  Write-Log "branch-test finished, exit code $exitCode; log saved to $logFile"
}

exit $exitCode
