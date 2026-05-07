-- ============================================================
-- MATH CONTENT: Nombres complexes (3 skills, 19 items)
-- Topic: 22222222-0000-0000-0000-000000000006
-- Skills:
--   complex_basics   (33333333-...-019) difficulty 2 — 7 items
--   complex_trig     (33333333-...-020) difficulty 3 — 6 items
--   complex_geometry (33333333-...-021) difficulty 4 — 6 items
-- ============================================================

-- =====================
-- SKILL: complex_basics (Opérations sur les nombres complexes) — 7 items
-- Difficulties: 1, 2, 2, 2, 2, 3, 3
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000117',
  '33333333-0000-0000-0000-000000000019',
  'true_false', 1, 'fr',
  '{"stem": "On a i² = -1.", "correct_answer": true}',
  '{"text_fr": "Vrai. Par définition, le nombre imaginaire i vérifie i² = -1. C''est la propriété fondamentale qui définit l''ensemble des nombres complexes ℂ.", "steps": ["Le nombre i est défini comme solution de l''équation x² = -1", "Par convention, i² = -1"]}',
  '{"fondamentaux","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000118',
  '33333333-0000-0000-0000-000000000019',
  'mcq', 2, 'fr',
  '{"stem": "Soit z = 3 + 2i et z'' = 1 - 4i. Calculer z + z''.", "choices": ["4 - 2i", "4 + 2i", "2 + 6i", "3 - 8i"], "correct_index": 0, "latex": true}',
  '{"text_fr": "On additionne les parties réelles entre elles et les parties imaginaires entre elles : z + z'' = (3+1) + (2-4)i = 4 - 2i.", "steps": ["z + z'' = (3 + 2i) + (1 - 4i)", "Parties réelles : 3 + 1 = 4", "Parties imaginaires : 2 + (-4) = -2", "z + z'' = 4 - 2i"]}',
  '{"operations","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000119',
  '33333333-0000-0000-0000-000000000019',
  'numeric', 2, 'fr',
  '{"stem": "Soit z = 3 - 4i. Calculer le module |z|.", "correct_value": 5, "tolerance": 0, "latex": true}',
  '{"text_fr": "Le module de z = a + bi est |z| = √(a² + b²). Ici |z| = √(3² + (-4)²) = √(9 + 16) = √25 = 5.", "steps": ["z = 3 - 4i, donc a = 3 et b = -4", "|z| = √(a² + b²) = √(9 + 16)", "|z| = √25 = 5"]}',
  '{"module","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000120',
  '33333333-0000-0000-0000-000000000019',
  'mcq', 2, 'fr',
  '{"stem": "Soit z = 2 + 3i. Le conjugué z̄ de z est :", "choices": ["2 - 3i", "-2 + 3i", "-2 - 3i", "3 + 2i"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Le conjugué de z = a + bi est z̄ = a - bi. On conserve la partie réelle et on change le signe de la partie imaginaire.", "steps": ["z = 2 + 3i", "z̄ = 2 - 3i (on change le signe de la partie imaginaire)"]}',
  '{"conjugue","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000121',
  '33333333-0000-0000-0000-000000000019',
  'numeric', 2, 'fr',
  '{"stem": "Soit z = (1 + i)(2 - 3i). Déterminer la partie réelle de z.", "correct_value": 5, "tolerance": 0, "latex": true}',
  '{"text_fr": "On développe : z = 1×2 + 1×(-3i) + i×2 + i×(-3i) = 2 - 3i + 2i - 3i² = 2 - i - 3×(-1) = 2 - i + 3 = 5 - i. La partie réelle est 5.", "steps": ["z = (1 + i)(2 - 3i)", "z = 2 - 3i + 2i - 3i²", "Or i² = -1, donc -3i² = 3", "z = 2 + 3 + (-3 + 2)i = 5 - i", "Re(z) = 5"]}',
  '{"multiplication","bac_style"}'
);

INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags) VALUES
(
  '44444444-0000-0000-0000-000000000122',
  '33333333-0000-0000-0000-000000000019',
  'mcq', 3, 'fr',
  '{"stem": "Résoudre dans ℂ l''équation z² = -9.", "choices": ["z = 3i ou z = -3i", "z = 3 ou z = -3", "z = 9i ou z = -9i", "L''équation n''a pas de solution"], "correct_index": 0, "latex": true}',
  '{"text_fr": "On cherche z tel que z² = -9. On écrit -9 = 9 × (-1) = 9 × i². Donc z² = (3i)². Les solutions sont z = 3i et z = -3i.", "steps": ["z² = -9", "z² = 9 × (-1) = 9i²", "z² = (3i)²", "z = 3i ou z = -3i"]}',
  '{"text_fr": "Écrivez -9 comme un produit faisant apparaître i²."}',
  '{"equation","bac_style"}'
);

INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags) VALUES
(
  '44444444-0000-0000-0000-000000000123',
  '33333333-0000-0000-0000-000000000019',
  'numeric', 3, 'fr',
  '{"stem": "Soit z = (2 + i)/(1 - i). Calculer le module |z|. Donner la valeur arrondie à 0.01 près.", "correct_value": 1.58, "tolerance": 0.01, "latex": true}',
  '{"text_fr": "On utilise la propriété |z₁/z₂| = |z₁|/|z₂|. |2+i| = √(4+1) = √5 et |1-i| = √(1+1) = √2. Donc |z| = √5/√2 = √(5/2) ≈ 1.58.", "steps": ["|2 + i| = √(2² + 1²) = √5", "|1 - i| = √(1² + 1²) = √2", "|z| = |2+i| / |1-i| = √5 / √2 = √(5/2)", "|z| ≈ 1.58"]}',
  '{"text_fr": "Utilisez la propriété : le module d''un quotient est le quotient des modules."}',
  '{"module","bac_style"}'
);

-- =====================
-- SKILL: complex_trig (Forme trigonométrique et exponentielle) — 6 items
-- Difficulties: 2, 3, 3, 3, 3, 4
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000124',
  '33333333-0000-0000-0000-000000000020',
  'mcq', 2, 'fr',
  '{"stem": "La forme trigonométrique du nombre complexe z = 1 + i est :", "choices": ["√2(cos(π/4) + i·sin(π/4))", "2(cos(π/4) + i·sin(π/4))", "√2(cos(π/3) + i·sin(π/3))", "cos(π/4) + i·sin(π/4)"], "correct_index": 0, "latex": true}',
  '{"text_fr": "On calcule |z| = √(1² + 1²) = √2. L''argument θ vérifie cos θ = 1/√2 et sin θ = 1/√2, donc θ = π/4. Ainsi z = √2(cos(π/4) + i·sin(π/4)).", "steps": ["|z| = √(1 + 1) = √2", "cos θ = Re(z)/|z| = 1/√2", "sin θ = Im(z)/|z| = 1/√2", "θ = π/4", "z = √2(cos(π/4) + i·sin(π/4))"]}',
  '{"forme_trigo","bac_style"}'
);

INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags) VALUES
(
  '44444444-0000-0000-0000-000000000125',
  '33333333-0000-0000-0000-000000000020',
  'numeric', 3, 'fr',
  '{"stem": "Soit z = -1 + i√3. Déterminer l''argument principal de z en radians. Donner la réponse sous forme décimale arrondie à 0.01 près.", "correct_value": 2.09, "tolerance": 0.01, "latex": true}',
  '{"text_fr": "On a |z| = √(1 + 3) = 2. cos θ = -1/2 et sin θ = √3/2. Donc θ = 2π/3 ≈ 2.09 rad.", "steps": ["|z| = √((-1)² + (√3)²) = √(1 + 3) = 2", "cos θ = -1/2 et sin θ = √3/2", "θ est dans le deuxième quadrant", "θ = 2π/3 ≈ 2.09 rad"]}',
  '{"text_fr": "Calculez le module, puis déterminez l''angle à partir de cos θ et sin θ. Attention au quadrant."}',
  '{"argument","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000126',
  '33333333-0000-0000-0000-000000000020',
  'mcq', 3, 'fr',
  '{"stem": "En utilisant la formule de De Moivre, (cos(π/6) + i·sin(π/6))³ est égal à :", "choices": ["i", "-1", "1", "-i"], "correct_index": 0, "latex": true}',
  '{"text_fr": "D''après la formule de De Moivre : (cos θ + i sin θ)ⁿ = cos(nθ) + i sin(nθ). Avec θ = π/6 et n = 3 : cos(3π/6) + i sin(3π/6) = cos(π/2) + i sin(π/2) = 0 + i = i.", "steps": ["Formule de De Moivre : (cos θ + i sin θ)ⁿ = cos(nθ) + i sin(nθ)", "θ = π/6, n = 3", "cos(3 × π/6) + i sin(3 × π/6)", "= cos(π/2) + i sin(π/2)", "= 0 + i·1 = i"]}',
  '{"text_fr": "Appliquez directement la formule de De Moivre en multipliant l''argument par l''exposant."}',
  '{"de_moivre","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000127',
  '33333333-0000-0000-0000-000000000020',
  'true_false', 3, 'fr',
  '{"stem": "La forme exponentielle de z = cos θ + i·sin θ est z = e^(iθ).", "correct_answer": true}',
  '{"text_fr": "Vrai. C''est la formule d''Euler : e^(iθ) = cos θ + i sin θ. Cette écriture est fondamentale en terminale et au Bac. Tout nombre complexe de module 1 s''écrit sous cette forme.", "steps": ["La formule d''Euler énonce que e^(iθ) = cos θ + i sin θ", "Un nombre complexe de module r et d''argument θ s''écrit z = r·e^(iθ)", "Ici r = 1, donc z = e^(iθ)"]}',
  '{"text_fr": "Rappelez-vous la formule d''Euler."}',
  '{"forme_expo","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000128',
  '33333333-0000-0000-0000-000000000020',
  'mcq', 3, 'fr',
  '{"stem": "Soit z = 2e^(iπ/3). La forme algébrique de z est :", "choices": ["1 + i√3", "√3 + i", "1 - i√3", "√3 - i"], "correct_index": 0, "latex": true}',
  '{"text_fr": "z = 2e^(iπ/3) = 2(cos(π/3) + i sin(π/3)) = 2(1/2 + i·√3/2) = 1 + i√3.", "steps": ["z = 2e^(iπ/3) = 2(cos(π/3) + i sin(π/3))", "cos(π/3) = 1/2 et sin(π/3) = √3/2", "z = 2 × 1/2 + 2 × i√3/2", "z = 1 + i√3"]}',
  '{"text_fr": "Utilisez la formule d''Euler pour convertir en forme algébrique : e^(iθ) = cos θ + i sin θ."}',
  '{"conversion","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000129',
  '33333333-0000-0000-0000-000000000020',
  'numeric', 4, 'fr',
  '{"stem": "On pose z = (1 + i)⁶. Calculer la partie réelle de z.", "correct_value": 0, "tolerance": 0, "latex": true}',
  '{"text_fr": "On écrit 1 + i sous forme exponentielle : |1+i| = √2, arg(1+i) = π/4. Donc 1+i = √2·e^(iπ/4). Par De Moivre : (1+i)⁶ = (√2)⁶ · e^(i·6π/4) = 8·e^(i·3π/2) = 8(cos(3π/2) + i sin(3π/2)) = 8(0 - i) = -8i. La partie réelle est 0.", "steps": ["1 + i = √2 · e^(iπ/4)", "(1 + i)⁶ = (√2)⁶ · e^(i × 6π/4)", "(√2)⁶ = 2³ = 8", "e^(i·3π/2) = cos(3π/2) + i sin(3π/2) = 0 - i", "(1 + i)⁶ = 8 × (0 - i) = -8i", "Re(z) = 0"]}',
  '{"text_fr": "Écrivez d''abord 1+i sous forme exponentielle, puis appliquez la formule de De Moivre."}',
  '{"de_moivre","bac_style"}'
);

-- =====================
-- SKILL: complex_geometry (Interprétation géométrique des nombres complexes) — 6 items
-- Difficulties: 3, 3, 4, 4, 4, 5
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, hint, tags) VALUES
(
  '44444444-0000-0000-0000-000000000130',
  '33333333-0000-0000-0000-000000000021',
  'numeric', 3, 'fr',
  '{"stem": "Dans le plan complexe, on considère les points A et B d''affixes respectives z_A = 1 + 2i et z_B = 4 + 6i. Calculer la distance AB.", "correct_value": 5, "tolerance": 0, "latex": true}',
  '{"text_fr": "La distance AB est donnée par |z_B - z_A|. On a z_B - z_A = (4-1) + (6-2)i = 3 + 4i. |3 + 4i| = √(9 + 16) = √25 = 5.", "steps": ["z_B - z_A = (4 + 6i) - (1 + 2i) = 3 + 4i", "AB = |z_B - z_A| = |3 + 4i|", "AB = √(3² + 4²) = √(9 + 16) = √25 = 5"]}',
  '{"text_fr": "La distance entre deux points d''affixes z₁ et z₂ est |z₁ - z₂|."}',
  '{"distance","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000131',
  '33333333-0000-0000-0000-000000000021',
  'mcq', 3, 'fr',
  '{"stem": "Dans le plan complexe, l''ensemble des points M d''affixe z vérifiant |z - 2 + i| = 3 est :", "choices": ["Le cercle de centre (2 ; -1) et de rayon 3", "Le cercle de centre (-2 ; 1) et de rayon 3", "Le cercle de centre (2 ; 1) et de rayon 3", "La droite passant par (2 ; -1)"], "correct_index": 0, "latex": true}',
  '{"text_fr": "|z - 2 + i| = |z - (2 - i)| = 3. C''est l''ensemble des points M à distance 3 du point d''affixe 2 - i, c''est-à-dire le cercle de centre Ω(2 ; -1) et de rayon 3.", "steps": ["|z - 2 + i| = |z - (2 - i)| = 3", "On pose ω = 2 - i, soit le point Ω(2 ; -1)", "|z - ω| = 3 décrit un cercle de centre Ω et de rayon 3"]}',
  '{"text_fr": "Écrivez l''expression sous la forme |z - ω| = r et identifiez le centre et le rayon."}',
  '{"lieu_geometrique","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000132',
  '33333333-0000-0000-0000-000000000021',
  'mcq', 4, 'fr',
  '{"stem": "On considère la transformation z ↦ z'' = iz + 1. L''image du point A d''affixe z_A = 2 + i a pour affixe :", "choices": ["2i", "1 + 2i", "-1 + 2i", "1 - 2i"], "correct_index": 0, "latex": true}',
  '{"text_fr": "z'' = iz_A + 1 = i(2 + i) + 1 = 2i + i² + 1 = 2i - 1 + 1 = 2i. L''image de A est le point d''affixe 2i.", "steps": ["z'' = i × (2 + i) + 1", "z'' = 2i + i² + 1", "Or i² = -1, donc z'' = 2i - 1 + 1", "z'' = 2i"]}',
  '{"text_fr": "Remplacez z par z_A dans l''expression de z'' et développez en utilisant i² = -1."}',
  '{"transformation","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000133',
  '33333333-0000-0000-0000-000000000021',
  'true_false', 4, 'fr',
  '{"stem": "La multiplication par i d''un nombre complexe z correspond géométriquement à une rotation de centre O et d''angle π/2 dans le sens direct.", "correct_answer": true}',
  '{"text_fr": "Vrai. Multiplier par i revient à multiplier par e^(iπ/2). Le module ne change pas (|i| = 1) et l''argument augmente de π/2. C''est donc une rotation de centre O et d''angle π/2.", "steps": ["i = e^(iπ/2) = cos(π/2) + i sin(π/2)", "|i| = 1 donc le module est conservé", "arg(iz) = arg(z) + arg(i) = arg(z) + π/2", "C''est une rotation d''angle π/2 autour de l''origine"]}',
  '{"text_fr": "Écrivez i sous forme exponentielle et interprétez la multiplication."}',
  '{"rotation","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000134',
  '33333333-0000-0000-0000-000000000021',
  'numeric', 4, 'fr',
  '{"stem": "Soit la transformation z ↦ z'' = 2z. On considère le point M d''affixe z = 1 + i. Calculer le module de z''.", "correct_value": 2.83, "tolerance": 0.01, "latex": true}',
  '{"text_fr": "z'' = 2z = 2(1+i) = 2 + 2i. |z''| = √(4 + 4) = √8 = 2√2 ≈ 2.83. C''est une homothétie de centre O et de rapport 2 : le module est multiplié par 2.", "steps": ["z'' = 2 × (1 + i) = 2 + 2i", "|z''| = √(2² + 2²) = √(4 + 4) = √8", "|z''| = 2√2 ≈ 2.83", "Vérification : |z''| = 2 × |z| = 2 × √2 = 2√2"]}',
  '{"text_fr": "Calculez z'' puis son module avec la formule √(a² + b²)."}',
  '{"homothetie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000135',
  '33333333-0000-0000-0000-000000000021',
  'mcq', 5, 'fr',
  '{"stem": "Soient A, B et C les points d''affixes respectives z_A = 1, z_B = i et z_C = -1. On considère l''angle orienté (AB⃗, AC⃗). Sa mesure principale est :", "choices": ["3π/4", "π/4", "π/2", "-π/4"], "correct_index": 1, "latex": true}',
  '{"text_fr": "L''angle orienté (AB⃗, AC⃗) = arg((z_C - z_A)/(z_B - z_A)). On calcule z_C - z_A = -2 et z_B - z_A = i - 1. Donc w = -2/(i - 1). On rationalise en multipliant par le conjugué (-i - 1) : w = -2(-i - 1)/((i - 1)(-i - 1)) = (2i + 2)/2 = 1 + i. Or arg(1 + i) = π/4.", "steps": ["z_B - z_A = i - 1 (affixe du vecteur AB⃗)", "z_C - z_A = -1 - 1 = -2 (affixe du vecteur AC⃗)", "w = (z_C - z_A)/(z_B - z_A) = -2/(i - 1)", "Conjugué de (i - 1) : (-i - 1)", "(i - 1)(-i - 1) = -i² - i + i + 1 = 1 + 1 = 2", "w = -2 × (-i - 1) / 2 = (i + 1) = 1 + i", "arg(1 + i) = π/4"]}',
  '{"text_fr": "L''angle orienté (AB⃗, AC⃗) est l''argument du quotient (z_C - z_A)/(z_B - z_A). Rationalisez le dénominateur."}',
  '{"angle","bac_style"}'
);
