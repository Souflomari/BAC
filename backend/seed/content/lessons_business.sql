-- ============================================================
-- Business lesson content (Economie et Organisation des Entreprises)
-- 8 skills, IDs 102-109, Moroccan Bac syllabus
-- ============================================================

UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Types d'entreprises",
      "body_fr": "**Classification par forme juridique** :\n- **Entreprise individuelle** : 1 personne, responsabilité illimitée sur patrimoine personnel, simple à créer\n- **SARL** : 1-50 associés, capital minimum 1 DH, responsabilité limitée aux apports, forme la plus répandue au Maroc\n- **SA** : min 5 actionnaires, capital min 300 000 DH (3M si appel public à l'épargne), peut être cotée en bourse\n- **SNC** : associés solidairement et indéfiniment responsables\n\n**Classification par taille** : TPE (<10 employés), PME (10-200), Grande Entreprise (>200).\n\n**Classification par secteur** : primaire (agriculture, pêche), secondaire (industrie), tertiaire (services)."
    },
    {
      "type": "formula",
      "title_fr": "Comparaison des formes juridiques",
      "body_fr": "| Critère | Entreprise individuelle | SARL | SA |\n|---|---|---|---|\n| Associés | 1 | 1 à 50 | ≥ 5 |\n| Capital min | 0 DH | 1 DH | 300 000 DH |\n| Responsabilité | Illimitée | Limitée | Limitée |\n| Direction | Propriétaire | Gérant | PDG + CA |\n| Cession parts | Non | Agrément | Libre |\n| Bourse | Non | Non | Oui |\n\n**Choix de la forme** dépend de : nombre d'associés, capital disponible, niveau de risque acceptable, régime fiscal souhaité."
    },
    {
      "type": "example",
      "title_fr": "Cas pratique : choisir la forme juridique",
      "body_fr": "**Situation** : Trois amis veulent créer une startup de livraison de repas avec 60 000 DH de capital chacun.\n\n**Analyse** :\n- Nombre d'associés : 3 → élimine l'entreprise individuelle\n- Capital total : 180 000 DH → insuffisant pour une SA (min 300 000 DH)\n- Souhait de limiter la responsabilité personnelle → élimine la SNC\n\n**Choix** : **SARL** — 3 associés, capital 180 000 DH (> 1 DH minimum), responsabilité limitée à 180 000 DH.\n\n**Avantages SARL** : souplesse de gestion, protection du patrimoine personnel, fiscalité IS à 20-31%, possibilité de transformer en SA si croissance future.\n\n**Démarche de création** : rédiger les statuts, immatriculation au RCCM (Tribunal de Commerce), publication au Bulletin Officiel."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000102';

UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "L'environnement de l'entreprise",
      "body_fr": "L'entreprise évolue dans deux types d'environnement :\n\n**Macro-environnement** (analyse PESTEL) : facteurs qui s'imposent à l'entreprise sans qu'elle puisse les contrôler :\n- **P**olitique : stabilité, réglementation, fiscalité\n- **E**conomique : croissance, inflation, taux de change\n- **S**ocioculturel : démographie, valeurs, modes de consommation\n- **T**echnologique : innovation, R&D, numérisation\n- **E**cologique : réglementation environnementale, changement climatique\n- **L**égal : droit du travail, droit des sociétés, protection des consommateurs\n\n**Micro-environnement** : acteurs avec lesquels l'entreprise interagit directement (clients, fournisseurs, concurrents, partenaires, banques)."
    },
    {
      "type": "formula",
      "title_fr": "Analyse SWOT et Forces de Porter",
      "body_fr": "**Analyse SWOT** (synthèse stratégique) :\n- **S**trengths (Forces) : avantages internes\n- **W**eaknesses (Faiblesses) : limites internes\n- **O**pportunities (Opportunités) : facteurs externes favorables\n- **T**hreats (Menaces) : facteurs externes défavorables\n\n**5 Forces de Porter** (intensité concurrentielle) :\n1. Rivalité entre concurrents existants\n2. Menace de nouveaux entrants\n3. Menace des produits substituts\n4. Pouvoir de négociation des clients\n5. Pouvoir de négociation des fournisseurs\n\nPlus ces forces sont intenses → moins le secteur est attractif."
    },
    {
      "type": "example",
      "title_fr": "SWOT d'un hammam marocain",
      "body_fr": "**Forces** : savoir-faire ancestral, authenticité, coûts d'exploitation modérés, fidélité de la clientèle locale.\n\n**Faiblesses** : locaux vétustes, personnel peu formé, absence de marketing, réservation difficile.\n\n**Opportunités** : tourisme en forte croissance (15M visiteurs/an), mode du bien-être et du tourisme authentique, clientèle étrangère à fort pouvoir d'achat.\n\n**Menaces** : concurrence des spas modernes dans les hôtels, normes d'hygiène renforcées par l'État, pénurie d'eau (contrainte écologique).\n\n**Stratégie recommandée** : moderniser l'accueil et l'hygiène (investissement), créer une marque, proposer des offres packagées tourisme-hammam, tout en préservant l'authenticité qui est la vraie différenciation."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000103';

UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "La structure organisationnelle",
      "body_fr": "La **structure organisationnelle** définit comment le travail est divisé, coordonné et contrôlé au sein de l'entreprise.\n\n**Types de structures** :\n- **Fonctionnelle** : organisation par fonctions (Production, Marketing, Finance, RH). Simple, adaptée aux PME. Inconvénient : coordination difficile entre fonctions.\n- **Divisionnelle** : organisation par produit, marché ou zone géographique. Adaptée aux grandes entreprises diversifiées.\n- **Matricielle** : double hiérarchie (fonctionnel + projet). Flexibilité mais risque de conflits d'autorité.\n- **En réseau** : entreprise centrale + partenaires externalisés. Agile mais moins de contrôle.\n\n**L'organigramme** est la représentation graphique de la structure."
    },
    {
      "type": "formula",
      "title_fr": "Concepts clés de l'organisation",
      "body_fr": "**Étendue du contrôle (span of control)** : nombre de subordonnés dirigés par un responsable. Large = structure plate (communication rapide, moins de niveaux). Étroit = structure haute (contrôle fort, lent).\n\n**Centralisation vs décentralisation** :\n- Centralisée : décisions prises au sommet → cohérence mais lenteur\n- Décentralisée : décisions déléguées → réactivité mais risque de dispersion\n\n**Niveaux hiérarchiques** : sommet stratégique (DG) → cadres intermédiaires (directeurs) → base opérationnelle (employés).\n\n**Délégation d'autorité** : confier le pouvoir de décision à un subordonné tout en gardant la responsabilité finale."
    },
    {
      "type": "example",
      "title_fr": "La structure d'OCP Group",
      "body_fr": "**OCP Group** (Office Chérifien des Phosphates) utilise une **structure divisionnelle** :\n- Division Mines (extraction)\n- Division Chimie (transformation en engrais)\n- Division Commerciale (vente internationale)\n- Fonctions centralisées : Finance, RH, R&D (OCP Policy Center)\n\n**Avantages** : chaque division est autonome, centrée sur ses performances et ses marchés spécifiques. Facilite la mesure de la performance par division.\n\n**Inconvénients** : duplication des ressources entre divisions, risque de perte de cohérence du groupe.\n\n**Évolution** : OCP évolue vers une structure plus matricielle avec des projets transverses (Afrique, Green Ammonia) qui mobilisent plusieurs divisions simultanément."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000104';

UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Gestion des ressources humaines",
      "body_fr": "La **GRH** (Gestion des Ressources Humaines) a pour mission d'acquérir, développer et fidéliser les compétences nécessaires à l'entreprise.\n\n**Fonctions clés de la GRH** :\n1. **Recrutement** : définition du poste → sourcing → sélection (CV, entretien, tests) → intégration (onboarding)\n2. **Formation** : plan de formation annuel, OFPPT (opérateur public de formation professionnelle au Maroc)\n3. **Évaluation** : entretien annuel d'évaluation, gestion par objectifs (GPO)\n4. **Rémunération** : salaire de base + primes de performance + avantages\n5. **Gestion des carrières** : promotion, mobilité interne, plan de succession\n\n**SMIG 2024** : 15,33 DH/heure dans l'industrie et le commerce au Maroc."
    },
    {
      "type": "formula",
      "title_fr": "Le contrat de travail (Code du travail marocain)",
      "body_fr": "**Types de contrats** :\n- **CDI** (Contrat à Durée Indéterminée) : droit commun, rompu par démission ou licenciement\n- **CDD** (Contrat à Durée Déterminée) : cas limitatifs (remplacement, saisonnier, surcroît)\n- **Période d'essai** : CDI = 3 mois renouvelable 1 fois (employés) ; 6 mois (cadres)\n\n**Congé annuel** : 1,5 jour/mois travaillé = 18 jours/an minimum.\n\n**Indemnité de licenciement** (sans faute grave) :\n- 96 h de salaire × années 1-5\n- 144 h de salaire × années 6-10\n- 192 h de salaire × années au-delà de 10\n\nBase de calcul : 1/26 du salaire mensuel par heure."
    },
    {
      "type": "example",
      "title_fr": "Calcul de l'indemnité de licenciement",
      "body_fr": "**Cas** : Un employé avec 8 ans d'ancienneté, salaire mensuel 6 000 DH, licencié sans faute grave.\n\n**Calcul** :\n- Taux horaire : 6 000 / 26 × 8 heures/jour... \n  Plus simplement : 6 000 DH / 191,25 h = **31,37 DH/heure**\n- Années 1 à 5 : 5 × 96 × 31,37 = **15 059 DH**\n- Années 6 à 8 : 3 × 144 × 31,37 = **13 552 DH**\n- **Total indemnité ≈ 28 611 DH**\n\n**Préavis** : 1 mois (employés), 3 mois (cadres).\n\n**Procédure de licenciement** : convocation à un entretien préalable → notification écrite motivée → respect du préavis → versement de l'indemnité. Tout licenciement abusif expose l'employeur à des dommages-intérêts supplémentaires."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000105';

UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "La gestion de la production",
      "body_fr": "La **gestion de production** vise à produire la bonne quantité, au bon moment, au moindre coût, en respectant les délais et la qualité.\n\n**Systèmes de production** :\n- **Production à la demande** (pull) : Juste-à-Temps (JAT/JIT — Toyota) — zéro stock, production déclenchée par la commande client\n- **Production sur stock** (push) : MRP (Material Requirements Planning) — planification en fonction des prévisions\n- **Production en flux continu** : industries de process (cimenteries, raffineries)\n\n**Indicateurs de performance** :\n- **TRS** (Taux de Rendement Synthétique) = disponibilité × performance × qualité\n- **Taux de rebut** = unités défectueuses / total produit\n- **Délai de livraison** = temps entre commande et livraison"
    },
    {
      "type": "formula",
      "title_fr": "Gestion des stocks — Formule de Wilson",
      "body_fr": "La **quantité économique de commande** (formule de Wilson) minimise le coût total de gestion des stocks :\n\n$$Q^* = \\sqrt{\\frac{2 \\times D \\times C_l}{C_s}}$$\n\noù : $D$ = demande annuelle, $C_l$ = coût de lancement par commande, $C_s$ = coût de stockage annuel par unité.\n\n**Point de commande** :\n$$P_c = d \\times L + SS$$\noù : $d$ = consommation journalière, $L$ = délai de réapprovisionnement, $SS$ = stock de sécurité.\n\n**Coût total** = Coût d'achat + Coût de lancement ($\\frac{D}{Q} \\times C_l$) + Coût de stockage ($\\frac{Q}{2} \\times C_s$)."
    },
    {
      "type": "example",
      "title_fr": "Application de la formule de Wilson",
      "body_fr": "**Données** : Demande annuelle D = 3 600 unités, coût de lancement $C_l$ = 500 DH/commande, coût de stockage $C_s$ = 2 DH/unité/an.\n\n$$Q^* = \\sqrt{\\frac{2 \\times 3600 \\times 500}{2}} = \\sqrt{1\\ 800\\ 000} \\approx 1\\ 342\\;\\text{unités}$$\n\nNombre de commandes par an = 3 600 / 1 342 ≈ **2,7 commandes** → 3 commandes/an.\n\n**Point de commande** : délai de livraison = 15 jours, stock de sécurité = 50 unités, consommation = 10 unités/jour.\n$$P_c = 10 \\times 15 + 50 = 200\\;\\text{unités}$$\n→ Passer une commande quand le stock atteint 200 unités."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000106';

UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Le marketing mix (4P)",
      "body_fr": "Le **marketing mix** est l'ensemble des décisions opérationnelles qui matérialisent la stratégie marketing. Les **4P** :\n\n**1. Produit** : caractéristiques techniques, qualité, design, marque, emballage, service après-vente, cycle de vie (lancement → croissance → maturité → déclin).\n\n**2. Prix** : stratégies de tarification :\n- Écrémage (prix élevé → marché haut de gamme)\n- Pénétration (prix bas → conquérir des parts de marché)\n- Alignement (s'aligner sur la concurrence)\n\n**3. Distribution (Place)** : circuit direct (vente en propre), court (1 intermédiaire), long (plusieurs intermédiaires), e-commerce.\n\n**4. Communication (Promotion)** : publicité, promotion des ventes, marketing digital, relations publiques, mécénat."
    },
    {
      "type": "formula",
      "title_fr": "La démarche SCP (Segmentation-Ciblage-Positionnement)",
      "body_fr": "**Segmentation** : diviser le marché en groupes homogènes selon des critères :\n- Géographiques (région, ville)\n- Démographiques (âge, sexe, revenu)\n- Psychographiques (style de vie, valeurs)\n- Comportementaux (occasion d'achat, fidélité)\n\n**Ciblage** : choisir le(s) segment(s) à adresser selon attractivité et compétences de l'entreprise.\n\n**Positionnement** : place distinctive que l'entreprise souhaite occuper dans l'esprit du consommateur cible. Doit être : clair, credible, attractif, durable.\n\nExemple : « La voiture la plus sûre de sa catégorie » (Volvo). Le positionnement guide l'ensemble du mix."
    },
    {
      "type": "example",
      "title_fr": "Marketing mix : l'huile d'argan marocaine",
      "body_fr": "**Produit** : huile d'argan bio, certifiée cosmétique (ECOCERT), conditionnée en bouteilles premium 50/100 mL, marque locale avec storytelling des coopératives féminines berbères.\n\n**Prix** : stratégie d'**écrémage** → 200 à 500 DH/100 mL. Justifié par la rareté, la main-d'œuvre intensive et le positionnement haut de gamme.\n\n**Distribution** : boutiques de luxe à Marrakech/Casablanca, export vers Europe/Amérique du Nord, site e-commerce, Amazon, plateformes B2B pour hôtels et spas.\n\n**Communication** : Instagram et Pinterest (contenu visuel), participation aux salons cosmétiques internationaux (Cosmoprof), presse féminine, influence marketing.\n\n**Cohérence du mix** : tous les P sont alignés sur un positionnement premium/naturel/authentique → mix cohérent et efficace."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000107';

UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "La stratégie d'entreprise",
      "body_fr": "La **stratégie** est l'ensemble des décisions à long terme qui engagent les ressources de l'entreprise pour atteindre ses objectifs.\n\n**Niveaux de stratégie** :\n- **Corporate** (groupe) : portefeuille d'activités, diversification, intégration verticale/horizontale\n- **Business** (domaine d'activité) : comment se différencier de la concurrence\n- **Opérationnelle** (fonctions) : mise en œuvre\n\n**3 stratégies concurrentielles de Porter** :\n1. **Domination par les coûts** : être le moins cher (économies d'échelle, standardisation) → ex: Ryanair\n2. **Différenciation** : se distinguer par la qualité, l'innovation, le service → ex: Apple\n3. **Focalisation (niche)** : se concentrer sur un segment étroit → ex: Ferrari"
    },
    {
      "type": "formula",
      "title_fr": "Matrice d'Ansoff : stratégies de croissance",
      "body_fr": "La **matrice d'Ansoff** identifie 4 stratégies de croissance selon le marché et le produit :\n\n| | Marché actuel | Nouveau marché |\n|---|---|---|\n| **Produit actuel** | Pénétration de marché | Extension de marché |\n| **Nouveau produit** | Développement de produit | Diversification |\n\n- **Pénétration** : vendre plus aux clients actuels (moins risqué)\n- **Extension** : entrer dans de nouveaux marchés géographiques\n- **Développement** : innover pour les clients actuels\n- **Diversification** : tout nouveau (plus risqué)\n\n**Intégration verticale** : contrôler les étapes amont (fournisseurs) ou aval (distribution) de la chaîne de valeur."
    },
    {
      "type": "example",
      "title_fr": "La stratégie d'OCP Group",
      "body_fr": "**OCP Group** (Office Chérifien des Phosphates, Maroc) : stratégie de **différenciation + intégration verticale** :\n\n**Intégration verticale aval** : de l'export de phosphate brut (faible valeur ajoutée) vers la production d'engrais finis (DAP, MAP) via les usines de Jorf Lasfar et Safi. Valeur multipliée par 3-4.\n\n**Extension géographique** : déploiement en Afrique subsaharienne (vente directe aux agriculteurs, partenariats avec gouvernements africains — stratégie Africa).\n\n**Diversification** : investissement dans les énergies renouvelables (solaire, éolien) pour alimenter ses usines énergivores → réduction des coûts et de l'empreinte carbone.\n\n**Avantage concurrentiel durable** : contrôle de 70% des réserves mondiales de phosphates + montée en gamme vers l'agrochimie = barrière à l'entrée quasi-infranchissable."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000108';

UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Qualité et innovation",
      "body_fr": "La **qualité** est l'aptitude d'un produit ou service à satisfaire les besoins exprimés ou implicites du client tout en respectant les spécifications.\n\n**Démarche qualité totale (TQM)** : impliquer tout le personnel dans l'amélioration continue.\n\n**Outils qualité** :\n- **Roue de Deming (PDCA)** : Plan (planifier) → Do (faire) → Check (vérifier) → Act (améliorer)\n- **Diagramme d'Ishikawa (5M)** : identifier les causes d'un problème — Matière, Méthode, Machine, Main-d'œuvre, Milieu\n- **Diagramme de Pareto** : 20% des causes expliquent 80% des problèmes\n- **AMDEC** : Analyse des Modes de Défaillance, de leurs Effets et de leur Criticité\n\n**Normes ISO** : ISO 9001 (Système de Management de la Qualité), ISO 14001 (environnement)."
    },
    {
      "type": "formula",
      "title_fr": "Types d'innovation (Schumpeter)",
      "body_fr": "**Innovation** (Schumpeter) : moteur de la croissance économique par la « destruction créatrice ».\n\n**Types d'innovation** :\n- **Incrémentale** : amélioration progressive d'un produit/procédé existant (ex: nouvelle version d'un smartphone)\n- **Radicale (de rupture)** : changement majeur qui remet en cause le marché existant (ex: iPhone en 2007, Uber)\n- **De procédé** : nouveau mode de production (ex: imprimante 3D)\n- **Organisationnelle** : nouvelle façon d'organiser l'entreprise (lean management)\n- **De marché** : cibler un nouveau segment (ex: offres pour les seniors)\n\n**Coût de la non-qualité** = coûts de prévention + coûts de détection + coûts des défaillances internes/externes."
    },
    {
      "type": "example",
      "title_fr": "Amélioration qualité par Ishikawa et Pareto",
      "body_fr": "**Problème** : une usine de conserves a 30% de produits non conformes.\n\n**Diagramme d'Ishikawa** identifie les causes :\n- Machine (50%) : mauvais calibrage des machines de remplissage\n- Main-d'œuvre (30%) : formation insuffisante des opérateurs\n- Matière (10%) : qualité variable des boites fournisseurs\n- Méthode (10%) : procédures non respectées\n\n**Pareto** : les machines (50%) et la main-d'œuvre (30%) représentent 80% des problèmes → intervenir en priorité sur ces 2 causes.\n\n**Actions** :\n1. Recalibrer les machines → rejets passent de 30% à 10%\n2. Former les opérateurs → rejets à 5%\n\n**Résultat** : économie estimée à 500 000 DH/an, certification ISO 9001 obtenue → accès aux marchés export."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000109';
