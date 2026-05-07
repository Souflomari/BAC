-- ============================================================
-- FRENCH CONTENT: Lecture et compréhension (3 skills, 21 items)
-- Topic: Lecture et compréhension (Reading)
-- Skills:
--   text_analysis   (33333333-...-063) difficulty 2 — 7 items
--   figures_style    (33333333-...-064) difficulty 2 — 7 items
--   argumentation    (33333333-...-065) difficulty 2 — 7 items
-- ============================================================

-- =====================
-- SKILL: text_analysis (Analyse de texte) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000417',
  '33333333-0000-0000-0000-000000000063',
  'mcq', 2, 'fr',
  '{"stem": "Quel type de texte a pour objectif principal de raconter une histoire ou une suite d''événements ?", "choices": ["Le texte narratif", "Le texte descriptif", "Le texte argumentatif", "Le texte explicatif"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le texte narratif a pour fonction de raconter des événements réels ou fictifs. Il se caractérise par la présence d''un narrateur, d''une chronologie et de péripéties.", "steps": ["Le texte narratif raconte une histoire ou des événements", "Le texte descriptif dépeint un lieu, un personnage ou un objet", "Le texte argumentatif défend une thèse", "Le texte explicatif informe et explique un phénomène"]}',
  '{"français","lecture","analyse","types_de_textes"}'
),
(
  '44444444-0000-0000-0000-000000000418',
  '33333333-0000-0000-0000-000000000063',
  'mcq', 2, 'fr',
  '{"stem": "Dans un texte descriptif, quel procédé l''auteur utilise-t-il principalement pour caractériser un lieu ou un personnage ?", "choices": ["Les expansions du nom (adjectifs, compléments du nom, propositions relatives)", "Les connecteurs logiques", "Les verbes d''action au passé simple", "Les arguments d''autorité"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le texte descriptif repose sur les expansions du nom : adjectifs qualificatifs, compléments du nom, propositions subordonnées relatives. Ces procédés permettent de caractériser et de détailler les éléments décrits.", "steps": ["Le texte descriptif vise à représenter un lieu, un objet ou un personnage", "Il utilise les expansions du nom pour enrichir la description", "Les adjectifs qualificatifs, les compléments du nom et les relatives sont les outils privilégiés", "Les connecteurs logiques et les arguments relèvent du texte argumentatif"]}',
  '{"français","lecture","analyse","texte_descriptif"}'
),
(
  '44444444-0000-0000-0000-000000000419',
  '33333333-0000-0000-0000-000000000063',
  'mcq', 2, 'fr',
  '{"stem": "Un champ lexical est :", "choices": ["Un ensemble de mots se rapportant à un même thème", "Un ensemble de mots ayant la même racine étymologique", "Un ensemble de mots appartenant à la même classe grammaticale", "Un ensemble de mots ayant le même nombre de syllabes"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Un champ lexical est un ensemble de mots (noms, verbes, adjectifs, adverbes) qui se rapportent à un même thème ou une même notion. Par exemple, le champ lexical de la guerre : combat, soldat, arme, vaincre, défaite.", "steps": ["Un champ lexical regroupe des mots autour d''un même thème", "Ces mots peuvent être de différentes classes grammaticales", "Exemple : champ lexical de la nature → arbre, fleurir, verdoyant, forêt", "Il ne faut pas confondre champ lexical et famille de mots (même racine)"]}',
  '{"français","lecture","analyse","champ_lexical"}'
),
(
  '44444444-0000-0000-0000-000000000420',
  '33333333-0000-0000-0000-000000000063',
  'mcq', 3, 'fr',
  '{"stem": "Parmi les propositions suivantes, laquelle caractérise un texte explicatif ?", "choices": ["Il vise à faire comprendre un phénomène en répondant à la question « pourquoi ? »", "Il cherche à convaincre le lecteur d''adopter un point de vue", "Il raconte une série d''événements chronologiques", "Il exprime les sentiments personnels de l''auteur"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le texte explicatif a pour but de faire comprendre un phénomène, un fait ou un processus. Il répond aux questions « pourquoi ? » et « comment ? » en fournissant des informations objectives.", "steps": ["Le texte explicatif informe et fait comprendre", "Il répond aux questions « pourquoi ? » et « comment ? »", "Il se distingue du texte argumentatif qui cherche à convaincre", "Il se distingue du texte narratif qui raconte des événements"]}',
  '{"français","lecture","analyse","texte_explicatif"}'
),
(
  '44444444-0000-0000-0000-000000000421',
  '33333333-0000-0000-0000-000000000063',
  'numeric', 2, 'fr',
  '{"stem": "Dans la phrase suivante, combien de champs lexicaux distincts pouvez-vous identifier ? « Le soldat, épuisé par la bataille, brandissait son épée sous un ciel sombre, tandis que le vent hurlait à travers les arbres de la forêt obscure. »", "correct_value": 3, "tolerance": 0, "unit": ""}',
  '{"text_fr": "On identifie 3 champs lexicaux distincts : celui de la guerre (soldat, bataille, épée), celui de la nature (vent, arbres, forêt) et celui de l''obscurité/fatigue (épuisé, sombre, obscure).", "steps": ["Champ lexical de la guerre : soldat, bataille, épée", "Champ lexical de la nature : vent, arbres, forêt", "Champ lexical de l''obscurité et de la fatigue : épuisé, sombre, obscure, hurlait", "Total : 3 champs lexicaux distincts"]}',
  '{"français","lecture","analyse","champ_lexical"}'
),
(
  '44444444-0000-0000-0000-000000000422',
  '33333333-0000-0000-0000-000000000063',
  'true_false', 2, 'fr',
  '{"statement": "Le registre lyrique se caractérise par l''expression des sentiments personnels de l''auteur, notamment l''amour, la nostalgie ou la mélancolie.", "correct_answer": true}',
  '{"text_fr": "Vrai. Le registre lyrique est lié à l''expression des émotions et des sentiments personnels. Il se manifeste par l''emploi de la première personne, de phrases exclamatives, d''interjections et d''un vocabulaire affectif.", "steps": ["Le registre lyrique exprime les sentiments de l''auteur", "Il utilise la première personne (je, me, mon)", "On y trouve des exclamations, des interjections et un vocabulaire émotionnel", "Les thèmes récurrents sont l''amour, la fuite du temps, la nostalgie et la mélancolie"]}',
  '{"français","lecture","analyse","registre_lyrique"}'
),
(
  '44444444-0000-0000-0000-000000000423',
  '33333333-0000-0000-0000-000000000063',
  'true_false', 2, 'fr',
  '{"statement": "Le registre comique et le registre tragique peuvent coexister dans une même œuvre littéraire.", "correct_answer": true}',
  '{"text_fr": "Vrai. On parle alors de registre tragi-comique. Le mélange des registres est un procédé courant en littérature, notamment dans le drame romantique (Victor Hugo) qui mêle le sublime et le grotesque.", "steps": ["Les registres littéraires peuvent se combiner dans une même œuvre", "Le drame romantique de Victor Hugo mêle le tragique et le comique", "Ce mélange s''appelle le registre tragi-comique", "Hugo théorise ce mélange dans la préface de Cromwell (1827)"]}',
  '{"français","lecture","analyse","registres_litteraires"}'
);

-- =====================
-- SKILL: figures_style (Figures de style) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000424',
  '33333333-0000-0000-0000-000000000064',
  'mcq', 2, 'fr',
  '{"stem": "Quelle figure de style est utilisée dans la phrase : « La vie est un long fleuve tranquille » ?", "choices": ["Une métaphore", "Une comparaison", "Une personnification", "Une hyperbole"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Il s''agit d''une métaphore car elle établit une relation d''analogie entre deux éléments (la vie et un fleuve) sans utiliser d''outil de comparaison (comme, tel que, pareil à, semblable à).", "steps": ["La phrase rapproche deux éléments : la vie et un fleuve", "Il n''y a pas d''outil de comparaison (comme, tel, semblable à...)", "C''est donc une métaphore, et non une comparaison", "La métaphore crée une image plus directe et plus forte que la comparaison"]}',
  '{"français","lecture","figures_de_style","métaphore"}'
),
(
  '44444444-0000-0000-0000-000000000425',
  '33333333-0000-0000-0000-000000000064',
  'mcq', 2, 'fr',
  '{"stem": "Identifiez la figure de style dans : « La forêt gémissait sous le vent furieux. »", "choices": ["Une personnification", "Une métonymie", "Une litote", "Une anaphore"], "correct_index": 0, "latex": false}',
  '{"text_fr": "C''est une personnification : on attribue à la forêt (un élément non humain) une action humaine (gémir). La personnification consiste à prêter des caractéristiques humaines à un animal, un objet ou une abstraction.", "steps": ["« Gémir » est une action propre aux êtres humains", "On attribue cette action à la forêt, un élément naturel", "C''est une personnification : attribuer des traits humains à un non-humain", "Le vent est aussi personnifié avec l''adjectif « furieux »"]}',
  '{"français","lecture","figures_de_style","personnification"}'
),
(
  '44444444-0000-0000-0000-000000000426',
  '33333333-0000-0000-0000-000000000064',
  'mcq', 2, 'fr',
  '{"stem": "« Je meurs de faim » est un exemple de :", "choices": ["Hyperbole", "Litote", "Antithèse", "Oxymore"], "correct_index": 0, "latex": false}',
  '{"text_fr": "C''est une hyperbole. Cette figure de style consiste à exagérer l''expression d''une idée pour la mettre en relief. Ici, on n''est pas réellement en train de mourir, mais on exagère pour souligner l''intensité de la faim.", "steps": ["L''hyperbole est une exagération volontaire", "« Mourir de faim » exagère le sentiment de faim", "Le locuteur ne meurt pas réellement : c''est une amplification", "L''hyperbole est très fréquente dans le langage courant et littéraire"]}',
  '{"français","lecture","figures_de_style","hyperbole"}'
),
(
  '44444444-0000-0000-0000-000000000427',
  '33333333-0000-0000-0000-000000000064',
  'mcq', 3, 'fr',
  '{"stem": "Quelle figure de style est présente dans l''expression « un silence assourdissant » ?", "choices": ["Un oxymore", "Une antithèse", "Un euphémisme", "Une synecdoque"], "correct_index": 0, "latex": false}',
  '{"text_fr": "C''est un oxymore : il associe deux termes de sens contradictoires dans un même groupe de mots. « Silence » (absence de bruit) et « assourdissant » (extrêmement bruyant) s''opposent directement.", "steps": ["Un oxymore réunit deux mots de sens contraire au sein d''un même groupe", "« Silence » = absence de son ; « assourdissant » = très bruyant", "Les deux termes sont syntaxiquement liés (nom + adjectif)", "L''antithèse oppose des termes dans la phrase, mais pas dans le même groupe syntaxique"]}',
  '{"français","lecture","figures_de_style","oxymore"}'
),
(
  '44444444-0000-0000-0000-000000000428',
  '33333333-0000-0000-0000-000000000064',
  'numeric', 2, 'fr',
  '{"stem": "Combien de figures de style pouvez-vous identifier dans le passage suivant ? « Paris a froid. Paris a faim. Le vent cruel siffle entre les tours, et la nuit sombre engloutit les rues comme un monstre affamé. »", "correct_value": 4, "tolerance": 0, "unit": ""}',
  '{"text_fr": "On identifie 4 figures de style : une anaphore (« Paris a... Paris a... »), une personnification (« le vent cruel siffle »), une comparaison (« comme un monstre affamé ») et une deuxième personnification (« la nuit sombre engloutit »).", "steps": ["Anaphore : répétition de « Paris a » en début de phrase", "Personnification : « le vent cruel siffle » — le vent est doté de traits humains", "Personnification : « la nuit sombre engloutit » — la nuit est présentée comme un être vivant", "Comparaison : « comme un monstre affamé » — présence de l''outil « comme »"]}',
  '{"français","lecture","figures_de_style","repérage"}'
),
(
  '44444444-0000-0000-0000-000000000429',
  '33333333-0000-0000-0000-000000000064',
  'true_false', 2, 'fr',
  '{"statement": "La litote consiste à dire moins pour suggérer davantage, comme dans « Ce n''est pas mal » pour dire « C''est bien ».", "correct_answer": true}',
  '{"text_fr": "Vrai. La litote est une figure d''atténuation qui consiste à dire moins pour exprimer plus. L''exemple le plus célèbre est « Va, je ne te hais point » de Chimène dans Le Cid de Corneille, qui signifie en réalité « Je t''aime ».", "steps": ["La litote dit moins pour faire entendre plus", "Elle utilise souvent la négation : « ce n''est pas mal » = « c''est bien »", "Exemple classique : « Va, je ne te hais point » (Corneille, Le Cid)", "Elle est l''opposé de l''hyperbole qui, elle, exagère l''expression"]}',
  '{"français","lecture","figures_de_style","litote"}'
),
(
  '44444444-0000-0000-0000-000000000430',
  '33333333-0000-0000-0000-000000000064',
  'true_false', 2, 'fr',
  '{"statement": "La métonymie « boire un verre » remplace le contenu (la boisson) par le contenant (le verre). C''est aussi un exemple de synecdoque.", "correct_answer": false}',
  '{"text_fr": "Faux. « Boire un verre » est bien une métonymie (remplacement du contenu par le contenant), mais ce n''est pas une synecdoque. La synecdoque est un cas particulier où l''on remplace la partie par le tout ou le tout par la partie (ex. : « une voile » pour « un navire »). La relation contenant/contenu relève de la métonymie, pas de la synecdoque.", "steps": ["« Boire un verre » est une métonymie contenant/contenu", "La métonymie remplace un mot par un autre ayant un lien logique (cause/effet, contenant/contenu, lieu/institution)", "La synecdoque est un type particulier : elle repose sur la relation partie/tout", "Exemple de synecdoque : « une voile » pour « un navire » (la partie pour le tout)"]}',
  '{"français","lecture","figures_de_style","métonymie","synecdoque"}'
);

-- =====================
-- SKILL: argumentation (Argumentation et thèse) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000431',
  '33333333-0000-0000-0000-000000000065',
  'mcq', 2, 'fr',
  '{"stem": "Un argument d''autorité consiste à :", "choices": ["Citer une personne reconnue ou une source fiable pour appuyer sa thèse", "Raconter une anecdote personnelle pour illustrer son propos", "Comparer deux situations semblables pour convaincre", "Utiliser un raisonnement par l''absurde"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''argument d''autorité s''appuie sur la parole ou l''écrit d''une personne reconnue (expert, scientifique, auteur célèbre) pour renforcer la crédibilité de la thèse défendue.", "steps": ["L''argument d''autorité fait appel à une source crédible et reconnue", "Il peut s''agir d''un expert, d''un scientifique, d''un auteur célèbre ou d''une institution", "Exemple : « Comme l''a démontré Einstein... »", "Il renforce la crédibilité du propos en s''appuyant sur une référence légitime"]}',
  '{"français","lecture","argumentation","argument_autorité"}'
),
(
  '44444444-0000-0000-0000-000000000432',
  '33333333-0000-0000-0000-000000000065',
  'mcq', 2, 'fr',
  '{"stem": "Quel connecteur logique exprime une relation de concession ?", "choices": ["Bien que", "Par conséquent", "En effet", "De plus"], "correct_index": 0, "latex": false}',
  '{"text_fr": "« Bien que » est un connecteur logique de concession. Il introduit une idée qui s''oppose partiellement à la thèse tout en la maintenant. Les autres connecteurs expriment : la conséquence (par conséquent), la cause/justification (en effet) et l''addition (de plus).", "steps": ["« Bien que » exprime la concession : on admet un fait contraire tout en maintenant sa thèse", "« Par conséquent » exprime la conséquence", "« En effet » exprime la cause ou la justification", "« De plus » exprime l''addition d''un argument"]}',
  '{"français","lecture","argumentation","connecteurs_logiques"}'
),
(
  '44444444-0000-0000-0000-000000000433',
  '33333333-0000-0000-0000-000000000065',
  'mcq', 2, 'fr',
  '{"stem": "Dans une dissertation, la thèse est :", "choices": ["L''idée principale défendue par l''auteur", "L''exemple qui illustre un argument", "Le résumé du texte étudié", "La conclusion du développement"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La thèse est l''idée principale, la position que l''auteur défend tout au long de son argumentation. Elle constitue le fil directeur du texte argumentatif et chaque argument vient la soutenir.", "steps": ["La thèse est la position ou l''opinion défendue par l''auteur", "Elle est soutenue par des arguments (les raisons)", "Les arguments sont eux-mêmes illustrés par des exemples", "L''antithèse est la position opposée à la thèse"]}',
  '{"français","lecture","argumentation","thèse"}'
),
(
  '44444444-0000-0000-0000-000000000434',
  '33333333-0000-0000-0000-000000000065',
  'mcq', 3, 'fr',
  '{"stem": "L''argument par analogie consiste à :", "choices": ["Rapprocher deux situations similaires pour convaincre", "Citer un cas précis pour illustrer un propos", "S''appuyer sur l''opinion d''un expert reconnu", "Réfuter la thèse adverse en montrant ses contradictions"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''argument par analogie met en parallèle deux situations présentant des similitudes pour rendre l''argumentation plus convaincante. Il permet de transférer les conclusions d''un domaine connu vers un domaine moins connu.", "steps": ["L''argument par analogie compare deux situations semblables", "Il transfère le raisonnement d''un cas connu à un cas discuté", "Exemple : comparer l''éducation à la culture d''un jardin", "Il ne faut pas le confondre avec l''argument d''exemple qui cite un cas précis"]}',
  '{"français","lecture","argumentation","argument_analogie"}'
),
(
  '44444444-0000-0000-0000-000000000435',
  '33333333-0000-0000-0000-000000000065',
  'numeric', 2, 'fr',
  '{"stem": "Dans le texte suivant, combien de connecteurs logiques pouvez-vous identifier ? « D''abord, la lecture enrichit le vocabulaire. Ensuite, elle développe l''esprit critique. De plus, elle stimule l''imagination. Cependant, certains préfèrent d''autres loisirs. En conclusion, la lecture reste un pilier essentiel de l''éducation. »", "correct_value": 5, "tolerance": 0, "unit": ""}',
  '{"text_fr": "On identifie 5 connecteurs logiques : « D''abord » (énumération), « Ensuite » (succession), « De plus » (addition), « Cependant » (opposition/concession), « En conclusion » (conclusion).", "steps": ["« D''abord » : connecteur d''énumération (1er argument)", "« Ensuite » : connecteur de succession (2e argument)", "« De plus » : connecteur d''addition (3e argument)", "« Cependant » : connecteur d''opposition/concession", "« En conclusion » : connecteur de conclusion"]}',
  '{"français","lecture","argumentation","connecteurs_logiques"}'
),
(
  '44444444-0000-0000-0000-000000000436',
  '33333333-0000-0000-0000-000000000065',
  'true_false', 2, 'fr',
  '{"statement": "Dans un plan dialectique (thèse, antithèse, synthèse), l''antithèse sert à réfuter totalement la thèse.", "correct_answer": false}',
  '{"text_fr": "Faux. L''antithèse ne réfute pas totalement la thèse : elle nuance ou remet en question la thèse en présentant des arguments opposés. La synthèse vient ensuite dépasser l''opposition en proposant une position plus nuancée qui concilie les deux points de vue.", "steps": ["Le plan dialectique comprend trois parties : thèse, antithèse, synthèse", "La thèse défend une position", "L''antithèse nuance ou conteste cette position, mais ne la réfute pas totalement", "La synthèse dépasse l''opposition et propose un point de vue plus complet"]}',
  '{"français","lecture","argumentation","plan_dialectique"}'
),
(
  '44444444-0000-0000-0000-000000000437',
  '33333333-0000-0000-0000-000000000065',
  'true_false', 2, 'fr',
  '{"statement": "L''argument d''exemple consiste à citer un fait précis, une situation concrète ou une référence pour illustrer et appuyer un argument.", "correct_answer": true}',
  '{"text_fr": "Vrai. L''argument d''exemple s''appuie sur un fait précis, une situation concrète, une donnée chiffrée ou une référence littéraire pour illustrer et renforcer un argument. Il rend l''argumentation plus concrète et plus convaincante.", "steps": ["L''argument d''exemple illustre un argument par un cas concret", "Il peut s''agir d''un fait historique, d''une donnée chiffrée ou d''une référence littéraire", "Exemple : « Victor Hugo, dans Les Misérables, montre que la pauvreté pousse au crime »", "Il rend l''argumentation plus vivante et plus persuasive"]}',
  '{"français","lecture","argumentation","argument_exemple"}'
);
