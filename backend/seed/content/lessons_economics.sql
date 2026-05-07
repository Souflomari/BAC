-- ============================================================
-- Economics lesson content (Economie Generale et Statistiques)
-- 8 skills, IDs 094-101, Moroccan Bac syllabus
-- ============================================================

UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "La loi de l'offre et de la demande",
      "body_fr": "Le marché met en relation l'offre (producteurs) et la demande (consommateurs). **Loi de la demande** : quand le prix augmente, la quantité demandée diminue (relation inverse). **Loi de l'offre** : quand le prix augmente, la quantité offerte augmente (relation directe). L'équilibre de marché est le prix $P_{eq}$ où offre = demande. Un déséquilibre crée soit un surplus (offre > demande → prix baisse) soit une pénurie (demande > offre → prix monte)."
    },
    {
      "type": "formula",
      "title_fr": "Facteurs de déplacement des courbes",
      "body_fr": "**Déplacements de la demande** (sans changer le prix) : revenus des ménages, prix des biens substituts/complémentaires, préférences, anticipations.\n\n**Déplacements de l'offre** : coûts de production, technologie, nombre de producteurs, réglementation.\n\n**Prix plafond** (< $P_{eq}$) → pénurie. **Prix plancher** (> $P_{eq}$) → surplus.\n\n**Intervention de l'État** : subventions (déplace l'offre vers le bas), taxes (déplace l'offre vers le haut)."
    },
    {
      "type": "example",
      "title_fr": "Application : le marché du logement à Casablanca",
      "body_fr": "La demande de logements augmente (croissance démographique, rural→urbain) mais l'offre est rigide à court terme. Résultat : $P_{eq}$ monte, pénurie de logements abordables.\n\nOptions de politique publique :\n- **Augmenter l'offre** : programme Villes Sans Bidonvilles, logements sociaux\n- **Encadrer les loyers** (prix plafond) → risque de pénurie à long terme (moins de construction)\n- **Aides à la demande** : subventions aux ménages modestes (FOGARIM)\n\nConclusion : le libre marché seul ne garantit pas l'accès au logement pour tous → justification de l'intervention publique."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000094';

UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Les structures de marché",
      "body_fr": "Les marchés se distinguent par le nombre d'offreurs et de demandeurs :\n\n| Structure | Offreurs | Demandeurs | Exemple |\n|---|---|---|---|\n| **Concurrence parfaite** | Nombreux | Nombreux | Marché agricole |\n| **Monopole** | 1 | Nombreux | ONCF (rail) |\n| **Oligopole** | Quelques-uns | Nombreux | Télécom (IAM, Orange, Inwi) |\n| **Monopsone** | Nombreux | 1 | Marché de l'armement |\n\nConditions de la concurrence parfaite (5 conditions) : atomicité, homogénéité, libre entrée/sortie, transparence, mobilité des facteurs."
    },
    {
      "type": "formula",
      "title_fr": "Mesurer la concentration d'un marché",
      "body_fr": "**Indice IHH** (Herfindahl-Hirschman) :\n$$IHH = \\sum_{i=1}^{n} s_i^2$$\noù $s_i$ = part de marché de l'entreprise $i$ (en %).\n\n- IHH < 1 500 : marché peu concentré\n- 1 500 < IHH < 2 500 : concentration modérée\n- IHH > 2 500 : marché très concentré (oligopole/monopole)\n\n**Taux de concentration** $CR_k$ = somme des parts des $k$ plus grandes entreprises."
    },
    {
      "type": "example",
      "title_fr": "Le marché des télécoms au Maroc",
      "body_fr": "3 opérateurs : IAM (43%), Orange (33%), Inwi (24%).\n\n$IHH = 43^2 + 33^2 + 24^2 = 1849 + 1089 + 576 = 3514$ → marché **très concentré** (oligopole).\n\n**Comportements oligopolistiques** : interdépendance stratégique (chaque opérateur tient compte des réactions des autres), risque de collusion (entente sur les prix → interdit par la loi), concurrence par la différenciation (forfaits, qualité réseau, 4G/5G).\n\n**Rôle de l'ANRT** (Agence Nationale de Réglementation des Télécommunications) : réguler le marché, prévenir les abus de position dominante, protéger les consommateurs."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000095';

UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "L'élasticité prix de la demande",
      "body_fr": "L'élasticité mesure la **sensibilité** d'une variable économique à une autre. L'élasticité-prix de la demande ($E_d$) mesure la variation relative de la quantité demandée suite à une variation relative du prix.\n\n- Si $|E_d| > 1$ : demande **élastique** (luxe, substituts disponibles) — une hausse de prix réduit fortement les ventes\n- Si $|E_d| < 1$ : demande **inélastique** (nécessités, peu de substituts) — les ventes varient peu avec le prix\n- Si $|E_d| = 1$ : élasticité unitaire\n\nL'élasticité est généralement **négative** (loi de la demande)."
    },
    {
      "type": "formula",
      "title_fr": "Formules d'élasticité",
      "body_fr": "**Élasticité-prix de la demande :**\n$$E_d = \\frac{\\Delta Q_d / Q_d}{\\Delta P / P} = \\frac{\\% \\Delta Q_d}{\\% \\Delta P}$$\n\n**Élasticité-revenu :**\n$$E_r = \\frac{\\% \\Delta Q_d}{\\% \\Delta R}$$\n- $E_r > 0$ : bien normal ; $E_r > 1$ : bien supérieur\n- $E_r < 0$ : bien **inférieur** (la demande baisse quand le revenu monte)\n\n**Recette totale et élasticité :**\n- Demande élastique ($|E_d|>1$) : hausse du prix → baisse du CA\n- Demande inélastique ($|E_d|<1$) : hausse du prix → hausse du CA"
    },
    {
      "type": "example",
      "title_fr": "Calcul et interprétation",
      "body_fr": "Le prix du pain passe de 1,20 DH à 1,32 DH (+10%). La quantité demandée passe de 500 à 485 unités (-3%).\n\n$$E_d = \\frac{-3\\%}{+10\\%} = -0{,}3$$\n\n$|E_d| = 0{,}3 < 1$ → demande **inélastique** (le pain est un bien de première nécessité).\n\nPour un smartphone : prix passe de 5 000 à 5 500 DH (+10%), ventes de 10 000 à 8 000 (-20%).\n$$E_d = \\frac{-20\\%}{+10\\%} = -2$$\n$|E_d| = 2 > 1$ → demande **très élastique** → la hausse de prix réduit le CA : $5000 \\times 10000 = 50M$ DH → $5500 \\times 8000 = 44M$ DH."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000096';

UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "La monnaie et ses fonctions",
      "body_fr": "La monnaie remplit **3 fonctions** :\n1. **Unité de compte** : mesurer la valeur des biens (étalon de mesure)\n2. **Moyen de paiement** : intermédiaire dans les échanges (remplace le troc)\n3. **Réserve de valeur** : conserver du pouvoir d'achat dans le temps\n\n**Formes de monnaie** :\n- Monnaie fiduciaire : billets et pièces (émis par Bank Al-Maghrib)\n- Monnaie scripturale : dépôts bancaires, chèques, virements (85% des paiements)\n- Monnaie électronique : mobile banking (M-Cash, Orange Money)\n\n**Principe de création monétaire** : \"les crédits font les dépôts\" — chaque crédit bancaire crée de la monnaie scripturale."
    },
    {
      "type": "formula",
      "title_fr": "Agrégats monétaires et multiplicateur",
      "body_fr": "**Agrégats monétaires au Maroc** :\n- $M_1$ = billets + pièces + dépôts à vue\n- $M_2$ = $M_1$ + placements à vue et à court terme\n- $M_3$ = $M_2$ + dépôts à terme + titres OPC monétaires\n\n**Multiplicateur du crédit** :\n$$m = \\frac{1}{r}$$\noù $r$ = taux de réserves obligatoires.\n\nSi $r = 5\\%$ → $m = 20$ : 1 DH de monnaie banque centrale peut créer jusqu'à 20 DH de monnaie scripturale.\n\n**Outils de politique monétaire** (Bank Al-Maghrib) : taux directeur, réserves obligatoires, open market."
    },
    {
      "type": "example",
      "title_fr": "Politique monétaire expansive au Maroc",
      "body_fr": "**Contexte** : ralentissement économique post-Covid, inflation modérée.\n\n**Action** : Bank Al-Maghrib baisse son taux directeur de 3% à 2,25% (2020-2022).\n\n**Mécanisme de transmission** :\n1. Taux directeur baisse → banques empruntent moins cher à la BAM\n2. Banques baissent leurs taux de crédit → crédit moins cher pour entreprises et ménages\n3. Investissement et consommation augmentent\n4. Activité économique relancée, chômage réduit\n\n**Limite** : risque d'inflation si la masse monétaire croît trop vite. La BAM doit arbitrer entre relance et stabilité des prix (mandat : inflation < 2%)."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000097';

UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Le système financier marocain",
      "body_fr": "Le système financier assure le **financement de l'économie** en orientant l'épargne vers l'investissement.\n\n**Deux modes de financement** :\n- **Financement indirect** (intermédiation bancaire) : les banques collectent l'épargne et accordent des crédits\n- **Financement direct** (marché financier) : les agents émettent des titres (actions, obligations) achetés par les épargnants\n\n**Institutions clés au Maroc** :\n- Bank Al-Maghrib (banque centrale) : émission monétaire, supervision\n- AMMC (Autorité Marocaine du Marché des Capitaux) : régulation des marchés\n- Banques commerciales : Attijariwafa Bank, CIH, BMCE, BCP...\n- Bourse de Casablanca : marché des actions et obligations"
    },
    {
      "type": "formula",
      "title_fr": "Marchés financiers et instruments",
      "body_fr": "**Marché primaire** : émission de nouveaux titres (IPO — introduction en bourse). L'entreprise lève des fonds directement auprès des investisseurs.\n\n**Marché secondaire** : Bourse de Casablanca — échange de titres existants entre investisseurs. Assure la liquidité.\n\n**Indices boursiers marocains** :\n- MASI : toutes les valeurs cotées\n- MADEX : valeurs les plus liquides\n\n**Types de titres** :\n- **Actions** = titre de propriété, droit aux dividendes, risque élevé\n- **Obligations** = titre de créance à taux fixe, remboursement à terme, risque faible\n\n**Rendement d'une action** = (Dividende + Plus-value) / Prix d'achat"
    },
    {
      "type": "example",
      "title_fr": "Choix de financement d'une entreprise marocaine",
      "body_fr": "Une PME marocaine veut investir 5 millions DH. Trois options :\n\n**Option 1 — Crédit bancaire** : taux 6%/an, remboursement sur 5 ans. Annuité ≈ 1,15M DH/an. Avantage : capital non dilué. Inconvénient : charge financière obligatoire.\n\n**Option 2 — Introduction en bourse (actions)** : lève 5M DH sans remboursement. Avantage : pas de dette. Inconvénient : dilution du capital (les actionnaires veulent des dividendes), obligations de transparence.\n\n**Option 3 — Émission d'obligations** : taux 4%, 5 ans. Moins cher que le crédit bancaire, mais nécessite une notation financière.\n\n**Choix** : dépend du coût, du niveau d'endettement actuel, et de la stratégie de l'entreprise."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000098';

UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Le PIB et la croissance économique",
      "body_fr": "Le **PIB** (Produit Intérieur Brut) mesure la **valeur totale de la production** réalisée sur le territoire national pendant une année.\n\n**3 approches de calcul** :\n1. **Par la dépense** : PIB = C + I + G + (X - M)\n2. **Par la valeur ajoutée** : PIB = Σ VA de tous les secteurs + taxes - subventions\n3. **Par les revenus** : PIB = salaires + profits + impôts nets\n\n**Croissance économique** = variation du PIB **réel** (corrigé de l'inflation) :\n$$\\tau_{croissance} = \\frac{PIB_{t} - PIB_{t-1}}{PIB_{t-1}} \\times 100$$\n\nCroissance **extensive** (plus de facteurs) vs **intensive** (gains de productivité)."
    },
    {
      "type": "formula",
      "title_fr": "Valeur ajoutée et IDH",
      "body_fr": "**Valeur ajoutée** :\n$$VA = Production - Consommations\\;intermédiaires$$\n\n**PIB/habitant** = PIB / Population → mesure le niveau de vie moyen (mais pas les inégalités).\n\n**IDH** (Indice de Développement Humain, PNUD, 0 à 1) :\n$$IDH = \\sqrt[3]{I_{santé} \\times I_{éducation} \\times I_{revenu}}$$\n\n- $I_{santé}$ = espérance de vie normalisée\n- $I_{éducation}$ = scolarisation + alphabétisation\n- $I_{revenu}$ = RNB/habitant (log)\n\nIDH > 0,8 : développement élevé ; 0,5-0,8 : moyen ; < 0,5 : faible."
    },
    {
      "type": "example",
      "title_fr": "Le Maroc : croissance et développement",
      "body_fr": "**Données 2023** : PIB ≈ 1 400 milliards DH, taux de croissance ≈ 3,2%, population ≈ 37 millions → PIB/hab ≈ 37 800 DH/an ≈ 3 700 $/an.\n\n**IDH Maroc (2022)** ≈ 0,683 → rang 123/191 → développement **moyen**.\n\n**Paradoxe** : Le Maroc a une croissance honorable mais un IDH moyen → les fruits de la croissance ne sont pas équitablement répartis.\n\nFacteurs explicatifs :\n- Inégalités régionales (urbain/rural)\n- Taux d'alphabétisation encore insuffisant (surtout femmes, zones rurales)\n- Accès inégal aux soins de santé\n\nPolitiques sociales correctives : RAMED, Tayssir (allocations scolaires), programme Al Awfar (logement)."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000099';

UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Indicateurs de développement",
      "body_fr": "Le **développement** va au-delà de la croissance : il inclut le bien-être humain, la réduction des inégalités et la durabilité environnementale.\n\n**Limites du PIB** :\n- Ne mesure pas les inégalités (coefficient de Gini)\n- Ignore l'économie informelle (30-40% au Maroc)\n- Ne comptabilise pas le travail domestique\n- N'intègre pas la dégradation environnementale\n\n**Indicateurs complémentaires** :\n- **IDH** : santé + éducation + revenu\n- **Coefficient de Gini** : inégalités (0 = égalité parfaite, 1 = inégalité totale)\n- **Taux de pauvreté** : % de la population sous le seuil de pauvreté\n- **Indice de Progrès Social** (IPS) : besoins fondamentaux + bien-être + opportunités"
    },
    {
      "type": "formula",
      "title_fr": "Mesurer les inégalités",
      "body_fr": "**Coefficient de Gini** : mesure l'écart entre la distribution réelle des revenus et une distribution parfaitement égale.\n- Gini = 0 : égalité parfaite (chaque individu reçoit le même revenu)\n- Gini = 1 : inégalité totale (une seule personne reçoit tout)\n\n**Courbe de Lorenz** : représentation graphique des inégalités. L'aire entre la diagonale (égalité parfaite) et la courbe réelle = Gini/2.\n\n**Interprétation** : Gini Maroc ≈ 0,40 (inégalités modérées-élevées). Comparaison : Danemark ≈ 0,28, Brésil ≈ 0,53.\n\n**Taux de pauvreté** : % de personnes vivant avec moins de 1,90 $/jour (seuil mondial) ou seuil national."
    },
    {
      "type": "example",
      "title_fr": "Croissance sans développement : un paradoxe ?",
      "body_fr": "Un pays peut avoir un PIB/habitant élevé mais un IDH faible (ex : pays pétroliers avec forte inégalité). À l'inverse, un pays à faible revenu peut avoir un IDH élevé grâce à des politiques sociales fortes (ex : Cuba pour la santé/éducation).\n\n**Maroc** :\n- Croissance moyenne de 4% entre 2000-2019\n- Mais IDH stagne à rang moyen\n- Gini ≈ 0,40 → inégalités significatives\n\n**Politiques de développement durable** (ODD de l'ONU) : 17 objectifs à atteindre d'ici 2030. Le Maroc a adopté le Plan National de Développement Durable (PNDD) et investit dans les énergies renouvelables (Noor Ouarzazate — 580 MW solaires)."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000100';

UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Les échanges internationaux",
      "body_fr": "Le **commerce international** repose sur la théorie des **avantages comparatifs** (Ricardo, 1817) : chaque pays a intérêt à se spécialiser dans la production où il est **relativement** le plus efficace, même s'il est moins efficace en absolu dans tous les secteurs.\n\n**Balance commerciale** = Exportations - Importations\n- Excédent commercial : X > M → afflux de devises\n- Déficit commercial : X < M → sortie de devises (cas fréquent au Maroc)\n\n**Balance des paiements** = balance commerciale + balance des services (tourisme, transferts MRE) + balance des capitaux (IDE). La balance des paiements est toujours équilibrée au total."
    },
    {
      "type": "formula",
      "title_fr": "Instruments de politique commerciale",
      "body_fr": "**Protectionnisme** :\n- **Tarifs douaniers** : taxe sur les importations → protège les industries locales mais augmente les prix pour les consommateurs\n- **Quotas** : limitation des quantités importées\n- **Subventions aux exportateurs** : avantage concurrentiel artificiel\n- **Barrières non tarifaires** : normes techniques, sanitaires\n\n**Libre-échange** : défendu par l'OMC (Organisation Mondiale du Commerce).\n\n**Accords préférentiels du Maroc** :\n- ALECA (Maroc-UE) : accès privilégié au marché européen\n- Accord Agadir (pays arabes méditerranéens)\n- Accord de libre-échange Maroc-USA (2006)"
    },
    {
      "type": "example",
      "title_fr": "La balance commerciale marocaine",
      "body_fr": "**Exportations principales du Maroc** : phosphates et dérivés (OCP — 1er exportateur mondial), textile-habillement, automobiles (Renault-Tanger, Stellantis), agrumes, tourisme, transferts des MRE (≈ 110 milliards DH/an).\n\n**Importations principales** : énergie (pétrole, gaz — 30% des importations), biens d'équipement, produits alimentaires, véhicules.\n\n**Solde commercial 2022** : déficit ≈ 220 milliards DH (importations >> exportations).\n\n**Mais** la balance des paiements est moins déficitaire grâce aux recettes touristiques (80 milliards DH), transferts MRE, et IDE entrants.\n\nStratégie du Maroc : monter en valeur ajoutée (de l'export de phosphate brut aux engrais finis via OCP) et diversifier vers les énergies renouvelables."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000101';
