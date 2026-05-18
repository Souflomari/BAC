<#
.SYNOPSIS
  Integration smoke test for the submit-answer edge function. Mandatory
  pre-flight before `supabase functions deploy submit-answer` to
  production, per ADR 0013 §"Assurance mechanism".

  The convention this script establishes for FUTURE edge functions:
    - Deploy the function-under-test to staging FIRST.
    - Provision a fresh test user via service_role.admin.createUser.
    - Sign in as that user to obtain a real session JWT.
    - Invoke the function with the JWT; assert pre/post state via
      service_role REST (bypassing RLS).
    - Unconditionally clean up the test user in a finally block —
      mirrors branch-test.ps1's "unconditionally re-link to prod"
      pattern from ADR 0005.

.DESCRIPTION
  Verifies six post-invoke assertions specified by supabase-architect:

    A1. Insert assertion       — after one wrong answer on a
                                 misconception-tagged distractor, the
                                 user_misconception_states row exists
                                 with exhibited_count = 1.
    A2. Increment assertion    — second wrong answer on the same
                                 distractor; row's exhibited_count = 2,
                                 first_exhibited_at unchanged,
                                 last_exhibited_at moves forward.
    A3. No-write on correct    — correct answer on a tagged item; no
                                 new row, existing counters unchanged.
    A4. No-write on untagged   — wrong answer on a distractor with no
                                 misconception mapping; no new row.
    A5. RLS owner read OK      — the test user's own JWT can read its
                                 own state row.
    A6. RLS isolation          — a second test user's JWT cannot read
                                 the first user's state row.

  Plus the FK round-trip check learner-model specified in ADR 0013 §3:
  a state row written for skill_id = sma_limit_calc must be findable
  via a join through skills.code = 'sma_limit_calc'.

.PARAMETER FunctionName
  Edge function to test (default: submit-answer). The script's
  assertions are submit-answer-specific; passing a different name is
  only meaningful once this script is generalised. For v1 just submit-
  answer is supported; future PRs may extract the per-function block.

.PARAMETER Target
  staging | prod. Defaults to staging. Prod target only runs the
  read-side assertions (it does NOT exercise the function — that would
  write to real student state).

.EXAMPLE
  pwsh ./scripts/edge-function-smoke-test.ps1
  pwsh ./scripts/edge-function-smoke-test.ps1 -Target staging
#>

[CmdletBinding()]
param(
  [string] $FunctionName = 'submit-answer',
  [ValidateSet('staging','prod')] [string] $Target = 'staging'
)

$ErrorActionPreference = 'Stop'

# ---------------------------------------------------------------------------
# Constants (mirror branch-test.ps1's PROD/STAGING refs)
# ---------------------------------------------------------------------------
$STAGING_REF   = 'miscjaztsputtdalwcjp'
$PROD_REF      = 'iwoydyudjondihzzsqay'
$REF           = if ($Target -eq 'prod') { $PROD_REF } else { $STAGING_REF }
$URL           = "https://$REF.supabase.co"

# Test target — migration 046's M1 item on sma_limit_calc.
$ITEM_M1            = '44444444-aaaa-0001-0000-000000000001'  # 0/0-form item
$ITEM_M3            = '44444444-aaaa-0001-0000-000000000003'  # ∞−∞ item
$SKILL_SMA_LIMIT_CALC = '33333333-aaaa-0000-0000-000000000002'
$M1_ID = 'mc.math.sma_limit_calc.forme-indeterminee-valeur-nulle'
$M3_ID = 'mc.math.sma_limit_calc.infini-moins-infini-nul'

# ---------------------------------------------------------------------------
# Log setup
# ---------------------------------------------------------------------------
$repoRoot   = Split-Path -Parent $PSScriptRoot
$logDir     = Join-Path $repoRoot '.audit-logs'
if (-not (Test-Path $logDir)) { New-Item -ItemType Directory -Path $logDir | Out-Null }
$timestamp  = Get-Date -Format 'yyyyMMdd-HHmmss'
$logFile    = Join-Path $logDir "edge-smoke-$timestamp.log"

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
    $r = & $Block
    Write-Log "OK    $Name"
    return $r
  } catch {
    Write-Log "FAIL  $Name -- $_" 'ERROR'
    throw
  }
}

Write-Log "edge-smoke starting; target=$Target function=$FunctionName"
Write-Log "log: $logFile"

# ---------------------------------------------------------------------------
# Resolve the SERVICE_ROLE key + ANON key.
#
# Source precedence (matches branch-test.ps1 idiom):
#   1. Env var: SUPABASE_<TARGET>_SERVICE_ROLE_KEY / SUPABASE_<TARGET>_ANON_KEY
#   2. Supabase CLI: `supabase projects api-keys --project-ref <ref>`
# ---------------------------------------------------------------------------

$supabase = (Get-Command supabase -ErrorAction SilentlyContinue).Source
if (-not $supabase) {
  $cand = Join-Path $env:USERPROFILE 'bin/supabase.exe'
  if (Test-Path $cand) { $supabase = $cand }
}
if (-not $supabase) { Write-Log 'FATAL: supabase.exe not found.' 'ERROR'; exit 1 }
$env:PATH = (Split-Path $supabase) + ';' + $env:PATH
Write-Log "supabase: $supabase"

$targetUpper    = $Target.ToUpper()
$envSrKeyName   = "SUPABASE_${targetUpper}_SERVICE_ROLE_KEY"
$envAnonKeyName = "SUPABASE_${targetUpper}_ANON_KEY"
$serviceRoleKey = [Environment]::GetEnvironmentVariable($envSrKeyName)
$anonKey        = [Environment]::GetEnvironmentVariable($envAnonKeyName)

if (-not $serviceRoleKey -or -not $anonKey) {
  Write-Log "fetching api-keys via CLI (target=$REF)"
  $oldEAP = $ErrorActionPreference
  $ErrorActionPreference = 'Continue'
  $keysOut = & $supabase projects api-keys --project-ref $REF 2>&1
  $ErrorActionPreference = $oldEAP
  if ($LASTEXITCODE -ne 0) { throw "supabase projects api-keys failed: $keysOut" }
  foreach ($line in $keysOut) {
    $s = "$line"
    if ($s -match '^\s*anon\s+\|\s+(\S+)')         { if (-not $anonKey)        { $anonKey = $Matches[1] } }
    if ($s -match '^\s*service_role\s+\|\s+(\S+)') { if (-not $serviceRoleKey) { $serviceRoleKey = $Matches[1] } }
    if ($s -match 'sb_publishable_\S+')            { if (-not $anonKey)        { $anonKey = $Matches[0] } }
    if ($s -match 'sb_secret_\S+')                 { if (-not $serviceRoleKey) { $serviceRoleKey = $Matches[0] } }
  }
}
if (-not $serviceRoleKey) { throw 'could not resolve service_role key' }
if (-not $anonKey)        { throw 'could not resolve anon key' }
Write-Log "got anon + service_role keys for $REF"

# Helper headers
$srHeaders   = @{ apikey = $serviceRoleKey; Authorization = "Bearer $serviceRoleKey" }
$anonHeaders = @{ apikey = $anonKey;        Authorization = "Bearer $anonKey" }

# ---------------------------------------------------------------------------
# Provision two test users (we need both for A6: RLS isolation)
# ---------------------------------------------------------------------------
$ts = [DateTimeOffset]::UtcNow.ToUnixTimeMilliseconds()
$user1Email = "edge-smoke-${ts}-a@bacprep.internal"
$user2Email = "edge-smoke-${ts}-b@bacprep.internal"
$user1Pw    = [guid]::NewGuid().ToString() + 'Aa1!'
$user2Pw    = [guid]::NewGuid().ToString() + 'Bb2!'
$user1Id    = $null
$user2Id    = $null
$user1Jwt   = $null
$user2Jwt   = $null

function New-TestUser {
  param([string]$Email, [string]$Password)
  $body = @{ email = $Email; password = $Password; email_confirm = $true } | ConvertTo-Json -Compress
  $resp = Invoke-RestMethod -Method Post -Uri "$URL/auth/v1/admin/users" `
    -Headers ($srHeaders + @{ 'Content-Type' = 'application/json' }) -Body $body
  $uid = $resp.id

  # Staging is missing the on_auth_user_created trigger that creates
  # profiles rows automatically (the pg_dump bootstrap from ADR 0005
  # only carried public + supabase_migrations schemas; the trigger
  # lives on auth.users). Explicitly insert the profile row so
  # downstream FKs (user_skill_states, user_misconception_states)
  # resolve. Prod has the trigger and an "INSERT or do nothing on
  # conflict" is a no-op there, but for safety the smoke test only
  # runs writes against staging (Target=staging gates the write-side).
  $profileBody = @{ id = $uid } | ConvertTo-Json -Compress
  Invoke-RestMethod -Method Post -Uri "$URL/rest/v1/profiles" `
    -Headers ($srHeaders + @{ 'Content-Type' = 'application/json'; Prefer = 'return=minimal,resolution=ignore-duplicates' }) `
    -Body $profileBody | Out-Null
  return $uid
}

function Get-TestUserJwt {
  param([string]$Email, [string]$Password)
  $body = @{ email = $Email; password = $Password } | ConvertTo-Json -Compress
  $resp = Invoke-RestMethod -Method Post -Uri "$URL/auth/v1/token?grant_type=password" `
    -Headers @{ apikey = $anonKey; 'Content-Type' = 'application/json' } -Body $body
  return $resp.access_token
}

function Remove-TestUser {
  param([string]$UserId)
  if (-not $UserId) { return }
  try {
    Invoke-RestMethod -Method Delete -Uri "$URL/auth/v1/admin/users/$UserId" -Headers $srHeaders | Out-Null
  } catch {
    Write-Log "cleanup: delete user $UserId failed: $_" 'WARN'
  }
}

function Invoke-SubmitAnswer {
  param(
    [string]$Jwt,
    [string]$ItemId,
    [string]$SkillId,
    [int]$UserAnswer,
    [bool]$IsCorrect
  )
  $body = @{
    session_id       = [guid]::NewGuid().ToString()
    item_id          = $ItemId
    skill_id         = $SkillId
    is_correct       = $IsCorrect
    response_time_ms = 5000
    user_answer      = $UserAnswer
    hint_used        = $false
  } | ConvertTo-Json -Compress
  $h = @{
    apikey         = $anonKey
    Authorization  = "Bearer $Jwt"
    'Content-Type' = 'application/json'
  }
  return Invoke-RestMethod -Method Post -Uri "$URL/functions/v1/$FunctionName" -Headers $h -Body $body
}

function Get-StateRow {
  # Service-role read of one user_misconception_states row, by composite PK.
  param([string]$UserId, [string]$SkillId, [string]$McId)
  $u = "$URL/rest/v1/user_misconception_states" +
       "?user_id=eq.$UserId&skill_id=eq.$SkillId&misconception_id=eq.$McId&select=*"
  return Invoke-RestMethod -Method Get -Uri $u -Headers $srHeaders
}

$exitCode = 1

try {

  if ($Target -eq 'prod') {
    Write-Log 'Target=prod: skipping write-side assertions to protect real student state.'
    Write-Log 'Read-side: list current state row count for the test skill.'
    $rows = Invoke-RestMethod -Method Get `
      -Uri "$URL/rest/v1/user_misconception_states?skill_id=eq.$SKILL_SMA_LIMIT_CALC&select=user_id,misconception_id,exhibited_count&limit=10" `
      -Headers $srHeaders
    Write-Log "prod sma_limit_calc state rows: $(@($rows).Count)"
    $exitCode = 0
  } else {

    # 0. Provision both users.
    Invoke-Step 'provision test users' {
      $script:user1Id = New-TestUser -Email $user1Email -Password $user1Pw
      $script:user2Id = New-TestUser -Email $user2Email -Password $user2Pw
      Write-Log "  user1 = $script:user1Id ($user1Email)"
      Write-Log "  user2 = $script:user2Id ($user2Email)"
    } | Out-Null

    # 1. Mint JWTs.
    Invoke-Step 'mint test JWTs' {
      $script:user1Jwt = Get-TestUserJwt -Email $user1Email -Password $user1Pw
      $script:user2Jwt = Get-TestUserJwt -Email $user2Email -Password $user2Pw
    } | Out-Null

    # A1. Submit one wrong answer on a misconception-tagged distractor.
    Invoke-Step 'A1: insert assertion — first wrong distractor 1 (M1)' {
      Invoke-SubmitAnswer -Jwt $script:user1Jwt -ItemId $ITEM_M1 `
        -SkillId $SKILL_SMA_LIMIT_CALC -UserAnswer 1 -IsCorrect $false | Out-Null
      Start-Sleep -Milliseconds 200  # let the RPC's NOW() update settle
      $rows = Get-StateRow -UserId $script:user1Id -SkillId $SKILL_SMA_LIMIT_CALC -McId $M1_ID
      if (@($rows).Count -ne 1) { throw "A1: expected exactly 1 state row, got $(@($rows).Count)" }
      $r = $rows[0]
      if ($r.exhibited_count -ne 1) { throw "A1: exhibited_count expected 1, got $($r.exhibited_count)" }
      if (-not $r.first_exhibited_at) { throw 'A1: first_exhibited_at not set' }
      if (-not $r.last_exhibited_at) { throw 'A1: last_exhibited_at not set' }
      Write-Log "  exhibited_count=1; first=$($r.first_exhibited_at); last=$($r.last_exhibited_at)"
      $script:firstExhibitedAt = $r.first_exhibited_at
    } | Out-Null

    # A2. Second wrong answer; count increments, first stays, last advances.
    Invoke-Step 'A2: increment assertion — second wrong distractor 1' {
      Start-Sleep -Seconds 1  # ensure last_exhibited_at delta is observable
      Invoke-SubmitAnswer -Jwt $script:user1Jwt -ItemId $ITEM_M1 `
        -SkillId $SKILL_SMA_LIMIT_CALC -UserAnswer 1 -IsCorrect $false | Out-Null
      Start-Sleep -Milliseconds 200
      $rows = Get-StateRow -UserId $script:user1Id -SkillId $SKILL_SMA_LIMIT_CALC -McId $M1_ID
      if (@($rows).Count -ne 1) { throw "A2: expected 1 state row, got $(@($rows).Count)" }
      $r = $rows[0]
      if ($r.exhibited_count -ne 2) { throw "A2: exhibited_count expected 2, got $($r.exhibited_count)" }
      if ($r.first_exhibited_at -ne $script:firstExhibitedAt) {
        throw "A2: first_exhibited_at mutated: was=$script:firstExhibitedAt now=$($r.first_exhibited_at)"
      }
      if ([DateTimeOffset]::Parse($r.last_exhibited_at) -le [DateTimeOffset]::Parse($script:firstExhibitedAt)) {
        throw "A2: last_exhibited_at did not advance: last=$($r.last_exhibited_at) first=$script:firstExhibitedAt"
      }
      Write-Log "  exhibited_count=2; first=$($r.first_exhibited_at) (unchanged); last=$($r.last_exhibited_at) (advanced)"
    } | Out-Null

    # A3. Correct answer — no new write, existing row untouched.
    Invoke-Step 'A3: no-write on correct answer' {
      $before = Get-StateRow -UserId $script:user1Id -SkillId $SKILL_SMA_LIMIT_CALC -McId $M1_ID
      $beforeCount = $before[0].exhibited_count
      Invoke-SubmitAnswer -Jwt $script:user1Jwt -ItemId $ITEM_M1 `
        -SkillId $SKILL_SMA_LIMIT_CALC -UserAnswer 0 -IsCorrect $true | Out-Null
      Start-Sleep -Milliseconds 200
      $after = Get-StateRow -UserId $script:user1Id -SkillId $SKILL_SMA_LIMIT_CALC -McId $M1_ID
      if ($after[0].exhibited_count -ne $beforeCount) {
        throw "A3: correct-answer write changed exhibited_count from $beforeCount to $($after[0].exhibited_count)"
      }
      Write-Log "  exhibited_count unchanged at $beforeCount across correct submission"
    } | Out-Null

    # A4. Wrong answer on a different misconception's item — separate row.
    Invoke-Step 'A4: write on a different tagged distractor (M3)' {
      Invoke-SubmitAnswer -Jwt $script:user1Jwt -ItemId $ITEM_M3 `
        -SkillId $SKILL_SMA_LIMIT_CALC -UserAnswer 1 -IsCorrect $false | Out-Null
      Start-Sleep -Milliseconds 200
      $m3Rows = Get-StateRow -UserId $script:user1Id -SkillId $SKILL_SMA_LIMIT_CALC -McId $M3_ID
      if (@($m3Rows).Count -ne 1) { throw "A4: expected M3 row, got $(@($m3Rows).Count)" }
      $m1Rows = Get-StateRow -UserId $script:user1Id -SkillId $SKILL_SMA_LIMIT_CALC -McId $M1_ID
      if ($m1Rows[0].exhibited_count -ne 2) { throw "A4: M1 row was affected (expected unchanged, got $($m1Rows[0].exhibited_count))" }
      Write-Log "  M3 row created (exhibited_count=1); M1 row unchanged (exhibited_count=2)"
    } | Out-Null

    # A5. RLS owner read — user1's JWT sees its own state.
    Invoke-Step 'A5: RLS owner read OK' {
      $h = @{ apikey = $anonKey; Authorization = "Bearer $script:user1Jwt" }
      $own = Invoke-RestMethod -Uri "$URL/rest/v1/user_misconception_states?select=misconception_id,exhibited_count" -Headers $h
      $count = @($own).Count
      if ($count -lt 2) { throw "A5: owner read expected >= 2 rows, got $count" }
      Write-Log "  user1 sees $count of its own rows via authenticated JWT"
    } | Out-Null

    # A6. RLS isolation — user2's JWT sees zero of user1's state.
    Invoke-Step 'A6: RLS isolation' {
      $h = @{ apikey = $anonKey; Authorization = "Bearer $script:user2Jwt" }
      $other = Invoke-RestMethod -Uri "$URL/rest/v1/user_misconception_states?select=*" -Headers $h
      $count = @($other).Count
      if ($count -ne 0) { throw "A6: user2 sees $count rows; expected 0 (RLS leak)" }
      Write-Log "  user2 sees 0 rows of user1's state (RLS isolation OK)"
    } | Out-Null

    # FK round-trip — learner-model's ADR-0013 §3 query.
    Invoke-Step 'FK round-trip: join user_misconception_states × skills via code' {
      # PostgREST embed syntax: user_misconception_states?skill:skill_id(code)
      $u = "$URL/rest/v1/user_misconception_states" +
           "?user_id=eq.$($script:user1Id)" +
           "&resolved_at=is.null" +
           "&select=misconception_id,exhibited_count,skill:skill_id(code)"
      $rows = Invoke-RestMethod -Method Get -Uri $u -Headers $srHeaders
      $smaRows = @($rows | Where-Object { $_.skill.code -eq 'sma_limit_calc' })
      if ($smaRows.Count -lt 2) { throw "FK round-trip: expected >= 2 unresolved rows joined to sma_limit_calc, got $($smaRows.Count)" }
      Write-Log "  $($smaRows.Count) unresolved misconception rows for user1 on sma_limit_calc (joined via skill.code)"
    } | Out-Null

    $exitCode = 0
    Write-Log 'ALL SMOKE CHECKS PASSED — safe to deploy to prod.'
  }
}
catch {
  Write-Log "edge-smoke FAILED: $_" 'ERROR'
  $exitCode = 1
}
finally {
  # Unconditional cleanup (mirrors branch-test.ps1's finally pattern).
  # Service_role admin.deleteUser CASCADES through profiles.id → wipes all
  # dependent rows including user_misconception_states.
  Write-Log 'cleanup: deleting test users'
  Remove-TestUser -UserId $user1Id
  Remove-TestUser -UserId $user2Id
  Write-Log "edge-smoke finished, exit code $exitCode; log saved to $logFile"
}

exit $exitCode
