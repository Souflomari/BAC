-- ============================================================
-- ENGLISH CONTENT: Writing Skills (3 skills, 21 items)
-- Skills:
--   letter_email     (33333333-...-084) difficulty 2 — 7 items
--   essay_en         (33333333-...-085) difficulty 3 — 7 items
--   functions_lang   (33333333-...-086) difficulty 2 — 7 items
-- Items: 44444444-0000-0000-0000-000000000564 → ...584
-- ============================================================

-- =====================
-- SKILL: letter_email (Letter and Email Writing) — 7 items
-- Covers: lettre formelle vs informelle, format email (objet, salutation,
--         corps, formule de politesse), registre de langue, conventions
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
-- 564: lettre formelle vs informelle — mcq
(
  '44444444-0000-0000-0000-000000000564',
  '33333333-0000-0000-0000-000000000084',
  'mcq', 2, 'fr',
  '{"stem": "Quelle formule de politesse est appropriée pour clore une lettre formelle en anglais ?", "choices": ["Yours faithfully,", "See you soon!", "Take care,", "Cheers,"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Dans une lettre formelle en anglais, on utilise « Yours faithfully, » lorsque le destinataire n''est pas nommé (Dear Sir/Madam), ou « Yours sincerely, » lorsqu''il est nommé. Les autres options sont informelles.", "steps": ["« Yours faithfully, » est utilisé quand on ne connaît pas le nom du destinataire", "« Yours sincerely, » est utilisé quand on connaît le nom", "Les formules « See you soon! », « Take care, » et « Cheers, » sont réservées aux lettres informelles"]}',
  '{"anglais","writing","letter","formel"}'
),
-- 565: registre formel — mcq
(
  '44444444-0000-0000-0000-000000000565',
  '33333333-0000-0000-0000-000000000084',
  'mcq', 2, 'fr',
  '{"stem": "Laquelle de ces phrases appartient au registre formel en anglais ?", "choices": ["I am writing to inquire about the position advertised.", "Hey, just wanted to ask about that job.", "What''s up? I saw your ad.", "Gonna apply for that thing you posted."], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le registre formel se caractérise par des phrases complètes, un vocabulaire soutenu et l''absence de contractions ou d''argot. « I am writing to inquire about... » est la seule formulation respectant ces critères.", "steps": ["Le registre formel utilise des verbes non contractés (I am et non I''m)", "Le vocabulaire est soutenu : « inquire » au lieu de « ask »", "Les expressions familières comme « Hey », « What''s up », « Gonna » sont exclues du registre formel"]}',
  '{"anglais","writing","letter","registre"}'
),
-- 566: format email — mcq
(
  '44444444-0000-0000-0000-000000000566',
  '33333333-0000-0000-0000-000000000084',
  'mcq', 2, 'fr',
  '{"stem": "Dans un email formel en anglais, quel élément doit figurer obligatoirement dans la ligne « Subject » ?", "choices": ["Un résumé clair et concis de l''objet du message", "Le nom complet de l''expéditeur", "La date d''envoi du message", "La formule de politesse"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La ligne « Subject » (objet) d''un email doit contenir un résumé bref et précis du contenu du message. Elle permet au destinataire d''identifier rapidement le sujet avant même d''ouvrir l''email.", "steps": ["La ligne Subject résume le contenu du message en quelques mots", "Elle doit être claire et concise pour faciliter la lecture", "Le nom de l''expéditeur figure dans le champ « From », la date est automatique, et la formule de politesse se trouve dans le corps du message"]}',
  '{"anglais","writing","email","format"}'
),
-- 567: salutation formelle — mcq
(
  '44444444-0000-0000-0000-000000000567',
  '33333333-0000-0000-0000-000000000084',
  'mcq', 3, 'fr',
  '{"stem": "Vous écrivez une lettre de réclamation à une entreprise dont vous ne connaissez pas le nom du responsable. Quelle salutation utilisez-vous ?", "choices": ["Dear Sir or Madam,", "Dear Mr. Smith,", "Hi there,", "To my friend,"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Quand on ne connaît pas le nom du destinataire dans une lettre formelle, on utilise « Dear Sir or Madam, ». « Dear Mr. Smith, » nécessite de connaître le nom. Les autres formules sont informelles.", "steps": ["Destinataire inconnu → Dear Sir or Madam,", "Cette formule est toujours suivie de la clôture « Yours faithfully, »", "« Hi there, » et « To my friend, » sont inappropriés dans un contexte formel"]}',
  '{"anglais","writing","letter","salutation"}'
),
-- 568: nombre de parties d''un email formel — numeric
(
  '44444444-0000-0000-0000-000000000568',
  '33333333-0000-0000-0000-000000000084',
  'numeric', 2, 'fr',
  '{"stem": "Un email formel en anglais comporte généralement cinq parties principales : subject line, greeting, body, closing et signature. Combien de ces parties sont obligatoires dans un email formel bien structuré ?", "correct_value": 5, "tolerance": 0, "latex": false}',
  '{"text_fr": "Les cinq parties sont toutes obligatoires dans un email formel bien structuré : la ligne d''objet (subject line), la salutation (greeting), le corps du message (body), la formule de clôture (closing) et la signature.", "steps": ["1. Subject line : indique l''objet du message", "2. Greeting : salutation formelle (Dear...)", "3. Body : contenu principal du message", "4. Closing : formule de politesse finale (Yours sincerely, / Yours faithfully,)", "5. Signature : nom et coordonnées de l''expéditeur"]}',
  '{"anglais","writing","email","structure"}'
),
-- 569: lettre informelle — true_false
(
  '44444444-0000-0000-0000-000000000569',
  '33333333-0000-0000-0000-000000000084',
  'true_false', 2, 'fr',
  '{"stem": "Dans une lettre informelle en anglais, il est acceptable d''utiliser des contractions comme « I''m », « don''t » et « won''t ».", "correct_answer": true, "latex": false}',
  '{"text_fr": "Les contractions sont caractéristiques du registre informel. Dans une lettre à un ami ou un proche, leur utilisation est non seulement acceptable mais naturelle et attendue.", "steps": ["Le registre informel autorise les contractions : I''m, don''t, won''t, can''t...", "Ces contractions rendent le ton plus amical et détendu", "En revanche, dans une lettre formelle, on écrit les formes complètes : I am, do not, will not"]}',
  '{"anglais","writing","letter","informel"}'
),
-- 570: formule de clôture — true_false
(
  '44444444-0000-0000-0000-000000000570',
  '33333333-0000-0000-0000-000000000084',
  'true_false', 2, 'fr',
  '{"stem": "Dans une lettre formelle en anglais commençant par « Dear Mr. Johnson, », la formule de clôture appropriée est « Yours faithfully, ».", "correct_answer": false, "latex": false}',
  '{"text_fr": "Quand la lettre commence par le nom du destinataire (Dear Mr. Johnson,), on utilise « Yours sincerely, ». La formule « Yours faithfully, » est réservée aux lettres commençant par « Dear Sir or Madam, » (destinataire inconnu).", "steps": ["Règle : Dear + nom → Yours sincerely,", "Règle : Dear Sir or Madam → Yours faithfully,", "Moyen mnémotechnique : S et S vont ensemble (Sir/Sincerely ne vont PAS ensemble, c''est l''inverse : nom connu = Sincerely)"]}',
  '{"anglais","writing","letter","cloture"}'
);

-- =====================
-- SKILL: essay_en (Essay Writing) — 7 items
-- Covers: structure de l''essai (introduction, développement, conclusion),
--         essai d''opinion, essai argumentatif, mots de liaison, transitions
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
-- 571: structure de l''essai — mcq
(
  '44444444-0000-0000-0000-000000000571',
  '33333333-0000-0000-0000-000000000085',
  'mcq', 3, 'fr',
  '{"stem": "Quel est l''ordre correct des parties d''un essai argumentatif en anglais ?", "choices": ["Introduction → Body paragraphs → Conclusion", "Conclusion → Body paragraphs → Introduction", "Body paragraphs → Introduction → Conclusion", "Introduction → Conclusion → Body paragraphs"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Un essai argumentatif suit toujours la structure classique : Introduction (présentation du sujet et thèse), Body paragraphs (développement des arguments avec exemples) et Conclusion (synthèse et ouverture).", "steps": ["1. Introduction : accroche, contexte et énoncé de la thèse (thesis statement)", "2. Body paragraphs : chaque paragraphe développe un argument avec des preuves et exemples", "3. Conclusion : reformulation de la thèse, synthèse des arguments et ouverture"]}',
  '{"anglais","writing","essay","structure"}'
),
-- 572: thesis statement — mcq
(
  '44444444-0000-0000-0000-000000000572',
  '33333333-0000-0000-0000-000000000085',
  'mcq', 3, 'fr',
  '{"stem": "Où se place généralement le « thesis statement » dans un essai en anglais ?", "choices": ["À la fin de l''introduction", "Au début de la conclusion", "Au milieu du premier body paragraph", "Dans le titre de l''essai"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le thesis statement (énoncé de la thèse) se place traditionnellement à la fin du paragraphe d''introduction. Il annonce clairement la position de l''auteur et oriente la lecture de l''ensemble de l''essai.", "steps": ["Le thesis statement est la phrase clé de l''essai", "Il se situe à la fin de l''introduction, après l''accroche et le contexte", "Il énonce clairement l''opinion ou l''argument principal que l''essai va défendre"]}',
  '{"anglais","writing","essay","thesis"}'
),
-- 573: mots de liaison — mcq
(
  '44444444-0000-0000-0000-000000000573',
  '33333333-0000-0000-0000-000000000085',
  'mcq', 2, 'fr',
  '{"stem": "Quel mot de liaison exprime une opposition ou une concession dans un essai en anglais ?", "choices": ["However", "Furthermore", "Therefore", "In addition"], "correct_index": 0, "latex": false}',
  '{"text_fr": "« However » exprime une opposition ou une concession (cependant, toutefois). Les autres connecteurs expriment l''ajout (Furthermore, In addition) ou la conséquence (Therefore).", "steps": ["However = cependant, toutefois → opposition / concession", "Furthermore = de plus → ajout", "Therefore = par conséquent → conséquence", "In addition = en outre → ajout"]}',
  '{"anglais","writing","essay","linking_words"}'
),
-- 574: essai d''opinion — mcq
(
  '44444444-0000-0000-0000-000000000574',
  '33333333-0000-0000-0000-000000000085',
  'mcq', 3, 'fr',
  '{"stem": "Dans un essai d''opinion (opinion essay), quelle expression est la plus appropriée pour introduire son point de vue ?", "choices": ["In my opinion,", "It is a scientific fact that", "Everyone knows that", "As the statistics prove,"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Dans un essai d''opinion, on introduit son point de vue avec des expressions personnelles comme « In my opinion, », « I believe that », « From my point of view ». Les autres options présentent l''idée comme un fait objectif, ce qui n''est pas le but d''un opinion essay.", "steps": ["Un opinion essay exprime un avis personnel, pas un fait scientifique", "Expressions appropriées : In my opinion, I believe, I think, From my perspective", "Éviter les formulations qui présentent l''opinion comme une vérité universelle (Everyone knows, It is a fact)"]}',
  '{"anglais","writing","essay","opinion"}'
),
-- 575: nombre de body paragraphs — numeric
(
  '44444444-0000-0000-0000-000000000575',
  '33333333-0000-0000-0000-000000000085',
  'numeric', 2, 'fr',
  '{"stem": "Un essai standard au Bac comporte une introduction, une conclusion et généralement deux à trois paragraphes de développement (body paragraphs). Quel est le nombre minimum de body paragraphs recommandé pour un essai argumentatif équilibré ?", "correct_value": 2, "tolerance": 0, "latex": false}',
  '{"text_fr": "Un essai argumentatif équilibré comporte au minimum 2 body paragraphs : un pour présenter les arguments en faveur de la thèse et un pour les contre-arguments ou un deuxième argument. Trois paragraphes sont souvent préférés pour un développement plus complet.", "steps": ["Minimum recommandé : 2 body paragraphs", "Paragraphe 1 : premier argument ou arguments « pour »", "Paragraphe 2 : deuxième argument ou arguments « contre »", "Un troisième paragraphe peut être ajouté pour nuancer ou approfondir"]}',
  '{"anglais","writing","essay","structure"}'
),
-- 576: introduction d''essai — true_false
(
  '44444444-0000-0000-0000-000000000576',
  '33333333-0000-0000-0000-000000000085',
  'true_false', 3, 'fr',
  '{"stem": "Dans l''introduction d''un essai argumentatif en anglais, il est recommandé de présenter tous ses arguments en détail.", "correct_answer": false, "latex": false}',
  '{"text_fr": "L''introduction ne doit pas détailler les arguments. Elle sert à présenter le sujet (accroche + contexte) et à énoncer la thèse (thesis statement). Le développement détaillé des arguments se fait dans les body paragraphs.", "steps": ["L''introduction comporte : accroche, contexte et thesis statement", "Les arguments détaillés appartiennent aux body paragraphs", "Donner tous les arguments dans l''introduction rendrait le développement répétitif et inutile"]}',
  '{"anglais","writing","essay","introduction"}'
),
-- 577: conclusion d''essai — true_false
(
  '44444444-0000-0000-0000-000000000577',
  '33333333-0000-0000-0000-000000000085',
  'true_false', 3, 'fr',
  '{"stem": "La conclusion d''un essai en anglais peut introduire de nouveaux arguments qui n''ont pas été mentionnés dans le développement.", "correct_answer": false, "latex": false}',
  '{"text_fr": "La conclusion ne doit jamais introduire de nouveaux arguments. Elle sert à reformuler la thèse, résumer les points principaux et éventuellement ouvrir sur une réflexion plus large. Tout nouvel argument doit figurer dans les body paragraphs.", "steps": ["La conclusion reformule la thèse avec des mots différents", "Elle résume brièvement les arguments principaux du développement", "Elle peut proposer une ouverture (question, perspective future)", "Introduire de nouveaux arguments dans la conclusion est une erreur méthodologique"]}',
  '{"anglais","writing","essay","conclusion"}'
);

-- =====================
-- SKILL: functions_lang (Language Functions) — 7 items
-- Covers: exprimer l''accord, le désaccord, la suggestion, le conseil,
--         l''opinion, l''excuse, la demande, la plainte
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
-- 578: exprimer l''accord — mcq
(
  '44444444-0000-0000-0000-000000000578',
  '33333333-0000-0000-0000-000000000086',
  'mcq', 2, 'fr',
  '{"stem": "Quelle expression est utilisée pour exprimer l''accord (agreeing) en anglais ?", "choices": ["I totally agree with you.", "I''m afraid I disagree.", "You should think about it.", "I''m sorry to hear that."], "correct_index": 0, "latex": false}',
  '{"text_fr": "« I totally agree with you. » exprime l''accord total. Les autres expressions expriment le désaccord (I''m afraid I disagree), le conseil (You should think about it) et la sympathie (I''m sorry to hear that).", "steps": ["Accord : I agree, I totally agree, That''s exactly what I think, You''re absolutely right", "Désaccord : I disagree, I''m afraid I disagree, I don''t think so", "Conseil : You should..., You ought to..., If I were you...", "Sympathie : I''m sorry to hear that..."]}',
  '{"anglais","writing","functions","agreeing"}'
),
-- 579: exprimer le désaccord — mcq
(
  '44444444-0000-0000-0000-000000000579',
  '33333333-0000-0000-0000-000000000086',
  'mcq', 2, 'fr',
  '{"stem": "Laquelle de ces expressions permet d''exprimer un désaccord poli (polite disagreement) en anglais ?", "choices": ["I see your point, but I think differently.", "You are completely wrong!", "That''s the worst idea ever.", "I don''t care what you think."], "correct_index": 0, "latex": false}',
  '{"text_fr": "« I see your point, but I think differently. » est une façon polie d''exprimer son désaccord : on reconnaît d''abord le point de vue de l''autre avant de présenter le sien. Les autres options sont impolies ou agressives.", "steps": ["Désaccord poli : I see your point, but... / I respect your opinion, however... / I''m afraid I have to disagree", "On commence par reconnaître le point de vue de l''autre", "Puis on introduit son propre avis avec « but », « however » ou « nevertheless »", "Éviter les formulations agressives comme « You are wrong! »"]}',
  '{"anglais","writing","functions","disagreeing"}'
),
-- 580: suggestion — mcq
(
  '44444444-0000-0000-0000-000000000580',
  '33333333-0000-0000-0000-000000000086',
  'mcq', 2, 'fr',
  '{"stem": "Quelle expression est utilisée pour faire une suggestion en anglais ?", "choices": ["Why don''t we go to the cinema?", "You must go to the cinema.", "I insist that you go to the cinema.", "Go to the cinema right now!"], "correct_index": 0, "latex": false}',
  '{"text_fr": "« Why don''t we... ? » est une structure classique pour faire une suggestion en anglais. Les autres options expriment une obligation (must), une insistance (I insist) ou un ordre (impératif).", "steps": ["Suggestion : Why don''t we...? / How about...? / What about...? / Let''s... / Shall we...?", "Obligation : You must... / You have to...", "Insistance : I insist that...", "Ordre : impératif (Go!)"]}',
  '{"anglais","writing","functions","suggesting"}'
),
-- 581: conseil — mcq
(
  '44444444-0000-0000-0000-000000000581',
  '33333333-0000-0000-0000-000000000086',
  'mcq', 3, 'fr',
  '{"stem": "Votre ami a des difficultés scolaires. Quelle expression utilisez-vous pour lui donner un conseil en anglais ?", "choices": ["If I were you, I would study more regularly.", "You are obliged to study more.", "I demand that you study.", "It''s none of my business."], "correct_index": 0, "latex": false}',
  '{"text_fr": "« If I were you, I would... » est la structure la plus courante pour donner un conseil en anglais. Elle utilise le conditionnel et le subjonctif pour adoucir le ton. Les autres options expriment une obligation, une exigence ou un refus de s''impliquer.", "steps": ["Conseil : If I were you, I would... / You should... / You ought to... / You had better...", "« If I were you » utilise le subjonctif (were et non was) même avec « I »", "Cette structure est plus polie qu''un simple « You should »", "Obligation : You are obliged to... / You must... → ce n''est pas un conseil"]}',
  '{"anglais","writing","functions","advising"}'
),
-- 582: nombre de fonctions langagières — numeric
(
  '44444444-0000-0000-0000-000000000582',
  '33333333-0000-0000-0000-000000000086',
  'numeric', 2, 'fr',
  '{"stem": "Parmi les fonctions langagières suivantes : agreeing, disagreeing, suggesting, advising, apologizing, requesting — combien expriment une interaction où le locuteur demande quelque chose à son interlocuteur (demande, suggestion ou conseil) ?", "correct_value": 3, "tolerance": 0, "latex": false}',
  '{"text_fr": "Trois fonctions impliquent que le locuteur demande ou propose quelque chose à l''interlocuteur : suggesting (faire une suggestion), advising (donner un conseil) et requesting (faire une demande). Agreeing et disagreeing expriment une réaction, et apologizing exprime un regret.", "steps": ["Suggesting : on propose une action → interaction directive", "Advising : on recommande une action → interaction directive", "Requesting : on demande quelque chose → interaction directive", "Agreeing / Disagreeing : on réagit à une idée → interaction réactive", "Apologizing : on exprime un regret → interaction expressive"]}',
  '{"anglais","writing","functions","classification"}'
),
-- 583: s''excuser — true_false
(
  '44444444-0000-0000-0000-000000000583',
  '33333333-0000-0000-0000-000000000086',
  'true_false', 2, 'fr',
  '{"stem": "L''expression « I apologize for the inconvenience » est une façon formelle de s''excuser en anglais.", "correct_answer": true, "latex": false}',
  '{"text_fr": "« I apologize for the inconvenience » est effectivement une formule d''excuse formelle en anglais. Le verbe « apologize » est plus soutenu que « sorry ». Cette expression est couramment utilisée dans les lettres officielles, les emails professionnels et les situations formelles.", "steps": ["« I apologize for... » est une formule formelle d''excuse", "Le verbe « apologize » est plus soutenu que « be sorry »", "Registre formel : I apologize for... / Please accept my apologies for...", "Registre informel : I''m sorry for... / Sorry about..."]}',
  '{"anglais","writing","functions","apologizing"}'
),
-- 584: demande polie — true_false
(
  '44444444-0000-0000-0000-000000000584',
  '33333333-0000-0000-0000-000000000086',
  'true_false', 2, 'fr',
  '{"stem": "L''expression « Give me your book! » est une manière polie de faire une demande (requesting) en anglais.", "correct_answer": false, "latex": false}',
  '{"text_fr": "« Give me your book! » est un ordre à l''impératif, pas une demande polie. Pour faire une demande polie en anglais, on utilise des structures comme « Could you please... ? », « Would you mind... ? » ou « I would appreciate it if you could... ».", "steps": ["« Give me your book! » est un impératif → c''est un ordre, pas une demande polie", "Demande polie : Could you please lend me your book?", "Demande polie : Would you mind lending me your book?", "Demande très polie (formelle) : I would be grateful if you could lend me your book."]}',
  '{"anglais","writing","functions","requesting"}'
);
