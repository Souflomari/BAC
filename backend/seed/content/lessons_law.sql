-- ============================================================
-- Law lesson content (Droit)
-- 7 skills, IDs 118-124, Moroccan Bac syllabus
-- ============================================================

UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Les contrats",
      "body_fr": "Le **contrat** est un accord de volontés entre deux ou plusieurs personnes qui crée des obligations juridiques. Au Maroc, le droit des contrats est régi par le **DOC** (Dahir des Obligations et Contrats, 1913, révisé).\n\n**Conditions de validité d'un contrat** (4 conditions cumulatives) :\n1. **Capacité juridique** : les parties doivent avoir la capacité légale (majorité : 18 ans au Maroc, ou représentation légale pour les mineurs)\n2. **Consentement libre et éclairé** : absence de vices du consentement (erreur, dol, violence)\n3. **Objet licite et déterminé** : ce sur quoi porte le contrat doit être légal et précis\n4. **Cause licite** : la raison du contrat doit être légale\n\n**Principe** : « Le contrat légalement formé tient lieu de loi à ceux qui l'ont fait » (Art. 230 DOC)."
    },
    {
      "type": "formula",
      "title_fr": "Vices du consentement et effets",
      "body_fr": "**Vices du consentement** (annulent le contrat) :\n- **Erreur** : méprise sur la nature du contrat ou sur la substance de l'objet (ex: acheter une copie en croyant avoir l'original)\n- **Dol** : manœuvres frauduleuses d'une partie pour tromper l'autre (ex: cacher un vice caché)\n- **Violence** : contrainte physique ou morale exercée pour forcer le consentement\n\n**Effets** :\n- Vice du consentement → **nullité relative** (l'acte peut être annulé à la demande de la victime dans un délai de 4 ans)\n- Nullité absolue : contrat contraire à l'ordre public ou aux bonnes mœurs (ex: contrat pour vendre des stupéfiants)\n\n**Types de contrats** :\n- Synallagmatique : obligations réciproques (vente, bail)\n- Unilatéral : une seule partie s'oblige (donation)"
    },
    {
      "type": "example",
      "title_fr": "Cas pratique : vice du consentement",
      "body_fr": "**Situation** : Un vendeur de voiture d'occasion masque les traces d'accident avec de la peinture et présente le véhicule comme neuf. L'acheteur découvre les dégâts un mois après.\n\n**Analyse juridique** :\n- **Dol** : manœuvres frauduleuses du vendeur pour induire l'acheteur en erreur\n- **Vice du consentement** établi → nullité relative du contrat\n- L'acheteur peut demander en justice : l'annulation du contrat + le remboursement du prix payé + des **dommages-intérêts** (préjudice subi)\n\n**Condition** : l'acheteur doit prouver les manœuvres frauduleuses et leur caractère déterminant (sans le dol, il n'aurait pas contracté).\n\n**Délai d'action** : 4 ans à partir de la découverte du dol (prescription quadriennale)."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000118';

UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Les obligations",
      "body_fr": "Une **obligation** est un lien de droit en vertu duquel une personne (le **débiteur**) est tenue envers une autre (le **créancier**) d'exécuter une prestation.\n\n**Sources des obligations** :\n1. **Contrat** : la plus importante — accord de volontés\n2. **Loi** : obligations légales (ex: obligation alimentaire entre parents et enfants)\n3. **Quasi-contrat** : acte licite d'une personne qui oblige une autre (gestion d'affaires, enrichissement sans cause)\n4. **Délit** : acte illicite intentionnel qui cause un dommage\n5. **Quasi-délit** : acte illicite non intentionnel (négligence, imprudence)\n\n**Types d'obligations selon l'intensité** :\n- **Obligation de résultat** : le débiteur doit atteindre un résultat précis (transporteur, chirurgien réparateur)\n- **Obligation de moyens** : le débiteur doit mettre en œuvre tous les moyens sans garantir le résultat (médecin, avocat)"
    },
    {
      "type": "formula",
      "title_fr": "Extinction des obligations",
      "body_fr": "Une obligation s'éteint par :\n\n1. **Paiement** : exécution volontaire de l'obligation (le plus courant)\n2. **Compensation** : deux parties sont mutuellement créancières et débitrices → les dettes s'annulent\n3. **Novation** : substitution d'une obligation nouvelle à une ancienne\n4. **Remise de dette** : le créancier renonce à sa créance\n5. **Confusion** : réunion sur la même personne des qualités de créancier et débiteur\n6. **Prescription** : écoulement d'un délai sans action en justice\n   - Droit commun : **5 ans** au Maroc\n   - Droit commercial : **5 ans** (même durée — art. 5 Code de commerce)\n\n**Inexécution** : le créancier peut demander l'exécution forcée, la résolution du contrat, ou des dommages-intérêts."
    },
    {
      "type": "example",
      "title_fr": "Obligation de moyens vs obligation de résultat",
      "body_fr": "**Cas 1 — Transporteur (obligation de résultat)** :\nUne entreprise confie une cargaison de 50 000 DH à un transporteur. Les marchandises arrivent endommagées.\n→ Le transporteur est tenu à une **obligation de résultat** : livrer en bon état. Sa responsabilité est engagée sans qu'on ait à prouver sa faute. Il peut seulement s'exonérer en prouvant un cas de force majeure, la faute de la victime, ou le vice propre de la marchandise.\n\n**Cas 2 — Médecin (obligation de moyens)** :\nUn patient décède malgré une opération correctement menée.\n→ Le médecin est tenu à une **obligation de moyens** : mettre en œuvre tous les moyens disponibles. Sa responsabilité n'est engagée que si la victime prouve une **faute médicale** (négligence, imprudence, violation des règles de l'art).\n\n**Distinction clé** : qui supporte la charge de la preuve ? Résultat → débiteur prouve l'absence de faute. Moyens → créancier prouve la faute."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000119';

UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "La responsabilité civile",
      "body_fr": "La **responsabilité civile** est l'obligation de **réparer le dommage** causé à autrui.\n\n**Trois conditions cumulatives** (triangle de la responsabilité) :\n1. **Faute** : acte illicite (violation d'une obligation légale ou contractuelle) ou manquement à un devoir de prudence\n2. **Dommage** : préjudice subi par la victime — matériel (perte financière), corporel (blessure), moral (souffrance, atteinte à l'honneur)\n3. **Lien de causalité** : la faute est bien la cause directe du dommage\n\n**Types de responsabilité civile** :\n- **Du fait personnel** (art. 77 DOC) : on répond de sa propre faute\n- **Du fait d'autrui** (art. 85 DOC) : parents pour leurs enfants mineurs, employeurs pour leurs préposés\n- **Du fait des choses** : le gardien d'une chose est responsable des dommages qu'elle cause"
    },
    {
      "type": "formula",
      "title_fr": "RC civile vs RC pénale",
      "body_fr": "| Critère | Responsabilité civile | Responsabilité pénale |\n|---|---|---|\n| But | Réparer le préjudice | Punir l'auteur |\n| Bénéficiaire | La victime | La société |\n| Sanction | Dommages-intérêts | Peine (prison, amende) |\n| Tribunal | Tribunal civil ou commercial | Tribunal répressif |\n| Prescription | 5 ans (droit commun) | Variable selon l'infraction |\n\n**Un même fait peut engager les deux responsabilités** : ex. accident de voiture en état d'ivresse → civil (indemniser la victime) + pénal (emprisonnement pour blessures involontaires).\n\n**Assurance RC** : obligatoire pour les véhicules au Maroc (loi n° 17-99 portant Code des assurances).\n\n**Causes d'exonération** : force majeure, faute de la victime, fait d'un tiers."
    },
    {
      "type": "example",
      "title_fr": "Responsabilité civile de l'employeur",
      "body_fr": "**Situation** : Un livreur d'une pizzeria, en effectuant une livraison, renverse un piéton et lui cause une fracture de la jambe.\n\n**Analyse** :\n- **Responsabilité du préposé** (livreur) : faute personnelle (conduite imprudente) → responsabilité du fait personnel (art. 77 DOC)\n- **Responsabilité du commettant** (patron de la pizzeria) : l'employeur est responsable du fait de ses préposés **dans l'exercice de leurs fonctions** (art. 85 DOC)\n\n**En pratique** : la victime peut poursuivre le livreur ET/OU la pizzeria (solidarité). La pizzeria, si elle indemnise, peut se retourner contre le livreur (recours subrogatoire) si la faute est grave.\n\n**Rôle de l'assurance professionnelle RC** : l'assurance de la pizzeria couvre ce type de sinistre → protection économique de l'entreprise."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000120';

UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Les actes de commerce",
      "body_fr": "Le **droit commercial marocain** (Code de Commerce, loi n° 15-95) s'applique aux commerçants et aux actes de commerce.\n\n**Actes de commerce par nature** (art. 6 C. com.) :\n- Achat de meubles corporels ou incorporels en vue de les revendre\n- Location de meubles en vue de leur sous-location\n- Opérations de banque, de change et de bourse\n- Opérations d'assurance et de réassurance\n- Opérations de transport de personnes et de marchandises\n- Actes des établissements industriels (usines, manufactures)\n- Activités des agences et bureaux d'affaires\n\n**Commerçant** : personne physique ou morale qui exerce des actes de commerce à titre de **profession habituelle** (art. 7 C. com.)."
    },
    {
      "type": "formula",
      "title_fr": "Obligations des commerçants",
      "body_fr": "**Immatriculation** au **RCCM** (Registre du Commerce et du Crédit Mobilier) : obligatoire avant toute activité commerciale. Tenu par les tribunaux de commerce.\n\n**Obligations comptables** :\n- Tenir une comptabilité régulière et sincère (plan comptable marocain)\n- Établir des états de synthèse annuels (bilan, CPC, tableau de financement)\n- Conserver les pièces justificatives 10 ans\n\n**Obligations diverses** :\n- Ouvrir un compte bancaire professionnel\n- Déclarer les modifications (changement d'adresse, cessation d'activité)\n- Respecter la concurrence loyale (pas de publicité mensongère, pas de dénigrement)\n\n**Prescription commerciale** : 5 ans (délai pour agir en justice pour les dettes commerciales)."
    },
    {
      "type": "example",
      "title_fr": "Qui est commerçant ?",
      "body_fr": "**Exemples d'application** :\n\n✅ **Est commerçant** :\n- Un boucher qui achète du bétail pour le revendre après abattage et transformation → achat pour revendre + industrie\n- Une société de transport qui achemine des marchandises entre villes\n- Une banque qui collecte des dépôts et accorde des crédits\n\n❌ **N'est pas commerçant** :\n- Un particulier qui vend sa voiture personnelle → acte isolé, non professionnel\n- Un agriculteur qui vend sa propre récolte → producteur, pas commerçant (sauf s'il achète pour revendre)\n- Un professionnel libéral (médecin, avocat) → activité civile, non commerciale\n- Un artisan qui vend sa propre production manuelle → artisan (statut distinct du commerçant)\n\n**Intérêt pratique** : la qualification de commerçant détermine le tribunal compétent (tribunal de commerce vs tribunal civil), le régime de prescription, et les obligations légales applicables."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000121';

UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Les sociétés commerciales",
      "body_fr": "Une **société commerciale** est créée par contrat entre deux ou plusieurs personnes (ou par acte unilatéral pour certaines formes) qui apportent des biens en vue de partager les bénéfices ou de profiter de l'économie.\n\n**Principales formes au Maroc** :\n\n- **SA** (Société Anonyme) : min 5 actionnaires, capital min 300 000 DH (3M si appel public à l'épargne), actions librement cessibles, peut être cotée en bourse\n- **SARL** : 1 à 50 associés, capital min 1 DH, parts sociales (cession avec agrément des associés), forme la plus répandue\n- **SNC** (Société en Nom Collectif) : tous les associés ont la qualité de commerçant, responsabilité solidaire et illimitée\n- **SCA** (Société en Commandite par Actions) : deux catégories d'associés — commandités (responsables illimités) + commanditaires (responsabilité limitée)"
    },
    {
      "type": "formula",
      "title_fr": "Organes de la SA",
      "body_fr": "**Assemblée Générale Ordinaire (AGO)** : réunit les actionnaires annuellement. Approuve les comptes, distribue les dividendes, nomme les administrateurs. Vote à la **majorité simple** (50%+1 voix).\n\n**Assemblée Générale Extraordinaire (AGE)** : modifications des statuts (augmentation de capital, fusion, dissolution). Vote à la **majorité des 2/3**.\n\n**Conseil d'Administration (CA)** : 3 à 15 membres, définit la stratégie, contrôle la gestion.\n\n**Directeur Général (DG)** : dirige l'entreprise et la représente vis-à-vis des tiers.\n\n**Commissaire aux Comptes (CAC)** : contrôle et certifie les comptes annuels. Obligatoire pour les SA et certaines SARL.\n\n**Dividende** = bénéfice distribuable / nombre d'actions."
    },
    {
      "type": "example",
      "title_fr": "Choisir la forme juridique adaptée",
      "body_fr": "**Situation** : Trois associés veulent créer une société de conseil en management avec un capital de 150 000 DH.\n\n**Analyse des options** :\n\n- **SA** : impossible — capital insuffisant (< 300 000 DH) et moins de 5 associés\n- **SNC** : déconseillée — responsabilité illimitée expose le patrimoine personnel des associés\n- **SARL** : ✅ adaptée — 3 associés (dans la limite de 50), capital 150 000 DH (> 1 DH), responsabilité limitée à l'apport de chacun (50 000 DH par associé)\n\n**Démarche de création d'une SARL** :\n1. Rédiger les statuts (notaire ou acte sous seing privé)\n2. Déposer le capital (banque ou notaire)\n3. Publier un avis de constitution dans un journal d'annonces légales\n4. S'immatriculer au RCCM (Tribunal de commerce)\n5. S'inscrire à la patente et à la TVA (Administration fiscale)\n\nCoût total de création ≈ 2 000 à 5 000 DH."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000122';

UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Le contrat de travail",
      "body_fr": "Le **contrat de travail** est défini par trois éléments cumulatifs :\n1. **Prestation de travail** : exécution d'un travail\n2. **Rémunération** : contrepartie du travail (salaire)\n3. **Lien de subordination juridique** : l'employeur donne des ordres et contrôle leur exécution — c'est l'élément **déterminant**\n\nAu Maroc, régi par le **Code du Travail** (Loi n° 65-99, entrée en vigueur en 2004).\n\n**Types de contrats** :\n- **CDI** (Contrat à Durée Indéterminée) : droit commun, durable, rompu par démission ou licenciement\n- **CDD** (Contrat à Durée Déterminée) : cas limitatifs (remplacement de salarié absent, travail saisonnier, surcroît d'activité)\n- **Contrat d'apprentissage** : formation professionnelle en alternance\n\n**SMIG (2024)** : 15,33 DH/heure dans l'industrie et le commerce."
    },
    {
      "type": "formula",
      "title_fr": "Éléments du bulletin de paie",
      "body_fr": "**Salaire brut** = Salaire de base + Heures supplémentaires + Primes\n\n**Cotisations salariales** :\n- CNSS (court terme) : 0,52% du salaire brut plafonné\n- CNSS (long terme/retraite) : 3,96%\n- AMO (Assurance Maladie Obligatoire) : 2,26%\n- Total salarié ≈ **6,74%**\n\n**Cotisations patronales** : ≈ 21,09% (dont CNSS + AMO + formation professionnelle)\n\n**IGR** (Impôt Général sur le Revenu) : barème progressif après déduction de 20% pour frais professionnels (plafonnée).\n\n**Salaire net** = Salaire brut - Cotisations salariales - IGR\n\n**Congé annuel** : 1,5 jour/mois travaillé = **18 jours/an** minimum (+ 1,5 jour par tranche de 5 ans d'ancienneté)."
    },
    {
      "type": "example",
      "title_fr": "Rupture du CDI et calcul d'indemnité",
      "body_fr": "**Modes de rupture du CDI** :\n- **Démission** (par le salarié) : préavis obligatoire (1 mois employés, 3 mois cadres). Pas d'indemnité due par l'employeur.\n- **Licenciement pour faute grave** : pas de préavis, pas d'indemnité.\n- **Licenciement sans faute grave** : préavis + indemnité légale.\n\n**Calcul indemnité de licenciement** (sans faute grave) :\nSalaire horaire = Salaire mensuel / 191,25 heures\n- Années 1 à 5 : 96h × salaire horaire × nombre d'années\n- Années 6 à 10 : 144h × salaire horaire × nombre d'années\n- Au-delà : 192h × salaire horaire × nombre d'années\n\n**Exemple** : Employé, 8 ans, salaire 5 000 DH/mois → taux = 5 000/191,25 = 26,18 DH/h\n- 5 ans × 96h × 26,18 = 12 566 DH\n- 3 ans × 144h × 26,18 = 11 310 DH\n- **Total indemnité ≈ 23 876 DH**"
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000123';

UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "La protection sociale au Maroc",
      "body_fr": "La **protection sociale** est l'ensemble des mécanismes qui protègent les individus contre les risques sociaux (maladie, accident, chômage, vieillesse, maternité).\n\n**Piliers de la protection sociale marocaine** :\n\n- **CNSS** (Caisse Nationale de Sécurité Sociale) : couvre les salariés du secteur privé — allocations familiales, maladie, maternité, accidents du travail, retraite\n- **CMR** (Caisse Marocaine des Retraites) : fonctionnaires de l'État\n- **RCAR** (Régime Collectif d'Allocation de Retraite) : personnel des établissements publics\n- **AMO** (Assurance Maladie Obligatoire) : remboursement des frais médicaux\n- **RAMED** (Régime d'Assistance Médicale) : couverture médicale pour les personnes démunies\n- **Assurance maladie universelle (AMU)** : réforme 2021 pour couvrir tout le monde"
    },
    {
      "type": "formula",
      "title_fr": "Taux de cotisation CNSS et retraite",
      "body_fr": "**Cotisations CNSS 2024** :\n\n| Branche | Employeur | Salarié |\n|---|---|---|\n| Allocations familiales | 6,40% | 0% |\n| Prestations CT (maladie, maternité) | 1,05% | 0,52% |\n| Prestations LT (retraite, invalidité) | 7,93% | 3,96% |\n| AMO | 4,11% | 2,26% |\n| Formation professionnelle | 1,60% | 0% |\n| **Total** | **≈ 21,09%** | **≈ 6,74%** |\n\n**Droit à la retraite CNSS** :\n- Âge : 60 ans (ou 55 ans avec 27 ans de cotisations)\n- Cotisations : minimum 3 240 jours (≈ 13,5 ans)\n- Pension = 40% du salaire moyen des 8 meilleures années + 1,33%/an supplémentaire (max 70%)"
    },
    {
      "type": "example",
      "title_fr": "Calcul de pension de retraite CNSS",
      "body_fr": "**Cas** : Salarié avec 30 ans de cotisations à la CNSS, salaire moyen des 8 meilleures années = 7 200 DH/mois.\n\n**Calcul de la pension** :\n- Base : 40% (pour les premières 15 années d'affiliation)\n- Années supplémentaires : (30 - 15) × 1,33% = 15 × 1,33% = 19,95%\n- **Taux total = 40% + 19,95% = 59,95%**\n- **Pension mensuelle = 7 200 × 59,95% ≈ 4 316 DH/mois**\n\n**Réforme AMU (2021)** : extension de la couverture médicale aux travailleurs non-salariés (indépendants, agriculteurs, commerçants). Objectif : couverture universelle à l'horizon 2025, conformément aux Hautes Orientations Royales.\n\n**Assurance chômage** : créée en 2015 pour les salariés licenciés (non démissionnaires) avec au moins 36 mois de cotisations → indemnité de 70% du salaire pendant 6 mois maximum."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000124';
