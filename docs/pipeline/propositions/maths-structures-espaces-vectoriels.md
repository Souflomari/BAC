# spec — les espaces vectoriels (Maths · `structures-algebriques`, **R8 = chapitre 11**)

**Statut : PROPOSITION, écrite le 2026-09-28 par pedagogy-architect. Rien n'a été construit.**
Aucun fichier de la notion n'a été touché — ni `lesson.md`, ni `items.yaml`, ni `checkpoints.yaml`,
ni `bank.yaml`, ni `exercises.yaml`, ni `media/`. Aucun fichier du cadre non plus. Le seul fichier
écrit par cette session est le présent document.

> ⚠ **AVERTISSEMENT D'INSTRUMENT, en tête.** Aucune commande shell n'a été exécutée. **Tous les
> faits chiffrés du §1 ont été relevés par lecture directe et par l'outil `Grep` ; la commande
> donnée en regard est celle qui les REPRODUIT, elle n'a pas été lancée ici.** Aucun nombre n'est
> attribué à une sortie que je n'ai pas lue. Ce que je n'ai pas pu vérifier est au §16.

> ⚠ **AVERTISSEMENT DE FONDATION.** La ligne de cadre qui commande ce chapitre
> (`maths-sm.yaml:293`) porte `source: research-consensus` et le fichier lui-même se dit
> « **STATUT : PROPOSITION — NON AUTORITATIVE** » (`:12`), le PDF officiel étant un scan sans
> couche texte (`:44-45`). Le cadre nomme d'ailleurs sa propre réserve : « *Inclusion des espaces
> vectoriels au cadre SM … à confirmer contre le cadre scanné* » (`:718`). **Ce qui sauve cette
> spec, c'est l'attestation d'examen, pas le cadre** : deux sujets nationaux vérifiés posent la
> question (§3). Le risque résiduel est nommé au §15 Q1, pas enterré.

**Ce que ce document est.** Le cadrage d'**un sous-domaine entier absent** — le plus gros trou de
cadre restant en maths avec la numération : `espaces_vectoriels` a `lesson_slug: null`, l'audit le
classe **ABSENT** (aucun chapitre, aucun item), et un sujet national **vérifié** s'en sert.

**Ce que ce document n'est pas.** Il n'écrit ni la prose (content-author), ni les items finaux
(item-author), ni le YAML livré. Il ne modifie pas le cadre et ne tranche aucune de ses portes.

---

## 1. Le trou, mesuré — chaque fait avec ce qui le reproduit

| # | le fait | la citation / la commande qui le reproduit |
|---|---|---|
| **a** | **Le cadre nomme un chapitre entier, sans leçon.** `id: espaces_vectoriels`, `lesson_slug: null`, commentaire « *LACUNE : la leçon structures-algebriques ne couvre PAS les e.v.* » | `docs/cadre/curriculum/maths-sm.yaml:289-298` |
| **b** | **Le cadre le redit dans ses `coverage_notes`, au niveau le plus haut d'alarme.** « *La leçon structures-algebriques (R1-R6) s'arrête aux groupes/anneaux/corps — les ESPACES VECTORIELS, pourtant au cadre SM, n'ont PAS de leçon. **LACUNE PRIORITAIRE**.* » | `maths-sm.yaml:451-453` |
| **c** | **L'audit de couverture le classe ABSENT et propose déjà la forme du correctif.** « *Fix : un chapitre R8 (sous-espace par le critère, famille libre ou génératrice, base et dimension …) et au moins 3 items.* » | `docs/audits/cadre-couverture.md:74-86` |
| **d** | **Le registre de dette le porte en G2.** « *espaces vectoriels … ; noyau et image d'un morphisme ; items sous-groupe et anneau intègre — spec à écrire (un sous-domaine entier)* » | `docs/audits/DETTE-CADRE.md:42` (et `:20-21`) |
| **e** | **Zéro enseignement dans tout `content/maths`.** « espace vectoriel », « sous-espace », « famille libre », « famille génératrice », « combinaison linéaire », « dimension » → **aucune occurrence d'enseignement**. Les seules occurrences du mot « vectoriel » dans les leçons de maths sont le **produit vectoriel** de `geometrie-espace` (autre sens) et « colinéaires » dans les complexes. | `grep -rniE 'espace vectoriel\|sous-espace\|famille (libre\|génératrice)' content/maths/*/lesson.md` ⇒ 0 |
| **f** | **La leçon porte 10 titres `## `, donc 10 chapitres**, dans cet ordre : R0 (1), R1 (2), R2 (3), R3 (4), *Sous-groupe* (5), R4 (6), R5 (7), *Anneau intègre* (8), R6 (9), R7 (10). **Deux titres sans code de barreau** décalent les rungs — c'est écrit et vérifié dans `chapters.ts` : « *structures-algebriques 10 headings / 8 rungs (plain at ch5, ch8)* ». **Contre-vérifié sur le texte** : « *un homomorphisme (chapitre 10)* » = R7 ✓ (`bank.yaml:660`) · « *un anneau … (chapitre 7)* » = R5 ✓ (`bank.yaml:660`) · « *le chapitre 9 ajoute deux exigences à la définition de l'anneau pour obtenir un corps* » = R6 ✓ (`lesson.md:693`) · « *reconnaître une LCI (chapitre 2), tester ses propriétés (chapitre 3) … (chapitres 4 à 9)* » ✓ (`lesson.md:565`) · « *la table du chapitre 2* » = R1 ✓ (`lesson.md:273`) · « *le chapitre 8 « Anneau intègre »* » ✓ (`bank.yaml:1454`). | `grep -c '^## ' content/maths/structures-algebriques/lesson.md` ⇒ **10** ; `web/src/lib/chapters.ts:6-28` |
| **g** | **AUCUNE ligne du dépôt ne cite « chapitre 11 » de cette notion.** Dans `content/maths/structures-algebriques/`, le motif `[Cc]hapitres? 11\b` rend **0**. (Les 31 occurrences de « chapitre 11 » du dépôt visent `pc/reactions-acido-basiques`, `pc/chute-mouvements-plans`, et deux documents d'audit.) **C'est le fait qui décide du §4.** | `grep -rnoE '[Cc]hapitres? 11\b' content/maths/structures-algebriques/` ⇒ **0** |
| **h** | **Aucune autre notion ne cite un chapitre de celle-ci.** La forme croisée « chapitre N de « Titre » » ne rend **rien** pour cette leçon dans tout le dépôt. | `grep -rn 'chapitre [0-9]\+ de « [^»]*[Ss]tructures' .` ⇒ **0** |
| **i** | **Coût d'une insertion ailleurs, chiffré.** `[Cc]hapitres? 10\b` dans la notion ⇒ **34** occurrences (bank 25, items 5, exercises 1, lesson 1, REVIEW 2). `[Cc]hapitres? (6\|7\|8\|9\|10)\b` ⇒ **97** (bank 47, items 32, lesson 13, exercises 1, checkpoints 1, REVIEW 3). | `grep -rcoE …` sur le dossier de la notion |
| **j** | **35 items, 9 modèles d'erreur, tous au-dessus du plancher 3.** `total_items: 35`, `floor: 3`, `floor_met: true` ; dernier id = **SA-35** ; `ramp_coverage` va de R0 à R7. | `items.yaml:2255-2339` |
| **k** | **Le champ `habilete` n'existe que sur les 8 items les plus récents** (SA-27…SA-34, la « famille transport ») et sur les checkpoints. Les items neufs en portent un — précédent posé par la vague B2. | `grep -n 'habilete:' items.yaml` ⇒ SA-27, -28, -29, -30, -31, -32, -33, -34 |
| **l** | **La leçon n'a NI « Pour t'entraîner » NI récapitulatif.** Zéro occurrence de `Pour t'entraîner`, `Récapitulatif`, `Ce qu'il faut retenir`, `En résumé` dans `lesson.md` (la chaîne « retenir » n'y apparaît qu'en prose courante, `:340`). Elle n'a pas non plus de `retenir.json`. **Cette spec n'en crée pas** (§12). | `grep -c "Pour t'entraîner\|Récapitulatif\|En résumé" lesson.md` ⇒ **0** ; `ls content/maths/structures-algebriques/` ⇒ pas de `retenir.json` |
| **m** | **La banque le demandait explicitement depuis le 2026-08-06.** « *à l'attention du pedagogy-architect si un pont explicite avec le chapitre « espaces vectoriels » est jugé utile* » ; et, sur `bk-2023-n-x5` q2 : « *mobilise la notion d'ESPACE VECTORIEL, qui n'appartient PAS à ce chapitre … C'est le rappel de tête d'énoncé du sujet lui-même qui introduit « (M₂(ℝ),+,·) est un espace vectoriel réel », signe que la notion est supposée acquise d'un chapitre antérieur du cursus* ». **Ce document est la réponse à cette demande.** | `bank.yaml:164-175` ; `:1448-1449` |

**Le constat en une phrase :** *le cadre nomme un chapitre, deux sujets nationaux vérifiés le
posent, l'auteur de la banque a signalé le trou il y a sept semaines — et le corpus n'enseigne
toujours pas une ligne d'algèbre linéaire.*

---

## 2. Le cadre — lu avant d'écrire, avec ses réserves

- **Filière / matière.** Sciences Mathématiques (SM-A et SM-B, même cadre maths), coef **9**,
  épreuve **4 h** (`maths-sm.yaml:50-56`). Chapitre **spécifique SM** : le cadre SExp l'exclut
  nommément (« *Structures algébriques (… espaces vectoriels) : **SPÉCIFIQUE SM**. Absent du cadre
  SExp.* », `maths-sexp.yaml:342`, et `:252`). **Aucun arbitrage de filière à faire.**
- **Sous-domaine, et son poids — sans le raffiner.** `structures_algebriques`, nommé
  « **Structures algébriques et espaces vectoriels** », `poids: { part_examen_bloc: 35, note:
  "bloc « Complexes + Structures » ≈ 35 % ; **partage interne dérivé**" }` (`maths-sm.yaml:269-270`).
  ⚠ **Piège à ne pas reproduire dans la prose** : 35 % est le poids d'un **bloc de deux
  sous-domaines**, pas celui des structures, et encore moins celui des espaces vectoriels. **Aucune
  ligne commandée ici n'affirme une fréquence ni un poids d'examen.** Le seul chiffre honnête est
  un barème relevé (§3).
- **Habiletés — la cible chiffrée de l'item-author** (`maths-sm.yaml:58-61`) :
  **application_directe 40 / application_non_explicite 40 / synthese 20**. Le §11 tombe sur
  **7 / 7 / 4 sur 18 items = 38,9 / 38,9 / 22,2**.
- **Le `programme`, mot pour mot** (`:293`) :
  > « **Espace vectoriel réel ; sous-espace vectoriel ; combinaison linéaire ; famille génératrice,
  > famille libre, base ; dimension (en dimension finie) ; applications linéaires.** »
- **Les `savoir_faire`, mot pour mot** (`:295-296`) :
  > « **Démontrer qu'un ensemble est un sous-espace vectoriel ; déterminer une base et la
  > dimension.** »
  > « **Étudier la liberté/génération d'une famille ; reconnaître une application linéaire (noyau,
  > image).** »

  **C'est exactement, et seulement, ce que cette spec sert.** Les quatre verbes se lisent
  directement comme les quatre blocs de la rampe (§6).
- **`limites` du chapitre, portées en dur** (`:298`) — **non négociables pour les deux auteurs** :
  1. « *Espaces vectoriels de **dimension finie*** » → **rien sur la dimension infinie**, aucun
     espace de suites, aucune base infinie, aucune allusion à « une base existe toujours ».
  2. « *pas de **réduction d'endomorphismes** (valeurs propres/diagonalisation — hors 2e Bac)* »
     → **interdit** : valeur propre, vecteur propre, polynôme caractéristique, diagonalisation,
     trace/déterminant présentés comme des invariants d'endomorphisme.
  3. « *pas de **produit scalaire euclidien abstrait*** » → **interdit** : orthogonalité,
     norme, base orthonormée, projection orthogonale **dans un espace vectoriel abstrait**. (Le
     produit scalaire de `geometrie-espace` reste ce qu'il est : de la géométrie analytique, pas
     une structure abstraite. Aucun pont ne doit être construit vers lui.)
- **`exclusions_transversales` applicables** (`maths-sm.yaml:431-432`) : « *Réduction
  d'endomorphismes … **les espaces vectoriels s'arrêtent aux bases/dimension/applications
  linéaires*** » et « *Théorie de Galois, corps finis au-delà de ℤ/nℤ* ». La première **redit** la
  limite 2 et **borne la ligne d'arrivée du chapitre** : bases, dimension, applications linéaires.
  **On s'y arrête.**
- **Ce que le cadre ne dit PAS, et que je ne comble pas :** il ne nomme **aucun espace de
  référence** (ni ℝⁿ, ni M₂(ℝ), ni les polynômes), **ne nomme pas le théorème du rang**, **ne nomme
  pas la matrice d'une application linéaire**, **ne nomme ni somme ni somme directe de
  sous-espaces**. → §15 Q3, Q4, Q6 ; par défaut : **exclus**.

---

## 3. La forme d'examen — ce que la banque ATTESTE, et ce que j'infère

**C'est la section qui décide des poids de la rampe.** Le corpus a été balayé dans les deux
dépôts de vérité : `content/maths/*/bank.yaml` (annales converties) et `docs/sujets/maths/`
(transcriptions vérifiées, converties ou non).

### 3.1 Tout ce qui, dans le dépôt, emploie le vocabulaire de l'algèbre linéaire

| où | quoi | statut |
|---|---|---|
| `structures-algebriques/bank.yaml:1461` (intro de `bk-2023-n-x5`) | « *On rappelle que … $(M_2(\mathbb{R}), +, \cdot)$ est un espace vectoriel réel* » | **attesté** — 2023 N Ex5, sourcing `vérifié`, re-fetch + diff caractère par caractère |
| `structures-algebriques/bank.yaml:1468` | intitulé de partie : « *Partie I — $E$ : sous-groupe additif et sous-espace vectoriel* » | **attesté** |
| `structures-algebriques/bank.yaml:1486-1501` (**`bk-2023-n-x5` q2**) | « **(0,25 pt) Montrer que $E$ est un sous-espace vectoriel de $(M_2(\mathbb{R}), +, \cdot)$** », avec $E=\{M(x,y)=\left(\begin{smallmatrix}x+y&y\\2y&x-y\end{smallmatrix}\right)\}$ ; la q1 juste avant demande le **sous-groupe** de $(M_2(\mathbb{R}),+)$ | **attesté** — *la pièce maîtresse* |
| `structures-algebriques/bank.yaml:2063` (intro de `bk-2025-n-x4`) | « *… et que $(M_3(\mathbb{R}),+,\cdot)$ est un espace vectoriel réel* » — **rappel d'énoncé seul, aucune question d'algèbre linéaire dans l'exercice** | **attesté (rappel)** |
| `docs/sujets/maths/structures-algebriques.md:249-257` (**2018 N Ex1**) | « *(0,25) **Montrer que $E$ est un sous-espace vectoriel** de l'espace vectoriel $(M_2(\mathbb{R}),+,\cdot)$* » puis « *(0,5) On pose $J = M(0,1)$. **Montrer que $(I,J)$ est une base** de l'espace vectoriel réel $(E,+,\cdot)$* », avec $M(x,y)=\left(\begin{smallmatrix}x&-2y\\y&x+2y\end{smallmatrix}\right)$ | **attesté, MAIS non converti** — source **retypée**, et la fiche le dit : « ⚠ *Source retypée non-officielle — **conversion en banque soumise à arbitrage owner*** » (`:240`). → §15 Q2 |
| `geometrie-espace/bank.yaml` (25 occurrences) | « **produit vectoriel** » | **hors sujet** — autre sens du mot, géométrie analytique |
| `nombres-complexes-1/bank.yaml`, `nombres-complexes-2/bank.yaml` | « colinéaires », « système non linéaire » | **hors sujet** |
| `calcul-integral`, `fonction-exponentielle`, `fonction-logarithme`, `equations-differentielles` | « (terme) linéaire », « constantes libres », « ligne de base », « base d'adjudication » | **hors sujet** — homonymies, relevées puis écartées une par une |

### 3.2 Ce que la forme d'examen ATTESTE (et qui pilote la rampe)

1. **L'énoncé OFFRE l'espace ambiant.** Trois sujets sur les huit transcrits ouvrent par « *on
   rappelle que $(M_n(\mathbb{R}),+,\cdot)$ est un espace vectoriel réel* ». **Le candidat ne
   démontre jamais qu'un ensemble est un espace vectoriel** — il démontre qu'une partie en est un
   **sous-espace**. *Conséquence de conception : les huit axiomes se lisent une fois, ne se
   vérifient jamais ; la rampe n'a pas un seul exercice « montrer que $(E,+,\cdot)$ est un espace
   vectoriel ».*
2. **L'objet est toujours le même.** $E = \{M(a,b)\ /\ (a,b)\in\mathbb{R}^2\}$, une famille de
   matrices à **deux paramètres réels**, sous-ensemble de $M_2(\mathbb{R})$ (ou $M_3$).
3. **L'ordre est toujours le même, et l'algèbre linéaire OUVRE l'exercice** : sous-groupe additif
   → **sous-espace** → (2018) **base** → partie stable pour $\times$ → anneau → corps /
   isomorphisme. **Attesté deux fois** (2018 q1-q2, 2023 q1-q2), sur deux $E$ différents.
4. **Le barème est petit, la place est fixe.** 0,25 pt (sous-espace) et 0,5 pt (base) sur les
   **3,5 pts** de l'exercice de structures : **7,1 %** en 2023, **21,4 %** en 2018. C'est peu — et
   c'est **du point gratuit en début d'exercice**, ce qui est exactement l'argument à donner à
   l'élève.
5. **La question suivante s'appuie sur la précédente.** Le `reasoning` de q2 réutilise « *$E$ non
   vide (il contient $O$, question précédente), stable pour $+$ (déjà établi)* » : **seule la loi
   externe reste à traiter.** C'est la forme réelle de la question, et c'est aussi la source de la
   misconception n°2 (§8).

### 3.3 Ce que j'INFÈRE — et que rien, dans ce dépôt, n'atteste

- **« Déterminer la dimension » posé comme question** : **jamais attesté.** Le mot « dimension »
  n'apparaît dans **aucune** transcription de sujet de maths (`grep -rn 'dimension'
  docs/sujets/maths/` ⇒ **0** ; les occurrences de `docs/sujets/` sont toutes en PC). 2018 demande
  **la base** ; la dimension en découle, mais l'énoncé ne la nomme pas.
- **« Famille libre / famille génératrice » posées comme questions** : **jamais attestées.** Ce
  sont, dans les sujets vus, **les outils de la question « base »**, jamais son objet.
- **« Application linéaire », « noyau », « image »** dans un sujet de structures : **jamais
  attestés.** Tous les morphismes de la banque sont des morphismes **de groupes ou d'anneaux**
  (chapitre 10), jamais des applications linéaires.
- **Un exercice entier d'algèbre linéaire** (sans groupe ni anneau autour) : **jamais attesté.**

**Ce que j'en fais — décision de conception, à valider (§15 Q2) :** la rampe **pèse** dans cet
ordre : (1) **sous-espace par le critère** — le geste attesté, celui qui rapporte ; (2) **base et
dimension** — attesté une fois, et c'est le savoir-faire nommé par le cadre ; (3) **libre /
génératrice** — enseignées **comme les deux moitiés de la preuve d'une base**, pas comme un sujet
autonome ; (4) **application linéaire, noyau, image** — bloc de clôture, commandé par le cadre
(`:296`) et par la lacune `:285`, **sans prétendre à une fréquence d'examen**.

---

## 4. Placement — la décision, et son coût mesuré

### 4.1 Le verdict

> **Un nouveau chapitre `## R8 — Espaces vectoriels : sous-espace, base, dimension`, ajouté À LA
> FIN de `content/maths/structures-algebriques/lesson.md`. R8 = chapitre 11 sur 11.**
> **Aucun chapitre existant n'est renuméroté. Aucun renvoi n'est à réécrire.**
> **Pas de nouveau slug dans `web/src/lib/curriculum.ts`.**

### 4.2 Les quatre options, et ce que chacune coûte

| option | où | renvois à relire | autres coûts |
|---|---|---|---|
| **(a) nouvelle notion** — slug `espaces-vectoriels` dans `curriculum.ts` | unité « Approfondissement (Sciences Mathématiques) », après `structures-algebriques` (`curriculum.ts:128-134`) | 0 | **15 fichiers de `web/` nomment cette notion**, dont **7 sceaux `.base.json`** (`carte-chapitres`, `eleve-ruse`, `indice-longueur`, `indice-absolu`, `indice-refus`, `rampe-bac`, `couverture-diagnostique`) à re-baseliner ; une `lesson.md` neuve avec sa propre accroche ; un `skill_code` neuf **sans aucun historique** dans `learner-model-data.json` ; **et une banque impossible à constituer** (voir ci-dessous) |
| **(b) au milieu, après « Sous-groupe »** (nouveau chapitre 6) | **97** occurrences `chapitre 6..10` (bank 47, items 32, lesson 13, exercises 1, checkpoints 1, REVIEW 3 — dont **94 vues par la porte**, qui ignore les fichiers `REVIEW-*`) | toutes à +1 | casse l'escalier groupe → anneau → corps au milieu |
| **(c) juste avant R7** (nouveau chapitre 10, R7 → 11) | **34** occurrences `chapitre 10` (bank 25, items 5, exercises 1, lesson 1, REVIEW 2) | toutes à réécrire en « 11 » | garde l'exercice bac en dernier |
| **(d) à la fin — RETENUE** | **0** — aucune ligne du dépôt ne cite « chapitre 11 » de cette notion, et aucune autre notion ne cite un chapitre de celle-ci | — | la porte `carte-chapitres` rougit **une fois**, avec la liste de renvois **vide** |

**Ce que la porte dira, exactement.** `carte-chapitres.mjs --porte` compare la liste ORDONNÉE des
titres `## ` au sceau. Passer de 10 à 11 titres la fait rougir :
`structures-algebriques — 10 → 11 chapitres ; le premier déplacé est le chapitre 11, maintenant
« Espaces vectoriels : … »`, suivi de `aucun renvoi numéroté à partir de ce chapitre : relire, puis
sceller.` (branche `r.length === 0`, `carte-chapitres.mjs:149`). **C'est un rouge attendu, pas une
régression** : il se solde par `node scripts/carte-chapitres.mjs --sceller` **après** relecture.
*Un rouge dont on connaît d'avance le texte reste un rouge : il doit être lu, pas anticipé de
confiance.*

### 4.3 Pourquoi (d) est aussi le meilleur choix PÉDAGOGIQUE — l'argument, pas le coût

1. **L'examen ne sépare jamais les deux mondes.** En 2018 comme en 2023, le sous-espace et la base
   sont **les questions 1-2 du même exercice**, posées **sur le même $E$** que l'anneau et le corps
   qui suivent. Une notion séparée obligerait l'élève à porter le même $E$ d'une leçon à l'autre —
   et rendrait `bk-2023-n-x5` **inconvertible** : on ne coupe pas un exercice de bac en deux
   banques, et le dupliquer trahirait la règle du dépôt (une annale, une entrée).
2. **Le cadre lui-même les met sous un seul toit.** Le sous-domaine s'appelle « **Structures
   algébriques et espaces vectoriels** » et porte **deux** chapitres. Une leçon, deux chapitres :
   la carte du produit colle alors exactement à la carte du cadre.
3. **Le prérequis décisif est interne à la leçon.** Le critère du sous-espace **est** le critère du
   sous-groupe du chapitre 5, moins une condition (§6.2). Le chapitre s'ouvre sur un rappel qui
   existe **dans cette leçon, avec ses matrices et son vocabulaire** — pas dans une leçon voisine.
4. **L'escalier reste intact.** Le fil groupe → groupe commutatif → anneau → intègre → corps →
   isomorphisme est l'épine dorsale de la leçon. Les espaces vectoriels sont un **autre axe** (une
   seconde loi dont le second opérande n'appartient même pas à l'ensemble). L'insérer au milieu
   (option b) couperait l'escalier au moment où il monte ; le poser **après** l'ouvre proprement
   comme *« la seconde structure que l'examen accroche à la première »*.
5. **L'objection — « le chapitre bac n'est plus le dernier » — se traite dans la prose, pas dans le
   sommaire.** Le chapitre 10 garde son exercice bac et sa variation. Le chapitre 11 **ouvre** en
   disant d'où il vient (« *la question que l'énoncé pose AVANT celle que tu viens de traiter* ») et
   **ferme** sur la chaîne complète de l'examen, avec renvoi à l'annale `bk-2023-n-x5` déjà en
   banque. **L'ordre du sommaire n'est pas l'ordre de l'énoncé, et le dire est une leçon en soi.**

*Décision de NE PAS faire, écrite à côté de ce qui est fait :* **on ne renumérote pas** pour faire
coïncider l'ordre de la leçon et l'ordre de l'énoncé. Le gain serait cosmétique ; le coût est 34 ou
97 renvois relus à la main, et la dernière semaine du dépôt a déjà payé quatre fois cette facture
(`carte-chapitres.mjs:5-14` : « *dix-sept renvois rendus à l'élève pointaient un chapitre trop
tôt* »).

---

## 5. Place dans la chaîne des prérequis

**En amont, dans la même leçon** (tout est déjà enseigné) :
- **chapitre 2** — loi de composition interne, **stabilité** : le geste « je combine deux éléments
  de la forme donnée et je regarde si le résultat garde la forme ». C'est *le* geste du chapitre.
- **chapitre 4** — les quatre axiomes du groupe ; **chapitre 6** — groupe commutatif.
- **chapitre 5** — **le critère du sous-groupe** (`lesson.md:303-307`) et son exemple matriciel
  $F=\{M(a,b)=\left(\begin{smallmatrix}a&-b\\b&a\end{smallmatrix}\right), (a,b)\in\mathbb{Z}^2\}$
  (`:315`). **C'est la marche d'appui du chapitre 11**, et l'accroche s'y branche directement.
- **chapitre 10** — morphisme, isomorphisme, transport de structure : prérequis du **seul dernier
  bloc** (noyau et image).

**En amont, hors leçon :** le calcul matriciel $2\times2$ (somme, produit par un réel). **Trou
réel, à nommer honnêtement :** *aucune leçon du dépôt n'enseigne les matrices* — elles arrivent par
les rappels de tête d'énoncé et par les exemples du chapitre 5. Le chapitre 11 **ne comble pas ce
trou** ; il fait comme l'examen, qui donne la matrice et demande le calcul. → §15 Q5.

**En aval :** rien. C'est le dernier chapitre de la dernière notion d'approfondissement SM.

---

## 6. La rampe — l'ordre des exemples, et TOUS les calculs, faits et revérifiés ici

**Règle de fabrication.** Chaque objet ci-dessous a été choisi **original** : aucun n'est repris
d'un `bank.yaml` (2023 : $\left(\begin{smallmatrix}x+y&y\\2y&x-y\end{smallmatrix}\right)$ · 2022 :
$\left(\begin{smallmatrix}a&3b\\b&a\end{smallmatrix}\right)$ · 2019 :
$\left(\begin{smallmatrix}x&y\\0&x\end{smallmatrix}\right)$ · 2020 :
$\left(\begin{smallmatrix}1&x\\0&y\end{smallmatrix}\right)$ · 2018 :
$\left(\begin{smallmatrix}x&-2y\\y&x+2y\end{smallmatrix}\right)$ · 2017 et 2025 : $3\times3$), ni
des exemples déjà travaillés dans `lesson.md` (chapitre 5 :
$\left(\begin{smallmatrix}a&-b\\b&a\end{smallmatrix}\right)$ sur $\mathbb{Z}$ · chapitre 10 :
$\left(\begin{smallmatrix}x&-y\\y&x\end{smallmatrix}\right)$). **Chaque calcul a été mené deux fois,
la seconde en repartant de l'écriture développée.**

### 6.0 Accroche et **premier engagement** — la phrase que l'énoncé offre

L'accroche part de la seule phrase que l'élève a déjà lue trois fois sans la comprendre : « *on
rappelle que $(M_2(\mathbb{R}),+,\cdot)$ est un espace vectoriel réel* ». Que paie cette phrase ?
Deux opérations de **natures différentes** : additionner deux matrices (deux objets du même
ensemble), et **multiplier une matrice par un réel** — un nombre qui n'appartient pas, lui, à
l'ensemble. *C'est toute la nouveauté du chapitre : une seconde loi dont le second opérande vient
d'ailleurs.*

**[C1] — le pari d'accroche** (`[[checkpoint:cp-r8-pari-scalaire]]`, énoncé exact au §7.1).
On reprend **l'ensemble du chapitre 5** :
$$F = \left\{ M(a,b) = \begin{pmatrix} a & -b \\ b & a \end{pmatrix}\ /\ (a,b) \in \mathbb{Z}^2 \right\},$$
dont la leçon a **déjà démontré** qu'il est un sous-groupe de $(M_2(\mathbb{R}),+)$. En est-il un
**sous-espace** ?

**Non.** $M(1,0) = \left(\begin{smallmatrix}1&0\\0&1\end{smallmatrix}\right) \in F$ (car
$a=1,\ b=0$ sont entiers), et
$$\tfrac12 \cdot M(1,0) = \begin{pmatrix} \tfrac12 & 0 \\ 0 & \tfrac12 \end{pmatrix},$$
qui serait $M(\tfrac12, 0)$ — or $\tfrac12 \notin \mathbb{Z}$. **Un seul couple suffit : $F$ n'est
pas stable pour la loi externe.** Le même ensemble est donc **sous-groupe et pas sous-espace** —
et c'est exactement la misconception n°2 qui meurt ici, avant la première définition.

### 6.1 Bloc A — l'espace vectoriel réel, énoncé une fois (et jamais vérifié)

Définition de $(E,+,\cdot)$ espace vectoriel réel : $(E,+)$ groupe commutatif (**chapitre 6**, rien
de neuf) plus une loi externe $\mathbb{R}\times E \to E$ vérifiant, pour tous
$\lambda,\mu \in \mathbb{R}$ et $u,v \in E$ :
$$\lambda\cdot(u+v) = \lambda u + \lambda v,\quad (\lambda+\mu)\cdot u = \lambda u + \mu u,\quad (\lambda\mu)\cdot u = \lambda\cdot(\mu\cdot u),\quad 1\cdot u = u.$$

**Les trois espaces de référence, et rien d'autre :** $\mathbb{R}^2$, $\mathbb{R}^3$,
$M_2(\mathbb{R})$. *L'énoncé les donne toujours ; on ne les démontre jamais.* Le dire explicitement
à l'élève est un gain de temps d'examen, pas une paresse.

**[C2] — deux conséquences qui font tout le chapitre** (deux lignes, et elles expliquent l'économie
du critère qui vient) :
$$0\cdot u = (0+0)\cdot u = 0\cdot u + 0\cdot u \;\Longrightarrow\; 0_E = 0\cdot u,$$
(on ajoute l'opposé de $0\cdot u$ aux deux membres — c'est la simplification dans le groupe
$(E,+)$), puis
$$(-1)\cdot u + u = (-1)\cdot u + 1\cdot u = (-1+1)\cdot u = 0\cdot u = 0_E \;\Longrightarrow\; (-1)\cdot u = -u.$$
**Retiens la seconde :** *l'opposé est déjà un multiple.* C'est elle qui fera tomber la troisième
condition du critère du sous-groupe.

### 6.2 Bloc B — le sous-espace, par le critère (le geste qui rapporte des points)

**Critère.** $F \subset E$ est un sous-espace vectoriel de $(E,+,\cdot)$ **si et seulement si**
1. $F \neq \varnothing$ — en pratique : **$0_E \in F$** ;
2. pour tous $u,v \in F$ et tous $\lambda,\mu \in \mathbb{R}$ : **$\lambda u + \mu v \in F$**.

**L'économie, expliquée et non assénée.** Le chapitre 5 demandait **trois** conditions (neutre,
stabilité, **symétrique**). Ici la troisième a disparu — parce qu'elle est **contenue** dans la
seconde : $-u = (-1)\cdot u$ (bloc A). *Le symétrique est gratuit dès qu'on a le droit de
multiplier par $-1$.* Conséquence à dire à voix haute : **tout sous-espace est un sous-groupe de
$(E,+)$** ; la réciproque est fausse, et l'accroche vient d'en donner le contre-exemple.

**[C3] — modèle familier : une droite du plan.** $D = \{(x,y) \in \mathbb{R}^2\ /\ y = 2x\}$.
- $(0,0) \in D$ car $2\times 0 = 0$ ✓ ;
- $u = (x,2x)$, $v = (x',2x')$, $\lambda,\mu \in \mathbb{R}$ :
$$\lambda u + \mu v = (\lambda x + \mu x',\ 2\lambda x + 2\mu x') = \big(\underbrace{\lambda x + \mu x'}_{t},\ 2(\lambda x + \mu x')\big) = (t, 2t) \in D\ ✓$$
$D$ est un sous-espace : **une droite qui passe par l'origine**.

**[C4] — premier contre-exemple : la même droite, décalée.**
$D' = \{(x,y)\ /\ y = 2x+1\}$. Test du vecteur nul : $2\times 0 + 1 = 1 \neq 0$, donc
$(0,0) \notin D'$ : **une ligne suffit à conclure**. *Corroboration (à donner, parce qu'un élève
doit voir que les deux échecs voyagent ensemble)* : $(0,1) \in D'$ et $(1,3) \in D'$, mais
$(0,1)+(1,3) = (1,4)$ et $2\times1+1 = 3 \neq 4$ : la stabilité tombe aussi.

**[C5] — deuxième contre-exemple : celui qui casse la misconception principale** (précédé du **pari
n°2**, `[[checkpoint:cp-r8-pari-stabilite]]`, §7.2).
$H = \{(x,y) \in \mathbb{R}^2\ /\ xy = 0\}$, la réunion des deux axes.
- $(0,0) \in H$ car $0\times 0 = 0$ ✓ ;
- pour tout $\lambda$ : $\lambda(x,y) = (\lambda x, \lambda y)$ et
  $(\lambda x)(\lambda y) = \lambda^2 (xy) = \lambda^2 \times 0 = 0$ ✓ — **stable pour la loi
  externe** ;
- mais $(1,0) \in H$ ($1\times 0 = 0$) et $(0,1) \in H$ ($0\times 1 = 0$), tandis que
  $(1,0)+(0,1) = (1,1)$ et $1\times 1 = 1 \neq 0$ : **$(1,1) \notin H$** ✗.

**$H$ contient le vecteur nul, résiste à toutes les multiplications par un réel, et n'est pourtant
pas un sous-espace.** *C'est ici, et nulle part ailleurs, que se brise « contenir $0$ suffit ».*

**[C6] — l'objet de l'examen, en habillage matriciel.**
$$E = \left\{ M(a,b) = \begin{pmatrix} a & a+b \\ a-b & b \end{pmatrix}\ /\ (a,b) \in \mathbb{R}^2 \right\} \subset M_2(\mathbb{R}).$$
1. $O = M(0,0) \in E$ (avec $a=b=0$, les quatre coefficients sont nuls) ✓, donc $E \neq \varnothing$ ;
2. soient $M(a,b), M(a',b') \in E$ et $\lambda,\mu \in \mathbb{R}$. Coefficient par coefficient :
$$\lambda M(a,b) + \mu M(a',b') = \begin{pmatrix} \lambda a + \mu a' & \lambda(a+b) + \mu(a'+b') \\ \lambda(a-b) + \mu(a'-b') & \lambda b + \mu b' \end{pmatrix}.$$
Pose $A = \lambda a + \mu a'$ et $B = \lambda b + \mu b'$. Alors, en regroupant :
$$\lambda(a+b)+\mu(a'+b') = (\lambda a + \mu a') + (\lambda b + \mu b') = A + B, \qquad \lambda(a-b)+\mu(a'-b') = A - B,$$
donc
$$\lambda M(a,b) + \mu M(a',b') = \begin{pmatrix} A & A+B \\ A-B & B \end{pmatrix} = M(A,B) \in E\ ✓$$
**$E$ est un sous-espace vectoriel de $(M_2(\mathbb{R}),+,\cdot)$.** *(Vérification du regroupement,
refaite en sens inverse : $A+B = \lambda a + \mu a' + \lambda b + \mu b' = \lambda(a+b) + \mu(a'+b')$
✓ ; $A-B = \lambda a + \mu a' - \lambda b - \mu b' = \lambda(a-b) + \mu(a'-b')$ ✓.)*

**[C7] — le raisonnement d'expert, dit à voix haute.** Avant d'écrire une ligne, l'expert écrit
$M(a,b)$ **comme une combinaison** :
$$M(a,b) = a\begin{pmatrix}1&1\\1&0\end{pmatrix} + b\begin{pmatrix}0&1\\-1&1\end{pmatrix}$$
*(contrôle : $a\left(\begin{smallmatrix}1&1\\1&0\end{smallmatrix}\right) =
\left(\begin{smallmatrix}a&a\\a&0\end{smallmatrix}\right)$ ;
$b\left(\begin{smallmatrix}0&1\\-1&1\end{smallmatrix}\right) =
\left(\begin{smallmatrix}0&b\\-b&b\end{smallmatrix}\right)$ ; somme :
$\left(\begin{smallmatrix}a&a+b\\a-b&b\end{smallmatrix}\right)$ ✓)* — et il **sait déjà** : $E$ est
l'ensemble des combinaisons linéaires de deux matrices fixes, c'est-à-dire $\mathrm{Vect}(A,B)$, et
**un $\mathrm{Vect}$ est toujours un sous-espace** :
$0_E = 0u_1+\dots+0u_p$, et $\lambda\big(\sum \alpha_i u_i\big) + \mu\big(\sum \beta_i u_i\big) =
\sum (\lambda\alpha_i + \mu\beta_i) u_i$.
**Mise en garde à écrire noir sur blanc :** à l'examen, la réponse qui rapporte les 0,25 pt est
**le critère rédigé** ; le raccourci $\mathrm{Vect}$ n'est légitime que s'il est rédigé comme tel
(« $E = \mathrm{Vect}(A,B)$, or tout $\mathrm{Vect}$ est un sous-espace »). *L'expert s'en sert pour
savoir où il va, pas pour écrire moins.*

### 6.3 Bloc C — combinaison linéaire, famille génératrice, famille libre

**Génératrice** : $(u_1,\dots,u_p)$ engendre $F$ si tout élément de $F$ s'écrit
$\alpha_1u_1+\dots+\alpha_pu_p$. Pour $E$ du [C6], c'est **la définition même** de $E$ : la famille
$(A,B)$ l'engendre, sans un calcul de plus.

**Libre** : $(u_1,\dots,u_p)$ est libre si **la seule** combinaison nulle est la combinaison à
coefficients tous nuls. *Le mot qui compte est « la seule ».*

**[C8] — une famille libre dans $\mathbb{R}^3$.** $v_1 = (1,0,1)$, $v_2 = (1,1,0)$, $v_3 = (0,1,1)$.
$$\alpha v_1 + \beta v_2 + \gamma v_3 = (\alpha+\beta,\ \beta+\gamma,\ \alpha+\gamma) = (0,0,0)$$
$\Rightarrow \beta = -\alpha$ (1re), puis $\gamma = -\beta = \alpha$ (2e), puis
$\alpha + \gamma = 2\alpha = 0$ (3e) $\Rightarrow \alpha = 0$, donc $\beta = 0$ et $\gamma = 0$.
**Libre** ✓. *(Contrôle indépendant, en résolvant la génération : en additionnant les trois
équations $\alpha+\beta = x$, $\beta+\gamma = y$, $\alpha+\gamma = z$ on obtient
$\alpha+\beta+\gamma = \tfrac{x+y+z}{2}$, d'où $\alpha = \tfrac{x-y+z}{2}$,
$\beta = \tfrac{x+y-z}{2}$, $\gamma = \tfrac{-x+y+z}{2}$ ; pour $(x,y,z) = (1,0,0)$ :
$\tfrac12 v_1 + \tfrac12 v_2 - \tfrac12 v_3 = (\tfrac12+\tfrac12-0,\ 0+\tfrac12-\tfrac12,\
\tfrac12+0-\tfrac12) = (1,0,0)$ ✓.)*

**[C9] — le contre-exemple qui casse « libre = pas de colinéarité ».**
$w_1 = (1,2,3)$, $w_2 = (2,1,0)$, $w_3 = (3,3,3)$.
- Aucun n'est nul ; **aucun couple n'est colinéaire** : $w_1, w_2$ ($2/1 = 2$ mais $1/2 \neq 2$) ;
  $w_1, w_3$ ($3/1 = 3$ mais $3/2 \neq 3$) ; $w_2, w_3$ ($3/2 \neq 3/1$).
- Et pourtant : $w_1 + w_2 = (1+2,\ 2+1,\ 3+0) = (3,3,3) = w_3$, donc
  $$1\cdot w_1 + 1\cdot w_2 + (-1)\cdot w_3 = (0,0,0)$$
  avec des coefficients **non tous nuls** : la famille est **liée**.

*Le test par paires est un test de deux vecteurs ; la liberté est une propriété de la famille
entière. Trois vecteurs peuvent se tenir deux à deux sans se tenir à trois.*

### 6.4 Bloc D — base et dimension

**Base** = famille **libre** ET **génératrice**. **Dimension** = le nombre de vecteurs d'une base
(admis : toutes les bases d'un même espace de dimension finie ont le même nombre de vecteurs).

**[C10] — la base de $E$ et sa dimension.** Avec $A = M(1,0) = \left(\begin{smallmatrix}1&1\\1&0\end{smallmatrix}\right)$
et $B = M(0,1) = \left(\begin{smallmatrix}0&1\\-1&1\end{smallmatrix}\right)$ :
- **génératrice** : $M(a,b) = aA + bB$ pour tous $a,b$ — c'est [C7] ;
- **libre** : $\alpha A + \beta B = \left(\begin{smallmatrix}\alpha & \alpha+\beta\\ \alpha-\beta & \beta\end{smallmatrix}\right) = O$
  donne $\alpha = 0$ (coefficient en haut à gauche) et $\beta = 0$ (en bas à droite) ✓.

**$(A,B)$ est une base de $E$, donc $\dim E = 2$.** *Remarque à faire : ici $A \neq I$, et
$I \notin E$ (il faudrait $a = 1$ et $b = 1$, mais alors le coefficient en haut à droite vaudrait
$a+b = 2 \neq 0$). **La base d'un $E$ n'est pas « $(I,J)$ » par nature** — c'est ce que le calcul
donne.*

**[C11] — $\dim M_2(\mathbb{R}) = 4$** (et non 2).
$E_{11} = \left(\begin{smallmatrix}1&0\\0&0\end{smallmatrix}\right)$,
$E_{12} = \left(\begin{smallmatrix}0&1\\0&0\end{smallmatrix}\right)$,
$E_{21} = \left(\begin{smallmatrix}0&0\\1&0\end{smallmatrix}\right)$,
$E_{22} = \left(\begin{smallmatrix}0&0\\0&1\end{smallmatrix}\right)$ :
$\left(\begin{smallmatrix}x&y\\z&t\end{smallmatrix}\right) = xE_{11}+yE_{12}+zE_{21}+tE_{22}$
(génératrice) et cette combinaison ne vaut $O$ que si $x=y=z=t=0$ (libre). **$\dim M_2(\mathbb{R}) = 4$.**
*Le « 2 » de $M_2$ est l'ordre des matrices, pas la dimension de l'espace.* Et $E$ du [C10] est un
sous-espace de **dimension 2 dans un espace de dimension 4**.

**[C12] — le pari n°3, puis le contre-exemple des paramètres**
(`[[checkpoint:cp-r8-pari-dimension]]`, §7.3). $u = (1,2,-1)$, $v = (2,1,1)$,
$w = (3,3,0)$, $G = \mathrm{Vect}(u,v,w)$.
- $u + v = (1+2,\ 2+1,\ -1+1) = (3,3,0) = w$ : le troisième générateur **n'apporte rien** ;
  $\alpha u + \beta v + \gamma w = (\alpha+\gamma)u + (\beta+\gamma)v$, donc
  $G = \mathrm{Vect}(u,v)$ ;
- $(u,v)$ est libre : $\alpha u + \beta v = (\alpha+2\beta,\ 2\alpha+\beta,\ -\alpha+\beta) = (0,0,0)$
  donne $\beta = \alpha$ (3e équation), puis $\alpha + 2\alpha = 3\alpha = 0$ (1re) donc
  $\alpha = \beta = 0$ ✓.

**Trois générateurs, dimension 2.** *Compter les lettres n'est pas compter une base.*

**[C13] — le même piège en habillage matriciel.**
$G' = \left\{ N(a,b,c) = \left(\begin{smallmatrix} a+b & c \\ c & a+b \end{smallmatrix}\right)\ /\ (a,b,c) \in \mathbb{R}^3 \right\}$.
$N(a,b,c) = (a+b)\,I + c\,K$ avec $K = \left(\begin{smallmatrix}0&1\\1&0\end{smallmatrix}\right)$
*(contrôle : $(a+b)I = \left(\begin{smallmatrix}a+b&0\\0&a+b\end{smallmatrix}\right)$,
$cK = \left(\begin{smallmatrix}0&c\\c&0\end{smallmatrix}\right)$, somme
$\left(\begin{smallmatrix}a+b&c\\c&a+b\end{smallmatrix}\right)$ ✓)*. Comme $a+b$ parcourt tout
$\mathbb{R}$, $G' = \mathrm{Vect}(I,K)$ ; et $\alpha I + \beta K =
\left(\begin{smallmatrix}\alpha&\beta\\\beta&\alpha\end{smallmatrix}\right) = O$ force
$\alpha = \beta = 0$. **$\dim G' = 2$, avec trois lettres dans la définition.**

**[C14] — une équation coûte une dimension.**
$P = \{(x,y,z) \in \mathbb{R}^3\ /\ x+y+z = 0\}$ : sous-espace (le vecteur nul vérifie l'équation ;
et $(\lambda x + \mu x') + (\lambda y + \mu y') + (\lambda z + \mu z') = \lambda(x+y+z) +
\mu(x'+y'+z') = 0$). En écrivant $z = -x-y$ : $(x,y,-x-y) = x(1,0,-1) + y(0,1,-1)$, famille
génératrice ; libre car $\alpha(1,0,-1)+\beta(0,1,-1) = (\alpha,\ \beta,\ -\alpha-\beta) = (0,0,0)$
donne $\alpha = \beta = 0$. **$\dim P = 2$** : un plan passant par l'origine dans un espace de
dimension 3.

**Raccourci, énoncé APRÈS la méthode directe et jamais avant** (admis) : *dans un espace de
dimension $n$, une famille libre de $n$ vecteurs est une base ; une famille génératrice de $n$
vecteurs aussi.* Sert de **vérification**, pas de dispense de calcul. → §15 Q7.

### 6.5 Bloc E — applications linéaires, noyau et image

**Définition.** $f : E \to F$ est **linéaire** si $f(\lambda u + \mu v) = \lambda f(u) + \mu f(v)$
pour tous $u,v \in E$ et $\lambda,\mu \in \mathbb{R}$.

**[C15] — reconnaître.** $f : \mathbb{R}^3 \to \mathbb{R}^2$, $f(x,y,z) = (x-y,\ y-z)$.
$$f(\lambda u + \mu v) = \big((\lambda x+\mu x') - (\lambda y+\mu y'),\ (\lambda y+\mu y') - (\lambda z+\mu z')\big) = \lambda(x-y,\ y-z) + \mu(x'-y',\ y'-z')\ ✓$$
**Deux contre-exemples, courts et parlants :**
- $g(x,y) = (x+1,\ y)$ : $g(0,0) = (1,0) \neq (0,0)$. *Une application linéaire envoie $0$ sur $0$
  (prendre $\lambda = \mu = 0$) — c'est le même « il faut passer par l'origine » que [C4].*
- $h(x,y) = (x^2,\ y)$ : $h(2\cdot(1,0)) = h(2,0) = (4,0)$, alors que $2\,h(1,0) = (2,0)$. ✗

**[C16] — noyau et image, sur un noyau qui n'est PAS réduit à zéro.** Avec le $f$ de [C15] :
- $\ker f = \{(x,y,z)\ /\ x-y = 0 \text{ et } y-z = 0\} = \{(t,t,t)\ /\ t \in \mathbb{R}\} = \mathrm{Vect}\big((1,1,1)\big)$,
  de **dimension 1** : $f$ **n'est pas injective**, puisque $f(1,1,1) = (0,0) = f(0,0,0)$ avec
  $(1,1,1) \neq (0,0,0)$ ;
- $\mathrm{Im}\,f = \mathbb{R}^2$ : pour $(s,t)$ quelconque, $f(s+t,\ t,\ 0) = \big((s+t)-t,\ t-0\big) = (s,t)$ ✓.

**[C17] — la révélation du chapitre : la paramétrisation EST une application linéaire.**
$\varphi : \mathbb{R}^2 \to M_2(\mathbb{R})$, $\varphi(a,b) = M(a,b)$ (le $E$ du [C6]).
- $\varphi$ est linéaire : c'est **mot pour mot** le calcul du [C6],
  $\varphi(\lambda(a,b) + \mu(a',b')) = M(A,B) = \lambda M(a,b) + \mu M(a',b')$ ;
- $\ker \varphi = \{(a,b)\ /\ M(a,b) = O\} = \{(0,0)\}$ (lecture directe des coefficients
  $(1,1)$ et $(2,2)$) **— c'est exactement « $(A,B)$ est libre »** ;
- $\mathrm{Im}\,\varphi = E$ **— c'est exactement « $(A,B)$ est génératrice »**.

**Donc : « $(A,B)$ est une base de $E$ » et « $\varphi$ est une bijection de $\mathbb{R}^2$ sur
$E$ » sont la même phrase**, et $\dim E = 2 = \dim \mathbb{R}^2$. *C'est le même geste de transport
qu'au chapitre 10, sur une structure d'espace au lieu d'une structure de groupe.*

**[C18] — le même mot dans l'autre monde : le noyau d'un morphisme de groupes** *(sert la lacune de
cadre `maths-sm.yaml:285`, voir §12.3)*. Soit $f : (E,\star) \to (F,\top)$ un morphisme de groupes.
- $f(e_E) = e_F$ : $f(e_E) \top f(e_E) = f(e_E \star e_E) = f(e_E)$, et on compose par le
  symétrique de $f(e_E)$ ;
- $f(x') = \big(f(x)\big)'$ : $f(x) \top f(x') = f(x \star x') = f(e_E) = e_F$ ;
- $\ker f = \{x \in E\ /\ f(x) = e_F\}$ est un **sous-groupe de $(E,\star)$** — les trois conditions
  du **chapitre 5**, sans une de plus : $e_E \in \ker f$ ; si $f(x) = f(y) = e_F$ alors
  $f(x \star y) = e_F \top e_F = e_F$ ; et $f(x') = (f(x))' = e_F' = e_F$ ;
- **$f$ est injective $\iff \ker f = \{e_E\}$** : si $f(x) = f(y)$ alors
  $f(x \star y') = f(x) \top (f(y))' = e_F$, donc $x \star y' \in \ker f = \{e_E\}$, donc $x = y$.

**Exemple travaillé (original, distinct de l'item SA-53) :** $f : (\mathbb{R}^*,\times) \to
(\mathbb{R}^*,\times)$, $f(x) = x^2$. Morphisme : $(xy)^2 = x^2y^2$ ✓.
$\ker f = \{x \in \mathbb{R}^*\ /\ x^2 = 1\} = \{1,-1\}$ — **un sous-groupe à deux éléments**
($1 \in$ ; $(-1)\times(-1) = 1 \in$ ; chacun est son propre inverse), donc $f$ **n'est pas
injective** ($f(2) = f(-2) = 4$). Et $\mathrm{Im}\,f = \mathbb{R}^*_+ \neq \mathbb{R}^*$ : **l'image
n'est pas non plus l'ensemble d'arrivée tout entier.**

### 6.6 Clôture — la chaîne de l'examen, dans son ordre

Trois phrases, pas un exercice neuf : (1) l'énoncé **donne** l'espace ambiant ; (2) il demande le
**sous-groupe**, puis le **sous-espace** — et il ne reste alors que la loi externe à traiter ; (3)
il enchaîne sur $\times$ (chapitre 7) et sur l'isomorphisme (chapitre 10). Renvoi à l'annale
**déjà en banque** : `bk-2023-n-x5`, Partie I, questions 1 et 2.

### 6.7 Où monte l'exigence, où tombe l'étai

| bloc | ce qui est donné | ce que l'élève fait seul |
|---|---|---|
| accroche [C1] | l'ensemble, déjà traité au chapitre 5 | **rien n'est donné** : il parie avant toute définition |
| A [C2] | les axiomes, énoncés | il lit ; deux lignes lui sont démontrées |
| B [C3][C4] | le critère, l'exemple entièrement rédigé | il suit |
| B [C5] | **le pari, avant la réponse** | il tranche, puis se corrige |
| B [C6][C7] | le calcul matriciel intégral, puis le raccourci d'expert | il refait le regroupement |
| C [C8][C9] | le système résolu ligne à ligne | il voit la différence entre « deux à deux » et « à trois » |
| D [C10]–[C14] | **le pari, puis** la base, la dimension, les deux pièges | il compte une base, plus des lettres |
| E [C15]–[C18] | la définition, deux contre-exemples, un noyau non nul | il calcule un noyau et conclut sur l'injectivité |

---

## 7. Les trois points d'engagement — énoncés, choix et clés exacts

Format, champs et conventions : ceux de `checkpoints.yaml` (`rung`, `habilete`, `skill_code`,
`tags`, `primary_misconception`, `item_source`, `lesson_placement`, `stem`, `type: mcq`, `choices`
avec **exactement un** `correct: true` — porte dure, `validate-content.mjs:59`). **Les checkpoints
ne comptent pas dans le plancher ≥3** (`items.yaml:2256-2261`).

### 7.1 `cp-r8-pari-scalaire` — `rung: R8`, `lesson_placement: in_R8_accroche`, `item_source: original`
`primary_misconception: mc.math.structures_algebriques.sous-espace-vs-sous-groupe`

> **Énoncé.** Au chapitre 5, on a démontré que
> $F = \left\{ M(a,b) = \left(\begin{smallmatrix} a & -b \\ b & a \end{smallmatrix}\right)\ /\ (a,b) \in \mathbb{Z}^2 \right\}$
> est un sous-groupe de $(M_2(\mathbb{R}),+)$. L'énoncé rappelle maintenant que
> $(M_2(\mathbb{R}),+,\cdot)$ est un espace vectoriel réel et demande : **$F$ en est-il un
> sous-espace vectoriel ?** Prends position avant de lire la suite.

| choix | texte | clé | modèle |
|---|---|---|---|
| A | Oui : $F$ est déjà un sous-groupe pour $+$, et c'est précisément ce que demande un sous-espace. | ✗ | `sous-espace-vs-sous-groupe` |
| **B** | **Non : $M(1,0)$ est dans $F$, mais $\tfrac12 \cdot M(1,0) = \left(\begin{smallmatrix}\frac12&0\\0&\frac12\end{smallmatrix}\right)$ demanderait $a = \tfrac12$, qui n'est pas entier.** | **✓** | — |
| C | Oui : $F$ contient la matrice nulle $M(0,0)$, la condition d'un sous-espace est donc remplie. | ✗ | `sous-espace-zero-suffit` |
| D | Non : $F$ n'est pas stable pour le produit de deux matrices, et un sous-espace doit l'être. | ✗ | `sous-espace-vs-sous-groupe` |

*Note pour l'auteur : le retour de D doit dire les deux choses — le produit matriciel n'a rien à
voir avec un sous-espace, **et** $F$ y est en fait stable
($M(a,b)M(c,d) = M(ac-bd,\ ad+bc)$, à coefficients entiers).* **Clé : B.**

### 7.2 `cp-r8-pari-stabilite` — `lesson_placement: in_R8_critere`, `item_source: original`
`primary_misconception: mc.math.structures_algebriques.sous-espace-zero-suffit`
*Placé après l'énoncé du critère et le contre-exemple de la droite décalée, **avant** la réponse du
[C5].*

> **Énoncé.** Dans $\mathbb{R}^2$, on pose $H = \{(x,y) \in \mathbb{R}^2\ /\ xy = 0\}$ — les points
> qui sont sur au moins un des deux axes. Deux faits se vérifient en une ligne : $(0,0) \in H$ ; et
> pour tout réel $\lambda$, $(\lambda x)(\lambda y) = \lambda^2 xy = 0$, donc $\lambda(x,y)$ reste
> dans $H$. **$H$ est-il un sous-espace vectoriel de $\mathbb{R}^2$ ?** Prends position avant de
> lire la suite.

| choix | texte | clé | modèle |
|---|---|---|---|
| A | Oui : le vecteur nul y est et la multiplication par un réel n'en sort pas — le critère est rempli. | ✗ | `sous-espace-zero-suffit` |
| **B** | **Non : $(1,0)$ et $(0,1)$ sont dans $H$, mais leur somme $(1,1)$ n'y est pas, car $1 \times 1 = 1 \neq 0$.** | **✓** | — |
| C | Oui : la somme de deux points d'un même axe reste sur cet axe, donc $H$ est stable pour l'addition. | ✗ | `sous-espace-vs-sous-groupe` |
| D | Oui : on peut tester, $(1,0)+(2,0) = (3,0)$ est dans $H$ et $(0,1)+(0,5) = (0,6)$ aussi. | ✗ | `generalisation-hative` *(id existant)* |

**Clé : B.** *La prémisse de C est vraie et son inférence fausse — le retour doit dire que les deux
points peuvent vivre sur des axes différents.*

### 7.3 `cp-r8-pari-dimension` — `lesson_placement: in_R8_dimension`, `item_source: original`
`primary_misconception: mc.math.structures_algebriques.dimension-compte-parametres`
*Placé après la définition de la base et $\dim M_2(\mathbb{R}) = 4$, **avant** la réponse du [C12].*

> **Énoncé.** Dans $\mathbb{R}^3$, on pose $u = (1,2,-1)$, $v = (2,1,1)$, $w = (3,3,0)$, et
> $G = \mathrm{Vect}(u,v,w)$, l'ensemble de toutes les combinaisons
> $\alpha u + \beta v + \gamma w$. Trois vecteurs, trois coefficients. **Quelle est la dimension de
> $G$ ?** Prends position avant de lire la suite.

| choix | texte | clé | modèle |
|---|---|---|---|
| A | $3$ : la famille $(u,v,w)$ engendre $G$ et compte trois vecteurs. | ✗ | `dimension-compte-parametres` |
| **B** | **$2$ : $w = u+v$, donc $w$ n'ajoute rien ; $(u,v)$ engendre $G$ et est libre.** | **✓** | — |
| C | $3$ : aucun des trois n'est nul et ils sont deux à deux non colinéaires, la famille est donc libre. | ✗ | `famille-libre-mal-testee` |
| D | $3$ : $G$ est inclus dans $\mathbb{R}^3$, qui est de dimension $3$. | ✗ | `dimension-lue-sur-la-notation` |

**Clé : B.** *(Prémisse de C vérifiée : $u,v$ non colinéaires ($2/1 \neq 1/2$) ; $u,w$ non
colinéaires ($3/1 \neq 3/2$) ; $v,w$ non colinéaires ($3/2 \neq 3/1$).)*

**Aucun quatrième checkpoint.** Le modèle « le noyau est toujours nul » est diagnostiqué par quatre
items du banc de fin (§11) ; y ajouter un pari alourdirait la fin du chapitre sans rien mesurer de
plus. *Décision de ne pas armer, écrite à côté de ce qui est armé.*

---

## 8. L'inventaire des modèles d'erreur — six ids, une face chacun

Préfixe **vérifié** dans le fichier de la notion : `mc.math.structures_algebriques.<slug>`
(`items.yaml:6`, `:19`, `:58`…). **Porte dure** : tout id cité par un distracteur doit être déclaré
dans `items.yaml.misconceptions` (`validate-content.mjs:457-520`).

### M1 · `mc.math.structures_algebriques.sous-espace-zero-suffit`
- **label** — « Une seule condition du critère suffit : $0_E \in F$ (ou la seule stabilité que j'ai
  su tester), donc c'est un sous-espace. »
- **mécanisme (une face)** — l'élève lit le critère comme une **liste d'indices suffisants** au lieu
  d'une **conjonction** : dès qu'une condition passe — presque toujours la plus facile, « le vecteur
  nul y est » — il conclut et s'arrête. Le geste s'arrête au premier ✓.
- **contredit** — le critère est une conjonction : $F \neq \varnothing$ **et** stabilité par
  combinaison linéaire. $H = \{(x,y)\ /\ xy = 0\}$ contient $(0,0)$ **et** résiste à toute
  multiplication par un réel, et n'est pourtant pas un sous-espace, car $(1,0)+(0,1) = (1,1) \notin H$.
- **formes d'item qui le diagnostiquent** — une partie qui **passe** le test du zéro (et parfois
  celui du scalaire) et **échoue** sur l'addition ; un QCM « laquelle de ces quatre parties est un
  sous-espace ? » où trois candidates contiennent le vecteur nul.

### M2 · `mc.math.structures_algebriques.sous-espace-vs-sous-groupe`
- **label** — « Sous-espace, c'est la question d'à côté : je coche ce que demandait le sous-groupe
  (ou le sous-anneau) et la loi externe n'entre jamais dans le raisonnement. »
- **mécanisme (une face)** — l'élève **transporte la liste de contrôle de la structure voisine**.
  La situation d'examen la fabrique : la question 1 demande le sous-groupe, la question 2 le
  sous-espace, sur le même $E$ — il répond « déjà fait ». Symptôme inverse et même racine : exiger
  que $F$ contienne $I$ ou soit stable pour $\times$.
- **contredit** — un sous-espace demande une stabilité que le sous-groupe **n'a jamais testée** :
  celle pour la loi externe $\lambda \cdot u$, où $\lambda$ n'appartient même pas à l'ensemble. Et
  la réciproque est fausse : $F = \{M(a,b),\ (a,b)\in\mathbb{Z}^2\}$ est un sous-groupe de
  $(M_2(\mathbb{R}),+)$ sans être un sous-espace ($\tfrac12 M(1,0) \notin F$).
- **formes d'item** — un ensemble à **paramètres entiers** (sous-groupe ✓, sous-espace ✗) ; « la
  question 1 a établi le sous-groupe : que reste-t-il à démontrer ? » ; un distracteur qui réclame
  $I \in F$ ou la stabilité pour $\times$.

### M3 · `mc.math.structures_algebriques.famille-libre-mal-testee`
- **label** — « La famille est libre : aucun vecteur n'est nul et aucun couple n'est colinéaire. »
- **mécanisme (une face)** — l'élève remplace le test **global** (une combinaison nulle à
  coefficients non tous nuls existe-t-elle ?) par un test **par paires**, ou par la simple absence
  du vecteur nul. Le test choisi est celui qui se fait de tête.
- **contredit** — la liberté porte sur **toute** combinaison de **toute** la famille.
  $(1,2,3), (2,1,0), (3,3,3)$ : aucun vecteur nul, aucun couple colinéaire, et pourtant
  $w_1 + w_2 - w_3 = (0,0,0)$.
- **formes d'item** — trois vecteurs (ou trois matrices) deux à deux non proportionnels dont le
  troisième est une combinaison des deux autres ; une famille où la relation **ne se voit pas** et
  n'apparaît qu'en résolvant le système.

### M4 · `mc.math.structures_algebriques.dimension-compte-parametres`
- **label** — « La dimension, c'est le nombre de lettres dans la définition (ou le nombre de
  vecteurs écrits). »
- **mécanisme (une face)** — l'élève **compte** au lieu de **vérifier** : il prend la famille
  génératrice qui se lit sur la définition, ne teste jamais sa liberté, et annonce son cardinal.
- **contredit** — la dimension est le nombre de vecteurs d'une **base**, c'est-à-dire d'une famille
  libre **et** génératrice. $\mathrm{Vect}\big((1,2,-1),(2,1,1),(3,3,0)\big)$ a trois générateurs et
  la dimension $2$ ; $\left\{\left(\begin{smallmatrix}a+b&c\\c&a+b\end{smallmatrix}\right)\right\}$
  a trois lettres et la dimension $2$.
- **formes d'item** — un ensemble **sur-paramétré** (trois lettres, deux degrés de liberté) ; un
  $\mathrm{Vect}$ de deux vecteurs proportionnels ; « quelle est la dimension ? » avec le nombre de
  générateurs en distracteur.

### M5 · `mc.math.structures_algebriques.dimension-lue-sur-la-notation`
- **label** — « La dimension se lit sur l'habillage : $M_2(\mathbb{R})$ est de dimension 2, un
  vecteur à trois coordonnées vit en dimension 3, un sous-espace a la dimension de l'espace qui le
  contient. »
- **mécanisme (une face)** — l'élève lit la dimension sur un **symbole** (l'indice $2$ de $M_2$, le
  nombre de coordonnées écrites, l'espace ambiant) au lieu de la **compter sur une base**.
- **contredit** — $\dim M_2(\mathbb{R}) = 4$ (base $(E_{11},E_{12},E_{21},E_{22})$), et un
  sous-espace a une dimension **inférieure ou égale** à celle de l'espace ambiant, jamais donnée
  d'avance : $\dim E = 2$ dans $M_2(\mathbb{R})$ de dimension 4 ; $\dim P = 2$ dans $\mathbb{R}^3$.
- **formes d'item** — demander $\dim M_2(\mathbb{R})$ ; demander la dimension d'un sous-espace de
  $M_2(\mathbb{R})$ avec « $4$ » et « $2$ » en distracteurs ; demander la dimension d'un
  sous-espace de $\mathbb{R}^3$ avec « $3$ » en distracteur.

### M6 · `mc.math.structures_algebriques.noyau-toujours-nul`
- **label** — « Le noyau se réduit toujours au neutre — donc une application linéaire (ou un
  morphisme) est injective, et son image est l'espace d'arrivée tout entier. »
- **mécanisme (une face)** — l'élève prend la **conservation de la structure** pour une
  **bijectivité** : puisque $f(0) = 0$, il conclut que $0$ est **seul** dans le noyau, et que
  l'image « remplit » l'arrivée.
- **contredit** — $\ker f$ **contient** le neutre, il ne s'y réduit pas : pour
  $f(x,y,z) = (x-y,\ y-z)$, $\ker f = \mathrm{Vect}\big((1,1,1)\big)$ et $f(1,1,1) = f(0,0,0)$ ;
  pour $f(x) = x^2$ sur $(\mathbb{R}^*,\times)$, $\ker f = \{1,-1\}$ et
  $\mathrm{Im}\,f = \mathbb{R}^*_+ \neq \mathbb{R}^*$. L'injectivité **se démontre**, et elle
  équivaut à $\ker f = \{0_E\}$ (ou $\{e_E\}$).
- **formes d'item** — une application linéaire de noyau une droite, où l'énoncé demande **à la fois**
  $\ker$ et $\mathrm{Im}$ ; un morphisme de groupes à noyau fini non trivial.

### 8.7 Ce que je NE déclare PAS — dette écrite à côté de ce qui est armé

Quatre modèles réels, vus en classe, **non déclarés** faute de budget d'items (le plancher ≥3
chacun ferait +12 items) et parce qu'aucun n'a d'attestation d'examen dans ce dépôt :
1. **« Une réunion de sous-espaces est un sous-espace »** — vrai sur chaque morceau, faux sur la
   réunion. **Traité dans la PROSE** ([C5]) sans porter d'id ; s'il devait en porter un, ce serait
   le premier à déclarer.
2. **« Prouver un sous-espace, c'est revérifier les huit axiomes »** — l'erreur coûteuse, pas
   fausse. Elle apparaît **comme distracteur** de SA-41 sous l'étiquette M2 (mauvaise liste de
   contrôle), ce qui est honnête sans être parfait.
3. **« Le noyau vit dans l'ensemble d'arrivée »** ($\ker f = \{1\}$ pris côté image).
4. **« $\lambda u = 0 \Rightarrow \lambda = 0$ ET $u = 0$ »** (au lieu de « ou »).

---

## 9. Médias — ce que le concept demande vraiment, et rien de plus

**Un seul média est nécessaire.**

- **`[[figure:sous-espaces-plan-espace]]` — `type: structural-diagram` · `tool: svg+katex`.
  REQUIS.** Livrable : `media/sous-espaces-plan-espace.svg` + `media/sous-espaces-plan-espace.stages.json`
  (même gabarit que `echelle-structures.stages.json` : `{"slug", "stages":[{"caption"}]}`).
  **Quatre étapes, exactement :**
  1. la droite $y = 2x$ dans le plan : elle **passe par l'origine**, toute somme et tout multiple y
     restent — un sous-espace ;
  2. la même droite décalée, $y = 2x+1$ : l'origine n'y est pas, le critère tombe à la première
     ligne ;
  3. la réunion des deux axes, $xy = 0$ : l'origine y est, les multiples y restent, et pourtant
     $(1,0)+(0,1) = (1,1)$ en sort — **l'étape qui porte la misconception principale** ;
  4. l'échelle des sous-espaces de $\mathbb{R}^3$ : $\{0\}$ (dim 0) $\subset$ une droite (dim 1)
     $\subset$ un plan (dim 2) $\subset \mathbb{R}^3$ (dim 3).
  **Pourquoi `svg+katex` et jamais `gemini` :** les étiquettes ($y=2x$, $(1,1)$, « dim 2 ») et
  l'exactitude des positions **portent le sens** ; un rendu génératif ne les garantit pas.
  Placement : à la fin du bloc B, après [C5].
- **Manipulable — OWNER-GATED, hors périmètre de cette livraison.** Deux vecteurs déplaçables dans
  $\mathbb{R}^3$ engendrant un plan qui **s'effondre en droite** quand ils s'alignent : c'est la
  seule idée du chapitre qui gagnerait à être manipulée (liberté ↔ dimension).
  `type: manipulable` · `tool: geogebra/desmos/falstad/phet` (taxonomie ADR 0017) ; **réalisation
  maison attestée dans ce dépôt** : descripteur `media/*.json` avec `"tool": "scene3d"`
  (ADR 0041, précédents `geometrie-espace/media/produit-vectoriel.json`,
  `calcul-integral/media/solide-de-revolution.json`). → §15 Q8.
- **Rien d'autre.** Pas d'illustration d'ambiance (`gemini`) : l'accroche est la phrase de l'énoncé
  lui-même, une image n'y ajouterait rien. Pas de `manim` : aucune idée du chapitre n'est
  temporelle.

---

## 10. Cahier des charges — content-author

### 10.1 L'ancre, exacte
Ouvrir `content/maths/structures-algebriques/lesson.md`, aller **à la toute fin** (après le bloc de
commentaire d'auteur qui se termine par `-->`, ligne 773 à la lecture du 2026-09-28), et ajouter :
```
---

## R8 — Espaces vectoriels : sous-espace, base, dimension
```
**Ce doit être le 11ᵉ et dernier titre `## ` du fichier.** Ne rien déplacer, ne rien renuméroter,
ne toucher à aucun titre existant (la porte `carte-chapitres` distingue un **rang déplacé** d'un
**libellé reformulé** : la première cause rougit, la seconde avertit).

### 10.2 Ordre imposé des morceaux
Accroche + `[[checkpoint:cp-r8-pari-scalaire]]` → bloc A → bloc B (critère, [C3], [C4],
`[[checkpoint:cp-r8-pari-stabilite]]`, [C5], `[[figure:sous-espaces-plan-espace]]`, [C6], [C7]) →
bloc C ([C8], [C9]) → bloc D ([C10], [C11], `[[checkpoint:cp-r8-pari-dimension]]`, [C12], [C13],
[C14], raccourci admis) → bloc E ([C15], [C16], [C17], [C18]) → clôture §6.6.
**Trois marqueurs de checkpoint, un marqueur de figure, aucun marqueur d'exercice** (§12.2).

### 10.3 Contraintes dures (portes déjà armées)
- **Aucun code de barreau ni le mot « rung » dans la prose visible** (`validate-content.mjs:399-419`).
  Les titres `## R8 — …` sont hors champ ; **tout renvoi se fait par NUMÉRO de chapitre**.
- **Les seuls numéros de chapitre à citer**, et ce qu'ils désignent : **2** (loi interne,
  stabilité), **4** (les quatre axiomes du groupe), **5** (le critère du sous-groupe et son exemple
  matriciel sur $\mathbb{Z}$), **6** (groupe commutatif), **7** (anneau, pour la seule phrase de
  clôture), **10** (morphisme, isomorphisme, transport). **Ne jamais écrire « chapitre 11 » en
  parlant d'un autre chapitre** — c'est celui-ci.
- **Voix** : tutoiement, « Ce qu'on cherche et pourquoi ce geste », « Prends position avant de lire
  la suite », les ✓ / ✗ en fin de vérification, display math pour chaque résultat qui compte,
  paragraphes « **Attention**, le piège » comme au chapitre 10 (`lesson.md:637`).
- **Longueur visée** : **200 lignes ± 30** (le chapitre 10 en fait ~117, mais couvre un seul geste ;
  celui-ci en couvre quatre).
- **Tous les nombres viennent du §6.** Ne rien re-dériver, ne rien « améliorer » : si un calcul
  paraît faux, **le signaler**, ne pas le corriger en silence.

### 10.4 Interdits (limites et exclusions du cadre, §2)
Valeurs propres, vecteurs propres, diagonalisation, polynôme caractéristique · produit scalaire,
norme, orthogonalité, base orthonormée dans un espace abstrait · dimension infinie, espaces de
suites ou de fonctions · **espaces de polynômes** (non attestés, non nommés par le cadre — §15 Q4)
· somme et somme directe de sous-espaces · **théorème du rang** (§15 Q3) · matrice d'une
application linéaire · rang d'une famille · toute affirmation de fréquence ou de poids d'examen.

---

## 11. Cahier des charges — item-author : 18 items, **SA-36 → SA-53**

### 11.0 Le lot, vu de haut
- **18 items**, tous `rung: "R8"`, `skill_code: maths_structures_alg`, tous portant `habilete`
  (précédent SA-27…SA-34).
- **Habiletés : 7 / 7 / 4** = 38,9 / 38,9 / 22,2 (cible cadre 40 / 40 / 20).
  `application_directe` : SA-36, SA-39, SA-42, SA-46, SA-48, SA-50, SA-51 ·
  `application_non_explicite` : SA-37, SA-40, SA-43, SA-44, SA-45, SA-49, SA-52 ·
  `synthese` : SA-38, SA-41, SA-47, SA-53.
- **Six ids neufs à DÉCLARER d'abord** dans `items.yaml.misconceptions` (§8) — sans quoi la porte
  refuse le fichier.
- **Plancher ≥3 : tenu partout**, avec la marge — M1 **5**, M2 **7**, M3 **5**, M4 **8**, M5 **8**,
  M6 **4**. L'id existant `generalisation-hative` gagne 4 items (13 → 17).
- **`coverage_summary` à mettre à jour** : `total_items` 35 → **53** ; `ramp_coverage` gagne
  `R8: 18` ; les six lignes `per_misconception` ; un paragraphe `honest_state` qui dit ce que cette
  vague ferme et ce qu'elle laisse (§8.7).

### 11.1 Les 18 items — objet, clé, distracteurs

**M1 · `sous-espace-zero-suffit`**

| id | hab. | diff | objet et question | clé | distracteurs → modèle |
|---|---|---|---|---|---|
| **SA-36** | directe | 2 | $K = \{(x,y) \in \mathbb{R}^2\ /\ y = \lvert x\rvert\}$. Sous-espace de $\mathbb{R}^2$ ? | **Non** : $(1,1) \in K$ mais $(-1)\cdot(1,1) = (-1,-1) \notin K$ car $\lvert -1\rvert = 1 \neq -1$ | B « oui, $(0,0) \in K$ » → **M1** · C « oui, $\lambda(x,\lvert x\rvert) = (\lambda x, \lvert\lambda x\rvert)$ pour $\lambda \geq 0$ » → **`generalisation-hative`** · D « oui, $K$ est stable pour $+$ » → **M2** *(faux aussi : $(1,1)+(-2,2) = (-1,3)$, $\lvert-1\rvert = 1 \neq 3$)* |
| **SA-37** | non_explicite | 3 | $T = \left\{\left(\begin{smallmatrix}x&0\\0&y\end{smallmatrix}\right)\ /\ xy = 0\right\} \subset M_2(\mathbb{R})$. Quelle affirmation est exacte ? | **Pas un sous-espace** : $\left(\begin{smallmatrix}1&0\\0&0\end{smallmatrix}\right) + \left(\begin{smallmatrix}0&0\\0&1\end{smallmatrix}\right) = I \notin T$ | B « $O \in T$ et $\lambda M \in T$, donc oui » → **M1** · C « non, il faudrait que $T$ contienne $I$ » → **M2** · D « oui, $T$ est un sous-groupe de $(M_2(\mathbb{R}),+)$ et toute partie stable par $\cdot$ d'un sous-groupe est un sous-espace » → **M2** |
| **SA-38** | synthese | 4 | Quatre parties de $\mathbb{R}^3$ : laquelle est un sous-espace ? | **$\{x-2y+z = 0\}$** | B $\{x^2 = y^2\}$ *(contient $0$, stable par $\cdot$ ; $(1,1,0)+(1,-1,0) = (2,0,0)$, $4 \neq 0$)* → **M1** · C $\{x+y+z = 1\}$ *(ne contient pas $0$)* → **M1** · D $\{x \geq 0\}$ *(contient $0$, stable par $+$, pas par $\lambda = -1$)* → **M2** |

**M2 · `sous-espace-vs-sous-groupe`**

| id | hab. | diff | objet et question | clé | distracteurs → modèle |
|---|---|---|---|---|---|
| **SA-39** | directe | 2 | $V = \left\{\left(\begin{smallmatrix}a&0\\a+b&b\end{smallmatrix}\right)\ /\ (a,b) \in \mathbb{Z}^2\right\}$ : sous-groupe de $(M_2(\mathbb{R}),+)$ ? sous-espace ? | **Sous-groupe oui, sous-espace non** : $\tfrac12 \left(\begin{smallmatrix}1&0\\1&0\end{smallmatrix}\right) = \left(\begin{smallmatrix}1/2&0\\1/2&0\end{smallmatrix}\right)$ demanderait $a = \tfrac12 \notin \mathbb{Z}$ | B « les deux : le sous-groupe règle la question » → **M2** · C « ni l'un ni l'autre : $V$ ne contient pas $I$ » → **M2** · D « les deux : $V$ contient la matrice nulle » → **M1** |
| **SA-40** | non_explicite | 3 | $W = \{(x,y) \in \mathbb{R}^2\ /\ x+y \in \mathbb{Z}\}$ | **Sous-groupe de $(\mathbb{R}^2,+)$, pas sous-espace** : $(1,0) \in W$ et $\tfrac12(1,0) = (\tfrac12,0)$ avec $\tfrac12 \notin \mathbb{Z}$ | B « sous-groupe donc sous-espace » → **M2** · C « sous-espace : $(0,0) \in W$ » → **M1** · D « c'est la même question, seule la loi $+$ compte » → **M2** |
| **SA-41** | synthese | 4 | $E' = \left\{\left(\begin{smallmatrix}a&b\\b&a+b\end{smallmatrix}\right)\ /\ (a,b) \in \mathbb{R}^2\right\}$ ; **la question précédente a établi que $E'$ est un sous-groupe de $(M_2(\mathbb{R}),+)$.** Que reste-t-il à démontrer pour conclure « sous-espace » ? | **Une seule chose : la stabilité pour la loi externe**, $\lambda M(a,b) = M(\lambda a, \lambda b) \in E'$ | B « rien, c'est acquis » → **M2** · C « les quatre axiomes du groupe, puis les huit de l'espace vectoriel » → **M2** · D « que $(a,b) \mapsto M(a,b)$ est injective, sinon $E'$ n'est pas un sous-espace » → **M6** |

**M3 · `famille-libre-mal-testee`**

| id | hab. | diff | objet et question | clé | distracteurs → modèle |
|---|---|---|---|---|---|
| **SA-42** | directe | 2 | $(1,-1,2)$, $(2,0,1)$, $(3,-1,3)$ dans $\mathbb{R}^3$ : libre ? | **Liée** : $v_1 + v_2 - v_3 = (0,0,0)$ | B « libre, aucun n'est nul » → **M3** · C « libre, aucun couple n'est colinéaire » → **M3** · D « libre : trois vecteurs et $\dim\mathbb{R}^3 = 3$, cela suffit » → **M4** |
| **SA-43** | non_explicite | 3 | $A_1 = \left(\begin{smallmatrix}1&0\\1&1\end{smallmatrix}\right)$, $A_2 = \left(\begin{smallmatrix}0&1\\1&0\end{smallmatrix}\right)$, $A_3 = \left(\begin{smallmatrix}1&2\\3&1\end{smallmatrix}\right)$ | **Liée** : $A_3 = A_1 + 2A_2$ *(vérifié coefficient par coefficient : $1+0=1$, $0+2=2$, $1+2=3$, $1+0=1$)* | B « libre, deux à deux non proportionnelles » → **M3** · C « libre, aucune n'est nulle » → **M3** · D « liée : dans $M_2(\mathbb{R})$, plus de deux matrices ne peuvent pas être libres » → **M5** |
| **SA-44** | non_explicite | 3 | $(1,1,0)$, $(0,1,1)$, $(1,0,-1)$ | **Liée** : $-(1,1,0) + (0,1,1) + (1,0,-1) = (0,0,0)$ | B « libre, le système n'a que la solution nulle » → **M3** · C « libre, aucun n'est combinaison évidente des autres » → **M3** · D « libre : la somme des trois vaut $(2,2,0) \neq (0,0,0)$ » → **`generalisation-hative`** |

**M4 · `dimension-compte-parametres`**

| id | hab. | diff | objet et question | clé | distracteurs → modèle |
|---|---|---|---|---|---|
| **SA-45** | non_explicite | 3 | $S = \{(a+b,\ b+c,\ a-c)\ /\ (a,b,c) \in \mathbb{R}^3\}$ : dimension ? | **2** *(générateurs $(1,0,1), (1,1,0), (0,1,-1)$ avec $-u_1+u_2-u_3 = 0$ ; $(u_1,u_2)$ libre)* | B « 3, il y a trois paramètres » → **M4** · C « 3, les vecteurs ont trois coordonnées » → **M5** · D « 3 : les trois générateurs sont deux à deux non colinéaires » → **M3** |
| **SA-46** | directe | 2 | $U = \left\{\left(\begin{smallmatrix}a+b&a+b\\c&0\end{smallmatrix}\right)\ /\ (a,b,c) \in \mathbb{R}^3\right\}$ | **2** *(base $\left(\begin{smallmatrix}1&1\\0&0\end{smallmatrix}\right), \left(\begin{smallmatrix}0&0\\1&0\end{smallmatrix}\right)$)* | B « 3, trois lettres » → **M4** · C « 4, $U \subset M_2(\mathbb{R})$ » → **M5** · D « 1, les deux premières colonnes sont égales » → **M4** |
| **SA-47** | synthese | 4 | $F = \{M \in M_2(\mathbb{R})\ /\ M = \left(\begin{smallmatrix}x&y\\z&t\end{smallmatrix}\right),\ x+t = 0\}$ : dimension et base ? | **3**, base $\left(\begin{smallmatrix}1&0\\0&-1\end{smallmatrix}\right), \left(\begin{smallmatrix}0&1\\0&0\end{smallmatrix}\right), \left(\begin{smallmatrix}0&0\\1&0\end{smallmatrix}\right)$ | B « 2 : $t = -x$, donc $x$ et $y$ » *(oublie $z$)* → **M4** · C « 4 : la condition ne retire rien à $M_2(\mathbb{R})$ » → **M5** · D « 2, engendré par $\left(\begin{smallmatrix}1&0\\0&-1\end{smallmatrix}\right)$ et $\left(\begin{smallmatrix}0&1\\1&0\end{smallmatrix}\right)$ » *(imposerait $y = z$)* → **`generalisation-hative`** |

**M5 · `dimension-lue-sur-la-notation`**

| id | hab. | diff | objet et question | clé | distracteurs → modèle |
|---|---|---|---|---|---|
| **SA-48** | directe | 2 | $\dim M_2(\mathbb{R})$ ? | **4**, base $(E_{11},E_{12},E_{21},E_{22})$ | B « 2, les matrices sont d'ordre 2 » → **M5** · C « 2 : $I$ et $\left(\begin{smallmatrix}0&1\\-1&0\end{smallmatrix}\right)$ suffisent à tout écrire » → **M5** · D « 3 : trois coefficients indépendants » → **M4** |
| **SA-49** | non_explicite | 3 | $\mathrm{Sym} = \left\{\left(\begin{smallmatrix}a&b\\b&c\end{smallmatrix}\right)\right\}$ : dimension ? | **3** | B « 4, c'est un sous-espace de $M_2(\mathbb{R})$ » → **M5** · C « 2, l'ordre de la matrice » → **M5** · D « 4, il y a quatre coefficients à écrire » → **M4** |
| **SA-50** | directe | 2 | $E = \mathrm{Vect}(A,B)$ avec $A = \left(\begin{smallmatrix}1&1\\0&1\end{smallmatrix}\right)$ et $B = \left(\begin{smallmatrix}2&2\\0&2\end{smallmatrix}\right)$ | **1** ($B = 2A$) | B « 2, deux générateurs » → **M4** · C « 4, sous-espace de $M_2(\mathbb{R})$ » → **M5** · D « 2 : ni $A$ ni $B$ n'est nulle, la famille est libre » → **M3** |

**M6 · `noyau-toujours-nul`**

| id | hab. | diff | objet et question | clé | distracteurs → modèle |
|---|---|---|---|---|---|
| **SA-51** | directe | 2 | $f : \mathbb{R}^2 \to \mathbb{R}^2$, $f(x,y) = (x-2y,\ 2x-4y)$ : $\ker f$ et $\mathrm{Im}\,f$ ? | **$\ker f = \mathrm{Vect}\big((2,1)\big)$, $\mathrm{Im}\,f = \mathrm{Vect}\big((1,2)\big)$** *(car $2x-4y = 2(x-2y)$)* | B « $\ker f = \{(0,0)\}$, $\mathrm{Im}\,f = \mathbb{R}^2$ » → **M6** · C « $\ker f = \mathrm{Vect}((2,1))$, $\mathrm{Im}\,f = \mathbb{R}^2$ » → **M6** · D « $\ker f = \{(0,0)\}$ : deux équations à deux inconnues ne laissent que le vecteur nul » → **M6** |
| **SA-52** | non_explicite | 3 | $\varphi : \mathbb{R}^2 \to M_2(\mathbb{R})$, $\varphi(a,b) = \left(\begin{smallmatrix}a+b&0\\0&a+b\end{smallmatrix}\right)$ | **$\ker\varphi = \mathrm{Vect}\big((1,-1)\big)$ (dim 1), $\mathrm{Im}\,\varphi = \mathrm{Vect}(I)$ (dim 1)** | B « $\ker = \{(0,0)\}$ et $\mathrm{Im} = M_2(\mathbb{R})$ » → **M6** · C « $\mathrm{Im}\,\varphi$ est de dimension 4, elle vit dans $M_2(\mathbb{R})$ » → **M5** · D « $\ker\varphi$ est de dimension 2 : deux paramètres $a$ et $b$ » → **M4** |
| **SA-53** | synthese | 4 | $f : (\mathbb{C}^*,\times) \to (\mathbb{R}^*_+,\times)$, $f(z) = \lvert z\rvert$ (morphisme, car $\lvert zz'\rvert = \lvert z\rvert\lvert z'\rvert$) : quel est $\ker f$, et que vaut-il ? | **$\ker f = \{z \in \mathbb{C}^*\ /\ \lvert z\rvert = 1\}$, le cercle unité ; c'est un sous-groupe de $(\mathbb{C}^*,\times)$, et $f$ n'est pas injective ($f(1) = f(-1) = f(i) = 1$)** | B « $\ker f = \{1\}$ : le noyau d'un morphisme se réduit au neutre » → **M6** · C « $\{\lvert z\rvert = 1\}$, mais ce n'est pas un sous-groupe : il ne contient pas $0$ » → **M2** · D « $f$ est injective : $\lvert z\rvert = \lvert z'\rvert$ entraîne $z = z'$ » → **`generalisation-hative`** |

### 11.2 Règles de rédaction — non négociables
- **Ne pas pré-résoudre.** Aucun item ne reprend un objet du §6 ni un objet de `bank.yaml`. La liste
  des objets **interdits** est au préambule du §6 ; les 18 objets ci-dessus ont été choisis contre
  elle, un par un.
- **Chaque choix confesse son raisonnement** (une affirmation **plus** sa raison), jamais un nombre
  nu : c'est ce qui empêche qu'un élève atteigne la clé avec un modèle faux — le défaut de
  **contamination de la bonne réponse**, qui se corrige sur l'énoncé, pas sur le distracteur.
- **Aucun « toujours / jamais / uniquement / aucun »** dans une option — et surtout **pas trois
  distracteurs sur-affirmants contre une clé sobre** : `indice-absolu.mjs` mesure exactement cela
  (« *la bonne réponse se dénonce-t-elle en étant la seule qui ne sur-affirme pas ?* »).
- **La clé n'est ni la plus longue ni la plus courte** (`indice-longueur`).
- **Un distracteur atteignable par deux modèles se DOUBLE-TAGUE** (ce n'est pas un défaut). Les
  double-tags prévus : SA-42 D et SA-45 D (comptage ↔ liberté), SA-52 C (notation ↔ image).
- `tags:` `[misconception_driven, maths_structures_alg, <sous-espace|famille-libre|base-dimension|application-lineaire>]`.
- Chaque distracteur porte un `feedback` qui **nomme le modèle**, pas seulement l'erreur (règle de
  la maison, `checkpoints.yaml:8-10`).

---

## 12. Ce que le récapitulatif, « Pour t'entraîner » et la lacune `:285` deviennent

### 12.1 Récapitulatif : il n'y en a pas, et on n'en fabrique pas
Mesuré (§1.l) : la leçon n'a **ni** « Pour t'entraîner », **ni** « Récapitulatif », **ni**
`retenir.json`. La règle d'état honnête du dépôt est explicite : « *on ne fabrique pas un « à
retenir » pour meubler une colonne* » (`web/src/lib/retenir.ts:19-21`). **Cette spec n'en crée
aucun.** *Option, si le propriétaire la veut* (§15 Q9) : un `retenir.json` d'**une seule entrée**,
`{ "chapitre": 11, "formula": "F \\text{ sous-espace} \\iff 0_E \\in F \\text{ et } \\lambda u + \\mu v \\in F", "note": "…" }` —
le champ `chapitre` existe précisément pour les chapitres adressables par numéro.

### 12.2 « Pour t'entraîner » / `exercises.yaml` : rien dans cette vague, et pourquoi
La notion a deux exercices (`r-bac` = 2019 N, `r-variation`), tous deux accrochés au chapitre 10.
**Cette spec n'en ajoute pas**, pour une raison qui n'est pas la paresse : la seule annale qui pose
la **chaîne complète** (sous-groupe → sous-espace → **base**) est le sujet **2018 N Ex1**, dont la
fiche de transcription dit « ⚠ *Source retypée non-officielle — conversion en banque soumise à
arbitrage owner* ». **Tant que cet arbitrage n'est pas rendu, le chapitre s'appuie sur
`bk-2023-n-x5` q1-q2, déjà en banque** — et la clôture (§6.6) y renvoie. Si l'arbitrage tombe
favorablement, **2018 N Ex1 est le `r8-bac` naturel** et cette spec recommande de l'ouvrir alors.

### 12.3 « Noyau et image d'un morphisme » (cadre `:285`) : **oui, servi par ce chapitre**
L'audit demandait « *un paragraphe « noyau d'un morphisme de groupes = sous-groupe, et morphisme
injectif ⇔ noyau réduit au neutre », avec un exemple et un item* » (`cadre-couverture.md:91-92`).
**[C18] le sert intégralement** : les deux propriétés préalables ($f(e_E) = e_F$,
$f(x') = f(x)'$) démontrées en deux lignes, le noyau prouvé sous-groupe **par le critère du
chapitre 5**, l'équivalence avec l'injectivité démontrée, un exemple travaillé ($x \mapsto x^2$ sur
$\mathbb{R}^*$) et un item de synthèse (**SA-53**, le module sur $\mathbb{C}^*$).

**Pourquoi ici et non au chapitre 10** — et le coût de l'alternative : (1) le mot « noyau » doit
être défini **une seule fois**, et sa version « application linéaire » est **commandée par le
cadre** (`:296`) ; (2) le chapitre 10 porte déjà deux exemples travaillés, l'exercice bac et sa
variation ; (3) placé en clôture, le noyau **renvoie l'élève au chapitre 10** au lieu de
l'allonger. *L'alternative coûte exactement le même prix en renumérotation (zéro : un paragraphe
n'est pas un titre `## `)* — c'est donc un arbitrage purement pédagogique, et il revient au
propriétaire (§15 Q10). **Conséquence si l'on choisit ce chapitre :** la ligne `:285` passe de
**ABSENT (partiel)** à **couverte**, et `cadre-couverture.md` §2.1 doit être mis à jour à la
livraison (§14).

---

## 13. Ce qu'il ne faut PAS faire

1. **Ne pas renuméroter**, ne pas insérer ailleurs qu'à la fin, ne pas reformuler un titre existant
   « pendant qu'on y est ».
2. **Ne pas sceller `carte-chapitres` sans avoir lu le rouge.** Le rouge attendu est connu (§4.2) ;
   un rouge **différent** de celui-là veut dire qu'autre chose a bougé.
3. **Ne pas « corriger » le cadre.** `lesson_slug: null` sur `espaces_vectoriels` devra passer à
   `structures-algebriques` — c'est une **édition du propriétaire** sur un fichier autoritatif
   (§14, §15 Q1), pas un geste d'auteur.
4. **Ne pas convertir le sujet 2018** en banque sans l'arbitrage (§12.2).
5. **Ne pas inventer un chiffre d'examen.** Le seul chiffre sourçable est le barème relevé (0,25 pt
   et 0,5 pt sur 3,5) ; « 35 % » est le poids d'un bloc de deux sous-domaines.
6. **Ne pas faire de l'espace vectoriel un anneau.** Le $E$ du [C6] n'est **pas** stable pour
   $\times$ et ne contient pas $I$ ; le chapitre ne le prétend nulle part.
7. **Ne pas recycler** un objet du §6 dans un item, ni un objet de `bank.yaml` dans la prose.
8. **Ne pas ajouter une misconception non déclarée** : la porte échoue, et le modèle apprenant se
   remplit d'un id fantôme (`validate-content.mjs:457-466`).

---

## 14. Registres, sceaux et fichiers à mettre à jour à la livraison

**À éditer dans la notion** (au-delà des quatre fichiers de contenu) :
- `bank.yaml:144-175` (SCOPE NOTE 3) — la note dit « *à l'attention du pedagogy-architect si un pont
  explicite … est jugé utile* » : y écrire que le pont existe, et lequel.
- `bank.yaml:1448-1449` — « *q2 mobilise la notion de sous-espace vectoriel (chapitre antérieur,
  jamais enseigné dans lesson.md)* » : **devient faux à la livraison**.
- `bank.yaml:1490` — le `reasoning` de q2 dit « *mobilise une notion d'un chapitre antérieur du
  cursus … pas un outil neuf de ce chapitre* » : à réécrire en renvoyant au **chapitre 11**.
- `checkpoints.yaml:51-54` — le **garde-fou de périmètre** énumère les notions du chapitre et
  s'arrête à « morphisme / isomorphisme » : **édition obligatoire** (espace vectoriel, sous-espace,
  combinaison linéaire, famille libre/génératrice, base, dimension, application linéaire, noyau,
  image).
- `items.yaml` — `coverage_summary` (§11.0).

**Portes et sceaux à relancer puis à re-sceller** (aucun n'a été lancé ici) :
`validate-content.mjs` · `carte-chapitres.mjs --porte` puis `--sceller` ·
`couverture-diagnostique` (18 items de plus) · `rampe-bac` · `indice-longueur` · `indice-absolu` ·
`indice-refus` · `eleve-ruse` — **les six derniers portent un `.base.json` qui nomme cette
notion** : leur sceau **va bouger**, et c'est le but (il force la relecture).

**Registres à corriger (hors notion, propriétaire dans la boucle) :**
`docs/cadre/curriculum/maths-sm.yaml:289-298` (`lesson_slug`) et `:451-453` (`coverage_notes`) ·
`docs/audits/cadre-couverture.md:74-92` (§2.1, les deux entrées ABSENT) ·
`docs/audits/DETTE-CADRE.md:42` (ligne G2).

---

## 15. Questions au propriétaire — avec le défaut pris en l'absence de réponse

| # | question | défaut si pas de réponse |
|---|---|---|
| **Q1** | La ligne `maths-sm.yaml:293` est `research-consensus` sur un PDF **scanné**, et le cadre demande lui-même de la confirmer (`:718`). Deux sujets nationaux vérifiés la corroborent. **On construit ?** | **Oui** — l'attestation d'examen prime ; le risque est nommé, pas masqué. |
| **Q2** | **2018 N Ex1** (seule attestation d'une question « **base** ») est une source **retypée**, conversion « soumise à arbitrage owner ». On l'ouvre ? | **Non** — le chapitre enseigne la base (le cadre la nomme), mais la banque ne gagne rien tant que l'arbitrage n'est pas rendu. |
| **Q3** | **Théorème du rang** ($\dim\ker + \dim\mathrm{Im} = \dim E$) : le cadre ne le nomme pas. | **Exclu**, même comme vérification. |
| **Q4** | Espaces de **polynômes** / de fonctions comme exemples : le cadre ne les nomme pas, l'examen ne les a jamais posés. | **Exclus** ; seuls $\mathbb{R}^2$, $\mathbb{R}^3$, $M_2(\mathbb{R})$. |
| **Q5** | **Aucune leçon n'enseigne le calcul matriciel** ; il arrive par les rappels d'énoncé. On garde ce fonctionnement (comme l'examen) ou on ouvre une dette ? | **On le garde** ; la dette est signalée ici, pas payée. |
| **Q6** | **Somme et somme directe** de sous-espaces : hors du cadre écrit. | **Exclues.** |
| **Q7** | Le raccourci « famille libre de $n$ vecteurs en dimension $n$ ⇒ base » : admis ? | **Oui, admis et énoncé APRÈS la méthode directe**, jamais à sa place. |
| **Q8** | Le **manipulable** (deux vecteurs qui engendrent un plan s'effondrant en droite) : à armer ? | **Non dans cette vague** — la figure `svg+katex` suffit à ce que le chapitre tienne. |
| **Q9** | Créer un `retenir.json` (aujourd'hui inexistant) pour une seule entrée ? | **Non** — état honnête. |
| **Q10** | Le **noyau d'un morphisme de groupes** : ici (clôture du chapitre 11) ou en paragraphe au chapitre 10 ? Les deux coûtent zéro renumérotation. | **Ici** (§12.3). |
| **Q11** | Le chapitre s'appelle « Espaces vectoriels : sous-espace, base, dimension » — le titre est **lu par l'élève** dans le rail. Convient-il ? | Tel quel. |

---

## 16. Ce que je n'ai pas pu vérifier — dit, pas maquillé

1. **Aucune commande n'a été exécutée.** Tous les comptes du §1 et du §4.2 viennent de l'outil
   `Grep` (mode `count`, qui rend des **occurrences**) et de lectures directes. Les commandes en
   regard **reproduisent** ces relevés ; elles n'ont pas été lancées. **À re-mesurer avant
   édition.**
2. **Le comportement exact de la porte `carte-chapitres` sur un AJOUT en fin de liste** est **lu
   dans le code** (`:128-136`, `:149`), **pas observé**. Le texte annoncé au §4.2 est celui que le
   code produit à la lecture ; la première exécution reste la preuve.
3. **Les six sceaux `.base.json`** : je sais qu'ils **nomment** cette notion (grep) ; je n'ai pas
   ouvert chacun pour établir **ce qui, précisément, y bougera**. Le §14 dit « ils vont bouger »,
   pas « voici de combien ».
4. **Les numéros de ligne** datent de la lecture du 2026-09-28 ; `lesson.md`, `items.yaml` et
   `bank.yaml` de cette notion ont été édités plusieurs fois en septembre. **Re-vérifier chaque
   ancre avant d'écrire.**
5. **La ligne de cadre elle-même n'est pas vérifiée verbatim** (§0, Q1) : le PDF officiel est un
   scan sans couche texte.
6. **Je n'ai pas relu les 35 items existants un par un** ; j'ai lu l'inventaire des 9 misconceptions
   (`items.yaml:4-61`), le `coverage_summary` et deux items complets. **Le risque résiduel** : l'un
   des six ids neufs recoupe peut-être une face déjà portée par `cloture-non-verifiee` ou
   `generalisation-hative`. J'ai vérifié les **labels** des neuf, pas les 140 distracteurs.
7. **Le barème « 0,25 / 0,5 sur 3,5 »** est lu sur les transcriptions, pas sur un scan officiel
   pour 2018 (source retypée, §3.1).
