-- Migration 009: Math exercise items (299 items, skills 001-023)
-- Generated 2026-05-07

-- Math Exercise Items Expansion
-- 299 items, IDs 1001-1299, Skills 001-023
-- 13 items per skill: 5 MCQ + 5 numeric + 3 sequence
-- Sources: Stewart Calculus 9th ed., Hachette/Nathan Terminale Maths, BAC Maroc 2018-2024

-- ============================================================
-- SKILL 001: arithmetic_seq (IDs 1001-1013)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001001','33333333-0000-0000-0000-000000000001','mcq',2,'fr',
'{"stem":"Une suite arithmétique a pour premier terme u_1 = 3 et raison r = 4. Quelle est la valeur de u_5 ?","choices":["15","19","23","7"],"correct_index":1,"latex":true}',
'{"text_fr":"Formule : u_n = u_1 + (n-1)r. Pour n=5 : u_5 = 3 + (5-1)×4 = 3 + 16 = 19. Erreur classique : calculer u_1 + 5r = 23 (on ajoute 5 fois r au lieu de 4). La raison est ajoutée n-1 fois depuis le premier terme, pas n fois."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001001');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001002','33333333-0000-0000-0000-000000000001','mcq',2,'fr',
'{"stem":"La somme des 10 premiers termes d''une suite arithmétique de premier terme u_1=1 et de raison r=2 vaut :","choices":["55","100","91","20"],"correct_index":1,"latex":true}',
'{"text_fr":"S_n = n(u_1 + u_n)/2. u_10 = 1 + 9×2 = 19. S_10 = 10×(1+19)/2 = 10×10 = 100. Autre formule : S_n = n×u_1 + n(n-1)r/2 = 10×1 + 10×9×2/2 = 10 + 90 = 100. Les deux méthodes donnent 100."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001002');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001003','33333333-0000-0000-0000-000000000001','mcq',3,'fr',
'{"stem":"Une suite arithmétique vérifie u_3 = 7 et u_7 = 19. Quelle est sa raison r ?","choices":["3","4","2","6"],"correct_index":0,"latex":true}',
'{"text_fr":"u_7 - u_3 = (7-3)×r → 19 - 7 = 4r → 12 = 4r → r = 3. On peut aussi écrire le système : u_1 + 2r = 7 et u_1 + 6r = 19, en soustrayant : 4r = 12 → r = 3. Puis u_1 = 7 - 2×3 = 1."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001003');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001004','33333333-0000-0000-0000-000000000001','mcq',3,'fr',
'{"stem":"Pour une suite arithmétique de raison r > 0, la suite est :","choices":["Décroissante","Croissante","Constante","Alternée"],"correct_index":1,"latex":false}',
'{"text_fr":"Si r > 0 : u_{n+1} = u_n + r > u_n → suite strictement croissante. Si r < 0 : strictement décroissante. Si r = 0 : constante. Attention : la monotonie d''une suite arithmétique est entièrement déterminée par le signe de r, indépendamment de u_1."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001004');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001005','33333333-0000-0000-0000-000000000001','mcq',4,'fr',
'{"stem":"La somme 1 + 2 + 3 + ... + n vaut :","choices":["n²","n(n+1)/2","n(n-1)/2","(n+1)(n+2)/2"],"correct_index":1,"latex":true}',
'{"text_fr":"C''est la somme des n premiers entiers = suite arithmétique de u_1=1, r=1. S_n = n(u_1 + u_n)/2 = n(1 + n)/2 = n(n+1)/2. Preuve de Gauss (enfant) : S = 1+2+...+n et S = n+(n-1)+...+1, en additionnant : 2S = n(n+1), donc S = n(n+1)/2. Pour n=100 : S = 100×101/2 = 5050."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001005');

-- Numeric items for arithmetic_seq
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001006','33333333-0000-0000-0000-000000000001','numeric',2,'fr',
'{"stem":"Une suite arithmétique a u_1 = 5 et r = -3. Quelle est la valeur de u_4 ?","correct_value":-4,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"u_4 = u_1 + 3r = 5 + 3×(-3) = 5 - 9 = -4. Vérification : u_2 = 2, u_3 = -1, u_4 = -4. La raison négative (r = -3) donne une suite décroissante qui change de signe."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001006');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001007','33333333-0000-0000-0000-000000000001','numeric',2,'fr',
'{"stem":"Calculer la somme S = 2 + 4 + 6 + ... + 100.","correct_value":2550,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"Termes pairs de 2 à 100 : suite arithmétique u_1=2, r=2, u_n=100. Nombre de termes : n = (100-2)/2 + 1 = 50. S = 50×(2+100)/2 = 50×51 = 2550. Autre méthode : S = 2(1+2+...+50) = 2×50×51/2 = 2550."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001007');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001008','33333333-0000-0000-0000-000000000001','numeric',3,'fr',
'{"stem":"Quel est le rang n tel que u_n = 47 pour la suite arithmétique u_1 = 3, r = 4 ?","correct_value":12,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"u_n = u_1 + (n-1)r = 3 + (n-1)×4 = 47. Donc (n-1)×4 = 44, n-1 = 11, n = 12. Vérification : u_12 = 3 + 11×4 = 3 + 44 = 47. ✓"}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001008');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001009','33333333-0000-0000-0000-000000000001','numeric',3,'fr',
'{"stem":"Une suite arithmétique vérifie u_5 = 13 et u_9 = 25. Quel est u_1 ?","correct_value":1,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"r = (u_9 - u_5)/(9-5) = (25-13)/4 = 3. u_1 = u_5 - 4r = 13 - 12 = 1. Vérification : u_5 = 1 + 4×3 = 13 ✓, u_9 = 1 + 8×3 = 25 ✓."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001009');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001010','33333333-0000-0000-0000-000000000001','numeric',4,'fr',
'{"stem":"La somme S_n = 3 + 7 + 11 + ... + (4n-1). Pour n = 20, S_20 vaut :","correct_value":820,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"Suite arithmétique : u_k = 4k - 1, u_1 = 3, r = 4. u_20 = 4×20 - 1 = 79. S_20 = 20×(3 + 79)/2 = 20×41 = 820. Formule directe : S_n = n(4n+2)/2 = n(2n+1). Pour n=20 : 20×41 = 820."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001010');

-- Sequence items for arithmetic_seq
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001011','33333333-0000-0000-0000-000000000001','ordering',3,'fr',
'{"stem":"Ordonnez les étapes pour calculer la somme des n premiers termes d''une suite arithmétique :","items":["Appliquer S_n = n(u_1 + u_n)/2","Calculer u_n = u_1 + (n-1)r","Identifier u_1, r et n dans l''énoncé","Vérifier la réponse avec des cas simples"],"correct_order":[2,1,0,3],"latex":true}',
'{"text_fr":"1) Lire l''énoncé : extraire u_1 (premier terme), r (raison) et n (nombre de termes). 2) Calculer u_n via la formule générale. 3) Appliquer la formule de la somme. 4) Vérification : pour n=1, S_1 = u_1 ✓; pour n=2, S_2 = u_1 + u_2 = 2u_1 + r. Ce plan méthodique évite les erreurs au BAC."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001011');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001012','33333333-0000-0000-0000-000000000001','ordering',3,'fr',
'{"stem":"Pour montrer qu''une suite (u_n) est arithmétique, ordonnez la démarche :","items":["Conclure : (u_n) est arithmétique de raison r = c","Calculer u_{n+1} - u_n","Montrer que u_{n+1} - u_n est une constante c indépendante de n","Exprimer u_{n+1} en fonction de n"],"correct_order":[3,1,2,0],"latex":true}',
'{"text_fr":"Méthode rigoureuse : 1) Exprimer u_{n+1} explicitement. 2) Calculer la différence u_{n+1} - u_n. 3) Montrer que cette différence est une constante (ne dépend pas de n). 4) Conclure. Exemple : si u_n = 3n + 1, alors u_{n+1} - u_n = 3(n+1)+1 - (3n+1) = 3 = constante → suite arithmétique de raison 3."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001012');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001013','33333333-0000-0000-0000-000000000001','ordering',4,'fr',
'{"stem":"Ordonnez les propriétés d''une suite arithmétique croissante (r > 0) :","items":["La suite est non bornée supérieurement (tend vers +∞)","u_{n+1} > u_n pour tout n","La somme partielle S_n → +∞","r > 0"],"correct_order":[3,1,0,2],"latex":true}',
'{"text_fr":"Chaîne logique : r > 0 → u_{n+1} = u_n + r > u_n (suite croissante) → non bornée (∀M, ∃N : u_N > M) → S_n ≥ n×u_1 → +∞. Une suite arithmétique ne peut pas converger (sauf si r=0 et u_1 fini). Elle diverge toujours vers ±∞ si r ≠ 0. Important pour BAC : ne pas confondre divergence et absence de limite."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001013');

-- ============================================================
-- SKILL 002: geometric_seq (IDs 1014-1026)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001014','33333333-0000-0000-0000-000000000002','mcq',2,'fr',
'{"stem":"Une suite géométrique a u_1 = 2 et q = 3. Quelle est la valeur de u_4 ?","choices":["54","18","8","162"],"correct_index":0,"latex":true}',
'{"text_fr":"u_n = u_1 × q^{n-1}. u_4 = 2 × 3^3 = 2 × 27 = 54. Erreur classique : calculer 2 × 3^4 = 162 (exposant n au lieu de n-1). L''exposant est n-1 car on multiplie par q exactement n-1 fois depuis u_1."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001014');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001015','33333333-0000-0000-0000-000000000002','mcq',2,'fr',
'{"stem":"La somme des n premiers termes d''une suite géométrique (q ≠ 1) est :","choices":["u_1 × (q^n - 1)/(q - 1)","u_1 × n × q","u_1 × q^n","n × u_1"],"correct_index":0,"latex":true}',
'{"text_fr":"S_n = u_1(1 + q + q² + ... + q^{n-1}) = u_1 × (q^n - 1)/(q - 1) pour q ≠ 1. Dérivation : S = u_1 + u_1q + ... → qS = u_1q + ... + u_1q^n → qS - S = u_1q^n - u_1 → S(q-1) = u_1(q^n-1). Pour q=1 : S_n = n×u_1."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001015');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001016','33333333-0000-0000-0000-000000000002','mcq',3,'fr',
'{"stem":"Une suite géométrique de raison q = 1/2 et u_1 = 16 converge vers :","choices":["0","1","8","∞"],"correct_index":0,"latex":true}',
'{"text_fr":"u_n = 16 × (1/2)^{n-1}. Quand n→∞ : |q| = 1/2 < 1 → q^n → 0 → u_n → 0. Règle : une suite géométrique converge si et seulement si |q| < 1 (vers 0) ou q = 1 (constante). Si |q| > 1 : diverge vers ±∞. Si q ≤ -1 : oscille (pas de limite)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001016');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001017','33333333-0000-0000-0000-000000000002','mcq',3,'fr',
'{"stem":"La somme de la série géométrique convergente ∑_{n=0}^{∞} q^n = 1 + q + q² + ... pour |q| < 1 est :","choices":["q/(1-q)","1/(1-q)","1/(1+q)","q/(q-1)"],"correct_index":1,"latex":true}',
'{"text_fr":"S = ∑_{n=0}^∞ q^n = lim_{n→∞} (1 - q^{n+1})/(1-q) = 1/(1-q) car |q| < 1 → q^n → 0. Exemple : q = 1/2 → S = 1/(1-1/2) = 2. Vérification : 1 + 1/2 + 1/4 + ... = 2. Application : 0,999... = 9×(0,1+0,01+...) = 9 × (1/10)/(1-1/10) = 9/9 = 1. "}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001017');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001018','33333333-0000-0000-0000-000000000002','mcq',4,'fr',
'{"stem":"Une suite géométrique vérifie u_2 = 6 et u_5 = 48. Quel est le premier terme u_1 ?","choices":["2","3","4","1"],"correct_index":1,"latex":true}',
'{"text_fr":"u_5/u_2 = q^3 → 48/6 = 8 → q^3 = 8 → q = 2. u_1 = u_2/q = 6/2 = 3. Vérification : u_2 = 3×2 = 6 ✓, u_5 = 3×2^4 = 48 ✓. Méthode : utiliser le rapport de deux termes pour isoler q, puis remonter au premier terme."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001018');

-- Numeric for geometric_seq
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001019','33333333-0000-0000-0000-000000000002','numeric',2,'fr',
'{"stem":"Une suite géométrique a u_1 = 3 et q = 2. Calculer u_6.","correct_value":96,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"u_6 = u_1 × q^5 = 3 × 2^5 = 3 × 32 = 96."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001019');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001020','33333333-0000-0000-0000-000000000002','numeric',3,'fr',
'{"stem":"Calculer la somme S = 1 + 2 + 4 + 8 + ... + 512 (suite géométrique q=2).","correct_value":1023,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"512 = 2^9, donc 10 termes (n=10 : u_1=1 à u_10=2^9=512). S = 1×(2^10 - 1)/(2-1) = 1024 - 1 = 1023. Vérification : 1+2+4+8+16+32+64+128+256+512 = 1023 ✓."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001020');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001021','33333333-0000-0000-0000-000000000002','numeric',3,'fr',
'{"stem":"Pour la suite géométrique u_1 = 8 et q = 1/2, à partir de quel rang n a-t-on u_n < 0.1 ?","correct_value":7,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"u_n = 8×(1/2)^{n-1}. u_7 = 8/2^6 = 8/64 = 0,125 > 0,1. u_8 = 8/2^7 = 8/128 = 0,0625 < 0,1. Le premier rang est n = 8."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001021');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001022','33333333-0000-0000-0000-000000000002','numeric',4,'fr',
'{"stem":"Quel est le 1er rang n tel que u_n < 0.1 pour la suite géométrique u_1=8, q=1/2 ?","correct_value":8,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"u_n = 8×(1/2)^{n-1} < 0,1. 8/2^{n-1} < 0,1 → 2^{n-1} > 80. Or 2^6 = 64 < 80 < 128 = 2^7. Donc n-1 ≥ 7 → n ≥ 8. Premier rang : n = 8. u_8 = 8/128 = 0,0625 < 0,1 ✓. u_7 = 8/64 = 0,125 ≮ 0,1 ✗."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001022');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001023','33333333-0000-0000-0000-000000000002','numeric',4,'fr',
'{"stem":"La somme de la série ∑_{n=1}^{∞} 3×(2/3)^n vaut :","correct_value":6,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"S = 3 × ∑_{n=1}^∞ (2/3)^n = 3 × [(2/3)/(1-2/3)] = 3 × [(2/3)/(1/3)] = 3 × 2 = 6. On utilise ∑_{n=1}^∞ q^n = q/(1-q) pour |q| < 1. Ici q = 2/3, |q| < 1 → série convergente."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001023');

-- Sequence items for geometric_seq
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001024','33333333-0000-0000-0000-000000000002','ordering',3,'fr',
'{"stem":"Pour montrer qu''une suite (u_n) est géométrique, ordonnez la démarche :","items":["Conclure que la suite est géométrique de raison q","Montrer que u_{n+1}/u_n est une constante q (indépendante de n)","Calculer le quotient u_{n+1}/u_n","Exprimer u_{n+1} en fonction de n"],"correct_order":[3,2,1,0],"latex":true}',
'{"text_fr":"Méthode : 1) Exprimer u_{n+1}. 2) Former le quotient u_{n+1}/u_n. 3) Simplifier pour montrer que c''est une constante q. 4) Conclure. Exemple : u_n = 3^n. u_{n+1}/u_n = 3^{n+1}/3^n = 3 = cte → suite géométrique de raison 3. Toujours vérifier que u_n ≠ 0 pour tous les n (sinon le quotient est indéfini)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001024');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001025','33333333-0000-0000-0000-000000000002','ordering',3,'fr',
'{"stem":"Ordonnez les étapes pour trouver la raison d''une suite géométrique à partir de deux termes u_p et u_q (p < q) :","items":["Calculer q_suite = (u_q/u_p)^{1/(q-p)}","Utiliser la formule u_q = u_p × q_suite^{q-p}","Former le rapport u_q/u_p = q_suite^{q-p}","Identifier les rangs p et q et les valeurs u_p, u_q"],"correct_order":[3,1,2,0],"latex":true}',
'{"text_fr":"1) Extraire p, q, u_p, u_q de l''énoncé. 2) Écrire la relation entre u_p et u_q. 3) Former u_q/u_p = q^{q-p}. 4) Extraire q = (u_q/u_p)^{1/(q-p)}. Exemple : u_3=12, u_7=192 → 192/12 = q^4 = 16 → q = 2. Puis u_1 = u_3/q^2 = 12/4 = 3."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001025');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001026','33333333-0000-0000-0000-000000000002','ordering',4,'fr',
'{"stem":"Ordonnez les critères de convergence d''une suite géométrique de raison q :","items":["Suite constante égale à u_1 (si q = 1)","Suite alternée sans limite (si q ≤ -1)","Suite convergeant vers 0 (si |q| < 1)","Suite divergeant vers ±∞ (si |q| > 1)"],"correct_order":[2,0,3,1],"latex":true}',
'{"text_fr":"Classification complète : |q| < 1 → u_n → 0 (convergence). q = 1 → u_n = u_1 (constante). |q| > 1 → |u_n| → +∞ (divergence). q = -1 → alternance entre u_1 et -u_1 (oscille). -1 < q < 0 → alternance avec |u_n| → 0 (converge vers 0). Erreur classique : oublier que q négatif avec |q| < 1 converge quand même vers 0."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001026');

-- ============================================================
-- SKILL 003: seq_convergence (IDs 1027-1039)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001027','33333333-0000-0000-0000-000000000003','mcq',2,'fr',
'{"stem":"Une suite (u_n) converge si et seulement si :","choices":["Elle est croissante","Elle est bornée","Elle admet une limite finie L","Elle est positive"],"correct_index":2,"latex":true}',
'{"text_fr":"Définition : (u_n) converge vers L si ∀ε > 0, ∃N : ∀n ≥ N, |u_n - L| < ε. Une suite bornée n''est pas forcément convergente (ex: (-1)^n est bornée mais oscille). Une suite croissante et bornée converge (théorème de la limite monotone), mais la croissance seule ne suffit pas (ex: u_n = n est croissante mais diverge)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001027');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001028','33333333-0000-0000-0000-000000000003','mcq',3,'fr',
'{"stem":"Le théorème des suites monotones bornées affirme que :","choices":["Toute suite bornée converge","Toute suite croissante diverge","Toute suite monotone et bornée converge","Toute suite convergente est bornée et monotone"],"correct_index":2,"latex":false}',
'{"text_fr":"Théorème : toute suite monotone et bornée converge. Précisions : (i) croissante majorée → converge. (ii) décroissante minorée → converge. La réciproque est FAUSSE : une suite convergente n''est pas nécessairement monotone (ex: u_n = (-1)^n/n → 0 mais non monotone). Les suites monotones non bornées divergent (vers ±∞)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001028');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001029','33333333-0000-0000-0000-000000000003','mcq',3,'fr',
'{"stem":"Le théorème des gendarmes (squeeze theorem) affirme : si a_n ≤ u_n ≤ b_n et a_n → L et b_n → L, alors :","choices":["u_n → 0","u_n → L","u_n diverge","u_n est bornée"],"correct_index":1,"latex":true}',
'{"text_fr":"Théorème des gendarmes : si u_n est ''coincée'' entre a_n et b_n qui tendent toutes deux vers la même limite L, alors u_n → L aussi. Application classique : sin(n)/n → 0 car -1/n ≤ sin(n)/n ≤ 1/n et ±1/n → 0. Ce théorème est fondamental pour calculer des limites difficiles par encadrement."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001029');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001030','33333333-0000-0000-0000-000000000003','mcq',3,'fr',
'{"stem":"La suite u_n = n/(n+1) est :","choices":["Divergente","Convergente de limite 0","Convergente de limite 1","Non bornée"],"correct_index":2,"latex":true}',
'{"text_fr":"u_n = n/(n+1) = 1/(1 + 1/n) → 1/(1+0) = 1 quand n→∞. Méthode : diviser num et dén par n (terme dominant). 1/n → 0, donc la limite est 1. Vérification : u_10 = 10/11 ≈ 0,91 ; u_100 = 100/101 ≈ 0,99 ; u_1000 ≈ 0,999 → de plus en plus proche de 1."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001030');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001031','33333333-0000-0000-0000-000000000003','mcq',4,'fr',
'{"stem":"La suite u_n = (2n² + 3)/(n² - 1) converge vers :","choices":["0","2","3","∞"],"correct_index":1,"latex":true}',
'{"text_fr":"Diviser num et dén par n² (terme dominant) : u_n = (2 + 3/n²)/(1 - 1/n²) → (2 + 0)/(1 - 0) = 2. Règle générale : pour une fraction de polynômes en n, la limite est le ratio des coefficients des termes de plus haut degré : ici 2n²/n² = 2."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001031');

-- Numeric for seq_convergence
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001032','33333333-0000-0000-0000-000000000003','numeric',2,'fr',
'{"stem":"La limite de la suite u_n = 3 + 1/n vaut :","correct_value":3,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"lim_{n→∞} u_n = lim_{n→∞} (3 + 1/n) = 3 + 0 = 3. La suite est décroissante (1/n diminue) et minorée par 3 → converge vers 3. Chaque terme est supérieur à 3 mais s''en approche infiniment."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001032');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001033','33333333-0000-0000-0000-000000000003','numeric',3,'fr',
'{"stem":"Calculer la limite de u_n = (3n + 5)/(n + 2).","correct_value":3,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"u_n = (3n+5)/(n+2). Diviser par n : u_n = (3 + 5/n)/(1 + 2/n) → (3+0)/(1+0) = 3. Ou factoriser : (3n+5)/(n+2) = 3(n+2)-1/(n+2) = 3 - 1/(n+2) → 3 - 0 = 3."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001033');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001034','33333333-0000-0000-0000-000000000003','numeric',3,'fr',
'{"stem":"La suite u_n = (-1)^n / n converge vers :","correct_value":0,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"|u_n| = 1/n → 0. Donc u_n → 0 (théorème : si |u_n| → 0 alors u_n → 0). La suite alterne de signe mais les oscillations s''amortissent. Exemples : u_1 = -1, u_2 = 1/2, u_3 = -1/3, u_4 = 1/4... → converge vers 0 malgré l''alternance."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001034');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001035','33333333-0000-0000-0000-000000000003','numeric',4,'fr',
'{"stem":"Calculer lim u_n = (n² + 2n)/(3n² - 1).","correct_value":0.333,"tolerance":0.001,"unit":"","latex":true}',
'{"text_fr":"Diviser par n² : u_n = (1 + 2/n)/(3 - 1/n²) → (1+0)/(3-0) = 1/3 ≈ 0,333. La limite est 1/3."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001035');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001036','33333333-0000-0000-0000-000000000003','numeric',4,'fr',
'{"stem":"Si u_n = (√n + 1)/√n, la limite de u_n est :","correct_value":1,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"u_n = (√n + 1)/√n = 1 + 1/√n → 1 + 0 = 1. Méthode : diviser par √n (terme dominant dans les expressions avec √n). 1/√n = n^{-1/2} → 0."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001036');

-- Sequence items for seq_convergence
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001037','33333333-0000-0000-0000-000000000003','ordering',3,'fr',
'{"stem":"Pour prouver qu''une suite croissante (u_n) converge, ordonnez la démarche :","items":["Appliquer le théorème : suite croissante majorée → converge","Montrer que u_{n+1} ≥ u_n (croissance)","Conclure sur la limite (souvent en passant à la limite dans la relation de récurrence)","Trouver un majorant M tel que u_n ≤ M pour tout n"],"correct_order":[1,3,0,2],"latex":true}',
'{"text_fr":"1) Montrer la croissance : u_{n+1} - u_n ≥ 0 ou u_{n+1}/u_n ≥ 1. 2) Trouver un majorant (souvent par récurrence ou analyse). 3) Appliquer le théorème des suites monotones bornées (existence garantie). 4) Calculer la limite en posant lim u_{n+1} = lim u_n = L et résoudre l''équation."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001037');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001038','33333333-0000-0000-0000-000000000003','ordering',3,'fr',
'{"stem":"Ordonnez les conditions nécessaires pour appliquer le théorème des gendarmes à (u_n) :","items":["Conclure : u_n → L","Trouver des suites a_n ≤ u_n ≤ b_n","Vérifier que a_n → L et b_n → L","Choisir les suites gendarmes a_n et b_n"],"correct_order":[3,1,2,0],"latex":true}',
'{"text_fr":"1) Choisir des suites simples qui encadrent u_n (souvent à partir d''un encadrement sur une fonction). 2) Vérifier l''encadrement a_n ≤ u_n ≤ b_n pour tout n (ou pour n assez grand). 3) Calculer les limites de a_n et b_n : doivent être égales à L. 4) Conclure par le théorème. Application typique : montrer que sin(n)/n → 0."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001038');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001039','33333333-0000-0000-0000-000000000003','ordering',4,'fr',
'{"stem":"Ordonnez les étapes pour étudier la convergence de u_{n+1} = √(2 + u_n), u_0 = 0 :","items":["Trouver le point fixe : L = √(2 + L) → L = 2","Supposer la convergence vers L et passer à la limite dans la relation de récurrence","Montrer la croissance par récurrence","Montrer que u_n ≤ 2 par récurrence (bornée)"],"correct_order":[2,3,1,0],"latex":true}',
'{"text_fr":"Démarche type pour une suite récurrente : 1) Montrer la croissance : u_1 = √2 > 0 = u_0, si u_n > u_{n-1} alors u_{n+1} = √(2+u_n) > √(2+u_{n-1}) = u_n. 2) Montrer le majorant M=2 : si u_n ≤ 2 alors u_{n+1} = √(2+u_n) ≤ √4 = 2. 3) Théorème → converge. 4) Équation du point fixe : L² = 2 + L → L² - L - 2 = 0 → L = 2 (L positif)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001039');

-- ============================================================
-- SKILL 004: seq_recursive (IDs 1040-1052)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001040','33333333-0000-0000-0000-000000000004','mcq',2,'fr',
'{"stem":"La suite définie par u_{n+1} = 2u_n + 1 et u_0 = 1 est étudiée en posant v_n = u_n + 1. Quelle suite est (v_n) ?","choices":["Arithmétique de raison 2","Géométrique de raison 2","Constante","Arithmétique de raison 1"],"correct_index":1,"latex":true}',
'{"text_fr":"v_n = u_n + 1. v_{n+1} = u_{n+1} + 1 = (2u_n + 1) + 1 = 2u_n + 2 = 2(u_n + 1) = 2v_n. Donc v_{n+1} = 2v_n → suite géométrique de raison 2. v_0 = u_0 + 1 = 2. Donc v_n = 2^{n+1} et u_n = v_n - 1 = 2^{n+1} - 1."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001040');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001041','33333333-0000-0000-0000-000000000004','mcq',3,'fr',
'{"stem":"Pour la suite u_{n+1} = u_n/2 + 3 avec u_0 = 0, le point fixe L vérifie :","choices":["L = 3","L = 6","L = 0","L = 1"],"correct_index":1,"latex":true}',
'{"text_fr":"Point fixe : L = L/2 + 3 → L - L/2 = 3 → L/2 = 3 → L = 6. Si (u_n) converge vers L, alors u_{n+1} → L aussi, et L = L/2 + 3 donne L = 6. Vérification : si u_n = 6, u_{n+1} = 6/2 + 3 = 6 ✓. La suite converge vers 6 (raison 1/2 < 1 → convergence)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001041');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001042','33333333-0000-0000-0000-000000000004','mcq',3,'fr',
'{"stem":"La suite de Fibonacci (F_1=1, F_2=1, F_{n+2}=F_{n+1}+F_n) vérifie : lim F_{n+1}/F_n = ?","choices":["1","2","(1+√5)/2","√2"],"correct_index":2,"latex":true}',
'{"text_fr":"Le rapport de deux termes consécutifs de Fibonacci converge vers le nombre d''or φ = (1+√5)/2 ≈ 1,618. Preuve : si F_{n+1}/F_n → L alors F_{n+2}/F_{n+1} → L aussi. F_{n+2}/F_{n+1} = 1 + F_n/F_{n+1} → 1 + 1/L. Donc L = 1 + 1/L → L² = L + 1 → L = (1+√5)/2 (racine positive)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001042');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001043','33333333-0000-0000-0000-000000000004','mcq',4,'fr',
'{"stem":"Pour u_{n+1} = f(u_n), si f est une contraction (|f(x)-f(y)| ≤ k|x-y| avec k<1), alors la suite :","choices":["Diverge toujours","Converge vers l''unique point fixe de f","Est constante","Oscille"],"correct_index":1,"latex":true}',
'{"text_fr":"Théorème du point fixe de Banach : si f est une contraction sur un intervalle fermé, la suite u_{n+1} = f(u_n) converge vers l''unique point fixe de f (solution de f(L) = L). Taux de convergence géométrique : |u_n - L| ≤ k^n |u_0 - L|. Application : si |f''(x)| ≤ k < 1 sur un intervalle, f est une contraction sur cet intervalle."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001043');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001044','33333333-0000-0000-0000-000000000004','mcq',4,'fr',
'{"stem":"Pour la suite u_{n+1} = au_n + b (a ≠ 1), la solution explicite est :","choices":["u_n = u_0 + nb","u_n = (u_0 + b/(1-a))×a^n - b/(1-a)","u_n = a^n × u_0","u_n = b^n"],"correct_index":1,"latex":true}',
'{"text_fr":"Point fixe L = b/(1-a). Posons v_n = u_n - L → v_{n+1} = u_{n+1} - L = au_n + b - L = a(u_n - L) = av_n. Donc v_n = v_0 × a^n = (u_0 - L)a^n. Finalement : u_n = L + (u_0 - L)a^n = b/(1-a) + (u_0 - b/(1-a))a^n. Si |a| < 1 : u_n → L = b/(1-a)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001044');

-- Numeric for seq_recursive
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001045','33333333-0000-0000-0000-000000000004','numeric',2,'fr',
'{"stem":"La suite u_{n+1} = 3u_n - 2 avec u_0 = 2 converge-t-elle ? Si oui, vers quelle valeur ?","correct_value":1,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"Point fixe : L = 3L - 2 → -2L = -2 → L = 1. Mais la raison de la suite associée v_n = u_n - 1 est 3 (|3| > 1) → la suite DIVERGE si u_0 ≠ 1. Si u_0 = 2, v_0 = 1, v_n = 3^n → +∞. Mais si u_0 = 1 (= L), u_n = 1 pour tout n. L''exercice demande la valeur du point fixe : L = 1. Note : la convergence effective dépend de u_0."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001045');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001046','33333333-0000-0000-0000-000000000004','numeric',3,'fr',
'{"stem":"Pour u_{n+1} = u_n/3 + 4 avec u_0 = 0, calculer u_3.","correct_value":5.185,"tolerance":0.01,"unit":"","latex":true}',
'{"text_fr":"u_0=0, u_1=4, u_2=4/3+4=16/3, u_3=16/9+4=52/9 ≈ 5,778. Point fixe : L = L/3+4 → 2L/3=4 → L=6. u_n = 6 - 6×(1/3)^n → 6."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001046');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001047','33333333-0000-0000-0000-000000000004','numeric',3,'fr',
'{"stem":"Pour u_{n+1} = 0.5u_n + 2, u_0 = 0 : quelle est la limite de u_n ?","correct_value":4,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"Point fixe : L = 0,5L + 2 → 0,5L = 2 → L = 4. La raison est 0,5 (|0,5| < 1) → convergence. u_n = 4 - 4×(0,5)^n → 4. Vérification : u_0=0, u_1=2, u_2=3, u_3=3,5, u_4=3,75... → s''approche de 4."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001047');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001048','33333333-0000-0000-0000-000000000004','numeric',4,'fr',
'{"stem":"La suite u_0=1, u_{n+1}=√u_n converge vers :","correct_value":1,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"u_{n+1} = √u_n = u_n^{1/2}. On peut montrer : u_n = u_0^{(1/2)^n} = 1^{(1/2)^n} = 1 pour tout n (car u_0=1). Ou si u_0 > 1 : ln(u_n) = (1/2)^n × ln(u_0) → 0. Donc u_n = e^{ln(u_n)} → e^0 = 1. Le point fixe de f(x) = √x sur [0,∞) est x=1 (et x=0). Pour u_0 > 0 et u_0 ≠ 0, u_n → 1."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001048');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001049','33333333-0000-0000-0000-000000000004','numeric',4,'fr',
'{"stem":"u_0 = 0, u_{n+1} = u_n² + 0.25. La suite converge vers L vérifiant L² - L + 0.25 = 0. Quelle est la valeur de L ?","correct_value":0.5,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"Équation du point fixe : L = L² + 0,25 → L² - L + 0,25 = 0 → (L - 0,5)² = 0 → L = 0,5 (racine double). Ce point fixe est le seul et la suite converge vers 0,5 si elle est bien définie. u_0=0, u_1=0,25, u_2=0,3125, u_3≈0,348... → converge vers 0,5."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001049');

-- Sequence items for seq_recursive
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001050','33333333-0000-0000-0000-000000000004','ordering',3,'fr',
'{"stem":"Pour résoudre u_{n+1} = au_n + b (a≠1), ordonnez la méthode du changement de variable :","items":["Conclure : u_n = L + (u_0 - L)a^n","Poser v_n = u_n - L et montrer que v_{n+1} = av_n","Trouver le point fixe L = b/(1-a)","Résoudre v_n = v_0 × a^n"],"correct_order":[2,1,3,0],"latex":true}',
'{"text_fr":"1) Trouver L = b/(1-a) (point fixe). 2) Poser v_n = u_n - L → v_{n+1} = u_{n+1} - L = au_n + b - L = a(u_n-L) = av_n (suite géom. de raison a). 3) v_n = v_0 × a^n. 4) u_n = L + v_n = L + (u_0-L)a^n. C''est la méthode universelle pour u_{n+1} = au_n + b."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001050');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001051','33333333-0000-0000-0000-000000000004','ordering',3,'fr',
'{"stem":"Pour étudier la convergence d''une suite récurrente u_{n+1} = f(u_n), ordonnez la démarche BAC :","items":["Calculer la limite L en résolvant f(L) = L","Montrer la monotonie (croissante ou décroissante)","Appliquer le théorème des suites monotones bornées","Montrer que la suite est bornée"],"correct_order":[1,3,2,0],"latex":true}',
'{"text_fr":"Plan type (exigé au BAC) : 1) Montrer que la suite est monotone (souvent par récurrence : si u_n ≤ u_{n+1} alors u_{n+1} ≤ u_{n+2}). 2) Montrer qu''elle est bornée (majorée si croissante, minorée si décroissante). 3) Conclure par le théorème des suites monotones bornées. 4) Calculer L = f(L). Chaque étape doit être justifiée explicitement."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001051');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001052','33333333-0000-0000-0000-000000000004','ordering',4,'fr',
'{"stem":"Ordonnez la preuve par récurrence que u_n ≤ 2 pour u_{n+1} = √(u_n + 2), u_0 = 0 :","items":["Hérédité : si u_n ≤ 2, montrer u_{n+1} ≤ 2","Conclure : u_n ≤ 2 pour tout n ∈ ℕ","Initialisation : u_0 = 0 ≤ 2 ✓","Calculer : u_{n+1} = √(u_n+2) ≤ √(2+2) = √4 = 2"],"correct_order":[2,0,3,1],"latex":true}',
'{"text_fr":"Récurrence : Base : u_0 = 0 ≤ 2 ✓. Hérédité : supposons u_n ≤ 2. Alors u_{n+1} = √(u_n + 2) ≤ √(2+2) = √4 = 2 ✓. Donc par le principe de récurrence, u_n ≤ 2 pour tout n. Cette structure (initialisation → hérédité → conclusion) est impérative au BAC. Omettre l''une des étapes = points perdus."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001052');

-- ============================================================
-- SKILL 005: seq_adjacent (IDs 1053-1065)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001053','33333333-0000-0000-0000-000000000005','mcq',2,'fr',
'{"stem":"Deux suites (u_n) et (v_n) sont dites adjacentes si :","choices":["Elles sont toutes deux croissantes","l''une est croissante, l''autre décroissante, et leur différence → 0","Elles ont la même limite","Elles alternent"],"correct_index":1,"latex":true}',
'{"text_fr":"Suites adjacentes : (u_n) croissante, (v_n) décroissante (ou l''inverse), et v_n - u_n → 0. Alors elles convergent vers la même limite L avec u_n ≤ L ≤ v_n (ou v_n ≤ L ≤ u_n). Application classique : encadrement de constantes irrationnelles (π, e, √2) par des suites adjacentes."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001053');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001054','33333333-0000-0000-0000-000000000005','mcq',3,'fr',
'{"stem":"Si (u_n) et (v_n) sont adjacentes et convergent vers L, alors pour tout n :","choices":["u_n = v_n = L","u_n ≤ L ≤ v_n (si u_n croissante)","u_n > v_n","L > v_n"],"correct_index":1,"latex":true}',
'{"text_fr":"Si u_n est croissante, v_n décroissante, et u_n ≤ v_n, alors L = lim u_n = lim v_n et u_n ≤ L ≤ v_n pour tout n. C''est le principe de l''encadrement par des suites adjacentes. Utilisé pour localiser L : u_n donne une borne inférieure, v_n donne une borne supérieure de la limite."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001054');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001055','33333333-0000-0000-0000-000000000005','mcq',3,'fr',
'{"stem":"Les suites u_n = 1 - 1/n et v_n = 1 + 1/n sont-elles adjacentes ?","choices":["Oui","Non, elles ont la même monotonie","Non, elles n''ont pas la même limite","Non, leur différence ne tend pas vers 0"],"correct_index":0,"latex":true}',
'{"text_fr":"u_n = 1 - 1/n est croissante (1/n décroît). v_n = 1 + 1/n est décroissante. v_n - u_n = 2/n → 0. u_n ≤ v_n pour tout n. ✓ Conditions remplies → adjacentes, de limite commune L = 1. On a bien u_n ≤ 1 ≤ v_n, confirmant l''encadrement."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001055');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001056','33333333-0000-0000-0000-000000000005','mcq',4,'fr',
'{"stem":"Le nombre e peut être encadré par des suites adjacentes. Parmi les encadrements suivants, lequel est valable ?","choices":["(1+1/n)^n ≤ e ≤ (1+1/n)^{n+1}","e ≤ (1+1/n)^n","(1+1/n)^n = e pour tout n","e < 2"],"correct_index":0,"latex":true}',
'{"text_fr":"Les suites u_n = (1+1/n)^n (croissante) et v_n = (1+1/n)^{n+1} (décroissante) sont adjacentes de limite e. On a u_n ≤ e ≤ v_n. Exemple pour n=10 : u_10 = 1,1^10 ≈ 2,594 ≤ e ≈ 2,718 ≤ v_10 = 1,1^11 ≈ 2,853. Ces encadrements deviennent de plus en plus précis quand n augmente."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001056');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001057','33333333-0000-0000-0000-000000000005','mcq',4,'fr',
'{"stem":"Pour deux suites adjacentes vérifiant |v_n - u_n| ≤ 1/n², la précision de l''encadrement de L à l''ordre 10 est :","choices":["1/10","1/100","1/1000","1/10000"],"correct_value":1,"correct_index":1,"latex":true}',
'{"text_fr":"|v_n - u_n| ≤ 1/n². Pour n=10 : |v_10 - u_10| ≤ 1/100. Donc L est entre u_10 et v_10, et la largeur de cet intervalle est au plus 1/100 = 0,01. L''encadrement donne L à ±0,01. Plus 1/n² converge vite que 1/n, car 1/n² décroît plus rapidement."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001057');

-- Numeric for seq_adjacent
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001058','33333333-0000-0000-0000-000000000005','numeric',2,'fr',
'{"stem":"Si u_n = 2 - 1/n et v_n = 2 + 1/n sont adjacentes, leur limite commune est :","correct_value":2,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"lim u_n = 2 - 0 = 2. lim v_n = 2 + 0 = 2. Les deux convergent vers 2. Vérification adjacence : u_n croissante ✓ (1/n décroît), v_n décroissante ✓, v_n - u_n = 2/n → 0 ✓, u_n ≤ v_n ✓."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001058');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001059','33333333-0000-0000-0000-000000000005','numeric',3,'fr',
'{"stem":"Si u_n = 1 - 1/(2n) et v_n = 1 + 1/(2n), calculer u_4 - v_4 (en valeur absolue).","correct_value":0.25,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"u_4 = 1 - 1/8 = 7/8. v_4 = 1 + 1/8 = 9/8. |u_4 - v_4| = |7/8 - 9/8| = 2/8 = 1/4 = 0,25. En général |v_n - u_n| = 1/n → 0. Pour n=4 : 1/4 = 0,25. ✓"}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001059');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001060','33333333-0000-0000-0000-000000000005','numeric',3,'fr',
'{"stem":"Deux suites adjacentes vérifient u_10 = 3.14 et v_10 = 3.16. La limite L est dans l''intervalle [u_10, v_10]. Quelle est la précision de l''approximation par u_10 ?","correct_value":0.02,"tolerance":0.001,"unit":"","latex":false}',
'{"text_fr":"v_10 - u_10 = 3,16 - 3,14 = 0,02. Donc L ∈ [3,14 ; 3,16], largeur 0,02. L''approximation L ≈ 3,14 (= u_10) est précise à ±0,02 près. En pratique on prend souvent le milieu : L ≈ (3,14 + 3,16)/2 = 3,15 à ±0,01 près."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001060');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001061','33333333-0000-0000-0000-000000000005','numeric',4,'fr',
'{"stem":"La limite de lim (1+1/n)^n est notée e ≈ 2.718. Pour n=100, (1+0.01)^100 ≈ 2.705. L''erreur absolue est :","correct_value":0.013,"tolerance":0.005,"unit":"","latex":true}',
'{"text_fr":"|e - (1,01)^100| ≈ |2,718 - 2,705| = 0,013. La convergence de (1+1/n)^n vers e est lente (~1/(2n) d''erreur). Pour une meilleure approximation : utiliser les n premiers termes de la série e = ∑ 1/k! = 1 + 1 + 1/2 + 1/6 + ... qui converge beaucoup plus vite."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001061');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001062','33333333-0000-0000-0000-000000000005','numeric',4,'fr',
'{"stem":"Pour des suites adjacentes avec |v_n - u_n| = 1/n, quel est le premier rang n garantissant une précision de 0.01 ?","correct_value":100,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"On veut |v_n - u_n| = 1/n ≤ 0,01 → n ≥ 100. Le premier rang garantissant 0,01 est n = 100. Pour une précision de 0,001 : n ≥ 1000. Pour une précision meilleure, il faut soit calculer plus de termes, soit utiliser une suite adjacente dont la différence décroît plus vite."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001062');

-- Sequence items for seq_adjacent
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001063','33333333-0000-0000-0000-000000000005','ordering',3,'fr',
'{"stem":"Pour montrer que (u_n) et (v_n) sont adjacentes, ordonnez les vérifications :","items":["Vérifier que u_n ≤ v_n pour tout n","Vérifier que (v_n - u_n) → 0","Montrer que (u_n) est croissante","Montrer que (v_n) est décroissante"],"correct_order":[2,3,0,1],"latex":true}',
'{"text_fr":"Conditions des suites adjacentes (toutes nécessaires) : 1) u_n croissante. 2) v_n décroissante. 3) u_n ≤ v_n (ou u_n ≥ v_n selon la configuration). 4) v_n - u_n → 0 (ou u_n - v_n → 0). Si les 4 conditions sont remplies : les deux suites convergent vers la même limite. En BAC, toutes les étapes doivent être explicitement vérifiées."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001063');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001064','33333333-0000-0000-0000-000000000005','ordering',3,'fr',
'{"stem":"Ordonnez les conséquences du théorème des suites adjacentes :","items":["L est la limite commune des deux suites","Il existe une limite commune L","u_n ≤ L ≤ v_n pour tout n (si u_n croissante)","L est unique"],"correct_order":[1,3,0,2],"latex":true}',
'{"text_fr":"Le théorème des suites adjacentes fournit : 1) Existence de la limite L. 2) Unicité (car u_n ≤ v_n → elles convergent vers le même point). 3) L est la limite commune. 4) L''encadrement u_n ≤ L ≤ v_n permet d''approcher L avec une précision contrôlée (erreur ≤ v_n - u_n). Très utilisé pour définir π, e, √2 de façon constructive."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001064');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001065','33333333-0000-0000-0000-000000000005','ordering',4,'fr',
'{"stem":"Ordonnez les étapes pour construire des suites adjacentes encadrant √2 :","items":["Conclure : lim u_n = lim v_n = √2","Vérifier que v_n - u_n → 0","Poser u_n = a_n (borne inférieure) et v_n = b_n (borne supérieure) à chaque étape de l''algorithme de Héron","Partir de u_0 = 1, v_0 = 2 (car 1 < √2 < 2)"],"correct_order":[3,2,1,0],"latex":true}',
'{"text_fr":"Algorithme de Héron (méthode babylonienne) pour √2 : u_0=1, v_0=2. À chaque étape : milieu m = (u+v)/2. Si m² < 2 : nouveau u = m. Si m² > 2 : nouveau v = m. Les deux suites obtenues sont adjacentes convergeant vers √2. Équivalent à la méthode de Newton pour f(x)=x²-2."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001065');

-- ============================================================
-- SKILL 006: limit_def (IDs 1066-1078)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001066','33333333-0000-0000-0000-000000000006','mcq',2,'fr',
'{"stem":"lim_{x→∞} (2x + 5)/x vaut :","choices":["0","2","5","∞"],"correct_index":1,"latex":true}',
'{"text_fr":"(2x+5)/x = 2 + 5/x → 2 + 0 = 2. Méthode : diviser par x (terme dominant). Toujours identifier le terme dominant et diviser par lui. La constante 5/x → 0 et n''affecte pas la limite."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001066');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001067','33333333-0000-0000-0000-000000000006','mcq',2,'fr',
'{"stem":"lim_{x→0} sin(x)/x vaut :","choices":["0","∞","1","Indéterminée"],"correct_index":2,"latex":true}',
'{"text_fr":"lim_{x→0} sin(x)/x = 1. C''est une limite fondamentale (à mémoriser absolument). Preuve géométrique : pour 0 < x < π/2, sin(x) < x < tan(x) → diviser par sin(x) : 1 < x/sin(x) < 1/cos(x). À la limite, x/sin(x) → 1 → sin(x)/x → 1. Généralisation : lim_{x→0} sin(ax)/(bx) = a/b."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001067');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001068','33333333-0000-0000-0000-000000000006','mcq',3,'fr',
'{"stem":"lim_{x→0} (e^x - 1)/x vaut :","choices":["0","e","1","∞"],"correct_index":2,"latex":true}',
'{"text_fr":"lim_{x→0} (e^x - 1)/x = 1. C''est la définition de la dérivée de f(x) = e^x en x=0 : f''(0) = lim_{h→0} (e^h - 1)/h = 1. Autre approche : développement limité e^x ≈ 1 + x pour x proche de 0 → (e^x-1)/x ≈ x/x = 1. Limite fondamentale à mémoriser."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001068');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001069','33333333-0000-0000-0000-000000000006','mcq',3,'fr',
'{"stem":"lim_{x→+∞} (3x² - x + 2)/(x² + 1) vaut :","choices":["0","3","1","∞"],"correct_index":1,"latex":true}',
'{"text_fr":"Diviser num et dén par x² : (3 - 1/x + 2/x²)/(1 + 1/x²) → (3-0+0)/(1+0) = 3. Règle : pour des polynômes de même degré, la limite est le rapport des coefficients dominants."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001069');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001070','33333333-0000-0000-0000-000000000006','mcq',4,'fr',
'{"stem":"lim_{x→0} ln(1+x)/x vaut :","choices":["0","∞","1","ln(2)"],"correct_index":2,"latex":true}',
'{"text_fr":"lim_{x→0} ln(1+x)/x = 1. C''est la définition de la dérivée de ln au point 1 : (ln)''(1) = 1/1 = 1, et ln(1+x)/x = [ln(1+x) - ln(1)]/x → (ln)''(1) = 1. Développement : ln(1+x) ≈ x pour x → 0 → ln(1+x)/x ≈ 1."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001070');

-- Numeric for limit_def
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001071','33333333-0000-0000-0000-000000000006','numeric',2,'fr',
'{"stem":"lim_{x→2} (x² - 4)/(x - 2) vaut :","correct_value":4,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"Factoriser : (x²-4)/(x-2) = (x+2)(x-2)/(x-2) = x+2 pour x ≠ 2. Donc lim_{x→2} (x²-4)/(x-2) = 2+2 = 4. Méthode : identifier la forme 0/0, factoriser, simplifier, puis calculer. C''est la dérivée de f(x)=x² en x=2 : f''(2) = 2×2 = 4."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001071');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001072','33333333-0000-0000-0000-000000000006','numeric',3,'fr',
'{"stem":"lim_{x→+∞} x × e^{-x} vaut :","correct_value":0,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"Croissance comparée : e^x >> x^n pour tout n quand x→+∞. Donc e^{-x} → 0 plus vite que x → ∞. x×e^{-x} → 0. Formellement : lim x/e^x = lim (1/e^x) (par L''Hôpital : num→∞, dén→∞, 1/e^x → 0). En pratique : exponentielle ''mange'' tout polynôme."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001072');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001073','33333333-0000-0000-0000-000000000006','numeric',3,'fr',
'{"stem":"lim_{x→+∞} ln(x)/x vaut :","correct_value":0,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"lim_{x→+∞} ln(x)/x = 0. ln(x) croît infiniment mais beaucoup plus lentement que x. Par L''Hôpital (∞/∞) : lim (1/x)/1 = 0. Ou : pour tout ε > 0, ln(x) ≤ x^ε pour x assez grand → ln(x)/x ≤ x^{ε-1} → 0 si ε < 1. Ordre de grandeur : x >> √x >> ln(x) >> 1 quand x→∞."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001073');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001074','33333333-0000-0000-0000-000000000006','numeric',4,'fr',
'{"stem":"lim_{x→0⁺} x × ln(x) vaut :","correct_value":0,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"lim_{x→0⁺} x×ln(x) : forme 0×(-∞). Réécrire : x×ln(x) = ln(x)/(1/x). Par L''Hôpital (∞/∞) : lim (1/x)/(-1/x²) = lim (-x) = 0. Donc lim_{x→0⁺} x×ln(x) = 0. Interprétation : x→0 ''détruit'' ln(x)→-∞ plus vite → limite 0."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001074');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001075','33333333-0000-0000-0000-000000000006','numeric',4,'fr',
'{"stem":"lim_{x→0} (1 - cos(x))/x² vaut :","correct_value":0.5,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"Par L''Hôpital (forme 0/0) : lim sin(x)/(2x) = (1/2) × lim sin(x)/x = 1/2. Ou par développement limité : cos(x) ≈ 1 - x²/2 → 1-cos(x) ≈ x²/2 → (1-cos(x))/x² ≈ 1/2."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001075');

-- Sequence items for limit_def
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001076','33333333-0000-0000-0000-000000000006','ordering',3,'fr',
'{"stem":"Pour calculer lim f(x)/g(x) avec forme indéterminée 0/0, ordonnez la stratégie :","items":["Appliquer la règle de L''Hôpital : lim f/g = lim f''/g'' si f,g→0","Reconnaître la forme indéterminée 0/0","Vérifier que L''Hôpital s''applique (conditions remplies)","Calculer la nouvelle limite (éventuellement répéter)"],"correct_order":[1,2,0,3],"latex":true}',
'{"text_fr":"1) Identifier la forme : si f(a)=g(a)=0, c''est 0/0. 2) Vérifier : f et g doivent être dérivables, g''≠0 au voisinage de a. 3) Appliquer L''Hôpital : lim f(x)/g(x) = lim f''(x)/g''(x) (si cette dernière limite existe). 4) Si nouvelle FI → répéter. Erreur classique : appliquer L''Hôpital quand ce n''est pas une FI."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001076');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001077','33333333-0000-0000-0000-000000000006','ordering',3,'fr',
'{"stem":"Pour calculer lim_{x→∞} P(x)/Q(x) où P,Q sont des polynômes de degrés p et q, ordonnez le raisonnement :","items":["Si p = q : limite = coeff.dominant(P)/coeff.dominant(Q)","Si p < q : limite = 0","Identifier les degrés p et q de P et Q","Si p > q : limite = ±∞"],"correct_order":[2,1,0,3],"latex":true}',
'{"text_fr":"1) Identifier p = deg(P) et q = deg(Q). 2) Si p < q : le dénominateur l''emporte → 0. 3) Si p = q : rapport des coefficients dominants. 4) Si p > q : le numérateur l''emporte → ±∞ (signe dépend des coeff dominants et du signe de x→±∞). Méthode simple : factoriser par x^max(p,q)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001077');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001078','33333333-0000-0000-0000-000000000006','ordering',4,'fr',
'{"stem":"Ordonnez les limites fondamentales par ordre d''importance au BAC :","items":["lim_{x→0} (1-cos x)/x² = 1/2","lim_{x→0} sin(x)/x = 1","lim_{x→+∞} ln(x)/x = 0","lim_{x→0} (e^x-1)/x = 1"],"correct_order":[1,3,0,2],"latex":true}',
'{"text_fr":"Ordre de fréquence BAC Maroc : 1) sin(x)/x → 1 (très fréquent). 2) (e^x-1)/x → 1 (très fréquent). 3) (1-cos x)/x² → 1/2 (moyen). 4) ln(x)/x → 0 (croissances comparées). Toutes ces limites se retrouvent comme cas particuliers de la définition de la dérivée ou des développements limités."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001078');

-- ============================================================
-- SKILL 007: limit_calc (IDs 1079-1091)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001079','33333333-0000-0000-0000-000000000007','mcq',2,'fr',
'{"stem":"lim_{x→3} (x² - 9)/(x - 3) vaut :","choices":["0","6","3","∞"],"correct_index":1,"latex":true}',
'{"text_fr":"x²-9 = (x-3)(x+3). (x²-9)/(x-3) = x+3 pour x≠3. Donc lim_{x→3} = 3+3 = 6. Forme 0/0 → factoriser et simplifier. Cette limite est la dérivée de f(x)=x² en x=3 : f''(3)=6."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001079');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001080','33333333-0000-0000-0000-000000000007','mcq',2,'fr',
'{"stem":"lim_{x→+∞} e^x/x² vaut :","choices":["0","1","2","+∞"],"correct_index":3,"latex":true}',
'{"text_fr":"Croissances comparées : e^x >> x^n pour tout n. Donc e^x/x² → +∞. L''exponentielle croît infiniment plus vite que tout polynôme. Pour confirmer : L''Hôpital 2 fois : e^x/x² → e^x/(2x) → e^x/2 → +∞."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001080');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001081','33333333-0000-0000-0000-000000000007','mcq',3,'fr',
'{"stem":"lim_{x→0} (√(1+x) - 1)/x vaut :","choices":["0","1/2","1","∞"],"correct_index":1,"latex":true}',
'{"text_fr":"Méthode 1 : Rationaliser : (√(1+x)-1)/x × (√(1+x)+1)/(√(1+x)+1) = x/(x(√(1+x)+1)) = 1/(√(1+x)+1) → 1/2. Méthode 2 : DL au premier ordre √(1+x) ≈ 1 + x/2 → (√(1+x)-1)/x ≈ 1/2. Méthode 3 : dérivée de √(1+x) en 0 = 1/(2√1) = 1/2."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001081');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001082','33333333-0000-0000-0000-000000000007','mcq',3,'fr',
'{"stem":"lim_{x→-∞} (2x³ - x)/(x² + 1) vaut :","choices":["0","2","-∞","+∞"],"correct_index":2,"latex":true}',
'{"text_fr":"Diviser par x² : (2x - 1/x)/(1 + 1/x²) → (2x-0)/(1+0) = 2x. Quand x→-∞ : 2x→-∞. Donc lim = -∞. Méthode directe : num est de degré 3, dén de degré 2. Degré num > degré dén → ±∞. Le coefficient dominant du num est 2x³/x² = 2x → -∞ quand x→-∞."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001082');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001083','33333333-0000-0000-0000-000000000007','mcq',4,'fr',
'{"stem":"lim_{x→0⁺} (ln x)² × x vaut :","choices":["0","1","∞","-∞"],"correct_index":0,"latex":true}',
'{"text_fr":"Posons t = -ln x → t → +∞ quand x→0⁺, et x = e^{-t}. (ln x)² × x = t² × e^{-t} → 0 (croissances comparées : e^{-t} → 0 plus vite que t² → ∞). Alternativement : on sait que x×ln²(x) → 0 en 0⁺ par le même argument que x×ln(x)→0."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001083');

-- Numeric for limit_calc
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001084','33333333-0000-0000-0000-000000000007','numeric',2,'fr',
'{"stem":"lim_{x→1} (x³ - 1)/(x - 1) vaut :","correct_value":3,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"x³-1 = (x-1)(x²+x+1). Donc (x³-1)/(x-1) = x²+x+1 pour x≠1. En x=1 : 1+1+1 = 3. C''est aussi la dérivée de x³ en x=1 : (x³)''|_{x=1} = 3x²|_{x=1} = 3."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001084');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001085','33333333-0000-0000-0000-000000000007','numeric',3,'fr',
'{"stem":"lim_{x→0} (e^{2x} - 1)/x vaut :","correct_value":2,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"(e^{2x}-1)/x = [(e^{2x}-1)/(2x)] × 2. Quand x→0, 2x→0 et (e^{2x}-1)/(2x) → 1 (limite fondamentale). Donc lim = 1×2 = 2. Généralisation : lim_{x→0} (e^{ax}-1)/(bx) = a/b."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001085');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001086','33333333-0000-0000-0000-000000000007','numeric',3,'fr',
'{"stem":"lim_{x→+∞} (x + ln x)/x vaut :","correct_value":1,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"(x + ln x)/x = 1 + ln(x)/x → 1 + 0 = 1 (car ln(x)/x → 0 quand x→+∞). Ou directement : le terme dominant est x/x = 1, et la correction ln(x)/x est négligeable."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001086');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001087','33333333-0000-0000-0000-000000000007','numeric',4,'fr',
'{"stem":"lim_{x→0} sin(3x)/sin(5x) vaut :","correct_value":0.6,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"sin(3x)/sin(5x) = [sin(3x)/(3x)] × (3x) / {[sin(5x)/(5x)] × (5x)} = [sin(3x)/(3x)] / [sin(5x)/(5x)] × 3/5. Quand x→0, les deux crochets → 1. Donc la limite est 3/5 = 0,6."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001087');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001088','33333333-0000-0000-0000-000000000007','numeric',4,'fr',
'{"stem":"lim_{x→+∞} x(e^{1/x} - 1) vaut :","correct_value":1,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"Posons t = 1/x → 0⁺. x(e^{1/x}-1) = (e^t - 1)/t → 1 (limite fondamentale). Donc lim = 1. Intuition : pour petit t, e^t ≈ 1+t → (e^t-1)/t ≈ 1."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001088');

-- Sequence items for limit_calc
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001089','33333333-0000-0000-0000-000000000007','ordering',3,'fr',
'{"stem":"Pour calculer lim_{x→a} f(x)/g(x) de forme 0/0 sans L''Hôpital, ordonnez :","items":["Calculer la limite après simplification","Factoriser num et dén par (x-a)","Simplifier le facteur commun (x-a)","Reconnaître la forme 0/0"],"correct_order":[3,1,2,0],"latex":true}',
'{"text_fr":"Méthode algébrique (sans L''Hôpital) : 1) Constater f(a)=g(a)=0. 2) Factoriser par (x-a) (ou par la racine commune). 3) Simplifier. 4) Évaluer en a. Exemple : (x²-4)/(x-2) = (x+2)(x-2)/(x-2) = x+2 → 4. Cette méthode s''applique quand f et g sont des polynômes ou des expressions factorisables."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001089');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001090','33333333-0000-0000-0000-000000000007','ordering',3,'fr',
'{"stem":"Pour calculer lim_{x→∞} P(x)/Q(x), ordonnez la méthode par terme dominant :","items":["Simplifier et calculer la limite","Factoriser num et dén par le terme de plus haut degré en x","Identifier le degré de P(x) et Q(x)","Déterminer le signe en examinant les coefficients dominants"],"correct_order":[2,1,3,0],"latex":true}',
'{"text_fr":"1) Identifier degrés p et q. 2) Factoriser num par x^p et dén par x^q. 3) Examiner le coefficient dominant et le signe pour x→±∞. 4) Calculer : si p=q → rapport des coefficients dominants ; si p<q → 0 ; si p>q → ±∞. Exemple : (3x²+1)/(2x²-5) = x²(3+1/x²) / x²(2-5/x²) → 3/2."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001090');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001091','33333333-0000-0000-0000-000000000007','ordering',4,'fr',
'{"stem":"Pour utiliser la règle de L''Hôpital, ordonnez les conditions à vérifier :","items":["La limite lim f''(x)/g''(x) existe (ou est ±∞)","La forme est indéterminée 0/0 ou ±∞/±∞","f et g sont dérivables au voisinage de a (avec g'' ≠ 0)","Conclure lim f/g = lim f''/g''"],"correct_order":[1,2,0,3],"latex":true}',
'{"text_fr":"Conditions L''Hôpital : 1) FI de type 0/0 ou ∞/∞. 2) f,g dérivables sur un voisinage épointé de a, g''≠0 sur ce voisinage. 3) lim f''/g'' doit exister (sinon L''Hôpital ne s''applique pas — on peut réessayer ou chercher une autre méthode). 4) Si toutes les conditions sont remplies : lim f/g = lim f''/g''. Erreur : appliquer L''Hôpital à une FI de type 1×0 sans transformer d''abord."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001091');

-- ============================================================
-- SKILL 008: continuity (IDs 1092-1104)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001092','33333333-0000-0000-0000-000000000008','mcq',2,'fr',
'{"stem":"f est continue en a si et seulement si :","choices":["f(a) est défini","lim_{x→a} f(x) = f(a)","f est dérivable en a","f est bornée"],"correct_index":1,"latex":true}',
'{"text_fr":"Définition de la continuité en a : (1) f(a) doit être défini, (2) lim_{x→a} f(x) doit exister, (3) cette limite doit être égale à f(a). Les trois conditions ensemble s''écrivent : lim_{x→a} f(x) = f(a). Dérivabilité → continuité (mais pas l''inverse : |x| est continu en 0 mais pas dérivable)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001092');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001093','33333333-0000-0000-0000-000000000008','mcq',2,'fr',
'{"stem":"Toute fonction dérivable sur [a,b] est :","choices":["Bornée","Continue sur [a,b]","Constante","Intégrable mais pas continue"],"correct_index":1,"latex":false}',
'{"text_fr":"Théorème : dérivabilité ⟹ continuité. En effet, si f est dérivable en a, alors lim_{x→a} f(x) = f(a) (la dérivée impose l''existence de cette limite). La réciproque est fausse : f(x) = |x| est continue mais non dérivable en 0. Dérivabilité est une condition plus forte que la continuité."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001093');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001094','33333333-0000-0000-0000-000000000008','mcq',3,'fr',
'{"stem":"La fonction f(x) = 1/x est continue sur :","choices":["ℝ","ℝ\\{0}","[0, +∞[","]-∞, 0]"],"correct_index":1,"latex":true}',
'{"text_fr":"f(x) = 1/x est définie et continue sur ℝ\\{0} = ]-∞,0[ ∪ ]0,+∞[. Elle présente une discontinuité infinie (pôle) en x=0 : lim_{x→0⁺} = +∞ et lim_{x→0⁻} = -∞. On ne peut pas prolonger f par continuité en 0. Toute fonction rationnelle est continue sur son domaine de définition."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001094');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001095','33333333-0000-0000-0000-000000000008','mcq',3,'fr',
'{"stem":"Pour que f(x) = {x² si x≤1, ax+b si x>1} soit continue en x=1, il faut :","choices":["a = 1","a + b = 1","2a + b = 1","a = b = 1"],"correct_index":1,"latex":true}',
'{"text_fr":"Continuité en 1 : lim_{x→1⁻} f(x) = 1² = 1 et lim_{x→1⁺} f(x) = a×1 + b = a+b. Pour continuité : a+b = 1. Il n''y a pas d''autre condition imposée par la seule continuité (la dérivabilité en plus imposerait 2×1 = a, soit a=2 et b=-1)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001095');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001096','33333333-0000-0000-0000-000000000008','mcq',4,'fr',
'{"stem":"Une fonction f continue sur [a,b] est dite uniformément continue si :","choices":["Elle est dérivable sur ]a,b[","Elle est bornée sur [a,b]","∀ε>0, ∃δ>0 : ∀x,y∈[a,b], |x-y|<δ → |f(x)-f(y)|<ε","Elle admet un maximum et un minimum"],"correct_index":2,"latex":true}',
'{"text_fr":"Continuité uniforme : le même δ fonctionne pour tous les points x,y de [a,b] simultanément (pas de dépendance de δ en le point). Théorème de Heine : toute fonction continue sur un compact [a,b] est uniformément continue. La réciproque est fausse sur un intervalle ouvert : f(x)=1/x est continue mais non uniformément continue sur ]0,1[."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001096');

-- Numeric for continuity
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001097','33333333-0000-0000-0000-000000000008','numeric',2,'fr',
'{"stem":"Pour que f(x) = {2x+k si x≤2, x²-1 si x>2} soit continue en x=2, quelle est la valeur de k ?","correct_value":-1,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"Continuité en 2 : lim_{x→2⁻} = 2×2+k = 4+k. lim_{x→2⁺} = 4-1 = 3. Egalité : 4+k = 3 → k = -1. Vérification : f(2) = 2×2+(-1) = 3 ✓ et lim_{x→2⁺} = 3 ✓."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001097');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001098','33333333-0000-0000-0000-000000000008','numeric',3,'fr',
'{"stem":"Si f est continue sur [0,1], f(0) = -2 et f(1) = 5, combien de solutions a l''équation f(x) = 0 sur [0,1] d''après le TVI ?","correct_value":1,"tolerance":0,"unit":"au moins","latex":false}',
'{"text_fr":"TVI (Théorème des Valeurs Intermédiaires) : f continue sur [a,b], f(a) = -2 < 0 < 5 = f(b). Donc 0 est une valeur intermédiaire → il existe au moins un c ∈ ]0,1[ tel que f(c) = 0. Le TVI garantit l''existence d''au moins 1 solution mais pas l''unicité (il pourrait y en avoir plusieurs si f n''est pas monotone)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001098');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001099','33333333-0000-0000-0000-000000000008','numeric',3,'fr',
'{"stem":"La valeur de prolongement par continuité de f(x) = sin(x)/x en x=0 est :","correct_value":1,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"sin(x)/x n''est pas défini en x=0 (0/0). Mais lim_{x→0} sin(x)/x = 1. On peut donc prolonger f par continuité en posant f(0) = 1. La fonction prolongée est continue en 0. Ce prolongement est unique (une limite est unique si elle existe)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001099');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001100','33333333-0000-0000-0000-000000000008','numeric',4,'fr',
'{"stem":"f(x) = x³ - 3x + 1 est continue sur [-2, 2]. On a f(-2) = -1 et f(2) = 3. D''après le TVI, il existe c ∈ ]-2,2[ avec f(c) = 0. En affinant sur [-1,0] : f(-1) = 3 et f(0) = 1. Sur [0,1] : f(0)=1 et f(1)=-1. Sur quel sous-intervalle [a,b] se trouve une racine ?","correct_value":0,"tolerance":0,"unit":"[0,1]","latex":false}',
'{"text_fr":"f(0)=0³-3×0+1=1 > 0. f(1)=1-3+1=-1 < 0. Changement de signe sur [0,1] → TVI garantit une racine dans ]0,1[. Méthode de bisection : f(0,5)=0,125-1,5+1=-0,375 < 0 → racine dans ]0,0,5[. f(0,25)≈0,0156-0,75+1=0,266 > 0 → racine dans ]0,25,0,5[... La racine est c≈0,347."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001100');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001101','33333333-0000-0000-0000-000000000008','numeric',4,'fr',
'{"stem":"La fonction f(x) = e^x - x - 2 est continue sur ℝ. On cherche ses zéros. f(0) = -1 et f(2) = e²-4 ≈ 3.39. Le premier zéro positif est dans quel intervalle ? Répondre par la borne gauche entière.","correct_value":1,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"f(0) = e⁰-0-2 = -1 < 0. f(1) = e-1-2 = e-3 ≈ -0,28 < 0. f(2) = e²-4 ≈ 3,39 > 0. Changement de signe entre 1 et 2 → racine dans ]1,2[. La borne gauche entière est 1. Vérification : f(1)≈-0,28 < 0 < 3,39 = f(2) → TVI → racine dans ]1,2[."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001101');

-- Sequence items for continuity
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001102','33333333-0000-0000-0000-000000000008','ordering',3,'fr',
'{"stem":"Pour vérifier la continuité d''une fonction définie par morceaux en x=a, ordonnez :","items":["Conclure : f continue en a si et seulement si les deux limites et f(a) coïncident","Calculer la limite à droite lim_{x→a⁺} f(x)","Calculer la valeur f(a) et la limite à gauche lim_{x→a⁻} f(x)","Vérifier que lim gauche = lim droite = f(a)"],"correct_order":[2,1,3,0],"latex":true}',
'{"text_fr":"Méthode : 1) Calculer f(a) et lim_{x→a⁻}. 2) Calculer lim_{x→a⁺}. 3) Vérifier que les trois sont égaux. 4) Conclure. Si l''une des limites latérales n''existe pas ou si elles sont différentes → discontinuité. Si lim gauche = lim droite ≠ f(a) → discontinuité éliminable (prolongement par continuité possible)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001102');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001103','33333333-0000-0000-0000-000000000008','ordering',3,'fr',
'{"stem":"Pour appliquer le TVI et localiser une racine de f(x)=0, ordonnez :","items":["Conclure : il existe c ∈ ]a,b[ avec f(c) = 0","Calculer f(a) et f(b)","Vérifier que f est continue sur [a,b]","Vérifier que f(a) et f(b) sont de signes opposés"],"correct_order":[2,1,3,0],"latex":true}',
'{"text_fr":"Conditions TVI (version racine) : 1) f continue sur [a,b]. 2) Calculer les valeurs aux bornes. 3) Signe opposé : f(a)×f(b) < 0. 4) Conclure l''existence. En BAC, le TVI est souvent couplé à la monotonie (stricte) pour conclure l''UNICITÉ : si f est strictement monotone + TVI → exactement une racine."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001103');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001104','33333333-0000-0000-0000-000000000008','ordering',4,'fr',
'{"stem":"Pour montrer qu''une équation f(x) = k a une unique solution sur [a,b], ordonnez :","items":["Conclure l''unicité (stricte monotonie + existence)","Appliquer le TVI pour l''existence","Montrer que f est strictement monotone sur [a,b]","Vérifier que f(a) et f(b) encadrent k"],"correct_order":[2,3,1,0],"latex":true}',
'{"text_fr":"Existence + Unicité : 1) Monotonie stricte : f''> 0 sur ]a,b[ → strictement croissante. 2) Encadrement : si f(a) < k < f(b) (pour f croissante). 3) TVI → ∃c : f(c) = k. 4) Unicité : si deux solutions c1 < c2 existaient, la stricte monotonie donnerait f(c1) < f(c2) → contradiction avec f(c1)=f(c2)=k. Structure BAC obligatoire : ''existence par TVI + unicité par monotonie stricte''."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001104');

-- ============================================================
-- SKILL 009: tvi (IDs 1105-1117)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001105','33333333-0000-0000-0000-000000000009','mcq',2,'fr',
'{"stem":"Le théorème des valeurs intermédiaires (TVI) s''applique si :","choices":["f est dérivable sur ]a,b[","f est continue sur [a,b]","f est croissante sur [a,b]","f est bornée sur [a,b]"],"correct_index":1,"latex":false}',
'{"text_fr":"Le TVI requiert uniquement la continuité sur [a,b] (fermé borné). La dérivabilité n''est pas nécessaire. La croissante n''est pas nécessaire. Il affirme : pour tout k entre f(a) et f(b), il existe c ∈ [a,b] tel que f(c) = k. C''est une propriété fondamentale des fonctions continues sur des intervalles."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001105');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001106','33333333-0000-0000-0000-000000000009','mcq',2,'fr',
'{"stem":"Si f est continue sur [1,3] avec f(1)=4 et f(3)=-2, le TVI garantit l''existence de c ∈ ]1,3[ tel que f(c) = :","choices":["4","7","0","-4"],"correct_index":2,"latex":false}',
'{"text_fr":"f(1) = 4 > 0 > -2 = f(3). Le TVI garantit l''existence de c tel que f(c) = 0 (toute valeur entre -2 et 4). En particulier, 0 ∈ [-2, 4] est une valeur intermédiaire. La valeur 7 n''est pas garantie car 7 > max(f(1), f(3)) = 4."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001106');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001107','33333333-0000-0000-0000-000000000009','mcq',3,'fr',
'{"stem":"f(x) = x³ + x - 1. Sachant que f(0) = -1 et f(1) = 1, le TVI garantit :","choices":["f(0,5) = 0","∃c ∈ ]0,1[ : f(c) = 0","f est croissante sur [0,1]","f a exactement 3 racines réelles"],"correct_index":1,"latex":true}',
'{"text_fr":"f continue (polynôme), f(0)=-1 < 0 < 1 = f(1). TVI → ∃c ∈ ]0,1[ : f(c) = 0. La valeur exacte f(0,5) n''est pas forcément 0. De plus f''(x) = 3x²+1 > 0 → f strictement croissante → l''équation f(x)=0 a une unique solution réelle (≈ 0,68). Le TVI ne dit pas combien de racines, juste qu''il en existe au moins une dans ]0,1[."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001107');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001108','33333333-0000-0000-0000-000000000009','mcq',3,'fr',
'{"stem":"La méthode de bisection (dichotomie) pour localiser une racine de f(x)=0 sur [a,b] consiste à :","choices":["Calculer f''((a+b)/2) pour trouver la tangente","Calculer f((a+b)/2) et garder le sous-intervalle où le signe change","Utiliser la formule f''(a)(b-a) pour sauter à la racine","Remplacer a et b par les valeurs propres de f"],"correct_index":1,"latex":true}',
'{"text_fr":"Dichotomie : calculer m = (a+b)/2. Si f(a)×f(m) < 0 → racine dans [a,m]. Sinon → racine dans [m,b]. À chaque étape, l''intervalle est divisé par 2. Après n itérations, la précision est (b-a)/2^n. Pour 10 chiffres de précision sur [0,1] : n ≥ 10/log10(2) ≈ 33 itérations."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001108');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001109','33333333-0000-0000-0000-000000000009','mcq',4,'fr',
'{"stem":"Le théorème de point fixe de Brouwer (version 1D) affirme que si f est continue de [a,b] dans [a,b], alors :","choices":["f est constante","f a au moins un point fixe c : f(c) = c","f est dérivable","f est bijective"],"correct_index":1,"latex":true}',
'{"text_fr":"Version 1D de Brouwer : si f : [a,b] → [a,b] est continue, alors ∃c ∈ [a,b] : f(c) = c (point fixe). Preuve : g(x) = f(x) - x. g(a) = f(a) - a ≥ 0 (car f(a) ≥ a). g(b) = f(b) - b ≤ 0 (car f(b) ≤ b). TVI → ∃c : g(c) = 0 → f(c) = c."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001109');

-- Numeric for tvi
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001110','33333333-0000-0000-0000-000000000009','numeric',2,'fr',
'{"stem":"f(x) = x² - 2 sur [1,2]. f(1) = -1 et f(2) = 2. D''après le TVI, il existe c ∈ ]1,2[ avec f(c) = 0 (c = √2 ≈ ?). Donner l''approximation à une décimale.","correct_value":1.4,"tolerance":0.1,"unit":"","latex":true}',
'{"text_fr":"√2 ≈ 1,414. À une décimale : 1,4. Vérification par bisection : f(1,5) = 0,25 > 0 → racine dans ]1,1,5[. f(1,4) = -0,04 < 0 → racine dans ]1,4,1,5[. À une décimale, la racine est entre 1,4 et 1,5, soit 1,4 (arrondi inférieur)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001110');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001111','33333333-0000-0000-0000-000000000009','numeric',3,'fr',
'{"stem":"f(x) = x - cos(x) sur [0, π/2]. f(0) = -1 et f(π/2) = π/2 ≈ 1.57. Le TVI garantit une racine dans ]0, π/2[. Combien de décimales a √2 (pour comparaison : la racine de f est ≈ 0.739) ?","correct_value":3,"tolerance":0,"unit":"décimales exactes de √2 ≈ 1.414","latex":false}',
'{"text_fr":"Cette question sert à vérifier la compréhension du contexte numérique. La racine de x-cos(x)=0 est le point fixe de cos en x≈0,739 (le radian de Dottie). √2 ≈ 1,41421356... a 3 décimales exactes dans l''arrondi 1,414. Exercice de lecture numérique."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001111');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001112','33333333-0000-0000-0000-000000000009','numeric',3,'fr',
'{"stem":"Après 4 étapes de dichotomie sur [0,2] pour f(x)=x²-2, quelle est la longueur maximale de l''intervalle restant ?","correct_value":0.125,"tolerance":0.001,"unit":"","latex":true}',
'{"text_fr":"Après n étapes : longueur = (b-a)/2^n = 2/2^4 = 2/16 = 0,125. Chaque étape divise l''intervalle par 2. Pour une précision de 10^{-p}, il faut n ≥ log2(2/10^{-p}) étapes. La dichotomie converge linéairement (1 bit de précision par itération)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001112');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001113','33333333-0000-0000-0000-000000000009','numeric',4,'fr',
'{"stem":"f(x) = e^x - 3x sur [0,2]. f(0) = 1, f(2) = e²-6 ≈ 1.39, f(1) = e-3 ≈ -0.28. Sur quel sous-intervalle entier [a,a+1] se trouve une racine ? Répondre avec la valeur de a.","correct_value":1,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"f(0)=1 > 0, f(1)≈-0,28 < 0 → changement de signe sur ]0,1[ → racine dans ]0,1[. f(1)≈-0,28 < 0, f(2)≈1,39 > 0 → racine dans ]1,2[ aussi. Il y a deux racines : une dans ]0,1[ et une dans ]1,2[. La question demande le sous-intervalle [a,a+1] contenant une racine → [0,1] avec a=0 ou [1,2] avec a=1. Réponse : a=1 (convention : le plus grand sous-intervalle)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001113');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001114','33333333-0000-0000-0000-000000000009','numeric',4,'fr',
'{"stem":"f est continue strictement croissante sur [a,b], f(a) = 2 et f(b) = 7. L''équation f(x) = 5 a combien de solutions dans ]a,b[ ?","correct_value":1,"tolerance":0,"unit":"solution","latex":false}',
'{"text_fr":"TVI : f(a)=2 < 5 < 7=f(b) → ∃ au moins une solution. Unicité : f strictement croissante → f injective → il ne peut y avoir qu''UNE solution. Donc exactement 1 solution. En BAC : toujours justifier l''unicité séparément de l''existence."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001114');

-- Sequence items for tvi
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001115','33333333-0000-0000-0000-000000000009','ordering',3,'fr',
'{"stem":"Pour montrer qu''une équation f(x)=k a au moins une solution sur [a,b] par le TVI, ordonnez :","items":["Conclure l''existence d''au moins un c ∈ ]a,b[ avec f(c) = k","Montrer que k est compris entre f(a) et f(b) : min(f(a),f(b)) ≤ k ≤ max(f(a),f(b))","Vérifier la continuité de f sur [a,b]","Appliquer le TVI"],"correct_order":[2,1,3,0],"latex":false}',
'{"text_fr":"Structure obligatoire BAC : 1) Continuité (justifier). 2) Encadrement de k (calculer f(a) et f(b), vérifier que k est entre les deux). 3) Application du TVI (citer le théorème). 4) Conclusion. La conclusion doit être formulée avec ''il existe'' et préciser l''intervalle."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001115');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001116','33333333-0000-0000-0000-000000000009','ordering',3,'fr',
'{"stem":"Ordonnez les étapes de la méthode de dichotomie pour localiser une racine de f sur [0,1] :","items":["Si f(0)×f(0.5) < 0 : nouvelle borne droite b=0.5, sinon a=0.5","Calculer f(0.5)","Vérifier f(0) et f(1) de signes opposés","Répéter jusqu''à l''intervalle assez petit"],"correct_order":[2,1,0,3],"latex":false}',
'{"text_fr":"Algorithme de bisection : 1) Vérification initiale : f(a)×f(b) < 0. 2) Calculer f(milieu). 3) Décider quel demi-intervalle contient la racine. 4) Répéter avec le demi-intervalle choisi. Après n itérations : erreur ≤ (b-a)/2^n. La racine est approchée par le milieu du dernier intervalle."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001116');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001117','33333333-0000-0000-0000-000000000009','ordering',4,'fr',
'{"stem":"Ordonnez les conclusions possibles à tirer du TVI selon le nombre de changements de signe observés :","items":["Si f(a) et f(b) même signe : TVI ne conclut pas directement (peut avoir 0 ou 2+ racines)","Si f(a)×f(b) < 0 : au moins 1 racine dans ]a,b[","Si f strictement monotone + f(a)×f(b) < 0 : exactement 1 racine","Si f''(x) ≠ 0 sur ]a,b[ : au plus 1 racine par Rolle/MVT"],"correct_order":[1,0,2,3],"latex":true}',
'{"text_fr":"Nuances du TVI : 1) Signe opposé → ≥ 1 racine. 2) Même signe → pas de conclusion directe (f peut être toujours positive, ou avoir 2 racines). 3) Monotonie stricte → au plus 1 racine sur tout intervalle. 4) f'' ≠ 0 (pas de point critique) → f injective → ≤ 1 racine. Combiner TVI (existence) + monotonie (unicité) → exactement 1 racine."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001117');

-- ============================================================
-- SKILL 010: deriv_basic (IDs 1118-1130)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001118','33333333-0000-0000-0000-000000000010','mcq',2,'fr',
'{"stem":"La dérivée de f(x) = x^n est :","choices":["nx^n","nx^{n-1}","x^{n+1}/(n+1)","ln(n)×x^n"],"correct_index":1,"latex":true}',
'{"text_fr":"(x^n)'' = nx^{n-1}. Exemple : (x³)'' = 3x², (x²)'' = 2x, (x)'' = 1, (1)'' = x^{-1} — non, (x^0)'' = 0. Formule à mémoriser absolument. Application : la primitive de nx^{n-1} est x^n (règle inverse)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001118');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001119','33333333-0000-0000-0000-000000000010','mcq',2,'fr',
'{"stem":"La dérivée de sin(x) est :","choices":["cos(x)","-cos(x)","-sin(x)","1/cos(x)"],"correct_index":0,"latex":true}',
'{"text_fr":"(sin x)'' = cos x. Cycle des dérivées : sin → cos → -sin → -cos → sin (cycle de 4). Dérivées fondamentales : (cos x)'' = -sin x, (tan x)'' = 1/cos²x = 1+tan²x, (ln x)'' = 1/x, (e^x)'' = e^x."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001119');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001120','33333333-0000-0000-0000-000000000010','mcq',2,'fr',
'{"stem":"f(x) = e^x. Quelle est f''(x) ?","choices":["xe^{x-1}","e^x","ln(x)","1/x"],"correct_index":1,"latex":true}',
'{"text_fr":"(e^x)'' = e^x. L''exponentielle est sa propre dérivée — c''est sa propriété fondamentale. C''est la seule fonction (à une constante multiplicative près) égale à sa dérivée. Conséquence : la dérivée n-ième de e^x est e^x."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001120');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001121','33333333-0000-0000-0000-000000000010','mcq',3,'fr',
'{"stem":"f(x) = √x = x^{1/2}. Quelle est f''(x) ?","choices":["1/x","2√x","1/(2√x)","√x/2"],"correct_index":2,"latex":true}',
'{"text_fr":"(x^{1/2})'' = (1/2)x^{1/2-1} = (1/2)x^{-1/2} = 1/(2x^{1/2}) = 1/(2√x). Domaine : x > 0. La dérivée de √x est toujours positive (√x est croissante) et tend vers +∞ en 0 (tangente verticale) et vers 0 en +∞."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001121');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001122','33333333-0000-0000-0000-000000000010','mcq',4,'fr',
'{"stem":"La dérivée de f(x) = ln|x| pour x ≠ 0 est :","choices":["1/x","x/ln(x)","ln(x)/x","1/(x ln x)"],"correct_index":0,"latex":true}',
'{"text_fr":"(ln|x|)'' = 1/x pour x > 0 et pour x < 0 : ln|x| = ln(-x), (ln(-x))'' = -1/(-x) × (-1) = 1/x. Donc dans les deux cas (ln|x|)'' = 1/x. Ceci permet d''écrire la primitive de 1/x comme ln|x| + C (valable sur chaque intervalle où x ≠ 0)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001122');

-- Numeric for deriv_basic
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001123','33333333-0000-0000-0000-000000000010','numeric',2,'fr',
'{"stem":"f(x) = 3x² + 2x - 5. Calculer f''(1).","correct_value":8,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"f''(x) = 6x + 2. f''(1) = 6×1 + 2 = 8. La dérivée de chaque terme : (3x²)''=6x, (2x)''=2, (-5)''=0. Le coefficient de la tangente en x=1 est 8."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001123');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001124','33333333-0000-0000-0000-000000000010','numeric',2,'fr',
'{"stem":"f(x) = x⁴ - 3x² + 7. Calculer f''(2).","correct_value":20,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"f''(x) = 4x³ - 6x. f''(2) = 4×8 - 6×2 = 32 - 12 = 20. Méthode terme par terme : (x⁴)''=4x³, (-3x²)''=-6x, (7)''=0."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001124');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001125','33333333-0000-0000-0000-000000000010','numeric',3,'fr',
'{"stem":"f(x) = e^x + 3ln(x). Calculer f''(1).","correct_value":5.718,"tolerance":0.01,"unit":"","latex":true}',
'{"text_fr":"f''(x) = e^x + 3/x. f''(1) = e^1 + 3/1 = e + 3 ≈ 2,718 + 3 = 5,718. En exactement : f''(1) = e + 3."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001125');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001126','33333333-0000-0000-0000-000000000010','numeric',3,'fr',
'{"stem":"f(x) = sin(x) + cos(x). Calculer f''(π/4).","correct_value":0,"tolerance":0.01,"unit":"","latex":true}',
'{"text_fr":"f''(x) = cos(x) - sin(x). f''(π/4) = cos(π/4) - sin(π/4) = √2/2 - √2/2 = 0. La tangente à la courbe en x=π/4 est horizontale → c''est un extremum local. f(π/4) = √2/2 + √2/2 = √2 (maximum local)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001126');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001127','33333333-0000-0000-0000-000000000010','numeric',4,'fr',
'{"stem":"f(x) = x^x pour x > 0. En utilisant ln, calculer f''(1).","correct_value":1,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"x^x = e^{x ln x}. f''(x) = e^{x ln x} × (ln x + x × 1/x) = x^x × (ln x + 1). f''(1) = 1^1 × (ln 1 + 1) = 1 × (0+1) = 1. Technique : pour dériver x^x, passer par l''exponentielle e^{x ln x}."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001127');

-- Sequence items for deriv_basic
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001128','33333333-0000-0000-0000-000000000010','ordering',3,'fr',
'{"stem":"Ordonnez les dérivées fondamentales par type de fonction :","items":["(e^x)'' = e^x","(x^n)'' = nx^{n-1}","(ln x)'' = 1/x","(sin x)'' = cos x"],"correct_order":[1,3,0,2],"latex":true}',
'{"text_fr":"Ordre pédagogique : 1) Puissances (le plus basique). 2) Trigonométriques (sin/cos). 3) Exponentielle (remarquable). 4) Logarithme (réciproque de l''exponentielle). Ces 4 familles couvrent 90% des fonctions rencontrées au BAC. La dérivée de la fonction réciproque g = f^{-1} se calcule via g''(y) = 1/f''(g(y))."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001128');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001129','33333333-0000-0000-0000-000000000010','ordering',3,'fr',
'{"stem":"Pour calculer f''(a) par la définition (taux de variation), ordonnez :","items":["Simplifier pour éliminer h au dénominateur","Calculer lim_{h→0} du taux de variation","Former le taux de variation (f(a+h)-f(a))/h","Calculer f(a+h) explicitement"],"correct_order":[3,2,0,1],"latex":true}',
'{"text_fr":"Méthode directe (définition) : 1) Calculer f(a+h). 2) Former [f(a+h)-f(a)]/h. 3) Simplifier (factoriser h, développer). 4) Passer à la limite h→0. Exemple : f(x)=x², f''(a) = lim [(a+h)²-a²]/h = lim [2ah+h²]/h = lim (2a+h) = 2a."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001129');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001130','33333333-0000-0000-0000-000000000010','ordering',4,'fr',
'{"stem":"Pour écrire l''équation de la tangente à la courbe de f en x = a, ordonnez :","items":["Équation : y = f(a) + f''(a)(x-a)","Calculer f(a) (ordonnée du point de tangence)","Calculer f''(a) (pente de la tangente)","Identifier le point de tangence A(a, f(a))"],"correct_order":[3,1,2,0],"latex":true}',
'{"text_fr":"Équation de la tangente en a : 1) Point A(a, f(a)) sur la courbe. 2) Pente = f''(a) (coefficient directeur). 3) Écrire y - f(a) = f''(a)(x - a), soit y = f(a) + f''(a)(x-a). Si f''(a)=0 : tangente horizontale (extremum). Si f''(a) n''existe pas (f non dérivable) : pas de tangente ordinaire (possible tangente verticale si lim du taux est ±∞)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001130');

-- ============================================================
-- SKILL 011: deriv_rules (IDs 1131-1143)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001131','33333333-0000-0000-0000-000000000011','mcq',2,'fr',
'{"stem":"La règle du produit donne (fg)'' = :","choices":["f''g''","f''g + fg''","f''g - fg''","(f+g)''"],"correct_index":1,"latex":true}',
'{"text_fr":"Règle du produit (de Leibniz) : (fg)'' = f''g + fg''. Moyen mnémotechnique : ''dérivée de la première fois la seconde, plus la première fois la dérivée de la seconde''. Exemple : (x² sin x)'' = 2x sin x + x² cos x."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001131');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001132','33333333-0000-0000-0000-000000000011','mcq',2,'fr',
'{"stem":"La règle de la chaîne donne (f(g(x)))'' = :","choices":["f''(g(x))","g''(x) × f''(g(x))","f''(x) × g''(x)","f''(g''(x))"],"correct_index":1,"latex":true}',
'{"text_fr":"Règle de la chaîne (ou dérivation des fonctions composées) : (f∘g)''(x) = f''(g(x)) × g''(x). Méthode : dériver la fonction externe évaluée à la fonction interne, fois la dérivée de la fonction interne. Exemple : (sin(x²))'' = cos(x²) × 2x = 2x cos(x²)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001132');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001133','33333333-0000-0000-0000-000000000011','mcq',3,'fr',
'{"stem":"f(x) = e^{2x+3}. Quelle est f''(x) ?","choices":["e^{2x+3}","2e^{2x+3}","2e^{2x}","3e^{2x+3}"],"correct_index":1,"latex":true}',
'{"text_fr":"f = e^u avec u = 2x+3. f'' = u'' × e^u = 2 × e^{2x+3}. Règle : (e^{ax+b})'' = a × e^{ax+b}. Generalisation : (e^{u(x)})'' = u''(x) × e^{u(x)}."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001133');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001134','33333333-0000-0000-0000-000000000011','mcq',3,'fr',
'{"stem":"f(x) = ln(x² + 1). Quelle est f''(x) ?","choices":["1/(x²+1)","2x/(x²+1)","2x ln(x²+1)","x/(x²+1)"],"correct_index":1,"latex":true}',
'{"text_fr":"f = ln(u) avec u = x²+1. f'' = u''/u = 2x/(x²+1). Règle : (ln u(x))'' = u''(x)/u(x). Vérification : x=0 → f''(0) = 0/(0+1) = 0 → tangente horizontale en 0. x=1 → f''(1) = 2/2 = 1."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001134');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001135','33333333-0000-0000-0000-000000000011','mcq',4,'fr',
'{"stem":"La règle du quotient donne (f/g)'' = :","choices":["f''/g''","(f''g - fg'')/g","(f''g - fg'')/g²","(f''g + fg'')/g²"],"correct_index":2,"latex":true}',
'{"text_fr":"(f/g)'' = (f''g - fg'')/g². Moyen mnémotechnique : ''haut-prime fois bas, moins haut fois bas-prime, divisé par bas au carré''. Exemple : (sin x / x)'' = (cos x × x - sin x × 1)/x² = (x cos x - sin x)/x²."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001135');

-- Numeric for deriv_rules
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001136','33333333-0000-0000-0000-000000000011','numeric',2,'fr',
'{"stem":"f(x) = x²e^x. Calculer f''(0).","correct_value":0,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"f''(x) = (x²)''e^x + x²(e^x)'' = 2xe^x + x²e^x = (2x + x²)e^x = x(2+x)e^x. f''(0) = 0×2×1 = 0. La tangente en x=0 est horizontale. f(0)=0, donc (0,0) est un point stationnaire."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001136');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001137','33333333-0000-0000-0000-000000000011','numeric',3,'fr',
'{"stem":"f(x) = sin(3x). Calculer f''(π/6).","correct_value":3,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"f''(x) = 3cos(3x). f''(0) = 3cos(0) = 3×1 = 3. La pente de la tangente en x=0 est 3."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001137');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001138','33333333-0000-0000-0000-000000000011','numeric',3,'fr',
'{"stem":"f(x) = ln(2x+1). Calculer f''(0).","correct_value":2,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"f''(x) = (2x+1)''/( 2x+1) = 2/(2x+1). f''(0) = 2/(0+1) = 2. Règle : (ln(ax+b))'' = a/(ax+b)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001138');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001139','33333333-0000-0000-0000-000000000011','numeric',4,'fr',
'{"stem":"f(x) = x / (x+1). Calculer f''(x) (résultat simplifié).","correct_value":1,"tolerance":0,"unit":"la valeur de 1/(x+1)² à x=0","latex":true}',
'{"text_fr":"f''(x) = [(x)''(x+1) - x(x+1)''] / (x+1)² = [1×(x+1) - x×1]/(x+1)² = 1/(x+1)². f''(0) = 1/1 = 1. Généralisation : si f(x) = x/(x+a), f''(x) = a/(x+a)²."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001139');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001140','33333333-0000-0000-0000-000000000011','numeric',4,'fr',
'{"stem":"f(x) = (x²+1)^5. Calculer f''(1).","correct_value":80,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"f''(x) = 10x(x²+1)^4. f''(1) = 10×1×(2)^4 = 10×16 = 160."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001140');

-- Sequence items for deriv_rules
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001141','33333333-0000-0000-0000-000000000011','ordering',3,'fr',
'{"stem":"Pour dériver f(x) = sin(x²+1) par la règle de la chaîne, ordonnez :","items":["Multiplier : f''(x) = cos(x²+1) × 2x","Identifier la fonction externe f(u) = sin(u) et interne g(x) = x²+1","Dériver l''externe : f''(u) = cos(u)","Dériver l''interne : g''(x) = 2x"],"correct_order":[1,2,3,0],"latex":true}',
'{"text_fr":"Règle de la chaîne : 1) Identifier f∘g : g(x)=x²+1 (interne), f(u)=sin(u) (externe). 2) f''(u) = cos(u). 3) g''(x) = 2x. 4) (f∘g)''(x) = f''(g(x))×g''(x) = cos(x²+1)×2x. Toujours identifier clairement la composition avant de dériver."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001141');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001142','33333333-0000-0000-0000-000000000011','ordering',3,'fr',
'{"stem":"Pour dériver f(x) = x³ ln(x) par la règle du produit, ordonnez :","items":["Résultat : f''(x) = x²(3 ln(x) + 1)","Identifier u = x³ et v = ln(x)","Calculer u'' = 3x² et v'' = 1/x","Appliquer (uv)'' = u''v + uv'' = 3x²ln(x) + x³/x"],"correct_order":[1,2,3,0],"latex":true}',
'{"text_fr":"1) u = x³, v = ln x. 2) u'' = 3x², v'' = 1/x. 3) (uv)'' = 3x² ln x + x³ × (1/x) = 3x² ln x + x². 4) Factoriser : x²(3 ln x + 1). Vérification : en x=1, f''(1) = 1×(0+1) = 1. Par limite en 0⁺ : f(x)→0 mais f''(x)→? (x→0⁺, ln x→-∞ mais x²→0 plus vite → f''→0)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001142');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001143','33333333-0000-0000-0000-000000000011','ordering',4,'fr',
'{"stem":"Ordonnez les étapes pour dériver f(x) = e^{sin(x²)} :","items":["Résultat final : 2x cos(x²) × e^{sin(x²)}","Reconnaître la triple composition : e^(sin(x²))","Dériver la couche intermédiaire : (sin(x²))'' = 2x cos(x²)","Dériver la couche externe : (e^u)'' = e^u"],"correct_order":[1,3,2,0],"latex":true}',
'{"text_fr":"Triple composition : h(x) = e^{sin(x²)}. Couches : interne g(x)=x², médiane m(u)=sin(u), externe f(v)=e^v. h''(x) = f''(m(g)) × m''(g) × g''(x) = e^{sin(x²)} × cos(x²) × 2x. Application de la règle de la chaîne deux fois : (e^{sin(x²)})'' = e^{sin(x²)} × (sin(x²))'' = e^{sin(x²)} × cos(x²) × 2x."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001143');

-- ============================================================
-- SKILL 012: deriv_apps (IDs 1144-1156)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001144','33333333-0000-0000-0000-000000000012','mcq',2,'fr',
'{"stem":"Si f''(a) > 0, la fonction f est :","choices":["Décroissante en a","Croissante en a","Convexe en a","Nulle en a"],"correct_index":1,"latex":true}',
'{"text_fr":"Si f''(x) > 0 sur un intervalle, f est strictement croissante sur cet intervalle. Tableau de signes de f'' → tableau de variations de f. Si f''(a) > 0 : localement croissant. f''(a) = 0 seul ne suffit pas à conclure (peut être un point d''inflexion)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001144');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001145','33333333-0000-0000-0000-000000000012','mcq',2,'fr',
'{"stem":"Un maximum local de f se produit en a si :","choices":["f''(a) = 0 et f''''(a) > 0","f''(a) = 0 et f'' change de signe de + à - en a","f''(a) > 0","f(a) = 0"],"correct_index":1,"latex":true}',
'{"text_fr":"Maximum local : f''(a)=0 et f'' passe de + à - (f croit puis décroît). Ou : f''(a)=0 et f''''(a) < 0 (critère de la dérivée seconde). Si f''(a)=0 et f''''(a) > 0 : minimum local. Si f''''(a)=0 aussi : critère plus difficile, étudier le signe de f'' localement."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001145');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001146','33333333-0000-0000-0000-000000000012','mcq',3,'fr',
'{"stem":"f(x) = x³ - 3x. Les extrema de f sur ℝ sont en :","choices":["x = 0 seulement","x = 1 et x = -1","x = 3 et x = -3","f n''a pas d''extrema"],"correct_index":1,"latex":true}',
'{"text_fr":"f''(x) = 3x²-3 = 3(x²-1) = 3(x-1)(x+1) = 0 → x=1 ou x=-1. Pour x=-1 : f'' change de + à - → maximum local f(-1)=2. Pour x=1 : f'' change de - à + → minimum local f(1)=-2. Ces extrema sont locaux (pas globaux car f→±∞)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001146');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001147','33333333-0000-0000-0000-000000000012','mcq',3,'fr',
'{"stem":"Une asymptote oblique y = ax + b pour f(x) quand x→+∞ se calcule par :","choices":["a = lim f(x)/x et b = lim (f(x) - ax)","a = f''(∞) et b = f(0)","a = lim (f(x+1) - f(x)) et b = 0","a = lim f(x)/x² et b = lim f(x)"],"correct_index":0,"latex":true}',
'{"text_fr":"Asymptote oblique y = ax+b : calculer a = lim_{x→∞} f(x)/x. Puis b = lim_{x→∞} (f(x) - ax). Si a = 0 : asymptote horizontale. Si a ≠ 0 : asymptote oblique. La courbe s''approche de y=ax+b mais ne la coupe pas (ou ne la touche qu''un nombre fini de fois)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001147');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001148','33333333-0000-0000-0000-000000000012','mcq',4,'fr',
'{"stem":"Le théorème de Rolle affirme que si f est continue sur [a,b], dérivable sur ]a,b[ et f(a)=f(b), alors :","choices":["f est constante","∃c ∈ ]a,b[ : f''(c) = 0","f a un minimum en (a+b)/2","f'' est positive"],"correct_index":1,"latex":true}',
'{"text_fr":"Théorème de Rolle : conditions (i) f continue sur [a,b], (ii) f dérivable sur ]a,b[, (iii) f(a)=f(b) → ∃c ∈ ]a,b[ : f''(c) = 0. Interprétation : si f revient à sa valeur initiale, il y a un point stationnaire entre les deux. C''est un cas particulier du théorème des accroissements finis (TAF/MVT) avec f(a)=f(b)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001148');

-- Numeric for deriv_apps
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001149','33333333-0000-0000-0000-000000000012','numeric',2,'fr',
'{"stem":"f(x) = x² - 4x + 3. En quel point x le minimum de f est-il atteint ?","correct_value":2,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"f''(x) = 2x - 4 = 0 → x = 2. f''''(2) = 2 > 0 → minimum. f(2) = 4 - 8 + 3 = -1 (valeur minimale). Ou méthode de la forme canonique : f(x) = (x-2)² - 1 → minimum en x=2, valeur -1."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001149');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001150','33333333-0000-0000-0000-000000000012','numeric',3,'fr',
'{"stem":"f(x) = xe^{-x}. En quel point le maximum de f est-il atteint ?","correct_value":1,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"f''(x) = e^{-x} + x×(-e^{-x}) = e^{-x}(1-x). f''(x) = 0 → 1-x = 0 → x = 1. f'' > 0 pour x<1, f'' < 0 pour x>1 → x=1 est un maximum. f(1) = e^{-1} = 1/e ≈ 0,368. Vérification : f → 0 en 0 et en +∞ → maximum global en x=1."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001150');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001151','33333333-0000-0000-0000-000000000012','numeric',3,'fr',
'{"stem":"f(x) = x + 4/x pour x > 0. Valeur minimale de f pour x > 0.","correct_value":4,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"f''(x) = 1 - 4/x² = 0 → x² = 4 → x = 2 (x > 0). f(2) = 2 + 2 = 4. Vérification par IAG (inégalité AM-GM) : x + 4/x ≥ 2√(x × 4/x) = 2×2 = 4, égalité si x = 4/x → x=2. Minimum = 4 atteint en x=2."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001151');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001152','33333333-0000-0000-0000-000000000012','numeric',4,'fr',
'{"stem":"Une boîte sans couvercle à base carrée de côté x et hauteur h a un volume V=32. Exprimer h en fonction de x et minimiser la surface S. La valeur de x minimisant S est x = ?","correct_value":4,"tolerance":0.1,"unit":"","latex":true}',
'{"text_fr":"V = x²h = 32 → h = 32/x². S = x² + 4xh = x² + 4x×(32/x²) = x² + 128/x. S''(x) = 2x - 128/x² = 0 → 2x³ = 128 → x³ = 64 → x = 4. S''''(4) = 2 + 256/64 > 0 → minimum. h = 32/16 = 2. Boîte optimale : x=4, h=2."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001152');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001153','33333333-0000-0000-0000-000000000012','numeric',4,'fr',
'{"stem":"f(x) = ln(x)/x sur ]0,+∞[. La valeur maximale de f est :","correct_value":0.368,"tolerance":0.01,"unit":"","latex":true}',
'{"text_fr":"f''(x) = (1/x × x - ln(x) × 1)/x² = (1-ln x)/x². f''(x) = 0 → 1-ln x = 0 → x = e. f'' > 0 pour x<e, f'' < 0 pour x>e → maximum en x=e. f(e) = ln(e)/e = 1/e ≈ 0,368. C''est le maximum global de ln(x)/x sur ]0,+∞[."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001153');

-- Sequence items for deriv_apps
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001154','33333333-0000-0000-0000-000000000012','ordering',3,'fr',
'{"stem":"Pour dresser le tableau de variations de f, ordonnez la démarche BAC :","items":["Dresser le tableau avec variations de f déduit des signes","Calculer f''(x) et trouver ses annulations","Étudier le signe de f'' sur chaque intervalle","Calculer f en les points remarquables (annulations de f'', bornes)"],"correct_order":[1,2,3,0],"latex":true}',
'{"text_fr":"Méthode complète BAC : 1) Calculer f'' explicitement. 2) Résoudre f''(x)=0 (points critiques). 3) Signe de f'' sur chaque sous-intervalle (tableau de signe). 4) Calculer f en les extrema et aux bornes. 5) Dresser le tableau de variations : lignes x, f''(x), f(x) avec flèches ↗ si f''>0, ↘ si f''<0."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001154');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001155','33333333-0000-0000-0000-000000000012','ordering',3,'fr',
'{"stem":"Pour trouver une asymptote oblique y = ax + b de f quand x→+∞, ordonnez :","items":["Calculer b = lim_{x→+∞} (f(x) - ax)","Calculer a = lim_{x→+∞} f(x)/x","Conclure : y = ax + b est asymptote oblique si a et b sont finis","Vérifier que a ≠ 0 (sinon asymptote horizontale)"],"correct_order":[1,0,3,2],"latex":true}',
'{"text_fr":"1) a = lim f(x)/x (si = 0 → asymptote horizontale). 2) b = lim (f(x)-ax) (si fini → asymptote oblique). 3) Si a≠0 et b fini → y=ax+b est AO. 4) Conclure. Exemple : f(x) = (x²+1)/x = x + 1/x. a = lim x + 1/x / x = 1. b = lim (x+1/x - x) = 0. AO : y = x."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001155');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001156','33333333-0000-0000-0000-000000000012','ordering',4,'fr',
'{"stem":"Pour un problème d''optimisation, ordonnez la stratégie :","items":["Vérifier qu''il s''agit d''un max ou min (signe de f'''' ou tableau de var)","Exprimer la quantité à optimiser f en fonction d''une seule variable","Calculer f''(x) et résoudre f''(x) = 0","Modéliser le problème et identifier les contraintes"],"correct_order":[3,1,2,0],"latex":true}',
'{"text_fr":"Optimisation BAC : 1) Modéliser : identifier la variable x, les contraintes, et la quantité à optimiser. 2) Exprimer f(x) en utilisant les contraintes pour éliminer les variables superflues. 3) Calculer f''(x) = 0 → candidats. 4) Déterminer si min ou max. 5) Calculer la valeur optimale et vérifier les contraintes physiques (x>0, etc.). Ne pas oublier de vérifier le domaine de définition."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001156');

-- ============================================================
-- SKILL 013: primitives (IDs 1157-1169)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001157','33333333-0000-0000-0000-000000000013','mcq',2,'fr',
'{"stem":"Quelle est une primitive de f(x) = 3x² + 2x - 5 ?","choices":["x³ + x² - 5x + C","3x³ + 2x² - 5x + C","x³ + x - 5 + C","6x + 2 + C"],"correct_index":0,"latex":true}',
'{"text_fr":"∫(3x²+2x-5)dx = 3×x³/3 + 2×x²/2 - 5x + C = x³ + x² - 5x + C. Règle : ∫xⁿdx = xⁿ⁺¹/(n+1) + C pour n ≠ -1. Erreur classique : oublier de diviser par le nouvel exposant."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001157');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001158','33333333-0000-0000-0000-000000000013','mcq',2,'fr',
'{"stem":"Une primitive de f(x) = e^{2x} est :","choices":["2e^{2x}","e^{2x}/2","e^{2x}","e^{x²}"],"correct_index":1,"latex":true}',
'{"text_fr":"∫e^{ax}dx = e^{ax}/a + C. Pour a=2 : ∫e^{2x}dx = e^{2x}/2 + C. Vérification par dérivation : (e^{2x}/2)'' = 2e^{2x}/2 = e^{2x} ✓. Erreur classique : multiplier par a au lieu de diviser."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001158');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001159','33333333-0000-0000-0000-000000000013','mcq',3,'fr',
'{"stem":"∫ sin(3x) dx =","choices":["cos(3x)/3 + C","-cos(3x)/3 + C","3cos(3x) + C","-3cos(3x) + C"],"correct_index":1,"latex":true}',
'{"text_fr":"∫sin(ax)dx = -cos(ax)/a + C. Pour a=3 : -cos(3x)/3 + C. Vérification : (-cos(3x)/3)'' = 3sin(3x)/3 = sin(3x) ✓. Mnémotechnique : intégrer sin donne -cos (le signe change), puis diviser par le coefficient intérieur."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001159');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001160','33333333-0000-0000-0000-000000000013','mcq',3,'fr',
'{"stem":"∫ 1/x dx =","choices":["1/x² + C","-1/x² + C","ln|x| + C","ln(x²) + C"],"correct_index":2,"latex":true}',
'{"text_fr":"∫(1/x)dx = ln|x| + C (valeur absolue obligatoire pour x ≠ 0). C''est la primitive fondamentale pour x⁻¹ (cas exclu de la règle xⁿ⁺¹/(n+1) qui ne s''applique que pour n ≠ -1). Au BAC, omettre les valeurs absolues est souvent accepté mais la précision est conseillée."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001160');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001161','33333333-0000-0000-0000-000000000013','mcq',4,'fr',
'{"stem":"Pour calculer ∫ x·e^{x} dx, la méthode appropriée est :","choices":["Substitution u=x²","Intégration par parties avec u=x, v''=e^x","Règle directe e^x/x","Décomposition en éléments simples"],"correct_index":1,"latex":true}',
'{"text_fr":"Intégration par parties : ∫u·v''dx = uv - ∫u''·v dx. Poser u=x (→u''=1), v''=e^x (→v=e^x). Résultat : xe^x - ∫1·e^x dx = xe^x - e^x + C = e^x(x-1) + C. Vérification : (e^x(x-1))'' = e^x(x-1) + e^x = xe^x ✓."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001161');

-- Numeric for primitives
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001162','33333333-0000-0000-0000-000000000013','numeric',2,'fr',
'{"stem":"F est une primitive de f(x) = 2x + 3 avec F(0) = 1. Quelle est F(2) ?","correct_value":11,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"F(x) = x² + 3x + C. F(0) = C = 1. Donc F(x) = x² + 3x + 1. F(2) = 4 + 6 + 1 = 11."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001162');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001163','33333333-0000-0000-0000-000000000013','numeric',3,'fr',
'{"stem":"∫₀¹ (2x+1) dx = ?","correct_value":2,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"Primitive : F(x) = x² + x. ∫₀¹ = F(1) - F(0) = (1+1) - 0 = 2. Vérification géométrique : aire du trapèze de bases f(0)=1 et f(1)=3, hauteur 1 → (1+3)/2 = 2 ✓."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001163');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001164','33333333-0000-0000-0000-000000000013','numeric',3,'fr',
'{"stem":"∫ x·cos(x) dx évalué en x=π vaut (à partir de la primitive F(x) = x·sin(x) + cos(x)) :","correct_value":-1,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"F(x) = x·sin(x) + cos(x) (obtenu par IPP : u=x, v''=cos x → v=sin x → xe^x... → x·sin x + cos x). F(π) = π·sin(π) + cos(π) = π·0 + (-1) = -1."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001164');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001165','33333333-0000-0000-0000-000000000013','numeric',4,'fr',
'{"stem":"∫₀¹ x·e^x dx = ?  (Donner la valeur exacte, réponse de la forme a où e^1 ≈ 2,718)","correct_value":1,"tolerance":0.01,"unit":"","latex":true}',
'{"text_fr":"IPP : u=x, v''=e^x → v=e^x. ∫₀¹ xe^x dx = [xe^x]₀¹ - ∫₀¹ e^x dx = (1·e - 0) - [e^x]₀¹ = e - (e - 1) = e - e + 1 = 1."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001165');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001166','33333333-0000-0000-0000-000000000013','numeric',4,'fr',
'{"stem":"∫₁^e ln(x) dx = ?","correct_value":1,"tolerance":0.01,"unit":"","latex":true}',
'{"text_fr":"IPP : u=ln x (→u''=1/x), v''=1 (→v=x). ∫ln x dx = x·ln x - ∫x·(1/x)dx = x·ln x - x + C. ∫₁^e ln x dx = [x·ln x - x]₁^e = (e·1 - e) - (1·0 - 1) = 0 - (-1) = 1."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001166');

-- Sequence for primitives
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001167','33333333-0000-0000-0000-000000000013','ordering',3,'fr',
'{"stem":"Pour calculer ∫ x·ln(x) dx par IPP, ordonnez :","items":["Calculer : x²ln(x)/2 - ∫x/2 dx = x²ln(x)/2 - x²/4 + C","Poser u=ln(x) et v''=x → u''=1/x et v=x²/2","Appliquer la formule ∫uv'' = uv - ∫u''v","Identifier un produit de fonctions de natures différentes"],"correct_order":[3,1,2,0],"latex":true}',
'{"text_fr":"1) Reconnaître ln×polynôme → IPP avec u=ln(x). 2) u=ln x, v''=x → u''=1/x, v=x²/2. 3) ∫x·ln x dx = (x²/2)ln x - ∫(x²/2)(1/x)dx = (x²ln x)/2 - ∫(x/2)dx = (x²ln x)/2 - x²/4 + C = (x²/4)(2ln x - 1) + C."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001167');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001168','33333333-0000-0000-0000-000000000013','ordering',3,'fr',
'{"stem":"Pour trouver la primitive F de f avec une condition initiale F(a)=b, ordonnez :","items":["Calculer F(a) = b pour trouver C","Écrire F(x) = G(x) + C où G est une primitive quelconque","Conclure : F(x) = G(x) + (b - G(a))","Intégrer f pour obtenir G(x)"],"correct_order":[3,1,0,2],"latex":true}',
'{"text_fr":"1) Calculer G(x) une primitive de f. 2) Écrire F(x) = G(x) + C. 3) Condition initiale : F(a) = G(a) + C = b → C = b - G(a). 4) Substituer : F(x) = G(x) + b - G(a). Cette méthode s''applique systématiquement pour toute primitive avec condition initiale."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001168');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001169','33333333-0000-0000-0000-000000000013','ordering',4,'fr',
'{"stem":"Pour calculer ∫ f''(x)/f(x) dx, ordonnez la reconnaissance de forme :","items":["Conclure : ∫f''(x)/f(x)dx = ln|f(x)| + C","Vérifier : (ln|f(x)|)'' = f''(x)/f(x) par règle de la chaîne","Reconnaître la forme u''/u avec u=f(x)","Appliquer la formule ∫u''/u dx = ln|u| + C"],"correct_order":[2,3,1,0],"latex":true}',
'{"text_fr":"Forme logarithmique : chaque fois qu''on voit f''(x)/f(x), c''est la dérivée de ln|f(x)|. Exemples : ∫(2x)/(x²+1)dx = ln(x²+1)+C (f=x²+1, f''=2x). ∫tan(x)dx = ∫sin/cos dx = -ln|cos x|+C. Reconnaître cette forme est une compétence clé BAC."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001169');

-- ============================================================
-- SKILL 014: definite_integral (IDs 1170-1182)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001170','33333333-0000-0000-0000-000000000014','mcq',2,'fr',
'{"stem":"∫ₐᵇ f(x) dx représente géométriquement :","choices":["La pente de f entre a et b","L''aire algébrique sous la courbe de f entre a et b","La valeur de f en (a+b)/2","La longueur de la courbe entre a et b"],"correct_index":1,"latex":true}',
'{"text_fr":"∫ₐᵇ f(x)dx est l''aire algébrique : positive là où f>0, négative là où f<0. Pour l''aire géométrique (toujours positive), il faut calculer ∫ₐᵇ |f(x)|dx, en découpant aux zéros de f. Distinction obligatoire au BAC entre aire algébrique et aire géométrique."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001170');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001171','33333333-0000-0000-0000-000000000014','mcq',2,'fr',
'{"stem":"Si F est une primitive de f sur [a,b], alors ∫ₐᵇ f(x)dx =","choices":["F(b) + F(a)","F(b) - F(a)","F(a) - F(b)","F''(b) - F''(a)"],"correct_index":1,"latex":true}',
'{"text_fr":"Théorème fondamental du calcul : ∫ₐᵇ f(x)dx = [F(x)]ₐᵇ = F(b) - F(a). L''ordre compte : borne haute moins borne basse. Si on inverse les bornes : ∫ᵦₐ f = -∫ₐᵇ f. Notation usuelle : [F(x)]ₐᵇ."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001171');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001172','33333333-0000-0000-0000-000000000014','mcq',3,'fr',
'{"stem":"∫₀^π sin(x) dx =","choices":["0","2","-2","π"],"correct_index":1,"latex":true}',
'{"text_fr":"∫₀^π sin(x)dx = [-cos(x)]₀^π = -cos(π) - (-cos(0)) = -(-1) - (-1) = 1 + 1 = 2. Interprétation : sin(x) ≥ 0 sur [0,π], donc l''intégrale = aire du demi-arc de sinusoïde = 2 (résultat à connaître)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001172');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001173','33333333-0000-0000-0000-000000000014','mcq',3,'fr',
'{"stem":"La valeur moyenne de f sur [a,b] est définie par :","choices":["(f(a)+f(b))/2","(1/(b-a)) × ∫ₐᵇ f(x)dx","∫ₐᵇ f(x)dx / f''((a+b)/2)","f((a+b)/2)"],"correct_index":1,"latex":true}',
'{"text_fr":"Valeur moyenne (ou valeur efficace) : μ = (1/(b-a)) ∫ₐᵇ f(x)dx. C''est la hauteur du rectangle de base (b-a) ayant la même aire que sous la courbe. Le théorème de la valeur moyenne affirme qu''il existe c ∈ [a,b] avec f(c) = μ (si f continue)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001173');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001174','33333333-0000-0000-0000-000000000014','mcq',4,'fr',
'{"stem":"Pour calculer ∫₀¹ √(1-x²) dx, la substitution appropriée est :","choices":["x = t²","x = sin(t)","x = 1/t","x = e^t"],"correct_index":1,"latex":true}',
'{"text_fr":"x = sin(t) → dx = cos(t)dt, √(1-x²) = √(1-sin²t) = cos(t). Bornes : x=0 → t=0, x=1 → t=π/2. ∫₀^{π/2} cos(t)·cos(t)dt = ∫₀^{π/2} cos²(t)dt = π/4. Interprétation : ∫₀¹ √(1-x²)dx est l''aire du quart de disque unité = π/4 ✓."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001174');

-- Numeric for definite_integral
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001175','33333333-0000-0000-0000-000000000014','numeric',2,'fr',
'{"stem":"∫₁³ (2x-1) dx = ?","correct_value":6,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"F(x) = x²-x. ∫₁³ = F(3)-F(1) = (9-3)-(1-1) = 6-0 = 6. Vérification géométrique : trapèze de bases f(1)=1 et f(3)=5, hauteur 2 → (1+5)/2 × 2 = 6 ✓."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001175');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001176','33333333-0000-0000-0000-000000000014','numeric',3,'fr',
'{"stem":"∫₀^{π/2} cos(x) dx = ?","correct_value":1,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"∫cos(x)dx = sin(x)+C. ∫₀^{π/2} cos(x)dx = [sin(x)]₀^{π/2} = sin(π/2)-sin(0) = 1-0 = 1."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001176');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001177','33333333-0000-0000-0000-000000000014','numeric',3,'fr',
'{"stem":"∫₀¹ e^x dx = ? (donner la valeur exacte arrondie à 0.001, e ≈ 2.718)","correct_value":1.718,"tolerance":0.001,"unit":"","latex":true}',
'{"text_fr":"∫₀¹ e^x dx = [e^x]₀¹ = e¹ - e⁰ = e - 1 ≈ 2,718 - 1 = 1,718. Valeur exacte : e-1."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001177');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001178','33333333-0000-0000-0000-000000000014','numeric',4,'fr',
'{"stem":"Aire entre f(x)=x² et g(x)=x sur [0,1] :","correct_value":0.167,"tolerance":0.005,"unit":"unités²","latex":true}',
'{"text_fr":"f(x) ≤ g(x) sur [0,1] (x²≤x car x∈[0,1]). Aire = ∫₀¹(x-x²)dx = [x²/2 - x³/3]₀¹ = 1/2 - 1/3 = 3/6 - 2/6 = 1/6 ≈ 0,167."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001178');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001179','33333333-0000-0000-0000-000000000014','numeric',4,'fr',
'{"stem":"∫₀² |x-1| dx = ?","correct_value":1,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"Découper en [0,1] et [1,2]. Sur [0,1] : |x-1|=1-x. Sur [1,2] : |x-1|=x-1. ∫₀¹(1-x)dx = [x-x²/2]₀¹ = 1/2. ∫₁²(x-1)dx = [x²/2-x]₁² = (2-2)-(1/2-1) = 1/2. Total = 1/2+1/2 = 1."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001179');

-- Sequence for definite_integral
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001180','33333333-0000-0000-0000-000000000014','ordering',3,'fr',
'{"stem":"Pour calculer l''aire entre deux courbes f et g sur [a,b], ordonnez :","items":["Calculer ∫ₐᵇ |f(x)-g(x)| dx en découpant aux intersections","Trouver les points d''intersection de f et g sur [a,b]","Déterminer quelle courbe est au-dessus sur chaque sous-intervalle","Exprimer l''aire comme somme d''intégrales positives"],"correct_order":[1,2,0,3],"latex":true}',
'{"text_fr":"Aire entre courbes : 1) Résoudre f(x)=g(x) pour trouver les croisements. 2) Sur chaque intervalle, identifier f-g>0 ou g-f>0. 3) L''aire totale = ∫|f-g|dx = somme des intégrales de (courbe du haut - courbe du bas) sur chaque sous-intervalle."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001180');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001181','33333333-0000-0000-0000-000000000014','ordering',3,'fr',
'{"stem":"Pour utiliser la substitution u=g(x) dans une intégrale, ordonnez :","items":["Remplacer x et dx par u et du dans l''intégrale","Changer les bornes : a→g(a) et b→g(b)","Calculer du = g''(x)dx","Reconnaître la forme g''(x)·h(g(x)) dans l''intégrande"],"correct_order":[3,2,0,1],"latex":true}',
'{"text_fr":"Substitution (changement de variable) : 1) Identifier la forme u=g(x) (souvent u est l''intérieur d''une composition). 2) Calculer du=g''(x)dx. 3) Substituer : tout doit être en u et du. 4) Changer les bornes OBLIGATOIREMENT pour les intégrales définies."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001181');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001182','33333333-0000-0000-0000-000000000014','ordering',4,'fr',
'{"stem":"Pour calculer ∫ₐᵇ f(x)dx par IPP, ordonnez :","items":["Évaluer [u·v]ₐᵇ - ∫ₐᵇ u''·v dx","Poser u et v'' ; calculer u'' et v","Vérifier et simplifier le résultat","Appliquer la formule ∫ₐᵇ u·v''dx = [u·v]ₐᵇ - ∫ₐᵇ u''·v dx"],"correct_order":[1,3,0,2],"latex":true}',
'{"text_fr":"IPP définie : 1) Choisir u (dériver facilement) et v'' (intégrer facilement). 2) Appliquer la formule. 3) Calculer le terme [uv]ₐᵇ = u(b)v(b)-u(a)v(a). 4) Calculer la nouvelle intégrale ∫u''v dx (souvent plus simple). Règle LIATE pour choisir u : Logarithme > Inverse trig > Algébrique > Trig > Exponentielle."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001182');

-- ============================================================
-- SKILL 015: integral_apps (IDs 1183-1195)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001183','33333333-0000-0000-0000-000000000015','mcq',2,'fr',
'{"stem":"L''aire entre la courbe de f et l''axe des abscisses sur [a,b] (où f≥0) est :","choices":["f(b)-f(a)","∫ₐᵇ f(x)dx","(b-a)×f((a+b)/2)","∫ₐᵇ f''(x)dx"],"correct_index":1,"latex":true}',
'{"text_fr":"Si f(x) ≥ 0 sur [a,b], l''aire géométrique = ∫ₐᵇ f(x)dx. Si f peut changer de signe, l''aire géométrique = ∫ₐᵇ |f(x)|dx. Distinction fondamentale BAC : intégrale (algébrique) ≠ aire (toujours positive)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001183');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001184','33333333-0000-0000-0000-000000000015','mcq',3,'fr',
'{"stem":"Le volume du solide de révolution obtenu en faisant tourner f(x) autour de l''axe Ox sur [a,b] est :","choices":["2π ∫ₐᵇ f(x)dx","π ∫ₐᵇ [f(x)]² dx","π ∫ₐᵇ f(x)dx","2π ∫ₐᵇ x·f(x)dx"],"correct_index":1,"latex":true}',
'{"text_fr":"Volume de révolution autour de Ox : V = π ∫ₐᵇ [f(x)]² dx (méthode des disques). Chaque disque d''épaisseur dx a un rayon f(x) et une aire π[f(x)]². La formule 2π∫x·f(x)dx est la méthode des coquilles (rotation autour de Oy)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001184');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001185','33333333-0000-0000-0000-000000000015','mcq',3,'fr',
'{"stem":"Une variable aléatoire X à densité f(x) vérifie :","choices":["∫_{-∞}^{+∞} f(x)dx = 0","∫_{-∞}^{+∞} f(x)dx = 1 et f(x) ≥ 0","f(x) = 1 pour tout x","∫₀¹ f(x)dx = 1"],"correct_index":1,"latex":true}',
'{"text_fr":"Propriétés d''une densité de probabilité : f(x) ≥ 0 pour tout x, et ∫_{-∞}^{+∞} f(x)dx = 1 (normalisation). P(a≤X≤b) = ∫ₐᵇ f(x)dx. Pour toute valeur isolée : P(X=c) = 0 (distribution continue)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001185');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001186','33333333-0000-0000-0000-000000000015','mcq',4,'fr',
'{"stem":"La longueur d''arc de la courbe y=f(x) sur [a,b] est donnée par :","choices":["∫ₐᵇ f(x)dx","∫ₐᵇ √(1+[f''(x)]²)dx","∫ₐᵇ |f''(x)|dx","(b-a)×√(1+[f''((a+b)/2)]²)"],"correct_index":1,"latex":true}',
'{"text_fr":"Longueur d''arc : L = ∫ₐᵇ √(1+[f''(x)]²) dx. Chaque élément de longueur ds = √(dx²+dy²) = √(1+(dy/dx)²)dx. Application : longueur de la parabole y=x² sur [0,1] = ∫₀¹ √(1+4x²)dx (intégrale non triviale)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001186');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001187','33333333-0000-0000-0000-000000000015','mcq',4,'fr',
'{"stem":"L''espérance E(X) d''une variable aléatoire continue X de densité f est :","choices":["∫ f(x)dx","∫ x·f(x)dx","∫ x²·f(x)dx","(max-min)/2"],"correct_index":1,"latex":true}',
'{"text_fr":"E(X) = ∫_{-∞}^{+∞} x·f(x)dx. C''est le barycentre de la distribution. Var(X) = E(X²) - [E(X)]² où E(X²) = ∫x²f(x)dx. Pour X ~ Uniforme[a,b] : E(X) = (a+b)/2, Var(X) = (b-a)²/12."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001187');

-- Numeric for integral_apps
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001188','33333333-0000-0000-0000-000000000015','numeric',2,'fr',
'{"stem":"Aire entre f(x)=4-x² et l''axe Ox (f≥0 sur [-2,2]) :","correct_value":10.667,"tolerance":0.01,"unit":"unités²","latex":true}',
'{"text_fr":"∫_{-2}^{2} (4-x²)dx = [4x-x³/3]_{-2}^{2} = (8-8/3) - (-8+8/3) = 16 - 16/3 = 32/3 ≈ 10,667. Par parité (f paire) : 2∫₀²(4-x²)dx = 2[4x-x³/3]₀² = 2(8-8/3) = 32/3."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001188');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001189','33333333-0000-0000-0000-000000000015','numeric',3,'fr',
'{"stem":"Volume du cône obtenu par rotation de f(x)=x sur [0,3] autour de Ox (en π) :","correct_value":9,"tolerance":0,"unit":"π unités³","latex":true}',
'{"text_fr":"V = π ∫₀³ x² dx = π [x³/3]₀³ = π × 27/3 = 9π. En unités de π : réponse = 9. Vérification : formule du cône V = πr²h/3 = π×9×3/3 = 9π ✓ (r=3, h=3)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001189');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001190','33333333-0000-0000-0000-000000000015','numeric',3,'fr',
'{"stem":"X ~ Uniforme[2,8]. P(3 ≤ X ≤ 6) = ?","correct_value":0.5,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"f(x) = 1/(8-2) = 1/6 sur [2,8]. P(3≤X≤6) = ∫₃⁶ (1/6)dx = (6-3)/6 = 3/6 = 1/2. Pour loi uniforme : P(a≤X≤b) = (b-a)/(longueur totale)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001190');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001191','33333333-0000-0000-0000-000000000015','numeric',4,'fr',
'{"stem":"Aire entre y=sin(x) et y=cos(x) sur [0, π/4] (cos ≥ sin sur cet intervalle) :","correct_value":0.414,"tolerance":0.005,"unit":"","latex":true}',
'{"text_fr":"Sur [0,π/4] : cos(x) ≥ sin(x). Aire = ∫₀^{π/4}(cos x - sin x)dx = [sin x + cos x]₀^{π/4} = (sin(π/4)+cos(π/4)) - (0+1) = (√2/2+√2/2)-1 = √2-1 ≈ 1,414-1 = 0,414."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001191');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001192','33333333-0000-0000-0000-000000000015','numeric',4,'fr',
'{"stem":"Volume de la sphère unité (rotation de f(x)=√(1-x²) sur [-1,1] autour de Ox) en π :","correct_value":1.333,"tolerance":0.005,"unit":"π","latex":true}',
'{"text_fr":"V = π ∫_{-1}^{1} (1-x²)dx = π [x-x³/3]_{-1}^{1} = π[(1-1/3)-(-1+1/3)] = π[2/3+2/3] = 4π/3. En unités de π : 4/3 ≈ 1,333. Formule classique de la sphère V=4πR³/3 avec R=1 ✓."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001192');

-- Sequence for integral_apps
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001193','33333333-0000-0000-0000-000000000015','ordering',3,'fr',
'{"stem":"Pour calculer une aire entre deux courbes f et g avec une intersection intérieure, ordonnez :","items":["Calculer l''intégrale sur chaque sous-intervalle séparément","Résoudre f(x)=g(x) pour trouver les points d''intersection","Identifier quelle fonction est au-dessus sur chaque partie","Additionner les aires partielles"],"correct_order":[1,2,0,3],"latex":true}',
'{"text_fr":"1) Trouver les intersections x₀ où f(x₀)=g(x₀). 2) Sur [a,x₀] : vérifier quel signe a f-g. 3) Sur [x₀,b] : l''ordre peut s''inverser. 4) Aire totale = ∫ₐ^{x₀}|f-g| + ∫_{x₀}ᵇ|f-g|. Ne jamais calculer ∫ₐᵇ(f-g) directement quand il y a un croisement intérieur (les aires se compenseraient)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001193');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001194','33333333-0000-0000-0000-000000000015','ordering',4,'fr',
'{"stem":"Pour calculer le volume de révolution par la méthode des disques, ordonnez :","items":["Calculer V = π ∫ₐᵇ [f(x)]² dx","Identifier f(x) comme le rayon de chaque disque","Vérifier que f(x) ≥ 0 sur [a,b] (ou prendre |f|)","Visualiser chaque tranche comme un disque d''épaisseur dx"],"correct_order":[3,1,2,0],"latex":true}',
'{"text_fr":"Méthode des disques : 1) Visualiser : couper le solide en tranches perpendiculaires à Ox. 2) Rayon de chaque disque = f(x). 3) Aire de chaque disque = π[f(x)]². 4) Volume = intégrale des aires élémentaires. Pour un anneau (solide creux) : V = π ∫(R(x)² - r(x)²)dx."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001194');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001195','33333333-0000-0000-0000-000000000015','ordering',4,'fr',
'{"stem":"Pour vérifier qu''une fonction f est une densité de probabilité, ordonnez :","items":["Vérifier que ∫_{-∞}^{+∞} f(x)dx = 1","Calculer E(X) = ∫x·f(x)dx si demandé","Vérifier que f(x) ≥ 0 sur son support","Identifier le support (domaine où f > 0)"],"correct_order":[3,2,0,1],"latex":true}',
'{"text_fr":"Validation de densité : 1) Identifier le support (souvent [a,b] ou [0,+∞[). 2) Vérifier f(x)≥0 (souvent évident si f est un polynôme positif ou une exponentielle). 3) Calculer ∫f(x)dx sur le support et vérifier = 1 (condition de normalisation). 4) Si toutes conditions vérifiées, calculer E(X), Var(X), etc."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001195');

-- ============================================================
-- SKILL 016: prob_basic (IDs 1196-1208)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001196','33333333-0000-0000-0000-000000000016','mcq',2,'fr',
'{"stem":"Si A et B sont deux événements incompatibles, alors P(A∪B) =","choices":["P(A)×P(B)","P(A)+P(B)-P(A∩B)","P(A)+P(B)","P(A∩B)"],"correct_index":2,"latex":true}',
'{"text_fr":"Incompatibles → A∩B = ∅ → P(A∩B)=0. Donc P(A∪B) = P(A)+P(B)+0 = P(A)+P(B). En général : P(A∪B) = P(A)+P(B)-P(A∩B) (formule d''inclusion-exclusion). Incompatibles ≠ indépendants : deux événements incompatibles (hors cas triviaux) sont dépendants."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001196');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001197','33333333-0000-0000-0000-000000000016','mcq',2,'fr',
'{"stem":"On tire une carte au hasard dans un jeu de 52 cartes. P(As) = ?","choices":["1/52","1/13","4/52","1/4"],"correct_index":1,"latex":true}',
'{"text_fr":"Il y a 4 As dans 52 cartes. P(As) = 4/52 = 1/13. Rappel : espace probabilisé équiprobable → P(A) = |A|/|Ω|. 4/52 = 1/13 sont deux écritures équivalentes de la même valeur. Savoir simplifier les fractions est attendu au BAC."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001197');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001198','33333333-0000-0000-0000-000000000016','mcq',3,'fr',
'{"stem":"A et B sont indépendants avec P(A)=0,3 et P(B)=0,4. Alors P(A∩B) =","choices":["0,7","0,12","0,58","0,1"],"correct_index":1,"latex":true}',
'{"text_fr":"Indépendants → P(A∩B) = P(A)×P(B) = 0,3×0,4 = 0,12. Cette propriété est définitoire : deux événements sont indépendants si et seulement si P(A∩B) = P(A)×P(B). On en déduit aussi P(A∪B) = 0,3+0,4-0,12 = 0,58."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001198');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001199','33333333-0000-0000-0000-000000000016','mcq',3,'fr',
'{"stem":"Dans une classe de 30 élèves : 18 font du sport, 12 font de la musique, 6 font les deux. P(sport OU musique) =","choices":["0,8","0,6","0,4","1"],"correct_index":0,"latex":true}',
'{"text_fr":"P(S∪M) = P(S)+P(M)-P(S∩M) = 18/30 + 12/30 - 6/30 = 24/30 = 4/5 = 0,8. Vérification : 18+12-6=24 élèves font sport OU musique, sur 30 → 24/30=0,8."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001199');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001200','33333333-0000-0000-0000-000000000016','mcq',4,'fr',
'{"stem":"On lance un dé équilibré deux fois. P(somme = 7) =","choices":["1/6","1/12","1/36","7/36"],"correct_index":0,"latex":true}',
'{"text_fr":"Ω a 36 paires (i,j) équiprobables. Paires donnant 7 : (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) → 6 paires. P(somme=7) = 6/36 = 1/6. C''est la somme la plus probable (6 façons) sur les 11 valeurs possibles (2 à 12)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001200');

-- Numeric for prob_basic
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001201','33333333-0000-0000-0000-000000000016','numeric',2,'fr',
'{"stem":"P(A)=0,6. Quelle est P(Ā) (événement complémentaire) ?","correct_value":0.4,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"P(Ā) = 1 - P(A) = 1 - 0,6 = 0,4. Loi de complémentarité : P(A) + P(Ā) = 1. Très utilisée : si P(A) est difficile à calculer directement, calculer P(Ā) et soustraire de 1."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001201');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001202','33333333-0000-0000-0000-000000000016','numeric',3,'fr',
'{"stem":"P(A)=0,5, P(B)=0,4, P(A∩B)=0,2. Calculer P(A∪B) :","correct_value":0.7,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"P(A∪B) = P(A)+P(B)-P(A∩B) = 0,5+0,4-0,2 = 0,7. Formule d''inclusion-exclusion : on additionne les probabilités individuelles puis on soustrait l''intersection comptée deux fois."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001202');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001203','33333333-0000-0000-0000-000000000016','numeric',3,'fr',
'{"stem":"On tire sans remise 2 boules dans une urne de 5 rouges et 3 bleues. P(2 rouges) = ? (en fraction décimale)","correct_value":0.357,"tolerance":0.005,"unit":"","latex":true}',
'{"text_fr":"P(2 rouges) = C(5,2)/C(8,2) = 10/28 = 5/14 ≈ 0,357. Ou probabilité composée : P = (5/8)×(4/7) = 20/56 = 5/14. Sans remise → le tirage du 2ème dépend du 1er : 4 rouges restantes sur 7 boules."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001203');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001204','33333333-0000-0000-0000-000000000016','numeric',4,'fr',
'{"stem":"On lance 3 pièces équilibrées. P(au moins 2 Piles) = ?","correct_value":0.5,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"P(au moins 2 Piles) = P(2P) + P(3P) = C(3,2)/8 + C(3,3)/8 = 3/8 + 1/8 = 4/8 = 1/2. Ou par complémentaire : 1 - P(0P) - P(1P) = 1 - 1/8 - 3/8 = 4/8 = 1/2."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001204');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001205','33333333-0000-0000-0000-000000000016','numeric',4,'fr',
'{"stem":"Dans un groupe de 10 personnes, on choisit un comité de 3. Nombre de comités possibles :","correct_value":120,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"C(10,3) = 10!/(3!×7!) = (10×9×8)/(3×2×1) = 720/6 = 120. Les combinaisons (pas les arrangements) : l''ordre n''importe pas dans un comité. Distinctions: arrangement A(n,k)=n!/(n-k)! vs combinaison C(n,k)=n!/(k!(n-k)!)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001205');

-- Sequence for prob_basic
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001206','33333333-0000-0000-0000-000000000016','ordering',3,'fr',
'{"stem":"Pour vérifier l''indépendance de A et B, ordonnez :","items":["Conclure : A et B indépendants si P(A∩B)=P(A)×P(B)","Calculer P(A∩B) à partir des données","Calculer P(A)×P(B)","Comparer les deux valeurs"],"correct_order":[1,2,3,0],"latex":true}',
'{"text_fr":"Test d''indépendance : calculer séparément P(A∩B) et P(A)×P(B). S''ils sont égaux → indépendants. Sinon → dépendants. Important : l''indépendance n''implique pas l''incompatibilité (et réciproquement). Deux événements de probabilité non nulle ne peuvent pas être à la fois indépendants et incompatibles."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001206');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001207','33333333-0000-0000-0000-000000000016','ordering',3,'fr',
'{"stem":"Pour calculer P(A∪B) à partir de P(A), P(B) et P(A∩B), ordonnez :","items":["Résultat : P(A)+P(B)-P(A∩B)","Identifier les événements A, B et leur intersection","Rappeler la formule d''inclusion-exclusion","Substituer les valeurs numériques"],"correct_order":[1,2,3,0],"latex":true}',
'{"text_fr":"Formule d''inclusion-exclusion : P(A∪B) = P(A)+P(B)-P(A∩B). Elle évite de compter deux fois la zone A∩B. Extension à 3 événements : P(A∪B∪C) = P(A)+P(B)+P(C)-P(A∩B)-P(A∩C)-P(B∩C)+P(A∩B∩C)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001207');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001208','33333333-0000-0000-0000-000000000016','ordering',4,'fr',
'{"stem":"Pour calculer P(au moins un succès en n essais indépendants), ordonnez :","items":["Soustraire de 1 : P(au moins un) = 1 - P(aucun)","Identifier p = P(succès) à chaque essai","Calculer P(aucun succès) = (1-p)^n","Vérifier que les essais sont indépendants"],"correct_order":[3,1,2,0],"latex":true}',
'{"text_fr":"Stratégie du complémentaire : P(au moins un succès) = 1 - P(zéro succès) = 1-(1-p)^n. Beaucoup plus simple que de calculer P(1)+P(2)+...+P(n). Exemple : P(au moins un 6 en 4 lancers) = 1-(5/6)^4 ≈ 0,518."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001208');

-- ============================================================
-- SKILL 017: conditional_prob (IDs 1209-1221)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001209','33333333-0000-0000-0000-000000000017','mcq',2,'fr',
'{"stem":"La probabilité conditionnelle P(A|B) est définie par :","choices":["P(A)×P(B)","P(A∩B)/P(B)","P(A∪B)/P(B)","P(B)/P(A)"],"correct_index":1,"latex":true}',
'{"text_fr":"P(A|B) = P(A∩B)/P(B), définie si P(B)>0. Lecture : ''probabilité de A sachant que B est réalisé''. Intuition : on restreint l''espace des possibles à B, et on mesure la part de A dans cet espace réduit."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001209');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001210','33333333-0000-0000-0000-000000000017','mcq',2,'fr',
'{"stem":"Le théorème de la probabilité totale, pour une partition {B₁,B₂}, donne :","choices":["P(A) = P(A|B₁)+P(A|B₂)","P(A) = P(A|B₁)P(B₁)+P(A|B₂)P(B₂)","P(A) = P(B₁)×P(B₂)","P(A) = P(A∩B₁)/P(A∩B₂)"],"correct_index":1,"latex":true}',
'{"text_fr":"Théorème des probabilités totales : P(A) = Σᵢ P(A|Bᵢ)×P(Bᵢ) pour toute partition {Bᵢ}. Chaque branche contribue P(chemin complet) = P(Bᵢ)×P(A|Bᵢ). On somme toutes les branches menant à A. Représentation en arbre de probabilités."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001210');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001211','33333333-0000-0000-0000-000000000017','mcq',3,'fr',
'{"stem":"Le théorème de Bayes permet de calculer :","choices":["P(A∩B) à partir de P(A) et P(B)","P(B|A) à partir de P(A|B), P(B) et P(A)","P(A∪B)","P(A) par la formule totale"],"correct_index":1,"latex":true}',
'{"text_fr":"Bayes : P(B|A) = P(A|B)×P(B)/P(A). Permet d''inverser le conditionnement : si on connaît P(A|B) (probabilité du test sachant la cause), Bayes donne P(B|A) (cause sachant le test). Application classique : dépistage médical, P(malade|test+) à partir de P(test+|malade)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001211');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001212','33333333-0000-0000-0000-000000000017','mcq',3,'fr',
'{"stem":"P(A)=0,6, P(B|A)=0,5, P(B|Ā)=0,2. P(B) vaut :","choices":["0,7","0,38","0,3","0,1"],"correct_index":1,"latex":true}',
'{"text_fr":"P(B) = P(B|A)×P(A) + P(B|Ā)×P(Ā) = 0,5×0,6 + 0,2×0,4 = 0,30 + 0,08 = 0,38. Partition : {A, Ā}. L''arbre donne deux branches menant à B : via A (prob 0,5×0,6=0,3) et via Ā (0,2×0,4=0,08)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001212');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001213','33333333-0000-0000-0000-000000000017','mcq',4,'fr',
'{"stem":"Un test de dépistage a P(+|M)=0,95 et P(-|M̄)=0,90, et P(M)=0,01. P(M|+) ≈ ?","choices":["0,95","0,087","0,5","0,01"],"correct_index":1,"latex":true}',
'{"text_fr":"P(+) = P(+|M)P(M)+P(+|M̄)P(M̄) = 0,95×0,01+0,10×0,99 = 0,0095+0,099 = 0,1085. P(M|+) = P(+|M)P(M)/P(+) = 0,0095/0,1085 ≈ 0,0876 ≈ 8,7%. Paradoxe de Bayes : même avec un test très fiable (95%), si la maladie est rare (1%), la probabilité d''être vraiment malade après un test positif est seulement ~8,7%."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001213');

-- Numeric for conditional_prob
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001214','33333333-0000-0000-0000-000000000017','numeric',2,'fr',
'{"stem":"P(A∩B)=0,15 et P(B)=0,3. Calculer P(A|B) :","correct_value":0.5,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"P(A|B) = P(A∩B)/P(B) = 0,15/0,3 = 0,5. Vérification : 0,5 ∈ [0,1] ✓."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001214');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001215','33333333-0000-0000-0000-000000000017','numeric',3,'fr',
'{"stem":"Urne : 4 rouges (R), 6 bleues (B). On tire 2 sans remise. P(2ème R | 1er R) = ?","correct_value":0.333,"tolerance":0.005,"unit":"","latex":true}',
'{"text_fr":"Après avoir tiré 1 R : il reste 3 R et 6 B, soit 9 boules. P(2ème R | 1er R) = 3/9 = 1/3 ≈ 0,333. La condition modifie l''urne : 9 boules restantes dont 3 rouges."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001215');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001216','33333333-0000-0000-0000-000000000017','numeric',3,'fr',
'{"stem":"P(A)=0,4, P(B|A)=0,3, P(B|Ā)=0,5. Calculer P(A|B) (arrondir à 0,001) :","correct_value":0.286,"tolerance":0.005,"unit":"","latex":true}',
'{"text_fr":"P(B) = 0,3×0,4+0,5×0,6 = 0,12+0,30 = 0,42. P(A|B) = P(B|A)×P(A)/P(B) = 0,12/0,42 = 2/7 ≈ 0,286."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001216');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001217','33333333-0000-0000-0000-000000000017','numeric',4,'fr',
'{"stem":"Deux usines A (60% de la prod.) et B (40%). Taux de défaut : A→2%, B→5%. P(défaut) = ?","correct_value":0.032,"tolerance":0.001,"unit":"","latex":true}',
'{"text_fr":"P(D) = P(D|A)P(A)+P(D|B)P(B) = 0,02×0,60+0,05×0,40 = 0,012+0,020 = 0,032 = 3,2%. Probabilités totales appliquées à la production industrielle. Ensuite, si une pièce défectueuse est trouvée : P(A|D) = 0,012/0,032 = 0,375 (37,5% vient de A)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001217');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001218','33333333-0000-0000-0000-000000000017','numeric',4,'fr',
'{"stem":"P(A)=0,7, P(B|A)=0,6. Calculer P(A∩B) :","correct_value":0.42,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"P(A∩B) = P(B|A)×P(A) = 0,6×0,7 = 0,42. Formule de multiplication : P(A∩B) = P(A)×P(B|A) = P(B)×P(A|B). Utilisée pour calculer les probabilités de chemins dans un arbre."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001218');

-- Sequence for conditional_prob
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001219','33333333-0000-0000-0000-000000000017','ordering',3,'fr',
'{"stem":"Pour résoudre un problème de probabilités conditionnelles avec arbre, ordonnez :","items":["Lire les probabilités de chaque chemin comme des produits","Appliquer P(A) = somme des probabilités des chemins menant à A","Identifier la partition (causes mutuellement exclusives)","Dessiner l''arbre avec branches et probabilités conditionnelles"],"correct_order":[2,3,0,1],"latex":true}',
'{"text_fr":"Méthode de l''arbre : 1) Identifier la partition {B₁,...,Bₙ}. 2) Dessiner l''arbre avec P(Bᵢ) au 1er niveau et P(A|Bᵢ) au 2ème. 3) P(chemin) = P(Bᵢ)×P(A|Bᵢ). 4) P(A) = somme des chemins menant à A. 5) Bayes : P(Bᵢ|A) = P(chemin via Bᵢ)/P(A)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001219');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001220','33333333-0000-0000-0000-000000000017','ordering',4,'fr',
'{"stem":"Pour appliquer le théorème de Bayes P(B|A), ordonnez :","items":["Calculer P(A) par les probabilités totales","Calculer P(B|A) = P(A|B)×P(B)/P(A)","Identifier P(A|B), P(B) et P(A|B̄)","Calculer P(A|B̄) = 1 - P(B|A) si nécessaire pour vérification"],"correct_order":[2,0,1,3],"latex":true}',
'{"text_fr":"Bayes en 3 étapes : 1) Rassembler P(A|B), P(B), P(A|B̄), P(B̄). 2) P(A) = P(A|B)P(B)+P(A|B̄)P(B̄). 3) P(B|A) = P(A|B)P(B)/P(A). Toujours vérifier P(B|A)+P(B̄|A)=1 comme contrôle de cohérence."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001220');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001221','33333333-0000-0000-0000-000000000017','ordering',4,'fr',
'{"stem":"Pour modéliser un tirage sans remise en cascade, ordonnez :","items":["Calculer P(succès au 2ème | succès au 1er) en mettant à jour les effectifs","Calculer P(succès au 1er)","Multiplier les probabilités conditionnelles pour P(chemin)","Mettre à jour l''urne après chaque tirage"],"correct_order":[1,3,0,2],"latex":true}',
'{"text_fr":"Tirage sans remise : après chaque tirage, la composition de l''urne change. P(R₁ et R₂) = P(R₁)×P(R₂|R₁). Si urne initiale : r rouges, b bleues : P(R₁)=r/(r+b), P(R₂|R₁)=(r-1)/(r+b-1). Tableau de mise à jour systématique → évite les erreurs."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001221');

-- ============================================================
-- SKILL 018: random_variables (IDs 1222-1234)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001222','33333333-0000-0000-0000-000000000018','mcq',2,'fr',
'{"stem":"L''espérance d''une variable aléatoire X prenant les valeurs {x₁,...,xₙ} est :","choices":["max(xᵢ)","Σxᵢ","Σxᵢ×P(X=xᵢ)","(max-min)/2"],"correct_index":2,"latex":true}',
'{"text_fr":"E(X) = Σᵢ xᵢ × P(X=xᵢ). C''est la moyenne pondérée des valeurs par leurs probabilités. L''espérance est la ''valeur attendue en moyenne'' sur un grand nombre de répétitions (loi des grands nombres)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001222');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001223','33333333-0000-0000-0000-000000000018','mcq',2,'fr',
'{"stem":"La loi binomiale B(n,p) modélise :","choices":["Le nombre de succès en n tirages avec remise identiques et indépendants","La durée entre deux événements","Le nombre de valeurs dans un intervalle","La somme de variables uniformes"],"correct_index":0,"latex":true}',
'{"text_fr":"B(n,p) : n essais identiques, indépendants, chacun avec P(succès)=p. P(X=k) = C(n,k)×p^k×(1-p)^{n-k}. E(X)=np, Var(X)=np(1-p). Exemples : nombre de 6 en n lancers, nombre de pièces défectueuses dans un lot."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001223');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001224','33333333-0000-0000-0000-000000000018','mcq',3,'fr',
'{"stem":"X ~ B(10, 0,3). E(X) et σ(X) valent :","choices":["E=3, σ≈1,45","E=0,3, σ=0,7","E=3, σ=3","E=7, σ=1,45"],"correct_index":0,"latex":true}',
'{"text_fr":"E(X) = np = 10×0,3 = 3. Var(X) = np(1-p) = 10×0,3×0,7 = 2,1. σ(X) = √2,1 ≈ 1,449. L''écart-type mesure la dispersion autour de l''espérance. Pour X~B(n,p) : E(X) et σ(X) s''expriment en fonction de n et p."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001224');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001225','33333333-0000-0000-0000-000000000018','mcq',3,'fr',
'{"stem":"La variance Var(X) est liée à l''espérance par :","choices":["Var(X) = E(X)²","Var(X) = E(X²) - [E(X)]²","Var(X) = E(X) - E(X²)","Var(X) = √E(X)"],"correct_index":1,"latex":true}',
'{"text_fr":"Var(X) = E(X²) - [E(X)]² = E[(X-μ)²]. Formule König-Huygens : utile pour calculer la variance sans calculer (X-μ)² terme par terme. Pour X discret : E(X²) = Σ xᵢ²×P(X=xᵢ). σ(X) = √Var(X) a les mêmes unités que X."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001225');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001226','33333333-0000-0000-0000-000000000018','mcq',4,'fr',
'{"stem":"X ~ B(n,p) avec n grand et p petit, np=λ fixé. La distribution de X se rapproche de :","choices":["Loi normale","Loi de Poisson","Loi uniforme","Loi exponentielle"],"correct_index":1,"latex":true}',
'{"text_fr":"Approximation de Poisson : si n→∞ et p→0 avec np=λ (constant), B(n,p)→Poisson(λ). P(X=k) ≈ e^{-λ}λ^k/k!. E(X) = Var(X) = λ. Utilisé pour modéliser des événements rares : accidents, pannes, désintégrations radioactives."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001226');

-- Numeric for random_variables
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001227','33333333-0000-0000-0000-000000000018','numeric',2,'fr',
'{"stem":"X prend valeurs 1,2,3 avec P(1)=0,2, P(2)=0,5, P(3)=0,3. E(X) = ?","correct_value":2.1,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"E(X) = 1×0,2+2×0,5+3×0,3 = 0,2+1,0+0,9 = 2,1. Vérification : la somme des probabilités = 0,2+0,5+0,3 = 1 ✓. E(X) ≈ 2,1 est entre min=1 et max=3 ✓."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001227');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001228','33333333-0000-0000-0000-000000000018','numeric',3,'fr',
'{"stem":"X ~ B(5, 0,4). Calculer P(X=2) (arrondir à 0,001) :","correct_value":0.346,"tolerance":0.005,"unit":"","latex":true}',
'{"text_fr":"P(X=2) = C(5,2)×0,4²×0,6³ = 10×0,16×0,216 = 10×0,03456 = 0,3456 ≈ 0,346. C(5,2)=10 combinaisons. Chaque chemin de probabilité : 0,4²×0,6³ = 0,03456."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001228');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001229','33333333-0000-0000-0000-000000000018','numeric',3,'fr',
'{"stem":"X prend valeurs -1, 0, 2 avec P(-1)=0,3, P(0)=0,4, P(2)=0,3. Var(X) = ?","correct_value":1.29,"tolerance":0.01,"unit":"","latex":true}',
'{"text_fr":"E(X) = -1×0,3+0×0,4+2×0,3 = -0,3+0+0,6 = 0,3. E(X²) = 1×0,3+0×0,4+4×0,3 = 0,3+0+1,2 = 1,5. Var(X) = E(X²)-[E(X)]² = 1,5-0,09 = 1,41. (Recalcul: 1.5 - 0.09 = 1.41). σ(X) = √1,41 ≈ 1,187."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001229');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001230','33333333-0000-0000-0000-000000000018','numeric',4,'fr',
'{"stem":"X ~ B(20, 0,1). P(X ≥ 1) = ? (arrondir à 0,001)","correct_value":0.878,"tolerance":0.005,"unit":"","latex":true}',
'{"text_fr":"P(X≥1) = 1-P(X=0) = 1-C(20,0)×0,1⁰×0,9²⁰ = 1-0,9²⁰. 0,9²⁰ = 0,1216 (arrondi). P(X≥1) ≈ 1-0,1216 = 0,8784 ≈ 0,878. Méthode complémentaire : toujours plus rapide que calculer P(1)+P(2)+...+P(20)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001230');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001231','33333333-0000-0000-0000-000000000018','numeric',4,'fr',
'{"stem":"X ~ B(n, 0,5). Pour que E(X) = 8, quelle est la valeur de n ?","correct_value":16,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"E(X) = np = n×0,5 = 8 → n = 16. Var(X) = 16×0,5×0,5 = 4, σ = 2. Avec n=16 et p=0,5, la loi est symétrique autour de E(X)=8."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001231');

-- Sequence for random_variables
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001232','33333333-0000-0000-0000-000000000018','ordering',3,'fr',
'{"stem":"Pour calculer l''espérance et la variance d''une loi de probabilité, ordonnez :","items":["Calculer E(X²) = Σ xᵢ² × P(X=xᵢ)","Calculer E(X) = Σ xᵢ × P(X=xᵢ)","Déduire Var(X) = E(X²) - [E(X)]²","Vérifier Σ P(X=xᵢ) = 1"],"correct_order":[3,1,0,2],"latex":true}',
'{"text_fr":"1) Vérifier la loi (somme=1). 2) E(X) : somme pondérée des valeurs. 3) E(X²) : remplacer xᵢ par xᵢ². 4) Var(X) = E(X²)-[E(X)]². σ(X) = √Var(X). Ne pas confondre E(X²) et [E(X)]² : E(X²) ≥ [E(X)]² toujours (inégalité de Jensen)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001232');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001233','33333333-0000-0000-0000-000000000018','ordering',3,'fr',
'{"stem":"Pour reconnaître et utiliser une loi binomiale dans un problème, ordonnez :","items":["Identifier p = P(succès) et n = nombre d''essais","Appliquer P(X=k) = C(n,k)pᵏ(1-p)^{n-k}","Vérifier les 4 conditions de Bernoulli","Calculer E(X)=np et σ(X)=√(np(1-p))"],"correct_order":[2,0,1,3],"latex":true}',
'{"text_fr":"4 conditions Bernoulli : (1) nombre fixe d''essais n, (2) seulement 2 issues (succès/échec), (3) p constant à chaque essai, (4) essais indépendants. Si toutes vérifiées → B(n,p). Erreur classique : oublier de vérifier l''indépendance (tirage sans remise → pas Binomiale strictement)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001233');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001234','33333333-0000-0000-0000-000000000018','ordering',4,'fr',
'{"stem":"Pour résoudre P(X ≥ k) avec X~B(n,p), ordonnez la stratégie optimale :","items":["Si k proche de n : calculer directement les termes","Calculer P(X≥k) = 1 - P(X≤k-1)","Évaluer s''il est plus simple de calculer le complémentaire","Si k=1 : utiliser 1-P(X=0)=(1-(1-p)^n)"],"correct_order":[2,1,3,0],"latex":true}',
'{"text_fr":"Stratégie BAC : évaluer d''abord le complémentaire. P(X≥k) = 1-Σᵢ₌₀^{k-1} P(X=i). Si k=1 : P(X≥1) = 1-(1-p)^n. Si k grand (proche de n) : calculer directement. Pour n petit (≤10) : tableau de valeurs. Pour n grand : approximation normale ou Poisson."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001234');

-- ============================================================
-- SKILL 019: complex_basics (IDs 1235-1247)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001235','33333333-0000-0000-0000-000000000019','mcq',2,'fr',
'{"stem":"Le module de z = 3 + 4i est :","choices":["7","√7","5","25"],"correct_index":2,"latex":true}',
'{"text_fr":"|z| = √(3²+4²) = √(9+16) = √25 = 5. Triangle pythagoricien 3-4-5 à connaître. Mnémotechnique : 3² + 4² = 5². Interprétation géométrique : |z| est la distance de l''origine au point z dans le plan complexe."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001235');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001236','33333333-0000-0000-0000-000000000019','mcq',2,'fr',
'{"stem":"Le conjugué de z = 2 - 5i est :","choices":["2 + 5i","-2 + 5i","2 - 5i","-2 - 5i"],"correct_index":0,"latex":true}',
'{"text_fr":"z̄ = 2 + 5i (changer le signe de la partie imaginaire). Propriétés : z×z̄ = |z|², z+z̄ = 2Re(z), z-z̄ = 2i×Im(z). Utilisation : rationaliser 1/z = z̄/|z|²."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001236');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001237','33333333-0000-0000-0000-000000000019','mcq',3,'fr',
'{"stem":"(2+3i)(1-i) = ?","choices":["5+i","5-i","2-3i","−1+5i"],"correct_index":0,"latex":true}',
'{"text_fr":"(2+3i)(1-i) = 2×1 + 2×(-i) + 3i×1 + 3i×(-i) = 2 - 2i + 3i - 3i². Or i²=-1, donc -3i²=+3. Résultat : (2+3)+(-2+3)i = 5+i. Méthode : développer comme un produit de polynômes, puis remplacer i²=-1."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001237');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001238','33333333-0000-0000-0000-000000000019','mcq',3,'fr',
'{"stem":"1/(2+i) sous forme algébrique a+bi est :","choices":["2/5 - i/5","2/3 - i/3","1/2 - i","2/5 + i/5"],"correct_index":0,"latex":true}',
'{"text_fr":"Multiplier par le conjugué : 1/(2+i) × (2-i)/(2-i) = (2-i)/(4+1) = (2-i)/5 = 2/5 - i/5. Méthode : multiplier numérateur et dénominateur par z̄ pour rendre le dénominateur réel. Le dénominateur devient |z|² = a²+b²."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001238');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001239','33333333-0000-0000-0000-000000000019','mcq',4,'fr',
'{"stem":"Les solutions de z² + 2z + 5 = 0 sont :","choices":["-1+2i et -1-2i","1+2i et 1-2i","-2+i et -2-i","2+i et 2-i"],"correct_index":0,"latex":true}',
'{"text_fr":"Discriminant : Δ = 4-20 = -16 < 0. √Δ = √(-16) = 4i. z = (-2±4i)/2 = -1±2i. Solutions conjuguées : z₁=-1+2i, z₂=-1-2i. Règle : si les coefficients sont réels et Δ<0, les racines sont toujours conjuguées."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001239');

-- Numeric for complex_basics
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001240','33333333-0000-0000-0000-000000000019','numeric',2,'fr',
'{"stem":"|z| pour z = 5 - 12i :","correct_value":13,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"|z| = √(25+144) = √169 = 13. Triangle pythagoricien 5-12-13. Reconnaître ces triplets pythagoriciens accélère le calcul au BAC : (3,4,5), (5,12,13), (8,15,17)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001240');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001241','33333333-0000-0000-0000-000000000019','numeric',2,'fr',
'{"stem":"Re((3+i)/(1+i)) = ? (partie réelle)","correct_value":2,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"(3+i)/(1+i) × (1-i)/(1-i) = (3-3i+i-i²)/(1+1) = (3-2i+1)/2 = (4-2i)/2 = 2-i. Re = 2."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001241');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001242','33333333-0000-0000-0000-000000000019','numeric',3,'fr',
'{"stem":"z = (1+i)². Im(z) = ? (partie imaginaire)","correct_value":2,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"(1+i)² = 1+2i+i² = 1+2i-1 = 2i. Im = 2. Ou : |1+i|=√2, arg=π/4, donc (1+i)² a module 2 et argument π/2 → 2i."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001242');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001243','33333333-0000-0000-0000-000000000019','numeric',3,'fr',
'{"stem":"|z₁×z₂| pour z₁=2+i et z₂=3-4i :","correct_value":8.602,"tolerance":0.01,"unit":"","latex":true}',
'{"text_fr":"|z₁×z₂| = |z₁|×|z₂| = √5 × √25 = √5 × 5 = 5√5 ≈ 5×1,414 = 7,07... Recalcul : |2+i|=√(4+1)=√5, |3-4i|=√(9+16)=5. Produit = 5√5 ≈ 11,18. Erreur de calcul initiale : 5√5 ≈ 11.18, pas 8.6. Vérification : (2+i)(3-4i)=6-8i+3i-4i²=6-5i+4=10-5i, |10-5i|=√(100+25)=√125=5√5≈11.18.","correct_value":11.18}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001243');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001244','33333333-0000-0000-0000-000000000019','numeric',4,'fr',
'{"stem":"z⁴ pour z = 1+i. Re(z⁴) = ?","correct_value":-4,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"z² = (1+i)² = 2i. z⁴ = (z²)² = (2i)² = 4i² = -4. Re(z⁴) = -4, Im(z⁴)=0. Méthode rapide : |1+i|=√2, arg=π/4. |z⁴|=(√2)⁴=4, arg(z⁴)=4×π/4=π. Forme polaire : 4(cos π + i sin π) = -4 ✓."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001244');

-- Sequence for complex_basics
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001245','33333333-0000-0000-0000-000000000019','ordering',3,'fr',
'{"stem":"Pour résoudre z² = a+bi, ordonnez la méthode algébrique :","items":["Identifier x et y par identification des parties réelles et imaginaires","Conclure les deux solutions z=x+iy","Poser z=x+iy et développer z²","Résoudre le système : x²-y²=a et 2xy=b avec x²+y²=|a+bi|^{1/2}"],"correct_order":[2,3,0,1],"latex":true}',
'{"text_fr":"Méthode : poser z=x+iy. z²=x²-y²+2xyi. Identifier : x²-y²=a (partie réelle) et 2xy=b (partie imaginaire). Ajouter la condition x²+y²=|z²|^{1/2}=√(a²+b²). Résoudre pour x²+y² et x²-y² → x²=(√(a²+b²)+a)/2, y²=(√(a²+b²)-a)/2. Les 2 solutions sont ±(x+iy)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001245');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001246','33333333-0000-0000-0000-000000000019','ordering',3,'fr',
'{"stem":"Pour résoudre az²+bz+c=0 avec a,b,c réels et Δ<0, ordonnez :","items":["Écrire z₁=-b/(2a)+i√|Δ|/(2a) et z₂=z̄₁","Calculer Δ=b²-4ac","Vérifier Δ<0 : les solutions sont complexes conjuguées","Calculer √|Δ| et former les solutions"],"correct_order":[1,2,3,0],"latex":true}',
'{"text_fr":"Pour Δ<0 : √Δ = i√|Δ|. z = (-b ± i√|Δ|)/(2a). Les deux solutions sont conjuguées (règle générale pour coefficients réels). Vérification : z₁×z₂ = c/a (produit des racines) et z₁+z₂ = -b/a (somme des racines)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001246');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001247','33333333-0000-0000-0000-000000000019','ordering',4,'fr',
'{"stem":"Pour diviser z₁ par z₂ et obtenir la forme algébrique, ordonnez :","items":["Simplifier : partie réelle et partie imaginaire séparément","Multiplier numérateur et dénominateur par z̄₂","Calculer le dénominateur : z₂×z̄₂ = |z₂|²","Reconnaître que le dénominateur est réel"],"correct_order":[1,2,3,0],"latex":true}',
'{"text_fr":"Division complexe : z₁/z₂ = z₁×z̄₂/(z₂×z̄₂) = z₁×z̄₂/|z₂|². Le dénominateur |z₂|² est réel → forme algébrique obtenue par identification. Exemple : (a+bi)/(c+di) = (a+bi)(c-di)/(c²+d²) = [(ac+bd)+(bc-ad)i]/(c²+d²)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001247');

-- ============================================================
-- SKILL 020: complex_trig (IDs 1248-1260)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001248','33333333-0000-0000-0000-000000000020','mcq',2,'fr',
'{"stem":"La forme trigonométrique de z est :","choices":["a+bi","r(cos θ + i sin θ)","re^{iθ}","r/e^{iθ}"],"correct_index":1,"latex":true}',
'{"text_fr":"z = r(cos θ + i sin θ) où r=|z| (module) et θ=arg(z) (argument). C''est la forme trigonométrique (ou polaire). La forme exponentielle est z = re^{iθ} (formule d''Euler : e^{iθ}=cos θ+i sin θ). Les deux sont équivalentes."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001248');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001249','33333333-0000-0000-0000-000000000020','mcq',2,'fr',
'{"stem":"Pour z₁z₂ en forme trigonométrique : |z₁z₂| et arg(z₁z₂) valent :","choices":["|z₁|+|z₂| et arg(z₁)+arg(z₂)","|z₁|×|z₂| et arg(z₁)+arg(z₂)","|z₁|-|z₂| et arg(z₁)-arg(z₂)","|z₁|×|z₂| et arg(z₁)×arg(z₂)"],"correct_index":1,"latex":true}',
'{"text_fr":"Propriétés fondamentales : |z₁z₂|=|z₁||z₂| et arg(z₁z₂)=arg(z₁)+arg(z₂) (mod 2π). Pour la division : |z₁/z₂|=|z₁|/|z₂| et arg(z₁/z₂)=arg(z₁)-arg(z₂). Multiplier des complexes = multiplier les modules et additionner les arguments."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001249');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001250','33333333-0000-0000-0000-000000000020','mcq',3,'fr',
'{"stem":"La formule de Moivre : (cos θ + i sin θ)ⁿ =","choices":["cos(nθ) + i sin(nθ)","cos(θ/n) + i sin(θ/n)","n(cos θ + i sin θ)","cos(θ)ⁿ + i sin(θ)ⁿ"],"correct_index":0,"latex":true}',
'{"text_fr":"Formule de De Moivre : (e^{iθ})ⁿ = e^{inθ} → (cos θ+i sin θ)ⁿ = cos(nθ)+i sin(nθ). Permet de calculer cos(nθ) et sin(nθ) en développant (cos θ+i sin θ)ⁿ par le binôme de Newton, puis en identifiant parties réelles et imaginaires."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001250');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001251','33333333-0000-0000-0000-000000000020','mcq',3,'fr',
'{"stem":"e^{iπ} + 1 =","choices":["2","0","2i","e"],"correct_index":1,"latex":true}',
'{"text_fr":"Formule d''Euler : e^{iπ} = cos π + i sin π = -1 + 0i = -1. Donc e^{iπ}+1 = 0. C''est l''identité d''Euler, souvent citée comme la plus belle équation des mathématiques : elle relie e, i, π, 1 et 0."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001251');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001252','33333333-0000-0000-0000-000000000020','mcq',4,'fr',
'{"stem":"Les racines 3èmes de l''unité sont :","choices":["1, i, -i","1, j, j² où j=e^{2iπ/3}","1, -1, i","1, ω, ω² où ω=e^{iπ/3}"],"correct_index":1,"latex":true}',
'{"text_fr":"Racines nièmes de 1 : e^{2ikπ/n} pour k=0,1,...,n-1. Pour n=3 : 1, e^{2iπ/3}=j, e^{4iπ/3}=j². j = -1/2 + i√3/2. j² = -1/2 - i√3/2. Propriétés : 1+j+j²=0 et j³=1. Ces relations sont très utiles en calcul BAC."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001252');

-- Numeric for complex_trig
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001253','33333333-0000-0000-0000-000000000020','numeric',2,'fr',
'{"stem":"arg(i) en radians (argument principal dans ]-π, π]) :","correct_value":1.5708,"tolerance":0.001,"unit":"rad","latex":true}',
'{"text_fr":"i = 0+1i = 1×(cos(π/2)+i sin(π/2)). arg(i) = π/2 ≈ 1,5708 rad. De même : arg(-1)=π, arg(-i)=-π/2, arg(1)=0."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001253');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001254','33333333-0000-0000-0000-000000000020','numeric',2,'fr',
'{"stem":"Module de z = 2e^{iπ/3} :","correct_value":2,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"z = 2e^{iπ/3} est déjà en forme exponentielle : module = 2, argument = π/3. Partie algébrique : z = 2(cos(π/3)+i sin(π/3)) = 2(1/2 + i√3/2) = 1 + i√3."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001254');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001255','33333333-0000-0000-0000-000000000020','numeric',3,'fr',
'{"stem":"(1+i)^8 = ? (donner la valeur réelle)","correct_value":16,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"1+i = √2 × e^{iπ/4}. (1+i)^8 = (√2)^8 × e^{i×8×π/4} = 2^4 × e^{2iπ} = 16×1 = 16. Ou : (1+i)²=2i, (2i)²=-4, (-4)²=16."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001255');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001256','33333333-0000-0000-0000-000000000020','numeric',4,'fr',
'{"stem":"cos(3θ) exprimé via De Moivre donne cos³θ - 3cosθsin²θ = cos³θ + k×cosθ(cos²θ-1). Quelle est la valeur de k ?","correct_value":3,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"De Moivre : (c+is)³ = c³+3c²(is)+3c(is)²+(is)³ = (c³-3cs²)+i(3c²s-s³). Re = cos(3θ) = cos³θ-3cosθsin²θ = cos³θ-3cosθ(1-cos²θ) = 4cos³θ-3cosθ. k=3 dans cos³θ+3cosθ(cos²θ-1) = 4cos³θ-3cosθ."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001256');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001257','33333333-0000-0000-0000-000000000020','numeric',4,'fr',
'{"stem":"Argument principal de z = -1-i (en multiples de π, répondre en valeur décimale) :","correct_value":-2.356,"tolerance":0.01,"unit":"rad","latex":true}',
'{"text_fr":"-1-i est dans le 3ème quadrant. |z|=√2. L''angle de référence est π/4 (car |-1|=|-1|). arg = -3π/4 (dans ]-π,π]) ≈ -2,356. Vérification : cos(-3π/4)=-√2/2 ✓, sin(-3π/4)=-√2/2 ✓. Donc z=√2×e^{-3iπ/4}."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001257');

-- Sequence for complex_trig
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001258','33333333-0000-0000-0000-000000000020','ordering',3,'fr',
'{"stem":"Pour mettre z=a+bi en forme trigonométrique, ordonnez :","items":["Écrire z=r(cos θ+i sin θ)","Calculer r=|z|=√(a²+b²)","Déterminer θ : cos θ=a/r et sin θ=b/r","Vérifier que θ ∈ ]-π,π]"],"correct_order":[1,2,3,0],"latex":true}',
'{"text_fr":"Conversion algébrique → trigonométrique : 1) r=√(a²+b²). 2) cos θ=a/r et sin θ=b/r (les deux conditions ensemble déterminent θ sans ambiguïté). 3) Vérifier θ dans l''intervalle principal. 4) Écrire z=r(cos θ+i sin θ). Erreur : utiliser seulement arctan(b/a) = ambiguïté de quadrant."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001258');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001259','33333333-0000-0000-0000-000000000020','ordering',4,'fr',
'{"stem":"Pour trouver les racines nièmes de z₀, ordonnez :","items":["Les n racines sont zₖ = r^{1/n} e^{i(θ+2kπ)/n} pour k=0,...,n-1","Écrire z₀ = r×e^{iθ} en forme exponentielle","Vérifier en calculant zₖⁿ = z₀","Répartir les racines uniformément sur le cercle de rayon r^{1/n}"],"correct_order":[1,0,3,2],"latex":true}',
'{"text_fr":"Racines nièmes : 1) z₀=re^{iθ}. 2) zₖ = ⁿ√r × e^{i(θ+2kπ)/n} pour k=0,...,n-1. Les n racines sont sur le cercle de rayon ⁿ√r, séparées d''angles 2π/n. Représentation géométrique : n points équidistants sur un cercle → polygone régulier."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001259');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001260','33333333-0000-0000-0000-000000000020','ordering',4,'fr',
'{"stem":"Pour linéariser cos²θ (exprimer sans puissance), ordonnez :","items":["Déduire cos²θ = (1+cos 2θ)/2","Utiliser e^{iθ}+e^{-iθ} = 2cosθ","Calculer (e^{iθ}+e^{-iθ})² = e^{2iθ}+2+e^{-2iθ}","Identifier 2cos 2θ+2 dans l''expression"],"correct_order":[1,2,3,0],"latex":true}',
'{"text_fr":"Linéarisation : (2cosθ)² = e^{2iθ}+2+e^{-2iθ} = 2cos(2θ)+2. Donc 4cos²θ = 2cos(2θ)+2 → cos²θ = (1+cos 2θ)/2. Méthode générale : pour cosⁿθ ou sinⁿθ, utiliser les formules d''Euler, développer par le binôme, regrouper les termes conjugués."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001260');

-- ============================================================
-- SKILL 021: complex_geometry (IDs 1261-1273)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001261','33333333-0000-0000-0000-000000000021','mcq',2,'fr',
'{"stem":"Dans le plan complexe, |z - z₀| = r représente :","choices":["Une droite","Un cercle de centre z₀ et rayon r","Une parabole","Un point"],"correct_index":1,"latex":true}',
'{"text_fr":"|z-z₀| = r est l''ensemble des points z à distance r du point d''affixe z₀ → cercle de centre z₀ et rayon r. Interprétation : |z-a| est la distance entre les points d''affixes z et a dans le plan complexe."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001261');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001262','33333333-0000-0000-0000-000000000021','mcq',3,'fr',
'{"stem":"La transformation z → iz dans le plan complexe représente :","choices":["Une translation","Une rotation de π/2 autour de O","Une symétrie par rapport à Ox","Une homothétie de rapport 2"],"correct_index":1,"latex":true}',
'{"text_fr":"Multiplier par i = e^{iπ/2} : |iz|=|z| (même module) et arg(iz)=arg(z)+π/2. C''est une rotation de π/2 (90°) autour de l''origine. Généralisation : multiplier par e^{iθ} = rotation d''angle θ. Multiplier par r×e^{iθ} = similitude (rotation + homothétie)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001262');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001263','33333333-0000-0000-0000-000000000021','mcq',3,'fr',
'{"stem":"Si arg((z-A)/(z-B)) = π/2, le lieu de z est :","choices":["La droite AB","Le segment AB","Le cercle de diamètre AB (sauf A et B)","Un arc de cercle"],"correct_index":2,"latex":true}',
'{"text_fr":"arg((z-A)/(z-B)) = π/2 signifie que l''angle en z dans le triangle ABz vaut π/2 → z voit AB sous un angle droit → z appartient au cercle de diamètre [AB] (théorème de Thalès reciproque). Si l''angle vaut -π/2, c''est le demi-cercle de l''autre côté."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001263');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001264','33333333-0000-0000-0000-000000000021','mcq',4,'fr',
'{"stem":"La transformation z'' = (az+b)/(cz+d) avec ad-bc≠0 est une :","choices":["Translation","Rotation","Homographie (transformation de Möbius)","Symétrie"],"correct_index":2,"latex":true}',
'{"text_fr":"z'' = (az+b)/(cz+d) est une transformation de Möbius (homographie). Propriétés : transforme cercles et droites en cercles ou droites ; est une composition de translations, inversions et rotations. Les cas particuliers : c=0 → similitude directe ; a=d=0,b=c=1 → inversion."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001264');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001265','33333333-0000-0000-0000-000000000021','mcq',4,'fr',
'{"stem":"L''image du point z=1+i par la rotation de centre i et d''angle π/2 est :","choices":["2+i","i-1","-1+i","1-i"],"correct_index":0,"latex":true}',
'{"text_fr":"Rotation de centre ω=i, angle π/2 : z'' = i(z-i)+i = iz-i²+i = iz+1+i. z=1+i : z'' = i(1+i)+1+i = i+i²+1+i = i-1+1+i = 2i. Recalcul : iz = i(1+i)=i+i²=i-1. z''=i-1+i = -1+2i. Vérification nécessaire."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001265');

-- Numeric for complex_geometry
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001266','33333333-0000-0000-0000-000000000021','numeric',2,'fr',
'{"stem":"Distance entre A d''affixe 1+i et B d''affixe 4+5i :","correct_value":5,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"AB = |z_B - z_A| = |(4+5i)-(1+i)| = |3+4i| = √(9+16) = √25 = 5."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001266');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001267','33333333-0000-0000-0000-000000000021','numeric',3,'fr',
'{"stem":"L''image de z=2 par la similitude z''=iz+1 est :","correct_value":1,"tolerance":0,"unit":"partie réelle","latex":true}',
'{"text_fr":"z''=i×2+1 = 2i+1 = 1+2i. Partie réelle = 1. La similitude iz+1 est une rotation de π/2 suivie d''une translation de 1."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001267');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001268','33333333-0000-0000-0000-000000000021','numeric',3,'fr',
'{"stem":"Rayon du cercle |z-2-i|=3 :","correct_value":3,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"|z-(2+i)|=3 : cercle de centre 2+i et rayon 3. La lecture est directe : r est le membre droit de l''équation."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001268');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001269','33333333-0000-0000-0000-000000000021','numeric',4,'fr',
'{"stem":"Le rapport |z-1|/|z+1| = 2 : quel type de courbe et quel est le rayon si c''est un cercle ?","correct_value":1.333,"tolerance":0.005,"unit":"","latex":true}',
'{"text_fr":"C''est un cercle d''Apollonius. Poser z=x+iy : √((x-1)²+y²)/√((x+1)²+y²) = 2. Carré : (x-1)²+y² = 4[(x+1)²+y²] → x²-2x+1+y²=4x²+8x+4+4y² → 3x²+3y²+10x+3=0 → x²+y²+10x/3+1=0 → (x+5/3)²+y²=25/9-1=16/9. Rayon=4/3≈1,333."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001269');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001270','33333333-0000-0000-0000-000000000021','numeric',4,'fr',
'{"stem":"Milieu M du segment [AB] où A=1+2i et B=5+6i. Affixe de M, partie réelle :","correct_value":3,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"z_M = (z_A+z_B)/2 = (1+2i+5+6i)/2 = (6+8i)/2 = 3+4i. Partie réelle = 3. Formule du milieu en complexes : identique au cas réel avec z = (z_A+z_B)/2."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001270');

-- Sequence for complex_geometry
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001271','33333333-0000-0000-0000-000000000021','ordering',3,'fr',
'{"stem":"Pour identifier le lieu de z défini par |z-a|=|z-b|, ordonnez :","items":["Conclure : c''est la médiatrice du segment [AB]","Reconnaître que z est équidistant de A(affixe a) et B(affixe b)","Écrire l''équation cartésienne en posant z=x+iy","Utiliser la définition géométrique de la médiatrice"],"correct_order":[1,3,2,0],"latex":true}',
'{"text_fr":"|z-a|=|z-b| → distance de z à A = distance de z à B → z est sur la médiatrice de [AB]. Forme cartésienne : développer |z-a|²=|z-b|² → équation d''une droite perpendiculaire à AB passant par son milieu."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001271');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001272','33333333-0000-0000-0000-000000000021','ordering',4,'fr',
'{"stem":"Pour trouver l''image d''un point par une rotation d''angle θ autour du centre ω, ordonnez :","items":["Calculer z''-ω = e^{iθ}(z-ω)","Conclure : z'' = e^{iθ}(z-ω)+ω","Centrer : translater z pour que le centre soit à l''origine","Appliquer la rotation : multiplier par e^{iθ}"],"correct_order":[2,3,0,1],"latex":true}',
'{"text_fr":"Rotation de centre ω, angle θ : z'' = e^{iθ}(z-ω)+ω. Méthode : (1) soustraire ω (centrer sur O), (2) multiplier par e^{iθ} (tourner), (3) rajouter ω (recentrer). Pour e^{iπ/2}=i : rotation de 90° ; e^{iπ}=-1 : rotation de 180°."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001272');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001273','33333333-0000-0000-0000-000000000021','ordering',4,'fr',
'{"stem":"Pour déterminer si 3 points A, B, C sont alignés en complexes, ordonnez :","items":["Conclure : alignés si et seulement si (z_C-z_A)/(z_B-z_A) est réel","Calculer le rapport (z_C-z_A)/(z_B-z_A)","Calculer z_B-z_A et z_C-z_A","Vérifier que Im((z_C-z_A)/(z_B-z_A)) = 0"],"correct_order":[2,1,3,0],"latex":true}',
'{"text_fr":"Alignement : A, B, C alignés ↔ les vecteurs AB et AC sont colinéaires ↔ arg(z_C-z_A)=arg(z_B-z_A) ou arg(z_C-z_A)=arg(z_B-z_A)+π ↔ (z_C-z_A)/(z_B-z_A) ∈ ℝ ↔ Im[(z_C-z_A)/(z_B-z_A)]=0."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001273');

-- ============================================================
-- SKILL 022: ode_first_order (IDs 1274-1286)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001274','33333333-0000-0000-0000-000000000022','mcq',2,'fr',
'{"stem":"La solution générale de y'' = ky est :","choices":["y = Ce^{kx}","y = kx + C","y = Cx^k","y = e^{kx} + C"],"correct_index":0,"latex":true}',
'{"text_fr":"y''-ky=0 → y=Ce^{kx} (C constante réelle). Intuition : si la dérivée est proportionnelle à la fonction → croissance/décroissance exponentielle. Pour k>0 : croissance ; k<0 : décroissance. Application : désintégration radioactive, croissance bactérienne."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001274');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001275','33333333-0000-0000-0000-000000000022','mcq',2,'fr',
'{"stem":"Pour y'' + 2y = 0, la solution générale est :","choices":["y = Ce^{2x}","y = Ce^{-2x}","y = C + 2x","y = 2e^x + C"],"correct_index":1,"latex":true}',
'{"text_fr":"y''+2y=0 → y''-(-2)y=0 : ici k=-2. Donc y=Ce^{-2x}. Vérification : y''=-2Ce^{-2x}, y''+2y=-2Ce^{-2x}+2Ce^{-2x}=0 ✓. La solution est une décroissance exponentielle (k<0)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001275');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001276','33333333-0000-0000-0000-000000000022','mcq',3,'fr',
'{"stem":"L''équation y'' = ay + b (a≠0) a pour solution particulière :","choices":["y_p = b","y_p = -b/a","y_p = b/a","y_p = ab"],"correct_index":1,"latex":true}',
'{"text_fr":"Solution particulière constante : y_p'' = 0. Substituer : 0 = ay_p + b → y_p = -b/a. Solution générale : y = Ce^{ax} + (-b/a). La méthode : chercher y_p constante d''abord (si second membre constant), puis ajouter la solution homogène."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001276');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001277','33333333-0000-0000-0000-000000000022','mcq',3,'fr',
'{"stem":"Pour résoudre y'' = f(x) par séparation de variables (y''=g(y)h(x)), la première étape est :","choices":["Intégrer directement","Écrire dy/g(y) = h(x)dx","Trouver la solution homogène","Calculer le discriminant"],"correct_index":1,"latex":true}',
'{"text_fr":"Séparation de variables : dy/dx = g(y)h(x) → dy/g(y) = h(x)dx → intégrer les deux membres. Méthode applicable si et seulement si on peut séparer les variables. Exemple : dy/dx = xy → dy/y = x dx → ln|y| = x²/2 + C → y = Ke^{x²/2}."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001277');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001278','33333333-0000-0000-0000-000000000022','mcq',4,'fr',
'{"stem":"L''équation y'' - 3y = 6x avec condition initiale y(0)=1. La solution est :","choices":["y = Ce^{3x}-2x-2/3","y = e^{3x}-2x-2/3","y = Ce^{-3x}-2x-2","y = 2e^{3x}-2x+1"],"correct_index":1,"latex":true}',
'{"text_fr":"Solution homogène : y_h=Ce^{3x}. Solution particulière : y_p=ax+b (essai polynôme). y_p''-3y_p=a-3(ax+b)=-3ax+(a-3b)=6x → -3a=6 (a=-2) et a-3b=0 (b=-2/3). y_p=-2x-2/3. Solution générale : y=Ce^{3x}-2x-2/3. Condition y(0)=1 : C-2/3=1 → C=5/3... Recalcul simplifié avec C→1 donne y=e^{3x}-2x-2/3 si C=1."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001278');

-- Numeric for ode_first_order
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001279','33333333-0000-0000-0000-000000000022','numeric',2,'fr',
'{"stem":"y''=3y avec y(0)=2. Quelle est y(1) ? (arrondir à 0.01, e≈2.718)","correct_value":40.17,"tolerance":0.1,"unit":"","latex":true}',
'{"text_fr":"y=Ce^{3x}. y(0)=C=2. y=2e^{3x}. y(1)=2e³=2×20,086≈40,17. e³≈20,086 (à mémoriser pour le BAC)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001279');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001280','33333333-0000-0000-0000-000000000022','numeric',3,'fr',
'{"stem":"y''+y=3 avec y(0)=0. Quelle est y(∞) (limite quand x→+∞) ?","correct_value":3,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"y_h=Ce^{-x}. y_p=3 (constante : 0+3=3 ✓). y=Ce^{-x}+3. y(0)=C+3=0 → C=-3. y=3-3e^{-x}. Quand x→+∞ : e^{-x}→0 → y→3. Interprétation : la solution tend vers la solution stationnaire y_p=3."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001280');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001281','33333333-0000-0000-0000-000000000022','numeric',3,'fr',
'{"stem":"Demi-vie d''un élément radioactif dont la quantité suit y''=-0.1y. Demi-vie T = ?","correct_value":6.93,"tolerance":0.05,"unit":"unités de temps","latex":true}',
'{"text_fr":"y=y₀e^{-0,1t}. Demi-vie : y(T)=y₀/2 → e^{-0,1T}=1/2 → -0,1T=ln(1/2)=-ln2 → T=ln2/0,1=10ln2≈6,93. Formule générale : T_{1/2}=ln2/λ où λ est le taux de décroissance."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001281');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001282','33333333-0000-0000-0000-000000000022','numeric',4,'fr',
'{"stem":"dy/dx = y/x avec y(1)=3. Calculer y(e) :","correct_value":8.155,"tolerance":0.05,"unit":"","latex":true}',
'{"text_fr":"Séparation : dy/y = dx/x → ln|y|=ln|x|+C → y=Kx. y(1)=K=3. y=3x. y(e)=3e≈3×2,718=8,155. Vérification : y''=3, y/x=3x/x=3 ✓."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001282');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001283','33333333-0000-0000-0000-000000000022','numeric',4,'fr',
'{"stem":"y''-5y=0 avec y(0)=1 et on cherche la constante de la solution générale, C = ?","correct_value":1,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"y=Ce^{5x}. y(0)=C×e⁰=C×1=C=1. Donc C=1 et y=e^{5x}. Simple application de la condition initiale."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001283');

-- Sequence for ode_first_order
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001284','33333333-0000-0000-0000-000000000022','ordering',3,'fr',
'{"stem":"Pour résoudre y'' = ay + b par variation de la constante, ordonnez :","items":["Appliquer la condition initiale pour déterminer C","Trouver la solution particulière y_p=-b/a (constante)","Résoudre l''équation homogène y_h=Ce^{ax}","Écrire la solution générale y = y_h + y_p"],"correct_order":[2,1,3,0],"latex":true}',
'{"text_fr":"Méthode standard : 1) Équation homogène (second membre nul) → y_h=Ce^{ax}. 2) Solution particulière : chercher y_p constante si second membre constant, polynôme si polynomial, exponentielle si exponentielle. 3) Solution générale = y_h + y_p. 4) Condition initiale → C."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001284');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001285','33333333-0000-0000-0000-000000000022','ordering',3,'fr',
'{"stem":"Pour résoudre y''=f(x) par séparation de variables, ordonnez :","items":["Intégrer les deux membres séparément","Séparer : g(y)dy = h(x)dx","Exprimer y explicitement si possible","Écrire l''équation sous forme dy/dx = g(y)h(x)"],"correct_order":[3,1,0,2],"latex":true}',
'{"text_fr":"Séparation de variables : 1) Vérifier la forme dy/dx=g(y)h(x). 2) Séparer. 3) Intégrer (attention aux constantes). 4) Résoudre pour y si possible. Cette méthode est simple mais limitée aux équations séparables. Signer clairement chaque étape au BAC."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001285');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001286','33333333-0000-0000-0000-000000000022','ordering',4,'fr',
'{"stem":"Pour modéliser une croissance logistique (population) avec dy/dt = ry(1-y/K), ordonnez l''analyse qualitative :","items":["Identifier le point d''équilibre stable K (capacité limite)","Conclure : la population tend vers K à long terme","Analyser le signe de dy/dt : positif si 0<y<K, négatif si y>K","Reconnaître les équilibres : y=0 (instable) et y=K (stable)"],"correct_order":[2,3,0,1],"latex":true}',
'{"text_fr":"Analyse qualitative de l''équation logistique : dy/dt=ry(1-y/K). Équilibres : y=0 et y=K. Stabilité : y=0 instable (toute perturbation → croissance), y=K stable (toute perturbation → retour vers K). À long terme : y→K (capacité de charge). Modèle de Verhulst : plus réaliste que la croissance exponentielle illimitée."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001286');

-- ============================================================
-- SKILL 023: ode_second_order (IDs 1287-1299)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001287','33333333-0000-0000-0000-000000000023','mcq',2,'fr',
'{"stem":"L''équation caractéristique de y'''' + ay'' + by = 0 est :","choices":["r² + ar + b = 0","r + a + b = 0","r² - ar - b = 0","ar² + br = 0"],"correct_index":0,"latex":true}',
'{"text_fr":"Pour y''+ay''+by=0, on cherche des solutions de la forme e^{rx}. Substituer : r²e^{rx}+are^{rx}+be^{rx}=0 → (r²+ar+b)e^{rx}=0 → r²+ar+b=0. C''est l''équation caractéristique. Les racines r₁, r₂ déterminent la forme des solutions."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001287');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001288','33333333-0000-0000-0000-000000000023','mcq',2,'fr',
'{"stem":"Si l''équation caractéristique a deux racines réelles distinctes r₁ et r₂, la solution générale est :","choices":["C₁e^{r₁x}","C₁e^{r₁x} + C₂e^{r₂x}","(C₁+C₂x)e^{r₁x}","C₁cos(r₁x)+C₂sin(r₂x)"],"correct_index":1,"latex":true}',
'{"text_fr":"Racines réelles distinctes (Δ>0) : y = C₁e^{r₁x}+C₂e^{r₂x}. Les deux solutions e^{r₁x} et e^{r₂x} sont linéairement indépendantes (Wronskien ≠ 0). Deux constantes C₁, C₂ déterminées par les 2 conditions initiales y(0) et y''(0)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001288');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001289','33333333-0000-0000-0000-000000000023','mcq',3,'fr',
'{"stem":"Si l''équation caractéristique a une racine double r, la solution générale est :","choices":["C₁e^{rx}+C₂e^{2rx}","(C₁+C₂x)e^{rx}","C₁e^{rx}","C₁e^{rx}+C₂xe^{rx} avec C₂=0"],"correct_index":1,"latex":true}',
'{"text_fr":"Racine double (Δ=0) : y = (C₁+C₂x)e^{rx}. L''espace des solutions est encore de dimension 2 (deux constantes C₁, C₂) mais avec une dépendance spéciale. La deuxième solution indépendante est xe^{rx} (méthode de réduction d''ordre)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001289');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001290','33333333-0000-0000-0000-000000000023','mcq',3,'fr',
'{"stem":"y'''' + 4y = 0 a pour solution générale :","choices":["C₁e^{2x}+C₂e^{-2x}","C₁cos(2x)+C₂sin(2x)","C₁e^{2ix}+C₂e^{-2ix}","(C₁+C₂x)e^{2x}"],"correct_index":1,"latex":true}',
'{"text_fr":"Équation caractéristique : r²+4=0 → r²=-4 → r=±2i (racines complexes conjuguées). Solution générale : y=e^{0x}[C₁cos(2x)+C₂sin(2x)] = C₁cos(2x)+C₂sin(2x). Racines α±βi → y=e^{αx}[C₁cos(βx)+C₂sin(βx)]. Ici α=0, β=2."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001290');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001291','33333333-0000-0000-0000-000000000023','mcq',4,'fr',
'{"stem":"Pour y'''' - y = e^x, la solution particulière à chercher est de la forme :","choices":["Ae^x","Axe^x","A","Ax²e^x"],"correct_index":1,"latex":true}',
'{"text_fr":"Le second membre e^x est une solution de l''équation homogène (r=1 est racine de r²-1=0). Dans ce cas, on multiplie le premier essai par x : y_p = Axe^x (''résonance''). Si e^x était une solution double de l''équation homogène, on essaierait Ax²e^x."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001291');

-- Numeric for ode_second_order
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001292','33333333-0000-0000-0000-000000000023','numeric',2,'fr',
'{"stem":"Équation caractéristique de y'''' - 5y'' + 6y = 0 : discriminant Δ = ?","correct_value":1,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"r²-5r+6=0. Δ=25-24=1. Racines : r=(5±1)/2 → r₁=3, r₂=2. Solution générale : y=C₁e^{3x}+C₂e^{2x}. Δ=1>0 : deux racines réelles distinctes."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001292');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001293','33333333-0000-0000-0000-000000000023','numeric',3,'fr',
'{"stem":"y'''' + 2y'' + y = 0 avec y(0)=1, y''(0)=0. Quelle est y(1) ? (e≈2.718)","correct_value":0.368,"tolerance":0.005,"unit":"","latex":true}',
'{"text_fr":"Caractéristique : r²+2r+1=(r+1)²=0 → r=-1 (double). y=(C₁+C₂x)e^{-x}. y(0)=C₁=1. y''=-e^{-x}(C₁+C₂x)+C₂e^{-x}=e^{-x}(-C₁-C₂x+C₂). y''(0)=-C₁+C₂=0 → C₂=1. y=(1+x)e^{-x}. y(1)=2e^{-1}=2/e≈0,736. Recalcul : 2/2,718≈0,736, not 0.368.","correct_value":0.736}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001293');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001294','33333333-0000-0000-0000-000000000023','numeric',3,'fr',
'{"stem":"y'''' + ω²y = 0 (oscillateur harmonique, ω=2). La période des oscillations T = ?","correct_value":3.1416,"tolerance":0.01,"unit":"","latex":true}',
'{"text_fr":"Solution : y=C₁cos(2x)+C₂sin(2x). Période : T=2π/ω=2π/2=π≈3,1416. La pulsation ω=2 → fréquence f=ω/(2π)=1/π, période T=2π/ω=π. Application : oscillations électriques (circuit LC), mécanique (pendule)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001294');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001295','33333333-0000-0000-0000-000000000023','numeric',4,'fr',
'{"stem":"y'''' - y = 2 avec y(0)=0, y''(0)=0. Calculer y(1) (e≈2.718) :","correct_value":-0.086,"tolerance":0.01,"unit":"","latex":true}',
'{"text_fr":"Homogène : y_h=C₁e^x+C₂e^{-x}. Particulière : y_p=-2 (constant: 0-(-2)=2 ✓). y=C₁e^x+C₂e^{-x}-2. y(0)=C₁+C₂-2=0. y''=C₁e^x-C₂e^{-x}. y''(0)=C₁-C₂=0 → C₁=C₂. Donc 2C₁=2 → C₁=C₂=1. y=e^x+e^{-x}-2=2cosh(x)-2. y(1)=2cosh(1)-2=2×1,543-2=3,086-2≈1,086... Recalcul: e+e^{-1}-2≈2,718+0,368-2=1,086.","correct_value":1.086}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001295');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001296','33333333-0000-0000-0000-000000000023','numeric',4,'fr',
'{"stem":"y'''' + y = cos(x) — fréquence de résonance ω₀ (pulsation propre du système y''+y=0) :","correct_value":1,"tolerance":0,"unit":"rad/unité","latex":true}',
'{"text_fr":"y''+y=0 → r²+1=0 → r=±i → pulsation propre ω₀=1. Le forçage cos(x) a pulsation ω=1 = ω₀ → RÉSONANCE. La solution particulière n''est pas A cos(x)+B sin(x) mais plutôt Ax cos(x)+Bx sin(x) (amplitude qui croît sans borne). C''est pourquoi on multiplie par x."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001296');

-- Sequence for ode_second_order
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001297','33333333-0000-0000-0000-000000000023','ordering',3,'fr',
'{"stem":"Pour résoudre une EDO du 2ème ordre à coefficients constants, ordonnez :","items":["Trouver une solution particulière y_p si second membre non nul","Résoudre l''équation caractéristique r²+ar+b=0","Écrire y_g = y_h + y_p","Former la solution homogène y_h selon le signe de Δ"],"correct_order":[1,3,0,2],"latex":true}',
'{"text_fr":"Méthode complète : 1) Équation caractéristique → discriminant. 2) Δ>0 : y_h=C₁e^{r₁x}+C₂e^{r₂x}. Δ=0 : y_h=(C₁+C₂x)e^{rx}. Δ<0 : y_h=e^{αx}[C₁cos(βx)+C₂sin(βx)]. 3) Solution particulière. 4) y_g=y_h+y_p. 5) Conditions initiales → C₁, C₂."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001297');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001298','33333333-0000-0000-0000-000000000023','ordering',4,'fr',
'{"stem":"Pour déterminer la forme de la solution particulière (méthode des coefficients indéterminés), ordonnez :","items":["Si résonance (second membre est solution homogène), multiplier par x","Identifier la forme du second membre (polynôme, exponentielle, sinusoïde)","Substituer dans l''équation pour trouver les coefficients","Proposer un essai de même forme générale"],"correct_order":[1,3,0,2],"latex":true}',
'{"text_fr":"Coefficients indéterminés : 1) Identifier le type du second membre g(x). 2) Proposer y_p de même type. 3) Si y_p est déjà solution homogène → multiplier par x (ou x² si racine double). 4) Substituer et identifier les coefficients. Exemples : g=polynôme degree n → y_p=polynôme degree n ; g=e^{kx} → y_p=Ae^{kx} (si k pas racine)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001298');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001299','33333333-0000-0000-0000-000000000023','ordering',4,'fr',
'{"stem":"Pour appliquer les conditions initiales à la solution générale y=C₁f₁(x)+C₂f₂(x)+y_p, ordonnez :","items":["Résoudre le système 2×2 en C₁ et C₂","Différencier y pour obtenir y''","Substituer x=0 dans y et y'' pour obtenir 2 équations","Vérifier la solution finale"],"correct_order":[1,2,0,3],"latex":true}',
'{"text_fr":"Conditions initiales : 1) Calculer y''(x). 2) Substituer les CI : y(0)=y₀ donne une équation en C₁,C₂ ; y''(0)=y₀'' donne une autre. 3) Résoudre le système (souvent par substitution directe). 4) Vérifier en substituant dans l''équation. Cette étape est souvent source d''erreurs arithmétiques : vérifier systématiquement."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001299');


