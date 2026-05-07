-- ============================================================
-- FRENCH CONTENT: Production écrite (3 skills, 21 items)
-- Topic: Writing
-- Skills:
--   essay_structure  (33333333-...-066) difficulty 2 — 7 items
--   commentary       (33333333-...-067) difficulty 2 — 7 items
--   essay_writing    (33333333-...-068) difficulty 2 — 7 items
-- ============================================================

-- =====================
-- SKILL: essay_structure (Structure de la dissertation) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000438',
  '33333333-0000-0000-0000-000000000066',
  'mcq', 2, 'fr',
  '{"stem": "Quel type de plan consiste à présenter une thèse, puis une antithèse, et enfin une synthèse ?", "choices": ["Le plan dialectique", "Le plan analytique", "Le plan thématique", "Le plan chronologique"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le plan dialectique est le plan classique de la dissertation française. Il se structure en trois parties : la thèse (défense d''une position), l''antithèse (réfutation ou nuance) et la synthèse (dépassement du débat).", "steps": ["La thèse présente un premier point de vue argumenté", "L''antithèse oppose des arguments contraires ou nuancés", "La synthèse dépasse l''opposition pour proposer une réponse équilibrée", "Ce schéma est appelé plan dialectique"]}',
  '{"français","écriture","dissertation","plan_dialectique"}'
),
(
  '44444444-0000-0000-0000-000000000439',
  '33333333-0000-0000-0000-000000000066',
  'mcq', 2, 'fr',
  '{"stem": "Dans une introduction de dissertation, quel est l''ordre correct des éléments ?", "choices": ["Amorce, problématique, annonce du plan", "Problématique, amorce, annonce du plan", "Annonce du plan, amorce, problématique", "Amorce, annonce du plan, problématique"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''introduction de dissertation suit un ordre précis : on commence par une amorce (accroche qui contextualise le sujet), puis on formule la problématique (la question centrale), et enfin on annonce le plan qui sera suivi dans le développement.", "steps": ["L''amorce (ou accroche) introduit le thème de manière générale", "La problématique pose la question centrale du sujet", "L''annonce du plan indique la structure du développement", "Cet ordre est une convention essentielle de la dissertation"]}',
  '{"français","écriture","dissertation","introduction"}'
),
(
  '44444444-0000-0000-0000-000000000440',
  '33333333-0000-0000-0000-000000000066',
  'mcq', 2, 'fr',
  '{"stem": "Le plan analytique se structure généralement selon quel schéma ?", "choices": ["Constat / Causes / Conséquences (ou solutions)", "Thèse / Antithèse / Synthèse", "Passé / Présent / Futur", "Pour / Contre / Bilan"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le plan analytique procède par examen méthodique du sujet. Il part d''un constat (description du phénomène), explore les causes (origines, facteurs explicatifs) puis analyse les conséquences ou propose des solutions.", "steps": ["Première partie : le constat ou la description du phénomène", "Deuxième partie : l''analyse des causes", "Troisième partie : les conséquences ou les solutions envisagées", "Ce plan convient aux sujets qui invitent à analyser un phénomène"]}',
  '{"français","écriture","dissertation","plan_analytique"}'
),
(
  '44444444-0000-0000-0000-000000000441',
  '33333333-0000-0000-0000-000000000066',
  'mcq', 3, 'fr',
  '{"stem": "Quelle est la fonction principale de la conclusion dans une dissertation ?", "choices": ["Résumer l''argumentation et ouvrir une perspective", "Introduire de nouveaux arguments", "Répéter intégralement l''introduction", "Donner uniquement son avis personnel"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La conclusion d''une dissertation remplit deux fonctions essentielles : elle fait le bilan de l''argumentation développée (synthèse des idées principales) et elle propose une ouverture, c''est-à-dire une perspective nouvelle qui élargit la réflexion.", "steps": ["La conclusion commence par un bilan synthétique de l''argumentation", "Elle rappelle la réponse apportée à la problématique", "Elle se termine par une ouverture (question nouvelle, élargissement du sujet)", "Elle ne doit jamais introduire de nouveaux arguments"]}',
  '{"français","écriture","dissertation","conclusion"}'
),
(
  '44444444-0000-0000-0000-000000000442',
  '33333333-0000-0000-0000-000000000066',
  'numeric', 2, 'fr',
  '{"stem": "Une dissertation suit un plan dialectique classique (thèse, antithèse, synthèse). Chaque grande partie comporte 3 sous-parties. Combien de sous-parties le développement contient-il au total ?", "correct_value": 9, "tolerance": 0, "latex": false}',
  '{"text_fr": "Un plan dialectique comporte 3 grandes parties (thèse, antithèse, synthèse). Chaque grande partie contient 3 sous-parties. Le total est donc 3 × 3 = 9 sous-parties.", "steps": ["Le plan dialectique comprend 3 grandes parties", "Chaque grande partie comporte 3 sous-parties", "Total = 3 × 3 = 9 sous-parties"]}',
  '{"français","écriture","dissertation","structure"}'
),
(
  '44444444-0000-0000-0000-000000000443',
  '33333333-0000-0000-0000-000000000066',
  'true_false', 2, 'fr',
  '{"stem": "L''amorce d''une introduction de dissertation peut être une citation, un fait d''actualité ou une référence historique.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. L''amorce (ou accroche) sert à introduire le sujet de manière engageante. Elle peut prendre la forme d''une citation littéraire, d''un fait d''actualité, d''une référence historique, d''une anecdote pertinente ou d''une définition.", "steps": ["L''amorce est le premier élément de l''introduction", "Son rôle est d''attirer l''attention et de contextualiser le sujet", "Elle peut être une citation, un fait d''actualité, une référence historique, etc.", "L''essentiel est qu''elle soit en lien direct avec le sujet traité"]}',
  '{"français","écriture","dissertation","amorce"}'
),
(
  '44444444-0000-0000-0000-000000000444',
  '33333333-0000-0000-0000-000000000066',
  'true_false', 2, 'fr',
  '{"stem": "Dans un plan dialectique, la synthèse consiste simplement à répéter la thèse.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. La synthèse ne consiste pas à répéter la thèse. Elle dépasse l''opposition entre thèse et antithèse pour proposer une position nuancée ou un éclairage nouveau. C''est un dépassement du débat, pas une simple répétition.", "steps": ["La thèse défend un premier point de vue", "L''antithèse présente des arguments opposés ou nuancés", "La synthèse dépasse cette opposition en proposant une réflexion nouvelle", "Répéter la thèse dans la synthèse serait une erreur méthodologique"]}',
  '{"français","écriture","dissertation","synthèse"}'
);

-- =====================
-- SKILL: commentary (Commentaire composé) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000445',
  '33333333-0000-0000-0000-000000000067',
  'mcq', 2, 'fr',
  '{"stem": "Dans un commentaire composé, comment appelle-t-on les grandes parties qui organisent l''analyse du texte ?", "choices": ["Les axes de lecture", "Les chapitres", "Les paragraphes d''introduction", "Les transitions"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le commentaire composé s''organise autour d''axes de lecture (aussi appelés axes d''étude ou centres d''intérêt). Chaque axe propose un angle d''analyse différent du texte et regroupe des observations cohérentes.", "steps": ["Le commentaire composé est structuré en axes de lecture", "Chaque axe correspond à un aspect majeur du texte (thématique, stylistique, etc.)", "On attend généralement 2 à 3 axes dans un commentaire au baccalauréat", "Les axes doivent être complémentaires et progressifs"]}',
  '{"français","écriture","commentaire","axes_de_lecture"}'
),
(
  '44444444-0000-0000-0000-000000000446',
  '33333333-0000-0000-0000-000000000067',
  'mcq', 2, 'fr',
  '{"stem": "Quel procédé d''écriture consiste à attribuer des qualités humaines à un objet ou un animal ?", "choices": ["La personnification", "La métaphore", "L''hyperbole", "L''anaphore"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La personnification est un procédé d''écriture (figure de style) qui consiste à attribuer des caractéristiques humaines (sentiments, actions, parole) à un animal, un objet ou une notion abstraite.", "steps": ["La personnification donne des traits humains à ce qui n''est pas humain", "Exemple : « Le vent hurle » attribue une action humaine (hurler) au vent", "Ce procédé est à distinguer de la métaphore, qui est une comparaison implicite", "Il est fréquemment analysé dans le commentaire composé"]}',
  '{"français","écriture","commentaire","procédés"}'
),
(
  '44444444-0000-0000-0000-000000000447',
  '33333333-0000-0000-0000-000000000067',
  'mcq', 3, 'fr',
  '{"stem": "Dans un commentaire composé, quelle démarche est attendue pour analyser un procédé stylistique ?", "choices": ["Identifier le procédé, le citer, puis interpréter son effet", "Simplement nommer le procédé sans l''expliquer", "Paraphraser le texte sans analyse", "Donner uniquement son avis personnel sur le passage"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''analyse d''un procédé stylistique dans un commentaire composé suit une démarche en trois temps : on identifie le procédé (le nommer précisément), on le cite dans le texte (donner la référence exacte), puis on interprète son effet sur le lecteur ou son rôle dans le texte.", "steps": ["Étape 1 : Identifier et nommer le procédé (ex. : métaphore, anaphore)", "Étape 2 : Citer le passage du texte qui illustre ce procédé", "Étape 3 : Interpréter l''effet produit sur le lecteur ou le sens qu''il apporte", "Cette méthode s''appelle la démarche analytique du commentaire"]}',
  '{"français","écriture","commentaire","méthode"}'
),
(
  '44444444-0000-0000-0000-000000000448',
  '33333333-0000-0000-0000-000000000067',
  'mcq', 2, 'fr',
  '{"stem": "Lequel de ces éléments ne fait PAS partie de l''introduction d''un commentaire composé ?", "choices": ["L''annonce de la problématique de la dissertation", "La présentation de l''auteur et de l''œuvre", "La situation du passage dans l''œuvre", "L''annonce des axes de lecture"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''introduction d''un commentaire composé comprend : la présentation de l''auteur et de l''œuvre, la situation du passage dans son contexte, et l''annonce des axes de lecture. La problématique de la dissertation est propre à l''exercice de dissertation, pas au commentaire.", "steps": ["L''introduction du commentaire présente l''auteur, l''œuvre et le mouvement littéraire", "Elle situe le passage dans l''œuvre (contexte narratif ou argumentatif)", "Elle annonce les axes de lecture qui structureront l''analyse", "La problématique de dissertation est un élément spécifique à la dissertation"]}',
  '{"français","écriture","commentaire","introduction"}'
),
(
  '44444444-0000-0000-0000-000000000449',
  '33333333-0000-0000-0000-000000000067',
  'numeric', 2, 'fr',
  '{"stem": "Un commentaire composé au baccalauréat est généralement structuré en combien d''axes de lecture ?", "correct_value": 3, "tolerance": 1, "latex": false}',
  '{"text_fr": "Au baccalauréat, un commentaire composé est généralement structuré en 2 ou 3 axes de lecture. La norme la plus courante est 3 axes, mais 2 axes bien développés sont également acceptés.", "steps": ["Le commentaire composé s''organise en axes de lecture", "Au baccalauréat, on attend généralement 2 ou 3 axes", "3 axes est la norme la plus courante", "Chaque axe doit contenir au moins 2 sous-parties argumentées"]}',
  '{"français","écriture","commentaire","structure"}'
),
(
  '44444444-0000-0000-0000-000000000450',
  '33333333-0000-0000-0000-000000000067',
  'true_false', 2, 'fr',
  '{"stem": "Le commentaire composé doit suivre l''ordre linéaire du texte (du début à la fin) pour structurer l''analyse.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Le commentaire composé ne suit pas l''ordre linéaire du texte. Il est organisé selon des axes de lecture thématiques ou stylistiques. On peut regrouper des observations provenant de différentes parties du texte sous un même axe. C''est l''explication de texte linéaire qui suit l''ordre du texte.", "steps": ["Le commentaire composé est organisé par axes de lecture, pas par ordre du texte", "On regroupe les observations par thèmes ou par aspects stylistiques", "C''est l''explication linéaire qui suit l''ordre du texte, pas le commentaire", "Le commentaire composé propose une lecture transversale du texte"]}',
  '{"français","écriture","commentaire","méthode"}'
),
(
  '44444444-0000-0000-0000-000000000451',
  '33333333-0000-0000-0000-000000000067',
  'true_false', 3, 'fr',
  '{"stem": "Dans un commentaire composé, il est possible de regrouper dans un même axe de lecture des observations portant sur des passages différents du texte.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Le commentaire composé organise l''analyse par axes thématiques ou stylistiques, et non par ordre du texte. Il est donc tout à fait possible — et même attendu — de regrouper des observations portant sur des passages différents sous un même axe, tant qu''elles se rapportent au même centre d''intérêt.", "steps": ["Le commentaire composé est structuré par axes, pas par ordre linéaire", "Un axe regroupe des observations liées à un même thème ou procédé", "Ces observations peuvent provenir de différents endroits du texte", "C''est cette capacité de synthèse qui distingue le commentaire de l''explication linéaire"]}',
  '{"français","écriture","commentaire","axes_de_lecture"}'
);

-- =====================
-- SKILL: essay_writing (Rédaction et expression) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000452',
  '33333333-0000-0000-0000-000000000068',
  'mcq', 2, 'fr',
  '{"stem": "Quel connecteur logique exprime une relation de concession ?", "choices": ["Bien que", "Par conséquent", "En effet", "D''abord"], "correct_index": 0, "latex": false}',
  '{"text_fr": "« Bien que » est un connecteur logique de concession. Il introduit une idée qui semble contredire ce qui suit, tout en la reconnaissant. Exemples de connecteurs de concession : bien que, malgré, quoique, certes... mais, toutefois.", "steps": ["Les connecteurs logiques structurent l''argumentation", "« Bien que » exprime la concession (on reconnaît un fait tout en le nuançant)", "« Par conséquent » exprime la conséquence", "« En effet » exprime la cause ou la justification", "« D''abord » exprime l''ordre ou l''énumération"]}',
  '{"français","écriture","expression","connecteurs"}'
),
(
  '44444444-0000-0000-0000-000000000453',
  '33333333-0000-0000-0000-000000000068',
  'mcq', 2, 'fr',
  '{"stem": "Quel est le rôle d''une transition entre deux parties d''une dissertation ?", "choices": ["Assurer la cohérence en reliant les idées de deux parties successives", "Résumer l''intégralité de la dissertation", "Introduire un hors-sujet pour varier le propos", "Remplacer la conclusion"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La transition est un passage qui relie deux grandes parties d''une dissertation. Elle assure la cohérence du raisonnement en faisant le bilan de la partie qui s''achève et en annonçant la partie suivante. Elle permet au lecteur de suivre la progression logique de l''argumentation.", "steps": ["La transition se place entre deux grandes parties", "Elle fait le bilan de la partie précédente (brève synthèse)", "Elle annonce la partie suivante (lien logique)", "Elle garantit la fluidité et la cohérence de l''argumentation"]}',
  '{"français","écriture","expression","transitions"}'
),
(
  '44444444-0000-0000-0000-000000000454',
  '33333333-0000-0000-0000-000000000068',
  'mcq', 2, 'fr',
  '{"stem": "Quel registre de langue est attendu dans une dissertation ou un commentaire composé au baccalauréat ?", "choices": ["Le registre soutenu (ou littéraire)", "Le registre familier", "Le registre courant uniquement", "Le registre argotique"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Au baccalauréat, la dissertation et le commentaire composé exigent un registre soutenu (ou littéraire). Cela implique un vocabulaire précis et riche, des phrases construites et une syntaxe élaborée. Le registre familier ou argotique est proscrit.", "steps": ["Le registre soutenu utilise un vocabulaire riche et précis", "Les phrases sont correctement construites avec une syntaxe élaborée", "On évite les tournures familières, les abréviations et l''argot", "Ce registre reflète la maîtrise de la langue attendue au baccalauréat"]}',
  '{"français","écriture","expression","registre"}'
),
(
  '44444444-0000-0000-0000-000000000455',
  '33333333-0000-0000-0000-000000000068',
  'mcq', 3, 'fr',
  '{"stem": "Parmi les propositions suivantes, laquelle illustre le mieux la cohérence textuelle dans un paragraphe argumentatif ?", "choices": ["Énoncer une idée, l''illustrer par un exemple, puis l''analyser", "Enchaîner plusieurs exemples sans les commenter", "Commencer par la conclusion puis donner l''idée principale", "Mélanger plusieurs thèmes dans un même paragraphe"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La cohérence textuelle dans un paragraphe argumentatif repose sur la structure : idée → exemple → analyse. On commence par énoncer l''argument (idée directrice), on l''illustre par un exemple concret (citation, référence), puis on analyse cet exemple pour montrer en quoi il soutient l''idée.", "steps": ["L''idée directrice ouvre le paragraphe et annonce l''argument", "L''exemple vient illustrer concrètement cette idée", "L''analyse explique le lien entre l''exemple et l''argument", "Cette structure garantit la cohérence et la rigueur du paragraphe"]}',
  '{"français","écriture","expression","cohérence"}'
),
(
  '44444444-0000-0000-0000-000000000456',
  '33333333-0000-0000-0000-000000000068',
  'numeric', 2, 'fr',
  '{"stem": "Dans une dissertation au baccalauréat de français, combien de transitions doit-on rédiger entre les grandes parties si le plan comporte 3 parties ?", "correct_value": 2, "tolerance": 0, "latex": false}',
  '{"text_fr": "Avec un plan en 3 parties, on rédige 2 transitions : une entre la première et la deuxième partie, et une entre la deuxième et la troisième partie. Le nombre de transitions est toujours égal au nombre de parties moins un.", "steps": ["Un plan en 3 parties crée 2 intervalles entre les parties", "Transition 1 : entre la partie I et la partie II", "Transition 2 : entre la partie II et la partie III", "Nombre de transitions = nombre de parties − 1 = 3 − 1 = 2"]}',
  '{"français","écriture","expression","transitions"}'
),
(
  '44444444-0000-0000-0000-000000000457',
  '33333333-0000-0000-0000-000000000068',
  'true_false', 2, 'fr',
  '{"stem": "Les connecteurs logiques comme « cependant », « néanmoins » et « toutefois » expriment tous une relation d''opposition.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. « Cependant », « néanmoins » et « toutefois » sont tous des connecteurs logiques d''opposition (ou de concession). Ils introduisent une idée qui s''oppose à ce qui précède ou qui apporte une nuance. Ils sont essentiels pour structurer une argumentation équilibrée.", "steps": ["« Cependant » marque une opposition ou une restriction", "« Néanmoins » introduit une nuance ou une objection", "« Toutefois » exprime également une réserve ou une opposition", "Ces trois connecteurs appartiennent à la même catégorie logique : l''opposition/concession"]}',
  '{"français","écriture","expression","connecteurs"}'
),
(
  '44444444-0000-0000-0000-000000000458',
  '33333333-0000-0000-0000-000000000068',
  'true_false', 2, 'fr',
  '{"stem": "Dans une copie de baccalauréat, il est acceptable d''utiliser la première personne du singulier (« je ») dans une dissertation.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Dans une dissertation au baccalauréat, l''usage du « je » est généralement déconseillé. On privilégie les tournures impersonnelles (« il semble que », « on peut considérer que ») ou le « nous » de modestie pour maintenir une distance analytique et un ton objectif.", "steps": ["La dissertation vise une réflexion objective et argumentée", "Le « je » donne un caractère trop subjectif au propos", "On utilise plutôt « nous » (nous de modestie) ou des tournures impersonnelles", "Exemples : « il convient de noter », « on peut affirmer que », « force est de constater »"]}',
  '{"français","écriture","expression","registre"}'
);
