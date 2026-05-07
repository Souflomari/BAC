-- ============================================================
-- SVT CONTENT: Génétique humaine (2 skills, 14 items)
-- Topic: Génétique humaine
-- Skills:
--   autosomal_heredity  (33333333-...-038) difficulty 3 — 7 items
--   sex_linked_heredity  (33333333-...-039) difficulty 3 — 7 items
-- ============================================================

-- =====================
-- SKILL: autosomal_heredity (Hérédité liée aux autosomes) — 7 items
-- Mix: 3 mcq + 2 numeric + 2 true_false
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000244',
  '33333333-0000-0000-0000-000000000038',
  'mcq', 3, 'fr',
  '{"stem": "Dans une famille, le père et la mère sont tous les deux phénotypiquement sains, mais ils ont un enfant atteint de mucoviscidose. Quel est le mode de transmission de cette maladie ?", "choices": ["Autosomique récessif", "Autosomique dominant", "Lié au chromosome X récessif", "Lié au chromosome Y"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La mucoviscidose est une maladie autosomique récessive. Les deux parents sont sains mais porteurs hétérozygotes (Aa). Leur enfant atteint a reçu l''allèle récessif de chaque parent (aa).", "steps": ["Les deux parents sont sains → l''allèle responsable est récessif", "L''enfant atteint est de génotype aa", "Chaque parent est hétérozygote Aa (porteur sain)", "La maladie touche les deux sexes → transmission autosomique"]}',
  '{"heredite","autosomique","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000245',
  '33333333-0000-0000-0000-000000000038',
  'mcq', 3, 'fr',
  '{"stem": "On considère une maladie autosomique dominante. Un père atteint hétérozygote (Aa) épouse une femme saine (aa). Quelle est la proportion attendue d''enfants atteints ?", "choices": ["1/2", "1/4", "3/4", "Tous les enfants"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le croisement Aa × aa donne : 1/2 Aa (atteints) et 1/2 aa (sains). Donc la moitié des enfants sont attendus atteints.", "steps": ["Père atteint hétérozygote : Aa", "Mère saine : aa", "Échiquier de croisement : Aa × aa → 1/2 Aa + 1/2 aa", "Proportion d''enfants atteints = 1/2 = 50 %"]}',
  '{"heredite","autosomique","dominant","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000246',
  '33333333-0000-0000-0000-000000000038',
  'mcq', 4, 'fr',
  '{"stem": "L''arbre généalogique suivant montre une maladie héréditaire : un couple sain (I-1 et I-2) a deux filles saines et un fils atteint. La fille aînée (II-1, saine) épouse un homme sain non porteur et ils ont un fils atteint. Quel est le génotype de la fille II-1 ?", "choices": ["Hétérozygote (Aa) car elle a transmis l''allèle récessif à son fils", "Homozygote saine (AA) car elle est phénotypiquement saine", "Homozygote atteinte (aa) car son fils est atteint", "On ne peut pas déterminer son génotype"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La fille II-1 est phénotypiquement saine mais a un fils atteint (aa). Comme son mari est sain non porteur (AA), le fils atteint a forcément reçu l''allèle a de sa mère. Donc II-1 est hétérozygote Aa.", "steps": ["Le fils atteint est de génotype aa", "Le père (mari de II-1) est AA → il ne transmet que A", "L''allèle a du fils vient obligatoirement de la mère II-1", "Donc II-1 est de génotype Aa (porteuse saine)"]}',
  '{"heredite","autosomique","arbre_genealogique","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000247',
  '33333333-0000-0000-0000-000000000038',
  'numeric', 3, 'fr',
  '{"stem": "Dans une famille, les deux parents sont porteurs sains (Aa) d''une maladie autosomique récessive (la drépanocytose). Calculer la probabilité (entre 0 et 1) qu''un enfant soit atteint de cette maladie.", "correct_value": 0.25, "tolerance": 0.01, "latex": false}',
  '{"text_fr": "Le croisement Aa × Aa donne selon l''échiquier de Punnett : 1/4 AA, 2/4 Aa, 1/4 aa. La probabilité d''avoir un enfant atteint (aa) est donc 1/4 = 0,25.", "steps": ["Parents : Aa × Aa", "Échiquier de Punnett : AA (1/4), Aa (2/4), aa (1/4)", "Génotype atteint : aa", "Probabilité = 1/4 = 0,25"]}',
  '{"heredite","autosomique","probabilite","drepanocytose","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000248',
  '33333333-0000-0000-0000-000000000038',
  'numeric', 3, 'fr',
  '{"stem": "On considère le croisement entre deux parents hétérozygotes (Aa) pour une maladie autosomique récessive. Ils ont déjà un enfant sain. Calculer la probabilité (entre 0 et 1) que cet enfant sain soit porteur de l''allèle récessif (hétérozygote).", "correct_value": 0.67, "tolerance": 0.02, "latex": false}',
  '{"text_fr": "Parmi les enfants du croisement Aa × Aa, les phénotypes sains sont : AA (1/4) et Aa (2/4), soit 3/4 au total. Parmi ces enfants sains, la proportion de porteurs hétérozygotes est (2/4) / (3/4) = 2/3 ≈ 0,67.", "steps": ["Croisement Aa × Aa → AA (1/4), Aa (2/4), aa (1/4)", "Enfants sains : AA + Aa = 3/4", "Parmi les sains, proportion d''hétérozygotes = (2/4) / (3/4) = 2/3", "P = 2/3 ≈ 0,67"]}',
  '{"heredite","autosomique","probabilite_conditionnelle","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000249',
  '33333333-0000-0000-0000-000000000038',
  'true_false', 2, 'fr',
  '{"stem": "La phénylcétonurie est une maladie autosomique récessive : deux parents phénotypiquement sains ne peuvent jamais avoir un enfant atteint.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Si les deux parents sont porteurs sains (hétérozygotes Aa), ils sont phénotypiquement sains mais peuvent avoir un enfant atteint (aa) avec une probabilité de 1/4.", "steps": ["Deux parents sains peuvent être porteurs (Aa)", "Croisement Aa × Aa → 1/4 de chance d''avoir un enfant aa", "Donc deux parents sains PEUVENT avoir un enfant atteint", "L''affirmation est fausse"]}',
  '{"heredite","autosomique","phenylcetonurie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000250',
  '33333333-0000-0000-0000-000000000038',
  'true_false', 3, 'fr',
  '{"stem": "On réalise un croisement test (test-cross) en croisant un individu de phénotype dominant avec un individu homozygote récessif. Si tous les descendants sont de phénotype dominant, alors l''individu testé est homozygote dominant.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Le croisement test consiste à croiser l''individu à tester avec un homozygote récessif (aa). Si l''individu est AA, tous les descendants sont Aa (phénotype dominant). Si l''individu est Aa, on obtient 1/2 Aa et 1/2 aa. L''obtention de 100 % de descendants de phénotype dominant indique que l''individu testé est AA.", "steps": ["Croisement test : individu à tester × aa", "Si AA × aa → 100 % Aa (tous de phénotype dominant)", "Si Aa × aa → 50 % Aa + 50 % aa (phénotypes dominant et récessif)", "100 % dominant → l''individu testé est homozygote AA"]}',
  '{"heredite","autosomique","croisement_test","bac_style"}'
);

-- =====================
-- SKILL: sex_linked_heredity (Hérédité liée au sexe) — 7 items
-- Mix: 3 mcq + 2 numeric + 2 true_false
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000251',
  '33333333-0000-0000-0000-000000000039',
  'mcq', 3, 'fr',
  '{"stem": "Le daltonisme est une maladie liée au chromosome X récessive. Une femme porteuse (X^d X) épouse un homme sain (X Y). Quelle est la proportion attendue de fils daltoniens ?", "choices": ["1/2 des garçons", "Tous les garçons", "Aucun garçon", "1/4 des garçons"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La mère porteuse (X^d X) transmet soit X^d soit X à ses fils. Les fils reçoivent le Y du père. Donc 1/2 des garçons sont X^d Y (daltoniens) et 1/2 sont X Y (sains).", "steps": ["Mère porteuse : X^d X (un allèle normal, un allèle muté)", "Père sain : X Y", "Fils possibles : X^d Y (daltonien) ou X Y (sain)", "Probabilité d''un fils daltonien = 1/2 = 50 %"]}',
  '{"heredite","liee_X","daltonisme","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000252',
  '33333333-0000-0000-0000-000000000039',
  'mcq', 3, 'fr',
  '{"stem": "L''hémophilie est une maladie récessive liée au chromosome X. Pourquoi les garçons sont-ils plus fréquemment atteints que les filles ?", "choices": ["Les garçons n''ont qu''un seul chromosome X, donc un seul allèle muté suffit pour être atteint", "Les garçons ont deux chromosomes X", "L''allèle de l''hémophilie est dominant chez les garçons", "Le chromosome Y porte l''allèle de l''hémophilie"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Les garçons sont XY : ils n''ont qu''un seul chromosome X. S''ils héritent de l''allèle muté (X^h), ils sont directement atteints (X^h Y). Les filles (XX) doivent hériter de deux allèles mutés pour être atteintes, ce qui est beaucoup plus rare.", "steps": ["Garçon = XY → un seul allèle X suffit pour exprimer la maladie", "Fille = XX → il faut deux allèles mutés (X^h X^h) pour être atteinte", "Un garçon X^h Y est atteint (hémizygote)", "Une fille X^h X est porteuse saine (hétérozygote)"]}',
  '{"heredite","liee_X","hemophilie","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000253',
  '33333333-0000-0000-0000-000000000039',
  'mcq', 4, 'fr',
  '{"stem": "L''arbre généalogique suivant montre une maladie héréditaire : une femme saine (I-2) dont le père était atteint épouse un homme sain (I-1). Ils ont un fils atteint (II-1) et une fille saine (II-2). Comment peut-on distinguer une hérédité liée au sexe (récessive liée à X) d''une hérédité autosomique récessive dans ce cas ?", "choices": ["Si la maladie est liée à X, un père atteint transmet obligatoirement l''allèle muté à toutes ses filles qui deviennent porteuses", "On ne peut jamais les distinguer", "Si la maladie est autosomique, elle ne touche que les garçons", "Si la maladie est liée à X, les deux sexes sont touchés de manière égale"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Dans l''hérédité liée à X récessive, un père atteint (X^a Y) transmet son X^a à toutes ses filles, qui sont donc obligatoirement porteuses (X^a X). Cela explique que la femme I-2 (dont le père était atteint) est porteuse et peut transmettre l''allèle muté à ses fils.", "steps": ["Père atteint (I-2''s père) : X^a Y → toutes ses filles reçoivent X^a", "I-2 est donc porteuse obligatoire : X^a X", "I-1 sain : X Y", "Fils II-1 : X^a Y (atteint) — il a reçu X^a de sa mère", "En autosomique récessif, le père atteint ne transmet pas obligatoirement à toutes ses filles"]}',
  '{"heredite","liee_X","arbre_genealogique","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000254',
  '33333333-0000-0000-0000-000000000039',
  'numeric', 3, 'fr',
  '{"stem": "Une femme porteuse du daltonisme (X^d X) épouse un homme daltonien (X^d Y). Calculer la probabilité (entre 0 et 1) qu''un enfant choisi au hasard soit daltonien (garçon ou fille).", "correct_value": 0.50, "tolerance": 0.01, "latex": false}',
  '{"text_fr": "Croisement X^d X × X^d Y. Les gamètes de la mère : X^d et X. Les gamètes du père : X^d et Y. Descendants : X^d X^d (fille daltonienne), X X^d (fille porteuse saine), X^d Y (garçon daltonien), X Y (garçon sain). Daltoniens = X^d X^d + X^d Y = 2/4 = 1/2 = 0,50.", "steps": ["Mère : X^d X → gamètes X^d ou X", "Père : X^d Y → gamètes X^d ou Y", "Filles : X^d X^d (daltonienne) ou X X^d (porteuse saine)", "Garçons : X^d Y (daltonien) ou X Y (sain)", "Enfants daltoniens : X^d X^d + X^d Y = 2/4 = 0,50"]}',
  '{"heredite","liee_X","daltonisme","probabilite","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000255',
  '33333333-0000-0000-0000-000000000039',
  'numeric', 3, 'fr',
  '{"stem": "Une femme porteuse de l''hémophilie (X^h X) épouse un homme sain (X Y). Calculer la probabilité (entre 0 et 1) qu''une fille issue de ce couple soit porteuse de l''allèle de l''hémophilie.", "correct_value": 0.50, "tolerance": 0.01, "latex": false}',
  '{"text_fr": "Croisement X^h X × X Y. Les filles reçoivent un X du père (toujours X normal) et un X de la mère (X^h ou X). Donc les filles possibles sont : X^h X (porteuse) ou X X (saine). Probabilité d''être porteuse = 1/2 = 0,50.", "steps": ["Mère : X^h X → gamètes X^h ou X", "Père : X Y → transmet X à ses filles", "Filles possibles : X^h X (porteuse) ou XX (saine)", "Probabilité qu''une fille soit porteuse = 1/2 = 0,50"]}',
  '{"heredite","liee_X","hemophilie","probabilite","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000256',
  '33333333-0000-0000-0000-000000000039',
  'true_false', 3, 'fr',
  '{"stem": "Dans le cas d''une maladie récessive liée au chromosome X, une mère porteuse peut transmettre l''allèle muté à ses fils qui seront alors atteints.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Une mère porteuse (X^a X) a une probabilité de 1/2 de transmettre le chromosome X portant l''allèle muté à chacun de ses fils. Un fils recevant X^a sera de génotype X^a Y et sera atteint car il n''a pas de deuxième X pour compenser.", "steps": ["Mère porteuse : X^a X", "Elle transmet X^a ou X avec une probabilité de 1/2 chacun", "Un fils X^a Y est atteint (un seul X, pas de compensation)", "Transmission mère porteuse → fils atteint est caractéristique de l''hérédité liée à X"]}',
  '{"heredite","liee_X","transmission","bac_style"}'
),
(
  '44444444-0000-0000-0000-000000000257',
  '33333333-0000-0000-0000-000000000039',
  'true_false', 3, 'fr',
  '{"stem": "Dans l''hérédité liée au chromosome X, un père atteint transmet obligatoirement la maladie à tous ses fils.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Un père transmet son chromosome Y (et non son X) à ses fils. Les fils reçoivent leur unique chromosome X de leur mère. Un père atteint (X^a Y) transmet son X^a uniquement à ses filles, qui deviennent porteuses (X^a X) si la mère est saine.", "steps": ["Le père transmet Y à ses fils et X à ses filles", "Les fils reçoivent leur X de la mère, pas du père", "Père atteint X^a Y → ses fils reçoivent Y (pas X^a)", "Père atteint X^a Y → ses filles reçoivent X^a (porteuses obligatoires)"]}',
  '{"heredite","liee_X","transmission","bac_style"}'
);
