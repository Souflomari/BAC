-- ============================================================
-- BUSINESS CONTENT: Organisation et gestion (3 skills, 21 items)
-- Topic: Organisation et gestion
-- Skills:
--   org_structure         (33333333-...-104) difficulty 2 — 7 items
--   human_resources       (33333333-...-105) difficulty 2 — 7 items
--   production_management (33333333-...-106) difficulty 2 — 7 items
-- ============================================================

-- =====================
-- SKILL: org_structure (Structure organisationnelle) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000704',
  '33333333-0000-0000-0000-000000000104',
  'mcq', 2, 'fr',
  '{"stem": "Quel type d''organigramme représente une structure où chaque subordonné dépend d''un seul supérieur hiérarchique ?", "choices": ["L''organigramme hiérarchique", "L''organigramme fonctionnel", "L''organigramme matriciel", "L''organigramme circulaire"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''organigramme hiérarchique (ou pyramidal) repose sur le principe d''unicité de commandement : chaque salarié ne reçoit des ordres que d''un seul supérieur. Ce modèle, inspiré de Fayol, assure une autorité claire mais peut ralentir la communication.", "steps": ["L''organigramme hiérarchique applique le principe d''unicité de commandement de Fayol", "Chaque subordonné n''a qu''un seul chef direct", "L''organigramme fonctionnel permet à un salarié de dépendre de plusieurs supérieurs spécialisés", "L''organigramme matriciel combine les dimensions hiérarchique et fonctionnelle"]}',
  '{"entreprise","organisation","structure","organigramme"}'
),
(
  '44444444-0000-0000-0000-000000000705',
  '33333333-0000-0000-0000-000000000104',
  'mcq', 2, 'fr',
  '{"stem": "Dans une structure fonctionnelle (staff and line), quel est le rôle principal de l''état-major (staff) ?", "choices": ["Conseiller la direction sans pouvoir de décision sur les opérationnels", "Diriger directement les services opérationnels", "Remplacer le directeur général en son absence", "Contrôler les résultats financiers de chaque division"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Dans une structure staff and line, l''état-major (staff) joue un rôle de conseil et d''assistance auprès de la direction générale. Il ne dispose pas d''autorité hiérarchique sur les services opérationnels (line) qui, eux, exécutent les décisions.", "steps": ["La structure staff and line distingue deux types de responsables", "Le staff (état-major) conseille et assiste la direction", "La line (opérationnels) exécute les tâches et dispose de l''autorité hiérarchique", "Le staff n''a pas de pouvoir de commandement direct sur les opérationnels"]}',
  '{"entreprise","organisation","structure","staff_and_line"}'
),
(
  '44444444-0000-0000-0000-000000000706',
  '33333333-0000-0000-0000-000000000104',
  'mcq', 3, 'fr',
  '{"stem": "Quelle structure organisationnelle est la mieux adaptée à une entreprise qui gère simultanément plusieurs projets nécessitant des compétences transversales ?", "choices": ["La structure matricielle", "La structure hiérarchique simple", "La structure fonctionnelle pure", "La structure divisionnelle géographique"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La structure matricielle croise deux dimensions : une dimension fonctionnelle (compétences) et une dimension par projet ou par produit. Chaque collaborateur dépend à la fois d''un responsable fonctionnel et d''un chef de projet, ce qui favorise la flexibilité et la transversalité.", "steps": ["La structure matricielle combine deux lignes d''autorité", "Un axe fonctionnel regroupe les métiers et compétences", "Un axe projet ou produit organise les missions transversales", "Chaque salarié a donc deux supérieurs : un fonctionnel et un chef de projet"]}',
  '{"entreprise","organisation","structure","matricielle"}'
),
(
  '44444444-0000-0000-0000-000000000707',
  '33333333-0000-0000-0000-000000000104',
  'numeric', 2, 'fr',
  '{"stem": "Une entreprise possède un directeur général, 4 directeurs de département et 20 chefs d''équipe (5 par département). Combien de niveaux hiérarchiques cette structure comporte-t-elle ?", "correct_value": 3, "tolerance": 0, "unit": "niveaux"}',
  '{"text_fr": "La structure comporte 3 niveaux hiérarchiques : le directeur général (niveau 1), les 4 directeurs de département (niveau 2) et les 20 chefs d''équipe (niveau 3).", "steps": ["Niveau 1 : Directeur général (sommet de la hiérarchie)", "Niveau 2 : 4 directeurs de département", "Niveau 3 : 20 chefs d''équipe (5 par département)", "Total : 3 niveaux hiérarchiques"]}',
  '{"entreprise","organisation","structure","niveaux_hierarchiques"}'
),
(
  '44444444-0000-0000-0000-000000000708',
  '33333333-0000-0000-0000-000000000104',
  'numeric', 2, 'fr',
  '{"stem": "Un directeur supervise directement 8 responsables de service. Quel est l''éventail de subordination (span of control) de ce directeur ?", "correct_value": 8, "tolerance": 0, "unit": "subordonnés"}',
  '{"text_fr": "L''éventail de subordination (ou span of control) correspond au nombre de subordonnés directement rattachés à un supérieur hiérarchique. Ici, le directeur supervise directement 8 responsables, donc son éventail de subordination est de 8.", "steps": ["L''éventail de subordination mesure le nombre de subordonnés directs", "Le directeur a 8 responsables de service sous son autorité directe", "L''éventail de subordination est donc de 8", "Un éventail large favorise l''autonomie, un éventail étroit renforce le contrôle"]}',
  '{"entreprise","organisation","structure","eventail_subordination"}'
),
(
  '44444444-0000-0000-0000-000000000709',
  '33333333-0000-0000-0000-000000000104',
  'true_false', 2, 'fr',
  '{"statement": "La décentralisation consiste à transférer le pouvoir de décision vers les niveaux hiérarchiques inférieurs de l''organisation.", "correct_answer": true}',
  '{"text_fr": "Vrai. La décentralisation consiste à déléguer le pouvoir de décision aux échelons inférieurs de la hiérarchie (divisions, filiales, services). Elle permet une plus grande réactivité et une meilleure adaptation aux réalités du terrain, mais peut engendrer des incohérences si la coordination est insuffisante.", "steps": ["La décentralisation transfère le pouvoir de décision vers les niveaux inférieurs", "Elle favorise la réactivité et l''adaptation locale", "À l''inverse, la centralisation concentre les décisions au sommet", "La décentralisation nécessite une bonne coordination pour maintenir la cohérence"]}',
  '{"entreprise","organisation","structure","decentralisation"}'
),
(
  '44444444-0000-0000-0000-000000000710',
  '33333333-0000-0000-0000-000000000104',
  'true_false', 2, 'fr',
  '{"statement": "La coordination par ajustement mutuel repose sur une communication informelle et directe entre les membres de l''organisation.", "correct_answer": true}',
  '{"text_fr": "Vrai. Selon Mintzberg, l''ajustement mutuel est un mécanisme de coordination où les individus s''entendent directement par communication informelle. Il est efficace dans les petites structures ou dans les organisations très innovantes (adhocraties).", "steps": ["L''ajustement mutuel est un des mécanismes de coordination identifiés par Mintzberg", "Il repose sur la communication informelle et directe entre les acteurs", "Il est utilisé dans les petites équipes ou les projets innovants", "Les autres mécanismes incluent la supervision directe et la standardisation (des procédés, des résultats, des qualifications)"]}',
  '{"entreprise","organisation","structure","coordination","Mintzberg"}'
);

-- =====================
-- SKILL: human_resources (Gestion des ressources humaines) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000711',
  '33333333-0000-0000-0000-000000000105',
  'mcq', 2, 'fr',
  '{"stem": "Selon la pyramide de Maslow, quel besoin se situe au sommet de la hiérarchie ?", "choices": ["Le besoin d''accomplissement de soi", "Le besoin d''estime", "Le besoin d''appartenance", "Le besoin de sécurité"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La pyramide de Maslow classe les besoins humains en cinq niveaux, du plus fondamental au plus élevé : besoins physiologiques, besoin de sécurité, besoin d''appartenance, besoin d''estime et besoin d''accomplissement de soi (au sommet).", "steps": ["Niveau 1 : Besoins physiologiques (manger, dormir, se loger)", "Niveau 2 : Besoin de sécurité (emploi stable, protection)", "Niveau 3 : Besoin d''appartenance (intégration sociale, travail en équipe)", "Niveau 4 : Besoin d''estime (reconnaissance, statut)", "Niveau 5 : Besoin d''accomplissement de soi (réalisation personnelle, créativité)"]}',
  '{"entreprise","organisation","ressources_humaines","motivation","Maslow"}'
),
(
  '44444444-0000-0000-0000-000000000712',
  '33333333-0000-0000-0000-000000000105',
  'mcq', 2, 'fr',
  '{"stem": "Selon la théorie bifactorielle de Herzberg, lequel de ces éléments est un facteur de motivation (et non un simple facteur d''hygiène) ?", "choices": ["La reconnaissance du travail accompli", "Le salaire de base", "Les conditions matérielles de travail", "La sécurité de l''emploi"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Herzberg distingue les facteurs d''hygiène (salaire, conditions de travail, sécurité) qui, s''ils sont absents, génèrent de l''insatisfaction, et les facteurs de motivation (reconnaissance, responsabilité, accomplissement) qui apportent une réelle satisfaction au travail.", "steps": ["Les facteurs d''hygiène : salaire, conditions de travail, sécurité, relations interpersonnelles", "Leur absence crée de l''insatisfaction, mais leur présence n''apporte pas de motivation", "Les facteurs de motivation : reconnaissance, responsabilité, accomplissement, contenu du travail", "Seuls les facteurs de motivation génèrent une satisfaction durable et un engagement"]}',
  '{"entreprise","organisation","ressources_humaines","motivation","Herzberg"}'
),
(
  '44444444-0000-0000-0000-000000000713',
  '33333333-0000-0000-0000-000000000105',
  'mcq', 3, 'fr',
  '{"stem": "Dans le processus de recrutement, quelle étape intervient immédiatement après la définition du profil du poste ?", "choices": ["La recherche de candidatures (sourcing)", "La rédaction du contrat de travail", "L''intégration du salarié dans l''entreprise", "L''évaluation annuelle des performances"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le processus de recrutement suit un ordre logique : identification du besoin, définition du poste et du profil recherché, recherche de candidatures (sourcing interne ou externe), présélection, entretiens, décision, puis intégration du nouveau salarié.", "steps": ["Étape 1 : Identification du besoin en personnel", "Étape 2 : Définition du poste et du profil recherché", "Étape 3 : Recherche de candidatures (annonces, cooptation, cabinets)", "Étape 4 : Sélection (tri des CV, entretiens, tests)", "Étape 5 : Décision d''embauche et intégration"]}',
  '{"entreprise","organisation","ressources_humaines","recrutement"}'
),
(
  '44444444-0000-0000-0000-000000000714',
  '33333333-0000-0000-0000-000000000105',
  'numeric', 2, 'fr',
  '{"stem": "Un salarié perçoit un salaire brut mensuel de 6 000 DH. Les cotisations salariales représentent 18% du salaire brut. Quel est son salaire net mensuel en DH ?", "correct_value": 4920, "tolerance": 0, "unit": "DH"}',
  '{"text_fr": "Le salaire net se calcule en déduisant les cotisations salariales du salaire brut. Salaire net = Salaire brut - Cotisations salariales = 6 000 - (6 000 × 18%) = 6 000 - 1 080 = 4 920 DH.", "steps": ["Salaire brut = 6 000 DH", "Cotisations salariales = 6 000 × 18/100 = 1 080 DH", "Salaire net = 6 000 - 1 080 = 4 920 DH", "Le salaire net est le montant effectivement perçu par le salarié après déductions"]}',
  '{"entreprise","organisation","ressources_humaines","remuneration"}'
),
(
  '44444444-0000-0000-0000-000000000715',
  '33333333-0000-0000-0000-000000000105',
  'numeric', 2, 'fr',
  '{"stem": "Une entreprise de 200 salariés a enregistré 15 départs au cours de l''année. Quel est le taux de rotation (turnover) du personnel en pourcentage ?", "correct_value": 7.5, "tolerance": 0.1, "unit": "%"}',
  '{"text_fr": "Le taux de rotation du personnel (turnover) se calcule par la formule : (Nombre de départs / Effectif moyen) × 100. Ici : (15 / 200) × 100 = 7,5%.", "steps": ["Nombre de départs sur la période = 15", "Effectif moyen = 200 salariés", "Taux de turnover = (15 / 200) × 100", "Taux de turnover = 7,5%"]}',
  '{"entreprise","organisation","ressources_humaines","turnover"}'
),
(
  '44444444-0000-0000-0000-000000000716',
  '33333333-0000-0000-0000-000000000105',
  'true_false', 2, 'fr',
  '{"statement": "La formation continue permet aux salariés d''acquérir de nouvelles compétences tout au long de leur carrière professionnelle.", "correct_answer": true}',
  '{"text_fr": "Vrai. La formation continue est un droit pour les salariés et un investissement pour l''entreprise. Elle permet d''adapter les compétences aux évolutions technologiques et économiques, de favoriser la mobilité interne et de renforcer la compétitivité de l''entreprise.", "steps": ["La formation continue s''adresse aux salariés déjà en poste", "Elle vise l''adaptation des compétences aux évolutions du marché", "Elle favorise la promotion interne et la polyvalence", "L''entreprise y gagne en productivité et en fidélisation des salariés"]}',
  '{"entreprise","organisation","ressources_humaines","formation"}'
),
(
  '44444444-0000-0000-0000-000000000717',
  '33333333-0000-0000-0000-000000000105',
  'true_false', 2, 'fr',
  '{"statement": "Le recrutement interne consiste à embaucher un candidat extérieur à l''entreprise pour pourvoir un poste vacant.", "correct_answer": false}',
  '{"text_fr": "Faux. Le recrutement interne consiste à pourvoir un poste vacant en faisant appel à un salarié déjà présent dans l''entreprise (mutation, promotion). C''est le recrutement externe qui fait appel à des candidats extérieurs à l''organisation.", "steps": ["Le recrutement interne puise dans les effectifs existants de l''entreprise", "Il se fait par promotion, mutation ou réaffectation", "Avantages : connaissance du salarié, coût réduit, effet motivant", "Le recrutement externe recherche des candidats en dehors de l''entreprise"]}',
  '{"entreprise","organisation","ressources_humaines","recrutement"}'
);

-- =====================
-- SKILL: production_management (Gestion de la production) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000718',
  '33333333-0000-0000-0000-000000000106',
  'mcq', 2, 'fr',
  '{"stem": "Le modèle de Wilson permet de déterminer :", "choices": ["La quantité économique de commande qui minimise le coût total de gestion des stocks", "Le chiffre d''affaires prévisionnel de l''entreprise", "Le seuil de rentabilité de l''entreprise", "Le taux de marge bénéficiaire sur un produit"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le modèle de Wilson (ou formule du lot économique) détermine la quantité optimale à commander pour minimiser le coût total de gestion des stocks, c''est-à-dire la somme du coût de passation des commandes et du coût de possession du stock.", "steps": ["Le modèle de Wilson optimise la gestion des approvisionnements", "Il minimise le coût total = coût de passation + coût de possession", "La formule est : Q* = √(2 × D × Cc / Cs)", "D = demande annuelle, Cc = coût de commande, Cs = coût de stockage unitaire annuel"]}',
  '{"entreprise","organisation","production","stocks","Wilson"}'
),
(
  '44444444-0000-0000-0000-000000000719',
  '33333333-0000-0000-0000-000000000106',
  'mcq', 2, 'fr',
  '{"stem": "Le mode de production en juste-à-temps (JAT) a pour objectif principal de :", "choices": ["Réduire les stocks au minimum en produisant uniquement ce qui est demandé", "Augmenter les stocks de sécurité pour éviter les ruptures", "Produire en grandes séries pour réaliser des économies d''échelle", "Stocker les produits finis en avance pour répondre rapidement à la demande"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le juste-à-temps (JAT ou JIT) est un mode de production à flux tendu développé par Toyota. Il vise à produire exactement ce qui est nécessaire, au moment où c''est nécessaire, en éliminant les gaspillages et en réduisant les stocks au strict minimum.", "steps": ["Le JAT produit uniquement en fonction de la demande réelle", "Il réduit les stocks de matières premières, d''en-cours et de produits finis", "Il exige une coordination parfaite avec les fournisseurs", "Les avantages : réduction des coûts de stockage, amélioration de la qualité, flexibilité"]}',
  '{"entreprise","organisation","production","JAT","flux_tendu"}'
),
(
  '44444444-0000-0000-0000-000000000720',
  '33333333-0000-0000-0000-000000000106',
  'mcq', 3, 'fr',
  '{"stem": "Le seuil de rentabilité correspond au niveau d''activité pour lequel :", "choices": ["Le chiffre d''affaires couvre exactement l''ensemble des charges (résultat nul)", "Le bénéfice atteint son maximum", "Les charges variables sont égales aux charges fixes", "Le coût de production est minimal"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le seuil de rentabilité (ou point mort) est le niveau de chiffre d''affaires pour lequel l''entreprise ne réalise ni bénéfice ni perte. Au-delà de ce seuil, chaque unité vendue génère un bénéfice.", "steps": ["Au seuil de rentabilité : Chiffre d''affaires = Total des charges", "Le résultat est donc nul (ni bénéfice, ni perte)", "Formule : SR = Charges fixes / Taux de marge sur coût variable", "Au-delà du seuil, l''entreprise commence à dégager un bénéfice"]}',
  '{"entreprise","organisation","production","seuil_rentabilite"}'
),
(
  '44444444-0000-0000-0000-000000000721',
  '33333333-0000-0000-0000-000000000106',
  'numeric', 2, 'fr',
  '{"stem": "La consommation annuelle d''une matière première est de 3 600 unités. Le coût de passation d''une commande est de 200 DH et le coût de possession unitaire annuel est de 8 DH. Calculez la quantité économique de commande (formule de Wilson). Arrondissez à l''unité.", "correct_value": 424, "tolerance": 1, "unit": "unités"}',
  '{"text_fr": "La quantité économique de commande selon Wilson est : Q* = √(2 × D × Cc / Cs) = √(2 × 3 600 × 200 / 8) = √(1 440 000 / 8) = √180 000 ≈ 424 unités.", "steps": ["D = 3 600 unités (consommation annuelle)", "Cc = 200 DH (coût de passation d''une commande)", "Cs = 8 DH (coût de possession unitaire annuel)", "Q* = √(2 × 3 600 × 200 / 8) = √180 000 ≈ 424 unités"]}',
  '{"entreprise","organisation","production","stocks","Wilson"}'
),
(
  '44444444-0000-0000-0000-000000000722',
  '33333333-0000-0000-0000-000000000106',
  'numeric', 2, 'fr',
  '{"stem": "Une entreprise a des charges fixes de 150 000 DH et un taux de marge sur coût variable de 30%. Quel est le seuil de rentabilité (chiffre d''affaires critique) en DH ?", "correct_value": 500000, "tolerance": 0, "unit": "DH"}',
  '{"text_fr": "Le seuil de rentabilité se calcule par la formule : SR = Charges fixes / Taux de marge sur coût variable = 150 000 / 0,30 = 500 000 DH. L''entreprise doit réaliser un chiffre d''affaires de 500 000 DH pour couvrir l''ensemble de ses charges.", "steps": ["Charges fixes = 150 000 DH", "Taux de marge sur coût variable = 30% = 0,30", "SR = Charges fixes / Taux de MSCV = 150 000 / 0,30", "SR = 500 000 DH"]}',
  '{"entreprise","organisation","production","seuil_rentabilite"}'
),
(
  '44444444-0000-0000-0000-000000000723',
  '33333333-0000-0000-0000-000000000106',
  'true_false', 2, 'fr',
  '{"statement": "La productivité du travail se mesure par le rapport entre la quantité produite et la quantité de travail utilisée.", "correct_answer": true}',
  '{"text_fr": "Vrai. La productivité du travail mesure l''efficacité du facteur travail. Elle se calcule par le rapport : Production / Quantité de travail (en heures ou en nombre de salariés). Une productivité élevée signifie que l''entreprise produit plus avec moins de travail.", "steps": ["Productivité du travail = Production / Quantité de travail", "Elle peut être exprimée en unités produites par heure ou par salarié", "Elle mesure l''efficacité de l''utilisation du facteur travail", "Elle peut être améliorée par la formation, l''investissement et l''organisation du travail"]}',
  '{"entreprise","organisation","production","productivite"}'
),
(
  '44444444-0000-0000-0000-000000000724',
  '33333333-0000-0000-0000-000000000106',
  'true_false', 2, 'fr',
  '{"statement": "La production à flux tendu nécessite de constituer d''importants stocks de sécurité pour garantir la continuité de la production.", "correct_answer": false}',
  '{"text_fr": "Faux. La production à flux tendu (ou juste-à-temps) vise précisément à réduire les stocks au strict minimum, voire à les éliminer. Elle repose sur une synchronisation parfaite entre la demande et la production, ce qui réduit les coûts de stockage mais exige une grande fiabilité des fournisseurs.", "steps": ["La production à flux tendu cherche à minimiser les stocks, pas à les augmenter", "Elle produit uniquement en fonction de la demande réelle", "Elle exige des fournisseurs fiables et des délais de livraison courts", "Le risque principal est la rupture d''approvisionnement en cas de défaillance d''un fournisseur"]}',
  '{"entreprise","organisation","production","flux_tendu"}'
);
