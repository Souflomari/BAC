-- ============================================================
-- ECON CONTENT: Marché et prix (3 skills, 21 items)
-- Topic: Économie Générale et Statistiques
-- Skills:
--   supply_demand       (33333333-...-094) — 7 items (3 mcq + 2 numeric + 2 true_false)
--   market_structures   (33333333-...-095) — 7 items (3 mcq + 2 numeric + 2 true_false)
--   price_elasticity    (33333333-...-096) — 7 items (3 mcq + 2 numeric + 2 true_false)
-- ============================================================

-- =====================
-- SKILL: supply_demand (Offre et demande) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000634',
  '33333333-0000-0000-0000-000000000094',
  'mcq', 1, 'fr',
  '{"stem": "Selon la loi de la demande, lorsque le prix d''un bien augmente, toutes choses étant égales par ailleurs :", "choices": ["La quantité demandée diminue", "La quantité demandée augmente", "La quantité demandée reste stable", "L''offre diminue"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La loi de la demande stipule qu''il existe une relation inverse entre le prix d''un bien et la quantité demandée. Quand le prix augmente, les consommateurs achètent moins.", "steps": ["La loi de la demande établit une relation inverse prix-quantité", "Prix ↑ → Quantité demandée ↓", "Cela se traduit par une courbe de demande décroissante"]}',
  '{"économie","marché","offre_demande"}'
),
(
  '44444444-0000-0000-0000-000000000635',
  '33333333-0000-0000-0000-000000000094',
  'mcq', 2, 'fr',
  '{"stem": "Sur un marché, le prix d''équilibre est de 50 DH et la quantité d''équilibre est de 200 unités. Si le gouvernement fixe un prix plancher à 60 DH, que se passe-t-il ?", "choices": ["Un excédent d''offre apparaît", "Une pénurie apparaît", "Le marché reste en équilibre", "La courbe de demande se déplace vers la droite"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Un prix plancher supérieur au prix d''équilibre empêche le marché de s''ajuster. À 60 DH, l''offre dépasse la demande, ce qui crée un excédent (surplus).", "steps": ["Le prix plancher (60 DH) > prix d''équilibre (50 DH)", "À 60 DH, les producteurs veulent offrir plus qu''à 50 DH", "À 60 DH, les consommateurs veulent acheter moins qu''à 50 DH", "Offre > Demande → excédent d''offre"]}',
  '{"économie","marché","offre_demande"}'
),
(
  '44444444-0000-0000-0000-000000000636',
  '33333333-0000-0000-0000-000000000094',
  'mcq', 2, 'fr',
  '{"stem": "Quel facteur provoque un déplacement de la courbe d''offre vers la droite ?", "choices": ["Une baisse des coûts de production", "Une hausse du prix du bien", "Une baisse du revenu des consommateurs", "Une augmentation des taxes sur le bien"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Un déplacement de la courbe d''offre (et non un mouvement le long de la courbe) est causé par un facteur autre que le prix du bien. Une baisse des coûts de production permet aux entreprises d''offrir plus à chaque niveau de prix.", "steps": ["Une variation du prix provoque un mouvement LE LONG de la courbe", "Un déplacement DE la courbe est causé par d''autres facteurs", "Baisse des coûts → les producteurs peuvent offrir davantage à chaque prix", "La courbe d''offre se déplace vers la droite"]}',
  '{"économie","marché","offre_demande"}'
),
(
  '44444444-0000-0000-0000-000000000637',
  '33333333-0000-0000-0000-000000000094',
  'numeric', 2, 'fr',
  '{"stem": "Sur un marché, la demande est Qd = 300 - 2P et l''offre est Qo = 100 + 3P. Calculer le prix d''équilibre (en DH).", "correct_value": 40, "tolerance": 0, "unit": "DH", "latex": true}',
  '{"text_fr": "À l''équilibre, l''offre égale la demande : Qd = Qo. On résout 300 - 2P = 100 + 3P pour trouver P = 40 DH.", "steps": ["Condition d''équilibre : Qd = Qo", "300 - 2P = 100 + 3P", "300 - 100 = 3P + 2P", "200 = 5P", "P = 200 / 5 = 40 DH"]}',
  '{"économie","marché","offre_demande"}'
),
(
  '44444444-0000-0000-0000-000000000638',
  '33333333-0000-0000-0000-000000000094',
  'numeric', 2, 'fr',
  '{"stem": "Le surplus du consommateur est la surface du triangle formé entre la courbe de demande et le prix d''équilibre. Si le prix d''équilibre est de 40 DH, la quantité d''équilibre est de 220 unités, et le prix maximal que les consommateurs accepteraient de payer est de 150 DH, calculer le surplus du consommateur.", "correct_value": 12100, "tolerance": 0, "unit": "DH", "latex": true}',
  '{"text_fr": "Le surplus du consommateur est l''aire du triangle = (1/2) × base × hauteur = (1/2) × 220 × (150 - 40) = 12 100 DH.", "steps": ["Surplus du consommateur = aire du triangle au-dessus du prix d''équilibre", "Base = quantité d''équilibre = 220", "Hauteur = prix maximal - prix d''équilibre = 150 - 40 = 110", "Surplus = (1/2) × 220 × 110 = 12 100 DH"]}',
  '{"économie","marché","offre_demande"}'
),
(
  '44444444-0000-0000-0000-000000000639',
  '33333333-0000-0000-0000-000000000094',
  'true_false', 1, 'fr',
  '{"statement": "Une augmentation du revenu des consommateurs provoque un mouvement le long de la courbe de demande d''un bien normal.", "correct_answer": false}',
  '{"text_fr": "Faux. Une augmentation du revenu est un déterminant non-prix de la demande. Elle provoque un déplacement de la courbe de demande vers la droite (pour un bien normal), et non un mouvement le long de la courbe.", "steps": ["Un mouvement le long de la courbe est causé par une variation du prix du bien", "Le revenu est un facteur autre que le prix", "Pour un bien normal, revenu ↑ → demande ↑ à chaque prix", "Cela correspond à un déplacement de la courbe vers la droite"]}',
  '{"économie","marché","offre_demande"}'
),
(
  '44444444-0000-0000-0000-000000000640',
  '33333333-0000-0000-0000-000000000094',
  'true_false', 2, 'fr',
  '{"statement": "Le surplus du producteur correspond à la différence entre le prix reçu et le coût minimum auquel le producteur était prêt à vendre.", "correct_answer": true}',
  '{"text_fr": "Vrai. Le surplus du producteur mesure le gain que le producteur réalise en vendant à un prix supérieur à son coût marginal (ou prix minimum acceptable). Graphiquement, c''est l''aire entre le prix d''équilibre et la courbe d''offre.", "steps": ["Le surplus du producteur = prix de vente - coût marginal", "C''est le gain net pour le producteur sur chaque unité vendue", "Graphiquement : aire entre la courbe d''offre et le prix d''équilibre"]}',
  '{"économie","marché","offre_demande"}'
);

-- =====================
-- SKILL: market_structures (Structures de marché) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000641',
  '33333333-0000-0000-0000-000000000095',
  'mcq', 1, 'fr',
  '{"stem": "Quelle condition ne fait PAS partie des hypothèses de la concurrence pure et parfaite (CPP) ?", "choices": ["La différenciation des produits", "L''atomicité du marché", "La libre entrée et sortie du marché", "La transparence de l''information"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La CPP repose sur 5 conditions : atomicité, homogénéité du produit, libre entrée/sortie, transparence de l''information et mobilité des facteurs. La différenciation des produits caractérise la concurrence monopolistique, pas la CPP.", "steps": ["Les 5 conditions de la CPP :", "1. Atomicité (nombreux offreurs et demandeurs)", "2. Homogénéité du produit (produits identiques)", "3. Libre entrée et sortie", "4. Transparence de l''information", "5. Mobilité des facteurs de production", "La différenciation des produits contredit l''homogénéité"]}',
  '{"économie","marché","structures_marché"}'
),
(
  '44444444-0000-0000-0000-000000000642',
  '33333333-0000-0000-0000-000000000095',
  'mcq', 2, 'fr',
  '{"stem": "Dans un marché en situation de monopole, le monopoleur fixe son prix :", "choices": ["Au-dessus du coût marginal pour maximiser son profit", "Au niveau du coût marginal comme en CPP", "En dessous du coût marginal pour attirer les clients", "Au niveau du coût moyen uniquement"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le monopoleur est price-maker : il fixe un prix supérieur au coût marginal (P > Cm) pour maximiser son profit. En CPP, la concurrence force P = Cm, mais le monopoleur, étant seul, a un pouvoir de marché.", "steps": ["En CPP : prix = coût marginal (P = Cm)", "Le monopoleur est seul sur le marché (price-maker)", "Il maximise son profit en produisant où Rm = Cm", "Comme Rm < P pour le monopoleur, on a P > Cm", "Le monopoleur pratique un prix plus élevé qu''en CPP"]}',
  '{"économie","marché","structures_marché"}'
),
(
  '44444444-0000-0000-0000-000000000643',
  '33333333-0000-0000-0000-000000000095',
  'mcq', 2, 'fr',
  '{"stem": "Un marché d''oligopole se caractérise par :", "choices": ["Un petit nombre de grandes entreprises interdépendantes", "Un grand nombre de petites entreprises indépendantes", "Une seule entreprise qui domine le marché", "De nombreuses entreprises avec des produits différenciés"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''oligopole est une structure de marché où un petit nombre de grandes entreprises se partagent le marché. Ces entreprises sont interdépendantes : la décision de l''une affecte les autres (comportement stratégique).", "steps": ["Oligopole = quelques grandes entreprises (ex : télécoms au Maroc)", "Les entreprises sont interdépendantes", "Chaque firme doit tenir compte des réactions de ses concurrents", "Exemples : duopole (2 firmes), triopole (3 firmes)"]}',
  '{"économie","marché","structures_marché"}'
),
(
  '44444444-0000-0000-0000-000000000644',
  '33333333-0000-0000-0000-000000000095',
  'numeric', 2, 'fr',
  '{"stem": "Un monopoleur a une fonction de coût total CT = 2Q² + 10Q + 50 et fait face à une demande P = 110 - 3Q. Calculer la quantité Q qui maximise son profit.", "correct_value": 10, "tolerance": 0, "unit": "unités", "latex": true}',
  '{"text_fr": "Le profit est maximal quand la recette marginale (Rm) égale le coût marginal (Cm). Rm = 110 - 6Q et Cm = 4Q + 10. On résout 110 - 6Q = 4Q + 10, soit Q = 10.", "steps": ["Recette totale RT = P × Q = (110 - 3Q) × Q = 110Q - 3Q²", "Recette marginale Rm = dRT/dQ = 110 - 6Q", "Coût marginal Cm = dCT/dQ = 4Q + 10", "Condition de maximisation : Rm = Cm", "110 - 6Q = 4Q + 10", "100 = 10Q", "Q = 10 unités"]}',
  '{"économie","marché","structures_marché"}'
),
(
  '44444444-0000-0000-0000-000000000645',
  '33333333-0000-0000-0000-000000000095',
  'numeric', 3, 'fr',
  '{"stem": "En reprenant la situation précédente (CT = 2Q² + 10Q + 50, P = 110 - 3Q), calculer le profit maximal du monopoleur.", "correct_value": 450, "tolerance": 0, "unit": "DH", "latex": true}',
  '{"text_fr": "À Q = 10 : P = 110 - 3(10) = 80 DH. RT = 80 × 10 = 800 DH. CT = 2(100) + 10(10) + 50 = 200 + 100 + 50 = 350 DH. Profit = RT - CT = 800 - 350 = 450 DH.", "steps": ["Q* = 10 (calculé précédemment)", "P = 110 - 3(10) = 80 DH", "RT = P × Q = 80 × 10 = 800 DH", "CT = 2(10²) + 10(10) + 50 = 200 + 100 + 50 = 350 DH", "Profit = RT - CT = 800 - 350 = 450 DH"]}',
  '{"économie","marché","structures_marché"}'
),
(
  '44444444-0000-0000-0000-000000000646',
  '33333333-0000-0000-0000-000000000095',
  'true_false', 1, 'fr',
  '{"statement": "En concurrence monopolistique, les entreprises vendent des produits homogènes (identiques).", "correct_answer": false}',
  '{"text_fr": "Faux. La concurrence monopolistique se distingue de la CPP justement par la différenciation des produits. Chaque entreprise offre un produit légèrement différent (marque, qualité, design), ce qui lui confère un certain pouvoir de marché.", "steps": ["Concurrence monopolistique = nombreuses entreprises + produits différenciés", "Chaque entreprise a un léger pouvoir de marché grâce à la différenciation", "Exemples : restaurants, vêtements, cosmétiques", "En CPP, les produits sont homogènes ; ici, ils sont différenciés"]}',
  '{"économie","marché","structures_marché"}'
),
(
  '44444444-0000-0000-0000-000000000647',
  '33333333-0000-0000-0000-000000000095',
  'true_false', 2, 'fr',
  '{"statement": "En situation d''oligopole, les entreprises peuvent augmenter leurs profits en formant une entente (cartel) pour fixer les prix.", "correct_answer": true}',
  '{"text_fr": "Vrai. En oligopole, les entreprises peuvent s''entendre (cartel) pour fixer des prix élevés et se partager le marché, augmentant ainsi leurs profits collectifs. Cependant, ces pratiques sont généralement interdites par le droit de la concurrence.", "steps": ["Un cartel = accord entre oligopoleurs pour fixer les prix ou les quantités", "L''entente permet de se comporter comme un monopole collectif", "Les profits augmentent au détriment des consommateurs", "Ces pratiques sont illégales dans la plupart des pays (y compris le Maroc)"]}',
  '{"économie","marché","structures_marché"}'
);

-- =====================
-- SKILL: price_elasticity (Élasticité et prix) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000648',
  '33333333-0000-0000-0000-000000000096',
  'mcq', 1, 'fr',
  '{"stem": "Si l''élasticité-prix de la demande d''un bien est égale à -2, cela signifie que :", "choices": ["Une hausse de 1% du prix entraîne une baisse de 2% de la quantité demandée", "Une hausse de 2% du prix entraîne une baisse de 1% de la quantité demandée", "Le bien est inélastique", "La demande ne réagit pas au prix"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''élasticité-prix de la demande mesure la sensibilité de la quantité demandée aux variations du prix. Une élasticité de -2 signifie que pour chaque variation de 1% du prix, la quantité demandée varie de 2% en sens inverse.", "steps": ["Ep = (ΔQ/Q) / (ΔP/P) = -2", "Si le prix augmente de 1%, la quantité demandée diminue de 2%", "|Ep| > 1 → la demande est élastique", "Le signe négatif reflète la relation inverse prix-quantité"]}',
  '{"économie","marché","élasticité"}'
),
(
  '44444444-0000-0000-0000-000000000649',
  '33333333-0000-0000-0000-000000000096',
  'mcq', 2, 'fr',
  '{"stem": "L''élasticité-revenu de la demande d''un bien est de -0,5. Ce bien est :", "choices": ["Un bien inférieur", "Un bien normal", "Un bien de luxe", "Un bien de première nécessité"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Quand l''élasticité-revenu est négative, la demande du bien diminue lorsque le revenu augmente. C''est la caractéristique d''un bien inférieur (ex : produits bas de gamme remplacés par des produits de meilleure qualité).", "steps": ["Élasticité-revenu Er = (ΔQ/Q) / (ΔR/R) = -0,5", "Er < 0 → bien inférieur (demande ↓ quand revenu ↑)", "0 < Er < 1 → bien normal de première nécessité", "Er > 1 → bien de luxe (bien supérieur)"]}',
  '{"économie","marché","élasticité"}'
),
(
  '44444444-0000-0000-0000-000000000650',
  '33333333-0000-0000-0000-000000000096',
  'mcq', 2, 'fr',
  '{"stem": "L''élasticité croisée de la demande du bien A par rapport au prix du bien B est positive (+1,5). Les biens A et B sont :", "choices": ["Des biens substituables", "Des biens complémentaires", "Des biens indépendants", "Des biens inférieurs"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Une élasticité croisée positive signifie que lorsque le prix de B augmente, la demande de A augmente aussi. Les consommateurs remplacent B par A : ce sont des biens substituables.", "steps": ["Élasticité croisée Ec = (ΔQa/Qa) / (ΔPb/Pb) = +1,5", "Ec > 0 → biens substituables (prix de B ↑ → demande de A ↑)", "Ec < 0 → biens complémentaires", "Ec = 0 → biens indépendants", "Exemple de substituts : Coca-Cola et Pepsi"]}',
  '{"économie","marché","élasticité"}'
),
(
  '44444444-0000-0000-0000-000000000651',
  '33333333-0000-0000-0000-000000000096',
  'numeric', 2, 'fr',
  '{"stem": "Le prix d''un produit passe de 100 DH à 120 DH, et la quantité demandée passe de 500 à 400 unités. Calculer l''élasticité-prix de la demande (en valeur absolue).", "correct_value": 1, "tolerance": 0.05, "unit": "", "latex": true}',
  '{"text_fr": "L''élasticité-prix = (ΔQ/Q) / (ΔP/P). Variation de la quantité : (400-500)/500 = -20%. Variation du prix : (120-100)/100 = +20%. Ep = -20%/20% = -1. En valeur absolue : |Ep| = 1.", "steps": ["ΔQ = 400 - 500 = -100", "ΔQ/Q = -100/500 = -0,20 soit -20%", "ΔP = 120 - 100 = 20", "ΔP/P = 20/100 = 0,20 soit +20%", "Ep = (-20%) / (+20%) = -1", "En valeur absolue : |Ep| = 1 (élasticité unitaire)"]}',
  '{"économie","marché","élasticité"}'
),
(
  '44444444-0000-0000-0000-000000000652',
  '33333333-0000-0000-0000-000000000096',
  'numeric', 3, 'fr',
  '{"stem": "Le revenu d''un ménage passe de 5000 DH à 6000 DH. Sa consommation de viande passe de 4 kg à 5 kg par mois. Calculer l''élasticité-revenu de la demande de viande.", "correct_value": 1.25, "tolerance": 0.05, "unit": "", "latex": true}',
  '{"text_fr": "L''élasticité-revenu = (ΔQ/Q) / (ΔR/R). La quantité augmente de 25% et le revenu de 20%. Er = 25%/20% = 1,25. Ce bien est un bien de luxe (Er > 1).", "steps": ["ΔQ = 5 - 4 = 1 kg", "ΔQ/Q = 1/4 = 0,25 soit 25%", "ΔR = 6000 - 5000 = 1000 DH", "ΔR/R = 1000/5000 = 0,20 soit 20%", "Er = 25% / 20% = 1,25", "Er > 1 → bien de luxe (bien supérieur)"]}',
  '{"économie","marché","élasticité"}'
),
(
  '44444444-0000-0000-0000-000000000653',
  '33333333-0000-0000-0000-000000000096',
  'true_false', 1, 'fr',
  '{"statement": "Un bien dont l''élasticité-prix de la demande est égale à -0,3 (en valeur absolue 0,3) est un bien à demande élastique.", "correct_answer": false}',
  '{"text_fr": "Faux. Quand |Ep| < 1, la demande est inélastique (ou rigide). Cela signifie que la quantité demandée réagit peu aux variations de prix. Les biens de première nécessité (pain, médicaments) ont souvent une demande inélastique.", "steps": ["|Ep| = 0,3 < 1", "|Ep| < 1 → demande inélastique (rigide)", "|Ep| = 1 → élasticité unitaire", "|Ep| > 1 → demande élastique", "Exemple : une hausse de 10% du prix entraîne une baisse de seulement 3% de la demande"]}',
  '{"économie","marché","élasticité"}'
),
(
  '44444444-0000-0000-0000-000000000654',
  '33333333-0000-0000-0000-000000000096',
  'true_false', 2, 'fr',
  '{"statement": "Si l''élasticité croisée entre le thé et le sucre est négative, alors ces deux biens sont complémentaires.", "correct_answer": true}',
  '{"text_fr": "Vrai. Une élasticité croisée négative signifie que lorsque le prix du sucre augmente, la demande de thé diminue. Cela indique que les deux biens sont consommés ensemble : ce sont des biens complémentaires.", "steps": ["Élasticité croisée Ec < 0", "Prix du sucre ↑ → demande de thé ↓", "Les deux biens sont consommés conjointement", "Ec < 0 → biens complémentaires", "Exemple classique au Maroc : thé et sucre"]}',
  '{"économie","marché","élasticité"}'
);
