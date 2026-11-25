# Spec v3 : état d'équilibre, puis acides et bases en solution (`pc/acides-bases`, fiches C4 et C5)

> Plan d'auteur de la deuxième leçon pilote de chimie. Elle se place entre
> [`transformations-non-totales.md`](transformations-non-totales.md) (C3, leçon livrée :
> `web/src/components/pilote/transformations-non-totales-moteur.js`) et
> [`dosage-acido-basique.md`](dosage-acido-basique.md) (C6, plan). Règles :
> [`07-regles-du-format.md`](../07-regles-du-format.md) ; fichiers et champs :
> [`08-kit-de-lecon.md`](../08-kit-de-lecon.md) ; mouvement : [`09-regles-du-mouvement.md`](../09-regles-du-mouvement.md).
> Modèle de forme : `transformations-non-totales.md`. Fiches : bible **C4** et **C5**
> (`docs/bible/03-chimie.md`, avec ses §1-2). Leçons minées, non portées :
> `content/pc/etat-equilibre/` (`lesson.md` R3-R6, `items.yaml`) et `content/pc/reactions-acido-basiques/`
> (`lesson.md` R3-R8, `items.yaml`, figures `media/diagramme-predominance.*`, `media/distribution-curseur-pH.*`).
> L'auteur suit ce plan étape par étape ; il rédige les textes, il ne décide ni l'ordre, ni les paris, ni les leurres.
>
> **Tout nombre cité ici est à recalculer par le code** (fichier d'outils de la leçon, à créer ; nom selon la
> route, §8.4 question 7). Les valeurs écrites ci-dessous sont des contrôles faits à la main (§8.1).
>
> **Scène d'un type nouveau demandée : une seule, `axe`** (l'axe des pH piloté par le pH : la frontière 7 de
> l'eau, le pK_A d'un couple, les domaines de prédominance, la distribution, la bande de virage d'un
> indicateur ; §3.3). La scène `solution` de la leçon précédente est reprise en copie adaptée, avec un jeu de
> plus (`trio`, trois flacons et leur graphe Q_r) ; `avancement`, `barres`, `bac`, `quiz`, `end` sont des copies.

---

## 0. La décision de périmètre : C4 et C5 ensemble, sans la conductance

**C4 et C5 tiennent ensemble en 51 étapes, à une capacité près.** Trois raisons. K_A n'est pas une notion
nouvelle : c'est le K de la réaction d'un acide avec l'eau, et K_e celui de l'eau avec elle-même ; une fois Q_r
et K construits sur la solution d'acide de la leçon précédente (sa loupe, ses flacons, ses valeurs), C5 se
déroule sans changer d'objet. Le cadre SM range d'ailleurs les deux chapitres sous une seule entrée de l'annexe
(« 4. État d'équilibre d'un système chimique », avec le tiret « Transformations associées à des réactions
acido-basiques », `pc-sm.yaml` l. 540). Et les sujets enchaînent les deux dans chaque partie 1 : τ par le pH,
puis Q_r,éq, puis pK_A, puis l'espèce prédominante (2015 N, 2019 N, 2020 N, 2021 N, 2022 N, 2023 N). Le plan du
dosage estimait C5 seule à 35-40 étapes ; C4 en ajoute 11 ici parce qu'elle réutilise la scène de C3.

**Reste pour une leçon C4 à part (ou un chapitre « mesurer en chimie », question 1 du §8.3 du dosage) :**
`pc-pc 2.2.2.1` / `pc-svt 2.2.4.1` (la conductance G et σ = Σλᵢ[Xᵢ]), le TP n° 4 de l'annexe (« Détermination
de la constante d'équilibre chimique par mesure de la conductance », `pc-pc.yaml` l. 556, `pc-sm.yaml` l. 570),
τ par la conductivité (2019 N Q3, 2015 N 1-1, renvoyé de C3, §1.3 de son plan), le piège de copie
« σ calculé en mol·L⁻¹ » (bible C4), et la règle générale de la dilution sur Q_r (le facteur f^((a+b)−(c+d)) de
l'ancienne leçon R6). Une conductance demande un outil de physique (λ, unités en mol·m⁻³) que rien d'autre dans
cette leçon n'utilise : 8 à 10 étapes de plus, qui feraient passer la leçon au-delà de 55.

**Ce que le dosage suppose acquis (son §0), et où cette leçon le construit :**

| Acquis demandé par le dosage | Capacité | Étapes ici |
|---|---|---|
| K_e = [H₃O⁺][HO⁻], pK_e = 14 à 25 °C | `2.2.3.1`, `2.2.3.2` | `autoprotolyse`, `neutre` |
| nature d'une solution par son pH | `2.2.3.3` | `nature`, `predom`, `retour` |
| pH ↔ [H₃O⁺] ou [HO⁻] | `2.2.3.4` | `ho-ph`, `bac-2a` |
| expression de K_A, pK_A = −log K_A | `2.2.3.5`, `2.2.3.6` | `ka-nom`, `ka-tau`, `bac-ed`, `bac-pka` |
| K d'une réaction acido-basique à partir des K_A | `2.2.3.7` | `deux-couples`, `k-total`, `k-proches` |
| espèce prédominante ; diagrammes de prédominance (et de distribution en PC, SM) | `2.2.3.8`, `2.2.3.9` | `rapport` à `predom-distrib` |
| pH = pK_A + log([A⁻]/[AH]) (utilisé par `lent`, `demi`, `rapport` du dosage) | `2.2.3.5` | `rapport`, `egalite` |
| expression littérale de Q_r | `2.2.2.3` | `qr-nom` à `qr-exposants` |
| logarithme décimal | `maths-sexp 1.2.18` | `sav-test` (renvoi vers la leçon pilote `logarithme`) |

Le cas K = K_A/K_e (acide et HO⁻) reste au dosage (`fleche-K`, gabarit `dos-K`) : il n'est ni enseigné ni
exercé ici. **Ce que C3 avait renvoyé ici** : τ d'une base (2020 N, 2.2-2.3 : `bac-2a`, `bac-2b`) ; le τ ≈ 0,99
du sujet 2012, cité sans calcul (`k-total`) ; le pK_A caché derrière le pH 3,4 de son énigme (`ka-nom`) ; la
forme complète de « l'espèce ajoutée impose le sens » (B-6 de C3) reste à C7.

---

## 1. Périmètre

### 1.1 Le nom et les capacités officielles

Chapitres **« 2- Etat d'équilibre d'un système chimique »** et **« 3- Transformations associées à des réactions
acido-basiques en solution aqueuse »** du sous-domaine 2 (PC p. 15, `pc-pc.yaml` l. 417-443 ; SM p. 16,
`pc-sm.yaml` l. 432-458) ; en SVT, chapitres « 4- » et « 5- » (p. 11, `pc-svt.yaml` l. 338-364). Poids du
sous-domaine : 10 % (PC, SM), 11 % (SVT). Annexe des contenus, PC p. 24 (`pc-pc.yaml` l. 526-527) : « Quotient
de réaction Qr : Expression littérale en fonction des concentrations molaires des espèces chimiques dissoutes
pour un état donné du système » ; « Généralisation à différents cas : solution aqueuse homogène ou hétérogène
(présence de solides) » ; « Constante d'équilibre K associée à l'équation d'une réaction, à une température
donnée » ; « Influence de l'état initial d'un système sur le taux d'avancement final d'une réaction » ;
« Autoprotolyse de l'eau » ; « Echelle de pH : solution acide, solution basique et solution neutre » ;
« Comparaison des comportements, en solution aqueuse, des acides ou des bases ayant même concentration » ;
« Diagrammes de prédominance et de distribution » ; « Zone de virage d'un indicateur coloré acide-base ». Le
cadre SVT n'a pas d'annexe.

Libellés mot pour mot (PC ; SM identique, sauf `2.2.3.11` hors de cette leçon). Variantes SVT : `2.2.4.3`
« Donner et **exploiter** », `2.2.5.5` « Écrire et **exploiter** », `2.2.5.9` « **Représenter** et exploiter le
diagramme de prédominance » (sans la distribution).

| PC, SM | SVT | Libellé (cadre 2025, PC) | Où |
|---|---|---|---|
| `2.2.2.1` | `2.2.4.1` | Utiliser la relation liant la conductance G, d'une partie de solution, aux concentrations molaires effectives [Xi] des ions Xi en solution. | **non enseigné ici** (§0) |
| `2.2.2.2` | `2.2.4.2` | Savoir que, lorsque l'état d'équilibre du système est atteint, les quantités de matière n'évoluent plus, et que cet état d'équilibre est dynamique. | rappelé : `qr-monte`, `dilution-sens` (enseigné en C3 pour tous) |
| `2.2.2.3` | `2.2.4.3` | Donner et utiliser l'expression littérale du quotient de réaction Qr à partir de l'équation de la réaction. | partie 2 ; `ka-tau`, `bac-ed` |
| `2.2.2.4` | `2.2.4.4` | Savoir que le quotient de réaction Q_r,éq , associée à l'équation de la réaction, à l'état d'équilibre d'un système, prend une valeur, indépendante des concentrations, nommée constante d'équilibre K . | partie 3 |
| `2.2.2.5` | `2.2.4.5` | Savoir que, pour une transformation donnée, le taux d'avancement final dépend de la constante d'équilibre et de l'état initial du système. | `tau-k`, `dilution-sens`, `rappel` |
| `2.2.3.1` | `2.2.5.1` | Savoir que le produit ionique de l'eau, Ke , est la constante d'équilibre associée à l'équation de la réaction d'autoprotolyse de l'eau. | `autoprotolyse`, `neutre` |
| `2.2.3.2` | `2.2.5.2` | Connaitre la relation pKe = − log Ke | `neutre` |
| `2.2.3.3` | `2.2.5.3` | Déterminer la nature d'une solution aqueuse (acide ou basique ou neutre) à partir de la valeur de son pH | `nature`, `predom` |
| `2.2.3.4` | `2.2.5.4` | Déterminer la valeur du pH d'une solution aqueuse à partir de la concentration molaire des ions H3O⁺ ou HO⁻. | `ho-ph`, `bac-2a` |
| `2.2.3.5` | `2.2.5.5` | Ecrire et utiliser l'expression de la constante d'acidité KA associée à l'équation de la réaction d'un acide avec l'eau. | `ka-nom`, `ka-tau`, `rapport`, `bac-*` |
| `2.2.3.6` | `2.2.5.6` | Connaître la relation pKA = − log KA . | `ka-nom`, `comparer-acides`, `bac-pka` |
| `2.2.3.7` | `2.2.5.7` | Déterminer la constante d'équilibre associée à l'équation d'une réaction acido-basique à l'aide des constantes d'acidité des couples en présence. | partie 7 |
| `2.2.3.8` | `2.2.5.8` | Indiquer l'espèce prédominante connaissant le pH d'une solution aqueuse et le pKA du couple acide/base. | `predom`, `indicateur`, `zone-virage`, `retour-transfert` |
| `2.2.3.9` | `2.2.5.9` | Exploiter le diagramme de prédominance et de distribution des espèces acides et basiques présentes en solution aqueuse. | `domaines` (tous) ; `distribution`, `croisement`, `predom-distrib` (PC, SM) |

Préfixes : `pc-pc`, `pc-sm`, `pc-svt`. `2.2.3.10` à `2.2.3.14` (dosage, choix de l'indicateur) : leçon suivante ;
la zone de virage est enseignée ici comme application de `2.2.3.8` (annexe), le **choix** de l'indicateur
(`2.2.3.14`) n'est ni enseigné ni exercé.

### 1.2 Une seule séance

**Séance unique, « Deux frontières sur l'axe des pH »** (51 étapes ; 48 en SVT) : Q_r ; K, le même pour trois
flacons ; K_e et la frontière 7 ; K_A, pK_A, la comparaison des acides et des bases ; la prédominance (et la
distribution) ; K entre deux couples ; l'indicateur ; le retour à l'énigme ; deux sujets. La pause est proposée
à la 22ᵉ étape (§4).

### 1.3 Hors programme ici, qu'on n'enseigne pas

- La conductance et τ par σ (§0).
- Le critère d'évolution Q_r,i face à K (C7) : `dilution-sens` montre un Q_r qui remonte vers K, sans énoncer le
  critère ; le texte renvoie à la leçon « évolution spontanée ».
- La règle « zone de virage ≈ pK_A ± 1 » (aucun tiret, aucun sujet ; le dosage ne la prend pas non plus) : la
  leçon dit seulement que la zone entoure le pK_A de l'indicateur.
- Le choix d'un indicateur pour un dosage, K = K_A/K_e (dosage).
- Les solutions tampons, les polyacides, les activités ; le principe de Le Chatelier.
- La température : on dit que K est « associée … à une température donnée » (annexe) ; aucune valeur de K à une
  autre température n'est donnée ni demandée.

### 1.4 Filières

| | PC | SM | SVT |
|---|---|---|---|
| Parties 0 à 5, 7 à 11 | entières | entières | entières |
| Partie 6 : `rapport`, `egalite`, `predom`, `domaines` | `2.2.3.8`, `2.2.3.9` | idem | `2.2.5.8`, `2.2.5.9` (« Représenter » : c'est `domaines`) |
| Partie 6 : `distribution`, `croisement`, `predom-distrib` | `2.2.3.9` | idem | **retirées** : le cadre SVT n'a pas la distribution (§8.4 question 8) |
| Exemples du bac | 2022 N et 2020 N (sujets PC) | idem | idem (aucun sujet SVT transcrit) |

---

## 2. L'énigme et son retour

**L'énigme (partie 1).** L'[[helianthine|hélianthine]] est rouge dans une solution d'acide chlorhydrique de
pH 1,0, jaune dans une solution de soude de pH 13,0 (deux pastilles de référence). Un troisième flacon a un
pH de 5,0 : une solution acide. **L'élève parie** (`helianthine`) : deux gouttes d'hélianthine le teintent en
rouge, en jaune, ou en orange ? Il devient **jaune**, la teinte de la soude. Puis il fait descendre le pH lui-même
(`virage`) : la teinte ne change qu'entre 4,4 et 3,1 (zone du tableau du sujet 2020 N), loin de 7. **La question
qui reste ouverte : une solution acide, et l'indicateur a la teinte de la soude ; pourquoi ? Et pourquoi bascule-t-il
vers 4, et non vers 7 ?**

Pourquoi cette énigme et non celle de la bible C5 (« deux acides, même concentration, deux pH ») : C3 l'a prise
(son §8.3, question 8). Celle-ci porte la conception centrale de C5 (la nature de la solution, jugée face à 7,
confondue avec la forme qui prédomine, jugée face au pK_A), et elle ne se résout qu'au bout de la chaîne :
K → K_e (la frontière 7) → K_A (la frontière pK_A) → prédominance → indicateur.

**Le retour (partie 9).**
1. La solution est acide parce que pH 5,0 < 7, et 7 vient de K_e, une propriété de l'eau.
2. L'hélianthine est un couple HIn/In⁻ de pK_A ≈ 3,5 ; à pH 5,0 > 3,5, In⁻ prédomine : jaune. Sa teinte bascule
   dans sa zone de virage, autour de son pK_A.
3. Transfert (`retour-transfert`) : la phénolphtaléine dans une solution basique de pH 7,5 reste incolore.

Le fil rouge : **« deux frontières sur l'axe des pH »**. La marque 7 (de K_e) apparaît en partie 4, le pK_A d'un
couple en partie 6, les deux pK_A d'une réaction entre couples en partie 7, la bande de l'indicateur en partie 8 ;
le retour les montre ensemble.

---

## 3. La chaîne des idées

1. log, [H₃O⁺] = 10^(−pH), [AH]_éq = C − [H₃O⁺]_éq (C3) → 2. l'énigme : un indicateur qui a la teinte de la soude
dans une solution acide → 3. un nombre qui dit où en est le mélange : [A⁻][H₃O⁺]/[AH] monte puis se stabilise ;
on le nomme Q_r (produits sur réactifs, sans le solvant, sans les solides, coefficients en exposants) → 4. trois
flacons du même acide, trois τ : Q_r,éq a la même valeur, K ; K ne dépend que de la réaction et de la température ;
τ dépend de K et de l'état initial → 5. diluer divise Q_r par 10 ; il remonte vers K : τ augmente (la dilution de
C3 expliquée) → 6. l'eau réagit sur elle-même : K_e = [H₃O⁺][HO⁻] = 10⁻¹⁴ à 25 °C ; neutre à pH 7 ; acide, basique ;
pH depuis [HO⁻] → 7. le K d'un acide avec l'eau s'appelle K_A ; pK_A ; à même concentration, le plus petit pK_A
donne le pH le plus bas ; pour les bases, l'inverse ; K_A = Cτ²/(1 − τ) → 8. réarranger K_A : pH = pK_A +
log([A⁻]/[AH]) ; à pH = pK_A, autant de l'un que de l'autre ; une solution acide peut contenir surtout la base ;
prédominance ; distribution (PC, SM) → 9. deux couples : K = K_A1/K_A2 = 10^(ΔpK_A) ; K grand, pratiquement totale ;
K voisin de 1, limitée ; pH d'un mélange équimolaire → 10. l'indicateur est un couple ; zone de virage autour de
son pK_A → 11. retour → 12. le bac.

**Figure-clé : « trois flacons, un seul K »** (scène `solution`, jeux `zoom` puis `trio` ; 9 étapes, un
changement chacune). Un seul paramètre continu `tic` (M3) pilote la loupe, la courbe Q_r(tic) et les barres τ ; le
graphe n'a pas de graduation d'ordonnée avant `k-nom` (pour qu'aucune valeur ne s'y lise avant les questions).
Aucun texte ne nomme une couleur de trait.

| # | Étape | Le changement |
|---|---|---|
| 1 | `qr-monte` (partie 2) | **pari 1** ; la loupe de C3 au tic 0, un graphe Q_r vide ; au `reveal`, tic 0 → 30 (3 s) : la courbe monte et forme un palier |
| 2 | `qr-nom` | le bandeau de la formule Q_r sur le graphe |
| 3 | `qr-valeur` | au `apres`, l'étiquette du palier (1,65 × 10⁻⁵) et le pH-mètre (3,40) |
| 4 | `trois-flacons` (partie 3) | **pari 2** ; jeu `trio` : trois flacons, le graphe vide ; au `reveal` (2,5 s), trois courbes qui rejoignent la même hauteur |
| 5 | `meme-k-calc` | le flacon le plus dilué et sa courbe mis en valeur, son pH-mètre (3,92) |
| 6 | `k-nom` | la droite horizontale K, et la graduation de l'ordonnée |
| 7 | `tau-k` | trois barres τ sous les flacons (1,26 % ; 4,0 % ; 12,0 %) |
| 8 | `dilution-k` | le flacon du milieu versé dans la fiole ×10 ; au `apres`, sa courbe tombe à K/10 et s'arrête |
| 9 | `dilution-sens` | **pari 3** ; au `reveal`, la courbe remonte à K, la barre τ passe de 4,0 % à 12,0 % |

**Ses trois paris** : `qr-monte` (le rapport au fil des tics), `trois-flacons` (Q_r,éq du flacon dilué),
`dilution-sens` (Q_r après la chute). `helianthine` est le pari de l'énigme, `bac` celui du premier geste.

**Seconde figure : l'axe des pH** (scène nouvelle `axe`, figure de lecture, 15 étapes réparties de la partie 4 à
la partie 9) : 7 (`neutre`) → domaines acide et basique (`nature`) → curseur (`ho-ph`) → pK_A 4,8 (`rapport`) →
curseur sur 6,0 (`predom`) → domaines du couple (`domaines`) → courbes de distribution (`distribution`) → le couple
HCOOH/HCOO⁻ (`croisement`) → deux curseurs (`predom-distrib`) → deux pK_A (`k-proches`) → la bande de l'hélianthine
(`indicateur`) → la bande du BBT (`zone-virage`) → 7 et 3,5 ensemble (`retour`) → la bande de la phénolphtaléine
(`retour-transfert`). C'est l'image-clé de la bible C5.

### 3.1 Les parties (`BEATS`)

| # | name | court | étapes |
|---|---|---|---|
| 0 | Ce qu'il faut savoir | Savoir | 3 |
| 1 | L'énigme | Énigme | 3 |
| 2 | Où en est le mélange | Q_r | 5 |
| 3 | Trois flacons, un même acide | Flacons | 6 |
| 4 | L'eau elle-même | L'eau | 4 |
| 5 | La constante d'acidité | K_A | 5 |
| 6 | Qui l'emporte ? | Prédominance | 7 (SVT 4) |
| 7 | Deux couples face à face | Couples | 4 |
| 8 | L'indicateur coloré | Indicateur | 2 |
| 9 | Retour à l'énigme | Retour | 2 |
| 10 | Au bac | Au bac | 6 |
| 11 | Bilan | Bilan | 4 |

**51 étapes** (48 en SVT). Notation de C3 : **Q** question (une option `ok`, indice et second essai) ; **P** pari
de prédiction (sans `ok`, `reveal` tranche) ; **V** `verifie` ; **D** `deriv` ; **M** manipulation (`ctl`, avec
`need`). ✓ juste ; ✗ fausse, suivie de la conception affrontée (étiquette du §5) puis de l'idée du retour (B2).
**Chaque retour d'un leurre commence par nommer l'erreur** (« Q_r confondu avec K : … »), en deux phrases au plus.

### 3.2 Conventions et écritures (tenues partout)

Relevé des sujets transcrits (`docs/sujets/pc/reactions-acido-basiques.md`, `etat-equilibre.md`,
`transformations-deux-sens.md`) :
- quotient : Q_r, et « Q_{r,éq} » à l'équilibre (2015, 2020, 2021, 2022, 2023) ; « Q_{r,eq} » en 2012 ; la leçon
  écrit **Q_r** et **Q_r,éq** ;
- concentrations à l'équilibre : [H₃O⁺_(aq)]_éq (2022) ; la leçon écrit **[X]_éq**, et [X] dans Q_r quand l'état
  est quelconque ;
- K_e = 10⁻¹⁴ « à 25 °C » (données des sujets 2020, 2024, 2025) ; la leçon écrit **K_e = 1,0 × 10⁻¹⁴ à 25 °C** ;
- pK_A1, pK_A2 et « pK_A(CH₃COOH_(aq)/CH₃COO⁻_(aq)) » (2023) ; un couple s'écrit acide/base ;
- Q_r, K, K_e, K_A sans unité (convention, dite une fois à `qr-valeur`) ;
- **pK_A de l'acide éthanoïque** : 4,79 caché (calcul des pH des parties 2 et 3, comme en C3) ; à partir de
  `ka-nom`, la leçon affiche **4,8** (sujet 2012 N, et la valeur arrondie du calcul) ; le tableau du sujet 2021
  (4,75) n'est montré qu'en exercice (§8.4 question 6) ;
- pH affichés à deux décimales dans les parties 2 et 3 (l'arrondi d'une décimale fausse Q_r de plusieurs %) ;
- l'acide avec l'eau garde ⇄ ; les états physiques sont écrits dans chaque équation (bible §2.2, à vérifier au barème).

### 3.3 Les scènes

| Scène | Origine | Ce qu'elle montre |
|---|---|---|
| `solution` | copie adaptée de la scène de C3 (`transformations-non-totales-scenes-a.js`, `-scenes-b.js`) | jeu `becher` (flacon, pH-mètre, teinte d'un indicateur) ; jeu `zoom` (la loupe, et le graphe Q_r) ; **jeu `trio`, ajouté** |
| `axe` | **nouvelle, type nouveau** | voir ci-dessous |
| `avancement` | copie de C3 (`transformations-non-totales-scenes-c.js`) | le tableau, en concentrations (`conc`) ou en quantités |
| `barres` | copie adaptée de C3 (`transformations-non-totales-scenes-c.js`) | trois barres τ côte à côte (jeu `trois`) |
| `bac`, `quiz`, `end` | copies de C3 (`transformations-non-totales-scenes-d.js`) | les équations et la copie du sujet ; les copies fautives ; le bilan |

Comme en C3, aucune scène n'importe d'une autre leçon (outils copiés), sauf `mulberry32` et les outils de
formatage de `radioactivite-outils.js`.

**Scène nouvelle `axe`** (décision du propriétaire, 07 §3).
- *Pourquoi un type nouveau* : la règle graduée `rule` (`logarithme-moteur.js`) porte une addition de longueurs,
  pas des domaines ; `loi` est une courbe. Ici, un seul paramètre, le pH, pilote à la fois la position du curseur,
  le rapport [A⁻]/[AH] = 10^(pH − pK_A), le domaine qui s'allume et, en PC et SM, les deux pourcentages (M2 : le
  rapport est la cause, la position sur l'axe la grandeur lue). C'est la porte de cinq tirets (`2.2.3.3`, `.4`,
  `.8`, `.9`, et la zone de virage de l'annexe) ; le dosage en a besoin (son `sav-test`, `indicateur`, `bande`
  posent une bande sur un axe de pH).
- *État* (M3) : `etat(ph)`, fonction pure ; paliers nommés : 0 « très acide », 7 « neutre », pK_A « autant de
  l'un que de l'autre », 14 « très basique ».
- Disposition (1000 × 650) : l'axe 0 à 14 en haut, gradué par unité ; au-dessous, deux bandes de domaines (la
  solution : acide / basique de part et d'autre de 7 ; le couple : AH / A⁻ de part et d'autre du pK_A) ; à droite
  le rapport lu ; en PC et SM, le repère de distribution (pH en abscisse, alignée sur l'axe ; 0 à 100 % en
  ordonnée) ; en coin, une pastille de teinte et son nom écrit (« jaune », « rouge »).
- Paramètres : `p7` (la marque 7), `dsol` (domaines de la solution), `pk` (liste des pK_A posés), `couple`
  (`'ethan'`, `'metha'`, `'benzo'`, `'hel'`, `'bbt'`, `'phph'`), `dcp` (domaines du couple), `ph` (curseur ;
  masqué si `null`), `ph2` (second curseur, `predom-distrib`), `rap` (rapport affiché), `dist` (0 → 1, les courbes
  tracées), `bande` ([a, b], une zone de virage), `sw` (la pastille), `noms` (étiquettes des espèces). Le jeu
  `ctl:'ph'` ouvre le curseur à l'élève (`domaines`).
- M9 : avant chaque question, l'axe montre les marques et le curseur, jamais l'étiquette du domaine ni le
  pourcentage demandés. M5 : au plus quatre étiquettes à la fois ; noms d'espèces au-dessus des bandes, pas sur
  l'axe. Poids : ≤ 5 Ko compressés, à mesurer.
- Les teintes : aucune couleur d'indicateur n'existe dans les jetons (`web/src/lib/tokens.ts`). La pastille prend
  deux remplissages de classe (`f-a`, `f-b`) et **le nom de la teinte est écrit** ; « rouge », « jaune », « rose »,
  « incolore » sont des faits chimiques sourcés (§8.1), pas des noms de classes (§8.4 question 4).

**Jeu `trio`, ajouté à `solution`.** Trois flacons (C = 1,0 × 10⁻¹ ; 1,0 × 10⁻² ; 1,0 × 10⁻³ mol·L⁻¹), chacun son
pH-mètre ; à droite, le graphe Q_r(tic) de leurs trois courbes lisses « dans un bécher ». Le modèle est celui de
la loupe de C3, tel quel (p_d = 0,01, k = 0,0617, la relation n²/((100 − n)·vol) = p_d/k) avec vol = 0,1, 1 et 10 :
son palier est exactement la relation d'équilibre de K_A = 10^(−4,79), donc Q_r,éq = K_A pour les trois (contrôle
au montage, comme `VERIF_MODELE`). Paramètres : `cv` (0 → 1, courbes tracées), `grad` (graduation de l'ordonnée),
`kl` (la droite K), `tb` (barres τ), `hl` (le flacon mis en valeur), `dl` (la dilution du flacon du milieu : la
fiole ×10, la chute de sa courbe), `tic`. La note de bas de scène de C3 reste (« un modèle … un tic n'est pas une
durée mesurée »).

**Jeu `zoom` adapté** : paramètre `gq` (le graphe montre Q_r au lieu de n(A⁻)), `qrf` (le bandeau de la formule),
et le gros plan `acide:'eau'` (deux molécules d'eau, le proton qui passe, pour `autoprotolyse`). **Jeu `becher`
adapté** : `ind` (`'hel'`), `teinte` (0 masquée ; 1 la teinte calculée depuis le pH et la zone), `ref` (les deux
pastilles de référence), noms de flacons libres (`nomx`), pH imposé (`pv`) et curseur `ctl:'ph'` (`virage`).

---

### Partie 0 : Ce qu'il faut savoir (scènes `bac`, `avancement`)

- **`sav-test`** · `ctl:'saut'` (juste du premier coup : bouton vers `helianthine`) · **V** « −log(1,0 × 10⁻⁵) = ? »
  ✓ 5. ✗ −5 : le signe du « − » oublié (ab.log-signe) → −log(10⁻⁵) = −(−5). ✗ 10⁵ : log et puissance de 10
  confondus (ab.log-puissance) → log(10^x) = x. Si raté : renvoi vers la leçon pilote `logarithme`.
- **`sav-eq`** · scène `avancement`, `conc:1`, ligne finale masquée · **V** « AH + H₂O ⇄ A⁻ + H₃O⁺ ; C apportée,
  pH mesuré. À l'équilibre, [AH]_éq = ? » ✓ C − 10^(−pH). ✗ C : l'acide faible supposé intact (AB-CHAIN-1) → ce qui
  a réagi se retire, même si c'est peu. ✗ 10^(−pH) : réactif et produit échangés (tnt.x-colonne-acide) → 10^(−pH),
  c'est [A⁻]_éq = [H₃O⁺]_éq.
- **`sav-rappel`** · trois rappels : [H₃O⁺] = 10^(−pH), pH = −log[H₃O⁺] ; log(a·b) = log a + log b et
  log(a/b) = log a − log b ; τ = [H₃O⁺]_f/C. Pas d'action.

### Partie 1 : L'énigme (scène `solution`, jeu `becher`, `ind:'hel'`)

- **`helianthine`** · `pv:5.0, teinte:0, ref:1` (pastilles « pH 1,0 : rouge », « pH 13,0 : jaune ») · titre de scène
  « Deux gouttes d'hélianthine », sous-titre « pH 5,0 » · texte : rouge dans l'acide chlorhydrique, jaune dans la
  soude ; ce flacon a un pH de 5,0, une solution acide. **P** « Deux gouttes d'hélianthine dans ce flacon. Il
  prend la teinte… » options : « rouge : la solution est acide » / « jaune : comme dans la soude » / « orange :
  la solution est peu acide ». `reveal` : `teinte:1`, jaune. Conceptions AB-IND-2 (la 1ʳᵉ : l'indicateur
  changerait de couleur là où la solution change de nature, vers 7), ab.teinte-intermediaire (la 3ᵉ). Retours sans
  jugement ; celui de la 1ʳᵉ : « C'est ce que dit l'idée “acide, donc rouge”. Le flacon dit autre chose. »
- **`virage`** · **M** `ctl:'ph'` · `need` : le curseur passe sous 3,1 puis au-dessus de 4,4 · le pH du flacon de
  6,0 à 1,0, la teinte calculée (son nom écrit) : jaune au-dessus de 4,4, intermédiaire entre 4,4 et 3,1, rouge
  au-dessous (zone du tableau du sujet 2020 N). Texte : « Fais descendre le pH. Repère où la teinte change. »
- **`question`** · `fort` : « Une solution acide, et l'hélianthine y a la teinte de la soude. Pourquoi ? Et pourquoi
  bascule-t-elle vers 4, et non vers 7 ? » Pas d'action.

### Partie 2 : Où en est le mélange (scène `solution`, jeu `zoom` ; scène `bac`)

Valeurs : acide éthanoïque, C = 1,0 × 10⁻² mol·L⁻¹, pH 3,40 (calculé).

- **`qr-monte`** · pari 1/3 · `tic:0, gq:1, grad:0` · titre de scène « Un nombre, tic après tic » · texte : la loupe
  de la leçon précédente ; à chaque tic, on calcule [A⁻][H₃O⁺]/[AH] avec les concentrations du bécher. **P** « Au fil
  des tics, ce rapport… » options : « monte, puis se stabilise avec le compte des A⁻ » / « monte tant qu'il reste
  des AH à céder leur proton » / « monte, puis redescend quand le sens inverse l'emporte ». `reveal` : `tic:0→30`
  (3 s), la courbe lisse monte puis forme un palier. Conceptions mc.qr-croit-par-nature (la 2ᵉ) et
  mc.une-reaction-domine (la 3ᵉ). Retour de la 2ᵉ : « Le rapport suit la composition, pas le stock d'acide : au
  palier il reste 96 % des AH, et il ne bouge plus. » `apres` : au palier, des molécules changent encore, autant dans
  chaque sens (rappel de C3 ; `2.2.2.2`, SVT `2.2.4.2`).
- **`qr-nom`** · `qrf:1` · nom : [[quotient|quotient de réaction]] Q_r, produits au numérateur, réactifs au
  dénominateur. **Q** (`2.2.2.3`) « H₂O est un réactif, et pourtant il n'apparaît pas dans Q_r. Pourquoi ? » ✓ « l'eau
  est le solvant, pas une espèce dissoute ». ✗ « l'eau ne réagit pas : elle sert à dissoudre » (tnt.eau-solvant) →
  elle a capté le proton : elle a réagi ; c'est son rôle de solvant qui l'écarte. ✗ « l'eau est trop peu abondante
  pour compter » (ab.eau-negligeable) → c'est l'inverse : elle est partout autour des molécules d'acide.
- **`qr-valeur`** · `tic:30`, pH-mètre 3,40 · **V** « pH = 3,40 et C = 1,0 × 10⁻² mol·L⁻¹. Au palier, Q_r = ? »
  ✓ 1,65 × 10⁻⁵. ✗ 4,15 × 10⁻² : un seul facteur au numérateur (ab.qr-carre-oublie) → [A⁻] et [H₃O⁺] valent tous deux
  10^(−pH) : leur produit est un carré. ✗ 6,06 × 10⁴ : quotient renversé (ab.qr-inverse) → les produits en haut.
  `apres` : l'étiquette du palier ; Q_r est sans unité. (Le leurre « [AH] = C » n'est pas utilisé ici : il donne
  1,58 × 10⁻⁵, à 4 % de la réponse ; il sert à `meme-k-calc`, §8.1.)
- **`qr-solides`** · scène `bac`, `eqn` : Zn_(s) + Cu²⁺_(aq) ⇄ Zn²⁺_(aq) + Cu_(s) (sujet 2012 N, 2ᵉ partie,
  `docs/sujets/pc/evolution-spontanee.md`) · **Q** (annexe : « hétérogène (présence de solides) ») « Q_r = ? »
  ✓ [Zn²⁺]/[Cu²⁺]. ✗ [Zn²⁺][Cu]/([Cu²⁺][Zn]) : les solides écrits (ab.qr-solides) → seules les espèces dissoutes
  ont une concentration. ✗ [Cu²⁺]/[Zn²⁺] : réactifs en haut (ab.qr-inverse) → produits au numérateur. `apres` : sans
  rien sur les coefficients (c'est la question suivante).
- **`qr-exposants`** · `eqn` : 3 Ag⁺_(aq) + Cr_(s) ⇄ 3 Ag_(s) + Cr³⁺_(aq) (la pile du sujet 2020 N, `piles.md` ;
  l'équation bilan, que le sujet fait écrire, est écrite ici : §8.2 point 9) · **Q** « Q_r = ? » ✓ [Cr³⁺]/[Ag⁺]³.
  ✗ [Cr³⁺]/(3[Ag⁺]) : le coefficient pris pour un facteur (ab.coef-facteur) → trois ions Ag⁺, trois facteurs [Ag⁺].
  ✗ [Cr³⁺]/[Ag⁺] : le coefficient oublié (ab.coef-oublie). `apres` : chaque coefficient devient un exposant.

### Partie 3 : Trois flacons, un même acide (scène `solution`, jeu `trio`)

Valeurs : C = 1,0 × 10⁻¹ ; 1,0 × 10⁻² ; 1,0 × 10⁻³ mol·L⁻¹ ; pH 2,90 ; 3,40 ; 3,92 ; τ 1,26 % ; 4,0 % ; 12,0 %
(calculés, pK_A 4,79 caché).

- **`trois-flacons`** · pari 2/3 · tag facultatif `1864` (§8.3) · `cv:0, grad:0` · titre de scène « Trois flacons »,
  sous-titre les trois C · texte : le flacon du milieu est celui de la partie 2 ; le troisième est dix fois plus
  dilué ; au milieu Q_r,éq = 1,65 × 10⁻⁵ et τ = 4,0 % ; à droite τ = 12 % (la dilution de la leçon précédente).
  **P** « Le Q_r,éq du flacon dilué… » options : « triple » / « garde la même valeur » / « est divisé par 10 ».
  `reveal` : `cv:0→1` (2,5 s), trois courbes qui rejoignent la même hauteur. Conception mc.k-depend-etat-initial
  (les deux leurres : Q_r,éq suivrait τ, ou suivrait C). Retour de la 1ʳᵉ : « Q_r,éq lu comme τ : τ a triplé, mais
  [AH] a baissé aussi ; le rapport retombe sur la même valeur. » `apres` (si le tag est retenu) : en 1864, Guldberg
  et Waage proposent qu'à l'équilibre un même rapport des concentrations se retrouve, quel que soit le mélange de
  départ [V, §8.3].
- **`meme-k-calc`** · `hl:3`, pH-mètre 3,92 · **V** « C = 1,0 × 10⁻³ mol·L⁻¹, pH = 3,92. Q_r,éq = ? »
  ✓ 1,64 × 10⁻⁵. ✗ 1,45 × 10⁻⁵ : l'acide supposé intact, [AH]_éq = C (AB-CHAIN-1) → ici 12 % de l'acide a réagi :
  [AH]_éq = C − 10^(−pH). ✗ 0,137 (ab.qr-carre-oublie). `apres` : 1,65 et 1,64 : l'écart vient de l'arrondi du pH à
  deux décimales ; la courbe, calculée sans arrondi, tombe sur la même hauteur.
- **`k-nom`** · `kl:1, grad:1` · nom : Q_r,éq = K, la [[constante|constante d'équilibre]], la même pour les trois
  flacons (`2.2.2.4`). **Q** « Laquelle de ces opérations peut changer K ? » ✓ « la chauffer ». ✗ « la diluer dix
  fois » (mc.k-depend-etat-initial) → trois concentrations, un seul K : tu viens de le voir. ✗ « y ajouter un
  catalyseur » (tnt.catalyseur) → il fait atteindre l'équilibre plus vite, sans le déplacer. `apres` : « K ne
  dépend que de la réaction et de la température » (annexe : « à une température donnée ») ; rien sur τ (c'est la
  question suivante).
- **`tau-k`** · `tb:1` · **Q** (`2.2.2.5`) « Même K, et τ = 1,3 % ; 4,0 % ; 12 %. τ dépend… » ✓ « de K et de C ».
  ✗ « de K seulement » (tnt.conditions-sans-effet) → un seul acide, un seul K, et trois τ. ✗ « de C seulement »
  (ab.k-sans-effet) → à même C, l'acide chlorhydrique et l'acide éthanoïque n'ont pas le même τ (leçon précédente).
- **`dilution-k`** · `dl:1` (le flacon du milieu versé dans la fiole ×10), courbe figée au palier · **Q** « À
  l'instant de la dilution, chaque concentration est divisée par 10. Q_r vaut alors… » ✓ K/10. ✗ K
  (mc.confond-qr-et-k) → K est la valeur à l'équilibre ; à cet instant, le mélange dilué n'y est plus. ✗ 10 K
  (ab.qr-inverse) → deux concentrations en haut, une en bas : (1/10)²/(1/10). `apres` : la courbe tombe à K/10 et
  s'arrête là. Aucun retour ne dit ce qui suit.
- **`dilution-sens`** · pari 3/3 · **P** « Q_r vaut K/10. Ensuite… » options : « il remonte jusqu'à K : la réaction
  avance dans le sens direct » / « il reste à K/10 : la réaction s'est arrêtée au premier équilibre » / « il descend
  encore : la dilution fait reculer l'acide ». `reveal` : `tic` continu, la courbe remonte à K, la barre τ passe de
  4,0 % à 12,0 %. Conceptions mc.equilibre-est-un-arret (la 2ᵉ), tnt.dilution-diminue (la 3ᵉ). `apres` : « C'est le
  τ = 12 % de la dilution, dans la leçon précédente. Prévoir le sens par le calcul : leçon “évolution spontanée”. »

### Partie 4 : L'eau elle-même (scènes `solution` jeu `zoom`, `axe`)

- **`autoprotolyse`** · gros plan `acide:'eau'`, le proton sur sa molécule de départ (aucun transit dessiné avant la
  réponse) · texte : l'eau est un ampholyte (leçon précédente). **Q** (`2.2.3.1`) « Une molécule d'eau cède un proton
  à une autre. L'équation ? » ✓ 2 H₂O_(l) ⇄ H₃O⁺_(aq) + HO⁻_(aq). ✗ H₂O ⇄ H⁺ + HO⁻ : la demi-équation (tnt.demi-equation,
  AB-BASE-5) → un proton ne reste pas seul. ✗ H₂O ⇄ H₃O⁺ + HO⁻ : une seule molécule pour les deux rôles
  (ab.ampholyte-une-molecule) → l'une cède, une autre capte : compte les H. `apres` : le transfert s'anime ;
  [[autoprotolyse|autoprotolyse de l'eau]].
- **`neutre`** · scène `axe`, l'axe nu · **D** puis pari · lignes : K_e = [H₃O⁺]·[HO⁻] (r : Q_r,éq de l'autoprotolyse ;
  l'eau n'y figure pas) ; K_e = 1,0 × 10⁻¹⁴ à 25 °C et pK_e = −log K_e = 14 (r : la donnée des sujets) ; solution
  neutre : [H₃O⁺] = [HO⁻] (r : la définition). Pari « pH d'une solution neutre à 25 °C ? » ✓ 7. ✗ 14 : pK_e pris en
  entier (ab.neutre-pke) → [H₃O⁺]² = K_e : la moitié de 14. ✗ 1,0 × 10⁻⁷ : la concentration prise pour le pH
  (AB-BASE-2) → pH = −log(10⁻⁷). `apres` : `p7:1`, la marque 7 seule, sans les mots « acide » et « basique » (réponse
  de `nature`) ; [[produit-ionique|produit ionique de l'eau]].
- **`nature`** · **Q** (`2.2.3.3`) « pH = 5,0 à 25 °C, donc [HO⁻] = 1,0 × 10⁻⁹ mol·L⁻¹. La solution est… » ✓ « acide :
  [HO⁻] < [H₃O⁺] ». ✗ « basique : elle contient des HO⁻ » (AB-BASE-6) → toute solution aqueuse en contient ; c'est la
  comparaison qui décide. ✗ « neutre : les deux ions y sont » (ab.coexistence-neutre) → neutre, c'est autant de
  l'un que de l'autre. `apres` : `dsol:1`, les domaines acide et basique de part et d'autre de 7.
- **`ho-ph`** · **V** (`2.2.3.4`) « [HO⁻] = 2,0 × 10⁻³ mol·L⁻¹ à 25 °C. pH = ? » ✓ 11,3. ✗ 2,7 : −log[HO⁻] pris pour le
  pH (ab.ho-pris-pour-h3o) → passe par [H₃O⁺] = K_e/[HO⁻]. ✗ 16,7 : le signe perdu, 14 + 2,7 (AB-BASE-2) →
  pH = 14 + log[HO⁻], et ce log est négatif. `apres` : tex pH = pK_e + log[HO⁻] ; le curseur sur 11,3. (Valeur choisie
  pour ne pas donner d'avance celle de `bac-2a`.)

### Partie 5 : La constante d'acidité (scènes `solution`, `barres`, `avancement`)

- **`rappel`** · scène `solution` jeu `trio`, état final de `dilution-sens` · `sujet:'K et τ après une dilution'` ·
  texte : mi-parcours, c'est le bon moment pour une pause ; un rappel avant de repartir. **V** « On dilue 10 fois une
  solution d'acide méthanoïque à l'équilibre. Au nouvel équilibre… » ✓ « K le même, τ plus grand ». ✗ « K et τ plus
  grands » (mc.k-depend-etat-initial) → K ne dépend pas de la concentration. ✗ « K et τ inchangés »
  (tnt.conditions-sans-effet) → τ dépend de K et de C, et C a changé.
- **`ka-nom`** · scène `solution` jeu `becher` (le flacon de C3, pH 3,40) · nom : pour la réaction d'un acide avec
  l'eau, K s'appelle la [[constante-acidite|constante d'acidité]] K_A du couple ; tex K_A = [A⁻]_éq[H₃O⁺]_éq/[AH]_éq ;
  [[pka|pK_A]] = −log K_A (le « p » est celui du pH : fiche). **Q** (`2.2.3.5`, `2.2.3.6`) « Couple CH₃COOH/CH₃COO⁻ :
  K_A = 1,6 × 10⁻⁵. pK_A = ? » ✓ 4,8. ✗ −4,8 : le signe perdu (ab.pk-signe) → pK_A = −log K_A. ✗ 5,0 : l'exposant lu
  seul (ab.pk-exposant) → le 1,6 compte aussi. `apres` : « C'est de cette donnée de l'acide que la leçon précédente
  avait calculé le pH 3,4. » Rien sur la comparaison des acides (question suivante).
- **`comparer-acides`** · scène `barres`, jeu `trois`, barres et pH masqués · tableau du sujet 2021 N (sans l'acide
  éthanoïque, §3.2) · **Q** (annexe : « Comparaison … des acides … ayant même concentration ») « Trois solutions à
  1,0 × 10⁻² mol·L⁻¹ : HCOOH (pK_A 3,75), C₆H₅COOH (4,2), C₂H₅COOH (4,9). Laquelle a le pH le plus bas ? » ✓ « HCOOH :
  son pK_A est le plus petit ». ✗ « C₂H₅COOH : son pK_A est le plus grand » (AB-BASE-4) → plus petit pK_A, plus grand
  K_A. ✗ « les trois : même C, même pH » (AB-BASE-3) → même C, trois K_A. `apres` : barres τ 12 % ; 7,6 % ; 3,5 %,
  pH 2,90 ; 3,12 ; 3,46 (calculés) ; `fort` : « À même concentration, l'acide le plus fort a le plus petit pK_A. »
- **`ka-tau`** · scène `avancement`, `conc:1` · **D** puis pari (`2.2.3.5` ; formes 2015 N 1-2, 2019 N Q4, 2021 N
  2.3) · lignes : [H₃O⁺]_éq = [A⁻]_éq = C·τ (r : τ = [H₃O⁺]_f/C) ; [AH]_éq = C(1 − τ) (r : ce qui reste). Pari
  « K_A en fonction de C et τ ? » ✓ C·τ²/(1 − τ). ✗ C·τ² (AB-CHAIN-1) → [AH]_éq vaut C(1 − τ), pas C. ✗ τ²/(1 − τ)
  (ab.c-simplifiee) → C² en haut, C en bas : il reste un C. `apres` : sujet 2021 N, 2.3 : C_a = 0,10 mol·L⁻¹,
  τ = 1,32 % donnent 1,77 × 10⁻⁵ (la valeur imprimée).
- **`bases-comparer`** · scène `solution` jeu `becher`, `flacons:2` (ammoniac ; éthanoate de sodium), C = 1,0 × 10⁻²
  mol·L⁻¹, afficheurs masqués · **Q** (annexe : « … ou des bases ayant même concentration ») « NH₃ (couple NH₄⁺/NH₃,
  pK_A 9,2) et CH₃COO⁻ (couple CH₃COOH/CH₃COO⁻, pK_A 4,8), même C. Laquelle a le pH le plus haut ? » ✓ « NH₃ : son
  couple a le plus grand pK_A ». ✗ « CH₃COO⁻ : son couple a le plus petit pK_A » (AB-BASE-4, la règle des acides
  recopiée) → plus l'acide du couple est faible, plus sa base est forte. ✗ « les deux : même C, même pH » (AB-BASE-3).
  `apres` : afficheurs 10,6 et 8,4 (calculés).

### Partie 6 : Qui l'emporte ? (scène `axe`) · distribution : PC et SM seulement

Valeurs : CH₃COOH/CH₃COO⁻, pK_A = 4,8.

- **`rapport`** · `pk:[4.8], p7:1` · **D** puis pari (forme 2024 N 5-1) · lignes : [A⁻]/[AH] = K_A/[H₃O⁺] (r : on
  isole le rapport dans K_A) ; log([A⁻]/[AH]) = log K_A − log[H₃O⁺] (r : le log d'un quotient). Pari « Donc… »
  ✓ pH = pK_A + log([A⁻]/[AH]). ✗ pH = pK_A − log([A⁻]/[AH]) : le rapport lu à l'envers (AB-BASE-1) → à pH plus
  grand, c'est la base qui gagne. ✗ pH = log K_A + log([A⁻]/[AH]) (ab.pk-signe) → −log K_A = pK_A.
- **`egalite`** · **Q** « [A⁻] = [AH]. pH = ? » ✓ pK_A. ✗ 7 (AB-DIST-3) → 7 vient de K_e ; ici, c'est le couple qui
  décide. ✗ pK_A + 1 (ab.log-un) → log 1 = 0. `apres` : à pH = pK_A, autant de l'un que de l'autre.
- **`predom`** · `ph:6.0`, sans étiquette de domaine · **Q** (`2.2.3.8`) « Un mélange d'acide éthanoïque et
  d'éthanoate de sodium a un pH de 6,0. La solution est… » ✓ « acide, et CH₃COO⁻ prédomine ». ✗ « acide, donc CH₃COOH
  prédomine » (ab.nature-forme) → acide se juge face à 7 ; prédominer, face au pK_A. ✗ « basique, puisque CH₃COO⁻
  prédomine » (ab.nature-forme, sens inverse) → pH 6,0 < 7. `apres` : `rap:1`, [A⁻]/[AH] = 10^(6,0 − 4,8) ≈ 16.
- **`domaines`** · **M** `ctl:'ph'` · `need` : le curseur franchit le pK_A dans les deux sens · le rapport affiché en
  continu ; à l'issue, `dcp:1`, les deux domaines s'étiquettent · nom : [[predominance|diagramme de prédominance]]
  (`2.2.3.9` ; SVT `2.2.5.9`, « Représenter »). Texte : « Fais glisser le pH. Regarde le rapport passer par 1. »
- **`distribution`** · PC, SM · `ph:5.8` · **Q** (`2.2.3.9`) « pH = 5,8, une unité au-dessus du pK_A. Quelle part du
  couple est sous forme CH₃COO⁻ ? » ✓ environ 91 %. ✗ 100 % (AB-DIST-1) → au-dessus du pK_A la base l'emporte ;
  l'acide reste. ✗ environ 60 % (ab.distribution-lineaire) → une unité de pH, c'est un rapport 10 : 10 sur 11.
  `apres` : `dist:0→1`, les courbes %AH et %A⁻ ; [[distribution|diagramme de distribution]].
- **`croisement`** · PC, SM · `couple:'metha', dist:1`, pK_A non écrit · **Q** « Lis le pK_A de ce couple. » ✓ 3,75.
  ✗ 7,0 (AB-DIST-3) → le croisement est au pK_A du couple. ✗ 5,8 (AB-DIST-1 : le pK_A placé là où une forme atteint
  presque 100 %) → le pK_A est au croisement, à 50 %.
- **`predom-distrib`** · PC, SM · `ph:4.9, ph2:7.8` · **Q** « Couple de pK_A 4,8 : CH₃COO⁻ prédomine à pH 4,9 comme à
  pH 7,8. Sa part dans chacune ? » ✓ environ 56 % et 99,9 %. ✗ 100 % et 100 % (AB-DIST-2) → prédominer, c'est
  dépasser la moitié, pas être seul. ✗ environ 51 % et 80 % (ab.distribution-lineaire).

### Partie 7 : Deux couples face à face (scènes `bac`, `avancement`, `axe`)

- **`deux-couples`** · scène `bac` · sujet 2012 N, 1-2 (1 pt) : CH₃COOH + NH₃ ⇄ CH₃COO⁻ + NH₄⁺, pK_A1 = 4,8,
  pK_A2 = 9,2 · **D** puis pari (`2.2.3.7`) · lignes : K = [CH₃COO⁻][NH₄⁺]/([CH₃COOH][NH₃]) (r : Q_r,éq) ;
  K = ([CH₃COO⁻][H₃O⁺]/[CH₃COOH])·([NH₄⁺]/([NH₃][H₃O⁺])) (r : on multiplie et on divise par [H₃O⁺]). Pari « K = ? »
  ✓ K_A1/K_A2 ≈ 2,5 × 10⁴. ✗ K_A2/K_A1 ≈ 4,0 × 10⁻⁵ (AB-BASE-7) → le second facteur vaut 1/K_A2. ✗ pK_A2 − pK_A1 = 4,4
  (ab.k-egal-delta-pk) → l'écart des pK_A est log K. `apres` : tex K = 10^(pK_A2 − pK_A1) ; les deux pK_A sur l'axe.
  (Leurre écarté : K_A1·K_A2 = 10⁻¹⁴, la valeur de K_e, §8.1.)
- **`k-total`** · scène `avancement` (le tableau du 1-1, n₁ = n₂ = 1,0 × 10⁻³ mol) · **D** puis pari (sujet 2012 N, 1-3,
  1 pt) · lignes : n − x_f, n − x_f, x_f, x_f (r : quantités égales) ; K = x_f²/(n − x_f)² (r : le volume se simplifie).
  Pari « τ = ? » ✓ « ≈ 0,99 : pratiquement totale ». ✗ « ≈ 0,50 : la double flèche partage le mélange »
  (tnt.double-fleche-loin) → τ se calcule, il ne se lit pas sur la flèche. ✗ « ≈ 6,3 × 10⁻³ : x_f/n vaut 1/√K »
  (ab.rapport-inverse) → x_f/(n − x_f) = √K. `apres` : « Le τ ≈ 0,99 cité dans la leçon précédente : tu viens de le
  calculer. » Rien sur un K voisin de 1.
- **`k-proches`** · `axe`, `pk:[4.2, 4.8]` · **Q** « CH₃COOH + C₆H₅COO⁻ ⇄ CH₃COO⁻ + C₆H₅COOH : K = 10^(4,2 − 4,8) ≈ 0,25.
  Cette réaction… » ✓ « est limitée : ni totale, ni négligeable ». ✗ « est totale : un acide rencontre une base »
  (ab.acide-base-totale) → c'est K qui dit jusqu'où. ✗ « n'a presque pas lieu : K < 1 » (AB-BASE-8) → pour des
  quantités égales, τ ≈ 33 %. `apres` : τ ≈ 0,33 (calculé).
- **`ph-melange`** · **D** puis pari (forme 2023 N 2.3) · même mélange, quantités et volumes égaux · lignes :
  pH = 4,8 + log([CH₃COO⁻]/[CH₃COOH]) et pH = 4,2 + log([C₆H₅COO⁻]/[C₆H₅COOH]) (r : `rapport`, pour chaque couple) ;
  [CH₃COO⁻] = [C₆H₅COOH] et [CH₃COOH] = [C₆H₅COO⁻] (r : le tableau, quantités de départ égales). Pari « pH du
  mélange ? » ✓ (pK_A1 + pK_A2)/2 = 4,5. ✗ (pK_A1 − pK_A2)/2 = 0,30 (AB-BASE-9 : la différence, qui donne log K).
  ✗ pK_A1 + pK_A2 = 9,0 (ab.demi-oubliee) → on additionne deux égalités : 2 pH. `apres` : « valable seulement si les
  quantités de départ sont égales ».

### Partie 8 : L'indicateur coloré (scène `axe`)

- **`indicateur`** · `couple:'hel', pk:[3.5], bande:[3.1, 4.4], ph:5.0, sw:0` · nom : un [[indicateur|indicateur
  coloré]] est un couple HIn/In⁻ dont les deux formes n'ont pas la même couleur ; l'hélianthine : HIn rouge, In⁻ jaune,
  pK_A ≈ 3,5. **Q** (`2.2.3.8`) « Dans le flacon de l'énigme, à pH 5,0, quelle forme prédomine ? » ✓ In⁻. ✗ HIn
  (ab.nature-forme) → la solution est acide, mais pH 5,0 > 3,5. ✗ autant de l'une que de l'autre
  (ab.teinte-intermediaire) → la moitié-moitié, c'est au pK_A, 3,5. `apres` : `sw:1`, la pastille jaune.
- **`zone-virage`** · `couple:'bbt', bande:[6.0, 7.6]` (tableau du sujet 2018 N) · nom : [[virage|zone de virage]],
  l'intervalle de pH où la teinte change ; chaque indicateur a la sienne, autour de son pK_A. **Q** « Le BBT : forme
  acide jaune, forme basique bleue, zone 6,0-7,6. À pH 5,0, il est… » ✓ jaune. ✗ bleu (ab.virage-commun : il virerait
  au même pH que l'hélianthine) → sa zone est plus haut ; à pH 5,0 sa forme acide prédomine. ✗ d'une teinte
  intermédiaire (ab.teinte-intermediaire) → hors de sa zone, une forme impose sa couleur. `apres` : « Choisir
  l'indicateur d'un dosage : leçon “dosage acido-basique”. »

### Partie 9 : Retour à l'énigme (scènes `solution` jeu `becher`, `axe`)

- **`retour`** · le flacon jaune ; l'axe avec 7 et 3,5 · texte dépendant du pari `helianthine` (forme de
  `rappelEnigme`) : pH 5,0 < 7 : la solution est acide (frontière de l'eau, K_e) ; pH 5,0 > 3,5 : In⁻ prédomine, jaune
  (frontière du couple de l'indicateur) ; la teinte bascule dans sa zone, autour de son pK_A. `fort` : « Un indicateur
  dit le pH face à son pK_A, pas face à 7. » Pas d'action.
- **`retour-transfert`** · `couple:'phph', bande:[8.2, 10]` (tableau du sujet 2020 N) · **Q** « Phénolphtaléine :
  incolore sous sa zone, rose au-dessus. Une solution basique de pH 7,5. Elle y est… » ✓ incolore. ✗ rose (AB-IND-2) →
  basique se juge face à 7 ; la teinte, face à la zone 8,2-10. ✗ rose pâle (ab.teinte-intermediaire) → 7,5 est hors
  de la zone.

### Partie 10 : Au bac (scènes `bac`, `avancement`) : voir §6

`bac`, `bac-ed`, `bac-pka`, `bac-2a`, `bac-2b`, `bac-2c`.

### Partie 11 : Bilan (scènes `quiz`, `end`)

- **`q1`** · copie fautive (sujet 2023 N, §2, 2.2) · **V** « Une copie écrit : K = K_A2/K_A1 = 10^(4,79 − 3,75) ≈ 11 :
  la réaction est presque totale. Son erreur ? » ✓ « le rapport est renversé : K = K_A1/K_A2 ≈ 9,1 × 10⁻² ». ✗ « aucune :
  pour cette équation, K = K_A2/K_A1 » (AB-BASE-7) → l'acide qui réagit, CH₃COOH, donne K_A1 au numérateur. ✗ « il
  fallait multiplier : K = K_A1 × K_A2 » (AB-BASE-7, variante) → les deux [H₃O⁺] se simplifient par un quotient.
- **`q2`** · **Q** (`2.2.3.6`) « Acide benzoïque : K_A = 6,3 × 10⁻⁵. Acide éthanoïque : pK_A = 4,8. Le plus fort ? »
  ✓ « l'acide benzoïque : pK_A = 4,2 < 4,8 ». ✗ « l'acide éthanoïque : 4,8 > 6,3 × 10⁻⁵ » (ab.ka-pka-melanges) → on
  compare deux pK_A, pas un K_A et un pK_A. ✗ « l'acide éthanoïque : son pK_A est le plus grand » (AB-BASE-4).
- **`q3`** · **Q** « On dilue 10 fois le mélange de `k-proches`, à l'équilibre. τ… » ✓ ne change pas. ✗ augmente
  (mc.dilution-effet-universel) → ici deux espèces dissoutes de chaque côté : diluer ne change pas Q_r. ✗ diminue
  (tnt.dilution-diminue) → Q_r reste égal à K : rien ne bouge.
- **`fin`** · scène `end` (cinq lignes : Q_r, produits sur réactifs, sans solvant ni solide ; Q_r,éq = K, indépendant
  de l'état initial, τ en dépend ; K_e = 10⁻¹⁴ à 25 °C, neutre à pH 7 ; K_A, pK_A, pH = pK_A + log([A⁻]/[AH]) ;
  K = K_A1/K_A2) · fin de séance (forme de `profileHTML`) : les « Vérifie » réussies, les paris `helianthine`,
  `qr-monte`, `trois-flacons`, `dilution-sens`, `bac` rappelés ; renvoi piège par piège (B7) : Q_r mal construit →
  gabarit 1 ; K et dilution → 2 ; K_e, pH depuis [HO⁻] → 3 ; acide supposé intact, pK_A = pH → 4, 5 ; force et
  concentration → 6 ; K renversé → 7 ; pH d'un mélange → 8 ; nature et prédominance → 9 ; distribution → 10 ;
  indicateur → 11 ; copie du bac → 12.

### 3.4 Les règles de la relecture, appliquées aux paris

- **Titres** : aucune partie ni scène ne dit la réponse. La partie 3 ne s'appelle pas « La constante d'équilibre »
  (le mot « constante » trancherait `trois-flacons`) ; le graphe n'a pas de graduation d'ordonnée avant `k-nom`
  (sinon `meme-k-calc` se lirait sur la courbe) ; la scène de `helianthine` s'appelle « Deux gouttes
  d'hélianthine » ; celle de `qr-monte` « Un nombre, tic après tic ».
- **Ce que l'étape d'avant ne doit pas dire** (consignes à l'auteur) : `qr-monte` n'explique pas l'absence de l'eau ;
  `qr-solides` ne dit rien des coefficients ; `k-nom` ne parle pas de τ ; `dilution-k` ne dit pas que la réaction
  « reprend » (le texte dit « à l'instant de la dilution », pas « avant que la réaction ne reprenne ») ; `neutre`
  n'écrit pas « acide » ni « basique » ; `ka-nom` ne dit pas « plus fort = pK_A plus petit » ; `ho-ph` n'utilise
  pas 10,6 (la donnée de `bac-2a`) ; `k-total` ne dit rien d'un K voisin de 1.
- **Même forme** : dans chaque question, les trois options sont toutes chiffrées ou toutes littérales, toutes
  justifiées ou aucune (`trois-flacons`, `tau-k`, `k-nom`, `indicateur`, `zone-virage`, `retour-transfert` : aucune
  justification ; `helianthine`, `qr-monte`, `dilution-sens`, `comparer-acides`, `bases-comparer`, `k-total`,
  `k-proches` : toutes) ; aucune ne se répond par oui ou non (`q3` et `k-nom` sont posées en « lequel ») ; A5
  (longueur) à contrôler par `pilotes-regles`.
- **Valeurs** : aucun leurre ne tombe sur la bonne valeur, ni sur celle d'un autre leurre (contrôles du §8.1).

---

## 4. La pause et le rappel (A8)

La pause est proposée en tête de la partie 5, dans le texte de l'étape **`rappel`**, **22ᵉ étape sur 51 (43 %)** ;
**22ᵉ sur 48 (46 %)** en SVT (les trois étapes retirées sont après). Elle tombe à la frontière d'acte qui suit la
figure-clé et la partie sur l'eau (02 §4.7). Sa question « Vérifie » : **K et τ après la dilution d'une autre
solution d'acide** (✓ K le même, τ plus grand). Elle rappelle la partie 3 après quatre étapes sur l'eau, sur un autre
acide (transfert), et rejoue les deux leurres de la partie 3 (K qui suivrait C, τ fixé par K).

Contrôle A7 fait sur la liste : la plus longue suite d'étapes sans pari ni « Vérifie » est de 2 (`virage`, une
manipulation, puis `question`) ; ailleurs 1 (`sav-rappel`, `domaines`, `retour`, `bac-ed`, `fin`). Contrôle M7 : la
scène change un paramètre visible à chaque étape des parties 2, 3 et 6 ; la plus longue suite sur la scène `axe`
(`rapport` → `predom-distrib`, 7 étapes) a un ajout à chaque étape (`pk`, `ph`, `rap`, `dcp`, `dist`, `couple`,
`ph2`). A6 : aucune option « je ne sais pas ». A4 : chaque option fausse des **Q** et **V** porte un `indice`.

---

## 5. Conceptions erronées → étape qui les affronte (B5)

Sources : bible C4 et C5, « Conceptions erronées et pièges » ; `content/pc/etat-equilibre/items.yaml` (ids
`mc.physics.pc_etat_equilibre.*`, abrégés mc.) ; `content/pc/reactions-acido-basiques/items.yaml` (AB-) ;
conceptions de C3 reprises (tnt., registre de `web/src/lib/apprentissage-catalogue/graphe-transversal.ts`) ;
ajoutées ici (ab., préfixe libre dans ce registre), avec leur raison.

| Conception | Source | Étapes |
|---|---|---|
| mc.equilibre-est-un-arret : l'équilibre, c'est la réaction qui s'arrête | bible C4 | `dilution-sens` (et C3 : `qui`, `vitesses`, `equilibre`) |
| mc.une-reaction-domine : une des deux réactions bloque l'autre | bible C4 | `qr-monte` |
| mc.k-depend-etat-initial : K dépend des concentrations initiales ou du volume | bible C4 | `trois-flacons`, `k-nom`, `rappel` |
| mc.confond-qr-et-k : Q_r et K, la même chose ; Q_r constant | bible C4 | `dilution-k` |
| mc.dilution-effet-universel : la dilution a toujours le même effet sur τ | bible C4 | `q3` |
| mc.qr-construction-erronee : Q_r mal construit, déclinée en ab.qr-inverse, ab.qr-solides, ab.qr-carre-oublie, ab.coef-facteur, ab.coef-oublie, ab.eau-negligeable | bible C4 | `qr-nom`, `qr-valeur`, `qr-solides`, `qr-exposants`, `meme-k-calc`, `dilution-k` |
| mc.qr-croit-par-nature : Q_r augmente par nature | `items.yaml` C4 | `qr-monte` |
| mc.k-independant-temperature | `items.yaml` C4 | `k-nom` (la bonne réponse le contredit ; pas de leurre) |
| AB-CHAIN-1 : un acide faible supposé ne presque pas réagir | bible C5 ; `items.yaml` | `sav-eq`, `meme-k-calc`, `ka-tau`, `bac` |
| AB-BASE-1 : échelle de pH lue à l'envers (pH élevé, forme acide) | bible C5 | `rapport` |
| AB-BASE-2 : pH et concentration confondus | bible C5 | `neutre`, `ho-ph`, `bac-2a` |
| AB-BASE-3 : force et concentration confondues | bible C5 | `comparer-acides`, `bases-comparer` |
| AB-BASE-4 : K_A et pK_A comparés à l'envers ; ab.ka-pka-melanges (un K_A comparé à un pK_A) | bible C5 | `comparer-acides`, `bases-comparer`, `q2` |
| AB-BASE-5 : H⁺ libre dans une équation | `items.yaml` | `autoprotolyse` (avec tnt.demi-equation) |
| AB-BASE-6 : une solution qui contient HO⁻ est basique | `items.yaml` | `nature` |
| AB-BASE-7 : K d'une réaction écrit K_A2/K_A1, ou par un produit | bible C5 | `deux-couples`, `q1` |
| AB-BASE-8 : τ prédit sans K (K < 1, donc rien) | `items.yaml` | `k-proches` |
| AB-BASE-9 : pH d'un mélange de deux couples mal dérivé ; ab.demi-oubliee | bible C5 | `ph-melange` |
| AB-DIST-1 : la frontière lue comme une bascule totale | bible C5 | `distribution`, `croisement` |
| AB-DIST-2 : prédominance et distribution confondues | bible C5 | `predom-distrib` |
| AB-DIST-3 : l'égalité des formes placée à pH 7 | bible C5 | `egalite`, `croisement` |
| AB-IND-2 : un indicateur virerait à pH 7 | bible C5 | `helianthine`, `retour-transfert` |
| ab.nature-forme : la nature de la solution (face à 7) prise pour la forme qui prédomine (face au pK_A), dans les deux sens | ajoutée : la conception de l'énigme | `predom`, `indicateur` |
| ab.teinte-intermediaire : la teinte suit le pH pas à pas, partout | ajoutée : leurre naturel de l'énigme | `helianthine`, `indicateur`, `zone-virage`, `retour-transfert` |
| ab.virage-commun : tous les indicateurs virent au même pH | ajoutée : sert `zone-virage` | `zone-virage` |
| ab.log-signe, ab.log-puissance | ajoutées : prérequis | `sav-test` |
| tnt.x-colonne-acide, tnt.eau-solvant, tnt.catalyseur, tnt.conditions-sans-effet, tnt.dilution-diminue, tnt.double-fleche-loin | C3, reprises | `sav-eq` ; `qr-nom` ; `k-nom` ; `tau-k`, `rappel` ; `dilution-sens`, `q3` ; `k-total` |
| ab.k-sans-effet : τ fixé par C seule | ajoutée : 2.2.2.5 | `tau-k` |
| ab.ampholyte-une-molecule : une même molécule d'eau cède et capte | ajoutée : 2.2.3.1 | `autoprotolyse` |
| ab.neutre-pke : pH neutre = pK_e | ajoutée | `neutre` |
| ab.coexistence-neutre : les deux ions présents, donc neutre | ajoutée | `nature` |
| ab.ho-pris-pour-h3o : −log[HO⁻] pris pour le pH | ajoutée : 2.2.3.4 | `ho-ph`, `bac-2a` |
| ab.pk-signe, ab.pk-exposant | ajoutées : 2.2.3.6 | `ka-nom`, `rapport`, `bac-pka` |
| ab.c-simplifiee : C simplifiée à tort dans Cτ²/(1 − τ) | ajoutée : formes 2015, 2019, 2021 | `ka-tau` |
| ab.log-un : log 1 = 1 | ajoutée | `egalite` |
| ab.distribution-lineaire : dix points de pourcentage par unité de pH | ajoutée | `distribution`, `predom-distrib` |
| ab.k-egal-delta-pk : K pris pour l'écart des pK_A | ajoutée : 2.2.3.7 | `deux-couples` |
| ab.rapport-inverse : un rapport renversé | ajoutée | `k-total`, `bac-2b` |
| ab.acide-base-totale : un acide et une base réagissent toujours jusqu'au bout | ajoutée : annonce du dosage | `k-proches` |
| ab.pka-ph-solution : le pK_A pris pour le pH de la solution | ajoutée : 2022 1.4, 2020 2.5 | `bac`, `bac-pka`, `bac-2c` |
| ab.tau-base-h3o : τ d'une base calculé avec [H₃O⁺] | ajoutée : 2020 2.3, réflexe de C3 | `bac-2b` |
| ab.qr-base-pris-pour-ka : le Q_r,éq de la base avec l'eau pris pour K_A | ajoutée : 2020 2.5 ; ancienne leçon R6 | `bac-2c` |

Toutes les conceptions des fiches C4 et C5 sont affrontées, sauf le piège de copie « σ en mol·L⁻¹ » (conductance,
§0). Toutes les entrées AB-BASE-1 à -9, AB-DIST-1 à -3 et AB-CHAIN-1 sont affrontées, ce qui couvre celles que le
dosage laissait à C5 (AB-BASE-2, -4, -6, -8, -9, AB-DIST-2, AB-CHAIN-1). Non affrontées ici :
mc.critere-evolution-errone (C7), mc.reactif-epuise-transformation-totale (C3).

**Pari → conception que sa révélation réfute** (B5 ; une conception par pari) : `helianthine` → AB-IND-2 ;
`qr-monte` → mc.qr-croit-par-nature ; `trois-flacons` → mc.k-depend-etat-initial ; `dilution-sens` →
mc.equilibre-est-un-arret ; `bac` (premier geste) → AB-CHAIN-1.

---

## 6. Au bac (B6)

**L'exemple commenté** : bac PC 2022, session normale (NS 28F), Exercice 1, Partie 2, §1, questions **1.3**
(0,75 pt) et **1.4** (0,5 pt), barème imprimé (`docs/sujets/pc/reactions-acido-basiques.md`, entrée 2022, vérifié,
quatre passes). Données : C_a = 5 × 10⁻² mol·L⁻¹ ; pH = 3,1. Les questions 1.1 et 1.2 sont l'exemple commenté de C3 :
la leçon le dit (« la suite du sujet que tu as commencé »).

- **`bac`** · scène `bac` · « Question 1.3 : exprimer Q_r,éq en fonction de C_a et [H₃O⁺]_éq. Premier geste ? » (pari
  sans `ok` ; `reveal` : la ligne de Q_r,éq s'écrit). Options : « Écrire Q_r,éq sur l'équation, puis chaque
  concentration avec le tableau » (le bon réflexe) ; « Poser Q_r,éq = [H₃O⁺]²/C_a : l'acide est presque intact »
  (AB-CHAIN-1 : l'expression demandée garde C_a − [H₃O⁺]_éq) ; « Poser pK_A = pH = 3,1, puis en tirer Q_r,éq »
  (ab.pka-ph-solution : le pH est celui de la solution, le pK_A celui du couple).
- **`bac-ed`** · **D**, commenté, sans action (pensée d'expert) : « j'écris le quotient sur l'équation de 1.1 :
  Q_r,éq = [C₂H₅COO⁻]_éq[H₃O⁺]_éq/[C₂H₅COOH]_éq, l'eau n'y figure pas » ; « je lis le tableau de 1.2 :
  [C₂H₅COO⁻]_éq = [H₃O⁺]_éq et [C₂H₅COOH]_éq = C_a − [H₃O⁺]_éq » ; « j'écris l'expression demandée :
  Q_r,éq = [H₃O⁺]²_éq/(C_a − [H₃O⁺]_éq) » ; « je remplace en dernier : [H₃O⁺]_éq = 10^(−3,1) ≈ 7,9 × 10⁻⁴ mol·L⁻¹,
  Q_r,éq ≈ 1,28 × 10⁻⁵ ». L'expression littérale avant le nombre : consigne imprimée des sujets
  (`radioactivite-outils.js`, source 10, comme en C3).
- **`bac-pka`** · **Q** 1.4 « pK_A = ? » ✓ 4,89. ✗ 3,1 (ab.pka-ph-solution) → pK_A = −log K_A, et K_A = Q_r,éq. ✗ −4,89
  (ab.pk-signe). `apres`, `html` (forme de `bac-copie`) : la rédaction en cinq lignes ; barème 0,75 + 0,5 (cité du
  sujet). Aucune phrase sur ce que « le correcteur » attend.

**Le second exemple, que l'élève complète** : bac PC 2020, session normale (NS28F), Exercice I, Partie 1, §2
« Étude de la solution S_b », questions **2.2** (0,75 pt), **2.3** (0,5 pt), **2.4** (0,5 pt), **2.5** (0,5 pt),
barème imprimé (même fichier, entrée 2020, vérifiée). Données : pH(S_b) = 10,6 ; C_b = 10⁻² mol·L⁻¹ (que la question
1.3 fait « montrer ») ; K_e = 10⁻¹⁴. L'équation 2.1 (NH₃ + H₂O ⇄ NH₄⁺ + HO⁻) est écrite (C3, `ampholyte`). L'élève
choisit trois lignes :

- **`bac-2a`** · **Q** 2.2 « [HO⁻]_éq = ? » ✓ 10^(pH − 14) ≈ 4,0 × 10⁻⁴ mol·L⁻¹. ✗ 10^(−10,6) ≈ 2,5 × 10⁻¹¹ mol·L⁻¹
  (ab.ho-pris-pour-h3o) → c'est [H₃O⁺] ; [HO⁻] = K_e/[H₃O⁺]. ✗ K_e/10,6 ≈ 9,4 × 10⁻¹⁶ mol·L⁻¹ (AB-BASE-2) → le pH n'est
  pas une concentration.
- **`bac-2b`** · **Q** 2.3 « τ = ? » ✓ [HO⁻]_éq/C_b ≈ 4,0 × 10⁻². ✗ [H₃O⁺]/C_b ≈ 2,5 × 10⁻⁹ (ab.tau-base-h3o) → la base
  produit HO⁻ : c'est lui qui compte l'avancement. ✗ C_b/[HO⁻]_éq ≈ 25 (ab.rapport-inverse) → τ ≤ 1.
- **`bac-2c`** · **D** puis Q 2.4-2.5 · lignes : Q_r,éq = [NH₄⁺][HO⁻]/[NH₃] = (4,0 × 10⁻⁴)²/(1,0 × 10⁻² − 4,0 × 10⁻⁴)
  ≈ 1,65 × 10⁻⁵ (r : la valeur que 2.4 fait vérifier) ; K_A(NH₄⁺/NH₃) = [NH₃][H₃O⁺]/[NH₄⁺] (r : le K_A d'un couple est
  celui de son acide avec l'eau). Pari « pK_A = ? » ✓ « 9,2 : K_A = K_e/Q_r,éq ». ✗ « 4,8 : K_A = Q_r,éq »
  (ab.qr-base-pris-pour-ka) → Q_r,éq est la constante de la base avec l'eau ; leur produit fait K_e. ✗ « 10,6 :
  pK_A = pH » (ab.pka-ph-solution). `apres`, `html` : la rédaction ; barème 0,75 + 0,5 + 0,5 + 0,5 (cité).

Contrôle B3 : chaque leurre donne une valeur fausse (§8.1). La copie fautive est `q1` (2023 N, §2). Autres sujets
utilisés sans être l'exemple : 2012 N (`qr-solides`, `deux-couples`, `k-total`) ; 2020 N, pile (`qr-exposants`) ;
2021 N (`comparer-acides`, `ka-tau`) ; 2018 N et 2020 N, tableaux d'indicateurs (`zone-virage`, `virage`,
`retour-transfert`) ; 2024 N 5-1 (forme de `rapport`). Gardés frais pour les exercices : 2023 N 1.3 et §2,
2021 N 2.3-2.4, 2019 N Q4-Q7, 2015 N 1-2 et 1-3. Sujets 2026 cités par la bible : **non transcrits**, ils ne servent
pas.

---

## 7. Les exercices générés (fichier de gabarits à créer, format de `exercices/modele.js`)

Format de `web/src/components/pilote/exercices/transformations-non-totales.js` : réponse calculée ; chaque leurre
porte `fb` et `erreur` (id du §5). **Capacités** : une fonction `CAPAB(id)` qui rend `pc-pc id`, `pc-sm id` et
l'id SVT (2.2.2.r → 2.2.4.r ; 2.2.3.r → 2.2.5.r) ; le gabarit 10 n'a pas d'id SVT (`filieres: ["PC", "SM"]`).

**Règles de tirage communes (B3).**
- pK_A des sujets seulement : HCOOH 3,75 (2021, 2023) ; C₆H₅COOH 4,2 (2021) ; CH₃COOH 4,75 (2021), 4,79 (2023) ou
  4,8 (2012), une valeur par sujet rejoué ; C₂H₅COOH 4,9 (2021) ; acide lactique 3,9 (2018) ; NH₄⁺/NH₃ 9,2 (2012) ;
  HSO₃⁻/SO₃²⁻ 7,2 (2025). Indicateurs : zones des tableaux 2018 et 2020 ; teintes : hélianthine, BBT,
  phénolphtaléine seulement (sourcées, §8.1).
- Les pH « mesurés » sont calculés depuis le pK_A, arrondis à deux décimales ; **la réponse se calcule depuis le pH
  affiché** ; pH de 2,0 à 12,0 ; C dans {1,0 ; 2,0 ; 5,0} × 10⁻³ à 10⁻¹ mol·L⁻¹.
- Rejet de tout tirage où un leurre tombe à 2 % de la réponse ou d'un autre leurre. Coïncidences connues :
  le leurre « [AH] = C » est à 1/(1 − τ) de la réponse (rejet si τ < 3 %) ; « K_A1·K_A2 » vaut K_e quand
  pK_A1 + pK_A2 = 14 (la paire 4,8 et 9,2 : rejet du leurre produit) ; le pH d'un mélange équimolaire vaut 7 pour
  cette même paire (rejet si |(pK_A1 + pK_A2)/2 − 7| < 0,1 quand un leurre « 7 » est montré) ; le leurre linéaire de
  la distribution égale la réponse à pH = pK_A (rejet si |pH − pK_A| < 0,2 ou > 3,5) ; prédominance : rejet si
  |pH − pK_A| < 0,3.

| # | id | Niveau | Tirage | Capacités (PC/SM) | Erreurs attendues |
|---|---|---|---|---|---|
| 1 | `ab-qr` | 1 | une équation : acide ou base avec l'eau, deux couples, un solide (2012 pile), un coefficient (2020 pile) ; Q_r parmi quatre | 2.2.2.3 | ab.qr-inverse ; ab.qr-solides ; eau dans Q_r (ab.eau-negligeable) ; ab.coef-facteur ; ab.coef-oublie |
| 2 | `ab-k` | 2 | questions tirées : Q_r,éq de deux flacons d'un même acide (pH calculés) ; ce qui change K (dilution, ajout, catalyseur, température) ; τ après dilution ; Q_r à l'instant d'une dilution | 2.2.2.2, 2.2.2.4, 2.2.2.5 | mc.k-depend-etat-initial ; mc.confond-qr-et-k ; mc.equilibre-est-un-arret ; tnt.conditions-sans-effet ; tnt.catalyseur |
| 3 | `ab-ke` | 1 | pH → [HO⁻] ou [HO⁻] → pH ; nature d'une solution ; pK_e | 2.2.3.1 à 2.2.3.4 | ab.ho-pris-pour-h3o ; AB-BASE-2 ; AB-BASE-6 ; ab.neutre-pke ; ab.coexistence-neutre |
| 4 | `ab-ka-ph` | 2 | C et pH → [H₃O⁺], [A⁻], [AH], K_A, pK_A (forme 2022 1.3-1.4, 2023 1.3) | 2.2.3.5, 2.2.3.6 | AB-CHAIN-1 (τ ≥ 3 %) ; ab.pka-ph-solution ; ab.pk-signe ; ab.qr-carre-oublie |
| 5 | `ab-ka-tau` | 2 | C et τ → K_A = Cτ²/(1 − τ), puis pK_A (formes 2015 1-2, 2019 Q4, 2021 2.3) | 2.2.3.5, 2.2.2.3 | AB-CHAIN-1 ; ab.c-simplifiee ; ab.pk-exposant |
| 6 | `ab-comparer` | 1 | deux ou trois acides (ou bases) à même C, donnés par K_A ou pK_A mêlés ; le pH le plus bas (le plus haut) | 2.2.3.6 | AB-BASE-3 ; AB-BASE-4 ; ab.ka-pka-melanges |
| 7 | `ab-k-couples` | 2 | deux couples de la liste ; K = 10^(pK_A2 − pK_A1) selon le sens écrit ; τ pour des quantités égales ; conclure | 2.2.3.7 | AB-BASE-7 ; ab.k-egal-delta-pk ; AB-BASE-8 ; ab.acide-base-totale ; tnt.double-fleche-loin |
| 8 | `ab-melange` | 3 | mélange équimolaire A₁H + A₂⁻ : K, puis pH = (pK_A1 + pK_A2)/2, et sa condition (forme 2023 2.2-2.3) | 2.2.3.7, 2.2.3.5 | AB-BASE-9 ; ab.demi-oubliee ; quantités inégales (AB-BASE-9) |
| 9 | `ab-predom` | 1 | pH et pK_A → espèce prédominante, nature de la solution, rapport [A⁻]/[AH] ; placer les domaines | 2.2.3.8, 2.2.3.9 | ab.nature-forme ; AB-BASE-1 ; AB-DIST-3 ; ab.log-un |
| 10 | `ab-distribution` | 2 | % d'une forme à un pH ; lecture du pK_A au croisement ; deux solutions où la même forme prédomine | 2.2.3.9 (PC, SM) | AB-DIST-1 ; AB-DIST-2 ; AB-DIST-3 ; ab.distribution-lineaire |
| 11 | `ab-indicateur` | 1 | un indicateur (hélianthine, BBT, phénolphtaléine), un pH ; la teinte, la forme qui prédomine | 2.2.3.8 (annexe : zone de virage) | AB-IND-2 ; ab.nature-forme ; ab.teinte-intermediaire ; ab.virage-commun |
| 12 | `ab-bac` | 3 | rejoue 2022 1.3-1.4 ; 2020 2.2-2.5 ; 2023 1.3 et 2.1-2.3 ; 2021 2.3-2.4 (identifier l'acide dans le tableau) ; 2015 1-2 et 1-3 (τ = 0,072 donné par l'énoncé) ; 2019 Q4, Q6, Q7 avec τ donné (**forme modifiée**, la Q3 passe par σ) ; 2012 1-2 et 1-3 ; valeurs imprimées une fois sur trois | 2.2.2.3, 2.2.3.4 à 2.2.3.8 | ceux des étapes `bac-*` ; rejet si l'arrondi du pH fait changer l'acide identifié (2021) |

Niveaux : 1 = restituer, lire, convertir ; 2 = appliquer une relation à un cas ; 3 = enchaîner tableau, relation et
conclusion (une question de bac à 0,75 pt). Chaque question porte `sujet` (B7). Aucun exercice ne teste `2.2.2.1`
(conductance), `2.2.3.14` (choix d'un indicateur pour un dosage), ni K = K_A/K_e.

---

## 8. À vérifier, et questions pour le relecteur

### 8.1 Les données (pour le fichier d'outils)

| Donnée | Source | Statut |
|---|---|---|
| 2022 N, Ex. 1 P2 §1 : C_a = 5 × 10⁻², pH = 3,1 ; 1.3 (0,75), 1.4 (0,5) | `docs/sujets/pc/reactions-acido-basiques.md` (4 passes) | [V] |
| 2020 N, Ex. I P1 §2 : pH(S_b) = 10,6, K_e = 10⁻¹⁴, Q_r,éq = 1,65 × 10⁻⁵ « à vérifier » par l'élève ; 2.2 (0,75), 2.3-2.5 (0,5 chacune) ; tableau d'indicateurs 3,1-4,4 / 4,2-6,2 / 8,2-10 | idem | [V] |
| 2020 N, pile argent-chrome : Ag⁺, Cr³⁺, électrodes Ag et Cr | `docs/sujets/pc/piles.md` | [V] ; l'équation bilan est déduite (point 9) |
| 2012 N, 1ʳᵉ partie : pK_A1 = 4,8, pK_A2 = 9,2, n₁ = n₂ = 10⁻³ mol, 1-2 (1 pt), 1-3 (1 pt) ; 2ᵉ partie : Zn_(s) + Cu²⁺ ⇄ Zn²⁺ + Cu_(s), K = 5 × 10³⁶ | `docs/sujets/pc/transformations-deux-sens.md`, `evolution-spontanee.md` | [V] |
| 2021 N : tableau des pK_A (3,75 ; 4,2 ; 4,75 ; 4,9), pH = 2,88, τ ≈ 1,32 %, Q_r,éq ≈ 1,77 × 10⁻⁵ | `reactions-acido-basiques.md` | [V] |
| 2023 N : §1 C_A = 5 × 10⁻², pH = 3,05, pK_A1 ≃ 4,79 ; §2 pK_A2 = 3,75, 2.1 (0,75), 2.2 (0,75), 2.3 (0,5) | `etat-equilibre.md`, `reactions-acido-basiques.md` | [V] |
| 2015 N §1 (τ = 0,072, C = 10 mol·m⁻³) ; 2019 N Q4-Q7 (C = 10⁻³ mol·L⁻¹, σ, λ) ; 2018 N : B.B.T 6-7,6 | idem | [V] |
| 2024 N 5-1 : établir l'expression du pK_A (forme de `rapport`) | `reactions-acido-basiques.md` | [V] |
| annexe des contenus ; TP n° 4 ; SM : C4 et C5 sous une seule entrée | `pc-pc.yaml` l. 526-527, 556 ; `pc-sm.yaml` l. 540, 570 | [V] |
| hélianthine (méthylorange) : « In an acid, it is reddish and in alkali, it is yellow », 3,1 (rouge) - 4,4 (jaune), pK_A 3,47 à 25 °C | Wikipédia, [Methyl orange](https://en.wikipedia.org/wiki/Methyl_orange) (lu le 2026-11-25) | [V] sur la page |
| BBT jaune 6,0-7,6 bleu ; phénolphtaléine incolore 8,3-10,0 « purple-pink » ; « when pH equals the pKa … both species are present in a 1:1 ratio » | Wikipédia, [pH indicator](https://en.wikipedia.org/wiki/PH_indicator) (lu le 2026-11-25) | [V] sur la page ; la leçon garde les zones **des sujets** |
| Guldberg et Waage, 1864 : à l'équilibre, « the ratio between the concentration of reactants and products is constant » ; équilibre dynamique | Wikipédia, [Law of mass action](https://en.wikipedia.org/wiki/Law_of_mass_action) (lu le 2026-11-25) | [V] sur la page |
| valeurs de la leçon : acide éthanoïque, trois C ; pK_A 4,79 caché, 4,8 affiché ; [HO⁻] = 2,0 × 10⁻³ (`ho-ph`) ; pH 6,0 du mélange de `predom` | choix d'auteur | — |

**Contrôles faits à la main (le code les refera).** K_A = 10^(−4,79) = 1,622 × 10⁻⁵. pH calculés : C = 10⁻¹ →
[H₃O⁺] = 1,265 × 10⁻³, pH 2,898 (affiché 2,90) ; 10⁻² → 3,947 × 10⁻⁴, pH 3,404 (3,40) ; 10⁻³ → 1,195 × 10⁻⁴, pH 3,923
(3,92). Depuis les pH affichés : τ = 1,26 % ; 3,98 % ; 12,0 % ; Q_r,éq = 1,61 × 10⁻⁵ ; 1,65 × 10⁻⁵ ; 1,64 × 10⁻⁵.
`qr-valeur` : 1,651 × 10⁻⁵ ; leurres 4,15 × 10⁻² et 6,06 × 10⁴ ; leurre écarté « [AH] = C » : 1,585 × 10⁻⁵ (4 % de la
réponse). `meme-k-calc` : 1,643 × 10⁻⁵ ; leurres 1,445 × 10⁻⁵ (12 % plus bas) et 0,137. Modèle : p_d/k = 0,1621 =
K_A × 100/C₀ : le palier vaut K_A pour vol = 0,1, 1 et 10. `neutre` : 7 ; leurres 14 et 1,0 × 10⁻⁷. `ho-ph` :
14 + log(2,0 × 10⁻³) = 11,30 ; leurres 2,70 et 16,70. `ka-nom` : −log(1,6 × 10⁻⁵) = 4,80 ; leurres −4,8 et 5,0.
`comparer-acides` (C = 10⁻²) : HCOOH [H₃O⁺] = 1,248 × 10⁻³, pH 2,90, τ 12,5 % ; C₆H₅COOH 7,63 × 10⁻⁴, pH 3,12, 7,6 % ;
C₂H₅COOH 3,49 × 10⁻⁴, pH 3,46, 3,5 %. `bases-comparer` : NH₃ (K_b = 10^(−4,8)) [HO⁻] = 3,90 × 10⁻⁴, pH 10,59 ;
CH₃COO⁻ (K_b = 10^(−9,2)) [HO⁻] = 2,51 × 10⁻⁶, pH 8,40. `predom` : 10^1,2 = 15,8. `distribution` : 10/11 = 90,9 % ;
leurres 100 % et 60 %. `predom-distrib` : 1/(1 + 10^(−0,1)) = 55,7 % ; 1/(1 + 10⁻³) = 99,9 % ; leurres 100 % et
100 %, 51 % et 80 %. `croisement` : 3,75 ; leurres 7,0 et 5,75 (99 % de HCOO⁻). `deux-couples` : 10^4,4 = 2,51 × 10⁴ ;
leurres 3,98 × 10⁻⁵ et 4,4. `k-total` : √K = 158,5, τ = 0,9937 ; leurres 0,50 et 1/159,5 = 6,27 × 10⁻³. `k-proches` :
10^(−0,6) = 0,251, τ = 0,501/1,501 = 0,334. `ph-melange` : 4,50 ; leurres 0,30 et 9,0. Sujet 2022 : 10^(−3,1) =
7,943 × 10⁻⁴, Q_r,éq = 6,310 × 10⁻⁷/4,921 × 10⁻² = 1,282 × 10⁻⁵, pK_A = 4,892 ; leurres 3,1 et −4,89. Sujet 2020 :
[HO⁻] = 10^(−3,4) = 3,981 × 10⁻⁴ ; leurres 2,51 × 10⁻¹¹ et 9,43 × 10⁻¹⁶ ; τ = 3,98 × 10⁻² ; leurres 2,51 × 10⁻⁹ et
25,1 ; Q_r,éq = 1,651 × 10⁻⁵ ; K_A = 6,06 × 10⁻¹⁰, pK_A = 9,22 ; leurres 4,78 et 10,6. `q1` (2023 §2) :
10^(−1,04) = 9,12 × 10⁻² ; copie 10^1,04 = 10,96. `q2` : 10^(−4,2) = 6,31 × 10⁻⁵. Sujet 2021 : Q = 0,10 × 0,0132²/0,9868
= 1,77 × 10⁻⁵, pK_A 4,75. Sujet 2019 : τ = 8,6 × 10⁻³/(1 × 38,23 × 10⁻³) = 0,225, K = 6,53 × 10⁻⁵, pK_A 4,19,
pH 3,65 < 4,2. Sujet 2015 : Q = 10⁻² × 0,072²/0,928 = 5,59 × 10⁻⁵, pK_A 4,25.

Chaque leurre de calcul a été recalculé : aucun ne retombe sur la bonne valeur ni sur celle d'un autre leurre de la
même étape. **Coïncidences trouvées et écartées** : (1) `qr-valeur`, le leurre AB-CHAIN-1 à 4 % de la réponse : il
passe à `meme-k-calc` (τ = 12 %) ; (2) `deux-couples`, K_A1·K_A2 = 10^(−14) = K_e pour la paire 4,8 et 9,2 : leurre
remplacé par « pK_A2 − pK_A1 » ; (3) `ph-melange` sur la paire 2012 donnerait 7,0, la valeur du leurre « neutre » :
la leçon prend la paire 4,8 et 4,2. **Coïncidences notées, sans effet sur la règle** : `bac-2c`, Q_r,éq(NH₃) =
1,65 × 10⁻⁵ comme `qr-valeur`, et son leurre 4,8 est le pK_A de l'acide éthanoïque (pK_A(NH₄⁺/NH₃) = 14 − 4,8 pour
ces données) : à signaler au relecteur ; `ph-melange` : 4,495 s'affiche « 4,5 » (une décimale ; à deux décimales,
l'arrondi binaire peut donner 4,49).

### 8.2 À vérifier (B9), à ne pas afficher tant que ce n'est pas fait

1. **Les teintes à l'écran** : aucun jeton de couleur d'indicateur ; la scène écrit le nom de la teinte. Le pari de
   l'énigme perd de sa force si la pastille n'a pas la vraie couleur (§8.4 question 4).
2. **L'hélianthine connue des élèves comme « rouge dans les acides »** : non vérifié (programme du collège absent de
   `docs/referentiel/`) ; l'énigme ne s'appuie pas dessus : elle donne les deux teintes de référence.
3. **Zones** : la leçon affiche celles des sujets (hélianthine 3,1-4,4 en 2020, 3-4,4 en 2018 ; phénolphtaléine
   8,2-10 ; BBT 6-7,6) ; Wikipédia donne 8,3-10,0 pour la phénolphtaléine. pK_A de l'hélianthine affiché « ≈ 3,5 »
   (3,47, Wikipédia).
4. **« Chauffer peut changer K »** : appuyé sur l'annexe (« à une température donnée ») et sur K_e « à 25 °C » ; aucune
   valeur ni aucun sens de variation n'est affiché.
5. **« À l'instant de la dilution »** : une idéalisation (la réaction est supposée ne pas avoir le temps d'agir) ; la
   vitesse de la réaction de l'acide éthanoïque avec l'eau n'est pas sourcée (C3, §8.2 point 3). Le texte dit « à
   l'instant de la dilution » et la note de scène « un tic n'est pas une durée mesurée ».
6. **Le pH 6,0 du mélange de `predom`** : une donnée d'auteur, présentée comme donnée de l'énoncé, pas comme mesure.
7. **Guldberg et Waage** : la page résume ; elle dit que leur théorie partait de la formation et de l'hydrolyse des
   esters, sans décrire une expérience à prédire. Tag facultatif (§8.3).
8. **pK_A de l'acide éthanoïque** : 4,79 (2023), 4,75 (2021), 4,8 (2012) selon les sujets ; la leçon cache 4,79 et
   affiche 4,8 ; le dosage a choisi 4,75 (§8.4 question 6).
9. **L'équation 3 Ag⁺ + Cr ⇄ 3 Ag + Cr³⁺** : déduite des ions du sujet 2020 (Ag⁺, Cr³⁺), qui la fait écrire en Q3 sans
   l'imprimer. À relire.
10. **Le modèle de la loupe et du trio** : une image (C3, §8.2 point 11) ; sa seule prétention quantitative, le
    palier, est la relation d'équilibre exacte.
11. **Le logarithme** : peut être enseigné en maths après ce chapitre (bible §2.5) ; `sav-test` et son renvoi.
12. **2019 N rejoué avec τ donné** : la forme du sujet change (sa Q3 passe par σ) ; le gabarit le dit « forme
    modifiée ».
13. **La filière SVT** : `noyau.js` n'a pas de filtrage d'étapes par filière ; retirer les trois étapes de
    distribution demande un mécanisme (bouton « Passer à la suite », comme la partie 8 du dosage) : demande à part.

### 8.3 Histoire (≤ 3 places)

1. **Guldberg et Waage, 1864** (`trois-flacons`, tag ; le récit seulement dans `apres`, pour ne pas donner la
   réponse) [V] sur la page Wikipédia citée ; facultatif (point 7 : le test du porteur est faible).
2. **Sørensen, 1909** : la fiche `pka` renvoie à la fiche `pH` de C3 (le « p » de pK_A est celui du pH), sans pari
   [V] (C3, §8.1).
3. Aucune troisième place. Écartés : Boyle et le sirop de violette [S] (le dosage l'a déjà écarté, faute de source
   primaire) ; Arrhenius (C3, point 6) ; une théorie des indicateurs d'Ostwald : non cherchée, non affichée.

### 8.4 Pour le relecteur et le propriétaire (décisions à trancher)

1. **Périmètre** : C4 et C5 en une leçon de 51 étapes, la conductance (`2.2.2.1`, TP 4, τ par σ) laissée à une courte
   leçon à part ou à un chapitre « mesurer en chimie » commun à C2, C4, C6. D'accord ?
2. **Scène nouvelle `axe`** (l'axe des pH piloté par le pH) : décision du propriétaire. Elle porte 15 étapes ici et
   servira au dosage.
3. **Le jeu `trio` et le graphe Q_r de `zoom`** : présentés comme des adaptations de `solution` ; les compter comme
   un type nouveau ?
4. **Les teintes** : deux jetons de couleur d'indicateur dans `tokens.ts` (décision de design), ou les noms écrits
   seuls ?
5. **L'énigme** (hélianthine à pH 5,0) à la place de celle de la bible, prise par C3 : d'accord ?
6. **pK_A de l'acide éthanoïque** : harmoniser les trois leçons (4,79 en C3 et ici, 4,75 au dosage) ou garder chaque
   valeur avec son sujet ?
7. **Route et noms** : `/pilote/acides-bases`, ou deux noms tirés des dossiers `content/pc/etat-equilibre` et
   `content/pc/reactions-acido-basiques` (ce dernier porte aussi le dosage) ?
8. **SVT** : retirer `distribution`, `croisement`, `predom-distrib` (le cadre SVT n'a pas la distribution), avec quel
   mécanisme (point 13) ?
9. **Le dosage** : son `indicateur` devient un rappel (l'indicateur est introduit ici) et son `sav-test` utilise
   pK_A = 4,75 ; à ajuster dans son plan.
10. **`dilution-sens`** montre Q_r qui remonte vers K sans énoncer le critère de C7 : d'accord, ou l'arrêter à la
    chute (`dilution-k`) ?
11. **`ph-melange`** (hors des tirets, forme des sujets 2023 N et SM N 2026) : le garder pour affronter AB-BASE-9 ?
12. **Le rappel à 43 %** (après l'eau) plutôt qu'immédiatement après la figure-clé (35 %) : d'accord ?
