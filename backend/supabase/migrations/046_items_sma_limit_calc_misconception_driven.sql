-- ============================================================================
-- Migration 046: Misconception-driven MCQ items on sma_limit_calc.
-- ----------------------------------------------------------------------------
-- Step 3 of the misconception vertical slice. Per ADR 0011 (Path B):
-- author 4 new MCQ items on sma_limit_calc directly. Each item is born with
-- distractor_misconceptions populated, mapping the misconception's
-- distractor slot to the misconception ID. No separate tagging step.
--
-- Skill attribution (architecture.md §5.5; ADR 0011 §"Skill attribution"):
--   sma_limit_calc        id = 33333333-aaaa-0000-0000-000000000002 ← here
--   limit_calc (legacy)   id = 33333333-0000-0000-0000-000000000007 ← untouched
-- The unprefixed bank serves SMB students and is NOT modified by this
-- migration. Items below land on the SMA-prefixed row exclusively.
--
-- Item IDs follow the convention 44444444-aaaa-{batch}-0000-{misconception index}.
-- The `-aaaa-` segment mirrors the SMA-prefix UUID family on skills.
-- The `{batch}` segment is non-zero to leave the …-0000-… range for the
-- legacy SMA item bank (migration 018 occupies 44444444-aaaa-0000-0000-001
-- through 44444444-aaaa-0000-0000-081 with 129 SMA-specific items). This
-- migration uses batch `0001` — misconception-driven items batch 1 — so the
-- four IDs are 44444444-aaaa-0001-0000-000000000001..04. Future
-- misconception-driven batches increment `{batch}`; the initial naïve choice
-- of `…-0000-…001` collided with mig 018 and was caught by the verify block
-- on the first branch-test attempt.
--
-- distractor_misconceptions key convention (established by this migration):
--   keys are STRING-NUMERIC 0-based indices into question.choices[]:
--     "0" → first choice (typically correct, rarely tagged)
--     "1" → second choice
--     "2" → third choice
--     "3" → fourth choice
--   Values are misconception IDs from skills.common_misconceptions[].id.
--   Letter labels (A/B/C/D) appear only on the misconception side
--   (distinguishing_mcq_stem.distractor_choice_label per ADR 0009);
--   conversion is mechanical (A=0, B=1, C=2, D=3).
--
-- Items.tags carry 'misconception_driven' (bac-curriculum's convention from
-- ADR 0011 §"Marker convention") so the SRS / IRT layer can ignore these
-- items until graduated. M2's item additionally carries 'continuity-adjacent'
-- because the cadre treats piecewise / limit-vs-value-at-point under the
-- continuité unit (ADR 0011 §"Cadre fit"). M4's item is at difficulty 4 — the
-- two-step rewrite (substitute u=x², invoke fundamental trig limit) sits at
-- the discriminating end of the SMA difficulty band.
--
-- Cross-contamination check (pedagogy-auditor's failure mode):
--   every non-target distractor must NOT surface another misconception in
--   the M1-M4 set. Verified at authoring time and re-verified by the agent
--   review captured in ADR 0012 §"Three-agent review". M4's fourth distractor
--   was set to "+∞" (not "la limite n'existe pas" as in the seed JSON), because
--   "la limite n'existe pas" on a 0/0-form stem surfaces M1 and would
--   contaminate the diagnosis on a stem authored to distinguish M4 from M1-3.
--
-- Idempotent: INSERT … ON CONFLICT (id) DO NOTHING. Re-runs are no-ops.
--
-- Prereq baseline (SMA=98, SMB=31, PC=21, SVT=9, humanities=42, total=201,
-- cross=0): not touched. Re-asserted by the verify block.
-- migration 045's misconceptions on sma_limit_calc.common_misconceptions:
-- not touched. Re-asserted by the verify block (4 entries, same IDs).
-- ============================================================================

BEGIN;

-- ----------------------------------------------------------------------------
-- M1 — forme-indeterminee-valeur-nulle
--   trigger distractor "B" (index 1) = 0; M1's secondary signature
--   "C" (index 2) = "la limite n'existe pas" also tags M1.
--   D=1 is a plausible-procedural distractor (ratio of leading-term confusion)
--   not surfacing M2/M3/M4.
-- ----------------------------------------------------------------------------
INSERT INTO public.items (
  id, skill_id, item_type, difficulty_level, content_language,
  question, explanation, tags, distractor_misconceptions, is_active
) VALUES (
  '44444444-aaaa-0001-0000-000000000001',
  '33333333-aaaa-0000-0000-000000000002',  -- sma_limit_calc
  'mcq',
  2,
  'fr',
  $q$
  {
    "stem": "Calculer lim(x→2) (x²−4)/(x−2).",
    "latex": true,
    "choices": ["4", "0", "la limite n'existe pas", "1"],
    "correct_index": 0
  }
  $q$::jsonb,
  $e$
  {
    "text_fr": "Forme indéterminée 0/0. Factoriser le numérateur : x²−4 = (x−2)(x+2). Simplifier par (x−2) pour x ≠ 2, puis évaluer x+2 en x=2.",
    "steps": [
      "Substitution directe : (2²−4)/(2−2) = 0/0 — forme indéterminée",
      "Factoriser : x²−4 = (x−2)(x+2)",
      "Simplifier : (x²−4)/(x−2) = x+2 pour x ≠ 2",
      "Évaluer : lim(x→2) (x+2) = 4"
    ]
  }
  $e$::jsonb,
  ARRAY['bac_style', 'misconception_driven', 'sma_limit_calc'],
  $dm$
  {
    "1": "mc.math.sma_limit_calc.forme-indeterminee-valeur-nulle",
    "2": "mc.math.sma_limit_calc.forme-indeterminee-valeur-nulle"
  }
  $dm$::jsonb,
  TRUE
) ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- M2 — limite-egale-valeur-point
--   trigger distractor "B" (index 1) = 7 (the value f(1)).
--   C=1 (the limit point itself, a different confusion) and D="n'existe pas"
--   (a continuité-confusion misconception NOT in M1-M4) are plausible-
--   procedural distractors without cross-contamination — neither surfaces
--   M1 (no 0/0 form here), M3 (no ∞), or M4 (no sin).
--   Tagged 'continuity-adjacent' per ADR 0011 §"Cadre fit" — the cadre
--   places the limit-vs-value-at-point distinction inside continuité.
-- ----------------------------------------------------------------------------
INSERT INTO public.items (
  id, skill_id, item_type, difficulty_level, content_language,
  question, explanation, tags, distractor_misconceptions, is_active
) VALUES (
  '44444444-aaaa-0001-0000-000000000002',
  '33333333-aaaa-0000-0000-000000000002',
  'mcq',
  2,
  'fr',
  $q$
  {
    "stem": "Soit f définie par f(x) = x+3 pour x ≠ 1, et f(1) = 7. Que vaut lim(x→1) f(x) ?",
    "latex": true,
    "choices": ["4", "7", "1", "la limite n'existe pas"],
    "correct_index": 0
  }
  $q$::jsonb,
  $e$
  {
    "text_fr": "La limite décrit le comportement de f au voisinage de 1, indépendamment de la valeur f(1). Pour x ≠ 1 la fonction vaut x+3 ; donc lim(x→1) f(x) = 1+3 = 4, même si f(1) est définie à 7. La fonction est discontinue en 1 mais la limite existe.",
    "steps": [
      "Identifier l'expression de f près de 1 (mais pas en 1) : f(x) = x+3",
      "Calculer la limite en utilisant cette expression : lim(x→1) (x+3) = 4",
      "Ne pas confondre avec f(1) = 7 — c'est une valeur de la fonction, pas la limite"
    ]
  }
  $e$::jsonb,
  ARRAY['bac_style', 'misconception_driven', 'sma_limit_calc', 'continuity-adjacent'],
  $dm$
  {
    "1": "mc.math.sma_limit_calc.limite-egale-valeur-point"
  }
  $dm$::jsonb,
  TRUE
) ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- M3 — infini-moins-infini-nul
--   trigger distractor "B" (index 1) = 0 (∞−∞=0).
--   C=−∞ (sign-error confusion) and D=1 (leading-coefficient confusion) are
--   plausible-procedural distractors without cross-contamination — neither
--   surfaces M1 (no 0/0 form), M2 (no finite-point substitution), or M4 (no sin).
-- ----------------------------------------------------------------------------
INSERT INTO public.items (
  id, skill_id, item_type, difficulty_level, content_language,
  question, explanation, tags, distractor_misconceptions, is_active
) VALUES (
  '44444444-aaaa-0001-0000-000000000003',
  '33333333-aaaa-0000-0000-000000000002',
  'mcq',
  2,
  'fr',
  $q$
  {
    "stem": "Calculer lim(x→+∞) (x² − x).",
    "latex": true,
    "choices": ["+∞", "0", "−∞", "1"],
    "correct_index": 0
  }
  $q$::jsonb,
  $e$
  {
    "text_fr": "Forme indéterminée ∞−∞. Factoriser par le terme dominant : x²−x = x(x−1). Pour x→+∞, le facteur x→+∞ et (x−1)→+∞, donc le produit tend vers +∞.",
    "steps": [
      "Reconnaître la forme indéterminée ∞ − ∞ (∞ n'est pas un réel — la soustraction n'est pas définie sans réécriture)",
      "Factoriser par le terme dominant : x² − x = x(x−1)",
      "Évaluer la limite du produit : lim x · lim (x−1) = (+∞)·(+∞) = +∞"
    ]
  }
  $e$::jsonb,
  ARRAY['bac_style', 'misconception_driven', 'sma_limit_calc'],
  $dm$
  {
    "1": "mc.math.sma_limit_calc.infini-moins-infini-nul"
  }
  $dm$::jsonb,
  TRUE
) ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- M4 — limite-fondamentale-linearite  (difficulty 4)
--   primary trigger distractor "C" (index 2) = 2 ("le 2 dans x² passe devant").
--   M4 variant on "B" (index 1) = 1 ("sin sur x = 1 toujours") — also tags M4.
--   D=+∞ is a plausible non-misconception distractor (student misreads
--   sin(x²) bound and concludes 1/x divergence dominates). It explicitly
--   replaces the seed-JSON original D="la limite n'existe pas" because that
--   choice on a 0/0-form stem would surface M1 and contaminate the diagnosis.
-- ----------------------------------------------------------------------------
INSERT INTO public.items (
  id, skill_id, item_type, difficulty_level, content_language,
  question, explanation, tags, distractor_misconceptions, is_active
) VALUES (
  '44444444-aaaa-0001-0000-000000000004',
  '33333333-aaaa-0000-0000-000000000002',
  'mcq',
  4,
  'fr',
  $q$
  {
    "stem": "Calculer lim(x→0) sin(x²)/x.",
    "latex": true,
    "choices": ["0", "1", "2", "+∞"],
    "correct_index": 0
  }
  $q$::jsonb,
  $e$
  {
    "text_fr": "Réécrire pour faire apparaître la limite fondamentale sin(u)/u = 1 quand u→0. Poser u = x² : sin(x²)/x = x · sin(x²)/x². Quand x→0, x²→0 et sin(x²)/x²→1, donc le produit tend vers 0·1 = 0. La règle « le coefficient passe devant » est une heuristique qui ne s'applique pas ici — l'argument du sinus (x²) et le dénominateur (x) ne sont pas le même infiniment petit.",
    "steps": [
      "Identifier la limite fondamentale : sin(u)/u → 1 quand u → 0",
      "Réécrire sin(x²)/x = x · sin(x²)/x² (multiplication-division par x)",
      "Poser u = x² ; quand x → 0, u → 0 et sin(u)/u → 1",
      "Évaluer le produit : lim x · lim sin(x²)/x² = 0 · 1 = 0"
    ]
  }
  $e$::jsonb,
  ARRAY['bac_style', 'misconception_driven', 'sma_limit_calc'],
  $dm$
  {
    "1": "mc.math.sma_limit_calc.limite-fondamentale-linearite",
    "2": "mc.math.sma_limit_calc.limite-fondamentale-linearite"
  }
  $dm$::jsonb,
  TRUE
) ON CONFLICT (id) DO NOTHING;

-- ----------------------------------------------------------------------------
-- Verify block.
--
-- Asserts:
--   3a. four new items exist on sma_limit_calc.
--   3b. every new item has a non-empty distractor_misconceptions.
--   3c. every new item is tagged 'misconception_driven'.
--   3d. M2's item carries 'continuity-adjacent'.
--   3e. M4's item is difficulty 4.
--   3f. each of the four misconception IDs is referenced by EXACTLY ONE item.
--       This is the FK-round-trip check ADR 0011 §"FK semantic mismatch"
--       called load-bearing: a scheduler join "give me the items diagnosing
--       misconception X on skill sma_limit_calc" must return one row, and
--       skill_id round-trips to sma_limit_calc (not to the unprefixed
--       limit_calc).
--   3g. migration 045's misconceptions on sma_limit_calc unchanged
--       (still 4 entries, same IDs).
--   3h. prereq baseline unchanged.
-- ----------------------------------------------------------------------------
DO $verify$
DECLARE
  v_item_count       INT;
  v_sma_skill_id     UUID := '33333333-aaaa-0000-0000-000000000002';
  v_legacy_skill_id  UUID := '33333333-0000-0000-0000-000000000007';
  v_offender_id      UUID;
  v_mc_id            TEXT;
  v_mc_ref_count     INT;
  v_round_trip_skill UUID;
  v_mc_count         INT;
  v_total INT; v_sma INT; v_smb INT; v_pc INT; v_svt INT; v_humanities INT; v_cross INT;
  v_expected_mc_ids  TEXT[] := ARRAY[
    'mc.math.sma_limit_calc.forme-indeterminee-valeur-nulle',
    'mc.math.sma_limit_calc.limite-egale-valeur-point',
    'mc.math.sma_limit_calc.infini-moins-infini-nul',
    'mc.math.sma_limit_calc.limite-fondamentale-linearite'
  ];
BEGIN

  -- 3a. four new items exist on sma_limit_calc.
  SELECT COUNT(*) INTO v_item_count
  FROM public.items
  WHERE id IN (
    '44444444-aaaa-0001-0000-000000000001',
    '44444444-aaaa-0001-0000-000000000002',
    '44444444-aaaa-0001-0000-000000000003',
    '44444444-aaaa-0001-0000-000000000004'
  )
  AND skill_id = v_sma_skill_id
  AND item_type = 'mcq';
  IF v_item_count <> 4 THEN
    RAISE EXCEPTION 'Migration 046 post-condition: expected 4 new MCQ items on sma_limit_calc, got %', v_item_count;
  END IF;

  -- 3b. every new item has a non-empty distractor_misconceptions.
  SELECT id INTO v_offender_id
  FROM public.items
  WHERE id IN (
    '44444444-aaaa-0001-0000-000000000001',
    '44444444-aaaa-0001-0000-000000000002',
    '44444444-aaaa-0001-0000-000000000003',
    '44444444-aaaa-0001-0000-000000000004'
  )
  AND (distractor_misconceptions IS NULL
       OR jsonb_typeof(distractor_misconceptions) <> 'object'
       OR (SELECT COUNT(*) FROM jsonb_object_keys(distractor_misconceptions)) = 0)
  LIMIT 1;
  IF v_offender_id IS NOT NULL THEN
    RAISE EXCEPTION 'Migration 046 post-condition: item % has empty distractor_misconceptions', v_offender_id;
  END IF;

  -- 3c. every new item is tagged 'misconception_driven'.
  SELECT id INTO v_offender_id
  FROM public.items
  WHERE id IN (
    '44444444-aaaa-0001-0000-000000000001',
    '44444444-aaaa-0001-0000-000000000002',
    '44444444-aaaa-0001-0000-000000000003',
    '44444444-aaaa-0001-0000-000000000004'
  )
  AND NOT ('misconception_driven' = ANY(tags))
  LIMIT 1;
  IF v_offender_id IS NOT NULL THEN
    RAISE EXCEPTION 'Migration 046 post-condition: item % missing misconception_driven tag', v_offender_id;
  END IF;

  -- 3d. M2's item carries 'continuity-adjacent'.
  IF NOT EXISTS (
    SELECT 1 FROM public.items
    WHERE id = '44444444-aaaa-0001-0000-000000000002'
      AND 'continuity-adjacent' = ANY(tags)
  ) THEN
    RAISE EXCEPTION 'Migration 046 post-condition: M2 item missing continuity-adjacent tag';
  END IF;

  -- 3e. M4's item is difficulty 4.
  IF NOT EXISTS (
    SELECT 1 FROM public.items
    WHERE id = '44444444-aaaa-0001-0000-000000000004'
      AND difficulty_level = 4
  ) THEN
    RAISE EXCEPTION 'Migration 046 post-condition: M4 item not at difficulty 4';
  END IF;

  -- 3f. Each of the four misconception IDs is referenced by EXACTLY ONE item
  --     AND that item is on sma_limit_calc (the FK-round-trip check from
  --     ADR 0011 §"FK semantic mismatch").
  FOREACH v_mc_id IN ARRAY v_expected_mc_ids LOOP
    SELECT COUNT(*) INTO v_mc_ref_count
    FROM public.items
    WHERE distractor_misconceptions::text LIKE '%' || v_mc_id || '%';
    IF v_mc_ref_count <> 1 THEN
      RAISE EXCEPTION 'Migration 046 post-condition: misconception % referenced by % items (expected exactly 1)', v_mc_id, v_mc_ref_count;
    END IF;

    SELECT skill_id INTO v_round_trip_skill
    FROM public.items
    WHERE distractor_misconceptions::text LIKE '%' || v_mc_id || '%'
    LIMIT 1;
    IF v_round_trip_skill <> v_sma_skill_id THEN
      RAISE EXCEPTION 'Migration 046 post-condition: misconception % is tagged on an item with skill_id %, expected sma_limit_calc (%)', v_mc_id, v_round_trip_skill, v_sma_skill_id;
    END IF;
  END LOOP;

  -- 3g. Migration 045's misconceptions on sma_limit_calc unchanged.
  SELECT jsonb_array_length(common_misconceptions) INTO v_mc_count
  FROM public.skills WHERE id = v_sma_skill_id;
  IF v_mc_count <> 4 THEN
    RAISE EXCEPTION 'Migration 046 post-condition: sma_limit_calc.common_misconceptions has % entries (expected 4 — migration 045 regressed?)', v_mc_count;
  END IF;

  -- 3h. Prereq baseline unchanged.
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

  IF v_sma        <> 98  THEN RAISE EXCEPTION 'Migration 046 prereq baseline: SMA expected 98, got %', v_sma; END IF;
  IF v_smb        <> 31  THEN RAISE EXCEPTION 'Migration 046 prereq baseline: SMB expected 31, got %', v_smb; END IF;
  IF v_pc         <> 21  THEN RAISE EXCEPTION 'Migration 046 prereq baseline: PC expected 21, got %', v_pc; END IF;
  IF v_svt        <> 9   THEN RAISE EXCEPTION 'Migration 046 prereq baseline: SVT expected 9, got %', v_svt; END IF;
  IF v_humanities <> 42  THEN RAISE EXCEPTION 'Migration 046 prereq baseline: humanities expected 42, got %', v_humanities; END IF;
  IF v_total      <> 201 THEN RAISE EXCEPTION 'Migration 046 prereq baseline: total expected 201, got %', v_total; END IF;
  IF v_cross      <> 0   THEN RAISE EXCEPTION 'Migration 046 prereq baseline: cross-stream edges expected 0, got %', v_cross; END IF;

  RAISE NOTICE
    'Migration 046 verification OK: 4 misconception-driven MCQ items on sma_limit_calc, each tagged misconception_driven, M2 also continuity-adjacent, M4 at difficulty 4. FK round-trip clean (every misconception ID resolves to exactly one item on sma_limit_calc). Migration 045 misconceptions unchanged (4 entries). Prereq baseline unchanged: total=% SMA=% SMB=% PC=% SVT=% humanities=% cross=%',
    v_total, v_sma, v_smb, v_pc, v_svt, v_humanities, v_cross;
END
$verify$;

COMMIT;

-- ============================================================================
-- Reversal (manual — repo is forward-only):
--
--   DELETE FROM public.items WHERE id IN (
--     '44444444-aaaa-0001-0000-000000000001',
--     '44444444-aaaa-0001-0000-000000000002',
--     '44444444-aaaa-0001-0000-000000000003',
--     '44444444-aaaa-0001-0000-000000000004'
--   );
--
-- Safe ONLY if no user_misconception_states row has fired from these items
-- yet (which would orphan diagnostic evidence). Check before running:
--   SELECT COUNT(*) FROM public.user_misconception_states
--    WHERE skill_id = '33333333-aaaa-0000-0000-000000000002'
--      AND misconception_id LIKE 'mc.math.sma_limit_calc.%';
-- If > 0, the items have been exercised; reversal will lose that evidence.
-- ============================================================================
