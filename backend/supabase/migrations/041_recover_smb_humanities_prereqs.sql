-- Migration 041: recover 73 SMB + humanities prereq edges into versioned history.
-- ============================================================================
-- Provenance recovery.
--
-- The diagnostic that followed migration 040 surfaced a gap between the
-- migration history and prod state:
--
--   skill_prerequisites in prod contained 103 edges, but the migration files
--   only account for 30 (PC=21 from 032, SVT=9 from 036). The remaining 73
--   edges were inserted out-of-band — directly via the dashboard SQL editor
--   or psql — and had no versioned source.
--
-- Source recovered: backend/seed/seed_data.sql lines 584-710.
--   - "BLOCK 1 (sciences)": 37 edges → 31 SMB-scientific (math 20 + physics 4
--     + svt 7) + 6 engineering (Sciences de l'Ingénieur).
--   - "WAVE 1 PREREQUISITES (General subjects)": 16 edges across philosophy,
--     french, arabic, english, islamic_ed.
--   - "WAVE 2 PREREQUISITES (Economics subjects)": 20 edges across economics,
--     business, accounting, law.
--   Total: 73 edges, verified exact byte-for-byte match against the prod
--   rows in skill_prerequisites that are NOT attributable to PC or SVT via
--   the skills.code-prefix / topics.subject_id rules.
--
-- Closes a known-issues.md K-3-shaped gap: encoder/script output ran on
-- prod without being captured as a numbered migration. After this lands,
-- a fresh `supabase db reset` reproduces prod's full 103-edge DAG.
--
-- Stream attribution rule (mirrors the diagnostic):
--   skills.code LIKE 'sma_%'                                  → SMA
--   skills.code LIKE 'pc_%'                                   → PC
--   skills.code LIKE 'svt_%'                                  → SVT
--   else: subject ∈ ('math','physics','svt')                  → SMB
--   else:                                                       → humanities
-- "humanities" here means: every non-scientific filière — engineering,
-- philosophy, languages, islamic_ed, economics, business, accounting, law.
--
-- Idempotent: ON CONFLICT (skill_id, prerequisite_skill_id) DO NOTHING per
-- the existing pattern in migrations 032 and 036. Safe to re-run; safe
-- against any subset already present in prod.
-- ============================================================================

BEGIN;

-- ----------------------------------------------------------------------------
-- BLOCK 1 — SMB-scientific (math 20 + physics 4 + svt 7) + engineering (6)
-- Recovered from backend/seed/seed_data.sql lines 584-659.
-- ----------------------------------------------------------------------------
INSERT INTO public.skill_prerequisites (skill_id, prerequisite_skill_id) VALUES
  -- ===== MATHS (unprefixed, used by SMB filière) =====
  -- Geometric requires arithmetic
  ('33333333-0000-0000-0000-000000000002', '33333333-0000-0000-0000-000000000001'),
  -- Convergence requires both sequence types
  ('33333333-0000-0000-0000-000000000003', '33333333-0000-0000-0000-000000000001'),
  ('33333333-0000-0000-0000-000000000003', '33333333-0000-0000-0000-000000000002'),
  -- Recursive requires convergence
  ('33333333-0000-0000-0000-000000000004', '33333333-0000-0000-0000-000000000003'),
  -- Adjacent requires recursive
  ('33333333-0000-0000-0000-000000000005', '33333333-0000-0000-0000-000000000004'),
  -- Limit calc requires limit def
  ('33333333-0000-0000-0000-000000000007', '33333333-0000-0000-0000-000000000006'),
  -- Continuity requires limit calc
  ('33333333-0000-0000-0000-000000000008', '33333333-0000-0000-0000-000000000007'),
  -- TVI requires continuity
  ('33333333-0000-0000-0000-000000000009', '33333333-0000-0000-0000-000000000008'),
  -- Deriv rules requires deriv basic
  ('33333333-0000-0000-0000-000000000011', '33333333-0000-0000-0000-000000000010'),
  -- Deriv apps requires deriv rules
  ('33333333-0000-0000-0000-000000000012', '33333333-0000-0000-0000-000000000011'),
  -- Primitives requires deriv rules
  ('33333333-0000-0000-0000-000000000013', '33333333-0000-0000-0000-000000000011'),
  -- Definite integral requires primitives
  ('33333333-0000-0000-0000-000000000014', '33333333-0000-0000-0000-000000000013'),
  -- Integral apps requires definite integral
  ('33333333-0000-0000-0000-000000000015', '33333333-0000-0000-0000-000000000014'),
  -- Conditional prob requires basic prob
  ('33333333-0000-0000-0000-000000000017', '33333333-0000-0000-0000-000000000016'),
  -- Random variables requires conditional
  ('33333333-0000-0000-0000-000000000018', '33333333-0000-0000-0000-000000000017'),
  -- Complex trig requires complex basics
  ('33333333-0000-0000-0000-000000000020', '33333333-0000-0000-0000-000000000019'),
  -- Complex geometry requires complex trig
  ('33333333-0000-0000-0000-000000000021', '33333333-0000-0000-0000-000000000020'),
  -- ODE first order requires deriv_rules AND primitives
  ('33333333-0000-0000-0000-000000000022', '33333333-0000-0000-0000-000000000011'),
  ('33333333-0000-0000-0000-000000000022', '33333333-0000-0000-0000-000000000013'),
  -- ODE second order requires ODE first order
  ('33333333-0000-0000-0000-000000000023', '33333333-0000-0000-0000-000000000022'),
  -- ===== PHYSICS (unprefixed, SMB filière) =====
  -- Newton's laws requires kinematics
  ('33333333-0000-0000-0000-000000000025', '33333333-0000-0000-0000-000000000024'),
  -- Energy requires Newton's laws
  ('33333333-0000-0000-0000-000000000026', '33333333-0000-0000-0000-000000000025'),
  -- Sound/light requires wave properties
  ('33333333-0000-0000-0000-000000000028', '33333333-0000-0000-0000-000000000027'),
  -- RLC oscillations requires RC/RL circuits
  ('33333333-0000-0000-0000-000000000030', '33333333-0000-0000-0000-000000000029'),
  -- ===== SVT (unprefixed, SMB filière — distinct from svt_-prefixed skills) =====
  -- Fermentation requires cell energy
  ('33333333-0000-0000-0000-000000000034', '33333333-0000-0000-0000-000000000033'),
  -- Gene expression requires DNA structure
  ('33333333-0000-0000-0000-000000000036', '33333333-0000-0000-0000-000000000035'),
  -- Mutations requires gene expression
  ('33333333-0000-0000-0000-000000000037', '33333333-0000-0000-0000-000000000036'),
  -- Sex-linked heredity requires autosomal heredity
  ('33333333-0000-0000-0000-000000000039', '33333333-0000-0000-0000-000000000038'),
  -- Specific immunity requires self/non-self
  ('33333333-0000-0000-0000-000000000041', '33333333-0000-0000-0000-000000000040'),
  -- Immune disorders requires specific immunity
  ('33333333-0000-0000-0000-000000000042', '33333333-0000-0000-0000-000000000041'),
  -- Metamorphism requires tectonic deformations
  ('33333333-0000-0000-0000-000000000044', '33333333-0000-0000-0000-000000000043'),
  -- ===== ENGINEERING (Sciences de l'Ingénieur) =====
  -- SADT/FAST requires needs analysis
  ('33333333-0000-0000-0000-000000000046', '33333333-0000-0000-0000-000000000045'),
  -- Energy convert requires energy supply
  ('33333333-0000-0000-0000-000000000048', '33333333-0000-0000-0000-000000000047'),
  -- GRAFCET requires sensors
  ('33333333-0000-0000-0000-000000000050', '33333333-0000-0000-0000-000000000049'),
  -- Kinematics of solids requires statics
  ('33333333-0000-0000-0000-000000000052', '33333333-0000-0000-0000-000000000051'),
  -- RDM traction requires statics
  ('33333333-0000-0000-0000-000000000053', '33333333-0000-0000-0000-000000000051'),
  -- RDM flexion requires RDM traction
  ('33333333-0000-0000-0000-000000000054', '33333333-0000-0000-0000-000000000053')
ON CONFLICT (skill_id, prerequisite_skill_id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- BLOCK 2 — Wave 1 humanities: philosophy / french / arabic / english /
-- islamic_ed (16 edges). Recovered from seed_data.sql lines 662-683.
-- ----------------------------------------------------------------------------
INSERT INTO public.skill_prerequisites (skill_id, prerequisite_skill_id) VALUES
  -- Philosophy
  ('33333333-0000-0000-0000-000000000056', '33333333-0000-0000-0000-000000000055'),  -- theory_experience → truth_opinion
  ('33333333-0000-0000-0000-000000000060', '33333333-0000-0000-0000-000000000059'),  -- violence_legitimacy → justice_law
  ('33333333-0000-0000-0000-000000000062', '33333333-0000-0000-0000-000000000061'),  -- happiness_desire → duty_freedom
  -- French
  ('33333333-0000-0000-0000-000000000065', '33333333-0000-0000-0000-000000000063'),  -- argumentation → text_analysis
  ('33333333-0000-0000-0000-000000000067', '33333333-0000-0000-0000-000000000066'),  -- commentary → essay_structure
  ('33333333-0000-0000-0000-000000000068', '33333333-0000-0000-0000-000000000067'),  -- essay_writing → commentary
  ('33333333-0000-0000-0000-000000000070', '33333333-0000-0000-0000-000000000069'),  -- theater_study → novel_study
  -- Arabic
  ('33333333-0000-0000-0000-000000000073', '33333333-0000-0000-0000-000000000071'),  -- grammatical_analysis → syntax_rules
  ('33333333-0000-0000-0000-000000000075', '33333333-0000-0000-0000-000000000074'),  -- badie → bayan
  ('33333333-0000-0000-0000-000000000077', '33333333-0000-0000-0000-000000000076'),  -- literary_analysis → text_comprehension
  ('33333333-0000-0000-0000-000000000078', '33333333-0000-0000-0000-000000000077'),  -- essay_ar → literary_analysis
  -- English
  ('33333333-0000-0000-0000-000000000080', '33333333-0000-0000-0000-000000000079'),  -- grammar_structures → tenses
  ('33333333-0000-0000-0000-000000000083', '33333333-0000-0000-0000-000000000082'),  -- reading_inference → reading_comp
  ('33333333-0000-0000-0000-000000000085', '33333333-0000-0000-0000-000000000084'),  -- essay_en → letter_email
  -- Islamic Education
  ('33333333-0000-0000-0000-000000000090', '33333333-0000-0000-0000-000000000089'),  -- family_law → worship_rules
  ('33333333-0000-0000-0000-000000000093', '33333333-0000-0000-0000-000000000091')   -- ethics_work → social_solidarity
ON CONFLICT (skill_id, prerequisite_skill_id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- BLOCK 3 — Wave 2 economics-cluster: economics / business / accounting /
-- law (20 edges). Recovered from seed_data.sql lines 686-710.
-- ----------------------------------------------------------------------------
INSERT INTO public.skill_prerequisites (skill_id, prerequisite_skill_id) VALUES
  -- Economics
  ('33333333-0000-0000-0000-000000000095', '33333333-0000-0000-0000-000000000094'),  -- market_structures → supply_demand
  ('33333333-0000-0000-0000-000000000096', '33333333-0000-0000-0000-000000000095'),  -- price_elasticity → market_structures
  ('33333333-0000-0000-0000-000000000098', '33333333-0000-0000-0000-000000000097'),  -- financial_system → money_credit
  ('33333333-0000-0000-0000-000000000100', '33333333-0000-0000-0000-000000000099'),  -- development_indicators → gdp_growth
  ('33333333-0000-0000-0000-000000000101', '33333333-0000-0000-0000-000000000100'),  -- international_trade → development_indicators
  -- Business
  ('33333333-0000-0000-0000-000000000103', '33333333-0000-0000-0000-000000000102'),  -- enterprise_environment → enterprise_types
  ('33333333-0000-0000-0000-000000000105', '33333333-0000-0000-0000-000000000104'),  -- human_resources → org_structure
  ('33333333-0000-0000-0000-000000000106', '33333333-0000-0000-0000-000000000104'),  -- production_management → org_structure
  ('33333333-0000-0000-0000-000000000108', '33333333-0000-0000-0000-000000000107'),  -- business_strategy → marketing_mix
  ('33333333-0000-0000-0000-000000000109', '33333333-0000-0000-0000-000000000108'),  -- quality_management → business_strategy
  -- Accounting
  ('33333333-0000-0000-0000-000000000111', '33333333-0000-0000-0000-000000000110'),  -- balance_sheet → journal_entries
  ('33333333-0000-0000-0000-000000000112', '33333333-0000-0000-0000-000000000111'),  -- inventory_depreciation → balance_sheet
  ('33333333-0000-0000-0000-000000000113', '33333333-0000-0000-0000-000000000111'),  -- financial_ratios → balance_sheet
  ('33333333-0000-0000-0000-000000000114', '33333333-0000-0000-0000-000000000113'),  -- working_capital → financial_ratios
  ('33333333-0000-0000-0000-000000000116', '33333333-0000-0000-0000-000000000115'),  -- compound_interest → simple_interest
  ('33333333-0000-0000-0000-000000000117', '33333333-0000-0000-0000-000000000116'),  -- annuities → compound_interest
  -- Law
  ('33333333-0000-0000-0000-000000000119', '33333333-0000-0000-0000-000000000118'),  -- obligations → contracts
  ('33333333-0000-0000-0000-000000000120', '33333333-0000-0000-0000-000000000119'),  -- liability → obligations
  ('33333333-0000-0000-0000-000000000122', '33333333-0000-0000-0000-000000000121'),  -- business_entities → commercial_acts
  ('33333333-0000-0000-0000-000000000124', '33333333-0000-0000-0000-000000000123')   -- social_protection → labor_law
ON CONFLICT (skill_id, prerequisite_skill_id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Verification. Asserts the per-stream edge distribution matches the
-- diagnostic that motivated this recovery. A failure rolls the whole
-- migration back (we're inside BEGIN; ... COMMIT;).
-- ----------------------------------------------------------------------------
DO $verify$
DECLARE
  v_total       INT;
  v_sma         INT;
  v_smb         INT;
  v_pc          INT;
  v_svt         INT;
  v_humanities  INT;
  v_cross       INT;
BEGIN
  WITH skill_stream AS (
    SELECT
      sk.id,
      CASE
        WHEN sk.code LIKE 'sma\_%' ESCAPE '\' THEN 'SMA'
        WHEN sk.code LIKE 'pc\_%'  ESCAPE '\' THEN 'PC'
        WHEN sk.code LIKE 'svt\_%' ESCAPE '\' THEN 'SVT'
        WHEN sub.code IN ('math','physics','svt')      THEN 'SMB'
        ELSE                                                'humanities'
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

  IF v_sma <> 0 THEN
    RAISE EXCEPTION
      'Migration 041 verification: SMA edges expected 0, got %', v_sma;
  END IF;
  IF v_smb <> 31 THEN
    RAISE EXCEPTION
      'Migration 041 verification: SMB edges expected 31, got %', v_smb;
  END IF;
  IF v_pc <> 21 THEN
    RAISE EXCEPTION
      'Migration 041 verification: PC edges expected 21, got %', v_pc;
  END IF;
  IF v_svt <> 9 THEN
    RAISE EXCEPTION
      'Migration 041 verification: SVT edges expected 9, got %', v_svt;
  END IF;
  IF v_humanities <> 42 THEN
    RAISE EXCEPTION
      'Migration 041 verification: humanities edges expected 42, got %',
      v_humanities;
  END IF;
  IF v_total <> 103 THEN
    RAISE EXCEPTION
      'Migration 041 verification: total edges expected 103, got %', v_total;
  END IF;
  IF v_cross <> 0 THEN
    RAISE EXCEPTION
      'Migration 041 verification: cross-stream edges expected 0, got %',
      v_cross;
  END IF;

  RAISE NOTICE
    'Migration 041 verification OK: total=% SMA=% SMB=% PC=% SVT=% humanities=% cross=%',
    v_total, v_sma, v_smb, v_pc, v_svt, v_humanities, v_cross;
END
$verify$;

COMMIT;

-- ============================================================================
-- Reversal (manual — repo is forward-only):
--
--   DELETE FROM public.skill_prerequisites
--   WHERE (skill_id, prerequisite_skill_id) IN (
--     /* the 73 tuples above */
--   );
--
-- Not recommended unless paired with a DROP of seed_data.sql's prereq blocks
-- — otherwise the edges return on the next out-of-band run.
-- ============================================================================
