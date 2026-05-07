-- ============================================================
-- ENGLISH CONTENT: Grammar and Vocabulary (3 skills, 21 items)
-- Topic: Grammar and Vocabulary
-- Skills:
--   tenses              (33333333-...-079) — 7 items (4 mcq + 1 numeric + 2 true_false)
--   grammar_structures   (33333333-...-080) — 7 items (4 mcq + 1 numeric + 2 true_false)
--   vocabulary           (33333333-...-081) — 7 items (4 mcq + 1 numeric + 2 true_false)
-- ============================================================

-- =====================
-- SKILL: tenses (Verb Tenses) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000529',
  '33333333-0000-0000-0000-000000000079',
  'mcq', 1, 'fr',
  '{"stem": "Choisissez la forme correcte : She ___ to school every morning.", "choices": ["go", "goes", "going", "gone"], "correct_index": 1, "latex": false}',
  '{"text_fr": "Au present simple, les verbes conjugués avec he/she/it prennent un « s » à la fin.", "steps": ["She est la 3e personne du singulier", "Au present simple, on ajoute -s ou -es au verbe avec he/she/it", "go → goes"]}',
  '{"anglais","grammaire","present_simple","tenses"}'
),
(
  '44444444-0000-0000-0000-000000000530',
  '33333333-0000-0000-0000-000000000079',
  'mcq', 2, 'fr',
  '{"stem": "Complétez : While I ___ (study), my brother was playing outside.", "choices": ["studied", "was studying", "have studied", "study"], "correct_index": 1, "latex": false}',
  '{"text_fr": "On utilise le past continuous pour une action en cours dans le passé, interrompue ou simultanée à une autre action. « While » introduit souvent le past continuous.", "steps": ["While indique une action en cours dans le passé", "Action en cours dans le passé = past continuous (was/were + V-ing)", "I → was studying"]}',
  '{"anglais","grammaire","past_continuous","tenses"}'
),
(
  '44444444-0000-0000-0000-000000000531',
  '33333333-0000-0000-0000-000000000079',
  'mcq', 2, 'fr',
  '{"stem": "Quelle est la forme correcte ? They ___ already ___ the project before the deadline.", "choices": ["have / finished", "had / finished", "has / finished", "were / finishing"], "correct_index": 1, "latex": false}',
  '{"text_fr": "Le past perfect (had + past participle) s''utilise pour exprimer une action achevée avant une autre action passée. Ici, l''action de finir le projet est antérieure au deadline (passé).", "steps": ["L''action de finir le projet a eu lieu AVANT le deadline", "Pour exprimer une antériorité dans le passé, on utilise le past perfect", "Past perfect = had + participe passé → had finished"]}',
  '{"anglais","grammaire","past_perfect","tenses"}'
),
(
  '44444444-0000-0000-0000-000000000532',
  '33333333-0000-0000-0000-000000000079',
  'mcq', 2, 'fr',
  '{"stem": "Choisissez la bonne réponse : By next June, we ___ in this city for ten years.", "choices": ["will live", "will have lived", "are living", "have lived"], "correct_index": 1, "latex": false}',
  '{"text_fr": "Le future perfect (will have + past participle) s''utilise pour une action qui sera achevée avant un moment précis dans le futur. « By next June » indique un repère futur.", "steps": ["« By next June » = d''ici juin prochain (repère futur)", "On décrit une action qui sera accomplie avant ce repère", "Future perfect = will have + participe passé → will have lived"]}',
  '{"anglais","grammaire","future_perfect","tenses"}'
),
(
  '44444444-0000-0000-0000-000000000533',
  '33333333-0000-0000-0000-000000000079',
  'numeric', 2, 'fr',
  '{"stem": "Dans la phrase suivante, combien de verbes sont conjugués au present perfect ?\n\n« She has visited Morocco, has learned Arabic, and has written a book about her experiences, but she never went to Algeria. »", "correct_value": 3, "tolerance": 0, "latex": false}',
  '{"text_fr": "Le present perfect a la structure has/have + participe passé. On identifie : has visited, has learned, has written. Le verbe « went » est au past simple.", "steps": ["has visited → present perfect (1)", "has learned → present perfect (2)", "has written → present perfect (3)", "went → past simple (ne compte pas)", "Total = 3 verbes au present perfect"]}',
  '{"anglais","grammaire","present_perfect","tenses"}'
),
(
  '44444444-0000-0000-0000-000000000534',
  '33333333-0000-0000-0000-000000000079',
  'true_false', 1, 'fr',
  '{"stem": "Le present continuous (be + V-ing) peut s''utiliser pour exprimer un projet futur déjà planifié. Exemple : « I am meeting my friend tomorrow. »", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Le present continuous peut exprimer un arrangement futur déjà prévu. « I am meeting my friend tomorrow » signifie que le rendez-vous est déjà organisé.", "steps": ["Le present continuous s''utilise pour les actions en cours MAIS aussi pour des projets futurs déjà arrangés", "Exemple : I am flying to London next week = le vol est réservé", "La phrase est donc correcte → Vrai"]}',
  '{"anglais","grammaire","present_continuous","tenses"}'
),
(
  '44444444-0000-0000-0000-000000000535',
  '33333333-0000-0000-0000-000000000079',
  'true_false', 2, 'fr',
  '{"stem": "La phrase « I have been to Paris yesterday » est grammaticalement correcte.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Le present perfect ne s''utilise jamais avec un marqueur temporel précis du passé comme « yesterday ». Il faudrait dire « I went to Paris yesterday » (past simple) ou « I have been to Paris » (sans marqueur temporel précis).", "steps": ["Le present perfect (have been) exprime un lien avec le présent", "« Yesterday » est un marqueur temporel du passé révolu", "On ne peut pas combiner present perfect + marqueur temporel passé précis", "La forme correcte serait : I went to Paris yesterday → Faux"]}',
  '{"anglais","grammaire","present_perfect","piege_classique","tenses"}'
);

-- =====================
-- SKILL: grammar_structures (Grammar Structures) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000536',
  '33333333-0000-0000-0000-000000000080',
  'mcq', 2, 'fr',
  '{"stem": "Transformez à la voix passive : « The students wrote the exam. »", "choices": ["The exam was written by the students.", "The exam is written by the students.", "The exam were written by the students.", "The exam has been written by the students."], "correct_index": 0, "latex": false}',
  '{"text_fr": "Pour passer à la voix passive, le complément d''objet (the exam) devient sujet, on utilise l''auxiliaire be au même temps que le verbe actif (wrote → was) + le participe passé (written).", "steps": ["Phrase active : The students (sujet) wrote (verbe) the exam (COD)", "Le COD « the exam » devient sujet de la phrase passive", "Le verbe « wrote » est au past simple → be au past simple = was", "was + participe passé de write = was written", "L''agent = by the students → The exam was written by the students"]}',
  '{"anglais","grammaire","passive_voice","grammar_structures"}'
),
(
  '44444444-0000-0000-0000-000000000537',
  '33333333-0000-0000-0000-000000000080',
  'mcq', 2, 'fr',
  '{"stem": "Choisissez la bonne transformation au discours indirect :\nDirect : « I will help you, » she said.\nIndirect : She said that she ___ help me.", "choices": ["will", "would", "can", "shall"], "correct_index": 1, "latex": false}',
  '{"text_fr": "Au discours indirect (reported speech), quand le verbe introducteur est au passé (said), on applique la concordance des temps : will → would.", "steps": ["Le verbe introducteur « said » est au passé", "Règle de concordance des temps (backshift) :", "will → would", "She said that she would help me"]}',
  '{"anglais","grammaire","reported_speech","grammar_structures"}'
),
(
  '44444444-0000-0000-0000-000000000538',
  '33333333-0000-0000-0000-000000000080',
  'mcq', 3, 'fr',
  '{"stem": "Complétez avec le conditionnel correct :\n« If I had studied harder, I ___ the exam. »", "choices": ["will pass", "would pass", "would have passed", "passed"], "correct_index": 2, "latex": false}',
  '{"text_fr": "C''est un conditionnel de type 3 (third conditional) : il exprime une situation irréelle dans le passé. La structure est : If + past perfect, would have + participe passé.", "steps": ["« If I had studied » = past perfect → condition irréelle dans le passé", "C''est un conditionnel de type 3 (3rd conditional)", "Structure : If + past perfect, would have + past participle", "would have passed est la forme correcte"]}',
  '{"anglais","grammaire","conditional_type3","grammar_structures"}'
),
(
  '44444444-0000-0000-0000-000000000539',
  '33333333-0000-0000-0000-000000000080',
  'mcq', 2, 'fr',
  '{"stem": "Choisissez le pronom relatif correct :\n« The teacher ___ class I attended was very helpful. »", "choices": ["who", "which", "whose", "whom"], "correct_index": 2, "latex": false}',
  '{"text_fr": "On utilise « whose » pour exprimer la possession dans une proposition relative. Ici, « whose class » = la classe de qui / dont la classe.", "steps": ["On cherche un pronom relatif exprimant la possession", "who = sujet (personne), which = sujet/objet (chose), whom = objet (personne)", "whose = possession (de qui, dont)", "The teacher whose class I attended = l''enseignant dont j''ai suivi le cours"]}',
  '{"anglais","grammaire","relative_clauses","grammar_structures"}'
),
(
  '44444444-0000-0000-0000-000000000540',
  '33333333-0000-0000-0000-000000000080',
  'numeric', 2, 'fr',
  '{"stem": "Combien de types de conditionnels existe-t-il en anglais (en comptant le conditionnel zéro) ?", "correct_value": 4, "tolerance": 0, "latex": false}',
  '{"text_fr": "Il existe 4 types de conditionnels en anglais : le zero conditional (vérité générale), le 1st conditional (probable dans le futur), le 2nd conditional (irréel dans le présent) et le 3rd conditional (irréel dans le passé).", "steps": ["Zero conditional : If + present simple, present simple (vérité générale)", "1st conditional : If + present simple, will + base verbale (probable)", "2nd conditional : If + past simple, would + base verbale (irréel présent)", "3rd conditional : If + past perfect, would have + past participle (irréel passé)", "Total = 4 types"]}',
  '{"anglais","grammaire","conditionals","grammar_structures"}'
),
(
  '44444444-0000-0000-0000-000000000541',
  '33333333-0000-0000-0000-000000000080',
  'true_false', 2, 'fr',
  '{"stem": "Dans la phrase « If I were you, I would accept the offer », l''utilisation de « were » au lieu de « was » est incorrecte.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Dans le conditionnel de type 2, on utilise le subjonctif « were » pour toutes les personnes (y compris I, he, she, it). « If I were you » est la forme standard et correcte.", "steps": ["C''est un conditionnel de type 2 (irréel du présent)", "Dans ce type, la clause if utilise le subjonctif passé", "Au subjonctif, « were » s''emploie pour toutes les personnes", "If I were, If he were, If she were → formes correctes", "L''utilisation de « were » est donc correcte → Faux"]}',
  '{"anglais","grammaire","conditional_type2","subjunctive","grammar_structures"}'
),
(
  '44444444-0000-0000-0000-000000000542',
  '33333333-0000-0000-0000-000000000080',
  'true_false', 3, 'fr',
  '{"stem": "Au discours indirect, la phrase « She said: ''I am tired'' » devient « She said that she is tired ».", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Quand le verbe introducteur est au passé (said), on applique la concordance des temps : am → was. La forme correcte est « She said that she was tired ».", "steps": ["Verbe introducteur « said » = passé", "Concordance des temps (backshift) obligatoire", "am (present simple) → was (past simple)", "Forme correcte : She said that she was tired", "La phrase proposée est donc incorrecte → Faux"]}',
  '{"anglais","grammaire","reported_speech","grammar_structures"}'
);

-- =====================
-- SKILL: vocabulary (Vocabulary and Word Formation) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000543',
  '33333333-0000-0000-0000-000000000081',
  'mcq', 2, 'fr',
  '{"stem": "Quel est le contraire du mot « possible » en ajoutant un préfixe ?", "choices": ["unpossible", "dispossible", "impossible", "inpossible"], "correct_index": 2, "latex": false}',
  '{"text_fr": "Le préfixe « im- » s''utilise devant les mots commençant par « p », « b » ou « m » pour former le contraire. Possible → impossible.", "steps": ["Pour former le contraire, on ajoute un préfixe négatif", "Devant p, b, m → on utilise im-", "Devant d''autres lettres → un-, in-, dis-, etc.", "possible → impossible"]}',
  '{"anglais","vocabulaire","prefixes","word_formation"}'
),
(
  '44444444-0000-0000-0000-000000000544',
  '33333333-0000-0000-0000-000000000081',
  'mcq', 2, 'fr',
  '{"stem": "Transformez le verbe « educate » en nom en utilisant le suffixe approprié :", "choices": ["educatement", "educater", "education", "educateness"], "correct_index": 2, "latex": false}',
  '{"text_fr": "Le suffixe « -tion » (ou « -ation ») transforme un verbe en nom. Educate → education.", "steps": ["Pour transformer un verbe en nom, on peut utiliser des suffixes comme -tion, -ment, -ness, -er", "Le verbe « educate » se termine par -ate", "Les verbes en -ate forment généralement leur nom avec -ation", "educate → education"]}',
  '{"anglais","vocabulaire","suffixes","word_formation"}'
),
(
  '44444444-0000-0000-0000-000000000545',
  '33333333-0000-0000-0000-000000000081',
  'mcq', 2, 'fr',
  '{"stem": "Complétez avec la bonne collocation : You should ___ attention to the teacher.", "choices": ["give", "do", "pay", "make"], "correct_index": 2, "latex": false}',
  '{"text_fr": "En anglais, la collocation correcte est « pay attention » (faire attention / prêter attention). C''est une expression figée qu''il faut mémoriser.", "steps": ["Une collocation est une combinaison de mots qui vont naturellement ensemble", "On dit « pay attention » et non « give attention » ou « do attention »", "Autres collocations avec pay : pay a visit, pay a compliment, pay respect", "La réponse est pay"]}',
  '{"anglais","vocabulaire","collocations","word_formation"}'
),
(
  '44444444-0000-0000-0000-000000000546',
  '33333333-0000-0000-0000-000000000081',
  'mcq', 3, 'fr',
  '{"stem": "Quel adjectif est formé à partir du nom « beauty » ?", "choices": ["beautyful", "beautious", "beautiful", "beautied"], "correct_index": 2, "latex": false}',
  '{"text_fr": "Pour former un adjectif à partir du nom « beauty », on remplace le « y » par « i » et on ajoute le suffixe « -ful ». Beauty → beautiful.", "steps": ["Le suffixe -ful ajouté à un nom forme un adjectif (= plein de)", "beauty se termine par y précédé d''une consonne (t)", "Règle : on remplace y par i avant d''ajouter le suffixe", "beauty → beauti + ful = beautiful"]}',
  '{"anglais","vocabulaire","suffixes","adjectif","word_formation"}'
),
(
  '44444444-0000-0000-0000-000000000547',
  '33333333-0000-0000-0000-000000000081',
  'numeric', 2, 'fr',
  '{"stem": "Combien de préfixes négatifs différents sont utilisés dans les mots suivants ?\n\nunhappy, impossible, disagree, irregular, non-stop, misunderstand", "correct_value": 6, "tolerance": 0, "latex": false}',
  '{"text_fr": "On identifie 6 préfixes négatifs différents : un- (unhappy), im- (impossible), dis- (disagree), ir- (irregular), non- (non-stop), mis- (misunderstand).", "steps": ["unhappy → préfixe un-", "impossible → préfixe im-", "disagree → préfixe dis-", "irregular → préfixe ir-", "non-stop → préfixe non-", "misunderstand → préfixe mis-", "Total = 6 préfixes négatifs différents"]}',
  '{"anglais","vocabulaire","prefixes","word_formation"}'
),
(
  '44444444-0000-0000-0000-000000000548',
  '33333333-0000-0000-0000-000000000081',
  'true_false', 2, 'fr',
  '{"stem": "Le suffixe « -less » signifie « sans » et le suffixe « -ful » signifie « plein de ». Ainsi, « careless » signifie « sans soin » et « careful » signifie « plein de soin ».", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Le suffixe -less indique l''absence (without) : careless = sans soin, négligent. Le suffixe -ful indique la plénitude (full of) : careful = plein de soin, prudent. Ces deux suffixes sont opposés.", "steps": ["-less = sans, absence → careless = sans soin = négligent", "-ful = plein de → careful = plein de soin = prudent, attentif", "Les deux suffixes sont bien des antonymes", "La définition donnée est correcte → Vrai"]}',
  '{"anglais","vocabulaire","suffixes","word_formation"}'
),
(
  '44444444-0000-0000-0000-000000000549',
  '33333333-0000-0000-0000-000000000081',
  'true_false', 2, 'fr',
  '{"stem": "La collocation correcte en anglais est « make a decision » et non « do a decision ».", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. En anglais, on dit « make a decision » (prendre une décision). Le verbe « do » ne s''utilise pas avec « decision ». C''est une collocation figée à mémoriser.", "steps": ["« Make » et « do » sont souvent confondus par les apprenants", "Make s''utilise pour créer/produire : make a decision, make a mistake, make progress", "Do s''utilise pour les activités/tâches : do homework, do the dishes, do exercise", "La collocation correcte est bien « make a decision » → Vrai"]}',
  '{"anglais","vocabulaire","collocations","word_formation"}'
);
