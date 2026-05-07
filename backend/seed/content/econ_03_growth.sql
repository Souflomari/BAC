-- ============================================================
-- ECON CONTENT: Croissance et développement (3 skills, 21 items)
-- Topic: Croissance et développement
-- Skills:
--   gdp_growth              (33333333-...-099) — 7 items
--   development_indicators  (33333333-...-100) — 7 items
--   international_trade     (33333333-...-101) — 7 items
-- ============================================================

-- =====================
-- SKILL: gdp_growth (PIB et croissance) — 7 items
-- 3 mcq + 2 numeric + 2 true_false
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000669',
  '33333333-0000-0000-0000-000000000099',
  'mcq', 2, 'fr',
  '{"stem": "Quelle est la différence entre le PIB nominal et le PIB réel ?", "choices": ["Le PIB réel est corrigé de l''inflation, le PIB nominal ne l''est pas", "Le PIB nominal est corrigé de l''inflation, le PIB réel ne l''est pas", "Le PIB réel inclut les exportations, le PIB nominal les exclut", "Il n''y a aucune différence entre les deux"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le PIB nominal est calculé aux prix courants de l''année en cours, il intègre donc l''effet de l''inflation. Le PIB réel est calculé aux prix constants d''une année de base, ce qui permet d''isoler la variation réelle de la production en éliminant l''effet des prix.", "steps": ["Le PIB nominal = somme des valeurs ajoutées aux prix courants.", "Le PIB réel = somme des valeurs ajoutées aux prix constants (année de base).", "PIB réel = PIB nominal / déflateur du PIB × 100.", "Le PIB réel permet de comparer la production entre différentes années sans biais d''inflation."]}',
  '{"économie","croissance","PIB","PIB_nominal","PIB_réel"}'
),
(
  '44444444-0000-0000-0000-000000000670',
  '33333333-0000-0000-0000-000000000099',
  'mcq', 2, 'fr',
  '{"stem": "Parmi les facteurs suivants, lequel est un facteur intensif de la croissance économique ?", "choices": ["Le progrès technique", "L''augmentation de la quantité de travail", "L''augmentation du stock de capital physique", "La croissance démographique"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La croissance intensive repose sur l''amélioration de l''efficacité des facteurs de production, principalement grâce au progrès technique. La croissance extensive repose sur l''augmentation des quantités de facteurs (plus de travail, plus de capital). Le progrès technique est un facteur intensif car il augmente la productivité sans augmenter les quantités de facteurs.", "steps": ["La croissance extensive = augmentation des quantités de facteurs (travail, capital).", "La croissance intensive = amélioration de l''efficacité des facteurs existants.", "Le progrès technique accroît la productivité globale des facteurs (PGF).", "Exemples : innovations technologiques, amélioration de l''organisation du travail."]}',
  '{"économie","croissance","facteurs_de_croissance","progrès_technique"}'
),
(
  '44444444-0000-0000-0000-000000000671',
  '33333333-0000-0000-0000-000000000099',
  'mcq', 3, 'fr',
  '{"stem": "Selon la formule du PIB par l''approche de la demande, quelle est l''expression correcte ?", "choices": ["PIB = C + I + G + (X − M)", "PIB = C + I + G − (X + M)", "PIB = C × I × G × (X − M)", "PIB = C + I − G + (X + M)"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''approche par la demande (ou dépenses) décompose le PIB en quatre composantes : la consommation finale (C), l''investissement (I, ou FBCF), les dépenses publiques (G) et le solde du commerce extérieur (exportations X moins importations M). Cette identité comptable est fondamentale en macroéconomie.", "steps": ["C = consommation finale des ménages.", "I = investissement (formation brute de capital fixe).", "G = dépenses de consommation des administrations publiques.", "(X − M) = solde de la balance commerciale (exportations − importations).", "PIB = C + I + G + (X − M)."]}',
  '{"économie","croissance","PIB","approche_demande","comptabilité_nationale"}'
),
(
  '44444444-0000-0000-0000-000000000672',
  '33333333-0000-0000-0000-000000000099',
  'numeric', 2, 'fr',
  '{"stem": "Le PIB d''un pays était de 500 milliards de DH en 2023 et de 525 milliards de DH en 2024. Quel est le taux de croissance du PIB en pourcentage ?", "correct_value": 5, "tolerance": 0, "unit": "%"}',
  '{"text_fr": "Le taux de croissance se calcule en rapportant la variation du PIB au PIB de l''année initiale : ((525 − 500) / 500) × 100 = 5 %. Ce taux mesure la variation relative de la production d''une année à l''autre.", "steps": ["Variation du PIB = 525 − 500 = 25 milliards de DH.", "Taux de croissance = (variation / PIB initial) × 100.", "Taux de croissance = (25 / 500) × 100 = 5 %."]}',
  '{"économie","croissance","PIB","taux_de_croissance","calcul"}'
),
(
  '44444444-0000-0000-0000-000000000673',
  '33333333-0000-0000-0000-000000000099',
  'numeric', 3, 'fr',
  '{"stem": "Le PIB nominal d''un pays est de 800 milliards de DH et le déflateur du PIB est de 125. Quel est le PIB réel en milliards de DH ?", "correct_value": 640, "tolerance": 0, "unit": "milliards de DH"}',
  '{"text_fr": "Le PIB réel se calcule en divisant le PIB nominal par le déflateur du PIB, puis en multipliant par 100 : PIB réel = (800 / 125) × 100 = 640 milliards de DH. Le déflateur supérieur à 100 indique une hausse des prix par rapport à l''année de base.", "steps": ["Formule : PIB réel = (PIB nominal / déflateur) × 100.", "PIB réel = (800 / 125) × 100.", "PIB réel = 6,4 × 100 = 640 milliards de DH.", "Le déflateur de 125 signifie que les prix ont augmenté de 25 % par rapport à l''année de base."]}',
  '{"économie","croissance","PIB","PIB_réel","déflateur","calcul"}'
),
(
  '44444444-0000-0000-0000-000000000674',
  '33333333-0000-0000-0000-000000000099',
  'true_false', 2, 'fr',
  '{"statement": "Le PIB mesure l''ensemble des richesses produites sur le territoire national, y compris le travail domestique non rémunéré et l''économie informelle.", "correct_answer": false}',
  '{"text_fr": "Le PIB ne mesure que la production marchande et certaines productions non marchandes évaluées à leur coût de production. Le travail domestique non rémunéré (ménage, garde d''enfants, etc.) et l''économie informelle (travail au noir, économie souterraine) ne sont pas comptabilisés dans le PIB, ce qui constitue l''une de ses limites.", "steps": ["Le PIB comptabilise les biens et services produits et échangés sur le marché.", "Les productions non marchandes des administrations sont évaluées à leur coût.", "Le travail domestique non rémunéré est exclu du PIB.", "L''économie informelle échappe également à la mesure du PIB."]}',
  '{"économie","croissance","PIB","limites_du_PIB"}'
),
(
  '44444444-0000-0000-0000-000000000675',
  '33333333-0000-0000-0000-000000000099',
  'true_false', 2, 'fr',
  '{"statement": "L''accumulation du capital (investissement) est un facteur de croissance extensive lorsqu''elle augmente la quantité de machines, et un facteur de croissance intensive lorsqu''elle incorpore du progrès technique.", "correct_answer": true}',
  '{"text_fr": "L''investissement joue un double rôle dans la croissance. Lorsqu''il consiste à ajouter des machines identiques (investissement de capacité), il contribue à la croissance extensive. Lorsqu''il permet d''acquérir des équipements plus performants intégrant des innovations (investissement de modernisation), il contribue à la croissance intensive en augmentant la productivité.", "steps": ["Investissement de capacité : augmente la quantité de capital → croissance extensive.", "Investissement de modernisation : intègre le progrès technique → croissance intensive.", "Le progrès technique incorporé dans le capital est un moteur de la productivité.", "Distinction fondamentale entre accumulation quantitative et amélioration qualitative du capital."]}',
  '{"économie","croissance","investissement","capital","facteurs_de_croissance"}'
);

-- =====================
-- SKILL: development_indicators (Indicateurs de développement) — 7 items
-- 3 mcq + 2 numeric + 2 true_false
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000676',
  '33333333-0000-0000-0000-000000000100',
  'mcq', 2, 'fr',
  '{"stem": "Quelles sont les trois dimensions prises en compte dans le calcul de l''Indice de Développement Humain (IDH) ?", "choices": ["La santé, l''éducation et le niveau de vie", "La croissance du PIB, l''inflation et le chômage", "L''espérance de vie, le taux de natalité et le PIB nominal", "Le taux d''alphabétisation, le taux de scolarisation et le revenu par habitant"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''IDH, créé par le PNUD en 1990, mesure le développement humain selon trois dimensions fondamentales : la santé (mesurée par l''espérance de vie à la naissance), l''éducation (mesurée par la durée moyenne et la durée attendue de scolarisation) et le niveau de vie (mesuré par le revenu national brut par habitant en parité de pouvoir d''achat).", "steps": ["Dimension santé : espérance de vie à la naissance.", "Dimension éducation : durée moyenne de scolarisation + durée attendue de scolarisation.", "Dimension niveau de vie : RNB par habitant en PPA.", "L''IDH est compris entre 0 et 1 ; plus il est proche de 1, plus le développement est élevé."]}',
  '{"économie","développement","IDH","indicateurs"}'
),
(
  '44444444-0000-0000-0000-000000000677',
  '33333333-0000-0000-0000-000000000100',
  'mcq', 2, 'fr',
  '{"stem": "Quelle est la différence fondamentale entre la croissance économique et le développement ?", "choices": ["La croissance est quantitative (augmentation du PIB), le développement est qualitatif (transformations structurelles)", "La croissance concerne les pays riches, le développement les pays pauvres", "La croissance est mesurée par l''IDH, le développement par le PIB", "Il n''y a aucune différence, ce sont des synonymes"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La croissance économique désigne l''augmentation soutenue de la production (mesurée par le PIB). Le développement est un concept plus large qui englobe les transformations structurelles de la société : amélioration de la santé, de l''éducation, réduction des inégalités, changements institutionnels. La croissance est nécessaire mais pas suffisante pour le développement.", "steps": ["Croissance = phénomène quantitatif mesuré par le PIB.", "Développement = phénomène qualitatif englobant des transformations économiques, sociales et culturelles.", "La croissance peut exister sans développement (si les fruits ne profitent pas à la population).", "Le développement suppose une amélioration du bien-être global de la population."]}',
  '{"économie","développement","croissance","distinction"}'
),
(
  '44444444-0000-0000-0000-000000000678',
  '33333333-0000-0000-0000-000000000100',
  'mcq', 3, 'fr',
  '{"stem": "Le concept de développement durable repose sur la conciliation de trois piliers. Lesquels ?", "choices": ["Économique, social et environnemental", "Politique, culturel et technologique", "Financier, commercial et industriel", "Démographique, éducatif et sanitaire"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le développement durable, défini par le rapport Brundtland (1987), est un développement qui répond aux besoins du présent sans compromettre la capacité des générations futures à répondre aux leurs. Il repose sur trois piliers indissociables : le pilier économique (croissance viable), le pilier social (équité et cohésion sociale) et le pilier environnemental (préservation des ressources et de l''écosystème).", "steps": ["Pilier économique : assurer une croissance efficace et durable.", "Pilier social : réduire les inégalités et garantir l''équité intergénérationnelle.", "Pilier environnemental : préserver les ressources naturelles et la biodiversité.", "Le rapport Brundtland (1987) a popularisé ce concept à l''échelle internationale."]}',
  '{"économie","développement","développement_durable","piliers"}'
),
(
  '44444444-0000-0000-0000-000000000679',
  '33333333-0000-0000-0000-000000000100',
  'numeric', 2, 'fr',
  '{"stem": "Un pays a une espérance de vie de 75 ans, une durée moyenne de scolarisation de 6 ans (max 15), une durée attendue de scolarisation de 12 ans (max 18), et un RNB/hab de 10 000 $ PPA. Si l''indice de santé est 0,833, l''indice d''éducation est 0,533 et l''indice de revenu est 0,650, quel est l''IDH (arrondi au millième) ?", "correct_value": 0.662, "tolerance": 0.002, "unit": ""}',
  '{"text_fr": "L''IDH est la moyenne géométrique des trois indices dimensionnels : IDH = (I_santé × I_éducation × I_revenu)^(1/3). Soit IDH = (0,833 × 0,533 × 0,650)^(1/3) = (0,2886)^(1/3) ≈ 0,661. Ce résultat place le pays dans la catégorie de développement humain moyen.", "steps": ["I_santé = 0,833 ; I_éducation = 0,533 ; I_revenu = 0,650.", "Produit = 0,833 × 0,533 × 0,650 ≈ 0,2886.", "IDH = racine cubique de 0,2886 ≈ 0,661.", "IDH < 0,700 → développement humain moyen."]}',
  '{"économie","développement","IDH","calcul"}'
),
(
  '44444444-0000-0000-0000-000000000680',
  '33333333-0000-0000-0000-000000000100',
  'numeric', 2, 'fr',
  '{"stem": "Un pays a un PIB de 1 200 milliards de DH et une population de 36 millions d''habitants. Quel est le PIB par habitant en DH (arrondi à l''entier) ?", "correct_value": 33333, "tolerance": 1, "unit": "DH"}',
  '{"text_fr": "Le PIB par habitant se calcule en divisant le PIB total par la population : 1 200 000 000 000 / 36 000 000 = 33 333 DH. Cet indicateur donne une mesure du niveau de vie moyen, mais ne renseigne pas sur la répartition des revenus au sein de la population.", "steps": ["PIB par habitant = PIB / Population.", "PIB par habitant = 1 200 milliards / 36 millions.", "PIB par habitant = 1 200 000 000 000 / 36 000 000 = 33 333 DH.", "Limite : le PIB par habitant est une moyenne qui masque les inégalités."]}',
  '{"économie","développement","PIB_par_habitant","calcul","niveau_de_vie"}'
),
(
  '44444444-0000-0000-0000-000000000681',
  '33333333-0000-0000-0000-000000000100',
  'true_false', 2, 'fr',
  '{"statement": "L''IDH est un indicateur parfait du développement car il prend en compte toutes les dimensions du bien-être humain, y compris les inégalités et la liberté politique.", "correct_answer": false}',
  '{"text_fr": "L''IDH est un indicateur synthétique utile mais imparfait. Il ne prend en compte que trois dimensions (santé, éducation, niveau de vie) et ignore les inégalités internes, les libertés politiques, la sécurité, l''environnement et la participation sociale. C''est pourquoi le PNUD a introduit des indicateurs complémentaires comme l''IDHI (IDH ajusté aux inégalités) et l''IPM (indice de pauvreté multidimensionnelle).", "steps": ["L''IDH ne mesure que trois dimensions : santé, éducation et niveau de vie.", "Il ne rend pas compte des inégalités de répartition au sein du pays.", "Les libertés politiques et les droits humains ne sont pas intégrés.", "Des indicateurs complémentaires (IDHI, IPM) corrigent certaines de ces limites."]}',
  '{"économie","développement","IDH","limites"}'
),
(
  '44444444-0000-0000-0000-000000000682',
  '33333333-0000-0000-0000-000000000100',
  'true_false', 2, 'fr',
  '{"statement": "Le développement durable implique une solidarité intergénérationnelle, c''est-à-dire la prise en compte des besoins des générations futures.", "correct_answer": true}',
  '{"text_fr": "Le développement durable, tel que défini par le rapport Brundtland (1987), est « un développement qui répond aux besoins du présent sans compromettre la capacité des générations futures à répondre aux leurs ». La solidarité intergénérationnelle est donc au cœur de ce concept : il s''agit de léguer aux générations futures un patrimoine (naturel, économique, social) au moins équivalent à celui dont dispose la génération actuelle.", "steps": ["Le rapport Brundtland (1987) définit le développement durable.", "La notion clé est la solidarité entre générations présentes et futures.", "Cela implique de ne pas épuiser les ressources naturelles.", "Il faut concilier les besoins actuels avec la préservation du patrimoine futur."]}',
  '{"économie","développement","développement_durable","solidarité_intergénérationnelle"}'
);

-- =====================
-- SKILL: international_trade (Échanges internationaux) — 7 items
-- 3 mcq + 2 numeric + 2 true_false
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000683',
  '33333333-0000-0000-0000-000000000101',
  'mcq', 2, 'fr',
  '{"stem": "Selon la théorie des avantages comparatifs de Ricardo, un pays doit se spécialiser dans :", "choices": ["La production du bien pour lequel il a le coût d''opportunité le plus faible", "La production du bien qu''il produit en plus grande quantité", "La production du bien le plus demandé sur le marché mondial", "La production de tous les biens pour réduire sa dépendance extérieure"], "correct_index": 0, "latex": false}',
  '{"text_fr": "David Ricardo (1817) démontre que même si un pays est moins efficace que son partenaire dans la production de tous les biens, il a intérêt à se spécialiser dans la production du bien pour lequel son désavantage est le moindre (coût d''opportunité le plus faible). L''échange international permet alors un gain mutuel pour les deux pays.", "steps": ["Un avantage comparatif existe quand un pays a un coût d''opportunité relatif plus faible.", "Même un pays moins productif dans tous les domaines peut avoir un avantage comparatif.", "La spécialisation selon l''avantage comparatif permet un gain à l''échange pour tous.", "Exemple classique de Ricardo : l''Angleterre (drap) et le Portugal (vin)."]}',
  '{"économie","échanges_internationaux","avantages_comparatifs","Ricardo","spécialisation"}'
),
(
  '44444444-0000-0000-0000-000000000684',
  '33333333-0000-0000-0000-000000000101',
  'mcq', 2, 'fr',
  '{"stem": "Quel est le rôle principal de l''Organisation Mondiale du Commerce (OMC) ?", "choices": ["Promouvoir la libéralisation des échanges commerciaux et régler les différends entre pays", "Accorder des prêts aux pays en développement", "Fixer les taux de change entre les monnaies", "Contrôler l''inflation dans les pays membres"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''OMC, créée en 1995 (succédant au GATT), a pour mission principale de promouvoir le libre-échange en réduisant les barrières commerciales (droits de douane, quotas, subventions) et de fournir un cadre pour la négociation et le règlement des différends commerciaux entre ses pays membres. Elle repose sur des principes clés comme la clause de la nation la plus favorisée et le traitement national.", "steps": ["L''OMC succède au GATT depuis 1995.", "Elle favorise la libéralisation des échanges commerciaux.", "Elle dispose d''un organe de règlement des différends (ORD).", "Principes : clause de la nation la plus favorisée, non-discrimination, transparence."]}',
  '{"économie","échanges_internationaux","OMC","libre_échange","commerce_international"}'
),
(
  '44444444-0000-0000-0000-000000000685',
  '33333333-0000-0000-0000-000000000101',
  'mcq', 3, 'fr',
  '{"stem": "Le Maroc a signé de nombreux accords de libre-échange (ALE). Quel est l''objectif principal de ces accords pour l''économie marocaine ?", "choices": ["Accéder à de nouveaux marchés et attirer les investissements étrangers", "Augmenter les droits de douane sur les produits importés", "Réduire le volume total des échanges commerciaux", "Protéger les entreprises nationales de toute concurrence étrangère"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le Maroc a signé des ALE avec de nombreux partenaires (UE, États-Unis, Turquie, pays arabes, etc.) dans le but de diversifier ses partenaires commerciaux, d''accéder à de nouveaux marchés pour ses exportations, d''attirer les investissements directs étrangers (IDE) et de stimuler la compétitivité de son économie. Ces accords réduisent ou éliminent les droits de douane entre les pays signataires.", "steps": ["Le Maroc a signé des ALE avec l''UE (2000), les États-Unis (2006), la Turquie (2006), etc.", "Objectif : diversifier les partenaires et accéder à de nouveaux marchés.", "Les ALE attirent les IDE en offrant un cadre commercial favorable.", "Ils stimulent la compétitivité en exposant les entreprises à la concurrence internationale."]}',
  '{"économie","échanges_internationaux","Maroc","accords_libre_échange","ALE"}'
),
(
  '44444444-0000-0000-0000-000000000686',
  '33333333-0000-0000-0000-000000000101',
  'numeric', 2, 'fr',
  '{"stem": "Un pays exporte pour 200 milliards de DH et importe pour 320 milliards de DH. Quel est le taux de couverture du commerce extérieur en pourcentage (arrondi à l''entier) ?", "correct_value": 63, "tolerance": 1, "unit": "%"}',
  '{"text_fr": "Le taux de couverture mesure la part des importations financée par les exportations : (Exportations / Importations) × 100 = (200 / 320) × 100 = 62,5 %, arrondi à 63 %. Un taux inférieur à 100 % signifie que le pays a un déficit commercial : ses importations dépassent ses exportations.", "steps": ["Taux de couverture = (Exportations / Importations) × 100.", "Taux de couverture = (200 / 320) × 100 = 62,5 %.", "Arrondi à l''entier : 63 %.", "Taux < 100 % → déficit commercial (les importations dépassent les exportations)."]}',
  '{"économie","échanges_internationaux","balance_commerciale","taux_de_couverture","calcul"}'
),
(
  '44444444-0000-0000-0000-000000000687',
  '33333333-0000-0000-0000-000000000101',
  'numeric', 2, 'fr',
  '{"stem": "Un pays a des exportations de biens et services de 450 milliards de DH et des importations de biens et services de 520 milliards de DH. Quel est le solde de la balance commerciale en milliards de DH ?", "correct_value": -70, "tolerance": 0, "unit": "milliards de DH"}',
  '{"text_fr": "Le solde de la balance commerciale est la différence entre les exportations et les importations : 450 − 520 = −70 milliards de DH. Un solde négatif indique un déficit commercial, ce qui signifie que le pays achète plus de biens et services à l''étranger qu''il n''en vend.", "steps": ["Solde commercial = Exportations − Importations.", "Solde commercial = 450 − 520 = −70 milliards de DH.", "Solde négatif → déficit commercial.", "Le pays doit financer ce déficit par d''autres flux (IDE, transferts, emprunts)."]}',
  '{"économie","échanges_internationaux","balance_commerciale","solde_commercial","calcul"}'
),
(
  '44444444-0000-0000-0000-000000000688',
  '33333333-0000-0000-0000-000000000101',
  'true_false', 2, 'fr',
  '{"statement": "Le protectionnisme consiste à supprimer toutes les barrières douanières pour faciliter les échanges commerciaux entre les pays.", "correct_answer": false}',
  '{"text_fr": "Le protectionnisme est exactement l''inverse : c''est une politique commerciale qui vise à protéger la production nationale de la concurrence étrangère en mettant en place des barrières aux échanges. Ces barrières peuvent être tarifaires (droits de douane) ou non tarifaires (quotas, normes, subventions aux producteurs nationaux). C''est le libre-échange qui consiste à supprimer les barrières commerciales.", "steps": ["Le protectionnisme = politique de protection de la production nationale.", "Barrières tarifaires : droits de douane qui augmentent le prix des produits importés.", "Barrières non tarifaires : quotas, normes techniques, subventions.", "Le libre-échange est le contraire : il vise à supprimer les obstacles aux échanges."]}',
  '{"économie","échanges_internationaux","protectionnisme","libre_échange","barrières_commerciales"}'
),
(
  '44444444-0000-0000-0000-000000000689',
  '33333333-0000-0000-0000-000000000101',
  'true_false', 3, 'fr',
  '{"statement": "La balance des paiements enregistre l''ensemble des transactions économiques et financières d''un pays avec le reste du monde au cours d''une période donnée.", "correct_answer": true}',
  '{"text_fr": "La balance des paiements est un document comptable qui retrace l''ensemble des flux économiques et financiers entre un pays et le reste du monde pendant une période (généralement une année). Elle comprend le compte des transactions courantes (biens, services, revenus, transferts), le compte de capital et le compte financier (IDE, investissements de portefeuille, autres investissements, avoirs de réserve).", "steps": ["La balance des paiements enregistre toutes les transactions avec l''extérieur.", "Compte des transactions courantes : échanges de biens, services, revenus et transferts.", "Compte de capital : transferts en capital et acquisitions d''actifs non financiers.", "Compte financier : IDE, investissements de portefeuille, avoirs de réserve.", "Par construction comptable, la balance des paiements est toujours équilibrée."]}',
  '{"économie","échanges_internationaux","balance_des_paiements","comptabilité_nationale"}'
);
