-- ============================================================
-- Migration 020: SMB past exam papers (annales) — metadata + sample questions
--
-- Existing seed (bac_exams_seed.sql) covers SMA only (~24 SMA papers,
-- 2023/2024). This migration adds 8 SMB papers (Math + Physique-Chimie,
-- 2023/2024 normale+rattrapage) plus 3 representative pattern-authored
-- questions per paper.
--
-- IMPORTANT: pdf_url values are placeholders. Real Bac PDFs are public
-- Ministry documents — the user will replace these URLs with the actual
-- ones from taalime.ma / sigmaths.net etc. Tags include 'placeholder'
-- so a future SME pass can swap in the real exam stems.
--
-- Deterministic UUID series:
--   Exams:     a1b2c3d4-bbbb-0000-0000-000000000NNN
--   Questions: b1b2c3d4-bbbb-0000-0000-000000000NNN
-- ============================================================

BEGIN;

-- ============================================================
-- 8 SMB EXAM PAPERS
-- ============================================================

INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
VALUES
  -- Math
  ('a1b2c3d4-bbbb-0000-0000-000000000001', 2024, 'normale',     'sciences_maths_b', (SELECT id FROM public.subjects WHERE code = 'math'),    '2024-06-07', 180, 20, 'https://bacapp.vercel.app/annales/smb-math-2024-normale.pdf',     TRUE, NOW()),
  ('a1b2c3d4-bbbb-0000-0000-000000000002', 2024, 'rattrapage',  'sciences_maths_b', (SELECT id FROM public.subjects WHERE code = 'math'),    '2024-07-08', 180, 20, 'https://bacapp.vercel.app/annales/smb-math-2024-rattrapage.pdf',  TRUE, NOW()),
  ('a1b2c3d4-bbbb-0000-0000-000000000003', 2023, 'normale',     'sciences_maths_b', (SELECT id FROM public.subjects WHERE code = 'math'),    '2023-06-07', 180, 20, 'https://bacapp.vercel.app/annales/smb-math-2023-normale.pdf',     TRUE, NOW()),
  ('a1b2c3d4-bbbb-0000-0000-000000000004', 2023, 'rattrapage',  'sciences_maths_b', (SELECT id FROM public.subjects WHERE code = 'math'),    '2023-07-05', 180, 20, 'https://bacapp.vercel.app/annales/smb-math-2023-rattrapage.pdf',  TRUE, NOW()),
  -- Physique-Chimie
  ('a1b2c3d4-bbbb-0000-0000-000000000005', 2024, 'normale',     'sciences_maths_b', (SELECT id FROM public.subjects WHERE code = 'physics'), '2024-06-08', 180, 20, 'https://bacapp.vercel.app/annales/smb-pc-2024-normale.pdf',       TRUE, NOW()),
  ('a1b2c3d4-bbbb-0000-0000-000000000006', 2024, 'rattrapage',  'sciences_maths_b', (SELECT id FROM public.subjects WHERE code = 'physics'), '2024-07-09', 180, 20, 'https://bacapp.vercel.app/annales/smb-pc-2024-rattrapage.pdf',    TRUE, NOW()),
  ('a1b2c3d4-bbbb-0000-0000-000000000007', 2023, 'normale',     'sciences_maths_b', (SELECT id FROM public.subjects WHERE code = 'physics'), '2023-06-08', 180, 20, 'https://bacapp.vercel.app/annales/smb-pc-2023-normale.pdf',       TRUE, NOW()),
  ('a1b2c3d4-bbbb-0000-0000-000000000008', 2023, 'rattrapage',  'sciences_maths_b', (SELECT id FROM public.subjects WHERE code = 'physics'), '2023-07-06', 180, 20, 'https://bacapp.vercel.app/annales/smb-pc-2023-rattrapage.pdf',    TRUE, NOW())
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- PATTERN-AUTHORED EXAM QUESTIONS (3 per paper × 8 papers = 24)
-- ============================================================

-- Helper: skill UUID lookups (SMB skills exist in seed_data.sql)
DO $$
DECLARE
  e_smb_math_2024_n   UUID := 'a1b2c3d4-bbbb-0000-0000-000000000001';
  e_smb_math_2024_r   UUID := 'a1b2c3d4-bbbb-0000-0000-000000000002';
  e_smb_math_2023_n   UUID := 'a1b2c3d4-bbbb-0000-0000-000000000003';
  e_smb_math_2023_r   UUID := 'a1b2c3d4-bbbb-0000-0000-000000000004';
  e_smb_pc_2024_n     UUID := 'a1b2c3d4-bbbb-0000-0000-000000000005';
  e_smb_pc_2024_r     UUID := 'a1b2c3d4-bbbb-0000-0000-000000000006';
  e_smb_pc_2023_n     UUID := 'a1b2c3d4-bbbb-0000-0000-000000000007';
  e_smb_pc_2023_r     UUID := 'a1b2c3d4-bbbb-0000-0000-000000000008';

  s_seq_recursive     UUID;
  s_complex_basics    UUID;
  s_definite_integral UUID;
  s_deriv_apps        UUID;
  s_continuity        UUID;
  s_geometric_seq     UUID;
  s_ode_first_order   UUID;
  s_random_variables  UUID;
  s_newtons_laws      UUID;
  s_rc_rl_circuits    UUID;
  s_acid_base         UUID;
  s_rlc_oscillations  UUID;
  s_redox             UUID;
  s_wave_properties   UUID;
  s_energy            UUID;
  s_kinematics        UUID;
BEGIN
  SELECT id INTO s_seq_recursive     FROM public.skills WHERE code = 'seq_recursive'     LIMIT 1;
  SELECT id INTO s_complex_basics    FROM public.skills WHERE code = 'complex_basics'    LIMIT 1;
  SELECT id INTO s_definite_integral FROM public.skills WHERE code = 'definite_integral' LIMIT 1;
  SELECT id INTO s_deriv_apps        FROM public.skills WHERE code = 'deriv_apps'        LIMIT 1;
  SELECT id INTO s_continuity        FROM public.skills WHERE code = 'continuity'        LIMIT 1;
  SELECT id INTO s_geometric_seq     FROM public.skills WHERE code = 'geometric_seq'     LIMIT 1;
  SELECT id INTO s_ode_first_order   FROM public.skills WHERE code = 'ode_first_order'   LIMIT 1;
  SELECT id INTO s_random_variables  FROM public.skills WHERE code = 'random_variables'  LIMIT 1;
  SELECT id INTO s_newtons_laws      FROM public.skills WHERE code = 'newtons_laws'      LIMIT 1;
  SELECT id INTO s_rc_rl_circuits    FROM public.skills WHERE code = 'rc_rl_circuits'    LIMIT 1;
  SELECT id INTO s_acid_base         FROM public.skills WHERE code = 'acid_base'         LIMIT 1;
  SELECT id INTO s_rlc_oscillations  FROM public.skills WHERE code = 'rlc_oscillations'  LIMIT 1;
  SELECT id INTO s_redox             FROM public.skills WHERE code = 'redox'             LIMIT 1;
  SELECT id INTO s_wave_properties   FROM public.skills WHERE code = 'wave_properties'   LIMIT 1;
  SELECT id INTO s_energy            FROM public.skills WHERE code = 'energy'            LIMIT 1;
  SELECT id INTO s_kinematics        FROM public.skills WHERE code = 'kinematics'        LIMIT 1;

  -- ===== 2024 Normale Math =====
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at) VALUES
  ('b1b2c3d4-bbbb-0000-0000-000000000001', e_smb_math_2024_n, s_seq_recursive, 1,
   '{"stem":"Soit $(u_n)$ définie par $u_0 = 1$ et $u_{n+1} = \\sqrt{u_n + 2}$. Étudier la convergence de $(u_n)$ et calculer sa limite.","latex":true,"item_type":"multi_step"}',
   '{"steps":[{"text":"Récurrence : $(u_n)$ est dans $[0,2]$ et croissante.","points":3},{"text":"Suite croissante et majorée → converge vers $\\ell$.","points":2},{"text":"Point fixe : $\\ell = \\sqrt{\\ell + 2} \\Leftrightarrow \\ell = 2$.","points":3}],"final_answer":"$(u_n)$ converge vers 2."}',
   'multi_step', 3, 8, ARRAY['suites','recurrence','smb_2024','placeholder'], TRUE, NOW()),
  ('b1b2c3d4-bbbb-0000-0000-000000000002', e_smb_math_2024_n, s_complex_basics, 2,
   '{"stem":"Calculer $|3 + 4i|$ et trouver l''argument de $1 + i$.","latex":true,"item_type":"numeric"}',
   '{"steps":[{"text":"$|3+4i| = \\sqrt{9+16} = 5$.","points":2},{"text":"$|1+i| = \\sqrt{2}$, $\\arg(1+i) = \\pi/4$.","points":3}],"final_answer":"Module 5 ; argument $\\pi/4$."}',
   'numeric', 2, 5, ARRAY['complexes','smb_2024','placeholder'], TRUE, NOW()),
  ('b1b2c3d4-bbbb-0000-0000-000000000003', e_smb_math_2024_n, s_definite_integral, 3,
   '{"stem":"Calculer $\\int_0^1 (3x^2 + 2) \\, dx$.","latex":true,"item_type":"numeric"}',
   '{"steps":[{"text":"Primitive : $x^3 + 2x$.","points":2},{"text":"Évaluation : $1 + 2 - 0 = 3$.","points":3}],"final_answer":"3"}',
   'numeric', 1, 5, ARRAY['integration','smb_2024','placeholder'], TRUE, NOW());

  -- ===== 2024 Rattrapage Math =====
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at) VALUES
  ('b1b2c3d4-bbbb-0000-0000-000000000004', e_smb_math_2024_r, s_deriv_apps, 1,
   '{"stem":"Étudier les variations de $f(x) = x^3 - 3x + 2$ sur $\\mathbb{R}$.","latex":true,"item_type":"multi_step"}',
   '{"steps":[{"text":"$f''(x) = 3x^2 - 3 = 3(x-1)(x+1)$.","points":3},{"text":"Tableau de signes : $+ \\, - \\, +$.","points":2},{"text":"Croissante sur $]-\\infty,-1] \\cup [1,+\\infty[$, décroissante sur $[-1,1]$.","points":3}],"final_answer":"Variations alternées avec extrema en $\\pm 1$."}',
   'multi_step', 3, 8, ARRAY['derivation','smb_2024','placeholder'], TRUE, NOW()),
  ('b1b2c3d4-bbbb-0000-0000-000000000005', e_smb_math_2024_r, s_geometric_seq, 2,
   '{"stem":"Suite géométrique $u_0 = 2$, raison $q = 1/2$. Calculer $\\sum_{k=0}^{\\infty} u_k$.","latex":true,"item_type":"numeric"}',
   '{"steps":[{"text":"Somme infinie d''une géométrique avec $|q|<1$ : $u_0/(1-q)$.","points":2},{"text":"$2/(1-1/2) = 4$.","points":3}],"final_answer":"4"}',
   'numeric', 2, 5, ARRAY['suites','smb_2024','placeholder'], TRUE, NOW()),
  ('b1b2c3d4-bbbb-0000-0000-000000000006', e_smb_math_2024_r, s_continuity, 3,
   '{"stem":"Montrer que l''équation $x^3 + x - 1 = 0$ admet une solution dans $]0, 1[$.","latex":true,"item_type":"multi_step"}',
   '{"steps":[{"text":"$f(x) = x^3 + x - 1$ continue sur $[0,1]$.","points":2},{"text":"$f(0) = -1$, $f(1) = 1$ : signes opposés.","points":2},{"text":"TVI → existence d''un $c \\in ]0,1[$ avec $f(c) = 0$.","points":3}],"final_answer":"Une solution dans $]0, 1[$."}',
   'multi_step', 3, 7, ARRAY['continuite','tvi','smb_2024','placeholder'], TRUE, NOW());

  -- ===== 2023 Normale Math =====
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at) VALUES
  ('b1b2c3d4-bbbb-0000-0000-000000000007', e_smb_math_2023_n, s_ode_first_order, 1,
   '{"stem":"Résoudre $y'' = -2y$ avec $y(0) = 3$.","latex":true,"item_type":"multi_step"}',
   '{"steps":[{"text":"Solution générale : $y(x) = K e^{-2x}$.","points":3},{"text":"$y(0) = K = 3$.","points":2},{"text":"Solution : $y(x) = 3 e^{-2x}$.","points":2}],"final_answer":"$y(x) = 3 e^{-2x}$."}',
   'multi_step', 2, 7, ARRAY['ed','smb_2023','placeholder'], TRUE, NOW()),
  ('b1b2c3d4-bbbb-0000-0000-000000000008', e_smb_math_2023_n, s_random_variables, 2,
   '{"stem":"$X$ donne le numéro tiré d''un dé équilibré. Calculer $E(X)$.","latex":true,"item_type":"numeric"}',
   '{"steps":[{"text":"$E(X) = \\sum_{k=1}^{6} k \\cdot 1/6$.","points":2},{"text":"$= 21/6 = 3{,}5$.","points":3}],"final_answer":"3,5"}',
   'numeric', 1, 5, ARRAY['probabilites','smb_2023','placeholder'], TRUE, NOW()),
  ('b1b2c3d4-bbbb-0000-0000-000000000009', e_smb_math_2023_n, s_complex_basics, 3,
   '{"stem":"Calculer $(2+i)(1-3i)$.","latex":true,"item_type":"mcq","choices":["$5 - 5i$","$-1 - 5i$","$5 + 5i$","$-1 + 5i$"],"correct_index":0}',
   '{"steps":[{"text":"$(2+i)(1-3i) = 2 - 6i + i - 3i^2 = 2 - 5i + 3 = 5 - 5i$.","points":5}],"final_answer":"$5 - 5i$ (réponse A)"}',
   'mcq', 2, 5, ARRAY['complexes','smb_2023','placeholder'], TRUE, NOW());

  -- ===== 2023 Rattrapage Math =====
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at) VALUES
  ('b1b2c3d4-bbbb-0000-0000-000000000010', e_smb_math_2023_r, s_definite_integral, 1,
   '{"stem":"Calculer l''aire entre $y = x$ et $y = x^2$ entre 0 et 1.","latex":true,"item_type":"numeric"}',
   '{"steps":[{"text":"Sur $[0,1]$, $x \\ge x^2$.","points":1},{"text":"$\\mathcal{A} = \\int_0^1 (x - x^2) \\, dx$.","points":2},{"text":"$= [x^2/2 - x^3/3]_0^1 = 1/6$.","points":3}],"final_answer":"$1/6$"}',
   'numeric', 3, 6, ARRAY['integration','smb_2023','placeholder'], TRUE, NOW()),
  ('b1b2c3d4-bbbb-0000-0000-000000000011', e_smb_math_2023_r, s_seq_recursive, 2,
   '{"stem":"Soit $u_{n+1} = (u_n + 3)/2$, $u_0 = 0$. La suite est-elle convergente ? Si oui, vers quoi ?","latex":true,"item_type":"multi_step"}',
   '{"steps":[{"text":"$f(x) = (x+3)/2$ est continue.","points":1},{"text":"Point fixe : $\\ell = (\\ell+3)/2 \\Rightarrow \\ell = 3$.","points":2},{"text":"Croissante et majorée par 3 → converge vers 3.","points":3}],"final_answer":"Converge vers 3."}',
   'multi_step', 3, 6, ARRAY['suites','smb_2023','placeholder'], TRUE, NOW()),
  ('b1b2c3d4-bbbb-0000-0000-000000000012', e_smb_math_2023_r, s_deriv_apps, 3,
   '{"stem":"Équation de la tangente à $y = x^3$ en $x = 2$.","latex":true,"item_type":"mcq","choices":["$y = 12x - 16$","$y = 6x$","$y = 12x$","$y = 8x$"],"correct_index":0}',
   '{"steps":[{"text":"$f(2) = 8$, $f''(x) = 3x^2$, $f''(2) = 12$.","points":3},{"text":"$y = 12(x-2) + 8 = 12x - 16$.","points":3}],"final_answer":"$y = 12x - 16$ (réponse A)"}',
   'mcq', 2, 6, ARRAY['derivation','smb_2023','placeholder'], TRUE, NOW());

  -- ===== 2024 Normale Physique-Chimie =====
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at) VALUES
  ('b1b2c3d4-bbbb-0000-0000-000000000013', e_smb_pc_2024_n, s_newtons_laws, 1,
   '{"stem":"Un solide de masse $m = 5$ kg glisse sur un plan incliné à 30° sans frottement. Calculer son accélération ($g = 10$ m/s²).","latex":true,"item_type":"numeric"}',
   '{"steps":[{"text":"PFD selon l''axe du plan : $mg \\sin\\alpha = ma$.","points":3},{"text":"$a = g \\sin 30° = 10 \\cdot 0{,}5 = 5$ m/s².","points":2}],"final_answer":"5 m/s²"}',
   'numeric', 2, 5, ARRAY['mecanique','newton','smb_2024','placeholder'], TRUE, NOW()),
  ('b1b2c3d4-bbbb-0000-0000-000000000014', e_smb_pc_2024_n, s_rc_rl_circuits, 2,
   '{"stem":"Un condensateur de $C = 10$ µF est chargé à travers une résistance $R = 1$ kΩ par une source de $E = 12$ V. Quelle est la tension à $t = \\tau$ ?","latex":true,"item_type":"numeric"}',
   '{"steps":[{"text":"$\\tau = RC = 10$ ms.","points":2},{"text":"$u_C(\\tau) = E(1 - e^{-1}) \\approx 12 \\cdot 0{,}632 \\approx 7{,}59$ V.","points":3}],"final_answer":"≈ 7,59 V"}',
   'numeric', 2, 6, ARRAY['rc','smb_2024','placeholder'], TRUE, NOW()),
  ('b1b2c3d4-bbbb-0000-0000-000000000015', e_smb_pc_2024_n, s_acid_base, 3,
   '{"stem":"Calculer le pH d''une solution avec $[H_3O^+] = 2 \\times 10^{-3}$ mol/L.","latex":true,"item_type":"numeric"}',
   '{"steps":[{"text":"$pH = -\\log(2 \\times 10^{-3})$.","points":2},{"text":"$= 3 - \\log 2 \\approx 2{,}70$.","points":3}],"final_answer":"≈ 2,70"}',
   'numeric', 2, 5, ARRAY['chimie','ph','smb_2024','placeholder'], TRUE, NOW());

  -- ===== 2024 Rattrapage Physique-Chimie =====
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at) VALUES
  ('b1b2c3d4-bbbb-0000-0000-000000000016', e_smb_pc_2024_r, s_rlc_oscillations, 1,
   '{"stem":"Circuit RLC libre : $L = 0{,}1$ H, $C = 10$ µF. Calculer la période propre $T_0$.","latex":true,"item_type":"numeric"}',
   '{"steps":[{"text":"$T_0 = 2\\pi \\sqrt{LC}$.","points":2},{"text":"$= 2\\pi \\sqrt{10^{-6}} \\approx 6{,}28 \\times 10^{-3}$ s = 6,28 ms.","points":3}],"final_answer":"≈ 6,28 ms"}',
   'numeric', 2, 5, ARRAY['rlc','smb_2024','placeholder'], TRUE, NOW()),
  ('b1b2c3d4-bbbb-0000-0000-000000000017', e_smb_pc_2024_r, s_redox, 2,
   '{"stem":"Pile Daniell : $E^\\circ(Cu^{2+}/Cu) = 0{,}34$ V, $E^\\circ(Zn^{2+}/Zn) = -0{,}76$ V. Calculer la fem standard.","latex":true,"item_type":"numeric"}',
   '{"steps":[{"text":"$\\Delta E^\\circ = E^\\circ_{cathode} - E^\\circ_{anode}$.","points":2},{"text":"$= 0{,}34 - (-0{,}76) = 1{,}10$ V.","points":3}],"final_answer":"1,10 V"}',
   'numeric', 2, 5, ARRAY['redox','pile','smb_2024','placeholder'], TRUE, NOW()),
  ('b1b2c3d4-bbbb-0000-0000-000000000018', e_smb_pc_2024_r, s_wave_properties, 3,
   '{"stem":"Onde sonore de fréquence $f = 1000$ Hz dans l''air ($v = 340$ m/s). Quelle est la longueur d''onde ?","latex":true,"item_type":"numeric"}',
   '{"steps":[{"text":"$\\lambda = v/f$.","points":2},{"text":"$= 340/1000 = 0{,}34$ m.","points":3}],"final_answer":"0,34 m"}',
   'numeric', 1, 5, ARRAY['ondes','smb_2024','placeholder'], TRUE, NOW());

  -- ===== 2023 Normale Physique-Chimie =====
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at) VALUES
  ('b1b2c3d4-bbbb-0000-0000-000000000019', e_smb_pc_2023_n, s_energy, 1,
   '{"stem":"Un objet de masse 2 kg tombe d''une hauteur de 5 m sans frottement. Quelle est sa vitesse au sol ($g = 10$ m/s²) ?","latex":true,"item_type":"numeric"}',
   '{"steps":[{"text":"Conservation : $mgh = \\frac{1}{2}mv^2$.","points":3},{"text":"$v = \\sqrt{2gh} = \\sqrt{100} = 10$ m/s.","points":3}],"final_answer":"10 m/s"}',
   'numeric', 2, 6, ARRAY['energie','smb_2023','placeholder'], TRUE, NOW()),
  ('b1b2c3d4-bbbb-0000-0000-000000000020', e_smb_pc_2023_n, s_acid_base, 2,
   '{"stem":"Une solution a un pH de 4. Calculer $[H_3O^+]$.","latex":true,"item_type":"numeric"}',
   '{"steps":[{"text":"$[H_3O^+] = 10^{-pH} = 10^{-4}$ mol/L.","points":4}],"final_answer":"$10^{-4}$ mol/L"}',
   'numeric', 1, 4, ARRAY['ph','smb_2023','placeholder'], TRUE, NOW()),
  ('b1b2c3d4-bbbb-0000-0000-000000000021', e_smb_pc_2023_n, s_kinematics, 3,
   '{"stem":"Un mobile a un mouvement rectiligne uniformément accéléré : $v_0 = 0$, $a = 2$ m/s². Quelle est sa vitesse à $t = 5$ s ?","latex":true,"item_type":"numeric"}',
   '{"steps":[{"text":"$v(t) = v_0 + at = 0 + 2 \\cdot 5 = 10$ m/s.","points":4}],"final_answer":"10 m/s"}',
   'numeric', 1, 4, ARRAY['cinematique','smb_2023','placeholder'], TRUE, NOW());

  -- ===== 2023 Rattrapage Physique-Chimie =====
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at) VALUES
  ('b1b2c3d4-bbbb-0000-0000-000000000022', e_smb_pc_2023_r, s_newtons_laws, 1,
   '{"stem":"Quelle force est nécessaire pour donner à un mobile de 4 kg une accélération de 3 m/s² ?","latex":true,"item_type":"numeric"}',
   '{"steps":[{"text":"$F = ma = 4 \\cdot 3 = 12$ N.","points":4}],"final_answer":"12 N"}',
   'numeric', 1, 4, ARRAY['newton','smb_2023','placeholder'], TRUE, NOW()),
  ('b1b2c3d4-bbbb-0000-0000-000000000023', e_smb_pc_2023_r, s_rc_rl_circuits, 2,
   '{"stem":"Un circuit RL a $L = 0{,}5$ H et $R = 50$ Ω. Calculer la constante de temps $\\tau$.","latex":true,"item_type":"numeric"}',
   '{"steps":[{"text":"$\\tau = L/R = 0{,}5/50 = 0{,}01$ s = 10 ms.","points":4}],"final_answer":"10 ms"}',
   'numeric', 2, 5, ARRAY['rl','smb_2023','placeholder'], TRUE, NOW()),
  ('b1b2c3d4-bbbb-0000-0000-000000000024', e_smb_pc_2023_r, s_redox, 3,
   '{"stem":"La réaction $Zn \\to Zn^{2+} + 2e^-$ est une :","latex":true,"item_type":"mcq","choices":["réduction","oxydation","ni l''un ni l''autre","double réaction"],"correct_index":1}',
   '{"steps":[{"text":"Perte d''électrons = oxydation.","points":4}],"final_answer":"oxydation (réponse B)"}',
   'mcq', 1, 4, ARRAY['redox','smb_2023','placeholder'], TRUE, NOW());
END $$;

COMMIT;
