-- ============================================================
-- Migration 036: Seed Sciences de la Vie et de la Terre (SVT) curriculum.
-- From shared/skill_map_svt.json — 9 topics, 25 skills, 9 prereq edges.
-- Codes prefixed with svt_ to avoid collision.
-- UUID series: topics 22222222-dddd-..., skills 33333333-dddd-...
-- Idempotent: ON CONFLICT DO NOTHING.
-- ============================================================

BEGIN;

-- ==== Subject: Mathématiques (SVT) ====
-- 1 topic, 5 skills (lighter than PC/SMA)

INSERT INTO public.topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-dddd-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001', 'svt_math_fundamentals', 'Fondamentaux pour SVT', 'أساسيات لعلوم الحياة والأرض', 0, 0.75)
ON CONFLICT (subject_id, code) DO NOTHING;

INSERT INTO public.skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-dddd-0000-0000-000000000001', '22222222-dddd-0000-0000-000000000001', 'svt_arith_geom_seq', 'Suites arithmétiques et géométriques', 'المتتاليات الحسابية والهندسية', 1, 0.70, 0),
  ('33333333-dddd-0000-0000-000000000002', '22222222-dddd-0000-0000-000000000001', 'svt_limit_calc', 'Calcul de limites', 'حساب النهايات', 2, 0.75, 1),
  ('33333333-dddd-0000-0000-000000000003', '22222222-dddd-0000-0000-000000000001', 'svt_deriv_apps', 'Dérivation et applications', 'الاشتقاق وتطبيقاته', 2, 0.80, 2),
  ('33333333-dddd-0000-0000-000000000004', '22222222-dddd-0000-0000-000000000001', 'svt_exp_ln_combined', 'Fonctions exponentielle et logarithme', 'الدالتان الأسية واللوغاريتمية', 2, 0.85, 3),
  ('33333333-dddd-0000-0000-000000000005', '22222222-dddd-0000-0000-000000000001', 'svt_integral_basics', 'Primitives et intégrales (bases)', 'الأصول الدالية والتكاملات', 2, 0.75, 4)
ON CONFLICT (topic_id, code) DO NOTHING;

-- ==== Subject: Physique-Chimie (SVT — lighter than PC) ====
-- 4 topics, 8 skills

INSERT INTO public.topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-dddd-0000-0000-000000000011', '11111111-0000-0000-0000-000000000002', 'svt_mechanics_energy', 'Mécanique et énergie', 'الميكانيكا والطاقة', 0, 0.80),
  ('22222222-dddd-0000-0000-000000000012', '11111111-0000-0000-0000-000000000002', 'svt_waves_nuclear', 'Ondes et nucléaire', 'الموجات والنووي', 1, 0.75),
  ('22222222-dddd-0000-0000-000000000013', '11111111-0000-0000-0000-000000000002', 'svt_electricity_basics', 'Électricité — dipôle RC', 'الكهرباء', 2, 0.70),
  ('22222222-dddd-0000-0000-000000000014', '11111111-0000-0000-0000-000000000002', 'svt_chemistry_basics', 'Chimie — solutions et réactions', 'الكيمياء', 3, 0.80)
ON CONFLICT (subject_id, code) DO NOTHING;

INSERT INTO public.skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-dddd-0000-0000-000000000011', '22222222-dddd-0000-0000-000000000011', 'svt_newton_apps', 'Lois de Newton et applications', 'قوانين نيوتن وتطبيقاتها', 2, 0.80, 0),
  ('33333333-dddd-0000-0000-000000000012', '22222222-dddd-0000-0000-000000000011', 'svt_energy', 'Énergie mécanique', 'الطاقة الميكانيكية', 2, 0.80, 1),
  ('33333333-dddd-0000-0000-000000000013', '22222222-dddd-0000-0000-000000000012', 'svt_waves', 'Ondes mécaniques et lumineuses', 'الموجات الميكانيكية والضوئية', 2, 0.75, 0),
  ('33333333-dddd-0000-0000-000000000014', '22222222-dddd-0000-0000-000000000012', 'svt_radioactivity_basics', 'Radioactivité et datation', 'النشاط الإشعاعي والتأريخ', 2, 0.80, 1),
  ('33333333-dddd-0000-0000-000000000015', '22222222-dddd-0000-0000-000000000013', 'svt_rc_circuit', 'Dipôle RC', 'ثنائي القطب RC', 2, 0.70, 0),
  ('33333333-dddd-0000-0000-000000000016', '22222222-dddd-0000-0000-000000000014', 'svt_ph', 'pH et solutions', 'الـpH والمحاليل', 2, 0.80, 0),
  ('33333333-dddd-0000-0000-000000000017', '22222222-dddd-0000-0000-000000000014', 'svt_redox_basics', 'Oxydoréduction et piles', 'أكسدة-اختزال', 2, 0.75, 1),
  ('33333333-dddd-0000-0000-000000000018', '22222222-dddd-0000-0000-000000000014', 'svt_organic_basics', 'Chimie organique — esters', 'الكيمياء العضوية', 2, 0.70, 2)
ON CONFLICT (topic_id, code) DO NOTHING;

-- ==== Subject: SVT (Sciences de la Vie et de la Terre) ====
-- 7 topics, 12 skills (NOVEL bio/geo content)

INSERT INTO public.topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-dddd-0000-0000-000000000021', '11111111-0000-0000-0000-000000000003', 'svt_genetics', 'Génétique', 'علم الوراثة', 0, 0.90),
  ('22222222-dddd-0000-0000-000000000022', '11111111-0000-0000-0000-000000000003', 'svt_evolution_topic', 'Évolution', 'التطور', 1, 0.80),
  ('22222222-dddd-0000-0000-000000000023', '11111111-0000-0000-0000-000000000003', 'svt_communication', 'Communication dans l''organisme', 'التواصل في الكائن الحي', 2, 0.85),
  ('22222222-dddd-0000-0000-000000000024', '11111111-0000-0000-0000-000000000003', 'svt_immunology', 'Immunologie', 'علم المناعة', 3, 0.85),
  ('22222222-dddd-0000-0000-000000000025', '11111111-0000-0000-0000-000000000003', 'svt_geology', 'Géologie', 'علم الأرض', 4, 0.80),
  ('22222222-dddd-0000-0000-000000000026', '11111111-0000-0000-0000-000000000003', 'svt_cellular_energetics', 'Énergie cellulaire', 'الطاقة الخلوية', 5, 0.80),
  ('22222222-dddd-0000-0000-000000000027', '11111111-0000-0000-0000-000000000003', 'svt_ecology', 'Écologie', 'علم البيئة', 6, 0.70)
ON CONFLICT (subject_id, code) DO NOTHING;

INSERT INTO public.skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-dddd-0000-0000-000000000021', '22222222-dddd-0000-0000-000000000021', 'svt_genetique_humaine', 'Génétique humaine — lois de Mendel', 'علم الوراثة البشرية', 3, 0.90, 0),
  ('33333333-dddd-0000-0000-000000000022', '22222222-dddd-0000-0000-000000000021', 'svt_genetique_populations', 'Génétique des populations — Hardy-Weinberg', 'وراثة المجموعات', 3, 0.80, 1),
  ('33333333-dddd-0000-0000-000000000023', '22222222-dddd-0000-0000-000000000021', 'svt_diversification_genetique', 'Diversification génétique — méiose, brassage', 'التنوع الوراثي', 3, 0.85, 2),
  ('33333333-dddd-0000-0000-000000000024', '22222222-dddd-0000-0000-000000000022', 'svt_evolution', 'Mécanismes de l''évolution', 'آليات التطور', 3, 0.80, 0),
  ('33333333-dddd-0000-0000-000000000025', '22222222-dddd-0000-0000-000000000023', 'svt_communication_nerveuse', 'Communication nerveuse', 'التواصل العصبي', 3, 0.85, 0),
  ('33333333-dddd-0000-0000-000000000026', '22222222-dddd-0000-0000-000000000023', 'svt_communication_hormonale', 'Communication hormonale', 'التواصل الهرموني', 3, 0.80, 1),
  ('33333333-dddd-0000-0000-000000000027', '22222222-dddd-0000-0000-000000000024', 'svt_immunite', 'Immunité innée et acquise', 'المناعة', 3, 0.85, 0),
  ('33333333-dddd-0000-0000-000000000028', '22222222-dddd-0000-0000-000000000025', 'svt_tectonique_plaques', 'Tectonique des plaques', 'تكتونية الصفائح', 2, 0.80, 0),
  ('33333333-dddd-0000-0000-000000000029', '22222222-dddd-0000-0000-000000000025', 'svt_geochronologie', 'Géochronologie', 'الجيولوجيا الزمنية', 3, 0.75, 1),
  ('33333333-dddd-0000-0000-00000000002a', '22222222-dddd-0000-0000-000000000025', 'svt_metamorphisme', 'Métamorphisme', 'التحول', 2, 0.70, 2),
  ('33333333-dddd-0000-0000-00000000002b', '22222222-dddd-0000-0000-000000000026', 'svt_energie_cellulaire', 'Métabolisme cellulaire — respiration et photosynthèse', 'الأيض الخلوي', 3, 0.80, 0),
  ('33333333-dddd-0000-0000-00000000002c', '22222222-dddd-0000-0000-000000000027', 'svt_ecosystemes', 'Écosystèmes et flux d''énergie', 'الأنظمة البيئية', 2, 0.70, 0)
ON CONFLICT (topic_id, code) DO NOTHING;

-- ==== Prerequisites ====

INSERT INTO public.skill_prerequisites (skill_id, prerequisite_skill_id) VALUES
  ('33333333-dddd-0000-0000-000000000003', '33333333-dddd-0000-0000-000000000002'),  -- deriv_apps ← limit_calc
  ('33333333-dddd-0000-0000-000000000004', '33333333-dddd-0000-0000-000000000003'),  -- exp_ln ← deriv_apps
  ('33333333-dddd-0000-0000-000000000005', '33333333-dddd-0000-0000-000000000004'),  -- integral_basics ← exp_ln
  ('33333333-dddd-0000-0000-000000000012', '33333333-dddd-0000-0000-000000000011'),  -- energy ← newton_apps
  ('33333333-dddd-0000-0000-000000000022', '33333333-dddd-0000-0000-000000000021'),  -- pop_genetique ← genetique_humaine
  ('33333333-dddd-0000-0000-000000000023', '33333333-dddd-0000-0000-000000000021'),  -- diversification ← genetique_humaine
  ('33333333-dddd-0000-0000-000000000024', '33333333-dddd-0000-0000-000000000022'),  -- evolution ← pop_genetique
  ('33333333-dddd-0000-0000-000000000029', '33333333-dddd-0000-0000-000000000028'),  -- geochronologie ← tectonique
  ('33333333-dddd-0000-0000-00000000002a', '33333333-dddd-0000-0000-000000000028')   -- metamorphisme ← tectonique
ON CONFLICT (skill_id, prerequisite_skill_id) DO NOTHING;

-- ==== Stub lessons (replaced by migration 037) ====

UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Suites arithmétiques et géométriques", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Les suites arithmétiques (raison additive) et géométriques (raison multiplicative) — bases pour SVT."}]}]}'::jsonb WHERE code = 'svt_arith_geom_seq' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Calcul de limites", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Substitution, factorisation, formes indéterminées simples."}]}]}'::jsonb WHERE code = 'svt_limit_calc' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Dérivation et applications", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Règles de dérivation, sens de variation."}]}]}'::jsonb WHERE code = 'svt_deriv_apps' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Fonctions exp et ln", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Propriétés algébriques, croissances comparées de base."}]}]}'::jsonb WHERE code = 'svt_exp_ln_combined' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Primitives et intégrales", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Primitives usuelles, intégrale définie."}]}]}'::jsonb WHERE code = 'svt_integral_basics' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Lois de Newton", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Trois lois de Newton appliquées à des cas simples."}]}]}'::jsonb WHERE code = 'svt_newton_apps' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Énergie mécanique", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Cinétique + potentielle, conservation."}]}]}'::jsonb WHERE code = 'svt_energy' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Ondes", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Propagation, célérité, longueur d''onde."}]}]}'::jsonb WHERE code = 'svt_waves' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Radioactivité", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Désintégrations, demi-vie, datation."}]}]}'::jsonb WHERE code = 'svt_radioactivity_basics' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Dipôle RC", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Charge et décharge d''un condensateur."}]}]}'::jsonb WHERE code = 'svt_rc_circuit' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "pH", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Définition du pH, acides forts/faibles."}]}]}'::jsonb WHERE code = 'svt_ph' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Oxydoréduction", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Couples redox, piles électrochimiques."}]}]}'::jsonb WHERE code = 'svt_redox_basics' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Chimie organique", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Estérification et hydrolyse."}]}]}'::jsonb WHERE code = 'svt_organic_basics' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Génétique humaine", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Lois de Mendel, hérédité monohybride et dihybride."}]}]}'::jsonb WHERE code = 'svt_genetique_humaine' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Génétique des populations", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Loi de Hardy-Weinberg, fréquences alléliques."}]}]}'::jsonb WHERE code = 'svt_genetique_populations' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Diversification génétique", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Méiose, brassage interchromosomique et intrachromosomique."}]}]}'::jsonb WHERE code = 'svt_diversification_genetique' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Évolution", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Sélection naturelle, dérive génétique, spéciation."}]}]}'::jsonb WHERE code = 'svt_evolution' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Communication nerveuse", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Neurone, synapse, potentiel d''action."}]}]}'::jsonb WHERE code = 'svt_communication_nerveuse' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Communication hormonale", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Glandes endocrines, hormones, régulation."}]}]}'::jsonb WHERE code = 'svt_communication_hormonale' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Immunité", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Immunité innée et acquise, vaccination."}]}]}'::jsonb WHERE code = 'svt_immunite' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Tectonique des plaques", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Plaques lithosphériques, dorsales, subduction."}]}]}'::jsonb WHERE code = 'svt_tectonique_plaques' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Géochronologie", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Datation absolue par radioactivité, datation relative."}]}]}'::jsonb WHERE code = 'svt_geochronologie' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Métamorphisme", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Transformation des roches sous P et T."}]}]}'::jsonb WHERE code = 'svt_metamorphisme' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Énergie cellulaire", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Respiration cellulaire, photosynthèse, ATP."}]}]}'::jsonb WHERE code = 'svt_energie_cellulaire' AND lesson IS NULL;
UPDATE public.skills SET lesson = '{"version": 2, "title_fr": "Écosystèmes", "subtitle_fr": "Bac SVT", "sections": [{"kind": "concept", "title_fr": "Introduction", "blocks": [{"kind": "paragraph", "md": "Producteurs, consommateurs, flux d''énergie."}]}]}'::jsonb WHERE code = 'svt_ecosystemes' AND lesson IS NULL;

COMMIT;
