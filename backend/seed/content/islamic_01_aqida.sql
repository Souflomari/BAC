-- ============================================================
-- ISLAMIC EDUCATION CONTENT: Croyance (Al-Aqida) (2 skills, 14 items)
-- Skills:
--   faith_pillars      (33333333-...-087) difficulty 2 — 7 items
--   divine_attributes  (33333333-...-088) difficulty 2 — 7 items
-- ============================================================

-- =====================
-- SKILL: faith_pillars (Les piliers de la foi) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000585',
  '33333333-0000-0000-0000-000000000087',
  'mcq', 2, 'fr',
  '{"stem": "Combien de piliers de la foi (Arkan Al-Iman) sont mentionnés dans le hadith de Jibril ?", "choices": ["Six", "Cinq", "Sept", "Quatre"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le célèbre hadith de Jibril (rapporté par Muslim) énumère six piliers de la foi : croire en Allah, en Ses anges, en Ses livres, en Ses messagers, au Jour dernier et au destin (bon ou mauvais).", "steps": ["1. La croyance en Allah (Al-Iman billah)", "2. La croyance aux anges (Al-Mala''ika)", "3. La croyance aux livres révélés (Al-Kutub)", "4. La croyance aux prophètes et messagers (Ar-Rusul)", "5. La croyance au Jour dernier (Al-Yawm Al-Akhir)", "6. La croyance au destin, bon ou mauvais (Al-Qadar)"]}',
  '{"éducation_islamique","aqida","foi"}'
),
(
  '44444444-0000-0000-0000-000000000586',
  '33333333-0000-0000-0000-000000000087',
  'mcq', 2, 'fr',
  '{"stem": "Quel argument les savants musulmans utilisent-ils pour prouver l''existence de Dieu à partir de la création de l''univers ?", "choices": ["L''argument cosmologique (dalil al-huduth)", "L''argument ontologique", "L''argument pragmatique", "L''argument historique"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''argument cosmologique (dalil al-huduth) repose sur le principe que tout ce qui commence à exister a une cause. L''univers ayant un commencement, il nécessite un Créateur. Cet argument est mentionné dans le Coran : « Ont-ils été créés à partir de rien ou sont-ils eux-mêmes les créateurs ? » (At-Tur, 35).", "steps": ["Tout ce qui commence à exister a nécessairement une cause", "L''univers a un commencement (la science confirme le Big Bang)", "L''univers ne peut pas se créer lui-même ni exister par hasard", "Donc il existe un Créateur nécessaire : Allah"]}',
  '{"éducation_islamique","aqida","preuves_existence"}'
),
(
  '44444444-0000-0000-0000-000000000587',
  '33333333-0000-0000-0000-000000000087',
  'mcq', 2, 'fr',
  '{"stem": "L''argument téléologique (dalil al-''inaya) prouve l''existence de Dieu par :", "choices": ["L''ordre et la finalité observés dans la création", "La transmission orale des textes sacrés", "Le consensus des savants", "L''analyse linguistique du Coran"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''argument téléologique se fonde sur l''ordre, l''harmonie et la finalité présents dans l''univers. Le Coran invite à méditer sur la création des cieux, de la terre, l''alternance du jour et de la nuit comme signes d''un Créateur Sage.", "steps": ["La nature présente un ordre remarquable (orbites des planètes, cycles biologiques)", "Cet ordre ne peut résulter du hasard car il est constant et harmonieux", "Le Coran dit : « Dans la création des cieux et de la terre... il y a des signes pour les doués d''intelligence » (Al-Imran, 190)", "La finalité dans la création témoigne d''un Créateur Omniscient"]}',
  '{"éducation_islamique","aqida","preuves_existence"}'
),
(
  '44444444-0000-0000-0000-000000000588',
  '33333333-0000-0000-0000-000000000087',
  'mcq', 3, 'fr',
  '{"stem": "Parmi les livres révélés mentionnés dans le Coran, lequel a été révélé au prophète Dawud (David) ?", "choices": ["Az-Zabur (les Psaumes)", "At-Tawrat (la Torah)", "Al-Injil (l''Évangile)", "As-Suhuf (les Feuillets)"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le Coran mentionne plusieurs livres révélés : la Torah (Tawrat) révélée à Moussa, les Psaumes (Zabur) révélés à Dawud, l''Évangile (Injil) révélé à ''Issa, et le Coran révélé à Muhammad (paix sur eux tous).", "steps": ["At-Tawrat (Torah) a été révélée au prophète Moussa (Moïse)", "Az-Zabur (Psaumes) a été révélé au prophète Dawud (David)", "Al-Injil (Évangile) a été révélé au prophète ''Issa (Jésus)", "Le Coran a été révélé au prophète Muhammad (paix et salut sur lui)"]}',
  '{"éducation_islamique","aqida","livres_reveles"}'
),
(
  '44444444-0000-0000-0000-000000000589',
  '33333333-0000-0000-0000-000000000087',
  'numeric', 2, 'fr',
  '{"stem": "Combien de piliers de la foi (Arkan Al-Iman) le musulman doit-il obligatoirement croire selon le hadith de Jibril ?", "correct_value": 6, "tolerance": 0, "latex": false}',
  '{"text_fr": "Les piliers de la foi sont au nombre de six. Ils sont énoncés dans le hadith de Jibril : croire en Allah, en Ses anges, en Ses livres, en Ses messagers, au Jour dernier et au destin.", "steps": ["Le hadith de Jibril est la référence fondamentale pour les piliers de la foi", "Les 6 piliers : Allah, les anges, les livres, les messagers, le Jour dernier, le destin", "Nier un seul de ces piliers invalide la foi du musulman", "Ces piliers concernent la croyance intérieure (al-iman), distincte des piliers de l''islam (al-islam) qui sont au nombre de 5"]}',
  '{"éducation_islamique","aqida","foi"}'
),
(
  '44444444-0000-0000-0000-000000000590',
  '33333333-0000-0000-0000-000000000087',
  'true_false', 2, 'fr',
  '{"stem": "La croyance au destin (Al-Qadar) signifie que l''être humain n''a aucune responsabilité dans ses actes puisque tout est prédéterminé par Allah.", "correct_answer": false, "latex": false}',
  '{"text_fr": "La croyance au destin ne supprime pas la responsabilité humaine. En Islam, l''homme dispose du libre arbitre (al-ikhtiyar) et il est responsable de ses choix. Allah connaît d''avance les actes de Ses créatures sans les y contraindre. C''est la position médiane (wasatiyya) entre le fatalisme (jabriyya) et la négation du destin (qadariyya).", "steps": ["Al-Qadar signifie qu''Allah a la science de toute chose avant sa réalisation", "L''homme possède une volonté et un libre arbitre (ikhtiyar)", "Il sera jugé au Jour dernier sur ses choix", "La position correcte est l''équilibre entre destin divin et responsabilité humaine"]}',
  '{"éducation_islamique","aqida","destin"}'
),
(
  '44444444-0000-0000-0000-000000000591',
  '33333333-0000-0000-0000-000000000087',
  'true_false', 2, 'fr',
  '{"stem": "Selon la croyance islamique, les anges (al-mala''ika) sont des créatures faites de lumière (nur), dépourvues de libre arbitre, qui obéissent en permanence aux ordres d''Allah.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Les anges sont des créatures créées de lumière, qui ne désobéissent jamais à Allah et exécutent Ses ordres sans faillir. Contrairement aux humains et aux djinns, ils n''ont pas de libre arbitre pour choisir entre le bien et le mal.", "steps": ["Les anges sont créés de lumière (nur), les djinns de feu, les humains d''argile", "Ils ne mangent pas, ne boivent pas et ne se reproduisent pas", "Ils accomplissent des missions précises : Jibril (révélation), Mika''il (subsistance), Israfil (le Souffle), etc.", "Ils glorifient Allah sans interruption et ne Lui désobéissent jamais"]}',
  '{"éducation_islamique","aqida","anges"}'
);

-- =====================
-- SKILL: divine_attributes (Les attributs divins) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000592',
  '33333333-0000-0000-0000-000000000088',
  'mcq', 2, 'fr',
  '{"stem": "Quel attribut divin (Sifa) signifie qu''Allah existe par Lui-même, sans commencement ni fin ?", "choices": ["Al-Wujud (l''Existence)", "Al-Qudra (la Puissance)", "Al-''Ilm (la Science)", "Al-Irada (la Volonté)"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Al-Wujud (l''Existence) est l''attribut qui affirme qu''Allah existe nécessairement par Lui-même (wajib al-wujud). Son existence est éternelle, sans début ni fin, et ne dépend d''aucune cause extérieure. C''est le fondement de tous les autres attributs.", "steps": ["Al-Wujud signifie que l''existence d''Allah est nécessaire et non contingente", "Allah est Éternel sans commencement (Al-Azali) et sans fin (Al-Abadi)", "Son existence ne dépend d''aucune cause, contrairement aux créatures", "Cet attribut est la base sur laquelle reposent tous les autres attributs divins"]}',
  '{"éducation_islamique","aqida","attributs_divins"}'
),
(
  '44444444-0000-0000-0000-000000000593',
  '33333333-0000-0000-0000-000000000088',
  'mcq', 2, 'fr',
  '{"stem": "Quelle est la différence fondamentale entre les attributs d''essence (sifat adh-dhat) et les attributs d''action (sifat al-fi''l) en théologie islamique ?", "choices": ["Les attributs d''essence sont éternels et intrinsèques, les attributs d''action se manifestent selon la volonté divine", "Les attributs d''essence sont plus importants que les attributs d''action", "Les attributs d''action sont mentionnés dans le Coran, les attributs d''essence dans la Sunna uniquement", "Les attributs d''essence concernent la création, les attributs d''action concernent la guidance"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Les attributs d''essence (sifat adh-dhat) comme la vie, la science et la puissance sont éternels et inséparables de l''Être divin. Les attributs d''action (sifat al-fi''l) comme la création, la subsistance et le pardon se manifestent quand Allah le veut, sans que cela implique un changement dans Son essence.", "steps": ["Attributs d''essence (sifat adh-dhat) : éternels, ne se séparent jamais de l''essence divine", "Exemples : la Vie (Al-Hayat), la Science (Al-''Ilm), la Puissance (Al-Qudra)", "Attributs d''action (sifat al-fi''l) : liés à la volonté divine, se manifestent dans le temps", "Exemples : la Création (Al-Khalq), la Subsistance (Ar-Rizq), le Pardon (Al-Maghfira)"]}',
  '{"éducation_islamique","aqida","attributs_divins"}'
),
(
  '44444444-0000-0000-0000-000000000594',
  '33333333-0000-0000-0000-000000000088',
  'mcq', 3, 'fr',
  '{"stem": "L''attribut divin Al-Wahdaniyya (l''Unicité) implique qu''Allah est unique :", "choices": ["Dans Son essence, Ses attributs et Ses actes", "Uniquement dans Son essence", "Dans Ses actes seulement", "Dans Son essence et Ses attributs, mais pas dans Ses actes"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Al-Wahdaniyya (l''Unicité) est un attribut fondamental qui signifie qu''Allah est Un dans trois dimensions : Son essence (dhat), Ses attributs (sifat) et Ses actes (af''al). Aucune créature ne Lui ressemble, ne partage Ses attributs de perfection ni ne peut accomplir des actes semblables aux Siens.", "steps": ["Unicité de l''essence : Allah n''est pas composé de parties et n''a pas de semblable", "Unicité des attributs : Ses attributs sont parfaits et absolus, sans ressemblance avec ceux des créatures", "Unicité des actes : Lui seul crée, donne la vie, fait mourir, sustente, etc.", "Le verset : « Il n''y a rien qui Lui ressemble » (Ash-Shura, 11) résume ce concept"]}',
  '{"éducation_islamique","aqida","tawhid"}'
),
(
  '44444444-0000-0000-0000-000000000595',
  '33333333-0000-0000-0000-000000000088',
  'mcq', 2, 'fr',
  '{"stem": "Parmi les attributs divins suivants, lequel désigne la science absolue d''Allah qui englobe toute chose ?", "choices": ["Al-''Ilm (la Science)", "Al-Basar (la Vue)", "As-Sam'' (l''Ouïe)", "Al-Kalam (la Parole)"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Al-''Ilm (la Science) est l''attribut par lequel Allah connaît toute chose : le passé, le présent, le futur, le visible et l''invisible. Sa science est éternelle, absolue et ne s''acquiert pas par apprentissage. Le Coran dit : « Il connaît ce qui est devant eux et ce qui est derrière eux, alors qu''eux-mêmes ne Le cernent pas de leur science » (Ta-Ha, 110).", "steps": ["Al-''Ilm est un attribut d''essence, éternel et absolu", "La science d''Allah englobe le visible (ash-shahada) et l''invisible (al-ghayb)", "Elle ne s''acquiert pas par les sens ni par l''apprentissage", "« Et Il est de toute chose Omniscient » (Al-Baqara, 29)"]}',
  '{"éducation_islamique","aqida","attributs_divins"}'
),
(
  '44444444-0000-0000-0000-000000000596',
  '33333333-0000-0000-0000-000000000088',
  'numeric', 2, 'fr',
  '{"stem": "Selon la classification théologique classique (Ash''arite), combien d''attributs divins d''essence (sifat adh-dhat) sont généralement étudiés dans le programme du Bac marocain ? (Comptez : l''existence, l''unicité, la puissance, la science, la volonté, la vie, l''ouïe, la vue, la parole, l''éternité sans début, la pérennité, la dissemblance avec les créatures, l''autosuffisance)", "correct_value": 13, "tolerance": 0, "latex": false}',
  '{"text_fr": "Les théologiens ash''arites classifient 13 attributs divins d''essence (sifat adh-dhat) fondamentaux : Al-Wujud (existence), Al-Qidam (éternité sans début), Al-Baqa'' (pérennité), Al-Mukhalafa lil-hawadith (dissemblance), Al-Qiyam bi-nafsih (autosuffisance), Al-Wahdaniyya (unicité), Al-Qudra (puissance), Al-Irada (volonté), Al-''Ilm (science), Al-Hayat (vie), As-Sam'' (ouïe), Al-Basar (vue), Al-Kalam (parole).", "steps": ["5 attributs négatifs (salbiyya) : existence, éternité, pérennité, dissemblance, autosuffisance", "1 attribut d''essence pure : l''unicité", "7 attributs affirmatifs (ma''anawiyya) : puissance, volonté, science, vie, ouïe, vue, parole", "Total : 5 + 1 + 7 = 13 attributs d''essence"]}',
  '{"éducation_islamique","aqida","attributs_divins"}'
),
(
  '44444444-0000-0000-0000-000000000597',
  '33333333-0000-0000-0000-000000000088',
  'true_false', 2, 'fr',
  '{"stem": "L''attribut Al-Kalam (la Parole) signifie que la parole d''Allah est créée et limitée dans le temps, tout comme la parole des êtres humains.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Selon la théologie islamique, la parole d''Allah (Al-Kalam) est un attribut éternel, incréé, qui ne ressemble pas à la parole des créatures. Le Coran est la parole d''Allah, mais l''attribut de la parole divine est éternel et n''est ni composé de sons ni de lettres au sens humain. Allah parle comme il convient à Sa majesté.", "steps": ["Al-Kalam est un attribut d''essence, donc éternel et non créé", "La parole d''Allah ne ressemble pas à celle des créatures (ni sons ni lettres au sens humain)", "Le Coran est la parole d''Allah révélée, manifestation de cet attribut éternel", "Dire que la parole d''Allah est créée est une position rejetée par les théologiens sunnites (Ahl as-Sunna)"]}',
  '{"éducation_islamique","aqida","attributs_divins"}'
),
(
  '44444444-0000-0000-0000-000000000598',
  '33333333-0000-0000-0000-000000000088',
  'true_false', 3, 'fr',
  '{"stem": "L''attribut Al-Qudra (la Puissance) d''Allah est absolu et illimité : Allah est capable de toute chose possible, et Sa puissance ne diminue pas par la création.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Al-Qudra (la Puissance) est un attribut éternel par lequel Allah réalise tout ce qui est possible (mumkin). Sa puissance est absolue, ne connaît ni fatigue ni diminution. Le Coran dit : « Allah est certes capable de toute chose » (Al-Baqara, 20). La création de l''univers entier ne diminue en rien Sa puissance infinie.", "steps": ["Al-Qudra est un attribut d''essence, éternel et absolu", "Allah est capable de réaliser tout ce qui est possible (mumkin)", "Sa puissance ne connaît ni fatigue ni diminution : « Et la création des cieux et de la terre est certes plus grande que la création des gens » (Ghafir, 57)", "Cet attribut est lié à Al-Irada (la Volonté) : ce qu''Allah veut, Il le réalise par Sa puissance"]}',
  '{"éducation_islamique","aqida","attributs_divins"}'
);
