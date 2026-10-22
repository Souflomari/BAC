-- ============================================================================
-- DISPOSABLE · STAGING-ONLY · EVAL-HARNESS MIGRATION  (NOT canonical history)
-- ----------------------------------------------------------------------------
-- File:   001_eval_items_conditional_probability.sql
-- Lane:   supabase-architect (production-touching lane), eval harness slice.
-- Status: PROVISIONAL. This file is a DISPOSABLE proof-of-landing for the
--         conditional-probability item bank against a STAGING project only.
--
-- DO NOT COPY THIS FILE INTO backend/supabase/migrations/ AS-IS.
--   It deliberately lives outside the append-only canonical history because
--   the production-sync state is currently UNVERIFIED (CLAUDE.md
--   non-negotiables; RULES §3). Letting an eval file enter the numbered
--   migration sequence could perturb that sync. When the real landing
--   happens, a NEW, renumbered migration is authored against the live
--   schema after the sync check passes — see the SKILL-CODE RECONCILIATION
--   TODO below, which is a HARD blocker for the real migration.
--
-- What this migration lands (into the STAGING item/misconception schema):
--   1. The 8 conditional-probability misconceptions onto the SMA skill
--      `sma_prob_conditionnelle` (skills.common_misconceptions JSONB),
--      in the canonical six-field shape (migrations 043/044, ADR 0007/0008/0009).
--   2. The 24 misconception-driven MCQ items, each born with
--      distractor_misconceptions populated (migration 046 convention:
--      0-based STRING index "A"=0…"D"=3 → misconception id; a choice
--      reachable by more than one wrong model maps to an ARRAY of ids
--      [dual-tag]).
--
-- Source of truth (counts / ids / text / tags / distractor maps):
--   content/maths/probabilites-conditionnelles/items.yaml
--   content/maths/probabilites-conditionnelles/spec.md  (§1 field shape, §5 build)
--
-- Verify block (REQUIRED, see end): asserts post-state CARDINALITY *and*
--   CONTENT IDENTITY — exactly 8 misconceptions with the expected IDs, and
--   exactly 24 items with the expected IDs — and aborts (raises) on any
--   mismatch. A migration that "succeeds" while silently doing nothing is
--   the exact failure mode this block exists to prevent (lesson: mig 046).
--
-- Idempotent: misconceptions land via UPDATE (same end state on re-run);
--   items land via INSERT … ON CONFLICT (id) DO UPDATE so re-runs converge
--   to the authored state (staging may be re-run). No compounding side effect.
--
-- Distractor index convention (migration 046, restated):
--   keys are STRING 0-based indices into question.choices[]:
--     "0"→A  "1"→B  "2"→C  "3"→D
--   value is EITHER a single misconception id (single tag) OR an array of
--   ids (dual-tag, where one choice is genuinely reachable by >1 wrong model
--   — items.yaml `misconception` + `also_reveals`; spec §1 co-attribution
--   note). Dual-tagging is EXPECTED for the cousin families (M3/M4/M5,
--   M1/M8) and is NOT a stem defect.
--
-- ============================================================================
-- ⚠ SKILL-CODE / UUID RECONCILIATION — REQUIRED BEFORE ANY REAL MIGRATION
-- ----------------------------------------------------------------------------
-- spec §0.4 + ADR 0011 (two-parallel-banks): items MUST land on the
-- SMA-PREFIXED skill `sma_prob_conditionnelle`, NEVER the legacy unprefixed
-- `conditional_prob` (UUID 33333333-0000-0000-0000-000000000017) which serves
-- SMB and carries the old, untagged bank.
--
-- PROBLEM (real, do-not-paper-over): there is NO `sma_prob_conditionnelle`
-- skill row in the canonical migration history. Migration 012 seeds the SMA
-- curriculum (analyse, dérivation, ln/exp, suites, intégrales, équations
-- différentielles, complexes) but NO SMA probabilités topic/skill at all.
-- The real SMA skill_id (and its topic_id) DO NOT EXIST YET and MUST be
-- created + resolved by the real migration against the LIVE schema, by
-- supabase-architect, after the prod-sync check passes.
--
-- This file therefore does NOT invent a production UUID. Instead it resolves
-- the skill BY CODE at runtime, and — for STAGING SELF-SUFFICIENCY ONLY —
-- creates a clearly-fake placeholder subject/topic/skill scaffold (sentinel
-- UUIDs in the eeeeeeee-e7a1-… / 44444444-e7a1-… "e7a1=eval" namespace —
-- valid hex, deliberately recognizable as non-prod) ONLY IF the skill
-- is absent. Those sentinel UUIDs are NOT prod values and must never be
-- promoted. The real migration replaces this whole scaffold block with a
-- proper SMA probabilités topic/skill seed reviewed against the live schema.
-- TODO(real-migration): resolve/seed the real SMA skill + topic; delete the
--                       STAGING SCAFFOLD block below; re-point all inserts.
-- ============================================================================

BEGIN;

-- ============================================================================
-- 0. STAGING SCAFFOLD (placeholder — STAGING ONLY; delete for real migration).
--    Sentinel UUIDs are intentionally NON-PROD and visibly fake.
--    Guarded: only fabricates the subject/topic/skill if `sma_prob_conditionnelle`
--    does not already resolve. If a real SMA skill row exists on staging, the
--    migration binds to it and creates nothing.
-- ============================================================================
DO $scaffold$
DECLARE
  v_skill_id   UUID;
  v_subject_id UUID;
  v_topic_id   UUID;
  -- Visibly-fake sentinel UUIDs (eval namespace). NEVER a prod value.
  c_subject_id CONSTANT UUID := 'eeeeeeee-e7a1-0000-0000-000000000001';
  c_topic_id   CONSTANT UUID := 'eeeeeeee-e7a1-0000-0000-000000000002';
  c_skill_id   CONSTANT UUID := 'eeeeeeee-e7a1-0000-0000-000000000003';
BEGIN
  SELECT id INTO v_skill_id FROM public.skills WHERE code = 'sma_prob_conditionnelle';

  IF v_skill_id IS NOT NULL THEN
    RAISE NOTICE 'Eval migration: bound to existing skill sma_prob_conditionnelle (id=%). No scaffold created.', v_skill_id;
    RETURN;
  END IF;

  RAISE NOTICE 'Eval migration: skill sma_prob_conditionnelle absent — creating STAGING placeholder scaffold (sentinel UUIDs). This block is deleted for the real migration.';

  -- Reuse the math subject if present (code='math'); else create a sentinel one.
  SELECT id INTO v_subject_id FROM public.subjects WHERE code = 'math';
  IF v_subject_id IS NULL THEN
    INSERT INTO public.subjects (id, code, name_fr, name_ar)
    VALUES (c_subject_id, 'math', 'Mathématiques', 'الرياضيات')
    ON CONFLICT (code) DO NOTHING;
    SELECT id INTO v_subject_id FROM public.subjects WHERE code = 'math';
  END IF;

  -- Placeholder probabilités topic for SMA (sentinel).
  INSERT INTO public.topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight)
  VALUES (c_topic_id, v_subject_id, 'sma_probabilites_EVAL',
          'Probabilités (STAGING EVAL)', 'الاحتمالات', 99, 0.90)
  ON CONFLICT (subject_id, code) DO NOTHING;
  SELECT id INTO v_topic_id FROM public.topics
   WHERE subject_id = v_subject_id AND code = 'sma_probabilites_EVAL';

  -- Placeholder SMA conditional-probability skill (sentinel).
  INSERT INTO public.skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order)
  VALUES (c_skill_id, v_topic_id, 'sma_prob_conditionnelle',
          'Probabilités conditionnelles', 'الاحتمالات الشرطية', 3, 0.90, 0)
  ON CONFLICT (topic_id, code) DO NOTHING;
END
$scaffold$;

-- ============================================================================
-- 1. Load the 8 misconceptions onto skills.common_misconceptions.
--    Canonical six-field shape (043/044): id, label, description,
--    contradicts_principle, distinguishing_mcq_stem{5 sub-keys}, label_ar.
--    Resolved by code so it binds to the real SMA skill when present.
--    Dollar-quoted JSONB literal — no escaping needed for the FR/LaTeX text.
-- ============================================================================
UPDATE public.skills
SET    common_misconceptions = $mcs$
[
  {
    "id": "mc.math.sma_prob_conditionnelle.transpose-conditionnel",
    "label": "« P(A|B) et P(B|A) sont la même chose »",
    "description": "L'élève traite la probabilité conditionnelle comme symétrique : il lit P(B|A) et P(A|B) comme interchangeables, car « la probabilité de A et B ensemble » lui semble indépendante de l'ordre, comme A ∩ B. La barre est lue « et » au lieu de « sachant que ».",
    "contradicts_principle": "P(B|A) = P(A∩B)/P(A) et P(A|B) = P(A∩B)/P(B) partagent le même numérateur mais ont des dénominateurs différents. Elles sont égales seulement si P(A)=P(B). L'événement conditionneur est le dénominateur — « sachant B » signifie restreindre l'univers à B puis mesurer A à l'intérieur.",
    "distinguishing_mcq_stem": {
      "stem_text": "Une maladie touche 1 % de la population. Un test détecte 95 % des malades (P(T+|M)=0,95) et donne 10 % de faux positifs (P(T+|M̄)=0,10). Une personne est testée positive : quelle est P(M|T+) ? Choix : A) ≈ 0,09 ; B) 0,95 ; C) 0,50 ; D) 0,01.",
      "distractor_choice_label": "B",
      "distractor_rationale": "L'élève renvoie la sensibilité donnée P(T+|M)=0,95 à la place de P(M|T+) — il transpose le conditionnel.",
      "correct_choice_label": "A",
      "correct_rationale": "Lecture inverse de l'arbre : P(M|T+)=P(M∩T+)/P(T+)=0,0095/0,1085≈0,09."
    },
    "label_ar": null
  },
  {
    "id": "mc.math.sma_prob_conditionnelle.conditionnelle-egale-intersection",
    "label": "« P(A|B) = P(A∩B) »",
    "description": "L'élève confond la probabilité conditionnelle avec la probabilité conjointe — il omet la division par P(B). « Sachant B » et « et B » s'effondrent en une seule idée : les deux semblent signifier « A et B se réalisent ».",
    "contradicts_principle": "La probabilité conditionnelle renormalise à l'événement conditionneur : P(A|B) = P(A∩B)/P(B). La conjointe P(A∩B) est mesurée dans l'univers entier Ω ; la conditionnelle est mesurée dans l'univers restreint B. Diviser par P(B) est l'acte qui réduit l'univers à B.",
    "distinguishing_mcq_stem": {
      "stem_text": "On donne P(A∩B)=0,3 et P(B)=0,5. Que vaut P(A|B) ? Choix : A) 0,6 ; B) 0,3 ; C) 0,8 ; D) 0,15.",
      "distractor_choice_label": "B",
      "distractor_rationale": "L'élève renvoie la conjointe 0,3 non divisée par P(B).",
      "correct_choice_label": "A",
      "correct_rationale": "P(A|B)=P(A∩B)/P(B)=0,3/0,5=0,6."
    },
    "label_ar": null
  },
  {
    "id": "mc.math.sma_prob_conditionnelle.independant-egale-incompatible",
    "label": "« Indépendants = incompatibles »",
    "description": "L'élève fusionne les deux relations introduites successivement dans le cours. « Indépendant » (sans influence) et « incompatible / disjoint » (ne peuvent se réaliser ensemble) sont entendus comme des synonymes de « séparés, sans lien ».",
    "contradicts_principle": "Ce sont des notions opposées. Incompatibles : A∩B = ∅, donc P(A∩B)=0. Savoir que A est réalisé signifie que B ne peut pas l'être — c'est une influence maximale, l'opposé de l'indépendance. Indépendants : P(A∩B)=P(A)·P(B). Deux événements de probabilité non nulle ne peuvent pas être à la fois incompatibles et indépendants.",
    "distinguishing_mcq_stem": {
      "stem_text": "A et B avec P(A)=0,4, P(B)=0,5 et P(A∩B)=0. Lesquels sont vrais ? A) incompatibles mais PAS indépendants ; B) indépendants car aucun lien ; C) à la fois incompatibles et indépendants ; D) indépendants car P(A∩B)=0.",
      "distractor_choice_label": "C",
      "distractor_rationale": "Choix C assène la fusion littérale incompatible=indépendant.",
      "correct_choice_label": "A",
      "correct_rationale": "P(A∩B)=0 → incompatibles ; P(A)·P(B)=0,2≠0 → pas indépendants."
    },
    "label_ar": null
  },
  {
    "id": "mc.math.sma_prob_conditionnelle.independant-implique-intersection-nulle",
    "label": "« Indépendants ⇒ P(A∩B) = 0 »",
    "description": "L'élève croit que l'indépendance signifie que les événements ne se chevauchent pas, donc P(A∩B)=0. C'est une conséquence opératoire séparable de la fusion conceptuelle M3 : un élève peut tenir M4 (« les choses indépendantes ne se croisent pas ») même s'il est flou sur le mot « incompatible ».",
    "contradicts_principle": "Des événements indépendants de probabilité non nulle doivent se chevaucher : P(A∩B)=P(A)·P(B)≠0. L'indépendance concerne la valeur du chevauchement (elle est égale au produit), pas l'absence de chevauchement.",
    "distinguishing_mcq_stem": {
      "stem_text": "A et B indépendants, P(A)=0,4 et P(B)=0,5. Que vaut P(A∩B) ? Choix : A) 0,2 ; B) 0 ; C) 0,9 ; D) 0,1.",
      "distractor_choice_label": "B",
      "distractor_rationale": "Choix B (=0) = la croyance « pas de chevauchement ».",
      "correct_choice_label": "A",
      "correct_rationale": "P(A∩B)=P(A)·P(B)=0,2."
    },
    "label_ar": null
  },
  {
    "id": "mc.math.sma_prob_conditionnelle.independant-somme",
    "label": "« Indépendants ⇒ P(A∩B) = P(A) + P(B) »",
    "description": "L'élève connaît l'idée qu'il existe une formule pour l'indépendance, mais récupère la mauvaise opération — il additionne au lieu de multiplier. L'addition vient d'une contamination par la formule des événements incompatibles P(A∪B)=P(A)+P(B) : le « + » de l'union se propage sur l'intersection.",
    "contradicts_principle": "Pour des événements indépendants, l'intersection se multiplie : P(A∩B)=P(A)·P(B). L'addition s'applique à l'union d'événements incompatibles. Deux opérations différentes, deux relations différentes (∩ vs ∪). De plus, P(A∩B) ≤ min(P(A), P(B)) toujours — une somme qui dépasse chaque terme est absurde.",
    "distinguishing_mcq_stem": {
      "stem_text": "A et B indépendants, P(A)=0,4 et P(B)=0,5. Que vaut P(A∩B) ? Choix : A) 0,2 ; B) 0,9 ; C) 0 ; D) 0,45.",
      "distractor_choice_label": "B",
      "distractor_rationale": "Choix B (=0,9) = la somme P(A)+P(B) au lieu du produit.",
      "correct_choice_label": "A",
      "correct_rationale": "P(A∩B)=P(A)·P(B)=0,2."
    },
    "label_ar": null
  },
  {
    "id": "mc.math.sma_prob_conditionnelle.arbre-additionne-branche",
    "label": "« On additionne le long d'une branche : P(A∩B) = P(A) + P(B|A) »",
    "description": "En lisant un arbre pondéré, l'élève additionne les deux probabilités des arêtes le long d'un chemin racine-à-feuille au lieu de les multiplier. La représentation visuelle « descendre deux étapes » se lit comme « accumuler / additionner », à la façon dont des distances s'additionnent.",
    "contradicts_principle": "Le long d'une branche, on multiplie (la règle composée P(A∩B)=P(A)·P(B|A) est exactement « la chaîne des étapes conditionnelles ») ; entre les branches / sur les feuilles, on additionne. Multiplier en descendant, additionner en travers. Le produit est juste car chaque arête est une proportion conditionnelle de ce qui est arrivé au nœud au-dessus.",
    "distinguishing_mcq_stem": {
      "stem_text": "Sur un arbre : P(A)=0,6 et P(B|A)=0,4. Que vaut P(A∩B) (branche A puis B) ? Choix : A) 0,24 ; B) 1,0 ; C) 0,2 ; D) 0,5.",
      "distractor_choice_label": "B",
      "distractor_rationale": "Choix B (=1,0) = la somme 0,6+0,4 ; une feuille ne peut valoir l'univers entier.",
      "correct_choice_label": "A",
      "correct_rationale": "P(A∩B)=P(A)·P(B|A)=0,6×0,4=0,24."
    },
    "label_ar": null
  },
  {
    "id": "mc.math.sma_prob_conditionnelle.totales-sans-ponderation",
    "label": "« Probabilités totales sans pondérer : P(B) = P(B|A) + P(B|Ā) »",
    "description": "En appliquant la loi des probabilités totales, l'élève somme directement les probabilités conditionnelles, oubliant de pondérer chacune par la probabilité de sa branche. La structure P(B)=Σ… est mémorisée, mais le facteur P(Aᵢ)· est oublié.",
    "contradicts_principle": "P(B)=P(A)·P(B|A)+P(Ā)·P(B|Ā) — chaque conditionnelle est pondérée par la fréquence de sa branche. On ne peut pas faire la moyenne de deux taux sans pondérer par la taille de la population. Et les poids doivent provenir d'une partition (A∪Ā=Ω, A∩Ā=∅, somme des P(Aᵢ)=1).",
    "distinguishing_mcq_stem": {
      "stem_text": "P(A)=0,6, P(B|A)=0,5, P(Ā)=0,4, P(B|Ā)=0,2. Que vaut P(B) ? Choix : A) 0,38 ; B) 0,7 ; C) 0,35 ; D) 0,1.",
      "distractor_choice_label": "B",
      "distractor_rationale": "Choix B (=0,7) = somme non pondérée des conditionnelles.",
      "correct_choice_label": "A",
      "correct_rationale": "P(B)=0,6×0,5+0,4×0,2=0,38."
    },
    "label_ar": null
  },
  {
    "id": "mc.math.sma_prob_conditionnelle.rebours-mauvais-denominateur",
    "label": "« Lecture inverse de l'arbre : mauvais dénominateur pour P(A|B) »",
    "description": "En lisant l'arbre à rebours pour obtenir P(A|B), l'élève divise la feuille favorable par le mauvais dénominateur — typiquement P(A) (la branche en avant qu'il a descendue) au lieu de P(B) (la somme de toutes les feuilles où B se réalise). Il normalise par rapport à la cause au lieu de l'effet observé.",
    "contradicts_principle": "P(A|B)=P(A∩B)/P(B), et P(B) doit être assemblé à partir de l'arbre entier par la loi des probabilités totales (P(B)=P(A∩B)+P(Ā∩B), la somme de chaque feuille où B se réalise). Le dénominateur est l'événement observé B (toutes les façons dont il a pu se produire), pas le seul chemin en question.",
    "distinguishing_mcq_stem": {
      "stem_text": "Deux machines : M₁ fait 60 % des pièces (5 % défectueuses), M₂ fait 40 % (3 % défectueuses). Une pièce défectueuse est tirée : P(M₁|D) ? Choix : A) 5/7 ; B) 0,05 ; C) 0,6 ; D) 0,03.",
      "distractor_choice_label": "C",
      "distractor_rationale": "Choix C (=0,6=P(M₁)) = division par la cause au lieu de l'effet observé P(D).",
      "correct_choice_label": "A",
      "correct_rationale": "P(M₁|D)=P(M₁∩D)/P(D)=0,030/0,042=5/7."
    },
    "label_ar": null
  }
]
$mcs$::jsonb
WHERE  code = 'sma_prob_conditionnelle';

-- ============================================================================
-- 2. Land the 24 misconception-driven MCQ items.
--    Item UUIDs are STAGING-ONLY sentinels in the eval namespace:
--      44444444-e7a1-0000-{Mn}-0000000000{vv}   (Mn = misconception 1..8,
--                                                 vv = variant 1..3)
--    These are NOT prod UUIDs and must be re-derived for the real migration.
--    skill_id is resolved BY CODE via subselect (binds to real SMA skill when
--    present, else the staging scaffold above).
--    Idempotent: ON CONFLICT (id) DO UPDATE → converges to authored state.
--    distractor_misconceptions per migration-046 convention; arrays = dual-tag.
-- ============================================================================

INSERT INTO public.items (
  id, skill_id, item_type, difficulty_level, content_language,
  question, explanation, tags, distractor_misconceptions, is_active
) VALUES

-- ── M1 · transpose-conditionnel ─────────────────────────────────────────────
-- PC-M1-1  trigger B(1). C,D untagged.
(
  '44444444-e7a1-0000-0001-000000000001',
  (SELECT id FROM public.skills WHERE code = 'sma_prob_conditionnelle'),
  'mcq', 4, 'fr',
  $q$ {"stem":"Une maladie touche 1 % de la population. Un test détecte 95 % des malades : P(T⁺|M)=0,95. Il donne aussi 10 % de faux positifs : P(T⁺|M̄)=0,10. Une personne est testée positive. Quelle est P(M|T⁺), la probabilité qu'elle soit réellement malade ?","latex":true,"choices":["≈ 0,09","0,95","0,50","0,01"],"correct_index":0} $q$::jsonb,
  $e$ {"text_fr":"P(M∩T⁺)=0,01×0,95=0,0095 ; P(M̄∩T⁺)=0,99×0,10=0,099 ; P(T⁺)=0,1085. P(M|T⁺)=0,0095/0,1085≈0,09.","steps":["P(M∩T⁺)=0,01×0,95=0,0095","P(M̄∩T⁺)=0,99×0,10=0,099","P(T⁺)=0,0095+0,099=0,1085","P(M|T⁺)=0,0095/0,1085≈0,09"]} $e$::jsonb,
  ARRAY['misconception_driven','sma_prob_conditionnelle','depistage_medical'],
  $dm$ {"1":"mc.math.sma_prob_conditionnelle.transpose-conditionnel"} $dm$::jsonb,
  TRUE
),
-- PC-M1-2  trigger A(0)=M1 ; C(2) dual=[M8,M1]. B correct, D untagged.
(
  '44444444-e7a1-0000-0001-000000000002',
  (SELECT id FROM public.skills WHERE code = 'sma_prob_conditionnelle'),
  'mcq', 4, 'fr',
  $q$ {"stem":"Un laboratoire fabrique des vaccins par deux procédés. Le procédé A produit 70 % des lots ; 2 % défectueux : P(D|A)=0,02. Le procédé B produit 30 % des lots ; 5 % défectueux : P(D|B)=0,05. Un lot défectueux est découvert. Quelle est P(A|D) ?","latex":true,"choices":["0,02","≈ 0,48","0,70","0,05"],"correct_index":1} $q$::jsonb,
  $e$ {"text_fr":"P(D)=0,70×0,02+0,30×0,05=0,029. P(A|D)=0,014/0,029≈0,483.","steps":["P(A∩D)=0,70×0,02=0,014","P(B∩D)=0,30×0,05=0,015","P(D)=0,029","P(A|D)=0,014/0,029=14/29≈0,483"]} $e$::jsonb,
  ARRAY['misconception_driven','sma_prob_conditionnelle','depistage_medical'],
  $dm$ {"0":"mc.math.sma_prob_conditionnelle.transpose-conditionnel","2":["mc.math.sma_prob_conditionnelle.rebours-mauvais-denominateur","mc.math.sma_prob_conditionnelle.transpose-conditionnel"]} $dm$::jsonb,
  TRUE
),
-- PC-M1-3  trigger A(0)=M1. C correct, B,D untagged.
(
  '44444444-e7a1-0000-0001-000000000003',
  (SELECT id FROM public.skills WHERE code = 'sma_prob_conditionnelle'),
  'mcq', 4, 'fr',
  $q$ {"stem":"Un filtre anti-spam analyse les courriels. 20 % sont des spams. Le filtre détecte 90 % des spams : P(C|S)=0,90. Il classe aussi 5 % des courriels légitimes comme spam : P(C|S̄)=0,05. Un courriel est classé « spam ». Quelle est P(S|C) ?","latex":true,"choices":["0,90","0,20","≈ 0,82","0,05"],"correct_index":2} $q$::jsonb,
  $e$ {"text_fr":"P(C)=0,20×0,90+0,80×0,05=0,22. P(S|C)=0,18/0,22=9/11≈0,818.","steps":["P(S∩C)=0,20×0,90=0,18","P(S̄∩C)=0,80×0,05=0,04","P(C)=0,22","P(S|C)=0,18/0,22=9/11≈0,818"]} $e$::jsonb,
  ARRAY['misconception_driven','sma_prob_conditionnelle','variation_fraiche'],
  $dm$ {"0":"mc.math.sma_prob_conditionnelle.transpose-conditionnel"} $dm$::jsonb,
  TRUE
),

-- ── M2 · conditionnelle-egale-intersection ──────────────────────────────────
-- PC-M2-1  trigger B(1). A correct, C,D untagged.
(
  '44444444-e7a1-0000-0002-000000000001',
  (SELECT id FROM public.skills WHERE code = 'sma_prob_conditionnelle'),
  'mcq', 2, 'fr',
  $q$ {"stem":"On donne P(A∩B)=0,3 et P(B)=0,5. Que vaut P(A|B) ?","latex":true,"choices":["0,6","0,3","0,8","0,15"],"correct_index":0} $q$::jsonb,
  $e$ {"text_fr":"P(A|B)=P(A∩B)/P(B)=0,3/0,5=0,6. « Sachant B » restreint l'univers à B : on divise par P(B).","steps":["P(A|B)=P(A∩B)/P(B)=0,3/0,5=0,6"]} $e$::jsonb,
  ARRAY['misconception_driven','sma_prob_conditionnelle','definition'],
  $dm$ {"1":"mc.math.sma_prob_conditionnelle.conditionnelle-egale-intersection"} $dm$::jsonb,
  TRUE
),
-- PC-M2-2  trigger A(0). B correct, C,D untagged.
(
  '44444444-e7a1-0000-0002-000000000002',
  (SELECT id FROM public.skills WHERE code = 'sma_prob_conditionnelle'),
  'mcq', 2, 'fr',
  $q$ {"stem":"Dans une classe, 60 % des élèves sont sportifs (P(S)=0,6) et 24 % sont à la fois sportifs et membres du club de maths (P(S∩M)=0,24). Quelle est P(M|S) ?","latex":true,"choices":["0,24","0,40","0,84","0,144"],"correct_index":1} $q$::jsonb,
  $e$ {"text_fr":"P(M|S)=P(S∩M)/P(S)=0,24/0,6=0,40.","steps":["P(M|S)=P(S∩M)/P(S)=0,24/0,6=0,40"]} $e$::jsonb,
  ARRAY['misconception_driven','sma_prob_conditionnelle','definition'],
  $dm$ {"0":"mc.math.sma_prob_conditionnelle.conditionnelle-egale-intersection"} $dm$::jsonb,
  TRUE
),
-- PC-M2-3  trigger B(1). C correct, A,D untagged.
(
  '44444444-e7a1-0000-0002-000000000003',
  (SELECT id FROM public.skills WHERE code = 'sma_prob_conditionnelle'),
  'mcq', 2, 'fr',
  $q$ {"stem":"Une usine produit des pièces. P(B)=0,4 (pièce de la machine B) et P(B∩D)=0,12 (pièce de B et défectueuse). Que vaut P(D|B) ?","latex":true,"choices":["0,52","0,12","0,30","0,048"],"correct_index":2} $q$::jsonb,
  $e$ {"text_fr":"P(D|B)=P(B∩D)/P(B)=0,12/0,4=0,30.","steps":["P(D|B)=P(B∩D)/P(B)=0,12/0,4=0,30"]} $e$::jsonb,
  ARRAY['misconception_driven','sma_prob_conditionnelle','definition'],
  $dm$ {"1":"mc.math.sma_prob_conditionnelle.conditionnelle-egale-intersection"} $dm$::jsonb,
  TRUE
),

-- ── M3 · independant-egale-incompatible ─────────────────────────────────────
-- PC-M3-1  trigger C(2)=M3 ; B(1)=M3 ; D(3) dual=[M4,M3]. A correct.
(
  '44444444-e7a1-0000-0003-000000000001',
  (SELECT id FROM public.skills WHERE code = 'sma_prob_conditionnelle'),
  'mcq', 3, 'fr',
  $q$ {"stem":"A et B sont deux événements avec P(A)=0,4, P(B)=0,5 et P(A∩B)=0. Laquelle de ces affirmations est vraie ?","latex":true,"choices":["A et B sont incompatibles mais PAS indépendants.","A et B sont indépendants car ils n'ont aucun lien.","A et B sont à la fois incompatibles et indépendants.","A et B sont indépendants car P(A∩B)=0."],"correct_index":0} $q$::jsonb,
  $e$ {"text_fr":"P(A∩B)=0 → incompatibles. P(A)·P(B)=0,2≠0 → pas indépendants. Incompatibilité et indépendance sont opposées.","steps":["P(A∩B)=0 → incompatibles","P(A)·P(B)=0,4×0,5=0,2≠0 → pas indépendants"]} $e$::jsonb,
  ARRAY['misconception_driven','sma_prob_conditionnelle','independance'],
  $dm$ {"1":"mc.math.sma_prob_conditionnelle.independant-egale-incompatible","2":"mc.math.sma_prob_conditionnelle.independant-egale-incompatible","3":["mc.math.sma_prob_conditionnelle.independant-implique-intersection-nulle","mc.math.sma_prob_conditionnelle.independant-egale-incompatible"]} $dm$::jsonb,
  TRUE
),
-- PC-M3-2  trigger A(0)=M3 ; B(1)=M3. C correct, D untagged.
(
  '44444444-e7a1-0000-0003-000000000002',
  (SELECT id FROM public.skills WHERE code = 'sma_prob_conditionnelle'),
  'mcq', 3, 'fr',
  $q$ {"stem":"On lance un dé équilibré à 6 faces. Soit A={2} et B={5}. Sachant que A s'est réalisé, que vaut P(B|A) ? Que conclure sur l'indépendance de A et B ?","latex":true,"choices":["P(B|A)=1/6, donc A et B sont indépendants.","P(B|A)=0, donc A et B sont indépendants.","P(B|A)=0, donc A et B sont dépendants (incompatibles).","P(B|A)=1/6, donc A et B sont dépendants."],"correct_index":2} $q$::jsonb,
  $e$ {"text_fr":"A∩B=∅ → P(B|A)=0 ; or P(B)=1/6≠0, donc A influence B : dépendants (incompatibles).","steps":["A∩B={2}∩{5}=∅","P(B|A)=P(A∩B)/P(A)=0","P(B|A)=0≠1/6=P(B) → dépendants"]} $e$::jsonb,
  ARRAY['misconception_driven','sma_prob_conditionnelle','independance'],
  $dm$ {"0":"mc.math.sma_prob_conditionnelle.independant-egale-incompatible","1":"mc.math.sma_prob_conditionnelle.independant-egale-incompatible"} $dm$::jsonb,
  TRUE
),
-- PC-M3-3  trigger A(0)=M3. B correct, C,D untagged.
(
  '44444444-e7a1-0000-0003-000000000003',
  (SELECT id FROM public.skills WHERE code = 'sma_prob_conditionnelle'),
  'mcq', 3, 'fr',
  $q$ {"stem":"On considère A et B tels que P(A)=0,3, P(B)=0,4 et P(A∪B)=0,7. Calculer P(A∩B) puis déterminer si A et B sont indépendants ou incompatibles.","latex":true,"choices":["P(A∩B)=0 ; incompatibles et indépendants.","P(A∩B)=0 ; incompatibles mais PAS indépendants.","P(A∩B)=0,12 ; indépendants.","P(A∩B)=0,12 ; dépendants."],"correct_index":1} $q$::jsonb,
  $e$ {"text_fr":"P(A∩B)=P(A)+P(B)−P(A∪B)=0 → incompatibles ; P(A)·P(B)=0,12≠0 → pas indépendants.","steps":["P(A∩B)=0,3+0,4−0,7=0","P(A)·P(B)=0,12≠0 → pas indépendants"]} $e$::jsonb,
  ARRAY['misconception_driven','sma_prob_conditionnelle','independance'],
  $dm$ {"0":"mc.math.sma_prob_conditionnelle.independant-egale-incompatible"} $dm$::jsonb,
  TRUE
),

-- ── M4 · independant-implique-intersection-nulle ────────────────────────────
-- PC-M4-1  trigger B(1)=M4 ; C(2) dual secondary=M5. A correct, D untagged.
(
  '44444444-e7a1-0000-0004-000000000001',
  (SELECT id FROM public.skills WHERE code = 'sma_prob_conditionnelle'),
  'mcq', 3, 'fr',
  $q$ {"stem":"A et B sont deux événements indépendants avec P(A)=0,4 et P(B)=0,5. Que vaut P(A∩B) ?","latex":true,"choices":["0,2","0","0,9","0,1"],"correct_index":0} $q$::jsonb,
  $e$ {"text_fr":"Indépendance : P(A∩B)=P(A)·P(B)=0,4×0,5=0,2. L'intersection n'est pas nulle.","steps":["P(A∩B)=P(A)·P(B)=0,4×0,5=0,2"]} $e$::jsonb,
  ARRAY['misconception_driven','sma_prob_conditionnelle','independance'],
  $dm$ {"1":"mc.math.sma_prob_conditionnelle.independant-implique-intersection-nulle","2":"mc.math.sma_prob_conditionnelle.independant-somme"} $dm$::jsonb,
  TRUE
),
-- PC-M4-2  trigger B(1)=M4 ; C(2)=M5 dual secondary. A correct, D untagged.
(
  '44444444-e7a1-0000-0004-000000000002',
  (SELECT id FROM public.skills WHERE code = 'sma_prob_conditionnelle'),
  'mcq', 3, 'fr',
  $q$ {"stem":"On lance deux pièces équilibrées. A = « la 1ʳᵉ tombe sur pile », B = « la 2ᵉ tombe sur pile ». A et B sont indépendants avec P(A)=P(B)=1/2. Quelle est P(A∩B), la probabilité d'obtenir deux piles ?","latex":true,"choices":["1/4","0","1","1/2"],"correct_index":0} $q$::jsonb,
  $e$ {"text_fr":"P(A∩B)=P(A)·P(B)=1/2×1/2=1/4.","steps":["P(A∩B)=1/2×1/2=1/4"]} $e$::jsonb,
  ARRAY['misconception_driven','sma_prob_conditionnelle','independance'],
  $dm$ {"1":"mc.math.sma_prob_conditionnelle.independant-implique-intersection-nulle","2":"mc.math.sma_prob_conditionnelle.independant-somme"} $dm$::jsonb,
  TRUE
),
-- PC-M4-3  trigger B(1)=M4 ; C(2)=M5 dual secondary. A correct, D untagged.
(
  '44444444-e7a1-0000-0004-000000000003',
  (SELECT id FROM public.skills WHERE code = 'sma_prob_conditionnelle'),
  'mcq', 3, 'fr',
  $q$ {"stem":"Deux machines M₁ et M₂ fonctionnent indépendamment. P(panne de M₁)=0,3 et P(panne de M₂)=0,2. Quelle est la probabilité que les deux tombent en panne le même jour ?","latex":true,"choices":["0,06","0","0,5","0,44"],"correct_index":0} $q$::jsonb,
  $e$ {"text_fr":"P(P₁∩P₂)=P(P₁)·P(P₂)=0,3×0,2=0,06.","steps":["P(P₁∩P₂)=0,3×0,2=0,06"]} $e$::jsonb,
  ARRAY['misconception_driven','sma_prob_conditionnelle','independance'],
  $dm$ {"1":"mc.math.sma_prob_conditionnelle.independant-implique-intersection-nulle","2":"mc.math.sma_prob_conditionnelle.independant-somme"} $dm$::jsonb,
  TRUE
),

-- ── M5 · independant-somme ──────────────────────────────────────────────────
-- PC-M5-1  trigger B(1)=M5 ; C(2)=M4 dual secondary. A correct, D untagged.
(
  '44444444-e7a1-0000-0005-000000000001',
  (SELECT id FROM public.skills WHERE code = 'sma_prob_conditionnelle'),
  'mcq', 3, 'fr',
  $q$ {"stem":"A et B sont deux événements indépendants avec P(A)=0,4 et P(B)=0,5. Que vaut P(A∩B) ?","latex":true,"choices":["0,2","0,9","0","0,45"],"correct_index":0} $q$::jsonb,
  $e$ {"text_fr":"P(A∩B)=P(A)·P(B)=0,2. La somme 0,9 dépasserait P(B)=0,5 — impossible pour une intersection.","steps":["P(A∩B)=P(A)·P(B)=0,4×0,5=0,2"]} $e$::jsonb,
  ARRAY['misconception_driven','sma_prob_conditionnelle','independance'],
  $dm$ {"1":"mc.math.sma_prob_conditionnelle.independant-somme","2":"mc.math.sma_prob_conditionnelle.independant-implique-intersection-nulle"} $dm$::jsonb,
  TRUE
),
-- PC-M5-2  trigger A(0)=M5 ; C(2)=M4 dual secondary. B correct, D untagged.
(
  '44444444-e7a1-0000-0005-000000000002',
  (SELECT id FROM public.skills WHERE code = 'sma_prob_conditionnelle'),
  'mcq', 3, 'fr',
  $q$ {"stem":"On tire avec remise une bille d'une urne de 3 rouges et 7 bleues, puis on recommence. R₁ = « rouge au 1ᵉʳ tirage », R₂ = « rouge au 2ᵉ tirage », indépendants. Quelle est la probabilité d'obtenir rouge aux deux tirages ?","latex":true,"choices":["3/5","9/100","0","3/10"],"correct_index":1} $q$::jsonb,
  $e$ {"text_fr":"P(R₁∩R₂)=P(R₁)·P(R₂)=3/10×3/10=9/100.","steps":["P(R₁)=3/10, P(R₂)=3/10","P(R₁∩R₂)=3/10×3/10=9/100"]} $e$::jsonb,
  ARRAY['misconception_driven','sma_prob_conditionnelle','independance'],
  $dm$ {"0":"mc.math.sma_prob_conditionnelle.independant-somme","2":"mc.math.sma_prob_conditionnelle.independant-implique-intersection-nulle"} $dm$::jsonb,
  TRUE
),
-- PC-M5-3  trigger B(1)=M5 ; C(2)=M4 dual secondary. A correct, D untagged.
(
  '44444444-e7a1-0000-0005-000000000003',
  (SELECT id FROM public.skills WHERE code = 'sma_prob_conditionnelle'),
  'mcq', 3, 'fr',
  $q$ {"stem":"On donne P(A)=0,6, P(B)=0,3 et P(A∩B)=0,18. Un élève affirme : « A et B ne sont pas indépendants car P(A∩B) ≠ P(A)+P(B)=0,9. » Cette affirmation est-elle correcte ?","latex":true,"choices":["Non — la bonne formule est P(A∩B)=P(A)·P(B), et 0,6×0,3=0,18=P(A∩B), donc indépendants.","Oui — P(A∩B) ≠ P(A)+P(B) confirme qu'ils ne sont pas indépendants.","Non — A et B sont indépendants car P(A∩B)=0.","Oui — 0,18 < 0,9 confirme qu'ils sont dépendants."],"correct_index":0} $q$::jsonb,
  $e$ {"text_fr":"Test d'indépendance par le produit : P(A)·P(B)=0,6×0,3=0,18=P(A∩B) → indépendants. L'addition est la formule de l'union des incompatibles.","steps":["P(A)·P(B)=0,6×0,3=0,18=P(A∩B) → indépendants"]} $e$::jsonb,
  ARRAY['misconception_driven','sma_prob_conditionnelle','independance'],
  $dm$ {"1":"mc.math.sma_prob_conditionnelle.independant-somme","2":"mc.math.sma_prob_conditionnelle.independant-implique-intersection-nulle"} $dm$::jsonb,
  TRUE
),

-- ── M6 · arbre-additionne-branche ───────────────────────────────────────────
-- PC-M6-1  trigger B(1). A correct, C,D untagged.
(
  '44444444-e7a1-0000-0006-000000000001',
  (SELECT id FROM public.skills WHERE code = 'sma_prob_conditionnelle'),
  'mcq', 2, 'fr',
  $q$ {"stem":"Sur un arbre de probabilités pondéré : P(A)=0,6 et P(B|A)=0,4. Que vaut P(A∩B), la probabilité de la feuille « A puis B » ?","latex":true,"choices":["0,24","1,0","0,2","0,5"],"correct_index":0} $q$::jsonb,
  $e$ {"text_fr":"Le long d'une branche, on multiplie : P(A∩B)=P(A)×P(B|A)=0,6×0,4=0,24.","steps":["P(A∩B)=P(A)×P(B|A)=0,6×0,4=0,24"]} $e$::jsonb,
  ARRAY['misconception_driven','sma_prob_conditionnelle','arbre_pondere'],
  $dm$ {"1":"mc.math.sma_prob_conditionnelle.arbre-additionne-branche"} $dm$::jsonb,
  TRUE
),
-- PC-M6-2  trigger B(1). A correct, C,D untagged.
(
  '44444444-e7a1-0000-0006-000000000002',
  (SELECT id FROM public.skills WHERE code = 'sma_prob_conditionnelle'),
  'mcq', 2, 'fr',
  $q$ {"stem":"Un arbre pondéré comporte deux branches. P(A)=0,7 et P(B|A)=0,3. Quelle est la valeur de la feuille A∩B ?","latex":true,"choices":["0,21","1,0","0,4","0,3"],"correct_index":0} $q$::jsonb,
  $e$ {"text_fr":"P(A∩B)=P(A)×P(B|A)=0,7×0,3=0,21.","steps":["P(A∩B)=0,7×0,3=0,21"]} $e$::jsonb,
  ARRAY['misconception_driven','sma_prob_conditionnelle','arbre_pondere'],
  $dm$ {"1":"mc.math.sma_prob_conditionnelle.arbre-additionne-branche"} $dm$::jsonb,
  TRUE
),
-- PC-M6-3  trigger B(1). A correct, C,D untagged.
(
  '44444444-e7a1-0000-0006-000000000003',
  (SELECT id FROM public.skills WHERE code = 'sma_prob_conditionnelle'),
  'mcq', 2, 'fr',
  $q$ {"stem":"Un arbre pondéré a deux niveaux. P(A)=0,5, P(Ā)=0,5, P(B|Ā)=0,6. Que vaut P(Ā∩B), la probabilité de la feuille « Ā puis B » ?","latex":true,"choices":["0,30","1,1","0,10","0,6"],"correct_index":0} $q$::jsonb,
  $e$ {"text_fr":"P(Ā∩B)=P(Ā)×P(B|Ā)=0,5×0,6=0,30.","steps":["P(Ā∩B)=0,5×0,6=0,30"]} $e$::jsonb,
  ARRAY['misconception_driven','sma_prob_conditionnelle','arbre_pondere'],
  $dm$ {"1":"mc.math.sma_prob_conditionnelle.arbre-additionne-branche"} $dm$::jsonb,
  TRUE
),

-- ── M7 · totales-sans-ponderation ───────────────────────────────────────────
-- PC-M7-1  trigger B(1)=M7 ; C(2)=M7 (same-M variant). A correct, D untagged.
(
  '44444444-e7a1-0000-0007-000000000001',
  (SELECT id FROM public.skills WHERE code = 'sma_prob_conditionnelle'),
  'mcq', 3, 'fr',
  $q$ {"stem":"On donne : P(A)=0,6, P(B|A)=0,5, P(Ā)=0,4, P(B|Ā)=0,2. Que vaut P(B) par la formule des probabilités totales ?","latex":true,"choices":["0,38","0,7","0,35","0,10"],"correct_index":0} $q$::jsonb,
  $e$ {"text_fr":"P(B)=P(A)·P(B|A)+P(Ā)·P(B|Ā)=0,6×0,5+0,4×0,2=0,38.","steps":["0,6×0,5=0,30","0,4×0,2=0,08","P(B)=0,38"]} $e$::jsonb,
  ARRAY['misconception_driven','sma_prob_conditionnelle','probabilites_totales'],
  $dm$ {"1":"mc.math.sma_prob_conditionnelle.totales-sans-ponderation","2":"mc.math.sma_prob_conditionnelle.totales-sans-ponderation"} $dm$::jsonb,
  TRUE
),
-- PC-M7-2  trigger B(1)=M7 ; C(2)=M7 (same-M variant). A correct, D untagged.
(
  '44444444-e7a1-0000-0007-000000000002',
  (SELECT id FROM public.skills WHERE code = 'sma_prob_conditionnelle'),
  'mcq', 3, 'fr',
  $q$ {"stem":"Une entreprise a deux fournisseurs. F₁ livre 30 % des pièces (P(F₁)=0,3) avec 4 % de défauts : P(D|F₁)=0,04. F₂ livre 70 % (P(F₂)=0,7) avec 1 % de défauts : P(D|F₂)=0,01. Quelle est P(D) ?","latex":true,"choices":["0,019","0,05","0,025","0,04"],"correct_index":0} $q$::jsonb,
  $e$ {"text_fr":"P(D)=0,3×0,04+0,7×0,01=0,012+0,007=0,019.","steps":["0,3×0,04=0,012","0,7×0,01=0,007","P(D)=0,019"]} $e$::jsonb,
  ARRAY['misconception_driven','sma_prob_conditionnelle','probabilites_totales'],
  $dm$ {"1":"mc.math.sma_prob_conditionnelle.totales-sans-ponderation","2":"mc.math.sma_prob_conditionnelle.totales-sans-ponderation"} $dm$::jsonb,
  TRUE
),
-- PC-M7-3  trigger A(0)=M7 ; C(2)=M7 (same-M variant). B correct, D untagged.
(
  '44444444-e7a1-0000-0007-000000000003',
  (SELECT id FROM public.skills WHERE code = 'sma_prob_conditionnelle'),
  'mcq', 3, 'fr',
  $q$ {"stem":"Lors d'un examen, 40 % des candidats ont suivi une préparation intensive (P(I)=0,4). Parmi eux, 80 % réussissent : P(R|I)=0,8. Parmi les autres (P(Ī)=0,6), 50 % réussissent : P(R|Ī)=0,5. Quelle est P(R) ?","latex":true,"choices":["1,3","0,62","0,65","0,80"],"correct_index":1} $q$::jsonb,
  $e$ {"text_fr":"P(R)=0,4×0,8+0,6×0,5=0,32+0,30=0,62.","steps":["0,4×0,8=0,32","0,6×0,5=0,30","P(R)=0,62"]} $e$::jsonb,
  ARRAY['misconception_driven','sma_prob_conditionnelle','probabilites_totales'],
  $dm$ {"0":"mc.math.sma_prob_conditionnelle.totales-sans-ponderation","2":"mc.math.sma_prob_conditionnelle.totales-sans-ponderation"} $dm$::jsonb,
  TRUE
),

-- ── M8 · rebours-mauvais-denominateur ───────────────────────────────────────
-- PC-M8-1  trigger C(2)=M8 (primary) ; B(1) dual=[M1,M8]. A correct, D untagged.
(
  '44444444-e7a1-0000-0008-000000000001',
  (SELECT id FROM public.skills WHERE code = 'sma_prob_conditionnelle'),
  'mcq', 4, 'fr',
  $q$ {"stem":"Une usine possède deux machines. M₁ fabrique 60 % des pièces avec 5 % de défectueux : P(D|M₁)=0,05. M₂ fabrique 40 % avec 3 % de défectueux : P(D|M₂)=0,03. On prélève une pièce défectueuse. Quelle est P(M₁|D) ?","latex":true,"choices":["5/7","0,05","0,6","0,03"],"correct_index":0} $q$::jsonb,
  $e$ {"text_fr":"P(M₁∩D)=0,030 ; P(M₂∩D)=0,012 ; P(D)=0,042. P(M₁|D)=0,030/0,042=5/7.","steps":["P(M₁∩D)=0,60×0,05=0,030","P(M₂∩D)=0,40×0,03=0,012","P(D)=0,042","P(M₁|D)=0,030/0,042=5/7≈0,714"]} $e$::jsonb,
  ARRAY['misconception_driven','sma_prob_conditionnelle','lecture_inverse','deux_machines'],
  $dm$ {"1":["mc.math.sma_prob_conditionnelle.transpose-conditionnel","mc.math.sma_prob_conditionnelle.rebours-mauvais-denominateur"],"2":"mc.math.sma_prob_conditionnelle.rebours-mauvais-denominateur"} $dm$::jsonb,
  TRUE
),
-- PC-M8-2  trigger D(3) dual=[M8,M2] (primary M8) ; B(1) dual=[M1,M8]. A correct, C untagged.
(
  '44444444-e7a1-0000-0008-000000000002',
  (SELECT id FROM public.skills WHERE code = 'sma_prob_conditionnelle'),
  'mcq', 4, 'fr',
  $q$ {"stem":"Dans une population, 2 % des individus ont une maladie M : P(M)=0,02. Un test donne un résultat positif pour 98 % des malades : P(T⁺|M)=0,98. Il donne aussi un résultat positif pour 3 % des personnes saines : P(T⁺|M̄)=0,03. Un individu testé positif se présente. Calculer P(M|T⁺).","latex":true,"choices":["≈ 0,40","0,98","0,02","0,02 × 0,98 = 0,0196"],"correct_index":0} $q$::jsonb,
  $e$ {"text_fr":"P(M∩T⁺)=0,0196 ; P(M̄∩T⁺)=0,0294 ; P(T⁺)=0,049. P(M|T⁺)=0,0196/0,049=0,40.","steps":["P(M∩T⁺)=0,02×0,98=0,0196","P(M̄∩T⁺)=0,98×0,03=0,0294","P(T⁺)=0,049","P(M|T⁺)=0,0196/0,049=0,40"]} $e$::jsonb,
  ARRAY['misconception_driven','sma_prob_conditionnelle','lecture_inverse','depistage_medical','bac_style'],
  $dm$ {"1":["mc.math.sma_prob_conditionnelle.transpose-conditionnel","mc.math.sma_prob_conditionnelle.rebours-mauvais-denominateur"],"3":["mc.math.sma_prob_conditionnelle.rebours-mauvais-denominateur","mc.math.sma_prob_conditionnelle.conditionnelle-egale-intersection"]} $dm$::jsonb,
  TRUE
),
-- PC-M8-3  trigger B(1)=M8 ; C(2) dual=[M1,M8] ; D(3)=M6. A correct.
(
  '44444444-e7a1-0000-0008-000000000003',
  (SELECT id FROM public.skills WHERE code = 'sma_prob_conditionnelle'),
  'mcq', 4, 'fr',
  $q$ {"stem":"On dispose de deux urnes. U₁ contient 4 boules rouges et 6 bleues. U₂ contient 7 rouges et 3 bleues. On choisit une urne au hasard (P(U₁)=P(U₂)=0,5), puis on tire une boule. La boule tirée est rouge. Quelle est P(U₁|R) ?","latex":true,"choices":["4/11","0,5","0,4","4/10 + 7/10 = 11/10"],"correct_index":0} $q$::jsonb,
  $e$ {"text_fr":"P(U₁∩R)=0,5×0,4=0,2 ; P(U₂∩R)=0,5×0,7=0,35 ; P(R)=0,55. P(U₁|R)=0,2/0,55=4/11.","steps":["P(U₁∩R)=0,5×4/10=0,20","P(U₂∩R)=0,5×7/10=0,35","P(R)=0,55","P(U₁|R)=0,20/0,55=4/11≈0,364"]} $e$::jsonb,
  ARRAY['misconception_driven','sma_prob_conditionnelle','lecture_inverse','urne','variation_fraiche'],
  $dm$ {"1":"mc.math.sma_prob_conditionnelle.rebours-mauvais-denominateur","2":["mc.math.sma_prob_conditionnelle.transpose-conditionnel","mc.math.sma_prob_conditionnelle.rebours-mauvais-denominateur"],"3":"mc.math.sma_prob_conditionnelle.arbre-additionne-branche"} $dm$::jsonb,
  TRUE
)

ON CONFLICT (id) DO UPDATE
  SET skill_id                  = EXCLUDED.skill_id,
      item_type                 = EXCLUDED.item_type,
      difficulty_level          = EXCLUDED.difficulty_level,
      content_language          = EXCLUDED.content_language,
      question                  = EXCLUDED.question,
      explanation               = EXCLUDED.explanation,
      tags                      = EXCLUDED.tags,
      distractor_misconceptions = EXCLUDED.distractor_misconceptions,
      is_active                 = EXCLUDED.is_active,
      updated_at                = NOW();

-- ============================================================================
-- 3. VERIFY BLOCK (REQUIRED).
--    Asserts post-state CARDINALITY *and* CONTENT IDENTITY. Any failure
--    RAISEs and rolls the whole migration back (inside BEGIN). A no-op /
--    silently-empty migration cannot pass this block.
--
--    Assertions:
--      3a. Target skill `sma_prob_conditionnelle` resolves to exactly one row.
--      3b. CARDINALITY: exactly 8 misconceptions on that skill.
--      3c. IDENTITY:    the 8 misconception IDs are EXACTLY the expected set
--                       (set equality — no missing, no extra).
--      3d. SHAPE:       every misconception carries the canonical six keys
--                       + the five structured distinguishing_mcq_stem sub-keys.
--      3e. CARDINALITY: exactly 24 items on that skill carry the
--                       'misconception_driven' tag.
--      3f. IDENTITY:    the 24 item IDs are EXACTLY the expected set.
--      3g. COVERAGE:    each of the 8 misconception IDs is referenced by
--                       >= 3 items' distractor_misconceptions (the >=3 floor,
--                       ADR 0011 / spec §5).
--      3h. INTEGRITY:   every misconception id referenced by any item's
--                       distractor_misconceptions exists in the skill's
--                       common_misconceptions (no dangling tag).
-- ============================================================================
DO $verify$
DECLARE
  v_skill_id      UUID;
  v_skill_count   INT;
  v_mc_count      INT;
  v_actual_mc_ids TEXT[];
  v_item_count    INT;
  v_actual_it_ids UUID[];
  v_offender_id   TEXT;
  v_mc_id         TEXT;
  v_ref_count     INT;
  v_dangling      TEXT;
  v_expected_mc_ids TEXT[] := ARRAY[
    'mc.math.sma_prob_conditionnelle.transpose-conditionnel',
    'mc.math.sma_prob_conditionnelle.conditionnelle-egale-intersection',
    'mc.math.sma_prob_conditionnelle.independant-egale-incompatible',
    'mc.math.sma_prob_conditionnelle.independant-implique-intersection-nulle',
    'mc.math.sma_prob_conditionnelle.independant-somme',
    'mc.math.sma_prob_conditionnelle.arbre-additionne-branche',
    'mc.math.sma_prob_conditionnelle.totales-sans-ponderation',
    'mc.math.sma_prob_conditionnelle.rebours-mauvais-denominateur'
  ];
  v_expected_it_ids UUID[] := ARRAY[
    '44444444-e7a1-0000-0001-000000000001','44444444-e7a1-0000-0001-000000000002','44444444-e7a1-0000-0001-000000000003',
    '44444444-e7a1-0000-0002-000000000001','44444444-e7a1-0000-0002-000000000002','44444444-e7a1-0000-0002-000000000003',
    '44444444-e7a1-0000-0003-000000000001','44444444-e7a1-0000-0003-000000000002','44444444-e7a1-0000-0003-000000000003',
    '44444444-e7a1-0000-0004-000000000001','44444444-e7a1-0000-0004-000000000002','44444444-e7a1-0000-0004-000000000003',
    '44444444-e7a1-0000-0005-000000000001','44444444-e7a1-0000-0005-000000000002','44444444-e7a1-0000-0005-000000000003',
    '44444444-e7a1-0000-0006-000000000001','44444444-e7a1-0000-0006-000000000002','44444444-e7a1-0000-0006-000000000003',
    '44444444-e7a1-0000-0007-000000000001','44444444-e7a1-0000-0007-000000000002','44444444-e7a1-0000-0007-000000000003',
    '44444444-e7a1-0000-0008-000000000001','44444444-e7a1-0000-0008-000000000002','44444444-e7a1-0000-0008-000000000003'
  ];
BEGIN

  -- 3a. The target skill resolves to exactly one row.
  SELECT COUNT(*), MIN(id) INTO v_skill_count, v_skill_id
  FROM public.skills WHERE code = 'sma_prob_conditionnelle';
  IF v_skill_count <> 1 THEN
    RAISE EXCEPTION 'EVAL migration verify: expected exactly 1 skill row for code sma_prob_conditionnelle, got %', v_skill_count;
  END IF;

  -- 3b. CARDINALITY: exactly 8 misconceptions.
  SELECT jsonb_array_length(common_misconceptions) INTO v_mc_count
  FROM public.skills WHERE id = v_skill_id;
  IF v_mc_count IS DISTINCT FROM 8 THEN
    RAISE EXCEPTION 'EVAL migration verify: expected 8 misconceptions on sma_prob_conditionnelle, got %', v_mc_count;
  END IF;

  -- 3c. IDENTITY: exact misconception ID set (no missing, no extra).
  SELECT array_agg(elem->>'id' ORDER BY elem->>'id') INTO v_actual_mc_ids
  FROM public.skills, LATERAL jsonb_array_elements(common_misconceptions) AS elem
  WHERE id = v_skill_id;
  IF NOT (v_actual_mc_ids @> v_expected_mc_ids AND v_expected_mc_ids @> v_actual_mc_ids) THEN
    RAISE EXCEPTION 'EVAL migration verify: misconception ID set mismatch. expected=%, actual=%', v_expected_mc_ids, v_actual_mc_ids;
  END IF;

  -- 3d. SHAPE: six canonical keys + five structured stem sub-keys per entry.
  SELECT elem->>'id' INTO v_offender_id
  FROM public.skills, LATERAL jsonb_array_elements(common_misconceptions) AS elem
  WHERE id = v_skill_id AND NOT (
        elem ? 'id' AND elem ? 'label' AND elem ? 'description'
    AND elem ? 'contradicts_principle' AND elem ? 'distinguishing_mcq_stem'
    AND elem ? 'label_ar'
    AND jsonb_typeof(elem -> 'distinguishing_mcq_stem') = 'object'
    AND (elem -> 'distinguishing_mcq_stem') ? 'stem_text'
    AND (elem -> 'distinguishing_mcq_stem') ? 'distractor_choice_label'
    AND (elem -> 'distinguishing_mcq_stem') ? 'distractor_rationale'
    AND (elem -> 'distinguishing_mcq_stem') ? 'correct_choice_label'
    AND (elem -> 'distinguishing_mcq_stem') ? 'correct_rationale'
  )
  LIMIT 1;
  IF v_offender_id IS NOT NULL THEN
    RAISE EXCEPTION 'EVAL migration verify: misconception "%" missing a canonical key or structured stem sub-key', v_offender_id;
  END IF;

  -- 3e. CARDINALITY: exactly 24 misconception-driven items on the skill.
  SELECT COUNT(*) INTO v_item_count
  FROM public.items
  WHERE skill_id = v_skill_id
    AND item_type = 'mcq'
    AND 'misconception_driven' = ANY(tags);
  IF v_item_count <> 24 THEN
    RAISE EXCEPTION 'EVAL migration verify: expected 24 misconception_driven items on sma_prob_conditionnelle, got %', v_item_count;
  END IF;

  -- 3f. IDENTITY: exact item ID set.
  SELECT array_agg(id ORDER BY id) INTO v_actual_it_ids
  FROM public.items
  WHERE id = ANY(v_expected_it_ids);
  IF array_length(v_actual_it_ids, 1) IS DISTINCT FROM 24
     OR NOT (v_actual_it_ids @> v_expected_it_ids AND v_expected_it_ids @> v_actual_it_ids) THEN
    RAISE EXCEPTION 'EVAL migration verify: item ID set mismatch. expected 24 specific IDs, actual count=%', COALESCE(array_length(v_actual_it_ids,1),0);
  END IF;

  -- Belt-and-braces: every expected item is on the target skill (no stray skill_id).
  IF EXISTS (
    SELECT 1 FROM public.items
    WHERE id = ANY(v_expected_it_ids) AND skill_id <> v_skill_id
  ) THEN
    RAISE EXCEPTION 'EVAL migration verify: at least one eval item is not on sma_prob_conditionnelle';
  END IF;

  -- 3g. COVERAGE: each misconception referenced by >= 3 items (>=3 floor).
  FOREACH v_mc_id IN ARRAY v_expected_mc_ids LOOP
    SELECT COUNT(*) INTO v_ref_count
    FROM public.items
    WHERE skill_id = v_skill_id
      AND distractor_misconceptions::text LIKE '%' || v_mc_id || '%';
    IF v_ref_count < 3 THEN
      RAISE EXCEPTION 'EVAL migration verify: misconception % referenced by only % items (>=3 floor not met)', v_mc_id, v_ref_count;
    END IF;
  END LOOP;

  -- 3h. INTEGRITY: no item tags a misconception id that the skill does not define.
  --     Pull every distinct id value appearing in any item's distractor map
  --     (handles both scalar and array values) and check membership.
  SELECT val INTO v_dangling
  FROM (
    SELECT DISTINCT
      CASE jsonb_typeof(v.value)
        WHEN 'array'  THEN a.elem #>> '{}'
        ELSE v.value #>> '{}'
      END AS val
    FROM public.items it
    CROSS JOIN LATERAL jsonb_each(it.distractor_misconceptions) AS v(key, value)
    LEFT JOIN LATERAL jsonb_array_elements(
      CASE WHEN jsonb_typeof(v.value) = 'array' THEN v.value ELSE '[]'::jsonb END
    ) AS a(elem) ON TRUE
    WHERE it.skill_id = v_skill_id
  ) refs
  WHERE val IS NOT NULL
    AND NOT (val = ANY(v_expected_mc_ids))
  LIMIT 1;
  IF v_dangling IS NOT NULL THEN
    RAISE EXCEPTION 'EVAL migration verify: item distractor tag references undefined misconception id "%"', v_dangling;
  END IF;

  RAISE NOTICE
    'EVAL migration verify OK: skill=sma_prob_conditionnelle (id=%) misconceptions=8 (exact id set) shape=six-keys+structured-stem items=24 (exact id set, all on skill) coverage>=3/misconception integrity=no-dangling-tags. STAGING ONLY; skill-code reconciliation TODO remains for the real migration.',
    v_skill_id;
END
$verify$;

COMMIT;

-- ============================================================================
-- Reversal (manual — repo is forward-only; this whole file is disposable):
--   DELETE FROM public.items
--    WHERE id IN ( <the 24 sentinel item IDs above> );
--   UPDATE public.skills SET common_misconceptions = '[]'::jsonb
--    WHERE code = 'sma_prob_conditionnelle';
--   -- staging scaffold (only if it was created by this file):
--   DELETE FROM public.skills  WHERE id = 'eeeeeeee-e7a1-0000-0000-000000000003';
--   DELETE FROM public.topics  WHERE id = 'eeeeeeee-e7a1-0000-0000-000000000002';
--   DELETE FROM public.subjects WHERE id = 'eeeeeeee-e7a1-0000-0000-000000000001'; -- only if the eval created it
-- Safe ONLY if no user_misconception_states row has fired from these items.
-- ============================================================================
