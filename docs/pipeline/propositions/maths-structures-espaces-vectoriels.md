# spec — les espaces vectoriels (Maths · `structures-algebriques`, **R8 = chapitre 11**)

**Statut : PROPOSITION RÉVISÉE le 2026-10-20 par pedagogy-architect, contre deux rapports de
critique, puis corrigée le même jour (révision (b)) contre une passe arithmétique indépendante**
(`docs/audits/critiques/espaces-vectoriels-arithmetique.md` : une erreur de mathématiques, SA-41,
et deux collisions, SA-50 et `r8-variation` — journal en fin de document). Première écriture :
2026-09-28. **Rien n'a été construit.**
Aucun fichier de la notion n'a été touché — ni `lesson.md`, ni `items.yaml`, ni `checkpoints.yaml`,
ni `bank.yaml`, ni `exercises.yaml`, ni `media/`. Aucun fichier du cadre non plus. Le seul fichier
écrit par cette session est le présent document.

> **RÉVISION 2026-10-20 — ce qui a changé, en une lecture.** Deux critiques ont rendu
> **BUILD AFTER FIXES**, chacune ayant recalculé **tous** les nombres (zéro erreur d'arithmétique
> trouvée des deux côtés) :
> `docs/audits/critiques/espaces-vectoriels-pedagogie.md` et
> `docs/audits/critiques/espaces-vectoriels-fidelite.md`.
> Six changements structurels en découlent — **le journal complet est en fin de document** :
> 1. **le critère du sous-espace passe à TROIS conditions** (non vide / stable pour $+$ / stable
>    pour $\cdot$), la forme que la banque vérifiée imprime et qui fait fonctionner la cascade
>    q1→q2 de l'examen ; $\lambda u + \mu v$ devient la **compaction**, énoncée après (F1, et I5 à
>    la racine) ;
> 2. **le chapitre gagne un sommet** : `r8-bac` (annale vérifiée `bk-2023-n-x5` q1-q2) et
>    `r8-variation` (un $E$ frais **qui contient $I$**, finissant sur « Montrer que $(I,J)$ est une
>    base ») — §12.2 ; la clôture ne pré-résout plus rien (B1, F3, F5, I12, I13) ;
> 3. **« combinaison linéaire » est défini**, et le **sous-espace engendré** est nommé en français
>    avant que $\mathrm{Vect}$ ne serve (B3, S1, S4) ;
> 4. **deux modèles d'erreur neufs déclarés** (M7 affine-vs-linéaire, M8 génération non vérifiée),
>    M1 resserré, six étiquettes corrigées, deux ruptures ajoutées (M5 par un quatrième pari, M3
>    par une mise en scène « prends position ») (B2, I4, I6, S5, S6) ;
> 5. **aucune affirmation de poids d'examen** ne subsiste, ni en prose ni dans le brief
>    (F2, F7) ;
> 6. **dix objets d'items refaits** pour collision de nombres ou pré-résolution, et la lecture
>    habileté ↔ difficulté désolidarisée sur quatre items (I7, I9, I10, F6, F8).

> ⚠ **AVERTISSEMENT D'INSTRUMENT, en tête.** Aucune commande shell n'a été exécutée. **Tous les
> faits chiffrés du §1 ont été relevés par lecture directe et par l'outil `Grep` ; la commande
> donnée en regard est celle qui les REPRODUIT, elle n'a pas été lancée ici.** Aucun nombre n'est
> attribué à une sortie que je n'ai pas lue. Ce que je n'ai pas pu vérifier est au §16.
> *Révision (b) du 2026-10-20 : cette passe-là a exécuté des commandes (scripts d'arithmétique
> exacte et `grep`) ; ce qu'elles ont re-mesuré est dit au §1.i, §1.k et dans le journal (b).*

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
| **g** | **AUCUNE ligne du dépôt ne cite « chapitre 11 » de cette notion.** Dans `content/maths/structures-algebriques/`, le motif `[Cc]hapitres? 11\b` rend **0**. (Les 31 occurrences de « chapitre 11 » du dépôt visent `pc/reactions-acido-basiques`, `pc/chute-mouvements-plans`, et deux documents d'audit.) *Re-mesuré le 2026-10-20 (b) : le « 31 » ne se reproduit plus — on compte aujourd'hui **37** occurrences hors de cette spec et de ses critiques (`pc/reactions-acido-basiques` 22, `pc/chute-mouvements-plans` 10, `maths-arithmetique-numeration.md` 3, `suites-numeriques/REVIEW` 1, `calcul-integral/spec-extension.md` 1) ; le dépôt a bougé. **Le 0 décisif, lui, tient.*** **C'est le fait qui décide du §4.** | `grep -rnoE '[Cc]hapitres? 11\b' content/maths/structures-algebriques/` ⇒ **0** |
| **h** | **Aucune autre notion ne cite un chapitre de celle-ci.** La forme croisée « chapitre N de « Titre » » ne rend **rien** pour cette leçon dans tout le dépôt. | `grep -rn 'chapitre [0-9]\+ de « [^»]*[Ss]tructures' .` ⇒ **0** |
| **i** | **Coût d'une insertion ailleurs, chiffré — en LIGNES.** `[Cc]hapitres? 10\b` dans la notion ⇒ **34 lignes** (bank 25, items 5, exercises 1, lesson 1, REVIEW 2). `[Cc]hapitres? (6\|7\|8\|9\|10)\b` ⇒ **97 lignes** (bank 47, items 32, lesson 13, exercises 1, checkpoints 1, REVIEW 3). *Libellé corrigé le 2026-10-20 (b) : ces chiffres sont des comptes de lignes (`grep -c`), pas d'occurrences. Les occurrences, re-mesurées par `grep -oE … \| wc -l`, sont **35** (REVIEW en porte 3 sur 2 lignes) et **110** (bank 58, REVIEW 5). Le coût réel d'une renumérotation est le second chiffre ; aucun des deux ne change la décision du §4.* | `grep -cE …` (lignes) et `grep -oE … \| wc -l` (occurrences), fichier par fichier, sur le dossier de la notion |
| **j** | **35 items, 9 modèles d'erreur, tous au-dessus du plancher 3.** `total_items: 35`, `floor: 3`, `floor_met: true` ; dernier id = **SA-35** ; `ramp_coverage` va de R0 à R7. | `items.yaml:2255-2339` |
| **k** | **Le champ `habilete` n'existe que sur les 9 items les plus récents** (SA-27…SA-35 : les huit de la « famille transport », SA-27…SA-34, **et SA-35**, `items.yaml:2194`) et sur les checkpoints. Les items neufs en portent un — précédent posé par la vague B2. *(Corrigé le 2026-10-20 (b) : la version précédente disait « 8 items, SA-27…SA-34 » et oubliait SA-35. Le `coverage_summary` d'`items.yaml` répète la même omission — « les seuls à porter l'étiquette `habilete` » — et devra être corrigé à la livraison, §14.)* | `grep -n 'habilete:' items.yaml` ⇒ 9 lignes d'item : SA-27, -28, -29, -30, -31, -32, -33, -34, -35 (une dixième ligne, `:2367`, est une mention dans la prose du `coverage_summary`) |
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
- **LE STANDARD DE TRI — écrit une fois, appliqué partout** *(ajouté à la révision du 2026-10-20 ;
  la critique de fidélité, S2, avait raison : le document tranchait Q3/Q4/Q6 et Q7 dans deux sens
  opposés sur le même motif « le cadre ne le nomme pas »)*. Le motif ne suffit pas, parce qu'il ne
  distingue pas deux choses très différentes. Le standard retenu est le **test de l'objet neuf** :
  1. **Un OBJET que le cadre ne nomme pas est EXCLU** — somme et somme directe de sous-espaces,
     matrice d'une application linéaire, rang d'une famille, théorème du rang, espaces de
     polynômes. Chacun ajoute une entité à apprendre, à noter, à reconnaître. (Q3, Q4, Q6.)
  2. **Une CONSÉQUENCE immédiate d'une notion que le cadre nomme est ADMISE, à condition d'être
     énoncée APRÈS la méthode directe et de ne jamais la remplacer** — « en dimension $n$, une
     famille libre de $n$ vecteurs est une base » est une conséquence de « dimension », mot
     imprimé au `programme:293`. Elle n'introduit aucun objet. (Q7.)
  Ce standard est **nommé dans la spec et appliqué deux fois dans des sens opposés en le disant** ;
  c'est la condition pour qu'il ne soit pas un arbitraire déguisé. → §15 Q7 porte la décision au
  propriétaire, avec ce standard comme défaut.
- **La discipline de l'OBSERVATION, empruntée au cadre lui-même.** `maths-sm.yaml:364` range les
  motifs de corpus dans un bloc `_observation_examens` étiqueté « **NI programme NI limite — motif
  OBSERVÉ, sans valeur de frontière** », et `:375` borne une observation à n=1 par « *à traiter
  comme une piste, pas comme un principe établi* ». **Toute régularité de corpus énoncée dans cette
  spec porte le même statut** et doit être rédigée au même registre dans la prose : « *dans tous
  les sujets que nous avons lus…* », jamais « *l'énoncé donne toujours…* ». (Correctif F7, §3.2.)

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

1. **L'énoncé OFFRE l'espace ambiant — motif OBSERVÉ, pas règle.** Trois sujets sur les huit
   transcrits ouvrent par « *on rappelle que $(M_n(\mathbb{R}),+,\cdot)$ est un espace vectoriel
   réel* », et **dans aucun des huit** le candidat n'a eu à démontrer qu'un ensemble **est** un
   espace vectoriel : il démontre qu'une partie en est un **sous-espace**.
   ⚠ **Statut de cette phrase, corrigé le 2026-10-20 (F7).** n = 3 attestations sur 8
   transcriptions : c'est une **observation de corpus**, au sens exact du bloc
   `_observation_examens` du cadre (`maths-sm.yaml:364` : « *NI programme NI limite — motif
   OBSERVÉ, sans valeur de frontière* »). **Interdit en prose :** « l'énoncé donne **toujours**
   l'espace », « on ne démontre **jamais** les huit axiomes ». **Rédaction imposée :** « *dans tous
   les sujets que nous avons lus, l'espace ambiant est donné par l'énoncé — la question porte sur
   une partie* ». *Conséquence de conception, qui ne change pas :* la rampe n'a aucun exercice
   « montrer que $(E,+,\cdot)$ est un espace vectoriel », et les huit axiomes sont énoncés une fois
   (bloc A) sans jamais être vérifiés.
2. **L'objet est toujours le même.** $E = \{M(a,b)\ /\ (a,b)\in\mathbb{R}^2\}$, une famille de
   matrices à **deux paramètres réels**, sous-ensemble de $M_2(\mathbb{R})$ (ou $M_3$).
3. **L'ordre est toujours le même, et l'algèbre linéaire OUVRE l'exercice** : sous-groupe additif
   → **sous-espace** → (2018) **base** → partie stable pour $\times$ → anneau → corps /
   isomorphisme. **Attesté deux fois** (2018 q1-q2, 2023 q1-q2), sur deux $E$ différents.
   *Cet enchaînement n'est plus RACONTÉ en prose : il est **marché** par les deux exercices du
   §12.2 (correctifs F3 et F5). La prose en dit la forme, pas les réponses.*
4. **La place est fixe : ces questions OUVRENT l'exercice, et la seconde roule sur la première.**
   C'est le seul fait de barème que cette spec porte, et il est **structurel**, pas quantitatif.
   ⚠ **Supprimé le 2026-10-20 (F2, bloquant).** La version du 2026-09-28 écrivait ici
   « **7,1 %** en 2023, **21,4 %** en 2018 … c'est peu … c'est **du point gratuit en début
   d'exercice**, ce qui est exactement l'argument à donner à l'élève ». Les pourcentages étaient
   justes (les deux critiques les ont recalculés) — **le défaut n'était pas l'arithmétique, c'était
   la destination** : une spec ne route pas un **jugement de poids** vers la prose vue par l'élève,
   et « point gratuit » est faux de surcroît (en 2023 q2 est courte **parce que** q1 est faite ; en
   2018 la paire inclut une vraie démonstration de base). Le relevé brut de barème
   (0,25 pt · 0,5 pt sur 3,5) **reste côté auteur**, au §16.7, comme provenance — **il n'entre ni
   en prose, ni en item, ni en retour de distracteur** (§10.4, §13.5).
5. **La cascade q1 → q2 est la forme réelle de la question — et elle appartient désormais au
   SOMMET, pas à la prose.** Le `reasoning` de `bk-2023-n-x5` q2 réutilise « *$E$ non vide (il
   contient $O$, question précédente), stable pour $+$ (déjà établi)* » et conclut, en note d'étape
   (`bank.yaml:1495`, `:1501`) : « *Deux des **trois** conditions d'un sous-espace vectoriel, déjà
   établies* » puis « *Non vide, stable pour $+$ et pour $\cdot$ : les **trois** conditions sont
   réunies* ».
   **Deux conséquences, toutes deux neuves au 2026-10-20 :**
   - **(F1, bloquant) le critère enseigné est celui-là** — trois conditions, parce que c'est la
     forme qui rend la cascade gratuite et c'est la forme que la banque imprime. Un critère en
     $\lambda u + \mu v$ rendrait la phrase « il ne reste que la loi externe » **fausse** (il
     faudrait tout réécrire), et mettrait la leçon en contradiction avec l'annale qu'elle cite.
     Voir §6.2.
   - **(F3) la prose ne dit plus ce qui reste à démontrer.** C'est exactement la réponse de
     `r8-bac` q2. La clôture (§6.6) énonce que l'ordre des questions est un outil, **sans dire ce
     qu'il donne**.
   C'est aussi la source de la misconception M2 (§8) : la situation d'examen la **fabrique**.

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

### 3.4 La preuve n'est PAS uniforme — ce que chaque moitié du chapitre a derrière elle

*Section ajoutée le 2026-10-20 sur la demande de la critique de fidélité (§3 de son rapport), qui
a montré que le risque de fondation traité au §0 comme un seul oui/non se répartit très
inégalement. C'est le fait qui **découpe** la question Q1 du propriétaire (§15).*

| moitié du chapitre | ce qui la soutient | niveau de preuve |
|---|---|---|
| rappel de l'espace ambiant ; **sous-espace par le critère** (bloc B) | **deux attestations d'examen verbatim**, barème en main (`bank.yaml:1488` ; `docs/sujets/maths/structures-algebriques.md:256`) | **le plus haut du dépôt** |
| **base** (moitié du bloc D) | **une attestation** (`docs/sujets/…:257`) — mais sur la source **retypée** 2018, dont la conversion est « soumise à arbitrage owner » (`:240`) | **moyen** |
| **famille libre / génératrice** (bloc C), **dimension** (l'autre moitié du bloc D), **application linéaire / noyau / image** (bloc E) | **la seule ligne de cadre** : `programme:293` est `research-consensus` sur un PDF **scanné**, `savoir_faire:295-296` sont `source: derived`. **Zéro attestation d'examen.** | **le plus bas** |

**Ce que j'en conclus, et ce que je refuse de conclure.** Je **ne** réduis **pas** l'enseignement de
la moitié non attestée : le cadre lie, même en `derived`, et un élève qui ne sait pas ce qu'est une
famille libre ne peut pas démontrer qu'une famille est une base — le savoir-faire attesté dépend du
non attesté. Mais **la charge de mesure suit la preuve** :
- le **sommet** (§12.2) porte sur la moitié **attestée** — sous-espace (annale 2023) et base
  (variation), jamais sur la dimension seule ;
- **le lot d'items reste équilibré** parce que les modèles d'erreur, eux, sont réels des deux
  côtés (M4 et M5 sont les deux plus gros, et ils vivent côté dimension) — mais **la part
  d'items assise sur la moitié non attestée est la première à revisiter** quand la porte 1 du
  cadre (`maths-sm.yaml:713`, relecture Gemini du cadre scanné) rendra son verdict ;
- **§15 Q1 est coupée en deux** (Q1a attesté / Q1b dérivé), et Q1b porte la charge d'items comme
  son enjeu explicite.

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
| **(b) au milieu, après « Sous-groupe »** (nouveau chapitre 6) | **97** lignes `chapitre 6..10` (bank 47, items 32, lesson 13, exercises 1, checkpoints 1, REVIEW 3 — dont **94 vues par la porte**, qui ignore les fichiers `REVIEW-*`) ; **110** occurrences (§1.i) | toutes à +1 | casse l'escalier groupe → anneau → corps au milieu |
| **(c) juste avant R7** (nouveau chapitre 10, R7 → 11) | **34** lignes `chapitre 10` (bank 25, items 5, exercises 1, lesson 1, REVIEW 2) ; **35** occurrences (§1.i) | toutes à réécrire en « 11 » | garde l'exercice bac en dernier |
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
3. **Le prérequis décisif est interne à la leçon.** Le critère du sous-espace est le critère du
   sous-groupe du chapitre 5 avec **une condition ÉCHANGÉE** : la troisième (le symétrique) est
   remplacée par la stabilité pour la loi externe, et c'est cet échange qui rend le symétrique
   gratuit (§6.2). Le chapitre s'ouvre sur un rappel qui existe **dans cette leçon, avec ses
   matrices et son vocabulaire** — pas dans une leçon voisine.
   ⚠ *Corrigé le 2026-10-20 (I5 de la critique pédagogique, F1 de la critique de fidélité, même
   défaut vu de deux côtés) : la version du 2026-09-28 écrivait « **moins une condition** ».
   C'était faux, et faux dans la direction dangereuse — dire « même liste, en moins » enseigne
   qu'un sous-espace est un sous-groupe **plus facile**, ce qui EST la misconception M2, rendue à
   l'élève dans la présentation du critère même. Trois conditions d'un côté, trois de l'autre ; ce
   qui change, c'est laquelle.*
4. **L'escalier reste intact.** Le fil groupe → groupe commutatif → anneau → intègre → corps →
   isomorphisme est l'épine dorsale de la leçon. Les espaces vectoriels sont un **autre axe** (une
   seconde loi dont le second opérande n'appartient même pas à l'ensemble). L'insérer au milieu
   (option b) couperait l'escalier au moment où il monte ; le poser **après** l'ouvre proprement
   comme *« la seconde structure que l'examen accroche à la première »*.
5. **L'objection — « le chapitre bac n'est plus le dernier » — se traite par un SECOND sommet, pas
   par une phrase.** Le chapitre 10 garde son exercice bac et sa variation ; **le chapitre 11 a
   désormais les siens** (`r8-bac` sur l'annale vérifiée `bk-2023-n-x5` q1-q2 et `r8-variation`,
   §12.2). Le chapitre **ouvre** en disant d'où il vient (« *la question que l'énoncé pose AVANT
   celle que tu viens de traiter* ») et **ferme sur une tentative**, pas sur un paragraphe de
   théorie. L'ordre du sommaire n'est pas l'ordre de l'énoncé, et le dire reste une leçon en soi —
   mais **ce n'était pas une réponse au vrai problème**.
   ⚠ *Corrigé le 2026-10-20 (I12 + B1). La critique pédagogique a eu raison sur le fond : la
   version du 2026-09-28 répondait dans le registre du **sommaire** à une objection qui portait
   sur l'**exigence de raisonnement**. Avec R7 se terminant sur un exercice bac et R8 sur de la
   théorie, la notion avait son sommet au milieu. Le placement (option d) reste le bon — les
   quatre arguments et le coût mesuré de b/c (97 et 34 renvois) tiennent ; c'est la **fin** du
   chapitre 11 qui était fausse, et elle est réparée au §12.2.*

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

**Trois précisions ajoutées le 2026-10-20 — elles bornent la règle ci-dessus, qui s'est révélée
trop vague pour être tenue.**

1. **La liste des interdits était incomplète : l'ensemble du SOMMET R7 en était absent.** La
   critique de fidélité (F6) a trouvé que l'item SA-50 prenait **deux éléments de l'ensemble de
   `r-bac`** ($F = \{M(x,y) = \left(\begin{smallmatrix}x&y\\0&x\end{smallmatrix}\right),\
   x \in \mathbb{R}_+^*,\ y \in \mathbb{R}\}$, `exercises.yaml:165`, jumelé à `bank.yaml:439`) :
   $\left(\begin{smallmatrix}1&1\\0&1\end{smallmatrix}\right) = M(1,1)$ et
   $\left(\begin{smallmatrix}2&2\\0&2\end{smallmatrix}\right) = M(2,2)$ en sont **membres**.
   **La liste d'interdits inclut désormais, explicitement : les ensembles des DEUX exercices de
   `exercises.yaml` (`r-bac` 2019 et `r-variation`), et leurs éléments nommés.**
2. **Objet sous étude ≠ outillage.** Ce qui est interdit, c'est de reprendre **l'objet d'une
   question** — l'ensemble, la famille, l'application dont on demande quelque chose. Les
   **matrices élémentaires** $E_{11}, E_{12}, E_{21}, E_{22}$, l'identité $I$, la matrice nulle
   $O$, la matrice $K = \left(\begin{smallmatrix}0&1\\1&0\end{smallmatrix}\right)$ sont de
   l'**outillage de notation** : une fois introduites, elles se réemploient librement, et c'est
   souhaitable (un élève doit retrouver son vocabulaire). *La frontière : un item ne doit pas être
   résoluble en se rappelant une CONCLUSION du §6.*
3. **Les beats ajoutés par la révision portent une LETTRE, pas un numéro neuf** — `[C6b]`,
   `[C9b]`, `[C10a]` — exactement pour que **aucun renvoi existant à `[C7]`, `[C8]`, `[C11]`… ne
   change de cible**. Les dix-huit objets `[C1]`–`[C18]` gardent leur numéro et, sauf mention
   explicite ci-dessous, leurs nombres (recalculés sans erreur par les deux critiques). **Trois
   objets sont REFORMULÉS sous le critère à trois conditions ([C3], [C5], [C6]) : les nombres ne
   changent pas, la rédaction change.**

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
$M_2(\mathbb{R})$. **Dans tous les sujets que nous avons lus, c'est l'énoncé qui pose l'espace
ambiant, en une phrase de rappel ; la question porte ensuite sur une partie.** Le dire
explicitement à l'élève lui épargne du temps d'examen.
⚠ *Rédaction corrigée le 2026-10-20 (F7). La version du 2026-09-28 écrivait « L'énoncé les donne
**toujours** ; on ne les démontre **jamais** ». Deux absolus sur n = 3 attestations : c'est une
observation de corpus, pas une frontière (§2, discipline `_observation_examens`). Un seul sujet
inédit la falsifierait, et l'élève aurait appris une règle qui n'existe pas.*

**Une phrase sur $M_3(\mathbb{R})$ — à écrire, pour une raison mesurée (F12).** Le rappel d'énoncé
existe aussi en $3\times3$ : `bk-2025-n-x4` ouvre par « *… et que $(M_3(\mathbb{R}),+,\cdot)$ est un
espace vectoriel réel* » (`bank.yaml:2063`). Un élève qui rencontre ce sujet rencontre un ambiant
que le chapitre ne lui a jamais montré. **Une phrase suffit** : « *le même rappel existe en
$3\times3$ : rien ne change au raisonnement, seule la taille des matrices change* ». **Interdit
d'aller plus loin** : ne pas calculer $\dim M_3(\mathbb{R})$, ne pas introduire $M_n$.

**[C2] — deux conséquences qui font tout le chapitre** (deux lignes, et elles expliquent l'échange
de condition qui vient) :
$$0\cdot u = (0+0)\cdot u = 0\cdot u + 0\cdot u \;\Longrightarrow\; 0_E = 0\cdot u,$$
(on ajoute l'opposé de $0\cdot u$ aux deux membres — c'est la simplification dans le groupe
$(E,+)$), puis
$$(-1)\cdot u + u = (-1)\cdot u + 1\cdot u = (-1+1)\cdot u = 0\cdot u = 0_E \;\Longrightarrow\; (-1)\cdot u = -u.$$
**Retiens la seconde :** *l'opposé est déjà un multiple.* C'est elle qui explique pourquoi le
critère du sous-espace **n'a pas à demander le symétrique** : la condition sur la loi externe le
donne gratuitement (§6.2).
⚠ *Phrase de chute corrigée le 2026-10-20 : elle disait « c'est elle qui fera tomber la troisième
condition du critère du sous-groupe ». Rien ne tombe — une condition est ÉCHANGÉE contre une autre
(I5, F1).*

### 6.2 Bloc B — le sous-espace, par le critère (le geste qui rapporte des points)

> ⚠ **BLOC ENTIÈREMENT REFORMULÉ LE 2026-10-20 — correctif F1, bloquant.** Le critère passe de
> **deux** conditions ($0_E \in F$ ; $\lambda u + \mu v \in F$) à **TROIS** (non vide ; stable pour
> $+$ ; stable pour $\cdot$). **Trois raisons, dont deux sont des faits du dépôt :**
> 1. **C'est la forme que la banque vérifiée imprime**, deux fois, en notes d'étape de la question
>    même que ce chapitre sert : « *Deux des **trois** conditions d'un sous-espace vectoriel, déjà
>    établies* » (`bank.yaml:1495`) et « *Non vide, stable pour $+$ et pour $\cdot$ : les **trois**
>    conditions sont réunies* » (`:1501`). Sous l'ancien critère, la leçon et l'annale qu'elle cite
>    auraient dit deux choses différentes du même objet.
> 2. **C'est la forme qui rend la cascade d'examen utilisable.** La q1 donne « sous-groupe », donc
>    « non vide » et « stable pour $+$ » sont acquises **telles quelles**, et la q2 n'a qu'une
>    condition à écrire. Sous le critère en $\lambda u + \mu v$, rien ne se récupère : il faut
>    réécrire une condition qui contient les deux.
> 3. **C'est la forme qui rend vrai ce que le chapitre veut dire du chapitre 5.** Chapitre 5 :
>    *neutre · stable pour $\star$ · symétrique*. Chapitre 11 : *non vide · stable pour $+$ ·
>    **stable pour $\cdot$***. La deuxième condition est **identique**, la troisième est
>    **échangée** — et c'est l'échange qui paie. « Même liste, en moins » était faux (I5).
> *Les nombres de [C3], [C5] et [C6] ne changent pas ; leur rédaction, oui. La version
> $\lambda u + \mu v$ n'est pas supprimée : elle devient la **compaction**, au [C6b].*

**Critère.** Soit $(E,+,\cdot)$ un espace vectoriel réel et $H$ une partie de $E$. Alors $H$ est un
**sous-espace vectoriel** de $(E,+,\cdot)$ **si et seulement si** :
1. $H \neq \varnothing$ — en pratique : **$0_E \in H$** ;
2. pour tous $u,v \in H$ : **$u + v \in H$** (stable pour la loi interne) ;
3. pour tout $u \in H$ et tout $\lambda \in \mathbb{R}$ : **$\lambda \cdot u \in H$** (stable pour
   la loi externe).

*Lettres : $E$ l'espace ambiant, $H$ la partie à tester — **exactement les lettres du chapitre 5**
(`lesson.md:296`, `:311-315`), parce que c'est exactement le même geste. Table des lettres au
§10.3.*

**L'échange, expliqué et non asséné.** Mets les deux critères côte à côte :

| | chapitre 5 — sous-groupe de $(E,\star)$ | chapitre 11 — sous-espace de $(E,+,\cdot)$ |
|---|---|---|
| 1 | $e \in H$ | $0_E \in H$ — **la même** |
| 2 | $x \star y \in H$ | $u + v \in H$ — **la même** |
| 3 | le symétrique $x'$ est dans $H$ | $\lambda \cdot u \in H$ — **échangée** |

**Et l'échange est un gain, pas un troc à l'aveugle** : la nouvelle troisième condition **contient**
l'ancienne, puisque $-u = (-1)\cdot u$ (bloc A, [C2]). *Autrement dit : dès qu'on a le droit de
multiplier par $-1$, le symétrique est gratuit — mais il faut avoir le droit, et ce droit est
précisément ce que la loi externe apporte.* Conséquence à dire à voix haute : **tout sous-espace est
un sous-groupe de $(E,+)$** ; la réciproque est fausse, et l'accroche vient d'en donner le
contre-exemple.

**[C3] — modèle familier : une droite du plan.** $D = \{(x,y) \in \mathbb{R}^2\ /\ y = 2x\}$.
- **non vide** : $(0,0) \in D$ car $2\times 0 = 0$ ✓ ;
- **stable pour $+$** : $u = (x,2x)$ et $v = (x',2x')$ dans $D$, alors
  $$u+v = (x+x',\ 2x+2x') = \big(\underbrace{x+x'}_{t},\ 2(x+x')\big) = (t,2t) \in D\ ✓$$
- **stable pour $\cdot$** : $\lambda u = (\lambda x,\ 2\lambda x) = (s, 2s)$ avec $s = \lambda x$
  ✓.

$D$ est un sous-espace : **une droite qui passe par l'origine**.

> **Annotation de raisonnement — OBLIGATOIRE, correctif I1.** *Ce qu'on cherche et pourquoi ce
> geste :* « appartenir à $D$ » ne veut dire qu'**une** chose — la seconde coordonnée vaut deux fois
> la première. Donc à chaque ligne, l'expert ne vérifie pas « est-ce dans $D$ ? » au hasard : il
> **fabrique la forme** $(t, 2t)$ en nommant $t$ ce qui occupe la première place, et il regarde si
> la seconde suit. *Nommer la nouvelle première coordonnée, c'est tout le geste ;* c'est le même
> au [C6], avec deux noms au lieu d'un.

**[C4] — premier contre-exemple : la même droite, décalée.**
$D' = \{(x,y)\ /\ y = 2x+1\}$. Test du vecteur nul : $2\times 0 + 1 = 1 \neq 0$, donc
$(0,0) \notin D'$ : **une ligne suffit à conclure**. *Corroboration (à donner, parce qu'un élève
doit voir que les deux échecs voyagent ensemble)* : $(0,1) \in D'$ et $(1,3) \in D'$, mais
$(0,1)+(1,3) = (1,4)$ et $2\times1+1 = 3 \neq 4$ : la stabilité pour $+$ tombe aussi.

**Ce que [C4] enseigne, et qui porte désormais un id : M7 (§8).** « *Une droite décalée est encore
une droite, donc encore un sous-espace* » est un modèle d'erreur à part entière — l'élève ne
s'arrête pas au test du zéro, il le **saute**, parce que l'objet *a l'air* linéaire. **Il est
rompu ici, et il est mesuré par trois items** (correctif I6 : une rupture revendiquée sans ligne au
registre était un défaut).

**[C5] — deuxième contre-exemple : celui qui casse la misconception principale** (précédé du **pari
n°2**, `[[checkpoint:cp-r8-pari-stabilite]]`, §7.2).
$X = \{(x,y) \in \mathbb{R}^2\ /\ xy = 0\}$, la réunion des deux axes.
*(Ensemble renommé $H \to X$ le 2026-10-20 : $H$ est désormais réservé à la partie générique du
critère — correctif F10.)*
- **non vide** : $(0,0) \in X$ car $0\times 0 = 0$ ✓ ;
- **stable pour $\cdot$** : pour tout $\lambda$, $\lambda(x,y) = (\lambda x, \lambda y)$ et
  $(\lambda x)(\lambda y) = \lambda^2 (xy) = \lambda^2 \times 0 = 0$ ✓ ;
- **stable pour $+$ : NON.** $(1,0) \in X$ ($1\times 0 = 0$) et $(0,1) \in X$ ($0\times 1 = 0$),
  tandis que $(1,0)+(0,1) = (1,1)$ et $1\times 1 = 1 \neq 0$ : **$(1,1) \notin X$** ✗.

**$X$ passe deux conditions sur trois et n'est pas un sous-espace.** *C'est ici, et nulle part
ailleurs, que se brise « contenir $0$ suffit » — et le critère à trois conditions rend la chute
LISIBLE : on voit exactement laquelle des trois tombe.*

**[C6] — l'objet travaillé, en habillage matriciel.**
$$V = \left\{ M(a,b) = \begin{pmatrix} a & a+b \\ a-b & b \end{pmatrix}\ /\ (a,b) \in \mathbb{R}^2 \right\} \subset M_2(\mathbb{R}).$$
*(Ensemble renommé $E \to V$ le 2026-10-20 : $E$ est l'espace ambiant générique du critère, et les
sujets appellent $E$ **leur** ensemble — trois sens pour une lettre, c'était le défaut F10. La
leçon garde $V$ ; les deux exercices du §12.2 gardent le $E$ de l'énoncé, et disent pourquoi.)*

1. **non vide** : $O = M(0,0) \in V$ (avec $a=b=0$, les quatre coefficients sont nuls) ✓ ;
2. **stable pour $+$** : soient $M(a,b), M(a',b') \in V$. Coefficient par coefficient,
$$M(a,b) + M(a',b') = \begin{pmatrix} a+a' & (a+b)+(a'+b') \\ (a-b)+(a'-b') & b+b' \end{pmatrix} = \begin{pmatrix} a+a' & (a+a')+(b+b') \\ (a+a')-(b+b') & b+b' \end{pmatrix} = M(a+a',\ b+b') \in V\ ✓$$
3. **stable pour $\cdot$** : pour $\lambda \in \mathbb{R}$,
$$\lambda \cdot M(a,b) = \begin{pmatrix} \lambda a & \lambda(a+b) \\ \lambda(a-b) & \lambda b \end{pmatrix} = \begin{pmatrix} \lambda a & \lambda a + \lambda b \\ \lambda a - \lambda b & \lambda b \end{pmatrix} = M(\lambda a,\ \lambda b) \in V\ ✓$$

**$V$ est un sous-espace vectoriel de $(M_2(\mathbb{R}),+,\cdot)$.**

> **Annotation de raisonnement — OBLIGATOIRE, correctif I1.** *La décision, dite à voix haute :*
> « appartenir à $V$ », c'est **avoir la forme $M(\cdot,\cdot)$** — deux paramètres libres, et les
> deux autres cases qui s'en déduisent. Donc à chaque ligne je ne compare pas des coefficients au
> hasard : je **cherche quels deux nombres joueraient le rôle de $a$ et de $b$**, je les lis sur la
> diagonale (cases $(1,1)$ et $(2,2)$, les deux seules où un paramètre apparaît **seul**), puis je
> vérifie que les deux cases restantes valent bien leur somme et leur différence. *Lire les
> paramètres là où ils sont seuls : c'est ce qui transforme une vérification en une lecture.*

*(Contrôles refaits en sens inverse : $(a+a')+(b+b') = (a+b)+(a'+b')$ ✓ ;
$(a+a')-(b+b') = (a-b)+(a'-b')$ ✓ ; $\lambda a + \lambda b = \lambda(a+b)$ ✓ ;
$\lambda a - \lambda b = \lambda(a-b)$ ✓.)*

**[C6b] — DEUX MOTS, avant d'aller plus loin : combinaison linéaire et sous-espace engendré**
*(beat NEUF, correctifs B3 + S1 + S4. Le cadre imprime « **combinaison linéaire** » au
`programme:293` et le document ne le définissait nulle part ; $\mathrm{Vect}$ arrivait en cours de
phrase au [C7] puis portait quatre items et un énoncé de checkpoint. Dans l'ordre des mots, ce beat
est la marche manquante.)*

**Combinaison linéaire.** Étant donnés des vecteurs $u_1, \dots, u_p$ de $E$, on appelle
**combinaison linéaire** de $u_1, \dots, u_p$ tout vecteur de la forme
$$\alpha_1 u_1 + \alpha_2 u_2 + \dots + \alpha_p u_p, \qquad \alpha_1,\dots,\alpha_p \in \mathbb{R}.$$
*Rien de plus : on multiplie chacun par un réel, et on additionne. Les deux lois du chapitre, dans
cet ordre.* **Sur du concret, et uniquement sur du concret déjà vu** — dans $\mathbb{R}^2$, avec
$u = (1,0)$ et $v = (0,1)$ : $(3,-2) = 3u + (-2)v$ est une combinaison linéaire de $u$ et $v$ ; et
sur la droite du [C3], tout point $(t,2t)$ est la combinaison $t \cdot (1,2)$ d'un seul vecteur.
> ⚠ **À NE PAS FAIRE ICI, et c'est délibéré :** ne pas écrire la décomposition de $M(a,b)$ sur deux
> matrices fixes. **C'est le geste du [C7]**, et [C7] est un exemple travaillé dont la révélation
> doit rester devant l'élève. *Règle de maison : on ne pré-résout ni un sommet ni un exemple
> travaillé — y compris dans le beat qui lui prépare le vocabulaire.*

**La compaction du critère** *(ce que l'ancienne version du §6.2 donnait comme critère, et qui est
en réalité un raccourci de rédaction)*. Les conditions 2 et 3 réunies disent exactement : **toute
combinaison linéaire de deux éléments de $H$ est dans $H$**, soit
$$\forall u,v \in H,\ \forall \lambda,\mu \in \mathbb{R} : \quad \lambda u + \mu v \in H.$$
*Pourquoi les deux sont équivalentes :* si 2 et 3 tiennent, alors $\lambda u \in H$, $\mu v \in H$,
donc leur somme aussi ; réciproquement, $\lambda = \mu = 1$ redonne 2, et $\mu = 0$ redonne 3.
**Mise en garde, à écrire noir sur blanc :** la forme compacte est **juste**, et elle est **plus
risquée à l'examen** — elle oblige à écrire en une ligne ce que le correcteur attend en trois, et
une erreur de regroupement y coûte tout. *À l'examen : les trois conditions, dans l'ordre. La forme
compacte sert à **comprendre** que ce sont bien les deux stabilités réunies.* Vérification du
regroupement, sur $V$ : avec $s = \lambda a + \mu a'$ et $t = \lambda b + \mu b'$,
$$\lambda M(a,b) + \mu M(a',b') = \begin{pmatrix} s & s+t \\ s-t & t \end{pmatrix} = M(s,t) \in V\ ✓$$
*(contrôle : $\lambda(a+b)+\mu(a'+b') = (\lambda a + \mu a') + (\lambda b + \mu b') = s+t$ ✓ ;
$\lambda(a-b)+\mu(a'-b') = s - t$ ✓.)*
*(Scalaires renommés $A,B \to s,t$ le 2026-10-20 : la version du 2026-09-28 les appelait $A$ et $B$,
**les noms de la base de $V$ deux paragraphes plus loin** — exactement la collision de lettres que
F10 relève.)*

**Le sous-espace engendré.** L'ensemble de **toutes** les combinaisons linéaires de
$u_1,\dots,u_p$ s'appelle le **sous-espace engendré** par la famille $(u_1,\dots,u_p)$. On le note
$\mathrm{Vect}(u_1,\dots,u_p)$.
*Le nom français d'abord, la notation ensuite : l'élève doit pouvoir lire «$\mathrm{Vect}$» comme
« l'ensemble de toutes les combinaisons » et non comme un symbole de plus.*
**Et c'est toujours un sous-espace** — les trois conditions, sur place :
1. $0_E = 0\,u_1 + \dots + 0\,u_p$ ✓ ;
2. $\big(\sum \alpha_i u_i\big) + \big(\sum \beta_i u_i\big) = \sum (\alpha_i + \beta_i) u_i$ ✓ ;
3. $\lambda \cdot \big(\sum \alpha_i u_i\big) = \sum (\lambda\alpha_i) u_i$ ✓.

**[C7] — le raisonnement d'expert, dit à voix haute.** Avant d'écrire une ligne, l'expert écrit
$M(a,b)$ **comme une combinaison linéaire** (le mot vient d'être défini, [C6b]) :
$$M(a,b) = a\begin{pmatrix}1&1\\1&0\end{pmatrix} + b\begin{pmatrix}0&1\\-1&1\end{pmatrix}$$
*(contrôle : $a\left(\begin{smallmatrix}1&1\\1&0\end{smallmatrix}\right) =
\left(\begin{smallmatrix}a&a\\a&0\end{smallmatrix}\right)$ ;
$b\left(\begin{smallmatrix}0&1\\-1&1\end{smallmatrix}\right) =
\left(\begin{smallmatrix}0&b\\-b&b\end{smallmatrix}\right)$ ; somme :
$\left(\begin{smallmatrix}a&a+b\\a-b&b\end{smallmatrix}\right)$ ✓)*
— et il **sait déjà** : $V$ est l'ensemble des combinaisons linéaires de deux matrices fixes
$A = \left(\begin{smallmatrix}1&1\\1&0\end{smallmatrix}\right)$ et
$B = \left(\begin{smallmatrix}0&1\\-1&1\end{smallmatrix}\right)$, c'est-à-dire
$V = \mathrm{Vect}(A,B)$ — **et un sous-espace engendré est un sous-espace, c'est démontré au
[C6b]**. *(Le [C7] CITE désormais ce résultat au lieu de l'importer : correctif B3.)*
**Mise en garde à écrire noir sur blanc :** à l'examen, la réponse qui rapporte le point est **le
critère rédigé, ses trois conditions dans l'ordre** ; le raccourci par le sous-espace engendré
n'est légitime que s'il est rédigé comme tel (« $V = \mathrm{Vect}(A,B)$, or un sous-espace
engendré est un sous-espace »). *L'expert s'en sert pour savoir où il va, pas pour écrire moins.*
*(La mention du barème « 0,25 pt » a été retirée de cette mise en garde le 2026-10-20 — F2 : la
phrase dit ce qui rapporte **le point**, sans en chiffrer la valeur.)*

### 6.3 Bloc C — combinaison linéaire, famille génératrice, famille libre

**Génératrice** : $(u_1,\dots,u_p)$ engendre $H$ si **tout** élément de $H$ s'écrit
$\alpha_1u_1+\dots+\alpha_pu_p$ — autrement dit si $H = \mathrm{Vect}(u_1,\dots,u_p)$, le
sous-espace engendré du [C6b]. Pour $V$ du [C6], la famille $(A,B)$ l'engendre, et le [C7] l'a déjà
écrit : $M(a,b) = aA + bB$.
**Mais attention à ce que cette facilité cache** : ici la famille génératrice se *lisait* sur la
définition de $V$. **Ce n'est pas toujours le cas, et il y a une méthode** — [C9b].

**Libre** : $(u_1,\dots,u_p)$ est libre si **la seule** combinaison nulle est la combinaison à
coefficients tous nuls. *Le mot qui compte est « la seule ».*

**[C8] — une famille libre dans $\mathbb{R}^3$.** $v_1 = (1,0,1)$, $v_2 = (1,1,0)$, $v_3 = (0,1,1)$.
$$\alpha v_1 + \beta v_2 + \gamma v_3 = (\alpha+\beta,\ \beta+\gamma,\ \alpha+\gamma) = (0,0,0)$$
$\Rightarrow \beta = -\alpha$ (1re), puis $\gamma = -\beta = \alpha$ (2e), puis
$\alpha + \gamma = 2\alpha = 0$ (3e) $\Rightarrow \alpha = 0$, donc $\beta = 0$ et $\gamma = 0$.
**Libre** ✓.

> **Annotation de raisonnement — OBLIGATOIRE, correctif I1.** *Pourquoi commencer par la première
> équation, et pas par n'importe laquelle :* je cherche l'équation qui contient **le moins
> d'inconnues** — ici les trois en contiennent deux chacune, donc j'en prends une, j'en tire une
> inconnue en fonction d'une autre ($\beta = -\alpha$), et je **reporte**. Le signal que la famille
> est libre arrive à la dernière ligne : une équation à **une seule** inconnue ($2\alpha = 0$). *Si
> au contraire la dernière ligne devenait « $0 = 0$ », ce serait le signal inverse — une inconnue
> reste libre, et la famille est liée.* **C'est la même décision qu'en résolvant un système au
> chapitre 2 : on avance là où il y a le moins de choses à porter.**

*(Contrôle indépendant, en résolvant la génération : en additionnant les trois
équations $\alpha+\beta = x$, $\beta+\gamma = y$, $\alpha+\gamma = z$ on obtient
$\alpha+\beta+\gamma = \tfrac{x+y+z}{2}$, d'où $\alpha = \tfrac{x-y+z}{2}$,
$\beta = \tfrac{x+y-z}{2}$, $\gamma = \tfrac{-x+y+z}{2}$ ; pour $(x,y,z) = (1,0,0)$ :
$\tfrac12 v_1 + \tfrac12 v_2 - \tfrac12 v_3 = (\tfrac12+\tfrac12-0,\ 0+\tfrac12-\tfrac12,\
\tfrac12+0-\tfrac12) = (1,0,0)$ ✓.)*

**[C9] — prends position, puis le contre-exemple.**
*(Beat REMIS EN SCÈNE le 2026-10-20 — correctif B2. La version du 2026-09-28 s'intitulait « le
contre-exemple qui casse « libre = pas de colinéarité » » : **le titre donnait le verdict avant que
l'élève s'engage**, et M3 se retrouvait sans aucune rupture mise en scène ni délégation écrite —
ligne non revendiquée au registre, donc échec. Choix retenu parmi les trois que la critique
proposait : **(b) remise en scène voix-test-rupture**, et non un quatrième pari — voir §7 pour le
motif.)*

**L'ordre imposé des trois temps, et il n'est pas négociable :**

1. **La voix du modèle, à la première personne, sans guillemets de dénonciation.** « *Pour savoir
   si une famille est libre, je regarde les vecteurs deux par deux : si aucun n'est le multiple
   d'un autre, ils sont indépendants. C'est ce que je fais toujours, et c'est rapide.* »
2. **Le test, sur un objet où le modèle se prononce.** $w_1 = (1,2,3)$, $w_2 = (2,1,0)$,
   $w_3 = (3,3,3)$. **Prends position avant de lire la suite : cette famille est-elle libre ?**
   Les vérifications que le modèle demande sont faites, et elles passent **toutes** : aucun vecteur
   n'est nul ; **aucun couple n'est colinéaire** — $w_1, w_2$ ($2/1 = 2$ mais $1/2 \neq 2$) ;
   $w_1, w_3$ ($3/1 = 3$ mais $3/2 \neq 3$) ; $w_2, w_3$ ($3/2 \neq 3/1$). *Le modèle conclut :
   libre.*
3. **La rupture, sur la conséquence du modèle lui-même.**
   $w_1 + w_2 = (1+2,\ 2+1,\ 3+0) = (3,3,3) = w_3$, donc
   $$1\cdot w_1 + 1\cdot w_2 + (-1)\cdot w_3 = (0,0,0)$$
   avec des coefficients **non tous nuls** : la famille est **liée**. *Le test par paires a dit
   oui ; la définition dit non. L'un des deux est faux, et ce n'est pas la définition.*

*Le test par paires est un test de **deux** vecteurs ; la liberté est une propriété de la famille
**entière**. Trois vecteurs peuvent se tenir deux à deux sans se tenir à trois.*
**Et la conséquence pratique, à dire :** le seul test qui ne se trompe pas est **le système** —
poser $\alpha w_1 + \beta w_2 + \gamma w_3 = 0$ et le résoudre jusqu'au bout. Ici la relation se
voyait ; **elle ne se voit pas toujours** (c'est exactement ce que l'item SA-44 demande, §11).

**[C9b] — l'autre moitié, enfin traitée : génératrice**
*(beat NEUF, correctifs I4 + S5. Le cadre pose les deux à poids égal — « *Étudier la
**liberté/génération** d'une famille* », `maths-sm.yaml:296` — et la version du 2026-09-28 donnait
une phrase de définition à la génération, « c'est la définition même de $E$ … sans un calcul de
plus », contre un contre-exemple travaillé, un id de misconception et cinq items pour la liberté.
Côté items, la génération en comptait **zéro** : le savoir-faire était **non mesurable**.)*

**La méthode, nommée** — et c'est la même économie qu'au [C4] : *pour prouver qu'une famille
engendre, il faut partir d'un élément **quelconque** et l'écrire ; pour prouver qu'elle n'engendre
pas, **un seul** élément sans antécédent suffit.*

**(i) Elle engendre — la paramétrisation DONNE les générateurs.**
$W = \{(x,y,z) \in \mathbb{R}^3\ /\ y = 2x\}$. Un élément quelconque de $W$ s'écrit $(x, 2x, z)$,
et
$$(x,2x,z) = x\,(1,2,0) + z\,(0,0,1),$$
donc $W = \mathrm{Vect}\big((1,2,0),\ (0,0,1)\big)$ : la famille engendre $W$, et on ne l'a pas
devinée — **on l'a lue sur la solution de l'équation.** *C'est le geste transférable du chapitre :
une partie donnée par une équation, on résout pour une lettre, et les générateurs se lisent sur la
paramétrisation.* **Le [C14] appliquera exactement cette méthode** (correctif I1 : elle y était
faite sans être nommée).

**(ii) Elle n'engendre pas — un témoin suffit.** Dans $\mathbb{R}^3$, la famille
$\big((1,2,0),\ (0,1,3)\big)$ est **libre** : $\alpha(1,2,0) + \beta(0,1,3) = (\alpha,\ 2\alpha+\beta,\ 3\beta) = (0,0,0)$
donne $\alpha = 0$ (1re coordonnée) et $\beta = 0$ (3e) ✓. **Et elle n'engendre pas
$\mathbb{R}^3$** : si $(0,0,1) = \alpha(1,2,0) + \beta(0,1,3)$, la 1re coordonnée donne
$\alpha = 0$, la 2e donne alors $\beta = 0$, et la 3e donnerait $0 = 1$ — impossible. **$(0,0,1)$
n'a pas d'antécédent.**

**Ce que ces deux moitiés enseignent, et c'est le mécanisme de tout le bloc D :** *libre* et
*génératrice* sont **deux questions séparées**, et aucune ne donne l'autre. Une famille peut être
libre sans engendrer (ii), et engendrer sans être libre ([C12]). **C'est pour cela qu'une base
demande les deux.**
**Le modèle d'erreur correspondant porte désormais un id : M8 (§8)** — « *une famille a l'air de
couvrir, donc elle engendre* », rompue ici et au [C11], mesurée par trois items.

### 6.4 Bloc D — base et dimension

**Base** = famille **libre** ET **génératrice**. **Dimension** = le nombre de vecteurs d'une base
(admis : toutes les bases d'un même espace de dimension finie ont le même nombre de vecteurs).

**[C10a] — « mais pourquoi exiger LIBRE ? » — la question que l'élève pose, et sa réponse**
*(beat NEUF, correctif I3. La version du 2026-09-28 définissait la base comme « libre ET
génératrice » et ne répondait nulle part à l'élève qui demande : si la famille engendre, elle
écrit déjà tout vecteur — à quoi sert la liberté ? La réponse existait dans le document, mais au
[C17], à la toute fin du bloc E, et présentée comme « la révélation du chapitre » plutôt que comme
le motif de la définition. **Test du template : un élève peut-il demander « mais pourquoi ? » et
trouver la réponse dans le barreau ?** Il peut, maintenant, et à l'endroit où la définition
tombe.)*

**La réponse en un mot : l'UNICITÉ de l'écriture.** Une famille génératrice garantit qu'on peut
écrire tout vecteur. **Une famille libre garantit qu'on ne peut l'écrire que d'une seule façon** —
et c'est cette unicité qui fait des coefficients des **coordonnées**, donc qui fait d'un nombre de
vecteurs une **dimension**.

- **Libre $\Rightarrow$ une seule écriture.** Si $\alpha_1u_1 + \dots + \alpha_pu_p =
  \beta_1u_1 + \dots + \beta_pu_p$, alors
  $(\alpha_1-\beta_1)u_1 + \dots + (\alpha_p-\beta_p)u_p = 0_E$ ; la famille étant libre, tous les
  coefficients de cette combinaison sont nuls, donc $\alpha_i = \beta_i$ pour tout $i$. **Une seule
  écriture.**
- **Liée $\Rightarrow$ au moins deux écritures, et on les exhibe.** Dans $\mathbb{R}^2$, prends
  $t_1 = (1,4)$, $t_2 = (3,1)$ et $t_3 = (4,5)$. Alors $t_1 + t_2 = (1+3,\ 4+1) = (4,5) = t_3$, donc
  le vecteur $(4,5)$ s'écrit **de deux façons** dans la famille $(t_1,t_2,t_3)$ :
  $$1\cdot t_1 + 1\cdot t_2 + 0\cdot t_3 = (4,5) = 0\cdot t_1 + 0\cdot t_2 + 1\cdot t_3.$$
  *(Le couple $(t_1,t_2)$ est libre : $\alpha(1,4) + \beta(3,1) = (\alpha+3\beta,\ 4\alpha+\beta) =
  (0,0)$ donne $\alpha = -3\beta$ puis $-12\beta + \beta = -11\beta = 0$, donc
  $\alpha = \beta = 0$ ✓.)* **Deux jeux de coefficients pour un même vecteur : « les coordonnées »
  ne veulent plus rien dire.**

*Voilà ce que la liberté achète : non pas la capacité d'écrire, mais le **droit de parler de
coordonnées**. Et c'est de ce droit que vient le mot « dimension ».*

**[C10] — la base de $V$ et sa dimension.** Avec $A = M(1,0) = \left(\begin{smallmatrix}1&1\\1&0\end{smallmatrix}\right)$
et $B = M(0,1) = \left(\begin{smallmatrix}0&1\\-1&1\end{smallmatrix}\right)$ :
- **génératrice** : $M(a,b) = aA + bB$ pour tous $a,b$ — c'est [C7] ;
- **libre** : $\alpha A + \beta B = \left(\begin{smallmatrix}\alpha & \alpha+\beta\\ \alpha-\beta & \beta\end{smallmatrix}\right) = O$
  donne $\alpha = 0$ (coefficient en haut à gauche) et $\beta = 0$ (en bas à droite) ✓.

**$(A,B)$ est une base de $V$, donc $\dim V = 2$.** *Remarque à faire : ici $A \neq I$, et
$I \notin V$ (il faudrait $a = 1$ et $b = 1$, mais alors le coefficient en haut à droite vaudrait
$a+b = 2 \neq 0$). **La base n'est pas « $(I,J)$ » par nature** — c'est ce que le calcul donne.*
**Et la contrepartie, à écrire (correctif F5) :** *parfois elle l'est* — les deux sujets attestés
travaillent justement sur un $E$ qui **contient $I$**, avec $(I,J)$ pour base. **C'est exactement
la configuration des deux exercices du §12.2** : l'élève la rencontre là, en la produisant
lui-même, et non en la lisant. *L'anti-motif du [C10] reste nécessaire — sinon « la base, c'est
$(I,J)$ » devient une recette — mais il ne doit pas être la seule configuration jamais vue.*

**[C11] — la réponse du pari n°3 : $\dim M_2(\mathbb{R}) = 4$**
(`[[checkpoint:cp-r8-pari-notation]]`, §7.3 — **le pari se place AVANT ce beat**).
*(Beat REMIS EN SCÈNE le 2026-10-20 — correctif B2, ligne non revendiquée. La version du
2026-09-28 énonçait « $\dim M_2(\mathbb{R}) = 4$ (et non 2) » puis « *le « 2 » de $M_2$ est l'ordre
des matrices, pas la dimension* » : un paragraphe qui **pose la bonne idée à côté de la mauvaise**
ne coche pas la case « rompue » — et M5 était l'id portant la charge d'items la plus lourde, sans
une seule rupture. Choix retenu : **(a) un quatrième point d'engagement**, parce que M5 se
diagnostique sur un **nombre**, donc se prête à un pari à quatre faces.)*

$E_{11} = \left(\begin{smallmatrix}1&0\\0&0\end{smallmatrix}\right)$,
$E_{12} = \left(\begin{smallmatrix}0&1\\0&0\end{smallmatrix}\right)$,
$E_{21} = \left(\begin{smallmatrix}0&0\\1&0\end{smallmatrix}\right)$,
$E_{22} = \left(\begin{smallmatrix}0&0\\0&1\end{smallmatrix}\right)$ :
- **génératrice** : $\left(\begin{smallmatrix}x&y\\z&t\end{smallmatrix}\right) = xE_{11}+yE_{12}+zE_{21}+tE_{22}$
  ✓ ;
- **libre** : cette combinaison vaut $O$ exactement quand $x=y=z=t=0$ ✓.

**$\dim M_2(\mathbb{R}) = 4$.** *Le « 2 » de $M_2$ est l'ordre des matrices, pas la dimension de
l'espace.* Et $V$ du [C10] est un sous-espace de **dimension 2 dans un espace de dimension 4** :
**un sous-espace n'hérite pas de la dimension de son ambiant** — il en hérite seulement une
**borne**.

**Et il faut tuer la quatrième face du pari, celle qui a l'air raisonnable (correctif I4/S5).**
Pourquoi $(I, E_{12}, E_{21})$ — trois matrices qui « couvrent » la diagonale et les deux coins —
**n'engendre pas** $M_2(\mathbb{R})$ :
$$\alpha I + \beta E_{12} + \gamma E_{21} = \begin{pmatrix} \alpha & \beta \\ \gamma & \alpha \end{pmatrix},$$
et les deux coefficients diagonaux y sont **forcément égaux** : la matrice
$\left(\begin{smallmatrix}1&0\\0&2\end{smallmatrix}\right)$ n'est pas atteinte. *Une famille qui a
l'air de toucher toutes les cases peut tout de même rater l'essentiel — c'est M8, et c'est
pourquoi « génératrice » se **démontre** sur un élément quelconque ([C9b]).*

**[C12] — le pari n°4, puis le contre-exemple des paramètres**
(`[[checkpoint:cp-r8-pari-dimension]]`, §7.4). $u = (1,2,-1)$, $v = (2,1,1)$,
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

**[C14] — une équation coûte une dimension, et c'est la méthode du [C9b] qui le montre.**
$P = \{(x,y,z) \in \mathbb{R}^3\ /\ x+y+z = 0\}$.
- **Sous-espace**, par les trois conditions : $(0,0,0)$ vérifie l'équation ✓ ; si $x+y+z = 0$ et
  $x'+y'+z' = 0$ alors $(x+x')+(y+y')+(z+z') = 0$ ✓ ; et
  $\lambda x + \lambda y + \lambda z = \lambda(x+y+z) = 0$ ✓.
- **Base, par la méthode nommée au [C9b]** : on résout l'équation pour une lettre, $z = -x-y$, et
  les générateurs **se lisent** sur la paramétrisation :
  $$(x,\ y,\ -x-y) = x\,(1,0,-1) + y\,(0,1,-1),$$
  famille génératrice ; libre car $\alpha(1,0,-1)+\beta(0,1,-1) = (\alpha,\ \beta,\ -\alpha-\beta) = (0,0,0)$
  donne $\alpha = \beta = 0$ ✓.

**$\dim P = 2$** : un plan passant par l'origine dans un espace de dimension 3.
*(C'est ici que vient la seconde figure, `[[figure:echelle-dimensions-r3]]` — §9.)*

> **Annotation de raisonnement — OBLIGATOIRE, correctif I1.** *La méthode, en une phrase à retenir,
> et elle sert partout :* **une partie décrite par une ÉQUATION se transforme en partie décrite par
> des PARAMÈTRES** — on résout pour la lettre la plus facile à isoler, on réécrit l'élément
> quelconque avec les lettres restantes, et **les générateurs sont les vecteurs qui multiplient ces
> lettres**. Il n'y a rien à deviner. *(Et le compte suit : trois lettres, une équation, deux
> paramètres — deux générateurs. C'est le sens de « une équation coûte une dimension ».)*

**Raccourci, énoncé APRÈS la méthode directe et jamais avant** (admis) : *dans un espace de
dimension $n$, une famille libre de $n$ vecteurs est une base ; une famille génératrice de $n$
vecteurs aussi.* Sert de **vérification**, pas de dispense de calcul. → §15 Q7.

**Le standard qui autorise ce raccourci, et le piège qu'il faut nommer dans la même phrase**
*(correctif S2).* Le raccourci est admis parce qu'il n'introduit **aucun objet neuf** : c'est une
conséquence de « dimension », mot imprimé par le cadre (standard de tri, §2). **Mais il se lit à
l'envers neuf fois sur dix, et la prose doit le dire :**
- ce qu'il dit : « *libre* **et** $n$ vecteurs en dimension $n$ » $\Rightarrow$ base ;
- ce qu'il ne dit pas : « $n$ vecteurs en dimension $n$ » $\Rightarrow$ libre. **Trois vecteurs de
  $\mathbb{R}^3$ ne sont pas libres parce qu'ils sont trois** — [C9] vient d'en donner trois qui ne
  le sont pas.
*La liberté reste l'hypothèse ; le compte n'est que la conclusion.* **Cette phrase est obligatoire**
parce qu'un distracteur de SA-42 est bâti exactement sur la lecture inverse, et qu'un chapitre ne
peut pas sanctionner une erreur qu'il n'a pas prévenue.

### 6.5 Bloc E — applications linéaires, noyau et image

**Définition.** $f : E \to E'$ est **linéaire** si $f(\lambda u + \mu v) = \lambda f(u) + \mu f(v)$
pour tous $u,v \in E$ et $\lambda,\mu \in \mathbb{R}$.
*(Espace d'arrivée noté $E'$ et non $F$ depuis le 2026-10-20 — correctif F10 : $F$ est l'ensemble
concret du chapitre 5, repris à l'accroche.)*
**Deux conséquences immédiates, à tirer tout de suite parce qu'elles servent aux deux beats
suivants :** $f(0_E) = 0_{E'}$ (prendre $\lambda = \mu = 0$) et
$f(u - v) = f(u) - f(v)$ (prendre $\lambda = 1$, $\mu = -1$).

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

> **Annotation de raisonnement — OBLIGATOIRE, et c'est la plus importante des cinq
> (correctif I1).** D'où sort l'antécédent $(s+t,\ t,\ 0)$ ? **Il n'est pas tombé du ciel, et la
> prose ne doit pas laisser croire qu'il s'est deviné.** Le raisonnement, dit à voix haute :
> *« Je veux résoudre $f(x,y,z) = (s,t)$, c'est-à-dire $x - y = s$ et $y - z = t$. **Deux
> équations, trois inconnues** : il me reste un degré de liberté, donc je **choisis** la valeur la
> plus commode pour tuer une variable — je prends $z = 0$. La seconde équation donne alors
> $y = t$, et la première $x = s + y = s + t$. Je remonte, j'obtiens $(s+t,\ t,\ 0)$, et je
> **vérifie** en recalculant $f$ dessus. »* **Il faut dire les trois temps : compter les degrés de
> liberté, choisir, remonter.** *Un antécédent qui apparaît sans son choix enseigne à l'élève que
> les experts devinent.*

**Et l'équivalence qui sert partout : $f$ injective $\iff \ker f = \{0_E\}$** *(ajoutée le
2026-10-20 — correctif S3 : le [C17] s'appuyait dessus, et elle n'était démontrée qu'au [C18], un
beat plus loin et **dans l'autre catégorie**, celle des groupes).*
Démonstration, deux lignes, avec la seconde conséquence du [C15] :
$$f(u) = f(v) \iff f(u) - f(v) = 0_{E'} \iff f(u-v) = 0_{E'} \iff u - v \in \ker f.$$
Donc si $\ker f = \{0_E\}$, alors $u - v = 0_E$, soit $u = v$ : $f$ est injective. Et
réciproquement, si $f$ est injective, tout $u$ de $\ker f$ vérifie $f(u) = 0_{E'} = f(0_E)$, donc
$u = 0_E$.
*Statut à dire honnêtement : **ce n'est pas un théorème nommé par le cadre** — c'est une
conséquence de la définition du noyau, et elle est **démontrée ici, pas admise** (standard de tri,
§2).*

**[C17] — la révélation du chapitre : la paramétrisation EST une application linéaire.**
$\varphi : \mathbb{R}^2 \to M_2(\mathbb{R})$, $\varphi(a,b) = M(a,b)$ (le $V$ du [C6]).
- $\varphi$ est linéaire : c'est **mot pour mot** le calcul du [C6b],
  $\varphi\big(\lambda(a,b) + \mu(a',b')\big) = \varphi(s,t) = M(s,t) = \lambda M(a,b) + \mu M(a',b')$
  avec $s = \lambda a + \mu a'$ et $t = \lambda b + \mu b'$ ;
- $\ker \varphi = \{(a,b)\ /\ M(a,b) = O\} = \{(0,0)\}$ (lecture directe des coefficients
  $(1,1)$ et $(2,2)$) **— c'est exactement « $(A,B)$ est libre »** ;
- $\mathrm{Im}\,\varphi = V$ **— c'est exactement « $(A,B)$ est génératrice »**.

**Donc : « $(A,B)$ est une base de $V$ » et « $\varphi$ est une bijection de $\mathbb{R}^2$ sur
$V$ » sont la même phrase** — et maintenant c'est **démontré** et non asserté : l'injectivité vient
de $\ker\varphi = \{(0,0)\}$ par l'équivalence ci-dessus, la surjectivité de
$\mathrm{Im}\,\varphi = V$. Et $\dim V = 2 = \dim \mathbb{R}^2$.
*C'est le même geste de transport qu'au chapitre 10, sur une structure d'espace au lieu d'une
structure de groupe.* **Interdit de nommer la chose** : le mot « isomorphisme d'espaces
vectoriels » n'est pas imprimé par le cadre ; on dit « une bijection linéaire », on renvoie au
chapitre 10 pour l'idée de transport, et on n'introduit pas un objet de plus (standard de tri,
§2 ; correctif S3).

**[C18] — le même mot dans l'autre monde : le noyau d'un morphisme de groupes** *(sert la lacune de
cadre `maths-sm.yaml:285`, voir §12.3)*. Soit $f : (E,\star) \to (E',\top)$ un morphisme de
groupes, de neutres $e_E$ et $e_{E'}$. *(Lettre d'arrivée $F \to E'$ le 2026-10-20 — F10.)*
**Le gain du beat : le même mot, le même geste, dans la catégorie d'à côté — et c'est l'équivalence
du [C16] qui se rejoue, ligne pour ligne.**
- $f(e_E) = e_{E'}$ : $f(e_E) \top f(e_E) = f(e_E \star e_E) = f(e_E)$, et on compose par le
  symétrique de $f(e_E)$ ;
- $f(x') = \big(f(x)\big)'$ : $f(x) \top f(x') = f(x \star x') = f(e_E) = e_{E'}$ ;
- $\ker f = \{x \in E\ /\ f(x) = e_{E'}\}$ est un **sous-groupe de $(E,\star)$** — les trois
  conditions du **chapitre 5**, sans une de plus : $e_E \in \ker f$ ; si $f(x) = f(y) = e_{E'}$
  alors $f(x \star y) = e_{E'} \top e_{E'} = e_{E'}$ ; et $f(x') = (f(x))' = e_{E'}' = e_{E'}$ ;
- **$f$ est injective $\iff \ker f = \{e_E\}$** : si $f(x) = f(y)$ alors
  $f(x \star y') = f(x) \top (f(y))' = e_{E'}$, donc $x \star y' \in \ker f = \{e_E\}$, donc
  $x = y$.

**Exemple travaillé (original, distinct de l'item SA-53) :** $f : (\mathbb{R}^*,\times) \to
(\mathbb{R}^*,\times)$, $f(x) = x^2$. Morphisme : $(xy)^2 = x^2y^2$ ✓.
$\ker f = \{x \in \mathbb{R}^*\ /\ x^2 = 1\} = \{1,-1\}$ — **un sous-groupe à deux éléments**
($1 \in$ ; $(-1)\times(-1) = 1 \in$ ; chacun est son propre inverse), donc $f$ **n'est pas
injective** ($f(2) = f(-2) = 4$). Et $\mathrm{Im}\,f = \mathbb{R}^*_+ \neq \mathbb{R}^*$ : **l'image
n'est pas non plus l'ensemble d'arrivée tout entier.**

### 6.6 Clôture — l'ordre des questions est un outil (et on ne dit pas ce qu'il donne)

> ⚠ **SECTION RÉÉCRITE LE 2026-10-20 — correctif F3, bloquant.** La version du 2026-09-28 écrivait,
> en clôture de chapitre : « *il demande le **sous-groupe**, puis le **sous-espace** — et **il ne
> reste alors que la loi externe à traiter*** », avec renvoi à `bk-2023-n-x5` Partie I q1-q2.
> **Cette phrase EST la réponse de la question 2 de l'annale** — celle qui est désormais le sommet
> du chapitre (§12.2). Un sommet pré-résolu dans la prose qui le précède n'est plus un sommet.
> *Règle de maison appliquée : on ne pré-résout ni un sommet ni un exemple travaillé.*

**Trois phrases, et aucune ne donne une réponse :**
1. **L'énoncé pose l'espace ambiant** avant de poser sa question — c'est le rappel de tête que tu
   as lu trois fois (accroche).
2. **Les questions sont ordonnées, et cet ordre est une information.** Quand un sujet demande une
   chose, puis une chose voisine sur **le même** ensemble, la seconde question n'est jamais
   indépendante de la première : *avant de rédiger, relis ce que tu viens d'établir et demande-toi
   ce qui, dans la liste des trois conditions, est déjà acquis.* **C'est un geste de lecture, pas
   un résultat ; le résultat, c'est à toi de le trouver — maintenant, sur le sujet qui suit.**
3. **La suite de l'exercice sort de ce chapitre** : l'énoncé enchaîne sur la stabilité pour
   $\times$ (chapitre 7) et sur l'isomorphisme (chapitre 10). *Le chapitre 11 ouvre l'exercice ; il
   ne le ferme pas.*

**Puis les deux exercices** — `[[exercise:r8-bac]]` et `[[exercise:r8-variation]]`, spécifiés au
§12.2. **Le chapitre se termine sur une tentative, pas sur un paragraphe.**

### 6.7 Où monte l'exigence, où tombe l'étai

*Table refaite le 2026-10-20 (correctif I2 : deux lignes de l'ancienne version promettaient dans la
colonne « ce que l'élève fait seul » des actions que rien dans la livraison ne déclenchait — « il
voit la différence », « il calcule un noyau » — alors que l'élève ne faisait que lire. Une colonne
« ce que l'élève fait seul » ne peut contenir que ce qu'un **marqueur** lui demande.)*

| bloc | ce qui est donné | ce que l'élève fait seul — et par quel marqueur |
|---|---|---|
| accroche [C1] | l'ensemble, déjà traité au chapitre 5 | **rien n'est donné** : il parie avant toute définition — `cp-r8-pari-scalaire` |
| A [C2] | les axiomes, énoncés ; deux conséquences démontrées | il lit (bloc d'exposition assumé, aucun engagement) |
| B critère, [C3], [C4] | le critère à trois conditions, deux exemples rédigés | il suit, et il voit les trois conditions se détacher une à une |
| B [C5] | **le pari, avant la réponse** | il tranche sur un ensemble qui passe deux conditions sur trois — `cp-r8-pari-stabilite` |
| B [C6], [C6b], [C7] | le calcul matriciel intégral, les deux mots, le raccourci d'expert | il refait le regroupement de la compaction |
| C [C8], [C9], [C9b] | un système résolu, une mise en scène, une méthode nommée | **il prend position** sur la famille du [C9] avant la rupture (engagement rhétorique, non instrumenté — motif au §7.5) |
| D [C10a], [C10] | le motif de la définition, puis la base de $V$ | il suit la démonstration d'unicité |
| D [C11] | **le pari, avant la réponse** | il tranche sur $\dim M_2(\mathbb{R})$ — `cp-r8-pari-notation` |
| D [C12] | **le pari, avant la réponse** | il tranche sur la dimension d'un $\mathrm{Vect}$ sur-paramétré — `cp-r8-pari-dimension` |
| D [C13], [C14] | deux pièges rédigés, la méthode appliquée | il suit ; la figure 2 lui range les dimensions |
| E [C15]–[C18] | la définition, les contre-exemples, l'équivalence démontrée, un noyau non nul | il lit (bloc d'exposition assumé — délégation écrite au §7.5) |
| **sommet** `r8-bac` | l'énoncé d'un sujet national, **rien d'autre** | **il rédige** une démonstration de sous-groupe puis de sous-espace, avant toute correction |
| **sommet** `r8-variation` | un énoncé frais, même chaîne | **il rédige**, et finit sur « *Montrer que $(I,J)$ est une base* » |

**L'exigence monte en trois crans mesurables :** *parier* (accroche → bloc D) → *suivre une
rédaction* (blocs B, C, D, E) → **produire une rédaction** (les deux sommets). *L'étai tombe à la
dernière ligne du chapitre, et c'est la première fois que le lot R8 demande autre chose qu'un
choix.*

---

## 7. Les QUATRE points d'engagement — énoncés, choix et clés exacts

Format, champs et conventions : ceux de `checkpoints.yaml` (`rung`, `habilete`, `skill_code`,
`tags`, `primary_misconception`, `item_source`, `lesson_placement`, `stem`, `type: mcq`, `choices`
avec **exactement un** `correct: true` — porte dure, `validate-content.mjs:59`). **Les checkpoints
ne comptent pas dans le plancher ≥3** (`items.yaml:2256-2261`).

> **AJOUT DU 2026-10-20 — le champ `habilete` était listé et jamais rempli (correctif m1).** Le
> vocabulaire des checkpoints de cette notion **n'est pas** celui des items : `checkpoints.yaml`
> emploie `raisonnement` et `utilisation` (`:68`, `:146`, `:216`, `:289`, `:362`, `:439`), là où
> les items emploient `application_directe` / `application_non_explicite` / `synthese`.
> **Valeurs imposées, une par checkpoint :**
> `cp-r8-pari-scalaire` → **`raisonnement`** (l'élève doit décider si une structure voisine
> répond à la question — aucune application d'un procédé) ·
> `cp-r8-pari-stabilite` → **`raisonnement`** (deux conditions passent, il faut inférer sur la
> troisième) ·
> `cp-r8-pari-notation` → **`utilisation`** (compter une base dans un espace de référence :
> l'usage direct d'une définition qui vient d'être posée) ·
> `cp-r8-pari-dimension` → **`raisonnement`** (il faut voir qu'un générateur est redondant).

### 7.1 `cp-r8-pari-scalaire` — `rung: R8`, `habilete: raisonnement`, `lesson_placement: in_R8_accroche`, `item_source: original`
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

### 7.2 `cp-r8-pari-stabilite` — `habilete: raisonnement`, `lesson_placement: in_R8_critere`, `item_source: original`
`primary_misconception: mc.math.structures_algebriques.sous-espace-zero-suffit`
*Placé après l'énoncé du critère (trois conditions) et le contre-exemple de la droite décalée,
**avant** la réponse du [C5]. Ensemble renommé $H \to X$ — F10.*

> **Énoncé.** Dans $\mathbb{R}^2$, on pose $X = \{(x,y) \in \mathbb{R}^2\ /\ xy = 0\}$ — les points
> qui sont sur au moins un des deux axes. **Deux des trois conditions se vérifient en une ligne :**
> $(0,0) \in X$ (non vide) ; et pour tout réel $\lambda$, $(\lambda x)(\lambda y) = \lambda^2 xy = 0$,
> donc $\lambda(x,y)$ reste dans $X$ (stable pour la loi externe). **$X$ est-il un sous-espace
> vectoriel de $\mathbb{R}^2$ ?** Prends position avant de lire la suite.

| choix | texte | clé | modèle |
|---|---|---|---|
| A | Oui : le vecteur nul y est et la multiplication par un réel n'en sort pas — le critère est rempli. | ✗ | `sous-espace-zero-suffit` (M1) |
| **B** | **Non : $(1,0)$ et $(0,1)$ sont dans $X$, mais leur somme $(1,1)$ n'y est pas, car $1 \times 1 = 1 \neq 0$.** | **✓** | — |
| C | Oui : la somme de deux points d'un même axe reste sur cet axe, donc $X$ est stable pour l'addition. | ✗ | `generalisation-hative` |
| D | Oui : $X$ contient le vecteur nul et l'opposé de chacun de ses points — les conditions du sous-groupe sont remplies, donc c'est un sous-espace. | ✗ | `sous-espace-vs-sous-groupe` (M2) |

**Clé : B.**
*Deux étiquettes corrigées le 2026-10-20 (correctif I6).* **C passe de M2 à
`generalisation-hative`** : la glose de la spec décrivait déjà le bon modèle (« *la prémisse de C
est vraie et son inférence fausse* ») tout en posant l'étiquette d'un autre — un élève qui choisit
C a vérifié **un cas particulier** (deux points du même axe) et généralisé, ce qui est exactement
`generalisation-hative`, pas une liste de contrôle transportée. **D est réécrit** pour porter
vraiment M2 : la liste du sous-groupe, cochée, et la loi externe jamais atteinte comme condition à
part entière. *(L'ancien D — « on peut tester, $(1,0)+(2,0) = (3,0)$… » — était une seconde face de
`generalisation-hative`, ce qui privait le checkpoint de toute face M2.)*
**Retours à écrire :** pour C, dire que les deux points **peuvent vivre sur des axes différents** ;
pour D, dire que les opposés sont effectivement là — **et que ce n'est pas la question** : $X$ est
bien un sous-groupe de $(\mathbb{R}^2,+)$ ? *Non* — et c'est le piège du piège : $X$ n'est même pas
stable pour $+$, donc pas un sous-groupe non plus. **La prémisse de D est partiellement fausse, et
le retour doit le dire sans détour.**

### 7.3 `cp-r8-pari-notation` — `habilete: utilisation`, `lesson_placement: in_R8_base`, `item_source: original`
`primary_misconception: mc.math.structures_algebriques.dimension-lue-sur-la-notation`

> **CHECKPOINT NEUF — correctif B2, ligne non revendiquée.** M5 portait la charge d'items la plus
> lourde du lot **sans une seule rupture mise en scène** : le [C11] se contentait d'énoncer
> « $\dim M_2(\mathbb{R}) = 4$ (et non 2) ». Un énoncé posé à côté d'une erreur ne la rompt pas.
> *Placé après [C10] ($\dim V = 2$, comptée sur une base) et **avant** la réponse du [C11].*

> **Énoncé.** Tu viens de compter une base de $V$ : deux matrices, donc $\dim V = 2$. La question
> porte maintenant sur l'espace tout entier. **Quelle est la dimension de $M_2(\mathbb{R})$ ?**
> Prends position avant de lire la suite.

| choix | texte | clé | modèle |
|---|---|---|---|
| A | $2$ : c'est l'indice de $M_2$, l'ordre des matrices. | ✗ | `dimension-lue-sur-la-notation` (M5) |
| **B** | **$4$ : il faut quatre matrices fixes pour écrire $\left(\begin{smallmatrix}x&y\\z&t\end{smallmatrix}\right)$, et aucune des quatre ne s'obtient à partir des trois autres.** | **✓** | — |
| C | $2$ : $V$ est de dimension $2$ et $V \subset M_2(\mathbb{R})$ ; un sous-espace et son espace ont la même dimension. | ✗ | `dimension-lue-sur-la-notation` (M5) |
| D | $3$ : les trois matrices $I$, $\left(\begin{smallmatrix}0&1\\0&0\end{smallmatrix}\right)$ et $\left(\begin{smallmatrix}0&0\\1&0\end{smallmatrix}\right)$ suffisent à tout écrire. | ✗ | `famille-generatrice-non-verifiee` (M8) |

**Clé : B.**
*Pourquoi B dit « aucune des quatre ne s'obtient à partir des trois autres » et pas « quatre
coefficients » :* **une option qui atteindrait $4$ en comptant les cases donnerait la bonne réponse
avec le mauvais modèle** — c'est la contamination de la bonne réponse, et elle se corrige sur
l'énoncé, jamais sur le distracteur (§11.2). La clé **doit** confesser le bon raisonnement (une
base : génératrice **et** libre).
⚠ **Ce que cela ne règle pas — écrit le 2026-10-20 (b), passe arithmétique.** Un élève qui tient
**M4** (« la dimension, c'est le nombre de lettres ») compte les quatre lettres de
$\left(\begin{smallmatrix}x&y\\z&t\end{smallmatrix}\right)$ et **atteint B quand même** : aucune
autre option ne dit $4$. **On ne peut pas changer le nombre** — $\dim M_2(\mathbb{R}) = 4$ est le
fait enseigné. **Pourquoi c'est accepté, et à quelles conditions :** (1) sur $M_2(\mathbb{R})$, les
quatre lettres sont des coordonnées **libres** ; compter les lettres y coïncide avec compter une
base, et l'élève saute une vérification qui se trouve être vraie. M4 est **muet** sur cet objet,
il n'y donne pas un mauvais nombre ; (2) le checkpoint **ne porte pas M4** : ses faces fausses
sont M5 (A, C) et M8 (D). Une réponse B n'est donc lue comme l'absence d'aucun modèle que l'item
prétend diagnostiquer ; (3) M4 est rompu **au pari suivant**, `cp-r8-pari-dimension`, sur un objet
où compter donne $3$ contre $2$. Il est aussi mesuré par huit items où le compte et la dimension
diffèrent (§11.0). Ajouter une option « $4$ : il y a quatre coefficients » ne serait **pas** un
remède : sa conclusion est juste et sa raison défendable, puisque les quatre coefficients sont
libres. On aurait alors deux bonnes réponses.
**Prémisse de D, vérifiée ici** (et c'est ce que le [C11] va utiliser) :
$\alpha I + \beta\left(\begin{smallmatrix}0&1\\0&0\end{smallmatrix}\right) + \gamma\left(\begin{smallmatrix}0&0\\1&0\end{smallmatrix}\right) = \left(\begin{smallmatrix}\alpha&\beta\\\gamma&\alpha\end{smallmatrix}\right)$,
dont les deux coefficients diagonaux sont **forcément égaux** : la famille rate
$\left(\begin{smallmatrix}1&0\\0&2\end{smallmatrix}\right)$. *Le retour de D doit donner ce
témoin — une famille qui « a l'air de couvrir » ne couvre pas.*

### 7.4 `cp-r8-pari-dimension` — `habilete: raisonnement`, `lesson_placement: in_R8_dimension`, `item_source: original`
`primary_misconception: mc.math.structures_algebriques.dimension-compte-parametres`
*Placé après la réponse du [C11] ($\dim M_2(\mathbb{R}) = 4$), **avant** la réponse du [C12].*

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

### 7.5 Les QUATRE décisions de NE PAS armer — écrites à côté de ce qui est armé

*Le registre du §8 compte huit modèles ; quatre sont rompus par un pari instrumenté (§7.1–7.4).
Pour les quatre autres, la décision est écrite ici — **le silence vaudrait ligne non revendiquée,
donc échec** (correctif B2).*

| id | comment il est rompu | pourquoi pas de pari instrumenté |
|---|---|---|
| **M3** `famille-libre-mal-testee` | **[C9], remis en scène** en voix-test-rupture : le modèle parle à la première personne, ses deux vérifications passent, la définition le contredit. L'élève **prend position** en prose (« cette famille est-elle libre ? ») | **Option (b) de la critique, retenue.** Un pari instrumenté exigerait que l'élève tranche *avant* de connaître la définition de « libre », posée deux paragraphes plus haut : le pari porterait sur un mot neuf, pas sur un modèle installé. **La rupture est réelle, l'engagement est rhétorique, et c'est écrit.** *Contrepartie assumée : M3 est le seul des quatre modèles de la moitié haute du chapitre sans mesure d'engagement — les **cinq** items qui le portent en font donc toute la mesure : **SA-42, SA-43 et SA-44** où il est la cible, plus **SA-45 D** et **SA-50 D** où il est une face de distracteur (en double étiquette avec M8 pour SA-50). Et **SA-44 est bâti exprès avec une relation invisible** (I10) pour que le lot ne soit pas trois fois le même geste. (Corrigé le 2026-10-20 (b) : le texte disait « ses trois items (SA-42/43/44) », alors que le §11.0 en compte cinq.)* |
| **M6** `noyau-toujours-nul` | **[C16]** exhibe un noyau de dimension 1 et l'équivalence injectivité ⟺ noyau trivial, **démontrée** | **Délégation au banc d'items, maintenue** (décision du 2026-09-28, validée par les deux critiques). Quatre items le diagnostiquent (SA-48, SA-51, SA-52, SA-53). Un cinquième pari alourdirait une fin de chapitre qui porte déjà deux exercices. |
| **M7** `sous-espace-affine-confondu` | **[C4]** (la droite décalée, le test du zéro qui tombe en une ligne) + **[C15]** ($g(x,y) = (x+1,y)$ qui rate l'origine) + **l'étape 2 de la figure** | **Pas de pari : la rupture est à deux lignes du coût zéro.** « $2\times 0 + 1 = 1 \neq 0$ » est si court qu'un engagement préalable n'ajouterait pas de tension — et le chapitre en porte déjà quatre. *Trois items (SA-38, SA-40, SA-48) le mesurent. **Plancher à exactement 3, sans marge** : signalé au §15 Q12.* |
| **M8** `famille-generatrice-non-verifiee` | **[C9b] (ii)** (une famille libre qui n'engendre pas, avec son témoin) + **[C11]** (la face D du pari n°3, tuée par un témoin) | **Pas de pari dédié, mais une FACE de pari :** le modèle est l'option D de `cp-r8-pari-notation`, donc il est bien engagé par l'élève — simplement pas comme cible principale d'un checkpoint. *Trois items (SA-47, SA-49, SA-50). **Plancher à exactement 3, sans marge** : §15 Q12.* |

---

## 8. L'inventaire des modèles d'erreur — HUIT ids, une face chacun

Préfixe **vérifié** dans le fichier de la notion : `mc.math.structures_algebriques.<slug>`
(`items.yaml:6`, `:19`, `:58`…). **Porte dure** : tout id cité par un distracteur doit être déclaré
dans `items.yaml.misconceptions` (`validate-content.mjs:457-520`).

> **CE QUI A CHANGÉ AU REGISTRE LE 2026-10-20.** Six ids étaient déclarés ; il y en a huit.
> **Deux ajouts**, et les deux pour la même raison — le document **revendiquait** la rupture et ne
> portait pas la ligne, ce qui est le défaut exact que le registre existe pour empêcher
> (correctifs I6, I4, S5, S6) :
> - **M7 `sous-espace-affine-confondu`** — le modèle que [C4] casse depuis la première écriture
>   (« décalé, ça reste une droite, donc un sous-espace »), et qui faisait porter à M1 des
>   distracteurs qui ne lui appartenaient pas ;
> - **M8 `famille-generatrice-non-verifiee`** — le modèle du côté *génération*, savoir-faire que le
>   cadre nomme à égalité avec la liberté (`:296`) et que le lot d'items ne mesurait **pas du
>   tout**.
>
> **Et une RÈGLE OPÉRATOIRE, écrite parce qu'elle était appliquée sans être dite (correctif I6).**
> Les étiquettes de M1 et de M2 se recouvraient : la parenthèse de M1 (« *ou la seule stabilité que
> j'ai su tester* ») avalait tout le cas de M2. Deux ids qu'on ne peut pas distinguer à la lecture
> de leurs libellés produisent un modèle apprenant illisible. **La frontière, désormais explicite :**
> | ce que l'élève a fait | id |
> |---|---|
> | il s'est arrêté au **test du zéro** | **M1** |
> | il a coché la **liste d'une structure voisine** (sous-groupe, sous-anneau) — la loi externe n'est jamais entrée dans son raisonnement comme condition à part entière | **M2** |
> | il a **sauté** le test du zéro parce que l'objet *avait l'air* linéaire (une droite, un plan, une équation à constante) | **M7** |
> | il a vérifié **un cas particulier** ou **des exemples** et généralisé | `generalisation-hative` (id existant) |
> | il a affirmé qu'une famille **engendre** sans l'avoir écrit sur un élément quelconque | **M8** |
> | il a vérifié **deux conditions sur trois** (le zéro **et** $+$) et conclu, sans atteindre la troisième — celle qui porte les opposés | `axiome-oublie` (id existant) — *ajouté le 2026-10-20 (b), sert SA-38 D* |
> | il a **supposé** qu'une opération ne fait pas sortir de l'ensemble (souvent parce qu'une autre loi, ou un autre cas, n'en sortait pas), sans jamais le tester | `cloture-non-verifiee` (id existant) — *ajouté le 2026-10-20 (b), sert SA-36 D et SA-41 D* |
> | il a pris pour neutre **le nombre d'une autre structure** (le $0$ de $+$ dans un groupe multiplicatif) au lieu de celui de la loi en jeu | `neutre-non-transporte` (id existant) — *ajouté le 2026-10-20 (b), sert SA-53 C ; ajustement imparfait, dit au §11.1* |
>
> *Les trois dernières lignes viennent de la passe arithmétique du 2026-10-20 (rapport, §3). Elle a
> montré que quatre distracteurs étiquetés M2 n'étaient **pas produits** par M2 : SA-36 D, SA-38 D,
> SA-53 C, et SA-37 D, qui ne l'est pas par M2 seul. Un id existant de la notion décrivait mieux leur
> mécanisme. Ces quatre étiquettes ont été corrigées (§11.1).*

### M1 · `mc.math.structures_algebriques.sous-espace-zero-suffit`
- **label** *(resserré le 2026-10-20 — la parenthèse est supprimée)* — « Le test du zéro suffit :
  $0_E \in H$, donc $H$ est un sous-espace. »
- **mécanisme (une face)** — l'élève lit le critère comme une **liste d'indices suffisants** au lieu
  d'une **conjonction** : dès que la condition la plus facile passe — « le vecteur nul y est » — il
  conclut et s'arrête. Le geste s'arrête au premier ✓, et le premier ✓ est **toujours le même**.
- **contredit** — le critère est une conjonction de **trois** conditions. $X = \{(x,y)\ /\ xy = 0\}$
  contient $(0,0)$ **et** résiste à toute multiplication par un réel — deux sur trois — et n'est
  pourtant pas un sous-espace, car $(1,0)+(0,1) = (1,1) \notin X$. *Le critère à trois conditions
  rend ce diagnostic lisible : on nomme laquelle est tombée.*
- **formes d'item qui le diagnostiquent** — une partie qui **passe** le test du zéro (et souvent
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
  d'avance : $\dim V = 2$ dans $M_2(\mathbb{R})$ de dimension 4 ; $\dim P = 2$ dans $\mathbb{R}^3$.
- **rompu par** — `cp-r8-pari-notation` (§7.3), **puis** la réponse du [C11]. *(Avant la révision
  du 2026-10-20, M5 n'avait aucune rupture : seul un énoncé posé à côté de l'erreur.)*
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
  $\ker$ et $\mathrm{Im}$ ; un morphisme de groupes à noyau fini non trivial ; **un distracteur qui
  DISQUALIFIE une application linéaire au motif qu'elle n'est pas injective** (face ajoutée le
  2026-10-20 : elle sert SA-48, et c'est le quatrième item de M6 demandé par I9).

### M7 · `mc.math.structures_algebriques.sous-espace-affine-confondu` — **ID NEUF (2026-10-20)**
- **label** — « C'est une droite (un plan, une équation du premier degré) : donc c'est un
  sous-espace. »
- **mécanisme (une face)** — l'élève ne s'arrête pas au test du zéro : **il le saute**, parce que
  l'objet a la *forme* d'un sous-espace. Le modèle est visuel et il est puissant : une droite
  décalée **ressemble** à une droite ; une équation $x+y+z = 1$ ressemble à $x+y+z = 0$ ; une
  fonction affine s'appelle « linéaire » dans le langage courant. *La racine est que le mot
  « linéaire » du collège (fonction affine, graphe droit) survit sous le mot « linéaire » du
  chapitre.*
- **contredit** — le terme constant déplace l'objet **hors de l'origine**, et toute la structure
  s'effondre : $D' = \{y = 2x+1\}$ ne contient pas $(0,0)$ ([C4]) ; $g(x,y) = (x+1,y)$ vérifie
  $g(0,0) = (1,0) \neq (0,0)$ et n'est donc pas linéaire ([C15]). **Le test du zéro est une ligne,
  et c'est la ligne que ce modèle fait sauter.**
- **formes d'item** — une partie définie par une équation **à second membre non nul** parmi des
  candidates homogènes ; une application avec un terme constant parmi des applications linéaires ;
  un distracteur qui dit « *chaque coordonnée est du premier degré, donc c'est linéaire* ».
- **rompu par** — [C4], [C15], étape 2 de la figure 1. **Décision de ne pas armer un pari :
  §7.5.** **Plancher à exactement 3 items** (SA-38, SA-40, SA-48) — §15 Q12.

### M8 · `mc.math.structures_algebriques.famille-generatrice-non-verifiee` — **ID NEUF (2026-10-20)**
- **label** — « Cette famille couvre tout : ses vecteurs touchent toutes les coordonnées (ou il y
  en a assez), donc elle engendre. »
- **mécanisme (une face)** — l'élève traite « génératrice » comme une **inspection** et non comme
  une **résolution** : il regarde si les vecteurs proposés *ont l'air* de remplir les cases, ou si
  leur nombre *semble* suffisant, et il n'écrit jamais l'élément quelconque comme combinaison. *La
  racine : la génération est presque toujours offerte par la définition de l'ensemble (comme au
  [C6]), donc l'élève n'a jamais eu à la démontrer — il croit qu'elle se lit.*
- **contredit** — $\big(I,\ \left(\begin{smallmatrix}0&1\\0&0\end{smallmatrix}\right),\ \left(\begin{smallmatrix}0&0\\1&0\end{smallmatrix}\right)\big)$
  touche les quatre cases de $M_2(\mathbb{R})$ et **n'engendre pas** : la combinaison vaut
  $\left(\begin{smallmatrix}\alpha&\beta\\\gamma&\alpha\end{smallmatrix}\right)$, donc
  $\left(\begin{smallmatrix}1&0\\0&2\end{smallmatrix}\right)$ est hors d'atteinte ([C11]). Et
  $\big((1,2,0),(0,1,3)\big)$ est **libre** sans engendrer $\mathbb{R}^3$ ([C9b]) : **la liberté ne
  donne pas la génération.**
- **formes d'item** — une famille proposée comme base d'un sous-espace, dont la combinaison impose
  une relation cachée entre coefficients ; « cette famille engendre-t-elle ? » avec le bon compte
  de vecteurs mais une relation entre eux ; un distracteur qui déduit la génération de la liberté.
- **rompu par** — [C9b] (ii), [C11], et la face D de `cp-r8-pari-notation`. **Plancher à exactement
  3 items** (SA-47, SA-49, SA-50) — §15 Q12.

### 8.9 Ce que je NE déclare PAS — dette écrite à côté de ce qui est armé

*Liste révisée le 2026-10-20 : elle en comptait quatre, les deux premiers sont **sortis** (l'un
déclaré, l'autre réaffecté), et un cinquième entre.*

1. ~~**« Une droite décalée est encore un sous-espace »**~~ → **DÉCLARÉ : c'est M7.** Le document le
   rompait en prose ([C4]) tout en faisant porter ses distracteurs à M1, étiquette fausse.
2. ~~**« Une famille a l'air de couvrir, donc elle engendre »**~~ → **DÉCLARÉ : c'est M8.**
3. **« Une réunion de sous-espaces est un sous-espace »** — vrai sur chaque morceau, faux sur la
   réunion. **Traité dans la PROSE** ([C5]) et porté **comme distracteur** par SA-37 C sous
   l'étiquette `generalisation-hative` (prémisse vraie — chaque droite *est* un sous-espace —,
   inférence fausse). *C'est honnête sans être parfait : l'étiquette dit le MÉCANISME de l'erreur
   (généraliser une vérification partielle), pas son CONTENU. S'il fallait déclarer un neuvième id,
   ce serait celui-là, et il faudrait +3 items.*
4. **« Prouver un sous-espace, c'est revérifier les huit axiomes »** — l'erreur coûteuse, pas
   fausse. *Corrigé le 2026-10-20 (b) :* le texte disait qu'elle apparaît comme distracteur de
   SA-41 (C, « les quatre axiomes du groupe, puis les huit de l'espace vectoriel »). C'était vrai
   pour la version du 2026-09-28. **Ce n'est plus vrai depuis la refonte de SA-41 en révision (a)**,
   ni après la révision (b). **Elle n'est portée par aucun distracteur du lot** : c'est de la dette
   pure, non mesurée.
5. **« Le noyau vit dans l'ensemble d'arrivée »** ($\ker f = \{1\}$ pris côté image).
6. **« $\lambda u = 0 \Rightarrow \lambda = 0$ ET $u = 0$ »** (au lieu de « ou »).

**Le coût de ne pas déclarer, chiffré :** quatre modèles restants × 3 items de plancher = **+12
items**, soit un lot R8 à 30 items sur 65 — ce que le §15 Q11 soumet déjà au propriétaire pour 18.
*La décision n'est donc pas « ces modèles n'existent pas », c'est « le budget d'items s'arrête
là ».*

---

## 9. Médias — ce que le concept demande vraiment, et rien de plus

**DEUX figures sont nécessaires** — c'était une, à quatre étapes, et l'étape 4 enseignait la
dimension **deux blocs avant** qu'elle ne soit définie (correctif I11).

- **`[[figure:sous-espaces-plan]]` — `type: structural-diagram` · `tool: svg+katex`. REQUIS.**
  Livrable : `media/sous-espaces-plan.svg` + `media/sous-espaces-plan.stages.json`
  (même gabarit que `echelle-structures.stages.json` : `{"slug", "stages":[{"caption"}]}`).
  **TROIS étapes** *(l'ancienne quatrième part dans la figure suivante)* :
  1. la droite $y = 2x$ dans le plan, avec **les trois conditions dessinées** : l'origine est
     dessus ; la somme de deux de ses points y reste ; le multiple d'un de ses points y reste ;
  2. la même droite décalée, $y = 2x+1$ : l'origine n'y est pas, le critère tombe à la première
     ligne — **l'étape qui porte M7** ;
  3. la réunion des deux axes, $xy = 0$, avec $(1,0)$, $(0,1)$ et la flèche de leur somme $(1,1)$
     **hors des deux axes** — **l'étape qui porte M1**, et l'image de la rupture du [C5].
  **Pourquoi `svg+katex` et jamais `gemini` :** les étiquettes ($y=2x$, $(1,1)$) et l'exactitude
  des positions **portent le sens** ; un rendu génératif ne les garantit pas (ADR 0017).
  **Placement : à la réponse du [C5], c'est-à-dire APRÈS `cp-r8-pari-stabilite` — et ce placement
  est contraint, pas confortable.** *La critique (I11) demandait d'entrelacer les étapes dans le
  bloc B (étape 1 avec [C3], étape 2 avec [C4], étape 3 à la confrontation). Les deux premières ne
  peuvent pas remonter : une figure posée entre [C3] et [C4] **révèle la conclusion de [C4]** avant
  que le texte ne la travaille, et une figure posée avant le pari **révèle la clé du pari** — son
  étape 3 est littéralement $(1,0)+(0,1)$ qui sort des axes. **Le même rapport l'écrit lui-même :
  « *stage 3 revealed at the cp-r8-pari-stabilite confrontation, where a picture of (1,0)+(0,1)
  leaving the axes is worth more than the algebra* » — ce qui est exactement ce placement.** Ce qui
  est corrigé, ce sont donc les **légendes** : les trois étapes ne récapitulent plus trois objets,
  elles montrent **les trois conditions, et laquelle tombe** — une figure qui dit quelque chose que
  la prose n'a pas dit.*
- **`[[figure:echelle-dimensions-r3]]` — `type: structural-diagram` · `tool: svg+katex`. REQUIS.**
  Livrable : `media/echelle-dimensions-r3.svg` + `media/echelle-dimensions-r3.stages.json`.
  **DEUX étapes :**
  1. le plan $x+y+z = 0$ dans $\mathbb{R}^3$, avec ses **deux** générateurs $(1,0,-1)$ et
     $(0,1,-1)$ dessinés dessus — la figure du [C14] ;
  2. l'échelle : $\{0\}$ (dim 0) $\subset$ une droite (dim 1) $\subset$ un plan (dim 2)
     $\subset \mathbb{R}^3$ (dim 3) — **l'étape qui porte M5** : on voit qu'un sous-espace a une
     dimension **à lui**, bornée par celle de l'ambiant et jamais égale d'office.
  **Placement : après [C14], dans le bloc D** — c'est-à-dire **après** que « dimension » a été
  définie. *(C'était le second défaut de I11 : l'ancienne étape 4 parlait de « dim 0, 1, 2, 3 »
  dans le bloc B.)*
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

### 10.2 Ordre imposé des morceaux — **RÉVISÉ LE 2026-10-20**

```
Accroche (la phrase de l'énoncé)
  [[checkpoint:cp-r8-pari-scalaire]]        ← pari n°1 (M2), AVANT toute définition
  [C1]  la réponse du pari
Bloc A   définition de l'espace vectoriel réel · les trois espaces de référence
         + la phrase sur M3(R) · [C2] les deux conséquences
Bloc B   LE CRITÈRE (trois conditions) · le tableau d'échange avec le chapitre 5
         [C3] la droite (+ annotation de raisonnement)
         [C4] la droite décalée  → M7 nommé
  [[checkpoint:cp-r8-pari-stabilite]]       ← pari n°2 (M1)
         [C5] la réponse du pari
  [[figure:sous-espaces-plan]]              ← 3 étapes, à la réponse du pari
         [C6] l'objet matriciel V (+ annotation de raisonnement)
         [C6b] combinaison linéaire · la compaction λu+μv · le sous-espace engendré Vect
         [C7] le raisonnement d'expert (cite [C6b])
Bloc C   définitions : génératrice · libre
         [C8] une famille libre (+ annotation de raisonnement)
         [C9] prends position → la rupture de M3  (voix / test / rupture)
         [C9b] génératrice : la méthode, et une famille qui n'engendre pas → M8 nommé
Bloc D   [C10a] pourquoi exiger « libre » : l'unicité de l'écriture
         [C10] la base de V, sa dimension, et la remarque sur (I,J)
  [[checkpoint:cp-r8-pari-notation]]        ← pari n°3 (M5)  ** NEUF **
         [C11] la réponse du pari : dim M2(R) = 4, et la face D tuée
  [[checkpoint:cp-r8-pari-dimension]]       ← pari n°4 (M4)
         [C12] la réponse du pari · [C13] le même piège en matrices
         [C14] une équation coûte une dimension (méthode du [C9b] appliquée)
  [[figure:echelle-dimensions-r3]]          ← 2 étapes  ** NEUVE **
         le raccourci admis + la mise en garde sur sa lecture inverse
Bloc E   définition de l'application linéaire + les deux conséquences
         [C15] reconnaître · deux contre-exemples (dont g, qui porte M7)
         [C16] noyau et image (+ annotation de raisonnement, la plus importante)
                + l'équivalence « injective ⟺ noyau trivial », DÉMONTRÉE
         [C17] la paramétrisation est une application linéaire
         [C18] le même mot chez les groupes + l'exemple x ↦ x²
Clôture  §6.6 — trois phrases, aucune réponse
  [[exercise:r8-bac]]        sous « ### Exercice de type bac »
  [[exercise:r8-variation]]  sous « ### Une variation pour ne pas mémoriser »
```

**Compte des marqueurs : QUATRE checkpoints · DEUX figures · DEUX exercices.**
*(C'était trois · un · zéro. Les trois ajouts sont les correctifs B2, I11 et B1/F3.)*
**Les deux marqueurs d'exercice vont sous des titres `### `**, exactement comme au chapitre 10
(`lesson.md:689` et `:695`) — **jamais sous un `## `**, sinon le compte des chapitres passerait de
11 à 13 (§10.3).

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
- **Longueur visée** : **230 lignes ± 30** *(relevée de 200 ± 30 le 2026-10-20 : le chapitre gagne
  trois beats, [C6b], [C9b] et [C10a], cinq annotations de raisonnement et un tableau d'échange de
  critères ; la prose de l'exercice, elle, vit dans `exercises.yaml`, pas dans `lesson.md`)*.
- **Tous les nombres viennent du §6** — et, pour les deux exercices, du §12.2. Ne rien re-dériver,
  ne rien « améliorer » : si un calcul paraît faux, **le signaler**, ne pas le corriger en silence.

#### La règle des numéros de chapitre, écrite en formule (et ce que le chapitre 11 déplace)
**Le numéro d'un chapitre = 1 + le nombre de titres `## ` qui le précèdent dans `lesson.md`.** Le
fichier en porte **10** ; le nouveau titre en fait **11**, et comme il est **à la fin**, aucun
chapitre existant ne change de numéro — donc **aucun renvoi du dépôt n'est à réécrire** (§1.g :
le motif `[Cc]hapitres? 11\b` rend **0** dans le dossier de la notion, et aucune autre notion ne
cite un chapitre de celle-ci, §1.h). **Deux pièges mortels, à tenir :**
1. **Ne pas ajouter de titre `## ` pour les exercices.** Les deux marqueurs vont sous des `### `
   (`lesson.md:689`, `:695`). Un `## Pour t'entraîner` ferait 12 titres : le chapitre « Espaces
   vectoriels » resterait le 11ᵉ, mais la porte verrait **deux** chapitres de plus et la carte
   livrée à l'élève afficherait un chapitre fantôme.
2. **`carte-chapitres` doit être relancée puis re-scellée** : `node scripts/carte-chapitres.mjs
   --porte` **rougit** (10 → 11), avec la liste de renvois **vide** ; on **lit** le rouge, on
   vérifie qu'il est bien celui-là, puis `--sceller` (§4.2, §13.2).

#### Rédaction en composant `Derivation` ou en prose narrée — la décision, écrite (correctif m2)
*Le template exige que ce choix soit **authored**, pas laissé au hasard de la frappe. Le voici,
beat par beat :*
- **Composant `Derivation`** (vérification procédurale, algèbre de résolution, le lecteur doit
  pouvoir suivre ligne à ligne et replier) : **[C6]** (les trois conditions sur $V$), **[C8]** (le
  système), **[C9b] (i) et (ii)**, **[C10]** (libre + génératrice), **[C11]**, **[C12]**,
  **[C13]**, **[C14]**, **[C16]** (le calcul du noyau et l'antécédent).
- **Prose narrée, display math inline** (colonne d'argument : l'enchaînement *est* le propos et une
  mise en composant le hacherait) : **[C2]**, **[C6b]** (les définitions et l'équivalence des deux
  formes du critère), **[C7]**, **[C10a]** (l'unicité), l'équivalence injectivité ⟺ noyau trivial,
  **[C17]**, **[C18]**.
- **Les cinq annotations de raisonnement ([C3], [C6], [C8], [C14], [C16]) sont TOUJOURS en prose**,
  jamais dans un composant : ce sont des phrases de décision, pas des lignes de calcul.

#### Orthotypographie (correctif m3)
**Apostrophes ASCII droites (`'`) dans le markdown** — la chaîne de rendu fait la conversion
typographique ; une apostrophe courbe tapée à la main crée des faux positifs dans les portes de
texte. Idem pour les guillemets : on écrit `« »` avec espaces insécables **gérées par le
pipeline**, pas à la main.

#### Table des lettres — HARD, correctif F10
Trois lettres portaient trois sens chacune dans la version du 2026-09-28 ($F$ : partie générique,
ensemble du chapitre 5, matrices de trace nulle, espace d'arrivée ; $E$ : espace ambiant, objet du
[C6], ensemble d'un item ; $A$, $B$ : base du [C10] et matrices sans rapport d'un item).

| lettre | sens UNIQUE dans le chapitre 11 |
|---|---|
| $E$ | l'espace vectoriel ambiant **générique** (comme `lesson.md:296`) |
| $E'$ | un second espace générique (arrivée d'une application linéaire ou d'un morphisme) |
| $H$ | **la partie à tester** — la lettre du critère du chapitre 5 (`lesson.md:311-315`) |
| $F$ | l'ensemble **concret du chapitre 5** repris à l'accroche (`lesson.md:323`) |
| $V$ | l'objet matriciel travaillé au bloc B et D ($M(a,b)$) |
| $D$, $D'$ | la droite et la droite décalée ([C3], [C4]) |
| $X$ | la réunion des deux axes ([C5]) |
| $W$ | le plan $\{y = 2x\}$ de $\mathbb{R}^3$ ([C9b]) |
| $G$, $G'$, $P$ | les objets de [C12], [C13], [C14] |
| $I$, $O$, $J$, $K$, $E_{ij}$ | matrices fixes — **outillage**, réemployable partout |
| $A$, $B$ | **la base de $V$** ([C7], [C10]) — et rien d'autre dans la leçon |

**Dans les items**, chaque objet prend une lettre **hors de cette liste** ($S$, $T$, $U$, $N$, $Z$,
$Q$, $L$…) ; deux items différents peuvent réutiliser la même (l'élève en voit un à la fois).
**Dans les deux exercices**, l'ensemble s'appelle **$E$ parce que l'énoncé l'appelle ainsi** — et
l'intro de l'exercice **doit le dire en une phrase** : « *dans la leçon, $E$ était l'espace ambiant
et $H$ la partie à tester ; ici l'ambiant est $M_2(\mathbb{R})$ et la partie s'appelle $E$. Les
sujets ne suivent pas nos conventions — relire quelle lettre désigne quoi est un geste d'examen à
part entière.* » *(C'est une leçon, pas un pansement : la lettre d'un sujet n'est jamais garantie.)*

### 10.4 Interdits (limites et exclusions du cadre, §2)
Valeurs propres, vecteurs propres, diagonalisation, polynôme caractéristique · produit scalaire,
norme, orthogonalité, base orthonormée dans un espace abstrait · dimension infinie, espaces de
suites ou de fonctions · **espaces de polynômes** (non attestés, non nommés par le cadre — §15 Q4)
· somme et somme directe de sous-espaces · **théorème du rang** (§15 Q3) · matrice d'une
application linéaire · rang d'une famille · toute affirmation de fréquence ou de poids d'examen.

**Quatre interdits ajoutés le 2026-10-20 :**
- **« isomorphisme d'espaces vectoriels »** comme objet nommé — le cadre ne l'imprime pas. On dit
  « une bijection linéaire » et on renvoie au chapitre 10 pour l'idée de transport (S3, §6.5).
- **Tout « toujours » / « jamais » sur ce que fait un énoncé d'examen.** Les régularités de corpus
  se disent « dans tous les sujets que nous avons lus… » (F7, §2 et §3.2).
- **Tout pourcentage, tout barème, tout « c'est peu / beaucoup », tout « point gratuit »** — y
  compris dans un retour de distracteur ou une intro d'exercice (F2). *Le barème d'un exercice
  transcrit reste dans le `stem` de l'annale, parce que l'énoncé officiel le porte ; il ne devient
  jamais un argument de la leçon.*
- **$\dim M_3(\mathbb{R})$, et $M_n(\mathbb{R})$ en général.** La phrase sur $M_3$ (F12) dit que le
  rappel existe en $3\times3$ ; elle ne calcule rien.

---

## 11. Cahier des charges — item-author : 18 items, **SA-36 → SA-53**

### 11.0 Le lot, vu de haut — **RECOMPTÉ LE 2026-10-20**
- **18 items**, tous `rung: "R8"`, `skill_code: maths_structures_alg`, tous portant `habilete`
  (précédent SA-27…SA-35 — §1.k, corrigé en (b)). **Le nombre ne change pas** : les quatre besoins neufs (un item de
  génération, un item « est-elle linéaire ? », un quatrième item M6, un item de base) sont servis
  par **conversion** de slots existants, pas par ajout — précisément pour ne pas aggraver la part
  de R8 dans la notion (§15 Q11).
- **Habiletés : 7 / 7 / 4** = **38,9 / 38,9 / 22,2** (cible cadre 40 / 40 / 20). *Le total est
  inchangé, la répartition nominative a bougé :*
  `application_directe` : SA-36, SA-39, SA-42, SA-46, SA-49, SA-51, SA-52 ·
  `application_non_explicite` : SA-37, SA-40, SA-43, SA-44, SA-45, SA-48, SA-50 ·
  `synthese` : SA-38, SA-41, SA-47, SA-53.
- **HABILETÉ ET DIFFICULTÉ SONT DÉSOLIDARISÉES SUR QUATRE ITEMS — correctif F8.** Dans la version
  du 2026-09-28, la correspondance était **en lockstep sur 18 items sur 18** (directe ⇒ 2,
  non_explicite ⇒ 3, synthese ⇒ 4) : les deux champs étaient **un seul champ écrit deux fois**, et
  le chiffre 38,9/38,9/22,2 ne mesurait que l'étalement des difficultés. *(ADR 0033, troisième mode
  de défaut : une mesure exacte sur une question plus étroite que son en-tête.)* **Les quatre
  ruptures :** SA-41 `synthese`/**3** · SA-44 `non_explicite`/**4** · SA-46 `directe`/**3** ·
  SA-52 `directe`/**3**. *Chacune est justifiée dans la table : ce n'est pas du bruit ajouté pour
  casser une corrélation, c'est la difficulté réelle de l'item.*
- **HUIT ids neufs à DÉCLARER d'abord** dans `items.yaml.misconceptions` (§8) — sans quoi la porte
  refuse le fichier. *(C'était six : M7 et M8 s'ajoutent, correctifs I6 et S5.)*
- **Plancher ≥3 : tenu partout.** **M1 6 · M2 4 · M3 5 · M4 8 · M5 6 · M6 4 · M7 3 · M8 3.**
  **Quatre ids existants** gagnent des items R8 :
  - `generalisation-hative` **+4** (13 → 17, contre `items.yaml:2283`) ;
  - `cloture-non-verifiee` **+2** (8 → 10, contre `:2281`) ;
  - `axiome-oublie` **+1** (7 → 8, contre `:2279`) ;
  - `neutre-non-transporte` **+1** (5 → 6, contre `:2285`).
  *Recompté le 2026-10-20 (b), par script, sur l'étiquetage de la table du §11.1 après les
  corrections de la passe arithmétique* :
  - **M1** SA-36/37/38/39/40/41 · **M2** SA-37/39/40/41 · **M3** SA-42/43/44/45/50 ;
  - **M4** SA-42/44/45/46/47/50/51/52 · **M5** SA-45/46/47/49/51/52 · **M6** SA-48/51/52/53 ;
  - **M7** SA-38/40/48 · **M8** SA-47/49/50 ;
  - **`generalisation-hative`** SA-36/37/43/44 · **`cloture-non-verifiee`** SA-36/41 ·
    **`axiome-oublie`** SA-38 · **`neutre-non-transporte`** SA-53.

  ⚠ **M2 passe de 7 à 4** : SA-36 D, SA-38 D et SA-53 C sont ré-étiquetés (§8, règle opératoire).
  Il garde une marge d'un item.
  ⚠ **M7 et M8 sont à exactement 3, sans marge** : un seul item re-étiqueté en revue les ferait
  tomber sous le plancher et la porte rougirait. **C'est dit, pas masqué** → §15 Q12.
  *Un item compte **une fois** par id, même si deux de ses distracteurs le portent.*
- **`coverage_summary` à mettre à jour** :
  - `total_items` 35 → **53** ; `ramp_coverage` gagne `R8: 18` ;
  - les **huit** lignes `per_misconception` neuves ;
  - **quatre** lignes existantes mises à jour : `generalisation-hative` 17,
    `cloture-non-verifiee` 10, `axiome-oublie` 8, `neutre-non-transporte` 6 ;
  - un paragraphe `honest_state` qui dit ce que cette vague ferme et ce qu'elle laisse (§8.9),
    **y compris les deux planchers sans marge**.

### 11.1 Les 18 items — objet, clé, distracteurs

> **DIX des dix-huit objets ont changé le 2026-10-20.** Motifs, et chacun est tracé dans sa
> ligne : **pré-résolution par le §6** (SA-37, SA-41, SA-45, SA-48 — correctif I7) ·
> **collision de nombres** avec [C8], [C14] ou **l'ensemble du sommet R7** (SA-44, SA-45, SA-50 —
> correctifs I7, F6) · **étiquette fausse** (SA-38 C et D, SA-47 B, SA-49 D, SA-53 D — correctif
> I6) · **distracteurs tous sur un seul id, donc rien à différencier** (SA-51 — correctif I9) ·
> **trois items du même modèle avec la même relation visible** (SA-44 — correctif I10) ·
> **savoir-faire du cadre sans aucun item** (SA-50 → génération, SA-48 → « reconnaître une
> application linéaire » — correctifs S5, S6) · **affirmation fausse dans une option** (SA-46 D —
> correctif m4) · **option sans raisonnement, donc sans diagnostic** (SA-44 B — correctif m5).
> **Tous les nombres ci-dessous ont été recalculés dans cette session ; les contrôles sont écrits
> en regard, dans la ligne.**
>
> **RÉVISION (b) DU 2026-10-20 — passe arithmétique indépendante.** Trois objets ont encore changé :
> - **SA-41** : la **question** change. L'ancienne clé « Rien » était fausse — erreur E1,
>   bloquante.
> - **SA-50** : les **vecteurs** changent. Deux d'entre eux venaient du §6 alors que la ligne
>   affirmait le contraire — E2.
> - **SA-46** : l'**objet** change. Le modèle M5 atteignait la clé.
>
> Les étiquettes de **cinq** distracteurs sont corrigées : SA-36 D, SA-37 D, SA-38 D, SA-46 D
> (réécrit) et SA-53 C. Pour **deux** items, SA-49 et `cp-r8-pari-notation` (§7.3), une note dit
> pourquoi un modèle faux qui atteint la clé y est accepté. Toutes ces lignes sont re-vérifiées en
> arithmétique exacte (journal (b)).

**M1 · `sous-espace-zero-suffit`**

| id | hab. | diff | objet et question | clé | distracteurs → modèle |
|---|---|---|---|---|---|
| **SA-36** | directe | 2 | $S = \{(x,y) \in \mathbb{R}^2\ /\ y = \lvert x\rvert\}$. Sous-espace de $\mathbb{R}^2$ ? *(ensemble renommé $K \to S$ : $K$ est une matrice fixe du [C13] — F10)* | **Non** : $(1,1) \in S$ mais $(-1)\cdot(1,1) = (-1,-1) \notin S$ car $\lvert -1\rvert = 1 \neq -1$ — **la troisième condition tombe** | B « oui : $(0,0) \in S$ car $\lvert 0\rvert = 0$, la première condition est remplie » → **M1** · C « oui : pour $\lambda \geq 0$, $\lambda(x,\lvert x\rvert) = (\lambda x, \lvert\lambda x\rvert)$ reste dans $S$ » → **`generalisation-hative`** · D « oui : $(0,0) \in S$, et la somme de deux points de $S$ reste dans $S$ — l'addition ne fait pas sortir de l'ensemble » → **`cloture-non-verifiee`** *(prémisse fausse : $(1,1)+(-2,2) = (-1,3)$, $\lvert-1\rvert = 1 \neq 3$ — le retour doit donner ce couple. **Ré-étiqueté et réécrit le 2026-10-20 (b)** : l'option disait « $S$ est stable pour $+$, et c'est la condition qui compte » → M2. M2 ne la produit pas : la liste du sous-groupe, appliquée, rejette $S$ par les opposés, avec **le témoin même de la clé**, puisque $(-1)\cdot(1,1) = -(1,1)$. L'élève qui choisit D a **supposé** la clôture pour $+$ sans la tester, et c'est `cloture-non-verifiee`. Le « c'est la condition qui compte » était de plus un absolu régulateur (§11.2). **Conséquence nommée :** M2, appliqué, atteint la clé de SA-36. C'est acceptable parce que SA-36 ne porte plus M2 (précision de §11.2).)* |
| **SA-37** | non_explicite | 3 | **OBJET REFAIT (I7 : l'ancien $T$ des matrices diagonales à $xy=0$ était le $X$ du [C5] re-habillé, avec les mêmes deux éléments $(1,0)$ et $(0,1)$ et la même paire-témoin que le checkpoint ; I8 : son option D portait « **toute** partie stable… »).** $T = \{(x,y) \in \mathbb{R}^2\ /\ (y-x)(y+2x) = 0\}$ — la réunion de **deux droites passant par l'origine**. Sous-espace ? | **Non** : $(1,1) \in T$ (car $y-x = 0$) et $(1,-2) \in T$ (car $y+2x = -2+2 = 0$), mais $(1,1)+(1,-2) = (2,-1) \notin T$ : $(-1-2)(-1+4) = (-3)(3) = -9 \neq 0$ | B « oui : $(0,0) \in T$ et $\lambda(x,y)$ y reste, puisque le produit se multiplie par $\lambda^2$ » → **M1** *(les deux prémisses sont VRAIES : $(\lambda y - \lambda x)(\lambda y + 2\lambda x) = \lambda^2(y-x)(y+2x) = 0$)* · C « oui : $T$ est la réunion de deux droites passant par l'origine, et chacune est un sous-espace » → **`generalisation-hative`** *(prémisse vraie, inférence fausse — §8.9 n°3)* · D « oui : $T$ contient le vecteur nul et les opposés, et la somme de deux points d'une même droite y reste — la liste du sous-groupe est cochée » → **M2** *+ double-tag* **`generalisation-hative`** *(double étiquette ajoutée le 2026-10-20 (b). $T$ n'est **pas** un sous-groupe. D exige donc M2 **et** un test de $+$ fait seulement sur des paires d'une même droite, un cas particulier généralisé. **M2 seul**, appliqué sur des paires quelconques, trouve le témoin de la clé, $(1,1)+(1,-2) \notin T$, et atteint la clé : c'est le cas de la variante « sous-groupe » de M2, nommé à la précision de §11.2)* |
| **SA-38** | synthese | 4 | Quatre parties de $\mathbb{R}^3$ : laquelle est un sous-espace ? | **$\{(x,y,z)\ /\ x-2y+z = 0\}$** *(contient $(0,0,0)$ ; stable pour $+$ et pour $\cdot$ par linéarité de l'expression)* | B $\{x^2 = y^2\}$ *(contient $0$, stable pour $\cdot$ ; $(1,1,0)+(1,-1,0) = (2,0,0)$ et $4 \neq 0$)* → **M1** · C $\{x+y+z = 1\}$ « c'est un plan, donc un sous-espace » → **M7** *(re-étiqueté : un élève qui choisit C n'a pas buté sur le test du zéro, il l'a **sauté** — I6)* · D $\{x \geq 0\}$ *(contient $0$, stable pour $+$, pas pour $\lambda = -1$)* → **`axiome-oublie`** *(**ré-étiqueté le 2026-10-20 (b)** ; la révision (a) l'avait « maintenu » à M2. M2 ne produit pas D : la liste du sous-groupe, appliquée, **rejette** $\{x \geq 0\}$, car l'opposé de $(1,0,0)$ est $(-1,0,0)$, hors de l'ensemble. L'élève qui choisit D a vérifié **le zéro et $+$**, deux conditions sur trois, puis conclu. La condition oubliée est précisément celle qui porte les opposés : c'est le mécanisme d'`axiome-oublie`, règle opératoire du §8. **Conséquence nommée :** M2 appliqué ne retient, des quatre parties, que la clé, qui est aussi un sous-groupe. M2 atteint donc la clé, ce qui est acceptable parce que SA-38 ne porte pas M2, précision de §11.2)* |

**M2 · `sous-espace-vs-sous-groupe`**

| id | hab. | diff | objet et question | clé | distracteurs → modèle |
|---|---|---|---|---|---|
| **SA-39** | directe | 2 | $U = \left\{\left(\begin{smallmatrix}a&0\\a+b&b\end{smallmatrix}\right)\ /\ (a,b) \in \mathbb{Z}^2\right\}$ : sous-groupe de $(M_2(\mathbb{R}),+)$ ? sous-espace ? *(renommé $V \to U$ : $V$ est l'objet du [C6] — F10)* | **Sous-groupe oui, sous-espace non** : $\tfrac12 \left(\begin{smallmatrix}1&0\\1&0\end{smallmatrix}\right) = \left(\begin{smallmatrix}1/2&0\\1/2&0\end{smallmatrix}\right)$ demanderait $a = \tfrac12 \notin \mathbb{Z}$ *(contrôle : $\left(\begin{smallmatrix}1&0\\1&0\end{smallmatrix}\right) = $ le cas $a=1$, $b=0$ ✓)* | B « les deux : le sous-groupe règle la question » → **M2** · C « ni l'un ni l'autre : $U$ ne contient pas $I$ » → **M2** · D « les deux : $U$ contient la matrice nulle » → **M1** |
| **SA-40** | non_explicite | 3 | $N = \{(x,y) \in \mathbb{R}^2\ /\ x+y \in \mathbb{Z}\}$ *(renommé $W \to N$ : $W$ est le plan du [C9b] — F10)* | **Sous-groupe de $(\mathbb{R}^2,+)$, pas sous-espace** : $(1,0) \in N$ et $\tfrac12(1,0) = (\tfrac12,0)$ avec $\tfrac12 \notin \mathbb{Z}$ | B « sous-groupe donc sous-espace » → **M2** · C « sous-espace : $(0,0) \in N$ » → **M1** · D « sous-espace : $N$ est une réunion de droites parallèles $x+y = k$, et une droite est un sous-espace » → **M7** *(option REFAITE : l'ancienne, « c'est la même question, seule la loi $+$ compte », portait un absolu interdit par `indice-absolu` — I8 — et doublait la face M2 de B. La prémisse de la nouvelle est **vraie** : $N$ **est** cette réunion.)* |
| **SA-41** | **synthese** | **3** | **OBJET ET PRÉMISSE REFAITS (I7 + F3 : l'ancienne version demandait « la question précédente a établi le SOUS-GROUPE, que reste-t-il ? », dont la réponse était écrite mot pour mot au §6.6 — et c'est désormais la réponse de la q2 du sommet `r8-bac`. L'item la pré-résolvait.)** $Z = \left\{\left(\begin{smallmatrix}a&b\\b&a+b\end{smallmatrix}\right)\ /\ (a,b) \in \mathbb{R}^2\right\}$ ; **la question précédente a établi que $Z$ est une partie stable de $(M_2(\mathbb{R}),\times)$.** **Cette stabilité suffit-elle à conclure que $Z$ est un sous-espace vectoriel de $(M_2(\mathbb{R}),+,\cdot)$ ?** **QUESTION REFAITE le 2026-10-20 (b) — passe arithmétique, erreur E1, bloquante.** La question précédente, « Que cela apporte-t-il à la démonstration ? », avait pour clé « **Rien** ». **C'était faux.** $\lambda I = \left(\begin{smallmatrix}\lambda&0\\0&\lambda\end{smallmatrix}\right)$ est l'élément $(a,b) = (\lambda,0)$ de $Z$, et $\lambda\cdot M = (\lambda I)\times M$ : la stabilité pour $\times$ **donne** la loi externe. L'ancienne option D, « $\lambda\cdot M$ est un produit », était donc un argument **valide**. Changer de $Z$ ne réparait rien : toute famille paramétrée linéairement qui contient $I$ offre la même route. C'est donc la **question** qui change (option (i) du rapport). | **Non : la stabilité pour $\times$ ne donne ni la non-vacuité ni la stabilité pour $+$ ; ces deux conditions restent à écrire** *(la clé est **muette sur la loi externe**, exprès : contrôles ci-dessous)* | B « oui : une partie stable pour $\times$ qui contient $I$ a tout d'un sous-anneau, et c'est bien la liste qu'un sous-espace demande » → **M2** *(variante « sous-anneau ». La prémisse est vraie, $I$ est l'élément $(1,0)$ de $Z$ ; l'inférence est fausse)* · C « pas encore : il ne reste qu'à vérifier que $Z$ contient la matrice nulle (cas $a = b = 0$), la stabilité est acquise » → **M1** *+ double-tag* **M2** · D « oui : puisque le produit de deux éléments de $Z$ reste dans $Z$, leur somme et leurs multiples y restent aussi » → **`cloture-non-verifiee`** *(la conclusion est vraie pour ce $Z$, mais l'inférence $\times \Rightarrow +$ est fausse : la clôture pour $+$ est supposée, jamais testée)* |

*Contrôle de la prémisse de SA-41 — inchangé, et re-vérifié en arithmétique exacte le 2026-10-20
(b).* Le produit de deux éléments de $Z$ :
$\left(\begin{smallmatrix}a&b\\b&a+b\end{smallmatrix}\right)\left(\begin{smallmatrix}c&d\\d&c+d\end{smallmatrix}\right) = \left(\begin{smallmatrix}ac+bd & ad+bc+bd\\ bc+ad+bd & ac+ad+bc+2bd\end{smallmatrix}\right)$,
et la forme exige coefficient $(2,1) = $ coefficient $(1,2)$ ✓ (les deux valent $ad+bc+bd$) et
coefficient $(2,2) = (1,1)+(1,2)$ ✓ ($ac+bd + ad+bc+bd = ac+ad+bc+2bd$). **$Z$ est bien stable pour
$\times$ : la prémisse de l'énoncé est VRAIE**, et un élève qui la vérifie ne doit pas trouver un
énoncé faux. *L'ancien $E'$ est renommé $Z$ : $E'$ désigne désormais l'espace d'arrivée générique
(F10).*

*Contrôles de la question refaite (b), tous en arithmétique exacte :*
- **Pourquoi l'ancienne clé était fausse (E1).** $\lambda I = \left(\begin{smallmatrix}\lambda&0\\0&\lambda\end{smallmatrix}\right)$
  est l'élément $(a,b) = (\lambda,0)$ de $Z$. Pour toute matrice $M$, $(\lambda I)\times M = \lambda\cdot M$.
  Donc stabilité pour $\times$ et $\lambda I \in Z$ entraînent la stabilité pour la loi externe.
  *C'est le défaut à ne pas réintroduire : aucune option, ni la clé ni son retour, ne doit dire que
  $\times$ « n'apporte rien » à la loi externe.*
- **La clé est vraie.** La stabilité pour $\times$ ne donne **jamais** la non-vacuité : $\varnothing$
  est stable pour $\times$. Elle ne donne **pas** la stabilité pour $+$ : $\{I\}$ est stable pour
  $\times$ ($I \times I = I$) et contient $I$, mais $I + I = 2I \notin \{I\}$. La clé est **muette sur
  la loi externe**, et c'est voulu : elle ne prétend ni que $\times$ la donne, ni le contraire. Le
  retour de la clé peut nommer la route $\lambda\cdot M = (\lambda I)\times M$ comme prolongement,
  jamais comme une impossibilité.
- **Chaque distracteur est faux, et faux sans ambiguïté.**
  - **B.** Un sous-anneau n'est pas un sous-espace : $M_2(\mathbb{Z})$ contient $I$ et est stable
    pour $+$, $\times$ et les opposés, mais $\tfrac12 I \notin M_2(\mathbb{Z})$. Et « stable pour
    $\times$, contient $I$ » ne donne même pas le sous-anneau, puisque $\{I\}$ n'est pas stable pour
    $+$.
  - **C.** La stabilité pour $+$ reste à écrire ($\{I\}$).
  - **D.** L'inférence « stable pour $\times$ donc stable pour $+$ » est réfutée par $\{I\}$. Sa
    conclusion est **vraie pour ce $Z$** : $Z(a,b)+Z(a',b') = Z(a+a',b+b')$ et
    $\lambda Z(a,b) = Z(\lambda a,\lambda b)$. Le retour doit donc dire « vrai ici, mais à
    **démontrer par le calcul**, pas à déduire de $\times$ ».
  - **Contrôle (a)** : B, C et D affirment chacune une implication qu'un contre-exemple réfute.
    Aucune n'est atteignable par une méthode correcte.
  - **Longueurs des canevas** (LaTeX retiré) : 114 caractères pour la clé, 119 pour B, 112 pour C
    et 106 pour D. La clé n'est ni la plus longue ni la plus courte. `indice-longueur` reste à
    relancer sur la rédaction finale.
- **Modèles faux et clé.**
  - M1 mène à C, la variante « sous-anneau » de M2 mène à B, `cloture-non-verifiee` mène à D.
  - **Résidu nommé :** M2 dans sa variante « liste du **sous-groupe** » (zéro, $+$, opposés)
    **atteint la clé**. La clé ne nomme que deux conditions communes aux deux listes, et la
    question ne peut pas départager.
  - SA-41 porte M2 pour sa variante « sous-anneau », celle que sa prémisse appelle : une
    stabilité pour $\times$. La variante « sous-groupe » est mesurée là où sous-groupe et
    sous-espace divergent, à SA-39 et SA-40. C'est accepté, et écrit comme tel à la précision de
    §11.2.
  - *L'élève qui croit « $\times$ n'a rien à voir avec un sous-espace » (l'ancienne clé fausse)
    atteint lui aussi la clé. Ce n'est pas un modèle déclaré, et la clé, muette sur la loi externe,
    ne lui fait endosser aucune affirmation fausse.*
- **Habileté et difficulté maintenues : `synthese` / 3.** L'élève doit confronter une propriété
  établie aux trois conditions et juger si elle suffit. C'est une synthèse, posée en question
  fermée (verdict et raison) de difficulté 3. La rupture de lockstep du §11.0 tient, et le
  7 / 7 / 4 ne bouge pas.

**M3 · `famille-libre-mal-testee`**

| id | hab. | diff | objet et question | clé | distracteurs → modèle |
|---|---|---|---|---|---|
| **SA-42** | directe | 2 | $(1,-1,2)$, $(2,0,1)$, $(3,-1,3)$ dans $\mathbb{R}^3$ : libre ? | **Liée** : $v_1 + v_2 - v_3 = (1+2-3,\ -1+0+1,\ 2+1-3) = (0,0,0)$ | B « libre, aucun n'est nul » → **M3** · C « libre, aucun couple n'est colinéaire » → **M3** · D « libre : trois vecteurs et $\dim\mathbb{R}^3 = 3$, cela suffit » → **M4** *(c'est la lecture inverse du raccourci admis — la prose du §6.4 DOIT l'avoir prévenue, sinon l'item sanctionne une erreur non enseignée : S2)* |
| **SA-43** | non_explicite | 3 | $A_1 = \left(\begin{smallmatrix}1&0\\1&1\end{smallmatrix}\right)$, $A_2 = \left(\begin{smallmatrix}0&1\\1&0\end{smallmatrix}\right)$, $A_3 = \left(\begin{smallmatrix}1&2\\3&1\end{smallmatrix}\right)$ : libre ? | **Liée** : $A_3 = A_1 + 2A_2$ *(coefficient par coefficient : $1+0=1$, $0+2=2$, $1+2=3$, $1+0=1$ ✓)* | B « libre, deux à deux non proportionnelles » → **M3** · C « libre, aucune n'est nulle » → **M3** · D « libre : la relation la plus plausible serait $A_1 + A_2 = A_3$, et le calcul la réfute — $A_1+A_2 = \left(\begin{smallmatrix}1&1\\2&1\end{smallmatrix}\right) \neq A_3$ » → **`generalisation-hative`** *(option REFAITE : l'ancienne, « liée : plus de deux matrices **ne peuvent pas** être libres », portait un absolu barrable à vue (I8) **et annonçait le même verdict que la clé**, de sorte qu'un élève qui ne lit que les verdicts était récompensé d'un modèle faux. La nouvelle annonce « libre », son calcul est exact et vérifiable, et elle diagnostique précisément « j'ai testé UNE relation candidate et je me suis arrêté ». Voir la précision de §11.2 sur la portée réelle de cette règle.)* |
| **SA-44** | **non_explicite** | **4** | **OBJET REFAIT (F6 : l'ancien reprenait $v_2 = (1,1,0)$ et $v_3 = (0,1,1)$ du [C8] — dont la clé est « libre » — avec la clé opposée, et son troisième vecteur $(1,0,-1)$ était un générateur du [C14] ; I10 : les trois items M3 cachaient la même relation à coefficients $1$).** $x_1 = (1,3,2)$, $x_2 = (2,-1,1)$, $x_3 = (8,3,7)$ : libre ? | **Liée** : la résolution donne $(\alpha,\beta,\gamma) = \gamma(-2,-3,1)$, c'est-à-dire $x_3 = 2x_1 + 3x_2$ | B « libre : aucun couple n'est colinéaire, **et** aucun des trois n'est la somme des deux autres » → **M3** *(les DEUX prémisses sont vraies — contrôles ci-dessous — ce qui en fait le distracteur le plus informatif du lot : il ne se barre pas, il se croit)* · C « libre : trois équations à trois inconnues, donc une seule solution » → **`generalisation-hative`** · D « libre : en dimension $3$, une famille de $3$ vecteurs est une base dès qu'aucun n'est nul » → **M4** |

*Contrôles de SA-44, refaits dans cette session.* **La relation** : $2x_1 + 3x_2 = (2+6,\ 6-3,\ 4+3) = (8,3,7) = x_3$ ✓.
**La résolution complète** : $\alpha(1,3,2)+\beta(2,-1,1)+\gamma(8,3,7) = (\alpha+2\beta+8\gamma,\ 3\alpha-\beta+3\gamma,\ 2\alpha+\beta+7\gamma) = (0,0,0)$ ;
de la 1re, $\alpha = -2\beta-8\gamma$ ; dans la 2e, $-6\beta-24\gamma-\beta+3\gamma = -7\beta-21\gamma = 0$
donc $\beta = -3\gamma$ ; alors $\alpha = 6\gamma-8\gamma = -2\gamma$ ; la 3e est automatiquement
vérifiée : $-4\gamma-3\gamma+7\gamma = 0$ ✓. **Non-colinéarité des trois couples** :
$x_1,x_2$ ($2/1 = 2$ mais $-1/3 \neq 2$) · $x_1,x_3$ ($8/1 = 8$ mais $3/3 = 1 \neq 8$) ·
$x_2,x_3$ ($8/2 = 4$ mais $3/(-1) = -3 \neq 4$) ✓. **Aucune somme de deux ne donne le troisième** :
$x_1+x_2 = (3,2,3) \neq x_3$ · $x_1+x_3 = (9,6,9) \neq x_2$ · $x_2+x_3 = (10,2,8) \neq x_1$ ✓.
**La relation est donc invisible à l'œil et n'apparaît qu'en résolvant** — c'est exactement la
seconde forme d'item que le §8 promettait pour M3 et que le lot ne livrait pas (I10).

**M4 · `dimension-compte-parametres`**

| id | hab. | diff | objet et question | clé | distracteurs → modèle |
|---|---|---|---|---|---|
| **SA-45** | non_explicite | 3 | **OBJET REFAIT (I7 + F6 : les générateurs de l'ancien $S$ étaient $(1,0,1)$ et $(1,1,0)$, soit $v_1$ et $v_2$ du [C8], et son troisième $(0,1,-1)$ était un générateur du [C14]).** $L = \{(a+2c,\ 3a+b+5c,\ 2b-2c)\ /\ (a,b,c) \in \mathbb{R}^3\}$ : dimension ? | **2** : les générateurs sont $g_1 = (1,3,0)$, $g_2 = (0,1,2)$, $g_3 = (2,5,-2)$, et $g_3 = 2g_1 - g_2$, donc $L = \mathrm{Vect}(g_1,g_2)$ avec $(g_1,g_2)$ libre | B « 3, il y a trois paramètres » → **M4** · C « 3, les vecteurs ont trois coordonnées » → **M5** · D « 3 : les trois générateurs sont deux à deux non colinéaires, donc libres » → **M3** |

*Contrôles de SA-45.* **Les générateurs se lisent sur les paramètres** : le coefficient de $a$ est
$(1,3,0)$, celui de $b$ est $(0,1,2)$, celui de $c$ est $(2,5,-2)$ ✓.
**La relation** : $2g_1 - g_2 = (2,6,0) - (0,1,2) = (2,5,-2) = g_3$ ✓.
**$(g_1,g_2)$ libre** : $\alpha(1,3,0)+\beta(0,1,2) = (\alpha,\ 3\alpha+\beta,\ 2\beta) = (0,0,0)$
donne $\alpha = 0$ (1re) et $\beta = 0$ (3e) ✓. **Non-colinéarité des trois couples** (prémisse de
D, vraie) : $g_1,g_2$ (première coordonnée $0$ contre $1$, troisième $2$ contre $0$) · $g_1,g_3$
($2/1 = 2$ mais $5/3 \neq 2$) · $g_2,g_3$ (première coordonnée $0$ contre $2$) ✓.

| id | hab. | diff | objet et question | clé | distracteurs → modèle |
|---|---|---|---|---|---|
| **SA-46** | **directe** | **3** | **OBJET REFAIT le 2026-10-20 (b) — passe arithmétique, §3 du rapport.** Deux défauts. **(1) Un modèle faux atteignait la clé** : l'ancien $Q = \left\{\left(\begin{smallmatrix}a+b&a+b\\c&0\end{smallmatrix}\right)\right\}$ était de dimension **2**, exactement ce que M5 lit sur l'indice de $M_2$. Or l'item **porte** M5 (C), la règle du §11.2 s'applique donc. **(2) Le distracteur D**, « 1 : les deux coefficients de la première ligne sont égaux », n'était pas produit par M4, son étiquette. Compter les lettres donnait 3 = B. Le $1$ venait d'un modèle « je ne lis que la première ligne », qu'aucun id déclaré ne porte. **Nouvel objet :** $Q = \left\{\left(\begin{smallmatrix}a+b&c\\d&0\end{smallmatrix}\right)\ /\ a,b,c,d \in \mathbb{R}\right\}$ : dimension ? *(lettre $Q$ conservée, $U$ étant pris par SA-39)* | **3** : $a$ et $b$ n'interviennent que par $a+b$, qui parcourt tout $\mathbb{R}$ ; donc $Q = \mathrm{Vect}(E_{11}, E_{12}, E_{21})$, et cette famille est libre | B « 4 : il y a quatre lettres, $a$, $b$, $c$ et $d$ » → **M4** · C « 4 : $Q$ est un sous-espace de $M_2(\mathbb{R})$, qui est de dimension $4$ » → **M5** · D « 2 : c'est l'ordre des matrices de $M_2(\mathbb{R})$, et $Q$ en est une partie » → **M5** *(D réécrit : c'est la face « ordre » de M5, celle qui atteignait l'ancienne clé, et elle est maintenant produite par son étiquette)* |
| **SA-47** | synthese | 4 | $N_0 = \left\{\left(\begin{smallmatrix}x&y\\z&t\end{smallmatrix}\right) \in M_2(\mathbb{R})\ /\ x+t = 0\right\}$ : **donner une base de $N_0$**, et sa dimension | **Base $\left(\begin{smallmatrix}1&0\\0&-1\end{smallmatrix}\right), \left(\begin{smallmatrix}0&1\\0&0\end{smallmatrix}\right), \left(\begin{smallmatrix}0&0\\1&0\end{smallmatrix}\right)$ ; $\dim N_0 = 3$** *(en écrivant $t = -x$ : $\left(\begin{smallmatrix}x&y\\z&-x\end{smallmatrix}\right) = x\left(\begin{smallmatrix}1&0\\0&-1\end{smallmatrix}\right) + y E_{12} + z E_{21}$ — méthode du [C9b])* | B « $2$ : la condition $x+t = 0$ retire deux coefficients sur quatre, $x$ et $t$ » → **M4** *(re-étiqueté : l'ancienne option « $2$ : $t=-x$, donc $x$ et $y$ » **oubliait $z$** sans porter aucun modèle — une faute de calcul ne diagnostique rien, I6 ; la nouvelle compte les lettres de l'équation, ce qui EST M4)* · C « $4$ : la condition ne retire rien, $N_0$ est un sous-espace de $M_2(\mathbb{R})$ qui est de dimension $4$ » → **M5** · D « $2$, base $\left(\begin{smallmatrix}1&0\\0&-1\end{smallmatrix}\right)$ et $\left(\begin{smallmatrix}0&1\\1&0\end{smallmatrix}\right)$ » → **M8** *(re-étiqueté : la famille proposée est libre et **n'engendre pas** — elle imposerait $y = z$. C'est la génération non vérifiée, pas une généralisation hâtive.)* |

*Contrôles de SA-46, refaits le 2026-10-20 (b) en arithmétique exacte.*
- **Génératrice.** $\left(\begin{smallmatrix}a+b&c\\d&0\end{smallmatrix}\right) = (a+b)\,E_{11} + c\,E_{12} + d\,E_{21}$
  ✓, et $a+b$ parcourt tout $\mathbb{R}$ (prendre $b = 0$).
- **Libre.** $\alpha E_{11} + \beta E_{12} + \gamma E_{21} = \left(\begin{smallmatrix}\alpha&\beta\\\gamma&0\end{smallmatrix}\right) = O$
  force $\alpha = \beta = \gamma = 0$ ✓ (rang 3).
- **Ce que chaque modèle donne.** M4 compte quatre lettres et donne $4$ (B). M5 donne $2$ par
  l'indice de $M_2$ (D) et $4$ par l'ambiant (C). La clé, $3$, n'est atteinte par **aucun** modèle
  déclaré. Le lecteur « première ligne » de l'ancien D lirait $a+b$ et $c$, soit $2$ : il tombe sur
  D, pas sur la clé.
- **Deux options valent $4$.** B (M4) et C (M5) annoncent le même nombre avec deux raisons
  différentes. Le précédent est SA-45, dont les trois distracteurs valent $3$, et l'élève choisit sur
  la raison (§11.2, « chaque choix confesse son raisonnement »).
- **Habileté et difficulté maintenues : `directe` / 3.** Le geste est celui du [C13], « une somme
  de lettres parcourt $\mathbb{R}$ », appliqué une fois, puis une lecture sur les $E_{ij}$. La
  difficulté 3 vient de ce qu'il faut repérer la sur-paramétrisation **avant** de compter. La
  rupture de lockstep tient.
- **Originalité.** La forme $\left(\begin{smallmatrix}a+b&c\\d&0\end{smallmatrix}\right)$ n'apparaît
  ni dans ce document, ni dans les six fichiers de la notion et des sujets (recherche normalisée,
  journal (b)). La famille $(E_{11}, E_{12}, E_{21})$ est de l'**outillage**, au sens du préambule
  du §6. *Le lot compte désormais trois items de dimension $3$ dans $M_2(\mathbb{R})$ (SA-46,
  SA-47, SA-49). C'est assumé : « une contrainte coûte une dimension » est la bonne leçon, et
  chaque item y arrive par un objet différent.*

**M7 + M6 · reconnaître une application linéaire** *(bloc NEUF : dans la version du 2026-09-28,
SA-48 était le troisième item du bloc M5 — il y demandait $\dim M_2(\mathbb{R})$. Il change de
bloc en même temps que d'objet, et le bloc M5 passe de trois à deux items, ce que la table des
planchers du §11.0 intègre : M5 reste à **6** parce que six items le portent en distracteur.)*

| id | hab. | diff | objet et question | clé | distracteurs → modèle |
|---|---|---|---|---|---|
| **SA-48** | non_explicite | 3 | **ITEM ENTIÈREMENT REFAIT. Motifs : (a) I7 — l'ancien demandait $\dim M_2(\mathbb{R})$, soit le [C11] mot pour mot, même base, même clé ; (b) la question est désormais celle de `cp-r8-pari-notation` ; (c) S6 — le cadre imprime « **reconnaître** une application linéaire » et aucun item ne le demandait.** On pose $f(x,y) = (2x-y,\ x+3y)$, $g(x,y) = (x-y+1,\ 2y)$ et $k(x,y) = (x-y,\ y-x)$, trois applications de $\mathbb{R}^2$ dans $\mathbb{R}^2$. **Quelle affirmation est exacte ?** | **$f$ et $k$ sont linéaires ; $g$ ne l'est pas, car $g(0,0) = (1,0) \neq (0,0)$** | B « les trois sont linéaires : chaque coordonnée est un polynôme du premier degré en $(x,y)$ » → **M7** · C « $f$ est linéaire ; $k$ ne l'est pas, car elle envoie $\mathbb{R}^2$ sur une droite, et une application linéaire est injective » → **M6** · D « $f$ et $g$ sont linéaires ; $k$ ne l'est pas, car $k(1,1) = (0,0)$ avec $(1,1) \neq (0,0)$ » → **M6** *+ double-tag* **M7** |

*Contrôles de SA-48.* **$f$ linéaire** : $f(\lambda u + \mu v) = \big(2(\lambda x+\mu x') - (\lambda y+\mu y'),\ (\lambda x+\mu x') + 3(\lambda y+\mu y')\big) = \lambda(2x-y,\ x+3y) + \mu(2x'-y',\ x'+3y')$ ✓.
**$k$ linéaire** : mêmes deux lignes, avec $(x-y,\ y-x)$ ✓ — **et son noyau n'est pas trivial**
($k(1,1) = (0,0)$), ce qui est précisément ce que C et D prennent pour une disqualification.
**$g$ non linéaire** : $g(0,0) = (1,0) \neq (0,0)$ ✓. *Un seul énoncé, trois services : la
reconnaissance (S6), la quatrième mesure de M6 (I9) et une troisième mesure de M7.*

**M5 · `dimension-lue-sur-la-notation`** · **et M8 · `famille-generatrice-non-verifiee`**

| id | hab. | diff | objet et question | clé | distracteurs → modèle |
|---|---|---|---|---|---|
| **SA-49** | directe | 2 | $\mathrm{Sym} = \left\{\left(\begin{smallmatrix}a&b\\b&c\end{smallmatrix}\right)\ /\ (a,b,c) \in \mathbb{R}^3\right\}$ : dimension ? | **3** : $\left(\begin{smallmatrix}a&b\\b&c\end{smallmatrix}\right) = a E_{11} + b K + c E_{22}$ avec $K = \left(\begin{smallmatrix}0&1\\1&0\end{smallmatrix}\right)$, famille génératrice et libre | B « 4, c'est un sous-espace de $M_2(\mathbb{R})$ » → **M5** · C « 2, l'ordre de la matrice » → **M5** · D « 2 : la famille $(I, K)$ engendre $\mathrm{Sym}$ — toute matrice symétrique est combinaison de $I$ et de $K$ » → **M8** *(option REFAITE : l'ancienne, « 4, il y a quatre coefficients à écrire », était une **seconde** face M5 mal étiquetée M4 — I6 — et laissait l'item sans aucune différenciation. La nouvelle s'appuie sur un vrai résultat de la leçon, $G' = \mathrm{Vect}(I,K)$ au [C13], **appliqué hors de son domaine** : $\alpha I + \beta K = \left(\begin{smallmatrix}\alpha&\beta\\\beta&\alpha\end{smallmatrix}\right)$ force $a = c$, donc $\left(\begin{smallmatrix}1&0\\0&2\end{smallmatrix}\right)$ échappe.)* *⚠ **Modèle faux sur la clé — accepté, et écrit le 2026-10-20 (b).** M4 (« trois lettres, donc 3 ») atteint la clé. On ne change pas l'objet, pour trois raisons. (1) Sur $\mathrm{Sym}$, les trois lettres sont des coordonnées **libres** ($aE_{11}+bK+cE_{22}$ est de rang 3) : compter les lettres y coïncide avec compter une base, et M4 y est **muet**, il ne donne pas un mauvais nombre. (2) SA-49 **ne porte pas M4**, ses faces fausses sont M5 (B, C) et M8 (D) : une bonne réponse n'y vaut absence d'aucun modèle que l'item diagnostique. (3) M4 est mesuré par huit items où le compte et la dimension **diffèrent** (§11.0). Rendre $\mathrm{Sym}$ sur-paramétré ferait tomber la face M8 du [C13], qui est la raison d'être de D. Voir la précision de §11.2.* |
| **SA-50** | non_explicite | 3 | **ITEM ENTIÈREMENT REFAIT. Motifs : (a) F6 — l'ancien prenait $A = \left(\begin{smallmatrix}1&1\\0&1\end{smallmatrix}\right) = M(1,1)$ et $B = \left(\begin{smallmatrix}2&2\\0&2\end{smallmatrix}\right) = M(2,2)$, **deux éléments de l'ensemble du sommet `r-bac`** (`exercises.yaml:165`), nommait son ensemble $E$ et ses générateurs $A, B$ — les noms de la base du [C10] ; (b) S5/F4 — la génération n'avait aucun item.** Dans $\mathbb{R}^3$, la famille $\big((1,0,2),\ (0,3,1),\ (2,3,5)\big)$ **engendre-t-elle $\mathbb{R}^3$ ?** *(**Vecteurs changés le 2026-10-20 (b)** — passe arithmétique, E2 : l'ancienne famille $\big((1,2,0),(0,1,1),(1,3,1)\big)$ reprenait **deux vecteurs du §6**. $(1,2,0)$ est le générateur du [C9b] (i) et le premier vecteur du [C9b] (ii) ; $(0,1,1)$ est le $v_3$ du [C8]. La phrase de contrôle affirmait pourtant le contraire. C'est le défaut même qui avait fait rejeter l'ancien SA-44 (F6).)* | **Non** : $(2,3,5) = 2\cdot(1,0,2) + (0,3,1)$, donc la famille engendre le même plan que ses deux premiers vecteurs ; les trois vérifient $6x+y-3z = 0$, et $(1,0,0)$ non ($6 \neq 0$) — **$(1,0,0)$ n'est pas atteint** | B « oui : trois vecteurs, trois coordonnées — le compte est bon » → **M4** · C « oui : chacune des trois coordonnées apparaît dans au moins un vecteur, la famille couvre donc tout » → **M8** · D « oui : $(1,0,2)$ et $(0,3,1)$ ne sont pas colinéaires, donc la famille est libre, donc génératrice de $\mathbb{R}^3$ » → **M8** *+ double-tag* **M3** |

*Contrôles de SA-50, refaits le 2026-10-20 (b) en arithmétique exacte.*
- **La relation.** $2\cdot(1,0,2) + (0,3,1) = (2,0,4)+(0,3,1) = (2,3,5)$ ✓. Elle n'a **pas** de
  coefficients $\pm 1$ : ce n'est plus « le troisième est la somme des deux autres », relation déjà
  vue au [C9], au [C10a], au [C12] et à SA-42.
- **Le plan.** Les trois vecteurs vérifient $6x+y-3z = 0$ : $6+0-6 = 0$ ✓ · $0+3-3 = 0$ ✓ ·
  $12+3-15 = 0$ ✓. Le vecteur $(6,1,-3)$ engendre bien les solutions de $\alpha + 2\gamma = 0$,
  $3\beta + \gamma = 0$, c'est-à-dire la normale au plan de $(1,0,2)$ et $(0,3,1)$.
- **Le témoin.** Pour $(1,0,0)$ : $6-0-0 = 6 \neq 0$ ✓, donc $(1,0,0) \notin \mathrm{Vect}$ de la
  famille. Rang de la famille : 2 ; rang avec $(1,0,0)$ : 3.
- **Prémisses des distracteurs, vraies.** C : chaque coordonnée apparaît dans au moins un vecteur,
  $x$ dans $(1,0,2)$, $y$ dans $(0,3,1)$, $z$ dans $(1,0,2)$. D : les trois couples sont non
  colinéaires.
- **Originalité — ce qui a été vérifié, et contre quoi.** Recherche textuelle normalisée (LaTeX
  aplati, espaces retirés) de chacun des trois vecteurs, faite le 2026-10-20 (b). Elle couvre le
  présent document entier, `lesson.md`, `items.yaml`, `checkpoints.yaml`, `bank.yaml` et
  `exercises.yaml` de la notion, ainsi que `docs/sujets/maths/structures-algebriques.md`. Résultat :
  **aucune occurrence** ailleurs que dans cette ligne et ses contrôles. Un `grep` sur tout
  `content/maths` et `docs/sujets/maths` ne trouve que $A(1,0,2)$, **point** d'un repère dans deux
  items de `geometrie-espace` (`items.yaml:2173`, `:2712`) : autre notion, autre objet. Le témoin
  $(1,0,0)$ est un vecteur de la base canonique, donc de l'outillage ; il sert déjà de point de
  contrôle au [C8].

**M6 · `noyau-toujours-nul`**

| id | hab. | diff | objet et question | clé | distracteurs → modèle |
|---|---|---|---|---|---|
| **SA-51** | directe | 2 | $f : \mathbb{R}^2 \to \mathbb{R}^2$, $f(x,y) = (x-2y,\ 2x-4y)$ : $\ker f$ et $\mathrm{Im}\,f$ ? | **$\ker f = \mathrm{Vect}\big((2,1)\big)$ et $\mathrm{Im}\,f = \mathrm{Vect}\big((1,2)\big)$** *(car $2x-4y = 2(x-2y)$, donc $f(x,y) = (x-2y)\cdot(1,2)$)* | B « $\ker f = \{(0,0)\}$ et $\mathrm{Im}\,f = \mathbb{R}^2$ : $f$ est bijective » → **M6** · C « $\ker f = \mathrm{Vect}((2,1))$, mais $\mathrm{Im}\,f = \mathbb{R}^2$, car l'image vit dans $\mathbb{R}^2$ qui est de dimension $2$ » → **M5** · D « $\ker f$ est de dimension $2$ : il y a deux inconnues, $x$ et $y$ » → **M4** |

*Correctif I9 appliqué à SA-51 :* les trois distracteurs portaient **tous M6** — l'item mesurait
« il s'est trompé », pas **quel** modèle tourne, et il gonflait la couverture apparente de M6. Il
porte désormais **M6, M5, M4**, et la face M5 est la plus instructive : elle **accepte** le noyau
non trivial tout en lisant l'image sur l'espace ambiant. *(Et comme l'étiquette M6 de l'ancien
SA-41 D disparaît avec la refonte de SA-41, M6 reste à quatre items grâce au nouveau SA-48 C/D —
le plancher ne s'appuie plus sur une étiquette discutable.)*

| id | hab. | diff | objet et question | clé | distracteurs → modèle |
|---|---|---|---|---|---|
| **SA-52** | **directe** | **3** | $\varphi : \mathbb{R}^2 \to M_2(\mathbb{R})$, $\varphi(a,b) = \left(\begin{smallmatrix}a+b&0\\0&a+b\end{smallmatrix}\right)$ : $\ker\varphi$ et $\mathrm{Im}\,\varphi$ ? | **$\ker\varphi = \mathrm{Vect}\big((1,-1)\big)$ (dimension 1), $\mathrm{Im}\,\varphi = \mathrm{Vect}(I)$ (dimension 1)** *(car $\varphi(a,b) = (a+b)\,I$)* | B « $\ker\varphi = \{(0,0)\}$ et $\mathrm{Im}\,\varphi = M_2(\mathbb{R})$ » → **M6** · C « $\mathrm{Im}\,\varphi$ est de dimension $4$, puisqu'elle vit dans $M_2(\mathbb{R})$ » → **M5** *(double-tag prévu : notation ↔ image)* · D « $\ker\varphi$ est de dimension $2$ : deux paramètres $a$ et $b$ » → **M4** |
| **SA-53** | synthese | 4 | $f : (\mathbb{C}^*,\times) \to (\mathbb{R}^*_+,\times)$, $f(z) = \lvert z\rvert$ (morphisme, car $\lvert zz'\rvert = \lvert z\rvert\lvert z'\rvert$) : quel est $\ker f$, et qu'est-ce que cela dit de $f$ ? | **$\ker f = \{z \in \mathbb{C}^*\ /\ \lvert z\rvert = 1\}$, le cercle unité ; c'est un sous-groupe de $(\mathbb{C}^*,\times)$, et $f$ n'est pas injective** *(par exemple $f(1) = f(-1) = f(i) = 1$)* | B « $\ker f = \{1\}$ : un morphisme conserve le neutre, et le noyau est l'ensemble des éléments envoyés sur le neutre » → **M6** *(reformulé : l'ancienne version disait « le noyau d'un morphisme **se réduit au** neutre », un absolu barrable à vue — I8)* · C « $\{\lvert z\rvert = 1\}$, mais ce n'est pas un sous-groupe : il ne contient pas $0$ » → **`neutre-non-transporte`** *(**ré-étiqueté le 2026-10-20 (b)**, c'était M2. L'élève cherche dans un groupe **multiplicatif** le neutre $0$, celui de $+$ et du $0_E$ du chapitre, au lieu du neutre $1$ de la loi en jeu. C'est un neutre **recopié** d'une structure à l'autre au lieu d'être recalculé, ce que décrit l'id existant. **Ajustement imparfait, dit comme tel :** le label de `neutre-non-transporte` parle d'un isomorphisme, et ici le neutre est recopié entre deux **lois**, pas à travers une application. C'est l'id déclaré le plus proche ; M2, la liste d'une structure voisine, en décrivait moins bien le geste)* · D « $f$ est injective : $\lvert z\rvert = \lvert z'\rvert$ entraîne $z = z'$ » → **M6** *(re-étiqueté : c'était `generalisation-hative`, alors que « l'image égale détermine l'antécédent » est **exactement** M6 — I6)* |

### 11.2 Règles de rédaction — non négociables
- **Ne pas pré-résoudre.** Aucun item ne reprend un objet du §6, ni un objet de `bank.yaml`, **ni
  un objet des deux `exercises.yaml`** (ajout du 2026-10-20 : c'est par là que SA-50 est passé —
  F6). La liste des objets **interdits** est au préambule du §6 ; les 18 objets ci-dessus ont été
  choisis contre elle, un par un, **et les dix refaits ont été re-vérifiés contre elle dans cette
  session.** ⚠ *Corrigé le 2026-10-20 (b) : cette re-vérification était **incomplète**. SA-50
  reprenait deux vecteurs du §6, et le $J$ de `r8-variation` était la matrice $B$ du [C7]/[C10].
  Les deux sont refaits. **La re-vérification par machine est désormais la règle** : recherche
  normalisée de chaque vecteur et de chaque matrice dans ce document et les six fichiers de la
  notion et des sujets, avec les objets connus comme témoins positifs. Le journal (b) dit pourquoi
  ces témoins sont nécessaires.* *Rappel de la frontière : l'**outillage** de notation ($I$, $O$, $K$, $E_{ij}$) se
  réemploie librement ; ce qui est interdit, c'est l'objet d'une question.*
- **Chaque choix confesse son raisonnement** (une affirmation **plus** sa raison), jamais un nombre
  nu : c'est ce qui empêche qu'un élève atteigne la clé avec un modèle faux — le défaut de
  **contamination de la bonne réponse**, qui se corrige sur l'énoncé, pas sur le distracteur.
  **Deux applications neuves de cette règle, parce qu'elle était violée :**
  - **SA-44 B** disait « *libre, le système n'a que la solution nulle* » — une affirmation **nue et
    fausse**, qui ne diagnostique rien (« j'ai mal résolu » n'est pas un modèle). Elle est
    remplacée par une option dont **les deux prémisses sont vraies et vérifiables** (correctif m5).
  - **SA-43 D** annonçait le **même verdict que la clé** (« liée ») par un raisonnement faux.
    ⚠ **Formulation de ma règle à corriger, et je la corrige ici plutôt que de la laisser passer :**
    ce **n'est pas** une contamination de la bonne réponse au sens strict — l'option est un énoncé
    complet (verdict **plus** raison), donc l'élève qui tient le modèle faux choisit **D**, et il
    est diagnostiqué. *La règle exacte est plus étroite, et la voici :* **un modèle faux ne doit
    pas pouvoir atteindre la CLÉ ; et si l'énoncé ne demande qu'un verdict, c'est l'ÉNONCÉ qu'il
    faut changer** (« libre ou liée **et pourquoi** ? »), jamais le distracteur. *(Le checkpoint
    `cp-r8-pari-scalaire` §7.1 a d'ailleurs, légitimement, un distracteur D qui partage le verdict
    « Non » de la clé avec une raison fausse — et il discrimine parfaitement. Une règle qui le
    condamnerait serait fausse.)* **Ce qui reste donc reproché à l'ancien SA-43 D est (a) son
    absolu, (b) le fait qu'un élève qui ne lit que les verdicts soit récompensé d'un modèle faux.**
    La nouvelle option dit « libre », ce qui supprime (b) sans rien coûter.
  - ⚠ **PRÉCISION DU 2026-10-20 (b) — quels modèles faux la règle vise.** La passe arithmétique a
    trouvé trois endroits où un modèle faux atteint la clé : `cp-r8-pari-notation` (M4 compte
    quatre lettres, $4$), SA-46 (M5, l'indice de $M_2$, $2$) et SA-49 (M4 compte trois lettres,
    $3$). La relecture en a ajouté quatre : SA-36, SA-37, SA-38 et SA-41, où M2 appliqué selon la
    liste du **sous-groupe** trouve le même témoin ou le même verdict que la clé. **La règle exacte
    est la suivante.**
    1. **Un modèle que l'item DIAGNOSTIQUE**, c'est-à-dire qu'au moins un de ses distracteurs
       porte, **ne doit pas atteindre la clé**. Sinon une bonne réponse s'enregistre comme
       l'absence d'un modèle que l'élève tient. **Remède : changer l'objet.** C'est ce qui a été
       fait pour SA-46, qui porte M5 et dont la clé passe de $2$ à $3$.
    2. **Un modèle que l'item ne porte pas** peut atteindre la clé quand, **sur l'objet de
       l'item**, il coïncide avec la bonne méthode : les lettres sont libres, ou la condition qui
       tombe est commune aux deux listes. Le modèle est alors **muet** sur cet objet. C'est
       admissible à trois conditions :
       - (a) c'est **écrit dans la ligne** de l'item ;
       - (b) l'item **ne porte pas** ce modèle ;
       - (c) le modèle est mesuré ailleurs, sur un objet où il **diverge** de la bonne méthode.

       Cas couverts : `cp-r8-pari-notation` (M4), SA-49 (M4), SA-36 et SA-38 (M2, retiré de ces
       deux items par la même passe).
    3. **Cas limite, nommé et non masqué : SA-37 et SA-41.** Ces deux items **portent** M2, mais
       sous une variante précise : « sous-groupe testé sur une seule droite » pour SA-37 D,
       « sous-anneau » pour SA-41 B. La variante « liste du sous-groupe appliquée correctement »,
       elle, y atteint la clé, parce que la condition qui tombe ou celle que la question nomme est
       commune au sous-groupe et au sous-espace. M2 n'est **diagnosticable pur** que là où
       sous-groupe ✓ et sous-espace ✗, c'est-à-dire à SA-39 et SA-40, ses deux items cibles.
       *Décision par défaut : garder les deux étiquettes de variante, puisque chacune est produite
       par son modèle, et le dire ici. Si le propriétaire veut que l'étiquette ne porte qu'un
       modèle pur, la réponse est de retirer M2 de SA-37 D et de SA-41 B et C. M2 tomberait alors
       à **2 items** (SA-39, SA-40), sous le plancher, et il faudrait un item M2 de plus.* → à
       trancher en revue ; rien n'est caché.
- **Aucun absolu RÉGULATEUR dans une option** — et surtout **pas trois distracteurs sur-affirmants
  contre une clé sobre** : `indice-absolu.mjs` mesure exactement cela (« *la bonne réponse se
  dénonce-t-elle en étant la seule qui ne sur-affirme pas ?* »). *Cinq absolus relevés dans la
  version du 2026-09-28 (SA-37 D « **toute** partie stable… », SA-40 D « **seule** la loi $+$
  compte », SA-43 D « **ne peuvent pas** être libres », SA-51 D « **ne laissent que** le vecteur
  nul », SA-53 B « **se réduit au** neutre») : les cinq options sont réécrites ci-dessus — I8.*
  ⚠ **PRÉCISION NÉCESSAIRE, ajoutée le 2026-10-20.** La règle visait des **quantificateurs de
  règle** (« toute partie… est », « on ne peut jamais », « seul … compte ») — ceux qui se barrent à
  vue parce qu'un énoncé mathématique vrai est rarement aussi large. Elle **ne** visait **pas** les
  **négations factuelles locales** (« *aucun de ces trois vecteurs n'est nul* », « *aucun couple
  n'est colinéaire* »), qui sont la manière normale d'énoncer une vérification en algèbre linéaire
  et que la critique n'a d'ailleurs relevées dans aucune option. *Sans cette distinction la règle
  est inapplicable au chapitre : la liberté d'une famille **se dit** par une négation.* **Le test à
  appliquer, option par option : la phrase prétend-elle régir TOUS les objets d'un type (à barrer),
  ou constate-t-elle un fait sur LES objets de l'énoncé (à garder) ?**
- **La clé n'est ni la plus longue ni la plus courte** (`indice-longueur`). *Trois clés étaient de
  loin les plus longues (SA-36, SA-41, SA-53).*
- ⚠ **LES TEXTES D'OPTIONS DU §11.1 SONT DES CANEVAS, PAS LA RÉDACTION FINALE — et c'est désormais
  écrit (correctif I8).** Ils disent **quel modèle** l'option doit rendre atteignable et **quel
  raisonnement** elle doit confesser. **item-author les ré-rédige** en tenant les deux règles
  ci-dessus, puis **relance `indice-absolu` et `indice-longueur`** et lit les deux sorties. *Un
  canevas qu'on recopie tel quel devient la rédaction finale par défaut : c'est ainsi que cinq
  absolus auraient été livrés.*
- **Un distracteur atteignable par deux modèles se DOUBLE-TAGUE** (ce n'est pas un défaut : la
  co-attribution cible↔distracteur entre compétences se double-tague, seule la contamination de la
  **bonne réponse** est un défaut d'énoncé). **Double-tags prévus, liste à jour au 2026-10-20 (b) :**
  SA-37 D (M2 ↔ `generalisation-hative`, ajouté en (b)) · SA-41 C (M1 ↔ M2) · SA-42 D et SA-45 D
  (comptage ↔ liberté) · SA-48 D (M6 ↔ M7) · SA-50 D (M8 ↔ M3) · SA-52 C (notation ↔ image).
- `tags:` `[misconception_driven, maths_structures_alg, <sous-espace|famille-libre|famille-generatrice|base-dimension|application-lineaire>]`
  *(valeur `famille-generatrice` ajoutée : sans elle, le savoir-faire « génération » reste
  invisible à tout filtre — S5.)*
- Chaque distracteur porte un `feedback` qui **nomme le modèle**, pas seulement l'erreur (règle de
  la maison, `checkpoints.yaml:8-10`).
- **Le champ `solution` suit le standard de CETTE notion (correctif m7) :** la correction se
  termine par un paragraphe « **Pourquoi les distracteurs échouent** », qui prend les trois options
  fausses **une par une** et nomme le modèle de chacune (exemplaire : `items.yaml:2262-2267`).
  *Sans cette ligne, dix-huit items partent avec ce que l'auteur improvise.*

---

## 12. Ce que le récapitulatif, « Pour t'entraîner » et la lacune `:285` deviennent

### 12.1 Récapitulatif : il n'y en a pas, et on n'en fabrique pas
Mesuré (§1.l) : la leçon n'a **ni** « Pour t'entraîner », **ni** « Récapitulatif », **ni**
`retenir.json`. La règle d'état honnête du dépôt est explicite : « *on ne fabrique pas un « à
retenir » pour meubler une colonne* » (`web/src/lib/retenir.ts:19-21`). **Cette spec n'en crée
aucun.** *Option, si le propriétaire la veut* (§15 Q9) : un `retenir.json` d'**une seule entrée**,
`{ "chapitre": 11, "formula": "H \\text{ sous-espace} \\iff 0_E \\in H \\ \\text{et}\\ u+v \\in H \\ \\text{et}\\ \\lambda u \\in H", "note": "…" }` —
le champ `chapitre` existe précisément pour les chapitres adressables par numéro.
*(Formule corrigée le 2026-10-20 : elle portait la forme compacte en $\lambda u + \mu v$ et la
lettre $F$. Un « à retenir » qui n'est pas la forme enseignée serait pire que son absence —
correctifs F1 et F10.)*

### 12.2 Le SOMMET du chapitre 11 — `r8-bac` et `r8-variation`

> ⚠ **SECTION RENVERSÉE LE 2026-10-20 — correctif B1 (bloquant, critique pédagogique) et F3+F5
> (bloquants, critique de fidélité).** La version du 2026-09-28 écrivait « **Cette spec n'en ajoute
> pas** » et motivait ce refus par l'arbitrage en attente sur le sujet **2018 N**. **Le motif ne
> résiste pas au dépôt, sur trois points :**
> 1. **La boîte « sommet » du template ne demande pas la chaîne complète** — elle demande *un*
>    exercice de type bac issu d'un sujet national identifié. `bk-2023-n-x5` q1-q2 l'est :
>    sourcing **`vérifié`**, re-fetch et diff caractère par caractère, et il imprime
>    textuellement « *Montrer que $E$ est un sous-espace vectoriel de $(M_2(\mathbb{R}),+,\cdot)$* »
>    (`bank.yaml:1488`). **Aucun arbitrage n'est nécessaire pour l'ouvrir.**
> 2. **« Une annale, une entrée » n'est pas la règle de la maison** : `r-bac` (2019 N,
>    `exercises.yaml:28-39`, `status: sourced`) transcrit **le même sujet** que `bk-2019-n-x1`
>    (`bank.yaml:290`), et `bank.yaml:43-57` l'écrit explicitement comme une **convenance
>    d'arbitrage**, pas comme une interdiction.
> 3. **Le chapitre enseignait une rédaction et ne mesurait qu'une reconnaissance.** Le [C7] dit en
>    gras que ce qui rapporte le point est « **le critère rédigé** », et les 18 items sont des QCM :
>    la seule surface où l'élève **produit** une démonstration, dans ce dépôt, c'est
>    `exercises.yaml` avec ses `steps` — précisément ce que la spec refusait. *Et le cadre imprime
>    le verbe* **Démontrer** *(`maths-sm.yaml:295`), là où 100 % des questions attestées disent*
>    « **Montrer que** ».
> 4. **La porte ne pouvait pas le voir** : `web/scripts/rampe-bac.mjs` mesure **par notion**, pas
>    par barreau — la notion restait verte grâce au `r-bac` de R7. *Un vert qui ne dit rien sur R8
>    (ADR 0033).*

#### 12.2.1 `r8-bac` — l'annale vérifiée, Partie I questions 1 et 2

| champ | valeur |
|---|---|
| `id` | `r8-bac` |
| `title` | « Exercice de type bac — sous-groupe additif et sous-espace vectoriel de $M_2(\mathbb{R})$ (2023) » |
| `sourcing.status` | **`sourced`** |
| `sourcing.note` | 2023 session normale — examen national Sciences Mathématiques, exercice 5 « Structures algébriques », barème de l'exercice 3,5 points ; **Partie I, questions 1 et 2 uniquement**. Transcription vérifiée : `content/maths/structures-algebriques/bank.yaml` entrée `bk-2023-n-x5` (sourcing `vérifié`, re-fetch et diff caractère par caractère), elle-même adossée à `docs/sujets/maths/structures-algebriques.md`. **Jumelage assumé avec la banque**, précédent `r-bac`/`bk-2019-n-x1` (`bank.yaml:43-57`). |
| questions | **`q1`** — *(0,5 pt)* « Montrer que $E$ est un sous-groupe de $(M_2(\mathbb{R}),+)$. » · **`q2`** — *(0,25 pt)* « Montrer que $E$ est un sous-espace vectoriel de $(M_2(\mathbb{R}),+,\cdot)$. » |

**Règle de transcription, stricte.** Les `stem`, `reasoning` et `steps` des deux questions sont
**ceux de `bank.yaml:1467-1501`**, repris tels quels. **Aucun nombre n'est recalculé ici**, et
content-author n'en invente aucun : l'objet est
$E = \left\{M(x,y) = \left(\begin{smallmatrix}x+y&y\\2y&x-y\end{smallmatrix}\right)\ /\ (x,y)\in\mathbb{R}^2\right\}$,
tel qu'imprimé (`bank.yaml:1463`). **Trois ajustements, et seulement trois :**
1. **L'`intro` de l'exercice reprend le rappel de tête d'énoncé** (`bank.yaml:1461`) et **ajoute la
   phrase sur les lettres** : dans la leçon $E$ était l'espace ambiant et $H$ la partie à tester ;
   ici l'ambiant est $M_2(\mathbb{R})$ et la partie s'appelle $E$ (§10.3, F10).
2. **Les `note` d'étapes renvoient au chapitre 11** au lieu de parler d'« un chapitre antérieur du
   cursus, jamais enseigné » (§14).
3. **L'`intro` ne dit PAS ce qui reste à démontrer en q2.** *C'est la réponse ; c'est à l'élève.*
   **Et c'est pour cela que le §6.6 a été réécrit et que SA-41 a été refait** (F3) : les deux
   pré-résolvaient cette question.
**`[[exercise:r8-bac]]`, sous un titre `### Exercice de type bac`** — jamais `## ` (§10.3).

**Pourquoi cet exercice est le bon sommet, et pas un pis-aller :** c'est **la question même** qui a
fait écrire cette spec. La note de périmètre de la banque (`bank.yaml:164-175`) signalait depuis le
2026-08-06 que `bk-2023-n-x5` q2 mobilisait une notion qu'aucune leçon n'enseignait. **Le chapitre
se termine donc sur la question qui l'a causé** — et cette boucle est elle-même une leçon.

#### 12.2.2 `r8-variation` — le jumeau frais, dans la configuration ATTESTÉE

> **Pourquoi une variation, et pourquoi CELLE-LÀ.** (a) Le template exige une variation
> anti-mémorisation à côté de tout sommet. (b) **Correctif F5** : les deux sujets attestés
> travaillent sur un $E$ qui **contient $I$**, avec $(I,J)$ pour base — et le chapitre, par
> anti-motif délibéré ([C10] : « la base n'est pas $(I,J)$ par nature »), ne montrait **jamais**
> cette configuration. L'anti-motif est juste et reste ; mais l'élève doit aussi avoir marché la
> configuration que le papier lui donne. (c) **Correctif F4/S5** : c'est ici que « **base** »
> devient un objet **produit**, rédigé, et pas un QCM.

**L'objet, choisi frais et vérifié contre toute la liste d'interdits :**
$$E = \left\{ M(x,y) = \begin{pmatrix} x & y \\ -y & x-y \end{pmatrix}\ /\ (x,y) \in \mathbb{R}^2 \right\} \subset M_2(\mathbb{R}).$$
⚠ *Ensemble changé le 2026-10-20 (b) — passe arithmétique, collision E3. La version (a) posait
$E = \left\{\left(\begin{smallmatrix}x&y\\-y&x+y\end{smallmatrix}\right)\right\}$, dont le
$J = M(0,1) = \left(\begin{smallmatrix}0&1\\-1&1\end{smallmatrix}\right)$ est **exactement la
matrice $B$ du [C7]/[C10]**, la base de $V$, dont la table des lettres (§10.3) réserve le nom.
Le contrôle d'originalité ci-dessous comparait des **formes d'ensembles**, jamais les **éléments
nommés** que la question fait calculer : c'est par là que la collision est passée. Le signe du
coefficient $(2,2)$ change ($x+y \to x-y$), et le nouveau $J = \left(\begin{smallmatrix}0&1\\-1&-1\end{smallmatrix}\right)$
n'apparaît nulle part ailleurs (recherche normalisée, journal (b)).*
*Forme $M(x,y)$ avec $(x,y)$ — **la notation des sujets**, pas le $M(a,b)$ de la leçon (correctif
F11 : 100 % des attestations impriment $M(x,y)$ ; le chapitre doit l'imprimer au moins une fois, et
c'est ici, dans le beat de forme d'examen).*
**Contrôle d'originalité, fait objet par objet :** ≠ 2023
$\left(\begin{smallmatrix}x+y&y\\2y&x-y\end{smallmatrix}\right)$ · ≠ 2018
$\left(\begin{smallmatrix}x&-2y\\y&x+2y\end{smallmatrix}\right)$ · ≠ 2022
$\left(\begin{smallmatrix}a&3b\\b&a\end{smallmatrix}\right)$ · ≠ 2019/`r-bac`
$\left(\begin{smallmatrix}x&y\\0&x\end{smallmatrix}\right)$ · ≠ 2020
$\left(\begin{smallmatrix}1&x\\0&y\end{smallmatrix}\right)$ · ≠ chapitre 5
$\left(\begin{smallmatrix}a&-b\\b&a\end{smallmatrix}\right)$ · ≠ chapitre 10
$\left(\begin{smallmatrix}x&-y\\y&x\end{smallmatrix}\right)$ · ≠ [C6]
$\left(\begin{smallmatrix}a&a+b\\a-b&b\end{smallmatrix}\right)$ · ≠ [C13]
$\left(\begin{smallmatrix}a+b&c\\c&a+b\end{smallmatrix}\right)$ · ≠ SA-39, SA-41, SA-46, SA-47,
SA-49.
**Et, depuis la révision (b), élément par élément** — les matrices que la question fait **nommer**
ne doivent pas non plus être des objets du §6 :
- $J = M(0,1) = \left(\begin{smallmatrix}0&1\\-1&-1\end{smallmatrix}\right) \neq B = \left(\begin{smallmatrix}0&1\\-1&1\end{smallmatrix}\right)$
  du [C7]/[C10] ;
- $J \notin Z$ (SA-41), puisque son coefficient $(2,1)$ vaut $-1$ et son $(1,2)$ vaut $1$ ;
- l'élément $\left(\begin{smallmatrix}0&1\\1&1\end{smallmatrix}\right)$ de $Z$ n'est pas dans $E$ ;
- $I$ est le seul élément nommé que $E$ partage avec un autre objet, et c'est de l'**outillage**.

*Ressemblance de famille avec SA-41, assumée :* $Z$ et $E$ contiennent tous deux $I$ et sont tous
deux stables pour $\times$. Ils diffèrent par **deux** coefficients, $(2,1)$ ($b$ contre $-y$) et
$(2,2)$ ($a+b$ contre $x-y$) ; la version (a) n'en différait que par un signe. Ce n'est pas une
collision : aucune question de l'un ne se résout par une conclusion de l'autre.

| champ | valeur |
|---|---|
| `id` | `r8-variation` |
| `title` | « Variation fraîche — un autre ensemble de matrices, et sa base $(I,J)$ » |
| `sourcing.status` | **`not-applicable`** |
| `sourcing.note` | Variation construite exprès (anti-mémorisation) — n'a pas vocation à être un sujet réel. Le sujet réel est `r8-bac` (2023, sourcé). **Même chaîne que les deux attestations** (sous-groupe → sous-espace → base), sur un ensemble qui **contient $I$**, afin que la configuration $(I,J)$ du papier soit marchée au moins une fois. Ensemble et nombres choisis pour des vérifications exactes faites à la main, **deux fois**. |

**Les trois questions, et toute leur solution, calculée ici.**

**q1 — Montrer que $E$ est un sous-groupe de $(M_2(\mathbb{R}),+)$.**
- $O = M(0,0) \in E$ ✓ (les quatre coefficients sont nuls) ;
- stabilité : $M(x,y) + M(x',y') = \left(\begin{smallmatrix} x+x' & y+y' \\ -(y+y') & (x-y)+(x'-y') \end{smallmatrix}\right) = \left(\begin{smallmatrix} x+x' & y+y' \\ -(y+y') & (x+x')-(y+y') \end{smallmatrix}\right) = M(x+x',\ y+y') \in E$ ✓
  *(contrôle du coefficient $(2,2)$, refait : $(x-y)+(x'-y') = (x+x')-(y+y')$ ✓)* ;
- opposé : $-M(x,y) = \left(\begin{smallmatrix} -x & -y \\ y & -x+y \end{smallmatrix}\right) = M(-x,-y)$ ✓
  *(contrôles : coefficient $(2,1) = -(-y) = y$ ✓ ; coefficient $(2,2) = (-x)-(-y) = -x+y$ ✓)*.

**q2 — Montrer que $E$ est un sous-espace vectoriel de $(M_2(\mathbb{R}),+,\cdot)$.**
- non vide : $O \in E$, **q1** ;
- stable pour $+$ : **q1** ;
- stable pour $\cdot$ : $\lambda \cdot M(x,y) = \left(\begin{smallmatrix} \lambda x & \lambda y \\ -\lambda y & \lambda(x-y) \end{smallmatrix}\right) = \left(\begin{smallmatrix} \lambda x & \lambda y \\ -\lambda y & \lambda x - \lambda y \end{smallmatrix}\right) = M(\lambda x,\ \lambda y) \in E$ ✓.

**C'est la cascade de l'examen, et l'élève la découvre en la faisant** — deux conditions sur trois
viennent de la question précédente, **et c'est lui qui doit s'en apercevoir.**

**q3 — On pose $J = M(0,1)$. Montrer que $(I,J)$ est une base de l'espace vectoriel réel
$(E,+,\cdot)$, puis donner $\dim E$.**
- $I = M(1,0) = \left(\begin{smallmatrix}1&0\\0&1\end{smallmatrix}\right) \in E$ ✓ *(avec $x=1$,
  $y=0$ : coefficient $(2,2) = x-y = 1$ ✓)* ; $J = M(0,1) = \left(\begin{smallmatrix}0&1\\-1&-1\end{smallmatrix}\right)$ ;
- **génératrice** : $x I + y J = \left(\begin{smallmatrix}x&0\\0&x\end{smallmatrix}\right) + \left(\begin{smallmatrix}0&y\\-y&-y\end{smallmatrix}\right) = \left(\begin{smallmatrix}x&y\\-y&x-y\end{smallmatrix}\right) = M(x,y)$ ✓ — tout élément de $E$ s'écrit donc $xI + yJ$ ;
- **libre** : $\alpha I + \beta J = \left(\begin{smallmatrix}\alpha&\beta\\-\beta&\alpha-\beta\end{smallmatrix}\right) = O$ donne $\alpha = 0$ (coefficient $(1,1)$) et $\beta = 0$ (coefficient $(1,2)$) ✓ ;
- donc **$(I,J)$ est une base de $(E,+,\cdot)$ et $\dim E = 2$.**
*(q1–q3 refaites le 2026-10-20 (b) sur le nouvel $E$ ; chaque égalité ci-dessus est re-vérifiée en
arithmétique exacte, journal (b).)*

*Remarque pour l'auteur, à ne PAS écrire dans l'énoncé :* la question « $\dim E$ » est **accolée**
à la question « base » parce que **la dimension n'est attestée dans aucun sujet de maths de ce
dépôt** (§3.4) : elle est nommée par le cadre (`:293`, `:295`), donc elle est enseignée et
évaluée — mais dans la **variation**, pas dans l'annale. *C'est l'allocation honnête : l'attesté
porte le sommet sourcé, le dérivé porte la variation.*

**Ce que les deux exercices rendent au bilan des boîtes du template :** *tentative-d'abord* ✓
(aucune solution imprimée avant l'engagement) · *raisonnement sur chaque question du sommet* ✓
(champ `reasoning`, repris de la banque pour `r8-bac`, écrit pour la variation) ·
*sourcing réel* ✓ (`sourced` sur un sujet national vérifié) · *variation anti-mémorisation* ✓.

#### 12.2.3 Le sujet 2018 : toujours pas converti, et ce n'est plus bloquant
Le sujet **2018 N Ex1** reste **hors banque** : sa fiche porte « ⚠ *Source retypée non-officielle —
conversion en banque soumise à arbitrage owner* » (`docs/sujets/maths/structures-algebriques.md:240`).
**Mais le chapitre ne l'attend plus.** Si l'arbitrage tombe favorablement, 2018 N Ex1 devient un
**second** `r8-bac` possible (c'est la seule annale qui pose la chaîne complète sous-groupe →
sous-espace → **base**, et sa q2b est l'original dont `r8-variation` est le jumeau frais) — mais
le chapitre est **complet sans lui**. → §15 Q2, défaut inchangé (**non**).

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
4. **Ne pas convertir le sujet 2018** en banque sans l'arbitrage (§12.2.3).
5. **Ne pas inventer un chiffre d'examen — et ne pas en porter un à l'élève, même juste.** Le seul
   chiffre sourçable est le barème relevé (0,25 pt et 0,5 pt sur 3,5), et **il reste côté auteur**
   (§3.2 point 4, §10.4) ; « 35 % » est le poids d'un bloc de deux sous-domaines ; **« c'est peu »,
   « point gratuit », « 7,1 % » sont interdits** (F2).
6. **Ne pas faire de l'espace vectoriel un anneau.** Le $V$ du [C6] n'est **pas** stable pour
   $\times$ et ne contient pas $I$ ; le chapitre ne le prétend nulle part. *(En revanche le $E$ de
   `r8-variation` **contient** $I$ — et ce n'est pas une contradiction : contenir $I$ n'est ni
   nécessaire ni suffisant pour être un sous-espace, et c'est ce que les deux objets, mis côte à
   côte, enseignent.)*
7. **Ne pas recycler** un objet du §6 dans un item, ni un objet de `bank.yaml` **ou de
   `exercises.yaml`** dans la prose ou dans un item (§6 préambule, §11.2).
8. **Ne pas ajouter une misconception non déclarée** : la porte échoue, et le modèle apprenant se
   remplit d'un id fantôme (`validate-content.mjs:457-466`). **Symétriquement : ne pas laisser une
   rupture de prose sans ligne au registre** — c'est le défaut qui a produit M7 et M8.
9. **Ne pas recopier les textes d'options du §11.1 tels quels.** Ce sont des canevas ; cinq
   d'entre eux portaient des absolus barrables à vue, et deux donnaient le bon verdict par un faux
   raisonnement (§11.2, I8).
10. **Ne pas réécrire le critère en deux conditions « parce que c'est plus élégant ».** Trois
    conditions, dans l'ordre, parce que la banque les imprime et que la cascade d'examen en dépend
    (F1). La forme compacte est au [C6b], **après**, et avec sa mise en garde.
11. **Ne pas donner, en prose, la réponse d'une question du sommet.** Cela vaut pour le §6.6
    (réécrit) et pour tout item : la cascade sous-groupe → sous-espace **est** la q1 → q2 de
    `r8-bac` (F3).

---

## 14. Registres, sceaux et fichiers à mettre à jour à la livraison

**À éditer dans la notion** (au-delà des **cinq** fichiers de contenu — `exercises.yaml` s'ajoute
depuis la révision du 2026-10-20) :
- `bank.yaml:144-175` (SCOPE NOTE 3) — la note dit « *à l'attention du pedagogy-architect si un pont
  explicite … est jugé utile* » : y écrire que le pont existe, et lequel ; **et que `bk-2023-n-x5`
  q1-q2 est désormais jumelé à `r8-bac`**, sur le précédent `r-bac`/`bk-2019-n-x1` (`:43-57`).
- **`bank.yaml:51-57` — AJOUTÉ le 2026-10-20 (b), relevé par la passe arithmétique (§5).** La
  note éditoriale d'en-tête liste `bk-2023-n-x5` parmi les annales qui « *ne recoupent aucun autre
  sommet* » (`:51-57` à la lecture du 2026-10-20 ; la phrase elle-même est aux `:54-55`) et
  précise : « *exercises.yaml de cette notion ne contient que r-bac … et r-variation* ». **Les deux
  affirmations deviennent fausses à la livraison** : `r8-bac` transcrit `bk-2023-n-x5` q1-q2, et
  `exercises.yaml` gagne deux entrées. À réécrire en ajoutant `bk-2023-n-x5` ↔ `r8-bac` au
  jumelage déjà décrit pour `bk-2019-n-x1` ↔ `r-bac` (`:43-51`).
- `bank.yaml:1448-1449` — « *q2 mobilise la notion de sous-espace vectoriel (chapitre antérieur,
  jamais enseigné dans lesson.md)* » : **devient faux à la livraison**.
- `bank.yaml:1490` — le `reasoning` de q2 dit « *mobilise une notion d'un chapitre antérieur du
  cursus … pas un outil neuf de ce chapitre* » : à réécrire en renvoyant au **chapitre 11**.
- **`bank.yaml:1495` et `bank.yaml:1501` — AJOUTÉS À LA LISTE le 2026-10-20 (correctif F1).** Ces
  deux `note` d'étapes sont les lignes qui **imprimaient déjà le critère à trois conditions** :
  « *Deux des trois conditions d'un sous-espace vectoriel, déjà établies* » et « *Non vide, stable
  pour $+$ et pour $\cdot$ : les trois conditions sont réunies* ». **Leur contenu est désormais
  JUSTE au regard de la leçon** — c'est la leçon qui s'est alignée sur elles. L'édition est donc
  légère et d'une autre nature : **y nommer le chapitre 11**, pour que le renvoi existe dans les
  deux sens (ADR 0031 : une référence croisée est une instruction). *Si cette ligne manquait à la
  liste, la leçon et la banque se seraient contredites en silence — c'est ce que la critique de
  fidélité a relevé.*
- `checkpoints.yaml:51-54` — le **garde-fou de périmètre** énumère les notions du chapitre et
  s'arrête à « morphisme / isomorphisme » : **édition obligatoire** (espace vectoriel, sous-espace,
  combinaison linéaire, **sous-espace engendré**, famille libre/génératrice, base, dimension,
  application linéaire, noyau, image).
- `items.yaml` — `coverage_summary` (§11.0), **huit** lignes `per_misconception` neuves, **et quatre
  lignes existantes à mettre à jour** (ajout du 2026-10-20 (b)) : `generalisation-hative` 17,
  `cloture-non-verifiee` 10, `axiome-oublie` 8, `neutre-non-transporte` 6. **Et le paragraphe
  `habilete_ramp_transport_family`**, qui dit les huit items de la famille transport « *les seuls
  à porter l'étiquette `habilete`* » : c'est déjà faux aujourd'hui (SA-35 la porte, §1.k), et ce
  sera faux de dix-huit items de plus.
- **`exercises.yaml` — DEUX entrées neuves** (`r8-bac`, `r8-variation`, §12.2), et l'en-tête du
  fichier (`:1-16`) à compléter : il décrit aujourd'hui une notion à **deux** exercices accrochés
  au chapitre 10.

**Portes et sceaux à relancer puis à re-sceller** (aucun n'a été lancé ici) :
`validate-content.mjs` · `carte-chapitres.mjs --porte` puis `--sceller` ·
`couverture-diagnostique` (18 items de plus) · **`rampe-bac` (deux exercices de plus — et c'est la
porte qui ne pouvait pas voir le trou, puisqu'elle mesure par notion et non par barreau : son vert
d'avant ne disait rien de R8, ADR 0033)** · `indice-longueur` · `indice-absolu` · `indice-refus` ·
`eleve-ruse` — **les six derniers portent un `.base.json` qui nomme cette notion** : leur sceau
**va bouger**, et c'est le but (il force la relecture).

**Registres à corriger (hors notion, propriétaire dans la boucle) :**
`docs/cadre/curriculum/maths-sm.yaml:289-298` (`lesson_slug`) et `:451-453` (`coverage_notes`) ·
`docs/audits/cadre-couverture.md:74-92` (§2.1, les deux entrées ABSENT) ·
`docs/audits/DETTE-CADRE.md:42` (ligne G2).

---

## 15. Questions au propriétaire — avec le défaut pris en l'absence de réponse

| # | question | défaut si pas de réponse |
|---|---|---|
| **Q1a** | **La moitié ATTESTÉE** (rappel de l'ambiant, sous-espace par le critère, base) : la ligne `maths-sm.yaml:293` est `research-consensus` sur un PDF **scanné** et le cadre demande de la confirmer (`:718`) — **mais deux sujets nationaux vérifiés posent la question verbatim, barème en main**. On construit ? | **Oui, sans réserve** — l'attestation d'examen prime sur le statut de la ligne de cadre. C'est cette moitié qui porte le sommet sourcé (§12.2). |
| **Q1b** | **La moitié DÉRIVÉE** (famille libre/génératrice, dimension, application linéaire/noyau/image) : `savoir_faire:295-296` sont `source: derived`, `programme:293` est `research-consensus` sur un scan, et **aucune attestation d'examen n'existe dans ce dépôt** (§3.4). On l'enseigne **et** on la mesure à ce niveau — **12 des 18 items portent au moins un id qui ne vit que de ce côté** (M3, M5, M6, M8 : SA-42 à SA-53, recompté item par item sur la table du §11.1) ? | **Oui, on enseigne tout** (le cadre lie, même en `derived`, et la base attestée est indémontrable sans la liberté et la génération) — **mais la charge d'items de cette moitié est la PREMIÈRE à revisiter** quand la porte 1 du cadre (`maths-sm.yaml:713`, relecture du cadre scanné) rendra son verdict. *Question découpée le 2026-10-20 : la critique de fidélité a montré que l'ancien Q1, un seul oui/non, cachait que le poids du barreau est concentré là où la frontière est la plus faible.* |
| **Q2** | **2018 N Ex1** (seule attestation d'une question « **base** ») est une source **retypée**, conversion « soumise à arbitrage owner ». On l'ouvre ? | **Non** — le chapitre enseigne la base (le cadre la nomme), mais la banque ne gagne rien tant que l'arbitrage n'est pas rendu. |
| **Q3** | **Théorème du rang** ($\dim\ker + \dim\mathrm{Im} = \dim E$) : le cadre ne le nomme pas. | **Exclu**, même comme vérification. |
| **Q4** | Espaces de **polynômes** / de fonctions comme exemples : le cadre ne les nomme pas, l'examen ne les a jamais posés. | **Exclus** ; seuls $\mathbb{R}^2$, $\mathbb{R}^3$, $M_2(\mathbb{R})$. |
| **Q5** | **Aucune leçon n'enseigne le calcul matriciel** ; il arrive par les rappels d'énoncé. On garde ce fonctionnement (comme l'examen) ou on ouvre une dette ? | **On le garde** ; la dette est signalée ici, pas payée. |
| **Q6** | **Somme et somme directe** de sous-espaces : hors du cadre écrit. | **Exclues.** |
| **Q7** | **QUESTION RÉÉCRITE (correctif S2).** Le raccourci « famille libre de $n$ vecteurs en dimension $n$ ⇒ base » n'est **pas** nommé par le cadre — comme le théorème du rang (Q3), les espaces de polynômes (Q4) et la somme directe (Q6), que la spec **exclut** avec le même motif. **Deux standards cohérents sont possibles, et il faut en choisir un :** (a) **nommage strict** — tout ce que le cadre ne nomme pas est exclu, y compris ce raccourci ; (b) **test de l'objet neuf** — est exclu ce qui ajoute un **objet** (rang, somme directe, polynômes), est admis ce qui n'est qu'une **conséquence** d'un mot imprimé (« dimension »). *Le coût de l'incohérence était concret : un distracteur de SA-42 est bâti sur la lecture inverse du raccourci, donc le chapitre enseignait un résultat non imprimé puis sanctionnait son mésusage.* | **(b), le test de l'objet neuf** — écrit au §2 comme **standard nommé**, appliqué dans les deux sens en le disant. Conséquence : le raccourci est **admis**, énoncé **après** la méthode directe, **et accompagné de la mise en garde obligatoire** sur sa lecture inverse (§6.4). Q3, Q4, Q6 restent **exclues** par le même standard. |
| **Q8** | Le **manipulable** (deux vecteurs qui engendrent un plan s'effondrant en droite) : à armer ? | **Non dans cette vague** — les **deux** figures `svg+katex` (§9) suffisent à ce que le chapitre tienne, et la seconde (`echelle-dimensions-r3`) couvre en statique l'idée que le manipulable rendrait mobile. |
| **Q9** | Créer un `retenir.json` (aujourd'hui inexistant) pour une seule entrée ? | **Non** — état honnête. |
| **Q10** | Le **noyau d'un morphisme de groupes** : ici (clôture du chapitre 11) ou en paragraphe au chapitre 10 ? Les deux coûtent zéro renumérotation. | **Ici** (§12.3). |
| **Q11** | **La part du barreau R8 dans la notion.** 18 items sur 53 (**34 %**) et 2 exercices sur 4, pour un barreau dont la partie attestée occupe l'ouverture d'un exercice de 3,5 points. Défendable (quatre savoir-faire en un barreau, un sous-domaine entier absent) — mais c'est un choix de poids, et il revient au propriétaire. *(Question posée dès le 2026-09-28 comme `m6` par la critique pédagogique, et reprise par la critique de fidélité, qui ajoute : des 4 items `synthese`, un porte sur un morphisme de **groupes** — savoir-faire `:285`, pas `:296`.)* | **On garde 18.** Les quatre besoins neufs des deux critiques (génération, reconnaissance d'une application linéaire, quatrième M6, base produite) ont été servis **par conversion** de slots, pas par ajout, **exactement pour ne pas déplacer ce chiffre**. |
| **Q12** | **Les deux ids neufs, M7 et M8, sont à exactement 3 items — plancher atteint, marge nulle.** Un seul re-étiquetage en revue les ferait rougir. On accepte, ou on convertit deux items supplémentaires (au prix de deux faces M4/M5, qui sont à 8 et 6) ? | **On accepte le plancher sec**, et on l'écrit dans `honest_state` de `coverage_summary`. *Motif : M4 et M5 sont les ids que l'examen attesté touche le moins (§3.4) ; leur marge est moins précieuse que la lisibilité du lot. Mais la décision est un arbitrage, pas une évidence.* |
| **Q13** | Le chapitre s'appelle « Espaces vectoriels : sous-espace, base, dimension » — le titre est **lu par l'élève** dans le rail. Convient-il ? | Tel quel. |

---

## 16. Ce que je n'ai pas pu vérifier — dit, pas maquillé

1. **Aucune commande n'a été exécutée.** Tous les comptes du §1 et du §4.2 viennent de l'outil
   `Grep` (mode `count`, qui rend des **lignes correspondantes, pas des occurrences** — libellé
   corrigé le 2026-10-20 (b) : une ligne qui porte deux renvois compte une fois ; les occurrences
   vraies sont données à côté au §1.i) et de lectures directes. Les commandes en
   regard **reproduisent** ces relevés ; elles n'ont pas été lancées. **À re-mesurer avant
   édition.**
2. **Le comportement exact de la porte `carte-chapitres` sur un AJOUT en fin de liste** est **lu
   dans le code** (`:128-136`, `:149`), **pas observé**. Le texte annoncé au §4.2 est celui que le
   code produit à la lecture ; la première exécution reste la preuve.
3. **Les sept sceaux `.base.json`**, ceux du §4.2 : `carte-chapitres` et les six du §14. *Corrigé le
   2026-10-20 (b) : le texte disait « six », alors que le §4.2 en compte sept, re-comptés par `grep -l`
   sur `web/scripts/*.base.json`.* Je sais qu'ils **nomment** cette notion (grep) ; je n'ai pas
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
   pour 2018 (source retypée, §3.1). *Depuis la révision du 2026-10-20, il ne sert plus d'argument :
   il reste côté auteur comme provenance (F2).*

**Ajouts du 2026-10-20 — ce que la RÉVISION n'a pas vérifié :**

8. **Aucune commande n'a été exécutée dans cette session non plus.** Les deux rapports de critique
   ont été lus intégralement, et les fichiers qu'ils citent ont été **ouverts** : `maths-sm.yaml`
   (chapitre `espaces_vectoriels` `:289-298`, et le bloc `_observation_examens` `:364-375`),
   `lesson.md` (les dix titres `## `, le critère du sous-groupe `:311-315`, l'ensemble $F$ `:323`,
   les marqueurs d'exercice `:689-699`), `bank.yaml` (`:144-175`, `:1440-1560`), `exercises.yaml`
   (`:1-120`, `:155-274`), `checkpoints.yaml` (les valeurs de `habilete`),
   `docs/sujets/maths/structures-algebriques.md` (`:238-265`) et
   `docs/audits/DECISIONS-EN-ATTENTE.md`. **Les numéros de ligne cités dans les deux rapports n'ont
   pas été re-contrôlés un par un** : ils l'ont été là où la révision s'appuie dessus.
9. **Les nombres NEUFS de cette révision sont calculés à la main, deux fois, dans la session, et
   écrits avec leur contrôle en regard** : l'ensemble de `r8-variation` (les trois questions
   entières), $[C6]$ sous forme à trois conditions, [C6b], [C9b] (les deux moitiés), [C10a]
   ($t_1,t_2,t_3$ et la liberté du couple), [C11] (la face D), et les dix objets d'items refaits —
   **dont la stabilité pour $\times$ de SA-41, le système complet de SA-44, les relations et
   non-colinéarités de SA-45, les trois appartenances de SA-50 et la linéarité de $f$ et $k$ de
   SA-48.** *Personne ne les a re-vérifiés indépendamment : les deux critiques ont validé les
   nombres de la version du 2026-09-28, pas ceux-ci.* **À faire re-contrôler avant écriture** —
   c'est le premier élément du travail de review de cette vague.
   → **FAIT le 2026-10-20** par une passe arithmétique indépendante
   (`docs/audits/critiques/espaces-vectoriels-arithmetique.md`) : 115 calculs refaits en `Fraction`
   exacte. Elle trouve **une erreur de mathématiques**, la clé de SA-41, et **deux collisions**,
   SA-50 et le $J$ de `r8-variation`. Tout le reste est juste. Les trois sont corrigées en
   révision (b), et chaque nombre changé est re-vérifié par script (journal (b)). *Le défaut que
   la passe a mis au jour est celui que ce paragraphe nommait : « calculé deux fois à la main par
   moi » a laissé passer une clé fausse et deux collisions.*
10. **Le comportement de `rampe-bac` sur un barreau qui gagne deux exercices n'est pas observé.** La
    critique pédagogique indique que la porte mesure **par notion** (`web/scripts/rampe-bac.mjs:11-22`,
    `:40-43`) ; je ne l'ai pas lue. Si c'est exact, la porte **restera verte** après livraison comme
    elle l'était avant — ce qui veut dire qu'**elle ne confirmera pas** que le sommet de R8 existe.
    *Décision de ne pas armer, avec sa condition nommée :* une porte « un sommet sourcé par barreau
    porteur » serait l'instrument juste, **et elle n'est pas dans le périmètre de cette spec** ;
    elle est signalée ici pour que la livraison ne se croie pas mesurée.
11. **Les deux nouvelles figures n'ont pas de gabarit observé pour un entrelacement d'étapes.** Le
    §9 suppose que le mécanisme d'étapes de `echelle-structures.stages.json` rend les légendes dans
    l'ordre au même marqueur ; je ne l'ai pas vérifié dans le code de rendu. **Si le rendu affiche
    toutes les étapes d'un coup, le placement du §9 reste valide** (les deux figures sont posées
    après le beat qu'elles illustrent, jamais avant un pari) — mais la justification « étape 1 avec
    [C3] » tomberait, et il faudrait trois figures au lieu de deux.

---

## Revision log 2026-10-20

**Révision par pedagogy-architect contre deux rapports de critique**, tous deux verdict
**BUILD AFTER FIXES**, tous deux ayant recalculé l'intégralité des nombres de la version du
2026-09-28 sans trouver une seule erreur :
- `docs/audits/critiques/espaces-vectoriels-pedagogie.md` (pedagogy-critic) — B1-B3, I1-I13, m1-m7 ;
- `docs/audits/critiques/espaces-vectoriels-fidelite.md` (bac-fidelity-critic) — F1-F12, S1-S6,
  et la refonte de Q1.
**Aucun fichier de la notion, du cadre ou de la banque n'a été touché.** Seul le présent document
a été réécrit.

### A. Constatations APPLIQUÉES

**Les quatre bloquantes de fidélité, et les trois de pédagogie.**

| finding | ce qui a été fait | §  |
|---|---|---|
| **F1** (bloquant) — critère à trois conditions | Le critère passe à **non vide / stable pour $+$ / stable pour $\cdot$**, avec le tableau d'échange avec le chapitre 5. [C3], [C5], [C6] re-rédigés sous cette forme (nombres inchangés). $\lambda u + \mu v$ devient la **compaction**, au [C6b], avec sa mise en garde d'examen. SA-41 refait, `bank.yaml:1495` et `:1501` ajoutés à la liste d'éditions. | §6.2, §6.0, §11.1, §14 |
| **F2** (bloquant) — l'affirmation de poids | « 7,1 % / 21,4 % / c'est peu / **du point gratuit** … l'argument à donner à l'élève » **supprimé**. Le fait structurel (ces questions ouvrent l'exercice, la seconde roule sur la première) est conservé. Barème relevé relégué en provenance d'auteur. Le barème a aussi disparu de la mise en garde du [C7]. | §3.2.4, §6.2, §10.4, §13.5, §16.7 |
| **F3 + F5** (bloquant) + **B1** + **I12** + **I13** — le sommet | **`r8-bac`** (annale vérifiée `bk-2023-n-x5` Partie I q1-q2, `status: sourced`) et **`r8-variation`** (ensemble frais **contenant $I$**, finissant sur « Montrer que $(I,J)$ est une base » puis $\dim E$) entièrement spécifiés, avec toutes les solutions calculées. §6.6 réécrite pour ne plus pré-résoudre q2. SA-41 re-coupé sur une **autre** prémisse (partie stable pour $\times$). | §12.2 (neuf), §6.6, §6.7, §10.2, §11.1 |
| **F7** — les deux « toujours / jamais » | Démotés en **observations de corpus**, au registre exact du bloc `_observation_examens` du cadre (`maths-sm.yaml:364`, `:375`), avec la rédaction imposée et l'interdit correspondant. | §2, §3.2.1, §6.1, §10.4 |
| **B2** — M3 et M5 non revendiquées | **M5** reçoit un **quatrième pari**, `cp-r8-pari-notation`, placé avant [C11], avec quatre faces (option (a) de la critique). **M3** est **remis en scène** en voix-test-rupture, titre dé-divulgué, « prends position » ajouté (option (b)). **M6** garde sa délégation, désormais écrite dans un tableau. **M7 et M8** reçoivent aussi leur ligne de décision. | §7.3, §7.5, §6.3, §6.4 |
| **B3 + S1 + S4** — « combinaison linéaire » et $\mathrm{Vect}$ | Beat neuf **[C6b]** : combinaison linéaire définie sur du concret, puis la compaction du critère, puis le **sous-espace engendré** — **nommé en français avant la notation** — avec la preuve qu'il est un sous-espace. [C7] **cite** ce résultat au lieu de l'importer. | §6.2 |
| **I1** — annotations de raisonnement | **Cinq annotations ajoutées**, dont celle de [C16] (l'antécédent $(s+t,t,0)$ : compter les degrés de liberté, **choisir** $z=0$, remonter, vérifier), [C6] (lire les paramètres là où ils sont seuls), [C3], [C8] (pourquoi commencer par l'équation la plus pauvre), [C14] (équation → paramètres → générateurs, nommée comme méthode). | §6.2-§6.5 |
| **I2** — blocs sans engagement | La table du §6.7 est refaite : la colonne « ce que l'élève fait seul » ne contient plus que ce qu'un **marqueur** déclenche, et les blocs d'exposition sont **assumés comme tels**. Le bloc C gagne l'engagement rhétorique du [C9], le bloc E les deux exercices. | §6.7 |
| **I3** — « pourquoi libre ? » | Beat neuf **[C10a]**, à l'endroit où la base est définie : l'**unicité de l'écriture**, démontrée, plus un exemple de famille liée à deux écritures ($t_1 = (1,4)$, $t_2 = (3,1)$, $t_3 = (4,5)$ — nombres neufs, choisis pour ne pas pré-résoudre le pari du [C12]). | §6.4 |
| **I4 + S5** — la génération sous-enseignée et non mesurée | Beat neuf **[C9b]** : la méthode nommée (élément quelconque / un témoin suffit), une famille qui engendre, **une famille libre qui n'engendre pas**. [C11] tue la face « a l'air de couvrir ». **M8 déclaré**, **SA-50 converti** en item de génération, tag `famille-generatrice` ajouté. | §6.3, §6.4, §8, §11.1 |
| **I5** — « moins une condition » | Corrigé **à la racine** par F1 : une condition est **échangée**, pas retirée, et c'est l'échange qui paie le symétrique. Les deux endroits qui portaient la formule fausse sont réécrits. | §4.3.3, §6.1, §6.2 |
| **I6** — étiquettes et libellés | **M1 resserré** au seul test du zéro ; **règle opératoire écrite** en tableau (zéro / liste voisine / saut du test / cas particulier / génération) ; **M7 déclaré** ; **six étiquettes corrigées** : SA-38 C → M7, SA-38 D maintenue M2 *avec son motif*, SA-47 B refaite et → M4, SA-47 D → M8, SA-49 D refaite et → M8, SA-53 D → M6, `cp-r8-pari-stabilite` C → `generalisation-hative` et D réécrite pour porter vraiment M2. | §8, §7.2, §11.1 |
| **I7** — items pré-résolus | **SA-48** (c'était [C11] mot pour mot) devient l'item de reconnaissance d'application linéaire · **SA-37** (c'était [C5] re-habillé, mêmes nombres) reçoit un objet neuf (réunion de deux droites non axiales) · **SA-41** (sa clé était une phrase du §6.6) reçoit une autre prémisse · **SA-45** reçoit des générateurs neufs. | §11.1 |
| **I8** — options barrables | Les **cinq absolus** réécrits ; les **trois clés les plus longues** signalées ; et surtout **la règle manquante est écrite** : les textes du §11.1 sont des **canevas**, item-author les ré-rédige puis **relance `indice-absolu` et `indice-longueur`**. **Deux précisions ajoutées au passage, parce que les règles telles qu'écrites étaient inapplicables ou fausses :** (a) l'interdit d'absolu porte sur les quantificateurs **régulateurs** (« toute partie… est »), **pas** sur les négations factuelles locales (« aucun de ces trois vecteurs n'est nul »), sans quoi la règle interdit la manière normale d'énoncer la liberté d'une famille ; (b) la « contamination de la bonne réponse » est **plus étroite** que je ne l'avais écrite — un distracteur **peut** partager le verdict de la clé si sa raison diffère (le checkpoint §7.1 le fait et discrimine) ; ce qui est interdit, c'est qu'un **modèle faux atteigne la CLÉ**, et le remède est alors sur l'**énoncé**. | §11.2 |
| **I9** — SA-51 indifférenciable, plancher M6 fragile | SA-51 porte désormais **M6 / M5 / M4**. Le quatrième item M6 est le nouveau **SA-48** (faces C et D), de sorte que le plancher de M6 ne repose plus sur l'étiquette discutable de l'ancien SA-41 D — qui disparaît avec la refonte. | §11.1 |
| **I10** — rampe M3 plate | **SA-44 entièrement refait** : $x_1=(1,3,2)$, $x_2=(2,-1,1)$, $x_3=(8,3,7)$ avec $x_3 = 2x_1+3x_2$ — **relation à coefficients non unitaires, invisible à l'œil** (les trois couples non colinéaires, aucune somme de deux ne donne le troisième : contrôles écrits). Difficulté portée à 4. | §11.1 |
| **I11** — figure récapitulative, étape hors séquence | **Deux figures.** `sous-espaces-plan` garde trois étapes, **re-légendées** pour porter *les trois conditions et laquelle tombe* (et non trois objets déjà résolus) ; `echelle-dimensions-r3` est **neuve**, deux étapes, posée après [C14], où « dimension » existe. *Le placement de la première reste à la réponse du pari — avec son motif : le remonter révélerait la clé du checkpoint.* | §9, §10.2 |
| **F4** (partiel) + **S6** | Un item demande désormais **une base comme objet produit** — c'est `r8-variation` q3, mieux qu'un QCM ; **SA-47** est recentré sur « donner une base » ; **SA-48** demande « cette application est-elle linéaire ? », le verbe exact du cadre. | §12.2.2, §11.1 |
| **F6** — collisions de nombres | **SA-50 refait** (ses deux matrices étaient des **éléments de l'ensemble du sommet `r-bac`**, `exercises.yaml:165`) ; **SA-44 refait** (reprenait $v_2, v_3$ du [C8] avec la clé opposée) ; **SA-45 refait** (reprenait $v_1, v_2$ du [C8] et un générateur du [C14]). **La liste d'interdits du §6 est élargie aux deux `exercises.yaml`**, et la frontière objet/outillage est écrite. | §6 préambule, §11.1, §11.2 |
| **F8** — habileté ↔ difficulté en lockstep 18/18 | **Quatre ruptures** : SA-41 synthese/3, SA-44 non_explicite/4, SA-46 directe/3, SA-52 directe/3 — chacune motivée par la difficulté réelle de l'item. Le total 7/7/4 = 38,9/38,9/22,2 est préservé. | §11.0 |
| **F10 + F11 + F12** — notation | **Table des lettres** écrite comme contrainte dure ($E$ ambiant, $H$ la partie — les lettres du chapitre 5 ; $F$ l'ensemble concret du chapitre 5 ; [C6] renommé $V$ ; [C5] renommé $X$ ; $E'$ pour l'espace d'arrivée ; items renommés hors liste). **$M(x,y)$** imprimé dans le beat de forme d'examen (les deux exercices). **Une phrase sur $M_3(\mathbb{R})$** avec son interdit. **SA-46 D** : ligne, pas colonne (= **m4**). | §10.3, §6.2, §6.5, §11.1 |
| **S2** — Q7 incohérent avec Q3/Q4/Q6 | **Standard de tri nommé** au §2 (« test de l'objet neuf »), appliqué dans les deux sens **en le disant**. Q7 réécrite avec les deux standards possibles et le défaut recommandé. **La mise en garde sur la lecture inverse du raccourci est rendue obligatoire** dans la prose, parce qu'un distracteur de SA-42 est bâti dessus. | §2, §6.4, §15 Q7 |
| **S3** — « base ⟺ bijection » non démontrée | L'équivalence **$f$ injective $\iff \ker f = \{0_E\}$** est **démontrée pour les applications linéaires**, dans [C16], avant [C17] — avec les deux conséquences de la définition tirées dès le [C15]. **Interdit de nommer « isomorphisme d'espaces vectoriels »**. | §6.5 |
| **§3 du rapport de fidélité** — preuve non uniforme | **Section §3.4 neuve** : table de ce qui soutient chaque moitié du chapitre. **Q1 coupée en Q1a (attesté) / Q1b (dérivé)**, Q1b portant explicitement la charge de 12 items sur 18 comme son enjeu. | §3.4, §15 |
| **m1** — `habilete` des checkpoints | Les quatre valeurs nommées, dans le vocabulaire des checkpoints de la maison (`raisonnement` / `utilisation`), avec le motif de chacune. | §7 |
| **m2** — décision `Derivation` / prose | Écrite beat par beat, et les cinq annotations de raisonnement explicitement **hors composant**. | §10.3 |
| **m3** — orthotypographie | Apostrophes ASCII, guillemets gérés par le pipeline. | §10.3 |
| **m5** — SA-44 B sans raisonnement | Remplacée par une option dont **les deux prémisses sont vraies et vérifiables** — le distracteur le plus informatif du lot. | §11.1 |
| **m6** → **Q11** | Promu en question au propriétaire, avec le chiffre (18/53, 34 %) **et** la décision de servir les quatre besoins neufs **par conversion** pour ne pas le déplacer. | §15 Q11 |
| **m7** — champ `solution` | Standard de la notion écrit : paragraphe « Pourquoi les distracteurs échouent », les trois options une par une (exemplaire `items.yaml:2262-2267`). | §11.2 |

**Recouvrements : un correctif, deux rapports.** Quatre fois, les deux critiques ont trouvé le même
défaut par deux chemins, et **un seul correctif les sert tous les deux** — c'est écrit à chaque fois
dans le texte :
1. **I5 (pédagogie, « moins une condition » est faux) et F1 (fidélité, le critère attesté a trois
   conditions)** : le passage à trois conditions répare I5 **à la racine** plutôt que dans la
   formulation. *Un seul correctif, §6.2.*
2. **B3 (pédagogie, vocabulaire sauté) et S1 (fidélité, notation non attestée importée)** : le beat
   [C6b] définit « combinaison linéaire » **et** nomme le sous-espace engendré **en français avant
   la notation**. *Un seul correctif, §6.2.*
3. **I4 (pédagogie, génération sous-enseignée) et S5 (fidélité, savoir-faire du cadre à zéro
   item)** : [C9b] + M8 + SA-50 servent les deux. *Un seul correctif, trois endroits.*
4. **B1/I13 (pédagogie, pas de sommet, zéro production) et F3/F5 (fidélité, le verbe est
   « Démontrer », la configuration attestée n'est jamais marchée)** : les deux exercices du §12.2
   servent les deux — et **F3 ajoute une contrainte que la pédagogie n'avait pas vue** (le §6.6 et
   SA-41 pré-résolvaient le sommet proposé), appliquée au même endroit.
5. **m4 (pédagogie) et le dernier point du §4 de fidélité** : la même erreur ligne/colonne de
   SA-46 D. *Une correction.*

### B. Constatations REJETÉES ou MODIFIÉES — avec le motif

1. **I11, la moitié « entrelacer les étapes 1-2 dans le bloc B » — REJETÉE, l'autre moitié
   appliquée.** Motif : une figure posée entre [C3] et [C4] **révèle la conclusion de [C4]** avant
   que le texte ne la travaille, et une figure posée avant `cp-r8-pari-stabilite` **révèle la clé du
   pari** — son étape 3 est littéralement $(1,0)+(0,1)$ qui sort des axes. **L'intégrité d'un
   engagement passe avant l'élégance d'un entrelacement**, et c'est une règle de maison. *Ce que
   j'ai retenu du constat :* les légendes **récapitulaient** — elles sont re-rédigées pour porter
   *les trois conditions et laquelle tombe*, ce que la prose n'a pas dit. *Et la seconde moitié du
   constat (l'étape 4 enseigne la dimension deux blocs trop tôt) est appliquée intégralement : elle
   devient une figure à part, dans le bloc D.* **Le rapport lui-même propose ce placement** pour
   l'étape 3 (« *where a picture of (1,0)+(0,1) leaving the axes is worth more than the algebra* »).
2. **I6, « déclarer un id pour la réunion de sous-espaces » — REJETÉE pour l'instant, et écrite en
   dette.** Motif : il faudrait **+3 items** et le lot est déjà à 34 % de la notion (Q11). Le
   modèle reste **rompu en prose** ([C5]) et **porté comme distracteur** (SA-37 C) sous
   `generalisation-hative`, étiquette qui dit juste le **mécanisme** (généraliser une vérification
   partielle) et non le **contenu**. *C'est écrit comme tel au §8.9 n°3, avec « s'il fallait
   déclarer un neuvième id, ce serait celui-là ».*
3. **B2, l'option « délégation écrite » pour M5 — ÉCARTÉE au profit de l'option (a).** Motif : M5
   portait la charge d'items la plus lourde du lot, et un modèle qui se diagnostique sur **un
   nombre** se prête exactement à un pari à quatre faces. Déléguer la rupture la plus rentable du
   bloc D aurait été une économie au mauvais endroit.
4. **B2, l'option « quatrième pari » pour M3 — ÉCARTÉE au profit de l'option (b).** Motif : un pari
   instrumenté sur la liberté devrait tomber **deux paragraphes après** la définition du mot
   « libre ». L'élève parierait sur un terme qu'il vient de lire, pas sur un modèle installé — et un
   pari sans modèle installé ne mesure rien. **La rupture est réelle et mise en scène ; l'engagement
   est rhétorique ; c'est écrit au §7.5**, donc revendiqué.
5. **F4, « troquer un des six items de dimension » — PARTIELLEMENT appliquée.** Appliqué : la base
   devient un objet **produit** (`r8-variation` q3), SA-47 est recentré sur la base, un item porte
   la génération (SA-50, converti depuis un item de dimension). **Non appliqué : la réduction du
   nombre d'items de dimension en deçà de cela.** Motif : M4 et M5 sont des modèles **réels et
   massifs** chez les élèves, le cadre nomme « dimension » au `programme` **et** au `savoir_faire`,
   et la critique de fidélité écrit elle-même « *je ne demande pas que la dimension soit coupée* ».
   Le déséquilibre résiduel est **nommé** (§3.4) et **soumis** (Q1b), pas corrigé en silence.
6. **F9, « ~2 items sur 18 sont de vraies synthèses sur les savoir-faire de CE chapitre » —
   REÇUE, non corrigée, routée.** Motif : la remarque est juste (SA-53 porte un morphisme de
   **groupes**, savoir-faire `:285`) mais elle appelle un arbitrage de **poids de barreau**, pas une
   réécriture d'item — et SA-53 sert une **lacune de cadre explicitement demandée par l'audit**
   (§12.3). Versée à Q11.
7. **I8, « écrire les quatre options complètes des items les plus risqués » — NON appliquée telle
   quelle ; la seconde branche du constat l'est.** Motif : écrire 72 options finales dans une spec
   de conception déplace la frontière des rôles (c'est le travail d'item-author, et une option
   finale doit être écrite **devant** les deux portes, en les relançant). **Ce qui est appliqué,
   c'est exactement ce que le rapport propose en alternative :** une instruction explicite que les
   textes du §11.1 sont des canevas à ré-rédiger contre §11.2, portes relancées.
8. **Le `retenir.json` (Q9) et le manipulable (Q8) — INCHANGÉS.** Aucune des deux critiques ne les
   remet en cause ; les défauts tiennent. *(La formule du `retenir.json` optionnel a tout de même
   été corrigée : elle portait la forme compacte et la lettre $F$ — un « à retenir » qui n'est pas
   la forme enseignée serait pire que son absence.)*

### B′. QUATRE choses que J'AI écrites de travers dans cette même session, corrigées avant livraison

*Écrites ici parce qu'une spec qui ne consigne que les erreurs des autres n'est pas un document
honnête.*

1. **« Si la clé est « non », aucun distracteur ne dit « non » »** — règle que j'avais posée en
   §11.2 en appliquant le correctif I8. **Elle est fausse**, et elle condamnerait
   `cp-r8-pari-scalaire` (§7.1), dont le distracteur D partage le verdict de la clé avec une raison
   fausse **et discrimine parfaitement**, puisque les options sont des énoncés complets.
   **Remplacée** par la règle exacte : *un modèle faux ne doit pas pouvoir atteindre la **clé** ; et
   si l'énoncé ne demande qu'un verdict, c'est l'énoncé qu'il faut élargir.* Le motif reproché à
   l'ancien SA-43 D est reformulé en conséquence.
2. **L'interdit « aucun » dans une option** — repris tel quel de la version du 2026-09-28, il rend
   **inapplicable** la rédaction normale d'une vérification de liberté (« aucun couple n'est
   colinéaire »), que ni l'une ni l'autre critique n'a d'ailleurs relevée dans une option.
   **Restreint** aux absolus régulateurs, avec le test à appliquer option par option.
3. **Le beat [C6b] pré-résolvait [C7].** En écrivant la définition de « combinaison linéaire », j'y
   avais mis la décomposition de $M(a,b)$ sur deux matrices fixes — **c'est-à-dire la révélation du
   [C7]**, un exemple travaillé, deux paragraphes trop tôt. Retirée, avec l'interdit écrit sur
   place. *Même défaut que celui que F3 reproche au §6.6, commis en le réparant.*
4. **Les scalaires $A$ et $B$ de la compaction** (hérités du [C6] d'origine) portaient les noms de
   la base de $V$, deux paragraphes plus loin — la collision même que F10 dénonce. Renommés
   $s$ et $t$, dans [C6b] et dans [C17].

### C. Questions ouvertes au propriétaire — avec leur défaut

*Table complète au §15. Les décisions que je n'ai pas le droit de prendre :*

| # | question | défaut recommandé |
|---|---|---|
| **Q1a** | Construire la moitié **attestée** sur une ligne de cadre `research-consensus` issue d'un scan ? | **Oui, sans réserve** (deux attestations verbatim). |
| **Q1b** | **NEUVE (découpée de Q1).** La moitié **dérivée** (libre/génératrice, dimension, applications linéaires) porte **12 items sur 18** sans aucune attestation d'examen. On la mesure à ce niveau ? | **Oui on l'enseigne entièrement**, et **sa charge d'items est la première à revisiter** après la porte 1 du cadre (`maths-sm.yaml:713`). |
| **Q2** | Convertir le sujet **2018 N** (source retypée) ? | **Non** — et ce n'est **plus bloquant** : le chapitre est complet avec `bk-2023-n-x5`. |
| **Q7** | **RÉÉCRITE.** Quel standard pour ce que le cadre ne nomme pas : nommage strict, ou test de l'objet neuf ? | **Le test de l'objet neuf** (§2) : raccourci de dimension **admis** avec sa mise en garde ; rang, somme directe, polynômes **exclus**. |
| **Q11** | **PROMUE de `m6`.** 18 items sur 53 (**34 %**) et 2 exercices sur 4 pour ce barreau — acceptable ? | **Oui, 18** — les quatre besoins neufs ont été servis **par conversion**, pas par ajout. |
| **Q12** | **NEUVE.** M7 et M8 sont à **exactement 3 items**, marge nulle. On accepte, ou on convertit deux items de plus (au prix de faces M4/M5) ? | **On accepte**, et on l'écrit dans `honest_state`. |
| **Q3, Q4, Q5, Q6, Q8, Q9, Q10, Q13** | Inchangées. | Inchangés. |

### D. Ce que la révision n'a PAS fait

- **Aucune commande exécutée**, aucune porte lancée, aucun sceau touché (§16.8).
- **Les nombres neufs de cette révision n'ont été vérifiés que par moi, deux fois** — les deux
  critiques ont validé les nombres de la version du 2026-09-28, **pas ceux-ci** (§16.9). *C'est le
  premier élément de la prochaine revue.*
- **Aucun fichier de la notion, du cadre, de la banque ou des audits n'a été modifié** ; le registre
  `docs/audits/DECISIONS-EN-ATTENTE.md` n'a **pas** été lu comme portant une question ouverte sur
  cette spec (vérifié : aucune entrée ne la nomme) — les questions du §15 restent donc **dans ce
  document**, et c'est à l'owner de décider s'il veut les y voir ou les verser au registre.

---

## Revision 2026-10-20 (b) — arithmetic pass

**Contre :** `docs/audits/critiques/espaces-vectoriels-arithmetique.md`, la passe arithmétique
indépendante. Elle a refait 115 calculs en `Fraction` exacte et a rendu **ERRORS FOUND** :
- **une erreur de mathématiques** : la clé de SA-41 ;
- **deux collisions** : SA-50, et le $J$ de `r8-variation` ;
- des écarts mineurs, et sept distracteurs que leur modèle étiqueté ne produisait pas.

**Seul le présent document a été modifié.** Aucun fichier de la notion, du cadre ni de la banque
n'a été touché.

### Ce qui a changé

| constat | correction | § |
|---|---|---|
| **E1 (bloquant) — SA-41** : la clé « Rien » était fausse. $\lambda I$ est l'élément $(\lambda,0)$ de $Z$, et $\lambda\cdot M = (\lambda I)\times M$, donc l'ancienne option D était valide. | Option (i) du rapport. La **question** devient « *Cette stabilité suffit-elle à conclure que $Z$ est un sous-espace vectoriel ?* ». La clé devient « *Non : elle ne donne ni la non-vacuité ni la stabilité pour $+$ ; ces deux conditions restent à écrire* », muette sur la loi externe, exprès. Distracteurs : B « oui, sous-anneau » → M2 (variante sous-anneau) ; C « il ne reste que la matrice nulle » → M1 + M2 ; D « oui, $\times$ entraîne $+$ et les multiples » → `cloture-non-verifiee`. Chacun est réfuté par $\{I\}$ ou $M_2(\mathbb{Z})$. Les longueurs des canevas sont 114 / 119 / 112 / 106 : la clé n'est ni la plus longue ni la plus courte. `synthese` / 3 est maintenu, avec son motif. Le résidu (M2 « liste du sous-groupe » atteint la clé) est nommé. | §11.1, §11.2 |
| **E2 — SA-50** : la phrase « aucun de ces vecteurs n'apparaît au §6 » était fausse. $(1,2,0)$ vient du [C9b] et $(0,1,1)$ du $v_3$ du [C8]. | Nouveaux vecteurs $(1,0,2)$, $(0,3,1)$ et $(2,3,5) = 2(1,0,2)+(0,3,1)$, sur le plan $6x+y-3z = 0$, avec le témoin $(1,0,0)$ qui donne $6 \neq 0$. L'énoncé, la clé, les distracteurs et les contrôles sont refaits. La phrase d'originalité dit désormais **contre quoi** elle a été vérifiée, et ce qu'on trouve hors notion ($A(1,0,2)$, un point en géométrie). | §11.1 |
| **E3 — `r8-variation`** : $J = M(0,1)$ était la matrice $B$ du [C7]/[C10]. | $E = \left\{\left(\begin{smallmatrix}x&y\\-y&x-y\end{smallmatrix}\right)\right\}$, $J = \left(\begin{smallmatrix}0&1\\-1&-1\end{smallmatrix}\right)$. q1 à q3 sont refaites : $O$, la somme, l'opposé, le scalaire, $I = M(1,0)$, $xI+yJ = M(x,y)$, la liberté, $\dim E = 2$. Le contrôle d'originalité porte désormais aussi sur les **éléments nommés**, pas seulement sur les formes d'ensembles. | §12.2.2 |
| **SA-46** : M5 (l'indice, 2) atteignait la clé 2, alors que l'item porte M5. D (« 1, première ligne ») n'était produit par aucun id déclaré. | Nouvel objet $Q = \left\{\left(\begin{smallmatrix}a+b&c\\d&0\end{smallmatrix}\right)\right\}$, de dimension **3**. M4 donne 4 (B), M5 donne 4 (C) et 2 (D) : la clé n'est atteinte par aucun modèle déclaré. `directe` / 3 est maintenu. | §11.1 |
| **`cp-r8-pari-notation` et SA-49** : M4 (compter les lettres) atteint la clé. | Les nombres **ne changent pas**, et le motif est écrit en ligne. Sur ces objets les lettres sont libres et M4 y est muet ; l'item ne porte pas M4 ; M4 est mesuré par huit items où il diverge. | §7.3, §11.1 |
| **Étiquettes** (rapport §3) | SA-36 D → `cloture-non-verifiee` (et réécrit sans l'absolu « c'est la condition qui compte ») · SA-37 D → double étiquette M2 + `generalisation-hative` · SA-38 D → `axiome-oublie` · SA-53 C → `neutre-non-transporte` (ajustement imparfait, dit comme tel). La règle opératoire du §8 gagne trois lignes. | §8, §11.1 |
| **La règle « un modèle faux ne doit pas atteindre la clé »** était trop large pour être tenue. | Elle est **précisée** au §11.2 : elle vise les modèles que l'item **diagnostique**. Un modèle muet sur l'objet est admissible à trois conditions écrites. Les cas limites SA-37 et SA-41 (M2 par variante) sont nommés, avec l'alternative et son coût : M2 tomberait à 2. | §11.2 |
| **Mineurs** | §1.i et §4.2 : comptes de **lignes** (34 et 97), avec les occurrences à côté (35 et 110). §16.1 : le libellé est corrigé. §1.k : SA-27…**SA-35**, soit 9 items. §1.g : « 31 » devient 37, et le 0 décisif tient. §16.3 : sceaux **sept**, plus six. §7.5 : M3 porté par **cinq** items. §8.9 n°4 : la dette « huit axiomes » n'est plus portée par aucun distracteur depuis la révision (a). §14 : ajout de `bank.yaml:51-57` (« ne recoupent aucun autre sommet »), des quatre lignes `per_misconception` existantes et de `habilete_ramp_transport_family`. §11.2 : l'affirmation « les dix refaits re-vérifiés » est corrigée. §16.9 : marqué FAIT. | §1, §4.2, §7.5, §8.9, §11.2, §14, §16 |

### Recompte après ré-étiquetage

Le recompte a été extrait **du texte de la table §11.1** par script, puis croisé avec le
dictionnaire de vérification : les deux sont identiques item par item.

| id | items R8 | liste |
|---|---|---|
| M1 | 6 | SA-36, 37, 38, 39, 40, 41 |
| M2 | **4** (était 7) | SA-37, 39, 40, 41 |
| M3 | 5 | SA-42, 43, 44, 45, 50 |
| M4 | 8 | SA-42, 44, 45, 46, 47, 50, 51, 52 |
| M5 | 6 | SA-45, 46, 47, 49, 51, 52 |
| M6 | 4 | SA-48, 51, 52, 53 |
| M7 | 3 | SA-38, 40, 48 |
| M8 | 3 | SA-47, 49, 50 |
| `generalisation-hative` | 4 (13 → 17) | SA-36, 37, 43, 44 |
| `cloture-non-verifiee` | **2** (8 → 10) | SA-36, 41 |
| `axiome-oublie` | **1** (7 → 8) | SA-38 |
| `neutre-non-transporte` | **1** (5 → 6) | SA-53 |

Tous les ids neufs restent ≥ 3. Habiletés 7 / 7 / 4 : **inchangées**. Ruptures de lockstep : SA-41,
44, 46 et 52, **inchangées**. Q1b : 12 items sur 18, SA-42 à SA-53, **inchangé**.

### Comment c'est vérifié

Les scripts sont dans le bloc-notes de session. Ce sont des instruments de travail, **pas des
fichiers du dépôt**.
- `verify_b.py` réutilise les fonctions de `ev-arith/check.py`. Il fait **34** vérifications sur
  les nombres changés, toutes vertes (`ERRORS: 0 / 34`). On y trouve :
  - pour SA-41, la prémisse, la route $\lambda I$, les contre-exemples $\{I\}$ et
    $M_2(\mathbb{Z})$, et les longueurs ;
  - pour SA-50, la relation, le plan, la normale, le témoin, les rangs et les prémisses ;
  - pour `r8-variation`, q1 à q3 entières et l'absence d'élément commun avec $B$ ou $Z$ ;
  - pour SA-46, le rang 3 et les valeurs des modèles ;
  - le recompte.
- `collide_b.py` reprend la recherche de `ev-arith/collide.py`. **L'instrument a été réparé avant
  d'être cru.** Sa normalisation supprimait `\ ` **avant** d'avoir protégé les sauts de ligne
  LaTeX `\\`, si bien qu'une matrice écrite avec des espaces, comme `x & y \\ -y`, ne se trouvait
  jamais. Une fois réparé, les témoins positifs se retrouvent : l'ancien $E$ à sa ligne d'affichage,
  l'ancien $J$ au [C7]/[C10], les anciens vecteurs de SA-50 au [C8]/[C9b]. Les nouveaux objets, eux,
  n'apparaissent **qu'**aux lignes de cette révision. *Corollaire : la recherche **textuelle** de
  matrices de la passe arithmétique avait le même angle mort. E3 n'en dépendait pas : $J = B$ est
  aussi comparé en arithmétique dans `check.py`, et $B$ s'écrit sans espaces aux lignes du
  [C7]/[C10]. Mais une collision de matrice écrite avec des espaces, et non doublée d'une
  comparaison numérique, lui aurait échappé. C'est à signaler au porteur de l'instrument.*

### Ce que cette révision n'a PAS fait

- **Aucune porte lancée**, aucun sceau touché (`indice-longueur` et `indice-absolu` restent à
  lancer sur la rédaction finale des options, §11.2).
- **La ré-écriture finale des options** reste à item-author : les textes du §11.1 sont des
  canevas.
- **Le cas M2 par variante (SA-37, SA-41)** est nommé, pas tranché (§11.2, point 3).
