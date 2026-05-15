-- Migration 040: enable Row Level Security on the seven curriculum tables.
-- ============================================================================
-- Sources:
--   docs/grounding/schema-reconciliation.md §5.1
--   docs/grounding/known-issues.md          J-2
--
-- The audit's sev-1 finding:
--   Migration 001 declared "Public read" SELECT policies on six curriculum
--   tables (subjects, stream_subjects, topics, skills, items, badges) but
--   never called  ALTER TABLE ... ENABLE ROW LEVEL SECURITY  on any of them.
--   The policies are inert. Supabase's default grants give 'authenticated'
--   SELECT + INSERT + UPDATE + DELETE on every public.* table — so a logged-in
--   client could DELETE FROM skills.
--
--   skill_prerequisites is the seventh table in the §5.1 list, but in fact
--   has no SELECT policy declared anywhere in the migration history (see
--   001_initial_schema.sql:125 — the table is created without one). Enabling
--   RLS on it without first creating a SELECT policy would lock the DAG out
--   of anon / authenticated reads. This migration creates that policy too.
--
-- Why this is safe on a live DB:
--   - service_role bypasses RLS (BYPASSRLS), so existing seed migrations
--     (PostgREST writes from the service-role key, supabase db push,
--     direct SQL from the dashboard) keep working unchanged.
--   - The app's runtime queries the curriculum tables read-only via the
--     anon / authenticated keys — those reads continue to match the
--     existing public-read policies (re-asserted below) and remain green.
--   - Existing service_role bypass is preserved; the explicit
--     "service_role manages ..." policies added below are documentation —
--     they exist to make the write-intent legible in pg_policies.
--
-- Idempotent: every CREATE POLICY is preceded by DROP POLICY IF EXISTS,
-- and ENABLE ROW LEVEL SECURITY is a no-op when already on. Safe to re-run.
-- ============================================================================

BEGIN;

-- ----------------------------------------------------------------------------
-- 1. (Re-)assert the SELECT policies BEFORE flipping RLS on.
--    Order matters: with RLS on and no matching policy, anon / authenticated
--    reads return empty without error — a silent breakage worse than the
--    original defect. Re-asserting via DROP+CREATE guarantees the policy
--    exists with the audited shape regardless of any out-of-band changes.
-- ----------------------------------------------------------------------------

DROP POLICY IF EXISTS "Public read subjects" ON public.subjects;
CREATE POLICY "Public read subjects" ON public.subjects
  FOR SELECT TO PUBLIC USING (true);

DROP POLICY IF EXISTS "Public read stream_subjects" ON public.stream_subjects;
CREATE POLICY "Public read stream_subjects" ON public.stream_subjects
  FOR SELECT TO PUBLIC USING (true);

DROP POLICY IF EXISTS "Public read topics" ON public.topics;
CREATE POLICY "Public read topics" ON public.topics
  FOR SELECT TO PUBLIC USING (true);

DROP POLICY IF EXISTS "Public read skills" ON public.skills;
CREATE POLICY "Public read skills" ON public.skills
  FOR SELECT TO PUBLIC USING (true);

-- skill_prerequisites had no policy declared in 001_initial_schema.sql.
-- Closing that gap.
DROP POLICY IF EXISTS "Public read skill_prerequisites" ON public.skill_prerequisites;
CREATE POLICY "Public read skill_prerequisites" ON public.skill_prerequisites
  FOR SELECT TO PUBLIC USING (true);

-- items preserves the is_active = TRUE predicate from
-- 001_initial_schema.sql:337 — inactive items remain hidden from PUBLIC.
DROP POLICY IF EXISTS "Public read items" ON public.items;
CREATE POLICY "Public read items" ON public.items
  FOR SELECT TO PUBLIC USING (is_active = TRUE);

DROP POLICY IF EXISTS "Public read badges" ON public.badges;
CREATE POLICY "Public read badges" ON public.badges
  FOR SELECT TO PUBLIC USING (true);

-- ----------------------------------------------------------------------------
-- 2. Enable RLS. ALTER TABLE ... ENABLE ROW LEVEL SECURITY is idempotent —
--    a no-op when already on.
-- ----------------------------------------------------------------------------

ALTER TABLE public.subjects               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stream_subjects        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.topics                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_prerequisites    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.items                  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges                 ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------------------------
-- 3. Explicit service_role write policies.
--    Functionally redundant — Supabase's service_role has BYPASSRLS and so
--    will continue to read/write these tables regardless. The policies exist
--    to make the write-intent legible to anyone reading pg_policies: writes
--    to curriculum tables come exclusively from service_role / migrations.
--    Recommended by docs/grounding/schema-reconciliation.md §5.1.
-- ----------------------------------------------------------------------------

DROP POLICY IF EXISTS "service_role manages subjects" ON public.subjects;
CREATE POLICY "service_role manages subjects" ON public.subjects
  FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role manages stream_subjects" ON public.stream_subjects;
CREATE POLICY "service_role manages stream_subjects" ON public.stream_subjects
  FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role manages topics" ON public.topics;
CREATE POLICY "service_role manages topics" ON public.topics
  FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role manages skills" ON public.skills;
CREATE POLICY "service_role manages skills" ON public.skills
  FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role manages skill_prerequisites" ON public.skill_prerequisites;
CREATE POLICY "service_role manages skill_prerequisites" ON public.skill_prerequisites
  FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role manages items" ON public.items;
CREATE POLICY "service_role manages items" ON public.items
  FOR ALL TO service_role USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "service_role manages badges" ON public.badges;
CREATE POLICY "service_role manages badges" ON public.badges
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- ----------------------------------------------------------------------------
-- 4. Post-conditions. Raise if RLS is not on, or if any of the seven SELECT
--    policies went missing. Inside the BEGIN block — a failure here rolls
--    the whole migration back.
-- ----------------------------------------------------------------------------

DO $verify$
DECLARE
  v_missing_rls  TEXT;
  v_missing_pol  TEXT;
BEGIN
  -- 4a. RLS must be enabled on all seven tables.
  SELECT string_agg(c.relname, ', ' ORDER BY c.relname)
    INTO v_missing_rls
  FROM pg_class c
  JOIN pg_namespace n ON n.oid = c.relnamespace
  WHERE n.nspname = 'public'
    AND c.relname IN ('subjects','stream_subjects','topics','skills',
                      'skill_prerequisites','items','badges')
    AND c.relrowsecurity = FALSE;

  IF v_missing_rls IS NOT NULL THEN
    RAISE EXCEPTION
      'Migration 040 post-condition failed: RLS still disabled on: %',
      v_missing_rls;
  END IF;

  -- 4b. A SELECT policy must exist on each — otherwise enabling RLS just
  --     turned the table into a black hole for anon / authenticated reads.
  SELECT string_agg(t, ', ' ORDER BY t)
    INTO v_missing_pol
  FROM (
    SELECT unnest(ARRAY[
      'subjects','stream_subjects','topics','skills',
      'skill_prerequisites','items','badges'
    ]) AS t
    EXCEPT
    SELECT tablename
    FROM pg_policies
    WHERE schemaname = 'public'
      AND cmd = 'SELECT'
      AND tablename IN ('subjects','stream_subjects','topics','skills',
                        'skill_prerequisites','items','badges')
  ) AS s;

  IF v_missing_pol IS NOT NULL THEN
    RAISE EXCEPTION
      'Migration 040 post-condition failed: SELECT policy missing on: %',
      v_missing_pol;
  END IF;
END
$verify$;

COMMIT;

-- ============================================================================
-- Reversal (manual — repo is forward-only by convention; see
-- docs/grounding/known-issues.md K-2):
--
--   ALTER TABLE public.subjects               DISABLE ROW LEVEL SECURITY;
--   ALTER TABLE public.stream_subjects        DISABLE ROW LEVEL SECURITY;
--   ALTER TABLE public.topics                 DISABLE ROW LEVEL SECURITY;
--   ALTER TABLE public.skills                 DISABLE ROW LEVEL SECURITY;
--   ALTER TABLE public.skill_prerequisites    DISABLE ROW LEVEL SECURITY;
--   ALTER TABLE public.items                  DISABLE ROW LEVEL SECURITY;
--   ALTER TABLE public.badges                 DISABLE ROW LEVEL SECURITY;
--
-- The newly-added "Public read skill_prerequisites" and seven
-- "service_role manages ..." policies are harmless if left in place
-- (they only fire when RLS is on); drop only if cleanliness is needed.
-- ============================================================================
