-- ============================================================
-- SVT CONTENT: Immunologie (3 skills, 21 items)
-- Topic: Immunologie
-- Skills:
--   self_nonself       (33333333-...-040) difficulty 2 — 7 items
--   specific_immunity  (33333333-...-041) difficulty 3 — 7 items
--   immune_disorders   (33333333-...-042) difficulty 3 — 7 items
-- ============================================================

-- =====================
-- SKILL: self_nonself (Le soi et le non-soi) — 7 items
-- Mix: 3 mcq + 1 numeric + 3 true_false
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000258',
  '33333333-0000-0000-0000-000000000040',
  'mcq', 2, 'fr',
  '{"stem": "Les molécules du CMH (Complexe Majeur d''Histocompatibilité) présentes à la surface des cellules nucléées de l''organisme sont appelées :", "choices": ["Les marqueurs du soi ou molécules HLA", "Les anticorps circulants", "Les antigènes du non-soi", "Les immunoglobulines membranaires"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Les molécules du CMH, aussi appelées molécules HLA (Human Leukocyte Antigen), sont des glycoprotéines présentes à la surface des cellules nucléées. Elles constituent les marqueurs du soi et permettent au système immunitaire de distinguer les cellules de l''organisme des cellules étrangères.", "steps": ["Le CMH = Complexe Majeur d''Histocompatibilité", "Les molécules HLA sont les marqueurs du soi", "Elles sont présentes sur toutes les cellules nucléées", "Elles permettent la distinction soi / non-soi"]}',
  '{"immunologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000259',
  '33333333-0000-0000-0000-000000000040',
  'mcq', 2, 'fr',
  '{"stem": "Un antigène est une molécule qui :", "choices": ["Est reconnue comme étrangère par le système immunitaire et déclenche une réponse immunitaire", "Est produite par les lymphocytes B pour neutraliser les agents pathogènes", "Constitue un marqueur du soi présent sur les cellules de l''organisme", "Détruit directement les bactéries par phagocytose"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Un antigène est toute molécule capable d''être reconnue comme étrangère (non-soi) par le système immunitaire et de déclencher une réponse immunitaire spécifique. Les antigènes possèdent des déterminants antigéniques (épitopes) qui sont reconnus par les récepteurs des lymphocytes.", "steps": ["Un antigène = molécule reconnue comme non-soi", "Il déclenche une réponse immunitaire", "Il possède des épitopes (déterminants antigéniques)", "Les épitopes sont reconnus par les récepteurs des lymphocytes"]}',
  '{"immunologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000260',
  '33333333-0000-0000-0000-000000000040',
  'mcq', 3, 'fr',
  '{"stem": "Lors de la réponse immunitaire non spécifique, la phagocytose se déroule selon l''ordre suivant :", "choices": ["Adhésion → ingestion → digestion → rejet des déchets", "Ingestion → adhésion → rejet des déchets → digestion", "Digestion → adhésion → ingestion → rejet des déchets", "Rejet des déchets → ingestion → digestion → adhésion"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La phagocytose est un mécanisme de la réponse immunitaire non spécifique réalisé par les phagocytes (macrophages, polynucléaires neutrophiles). Elle se déroule en quatre étapes : l''adhésion du phagocyte à l''agent pathogène, l''ingestion par formation de pseudopodes, la digestion dans le phagolysosome, et enfin le rejet des déchets par exocytose.", "steps": ["1. Adhésion : le phagocyte se fixe à l''agent pathogène", "2. Ingestion : formation de pseudopodes et internalisation", "3. Digestion : fusion du phagosome avec les lysosomes", "4. Rejet des déchets : exocytose des résidus"]}',
  '{"immunologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000261',
  '33333333-0000-0000-0000-000000000040',
  'numeric', 2, 'fr',
  '{"stem": "Le CMH humain est codé par un ensemble de gènes situés sur le chromosome 6. On considère que pour un gène du CMH de classe I, il existe 3 loci principaux (HLA-A, HLA-B, HLA-C) et que chaque locus possède 2 allèles (un paternel et un maternel). Combien de types de molécules HLA de classe I différentes un individu peut-il exprimer au maximum à la surface de ses cellules ?", "correct_value": 6, "tolerance": 0, "latex": false}',
  '{"text_fr": "Il y a 3 loci pour le CMH de classe I (HLA-A, HLA-B, HLA-C). Chaque locus possède 2 allèles (un d''origine paternelle et un d''origine maternelle), ce qui donne au maximum 3 × 2 = 6 types de molécules HLA de classe I différentes exprimées à la surface des cellules.", "steps": ["3 loci principaux : HLA-A, HLA-B, HLA-C", "Chaque locus a 2 allèles (codominance)", "Nombre maximal = 3 × 2 = 6 molécules HLA de classe I"]}',
  '{"immunologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000262',
  '33333333-0000-0000-0000-000000000040',
  'true_false', 2, 'fr',
  '{"stem": "Les organes lymphoïdes primaires (thymus et moelle osseuse) sont les lieux de maturation des lymphocytes.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Les organes lymphoïdes primaires (ou centraux) sont le thymus et la moelle osseuse rouge. Le thymus est le lieu de maturation des lymphocytes T, tandis que la moelle osseuse est le lieu de production et de maturation des lymphocytes B. C''est dans ces organes que les lymphocytes acquièrent leurs récepteurs spécifiques.", "steps": ["Organes lymphoïdes primaires : thymus et moelle osseuse", "Thymus : maturation des lymphocytes T", "Moelle osseuse : maturation des lymphocytes B", "Acquisition des récepteurs spécifiques dans ces organes"]}',
  '{"immunologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000263',
  '33333333-0000-0000-0000-000000000040',
  'true_false', 2, 'fr',
  '{"stem": "La réaction inflammatoire est une réponse immunitaire spécifique dirigée contre un antigène précis.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. La réaction inflammatoire est une réponse immunitaire non spécifique (innée). Elle se manifeste par quatre signes cliniques : rougeur, chaleur, gonflement (œdème) et douleur. Elle fait intervenir les phagocytes et ne cible pas un antigène précis, contrairement à la réponse immunitaire spécifique (adaptative).", "steps": ["La réaction inflammatoire est non spécifique (innée)", "Signes : rougeur, chaleur, gonflement, douleur", "Elle fait intervenir les phagocytes (macrophages, neutrophiles)", "La réponse spécifique cible un antigène précis, pas l''inflammation"]}',
  '{"immunologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000264',
  '33333333-0000-0000-0000-000000000040',
  'true_false', 2, 'fr',
  '{"stem": "Les déterminants antigéniques (épitopes) sont les parties de l''antigène reconnues spécifiquement par les récepteurs des lymphocytes ou par les anticorps.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Les épitopes (ou déterminants antigéniques) sont les régions spécifiques d''un antigène qui sont reconnues par les récepteurs des cellules immunitaires (TCR des lymphocytes T, BCR des lymphocytes B) ou par les anticorps. Un même antigène peut posséder plusieurs épitopes différents.", "steps": ["Épitope = déterminant antigénique", "C''est la partie de l''antigène reconnue par le système immunitaire", "Reconnu par : TCR (lymphocytes T), BCR (lymphocytes B), anticorps", "Un antigène peut porter plusieurs épitopes différents"]}',
  '{"immunologie","bac_style"}'
);

-- =====================
-- SKILL: specific_immunity (Immunité spécifique) — 7 items
-- Mix: 3 mcq + 1 numeric + 3 true_false
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000265',
  '33333333-0000-0000-0000-000000000041',
  'mcq', 3, 'fr',
  '{"stem": "Lors de l''immunité humorale, les lymphocytes B activés se différencient en :", "choices": ["Plasmocytes sécréteurs d''anticorps", "Lymphocytes T cytotoxiques", "Macrophages activés", "Cellules NK (Natural Killer)"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Lors de la réponse immunitaire humorale, les lymphocytes B reconnaissent l''antigène grâce à leurs récepteurs membranaires (BCR). Après activation (avec l''aide des lymphocytes T auxiliaires), ils se multiplient (sélection clonale) et se différencient en plasmocytes, cellules spécialisées dans la sécrétion d''anticorps solubles.", "steps": ["Le lymphocyte B reconnaît l''antigène via son BCR", "Activation avec l''aide des lymphocytes T auxiliaires (LT4)", "Sélection clonale : multiplication des LB spécifiques", "Différenciation en plasmocytes sécréteurs d''anticorps"]}',
  '{"immunologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000266',
  '33333333-0000-0000-0000-000000000041',
  'mcq', 3, 'fr',
  '{"stem": "La structure d''un anticorps (immunoglobuline) comprend :", "choices": ["Deux chaînes lourdes et deux chaînes légères reliées par des ponts disulfure", "Une seule chaîne polypeptidique repliée sur elle-même", "Quatre chaînes lourdes identiques", "Deux chaînes légères uniquement"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Un anticorps (immunoglobuline) est une protéine en forme de Y constituée de 4 chaînes polypeptidiques : 2 chaînes lourdes (H) identiques et 2 chaînes légères (L) identiques, reliées entre elles par des ponts disulfure. Chaque anticorps possède 2 sites de fixation à l''antigène (paratopes) situés aux extrémités des bras du Y.", "steps": ["Anticorps = 2 chaînes lourdes (H) + 2 chaînes légères (L)", "Les chaînes sont reliées par des ponts disulfure", "Forme en Y avec 2 sites de fixation à l''antigène", "Les sites de fixation (paratopes) sont dans la partie variable"]}',
  '{"immunologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000267',
  '33333333-0000-0000-0000-000000000041',
  'mcq', 3, 'fr',
  '{"stem": "La sérothérapie consiste à :", "choices": ["Injecter un sérum contenant des anticorps spécifiques pour une protection immédiate mais temporaire", "Injecter un antigène atténué pour stimuler la production d''anticorps", "Administrer des lymphocytes T cytotoxiques d''un donneur", "Stimuler la moelle osseuse pour augmenter la production de lymphocytes"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La sérothérapie consiste à injecter un sérum contenant des anticorps spécifiques préformés (provenant d''un individu ou d''un animal immunisé). Elle procure une immunité passive, immédiate mais temporaire, car les anticorps injectés sont progressivement dégradés. À la différence de la vaccination, elle ne crée pas de mémoire immunitaire.", "steps": ["Sérothérapie = injection de sérum contenant des anticorps", "Protection immédiate (pas de délai de production)", "Protection temporaire (anticorps dégradés progressivement)", "Pas de mémoire immunitaire (immunité passive)", "Différence avec la vaccination : pas de stimulation du système immunitaire"]}',
  '{"immunologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000268',
  '33333333-0000-0000-0000-000000000041',
  'numeric', 3, 'fr',
  '{"stem": "Un anticorps possède 2 sites de fixation à l''antigène. Dans un échantillon de sérum, on dénombre 5000 anticorps spécifiques d''un antigène donné. Quel est le nombre total de sites de fixation disponibles pour cet antigène dans cet échantillon ?", "correct_value": 10000, "tolerance": 0, "latex": false}',
  '{"text_fr": "Chaque anticorps possède 2 sites de fixation à l''antigène (paratopes), situés aux extrémités des deux bras du Y. Pour 5000 anticorps, le nombre total de sites de fixation est : 5000 × 2 = 10 000 sites.", "steps": ["Chaque anticorps a 2 sites de fixation (paratopes)", "Nombre total = nombre d''anticorps × 2", "Nombre total = 5000 × 2 = 10 000 sites"]}',
  '{"immunologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000269',
  '33333333-0000-0000-0000-000000000041',
  'true_false', 3, 'fr',
  '{"stem": "La vaccination repose sur la mémoire immunitaire : lors d''un second contact avec l''antigène, la réponse immunitaire est plus rapide et plus intense.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. La vaccination consiste à injecter un antigène atténué ou inactivé pour stimuler le système immunitaire sans provoquer la maladie. Lors du premier contact, des cellules mémoires (lymphocytes B et T mémoire) sont produites. Lors d''un second contact avec le même antigène, ces cellules mémoires permettent une réponse secondaire plus rapide, plus intense et plus durable.", "steps": ["Vaccination = injection d''antigène atténué ou inactivé", "Premier contact : production de cellules mémoires", "Second contact : réponse secondaire rapide et intense", "Réponse secondaire > réponse primaire (grâce aux cellules mémoires)"]}',
  '{"immunologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000270',
  '33333333-0000-0000-0000-000000000041',
  'true_false', 3, 'fr',
  '{"stem": "Les lymphocytes T cytotoxiques (LTc) détruisent les cellules infectées par contact direct en libérant des perforines et des granzymes.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Les lymphocytes T cytotoxiques (LT8 ou LTc) assurent l''immunité cellulaire. Ils reconnaissent les cellules infectées présentant des peptides antigéniques associés au CMH de classe I. Ils détruisent ces cellules cibles par contact direct en libérant des perforines (qui percent la membrane) et des granzymes (qui déclenchent l''apoptose).", "steps": ["Les LTc reconnaissent le complexe CMH I - peptide antigénique", "Destruction par contact direct (cytotoxicité)", "Libération de perforines : perforation de la membrane cellulaire", "Libération de granzymes : déclenchement de l''apoptose"]}',
  '{"immunologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000271',
  '33333333-0000-0000-0000-000000000041',
  'true_false', 3, 'fr',
  '{"stem": "Le complexe antigène-anticorps se forme grâce à la complémentarité entre l''épitope de l''antigène et le paratope de l''anticorps. Cette liaison est non spécifique.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. La liaison entre l''épitope (déterminant antigénique) et le paratope (site de fixation de l''anticorps) est hautement spécifique. Elle repose sur une complémentarité de forme entre les deux structures, comparable au modèle clé-serrure. Un anticorps donné ne reconnaît qu''un épitope précis.", "steps": ["Le complexe Ag-Ac repose sur la complémentarité épitope-paratope", "Cette liaison est spécifique (modèle clé-serrure)", "Un anticorps reconnaît un seul type d''épitope", "L''affirmation est fausse car la liaison est spécifique, pas non spécifique"]}',
  '{"immunologie","bac_style"}'
);

-- =====================
-- SKILL: immune_disorders (Dysfonctionnements immunitaires) — 7 items
-- Mix: 3 mcq + 1 numeric + 3 true_false
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000272',
  '33333333-0000-0000-0000-000000000042',
  'mcq', 3, 'fr',
  '{"stem": "Le VIH (Virus de l''Immunodéficience Humaine) cible principalement :", "choices": ["Les lymphocytes T auxiliaires (LT4) portant le récepteur CD4", "Les lymphocytes B sécréteurs d''anticorps", "Les globules rouges (hématies)", "Les plaquettes sanguines"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le VIH est un rétrovirus qui infecte principalement les lymphocytes T auxiliaires (LT4) en se fixant sur leur récepteur membranaire CD4. La destruction progressive des LT4 conduit à un effondrement du système immunitaire, car les LT4 jouent un rôle central dans la coordination de la réponse immunitaire (aide aux LB et aux LTc).", "steps": ["Le VIH se fixe sur le récepteur CD4 des lymphocytes T4", "Les LT4 sont les chefs d''orchestre du système immunitaire", "Leur destruction entraîne l''immunodéficience", "Le SIDA apparaît quand le taux de LT4 chute sous 200/mm³"]}',
  '{"immunologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000273',
  '33333333-0000-0000-0000-000000000042',
  'mcq', 3, 'fr',
  '{"stem": "Une maladie auto-immune se caractérise par :", "choices": ["Une réaction du système immunitaire dirigée contre les propres constituants de l''organisme", "Une réaction exagérée du système immunitaire contre un allergène inoffensif", "Une incapacité totale du système immunitaire à produire des anticorps", "Une infection virale chronique qui détruit les lymphocytes"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Une maladie auto-immune résulte d''un dysfonctionnement du système immunitaire qui se retourne contre les propres constituants de l''organisme (le soi). Le système immunitaire ne reconnaît plus certaines cellules ou molécules du soi et les attaque. Exemples : diabète de type 1 (destruction des cellules β du pancréas), sclérose en plaques, lupus.", "steps": ["Maladie auto-immune = attaque du soi par le système immunitaire", "Perte de la tolérance au soi", "Exemples : diabète type 1, sclérose en plaques, lupus", "Différent de l''allergie (réaction contre un allergène externe)"]}',
  '{"immunologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000274',
  '33333333-0000-0000-0000-000000000042',
  'mcq', 3, 'fr',
  '{"stem": "Lors d''une réaction allergique de type I (hypersensibilité immédiate), la deuxième exposition à l''allergène provoque :", "choices": ["La dégranulation des mastocytes sensibilisés et la libération massive d''histamine", "La production de lymphocytes T cytotoxiques spécifiques", "La phagocytose de l''allergène par les macrophages uniquement", "La destruction des lymphocytes B mémoires"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''allergie de type I (hypersensibilité immédiate) se déroule en deux phases. Lors du premier contact, des IgE spécifiques sont produites et se fixent sur les mastocytes (sensibilisation). Lors du second contact, l''allergène se fixe sur les IgE des mastocytes, provoquant leur dégranulation et la libération massive d''histamine, responsable des symptômes allergiques (vasodilatation, œdème, bronchoconstriction).", "steps": ["1er contact : sensibilisation, production d''IgE spécifiques", "Les IgE se fixent sur les mastocytes", "2ème contact : l''allergène se fixe sur les IgE des mastocytes", "Dégranulation des mastocytes → libération d''histamine", "Histamine → symptômes allergiques (rougeur, œdème, etc.)"]}',
  '{"immunologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000275',
  '33333333-0000-0000-0000-000000000042',
  'numeric', 3, 'fr',
  '{"stem": "Chez un individu sain, le taux normal de lymphocytes T4 (LT4) est d''environ 1000 par mm³ de sang. Le SIDA se déclare lorsque ce taux descend en dessous de 200/mm³. Quel est le pourcentage de diminution des LT4 par rapport à la valeur normale au moment du déclenchement du SIDA ?", "correct_value": 80, "tolerance": 0, "latex": false}',
  '{"text_fr": "Le taux normal de LT4 est d''environ 1000/mm³. Le SIDA se déclare quand ce taux descend en dessous de 200/mm³. La diminution est de 1000 - 200 = 800/mm³. Le pourcentage de diminution est : (800 / 1000) × 100 = 80 %.", "steps": ["Taux normal de LT4 : 1000/mm³", "Seuil de déclenchement du SIDA : 200/mm³", "Diminution : 1000 - 200 = 800/mm³", "Pourcentage = (800 / 1000) × 100 = 80 %"]}',
  '{"immunologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000276',
  '33333333-0000-0000-0000-000000000042',
  'true_false', 3, 'fr',
  '{"stem": "Le rejet de greffe est dû à la reconnaissance des molécules HLA du greffon comme non-soi par le système immunitaire du receveur.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Lors d''une greffe, le système immunitaire du receveur reconnaît les molécules HLA du greffon comme étrangères (non-soi) et déclenche une réponse immunitaire de rejet. C''est pourquoi on recherche la meilleure compatibilité HLA possible entre donneur et receveur, et on utilise des traitements immunosuppresseurs pour limiter le rejet.", "steps": ["Le greffon porte des molécules HLA différentes du receveur", "Le système immunitaire du receveur reconnaît ces HLA comme non-soi", "Déclenchement d''une réponse immunitaire de rejet", "Solutions : compatibilité HLA + immunosuppresseurs"]}',
  '{"immunologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000277',
  '33333333-0000-0000-0000-000000000042',
  'true_false', 3, 'fr',
  '{"stem": "L''immunodéficience congénitale (primaire) est causée par une infection virale comme le VIH.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. L''immunodéficience congénitale (primaire) est d''origine génétique : elle est présente dès la naissance et résulte d''anomalies dans les gènes impliqués dans le développement ou le fonctionnement du système immunitaire. L''immunodéficience causée par le VIH est une immunodéficience acquise (secondaire), qui survient au cours de la vie.", "steps": ["Immunodéficience congénitale (primaire) = d''origine génétique", "Présente dès la naissance", "Immunodéficience acquise (secondaire) = survient au cours de la vie", "Le VIH cause une immunodéficience acquise, pas congénitale"]}',
  '{"immunologie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000278',
  '33333333-0000-0000-0000-000000000042',
  'true_false', 3, 'fr',
  '{"stem": "Les immunosuppresseurs sont des médicaments qui stimulent le système immunitaire pour lutter contre les infections.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Les immunosuppresseurs sont des médicaments qui réduisent (suppriment) l''activité du système immunitaire. Ils sont utilisés principalement pour prévenir le rejet de greffe et pour traiter les maladies auto-immunes. Ils ne stimulent pas le système immunitaire, au contraire, ils l''affaiblissent, ce qui augmente le risque d''infections opportunistes.", "steps": ["Immunosuppresseurs = médicaments qui réduisent l''immunité", "Utilisés pour : prévenir le rejet de greffe, traiter les maladies auto-immunes", "Ils ne stimulent pas le système immunitaire, ils le freinent", "Effet secondaire : augmentation du risque d''infections"]}',
  '{"immunologie","bac_style"}'
);
