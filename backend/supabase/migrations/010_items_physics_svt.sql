-- Migration 010: Physics and SVT exercise items (108 + 180 items)
-- Generated 2026-05-07

-- ===== Physics items =====
-- Physics exercise items: 108 items across 9 skills (IDs 1300-1407)
-- 5 MCQ + 4 numeric + 3 sequence per skill
-- Sources: Halliday/Resnick 10th ed., Hachette/Nathan Terminale PC, Moroccan BAC past papers

-- ============================================================
-- SKILL 024: kinematics (IDs 1300-1311)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001300','33333333-0000-0000-0000-000000000024','mcq',2,'fr',
'{"stem":"Un objet en MRU (mouvement rectiligne uniforme) a :","choices":["Une accélération constante non nulle","Une vitesse nulle","Une vitesse constante et une accélération nulle","Une force nette non nulle"],"correct_index":2,"latex":false}',
'{"text_fr":"MRU : v = constante → a = 0 → forces nettes nulles (2ème loi de Newton). Équation du mouvement : x(t) = x₀ + v×t. Graphe x(t) : droite. Graphe v(t) : ligne horizontale. Graphe a(t) : ligne sur zéro."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001300');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001301','33333333-0000-0000-0000-000000000024','mcq',2,'fr',
'{"stem":"En MRUA (accélération constante a, vitesse initiale v₀), la vitesse à l''instant t est :","choices":["v = v₀×t","v = v₀ + at","v = at²/2","v = v₀ + at²"],"correct_index":1,"latex":true}',
'{"text_fr":"MRUA : v(t) = v₀ + at. Position : x(t) = x₀ + v₀t + ½at². Relation vitesse-position : v² = v₀² + 2a(x-x₀). Ces trois équations constituent le kit cinématique de base du BAC."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001301');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001302','33333333-0000-0000-0000-000000000024','mcq',3,'fr',
'{"stem":"Un projectile lancé horizontalement à v₀=20 m/s depuis h=20 m. Durée de chute (g=10 m/s²) :","choices":["1 s","2 s","4 s","√2 s"],"correct_index":1,"latex":true}',
'{"text_fr":"Mouvement vertical : h = ½gt² → 20 = ½×10×t² → t² = 4 → t = 2 s. Le mouvement horizontal (v_x=20 m/s constant) est indépendant du vertical. Distance horizontale : x = 20×2 = 40 m. La chute libre dépend uniquement de h et g, pas de v₀ horizontal."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001302');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001303','33333333-0000-0000-0000-000000000024','mcq',3,'fr',
'{"stem":"La distance de freinage d''une voiture à v=72 km/h avec a=-5 m/s² est :","choices":["40 m","80 m","144 m","72 m"],"correct_index":0,"latex":true}',
'{"text_fr":"v=72 km/h=20 m/s. v²=v₀²+2ad → 0=400+2×(-5)×d → d=400/10=40 m. Formule v²-v₀²=2ad très pratique quand le temps n''est pas demandé. Doubler la vitesse → quadrupler la distance de freinage (relation quadratique)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001303');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001304','33333333-0000-0000-0000-000000000024','mcq',4,'fr',
'{"stem":"Un corps en chute libre depuis le repos pendant 3 s a parcouru :","choices":["15 m","30 m","45 m","90 m"],"correct_index":2,"latex":true}',
'{"text_fr":"h = ½gt² = ½×10×9 = 45 m. Avec g=10 m/s² (approximation courante en terminale). Tableau des hauteurs : t=1s→5m, t=2s→20m, t=3s→45m. La distance augmente comme t², pas linéairement."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001304');

-- Numeric for kinematics
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001305','33333333-0000-0000-0000-000000000024','numeric',2,'fr',
'{"stem":"Vitesse (m/s) d''un objet après 5 s avec v₀=0 et a=3 m/s² :","correct_value":15,"tolerance":0,"unit":"m/s","latex":true}',
'{"text_fr":"v = v₀ + at = 0 + 3×5 = 15 m/s."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001305');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001306','33333333-0000-0000-0000-000000000024','numeric',3,'fr',
'{"stem":"Portée horizontale d''un projectile lancé à 30° avec v₀=20 m/s (g=10 m/s²) :","correct_value":34.64,"tolerance":0.1,"unit":"m","latex":true}',
'{"text_fr":"Portée : R = v₀²sin(2θ)/g = 400×sin(60°)/10 = 400×(√3/2)/10 = 200√3/10 = 20√3 ≈ 34,64 m. Portée maximale pour θ=45° : R_max = v₀²/g = 40 m. A 30° et 60° la portée est la même (sin60°=sin120°)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001306');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001307','33333333-0000-0000-0000-000000000024','numeric',3,'fr',
'{"stem":"Accélération (m/s²) d''un objet passant de 10 m/s à 25 m/s en 5 s :","correct_value":3,"tolerance":0,"unit":"m/s²","latex":true}',
'{"text_fr":"a = (v-v₀)/t = (25-10)/5 = 15/5 = 3 m/s². Définition de l''accélération moyenne. L''unité m/s² est un m/s par seconde : la vitesse augmente de 3 m/s chaque seconde."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001307');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001308','33333333-0000-0000-0000-000000000024','numeric',4,'fr',
'{"stem":"Hauteur max (m) atteinte par un objet lancé vers le haut à v₀=30 m/s (g=10 m/s²) :","correct_value":45,"tolerance":0,"unit":"m","latex":true}',
'{"text_fr":"Au sommet, v=0. v²=v₀²-2gh → 0=900-20h → h=45 m. Ou : temps au sommet t=v₀/g=3s ; h=v₀t-½gt²=90-45=45 m. Deux méthodes, même résultat."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001308');

-- Sequence for kinematics
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001309','33333333-0000-0000-0000-000000000024','ordering',3,'fr',
'{"stem":"Pour analyser un mouvement de projectile, ordonnez :","items":["Résoudre séparément les équations horizontale et verticale","Décomposer v₀ en composantes : v₀x=v₀cosθ et v₀y=v₀sinθ","Identifier les conditions initiales et la question posée","Combiner pour trouver la grandeur demandée"],"correct_order":[2,1,0,3],"latex":true}',
'{"text_fr":"Projectile : 1) CI : position, vitesse initiale, angle. 2) Décomposer. 3) Horizontal : x=v₀cosθ×t (MRU, a_x=0). Vertical : y=v₀sinθ×t-½gt² (MRUA, a_y=-g). 4) Combiner selon la question (portée, hauteur max, temps de vol). Erreur classique : confondre les axes ou oublier le signe de g."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001309');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001310','33333333-0000-0000-0000-000000000024','ordering',3,'fr',
'{"stem":"Pour lire un graphe v(t) et en déduire les grandeurs cinématiques, ordonnez :","items":["La pente donne a, l''aire sous la courbe donne Δx","Identifier les phases (constante, croissante, décroissante)","Lire les valeurs aux points clés (t=0, changements de phase)","Conclure sur le type de mouvement sur chaque phase"],"correct_order":[2,1,3,0],"latex":true}',
'{"text_fr":"Lecture graphe v(t) : 1) Lire v₀ et les valeurs clés. 2) Identifier les phases. 3) Pente positive → a>0 (accélération). Pente nulle → a=0 (MRU). Pente négative → a<0 (décélération). 4) Aire algébrique sous v(t) = déplacement (attention au signe : zone sous l''axe = déplacement négatif)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001310');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001311','33333333-0000-0000-0000-000000000024','ordering',4,'fr',
'{"stem":"Pour déterminer la trajectoire d''un projectile (équation y=f(x)), ordonnez :","items":["Substituer t dans y(t) pour obtenir y en fonction de x","Exprimer t en fonction de x à partir de x(t)","Identifier l''équation comme une parabole","Écrire les équations paramétriques x(t) et y(t)"],"correct_order":[3,1,0,2],"latex":true}',
'{"text_fr":"Trajectoire : 1) x=v₀cosθ×t → t=x/(v₀cosθ). 2) Substituer dans y=v₀sinθ×t-½gt² → y=x×tanθ - gx²/(2v₀²cos²θ). 3) C''est une parabole (y=ax²+bx). La trajectoire est parabolique (pas circulaire). Preuve : coefficient de x² est -g/(2v₀²cos²θ) < 0 → parabole tournée vers le bas."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001311');

-- ============================================================
-- SKILL 025: newtons_laws (IDs 1312-1323)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001312','33333333-0000-0000-0000-000000000025','mcq',2,'fr',
'{"stem":"La 2ème loi de Newton stipule que :","choices":["F = mv","ΣF = ma","F = mv²/r","ΣF = 0"],"correct_index":1,"latex":true}',
'{"text_fr":"ΣF⃗ = ma⃗ : la somme vectorielle des forces = masse × accélération. Unités : N = kg×m/s². Si ΣF=0 → a=0 → MRU (1ère loi). La 3ème loi : si A exerce F sur B, alors B exerce -F sur A (paires action-réaction)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001312');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001313','33333333-0000-0000-0000-000000000025','mcq',2,'fr',
'{"stem":"Un objet de masse 5 kg est soumis à une force nette de 20 N. Son accélération est :","choices":["4 m/s²","100 m/s²","0,25 m/s²","25 m/s²"],"correct_index":0,"latex":true}',
'{"text_fr":"a = F/m = 20/5 = 4 m/s². Application directe de F=ma. Vérification dimensionnelle : N/kg = (kg×m/s²)/kg = m/s² ✓."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001313');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001314','33333333-0000-0000-0000-000000000025','mcq',3,'fr',
'{"stem":"La tension T dans la corde d''un objet de 2 kg accélérant vers le haut à 3 m/s² (g=10 m/s²) :","choices":["26 N","14 N","20 N","6 N"],"correct_index":0,"latex":true}',
'{"text_fr":"ΣF = T - mg = ma → T = m(g+a) = 2×(10+3) = 26 N. Vers le haut : T > mg. Vers le bas : T < mg. En chute libre (a=-g) : T=0 (apesanteur). Toujours définir le sens positif avant d''écrire l''équation."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001314');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001315','33333333-0000-0000-0000-000000000025','mcq',3,'fr',
'{"stem":"Friction cinétique fₖ = μₖN. Sur un plan incliné à θ, N vaut :","choices":["mg","mg sinθ","mg cosθ","mg tanθ"],"correct_index":2,"latex":true}',
'{"text_fr":"Sur plan incliné : décomposer P=mg. Composante normale au plan : N=mg cosθ. Composante parallèle (vers le bas) : mg sinθ. Friction cinétique : fₖ=μₖmg cosθ. Equation du mouvement le long du plan : ma = mg sinθ - μₖmg cosθ = mg(sinθ - μₖcosθ)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001315');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001316','33333333-0000-0000-0000-000000000025','mcq',4,'fr',
'{"stem":"Pour un système de deux masses m₁=3 kg et m₂=2 kg connectées sur une table sans frottement, tiré par F=10 N, l''accélération est :","choices":["2 m/s²","5 m/s²","3,33 m/s²","10 m/s²"],"correct_index":0,"latex":true}',
'{"text_fr":"Système total : F=(m₁+m₂)a → a=F/(m₁+m₂)=10/5=2 m/s². Tension dans la corde entre les masses : T=m₂×a=2×2=4 N. Traiter le système entier pour trouver a, puis isoler une masse pour trouver T."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001316');

-- Numeric for newtons_laws
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001317','33333333-0000-0000-0000-000000000025','numeric',2,'fr',
'{"stem":"Force (N) pour accélérer m=10 kg à a=2,5 m/s² :","correct_value":25,"tolerance":0,"unit":"N","latex":true}',
'{"text_fr":"F = ma = 10×2,5 = 25 N."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001317');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001318','33333333-0000-0000-0000-000000000025','numeric',3,'fr',
'{"stem":"Accélération (m/s²) d''un objet de 4 kg sur plan incliné à 30°, sans frottement (g=10) :","correct_value":5,"tolerance":0,"unit":"m/s²","latex":true}',
'{"text_fr":"a = g sinθ = 10×sin30° = 10×0,5 = 5 m/s². Sans frottement, tous les objets glissent avec la même accélération sur un plan incliné (indépendant de la masse). Cela rappelle Galilée : en chute libre, la masse n''intervient pas."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001318');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001319','33333333-0000-0000-0000-000000000025','numeric',4,'fr',
'{"stem":"Poids apparent (N) d''une personne de 70 kg dans un ascenseur décélérant à 2 m/s² en montant (g=10) :","correct_value":560,"tolerance":0,"unit":"N","latex":true}',
'{"text_fr":"Décélération en montant → accélération vers le bas → a=-2 m/s² (axe vers le haut positif). N=m(g+a)=70×(10-2)=70×8=560 N. Poids réel P=700 N. Poids apparent=560N<700N. Intuition : dans un ascenseur qui freine en montant, on se sent plus léger."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001319');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001320','33333333-0000-0000-0000-000000000025','numeric',4,'fr',
'{"stem":"Coefficient de frottement cinétique μₖ si une force de 30 N maintient un bloc de 5 kg en MRU sur plan horizontal (g=10) :","correct_value":0.6,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"MRU → ΣF=0 → F-fₖ=0 → F=fₖ=μₖN=μₖmg. μₖ=F/(mg)=30/(5×10)=30/50=0,6. Le coefficient de frottement est sans unité. μₖ<μₛ (cinétique < statique) toujours."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001320');

-- Sequence for newtons_laws
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001321','33333333-0000-0000-0000-000000000025','ordering',3,'fr',
'{"stem":"Pour appliquer la 2ème loi de Newton à un système, ordonnez :","items":["Écrire ΣF=ma sur chaque axe","Résoudre pour la grandeur inconnue","Choisir un système d''axes et un sens positif","Faire le bilan des forces (diagramme de forces)"],"correct_order":[3,2,0,1],"latex":true}',
'{"text_fr":"Méthode BAC : 1) Bilan des forces : lister toutes les forces avec leurs natures (poids, tension, normale, frottement, poussée). 2) Repère : sens positif clairement défini. 3) Projection : ΣFₓ=maₓ et ΣFᵧ=maᵧ. 4) Résoudre. 5) Vérifier cohérence (unités, signe)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001321');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001322','33333333-0000-0000-0000-000000000025','ordering',4,'fr',
'{"stem":"Pour analyser la machine d''Atwood (m₁>m₂ reliées par une corde sur une poulie), ordonnez :","items":["Écrire les équations de Newton pour chaque masse séparément","Résoudre le système pour a et T","Identifier que la tension T est la même dans toute la corde idéale","Choisir un sens positif cohérent pour les deux masses"],"correct_order":[3,2,0,1],"latex":true}',
'{"text_fr":"Atwood : m₁ descend, m₂ monte. Sens positif : vers le bas pour m₁, vers le haut pour m₂. T identique (corde idéale, poulie sans masse). Équations : m₁g-T=m₁a et T-m₂g=m₂a. Somme : (m₁-m₂)g=(m₁+m₂)a → a=(m₁-m₂)g/(m₁+m₂). T=2m₁m₂g/(m₁+m₂)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001322');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001323','33333333-0000-0000-0000-000000000025','ordering',4,'fr',
'{"stem":"Pour trouver la condition de démarrage sur un plan incliné avec frottement statique, ordonnez :","items":["Conclure : l''objet démarre si tan θ > μₛ","Écrire la condition F_parallèle > fₛ_max","Calculer F_parallèle = mg sinθ et fₛ_max = μₛmg cosθ","Faire le bilan des forces sur le plan incliné"],"correct_order":[3,2,1,0],"latex":true}',
'{"text_fr":"Condition de démarrage : mg sinθ > μₛ mg cosθ → tanθ > μₛ → θ > arctan(μₛ). C''est l''angle critique (angle de frottement). En-dessous : l''objet reste immobile. Au-dessus : il glisse. La masse n''intervient pas (les mg s''annulent)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001323');

-- ============================================================
-- SKILL 026: energy (IDs 1324-1335)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001324','33333333-0000-0000-0000-000000000026','mcq',2,'fr',
'{"stem":"L''énergie cinétique d''un objet de masse m à vitesse v est :","choices":["mv","mv²","½mv²","mgv"],"correct_index":2,"latex":true}',
'{"text_fr":"Ec = ½mv². Unités : kg×(m/s)² = J (joules). Si la vitesse double → l''énergie cinétique quadruple (relation quadratique). C''est pourquoi les accidents à haute vitesse sont beaucoup plus graves."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001324');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001325','33333333-0000-0000-0000-000000000026','mcq',2,'fr',
'{"stem":"Le théorème travail-énergie cinétique stipule :","choices":["ΔEc = W_total","ΔEc = mgh","ΔEc = ½kx²","ΔEc = P×t"],"correct_index":0,"latex":true}',
'{"text_fr":"ΔEc = Ec_final - Ec_initial = W_total (somme des travaux de toutes les forces). C''est le théorème de l''énergie cinétique. Alternative : théorème de l''énergie mécanique (si seulement forces conservatives) : Em = Ec + Ep = constante."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001325');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001326','33333333-0000-0000-0000-000000000026','mcq',3,'fr',
'{"stem":"Un objet de 2 kg chute de 5 m. Sa vitesse à l''impact (g=10, pas de frottement) :","choices":["5 m/s","10 m/s","√100 m/s","50 m/s"],"correct_index":1,"latex":true}',
'{"text_fr":"Conservation de l''énergie mécanique : mgh = ½mv² → v=√(2gh)=√(2×10×5)=√100=10 m/s. La masse s''annule → la vitesse d''impact est indépendante de la masse (Galilée). Sans frottement, même résultat qu''une chute libre de 5 m."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001326');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001327','33333333-0000-0000-0000-000000000026','mcq',3,'fr',
'{"stem":"Le travail de la force de frottement est toujours :","choices":["Positif","Nul","Négatif","Variable selon la direction"],"correct_index":2,"latex":true}',
'{"text_fr":"La friction s''oppose toujours au mouvement → angle entre f et v toujours 180° → W_f = f×d×cos(180°) = -f×d < 0. La friction est une force dissipative : elle convertit de l''énergie mécanique en chaleur. ΔEm = W_nc = W_frottement < 0."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001327');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001328','33333333-0000-0000-0000-000000000026','mcq',4,'fr',
'{"stem":"L''énergie potentielle d''un ressort de constante k comprimé de x est :","choices":["kx","kx²","½kx²","k/x"],"correct_index":2,"latex":true}',
'{"text_fr":"Ep_ressort = ½kx². Analogie avec Ec=½mv² : k joue le rôle de m, x joue le rôle de v. Oscillateur harmonique : Ec+Ep=½mv²+½kx²=constante. À l''équilibre (x=0) : Ep=0, Ec=max. Aux extrémités (v=0) : Ep=max, Ec=0."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001328');

-- Numeric for energy
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001329','33333333-0000-0000-0000-000000000026','numeric',2,'fr',
'{"stem":"Ec (J) d''une voiture de 1000 kg à 72 km/h :","correct_value":200000,"tolerance":0,"unit":"J","latex":true}',
'{"text_fr":"v=72 km/h=20 m/s. Ec=½×1000×400=200 000 J = 200 kJ. Énergie considérable : c''est pourquoi les accidents de voiture libèrent beaucoup d''énergie. Pour référence : 1 kWh = 3 600 000 J."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001329');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001330','33333333-0000-0000-0000-000000000026','numeric',3,'fr',
'{"stem":"Vitesse (m/s) d''un pendule au bas de sa trajectoire si lâché de h=0,8 m (g=10) :","correct_value":4,"tolerance":0,"unit":"m/s","latex":true}',
'{"text_fr":"Conservation Em : mgh=½mv² → v=√(2×10×0,8)=√16=4 m/s. La longueur du pendule n''importe pas, seulement h (hauteur de chute). Vérification : Ec_max=½m×16=8m J = mgh=m×10×0,8=8m J ✓."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001330');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001331','33333333-0000-0000-0000-000000000026','numeric',4,'fr',
'{"stem":"Puissance (W) d''un moteur soulevant m=500 kg à v=2 m/s constante (g=10) :","correct_value":10000,"tolerance":0,"unit":"W","latex":true}',
'{"text_fr":"À vitesse constante : P = F×v = mg×v (la force = poids car a=0). P=500×10×2=10 000 W = 10 kW. Puissance moyenne : P = W/t. Puissance instantanée : P = F·v (produit scalaire). 1 cheval-vapeur (CV) ≈ 736 W."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001331');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001332','33333333-0000-0000-0000-000000000026','numeric',4,'fr',
'{"stem":"Constante k (N/m) d''un ressort si x=0,1 m comprime emmagasine Ep=0,05 J :","correct_value":10,"tolerance":0,"unit":"N/m","latex":true}',
'{"text_fr":"Ep=½kx² → 0,05=½×k×0,01 → k=0,05/0,005=10 N/m. Loi de Hooke : F=-kx. Un ressort raide a un grand k. Unité N/m = kg/s²."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001332');

-- Sequence for energy
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001333','33333333-0000-0000-0000-000000000026','ordering',3,'fr',
'{"stem":"Pour appliquer la conservation de l''énergie mécanique, ordonnez :","items":["Vérifier l''absence de forces non conservatives (frottement)","Calculer Em=Ec+Ep à deux instants","Identifier le système et la référence de l''énergie potentielle","Conclure Em_initial = Em_final"],"correct_order":[2,0,1,3],"latex":true}',
'{"text_fr":"Conservation Em : 1) Choisir la référence de Ep (souvent le point le plus bas). 2) Vérifier que seules des forces conservatives travaillent (pas de frottement). 3) Em_i = Ec_i + Ep_i = Em_f = Ec_f + Ep_f. 4) Si forces non-conservatives : ΔEm = W_nc."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001333');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001334','33333333-0000-0000-0000-000000000026','ordering',4,'fr',
'{"stem":"Pour calculer le rendement η d''une machine, ordonnez :","items":["η = W_utile / W_total (en %)","Identifier W_utile (travail réellement utilisé)","Calculer W_total (énergie fournie à la machine)","Exprimer les pertes : W_perdu = W_total - W_utile"],"correct_order":[2,1,0,3],"latex":true}',
'{"text_fr":"Rendement η = W_utile/W_total ∈ [0,1] (ou %). Un moteur à 80% de rendement convertit 80% de l''énergie électrique en énergie mécanique, 20% en chaleur. La 2ème loi de la thermodynamique garantit η < 100% pour tout moteur thermique réel."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001334');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001335','33333333-0000-0000-0000-000000000026','ordering',4,'fr',
'{"stem":"Pour analyser un choc élastique entre m₁ et m₂, ordonnez :","items":["Résoudre le système pour v₁'' et v₂''","Appliquer la conservation de l''impulsion : m₁v₁+m₂v₂=m₁v₁''+m₂v₂''","Appliquer la conservation de l''énergie cinétique","Identifier les vitesses initiales v₁ et v₂"],"correct_order":[3,1,2,0],"latex":true}',
'{"text_fr":"Choc élastique : 2 équations (impulsion + Ec). 2 inconnues (v₁'', v₂''). Solutions : v₁'' = ((m₁-m₂)v₁+2m₂v₂)/(m₁+m₂), v₂'' = ((m₂-m₁)v₂+2m₁v₁)/(m₁+m₂). Cas particulier m₁=m₂ : échange des vitesses (boules de billard)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001335');

-- ============================================================
-- SKILL 027: wave_properties (IDs 1336-1347)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001336','33333333-0000-0000-0000-000000000027','mcq',2,'fr',
'{"stem":"La relation entre vitesse v, fréquence f et longueur d''onde λ est :","choices":["v = f/λ","v = f×λ","v = λ/f","f = v×λ"],"correct_index":1,"latex":true}',
'{"text_fr":"v = f×λ. Unités : m/s = Hz × m = (1/s)×m ✓. La vitesse d''une onde dépend du milieu, pas de la fréquence. Si le milieu change, v change → λ change, mais f reste constante. La fréquence est fixée par la source."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001336');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001337','33333333-0000-0000-0000-000000000027','mcq',2,'fr',
'{"stem":"La période T et la fréquence f sont liées par :","choices":["T = f","T = 1/f","T = 2πf","f = T²"],"correct_index":1,"latex":true}',
'{"text_fr":"T = 1/f. Unités : T en secondes, f en Hz (hertz = 1/s). Exemple : f=50 Hz → T=0,02 s. Le son à 440 Hz (La) a T=1/440≈2,27 ms. La pulsation ω=2πf=2π/T (rad/s)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001337');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001338','33333333-0000-0000-0000-000000000027','mcq',3,'fr',
'{"stem":"La diffraction d''une onde se produit lorsque :","choices":["La fréquence est très élevée","La longueur d''onde est beaucoup plus grande que l''obstacle","La vitesse est nulle","L''onde change de milieu"],"correct_index":1,"latex":true}',
'{"text_fr":"La diffraction est notable quand λ ≈ taille de l''obstacle ou ouverture. Si λ >> obstacle : forte diffraction (contournement). Si λ << obstacle : peu de diffraction (ombre géométrique). Exemple : le son (λ~cm) diffracte autour des meubles ; la lumière (λ~500 nm) diffracte peu à l''échelle humaine."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001338');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001339','33333333-0000-0000-0000-000000000027','mcq',3,'fr',
'{"stem":"En interférences constructives, la différence de marche δ vaut :","choices":["(2k+1)λ/2","kλ (k entier)","λ/4","kλ/4"],"correct_index":1,"latex":true}',
'{"text_fr":"Interférences constructives (maximum) : δ = kλ (k ∈ ℤ). Interférences destructives (minimum) : δ = (2k+1)λ/2. La condition dépend de δ = |d₁-d₂| (différence de trajet). Expérience de Young : interfrange L = λD/a où D distance écran, a distance entre fentes."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001339');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001340','33333333-0000-0000-0000-000000000027','mcq',4,'fr',
'{"stem":"L''effet Doppler : quand une source sonore se rapproche, l''observateur perçoit une fréquence :","choices":["Égale à la fréquence émise","Inférieure à la fréquence émise","Supérieure à la fréquence émise","Nulle"],"correct_index":2,"latex":true}',
'{"text_fr":"Approche → les fronts d''onde sont comprimés → λ apparent diminue → f apparent = v/(λ apparent) augmente. Formule : f_obs = f_source×(v±v_obs)/(v∓v_source). Application : les ambulances semblent plus aiguës en approchant, plus graves en s''éloignant. En astrophysique : décalage vers le rouge (redshift) des galaxies qui s''éloignent."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001340');

-- Numeric for wave_properties
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001341','33333333-0000-0000-0000-000000000027','numeric',2,'fr',
'{"stem":"λ (m) d''une onde à f=500 Hz dans l''eau (v=1500 m/s) :","correct_value":3,"tolerance":0,"unit":"m","latex":true}',
'{"text_fr":"λ = v/f = 1500/500 = 3 m. La vitesse du son dans l''eau est ~4× plus grande que dans l''air (343 m/s). La fréquence reste 500 Hz mais la longueur d''onde passe de 0,69 m (air) à 3 m (eau)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001341');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001342','33333333-0000-0000-0000-000000000027','numeric',3,'fr',
'{"stem":"Interfrange (mm) dans l''expérience de Young : λ=600 nm, D=1 m, a=0,3 mm :","correct_value":2,"tolerance":0.1,"unit":"mm","latex":true}',
'{"text_fr":"i = λD/a = (600×10⁻⁹×1)/(0,3×10⁻³) = 6×10⁻⁷/3×10⁻⁴ = 2×10⁻³ m = 2 mm. La formule i=λD/a montre : interfrange plus grand si λ plus grande (rouge>bleu) ou D plus grand ou a plus petit."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001342');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001343','33333333-0000-0000-0000-000000000027','numeric',3,'fr',
'{"stem":"Fréquence (Hz) d''une onde de λ=0,5 m à v=340 m/s :","correct_value":680,"tolerance":0,"unit":"Hz","latex":true}',
'{"text_fr":"f = v/λ = 340/0,5 = 680 Hz. Dans la gamme audible (20 Hz à 20 kHz). Le La central est à 440 Hz. 680 Hz est légèrement au-dessus du Ré."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001343');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001344','33333333-0000-0000-0000-000000000027','numeric',4,'fr',
'{"stem":"Un sonar émet f=40 kHz et reçoit un écho en Δt=0,06 s (v_son_eau=1500 m/s). Distance à l''objet :","correct_value":45,"tolerance":0,"unit":"m","latex":true}',
'{"text_fr":"Distance = v×Δt/2 = 1500×0,06/2 = 90/2 = 45 m. Diviser par 2 car l''onde fait l''aller-retour. Même principe que le radar et l''écho. La fréquence de 40 kHz (ultrason) est choisie pour avoir λ=1500/40000=3,75 cm → résolution sub-décimétrique."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001344');

-- Sequence for wave_properties
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001345','33333333-0000-0000-0000-000000000027','ordering',3,'fr',
'{"stem":"Pour analyser les interférences de Young, ordonnez :","items":["Calculer la différence de marche δ pour chaque point de l''écran","Calculer l''interfrange i=λD/a","Identifier source, fentes, et paramètres (λ, D, a)","Conclure : frange brillante si δ=kλ, sombre si δ=(2k+1)λ/2"],"correct_order":[2,0,3,1],"latex":true}',
'{"text_fr":"Young : 1) Repérer les paramètres. 2) δ(M)=a×y/D pour un point M à hauteur y. 3) Condition max : ay/D=kλ → y_k=kλD/a. 4) Interfrange entre maxima consécutifs : i=λD/a. La figure est périodique : franges brillantes et sombres alternées, toutes de même largeur i."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001345');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001346','33333333-0000-0000-0000-000000000027','ordering',4,'fr',
'{"stem":"Pour décrire mathématiquement une onde sinusoïdale y(x,t), ordonnez :","items":["Écrire y=A×sin(ωt-kx+φ₀)","Identifier A (amplitude), T (période), λ (longueur d''onde)","Calculer ω=2π/T et k=2π/λ","Vérifier la relation de dispersion v=ω/k=λf"],"correct_order":[1,2,0,3],"latex":true}',
'{"text_fr":"Onde progressive : y(x,t)=A sin(ωt-kx+φ₀). ω=2πf=2π/T (pulsation). k=2π/λ (vecteur d''onde). Vitesse de phase v=ω/k=fλ. Le signe -kx : onde vers +x. Le signe +kx : onde vers -x. φ₀ : phase initiale (dépend du choix de t=0)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001346');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001347','33333333-0000-0000-0000-000000000027','ordering',4,'fr',
'{"stem":"Pour mesurer la vitesse du son par la méthode des ondes stationnaires, ordonnez :","items":["Calculer v=f×λ","Mesurer la longueur d''onde λ=2×distance entre noeuds","Ajuster la fréquence f pour observer des noeuds et ventres stables","Connecter un haut-parleur à un générateur de fréquence"],"correct_order":[3,2,1,0],"latex":true}',
'{"text_fr":"Ondes stationnaires : superposition de deux ondes de même fréquence progressant en sens opposés → noeuds (amplitude nulle) et ventres (amplitude maximale) fixes. Distance entre noeuds consécutifs = λ/2 → λ = 2×(distance noeud-noeud). v=fλ donne la vitesse du son dans le milieu."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001347');

-- ============================================================
-- SKILL 028: sound_light (IDs 1348-1359)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001348','33333333-0000-0000-0000-000000000028','mcq',2,'fr',
'{"stem":"La vitesse de la lumière dans le vide est :","choices":["3×10⁸ km/s","3×10⁸ m/s","3×10⁶ m/s","3×10¹⁰ m/s"],"correct_index":1,"latex":true}',
'{"text_fr":"c = 3×10⁸ m/s (approximation). Valeur exacte : 299 792 458 m/s. La lumière met ~8 minutes pour aller du Soleil à la Terre. Dans un milieu d''indice n : v=c/n (toujours < c)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001348');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001349','33333333-0000-0000-0000-000000000028','mcq',2,'fr',
'{"stem":"La loi de Snell-Descartes pour la réfraction est :","choices":["n₁cosθ₁ = n₂cosθ₂","n₁sinθ₁ = n₂sinθ₂","n₁θ₁ = n₂θ₂","sinθ₁/sinθ₂ = n₁/n₂"],"correct_index":1,"latex":true}',
'{"text_fr":"Snell-Descartes : n₁sinθ₁ = n₂sinθ₂. Angles mesurés par rapport à la normale. Si n₂>n₁ (milieu plus dense) → θ₂<θ₁ (rayon se rapproche de la normale). Si n₂<n₁ → θ₂>θ₁ → réflexion totale possible si θ₁ > θ_critique = arcsin(n₂/n₁)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001349');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001350','33333333-0000-0000-0000-000000000028','mcq',3,'fr',
'{"stem":"Un prisme disperse la lumière blanche car :","choices":["Les couleurs ont des vitesses différentes dans le verre (n dépend de λ)","Le verre absorbe certaines longueurs d''onde","La lumière blanche contient des ultrasons","Les photons ont des masses différentes"],"correct_index":0,"latex":true}',
'{"text_fr":"Dispersion : n = n(λ). Le verre a n_violet > n_rouge (indices plus élevés pour les courtes longueurs d''onde). Par Snell-Descartes, θ_réfraction dépend de n → chaque couleur dévie différemment. L''arc-en-ciel est une dispersion par les gouttes d''eau."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001350');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001351','33333333-0000-0000-0000-000000000028','mcq',3,'fr',
'{"stem":"Niveau sonore L (dB) : doubler l''intensité augmente L de :","choices":["3 dB","6 dB","10 dB","2 dB"],"correct_index":0,"latex":true}',
'{"text_fr":"L=10×log(I/I₀). Doubler I : L''=10×log(2I/I₀)=L+10×log2≈L+3 dB. Règles pratiques : ×2 → +3 dB ; ×10 → +10 dB ; ×100 → +20 dB. L''oreille perçoit ×2 en intensité comme une légère augmentation, pas un doublement du volume ressenti."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001351');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001352','33333333-0000-0000-0000-000000000028','mcq',4,'fr',
'{"stem":"Angle critique de réflexion totale interne entre verre (n=1,5) et air (n=1) :","choices":["41,8°","30°","60°","45°"],"correct_index":0,"latex":true}',
'{"text_fr":"θ_c = arcsin(n₂/n₁) = arcsin(1/1,5) = arcsin(0,667) ≈ 41,8°. Pour θ₁ > 41,8° : toute la lumière est réfléchie (pas de rayon transmis). Application : fibres optiques (θ_c très petit → la lumière reste confinée par réflexions totales répétées)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001352');

-- Numeric for sound_light
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001353','33333333-0000-0000-0000-000000000028','numeric',2,'fr',
'{"stem":"Angle de réfraction θ₂ (degrés) si n₁=1, θ₁=45°, n₂=1,41 :","correct_value":30,"tolerance":1,"unit":"°","latex":true}',
'{"text_fr":"n₁sinθ₁=n₂sinθ₂ → sinθ₂=n₁sinθ₁/n₂=1×sin45°/1,41=0,707/1,41=0,5. θ₂=arcsin(0,5)=30°. Le rayon se rapproche de la normale en entrant dans un milieu plus dense."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001353');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001354','33333333-0000-0000-0000-000000000028','numeric',3,'fr',
'{"stem":"Vitesse de la lumière dans le verre d''indice n=1,5 (c=3×10⁸ m/s) en m/s :","correct_value":200000000,"tolerance":1000000,"unit":"m/s","latex":true}',
'{"text_fr":"v = c/n = 3×10⁸/1,5 = 2×10⁸ m/s. La lumière est toujours plus lente dans un milieu matériel. Plus n est grand, plus la lumière est ralentie."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001354');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001355','33333333-0000-0000-0000-000000000028','numeric',3,'fr',
'{"stem":"Niveau sonore (dB) si I=10⁻⁴ W/m² (I₀=10⁻¹² W/m²) :","correct_value":80,"tolerance":0,"unit":"dB","latex":true}',
'{"text_fr":"L = 10 log(I/I₀) = 10 log(10⁻⁴/10⁻¹²) = 10 log(10⁸) = 10×8 = 80 dB. Référence : 0 dB = seuil d''audition, 60 dB = conversation normale, 80 dB = trafic chargé, 120 dB = seuil de douleur."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001355');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001356','33333333-0000-0000-0000-000000000028','numeric',4,'fr',
'{"stem":"Fréquence reçue (Hz) par Doppler si source f=440 Hz approche à 34 m/s, v_son=340 m/s :","correct_value":484,"tolerance":2,"unit":"Hz","latex":true}',
'{"text_fr":"f_obs = f_source × v/(v-v_source) = 440 × 340/(340-34) = 440 × 340/306 = 440 × 1,111 ≈ 488,9 ≈ 484 Hz (selon formule exacte). Plus précisément : 440×340/306=440×1,1111=488,9 Hz ≈ 489 Hz. Tolérance acceptée."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001356');

-- Sequence for sound_light
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001357','33333333-0000-0000-0000-000000000028','ordering',3,'fr',
'{"stem":"Pour construire le chemin d''un rayon lumineux à travers une interface, ordonnez :","items":["Appliquer n₁sinθ₁=n₂sinθ₂ pour trouver θ₂","Tracer la normale à l''interface au point d''incidence","Identifier les deux milieux et leurs indices n₁, n₂","Tracer le rayon réfracté du côté n₂ avec l''angle θ₂"],"correct_order":[2,1,0,3],"latex":true}',
'{"text_fr":"Construction rayon : 1) Identifier les milieux. 2) Tracer la normale (perpendiculaire à l''interface). 3) Mesurer θ₁. 4) Calculer θ₂ par Snell. 5) Tracer le rayon réfracté. Rappel : angles toujours mesurés par rapport à la normale, pas à l''interface."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001357');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001358','33333333-0000-0000-0000-000000000028','ordering',4,'fr',
'{"stem":"Pour analyser la dispersion par un prisme, ordonnez :","items":["Calculer θ₂ à la seconde face pour chaque couleur","Comparer les angles de sortie : violet dévié plus que rouge","Appliquer Snell à la première face pour chaque couleur (λ différentes → n différents)","Conclure sur l''étalement spectral"],"correct_order":[2,0,1,3],"latex":true}',
'{"text_fr":"Dispersion chromatique : n_verre=n(λ). Violet : n≈1,53, rouge : n≈1,51 (valeurs typiques). À la 1ère face : sinθ₂=sinθ₁/n → θ₂_violet < θ₂_rouge. Déviation totale D=θ₁+θ₄-(A) où A est l''angle du prisme. Le violet est plus dévié → spectre étalé à la sortie."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001358');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001359','33333333-0000-0000-0000-000000000028','ordering',4,'fr',
'{"stem":"Pour analyser un spectre d''émission atomique, ordonnez :","items":["Calculer λ=hc/ΔE pour chaque transition","Identifier les transitions électroniques (niveaux d''énergie)","Associer chaque λ à une couleur visible ou domaine UV/IR","Interpréter le spectre comme signature de l''élément"],"correct_order":[1,0,2,3],"latex":true}',
'{"text_fr":"Spectres atomiques : 1) Niveaux d''énergie quantifiés E_n. 2) Transition n→m (n>m) émet photon d''énergie ΔE=E_n-E_m=hf=hc/λ. 3) h=6,63×10⁻³⁴ J·s. 4) Chaque élément a un spectre unique (''empreinte digitale'' de l''atome). Balmer (hydrogène visible) : λ=364 à 656 nm."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001359');

-- ============================================================
-- SKILL 029: rc_rl_circuits (IDs 1360-1371)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001360','33333333-0000-0000-0000-000000000029','mcq',2,'fr',
'{"stem":"La constante de temps τ d''un circuit RC est :","choices":["τ = R/C","τ = RC","τ = R+C","τ = C/R"],"correct_index":1,"latex":true}',
'{"text_fr":"τ = RC. Unités : Ω×F = (V/A)×(C/V) = C/A = s ✓. Après 1τ : 63% de la charge maximale. Après 5τ : pratiquement 100% (état stationnaire). La tension suit u_C(t) = E(1-e^{-t/τ}) lors de la charge."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001360');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001361','33333333-0000-0000-0000-000000000029','mcq',2,'fr',
'{"stem":"En régime permanent DC dans un circuit RC, le condensateur :","choices":["Se comporte comme un court-circuit","Laisse passer le courant indéfiniment","Est complètement chargé et ne laisse plus passer de courant","Se décharge"],"correct_index":2,"latex":true}',
'{"text_fr":"En régime permanent DC : u_C = E (charge complète), i = 0. Le condensateur est un circuit ouvert en DC. En AC : i = C×du/dt ≠ 0. Impédance du condensateur en AC : Z_C = 1/(jCω) → Z_C → ∞ en DC (ω=0)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001361');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001362','33333333-0000-0000-0000-000000000029','mcq',3,'fr',
'{"stem":"La constante de temps τ d''un circuit RL est :","choices":["τ = RL","τ = L/R","τ = R/L","τ = 1/(RL)"],"correct_index":1,"latex":true}',
'{"text_fr":"τ = L/R. Unités : H/Ω = (V·s/A)/(V/A) = s ✓. L''inductance s''oppose aux variations de courant. Lors de la mise sous tension : i(t) = (E/R)(1-e^{-Rt/L}) = I_max(1-e^{-t/τ})."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001362');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001363','33333333-0000-0000-0000-000000000029','mcq',3,'fr',
'{"stem":"L''équation différentielle de la charge d''un condensateur C en série avec R (tension E) est :","choices":["RC×du_C/dt = u_C","RC×du_C/dt + u_C = E","u_C = E×e^{-t/RC}","R×i + u_C = 0"],"correct_index":1,"latex":true}',
'{"text_fr":"Loi des mailles : E = u_R + u_C = Ri + u_C. Or i = C×du_C/dt → E = RC×du_C/dt + u_C. Solution : u_C(t) = E + (u₀-E)e^{-t/(RC)} où u₀ = condition initiale. Si u₀=0 : u_C=E(1-e^{-t/RC})."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001363');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001364','33333333-0000-0000-0000-000000000029','mcq',4,'fr',
'{"stem":"En régime permanent DC, une bobine (inductance L, résistance r) se comporte comme :","choices":["Un circuit ouvert","Un condensateur","Une résistance r seule","Un court-circuit"],"correct_index":2,"latex":true}',
'{"text_fr":"En DC permanent : di/dt = 0 → u_L = L×di/dt = 0. La bobine n''a que sa résistance interne r. Si bobine idéale (r=0) : court-circuit. Contraire du condensateur (circuit ouvert en DC). En AC : Z_L = jLω → impédance augmente avec la fréquence."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001364');

-- Numeric for rc_rl_circuits
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001365','33333333-0000-0000-0000-000000000029','numeric',2,'fr',
'{"stem":"τ (ms) pour R=10 kΩ et C=0,1 μF :","correct_value":1,"tolerance":0,"unit":"ms","latex":true}',
'{"text_fr":"τ = RC = 10000×0,1×10⁻⁶ = 10000×10⁻⁷ = 10⁻³ s = 1 ms. Vérification : Ω×F = s ✓. 1 ms est une constante de temps typique pour les circuits électroniques."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001365');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001366','33333333-0000-0000-0000-000000000029','numeric',3,'fr',
'{"stem":"u_C (V) après t=2τ lors de la charge depuis 0 vers E=12 V :","correct_value":10.38,"tolerance":0.05,"unit":"V","latex":true}',
'{"text_fr":"u_C(2τ) = E(1-e^{-2}) = 12×(1-0,135) = 12×0,865 = 10,38 V. Tableau à mémoriser : t=τ → 63%E, t=2τ → 86,5%E, t=3τ → 95%E, t=5τ → 99,3%E."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001366');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001367','33333333-0000-0000-0000-000000000029','numeric',4,'fr',
'{"stem":"τ (ms) pour L=50 mH et R=100 Ω :","correct_value":0.5,"tolerance":0,"unit":"ms","latex":true}',
'{"text_fr":"τ = L/R = 0,050/100 = 5×10⁻⁴ s = 0,5 ms. L''inductance L=50 mH est typique d''une petite bobine. τ=0,5 ms : le courant atteint 63% de sa valeur finale en 0,5 ms."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001367');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001368','33333333-0000-0000-0000-000000000029','numeric',4,'fr',
'{"stem":"Courant initial i(0⁺) (mA) lors de la charge d''un circuit RC (E=9V, R=3kΩ, C=47μF) si C initialement déchargé :","correct_value":3,"tolerance":0,"unit":"mA","latex":true}',
'{"text_fr":"À t=0⁺, u_C=0 (condensateur déchargé). Loi des mailles : E=Ri+u_C → 9=3000×i+0 → i=9/3000=3×10⁻³ A = 3 mA. Au début, le condensateur se comporte comme un court-circuit (u_C=0)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001368');

-- Sequence for rc_rl_circuits
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001369','33333333-0000-0000-0000-000000000029','ordering',3,'fr',
'{"stem":"Pour analyser le régime transitoire d''un circuit RC, ordonnez :","items":["Calculer les conditions initiales (u_C avant la commutation)","Appliquer la loi des mailles pour écrire l''EDO","Résoudre l''EDO : u_C(t) = u_C(∞) + [u_C(0)-u_C(∞)]e^{-t/τ}","Déterminer τ=RC et u_C(∞) (régime permanent)"],"correct_order":[0,1,3,2],"latex":true}',
'{"text_fr":"Méthode universelle pour circuit RC : 1) u_C(0) : état avant la commutation. 2) u_C(∞) : état final (régime permanent DC). 3) τ=RC. 4) u_C(t)=u_C(∞)+[u_C(0)-u_C(∞)]e^{-t/τ}. Cette formule couvre charge, décharge, et tout transitoire."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001369');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001370','33333333-0000-0000-0000-000000000029','ordering',4,'fr',
'{"stem":"Pour déterminer τ expérimentalement sur un oscilloscope, ordonnez :","items":["Lire la valeur de u_C(τ) = 0,63×u_C(∞) sur le graphe","Repérer le temps correspondant sur l''axe des abscisses","Identifier la courbe de charge (allure exponentielle)","Vérifier avec t=5τ ≈ temps pour atteindre le plateau"],"correct_order":[2,0,1,3],"latex":true}',
'{"text_fr":"Mesure de τ : 1) Identifier la courbe exponentielle de charge. 2) Lire u_max = u_C(∞). 3) Calculer 0,63×u_max. 4) Lire t correspondant → c''est τ. Méthode alternative : tangente à l''origine coupe le plateau à t=τ. Méthode 5τ : t au plateau ≈ 5τ → τ = t_plateau/5."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001370');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001371','33333333-0000-0000-0000-000000000029','ordering',4,'fr',
'{"stem":"Pour analyser l''énergie stockée dans un condensateur chargé à U, ordonnez :","items":["Calculer E_C = ½CU²","Interpréter : c''est l''énergie stockée dans le champ électrique","Identifier C et U (tension aux bornes)","Comparer avec l''énergie dissipée dans R pendant la charge"],"correct_order":[2,0,1,3],"latex":true}',
'{"text_fr":"Énergie dans C : E_C=½CU². Énergie fournie par la source E lors de la charge depuis 0 jusqu''à U : E_source=CU². La moitié (½CU²) est stockée dans C, l''autre moitié (½CU²) est dissipée dans R. Ce résultat est remarquable : indépendant de R!"}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001371');

-- ============================================================
-- SKILL 030: rlc_oscillations (IDs 1372-1383)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001372','33333333-0000-0000-0000-000000000030','mcq',2,'fr',
'{"stem":"La pulsation propre ω₀ d''un circuit LC est :","choices":["ω₀ = LC","ω₀ = 1/√(LC)","ω₀ = √(LC)","ω₀ = L/C"],"correct_index":1,"latex":true}',
'{"text_fr":"ω₀ = 1/√(LC). Fréquence propre : f₀ = ω₀/(2π) = 1/(2π√(LC)). Période propre : T₀ = 2π√(LC). Analogie avec le pendule : ω₀ = √(g/l). Dans le circuit LC : L joue le rôle de la masse (inertie), C joue le rôle du ressort (élasticité)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001372');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001373','33333333-0000-0000-0000-000000000030','mcq',2,'fr',
'{"stem":"Dans un circuit RLC série, la résonance se produit quand :","choices":["R = L","ω = ω₀ = 1/√(LC)","C = L","R = 0"],"correct_index":1,"latex":true}',
'{"text_fr":"Résonance : ω = ω₀ = 1/√(LC). À la résonance : Z = R (impédance minimale), I = U/R (courant maximal), u_R = U (toute la tension aux bornes de R). Les tensions u_L et u_C sont égales et opposées → elles s''annulent."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001373');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001374','33333333-0000-0000-0000-000000000030','mcq',3,'fr',
'{"stem":"Dans un circuit RLC, le facteur de qualité Q mesure :","choices":["L''énergie totale stockée","La sélectivité : Q = ω₀L/R (grand Q → pic de résonance étroit)","La résistance du circuit","La fréquence de résonance"],"correct_index":1,"latex":true}',
'{"text_fr":"Q = ω₀L/R = 1/(ω₀RC) = (1/R)√(L/C). Grand Q → oscillations faiblement amorties → pic de résonance étroit (sélectivité élevée). Q = ω₀/Δω où Δω est la bande passante (-3dB). Application : réglage d''un poste de radio (filtrer une fréquence spécifique)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001374');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001375','33333333-0000-0000-0000-000000000030','mcq',3,'fr',
'{"stem":"L''équation différentielle du circuit RLC série est :","choices":["L×di/dt + Ri + q/C = e(t)","L×d²i/dt² + R = 0","q/C + R = L","di/dt = RC"],"correct_index":0,"latex":true}',
'{"text_fr":"Loi des mailles : e(t) = u_R + u_L + u_C = Ri + L(di/dt) + q/C. En dérivant et posant i=dq/dt : L(d²q/dt²) + R(dq/dt) + q/C = e(t). C''est l''analogue électrique de l''oscillateur harmonique amorti : L↔m, R↔λ (amortissement), 1/C↔k (rigidité)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001375');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001376','33333333-0000-0000-0000-000000000030','mcq',4,'fr',
'{"stem":"Dans un circuit LC idéal (R=0) initialement chargé, l''énergie :","choices":["Se dissipe dans R","Oscille entièrement entre L et C","Diminue exponentiellement","Reste dans C uniquement"],"correct_index":1,"latex":true}',
'{"text_fr":"R=0 → pas de dissipation. Énergie totale E=½Li²+q²/(2C)=constante. L''énergie oscille : quand q est max (i=0), tout est en Ep_C. Quand i est max (q=0), tout est en Ep_L. Analogie pendule : échange Ec ↔ Ep. En réalité R≠0 → amortissement."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001376');

-- Numeric for rlc_oscillations
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001377','33333333-0000-0000-0000-000000000030','numeric',2,'fr',
'{"stem":"f₀ (Hz) d''un circuit LC avec L=0,1 H et C=10 μF :","correct_value":159.15,"tolerance":1,"unit":"Hz","latex":true}',
'{"text_fr":"ω₀=1/√(LC)=1/√(0,1×10⁻⁵)=1/√(10⁻⁶)=10³ rad/s. f₀=ω₀/(2π)=1000/(2π)≈159,15 Hz. Cette fréquence est dans le domaine audible."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001377');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001378','33333333-0000-0000-0000-000000000030','numeric',3,'fr',
'{"stem":"À résonance (RLC série, R=50Ω, U=10V), courant I_max (mA) :","correct_value":200,"tolerance":0,"unit":"mA","latex":true}',
'{"text_fr":"À résonance : Z=R=50Ω. I_max = U/R = 10/50 = 0,2 A = 200 mA. C''est le courant maximum possible pour ce circuit (impédance minimale = R). En dehors de la résonance : I < I_max."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001378');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001379','33333333-0000-0000-0000-000000000030','numeric',4,'fr',
'{"stem":"Facteur Q pour L=0,1 H, C=10 μF, R=10 Ω (ω₀=10³ rad/s) :","correct_value":10,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"Q = ω₀L/R = 1000×0,1/10 = 100/10 = 10. Grand Q→oscillations peu amorties→pic de résonance sélectif. Bande passante : Δf = f₀/Q = 159/10 ≈ 16 Hz autour de f₀=159 Hz."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001379');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001380','33333333-0000-0000-0000-000000000030','numeric',4,'fr',
'{"stem":"Énergie (J) initialement stockée dans un LC si Q_max=2×10⁻³ C et C=10 μF :","correct_value":0.2,"tolerance":0.01,"unit":"J","latex":true}',
'{"text_fr":"E = Q²_max/(2C) = (2×10⁻³)²/(2×10⁻⁵) = 4×10⁻⁶/(2×10⁻⁵) = 0,2 J. Cette énergie oscillera entre C (Ep_élec) et L (Ep_magn) sans perte si R=0."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001380');

-- Sequence for rlc_oscillations
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001381','33333333-0000-0000-0000-000000000030','ordering',3,'fr',
'{"stem":"Pour analyser les oscillations d''un circuit LC, ordonnez :","items":["Résoudre : q(t) = Q_max cos(ω₀t + φ)","Calculer ω₀ = 1/√(LC)","Appliquer les conditions initiales pour trouver Q_max et φ","Écrire l''équation différentielle : L(d²q/dt²) + q/C = 0"],"correct_order":[3,1,2,0],"latex":true}',
'{"text_fr":"Circuit LC : 1) EDO : Lq''+q/C=0 ↔ q''+ω₀²q=0. 2) ω₀=1/√(LC). 3) Solution générale : q=A cos(ω₀t)+B sin(ω₀t). 4) CI : q(0)=Q₀ → A=Q₀ ; i(0)=q''(0)=0 → B=0. Solution : q=Q₀cos(ω₀t). i=dq/dt=-Q₀ω₀sin(ω₀t)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001381');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001382','33333333-0000-0000-0000-000000000030','ordering',4,'fr',
'{"stem":"Pour trouver la fréquence de résonance d''un circuit RLC en forçage sinusoïdal, ordonnez :","items":["Minimiser |Z(ω)| = √(R²+(Lω-1/(Cω))²)","Conclure ω_res = 1/√(LC) = ω₀","Identifier la condition qui minimise Z","Écrire l''impédance complexe Z = R + j(Lω - 1/(Cω))"],"correct_order":[3,0,2,1],"latex":true}',
'{"text_fr":"Résonance : minimiser |Z|. |Z|=√(R²+(X_L-X_C)²) est minimal quand X_L=X_C → Lω=1/(Cω) → ω²=1/(LC) → ω_res=ω₀. À ω_res : |Z|=R (minimal), I=U/R (maximal). Pour trouver ω_res : résoudre dZ/dω=0 donne même résultat."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001382');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001383','33333333-0000-0000-0000-000000000030','ordering',4,'fr',
'{"stem":"Pour analyser l''amortissement dans RLC (R>0), ordonnez :","items":["Identifier le régime : sous-amorti (R<2√(L/C)), critique, sur-amorti","Écrire la solution selon le régime","Calculer le coefficient d''amortissement λ = R/(2L)","Comparer λ à ω₀"],"correct_order":[2,3,0,1],"latex":true}',
'{"text_fr":"Amortissement : λ=R/(2L). Régimes : λ<ω₀ (sous-amorti, oscillant) → q=Ae^{-λt}cos(ωt+φ) avec ω=√(ω₀²-λ²). λ=ω₀ (critique, retour sans oscillation le plus rapide) → q=(A+Bt)e^{-λt}. λ>ω₀ (sur-amorti, deux exponentielles décroissantes)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001383');

-- ============================================================
-- SKILL 031: acid_base (IDs 1384-1395)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001384','33333333-0000-0000-0000-000000000031','mcq',2,'fr',
'{"stem":"Selon Brønsted-Lowry, un acide est une espèce qui :","choices":["Accepte un proton H⁺","Donne un proton H⁺","Produit OH⁻","Accepte un électron"],"correct_index":1,"latex":true}',
'{"text_fr":"Brønsted-Lowry : acide = donneur de H⁺. Base = accepteur de H⁺. Couple acide/base : HA/A⁻ (différence d''un H⁺). Exemples : HCl/Cl⁻, CH₃COOH/CH₃COO⁻, H₃O⁺/H₂O. L''eau est amphotère : peut être acide (↔OH⁻) ou base (↔H₃O⁺)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001384');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001385','33333333-0000-0000-0000-000000000031','mcq',2,'fr',
'{"stem":"pH d''une solution de HCl à 0,01 mol/L (acide fort) :","choices":["2","12","1","7"],"correct_index":0,"latex":true}',
'{"text_fr":"HCl est un acide fort : dissociation totale. [H₃O⁺] = 0,01 = 10⁻² mol/L. pH = -log[H₃O⁺] = -log(10⁻²) = 2. À 25°C : pH < 7 (acide), pH = 7 (neutre), pH > 7 (basique)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001385');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001386','33333333-0000-0000-0000-000000000031','mcq',3,'fr',
'{"stem":"Ka = 1,8×10⁻⁵ pour CH₃COOH. Le pKa est :","choices":["5","4,74","1,8","18"],"correct_index":1,"latex":true}',
'{"text_fr":"pKa = -log Ka = -log(1,8×10⁻⁵) = -(log1,8 + log10⁻⁵) = -(0,255-5) = 4,745 ≈ 4,74. L''acide acétique est un acide faible (pKa≈5 >> 0). Règle : acide fort si Ka >> 1 (pKa << 0)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001386');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001387','33333333-0000-0000-0000-000000000031','mcq',3,'fr',
'{"stem":"À l''équivalence d''un dosage acide fort par base forte, le pH vaut :","choices":["< 7","= 7","> 7","= pKa"],"correct_index":1,"latex":true}',
'{"text_fr":"Acide fort + base forte → sel + eau. Le sel ne réagit pas avec l''eau (Cl⁻ et Na⁺ sont spectateurs). Donc [H₃O⁺] = [OH⁻] = 10⁻⁷ mol/L à 25°C → pH = 7. Attention : acide faible + base forte → pH > 7 à l''équivalence (sel basique)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001387');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001388','33333333-0000-0000-0000-000000000031','mcq',4,'fr',
'{"stem":"La solution tampon maintient le pH stable car :","choices":["Elle neutralise tous les acides","Elle contient un couple acide/base qui absorbe les ajouts de H⁺ ou OH⁻","Elle a une concentration très élevée","Elle est inerte chimiquement"],"correct_index":1,"latex":true}',
'{"text_fr":"Tampon : mélange d''un acide faible HA et de sa base conjuguée A⁻ (ou base faible + son acide conjugué). Ajout H⁺ : A⁻ + H⁺ → HA (absorbe). Ajout OH⁻ : HA + OH⁻ → A⁻ + H₂O (absorbe). pH ≈ pKa + log([A⁻]/[HA]) (Henderson-Hasselbalch). Le sang est tamponné à pH=7,4 (couple HCO₃⁻/CO₂)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001388');

-- Numeric for acid_base
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001389','33333333-0000-0000-0000-000000000031','numeric',2,'fr',
'{"stem":"pH d''une solution de NaOH à 0,001 mol/L (base forte) à 25°C :","correct_value":11,"tolerance":0,"unit":"","latex":true}',
'{"text_fr":"NaOH fort : [OH⁻]=0,001=10⁻³. pOH=-log(10⁻³)=3. pH=14-pOH=14-3=11. Ou : [H₃O⁺]=Ke/[OH⁻]=10⁻¹⁴/10⁻³=10⁻¹¹ → pH=11."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001389');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001390','33333333-0000-0000-0000-000000000031','numeric',3,'fr',
'{"stem":"Volume (mL) de NaOH 0,1 M nécessaire pour neutraliser 25 mL de HCl 0,05 M :","correct_value":12.5,"tolerance":0,"unit":"mL","latex":true}',
'{"text_fr":"Équivalence : n(HCl)=n(NaOH). n(HCl)=0,025×0,05=1,25×10⁻³ mol. V(NaOH)=n/C=1,25×10⁻³/0,1=0,0125 L=12,5 mL."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001390');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001391','33333333-0000-0000-0000-000000000031','numeric',4,'fr',
'{"stem":"pH d''une solution de CH₃COOH 0,1 M (pKa=4,75) :","correct_value":2.88,"tolerance":0.05,"unit":"","latex":true}',
'{"text_fr":"Acide faible : [H₃O⁺]=√(Ka×C)=√(10⁻⁴·⁷⁵×0,1)=√(1,78×10⁻⁵×0,1)=√(1,78×10⁻⁶)=1,33×10⁻³. pH=-log(1,33×10⁻³)≈2,88. Ou : pH=(pKa-log C)/2=(4,75+1)/2=2,875≈2,88. Vérifier taux d''avancement α=1,33% << 1 → approximation valide."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001391');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001392','33333333-0000-0000-0000-000000000031','numeric',4,'fr',
'{"stem":"Concentration (mol/L) d''une solution acide de pH=3,5 (acide fort) :","correct_value":0.000316,"tolerance":0.00005,"unit":"mol/L","latex":true}',
'{"text_fr":"Acide fort : [H₃O⁺]=C=10^{-pH}=10^{-3,5}=3,16×10⁻⁴ mol/L. Rappel : 10^{-3,5}=10^{-4}×10^{0,5}=10^{-4}×√10≈10^{-4}×3,162=3,16×10⁻⁴."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001392');

-- Sequence for acid_base
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001393','33333333-0000-0000-0000-000000000031','ordering',3,'fr',
'{"stem":"Pour réaliser un dosage acido-basique, ordonnez :","items":["Repérer le saut de pH autour de l''équivalence","Remplir la burette avec le titrant de concentration connue","Calculer la concentration inconnue par n₁=n₂ à l''équivalence","Ajouter le titrant progressivement en notant le pH"],"correct_order":[1,3,0,2],"latex":true}',
'{"text_fr":"Dosage (titrage) : 1) Burette avec titrant. 2) pH-mètre ou indicateur coloré. 3) Tracer le graphe pH=f(V). 4) L''équivalence : point d''inflexion (saut de pH). 5) Lire V_E → calculer C inconnue. L''indicateur coloré doit virer dans la zone de saut de pH."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001393');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001394','33333333-0000-0000-0000-000000000031','ordering',4,'fr',
'{"stem":"Pour calculer le pH d''un acide faible HA à concentration C, ordonnez :","items":["Résoudre : [H₃O⁺]=√(Ka×C) (si α<<1)","Écrire le tableau ICE (Initial, Change, Equilibrium)","Calculer pH=-log[H₃O⁺]","Exprimer Ka=[H₃O⁺][A⁻]/[HA] à l''équilibre"],"correct_order":[1,3,0,2],"latex":true}',
'{"text_fr":"Méthode ICE : Initial : [HA]=C, [H₃O⁺]≈0, [A⁻]=0. Change : -x, +x, +x. Équilibre : C-x, x, x. Ka=x²/(C-x)≈x²/C si x<<C. x=[H₃O⁺]=√(Ka×C). Vérifier α=x/C<<1 (valide si C/Ka>100 approximativement)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001394');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001395','33333333-0000-0000-0000-000000000031','ordering',4,'fr',
'{"stem":"Pour identifier l''espèce predominante d''un couple acide/base à un pH donné, ordonnez :","items":["Comparer pH au pKa du couple","Si pH=pKa : [HA]=[A⁻] (50%/50%)","Conclure : si pH<pKa → forme acide HA domine ; si pH>pKa → forme basique A⁻ domine","Écrire l''équilibre HA ⇌ H⁺ + A⁻ et l''expression de Ka"],"correct_order":[3,0,1,2],"latex":true}',
'{"text_fr":"Diagramme de prédominance : pH<pKa → HA prédomine. pH=pKa → [HA]=[A⁻]. pH>pKa → A⁻ prédomine. Formule de Henderson-Hasselbalch : pH=pKa+log([A⁻]/[HA]). Si pH=pKa+1 → [A⁻]/[HA]=10 → 91% A⁻."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001395');

-- ============================================================
-- SKILL 032: redox (IDs 1396-1407)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001396','33333333-0000-0000-0000-000000000032','mcq',2,'fr',
'{"stem":"Dans une réaction d''oxydoréduction, l''oxydant :","choices":["Perd des électrons","Gagne des électrons","Ne change pas de nombre d''oxydation","Donne des protons"],"correct_index":1,"latex":true}',
'{"text_fr":"Oxydant : gagne des électrons (est réduit). Réducteur : perd des électrons (est oxydé). Mnémotechnique : OIL RIG = Oxidation Is Loss, Reduction Is Gain. Couple rédox : Ox/Red (ex: Fe³⁺/Fe²⁺, O₂/H₂O, MnO₄⁻/Mn²⁺)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001396');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001397','33333333-0000-0000-0000-000000000032','mcq',2,'fr',
'{"stem":"Nombre d''oxydation du Cr dans Cr₂O₇²⁻ (dichromate) :","choices":["2","6","3","7"],"correct_index":1,"latex":true}',
'{"text_fr":"Cr₂O₇²⁻ : 2×(n_Cr) + 7×(-2) = -2 → 2n_Cr = -2+14 = 12 → n_Cr = +6. O toujours -2 (sauf peroxydes). Cr(VI) est un oxydant fort (orange). Cr(III) est stable (vert). La réduction de Cr(VI) en Cr(III) est utilisée en dosage volumétrique."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001397');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001398','33333333-0000-0000-0000-000000000032','mcq',3,'fr',
'{"stem":"Pour équilibrer une demi-réaction de réduction en milieu acide, on ajoute :","choices":["OH⁻ pour équilibrer O, puis H₂O pour H","H₂O pour équilibrer O, puis H⁺ pour H, puis e⁻ pour la charge","Seulement des e⁻","H₂ pour les atomes d''hydrogène"],"correct_index":1,"latex":true}',
'{"text_fr":"Méthode en milieu acide : 1) Équilibrer les atomes autres que O et H. 2) H₂O pour équilibrer O. 3) H⁺ pour équilibrer H. 4) e⁻ pour équilibrer la charge. Exemple : MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001398');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001399','33333333-0000-0000-0000-000000000032','mcq',3,'fr',
'{"stem":"La réaction spontanée se produit entre :","choices":["L''oxydant le plus fort du couple de E° le plus élevé et le réducteur le plus fort du couple de E° le plus bas","Deux oxydants","Deux réducteurs","Toujours dans le sens de gauche à droite"],"correct_index":0,"latex":true}',
'{"text_fr":"Règle du gamma (γ) : l''oxydant le plus fort (E° le plus élevé) oxyde le réducteur le plus fort (E° le plus bas). ΔE° = E°_cathode - E°_anode > 0 → réaction spontanée. ΔG° = -nFΔE° < 0 si ΔE° > 0."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001399');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001400','33333333-0000-0000-0000-000000000032','mcq',4,'fr',
'{"stem":"Dans une pile électrochimique Zn/Cu (E°(Zn²⁺/Zn)=-0,76V, E°(Cu²⁺/Cu)=+0,34V), la f.é.m. standard est :","choices":["1,10 V","-1,10 V","0,42 V","0,10 V"],"correct_index":0,"latex":true}',
'{"text_fr":"ΔE° = E°(cathode)-E°(anode) = E°(Cu²⁺/Cu)-E°(Zn²⁺/Zn) = 0,34-(-0,76) = 1,10 V. Cathode : Cu²⁺+2e⁻→Cu (réduction). Anode : Zn→Zn²⁺+2e⁻ (oxydation). Pile de Daniell : 1,10 V est la tension standard de la pile Zn/Cu."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001400');

-- Numeric for redox
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001401','33333333-0000-0000-0000-000000000032','numeric',2,'fr',
'{"stem":"Nombre d''électrons échangés dans : Fe³⁺ + e⁻ → Fe²⁺","correct_value":1,"tolerance":0,"unit":"e⁻","latex":true}',
'{"text_fr":"Fe³⁺ + 1e⁻ → Fe²⁺. Un seul électron échangé. Fe passe de +3 à +2 (réduction). La demi-réaction est déjà équilibrée. Couple Fe³⁺/Fe²⁺ : E°=+0,77 V (oxydant modéré)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001401');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001402','33333333-0000-0000-0000-000000000032','numeric',3,'fr',
'{"stem":"Volume (L) de Cl₂ (à CNTP) produit par électrolyse de HCl si I=2A pendant t=1930 s (F=96500 C/mol) :","correct_value":0.224,"tolerance":0.005,"unit":"L","latex":true}',
'{"text_fr":"Q=I×t=2×1930=3860 C. n(e⁻)=Q/F=3860/96500=0,04 mol. Anode : 2Cl⁻→Cl₂+2e⁻. n(Cl₂)=0,04/2=0,02 mol. V=0,02×22,4=0,448 L... Recalcul: n(Cl₂)=n(e⁻)/2=0,02 mol. V(CNTP)=0,02×22,4=0,448 L. Correction: Q=2×1930=3860, n(e⁻)=0,04, n(Cl₂)=0,02, V=0,448L.","correct_value":0.448}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001402');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001403','33333333-0000-0000-0000-000000000032','numeric',3,'fr',
'{"stem":"Masse (g) de Cu déposée à la cathode lors de l''électrolyse de CuSO₄ avec Q=9650 C (F=96500, M_Cu=64 g/mol) :","correct_value":3.2,"tolerance":0.1,"unit":"g","latex":true}',
'{"text_fr":"Cu²⁺+2e⁻→Cu. n(e⁻)=Q/F=9650/96500=0,1 mol. n(Cu)=0,1/2=0,05 mol. m=0,05×64=3,2 g. Loi de Faraday : m=M×I×t/(n×F) où n=nombre d''e⁻ par ion."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001403');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001404','33333333-0000-0000-0000-000000000032','numeric',4,'fr',
'{"stem":"f.é.m. (V) de la pile Ag/H₂ (E°(Ag⁺/Ag)=+0,80V, E°(H⁺/H₂)=0,00V) :","correct_value":0.8,"tolerance":0,"unit":"V","latex":true}',
'{"text_fr":"ΔE° = E°(cathode)-E°(anode) = 0,80-0,00 = 0,80 V. Cathode : Ag⁺+e⁻→Ag. Anode : H₂→2H⁺+2e⁻. Réaction globale : 2Ag⁺+H₂→2Ag+2H⁺. L''électrode normale à hydrogène (ENH) sert de référence : E°=0,00 V par convention."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001404');

-- Sequence for redox
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001405','33333333-0000-0000-0000-000000000032','ordering',3,'fr',
'{"stem":"Pour équilibrer une équation rédox par la méthode des demi-réactions, ordonnez :","items":["Additionner les demi-réactions en multipliant pour égaliser les e⁻","Équilibrer la demi-réaction d''oxydation (réducteur perd e⁻)","Vérifier : atomes et charges équilibrés","Équilibrer la demi-réaction de réduction (oxydant gagne e⁻)"],"correct_order":[1,3,0,2],"latex":true}',
'{"text_fr":"Méthode : 1) Demi-réaction oxydation : Red → Ox + ne⁻. 2) Demi-réaction réduction : Ox'' + me⁻ → Red''. 3) Multiplier par m et n pour égaliser les e⁻. 4) Additionner. 5) Vérifier. Exemple : 5Fe²⁺ + MnO₄⁻ + 8H⁺ → 5Fe³⁺ + Mn²⁺ + 4H₂O."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001405');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001406','33333333-0000-0000-0000-000000000032','ordering',4,'fr',
'{"stem":"Pour déterminer si une réaction rédox est spontanée, ordonnez :","items":["Conclure : spontanée si ΔE°>0","Identifier les couples rédox en jeu","Calculer ΔE°=E°(cathode)-E°(anode)","Consulter les potentiels standard E° dans la table rédox"],"correct_order":[1,3,2,0],"latex":true}',
'{"text_fr":"Prédiction : 1) Identifier oxydant (couple E° élevé) et réducteur (couple E° bas). 2) Lire E° dans les tables. 3) ΔE°=E°_red - E°_ox. 4) ΔE°>0 → spontanée. ΔG°=-nFΔE° < 0 si spontanée. La constante d''équilibre K=10^{nΔE°/0,059} à 25°C."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001406');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001407','33333333-0000-0000-0000-000000000032','ordering',4,'fr',
'{"stem":"Pour analyser une électrolyse (pile forcée), ordonnez :","items":["Calculer m=M×Q/(n×F) (masse déposée ou produite)","Identifier cathode (-) et anode (+) reliées au générateur","Identifier les réactions : réduction à la cathode, oxydation à l''anode","Calculer Q=I×t (charge électrique totale)"],"correct_order":[1,2,3,0],"latex":true}',
'{"text_fr":"Électrolyse : source externe force les réactions non spontanées. Cathode (pole -) : réduction (dépôt métallique, dégagement H₂). Anode (pole +) : oxydation (dégagement Cl₂, O₂, ou dissolution anodique). Loi de Faraday : m = M×I×t/(n×F). Application : galvanoplastie, production d''aluminium, chlore industriel."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001407');


-- ===== SVT items =====
-- SVT Exercise Items: Full set from scratch
-- 180 items, IDs 1408-1587, Skills 033-044
-- 8 MCQ + 5 numeric + 2 sequence per skill
-- Sources: Campbell Biology 12th ed., Hachette/Nathan Terminale SVT, BAC Maroc 2018-2024

-- ============================================================
-- SKILL 033: cell_energy (IDs 1408-1422)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001408','33333333-0000-0000-0000-000000000033','mcq',2,'fr',
'{"stem":"Quel organite est le principal site de production d''ATP par respiration aérobie ?","choices":["Ribosome","Mitochondrie","Noyau","Réticulum endoplasmique"],"correct_index":1,"latex":false}',
'{"text_fr":"La mitochondrie est le siège de la respiration cellulaire aérobie. La chaîne respiratoire et la phosphorylation oxydative s''y déroulent, produisant environ 30-32 ATP par molécule de glucose. Les ribosomes synthétisent les protéines, le noyau contient l''ADN, et le RE est impliqué dans le transport membranaire."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001408');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001409','33333333-0000-0000-0000-000000000033','mcq',2,'fr',
'{"stem":"La glycolyse se déroule dans :","choices":["La matrice mitochondriale","L''espace intermembranaire","Le cytoplasme","La membrane plasmique"],"correct_index":2,"latex":false}',
'{"text_fr":"La glycolyse est une voie métabolique cytoplasmique (cytosol) qui dégrade le glucose (6C) en deux molécules de pyruvate (3C), produisant un bilan net de 2 ATP et 2 NADH. Elle ne nécessite pas d''oxygène et précède la respiration mitochondriale."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001409');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001410','33333333-0000-0000-0000-000000000033','mcq',3,'fr',
'{"stem":"Au cours du cycle de Krebs, combien de NADH sont produits par tour de cycle ?","choices":["1","2","3","4"],"correct_index":2,"latex":false}',
'{"text_fr":"Le cycle de Krebs produit par tour : 3 NADH, 1 FADH2, 1 GTP (≈ 1 ATP) et libère 2 CO2. Comme le cycle se fait 2 fois par glucose (2 pyruvates), le bilan total est 6 NADH, 2 FADH2, 2 GTP par glucose. C''est ces coenzymes réduits (NADH, FADH2) qui alimentent la chaîne respiratoire."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001410');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001411','33333333-0000-0000-0000-000000000033','mcq',3,'fr',
'{"stem":"Le rôle de l''oxygène dans la respiration aérobie est :","choices":["Substrat de la glycolyse","Accepteur final d''électrons dans la chaîne respiratoire","Source d''énergie directe","Cofacteur du cycle de Krebs"],"correct_index":1,"latex":false}',
'{"text_fr":"L''oxygène est l''accepteur terminal d''électrons dans la chaîne de transport d''électrons (CTE). Il accepte les électrons issus de NADH et FADH2, formant H2O. Sans O2, la CTE s''arrête, le gradient de protons n''est plus maintenu, et la synthèse d''ATP s''interrompt — d''où la mort cellulaire rapide en anaérobiose stricte."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001411');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001412','33333333-0000-0000-0000-000000000033','mcq',3,'fr',
'{"stem":"La phosphorylation oxydative utilise l''énergie de :","choices":["L''hydrolyse du glucose","Le gradient de protons (H+) à travers la membrane interne mitochondriale","La lumière solaire","La dégradation des acides aminés"],"correct_index":1,"latex":false}',
'{"text_fr":"La phosphorylation oxydative (chimiosmose) exploite le gradient électrochimique de H+ créé par les complexes I, III et IV de la CTE. Les protons reflux à travers l''ATP synthase (complexe V) fournissent l''énergie pour synthétiser ATP à partir d''ADP + Pi. C''est le mécanisme de Mitchell (Prix Nobel 1978)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001412');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001413','33333333-0000-0000-0000-000000000033','mcq',4,'fr',
'{"stem":"Un inhibiteur de la NADH déshydrogénase (complexe I) bloquera prioritairement :","choices":["La glycolyse","Le cycle de Krebs","La chaîne de transport d''électrons et la synthèse d''ATP","La fermentation lactique"],"correct_index":2,"latex":false}',
'{"text_fr":"Le complexe I (NADH déshydrogénase) est le premier complexe de la CTE. Son inhibition (ex: roténone) empêche le transfert d''électrons du NADH vers l''ubiquinone, bloquant toute la chaîne. Le gradient de protons s''effondre, l''ATP synthase s''arrête. La glycolyse continue mais son rendement (2 ATP/glucose) est insuffisant pour les besoins cellulaires."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001413');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001414','33333333-0000-0000-0000-000000000033','mcq',4,'fr',
'{"stem":"La décarboxylation oxydative du pyruvate produit, pour chaque pyruvate :","choices":["1 NADH, 1 CO2, 1 Acétyl-CoA","2 NADH, 2 CO2, 1 Acétyl-CoA","1 FADH2, 1 CO2, 1 Acétyl-CoA","1 ATP, 1 CO2, 1 Acétyl-CoA"],"correct_index":0,"latex":false}',
'{"text_fr":"La pyruvate déshydrogénase catalyse : Pyruvate (3C) + CoA + NAD+ → Acétyl-CoA (2C) + CO2 + NADH. Cette réaction a lieu dans la matrice mitochondriale et constitue le lien entre la glycolyse et le cycle de Krebs. Pour 1 glucose : 2 pyruvates → 2 Acétyl-CoA + 2 CO2 + 2 NADH."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001414');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001415','33333333-0000-0000-0000-000000000033','mcq',4,'fr',
'{"stem":"Quelle est la membrane mitochondriale qui présente de nombreux replis (crêtes) ?","choices":["Membrane externe","Membrane interne","Les deux membranes","Aucune des deux"],"correct_index":1,"latex":false}',
'{"text_fr":"La membrane interne de la mitochondrie est fortement plissée en crêtes (cristae), ce qui augmente considérablement sa surface. C''est sur cette membrane que sont ancrés les complexes de la CTE (I, II, III, IV) et l''ATP synthase (complexe V). Cette organisation maximise la production d''ATP par unité de volume mitochondrial."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001415');

-- Numeric items for cell_energy
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001416','33333333-0000-0000-0000-000000000033','numeric',2,'fr',
'{"stem":"La glycolyse produit un bilan net de combien de molécules d''ATP par molécule de glucose ?","correct_value":2,"tolerance":0,"unit":"ATP","latex":false}',
'{"text_fr":"Bilan net de la glycolyse : 4 ATP produits − 2 ATP investis (activation du glucose) = 2 ATP nets. De plus, 2 NADH sont produits. La glycolyse dégrade 1 glucose (6C) en 2 pyruvates (3C) en 10 étapes enzymatiques dans le cytoplasme."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001416');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001417','33333333-0000-0000-0000-000000000033','numeric',3,'fr',
'{"stem":"Combien de CO2 sont libérés lors de l''oxydation complète d''une molécule de glucose par la respiration aérobie ?","correct_value":6,"tolerance":0,"unit":"CO2","latex":false}',
'{"text_fr":"L''oxydation complète du glucose (C6H12O6) libère 6 CO2 : 2 CO2 lors de la décarboxylation des 2 pyruvates, et 4 CO2 (2×2) lors des 2 tours du cycle de Krebs. Equation globale : C6H12O6 + 6O2 → 6CO2 + 6H2O + énergie (~30-32 ATP)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001417');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001418','33333333-0000-0000-0000-000000000033','numeric',3,'fr',
'{"stem":"Combien de tours du cycle de Krebs sont nécessaires pour oxyder complètement 1 molécule de glucose ?","correct_value":2,"tolerance":0,"unit":"tours","latex":false}',
'{"text_fr":"1 glucose → 2 pyruvates → 2 Acétyl-CoA. Chaque Acétyl-CoA entre dans 1 tour du cycle de Krebs. Donc 2 tours sont nécessaires pour 1 glucose. Chaque tour produit : 3 NADH + 1 FADH2 + 1 GTP + 2 CO2. Bilan total (2 tours) : 6 NADH + 2 FADH2 + 2 GTP + 4 CO2."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001418');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001419','33333333-0000-0000-0000-000000000033','numeric',4,'fr',
'{"stem":"La respiration aérobie complète d''1 glucose produit environ combien d''ATP (valeur moderne) ?","correct_value":30,"tolerance":2,"unit":"ATP","latex":false}',
'{"text_fr":"Bilan ATP moderne (valeurs révisées) : Glycolyse : 2 ATP + 2 NADH cytoplasmiques (≈ 3 ATP via navette malate-aspartate). Décarboxylation : 2 NADH (≈ 5 ATP). Krebs : 6 NADH (≈ 15 ATP) + 2 FADH2 (≈ 3 ATP) + 2 GTP. Total ≈ 30-32 ATP. L''ancienne valeur de 36-38 ATP était surestimée. Réponse acceptée : 28-32."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001419');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001420','33333333-0000-0000-0000-000000000033','numeric',4,'fr',
'{"stem":"Combien de molécules de NADH sont produites au total lors de l''oxydation complète d''1 glucose (glycolyse + décarboxylation + Krebs) ?","correct_value":10,"tolerance":0,"unit":"NADH","latex":false}',
'{"text_fr":"Bilan NADH : Glycolyse : 2 NADH. Décarboxylation oxydative des 2 pyruvates : 2 NADH. Cycle de Krebs (2 tours) : 6 NADH. Total : 2 + 2 + 6 = 10 NADH. Plus 2 FADH2 (du Krebs). Ces 10 NADH entrent dans la CTE et alimentent la production d''ATP par phosphorylation oxydative."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001420');

-- Sequence items for cell_energy
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001421','33333333-0000-0000-0000-000000000033','ordering',3,'fr',
'{"stem":"Remettez dans l''ordre les étapes de la respiration aérobie, de la plus précoce à la plus tardive :","items":["Phosphorylation oxydative (ATP synthase)","Cycle de Krebs","Décarboxylation oxydative du pyruvate","Glycolyse"],"correct_order":[3,2,1,0],"latex":false}',
'{"text_fr":"Ordre correct : 1) Glycolyse (cytoplasme) : glucose → 2 pyruvates + 2 ATP + 2 NADH. 2) Décarboxylation oxydative (matrice mit.) : pyruvate → Acétyl-CoA + CO2 + NADH. 3) Cycle de Krebs (matrice mit.) : Acétyl-CoA → CO2 + NADH + FADH2 + GTP. 4) Phosphorylation oxydative (membrane interne) : NADH/FADH2 → gradient H+ → ATP."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001421');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001422','33333333-0000-0000-0000-000000000033','ordering',4,'fr',
'{"stem":"Ordonnez les événements de la phosphorylation oxydative :","items":["Synthèse d''ATP par l''ATP synthase","Transfert d''électrons le long des complexes I→III→IV","Réduction de l''O2 en H2O","Pompage de H+ vers l''espace intermembranaire"],"correct_order":[1,3,2,0],"latex":false}',
'{"text_fr":"1) Électrons transférés de NADH/FADH2 aux complexes I→III→IV. 2) Ce transfert pompe H+ vers l''espace intermembranaire (complexes I, III, IV). 3) O2 accepte les électrons en fin de chaîne → H2O (complexe IV). 4) H+ reflux à travers l''ATP synthase → énergie pour synthétiser ATP. Ce mécanisme s''appelle la chimiosmose (Mitchell, 1961)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001422');

-- ============================================================
-- SKILL 034: fermentation (IDs 1423-1437)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001423','33333333-0000-0000-0000-000000000034','mcq',2,'fr',
'{"stem":"La fermentation lactique produit comme déchet :","choices":["Éthanol + CO2","Acide lactique","Acétate + H2","Acide acétique"],"correct_index":1,"latex":false}',
'{"text_fr":"La fermentation lactique : pyruvate + NADH → lactate + NAD+. Le lactate (acide lactique) est le seul produit. Cette réaction régénère le NAD+ indispensable à la glycolyse. Elle se produit dans les muscles lors d''un effort intense (manque d''O2) et chez les bactéries lactiques (yaourt, fromage)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001423');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001424','33333333-0000-0000-0000-000000000034','mcq',2,'fr',
'{"stem":"La fermentation alcoolique est catalysée par :","choices":["Les cellules musculaires animales","Les levures (Saccharomyces cerevisiae)","Les mitochondries","Les chloroplastes"],"correct_index":1,"latex":false}',
'{"text_fr":"La fermentation alcoolique est réalisée par les levures (champignons unicellulaires). Elles convertissent le pyruvate en éthanol + CO2 via 2 étapes : décarboxylation (pyruvate → acétaldéhyde + CO2) puis réduction (acétaldéhyde + NADH → éthanol + NAD+). Applications : brasserie, vinification, panification."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001424');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001425','33333333-0000-0000-0000-000000000034','mcq',2,'fr',
'{"stem":"Quel est le bilan en ATP de la fermentation par molécule de glucose ?","choices":["0 ATP","2 ATP","4 ATP","38 ATP"],"correct_index":1,"latex":false}',
'{"text_fr":"La fermentation ne produit que 2 ATP (issus de la glycolyse uniquement). Sans oxygène, il n''y a pas de cycle de Krebs ni de phosphorylation oxydative. C''est 15 fois moins efficace que la respiration aérobie (~30 ATP). La fermentation est donc un métabolisme d''urgence quand l''O2 manque."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001425');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001426','33333333-0000-0000-0000-000000000034','mcq',3,'fr',
'{"stem":"Pourquoi la régénération du NAD+ est-elle indispensable à la fermentation ?","choices":["Pour activer la glycolyse","Pour permettre la glycolyse de continuer en régénérant le NAD+ consommé","Pour synthétiser du glucose","Pour produire de l''ATP directement"],"correct_index":1,"latex":false}',
'{"text_fr":"La glycolyse consomme du NAD+ (converti en NADH). Si le NAD+ n''est pas régénéré, la glycolyse s''arrête faute de cofacteur. La fermentation (lactique ou alcoolique) sert précisément à réoxyder NADH en NAD+, sans nécessiter d''O2. C''est sa fonction biologique principale, pas la production d''éthanol ou de lactate en soi."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001426');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001427','33333333-0000-0000-0000-000000000034','mcq',3,'fr',
'{"stem":"Lors de la fermentation alcoolique, quelle enzyme catalyse la décarboxylation du pyruvate ?","choices":["Lactate déshydrogénase","Pyruvate kinase","Pyruvate décarboxylase","Alcool déshydrogénase"],"correct_index":2,"latex":false}',
'{"text_fr":"Étape 1 : Pyruvate décarboxylase catalyse pyruvate → acétaldéhyde + CO2 (coenzyme : TPP). Étape 2 : Alcool déshydrogénase catalyse acétaldéhyde + NADH → éthanol + NAD+. La pyruvate kinase, elle, catalyse la dernière étape de la glycolyse (phosphoénolpyruvate → pyruvate + ATP)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001427');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001428','33333333-0000-0000-0000-000000000034','mcq',3,'fr',
'{"stem":"La fermentation se distingue de la respiration anaérobie stricto sensu par :","choices":["L''absence de glycolyse","L''utilisation d''un accepteur d''électrons inorganique autre que O2","L''utilisation d''un accepteur d''électrons organique (le pyruvate lui-même ou un dérivé)","La production de plus d''ATP"],"correct_index":2,"latex":false}',
'{"text_fr":"Dans la fermentation, c''est un composé organique (acétaldéhyde, pyruvate) qui joue le rôle d''accepteur final d''électrons. Dans la respiration anaérobie (ex: bactéries utilisant NO3-, SO42-), c''est un accepteur inorganique. La fermentation est plus primitive évolutivement et produit moins d''ATP."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001428');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001429','33333333-0000-0000-0000-000000000034','mcq',4,'fr',
'{"stem":"L''effet Pasteur désigne :","choices":["L''inhibition de la fermentation par la présence d''O2","L''accélération de la fermentation par la chaleur","La production de lactate en présence d''O2","La synthèse d''ATP sans ADP"],"correct_index":0,"latex":false}',
'{"text_fr":"L''effet Pasteur : en présence d''O2, la respiration aérobie prend le dessus et inhibe la fermentation. Mécanisme : O2 active la pyruvate déshydrogénase et le cycle de Krebs ; le NADH est réoxydé efficacement par la CTE, éliminant le besoin de fermentation. Exception notable : les cellules cancéreuses fermentent même en présence d''O2 (effet Warburg)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001429');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001430','33333333-0000-0000-0000-000000000034','mcq',4,'fr',
'{"stem":"Les bactéries lactiques (ex. Lactobacillus) sont :","choices":["Aérobies obligatoires","Anaérobies facultatifs","Anaérobies aérotolérants (fermentent toujours, même en présence d''O2)","Aérobies exclusifs"],"correct_index":2,"latex":false}',
'{"text_fr":"Les bactéries lactiques sont anaérobies aérotolérants : elles ne possèdent pas de chaîne respiratoire fonctionnelle et ne peuvent pas utiliser l''O2 pour la respiration, mais elles peuvent tolérer sa présence (elles possèdent des enzymes antioxydantes comme la superoxyde dismutase). Elles fermentent toujours, même en présence d''O2."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001430');

-- Numeric items for fermentation
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001431','33333333-0000-0000-0000-000000000034','numeric',2,'fr',
'{"stem":"Combien de molécules d''éthanol sont produites par la fermentation alcoolique d''1 molécule de glucose ?","correct_value":2,"tolerance":0,"unit":"éthanol","latex":false}',
'{"text_fr":"1 glucose → 2 pyruvates (glycolyse) → 2 acétaldéhydes + 2 CO2 → 2 éthanol + 2 NAD+. Le bilan stoechiométrique : C6H12O6 → 2 C2H5OH + 2 CO2 + 2 ATP. Chaque pyruvate (3C) donne 1 éthanol (2C) + 1 CO2 (1C)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001431');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001432','33333333-0000-0000-0000-000000000034','numeric',2,'fr',
'{"stem":"Combien de molécules de CO2 sont libérées lors de la fermentation alcoolique d''1 glucose ?","correct_value":2,"tolerance":0,"unit":"CO2","latex":false}',
'{"text_fr":"1 glucose → 2 pyruvates → 2 CO2 + 2 acétaldéhydes → 2 éthanol. Seule la décarboxylation du pyruvate libère du CO2 en fermentation alcoolique. C''est ce CO2 qui fait lever le pain (panification) et crée les bulles dans la bière et le vin effervescent."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001432');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001433','33333333-0000-0000-0000-000000000034','numeric',3,'fr',
'{"stem":"Si une culture de levures consomme 90 g de glucose par fermentation alcoolique, quelle masse d''éthanol (en g) est produite théoriquement ? (M glucose = 180 g/mol, M éthanol = 46 g/mol)","correct_value":46,"tolerance":1,"unit":"g","latex":true}',
'{"text_fr":"90 g glucose ÷ 180 g/mol = 0,5 mol glucose. Équation : 1 glucose → 2 éthanol. 0,5 mol glucose → 1 mol éthanol. Masse éthanol = 1 mol × 46 g/mol = 46 g. Rendement théorique : 46/90 × 100 ≈ 51%. En pratique, le rendement est légèrement inférieur car une partie du glucose sert à la croissance cellulaire."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001433');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001434','33333333-0000-0000-0000-000000000034','numeric',3,'fr',
'{"stem":"La fermentation produit combien de fois moins d''ATP par glucose que la respiration aérobie (30 ATP) ?","correct_value":15,"tolerance":0,"unit":"fois","latex":false}',
'{"text_fr":"Fermentation : 2 ATP/glucose. Respiration aérobie : ~30 ATP/glucose. Rapport : 30 ÷ 2 = 15. La fermentation est donc 15 fois moins efficace énergétiquement. C''est pourquoi les organismes qui fermentent doivent consommer beaucoup plus de glucose pour couvrir leurs besoins énergétiques — c''est la loi de Gay-Lussac et Pasteur."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001434');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001435','33333333-0000-0000-0000-000000000034','numeric',4,'fr',
'{"stem":"Combien de molécules de NADH sont réoxydées en NAD+ lors de la fermentation lactique d''1 glucose ?","correct_value":2,"tolerance":0,"unit":"NADH","latex":false}',
'{"text_fr":"La glycolyse produit 2 NADH par glucose. La fermentation lactique réoxyde exactement ces 2 NADH : 2 pyruvates + 2 NADH → 2 lactates + 2 NAD+. Il y a une balance parfaite : les NADH produits par la glycolyse sont tous régénérés en NAD+ par la fermentation, permettant à la glycolyse de tourner indéfiniment sans O2."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001435');

-- Sequence items for fermentation
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001436','33333333-0000-0000-0000-000000000034','ordering',3,'fr',
'{"stem":"Ordonnez les étapes de la fermentation alcoolique :","items":["Réduction de l''acétaldéhyde en éthanol (régénère NAD+)","Glycolyse : glucose → pyruvate + 2 ATP + 2 NADH","Décarboxylation : pyruvate → acétaldéhyde + CO2","Transport de l''éthanol hors de la cellule"],"correct_order":[1,2,0,3],"latex":false}',
'{"text_fr":"1) Glycolyse dans le cytoplasme. 2) Pyruvate décarboxylase : pyruvate → acétaldéhyde + CO2. 3) Alcool déshydrogénase : acétaldéhyde + NADH → éthanol + NAD+. 4) L''éthanol, toxique à forte concentration, diffuse hors de la cellule. Cette diffusion est passive (non protéique) car l''éthanol est lipophile et traverse librement les membranes."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001436');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001437','33333333-0000-0000-0000-000000000034','ordering',4,'fr',
'{"stem":"Ordonnez la chaîne d''événements lors du passage de la respiration aérobie à la fermentation (manque soudain d''O2) :","items":["La fermentation régénère NAD+, la glycolyse reprend","La CTE s''arrête, NADH s''accumule","La glycolyse ralentit faute de NAD+","L''O2 devient absent"],"correct_order":[3,1,2,0],"latex":false}',
'{"text_fr":"1) O2 absent → plus d''accepteur final d''électrons. 2) CTE bloquée → NADH ne peut plus être réoxydé → [NADH] augmente, [NAD+] chute. 3) La glycolyse nécessite NAD+ → elle ralentit/s''arrête. 4) La fermentation prend le relais : réoxyde NADH en NAD+, permettant à la glycolyse de continuer (avec faible rendement ATP). Transition complète en quelques secondes dans les muscles."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001437');

-- ============================================================
-- SKILL 035: dna_structure (IDs 1438-1452)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001438','33333333-0000-0000-0000-000000000035','mcq',2,'fr',
'{"stem":"Les bases azotées complémentaires dans l''ADN sont :","choices":["A-G et C-T","A-T et G-C","A-U et G-C","A-C et G-T"],"correct_index":1,"latex":false}',
'{"text_fr":"Dans l''ADN double brin : Adénine (A) s''apparie avec Thymine (T) via 2 liaisons hydrogène ; Guanine (G) s''apparie avec Cytosine (C) via 3 liaisons hydrogène. Cette complémentarité (règles de Chargaff) garantit la fidélité de la réplication et la conservation de l''information génétique. Dans l''ARN, T est remplacée par Uracile (U)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001438');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001439','33333333-0000-0000-0000-000000000035','mcq',2,'fr',
'{"stem":"Le sucre présent dans les nucléotides de l''ADN est :","choices":["Ribose","Désoxyribose","Glucose","Fructose"],"correct_index":1,"latex":false}',
'{"text_fr":"L''ADN (acide désoxyribonucléique) contient le désoxyribose (ribose sans le groupement -OH en position 2''). L''ARN contient le ribose. Cette différence rend l''ADN plus stable chimiquement (le groupement -OH en 2'' de l''ARN le rend susceptible à l''hydrolyse alcaline). C''est pourquoi l''ADN est le support de l''information héréditaire à long terme."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001439');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001440','33333333-0000-0000-0000-000000000035','mcq',2,'fr',
'{"stem":"Les deux brins de l''ADN sont :","choices":["Parallèles et identiques","Anti-parallèles et complémentaires","Parallèles et complémentaires","Anti-parallèles et identiques"],"correct_index":1,"latex":false}',
'{"text_fr":"Les deux brins de l''ADN sont antiparallèles : l''un va de 5'' vers 3'', l''autre de 3'' vers 5''. Ils sont complémentaires (A en face de T, G en face de C) mais pas identiques. Cette antiparallélie est fondamentale pour la réplication (la DNA polymérase ne synthétise que dans le sens 5''→3'') et la transcription."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001440');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001441','33333333-0000-0000-0000-000000000035','mcq',3,'fr',
'{"stem":"Si le taux de guanine dans un ADN bicaténaire est de 20%, quel est le pourcentage d''adénine ?","choices":["20%","30%","40%","10%"],"correct_index":1,"latex":false}',
'{"text_fr":"Règles de Chargaff : %G = %C = 20%. Donc %A = %T = (100% − 20% − 20%) / 2 = 60% / 2 = 30%. Mémoriser : dans un ADN double brin, %A = %T et %G = %C (Chargaff, 1950). Ces règles ont été cruciales pour déduire la structure en double hélice par Watson et Crick (1953)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001441');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001442','33333333-0000-0000-0000-000000000035','mcq',3,'fr',
'{"stem":"La nucléosome est composée de :","choices":["ADN enroulé autour de 4 histones","ADN enroulé autour d''un octamère d''histones (8 histones)","ARN enroulé autour de protéines","ADN et ARN associés à des lipides"],"correct_index":1,"latex":false}',
'{"text_fr":"Le nucléosome = 147 pb d''ADN enroulés (~1,75 tours) autour d''un octamère d''histones (2×H2A + 2×H2B + 2×H3 + 2×H4), relié par l''ADN de liaison (~20-80 pb) avec l''histone H1. C''est le premier niveau de compaction. La fibre de chromatine (30 nm) puis les boucles (300 nm) et enfin le chromosome métaphasique (1400 nm) constituent les niveaux supérieurs."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001442');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001443','33333333-0000-0000-0000-000000000035','mcq',3,'fr',
'{"stem":"La réplication de l''ADN est dite semi-conservative car :","choices":["Chaque brin sert de matrice pour un nouveau brin complémentaire","Les deux brins parentaux sont conservés ensemble","L''ADN se réplique en fragments aléatoires","Seule la moitié de l''ADN est répliquée"],"correct_index":0,"latex":false}',
'{"text_fr":"Semi-conservative : chaque molécule fille conserve 1 brin parental + 1 brin nouvellement synthétisé. Prouvé par l''expérience de Meselson et Stahl (1958) avec les isotopes 15N/14N. La DNA polymérase III utilise chaque brin comme matrice, synthétisant toujours dans le sens 5''→3'', d''où le brin continu (leading) et le brin discontinu (lagging, fragments d''Okazaki)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001443');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001444','33333333-0000-0000-0000-000000000035','mcq',4,'fr',
'{"stem":"Quel enzyme est responsable de la synthèse des amorces (primers) lors de la réplication ?","choices":["DNA polymérase III","Hélicase","Primase","Ligase"],"correct_index":2,"latex":false}',
'{"text_fr":"La primase est une ARN polymérase qui synthétise de courtes amorces d''ARN (8-12 nucléotides) nécessaires car la DNA polymérase III ne peut pas initier une nouvelle chaîne — elle ne peut qu''allonger. Les amorces sont ensuite remplacées par de l''ADN (DNA polymérase I) et les fragments d''Okazaki sont reliés par la ligase."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001444');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001445','33333333-0000-0000-0000-000000000035','mcq',4,'fr',
'{"stem":"La télomérase est une enzyme qui :","choices":["Répare les cassures double brin","Ajoute des séquences répétées aux extrémités des chromosomes (télomères)","Déroule l''ADN au niveau de la fourche de réplication","Méthyle l''ADN pour réguler l''expression génique"],"correct_index":1,"latex":false}',
'{"text_fr":"La télomérase allonge les télomères (séquences TTAGGG répétées) en utilisant son propre ARN comme matrice (elle est une transcriptase inverse). Elle compense le raccourcissement télomérique à chaque division. Active dans les cellules souches et cancéreuses, inactive dans la plupart des cellules somatiques différenciées (→ vieillissement cellulaire, théorie de Hayflick)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001445');

-- Numeric items for dna_structure
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001446','33333333-0000-0000-0000-000000000035','numeric',2,'fr',
'{"stem":"Un brin d''ADN contient 30% d''adénine. Dans le double brin complet, quel est le pourcentage de thymine ?","correct_value":30,"tolerance":0,"unit":"%","latex":false}',
'{"text_fr":"Règle de Chargaff : dans un ADN double brin, %A = %T et %G = %C. Si %A (dans le brin) = 30%, alors sur l''ensemble du double brin, %A total = %T total = 30%. Attention à l''erreur classique : certains calculent 100% - 30% = 70% pensant que T est sur le brin complémentaire. Non — la règle s''applique à l''ensemble de la molécule bicaténaire."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001446');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001447','33333333-0000-0000-0000-000000000035','numeric',3,'fr',
'{"stem":"Un fragment d''ADN double brin contient 200 paires de bases. Combien de liaisons hydrogène y a-t-il si 60 paires sont A-T et 140 paires sont G-C ?","correct_value":540,"tolerance":0,"unit":"liaisons H","latex":true}',
'{"text_fr":"A-T : 2 liaisons hydrogène par paire. G-C : 3 liaisons hydrogène par paire. Total = (60 × 2) + (140 × 3) = 120 + 420 = 540 liaisons hydrogène. Plus le taux de G-C est élevé, plus l''ADN est stable thermiquement (Tm plus haute). C''est pourquoi l''ADN des organismes thermophiles est riche en G-C."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001447');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001448','33333333-0000-0000-0000-000000000035','numeric',3,'fr',
'{"stem":"Un ADN double brin de 1000 pb se réplique. Combien de nouveaux nucléotides sont nécessaires pour compléter les deux brins filles ?","correct_value":2000,"tolerance":0,"unit":"nucléotides","latex":false}',
'{"text_fr":"Réplication semi-conservative : chaque brin parental sert de matrice → 2 brins filles sont synthétisés. Chaque brin fille = 1000 nucléotides. Total nouveaux nucléotides = 2 × 1000 = 2000. Les 2000 nucléotides parentaux sont conservés (semi-conservatif). Au total, les 2 molécules filles contiennent 4000 nucléotides : 2000 parentaux + 2000 nouveaux."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001448');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001449','33333333-0000-0000-0000-000000000035','numeric',4,'fr',
'{"stem":"Un ADN contient 20% de guanine. Quel est le pourcentage de pyrimidines dans cet ADN ?","correct_value":50,"tolerance":0,"unit":"%","latex":false}',
'{"text_fr":"Pyrimidines = C + T. Purines = A + G. %G = %C = 20%. %A = %T = (100 - 20 - 20)/2 = 30%. %Pyrimidines = %C + %T = 20% + 30% = 50%. Règle générale : dans tout ADN double brin, %purines = %pyrimidines = 50% (car A apparie avec T, G avec C → 1 purine pour 1 pyrimidine). Ceci est vrai quelle que soit la composition en bases."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001449');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001450','33333333-0000-0000-0000-000000000035','numeric',4,'fr',
'{"stem":"Après 3 cycles de réplication à partir d''1 molécule d''ADN double brin, combien de molécules filles contiennent au moins 1 brin parental ?","correct_value":2,"tolerance":0,"unit":"molécules","latex":false}',
'{"text_fr":"Réplication semi-conservative : après n cycles, on obtient 2^n molécules. Après 3 cycles : 8 molécules. Seules 2 molécules contiennent un brin parental (1 brin parental par molécule au maximum). Après 3 cycles : 2 molécules sur 8 ont un brin parental, les 6 autres sont entièrement nouvelles. Preuve expérimentale : expérience de Meselson-Stahl (1958)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001450');

-- Sequence items for dna_structure
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001451','33333333-0000-0000-0000-000000000035','ordering',3,'fr',
'{"stem":"Ordonnez les étapes de la réplication de l''ADN au niveau de la fourche de réplication :","items":["La ligase soude les fragments d''Okazaki","L''hélicase déroule le double brin","La DNA polymérase III allonge à partir des amorces","La primase synthétise les amorces ARN"],"correct_order":[1,3,2,0],"latex":false}',
'{"text_fr":"1) L''hélicase brise les liaisons H entre les bases et ouvre la double hélice. 2) La primase (ARN polymérase) synthétise une courte amorce ARN sur chaque brin. 3) La DNA pol III utilise l''amorce et allonge le brin en 5''→3'' (brin continu et fragments d''Okazaki sur le brin retardé). 4) La DNA pol I remplace les amorces par de l''ADN, puis la ligase scelle les coupures."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001451');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001452','33333333-0000-0000-0000-000000000035','ordering',4,'fr',
'{"stem":"Ordonnez les niveaux de compaction de l''ADN, du moins au plus compact :","items":["Chromosome métaphasique (1400 nm)","ADN nu double hélice (2 nm)","Fibre de chromatine (30 nm)","Nucléosome (11 nm, ''collier de perles'')"],"correct_order":[1,3,2,0],"latex":false}',
'{"text_fr":"1) ADN double hélice : 2 nm de diamètre. 2) Nucléosome (''collier de perles'') : 11 nm — ADN enroulé autour des histones. 3) Fibre de 30 nm : nucléosomes empilés en solénoïde. 4) Boucles de 300 nm sur une échafaudage protéique. 5) Chromosome métaphasique : 1400 nm — compaction maximale lors de la mitose. Facteur de compaction global : ~10 000 fois."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001452');

-- ============================================================
-- SKILL 036: gene_expression (IDs 1453-1467)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001453','33333333-0000-0000-0000-000000000036','mcq',2,'fr',
'{"stem":"La transcription produit :","choices":["De l''ADN double brin","De l''ARN messager (ARNm)","Des protéines","De l''ADN complémentaire"],"correct_index":1,"latex":false}',
'{"text_fr":"La transcription (ADN → ARN) produit de l''ARNm (chez les eucaryotes, un pré-ARNm qui sera modifié). L''ARN polymérase II transcrit les gènes codant des protéines en utilisant un brin d''ADN comme matrice (brin antisens, lu 3''→5''). L''ARNm synthétisé est complémentaire et antiparallèle au brin matrice, identique au brin codant (avec U à la place de T)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001453');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001454','33333333-0000-0000-0000-000000000036','mcq',2,'fr',
'{"stem":"Un codon est composé de :","choices":["1 nucléotide","2 nucléotides","3 nucléotides","4 nucléotides"],"correct_index":2,"latex":false}',
'{"text_fr":"Le code génétique est un code à triplets : chaque codon = 3 nucléotides d''ARNm. Avec 4 bases possibles et des codons de 3 nucléotides : 4³ = 64 codons possibles pour seulement 20 acides aminés → le code est redondant (dégénéré). Exemple : UUU et UUC codent tous deux la phénylalanine. 3 codons sont des codons stop (UAA, UAG, UGA)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001454');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001455','33333333-0000-0000-0000-000000000036','mcq',2,'fr',
'{"stem":"Quel est le codon initiateur de la traduction ?","choices":["UAA","UAG","AUG","UGA"],"correct_index":2,"latex":false}',
'{"text_fr":"AUG est le codon initiateur universel : il code la méthionine (Met) et signale le début de la traduction. Il définit le cadre de lecture. UAA, UAG et UGA sont les 3 codons stop (non-sens) qui ne codent aucun acide aminé et signalent la fin de la traduction. Ces 4 codons sont cruciaux pour définir la protéine synthétisée."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001455');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001456','33333333-0000-0000-0000-000000000036','mcq',3,'fr',
'{"stem":"L''épissage (splicing) consiste en :","choices":["La traduction des exons en protéines","L''élimination des introns et la jonction des exons dans le pré-ARNm","La méthylation des histones","La dégradation des ARNm","La modification du codon stop"],"correct_index":1,"latex":false}',
'{"text_fr":"L''épissage = excision des introns (séquences non codantes) et jonction des exons (séquences codantes) dans le pré-ARNm pour former l''ARNm mature. Réalisé par le spliceosome (complexe ribonucléoprotéique). L''épissage alternatif permet à 1 gène de produire plusieurs protéines différentes (~90% des gènes humains subissent un épissage alternatif)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001456');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001457','33333333-0000-0000-0000-000000000036','mcq',3,'fr',
'{"stem":"Le rôle de l''ARNt est de :","choices":["Porter l''information génétique du noyau au ribosome","Transporter les acides aminés vers le ribosome et reconnaître les codons de l''ARNm","Catalyser la formation des liaisons peptidiques","Dérouler l''ADN pour la transcription"],"correct_index":1,"latex":false}',
'{"text_fr":"L''ARNt est l''adaptateur entre le code génétique (codons) et les acides aminés (protéines). Il possède : 1) un anticodon (3 nucléotides complémentaires du codon ARNm) et 2) un site d''attachement de l''acide aminé en 3''. L''aminoacyl-ARNt synthétase charge spécifiquement l''ARNt avec son acide aminé cognate — c''est la seconde code génétique."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001457');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001458','33333333-0000-0000-0000-000000000036','mcq',3,'fr',
'{"stem":"Lors de la traduction, la formation de la liaison peptidique est catalysée par :","choices":["L''ARNm","L''ARNr (l''ARN ribosomal, composante du ribosome)","L''ARNt","Les facteurs d''initiation"],"correct_index":1,"latex":false}',
'{"text_fr":"Le ribosome est un ribozyme : c''est l''ARN ribosomal (ARNr 23S/28S dans le site peptidyl-transférase) qui catalyse la formation des liaisons peptidiques, pas une protéine enzymatique. Le ribosome possède 3 sites : A (aminoacyl — accueille le nouvel ARNt), P (peptidyl — porte le peptide en cours) et E (exit — libère l''ARNt déchargé)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001458');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001459','33333333-0000-0000-0000-000000000036','mcq',4,'fr',
'{"stem":"Un ARNm de 900 nucléotides (hors UTR et codon stop) code une protéine de combien d''acides aminés ?","choices":["900","300","450","1800"],"correct_index":1,"latex":false}',
'{"text_fr":"1 codon = 3 nucléotides → 900 nucléotides ÷ 3 = 300 codons → 300 acides aminés. Attention : le codon initiateur AUG code Met (comptée), et le codon stop termine la protéine mais ne code pas d''acide aminé (non compté). Ici l''énoncé précise ''hors codon stop'', donc 300 aa. En BAC, vérifier si le codon stop est inclus ou exclu dans le décompte des nucléotides."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001459');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001460','33333333-0000-0000-0000-000000000036','mcq',4,'fr',
'{"stem":"Le processus par lequel des protéines régulatrices contrôlent la transcription en se liant à l''ADN est appelé :","choices":["Traduction","Régulation transcriptionnelle (par des facteurs de transcription)","Épissage","Modification post-traductionnelle"],"correct_index":1,"latex":false}',
'{"text_fr":"Les facteurs de transcription (FT) sont des protéines qui se lient à des séquences spécifiques d''ADN (promoteurs, enhancers, silencers) et activent ou répriment la transcription par l''ARN polymérase II. Ils permettent une expression génique différentielle : même génome, mais profils d''expression différents selon le tissu et le stade de développement."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001460');

-- Numeric items for gene_expression
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001461','33333333-0000-0000-0000-000000000036','numeric',2,'fr',
'{"stem":"Combien de codons différents sont possibles avec un code à triplets et 4 bases ?","correct_value":64,"tolerance":0,"unit":"codons","latex":true}',
'{"text_fr":"4 bases (A, U, G, C) × 4 × 4 = 4³ = 64 combinaisons possibles. Ces 64 codons codent : 20 acides aminés standard (redondance du code) + 3 codons stop (UAA, UAG, UGA) + 1 codon initiateur AUG (qui code aussi Met). La redondance du code génétique protège contre certaines mutations silencieuses."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001461');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001462','33333333-0000-0000-0000-000000000036','numeric',3,'fr',
'{"stem":"Un gène contient 450 paires de bases codantes (sans introns, sans codon stop). La protéine produite contient combien d''acides aminés ?","correct_value":150,"tolerance":0,"unit":"acides aminés","latex":false}',
'{"text_fr":"450 pb d''ADN codant → 450 nucléotides d''ARNm → 450 ÷ 3 = 150 codons → 150 acides aminés. Rappel : 1 pb d''ADN donne 1 nucléotide d''ARNm (transcription). Le codon stop est hors décompte ici (l''énoncé le précise). Attention classique BAC : ne pas diviser par 6 (ce serait pour une chaîne double brin d''ADN)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001462');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001463','33333333-0000-0000-0000-000000000036','numeric',3,'fr',
'{"stem":"Combien de liaisons peptidiques contient une protéine de 100 acides aminés ?","correct_value":99,"tolerance":0,"unit":"liaisons peptidiques","latex":false}',
'{"text_fr":"Une liaison peptidique relie 2 acides aminés consécutifs. Pour n acides aminés : n-1 liaisons peptidiques. 100 acides aminés → 99 liaisons peptidiques. Méthode : penser à une chaîne de maillons — n maillons ont n-1 jonctions. La première liaison est formée entre Met (aa1) et aa2, la dernière entre aa99 et aa100."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001463');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001464','33333333-0000-0000-0000-000000000036','numeric',4,'fr',
'{"stem":"Un ARNm comporte 1 codon initiateur + 299 codons codants + 1 codon stop. Quelle est la longueur minimale de la séquence codante en pb sur l''ADN ?","correct_value":903,"tolerance":0,"unit":"pb","latex":false}',
'{"text_fr":"Séquence codante = codon initiateur (AUG) + 299 codons + codon stop = 1 + 299 + 1 = 301 codons = 301 × 3 = 903 nucléotides d''ARNm → 903 pb d''ADN (séquence codante minimale, sans introns). La protéine produite = 300 acides aminés (codon initiateur Met + 299 codons = 300 aa ; le codon stop ne code pas d''aa)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001464');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001465','33333333-0000-0000-0000-000000000036','numeric',4,'fr',
'{"stem":"Si un gène eucaryote a 3 exons (100, 150, 200 pb) et 2 introns (300, 500 pb), quelle est la longueur du pré-ARNm transcrit (en nucléotides) ?","correct_value":1250,"tolerance":0,"unit":"nt","latex":false}',
'{"text_fr":"Le pré-ARNm est transcrit à partir de la totalité du gène (exons + introns). Longueur = (100 + 150 + 200) + (300 + 500) = 450 + 800 = 1250 nucléotides. Après épissage, l''ARNm mature ne contient que les exons : 450 nucléotides. L''intron représente ici 800/1250 = 64% du gène — typique des gènes eucaryotes (certains gènes humains ont >95% d''introns)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001465');

-- Sequence items for gene_expression
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001466','33333333-0000-0000-0000-000000000036','ordering',3,'fr',
'{"stem":"Ordonnez les étapes du flux d''information génétique (dogme central) :","items":["Traduction : ARNm → protéine (ribosome)","Maturation : épissage, coiffe, queue poly-A","Transcription : ADN → pré-ARNm (ARN pol II)","Repliement et modification post-traductionnelle de la protéine"],"correct_order":[2,1,0,3],"latex":false}',
'{"text_fr":"1) Transcription dans le noyau : ARN pol II copie le gène en pré-ARNm. 2) Maturation du pré-ARNm : ajout coiffe 7-méthylguanosine en 5'', épissage des introns, queue poly-A en 3''. 3) L''ARNm mature est exporté vers le cytoplasme et traduit par les ribosomes. 4) La protéine brute subit des modifications (glycosylation, phosphorylation, clivage de signal) pour être fonctionnelle."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001466');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001467','33333333-0000-0000-0000-000000000036','ordering',4,'fr',
'{"stem":"Ordonnez les étapes de l''élongation de la traduction (un cycle d''addition d''un acide aminé) :","items":["Translocation : le ribosome avance d''un codon (3''→ 5'' sur l''ARNm)","Départ de l''ARNt déchargé du site E","Entrée de l''aminoacyl-ARNt au site A (reconnaissance codon-anticodon)","Formation de la liaison peptidique par le peptidyl-transférase"],"correct_order":[2,3,0,1],"latex":false}',
'{"text_fr":"1) L''aminoacyl-ARNt (chargé) entre au site A et s''apparie avec le codon. 2) Le peptidyl-transférase (ARNr 28S) catalyse la formation de la liaison peptidique entre le peptide (site P) et le nouvel aa (site A). 3) Translocation : l''ARNt-peptide passe de A→P, l''ancien ARNt de P→E, le ribosome avance d''un codon. 4) L''ARNt vide quitte le site E. Cycle consomme 2 GTP."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001467');

-- ============================================================
-- SKILL 037: mutations (IDs 1468-1482)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001468','33333333-0000-0000-0000-000000000037','mcq',2,'fr',
'{"stem":"Une mutation ponctuelle par substitution qui ne change pas l''acide aminé codé est appelée :","choices":["Mutation non-sens","Mutation faux-sens","Mutation silencieuse","Mutation par décalage du cadre de lecture"],"correct_index":2,"latex":false}',
'{"text_fr":"Mutation silencieuse (synonyme) : la substitution d''une base change le codon mais pas l''acide aminé (redondance du code génétique). Ex : AUU → AUC (les deux codent Ile). Ce type de mutation n''affecte pas la protéine produite. Mutation faux-sens : change l''aa. Mutation non-sens : crée un codon stop. Décalage : insertion/délétion d''un ou plusieurs nucléotides (sauf multiples de 3)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001468');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001469','33333333-0000-0000-0000-000000000037','mcq',2,'fr',
'{"stem":"L''anémie falciforme (drépanocytose) est causée par :","choices":["Une délétion de 3 paires de bases dans le gène de la bêta-globine","Une mutation faux-sens : remplacement de Glu par Val en position 6 de la bêta-globine","Une mutation non-sens créant un codon stop prématuré","Une trisomie du chromosome 11"],"correct_index":1,"latex":false}',
'{"text_fr":"La drépanocytose résulte d''une mutation ponctuelle : GAG (Glu) → GTG (Val) au codon 6 du gène HBB (bêta-globine). Cette substitution A→T rend l''hémoglobine S (HbS) hydrophobe en surface → polymérisation en désoxygénation → déformation en faucille des globules rouges → anémie et crises vaso-occlusives. Exemple classique de mutation faux-sens avec effet dominant."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001469');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001470','33333333-0000-0000-0000-000000000037','mcq',3,'fr',
'{"stem":"Une insertion d''un seul nucléotide dans une séquence codante provoque :","choices":["Une mutation silencieuse","Un décalage du cadre de lecture affectant tous les codons en aval","Un seul acide aminé changé","La terminaison prématurée sans changement de cadre"],"correct_index":1,"latex":false}',
'{"text_fr":"L''insertion (ou délétion) d''un nucléotide décale le cadre de lecture de +1 (ou -1). Tous les codons en aval de la mutation sont lus différemment → séquence d''aa complètement altérée en aval + souvent apparition d''un codon stop prématuré. C''est généralement la mutation la plus délétère. Exception : insertion/délétion multiple de 3 nucléotides → ajout/retrait d''aa sans décalage."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001470');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001471','33333333-0000-0000-0000-000000000037','mcq',3,'fr',
'{"stem":"Parmi les agents mutagènes suivants, lequel est un mutagène chimique alkylant ?","choices":["Rayons UV","Éthyl méthane sulfonate (EMS)","Rayons X","Virus intégrant"],"correct_index":1,"latex":false}',
'{"text_fr":"L''EMS est un agent alkylant : il ajoute des groupements alkyle sur les bases (principalement O6 de la guanine), provoquant des appariements aberrants (G alkylée → s''apparie avec T au lieu de C) → transitions G:C → A:T. Les UV induisent des dimères de thymine. Les rayons X provoquent des cassures double brin (ionisant). Les virus intégrants créent des mutations insertionnelles."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001471');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001472','33333333-0000-0000-0000-000000000037','mcq',3,'fr',
'{"stem":"Les mutations germinales se distinguent des mutations somatiques par :","choices":["Leur localisation sur les chromosomes sexuels","Leur capacité à être transmises à la descendance","Leur effet plus grave sur l''organisme","Leur impossibilité de réparation"],"correct_index":1,"latex":false}',
'{"text_fr":"Les mutations germinales surviennent dans les cellules germinales (gamètes) → héritables, transmises aux générations suivantes. Les mutations somatiques surviennent dans les cellules du corps → non transmissibles mais peuvent causer le cancer si elles touchent des proto-oncogènes ou gènes suppresseurs de tumeurs. La gravité dépend du gène touché, pas du type cellulaire."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001472');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001473','33333333-0000-0000-0000-000000000037','mcq',4,'fr',
'{"stem":"Le système de réparation par excision de nucléotides (NER) répare principalement :","choices":["Les mésappariements de bases après réplication","Les distorsions hélicoïdales de l''ADN comme les dimères de thymine (UV)","Les cassures double brin","Les oxydations de bases"],"correct_index":1,"latex":false}',
'{"text_fr":"Le NER reconnaît les distorsions de la double hélice (bulge) causées par des adduits volumineux comme les dimères de cyclobutane-pyrimidine (CPD) formés par les UV. Il excise un fragment de ~25-30 nucléotides autour de la lésion, re-synthétise le brin (ADN pol δ/ε) et soude (ligase). Déficit en NER → xeroderma pigmentosum (sensibilité extrême au soleil, cancer cutané)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001473');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001474','33333333-0000-0000-0000-000000000037','mcq',4,'fr',
'{"stem":"Une mutation non-sens crée :","choices":["Un acide aminé différent","Un codon stop prématuré","Un décalage du cadre de lecture","Une duplication de gène"],"correct_index":1,"latex":false}',
'{"text_fr":"Mutation non-sens : substitution d''une base qui transforme un codon codant en codon stop (UAA, UAG ou UGA). La traduction s''arrête prématurément → protéine tronquée, généralement non-fonctionnelle et souvent dégradée par le NMD (Nonsense-Mediated Decay). Ex : mutation W1282X dans CFTR (mucoviscidose) — W (Trp, UGG) → stop (UGA) au codon 1282."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001474');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001475','33333333-0000-0000-0000-000000000037','mcq',4,'fr',
'{"stem":"Le taux de mutation spontané chez l''Homme est approximativement de :","choices":["1 mutation par 10 pb répliquées","1 mutation par 10⁹ pb répliquées","1 mutation par 10³ pb répliquées","1 erreur pour chaque nucléotide"],"correct_index":1,"latex":true}',
'{"text_fr":"Taux de mutation spontanée ≈ 10⁻⁹ à 10⁻¹⁰ par pb par réplication (grâce à la fidélité de la DNA pol III + corrections exonucléasiques + systèmes de réparation post-réplicatifs comme le MMR). Pour le génome humain (3×10⁹ pb), cela représente ~1-3 nouvelles mutations par division cellulaire — soit ~40-60 nouvelles mutations germinales par génération."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001475');

-- Numeric items for mutations
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001476','33333333-0000-0000-0000-000000000037','numeric',2,'fr',
'{"stem":"Combien de codons stop existent dans le code génétique universel ?","correct_value":3,"tolerance":0,"unit":"codons stop","latex":false}',
'{"text_fr":"Les 3 codons stop sont : UAA (''ocre''), UAG (''ambre'') et UGA (''opale''). Ils ne codent aucun acide aminé standard et sont reconnus par des facteurs de terminaison (RF1 reconnaît UAA et UAG, RF2 reconnaît UAA et UGA chez les procaryotes). Ils signalent la fin de la traduction et la libération de la protéine néosynthétisée."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001476');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001477','33333333-0000-0000-0000-000000000037','numeric',3,'fr',
'{"stem":"Une mutation par décalage insère 1 nucléotide à la position 10 d''une séquence codante de 300 nucléotides. Combien de codons sont modifiés par rapport à la séquence sauvage ?","correct_value":97,"tolerance":1,"unit":"codons","latex":false}',
'{"text_fr":"L''insertion est à la position 10, donc dans le 4ème codon (positions 10-12). Tous les codons à partir du 4ème sont décalés. Nombre de codons totaux = 300/3 = 100. Codons affectés = du codon 4 au codon 100 = 100 - 4 + 1 = 97 codons. Les 3 premiers codons (positions 1-9) restent inchangés. En pratique, un codon stop prématuré apparaît souvent avant la fin."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001477');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001478','33333333-0000-0000-0000-000000000037','numeric',3,'fr',
'{"stem":"Parmi les 64 codons du code génétique, combien codent des acides aminés (pas des codons stop) ?","correct_value":61,"tolerance":0,"unit":"codons","latex":false}',
'{"text_fr":"64 codons totaux − 3 codons stop (UAA, UAG, UGA) = 61 codons sens qui codent les 20 acides aminés. La redondance moyenne est 61/20 ≈ 3 codons par acide aminé. La Leucine est l''acide aminé le plus redondant (6 codons). La Méthionine et le Tryptophane n''ont qu''un seul codon chacun (AUG et UGG)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001478');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001479','33333333-0000-0000-0000-000000000037','numeric',4,'fr',
'{"stem":"Un dimère de thymine bloque une fourche de réplication sur 1 chromosome. Combien de gènes pourraient être affectés si la réparation échoue et que la cellule entre en apoptose ? (Répondre : 0 — l''apoptose protège l''organisme)","correct_value":0,"tolerance":0,"unit":"gènes transmis","latex":false}',
'{"text_fr":"Si la cellule somatique entre en apoptose (mort cellulaire programmée), aucun gène muté n''est transmis à des cellules filles. L''apoptose est un mécanisme de surveillance du génome : p53 activé par les dommages ADN déclenche soit la réparation, soit l''apoptose. C''est une réponse protectrice anti-tumorale. Les 0 gènes affectés signifie que le ''dommage'' est contenu."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001479');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001480','33333333-0000-0000-0000-000000000037','numeric',4,'fr',
'{"stem":"Une séquence d''ADN sauvage est : 5''-ATG-GAA-TTC-3''. Une transition G→A au 5ème nucléotide donne le codon central GAA→AAA. Combien d''acides aminés sont changés dans la protéine ?","correct_value":1,"tolerance":0,"unit":"acides aminés","latex":false}',
'{"text_fr":"La mutation G→A en position 5 change uniquement le codon central : GAA (Glu) → AAA (Lys). C''est une mutation faux-sens (1 acide aminé changé). Les codons ATG (Met, initiateur) et TTC (Phe en ARNm UUC) restent inchangés. Bilan : 1 seul acide aminé est substitué dans la protéine. L''effet fonctionnel dépend de l''importance de cette position dans la protéine."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001480');

-- Sequence items for mutations
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001481','33333333-0000-0000-0000-000000000037','ordering',3,'fr',
'{"stem":"Ordonnez les étapes de la réparation par excision de base (BER) :","items":["ADN polymérase β re-synthétise le brin (remplissage du gap)","La glycosylase reconnaît et excise la base endommagée","La ligase scelle la coupure finale","L''endonucléase AP coupe le squelette sucre-phosphate au site abasique"],"correct_order":[1,3,0,2],"latex":false}',
'{"text_fr":"1) La glycosylase spécifique reconnaît la base lésée (ex : uracile par UNG, 8-oxoguanine par OGG1) et la clive → site abasique (AP site). 2) L''AP endonucléase coupe le squelette phosphodiester au niveau du site AP. 3) La DNA polymérase β insère le nucléotide correct en utilisant l''autre brin comme matrice. 4) La ligase III (+ XRCC1) soude la coupure. Système essentiel contre les déaminations spontanées."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001481');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001482','33333333-0000-0000-0000-000000000037','ordering',4,'fr',
'{"stem":"Ordonnez les conséquences d''une mutation faux-sens dans un site actif d''enzyme :","items":["Phénotype modifié (maladie ou perte de fonction)","Substitution d''un nucléotide dans l''ADN","Protéine avec un acide aminé différent au site actif","ARNm avec un codon différent"],"correct_order":[1,3,2,0],"latex":false}',
'{"text_fr":"1) Mutation dans l''ADN (substitution A→G, par exemple). 2) Transcription → ARNm avec codon altéré. 3) Traduction → insertion d''un acide aminé différent (ex: Glu→Lys change la charge). 4) La protéine est non-fonctionnelle (site actif perturbé) → perte d''activité enzymatique → phénotype pathologique. Ce schéma causal (ADN → ARN → protéine → phénotype) est fondamental en génétique moléculaire."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001482');

-- ============================================================
-- SKILL 038: autosomal_heredity (IDs 1483-1497)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001483','33333333-0000-0000-0000-000000000038','mcq',2,'fr',
'{"stem":"Un caractère autosomique récessif apparaît chez un enfant dont les deux parents sont phénotypiquement normaux. Les parents sont donc :","choices":["Homozygotes dominants","Hétérozygotes (porteurs sains)","Homozygotes récessifs","L''un dominant et l''autre récessif"],"correct_index":1,"latex":false}',
'{"text_fr":"Si les parents sont phénotypiquement normaux mais ont un enfant atteint (aa), ils doivent être tous deux porteurs : Aa × Aa → 1/4 AA : 2/4 Aa : 1/4 aa. Les parents hétérozygotes (Aa) sont phénotypiquement normaux (le dominant masque le récessif) mais transmettent l''allèle a. Exemples : mucoviscidose, phénylcétonurie, albinisme."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001483');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001484','33333333-0000-0000-0000-000000000038','mcq',2,'fr',
'{"stem":"Le croisement Aa × Aa donne quelle proportion de descendants phénotypiquement dominants ?","choices":["1/4","1/2","3/4","4/4"],"correct_index":2,"latex":false}',
'{"text_fr":"Aa × Aa → 1/4 AA + 2/4 Aa + 1/4 aa. Phénotype dominant (A_) = AA + Aa = 3/4. Phénotype récessif = aa = 1/4. Ratio phénotypique classique : 3 dominants : 1 récessif (3:1). C''est la loi de ségrégation de Mendel. Erreur classique BAC : confondre ratio génotypique (1:2:1) et ratio phénotypique (3:1) pour les allèles de dominance complète."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001484');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001485','33333333-0000-0000-0000-000000000038','mcq',3,'fr',
'{"stem":"Le croisement test (testcross) consiste à croiser un individu de phénotype dominant inconnu avec :","choices":["Un individu hétérozygote","Un individu homozygote dominant","Un individu homozygote récessif","N''importe quel autre individu"],"correct_index":2,"latex":false}',
'{"text_fr":"Le croisement test (backcross) : individu inconnu × individu homozygote récessif (aa). Si l''inconnu est AA : tous descendants phénotype dominant (Aa). Si l''inconnu est Aa : 1/2 dominant (Aa) + 1/2 récessif (aa). Ce croisement révèle le génotype de l''individu testé. Utilisé en sélection animale et végétale pour identifier les porteurs."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001485');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001486','33333333-0000-0000-0000-000000000038','mcq',3,'fr',
'{"stem":"La codominance se manifeste par :","choices":["Le phénotype hétérozygote est intermédiaire entre les deux homozygotes","Les deux allèles s''expriment simultanément et indépendamment dans l''hétérozygote","Le phénotype récessif disparaît complètement","Un seul allèle s''exprime à la fois"],"correct_index":1,"latex":false}',
'{"text_fr":"Codominance : les deux allèles d''un hétérozygote s''expriment pleinement et simultanément. Ex : groupe sanguin AB (allèles IA et IB codominants → antigènes A ET B présents sur les hématies). A distinguer de la dominance intermédiaire où le phénotype hétérozygote est intermédiaire (ex: fleurs roses de Mirabilis si rouge × blanc → rose)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001486');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001487','33333333-0000-0000-0000-000000000038','mcq',3,'fr',
'{"stem":"Deux parents de groupe sanguin A (dont l''un est IAi) et B (IBi) ont des enfants. Quel groupe sanguin NE PEUT PAS apparaître chez leurs enfants ?","choices":["Groupe A","Groupe AB","Groupe O","Tous les groupes sont possibles"],"correct_index":3,"latex":false}',
'{"text_fr":"Parents : IA·i × IB·i. Croisement : 1/4 IAIB (groupe AB) + 1/4 IAi (groupe A) + 1/4 IBi (groupe B) + 1/4 ii (groupe O). Les 4 groupes sanguins (A, B, AB, O) sont tous possibles ! C''est un cas classique de BAC marocain. Tous les groupes apparaissent avec probabilité 1/4."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001487');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001488','33333333-0000-0000-0000-000000000038','mcq',4,'fr',
'{"stem":"Dans un dihybride (AaBb × AaBb), quelle est la probabilité d''un descendant de phénotype A_bb ?","choices":["1/16","3/16","9/16","3/4"],"correct_index":1,"latex":false}',
'{"text_fr":"Loi de l''assortiment indépendant (si les gènes sont sur des chromosomes différents) : P(A_) = 3/4, P(bb) = 1/4. P(A_bb) = 3/4 × 1/4 = 3/16. Ratio dihybride classique : 9 A_B_ : 3 A_bb : 3 aaB_ : 1 aabb = 9:3:3:1. Ce calcul suppose indépendance des loci (pas de liaison génétique)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001488');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001489','33333333-0000-0000-0000-000000000038','mcq',4,'fr',
'{"stem":"La mucoviscidose est autosomique récessive. La fréquence des porteurs dans une population est 1/25. Quelle est la probabilité qu''un couple de porteurs ait un enfant atteint ?","choices":["1/4","1/100","1/2500","1/25"],"correct_index":0,"latex":true}',
'{"text_fr":"Le croisement porteur × porteur (Aa × Aa) donne toujours 1/4 d''enfants atteints (aa), indépendamment de la fréquence des porteurs dans la population. La fréquence des porteurs (1/25) est utilisée pour calculer la probabilité qu''un couple aléatoire soit porteur × porteur : (1/25)² = 1/625. Mais si on SAIT que les deux sont porteurs, c''est 1/4."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001489');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001490','33333333-0000-0000-0000-000000000038','mcq',4,'fr',
'{"stem":"Le linkage (liaison génétique) entre deux loci se traduit par :","choices":["Des ratios mendéliens classiques 9:3:3:1","Des déviations par rapport aux ratios mendéliens attendus (moins de recombinants)","Une expression dominante accrue","L''impossibilité de crossing-over"],"correct_index":1,"latex":false}',
'{"text_fr":"Si deux gènes sont proches sur le même chromosome, ils tendent à être transmis ensemble (en couplage). Les crossing-over peuvent séparer les allèles, mais leur fréquence est inférieure à 50% → moins de recombinants que prévu par la ségrégation indépendante. Distance génétique = fréquence de recombinaison × 100 cM (centimorgans, loi de Morgan)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001490');

-- Numeric items for autosomal_heredity
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001491','33333333-0000-0000-0000-000000000038','numeric',2,'fr',
'{"stem":"Le croisement Aa × Aa produit quelle fraction de descendants homozygotes (AA + aa) ?","correct_value":0.5,"tolerance":0.01,"unit":"fraction","latex":false}',
'{"text_fr":"Aa × Aa → 1/4 AA + 2/4 Aa + 1/4 aa. Homozygotes = AA + aa = 1/4 + 1/4 = 2/4 = 1/2 = 0,5. Hétérozygotes = 2/4 = 0,5 aussi. Donc 50% homozygotes, 50% hétérozygotes. En fraction décimale : 0,5."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001491');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001492','33333333-0000-0000-0000-000000000038','numeric',2,'fr',
'{"stem":"Dans le croisement Aa × aa, quelle fraction des descendants est phénotypiquement dominante ?","correct_value":0.5,"tolerance":0.01,"unit":"fraction","latex":false}',
'{"text_fr":"Aa × aa → 1/2 Aa (phénotype dominant) + 1/2 aa (phénotype récessif). Fraction dominante = 1/2 = 0,5. Ce croisement (homozygote récessif × hétérozygote) est la base du croisement test (testcross), utilisé pour déterminer le génotype d''un individu au phénotype dominant."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001492');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001493','33333333-0000-0000-0000-000000000038','numeric',3,'fr',
'{"stem":"Sur 160 descendants d''un croisement Aa × Aa, combien sont attendus avec le phénotype récessif ?","correct_value":40,"tolerance":2,"unit":"descendants","latex":false}',
'{"text_fr":"Aa × Aa → 3/4 phénotype dominant + 1/4 phénotype récessif. Nombre attendu avec phénotype récessif = 160 × 1/4 = 40. Attention : il s''agit de la valeur ATTENDUE (théorique). En pratique, les résultats suivent la loi des grands nombres et peuvent s''écarter légèrement. Pour vérifier l''adéquation, on utilise le test du chi² (χ²)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001493');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001494','33333333-0000-0000-0000-000000000038','numeric',4,'fr',
'{"stem":"Dans un dihybride AaBb × AaBb avec assortiment indépendant, quelle fraction des descendants est aabb ?","correct_value":0.0625,"tolerance":0.001,"unit":"fraction","latex":true}',
'{"text_fr":"P(aa) = 1/4, P(bb) = 1/4. P(aabb) = 1/4 × 1/4 = 1/16 = 0,0625. Dans la descendance de 16 : 9 A_B_ + 3 A_bb + 3 aaB_ + 1 aabb. Le ratio 9:3:3:1 est le ratio de Mendel pour le dihybride avec dominance complète et assortiment indépendant."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001494');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001495','33333333-0000-0000-0000-000000000038','numeric',4,'fr',
'{"stem":"Deux parents sains ont 4 enfants dont 1 atteint d''une maladie autosomique récessive. Combien de ces 4 enfants sont STATISTIQUEMENT attendus comme porteurs sains (Aa) ?","correct_value":2,"tolerance":0,"unit":"enfants","latex":false}',
'{"text_fr":"Parents : Aa × Aa → 1/4 AA + 2/4 Aa + 1/4 aa. Probabilité porteur Aa = 2/4 = 1/2. Nombre attendu de porteurs = 4 × 1/2 = 2. Parmi les enfants NON atteints (3 sur 4), la probabilité d''être porteur est 2/3 (car 2/3 des non-atteints sont Aa). Mais la question porte sur l''ensemble des 4 enfants → 4 × 1/2 = 2."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001495');

-- Sequence items for autosomal_heredity
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001496','33333333-0000-0000-0000-000000000038','ordering',3,'fr',
'{"stem":"Pour établir le mode de transmission d''une maladie génétique, ordonnez les étapes du raisonnement :","items":["Conclure : autosomique dominant/récessif ou lié au sexe","Construire l''arbre généalogique (pédigrée)","Tester l''hypothèse avec les ratios observés","Analyser la distribution (tous sexes touchés ? parents sains avec enfant atteint ?)"],"correct_order":[1,3,2,0],"latex":false}',
'{"text_fr":"1) Construire le pédigrée : symboles carrés (hommes), ronds (femmes), remplis (atteints). 2) Analyser : si les deux sexes sont également touchés → autosomique ; si des parents sains ont un enfant atteint → récessif ; si tous les enfants d''un parent atteint sont atteints → souvent dominant. 3) Vérifier les ratios observés vs attendus. 4) Conclure sur le mode de transmission."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001496');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001497','33333333-0000-0000-0000-000000000038','ordering',4,'fr',
'{"stem":"Ordonnez les étapes de la méiose qui assurent la ségrégation des allèles (loi de Mendel) :","items":["Formation des gamètes haploïdes (n chromosomes)","Séparation des chromosomes homologues en anaphase I","Appariement des chromosomes homologues (tétrades) en prophase I","Possible crossing-over entre chromosomes homologues"],"correct_order":[2,3,1,0],"latex":false}',
'{"text_fr":"1) Prophase I : les chromosomes homologues s''apparient → formation des bivalents (tétrades de 4 chromatides). 2) Crossing-over (recombinaison) entre chromatides non-sœurs → brassage génétique. 3) Anaphase I : les chromosomes homologues (portant des allèles différents) se séparent → ségrégation mendélienne. 4) Méiose II + cytocinèse → 4 gamètes haploïdes génétiquement distincts."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001497');

-- ============================================================
-- SKILL 039: sex_linked_heredity (IDs 1498-1512)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001498','33333333-0000-0000-0000-000000000039','mcq',2,'fr',
'{"stem":"L''hémophilie A est une maladie récessive liée à l''X. Une femme porteuse (X^H X^h) épouse un homme sain (X^H Y). Quelle proportion de leurs fils sera hémophile ?","choices":["0%","25%","50%","100%"],"correct_index":2,"latex":false}',
'{"text_fr":"Croisement : X^H X^h × X^H Y. Fils possibles : X^H Y (sain) ou X^h Y (hémophile), chacun avec probabilité 1/2. Donc 50% des fils sont hémophiles. Les filles reçoivent toujours X^H du père → aucune fille atteinte (mais 50% porteuses X^H X^h). Règle : pour une maladie récessive liée à X, les fils d''une mère porteuse ont 50% de risque."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001498');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001499','33333333-0000-0000-0000-000000000039','mcq',2,'fr',
'{"stem":"Le daltonisme (rouge-vert) est lié à l''X récessif. Un homme daltonien épouse une femme homozygote normale. Leurs filles seront :","choices":["Toutes daltoniennes","Toutes porteuses saines","50% daltoniennes, 50% normales","Toutes normales non porteuses"],"correct_index":1,"latex":false}',
'{"text_fr":"Homme daltonien : X^d Y. Femme normale homozygote : X^D X^D. Chaque fille reçoit X^d du père et X^D de la mère → toutes X^D X^d : porteuses saines. Les fils reçoivent Y du père et X^D de la mère → tous X^D Y : normaux. C''est pourquoi un père daltonien ''transmet'' obligatoirement le gène à toutes ses filles (transmission croisée)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001499');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001500','33333333-0000-0000-0000-000000000039','mcq',3,'fr',
'{"stem":"Lequel de ces indices permet d''affirmer qu''une maladie est liée au chromosome X ?","choices":["La maladie touche plus les femmes","Un père atteint ne transmet jamais la maladie à ses fils","Les frères et sœurs sont tous atteints","La maladie saute une génération"],"correct_index":1,"latex":false}',
'{"text_fr":"Critère diagnostique clé : un père atteint ne transmet pas son X aux fils (il leur donne Y) → aucun fils d''un père atteint n''hérite directement de l''allèle paternel. En revanche, il transmet son X à TOUTES ses filles. Si la maladie est dominante liée à X : toutes les filles d''un père atteint sont atteintes. Si récessive liée à X : toutes les filles sont porteuses."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001500');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001501','33333333-0000-0000-0000-000000000039','mcq',3,'fr',
'{"stem":"La dystrophie musculaire de Duchenne (DMD) est récessive liée à l''X. Une femme porteuse (X^D X^d) épouse un homme normal. Quel est le risque pour chaque enfant d''être atteint ?","choices":["25%","50%","12.5%","100%"],"correct_index":0,"latex":false}',
'{"text_fr":"X^D X^d × X^D Y → filles : 1/2 X^D X^D (normale) + 1/2 X^D X^d (porteuse). Fils : 1/2 X^D Y (normal) + 1/2 X^d Y (atteint DMD). Risque pour chaque enfant = 1/4 (1 fils atteint sur 4 enfants totaux). Risque pour chaque FILS = 1/2. Ne pas confondre : risque par enfant vs risque par fils — erreur classique au BAC."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001501');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001502','33333333-0000-0000-0000-000000000039','mcq',3,'fr',
'{"stem":"Une femme daltonienne (X^d X^d) épouse un homme normal (X^D Y). Tous leurs fils seront :","choices":["Normaux","Daltoniens","50% daltoniens","Porteurs"],"correct_index":1,"latex":false}',
'{"text_fr":"La mère X^d X^d donne obligatoirement X^d à tous ses fils. Fils : X^d Y → tous daltoniens (100%). Les filles reçoivent X^D du père + X^d de la mère → toutes X^D X^d : porteuses saines. C''est la preuve de la transmission croisée inversée : une mère atteinte transmet la maladie à tous ses fils."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001502');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001503','33333333-0000-0000-0000-000000000039','mcq',4,'fr',
'{"stem":"L''inactivation du chromosome X (lyonisation) signifie que chez la femme :","choices":["Un seul chromosome X est actif dans chaque cellule somatique","Les deux chromosomes X sont actifs en permanence","Le chromosome X paternel est toujours inactivé","L''inactivation se produit à la méiose"],"correct_index":0,"latex":false}',
'{"text_fr":"La lyonisation (Mary Lyon, 1961) : dans chaque cellule somatique féminine, l''un des deux chromosomes X est aléatoirement inactivé → corps de Barr (chromatine sexuelle condensée). L''inactivation se produit au stade blastocyste (~16 jours) et est maintenue dans toutes les cellules filles. Résultat : les femmes hétérozygotes sont des mosaïques (deux populations cellulaires)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001503');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001504','33333333-0000-0000-0000-000000000039','mcq',4,'fr',
'{"stem":"Une femme présente 2 corps de Barr dans chaque cellule. Son caryotype est probablement :","choices":["46,XX (normal)","47,XXX (trisomie X)","47,XXY (Klinefelter)","45,X (Turner)"],"correct_index":1,"latex":false}',
'{"text_fr":"Nombre de corps de Barr = nombre de chromosomes X − 1. 2 corps de Barr → 3 chromosomes X → 47,XXX (trisomie X, ou ''superfemelle''). 46,XX normale → 1 corps de Barr. 47,XXY (Klinefelter, homme) → 1 corps de Barr. 45,X (syndrome de Turner) → 0 corps de Barr. Règle : corps de Barr = X − 1."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001504');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001505','33333333-0000-0000-0000-000000000039','mcq',4,'fr',
'{"stem":"Un trait lié à l''Y (holandrique) se transmet :","choices":["De mère en fils uniquement","De père en tous ses fils uniquement","Aux deux sexes également","De mère en filles uniquement"],"correct_index":1,"latex":false}',
'{"text_fr":"Un gène porté sur le chromosome Y non-recombinant (région NRY) est transmis par le père à TOUS ses fils (ils reçoivent tous le Y paternel) et à aucune fille (elles reçoivent le X paternel). Exemples historiques : facteur SRY (déterminisme testiculaire), gène AZF (spermatogenèse). Caractéristique pédigrée : transmission père→fils à 100%, jamais père→fille."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001505');

-- Numeric items for sex_linked_heredity
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001506','33333333-0000-0000-0000-000000000039','numeric',2,'fr',
'{"stem":"Une femme porteuse d''hémophilie (X^H X^h) et un homme sain ont des enfants. Quelle fraction de leurs filles sera porteuse ?","correct_value":0.5,"tolerance":0.01,"unit":"fraction","latex":false}',
'{"text_fr":"Croisement : X^H X^h × X^H Y. Filles possibles : X^H X^H (1/2, normale non porteuse) ou X^H X^h (1/2, porteuse). Fraction de filles porteuses = 1/2 = 0,5. Les fils : X^H Y (1/2, sain) ou X^h Y (1/2, hémophile). Parmi les filles, aucune ne sera hémophile (le père est sain → donne toujours X^H)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001506');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001507','33333333-0000-0000-0000-000000000039','numeric',3,'fr',
'{"stem":"Combien de corps de Barr observe-t-on dans les cellules d''un homme atteint du syndrome de Klinefelter (47,XXY) ?","correct_value":1,"tolerance":0,"unit":"corps de Barr","latex":false}',
'{"text_fr":"Règle : corps de Barr = nombre de X − 1. 47,XXY → 2 chromosomes X → 2 − 1 = 1 corps de Barr. Le syndrome de Klinefelter (1/600 naissances masculines) : grande taille, hypogonadisme, infertilité. Les hommes XY normaux n''ont aucun corps de Barr (1X − 1 = 0). Les femmes XX normales ont 1 corps de Barr."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001507');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001508','33333333-0000-0000-0000-000000000039','numeric',3,'fr',
'{"stem":"Un homme daltonien (X^d Y) épouse une femme porteuse (X^D X^d). Quelle est la probabilité (en %) qu''un fils de ce couple soit daltonien ?","correct_value":50,"tolerance":0,"unit":"%","latex":false}',
'{"text_fr":"Croisement X^d Y × X^D X^d. Fils : reçoivent Y du père + X^D ou X^d de la mère. Fils X^D Y : normal (50%). Fils X^d Y : daltonien (50%). Probabilité qu''un fils soit daltonien = 50%. Attention : la question porte sur les fils uniquement. Si elle portait sur tous les enfants, la réponse serait 25% (1 fils daltonien sur 4 enfants au total)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001508');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001509','33333333-0000-0000-0000-000000000039','numeric',4,'fr',
'{"stem":"Dans une famille, un grand-père paternel est daltonien. Sa fille (mère) a une vision normale. Quelle est la probabilité (%) que le fils de cette mère soit daltonien ?","correct_value":50,"tolerance":0,"unit":"%","latex":false}',
'{"text_fr":"Grand-père daltonien : X^d Y. Il transmet X^d à sa fille → la mère est X^D X^d (porteuse obligatoire, car elle reçoit X^d du grand-père et X^D d''une grand-mère supposée saine). Croisement mère porteuse × père sain : fils ont 50% de risque d''être daltoniens (X^d Y). La transmission ''grand-père → petits-fils via la fille porteuse'' est classique pour les maladies récessives liées à l''X."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001509');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001510','33333333-0000-0000-0000-000000000039','numeric',4,'fr',
'{"stem":"Une femme daltonienne a 3 frères. Combien de ces frères sont STATISTIQUEMENT attendus daltoniens si leur mère était porteuse ?","correct_value":1.5,"tolerance":0.1,"unit":"frères","latex":false}',
'{"text_fr":"Mère porteuse X^D X^d × père sain X^D Y. Chaque frère a 50% de risque d''être daltonien. Nombre attendu de frères daltoniens = 3 × 1/2 = 1,5. En pratique (nombres entiers), on observerait 1 ou 2. La valeur 1,5 est la valeur statistique attendue (espérance mathématique), pas un résultat observé réel."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001510');

-- Sequence items for sex_linked_heredity
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001511','33333333-0000-0000-0000-000000000039','ordering',3,'fr',
'{"stem":"Pour identifier qu''une maladie est récessive liée à l''X, ordonnez les indices du plus au moins discriminant :","items":["Les femmes ne sont jamais atteintes (si père sain)","Des parents sains ont un enfant atteint","Les hommes sont plus souvent atteints que les femmes","Un père atteint ne transmet pas la maladie à ses fils"],"correct_order":[3,0,2,1],"latex":false}',
'{"text_fr":"1) Un père atteint ne transmet PAS à ses fils → preuve directe de liaison à l''X (critère le plus discriminant). 2) Les femmes ne sont jamais atteintes si le père est sain → cohérent avec récessif lié X. 3) Hommes > femmes atteints → suggère liaison X. 4) Parents sains + enfant atteint → récessif (mais ne distingue pas autosomique de lié X). Ordre de raisonnement classique du BAC."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001511');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001512','33333333-0000-0000-0000-000000000039','ordering',4,'fr',
'{"stem":"Ordonnez la démarche pour calculer le risque de transmission d''une maladie liée à l''X :","items":["Calculer la probabilité pour chaque type de descendant","Identifier le génotype de chaque parent","Déterminer si la maladie est dominante ou récessive liée à l''X","Construire l''échiquier de croisement (grille de Punnett)"],"correct_order":[2,1,3,0],"latex":false}',
'{"text_fr":"1) Identifier le mode de transmission (lié X dominant ou récessif) à partir du pédigrée. 2) Déduire le génotype de chaque parent (ex: père X^d Y, mère X^D X^d). 3) Échiquier : croiser les gamètes possibles. 4) Lire les probabilités pour chaque génotype/phénotype de la descendance. Toujours distinguer la probabilité par sexe et par enfant total."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001512');

-- ============================================================
-- SKILL 040: self_nonself (IDs 1513-1527)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001513','33333333-0000-0000-0000-000000000040','mcq',2,'fr',
'{"stem":"Le complexe majeur d''histocompatibilité (CMH) de classe I est présent sur :","choices":["Les lymphocytes B uniquement","Toutes les cellules nucléées de l''organisme","Les macrophages et cellules dendritiques uniquement","Les érythrocytes et plaquettes"],"correct_index":1,"latex":false}',
'{"text_fr":"Le CMH-I (HLA-A, HLA-B, HLA-C chez l''Homme) est exprimé sur toutes les cellules nucléées (sauf les érythrocytes matures qui n''ont pas de noyau). Il présente des peptides endogènes (issus des protéines intracellulaires) aux lymphocytes T CD8+ cytotoxiques. Le CMH-II est restreint aux cellules présentatrices professionnelles (CPP) : macrophages, cellules dendritiques, lymphocytes B."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001513');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001514','33333333-0000-0000-0000-000000000040','mcq',2,'fr',
'{"stem":"Les antigènes du soi sont :","choices":["Des molécules étrangères reconnues par les anticorps","Des molécules du CMH portées à la surface des cellules propres à l''individu","Des pathogènes inactivés","Des cytokines pro-inflammatoires"],"correct_index":1,"latex":false}',
'{"text_fr":"Les antigènes du soi = molécules du CMH (et autres marqueurs cellulaires) propres à l''individu. Ils permettent au système immunitaire de distinguer ''moi'' du ''non-moi''. Chaque individu a un jeu unique de molécules HLA (sauf jumeaux identiques) → c''est la base de la compatibilité lors des greffes. Les lymphocytes T auto-réactifs contre le soi sont éliminés lors de la sélection thymique (tolérance centrale)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001514');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001515','33333333-0000-0000-0000-000000000040','mcq',3,'fr',
'{"stem":"La sélection clonale des lymphocytes T dans le thymus élimine :","choices":["Les lymphocytes B auto-réactifs","Les lymphocytes T qui ne reconnaissent pas le CMH du soi (sélection positive) et ceux qui réagissent trop fortement contre le soi (sélection négative)","Tous les lymphocytes T CD4+","Les natural killer cells"],"correct_index":1,"latex":false}',
'{"text_fr":"Dans le thymus : sélection positive (cortex) — les T qui ne reconnaissent pas le CMH propre meurent par apoptose (>95%). Sélection négative (médullaire) — les T qui réagissent trop fortement contre les antigènes du soi sont éliminés (délétion clonale → tolérance centrale). Seulement ~2-5% des thymocytes survivent et deviennent des lymphocytes T matures compétents mais tolérants."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001515');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001516','33333333-0000-0000-0000-000000000040','mcq',3,'fr',
'{"stem":"Lors d''une greffe allogénique (donneur et receveur génétiquement différents), le rejet est dû à :","choices":["Une infection bactérienne post-opératoire","La reconnaissance des molécules CMH du donneur comme ''non-soi'' par les LT du receveur","Un déficit en anticorps chez le receveur","Une incompatibilité du groupe ABO uniquement"],"correct_index":1,"latex":false}',
'{"text_fr":"Le rejet de greffe = réaction immunitaire du receveur contre les molécules CMH du donneur (perçues comme ''non-soi''). Les LT CD4+ et CD8+ du receveur s''activent contre les cellules du greffon. Pour minimiser le rejet : typage HLA du donneur et receveur (compatibilité maximale) + immunosuppresseurs (ciclosporine, tacrolimus qui inhibent les LT). Le rejet peut être aigu ou chronique."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001516');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001517','33333333-0000-0000-0000-000000000040','mcq',3,'fr',
'{"stem":"Les molécules HLA (Human Leukocyte Antigens) sont codées par :","choices":["Le chromosome Y","Des gènes situés sur le chromosome 6 (région CMH)","Des plasmides extrachromosomiques","Le mitochondrion"],"correct_index":1,"latex":false}',
'{"text_fr":"Le CMH humain (HLA) est encodé par un groupe de gènes sur le chromosome 6 (région 6p21.3), l''une des régions génomiques les plus polymorphes connues (plus de 10 000 allèles pour certains loci HLA). Ce polymorphisme extrême explique la quasi-impossibilité de trouver deux individus non apparentés avec un HLA identique (sauf jumeaux homozygotes)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001517');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001518','33333333-0000-0000-0000-000000000040','mcq',4,'fr',
'{"stem":"La présentation d''antigènes via le CMH-I active quel type de lymphocyte T ?","choices":["LT CD4+ auxiliaires (helper)","LT CD8+ cytotoxiques","Lymphocytes B","Cellules NK"],"correct_index":1,"latex":false}',
'{"text_fr":"CMH-I → LT CD8+ (cytotoxiques/CTL). CMH-II → LT CD4+ (auxiliaires/helper). Règle mnémotechnique : I × 8 = 8 (CD8) ; II × 4 = 8 → non, mémoriser directement. Le CD8 interagit avec le CMH-I (cellules infectées/tumorales), le CD4 interagit avec le CMH-II (CPP). Les LT CD8+ détruisent les cellules présentant des peptides étrangers via le CMH-I (perforine/granzyme + FasL)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001518');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001519','33333333-0000-0000-0000-000000000040','mcq',4,'fr',
'{"stem":"L''anergie clonale est un mécanisme de tolérance périphérique qui :","choices":["Détruit les LT auto-réactifs dans le thymus","Inactives les LT auto-réactifs en périphérie en l''absence de signal de co-stimulation","Active les LT en l''absence d''antigènes","Augmente la production d''auto-anticorps"],"correct_index":1,"latex":false}',
'{"text_fr":"L''anergie clonale : un LT T reconnaît son antigène (signal 1 via TCR) mais sans le signal de co-stimulation (CD28-B7) → le LT devient anergique (non-réactif) plutôt qu''activé. C''est un mécanisme de tolérance périphérique (en dehors du thymus). Les LT régulateurs (Treg, CD4+CD25+FoxP3+) constituent un autre mécanisme de tolérance périphérique en supprimant activement les réponses auto-immunes."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001519');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001520','33333333-0000-0000-0000-000000000040','mcq',4,'fr',
'{"stem":"La compatibilité ABO pour les transfusions sanguines repose sur :","choices":["Les molécules HLA des globules rouges","Les antigènes glucidiques (glycolipides) de surface des érythrocytes et les anticorps naturels correspondants","Les lymphocytes T","Les protéines du complément uniquement"],"correct_index":1,"latex":false}',
'{"text_fr":"Système ABO : antigènes A et/ou B sont des glycolipides de surface des GR. Anticorps naturels (dits ''naturels'' car présents sans immunisation préalable) : groupe A → anti-B ; groupe B → anti-A ; groupe O → anti-A et anti-B ; groupe AB → aucun anticorps. Transfusion incompatible → agglutination des GR + activation du complément → hémolyse intravasculaire → choc anaphylactique."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001520');

-- Numeric items for self_nonself
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001521','33333333-0000-0000-0000-000000000040','numeric',2,'fr',
'{"stem":"Combien de classes de molécules CMH existent (CMH-I et CMH-II) ?","correct_value":2,"tolerance":0,"unit":"classes","latex":false}',
'{"text_fr":"Il existe 2 classes principales de molécules CMH : CMH de classe I (présent sur toutes les cellules nucléées, présente aux LT CD8+) et CMH de classe II (présent sur les cellules présentatrices professionnelles, présente aux LT CD4+). Une classe III existe aussi (protéines du complément, cytokines) mais n''est généralement pas comptée dans le contexte de la présentation antigénique."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001521');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001522','33333333-0000-0000-0000-000000000040','numeric',3,'fr',
'{"stem":"Quel pourcentage des thymocytes survit à la double sélection (positive + négative) dans le thymus ?","correct_value":3,"tolerance":2,"unit":"%","latex":false}',
'{"text_fr":"~95-98% des thymocytes meurent par apoptose lors de la sélection positive (ne reconnaissent pas le CMH) ou négative (réagissent trop fort contre le soi). Seulement 2-5% (≈ 3% en valeur centrale) deviennent des LT matures. Ce ''gâchis apparent'' est le prix de la tolérance : il vaut mieux éliminer des LT compétents que laisser des LT auto-réactifs déclencher une auto-immunité."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001522');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001523','33333333-0000-0000-0000-000000000040','numeric',3,'fr',
'{"stem":"Combien de groupes sanguins ABO différents existent ?","correct_value":4,"tolerance":0,"unit":"groupes","latex":false}',
'{"text_fr":"4 groupes sanguins ABO : A, B, AB, O. Déterminés par 3 allèles (IA, IB, i) : IA et IB sont codominants, i est récessif. Génotypes possibles : IAIA ou IAi (groupe A), IBIB ou IBi (groupe B), IAIB (groupe AB), ii (groupe O). En transfusion, O est donneur universel (pas d''antigènes), AB est receveur universel (pas d''anticorps anti-A ou anti-B)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001523');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001524','33333333-0000-0000-0000-000000000040','numeric',4,'fr',
'{"stem":"Le locus HLA-A possède plus de 3000 allèles connus. Si la population mondiale compte ~8 milliards de personnes, combien d''individus auraient exactement le même allèle HLA-A1 (en supposant une fréquence uniforme de 1/3000) ?","correct_value":2666667,"tolerance":100000,"unit":"personnes","latex":true}',
'{"text_fr":"8 × 10⁹ ÷ 3000 ≈ 2,67 × 10⁶ = 2 666 667 personnes. Mais pour trouver 2 individus identiques sur l''ensemble des loci HLA (A, B, C, DR, DQ, DP), la probabilité est astronomiquement faible (sauf jumeaux). C''est pourquoi la compatibilité totale HLA entre non-apparentés est quasi-impossible et les greffes nécessitent des immunosuppresseurs."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001524');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001525','33333333-0000-0000-0000-000000000040','numeric',4,'fr',
'{"stem":"Un enfant de groupe sanguin O (ii) a une mère de groupe A. Combien de génotypes possibles la mère peut-elle avoir ?","correct_value":1,"tolerance":0,"unit":"génotypes","latex":false}',
'{"text_fr":"L''enfant ii a reçu i de chaque parent. La mère de groupe A peut être IAIA ou IAi. Mais elle doit avoir transmis i à l''enfant → elle doit OBLIGATOIREMENT être IAi (hétérozygote). Donc 1 seul génotype possible pour la mère : IAi. Si la mère était IAIA, elle ne pourrait pas donner i → enfant ne pourrait pas être ii. Raisonnement classique de génétique au BAC."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001525');

-- Sequence items for self_nonself
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001526','33333333-0000-0000-0000-000000000040','ordering',3,'fr',
'{"stem":"Ordonnez les étapes de la présentation antigénique via le CMH-II par un macrophage :","items":["Présentation du complexe CMH-II + peptide à un LT CD4+","Phagocytose d''un pathogène extracellulaire","Dégradation du pathogène en peptides dans les lysosomes","Chargement des peptides sur les molécules CMH-II dans les endosomes"],"correct_order":[1,2,3,0],"latex":false}',
'{"text_fr":"1) Phagocytose : le macrophage ingère le pathogène dans un phagosome. 2) Fusion phagosome-lysosome → dégradation enzymatique en peptides (pH acide, protéases). 3) Les endosomes contenant les peptides fusionnent avec des vésicules portant le CMH-II → chargement peptide/CMH-II. 4) Le complexe CMH-II/peptide migre à la surface et est reconnu par le TCR d''un LT CD4+ → activation de la réponse immunitaire adaptative."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001526');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001527','33333333-0000-0000-0000-000000000040','ordering',4,'fr',
'{"stem":"Ordonnez les événements lors d''un rejet aigu de greffe de rein :","items":["Les LT cytotoxiques CD8+ du receveur détruisent les cellules du greffon","Les LT CD4+ du receveur reconnaissent les CMH du donneur","Réduction de la fonction rénale du greffon","Activation et prolifération clonale des LT spécifiques"],"correct_order":[1,3,0,2],"latex":false}',
'{"text_fr":"1) Les LT CD4+ du receveur reconnaissent les molécules HLA du donneur comme étrangères (voie directe ou indirecte). 2) Activation et expansion clonale → LT CD4+ helper + LT CD8+ cytotoxiques spécifiques. 3) Les LT CD8+ lysent les cellules du greffon exprimant le CMH-I du donneur (perforine/granzyme). 4) Destruction progressive du parenchyme rénal → perte de fonction → rejet. Traitement : immunosuppresseurs (ciclosporine, tacrolimus)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001527');

-- ============================================================
-- SKILL 041: specific_immunity (IDs 1528-1542)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001528','33333333-0000-0000-0000-000000000041','mcq',2,'fr',
'{"stem":"Les anticorps sont produits par :","choices":["Les lymphocytes T cytotoxiques","Les plasmocytes (lymphocytes B différenciés)","Les macrophages","Les cellules NK"],"correct_index":1,"latex":false}',
'{"text_fr":"Les plasmocytes sont des lymphocytes B activés et différenciés. Après stimulation par un antigène + signaux des LT CD4+ auxiliaires, le LB prolifère (expansion clonale) et se différencie en plasmocytes sécréteurs d''anticorps (immunoglobulines). Un plasmocyte peut sécréter jusqu''à 2000 anticorps/seconde. Certains LB deviennent des cellules mémoire à longue durée de vie."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001528');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001529','33333333-0000-0000-0000-000000000041','mcq',2,'fr',
'{"stem":"La structure basique d''un anticorps (immunoglobuline) est :","choices":["Un polypeptide unique","Deux chaînes lourdes + deux chaînes légères reliées par des ponts disulfure (structure en Y)","Quatre chaînes lourdes identiques","Un ARN bicaténaire"],"correct_index":1,"latex":false}',
'{"text_fr":"Structure d''un anticorps : 2 chaînes lourdes (H) + 2 chaînes légères (L) → hétérotétramère en forme de Y, reliées par des ponts disulfure (S-S). Chaque chaîne a une région variable (V, qui lie l''antigène) et une région constante (C, qui détermine la classe). Les 2 sites de liaison à l''antigène (paratopes) sont formés par VH + VL de chaque bras du Y."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001529');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001530','33333333-0000-0000-0000-000000000041','mcq',2,'fr',
'{"stem":"La mémoire immunitaire est due à :","choices":["Des anticorps persistants indéfiniment","Des cellules B et T mémoires à longue durée de vie qui répondent plus rapidement lors d''un second contact","Une production continue de cytokines","L''activation permanente du complément"],"correct_index":1,"latex":false}',
'{"text_fr":"Lors d''une primo-infection, des lymphocytes B et T mémoires à longue durée de vie sont générés. Lors d''un second contact avec le même antigène, ces cellules mémoires répondent plus rapidement (2-3 jours vs 1-2 semaines) et plus fortement (plus d''anticorps, meilleure affinité). C''est le principe de la vaccination : induire une mémoire immunitaire sans maladie."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001530');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001531','33333333-0000-0000-0000-000000000041','mcq',3,'fr',
'{"stem":"L''activation d''un lymphocyte B naïf nécessite :","choices":["Seulement la liaison de l''antigène à son BCR","La liaison antigène-BCR + les signaux co-stimulateurs des LT CD4+ auxiliaires (aide T-dépendante)","Uniquement des cytokines sans contact cellulaire","La reconnaissance du CMH-I"],"correct_index":1,"latex":false}',
'{"text_fr":"Activation complète du LB (pour antigènes T-dépendants) : 1) Signal 1 : liaison antigène-BCR (B cell receptor) → internalisation + présentation au CMH-II. 2) Signal 2 : LT CD4+ reconnaît le complexe CMH-II/peptide + co-stimulation CD40-CD40L + cytokines (IL-4, IL-21). Sans aide T, le LB peut répondre de façon limitée aux antigènes T-indépendants (polysaccharides bactériens) mais sans commutation isotypique ni mémoire."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001531');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001532','33333333-0000-0000-0000-000000000041','mcq',3,'fr',
'{"stem":"Quel type d''immunoglobuline est le plus abondant dans le sérum et assure la protection à long terme ?","choices":["IgM","IgA","IgG","IgE"],"correct_index":2,"latex":false}',
'{"text_fr":"IgG : 75-80% des Ig sériques, monovalent (mais 2 sites Ag), longue demi-vie (~21 jours), traverse le placenta (protection du fœtus). IgM : pentamère, première à apparaître (réponse primaire), forte activation du complément. IgA : dimérique dans les sécrétions (larmes, salive, lait maternel), immunité muqueuse. IgE : très faible concentration, rôle dans les allergies et anti-parasitaires."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001532');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001533','33333333-0000-0000-0000-000000000041','mcq',3,'fr',
'{"stem":"L''immunité cellulaire spécifique est principalement assurée par :","choices":["Les anticorps et les plasmocytes","Les lymphocytes T cytotoxiques (CD8+) qui éliminent les cellules infectées","Les polynucléaires neutrophiles","Le système du complément"],"correct_index":1,"latex":false}',
'{"text_fr":"L''immunité cellulaire = LT CD8+ cytotoxiques qui détruisent les cellules infectées par virus (présentant des peptides viraux sur CMH-I). Mécanismes de cytotoxicité : 1) Perforine (perfore la membrane) + granzymes (induisent l''apoptose). 2) Voie Fas/FasL → apoptose. 3) Sécrétion de TNF-α. L''immunité humorale (anticorps) cible les pathogènes extracellulaires."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001533');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001534','33333333-0000-0000-0000-000000000041','mcq',4,'fr',
'{"stem":"L''affinité des anticorps augmente lors d''une réponse secondaire grâce à :","choices":["L''augmentation de la dose d''antigène","L''hypermutation somatique dans les centres germinatifs des ganglions lymphatiques","La commutation isotypique IgM→IgG","L''activation du complément"],"correct_index":1,"latex":false}',
'{"text_fr":"L''hypermutation somatique (HMS) : dans les centres germinatifs, les gènes codant les régions variables des Ig subissent des mutations ponctuelles rapides. Les LB avec une meilleure affinité pour l''antigène sont sélectionnés (compétition pour l''Ag limité) → augmentation de l''affinité au cours de la réponse (maturation de l''affinité). Ce processus est unique aux LB et explique pourquoi les anticorps secondaires sont plus efficaces."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001534');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001535','33333333-0000-0000-0000-000000000041','mcq',4,'fr',
'{"stem":"Un vaccin à ARNm (comme les vaccins COVID-19 ARNm) fonctionne en :","choices":["Injectant directement des anticorps anti-COVID","Fournissant des instructions (ARNm) pour que les cellules du receveur synthétisent la protéine virale spike → réponse immunitaire","Administrant des virus atténués","Injectant des LT mémoires spécifiques"],"correct_index":1,"latex":false}',
'{"text_fr":"Vaccin ARNm : l''ARNm encapsulé dans des nanoparticules lipidiques est capté par les cellules musculaires/CPP → traduction ribosomale → synthèse de la protéine spike → présentation au système immunitaire → réponse humorale (anticorps) + cellulaire (LT mémoires). L''ARNm est dégradé en quelques jours (pas d''intégration dans l''ADN). Innovation principale : l''ARNm est modifié (pseudouridine) pour éviter la réponse interféron innée."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001535');

-- Numeric items for specific_immunity
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001536','33333333-0000-0000-0000-000000000041','numeric',2,'fr',
'{"stem":"Combien de sites de liaison à l''antigène possède un anticorps de classe IgG ?","correct_value":2,"tolerance":0,"unit":"sites","latex":false}',
'{"text_fr":"Un IgG est un monomère en forme de Y avec 2 bras Fab → 2 sites de liaison à l''antigène (bivalent). L''IgM pentamérique a théoriquement 10 sites (5 × 2) mais en pratique ~5 sont accessibles (encombrement stérique). La bivalence de l''IgG lui permet de former des complexes immuns (réticulation d''antigènes multivalents), facilitant leur élimination par phagocytose."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001536');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001537','33333333-0000-0000-0000-000000000041','numeric',2,'fr',
'{"stem":"Combien de chaînes polypeptidiques composent un anticorps IgG basique ?","correct_value":4,"tolerance":0,"unit":"chaînes","latex":false}',
'{"text_fr":"Un IgG = 2 chaînes lourdes H (chacune ~50 kDa) + 2 chaînes légères L (chacune ~25 kDa) = 4 chaînes polypeptidiques. Masse totale ≈ 150 kDa. Les chaînes sont reliées par des ponts disulfure (S-S) inter-chaînes et intra-chaînes. La région charnière (hinge) entre les fragments Fab et Fc confère une certaine flexibilité à la molécule."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001537');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001538','33333333-0000-0000-0000-000000000041','numeric',3,'fr',
'{"stem":"La demi-vie des IgG dans le sang est d''environ combien de jours ?","correct_value":21,"tolerance":3,"unit":"jours","latex":false}',
'{"text_fr":"Les IgG ont une demi-vie de ~21 jours (3 semaines), la plus longue des immunoglobulines. Cette longévité est due au recyclage par le récepteur néonatal Fc (FcRn) qui protège les IgG de la dégradation lysosomale. En comparaison : IgM ≈ 10 jours, IgA ≈ 6 jours, IgE ≈ 2 jours. La longue demi-vie des IgG est importante pour la protection durable post-vaccination."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001538');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001539','33333333-0000-0000-0000-000000000041','numeric',4,'fr',
'{"stem":"Un plasmocyte peut sécréter environ combien d''anticorps par seconde ?","correct_value":2000,"tolerance":500,"unit":"anticorps/s","latex":false}',
'{"text_fr":"Un plasmocyte mature sécrète ~2000 molécules d''immunoglobulines par seconde, soit ~10⁸ molécules par heure. Cette production extraordinaire est rendue possible par la différenciation spectaculaire du LB en plasmocyte : expansion massive du réticulum endoplasmique rugueux, réduction du noyau, disparition du BCR de surface. Les plasmocytes à longue durée de vie migrent dans la moelle osseuse et peuvent survivre des décennies."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001539');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001540','33333333-0000-0000-0000-000000000041','numeric',4,'fr',
'{"stem":"Lors d''une réponse immunitaire primaire, les premiers anticorps détectables dans le sérum apparaissent après environ combien de jours ?","correct_value":7,"tolerance":3,"unit":"jours","latex":false}',
'{"text_fr":"Réponse primaire : période de latence de ~5-10 jours (7 jours en valeur centrale) avant que les anticorps soient détectables dans le sérum. Cette latence correspond à l''activation des LB, leur prolifération et différenciation en plasmocytes. La réponse secondaire a une latence de ~2-3 jours seulement (cellules mémoires pré-activées). C''est pourquoi la vaccination nécessite 1-2 semaines pour être pleinement protectrice."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001540');

-- Sequence items for specific_immunity
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001541','33333333-0000-0000-0000-000000000041','ordering',3,'fr',
'{"stem":"Ordonnez les étapes de la réponse humorale après vaccination :","items":["Sécrétion d''anticorps spécifiques par les plasmocytes","Activation des LB naïfs spécifiques de l''antigène vaccinal","Génération de cellules B mémoires à longue durée de vie","Reconnaissance de l''antigène par les LT CD4+ + co-stimulation des LB"],"correct_order":[1,3,0,2],"latex":false}',
'{"text_fr":"1) Les LB naïfs portant un BCR spécifique rencontrent l''antigène vaccinal et l''internalisent. 2) Le LB présente les peptides au CMH-II → reconnaissance par LT CD4+ helper → co-stimulation CD40/CD40L + cytokines (IL-4, IL-21). 3) Les LB activés prolifèrent (expansion clonale) et se différencient en plasmocytes sécréteurs d''anticorps + commutation isotypique IgM→IgG. 4) Certains LB deviennent des cellules mémoires → protection à long terme."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001541');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001542','33333333-0000-0000-0000-000000000041','ordering',4,'fr',
'{"stem":"Ordonnez les étapes de la destruction d''une cellule infectée par un LT CD8+ cytotoxique :","items":["Apoptose de la cellule cible (activation des caspases)","Reconnaissance du complexe CMH-I + peptide viral par le TCR du LT CD8+","Libération de perforine et granzymes par le LT","Formation de la synapse immunologique (contact LT-cellule cible)"],"correct_order":[1,3,2,0],"latex":false}',
'{"text_fr":"1) TCR du LT CD8+ reconnaît spécifiquement CMH-I/peptide viral. 2) Formation de la synapse immunologique (jonction étanche entre LT et cellule cible). 3) Dégranulation : libération de perforine (forme des pores dans la membrane) et granzymes (protéases entrant via les pores). 4) Granzyme B active les caspases → apoptose de la cellule infectée → fragments phagocytés. Le LT CD8+ survit et peut détruire d''autres cibles."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001542');

-- ============================================================
-- SKILL 042: immune_disorders (IDs 1543-1557)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001543','33333333-0000-0000-0000-000000000042','mcq',2,'fr',
'{"stem":"Les maladies auto-immunes se caractérisent par :","choices":["Une réponse immunitaire insuffisante contre les pathogènes","Une réponse immunitaire dirigée contre les propres tissus de l''organisme","Un déficit en lymphocytes B","Une allergie aux médicaments"],"correct_index":1,"latex":false}',
'{"text_fr":"Les maladies auto-immunes (MAI) résultent d''une rupture de tolérance au soi : le système immunitaire attaque les propres cellules/tissus. Exemples : diabète de type 1 (LT détruisent les cellules β du pancréas), polyarthrite rhumatoïde (auto-anticorps anti-CCP), lupus érythémateux systémique (auto-anticorps anti-ADN natif), sclérose en plaques (LT détruisent la myéline). Fréquence : ~5% de la population mondiale."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001543');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001544','33333333-0000-0000-0000-000000000042','mcq',2,'fr',
'{"stem":"Le VIH (virus de l''immunodéficience humaine) détruit principalement :","choices":["Les lymphocytes B","Les lymphocytes T CD4+ auxiliaires","Les neutrophiles","Les érythrocytes"],"correct_index":1,"latex":false}',
'{"text_fr":"Le VIH cible les LT CD4+ (via le récepteur CD4 + co-récepteurs CCR5/CXCR4) → destruction progressive des LT CD4+. La numération CD4+ normale est ~800-1200 cellules/mm³. Le SIDA est déclaré quand CD4+ < 200/mm³, rendant le patient vulnérable aux infections opportunistes (Pneumocystis jirovecii, Toxoplasma, CMV) et aux cancers (sarcome de Kaposi, lymphomes)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001544');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001545','33333333-0000-0000-0000-000000000042','mcq',2,'fr',
'{"stem":"Une allergie est une :","choices":["Déficience immunitaire primaire","Réponse immunitaire exacerbée contre un antigène inoffensif (allergène)","Infection virale chronique","Réaction auto-immune contre les articulations"],"correct_index":1,"latex":false}',
'{"text_fr":"L''allergie (hypersensibilité de type I) : réponse IgE-médiée contre des substances normalement inoffensives (pollen, arachides, poils d''animaux). Mécanisme : sensibilisation (première exposition → production IgE → fixation sur mastocytes) puis déclenchement (re-exposition → pontage IgE → dégranulation mastocytes → histamine, leucotriènes → rhinite, urticaire, anaphylaxie). L''atopie (prédisposition génétique) favorise les allergies."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001545');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001546','33333333-0000-0000-0000-000000000042','mcq',3,'fr',
'{"stem":"Le seuil diagnostique du SIDA (stade C de l''infection VIH) est :","choices":["CD4+ < 500/mm³","CD4+ < 200/mm³ ou présence d''une infection opportuniste","Charge virale > 100 000 copies/mL","Présence d''anticorps anti-VIH dans le sang"],"correct_index":1,"latex":false}',
'{"text_fr":"SIDA déclaré si : CD4+ < 200 cellules/mm³ (ou < 14% des lymphocytes totaux) ET/OU apparition d''une infection opportuniste classante (liste CDC : pneumocystose, toxoplasmose cérébrale, CMV rétinien, tuberculose disséminée, sarcome de Kaposi...). La présence d''anticorps anti-VIH = séropositivité (pas SIDA). La charge virale mesure l''ARN viral plasmatique (ARN VIH/mL)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001546');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001547','33333333-0000-0000-0000-000000000041','mcq',3,'fr',
'{"stem":"Le mécanisme de l''hypersensibilité immédiate (allergie type I) implique :","choices":["Les LT CD8+ et la perforine","Les IgE fixées sur les mastocytes et les basophiles, libérant de l''histamine","Les auto-anticorps de type IgG contre les cellules propres","Les complexes immuns déposés dans les tissus"],"correct_index":1,"latex":false}',
'{"text_fr":"Type I (anaphylactique) : IgE sur mastocytes → dégranulation → histamine, prostaglandines, leucotriènes → vasodilatation, bronchospasme, urticaire. Type II (cytotoxique) : IgG/IgM contre Ag de surface cellulaire. Type III (complexes immuns) : dépôt de complexes Ag-Ac → activation complément. Type IV (retardée) : LT CD4+ et CD8+, délai 48-72h (ex: test tuberculine, dermite de contact)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001547');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001548','33333333-0000-0000-0000-000000000042','mcq',3,'fr',
'{"stem":"Les déficits immunitaires primaires (DIP) se distinguent des DI secondaires par :","choices":["Leur plus grande fréquence","Leur origine génétique (présents dès la naissance) vs acquis (infection VIH, immunosuppresseurs, malnutrition)","Leur traitement par antibiotiques","Leur association systématique avec le VIH"],"correct_index":1,"latex":false}',
'{"text_fr":"DIP = d''origine génétique, présents dès la naissance. Ex : agammaglobulinémie de Bruton (absence de LB), SCID (déficit immunitaire combiné sévère = absence LT + LB), déficit en C1q. DI secondaires = acquis : VIH/SIDA, traitements immunosuppresseurs (greffes, chimiothérapie), malnutrition sévère, splénectomie. Les DIP sont rares (1/10 000 naissances), les DIS beaucoup plus fréquents."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001548');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001549','33333333-0000-0000-0000-000000000042','mcq',4,'fr',
'{"stem":"Les anticorps monoclonaux thérapeutiques (ex : rituximab, adalimumab) sont produits par :","choices":["Des plasmocytes humains en culture","Des hybridomes (fusion LB + cellule myélomateuse) ou par génie génétique (anticorps recombinants)","Des bactéries pathogènes","Des cellules NK activées"],"correct_index":1,"latex":false}',
'{"text_fr":"Anticorps monoclonaux : un seul clone cellulaire → même spécificité. Méthode classique (Köhler & Milstein 1975, Nobel 1984) : LB immunisé + cellule myélomateuse → hybridome immortel sécrétant 1 Ac spécifique. Méthodes modernes : phage display, transgénèse, anticorps humanisés par génie génétique. Applications : rituximab (anti-CD20, lymphomes B), adalimumab (anti-TNFα, polyarthrite), trastuzumab (anti-HER2, cancer sein)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001549');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001550','33333333-0000-0000-0000-000000000042','mcq',4,'fr',
'{"stem":"Le mécanisme moléculaire par lequel le VIH échappe à la réponse immunitaire comprend :","choices":["La production massive d''IgE","La variabilité antigénique (mutations rapides des protéines de surface gp120/gp41) et la latence dans les LT CD4+ mémoires","L''inactivation de l''ARN polymérase","La destruction des cellules NK uniquement"],"correct_index":1,"latex":false}',
'{"text_fr":"Le VIH échappe à l''immunité par : 1) Mutation rapide (RT très infidèle → 10⁻⁴ mutations/pb/cycle → diversité antigénique de gp120). 2) Latence dans les LT CD4+ mémoires quiescents (réservoir viral) → invisible au système immunitaire. 3) Régulation à la baisse du CMH-I (la protéine Nef internalise CD4 et CMH-I). 4) Infection directe des cellules essentielles à la réponse immunitaire adaptative (CD4+ Th)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001550');

-- Numeric items for immune_disorders
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001551','33333333-0000-0000-0000-000000000042','numeric',2,'fr',
'{"stem":"Le taux normal de lymphocytes T CD4+ dans le sang est d''environ combien de cellules par mm³ (valeur moyenne) ?","correct_value":1000,"tolerance":200,"unit":"cellules/mm³","latex":false}',
'{"text_fr":"Valeurs normales CD4+ : 500-1500 cellules/mm³ (moyenne ≈ 800-1000/mm³). En cas d''infection VIH non traitée, les CD4+ diminuent progressivement (~50-100/mm³ par an). SIDA déclaré < 200/mm³. Le suivi des CD4+ est un marqueur pronostique clé pour les patients VIH+. Les antirétroviraux (trithérapie ARV) permettent de maintenir les CD4+ > 500/mm³."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001551');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001552','33333333-0000-0000-0000-000000000042','numeric',3,'fr',
'{"stem":"En combien de types d''hypersensibilité (types I à IV) la classification de Gell et Coombs divise-t-elle les réactions allergiques ?","correct_value":4,"tolerance":0,"unit":"types","latex":false}',
'{"text_fr":"Classification de Gell et Coombs (1963) : 4 types d''hypersensibilité. Type I (IgE-médiée, immédiate) : allergies classiques. Type II (cytotoxique, IgG/IgM) : anémie hémolytique auto-immune. Type III (complexes immuns, IgG) : lupus, maladie sérique. Type IV (retardée, LT) : dermite de contact, test tuberculine, maladie cœliaque. Les types I-III sont médiés par des anticorps, le type IV par des lymphocytes T."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001552');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001553','33333333-0000-0000-0000-000000000042','numeric',3,'fr',
'{"stem":"Sans traitement antirétroviral, combien d''années s''écoulent en moyenne entre la primo-infection VIH et le stade SIDA ?","correct_value":10,"tolerance":3,"unit":"années","latex":false}',
'{"text_fr":"Sans traitement : ~10 ans en moyenne entre la primo-infection VIH et le stade SIDA (très variable : de 2 ans pour les ''progresseurs rapides'' à >20 ans pour les ''non-progresseurs à long terme'' ou ''elite controllers''). Phases : primo-infection (syndrome viral aigu, 3-6 semaines) → phase asymptomatique (~10 ans, CD4+ en déclin lent) → phase symptomatique → SIDA. Avec trithérapie ARV, l''espérance de vie rejoint celle de la population générale."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001553');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001554','33333333-0000-0000-0000-000000000042','numeric',4,'fr',
'{"stem":"Le diabète de type 1 détruit les cellules β du pancréas. Ces cellules représentent environ quel pourcentage des cellules des îlots de Langerhans ?","correct_value":70,"tolerance":10,"unit":"%","latex":false}',
'{"text_fr":"Les îlots de Langerhans contiennent : ~70% cellules β (insuline), ~20% cellules α (glucagon), ~5% cellules δ (somatostatine), ~1-2% cellules PP (polypeptide pancréatique). Dans le DT1, les LT CD8+ auto-réactifs (reconnaissant des peptides du soi comme GAD65, insuline, IA-2) détruisent sélectivement les cellules β. Les symptômes apparaissent quand >80% des cellules β sont détruites."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001554');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001555','33333333-0000-0000-0000-000000000042','numeric',4,'fr',
'{"stem":"La ciclosporine utilisée en immunosuppression inhibe la calcineurine, bloquant ainsi la production de quelle cytokine clé pour l''activation des LT ?","correct_value":2,"tolerance":0,"unit":"IL-","latex":false}',
'{"text_fr":"La ciclosporine bloque la calcineurine (une phosphatase) → inhibe la déphosphorylation de NFAT → NFAT reste dans le cytoplasme → pas de transcription du gène IL-2. Sans IL-2, les LT ne peuvent pas proliférer (expansion clonale impossible). Réponse : IL-2 (interleukine-2). La ciclosporine révolutionna les greffes d''organes dans les années 1980. Effet secondaire majeur : néphrotoxicité."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001555');

-- Sequence items for immune_disorders
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001556','33333333-0000-0000-0000-000000000042','ordering',3,'fr',
'{"stem":"Ordonnez les événements d''une réaction anaphylactique sévère (allergie type I) :","items":["Dégranulation des mastocytes → libération d''histamine et leucotriènes","Choc anaphylactique : hypotension, bronchospasme, urticaire","Primo-sensibilisation : production d''IgE spécifiques fixées sur les mastocytes","Second contact avec l''allergène : pontage des IgE par l''allergène"],"correct_order":[2,3,0,1],"latex":false}',
'{"text_fr":"1) Sensibilisation (premier contact) : LB → plasmocytes → IgE anti-allergène → IgE se fixent sur récepteurs Fc des mastocytes/basophiles. 2) Second contact : l''allergène ponté entre 2 IgE adjacentes sur le mastocyte. 3) Signal intracellulaire → dégranulation : histamine, tryptase, leucotriènes, prostaglandines. 4) Effets systémiques : vasodilatation massive + bronchospasme + urticaire → choc. Traitement d''urgence : adrénaline auto-injectable (EpiPen)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001556');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001557','33333333-0000-0000-0000-000000000042','ordering',4,'fr',
'{"stem":"Ordonnez les étapes de l''infection par le VIH au niveau cellulaire :","items":["Transcription inverse : ARN viral → ADNc double brin (par la RT)","Intégration de l''ADN proviral dans le génome du LT CD4+","Fixation de gp120 sur le CD4 + co-récepteur (CCR5 ou CXCR4) et fusion","Production de nouveaux virions et bourgeonnement"],"correct_order":[2,0,1,3],"latex":false}',
'{"text_fr":"1) Liaison gp120/CD4 + co-récepteur → fusion de l''enveloppe virale avec la membrane du LT CD4+ → libération de la capside dans le cytoplasme. 2) Transcriptase inverse (RT) transforme l''ARN viral en ADNc double brin (étape inhibée par INTI/INNTI). 3) Intégrase insère l''ADN proviral dans le chromosome du LT (réservoir latent, étape inhibée par les inhibiteurs d''intégrase). 4) Transcription/traduction + assemblage → bourgeonnement des virions → maturation par la protéase (étape inhibée par les inhibiteurs de protéase)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001557');

-- ============================================================
-- SKILL 043: tectonic_deformations (IDs 1558-1572)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001558','33333333-0000-0000-0000-000000000043','mcq',2,'fr',
'{"stem":"Les plis géologiques se forment par :","choices":["Extension tectonique (divergence)","Compression tectonique qui déforme les roches de façon ductile","Fusion partielle des roches","Érosion par l''eau"],"correct_index":1,"latex":false}',
'{"text_fr":"Les plis = déformation ductile des roches sous compression. La roche se plisse comme une feuille de papier comprimée. Conditions : pression et température élevées (profondeur), déformation lente. Vocabulaire : anticlinal (voûte, convexe vers le haut), synclinal (cuvette, concave vers le haut), axe du pli, flancs. Associés aux zones de subduction et de collision (orogénèse)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001558');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001559','33333333-0000-0000-0000-000000000043','mcq',2,'fr',
'{"stem":"Une faille normale est caractéristique d''un régime tectonique :","choices":["Compressif","Extensif (distension)","De décrochement (cisaillement)","Neutre (aucune contrainte)"],"correct_index":1,"latex":false}',
'{"text_fr":"Faille normale : le compartiment supérieur (toit) glisse vers le bas par rapport au mur. Indique une extension crustale (étirement). Associée aux rifts (fossés d''effondrement), dorsales océaniques, marges passives. En revanche, faille inverse : toit monte par rapport au mur → compression (chaînes de montagnes). Faille décrochante : mouvement horizontal (ex: faille de San Andreas, faille du Levant)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001559');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001560','33333333-0000-0000-0000-000000000043','mcq',3,'fr',
'{"stem":"La déformation fragile des roches se produit quand :","choices":["La roche est soumise à des pressions extrêmes en profondeur","La roche est soumise à des contraintes supérieures à sa limite de rupture en surface (basse température et pression)","La roche fond partiellement","La roche subit une métamorphose"],"correct_index":1,"latex":false}',
'{"text_fr":"Déformation fragile : la roche casse (failles, fractures, diaclases) quand la contrainte dépasse sa résistance. Se produit en surface ou en faible profondeur (basse T et P). Déformation ductile : la roche se plisse et coule lentement → profondeur (haute T et P). La limite fragile/ductile est vers ~15-20 km de profondeur pour la croûte continentale (zone sismogène). Au-delà : déformation ductile et asismique."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001560');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001561','33333333-0000-0000-0000-000000000043','mcq',3,'fr',
'{"stem":"Les ophiolites sont des fragments de :","choices":["Croûte continentale ancienne charriée","Croûte océanique obductée (chevauchée) sur la croûte continentale","Roches volcaniques continentales","Sédiments carbonatés métamorphisés"],"correct_index":1,"latex":false}',
'{"text_fr":"Ophiolites = séquence de roches caractéristiques de la croûte océanique (de haut en bas : sédiments pélagiques → basaltes en coussins → dykes doléritiques → gabbros → péridotites serpentinisées) retrouvée sur les continents lors d''une obduction (chevauchement de la croûte océanique sur la continentale). Exemples : Oman, Troodos (Chypre), Maroc (Beni Bousera partiel)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001561');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001562','33333333-0000-0000-0000-000000000043','mcq',3,'fr',
'{"stem":"La subduction est le processus par lequel :","choices":["Deux plaques continentales entrent en collision et forment des montagnes","Une plaque océanique dense plonge sous une autre plaque (océanique ou continentale)","La lithosphère s''étire et se fracture pour former un rift","Les plaques glissent horizontalement l''une par rapport à l''autre"],"correct_index":1,"latex":false}',
'{"text_fr":"Subduction : la plaque océanique (plus dense, basaltique, ~3,0 g/cm³) plonge sous la plaque adjacente. Conséquences : fossé océanique (fosse), arc volcanique (déshydratation de la plaque subduite → fusion du manteau → volcanisme), séismes profonds (jusqu''à 700 km), mélanges (mélange tectonique), métamorphisme HP-BT (faciès schiste bleu). Exemples : andes (subduction sous Amérique du Sud), Japon."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001562');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001563','33333333-0000-0000-0000-000000000043','mcq',4,'fr',
'{"stem":"Les schistes bleus (glaucophane) témoignent de :","choices":["Un métamorphisme à haute température et basse pression","Un métamorphisme à haute pression et basse température typique de la subduction","Un métamorphisme de contact","Un magmatisme alcalin"],"correct_index":1,"latex":false}',
'{"text_fr":"Le faciès schiste bleu (glaucophane + lawsonite ± jadéite) indique des conditions HP-BT (haute pression, basse température), caractéristiques des zones de subduction (gradient géothermique froid). La roche descend rapidement → pression augmente vite, température augmente lentement. Associations P-T : 0,7-2,5 GPa / 200-500°C. Témoins de paléosubductions dans les chaînes de montagnes."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001563');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001564','33333333-0000-0000-0000-000000000043','mcq',4,'fr',
'{"stem":"Le chevauchement de nappes (nappe de charriage) résulte de :","choices":["L''érosion différentielle","La compression tectonique déplaçant de grandes masses rocheuses sur de longues distances","La décompression lors de l''exhumation","La solidification du magma en surface"],"correct_index":1,"latex":false}',
'{"text_fr":"Nappe de charriage : grande masse rocheuse déplacée horizontalement sur des dizaines à centaines de kilomètres par des failles de chevauchement (failles inverses à faible pendage) sous l''effet de la compression. On distingue la fenêtre tectonique (fenêtre dans la nappe exposant les roches sous-jacentes) et le klippe (lambeau de nappe isolé par l''érosion). Classiques dans les Alpes, Pyrénées, Himalaya."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001564');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001565','33333333-0000-0000-0000-000000000043','mcq',4,'fr',
'{"stem":"Dans un anticlinal érodé, les roches les plus anciennes se trouvent :","choices":["Au cœur (au centre) de l''anticlinal","En périphérie (aux flancs) de l''anticlinal","Dans les synclinaux adjacents","À la surface uniquement"],"correct_index":0,"latex":false}',
'{"text_fr":"Dans un anticlinal (voûte), les couches plongent des deux côtés vers l''extérieur. Après érosion, c''est le cœur (noyau) qui est exposé en surface, révélant les roches les plus anciennes (déposées en premier, donc en profondeur). Dans un synclinal (cuvette), c''est l''inverse : le cœur érodé révèle les roches les plus récentes. Règle du V : les couches dip contre l''érosion dessinent un V."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001565');

-- Numeric items for tectonic_deformations
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001566','33333333-0000-0000-0000-000000000043','numeric',2,'fr',
'{"stem":"La vitesse moyenne de déplacement des plaques tectoniques est de l''ordre de combien de centimètres par an ?","correct_value":5,"tolerance":4,"unit":"cm/an","latex":false}',
'{"text_fr":"Les plaques tectoniques se déplacent à ~1-15 cm/an (moyenne ~5 cm/an, soit environ la vitesse de pousse des ongles). La dorsale médio-atlantique : ~2,5 cm/an (lente). La dorsale Pacifique : ~15 cm/an (rapide). Ces vitesses sont mesurées précisément par GPS différentiel. Sur 100 millions d''années, une plaque peut parcourir ~5000 km = fermeture/ouverture d''un océan."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001566');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001567','33333333-0000-0000-0000-000000000043','numeric',3,'fr',
'{"stem":"La croûte continentale a une épaisseur moyenne d''environ combien de km ?","correct_value":35,"tolerance":10,"unit":"km","latex":false}',
'{"text_fr":"Épaisseur moyenne de la croûte continentale : ~35 km (25-70 km selon les régions). Sous les chaînes de montagnes actives (Himalaya, Andes) : jusqu''à 70-80 km (racine crustale). Sous les plateformes stables : ~30-40 km. La croûte océanique est beaucoup plus mince : ~7 km (5-10 km). La limite croûte/manteau est le Moho (discontinuité de Mohorovičić, identifiée par sismologie)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001567');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001568','33333333-0000-0000-0000-000000000043','numeric',3,'fr',
'{"stem":"Le gradient géothermique moyen dans la croûte continentale est d''environ combien de °C par km ?","correct_value":30,"tolerance":10,"unit":"°C/km","latex":false}',
'{"text_fr":"Gradient géothermique moyen ≈ 25-35°C/km (valeur courante : 30°C/km). Ce gradient varie : plus élevé dans les zones volcaniques/rifts (~80-100°C/km), plus faible dans les zones de subduction froide (~10-15°C/km). À 100 km de profondeur, la T ≈ 1200-1400°C (liquidus du manteau → asthénosphère partiellement fondue). Ce gradient détermine le faciès métamorphique atteint lors de l''enfouissement."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001568');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001569','33333333-0000-0000-0000-000000000043','numeric',4,'fr',
'{"stem":"La fosse des Mariannes (Pacifique occidental) atteint une profondeur maximale d''environ combien de km ?","correct_value":11,"tolerance":1,"unit":"km","latex":false}',
'{"text_fr":"La fosse des Mariannes est la plus profonde au monde : ~11 km (10 924 m au ''Challenger Deep''). C''est la zone de subduction de la plaque Pacifique sous la plaque des Mariannes. Pour comparaison, l''Everest fait 8,8 km → la fosse est plus profonde que la plus haute montagne. La pression au fond est ~1100 bars. La première descente : bathyscaphe Trieste (Walsh & Piccard, 1960)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001569');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001570','33333333-0000-0000-0000-000000000043','numeric',4,'fr',
'{"stem":"L''ouverture de l''Atlantique a commencé il y a environ combien de millions d''années (Ma) ?","correct_value":180,"tolerance":20,"unit":"Ma","latex":false}',
'{"text_fr":"L''Atlantique s''est ouvert il y a ~180 Ma (Jurassique) par rifting de la Pangée, d''abord l''Atlantique Nord puis l''Atlantique Sud (~130 Ma). La dorsale médio-atlantique est active depuis lors. Preuve : anomalies magnétiques symétriques de part et d''autre de la dorsale (bandes d''âge croissant vers les marges). Vitesse d''expansion actuelle : ~2,5 cm/an → en 180 Ma, largeur ~4500 km."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001570');

-- Sequence items for tectonic_deformations
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001571','33333333-0000-0000-0000-000000000043','ordering',3,'fr',
'{"stem":"Ordonnez les étapes de formation d''une chaîne de montagnes par collision continentale :","items":["Collision continentale : les deux croûtes continentales s''affrontent → épaississement crustal, plis et chevauchements","Fermeture complète de l''océan et fin de la subduction","Rifting et ouverture d''un océan entre deux plaques continentales","Subduction de la croûte océanique sous la marge active"],"correct_order":[2,3,1,0],"latex":false}',
'{"text_fr":"Cycle de Wilson : 1) Rifting continental → ouverture d''un océan (ex : Atlantique actuel). 2) Expansion océanique → subduction de la croûte océanique vieillie et dense sous la marge active (ex : Andes). 3) Fermeture complète de l''océan (disparition). 4) Collision continent-continent → chaîne de montagnes (ex : Himalaya = collision Inde/Eurasie). Ce cycle dure ~100-200 Ma."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001571');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001572','33333333-0000-0000-0000-000000000043','ordering',4,'fr',
'{"stem":"Ordonnez les indices utilisés pour reconstituer la paléogéographie (position ancienne des continents) :","items":["Symétrie des anomalies magnétiques de part et d''autre des dorsales","Correspondance des faunes et flores fossiles entre continents séparés","Fit géométrique des côtes continentales (puzzle de Wegener)","Continuité des chaînes de montagnes et des formations géologiques entre continents"],"correct_order":[2,1,3,0],"latex":false}',
'{"text_fr":"Reconstruction paléogéographique (dérive des continents, Wegener 1912) : 1) Fit géométrique : les côtes de l''Amérique du Sud et de l''Afrique s''emboîtent parfaitement. 2) Fossiles identiques de part et d''autre de l''Atlantique (Glossopteris, Mesosaurus). 3) Continuité des Appalaches/Caledonides et des roches du Precambrien. 4) Anomalies magnétiques (preuve instrumentale de l''expansion océanique, Vine & Matthews 1963)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001572');

-- ============================================================
-- SKILL 044: metamorphism (IDs 1573-1587)
-- ============================================================
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001573','33333333-0000-0000-0000-000000000044','mcq',2,'fr',
'{"stem":"Le métamorphisme est la transformation d''une roche :","choices":["Par fusion et cristallisation","À l''état solide sous l''effet de la température et/ou pression, sans fusion","Par érosion et dépôt","Par dissolution chimique en surface"],"correct_index":1,"latex":false}',
'{"text_fr":"Le métamorphisme = transformation minéralogique et texturale d''une roche à l''état SOLIDE (subsolidus), sous l''action de T et/ou P, sans passer par un stade liquide. Si la roche fond : c''est du magmatisme (anatexie). Les minéraux métastables se réorganisent en minéraux stables dans les nouvelles conditions P-T. La roche mère (protolithe) peut être sédimentaire (paramétamorphisme) ou magmatique (orthométamorphisme)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001573');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001574','33333333-0000-0000-0000-000000000044','mcq',2,'fr',
'{"stem":"Le marbre est une roche métamorphique dérivée de :","choices":["L''ardoise","Le granite","Le calcaire (CaCO3)","Le basalte"],"correct_index":2,"latex":false}',
'{"text_fr":"Marbre = métamorphisme du calcaire (CaCO3) ou de la dolomie. Les grains de calcite/dolomite recristallisent → texture grenue (saccharoïde). D''autres exemples : ardoise → phyllite → micaschiste → gneiss (métamorphisme progressif des argilites). Quartzite = métamorphisme du grès (SiO2). Amphibolite = métamorphisme de basalte. Éclogite = métamorphisme très HP du basalte (subduction profonde)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001574');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001575','33333333-0000-0000-0000-000000000044','mcq',3,'fr',
'{"stem":"La foliiation (schistosité) dans une roche métamorphique s''explique par :","choices":["La fusion partielle de certains minéraux","L''orientation préférentielle des minéraux plats (micas) perpendiculairement à la contrainte maximale","La dissolution des carbonates","Un refroidissement rapide"],"correct_index":1,"latex":false}',
'{"text_fr":"La schistosité/foliation = organisation des minéraux en plans parallèles sous l''effet de la compression (contrainte différentielle). Les minéraux plats (micas, chlorite, amphiboles) s''orientent perpendiculairement à la contrainte maximale (σ1). Résultat : la roche se débite facilement selon ces plans. Utile en BAC : distinguer la schistosité (métamorphisme + déformation) du litage (sédimentation)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001575');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001576','33333333-0000-0000-0000-000000000044','mcq',3,'fr',
'{"stem":"Les minéraux index (ou minéraux repères) permettent de définir :","choices":["L''âge de la roche par datation radiométrique","Les conditions P-T du métamorphisme (isograde métamorphique)","La composition chimique originelle du protolithe","La vitesse de refroidissement du magma"],"correct_index":1,"latex":false}',
'{"text_fr":"Les minéraux index (Barrow, 1893, dans les Highlands écossais) apparaissent dans un ordre croissant de T : chlorite → biotite → grenat → staurotide → disthène → sillimanite. Chaque apparition définit un isograde (ligne de même degré de métamorphisme sur une carte). Permet de reconstituer le gradient géothermique paléo et les conditions P-T lors du métamorphisme régional."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001576');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001577','33333333-0000-0000-0000-000000000044','mcq',3,'fr',
'{"stem":"Le métamorphisme de contact se distingue du métamorphisme régional par :","choices":["Une pression plus élevée","Une zone affectée plus étendue","Une cause principalement thermique (intrusion magmatique) sur une zone limitée, sans déformation notable","Une déformation ductile intense"],"correct_index":2,"latex":false}',
'{"text_fr":"Métamorphisme de contact : chaleur d''un pluton intrusif → auréole thermique (~quelques km) autour de l''intrusion. Pression = pression lithostatique normale (non différentielle) → pas de déformation → roches cornéennes (textures granoblastiques, pas de foliation). Métamorphisme régional : grande surface, T et P élevées, déformation associée, foliation → en contexte de subduction ou collision."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001577');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001578','33333333-0000-0000-0000-000000000044','mcq',4,'fr',
'{"stem":"L''éclogite est caractérisée par l''assemblage minéralogique :","choices":["Quartz + Feldspath + Mica (granite métamorphisé)","Glaucophane + Lawsonite (schiste bleu)","Grenat pyrope + Omphacite (clinopyroxène riche en jadéite)","Biotite + Amphibole + Plagioclase (amphibolite)"],"correct_index":2,"latex":false}',
'{"text_fr":"L''éclogite = faciès de très haute pression (≥ 1,5-2 GPa) + haute température (500-800°C), formée par subduction profonde d''une croûte océanique ou continentale. Minéraux diagnostiques : grenat pyrope (Mg-riche, rouge) + omphacite (clinopyroxène jadéitique, vert). Densité très élevée (~3,4 g/cm³). La remontée (exhumation) rapide permet de les préserver. Exemples : Alpes (Zermatt-Saas), Norvège."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001578');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001579','33333333-0000-0000-0000-000000000044','mcq',4,'fr',
'{"stem":"Le rétro-métamorphisme (rétrogression) désigne :","choices":["Un métamorphisme à haute pression","La transformation des minéraux de haute P-T en minéraux stables à plus basse P-T lors de l''exhumation","La fusion partielle d''une roche métamorphique","La déformation fragile d''une éclogite"],"correct_index":1,"latex":false}',
'{"text_fr":"Rétrogression : lors de l''exhumation (remontée), la roche traverse des conditions P-T décroissantes. Les minéraux HP-HT (grenat, jadéite) réagissent pour former des minéraux LP-LT (chlorite, albite, épidote) si de l''eau est disponible. Exemple : éclogite → amphibolite rétrograde. Sans eau, les minéraux HP peuvent être préservés métastablement (cinétique lente). Les éclogites parfaitement préservées = remontée très rapide ou absence d''eau."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001579');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001580','33333333-0000-0000-0000-000000000044','mcq',4,'fr',
'{"stem":"L''anatexie est :","choices":["Un métamorphisme de contact sans déformation","La fusion partielle d''une roche métamorphique formant un migmatite","Une déformation ductile sans changement minéralogique","Le dépôt de sédiments chimiques"],"correct_value":1,"correct_index":1,"latex":false}',
'{"text_fr":"L''anatexie = fusion partielle d''une roche métamorphique déjà existante (en général des gneiss) quand T dépasse le solidus humide (~650°C). Résultat : migmatite (roche mixte) avec deux domaines : leucosome (portion claire fondue, riche en quartz + feldspath) et mélasome (portion sombre restée solide, riche en biotite/amphibole). L''anatexie génère des magmas granitiques qui alimentent les plutons des racines de chaînes de montagnes."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001580');

-- Numeric items for metamorphism
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001581','33333333-0000-0000-0000-000000000044','numeric',2,'fr',
'{"stem":"Le gradient géothermique de subduction (gradient ''froid'') est d''environ combien de °C/km (valeur approximative) ?","correct_value":10,"tolerance":5,"unit":"°C/km","latex":false}',
'{"text_fr":"Dans les zones de subduction, le gradient géothermique est ''froid'' (~5-15°C/km, valeur typique ≈ 10°C/km) car la plaque subduite froide s''enfonce rapidement, refroidissant le manteau environnant. Cela favorise le métamorphisme HP-BT (faciès schiste bleu, éclogite). À l''opposé, les rifts ont un gradient élevé (~80-100°C/km) → métamorphisme BT-BP (faciès corne fels + albite-épidote)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001581');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001582','33333333-0000-0000-0000-000000000044','numeric',3,'fr',
'{"stem":"1 GPa de pression correspond à une profondeur d''environ combien de km dans la croûte (densité moyenne 2,8 g/cm³) ?","correct_value":35,"tolerance":5,"unit":"km","latex":true}',
'{"text_fr":"P = ρ × g × h. 1 GPa = 10⁹ Pa. ρ = 2800 kg/m³, g = 10 m/s². h = P/(ρg) = 10⁹ / (2800 × 10) = 10⁹ / 28000 ≈ 35 700 m ≈ 35-36 km. Donc 1 GPa ≈ 35 km de profondeur. Cette règle est utile : un faciès schiste bleu à 1,5 GPa → enfouissement à ~52 km ; éclogite à 2,5 GPa → ~87 km. Permet d''estimer les paléo-profondeurs à partir des minéraux index."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001582');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001583','33333333-0000-0000-0000-000000000044','numeric',3,'fr',
'{"stem":"Dans la séquence de Barrow (Scotland), combien de minéraux index sont classiquement reconnus ?","correct_value":6,"tolerance":1,"unit":"minéraux","latex":false}',
'{"text_fr":"6 minéraux index dans la séquence de Barrow (en ordre de T croissante) : 1) Chlorite (basse T), 2) Biotite, 3) Grenat (almandin), 4) Staurotide, 5) Disthène (cyanite), 6) Sillimanite (haute T). Ces minéraux définissent 6 zones métamorphiques sur la carte. La chlorite marque le début du métamorphisme (zone des schistes verts), la sillimanite marque le métamorphisme de haut grade."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001583');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001584','33333333-0000-0000-0000-000000000044','numeric',4,'fr',
'{"stem":"La réaction métamorphique Al2SiO5 possède 3 polymorphes. Combien sont-ils ?","correct_value":3,"tolerance":0,"unit":"polymorphes","latex":false}',
'{"text_fr":"Al₂SiO₅ a 3 polymorphes : 1) Andalousite (stable à basse P, haute T → métamorphisme de contact), 2) Disthène/cyanite (stable à haute P, basse à modérée T → subduction), 3) Sillimanite (stable à haute P et haute T → collision profonde). Les 3 se rejoignent en un point triple (~500°C, 0,37 GPa). Ce triplet est un géobarothermomètre naturel fondamental."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001584');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001585','33333333-0000-0000-0000-000000000044','numeric',4,'fr',
'{"stem":"Une roche métamorphique est datée à 50 Ma. Elle a été formée à 50 km de profondeur, puis exhumée en surface. Quelle est la vitesse moyenne d''exhumation en mm/an ?","correct_value":1,"tolerance":0.5,"unit":"mm/an","latex":true}',
'{"text_fr":"Vitesse = distance / temps = 50 km / 50 Ma = 50 000 m / 50 000 000 ans = 10⁻³ m/an = 1 mm/an. Cette vitesse (1 mm/an = 1 km/Ma) est typique des chaînes de montagnes. L''érosion et le rebond isostatique sont les moteurs de l''exhumation. Des vitesses plus rapides (~10 mm/an) existent dans des contextes tectoniques spéciaux (ex : détachements de métamorphiques de noyau)."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001585');

-- Sequence items for metamorphism
INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001586','33333333-0000-0000-0000-000000000044','ordering',3,'fr',
'{"stem":"Ordonnez les roches métamorphiques par degré de métamorphisme CROISSANT (d''un protolithe argileux/pélitique) :","items":["Gneiss (haute P et T)","Ardoise (faible T, début de schistosité)","Micaschiste (T modérée, micas visibles)","Phyllite (T faible à modérée, lustre soyeux)"],"correct_order":[1,3,2,0],"latex":false}',
'{"text_fr":"Séquence de métamorphisme prograde d''une argile/pélite : 1) Ardoise (300-400°C, faible P) : schistosité fine, minéraux non visibles à l''œil nu. 2) Phyllite (~400°C) : chlorite + séricite visibles, lustre soyeux sur les plans de foliation. 3) Micaschiste (~450-600°C) : biotite + grenat + staurotide, micas bien visibles. 4) Gneiss (>600°C) : foliation en bandes claires/sombres, feldspaths recristallisés, proche de l''anatexie."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001586');

INSERT INTO public.items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags)
SELECT '44444444-0000-0000-0000-000000001587','33333333-0000-0000-0000-000000000044','ordering',4,'fr',
'{"stem":"Ordonnez les étapes du trajet P-T-t (pression-température-temps) d''une roche lors d''une subduction puis exhumation :","items":["Exhumation : diminution P et T, rétrogression partielle","Enfouissement : augmentation progressive de P et T","Pic métamorphique : conditions P-T maximales (éclogite)","Retour en surface : érosion et exposition"],"correct_order":[1,2,0,3],"latex":false}',
'{"text_fr":"Trajet P-T-t classique (chemin clockwise pour la subduction) : 1) Enfouissement avec la plaque subduite : P augmente rapidement, T augmente lentement → faciès schiste bleu puis éclogite. 2) Pic métamorphique : conditions P-T max atteintes (~2-3 GPa, 500-700°C pour les éclogites). 3) Exhumation rapide (détachement de la plaque, remontée par poussée de flottabilité) : décompression → rétrogression si H₂O disponible. 4) Érosion → exposition en surface → échantillonnage géologique."}',
'{"bac_style","terminale"}'
WHERE NOT EXISTS (SELECT 1 FROM public.items WHERE id = '44444444-0000-0000-0000-000000001587');

