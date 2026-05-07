-- ============================================================
-- PHYSICS CONTENT: Ondes (2 skills, 14 items)
-- Topic: Ondes mécaniques et lumineuses
-- Skills:
--   wave_properties  (33333333-...-027) difficulty 2 — 7 items
--   sound_light      (33333333-...-028) difficulty 3 — 7 items
-- ============================================================

-- =====================
-- SKILL: wave_properties (Propriétés des ondes) — 7 items
-- Mix: 3 mcq + 2 numeric + 2 true_false
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000169',
  '33333333-0000-0000-0000-000000000027',
  'mcq', 2, 'fr',
  '{"stem": "Une onde mécanique progressive se propage dans un milieu matériel avec une célérité v = 340 m/s et une fréquence f = 680 Hz. Quelle est sa longueur d''onde λ ?", "choices": ["0,5 m", "1,0 m", "2,0 m", "0,25 m"], "correct_index": 0, "latex": true}',
  '{"text_fr": "On utilise la relation fondamentale λ = v / f. Donc λ = 340 / 680 = 0,5 m.", "steps": ["Relation fondamentale : λ = v / f", "λ = 340 / 680", "λ = 0,5 m"]}',
  '{"ondes","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000170',
  '33333333-0000-0000-0000-000000000027',
  'mcq', 2, 'fr',
  '{"stem": "Une onde transversale se caractérise par :", "choices": ["La direction de la perturbation est perpendiculaire à la direction de propagation", "La direction de la perturbation est parallèle à la direction de propagation", "La perturbation ne se propage pas", "La perturbation se propage uniquement dans le vide"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Par définition, une onde transversale est une onde dont la direction de la perturbation est perpendiculaire à la direction de propagation. Exemple : une onde le long d''une corde.", "steps": ["Onde transversale : perturbation ⊥ propagation", "Onde longitudinale : perturbation ∥ propagation", "Exemple d''onde transversale : onde sur une corde"]}',
  '{"ondes","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000171',
  '33333333-0000-0000-0000-000000000027',
  'numeric', 2, 'fr',
  '{"stem": "Une onde mécanique se propage le long d''une corde avec une célérité v = 4,0 m/s. La distance entre la source et un point M de la corde est d = 2,4 m. Calculer le retard temporel τ (en s) de M par rapport à la source.", "correct_value": 0.6, "tolerance": 0.01, "latex": true}',
  '{"text_fr": "Le retard temporel est donné par τ = d / v. Donc τ = 2,4 / 4,0 = 0,6 s.", "steps": ["Formule du retard : τ = d / v", "τ = 2,4 / 4,0", "τ = 0,6 s"]}',
  '{"ondes","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000172',
  '33333333-0000-0000-0000-000000000027',
  'mcq', 3, 'fr',
  '{"stem": "On observe le phénomène de diffraction d''une onde mécanique à la surface de l''eau lorsque :", "choices": ["La largeur de l''ouverture est du même ordre de grandeur que la longueur d''onde", "La largeur de l''ouverture est très grande devant la longueur d''onde", "La fréquence de l''onde est très élevée", "La célérité de l''onde est très grande"], "correct_index": 0, "latex": true}',
  '{"text_fr": "La diffraction est d''autant plus marquée que la taille de l''ouverture a est du même ordre de grandeur que la longueur d''onde λ (a ≈ λ). Quand a >> λ, la diffraction est négligeable.", "steps": ["Condition de diffraction : a ≈ λ (ouverture ≈ longueur d''onde)", "Si a >> λ : pas de diffraction notable", "Si a ≤ λ : diffraction importante"]}',
  '{"ondes","diffraction","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000173',
  '33333333-0000-0000-0000-000000000027',
  'numeric', 3, 'fr',
  '{"stem": "Une onde mécanique a une période T = 0,02 s et se propage avec une célérité v = 250 m/s. Calculer la longueur d''onde λ (en m).", "correct_value": 5.0, "tolerance": 0.1, "latex": true}',
  '{"text_fr": "La fréquence est f = 1/T = 1/0,02 = 50 Hz. La longueur d''onde est λ = v × T = v / f = 250 × 0,02 = 5,0 m.", "steps": ["f = 1 / T = 1 / 0,02 = 50 Hz", "λ = v × T = 250 × 0,02", "λ = 5,0 m", "Vérification : λ = v / f = 250 / 50 = 5,0 m ✓"]}',
  '{"ondes","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000174',
  '33333333-0000-0000-0000-000000000027',
  'true_false', 2, 'fr',
  '{"stem": "Dans un milieu dispersif, la célérité d''une onde dépend de sa fréquence.", "correct_answer": true, "latex": true}',
  '{"text_fr": "Vrai. Par définition, un milieu est dit dispersif si la célérité de propagation de l''onde dépend de la fréquence (ou de la longueur d''onde). Dans un milieu non dispersif, la célérité est la même pour toutes les fréquences.", "steps": ["Milieu dispersif : v dépend de f (ou de λ)", "Milieu non dispersif : v est constante quelle que soit f", "Exemple de milieu dispersif : l''eau pour les ondes mécaniques"]}',
  '{"ondes","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000175',
  '33333333-0000-0000-0000-000000000027',
  'true_false', 2, 'fr',
  '{"stem": "Une onde mécanique peut se propager dans le vide.", "correct_answer": false, "latex": true}',
  '{"text_fr": "Faux. Une onde mécanique a besoin d''un milieu matériel pour se propager. Elle ne peut pas se propager dans le vide. Seules les ondes électromagnétiques (comme la lumière) peuvent se propager dans le vide.", "steps": ["Une onde mécanique nécessite un milieu matériel", "Exemples : son (air), vagues (eau), séisme (sol)", "Les ondes électromagnétiques se propagent dans le vide"]}',
  '{"ondes","bac_style"}'
);

-- =====================
-- SKILL: sound_light (Ondes sonores et lumineuses) — 7 items
-- Mix: 3 mcq + 2 numeric + 2 true_false
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000176',
  '33333333-0000-0000-0000-000000000028',
  'mcq', 3, 'fr',
  '{"stem": "La vitesse du son est plus grande dans :", "choices": ["Les solides", "Les liquides", "Les gaz", "Le vide"], "correct_index": 0, "latex": true}',
  '{"text_fr": "La vitesse du son dépend du milieu de propagation. Elle est la plus élevée dans les solides (environ 5000 m/s dans l''acier), puis dans les liquides (environ 1500 m/s dans l''eau), et la plus faible dans les gaz (environ 340 m/s dans l''air à 20 °C). Le son ne se propage pas dans le vide.", "steps": ["v(solides) > v(liquides) > v(gaz)", "Exemple : v(acier) ≈ 5000 m/s", "v(eau) ≈ 1500 m/s, v(air) ≈ 340 m/s", "Le son ne se propage pas dans le vide"]}',
  '{"ondes","son","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000177',
  '33333333-0000-0000-0000-000000000028',
  'numeric', 3, 'fr',
  '{"stem": "Un émetteur sonore émet un son de fréquence f = 1700 Hz. Il se déplace à la vitesse vₛ = 20 m/s vers un observateur immobile. La vitesse du son dans l''air est v = 340 m/s. Calculer la fréquence f'' (en Hz) perçue par l''observateur (effet Doppler).", "correct_value": 1806, "tolerance": 5, "latex": true}',
  '{"text_fr": "L''effet Doppler pour une source se rapprochant d''un observateur immobile donne : f'' = f × v / (v - vₛ). Donc f'' = 1700 × 340 / (340 - 20) = 1700 × 340 / 320 = 1806,25 Hz ≈ 1806 Hz.", "steps": ["Formule de l''effet Doppler (source se rapproche) : f'' = f × v / (v - vₛ)", "f'' = 1700 × 340 / (340 - 20)", "f'' = 1700 × 340 / 320", "f'' = 578000 / 320 ≈ 1806 Hz"]}',
  '{"ondes","doppler","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000178',
  '33333333-0000-0000-0000-000000000028',
  'mcq', 3, 'fr',
  '{"stem": "Dans l''expérience des fentes de Young, on observe des franges d''interférences. L''interfrange i est donné par la relation :", "choices": ["i = λD / a", "i = a / (λD)", "i = λa / D", "i = D / (λa)"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Dans l''expérience des fentes de Young, l''interfrange est donné par i = λD / a, où λ est la longueur d''onde, D la distance fentes-écran et a la distance entre les deux fentes.", "steps": ["Formule de l''interfrange : i = λD / a", "λ : longueur d''onde de la lumière", "D : distance entre les fentes et l''écran", "a : distance entre les deux fentes"]}',
  '{"ondes","young","interferences","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000179',
  '33333333-0000-0000-0000-000000000028',
  'numeric', 4, 'fr',
  '{"stem": "Dans une expérience des fentes de Young, la distance entre les deux fentes est a = 0,2 mm, la distance fentes-écran est D = 1,5 m et la longueur d''onde utilisée est λ = 600 nm. Calculer l''interfrange i (en mm).", "correct_value": 4.5, "tolerance": 0.1, "latex": true}',
  '{"text_fr": "On applique la formule i = λD / a. Avec λ = 600 × 10⁻⁹ m, D = 1,5 m et a = 0,2 × 10⁻³ m : i = (600 × 10⁻⁹ × 1,5) / (0,2 × 10⁻³) = 9,0 × 10⁻⁷ / (2,0 × 10⁻⁴) = 4,5 × 10⁻³ m = 4,5 mm.", "steps": ["Formule : i = λD / a", "Conversion : λ = 600 nm = 600 × 10⁻⁹ m, a = 0,2 mm = 2,0 × 10⁻⁴ m", "i = (600 × 10⁻⁹ × 1,5) / (2,0 × 10⁻⁴)", "i = 9,0 × 10⁻⁴ / 2,0 × 10⁻¹ = 4,5 × 10⁻³ m", "i = 4,5 mm"]}',
  '{"ondes","young","interferences","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000180',
  '33333333-0000-0000-0000-000000000028',
  'true_false', 3, 'fr',
  '{"stem": "La diffraction de la lumière par une fente de largeur a produit une tache centrale de demi-angle θ = λ / a.", "correct_answer": true, "latex": true}',
  '{"text_fr": "Vrai. Pour la diffraction par une fente simple, le demi-angle de la tache centrale de diffraction est donné par sin(θ) ≈ θ = λ / a (en radians, pour de petits angles). Plus la fente est étroite (a petit), plus la tache de diffraction est large.", "steps": ["Formule de diffraction par une fente : θ = λ / a", "θ en radians (approximation des petits angles)", "Si a diminue, θ augmente : la tache s''élargit", "Si λ augmente, θ augmente aussi"]}',
  '{"ondes","diffraction","lumiere","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000181',
  '33333333-0000-0000-0000-000000000028',
  'mcq', 3, 'fr',
  '{"stem": "Les ondes ultrasonores sont des ondes sonores dont la fréquence est :", "choices": ["Supérieure à 20 kHz", "Inférieure à 20 Hz", "Comprise entre 20 Hz et 20 kHz", "Égale à 440 Hz"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Les ultrasons ont une fréquence supérieure à 20 kHz, au-delà de la limite d''audibilité humaine. Les infrasons ont une fréquence inférieure à 20 Hz. Les sons audibles sont compris entre 20 Hz et 20 kHz.", "steps": ["Infrasons : f < 20 Hz", "Sons audibles : 20 Hz ≤ f ≤ 20 kHz", "Ultrasons : f > 20 kHz"]}',
  '{"ondes","ultrasons","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000182',
  '33333333-0000-0000-0000-000000000028',
  'true_false', 3, 'fr',
  '{"stem": "La lumière blanche est constituée d''une superposition d''ondes monochromatiques de longueurs d''onde comprises entre 400 nm et 800 nm environ.", "correct_answer": true, "latex": true}',
  '{"text_fr": "Vrai. La lumière blanche est une lumière polychromatique qui contient toutes les radiations visibles, de longueur d''onde comprise approximativement entre 400 nm (violet) et 800 nm (rouge). Un prisme ou un réseau permet de décomposer cette lumière en son spectre visible.", "steps": ["Lumière blanche = superposition de toutes les couleurs du spectre visible", "Domaine visible : environ 400 nm (violet) à 800 nm (rouge)", "Décomposition possible par un prisme ou un réseau"]}',
  '{"ondes","spectre","lumiere","bac_style"}'
);
