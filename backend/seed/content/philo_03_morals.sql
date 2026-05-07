-- ============================================================
-- PHILO CONTENT: La morale (2 skills, 14 items)
-- Topic: La morale
-- Skills:
--   duty_freedom       (33333333-...-061) — 7 items
--   happiness_desire   (33333333-...-062) — 7 items
-- ============================================================

-- =====================
-- SKILL: duty_freedom (Le devoir et la liberté) — 7 items
-- 4 mcq + 1 numeric + 2 true_false
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000403',
  '33333333-0000-0000-0000-000000000061',
  'mcq', 2, 'fr',
  '{"stem": "Selon Kant, l''impératif catégorique ordonne d''agir :", "choices": ["Selon une maxime universalisable", "En vue du plus grand bonheur collectif", "Conformément aux lois de l''État", "Selon nos inclinations naturelles"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''impératif catégorique de Kant stipule : « Agis uniquement d''après la maxime dont tu peux vouloir en même temps qu''elle devienne une loi universelle. » Il ne dépend ni des conséquences, ni du bonheur, ni des lois positives, mais de la forme universalisable de la maxime.", "steps": ["L''impératif catégorique est inconditionnel : il s''impose sans condition.", "Il exige que la maxime de l''action puisse être universalisée sans contradiction.", "Il se distingue de l''utilitarisme (bonheur collectif) et du légalisme (lois de l''État)."]}',
  '{"philosophie","morale","devoir","kant","imperatif_categorique"}'
),
(
  '44444444-0000-0000-0000-000000000404',
  '33333333-0000-0000-0000-000000000061',
  'mcq', 2, 'fr',
  '{"stem": "Quelle distinction Kant établit-il entre moralité et légalité ?", "choices": ["La moralité exige d''agir par devoir, la légalité seulement conformément au devoir", "La moralité concerne la loi civile, la légalité concerne la conscience", "La moralité est subjective, la légalité est objective", "Il n''y a aucune distinction chez Kant entre les deux"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Chez Kant, une action conforme au devoir (légalité) peut être accomplie par intérêt ou par peur de la sanction. Seule l''action accomplie par devoir, c''est-à-dire par pur respect pour la loi morale, possède une valeur morale authentique (moralité).", "steps": ["Légalité : l''action est conforme au devoir extérieurement.", "Moralité : l''action est accomplie par devoir, par respect de la loi morale.", "Exemple : rendre la monnaie par honnêteté (moralité) vs par peur d''être pris (légalité)."]}',
  '{"philosophie","morale","devoir","kant","moralite_legalite"}'
),
(
  '44444444-0000-0000-0000-000000000405',
  '33333333-0000-0000-0000-000000000061',
  'mcq', 3, 'fr',
  '{"stem": "Le déterminisme s''oppose au libre arbitre en affirmant que :", "choices": ["Tout événement, y compris nos actions, est causé par des conditions antérieures", "L''homme est libre mais choisit toujours le mal", "La liberté est une illusion créée par la société", "Seuls les actes réfléchis sont déterminés"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le déterminisme est la thèse selon laquelle tout événement est la conséquence nécessaire de causes antérieures. Appliqué à l''action humaine, il remet en question le libre arbitre en soutenant que nos choix sont eux-mêmes déterminés par des facteurs biologiques, psychologiques ou sociaux.", "steps": ["Le déterminisme pose un enchaînement causal nécessaire pour tout phénomène.", "Si nos décisions sont causées par des facteurs antérieurs, le libre arbitre est mis en doute.", "Spinoza, par exemple, affirme que les hommes se croient libres parce qu''ils ignorent les causes qui les déterminent."]}',
  '{"philosophie","morale","liberte","determinisme","libre_arbitre"}'
),
(
  '44444444-0000-0000-0000-000000000406',
  '33333333-0000-0000-0000-000000000061',
  'mcq', 2, 'fr',
  '{"stem": "Quelle est la différence fondamentale entre une morale déontologique et une morale conséquentialiste ?", "choices": ["La morale déontologique juge l''action selon le respect du devoir, la morale conséquentialiste selon ses résultats", "La morale déontologique est religieuse, la morale conséquentialiste est laïque", "La morale déontologique est individuelle, la morale conséquentialiste est collective", "Il n''y a pas de différence, ce sont deux noms pour la même approche"], "correct_index": 0, "latex": false}',
  '{"text_fr": "La morale déontologique (du grec deon, devoir) évalue l''action en fonction du respect de principes ou de devoirs, indépendamment des conséquences. La morale conséquentialiste, comme l''utilitarisme, juge l''action bonne ou mauvaise selon les résultats qu''elle produit.", "steps": ["Déontologie : la valeur morale réside dans l''intention et le respect du devoir (ex. Kant).", "Conséquentialisme : la valeur morale dépend des conséquences de l''action (ex. Mill, Bentham).", "Exemple : mentir pour sauver une vie est interdit en déontologie stricte, mais justifié en conséquentialisme."]}',
  '{"philosophie","morale","devoir","deontologie","consequentialisme"}'
),
(
  '44444444-0000-0000-0000-000000000407',
  '33333333-0000-0000-0000-000000000061',
  'numeric', 3, 'fr',
  '{"stem": "Kant formule plusieurs versions de l''impératif catégorique dans les Fondements de la métaphysique des mœurs. Combien de formulations principales en distingue-t-on traditionnellement ?", "correct_value": 3, "tolerance": 0, "unit": ""}',
  '{"text_fr": "On distingue traditionnellement trois formulations principales de l''impératif catégorique chez Kant : 1) la formule de la loi universelle, 2) la formule de l''humanité comme fin en soi, 3) la formule de l''autonomie (le règne des fins). Chacune exprime le même principe moral sous un angle différent.", "steps": ["Formule 1 : Agis selon la maxime que tu pourrais vouloir ériger en loi universelle.", "Formule 2 : Traite l''humanité toujours aussi comme une fin, jamais simplement comme un moyen.", "Formule 3 : Agis comme si tu étais législateur dans un règne des fins."]}',
  '{"philosophie","morale","devoir","kant","imperatif_categorique"}'
),
(
  '44444444-0000-0000-0000-000000000408',
  '33333333-0000-0000-0000-000000000061',
  'true_false', 2, 'fr',
  '{"statement": "Selon Kant, une action accomplie par inclination (par exemple aider autrui par sympathie) possède une véritable valeur morale.", "correct_answer": false}',
  '{"text_fr": "Pour Kant, seule l''action accomplie par devoir — c''est-à-dire par pur respect pour la loi morale — a une valeur morale authentique. Une action accomplie par inclination ou par sympathie, même si elle est conforme au devoir, n''a pas de valeur morale en elle-même car elle n''est pas motivée par le devoir.", "steps": ["Kant distingue agir par devoir et agir conformément au devoir.", "L''inclination (sympathie, intérêt) n''est pas un mobile moral.", "Seul le respect de la loi morale confère une valeur morale à l''action."]}',
  '{"philosophie","morale","devoir","kant","inclination"}'
),
(
  '44444444-0000-0000-0000-000000000409',
  '33333333-0000-0000-0000-000000000061',
  'true_false', 2, 'fr',
  '{"statement": "Le libre arbitre désigne la capacité de la volonté à se déterminer elle-même, indépendamment de toute contrainte extérieure ou intérieure.", "correct_answer": true}',
  '{"text_fr": "Le libre arbitre est la faculté qu''aurait la volonté de se déterminer par elle-même, sans être contrainte par des causes extérieures (société, nature) ni intérieures (pulsions, passions). C''est un concept central du débat entre partisans de la liberté et déterministes.", "steps": ["Le libre arbitre suppose une autodétermination de la volonté.", "Il implique que l''individu aurait pu agir autrement dans les mêmes circonstances.", "Il s''oppose au déterminisme strict qui nie cette possibilité."]}',
  '{"philosophie","morale","liberte","libre_arbitre"}'
);

-- =====================
-- SKILL: happiness_desire (Le bonheur et le désir) — 7 items
-- 4 mcq + 1 numeric + 2 true_false
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
(
  '44444444-0000-0000-0000-000000000410',
  '33333333-0000-0000-0000-000000000062',
  'mcq', 2, 'fr',
  '{"stem": "L''eudémonisme d''Aristote définit le bonheur comme :", "choices": ["L''activité de l''âme conforme à la vertu", "L''absence de douleur corporelle", "La satisfaction de tous les désirs", "Le plaisir immédiat des sens"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Pour Aristote, le bonheur (eudaimonia) est le souverain bien, la fin ultime de l''existence humaine. Il ne réside pas dans le plaisir sensible mais dans l''activité de l''âme conforme à la vertu (arétè), exercée tout au long d''une vie accomplie.", "steps": ["Eudaimonia signifie littéralement « avoir un bon démon », être favorisé.", "Le bonheur est une activité, pas un état passif.", "Il requiert la pratique des vertus (courage, justice, prudence, etc.) sur une vie entière."]}',
  '{"philosophie","morale","bonheur","aristote","eudemonisme"}'
),
(
  '44444444-0000-0000-0000-000000000411',
  '33333333-0000-0000-0000-000000000062',
  'mcq', 2, 'fr',
  '{"stem": "Chez Épicure, l''ataraxie désigne :", "choices": ["L''absence de trouble de l''âme", "Le plaisir maximal des sens", "L''indifférence totale envers autrui", "La recherche constante du plaisir"], "correct_index": 0, "latex": false}',
  '{"text_fr": "L''ataraxie (du grec ataraxia, absence de trouble) est, chez Épicure, l''état de tranquillité de l''âme obtenu par la suppression des craintes irrationnelles (peur des dieux, de la mort) et la limitation des désirs aux seuls désirs naturels et nécessaires. C''est un plaisir stable, non la recherche effrénée du plaisir.", "steps": ["Ataraxie = absence de trouble de l''âme (paix intérieure).", "Elle s''obtient par la maîtrise des désirs et la suppression des craintes.", "Épicure distingue désirs naturels nécessaires, naturels non nécessaires, et vains."]}',
  '{"philosophie","morale","bonheur","epicure","ataraxie"}'
),
(
  '44444444-0000-0000-0000-000000000412',
  '33333333-0000-0000-0000-000000000062',
  'mcq', 3, 'fr',
  '{"stem": "Selon Schopenhauer, le désir est source de souffrance parce que :", "choices": ["Le désir satisfait engendre immédiatement l''ennui ou un nouveau désir", "Le désir est toujours impossible à satisfaire matériellement", "Le désir est une punition divine", "Le désir n''existe que chez les êtres faibles"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Pour Schopenhauer, la vie oscille entre la souffrance (quand le désir n''est pas satisfait) et l''ennui (quand il est satisfait). Le désir comblé laisse place à un nouveau désir ou à la vacuité. Le bonheur durable est donc impossible tant que la volonté de vivre domine l''individu.", "steps": ["Le désir insatisfait produit la souffrance (manque, frustration).", "Le désir satisfait mène à l''ennui ou fait naître un nouveau désir.", "La vie est un pendule entre souffrance et ennui : le bonheur est toujours négatif (absence momentanée de douleur)."]}',
  '{"philosophie","morale","desir","schopenhauer","souffrance"}'
),
(
  '44444444-0000-0000-0000-000000000413',
  '33333333-0000-0000-0000-000000000062',
  'mcq', 2, 'fr',
  '{"stem": "Quelle est la différence fondamentale entre le désir et le besoin ?", "choices": ["Le besoin est naturel et limité, le désir est culturel et potentiellement illimité", "Le besoin est psychologique, le désir est physiologique", "Le besoin est superflu, le désir est nécessaire", "Il n''existe aucune différence entre besoin et désir"], "correct_index": 0, "latex": false}',
  '{"text_fr": "Le besoin correspond à une nécessité vitale (manger, boire, dormir) : il est naturel, limité et peut être pleinement satisfait. Le désir, en revanche, est souvent culturellement construit, illimité et renaît sans cesse une fois comblé. Épicure et les stoïciens insistent sur cette distinction pour atteindre la sagesse.", "steps": ["Besoin : nécessité vitale, objective, limitée, satisfaisable.", "Désir : aspiration subjective, souvent illimitée, culturellement influencée.", "Confondre les deux conduit à une quête insatiable de satisfaction."]}',
  '{"philosophie","morale","desir","besoin"}'
),
(
  '44444444-0000-0000-0000-000000000414',
  '33333333-0000-0000-0000-000000000062',
  'numeric', 2, 'fr',
  '{"stem": "Épicure classe les désirs en catégories pour guider la vie bonne. Combien de catégories de désirs distingue-t-il dans sa Lettre à Ménécée ?", "correct_value": 3, "tolerance": 0, "unit": ""}',
  '{"text_fr": "Épicure distingue trois catégories de désirs : 1) les désirs naturels et nécessaires (manger, boire, se protéger du froid), 2) les désirs naturels mais non nécessaires (manger des mets raffinés, les plaisirs variés), 3) les désirs ni naturels ni nécessaires (la gloire, le pouvoir, la richesse excessive). Seule la première catégorie doit impérativement être satisfaite.", "steps": ["Catégorie 1 : désirs naturels et nécessaires — indispensables à la survie.", "Catégorie 2 : désirs naturels mais non nécessaires — agréables mais superflus.", "Catégorie 3 : désirs vains (ni naturels ni nécessaires) — source de trouble."]}',
  '{"philosophie","morale","desir","epicure","classification"}'
),
(
  '44444444-0000-0000-0000-000000000415',
  '33333333-0000-0000-0000-000000000062',
  'true_false', 2, 'fr',
  '{"statement": "Pour les stoïciens, le bonheur consiste à vivre en accord avec la nature et la raison, en acceptant ce qui ne dépend pas de nous.", "correct_answer": true}',
  '{"text_fr": "Les stoïciens (Épictète, Sénèque, Marc Aurèle) enseignent que le bonheur réside dans la vie conforme à la raison et à l''ordre naturel. Ils distinguent ce qui dépend de nous (nos jugements, nos volontés) et ce qui n''en dépend pas (les événements extérieurs). La sagesse consiste à accepter ce qui ne dépend pas de nous et à maîtriser ce qui en dépend.", "steps": ["Le stoïcisme fonde le bonheur sur l''accord avec la nature rationnelle de l''homme.", "La distinction dépendant/indépendant de nous est centrale (Épictète, Manuel).", "Le sage stoïcien atteint l''apatheia : l''absence de passions perturbatrices."]}',
  '{"philosophie","morale","bonheur","stoicisme"}'
),
(
  '44444444-0000-0000-0000-000000000416',
  '33333333-0000-0000-0000-000000000062',
  'true_false', 3, 'fr',
  '{"statement": "Épicure est un hédoniste qui recommande la recherche effrénée de tous les plaisirs pour atteindre le bonheur.", "correct_answer": false}',
  '{"text_fr": "Contrairement à une idée reçue, Épicure ne prône pas la recherche effrénée des plaisirs. Son hédonisme est modéré : il recommande la recherche du plaisir stable (ataraxie, aponie) et la limitation des désirs. Il préconise un calcul des plaisirs et des peines, évitant les plaisirs dont les conséquences sont douloureuses. L''épicurisme est un hédonisme ascétique, non un appel à la débauche.", "steps": ["Épicure distingue plaisirs cinétiques (en mouvement) et catastématiques (stables).", "Le vrai plaisir est l''absence de douleur du corps (aponie) et de trouble de l''âme (ataraxie).", "Il faut calculer : un plaisir immédiat peut entraîner une souffrance future plus grande."]}',
  '{"philosophie","morale","bonheur","epicure","hedonisme"}'
);
