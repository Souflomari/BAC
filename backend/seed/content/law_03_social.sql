-- ============================================================
-- LAW CONTENT: Droit social (2 skills, 14 items)
-- Skills:
--   labor_law          (33333333-...-123) difficulty 2 — 7 items
--   social_protection  (33333333-...-124) difficulty 2 — 7 items
-- Items: 44444444-0000-0000-0000-000000000837 → ...850
-- ============================================================

-- =====================
-- SKILL: labor_law (Contrat de travail) — 7 items
-- Covers: Code du travail marocain, contrat de travail (CDI, CDD, conditions
--         de forme), période d''essai, obligations de l''employeur et du salarié,
--         licenciement (motifs, préavis, indemnités), SMIG, durée légale du
--         travail (44h/semaine), congés payés (1.5 jour/mois)
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
-- 837: types de contrat de travail — mcq
(
  '44444444-0000-0000-0000-000000000837',
  '33333333-0000-0000-0000-000000000123',
  'mcq', 2, 'fr',
  '{"stem": "Selon le Code du travail marocain, quel type de contrat est conclu sans limitation de durée ?", "choices": ["Le contrat à durée déterminée (CDD)", "Le contrat à durée indéterminée (CDI)", "Le contrat de travail temporaire", "Le contrat de sous-traitance"], "correct_index": 1, "latex": false}',
  '{"text_fr": "Le contrat à durée indéterminée (CDI) est le contrat de droit commun en droit du travail marocain. Il est conclu sans limitation de durée et prend fin par la volonté de l''une des parties (démission ou licenciement) ou par accord mutuel. Le CDD, en revanche, est conclu pour une durée limitée et ne peut être utilisé que dans des cas prévus par la loi.", "steps": ["Le CDI est le contrat de droit commun (sans limitation de durée)", "Le CDD est limité dans le temps et encadré par la loi", "Le contrat de travail temporaire passe par une agence d''intérim", "Le contrat de sous-traitance lie deux entreprises, pas un employeur et un salarié"]}',
  '{"droit","social","contrat_travail","CDI","bac_style"}'
),
-- 838: période d''essai CDD — mcq
(
  '44444444-0000-0000-0000-000000000838',
  '33333333-0000-0000-0000-000000000123',
  'mcq', 2, 'fr',
  '{"stem": "Quelle est la durée maximale de la période d''essai pour un CDI d''un employé au Maroc ?", "choices": ["15 jours", "1 mois et demi", "3 mois", "6 mois"], "correct_index": 1, "latex": false}',
  '{"text_fr": "Selon le Code du travail marocain (article 14), la période d''essai pour un CDI varie selon la catégorie du salarié : 15 jours pour les ouvriers, 1 mois et demi pour les employés, et 3 mois pour les cadres et assimilés. Chacune de ces périodes est renouvelable une seule fois.", "steps": ["Période d''essai CDI — Ouvriers : 15 jours", "Période d''essai CDI — Employés : 1 mois et demi", "Période d''essai CDI — Cadres : 3 mois", "Chaque période est renouvelable une seule fois"]}',
  '{"droit","social","période_essai","CDI","bac_style"}'
),
-- 839: obligations de l''employeur — mcq
(
  '44444444-0000-0000-0000-000000000839',
  '33333333-0000-0000-0000-000000000123',
  'mcq', 2, 'fr',
  '{"stem": "Parmi les obligations suivantes, laquelle incombe à l''employeur selon le Code du travail marocain ?", "choices": ["Respecter les clauses de non-concurrence après la fin du contrat", "Verser le salaire convenu et assurer des conditions de travail conformes aux normes d''hygiène et de sécurité", "Fournir un logement de fonction à tout salarié", "Accorder une augmentation annuelle automatique de 5 %"], "correct_index": 1, "latex": false}',
  '{"text_fr": "L''employeur est tenu de verser le salaire convenu à la date prévue, de respecter les conditions d''hygiène et de sécurité sur le lieu de travail, de déclarer le salarié à la CNSS et de respecter les dispositions du Code du travail. Le logement de fonction et l''augmentation automatique ne sont pas des obligations légales générales.", "steps": ["Obligation 1 : Verser le salaire convenu dans les délais", "Obligation 2 : Assurer l''hygiène et la sécurité au travail", "Obligation 3 : Déclarer le salarié à la CNSS", "Le logement de fonction et l''augmentation automatique ne sont pas des obligations légales"]}',
  '{"droit","social","obligations_employeur","bac_style"}'
),
-- 840: licenciement et préavis — mcq
(
  '44444444-0000-0000-0000-000000000840',
  '33333333-0000-0000-0000-000000000123',
  'mcq', 3, 'fr',
  '{"stem": "En cas de licenciement abusif au Maroc, le salarié a droit à une indemnité de dommages-intérêts égale à :", "choices": ["Un mois de salaire par année d''ancienneté", "1,5 mois de salaire par année d''ancienneté ou fraction d''année de travail effectif", "Trois mois de salaire forfaitaire", "Le double du salaire annuel brut"], "correct_index": 1, "latex": false}',
  '{"text_fr": "En cas de licenciement abusif, l''article 41 du Code du travail marocain prévoit le versement de dommages-intérêts calculés sur la base de 1,5 mois de salaire par année d''ancienneté ou fraction d''année de travail effectif, plafonnés à 36 mois. Cette indemnité s''ajoute à l''indemnité de licenciement et à l''indemnité de préavis.", "steps": ["Licenciement abusif → dommages-intérêts de 1,5 mois de salaire par année d''ancienneté", "Le plafond est de 36 mois de salaire", "Cette indemnité s''ajoute à l''indemnité de licenciement légale", "Elle s''ajoute également à l''indemnité compensatrice de préavis"]}',
  '{"droit","social","licenciement","indemnités","bac_style"}'
),
-- 841: durée légale du travail — numeric
(
  '44444444-0000-0000-0000-000000000841',
  '33333333-0000-0000-0000-000000000123',
  'numeric', 2, 'fr',
  '{"stem": "Quelle est la durée légale du travail par semaine (en heures) dans le secteur non agricole au Maroc ?", "correct_value": 44, "tolerance": 0, "latex": false}',
  '{"text_fr": "Selon le Code du travail marocain (article 184), la durée normale de travail dans les activités non agricoles est fixée à 44 heures par semaine, soit 2 288 heures par an. Dans le secteur agricole, la durée est fixée à 2 496 heures par an. Les heures effectuées au-delà de la durée légale sont considérées comme des heures supplémentaires, majorées selon le jour et l''horaire.", "steps": ["Durée légale : 44 heures par semaine (secteur non agricole)", "Soit 2 288 heures par an", "Secteur agricole : 2 496 heures par an", "Au-delà → heures supplémentaires avec majoration"]}',
  '{"droit","social","durée_travail","44h","bac_style"}'
),
-- 842: congés payés — true_false
(
  '44444444-0000-0000-0000-000000000842',
  '33333333-0000-0000-0000-000000000123',
  'true_false', 2, 'fr',
  '{"stem": "Au Maroc, le salarié bénéficie d''un congé annuel payé d''un jour et demi ouvrable par mois de service.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. Selon l''article 231 du Code du travail marocain, tout salarié a droit à un congé annuel payé calculé à raison de 1,5 jour ouvrable par mois de service continu, soit 18 jours ouvrables par an. Ce droit est acquis après 6 mois de service continu dans la même entreprise. La durée augmente de 1,5 jour par période de 5 ans d''ancienneté.", "steps": ["Congé payé = 1,5 jour ouvrable par mois de service", "Soit 18 jours ouvrables par an", "Condition : 6 mois de service continu minimum", "Majoration de 1,5 jour par période de 5 ans d''ancienneté"]}',
  '{"droit","social","congés_payés","bac_style"}'
),
-- 843: SMIG — true_false
(
  '44444444-0000-0000-0000-000000000843',
  '33333333-0000-0000-0000-000000000123',
  'true_false', 2, 'fr',
  '{"stem": "Le SMIG (Salaire Minimum Interprofessionnel Garanti) est librement fixé par l''employeur sans aucune intervention de l''État.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Le SMIG est fixé par voie réglementaire (décret) par l''État, après consultation des organisations syndicales et patronales. Il constitue le salaire minimum en dessous duquel aucun employeur ne peut rémunérer un salarié. Au Maroc, le SMIG s''applique dans les secteurs de l''industrie, du commerce et des professions libérales. Dans le secteur agricole, on parle de SMAG (Salaire Minimum Agricole Garanti).", "steps": ["Le SMIG est fixé par décret gouvernemental (pas par l''employeur)", "Il est établi après consultation des partenaires sociaux", "C''est le salaire minimum légal dans l''industrie et le commerce", "Dans l''agriculture, on parle de SMAG (Salaire Minimum Agricole Garanti)"]}',
  '{"droit","social","SMIG","salaire_minimum","bac_style"}'
);

-- =====================
-- SKILL: social_protection (Protection sociale) — 7 items
-- Covers: CNSS (Caisse Nationale de Sécurité Sociale), AMO (Assurance Maladie
--         Obligatoire), accidents du travail, maladies professionnelles,
--         droit syndical, droit de grève
-- =====================
INSERT INTO items (id, skill_id, item_type, difficulty_level, content_language, question, explanation, tags) VALUES
-- 844: rôle de la CNSS — mcq
(
  '44444444-0000-0000-0000-000000000844',
  '33333333-0000-0000-0000-000000000124',
  'mcq', 2, 'fr',
  '{"stem": "La CNSS (Caisse Nationale de Sécurité Sociale) au Maroc assure :", "choices": ["Uniquement les pensions de retraite des fonctionnaires", "La couverture sociale des salariés du secteur privé (allocations familiales, prestations à court et long terme)", "L''assurance automobile obligatoire", "Le financement des hôpitaux publics"], "correct_index": 1, "latex": false}',
  '{"text_fr": "La CNSS est un organisme public marocain chargé de la protection sociale des salariés du secteur privé. Elle couvre trois catégories de prestations : les allocations familiales, les prestations à court terme (indemnités journalières de maladie, de maternité, allocation de décès) et les prestations à long terme (pension de retraite, pension d''invalidité, pension de survivants).", "steps": ["La CNSS couvre les salariés du secteur privé", "Prestations 1 : Allocations familiales", "Prestations 2 : Court terme — maladie, maternité, décès", "Prestations 3 : Long terme — retraite, invalidité, survivants"]}',
  '{"droit","social","CNSS","sécurité_sociale","bac_style"}'
),
-- 845: AMO — mcq
(
  '44444444-0000-0000-0000-000000000845',
  '33333333-0000-0000-0000-000000000124',
  'mcq', 2, 'fr',
  '{"stem": "L''AMO (Assurance Maladie Obligatoire) au Maroc a pour objectif de :", "choices": ["Remplacer la CNSS pour tous les salariés", "Garantir l''accès aux soins de santé en couvrant une partie des frais médicaux pour les assurés et leurs ayants droit", "Fournir gratuitement tous les médicaments aux citoyens", "Financer la construction de nouveaux hôpitaux"], "correct_index": 1, "latex": false}',
  '{"text_fr": "L''AMO (Assurance Maladie Obligatoire), instaurée par la loi 65-00, vise à garantir l''accès aux soins de santé pour l''ensemble de la population. Elle couvre une partie des frais médicaux, pharmaceutiques et d''hospitalisation pour les assurés et leurs ayants droit. Pour les salariés du secteur privé, elle est gérée par la CNSS. Pour les fonctionnaires, elle est gérée par la CNOPS.", "steps": ["L''AMO est instaurée par la loi 65-00", "Elle couvre une partie des frais de soins de santé", "Secteur privé : gérée par la CNSS", "Secteur public : gérée par la CNOPS"]}',
  '{"droit","social","AMO","assurance_maladie","bac_style"}'
),
-- 846: accident du travail — mcq
(
  '44444444-0000-0000-0000-000000000846',
  '33333333-0000-0000-0000-000000000124',
  'mcq', 3, 'fr',
  '{"stem": "Selon la législation marocaine, un accident du travail est un accident :", "choices": ["Survenu uniquement à l''intérieur des locaux de l''entreprise", "Survenu par le fait ou à l''occasion du travail, y compris l''accident de trajet", "Survenu exclusivement pendant les heures de travail", "Causé intentionnellement par le salarié pour obtenir une indemnisation"], "correct_index": 1, "latex": false}',
  '{"text_fr": "L''accident du travail est défini comme tout accident survenu par le fait ou à l''occasion du travail, quelle qu''en soit la cause. Est également considéré comme accident du travail l''accident de trajet, c''est-à-dire l''accident survenu pendant le trajet aller-retour entre le domicile et le lieu de travail. L''employeur est tenu de souscrire une assurance contre les accidents du travail.", "steps": ["Accident du travail = survenu par le fait ou à l''occasion du travail", "L''accident de trajet (domicile ↔ lieu de travail) est inclus", "L''employeur doit souscrire une assurance accidents du travail", "L''accident intentionnel du salarié est exclu de la couverture"]}',
  '{"droit","social","accident_travail","bac_style"}'
),
-- 847: droit syndical — mcq
(
  '44444444-0000-0000-0000-000000000847',
  '33333333-0000-0000-0000-000000000124',
  'mcq', 2, 'fr',
  '{"stem": "Le droit syndical au Maroc permet aux salariés de :", "choices": ["Refuser toute directive de l''employeur", "Constituer librement des syndicats pour la défense de leurs intérêts professionnels", "Imposer leurs conditions salariales sans négociation", "Licencier les dirigeants de l''entreprise"], "correct_index": 1, "latex": false}',
  '{"text_fr": "Le droit syndical est garanti par la Constitution marocaine et le Code du travail. Il permet aux salariés de constituer librement des organisations syndicales pour défendre leurs intérêts professionnels, participer aux négociations collectives et représenter les salariés auprès de l''employeur et des pouvoirs publics. Tout salarié peut adhérer librement au syndicat de son choix.", "steps": ["Le droit syndical est garanti par la Constitution et le Code du travail", "Les salariés peuvent constituer librement des syndicats", "Objectif : défense des intérêts professionnels des salariés", "L''adhésion syndicale est libre et volontaire"]}',
  '{"droit","social","droit_syndical","syndicat","bac_style"}'
),
-- 848: nombre de jours de cotisation CNSS pour la retraite — numeric
(
  '44444444-0000-0000-0000-000000000848',
  '33333333-0000-0000-0000-000000000124',
  'numeric', 3, 'fr',
  '{"stem": "Pour bénéficier d''une pension de retraite à la CNSS, le salarié doit avoir cumulé au minimum combien de jours de cotisation ?", "correct_value": 3240, "tolerance": 0, "latex": false}',
  '{"text_fr": "Pour ouvrir droit à une pension de vieillesse à la CNSS, le salarié doit justifier d''au moins 3 240 jours de cotisation (soit environ 15 années de travail à raison de 216 jours par an). L''âge légal de la retraite au Maroc est fixé à 60 ans (63 ans dans certains secteurs). La pension minimale est de 1 000 DH par mois.", "steps": ["Minimum requis : 3 240 jours de cotisation", "Cela correspond à environ 15 années de travail", "Âge légal de la retraite : 60 ans", "Pension minimale : 1 000 DH par mois"]}',
  '{"droit","social","CNSS","retraite","cotisation","bac_style"}'
),
-- 849: droit de grève — true_false
(
  '44444444-0000-0000-0000-000000000849',
  '33333333-0000-0000-0000-000000000124',
  'true_false', 2, 'fr',
  '{"stem": "Le droit de grève est reconnu par la Constitution marocaine comme un droit fondamental des salariés.", "correct_answer": true, "latex": false}',
  '{"text_fr": "Vrai. L''article 29 de la Constitution marocaine de 2011 garantit le droit de grève. C''est un droit fondamental qui permet aux salariés de cesser collectivement le travail pour défendre leurs revendications professionnelles. Cependant, l''exercice de ce droit doit respecter certaines conditions et ne doit pas porter atteinte à l''ordre public. Une loi organique devrait en fixer les conditions d''exercice.", "steps": ["Le droit de grève est garanti par l''article 29 de la Constitution de 2011", "C''est un arrêt collectif et concerté du travail", "Son objectif est la défense de revendications professionnelles", "Son exercice doit respecter l''ordre public et les conditions légales"]}',
  '{"droit","social","grève","droit_constitutionnel","bac_style"}'
),
-- 850: maladies professionnelles — true_false
(
  '44444444-0000-0000-0000-000000000850',
  '33333333-0000-0000-0000-000000000124',
  'true_false', 2, 'fr',
  '{"stem": "Une maladie professionnelle est toute maladie contractée par le salarié, qu''elle soit ou non liée à son activité professionnelle.", "correct_answer": false, "latex": false}',
  '{"text_fr": "Faux. Une maladie professionnelle est une maladie contractée par le salarié en raison directe de son exposition à un risque lié à son activité professionnelle. Elle doit figurer dans la liste des maladies professionnelles établie par voie réglementaire (tableau des maladies professionnelles). Le salarié doit prouver le lien entre la maladie et son travail. Les maladies professionnelles sont couvertes par la législation sur les accidents du travail.", "steps": ["Maladie professionnelle = maladie liée directement à l''activité professionnelle", "Elle doit figurer dans le tableau réglementaire des maladies professionnelles", "Le lien entre la maladie et le travail doit être établi", "Elle est couverte par la même législation que les accidents du travail"]}',
  '{"droit","social","maladie_professionnelle","bac_style"}'
);
