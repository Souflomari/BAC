-- ============================================================
-- Migration 032: Seed Sciences Physiques (PC) curriculum.
-- From shared/skill_map_pc.json — 15 topics, 28 skills.
-- Codes prefixed with pc_ to avoid collision with sma_*, smb (unprefixed),
-- and svt_* (Phase 4).
-- UUID series: topics 22222222-cccc-…, skills 33333333-cccc-….
-- Idempotent: ON CONFLICT DO NOTHING.
-- ============================================================

BEGIN;

-- ==== Subject: Mathématiques (PC) ====
-- 8 topics, 12 skills

INSERT INTO public.topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-cccc-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001', 'pc_sequences', 'Suites numériques', 'المتتاليات العددية', 0, 0.80),
  ('22222222-cccc-0000-0000-000000000002', '11111111-0000-0000-0000-000000000001', 'pc_limits', 'Limites et continuité', 'النهايات والاتصال', 1, 0.90),
  ('22222222-cccc-0000-0000-000000000003', '11111111-0000-0000-0000-000000000001', 'pc_derivation', 'Dérivation', 'الاشتقاق', 2, 0.90),
  ('22222222-cccc-0000-0000-000000000004', '11111111-0000-0000-0000-000000000001', 'pc_log_exp', 'Logarithme et exponentielle', 'اللوغاريتم والأسي', 3, 0.85),
  ('22222222-cccc-0000-0000-000000000005', '11111111-0000-0000-0000-000000000001', 'pc_integrals', 'Primitives et intégrales', 'الأصول الدالية والتكاملات', 4, 0.80),
  ('22222222-cccc-0000-0000-000000000006', '11111111-0000-0000-0000-000000000001', 'pc_complex', 'Nombres complexes', 'الأعداد العقدية', 5, 0.75),
  ('22222222-cccc-0000-0000-000000000007', '11111111-0000-0000-0000-000000000001', 'pc_ode', 'Équations différentielles', 'المعادلات التفاضلية', 6, 0.70),
  ('22222222-cccc-0000-0000-000000000008', '11111111-0000-0000-0000-000000000001', 'pc_probas', 'Probabilités', 'الاحتمالات', 7, 0.65)
ON CONFLICT (subject_id, code) DO NOTHING;

INSERT INTO public.skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-cccc-0000-0000-000000000001', '22222222-cccc-0000-0000-000000000001', 'pc_arithmetic_geom_seq', 'Suites arithmétiques et géométriques', 'المتتاليات الحسابية والهندسية', 1, 0.70, 0),
  ('33333333-cccc-0000-0000-000000000002', '22222222-cccc-0000-0000-000000000001', 'pc_seq_convergence', 'Convergence des suites', 'تقارب المتتاليات', 2, 0.85, 1),
  ('33333333-cccc-0000-0000-000000000003', '22222222-cccc-0000-0000-000000000001', 'pc_seq_recursive', 'Suites récurrentes', 'المتتاليات التراجعية', 3, 0.80, 2),
  ('33333333-cccc-0000-0000-000000000004', '22222222-cccc-0000-0000-000000000002', 'pc_limit_calc', 'Calcul de limites', 'حساب النهايات', 2, 0.90, 0),
  ('33333333-cccc-0000-0000-000000000005', '22222222-cccc-0000-0000-000000000002', 'pc_continuity_tvi', 'Continuité et TVI', 'الاتصال ومبرهنة القيم الوسطى', 3, 0.85, 1),
  ('33333333-cccc-0000-0000-000000000006', '22222222-cccc-0000-0000-000000000003', 'pc_deriv_rules', 'Règles de dérivation', 'قواعد الاشتقاق', 2, 0.90, 0),
  ('33333333-cccc-0000-0000-000000000007', '22222222-cccc-0000-0000-000000000003', 'pc_deriv_apps', 'Applications: variations, optimisation', 'تطبيقات: تغيرات، أمثل', 3, 0.85, 1),
  ('33333333-cccc-0000-0000-000000000008', '22222222-cccc-0000-0000-000000000004', 'pc_ln_function', 'Fonction logarithme népérien', 'دالة اللوغاريتم النيبيري', 2, 0.85, 0),
  ('33333333-cccc-0000-0000-000000000009', '22222222-cccc-0000-0000-000000000004', 'pc_exp_function', 'Fonction exponentielle', 'الدالة الأسية', 2, 0.90, 1),
  ('33333333-cccc-0000-0000-00000000000a', '22222222-cccc-0000-0000-000000000005', 'pc_primitives', 'Primitives', 'الأصول الدالية', 2, 0.80, 0),
  ('33333333-cccc-0000-0000-00000000000b', '22222222-cccc-0000-0000-000000000005', 'pc_integral_calc', 'Calcul intégral', 'حساب التكاملات', 3, 0.80, 1),
  ('33333333-cccc-0000-0000-00000000000c', '22222222-cccc-0000-0000-000000000006', 'pc_complex_algebra', 'Forme algébrique et opérations', 'الشكل الجبري والعمليات', 2, 0.75, 0),
  ('33333333-cccc-0000-0000-00000000000d', '22222222-cccc-0000-0000-000000000006', 'pc_complex_trig', 'Forme trigonométrique et Moivre', 'الشكل المثلثي وموافر', 3, 0.80, 1),
  ('33333333-cccc-0000-0000-00000000000e', '22222222-cccc-0000-0000-000000000007', 'pc_ode_first_order', 'EDO du 1er ordre', 'المعادلات التفاضلية من الرتبة الأولى', 3, 0.70, 0),
  ('33333333-cccc-0000-0000-00000000000f', '22222222-cccc-0000-0000-000000000008', 'pc_prob_binomial', 'Loi binomiale', 'القانون الحدي', 2, 0.65, 0)
ON CONFLICT (topic_id, code) DO NOTHING;

-- ==== Subject: Physique-Chimie (PC) ====
-- 7 topics, 13 skills

INSERT INTO public.topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-cccc-0000-0000-000000000011', '11111111-0000-0000-0000-000000000002', 'pc_mechanics', 'Mécanique de Newton', 'ميكانيكا نيوتن', 0, 0.85),
  ('22222222-cccc-0000-0000-000000000012', '11111111-0000-0000-0000-000000000002', 'pc_electricity', 'Électricité — Dipôles RC, RL, RLC', 'الكهرباء', 1, 0.90),
  ('22222222-cccc-0000-0000-000000000013', '11111111-0000-0000-0000-000000000002', 'pc_waves', 'Ondes', 'الموجات', 2, 0.80),
  ('22222222-cccc-0000-0000-000000000014', '11111111-0000-0000-0000-000000000002', 'pc_modulation_nuclear', 'Modulation et nucléaire', 'التضمين والنووي', 3, 0.75),
  ('22222222-cccc-0000-0000-000000000015', '11111111-0000-0000-0000-000000000002', 'pc_chemistry_kinetic', 'Cinétique chimique', 'الحركية الكيميائية', 4, 0.75),
  ('22222222-cccc-0000-0000-000000000016', '11111111-0000-0000-0000-000000000002', 'pc_chemistry_aqueous', 'Solutions aqueuses — pH, dosages', 'المحاليل المائية', 5, 0.90),
  ('22222222-cccc-0000-0000-000000000017', '11111111-0000-0000-0000-000000000002', 'pc_chemistry_organic_redox', 'Estérification et piles', 'الأسترة والمولدات', 6, 0.75)
ON CONFLICT (subject_id, code) DO NOTHING;

INSERT INTO public.skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-cccc-0000-0000-000000000011', '22222222-cccc-0000-0000-000000000011', 'pc_newton_laws', 'Lois de Newton', 'قوانين نيوتن', 2, 0.85, 0),
  ('33333333-cccc-0000-0000-000000000012', '22222222-cccc-0000-0000-000000000011', 'pc_projectile', 'Mouvement d''un projectile', 'حركة قذيفة', 3, 0.80, 1),
  ('33333333-cccc-0000-0000-000000000013', '22222222-cccc-0000-0000-000000000011', 'pc_energy_mechanical', 'Énergie mécanique', 'الطاقة الميكانيكية', 2, 0.85, 2),
  ('33333333-cccc-0000-0000-000000000014', '22222222-cccc-0000-0000-000000000011', 'pc_pendulum', 'Pendule pesant et élastique', 'النواس الثقيل والمرن', 3, 0.75, 3),
  ('33333333-cccc-0000-0000-000000000015', '22222222-cccc-0000-0000-000000000012', 'pc_rc_circuit', 'Dipôle RC', 'ثنائي القطب RC', 2, 0.85, 0),
  ('33333333-cccc-0000-0000-000000000016', '22222222-cccc-0000-0000-000000000012', 'pc_rl_circuit', 'Dipôle RL', 'ثنائي القطب RL', 2, 0.85, 1),
  ('33333333-cccc-0000-0000-000000000017', '22222222-cccc-0000-0000-000000000012', 'pc_rlc_oscillations', 'Oscillations RLC libres', 'التذبذبات الحرة RLC', 3, 0.90, 2),
  ('33333333-cccc-0000-0000-000000000018', '22222222-cccc-0000-0000-000000000013', 'pc_mechanical_waves', 'Ondes mécaniques', 'الموجات الميكانيكية', 2, 0.75, 0),
  ('33333333-cccc-0000-0000-000000000019', '22222222-cccc-0000-0000-000000000013', 'pc_diffraction_interference', 'Diffraction et interférences', 'الحيود والتداخل', 3, 0.80, 1),
  ('33333333-cccc-0000-0000-00000000001a', '22222222-cccc-0000-0000-000000000014', 'pc_am_modulation', 'Modulation d''amplitude (AM)', 'التضمين الإسعي AM', 3, 0.70, 0),
  ('33333333-cccc-0000-0000-00000000001b', '22222222-cccc-0000-0000-000000000014', 'pc_radioactivity', 'Radioactivité et désintégrations', 'النشاط الإشعاعي والتفتت', 3, 0.85, 1),
  ('33333333-cccc-0000-0000-00000000001c', '22222222-cccc-0000-0000-000000000015', 'pc_reaction_speed', 'Vitesse de réaction', 'سرعة التفاعل', 2, 0.75, 0),
  ('33333333-cccc-0000-0000-00000000001d', '22222222-cccc-0000-0000-000000000016', 'pc_ph_calculation', 'pH et acides-bases', 'pH والأحماض والقواعد', 2, 0.90, 0),
  ('33333333-cccc-0000-0000-00000000001e', '22222222-cccc-0000-0000-000000000016', 'pc_titration', 'Titrage acide-base', 'المعايرة حمض-قاعدة', 3, 0.85, 1),
  ('33333333-cccc-0000-0000-00000000001f', '22222222-cccc-0000-0000-000000000017', 'pc_esterification', 'Estérification et hydrolyse', 'الأسترة والتحلل المائي', 3, 0.70, 0),
  ('33333333-cccc-0000-0000-000000000020', '22222222-cccc-0000-0000-000000000017', 'pc_daniell_cell', 'Pile Daniell et oxydoréduction', 'عمود دانيال والأكسدة الاختزال', 2, 0.80, 1)
ON CONFLICT (topic_id, code) DO NOTHING;

-- ==== Prerequisites ====
INSERT INTO public.skill_prerequisites (skill_id, prerequisite_skill_id) VALUES
  -- pc_seq_convergence requires pc_arithmetic_geom_seq
  ('33333333-cccc-0000-0000-000000000002', '33333333-cccc-0000-0000-000000000001'),
  -- pc_seq_recursive requires pc_seq_convergence
  ('33333333-cccc-0000-0000-000000000003', '33333333-cccc-0000-0000-000000000002'),
  -- pc_continuity_tvi requires pc_limit_calc
  ('33333333-cccc-0000-0000-000000000005', '33333333-cccc-0000-0000-000000000004'),
  -- pc_deriv_rules requires pc_limit_calc
  ('33333333-cccc-0000-0000-000000000006', '33333333-cccc-0000-0000-000000000004'),
  -- pc_deriv_apps requires pc_deriv_rules
  ('33333333-cccc-0000-0000-000000000007', '33333333-cccc-0000-0000-000000000006'),
  -- pc_ln_function requires pc_deriv_rules
  ('33333333-cccc-0000-0000-000000000008', '33333333-cccc-0000-0000-000000000006'),
  -- pc_exp_function requires pc_ln_function
  ('33333333-cccc-0000-0000-000000000009', '33333333-cccc-0000-0000-000000000008'),
  -- pc_primitives requires pc_deriv_rules
  ('33333333-cccc-0000-0000-00000000000a', '33333333-cccc-0000-0000-000000000006'),
  -- pc_integral_calc requires pc_primitives
  ('33333333-cccc-0000-0000-00000000000b', '33333333-cccc-0000-0000-00000000000a'),
  -- pc_complex_trig requires pc_complex_algebra
  ('33333333-cccc-0000-0000-00000000000d', '33333333-cccc-0000-0000-00000000000c'),
  -- pc_ode_first_order requires pc_exp_function + pc_primitives
  ('33333333-cccc-0000-0000-00000000000e', '33333333-cccc-0000-0000-000000000009'),
  ('33333333-cccc-0000-0000-00000000000e', '33333333-cccc-0000-0000-00000000000a'),
  -- pc_projectile requires pc_newton_laws
  ('33333333-cccc-0000-0000-000000000012', '33333333-cccc-0000-0000-000000000011'),
  -- pc_energy_mechanical requires pc_newton_laws
  ('33333333-cccc-0000-0000-000000000013', '33333333-cccc-0000-0000-000000000011'),
  -- pc_pendulum requires pc_energy_mechanical
  ('33333333-cccc-0000-0000-000000000014', '33333333-cccc-0000-0000-000000000013'),
  -- pc_rl_circuit requires pc_rc_circuit
  ('33333333-cccc-0000-0000-000000000016', '33333333-cccc-0000-0000-000000000015'),
  -- pc_rlc_oscillations requires pc_rc_circuit + pc_rl_circuit
  ('33333333-cccc-0000-0000-000000000017', '33333333-cccc-0000-0000-000000000015'),
  ('33333333-cccc-0000-0000-000000000017', '33333333-cccc-0000-0000-000000000016'),
  -- pc_diffraction_interference requires pc_mechanical_waves
  ('33333333-cccc-0000-0000-000000000019', '33333333-cccc-0000-0000-000000000018'),
  -- pc_am_modulation requires pc_rlc_oscillations
  ('33333333-cccc-0000-0000-00000000001a', '33333333-cccc-0000-0000-000000000017'),
  -- pc_titration requires pc_ph_calculation
  ('33333333-cccc-0000-0000-00000000001e', '33333333-cccc-0000-0000-00000000001d')
ON CONFLICT (skill_id, prerequisite_skill_id) DO NOTHING;

-- ==== Stub lessons (so each skill renders a non-empty page) ====
-- Real lessons come in migration 033. These are minimal placeholders.
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Suites arithmétiques et géométriques", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Ce chapitre couvre les **suites arithmétiques** (raison constante par addition) et **géométriques** (raison constante par multiplication). Voir la section *Épreuve type* en bas pour des exercices appliqués."}]}]}'::jsonb WHERE code = 'pc_arithmetic_geom_seq' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Convergence des suites", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Étude de la **convergence** d''une suite : monotonie, bornes, théorème de la limite monotone, théorème des gendarmes."}]}]}'::jsonb WHERE code = 'pc_seq_convergence' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Suites récurrentes", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Suites définies par récurrence $u_{n+1} = f(u_n)$ : point fixe, étude de monotonie, convergence."}]}]}'::jsonb WHERE code = 'pc_seq_recursive' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Calcul de limites", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Calcul de limites de fonctions : substitution, formes indéterminées, factorisation, quantités conjuguées."}]}]}'::jsonb WHERE code = 'pc_limit_calc' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Continuité et TVI", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Continuité d''une fonction et théorème des valeurs intermédiaires."}]}]}'::jsonb WHERE code = 'pc_continuity_tvi' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Règles de dérivation", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Définition par taux d''accroissement, règles : linéarité, produit, quotient, composition."}]}]}'::jsonb WHERE code = 'pc_deriv_rules' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Applications de la dérivation", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Étude des variations, recherche d''extrema, problèmes d''optimisation."}]}]}'::jsonb WHERE code = 'pc_deriv_apps' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Fonction logarithme népérien", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "La fonction $\\ln$ : propriétés algébriques, dérivation, équations, applications."}]}]}'::jsonb WHERE code = 'pc_ln_function' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Fonction exponentielle", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "La fonction $e^x$ : propriétés algébriques, croissances comparées, équations différentielles."}]}]}'::jsonb WHERE code = 'pc_exp_function' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Primitives", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Définition, primitives usuelles, formes reconnaissables."}]}]}'::jsonb WHERE code = 'pc_primitives' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Calcul intégral", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Intégrale définie via Newton-Leibniz, propriétés, calcul d''aires."}]}]}'::jsonb WHERE code = 'pc_integral_calc' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Nombres complexes (bases)", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Forme algébrique, module, conjugué, opérations, équations dans $\\mathbb{C}$."}]}]}'::jsonb WHERE code = 'pc_complex_algebra' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Forme trigonométrique et Moivre", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Forme $r e^{i\\theta}$, formule de Moivre, racines n-ièmes."}]}]}'::jsonb WHERE code = 'pc_complex_trig' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "EDO du 1er ordre", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Équations $y'' = ay$ et $y'' = ay + b$, applications à la désintégration, refroidissement, charge RC."}]}]}'::jsonb WHERE code = 'pc_ode_first_order' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Loi binomiale", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Schéma de Bernoulli, loi binomiale $\\mathcal{B}(n, p)$, espérance, variance."}]}]}'::jsonb WHERE code = 'pc_prob_binomial' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Lois de Newton", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Trois lois de Newton, application à des systèmes mécaniques (plan incliné, poulie, etc.)."}]}]}'::jsonb WHERE code = 'pc_newton_laws' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Mouvement d''un projectile", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Chute libre, tir parabolique, trajectoire, portée, hauteur maximale."}]}]}'::jsonb WHERE code = 'pc_projectile' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Énergie mécanique", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Énergie cinétique, potentielle (pesanteur, élastique), conservation, théorème de l''énergie cinétique."}]}]}'::jsonb WHERE code = 'pc_energy_mechanical' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Pendule pesant et élastique", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Pendule simple, pendule pesant, ressort, oscillations harmoniques."}]}]}'::jsonb WHERE code = 'pc_pendulum' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Dipôle RC", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Charge et décharge d''un condensateur, constante de temps $\\tau = RC$, énergie stockée."}]}]}'::jsonb WHERE code = 'pc_rc_circuit' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Dipôle RL", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Établissement et rupture du courant, constante $\\tau = L/R$, énergie magnétique."}]}]}'::jsonb WHERE code = 'pc_rl_circuit' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Oscillations RLC libres", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Trois régimes (pseudo-périodique, critique, apériodique), pulsation propre $\\omega_0 = 1/\\sqrt{LC}$."}]}]}'::jsonb WHERE code = 'pc_rlc_oscillations' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Ondes mécaniques", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Propagation, célérité, longueur d''onde, transversales vs longitudinales."}]}]}'::jsonb WHERE code = 'pc_mechanical_waves' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Diffraction et interférences", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Diffraction par une fente, interférences à deux ondes (Young), critères et applications."}]}]}'::jsonb WHERE code = 'pc_diffraction_interference' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Modulation d''amplitude (AM)", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Principe AM, taux de modulation, démodulation par détection d''enveloppe, sélectivité radio."}]}]}'::jsonb WHERE code = 'pc_am_modulation' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Radioactivité", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Désintégrations $\\alpha$, $\\beta^-$, $\\beta^+$, lois de conservation, demi-vie, datation."}]}]}'::jsonb WHERE code = 'pc_radioactivity' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Vitesse de réaction", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Vitesse volumique de réaction, facteurs cinétiques, demi-vie, loi d''Arrhenius."}]}]}'::jsonb WHERE code = 'pc_reaction_speed' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "pH et acides-bases", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Définition du pH, autoprotolyse de l''eau, acides forts/faibles, pKa, prédominance."}]}]}'::jsonb WHERE code = 'pc_ph_calculation' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Titrage acide-base", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Dosage acide-base, équivalence, indicateurs colorés, courbes pH-volume."}]}]}'::jsonb WHERE code = 'pc_titration' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Estérification et hydrolyse", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Réaction acide + alcool $\\rightleftharpoons$ ester + eau, équilibre, déplacement, saponification."}]}]}'::jsonb WHERE code = 'pc_esterification' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Pile Daniell et oxydoréduction", "subtitle_fr": "Bac PC", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Demi-équations redox, pile Daniell, fem, électrolyse, applications industrielles."}]}]}'::jsonb WHERE code = 'pc_daniell_cell' AND lesson IS NULL;

COMMIT;
