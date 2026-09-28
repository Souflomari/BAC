# spec — les systèmes de numération (Maths · `arithmetique`, **R7b = chapitre 10**)

**Statut : PROPOSITION, écrite le 2026-09-28 par pedagogy-architect. Rien n'a été construit.**
Aucun fichier de la notion n'a été touché — ni `lesson.md`, ni `items.yaml`, ni
`checkpoints.yaml`, ni `bank.yaml`, ni `exercises.yaml`, ni `media/`. *(D'autres auteurs
éditaient `lesson.md` et `items.yaml` pendant la rédaction de ce document ; toutes les
citations de ligne ci-dessous datent de la lecture du 2026-09-28 et doivent être re-vérifiées
avant édition.)*

> ⚠ **AVERTISSEMENT D'INSTRUMENT, en tête.** Aucune commande shell n'a été exécutée dans la
> session qui a écrit ce document. **Tous les faits du §0 ont été relevés par lecture directe
> des fichiers et par l'outil `Grep` ; la commande donnée en regard est celle qui les
> REPRODUIT, elle n'a pas été lancée ici.** Aucun chiffre n'est attribué à une sortie que je
> n'aurais pas lue. Ce que je n'ai pas pu vérifier est au §12.

> ⚠ **AVERTISSEMENT DE FONDATION, en tête lui aussi.** Cette rung repose sur **trois lignes de
> cadre qui sont elles-mêmes une PROPOSITION non validée**, ajoutées au fichier le 2026-09-27
> (`maths-sm.yaml:332`, `:338`, `:594-602`). Le cadre le dit lui-même à `:628` : la relecture
> longue Gemini doit encore « **vérifier … que les trois capacités de numération existent** ».
> **Si cette porte répond non, toute cette spec tombe.** C'est le risque numéro un du document
> et il est nommé ici, pas enterré au §12.

**Ce que ce document est.** Le cadrage d'**une seule rung neuve** — la plus grosse lacune
mesurée du sous-domaine arithmétique : trois capacités du cadre SM sur neuf
(2.1.4 / 2.1.5 / 2.1.6) sans **aucun** chapitre, **aucun** item, **aucune** annale dans le
dépôt.

**Ce que ce document n'est pas.** Il n'écrit ni la prose finale (content-author), ni les items
finaux (item-author), ni le YAML livré. Il ne tranche pas la porte de cadre.

---

## 0. Le trou, mesuré — chaque fait avec la commande qui le montre

| # | le fait | la commande / la citation qui le reproduit |
|---|---|---|
| **a** | **Le cadre nomme trois capacités sur neuf.** `programme` : « *Systèmes de numération : écriture d'un entier naturel dans une base donnée ; opérations (addition, multiplication) et comparaison dans une base ; usage des écritures en base dans des situations d'arithmétique.* » `savoir_faire` : « *Écrire un entier dans une base donnée et revenir à la base 10 ; opérer et comparer dans une base ; exploiter une écriture en base pour une question de divisibilité ou de reste.* » | `maths-sm.yaml:332` (programme), `:338` (savoir-faire), `:594-602` (l'entrée de correction qui les a ajoutées) |
| **b** | **Le corpus de la notion ne contient QU'UN SEUL appariement « base ».** Un `Grep` de `numération\|numeration\|base [0-9]\|\overline\|écriture en base` sur tout `content/maths/arithmetique/` rend **une ligne** : `lesson.md:149`, « *un nombre écrit en base 10 avec les chiffres $a_p, \ldots, a_0$* », **à l'intérieur du critère de divisibilité par 9**. Rien d'autre. | `grep -rniE 'numération\|numeration\|base [0-9]\|\\overline\|écriture en base' content/maths/arithmetique/` ⇒ **1** |
| **c** | **Aucune des DIX annales vérifiées ne porte sur la numération.** La banque recense dix sujets nationaux SM (2017, 2019, 2020, 2021, 2022, 2023 N, 2023 R, 2024 N, 2024 R, 2025), tous re-fetchés et diffés caractère par caractère ; aucun n'est un sujet de numération. Règle de la maison, à sa ligne : « **Introuvable = absent, jamais inventé** ». | `bank.yaml:10-31`, règle à `:27-28` |
| **d** | **Les 40 items et les 17 modèles d'erreur déclarés ne touchent pas la numération.** `total_items: 40`, `floor: 3`, `floor_met: true` ; les 17 `id` sont lus un par un à `items.yaml:15-218` : divisibilité, congruences, PGCD/PPCM, Bézout, Gauss, premiers, Fermat, diophantiennes, congruence linéaire. **Aucun n'est un modèle de numération.** | `items.yaml:2622-2679` (`coverage_summary`) ; `grep -n 'id: mc\.' items.yaml` ⇒ 17 |
| **e** | **Le garde-fou de périmètre des checkpoints n'inclut pas la numération.** « *Garde-fou périmètre : 2ème Bac Sciences Mathématiques — divisibilité, division euclidienne, congruences, PGCD/PPCM, algorithme d'Euclide, Bézout, Gauss, nombres premiers, décomposition, équations diophantiennes ax+by=c.* » **C'est une édition obligatoire de cette livraison** (§10.3). | `checkpoints.yaml:52-55` |
| **f** | **La lacune est nommée deux fois dans les audits, et payée zéro fois.** « *les **systèmes de numération** (capacités SM 2.1.4 à 2.1.6 — un tiers du sous-domaine arithmétique) n'ont ni chapitre, ni item, ni annale dans le dépôt. […] Aucune vague ne l'a payée.* » Et la ligne de dette : « **lacune hors audit** — aucun chapitre, aucun item, aucune annale ». | `DECISIONS-EN-ATTENTE.md:1876-1879` ; `DETTE-EXAMEN.md:92` |
| **g** | **La leçon porte 10 titres `## `, donc 10 chapitres**, dans cet ordre : R0 (1), R1 (2), R2 (3), R3 (4), R4 (5), R5 (6), R6 (7), R6b (8), R7 (9), R8 (10). **Vérifié contre le texte, pas supposé** : « *l'unicité vue au chapitre 2* » = R1 ✓ (`lesson.md:93`) · « *l'exemple du chapitre 4* » = R3, PGCD(252,198) ✓ (`:239`) · « *le théorème de Bézout (chapitre 5)* » = R4 ✓ (`:287`) · « *le théorème de Gauss (chapitre 6)* » = R5 ✓ (`:401`) · « *la paire (3,5) du chapitre 1* » = R0 ✓ (`:273`) · « *le lemme d'Euclide … (chapitre 7)* » = R6 ✓ (`:593`) · « *chapitre 9* » = R7, diophantiennes ✓ (`bank.yaml:613`). | `grep -n '^## ' content/maths/arithmetique/lesson.md` ⇒ 10 ; `web/src/lib/chapters.ts` pour la règle de calcul |
| **h** | **89 lignes citent « chapitre N » avec N ≥ 4** : `bank.yaml` **60**, `lesson.md` **11**, `exercises.yaml` **10**, `REVIEW-2026-09-12.md` **4**, `media/factorisation-360.stages.json` **2**, `media/bezout-remontee.stages.json` **1**, `media/solutions-diophantiennes-reseau.stages.json` **1**. Hors document d'audit : **85 lignes de contenu livré.** | `grep -rnc 'chapitres\? \(4\|5\|6\|7\|8\|9\|10\)\b' content/maths/arithmetique/` |
| **i** | **AUCUNE ligne du dépôt ne cite « chapitre 8 », « chapitre 10 » ni « chapitre 11 » de cette notion.** Le relevé exhaustif des occurrences ne contient que 1, 2, 3, 4, 5, 6, 7 et 9. **C'est le fait qui décide du §2.** | `grep -rnoE 'chapitres? [0-9]+' content/maths/arithmetique/` ⇒ aucune valeur 8, 10 ou 11 |
| **j** | **Aucune autre notion ne cite un chapitre d'arithmétique.** La forme croisée « chapitre N de « Titre » » ne rend qu'un seul résultat dans tout le dépôt, et il vise *Fonction logarithme*, pas l'arithmétique. | `grep -rn 'chapitre [0-9]\+ de « [^»]*[Aa]rith' .` ⇒ **0** |
| **k** | **Le champ `habilete` existe sur 8 items — les 8 les plus récents.** AR-33 (`:1996`), AR-34 (`:2051`), AR-35 (`:2122`), AR-36 (`:2220`), AR-37 (`:2307`), AR-38 (`:2402`), AR-39 (`:2466`), AR-40 (`:2526`). Absent de AR-1 à AR-32, et le fichier le dit : « *`habilete` suit le triplet MATHS (application_directe / _non_explicite / synthese) … absent des items AR-1..AR-32 (jamais rétrofité), introduit ici seulement pour les items neufs.* » **Les items neufs en portent donc un.** | `items.yaml:1990-1993` ; `grep -n 'habilete:' items.yaml` ⇒ 10 lignes, dont **2 en commentaire** (`:2190`, `:2205`) |
| **l** | **Le fichier s'est déjà reproché de ne pas tenir le mix 40/40/20.** « *Mix `habilete` sur les 5 items R6b tagués (AR-33..37) : 1 / 3 / 1, soit 20/60/20 — ne colle pas à la cible SM 40/40/20 … échantillon de 5 items trop petit pour forcer ce ratio sans fausser un tag. Noté honnêtement plutôt que corrigé en douce.* » **Les 15 items de cette spec tombent exactement sur 6/6/3 = 40/40/20** (§8.0) : l'échantillon est enfin assez grand. | `items.yaml:2213-2217` |
| **m** | **La leçon n'a AUCUN « Récapitulatif express ».** Zéro occurrence de `Récapitulatif\|Ce qu'il faut retenir\|En résumé` dans `content/maths/arithmetique/lesson.md` ; 4 des 14 leçons maths en portent un, l'arithmétique n'en fait pas partie. **Cette spec n'en crée pas** (§9). | `grep -c 'Récapitulatif\|Ce qu.il faut retenir\|En résumé' content/maths/arithmetique/lesson.md` ⇒ **0** |

**Le constat en une phrase :** *un tiers des capacités du sous-domaine n'existe nulle part dans
le produit, et l'audit de dette ne pouvait pas le voir parce qu'il partait des banques —
« un filtre anti-bruit bâti sur ce qui EXISTE DÉJÀ est structurellement aveugle à ce qui manque
entièrement » (ADR 0036).*

---

## 1. Le cadre — lu avant d'écrire, avec ses réserves

> ⚠ **RÉSERVE DE PROVENANCE, doublée ici.** (1) `maths-sm.yaml:12` porte en en-tête
> « **STATUT : PROPOSITION — NON AUTORITATIVE** » ; le PDF officiel est un scan sans couche
> texte, donc **aucune citation `cadre p.N` n'existe pour les maths** (`:44-45`). (2) Les trois
> lignes de numération sont **les plus récentes et les moins éprouvées du fichier** : ajoutées
> le 2026-09-27, tag `source: research-consensus` pour les capacités et `derived` pour la
> granularité du savoir-faire. La **porte 2** (research-challenger) est passée pour le bloc
> arithmétique (`:26-29`) ; la **porte 1** (relecture Gemini) et la **porte 3** (humain) ne le
> sont pas, et la porte 1 a précisément pour mission de confirmer que ces trois capacités
> existent (`:628`). *Je ne corrige ni ne contourne ce fichier ; je le cite en le disant.*

- **Filière / matière.** Sciences Mathématiques (SM-A et SM-B, même cadre maths),
  `matiere: mathematiques`, coef **9**, épreuve **4 h** (`maths-sm.yaml:50-56`). La banque le
  confirme pour cette notion : « *Chapitre SPÉCIFIQUE à la filière Sciences Mathématiques (SM)
  — absent de l'épreuve Sciences Expérimentales* » (`bank.yaml:29-31`). **Pas d'arbitrage de
  filière à faire ici**, contrairement à la notion `equations-differentielles`.
- **Sous-domaine et poids, sans le gonfler.** `arithmetique`,
  `poids: { part_examen_bloc: 15, note: "bloc « Arithmétique + Probabilités » ≈ 15 % ;
  **partage interne dérivé**" }` (`maths-sm.yaml:303`). **Il n'existe aucun chiffre publié plus
  fin.** ⚠ **Piège de lecture, à ne pas reproduire dans la prose** : « trois capacités sur
  neuf » est un **compte de capacités**, **pas un poids de points**. Écrire « un tiers du bloc
  arithmétique » comme un chiffre d'examen serait inventer une mesure. **La prose commandée ici
  ne fait aucune affirmation de fréquence ni de poids.**
- **Habiletés — la cible chiffrée de l'item-author.** `maths-sm.yaml:58-61` :
  **application_directe 40 / application_non_explicite 40 / synthese 20** (niveau 3 plus
  exigeant qu'en SExp : 20 contre 15). **C'est le mix que le §8 sert exactement** (6 / 6 / 3
  sur 15 items).
- **Le savoir-faire servi, mot pour mot** (`maths-sm.yaml:338`) :
  > « **Écrire un entier dans une base donnée et revenir à la base 10 ; opérer et comparer dans
  > une base ; exploiter une écriture en base pour une question de divisibilité ou de reste.** »

  **C'est exactement, et seulement, ce que cette spec sert.** Les trois verbes se lisent
  directement comme les trois blocs de la rung (§5).
- **`limites` du chapitre, portées en dur** (`maths-sm.yaml:360-361`) :
  1. « *Arithmétique élémentaire dans ℤ. Pas de fonction indicatrice d'Euler comme théorème
     central, pas de RSA/cryptographie formelle.* » → **la numération ne sert de porte d'entrée
     à aucun habillage cryptographique.** Aucune ligne commandée ici ne parle de codage, de
     clés ou de chiffrement.
  2. Le **PRINCIPE DE TRI** : « *ce qui est hors cadre, c'est d'INVOQUER le résultat comme
     théorème NOMMÉ ET ADMIS ; ce qui est attesté, c'est de le faire CONSTRUIRE par l'énoncé,
     question par question, à partir des outils du chapitre.* » → **conséquence directe et
     structurante pour cette rung : les critères de divisibilité par $b-1$ et $b+1$ ne sont
     JAMAIS donnés comme des règles nommées à retenir. Ils sont CONSTRUITS, à chaque fois, à
     partir de $b \equiv 1 \pmod{b-1}$ et $b \equiv -1 \pmod{b+1}$** — c'est-à-dire à partir du
     chapitre 3, que la leçon a déjà démontré. *Le chapitre 3 fait déjà exactement ce geste
     pour $b = 10$ (`lesson.md:141-157`) : la rung le généralise, elle n'ajoute pas un théorème.*
- **`exclusions_transversales` applicables** (`maths-sm.yaml:432`) : « *Théorie de Galois,
  corps finis au-delà de ℤ/nℤ* ». → **aucune dérive vers les corps finis, les nombres
  $p$-adiques ou la représentation machine.**
- **Ce que le cadre ne dit pas et que je ne comble pas.** Le cadre ne nomme **aucune base**, ne
  fixe **aucune notation**, et ne dit **rien** des chiffres au-delà de 9. → **§11 Q1 et Q2.**

---

## 2. Placement — la décision, et son coût mesuré

### 2.1 Le verdict

> **`## R7b — Les systèmes de numération`, inséré entre `## R7` et `## R8`.**
> **R7b = chapitre 10. R8 devient chapitre 11.**
> Suffixe lettré, **aucune rung existante renumérotée** — exactement le précédent R6b
> (`lesson.md:613-616`).

### 2.2 Le coût de renumérotation, des deux côtés — chiffré

| option | le chapitre neuf | ce qui se décale | **citations « chapitre N » à relire et à réécrire** |
|---|---|---|---|
| **(a) `## R2b` après les congruences** | chapitre **4** | R3→5, R4→6, R5→7, R6→8, R6b→9, R7→10, R8→11 | **89 lignes**, dont **85 de contenu livré** : `bank.yaml` 60 · `lesson.md` 11 · `exercises.yaml` 10 · `media/*.stages.json` 4 (+ 4 dans `REVIEW-2026-09-12.md`) — fait **h** |
| **(b) `## R7b` après les diophantiennes** ✔ | chapitre **10** | R8 → 11, et rien d'autre | **0** — aucune ligne du dépôt ne cite « chapitre 10 » ni « chapitre 11 », fait **i** ; aucune autre notion ne cite un chapitre d'arithmétique, fait **j** |

Dans les **deux** cas, `web/scripts/carte-chapitres.mjs --porte` **rougira** (c'est sa raison
d'être : « *elle scelle, notion par notion, la liste ORDONNÉE des titres de chapitre, et rougit
dès que cette liste a bougé depuis le sceau* », `carte-chapitres.mjs:16-18`). La différence
n'est pas le rouge, c'est **ce que le rouge oblige à relire** : 85 renvois contre zéro. Après
relecture : `node scripts/carte-chapitres.mjs --sceller` (§10.4).

*Rappel de ce qui a motivé cette porte, et qui vaut avertissement ici : quatre insertions en une
semaine — dont **R6b dans cette leçon même** — ont rendu à l'élève **dix-sept renvois pointant
un chapitre trop tôt** (`carte-chapitres.mjs:9-12`, `DECISIONS-EN-ATTENTE.md:2100-2101`).*

### 2.3 Pourquoi (b) est aussi le meilleur choix PÉDAGOGIQUE — l'argument, pas le coût

Le coût confirme, il ne décide pas. Quatre raisons, dans l'ordre de poids.

1. **La leçon est une chaîne de preuve, et R2b la couperait en deux.** L'accroche R0 pose une
   promesse explicite : « *ce chapitre construit, étape par étape, tout ce qu'il faut pour le
   démontrer* » — le théorème de Bézout (`lesson.md:23`). La chaîne est R1 division → R2
   congruences → R3 PGCD → **R4 Bézout, le paiement de la promesse**. Insérer 2 500 mots de
   numération entre R2 et R3, c'est retarder d'un chapitre entier le seul moment que
   l'accroche a annoncé. **La numération n'est pas sur la chaîne** : c'est un *usage* des
   outils de la chaîne, pas un maillon.
2. **La capacité 2.1.6 ne peut PAS être servie à R2b.** « *Utiliser les écritures … dans des
   situations d'arithmétique* » veut dire, dans l'idiome des sujets SM : mélanger une écriture
   en base avec une congruence **et** une détermination de chiffres. Les deux problèmes de
   forme examen du §5 (E7, E8) utilisent **le théorème de Gauss** (chapitre 6, pour passer de
   $2 \mid 3x$ à $2 \mid x$) et **le corollaire de coprimalité** (chapitre 6 aussi, pour voir
   pourquoi « divisible par 6 et par 8 » ne donne pas 48). À R2b, aucun des deux n'existe
   encore. La rung serait **amputée du tiers de la capacité qu'elle est censée couvrir**, ou
   bien elle utiliserait des outils non démontrés — ce que cette leçon ne fait nulle part.
3. **L'argument d'adjacence, qui plaide pour R2b, est plus faible qu'il n'en a l'air.** Oui, le
   critère par $b-1$ est à une ligne de $10 \equiv 1 \pmod 9$ (`lesson.md:143`). Mais **cette
   leçon pratique déjà le rappel à distance, et le pratique bien** : R6b rouvre, cinq chapitres
   plus loin, le calcul de période fait à R2 — « *Plus haut dans ce chapitre, tu as cherché à la
   main la période des puissances de $2$ modulo $7$* » (`lesson.md:431`). Le rappel espacé est
   *meilleur* pour la rétention que l'adjacence, et le précédent est dans le fichier. La rung
   R7b **rouvrira nommément** le critère par 9 du chapitre 3 (§7.5) : le lien est fait, sans
   couper la chaîne.
4. **Position de consolidation avant le sommet.** R7b tombe juste avant R8 « Pour t'entraîner ».
   L'élève y ré-emploie, sur un objet neuf, tout ce qu'il vient de construire : division
   euclidienne (ch. 2), congruences (ch. 3), Gauss (ch. 6), détermination d'entiers sous
   contraintes (ch. 9). **C'est la définition même de la capacité 2.1.6**, et c'est le meilleur
   état d'esprit dans lequel arriver au sujet d'examen.

**Contre-argument retenu et écrit pour l'owner (§11 Q5)** : si l'owner juge que l'écriture en
base doit être *acquise tôt* parce qu'elle sert à lire n'importe quel énoncé, alors R2b redevient
défendable — **au prix des 85 renvois du tableau 2.2**, qui se paient une fois et se relisent
un par un. Je ne le recommande pas ; je ne le cache pas.

---

## 3. Le périmètre — ce qui entre, ce qui n'entre pas

### 3.1 Ce que la rung enseigne (et rien de plus)

| capacité du cadre | ce que la rung en fait | bloc |
|---|---|---|
| **2.1.4** « Écrire un entier naturel dans un système de numération de base donnée » | écriture de $N$ en base $b$ par divisions euclidiennes successives **avec le mécanisme de l'ordre inversé démontré** ; retour à la base 10 par les puissances **et** par Horner | §5 A |
| **2.1.5** « Additionner, multiplier et comparer deux entiers dans un système de numération » | une addition posée, une multiplication posée, **la retenue justifiée par le poids de la colonne voisine** ; comparaison dans une même base (nombre de chiffres, puis chiffres de tête) et le piège de la comparaison inter-bases | §5 B |
| **2.1.6** « Utiliser les écritures dans des situations d'arithmétique » | critères par $b-1$ et $b+1$ **construits** depuis $b \equiv \pm 1$ ; deux problèmes de forme examen mêlant écriture en base, congruence, Gauss et contraintes sur les chiffres | §5 C |

### 3.2 Les bornes dures — non négociables pour content-author et item-author

1. **Entiers NATURELS seulement.** La capacité dit « un entier naturel ». Pas d'écriture en base
   d'un entier négatif, **pas de partie fractionnaire** (jamais $\overline{0{,}101}_{(2)}$).
2. **Aucune base > 10 dans un exemple CALCULÉ.** La convention pour les chiffres $\ge 10$ n'est
   pas tranchée (**§11 Q1**) : on n'enseigne pas une notation qu'on n'a pas vérifiée. Les bases
   utilisées sont **2, 3, 5, 6, 7, 8, 9** ; la base générique $b$ apparaît **symboliquement**
   (chiffres $a_i$ avec $0 \le a_i \le b-1$), ce qui est précisément la forme des énoncés SM.
   *Une note de deux lignes, et deux lignes seulement, mentionne que pour $b > 10$ on emploie
   des lettres (A = 10, B = 11, …) — **marquée « à vérifier » en commentaire d'auteur**, pas
   présentée comme la convention de l'examen.*
3. **Aucune informatique.** Pas de complément à deux, pas de virgule flottante, pas
   d'opérateurs binaires, pas de portes logiques, pas de conversion binaire ↔ hexadécimal
   comme *technique*. La base 2 n'apparaît que comme **une base parmi d'autres**
   (**§11 Q2**).
4. **Aucun corps fini, aucun $p$-adique** (`exclusions_transversales`, `maths-sm.yaml:432`).
5. **Aucune cryptographie, aucun RSA** (`limites`, `maths-sm.yaml:360`).
6. **Aucun critère nommé et admis.** PRINCIPE DE TRI (`maths-sm.yaml:361`) : le critère par
   $b-1$ et celui par $b+1$ sont **re-dérivés** dans la rung, en deux lignes chacun, depuis
   $b \equiv 1 \pmod{b-1}$ et $b \equiv -1 \pmod{b+1}$. Aucune formule n'est donnée « à
   retenir » sans sa raison.
7. **Aucun théorème neuf.** La rung n'introduit **rien** : elle mobilise la division euclidienne
   (chapitre 2), les congruences et leur compatibilité (chapitre 3) et Gauss (chapitre 6). Si
   un auteur se surprend à écrire « on admet que… », c'est qu'il est sorti du périmètre.
8. **Aucune affirmation de fréquence d'examen.** Voir §1 (le piège « un tiers ») et §12.

---

## 4. L'inventaire des modèles d'erreur

**Quatre familles NEUVES + une RÉUTILISÉE.** Bloc à insérer dans `misconceptions:` de
`items.yaml`, **après le 17ᵉ** (`:218`), au format exact des 17 existants — quatre champs et
quatre seulement : `id`, `label`, `description`, `contradicts_principle`.

### 4.1 N1 — l'ordre des restes

```yaml
  - id: mc.math.maths_arithmetique.numeration-restes-ordre-inverse
    label: "Chiffres d'une écriture en base b assemblés dans l'ordre où les restes sortent"
    description: >-
      L'élève enchaîne correctement les divisions euclidiennes par $b$, mais lit
      les restes de haut en bas : le PREMIER reste devient le chiffre de tête. Le
      réflexe « on lit de gauche à droite » l'emporte sur le poids que porte
      chaque reste, et le lien « premier reste = chiffre des unités » n'est jamais
      établi. Même mécanisme au retour vers la base 10 : le chiffre de gauche se
      voit affecter $b^0$, ou les exposants sont décalés d'un cran.
    contradicts_principle: >-
      Dans $N = b q_0 + r_0$, le reste $r_0$ est le SEUL terme qui n'est pas
      multiplié par $b$ : c'est le chiffre des unités, $a_0$. Chaque division
      suivante extrait le chiffre du poids immédiatement supérieur. Les restes
      sortent donc du poids le plus FAIBLE au plus fort, et l'écriture se lit de
      bas en haut.
```

**Pourquoi ce n'est pas `reste-non-normalise`** (`items.yaml:60-69`) — vérifié en le lisant :
ce modèle-là porte sur un reste **faux ou hors de $[0,n[$** (négatif, $\ge n$, le quotient
rendu à sa place). Ici, **chaque reste est juste et normalisé** ; la faute est dans
l'**assemblage**. Deux diagnostics, deux remédiations : l'un se casse par « le reste vit dans
$\{0,\dots,n-1\}$ », l'autre par « le premier reste est celui des unités ».

### 4.2 N2 — l'écriture prise pour le nombre

```yaml
  - id: mc.math.maths_arithmetique.numeration-ecriture-prise-pour-le-nombre
    label: "L'écriture confondue avec le nombre (lue en base 10, ou comparée comme une chaîne)"
    description: >-
      Pour l'élève, la suite de chiffres EST le nombre, et la base n'est qu'une
      étiquette posée à côté. Il lit $\overline{123}_{(5)}$ comme cent vingt-trois,
      compare deux écritures de bases différentes chiffre à chiffre (ou par leur
      nombre de chiffres, ou par leur somme de chiffres) sans repasser par la
      valeur, conclut de « la même suite de chiffres » à « le même nombre », ou
      croit que plus la base est grande, plus le nombre est grand.
    contradicts_principle: >-
      Une écriture est une liste de COEFFICIENTS :
      $\overline{a_p\cdots a_0}_{(b)} = \sum_i a_i b^i$. Le même entier a une
      écriture différente dans chaque base ($17 = \overline{23}_{(7)} =
      \overline{32}_{(5)}$), et la même suite de chiffres désigne des entiers
      différents selon la base ($\overline{101}_{(2)} = 5$,
      $\overline{101}_{(8)} = 65$). Comparer deux écritures de bases différentes
      exige de repasser par la valeur.
```

⚠ **Découverte de conception à écrire ici, parce qu'elle contraint les items** :
**une comparaison DANS UNE MÊME BASE ne peut jamais diagnostiquer N2.** Lire deux écritures de
même base comme des nombres décimaux **préserve l'ordre** (à nombre de chiffres égal l'ordre est
lexicographique dans les deux lectures ; à nombre de chiffres différent, plus de chiffres = plus
grand dans les deux lectures). Un élève qui tient N2 **trouve la bonne réponse** : c'est de la
*contamination de la bonne réponse*, donc un défaut de stem. **→ tout item qui vise N2 par une
comparaison est INTER-bases** (§8.4), et la comparaison en base unique est enseignée en prose et
sondée sur la RÈGLE, pas sur l'ordre.

### 4.3 N3 — les contraintes sur les chiffres

```yaml
  - id: mc.math.maths_arithmetique.numeration-contraintes-sur-les-chiffres
    label: "Un chiffre traité comme un entier libre (borne a_i ≤ b−1, ou chiffre de tête non nul, oubliée)"
    description: >-
      L'élève manipule un chiffre comme un entier quelconque. Il accepte une
      écriture dont un chiffre atteint ou dépasse la base ($\overline{1206}_{(6)}$),
      décale la borne d'un cran (croire que la base 8 s'arrête à 6), retient comme
      solution d'une équation une racine dont un chiffre sort de
      $\{0,\dots,b-1\}$, ou garde une solution à chiffre de tête nul. Quand le même
      nombre est écrit dans DEUX bases, il n'intersecte pas les deux contraintes et
      garde la plus large.
    contradicts_principle: >-
      En base $b$ il y a exactement $b$ chiffres, $0$ à $b-1$ ; un « chiffre » égal
      à $b$ est une retenue qui n'a pas été faite. Le chiffre de tête d'une
      écriture est non nul, sinon le nombre n'a pas ce nombre de chiffres — d'où
      l'encadrement $b^{p} \le N < b^{p+1}$ pour une écriture à $p+1$ chiffres.
      Dans une équation portant sur des chiffres, ces bornes sont des CONTRAINTES
      de l'énoncé : une racine qui les viole n'est pas une solution.
```

### 4.4 N4 — le report de colonne

```yaml
  - id: mc.math.maths_arithmetique.numeration-retenue-a-dix
    label: "Report de colonne non conduit en base b (seuil resté à 10, ou retenue non reportée)"
    description: >-
      L'élève pose l'opération en colonnes correctement, mais ne re-dérive pas la
      règle de report à partir de la base : ou bien le seuil reste celui de la base
      10 (rien ne déborde avant $10$, d'où un « chiffre » $7$, $8$ ou $9$ écrit en
      base $7$, et une retenue de $1$ retranchant $10$ au lieu de $b$) ; ou bien le
      débordement est bien vu et ramené dans $\{0,\dots,b-1\}$, mais la retenue
      n'est pas ajoutée à la colonne voisine, chaque colonne étant traitée
      indépendamment.
    contradicts_principle: >-
      Une colonne déborde quand elle atteint $b$, parce que la colonne voisine à
      gauche pèse exactement $b$ fois plus. La règle est la division euclidienne
      par $b$ : $c = qb + r$ avec $0 \le r < b$ — on écrit $r$, on reporte $q$. Le
      nombre $10$ n'a aucun rôle : c'est la base qui fixe le seuil, et la retenue
      n'est pas facultative.
```

### 4.5 La famille RÉUTILISÉE — `critere-divisibilite-mal-applique`

**Réutilisation assumée, pas de famille neuve.** Le modèle existe déjà
(`items.yaml:82-91`) et son `contradicts_principle` porte **déjà le bon principe**, seulement
instancié en base 10 : « *Le critère par somme des chiffres vient de $10 \equiv 1 \pmod 9$ (pas
mod 10).* » Le mécanisme est identique : **appliquer un critère de chiffres sans re-dériver la
congruence que la base satisfait.** La numération en donne trois faces neuves :

- la **somme** des chiffres utilisée pour $b+1$, là où c'est la somme **alternée** ($b \equiv -1$) ;
- la somme des chiffres crue liée à **$b$** (la base elle-même) alors qu'elle donne le reste
  modulo **$b-1$** ;
- le **chiffre des unités** pris pour le reste modulo autre chose que $b$.

**Édition demandée, minimale et sans aucun re-tagage :** élargir `description` et
`contradicts_principle` pour nommer la base générique (« *le critère par somme des chiffres
vient de $b \equiv 1 \pmod{b-1}$ ; modulo $b+1$ c'est $b \equiv -1$, donc la somme ALTERNÉE ;
le chiffre des unités, lui, donne le reste modulo $b$* »). **Aucun distracteur existant ne
change de tag** ; les quatre items actuels (AR-1, AR-13, AR-31, AR-34) restent valides mot pour
mot. **→ §11 Q4** si l'owner préfère une famille séparée `numeration-critere-b-plus-un` : dans
ce cas elle réclame ses **≥3 items propres**, et ce sont AR-53, AR-54, AR-55 qui basculent.

### 4.6 Ce que je NE déclare PAS — dette écrite à côté de ce qui est armé

*(ADR 0035 : la décision de ne pas armer s'écrit à côté du motif voisin.)*

1. **« Comparer par le chiffre de tête sans aligner le nombre de chiffres »** — réel
   ($\overline{412}_{(5)} = 107 < \overline{1203}_{(5)} = 178$, mais $4 > 1$), et **distinct**
   de N2 et de N3. Non armé : il réclamerait ses trois items, et la comparaison en base unique
   est le geste le moins attesté des trois capacités. **Condition qui mériterait de l'armer :**
   un sujet vérifié qui demande une comparaison en base unique, ou un retour d'usage montrant
   le distracteur choisi.
2. **La séparation des deux faces de N3** (borne haute $a_i \le b-1$ / chiffre de tête non nul)
   et **des deux faces de N4** (seuil à 10 / retenue non reportée). Un mécanisme chacune à mon
   jugement — la contrainte non re-dérivée d'un côté, le report non re-dérivé de l'autre —
   mais je le dis plutôt que de le supposer. **→ §11 Q3.**

**Aucun des deux n'est porté par un distracteur des 15 items** : un distracteur tagué à un
modèle dont le principe ne le couvre pas est exactement le défaut que la vague 1 a nommé
ailleurs (F-6).

---

## 5. La rampe — les exemples travaillés, dans l'ordre, tous les nombres calculés ici

**content-author ne choisit aucun nombre.** Tout ce qui suit a été calculé **et re-vérifié en
sens inverse** dans cette session. Chaque valeur porte son contrôle.

**Non-duplication, vérifiée nombre par nombre :** aucun des nombres ci-dessous n'est repris
d'une annale de `bank.yaml`, d'un exercice de `exercises.yaml`, ni d'un item existant. Les
seuls réemplois sont **internes et délibérés** (le $2025$ de E1 revient en E6 ; le
$\overline{5622}_{(7)}$ de E1 revient en E6), et **aucun item du §8 ne rejoue un exemple
travaillé**.

### 5.0 L'accroche de la rung, et son engagement

**L'accroche, en cinq phrases.** *Dix doigts.* Notre système compte par paquets de dix pour une
raison **anatomique**, pas mathématique. Une machine qui n'a que deux états compte par paquets
de deux ; une horloge compte par paquets de soixante et personne ne trouve ça bizarre. Et le
même entier, $2025$, s'écrit :

$$2025 \;=\; \overline{5622}_{(7)} \;=\; \overline{11111101001}_{(2)}$$

*Contrôle de la forme binaire :* $1024+512+256+128+64+32 = 2016$, puis $+8 = 2024$, puis
$+1 = 2025$ ✓ — les onze bits sont $1,1,1,1,1,1,0,1,0,0,1$.

**L'engagement, AVANT toute révélation** — marqueur `[[checkpoint:cp-r7b-predict-ecriture]]`
posé immédiatement après l'égalité ci-dessus, **avant** la phrase qui explique. C'est la case
*predict-commit-confront* du template A/D, et elle vise **N2**, le modèle racine.

### 5.1 Bloc A — écrire dans une base, revenir en base 10 *(capacité 2.1.4)*

**E1 — $2025$ en base $7$.** Les quatre divisions, dans cet ordre :

$$2025 = 7 \times 289 + \mathbf{2} \qquad 289 = 7 \times 41 + \mathbf{2} \qquad 41 = 7 \times 5 + \mathbf{6} \qquad 5 = 7 \times 0 + \mathbf{5}$$

$$\boxed{\,2025 = \overline{5622}_{(7)}\,}$$

*Contrôle, obligatoire dans la prose :* $5\times343 + 6\times49 + 2\times7 + 2
= 1715 + 294 + 14 + 2 = 2025$ ✓.

> **La rupture de N1, mise en scène — c'est le cœur du bloc A et elle est OBLIGATOIRE.**
> Le modèle faux est **dit dans les mots de l'élève** (« le premier reste, c'est le chiffre de
> gauche, puisqu'on lit de gauche à droite »), puis **mis à l'épreuve, pas corrigé** : sur un
> nombre plus petit, $100$ en base $6$ ($100 = 6\times16+4$, $16 = 6\times2+4$, $2 = 6\times0+2$),
> ce modèle donne $\overline{442}_{(6)}$. **On le recalcule :** $4\times36 + 4\times6 + 2
> = 144+24+2 = \mathbf{170}$, et on cherchait $100$. **Le modèle casse sur sa propre
> conséquence.** Puis, et seulement puis, la raison : *dans $N = 7q + r$, $r$ est le seul terme
> qui n'est pas multiplié par 7 — c'est donc ce qui reste après avoir retiré tous les paquets de
> 7, c'est-à-dire le chiffre des unités.* *(Anatomie exigée : voix → test → cassure, EXEMPLARS
> §2. Une phrase qui poserait la bonne règle à côté de la fausse ne coche pas la case.)*

**E2 — retour en base 10 : $\overline{3204}_{(5)}$.** Deux chemins, le second présenté comme un
raccourci de calcul mental :

$$\overline{3204}_{(5)} = 3\times125 + 2\times25 + 0\times5 + 4 = 375 + 50 + 0 + 4 = \boxed{429}$$

$$\text{Horner : } 3 \;\to\; 3\times5+2 = 17 \;\to\; 17\times5+0 = 85 \;\to\; 85\times5+4 = 429 \ ✓$$

*Une phrase, obligatoire, sur la décision d'expert : « le chiffre $0$ n'est pas un blanc, c'est
un coefficient qui vaut zéro — si on le saute, tous les poids à sa gauche glissent d'un cran. »*

### 5.2 Bloc B — opérer et comparer *(capacité 2.1.5)*

**E3 — addition posée : $\overline{356}_{(7)} + \overline{243}_{(7)}$.**

| colonne | calcul | chiffre écrit | retenue |
|---|---|---|---|
| unités | $6+3 = 9 = 7+2$ | $\mathbf 2$ | $1$ |
| septaines | $5+4+1 = 10 = 7+3$ | $\mathbf 3$ | $1$ |
| quarante-neuvaines | $3+2+1 = 6$ | $\mathbf 6$ | — |

$$\boxed{\,\overline{356}_{(7)} + \overline{243}_{(7)} = \overline{632}_{(7)}\,}$$

*Contrôle en base 10, obligatoire :* $\overline{356}_{(7)} = 147+35+6 = 188$ ;
$\overline{243}_{(7)} = 98+28+3 = 129$ ; $188+129 = 317$ ; et
$\overline{632}_{(7)} = 294+21+2 = 317$ ✓.

**E4 — multiplication posée : $\overline{34}_{(7)} \times \overline{5}_{(7)}$.**

$$4\times5 = 20 = 2\times7 + \mathbf 6 \ (\text{retenue } 2) \qquad 3\times5 = 15,\ +2 = 17 = 2\times7 + \mathbf 3 \ (\text{retenue } 2) \qquad \mathbf 2$$

$$\boxed{\,\overline{34}_{(7)} \times \overline{5}_{(7)} = \overline{236}_{(7)}\,}$$

*Contrôle :* $\overline{34}_{(7)} = 25$ ; $25\times5 = 125$ ; $\overline{236}_{(7)} = 98+21+6 = 125$ ✓.

> **La rupture de N4 — la phrase qui doit être écrite, et le contrôle qui la rend visible.**
> *« Pourquoi $7$ et pas $10$ ? Parce que la colonne de gauche pèse exactement sept fois plus
> que celle de droite. Dès qu'une colonne atteint sept unités, ces sept unités valent
> exactement UN de la colonne voisine : on les y envoie. Le nombre dix n'intervient nulle part
> — il n'intervenait, en base 10, que parce que la base valait dix. »*
> Puis le contrôle négatif, **chiffré** : si l'on avait retenu à 10 sur E3, la colonne des
> unités aurait donné $9$ — et $9$ **n'est pas un chiffre de la base 7**. *L'erreur se voit à
> l'œil nu sur l'addition ; elle ne se voit PAS sur la multiplication (E4 mal conduite à 10
> donnerait $\overline{1\,5}\ldots$, une écriture qui a l'air légale). C'est pour ça que le
> point d'arrêt de ce bloc porte sur une multiplication (§5.5), pas sur une addition.*

Marqueur `[[checkpoint:cp-r7b-retenue]]` **immédiatement après E4.**

**E5 — comparer.** Deux temps, dans cet ordre.

*Dans une même base :* $\overline{1000}_{(3)} = 27$ et $\overline{222}_{(3)} = 18+6+2 = 26$, donc
$\overline{1000}_{(3)} > \overline{222}_{(3)}$ — **bien que tous les chiffres du second soient
plus grands.** La règle et sa raison, en deux lignes : une écriture à $p+1$ chiffres (chiffre de
tête non nul) vérifie $b^{p} \le N \le (b-1)(b^{p}+\cdots+1) = b^{p+1}-1$, donc **elle est
toujours strictement plus petite qu'une écriture à $p+2$ chiffres. Plus de chiffres gagne
toujours ; à égalité de chiffres, on compare de gauche à droite.**

*Entre deux bases :* $\overline{21}_{(3)} = 2\times3+1 = 7$ et $\overline{12}_{(5)} = 5+2 = 7$.
**Deux écritures différentes, un seul et même nombre.** Et la réciproque, énoncée :
$\overline{101}_{(2)} = 5$ contre $\overline{101}_{(8)} = 65$ — **une seule écriture, deux
nombres.** *Le piège à éviter, à écrire avec le gabarit du fichier (`lesson.md:351`) :* «
**Le piège à éviter :** comparer deux écritures de bases différentes en regardant les chiffres.
La suite de chiffres n'est pas le nombre ; elle ne le devient qu'une fois la base appliquée.
Tant qu'on n'a pas calculé les deux valeurs, on ne sait rien. »

### 5.3 Bloc C — utiliser les écritures *(capacité 2.1.6)*

**E6 — les deux critères, construits, jamais donnés.**

$$b \equiv 1 \pmod{b-1} \;\Longrightarrow\; b^k \equiv 1 \;\Longrightarrow\; N \equiv \sum_i a_i \pmod{b-1}$$

$$b \equiv -1 \pmod{b+1} \;\Longrightarrow\; b^k \equiv (-1)^k \;\Longrightarrow\; N \equiv a_0 - a_1 + a_2 - \cdots \pmod{b+1}$$

*La phrase de raccord obligatoire, qui rouvre le chapitre 3 :* « *Tu as déjà fait exactement ce
calcul. Au chapitre 3, tu as démontré le critère par 9 en partant de $10 \equiv 1 \pmod 9$ —
c'est le cas $b = 10$, et $9 = b-1$. Rien de neuf ici : la même démonstration, avec une lettre à
la place d'un chiffre.* »

*Sur le nombre de E1, $N = \overline{5622}_{(7)} = 2025$, avec $b-1 = 6$ et $b+1 = 8$ :*

| critère | calcul sur les chiffres | reste annoncé | **contrôle direct** |
|---|---|---|---|
| modulo $6$ | $S = 5+6+2+2 = 15$, et $15 = 6\times2+3$ | $\mathbf 3$ | $2025 = 6\times337 + 3$ ✓ |
| modulo $8$ | $T = a_0-a_1+a_2-a_3 = 2-2+6-5$ | $\mathbf 1$ | $2025 = 8\times253 + 1$ ✓ |

*Et un cas où le critère tombe à zéro,* $\overline{3405}_{(7)}$ : $S = 3+4+0+5 = 12$, multiple de
$6$, donc $6 \mid N$. Contrôle : $\overline{3405}_{(7)} = 1029+196+0+5 = 1230 = 6\times205$ ✓.
*(Et $T = 5-0+4-3 = 6$, donc $1230 \equiv 6 \pmod 8$ ; contrôle $1230 = 8\times153+6$ ✓ — le
critère par $b+1$ ne dit pas la même chose que celui par $b-1$, et c'est tout l'objet du point
d'arrêt qui suit.)*

Marqueur `[[checkpoint:cp-r7b-critere]]` **immédiatement après E6.**

**E7 — problème de forme examen nº 1 : la même écriture dans deux bases.**

> *Déterminer tous les couples de chiffres $(x,y)$ tels que
> $\overline{xy}_{(7)} = \overline{yx}_{(5)}$, et donner le nombre correspondant.*

**Ce qu'on cherche et pourquoi ce geste :** avant toute algèbre, **écrire les contraintes**.
$x$ et $y$ sont des chiffres **des deux** écritures : ils vivent donc dans
$\{0,\dots,6\} \cap \{0,\dots,4\} = \{0,\dots,4\}$. De plus $x \ne 0$ (chiffre de tête en base 7)
et $y \ne 0$ (chiffre de tête en base 5). **Conclusion : $x, y \in \{1,2,3,4\}$ — et c'est cette
ligne, pas l'équation, qui fera le tri à la fin.**

$$7x + y = 5y + x \;\Longleftrightarrow\; 6x = 4y \;\Longleftrightarrow\; 3x = 2y$$

**Le geste d'expert, à exposer :** $2 \mid 3x$ et $\mathrm{PGCD}(2,3) = 1$, donc **le théorème de
Gauss (chapitre 6) donne $2 \mid x$** — on ne divise pas une égalité d'entiers par 3 « pour
voir », on invoque le théorème dont on a vérifié la condition. D'où $x \in \{2,4\}$.

- $x = 2 \Rightarrow y = 3$ ✓ ($3 \le 4$).
- $x = 4 \Rightarrow y = 6$ ✗ — **$6$ n'est pas un chiffre de la base 5.** *C'est ici que la
  ligne de contraintes paie.*

$$\boxed{\,(x,y) = (2,3), \quad N = \overline{23}_{(7)} = \overline{32}_{(5)} = 17\,}$$

*Contrôle :* $2\times7+3 = 17$ et $3\times5+2 = 17$ ✓.

**E8 — problème de forme examen nº 2 : écriture en base × congruences.**

> *Soit $N = \overline{x\,y\,x}_{(7)}$, où $x$ et $y$ sont des chiffres de la base 7 et
> $x \neq 0$.*
> *a) Montrer que $N = 50x + 7y$.*
> *b) Montrer que $N \equiv 2x+y \pmod 6$ et $N \equiv 2x-y \pmod 8$.*
> *c) Déterminer tous les couples $(x,y)$ pour lesquels $N$ est divisible à la fois par 6 et
> par 8.*
> *d) Ces $N$ sont-ils divisibles par 48 ?*

**a)** $N = x\cdot7^2 + y\cdot7 + x = 49x + 7y + x = 50x + 7y$ ✓.

**b)** Par les deux critères de E6 : modulo $6 = b-1$, $N \equiv x+y+x = 2x+y$ ; modulo
$8 = b+1$, $N \equiv a_0-a_1+a_2 = x-y+x = 2x-y$. *Contrôle par l'autre chemin, à écrire :*
$50 \equiv 2 \pmod 6$ et $7 \equiv 1 \pmod 6$ ✓ ; $50 \equiv 2 \pmod 8$ et $7 \equiv -1 \pmod 8$ ✓.
**Les deux lectures tombent sur la même chose — c'est le contrôle croisé que la leçon pratique
déjà (`lesson.md:421`).**

**c)** $2x - y \equiv 0 \pmod 8$ avec $y \in \{0,\dots,6\}$ donne, $x$ par $x$ :

| $x$ | $1$ | $2$ | $3$ | $4$ | $5$ | $6$ |
|---|---|---|---|---|---|---|
| $y$ forcé | $2$ | $4$ | $6$ | $0$ | $2$ | $4$ |
| $2x+y$ | $4$ | $8$ | $\mathbf{12}$ | $8$ | $\mathbf{12}$ | $16$ |
| $\equiv 0 \pmod 6$ ? | non | non | **oui** | non | **oui** | non |

$$\boxed{\,(x,y) \in \{(3,6),\ (5,2)\}\,}$$

*Contrôles complets :* $(3,6)$ → $N = 150+42 = 192 = \overline{363}_{(7)}$ ($147+42+3 = 192$ ✓),
$192 = 6\times32$ ✓, $192 = 8\times24$ ✓. $(5,2)$ → $N = 250+14 = 264 = \overline{525}_{(7)}$
($245+14+5 = 264$ ✓), $264 = 6\times44$ ✓, $264 = 8\times33$ ✓.

**d) La réponse est NON, et c'est la meilleure question des quatre.** $192 = 48\times4$, mais
$264 = 48\times5{,}5$ : **$48 \nmid 264$.** Pourquoi ? Parce que le corollaire du chapitre 6
(« *si $a \mid c$, $b \mid c$ et $\mathrm{PGCD}(a,b)=1$, alors $ab \mid c$* », `lesson.md:309`)
**exige la coprimalité**, et $\mathrm{PGCD}(6,8) = 2 \neq 1$. Ce qu'on obtient, c'est
$\mathrm{PPCM}(6,8) = 24$ — et en effet $192 = 24\times8$ et $264 = 24\times11$. *La condition
que le chapitre 6 a nommée n'était pas décorative : voilà le contre-exemple, sorti d'un
problème de numération.*

### 5.4 Ce que chaque rung du passé apporte, et où la rampe monte

| étape | ce qu'elle demande | échafaudage | modèle confronté |
|---|---|---|---|
| accroche + `cp-r7b-predict-ecriture` | prendre position sur « le nombre a-t-il changé ? » | maximal (QCM à 4 voies, chaque retour nomme le modèle) | **N2** |
| E1 + la rupture mise en scène | suivre les divisions, comprendre l'ordre | maximal (chaque division écrite, le contre-modèle recalculé) | **N1** |
| E2 | refaire seul dans l'autre sens | fort (deux chemins montrés) | N1 (poids) |
| E3–E4 + `cp-r7b-retenue` | poser une opération | moyen (le tableau de colonnes en E3, plus rien en E4) | **N4** |
| E5 | comparer, puis se méfier | moyen (la règle est donnée, sa preuve tient en deux lignes) | **N2**, **N3** (le chiffre de tête non nul dans l'encadrement) |
| E6 + `cp-r7b-critere` | re-dériver un critère | faible (« tu as déjà fait ce calcul au chapitre 3 ») | **`critere-divisibilite-mal-applique`** |
| E7 | poser les contraintes AVANT de résoudre | faible (le geste est nommé une fois) | **N3** |
| E8 | quatre questions d'affilée, forme examen | **nul** : énoncé seul, comme un sujet | **N3**, `gauss-condition-ignoree` (question d) |

### 5.5 Les trois points d'arrêt — énoncés et clés exacts

**Un par capacité.** La leçon en porte six pour dix chapitres ; trois dans un chapitre qui en
couvre trois est cohérent avec le standard « *chaque pièce vérifiée avant de passer à la
suivante* » (VISION L62). **→ §11 Q8** si l'owner les trouve trop nombreux : le premier
(l'engagement) est non négociable, le troisième est le premier à couper.

Format YAML : celui des six existants — `id`, `rung`, `habilete`, `skill_code`, `tags`,
`primary_misconception`, `item_source`, `lesson_placement`, `stem`, `type`, `choices`. **Chaque
retour d'erreur NOMME le modèle** (« Modèle détecté : … »), comme les six autres. **Les points
d'arrêt ne comptent pas dans le plancher** (`checkpoints.yaml:6-12`, `items.yaml:2626`).

#### `cp-r7b-predict-ecriture` — l'ENGAGEMENT (N2)

```yaml
  - id: cp-r7b-predict-ecriture
    rung: "R7b"
    habilete: raisonnement
    skill_code: maths_arithmetique
    tags: [checkpoint, formative, misconception_driven, maths_arithmetique, numeration, hook_commit]
    primary_misconception: mc.math.maths_arithmetique.numeration-ecriture-prise-pour-le-nombre
    item_source: original
    lesson_placement: in_R7b
```

**Stem.** « $2025$ s'écrit $\overline{5622}$ en base $7$. **Prends position avant de lire la
suite :** en passant de la base $10$ à la base $7$, qu'est-ce qui a changé ? »

| choix | texte | modèle | le retour, en une ligne |
|---|---|---|---|
| **A ✘** | « Le nombre lui-même : $\overline{5622}_{(7)}$ est plus grand, chaque chiffre y « pèse » davantage. » | **N2** | Modèle détecté : l'écriture prise pour le nombre. Les deux écritures désignent **le même** entier — recompte : $5\times343+6\times49+2\times7+2 = 2025$. |
| **B ✔** | « Seulement l'écriture : c'est le même entier, compté par paquets de $7$ au lieu de paquets de $10$. » | — | Exact. Une base est une taille de paquet, pas une transformation du nombre. |
| **C ✘** | « Rien n'a changé et c'est impossible : $5622$ et $2025$ sont deux nombres différents, donc l'égalité est fausse. » | **N2** | Modèle détecté : la suite de chiffres lue en base 10. « $5622$ » n'est un nombre qu'une fois la base appliquée ; ici elle vaut $7$, pas $10$. |
| **D ✘** | « L'écriture seulement — mais la base $7$ ne peut pas tout représenter : il lui manque les chiffres $7$, $8$ et $9$. » | **N3** | Modèle détecté : moins de chiffres confondu avec moins de nombres. La base $7$ a exactement $7$ chiffres ($0$ à $6$) et écrit **tous** les entiers naturels — elle utilise juste plus de colonnes. |

*Contamination vérifiée : aucun des deux modèles ne produit B.*

#### `cp-r7b-retenue` — la RUPTURE du report (N4)

```yaml
  - id: cp-r7b-retenue
    rung: "R7b"
    habilete: utilisation
    primary_misconception: mc.math.maths_arithmetique.numeration-retenue-a-dix
    item_source: clone_of_AR-51      # même forme, nombres frais
    lesson_placement: in_R7b
```

**Stem.** « Pose et effectue $\overline{25}_{(6)} \times \overline{4}_{(6)}$. Le résultat est
attendu en base $6$. »

*(Vérité du calcul : $\overline{25}_{(6)} = 17$, $17\times4 = 68$ ; $68 = 1\times36 + 5\times6 + 2$.
En colonnes : $5\times4 = 20 = 3\times6+2$ → chiffre $2$, retenue $3$ ; $2\times4 = 8$, $+3 = 11
= 1\times6+5$ → chiffre $5$, retenue $1$.)*

| choix | texte | modèle | valeur recalculée depuis CE modèle |
|---|---|---|---|
| **A ✔** | $\overline{152}_{(6)}$ | — | $36+30+2 = 68$ ✓ |
| **B ✘** | $\overline{100}_{(6)}$ | **N4** (seuil à 10) | $5\times4 = 20$ → on écrit $0$, on retient $2$ ; $2\times4+2 = 10$ → on écrit $0$, on retient $1$. **L'écriture obtenue est parfaitement légale en base 6 — c'est pourquoi cette erreur-là ne se voit pas** ; elle vaut $36 \ne 68$. |
| **C ✘** | $\overline{251}_{(6)}$ | **N1** | Le passage par la base 10 est juste ($68$), mais les restes sont lus dans l'ordre de sortie : $68 = 6\times11+2$, $11 = 6\times1+5$, $1 = 6\times0+1$ → $2,5,1$ au lieu de $1,5,2$. Vaut $72+30+1 = 103$. |
| **D ✘** | $\overline{22}_{(6)}$ | **N4** (retenue non reportée) | Chaque colonne ramenée dans $\{0,\dots,5\}$ sans rien reporter : $20 \bmod 6 = 2$, $8 \bmod 6 = 2$. Vaut $14$. |

**Pourquoi une multiplication et pas une addition :** ici l'erreur de seuil produit une écriture
**bien formée** ($\overline{100}_{(6)}$), donc **non barrable à vue**. C'est la seule façon de
mesurer N4 sans que l'élève l'élimine par simple inspection (§8.1).

#### `cp-r7b-critere` — la RUPTURE des critères (famille réutilisée)

```yaml
  - id: cp-r7b-critere
    rung: "R7b"
    habilete: utilisation
    primary_misconception: mc.math.maths_arithmetique.critere-divisibilite-mal-applique
    item_source: original
    lesson_placement: in_R7b
```

**Stem.** « En base $5$, la somme des chiffres d'un entier $N$ vaut $12$. **Que peut-on en
déduire à coup sûr ?** »

| choix | texte | modèle | pourquoi |
|---|---|---|---|
| **A ✔** | « $N$ est divisible par $4$. » | — | $5 \equiv 1 \pmod 4$, donc $N \equiv S = 12 \equiv 0 \pmod 4$. |
| **B ✘** | « $N$ est divisible par $5$. » | `critere-divisibilite-mal-applique` | Modèle détecté : la somme des chiffres crue liée à la **base**. Elle donne le reste modulo $b-1 = 4$. Modulo $5$, c'est le **chiffre des unités** qui parle, et on ne le connaît pas. |
| **C ✘** | « $N$ est divisible par $3$, car $1+2 = 3$. » | `critere-divisibilite-mal-applique` | Modèle détecté : le critère de la base 10 rejoué à l'aveugle. Il venait de $10 \equiv 1 \pmod 3$ — une congruence qui ne dit rien de la base 5. |
| **D ✘** | « $N$ est divisible par $6$. » | `critere-divisibilite-mal-applique` | Modèle détecté : $b-1$ et $b+1$ confondus. Modulo $6 = b+1$, c'est la somme **alternée** qui décide, pas la somme. |

---

## 6. Médias

**Une figure commandée, deux emplacements d'amélioration, aucun média de motion.**

1. **`numeration-cascade-2025-base7`** — **`type: structural-diagram`**, **`tool: svg+katex`**.
   *(Jamais `gemini` : structure exacte et étiquettes mathématiques — ADR 0017.)* La cascade des
   quatre divisions de E1, les restes encadrés, **et la flèche de bas en haut** qui assemble
   $\overline{5622}_{(7)}$. La notion porte déjà une cascade (`[[figure:euclide-cascade]]`,
   `lesson.md:209`) : **même grammaire visuelle, à réutiliser, pas à réinventer.**
   `stages` (LESSON-EXPERIENCE-SPEC §2.8, **ordre AUTHORED ici, jamais improvisé**) :
   - *stage 1* — les quatre divisions écrites de haut en bas, restes non marqués : ce que
     l'algorithme produit.
   - *stage 2* — les quatre restes encadrés et étiquetés $a_0, a_1, a_2, a_3$ : **chaque reste
     porte un poids**, et le premier porte $7^0$.
   - *stage 3* — la flèche remontante et l'écriture assemblée $\overline{5622}_{(7)}$, avec la
     légende de lecture : *on lit de bas en haut parce que le premier reste est celui des
     unités*.
2. **Emplacement d'amélioration — le manipulable de base.** **`type: manipulable`**,
   **`tool: geogebra/desmos/falstad/phet`** : un curseur de base $b$ de 2 à 10, un entier fixe,
   et l'écriture qui se recompose sous les yeux. C'est **le meilleur remède possible à N2** (la
   manipulation *est* le chemin : le nombre ne bouge pas, l'écriture bouge). **Dette déclarée,
   pas bloquante** : la rung tient entièrement sans lui (E5 fait le même travail en statique).
   À poser en **commentaire HTML d'auteur** (`stripAuthoringComments`, template §E) — jamais en
   renvoi porteur dans la prose. **→ §11 Q9.**
3. **Emplacement d'amélioration — l'accroche.** **`type: atmospheric-illustration`**,
   **`tool: gemini`** : dix doigts, un boulier, un cadran d'horloge — le registre calme de la
   DESIGN-BIBLE. **Non porteur** (case D du template : l'accroche tient sans actif en attente).
4. **`type: motion` — décision explicite de NE PAS en commander** (règle de décision « motion »,
   template §A) : **rien n'évolue dans le temps** dans cette rung. La seule chose qui a un
   *ordre* est la lecture des restes, et un étagement de figure (`stages` ci-dessus) la sert
   mieux qu'une animation, parce que l'élève contrôle le rythme. *Le silence serait un échec de
   case ; ceci est la justification « statique suffit ».*

---

## 7. Cahier des charges — content-author

### 7.1 L'ancre, exacte

**Un nouveau titre de niveau 2, `## R7b — Les systèmes de numération`, inséré entre la fin de
R7 et le titre `## R8` (`lesson.md:591`).** Concrètement : **après**
`[[figure:solutions-diophantiennes-reseau]]` (`:587`) et son `---` (`:589`), **avant**
`## R8 — Pour t'entraîner`. Un `---` ferme la nouvelle rung.

**Rien d'autre ne bouge dans la leçon.** R7 n'est pas touché ; R8 n'est touché que par la seule
phrase du §9.1.

### 7.2 Ordre imposé des morceaux

1. Accroche (§5.0) → `[[checkpoint:cp-r7b-predict-ecriture]]`
2. **Bloc A** : E1 + **la rupture N1 mise en scène** + `[[figure:numeration-cascade-2025-base7]]` + E2
3. **Bloc B** : E3 → E4 → `[[checkpoint:cp-r7b-retenue]]` → E5 (+ le « Le piège à éviter »)
4. **Bloc C** : E6 → `[[checkpoint:cp-r7b-critere]]` → E7 → E8
5. Clôture (§9.2)

### 7.3 Voix et gabarits — ceux du fichier, pas d'autres

- **Chaque exemple travaillé ouvre par** « **Ce qu'on cherche et pourquoi ce geste :** » — le
  gabarit maison, utilisé douze fois dans cette leçon (`lesson.md:65`, `:125`, `:195`, `:285`,
  `:323`, `:331`, `:405`, `:459`, `:485`, `:505`, `:551`, `:565`).
- **Les pièges se nomment avec** « **Le piège à éviter :** » (`lesson.md:351`).
- **Registre `tu`/`on`**, jamais de passif détaché. Écrit pour être dit à voix haute.
- **Apostrophes ASCII dans le markdown** : la typographie française est produite au rendu par
  `remarkFrenchTypography`. **Ne jamais taper U+202F à la main dans `lesson.md`** (template §A).
- **Discipline des maths affichées** : toute dérivation de $\ge 2$ transformations passe en
  **bloc**, **une transformation par ligne**. Les chaînes `a = b = c = d` sont un échec de
  gabarit. **Registre choisi ici : blocs narrés, pas de composant `Derivation`** — les deux
  dérivations longues (E7, E8) sont des **argumentations** dont la prose intercalaire porte
  l'enseignement (le tri par les contraintes, l'invocation de Gauss), pas des vérifications
  procédurales. *C'est le même arbitrage que RLC R2/R5.*
- **Annotation de raisonnement sur 100 % des étapes travaillées.** Une étape non annotée fait
  échouer la case. Les décisions à exposer nommément : *pourquoi on écrit les contraintes avant
  l'équation* (E7) ; *pourquoi on invoque Gauss au lieu de « diviser par 3 »* (E7) ; *pourquoi
  on recalcule le critère au lieu de le réciter* (E6) ; *pourquoi la colonne déborde à $b$*
  (E4) ; *pourquoi le zéro de $\overline{3204}_{(5)}$ n'est pas un blanc* (E2).

### 7.4 Longueur visée

**1 400 à 1 800 mots + les affichages.** C'est la plus grosse rung de la leçon ; elle couvre
trois capacités. **Ordre de coupe si c'est trop long, du premier au dernier :** (1) le second
chemin de E2 (Horner), (2) la question **d)** de E8, (3) le second cas de E6
($\overline{3405}_{(7)}$). **Ne jamais couper** : la rupture N1, le contrôle de E3, la ligne de
contraintes de E7.

### 7.5 Renvois vers les chapitres existants — la liste fermée, à écrire telle quelle

La rung **doit** citer, et **ne peut citer que** : « **chapitre 2** » (division euclidienne),
« **chapitre 3** » (congruences, et le critère par 9), « **chapitre 6** » (Gauss et son
corollaire). **Aucun renvoi vers un chapitre $\ge$ 8**, et **aucun renvoi à « chapitre 10 » ou
« chapitre 11 »** : la rung ne se cite pas elle-même et ne cite pas R8. *C'est ce qui garde le
coût de renumérotation à zéro (§2.2).*

---

## 8. Cahier des charges — item-author : 15 items, AR-41 → AR-55

### 8.0 Le lot, vu de haut

- **Identifiants : AR-41 à AR-55** (le dernier existant est AR-40, `items.yaml:2526` et
  `total_items: 40`). **Rung : `R7b` pour les quinze.**
- **Plancher :** `floor: 3`. **Cinq modèles × 3 items primaires = 15.** Les quatre familles
  neuves atteignent le plancher par leurs primaires et le dépassent par les distracteurs croisés.
- **Champ `habilete` OBLIGATOIRE sur les quinze** (fait **k** : la convention est posée depuis
  AR-33). **Mix : 6 `application_directe` / 6 `application_non_explicite` / 3 `synthese`
  = 40 / 40 / 20** — **exactement** la cible `maths-sm.yaml:58-61`, et la réponse au reproche
  que le fichier s'est fait lui-même (fait **l**).
- **Format :** `id`, `rung`, `habilete`, `difficulty_level`, `skill_code`, `tags`,
  `primary_misconception`, `stem`, `type: mcq`, `choices`, `correct_feedback`, `solution`.
- **`coverage_summary` : à RÉGÉNÉRER, jamais à éditer à la main** (`items.yaml:2621` : tableau
  généré contre `web/scripts/lib/couverture-compte.mjs`, gardé par
  `web/scripts/resume-couverture.mjs`).

**Deltas attendus** *(un item compte pour un modèle dès qu'un de ses distracteurs le porte)* :

| | avant | après | via |
|---|---|---|---|
| `total_items` | 40 | **55** | — |
| `numeration-restes-ordre-inverse` | — | **8** | AR-41, 42, 43, 45, 48, 50, 51, 54 |
| `numeration-ecriture-prise-pour-le-nombre` | — | **7** | AR-41, 42, 43, 44, 45, 46, 49 |
| `numeration-contraintes-sur-les-chiffres` | — | **6** | AR-46, 47, 48, 49, 52, 55 |
| `numeration-retenue-a-dix` | — | **3** | AR-50, 51, 52 |
| `critere-divisibilite-mal-applique` | 4 | **7** | + AR-53, 54, 55 |
| `reste-non-normalise` | 5 | **6** | + AR-53 |
| `ramp_coverage.R7b` | — | **15** | nouvelle clé |

**Aucun compte ne baisse. Aucun item existant n'est re-tagué, renuméroté ou déplacé.**
*(Neuf familles siègent exactement au plancher — `honest_state`, `items.yaml:2661-2667` : tout
déplacement en casse une.)*

### 8.1 La règle du chiffre hors-base — comment on traite la barrabilité

Un distracteur portant un chiffre $\ge b$ est **barrable à vue** : l'élève l'élimine sans rien
savoir du reste, et le taux de réussite au hasard monte. **Trois règles, appliquées item par
item :**

1. **Jamais** de chiffre $\ge b$ dans un distracteur dont le modèle cible est **autre chose**.
   *(Vérifié : aucun des quinze items n'en contient hors des cas 2 et 3.)*
2. **Quand le modèle cible EST la borne** (N3), le chiffre hors-base est **la bonne réponse**,
   pas un distracteur : AR-47 demande « laquelle de ces écritures n'a aucun sens ? ». La
   barrabilité joue alors **pour** l'item.
3. **Quand le modèle cible est le report** (N4), le chiffre hors-base est la **signature** de
   l'erreur et doit apparaître — mais **l'item principal du modèle est construit pour qu'il
   n'apparaisse PAS** : AR-51 et `cp-r7b-retenue` sont des **multiplications**, où l'erreur de
   seuil produit une écriture **bien formée** ($\overline{135}_{(6)}$, $\overline{100}_{(6)}$).
   AR-50 (addition) garde la version barrable, **volontairement et une seule fois** : y barrer
   $\overline{377}_{(5)}$ suppose de tenir la borne $a_i \le 4$, ce qui est **du savoir, pas une
   fuite** — l'information est diagnostique, et les deux autres distracteurs restent plausibles.

### 8.2 Les trois items de N1 — l'ordre des restes

**AR-41** · `application_directe` · `difficulty_level: 2` · tags `[numeration, base, division_euclidienne]`
**Stem.** « On écrit $N = 100$ en base $6$ par divisions successives :
$100 = 6\times16+4$, puis $16 = 6\times2+4$, puis $2 = 6\times0+2$. Quelle est l'écriture de
$100$ en base $6$ ? »

| choix | texte | modèle | valeur recalculée depuis CE modèle |
|---|---|---|---|
| **A ✔** | $\overline{244}_{(6)}$ | — | $72+24+4 = 100$ ✓ |
| **B ✘** | $\overline{442}_{(6)}$ | **N1** | restes lus dans l'ordre de sortie ; vaut $144+24+2 = 170$ |
| **C ✘** | $\overline{100}_{(6)}$ | **N2** | « les chiffres ne changent pas, seule la base change » ; vaut $36$ |
| **D ✘** | $\overline{24}_{(6)}$ | **N1** | la dernière ligne ($2 = 6\times0+2$) jugée dégénérée et jetée ; vaut $16$ — c'est le quotient intermédiaire, pas $N$ |

**AR-42** · `application_directe` · `difficulty_level: 3` · tags `[numeration, base, division_euclidienne]`
**Stem.** « Dans l'écriture de $N = 500$ en base $8$, quel est le **chiffre des unités** ? »
*(Vérité : $500 = 8\times62+4$, $62 = 8\times7+6$, $7 = 8\times0+7$, donc
$500 = \overline{764}_{(8)}$ ; contrôle $448+48+4 = 500$ ✓.)*

| choix | texte | modèle | pourquoi ce chiffre-là |
|---|---|---|---|
| **A ✔** | $4$ | — | le reste de la **première** division par 8 |
| **B ✘** | $7$ | **N1** | le **dernier** reste pris pour les unités (lecture de gauche à droite) |
| **C ✘** | $0$ | **N2** | « $500$ finit par $0$, donc son écriture aussi » — l'écriture décimale transportée telle quelle ; un $0$ final voudrait dire $8 \mid 500$, or $500 = 8\times62+4$ |
| **D ✘** | $6$ | **N1** | le reste de la **deuxième** division, c'est-à-dire le chiffre des huitaines |

**AR-43** · `application_non_explicite` · `difficulty_level: 3` · tags `[numeration, base, poids]`
**Stem.** « Que vaut $\overline{203}_{(5)}$ en base $10$ ? »

| choix | texte | modèle | valeur recalculée depuis CE modèle |
|---|---|---|---|
| **A ✔** | $53$ | — | $2\times25 + 0\times5 + 3 = 53$ |
| **B ✘** | $203$ | **N2** | l'écriture rendue telle quelle |
| **C ✘** | $77$ | **N1** | poids lus à l'envers : $2\times1 + 0\times5 + 3\times25$ |
| **D ✘** | $265$ | **N1** | exposants décalés d'un cran : $2\times125 + 0\times25 + 3\times5$ |

### 8.3 Les trois items de N2 — l'écriture prise pour le nombre

**AR-45** · `application_directe` · `difficulty_level: 2` · tags `[numeration, base, valeur]`
**Stem.** « Que vaut $\overline{101}_{(8)}$ en base $10$ ? »

| choix | texte | modèle | valeur recalculée |
|---|---|---|---|
| **A ✔** | $65$ | — | $64+0+1$ |
| **B ✘** | $101$ | **N2** | la chaîne rendue telle quelle |
| **C ✘** | $5$ | **N2** | « $101$, c'est cinq » — l'écriture détachée de sa base (lue en binaire par réflexe) |
| **D ✘** | $520$ | **N1** | exposants décalés : $1\times8^3 + 0\times8^2 + 1\times8^1$ |

**AR-44** · `application_non_explicite` · `difficulty_level: 4` · tags `[numeration, base, comparaison]`
**Stem.** « Range dans l'ordre croissant : $A = \overline{11011}_{(2)}$, $B = \overline{34}_{(5)}$,
$C = \overline{23}_{(9)}$. »
*(Vérités : $A = 16+8+0+2+1 = 27$ ; $B = 15+4 = 19$ ; $C = 18+3 = 21$. Donc $B < C < A$.)*

| choix | texte | modèle | le chemin qui y mène |
|---|---|---|---|
| **A ✔** | $B < C < A$ | — | $19 < 21 < 27$ |
| **B ✘** | $C < B < A$ | **N2** | chaînes lues en base 10 : $23 < 34 < 11011$ — et le même ordre sort de « le plus de chiffres gagne » appliqué **entre bases différentes** |
| **C ✘** | $A < B < C$ | **N2** | « plus la base est grande, plus le nombre est grand » |
| **D ✘** | $A < C < B$ | **N2** | sommes de chiffres comparées : $4$, $5$, $7$ |

⚠ **Contamination vérifiée, et un distracteur REJETÉ au passage.** Une première version prenait
$A = \overline{1011}_{(2)}$ : l'heuristique « plus la base est grande, plus le nombre est grand »
y donnait **la bonne réponse**. Les nombres ci-dessus sont choisis pour que **les quatre
lectures fautives donnent quatre ordres, tous faux** — y compris la lecture à poids inversés
(N1), qui donne $B < A < C$, **absent de la liste**. *C'est aussi la raison pour laquelle cet
item est INTER-bases : une comparaison en base unique ne peut pas séparer N2 de la vérité
(§4.2).*

**AR-46** · `synthese` · `difficulty_level: 5` · tags `[numeration, base, encadrement]`
**Stem.** « Un même entier naturel $N$ s'écrit avec **exactement $4$ chiffres** en base $5$ et
avec **exactement $3$ chiffres** en base $8$. Entre quelles bornes se situe $N$ ? »
*(Vérités : $5^3 = 125 \le N \le 5^4-1 = 624$ et $8^2 = 64 \le N \le 8^3-1 = 511$ ; intersection
$125 \le N \le 511$.)*

| choix | texte | modèle | pourquoi |
|---|---|---|---|
| **A ✔** | $125 \le N \le 511$ | — | l'**intersection** des deux encadrements |
| **B ✘** | « Impossible : un entier ne peut pas avoir $4$ chiffres et $3$ chiffres. » | **N2** | le nombre de chiffres pris pour une propriété du **nombre**, alors que c'est une propriété du couple (nombre, base) |
| **C ✘** | $N \ge 1000$, « puisque son écriture en base $5$ commence à $\overline{1000}_{(5)}$ » | **N2** | $\overline{1000}_{(5)}$ lu « mille » ; il vaut $125$ |
| **D ✘** | $64 \le N \le 624$ | **N3** | les deux contraintes **réunies** au lieu d'être intersectées — on garde la plus large de chaque côté |

### 8.4 Les trois items de N3 — les contraintes sur les chiffres

**AR-47** · `application_directe` · `difficulty_level: 2` · tags `[numeration, base, chiffres]`
**Stem.** « Parmi les écritures suivantes, **une seule n'a aucun sens**. Laquelle ? »

| choix | texte | modèle | pourquoi |
|---|---|---|---|
| **A ✘** | $\overline{407}_{(8)}$ | **N3** | croire que la base $8$ s'arrête à $6$ : elle a $8$ chiffres, $0$ à $7$ ; $7$ est légal |
| **B ✘** | $\overline{1332}_{(4)}$ | **N3** | même décalage d'un cran : la base $4$ a les chiffres $0,1,2,3$ ; $3$ est légal |
| **C ✔** | $\overline{1206}_{(6)}$ | — | le chiffre $6$ **est** la base : il n'existe pas en base $6$ (les chiffres vont de $0$ à $5$) |
| **D ✘** | $\overline{89}_{(10)}$ | **N3** | le même décalage, dans la base la plus familière : $8$ et $9$ sont des chiffres de la base $10$ |

*Application de la règle 8.1-2 : le chiffre hors-base est **la clé**, pas un leurre.*

**AR-48** · `synthese` · `difficulty_level: 5` · tags `[numeration, base, gauss, chiffres]`
**Stem.** « Déterminer tous les couples de chiffres $(x,y)$ tels que
$\overline{xy}_{(9)} = \overline{yx}_{(7)}$. »
*(Vérités : $9x+y = 7y+x \Leftrightarrow 8x = 6y \Leftrightarrow 4x = 3y$. Contraintes :
$x,y \in \{0,\dots,6\}$ — chiffres des **deux** bases — avec $x \ne 0$ et $y \ne 0$, donc
$x,y \in \{1,\dots,6\}$. Gauss : $3 \mid 4x$ et $\mathrm{PGCD}(3,4)=1$ donc $3 \mid x$, d'où
$x \in \{3,6\}$ ; $x=3 \Rightarrow y=4$ ✓, $x=6 \Rightarrow y=8$ ✗. Solution unique $(3,4)$,
$N = \overline{34}_{(9)} = 31 = \overline{43}_{(7)}$.)*

| choix | texte | modèle | le chemin qui y mène |
|---|---|---|---|
| **A ✔** | $(x,y) = (3,4)$ seulement, et $N = 31$ | — | $27+4 = 31$ et $28+3 = 31$ ✓ |
| **B ✘** | $(3,4)$ **et** $(6,8)$ | **N3** | la racine $y = 8$ conservée : $8$ n'est pas un chiffre de la base $7$ |
| **C ✘** | $(0,0)$ **et** $(3,4)$ | **N3** | $(0,0)$ vérifie bien $4x = 3y$ — c'est la condition « chiffre de tête non nul » qui l'écarte, et elle n'a pas été posée |
| **D ✘** | $(x,y) = (4,3)$ | **N1** | poids intervertis dans la mise en équation ($\overline{xy}_{(9)}$ lu $9y+x$) : on obtient $4y = 3x$, donc $(4,3)$. Contrôle : $\overline{43}_{(9)} = 39 \ne \overline{34}_{(7)} = 25$ |

**Non-duplication vérifiée :** E7 traite $\overline{xy}_{(7)} = \overline{yx}_{(5)}$, réponse
$(2,3)$, $N = 17$. **Bases différentes, coefficients différents ($3x = 2y$ contre $4x = 3y$),
réponse différente.** L'item ne pré-résout pas l'exemple travaillé ; il en rejoue le geste.

**AR-49** · `application_directe` · `difficulty_level: 3` · tags `[numeration, base, encadrement]`
**Stem.** « Un entier naturel $N$ s'écrit avec exactement $4$ chiffres en base $7$. Entre
quelles bornes se situe $N$ ? »
*(Vérités : $7^3 = 343 \le N \le 7^4-1 = 2400$, et $\overline{6666}_{(7)} = 6\times400 = 2400$ ✓.)*

| choix | texte | modèle | pourquoi |
|---|---|---|---|
| **A ✔** | $343 \le N \le 2400$ | — | $\overline{1000}_{(7)} = 343$ et $\overline{6666}_{(7)} = 2400$ |
| **B ✘** | $0 \le N \le 2400$ | **N3** | le chiffre de tête autorisé à être nul : la borne basse disparaît |
| **C ✘** | $343 \le N \le 2401$ | **N3** | le plus grand chiffre pris égal à $b$ et non à $b-1$ ; $2401 = 7^4$ s'écrit avec **cinq** chiffres |
| **D ✘** | $1000 \le N \le 6666$ | **N2** | les écritures $\overline{1000}_{(7)}$ et $\overline{6666}_{(7)}$ lues comme des nombres décimaux |

### 8.5 Les trois items de N4 — le report de colonne

**AR-50** · `application_directe` · `difficulty_level: 2` · tags `[numeration, base, addition, retenue]`
**Stem.** « Effectue $\overline{243}_{(5)} + \overline{134}_{(5)}$, résultat en base $5$. »
*(Vérités : $\overline{243}_{(5)} = 73$, $\overline{134}_{(5)} = 44$, somme $117$ ;
$117 = \overline{432}_{(5)}$, contrôle $100+15+2 = 117$ ✓.)*

| choix | texte | modèle | valeur recalculée depuis CE modèle |
|---|---|---|---|
| **A ✔** | $\overline{432}_{(5)}$ | — | $117$ ✓ |
| **B ✘** | $\overline{377}_{(5)}$ | **N4** (seuil à 10) | $3+4 = 7 < 10$ donc « pas de retenue » → chiffre $7$ ; idem colonne suivante. **Écriture illégale : c'est la signature du modèle** (§8.1-3) |
| **C ✘** | $\overline{234}_{(5)}$ | **N1** | le passage par la base 10 est juste ($117$), mais les restes sont lus à l'envers : $117 = 5\times23+2$, $23 = 5\times4+3$, $4 = 5\times0+4$ → $2,3,4$ au lieu de $4,3,2$ ; vaut $69$ |
| **D ✘** | $\overline{322}_{(5)}$ | **N4** (retenue non reportée) | chaque colonne ramenée dans $\{0,\dots,4\}$ sans rien transmettre : $7 \to 2$, $7 \to 2$, $3$ ; vaut $87$ |

**AR-51** · `application_non_explicite` · `difficulty_level: 3` · tags `[numeration, base, multiplication, retenue]`
**Stem.** « Effectue $\overline{45}_{(6)} \times \overline{3}_{(6)}$, résultat en base $6$. »
*(Vérités : $\overline{45}_{(6)} = 29$, $29\times3 = 87$ ; $87 = 2\times36+2\times6+3 =
\overline{223}_{(6)}$, contrôle $72+12+3 = 87$ ✓.)*

| choix | texte | modèle | valeur recalculée depuis CE modèle |
|---|---|---|---|
| **A ✔** | $\overline{223}_{(6)}$ | — | $87$ ✓ |
| **B ✘** | $\overline{135}_{(6)}$ | **N4** (seuil à 10) | $5\times3 = 15$ → écrire $5$, retenir $1$ ; $4\times3+1 = 13$ → écrire $3$, retenir $1$. **Écriture parfaitement légale — l'erreur est invisible à l'œil, il faut recalculer** ; vaut $59$ |
| **C ✘** | $\overline{322}_{(6)}$ | **N1** | $87$ converti, restes lus à l'envers ($3,2,2$ au lieu de $2,2,3$) ; vaut $122$ |
| **D ✘** | $\overline{1215}_{(6)}$ | **N4** (aucun report) | chaque produit de colonne écrit tel quel : $4\times3 = 12$ et $5\times3 = 15$, collés ; vaut $299$ |

**C'est l'item central de N4** (règle 8.1-3) : le distracteur cible est **non barrable**.

**AR-52** · `application_non_explicite` · `difficulty_level: 4` · tags `[numeration, base, retenue, mecanisme]`
**Stem.** « Dans une addition posée en base $b$, une colonne donne la somme $c$ (avec
$c \ge b$). Quelle est la règle **correcte** ? »

| choix | texte | modèle | pourquoi |
|---|---|---|---|
| **A ✔** | « On écrit le reste de $c$ dans la division euclidienne **par $b$**, et on reporte le quotient sur la colonne de gauche. » | — | la colonne voisine pèse exactement $b$ fois plus |
| **B ✘** | « On écrit le reste de $c$ modulo $10$, et on reporte le quotient par $10$. » | **N4** | le seuil de la base 10 gardé par automatisme |
| **C ✘** | « On écrit $c$ si $c < 10$, sinon $c-10$ avec une retenue de $1$. » | **N4** | la même chose, sous sa forme apprise par cœur à l'école primaire |
| **D ✘** | « La colonne déborde quand $c$ **dépasse** $b$ : on écrit $c-b$ dès que $c > b$. » | **N3** | décalage d'un cran : à $c = b$ exactement il faut déjà reporter (on écrit $0$, on retient $1$) — sinon $b$ devient un chiffre |

### 8.6 Les trois items de la famille réutilisée — les critères par $b-1$ et $b+1$

**AR-53** · `application_non_explicite` · `difficulty_level: 3` · tags `[numeration, base, divisibilite, congruences]`
**Stem.** « Soit $N = \overline{6482}_{(9)}$. Quel est le reste de la division de $N$ par $8$ ? »
*(Vérités : $N = 4374+324+72+2 = 4772$ ; $4772 = 8\times596 + 4$. Par le critère :
$b-1 = 8$, $S = 6+4+8+2 = 20 \equiv 4 \pmod 8$ ✓.)*

| choix | texte | modèle | le chemin qui y mène |
|---|---|---|---|
| **A ✔** | $4$ | — | $S = 20$, puis $20 = 8\times2+4$ |
| **B ✘** | $20$ | `reste-non-normalise` | la somme des chiffres rendue telle quelle, sans être ramenée dans $[0,8[$ |
| **C ✘** | $0$ | `critere-divisibilite-mal-applique` | la somme **alternée** employée — c'est le critère de $b+1 = 10$ : $2-8+4-6 = -8 \equiv 0 \pmod 8$ |
| **D ✘** | $2$ | `critere-divisibilite-mal-applique` | le **chiffre des unités** lu : il donne le reste modulo $b = 9$, pas modulo $8$ |

⚠ **Contamination vérifiée, et les nombres choisis POUR ça.** Sur une première version
($\overline{4132}_{(9)}$), le chiffre des unités **et** la somme des chiffres donnaient tous
deux $2$ : le modèle fautif atteignait la bonne réponse. Avec $\overline{6482}_{(9)}$, les trois
lectures donnent $20$, $0$ et $2$ — **trois valeurs distinctes, toutes différentes de $4$.**

**AR-54** · `application_non_explicite` · `difficulty_level: 4` · tags `[numeration, base, divisibilite, congruences]`
**Stem.** « Soit $N = \overline{a_3 a_2 a_1 a_0}_{(7)}$. À quoi $N$ est-il congru modulo $8$ ? »

| choix | texte | modèle | pourquoi |
|---|---|---|---|
| **A ✔** | $a_0 - a_1 + a_2 - a_3$ | — | $7 \equiv -1 \pmod 8$, donc $7^k \equiv (-1)^k$ |
| **B ✘** | $a_0 + a_1 + a_2 + a_3$ | `critere-divisibilite-mal-applique` | le critère de $b-1 = 6$ appliqué à $b+1 = 8$ : la somme simple vient de $7 \equiv 1 \pmod 6$, pas modulo $8$ |
| **C ✘** | $a_3 - a_2 + a_1 - a_0$ | **N1** | la somme alternée démarrée par le chiffre de **tête** : c'est l'opposé de la bonne, parce que le chiffre de tête n'est pas celui de poids $7^0$ |
| **D ✘** | $a_0$ | `critere-divisibilite-mal-applique` | le chiffre des unités : il donne le reste modulo $7$, pas modulo $8$ |

**AR-55** · `synthese` · `difficulty_level: 5` · tags `[numeration, base, divisibilite, chiffres]`
**Stem.** « Déterminer tous les chiffres $x$ de la base $9$ tels que $N = \overline{3\,x\,4}_{(9)}$
soit divisible par $8$. »
*(Vérités : $b-1 = 8$, $S = 3+x+4 = x+7 \equiv 0 \pmod 8 \Rightarrow x \equiv 1 \pmod 8$, et
$x \le 8$, donc $x = 1$. Contrôle : $\overline{314}_{(9)} = 243+9+4 = 256 = 8\times32$ ✓.)*

| choix | texte | modèle | le chemin qui y mène |
|---|---|---|---|
| **A ✔** | $x = 1$ seulement | — | $x \equiv 1 \pmod 8$ et $0 \le x \le 8$ |
| **B ✘** | $x = 1$ **et** $x = 9$ | **N3** | la seconde racine conservée : $9$ n'est pas un chiffre de la base $9$ |
| **C ✘** | $x = 7$ | `critere-divisibilite-mal-applique` | la somme **alternée** ($4-x+3 = 7-x \equiv 0$) — c'est le critère de $b+1 = 10$, pas de $8$ |
| **D ✘** | $x = 2$ | `critere-divisibilite-mal-applique` | le bon critère au **mauvais module** : $x+7 \equiv 0 \pmod 9$ au lieu de $\pmod 8$. Contrôle : $\overline{324}_{(9)} = 265$, et $265 = 8\times33+1$ — non divisible |

### 8.7 Le registre des modèles — aucune ligne non revendiquée

| modèle | rupture en prose @ rung | OU délégué aux items |
|---|---|---|
| **N1** `numeration-restes-ordre-inverse` | **R7b, bloc A** — mise en scène complète (voix → test sur $100$ base $6$ → cassure sur $170 \ne 100$), §5.1 | + AR-41, 42, 43 |
| **N2** `numeration-ecriture-prise-pour-le-nombre` | **R7b, accroche** — `cp-r7b-predict-ecriture`, engagement réel avant toute explication, §5.0 ; repris en E5 | + AR-44, 45, 46 |
| **N3** `numeration-contraintes-sur-les-chiffres` | **R7b, E7** — la ligne de contraintes posée **avant** l'équation, puis la racine $y=6$ rejetée sous les yeux de l'élève, §5.3 | + AR-47, 48, 49 |
| **N4** `numeration-retenue-a-dix` | **R7b, bloc B** — « pourquoi $7$ et pas $10$ » + `cp-r7b-retenue`, §5.2 | + AR-50, 51, 52 |
| `critere-divisibilite-mal-applique` | **R7b, E6** — les deux critères construits côte à côte + `cp-r7b-critere`, §5.3 | + AR-53, 54, 55 |

**Cinq lignes, cinq revendications. Aucune case vide.**

---

## 9. Ce que R8 et la clôture gagnent

### 9.1 R8 « Pour t'entraîner » — une clause, et rien d'autre

**Édition unique et minimale, dans la phrase d'ouverture (`lesson.md:593`)**, qui énumère
aujourd'hui les outils que le sujet 2019 enchaîne (« *le théorème de Bézout (chapitre 5), les
congruences et leurs puissances (chapitre 3), le lemme d'Euclide … (chapitre 7)* ») :
ajouter, entre parenthèses, que **la numération n'y intervient pas — un sujet ne mobilise jamais
tout le chapitre**. C'est **vérifiable** contre `bk-2019-n-x3`, ça **inocule** l'élève contre le
« j'ai appris ça pour rien », et ça **n'affirme rien** sur la fréquence d'examen de la
numération — ce que nous n'avons pas les moyens de dire.

**Aucune autre édition de R8.** En particulier :
- **Les trois renvois de chapitre de `:593` (5, 3, 7) restent JUSTES** — ils sont tous $< 10$.
  **Zéro correction de renumérotation** (§2.2).
- **AUCUN nouveau marqueur `[[exercise:…]]`.** La case BLOQUANTE du template (§C, « le sommet
  non sourcé = notion NON FAITE ») **ne peut pas être cochée** : il n'existe **aucun sujet
  national vérifié de numération** dans `bank.yaml` (fait **c**). **Fabriquer un « sujet type
  bac » de numération serait inventer une source.** Le sommet de la notion **reste** le sujet
  2019 (`r-bac` / `r-variation`). **→ §11 Q6, qui est une demande de sources à l'owner, pas une
  tâche d'agent.**
- **Une note d'auteur** (commentaire HTML, `stripAuthoringComments` — §E du template) est ajoutée
  au bas de R8, consignant : la rung R7b existe ; aucune annale vérifiée ne l'atteste ; le
  marqueur d'exercice est **délibérément** absent ; la demande de sourcage est ouverte.
  ⚠ **Le vocabulaire de cette note doit être ajouté au lexique d'auteur gardé par `dom-truth`
  dans le même commit** s'il introduit un mot neuf.

### 9.2 La clôture de R7b — le gabarit natif de la leçon, pas un récapitulatif inventé

**La leçon n'a AUCUN « Récapitulatif express »** (fait **m** : zéro occurrence ; 4 leçons maths
sur 14 en portent un, celle-ci n'en fait pas partie). **Cette spec n'en crée pas** — inventer
ici une convention de corpus serait un acte d'auteur qui déborde la rung.

**À la place, R7b se ferme sur le gabarit que la leçon possède déjà** (`lesson.md:351`) : un
bloc « **Le piège à éviter :** » en **quatre phrases**, une par modèle, chacune formulée comme
un **geste de contrôle**, pas comme une règle :

1. *Les restes sortent des unités vers la tête — si tu as un doute, recalcule la valeur de ton
   écriture et compare-la à $N$.* (**N1**)
2. *Une suite de chiffres n'est un nombre qu'une fois la base appliquée — deux écritures ne se
   comparent jamais sans repasser par la valeur.* (**N2**)
3. *Avant de résoudre une équation sur des chiffres, écris leurs bornes : $0 \le a_i \le b-1$,
   chiffre de tête non nul, et l'intersection si deux bases sont en jeu.* (**N3**)
4. *La colonne déborde à $b$, jamais à dix — et avant d'écrire un critère, redemande-toi si la
   base est congrue à $+1$ ou à $-1$.* (**N4** + la famille réutilisée)

---

## 10. Ce qu'il ne faut PAS faire

1. **Ne renuméroter aucune rung.** `## R7b`, suffixe lettré, exactement comme R6b
   (`lesson.md:613-616`). R0…R8 gardent leurs codes.
2. **Ne toucher à aucun chapitre existant**, sauf la clause unique de §9.1. En particulier : **ne
   pas « améliorer » le critère par 9 de R2** (`lesson.md:141-157`) pour le généraliser — c'est
   précisément ce que R7b fait, et le dédoubler affaiblirait les deux.
3. **Mettre à jour le garde-fou de périmètre de `checkpoints.yaml:52-55`** en y ajoutant
   « systèmes de numération (écriture en base, opérations, comparaison, critères par $b-1$ et
   $b+1$) ». **C'est une édition obligatoire** : sans elle, les trois points d'arrêt neufs
   contredisent l'en-tête de leur propre fichier.
4. **Relancer `node scripts/carte-chapitres.mjs --porte`, LIRE le rouge, puis `--sceller`.** Le
   rouge est attendu (insertion de titre) ; il nommera le premier chapitre déplacé. **Ne pas
   sceller avant d'avoir lu la liste de renvois qu'il imprime** — même si la prévision du §2.2
   est « zéro », c'est l'instrument qui le dit, pas cette spec.
5. **Ne pas éditer `coverage_summary` à la main** : il est **généré** (`items.yaml:2621`). Le
   régénérer et lire la sortie.
6. **Ne re-taguer, ne renuméroter, ne déplacer aucun item existant.** Neuf familles siègent
   exactement au plancher (`items.yaml:2661-2667`).
7. **Ne pas ajouter d'entrée à `bank.yaml`.** « Introuvable = absent, jamais inventé »
   (`:27-28`). Il n'y aura pas de onzième entrée tant qu'un onzième sujet vérifié n'existe pas.
8. **Ne pas ajouter de marqueur `[[exercise:…]]`** (§9.1).
9. **Ne pas corriger les notes de portée périmées signalées ailleurs** — en particulier
   `lesson.md:623-627` (« *content/maths/arithmetique/lesson.md:593-594 cite « maths-sm.yaml:277-281 »
   … références devenues FAUSSES* », dette signalée par le cadre lui-même). **Hors périmètre ;
   à router, pas à absorber.**
10. **Ne pas trancher la porte de cadre.** Si la relecture Gemini infirme les trois capacités,
    c'est cette rung entière qui tombe — **research-lead**, pas content-author.

---

## 11. Questions au propriétaire — avec le défaut pris en l'absence de réponse

| # | question | défaut si pas de réponse |
|---|---|---|
| **Q1** | **La convention d'écriture.** (a) $\overline{abc}_{(b)}$ (indice entre parenthèses) ou $\overline{abc}^{\,(b)}$ (exposant), lequel les manuels et les sujets marocains emploient-ils ? (b) Pour $b > 10$, les chiffres $\ge 10$ s'écrivent-ils en **lettres** (A = 10, B = 11…) ou entre parenthèses ($\overline{(10)}$) ? | **(a) $\overline{abc}_{(b)}$**, retenu ici, appliqué **identiquement** dans `lesson.md`, `items.yaml` et `checkpoints.yaml`. **(b) NON TRANCHÉ, et par conséquent AUCUNE base > 10 dans un exemple calculé** (§3.2-2). *Je ne prétends pas connaître la convention des examinateurs marocains : la retenir sans la vérifier serait enseigner une notation inventée.* |
| **Q2** | **La capacité 2.1.6 s'étend-elle aux « algorithmes » en base 2** (conversions binaire ↔ hexadécimal, complément à deux, représentation machine) ? | **Non.** La base 2 n'apparaît que comme une base parmi d'autres. Le cadre exclut déjà les corps finis et la cryptographie formelle ; rien n'y autorise un volet informatique. **À confirmer** : c'est la seule zone où un manuel marocain pourrait aller plus loin que le cadre. |
| **Q3** | **Découper N3 et N4 ?** N3 réunit la borne haute ($a_i \le b-1$) et le chiffre de tête non nul ; N4 réunit le seuil resté à 10 et la retenue non reportée. | **Un modèle chacun, deux manifestations** — précédent du fichier : `reste-non-normalise` en réunit quatre (`items.yaml:60-69`), `congruence-lineaire-mal-resolue` trois (`:201-218`). Les découper doublerait la livraison (≥3 items chacun). |
| **Q4** | **Élargir `critere-divisibilite-mal-applique` à la base générique**, ou créer `numeration-critere-b-plus-un` ? | **Élargir** (§4.5) : une ligne de `description` et une de `contradicts_principle`, **aucun re-tagage**. Si l'owner veut la famille séparée, ce sont AR-53/54/55 qui basculent — le plancher est déjà atteint des deux côtés. |
| **Q5** | **Le placement : R7b (chapitre 10) ou R2b (chapitre 4) ?** | **R7b.** Quatre raisons pédagogiques au §2.3 ; le coût — 0 renvoi contre 85 — confirme sans décider. **Si l'owner préfère R2b, le travail de relecture des 85 renvois fait partie de la livraison et doit être chiffré comme tel.** |
| **Q6** | **DEMANDE DE SOURCES, pas une question d'arbitrage.** Existe-t-il un sujet national SM vérifiable portant sur une écriture en base ? (Les dix annales du dépôt n'en contiennent aucun.) | **Sans source, la rung ne porte AUCUN sommet attempt-first** (§9.1). Les formes E7 et E8 sont ma reconstruction de l'idiome SM — **formes attendues, non vérifiées** (§12). Une seule copie sourcée changerait le statut de la rung. |
| **Q7** | **Les deux problèmes de forme examen (E7, E8) sont-ils du bon calibre ?** E8 a quatre questions dont une de coprimalité. | **Oui, tels quels.** E7 fait travailler la contrainte, E8 la congruence, et la question d) rouvre le corollaire du chapitre 6 avec un contre-exemple né du problème lui-même. Ordre de coupe au §7.4. |
| **Q8** | **Trois points d'arrêt dans une seule rung** (la leçon en a six pour dix chapitres) : trop ? | **Non — un par capacité.** Si c'est trop, couper `cp-r7b-critere` en premier (le critère est aussi couvert par AR-53/54/55) ; **`cp-r7b-predict-ecriture` n'est pas coupable** : sans lui, la rung n'a pas d'engagement et la case *predict-commit-confront* échoue. |
| **Q9** | **Le manipulable « curseur de base »** (§6.2) : à construire, à embarquer, ou à laisser en dette ? | **Dette déclarée, emplacement d'amélioration en commentaire.** La rung tient sans lui. *Mais c'est, à mon jugement d'enseignement, le média qui rendrait le plus pour l'euro dépensé sur cette notion : N2 est un modèle qu'on casse en manipulant, pas en lisant.* |

---

## 12. Ce que je n'ai pas pu vérifier — dit, pas maquillé

- **Aucune commande n'a été exécutée.** Tous les chiffres du §0 viennent de lectures et de
  `Grep` ; les commandes en regard **reproduisent**, elles n'attestent pas. **Aucune porte du
  dépôt n'a été lancée sur cette proposition** — ni `carte-chapitres`, ni `resume-couverture`,
  ni `validate-content`, ni `dom-truth`.
- **La fondation de cadre n'a pas passé sa porte de couverture.** Les trois capacités de
  numération ont été **ajoutées au fichier le 2026-09-27** et le fichier lui-même demande
  qu'on les vérifie contre le cadre scanné (`maths-sm.yaml:628`). **C'est le risque numéro un
  de ce document**, et il est en tête, pas ici.
- **Aucune annale n'atteste le sujet.** Les formes E7 et E8 sont **des formes ATTENDUES, pas des
  formes VÉRIFIÉES** : ma reconstruction de l'idiome des sujets SM (« *on écrit
  $N = \overline{abc}_{(b)}$ … montrer que …* », conversion de base, critères lus sur les
  chiffres, détermination de chiffres sous contraintes). **Elles ne doivent jamais être
  présentées à l'élève comme « un sujet de bac ».** Le champ `sourcing.status` de tout ce qui
  en sortirait ne peut pas valoir `sourced`.
- **Le poids d'examen de la numération est INCONNU.** « Trois capacités sur neuf » est un compte
  de capacités ; le cadre dit lui-même que le partage interne du bloc de 15 % est `derived`
  (`maths-sm.yaml:303`). **La prose commandée ici ne fait aucune affirmation de fréquence.**
- **Je n'ai pas mesuré ce que les 40 items existants encodent réellement.** Les deltas du §8.0
  supposent que le compteur généré compte comme il dit ; **c'est à la régénération de le dire,
  pas à moi.**
- **Je n'ai pas vérifié le rendu.** Les écritures $\overline{\cdots}_{(b)}$ sont fréquentes et
  longues ; **rien ne prouve ici qu'elles ne débordent pas** sur petit écran (le mode de défaut
  d'ADR 0040 : « un correctif prouvé sûr sur 15 700 paragraphes a fait passer le corpus de 0 à
  185 débords »). **À mesurer après écriture, pas à supposer.**
- **Le plancher de 3 est un plancher de CONSTRUCTION, pas une preuve de diagnostic.** Trois
  items par modèle rendent le compte exhibé *porteur de confiance* ; ils ne prouvent pas que le
  modèle est le bon. **Les quatre modèles neufs du §4 sont ma lecture didactique, adossée à
  zéro donnée d'usage et à zéro copie d'élève marocain.** C'est l'expérience d'enseignement du
  propriétaire qui tranche ça, et elle n'est pas remplaçable.
