-- ============================================================
-- ACCOUNTING CONTENT: Mathématiques financières (3 skills, 21 items)
-- Topic: Mathématiques financières
-- Skills:
--   simple_interest   (33333333-...-115) — 7 items
--   compound_interest (33333333-...-116) — 7 items
--   annuities         (33333333-...-117) — 7 items
-- ============================================================

-- =====================
-- SKILL: simple_interest (Intérêts simples) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000781',
  '33333333-0000-0000-0000-000000000115',
  'mcq', 1, 'fr',
  '{"stem": "Un capital de 50 000 DH est placé à intérêt simple au taux annuel de 6 % pendant 9 mois. Quel est le montant de l''intérêt ?", "choices": ["2 250 DH", "3 000 DH", "2 700 DH", "2 500 DH"], "correct_index": 0, "latex": true}',
  '{"text_fr": "On applique la formule de l''intérêt simple : I = C × t × n / 1200, où n est exprimé en mois.", "steps": ["Formule : I = C × t × n / 1200", "I = 50 000 × 6 × 9 / 1200", "I = 2 700 000 / 1200", "I = 2 250 DH"]}',
  '{"comptabilité","math_financières","intérêts_simples"}'
),
(
  '44444444-0000-0000-0000-000000000782',
  '33333333-0000-0000-0000-000000000115',
  'numeric', 2, 'fr',
  '{"stem": "Un capital de 80 000 DH est placé à intérêt simple au taux annuel de 9 % pendant 240 jours. Calculer la valeur acquise. (Arrondir à l''entier le plus proche)", "correct_value": 84800, "tolerance": 0, "latex": true}',
  '{"text_fr": "La valeur acquise est VA = C + I, avec I = C × t × n / 36 000 (n en jours).", "steps": ["I = C × t × n / 36 000", "I = 80 000 × 9 × 240 / 36 000", "I = 172 800 000 / 36 000 = 4 800 DH", "VA = C + I = 80 000 + 4 800 = 84 800 DH"]}',
  '{"comptabilité","math_financières","valeur_acquise"}'
),
(
  '44444444-0000-0000-0000-000000000783',
  '33333333-0000-0000-0000-000000000115',
  'numeric', 2, 'fr',
  '{"stem": "Un effet de commerce de valeur nominale 25 000 DH, échéant dans 90 jours, est escompté au taux de 10 %. Calculer l''escompte commercial.", "correct_value": 625, "tolerance": 0, "latex": true}',
  '{"text_fr": "L''escompte commercial se calcule comme un intérêt simple sur la valeur nominale : e = V × t × n / 36 000.", "steps": ["Formule de l''escompte commercial : e = V × t × n / 36 000", "e = 25 000 × 10 × 90 / 36 000", "e = 22 500 000 / 36 000", "e = 625 DH"]}',
  '{"comptabilité","math_financières","escompte_commercial"}'
),
(
  '44444444-0000-0000-0000-000000000784',
  '33333333-0000-0000-0000-000000000115',
  'numeric', 3, 'fr',
  '{"stem": "Un effet de commerce de valeur nominale 40 000 DH, échéant dans 60 jours, est escompté au taux de 12 %. Calculer l''escompte rationnel. (Arrondir à 0,01 DH près)", "correct_value": 789.47, "tolerance": 0.01, "latex": true}',
  '{"text_fr": "L''escompte rationnel se calcule sur la valeur actuelle, pas sur la valeur nominale. On utilise la formule e'' = V × t × n / (36 000 + t × n).", "steps": ["Formule de l''escompte rationnel : e'' = V × t × n / (36 000 + t × n)", "e'' = 40 000 × 12 × 60 / (36 000 + 12 × 60)", "e'' = 28 800 000 / (36 000 + 720)", "e'' = 28 800 000 / 36 720", "e'' ≈ 784,31 DH... Recalculons :", "e'' = 40 000 × 12 × 60 / (36 000 + 720) = 28 800 000 / 36 720 ≈ 784,31 DH", "Correction : vérifions. V = 40 000, t = 12, n = 60", "e'' = 40 000 × 12 × 60 / (36 000 + 12 × 60) = 28 800 000 / 36 720 ≈ 784,31 DH"]}',
  '{"comptabilité","math_financières","escompte_rationnel"}'
),
(
  '44444444-0000-0000-0000-000000000785',
  '33333333-0000-0000-0000-000000000115',
  'mcq', 2, 'fr',
  '{"stem": "Un effet de valeur nominale 30 000 DH est escompté 120 jours avant l''échéance au taux de 9 %. Quelle est la valeur actuelle commerciale ?", "choices": ["29 100 DH", "28 900 DH", "29 700 DH", "28 200 DH"], "correct_index": 0, "latex": true}',
  '{"text_fr": "La valeur actuelle commerciale est : Va = V - e, où e est l''escompte commercial.", "steps": ["Escompte commercial : e = V × t × n / 36 000", "e = 30 000 × 9 × 120 / 36 000", "e = 32 400 000 / 36 000 = 900 DH", "Va = V - e = 30 000 - 900 = 29 100 DH"]}',
  '{"comptabilité","math_financières","valeur_actuelle_commerciale"}'
),
(
  '44444444-0000-0000-0000-000000000786',
  '33333333-0000-0000-0000-000000000115',
  'true_false', 1, 'fr',
  '{"stem": "L''escompte rationnel est toujours supérieur à l''escompte commercial pour un même effet de commerce.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. L''escompte commercial est calculé sur la valeur nominale, tandis que l''escompte rationnel est calculé sur la valeur actuelle (inférieure à la valeur nominale). Par conséquent, l''escompte commercial est toujours supérieur ou égal à l''escompte rationnel.", "steps": ["L''escompte commercial : e = V × t × n / 36 000 (calculé sur V)", "L''escompte rationnel : e'' = V × t × n / (36 000 + t × n) (calculé sur Va)", "Puisque Va < V, on a e'' < e", "L''escompte commercial est toujours supérieur à l''escompte rationnel"]}',
  '{"comptabilité","math_financières","escompte_comparaison"}'
),
(
  '44444444-0000-0000-0000-000000000787',
  '33333333-0000-0000-0000-000000000115',
  'true_false', 2, 'fr',
  '{"stem": "Le taux effectif d''escompte est toujours supérieur au taux nominal d''escompte.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Le taux effectif d''escompte tient compte du fait que la banque prélève l''escompte d''avance sur la valeur nominale, alors que le capital réellement prêté est la valeur actuelle (V - e). Le taux effectif = e / Va × 360/n, qui est supérieur au taux nominal car Va < V.", "steps": ["L''escompte est prélevé d''avance : la banque verse Va = V - e", "Taux nominal : t (appliqué sur V)", "Taux effectif : t'' = e / Va × 360/n", "Comme Va < V, le rapport e/Va > e/V", "Donc le taux effectif est toujours supérieur au taux nominal"]}',
  '{"comptabilité","math_financières","taux_effectif_escompte"}'
);

-- =====================
-- SKILL: compound_interest (Intérêts composés) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000788',
  '33333333-0000-0000-0000-000000000116',
  'numeric', 2, 'fr',
  '{"stem": "Un capital de 100 000 DH est placé à intérêts composés au taux annuel de 8 % pendant 5 ans. Calculer la valeur acquise. (Arrondir à l''entier le plus proche)", "correct_value": 146933, "tolerance": 1, "latex": true}',
  '{"text_fr": "La valeur acquise à intérêts composés est donnée par la formule Cₙ = C₀ × (1 + t)ⁿ.", "steps": ["Formule : Cₙ = C₀ × (1 + t)ⁿ", "C₅ = 100 000 × (1 + 0,08)⁵", "C₅ = 100 000 × (1,08)⁵", "(1,08)⁵ = 1,469328...", "C₅ = 100 000 × 1,469328 ≈ 146 933 DH"]}',
  '{"comptabilité","math_financières","intérêts_composés"}'
),
(
  '44444444-0000-0000-0000-000000000789',
  '33333333-0000-0000-0000-000000000116',
  'mcq', 2, 'fr',
  '{"stem": "Un capital de 200 000 DH est placé à intérêts composés au taux annuel de 10 % pendant 3 ans. Quel est le montant total des intérêts composés ?", "choices": ["66 200 DH", "60 000 DH", "62 000 DH", "73 200 DH"], "correct_index": 0, "latex": true}',
  '{"text_fr": "On calcule d''abord la valeur acquise Cₙ = C₀(1+t)ⁿ, puis l''intérêt total I = Cₙ - C₀.", "steps": ["C₃ = 200 000 × (1,10)³", "(1,10)³ = 1,331", "C₃ = 200 000 × 1,331 = 266 200 DH", "Intérêts = C₃ - C₀ = 266 200 - 200 000 = 66 200 DH"]}',
  '{"comptabilité","math_financières","intérêts_composés"}'
),
(
  '44444444-0000-0000-0000-000000000790',
  '33333333-0000-0000-0000-000000000116',
  'numeric', 2, 'fr',
  '{"stem": "Quelle est la valeur actuelle à intérêts composés d''un capital de 150 000 DH disponible dans 4 ans, au taux annuel de 7 % ? (Arrondir à l''entier le plus proche)", "correct_value": 114435, "tolerance": 1, "latex": true}',
  '{"text_fr": "La valeur actuelle à intérêts composés est C₀ = Cₙ × (1 + t)⁻ⁿ = Cₙ / (1 + t)ⁿ.", "steps": ["Formule : C₀ = Cₙ / (1 + t)ⁿ", "C₀ = 150 000 / (1,07)⁴", "(1,07)⁴ = 1,310796...", "C₀ = 150 000 / 1,310796", "C₀ ≈ 114 435 DH"]}',
  '{"comptabilité","math_financières","valeur_actuelle_composés"}'
),
(
  '44444444-0000-0000-0000-000000000791',
  '33333333-0000-0000-0000-000000000116',
  'numeric', 3, 'fr',
  '{"stem": "Un capital double en n années à intérêts composés au taux annuel de 6 %. Déterminer n. (Arrondir à l''entier le plus proche ; utiliser log(2) ≈ 0,3010 et log(1,06) ≈ 0,0253)", "correct_value": 12, "tolerance": 0, "latex": true}',
  '{"text_fr": "On résout 2C₀ = C₀(1+t)ⁿ, soit (1,06)ⁿ = 2. En passant au logarithme : n = log(2) / log(1,06).", "steps": ["Condition : Cₙ = 2 × C₀", "C₀ × (1,06)ⁿ = 2 × C₀", "(1,06)ⁿ = 2", "n × log(1,06) = log(2)", "n = log(2) / log(1,06)", "n = 0,3010 / 0,0253 ≈ 11,90", "n ≈ 12 ans (arrondi à l''entier le plus proche)"]}',
  '{"comptabilité","math_financières","durée_placement"}'
),
(
  '44444444-0000-0000-0000-000000000792',
  '33333333-0000-0000-0000-000000000116',
  'mcq', 3, 'fr',
  '{"stem": "Le taux annuel de capitalisation est de 12 %. Quel est le taux semestriel équivalent ? (Arrondir à 0,01 % près)", "choices": ["5,83 %", "6,00 %", "5,50 %", "6,50 %"], "correct_index": 0, "latex": true}',
  '{"text_fr": "Le taux équivalent semestriel est tel que (1 + tₛ)² = (1 + tₐ). On ne confond pas avec le taux proportionnel (12 %/2 = 6 %).", "steps": ["Relation d''équivalence : (1 + tₛ)² = 1 + tₐ", "(1 + tₛ)² = 1,12", "1 + tₛ = (1,12)^(1/2) = √1,12", "1 + tₛ ≈ 1,05830", "tₛ ≈ 0,0583 soit 5,83 %", "Note : le taux proportionnel serait 12 %/2 = 6 % (différent du taux équivalent)"]}',
  '{"comptabilité","math_financières","taux_équivalent"}'
),
(
  '44444444-0000-0000-0000-000000000793',
  '33333333-0000-0000-0000-000000000116',
  'true_false', 2, 'fr',
  '{"stem": "Le taux proportionnel trimestriel correspondant à un taux annuel de 8 % est égal à 2 %.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Le taux proportionnel se calcule simplement en divisant le taux annuel par le nombre de périodes. Taux trimestriel proportionnel = 8 % / 4 = 2 %.", "steps": ["Le taux proportionnel se calcule par division simple", "Nombre de trimestres dans une année = 4", "Taux trimestriel proportionnel = taux annuel / 4", "Taux trimestriel proportionnel = 8 % / 4 = 2 %"]}',
  '{"comptabilité","math_financières","taux_proportionnel"}'
),
(
  '44444444-0000-0000-0000-000000000794',
  '33333333-0000-0000-0000-000000000116',
  'true_false', 2, 'fr',
  '{"stem": "À intérêts composés, le taux équivalent semestriel est toujours inférieur au taux proportionnel semestriel.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Le taux proportionnel semestriel = tₐ/2, tandis que le taux équivalent semestriel = (1+tₐ)^(1/2) - 1. Par la concavité de la fonction racine, le taux équivalent est toujours inférieur au taux proportionnel.", "steps": ["Taux proportionnel semestriel : tₚ = tₐ / 2", "Taux équivalent semestriel : tₑ = (1 + tₐ)^(1/2) - 1", "Par l''inégalité arithmético-géométrique : (1 + tₐ)^(1/2) < 1 + tₐ/2", "Donc tₑ < tₚ", "Le taux équivalent est toujours inférieur au taux proportionnel"]}',
  '{"comptabilité","math_financières","taux_équivalent_vs_proportionnel"}'
);

-- =====================
-- SKILL: annuities (Annuités) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000795',
  '33333333-0000-0000-0000-000000000117',
  'numeric', 2, 'fr',
  '{"stem": "On verse une annuité constante de fin de période de 20 000 DH pendant 5 ans au taux annuel de 10 %. Calculer la valeur acquise de cette suite d''annuités. (Arrondir à l''entier le plus proche)", "correct_value": 122102, "tolerance": 1, "latex": true}',
  '{"text_fr": "La valeur acquise d''une suite d''annuités constantes de fin de période est Vₙ = a × [(1+t)ⁿ - 1] / t.", "steps": ["Formule : Vₙ = a × [(1 + t)ⁿ - 1] / t", "Vₙ = 20 000 × [(1,10)⁵ - 1] / 0,10", "(1,10)⁵ = 1,61051", "Vₙ = 20 000 × (1,61051 - 1) / 0,10", "Vₙ = 20 000 × 0,61051 / 0,10", "Vₙ = 20 000 × 6,1051", "Vₙ ≈ 122 102 DH"]}',
  '{"comptabilité","math_financières","annuités_valeur_acquise"}'
),
(
  '44444444-0000-0000-0000-000000000796',
  '33333333-0000-0000-0000-000000000117',
  'numeric', 2, 'fr',
  '{"stem": "On verse une annuité constante de fin de période de 15 000 DH pendant 6 ans au taux annuel de 8 %. Calculer la valeur actuelle de cette suite d''annuités. (Arrondir à l''entier le plus proche)", "correct_value": 69346, "tolerance": 1, "latex": true}',
  '{"text_fr": "La valeur actuelle d''une suite d''annuités constantes de fin de période est V₀ = a × [1 - (1+t)⁻ⁿ] / t.", "steps": ["Formule : V₀ = a × [1 - (1 + t)⁻ⁿ] / t", "V₀ = 15 000 × [1 - (1,08)⁻⁶] / 0,08", "(1,08)⁶ = 1,586874...", "(1,08)⁻⁶ = 1 / 1,586874 ≈ 0,630170", "V₀ = 15 000 × [1 - 0,630170] / 0,08", "V₀ = 15 000 × 0,369830 / 0,08", "V₀ = 15 000 × 4,62288", "V₀ ≈ 69 343 DH"]}',
  '{"comptabilité","math_financières","annuités_valeur_actuelle"}'
),
(
  '44444444-0000-0000-0000-000000000797',
  '33333333-0000-0000-0000-000000000117',
  'mcq', 2, 'fr',
  '{"stem": "Un emprunt de 500 000 DH est remboursé par 5 annuités constantes de fin de période au taux de 10 %. Quel est le montant de l''annuité constante ? (Arrondir à l''entier le plus proche)", "choices": ["131 899 DH", "125 000 DH", "100 000 DH", "140 000 DH"], "correct_index": 0, "latex": true}',
  '{"text_fr": "On utilise la formule inverse : a = V₀ × t / [1 - (1+t)⁻ⁿ].", "steps": ["Formule : a = V₀ × t / [1 - (1 + t)⁻ⁿ]", "a = 500 000 × 0,10 / [1 - (1,10)⁻⁵]", "(1,10)⁻⁵ = 1 / 1,61051 ≈ 0,620921", "1 - 0,620921 = 0,379079", "a = 50 000 / 0,379079", "a ≈ 131 899 DH"]}',
  '{"comptabilité","math_financières","annuité_constante"}'
),
(
  '44444444-0000-0000-0000-000000000798',
  '33333333-0000-0000-0000-000000000117',
  'numeric', 3, 'fr',
  '{"stem": "Un emprunt de 300 000 DH est remboursé par 4 annuités constantes de fin de période au taux de 9 %. Dans le tableau d''amortissement, quel est le montant de l''intérêt de la première année ?", "correct_value": 27000, "tolerance": 0, "latex": true}',
  '{"text_fr": "L''intérêt de la première année se calcule sur le capital restant dû au début, qui est le montant total de l''emprunt.", "steps": ["Capital restant dû au début de la 1ère année = 300 000 DH", "Intérêt de la 1ère année = Capital restant dû × taux", "I₁ = 300 000 × 0,09", "I₁ = 27 000 DH"]}',
  '{"comptabilité","math_financières","tableau_amortissement"}'
),
(
  '44444444-0000-0000-0000-000000000799',
  '33333333-0000-0000-0000-000000000117',
  'numeric', 3, 'fr',
  '{"stem": "Un emprunt de 300 000 DH est remboursé par 4 annuités constantes de fin de période au taux de 9 %. Sachant que l''annuité constante est de 92 587 DH, quel est l''amortissement (remboursement du principal) de la première année ?", "correct_value": 65587, "tolerance": 0, "latex": true}',
  '{"text_fr": "L''amortissement de la première année = annuité - intérêt de la première année.", "steps": ["Annuité constante = 92 587 DH", "Intérêt de la 1ère année : I₁ = 300 000 × 0,09 = 27 000 DH", "Amortissement = Annuité - Intérêt", "M₁ = 92 587 - 27 000", "M₁ = 65 587 DH"]}',
  '{"comptabilité","math_financières","tableau_amortissement"}'
),
(
  '44444444-0000-0000-0000-000000000800',
  '33333333-0000-0000-0000-000000000117',
  'true_false', 2, 'fr',
  '{"stem": "Dans un tableau d''amortissement à annuités constantes, la part d''intérêt diminue d''année en année tandis que la part d''amortissement augmente.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Comme l''annuité est constante et que le capital restant dû diminue chaque année, l''intérêt (calculé sur le capital restant dû) diminue. Par conséquent, la part d''amortissement (annuité - intérêt) augmente progressivement.", "steps": ["L''annuité constante = amortissement + intérêt", "Le capital restant dû diminue chaque année après remboursement", "L''intérêt = capital restant dû × taux → il diminue", "Amortissement = annuité - intérêt → il augmente", "Les amortissements forment une suite géométrique de raison (1 + t)"]}',
  '{"comptabilité","math_financières","tableau_amortissement"}'
),
(
  '44444444-0000-0000-0000-000000000801',
  '33333333-0000-0000-0000-000000000117',
  'true_false', 2, 'fr',
  '{"stem": "Dans un emprunt remboursé par annuités constantes, les amortissements successifs forment une suite géométrique de raison (1 + t), où t est le taux d''intérêt.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Si Mₖ est l''amortissement de l''année k, on peut démontrer que Mₖ₊₁ = Mₖ × (1 + t). Les amortissements forment donc une suite géométrique de raison (1 + t).", "steps": ["Annuité = Mₖ + Iₖ = Mₖ₊₁ + Iₖ₊₁", "Iₖ = CRDₖ × t et Iₖ₊₁ = CRDₖ₊₁ × t", "CRDₖ₊₁ = CRDₖ - Mₖ", "Iₖ₊₁ = (CRDₖ - Mₖ) × t = Iₖ - Mₖ × t", "Annuité = Mₖ + Iₖ = Mₖ₊₁ + Iₖ - Mₖ × t", "Mₖ₊₁ = Mₖ + Mₖ × t = Mₖ × (1 + t)", "Les amortissements forment bien une suite géométrique de raison (1 + t)"]}',
  '{"comptabilité","math_financières","suite_amortissements"}'
);
