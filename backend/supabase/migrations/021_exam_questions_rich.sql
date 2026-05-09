-- Migration 021: rich exam questions for SMB papers.
BEGIN;

DO $$
DECLARE
  s_arithmetic_seq UUID;
  s_geometric_seq UUID;
  s_seq_convergence UUID;
  s_seq_recursive UUID;
  s_limit_calc UUID;
  s_continuity UUID;
  s_tvi UUID;
  s_deriv_apps UUID;
  s_deriv_rules UUID;
  s_primitives UUID;
  s_definite_integral UUID;
  s_integral_apps UUID;
  s_prob_basic UUID;
  s_conditional_prob UUID;
  s_random_variables UUID;
  s_complex_basics UUID;
  s_complex_trig UUID;
  s_ode_first_order UUID;
  s_kinematics UUID;
  s_newtons_laws UUID;
  s_energy UUID;
  s_wave_properties UUID;
  s_sound_light UUID;
  s_rc_rl_circuits UUID;
  s_rlc_oscillations UUID;
  s_acid_base UUID;
  s_redox UUID;
BEGIN
  SELECT id INTO s_arithmetic_seq FROM public.skills WHERE code = 'arithmetic_seq' LIMIT 1;
  SELECT id INTO s_geometric_seq FROM public.skills WHERE code = 'geometric_seq' LIMIT 1;
  SELECT id INTO s_seq_convergence FROM public.skills WHERE code = 'seq_convergence' LIMIT 1;
  SELECT id INTO s_seq_recursive FROM public.skills WHERE code = 'seq_recursive' LIMIT 1;
  SELECT id INTO s_limit_calc FROM public.skills WHERE code = 'limit_calc' LIMIT 1;
  SELECT id INTO s_continuity FROM public.skills WHERE code = 'continuity' LIMIT 1;
  SELECT id INTO s_tvi FROM public.skills WHERE code = 'tvi' LIMIT 1;
  SELECT id INTO s_deriv_apps FROM public.skills WHERE code = 'deriv_apps' LIMIT 1;
  SELECT id INTO s_deriv_rules FROM public.skills WHERE code = 'deriv_rules' LIMIT 1;
  SELECT id INTO s_primitives FROM public.skills WHERE code = 'primitives' LIMIT 1;
  SELECT id INTO s_definite_integral FROM public.skills WHERE code = 'definite_integral' LIMIT 1;
  SELECT id INTO s_integral_apps FROM public.skills WHERE code = 'integral_apps' LIMIT 1;
  SELECT id INTO s_prob_basic FROM public.skills WHERE code = 'prob_basic' LIMIT 1;
  SELECT id INTO s_conditional_prob FROM public.skills WHERE code = 'conditional_prob' LIMIT 1;
  SELECT id INTO s_random_variables FROM public.skills WHERE code = 'random_variables' LIMIT 1;
  SELECT id INTO s_complex_basics FROM public.skills WHERE code = 'complex_basics' LIMIT 1;
  SELECT id INTO s_complex_trig FROM public.skills WHERE code = 'complex_trig' LIMIT 1;
  SELECT id INTO s_ode_first_order FROM public.skills WHERE code = 'ode_first_order' LIMIT 1;
  SELECT id INTO s_kinematics FROM public.skills WHERE code = 'kinematics' LIMIT 1;
  SELECT id INTO s_newtons_laws FROM public.skills WHERE code = 'newtons_laws' LIMIT 1;
  SELECT id INTO s_energy FROM public.skills WHERE code = 'energy' LIMIT 1;
  SELECT id INTO s_wave_properties FROM public.skills WHERE code = 'wave_properties' LIMIT 1;
  SELECT id INTO s_sound_light FROM public.skills WHERE code = 'sound_light' LIMIT 1;
  SELECT id INTO s_rc_rl_circuits FROM public.skills WHERE code = 'rc_rl_circuits' LIMIT 1;
  SELECT id INTO s_rlc_oscillations FROM public.skills WHERE code = 'rlc_oscillations' LIMIT 1;
  SELECT id INTO s_acid_base FROM public.skills WHERE code = 'acid_base' LIMIT 1;
  SELECT id INTO s_redox FROM public.skills WHERE code = 'redox' LIMIT 1;

  -- ===== SMB Math 2024 normale =====
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000001', 'a1b2c3d4-bbbb-0000-0000-000000000001', s_seq_recursive, 1, '{"stem":"Soit $(u_n)$ definie par $u_0 = 1$ et $u_{n+1} = \\dfrac{u_n + 3}{2}$. Etudier la convergence et calculer la limite.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"**Stabilite.** Par recurrence, $(u_n) \\in [0, 3]$ pour tout $n$.","points":2,"widget_slug":"recurrence_solver","widget_config":{"function":"(x + 3) / 2","u0":1.0,"iterations":8}},{"text":"**Monotonie.** $u_1 = 2 > u_0 = 1$. Si $u_n \\le u_{n+1}$ alors $f(u_n) \\le f(u_{n+1})$ : croissante.","points":2,"tip":"On le prouve par recurrence."},{"text":"**Convergence.** Croissante et majoree par 3, donc converge.","points":2},{"text":"**Limite.** $\\ell = \\dfrac{\\ell + 3}{2} \\Leftrightarrow \\ell = 3$.","points":2,"mistake":"Oublier la continuite de f pour passer a la limite."}],"final_answer":"$(u_n)$ converge vers $\\ell = 3$.","grading_notes":"Stabilite (2) + monotonie (2) + theoreme (2) + point fixe (2)."}'::jsonb, 'multi_step', 3, 8, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000002', 'a1b2c3d4-bbbb-0000-0000-000000000001', s_limit_calc, 2, '{"stem":"$\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{2x^2 + 3x - 1}{x^2 - 4} = ?$","correct_value":2,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"Forme indeterminee $\\dfrac{\\infty}{\\infty}$.","points":1},{"text":"Diviser par $x^2$ : $\\dfrac{2 + 3/x - 1/x^2}{1 - 4/x^2}$.","points":2},{"text":"Limite $= 2$.","points":2}],"final_answer":"2"}'::jsonb, 'numeric', 2, 5, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000003', 'a1b2c3d4-bbbb-0000-0000-000000000001', s_definite_integral, 3, '{"stem":"$\\displaystyle\\int_0^1 (3x^2 + 2x) \\, dx = ?$","correct_value":2,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"Primitive : $F(x) = x^3 + x^2$.","points":2},{"text":"$F(1) - F(0) = 2$.","points":2,"widget_slug":"area_curve","widget_config":{"function":"3*x*x + 2*x","a":0.0,"b":1.0}}],"final_answer":"2"}'::jsonb, 'numeric', 2, 4, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000004', 'a1b2c3d4-bbbb-0000-0000-000000000001', s_deriv_apps, 4, '{"stem":"Etudier les variations de $f(x) = x^3 - 3x^2 + 4$ sur $\\mathbb{R}$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$f''(x) = 3x^2 - 6x = 3x(x-2)$.","points":2},{"text":"Tableau de signes : positif sur $]-\\infty, 0[ \\cup ]2, +\\infty[$, negatif sur $]0, 2[$.","points":2,"widget_slug":"sign_table","widget_config":{"function":"3*x*(x-2)"}},{"text":"Croissante sur $]-\\infty, 0]$, decroissante sur $[0, 2]$, croissante sur $[2, +\\infty[$.","points":2},{"text":"Max local en $0$ : $f(0)=4$. Min local en $2$ : $f(2)=0$.","points":1}],"final_answer":"Variations alternees, extrema en 0 et 2.","common_mistakes":["Confondre signe de $f''$ et signe de $f$."]}'::jsonb, 'multi_step', 3, 7, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000005', 'a1b2c3d4-bbbb-0000-0000-000000000001', s_complex_basics, 5, '{"stem":"Module de $z = 1 + i\\sqrt{3}$ ?","choices":["1","$\\sqrt{3}$","2","4"],"correct_index":2,"latex":true,"item_type":"mcq"}'::jsonb, '{"steps":[{"text":"$|z|^2 = 1 + 3 = 4$.","points":2},{"text":"$|z| = 2$.","points":1,"widget_slug":"complex_plane","widget_config":{"real":1.0,"imaginary":1.732}}],"final_answer":"C - 2"}'::jsonb, 'mcq', 1, 3, ARRAY['rich_solution','mcq','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000006', 'a1b2c3d4-bbbb-0000-0000-000000000001', s_continuity, 6, '{"stem":"Resoudre $\\sqrt{2x+1} = x - 1$ dans $\\mathbb{R}$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"Conditions : $x \\ge 1$.","points":2,"mistake":"Oublier $x - 1 \\ge 0$ avant le carre."},{"text":"Au carre : $2x + 1 = x^2 - 2x + 1$.","points":2},{"text":"$x^2 - 4x = 0 \\Leftrightarrow x = 0$ ou $x = 4$.","points":2},{"text":"$x = 0$ rejete. $x = 4$ verifie.","points":2}],"final_answer":"$x = 4$"}'::jsonb, 'multi_step', 3, 8, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000007', 'a1b2c3d4-bbbb-0000-0000-000000000001', s_ode_first_order, 7, '{"stem":"Resoudre $y'' = -2y$, $y(0) = 5$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$y(x) = K e^{-2x}$.","points":2},{"text":"$K = 5$.","points":1},{"text":"$y(x) = 5 e^{-2x}$.","points":2,"widget_slug":"diff_eq_solver","widget_config":{"a":-2.0,"b":0.0,"y0":5.0}}],"final_answer":"$y(x) = 5 e^{-2x}$"}'::jsonb, 'multi_step', 2, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000008', 'a1b2c3d4-bbbb-0000-0000-000000000001', s_conditional_prob, 8, '{"stem":"Urne 4R + 6N. Tirage 2 sans remise. P(2 R) ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$P(R_1) = 4/10 = 2/5$.","points":1},{"text":"$P(R_2 | R_1) = 3/9 = 1/3$.","points":2},{"text":"$P = \\dfrac{2}{15}$.","points":2}],"final_answer":"$\\dfrac{2}{15}$"}'::jsonb, 'multi_step', 2, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000009', 'a1b2c3d4-bbbb-0000-0000-000000000001', s_geometric_seq, 9, '{"stem":"$S = 1 + 2 + 4 + ... + 2^{10} = ?$","correct_value":2047,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"Geometrique $q = 2$, 11 termes.","points":1},{"text":"$S = \\dfrac{1 - 2^{11}}{1 - 2} = 2047$.","points":3}],"final_answer":"2047"}'::jsonb, 'numeric', 2, 4, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000000a', 'a1b2c3d4-bbbb-0000-0000-000000000001', s_tvi, 10, '{"stem":"Montrer que $f(x) = x^3 + x - 5$ s''annule exactement une fois sur $\\mathbb{R}$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$f$ continue.","points":1},{"text":"$f''(x) = 3x^2 + 1 > 0$ : strictement croissante.","points":2},{"text":"$f(1) = -3$, $f(2) = 5$. Par TVI, annulation sur $]1, 2[$.","points":2},{"text":"Unicite par stricte croissance.","points":2}],"final_answer":"Une seule racine, dans $]1, 2[$."}'::jsonb, 'multi_step', 3, 7, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;

  -- ===== SMB Math 2024 rattrapage =====
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000000b', 'a1b2c3d4-bbbb-0000-0000-000000000002', s_limit_calc, 1, '{"stem":"$\\displaystyle\\lim_{x \\to 0} \\dfrac{\\sin(3x)}{x} = ?$","correct_value":3,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"Forme $0/0$. Avec $\\lim_{u \\to 0} \\dfrac{\\sin u}{u} = 1$.","points":2},{"text":"$\\dfrac{\\sin(3x)}{x} = 3 \\cdot \\dfrac{\\sin(3x)}{3x} \\to 3$.","points":2}],"final_answer":"3"}'::jsonb, 'numeric', 2, 4, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000000c', 'a1b2c3d4-bbbb-0000-0000-000000000002', s_deriv_rules, 2, '{"stem":"$f(x) = \\dfrac{x^2 - 1}{x + 2}$. $f''(x)$ et tangente en $x=1$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"Quotient : $f''(x) = \\dfrac{x^2 + 4x + 1}{(x+2)^2}$.","points":3},{"text":"$f(1) = 0$, $f''(1) = \\dfrac{2}{3}$.","points":2},{"text":"Tangente : $y = \\dfrac{2}{3}(x - 1)$.","points":2}],"final_answer":"$y = \\dfrac{2x - 2}{3}$"}'::jsonb, 'multi_step', 3, 7, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000000d', 'a1b2c3d4-bbbb-0000-0000-000000000002', s_definite_integral, 3, '{"stem":"$\\displaystyle\\int_1^e \\dfrac{\\ln x}{x} dx = ?$","correct_value":0.5,"tolerance":0.001,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"Primitive : $\\dfrac{(\\ln x)^2}{2}$.","points":3},{"text":"$\\dfrac{1}{2} - 0 = \\dfrac{1}{2}$.","points":2}],"final_answer":"$\\dfrac{1}{2}$"}'::jsonb, 'numeric', 3, 5, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000000e', 'a1b2c3d4-bbbb-0000-0000-000000000002', s_complex_trig, 4, '{"stem":"$z = e^{i\\pi/3}$. $z^6 = ?$","choices":["-1","1","$i$","0"],"correct_index":1,"latex":true,"item_type":"mcq"}'::jsonb, '{"steps":[{"text":"$z^6 = e^{i \\cdot 2\\pi} = 1$.","points":3}],"final_answer":"B - 1"}'::jsonb, 'mcq', 2, 3, ARRAY['rich_solution','mcq','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000000f', 'a1b2c3d4-bbbb-0000-0000-000000000002', s_random_variables, 5, '{"stem":"$X \\in \\{0,1,2\\}$ avec $P(0)=0{,}3$, $P(1)=0{,}5$, $P(2)=0{,}2$. $E(X)$ et $V(X)$ ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$E(X) = 0{,}9$.","points":2},{"text":"$E(X^2) = 1{,}3$.","points":2},{"text":"$V(X) = 1{,}3 - 0{,}81 = 0{,}49$.","points":2}],"final_answer":"$E(X) = 0{,}9$, $V(X) = 0{,}49$."}'::jsonb, 'multi_step', 2, 6, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000010', 'a1b2c3d4-bbbb-0000-0000-000000000002', s_arithmetic_seq, 6, '{"stem":"$(u_n)$ arithmetique, $u_0 = 5$, $r = 3$. $u_{20}$ et $S_{20}$ ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$u_{20} = 5 + 60 = 65$.","points":2},{"text":"$S_{20} = 21 \\cdot \\dfrac{5 + 65}{2} = 735$.","points":3}],"final_answer":"$u_{20} = 65$, $S_{20} = 735$."}'::jsonb, 'multi_step', 1, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000011', 'a1b2c3d4-bbbb-0000-0000-000000000002', s_tvi, 7, '{"stem":"$f$ continue sur $[0,4]$, $f(0) = -3$, $f(4) = 5$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"Par TVI, $\\exists c \\in ]0,4[$ tel que $f(c) = 0$.","points":3},{"text":"Pour tout $k \\in [-3, 5]$, idem.","points":2}],"final_answer":"$f$ s''annule au moins une fois."}'::jsonb, 'multi_step', 1, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000012', 'a1b2c3d4-bbbb-0000-0000-000000000002', s_primitives, 8, '{"stem":"$f''(x) = 6x - 4$, $f(0) = 2$. $f(3) = ?$","correct_value":17,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"$F(x) = 3x^2 - 4x + C$, $C = 2$.","points":2},{"text":"$f(3) = 27 - 12 + 2 = 17$.","points":2}],"final_answer":"17"}'::jsonb, 'numeric', 2, 4, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000013', 'a1b2c3d4-bbbb-0000-0000-000000000002', s_ode_first_order, 9, '{"stem":"Solutions de $y'' = 3y$ ?","choices":["$3x + K$","$K e^{3x}$","$3 e^x$","$K x^3$"],"correct_index":1,"latex":true,"item_type":"mcq"}'::jsonb, '{"steps":[{"text":"$y'' = ay$ donne $y = K e^{ax}$.","points":3}],"final_answer":"B - $K e^{3x}$"}'::jsonb, 'mcq', 1, 3, ARRAY['rich_solution','mcq','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000014', 'a1b2c3d4-bbbb-0000-0000-000000000002', s_deriv_rules, 10, '{"stem":"$f(x) = (x-1)e^x$. $f''$ et son signe ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$f''(x) = x e^x$.","points":3},{"text":"Signe = signe de $x$. Min en 0 : $f(0) = -1$.","points":3}],"final_answer":"$f''(x) = x e^x$, min en 0."}'::jsonb, 'multi_step', 2, 6, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;

  -- ===== SMB Math 2023 normale =====
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000015', 'a1b2c3d4-bbbb-0000-0000-000000000003', s_geometric_seq, 1, '{"stem":"$(v_n)$ geometrique, $v_0 = 100$, $q = 0{,}9$. Limite et somme infinie.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$v_n \\to 0$ car $|q| < 1$.","points":2},{"text":"$S = \\dfrac{100}{0{,}1} = 1000$.","points":3}],"final_answer":"Limite 0, somme 1000."}'::jsonb, 'multi_step', 2, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000016', 'a1b2c3d4-bbbb-0000-0000-000000000003', s_limit_calc, 2, '{"stem":"$\\displaystyle\\lim_{x \\to 1} \\dfrac{x^3 - 1}{x - 1} = ?$","correct_value":3,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"$x^3 - 1 = (x-1)(x^2+x+1)$.","points":2},{"text":"Limite = 3.","points":2}],"final_answer":"3"}'::jsonb, 'numeric', 2, 4, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000017', 'a1b2c3d4-bbbb-0000-0000-000000000003', s_deriv_rules, 3, '{"stem":"$f(x) = \\ln(x^2 + 1)$. $f''(x)$ et $\\int_0^1 f''(x) dx$ ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$f''(x) = \\dfrac{2x}{x^2+1}$.","points":2},{"text":"$\\int_0^1 f'' = f(1) - f(0) = \\ln 2$.","points":3}],"final_answer":"$\\ln 2$"}'::jsonb, 'multi_step', 2, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000018', 'a1b2c3d4-bbbb-0000-0000-000000000003', s_complex_basics, 4, '{"stem":"$z_1 = 1+i$, $z_2 = 1-i$. $z_1 z_2$, $z_1 + z_2$, $|z_1|$ ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$z_1 z_2 = 1 - i^2 = 2$.","points":2},{"text":"$z_1 + z_2 = 2$.","points":1},{"text":"$|z_1| = \\sqrt{2}$.","points":2}],"final_answer":"$z_1 z_2 = 2$, $|z_1| = \\sqrt{2}$."}'::jsonb, 'multi_step', 1, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000019', 'a1b2c3d4-bbbb-0000-0000-000000000003', s_prob_basic, 5, '{"stem":"2 des. P(somme = 7) ?","correct_value":0.1667,"tolerance":0.001,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"6 issues favorables sur 36.","points":2},{"text":"$P = 1/6$.","points":2}],"final_answer":"$1/6$"}'::jsonb, 'numeric', 2, 4, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000001a', 'a1b2c3d4-bbbb-0000-0000-000000000003', s_integral_apps, 6, '{"stem":"$\\int_1^2 \\dfrac{1}{x} dx$ et interpretation.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$\\int_1^2 \\dfrac{1}{x} dx = \\ln 2$.","points":3,"widget_slug":"area_curve","widget_config":{"function":"1/x","a":1.0,"b":2.0}},{"text":"Aire entre $y = 1/x$ et l''axe Ox sur $[1, 2]$.","points":2}],"final_answer":"$\\ln 2$"}'::jsonb, 'multi_step', 2, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000001b', 'a1b2c3d4-bbbb-0000-0000-000000000003', s_ode_first_order, 7, '{"stem":"Resoudre $y'''' + 4y = 0$, $y(0) = 1$, $y''(0) = 0$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$y = A\\cos(2x) + B\\sin(2x)$.","points":2},{"text":"$y(0) = A = 1$, $y''(0) = 2B = 0$.","points":3},{"text":"$y(x) = \\cos(2x)$.","points":2}],"final_answer":"$\\cos(2x)$"}'::jsonb, 'multi_step', 3, 7, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000001c', 'a1b2c3d4-bbbb-0000-0000-000000000003', s_primitives, 8, '{"stem":"Une primitive de $\\sin(2x)$ ?","choices":["$\\cos(2x)$","$-\\cos(2x)$","$-\\dfrac{\\cos(2x)}{2}$","$\\dfrac{\\cos(2x)}{2}$"],"correct_index":2,"latex":true,"item_type":"mcq"}'::jsonb, '{"steps":[{"text":"$-\\dfrac{\\cos(2x)}{2} + C$.","points":3}],"final_answer":"C - $-\\dfrac{\\cos(2x)}{2}$"}'::jsonb, 'mcq', 2, 3, ARRAY['rich_solution','mcq','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000001d', 'a1b2c3d4-bbbb-0000-0000-000000000003', s_seq_convergence, 9, '{"stem":"$(u_n)$ croissante, majoree par 5.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"Theoreme de la limite monotone : converge.","points":2},{"text":"Limite $\\ell \\le 5$.","points":2}],"final_answer":"Converge vers $\\ell \\le 5$."}'::jsonb, 'multi_step', 1, 4, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000001e', 'a1b2c3d4-bbbb-0000-0000-000000000003', s_arithmetic_seq, 10, '{"stem":"PGCD(84, 60) par Euclide et Bezout.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$84 = 60 + 24$, $60 = 2 \\cdot 24 + 12$, $24 = 2 \\cdot 12$. PGCD = 12.","points":3,"widget_slug":"euclid_visualizer","widget_config":{"a":84,"b":60}},{"text":"$12 = 60 \\cdot 3 - 84 \\cdot 2$.","points":3}],"final_answer":"PGCD = 12, Bezout : $84(-2) + 60(3) = 12$."}'::jsonb, 'multi_step', 4, 6, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;

  -- ===== SMB Math 2023 rattrapage =====
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000001f', 'a1b2c3d4-bbbb-0000-0000-000000000004', s_limit_calc, 1, '{"stem":"$\\lim_{x \\to +\\infty} \\dfrac{e^x - 1}{e^x + 1} = ?$","correct_value":1,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"Diviser par $e^x$ : $\\dfrac{1 - e^{-x}}{1 + e^{-x}}$.","points":2},{"text":"Limite = 1.","points":1}],"final_answer":"1"}'::jsonb, 'numeric', 2, 3, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000020', 'a1b2c3d4-bbbb-0000-0000-000000000004', s_deriv_apps, 2, '{"stem":"$f(x) = x e^{-x}$. Etude.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$f''(x) = (1 - x)e^{-x}$.","points":2},{"text":"Max en $x = 1$, $f(1) = 1/e$.","points":2},{"text":"$f(-\\infty) = -\\infty$, $f(+\\infty) = 0$.","points":2}],"final_answer":"Max en 1, asymptote $y=0$."}'::jsonb, 'multi_step', 3, 6, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000021', 'a1b2c3d4-bbbb-0000-0000-000000000004', s_definite_integral, 3, '{"stem":"$\\int_0^{\\pi/2} \\cos x \\, dx = ?$","correct_value":1,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"$[\\sin x]_0^{\\pi/2} = 1$.","points":3}],"final_answer":"1"}'::jsonb, 'numeric', 1, 3, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000022', 'a1b2c3d4-bbbb-0000-0000-000000000004', s_complex_basics, 4, '{"stem":"$z = \\dfrac{1+i}{1-i}$. Forme algebrique ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"Multiplier par $\\dfrac{1+i}{1+i}$ : $z = \\dfrac{(1+i)^2}{2} = \\dfrac{2i}{2} = i$.","points":4}],"final_answer":"$z = i$"}'::jsonb, 'multi_step', 2, 4, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000023', 'a1b2c3d4-bbbb-0000-0000-000000000004', s_conditional_prob, 5, '{"stem":"$A, B$ independants, $P(A) = 0{,}4$, $P(B) = 0{,}3$. $P(A \\cap B) = ?$","choices":["0,7","0,12","0,1","0"],"correct_index":1,"latex":true,"item_type":"mcq"}'::jsonb, '{"steps":[{"text":"$P(A \\cap B) = 0{,}4 \\cdot 0{,}3 = 0{,}12$.","points":3}],"final_answer":"B - 0,12"}'::jsonb, 'mcq', 1, 3, ARRAY['rich_solution','mcq','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000024', 'a1b2c3d4-bbbb-0000-0000-000000000004', s_geometric_seq, 6, '{"stem":"$1 + 1/2 + 1/4 + ... = ?$","correct_value":2,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"$S = \\dfrac{1}{1 - 1/2} = 2$.","points":3}],"final_answer":"2"}'::jsonb, 'numeric', 1, 3, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000025', 'a1b2c3d4-bbbb-0000-0000-000000000004', s_deriv_apps, 7, '{"stem":"$f(x) = x^4 - 4x^3$. Points d''inflexion ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$f''''(x) = 12x(x - 2)$.","points":2},{"text":"Changements en 0 et 2. Inflexions : $(0, 0)$ et $(2, -16)$.","points":4}],"final_answer":"$(0, 0)$ et $(2, -16)$."}'::jsonb, 'multi_step', 3, 6, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000026', 'a1b2c3d4-bbbb-0000-0000-000000000004', s_ode_first_order, 8, '{"stem":"$y'' + 3y = 6$, $y(0) = 0$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$y = K e^{-3x} + 2$.","points":2},{"text":"$K = -2$, $y = 2(1 - e^{-3x})$.","points":3}],"final_answer":"$y = 2(1 - e^{-3x})$"}'::jsonb, 'multi_step', 2, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000027', 'a1b2c3d4-bbbb-0000-0000-000000000004', s_complex_basics, 9, '{"stem":"$|3 - 4i|^2 = ?$","correct_value":25,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"$9 + 16 = 25$.","points":2}],"final_answer":"25"}'::jsonb, 'numeric', 1, 2, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000028', 'a1b2c3d4-bbbb-0000-0000-000000000004', s_seq_convergence, 10, '{"stem":"$u_n = \\dfrac{2n+1}{n+1}$. Limite et monotonie.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$u_n = 2 - \\dfrac{1}{n+1} \\to 2$.","points":3},{"text":"Croissante.","points":3}],"final_answer":"Croissante, limite 2."}'::jsonb, 'multi_step', 2, 6, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;

  -- ===== SMB PC 2024 normale =====
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000029', 'a1b2c3d4-bbbb-0000-0000-000000000005', s_kinematics, 1, '{"stem":"Projectile : $v_0 = 20$ m/s, $30°$, $g = 10$. Portee et $h_{max}$ ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$v_{0x} \\approx 17{,}32$, $v_{0y} = 10$.","points":2},{"text":"$h_{max} = 5$ m.","points":3,"widget_slug":"projectile","widget_config":{"v0":20.0,"angle":30.0}},{"text":"Portee $\\approx 34{,}64$ m.","points":3}],"final_answer":"$h_{max} = 5$ m, $R \\approx 34{,}64$ m.","common_mistakes":["Oublier $T = 2 t_h$."]}'::jsonb, 'multi_step', 3, 8, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000002a', 'a1b2c3d4-bbbb-0000-0000-000000000005', s_newtons_laws, 2, '{"stem":"$F$ pour $a = 2{,}5$ m/s² sur $m = 4$ kg ?","correct_value":10,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"$F = ma = 10$ N.","points":3}],"final_answer":"10"}'::jsonb, 'numeric', 1, 3, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000002b', 'a1b2c3d4-bbbb-0000-0000-000000000005', s_rc_rl_circuits, 3, '{"stem":"Condensateur 100 µF, $R = 10$ kΩ, $E = 12$ V. $\\tau$ et $u_C(\\tau)$ ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$\\tau = 1$ s.","points":2},{"text":"$u_C(\\tau) \\approx 7{,}59$ V.","points":3,"widget_slug":"capacitor_charge","widget_config":{"R":10000.0,"C":0.0001,"E":12.0}},{"text":"99% a $5\\tau = 5$ s.","points":2}],"final_answer":"$\\tau = 1$ s, $u_C(\\tau) \\approx 7{,}59$ V."}'::jsonb, 'multi_step', 3, 7, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000002c', 'a1b2c3d4-bbbb-0000-0000-000000000005', s_wave_properties, 4, '{"stem":"Onde $f = 500$ Hz, $v = 340$ m/s. $\\lambda$ ?","correct_value":0.68,"tolerance":0.005,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"$\\lambda = v/f = 0{,}68$ m.","points":3}],"final_answer":"0.68"}'::jsonb, 'numeric', 1, 3, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000002d', 'a1b2c3d4-bbbb-0000-0000-000000000005', s_acid_base, 5, '{"stem":"Titrage 20 mL HCl par NaOH 0,1 mol/L. $V_E = 15$ mL. $C_a$ ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$n(HCl) = n(NaOH)$ a l''equivalence.","points":1},{"text":"$C_a = 0{,}075$ mol/L.","points":3,"widget_slug":"titration_simulator","widget_config":{"cAcid":0.075,"cBase":0.1,"vAcid":20.0}}],"final_answer":"$C_a = 0{,}075$ mol/L"}'::jsonb, 'multi_step', 2, 4, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000002e', 'a1b2c3d4-bbbb-0000-0000-000000000005', s_energy, 6, '{"stem":"Bille 0,5 kg lachee de $h = 2$ m, $g = 10$. Vitesse au sol ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$\\dfrac{1}{2}mv^2 = mgh$.","points":2},{"text":"$v = \\sqrt{40} \\approx 6{,}32$ m/s.","points":3}],"final_answer":"$v \\approx 6{,}32$ m/s"}'::jsonb, 'multi_step', 2, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000002f', 'a1b2c3d4-bbbb-0000-0000-000000000005', s_acid_base, 7, '{"stem":"pH pour $[H_3O^+] = 5 \\cdot 10^{-3}$ ?","correct_value":2.3,"tolerance":0.05,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"$pH = -\\log(5 \\cdot 10^{-3}) \\approx 2{,}3$.","points":3}],"final_answer":"2.3"}'::jsonb, 'numeric', 1, 3, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000030', 'a1b2c3d4-bbbb-0000-0000-000000000005', s_redox, 8, '{"stem":"Anode pile Daniell ?","choices":["$Cu^{2+} + 2e^- \\to Cu$","$Zn \\to Zn^{2+} + 2e^-$","$Zn^{2+} + 2e^- \\to Zn$","$Cu \\to Cu^{2+} + 2e^-$"],"correct_index":1,"latex":true,"item_type":"mcq"}'::jsonb, '{"steps":[{"text":"Anode = oxydation.","points":1},{"text":"$Zn \\to Zn^{2+} + 2e^-$.","points":2,"widget_slug":"daniell_cell","widget_config":{}}],"final_answer":"B - $Zn \\to Zn^{2+} + 2e^-$"}'::jsonb, 'mcq', 2, 3, ARRAY['rich_solution','mcq','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000031', 'a1b2c3d4-bbbb-0000-0000-000000000005', s_rlc_oscillations, 9, '{"stem":"RLC : $L = 0{,}5$ H, $C = 50$ µF, $R = 20$ Ω. $T_0$ et regime ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$T_0 = 2\\pi\\sqrt{LC} \\approx 31{,}4$ ms.","points":3,"widget_slug":"rlc","widget_config":{"R":20.0,"L":0.5,"C":0.00005}},{"text":"$R_c = 200$ Ω, $R < R_c$ : pseudo-periodique.","points":3}],"final_answer":"$T_0 \\approx 31{,}4$ ms, pseudo-periodique."}'::jsonb, 'multi_step', 3, 6, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000032', 'a1b2c3d4-bbbb-0000-0000-000000000005', s_sound_light, 10, '{"stem":"Rayon a 45° air vers eau ($n = 1{,}33$). $i_2$ ?","correct_value":32.1,"tolerance":0.5,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"Snell : $\\sin i_2 = \\sin 45 / 1{,}33 \\approx 0{,}532$.","points":2},{"text":"$i_2 \\approx 32{,}1°$.","points":2,"widget_slug":"refraction_simulator","widget_config":{"n1":1.0,"n2":1.33,"angle":45.0}}],"final_answer":"32.1"}'::jsonb, 'numeric', 2, 4, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;

  -- ===== SMB PC 2024 rattrapage =====
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000033', 'a1b2c3d4-bbbb-0000-0000-000000000006', s_newtons_laws, 1, '{"stem":"Solide 3 kg sur plan a 25°, $\\mu = 0{,}2$. $a$ ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"PFD : $a = g(\\sin\\alpha - \\mu\\cos\\alpha)$.","points":2},{"text":"$a \\approx 2{,}41$ m/s².","points":4,"widget_slug":"force_diagram","widget_config":{"mass":3.0,"angle":25.0,"friction":0.2}}],"final_answer":"$\\approx 2{,}41$ m/s²"}'::jsonb, 'multi_step', 3, 6, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000034', 'a1b2c3d4-bbbb-0000-0000-000000000006', s_wave_properties, 2, '{"stem":"$T_{1/2} = 5$ ans. Apres 15 ans, fraction restante ?","correct_value":0.125,"tolerance":0.001,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"$15 / 5 = 3$ demi-vies, $1/8$.","points":3}],"final_answer":"0.125"}'::jsonb, 'numeric', 2, 3, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000035', 'a1b2c3d4-bbbb-0000-0000-000000000006', s_rlc_oscillations, 3, '{"stem":"$L = 1$ H, $C = 10$ µF. $f_0$ ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}} \\approx 50{,}3$ Hz.","points":4}],"final_answer":"$\\approx 50{,}3$ Hz"}'::jsonb, 'multi_step', 2, 4, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000036', 'a1b2c3d4-bbbb-0000-0000-000000000006', s_newtons_laws, 4, '{"stem":"Fil 50 cm, $I = 2$ A, $B = 0{,}3$ T perpendiculaire. Force ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$F = BIL = 0{,}3$ N.","points":3,"widget_slug":"b_field_uniform","widget_config":{"B":0.3,"I":2.0}}],"final_answer":"$0{,}3$ N"}'::jsonb, 'multi_step', 2, 3, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000037', 'a1b2c3d4-bbbb-0000-0000-000000000006', s_redox, 5, '{"stem":"Augmenter le rendement d''esterification ?","choices":["Catalyseur","Diminuer T","Eliminer l''eau","Diluer"],"correct_index":2,"latex":true,"item_type":"mcq"}'::jsonb, '{"steps":[{"text":"Catalyseur : vitesse seulement.","points":1},{"text":"Eliminer l''eau deplace l''equilibre.","points":2,"widget_slug":"esterification_animator","widget_config":{}}],"final_answer":"C - Eliminer l''eau"}'::jsonb, 'mcq', 2, 3, ARRAY['rich_solution','mcq','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000038', 'a1b2c3d4-bbbb-0000-0000-000000000006', s_acid_base, 6, '{"stem":"$[H_3O^+]$ pour pH = 5,3 ?","correct_value":0.000005,"tolerance":1e-7,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"$[H_3O^+] = 10^{-5{,}3} \\approx 5 \\cdot 10^{-6}$ mol/L.","points":3}],"final_answer":"0.000005"}'::jsonb, 'numeric', 2, 3, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000039', 'a1b2c3d4-bbbb-0000-0000-000000000006', s_energy, 7, '{"stem":"Pendule $T = 2$ s, $g = 9{,}81$. $L$ ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$L = \\dfrac{g T^2}{4\\pi^2} \\approx 0{,}994$ m.","points":3,"widget_slug":"pendulum_lab","widget_config":{"length":1.0}}],"final_answer":"$\\approx 0{,}994$ m"}'::jsonb, 'multi_step', 2, 3, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000003a', 'a1b2c3d4-bbbb-0000-0000-000000000006', s_wave_properties, 8, '{"stem":"Onde $f = 50$ Hz, $v = 200$ m/s. $\\lambda$ ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$\\lambda = 4$ m.","points":3,"widget_slug":"wave","widget_config":{"frequency":50.0,"velocity":200.0}}],"final_answer":"$\\lambda = 4$ m"}'::jsonb, 'multi_step', 2, 3, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000003b', 'a1b2c3d4-bbbb-0000-0000-000000000006', s_rc_rl_circuits, 9, '{"stem":"$L = 200$ mH, $R = 50$ Ω. $\\tau$ ?","correct_value":0.004,"tolerance":0.0001,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"$\\tau = L/R = 4$ ms.","points":3}],"final_answer":"0.004"}'::jsonb, 'numeric', 1, 3, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000003c', 'a1b2c3d4-bbbb-0000-0000-000000000006', s_redox, 10, '{"stem":"$Q_r > K$ : evolution ?","choices":["sens direct","equilibre","sens inverse","oscille"],"correct_index":2,"latex":true,"item_type":"mcq"}'::jsonb, '{"steps":[{"text":"Pour baisser $Q_r$ vers $K$ : sens inverse.","points":2,"widget_slug":"equilibrium_qr_k","widget_config":{}}],"final_answer":"C - sens inverse"}'::jsonb, 'mcq', 2, 2, ARRAY['rich_solution','mcq','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;

  -- ===== SMB PC 2023 normale =====
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000003d', 'a1b2c3d4-bbbb-0000-0000-000000000007', s_kinematics, 1, '{"stem":"Mobile 5 kg, repos, $a = 3$ m/s². Distance en 4 s ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$x = \\dfrac{1}{2}at^2 = 24$ m.","points":3}],"final_answer":"$24$ m"}'::jsonb, 'multi_step', 1, 3, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000003e', 'a1b2c3d4-bbbb-0000-0000-000000000007', s_kinematics, 2, '{"stem":"Vitesse a $t = 4$ s ?","correct_value":12,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"$v = at = 12$ m/s.","points":2}],"final_answer":"12"}'::jsonb, 'numeric', 1, 2, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000003f', 'a1b2c3d4-bbbb-0000-0000-000000000007', s_energy, 3, '{"stem":"Force 10 N sur 2 kg sur 5 m. $\\Delta E_c$ ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$W = F \\cdot d = 50$ J.","points":2},{"text":"Theoreme de l''energie cinetique : $\\Delta E_c = 50$ J.","points":2}],"final_answer":"$50$ J"}'::jsonb, 'multi_step', 2, 4, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000040', 'a1b2c3d4-bbbb-0000-0000-000000000007', s_rc_rl_circuits, 4, '{"stem":"Condensateur 220 µF a 20 V. Energie ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$E = \\dfrac{1}{2}CU^2 = 0{,}044$ J = 44 mJ.","points":3}],"final_answer":"$44$ mJ"}'::jsonb, 'multi_step', 2, 3, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000041', 'a1b2c3d4-bbbb-0000-0000-000000000007', s_acid_base, 5, '{"stem":"Solution diluee 10x a partir de pH=3 (acide fort). pH ?","correct_value":4,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"Dilution 10x : pH augmente de 1.","points":2,"widget_slug":"acid_base_ph","widget_config":{"pH":4.0}},{"text":"pH = 4.","points":1}],"final_answer":"4"}'::jsonb, 'numeric', 2, 3, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000042', 'a1b2c3d4-bbbb-0000-0000-000000000007', s_redox, 6, '{"stem":"$K$ depend de :","choices":["concentrations","volume","temperature","pression"],"correct_index":2,"latex":true,"item_type":"mcq"}'::jsonb, '{"steps":[{"text":"K depend de T uniquement.","points":2}],"final_answer":"C - temperature"}'::jsonb, 'mcq', 1, 2, ARRAY['rich_solution','mcq','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000043', 'a1b2c3d4-bbbb-0000-0000-000000000007', s_wave_properties, 7, '{"stem":"C-14, $T_{1/2} = 5730$ ans. Reste apres 17190 ans ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"3 demi-vies, $1/8 = 12{,}5\\%$.","points":3}],"final_answer":"$12{,}5\\%$"}'::jsonb, 'multi_step', 2, 3, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000044', 'a1b2c3d4-bbbb-0000-0000-000000000007', s_redox, 8, '{"stem":"fem Daniell ?","correct_value":1.1,"tolerance":0.01,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"$\\Delta E^\\circ = 0{,}34 - (-0{,}76) = 1{,}10$ V.","points":2}],"final_answer":"1.1"}'::jsonb, 'numeric', 1, 2, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000045', 'a1b2c3d4-bbbb-0000-0000-000000000007', s_sound_light, 9, '{"stem":"Diffraction : fente 0,1 mm, $\\lambda = 600$ nm. Demi-angle ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$\\theta \\approx \\lambda/a = 6 \\cdot 10^{-3}$ rad $\\approx 0{,}34°$.","points":4}],"final_answer":"$\\approx 6$ mrad"}'::jsonb, 'multi_step', 3, 4, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000046', 'a1b2c3d4-bbbb-0000-0000-000000000007', s_redox, 10, '{"stem":"$A + B \\rightleftharpoons C$, $K = 4$, $[A]=[B]=0{,}5$. $[C]$ ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$K = [C]/([A][B]) \\Rightarrow [C] = 1$ mol/L.","points":3}],"final_answer":"$1$ mol/L"}'::jsonb, 'multi_step', 2, 3, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;

  -- ===== SMB PC 2023 rattrapage =====
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000047', 'a1b2c3d4-bbbb-0000-0000-000000000008', s_kinematics, 1, '{"stem":"Projectile vertical $v_0 = 30$ m/s, $g = 10$. $h_{max}$ ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$h_{max} = v_0^2/(2g) = 45$ m.","points":3}],"final_answer":"$45$ m"}'::jsonb, 'multi_step', 1, 3, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000048', 'a1b2c3d4-bbbb-0000-0000-000000000008', s_energy, 2, '{"stem":"Ressort $k = 200$ N/m, $m = 2$ kg. $T$ ?","correct_value":0.628,"tolerance":0.01,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"$T = 2\\pi\\sqrt{m/k} \\approx 0{,}628$ s.","points":3}],"final_answer":"0.628"}'::jsonb, 'numeric', 2, 3, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000049', 'a1b2c3d4-bbbb-0000-0000-000000000008', s_newtons_laws, 3, '{"stem":"Plaques 5 mm, $U = 100$ V. Force sur un electron ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$E = U/d = 20000$ V/m.","points":2},{"text":"$F = eE \\approx 3{,}2 \\cdot 10^{-15}$ N.","points":3,"widget_slug":"e_field_uniform","widget_config":{"voltage":100.0,"distance":0.005}}],"final_answer":"$\\approx 3{,}2 \\cdot 10^{-15}$ N"}'::jsonb, 'multi_step', 3, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000004a', 'a1b2c3d4-bbbb-0000-0000-000000000008', s_wave_properties, 4, '{"stem":"$T = 2$ ms. Frequence ?","correct_value":500,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"$f = 1/T = 500$ Hz.","points":2}],"final_answer":"500"}'::jsonb, 'numeric', 1, 2, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000004b', 'a1b2c3d4-bbbb-0000-0000-000000000008', s_rc_rl_circuits, 5, '{"stem":"Charge a 99% en :","choices":["$\\tau$","$2\\tau$","$3\\tau$","$5\\tau$"],"correct_index":3,"latex":true,"item_type":"mcq"}'::jsonb, '{"steps":[{"text":"$1 - e^{-5} \\approx 0{,}993$.","points":2}],"final_answer":"D - $5\\tau$"}'::jsonb, 'mcq', 1, 2, ARRAY['rich_solution','mcq','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000004c', 'a1b2c3d4-bbbb-0000-0000-000000000008', s_acid_base, 6, '{"stem":"NaOH 0,01 mol/L. pH ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$[OH^-] = 0{,}01$, $[H_3O^+] = 10^{-12}$.","points":2},{"text":"pH = 12.","points":2}],"final_answer":"$pH = 12$"}'::jsonb, 'multi_step', 2, 4, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000004d', 'a1b2c3d4-bbbb-0000-0000-000000000008', s_redox, 7, '{"stem":"Pile $Cu//Ag$. fem ? ($E_{Ag} = 0{,}80$, $E_{Cu} = 0{,}34$)","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$\\Delta E = 0{,}80 - 0{,}34 = 0{,}46$ V.","points":3}],"final_answer":"$0{,}46$ V"}'::jsonb, 'multi_step', 2, 3, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000004e', 'a1b2c3d4-bbbb-0000-0000-000000000008', s_rlc_oscillations, 8, '{"stem":"$L = 50$ mH, reactance 31,4 Ω. $f$ ?","correct_value":100,"tolerance":1,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"$f = X_L/(2\\pi L) \\approx 100$ Hz.","points":3}],"final_answer":"100"}'::jsonb, 'numeric', 2, 3, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-00000000004f', 'a1b2c3d4-bbbb-0000-0000-000000000008', s_redox, 9, '{"stem":"$2H_2 + O_2 \\to 2H_2O$. Oxydant ?","choices":["$H_2$","$O_2$","$H_2O$","aucun"],"correct_index":1,"latex":true,"item_type":"mcq"}'::jsonb, '{"steps":[{"text":"$O_2$ gagne des electrons.","points":2}],"final_answer":"B - $O_2$"}'::jsonb, 'mcq', 1, 2, ARRAY['rich_solution','mcq','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-eeee-0000-0000-000000000050', 'a1b2c3d4-bbbb-0000-0000-000000000008', s_wave_properties, 10, '{"stem":"Oscillation A = 5 cm, T = 0,2 s. $v_{max}$ ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$v_{max} = A \\cdot 2\\pi/T \\approx 1{,}57$ m/s.","points":3}],"final_answer":"$\\approx 1{,}57$ m/s"}'::jsonb, 'multi_step', 2, 3, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;

END $$;
COMMIT;
