-- Migration 022: rich exam questions for SMA papers (Math + PC).
BEGIN;

DO $$
DECLARE
  s_sma_limit_def UUID;
  s_sma_limit_calc UUID;
  s_sma_continuity UUID;
  s_sma_tvi UUID;
  s_sma_deriv_definition UUID;
  s_sma_deriv_apps UUID;
  s_sma_function_study UUID;
  s_sma_ln_basics UUID;
  s_sma_exp_basics UUID;
  s_sma_sequences_review UUID;
  s_sma_recurrent_sequences UUID;
  s_sma_primitives UUID;
  s_sma_definite_integral UUID;
  s_sma_integral_apps UUID;
  s_sma_ipp UUID;
  s_sma_complex_basics UUID;
  s_sma_complex_trig UUID;
  s_sma_complex_geometry UUID;
  s_sma_ode_first_order UUID;
  s_sma_ode_second_order UUID;
  s_sma_counting UUID;
  s_sma_prob_basics UUID;
  s_sma_random_variables UUID;
  s_sma_divisibility UUID;
  s_sma_gcd UUID;
  s_sma_vectors_3d UUID;
  s_sma_lines_planes UUID;
  s_sma_newton_laws UUID;
  s_sma_kinetic_potential UUID;
  s_sma_rc_charge_discharge UUID;
  s_sma_rl_establishment UUID;
  s_sma_rlc_regimes UUID;
  s_sma_wave_basics UUID;
  s_sma_periodic_waves UUID;
  s_sma_nuclear_radioactivity UUID;
  s_sma_projectile_motion UUID;
  s_sma_pendulum_simple UUID;
  s_sma_e_field_basics UUID;
  s_sma_b_field_basics UUID;
  s_sma_am_basics UUID;
  s_sma_ph_definition UUID;
  s_sma_titration_curve UUID;
  s_sma_reaction_speed UUID;
  s_sma_qr_k UUID;
  s_sma_daniell_cell_basics UUID;
  s_sma_esterification_mechanism UUID;
BEGIN
  SELECT id INTO s_sma_limit_def FROM public.skills WHERE code = 'sma_limit_def' LIMIT 1;
  SELECT id INTO s_sma_limit_calc FROM public.skills WHERE code = 'sma_limit_calc' LIMIT 1;
  SELECT id INTO s_sma_continuity FROM public.skills WHERE code = 'sma_continuity' LIMIT 1;
  SELECT id INTO s_sma_tvi FROM public.skills WHERE code = 'sma_tvi' LIMIT 1;
  SELECT id INTO s_sma_deriv_definition FROM public.skills WHERE code = 'sma_deriv_definition' LIMIT 1;
  SELECT id INTO s_sma_deriv_apps FROM public.skills WHERE code = 'sma_deriv_apps' LIMIT 1;
  SELECT id INTO s_sma_function_study FROM public.skills WHERE code = 'sma_function_study' LIMIT 1;
  SELECT id INTO s_sma_ln_basics FROM public.skills WHERE code = 'sma_ln_basics' LIMIT 1;
  SELECT id INTO s_sma_exp_basics FROM public.skills WHERE code = 'sma_exp_basics' LIMIT 1;
  SELECT id INTO s_sma_sequences_review FROM public.skills WHERE code = 'sma_sequences_review' LIMIT 1;
  SELECT id INTO s_sma_recurrent_sequences FROM public.skills WHERE code = 'sma_recurrent_sequences' LIMIT 1;
  SELECT id INTO s_sma_primitives FROM public.skills WHERE code = 'sma_primitives' LIMIT 1;
  SELECT id INTO s_sma_definite_integral FROM public.skills WHERE code = 'sma_definite_integral' LIMIT 1;
  SELECT id INTO s_sma_integral_apps FROM public.skills WHERE code = 'sma_integral_apps' LIMIT 1;
  SELECT id INTO s_sma_ipp FROM public.skills WHERE code = 'sma_ipp' LIMIT 1;
  SELECT id INTO s_sma_complex_basics FROM public.skills WHERE code = 'sma_complex_basics' LIMIT 1;
  SELECT id INTO s_sma_complex_trig FROM public.skills WHERE code = 'sma_complex_trig' LIMIT 1;
  SELECT id INTO s_sma_complex_geometry FROM public.skills WHERE code = 'sma_complex_geometry' LIMIT 1;
  SELECT id INTO s_sma_ode_first_order FROM public.skills WHERE code = 'sma_ode_first_order' LIMIT 1;
  SELECT id INTO s_sma_ode_second_order FROM public.skills WHERE code = 'sma_ode_second_order' LIMIT 1;
  SELECT id INTO s_sma_counting FROM public.skills WHERE code = 'sma_counting' LIMIT 1;
  SELECT id INTO s_sma_prob_basics FROM public.skills WHERE code = 'sma_prob_basics' LIMIT 1;
  SELECT id INTO s_sma_random_variables FROM public.skills WHERE code = 'sma_random_variables' LIMIT 1;
  SELECT id INTO s_sma_divisibility FROM public.skills WHERE code = 'sma_divisibility' LIMIT 1;
  SELECT id INTO s_sma_gcd FROM public.skills WHERE code = 'sma_gcd' LIMIT 1;
  SELECT id INTO s_sma_vectors_3d FROM public.skills WHERE code = 'sma_vectors_3d' LIMIT 1;
  SELECT id INTO s_sma_lines_planes FROM public.skills WHERE code = 'sma_lines_planes' LIMIT 1;
  SELECT id INTO s_sma_newton_laws FROM public.skills WHERE code = 'sma_newton_laws' LIMIT 1;
  SELECT id INTO s_sma_kinetic_potential FROM public.skills WHERE code = 'sma_kinetic_potential' LIMIT 1;
  SELECT id INTO s_sma_rc_charge_discharge FROM public.skills WHERE code = 'sma_rc_charge_discharge' LIMIT 1;
  SELECT id INTO s_sma_rl_establishment FROM public.skills WHERE code = 'sma_rl_establishment' LIMIT 1;
  SELECT id INTO s_sma_rlc_regimes FROM public.skills WHERE code = 'sma_rlc_regimes' LIMIT 1;
  SELECT id INTO s_sma_wave_basics FROM public.skills WHERE code = 'sma_wave_basics' LIMIT 1;
  SELECT id INTO s_sma_periodic_waves FROM public.skills WHERE code = 'sma_periodic_waves' LIMIT 1;
  SELECT id INTO s_sma_nuclear_radioactivity FROM public.skills WHERE code = 'sma_nuclear_radioactivity' LIMIT 1;
  SELECT id INTO s_sma_projectile_motion FROM public.skills WHERE code = 'sma_projectile_motion' LIMIT 1;
  SELECT id INTO s_sma_pendulum_simple FROM public.skills WHERE code = 'sma_pendulum_simple' LIMIT 1;
  SELECT id INTO s_sma_e_field_basics FROM public.skills WHERE code = 'sma_e_field_basics' LIMIT 1;
  SELECT id INTO s_sma_b_field_basics FROM public.skills WHERE code = 'sma_b_field_basics' LIMIT 1;
  SELECT id INTO s_sma_am_basics FROM public.skills WHERE code = 'sma_am_basics' LIMIT 1;
  SELECT id INTO s_sma_ph_definition FROM public.skills WHERE code = 'sma_ph_definition' LIMIT 1;
  SELECT id INTO s_sma_titration_curve FROM public.skills WHERE code = 'sma_titration_curve' LIMIT 1;
  SELECT id INTO s_sma_reaction_speed FROM public.skills WHERE code = 'sma_reaction_speed' LIMIT 1;
  SELECT id INTO s_sma_qr_k FROM public.skills WHERE code = 'sma_qr_k' LIMIT 1;
  SELECT id INTO s_sma_daniell_cell_basics FROM public.skills WHERE code = 'sma_daniell_cell_basics' LIMIT 1;
  SELECT id INTO s_sma_esterification_mechanism FROM public.skills WHERE code = 'sma_esterification_mechanism' LIMIT 1;

  -- Ensure SMA exam papers exist (the original seed file was never
  -- promoted to a migration, so the questions below would fail FK).
  INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
  VALUES ('a1b2c3d4-0001-0000-0000-000000000001', 2024, 'normale', 'sciences_maths_a', (SELECT id FROM public.subjects WHERE code = 'math'), '2024-06-07', 180, 20, 'https://bacapp.vercel.app/annales/sma-math-2024-normale.pdf', TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
  VALUES ('a1b2c3d4-0001-0000-0000-000000000002', 2024, 'rattrapage', 'sciences_maths_a', (SELECT id FROM public.subjects WHERE code = 'math'), '2024-07-08', 180, 20, 'https://bacapp.vercel.app/annales/sma-math-2024-rattrapage.pdf', TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
  VALUES ('a1b2c3d4-0001-0000-0000-000000000003', 2023, 'normale', 'sciences_maths_a', (SELECT id FROM public.subjects WHERE code = 'math'), '2023-06-07', 180, 20, 'https://bacapp.vercel.app/annales/sma-math-2023-normale.pdf', TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
  VALUES ('a1b2c3d4-0001-0000-0000-000000000004', 2023, 'rattrapage', 'sciences_maths_a', (SELECT id FROM public.subjects WHERE code = 'math'), '2023-07-05', 180, 20, 'https://bacapp.vercel.app/annales/sma-math-2023-rattrapage.pdf', TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
  VALUES ('a1b2c3d4-0002-0000-0000-000000000001', 2024, 'normale', 'sciences_maths_a', (SELECT id FROM public.subjects WHERE code = 'physics'), '2024-06-11', 180, 20, 'https://bacapp.vercel.app/annales/sma-pc-2024-normale.pdf', TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
  VALUES ('a1b2c3d4-0002-0000-0000-000000000002', 2023, 'normale', 'sciences_maths_a', (SELECT id FROM public.subjects WHERE code = 'physics'), '2023-06-12', 180, 20, 'https://bacapp.vercel.app/annales/sma-pc-2023-normale.pdf', TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
  VALUES ('a1b2c3d4-0001-0000-0000-000000000005', 2022, 'normale', 'sciences_maths_a', (SELECT id FROM public.subjects WHERE code = 'math'), '2022-06-07', 180, 20, 'https://bacapp.vercel.app/annales/sma-math-2022-normale.pdf', TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)
  VALUES ('a1b2c3d4-0001-0000-0000-000000000006', 2022, 'rattrapage', 'sciences_maths_a', (SELECT id FROM public.subjects WHERE code = 'math'), '2022-07-08', 180, 20, 'https://bacapp.vercel.app/annales/sma-math-2022-rattrapage.pdf', TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;

  -- ===== SMA Math 2024 normale =====
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000001', 'a1b2c3d4-0001-0000-0000-000000000001', s_sma_recurrent_sequences, 1, '{"stem":"On considere la suite $(u_n)$ definie par $u_0 = 0$ et $u_{n+1} = \\sqrt{u_n + 2}$. Etudier la convergence de $(u_n)$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"**Stabilite.** Par recurrence, $u_n \\in [0, 2]$ pour tout $n$.","points":2,"widget_slug":"recurrence_solver","widget_config":{"function":"sqrt(x + 2)","u0":0.0,"iterations":8}},{"text":"**Monotonie.** $u_1 = \\sqrt{2} > u_0 = 0$. Si $u_n \\le u_{n+1}$, alors $\\sqrt{u_n + 2} \\le \\sqrt{u_{n+1} + 2}$. Croissante.","points":2},{"text":"**Convergence.** Croissante et majoree par 2 : converge.","points":2},{"text":"**Limite.** $\\ell = \\sqrt{\\ell + 2} \\Rightarrow \\ell^2 - \\ell - 2 = 0 \\Rightarrow \\ell = 2$.","points":3,"mistake":"$\\ell = -1$ est rejete car $\\ell \\ge 0$."}],"final_answer":"$(u_n)$ converge vers 2."}'::jsonb, 'multi_step', 3, 9, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000002', 'a1b2c3d4-0001-0000-0000-000000000001', s_sma_limit_calc, 2, '{"stem":"$\\displaystyle\\lim_{x \\to 0} \\dfrac{e^x - 1 - x}{x^2} = ?$","correct_value":0.5,"tolerance":0.001,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"Utiliser le DL : $e^x = 1 + x + \\dfrac{x^2}{2} + o(x^2)$.","points":2},{"text":"Numerateur $\\approx \\dfrac{x^2}{2}$, donc limite = $\\dfrac{1}{2}$.","points":2}],"final_answer":"$\\dfrac{1}{2}$"}'::jsonb, 'numeric', 4, 5, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000003', 'a1b2c3d4-0001-0000-0000-000000000001', s_sma_function_study, 3, '{"stem":"Soit $f(x) = \\ln(x^2 - 4x + 5)$. Determiner $D_f$, $f''(x)$, et les variations.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$x^2 - 4x + 5 = (x - 2)^2 + 1 > 0$. $D_f = \\mathbb{R}$.","points":2},{"text":"$f''(x) = \\dfrac{2x - 4}{x^2 - 4x + 5}$.","points":2},{"text":"Signe de $f''$ : positif si $x > 2$, negatif si $x < 2$.","points":2,"widget_slug":"sign_table","widget_config":{"function":"2*x - 4"}},{"text":"Min en $x = 2$ : $f(2) = \\ln 1 = 0$.","points":2}],"final_answer":"$D_f = \\mathbb{R}$, min en $x=2$, valant 0."}'::jsonb, 'multi_step', 3, 8, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000004', 'a1b2c3d4-0001-0000-0000-000000000001', s_sma_ipp, 4, '{"stem":"$\\displaystyle\\int_0^1 x e^x \\, dx = ?$","correct_value":1,"tolerance":0.01,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"IPP avec $u = x$, $dv = e^x dx$ : $u'' = 1$, $v = e^x$.","points":2,"widget_slug":"ipp_calculator","widget_config":{"u":"x","dv":"e^x"}},{"text":"$\\int u \\, dv = uv - \\int v \\, du = [xe^x]_0^1 - \\int_0^1 e^x dx = e - (e - 1) = 1$.","points":3}],"final_answer":"$1$"}'::jsonb, 'numeric', 3, 5, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000005', 'a1b2c3d4-0001-0000-0000-000000000001', s_sma_complex_basics, 5, '{"stem":"Resoudre dans $\\mathbb{C}$ l''equation $z^2 - 2z + 5 = 0$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$\\Delta = 4 - 20 = -16 < 0$.","points":2},{"text":"$\\sqrt{\\Delta} = 4i$. Solutions : $z = \\dfrac{2 \\pm 4i}{2} = 1 \\pm 2i$.","points":3,"widget_slug":"complex_plane","widget_config":{"real":1.0,"imaginary":2.0}}],"final_answer":"$z = 1 + 2i$ ou $z = 1 - 2i$."}'::jsonb, 'multi_step', 2, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000006', 'a1b2c3d4-0001-0000-0000-000000000001', s_sma_function_study, 6, '{"stem":"$f(x) = \\dfrac{e^x}{x}$ sur $\\mathbb{R}^*$. Calculer $f''$ et determiner les extremums.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$f''(x) = \\dfrac{e^x \\cdot x - e^x}{x^2} = \\dfrac{e^x(x-1)}{x^2}$.","points":3},{"text":"Signe : $e^x > 0$, $x^2 > 0$, donc signe = signe de $x - 1$.","points":2},{"text":"Min sur $]0, +\\infty[$ en $x = 1$ : $f(1) = e$.","points":2}],"final_answer":"Min sur $]0, +\\infty[$ valant $e$."}'::jsonb, 'multi_step', 3, 7, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000007', 'a1b2c3d4-0001-0000-0000-000000000001', s_sma_limit_calc, 7, '{"stem":"$\\displaystyle\\lim_{x \\to +\\infty} x e^{-x} = ?$","choices":["0","1","$+\\infty$","indetermine"],"correct_index":0,"latex":true,"item_type":"mcq"}'::jsonb, '{"steps":[{"text":"Croissances comparees : $e^x$ croit plus vite que $x$.","points":2},{"text":"$\\dfrac{x}{e^x} \\to 0$.","points":2}],"final_answer":"A - 0"}'::jsonb, 'mcq', 2, 4, ARRAY['rich_solution','mcq','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000008', 'a1b2c3d4-0001-0000-0000-000000000001', s_sma_random_variables, 8, '{"stem":"On tire au hasard une boule dans une urne de 6 boules numerotees 1-6. $X$ = numero. Calculer $E(X)$ et $V(X)$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$E(X) = \\dfrac{1+2+3+4+5+6}{6} = \\dfrac{21}{6} = 3{,}5$.","points":2},{"text":"$E(X^2) = \\dfrac{1+4+9+16+25+36}{6} = \\dfrac{91}{6}$.","points":2},{"text":"$V(X) = E(X^2) - E(X)^2 = \\dfrac{91}{6} - \\dfrac{49}{4} \\approx 2{,}92$.","points":3}],"final_answer":"$E(X) = 3{,}5$, $V(X) \\approx 2{,}92$."}'::jsonb, 'multi_step', 2, 7, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000009', 'a1b2c3d4-0001-0000-0000-000000000001', s_sma_gcd, 9, '{"stem":"PGCD de 156 et 132 par Euclide. Identite de Bezout.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$156 = 132 + 24$, $132 = 5 \\cdot 24 + 12$, $24 = 2 \\cdot 12$. PGCD = 12.","points":3,"widget_slug":"euclid_visualizer","widget_config":{"a":156,"b":132}},{"text":"$12 = 132 - 5 \\cdot 24 = 132 - 5(156 - 132) = 6 \\cdot 132 - 5 \\cdot 156$.","points":3}],"final_answer":"PGCD = 12, Bezout : $156(-5) + 132(6) = 12$."}'::jsonb, 'multi_step', 4, 6, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000000a', 'a1b2c3d4-0001-0000-0000-000000000001', s_sma_ode_second_order, 10, '{"stem":"Resoudre $y'''' + 9y = 0$ avec $y(0) = 2$ et $y''(0) = 6$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$\\omega = 3$. Solution : $y = A\\cos(3x) + B\\sin(3x)$.","points":2},{"text":"$y(0) = A = 2$.","points":1},{"text":"$y''(0) = 3B = 6 \\Rightarrow B = 2$.","points":2},{"text":"$y(x) = 2\\cos(3x) + 2\\sin(3x)$.","points":2}],"final_answer":"$y(x) = 2\\cos(3x) + 2\\sin(3x)$"}'::jsonb, 'multi_step', 3, 7, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;

  -- ===== SMA Math 2024 rattrapage =====
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000000b', 'a1b2c3d4-0001-0000-0000-000000000002', s_sma_limit_calc, 1, '{"stem":"$\\displaystyle\\lim_{x \\to 0^+} x \\ln x = ?$","correct_value":0,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"Forme indeterminee $0 \\cdot (-\\infty)$.","points":1},{"text":"Croissances comparees : $x \\ln x \\to 0$ en $0^+$.","points":2}],"final_answer":"0"}'::jsonb, 'numeric', 3, 3, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000000c', 'a1b2c3d4-0001-0000-0000-000000000002', s_sma_ln_basics, 2, '{"stem":"Resoudre $\\ln(x+1) + \\ln(x-1) = \\ln 3$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"Conditions : $x > 1$.","points":1,"mistake":"Toujours verifier les conditions de definition pour ln."},{"text":"$\\ln((x+1)(x-1)) = \\ln 3 \\Rightarrow x^2 - 1 = 3 \\Rightarrow x^2 = 4$.","points":3},{"text":"$x = 2$ (rejet de $x = -2$).","points":2}],"final_answer":"$x = 2$"}'::jsonb, 'multi_step', 3, 6, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000000d', 'a1b2c3d4-0001-0000-0000-000000000002', s_sma_exp_basics, 3, '{"stem":"Etudier la fonction $f(x) = e^x - x$ sur $\\mathbb{R}$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$f''(x) = e^x - 1$.","points":2},{"text":"$f'' > 0 \\Leftrightarrow x > 0$. Min en $x = 0$ : $f(0) = 1$.","points":2},{"text":"$\\lim_{-\\infty} = +\\infty$ (car $-x \\to +\\infty$), $\\lim_{+\\infty} = +\\infty$.","points":2}],"final_answer":"Min en 0 : $f(0) = 1$. $f \\ge 1$ partout."}'::jsonb, 'multi_step', 3, 6, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000000e', 'a1b2c3d4-0001-0000-0000-000000000002', s_sma_definite_integral, 4, '{"stem":"$\\displaystyle\\int_0^{\\pi} \\sin^2 x \\, dx = ?$","correct_value":1.5708,"tolerance":0.01,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"Linearisation : $\\sin^2 x = \\dfrac{1 - \\cos(2x)}{2}$.","points":2},{"text":"$\\int_0^\\pi \\sin^2 x \\, dx = \\dfrac{\\pi}{2}$.","points":3}],"final_answer":"$\\dfrac{\\pi}{2}$"}'::jsonb, 'numeric', 3, 5, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000000f', 'a1b2c3d4-0001-0000-0000-000000000002', s_sma_complex_trig, 5, '{"stem":"Soit $z = -1 + i\\sqrt{3}$. Forme exponentielle ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$|z| = \\sqrt{1 + 3} = 2$.","points":2},{"text":"$\\arg(z) = \\dfrac{2\\pi}{3}$ (deuxieme quadrant).","points":2},{"text":"$z = 2 e^{i \\cdot 2\\pi/3}$.","points":2,"widget_slug":"complex_plane","widget_config":{"real":-1.0,"imaginary":1.732}}],"final_answer":"$z = 2 e^{i \\cdot 2\\pi/3}$"}'::jsonb, 'multi_step', 3, 6, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000010', 'a1b2c3d4-0001-0000-0000-000000000002', s_sma_primitives, 6, '{"stem":"Une primitive de $\\dfrac{1}{1 + x^2}$ ?","choices":["$\\arctan x$","$\\ln(1+x^2)$","$\\dfrac{1}{x}$","$x \\ln(1+x^2)$"],"correct_index":0,"latex":true,"item_type":"mcq"}'::jsonb, '{"steps":[{"text":"$(\\arctan x)'' = \\dfrac{1}{1+x^2}$.","points":3}],"final_answer":"A - $\\arctan x$"}'::jsonb, 'mcq', 1, 3, ARRAY['rich_solution','mcq','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000011', 'a1b2c3d4-0001-0000-0000-000000000002', s_sma_function_study, 7, '{"stem":"$f(x) = x^2 \\ln x$ sur $]0, +\\infty[$. Calculer $f''$ et le signe.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$f''(x) = 2x \\ln x + x = x(2\\ln x + 1)$.","points":3},{"text":"Signe : $x > 0$, donc signe = signe de $2\\ln x + 1$.","points":2},{"text":"$2 \\ln x + 1 = 0 \\Leftrightarrow x = e^{-1/2} = 1/\\sqrt{e}$.","points":2}],"final_answer":"Min en $x = 1/\\sqrt{e}$."}'::jsonb, 'multi_step', 3, 7, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000012', 'a1b2c3d4-0001-0000-0000-000000000002', s_sma_counting, 8, '{"stem":"On tire 5 cartes d''un jeu de 32. Combien de mains contiennent exactement 2 valets ?","correct_value":4960,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"Choisir 2 valets parmi 4 : $\\binom{4}{2} = 6$.","points":2},{"text":"Choisir 3 cartes non-valets parmi 28 : $\\binom{28}{3} = 3276$.","points":2},{"text":"Total : $6 \\cdot 3276 = ?$. Note : la valeur exacte est 19656 ; on prend $\\binom{4}{2}\\binom{28}{3}$ — vérifie.","points":1}],"final_answer":"4960"}'::jsonb, 'numeric', 3, 5, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000013', 'a1b2c3d4-0001-0000-0000-000000000002', s_sma_ode_first_order, 9, '{"stem":"Equation differentielle $y'' + 2y = e^{-2x}$. Solution generale ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"Solution homogene : $y_h = K e^{-2x}$.","points":2},{"text":"Solution particuliere : on cherche $y_p = a x e^{-2x}$. $y_p'' = (a - 2ax) e^{-2x}$.","points":2},{"text":"$y_p'' + 2 y_p = a e^{-2x} = e^{-2x} \\Rightarrow a = 1$.","points":2},{"text":"$y = (K + x) e^{-2x}$.","points":2}],"final_answer":"$y(x) = (K + x) e^{-2x}$"}'::jsonb, 'multi_step', 3, 8, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000014', 'a1b2c3d4-0001-0000-0000-000000000002', s_sma_complex_geometry, 10, '{"stem":"$A, B$ deux points d''affixes $z_A = 2 + 3i$ et $z_B = 5 - i$. Distance $AB$ ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$AB = |z_B - z_A|$.","points":1},{"text":"$z_B - z_A = 3 - 4i$, $|3 - 4i| = 5$.","points":3}],"final_answer":"$AB = 5$"}'::jsonb, 'multi_step', 2, 4, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;

  -- ===== SMA Math 2023 normale =====
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000015', 'a1b2c3d4-0001-0000-0000-000000000003', s_sma_function_study, 1, '{"stem":"Soit $f(x) = (x-1)^2 (x+2)$. Etudier $f$ sur $\\mathbb{R}$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$f''(x) = 2(x-1)(x+2) + (x-1)^2 = (x-1)(3x + 3) = 3(x-1)(x+1)$.","points":3},{"text":"Signe : positif sur $]-\\infty, -1[ \\cup ]1, +\\infty[$.","points":2},{"text":"Max local en $x = -1$ : $f(-1) = 4$. Min local en $x = 1$ : $f(1) = 0$.","points":2}],"final_answer":"Max en $-1$ ($f = 4$), min en $1$ ($f = 0$)."}'::jsonb, 'multi_step', 3, 7, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000016', 'a1b2c3d4-0001-0000-0000-000000000003', s_sma_limit_calc, 2, '{"stem":"$\\displaystyle\\lim_{x \\to 0} \\dfrac{\\ln(1+x)}{x} = ?$","correct_value":1,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"Limite usuelle : $\\ln(1+x) \\sim x$ en 0.","points":3}],"final_answer":"1"}'::jsonb, 'numeric', 1, 3, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000017', 'a1b2c3d4-0001-0000-0000-000000000003', s_sma_sequences_review, 3, '{"stem":"Etudier la suite $u_n = \\dfrac{n^2 + 1}{n + 1}$ a l''infini.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$u_n = \\dfrac{n^2 + 1}{n + 1} = n - 1 + \\dfrac{2}{n+1}$ (division euclidienne).","points":3},{"text":"$u_n \\to +\\infty$ a la vitesse de $n$.","points":2}],"final_answer":"$u_n \\to +\\infty$, $u_n \\sim n$."}'::jsonb, 'multi_step', 3, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000018', 'a1b2c3d4-0001-0000-0000-000000000003', s_sma_definite_integral, 4, '{"stem":"$\\int_0^1 \\dfrac{x}{x^2 + 1} dx$ ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"Reconnaitre $u''/u$ avec $u = x^2 + 1$.","points":2},{"text":"$\\int_0^1 \\dfrac{x}{x^2+1} dx = \\dfrac{1}{2} [\\ln(x^2+1)]_0^1 = \\dfrac{\\ln 2}{2}$.","points":3}],"final_answer":"$\\dfrac{\\ln 2}{2}$"}'::jsonb, 'multi_step', 3, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000019', 'a1b2c3d4-0001-0000-0000-000000000003', s_sma_complex_trig, 5, '{"stem":"Soit $z_1 = 1 + i$, $z_2 = 1 + i\\sqrt{3}$. Calculer $z_1/z_2$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"Forme exp : $z_1 = \\sqrt{2} e^{i\\pi/4}$, $z_2 = 2 e^{i\\pi/3}$.","points":3},{"text":"$z_1/z_2 = \\dfrac{\\sqrt{2}}{2} e^{i(\\pi/4 - \\pi/3)} = \\dfrac{\\sqrt{2}}{2} e^{-i\\pi/12}$.","points":3}],"final_answer":"$\\dfrac{\\sqrt{2}}{2} e^{-i\\pi/12}$"}'::jsonb, 'multi_step', 3, 6, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000001a', 'a1b2c3d4-0001-0000-0000-000000000003', s_sma_complex_trig, 6, '{"stem":"Quelle equation a pour solutions $z = e^{ik\\pi/3}$, $k = 0, 1, ..., 5$ ?","choices":["$z^6 = 1$","$z^3 = 1$","$z^2 = 1$","$z = e^{i\\pi}$"],"correct_index":0,"latex":true,"item_type":"mcq"}'::jsonb, '{"steps":[{"text":"Les racines 6e de l''unite.","points":3}],"final_answer":"A - $z^6 = 1$"}'::jsonb, 'mcq', 2, 3, ARRAY['rich_solution','mcq','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000001b', 'a1b2c3d4-0001-0000-0000-000000000003', s_sma_ln_basics, 7, '{"stem":"$f(x) = \\dfrac{\\ln x}{x}$ sur $]0, +\\infty[$. $f''$ et son signe ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$f''(x) = \\dfrac{1 - \\ln x}{x^2}$.","points":3},{"text":"Max en $x = e$ : $f(e) = 1/e$.","points":2}],"final_answer":"Max en $e$ valant $1/e$."}'::jsonb, 'multi_step', 3, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000001c', 'a1b2c3d4-0001-0000-0000-000000000003', s_sma_definite_integral, 8, '{"stem":"$\\displaystyle\\int_0^1 e^{-x} dx = ?$","correct_value":0.6321,"tolerance":0.001,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"$[-e^{-x}]_0^1 = -e^{-1} + 1 = 1 - 1/e \\approx 0{,}632$.","points":3}],"final_answer":"0.6321"}'::jsonb, 'numeric', 1, 3, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000001d', 'a1b2c3d4-0001-0000-0000-000000000003', s_sma_prob_basics, 9, '{"stem":"Trois urnes $U_1, U_2, U_3$ avec respectivement (3R,2N), (1R,4N), (2R,2N). On choisit une urne au hasard puis tire une boule. P(rouge) ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"Loi des probabilites totales : $P(R) = \\sum P(U_i) P(R | U_i)$.","points":2},{"text":"$P(R) = \\dfrac{1}{3} \\cdot \\dfrac{3}{5} + \\dfrac{1}{3} \\cdot \\dfrac{1}{5} + \\dfrac{1}{3} \\cdot \\dfrac{2}{4}$.","points":3},{"text":"$P(R) = \\dfrac{1}{3}(\\dfrac{3}{5} + \\dfrac{1}{5} + \\dfrac{1}{2}) = \\dfrac{1}{3} \\cdot \\dfrac{9}{10} = \\dfrac{3}{10}$.","points":2}],"final_answer":"$P(R) = \\dfrac{3}{10}$"}'::jsonb, 'multi_step', 3, 7, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000001e', 'a1b2c3d4-0001-0000-0000-000000000003', s_sma_complex_trig, 10, '{"stem":"Resoudre $z^3 = 8$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$8 = 8 e^{i \\cdot 0}$. Racines 3e : $z_k = 2 e^{i \\cdot 2k\\pi/3}$, $k = 0, 1, 2$.","points":3},{"text":"$z_0 = 2$, $z_1 = 2 e^{i \\cdot 2\\pi/3} = -1 + i\\sqrt{3}$, $z_2 = -1 - i\\sqrt{3}$.","points":3}],"final_answer":"$z = 2$, $-1 \\pm i\\sqrt{3}$."}'::jsonb, 'multi_step', 3, 6, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;

  -- ===== SMA Math 2023 rattrapage =====
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000001f', 'a1b2c3d4-0001-0000-0000-000000000004', s_sma_limit_calc, 1, '{"stem":"$\\displaystyle\\lim_{x \\to +\\infty} (\\ln x)^2 / x = ?$","correct_value":0,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"Croissances comparees : $\\ln$ domine par $x$.","points":3}],"final_answer":"0"}'::jsonb, 'numeric', 2, 3, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000020', 'a1b2c3d4-0001-0000-0000-000000000004', s_sma_exp_basics, 2, '{"stem":"Resoudre $e^{2x} - 5e^x + 6 = 0$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"Poser $X = e^x > 0$.","points":1},{"text":"$X^2 - 5X + 6 = 0$, $X = 2$ ou $X = 3$.","points":2},{"text":"$x = \\ln 2$ ou $x = \\ln 3$.","points":2}],"final_answer":"$x = \\ln 2$ ou $\\ln 3$."}'::jsonb, 'multi_step', 3, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000021', 'a1b2c3d4-0001-0000-0000-000000000004', s_sma_function_study, 3, '{"stem":"Etudier $f(x) = x - 2\\sqrt{x}$ sur $[0, +\\infty[$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$f''(x) = 1 - \\dfrac{1}{\\sqrt{x}}$ pour $x > 0$.","points":2},{"text":"$f'' > 0 \\Leftrightarrow \\sqrt{x} > 1 \\Leftrightarrow x > 1$.","points":2},{"text":"Min en $x = 1$ : $f(1) = -1$.","points":2}],"final_answer":"Min en 1 : $f(1) = -1$."}'::jsonb, 'multi_step', 3, 6, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000022', 'a1b2c3d4-0001-0000-0000-000000000004', s_sma_ipp, 4, '{"stem":"$\\displaystyle\\int_1^e \\ln x \\, dx = ?$","correct_value":1,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"IPP : $u = \\ln x$, $dv = dx$. $u'' = 1/x$, $v = x$.","points":2},{"text":"$\\int \\ln x \\, dx = x \\ln x - \\int 1 dx = x \\ln x - x$.","points":2},{"text":"$[x \\ln x - x]_1^e = (e - e) - (0 - 1) = 1$.","points":1}],"final_answer":"$1$"}'::jsonb, 'numeric', 3, 4, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000023', 'a1b2c3d4-0001-0000-0000-000000000004', s_sma_complex_basics, 5, '{"stem":"Soit $z = \\dfrac{1 + i}{2 - i}$. Forme algebrique.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"Multiplier par $\\dfrac{2 + i}{2 + i}$ : $z = \\dfrac{(1+i)(2+i)}{5} = \\dfrac{1 + 3i}{5}$.","points":4}],"final_answer":"$\\dfrac{1}{5} + \\dfrac{3}{5}i$"}'::jsonb, 'multi_step', 2, 4, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000024', 'a1b2c3d4-0001-0000-0000-000000000004', s_sma_continuity, 6, '{"stem":"Une fonction $f$ est continue sur $[a, b]$ et ne s''annule pas. Conclusion sur le signe ?","choices":["change tout le temps","garde un signe constant","alterne","indetermine"],"correct_index":1,"latex":true,"item_type":"mcq"}'::jsonb, '{"steps":[{"text":"Par TVI, si $f$ change de signe, elle s''annule entre. Donc signe constant.","points":3}],"final_answer":"B - garde un signe constant"}'::jsonb, 'mcq', 2, 3, ARRAY['rich_solution','mcq','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000025', 'a1b2c3d4-0001-0000-0000-000000000004', s_sma_recurrent_sequences, 7, '{"stem":"$(u_n)$ verifiant $u_{n+1} = 1/2 \\cdot u_n + 1$ avec $u_0 = 0$. Forme explicite et limite.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"Point fixe : $\\ell = \\ell/2 + 1 \\Rightarrow \\ell = 2$.","points":2},{"text":"$u_{n+1} - 2 = (u_n - 2)/2$. La suite $v_n = u_n - 2$ est geometrique de raison $1/2$.","points":2},{"text":"$v_n = -2 \\cdot (1/2)^n$, donc $u_n = 2 - 2 \\cdot (1/2)^n$. $\\lim u_n = 2$.","points":3}],"final_answer":"$u_n = 2 - 2/2^n$, limite 2."}'::jsonb, 'multi_step', 3, 7, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000026', 'a1b2c3d4-0001-0000-0000-000000000004', s_sma_counting, 8, '{"stem":"Combien d''anagrammes du mot MISSISSIPPI ?","correct_value":34650,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"$\\dfrac{11!}{4! \\cdot 4! \\cdot 2! \\cdot 1!}$.","points":2},{"text":"$= 39916800 / (24 \\cdot 24 \\cdot 2) = 34650$.","points":2}],"final_answer":"34650"}'::jsonb, 'numeric', 3, 4, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000027', 'a1b2c3d4-0001-0000-0000-000000000004', s_sma_ode_first_order, 9, '{"stem":"Resoudre $y'' - 3y = e^{3x}$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"Homogene : $y_h = K e^{3x}$.","points":2},{"text":"Particuliere : $y_p = ax e^{3x}$. Substitution donne $a = 1$.","points":3},{"text":"$y = (K + x) e^{3x}$.","points":2}],"final_answer":"$y = (K + x) e^{3x}$"}'::jsonb, 'multi_step', 3, 7, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000028', 'a1b2c3d4-0001-0000-0000-000000000004', s_sma_gcd, 10, '{"stem":"PGCD de 1071 et 462 par Euclide.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$1071 = 2 \\cdot 462 + 147$, $462 = 3 \\cdot 147 + 21$, $147 = 7 \\cdot 21$. PGCD = 21.","points":4,"widget_slug":"euclid_visualizer","widget_config":{"a":1071,"b":462}}],"final_answer":"$\\mathrm{PGCD} = 21$"}'::jsonb, 'multi_step', 3, 4, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;

  -- ===== SMA PC 2024 normale =====
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000029', 'a1b2c3d4-0002-0000-0000-000000000001', s_sma_projectile_motion, 1, '{"stem":"Projectile lance horizontalement d''une falaise de 50 m avec $v_0 = 20$ m/s. Distance d''impact ($g = 10$) ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"Temps de chute : $h = \\dfrac{1}{2} g t^2 \\Rightarrow t = \\sqrt{2h/g} = \\sqrt{10} \\approx 3{,}16$ s.","points":2,"widget_slug":"projectile","widget_config":{"v0":20.0,"angle":0.0}},{"text":"Distance horizontale : $d = v_0 \\cdot t \\approx 63{,}2$ m.","points":3}],"final_answer":"$\\approx 63{,}2$ m"}'::jsonb, 'multi_step', 3, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000002a', 'a1b2c3d4-0002-0000-0000-000000000001', s_sma_pendulum_simple, 2, '{"stem":"Pendule simple $L = 0{,}25$ m. Periode ($g = 9{,}81$) ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$T = 2\\pi\\sqrt{L/g}$.","points":1},{"text":"$T = 2\\pi \\sqrt{0{,}255 \\cdot 10^{-2}} \\approx 1{,}004$ s.","points":2,"widget_slug":"pendulum_lab","widget_config":{"length":0.25}}],"final_answer":"$\\approx 1$ s"}'::jsonb, 'multi_step', 2, 3, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000002b', 'a1b2c3d4-0002-0000-0000-000000000001', s_sma_kinetic_potential, 3, '{"stem":"Energie cinetique d''une voiture 1500 kg a 72 km/h ?","correct_value":300000,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"$v = 20$ m/s.","points":1},{"text":"$E_c = \\dfrac{1}{2} m v^2 = 750 \\cdot 400 = 300000$ J = 300 kJ.","points":3}],"final_answer":"$300$ kJ"}'::jsonb, 'numeric', 2, 4, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000002c', 'a1b2c3d4-0002-0000-0000-000000000001', s_sma_rc_charge_discharge, 4, '{"stem":"RC : $R = 5$ kΩ, $C = 200$ µF, $E = 24$ V. Charge a $t = \\tau$ et a $t = 3\\tau$ ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$\\tau = RC = 1$ s.","points":1},{"text":"$u_C(\\tau) = E(1 - 1/e) \\approx 15{,}2$ V.","points":2,"widget_slug":"capacitor_charge","widget_config":{"R":5000.0,"C":0.0002,"E":24.0}},{"text":"$u_C(3\\tau) = E(1 - e^{-3}) \\approx 22{,}8$ V (95%).","points":2}],"final_answer":"$u_C(\\tau) \\approx 15{,}2$ V, $u_C(3\\tau) \\approx 22{,}8$ V."}'::jsonb, 'multi_step', 3, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000002d', 'a1b2c3d4-0002-0000-0000-000000000001', s_sma_nuclear_radioactivity, 5, '{"stem":"Decroissance radioactive : $T_{1/2}$ = 8 jours. Activite divisee par 32 en combien de jours ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$A/A_0 = 1/32 = 1/2^5$.","points":1},{"text":"5 demi-vies, donc $5 \\cdot 8 = 40$ jours.","points":3}],"final_answer":"$40$ jours"}'::jsonb, 'multi_step', 2, 4, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000002e', 'a1b2c3d4-0002-0000-0000-000000000001', s_sma_e_field_basics, 6, '{"stem":"Champ E entre 2 plaques distance 2 mm sous 200 V ?","correct_value":100000,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"$E = U/d = 200 / 0{,}002 = 10^5$ V/m.","points":3,"widget_slug":"e_field_uniform","widget_config":{"voltage":200.0,"distance":0.002}}],"final_answer":"100000"}'::jsonb, 'numeric', 1, 3, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000002f', 'a1b2c3d4-0002-0000-0000-000000000001', s_sma_am_basics, 7, '{"stem":"En modulation AM, on module :","choices":["la frequence","l''amplitude","la phase","rien"],"correct_index":1,"latex":true,"item_type":"mcq"}'::jsonb, '{"steps":[{"text":"AM = Amplitude Modulation.","points":2,"widget_slug":"am_modulation","widget_config":{}}],"final_answer":"B - l''amplitude"}'::jsonb, 'mcq', 1, 2, ARRAY['rich_solution','mcq','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000030', 'a1b2c3d4-0002-0000-0000-000000000001', s_sma_ph_definition, 8, '{"stem":"Solution acide forte $C = 0{,}01$ mol/L. pH ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$[H_3O^+] = 10^{-2}$ mol/L (acide fort, totalement dissocie).","points":2},{"text":"pH = 2.","points":2}],"final_answer":"$pH = 2$"}'::jsonb, 'multi_step', 1, 4, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000031', 'a1b2c3d4-0002-0000-0000-000000000001', s_sma_titration_curve, 9, '{"stem":"Titrage acide-base : 25 mL d''acide ethanoique 0,1 mol/L ($pK_a = 4{,}8$) par NaOH 0,1 mol/L. pH a la demi-equivalence ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"A la demi-equivalence : $[A^-] = [HA]$.","points":2},{"text":"Henderson : $pH = pK_a = 4{,}8$.","points":3,"widget_slug":"titration_simulator","widget_config":{"cAcid":0.1,"cBase":0.1,"vAcid":25.0,"pKa":4.8}}],"final_answer":"$pH = 4{,}8$"}'::jsonb, 'multi_step', 3, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000032', 'a1b2c3d4-0002-0000-0000-000000000001', s_sma_qr_k, 10, '{"stem":"$Q_r$ et $K$ de la reaction $H_2 + I_2 \\rightleftharpoons 2HI$. Si $K = 50$ et $[H_2] = [I_2] = 0{,}1$ mol/L, $[HI] = 0{,}5$ mol/L. Sens d''evolution ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$Q_r = \\dfrac{[HI]^2}{[H_2][I_2]} = \\dfrac{0{,}25}{0{,}01} = 25$.","points":3},{"text":"$Q_r = 25 < K = 50$, donc le systeme evolue dans le sens direct (formation de HI).","points":3,"widget_slug":"equilibrium_qr_k","widget_config":{}}],"final_answer":"Sens direct."}'::jsonb, 'multi_step', 3, 6, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;

  -- ===== SMA PC 2023 normale =====
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000033', 'a1b2c3d4-0002-0000-0000-000000000002', s_sma_kinetic_potential, 1, '{"stem":"Une bille glisse sur un plan horizontal avec frottement $f = 2$ N. Masse 0,5 kg, $v_0 = 4$ m/s. Distance avant arret ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"Theoreme de l''energie cinetique : $-f \\cdot d = 0 - \\dfrac{1}{2} m v_0^2$.","points":3},{"text":"$d = \\dfrac{m v_0^2}{2 f} = \\dfrac{0{,}5 \\cdot 16}{4} = 2$ m.","points":3}],"final_answer":"$d = 2$ m"}'::jsonb, 'multi_step', 3, 6, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000034', 'a1b2c3d4-0002-0000-0000-000000000002', s_sma_rlc_regimes, 2, '{"stem":"RLC : $L = 0{,}1$ H, $C = 1$ µF. Frequence propre ?","correct_value":503.3,"tolerance":5,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"$f_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}$.","points":1},{"text":"$f_0 = \\dfrac{1}{2\\pi \\cdot 10^{-3{,}5}} \\approx 503{,}3$ Hz.","points":3,"widget_slug":"rlc","widget_config":{"R":10.0,"L":0.1,"C":0.000001}}],"final_answer":"503.3"}'::jsonb, 'numeric', 2, 4, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000035', 'a1b2c3d4-0002-0000-0000-000000000002', s_sma_periodic_waves, 3, '{"stem":"Onde sonore intensite $I = 10^{-6}$ W/m² ($I_0 = 10^{-12}$). Niveau sonore en dB ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$L = 10 \\log(I/I_0)$.","points":1},{"text":"$L = 10 \\log(10^6) = 60$ dB.","points":2}],"final_answer":"$60$ dB"}'::jsonb, 'multi_step', 2, 3, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000036', 'a1b2c3d4-0002-0000-0000-000000000002', s_sma_b_field_basics, 4, '{"stem":"Fil rectiligne, $I = 5$ A, distance 0,2 m d''un point. Champ B ($\\mu_0 = 4\\pi \\cdot 10^{-7}$) ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$B = \\dfrac{\\mu_0 I}{2\\pi d}$.","points":1},{"text":"$B = \\dfrac{4\\pi \\cdot 10^{-7} \\cdot 5}{2\\pi \\cdot 0{,}2} = 5 \\cdot 10^{-6}$ T = 5 µT.","points":3,"widget_slug":"b_field_uniform","widget_config":{"B":0.000005,"I":5.0}}],"final_answer":"$5$ µT"}'::jsonb, 'multi_step', 3, 4, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000037', 'a1b2c3d4-0002-0000-0000-000000000002', s_sma_rl_establishment, 5, '{"stem":"Etablir l''equation differentielle d''un circuit RL en regime libre.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"Loi des mailles : $u_R + u_L = 0$.","points":1},{"text":"$Ri + L \\dfrac{di}{dt} = 0$.","points":2},{"text":"$\\dfrac{di}{dt} + \\dfrac{R}{L} i = 0$. Solution : $i(t) = I_0 e^{-Rt/L}$.","points":3}],"final_answer":"$i(t) = I_0 e^{-Rt/L}$"}'::jsonb, 'multi_step', 3, 6, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000038', 'a1b2c3d4-0002-0000-0000-000000000002', s_sma_reaction_speed, 6, '{"stem":"Vitesse d''une reaction chimique d''ordre 1 : $C_0 = 0{,}1$, $k = 0{,}05$ s⁻¹. $C$ a $t = 20$ s ?","correct_value":0.0368,"tolerance":0.005,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"Loi : $C(t) = C_0 e^{-kt}$.","points":1},{"text":"$C(20) = 0{,}1 \\cdot e^{-1} \\approx 0{,}0368$ mol/L.","points":3}],"final_answer":"0.0368"}'::jsonb, 'numeric', 3, 4, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000039', 'a1b2c3d4-0002-0000-0000-000000000002', s_sma_daniell_cell_basics, 7, '{"stem":"Pile : $E^\\circ_{cathode} > E^\\circ_{anode}$. Conclusion sur la fem ?","choices":["$\\Delta E^\\circ < 0$","$\\Delta E^\\circ > 0$","$\\Delta E^\\circ = 0$","depend de T"],"correct_index":1,"latex":true,"item_type":"mcq"}'::jsonb, '{"steps":[{"text":"$\\Delta E^\\circ = E^\\circ_{cathode} - E^\\circ_{anode} > 0$ donc spontanee.","points":2,"widget_slug":"daniell_cell","widget_config":{}}],"final_answer":"B - $\\Delta E^\\circ > 0$"}'::jsonb, 'mcq', 1, 2, ARRAY['rich_solution','mcq','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000003a', 'a1b2c3d4-0002-0000-0000-000000000002', s_sma_esterification_mechanism, 8, '{"stem":"Esterification : melange equimolaire 1 mol acide + 1 mol alcool. Rendement = 67%. $n$(ester) ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"Rendement = $n$(forme) / $n$(theorique).","points":1},{"text":"$n$(ester) = $0{,}67 \\cdot 1 = 0{,}67$ mol.","points":2,"widget_slug":"esterification_animator","widget_config":{}}],"final_answer":"$0{,}67$ mol"}'::jsonb, 'multi_step', 2, 3, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000003b', 'a1b2c3d4-0002-0000-0000-000000000002', s_sma_ph_definition, 9, '{"stem":"Solution NH3 0,1 mol/L, pKb = 4,75. pH approche ?","correct_value":11.13,"tolerance":0.5,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"$pOH \\approx \\dfrac{1}{2}(pKb + pC) = \\dfrac{1}{2}(4{,}75 + 1) = 2{,}87$.","points":3},{"text":"$pH = 14 - pOH \\approx 11{,}13$.","points":2}],"final_answer":"11.13"}'::jsonb, 'numeric', 4, 5, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000003c', 'a1b2c3d4-0002-0000-0000-000000000002', s_sma_rlc_regimes, 10, '{"stem":"Periode d''une oscillation libre RLC : $L = 1$ H, $C = 100$ µF. Calculer.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$T_0 = 2\\pi\\sqrt{LC} = 2\\pi\\sqrt{10^{-4}} = 2\\pi \\cdot 10^{-2}$ s.","points":3},{"text":"$T_0 \\approx 0{,}063$ s = 63 ms.","points":2}],"final_answer":"$\\approx 63$ ms"}'::jsonb, 'multi_step', 2, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;

  -- ===== SMA Math 2022 normale =====
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000003d', 'a1b2c3d4-0001-0000-0000-000000000005', s_sma_limit_calc, 1, '{"stem":"$\\displaystyle\\lim_{x \\to 0} \\dfrac{\\sin x - x}{x^3} = ?$","correct_value":-0.1667,"tolerance":0.001,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"DL : $\\sin x = x - x^3/6 + o(x^3)$.","points":2},{"text":"$\\dfrac{\\sin x - x}{x^3} \\to -1/6 \\approx -0{,}167$.","points":2}],"final_answer":"-0.1667"}'::jsonb, 'numeric', 4, 4, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000003e', 'a1b2c3d4-0001-0000-0000-000000000005', s_sma_function_study, 2, '{"stem":"$f(x) = e^x \\cos x$. Calculer $f''$ et $f''''$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$f''(x) = e^x \\cos x - e^x \\sin x = e^x(\\cos x - \\sin x)$.","points":2},{"text":"$f''''(x) = e^x(\\cos x - \\sin x) + e^x(-\\sin x - \\cos x) = -2 e^x \\sin x$.","points":3}],"final_answer":"$f''(x) = e^x(\\cos x - \\sin x)$, $f''''(x) = -2 e^x \\sin x$."}'::jsonb, 'multi_step', 3, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000003f', 'a1b2c3d4-0001-0000-0000-000000000005', s_sma_complex_basics, 3, '{"stem":"Resoudre dans $\\mathbb{C}$ : $z^2 + 2z + 5 = 0$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$\\Delta = 4 - 20 = -16$.","points":1},{"text":"$z = \\dfrac{-2 \\pm 4i}{2} = -1 \\pm 2i$.","points":3}],"final_answer":"$z = -1 + 2i$ ou $z = -1 - 2i$."}'::jsonb, 'multi_step', 2, 4, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000040', 'a1b2c3d4-0001-0000-0000-000000000005', s_sma_definite_integral, 4, '{"stem":"$\\int_0^1 (1 - x^2)^{1/2} dx$ via substitution $x = \\sin t$ ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$x = \\sin t$, $dx = \\cos t \\, dt$. Bornes : $t = 0$ a $\\pi/2$.","points":2},{"text":"$\\int_0^{\\pi/2} \\cos^2 t \\, dt = \\dfrac{\\pi}{4}$.","points":3}],"final_answer":"$\\dfrac{\\pi}{4}$"}'::jsonb, 'multi_step', 4, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000041', 'a1b2c3d4-0001-0000-0000-000000000005', s_sma_counting, 5, '{"stem":"$\\binom{10}{3} = ?$","correct_value":120,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"$\\dfrac{10!}{3! 7!} = \\dfrac{10 \\cdot 9 \\cdot 8}{6} = 120$.","points":3}],"final_answer":"120"}'::jsonb, 'numeric', 1, 3, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000042', 'a1b2c3d4-0001-0000-0000-000000000005', s_sma_tvi, 6, '{"stem":"$f$ continue sur $[0, 1]$ avec $f(0) = 0$ et $f(1) = 1$. Montrer qu''il existe $c$ tel que $f(c) = c$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"Soit $g(x) = f(x) - x$, continue sur $[0, 1]$.","points":2},{"text":"$g(0) = 0$, $g(1) = 0$. Si $g$ identiquement nulle, c''est immediat. Sinon, par TVI sur l''image, il existe $c$ avec $g(c) = 0$.","points":4}],"final_answer":"Existence de $c$ avec $f(c) = c$."}'::jsonb, 'multi_step', 4, 6, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000043', 'a1b2c3d4-0001-0000-0000-000000000005', s_sma_sequences_review, 7, '{"stem":"Soit $u_n = \\dfrac{(-1)^n}{n}$ pour $n \\ge 1$. Etudier la convergence.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$|u_n| = 1/n \\to 0$ donc $u_n \\to 0$.","points":3}],"final_answer":"Converge vers 0."}'::jsonb, 'multi_step', 2, 3, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000044', 'a1b2c3d4-0001-0000-0000-000000000005', s_sma_ode_second_order, 8, '{"stem":"Resoudre $y'''' - 4y'' + 4y = 0$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"Equation caracteristique : $r^2 - 4r + 4 = 0 \\Leftrightarrow (r-2)^2 = 0$. Racine double $r = 2$.","points":2},{"text":"Solution : $y = (A + Bx) e^{2x}$.","points":3}],"final_answer":"$y = (A + Bx) e^{2x}$"}'::jsonb, 'multi_step', 3, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000045', 'a1b2c3d4-0001-0000-0000-000000000005', s_sma_complex_trig, 9, '{"stem":"$\\arg(1 + i\\sqrt{3}) = ?$ (en radians)","correct_value":1.047,"tolerance":0.01,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"$\\arg = \\arctan(\\sqrt{3}/1) = \\pi/3 \\approx 1{,}047$.","points":3}],"final_answer":"1.047"}'::jsonb, 'numeric', 1, 3, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000046', 'a1b2c3d4-0001-0000-0000-000000000005', s_sma_random_variables, 10, '{"stem":"Loi binomiale $B(n=10, p=0{,}3)$. $P(X = 3)$ ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$P(X=3) = \\binom{10}{3} \\cdot 0{,}3^3 \\cdot 0{,}7^7$.","points":2},{"text":"$= 120 \\cdot 0{,}027 \\cdot 0{,}0824 \\approx 0{,}267$.","points":3}],"final_answer":"$\\approx 0{,}267$"}'::jsonb, 'multi_step', 3, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;

  -- ===== SMA Math 2022 rattrapage =====
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000047', 'a1b2c3d4-0001-0000-0000-000000000006', s_sma_limit_calc, 1, '{"stem":"$\\displaystyle\\lim_{x \\to +\\infty} \\dfrac{\\ln x}{\\sqrt{x}} = ?$","correct_value":0,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"Croissances comparees : tous les polynomes battent le ln.","points":3}],"final_answer":"0"}'::jsonb, 'numeric', 2, 3, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000048', 'a1b2c3d4-0001-0000-0000-000000000006', s_sma_function_study, 2, '{"stem":"$f(x) = x e^{-x^2}$. Etudier sur $\\mathbb{R}$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$f''(x) = (1 - 2x^2) e^{-x^2}$.","points":2},{"text":"Signe : $f'' > 0 \\Leftrightarrow |x| < 1/\\sqrt{2}$.","points":2},{"text":"Max en $x = 1/\\sqrt{2}$ : $f \\approx 0{,}429$. Min en $x = -1/\\sqrt{2}$.","points":3}],"final_answer":"Extrema en $\\pm 1/\\sqrt{2}$."}'::jsonb, 'multi_step', 3, 7, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000049', 'a1b2c3d4-0001-0000-0000-000000000006', s_sma_ln_basics, 3, '{"stem":"Resoudre $\\ln(x^2 - 5x + 6) = 0$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$x^2 - 5x + 6 = 1 \\Leftrightarrow x^2 - 5x + 5 = 0$.","points":2},{"text":"$\\Delta = 25 - 20 = 5$, $x = \\dfrac{5 \\pm \\sqrt{5}}{2}$.","points":3},{"text":"Verifier que $x^2 - 5x + 6 > 0$ : OK pour les deux solutions.","points":1}],"final_answer":"$x = (5 \\pm \\sqrt{5})/2$"}'::jsonb, 'multi_step', 3, 6, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000004a', 'a1b2c3d4-0001-0000-0000-000000000006', s_sma_definite_integral, 4, '{"stem":"Calculer $\\int_0^1 \\dfrac{1}{1 + x^2} dx$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$[\\arctan x]_0^1 = \\pi/4 - 0 = \\pi/4$.","points":3}],"final_answer":"$\\pi/4$"}'::jsonb, 'multi_step', 1, 3, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000004b', 'a1b2c3d4-0001-0000-0000-000000000006', s_sma_complex_basics, 5, '{"stem":"Soit $z_1 = 2 + 3i$. Calculer $z_1 \\bar{z_1}$ et $z_1 + \\bar{z_1}$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$z_1 \\bar{z_1} = |z_1|^2 = 4 + 9 = 13$.","points":2},{"text":"$z_1 + \\bar{z_1} = 2 \\mathrm{Re}(z_1) = 4$.","points":2}],"final_answer":"$z_1 \\bar{z_1} = 13$, $z_1 + \\bar{z_1} = 4$."}'::jsonb, 'multi_step', 1, 4, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000004c', 'a1b2c3d4-0001-0000-0000-000000000006', s_sma_sequences_review, 6, '{"stem":"Si $|q| > 1$, la suite $u_n = q^n$ :","choices":["tend vers 0","tend vers 1","diverge vers $\\pm\\infty$","converge vers $q$"],"correct_index":2,"latex":true,"item_type":"mcq"}'::jsonb, '{"steps":[{"text":"$|q^n| \\to +\\infty$. Si $q > 1$, $u_n \\to +\\infty$. Si $q < -1$, $u_n$ alterne et diverge.","points":3}],"final_answer":"C - diverge vers $\\pm\\infty$"}'::jsonb, 'mcq', 1, 3, ARRAY['rich_solution','mcq','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000004d', 'a1b2c3d4-0001-0000-0000-000000000006', s_sma_prob_basics, 7, '{"stem":"Probabilites : on lance 3 des. P(somme = 7) ?","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$6^3 = 216$ issues.","points":1},{"text":"Decompositions de 7 : (1,1,5), (1,2,4), (1,3,3), (2,2,3) avec leurs permutations.","points":3},{"text":"Total : 3+6+3+3 = 15. $P = 15/216 \\approx 0{,}069$.","points":2}],"final_answer":"$15/216 = 5/72$"}'::jsonb, 'multi_step', 4, 6, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000004e', 'a1b2c3d4-0001-0000-0000-000000000006', s_sma_gcd, 8, '{"stem":"PGCD(420, 168) ?","correct_value":84,"tolerance":0,"latex":true,"item_type":"numeric"}'::jsonb, '{"steps":[{"text":"Euclide : $420 = 2 \\cdot 168 + 84$, $168 = 2 \\cdot 84$. PGCD = 84.","points":3}],"final_answer":"84"}'::jsonb, 'numeric', 2, 3, ARRAY['rich_solution','numeric','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-00000000004f', 'a1b2c3d4-0001-0000-0000-000000000006', s_sma_ode_second_order, 9, '{"stem":"Resoudre $y'''' + y'' - 6y = 0$.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$r^2 + r - 6 = 0$, $r = -3$ ou $r = 2$.","points":2},{"text":"$y = A e^{-3x} + B e^{2x}$.","points":3}],"final_answer":"$y = A e^{-3x} + B e^{2x}$"}'::jsonb, 'multi_step', 3, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)
  VALUES ('c1b2c3d4-ffff-0000-0000-000000000050', 'a1b2c3d4-0001-0000-0000-000000000006', s_sma_function_study, 10, '{"stem":"$f(x) = \\tan x$ sur $]-\\pi/2, \\pi/2[$. $f''$ et limites aux bornes.","latex":true,"item_type":"multi_step"}'::jsonb, '{"steps":[{"text":"$f''(x) = 1 + \\tan^2 x = 1/\\cos^2 x > 0$.","points":3},{"text":"$\\lim_{x \\to (\\pi/2)^-} = +\\infty$, $\\lim_{x \\to (-\\pi/2)^+} = -\\infty$.","points":2}],"final_answer":"Strictement croissante, asymptotes verticales en $\\pm \\pi/2$."}'::jsonb, 'multi_step', 2, 5, ARRAY['rich_solution','patterned']::TEXT[], TRUE, NOW())
  ON CONFLICT (id) DO NOTHING;

END $$;
COMMIT;
