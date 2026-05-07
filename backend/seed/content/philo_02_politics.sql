-- ============================================================
-- PHILO CONTENT: La politique (3 skills, 21 items)
-- Topic: La politique
-- Skills:
--   state_power          (33333333-...-058) — 7 items
--   justice_law           (33333333-...-059) — 7 items
--   violence_legitimacy   (33333333-...-060) — 7 items
-- ============================================================

-- =====================
-- SKILL: state_power (L'État et le pouvoir) — 7 items
-- =====================

-- Item 382 — mcq — Contrat social (Rousseau)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000382',
  '33333333-0000-0000-0000-000000000058',
  'mcq', 2, 'fr',
  '{"stem": "Selon Rousseau, quel concept fonde la légitimité du pouvoir politique ?", "choices": ["Le contrat social", "Le droit divin", "La force militaire", "L''hérédité monarchique"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Pour Rousseau, le pouvoir politique tire sa légitimité du contrat social, un accord volontaire entre les individus qui forment le corps politique. Ce pacte transforme la liberté naturelle en liberté civile.", "steps": ["Rousseau rejette le droit divin et la force comme fondements du pouvoir", "Il propose le contrat social : un pacte librement consenti par tous les membres de la société", "Ce contrat fonde la souveraineté du peuple et la volonté générale"]}',
  '{"philosophie","politique","état","contrat_social","rousseau"}'
);

-- Item 383 — mcq — Hobbes et l'état de nature
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000383',
  '33333333-0000-0000-0000-000000000058',
  'mcq', 2, 'fr',
  '{"stem": "Comment Hobbes décrit-il l''état de nature dans le Léviathan ?", "choices": ["Une guerre de tous contre tous", "Un paradis de liberté naturelle", "Une société primitive mais harmonieuse", "Un état de coopération spontanée"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Hobbes considère l''état de nature comme un état de guerre permanent (bellum omnium contra omnes) où chaque individu est un danger pour les autres. C''est pour sortir de cette insécurité que les hommes concluent un contrat et cèdent leurs droits au souverain.", "steps": ["Hobbes décrit l''état de nature comme un état de guerre de tous contre tous", "Dans cet état, la vie est solitaire, misérable, brutale et courte", "Les hommes acceptent de céder leur liberté à un souverain absolu (le Léviathan) pour garantir la paix"]}',
  '{"philosophie","politique","état","hobbes","état_de_nature"}'
);

-- Item 384 — mcq — Séparation des pouvoirs
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000384',
  '33333333-0000-0000-0000-000000000058',
  'mcq', 2, 'fr',
  '{"stem": "Quel philosophe a théorisé le principe de la séparation des pouvoirs en législatif, exécutif et judiciaire ?", "choices": ["Montesquieu", "Rousseau", "Hobbes", "Machiavel"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Montesquieu, dans De l''esprit des lois (1748), a théorisé la séparation des trois pouvoirs (législatif, exécutif, judiciaire) comme condition nécessaire pour éviter le despotisme et garantir la liberté politique.", "steps": ["Montesquieu distingue trois pouvoirs : législatif, exécutif et judiciaire", "Il affirme que la concentration de ces pouvoirs mène au despotisme", "La séparation des pouvoirs est une garantie contre l''abus de pouvoir"]}',
  '{"philosophie","politique","état","montesquieu","séparation_des_pouvoirs"}'
);

-- Item 385 — mcq — Locke et le droit de résistance
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000385',
  '33333333-0000-0000-0000-000000000058',
  'mcq', 3, 'fr',
  '{"stem": "Selon John Locke, que doivent faire les citoyens lorsque le gouvernement viole les droits naturels ?", "choices": ["Ils ont le droit de résister et de renverser le gouvernement", "Ils doivent obéir inconditionnellement au souverain", "Ils doivent fuir vers un autre État", "Ils doivent attendre les prochaines élections"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Locke affirme dans le Second Traité du gouvernement civil que le pouvoir politique est un dépôt confié par le peuple. Si le gouvernement trahit cette confiance en violant les droits naturels (vie, liberté, propriété), le peuple a le droit légitime de résister et de le renverser.", "steps": ["Pour Locke, le pouvoir politique repose sur le consentement du peuple", "Le gouvernement a pour mission de protéger les droits naturels : vie, liberté, propriété", "Si le gouvernement viole ces droits, le peuple a un droit de résistance légitime"]}',
  '{"philosophie","politique","état","locke","droit_de_résistance"}'
);

-- Item 386 — numeric — Date de publication De l'esprit des lois
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000386',
  '33333333-0000-0000-0000-000000000058',
  'numeric', 2, 'fr',
  '{"stem": "En quelle année Montesquieu a-t-il publié De l''esprit des lois, ouvrage fondateur de la théorie de la séparation des pouvoirs ?", "correct_value": 1748, "tolerance": 0, "unit": ""}',
  '{"text_fr": "De l''esprit des lois a été publié en 1748 par Montesquieu. Cet ouvrage majeur propose une classification des régimes politiques et théorise la séparation des pouvoirs législatif, exécutif et judiciaire.", "steps": ["Montesquieu publie De l''esprit des lois en 1748", "L''ouvrage analyse les différentes formes de gouvernement", "Il établit le principe de la séparation des pouvoirs comme garantie de la liberté"]}',
  '{"philosophie","politique","état","montesquieu","date"}'
);

-- Item 387 — true_false — Souveraineté chez Rousseau
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000387',
  '33333333-0000-0000-0000-000000000058',
  'true_false', 2, 'fr',
  '{"statement": "Selon Rousseau, la souveraineté appartient au peuple et elle est inaliénable.", "correct_answer": true}',
  '{"text_fr": "Vrai. Pour Rousseau, la souveraineté réside dans le peuple et ne peut être ni cédée ni représentée. La volonté générale, expression de la souveraineté populaire, est inaliénable et indivisible.", "steps": ["Rousseau affirme que la souveraineté appartient au peuple tout entier", "Cette souveraineté est inaliénable : elle ne peut être transférée à un représentant", "La volonté générale est l''expression directe de cette souveraineté populaire"]}',
  '{"philosophie","politique","état","rousseau","souveraineté"}'
);

-- Item 388 — true_false — Hobbes et la démocratie
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000388',
  '33333333-0000-0000-0000-000000000058',
  'true_false', 2, 'fr',
  '{"statement": "Hobbes défend la démocratie directe comme le meilleur régime politique.", "correct_answer": false}',
  '{"text_fr": "Faux. Hobbes ne défend pas la démocratie directe. Il préconise un pouvoir souverain absolu et indivisible (le Léviathan) pour mettre fin à l''état de guerre naturel. Le souverain peut être un monarque, une assemblée, mais son pouvoir doit être absolu.", "steps": ["Hobbes ne défend pas la démocratie directe", "Il prône un pouvoir souverain absolu pour garantir la paix civile", "Le Léviathan est un souverain dont l''autorité est absolue et indivisible"]}',
  '{"philosophie","politique","état","hobbes","régime_politique"}'
);

-- =====================
-- SKILL: justice_law (La justice et le droit) — 7 items
-- =====================

-- Item 389 — mcq — Droit naturel vs droit positif
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000389',
  '33333333-0000-0000-0000-000000000059',
  'mcq', 2, 'fr',
  '{"stem": "Quelle est la différence fondamentale entre le droit naturel et le droit positif ?", "choices": ["Le droit naturel est universel et inné, le droit positif est établi par les institutions humaines", "Le droit naturel est écrit, le droit positif est oral", "Le droit naturel concerne la nature, le droit positif concerne la société", "Il n''y a aucune différence entre les deux"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le droit naturel désigne un ensemble de principes universels et immuables fondés sur la nature humaine ou la raison, indépendamment des lois écrites. Le droit positif, en revanche, est l''ensemble des lois établies par les institutions humaines dans une société donnée.", "steps": ["Le droit naturel est considéré comme universel, inné et antérieur à toute législation", "Le droit positif est l''ensemble des lois créées par les hommes dans un contexte historique et social", "Le droit naturel sert souvent de critère pour juger la justice du droit positif"]}',
  '{"philosophie","politique","justice","droit_naturel","droit_positif"}'
);

-- Item 390 — mcq — Justice distributive chez Rawls
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000390',
  '33333333-0000-0000-0000-000000000059',
  'mcq', 3, 'fr',
  '{"stem": "Dans la Théorie de la justice de Rawls, que désigne le « voile d''ignorance » ?", "choices": ["Une situation hypothétique où les individus choisissent les principes de justice sans connaître leur position sociale", "L''ignorance du peuple face aux lois", "Le secret qui entoure les décisions judiciaires", "L''absence de connaissance philosophique chez les citoyens"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le voile d''ignorance est un dispositif théorique proposé par John Rawls. Dans la position originelle, les individus doivent choisir les principes de justice sans connaître leur place dans la société (classe, talents, richesse). Cela garantit l''impartialité des principes choisis.", "steps": ["Rawls imagine une position originelle où les individus choisissent les principes de justice", "Le voile d''ignorance empêche chacun de connaître sa position sociale, ses talents ou sa richesse", "Ce dispositif garantit que les principes choisis sont équitables et impartiaux"]}',
  '{"philosophie","politique","justice","rawls","voile_d_ignorance"}'
);

-- Item 391 — mcq — Aristote et la justice
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000391',
  '33333333-0000-0000-0000-000000000059',
  'mcq', 2, 'fr',
  '{"stem": "Aristote distingue deux formes de justice. Laquelle consiste à répartir les biens selon le mérite de chacun ?", "choices": ["La justice distributive", "La justice commutative", "La justice pénale", "La justice restaurative"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Aristote distingue la justice distributive, qui répartit les biens et les honneurs selon le mérite (proportionnellement), et la justice commutative (ou corrective), qui régit les échanges entre individus sur une base d''égalité stricte.", "steps": ["Aristote distingue justice distributive et justice commutative", "La justice distributive répartit les biens selon le mérite de chacun (proportionnalité)", "La justice commutative assure l''égalité stricte dans les échanges et les réparations"]}',
  '{"philosophie","politique","justice","aristote","justice_distributive"}'
);

-- Item 392 — mcq — Équité chez Rawls
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000392',
  '33333333-0000-0000-0000-000000000059',
  'mcq', 3, 'fr',
  '{"stem": "Quel est le principe de différence formulé par Rawls dans sa théorie de la justice ?", "choices": ["Les inégalités sociales ne sont acceptables que si elles profitent aux membres les plus défavorisés", "Tous les individus doivent recevoir exactement les mêmes ressources", "Les plus méritants doivent recevoir la plus grande part des richesses", "Les inégalités sont naturelles et ne doivent pas être corrigées"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le principe de différence de Rawls stipule que les inégalités économiques et sociales ne sont justes que si elles bénéficient aux membres les plus désavantagés de la société. Ce principe complète le principe d''égale liberté.", "steps": ["Rawls formule deux principes de justice", "Le premier principe garantit des libertés égales pour tous", "Le principe de différence (second principe) accepte les inégalités seulement si elles profitent aux plus défavorisés"]}',
  '{"philosophie","politique","justice","rawls","principe_de_différence"}'
);

-- Item 393 — numeric — Date de publication Théorie de la justice
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000393',
  '33333333-0000-0000-0000-000000000059',
  'numeric', 2, 'fr',
  '{"stem": "En quelle année John Rawls a-t-il publié Théorie de la justice (A Theory of Justice) ?", "correct_value": 1971, "tolerance": 0, "unit": ""}',
  '{"text_fr": "Théorie de la justice (A Theory of Justice) a été publiée en 1971 par John Rawls. Cet ouvrage fondateur de la philosophie politique contemporaine propose une conception de la justice comme équité fondée sur le voile d''ignorance et les deux principes de justice.", "steps": ["Rawls publie A Theory of Justice en 1971", "L''ouvrage renouvelle la tradition du contrat social", "Il introduit le voile d''ignorance et les deux principes de justice"]}',
  '{"philosophie","politique","justice","rawls","date"}'
);

-- Item 394 — true_false — Légalité et légitimité
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000394',
  '33333333-0000-0000-0000-000000000059',
  'true_false', 2, 'fr',
  '{"statement": "Ce qui est légal est toujours juste et légitime.", "correct_answer": false}',
  '{"text_fr": "Faux. La légalité (conformité à la loi positive) ne garantit pas la justice ni la légitimité morale. Des lois peuvent être légales mais injustes (comme les lois ségrégationnistes). Le droit naturel et la conscience morale peuvent s''opposer au droit positif.", "steps": ["La légalité désigne la conformité à la loi en vigueur", "La légitimité renvoie à la conformité avec des principes moraux ou de justice", "Une loi peut être légale mais injuste, comme l''ont montré les lois ségrégationnistes ou les lois de l''apartheid"]}',
  '{"philosophie","politique","justice","légalité","légitimité"}'
);

-- Item 395 — true_false — Droit naturel universel
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000395',
  '33333333-0000-0000-0000-000000000059',
  'true_false', 2, 'fr',
  '{"statement": "Le droit naturel est considéré comme universel et indépendant des législations particulières.", "correct_answer": true}',
  '{"text_fr": "Vrai. Le droit naturel est conçu comme un ensemble de principes universels et immuables, fondés sur la nature humaine ou la raison, qui s''imposent indépendamment des lois positives propres à chaque société. Il sert de fondement pour évaluer la justice des lois positives.", "steps": ["Le droit naturel est considéré comme universel, valable en tout temps et en tout lieu", "Il est fondé sur la nature humaine ou la raison", "Il est indépendant des législations particulières et sert de critère pour les évaluer"]}',
  '{"philosophie","politique","justice","droit_naturel"}'
);

-- =====================
-- SKILL: violence_legitimacy (La violence et la légitimité) — 7 items
-- =====================

-- Item 396 — mcq — Weber et le monopole de la violence légitime
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000396',
  '33333333-0000-0000-0000-000000000060',
  'mcq', 2, 'fr',
  '{"stem": "Selon Max Weber, qu''est-ce qui caractérise l''État moderne ?", "choices": ["Le monopole de la violence physique légitime", "La suppression totale de la violence", "Le recours à la violence religieuse", "L''absence de toute forme de contrainte"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Max Weber définit l''État comme une communauté humaine qui revendique avec succès le monopole de la violence physique légitime sur un territoire donné. Cela signifie que seul l''État a le droit d''utiliser la force de manière légitime.", "steps": ["Weber définit l''État par le monopole de la violence physique légitime", "Ce monopole s''exerce sur un territoire déterminé", "Toute autre violence est considérée comme illégitime si elle n''est pas autorisée par l''État"]}',
  '{"philosophie","politique","violence","weber","monopole_violence"}'
);

-- Item 397 — mcq — Désobéissance civile
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000397',
  '33333333-0000-0000-0000-000000000060',
  'mcq', 2, 'fr',
  '{"stem": "Quelle caractéristique fondamentale distingue la désobéissance civile de la simple délinquance ?", "choices": ["Elle est publique, non-violente et motivée par des principes de justice", "Elle est secrète et vise le profit personnel", "Elle repose sur l''usage de la force armée", "Elle rejette toute forme de légalité"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La désobéissance civile se distingue de la délinquance par son caractère public, non-violent et motivé par des principes de justice supérieurs. Le désobéissant civil accepte la punition légale pour montrer sa fidélité au droit tout en contestant une loi jugée injuste.", "steps": ["La désobéissance civile est un acte public et assumé, non clandestin", "Elle est non-violente et motivée par des principes de justice", "Le désobéissant civil accepte les conséquences légales de son acte"]}',
  '{"philosophie","politique","violence","désobéissance_civile"}'
);

-- Item 398 — mcq — Trois types de légitimité (Weber)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000398',
  '33333333-0000-0000-0000-000000000060',
  'mcq', 3, 'fr',
  '{"stem": "Quels sont les trois types de domination légitime distingués par Max Weber ?", "choices": ["Traditionnelle, charismatique et rationnelle-légale", "Monarchique, aristocratique et démocratique", "Religieuse, militaire et économique", "Paternelle, fraternelle et autoritaire"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Weber distingue trois formes de domination légitime : la domination traditionnelle (fondée sur la coutume et l''héritage), la domination charismatique (fondée sur les qualités exceptionnelles d''un chef) et la domination rationnelle-légale (fondée sur des règles et des lois impersonnelles).", "steps": ["La domination traditionnelle repose sur la coutume et les traditions ancestrales", "La domination charismatique repose sur le charisme personnel du chef", "La domination rationnelle-légale repose sur des lois impersonnelles et des procédures bureaucratiques"]}',
  '{"philosophie","politique","violence","weber","domination_légitime"}'
);

-- Item 399 — mcq — Gandhi et la non-violence
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000399',
  '33333333-0000-0000-0000-000000000060',
  'mcq', 2, 'fr',
  '{"stem": "Quel terme désigne la philosophie de résistance non-violente prônée par Gandhi ?", "choices": ["L''ahimsa", "Le jihad", "La praxis", "Le logos"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''ahimsa est le principe de non-violence prôné par Gandhi. Il désigne le refus de toute violence envers tout être vivant. Gandhi en a fait le fondement de sa lutte politique pour l''indépendance de l''Inde, montrant que la résistance peut être efficace sans recourir à la violence.", "steps": ["L''ahimsa signifie non-violence, refus de nuire à tout être vivant", "Gandhi a fait de l''ahimsa le principe central de sa lutte politique", "Il a montré qu''une résistance non-violente peut être politiquement efficace"]}',
  '{"philosophie","politique","violence","gandhi","non_violence"}'
);

-- Item 400 — numeric — Date de publication Le Savant et le Politique (Weber)
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000400',
  '33333333-0000-0000-0000-000000000060',
  'numeric', 2, 'fr',
  '{"stem": "En quelle année Max Weber a-t-il prononcé la conférence « Le métier et la vocation de politique » (Politik als Beruf), où il définit l''État par le monopole de la violence légitime ?", "correct_value": 1919, "tolerance": 0, "unit": ""}',
  '{"text_fr": "C''est en 1919 que Max Weber prononce sa célèbre conférence Politik als Beruf (Le métier et la vocation de politique) à Munich. Il y définit l''État comme la communauté humaine qui revendique avec succès le monopole de la violence physique légitime.", "steps": ["Weber prononce la conférence Politik als Beruf en 1919 à Munich", "Il y propose sa définition célèbre de l''État par le monopole de la violence légitime", "Cette conférence est publiée dans Le Savant et le Politique"]}',
  '{"philosophie","politique","violence","weber","date"}'
);

-- Item 401 — true_false — Violence et politique
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000401',
  '33333333-0000-0000-0000-000000000060',
  'true_false', 2, 'fr',
  '{"statement": "Selon Weber, l''État n''utilise pas la violence, il se contente de la condamner.", "correct_answer": false}',
  '{"text_fr": "Faux. Selon Weber, l''État ne condamne pas simplement la violence, il en revendique le monopole légitime. L''État est la seule institution qui a le droit d''exercer la violence physique de manière légitime sur un territoire donné.", "steps": ["Weber ne dit pas que l''État condamne la violence", "Au contraire, l''État revendique le monopole de la violence physique légitime", "Ce monopole est ce qui distingue l''État de toute autre organisation sociale"]}',
  '{"philosophie","politique","violence","weber"}'
);

-- Item 402 — true_false — Résistance à l'oppression
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000402',
  '33333333-0000-0000-0000-000000000060',
  'true_false', 2, 'fr',
  '{"statement": "Le droit de résistance à l''oppression est inscrit dans la Déclaration des droits de l''homme et du citoyen de 1789.", "correct_answer": true}',
  '{"text_fr": "Vrai. L''article 2 de la Déclaration des droits de l''homme et du citoyen de 1789 énonce quatre droits naturels et imprescriptibles : la liberté, la propriété, la sûreté et la résistance à l''oppression. Ce droit légitime la révolte contre un pouvoir tyrannique.", "steps": ["L''article 2 de la DDHC de 1789 énumère les droits naturels et imprescriptibles", "Ces droits sont : la liberté, la propriété, la sûreté et la résistance à l''oppression", "Le droit de résistance à l''oppression légitime la révolte contre la tyrannie"]}',
  '{"philosophie","politique","violence","résistance","DDHC"}'
);
