-- ============================================================
-- ENGLISH CONTENT: Reading Comprehension (2 skills, 14 items)
-- Topic: Reading Comprehension
-- Skills:
--   reading_comp       (33333333-...-082) — 7 items
--   reading_inference   (33333333-...-083) — 7 items
-- ============================================================

-- =====================
-- SKILL: reading_comp (Reading Comprehension) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000550',
  '33333333-0000-0000-0000-000000000082',
  'mcq', 2, 'fr',
  '{"stem": "Quelle stratégie de lecture consiste à parcourir rapidement un texte pour en saisir l''idée générale sans lire chaque mot ?", "choices": ["Le skimming (lecture survol)", "Le scanning (lecture sélective)", "La lecture intensive", "La lecture critique"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le skimming est une technique de lecture rapide qui consiste à parcourir un texte en diagonale pour identifier l''idée principale, le thème général et la structure globale, sans s''attarder sur les détails.", "steps": ["Le skimming = parcourir rapidement pour l''idée générale", "Le scanning = chercher une information précise (date, nom, chiffre)", "La lecture intensive = lire mot à mot pour une compréhension approfondie", "La lecture critique = analyser et évaluer le contenu"]}',
  '{"anglais","reading","compréhension","stratégies_lecture"}'
),
(
  '44444444-0000-0000-0000-000000000551',
  '33333333-0000-0000-0000-000000000082',
  'mcq', 2, 'fr',
  '{"stem": "Dans un texte argumentatif en anglais, quel élément permet le mieux d''identifier l''idée principale (main idea) d''un paragraphe ?", "choices": ["La phrase thématique (topic sentence), souvent placée au début du paragraphe", "Le dernier mot du paragraphe", "Les exemples détaillés au milieu du paragraphe", "Les connecteurs logiques uniquement"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Dans un texte argumentatif anglais, l''idée principale d''un paragraphe est généralement exprimée dans la topic sentence (phrase thématique), qui se trouve le plus souvent au début du paragraphe. Les phrases suivantes apportent des détails, des exemples ou des arguments de soutien.", "steps": ["Repérer la topic sentence (phrase thématique) du paragraphe", "Elle est généralement placée en première ou deuxième position", "Les autres phrases servent de supporting details (détails de soutien)", "La dernière phrase peut être une conclusion partielle du paragraphe"]}',
  '{"anglais","reading","compréhension","idée_principale"}'
),
(
  '44444444-0000-0000-0000-000000000552',
  '33333333-0000-0000-0000-000000000082',
  'mcq', 3, 'fr',
  '{"stem": "Un texte en anglais est organisé selon le schéma suivant : introduction du problème → causes → conséquences → solutions proposées. Quel type d''organisation textuelle est utilisé ?", "choices": ["Organisation par problème et solution (problem-solution)", "Organisation chronologique (chronological order)", "Organisation par comparaison et contraste (compare and contrast)", "Organisation par description spatiale (spatial order)"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''organisation problem-solution est un mode de structuration courant dans les textes argumentatifs et expositifs en anglais. Le texte présente d''abord un problème, en analyse les causes et les effets, puis propose des solutions.", "steps": ["Identifier la structure : problème → causes → conséquences → solutions", "Ce schéma correspond à l''organisation problem-solution", "L''organisation chronologique suit un ordre temporel (dates, époques)", "Le compare and contrast met en parallèle des similitudes et différences"]}',
  '{"anglais","reading","compréhension","organisation_textuelle"}'
),
(
  '44444444-0000-0000-0000-000000000553',
  '33333333-0000-0000-0000-000000000082',
  'mcq', 2, 'fr',
  '{"stem": "Lors de la lecture d''un article en anglais, vous cherchez rapidement la date d''un événement mentionné dans le texte. Quelle stratégie de lecture utilisez-vous ?", "choices": ["Le scanning (lecture sélective)", "Le skimming (lecture survol)", "La lecture intensive", "La lecture analytique"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le scanning est une stratégie de lecture sélective qui consiste à parcourir un texte pour localiser une information spécifique (un nom, une date, un chiffre, un mot-clé) sans lire l''ensemble du texte.", "steps": ["Objectif : trouver une information précise (ici, une date)", "Le scanning permet de repérer rapidement un élément ciblé", "On parcourt le texte des yeux en cherchant le mot-clé ou le format attendu", "Contrairement au skimming, on ne cherche pas l''idée générale"]}',
  '{"anglais","reading","compréhension","stratégies_lecture"}'
),
(
  '44444444-0000-0000-0000-000000000554',
  '33333333-0000-0000-0000-000000000082',
  'numeric', 3, 'fr',
  '{"stem": "Un texte argumentatif en anglais contient 5 paragraphes. Le premier est l''introduction, le dernier est la conclusion, et les paragraphes intermédiaires contiennent chacun une idée principale avec 3 détails de soutien (supporting details). Combien de supporting details y a-t-il au total dans le corps du texte (body) ?", "correct_value": 9, "tolerance": 0, "latex": false}',
  '{"text_fr": "Le corps du texte (body) comprend les paragraphes intermédiaires, c''est-à-dire les paragraphes 2, 3 et 4 (5 paragraphes - 1 introduction - 1 conclusion = 3 paragraphes). Chacun contient 3 supporting details, donc 3 × 3 = 9 au total.", "steps": ["Nombre total de paragraphes : 5", "Paragraphes du body : 5 - 1 (intro) - 1 (conclusion) = 3", "Supporting details par paragraphe : 3", "Total de supporting details : 3 × 3 = 9"]}',
  '{"anglais","reading","compréhension","structure_texte"}'
),
(
  '44444444-0000-0000-0000-000000000555',
  '33333333-0000-0000-0000-000000000082',
  'true_false', 2, 'fr',
  '{"stem": "Dans un texte en anglais, la lecture intensive (intensive reading) est la stratégie la plus appropriée lorsqu''on veut comprendre en détail un passage difficile contenant du vocabulaire technique.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. La lecture intensive consiste à lire un texte mot à mot, phrase par phrase, pour en comprendre tous les détails, le vocabulaire, la grammaire et les nuances. Elle est particulièrement adaptée aux passages complexes ou techniques qui nécessitent une compréhension approfondie.", "steps": ["La lecture intensive = lecture détaillée, mot à mot", "Elle est utilisée pour les passages difficiles ou techniques", "Elle permet de comprendre le vocabulaire, la syntaxe et les nuances", "C''est la stratégie adaptée quand la compréhension fine est nécessaire"]}',
  '{"anglais","reading","compréhension","stratégies_lecture"}'
),
(
  '44444444-0000-0000-0000-000000000556',
  '33333333-0000-0000-0000-000000000082',
  'true_false', 2, 'fr',
  '{"stem": "Dans un texte en anglais bien structuré, le rôle d''un paragraphe de conclusion est d''introduire de nouvelles idées et de nouveaux arguments.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Le paragraphe de conclusion (concluding paragraph) a pour rôle de résumer les idées principales développées dans le texte, de reformuler la thèse et éventuellement d''ouvrir sur une réflexion plus large. Il ne doit pas introduire de nouvelles idées ou de nouveaux arguments.", "steps": ["Le paragraphe de conclusion résume les idées principales du texte", "Il reformule la thèse ou le point de vue de l''auteur", "Il peut proposer une ouverture ou une réflexion finale", "Il ne doit PAS introduire de nouvelles idées ou de nouveaux arguments"]}',
  '{"anglais","reading","compréhension","structure_texte"}'
);

-- =====================
-- SKILL: reading_inference (Inference and Critical Reading) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000557',
  '33333333-0000-0000-0000-000000000083',
  'mcq', 3, 'fr',
  '{"stem": "Un auteur écrit : ''The government''s so-called solution has only deepened the crisis.'' Quel est le ton de l''auteur dans cette phrase ?", "choices": ["Ironique et critique", "Neutre et objectif", "Enthousiaste et optimiste", "Triste et mélancolique"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''utilisation de l''expression ''so-called'' (soi-disant) indique que l''auteur ne considère pas la mesure comme une véritable solution. Combinée avec ''has only deepened the crisis'' (n''a fait qu''aggraver la crise), cette phrase révèle un ton ironique et critique envers le gouvernement.", "steps": ["Repérer les indices de ton : ''so-called'' = soi-disant (ironie)", "''has only deepened'' = n''a fait qu''aggraver (jugement négatif)", "L''auteur ne croit pas à l''efficacité de la solution", "Le ton est donc ironique et critique"]}',
  '{"anglais","reading","inférence","ton_attitude"}'
),
(
  '44444444-0000-0000-0000-000000000558',
  '33333333-0000-0000-0000-000000000083',
  'mcq', 3, 'fr',
  '{"stem": "Parmi les phrases suivantes tirées d''un texte en anglais, laquelle exprime une opinion (opinion) et non un fait (fact) ?", "choices": ["''Climate change is arguably the most pressing challenge of our generation.''", "''The Earth''s average temperature has risen by 1.1°C since pre-industrial times.''", "''Carbon dioxide levels reached 421 ppm in 2023.''", "''The Paris Agreement was signed in 2015 by 196 countries.''"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La première phrase contient le mot ''arguably'' (sans doute, on pourrait dire) et le superlatif ''the most pressing'' (le plus urgent), ce qui en fait un jugement subjectif, donc une opinion. Les trois autres phrases présentent des données chiffrées ou des événements vérifiables, ce sont des faits.", "steps": ["Un fait (fact) est vérifiable et objectif", "Une opinion (opinion) exprime un jugement, une évaluation subjective", "''arguably the most pressing'' = expression de jugement subjectif", "Les autres phrases contiennent des données mesurables ou des événements historiques = faits"]}',
  '{"anglais","reading","inférence","fait_opinion"}'
),
(
  '44444444-0000-0000-0000-000000000559',
  '33333333-0000-0000-0000-000000000083',
  'mcq', 3, 'fr',
  '{"stem": "Dans un texte, un auteur utilise principalement des statistiques, des témoignages d''experts et des études scientifiques pour soutenir sa thèse. Quel est le but principal (author''s purpose) de ce texte ?", "choices": ["Persuader le lecteur en s''appuyant sur des preuves (to persuade)", "Divertir le lecteur avec une histoire captivante (to entertain)", "Décrire un lieu ou une scène de manière poétique (to describe)", "Raconter une expérience personnelle (to narrate)"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Lorsqu''un auteur utilise des statistiques, des témoignages d''experts et des études scientifiques, son objectif est de convaincre (persuade) le lecteur. Ces éléments constituent des preuves (evidence) destinées à renforcer sa thèse et à influencer l''opinion du lecteur.", "steps": ["Identifier les éléments utilisés : statistiques, témoignages d''experts, études", "Ces éléments sont des preuves (evidence) = stratégie de persuasion", "To persuade = convaincre en utilisant des arguments et des preuves", "To entertain = divertir, to describe = décrire, to narrate = raconter"]}',
  '{"anglais","reading","inférence","author_purpose"}'
),
(
  '44444444-0000-0000-0000-000000000560',
  '33333333-0000-0000-0000-000000000083',
  'mcq', 3, 'fr',
  '{"stem": "Lisez la phrase suivante : ''After weeks of endless rain, the sun finally broke through the clouds, and the children rushed outside with pure joy.'' Que peut-on inférer de cette phrase ?", "choices": ["Les enfants étaient restés à l''intérieur pendant longtemps à cause de la pluie", "Les enfants n''aiment pas le soleil", "Il pleut toujours dans cette région", "Les enfants avaient peur des nuages"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''inférence (reading between the lines) consiste à déduire des informations non explicitement énoncées. ''After weeks of endless rain'' indique une longue période de pluie, ''finally'' suggère une longue attente, et ''rushed outside with pure joy'' montre l''enthousiasme des enfants à sortir. On peut donc inférer qu''ils étaient restés confinés à l''intérieur pendant les semaines de pluie.", "steps": ["''weeks of endless rain'' = des semaines de pluie continue", "''finally'' = enfin, après une longue attente", "''rushed outside with pure joy'' = se sont précipités dehors avec joie", "Inférence : les enfants étaient restés à l''intérieur à cause de la pluie prolongée"]}',
  '{"anglais","reading","inférence","lecture_entre_lignes"}'
),
(
  '44444444-0000-0000-0000-000000000561',
  '33333333-0000-0000-0000-000000000083',
  'numeric', 3, 'fr',
  '{"stem": "Dans un texte argumentatif en anglais, un élève doit identifier les marqueurs d''opinion parmi les expressions suivantes : (1) ''I believe'', (2) ''According to statistics'', (3) ''It is widely known that'', (4) ''In my view'', (5) ''Research shows that'', (6) ''It seems to me''. Combien de ces expressions sont des marqueurs d''opinion personnelle ?", "correct_value": 3, "tolerance": 0, "latex": false}',
  '{"text_fr": "Les marqueurs d''opinion personnelle sont ceux qui indiquent un point de vue subjectif. Parmi les 6 expressions : ''I believe'' (je crois), ''In my view'' (à mon avis) et ''It seems to me'' (il me semble) sont des marqueurs d''opinion personnelle (3 au total). Les autres (''According to statistics'', ''It is widely known that'', ''Research shows that'') renvoient à des sources extérieures ou à des faits reconnus.", "steps": ["(1) ''I believe'' = opinion personnelle ✓", "(2) ''According to statistics'' = référence à des données = fait", "(3) ''It is widely known that'' = fait reconnu", "(4) ''In my view'' = opinion personnelle ✓", "(5) ''Research shows that'' = référence à la recherche = fait", "(6) ''It seems to me'' = opinion personnelle ✓", "Total : 3 marqueurs d''opinion personnelle"]}',
  '{"anglais","reading","inférence","fait_opinion"}'
),
(
  '44444444-0000-0000-0000-000000000562',
  '33333333-0000-0000-0000-000000000083',
  'true_false', 3, 'fr',
  '{"stem": "Dans la phrase ''The politician delivered a passionate speech, but his hollow promises failed to convince the skeptical audience'', le mot ''hollow'' utilisé dans ce contexte signifie ''vide de sens, sans substance'' et révèle l''attitude critique de l''auteur.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Le mot ''hollow'' signifie littéralement ''creux'' et, dans ce contexte, il qualifie les promesses comme étant vides de sens, sans substance ni sincérité. Ce choix de vocabulaire (''hollow promises'') révèle clairement l''attitude critique et sceptique de l''auteur envers le politicien. C''est un exemple de vocabulaire contextuel (contextual vocabulary) qui permet d''identifier le ton de l''auteur.", "steps": ["''hollow'' = creux, vide (sens littéral)", "En contexte : ''hollow promises'' = promesses creuses, sans substance", "Ce mot révèle le jugement négatif de l''auteur", "Le vocabulaire contextuel aide à identifier le ton et l''attitude de l''auteur"]}',
  '{"anglais","reading","inférence","vocabulaire_contextuel"}'
),
(
  '44444444-0000-0000-0000-000000000563',
  '33333333-0000-0000-0000-000000000083',
  'true_false', 3, 'fr',
  '{"stem": "L''analyse critique d''un texte en anglais consiste uniquement à résumer les idées principales sans évaluer la qualité des arguments ni la fiabilité des sources.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. L''analyse critique (critical analysis) va bien au-delà du simple résumé. Elle implique d''évaluer la qualité et la pertinence des arguments, de vérifier la fiabilité des sources, d''identifier les biais éventuels de l''auteur, de distinguer les faits des opinions, et de formuler un jugement personnel fondé sur des preuves.", "steps": ["Résumer les idées principales = compréhension de base, pas analyse critique", "L''analyse critique évalue la qualité des arguments", "Elle vérifie la fiabilité et la crédibilité des sources", "Elle identifie les biais (biases) et les présupposés de l''auteur", "Elle distingue faits et opinions et formule un jugement argumenté"]}',
  '{"anglais","reading","inférence","analyse_critique"}'
);
