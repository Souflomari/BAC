-- ============================================================================
-- Migration 043: Misconception schema.
-- ----------------------------------------------------------------------------
-- Sources:
--   docs/grounding/schema-reconciliation.md §2.3, §3.2
--   docs/decisions/0003-out-of-band-prerequisites-recovery.md
--
-- What this migration adds:
--
--   1. skills.common_misconceptions       JSONB  DEFAULT '[]'::jsonb  NOT NULL
--      Each element: { id TEXT, label TEXT, description TEXT,
--                      contradicts_principle TEXT }
--      Misconception IDs are string keys and are IMMUTABLE once committed
--      (same rule as notion/skill UUIDs per schema-reconciliation.md §2.4).
--
--   2. items.distractor_misconceptions    JSONB  DEFAULT '{}'::jsonb  NOT NULL
--      Maps MCQ choice index / letter → misconception ID.
--      e.g. {"1": "mistakes_e_with_e_to_1", "2": "thinks_pi_appears"}
--      Missing key = that distractor is not tagged to a misconception.
--
--   3. public.user_misconception_states   (new table)
--      Per-(user, skill, misconception) diagnosis state. RLS enforced.
--      misconception_id is a TEXT string key into
--      skills.common_misconceptions[].id — it is intentionally NOT a
--      foreign key into a separate table, because misconceptions live
--      inside the JSONB array on skills. This is a denormalised look-up
--      that trades referential integrity for schema simplicity; the
--      application layer is responsible for ensuring the string exists
--      in the parent JSONB before inserting here.
--
--      Fields beyond the user's initial spec, added on learner-model's
--      review (see ADR 0007):
--        - first_exhibited_at  — set once on INSERT; lets the aggregate
--                                loop distinguish chronic from new
--                                misconceptions ("30 attempts over 6 weeks"
--                                vs "exhibited once yesterday").
--        - remediation_attempts — counter the diagnosis bumps each time it
--                                routes the student through targeted
--                                remediation; lets the scheduler tell a
--                                fragile fix from a durable one.
--
--   4. Indexes (revised on learner-model's review):
--      - GIN (jsonb_path_ops) on skills.common_misconceptions
--      - GIN (jsonb_path_ops) on items.distractor_misconceptions
--      - Partial B-tree on user_misconception_states(user_id, skill_id)
--        WHERE resolved_at IS NULL  — scheduler's hot path is the
--        "unresolved misconceptions" subset; the PK (user_id, skill_id,
--        misconception_id) already serves the full-set left-prefix.
--      - B-tree on user_misconception_states(misconception_id, user_id)
--        for the aggregate analysis loop: "all students running
--        misconception X across skills".
--
-- RLS:
--   user_misconception_states gets ENABLE ROW LEVEL SECURITY plus three
--   policies (SELECT, INSERT, UPDATE) scoped to auth.uid() = user_id.
--   service_role has BYPASSRLS by default — no explicit service_role
--   policy is added. For user-state tables the service_role bypass is
--   sufficient; adding a redundant ALL policy is noise (contrast: the
--   curriculum-table pattern in migration 040 added explicit policies
--   for documentation purposes — that choice is documented in ADR 0003
--   but is not mandated for user-owned state tables).
--
-- Idempotent:
--   ADD COLUMN IF NOT EXISTS; CREATE TABLE IF NOT EXISTS;
--   DROP POLICY IF EXISTS before each CREATE POLICY;
--   CREATE INDEX IF NOT EXISTS.
--
-- Prereq-edge baseline:
--   This migration does NOT touch skill_prerequisites. The canonical
--   baseline of SMA=98, SMB=31, PC=21, SVT=9, humanities=42, total=201
--   (asserted in migration 042) must hold unchanged after this migration.
--   The DO $verify$ block below re-asserts it.
-- ============================================================================

BEGIN;

-- ============================================================================
-- 1. skills.common_misconceptions
--    ADD COLUMN IF NOT EXISTS is safe on a live table — it takes an
--    ACCESS EXCLUSIVE lock only for the metadata write; PostgreSQL fills
--    the default lazily (no full-table rewrite for constant defaults in
--    Postgres 11+).
-- ============================================================================

ALTER TABLE public.skills
  ADD COLUMN IF NOT EXISTS common_misconceptions JSONB
    NOT NULL DEFAULT '[]'::jsonb;

-- ============================================================================
-- 2. items.distractor_misconceptions
--    Same rationale as above.
-- ============================================================================

ALTER TABLE public.items
  ADD COLUMN IF NOT EXISTS distractor_misconceptions JSONB
    NOT NULL DEFAULT '{}'::jsonb;

-- ============================================================================
-- 3. public.user_misconception_states
--    New table — created only if not already present (idempotent).
--
--    misconception_id TEXT:
--      A string key that resolves to an element of
--      skills.common_misconceptions[].id on the skill identified by
--      skill_id. There is deliberately NO database-level FK here; the
--      application layer must validate the key exists in the parent
--      JSONB before writing. This avoids the complexity of extracting
--      misconception IDs into a normalised table while the misconception
--      corpus is still being built.
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.user_misconception_states (
  user_id              UUID          NOT NULL
    REFERENCES public.profiles(id) ON DELETE CASCADE,
  skill_id             UUID          NOT NULL
    REFERENCES public.skills(id)   ON DELETE CASCADE,
  -- misconception_id is NOT a FK — it is a string key into
  -- skills.common_misconceptions[].id on the row identified by skill_id.
  misconception_id     TEXT          NOT NULL,
  exhibited_count      INT           NOT NULL DEFAULT 0,
  -- Lifetime: first_exhibited_at is set on INSERT and never updated.
  -- last_exhibited_at is bumped each time the misconception fires.
  first_exhibited_at   TIMESTAMPTZ,
  last_exhibited_at    TIMESTAMPTZ,
  remediation_attempts INT           NOT NULL DEFAULT 0,
  resolved_at          TIMESTAMPTZ,
  created_at           TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at           TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, skill_id, misconception_id)
);

-- For pre-existing user_misconception_states deployments (idempotent
-- re-runs of this migration on databases where the table already exists
-- without the learner-model-added fields), add the new columns.
ALTER TABLE public.user_misconception_states
  ADD COLUMN IF NOT EXISTS first_exhibited_at   TIMESTAMPTZ;
ALTER TABLE public.user_misconception_states
  ADD COLUMN IF NOT EXISTS remediation_attempts INT NOT NULL DEFAULT 0;

-- ============================================================================
-- 4. updated_at trigger on user_misconception_states.
--    Reuses public.update_updated_at() defined in migration 001.
--    CREATE OR REPLACE on the function is not needed — function already
--    exists. We only need the trigger on the new table.
-- ============================================================================

-- Drop first so the migration is re-runnable.
DROP TRIGGER IF EXISTS user_misconception_states_updated_at
  ON public.user_misconception_states;

CREATE TRIGGER user_misconception_states_updated_at
  BEFORE UPDATE ON public.user_misconception_states
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

-- ============================================================================
-- 5. RLS on user_misconception_states.
--    ENABLE ROW LEVEL SECURITY is idempotent — no-op if already on.
-- ============================================================================

ALTER TABLE public.user_misconception_states ENABLE ROW LEVEL SECURITY;

-- SELECT — authenticated users read only their own rows.
DROP POLICY IF EXISTS "Users read own misconception states"
  ON public.user_misconception_states;
CREATE POLICY "Users read own misconception states"
  ON public.user_misconception_states
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- INSERT — authenticated users insert only rows they own.
DROP POLICY IF EXISTS "Users insert own misconception states"
  ON public.user_misconception_states;
CREATE POLICY "Users insert own misconception states"
  ON public.user_misconception_states
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- UPDATE — authenticated users update only their own rows.
DROP POLICY IF EXISTS "Users update own misconception states"
  ON public.user_misconception_states;
CREATE POLICY "Users update own misconception states"
  ON public.user_misconception_states
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- ============================================================================
-- 6. Indexes.
-- ============================================================================

-- GIN (jsonb_path_ops) on skills.common_misconceptions.
-- jsonb_path_ops supports the @> (containment) operator used by the
-- scheduler to answer "which skills define misconception X?".
-- It produces a smaller index than the default ops because it hashes
-- key paths rather than storing them verbatim, and it supports @>
-- queries just as well. It does NOT support key-existence (?) or
-- key-value extraction (->); those are not needed on this column.
CREATE INDEX IF NOT EXISTS idx_skills_common_misconceptions_gin
  ON public.skills
  USING GIN (common_misconceptions jsonb_path_ops);

-- GIN (jsonb_path_ops) on items.distractor_misconceptions.
-- Supports the submit-answer edge function's lookup: "which items tag
-- misconception ID X?" via a containment query on the value side.
CREATE INDEX IF NOT EXISTS idx_items_distractor_misconceptions_gin
  ON public.items
  USING GIN (distractor_misconceptions jsonb_path_ops);

-- Partial B-tree on user_misconception_states(user_id, skill_id)
-- WHERE resolved_at IS NULL.
--
-- learner-model rejected the user's spec'd non-partial composite on
-- (user_id, skill_id): a B-tree PK on (user_id, skill_id, misconception_id)
-- already serves left-prefix scans for (user_id, skill_id) without an
-- extra index, so the non-partial composite was redundant. The partial
-- index instead narrows the scheduler's hot path — "unresolved
-- misconceptions for (user, skill)" — to the subset of rows that are
-- actually open. Smaller index, faster scan, exact match for the
-- query predicate.
CREATE INDEX IF NOT EXISTS idx_user_misconception_states_active
  ON public.user_misconception_states (user_id, skill_id)
  WHERE resolved_at IS NULL;

-- B-tree on user_misconception_states(misconception_id, user_id).
-- Covers the aggregate analysis loop: "all students running misconception
-- X across skills" — column order matches the predicate (misconception_id
-- is the equality column; user_id supports the IN / list filter for
-- a cohort). Not served by the PK because the PK leads with user_id.
CREATE INDEX IF NOT EXISTS idx_user_misconception_states_misconception
  ON public.user_misconception_states (misconception_id, user_id);

-- ============================================================================
-- 7. Post-condition verification.
--    Mirrors the DO $verify$ pattern from migrations 040, 041, 042.
--    Any assertion failure rolls the whole migration back (inside BEGIN).
-- ============================================================================

DO $verify$
DECLARE
  v_col_exists       BOOLEAN;
  v_col_notnull      BOOLEAN;
  v_col_default      TEXT;
  v_table_exists     BOOLEAN;
  v_rls_on           BOOLEAN;
  v_policy_count     INT;
  v_index_count      INT;
  -- prereq baseline (must be unchanged by this migration)
  v_total            INT;
  v_sma              INT;
  v_smb              INT;
  v_pc               INT;
  v_svt              INT;
  v_humanities       INT;
  v_cross            INT;
BEGIN

  -- -----------------------------------------------------------------------
  -- 7a. skills.common_misconceptions — column exists, NOT NULL, default [].
  -- -----------------------------------------------------------------------
  SELECT
    TRUE,
    c.attnotnull,
    pg_get_expr(d.adbin, d.adrelid)
  INTO v_col_exists, v_col_notnull, v_col_default
  FROM pg_attribute c
  JOIN pg_class     r ON r.oid = c.attrelid
  JOIN pg_namespace n ON n.oid = r.relnamespace
  LEFT JOIN pg_attrdef d
    ON d.adrelid = c.attrelid AND d.adnum = c.attnum
  WHERE n.nspname   = 'public'
    AND r.relname   = 'skills'
    AND c.attname   = 'common_misconceptions'
    AND c.attnum    > 0
    AND NOT c.attisdropped;

  IF NOT FOUND OR NOT v_col_exists THEN
    RAISE EXCEPTION
      'Migration 043 post-condition failed: skills.common_misconceptions column missing';
  END IF;
  IF NOT v_col_notnull THEN
    RAISE EXCEPTION
      'Migration 043 post-condition failed: skills.common_misconceptions is nullable';
  END IF;
  -- pg_get_expr returns the default expression, which for a JSONB literal
  -- rendered from '[]'::jsonb will be "'[]'::jsonb".
  IF v_col_default IS NULL OR v_col_default NOT LIKE '%[]%' THEN
    RAISE EXCEPTION
      'Migration 043 post-condition failed: skills.common_misconceptions default is not []::jsonb (got: %)',
      v_col_default;
  END IF;

  -- -----------------------------------------------------------------------
  -- 7b. items.distractor_misconceptions — column exists, NOT NULL, default {}.
  -- -----------------------------------------------------------------------
  SELECT
    TRUE,
    c.attnotnull,
    pg_get_expr(d.adbin, d.adrelid)
  INTO v_col_exists, v_col_notnull, v_col_default
  FROM pg_attribute c
  JOIN pg_class     r ON r.oid = c.attrelid
  JOIN pg_namespace n ON n.oid = r.relnamespace
  LEFT JOIN pg_attrdef d
    ON d.adrelid = c.attrelid AND d.adnum = c.attnum
  WHERE n.nspname   = 'public'
    AND r.relname   = 'items'
    AND c.attname   = 'distractor_misconceptions'
    AND c.attnum    > 0
    AND NOT c.attisdropped;

  IF NOT FOUND OR NOT v_col_exists THEN
    RAISE EXCEPTION
      'Migration 043 post-condition failed: items.distractor_misconceptions column missing';
  END IF;
  IF NOT v_col_notnull THEN
    RAISE EXCEPTION
      'Migration 043 post-condition failed: items.distractor_misconceptions is nullable';
  END IF;
  IF v_col_default IS NULL OR v_col_default NOT LIKE '%{}%' THEN
    RAISE EXCEPTION
      'Migration 043 post-condition failed: items.distractor_misconceptions default is not {}::jsonb (got: %)',
      v_col_default;
  END IF;

  -- -----------------------------------------------------------------------
  -- 7c. user_misconception_states table exists.
  -- -----------------------------------------------------------------------
  SELECT EXISTS (
    SELECT 1
    FROM pg_class     r
    JOIN pg_namespace n ON n.oid = r.relnamespace
    WHERE n.nspname = 'public'
      AND r.relname = 'user_misconception_states'
      AND r.relkind = 'r'
  ) INTO v_table_exists;

  IF NOT v_table_exists THEN
    RAISE EXCEPTION
      'Migration 043 post-condition failed: table public.user_misconception_states not found';
  END IF;

  -- -----------------------------------------------------------------------
  -- 7d. RLS is enabled on user_misconception_states.
  -- -----------------------------------------------------------------------
  SELECT c.relrowsecurity
  INTO v_rls_on
  FROM pg_class     c
  JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE n.nspname = 'public'
    AND c.relname = 'user_misconception_states';

  IF NOT v_rls_on THEN
    RAISE EXCEPTION
      'Migration 043 post-condition failed: RLS not enabled on user_misconception_states';
  END IF;

  -- -----------------------------------------------------------------------
  -- 7e. All three RLS policies exist on user_misconception_states.
  --     Expected: SELECT, INSERT, UPDATE for role 'authenticated'.
  -- -----------------------------------------------------------------------
  -- pg_policies.roles is name[]; cast to text[] so the @> operator resolves.
  SELECT COUNT(*)
  INTO v_policy_count
  FROM pg_policies
  WHERE schemaname = 'public'
    AND tablename  = 'user_misconception_states'
    AND roles::text[] @> ARRAY['authenticated']
    AND cmd        IN ('SELECT', 'INSERT', 'UPDATE');

  IF v_policy_count <> 3 THEN
    RAISE EXCEPTION
      'Migration 043 post-condition failed: expected 3 RLS policies on user_misconception_states for authenticated, found %',
      v_policy_count;
  END IF;

  -- -----------------------------------------------------------------------
  -- 7f. All four indexes exist.
  --     - 2 GINs on the new JSONB columns
  --     - partial B-tree on (user_id, skill_id) WHERE resolved_at IS NULL
  --     - reverse-direction B-tree on (misconception_id, user_id)
  -- -----------------------------------------------------------------------
  SELECT COUNT(*)
  INTO v_index_count
  FROM pg_indexes
  WHERE schemaname = 'public'
    AND indexname IN (
      'idx_skills_common_misconceptions_gin',
      'idx_items_distractor_misconceptions_gin',
      'idx_user_misconception_states_active',
      'idx_user_misconception_states_misconception'
    );

  IF v_index_count <> 4 THEN
    RAISE EXCEPTION
      'Migration 043 post-condition failed: expected 4 indexes, found %',
      v_index_count;
  END IF;

  -- -----------------------------------------------------------------------
  -- 7f-bis. The two learner-model-added columns exist on
  --         user_misconception_states.
  -- -----------------------------------------------------------------------
  IF NOT EXISTS (
    SELECT 1 FROM pg_attribute c
    JOIN pg_class r ON r.oid = c.attrelid
    JOIN pg_namespace n ON n.oid = r.relnamespace
    WHERE n.nspname = 'public'
      AND r.relname = 'user_misconception_states'
      AND c.attname = 'first_exhibited_at'
      AND c.attnum > 0 AND NOT c.attisdropped
  ) THEN
    RAISE EXCEPTION
      'Migration 043 post-condition failed: user_misconception_states.first_exhibited_at column missing';
  END IF;
  IF NOT EXISTS (
    SELECT 1 FROM pg_attribute c
    JOIN pg_class r ON r.oid = c.attrelid
    JOIN pg_namespace n ON n.oid = r.relnamespace
    WHERE n.nspname = 'public'
      AND r.relname = 'user_misconception_states'
      AND c.attname = 'remediation_attempts'
      AND c.attnum > 0 AND NOT c.attisdropped
      AND c.attnotnull
  ) THEN
    RAISE EXCEPTION
      'Migration 043 post-condition failed: user_misconception_states.remediation_attempts column missing or nullable';
  END IF;

  -- -----------------------------------------------------------------------
  -- 7g. JSONB literal sanity — validate that the default literals are
  --     parseable as empty array and empty object respectively.
  --     These do not require inserting a row; they are pure expression
  --     evaluations that prove the literals are valid JSONB.
  -- -----------------------------------------------------------------------
  IF jsonb_array_length('[]'::jsonb) <> 0 THEN
    RAISE EXCEPTION
      'Migration 043 post-condition failed: []::jsonb is not an empty array';
  END IF;

  -- jsonb_object_keys returns a set; a zero-row set is the expected result
  -- for {}. We validate by checking that the object has zero keys.
  IF (SELECT count(*) FROM jsonb_object_keys('{}'::jsonb)) <> 0 THEN
    RAISE EXCEPTION
      'Migration 043 post-condition failed: {}::jsonb is not an empty object';
  END IF;

  -- -----------------------------------------------------------------------
  -- 7h. Prereq-edge baseline — must be unchanged.
  --     Re-asserts the canonical counts from migration 042.
  -- -----------------------------------------------------------------------
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

  IF v_sma <> 98 THEN
    RAISE EXCEPTION 'Migration 043 post-condition: prereq baseline — SMA expected 98, got %', v_sma;
  END IF;
  IF v_smb <> 31 THEN
    RAISE EXCEPTION 'Migration 043 post-condition: prereq baseline — SMB expected 31, got %', v_smb;
  END IF;
  IF v_pc <> 21 THEN
    RAISE EXCEPTION 'Migration 043 post-condition: prereq baseline — PC expected 21, got %', v_pc;
  END IF;
  IF v_svt <> 9 THEN
    RAISE EXCEPTION 'Migration 043 post-condition: prereq baseline — SVT expected 9, got %', v_svt;
  END IF;
  IF v_humanities <> 42 THEN
    RAISE EXCEPTION 'Migration 043 post-condition: prereq baseline — humanities expected 42, got %', v_humanities;
  END IF;
  IF v_total <> 201 THEN
    RAISE EXCEPTION 'Migration 043 post-condition: prereq baseline — total expected 201, got %', v_total;
  END IF;
  IF v_cross <> 0 THEN
    RAISE EXCEPTION 'Migration 043 post-condition: prereq baseline — cross-stream edges expected 0, got %', v_cross;
  END IF;

  RAISE NOTICE
    'Migration 043 verification OK: '
    'skills.common_misconceptions added (NOT NULL, default []), '
    'items.distractor_misconceptions added (NOT NULL, default {}), '
    'user_misconception_states created with RLS + 3 policies + 4 indexes '
    '(2 GIN on the JSONB columns + partial-active + reverse-aggregate). '
    'Prereq baseline unchanged: total=% SMA=% SMB=% PC=% SVT=% humanities=% cross=%',
    v_total, v_sma, v_smb, v_pc, v_svt, v_humanities, v_cross;

END
$verify$;

COMMIT;

-- ============================================================================
-- Reversal (manual — repo is forward-only by convention; see
-- docs/grounding/schema-reconciliation.md §7, docs/decisions/0003):
--
-- Step 1. Drop the new table and its trigger (no cascade needed; FKs
--         referenced BY this table are handled by DROP TABLE):
--
--   DROP TABLE IF EXISTS public.user_misconception_states;
--
-- Step 2. Drop the two GIN indexes (they are on existing tables, so
--         DROP TABLE above does not remove them):
--
--   DROP INDEX IF EXISTS public.idx_skills_common_misconceptions_gin;
--   DROP INDEX IF EXISTS public.idx_items_distractor_misconceptions_gin;
--
--   The two user_misconception_states indexes
--   (idx_user_misconception_states_active and
--   idx_user_misconception_states_misconception) are dropped automatically
--   by the DROP TABLE above; no explicit DROP INDEX needed for those.
--
-- Step 3. Drop the two new columns:
--   NOTE: only safe if no application code has written non-default values
--   into these columns. Verify with:
--     SELECT COUNT(*) FROM public.skills
--       WHERE common_misconceptions <> '[]'::jsonb;
--     SELECT COUNT(*) FROM public.items
--       WHERE distractor_misconceptions <> '{}'::jsonb;
--   If either returns > 0, back up the data before proceeding.
--
--   ALTER TABLE public.skills DROP COLUMN IF EXISTS common_misconceptions;
--   ALTER TABLE public.items  DROP COLUMN IF EXISTS distractor_misconceptions;
--
-- No skill_prerequisites rows were written; the prereq baseline is
-- unchanged and does not need reversal.
-- ============================================================================
