-- ============================================================
-- SEED DATA: 2ème Bac Sciences Maths B
-- Subjects, Topics, Skills, and Items
-- ============================================================

-- SUBJECTS
INSERT INTO subjects (id, code, name_fr, name_ar, icon, color, exam_type, content_language, display_order) VALUES
  ('11111111-0000-0000-0000-000000000001', 'math', 'Mathématiques', 'الرياضيات', 'math', '#4A90D9', 'national', 'fr', 1),
  ('11111111-0000-0000-0000-000000000002', 'physics', 'Physique-Chimie', 'الفيزياء والكيمياء', 'physics', '#E8744F', 'national', 'fr', 2),
  ('11111111-0000-0000-0000-000000000003', 'svt', 'Sciences de la Vie et de la Terre', 'علوم الحياة والأرض', 'biology', '#4CAF50', 'national', 'fr', 3),
  ('11111111-0000-0000-0000-000000000004', 'philosophy', 'Philosophie', 'الفلسفة', 'philosophy', '#9C27B0', 'national', 'ar', 4),
  ('11111111-0000-0000-0000-000000000005', 'french', 'Français', 'الفرنسية', 'french', '#2196F3', 'regional', 'fr', 5),
  ('11111111-0000-0000-0000-000000000006', 'arabic', 'Arabe', 'العربية', 'arabic', '#FF9800', 'regional', 'ar', 6),
  ('11111111-0000-0000-0000-000000000007', 'english', 'Anglais', 'الإنجليزية', 'english', '#00BCD4', 'regional', 'en', 7),
  ('11111111-0000-0000-0000-000000000008', 'islamic_ed', 'Éducation Islamique', 'التربية الإسلامية', 'islamic', '#795548', 'regional', 'ar', 8),
  ('11111111-0000-0000-0000-000000000009', 'engineering', 'Sciences de l''Ingénieur', 'علوم المهندس', 'engineering', '#607D8B', 'national', 'fr', 9),
  ('11111111-0000-0000-0000-000000000010', 'economics', 'Économie Générale et Statistiques', 'الاقتصاد العام والإحصاء', 'economics', '#FF5722', 'national', 'fr', 10),
  ('11111111-0000-0000-0000-000000000011', 'business', 'Économie et Organisation des Entreprises', 'اقتصاد وتنظيم المقاولات', 'business', '#3F51B5', 'national', 'fr', 11),
  ('11111111-0000-0000-0000-000000000012', 'accounting', 'Comptabilité et Maths Financières', 'المحاسبة والرياضيات المالية', 'accounting', '#009688', 'national', 'fr', 12),
  ('11111111-0000-0000-0000-000000000013', 'law', 'Droit', 'القانون', 'law', '#8D6E63', 'national', 'fr', 13);

-- STREAM-SUBJECT MAPPINGS (Sciences Maths B)
INSERT INTO stream_subjects (stream, subject_id, coefficient, is_optional) VALUES
  ('sciences_maths_b', '11111111-0000-0000-0000-000000000001', 9.0, false),  -- Maths coeff 9
  ('sciences_maths_b', '11111111-0000-0000-0000-000000000002', 7.0, false),  -- Physique coeff 7
  ('sciences_maths_b', '11111111-0000-0000-0000-000000000009', 5.0, false),  -- SI coeff 5
  ('sciences_maths_b', '11111111-0000-0000-0000-000000000004', 2.0, false),  -- Philo coeff 2
  ('sciences_maths_b', '11111111-0000-0000-0000-000000000005', 2.0, false),  -- Français coeff 2
  ('sciences_maths_b', '11111111-0000-0000-0000-000000000006', 2.0, false),  -- Arabe coeff 2
  ('sciences_maths_b', '11111111-0000-0000-0000-000000000007', 2.0, false),  -- Anglais coeff 2
  ('sciences_maths_b', '11111111-0000-0000-0000-000000000008', 2.0, false);  -- Ed. Islamique coeff 2

-- Also add Sciences Maths A (similar but with SVT instead of SI)
INSERT INTO stream_subjects (stream, subject_id, coefficient, is_optional) VALUES
  ('sciences_maths_a', '11111111-0000-0000-0000-000000000001', 9.0, false),
  ('sciences_maths_a', '11111111-0000-0000-0000-000000000002', 7.0, false),
  ('sciences_maths_a', '11111111-0000-0000-0000-000000000003', 5.0, false),  -- SVT instead of SI
  ('sciences_maths_a', '11111111-0000-0000-0000-000000000004', 2.0, false),
  ('sciences_maths_a', '11111111-0000-0000-0000-000000000005', 2.0, false),
  ('sciences_maths_a', '11111111-0000-0000-0000-000000000006', 2.0, false),
  ('sciences_maths_a', '11111111-0000-0000-0000-000000000007', 2.0, false),
  ('sciences_maths_a', '11111111-0000-0000-0000-000000000008', 2.0, false);

-- Sciences Physiques stream
INSERT INTO stream_subjects (stream, subject_id, coefficient, is_optional) VALUES
  ('sciences_physiques', '11111111-0000-0000-0000-000000000001', 7.0, false),
  ('sciences_physiques', '11111111-0000-0000-0000-000000000002', 7.0, false),
  ('sciences_physiques', '11111111-0000-0000-0000-000000000003', 5.0, false),
  ('sciences_physiques', '11111111-0000-0000-0000-000000000004', 2.0, false),
  ('sciences_physiques', '11111111-0000-0000-0000-000000000005', 2.0, false),
  ('sciences_physiques', '11111111-0000-0000-0000-000000000006', 2.0, false),
  ('sciences_physiques', '11111111-0000-0000-0000-000000000007', 2.0, false),
  ('sciences_physiques', '11111111-0000-0000-0000-000000000008', 2.0, false);

-- SVT stream (filière SVT)
INSERT INTO stream_subjects (stream, subject_id, coefficient, is_optional) VALUES
  ('svt', '11111111-0000-0000-0000-000000000001', 3.0, false),  -- Math coeff 3
  ('svt', '11111111-0000-0000-0000-000000000002', 5.0, false),  -- Physique coeff 5
  ('svt', '11111111-0000-0000-0000-000000000003', 7.0, false),  -- SVT coeff 7
  ('svt', '11111111-0000-0000-0000-000000000004', 2.0, false),  -- Philo
  ('svt', '11111111-0000-0000-0000-000000000005', 2.0, false),  -- Français
  ('svt', '11111111-0000-0000-0000-000000000006', 2.0, false),  -- Arabe
  ('svt', '11111111-0000-0000-0000-000000000007', 2.0, false),  -- Anglais
  ('svt', '11111111-0000-0000-0000-000000000008', 2.0, false);  -- Ed. Islamique

-- Sciences Économiques stream
INSERT INTO stream_subjects (stream, subject_id, coefficient, is_optional) VALUES
  ('sciences_economiques', '11111111-0000-0000-0000-000000000001', 4.0, false),  -- Math
  ('sciences_economiques', '11111111-0000-0000-0000-000000000010', 4.0, false),  -- Économie Générale
  ('sciences_economiques', '11111111-0000-0000-0000-000000000011', 4.0, false),  -- Business
  ('sciences_economiques', '11111111-0000-0000-0000-000000000012', 4.0, false),  -- Accounting
  ('sciences_economiques', '11111111-0000-0000-0000-000000000013', 2.0, false),  -- Law
  ('sciences_economiques', '11111111-0000-0000-0000-000000000004', 2.0, false),  -- Philo
  ('sciences_economiques', '11111111-0000-0000-0000-000000000005', 2.0, false),  -- Français
  ('sciences_economiques', '11111111-0000-0000-0000-000000000006', 2.0, false),  -- Arabe
  ('sciences_economiques', '11111111-0000-0000-0000-000000000007', 2.0, false),  -- Anglais
  ('sciences_economiques', '11111111-0000-0000-0000-000000000008', 2.0, false);  -- Ed. Islamique

-- Sciences de Gestion Comptable stream
INSERT INTO stream_subjects (stream, subject_id, coefficient, is_optional) VALUES
  ('sciences_gestion_comptable', '11111111-0000-0000-0000-000000000001', 4.0, false),  -- Math
  ('sciences_gestion_comptable', '11111111-0000-0000-0000-000000000012', 6.0, false),  -- Accounting (major)
  ('sciences_gestion_comptable', '11111111-0000-0000-0000-000000000011', 4.0, false),  -- Business
  ('sciences_gestion_comptable', '11111111-0000-0000-0000-000000000010', 2.0, false),  -- Économie Générale
  ('sciences_gestion_comptable', '11111111-0000-0000-0000-000000000013', 2.0, false),  -- Law
  ('sciences_gestion_comptable', '11111111-0000-0000-0000-000000000004', 2.0, false),  -- Philo
  ('sciences_gestion_comptable', '11111111-0000-0000-0000-000000000005', 2.0, false),  -- Français
  ('sciences_gestion_comptable', '11111111-0000-0000-0000-000000000006', 2.0, false),  -- Arabe
  ('sciences_gestion_comptable', '11111111-0000-0000-0000-000000000007', 2.0, false),  -- Anglais
  ('sciences_gestion_comptable', '11111111-0000-0000-0000-000000000008', 2.0, false);  -- Ed. Islamique

-- ============================================================
-- MATH TOPICS & SKILLS (2ème Bac Sciences Maths)
-- ============================================================

-- TOPIC: Suites numériques
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000001', '11111111-0000-0000-0000-000000000001', 'sequences', 'Suites numériques', 'المتتاليات العددية', 1, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000001', '22222222-0000-0000-0000-000000000001', 'arithmetic_seq', 'Suites arithmétiques', 'المتتاليات الحسابية', 1, 0.70, 1),
  ('33333333-0000-0000-0000-000000000002', '22222222-0000-0000-0000-000000000001', 'geometric_seq', 'Suites géométriques', 'المتتاليات الهندسية', 1, 0.70, 2),
  ('33333333-0000-0000-0000-000000000003', '22222222-0000-0000-0000-000000000001', 'seq_convergence', 'Convergence des suites', 'تقارب المتتاليات', 2, 0.90, 3),
  ('33333333-0000-0000-0000-000000000004', '22222222-0000-0000-0000-000000000001', 'seq_recursive', 'Suites récurrentes', 'المتتاليات بالتراجع', 3, 0.85, 4),
  ('33333333-0000-0000-0000-000000000005', '22222222-0000-0000-0000-000000000001', 'seq_adjacent', 'Suites adjacentes', 'المتتاليات المتجاورة', 3, 0.75, 5);

-- TOPIC: Limites et continuité
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000002', '11111111-0000-0000-0000-000000000001', 'limits', 'Limites et continuité', 'النهايات والاستمرارية', 2, 0.90);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000006', '22222222-0000-0000-0000-000000000002', 'limit_def', 'Notion de limite', 'مفهوم النهاية', 2, 0.80, 1),
  ('33333333-0000-0000-0000-000000000007', '22222222-0000-0000-0000-000000000002', 'limit_calc', 'Calcul de limites', 'حساب النهايات', 2, 0.95, 2),
  ('33333333-0000-0000-0000-000000000008', '22222222-0000-0000-0000-000000000002', 'continuity', 'Continuité', 'الاستمرارية', 3, 0.85, 3),
  ('33333333-0000-0000-0000-000000000009', '22222222-0000-0000-0000-000000000002', 'tvi', 'Théorème des valeurs intermédiaires', 'مبرهنة القيم المتوسطة', 3, 0.90, 4);

-- TOPIC: Dérivation
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000003', '11111111-0000-0000-0000-000000000001', 'derivatives', 'Dérivation', 'الاشتقاق', 3, 0.95);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000010', '22222222-0000-0000-0000-000000000003', 'deriv_basic', 'Dérivées de base', 'المشتقات الأساسية', 1, 0.80, 1),
  ('33333333-0000-0000-0000-000000000011', '22222222-0000-0000-0000-000000000003', 'deriv_rules', 'Règles de dérivation', 'قواعد الاشتقاق', 2, 0.90, 2),
  ('33333333-0000-0000-0000-000000000012', '22222222-0000-0000-0000-000000000003', 'deriv_apps', 'Applications (tangente, extrema)', 'التطبيقات (المماس، القيم القصوى)', 3, 0.95, 3);

-- TOPIC: Intégration
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000004', '11111111-0000-0000-0000-000000000001', 'integration', 'Intégration', 'التكامل', 4, 0.90);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000013', '22222222-0000-0000-0000-000000000004', 'primitives', 'Primitives', 'الدوال الأصلية', 2, 0.85, 1),
  ('33333333-0000-0000-0000-000000000014', '22222222-0000-0000-0000-000000000004', 'definite_integral', 'Intégrale définie', 'التكامل المحدود', 3, 0.90, 2),
  ('33333333-0000-0000-0000-000000000015', '22222222-0000-0000-0000-000000000004', 'integral_apps', 'Calcul d''aires', 'حساب المساحات', 4, 0.85, 3);

-- TOPIC: Probabilités
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000005', '11111111-0000-0000-0000-000000000001', 'probability', 'Probabilités', 'الاحتمالات', 5, 0.80);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000016', '22222222-0000-0000-0000-000000000005', 'prob_basic', 'Probabilités de base', 'الاحتمالات الأساسية', 1, 0.70, 1),
  ('33333333-0000-0000-0000-000000000017', '22222222-0000-0000-0000-000000000005', 'conditional_prob', 'Probabilités conditionnelles', 'الاحتمالات الشرطية', 2, 0.85, 2),
  ('33333333-0000-0000-0000-000000000018', '22222222-0000-0000-0000-000000000005', 'random_variables', 'Variables aléatoires', 'المتغيرات العشوائية', 3, 0.80, 3);

-- TOPIC: Nombres complexes
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000006', '11111111-0000-0000-0000-000000000001', 'complex_numbers', 'Nombres complexes', 'الأعداد المركبة', 6, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000019', '22222222-0000-0000-0000-000000000006', 'complex_basics', 'Forme algébrique et opérations', 'الشكل الجبري والعمليات', 2, 0.80, 1),
  ('33333333-0000-0000-0000-000000000020', '22222222-0000-0000-0000-000000000006', 'complex_trig', 'Forme trigonométrique', 'الشكل المثلثي', 3, 0.85, 2),
  ('33333333-0000-0000-0000-000000000021', '22222222-0000-0000-0000-000000000006', 'complex_geometry', 'Applications géométriques', 'التطبيقات الهندسية', 4, 0.85, 3);

-- TOPIC: Équations différentielles
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000007', '11111111-0000-0000-0000-000000000001', 'differential_equations', 'Équations différentielles', 'المعادلات التفاضلية', 7, 0.75);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000022', '22222222-0000-0000-0000-000000000007', 'ode_first_order', 'Équations du premier ordre', 'معادلات الرتبة الأولى', 3, 0.75, 1),
  ('33333333-0000-0000-0000-000000000023', '22222222-0000-0000-0000-000000000007', 'ode_second_order', 'Équations du second ordre', 'معادلات الرتبة الثانية', 4, 0.70, 2);


-- ============================================================
-- PHYSICS TOPICS & SKILLS (Physique-Chimie)
-- ============================================================

-- TOPIC: Mécanique
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000008', '11111111-0000-0000-0000-000000000002', 'mechanics', 'Mécanique', 'الميكانيك', 1, 0.90);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000024', '22222222-0000-0000-0000-000000000008', 'kinematics', 'Cinématique', 'علم الحركة', 2, 0.80, 1),
  ('33333333-0000-0000-0000-000000000025', '22222222-0000-0000-0000-000000000008', 'newtons_laws', 'Lois de Newton', 'قوانين نيوتن', 3, 0.95, 2),
  ('33333333-0000-0000-0000-000000000026', '22222222-0000-0000-0000-000000000008', 'energy', 'Énergie mécanique', 'الطاقة الميكانيكية', 3, 0.85, 3);

-- TOPIC: Ondes
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000009', '11111111-0000-0000-0000-000000000002', 'waves', 'Ondes', 'الموجات', 2, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000027', '22222222-0000-0000-0000-000000000009', 'wave_properties', 'Propriétés des ondes', 'خصائص الموجات', 2, 0.80, 1),
  ('33333333-0000-0000-0000-000000000028', '22222222-0000-0000-0000-000000000009', 'sound_light', 'Ondes sonores et lumineuses', 'الموجات الصوتية والضوئية', 3, 0.85, 2);

-- TOPIC: Électricité
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000010', '11111111-0000-0000-0000-000000000002', 'electricity', 'Électricité', 'الكهرباء', 3, 0.90);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000029', '22222222-0000-0000-0000-000000000010', 'rc_rl_circuits', 'Circuits RC et RL', 'دارات RC و RL', 3, 0.85, 1),
  ('33333333-0000-0000-0000-000000000030', '22222222-0000-0000-0000-000000000010', 'rlc_oscillations', 'Oscillations RLC', 'تذبذبات RLC', 4, 0.90, 2);

-- TOPIC: Chimie
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000011', '11111111-0000-0000-0000-000000000002', 'chemistry', 'Chimie', 'الكيمياء', 4, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000031', '22222222-0000-0000-0000-000000000011', 'acid_base', 'Réactions acido-basiques', 'التفاعلات الحمضية القاعدية', 2, 0.85, 1),
  ('33333333-0000-0000-0000-000000000032', '22222222-0000-0000-0000-000000000011', 'redox', 'Réactions d''oxydoréduction', 'تفاعلات الأكسدة والاختزال', 3, 0.80, 2);

-- ============================================================
-- SVT TOPICS & SKILLS (Sciences de la Vie et de la Terre)
-- For Sciences Maths A only (coeff 5)
-- ============================================================

-- TOPIC: Consommation de la matière organique
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000012', '11111111-0000-0000-0000-000000000003', 'organic_matter', 'Consommation de la matière organique', 'استهلاك المادة العضوية', 1, 0.75);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000033', '22222222-0000-0000-0000-000000000012', 'cell_energy', 'Métabolisme énergétique', 'الأيض الطاقي', 2, 0.75, 1),
  ('33333333-0000-0000-0000-000000000034', '22222222-0000-0000-0000-000000000012', 'fermentation', 'Fermentation', 'التخمر', 2, 0.70, 2);

-- TOPIC: Génétique moléculaire
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000013', '11111111-0000-0000-0000-000000000003', 'molecular_genetics', 'Génétique moléculaire', 'الوراثة الجزيئية', 2, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000035', '22222222-0000-0000-0000-000000000013', 'dna_structure', 'ADN et information génétique', 'الحمض النووي والمعلومة الوراثية', 2, 0.80, 1),
  ('33333333-0000-0000-0000-000000000036', '22222222-0000-0000-0000-000000000013', 'gene_expression', 'Expression de l''information génétique', 'التعبير عن المعلومة الوراثية', 3, 0.85, 2),
  ('33333333-0000-0000-0000-000000000037', '22222222-0000-0000-0000-000000000013', 'mutations', 'Code génétique et mutations', 'الشفرة الوراثية والطفرات', 3, 0.80, 3);

-- TOPIC: Génétique humaine
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000014', '11111111-0000-0000-0000-000000000003', 'human_genetics', 'Génétique humaine', 'الوراثة البشرية', 3, 0.80);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000038', '22222222-0000-0000-0000-000000000014', 'autosomal_heredity', 'Hérédité liée aux autosomes', 'الوراثة المرتبطة بالصبغيات الجسمية', 3, 0.80, 1),
  ('33333333-0000-0000-0000-000000000039', '22222222-0000-0000-0000-000000000014', 'sex_linked_heredity', 'Hérédité liée au sexe', 'الوراثة المرتبطة بالجنس', 3, 0.80, 2);

-- TOPIC: Immunologie
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000015', '11111111-0000-0000-0000-000000000003', 'immunology', 'Immunologie', 'علم المناعة', 4, 0.90);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000040', '22222222-0000-0000-0000-000000000015', 'self_nonself', 'Le soi et le non-soi', 'الذات واللاذات', 2, 0.80, 1),
  ('33333333-0000-0000-0000-000000000041', '22222222-0000-0000-0000-000000000015', 'specific_immunity', 'Immunité spécifique', 'المناعة النوعية', 3, 0.90, 2),
  ('33333333-0000-0000-0000-000000000042', '22222222-0000-0000-0000-000000000015', 'immune_disorders', 'Dysfonctionnements immunitaires', 'اختلالات الجهاز المناعي', 3, 0.80, 3);

-- TOPIC: Géologie
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000016', '11111111-0000-0000-0000-000000000003', 'geology', 'Géologie', 'الجيولوجيا', 5, 0.75);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000043', '22222222-0000-0000-0000-000000000016', 'tectonic_deformations', 'Déformations tectoniques', 'التشوهات التكتونية', 2, 0.75, 1),
  ('33333333-0000-0000-0000-000000000044', '22222222-0000-0000-0000-000000000016', 'metamorphism', 'Métamorphisme et granitisation', 'التحول والتغرنت', 3, 0.75, 2);

-- ============================================================
-- ENGINEERING TOPICS & SKILLS (Sciences de l'Ingénieur)
-- For Sciences Maths B only (coeff 5)
-- ============================================================

-- TOPIC: Analyse fonctionnelle
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000017', '11111111-0000-0000-0000-000000000009', 'functional_analysis', 'Analyse fonctionnelle', 'التحليل الوظيفي', 1, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000045', '22222222-0000-0000-0000-000000000017', 'needs_analysis', 'Analyse du besoin et CdCF', 'تحليل الحاجة ودفتر الشروط', 2, 0.80, 1),
  ('33333333-0000-0000-0000-000000000046', '22222222-0000-0000-0000-000000000017', 'sadt_fast', 'SADT, FAST et diagrammes', 'مخططات التحليل الوظيفي', 2, 0.85, 2);

-- TOPIC: Chaîne d'énergie
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000018', '11111111-0000-0000-0000-000000000009', 'energy_chain', 'Chaîne d''énergie', 'سلسلة الطاقة', 2, 0.90);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000047', '22222222-0000-0000-0000-000000000018', 'energy_supply', 'Alimenter et distribuer l''énergie', 'تغذية وتوزيع الطاقة', 2, 0.85, 1),
  ('33333333-0000-0000-0000-000000000048', '22222222-0000-0000-0000-000000000018', 'energy_convert', 'Convertir et transmettre l''énergie', 'تحويل ونقل الطاقة', 3, 0.90, 2);

-- TOPIC: Chaîne d'information
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000019', '11111111-0000-0000-0000-000000000009', 'info_chain', 'Chaîne d''information', 'سلسلة المعلومات', 3, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000049', '22222222-0000-0000-0000-000000000019', 'sensors', 'Capteurs et acquisition', 'المستشعرات واكتساب المعلومات', 2, 0.80, 1),
  ('33333333-0000-0000-0000-000000000050', '22222222-0000-0000-0000-000000000019', 'grafcet', 'GRAFCET et logique séquentielle', 'غرافسي والمنطق التتابعي', 3, 0.90, 2);

-- TOPIC: Mécanique appliquée
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000020', '11111111-0000-0000-0000-000000000009', 'eng_mechanics', 'Mécanique appliquée', 'الميكانيك التطبيقي', 4, 0.90);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000051', '22222222-0000-0000-0000-000000000020', 'statics', 'Statique (PFS et torseurs)', 'السكونيات', 3, 0.90, 1),
  ('33333333-0000-0000-0000-000000000052', '22222222-0000-0000-0000-000000000020', 'kinematics_solids', 'Cinématique des solides', 'حركيات الأجسام الصلبة', 3, 0.85, 2);

-- TOPIC: Résistance des matériaux
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000021', '11111111-0000-0000-0000-000000000009', 'materials', 'Résistance des matériaux', 'مقاومة المواد', 5, 0.80);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000053', '22222222-0000-0000-0000-000000000021', 'rdm_traction', 'Traction et compression', 'الشد والضغط', 3, 0.80, 1),
  ('33333333-0000-0000-0000-000000000054', '22222222-0000-0000-0000-000000000021', 'rdm_flexion', 'Flexion simple', 'الانحناء البسيط', 3, 0.80, 2);

-- ============================================================
-- PHILOSOPHY TOPICS & SKILLS (Philosophie)
-- ============================================================

-- TOPIC: La connaissance
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000022', '11111111-0000-0000-0000-000000000004', 'philo_knowledge', 'La connaissance', 'المعرفة', 1, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000055', '22222222-0000-0000-0000-000000000022', 'truth_opinion', 'Vérité et opinion', 'الحقيقة والرأي', 2, 0.80, 1),
  ('33333333-0000-0000-0000-000000000056', '22222222-0000-0000-0000-000000000022', 'theory_experience', 'Théorie et expérience', 'النظرية والتجربة', 3, 0.85, 2),
  ('33333333-0000-0000-0000-000000000057', '22222222-0000-0000-0000-000000000022', 'science_philosophy', 'Sciences et philosophie', 'العلوم والفلسفة', 3, 0.80, 3);

-- TOPIC: La politique
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000023', '11111111-0000-0000-0000-000000000004', 'philo_politics', 'La politique', 'السياسة', 2, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000058', '22222222-0000-0000-0000-000000000023', 'state_power', 'L''État et le pouvoir', 'الدولة والسلطة', 2, 0.85, 1),
  ('33333333-0000-0000-0000-000000000059', '22222222-0000-0000-0000-000000000023', 'justice_law', 'La justice et le droit', 'العدالة والقانون', 3, 0.85, 2),
  ('33333333-0000-0000-0000-000000000060', '22222222-0000-0000-0000-000000000023', 'violence_legitimacy', 'La violence et la légitimité', 'العنف والمشروعية', 3, 0.80, 3);

-- TOPIC: La morale
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000024', '11111111-0000-0000-0000-000000000004', 'philo_morals', 'La morale', 'الأخلاق', 3, 0.90);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000061', '22222222-0000-0000-0000-000000000024', 'duty_freedom', 'Le devoir et la liberté', 'الواجب والحرية', 2, 0.85, 1),
  ('33333333-0000-0000-0000-000000000062', '22222222-0000-0000-0000-000000000024', 'happiness_desire', 'Le bonheur et le désir', 'السعادة والرغبة', 3, 0.85, 2);

-- ============================================================
-- FRENCH TOPICS & SKILLS (Français)
-- ============================================================

-- TOPIC: Lecture et compréhension
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000025', '11111111-0000-0000-0000-000000000005', 'fr_reading', 'Lecture et compréhension', 'القراءة والفهم', 1, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000063', '22222222-0000-0000-0000-000000000025', 'text_analysis', 'Analyse de texte', 'تحليل النص', 2, 0.80, 1),
  ('33333333-0000-0000-0000-000000000064', '22222222-0000-0000-0000-000000000025', 'figures_style', 'Figures de style', 'الأساليب البلاغية', 2, 0.80, 2),
  ('33333333-0000-0000-0000-000000000065', '22222222-0000-0000-0000-000000000025', 'argumentation', 'Argumentation et thèse', 'الحجاج والأطروحة', 3, 0.85, 3);

-- TOPIC: Production écrite
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000026', '11111111-0000-0000-0000-000000000005', 'fr_writing', 'Production écrite', 'الإنتاج الكتابي', 2, 0.90);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000066', '22222222-0000-0000-0000-000000000026', 'essay_structure', 'Structure de la dissertation', 'بنية المقالة', 2, 0.85, 1),
  ('33333333-0000-0000-0000-000000000067', '22222222-0000-0000-0000-000000000026', 'commentary', 'Commentaire composé', 'التعليق المركب', 3, 0.85, 2),
  ('33333333-0000-0000-0000-000000000068', '22222222-0000-0000-0000-000000000026', 'essay_writing', 'Rédaction et expression', 'التحرير والتعبير', 3, 0.80, 3);

-- TOPIC: Œuvres littéraires
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000027', '11111111-0000-0000-0000-000000000005', 'fr_literature', 'Œuvres littéraires', 'المؤلفات الأدبية', 3, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000069', '22222222-0000-0000-0000-000000000027', 'novel_study', 'Le roman (La Boîte à Merveilles, Le Dernier Jour...)', 'الرواية', 2, 0.85, 1),
  ('33333333-0000-0000-0000-000000000070', '22222222-0000-0000-0000-000000000027', 'theater_study', 'Le théâtre (Antigone)', 'المسرح (أنتيغون)', 3, 0.85, 2);

-- ============================================================
-- ARABIC TOPICS & SKILLS (Arabe)
-- ============================================================

-- TOPIC: النحو والصرف (Grammaire)
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000028', '11111111-0000-0000-0000-000000000006', 'ar_grammar', 'Grammaire arabe (Nahou et Sarf)', 'النحو والصرف', 1, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000071', '22222222-0000-0000-0000-000000000028', 'syntax_rules', 'Règles syntaxiques (Nahou)', 'قواعد النحو', 2, 0.80, 1),
  ('33333333-0000-0000-0000-000000000072', '22222222-0000-0000-0000-000000000028', 'morphology', 'Morphologie (Sarf)', 'الصرف', 2, 0.80, 2),
  ('33333333-0000-0000-0000-000000000073', '22222222-0000-0000-0000-000000000028', 'grammatical_analysis', 'Analyse grammaticale (I''rab)', 'الإعراب', 3, 0.85, 3);

-- TOPIC: البلاغة (Rhétorique)
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000029', '11111111-0000-0000-0000-000000000006', 'ar_rhetoric', 'Rhétorique arabe (Balagha)', 'البلاغة', 2, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000074', '22222222-0000-0000-0000-000000000029', 'bayan', 'Ilm Al-Bayan (métaphore, comparaison)', 'علم البيان', 2, 0.80, 1),
  ('33333333-0000-0000-0000-000000000075', '22222222-0000-0000-0000-000000000029', 'badie', 'Ilm Al-Badie (figures de style arabes)', 'علم البديع', 3, 0.80, 2);

-- TOPIC: النصوص (Textes)
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000030', '11111111-0000-0000-0000-000000000006', 'ar_texts', 'Textes et expression arabe', 'النصوص والتعبير', 3, 0.90);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000076', '22222222-0000-0000-0000-000000000030', 'text_comprehension', 'Compréhension de texte arabe', 'فهم النص العربي', 2, 0.80, 1),
  ('33333333-0000-0000-0000-000000000077', '22222222-0000-0000-0000-000000000030', 'literary_analysis', 'Analyse littéraire arabe', 'التحليل الأدبي العربي', 3, 0.85, 2),
  ('33333333-0000-0000-0000-000000000078', '22222222-0000-0000-0000-000000000030', 'essay_ar', 'Expression écrite arabe', 'التعبير الكتابي العربي', 3, 0.80, 3);

-- ============================================================
-- ENGLISH TOPICS & SKILLS (Anglais)
-- ============================================================

-- TOPIC: Grammar and Vocabulary
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000031', '11111111-0000-0000-0000-000000000007', 'en_grammar', 'Grammar and Vocabulary', 'القواعد والمفردات', 1, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000079', '22222222-0000-0000-0000-000000000031', 'tenses', 'Verb Tenses', 'أزمنة الأفعال', 2, 0.85, 1),
  ('33333333-0000-0000-0000-000000000080', '22222222-0000-0000-0000-000000000031', 'grammar_structures', 'Grammar Structures (conditionals, passive, reported)', 'البنيات النحوية', 3, 0.85, 2),
  ('33333333-0000-0000-0000-000000000081', '22222222-0000-0000-0000-000000000031', 'vocabulary', 'Vocabulary and Word Formation', 'المفردات وتكوين الكلمات', 2, 0.75, 3);

-- TOPIC: Reading Comprehension
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000032', '11111111-0000-0000-0000-000000000007', 'en_reading', 'Reading Comprehension', 'فهم المقروء', 2, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000082', '22222222-0000-0000-0000-000000000032', 'reading_comp', 'Reading Comprehension', 'فهم المقروء', 2, 0.85, 1),
  ('33333333-0000-0000-0000-000000000083', '22222222-0000-0000-0000-000000000032', 'reading_inference', 'Inference and Critical Reading', 'الاستنتاج والقراءة النقدية', 3, 0.80, 2);

-- TOPIC: Writing Skills
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000033', '11111111-0000-0000-0000-000000000007', 'en_writing', 'Writing Skills', 'مهارات الكتابة', 3, 0.90);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000084', '22222222-0000-0000-0000-000000000033', 'letter_email', 'Letter and Email Writing', 'كتابة الرسائل والبريد الإلكتروني', 2, 0.80, 1),
  ('33333333-0000-0000-0000-000000000085', '22222222-0000-0000-0000-000000000033', 'essay_en', 'Essay Writing', 'كتابة المقالات', 3, 0.85, 2),
  ('33333333-0000-0000-0000-000000000086', '22222222-0000-0000-0000-000000000033', 'functions_lang', 'Language Functions (agreeing, suggesting, etc.)', 'وظائف اللغة', 2, 0.75, 3);

-- ============================================================
-- ISLAMIC EDUCATION TOPICS & SKILLS (Éducation Islamique)
-- ============================================================

-- TOPIC: العقيدة (Croyance)
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000034', '11111111-0000-0000-0000-000000000008', 'islam_aqida', 'Croyance (Al-Aqida)', 'العقيدة', 1, 0.80);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000087', '22222222-0000-0000-0000-000000000034', 'faith_pillars', 'Les piliers de la foi', 'أركان الإيمان', 2, 0.80, 1),
  ('33333333-0000-0000-0000-000000000088', '22222222-0000-0000-0000-000000000034', 'divine_attributes', 'Les attributs divins', 'صفات الله', 2, 0.75, 2);

-- TOPIC: الفقه والعبادات (Fiqh et pratiques)
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000035', '11111111-0000-0000-0000-000000000008', 'islam_fiqh_ibada', 'Fiqh et pratiques cultuelles', 'الفقه والعبادات', 2, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000089', '22222222-0000-0000-0000-000000000035', 'worship_rules', 'Règles des actes cultuels', 'أحكام العبادات', 2, 0.85, 1),
  ('33333333-0000-0000-0000-000000000090', '22222222-0000-0000-0000-000000000035', 'family_law', 'Droit de la famille en Islam', 'قانون الأسرة في الإسلام', 3, 0.80, 2);

-- TOPIC: القيم الإسلامية (Valeurs islamiques)
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000036', '11111111-0000-0000-0000-000000000008', 'islam_values', 'Valeurs islamiques', 'القيم الإسلامية', 3, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000091', '22222222-0000-0000-0000-000000000036', 'social_solidarity', 'Solidarité et entraide', 'التضامن والتعاون', 2, 0.80, 1),
  ('33333333-0000-0000-0000-000000000092', '22222222-0000-0000-0000-000000000036', 'tolerance_coexistence', 'Tolérance et coexistence', 'التسامح والتعايش', 2, 0.80, 2),
  ('33333333-0000-0000-0000-000000000093', '22222222-0000-0000-0000-000000000036', 'ethics_work', 'Éthique du travail', 'أخلاقيات العمل', 3, 0.80, 3);

-- ============================================================
-- ECONOMICS TOPICS & SKILLS (Économie Générale et Statistiques)
-- ============================================================

-- TOPIC: Marché et prix
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000037', '11111111-0000-0000-0000-000000000010', 'econ_market', 'Marché et prix', 'السوق والأسعار', 1, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000094', '22222222-0000-0000-0000-000000000037', 'supply_demand', 'Offre et demande', 'العرض والطلب', 2, 0.85, 1),
  ('33333333-0000-0000-0000-000000000095', '22222222-0000-0000-0000-000000000037', 'market_structures', 'Structures de marché', 'هياكل السوق', 3, 0.80, 2),
  ('33333333-0000-0000-0000-000000000096', '22222222-0000-0000-0000-000000000037', 'price_elasticity', 'Élasticité et prix', 'المرونة والأسعار', 3, 0.80, 3);

-- TOPIC: Monnaie et financement
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000038', '11111111-0000-0000-0000-000000000010', 'econ_money', 'Monnaie et financement', 'النقود والتمويل', 2, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000097', '22222222-0000-0000-0000-000000000038', 'money_credit', 'Monnaie et crédit', 'النقود والائتمان', 2, 0.80, 1),
  ('33333333-0000-0000-0000-000000000098', '22222222-0000-0000-0000-000000000038', 'financial_system', 'Système financier', 'النظام المالي', 3, 0.85, 2);

-- TOPIC: Croissance et développement
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000039', '11111111-0000-0000-0000-000000000010', 'econ_growth', 'Croissance et développement', 'النمو والتنمية', 3, 0.90);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000099', '22222222-0000-0000-0000-000000000039', 'gdp_growth', 'PIB et croissance', 'الناتج الداخلي الخام والنمو', 2, 0.85, 1),
  ('33333333-0000-0000-0000-000000000100', '22222222-0000-0000-0000-000000000039', 'development_indicators', 'Indicateurs de développement', 'مؤشرات التنمية', 3, 0.80, 2),
  ('33333333-0000-0000-0000-000000000101', '22222222-0000-0000-0000-000000000039', 'international_trade', 'Échanges internationaux', 'المبادلات الدولية', 3, 0.80, 3);

-- ============================================================
-- BUSINESS TOPICS & SKILLS (Économie et Organisation des Entreprises)
-- ============================================================

-- TOPIC: L'entreprise et son environnement
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000040', '11111111-0000-0000-0000-000000000011', 'biz_environment', 'L''entreprise et son environnement', 'المقاولة ومحيطها', 1, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000102', '22222222-0000-0000-0000-000000000040', 'enterprise_types', 'Types d''entreprises', 'أنواع المقاولات', 2, 0.80, 1),
  ('33333333-0000-0000-0000-000000000103', '22222222-0000-0000-0000-000000000040', 'enterprise_environment', 'Environnement de l''entreprise', 'محيط المقاولة', 2, 0.80, 2);

-- TOPIC: Organisation et gestion
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000041', '11111111-0000-0000-0000-000000000011', 'biz_organization', 'Organisation et gestion', 'التنظيم والتدبير', 2, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000104', '22222222-0000-0000-0000-000000000041', 'org_structure', 'Structure organisationnelle', 'الهيكل التنظيمي', 2, 0.80, 1),
  ('33333333-0000-0000-0000-000000000105', '22222222-0000-0000-0000-000000000041', 'human_resources', 'Gestion des ressources humaines', 'تدبير الموارد البشرية', 3, 0.80, 2),
  ('33333333-0000-0000-0000-000000000106', '22222222-0000-0000-0000-000000000041', 'production_management', 'Gestion de la production', 'تدبير الإنتاج', 3, 0.80, 3);

-- TOPIC: Stratégie et marketing
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000042', '11111111-0000-0000-0000-000000000011', 'biz_strategy', 'Stratégie et marketing', 'الاستراتيجية والتسويق', 3, 0.90);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000107', '22222222-0000-0000-0000-000000000042', 'marketing_mix', 'Marketing mix', 'المزيج التسويقي', 2, 0.85, 1),
  ('33333333-0000-0000-0000-000000000108', '22222222-0000-0000-0000-000000000042', 'business_strategy', 'Stratégie d''entreprise', 'استراتيجية المقاولة', 3, 0.85, 2),
  ('33333333-0000-0000-0000-000000000109', '22222222-0000-0000-0000-000000000042', 'quality_management', 'Qualité et innovation', 'الجودة والابتكار', 3, 0.80, 3);

-- ============================================================
-- ACCOUNTING TOPICS & SKILLS (Comptabilité et Maths Financières)
-- ============================================================

-- TOPIC: Comptabilité générale
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000043', '11111111-0000-0000-0000-000000000012', 'acct_general', 'Comptabilité générale', 'المحاسبة العامة', 1, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000110', '22222222-0000-0000-0000-000000000043', 'journal_entries', 'Écritures comptables', 'القيود المحاسبية', 2, 0.85, 1),
  ('33333333-0000-0000-0000-000000000111', '22222222-0000-0000-0000-000000000043', 'balance_sheet', 'Bilan et CPC', 'الميزانية وحساب النتائج', 2, 0.85, 2),
  ('33333333-0000-0000-0000-000000000112', '22222222-0000-0000-0000-000000000043', 'inventory_depreciation', 'Amortissements et provisions', 'الإهتلاكات والمؤونات', 3, 0.80, 3);

-- TOPIC: Analyse financière
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000044', '11111111-0000-0000-0000-000000000012', 'acct_analysis', 'Analyse financière', 'التحليل المالي', 2, 0.90);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000113', '22222222-0000-0000-0000-000000000044', 'financial_ratios', 'Ratios financiers', 'النسب المالية', 3, 0.85, 1),
  ('33333333-0000-0000-0000-000000000114', '22222222-0000-0000-0000-000000000044', 'working_capital', 'Fonds de roulement et BFR', 'رأس المال العامل واحتياجات التمويل', 3, 0.85, 2);

-- TOPIC: Mathématiques financières
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000045', '11111111-0000-0000-0000-000000000012', 'acct_math_fin', 'Mathématiques financières', 'الرياضيات المالية', 3, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000115', '22222222-0000-0000-0000-000000000045', 'simple_interest', 'Intérêts simples', 'الفوائد البسيطة', 2, 0.80, 1),
  ('33333333-0000-0000-0000-000000000116', '22222222-0000-0000-0000-000000000045', 'compound_interest', 'Intérêts composés', 'الفوائد المركبة', 3, 0.85, 2),
  ('33333333-0000-0000-0000-000000000117', '22222222-0000-0000-0000-000000000045', 'annuities', 'Annuités', 'الدفعات السنوية', 3, 0.80, 3);

-- ============================================================
-- LAW TOPICS & SKILLS (Droit)
-- ============================================================

-- TOPIC: Droit civil
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000046', '11111111-0000-0000-0000-000000000013', 'law_civil', 'Droit civil', 'القانون المدني', 1, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000118', '22222222-0000-0000-0000-000000000046', 'contracts', 'Les contrats', 'العقود', 2, 0.85, 1),
  ('33333333-0000-0000-0000-000000000119', '22222222-0000-0000-0000-000000000046', 'obligations', 'Les obligations', 'الالتزامات', 3, 0.80, 2),
  ('33333333-0000-0000-0000-000000000120', '22222222-0000-0000-0000-000000000046', 'liability', 'La responsabilité civile', 'المسؤولية المدنية', 3, 0.80, 3);

-- TOPIC: Droit commercial
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000047', '11111111-0000-0000-0000-000000000013', 'law_commercial', 'Droit commercial', 'القانون التجاري', 2, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000121', '22222222-0000-0000-0000-000000000047', 'commercial_acts', 'Actes de commerce', 'الأعمال التجارية', 2, 0.80, 1),
  ('33333333-0000-0000-0000-000000000122', '22222222-0000-0000-0000-000000000047', 'business_entities', 'Sociétés commerciales', 'الشركات التجارية', 3, 0.85, 2);

-- TOPIC: Droit social
INSERT INTO topics (id, subject_id, code, name_fr, name_ar, display_order, exam_relevance_weight) VALUES
  ('22222222-0000-0000-0000-000000000048', '11111111-0000-0000-0000-000000000013', 'law_social', 'Droit social', 'القانون الاجتماعي', 3, 0.85);

INSERT INTO skills (id, topic_id, code, name_fr, name_ar, difficulty_level, exam_relevance_weight, display_order) VALUES
  ('33333333-0000-0000-0000-000000000123', '22222222-0000-0000-0000-000000000048', 'labor_law', 'Contrat de travail', 'عقد الشغل', 2, 0.80, 1),
  ('33333333-0000-0000-0000-000000000124', '22222222-0000-0000-0000-000000000048', 'social_protection', 'Protection sociale', 'الحماية الاجتماعية', 3, 0.80, 2);

-- ============================================================
-- ITEMS are in separate content files: backend/seed/content/
-- Run them after this file:
--   math_01_sequences.sql        math_05_probability.sql
--   math_02_limits.sql           math_06_complex_numbers.sql
--   math_03_derivatives.sql      math_07_differential_equations.sql
--   math_04_integration.sql
--   physics_01_mechanics.sql     physics_03_electricity.sql
--   physics_02_waves.sql         physics_04_chemistry.sql
--   svt_01_organic_matter.sql    svt_03_human_genetics.sql    svt_05_geology.sql
--   svt_02_molecular_genetics.sql svt_04_immunology.sql
--   eng_01_functional_analysis.sql eng_03_info_chain.sql      eng_05_materials.sql
--   eng_02_energy_chain.sql       eng_04_mechanics.sql
--   philo_01_knowledge.sql       philo_02_politics.sql        philo_03_morals.sql
--   french_01_reading.sql        french_02_writing.sql        french_03_literature.sql
--   arabic_01_grammar.sql        arabic_02_rhetoric.sql       arabic_03_texts.sql
--   english_01_grammar.sql       english_02_reading.sql       english_03_writing.sql
--   islamic_01_aqida.sql         islamic_02_fiqh.sql          islamic_03_values.sql
--   econ_01_market.sql           econ_02_money.sql            econ_03_growth.sql
--   business_01_environment.sql  business_02_organization.sql business_03_strategy.sql
--   accounting_01_general.sql    accounting_02_analysis.sql   accounting_03_math_fin.sql
--   law_01_civil.sql             law_02_commercial.sql        law_03_social.sql
-- ============================================================

-- SKILL PREREQUISITES
INSERT INTO skill_prerequisites (skill_id, prerequisite_skill_id) VALUES
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
  -- PHYSICS prerequisites
  -- Newton's laws requires kinematics
  ('33333333-0000-0000-0000-000000000025', '33333333-0000-0000-0000-000000000024'),
  -- Energy requires Newton's laws
  ('33333333-0000-0000-0000-000000000026', '33333333-0000-0000-0000-000000000025'),
  -- Sound/light requires wave properties
  ('33333333-0000-0000-0000-000000000028', '33333333-0000-0000-0000-000000000027'),
  -- RLC oscillations requires RC/RL circuits
  ('33333333-0000-0000-0000-000000000030', '33333333-0000-0000-0000-000000000029'),
  -- SVT prerequisites
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
  -- ENGINEERING prerequisites
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
  ('33333333-0000-0000-0000-000000000054', '33333333-0000-0000-0000-000000000053');

-- WAVE 1 PREREQUISITES (General subjects)
INSERT INTO skill_prerequisites (skill_id, prerequisite_skill_id) VALUES
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
  ('33333333-0000-0000-0000-000000000093', '33333333-0000-0000-0000-000000000091');  -- ethics_work → social_solidarity

-- WAVE 2 PREREQUISITES (Economics subjects)
INSERT INTO skill_prerequisites (skill_id, prerequisite_skill_id) VALUES
  -- Economics
  ('33333333-0000-0000-0000-000000000095', '33333333-0000-0000-0000-000000000094'),  -- market_structures → supply_demand
  ('33333333-0000-0000-0000-000000000096', '33333333-0000-0000-0000-000000000095'),  -- price_elasticity → market_structures
  ('33333333-0000-0000-0000-000000000098', '33333333-0000-0000-0000-000000000097'),  -- financial_system → money_credit
  ('33333333-0000-0000-0000-000000000100', '33333333-0000-0000-0000-000000000099'),  -- development_indicators → gdp_growth
  ('33333333-0000-0000-0000-000000000101', '33333333-0000-0000-0000-000000000100'), -- international_trade → development_indicators
  -- Business
  ('33333333-0000-0000-0000-000000000103', '33333333-0000-0000-0000-000000000102'), -- enterprise_environment → enterprise_types
  ('33333333-0000-0000-0000-000000000105', '33333333-0000-0000-0000-000000000104'), -- human_resources → org_structure
  ('33333333-0000-0000-0000-000000000106', '33333333-0000-0000-0000-000000000104'), -- production_management → org_structure
  ('33333333-0000-0000-0000-000000000108', '33333333-0000-0000-0000-000000000107'), -- business_strategy → marketing_mix
  ('33333333-0000-0000-0000-000000000109', '33333333-0000-0000-0000-000000000108'), -- quality_management → business_strategy
  -- Accounting
  ('33333333-0000-0000-0000-000000000111', '33333333-0000-0000-0000-000000000110'), -- balance_sheet → journal_entries
  ('33333333-0000-0000-0000-000000000112', '33333333-0000-0000-0000-000000000111'), -- inventory_depreciation → balance_sheet
  ('33333333-0000-0000-0000-000000000113', '33333333-0000-0000-0000-000000000111'), -- financial_ratios → balance_sheet
  ('33333333-0000-0000-0000-000000000114', '33333333-0000-0000-0000-000000000113'), -- working_capital → financial_ratios
  ('33333333-0000-0000-0000-000000000116', '33333333-0000-0000-0000-000000000115'), -- compound_interest → simple_interest
  ('33333333-0000-0000-0000-000000000117', '33333333-0000-0000-0000-000000000116'), -- annuities → compound_interest
  -- Law
  ('33333333-0000-0000-0000-000000000119', '33333333-0000-0000-0000-000000000118'), -- obligations → contracts
  ('33333333-0000-0000-0000-000000000120', '33333333-0000-0000-0000-000000000119'), -- liability → obligations
  ('33333333-0000-0000-0000-000000000122', '33333333-0000-0000-0000-000000000121'), -- business_entities → commercial_acts
  ('33333333-0000-0000-0000-000000000124', '33333333-0000-0000-0000-000000000123'); -- social_protection → labor_law
-- ============================================================
-- BADGES
-- ============================================================
INSERT INTO badges (id, code, name_fr, name_ar, description_fr, icon, category, criteria) VALUES
  ('55555555-0000-0000-0000-000000000001', 'first_session', 'Premier pas', 'الخطوة الأولى', 'Terminer votre première session', 'star', 'mastery', '{"type": "first_session"}'),
  ('55555555-0000-0000-0000-000000000002', 'streak_5', 'Régulier', 'منتظم', '5 bonnes réponses consécutives', 'fire', 'streak', '{"type": "streak", "threshold": 5}'),
  ('55555555-0000-0000-0000-000000000003', 'streak_10', 'En feu !', 'مشتعل!', '10 bonnes réponses consécutives', 'fire_double', 'streak', '{"type": "streak", "threshold": 10}'),
  ('55555555-0000-0000-0000-000000000004', 'streak_30', 'Inarrêtable', 'لا يمكن إيقافه', '30 bonnes réponses consécutives', 'fire_triple', 'streak', '{"type": "streak", "threshold": 30}'),
  ('55555555-0000-0000-0000-000000000005', 'first_mastery', 'Première maîtrise', 'أول إتقان', 'Maîtriser votre premier skill', 'trophy', 'mastery', '{"type": "mastery_count", "threshold": 1}'),
  ('55555555-0000-0000-0000-000000000006', 'mastery_5', 'Expert en herbe', 'خبير ناشئ', 'Maîtriser 5 skills', 'medal', 'mastery', '{"type": "mastery_count", "threshold": 5}'),
  ('55555555-0000-0000-0000-000000000007', 'mastery_10', 'Savant', 'عالم', 'Maîtriser 10 skills', 'crown', 'mastery', '{"type": "mastery_count", "threshold": 10}'),
  ('55555555-0000-0000-0000-000000000008', 'daily_7', 'Semaine parfaite', 'أسبوع مثالي', 'Pratiquer 7 jours de suite', 'calendar', 'streak', '{"type": "daily_streak", "threshold": 7}'),
  ('55555555-0000-0000-0000-000000000009', 'daily_30', 'Mois d''acier', 'شهر من الفولاذ', 'Pratiquer 30 jours de suite', 'diamond', 'streak', '{"type": "daily_streak", "threshold": 30}');
