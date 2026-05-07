-- ============================================================
-- DROIT CONTENT: Droit civil (3 skills, 21 items)
-- Skills:
--   contracts          (33333333-...-118) difficulty 2 — 7 items
--   obligations        (33333333-...-119) difficulty 2 — 7 items
--   liability          (33333333-...-120) difficulty 2 — 7 items
-- ============================================================

-- =====================
-- SKILL: contracts (Les contrats) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000802',
  '33333333-0000-0000-0000-000000000118',
  'mcq', 2, 'fr',
  '{"stem": "Quelles sont les quatre conditions de validite d''un contrat selon le Dahir des Obligations et Contrats (DOC) ?", "choices": ["Le consentement, la capacite, l''objet et la cause", "La forme ecrite, l''enregistrement, la publicite et le paiement", "L''offre, l''acceptation, la livraison et le prix", "La signature, les temoins, la date et le lieu"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le DOC exige quatre conditions essentielles pour la validite d''un contrat : le consentement des parties (libre et eclaire), la capacite juridique (aptitude a contracter), un objet certain et licite, et une cause licite. L''absence de l''une de ces conditions entraine la nullite du contrat.", "steps": ["Le consentement : accord de volonte libre et eclaire des parties", "La capacite : aptitude juridique a contracter (majorite, absence d''incapacite)", "L''objet : prestation determinee ou determinable et licite", "La cause : motif licite et moral de l''engagement"]}',
  '{"droit","civil","contrats"}'
),
(
  '44444444-0000-0000-0000-000000000803',
  '33333333-0000-0000-0000-000000000118',
  'mcq', 2, 'fr',
  '{"stem": "Parmi les vices du consentement, lequel consiste en des manoeuvres frauduleuses destinees a tromper l''autre partie pour l''amener a contracter ?", "choices": ["Le dol", "L''erreur", "La violence", "La lesion"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le dol est un vice du consentement qui consiste en des manoeuvres frauduleuses (mensonges, ruses, dissimulations) employees par une partie pour induire l''autre en erreur et la determiner a conclure le contrat. Le dol rend le contrat annulable car le consentement n''a pas ete donne librement.", "steps": ["Le dol implique des manoeuvres intentionnelles et frauduleuses", "Ces manoeuvres visent a tromper l''autre partie", "Le dol doit etre determinant : sans lui, la victime n''aurait pas contracte", "Le contrat entache de dol est annulable (nullite relative)"]}',
  '{"droit","civil","contrats","vices_consentement"}'
),
(
  '44444444-0000-0000-0000-000000000804',
  '33333333-0000-0000-0000-000000000118',
  'mcq', 2, 'fr',
  '{"stem": "Quelle est la difference entre la nullite absolue et la nullite relative d''un contrat ?", "choices": ["La nullite absolue sanctionne la violation d''une regle d''interet general, la nullite relative protege un interet prive", "La nullite absolue est prononcee par le juge, la nullite relative est automatique", "La nullite absolue concerne les contrats ecrits, la nullite relative les contrats oraux", "La nullite absolue est prescriptible, la nullite relative est imprescriptible"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La nullite absolue sanctionne la violation d''une regle d''ordre public ou d''interet general (objet illicite, cause immorale). Elle peut etre invoquee par toute personne ayant un interet. La nullite relative protege un interet prive (vice du consentement, incapacite). Seule la personne protegee peut l''invoquer, et le contrat peut etre confirme.", "steps": ["Nullite absolue : violation d''une regle d''interet general (objet ou cause illicite)", "Elle peut etre invoquee par toute personne interessee", "Nullite relative : protection d''un interet prive (vice du consentement, incapacite)", "Seule la partie protegee peut l''invoquer, et elle est susceptible de confirmation"]}',
  '{"droit","civil","contrats","nullite"}'
),
(
  '44444444-0000-0000-0000-000000000805',
  '33333333-0000-0000-0000-000000000118',
  'mcq', 2, 'fr',
  '{"stem": "Quel est le principal effet du contrat entre les parties selon le principe de la force obligatoire ?", "choices": ["Le contrat tient lieu de loi entre les parties qui l''ont conclu", "Le contrat peut etre modifie unilateralement par l''une des parties", "Le contrat produit des effets a l''egard des tiers", "Le contrat est toujours revocable par simple notification"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le principe de la force obligatoire du contrat signifie que le contrat legalement forme s''impose aux parties avec la meme force qu''une loi. Les parties sont tenues d''executer leurs obligations de bonne foi. Aucune partie ne peut modifier ou revoquer unilateralement le contrat sans le consentement de l''autre.", "steps": ["Le contrat legalement forme a force de loi entre les parties", "Les parties doivent executer leurs obligations de bonne foi", "Ni le juge ni une partie ne peut modifier unilateralement le contrat", "Ce principe est consacre par le DOC"]}',
  '{"droit","civil","contrats","force_obligatoire"}'
),
(
  '44444444-0000-0000-0000-000000000806',
  '33333333-0000-0000-0000-000000000118',
  'numeric', 2, 'fr',
  '{"stem": "Selon le DOC marocain, a partir de quel age une personne acquiert-elle la pleine capacite juridique pour contracter ?", "correct_value": 18, "tolerance": 0, "unit": "ans"}',
  '{"text_fr": "Au Maroc, la pleine capacite civile est fixee a 18 ans gregoriens revolus (article 209 du Code de la famille). A partir de cet age, la personne peut conclure des contrats et accomplir tous les actes juridiques de maniere autonome, sauf incapacite particuliere.", "steps": ["La majorite civile au Maroc est fixee a 18 ans gregoriens revolus", "Avant cet age, le mineur est sous la tutelle de son representant legal", "Le mineur de moins de 18 ans n''a pas la pleine capacite de contracter"]}',
  '{"droit","civil","contrats","capacite"}'
),
(
  '44444444-0000-0000-0000-000000000807',
  '33333333-0000-0000-0000-000000000118',
  'true_false', 2, 'fr',
  '{"statement": "L''erreur sur la personne du cocontractant est toujours un vice du consentement entrainant la nullite du contrat.", "correct_answer": false}',
  '{"text_fr": "L''erreur sur la personne n''est un vice du consentement que dans les contrats conclus intuitu personae, c''est-a-dire ceux dans lesquels la consideration de la personne du cocontractant est determinante (ex. : contrat de travail, donation). Dans les contrats ou l''identite des parties est indifferente (ex. : vente courante), l''erreur sur la personne ne constitue pas un vice du consentement.", "steps": ["L''erreur sur la personne n''est pertinente que dans les contrats intuitu personae", "Un contrat intuitu personae est conclu en consideration de la personne", "Dans les contrats courants, l''identite du cocontractant est indifferente"]}',
  '{"droit","civil","contrats","vices_consentement","erreur"}'
),
(
  '44444444-0000-0000-0000-000000000808',
  '33333333-0000-0000-0000-000000000118',
  'true_false', 2, 'fr',
  '{"statement": "La violence morale exercee sur une partie pour la contraindre a signer un contrat constitue un vice du consentement.", "correct_answer": true}',
  '{"text_fr": "La violence, qu''elle soit physique ou morale, constitue un vice du consentement lorsqu''elle est de nature a impressionner une personne raisonnable et a lui inspirer la crainte d''un mal considerable. La violence morale (menaces, pressions psychologiques, chantage) vicie le consentement tout autant que la violence physique.", "steps": ["La violence est un vice du consentement reconnu par le DOC", "Elle peut etre physique (coups, sequestration) ou morale (menaces, chantage)", "Elle doit etre determinante : sans elle, la partie n''aurait pas contracte", "Le contrat conclu sous violence est annulable (nullite relative)"]}',
  '{"droit","civil","contrats","vices_consentement","violence"}'
);

-- =====================
-- SKILL: obligations (Les obligations) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000809',
  '33333333-0000-0000-0000-000000000119',
  'mcq', 2, 'fr',
  '{"stem": "Quelles sont les principales sources des obligations selon le droit civil marocain ?", "choices": ["Le contrat, le delit, le quasi-contrat et la loi", "Uniquement le contrat et la loi", "Le contrat, la coutume et la jurisprudence", "La convention collective, le reglement et la constitution"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le droit civil marocain reconnait quatre sources principales des obligations : le contrat (accord de volontes), le delit et le quasi-delit (fait illicite intentionnel ou non), le quasi-contrat (enrichissement sans cause, gestion d''affaires, paiement de l''indu) et la loi (obligations imposees directement par le legislateur).", "steps": ["Le contrat : accord de volontes creant des obligations reciproques", "Le delit / quasi-delit : fait dommageable intentionnel ou par negligence", "Le quasi-contrat : fait volontaire licite creant des obligations (ex. : enrichissement sans cause)", "La loi : obligations imposees independamment de la volonte des parties"]}',
  '{"droit","civil","obligations","sources"}'
),
(
  '44444444-0000-0000-0000-000000000810',
  '33333333-0000-0000-0000-000000000119',
  'mcq', 2, 'fr',
  '{"stem": "Qu''est-ce que l''enrichissement sans cause en droit civil ?", "choices": ["Un avantage patrimonial obtenu sans justification juridique au detriment d''autrui", "Un benefice realise grace a un contrat valablement conclu", "Un heritage recu d''un parent sans testament", "Une donation faite sans condition particuliere"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''enrichissement sans cause est un quasi-contrat par lequel une personne s''enrichit au detriment d''une autre sans qu''il existe une justification juridique (contrat, loi, jugement). La personne appauvrie dispose d''une action (action de in rem verso) pour obtenir restitution dans la limite du moindre des deux montants : l''enrichissement ou l''appauvrissement.", "steps": ["L''enrichissement sans cause suppose un enrichissement d''une partie", "Il y a un appauvrissement correlatif de l''autre partie", "Il n''existe aucune cause juridique justifiant ce transfert de valeur", "L''action de in rem verso permet la restitution"]}',
  '{"droit","civil","obligations","quasi_contrat"}'
),
(
  '44444444-0000-0000-0000-000000000811',
  '33333333-0000-0000-0000-000000000119',
  'mcq', 2, 'fr',
  '{"stem": "En droit civil marocain, que signifie l''obligation de moyens ?", "choices": ["Le debiteur s''engage a mettre en oeuvre tous les moyens necessaires sans garantir le resultat", "Le debiteur garantit l''obtention d''un resultat precis", "Le debiteur est libere de toute responsabilite en cas d''echec", "Le debiteur doit fournir des moyens financiers a son creancier"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''obligation de moyens impose au debiteur de deployer tous les efforts raisonnables pour atteindre le resultat souhaite, sans toutefois le garantir. En cas d''inexecution, le creancier doit prouver la faute du debiteur (ex. : obligation du medecin de soigner son patient). Elle s''oppose a l''obligation de resultat ou le debiteur garantit un resultat precis.", "steps": ["Obligation de moyens : le debiteur doit faire de son mieux", "Le resultat n''est pas garanti", "La charge de la preuve de la faute pese sur le creancier", "Exemple classique : l''obligation du medecin envers son patient"]}',
  '{"droit","civil","obligations","moyens_resultat"}'
),
(
  '44444444-0000-0000-0000-000000000812',
  '33333333-0000-0000-0000-000000000119',
  'mcq', 2, 'fr',
  '{"stem": "Qu''est-ce que la gestion d''affaires en tant que quasi-contrat ?", "choices": ["Le fait de gerer volontairement les affaires d''autrui sans en avoir recu mandat", "La conclusion d''un contrat pour le compte d''un tiers avec son autorisation", "L''administration d''une societe par ses dirigeants", "La gestion d''un fonds de commerce par un locataire-gerant"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La gestion d''affaires est un quasi-contrat par lequel une personne (le gerant) intervient spontanement et sans mandat pour gerer les affaires d''une autre personne (le maitre de l''affaire), dans l''interet de celle-ci. Le gerant doit agir en bon pere de famille, et le maitre de l''affaire doit rembourser les depenses utiles engagees par le gerant.", "steps": ["Le gerant intervient volontairement et sans mandat", "Il agit dans l''interet du maitre de l''affaire", "Le gerant doit agir avec diligence (en bon pere de famille)", "Le maitre de l''affaire doit rembourser les depenses utiles"]}',
  '{"droit","civil","obligations","quasi_contrat","gestion_affaires"}'
),
(
  '44444444-0000-0000-0000-000000000813',
  '33333333-0000-0000-0000-000000000119',
  'numeric', 2, 'fr',
  '{"stem": "En droit civil marocain, quel est le delai de prescription de droit commun (en annees) pour les actions personnelles et mobilieres ?", "correct_value": 15, "tolerance": 0, "unit": "ans"}',
  '{"text_fr": "Le delai de prescription de droit commun en droit civil marocain est de 15 ans pour les actions personnelles et mobilieres (article 387 du DOC). Passe ce delai, le creancier ne peut plus agir en justice pour faire valoir son droit. Certaines actions ont des delais plus courts (ex. : 1 an pour les actions en responsabilite delictuelle).", "steps": ["Le delai de prescription de droit commun est de 15 ans (art. 387 DOC)", "Ce delai s''applique aux actions personnelles et mobilieres", "La prescription eteint l''action en justice, pas le droit lui-meme", "Certaines actions speciales ont des delais plus courts"]}',
  '{"droit","civil","obligations","prescription"}'
),
(
  '44444444-0000-0000-0000-000000000814',
  '33333333-0000-0000-0000-000000000119',
  'true_false', 2, 'fr',
  '{"statement": "Le paiement de l''indu oblige celui qui a recu un paiement non du a le restituer.", "correct_answer": true}',
  '{"text_fr": "Le paiement de l''indu est un quasi-contrat. Lorsqu''une personne paie par erreur une somme qu''elle ne doit pas (ou qu''elle paie a une personne qui n''est pas son creancier), elle a le droit d''en obtenir la restitution. Celui qui a recu le paiement indu est tenu de le restituer, car il constituerait sinon un enrichissement sans cause.", "steps": ["Le paiement de l''indu suppose un paiement effectue par erreur", "La dette n''existait pas ou le paiement a ete fait au mauvais destinataire", "Le beneficiaire du paiement indu doit restituer la somme recue", "C''est un quasi-contrat reconnu par le DOC"]}',
  '{"droit","civil","obligations","quasi_contrat","paiement_indu"}'
),
(
  '44444444-0000-0000-0000-000000000815',
  '33333333-0000-0000-0000-000000000119',
  'true_false', 2, 'fr',
  '{"statement": "Dans une obligation de resultat, le debiteur peut s''exonerer de sa responsabilite simplement en prouvant qu''il a fait de son mieux.", "correct_answer": false}',
  '{"text_fr": "Dans une obligation de resultat, le debiteur s''engage a atteindre un resultat precis et determine. S''il n''obtient pas ce resultat, sa responsabilite est presumee. Il ne peut s''exonerer qu''en prouvant un cas de force majeure, un cas fortuit ou la faute du creancier. Prouver qu''il a fait de son mieux ne suffit pas, contrairement a l''obligation de moyens.", "steps": ["L''obligation de resultat implique la garantie d''un resultat precis", "En cas d''inexecution, la responsabilite du debiteur est presumee", "Le debiteur ne peut s''exonerer que par la force majeure ou la faute du creancier", "Prouver sa diligence ne suffit pas (c''est le regime de l''obligation de moyens)"]}',
  '{"droit","civil","obligations","moyens_resultat"}'
);

-- =====================
-- SKILL: liability (La responsabilite civile) — 7 items
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000816',
  '33333333-0000-0000-0000-000000000120',
  'mcq', 2, 'fr',
  '{"stem": "Quelles sont les trois conditions necessaires pour engager la responsabilite civile d''une personne ?", "choices": ["Un fait generateur, un dommage et un lien de causalite", "Une faute intentionnelle, un prejudice moral et un contrat", "Un jugement, une condamnation et une indemnisation", "Une plainte, une enquete et un proces"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La responsabilite civile, qu''elle soit contractuelle ou delictuelle, exige la reunion de trois conditions cumulatives : un fait generateur (faute, fait d''autrui ou fait d''une chose), un dommage (prejudice subi par la victime) et un lien de causalite (le fait generateur doit etre la cause directe du dommage).", "steps": ["Le fait generateur : faute personnelle, fait d''autrui ou fait d''une chose", "Le dommage : prejudice certain, direct et personnel subi par la victime", "Le lien de causalite : relation directe entre le fait generateur et le dommage", "Ces trois conditions sont cumulatives et indispensables"]}',
  '{"droit","civil","responsabilite","conditions"}'
),
(
  '44444444-0000-0000-0000-000000000817',
  '33333333-0000-0000-0000-000000000120',
  'mcq', 2, 'fr',
  '{"stem": "Quel article du DOC marocain consacre le principe general de la responsabilite delictuelle pour faute ?", "choices": ["L''article 77", "L''article 1", "L''article 230", "L''article 345"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''article 77 du DOC pose le principe general de la responsabilite delictuelle : tout fait quelconque de l''homme qui cause un dommage a autrui oblige celui par la faute duquel il est arrive a le reparer. L''article 78 complete cette disposition en incluant la negligence et l''imprudence. Ces deux articles constituent le fondement de la responsabilite civile delictuelle au Maroc.", "steps": ["L''article 77 du DOC etablit la responsabilite pour faute intentionnelle", "L''article 78 etend la responsabilite a la negligence et l''imprudence", "La victime doit prouver la faute, le dommage et le lien de causalite", "L''auteur du dommage est tenu de le reparer integralement"]}',
  '{"droit","civil","responsabilite","delictuelle","doc"}'
),
(
  '44444444-0000-0000-0000-000000000818',
  '33333333-0000-0000-0000-000000000120',
  'mcq', 2, 'fr',
  '{"stem": "En matiere de responsabilite du fait d''autrui, dans quel cas les parents sont-ils responsables des dommages causes par leur enfant mineur ?", "choices": ["Lorsque l''enfant mineur habite avec eux et est sous leur autorite", "Uniquement lorsque les parents ont commis une faute de surveillance prouvee", "Seulement si l''enfant a agi avec une intention de nuire", "Uniquement si l''enfant a plus de 16 ans"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La responsabilite des parents du fait de leur enfant mineur est engagee lorsque l''enfant habite avec eux et se trouve sous leur autorite. C''est une responsabilite de plein droit : il n''est pas necessaire de prouver une faute de surveillance des parents. Les parents ne peuvent s''exonerer qu''en prouvant qu''ils n''ont pu empecher le fait dommageable (force majeure ou faute de la victime).", "steps": ["Les parents sont responsables des dommages causes par leur enfant mineur", "L''enfant doit habiter avec eux et etre sous leur autorite", "C''est une responsabilite de plein droit (pas besoin de prouver une faute parentale)", "L''exoneration est possible par la force majeure ou la faute de la victime"]}',
  '{"droit","civil","responsabilite","fait_autrui"}'
),
(
  '44444444-0000-0000-0000-000000000819',
  '33333333-0000-0000-0000-000000000120',
  'mcq', 2, 'fr',
  '{"stem": "En quoi la responsabilite contractuelle se distingue-t-elle de la responsabilite delictuelle ?", "choices": ["La responsabilite contractuelle sanctionne l''inexecution d''un contrat, la responsabilite delictuelle repare un dommage hors contrat", "La responsabilite contractuelle ne donne droit qu''a des dommages moraux", "La responsabilite delictuelle necessite toujours un contrat prealable", "La responsabilite contractuelle est toujours une responsabilite sans faute"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La responsabilite contractuelle est engagee lorsqu''une partie n''execute pas ses obligations issues d''un contrat valable. La responsabilite delictuelle intervient en dehors de tout lien contractuel, lorsqu''une personne cause un dommage a autrui par son fait, sa negligence ou son imprudence (art. 77-78 DOC). Le regime de preuve et les regles d''indemnisation different.", "steps": ["Responsabilite contractuelle : inexecution d''une obligation nee d''un contrat", "Responsabilite delictuelle : dommage cause en dehors de tout contrat", "Le fondement est different : le contrat vs le fait illicite", "Le regime de preuve et les regles de reparation varient"]}',
  '{"droit","civil","responsabilite","contractuelle","delictuelle"}'
),
(
  '44444444-0000-0000-0000-000000000820',
  '33333333-0000-0000-0000-000000000120',
  'numeric', 2, 'fr',
  '{"stem": "Quel est le numero de l''article du DOC marocain qui etend la responsabilite delictuelle aux dommages causes par negligence ou imprudence ?", "correct_value": 78, "tolerance": 0, "unit": ""}',
  '{"text_fr": "L''article 78 du DOC complete l''article 77 en etendant la responsabilite delictuelle aux cas de negligence et d''imprudence. Alors que l''article 77 vise les fautes intentionnelles, l''article 78 couvre les fautes non intentionnelles : la personne qui, par sa negligence ou son imprudence, cause un dommage a autrui est tenue de le reparer.", "steps": ["L''article 77 du DOC couvre la faute intentionnelle", "L''article 78 du DOC etend la responsabilite a la negligence et l''imprudence", "Les deux articles forment ensemble le fondement de la responsabilite delictuelle", "La victime doit prouver la faute (meme non intentionnelle), le dommage et le lien de causalite"]}',
  '{"droit","civil","responsabilite","delictuelle","doc"}'
),
(
  '44444444-0000-0000-0000-000000000821',
  '33333333-0000-0000-0000-000000000120',
  'true_false', 2, 'fr',
  '{"statement": "La responsabilite du fait des choses impose au gardien de la chose de prouver l''absence de faute pour s''exonerer de sa responsabilite.", "correct_answer": false}',
  '{"text_fr": "La responsabilite du fait des choses est une responsabilite objective (sans faute). Le gardien de la chose (celui qui en a l''usage, la direction et le controle) est presume responsable lorsque la chose cause un dommage. Pour s''exonerer, il ne lui suffit pas de prouver l''absence de faute : il doit demontrer un cas de force majeure, la faute de la victime ou le fait d''un tiers.", "steps": ["La responsabilite du fait des choses est une responsabilite objective", "Le gardien est presume responsable du dommage cause par sa chose", "L''absence de faute ne suffit pas a s''exonerer", "L''exoneration exige la preuve de la force majeure, la faute de la victime ou le fait d''un tiers"]}',
  '{"droit","civil","responsabilite","fait_des_choses"}'
),
(
  '44444444-0000-0000-0000-000000000822',
  '33333333-0000-0000-0000-000000000120',
  'true_false', 2, 'fr',
  '{"statement": "Le lien de causalite entre le fait generateur et le dommage est une condition indispensable pour engager la responsabilite civile.", "correct_answer": true}',
  '{"text_fr": "Le lien de causalite est la troisieme condition indispensable de la responsabilite civile, avec le fait generateur et le dommage. Il faut etablir que le dommage est la consequence directe du fait generateur. Sans ce lien, meme en presence d''une faute et d''un prejudice, la responsabilite ne peut etre engagee. La victime doit prouver ce lien de causalite.", "steps": ["Le lien de causalite relie le fait generateur au dommage subi", "Le dommage doit etre la consequence directe et certaine du fait generateur", "Sans lien de causalite, la responsabilite civile ne peut etre retenue", "La charge de la preuve du lien de causalite pese sur la victime"]}',
  '{"droit","civil","responsabilite","causalite"}'
);
