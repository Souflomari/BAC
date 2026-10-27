# 04 — SVT : filière SVT, filière PC, SM-A

> **Statut : brouillon v0, 2026-10-22, à discuter avec le propriétaire.** Les capacités citées
> (`svt-svt 3.2.4`, `svt-pc 1.1.8`, `svt-sma 2.1.3`) renvoient au référentiel officiel transcrit mot
> pour mot : [`docs/referentiel/svt-svt.yaml`](../referentiel/svt-svt.yaml),
> [`svt-pc.yaml`](../referentiel/svt-pc.yaml), [`svt-sma.yaml`](../referentiel/svt-sma.yaml). La
> vérification des cadres et des sujets 2026 est dans
> [`sources/verification-svt.md`](sources/verification-svt.md). Étiquettes : voir le
> [README](README.md). Tout ce qui est marqué **[À VÉRIFIER]** est une proposition de l'auteur.

---

## 1. Trois cadres, trois épreuves

La SVT n'est pas une matière, c'est **trois** épreuves différentes, avec trois cadres de
référence 2025 (note ministérielle 013-25) :

| | Filière SVT | Filière PC | SM-A |
|---|---|---|---|
| Coefficient · durée | **7** · 3 h [OFF-sujet NS 32F] | **5** · 3 h [OFF-sujet RS 34F 2024] (le corrigé 2026 imprime 4 h [NC]) | **3** · 2 h [OFF-sujet NS 36F] |
| Part de la moyenne générale | 15,2 % | 10,9 % | 6,5 % |
| Domaines | 6 : énergie · information génétique et génie génétique · transmission et génétique humaine · populations · immunologie · géologie | 4 : énergie · information génétique **et** transmission · **matières organiques et inorganiques** · géologie | 2 : transmission et génétique humaine · **biométrie** et populations |
| Ce qui décide la note | la **génétique** : 45 à 50 % (9-10 pts) | quatre domaines à 25 % (5 pts chacun) | deux domaines à 50 % |
| Source | [OFF] C-S1 p. 8-23 | [OFF] C-S2 p. 8-20 | [OFF] C-S3 p. 5-9 |

Part de la moyenne générale = 0,5 × coef / 23 (01 §6) : le national compte pour moitié, la somme
des coefficients est 23 dans les quatre filières. Les cadres n'impriment ni durée ni coefficient :
ils viennent des en-têtes des sujets.

### Comment l'épreuve est construite

Les trois épreuves ont la même charpente [OFF] (C-S1 p. 23, C-S2 p. 20, C-S3 p. 9) :

- **Partie I — Restitution des connaissances, 5 points**, sur **un seul** domaine (un seul
  sous-domaine en SM-A) : QCM, vrai / faux, appariement, sériation et classification, réponses
  courtes (définir, légender un schéma ou un graphique). Le format de réponse est imposé :
  « Recopiez les couples (1,…) ; (2,…) … ».
- **Partie II — Raisonnement scientifique et communication écrite et graphique, 15 points**, sur
  les domaines non évalués en Partie I :
  - **filière SVT** : si la Partie I porte sur la génétique, énergie 3 · génétique 5 · immunologie
    3-4 · géologie 3-4 ; sinon génétique **9** (un ou deux exercices) + deux exercices de 3 ;
  - **filière PC** : trois exercices de 5, un par domaine restant ;
  - **SM-A** : 10 points sur l'autre domaine + 5 points sur le reste du domaine de la Partie I.
- Matériel : calculatrice non programmable, **papier millimétré**.
- Habiletés : **25 % de restitution, 75 % de raisonnement** dans les trois cadres (C-S1 p. 20).

**Ce que 75 % veut dire.** Trois points sur quatre se gagnent en lisant des documents qu'on n'a
jamais vus (une maladie rare, une souris traitée à l'AICAR, une chaîne du Caucase) et en les
reliant au cours. Le cadre liste ce qu'on évalue : formuler un problème, proposer une hypothèse,
décrire et analyser des données, comparer, expliquer / interpréter, déduire, traduire des données
en tableau ou en graphique, réaliser un schéma fonctionnel ou de synthèse, **exprimer une opinion
et l'argumenter** (C-S1 p. 20). Une leçon qui expose le cours sans faire **travailler sur
documents** prépare au quart de l'épreuve.

**Ce que les sujets 2026 confirment** (détail dans `sources/verification-svt.md` §6) : une seule
matière par Partie I (2024 était mixte) ; en filière SVT, l'exercice de génétique **enchaîne trois
domaines sur une même maladie** (protéine → mutation → arbre → Hardy-Weinberg) ; les expériences
historiques sont des documents d'examen (Griffith, Avery, Hershey-Chase en filière PC 2026).

---

## 2. La méthode de la Partie II

C'est la notion transversale de la SVT, et elle doit avoir sa propre leçon (01 §6 la classe 3ᵉ en
filière SVT). Elle s'apprend **dans** chaque notion, mais ses gestes sont les mêmes partout.

### 2.1 Lire un document avant de répondre

1. **Le titre et la question d'abord** : que veut-on montrer, chez qui, dans quelles conditions ?
2. **Les axes et les unités** (min, UA, MPa, %, mmol/L), l'échelle (linéaire ou non), la légende.
3. **Le témoin** : quelle courbe, quel groupe, quel tube sert de référence ? (« Groupe témoin non
   injecté par AICAR », NS 32F 2026.)
4. **Ce qui varie et ce qui reste constant** : une seule variable change entre deux lots, sinon la
   comparaison ne prouve rien.

### 2.2 Les verbes de consigne, et ce qu'ils rapportent

| Verbe | Ce qu'on attend | Erreur qui coûte |
|---|---|---|
| **Décrire** | les variations **chiffrées, avec unités**, phase par phase (« de 100 UA à environ 50 UA après 5 min ») | décrire sans valeurs ; expliquer au lieu de décrire |
| **Comparer** | terme à terme, avec les valeurs des deux côtés, puis le sens de l'écart | ne citer qu'un côté |
| **Expliquer / interpréter** | le **mécanisme** qui produit l'observation (« inhibition du complexe IV → moins d'O₂ réduit → moins de H⁺ pompés → moins d'ATP ») | réciter le cours sans le relier au document |
| **Déduire** | une conclusion courte, qui découle de ce qui précède | conclure sans s'appuyer sur la question précédente |
| **Montrer que** | un raisonnement qui part du document et aboutit à l'énoncé | répéter l'énoncé |
| **Proposer une hypothèse** puis **vérifier** | une hypothèse **testable**, puis « l'hypothèse est vérifiée / n'est pas vérifiée » avec l'argument | oublier la phrase de vérification (0,25 pt dans les corrigés 2026) |
| **Exprimer son opinion** | une position argumentée avec des données (diagnostic prénatal, énergie nucléaire, polluants) | un avis sans argument, ou pas d'avis du tout |

Les corrigés officiels découpent au **quart de point** : dans le corrigé SVT 2026, la question
« comparez puis montrez » vaut 0,25 + 0,25 ; un échiquier vaut 0,25 (gamètes) + 0,25 (échiquier) +
0,25 (résultats) [OFF-sujet RB 32F, RA 36F 2026]. Chaque étape écrite rapporte ; une réponse
juste mais nue en perd la moitié.

### 2.3 Les productions graphiques

- **Le graphe sur papier millimétré** : titre ; axes nommés **avec unités** ; échelle respectée
  (elle est parfois imposée : « 1 cm pour 10 plantes et 0,5 cm pour chaque classe », NS 36F 2026) ;
  points placés à la règle ; légende si deux courbes. Polygone de fréquences : points au **centre**
  des classes, reliés par des segments.
- **L'échiquier de croisement** : phénotypes des parents entre crochets ; génotypes avec la
  notation à double trait (`A//a`, `X^N Y`, et `Gf//gF` pour des gènes liés) ; **gamètes avec
  leurs proportions** ; l'échiquier ; les résultats (phénotypes et proportions) ; la comparaison
  avec les résultats observés.
- **Le schéma légendé** : au crayon, traits de légende à la règle, horizontaux, sans se croiser ;
  un titre. Le schéma fonctionnel ou de synthèse relie les éléments par des flèches qui disent
  **ce qui cause quoi**.
- **Les calculs** : poser la formule, remplacer, donner le résultat avec la précision demandée
  (« cinq chiffres après la virgule », NS 32F 2026, Hardy-Weinberg).

### 2.4 Les façons classiques de perdre des points [PROPRE, d'après les corrigés 2026 ; À VÉRIFIER avec un correcteur]

1. Décrire sans chiffres, ou confondre décrire et expliquer.
2. Réciter un paragraphe de cours au lieu d'exploiter **le** document cité.
3. Un échiquier sans gamètes, sans proportions, ou avec la mauvaise notation.
4. Oublier le témoin, ou comparer deux lots qui diffèrent par deux variables.
5. Ne pas conclure : la phrase « donc… » est souvent notée seule.
6. En Partie I, ne pas respecter le format (recopier les couples, écrire « vrai » / « faux »).
7. Un graphe sans titre, sans unités, ou à une échelle non respectée.
8. Lire le brin d'ADN transcrit comme s'il était l'ARNm (voir la fiche « Expression »).

### 2.5 Ce que l'application doit en faire [À VÉRIFIER]

- Un **atelier de document** réutilisable : l'élève surligne la valeur, choisit le verbe, écrit sa
  phrase ; le retour compare à la grille officielle découpée au quart de point.
- Un **tracé guidé sur papier millimétré** (échelle, axes, points, polygone), puisque le papier
  millimétré est le seul matériel spécifique de l'épreuve.
- Un **échiquier interactif** commun à toutes les fiches de génétique.

---

## 3. Tableau d'ensemble

Poids : part de l'épreuve du domaine [OFF] (cadre, page). Fréquence : sujets où la notion fait
l'objet d'un exercice ou d'une Partie I — échantillon de 01 §3.6 (10 sujets filière SVT
2019-2025, [PROPRE]) complété par les sujets 2024 et 2026 relus. Difficulté : jugement de
l'auteur [À VÉRIFIER]. État : dossier `content/svt/<slug>` existant, ou « absente ».

| # | Notion | SVT | PC | SM-A | Poids [OFF] | Fréquence aux annales | Difficulté | État dans l'application |
|:-:|---|:-:|:-:|:-:|---|---|:-:|---|
| E1 | Respiration cellulaire et fermentation | ✓ | ✓ | — | SVT : domaine 1, 15 ou 25 % (C-S1 p. 22) ; PC : 25 % (C-S2 p. 19) | domaine énergie dans 9/10 sujets SVT + 2026 ; PC 2024 R, 2026 N (HCN) | moyenne | `liberation-energie-matiere-organique` (sans le rendement) |
| E2 | Le muscle strié squelettique | ✓ | ✓ | — | idem (même domaine) | 2019 N, 2024 N, 2025 N, 2025 R, 2026 N ; PC 2024 R (fibres I / II) | moyenne | **absente** |
| G1 | Nature de l'information génétique (mitose, ADN, réplication) | ✓ | ✓ | — | SVT : génétique 45-50 % (C-S1 p. 22) ; PC : 25 % | Partie I 2021 N, 2024 N ; PC 2024 R (Partie I), 2026 N (Griffith, Hershey-Chase) | moyenne | **absente** |
| G2 | Expression de l'information génétique (code, transcription, traduction, mutation) | ✓ | ✓ | — | idem | l'exercice « maladie génétique » de 2022 N à 2026 N (presque chaque sujet) ; PC 2024 R | haute | **absente** |
| G3 | Génie génétique | ✓ | — | — | génétique 45-50 % | non relevé dans l'échantillon [NT] | moyenne | **absente** |
| T1 | Méiose, fécondation, brassages (et cycles de développement en SM-A) | ✓ | ✓ | ✓ | SVT 45-50 % ; PC 25 % ; SM-A 50 % (C-S3 p. 8) | Partie I 2024 N, SM-A 2024 N, SM-A 2026 N ; PC 2024 R ; *Allomyces* SM-A 2026 | moyenne à haute | **absente** |
| T2 | Lois statistiques I : monohybridisme, lié au sexe, codominance, létal, dihybridisme indépendant | ✓ | ✓ | ✓ | idem | **chaque année** (croisements 2019-2026) ; PC 2026 (Mendel) | moyenne | `transmission-caracteres` (sans codominance, létal, lié au sexe hors Homme) |
| T3 | Lois statistiques II : gènes liés, crossing-over, carte factorielle | ✓ | ✓ | ✓ | idem | 2022 N (carte), 2023 N (maïs), SM-A 2026 N (fève) | haute | **absente** (différée dans `transmission-caracteres`) |
| T4 | Génétique humaine : arbres généalogiques | ✓ | — | ✓ | SVT 45-50 % ; SM-A 50 % | 2019 N, 2021 N, 2025 R, 2026 N | moyenne à haute | `genetique-humaine` |
| T5 | Caryotypes, anomalies chromosomiques, diagnostic prénatal | ✓ | — | ✓ | idem | Partie I 2024 N (Klinefelter), SM-A 2026 N | moyenne | **absente** |
| P1 | Génétique des populations : Hardy-Weinberg | ✓ | — | ✓ | SVT 45-50 % (recouvrement 11 %) ; SM-A 50 % | 2026 N (1/20 000) ; SM-A 2026 N (drépanocytose) | moyenne | `genetique-populations` |
| P2 | Facteurs de variation et notion d'espèce | ✓ | — | ✓ | idem | SM-A 2026 N (mutation, sélection, paludisme) | moyenne | partielle : `genetique-populations` R5 (sans l'espèce) |
| P3 | Biométrie | — | — | ✓ | SM-A 50 % | SM-A 2024 R (Partie I), SM-A 2026 N (5 pts) | moyenne | **absente** |
| I1 | Le soi et le non-soi | ✓ | — | — | immunologie 15-20 ou 25 % (C-S1 p. 22) | domaine immunologie dans 9/10 sujets + 2026 N (Partie I) | moyenne | `soi-non-soi` |
| I2 | Réponse immunitaire non spécifique (inflammation, phagocytose, complément) | ✓ | — | — | idem | 2026 N (Partie I : complément) | faible | partielle : `moyens-de-defense` R1-R3 (complément à peine) |
| I3 | Réponse immunitaire spécifique, coopération, mémoire | ✓ | — | — | idem | 2019 N, 2024 N (ASLO), 2026 N (Partie I) | haute | `moyens-de-defense` R4-R8 (sans organes ni maturation) |
| I4 | Dysfonctionnements : allergie, SIDA | ✓ | — | — | idem | 2019 N (VIH), 2024 N (allergie, Partie I), 2026 N (IgE, gp120) | moyenne | `dysfonctionnements-immunitaires` (+ auto-immunité, hors cadre) |
| I5 | Aides : vaccination, sérothérapie, greffe de moelle | ✓ | — | — | idem | 2019 N (vaccin) | faible à moyenne | partielle : `dysfonctionnements-immunitaires` R4-R6 (sans greffe de moelle) |
| Geo1 | Chaînes de subduction, d'obduction, de collision | ✓ | ✓ | — | SVT : 15-20 ou 25 % ; PC 25 % | domaine géologie dans 7/10 sujets + 2026 N (Petit Caucase) ; PC 2026 (Partie I) | moyenne | `chaines-de-montagnes` (sans obduction nommée) |
| Geo2 | Déformations : plis, failles, nappes de charriage | ✓ | ✓ | — | idem | 2026 N (failles inverses, chevauchements) ; PC 2026 (nappe de charriage) | moyenne | partielle : `granitisation-deformation` R1, `chaines-de-montagnes` R4 |
| Geo3 | Métamorphisme | ✓ | ✓ | — | idem | 2026 N (glaucophane, jadéite) ; PC 2026 (minéral index) | haute | partielle (pas de minéraux index) |
| Geo4 | Granitisation : anatexie et granite intrusif | ✓ | ✓ | — | idem | dans les Parties I de géologie [PROPRE, à recompter] | moyenne | partielle : `granitisation-deformation` (sans granite intrusif) |
| M1 | Ordures ménagères | — | ✓ | — | 25 % (C-S2 p. 19) | PC 2024 R (Partie I) | faible | **absente** |
| M2 | Pollutions des milieux naturels | — | ✓ | — | 25 % | PC 2024 R (margines, barrage Sahla), PC 2026 N (pergélisol) | moyenne | **absente** |
| M3 | Matières radioactives et énergie nucléaire | — | ✓ | — | 25 % | non relevé [NT] | moyenne | **absente** |
| M4 | Contrôle de la qualité et de la salubrité | — | ✓ | — | hors du tableau de spécification (C-S2 p. 19) | non relevé [NT] | faible | **absente** |

**Hors cadre mais présents dans l'application** : `role-enzymes` (aucune capacité ; prérequis de
3ème année collège, et outil de lecture des documents : SDH, MDH, LDH) et
`theorie-tectonique-plaques` (programme de 2ème année collège). Voir l'encadré à la fin.

**Ce que dit le tableau.** Sur 26 notions, **12 sont absentes**, **10 partielles** et 4 seulement
couvertes (T4, P1, I1, I4). La filière SVT
ne peut pas être servie sans le domaine 2 (G1-G3) : c'est l'exercice de génétique de chaque
année. La filière PC a un domaine entier à 25 % (M1-M4) qui n'existe pas dans l'application. La
SM-A attend la biométrie et les gènes liés.

---

## 4. Les fiches

### Domaine « consommation de la matière organique et flux d'énergie »

---

### E1. Respiration cellulaire et fermentation   (`liberation-energie-matiere-organique`)

**Filières et poids.** Filière SVT : `svt-svt 1.1.1` à `1.1.10`, `1.3.1` ; filière PC : `svt-pc
1.1.1` à `1.1.10`, `1.3.1`. Domaine 1 : 15 ou 25 % de l'épreuve SVT (3 ou 5 pts, C-S1 p. 22),
25 % en PC (5 pts, C-S2 p. 19) ; recouvrement 17 % (SVT), 25 % (PC). Absente en SM-A. Fréquence :
le domaine énergie est dans 9 sujets SVT sur 10 (2019-2025) [PROPRE 01] et en 2026 N ; en PC,
2024 R (endurance, 5 pts) et 2026 N (manioc et HCN, 5 pts) [OFF-sujet].

**Ce que le bac demande.** Comparer respiration et fermentation à partir d'expériences ; relier
chaque étape à sa structure (hyaloplasme, matrice, membrane interne, sphères pédonculées) ;
établir les bilans ; **calculer le rendement** (`svt-svt 1.1.8`) ; représenter graphiquement ;
faire le schéma de synthèse. Formes qui reviennent : courbes d'O₂ et de CO₂ en enceinte fermée
(ExAO) avec levures ou mitochondries isolées ; ajout d'un substrat ou d'un inhibiteur (HCN sur le
complexe IV, PC 2026) ; tableaux d'activité enzymatique (SDH, MDH, LDH, citrate synthase) ;
Partie I : « définir la chaîne respiratoire » (2024 N), « définir la fermentation lactique »,
« sens des protons H⁺ » (2024 R). Notation marocaine : coenzymes **RH₂** (ou R'H₂), bilan
**2 + 2 + 34 = 38 ATP** (document 5 du RS 34F 2024) [OFF-sujet].

**L'idée-clé.** Le glucose est oxydé par étapes ; les électrons arrachés descendent la chaîne
respiratoire jusqu'au **dioxygène**, et cette descente pompe des protons ; leur retour par l'ATP
synthase fabrique l'ATP. Sans O₂, la chaîne s'arrête ; la fermentation ne sert qu'à **régénérer
les coenzymes** pour que la glycolyse continue : 2 ATP au lieu de 38.
*Image-clé :* la mitochondrie comme un **barrage** — des pompes remontent l'eau (les H⁺) dans
l'espace intermembranaire, la seule turbine (l'ATP synthase) la laisse redescendre en produisant.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Respiration à l'échelle de l'organe (échanges gazeux) | 3ème année collège | « La respiration, c'est seulement inspirer et expirer ? » (non : c'est aussi une réaction dans chaque cellule) | 3AC, respiration [À VÉRIFIER : contenu exact] |
| Production de la matière organique (photosynthèse, ATP) | 1ère Bac | « D'où vient l'énergie stockée dans le glucose ? » | 1ère Bac, production de la matière organique |
| Structure de la cellule, organites | collège | « Où se trouve la mitochondrie, et combien de membranes a-t-elle ? » | rappel illustré [À VÉRIFIER] |
| Oxydation = perte d'électrons | 1ère Bac PC (oxydoréduction) [SEC 01 §1.4] | « Le glucose est-il oxydé ou réduit dans la respiration ? » | PC, oxydoréduction ; lien `content/pc/piles/lesson.md` |
| Lire une courbe à deux axes, unités | tronc commun | « Que vaut la pente d'une courbe d'O₂ qui baisse de 20 % en 5 min ? » | atelier de document (§2) |
| Pourcentage, rapport | collège | « 38 × 30,5 / 2 860 ≈ ? en % » | calcul guidé |

**Conceptions erronées et pièges.**
- *« L'ATP est une réserve d'énergie »* (inventaire de `items.yaml`). Tentant : on dit « molécule
  énergétique ». **Pari** : un muscle au repos contient-il de quoi tenir une heure d'effort en ATP ?
  La révélation (quelques secondes seulement) oblige à voir l'ATP comme une monnaie qui circule.
- *« Le dioxygène fournit les électrons »* ou *« alimente directement l'ATP synthase »*. Le
  confronter par le barrage : O₂ est **en bas** de la chute, c'est l'accepteur final.
- *« La fermentation, c'est l'affaire des bactéries »* — les fibres de type II (2026 N) et le
  sprinter la pratiquent.
- *« Respiration = respirer »* : la confusion de vocabulaire avec le collège.
- Bilan compté à moitié : un seul pyruvate au lieu de deux, l'investissement de 2 ATP oublié,
  coenzymes comptés comme de l'ATP.
- Piège de copie : localiser une étape au mauvais endroit (Krebs dans le hyaloplasme).
- *À trancher :* la leçon actuelle attribue à l'acide lactique « la sensation de brûlure et la
  fatigue musculaire » ; la physiologie récente nuance ce rôle [À VÉRIFIER avant de l'enseigner
  comme un fait].

**Représentations.**
- **Figure-clé pas à pas : « le barrage à protons »** (12 étapes) — glucose → 2 pyruvates →
  matrice → Krebs charge les RH₂ → les RH₂ cèdent leurs électrons → trois pompes → H⁺ entassés →
  ATP synthase. **Paris** : (1) « on perce la membrane interne : l'O₂ continue-t-il d'être
  consommé ? l'ATP continue-t-il d'être produit ? » (oui / non, découplage) ; (2) « on bloque le
  dernier complexe avec du cyanure : que deviennent O₂ et ATP ? » (exactement l'exercice PC 2026).
- **Simulation ExAO** : une enceinte de levures, courbes d'O₂ et de CO₂ qui se tracent ; l'élève
  ajoute du glucose, ferme l'arrivée d'air, ajoute un inhibiteur. Pari avant chaque geste.
- **Manipulable « compteur d'atomes et d'ATP »** : faire passer 6 carbones et compter les ATP et
  les RH₂ à chaque étape ; le calcul du rendement en sort (`svt-svt 1.1.8`). Valeurs usuelles des
  manuels : 2 860 kJ par mole de glucose, 30,5 kJ par mole d'ATP [À VÉRIFIER sur le manuel
  marocain] ; le rendement se calcule, il ne s'apprend pas.
- **Expérience réelle** : levure de boulanger dans un ballon (eau sucrée, avec et sans air) ; le
  ballon gonfle, l'odeur d'alcool. Simple, faisable à la maison [À VÉRIFIER : sécurité, vidéo].
- **Analogie** : la monnaie (ATP) contre le compte en banque (glycogène, graisses) ; limite : une
  monnaie ne « contient » pas d'énergie au sens physique.

**Histoire et personnages.**
① **Lavoisier et Laplace, 1783** : un cobaye dans un calorimètre à glace ; « la respiration est
donc une combustion, à la vérité fort lente » (phrase attribuée) [S]
([Calorimetry](https://en.wikipedia.org/wiki/Calorimetry)).
② **Pasteur, 1861** : des micro-organismes vivent sans oxygène libre — « la vie sans air »
(formulation variable) [S] ; **Buchner, 1897** : un jus de levure sans cellule fermente encore
le sucre ; Nobel 1907 [V] ([Eduard Buchner](https://en.wikipedia.org/wiki/Eduard_Buchner)).
**Peter Mitchell** propose la chimiosmose en 1961, jugée hérétique, et la défend depuis un
laboratoire privé en Cornouailles ; Nobel 1978 [V]
([Peter D. Mitchell](https://en.wikipedia.org/wiki/Peter_D._Mitchell)). C'est le moment où ça a
coincé : personne ne trouvait l'intermédiaire chimique ; la réponse était un **gradient**.
③ **Krebs, 1937** : la lettre sur le cycle refusée par *Nature*, publiée ailleurs ; Nobel 1953
[S] ([The Scientist](https://www.the-scientist.com/uncategorized/nature-rejects-krebss-paper-1937-43452)).
Source commune : 02 §5.3.

**Pour aller plus loin.** Le cyanure et le complexe IV (le konzo du manioc mal préparé, PC 2026) ;
les maladies mitochondriales (NARP, 2023 N) ; l'entraînement d'endurance et la VMA (2024 R) ; le
pain, le lben, le yaourt : des fermentations du quotidien [À VÉRIFIER : quel micro-organisme
pour chaque produit].

**Liens.** E2 (le muscle consomme l'ATP) ; G2 (les enzymes du cycle sont des protéines codées par
des gènes : les myopathies mitochondriales) ; M1 (compostage et méthanisation = respiration et
fermentation des décomposeurs) ; M2 (eutrophisation : la respiration des décomposeurs vide l'eau
de son O₂) ; chimie : oxydoréduction et piles (`content/pc/piles/lesson.md`).

**À trancher.** Notation des coenzymes : NADH,H⁺ (leçon actuelle) ou RH₂ (sujets marocains) ?
Bilan : 38 (sujets) ou « 36 à 38 » (leçon) ?

---

### E2. Le muscle strié squelettique : contraction et régénération de l'ATP   (absente de l'application)

**Filières et poids.** `svt-svt 1.2.1` à `1.2.9` (« Rôle du muscle strié squelettique dans la
conversion de l'énergie ») ; `svt-pc 1.2.1` à `1.2.9` (« … dans le transfert d'énergie ») ;
schéma bilan `1.3.1`. Même domaine que E1 (3 ou 5 pts en SVT, 5 en PC). Fréquence : au moins
2019 N, 2024 N, 2025 N (sarcopénie), 2025 R (myofibrille), **2026 N** (fibres I et II, AICAR, 3 pts)
en filière SVT [PROPRE 01 + OFF-sujet] ; **2024 R** en filière PC (endurance, fibres I et II,
5 pts).

**Ce que le bac demande.** Analyser des **myogrammes** (secousse, tétanos parfait et imparfait) ;
comparer une fibre au repos et contractée (électronographies : longueurs des bandes) ; relier les
phénomènes thermiques et chimiques (consommation d'O₂ et de glucose, chaleur) à la contraction ;
expliquer le mécanisme (actine, myosine, ATP, Ca²⁺) ; **déduire les voies de régénération de
l'ATP** (phosphocréatine, fermentation lactique, respiration) et leur lien avec le **type
d'effort** (`svt-svt 1.2.8`). Le motif récurrent : un tableau « fibres de type I / type II »
(mitochondries, myoglobine, capillaires, SDH, MDH, LDH, résistance à la fatigue) puis une
expérience (entraînement, molécule) qui change leur proportion (2024 R, 2026 N).

**L'idée-clé.** Les filaments ne raccourcissent pas : ils **glissent** les uns sur les autres.
Chaque tête de myosine s'accroche à l'actine, pivote, et **ne se décroche qu'en fixant un ATP** ;
le Ca²⁺ découvre les sites d'accrochage. L'ATP est consommé en quelques secondes et régénéré par
trois voies de vitesse et d'endurance différentes.
*Image-clé :* le sarcomère, deux disques Z qui se rapprochent ; la bande A garde sa longueur, la
bande I et la zone H rétrécissent.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Muscles, tendons, antagonisme | 3ème année collège (système musculaire) | « Un muscle peut-il pousser un os ? » | 3AC, système musculaire |
| Commande nerveuse | 1ère Bac (communication nerveuse) | « Qu'est-ce qui déclenche une secousse : un message nerveux ou chimique ? » | 1ère Bac, communication nerveuse |
| ATP, respiration, fermentation | 2ème Bac, E1 | « Combien d'ATP par glucose en fermentation ? » | E1 |
| Lire une électronographie et mesurer avec une échelle | tronc commun | « Une barre de 1 µm mesure 2 cm : combien mesure une bande de 3 cm ? » | atelier d'échelle [À VÉRIFIER] |
| Travail, puissance, énergie (pour le rendement musculaire) | 1ère Bac PC | « Énergie mécanique / énergie consommée : comment s'appelle ce rapport ? » | PC, travail et énergie |

**Conceptions erronées et pièges.**
- *« Les filaments se contractent comme des ressorts »*. **Pari** sur la figure-clé : « quand le
  muscle se contracte, quelle bande garde sa longueur ? A, I ou H ? » — la mesure sur deux
  électronographies tranche.
- *« L'ATP sert à contracter ; pour se relâcher, il n'en faut pas »*. **Pari** : « un muscle
  privé d'ATP reste-t-il contracté ou relâché ? » — il reste bloqué (c'est la rigidité
  cadavérique) : l'ATP sert d'abord à **décrocher**.
- *« Le calcium fournit l'énergie »* : il ne fait que libérer les sites.
- *« Le muscle stocke beaucoup d'ATP »* : quelques secondes ; c'est la phosphocréatine qui
  tamponne.
- *« Fibres de type II = muscle faible »* : rapides et puissantes, mais vite fatiguées.
- Piège de copie : confondre secousse isolée, tétanos imparfait (secousses partiellement
  fusionnées) et tétanos parfait (plateau lisse) sur un myogramme.

**Représentations.**
- **Figure-clé pas à pas : le sarcomère** (12 étapes) — myofibrille → sarcomère → actine et myosine
  → arrivée du Ca²⁺ → accrochage → pivot → ATP → décrochage → réarmement → glissement mesuré.
  **Paris** : la bande qui garde sa longueur ; le muscle sans ATP.
- **Manipulable « degré de contraction »** : un curseur rapproche les disques Z ; une règle mesure
  A, I, H en direct. Le curseur rend évidente la règle « A constante » (un seul paramètre).
- **Animation du cycle des têtes de myosine** (4 temps), rejouable, lente (1,5 à 2 s par
  changement, 02 §3.2).
- **Simulation du myogramme** : un curseur de fréquence de stimulation ; secousses isolées →
  tétanos imparfait → tétanos parfait. Pari : « à 10 stimulations par seconde, le tracé sera-t-il
  lisse ? ».
- **Manipulable « trois robinets d'ATP »** : durée d'effort en abscisse (secondes → heures), part
  de la phosphocréatine, de la fermentation et de la respiration ; le sprinter et le marathonien
  posés sur le même axe. Pari : « à 30 s d'effort maximal, quelle voie domine ? ».
- **Expérience réelle** : vidéo de TP d'enregistrement d'un myogramme (ExAO) [À VÉRIFIER :
  disponibilité d'une vidéo sans expérimentation animale à l'écran].

**Histoire et personnages.**
① Le sujet NS 32F 2026 ouvre lui-même sur l'histoire : « À la fin du XIXème siècle, des
chercheurs ont observé chez le lapin la présence des muscles colorés en rouge et d'autres plus
pâles » [OFF-sujet] — les deux types de fibres.
② **1954** : deux équipes (A. Huxley et Niedergerke ; H. Huxley et Hanson, deux Huxley sans lien
de parenté) proposent indépendamment le **glissement des filaments** [V]
([Sliding filament theory](https://en.wikipedia.org/wiki/Sliding_filament_theory)). L'obstacle :
on croyait que la contraction était un raccourcissement des molécules elles-mêmes.
③ **Lipmann** invente la notation « ~ » de la liaison riche en énergie de l'ATP [V]
([Fritz Lipmann](https://en.wikipedia.org/wiki/Fritz_Lipmann)). Source commune : 02 §5.3.

**Pour aller plus loin.** L'AICAR, molécule interdite par l'Agence mondiale antidopage en 2009
selon le sujet 2026 [OFF-sujet] ; les myopathies (dystrophine, dysferline : 2022 R, 2024 R) ; la
sarcopénie du vieillissement (2025 N) ; les coureurs de fond marocains et l'entraînement en
altitude [À VÉRIFIER : n'en faire un exemple que sourcé].

**Liens.** E1 (les trois voies) ; G2 (myopathie = mutation d'une protéine du muscle) ; PC
mécanique (travail et puissance d'une contraction) ; 1ère Bac, communication nerveuse.

**À trancher.** Créer une leçon dédiée (proposé) ou un acte de plus dans
`liberation-energie-matiere-organique` ? La place du muscle dans le cadre (un sous-domaine
entier, 9 capacités) plaide pour une leçon.

---

### Domaine « nature de l'information génétique et mécanisme de son expression »

---

### G1. Nature de l'information génétique : localisation, mitose, ADN, réplication   (absente de l'application)

**Filières et poids.** `svt-svt 2.1.1` à `2.1.7`, `2.1.10` ; `svt-pc 2.1.1` à `2.1.7`, `2.1.10`.
Filière SVT : domaine 2 (recouvrement 18 %), compté dans la génétique (45-50 % de l'épreuve,
C-S1 p. 22). Filière PC : domaine 2, 25 % (C-S2 p. 19). Absente en SM-A. Fréquence : Partie I
2021 N (information génétique), 2024 N (QCM : chromosome en métaphase, réplication
semi-conservative en phase S) [PROPRE 01, OFF-sujet] ; PC 2024 R (Partie I : chromosome en G1,
« yeux de réplication ») ; **PC 2026 N** (Griffith, Avery, Hershey-Chase, 5 pts avec le
monohybridisme) [OFF-sujet].

**Ce que le bac demande.** Déduire que l'information est dans le noyau (greffes, transferts de
noyau) ; reconnaître et ordonner les phases de la mitose ; construire le **cycle cellulaire** et
la courbe de quantité d'ADN (q → 2q → q) ; déterminer la nature chimique du matériel génétique
à partir d'expériences ; relier chromosome et molécule d'ADN ; montrer le rôle de la réplication
dans la stabilité de l'information ; schémas de la mitose et de l'ADN. Formes : QCM de Partie I
(nombre de chromatides, état de condensation selon la phase) ; courbes de quantité d'ADN par
cellule ; autoradiographies ; expériences historiques à interpréter.

**L'idée-clé.** L'information héréditaire est une **séquence** écrite dans l'ADN ; avant chaque
division, l'ADN est copié (chaque brin sert de modèle : réplication **semi-conservative**), puis la
mitose partage les copies à égalité : les deux cellules filles reçoivent exactement la même
information.
*Image-clé :* la courbe de quantité d'ADN par cellule (q, montée en phase S, 2q, chute à
l'anaphase), alignée sur le dessin du chromosome (une chromatide, puis deux).

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Cellule, noyau, chromosomes | collège | « Où sont les chromosomes d'une cellule animale ? » | rappel illustré |
| Hérédité humaine : chromosomes, caryotype | 2ème année collège [SEC 9rayti] | « Combien de chromosomes dans une cellule humaine ? » | 2AC, hérédité chez l'Homme |
| Complémentarité A-T, C-G | 2ème année collège ou tronc commun [À VÉRIFIER] | « Brin : ATTGC ; brin complémentaire ? » | mini-atelier de complémentarité |
| Isotopes (¹⁵N, ³²P, ³⁵S) | 2ème Bac PC, noyaux | « Qu'ont en commun ³²P et ³¹P ? » | `content/pc/noyaux-masse-energie/lesson.md` |
| Lire un graphe en escalier | tronc commun | « Que veut dire un palier à 2q ? » | atelier de document |

**Conceptions erronées et pièges.**
- *« Un chromosome a toujours la forme d'un X »* : le X, c'est un chromosome **dupliqué**, en
  métaphase. Pari : « en G1, combien de chromatides par chromosome ? ».
- *« La mitose double l'ADN »* : c'est la phase S ; la mitose le partage.
- *« Chromatide et chromosome, c'est pareil »* : les QCM jouent exactement là (2024 N, 2024 R).
- *« Les cellules d'un même individu ont des ADN différents, puisqu'elles font des choses
  différentes »* : même ADN, gènes exprimés différemment.
- *« La réplication garde la molécule mère intacte »* (modèle conservatif) : c'est le pari de
  Meselson et Stahl.
- Piège de copie : 2n et la quantité d'ADN confondus (une cellule 2n en G2 contient 2q).

**Représentations.**
- **Figure-clé pas à pas : la courbe q → 2q → q** (12 étapes), le chromosome dessiné sous chaque
  point. **Pari** : « où placer la mitose sur cette courbe ? ».
- **Simulation Meselson-Stahl (pari sur la position des bandes).** Trois modèles (conservatif,
  semi-conservatif, dispersif) ; l'élève fait glisser les bandes dans un tube de centrifugation
  avant chaque révélation : après une génération en ¹⁴N, puis deux. Révélation : une bande
  intermédiaire, puis une intermédiaire et une légère, comme dans l'expérience de 1958 [V].
- **3D : la double hélice** — l'idée est spatiale (deux brins antiparallèles, bases appariées à
  l'intérieur), conforme à la règle de l'ADR 0041. L'élève « dézippe » la molécule et voit chaque
  brin servir de modèle.
- **Enquête pas à pas : Griffith → Avery → Hershey-Chase**, avec un pari à chaque étape (« où ira
  la radioactivité : surnageant ou culot ? »). C'est exactement l'exercice PC 2026.
- **Manipulable « phases de la mitose »** : remettre dans l'ordre des photos de pointe de racine
  (sériation, format de Partie I).
- **Expérience réelle** : extraction d'ADN de banane ou d'oignon (sel, liquide vaisselle, alcool
  froid) ; observation de mitoses dans une pointe de racine d'ail ou d'oignon [À VÉRIFIER :
  protocole et vidéo].

**Histoire et personnages.**
① **Miescher, 1869**, isole la « nucléine » à partir du pus de bandages [V]
([Friedrich Miescher](https://en.wikipedia.org/wiki/Friedrich_Miescher)) ; **Flemming** décrit
la division du noyau chez la salamandre (publications dès 1878, livre *Zellsubstanz, Kern und
Zelltheilung*, 1882) et l'appelle mitose, du grec « fil » [V]
([Walther Flemming](https://en.wikipedia.org/wiki/Walther_Flemming)).
② **Griffith, 1928** : un « principe transformant » des pneumocoques tués transforme des
bactéries vivantes ; **Avery, MacLeod et McCarty, 1944** : ce principe est l'ADN [V]
([Griffith's experiment](https://en.wikipedia.org/wiki/Griffith%27s_experiment)) ; **Hershey et
Chase, 1952**, séparent virus et bactéries au mixeur [V] (02 §5.3). L'obstacle : on pensait que
seules les protéines étaient assez variées pour porter l'hérédité.
③ **Photo 51**, prise par Raymond Gosling sous la direction de Rosalind Franklin le 2 mai 1952,
montrée à Watson par Wilkins « sans que Franklin le sache » ; l'article de Watson et Crick paraît
dans *Nature* le 25 avril 1953, dans le même numéro que ceux de Wilkins et de Franklin-Gosling [V]
([Photo 51](https://en.wikipedia.org/wiki/Photo_51)). **Meselson et Stahl, 1958** : l'expérience
qu'on a appelée « la plus belle expérience de la biologie » (mot attribué à John Cairns) [V]
([Meselson–Stahl](https://en.wikipedia.org/wiki/Meselson%E2%80%93Stahl_experiment)).

**Pour aller plus loin.** Les tests ADN (paternité, police scientifique) ; le cancer comme cycle
cellulaire déréglé [À VÉRIFIER : niveau de détail acceptable] ; la longueur d'ADN d'une cellule
humaine [À VÉRIFIER avant de citer un chiffre].

**Liens.** G2 (la séquence lue) ; T1 (méiose contre mitose) ; PC 2ème Bac : isotopes et
radioactivité (`content/pc/decroissance-radioactive/lesson.md`) ; maths : après n générations
dans Meselson-Stahl, la fraction de molécules hybrides est 2/2ⁿ (suites géométriques,
`content/maths/suites-numeriques/lesson.md`).

---

### G2. Expression de l'information génétique : gène, code, transcription, traduction, mutation   (absente de l'application)

**Filières et poids.** `svt-svt 2.1.8`, `2.1.9`, `2.2.1` à `2.2.4` ; `svt-pc 2.1.8`, `2.1.9`,
`2.2.1` à `2.2.4`. Dans la génétique (45-50 %) en filière SVT, 25 % en PC. Fréquence : **la notion
la plus tirée de la SVT** — l'exercice « une maladie, une protéine, un gène » est présent dans
presque chaque sujet SVT de 2022 à 2026 (myopathie, maladie de Fabry, agammaglobulinémie, SOD1,
dysferline, Walker-Warburg, épidermolyse bulleuse en 2026) [PROPRE 01 + OFF-sujet] ; PC 2024 R
(progranuline). En SM-A, hors cadre, mais le sujet 2026 donne des séquences HbA / HbS à comparer.

**Ce que le bac demande.** Montrer la relation **caractère – protéine – gène** à partir de
documents ; à partir d'un fragment d'ADN et du tableau du code génétique, **écrire l'ARNm et la
séquence d'acides aminés** ; identifier la mutation (substitution, délétion, insertion) et ses
conséquences (faux-sens, non-sens, décalage du cadre de lecture) ; décrire la transcription et
la traduction (initiation, élongation, terminaison) ; schéma de synthèse. Barème 2026 :
séquences « personne saine » 0,5 + « personne malade » 0,5 + explication 0,5 [OFF-sujet RB 32F].

**L'idée-clé.** Un gène est une suite de nucléotides ; il est **transcrit** en ARNm, puis
**traduit**, trois nucléotides (un codon) par acide aminé, en une protéine dont la forme fait la
fonction, et la fonction fait le caractère. Une mutation change une lettre ; elle change ou non un
acide aminé, et donc, ou non, le caractère.
*Image-clé :* les trois lignes alignées des sujets — brin d'ADN, ARNm, acides aminés —, avec la
lettre mutée qui se propage d'une ligne à l'autre.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Structure de l'ADN, complémentarité | 2ème Bac, G1 | « Brin transcrit TAC ; ARNm ? » (AUG) | G1 |
| Une protéine = une chaîne d'acides aminés | collège (alimentation) [À VÉRIFIER] | « Une protéine est-elle faite de sucres, de lipides ou d'acides aminés ? » | rappel |
| Lire un tableau à double entrée | collège | « Dans le tableau du code, que donne UGA ? » | atelier « décodeur » |
| Gène, allèle, caractère | 2ème année collège | « Deux allèles d'un même gène diffèrent-ils de beaucoup de lettres ? » | 2AC, hérédité |

**Conceptions erronées et pièges.**
- **Le piège de copie numéro un : le brin.** Les sujets donnent tantôt le **brin non transcrit**
  (« fragments de brins non transcrits », NS 32F 2026 : il se lit comme l'ARNm, T → U), tantôt le
  **brin transcrit** (TAC… en SM-A 2026 : on prend le complémentaire). **Pari** systématique :
  « ce brin, faut-il le complémenter ou seulement remplacer T par U ? ».
- *« Une mutation change toujours la protéine »* : le code est redondant (mutation silencieuse).
  Pari dans l'atelier : « CGA → CGG : la protéine change-t-elle ? ».
- *« Une mutation = une maladie »* ; *« une mutation arrive parce que l'organisme en a besoin »*.
- *« Le ribosome fabrique les acides aminés »* ; *« le codon est sur l'ARNt »* (c'est
  l'anticodon).
- *« Le gène, c'est la protéine »*.
- Piège : oublier l'arrêt de la lecture au codon STOP (le malade de 2026 n'a que 4 acides aminés).

**Représentations.**
- **Manipulable « atelier de mutation »** (la représentation centrale) : l'élève modifie une lettre
  de l'ADN ; l'ARNm, la chaîne d'acides aminés et un indicateur de fonction de la protéine se
  mettent à jour. Paris : silencieuse, faux-sens, non-sens, décalage — chacun avant révélation.
- **Figure-clé pas à pas : la traduction au ribosome** (14 étapes), sites P et A comme dans le
  document 6 du sujet 2026 ; **pari** : « le codon UGA arrive au site A : que se passe-t-il ? » ;
  puis le cas de la gentamicine qui force la lecture (translecture) [OFF-sujet NS 32F 2026].
- **Animation de la transcription** (ouverture de la double hélice, ARN polymérase), lente et
  rejouable.
- **« Décodeur »** : le tableau du code interactif ; on tape un ARNm, on lit la protéine.
- **Pari historique de Nirenberg** : « un ARN fait seulement de U, quelle protéine ? »
  (révélation : une chaîne de phénylalanine).

**Histoire et personnages.**
① **Garrod, 1902** : l'alcaptonurie, « erreur innée du métabolisme », plus fréquente chez les
enfants de cousins germains — le premier lien entre un gène et une réaction chimique [V] (02 §5.3).
② **Nirenberg et Matthaei, 1961** : « à 3 heures du matin, le 27 mai 1961 », Matthaei voit un ARN
fait seulement d'uracile produire une protéine faite seulement de phénylalanine ; le groupe de
Nirenberg décode tous les codons en 1966 [V]
([Nirenberg and Matthaei experiment](https://en.wikipedia.org/wiki/Nirenberg_and_Matthaei_experiment)).
L'obstacle : comment quatre lettres codent-elles vingt acides aminés ? (réponse : par trois).
③ Ce que ça a changé : on lit une maladie dans une séquence — c'est le format de chaque sujet.

**Pour aller plus loin.** La drépanocytose, mutation d'une seule lettre (SM-A 2026) ; les
antibiotiques qui visent le ribosome bactérien (la gentamicine, 2026) ; les vaccins à ARN
messager comme « message » donné à la cellule [À VÉRIFIER : formulation simple et exacte].

**Liens.** G1 ; G3 (le code est universel, d'où le génie génétique) ; T4 (la maladie dans
l'arbre) ; P1-P2 (la même mutation à l'échelle d'une population, HbS) ; E2 (myopathies) ;
I3 (anticorps = protéines).

---

### G3. Le génie génétique : principes et techniques   (absente de l'application)

**Filières et poids.** `svt-svt 2.3.1` à `2.3.3` — **filière SVT seulement** (ni PC, ni SM-A).
Compté dans la génétique (45-50 %). Fréquence : aucun exercice de génie génétique relevé dans
l'échantillon de 01 [NT] ; la Partie I peut l'interroger (définitions) [À VÉRIFIER sur
2016-2018].

**Ce que le bac demande.** Dégager les étapes d'un transfert de gène et en déduire la notion de
**modification génétique**, à partir d'un exemple précis : le transfert **naturel** de gènes
d'*Agrobacterium tumefaciens* à une plante, et les techniques de transfert d'un gène à une
bactérie ; déduire l'importance du génie génétique (production industrielle de l'**insuline
humaine**, de **protéines toxiques contre les insectes nuisibles**) ; schéma des étapes.

**L'idée-clé.** Le code génétique est **le même** chez la bactérie, la plante et l'Homme : un gène
coupé dans un organisme et collé dans un autre y est lu de la même façon, et l'organisme receveur
fabrique la protéine étrangère.
*Image-clé :* le « couper-coller » — des ciseaux moléculaires qui coupent à une séquence précise
en laissant des bouts collants, une colle (ligase), un anneau (plasmide) qui transporte le gène.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Code génétique, traduction | 2ème Bac, G2 | « Le codon AUG donne-t-il le même acide aminé chez une bactérie ? » | G2 |
| Bactérie, structure simple | collège (immunologie, 3AC) | « Une bactérie a-t-elle un noyau ? » | rappel |
| Spécificité d'une enzyme | 3ème année collège (digestion) ; `role-enzymes` | « Une enzyme agit-elle sur n'importe quelle molécule ? » | `content/svt/role-enzymes/lesson.md` |
| Insuline et glycémie | 1ère Bac (communication hormonale) | « Que fait l'insuline sur la glycémie ? » | 1ère Bac, régulation de la glycémie |

**Conceptions erronées et pièges.**
- *« La bactérie devient humaine »* : elle fabrique **une** protéine humaine, rien de plus.
- *« Les enzymes de restriction coupent n'importe où »*. Pari dans l'atelier : « deux enzymes
  différentes : les bouts collants s'apparient-ils ? ».
- *« Manger un OGM, c'est manger des gènes qui vont nous modifier »* — à traiter sans
  militantisme, en distinguant la question biologique et la question de société.
- *« *Agrobacterium* est une maladie, donc inutilisable »* : c'est justement sa capacité naturelle
  à transférer de l'ADN qui sert d'outil.

**Représentations.**
- **Manipulable « atelier couper-coller »** : choisir l'enzyme, trouver ses sites sur une séquence,
  couper, faire glisser le fragment vers le plasmide, coller ; seuls les bouts complémentaires
  s'emboîtent. Pari avant chaque collage.
- **Figure-clé pas à pas : *Agrobacterium*** (10 étapes) — galle du collet → plasmide Ti → T-DNA
  transféré dans le noyau végétal → plasmide « désarmé » portant un gène utile → plante
  transgénique. **Pari** : « la plante transgénique transmet-elle le gène à ses graines ? »
  [À VÉRIFIER : réponse attendue au niveau du programme].
- **Simulation de sélection** : boîtes de culture avec antibiotique ; quelles colonies poussent ?
  (seules les bactéries qui ont reçu le plasmide).
- **Frise** : extraction de l'insuline animale → insuline produite par des bactéries.

**Histoire et personnages.**
① Avant le génie génétique, l'insuline des diabétiques était extraite de pancréas d'autres
animaux, surtout de bovins et de porcs [V]
([Insulin (medication)](https://en.wikipedia.org/wiki/Insulin_(medication))).
② Les premières publications sur l'ADN recombinant viennent de Stanford et de l'UCSF en 1972 et
1973 ; Paul Berg en est l'un des auteurs (Nobel de chimie 1980) [V]
([Recombinant DNA](https://en.wikipedia.org/wiki/Recombinant_DNA)). Le transfert d'ADN de
plasmide dans des cellules végétales par *Agrobacterium* est publié en 1977 (premier auteur
Mary-Dell Chilton) [V, d'après la référence citée]
([Agrobacterium tumefaciens](https://en.wikipedia.org/wiki/Agrobacterium_tumefaciens)).
③ **1978** : Genentech produit de l'insuline humaine dans *E. coli* et la concède à Eli Lilly ;
approbation en 1982 (la même page donne 1982 puis 1983 pour Humulin : dire « au début des années
1980 ») [V]. **Bt** : *Bacillus thuringiensis* découvert en 1902 chez le ver à soie par Ishiwatari,
redécouvert en 1911 en Thuringe par Berliner ; maïs Bt approuvé en 1996 [V]
([Bacillus thuringiensis](https://en.wikipedia.org/wiki/Bacillus_thuringiensis)).

**Pour aller plus loin.** Les vaccins produits par des levures ou bactéries modifiées [À
VÉRIFIER] ; la thérapie génique ; le débat sur les OGM, avec les arguments des deux côtés.

**Liens.** G2 (universalité du code) ; I5 (vaccins) ; 1ère Bac (insuline) ; `role-enzymes`
(spécificité).

**À trancher.** Le cadre ne cite ni enzyme de restriction ni ligase ni plasmide : ce sont les
« techniques et étapes de transfert d'un gène à une bactérie » (`svt-svt 2.3.1`). Jusqu'où les
détailler ? Proposition : le couper-coller conceptuel, sans liste d'enzymes [À VÉRIFIER].

---

### Domaine « transmission de l'information génétique par reproduction sexuée – génétique humaine »

---

### T1. Méiose, fécondation et brassages (et, en SM-A, cycles de développement)   (absente de l'application)

**Filières et poids.** `svt-svt 3.1.1` à `3.1.4` ; `svt-pc 2.3.1` à `2.3.4` ; `svt-sma 1.1.1` à
`1.1.5` (la SM-A ajoute « Cycles de développement et cycles chromosomiques », C-S3 p. 5). Génétique
45-50 % (SVT), 25 % (PC), domaine 1 = 50 % (SM-A). Fréquence : Partie I 2024 N (SVT), 2024 R (PC :
crossing-over en prophase I, méiose donne quatre cellules haploïdes), SM-A 2024 N (méiose,
caryotype, différences entre brassages), SM-A 2026 N (Partie I + **cycle d'*Allomyces***, 2 pts)
[OFF-sujet].

**Ce que le bac demande.** Décrire et reconnaître les phases de la méiose ; analyser des
caryotypes ; déduire le rôle de la méiose et de la fécondation dans le **brassage** des allèles
(interchromosomique et intrachromosomique), le **maintien du caryotype** et la **diversité** ;
schémas des phases. SM-A : analyser un cycle de développement, réaliser le cycle chromosomique,
en déduire le type (haplophasique, diplophasique, haplodiplophasique). Formes de Partie I : QCM
sur les quantités d'ADN (q, 2q, 4q), le nombre de tétrades, l'état des chromosomes à chaque
anaphase, la formule chromosomique (2n = 11AA + X, 2n = 38AA + ZZ).

**L'idée-clé.** Une réplication, puis **deux** divisions : la première sépare les chromosomes
**homologues** (2n → n), la seconde sépare les **chromatides**. Comme chaque paire s'oriente au
hasard (brassage interchromosomique) et que les homologues échangent des segments (crossing-over,
brassage intrachromosomique), chaque gamète est presque unique ; la fécondation rétablit 2n en
réunissant deux gamètes pris au hasard.
*Image-clé :* deux paires de chromosomes homologues (un de chaque parent, deux couleurs) à la
métaphase I, qui peuvent se retourner.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Mitose, chromatide / chromosome, q / 2q | 2ème Bac, G1 (SVT, PC) ; à enseigner directement en SM-A | « Après la phase S, combien de chromatides par chromosome ? » | G1 (version courte pour la SM-A) |
| Gamètes, fécondation | 2ème année collège (reproduction) | « Un spermatozoïde humain a-t-il 46 ou 23 chromosomes ? » | 2AC, reproduction |
| Cycles de développement des plantes (SM-A) | tronc commun (BIOF) [SEC 9rayti] | « Chez une fougère, le prothalle est-il haploïde ou diploïde ? » | TC, cycles de développement |
| Puissances de 2, dénombrement | collège ; maths 1ère Bac | « Avec 3 paires, combien de gamètes différents sans crossing-over ? » (8) | `content/maths/denombrement/lesson.md` |

**Conceptions erronées et pièges.**
- *« La méiose, c'est deux mitoses »* : la première division est **réductionnelle**.
- *« Homologues = chromatides sœurs »* : la confusion qui fausse tout le reste. Pari : « le
  crossing-over se fait-il entre chromatides sœurs ou entre homologues ? ».
- *« La réduction a lieu à la deuxième division »* (le QCM SM-A 2026 joue là-dessus).
- *« Une cellule haploïde a des chromosomes à une seule chromatide »* : en métaphase II, haploïde
  **et** bichromatidienne (QCM SM-A 2026).
- *« Les gamètes d'une même personne sont identiques »*.
- Piège de copie : quantités d'ADN (une cellule 2n en G2 = 4q si le gamète vaut q, QCM SM-A 2024).

**Représentations.**
- **Simulation de la méiose avec chromosomes à glisser** (la représentation centrale) : l'élève
  place lui-même les paires sur la plaque équatoriale, dans l'orientation qu'il veut ; la
  simulation sépare, puis compte les types de gamètes. **Paris** : « avec 2 paires, combien de
  types de gamètes ? avec 3 ? » (4, 8 : la loi 2ⁿ émerge) ; « avec 23 paires ? ».
- **Animation du crossing-over** : chiasma entre chromatides **non sœurs** ; pari : « après un
  crossing-over, combien des 4 gamètes sont recombinés ? » (2).
- **Figure-clé pas à pas : la courbe d'ADN de la méiose** (12 étapes : 2q → 4q → 2q → q, avec
  les cellules dessinées), pari : « où le nombre de chromosomes est-il divisé par deux ? ».
- **SM-A — « la roue du cycle »** : un cercle où l'élève place la méiose et la fécondation ; la
  part haploïde et diploïde se colore ; type du cycle en sortie. Pari sur *Allomyces* (2026).
- **Expérience réelle** : écrasement d'anthère et observation de la méiose [À VÉRIFIER : vidéo de
  microscopie libre de droits].

**Histoire et personnages.**
① **Sutton (1902-1903)**, chez la sauterelle, voit des paires de chromosomes maternels et
paternels qui « may constitute the physical basis of the Mendelian law of heredity » ; **Boveri**
y arrive de son côté chez l'oursin [V]
([Boveri–Sutton](https://en.wikipedia.org/wiki/Boveri%E2%80%93Sutton_chromosome_theory)).
② L'obstacle : les « facteurs » de Mendel n'avaient pas d'adresse ; la méiose leur en donne une.
③ **Morgan, 1915** : les travaux sur la drosophile apportent la « preuve incontestable » de la
théorie chromosomique [V] (même source).

**Pour aller plus loin.** Pourquoi deux frères ne sont jamais identiques (sauf jumeaux
monozygotes) ; les plantes à cycles « étranges » (fougères, champignons) comme en SM-A 2026.

**Liens.** G1 (mitose) ; T2-T3 (ce que la méiose fait aux allèles) ; T5 (une erreur de méiose =
une anomalie de nombre) ; maths : dénombrement et 2ⁿ (`content/maths/denombrement/lesson.md`).

---

### T2. Lois statistiques I : monohybridisme, hérédité liée au sexe, codominance, gène létal, dihybridisme à gènes indépendants   (`transmission-caracteres`, partielle)

**Filières et poids.** `svt-svt 3.2.1`, `3.2.2` (gènes indépendants), `3.2.3` (brassage
interchromosomique) ; `svt-pc 2.4.1` à `2.4.3` ; `svt-sma 1.2.1` à `1.2.3`. Génétique 45-50 %
(SVT), 25 % (PC), 50 % (SM-A). Fréquence : **un exercice de croisements chaque année** en filière
SVT (2019 N à 2026 N, 3 à 4,5 pts) [PROPRE 01 + OFF-sujet] ; PC 2026 N (lisse / ridé) ; SM-A
2026 N (dominance chez la fève).

**Ce que le bac demande.** Analyser et interpréter la transmission **d'un couple d'allèles** (gène
lié au sexe et non lié au sexe) et de **deux couples** (gènes indépendants) ; vérifier les lois de
Mendel ; reconnaître dominance, **codominance**, **gène létal** ; lignée pure, hybride,
test-cross ; échiquier ; schématiser le brassage interchromosomique. Le sujet 2026 (hamster
syrien) cumule tout : croisements **réciproques** qui diffèrent (lié à l'X), femelles « noir
tacheté de jaune » (codominance), gène autosomal de la longueur des poils, indépendance des deux
gènes (chromosomes différents).

**L'idée-clé.** Chaque parent transmet **un** allèle de chaque gène, au hasard (une chance sur
deux) ; pour deux gènes indépendants, les probabilités se **multiplient**. Le rapport observé
dans la descendance (3:1, 1:2:1, 2:1, 1:1, 9:3:3:1, 1:1:1:1) dit quel modèle est en jeu.
*Image-clé :* l'échiquier comme un **carré de probabilités** — les cases ont des aires (¼, ⅛,
1/16) ; un rapport est une somme d'aires.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Méiose : un allèle par gamète | 2ème Bac, T1 | « Un parent A//a donne quels gamètes, dans quelles proportions ? » | T1 |
| Gène, allèle, dominant, récessif | 2ème année collège | « Un allèle récessif peut-il s'exprimer ? » | 2AC, hérédité |
| XX, XY | 2ème année collège | « Un fils reçoit son X de qui ? » | 2AC |
| Fractions, produit de probabilités | collège ; maths 2ème Bac | « ½ × ½ = ? et ½ + ½ = ? : laquelle répond à "A et B" ? » | `content/maths/probabilites-conditionnelles/lesson.md` |

**Conceptions erronées et pièges.** (inventaire de `items.yaml` de la leçon, plus le cadre)
- *« Même phénotype, même génotype »* ; *« deux parents gris ne peuvent pas avoir un petit
  blanc »*.
- *« Deux allèles différents donnent un intermédiaire »* — vrai en codominance, faux en
  dominance : il faut le **déduire** du document, pas le supposer.
- *« Un rapport 2:1, c'est une erreur d'expérience »* : c'est la signature d'un **gène létal**.
  Pari : « 3:1 attendu, 2:1 observé : que manque-t-il ? ».
- *« Les croisements réciproques donnent toujours la même F1 »* : faux si le gène est sur l'X ;
  c'est **le** test du lien au sexe (2026).
- *« On additionne les probabilités »* pour « et ».
- Notation : `X^N Y` (pas d'allèle sur le Y) ; crochets pour les phénotypes, double trait pour les
  génotypes.

**Représentations.**
- **Échiquier interactif** (commun à toute la génétique) : l'élève glisse les gamètes, les cases
  se remplissent, les phénotypes se comptent et se comparent aux résultats du document.
- **Simulation « 1 000 descendants »** : des gamètes tirés au hasard ; le rapport observé approche
  9:3:3:1. **Pari** : « avec 16 descendants, verra-t-on exactement 9:3:3:1 ? » (non : la loi
  émerge du nombre).
- **Figure-clé pas à pas : les croisements réciproques sur l'X** (10 étapes, hamster 2026 ou
  drosophile aux yeux blancs) ; pari : « les deux F1 sont-elles identiques ? ».
- **Manipulable « carré des aires »** : un carré dont on découpe les côtés en proportions de
  gamètes ; l'aire de chaque case est la probabilité.

**Histoire et personnages.**
① **Mendel** cultive environ 28 000 plantes de 1856 à 1863, présente ses résultats à Brno en
février et mars 1865, publie en 1866 ; ignoré, il est redécouvert en 1900 par de Vries, Correns
et Tschermak [V] (02 §5.3).
② Le moment où ça a coincé : 34 ans de silence — les biologistes ne lisaient pas de rapports
statistiques.
③ **Morgan, 1910** : un mâle aux yeux blancs parmi des drosophiles aux yeux rouges ; ses
croisements montrent un caractère lié au sexe, « probablement porté par l'un des chromosomes
sexuels » (1911) ; Nobel 1933 [V]
([Thomas Hunt Morgan](https://en.wikipedia.org/wiki/Thomas_Hunt_Morgan)).

**Pour aller plus loin.** Les chattes « écaille de tortue » (même logique que le hamster de 2026)
[À VÉRIFIER : mécanisme exact avant de l'utiliser] ; la sélection des races animales et végétales.

**Liens.** T1 ; T3 (quand les gènes ne sont plus indépendants) ; T4 (le même raisonnement sur une
famille) ; P1 (l'échiquier des gamètes d'une population) ; I1 (ABO : codominance A et B) ; maths :
probabilités (`content/maths/probabilites-conditionnelles/lesson.md`).

**À trancher.** Ajouter codominance, gène létal et hérédité liée au sexe (hors de l'Homme) à
`transmission-caracteres`, ou en faire un acte séparé ?

---

### T3. Lois statistiques II : gènes liés, crossing-over, carte factorielle   (absente de l'application)

**Filières et poids.** `svt-svt 3.2.2` (gènes liés), `3.2.3` (brassage intrachromosomique),
`3.2.4` ; `svt-pc 2.4.2` à `2.4.4` ; `svt-sma 1.2.2` à `1.2.4`. Au cadre **des trois filières**.
Fréquence : 2022 N (gènes liés, carte factorielle, 4,5 pts), 2023 N (maïs, 4 pts) [PROPRE 01] ;
SM-A 2026 N (fève : test-cross 49 / 49 / 1 / 1) [OFF-sujet].

**Ce que le bac demande.** Reconnaître deux gènes liés à partir d'un test-cross (quatre classes
**inégales** : deux parentales majoritaires, deux recombinées minoritaires) ; schématiser le
crossing-over ; **calculer la distance** (pourcentage de recombinés, en centimorgans) ; établir la
**carte factorielle** (ordre et distances de trois gènes). Notation des gènes liés :
`Gf//gF` (SM-A 2026) ou avec barres.

**L'idée-clé.** Deux gènes sur le même chromosome voyagent ensemble, sauf si un crossing-over se
produit **entre eux** ; plus ils sont éloignés, plus c'est fréquent. La proportion de
recombinés mesure donc une distance — et les distances s'additionnent sur une ligne.
*Image-clé :* deux loci sur un chromosome, et l'endroit où le crossing-over « tombe » : entre eux
(recombinés) ou ailleurs (parentaux).

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Crossing-over en prophase I | 2ème Bac, T1 | « Entre quelles chromatides se fait-il ? » | T1 |
| Test-cross et dihybridisme indépendant (1:1:1:1) | 2ème Bac, T2 | « Test-cross d'un double hétérozygote, gènes indépendants : proportions ? » | T2 |
| Pourcentages, distances additives | collège | « A-B = 8, B-C = 5, A-C = 13 : quel gène est au milieu ? » | atelier de carte |

**Conceptions erronées et pièges.**
- *« Quatre classes, donc gènes indépendants »* : il faut regarder les **proportions**.
- *« Les recombinés sont les phénotypes "nouveaux" »* : ils sont définis par rapport aux
  **chromosomes du parent hybride** ; en répulsion (`Gf//gF`, SM-A 2026), les classes majoritaires
  ressemblent à des « mélanges ». Pari : « dans ce croisement, quelles classes sont
  recombinées ? ».
- *« La distance se calcule sur les seuls recombinés »* : sur le total.
- *« Un crossing-over se produit toujours entre deux gènes liés »*.
- Liaison totale : deux classes seulement (cas classique du mâle de drosophile) [À VÉRIFIER :
  présence dans les sujets marocains].

**Représentations.**
- **Manipulable « curseur de distance »** (la représentation centrale) : l'élève fait glisser le
  locus B le long du chromosome ; une simulation de 1 000 méioses (crossing-over à position
  aléatoire) affiche le pourcentage de recombinés. **Pari** : « à distance double, deux fois plus
  de recombinés ? » (oui, tant que la distance reste petite).
- **Figure-clé pas à pas : interpréter un test-cross de gènes liés** (12 étapes : parents →
  gamètes parentaux → crossing-over → gamètes recombinés → échiquier avec le testeur → quatre
  classes → distance).
- **Le puzzle de Sturtevant** : trois distances, trois gènes à placer sur une ligne ; pari sur
  l'ordre avant de vérifier l'additivité.

**Histoire et personnages.**
① Morgan voit des caractères qui « restent ensemble » plus souvent que Mendel ne le prévoit.
② **Sturtevant, 1911**, étudiant dans la « salle des mouches » : « I went home, and spent most of
the night (to the neglect of my undergraduate homework) in producing the first chromosome map »
(publiée en 1913) [V] (02 §5.3).
③ Ce que ça a changé : la position des gènes devient mesurable avant même de savoir ce qu'est un
gène.

**Pour aller plus loin.** La logique de la carte factorielle sert encore à localiser des gènes de
maladies [À VÉRIFIER : formulation].

**Liens.** T1, T2 ; maths : proportions et additivité ; P3 (sélection de variétés : la fève de
SM-A 2026).

**À trancher.** Une leçon dédiée (proposé : c'est au cadre des trois filières, et la leçon
actuelle le reporte explicitement).

---

### T4. Génétique humaine : arbres généalogiques et maladies héréditaires   (`genetique-humaine`)

**Filières et poids.** `svt-svt 3.3.1` ; `svt-sma 1.3.1`. Pas en filière PC. Génétique 45-50 %
(SVT), 50 % (SM-A). Fréquence : 2019 N (maladie héréditaire), 2021 N (Tay-Sachs), 2025 R (arbre),
**2026 N** (épidermolyse bulleuse : autosomale récessive, probabilité pour un fœtus) [PROPRE 01 +
OFF-sujet] ; SM-A 2026 N (Partie I : définir l'arbre généalogique ; vrai / faux sur la
consanguinité).

**Ce que le bac demande.** Analyser un arbre pour déduire le mode de transmission (dominant ou
récessif ; autosomal, lié à l'X, lié au Y) ; attribuer les génotypes ; calculer une probabilité
(un enfant à naître, un fœtus) à l'aide d'un échiquier. Barème 2026 : mode de transmission 0,5
(deux arguments de 0,25), probabilité 0,75 (gamètes 0,25, échiquier 0,25, conclusion 0,25)
[OFF-sujet RB 32F].

**L'idée-clé.** Un arbre est un ensemble de croisements déjà faits ; on cherche **le couple
décisif** : deux parents sains avec un enfant malade → récessif ; une fille malade d'un père sain
→ l'allèle récessif n'est pas sur l'X ; etc. Puis on calcule, en tenant compte de **ce qu'on sait
déjà** sur la personne.
*Image-clé :* l'arbre avec une « fenêtre de test » posée sur le trio décisif.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Monohybridisme, lié au sexe, échiquier | 2ème Bac, T2 | « Mère porteuse X^A X^a, père sain : probabilité d'un fils atteint ? » | T2 |
| Symboles d'un arbre | 2ème année collège [À VÉRIFIER] | « Un carré noir, c'est qui ? » | lexique illustré |
| Probabilité conditionnelle | maths 2ème Bac | « Frère sain d'un malade récessif : probabilité qu'il soit porteur ? » (2/3) | `content/maths/probabilites-conditionnelles/lesson.md` |

**Conceptions erronées et pièges.** (inventaire de la leçon, plus le cadre)
- *« Plus d'hommes atteints, donc lié à l'X »* : c'est un indice, pas une preuve.
- *« Un même test tranche à la fois dominant / récessif et autosomal / lié à l'X »*.
- *« On lit la probabilité dans l'échiquier complet »* : l'information « il est sain » retire des
  cases (le 2/3).
- *« La consanguinité crée la maladie »* : elle augmente la probabilité que deux allèles récessifs
  rares se rencontrent (vrai / faux, SM-A 2026).
- *« Un caractère qui saute une génération est forcément lié au sexe »*.

**Représentations.**
- **Arbre « détective »** (interactif) : l'élève clique sur un trio pour tester une hypothèse ;
  les contradictions s'allument ; pari « dominant ou récessif ? » avant révélation.
- **Figure-clé pas à pas : le 2/3** (8 étapes) — l'échiquier complet, puis la case « malade »
  qu'on retire parce qu'on sait que la personne est saine.
- **Frise et arbre historique** : l'hémophilie dans les familles royales européennes.

**Histoire et personnages.**
① **Garrod, 1902** : l'alcaptonurie, plus fréquente chez les enfants de cousins germains [V]
(02 §5.3) — la consanguinité, déjà.
② **L'hémophilie de la reine Victoria** ; l'analyse des restes des Romanov a montré qu'il
s'agissait de l'hémophilie B [V] (02 §5.3).
③ Ce que ça a changé : le conseil génétique aux familles.

**Pour aller plus loin.** Le conseil génétique ; les maladies fréquentes au Maghreb [À VÉRIFIER :
ne citer qu'avec une source épidémiologique].

**Liens.** T2 ; T5 ; G2 (la cause moléculaire, dans le même exercice en 2026) ; P1 (de la
fréquence des malades à celle des porteurs) ; maths : probabilités conditionnelles.

---

### T5. Caryotypes, anomalies chromosomiques et diagnostic prénatal   (absente de l'application)

**Filières et poids.** `svt-svt 3.3.1` (caryotypes), `3.3.2`, `3.3.3`, et `3.1.2` (analyser des
caryotypes) ; `svt-sma 1.3.1` à `1.3.3`, `1.1.2`. Pas en filière PC. Fréquence : Partie I 2024 N
(formule chromosomique du syndrome de Klinefelter) ; SM-A 2026 N (définir la trisomie ; techniques
et intérêts du diagnostic prénatal ; Turner, translocation réciproque) [OFF-sujet].

**Ce que le bac demande.** Lire un caryotype, écrire une **formule chromosomique** (2n = 44A + XXY,
2n = 44A + X) ; expliquer une anomalie par un schéma de **non-disjonction** (en méiose I ou II) ;
citer les techniques du diagnostic prénatal (le corrigé SM-A 2026 accepte échographie,
amniocentèse, choriocentèse, analyse d'ADN) et ses intérêts ; **exprimer son opinion** sur le
diagnostic prénatal à partir de données (`svt-svt 3.3.3`).

**L'idée-clé.** Une anomalie de nombre naît presque toujours d'une **erreur de séparation** pendant
la méiose d'un parent : un gamète à n + 1 ou n − 1 chromosomes ; le caryotype la rend visible.
Une mutation d'un gène, elle, ne se voit pas au caryotype.
*Image-clé :* l'anaphase où une paire ne se sépare pas, et les quatre gamètes qui en sortent.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Méiose (anaphases I et II) | 2ème Bac, T1 | « À quelle anaphase les homologues se séparent-ils ? » | T1 |
| Caryotype humain, autosomes, gonosomes | 2ème année collège | « Combien d'autosomes dans un caryotype humain ? » | 2AC, hérédité |
| Notation des formules | 2ème Bac | « Formule d'un garçon normal ? » (2n = 44A + XY) | atelier de notation |

**Conceptions erronées et pièges.**
- *« La trisomie 21 se transmet comme une maladie héréditaire »* : le plus souvent, c'est une
  erreur de méiose chez un parent au caryotype normal [À VÉRIFIER : formulation adaptée].
- *« Le syndrome de Turner touche les garçons »* (formule 44A + X : une fille).
- *« Le caryotype détecte toutes les maladies génétiques »*.
- *« Une translocation est toujours visible dans le phénotype »* : réciproque et équilibrée, le
  phénotype est normal (vrai / faux, SM-A 2026).
- Piège de copie : compter les chromosomes et non les paires (formules).

**Représentations.**
- **Manipulable « puzzle de caryotype »** : apparier et classer les chromosomes d'une photo ; pari
  « qu'est-ce qui cloche ? » avant de compter.
- **Simulation de non-disjonction** : l'élève choisit où l'erreur arrive (méiose I ou II) et voit
  les gamètes, puis les zygotes possibles. Pari : « non-disjonction en méiose I : combien de
  gamètes anormaux sur quatre ? ».
- **Figure-clé pas à pas** (10 étapes) de la méiose normale à la trisomie.
- **Débat guidé** pour « exprimer son opinion » : données, arguments, position (§2.2).

**Histoire et personnages.**
① **Tjio et Levan**, Lund, 22 décembre 1955 : l'Homme a **46** chromosomes, et non 48 comme compté
par Painter en 1921 ; publié le 26 janvier 1956 [V]
([Joe Hin Tjio](https://en.wikipedia.org/wiki/Joe_Hin_Tjio)).
② Le moment où ça a coincé : pendant plus de trente ans, tout le monde avait recompté 48.
③ **Trisomie 21, 1959** : découverte attribuée à Lejeune ; **Marthe Gautier**, qui avait préparé
les lames, en revendiquera le crédit [V] (02 §5.3).

**Pour aller plus loin.** Le diagnostic prénatal et ses questions éthiques, traités avec tact et
sans prendre parti à la place de l'élève [À VÉRIFIER : cadre légal marocain, non recherché ici].

**Liens.** T1 ; T4 ; G1 (le caryotype est une photo de mitose).

**À trancher.** Comment traiter « exprimer son opinion » sur le diagnostic prénatal dans une
application : un débat guidé à positions multiples, ou seulement la méthode ?

---

### Domaine « génétique des populations » (et, en SM-A, « variation génétique »)

---

### P1. Génétique des populations : le modèle de Hardy-Weinberg   (`genetique-populations`)

**Filières et poids.** `svt-svt 4.1.1` à `4.1.3` ; `svt-sma 2.2.1` à `2.2.3`. Pas en filière PC.
Filière SVT : domaine 4, recouvrement **11 %** (le plus petit), compté dans la génétique ; SM-A :
domaine 2 = 50 %. Fréquence : **2026 N** (épidermolyse bulleuse : 1/20 000, « cinq chiffres
après la virgule », 1,5 pt) ; **SM-A 2026 N** (paludisme et drépanocytose : effectifs théoriques
contre observés, 1,75 pt) [OFF-sujet] ; non relevé comme exercice propre dans l'échantillon de 01
[À VÉRIFIER].

**Ce que le bac demande.** Définir une population et son pool génique ; calculer les fréquences
alléliques (p, q) à partir d'effectifs génotypiques ou de la seule fréquence des malades
(q = √f(aa) si l'allèle est récessif) ; appliquer p² + 2pq + q² ; **vérifier l'équilibre** en
comparant effectifs théoriques et observés ; calculer les fréquences d'une génération à l'autre.
Corrigé 2026 : q = √(1/20 000) = 0,00707, p = 0,99293, 2pq = 0,01404 [OFF-sujet].

**L'idée-clé.** Dans une population idéale, les gamètes se rencontrent comme des boules tirées
d'une urne : si l'urne contient une proportion p d'allèles A et q d'allèles a, les génotypes
sortent en p², 2pq, q² — et l'urne reste la même à la génération suivante.
*Image-clé :* le carré (p + q)² découpé en p², pq, pq, q² — l'échiquier des gamètes de toute une
population.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Échiquier, monohybridisme | 2ème Bac, T2 | « Aa × Aa : proportion de aa ? » | T2 |
| Fréquence, proportion, racine carrée | collège | « √0,0001 = ? » | calcul guidé |
| (a + b)² = a² + 2ab + b² | collège | « Développer (p + q)² » | identité remarquable |
| Arrondis, chiffres significatifs | collège | « Arrondir 0,0070710 à 5 décimales » | consigne de précision |

**Conceptions erronées et pièges.** (inventaire de la leçon, plus)
- *« Fréquence d'un allèle = fréquence d'un génotype »*.
- *« Un allèle dominant devient forcément plus fréquent »* ; *« un allèle récessif rare
  disparaît vite »*.
- *« Équilibre veut dire p = q = 0,5 »*.
- *« q² est la fréquence des porteurs »* : c'est celle des malades ; les porteurs sont 2pq.
- Piège de copie : utiliser la fréquence des phénotypes dominants comme p² + 2pq sans le dire ;
  arrondir trop tôt.

**Représentations.**
- **Figure-clé pas à pas : des malades aux porteurs** (8 étapes) — 1 malade sur 20 000 → q →
  p → 2pq. **Pari** : « combien de porteurs sains pour un malade ? » (avec les chiffres de 2026,
  environ 1,4 % de porteurs, donc à peu près 280 porteurs pour un malade : la surprise est le
  moteur de la notion).
- **Manipulable « le carré »** : un curseur p ; les aires p², 2pq, q² se redessinent.
- **Simulation « urne »** : partir de 100 % d'hétérozygotes ; pari « fréquence de aa après une
  génération ? après dix ? » (¼, puis constante).
- **Atelier de calcul** avec la précision imposée et le tableau effectifs théoriques / observés
  (format SM-A 2026).

**Histoire et personnages.**
① **Hardy, 1908** : un mathématicien « pur », fier de l'inutilité de ses travaux, résout en une
page le problème que lui pose son partenaire de **cricket**, le généticien Punnett ; **Weinberg**
y arrive seul la même année [V] (02 §5.3).
② L'obstacle : on croyait qu'un allèle dominant devait envahir la population.
③ Ce que ça a changé : un modèle **nul** — l'écart à l'équilibre devient une mesure de ce qui
fait évoluer (P2).

**Pour aller plus loin.** Le dépistage des porteurs ; pourquoi les maladies récessives rares
« sautent » des générations dans une population.

**Liens.** T2 ; T4 (du malade au porteur, dans le même exercice en 2026) ; P2 ; maths :
identités remarquables, probabilités, suites constantes.

---

### P2. Les facteurs de variation des populations et la notion d'espèce   (`genetique-populations` R5, partielle ; espèce absente)

**Filières et poids.** `svt-svt 4.2.1`, `4.2.2`, `4.3.1` ; `svt-sma 2.2.4` à `2.2.6`. Fréquence :
SM-A 2026 N (drépanocytose et paludisme : effet de la mutation et de la sélection naturelle,
1,5 pt) [OFF-sujet].

**Ce que le bac demande.** Montrer, à partir de données, le mode d'action de chaque facteur de
variation — **mutation, sélection naturelle, dérive génétique, migration** — sur la structure
génétique (variation des fréquences alléliques de génération en génération) ; déterminer les
critères de l'espèce et en donner une définition.

**L'idée-clé.** Quatre forces déplacent les fréquences : la mutation **crée** des allèles, la
sélection **pousse** dans un sens, la dérive **fait marcher au hasard** (d'autant plus fort que la
population est petite), la migration **mélange**. Une espèce est un ensemble de populations
capables de se reproduire entre elles avec une descendance fertile, isolées des autres.
*Image-clé :* les trajectoires de p(t) de vingt populations en parallèle : serrées quand N est
grand, éparpillées et vite fixées (0 ou 1) quand N est petit.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Hardy-Weinberg | 2ème Bac, P1 | « Les cinq conditions de l'équilibre ? » | P1 |
| Mutation | 2ème Bac, G2 (SVT) ; donnée dans le document en SM-A | « Une mutation apparaît-elle parce que l'individu en a besoin ? » | G2 |
| Hasard d'échantillonnage | maths (probabilités) | « Sur 10 lancers, est-on sûr d'avoir 5 piles ? » | `content/maths/probabilites-conditionnelles/lesson.md` |

**Conceptions erronées et pièges.**
- *« L'individu s'adapte et transmet son adaptation »*. Pari dans la simulation de la phalène :
  « les papillons foncent-ils parce que l'écorce est noire ? ».
- *« Les mutations arrivent quand on en a besoin »*.
- *« La dérive, c'est de la sélection »* ou *« la dérive n'existe que dans les populations
  minuscules »*.
- *« La sélection agit sur les phénotypes, donc jamais sur les allèles »* (inventaire de la leçon).
- *« Deux êtres qui se ressemblent sont de la même espèce »* ; le mulet (stérile) comme
  contre-exemple.

**Représentations.**
- **Simulation de dérive avec curseur de taille de population** (la représentation centrale) :
  N de 10 à 10 000, vingt populations en parallèle, p(t) tracé génération après génération.
  **Pari** : « avec N = 20, combien de populations auront perdu l'allèle en 50 générations ? ».
- **Curseurs de sélection** (valeur sélective de aa, avantage de l'hétérozygote) : la
  drépanocytose et le paludisme donnent un équilibre où l'allèle HbS se maintient.
- **Simulation de la phalène** : couleur du fond qui change, prédateurs, fréquence de la forme
  foncée.
- **Figure-clé pas à pas** : les données OMS du sujet SM-A 2026 (fréquence de HbS selon la région)
  superposées à la carte du paludisme [OFF-sujet pour les chiffres].
- **Atelier « même espèce ? »** : cheval et âne, races de chiens, populations d'îles.

**Histoire et personnages.**
① **La phalène du bouleau** : la forme sombre se répand à Manchester dès 1848 ; Tutt (1896) y voit
la sélection naturelle ; Kettlewell la teste de 1953 à 1956 [V] (02 §5.3).
② **Pingelap, typhon de 1775** : une vingtaine de survivants ; quatre générations plus tard,
2,7 % des habitants sont achromates, aujourd'hui environ 10 % — l'effet fondateur [V] (02 §5.3).
③ **Drépanocytose et paludisme (1954)** : les porteurs sont protégés [V] (02 §5.3) ; **Mayr,
1942** : l'espèce comme « groups of actually or potentially interbreeding natural populations,
which are reproductively isolated from other such groups » [V]
([Biological species concept](https://en.wikipedia.org/wiki/Biological_species_concept)).

**Pour aller plus loin.** La résistance aux antibiotiques comme sélection naturelle observée en
direct ; les espèces menacées et la petite taille des populations [À VÉRIFIER : exemple marocain
sourcé, par exemple une espèce de l'Atlas].

**Liens.** P1 ; G2 ; I (paludisme, immunité) ; maths : hasard et échantillonnage.

**À trancher.** La notion d'espèce (une capacité, `svt-svt 4.3.1`) mérite-t-elle un acte, ou un
battement à la fin de P2 ?

---

### P3. La biométrie : étude quantitative de la variation (SM-A)   (absente de l'application)

**Filières et poids.** `svt-sma 2.1.1` à `2.1.4` — **SM-A seulement**. Domaine 2 = 50 % de
l'épreuve SM-A (C-S3 p. 8). Fréquence : SM-A 2024 R (Partie I) [PROPRE 01] ; **SM-A 2026 N,
exercice 2, 5 pts** (nombre de gousses par plant de fève) [OFF-sujet].

**Ce que le bac demande.** Distinguer **variation continue** (mesurable : masse, taille) et
**discontinue** (dénombrable : gousses, grains) ; représenter graphiquement (histogramme, polygone
de fréquences, sur papier millimétré, à l'échelle imposée) ; calculer les **paramètres de
position** (mode, moyenne) et de **dispersion** (variance, écart-type, intervalle [x̄ − σ ;
x̄ + σ]) avec un tableau xᵢ, fᵢ, fᵢxᵢ, (xᵢ − x̄)², fᵢ(xᵢ − x̄)² ; reconnaître une population
**homogène** (une courbe à un sommet) ou **hétérogène** ; déduire si une **sélection
artificielle** est **efficace** ou **inefficace**. Corrigé SM-A 2026 : x̄ = 25,608, σ = 1,76,
intervalle [23,84 ; 27,36] ; sélection inefficace dans une population, efficace dans l'autre
[OFF-sujet RA 36F].

**L'idée-clé.** Une population se décrit par une **distribution** : où elle se tient (moyenne) et
combien elle s'étale (écart-type). Sélectionner les meilleurs n'améliore la descendance que si
leurs différences sont **génétiques** : dans une lignée pure, la variation vient du milieu, et la
sélection ne change rien.
*Image-clé :* deux polygones superposés — la population mère et la descendance des individus
sélectionnés : décalée (sélection efficace) ou superposée (inefficace).

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Moyenne, écart-type, histogramme | maths, statistiques (tronc commun) [À VÉRIFIER : niveau exact en SM] | « Écart-type de 2, 4, 6 ? » | atelier de calcul guidé |
| Lignée pure, homozygote | 2ème Bac, T2 | « Une lignée pure est-elle homozygote pour tous ses gènes ? » | T2 |
| Génotype contre milieu | 2ème Bac, T2 | « Deux jumeaux vrais ont-ils toujours la même taille ? » | battement « inné et acquis » [À VÉRIFIER] |
| Papier millimétré, échelle | collège | « 1 cm pour 10 plantes : 43 plantes = ? cm » | §2.3 |

**Conceptions erronées et pièges.**
- *« Continue ou discontinue dépend du nombre de valeurs »* : c'est la nature de la variable
  (corrigé 2026 : « la variable ne peut prendre que des valeurs entières »).
- *« Mode = moyenne »* ; *« écart-type grand = plantes plus grandes »*.
- *« Sélectionner les plus grosses graines améliore toujours »* — c'est le pari de Johannsen.
- *« Une lignée pure a des individus tous identiques »* : identiques génétiquement, pas
  phénotypiquement.
- Piège de copie : polygone tracé aux bornes des classes et non aux centres ; échelle non
  respectée (1,25 pt en 2026, dont 0,5 pour l'échelle).

**Représentations.**
- **Simulation « Johannsen »** (la représentation centrale) : des haricots d'une lignée pure,
  dont la masse varie avec le milieu ; l'élève choisit les plus lourds comme semences ; **pari** :
  « la moyenne de leurs descendants sera-t-elle plus grande ? » ; révélation : non ; même geste
  sur une population mélangée : oui.
- **Manipulable « construire le polygone »** : placer les points au centre des classes, avec
  l'échelle imposée ; vérification automatique.
- **Atelier « tableau de calcul »** (le format exact du corrigé), avec vérification colonne par
  colonne.
- **Figure-clé pas à pas** : d'une courbe à deux sommets à deux lignées (population hétérogène).

**Histoire et personnages.**
① **Johannsen, 1903** : en semant les graines les plus légères et les plus lourdes de lignées
pures de haricot pendant plusieurs générations, il n'obtient aucun changement de la masse
moyenne : la sélection dans une lignée pure est sans effet [S] (sources secondaires : botanique
en ligne de l'université de Hambourg, Darwin-arkivet).
② C'est aussi lui qui introduit les mots **gène**, **génotype** et **phénotype**, dans
*Elemente der exakten Erblichkeitslehre* (1909) [V]
([Wilhelm Johannsen](https://en.wikipedia.org/wiki/Wilhelm_Johannsen)).
③ Ce que ça a changé : la distinction entre ce qui s'hérite et ce que fait le milieu.

**Pour aller plus loin.** L'amélioration des plantes cultivées (le cadre insiste sur « la
rentabilité de la production agricole », C-S3 p. 2) ; la fève, culture marocaine, dans le sujet
2026 [À VÉRIFIER : données agricoles sourcées avant tout chiffre].

**Liens.** Maths : statistiques (moyenne, écart-type) ; T2 (lignée pure) ; P2 (sélection
artificielle contre sélection naturelle) ; T3 (le même sujet 2026 utilise la fève pour les gènes
liés).

---

### Domaine « immunologie » (filière SVT seulement)

Poids commun aux cinq fiches : domaine 5, recouvrement 18 % ; à l'examen **3 à 4 points** en
Partie II, ou **5 points** s'il fait la Partie I (C-S1 p. 22). Présent dans 9 sujets sur 10
(2019-2025) [PROPRE 01] et en Partie I en 2026 N [OFF-sujet]. Ni en filière PC, ni en SM-A.

---

### I1. Le soi et le non-soi   (`soi-non-soi`)

**Filières et poids.** `svt-svt 5.1.1` à `5.1.3`. Fréquence : Partie I 2024 N (CMH de classe I),
2026 N (appariement LT4 / LT8 ↔ CMH-II / CMH-I) [OFF-sujet].

**Ce que le bac demande.** Analyser des données expérimentales sur le soi et le non-soi (greffes
de peau, transfusions) ; déduire le rôle des marqueurs du soi (CMH, groupes ABO, « marqueurs
mineurs du soi ») dans la **présentation** du soi et du non-soi ; dégager les **caractéristiques
génétiques du CMH** (plusieurs gènes, nombreux allèles, codominance, transmission en bloc).

**L'idée-clé.** Chaque cellule porte des molécules du CMH qui **présentent** des fragments de ses
propres protéines ; le système immunitaire tolère ce qu'il a appris à reconnaître comme soi et
réagit à ce qui diffère (cellule étrangère, cellule infectée, cellule cancéreuse = soi modifié).
*Image-clé :* le CMH comme un présentoir ; un peptide du soi = silence, un peptide étranger =
alarme.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Microbes, antigène, anticorps | 3ème année collège (immunologie) | « Un anticorps reconnaît-il n'importe quel antigène ? » | 3AC, immunologie |
| Membrane, protéines | collège ; G2 | « Où se trouve une protéine marqueur : dans le noyau ou sur la membrane ? » | rappel |
| Codominance, allèles multiples | 2ème Bac, T2 | « Un individu A//B est de quel groupe ? » | T2 |

**Conceptions erronées et pièges.** (inventaire de la leçon : 7 entrées)
- *« Le système immunitaire réagit à "l'étranger" en général »* : à un **antigène précis**.
- *« ABO, Rhésus et CMH sont interchangeables »* : ABO pour la transfusion, CMH pour la greffe.
- *« On vérifie l'antigène du receveur au lieu de celui du donneur »*.
- *« Une cellule infectée change de patrimoine génétique »*.
- Hors cadre dans la leçon actuelle : le **Rhésus** (le cadre ne cite que ABO, C-S1 p. 15).

**Représentations.**
- **Manipulable « transfusion »** : faire glisser une poche de sang vers un receveur ;
  agglutination ou non ; **pari** avant chaque transfusion.
- **Calculateur d'haplotypes HLA** : un frère ou une sœur partage deux, un ou zéro haplotype avec
  les probabilités ¼, ½, ¼ ; **pari** : « chances qu'un frère soit compatible ? » — le lien avec
  T2 et avec la greffe de moelle (I5).
- **Figure-clé pas à pas** (10 étapes) : CMH-I sur toutes les cellules nucléées → peptide du soi →
  LT8 indifférent → cellule infectée → peptide viral → LT8 activé ; CMH-II sur les cellules
  présentatrices → LT4.
- **Expérience réelle** : carte de groupage sanguin (vidéo).

**Histoire et personnages.**
① **Landsteiner, 1901** : les groupes A, B, O ; Nobel 1930 [V] (02 §5.3).
② **Medawar** et la tolérance acquise ; Nobel 1960 avec Burnet [V] (02 §5.3).
③ **Murray, 23 décembre 1954** : première greffe de rein réussie, entre les jumeaux identiques
Herrick, sans rejet puisque le soi est le même ; Nobel 1990 [V] (02 §5.3).

**Pour aller plus loin.** Le don de sang ; pourquoi les greffes exigent un typage HLA.

**Liens.** I3 (CMH et présentation aux lymphocytes) ; I5 (greffe de moelle) ; T2 (codominance,
allèles multiples) ; G2 (marqueurs = protéines codées par des gènes).

**À trancher.** Garder le Rhésus (hors cadre, utile en pratique) en « pour aller plus loin » ?

---

### I2. La réponse immunitaire non spécifique : inflammation, phagocytose, complément   (`moyens-de-defense` R1-R3, partielle)

**Filières et poids.** `svt-svt 5.2.1`, `5.2.2` (et `5.2.6` pour la représentation graphique).
Fréquence : **2026 N, Partie I** : « deux types de cellules qui interviennent dans la réponse
immunitaire non spécifique », « deux rôles du système du complément » (corrigé : formation du
complexe d'attaque membranaire et lyse ; opsonisation ; attraction des phagocytes par C3a et C5a),
vrai / faux sur l'histamine et les prostaglandines [OFF-sujet].

**Ce que le bac demande.** Décrire et expliquer les manifestations de la réaction inflammatoire
(rougeur, chaleur, gonflement, douleur) et les étapes de la phagocytose ; montrer leur rôle de
défense non spécifique ; connaître le **facteur du complément** (C-S1 p. 15).

**L'idée-clé.** Immédiate et identique pour tous les intrus : l'inflammation dilate les vaisseaux
et fait sortir des phagocytes (diapédèse) ; le phagocyte adhère, englobe, digère, rejette ; le
complément, des protéines du plasma, perce des trous dans les membranes, marque les intrus et
attire les phagocytes.
*Image-clé :* la phagocytose en quatre temps, vue au microscope.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Composition du sang, globules blancs | 3ème année collège | « Quels globules défendent l'organisme ? » | 3AC, circulation et immunologie |
| Enzymes digestives (lysosomes) | 3ème année collège ; `role-enzymes` | « Qu'est-ce qui digère la bactérie dans la vacuole ? » | `content/svt/role-enzymes/lesson.md` |

**Conceptions erronées et pièges.**
- *« L'inflammation ne mobilise aucune cellule »* (inventaire de la leçon).
- *« Toute réaction immunitaire est spécifique »*.
- *« Le complément est un anticorps »*.
- *« L'inflammation est une maladie à supprimer »*.

**Représentations.**
- **Figure-clé pas à pas : la phagocytose** (10 étapes), pari : « que reste-t-il dans la vacuole
  après 30 minutes ? ».
- **Animation du complément** : la cascade qui aboutit au pore dans la membrane.
- **Frise d'une écharde** : minutes (inflammation), heures (phagocytose), jours (réponse
  spécifique) — pour situer I2 avant I3.
- **Expérience réelle** : vidéo de microscopie d'un polynucléaire poursuivant une bactérie
  [À VÉRIFIER : source et droits].

**Histoire et personnages.**
① **Metchnikoff, 1882, Messine** : sur des larves d'étoile de mer, il découvre la phagocytose [V]
(02 §5.3).
② **Bordet, 1895** : des composants naturels du sérum, qu'il nomme alexine (le complément),
renforcent la destruction des bactéries ; Nobel 1919 [V]
([Jules Bordet](https://en.wikipedia.org/wiki/Jules_Bordet)).
③ Ce que ça a changé : l'immunité n'est pas un seul mécanisme, mais des couches successives.

**Pour aller plus loin.** Pourquoi on a de la fièvre ; les anti-inflammatoires [À VÉRIFIER :
rester au niveau du programme].

**Liens.** I3 (la suite) ; I4 (histamine, aussi dans l'allergie) ; E1 (phagocytose = énergie).

**À trancher.** Le complément est au cadre et a valu 0,5 pt en 2026 ; la leçon actuelle n'en dit
presque rien.

---

### I3. La réponse immunitaire spécifique : humorale, cellulaire, coopération, mémoire   (`moyens-de-defense` R4-R8, partielle)

**Filières et poids.** `svt-svt 5.2.3` à `5.2.7`. Fréquence : 2019 N, 2024 N (anticorps
antistreptolysine O, 4 pts), et **2026 N, Partie I** (organes lymphoïdes centraux = moelle osseuse
et thymus ; réponse secondaire plus rapide et plus forte ; complexe immun ; LT4 ne reconnaissent
pas directement l'antigène ; appariement des cellules effectrices) [PROPRE 01 + OFF-sujet].

**Ce que le bac demande.** Exploiter des expériences (souris thymectomisées ou irradiées,
transferts de cellules ou de sérum) pour établir le rôle de chaque acteur ; connaître les organes
du système immunitaire, l'origine des cellules et les **lieux de maturation** des lymphocytes
(moelle osseuse, thymus) ; les **phases** de la réponse (induction, amplification, phase
effectrice) ; le rôle de la **coopération cellulaire** ; représenter graphiquement (titre
d'anticorps, réponses primaire et secondaire) ; schéma de synthèse.

**L'idée-clé.** Parmi des millions de lymphocytes, chacun spécifique d'un antigène, ceux qui
reconnaissent l'intrus sont **sélectionnés**, se **multiplient** (clone), se **différencient**
(plasmocytes qui sécrètent les anticorps, LT cytotoxiques qui tuent les cellules infectées) ; les
LT4, activés par une cellule présentatrice, **coordonnent** par des messagers (interleukines) ;
des cellules mémoire restent.
*Image-clé :* l'arbre de la sélection clonale — une cellule → un clone → effecteurs + mémoire.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Soi, non-soi, CMH | 2ème Bac, I1 | « Un LT8 reconnaît un peptide présenté par quel CMH ? » | I1 |
| Réponse non spécifique | 2ème Bac, I2 | « Qui agit en premier : phagocyte ou lymphocyte ? » | I2 |
| Mitose (multiplication du clone) | 2ème Bac, G1 | « Combien de divisions pour passer d'une cellule à mille ? » (environ 10) | G1 |
| Vaccination (notion) | 3ème année collège | « Que contient un vaccin ? » | 3AC, renforcement de la réponse immunitaire |

**Conceptions erronées et pièges.** (inventaire de la leçon, plus le sujet 2026)
- *« Les anticorps détruisent directement l'intrus »* : ils neutralisent et marquent.
- *« Les anticorps atteignent un virus entré dans une cellule »*.
- *« LB et LT ont le même rôle »* ; *« les LT4 tuent les cellules infectées »*.
- *« Les LT4 reconnaissent directement l'antigène »* (vrai / faux 2026 : faux, ils reconnaissent
  le peptide présenté par le CMH-II).
- *« Le thymus fabrique les lymphocytes B »* : les LB mûrissent dans la moelle, les LT dans le
  thymus.
- *« La mémoire, ce sont les anticorps qui restent »*.

**Représentations.**
- **Simulation de sélection clonale** : 1 000 lymphocytes aux récepteurs de formes variées ; un
  antigène arrive ; le clone qui s'ajuste se multiplie ; la courbe du titre d'anticorps se trace.
  **Paris** : « délai avant les anticorps à la première rencontre ? à la seconde ? ».
- **Manipulable « deux injections »** : curseur du moment de la seconde injection ; réponses
  primaire et secondaire superposées.
- **Figure-clé pas à pas : la coopération cellulaire** (14 étapes) — cellule présentatrice →
  LT4 → interleukines → LB et LT8 → plasmocytes et LTc → mémoire. **Pari** : « on supprime les
  LT4 : que deviennent les deux réponses ? » (la porte vers le SIDA, I4).
- **Enquête « souris »** : les expériences classiques de thymectomie et de transfert, chacune
  avec un pari.

**Histoire et personnages.**
① **Behring et Kitasato, 1890** : le sérum d'un animal immunisé protège un autre animal ; Behring
reçoit le premier Nobel de médecine (1901) [V] (02 §5.3).
② L'obstacle : comment l'organisme pourrait-il fabriquer un anticorps pour un antigène qu'il n'a
jamais rencontré ?
③ **Burnet, 1957** : la sélection clonale — les clones existent avant l'antigène, qui les
choisit [V] (02 §5.3).

**Pour aller plus loin.** Les tests sérologiques ; pourquoi certains vaccins demandent des rappels.

**Liens.** I1, I2, I4, I5 ; G1 (multiplication du clone) ; maths : croissance exponentielle d'un
clone (`content/maths/fonction-exponentielle/lesson.md`).

**À trancher.** Ajouter à la leçon les organes et lieux de maturation (au cadre, interrogés en
2026) ; en faire deux leçons (humorale / cellulaire) ou une seule ?

---

### I4. Dysfonctionnements : l'allergie et le SIDA   (`dysfonctionnements-immunitaires`)

**Filières et poids.** `svt-svt 5.3.1` à `5.3.4`. Fréquence : 2019 N (VIH), Partie I 2024 N
(« définissez la réponse allergique »), **2026 N** (sensibilisation : les plasmocytes sécrètent les
IgE ; fixation du VIH : gp120 et CD4) [PROPRE 01 + OFF-sujet].

**Ce que le bac demande.** Déterminer les éléments et les mécanismes de l'**allergie**
(hypersensibilité immédiate : sensibilisation, IgE fixées sur les mastocytes, puis réaction et
libération d'histamine) ; expliquer l'effet du **VIH** : sa **structure et son cycle de
multiplication**, son action sur les LT4, l'évolution de l'infection ; l'exprimer graphiquement
(LT4 et charge virale dans le temps) ; schéma de synthèse.

**L'idée-clé.** L'allergie est une réponse spécifique **excessive** à un antigène inoffensif : le
premier contact sensibilise (IgE sur les mastocytes), le second déclenche la libération
d'histamine. Le VIH infecte les LT4 (gp120 sur le récepteur CD4) ; en détruisant le
**coordinateur**, il fait s'effondrer toutes les réponses spécifiques : infections opportunistes.
*Image-clé :* les trois phases de l'infection — primo-infection, phase asymptomatique, SIDA —
avec la courbe des LT4 qui descend et celle de la charge virale qui remonte.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Réponse spécifique, rôle des LT4 | 2ème Bac, I3 | « Sans LT4, les LB produisent-ils des anticorps ? » | I3 |
| Virus, ADN, ARN | 2ème Bac, G1-G2 | « Le VIH a-t-il un génome en ADN ou en ARN ? » | G2 |
| Lire deux courbes sur un même graphe | tronc commun | « Où les deux courbes se croisent-elles ? » | atelier de document |

**Conceptions erronées et pièges.** (inventaire de la leçon, plus)
- *« L'allergie se déclare dès le premier contact »*.
- *« Le VIH détruit tous les globules blancs, ou bloque la phagocytose »*.
- *« Séropositif = malade du SIDA »*.
- *« Pendant la phase asymptomatique, le virus a disparu »*.
- *« Allergie, auto-immunité et déficit, c'est la même chose »*.
- Hors cadre : les **maladies auto-immunes** (R2 de la leçon) ne sont pas citées par le cadre
  (C-S1 p. 16).

**Représentations.**
- **Figure-clé pas à pas : le cycle du VIH** (12 étapes : fixation gp120-CD4, fusion,
  transcription inverse, intégration, transcription, traduction, assemblage, bourgeonnement) ;
  **pari** : « l'ADN viral intégré peut-il rester silencieux des années ? ».
- **Manipulable « trois phases »** : un curseur de temps sur les courbes LT4 et charge virale ;
  seuil d'apparition des infections opportunistes [À VÉRIFIER : valeur de seuil à citer avec
  source].
- **Animation de l'allergie** : premier contact (rien de visible), second contact (dégranulation).
  Pari : « au premier contact, l'élève éternue-t-il ? ».

**Histoire et personnages.**
① **Richet et Portier, 1901-1902**, à bord du *Princesse Alice II* : une seconde dose minime de
toxine de méduse tue l'animal qui avait survécu à la première — l'anaphylaxie ; Nobel 1913 [V]
(02 §5.3).
② **Barré-Sinoussi, 1983**, Institut Pasteur : isolement du VIH ; Nobel 2008 [V] (02 §5.3).
③ **Le « patient de Berlin »** : séropositif depuis 1995, il reçoit le 7 février 2007, pour une
leucémie, une greffe de cellules souches d'un donneur homozygote pour CCR5-Δ32, un variant qui
empêche le VIH d'entrer dans les cellules ; le virus devient indétectable [V]
([Timothy Ray Brown](https://en.wikipedia.org/wiki/Timothy_Ray_Brown)). Le pont vers I5 (greffe de
moelle) — à raconter avec prudence : ce n'est pas un traitement courant.

**Pour aller plus loin.** Le dépistage ; les traitements antirétroviraux (mentionnés, pas
détaillés) ; l'allergie au pollen.

**Liens.** I3 ; I5 ; G2 (transcription inverse : l'information circule de l'ARN vers l'ADN) ;
I2 (histamine).

**À trancher.** Garder l'acte sur les maladies auto-immunes (hors cadre) ? Proposition : le
déplacer en « pour aller plus loin ».

---

### I5. Les aides au système immunitaire : vaccination, sérothérapie, greffe de moelle osseuse   (`dysfonctionnements-immunitaires` R4-R6, partielle)

**Filières et poids.** `svt-svt 5.4.1`, `5.4.2`. Fréquence : 2019 N (vaccin) [PROPRE 01] ;
souvent en question d'un exercice d'immunologie [À VÉRIFIER : recompter 2016-2026].

**Ce que le bac demande.** Expliquer les principes de la **vaccination** (mémoire, immunité active),
de la **sérothérapie** (anticorps apportés, immunité passive) et de la **greffe de la moelle
osseuse** ; montrer leur importance ; interpréter des courbes de protection.

**L'idée-clé.** Le vaccin **apprend** à l'organisme (lent, durable, active la mémoire) ; le sérum
**prête** des anticorps tout faits (immédiat, bref) ; la greffe de moelle **remplace la source**
des cellules immunitaires — d'où l'exigence de compatibilité HLA.
*Image-clé :* deux courbes de protection — le vaccin qui monte tard et reste, le sérum qui
commence haut et décroît.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Mémoire immunitaire | 2ème Bac, I3 | « Pourquoi la seconde réponse est-elle plus rapide ? » | I3 |
| HLA, compatibilité | 2ème Bac, I1 | « Pourquoi chercher un donneur dans la fratrie ? » | I1 |
| Vaccination, sérothérapie (notions) | 3ème année collège | « Un sérum contient-il des antigènes ou des anticorps ? » | 3AC |
| Décroissance exponentielle | maths et PC 2ème Bac | « Une quantité divisée par deux toutes les semaines : que reste-t-il après 3 semaines ? » | `content/pc/decroissance-radioactive/lesson.md` (même forme de courbe) |

**Conceptions erronées et pièges.** (inventaire de la leçon, plus)
- *« Vaccination et sérothérapie, c'est pareil »*. **Pari** : « morsure de vipère aujourd'hui :
  vaccin ou sérum ? ».
- *« Les anticorps injectés se multiplient dans le receveur »*.
- *« Un vaccin protège définitivement contre tout »*.
- *« La greffe de moelle, c'est une greffe de moelle épinière »* — la confusion de mots la plus
  probable [À VÉRIFIER auprès d'enseignants] ; il s'agit de la moelle **osseuse**, qui fabrique les
  cellules sanguines.

**Représentations.**
- **Manipulable « fenêtre de protection »** : choisir vaccin ou sérum et le moment de l'injection ;
  la courbe de protection et la date d'exposition au microbe se superposent.
- **Figure-clé pas à pas : la greffe de moelle** (10 étapes : moelle malade → recherche d'un
  donneur HLA-compatible → prélèvement → injection → les cellules souches recolonisent la moelle →
  nouvelles cellules immunitaires) ; **pari** : « probabilité qu'un frère ou une sœur soit
  compatible ? » (¼, lien avec I1).
- **Frise** : variolisation → Jenner → Pasteur → éradication de la variole.

**Histoire et personnages.**
① **Lady Mary Wortley Montagu** observe la variolisation à Constantinople ; **Jenner, 14 mai
1796**, inocule James Phipps avec la vaccine prise sur la main de la trayeuse Sarah Nelmes [V]
(02 §5.3). **al-Rāzī** (vers 900) distingue cliniquement la variole de la rougeole [V] (02 §5.3).
② **Pasteur et le choléra des poules (1879)** : la culture « oubliée pendant les vacances » est
une **légende simplifiée** ; ses carnets parlent d'un retour retardé, et le vaccin s'est révélé
peu fiable [L] → [V] (02 §5.4) — l'histoire réelle comme leçon d'esprit critique.
③ La variole est déclarée **éradiquée en 1980** [V] (02 §5.3) ; **E. Donnall Thomas**, pionnier de
la greffe de moelle osseuse, partage le Nobel 1990 avec Joseph Murray [V]
([E. Donnall Thomas](https://en.wikipedia.org/wiki/E._Donnall_Thomas)).

**Pour aller plus loin.** Le calendrier vaccinal ; l'immunité de groupe (hors cadre, à signaler
comme tel) ; les sérums antivenimeux [À VÉRIFIER : recommandations actuelles avant tout exemple
marocain].

**Liens.** I1, I3 ; G3 (vaccins produits par génie génétique) ; maths et PC (décroissance).

**À trancher.** La greffe de moelle est au cadre (deux capacités) et absente de la leçon.

---

### Domaine « phénomènes géologiques accompagnant la formation des chaînes de montagnes »

Poids commun : filière SVT, domaine 6, recouvrement 18 %, **3 à 4 points** en Partie II ou **5** en
Partie I (C-S1 p. 22) ; filière PC, domaine 4, **25 %** (C-S2 p. 19). Présent dans 7 sujets SVT sur
10 (2019-2025 ; absent en 2024, cadres révisés après les grèves) [PROPRE 01], en 2026 N (Petit
Caucase, 3 pts) et en Partie I PC 2026 [OFF-sujet]. Le texte des cadres SVT et PC est identique.
Pas en SM-A.

**Vocabulaire marocain à respecter** : « métamorphisme dynamique » (lié à la subduction, haute
pression – basse température : c'est ainsi que le corrigé 2026 nomme la série
gabbro → glaucophane → jadéite) et « métamorphisme thermodynamique » (C-S1 p. 18) ; « métamorphisme
général » et « de contact » (p. 6) [OFF, OFF-sujet]. L'association exacte « thermodynamique =
collision » est à confirmer sur un manuel marocain [À VÉRIFIER].

---

### Geo1. Les chaînes de montagnes récentes : subduction, obduction, collision   (`chaines-de-montagnes`)

**Filières et poids.** `svt-svt 6.1.1` à `6.1.5` et le bilan `6.5.1`, `6.5.2` ; `svt-pc 4.1.1` à
`4.1.5`, `4.5.1`, `4.5.2`. Fréquence : 2022 N (subduction), 2023 N (Zagros), 2025 R (Himalaya),
2026 N (Petit Caucase : subduction de la Néotéthys puis collision) [PROPRE 01 + OFF-sujet].

**Ce que le bac demande.** Dégager les caractéristiques structurales et pétrographiques des
chaînes de **subduction**, d'**obduction** et de **collision** à partir de cartes et de coupes ;
établir la relation avec la dynamique des plaques ; reconstituer les étapes de la genèse d'une
chaîne ; représenter graphiquement ses conditions de formation ; schéma de synthèse. Corrigé 2026 :
« un indice montrant la convergence » (failles inverses, chevauchements, 0,25) et « un indice de la
fermeture d'un ancien océan » (suture ophiolitique, sédiments océaniques, 0,25) ; les étapes
« subduction → blocage → collision → suture » (1 pt) [OFF-sujet].

**L'idée-clé.** Trois manières de faire une montagne avec la convergence : la plaque océanique
**plonge** sous l'autre (subduction : fosse, séismes de plus en plus profonds, volcanisme
andésitique) ; un morceau de lithosphère océanique est **charrié sur** le continent (obduction :
ophiolites en hauteur) ; quand l'océan est fermé, deux continents se **heurtent** (collision :
épaississement, nappes, suture ophiolitique).
*Image-clé :* une seule coupe qui évolue dans le temps — océan, subduction, obduction d'un
lambeau, fermeture, collision, suture.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Tectonique des plaques, séismes, volcans | **2ème année collège** [SEC 9rayti] | « Lithosphère et croûte : est-ce la même chose ? » | `content/svt/theorie-tectonique-plaques/lesson.md` |
| Formation des chaînes de montagnes (première approche) | 2ème année collège | « Que trouve-t-on au cœur d'une chaîne de collision ? » | 2AC |
| Roches magmatiques : basalte, gabbro, péridotite, granite | 2ème année collège | « Basalte ou gabbro : lequel a refroidi lentement ? » | 2AC, roches magmatiques |
| Lire une coupe, principes de stratigraphie | 1ère Bac (géologie externe) | « Une couche plus vieille au-dessus d'une plus jeune : est-ce normal ? » | 1ère Bac, phénomènes géologiques externes |
| Densité | PC (collège) | « Pourquoi la lithosphère océanique ancienne plonge-t-elle ? » | rappel |

**Conceptions erronées et pièges.** (inventaire de la leçon, plus)
- *« Toute chaîne de montagnes est une collision »* — ou *« l'Himalaya est une subduction
  vieillie »*.
- *« Une ophiolite est n'importe quelle roche sombre »* : la séquence péridotite – gabbro – basalte
  en coussins, avec des radiolarites.
- *« Les montagnes sont des volcans empilés »*.
- *« Le Haut Atlas est une chaîne de collision comme l'Himalaya »* : les données de subduction et
  d'épaississement crustal typiques d'une collision y manquent [V]
  ([Atlas Mountains](https://en.wikipedia.org/wiki/Atlas_Mountains)) — un contre-exemple
  marocain utile, hors programme.
- Piège de copie : citer un indice sans dire **de quoi** il est l'indice.

**Représentations.**
- **3D : la coupe de subduction** — l'idée est spatiale (un plan plongeant, l'angle de
  Wadati-Benioff), donc conforme à l'ADR 0041. Les foyers des séismes se placent en profondeur ;
  **pari** : « où seront les séismes les plus profonds : côté fosse ou côté continent ? ».
- **Figure-clé pas à pas : la vie d'un océan** (14 étapes, l'histoire du Petit Caucase de 2026 ou
  des Alpes) ; paris : « l'océan fermé, où est passée la lithosphère océanique ? » (en
  profondeur, sauf les lambeaux obductés).
- **Manipulable « foyers sismiques »** : placer les séismes d'un tableau (distance, profondeur) et
  mesurer l'angle du plan ; lien avec la trigonométrie.
- **Expérience réelle** : photos d'affleurements de basaltes en coussins et d'ophiolites ;
  maquette en pâte à modeler.

**Histoire et personnages.**
① **Wegener, 1912** : les continents dérivent ; rejeté faute de mécanisme [V] (02 §5.3) — rappel de
collège, en ouverture.
② **Marie Tharp, 1952** : la vallée du rift au milieu de la dorsale atlantique, d'abord balayée par
Heezen ; **Hess** (1962) et l'expansion océanique [V] (02 §5.3). Les ophiolites se reconnaissent à
la « trinité de Steinmann » : serpentine, diabase, radiolarite [V] (02 §5.3).
③ **Le Maroc comme terrain** : l'**ophiolite de Bou Azzer** (Anti-Atlas), parmi les plus anciennes
du monde, vieille suture [S] ([Archimer/Ifremer](https://archimer.ifremer.fr/doc/00636/74780/)) ; le
**Rif** appartient à l'arc de Gibraltar, prolongement des cordillères Bétiques, et n'est pas une
partie de l'Atlas [V] ([Rif](https://en.wikipedia.org/wiki/Rif)) ; le **Haut Atlas** doit son
soulèvement en partie à la convergence Afrique-Europe [V] (02 §5.3). **Agadir, 29 février 1960**
(Mw 5,8, 12 000 à 15 000 morts) et **Al Haouz, 8 septembre 2023** (Mw 6,8 à 6,9, 2 960 morts) [V]
(02 §5.3) : la tectonique vécue par les élèves, **à traiter avec tact** (deuils récents) et
sans en faire un exercice de calcul.

**Pour aller plus loin.** Le GPS mesure aujourd'hui la convergence ; les risques sismiques et la
construction parasismique.

**Liens.** Geo2-Geo4 ; prérequis `theorie-tectonique-plaques` ; PC : ondes sismiques
(`content/pc/ondes-mecaniques-progressives/lesson.md`) et datation radiométrique des roches
(`content/pc/decroissance-radioactive/lesson.md`).

**À trancher.** Nommer l'obduction comme un type de chaîne à part entière (le cadre le fait) dans
la leçon, qui ne parle que des ophiolites ?

---

### Geo2. Les déformations tectoniques : plis, failles, nappes de charriage   (partielle : `granitisation-deformation` R1, `chaines-de-montagnes` R4)

**Filières et poids.** `svt-svt 6.2.1` à `6.2.6` ; `svt-pc 4.2.1` à `4.2.6`. Fréquence : 2026 N
(failles inverses et chevauchements comme indices de convergence) ; **PC 2026, Partie I** :
« définir la nappe de charriage » (0,5) — corrigé : « déformation tectonique résultant du
déplacement de formations rocheuses sur de longues distances, sous l'effet de forces
compressives » [OFF-sujet].

**Ce que le bac demande.** **Classer** plis et failles (anticlinal, synclinal ; pli droit, déjeté,
déversé, couché ; faille normale, inverse, décrochement) [À VÉRIFIER : liste exacte des types
enseignés] ; analyser des cartes et des coupes ; déterminer les caractéristiques des **nappes de
charriage** (contact anormal, terrains anciens sur terrains récents, klippe, fenêtre) ; relier
chaque déformation à une **contrainte** (compression, distension) ; schématiser.

**L'idée-clé.** Une compression **raccourcit et épaissit** : en profondeur, la roche plie ; plus
près de la surface, elle casse (faille inverse) ; à grande échelle, des paquets entiers glissent
les uns sur les autres sur des dizaines de kilomètres (nappes). Une distension, elle, étire
(failles normales).
*Image-clé :* un bloc de couches pressé des deux côtés — il plie, puis casse, puis chevauche.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Déformations tectoniques (première approche) | **2ème année collège** [SEC 9rayti] | « Pli ou faille : lequel est cassant ? » | 2AC |
| Superposition des couches | 1ère Bac (géologie externe) | « Dans une série non déformée, où est la couche la plus ancienne ? » | 1ère Bac |
| Forces, sens d'une contrainte | PC tronc commun | « Deux forces opposées qui se rapprochent : compression ou extension ? » | rappel |

**Conceptions erronées et pièges.**
- *« Une faille est ductile, un pli cassant »* (inventaire de la leçon).
- *« Un chevauchement traduit un étirement »*.
- *« Un anticlinal, c'est une bosse »* : il se définit par l'**âge** (couches les plus anciennes au
  cœur) ; un anticlinal peut être érodé en creux.
- *« Faille normale = faille ordinaire »* : c'est une faille de **distension**.
- *« Nappe = nappe d'eau »* — homonyme à désamorcer dès le début.

**Représentations.**
- **Expérience réelle : la boîte à sable** — couches de sable et de farine poussées par un piston ;
  plis puis chevauchements apparaissent. Vidéo ou expérience à faire [À VÉRIFIER : protocole].
- **Manipulable « classeur de failles »** : faire glisser le compartiment supérieur ; l'élève
  nomme la faille et la contrainte. Pari avant chaque mouvement.
- **3D : bloc-diagramme d'un pli** (plan axial, charnière, flancs) — idée spatiale, ADR 0041.
- **Figure-clé pas à pas : « plus vieux sur plus jeune »** (10 étapes, l'histoire de Glaris) ;
  **pari** : « deux plis géants ou un seul chevauchement ? ».

**Histoire et personnages.**
① **Glaris (Alpes suisses)** : Hans Conrad Escher constate que des roches plus anciennes reposent
sur des plus jeunes, contre la loi de superposition ; en 1866, on propose deux grands anticlinaux
renversés, une interprétation que son auteur jugeait lui-même, en privé, « rather absurd » [V]
([Glarus thrust](https://en.wikipedia.org/wiki/Glarus_thrust)).
② **Marcel Bertrand, 1884**, y voit un seul chevauchement : la naissance de l'idée de nappe [V]
(même source).
③ Le site est inscrit au patrimoine mondial en 2008 comme « exceptional example of mountain building
through continental collision » [V] (même source).

**Pour aller plus loin.** Les plis visibles dans les gorges du Haut Atlas [À VÉRIFIER : un
affleurement marocain précis, sourcé, avec photo libre].

**Liens.** Geo1 ; Geo3 (en profondeur, la roche plie et se transforme) ; PC : forces et
contraintes.

**À trancher.** « Nappe de charriage » est au cadre et a été interrogée en 2026 ; elle manque aux
leçons.

---

### Geo3. Le métamorphisme et sa relation avec la tectonique des plaques   (partielle : `granitisation-deformation` R2, `chaines-de-montagnes` R5)

**Filières et poids.** `svt-svt 6.3.1` à `6.3.6` ; `svt-pc 4.3.1` à `4.3.6`. Fréquence : **2026 N**
(gabbro → R1 à actinote → R2 à glaucophane → R3 à grenat et jadéite ; pression de 350 à 600 puis
1 580 MPa, température de 380 à 240 puis 300 °C ; « métamorphisme dynamique », 1,5 pt) ;
**PC 2026, Partie I** (définir le minéral index) [OFF-sujet].

**Ce que le bac demande.** Déterminer les caractéristiques minéralogiques et structurales des
roches métamorphiques des zones de subduction et de collision (échantillons, lames minces,
tableaux de composition) ; utiliser le **diagramme pression-température** et les domaines de
stabilité des **minéraux index** ; établir la relation minéraux index – **série métamorphique** –
type de métamorphisme ; distinguer métamorphisme **dynamique** et **thermodynamique** ;
représenter les étapes sur le diagramme P-T.

**L'idée-clé.** Une roche enfouie **ne fond pas** : ses minéraux se transforment, à l'état solide,
en minéraux stables aux nouvelles conditions. Certains minéraux n'existent que dans une fenêtre de
pression et de température : ce sont des **thermomètres et des baromètres**. Dans une subduction,
la plaque froide plonge vite : la pression monte beaucoup, la température peu.
*Image-clé :* le diagramme P-T avec ses domaines (le point triple andalousite – disthène –
sillimanite) et la flèche du trajet de la roche.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Chaînes de subduction et de collision | 2ème Bac, Geo1 | « Où trouve-t-on des roches enfouies puis remontées ? » | Geo1 |
| Minéral, roche, texture | 2ème année collège | « Le granite est-il fait d'un seul minéral ? » | 2AC, roches magmatiques |
| Pression, unités (Pa, MPa) | PC | « 1 GPa = combien de MPa ? » | rappel d'unités |
| Lire un diagramme à domaines | tronc commun (ou chimie : états de l'eau) | « Sur ce diagramme, dans quel domaine est le point (300 °C ; 1 000 MPa) ? » | atelier de diagramme |

**Conceptions erronées et pièges.**
- *« La pression qui métamorphise vient de l'altitude »* (inventaire de la leçon) : elle vient de
  l'**enfouissement**.
- *« Métamorphisme = fusion »* : c'est à l'état solide ; la fusion, c'est l'anatexie (Geo4).
- *« Plus profond = toujours plus chaud »* : dans une subduction, la température peut **baisser**
  pendant que la pression monte (les chiffres du sujet 2026). **Pari** sur la figure-clé.
- *« Un minéral index, c'est la couleur de la roche »*.
- Piège de vocabulaire : « dynamique » n'a pas ici le sens d'autres manuels (cataclase) ; suivre
  le vocabulaire des sujets marocains.

**Représentations.**
- **Manipulable « trajet P-T »** (la représentation centrale) : l'élève fait descendre une roche
  le long d'une subduction ou d'une collision ; les minéraux apparaissent et disparaissent selon
  les domaines ; **pari** : « en descendant dans la plaque plongeante, la température monte-t-elle
  aussi vite que la pression ? ».
- **Figure-clé pas à pas : du gabbro à l'éclogite** (12 étapes, données de 2026 : 350 → 600 →
  1 580 MPa ; 380 → 240 → 300 °C) [OFF-sujet].
- **Expérience réelle** : photos de lames minces au microscope polarisant (glaucophane bleu,
  grenat) [À VÉRIFIER : sources libres].
- **Analogie** : graphite et diamant, même carbone, minéraux différents selon la pression ;
  limite : le diamant n'est pas un minéral index du programme.

**Histoire et personnages.**
① **Barrow, 1893** : il cartographie dans les Highlands des zones de métamorphisme par minéraux
index — la première « série métamorphique » [V] (02 §5.3).
② L'obstacle : comment une roche peut-elle changer de minéraux sans fondre ? [À VÉRIFIER : source
historique avant de raconter ce débat].
③ Ce que ça a changé : une roche raconte la profondeur où elle est allée.

**Pour aller plus loin.** Les schistes bleus et les éclogites des Alpes ; la jadéite des objets
précieux [À VÉRIFIER].

**Liens.** Geo1 (subduction et collision) ; Geo4 (au-delà du solidus, la fusion) ; PC : pression
et unités.

**À trancher.** Ni minéraux index, ni série métamorphique, ni diagramme P-T des minéraux dans les
leçons : c'est l'écart le plus net entre la géologie de l'application et le cadre.

---

### Geo4. La granitisation : granite d'anatexie et granite intrusif   (`granitisation-deformation` R3-R5, partielle)

**Filières et poids.** `svt-svt 6.4.1` à `6.4.5` (et bilan `6.5.1`, `6.5.2`) ; `svt-pc 4.4.1` à
`4.4.5` (et `4.5.1`, `4.5.2`). Fréquence : à recompter dans les Parties I de géologie (2019 N,
2022 R, 2023 R, 2025 N) [À VÉRIFIER].

**Ce que le bac demande.** Caractériser le **granite d'anatexie** et les roches métamorphiques qui
l'entourent (gneiss, migmatites : passage progressif) ; utiliser le diagramme P-T (solidus) pour
en déterminer l'origine ; caractériser le **granite intrusif** et le **métamorphisme de contact**
(auréole, contact franc) ; analyser cartes et coupes ; exprimer graphiquement la relation
granitisation – métamorphisme. Le bilan du domaine (6.5) demande un schéma qui relie chaînes,
déformations, métamorphisme et granitisation à la tectonique des plaques.

**L'idée-clé.** Deux granites, deux histoires. Le **granite d'anatexie** naît sur place : la croûte
épaissie d'une collision chauffe jusqu'à franchir son point de fusion (plus bas si elle contient
de l'eau) ; on passe sans limite nette du gneiss à la migmatite puis au granite. Le **granite
intrusif** est un magma qui **monte** et cristallise dans des roches plus froides ; il les cuit
autour de lui (métamorphisme de contact) et s'en sépare par un contact net.
*Image-clé :* deux coupes côte à côte — un dégradé (anatexie) et une tache aux bords nets entourée
d'une auréole (intrusif).

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Texture grenue / microlitique | 2ème année collège (roches magmatiques) | « De gros cristaux : refroidissement lent ou rapide ? » | 2AC |
| Métamorphisme, diagramme P-T | 2ème Bac, Geo3 | « Où commence la fusion sur le diagramme ? » | Geo3 |
| Fusion, point de fusion | collège (PC) | « L'eau abaisse-t-elle ou élève-t-elle le point de fusion d'une roche ? » (l'abaisse) | analogie du sel sur la glace, avec ses limites |

**Conceptions erronées et pièges.** (inventaire de la leçon, plus)
- *« Le granite est une roche volcanique »*.
- *« La migmatite est un schiste plus érodé »*.
- *« La roche fond parce qu'elle est enfouie depuis longtemps »*.
- *« Tous les granites sont intrusifs »* — ou l'inverse.
- *« Le métamorphisme de contact est dû à la pression »* : il est **thermique**.

**Représentations.**
- **Manipulable « solidus et eau »** : un curseur de teneur en eau déplace la courbe de fusion ;
  **pari** : « une roche humide fond-elle à plus basse température ? ».
- **Figure-clé pas à pas : l'auréole de contact** (10 étapes : intrusion, chaleur, zones de
  minéraux selon la distance) [À VÉRIFIER : minéraux de l'auréole à enseigner].
- **Atelier « anatexie ou intrusif ? »** : classer des coupes et des photos d'affleurement selon le
  type de contact.
- **Constructeur de schéma bilan** (6.5) : glisser chaînes, déformations, métamorphisme et granites
  sur une coupe de convergence.

**Histoire et personnages.**
① **Hutton, été 1785, Glen Tilt** : des filons de granite **recoupent** les schistes ; le granite a
donc été fondu, et il est plus jeune — contre les « neptunistes » qui le croyaient précipité dans
l'eau [V] (02 §5.3). C'est exactement l'argument du contact intrusif.
② L'obstacle : un granite peut-il naître sans volcan ? (la réponse : oui, en profondeur, par fusion
de la croûte).
③ Ce que ça a changé : le granite devient un témoin des racines des chaînes de montagnes.

**Pour aller plus loin.** Les massifs granitiques du Maroc hercynien [À VÉRIFIER : nommer un massif
seulement avec une source].

**Liens.** Geo1-Geo3 ; PC : températures, changements d'état ; `theorie-tectonique-plaques`
(prérequis).

**À trancher.** Le granite intrusif et le métamorphisme de contact (au cadre) manquent ; les
ajouter à la leçon existante ou créer une leçon « granitisation » distincte de « déformations » ?

---

### Domaine « utilisation des matières organiques et inorganiques » (filière PC seulement)

Poids commun : domaine 3 du cadre SVT-PC, recouvrement **25 %**, **5 points** à l'examen (en
Partie I ou en exercice de Partie II, C-S2 p. 19-20) ; **absent** des cadres SVT et SM-A. Le tableau
de spécification ne cite que trois lignes : ordures ménagères, pollutions, éléments radioactifs
(C-S2 p. 19). Sujets relus : PC 2024 R (exercice 3, 4 pts : margines et barrage Sahla ; Partie I :
effet de serre, ordures ménagères, incinération) et PC 2026 N (exercice 3, 5 pts : pergélisol)
[OFF-sujet]. Ces capacités sont surtout **méthodologiques** : formuler un problème, exploiter des
données, appliquer le raisonnement scientifique, **exprimer son opinion**, **proposer des mesures**.
C'est le domaine où l'atelier de document (§2) rapporte le plus directement.

---

### M1. Les ordures ménagères   (absente de l'application)

**Filières et poids.** `svt-pc 3.1.1` à `3.1.8`. Fréquence : PC 2024 R, Partie I — vrai / faux
sur « Les ordures ménagères au Maroc se caractérisent par une humidité élevée et une grande teneur
en … » et sur l'incinération (« technique qui permet la diminution du volume des ordures
ménagères … ») [OFF-sujet, extrait].

**Ce que le bac demande.** Formuler un problème relatif aux ordures ménagères ; en déduire les
caractéristiques (nature, composition) ; déterminer les moyens d'élimination et de traitement —
**tri, recyclage, compostage, méthanisation, incinération** ; exploiter des données de gestion ;
montrer l'importance du recyclage (économique, écologique) et les impacts négatifs (environnement,
santé, économie) ; proposer des mesures.

**L'idée-clé.** Le bon traitement dépend de **ce qu'il y a dans la poubelle** : ce qui se trie se
recycle ; la matière organique se décompose — avec de l'O₂ (compostage : CO₂ et compost), sans O₂
(méthanisation : biogaz riche en méthane) ; l'incinération réduit le volume et produit de l'énergie
mais rejette des fumées et des cendres ; la décharge non contrôlée produit des **lixiviats** qui
gagnent les eaux.
*Image-clé :* un sac d'ordures et ses cinq destinations, chacune avec ce qu'elle produit et ce
qu'elle rejette.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Décomposeurs, cycle de la matière | tronc commun (écologie : flux de matière et d'énergie) | « Qui recycle la matière organique morte dans un écosystème ? » | TC, écologie |
| Respiration et fermentation | 2ème Bac, E1 | « Sans O₂, que produisent les micro-organismes à partir de la matière organique ? » | E1 |
| Combustion | PC collège / tronc commun | « Que produit la combustion complète d'une matière organique ? » | rappel de chimie |
| Pourcentages, diagrammes circulaires | collège | « 60 % de 2 kg = ? » | calcul guidé |

**Conceptions erronées et pièges.**
- *« Incinérer fait disparaître les déchets »* : il reste des cendres et des fumées.
- *« Compostage et méthanisation, c'est pareil »* : la différence, c'est l'O₂ (et le produit).
  **Pari** dans la simulation.
- *« Biodégradable = disparaît vite partout »*.
- *« Une décharge recouverte de terre ne pollue plus »* (lixiviats, biogaz).
- *« On peut recycler un plastique indéfiniment »* [À VÉRIFIER : formulation exacte].

**Représentations.**
- **Simulation « deux bacs »** : la même matière organique avec et sans O₂ ; gaz produits,
  température, résidu. **Pari** : « dans quel bac obtient-on du méthane ? ».
- **Manipulable « trier sa poubelle »** : glisser chaque déchet vers sa filière ; la masse envoyée
  en décharge baisse en direct [À VÉRIFIER : composition type à sourcer avant tout chiffre
  marocain].
- **Figure-clé pas à pas : le lixiviat** (8 étapes, de la décharge à la nappe phréatique).
- **Expérience réelle** : un petit compost suivi plusieurs semaines (température, volume).

**Histoire et personnages.**
① **Maroc, 1er juillet 2016** : entrée en vigueur de la **loi 77-15** qui interdit la fabrication,
l'importation, la commercialisation et l'utilisation des sacs en plastique (avec des exceptions,
dont les sacs de collecte des ordures) ; elle remplace la loi 22-10 de 2010 [SEC]
([LEAP-UNEP](https://leap.unep.org/countries/ma/national-legislation/loi-ndeg77-15-portant-interdiction-de-la-fabrication-de),
[Médias24, 1er juillet 2016](https://medias24.com/2016/07/01/au-1er-jour-seules-les-gms-appliquent-linterdiction-des-sachets-en-plastique/)).
② Le premier jour, seule une partie du commerce applique l'interdiction (Médias24) [SEC] —
une loi ne suffit pas, le comportement compte : c'est l'objectif « attitudes positives et
responsables » du cadre (C-S2 p. 5).
③ [NT] Pas d'autre accroche vérifiée ; à chercher : l'histoire du compostage ou d'une décharge
marocaine documentée.

**Pour aller plus loin.** Les métiers du traitement des déchets ; le biogaz.

**Liens.** E1 (respiration et fermentation des micro-organismes) ; M2 (lixiviats, gaz) ; chimie :
combustion.

---

### M2. Les pollutions des milieux naturels   (absente de l'application)

**Filières et poids.** `svt-pc 3.2.1` à `3.2.6`. Fréquence : **PC 2024 R, exercice 3** (margines
des huileries d'olive et eutrophisation du barrage Sahla) ; **PC 2026 N, exercice 3** (dégel du
pergélisol, CH₄ et CO₂, amplification du réchauffement) ; Partie I PC 2024 R (effet de serre)
[OFF-sujet]. En filière SVT, un exercice « pollution » de 2021 N relève d'un ancien cadre [PROPRE 01].

**Ce que le bac demande.** Poser un problème relatif à la pollution et formuler des hypothèses ;
exploiter des données sur les polluants et les milieux pollués (pollution liée à l'énergie et aux
industries chimiques, alimentaires, minérales) ; montrer les répercussions sur la santé,
l'environnement, l'économie ; **exprimer son opinion** sur l'utilisation de certains polluants ;
proposer des mesures et des alternatives.

**L'idée-clé.** Un polluant est une substance **en excès** pour un milieu. Il se suit de la source
au milieu, puis aux êtres vivants : certains s'**accumulent** le long des chaînes alimentaires ;
d'autres, comme les matières organiques et les nitrates-phosphates, déclenchent
l'**eutrophisation** — plus d'algues, donc plus de matière morte, donc plus de décomposeurs qui
**consomment l'O₂** de l'eau.
*Image-clé :* la cascade de l'eutrophisation — nutriments ↑ → algues ↑ → matière morte ↑ →
respiration des décomposeurs ↑ → O₂ ↓ → poissons morts.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Chaînes alimentaires, équilibres naturels | tronc commun (écologie) | « Que se passe-t-il pour un prédateur si sa proie accumule un poison ? » | TC, écologie |
| Respiration des micro-organismes | 2ème Bac, E1 | « Des bactéries qui décomposent beaucoup de matière : l'O₂ de l'eau monte ou baisse ? » | E1 |
| pH, acides | PC 2ème Bac | « Une pluie à pH 4 est-elle acide ? » | `content/pc/reactions-acido-basiques/lesson.md` |
| Lire des graphes de mesures sur plusieurs années | tronc commun | « Décrire l'évolution d'un indice de 1996 à 1998 » | atelier de document |

**Conceptions erronées et pièges.**
- *« L'effet de serre vient de l'absorption des ultraviolets par le CO₂ »* (c'est le vrai / faux de
  2024 R) : ce sont les **infrarouges** émis par la surface terrestre.
- *« Effet de serre et trou dans la couche d'ozone, c'est la même chose »*.
- *« Plus d'algues, donc plus d'oxygène »* : le paradoxe de l'eutrophisation. **Pari** dans la
  simulation.
- *« Un déchet naturel (les margines, des matières organiques) ne pollue pas »*.
- *« Diluer suffit »* : la bioaccumulation concentre au lieu de diluer.

**Représentations.**
- **Simulation d'eutrophisation** (la représentation centrale) : un curseur d'apport de matières
  organiques et de nutriments ; algues, O₂ dissous, poissons évoluent. **Pari** : « on double
  l'apport : l'O₂ du lac monte ou baisse ? ».
- **Figure-clé pas à pas : la bioaccumulation** (8 étapes, eau → plancton → petits poissons →
  gros poissons → humains) ; pari : « où la concentration est-elle la plus forte ? ».
- **Boucle de rétroaction du pergélisol** (2026) : réchauffement → dégel → méthanogènes → CH₄ →
  réchauffement.
- **Données réelles** : la figure du barrage Sahla (sujet 2024 R), à reprendre comme document de
  travail.

**Histoire et personnages.**
① **Maroc, barrage Sahla** : construit en 1994 sur l'oued Sahla près de Taounate ; les huileries y
déversent leurs margines de novembre à mars ; le sujet suit le degré d'eutrophisation de novembre
1996 à octobre 1998 et le coût des réactifs de traitement de l'eau (ONEP) [OFF-sujet RS 34F 2024].
Un exemple marocain **officiel**, tiré du bac lui-même.
② **Minamata (Japon)** : la découverte officielle date du 1er mai 1956 ; la cause est le
méthylmercure rejeté par l'usine de la Chisso de 1932 à 1968, accumulé dans les poissons et
coquillages ; 2 265 personnes officiellement reconnues malades en mars 2001 [V]
([Minamata disease](https://en.wikipedia.org/wiki/Minamata_disease)). Le moment où ça a coincé :
des années de déni entre les premiers cas et la reconnaissance.
③ Ce que ça a changé : la bioaccumulation devient un principe de toute évaluation des polluants.

**Pour aller plus loin.** La qualité de l'air en ville ; les engrais et les nappes ; le climat
(2026).

**Liens.** E1 ; M1 ; M4 (mesurer pour décider) ; chimie : pH et dosages ; PC : rayonnements
infrarouges (ondes électromagnétiques).

---

### M3. Les matières radioactives et l'énergie nucléaire   (absente de l'application)

**Filières et poids.** `svt-pc 3.3.1` à `3.3.7`. Fréquence : aucun exercice relevé dans les sujets
relus [NT] ; à recompter sur 2016-2025.

**Ce que le bac demande.** Formuler un problème lié à l'utilisation des matières radioactives et
de l'énergie nucléaire ; exploiter des données ; montrer **avantages et dangers** ; poser la
**problématique des déchets nucléaires** ; **exprimer son opinion** sur l'énergie nucléaire ;
proposer des mesures et des « alternatives écologiques ».

**L'idée-clé.** Les éléments radioactifs rendent des services (électricité sans combustion,
médecine, datation, traceurs) ; leurs rayonnements ionisants abîment l'**ADN** (mutations,
cancers) ; leurs déchets restent actifs pendant une durée fixée par leur **demi-vie** — de
quelques jours à des temps très longs —, d'où la question du confinement.
*Image-clé :* la courbe de décroissance d'un stock de déchets contenant plusieurs isotopes, en
échelle de temps qui s'allonge (jours, siècles, millénaires).

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Décroissance radioactive, demi-vie | **PC 2ème Bac** (la même année) | « Après deux demi-vies, quelle fraction reste ? » (¼) | `content/pc/decroissance-radioactive/lesson.md` |
| Fission, énergie de liaison | PC 2ème Bac | « D'où vient l'énergie d'une centrale nucléaire ? » | `content/pc/noyaux-masse-energie/lesson.md` |
| ADN, mutation | 2ème Bac, G1-G2 | « Une mutation dans une cellule de la peau se transmet-elle aux enfants ? » | G2 |

**Conceptions erronées et pièges.**
- *« Un aliment irradié devient radioactif »* ; *« irradiation = contamination »*.
- *« Après deux demi-vies, il ne reste rien »*.
- *« Toute radioactivité est artificielle »* : il existe une radioactivité naturelle (Oklo en est
  l'exemple extrême).
- *« Une centrale peut exploser comme une bombe »* [À VÉRIFIER : formulation exacte et nuancée].
- Piège de copie : donner une opinion sans données, ou des données sans opinion.

**Représentations.**
- **Manipulable « stock de déchets »** : plusieurs isotopes, un curseur de temps à échelle
  logarithmique ; **pari** : « dans 300 ans, quels isotopes restent ? » [À VÉRIFIER : choisir des
  isotopes et des demi-vies sourcés].
- **Réutiliser la grammaire de la PC** : la population de dés de la décroissance (02 §4.8), pour ne
  pas reconstruire l'idée de demi-vie.
- **Débat guidé** : avantages, dangers, déchets, alternatives ; l'élève construit sa position
  argumentée (format « exprimer son opinion »).
- **Frise** : Becquerel → Tchernobyl → aujourd'hui.

**Histoire et personnages.**
① **Oklo (Gabon)** : en 1972, des échantillons d'uranium contiennent 0,60 % d'uranium 235 au lieu
de 0,72 % ; le CEA comprend qu'un réacteur de fission **naturel** a fonctionné il y a environ
1,7 milliard d'années [V]
([Natural nuclear fission reactor](https://en.wikipedia.org/wiki/Natural_nuclear_fission_reactor)) —
un « stockage » géologique naturel de déchets.
② **Tchernobyl, 26 avril 1986**, réacteur n° 4 ; une zone d'exclusion de 10 km de rayon, étendue
ensuite à 30 km [V] ([Chernobyl disaster](https://en.wikipedia.org/wiki/Chernobyl_disaster)).
③ **Maroc** : le réacteur de recherche TRIGA Mark II de 2 MW du centre de la Maâmora (CNESTEN),
première criticité le 2 mai 2007, sert à la recherche, à la formation et à la production de
radio-isotopes [SEC]
([EPJ Web of Conferences, 2023](https://www.epj-conferences.org/articles/epjconf/pdf/2023/14/epjconf_animma2023_04002.pdf)).

**Pour aller plus loin.** La médecine nucléaire ; la datation (carbone 14 en PC) ; les déchets
nucléaires et le stockage géologique profond [À VÉRIFIER : exemple sourcé].

**Liens.** PC : décroissance radioactive et énergie nucléaire (même année : à synchroniser) ; G2
(mutations) ; T5 (anomalies) ; maths : exponentielle et logarithme.

**À trancher.** Ce chapitre doit-il s'appuyer sur la leçon de PC (prérequis immédiat) ou être
autonome ? Proposition : renvoi explicite à la leçon de PC, et une fiche SVT centrée sur les
effets biologiques et la gestion des déchets [À VÉRIFIER].

---

### M4. Le contrôle de la qualité et de la salubrité des milieux naturels   (absente de l'application)

**Filières et poids.** `svt-pc 3.4.1`, `3.4.2`. **Au tableau des contenus (C-S2 p. 5, 13) mais pas
au tableau de spécification** (p. 19) : poids d'examen incertain, sans doute faible [NC].
Fréquence : non relevé [NT].

**Ce que le bac demande.** Déterminer ou évaluer la qualité et la salubrité d'un milieu (eau,
sol, air) en appliquant des **normes de contrôle** et en exploitant des données ; proposer des
mesures de préservation.

**L'idée-clé.** On juge un milieu en comparant des **mesures** à des **normes** (physico-chimiques
et microbiologiques), et en lisant des **indicateurs vivants** qui intègrent la qualité sur la
durée [À VÉRIFIER : normes et indicateurs enseignés au Maroc — pH, O₂ dissous, nitrates,
coliformes ?].
*Image-clé :* un tableau de mesures face à une colonne de normes, avec le verdict ligne par ligne.

**Prérequis.**

| Prérequis | Niveau | Question-test | Si faux, revoir |
|---|---|---|---|
| Pollutions | 2ème Bac, M2 | « Pourquoi mesurer l'O₂ dissous d'une rivière ? » | M2 |
| pH, concentrations (mg/L) | PC | « 50 mg/L, c'est combien de grammes dans 10 L ? » | rappel d'unités |

**Conceptions erronées et pièges.**
- *« Une eau claire est une eau potable »*.
- *« Une seule mesure suffit à juger un milieu »*.

**Représentations.**
- **Manipulable « laboratoire d'analyse »** : des résultats d'analyse face aux normes ; l'élève
  rend un verdict argumenté ; **pari** avant de voir la norme.
- **Carte des points de prélèvement** le long d'une rivière (amont / aval d'un rejet).

**Histoire et personnages.**
① **John Snow, Londres, 1854** : il cartographie les cas de choléra, qui se groupent autour de la
pompe de Broad Street, et obtient que sa poignée soit retirée [V]
([1854 Broad Street cholera outbreak](https://en.wikipedia.org/wiki/1854_Broad_Street_cholera_outbreak)).
② **La légende** : on raconte que le retrait de la poignée a arrêté l'épidémie ; Snow lui-même
écrit que les cas avaient déjà beaucoup diminué [V] (même source) — une leçon d'esprit critique
sur les données.
③ Ce que ça a changé : l'eau comme vecteur de maladie, et l'idée de contrôler sa qualité.

**Pour aller plus loin.** Le contrôle de l'eau du robinet et les stations de traitement [À
VÉRIFIER : un exemple marocain sourcé, comme le coût du traitement mesuré par l'ONEP dans le sujet
2024 R].

**Liens.** M2 ; I (microbes pathogènes) ; chimie : dosages.

---

## 5. Hors cadre : les deux leçons sans capacité

**`role-enzymes`** (« Le rôle des enzymes dans la digestion »). Aucune occurrence d'« enzyme » ni de
« digestion » dans les trois cadres 2025 ; la digestion est au programme de **3ème année collège**
[SEC 9rayti]. Mais les sujets **utilisent** des enzymes comme données (SDH, MDH, LDH, citrate
synthase en 2024 R et 2026 N ; enzymes de restriction en génie génétique). Proposition [À
VÉRIFIER] : la garder comme **prérequis** (remédiation) en retirant la digestion du centre, et en
ajoutant « lire une activité enzymatique dans un document ».

**`theorie-tectonique-plaques`**. Pas de sous-domaine « théorie de la tectonique » en 2ème Bac :
c'est le premier chapitre de **2ème année collège** [SEC 9rayti]. Le domaine 6 l'utilise comme
cadre (« leur relation avec la tectonique des plaques »). Proposition : la garder comme
**prérequis** de Geo1, signalée comme telle dans le parcours.

**Également hors cadre dans des leçons existantes** : le système Rhésus (`soi-non-soi`), les
maladies auto-immunes (`dysfonctionnements-immunitaires`).

---

## 6. Ordre de construction proposé [À VÉRIFIER]

Par poids et par manque (01 §6, tableau §3) :

1. **Filière SVT et PC** : G2 (l'exercice de chaque année) puis G1, avec l'**atelier de mutation**
   et l'échiquier interactif comme briques communes.
2. **Filière SVT, PC, SM-A** : T3 (gènes liés, carte factorielle) et T1 (méiose) — au cadre des
   trois filières, absents.
3. **Filière SVT et PC** : E2 (le muscle, presque chaque année).
4. **Filière PC** : M1-M3 (un quart de l'épreuve, rien dans l'application).
5. **SM-A** : P3 (biométrie, 5 pts en 2026).
6. Compléments aux leçons existantes : codominance et gène létal (T2), complément et organes
   (I2-I3), greffe de moelle (I5), minéraux index et granite intrusif (Geo3-Geo4), nappes (Geo2).
7. La leçon transversale « **méthode de la Partie II** » (§2), à commencer tôt : elle sert partout.

---

## 7. Questions au propriétaire (SVT)

1. **Quelle filière servir d'abord en SVT ?** La filière SVT (coef 7, 15,2 % de la moyenne), la
   filière PC (coef 5, mais un domaine entier absent), ou la SM-A (coef 3, deux notions absentes) ?
2. **Les écarts de vocabulaire** : suivre strictement celui des sujets marocains (RH₂, 38 ATP,
   « métamorphisme dynamique ») même quand il diffère des manuels français ?
3. **Le hors cadre dans les leçons** (Rhésus, maladies auto-immunes, digestion) : le retirer, le
   déplacer en « pour aller plus loin », ou le garder ?
4. **Les gloses arabes et en darija** des mots-clés (méiose, crossing-over, minéral index…) : utiles
   pour des élèves qui ont appris la SVT en arabe jusqu'au collège ?
5. **« Exprimer son opinion »** (diagnostic prénatal, nucléaire, polluants) : jusqu'où l'application
   peut-elle accompagner un débat de société sans prendre parti ?
6. **Le Maroc dans les exemples** : Agadir 1960 et Al Haouz 2023 sont des deuils récents ; les
   utiliser en ouverture de géologie, ou seulement en « pour aller plus loin » ?
7. **Les expériences réelles** (extraction d'ADN, levures, boîte à sable, compost) : les filmer
   nous-mêmes, chercher des vidéos libres, ou s'en tenir aux simulations ?
8. **La durée de l'épreuve SVT en filière PC** : 3 h (sujets jusqu'en 2024) ou 4 h (corrigé 2026) ?
   Si tu as accès au sujet NS 34F 2026 ou à un enseignant, cela tranche.

---

## 8. Sources

- Cadres officiels, sujets 2026 et 2024 : voir [`sources/verification-svt.md`](sources/verification-svt.md) §1 et §9.
- Banque d'accroches SVT : [`docs/refonte/02-comprendre-en-profondeur.md`](../refonte/02-comprendre-en-profondeur.md)
  §5.3-5.4 (étiquettes [V] / [S] / [L] reprises telles quelles).
- Accroches ajoutées et vérifiées le 2026-10-22 (pages lues) : Meselson-Stahl, Nirenberg-Matthaei,
  Photo 51, Flemming, Griffith-Avery, Boveri-Sutton, Morgan, Tjio-Levan, Johannsen, Mayr,
  Bordet, Timothy Ray Brown, E. Donnall Thomas, insuline, *Agrobacterium*, *Bacillus
  thuringiensis*, ADN recombinant, Glaris, Rif, Atlas, Minamata, Oklo, Tchernobyl, Broad Street
  (liens dans chaque fiche) ; loi 77-15 et réacteur de la Maâmora [SEC].
- Leçons de l'application lues : les 11 dossiers de `content/svt/` (`lesson.md`, `items.yaml`).
