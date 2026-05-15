-- ============================================================================
-- Migration 044: Misconception entry shape amendment.
-- ----------------------------------------------------------------------------
-- Sources:
--   docs/decisions/0007-misconception-schema.md      -- base contract (4-field shape)
--   docs/decisions/0008-misconception-authoring-conventions.md §3, §4, §6
--   docs/decisions/0005-branch-test-workflow.md §Amendments -- roles::text[] rule
--
-- What this migration does:
--
--   Amends the contract for entries in skills.common_misconceptions JSONB.
--   Migration 043 defined the four-field shape:
--     { id TEXT, label TEXT, description TEXT, contradicts_principle TEXT }
--
--   ADR 0008 §3(c) adds a fifth canonical field:
--     distinguishing_mcq_stem JSONB-object
--   Structured object — NOT a free-text string. Step 3 (distractor tagging)
--   reads distractor_choice_label programmatically to know which slot in
--   items.distractor_misconceptions to write the misconception ID into; a
--   prose string cannot be parsed reliably. Shape:
--     {
--       stem_text TEXT               -- the MCQ stem itself, with all choices A-D
--       distractor_choice_label TEXT -- 'A' | 'B' | 'C' | 'D' — the slot this
--                                       misconception leads the student to pick
--       distractor_rationale TEXT    -- one-sentence rationale for the human
--                                       reviewer; not machine-consumed
--       correct_choice_label TEXT    -- the actual correct choice slot
--       correct_rationale TEXT       -- one-sentence justification of the correct
--                                       answer; audit trail
--     }
--   pedagogy-auditor's pushback (see ADR 0009 §"Field shape conflict"):
--   the prose form bac-curriculum approved is insufficient for step 3's
--   machine-read needs. Structured shape ships instead. All five sub-fields
--   are content-editable (per ADR 0009 §"Immutability"); only the top-level
--   misconception ID is immutable.
--
--   Additionally, ADR 0008 §6 specifies that the encoder emits a sixth key
--   with a null value:
--     label_ar: null
--   This key is present in every DB-resident entry even though AR authoring
--   is deferred for MVP. The encoder carries this discipline; the seed JSON
--   files omit the key by convention.
--
--   NO new column is added. The field lives inside the existing JSONB array.
--   This migration:
--     1. Records the amended five-field shape (+ label_ar sentinel) as a
--        COMMENT ON COLUMN on public.skills.common_misconceptions.
--     2. Re-asserts all migration 043 structural invariants so 044 cannot
--        silently drift them.
--     3. Verifies the comment was written and contains the key field names.
--
--   Option chosen: A (documentation-only).
--   Rationale: the codebase enforces invariants via DO $verify$ blocks at
--   migration time, not via CHECK constraints at write time. The encoder
--   (to be authored per ADR 0008 §"Pending") is written with this five-field
--   contract in hand; enforcement is at encoder authoring, not DB-write time.
--   Current data: skills.common_misconceptions is [] on every row — no
--   misconceptions are in the DB yet; a CHECK on the non-empty condition
--   would be a no-op today and an operational hazard tomorrow if a single
--   buggy encoder run causes the whole UPDATE to fail.
--
-- Idempotent:
--   COMMENT ON COLUMN is idempotent — it replaces the existing comment.
--   The DO $verify$ block reads current state; safe to re-run.
--
-- Prereq-edge baseline:
--   This migration does NOT touch skill_prerequisites. The canonical
--   baseline of SMA=98, SMB=31, PC=21, SVT=9, humanities=42, total=201
--   (first asserted in migration 042, re-asserted in migration 043) must
--   hold unchanged after this migration. The DO $verify$ block below
--   re-asserts it.
-- ============================================================================

BEGIN;

-- ============================================================================
-- 1. Amend the column comment to reflect the five-field (+ label_ar)
--    entry shape.
--
--    COMMENT ON COLUMN is idempotent: it replaces any existing comment.
--    The comment is the machine-readable contract for this column's JSONB
--    entries; it is verified by the DO $verify$ block below.
-- ============================================================================

COMMENT ON COLUMN public.skills.common_misconceptions IS
  'JSONB array of misconception objects for this skill. '
  'Each entry carries six top-level keys: '
  '  id TEXT                          -- stable misconception ID: mc.<subjects.code>.<skills.code>.<short-label> '
  '  label TEXT                       -- short French name, <= 80 chars '
  '  description TEXT                 -- 2-3 sentence French description of the wrong model '
  '  contradicts_principle TEXT       -- cadre-aligned or literature-named principle in French '
  '  distinguishing_mcq_stem OBJECT   -- structured: { stem_text TEXT, distractor_choice_label TEXT (A|B|C|D), '
  '                                      distractor_rationale TEXT, correct_choice_label TEXT (A|B|C|D), '
  '                                      correct_rationale TEXT }. drives step-3 distractor tagging; the '
  '                                      distractor_choice_label tells the encoder which slot in '
  '                                      items.distractor_misconceptions to write this misconception ID into. '
  '  label_ar TEXT                    -- Arabic label; emitted as null by the encoder for MVP; '
  '                                      populated when AR authoring begins '
  'Canonical five fields: id, label, description, contradicts_principle, distinguishing_mcq_stem. '
  'label_ar is a sixth sentinel key present in every encoder-emitted entry (value null for MVP). '
  'Misconception IDs are IMMUTABLE once any row in items.distractor_misconceptions or '
  'user_misconception_states references the ID. Deprecation only — no renaming. '
  'Sub-fields of distinguishing_mcq_stem ARE content-editable (per ADR 0009). '
  'See ADR 0007 (base schema), ADR 0008 (five-field shape + ID format), '
  'ADR 0009 (distinguishing_mcq_stem structured shape).';

-- ============================================================================
-- 2. Post-condition verification.
--    Mirrors the DO $verify$ pattern from migrations 040, 041, 042, 043.
--    Any assertion failure rolls the whole migration back (inside BEGIN).
--
--    Sections:
--      2a. Comment was written and contains the five canonical field names.
--      2b. skills.common_misconceptions — column exists, NOT NULL, default [].
--          (re-assertion of migration 043 invariants)
--      2c. items.distractor_misconceptions — column exists, NOT NULL, default {}.
--      2d. user_misconception_states table exists.
--      2e. RLS is enabled on user_misconception_states.
--      2f. All three RLS policies exist on user_misconception_states.
--      2g. All four indexes exist.
--      2h. Learner-model-added columns exist on user_misconception_states.
--      2i. Prereq-edge baseline is unchanged.
-- ============================================================================

DO $verify$
DECLARE
  v_comment          TEXT;
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
  -- 2a. COMMENT ON COLUMN was written and contains the five canonical
  --     field names: id, label, description, contradicts_principle,
  --     distinguishing_mcq_stem.
  --
  --     pg_catalog.col_description(table_oid, attnum) returns the comment
  --     text or NULL if none is set. We retrieve attnum from pg_attribute
  --     to avoid hard-coding a column number.
  -- -----------------------------------------------------------------------
  SELECT pg_catalog.col_description(c.attrelid, c.attnum)
  INTO   v_comment
  FROM   pg_attribute  c
  JOIN   pg_class      r ON r.oid = c.attrelid
  JOIN   pg_namespace  n ON n.oid = r.relnamespace
  WHERE  n.nspname  = 'public'
    AND  r.relname  = 'skills'
    AND  c.attname  = 'common_misconceptions'
    AND  c.attnum   > 0
    AND  NOT c.attisdropped;

  IF v_comment IS NULL THEN
    RAISE EXCEPTION
      'Migration 044 post-condition failed: COMMENT ON COLUMN public.skills.common_misconceptions was not set';
  END IF;

  -- Assert each of the five canonical field names appears in the comment,
  -- plus the structured-stem sub-field names (proves the structured shape
  -- text is in place, not the legacy string-shape text).
  IF v_comment NOT LIKE '%id%' THEN
    RAISE EXCEPTION
      'Migration 044 post-condition failed: comment missing field name "id"';
  END IF;
  IF v_comment NOT LIKE '%label%' THEN
    RAISE EXCEPTION
      'Migration 044 post-condition failed: comment missing field name "label"';
  END IF;
  IF v_comment NOT LIKE '%description%' THEN
    RAISE EXCEPTION
      'Migration 044 post-condition failed: comment missing field name "description"';
  END IF;
  IF v_comment NOT LIKE '%contradicts_principle%' THEN
    RAISE EXCEPTION
      'Migration 044 post-condition failed: comment missing field name "contradicts_principle"';
  END IF;
  IF v_comment NOT LIKE '%distinguishing_mcq_stem%' THEN
    RAISE EXCEPTION
      'Migration 044 post-condition failed: comment missing field name "distinguishing_mcq_stem"';
  END IF;
  IF v_comment NOT LIKE '%distractor_choice_label%' THEN
    RAISE EXCEPTION
      'Migration 044 post-condition failed: comment missing structured sub-field "distractor_choice_label"';
  END IF;
  IF v_comment NOT LIKE '%correct_choice_label%' THEN
    RAISE EXCEPTION
      'Migration 044 post-condition failed: comment missing structured sub-field "correct_choice_label"';
  END IF;

  -- -----------------------------------------------------------------------
  -- 2b. skills.common_misconceptions — column exists, NOT NULL, default [].
  --     Re-asserts migration 043's invariant so 044 cannot silently drift it.
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
      'Migration 044 post-condition failed: skills.common_misconceptions column missing (migration 043 regressed)';
  END IF;
  IF NOT v_col_notnull THEN
    RAISE EXCEPTION
      'Migration 044 post-condition failed: skills.common_misconceptions is nullable (migration 043 regressed)';
  END IF;
  IF v_col_default IS NULL OR v_col_default NOT LIKE '%[]%' THEN
    RAISE EXCEPTION
      'Migration 044 post-condition failed: skills.common_misconceptions default is not []::jsonb (got: %)',
      v_col_default;
  END IF;

  -- -----------------------------------------------------------------------
  -- 2c. items.distractor_misconceptions — column exists, NOT NULL, default {}.
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
      'Migration 044 post-condition failed: items.distractor_misconceptions column missing (migration 043 regressed)';
  END IF;
  IF NOT v_col_notnull THEN
    RAISE EXCEPTION
      'Migration 044 post-condition failed: items.distractor_misconceptions is nullable (migration 043 regressed)';
  END IF;
  IF v_col_default IS NULL OR v_col_default NOT LIKE '%{}%' THEN
    RAISE EXCEPTION
      'Migration 044 post-condition failed: items.distractor_misconceptions default is not {}::jsonb (got: %)',
      v_col_default;
  END IF;

  -- -----------------------------------------------------------------------
  -- 2d. user_misconception_states table exists.
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
      'Migration 044 post-condition failed: table public.user_misconception_states not found (migration 043 regressed)';
  END IF;

  -- -----------------------------------------------------------------------
  -- 2e. RLS is enabled on user_misconception_states.
  -- -----------------------------------------------------------------------
  SELECT c.relrowsecurity
  INTO v_rls_on
  FROM pg_class     c
  JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE n.nspname = 'public'
    AND c.relname = 'user_misconception_states';

  IF NOT v_rls_on THEN
    RAISE EXCEPTION
      'Migration 044 post-condition failed: RLS not enabled on user_misconception_states (migration 043 regressed)';
  END IF;

  -- -----------------------------------------------------------------------
  -- 2f. All three RLS policies exist on user_misconception_states.
  --     Expected: SELECT, INSERT, UPDATE for role 'authenticated'.
  --
  --     pg_policies.roles is name[]; cast to text[] so the @> operator
  --     resolves (ADR 0005 §Amendments: pg_policies.roles cast rule).
  -- -----------------------------------------------------------------------
  SELECT COUNT(*)
  INTO v_policy_count
  FROM pg_policies
  WHERE schemaname = 'public'
    AND tablename  = 'user_misconception_states'
    AND roles::text[] @> ARRAY['authenticated']
    AND cmd        IN ('SELECT', 'INSERT', 'UPDATE');

  IF v_policy_count <> 3 THEN
    RAISE EXCEPTION
      'Migration 044 post-condition failed: expected 3 RLS policies on user_misconception_states for authenticated, found % (migration 043 regressed)',
      v_policy_count;
  END IF;

  -- -----------------------------------------------------------------------
  -- 2g. All four indexes exist.
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
      'Migration 044 post-condition failed: expected 4 misconception indexes, found % (migration 043 regressed)',
      v_index_count;
  END IF;

  -- -----------------------------------------------------------------------
  -- 2h. Learner-model-added columns exist on user_misconception_states.
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
      'Migration 044 post-condition failed: user_misconception_states.first_exhibited_at column missing (migration 043 regressed)';
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
      'Migration 044 post-condition failed: user_misconception_states.remediation_attempts column missing or nullable (migration 043 regressed)';
  END IF;

  -- -----------------------------------------------------------------------
  -- 2i. Prereq-edge baseline — must be unchanged.
  --     Re-asserts the canonical counts from migrations 042 and 043.
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
    RAISE EXCEPTION 'Migration 044 post-condition: prereq baseline — SMA expected 98, got %', v_sma;
  END IF;
  IF v_smb <> 31 THEN
    RAISE EXCEPTION 'Migration 044 post-condition: prereq baseline — SMB expected 31, got %', v_smb;
  END IF;
  IF v_pc <> 21 THEN
    RAISE EXCEPTION 'Migration 044 post-condition: prereq baseline — PC expected 21, got %', v_pc;
  END IF;
  IF v_svt <> 9 THEN
    RAISE EXCEPTION 'Migration 044 post-condition: prereq baseline — SVT expected 9, got %', v_svt;
  END IF;
  IF v_humanities <> 42 THEN
    RAISE EXCEPTION 'Migration 044 post-condition: prereq baseline — humanities expected 42, got %', v_humanities;
  END IF;
  IF v_total <> 201 THEN
    RAISE EXCEPTION 'Migration 044 post-condition: prereq baseline — total expected 201, got %', v_total;
  END IF;
  IF v_cross <> 0 THEN
    RAISE EXCEPTION 'Migration 044 post-condition: prereq baseline — cross-stream edges expected 0, got %', v_cross;
  END IF;

  RAISE NOTICE
    'Migration 044 verification OK: '
    'COMMENT ON COLUMN public.skills.common_misconceptions set with five-field shape '
    '(id, label, description, contradicts_principle, distinguishing_mcq_stem; label_ar null sentinel). '
    'All migration 043 invariants re-asserted: '
    'skills.common_misconceptions (NOT NULL, default []), '
    'items.distractor_misconceptions (NOT NULL, default {}), '
    'user_misconception_states (RLS + 3 policies + 4 indexes + learner-model columns). '
    'Prereq baseline unchanged: total=% SMA=% SMB=% PC=% SVT=% humanities=% cross=%',
    v_total, v_sma, v_smb, v_pc, v_svt, v_humanities, v_cross;

END
$verify$;

COMMIT;

-- ============================================================================
-- Reversal (manual — repo is forward-only by convention; see
-- docs/grounding/schema-reconciliation.md §7, docs/decisions/0003):
--
-- This migration adds only a COMMENT ON COLUMN. The reversal is to restore
-- the prior comment text (the four-field shape from migration 043) or to
-- clear the comment entirely. No data is affected; no structural change was
-- made to any table, index, or policy.
--
-- Step 1. Restore the pre-044 comment (four-field shape) if desired:
--
--   COMMENT ON COLUMN public.skills.common_misconceptions IS
--     'JSONB array. Each element: '
--     '{ id TEXT, label TEXT, description TEXT, contradicts_principle TEXT }. '
--     'See migration 043 and ADR 0007.';
--
-- Alternatively, clear the comment entirely:
--
--   COMMENT ON COLUMN public.skills.common_misconceptions IS NULL;
--
-- No indexes, policies, tables, or data rows were written by this migration;
-- no further reversal steps are needed.
-- ============================================================================
