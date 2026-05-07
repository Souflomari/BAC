-- ============================================================
-- ISLAMIC EDUCATION CONTENT: Valeurs islamiques (3 skills, 21 items)
-- Topic: Valeurs islamiques
-- Skills:
--   social_solidarity       (33333333-...-091) — 7 items
--   tolerance_coexistence   (33333333-...-092) — 7 items
--   ethics_work             (33333333-...-093) — 7 items
-- ============================================================

-- =====================
-- SKILL: social_solidarity (Solidarité et entraide) — 7 items
-- 4 mcq + 1 numeric + 2 true_false
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000613',
  '33333333-0000-0000-0000-000000000091',
  'mcq', 2, 'fr',
  '{"stem": "Quel est le terme arabe désignant la solidarité sociale et la prise en charge mutuelle dans la communauté musulmane ?", "choices": ["At-Takaful al-ijtima''i", "Al-Ijara", "Al-Mudaraba", "Al-Musharaka"], "correct_index": 0, "latex": false}',
  '{"text_fr": "At-Takaful al-ijtima''i (التكافل الاجتماعي) désigne la solidarité sociale en Islam. Ce concept englobe l''ensemble des mécanismes par lesquels la communauté musulmane assure la protection et le soutien de ses membres les plus vulnérables. Il repose sur des institutions telles que la zakat, la sadaqa et le waqf.", "steps": ["At-Takaful signifie garantie mutuelle et prise en charge réciproque.", "Al-Ijara est un contrat de location, al-Mudaraba et al-Musharaka sont des formes de partenariat commercial.", "La solidarité sociale est un devoir collectif (fard kifaya) dans la jurisprudence islamique."]}',
  '{"éducation_islamique","valeurs","solidarité","takaful"}'
),
(
  '44444444-0000-0000-0000-000000000614',
  '33333333-0000-0000-0000-000000000091',
  'mcq', 2, 'fr',
  '{"stem": "La zakat, troisième pilier de l''Islam, est obligatoire pour tout musulman possédant un patrimoine atteignant :", "choices": ["Le nisab (seuil minimum imposable)", "Tout montant, même minime", "Le double du salaire moyen", "Un patrimoine supérieur à mille dinars"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La zakat n''est obligatoire que pour le musulman dont le patrimoine atteint ou dépasse le nisab, c''est-à-dire le seuil minimum fixé par la charia. Ce seuil correspond à la valeur de 85 grammes d''or ou 595 grammes d''argent, détenu pendant une année lunaire complète (hawl). C''est un mécanisme fondamental de redistribution des richesses.", "steps": ["La zakat est le troisième pilier de l''Islam, après la shahada et la prière.", "Le nisab est le seuil minimal de richesse au-delà duquel la zakat devient obligatoire.", "Le taux standard de la zakat sur les biens monétaires est de 2,5 %.", "Le bien doit être détenu pendant un an lunaire (hawl) pour être soumis à la zakat."]}',
  '{"éducation_islamique","valeurs","solidarité","zakat","nisab"}'
),
(
  '44444444-0000-0000-0000-000000000615',
  '33333333-0000-0000-0000-000000000091',
  'mcq', 3, 'fr',
  '{"stem": "Quelle est la différence fondamentale entre la zakat et la sadaqa dans le droit islamique ?", "choices": ["La zakat est obligatoire avec des conditions précises, la sadaqa est volontaire et illimitée", "La sadaqa est obligatoire, la zakat est volontaire", "Les deux sont obligatoires mais à des taux différents", "La zakat concerne uniquement l''argent, la sadaqa concerne uniquement la nourriture"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La zakat est un pilier de l''Islam, obligatoire (fard) pour tout musulman remplissant les conditions de nisab et de hawl, avec des taux et des bénéficiaires définis par le Coran (sourate At-Tawba, verset 60). La sadaqa, en revanche, est un acte de charité volontaire (nafl), sans montant fixe ni conditions préalables, et peut prendre toute forme de bienfaisance.", "steps": ["La zakat est fard (obligatoire) ; la sadaqa est nafl (surérogatoire).", "La zakat a des conditions précises : nisab, hawl, taux fixe de 2,5 % sur les biens monétaires.", "Les huit catégories de bénéficiaires de la zakat sont définies dans le verset 60 de la sourate At-Tawba.", "La sadaqa peut être matérielle ou immatérielle (un sourire est considéré comme une sadaqa selon le hadith)."]}',
  '{"éducation_islamique","valeurs","solidarité","zakat","sadaqa"}'
),
(
  '44444444-0000-0000-0000-000000000616',
  '33333333-0000-0000-0000-000000000091',
  'mcq', 3, 'fr',
  '{"stem": "Le waqf (bien de mainmorte) en Islam désigne :", "choices": ["L''immobilisation d''un bien dont les revenus sont affectés à une œuvre charitable de façon permanente", "Un prêt sans intérêt accordé entre musulmans", "Une forme de testament réservée aux héritiers directs", "Un impôt prélevé sur les récoltes agricoles"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le waqf est une institution islamique par laquelle un bien (immeuble, terrain, fonds) est immobilisé de manière irrévocable et ses revenus sont affectés à une finalité charitable ou d''utilité publique (mosquées, écoles, hôpitaux, fontaines). Le waqf a joué un rôle capital dans le développement social et éducatif des sociétés musulmanes à travers l''histoire.", "steps": ["Le waqf consiste à retirer un bien du commerce et à en consacrer les revenus à une cause pieuse.", "Il est irrévocable : une fois constitué, le bien ne peut être vendu ni hérité.", "Historiquement, les awqaf (pluriel de waqf) ont financé des universités, des hôpitaux et des infrastructures.", "Le waqf se distingue du prêt (qard), du testament (wasiyya) et de l''impôt agricole (''ushr)."]}',
  '{"éducation_islamique","valeurs","solidarité","waqf"}'
),
(
  '44444444-0000-0000-0000-000000000617',
  '33333333-0000-0000-0000-000000000091',
  'numeric', 2, 'fr',
  '{"stem": "Le Coran mentionne dans la sourate At-Tawba (verset 60) le nombre de catégories de bénéficiaires légitimes de la zakat. Combien de catégories sont-elles ?", "correct_value": 8, "tolerance": 0, "unit": ""}',
  '{"text_fr": "Le verset 60 de la sourate At-Tawba énumère huit catégories de bénéficiaires de la zakat : les pauvres (fuqara), les nécessiteux (masakin), les collecteurs de la zakat (''amilin ''alayha), ceux dont les cœurs sont à gagner (mu''allafat qulubuhum), l''affranchissement des esclaves (fi ar-riqab), les endettés (gharimin), dans le sentier d''Allah (fi sabil Allah), et le voyageur en détresse (ibn as-sabil).", "steps": ["1. Al-Fuqara : les pauvres.", "2. Al-Masakin : les nécessiteux.", "3. Al-''Amilin ''alayha : les agents chargés de la collecte.", "4. Al-Mu''allafat qulubuhum : ceux dont les cœurs sont à réconcilier.", "5. Fi ar-Riqab : l''affranchissement des captifs.", "6. Al-Gharimin : les endettés.", "7. Fi Sabil Allah : dans la voie d''Allah.", "8. Ibn as-Sabil : le voyageur en détresse."]}',
  '{"éducation_islamique","valeurs","solidarité","zakat","bénéficiaires"}'
),
(
  '44444444-0000-0000-0000-000000000618',
  '33333333-0000-0000-0000-000000000091',
  'true_false', 2, 'fr',
  '{"statement": "En Islam, l''entraide et la solidarité sont considérées comme un devoir collectif (fard kifaya) qui incombe à l''ensemble de la communauté.", "correct_answer": true}',
  '{"text_fr": "L''entraide et la solidarité sociale constituent effectivement un fard kifaya (devoir collectif) en Islam. Cela signifie que la communauté dans son ensemble est responsable de subvenir aux besoins de ses membres vulnérables. Si un nombre suffisant de personnes s''en acquitte, l''obligation est levée pour les autres ; sinon, tous sont pécheurs. Le Prophète (paix et salut sur lui) a dit : « Les croyants, dans leur amour mutuel et leur miséricorde, sont comme un seul corps. »", "steps": ["Le fard kifaya est une obligation collective : si certains l''accomplissent, les autres en sont dispensés.", "La solidarité est fondée sur le hadith : « Les croyants sont comme un édifice dont les parties se soutiennent mutuellement. »", "L''Islam considère que laisser un membre de la communauté dans le besoin engage la responsabilité de tous."]}',
  '{"éducation_islamique","valeurs","solidarité","fard_kifaya","entraide"}'
),
(
  '44444444-0000-0000-0000-000000000619',
  '33333333-0000-0000-0000-000000000091',
  'true_false', 2, 'fr',
  '{"statement": "La sadaqa en Islam se limite exclusivement aux dons matériels et financiers.", "correct_answer": false}',
  '{"text_fr": "La sadaqa en Islam ne se limite pas aux dons matériels ou financiers. Selon les hadiths du Prophète (paix et salut sur lui), la sadaqa englobe tout acte de bienfaisance : un sourire adressé à autrui, une bonne parole, le fait d''écarter un obstacle du chemin, ou encore l''aide apportée à une personne en difficulté. Le Prophète a dit : « Chaque acte de bonté est une sadaqa » (rapporté par al-Bukhari).", "steps": ["Le hadith « Chaque acte de bonté (ma''ruf) est une sadaqa » élargit la notion bien au-delà du don financier.", "Un sourire, une parole bienveillante, enlever un obstacle du chemin sont des formes de sadaqa.", "La sadaqa peut aussi être immatérielle : enseigner un savoir, conseiller, réconcilier des personnes.", "Cette conception large encourage la bienfaisance quotidienne sous toutes ses formes."]}',
  '{"éducation_islamique","valeurs","solidarité","sadaqa"}'
);

-- =====================
-- SKILL: tolerance_coexistence (Tolérance et coexistence) — 7 items
-- 4 mcq + 1 numeric + 2 true_false
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000620',
  '33333333-0000-0000-0000-000000000092',
  'mcq', 2, 'fr',
  '{"stem": "Quel verset coranique affirme le principe de non-contrainte en matière de religion ?", "choices": ["« Nulle contrainte en religion » (Al-Baqara, 256)", "« Dis : Il est Allah, Unique » (Al-Ikhlas, 1)", "« Lis, au nom de ton Seigneur » (Al-''Alaq, 1)", "« Par le temps, l''homme est en perdition » (Al-''Asr, 1)"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le verset « La ikraha fi ad-din » (لا إكراه في الدين), sourate Al-Baqara, verset 256, est le fondement coranique de la liberté de conscience en Islam. Il établit que la foi ne peut être imposée par la force et que chaque individu est libre dans son choix religieux. Ce verset constitue un pilier de la tolérance religieuse en Islam.", "steps": ["« La ikraha fi ad-din » signifie littéralement : pas de contrainte dans la religion.", "Ce verset se trouve dans la sourate Al-Baqara (La Vache), verset 256.", "Il établit la liberté de croyance comme principe fondamental.", "Les autres versets cités traitent respectivement du monothéisme (Al-Ikhlas), de la révélation (Al-''Alaq) et du temps (Al-''Asr)."]}',
  '{"éducation_islamique","valeurs","tolérance","liberté_religieuse","coran"}'
),
(
  '44444444-0000-0000-0000-000000000621',
  '33333333-0000-0000-0000-000000000092',
  'mcq', 3, 'fr',
  '{"stem": "La Charte de Médine (Sahifat al-Madina), établie par le Prophète Muhammad (paix et salut sur lui), avait pour objectif principal de :", "choices": ["Organiser la coexistence pacifique entre musulmans, juifs et autres tribus de Médine", "Imposer l''Islam à tous les habitants de Médine", "Établir un code commercial pour les marchands", "Définir les règles du pèlerinage à La Mecque"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La Charte de Médine (Sahifat al-Madina), rédigée vers 622 après J.-C., est considérée comme l''un des premiers documents constitutionnels de l''histoire. Elle organisait la coexistence entre les musulmans (Muhajirin et Ansar), les tribus juives et les autres communautés de Médine (Yathrib). Elle reconnaissait à chaque groupe sa liberté religieuse et ses droits, tout en établissant des obligations communes de défense et de justice.", "steps": ["La Charte de Médine a été établie après l''Hégire (622 ap. J.-C.).", "Elle reconnaissait les droits des différentes communautés religieuses de Médine.", "Les juifs de Médine étaient considérés comme une « umma » (communauté) à part entière avec leurs propres lois.", "Elle établissait des obligations mutuelles de défense et interdisait l''agression entre les parties signataires."]}',
  '{"éducation_islamique","valeurs","tolérance","charte_medine","coexistence"}'
),
(
  '44444444-0000-0000-0000-000000000622',
  '33333333-0000-0000-0000-000000000092',
  'mcq', 2, 'fr',
  '{"stem": "Le concept de « Ahl al-Kitab » (Gens du Livre) dans le Coran désigne principalement :", "choices": ["Les juifs et les chrétiens, en tant que communautés ayant reçu des Écritures révélées", "Les musulmans qui mémorisent le Coran", "Les savants musulmans spécialisés en jurisprudence", "Les peuples arabes avant l''Islam"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Ahl al-Kitab (أهل الكتاب) désigne dans le Coran les communautés ayant reçu des Écritures révélées avant l''Islam, principalement les juifs (la Torah) et les chrétiens (l''Évangile). Ce statut leur confère une reconnaissance particulière en droit islamique : droit à la protection (dhimma), liberté de culte, autonomie juridique dans leurs affaires personnelles et religieuses.", "steps": ["Ahl al-Kitab signifie littéralement « les Gens du Livre ».", "Ce terme désigne principalement les juifs et les chrétiens.", "Le Coran reconnaît la Torah et l''Évangile comme des révélations divines antérieures.", "Ce statut implique un respect particulier et des droits spécifiques en terre d''Islam."]}',
  '{"éducation_islamique","valeurs","tolérance","ahl_al_kitab","coexistence"}'
),
(
  '44444444-0000-0000-0000-000000000623',
  '33333333-0000-0000-0000-000000000092',
  'mcq', 3, 'fr',
  '{"stem": "Le verset coranique « Ô hommes ! Nous vous avons créés d''un mâle et d''une femelle, et Nous avons fait de vous des nations et des tribus, pour que vous vous entre-connaissiez » (Al-Hujurat, 13) enseigne que :", "choices": ["La diversité humaine est voulue par Dieu et vise la connaissance mutuelle entre les peuples", "Les tribus doivent rester séparées et ne pas se mélanger", "Seuls les Arabes sont les élus de Dieu", "La supériorité d''une nation se mesure à sa puissance militaire"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Ce verset fondamental de la sourate Al-Hujurat (Les Appartements), verset 13, établit que la diversité des peuples et des nations est une volonté divine dont la finalité est le ta''aruf (la connaissance mutuelle). Le verset poursuit en affirmant que le critère de noblesse devant Dieu n''est ni la race ni la tribu, mais la piété (taqwa). C''est un texte majeur en faveur du dialogue interculturel et interreligieux.", "steps": ["Le verset affirme l''origine commune de l''humanité (un mâle et une femelle).", "La diversité en nations et tribus est présentée comme une volonté divine positive.", "Le ta''aruf (connaissance mutuelle) est la finalité de cette diversité.", "Le critère de supériorité est la taqwa (piété), non l''appartenance ethnique ou tribale."]}',
  '{"éducation_islamique","valeurs","tolérance","diversité","dialogue_interculturel"}'
),
(
  '44444444-0000-0000-0000-000000000624',
  '33333333-0000-0000-0000-000000000092',
  'numeric', 3, 'fr',
  '{"stem": "La sourate Al-Kafirun (Les Mécréants), qui se termine par « À vous votre religion, et à moi ma religion », porte le numéro combien dans l''ordre du Coran ?", "correct_value": 109, "tolerance": 0, "unit": ""}',
  '{"text_fr": "La sourate Al-Kafirun est la 109e sourate du Coran. Elle est composée de 6 versets et a été révélée à La Mecque. Son dernier verset, « Lakum dinukum wa liya din » (À vous votre religion, et à moi ma religion), est un principe fondamental de coexistence religieuse en Islam. Cette sourate établit une distinction claire entre les croyances tout en affirmant le respect mutuel.", "steps": ["Al-Kafirun est la sourate n°109, elle est mecquoise.", "Elle comprend 6 versets affirmant la distinction entre les religions.", "Le verset final « Lakum dinukum wa liya din » pose le principe de la liberté religieuse.", "Cette sourate est souvent citée comme fondement du pluralisme religieux en Islam."]}',
  '{"éducation_islamique","valeurs","tolérance","sourate_kafirun","coexistence"}'
),
(
  '44444444-0000-0000-0000-000000000625',
  '33333333-0000-0000-0000-000000000092',
  'true_false', 2, 'fr',
  '{"statement": "La Charte de Médine garantissait aux communautés juives de Médine la liberté de pratiquer leur religion et de gérer leurs propres affaires internes.", "correct_answer": true}',
  '{"text_fr": "La Charte de Médine reconnaissait explicitement aux communautés juives (Banu Qaynuqa, Banu Nadir, Banu Qurayza) le droit de pratiquer librement leur religion et de gérer leurs propres affaires judiciaires et communautaires selon leurs lois. Le document stipulait que « les juifs ont leur religion et les musulmans ont la leur ». C''est un exemple historique majeur de coexistence interreligieuse organisée.", "steps": ["La Charte accordait aux juifs le statut de communauté (umma) reconnue.", "Chaque communauté religieuse conservait son autonomie juridique et cultuelle.", "Le texte énonçait des droits et des devoirs mutuels, notamment en matière de défense commune.", "Ce modèle de coexistence a influencé la notion de dhimma dans le droit islamique ultérieur."]}',
  '{"éducation_islamique","valeurs","tolérance","charte_medine","liberté_religieuse"}'
),
(
  '44444444-0000-0000-0000-000000000626',
  '33333333-0000-0000-0000-000000000092',
  'true_false', 2, 'fr',
  '{"statement": "Selon le Coran, le dialogue et la discussion avec les Gens du Livre (Ahl al-Kitab) doivent se faire de la meilleure manière (bi-llati hiya ahsan).", "correct_answer": true}',
  '{"text_fr": "Le verset 46 de la sourate Al-''Ankabut (L''Araignée) ordonne : « Et ne discutez que de la meilleure façon avec les Gens du Livre, sauf ceux d''entre eux qui sont injustes. Et dites : Nous croyons en ce qu''on a fait descendre vers nous et descendre vers vous, tandis que notre Dieu et votre Dieu est le même. » Ce verset établit l''éthique du dialogue interreligieux en Islam : respect, courtoisie et recherche de points communs.", "steps": ["Le Coran prescrit la manière la plus belle (ahsan) pour dialoguer avec les Gens du Livre.", "Le verset souligne la croyance commune en un Dieu unique comme base du dialogue.", "L''expression « bi-llati hiya ahsan » implique sagesse, douceur et argumentation rationnelle.", "Ce principe fonde l''éthique du dialogue interreligieux dans la tradition islamique."]}',
  '{"éducation_islamique","valeurs","tolérance","dialogue_interreligieux","ahl_al_kitab"}'
);

-- =====================
-- SKILL: ethics_work (Éthique du travail) — 7 items
-- 4 mcq + 1 numeric + 2 true_false
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000627',
  '33333333-0000-0000-0000-000000000093',
  'mcq', 2, 'fr',
  '{"stem": "Le concept d''« itqan » (الإتقان) dans l''éthique islamique du travail signifie :", "choices": ["L''excellence et la perfection dans l''accomplissement du travail", "L''accumulation rapide de richesses", "La délégation du travail à autrui", "Le travail effectué uniquement pour le salaire"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Al-Itqan (الإتقان) désigne l''excellence, la maîtrise et la perfection dans l''accomplissement de toute tâche. Le Prophète Muhammad (paix et salut sur lui) a dit : « Allah aime que lorsque l''un d''entre vous accomplit un travail, il le fasse avec itqan (excellence) » (rapporté par al-Bayhaqi). Ce concept élève le travail bien fait au rang d''acte d''adoration et fait de la qualité une exigence spirituelle.", "steps": ["Itqan signifie littéralement perfection, maîtrise, excellence.", "Le hadith du Prophète lie l''amour d''Allah à l''excellence dans le travail.", "L''itqan transforme le travail profane en acte d''adoration (''ibada).", "Ce concept s''applique à tous les domaines : artisanat, études, services, agriculture, etc."]}',
  '{"éducation_islamique","valeurs","éthique_travail","itqan","excellence"}'
),
(
  '44444444-0000-0000-0000-000000000628',
  '33333333-0000-0000-0000-000000000093',
  'mcq', 2, 'fr',
  '{"stem": "Dans le commerce islamique, la pratique du « ghish » (la tromperie et la fraude) est :", "choices": ["Strictement interdite (haram) selon le Coran et la Sunna", "Permise si elle ne cause pas de préjudice majeur", "Tolérée dans les transactions internationales", "Autorisée entre commerçants expérimentés"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le ghish (الغش), c''est-à-dire la tromperie, la fraude et la falsification dans le commerce, est strictement interdit (haram) en Islam. Le Prophète (paix et salut sur lui) a dit : « Celui qui nous trompe n''est pas des nôtres » (rapporté par Muslim). L''Islam exige la transparence (bayân), l''honnêteté (sidq) et la loyauté (amana) dans toutes les transactions commerciales.", "steps": ["Le hadith « Man ghashana fa laysa minna » (Celui qui nous trompe n''est pas des nôtres) est catégorique.", "Le ghish inclut : cacher les défauts d''une marchandise, falsifier les poids et mesures, mentir sur la qualité.", "Le Coran condamne les fraudeurs dans la sourate Al-Mutaffifin (Les Fraudeurs, sourate 83).", "L''honnêteté commerciale est une obligation religieuse, pas simplement une recommandation morale."]}',
  '{"éducation_islamique","valeurs","éthique_travail","honnêteté","commerce"}'
),
(
  '44444444-0000-0000-0000-000000000629',
  '33333333-0000-0000-0000-000000000093',
  'mcq', 3, 'fr',
  '{"stem": "Le Coran condamne sévèrement la corruption (rishwa) et la décrit comme :", "choices": ["Un acte illicite qui dévore injustement les biens d''autrui", "Un mal mineur pardonné par le repentir seul", "Une pratique acceptable en cas de nécessité", "Un sujet non abordé dans le texte coranique"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le Coran interdit explicitement la corruption dans le verset 188 de la sourate Al-Baqara : « Et ne dévorez pas mutuellement vos biens de manière illicite, et n''usez pas de ces biens pour corrompre les juges afin de dévorer une partie des biens des gens, injustement et en connaissance de cause. » Le Prophète (paix et salut sur lui) a maudit le corrupteur (ar-rashi), le corrompu (al-murtashi) et l''intermédiaire (ar-ra''ish).", "steps": ["Le verset 188 de la sourate Al-Baqara interdit de dévorer les biens d''autrui par des moyens illicites.", "Le hadith maudit les trois parties de la corruption : celui qui donne, celui qui reçoit et l''intermédiaire.", "La corruption est considérée comme un grand péché (kabira) en jurisprudence islamique.", "Elle est interdite sans aucune exception, même en cas de prétendue nécessité."]}',
  '{"éducation_islamique","valeurs","éthique_travail","corruption","rishwa"}'
),
(
  '44444444-0000-0000-0000-000000000630',
  '33333333-0000-0000-0000-000000000093',
  'mcq', 2, 'fr',
  '{"stem": "Selon un hadith célèbre, le Prophète Muhammad (paix et salut sur lui) a déclaré que le meilleur gain est celui obtenu par :", "choices": ["Le travail de ses propres mains", "L''héritage familial", "Le commerce maritime", "Les dons des gouvernants"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le Prophète (paix et salut sur lui) a dit : « Nul n''a jamais mangé meilleure nourriture que celle acquise par le travail de ses mains. Le prophète David (Daoud) mangeait du fruit de son propre labeur » (rapporté par al-Bukhari). Ce hadith valorise le travail manuel et l''effort personnel comme les sources de revenus les plus nobles. L''Islam rejette la mendicité pour celui qui est capable de travailler et encourage l''autonomie économique.", "steps": ["Le hadith établit que le travail des mains est la meilleure source de subsistance.", "Le prophète David (Daoud) est cité comme exemple de travailleur manuel (forgeron selon la tradition).", "L''Islam décourage la mendicité pour les personnes aptes au travail.", "Ce hadith fonde la dignité du travail et le rejet de l''oisiveté dans l''éthique islamique."]}',
  '{"éducation_islamique","valeurs","éthique_travail","travail_manuel","hadith"}'
),
(
  '44444444-0000-0000-0000-000000000631',
  '33333333-0000-0000-0000-000000000093',
  'numeric', 2, 'fr',
  '{"stem": "La sourate Al-Mutaffifin (Les Fraudeurs), qui met en garde contre la fraude dans les poids et mesures, porte quel numéro dans l''ordre du Coran ?", "correct_value": 83, "tolerance": 0, "unit": ""}',
  '{"text_fr": "La sourate Al-Mutaffifin (المطففين) est la 83e sourate du Coran. Elle comprend 36 versets et a été révélée à La Mecque. Son nom signifie « Les Fraudeurs » et elle s''ouvre par une menace sévère : « Malheur aux fraudeurs (mutaffifin) qui, lorsqu''ils mesurent pour eux-mêmes, exigent la pleine mesure, et qui, lorsqu''ils mesurent ou pèsent pour les autres, leur causent perte. » C''est un texte fondamental sur l''éthique commerciale en Islam.", "steps": ["Al-Mutaffifin est la sourate n°83, composée de 36 versets.", "Le terme mutaffifin désigne ceux qui fraudent dans les poids et les mesures.", "Les premiers versets menacent d''un châtiment sévère les commerçants malhonnêtes.", "Cette sourate établit un lien direct entre l''honnêteté commerciale et la foi."]}',
  '{"éducation_islamique","valeurs","éthique_travail","sourate_mutaffifin","fraude"}'
),
(
  '44444444-0000-0000-0000-000000000632',
  '33333333-0000-0000-0000-000000000093',
  'true_false', 2, 'fr',
  '{"statement": "En Islam, le travail licite (halal) est considéré comme une forme d''adoration (''ibada) lorsqu''il est accompli avec une intention sincère (niyya).", "correct_answer": true}',
  '{"text_fr": "En Islam, tout travail licite accompli avec une intention sincère (niyya) de plaire à Allah, de subvenir aux besoins de sa famille et de servir la communauté est considéré comme un acte d''adoration (''ibada). Le Prophète (paix et salut sur lui) a dit : « Celui qui sort travailler pour subvenir aux besoins de ses enfants est dans le sentier d''Allah » (rapporté par at-Tabarani). Cette vision élève le travail quotidien au rang d''acte spirituel.", "steps": ["La niyya (intention) est le critère qui transforme un acte profane en acte d''adoration.", "Travailler pour nourrir sa famille est assimilé au jihad dans le sentier d''Allah selon le hadith.", "Le hadith « Les actions ne valent que par les intentions » (al-Bukhari) s''applique aussi au travail.", "L''Islam ne sépare pas la vie professionnelle de la vie spirituelle."]}',
  '{"éducation_islamique","valeurs","éthique_travail","ibada","niyya"}'
),
(
  '44444444-0000-0000-0000-000000000633',
  '33333333-0000-0000-0000-000000000093',
  'true_false', 3, 'fr',
  '{"statement": "L''Islam autorise l''employeur à retarder le paiement du salaire de l''ouvrier aussi longtemps qu''il le souhaite, tant que le salaire finit par être versé.", "correct_answer": false}',
  '{"text_fr": "L''Islam interdit catégoriquement le retard injustifié dans le paiement des salaires. Le Prophète (paix et salut sur lui) a dit : « Donnez à l''ouvrier son salaire avant que sa sueur ne sèche » (rapporté par Ibn Majah). De plus, dans un hadith qudsi, Allah déclare qu''Il sera l''adversaire au Jour du Jugement de trois catégories de personnes, dont « celui qui a employé un ouvrier, a bénéficié de son travail, et ne lui a pas donné son salaire ». Le paiement rapide et intégral est donc une obligation religieuse.", "steps": ["Le hadith ordonne de payer l''ouvrier avant que sa sueur ne sèche, soulignant l''urgence du paiement.", "Retarder le salaire sans raison valable est un péché majeur en Islam.", "Le hadith qudsi place celui qui ne paie pas le salaire parmi les adversaires d''Allah au Jour du Jugement.", "Les droits des travailleurs sont sacrés et leur violation est assimilée à une forme d''injustice (zulm)."]}',
  '{"éducation_islamique","valeurs","éthique_travail","salaire","droits_ouvrier"}'
);
