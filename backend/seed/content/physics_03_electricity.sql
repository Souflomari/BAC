-- ============================================================
-- PHYSICS CONTENT: Electricite (2 skills, 14 items)
-- Topic: Electricite
-- Skills:
--   rc_rl_circuits  (33333333-...-029) difficulty 3 — 7 items
--   rlc_oscillations (33333333-...-030) difficulty 4 — 7 items
-- ============================================================

-- =====================
-- SKILL: rc_rl_circuits (Circuits RC et RL) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000183',
  '33333333-0000-0000-0000-000000000029',
  'numeric', 3, 'fr',
  '{"stem": "Un circuit RC serie est constitue d''une resistance R = 10 k\\u03a9 et d''un condensateur de capacite C = 5 \\u00b5F. Calculer la constante de temps \\u03c4 (en s) du circuit.", "correct_value": 0.05, "tolerance": 0.001, "latex": true}',
  '{"text_fr": "La constante de temps d''un circuit RC est \\u03c4 = R \\u00d7 C. On convertit les unites : R = 10 k\\u03a9 = 10\\u00d710\\u00b3 \\u03a9 et C = 5 \\u00b5F = 5\\u00d710\\u207b\\u2076 F. Donc \\u03c4 = 10\\u00d710\\u00b3 \\u00d7 5\\u00d710\\u207b\\u2076 = 50\\u00d710\\u207b\\u00b3 = 0,05 s.", "steps": ["Formule : \\u03c4 = R \\u00d7 C", "R = 10 k\\u03a9 = 10 000 \\u03a9", "C = 5 \\u00b5F = 5\\u00d710\\u207b\\u2076 F", "\\u03c4 = 10 000 \\u00d7 5\\u00d710\\u207b\\u2076 = 0,05 s"]}',
  '{"constante_de_temps","circuits","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000184',
  '33333333-0000-0000-0000-000000000029',
  'mcq', 3, 'fr',
  '{"stem": "Lors de la charge d''un condensateur dans un circuit RC serie, l''expression de la tension aux bornes du condensateur est :", "choices": ["u_C(t) = E(1 - e^{-t/\\u03c4})", "u_C(t) = E \\u00b7 e^{-t/\\u03c4}", "u_C(t) = E(1 + e^{-t/\\u03c4})", "u_C(t) = E \\u00b7 t/\\u03c4"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Lors de la charge d''un condensateur initialement decharge dans un circuit RC serie alimente par une source de tension E, la tension u_C(t) croit exponentiellement vers E selon u_C(t) = E(1 - e^{-t/\\u03c4}) avec \\u03c4 = RC.", "steps": ["L''equation differentielle de charge est RC \\u00b7 du_C/dt + u_C = E", "La solution est u_C(t) = E(1 - e^{-t/\\u03c4})", "A t = 0 : u_C(0) = E(1 - 1) = 0 (condensateur initialement decharge)", "A t \\u2192 +\\u221e : u_C \\u2192 E (regime permanent)"]}',
  '{"charge_condensateur","circuits","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000185',
  '33333333-0000-0000-0000-000000000029',
  'numeric', 3, 'fr',
  '{"stem": "Un condensateur de capacite C = 100 \\u00b5F, initialement charge sous une tension U\\u2080 = 12 V, se decharge a travers une resistance R = 20 k\\u03a9. Calculer la tension u_C (en V) aux bornes du condensateur a l''instant t = 2 s.", "correct_value": 4.41, "tolerance": 0.05, "latex": true}',
  '{"text_fr": "Lors de la decharge, u_C(t) = U\\u2080 \\u00b7 e^{-t/\\u03c4}. On calcule \\u03c4 = RC = 20\\u00d710\\u00b3 \\u00d7 100\\u00d710\\u207b\\u2076 = 2 s. Donc u_C(2) = 12 \\u00d7 e^{-2/2} = 12 \\u00d7 e^{-1} = 12 \\u00d7 0,3679 \\u2248 4,41 V.", "steps": ["Formule de decharge : u_C(t) = U\\u2080 \\u00b7 e^{-t/\\u03c4}", "\\u03c4 = RC = 20\\u00d710\\u00b3 \\u00d7 100\\u00d710\\u207b\\u2076 = 2 s", "u_C(2) = 12 \\u00d7 e^{-2/2} = 12 \\u00d7 e^{-1}", "u_C(2) = 12 \\u00d7 0,3679 \\u2248 4,41 V"]}',
  '{"decharge_condensateur","circuits","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000186',
  '33333333-0000-0000-0000-000000000029',
  'numeric', 4, 'fr',
  '{"stem": "Un condensateur de capacite C = 47 \\u00b5F est charge sous une tension U = 20 V. Calculer l''energie E_C (en mJ) stockee dans le condensateur.", "correct_value": 9.4, "tolerance": 0.1, "latex": true}',
  '{"text_fr": "L''energie stockee dans un condensateur est E_C = \\u00bdCU\\u00b2. E_C = 0,5 \\u00d7 47\\u00d710\\u207b\\u2076 \\u00d7 20\\u00b2 = 0,5 \\u00d7 47\\u00d710\\u207b\\u2076 \\u00d7 400 = 9,4\\u00d710\\u207b\\u00b3 J = 9,4 mJ.", "steps": ["Formule : E_C = \\u00bdCU\\u00b2", "E_C = 0,5 \\u00d7 47\\u00d710\\u207b\\u2076 \\u00d7 (20)\\u00b2", "E_C = 0,5 \\u00d7 47\\u00d710\\u207b\\u2076 \\u00d7 400", "E_C = 9400\\u00d710\\u207b\\u2076 J = 9,4\\u00d710\\u207b\\u00b3 J = 9,4 mJ"]}',
  '{"energie","condensateur","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000187',
  '33333333-0000-0000-0000-000000000029',
  'mcq', 3, 'fr',
  '{"stem": "Dans un circuit RL serie alimente par un generateur de tension E, l''expression de l''intensite du courant lors de l''etablissement est :", "choices": ["i(t) = (E/R)(1 - e^{-t/\\u03c4})", "i(t) = (E/R) \\u00b7 e^{-t/\\u03c4}", "i(t) = (E/L)(1 - e^{-t/\\u03c4})", "i(t) = E \\u00b7 (1 - e^{-t/\\u03c4})"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Lors de l''etablissement du courant dans un circuit RL serie, l''intensite croit exponentiellement de 0 vers E/R selon i(t) = (E/R)(1 - e^{-t/\\u03c4}) avec \\u03c4 = L/R.", "steps": ["L''equation differentielle est L \\u00b7 di/dt + Ri = E", "La solution est i(t) = (E/R)(1 - e^{-t/\\u03c4}) avec \\u03c4 = L/R", "A t = 0 : i(0) = 0 (pas de courant initial)", "A t \\u2192 +\\u221e : i \\u2192 E/R (regime permanent)"]}',
  '{"etablissement_courant","circuits","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000188',
  '33333333-0000-0000-0000-000000000029',
  'true_false', 3, 'fr',
  '{"stem": "Dans un circuit RL serie, la constante de temps est \\u03c4 = L \\u00d7 R.", "correct_answer": false, "latex": true}',
  '{"text_fr": "Faux. La constante de temps d''un circuit RL est \\u03c4 = L/R (et non L \\u00d7 R). Verification dimensionnelle : [L/R] = H/\\u03a9 = (V\\u00b7s/A)/(V/A) = s, ce qui est bien homogene a un temps.", "steps": ["La constante de temps d''un circuit RL est \\u03c4 = L/R", "Ne pas confondre avec \\u03c4 = RC pour un circuit RC", "Verification dimensionnelle : [L/R] = H/\\u03a9", "[H] = V\\u00b7s/A et [\\u03a9] = V/A, donc L/R a la dimension d''un temps"]}',
  '{"constante_de_temps","piege_classique","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000189',
  '33333333-0000-0000-0000-000000000029',
  'numeric', 4, 'fr',
  '{"stem": "Une bobine d''inductance L = 0,5 H est parcourue par un courant d''intensite I = 3 A en regime permanent. Calculer l''energie E_L (en J) stockee dans la bobine.", "correct_value": 2.25, "tolerance": 0.01, "latex": true}',
  '{"text_fr": "L''energie stockee dans une bobine est E_L = \\u00bdLI\\u00b2. E_L = 0,5 \\u00d7 0,5 \\u00d7 3\\u00b2 = 0,5 \\u00d7 0,5 \\u00d7 9 = 2,25 J.", "steps": ["Formule : E_L = \\u00bdLI\\u00b2", "E_L = 0,5 \\u00d7 0,5 \\u00d7 (3)\\u00b2", "E_L = 0,5 \\u00d7 0,5 \\u00d7 9", "E_L = 2,25 J"]}',
  '{"energie","bobine","bac_style"}'
);

-- =====================
-- SKILL: rlc_oscillations (Oscillations RLC) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000190',
  '33333333-0000-0000-0000-000000000030',
  'numeric', 4, 'fr',
  '{"stem": "Un circuit LC est constitue d''une bobine d''inductance L = 0,1 H et d''un condensateur de capacite C = 10 \\u00b5F. Calculer la pulsation propre \\u03c9\\u2080 (en rad/s) des oscillations libres non amorties.", "correct_value": 1000, "tolerance": 5, "latex": true}',
  '{"text_fr": "La pulsation propre d''un circuit LC est \\u03c9\\u2080 = 1/\\u221a(LC). \\u03c9\\u2080 = 1/\\u221a(0,1 \\u00d7 10\\u00d710\\u207b\\u2076) = 1/\\u221a(10\\u207b\\u2076) = 1/10\\u207b\\u00b3 = 1000 rad/s.", "steps": ["Formule : \\u03c9\\u2080 = 1/\\u221a(LC)", "LC = 0,1 \\u00d7 10\\u00d710\\u207b\\u2076 = 10\\u207b\\u2076", "\\u221a(LC) = \\u221a(10\\u207b\\u2076) = 10\\u207b\\u00b3", "\\u03c9\\u2080 = 1/10\\u207b\\u00b3 = 1000 rad/s"]}',
  '{"pulsation_propre","oscillations","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000191',
  '33333333-0000-0000-0000-000000000030',
  'mcq', 4, 'fr',
  '{"stem": "L''equation differentielle qui regit les oscillations libres de la charge q dans un circuit RLC serie est :", "choices": ["L \\u00b7 d\\u00b2q/dt\\u00b2 + R \\u00b7 dq/dt + q/C = 0", "L \\u00b7 dq/dt + R \\u00b7 q + q/C = 0", "L \\u00b7 d\\u00b2q/dt\\u00b2 + R \\u00b7 q + C \\u00b7 dq/dt = 0", "d\\u00b2q/dt\\u00b2 + R \\u00b7 dq/dt + LC \\u00b7 q = 0"], "correct_index": 0, "latex": true}',
  '{"text_fr": "En appliquant la loi des mailles dans un circuit RLC serie : u_L + u_R + u_C = 0, soit L \\u00b7 di/dt + Ri + q/C = 0. Comme i = dq/dt, on obtient L \\u00b7 d\\u00b2q/dt\\u00b2 + R \\u00b7 dq/dt + q/C = 0.", "steps": ["Loi des mailles : u_L + u_R + u_C = 0", "u_L = L \\u00b7 di/dt, u_R = Ri, u_C = q/C", "L \\u00b7 di/dt + Ri + q/C = 0", "Or i = dq/dt, donc L \\u00b7 d\\u00b2q/dt\\u00b2 + R \\u00b7 dq/dt + q/C = 0"]}',
  '{"equation_differentielle","oscillations","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000192',
  '33333333-0000-0000-0000-000000000030',
  'numeric', 4, 'fr',
  '{"stem": "Un circuit LC ideal a une pulsation propre \\u03c9\\u2080 = 500 rad/s. Calculer la periode propre T\\u2080 (en ms) des oscillations.", "correct_value": 12.57, "tolerance": 0.1, "latex": true}',
  '{"text_fr": "La periode propre est T\\u2080 = 2\\u03c0/\\u03c9\\u2080. T\\u2080 = 2\\u03c0/500 = 6,2832/500 = 0,01257 s = 12,57 ms.", "steps": ["Formule : T\\u2080 = 2\\u03c0/\\u03c9\\u2080", "T\\u2080 = 2 \\u00d7 3,1416 / 500", "T\\u2080 = 6,2832 / 500", "T\\u2080 = 0,01257 s = 12,57 ms"]}',
  '{"periode_propre","oscillations","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000193',
  '33333333-0000-0000-0000-000000000030',
  'true_false', 4, 'fr',
  '{"stem": "Dans un circuit RLC serie en regime libre, si la resistance R est suffisamment grande, le regime est apériodique : il n''y a pas d''oscillations.", "correct_answer": true, "latex": true}',
  '{"text_fr": "Vrai. Le regime depend du discriminant de l''equation caracteristique. Si R > 2\\u221a(L/C) (amortissement critique depasse), le regime est apériodique : la charge revient a zero sans osciller. Si R < 2\\u221a(L/C), le regime est pseudo-periodique avec des oscillations amorties.", "steps": ["Equation caracteristique : Lr\\u00b2 + Rr + 1/C = 0", "Discriminant : \\u0394 = R\\u00b2 - 4L/C", "Si \\u0394 > 0 (R > 2\\u221a(L/C)) : regime apériodique", "Si \\u0394 < 0 (R < 2\\u221a(L/C)) : regime pseudo-periodique"]}',
  '{"regime_aperiodique","oscillations","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000194',
  '33333333-0000-0000-0000-000000000030',
  'numeric', 5, 'fr',
  '{"stem": "Un circuit RLC serie a les caracteristiques suivantes : L = 0,2 H, C = 50 \\u00b5F, R = 20 \\u03a9. Calculer le facteur de qualite Q du circuit.", "correct_value": 3.16, "tolerance": 0.05, "latex": true}',
  '{"text_fr": "Le facteur de qualite est Q = (1/R)\\u221a(L/C). Q = (1/20)\\u221a(0,2/(50\\u00d710\\u207b\\u2076)) = (1/20)\\u221a(4000) = (1/20) \\u00d7 63,25 = 3,16.", "steps": ["Formule : Q = (1/R)\\u221a(L/C)", "L/C = 0,2 / (50\\u00d710\\u207b\\u2076) = 0,2 / 0,00005 = 4000", "\\u221a(L/C) = \\u221a4000 = 63,25", "Q = 63,25 / 20 = 3,16"]}',
  '{"facteur_qualite","oscillations","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000195',
  '33333333-0000-0000-0000-000000000030',
  'mcq', 4, 'fr',
  '{"stem": "Dans un circuit RLC serie en oscillations forcees, la resonance d''intensite se produit lorsque :", "choices": ["La pulsation du generateur est egale a la pulsation propre \\u03c9\\u2080 = 1/\\u221a(LC)", "La resistance R est nulle", "La capacite C tend vers l''infini", "La pulsation du generateur est egale a R/L"], "correct_index": 0, "latex": true}',
  '{"text_fr": "En oscillations forcees, la resonance d''intensite a lieu quand la pulsation \\u03c9 du generateur est egale a la pulsation propre \\u03c9\\u2080 = 1/\\u221a(LC). A la resonance, l''impedance du circuit est minimale et egale a R, et l''intensite est maximale (I_max = E/R).", "steps": ["L''impedance du circuit RLC serie est Z = \\u221a(R\\u00b2 + (L\\u03c9 - 1/(C\\u03c9))\\u00b2)", "Z est minimale quand L\\u03c9 = 1/(C\\u03c9), soit \\u03c9\\u00b2 = 1/(LC)", "Donc \\u03c9 = 1/\\u221a(LC) = \\u03c9\\u2080", "A la resonance : Z = R et I_max = E/R"]}',
  '{"resonance","oscillations_forcees","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000196',
  '33333333-0000-0000-0000-000000000030',
  'numeric', 4, 'fr',
  '{"stem": "Un circuit RLC serie en regime pseudo-periodique a une pseudo-periode T = 15 ms. On observe que le condensateur effectue 10 pseudo-periodes avant que les oscillations deviennent negligeables. Estimer la duree (en ms) du regime transitoire.", "correct_value": 150, "tolerance": 5, "latex": true}',
  '{"text_fr": "Si le circuit effectue 10 pseudo-periodes avant que les oscillations deviennent negligeables, la duree du regime transitoire est environ 10 \\u00d7 T = 10 \\u00d7 15 = 150 ms.", "steps": ["Duree du regime transitoire \\u2248 nombre de pseudo-periodes \\u00d7 T", "Duree \\u2248 10 \\u00d7 15 ms", "Duree \\u2248 150 ms"]}',
  '{"regime_transitoire","pseudo_periode","bac_style"}'
);
