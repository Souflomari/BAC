-- ============================================================
-- ENGINEERING CONTENT: Résistance des matériaux (2 skills, 14 items)
-- Skills:
--   rdm_traction  (33333333-...-053) difficulty 3 — 7 items
--   rdm_flexion   (33333333-...-054) difficulty 3 — 7 items
-- Items: 44444444-0000-0000-0000-000000000347 → ...360
-- ============================================================

-- =====================
-- SKILL: rdm_traction (Traction et compression) — 7 items
-- Covers: contrainte normale σ=F/S, allongement relatif ε=Δl/l₀,
--         loi de Hooke σ=E×ε, allongement absolu Δl=Fl₀/(ES),
--         condition de résistance σ≤Re/s, dimensionnement S≥F/σ_adm,
--         distinction traction vs compression
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
-- 347: Contrainte normale de traction σ = F/S — numeric
-- F = 10 kN = 10000 N, S = 200 mm²
-- σ = 10000 / 200 = 50 MPa
(
  '44444444-0000-0000-0000-000000000347',
  '33333333-0000-0000-0000-000000000053',
  'numeric', 3, 'fr',
  '{"stem": "Une barre en acier de section S = 200 mm² est soumise à un effort de traction F = 10 kN. Calculer la contrainte normale de traction σ (en MPa).", "correct_value": 50, "tolerance": 0.5, "latex": true}',
  '{"text_fr": "La contrainte normale de traction est donnée par σ = F / S. On convertit F en Newton : F = 10 kN = 10 000 N. Donc σ = 10 000 / 200 = 50 MPa.", "steps": ["Formule : σ = F / S", "Conversion : F = 10 kN = 10 000 N", "σ = 10 000 / 200 = 50 MPa"]}',
  '{"rdm","traction","contrainte_normale","bac_style"}'
),
-- 348: Allongement relatif ε = Δl / l₀ — numeric
-- Δl = 0.3 mm, l₀ = 600 mm
-- ε = 0.3 / 600 = 0.0005 = 5 × 10⁻⁴
-- On demande ε × 10⁴ pour éviter les très petites valeurs → réponse = 5
(
  '44444444-0000-0000-0000-000000000348',
  '33333333-0000-0000-0000-000000000053',
  'numeric', 3, 'fr',
  '{"stem": "Une barre d''acier de longueur initiale l₀ = 600 mm subit un allongement Δl = 0,3 mm sous un effort de traction. Calculer l''allongement relatif ε (×10⁻⁴). Donner la valeur du coefficient devant 10⁻⁴.", "correct_value": 5, "tolerance": 0.1, "latex": true}',
  '{"text_fr": "L''allongement relatif est ε = Δl / l₀ = 0,3 / 600 = 0,0005 = 5 × 10⁻⁴.", "steps": ["Formule : ε = Δl / l₀", "ε = 0,3 / 600 = 0,0005", "ε = 5 × 10⁻⁴"]}',
  '{"rdm","traction","allongement_relatif","bac_style"}'
),
-- 349: Loi de Hooke σ = E × ε — mcq
-- E = 210 GPa = 210 000 MPa, ε = 10⁻³
-- σ = 210 000 × 10⁻³ = 210 MPa
(
  '44444444-0000-0000-0000-000000000349',
  '33333333-0000-0000-0000-000000000053',
  'mcq', 3, 'fr',
  '{"stem": "Un acier a un module de Young E = 210 GPa et subit une déformation ε = 10⁻³. D''après la loi de Hooke, quelle est la contrainte σ ?", "choices": ["210 MPa", "210 kPa", "21 MPa", "2100 MPa"], "correct_index": 0, "latex": true}',
  '{"text_fr": "La loi de Hooke dans le domaine élastique donne σ = E × ε. On convertit E = 210 GPa = 210 000 MPa. Donc σ = 210 000 × 10⁻³ = 210 MPa.", "steps": ["Loi de Hooke : σ = E × ε", "E = 210 GPa = 210 000 MPa", "σ = 210 000 × 10⁻³ = 210 MPa"]}',
  '{"rdm","traction","loi_de_hooke","bac_style"}'
),
-- 350: Allongement absolu Δl = F×l₀ / (E×S) — numeric
-- F = 15 kN = 15000 N, l₀ = 500 mm, E = 210 000 MPa, S = 150 mm²
-- Δl = 15000 × 500 / (210000 × 150) = 7 500 000 / 31 500 000 = 0.2381 mm
-- Δl ≈ 0.238 mm
(
  '44444444-0000-0000-0000-000000000350',
  '33333333-0000-0000-0000-000000000053',
  'numeric', 3, 'fr',
  '{"stem": "Une barre en acier S235 (E = 210 GPa) de longueur l₀ = 500 mm et de section S = 150 mm² est soumise à un effort de traction F = 15 kN. Calculer l''allongement absolu Δl (en mm). Arrondir au centième.", "correct_value": 0.24, "tolerance": 0.01, "latex": true}',
  '{"text_fr": "On utilise la formule Δl = F × l₀ / (E × S). Avec F = 15 000 N, l₀ = 500 mm, E = 210 000 MPa et S = 150 mm² : Δl = (15 000 × 500) / (210 000 × 150) = 7 500 000 / 31 500 000 ≈ 0,24 mm.", "steps": ["Formule : Δl = F × l₀ / (E × S)", "F = 15 kN = 15 000 N ; E = 210 GPa = 210 000 MPa", "Δl = (15 000 × 500) / (210 000 × 150)", "Δl = 7 500 000 / 31 500 000 ≈ 0,238 mm ≈ 0,24 mm"]}',
  '{"rdm","traction","allongement_absolu","bac_style"}'
),
-- 351: Condition de résistance σ ≤ Re/s — numeric
-- Re = 235 MPa, s = 2
-- σ_adm = 235 / 2 = 117.5 MPa
(
  '44444444-0000-0000-0000-000000000351',
  '33333333-0000-0000-0000-000000000053',
  'numeric', 3, 'fr',
  '{"stem": "Une pièce en acier S235 (Re = 235 MPa) est sollicitée en traction. Le coefficient de sécurité est s = 2. Calculer la contrainte admissible σ_adm (en MPa).", "correct_value": 117.5, "tolerance": 0.5, "latex": true}',
  '{"text_fr": "La condition de résistance impose σ ≤ σ_adm avec σ_adm = Re / s. Donc σ_adm = 235 / 2 = 117,5 MPa.", "steps": ["Condition de résistance : σ ≤ σ_adm", "σ_adm = Re / s", "σ_adm = 235 / 2 = 117,5 MPa"]}',
  '{"rdm","traction","condition_resistance","bac_style"}'
),
-- 352: Dimensionnement — section minimale S ≥ F / σ_adm — numeric
-- F = 20 kN = 20000 N, σ_adm = 117.5 MPa
-- S_min = 20000 / 117.5 = 170.21 mm²
-- Arrondi supérieur → 170.22 mm²
(
  '44444444-0000-0000-0000-000000000352',
  '33333333-0000-0000-0000-000000000053',
  'numeric', 4, 'fr',
  '{"stem": "Une tige en acier S235 (Re = 235 MPa) doit supporter un effort de traction F = 20 kN avec un coefficient de sécurité s = 2. Calculer la section minimale S_min (en mm²). Arrondir au mm² supérieur.", "correct_value": 171, "tolerance": 1, "latex": true}',
  '{"text_fr": "On calcule d''abord σ_adm = Re / s = 235 / 2 = 117,5 MPa. Puis S_min = F / σ_adm = 20 000 / 117,5 ≈ 170,21 mm². On arrondit au mm² supérieur : S_min = 171 mm².", "steps": ["σ_adm = Re / s = 235 / 2 = 117,5 MPa", "S_min = F / σ_adm", "S_min = 20 000 / 117,5 ≈ 170,21 mm²", "Arrondi supérieur : S_min = 171 mm²"]}',
  '{"rdm","traction","dimensionnement","bac_style"}'
),
-- 353: Distinction traction vs compression — true_false
(
  '44444444-0000-0000-0000-000000000353',
  '33333333-0000-0000-0000-000000000053',
  'true_false', 3, 'fr',
  '{"stem": "Lorsqu''une barre est soumise à un effort de compression, la contrainte normale σ est positive.", "correct_answer": false, "latex": true}',
  '{"text_fr": "Faux. Par convention en RDM, un effort de compression produit une contrainte normale négative (σ < 0), tandis qu''un effort de traction produit une contrainte positive (σ > 0). Le signe de σ indique la nature de la sollicitation.", "steps": ["En traction : σ = F/S > 0 (la barre s''allonge)", "En compression : σ = −F/S < 0 (la barre se raccourcit)", "Donc σ en compression est négatif, l''affirmation est fausse"]}',
  '{"rdm","traction","compression","signe_contrainte","bac_style"}'
);

-- =====================
-- SKILL: rdm_flexion (Flexion simple) — 7 items
-- Covers: moment fléchissant Mf, effort tranchant T,
--         contrainte de flexion σ = Mf×y_max/I, I = bh³/12,
--         condition de résistance en flexion, flèche max,
--         diagramme Mf et T
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
-- 354: Moment fléchissant — poutre sur deux appuis, charge concentrée au milieu — numeric
-- Poutre de longueur L = 2 m = 2000 mm, charge F = 6 kN au milieu
-- Réactions : R_A = R_B = F/2 = 3 kN
-- Mf_max au milieu = R_A × L/2 = 3000 × 1000 = 3 000 000 N·mm = 3 kN·m
-- On demande en N·m : Mf_max = 3000 N·m
(
  '44444444-0000-0000-0000-000000000354',
  '33333333-0000-0000-0000-000000000054',
  'numeric', 3, 'fr',
  '{"stem": "Une poutre simplement appuyée de longueur L = 2 m est soumise à une charge concentrée F = 6 kN appliquée au milieu. Calculer le moment fléchissant maximal Mf_max (en N·m).", "correct_value": 3000, "tolerance": 10, "latex": true}',
  '{"text_fr": "Pour une poutre sur deux appuis avec une charge concentrée F au milieu, le moment fléchissant maximal se situe au point d''application de la charge et vaut Mf_max = F × L / 4. Donc Mf_max = 6 000 × 2 / 4 = 3 000 N·m.", "steps": ["Réactions d''appui : R_A = R_B = F/2 = 3 000 N", "Le moment max est au milieu de la poutre", "Mf_max = F × L / 4 = 6 000 × 2 / 4 = 3 000 N·m"]}',
  '{"rdm","flexion","moment_flechissant","bac_style"}'
),
-- 355: Effort tranchant — mcq
-- Même poutre : L = 2 m, F = 6 kN au milieu
-- T entre appui A et le milieu = R_A = +3 kN
-- T entre le milieu et appui B = −R_B = −3 kN
(
  '44444444-0000-0000-0000-000000000355',
  '33333333-0000-0000-0000-000000000054',
  'mcq', 3, 'fr',
  '{"stem": "Une poutre simplement appuyée de longueur L = 2 m supporte une charge concentrée F = 6 kN au milieu. Quelle est la valeur de l''effort tranchant T dans la partie gauche de la poutre (entre l''appui A et le point d''application de F) ?", "choices": ["+3 kN", "+6 kN", "−3 kN", "0 kN"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Les réactions d''appui valent R_A = R_B = F/2 = 3 kN. Dans la partie gauche (0 < x < L/2), l''effort tranchant est constant et égal à T = +R_A = +3 kN.", "steps": ["R_A = R_B = F/2 = 6/2 = 3 kN", "Pour 0 < x < L/2 : T(x) = +R_A", "T = +3 kN"]}',
  '{"rdm","flexion","effort_tranchant","bac_style"}'
),
-- 356: Moment quadratique d'une section rectangulaire I = b×h³/12 — numeric
-- b = 30 mm, h = 60 mm
-- I = 30 × 60³ / 12 = 30 × 216000 / 12 = 6 480 000 / 12 = 540 000 mm⁴
(
  '44444444-0000-0000-0000-000000000356',
  '33333333-0000-0000-0000-000000000054',
  'numeric', 3, 'fr',
  '{"stem": "Une poutre a une section rectangulaire de largeur b = 30 mm et de hauteur h = 60 mm. Calculer le moment quadratique I_GZ de cette section par rapport à l''axe neutre (en mm⁴). Donner le résultat en milliers (÷ 1000).", "correct_value": 540, "tolerance": 5, "latex": true}',
  '{"text_fr": "Le moment quadratique d''une section rectangulaire par rapport à l''axe passant par le centre de gravité est I_GZ = b × h³ / 12. Donc I_GZ = 30 × 60³ / 12 = 30 × 216 000 / 12 = 540 000 mm⁴, soit 540 (×10³ mm⁴).", "steps": ["Formule : I_GZ = b × h³ / 12", "h³ = 60³ = 216 000 mm³", "I_GZ = 30 × 216 000 / 12 = 6 480 000 / 12", "I_GZ = 540 000 mm⁴ = 540 × 10³ mm⁴"]}',
  '{"rdm","flexion","moment_quadratique","bac_style"}'
),
-- 357: Contrainte de flexion σ = Mf × y_max / I — numeric
-- Mf = 3 000 N·m = 3 000 000 N·mm, y_max = h/2 = 30 mm, I = 540 000 mm⁴
-- σ = 3 000 000 × 30 / 540 000 = 90 000 000 / 540 000 = 166.67 MPa
(
  '44444444-0000-0000-0000-000000000357',
  '33333333-0000-0000-0000-000000000054',
  'numeric', 3, 'fr',
  '{"stem": "Une poutre de section rectangulaire (b = 30 mm, h = 60 mm) est soumise à un moment fléchissant Mf = 3 kN·m. Calculer la contrainte maximale de flexion σ_max (en MPa). Arrondir à l''unité.", "correct_value": 167, "tolerance": 1, "latex": true}',
  '{"text_fr": "On calcule d''abord I_GZ = b × h³ / 12 = 30 × 60³ / 12 = 540 000 mm⁴ et y_max = h/2 = 30 mm. La contrainte maximale est σ_max = Mf × y_max / I_GZ = 3 000 000 × 30 / 540 000 ≈ 166,67 MPa ≈ 167 MPa.", "steps": ["I_GZ = b × h³ / 12 = 30 × 216 000 / 12 = 540 000 mm⁴", "y_max = h/2 = 60/2 = 30 mm", "Mf = 3 kN·m = 3 000 000 N·mm", "σ_max = Mf × y_max / I_GZ = 3 000 000 × 30 / 540 000 ≈ 167 MPa"]}',
  '{"rdm","flexion","contrainte_flexion","bac_style"}'
),
-- 358: Condition de résistance en flexion — mcq
-- σ_max = 167 MPa, Re = 235 MPa, s = 2, σ_adm = 117.5 MPa
-- 167 > 117.5 → la condition n'est PAS vérifiée
(
  '44444444-0000-0000-0000-000000000358',
  '33333333-0000-0000-0000-000000000054',
  'mcq', 4, 'fr',
  '{"stem": "Une poutre en acier S235 (Re = 235 MPa) est soumise à une contrainte maximale de flexion σ_max = 167 MPa. Le coefficient de sécurité exigé est s = 2. La condition de résistance est-elle vérifiée ?", "choices": ["Non, car σ_max > σ_adm = 117,5 MPa", "Oui, car σ_max < Re = 235 MPa", "Oui, car σ_max < σ_adm = 235 MPa", "Non, car σ_max > Re = 167 MPa"], "correct_index": 0, "latex": true}',
  '{"text_fr": "La contrainte admissible est σ_adm = Re / s = 235 / 2 = 117,5 MPa. La condition de résistance exige σ_max ≤ σ_adm. Or σ_max = 167 MPa > 117,5 MPa, donc la condition n''est PAS vérifiée. La poutre est sous-dimensionnée.", "steps": ["σ_adm = Re / s = 235 / 2 = 117,5 MPa", "Condition : σ_max ≤ σ_adm ?", "167 MPa > 117,5 MPa → condition NON vérifiée", "La poutre doit être redimensionnée"]}',
  '{"rdm","flexion","condition_resistance","bac_style"}'
),
-- 359: Flèche maximale — poutre bi-appuyée, charge concentrée au milieu — numeric
-- f = F × L³ / (48 × E × I)
-- F = 5 kN = 5000 N, L = 1.5 m = 1500 mm, E = 210 000 MPa
-- Section rectangulaire b = 40 mm, h = 80 mm → I = 40 × 80³ / 12 = 40 × 512000 / 12 = 20 480 000 / 12 = 1 706 667 mm⁴
-- f = 5000 × 1500³ / (48 × 210000 × 1 706 667)
-- 1500³ = 3 375 000 000
-- Numérateur = 5000 × 3 375 000 000 = 16 875 000 000 000
-- Dénominateur = 48 × 210 000 × 1 706 667 = 48 × 358 400 070 000 = 17 203 203 360 000
-- Wait, let me recompute: 210000 × 1706667 = 358 400 070 000
-- 48 × 358 400 070 000 = 17 203 203 360 000
-- f = 16 875 000 000 000 / 17 203 203 360 000 = 0.981 mm
-- Let me verify: I = 40 × 512000 / 12 = 20480000/12 = 1706666.67 mm⁴
-- 210000 × 1706666.67 = 358 400 000 700 ≈ 358 400 000 000
-- 48 × 358 400 000 000 = 17 203 200 000 000
-- f = 16 875 000 000 000 / 17 203 200 000 000 ≈ 0.981 mm
-- Arrondi : f ≈ 0.98 mm
(
  '44444444-0000-0000-0000-000000000359',
  '33333333-0000-0000-0000-000000000054',
  'numeric', 4, 'fr',
  '{"stem": "Une poutre simplement appuyée de longueur L = 1,5 m et de section rectangulaire (b = 40 mm, h = 80 mm) est en acier (E = 210 GPa). Elle supporte une charge concentrée F = 5 kN au milieu. Calculer la flèche maximale f (en mm). Arrondir au centième.", "correct_value": 0.98, "tolerance": 0.02, "latex": true}',
  '{"text_fr": "On calcule I_GZ = b×h³/12 = 40×80³/12 = 40×512 000/12 ≈ 1 706 667 mm⁴. La flèche maximale pour une charge concentrée au milieu d''une poutre bi-appuyée est f = F×L³/(48×E×I). Avec F = 5 000 N, L = 1 500 mm, E = 210 000 MPa : f = 5 000 × 1 500³ / (48 × 210 000 × 1 706 667) ≈ 0,98 mm.", "steps": ["I_GZ = b × h³ / 12 = 40 × 512 000 / 12 ≈ 1 706 667 mm⁴", "Formule : f = F × L³ / (48 × E × I)", "L³ = 1 500³ = 3,375 × 10⁹ mm³", "Numérateur = 5 000 × 3,375 × 10⁹ = 16,875 × 10¹² N·mm³", "Dénominateur = 48 × 210 000 × 1 706 667 ≈ 17,203 × 10¹² MPa·mm⁴", "f ≈ 16,875 / 17,203 ≈ 0,98 mm"]}',
  '{"rdm","flexion","fleche_maximale","bac_style"}'
),
-- 360: Diagramme Mf et T — identification — true_false
(
  '44444444-0000-0000-0000-000000000360',
  '33333333-0000-0000-0000-000000000054',
  'true_false', 3, 'fr',
  '{"stem": "Pour une poutre simplement appuyée soumise à une charge concentrée au milieu, le moment fléchissant est maximal au point d''application de la charge et l''effort tranchant y est nul.", "correct_answer": false, "latex": true}',
  '{"text_fr": "Partiellement faux. Le moment fléchissant est bien maximal au point d''application de la charge (Mf_max = F×L/4). En revanche, l''effort tranchant n''est pas nul en ce point : il présente une discontinuité (saut) passant de +F/2 à −F/2. L''effort tranchant change de signe mais n''est pas défini comme nul au point de discontinuité.", "steps": ["Le Mf est maximal au milieu : Mf_max = F × L / 4 ✓", "L''effort tranchant vaut T = +F/2 juste à gauche du milieu", "L''effort tranchant vaut T = −F/2 juste à droite du milieu", "Il y a une discontinuité de T au point de la charge, T n''est pas nul"]}',
  '{"rdm","flexion","diagramme_mf_t","bac_style"}'
);
