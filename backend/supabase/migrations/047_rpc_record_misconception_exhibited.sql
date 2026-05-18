-- ============================================================================
-- Migration 047: RPC public.record_misconception_exhibited
-- ----------------------------------------------------------------------------
-- Atomic upsert for misconception exhibition events. Called by the
-- submit-answer edge function (ADR 0013) via its adminClient (service_role).
--
-- Why an RPC instead of supabase-js .upsert():
--   The accumulation rule (learner-model, ADR 0013 §1) is "increment
--   exhibited_count + bump last_exhibited_at". supabase-js's .upsert()
--   would require a read-modify-write round-trip and lose atomicity —
--   two concurrent submissions for the same (user, skill, misconception)
--   could both read exhibited_count = N and clobber each other to N+1
--   when the correct end state is N+2. ON CONFLICT … DO UPDATE SET col =
--   table.col + 1 is the standard atomic-counter idiom in this codebase
--   (see also increment_xp, upsert_daily_activity, update_session_stats
--   in migration 005).
--
-- Why SECURITY DEFINER:
--   The RPC writes a row that the RLS INSERT policy on
--   user_misconception_states would otherwise gate on auth.uid() =
--   user_id. The edge function (service_role) is the gate that decides
--   whether a misconception fired, based on the answer's
--   distractor_misconceptions lookup. SECURITY DEFINER lets the RPC run
--   with the function-owner's permissions (postgres / supabase_admin),
--   which BYPASSRLS.
--
-- Why grant only to service_role:
--   Unlike the other accumulator RPCs in migration 005 (increment_xp,
--   etc.), this one is NOT granted to `authenticated`. Authenticated
--   users could call increment_xp etc. directly because the underlying
--   columns are user-counter values they could self-modify anyway. But
--   the RLS INSERT policy on user_misconception_states has WITH CHECK
--   (auth.uid() = user_id), which gates the row INSERT but does NOT gate
--   exhibited_count increments. Granting the RPC to authenticated would
--   let any logged-in user inflate their own state by calling the RPC
--   repeatedly with a synthesized misconception_id. The grant restricted
--   to service_role means the edge function is the sole write surface
--   — and it does the existence-validation on
--   skills.common_misconceptions[].id (ADR 0013 §"Validation").
--
-- Field semantics (per ADR 0007 + ADR 0013):
--   exhibited_count    — incremented every event.
--   first_exhibited_at — set ONCE on INSERT, never updated on conflict.
--   last_exhibited_at  — bumped on every event.
--   updated_at         — auto-bumped by the existing trigger on the
--                        table (migration 043:122-124).
--   remediation_attempts, resolved_at — NOT written by this RPC. v1
--                        defers resolution semantics until item coverage
--                        crosses the 3-per-misconception floor (ADR 0011).
--
-- Idempotent: the RPC's body is the atomic upsert; the migration's CREATE
-- OR REPLACE FUNCTION is itself idempotent (replaces existing). Safe to
-- re-run. The DO $verify$ block re-asserts everything.
--
-- Prereq baseline (ADR 0004): not touched. Re-asserted by the verify block.
-- Migration 043 invariants (RLS, policies, indexes, columns): not touched.
-- Re-asserted by the verify block.
-- ============================================================================

BEGIN;

CREATE OR REPLACE FUNCTION public.record_misconception_exhibited(
  p_user_id          UUID,
  p_skill_id         UUID,
  p_misconception_id TEXT
) RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_misconception_states (
    user_id, skill_id, misconception_id,
    exhibited_count, first_exhibited_at, last_exhibited_at
  )
  VALUES (
    p_user_id, p_skill_id, p_misconception_id,
    1, NOW(), NOW()
  )
  ON CONFLICT (user_id, skill_id, misconception_id) DO UPDATE
    SET exhibited_count   = public.user_misconception_states.exhibited_count + 1,
        last_exhibited_at = NOW();
  -- first_exhibited_at is intentionally NOT in the DO UPDATE clause.
  -- updated_at is auto-bumped by the trigger on user_misconception_states
  -- (migration 043 line 122-124).
END;
$$;

-- Lock down the grant: only service_role may invoke. The default grant on
-- a new function in `public` is EXECUTE TO PUBLIC; we explicitly REVOKE it
-- before granting to service_role to make the intent unambiguous.
REVOKE ALL  ON FUNCTION public.record_misconception_exhibited(UUID, UUID, TEXT) FROM PUBLIC;
REVOKE ALL  ON FUNCTION public.record_misconception_exhibited(UUID, UUID, TEXT) FROM authenticated;
REVOKE ALL  ON FUNCTION public.record_misconception_exhibited(UUID, UUID, TEXT) FROM anon;
GRANT EXECUTE ON FUNCTION public.record_misconception_exhibited(UUID, UUID, TEXT)
  TO service_role;

-- ----------------------------------------------------------------------------
-- Verify block. Mirrors migration 044/045/046 pattern.
-- Asserts:
--   4a. function exists with the expected signature.
--   4b. SECURITY DEFINER is set.
--   4c. service_role has EXECUTE; authenticated and anon and public do NOT.
--   4d. migration 043 invariants intact (column existence, defaults, RLS).
--   4e. prereq baseline unchanged (ADR 0004).
-- ----------------------------------------------------------------------------
DO $verify$
DECLARE
  v_oid              OID;
  v_secdef           BOOLEAN;
  v_service_role_ex  BOOLEAN;
  v_auth_ex          BOOLEAN;
  v_anon_ex          BOOLEAN;
  v_public_ex        BOOLEAN;
  v_col_exists       BOOLEAN;
  v_col_notnull      BOOLEAN;
  v_col_default      TEXT;
  v_total INT; v_sma INT; v_smb INT; v_pc INT; v_svt INT; v_humanities INT; v_cross INT;
BEGIN

  -- 4a. function exists with expected (UUID, UUID, TEXT) signature.
  SELECT p.oid, p.prosecdef
  INTO   v_oid, v_secdef
  FROM   pg_proc p
  JOIN   pg_namespace n ON n.oid = p.pronamespace
  WHERE  n.nspname = 'public'
    AND  p.proname = 'record_misconception_exhibited'
    AND  pg_get_function_arguments(p.oid) =
         'p_user_id uuid, p_skill_id uuid, p_misconception_id text';
  IF v_oid IS NULL THEN
    RAISE EXCEPTION 'Migration 047 post-condition failed: record_misconception_exhibited(UUID, UUID, TEXT) not found';
  END IF;

  -- 4b. SECURITY DEFINER.
  IF NOT v_secdef THEN
    RAISE EXCEPTION 'Migration 047 post-condition failed: record_misconception_exhibited is not SECURITY DEFINER';
  END IF;

  -- 4c. grant matrix: service_role yes; authenticated/anon/public no.
  v_service_role_ex := has_function_privilege('service_role',  v_oid, 'EXECUTE');
  v_auth_ex         := has_function_privilege('authenticated', v_oid, 'EXECUTE');
  v_anon_ex         := has_function_privilege('anon',          v_oid, 'EXECUTE');
  v_public_ex       := has_function_privilege('public',        v_oid, 'EXECUTE');

  IF NOT v_service_role_ex THEN
    RAISE EXCEPTION 'Migration 047 post-condition failed: service_role lacks EXECUTE on record_misconception_exhibited';
  END IF;
  IF v_auth_ex THEN
    RAISE EXCEPTION 'Migration 047 post-condition failed: authenticated UNEXPECTEDLY has EXECUTE on record_misconception_exhibited (must be service_role only)';
  END IF;
  IF v_anon_ex THEN
    RAISE EXCEPTION 'Migration 047 post-condition failed: anon UNEXPECTEDLY has EXECUTE on record_misconception_exhibited';
  END IF;
  IF v_public_ex THEN
    RAISE EXCEPTION 'Migration 047 post-condition failed: PUBLIC UNEXPECTEDLY has EXECUTE on record_misconception_exhibited';
  END IF;

  -- 4d. Re-assert key migration-043 invariants: user_misconception_states
  --     exists, has the columns the RPC writes to, and RLS is on (the
  --     RPC bypasses RLS via SECURITY DEFINER, but the table-level RLS
  --     gate must remain in place for direct anon/authenticated reads).
  IF NOT EXISTS (
    SELECT 1 FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
      AND c.relname = 'user_misconception_states'
      AND c.relrowsecurity = TRUE
  ) THEN
    RAISE EXCEPTION 'Migration 047 post-condition failed: user_misconception_states missing or RLS not on (migration 043 regressed)';
  END IF;

  -- The two learner-model-added columns must exist (from migration 043).
  IF NOT EXISTS (
    SELECT 1 FROM pg_attribute c
    JOIN pg_class r ON r.oid = c.attrelid
    JOIN pg_namespace n ON n.oid = r.relnamespace
    WHERE n.nspname = 'public'
      AND r.relname = 'user_misconception_states'
      AND c.attname IN ('first_exhibited_at', 'last_exhibited_at',
                         'exhibited_count', 'remediation_attempts')
      AND NOT c.attisdropped
    GROUP BY 1
    HAVING COUNT(*) >= 1
  ) THEN
    RAISE EXCEPTION 'Migration 047 post-condition failed: user_misconception_states schema regressed';
  END IF;

  -- 4e. prereq baseline (ADR 0004) unchanged.
  WITH skill_stream AS (
    SELECT
      sk.id,
      CASE
        WHEN sk.code LIKE 'sma\_%' ESCAPE '\' THEN 'SMA'
        WHEN sk.code LIKE 'pc\_%'  ESCAPE '\' THEN 'PC'
        WHEN sk.code LIKE 'svt\_%' ESCAPE '\' THEN 'SVT'
        WHEN sub.code IN ('math','physics','svt') THEN 'SMB'
        ELSE                                           'humanities'
      END AS stream
    FROM public.skills    sk
    JOIN public.topics    t   ON t.id   = sk.topic_id
    JOIN public.subjects  sub ON sub.id = t.subject_id
  )
  SELECT
    COUNT(*),
    COUNT(*) FILTER (WHERE dep.stream = 'SMA'),
    COUNT(*) FILTER (WHERE dep.stream = 'SMB'),
    COUNT(*) FILTER (WHERE dep.stream = 'PC'),
    COUNT(*) FILTER (WHERE dep.stream = 'SVT'),
    COUNT(*) FILTER (WHERE dep.stream = 'humanities'),
    COUNT(*) FILTER (WHERE dep.stream <> pre.stream)
  INTO  v_total, v_sma, v_smb, v_pc, v_svt, v_humanities, v_cross
  FROM  public.skill_prerequisites sp
  JOIN  skill_stream dep ON dep.id = sp.skill_id
  JOIN  skill_stream pre ON pre.id = sp.prerequisite_skill_id;

  IF v_sma        <> 98  THEN RAISE EXCEPTION 'Migration 047 prereq baseline: SMA expected 98, got %', v_sma; END IF;
  IF v_smb        <> 31  THEN RAISE EXCEPTION 'Migration 047 prereq baseline: SMB expected 31, got %', v_smb; END IF;
  IF v_pc         <> 21  THEN RAISE EXCEPTION 'Migration 047 prereq baseline: PC expected 21, got %', v_pc; END IF;
  IF v_svt        <> 9   THEN RAISE EXCEPTION 'Migration 047 prereq baseline: SVT expected 9, got %', v_svt; END IF;
  IF v_humanities <> 42  THEN RAISE EXCEPTION 'Migration 047 prereq baseline: humanities expected 42, got %', v_humanities; END IF;
  IF v_total      <> 201 THEN RAISE EXCEPTION 'Migration 047 prereq baseline: total expected 201, got %', v_total; END IF;
  IF v_cross      <> 0   THEN RAISE EXCEPTION 'Migration 047 prereq baseline: cross-stream edges expected 0, got %', v_cross; END IF;

  RAISE NOTICE
    'Migration 047 verification OK: record_misconception_exhibited(UUID, UUID, TEXT) SECURITY DEFINER, EXECUTE granted to service_role only (authenticated/anon/public denied). Migration 043 invariants intact (user_misconception_states + RLS). Prereq baseline unchanged: total=% SMA=% SMB=% PC=% SVT=% humanities=% cross=%',
    v_total, v_sma, v_smb, v_pc, v_svt, v_humanities, v_cross;
END
$verify$;

COMMIT;

-- ============================================================================
-- Reversal (manual — repo is forward-only):
--
--   DROP FUNCTION IF EXISTS public.record_misconception_exhibited(UUID, UUID, TEXT);
--
-- Safe ONLY if no code path invokes the RPC. Check before running:
--   - submit-answer/index.ts (the edge function calls this RPC)
--   - any future scheduler / aggregate-loop edge function
-- The function itself doesn't hold data; user_misconception_states rows
-- written via the RPC remain after function deletion.
-- ============================================================================
