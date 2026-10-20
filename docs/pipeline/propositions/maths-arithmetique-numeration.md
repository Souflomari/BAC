# spec — les systèmes de numération (Maths · `arithmetique`, **R7b = chapitre 10**)

**Statut : PROPOSITION, écrite le 2026-09-28, RÉVISÉE le 2026-10-20 par pedagogy-architect
contre deux critiques (pédagogie + fidélité bac). Rien n'a été construit.**
Aucun fichier de la notion n'a été touché — ni `lesson.md`, ni `items.yaml`, ni
`checkpoints.yaml`, ni `bank.yaml`, ni `exercises.yaml`, ni `media/`.

> ⚠ **AVERTISSEMENT D'INSTRUMENT.** Aucune commande shell, **aucune porte du dépôt** n'a été
> lancée — ni dans la session d'écriture, ni dans celle de révision. Tous les faits du §0 ont
> été relevés par lecture directe et par `Grep` ; la commande donnée en regard **reproduit**,
> elle n'atteste pas. **Toutes les citations de ligne ont été RE-MESURÉES le 2026-10-20 dans le
> clone `/home/user/BAC-g`** (plusieurs avaient bougé : `## R8` est passé de `lesson.md:591` à
> `:599`, `coverage_summary` de `items.yaml:2621` à `:2656`). Ce que je n'ai pas pu vérifier est
> au §13.

> ✅ **LA FONDATION DE CADRE A ÉTÉ VÉRIFIÉE — c'est le changement le plus important de cette
> révision.** La version du 2026-09-28 portait en tête : « *si la porte répond non, toute cette
> spec tombe* ». La porte a répondu.
> `docs/cadre/sources/verification-numeration-2026-09-28.md` §1 : **le SUJET est CONFIRMÉ**, sur
> **sept** sources marocaines indépendantes de `pdfmath` — dont un résumé **publié par AlloSchool
> DANS le chapitre « Arithmétique » du cours 2ème BAC SM A BIOF** (`element/58534`), un polycopié
> arabe « الثانية سلك بكالوريا علوم رياضية » **vu en image** (section « نظمات العد »), et un résumé
> Atmani Najib « 2BAC SM » qui couvre littéralement les trois capacités (écrire / additionner et
> multiplier / utiliser). **Ce qui reste ouvert, et qui ne bloque pas l'écriture :** (a) les
> **libellés verbatim** 2.1.4/2.1.5/2.1.6 restent adossés à une source secondaire unique ;
> (b) le découpage **1ère Bac SM / 2ème Bac SM** n'est pas tranché (le même résumé circule aux
> deux niveaux) — mais si le cadre d'examen national les liste, la capacité est **évaluable au
> national**, ce qui est la seule chose dont dépend notre frontière. Aucun texte officiel MEN
> n'a pu être lu (PDF scanné, 0 texte) : `maths-sm.yaml` reste **PROPOSITION — NON
> AUTORITATIVE**, et cette spec ne le promeut pas.

**Ce que ce document est.** Le cadrage d'**une seule rung neuve** — trois capacités du cadre SM
sur neuf (2.1.4 / 2.1.5 / 2.1.6) sans **aucun** chapitre, **aucun** item, **aucune** annale.

**Ce que ce document n'est pas.** Il n'écrit ni la prose finale (content-author), ni les items
finaux (item-author), ni le YAML livré.

---

## 0. Le trou, mesuré — re-mesuré le 2026-10-20

| # | le fait | la commande / la citation qui le reproduit |
|---|---|---|
| **a** | **Le cadre nomme trois capacités sur neuf.** `programme` : « *Systèmes de numération : écriture d'un entier naturel dans une base donnée ; opérations (addition, multiplication) et comparaison dans une base ; usage des écritures en base dans des situations d'arithmétique.* » `savoir_faire` : « *Écrire un entier dans une base donnée et revenir à la base 10 ; opérer et comparer dans une base ; exploiter une écriture en base pour une question de divisibilité ou de reste.* » | `maths-sm.yaml:332` (programme), `:338` (savoir-faire), `:594-602` (l'entrée de correction), `:628` (le statut de porte) |
| **b** | **Le corpus de la notion ne contient QU'UN SEUL appariement « base ».** `lesson.md:149`, « *un nombre écrit en base 10 avec les chiffres $a_p, \ldots, a_0$* », **à l'intérieur du critère de divisibilité par 9**. Rien d'autre. Re-mesuré 2026-10-20 : **toujours 1**. | `grep -rniE 'numération\|numeration\|base [0-9]\|\\overline\|écriture en base' content/maths/arithmetique/` ⇒ **1** |
| **c** | **Aucune des DIX annales vérifiées n'est un sujet de numération** — mais le GESTE de la capacité 2.1.6 y est attesté une fois, à la base 10 : voir fait **c′**. Règle de la maison : « **Introuvable = absent, jamais inventé** ». | `bank.yaml:10-31`, règle à `:27-28` |
| **c′** | **CORRECTION (fidélité I3) — le dépôt contient une instance SOURCÉE et BARÉMÉE de la capacité 2.1.6, à $b = 10$.** `bk-2024-r-x5` (2024 rattrapage, SM, Ex. 5, 3 pts, `sourcing: sourced`) écrit $m = 10q + r$ avec $0 \le r < 10$, raisonne sur « *le chiffre des unités de $m$* » et « *le nombre privé de ce chiffre* », **construit et démontre un critère de divisibilité par 23 à partir de cette écriture positionnelle**, puis s'en sert pour résoudre un système de congruences. Sa note éditoriale : « *le seul exercice de la banque où l'arithmétique modulaire sert à FABRIQUER un outil de calcul mental* ». **Le grep du 2026-09-28 cherchait « base », « numération », `\overline` : la forme attestée s'écrit $m = 10q+r$.** C'est le mode de défaut d'ADR 0036, commis par le §0 lui-même. | `bank.yaml:1411-1429` (note éditoriale), `:1443-1461` (en-tête + sourcing), `:1549-1569` (l'énoncé et le raisonnement de la q2-a) |
| **d** | **Les 40 items et les 17 modèles d'erreur déclarés ne touchent pas la numération.** `total_items: 40`, `floor: 3`, `floor_met: true`. Les 17 `id` lus un par un (`items.yaml:15-218`) : divisibilité, congruences, PGCD/PPCM, Bézout, Gauss, premiers, Fermat, diophantiennes, congruence linéaire. **Aucun modèle de numération.** | `items.yaml:2656-2727` (`coverage_summary`) ; `grep -n '^  - id: mc\.' items.yaml` ⇒ 17 |
| **e** | **Le garde-fou de périmètre des checkpoints n'inclut pas la numération** (`checkpoints.yaml:52-55`). **Édition obligatoire de cette livraison** (§11.3). | `checkpoints.yaml:52-55` |
| **f** | **La lacune est nommée dans les audits et payée zéro fois** ; c'est la vague **G1** du plan de dette de cadre. | `DETTE-CADRE.md:41` ; `DECISIONS-EN-ATTENTE.md:2153-2196` |
| **g** | **La leçon porte 10 titres `## `, donc 10 chapitres** : R0 (1), R1 (2), R2 (3), R3 (4), R4 (5), R5 (6), R6 (7), R6b (8), R7 (9), R8 (10). **Vérifié contre le texte** : « *l'unicité vue au chapitre 2* » = R1 ✓ · « *l'exemple du chapitre 4* » = R3, PGCD(252,198) ✓ (`:575`) · « *le théorème de Bézout (chapitre 5)* » = R4 ✓ (`:601`) · « *le théorème de Gauss (chapitre 6)* » = R5 ✓ · « *la paire (3,5) du chapitre 1* » = R0 ✓ · « *le lemme d'Euclide … (chapitre 7)* » = R6 ✓ (`:601`). | `grep -n '^## ' content/maths/arithmetique/lesson.md` ⇒ 10 ; `web/src/lib/chapters.ts` pour la règle de calcul |
| **h** | **89 lignes citent « chapitre N » avec $4 \le N \le 9$** : `bank.yaml` 60 · `exercises.yaml` 10 · `lesson.md` 11 · `media/*.stages.json` 4 · `REVIEW-2026-09-12.md` 4. Re-mesuré 2026-10-20 : **toujours 89, même répartition.** | `grep -rc 'chapitres\? [4-9]\b' content/maths/arithmetique/` ⇒ 89 |
| **i** | **AUCUNE ligne du dépôt ne cite « chapitre 8 », « chapitre 10 » ni « chapitre 11 » de cette notion.** Le relevé exhaustif ne contient que 1, 2, 3, 4, 5, 6, 7 et **9** — et 9 désigne R7, qui **ne bouge pas**. **C'est le fait qui décide du §2.** **CORRECTION 2026-10-20 (critique de fidélité du chapitre construit, `docs/audits/critiques/numeration-build-fidelite.md` S7) : faux dans la lettre.** `bank.yaml` portait deux fois « chapitres 1 à 10 » — une PLAGE, dont le `grep -o` n'imprime que la borne basse : la mesure ne pouvait pas la voir (ADR 0036). Les deux lignes ont été mises à « 1 à 11 » dans le commit du chapitre (35df5738) ; la porte `carte-chapitres` les lit, sa regex capture la seconde borne. Le verdict du §2 tient : aucun numéro ISOLÉ ≥ 8 n'était cité. | `grep -rnoE 'chapitres? [0-9]+' content/maths/arithmetique/` ⇒ aucune valeur 8, 10 ou 11 — **aveugle aux plages** ; forme complète : `grep -rnE 'chapitres? [0-9]+ (à\|et) [0-9]+' content/maths/arithmetique/` ⇒ 4 lignes, dont les deux « 1 à 11 » de `bank.yaml` |
| **j** | **Aucune autre notion ne cite un chapitre d'arithmétique.** Re-mesuré sur tout `content/` : la forme croisée « chapitre N de « Titre » » rend 50 lignes, **aucune ne vise l'arithmétique**. | `grep -rn 'chapitre [0-9]\+ de « ' content/` ⇒ 50, dont 0 arithmétique |
| **k** | **Le champ `habilete` existe sur 8 items — les 8 plus récents** (AR-33…AR-40), et le fichier le dit : « *absent des items AR-1..AR-32 (jamais rétrofité), introduit ici seulement pour les items neufs* ». **Les items neufs en portent donc un.** Corollaire utile au §9.0 : **aucun mix `habilete` de notion n'est calculable** (8 items sur 40 tagués). | `items.yaml:1990-1993` ; `grep -n 'habilete:' items.yaml` ⇒ 12 lignes, dont **4 en commentaire** (`:1990`, `:2190`, `:2205`, `:2213`) |
| **l** | **Le fichier s'est déjà reproché de ne pas tenir le mix 40/40/20** : « *Mix sur les 5 items R6b : 20/60/20 … échantillon de 5 items trop petit pour forcer ce ratio sans fausser un tag. Noté honnêtement plutôt que corrigé en douce.* » **Cette révision reprend ce geste et ne force rien** (§9.0). | `items.yaml:2213-2217` |
| **m** | **La leçon n'a AUCUN « Récapitulatif express »** (zéro occurrence). **Cette spec n'en crée pas** (§10). | `grep -c 'Récapitulatif\|Ce qu.il faut retenir\|En résumé' lesson.md` ⇒ **0** |

**Le constat en une phrase :** *un tiers des capacités du sous-domaine n'existe nulle part dans
le produit ; le geste de la plus haute des trois est, lui, attesté une fois sur copie vérifiée,
à la base 10 (fait **c′**) — l'audit ne pouvait voir ni l'un ni l'autre parce qu'il partait des
banques et cherchait un mot.*

---

## 1. Le cadre — lu avant d'écrire

- **Filière / matière.** Sciences Mathématiques (SM-A et SM-B, même cadre maths),
  `matiere: mathematiques`, coef **9**, épreuve **4 h** (`maths-sm.yaml:50-56`). La banque le
  confirme : « *Chapitre SPÉCIFIQUE à la filière Sciences Mathématiques (SM) — absent de
  l'épreuve Sciences Expérimentales* » (`bank.yaml:29-31`). **Pas d'arbitrage de filière.**
- **Sous-domaine et poids, sans le gonfler.** `arithmetique`,
  `poids: { part_examen_bloc: 15, note: "bloc « Arithmétique + Probabilités » ≈ 15 % ; partage
  interne dérivé" }` (`maths-sm.yaml:303`). **Il n'existe aucun chiffre publié plus fin.**
  ⚠ **Piège de lecture, à ne pas reproduire dans la prose :** « trois capacités sur neuf » est un
  **compte de capacités**, **pas un poids de points**. **La prose commandée ici ne fait aucune
  affirmation de fréquence ni de poids d'examen** — règle de la maison, sans exception.
- **Habiletés — la cible chiffrée.** `maths-sm.yaml:58-61` : **application_directe 40 /
  application_non_explicite 40 / synthese 20** (niveau 3 plus exigeant qu'en SExp : 20 contre
  15). **Le §9.0 imprime le mix RÉEL du lot à côté de cette cible et ne le force pas.**
- **Le savoir-faire servi, mot pour mot** (`maths-sm.yaml:338`) :
  > « **Écrire un entier dans une base donnée et revenir à la base 10 ; opérer et comparer dans
  > une base ; exploiter une écriture en base pour une question de divisibilité ou de reste.** »

  **C'est exactement, et seulement, ce que cette spec sert.**
- **`limites` du chapitre, portées en dur** (`maths-sm.yaml:360-361`) :
  1. « *Arithmétique élémentaire dans ℤ. Pas de fonction indicatrice d'Euler comme théorème
     central, pas de RSA/cryptographie formelle.* » → **la numération ne sert de porte d'entrée à
     aucun habillage cryptographique.** Aucune ligne commandée ici ne parle de codage, de clés ou
     de chiffrement.
  2. Le **PRINCIPE DE TRI** : « *ce qui est hors cadre, c'est d'INVOQUER le résultat comme
     théorème NOMMÉ ET ADMIS ; ce qui est attesté, c'est de le faire CONSTRUIRE par l'énoncé,
     question par question, à partir des outils du chapitre.* » → **conséquence structurante :
     les critères de divisibilité par $b-1$ et $b+1$ ne sont JAMAIS donnés comme des règles
     nommées à retenir. Ils sont CONSTRUITS, à chaque fois, depuis $b \equiv 1 \pmod{b-1}$ et
     $b \equiv -1 \pmod{b+1}$** — c'est-à-dire depuis le chapitre 3, que la leçon a déjà
     démontré (`lesson.md:141-157`, le critère par 9 en base 10). La rung **généralise** ce
     geste ; elle n'ajoute aucun théorème.
- **`exclusions_transversales` applicables** (`maths-sm.yaml:432`) : « *Théorie de Galois, corps
  finis au-delà de ℤ/nℤ* ». → **aucune dérive vers les corps finis, les nombres $p$-adiques ou
  la représentation machine.**
- **LA NOTATION — TRANCHÉE (fidélité B2).** Le cadre n'en fixe aucune, et le dépôt n'en porte
  aucune (`content/**` : zéro occurrence d'une écriture en base). La vérification de sources
  (`verification-numeration-2026-09-28.md` §2, pages **vues en image**) établit deux choses :
  1. le matériel marocain écrit **la chaîne de chiffres sous un sur-lignement, la base en index
     adjacent parenthésé** ; **la forme à parenthèses autour des chiffres, $(a_n\cdots a_0)_b$,
     n'est attestée dans AUCUNE source marocaine vue** — les deux fois où elle est apparue,
     c'était une **fabrication du lecteur automatique**. **Elle est INTERDITE ici.**
  2. **les sources marocaines DIVERGENT sur la place de l'index** : 1 exposant parenthésé
     (résumé « Cr1-Fr », publié en 1ère **et** 2ème Bac Sm), 1 indice parenthésé (Moustaoui,
     2 Bac SM, arabe), 1 index nu (position indéterminable). **Aucune majorité.**

  → **Décision pour cette livraison :** **$\overline{a_n\cdots a_0}_{(b)}$ (indice parenthésé)
  partout** — `lesson.md`, `items.yaml`, `checkpoints.yaml`, `exercises.yaml`, la figure. Et
  **UNE SEULE phrase**, à l'endroit où la notation est posée, dit que certains documents écrivent
  la base **en exposant**, $\overline{a_n\cdots a_0}^{(b)}$, et que c'est la même chose. **Une
  fois, pas deux** ; et jamais la forme à parenthèses autour des chiffres. *La divergence est
  réelle : un élève marocain peut avoir rencontré l'une ou l'autre, et le lui dire coûte une
  phrase.*
  → **À router (hors de ma main) :** consigner cette décision **une fois** dans le fichier de
  cadre ou un registre de notation, pour que la prochaine rung l'hérite au lieu de la re-trancher.
- **L'OBSERVATION DE CORPUS, écrite (fidélité I4).** **0 des 10 exercices nationaux SM vérifiés
  de `bank.yaml` (2017 → 2025, normale et rattrapage) ne porte sur une écriture en base** —
  contre 9 sur 10 pour Fermat (`maths-sm.yaml:374`). **C'est un motif OBSERVÉ, adossé à aucun
  libellé de cadre : il n'exclut pas la capacité, qui est au cadre, et il ne justifie aucune
  affirmation de fréquence.** Il a servi une seule chose : **l'arbitrage de TAILLE du lot**, que
  le propriétaire a tranché (`DECISIONS-EN-ATTENTE.md:2191-2196`, défaut « **un lot au
  plancher** ») — et que le §9 applique.
  → **À router :** une ligne sous `arithmetique_z._observation_examens`, proposée telle quelle :
  « *0 des 10 exercices nationaux SM vérifiés ne porte sur une écriture en base ; le GESTE de la
  capacité 2.1.6 est en revanche attesté à $b = 10$ par bk-2024-r-x5 (critère de divisibilité
  construit depuis $m = 10q+r$). Motif observé, adossé à aucun libellé de cadre — il n'exclut
  pas la capacité, qui est au cadre.* » **Édition de cadre : pas ma main.**

---

## 2. Placement — le verdict et son coût

> **`## R7b — Les systèmes de numération`, inséré entre `## R7` et `## R8`.**
> **R7b = chapitre 10. R8 devient chapitre 11.**
> Suffixe lettré, **aucune rung existante renumérotée** — exactement le précédent R6b.

**Ancre exacte, re-mesurée le 2026-10-20 :** après `[[figure:solutions-diophantiennes-reseau]]`
(`lesson.md:595`) et son `---` (`:597`), **avant** `## R8 — Pour t'entraîner` (`:599`).

### 2.1 Ce que l'insertion fait aux numéros de chapitre — explicite, parce qu'une porte le lit

Le numéro qu'un élève lit est **CALCULÉ** : `1 + le nombre de titres `## ` qui le précèdent`
(`web/src/lib/chapters.ts`). Donc :

| rung | avant | après |
|---|---|---|
| R0 … R7 | 1 … 9 | **inchangés** |
| **R7b** (neuve) | — | **10** |
| R8 | 10 | **11** |

- **Renvois à réécrire : ZÉRO.** Toutes les citations « chapitre N » de la notion ont $N \le 9$,
  et 9 désigne R7, qui ne bouge pas (faits **h**, **i**). Aucune autre notion ne cite un chapitre
  d'arithmétique (fait **j**). **En particulier `lesson.md:601` (l'intro de R8 : « Bézout
  (chapitre 5) », « congruences (chapitre 3) », « lemme d'Euclide (chapitre 7) ») reste JUSTE.**
- **La porte rougira quand même, et c'est normal :** `carte-chapitres` scelle la **liste ORDONNÉE
  des titres**, et rougit dès qu'elle bouge. Procédure obligatoire, dans le même commit :
  `cd web && node scripts/carte-chapitres.mjs --porte` → **LIRE le rouge** (il nomme le premier
  chapitre déplacé et liste les renvois à relire) → vérifier qu'il ne liste **aucun** renvoi
  $\ge 10$ → `cd web && node scripts/carte-chapitres.mjs --sceller`. **Ne jamais sceller avant
  d'avoir lu la liste** : la prévision « zéro » est de cette spec, le verdict est de
  l'instrument. *Rappel de ce qui a motivé cette porte : quatre insertions en une semaine — dont
  **R6b dans cette leçon même** — ont rendu à l'élève dix-sept renvois pointant un chapitre trop
  tôt (`carte-chapitres.mjs:5-14`).*

### 2.2 Pourquoi après R7, pédagogiquement (le coût confirme, il ne décide pas)

1. **La leçon est une chaîne de preuve, et une insertion précoce la couperait.** R0 promet
   explicitement Bézout (« *ce chapitre construit, étape par étape, tout ce qu'il faut pour le
   démontrer* », `lesson.md:23`) ; la chaîne est R1 → R2 → R3 → **R4, le paiement de la
   promesse**. La numération n'est pas un maillon de cette chaîne : c'est un **usage** de ses
   outils.
2. **La capacité 2.1.6 ne PEUT PAS être servie avant Gauss.** E7 utilise le théorème de Gauss
   (chapitre 6) pour passer de $2 \mid 3x$ à $2 \mid x$ ; l'exercice `r-numeration` utilise le
   corollaire de coprimalité (`lesson.md:309`) pour expliquer pourquoi « divisible par 6 et par
   8 » ne donne pas 48. Avant R5, aucun des deux n'existe.
3. **Le rappel espacé est un choix, pas un pis-aller** — précédent dans le fichier : R6b rouvre,
   cinq chapitres plus loin, le calcul de période fait à R2 (`lesson.md:439`) ; R7b rouvre
   nommément le critère par 9 du chapitre 3 (§5.3).
4. **Position de consolidation avant le sommet** : ré-employer division euclidienne (ch. 2),
   congruences (ch. 3) et Gauss (ch. 6) sur un objet neuf **est** la capacité 2.1.6.

**Contre-argument laissé à l'owner (§12 Q5).** Si l'écriture en base doit être *acquise tôt*,
un `## R2b` (chapitre 4) redevient défendable — au prix de la relecture des **89 renvois** du
fait **h**, qui se paient une fois et se relisent un par un. Je ne le recommande pas.

---

## 3. Le périmètre — ce qui entre, ce qui n'entre pas

| capacité du cadre | ce que la rung en fait | bloc |
|---|---|---|
| **2.1.4** « Écrire un entier naturel dans un système de numération de base donnée » | écriture de $N$ en base $b$ par divisions successives **avec le mécanisme de l'ordre inversé démontré** ; retour à la base 10 par les puissances **et** par la forme emboîtée | §5 A |
| **2.1.5** « Additionner, multiplier et comparer deux entiers dans un système de numération » | une addition posée, une multiplication posée, **la retenue justifiée par le poids de la colonne voisine** ; comparaison **dans une même base** (nombre de chiffres, puis chiffres de gauche à droite, **avec sa raison**) et le piège de la comparaison inter-bases | §5 B |
| **2.1.6** « Utiliser les écritures dans **des systèmes de numération** dans des situations d'arithmétique » *(libellé complet — `maths-sm.yaml:598-599`)* | critères par $b-1$ et $b+1$ **construits** depuis $b \equiv \pm 1$, avec **rupture mise en scène** ; un problème travaillé de détermination de chiffres (E7) ; un **exercice attempt-first** de forme examen (`r-numeration`) | §5 C + §10.2 |

### 3.1 Les bornes dures — non négociables pour content-author et item-author

1. **Entiers NATURELS seulement.** Pas d'écriture en base d'un entier négatif, **pas de partie
   fractionnaire** (jamais $\overline{0{,}101}_{(2)}$).
2. **Aucune base > 10, et AUCUNE prose sur les chiffres $\ge 10$.** Les bases utilisées sont
   **2, 3, 5, 6, 7, 8, 9** ; la base générique $b$ apparaît **symboliquement** (chiffres $a_i$
   avec $0 \le a_i \le b-1$), ce qui est la forme des énoncés SM.
   ⚠ **Supprimé par cette révision (fidélité M4) : les deux lignes de prose qui annonçaient
   « A = 10, B = 11, … ».** La version précédente les commandait tout en marquant le doute dans
   un **commentaire d'auteur**, que `stripAuthoringComments` retire au rendu : l'élève aurait lu
   une convention non vérifiée comme un fait, et c'est la convention hexadécimale, à une ligne de
   l'interdiction « aucune informatique ». **La rung n'utilise aucune base > 9 : cela ne coûte
   rien.** La question reste au §12 Q1(b).
3. **Aucune informatique.** Pas de complément à deux, pas de virgule flottante, pas d'opérateurs
   binaires, pas de portes logiques, pas de conversion binaire ↔ hexadécimal comme *technique*.
   La base 2 n'apparaît que comme **une base parmi d'autres** (§12 Q2).
4. **Aucun corps fini, aucun $p$-adique** (`maths-sm.yaml:432`).
5. **Aucune cryptographie, aucun RSA** (`maths-sm.yaml:360`).
6. **Aucun critère nommé et admis** (PRINCIPE DE TRI) : les deux critères sont **re-dérivés**,
   en deux lignes chacun.
7. **Aucun théorème neuf.** Si un auteur se surprend à écrire « on admet que… », il est sorti du
   périmètre.
8. **Aucune affirmation de fréquence ou de poids d'examen.** Voir §1.
9. **Aucun nombre repris d'une annale, d'un exercice ou d'un item existant** dans la prose
   enseignante (§5, ledger de non-duplication).

---

## 4. L'inventaire des modèles d'erreur

**Quatre familles NEUVES + une RÉUTILISÉE.** Bloc à insérer dans `misconceptions:` de
`items.yaml`, **après le 17ᵉ** (`:218`, juste avant `items:` à `:220`), au format exact des 17
existants — quatre champs et quatre seulement : `id`, `label`, `description`,
`contradicts_principle`.

### 4.1 N1 — l'ordre des restes

```yaml
  - id: mc.math.maths_arithmetique.numeration-restes-ordre-inverse
    label: "Chiffres d'une écriture en base b assemblés dans l'ordre où les restes sortent"
    description: >-
      L'élève enchaîne correctement les divisions euclidiennes par $b$, mais lit
      les restes de haut en bas : le PREMIER reste devient le chiffre de tête. Le
      réflexe « on lit de gauche à droite » l'emporte sur le poids que porte
      chaque reste, et le lien « premier reste = chiffre des unités » n'est jamais
      établi. Variante à demi corrigée : le dernier reste est bien mis en tête,
      puis les autres sont laissés dans l'ordre de sortie. Même mécanisme au
      retour vers la base 10 : le chiffre de gauche se voit affecter $b^0$, les
      exposants sont décalés d'un cran, ou deux écritures sont comparées en
      partant des unités.
    contradicts_principle: >-
      Dans $N = b q_0 + r_0$, le reste $r_0$ est le SEUL terme qui n'est pas
      multiplié par $b$ : c'est le chiffre des unités, $a_0$. Chaque division
      suivante extrait le chiffre du poids immédiatement supérieur. Les restes
      sortent donc du poids le plus FAIBLE au plus fort, et l'écriture se lit de
      bas en haut.
```

**Pourquoi ce n'est pas `reste-non-normalise`** (`items.yaml:60-69`) : ce modèle-là porte sur un
reste **faux ou hors de $[0,n[$**. Ici, **chaque reste est juste et normalisé** ; la faute est
dans l'**assemblage**. Deux diagnostics, deux remédiations.

### 4.2 N2 — l'écriture prise pour le nombre

```yaml
  - id: mc.math.maths_arithmetique.numeration-ecriture-prise-pour-le-nombre
    label: "L'écriture confondue avec le nombre (lue en base 10, ou comparée comme une chaîne)"
    description: >-
      Pour l'élève, la suite de chiffres EST le nombre, et la base n'est qu'une
      étiquette posée à côté. Il lit $\overline{123}_{(5)}$ comme cent vingt-trois,
      conclut de « la même suite de chiffres » à « le même nombre », croit que
      plus la base est grande (ou plus l'écriture est longue) plus le nombre est
      grand, et compare deux écritures SANS repasser par la valeur — chiffre à
      chiffre, par leur nombre de chiffres, ou par leur somme de chiffres. Cette
      comparaison fautive existe aussi DANS UNE MÊME BASE : comparer les chiffres
      de tête sans aligner d'abord le nombre de chiffres donne un ordre faux
      ($\overline{412}_{(5)} = 107 < \overline{1203}_{(5)} = 178$, et pourtant
      $4 > 1$).
    contradicts_principle: >-
      Une écriture est une liste de COEFFICIENTS :
      $\overline{a_p\cdots a_0}_{(b)} = \sum_i a_i b^i$. Le même entier a une
      écriture différente dans chaque base ($17 = \overline{23}_{(7)} =
      \overline{32}_{(5)}$), et la même suite de chiffres désigne des entiers
      différents selon la base ($\overline{201}_{(3)} = 19$,
      $\overline{201}_{(5)} = 51$). Dans une même base, c'est le nombre de
      chiffres qui décide d'abord, et les chiffres de gauche à droite ensuite ;
      entre deux bases, rien ne se compare avant d'avoir calculé les valeurs.
```

⚠ **Découverte de conception, RAFFINÉE par cette révision — elle contraint les items.**
Une comparaison **dans une même base** ne peut pas diagnostiquer la **face « chaîne lue en base
10 »** de N2 : cette lecture **préserve l'ordre** (à nombre de chiffres égal, l'ordre est
lexicographique dans les deux lectures ; à nombre de chiffres différent, plus de chiffres = plus
grand dans les deux lectures). Un élève qui tient cette face **trouve la bonne réponse** — c'est
de la *contamination de la bonne réponse*, donc un défaut de stem.
**→ tout item qui vise la face « lue en base 10 » par une comparaison est INTER-bases (AR-45).**
**En revanche les faces « chiffre de tête sans aligner les longueurs » et « somme des chiffres »
SONT diagnosticables en base unique** — c'est exactement ce que fait **AR-44**, et c'est ce qui
permet d'évaluer la capacité 2.1.5 telle que le cadre l'écrit (« comparer **dans une base** »),
au lieu de la laisser enseignée sans être sondée (fidélité I5).

### 4.3 N3 — les contraintes sur les chiffres

```yaml
  - id: mc.math.maths_arithmetique.numeration-contraintes-sur-les-chiffres
    label: "Un chiffre traité comme un entier libre (borne a_i ≤ b−1, ou chiffre de tête non nul, oubliée)"
    description: >-
      L'élève manipule un chiffre comme un entier quelconque. Il accepte une
      écriture dont un chiffre atteint ou dépasse la base ($\overline{1206}_{(6)}$),
      décale la borne d'un cran (croire que la base 8 s'arrête à 6), retient comme
      solution d'une équation une racine dont un chiffre sort de
      $\{0,\dots,b-1\}$, ou garde une écriture à chiffre de tête nul. Quand le
      même nombre est écrit dans DEUX bases, il n'intersecte pas les deux
      contraintes et garde la plus large.
    contradicts_principle: >-
      En base $b$ il y a exactement $b$ chiffres, $0$ à $b-1$ ; un « chiffre » égal
      à $b$ est une retenue qui n'a pas été faite. Le chiffre de tête d'une
      écriture est non nul, sinon le nombre n'a pas ce nombre de chiffres — d'où
      l'encadrement $b^{p} \le N \le b^{p+1}-1$ pour une écriture à $p+1$ chiffres.
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
      10 (rien ne déborde avant $10$, et la retenue retranche $10$ au lieu de $b$) ;
      ou bien le débordement est bien vu et ramené dans $\{0,\dots,b-1\}$, mais la
      retenue n'est pas ajoutée à la colonne voisine, chaque colonne étant traitée
      indépendamment.
    contradicts_principle: >-
      Une colonne déborde quand elle atteint $b$, parce que la colonne voisine à
      gauche pèse exactement $b$ fois plus. La règle est la division euclidienne
      par $b$ : $c = qb + r$ avec $0 \le r < b$ — on écrit $r$, on reporte $q$. Le
      nombre $10$ n'a aucun rôle : c'est la base qui fixe le seuil, et la retenue
      n'est pas facultative.
```

### 4.5 La famille RÉUTILISÉE — `critere-divisibilite-mal-applique`

**Réutilisation assumée, pas de famille neuve.** Le modèle existe (`items.yaml:82-91`) et son
`contradicts_principle` porte **déjà le bon principe**, seulement instancié en base 10 : « *Le
critère par somme des chiffres vient de $10 \equiv 1 \pmod 9$ (pas mod 10).* » Le mécanisme est
identique : **appliquer un critère de chiffres sans re-dériver la congruence que la base
satisfait.** Trois faces neuves : la **somme** employée pour $b+1$ là où c'est la somme
**alternée** ; la somme crue liée à **$b$** alors qu'elle donne le reste modulo **$b-1$** ; le
**chiffre des unités** pris pour le reste modulo autre chose que $b$.

**Édition demandée, minimale, sans aucun re-tagage :** élargir `description` et
`contradicts_principle` pour nommer la base générique (« *le critère par somme des chiffres vient
de $b \equiv 1 \pmod{b-1}$ ; modulo $b+1$ c'est $b \equiv -1$, donc la somme ALTERNÉE ; le
chiffre des unités, lui, donne le reste modulo $b$* »). **Aucun distracteur existant ne change de
tag** ; AR-1, AR-13, AR-31 et AR-34 restent valides mot pour mot. **→ §12 Q4.**

### 4.6 Ce que je NE déclare PAS — dette écrite à côté de ce qui est armé

*(ADR 0035 : la décision de ne pas armer s'écrit à côté du motif voisin.)*

1. ~~« Comparer par le chiffre de tête sans aligner le nombre de chiffres »~~ — **ARMÉ par cette
   révision**, non comme famille neuve mais comme **face déclarée de N2** (§4.2), portée par
   **AR-44** et justifiée en prose (E5). *Motif du changement : la capacité 2.1.5 dit « comparer
   dans une base » ; laisser ce modèle non armé laissait la capacité enseignée et non sondée
   (fidélité I5), et laissait la règle la moins justifiée de la rung sans item derrière elle
   (pédagogie I4).*
2. **La séparation des deux faces de N3** (borne haute $a_i \le b-1$ / chiffre de tête non nul)
   et **des deux faces de N4** (seuil à 10 / retenue non reportée). Un mécanisme chacune à mon
   jugement — la contrainte non re-dérivée d'un côté, le report non re-dérivé de l'autre —
   précédent du fichier : `reste-non-normalise` réunit quatre manifestations,
   `congruence-lineaire-mal-resolue` trois. **→ §12 Q3.**

**Aucun distracteur des 12 items n'est tagué à un modèle dont le principe ne le couvre pas** —
c'est le défaut nommé ailleurs (F-6), et c'est pourquoi le §9 recalcule chaque distracteur depuis
le modèle qu'il porte.

---

## 5. La rampe — tous les nombres calculés et contrôlés ici

**content-author ne choisit aucun nombre.** Tout ce qui suit a été calculé **et re-vérifié en
sens inverse** (deux fois : 2026-09-28, puis 2026-10-20 après modification).

**Ledger de non-duplication, vérifié nombre par nombre :**
- Aucun nombre de §5 n'est repris d'une annale de `bank.yaml`, d'un exercice de `exercises.yaml`
  ni d'un item existant. *Vérifications ciblées faites le 2026-10-20 :* `143` est **écarté**
  (occupé par $7^{143}$ en R6b et par plusieurs items) ; `192` apparaît dans `bank.yaml` comme
  **exposant** de `bk-2024-n-x5` ($2024^{192}$, `bank.yaml:547-551`) et non comme résultat — l'exercice `r-numeration`
  l'obtient comme valeur de $N$, et **aucun chemin de mémorisation ne relie les deux** ; `234`,
  `352`, `500`, `203`, `344`, `412`, `1203`, `8523`, `950` n'apparaissent nulle part dans le
  contenu de la notion (les seuls appariements sont des coordonnées de SVG).
- Réemplois **internes et délibérés** : le $2025$ de E1 revient en E6 ; le
  $\overline{5622}_{(7)}$ de E1 revient en E6.
- **Aucun item du §9 ne rejoue un exemple travaillé.** *(C'était faux dans la version du
  2026-09-28 — deux items reprenaient mot pour mot un nombre de la prose ; voir le journal de
  révision, pédagogie B3.)*

### 5.0 L'accroche, sa PROMESSE, et son engagement

**L'accroche, en cinq phrases.** *Dix doigts.* Notre système compte par paquets de dix pour une
raison **anatomique**, pas mathématique. Une machine qui n'a que deux états compte par paquets de
deux ; une horloge compte par paquets de soixante et personne ne trouve ça bizarre. Et le même
entier, $2025$, s'écrit :

$$2025 \;=\; \overline{11111101001}_{(2)}$$

*Contrôle :* $1024+512+256+128+64+32 = 2016$, puis $+8 = 2024$, puis $+1 = 2025$ ✓ — onze bits,
$1,1,1,1,1,1,0,1,0,0,1$.

**LA PROMESSE — obligatoire, une phrase (pédagogie I6).** À la place de la seule observation,
l'accroche doit dire ce que la base **achète** : *« À la fin de ce chapitre, tu sauras fabriquer
un critère de divisibilité dans n'importe quelle base — celui par 9 que tu as démontré au
chapitre 3 n'en est qu'un cas particulier — et t'en servir pour retrouver un chiffre qu'un énoncé
ne te donne pas. »* **Aucune mention d'examen, aucune fréquence.** *Motif : au chapitre 10, après
neuf chapitres d'une seule chaîne Bézout → Gauss → diophantiennes, la question réelle de l'élève
est « pourquoi maintenant ? », et la meilleure réponse (consolidation : ré-employer division
euclidienne, congruences et Gauss sur un objet neuf) était écrite pour l'owner et jamais pour
l'élève.*

**L'ENGAGEMENT, AVANT toute révélation** — marqueur `[[checkpoint:cp-r7b-predict-ecriture]]` posé
immédiatement après l'égalité ci-dessus, **avant** la phrase qui explique. C'est la case
*predict-commit-confront*, et elle vise **N2**, le modèle racine.

⚠ **Changement par rapport au 2026-09-28 : l'accroche n'imprime PLUS la forme en base 7.**
Elle imprimait $2025 = \overline{5622}_{(7)}$, ce qui pré-résolvait E1 et rendait impossible tout
engagement sur l'ordre des restes. **La base 7 est maintenant ce que E1 PRODUIT.**

### 5.1 Bloc A — écrire dans une base, revenir en base 10 *(capacité 2.1.4)*

**E1 — $2025$ en base $7$.** Les quatre divisions, dans cet ordre :

$$2025 = 7 \times 289 + \mathbf{2} \qquad 289 = 7 \times 41 + \mathbf{2} \qquad 41 = 7 \times 5 + \mathbf{6} \qquad 5 = 7 \times 0 + \mathbf{5}$$

**Puis, AVANT d'assembler quoi que ce soit :** *« Les quatre restes sont sortis dans cet ordre :
$2$, $2$, $6$, $5$. Prends position avant de lire la suite : quelle écriture forment-ils ? »* →
marqueur `[[checkpoint:cp-r7b-ordre-restes]]` (§6.2). **C'est l'engagement sur N1, le modèle
signature de la rung, et il n'existait pas dans la version précédente** (pédagogie I2).

Puis la réponse, puis le contrôle :

$$\boxed{\,2025 = \overline{5622}_{(7)}\,}$$

*Contrôle, obligatoire dans la prose :* $5\times343 + 6\times49 + 2\times7 + 2
= 1715 + 294 + 14 + 2 = 2025$ ✓.

> **La rupture de N1, mise en scène — cœur du bloc A, OBLIGATOIRE.**
> Le modèle faux est **dit dans les mots de l'élève** (« le premier reste, c'est le chiffre de
> gauche, puisqu'on lit de gauche à droite »), puis **mis à l'épreuve, pas corrigé** : sur un
> nombre plus petit, $100$ en base $6$ ($100 = 6\times16+4$, $16 = 6\times2+4$,
> $2 = 6\times0+2$), ce modèle donne $\overline{442}_{(6)}$. **On le recalcule :**
> $4\times36 + 4\times6 + 2 = 144+24+2 = \mathbf{170}$, et on cherchait $100$. **Le modèle casse
> sur sa propre conséquence.** Puis, et seulement puis, la raison : *dans $N = 7q + r$, $r$ est
> le seul terme qui n'est pas multiplié par 7 — c'est ce qui reste après avoir retiré tous les
> paquets de 7, donc le chiffre des unités.*
> *(Anatomie exigée : voix → test → cassure. Une phrase qui poserait la bonne règle à côté de la
> fausse ne coche pas la case.)*
> *(La bonne écriture de $100$ en base 6 est $\overline{244}_{(6)}$ — contrôle $72+24+4 = 100$ ✓ —
> et **aucun item ne la redemande** : c'est ce qui a été corrigé, voir le journal B3.)*

`[[figure:numeration-cascade-2025-base7]]` **ici, après le point d'arrêt** (son étage 3 révèle
l'écriture assemblée : le poser avant contaminerait l'engagement).

**E2 — retour en base 10 : $\overline{3204}_{(5)}$.** Deux chemins :

$$\overline{3204}_{(5)} = 3\times125 + 2\times25 + 0\times5 + 4 = 375 + 50 + 0 + 4 = \boxed{429}$$

$$\text{forme emboîtée : } 3 \;\to\; 3\times5+2 = 17 \;\to\; 17\times5+0 = 85 \;\to\; 85\times5+4 = 429 \ ✓$$

**Deux exigences sur ce second chemin (pédagogie I4, fidélité M2) :**
- **il est JUSTIFIÉ en une ligne, pas offert comme recette** : on factorise la base à chaque
  étage, $3\cdot5^3 + 2\cdot5^2 + 0\cdot5 + 4 = \big((3\cdot5+2)\cdot5+0\big)\cdot5+4$ — c'est la
  même somme, réécrite ; *(contrôle : $((3\cdot5+2)\cdot5+0)\cdot5+4 = (85)\cdot5+4 = 429$ ✓)* ;
- **il n'est PAS nommé.** Pas de « Horner » : le mot est hors du lexique de 2ᵉ Bac, et §3.1-7 dit
  que la rung n'introduit rien. *Si la longueur force une coupe, on coupe le chemin ET son nom,
  pas sa justification.*

*Une phrase, obligatoire, sur la décision d'expert : « le chiffre $0$ n'est pas un blanc, c'est un
coefficient qui vaut zéro — si on le saute, tous les poids à sa gauche glissent d'un cran. »*

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

> **La rupture de N4 — la phrase à écrire, et le contrôle négatif, RECALCULÉ.**
> *« Pourquoi $7$ et pas $10$ ? Parce que la colonne de gauche pèse exactement sept fois plus que
> celle de droite. Dès qu'une colonne atteint sept unités, ces sept unités valent exactement UN
> de la colonne voisine : on les y envoie. Le nombre dix n'intervient nulle part — il
> n'intervenait, en base 10, que parce que la base valait dix. »*
> **Le contrôle négatif, chiffré et VRAI :** conduite au seuil 10, cette multiplication donne
> $4\times5 = 20$ → on écrit $0$, on retient $2$ ; $3\times5+2 = 17$ → on écrit $7$, on retient
> $1$ : soit $\overline{170}$ — qui est tout simplement $34 \times 5$ en base 10. **Et le chiffre
> $7$ n'existe pas en base 7 : l'erreur se barre à l'œil.** Même chose sur E3 : au seuil 10, la
> colonne des unités donnerait $9$, pas un chiffre de la base 7.
> ⚠ **Correction (pédagogie I1).** La version du 2026-09-28 affirmait l'inverse — « *E4 mal
> conduite à 10 donnerait $\overline{1\,5}\ldots$, une écriture qui a l'air légale* ». **C'est
> numériquement faux** (le calcul donne $\overline{170}$) et aucun modèle de retenue ne produit
> « 15… » ici.
> **La règle de conception honnête, qui remplace « addition contre multiplication » :** l'erreur
> de seuil est **visible** tant que la colonne fautive produit un chiffre $\ge b$, et devient
> **invisible** dès que la colonne atteint $10$ (on écrit alors $c-10$, qui peut être un chiffre
> légal de la base). Comme un produit de colonne dépasse $10$ bien plus souvent qu'une somme,
> **le sondage de N4 se construit sur une multiplication** : le point d'arrêt
> ($\overline{25}_{(6)}\times\overline{4}_{(6)} \Rightarrow \overline{100}_{(6)}$, légale) et
> AR-48 ($\overline{45}_{(6)}\times\overline{3}_{(6)} \Rightarrow \overline{135}_{(6)}$, légale)
> sont exactement ces cas — **tous deux vérifiés** (§6.3, §9.4).

Marqueur `[[checkpoint:cp-r7b-retenue]]` **immédiatement après E4.**

**E5 — comparer.** Deux temps, dans cet ordre, **et le second a plus de place que le premier**
(pédagogie M2 : le premier n'est pas une surprise, c'est une règle ; le second est là où N2 casse).

*Dans une même base — la règle ET sa raison, chacune en une ligne (pédagogie I4).*
$\overline{1000}_{(3)} = 27$ et $\overline{222}_{(3)} = 18+6+2 = 26$ : **plus de chiffres gagne
toujours**, parce qu'une écriture à $p+1$ chiffres (chiffre de tête non nul) vérifie
$b^{p} \le N \le (b-1)(b^{p}+\cdots+1) = b^{p+1}-1$, donc elle reste **strictement** sous toute
écriture à $p+2$ chiffres. **À égalité de longueur, on compare de gauche à droite** — et voici
pourquoi : la première position où deux écritures diffèrent pèse au moins $b^{k}$, tandis que
tout ce qui est strictement en dessous totalise au plus $b^{k}-1$. *(Contrôle du mécanisme :
$N \ge (a'_k+1)b^k$ et $N' \le a'_k b^k + (b^k-1)$ donnent $N - N' \ge 1$.)* **Aucune de ces deux
règles n'est posée sans sa raison.**

*Entre deux bases.* $\overline{21}_{(3)} = 2\times3+1 = 7$ et $\overline{12}_{(5)} = 5+2 = 7$ :
**deux écritures différentes, un seul et même nombre.** Et la réciproque :
$\overline{201}_{(3)} = 2\times9+0+1 = 19$ contre $\overline{201}_{(5)} = 2\times25+0+1 = 51$ —
**une seule écriture, deux nombres.** *(Le choix de $\overline{201}$ plutôt que
$\overline{101}$ écarte le réflexe « 101, c'est du binaire » et tient la borne §3.1-3.)*
*Le piège à éviter, avec le gabarit du fichier (`lesson.md:349`) :* « **Le piège à éviter :**
comparer deux écritures de bases différentes en regardant les chiffres. La suite de chiffres
n'est pas le nombre ; elle ne le devient qu'une fois la base appliquée. Tant qu'on n'a pas
calculé les deux valeurs, on ne sait rien. »

### 5.3 Bloc C — utiliser les écritures *(capacité 2.1.6)*

**E6 — les deux critères, construits, avec une RUPTURE mise en scène.**

$$b \equiv 1 \pmod{b-1} \;\Longrightarrow\; b^k \equiv 1 \;\Longrightarrow\; N \equiv \sum_i a_i \pmod{b-1}$$

*La phrase de raccord obligatoire, qui rouvre le chapitre 3 :* « *Tu as déjà fait exactement ce
calcul. Au chapitre 3, tu as démontré le critère par 9 en partant de $10 \equiv 1 \pmod 9$ —
c'est le cas $b = 10$, et $9 = b-1$. Rien de neuf ici : la même démonstration, avec une lettre à
la place d'un chiffre.* »

> **La rupture, OBLIGATOIRE et entièrement chiffrée.** Avant de dériver le second critère, la
> prose fait dire à l'élève le modèle qu'il a : *« la somme des chiffres, c'est LE critère »* —
> puis **prends position** : *« en base 7, la somme des chiffres de $\overline{5622}_{(7)}$ vaut
> $15$. Modulo 8, que vaut $N$ ? »* Le modèle prédit $15 \equiv \mathbf{7} \pmod 8$. **On
> recalcule la vérité :** $2025 = 8\times253 + 1$, donc $N \equiv \mathbf{1} \pmod 8$.
> **$7 \ne 1$ : le modèle casse sur sa propre conséquence.** Et la raison arrive après, pas
> avant : en base 7, $7 \equiv -1 \pmod 8$, pas $1$.

$$b \equiv -1 \pmod{b+1} \;\Longrightarrow\; b^k \equiv (-1)^k \;\Longrightarrow\; N \equiv a_0 - a_1 + a_2 - \cdots \pmod{b+1}$$

*Sur le nombre de E1, $N = \overline{5622}_{(7)} = 2025$, avec $b-1 = 6$ et $b+1 = 8$ :*

| critère | calcul sur les chiffres | reste annoncé | **contrôle direct** |
|---|---|---|---|
| modulo $6$ | $S = 5+6+2+2 = 15$, et $15 = 6\times2+3$ | $\mathbf 3$ | $2025 = 6\times337 + 3$ ✓ |
| modulo $8$ | $T = a_0-a_1+a_2-a_3 = 2-2+6-5$ | $\mathbf 1$ | $2025 = 8\times253 + 1$ ✓ |

*Et un cas où le critère tombe à zéro,* $\overline{3405}_{(7)}$ : $S = 3+4+0+5 = 12$, multiple de
$6$, donc $6 \mid N$. Contrôle : $\overline{3405}_{(7)} = 1029+196+0+5 = 1230 = 6\times205$ ✓.
*(Et $T = 5-0+4-3 = 6$, donc $1230 \equiv 6 \pmod 8$ ; contrôle $1230 = 8\times153+6$ ✓ — les deux
critères ne disent pas la même chose, et c'est tout l'objet de la rupture ci-dessus.)*

**E7 — détermination de chiffres : la même écriture dans deux bases. RUPTURE MISE EN SCÈNE.**

> *Déterminer tous les couples de chiffres $(x,y)$ tels que
> $\overline{xy}_{(7)} = \overline{yx}_{(5)}$, et donner le nombre correspondant.*

⚠ **Changement majeur de cette révision (pédagogie B1).** La version du 2026-09-28 posait la
ligne de contraintes **avant** l'algèbre, puis rejetait $y = 6$ comme une formalité : le registre
des modèles revendiquait une *rupture* de N3 que la prose ne mettait **jamais en scène**. Or la
rupture parfaite dormait dans l'exemple. **Nouvel ordre imposé :**

1. **On résout d'abord comme le ferait l'élève — sans borner les chiffres.**

$$7x + y = 5y + x \;\Longleftrightarrow\; 6x = 4y \;\Longleftrightarrow\; 3x = 2y$$

   **Le geste d'expert, à exposer :** $2 \mid 3x$ et $\mathrm{PGCD}(2,3) = 1$, donc **le théorème
   de Gauss (chapitre 6) donne $2 \mid x$** — on ne divise pas une égalité d'entiers par 3 « pour
   voir », on invoque le théorème dont on a vérifié l'hypothèse. $x$ étant un chiffre de la base
   7 non nul : $x \in \{2,4,6\}$, d'où $(2,3)$, $(4,6)$ et $(6,9)$.
2. **Prends position** avant la suite : *combien de ces trois couples survivent ?* Le cas $(6,9)$
   tombe tout seul ($9$ n'est un chiffre d'aucune des deux bases). **Reste $(4,6)$ — et c'est lui
   qui casse le modèle :** l'élève le vérifie *dans l'équation* et ça marche —
   $7\times4+6 = 34$ et $5\times6+4 = 34$. **Deux nombres égaux, et pourtant la réponse est
   fausse : $\overline{64}_{(5)}$ N'EXISTE PAS**, parce que $6 \ge 5$ n'est pas un chiffre de la
   base 5. *Le modèle « un chiffre est un entier comme un autre » produit ici une réponse
   numériquement cohérente faite d'une écriture qui n'existe pas — c'est exactement une cassure
   sur sa propre conséquence, et l'équation seule ne pouvait pas la voir.*
3. **Et seulement maintenant, la décision d'expert à nommer :** *« Voilà pourquoi, dans ce type de
   question, on écrit les bornes AVANT de résoudre : $x$ et $y$ sont chiffres des DEUX écritures,
   donc $x,y \in \{0,\dots,6\} \cap \{0,\dots,4\} = \{0,\dots,4\}$, avec $x \ne 0$ et $y \ne 0$.
   Cette ligne-là, et pas l'équation, fait le tri. »*

$$\boxed{\,(x,y) = (2,3), \quad N = \overline{23}_{(7)} = \overline{32}_{(5)} = 17\,}$$

*Contrôle :* $2\times7+3 = 17$ et $3\times5+2 = 17$ ✓.

### 5.4 La rampe, rung par rung — et où l'échafaudage tombe VRAIMENT

| étape | ce qu'elle demande | engagement réel de l'élève | modèle confronté |
|---|---|---|---|
| accroche + promesse | prendre position sur « le nombre a-t-il changé ? » | **QCM** `cp-r7b-predict-ecriture` | **N2** |
| E1, divisions | prédire l'ordre des restes | **QCM** `cp-r7b-ordre-restes` | **N1** |
| E1, rupture | suivre la cassure du contre-modèle | lecture guidée | **N1** |
| E2 | refaire dans l'autre sens | fort (deux chemins montrés, le second justifié) | N1 (poids) |
| E3–E4 | poser une opération | **QCM** `cp-r7b-retenue` | **N4** |
| E5 | comparer, puis se méfier | moyen (règle + raison, deux lignes) | **N2** (dont la face « chiffre de tête »), N3 |
| E6 | re-dériver un critère | **« prends position » écrit**, puis cassure chiffrée | **`critere-divisibilite-mal-applique`** |
| E7 | poser les contraintes APRÈS s'être fait prendre | **« prends position » écrit**, puis cassure | **N3** |
| `r-numeration` | quatre questions d'affilée, forme examen | **essai écrit obligatoire** (attempt-first) : rien n'est montré avant l'engagement | N3, `gauss-condition-ignoree` |

**L'échafaudage tombe dans l'ARTEFACT, pas seulement dans ce tableau** (pédagogie B2) : trois
QCM dans le premier tiers, deux engagements **écrits** au milieu, un **essai complet** au sommet.
La version du 2026-09-28 déclarait un échafaudage « nul » en haut de rampe tout en imprimant la
solution complète du seul exercice de forme examen : l'élève lisait la réponse. **C'est corrigé
par §10.2.**

---

## 6. Les trois points d'arrêt — énoncés et clés exacts

**Trois, comme dans la version précédente, mais pas les mêmes.** `cp-r7b-critere` est **retiré**
et remplacé par `cp-r7b-ordre-restes` (N1). *Motif : N1 est le modèle signature de la rung et le
seul endroit où un élève en difficulté est réellement perdu, et il n'avait aucun engagement
(pédagogie I2) ; le critère, lui, garde une rupture mise en scène en prose (§5.3), deux items de
banque (AR-51, AR-52) et la question b) de l'exercice.*

Format YAML : celui des six existants — `id`, `rung`, `habilete`, `skill_code`, `tags`,
`primary_misconception`, `item_source`, `lesson_placement`, `stem`, `type`, `choices`. **Les
trois blocs portent `skill_code` ET `tags`** (pédagogie M3 : deux des trois les omettaient).
**Chaque retour d'erreur NOMME le modèle** (« Modèle détecté : … »). **Les points d'arrêt ne
comptent pas dans le plancher** (`checkpoints.yaml:6-12`, `items.yaml:2660-2661`).

### 6.1 `cp-r7b-predict-ecriture` — l'ENGAGEMENT (N2)

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

**Stem.** « $2025$ s'écrit $\overline{11111101001}$ en base $2$. **Prends position avant de lire
la suite :** en passant de la base $10$ à la base $2$, qu'est-ce qui a changé ? »

| choix | texte | modèle | le retour, en une ligne |
|---|---|---|---|
| **A ✘** | « Le nombre a changé : avec onze chiffres, $\overline{11111101001}_{(2)}$ est bien plus grand que $2025$. » | **N2** | Modèle détecté : l'écriture prise pour le nombre (ici, « plus de chiffres = plus grand »). Recompte : $1024+512+256+128+64+32+8+1 = 2025$ — **le même entier**. |
| **B ✔** | « Seulement l'écriture : c'est le même entier, compté par paquets de $2$ au lieu de paquets de $10$. » | — | Exact. Une base est une taille de paquet, pas une transformation du nombre. |
| **C ✘** | « L'écriture **et** le nombre : une base plus petite donne forcément un nombre plus petit. » | **N2** | Modèle détecté : la base crue proportionnelle au nombre. La base ne change que la LONGUEUR de l'écriture — plus la base est petite, plus il faut de colonnes pour le même entier. |
| **D ✘** | « L'écriture seulement — mais la base $2$ ne peut pas tout écrire : il lui manque les chiffres $2$ à $9$. » | **N3** | Modèle détecté : moins de chiffres confondu avec moins de nombres. La base $2$ a exactement $2$ chiffres et écrit **tous** les entiers naturels — elle utilise juste plus de colonnes. |

*Contamination vérifiée : aucun des deux modèles ne produit B.*
⚠ **Changement (pédagogie M1).** L'option C de la version précédente demandait à l'élève de
déclarer **fausse l'égalité imprimée deux lignes au-dessus** : aucun élève habitué aux QCM ne la
choisit, et la sonde était un 3-voies déguisé. La nouvelle C porte une heuristique réelle et
distincte de A.

### 6.2 `cp-r7b-ordre-restes` — l'ENGAGEMENT sur N1 (NOUVEAU)

```yaml
  - id: cp-r7b-ordre-restes
    rung: "R7b"
    habilete: raisonnement
    skill_code: maths_arithmetique
    tags: [checkpoint, formative, misconception_driven, maths_arithmetique, numeration, predict_commit]
    primary_misconception: mc.math.maths_arithmetique.numeration-restes-ordre-inverse
    item_source: original
    lesson_placement: in_R7b
```

**Stem.** « Les quatre divisions de $2025$ par $7$ ont donné les restes $2$, $2$, $6$, $5$, dans
cet ordre. **Prends position avant de lire la suite :** quelle est l'écriture de $2025$ en base
$7$ ? »

| choix | texte | modèle | valeur recalculée depuis CE modèle |
|---|---|---|---|
| **A ✔** | $\overline{5622}_{(7)}$ | — | $1715+294+14+2 = 2025$ ✓ |
| **B ✘** | $\overline{2265}_{(7)}$ | **N1** (ordre de sortie) | les restes écrits dans l'ordre où ils sont sortis ; vaut $686+98+42+5 = 831$ |
| **C ✘** | $\overline{5226}_{(7)}$ | **N1** (demi-renversement) | le dernier reste bien mis en tête, les trois autres laissés dans l'ordre de sortie ; vaut $1715+98+14+6 = 1833$ |
| **D ✘** | $\overline{2025}_{(7)}$ | **N2** | les restes ignorés, les chiffres décimaux gardés tels quels ; vaut $686+0+14+5 = 705$ |

*Contamination vérifiée : les trois modèles donnent $831$, $1833$ et $705$ — aucun ne produit
$2025$, et aucun chiffre hors-base ne permet de barrer une option à vue (§9.1-1).*

### 6.3 `cp-r7b-retenue` — la RUPTURE du report (N4)

```yaml
  - id: cp-r7b-retenue
    rung: "R7b"
    habilete: utilisation
    skill_code: maths_arithmetique
    tags: [checkpoint, formative, misconception_driven, maths_arithmetique, numeration, retenue]
    primary_misconception: mc.math.maths_arithmetique.numeration-retenue-a-dix
    item_source: clone_of_AR-48      # même forme, nombres frais
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
| **C ✘** | $\overline{251}_{(6)}$ | **N1** | le passage par la base 10 est juste ($68$), mais les restes sont lus dans l'ordre de sortie : $68 = 6\times11+2$, $11 = 6\times1+5$, $1 = 6\times0+1$ → $2,5,1$ au lieu de $1,5,2$. Vaut $72+30+1 = 103$. |
| **D ✘** | $\overline{22}_{(6)}$ | **N4** (retenue non reportée) | chaque colonne ramenée dans $\{0,\dots,5\}$ sans rien reporter : $20 \bmod 6 = 2$, $8 \bmod 6 = 2$. Vaut $14$. |

**Pourquoi une multiplication :** ici l'erreur de seuil produit une écriture **bien formée**
($\overline{100}_{(6)}$), donc **non barrable à vue** — c'est la seule façon de mesurer N4 sans
que l'élève l'élimine par inspection (§5.2, règle de conception corrigée).

---

## 7. Médias

**Une figure commandée, deux emplacements d'amélioration, aucun média de motion.**

1. **`numeration-cascade-2025-base7`** — **`type: structural-diagram`**, **`tool: svg+katex`**.
   *(Jamais `gemini` : structure exacte et étiquettes mathématiques — ADR 0017.)* La cascade des
   quatre divisions de E1, les restes encadrés, **et la flèche de bas en haut** qui assemble
   $\overline{5622}_{(7)}$. La notion porte déjà une cascade (`[[figure:euclide-cascade]]`) :
   **même grammaire visuelle, à réutiliser, pas à réinventer.**
   **Placement : APRÈS `cp-r7b-ordre-restes`** (son étage 3 donne la réponse).
   `stages` (**ordre AUTHORED, jamais improvisé**) :
   - *stage 1* — les quatre divisions écrites de haut en bas, restes non marqués ;
   - *stage 2* — les quatre restes encadrés et étiquetés $a_0, a_1, a_2, a_3$ : **chaque reste
     porte un poids**, et le premier porte $7^0$ ;
   - *stage 3* — la flèche remontante et l'écriture assemblée, avec la légende : *on lit de bas en
     haut parce que le premier reste est celui des unités*.
2. **Emplacement d'amélioration — le manipulable de base.** **`type: manipulable`**,
   **`tool: geogebra/desmos/falstad/phet`** : un curseur de base $b$ de 2 à 10, un entier fixe, et
   l'écriture qui se recompose sous les yeux. C'est **le meilleur remède possible à N2** (le
   nombre ne bouge pas, l'écriture bouge). **Dette déclarée, pas bloquante** : la rung tient sans
   lui (E5 fait le même travail en statique). À poser en **commentaire HTML d'auteur** — jamais en
   renvoi porteur. **→ §12 Q9.** *(La critique pédagogique enregistre son accord avec ce
   jugement : c'est le média qui rendrait le plus sur cette notion.)*
3. **Emplacement d'amélioration — l'accroche.** **`type: atmospheric-illustration`**,
   **`tool: gemini`** : dix doigts, un boulier, un cadran d'horloge — registre calme de la
   DESIGN-BIBLE. **Non porteur.**
4. **`type: motion` — décision explicite de NE PAS en commander** : **rien n'évolue dans le
   temps** dans cette rung. La seule chose qui a un *ordre* est la lecture des restes, et un
   étagement de figure la sert mieux qu'une animation, parce que l'élève contrôle le rythme.
   *Le silence serait un échec de case ; ceci est la justification « statique suffit ».*

---

## 8. Cahier des charges — content-author

### 8.1 L'ancre, exacte

**Un nouveau titre de niveau 2, `## R7b — Les systèmes de numération`**, inséré **après**
`[[figure:solutions-diophantiennes-reseau]]` (`lesson.md:595`) et son `---` (`:597`), **avant**
`## R8 — Pour t'entraîner` (`:599`). Un `---` ferme la nouvelle rung.
**Rien d'autre ne bouge dans la leçon — y compris R8, qui n'est PAS touché** (§10.3).

### 8.2 Ordre imposé des morceaux

1. Accroche + **promesse** (§5.0) → `[[checkpoint:cp-r7b-predict-ecriture]]`
2. **Bloc A** : E1 (divisions) → `[[checkpoint:cp-r7b-ordre-restes]]` → réponse + contrôle →
   **rupture N1 mise en scène** → `[[figure:numeration-cascade-2025-base7]]` → E2
3. **Bloc B** : E3 → E4 → `[[checkpoint:cp-r7b-retenue]]` → E5 (+ « Le piège à éviter »)
4. **Bloc C** : E6 (avec sa rupture) → E7 (avec sa rupture) → clôture (§10.1) →
   `[[exercise:r-numeration]]`

### 8.3 Voix et gabarits — ceux du fichier, pas d'autres

- **Chaque exemple travaillé ouvre par** « **Ce qu'on cherche et pourquoi ce geste :** » — gabarit
  maison, utilisé **treize** fois dans cette leçon (`lesson.md:65`, `:125`, `:195`, `:285`,
  `:323`, `:329`, `:375`, `:413`, `:467`, `:493`, `:513`, `:559`, `:573` — re-compté 2026-10-20).
- **Les pièges se nomment avec** « **Le piège à éviter :** » (`lesson.md:349`).
- **Les engagements écrits se formulent** « **prends position** » / « **Prédis, avant de lire la
  suite** » — précédents du fichier à `lesson.md:11`, `:301`, `:443`. **Obligatoire avant chaque
  piège** (E6, E7, et les trois QCM).
- **Registre `tu`/`on`**, jamais de passif détaché. Écrit pour être dit à voix haute.
- **Apostrophes ASCII dans le markdown** : la typographie française est produite au rendu par
  `remarkFrenchTypography`. **Ne jamais taper U+202F à la main dans `lesson.md`.**
- **Discipline des maths affichées** : toute dérivation de $\ge 2$ transformations passe en
  **bloc**, **une transformation par ligne**. Les chaînes `a = b = c = d` sont un échec de
  gabarit. **Registre : blocs narrés, pas de composant `Derivation`** — E6 et E7 sont des
  **argumentations** dont la prose intercalaire porte l'enseignement.
- **Notation** : $\overline{a_n\cdots a_0}_{(b)}$ **partout**, et **une seule phrase** sur la
  variante en exposant (§1). Jamais $(a_n\cdots a_0)_b$.
- **Annotation de raisonnement sur 100 % des étapes travaillées.** Une étape non annotée fait
  échouer la case. **Liste fermée des décisions à exposer nommément** :
  1. *pourquoi le zéro de $\overline{3204}_{(5)}$ n'est pas un blanc* (E2) ;
  2. *pourquoi la forme emboîtée est la même somme factorisée* (E2) ;
  3. *pourquoi la colonne déborde à $b$ et pas à dix* (E4) ;
  4. *pourquoi plus de chiffres gagne, et pourquoi on compare ensuite de gauche à droite* (E5) ;
  5. *pourquoi on recalcule le critère au lieu de le réciter* (E6) ;
  6. *pourquoi on invoque Gauss au lieu de « diviser par 3 »* (E7) ;
  7. *pourquoi on écrit les bornes des chiffres AVANT de résoudre* (E7, après la cassure).
  **Et dans `r-numeration` (§10.2), deux décisions de plus, dont une NON COUPABLE** :
  8. **non coupable — *pourquoi tester modulo 6 et modulo 8, et pas autre chose* : en base 7,
     $b-1 = 6$ et $b+1 = 8$ sont les deux modules que l'écriture donne GRATUITEMENT** — et c'est
     aussi pourquoi la question d) tombe juste (on vous a donné 6 et 8, pas 48) ;
  9. *pourquoi un tableau sur $x$ plutôt que de l'algèbre* en c) : six valeurs à tester, chacune
     forçant un seul $y$ — l'énumération est ici plus sûre qu'une manipulation.
  *(Pédagogie I3 : la liste fermée précédente ne nommait AUCUNE décision dans l'exemple le plus
  difficile de la rung, et l'ordre de coupe mettait la question d) en deuxième position — alors
  qu'elle portait le seul temps d'expert de l'exercice.)*

### 8.4 Longueur visée

**1 300 à 1 700 mots + les affichages** (un peu moins que la version précédente : E8 sort de la
prose). **Ordre de coupe si c'est trop long, du premier au dernier :** (1) le second chemin de E2
(la forme emboîtée **et** sa justification, ensemble), (2) le second cas de E6
($\overline{3405}_{(7)}$), (3) le contrôle croisé de E5 inter-bases. **Ne jamais couper :** la
rupture N1, la rupture N4 et son contrôle chiffré, la rupture E6, la rupture E7, la ligne de
contraintes de E7, la promesse de l'accroche.

### 8.5 Renvois vers les chapitres existants — la liste fermée

La rung **doit** citer, et **ne peut citer que** : « **chapitre 2** » (division euclidienne),
« **chapitre 3** » (congruences, et le critère par 9), « **chapitre 6** » (Gauss et son
corollaire). **Aucun renvoi vers un chapitre $\ge 8$**, et **aucun renvoi à « chapitre 10 » ou
« chapitre 11 »** : la rung ne se cite pas elle-même et ne cite pas R8. *C'est ce qui garde le
coût de renumérotation à zéro (§2.1).*

---

## 9. Cahier des charges — item-author : 12 items, AR-41 → AR-52

### 9.0 Le lot, vu de haut — taille et mix, tous deux honnêtes

- **Identifiants : AR-41 à AR-52** (le dernier existant est AR-40 ; `total_items: 40`,
  `items.yaml:2681`). **Rung : `R7b` pour les douze.**
- **TAILLE : 12, pas 15 — défaut du propriétaire appliqué.**
  `DECISIONS-EN-ATTENTE.md:2191-2196` : « *0 des 10 sujets SM vérifiés ne porte sur une écriture
  en base, pendant que la spec en prévoit 15 items (27 % du banc de la notion). La capacité est
  au cadre, donc elle s'enseigne ; la TAILLE est un arbitrage. **Défaut : un lot au plancher**
  (≈ 12, trois par modèle), l'effort libéré va aux items de la capacité 2.1.6 — celle dont le
  geste est attesté à la base 10 par bk-2024-r-x5.* » **Ce que fait ce lot, dit exactement :**
  trois items coupés (15 → 12) ; le bloc 2.1.6 passe de **4 items QCM à 3 items QCM**
  (AR-50, 51, 52) **plus l'exercice attempt-first `r-numeration`, quatre questions dont une
  terminale conceptuelle** — c'est là que l'effort libéré est allé, et c'est la forme que le
  cadre décrit pour cette capacité, pas un QCM de plus.
- **Plancher :** `floor: 3`, compté par la méthode du fichier (« *une misconception compte un item
  dès qu'au moins un de ses distracteurs la porte, une seule fois par item* »,
  `items.yaml:2657-2662`). **Les cinq modèles sont au-dessus ou au plancher** (§9.2).
  ⚠ **`numeration-retenue-a-dix` tombe EXACTEMENT au plancher (3 items : AR-47, 48, 49)** : marge
  nulle, comme les **dix** familles que `honest_state` nomme à ce statut
  (`items.yaml:2695-2718`, neuf au premier recompte + `congruence-lineaire-mal-resolue` au
  troisième). **Tout retrait d'item la casse.**
- **MIX `habilete` : le réel, imprimé à côté de la cible.**

  | | `application_directe` | `application_non_explicite` | `synthese` |
  |---|---|---|---|
  | **cible SM** (`maths-sm.yaml:58-61`) | 40 % | 40 % | 20 % |
  | **ce lot, réel** | **8 / 12 ≈ 67 %** | **3 / 12 = 25 %** | **1 / 12 ≈ 8 %** |

  **On n'atteint pas la cible et on ne force pas les tags.** *Raison structurelle, à écrire dans
  le commentaire d'items.yaml :* **neuf** des douze items servent 2.1.4 et 2.1.5 (convertir,
  poser, comparer), gestes **intrinsèquement de niveau 1** une fois la prose faite ; seule 2.1.6
  porte naturellement les niveaux 2-3, et la charge de niveau 3 est portée par **`r-numeration`**
  (quatre questions dont une conceptuelle terminale — la forme que le cadre décrit) plus les trois
  points d'arrêt en `raisonnement`. **Forcer 40/40/20 sur 12 items serait répéter le reproche que
  le fichier s'est déjà fait** (`items.yaml:2213-2217` : « *échantillon trop petit pour forcer ce
  ratio sans fausser un tag* »). **Et aucun mix de NOTION n'est calculable** (fait **k** : 8 items
  sur 40 portent le champ).
  *(C'est le point I2 de la critique de fidélité : la version du 2026-09-28 annonçait 6/6/3 =
  40/40/20 « exactement » en classant `non_explicite` des items dont le geste est démontré dans la
  rung. Six tags sont corrigés ici — voir le journal de révision.)*
- **Format :** `id`, `rung`, `habilete`, `difficulty_level`, `skill_code`, `tags`,
  `primary_misconception`, `stem`, `type: mcq`, `choices`, `correct_feedback`, `solution`.
- **`coverage_summary` : à RÉGÉNÉRER, jamais à éditer à la main** (`items.yaml:2656` : tableau
  généré contre `web/scripts/lib/couverture-compte.mjs`, gardé par
  `web/scripts/resume-couverture.mjs`).
- **Ordre des `id` = ordre des BLOCS de la rung** (2.1.4 → 2.1.5 → 2.1.6), **pas** ordre de
  difficulté — et **ce n'est monotone ni globalement ni à l'intérieur du dernier bloc** : la
  série est $2,3,3 \mid 3,4,5,\,2,3,4 \mid 5,3,4$ (les trois blocs du §9.3, §9.4 et §9.5, le
  deuxième réunissant la comparaison puis les opérations). *Dit explicitement, parce que c'est ce que
  demande pédagogie M4 : inoffensif si la banque est surfacée adaptativement, en dents de scie si
  une surface rend par `id`.* **Si une telle surface existe un jour, le remède est de trier le
  lot par `difficulty_level` à l'affichage** — pas de renuméroter, ce qui casserait la lecture par
  capacité.

### 9.1 La règle du chiffre hors-base — comment on traite la barrabilité

Un distracteur portant un chiffre $\ge b$ est **barrable à vue**. **Trois règles, item par
item :**

1. **Jamais** de chiffre $\ge b$ dans un distracteur dont le modèle cible est **autre chose**.
   *(Vérifié : aucun des douze items n'en contient hors du cas 2.)*
2. **Quand le modèle cible est le report** (N4), le chiffre hors-base est la **signature** de
   l'erreur. **L'item central du modèle est construit pour qu'il n'apparaisse PAS** : AR-48 et
   `cp-r7b-retenue` sont des **multiplications**, où l'erreur de seuil produit une écriture **bien
   formée** ($\overline{135}_{(6)}$, $\overline{100}_{(6)}$). AR-47 (addition) garde la version
   barrable, **volontairement et une seule fois** : y barrer $\overline{476}_{(5)}$ suppose de
   tenir la borne $a_i \le 4$, ce qui est **du savoir, pas une fuite** — et les deux autres
   distracteurs restent plausibles.
3. **Les écritures à chiffre de tête nul** ($\overline{0352}_{(8)}$, AR-41 D) ne sont pas
   barrables par la borne : elles ont la bonne VALEUR et violent la convention. C'est
   exactement la seconde face de N3, et le retour le dit en ces termes.

### 9.2 Deltas attendus — recalculés pour 12 items

*(Un item compte pour un modèle dès qu'un de ses distracteurs le porte.)*

| | avant | après | via |
|---|---|---|---|
| `total_items` | 40 | **52** | — |
| `numeration-restes-ordre-inverse` | — | **7** | AR-41, 42, 43, 44, 47, 48, 50 |
| `numeration-ecriture-prise-pour-le-nombre` | — | **6** | AR-41, 42, 43, 44, 45, 46 |
| `numeration-contraintes-sur-les-chiffres` | — | **5** | AR-41, 46, 49, 50, 52 |
| `numeration-retenue-a-dix` | — | **3** ⚠ marge nulle | AR-47, 48, 49 |
| `critere-divisibilite-mal-applique` | 4 | **6** | + AR-51, 52 |
| `reste-non-normalise` | 5 | **6** | + AR-51 |
| `ramp_coverage.R7b` | — | **12** | nouvelle clé |

**Aucun compte ne baisse. Aucun item existant n'est re-tagué, renuméroté ou déplacé.**
*(Dix familles siègent au plancher exact — `honest_state`, `items.yaml:2695-2718` : tout
déplacement en casse une.)*

### 9.3 Bloc 2.1.4 — écrire et revenir *(N1 ×3)*

**AR-41** · N1 · `application_directe` · `difficulty_level: 2` · tags `[numeration, base, division_euclidienne]`
**Stem.** « On écrit $N = 234$ en base $8$ par divisions successives : $234 = 8\times29+2$, puis
$29 = 8\times3+5$, puis $3 = 8\times0+3$. Quelle est l'écriture de $234$ en base $8$ ? »

| choix | texte | modèle | valeur recalculée depuis CE modèle |
|---|---|---|---|
| **A ✔** | $\overline{352}_{(8)}$ | — | $192+40+2 = 234$ ✓ |
| **B ✘** | $\overline{253}_{(8)}$ | **N1** | restes lus dans l'ordre de sortie ; vaut $128+40+3 = 171$ |
| **C ✘** | $\overline{234}_{(8)}$ | **N2** | « les chiffres ne changent pas, seule la base change » ; vaut $128+24+4 = 156$ |
| **D ✘** | $\overline{0352}_{(8)}$ | **N3** (chiffre de tête nul) | le quotient final $0$ gardé comme un chiffre. **La valeur est juste ; ce n'est pas une écriture** : le chiffre de tête est non nul, sinon $234$ aurait quatre chiffres en base 8. |

⚠ **Item refait (pédagogie B3 + I5).** La version du 2026-09-28 reprenait **mot pour mot** le
nombre, la base et les trois divisions de la rupture N1 de la prose ($100$ en base $6$), et son
distracteur N1 était **$\overline{442}_{(6)}$, la chaîne que la prose venait de barrer
publiquement** : l'item se répondait de mémoire. Son option D ($\overline{24}_{(6)}$) était en
outre **mal dérivée et mal taguée** — jeter la dernière division donne les restes $4$ et $4$,
donc $\overline{44}_{(6)}$, jamais $\overline{24}_{(6)}$ (qui est le quotient intermédiaire) ; un
élève la choisissant se serait vu annoncer « Modèle détecté : ordre des restes », **un faux
diagnostic**.

**AR-42** · N1 · `application_directe` · `difficulty_level: 3` · tags `[numeration, base, division_euclidienne]`
**Stem.** « Dans l'écriture de $N = 500$ en base $9$, quel est le **chiffre des unités** ? »
*(Vérité : $500 = 9\times55+5$, $55 = 9\times6+1$, $6 = 9\times0+6$, donc
$500 = \overline{615}_{(9)}$ ; contrôle $486+9+5 = 500$ ✓.)*

| choix | texte | modèle | pourquoi ce chiffre-là |
|---|---|---|---|
| **A ✔** | $5$ | — | le reste de la **première** division par 9 |
| **B ✘** | $6$ | **N1** | le **dernier** reste pris pour les unités (lecture de gauche à droite) |
| **C ✘** | $0$ | **N2** | « $500$ finit par $0$, donc son écriture aussi » — l'écriture décimale transportée telle quelle ; un $0$ final voudrait dire $9 \mid 500$, or $500 = 9\times55+5$ |
| **D ✘** | $1$ | **N1** | le reste de la **deuxième** division, c'est-à-dire le chiffre des neuvaines |

**AR-43** · N1 · `application_directe` · `difficulty_level: 3` · tags `[numeration, base, poids]`
**Stem.** « Que vaut $\overline{203}_{(5)}$ en base $10$ ? »

| choix | texte | modèle | valeur recalculée depuis CE modèle |
|---|---|---|---|
| **A ✔** | $53$ | — | $2\times25 + 0\times5 + 3 = 53$ |
| **B ✘** | $203$ | **N2** | l'écriture rendue telle quelle |
| **C ✘** | $77$ | **N1** | poids lus à l'envers : $2\times1 + 0\times5 + 3\times25$ |
| **D ✘** | $265$ | **N1** | exposants décalés d'un cran : $2\times125 + 0\times25 + 3\times5$ |

*Tag corrigé (fidélité I2) : `application_non_explicite` → `application_directe`. E2 travaille
exactement cette conversion, et deux fois.*

### 9.4 Bloc 2.1.5 — comparer, puis opérer *(N2 ×3, N4 ×3)*

**AR-44** · N2 · `application_directe` · `difficulty_level: 3` · tags `[numeration, base, comparaison]`
**Stem.** « Range dans l'ordre croissant ces trois écritures de la base $5$ :
$\overline{344}_{(5)}$, $\overline{412}_{(5)}$, $\overline{1203}_{(5)}$. »
*(Vérités : $\overline{344}_{(5)} = 75+20+4 = 99$ ; $\overline{412}_{(5)} = 100+5+2 = 107$ ;
$\overline{1203}_{(5)} = 125+50+0+3 = 178$.)*

| choix | texte | modèle | le chemin qui y mène |
|---|---|---|---|
| **A ✔** | $\overline{344} < \overline{412} < \overline{1203}$ | — | $99 < 107 < 178$ |
| **B ✘** | $\overline{1203} < \overline{344} < \overline{412}$ | **N2** (chiffre de tête) | chiffres de tête comparés sans aligner les longueurs : $1 < 3 < 4$ |
| **C ✘** | $\overline{1203} < \overline{412} < \overline{344}$ | **N2** (somme des chiffres) | sommes comparées : $6 < 7 < 11$ |
| **D ✘** | $\overline{412} < \overline{344} < \overline{1203}$ | **N1** | comparaison menée **depuis les unités** (poids lus à l'envers) : $\overline{214}_{(5)} = 59 < \overline{443}_{(5)} = 123 < \overline{3021}_{(5)} = 386$ |

⚠ **Item NEUF, et il porte la capacité « comparer **dans une base** » que le cadre nomme**
(fidélité I5 : elle était enseignée en prose et sondée nulle part). **Contamination nommée et
assumée :** la lecture décimale des trois chaînes ($344 < 412 < 1203$) **donne la bonne réponse**
— c'est le théorème du §4.2, et c'est précisément pourquoi la face « chaîne lue en base 10 » de N2
est sondée **inter-bases** par AR-45. Ici, les deux faces sondées (chiffre de tête, somme des
chiffres) **sont** diagnosticables en base unique.

**AR-45** · N2 · `application_non_explicite` · `difficulty_level: 4` · tags `[numeration, base, comparaison]`
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
y donnait **la bonne réponse**. Avec les nombres ci-dessus, **les quatre lectures fautives donnent
quatre ordres, tous faux** — y compris la lecture à poids inversés (N1), qui donne $B < A < C$,
**absent de la liste** *(contrôle : $\overline{11011}$ est un palindrome donc $A = 27$ inchangé,
$\overline{43}_{(5)} = 23$, $\overline{32}_{(9)} = 29$)*.

**AR-46** · N2 · `synthese` · `difficulty_level: 5` · tags `[numeration, base, encadrement]`
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

**AR-47** · N4 · `application_directe` · `difficulty_level: 2` · tags `[numeration, base, addition, retenue]`
**Stem.** « Effectue $\overline{342}_{(5)} + \overline{134}_{(5)}$, résultat en base $5$. »
*(Vérités : $\overline{342}_{(5)} = 75+20+2 = 97$, $\overline{134}_{(5)} = 25+15+4 = 44$, somme
$141$. En colonnes : $2+4 = 6 = 5+1$ → $1$, retenue $1$ ; $4+3+1 = 8 = 5+3$ → $3$, retenue $1$ ;
$3+1+1 = 5 = 5+0$ → $0$, retenue $1$ ; puis $1$. Donc $\overline{1031}_{(5)}$ ; contrôle
$125+0+15+1 = 141$ ✓.)*

| choix | texte | modèle | valeur recalculée depuis CE modèle |
|---|---|---|---|
| **A ✔** | $\overline{1031}_{(5)}$ | — | $141$ ✓ |
| **B ✘** | $\overline{476}_{(5)}$ | **N4** (seuil à 10) | $2+4 = 6 < 10$ donc « pas de retenue » → chiffre $6$ ; $4+3 = 7$ → chiffre $7$ ; $3+1 = 4$. **Écriture illégale : c'est la signature du modèle** (§9.1-2) |
| **C ✘** | $\overline{1301}_{(5)}$ | **N1** | le passage par la base 10 est juste ($141$), mais les restes sont lus dans l'ordre de sortie : $141 = 5\times28+1$, $28 = 5\times5+3$, $5 = 5\times1+0$, $1 = 5\times0+1$ → $1,3,0,1$ au lieu de $1,0,3,1$ ; vaut $125+75+0+1 = 201$ |
| **D ✘** | $\overline{421}_{(5)}$ | **N4** (retenue non reportée) | chaque colonne ramenée dans $\{0,\dots,4\}$ sans rien transmettre : $2+4 = 6 \to 1$, $4+3 = 7 \to 2$, $3+1 = 4$ ; vaut $100+10+1 = 111$ |

*(Nombres changés le 2026-10-20 : l'addition précédente ($\overline{243}_{(5)} + \overline{134}_{(5)}$)
partageait la chaîne « 243 » avec E3. Aucun écho de chaîne ne subsiste.)*

**AR-48** · N4 · `application_directe` · `difficulty_level: 3` · tags `[numeration, base, multiplication, retenue]`
**Stem.** « Effectue $\overline{45}_{(6)} \times \overline{3}_{(6)}$, résultat en base $6$. »
*(Vérités : $\overline{45}_{(6)} = 29$, $29\times3 = 87$ ; $87 = 2\times36+2\times6+3 =
\overline{223}_{(6)}$, contrôle $72+12+3 = 87$ ✓.)*

| choix | texte | modèle | valeur recalculée depuis CE modèle |
|---|---|---|---|
| **A ✔** | $\overline{223}_{(6)}$ | — | $87$ ✓ |
| **B ✘** | $\overline{135}_{(6)}$ | **N4** (seuil à 10) | $5\times3 = 15$ → écrire $5$, retenir $1$ ; $4\times3+1 = 13$ → écrire $3$, retenir $1$. **Écriture parfaitement légale — l'erreur est invisible à l'œil, il faut recalculer** ; vaut $36+18+5 = 59$ |
| **C ✘** | $\overline{322}_{(6)}$ | **N1** | $87$ converti, restes lus dans l'ordre de sortie ($3,2,2$ au lieu de $2,2,3$) ; vaut $108+12+2 = 122$ |
| **D ✘** | $\overline{1215}_{(6)}$ | **N4** (aucun report) | chaque produit de colonne écrit tel quel : $4\times3 = 12$ et $5\times3 = 15$, collés ; vaut $216+72+6+5 = 299$ |

**C'est l'item central de N4** (§9.1-2) : le distracteur cible est **non barrable**.
*Tag corrigé (fidélité I2) : `non_explicite` → `directe`. E4 pose une multiplication en base en
entier.*

**AR-49** · N4 · `application_directe` · `difficulty_level: 4` · tags `[numeration, base, retenue, mecanisme]`
**Stem.** « Dans une addition posée en base $b$, une colonne donne la somme $c$ (avec
$c \ge b$). Quelle est la règle **correcte** ? »

| choix | texte | modèle | pourquoi |
|---|---|---|---|
| **A ✔** | « On écrit le reste de $c$ dans la division euclidienne **par $b$**, et on reporte le quotient sur la colonne de gauche. » | — | la colonne voisine pèse exactement $b$ fois plus |
| **B ✘** | « On écrit le reste de $c$ modulo $10$, et on reporte le quotient par $10$. » | **N4** | le seuil de la base 10 gardé par automatisme |
| **C ✘** | « On écrit $c$ si $c < 10$, sinon $c-10$ avec une retenue de $1$. » | **N4** | la même chose, sous sa forme apprise par cœur à l'école primaire |
| **D ✘** | « La colonne déborde quand $c$ **dépasse** $b$ : on écrit $c-b$ dès que $c > b$. » | **N3** | décalage d'un cran : à $c = b$ exactement il faut déjà reporter (on écrit $0$, on retient $1$) — sinon $b$ devient un chiffre |

*Tag corrigé (fidélité I2) : `non_explicite` → `directe`. La règle est énoncée mot pour mot dans
la prose de E4 ; c'est un item de **mécanisme**, et c'est sa valeur — pas un item de niveau 2.*

### 9.5 Bloc 2.1.6 — utiliser l'écriture *(N3 + famille réutilisée)*

**AR-50** · N3 · `application_non_explicite` · `difficulty_level: 5` · tags `[numeration, base, gauss, chiffres]`
**Stem.** « Déterminer tous les couples de chiffres $(x,y)$ tels que
$\overline{xy}_{(9)} = \overline{yx}_{(7)}$. »
*(Vérités : $9x+y = 7y+x \Leftrightarrow 8x = 6y \Leftrightarrow 4x = 3y$. Contraintes :
$x,y \in \{0,\dots,6\}$ — chiffres des **deux** bases — avec $x \ne 0$ et $y \ne 0$. Gauss :
$3 \mid 4x$ et $\mathrm{PGCD}(3,4)=1$ donc $3 \mid x$, d'où $x \in \{3,6\}$ ;
$x=3 \Rightarrow y=4$ ✓, $x=6 \Rightarrow y=8$ ✗. Solution unique $(3,4)$,
$N = \overline{34}_{(9)} = 31 = \overline{43}_{(7)}$.)*

| choix | texte | modèle | le chemin qui y mène |
|---|---|---|---|
| **A ✔** | $(x,y) = (3,4)$ seulement, et $N = 31$ | — | $27+4 = 31$ et $28+3 = 31$ ✓ |
| **B ✘** | $(3,4)$ **et** $(6,8)$ | **N3** | la racine $y = 8$ conservée : $8$ n'est pas un chiffre de la base $7$ |
| **C ✘** | $(0,0)$ **et** $(3,4)$ | **N3** | $(0,0)$ vérifie bien $4x = 3y$ — c'est la condition « chiffre de tête non nul » qui l'écarte, et elle n'a pas été posée |
| **D ✘** | $(x,y) = (4,3)$ | **N1** | poids intervertis dans la mise en équation ($\overline{xy}_{(9)}$ lu $9y+x$) : on obtient $4y = 3x$, donc $(4,3)$. Contrôle : $\overline{43}_{(9)} = 39 \ne \overline{34}_{(7)} = 25$ |

**Non-duplication vérifiée :** E7 traite $\overline{xy}_{(7)} = \overline{yx}_{(5)}$, réponse
$(2,3)$, $N = 17$, et la racine piège y est $(4,6)$. **Bases différentes, coefficients différents
($3x = 2y$ contre $4x = 3y$), racine piège différente, réponse différente.** L'item ne pré-résout
pas l'exemple travaillé ; il en rejoue le geste — *et c'est pour cela qu'il est
`non_explicite` et non `synthese`* (fidélité I2 : un geste répété n'est pas du niveau 3).

**AR-51** · famille réutilisée · `application_directe` · `difficulty_level: 3` · tags `[numeration, base, divisibilite, congruences]`
**Stem.** « Soit $N = \overline{8523}_{(9)}$. Quel est le reste de la division euclidienne de $N$
par $8$ ? »
*(Vérités : $N = 8\times729 + 5\times81 + 2\times9 + 3 = 5832+405+18+3 = 6258$ ;
$6258 = 8\times782 + 2$. Par le critère : $b-1 = 8$, $S = 8+5+2+3 = 18 \equiv 2 \pmod 8$ ✓.)*

| choix | texte | modèle | le chemin qui y mène |
|---|---|---|---|
| **A ✔** | $2$ | — | $S = 18$, puis $18 = 8\times2+2$ |
| **B ✘** | $18$ | `reste-non-normalise` | la somme des chiffres rendue telle quelle, sans être ramenée dans $[0,8[$ |
| **C ✘** | $6$ | `critere-divisibilite-mal-applique` | la somme **alternée** employée — c'est le critère de $b+1 = 10$ : $T = 3-2+5-8 = -2 \equiv 6 \pmod 8$ |
| **D ✘** | $3$ | `critere-divisibilite-mal-applique` | le **chiffre des unités** lu : il donne le reste modulo $b = 9$ (contrôle : $6258 = 9\times695+3$ ✓), pas modulo $8$ |

⚠ **Nombres refaits (fidélité M3).** Sur la version précédente ($\overline{6482}_{(9)}$), le
distracteur $2$ était atteignable par **deux** chemins distincts — le chiffre des unités **et** la
somme alternée réduite modulo 10 ($-8 \equiv 2$) : le diagnostic était sous-déterminé et le retour
aurait nommé un modèle que l'élève n'avait pas. **Avec $\overline{8523}_{(9)}$, les quatre valeurs
sont séparées, chemin par chemin, et aucun chemin parasite ne tombe sur une option :** $S = 18$
(B), $T \bmod 8 = 6$ (C), chiffre des unités $= 3$ (D), $T \bmod 10 = 8$, $S \bmod 10 = 8$,
$S \bmod 9 = 0$ — **aucun de ces trois derniers n'est une option, et aucun ne vaut $2$** (donc
aucune contamination de la bonne réponse).

**AR-52** · famille réutilisée (+ N3) · `application_non_explicite` · `difficulty_level: 4` · tags `[numeration, base, divisibilite, chiffres]`
**Stem.** « Déterminer tous les chiffres $x$ de la base $9$ tels que $N = \overline{3\,x\,4}_{(9)}$
soit divisible par $8$. »
*(Vérités : $b-1 = 8$, $S = 3+x+4 = x+7 \equiv 0 \pmod 8 \Rightarrow x \equiv 1 \pmod 8$, et
$0 \le x \le 8$, donc $x = 1$. Contrôle : $\overline{314}_{(9)} = 243+9+4 = 256 = 8\times32$ ✓.)*

| choix | texte | modèle | le chemin qui y mène |
|---|---|---|---|
| **A ✔** | $x = 1$ seulement | — | $x \equiv 1 \pmod 8$ et $0 \le x \le 8$ |
| **B ✘** | $x = 1$ **et** $x = 9$ | **N3** | la seconde racine conservée : $9$ n'est pas un chiffre de la base $9$ |
| **C ✘** | $x = 7$ | `critere-divisibilite-mal-applique` | la somme **alternée** ($4-x+3 = 7-x \equiv 0$) — c'est le critère de $b+1 = 10$, pas de $8$. Contrôle : $\overline{374}_{(9)} = 243+63+4 = 310 = 8\times38+6$, non divisible |
| **D ✘** | $x = 2$ | `critere-divisibilite-mal-applique` | le bon critère au **mauvais module** : $x+7 \equiv 0 \pmod 9$ au lieu de $\pmod 8$. Contrôle : $\overline{324}_{(9)} = 243+18+4 = 265 = 8\times33+1$ — non divisible |

### 9.6 Le registre des modèles — aucune ligne non revendiquée

| modèle | rupture MISE EN SCÈNE @ rung | engagement | items |
|---|---|---|---|
| **N1** `numeration-restes-ordre-inverse` | **bloc A** — voix → test sur $100$ base $6$ → cassure sur $170 \ne 100$ (§5.1) | `cp-r7b-ordre-restes` | AR-41, 42, 43 (+ 44, 47, 48, 50) |
| **N2** `numeration-ecriture-prise-pour-le-nombre` | **accroche** (engagement avant toute explication) + **E5** (une chaîne, deux nombres) | `cp-r7b-predict-ecriture` | AR-44, 45, 46 (+ 41, 42, 43) |
| **N3** `numeration-contraintes-sur-les-chiffres` | **E7** — le couple $(4,6)$ **passe l'équation** ($34 = 34$) et désigne une écriture qui n'existe pas (§5.3) | « prends position » écrit, avant la cassure | AR-50, 52 (+ 41, 46, 49) |
| **N4** `numeration-retenue-a-dix` | **bloc B** — « pourquoi $7$ et pas $10$ » + le contrôle négatif chiffré (§5.2) | `cp-r7b-retenue` | AR-47, 48, 49 ⚠ marge nulle |
| `critere-divisibilite-mal-applique` | **E6** — le modèle « la somme des chiffres, c'est LE critère » prédit $7$ modulo 8, la vérité est $1$ (§5.3) | « prends position » écrit, avant la cassure | AR-51, 52 (+ les 4 existants) |

**Cinq lignes, cinq ruptures RÉELLEMENT mises en scène, cinq engagements.** *(La version du
2026-09-28 revendiquait une rupture pour N3 que E7 ne mettait pas en scène — ligne corrigée en
même temps que E7, pédagogie B1.)*

---

## 10. La clôture, et l'exercice attempt-first

### 10.1 La clôture de R7b — le gabarit natif, plus une demande de travail

**La leçon n'a AUCUN « Récapitulatif express »** (fait **m**). **Cette spec n'en crée pas** —
inventer ici une convention de corpus déborderait la rung. **À la place**, un bloc « **Le piège à
éviter :** » (`lesson.md:349`) en **quatre phrases**, une par modèle, chacune formulée comme un
**geste de contrôle** :

1. *Les restes sortent des unités vers la tête — si tu as un doute, recalcule la valeur de ton
   écriture et compare-la à $N$.* (**N1**)
2. *Une suite de chiffres n'est un nombre qu'une fois la base appliquée ; dans une même base,
   compte d'abord les chiffres, et seulement ensuite compare-les de gauche à droite.* (**N2**)
3. *Avant de résoudre une équation sur des chiffres, écris leurs bornes : $0 \le a_i \le b-1$,
   chiffre de tête non nul, et l'intersection si deux bases sont en jeu.* (**N3**)
4. *La colonne déborde à $b$, jamais à dix — et avant d'écrire un critère, redemande-toi si la
   base est congrue à $+1$ ou à $-1$.* (**N4** + la famille réutilisée)

**Puis deux phrases qui ne coûtent rien et qui ferment la rung (pédagogie M7, fidélité I3) :**
- **une demande de travail** : *« Écris $950$ en base $6$, puis contrôle ta réponse en recalculant
  sa valeur. »* **Ne pas imprimer la réponse** (elle est, pour l'auteur seulement :
  $950 = 6\times158+2$, $158 = 6\times26+2$, $26 = 6\times4+2$, $4 = 6\times0+4$, donc
  $\overline{4222}_{(6)}$ ; contrôle $864+72+12+2 = 950$ ✓). Le contrôle se referme sur
  lui-même : l'élève n'a besoin de personne pour savoir s'il a juste.
- **l'ancrage réel, factuel et singulier** : *« Ce geste — fabriquer un critère de divisibilité à
  partir de l'écriture d'un nombre — n'est pas un exercice d'école : un exercice national
  vérifié le fait, à la base 10, en écrivant $m = 10q + r$ pour construire un critère puis
  résoudre un système de congruences. Tu le trouveras dans « S'entraîner ». »* **Aucune
  fréquence affirmée, aucun nombre de la copie recopié** (`bk-2024-r-x5` ; fait **c′**).

### 10.2 `r-numeration` — l'exercice attempt-first qui porte le sommet de la rung

⚠ **Changement majeur (pédagogie B2 + fidélité I1).** La version du 2026-09-28 interdisait tout
marqueur `[[exercise:…]]` au motif que « *fabriquer un sujet type bac de numération serait
inventer une source* ». **Cela confondait deux choses :** *inventer une source* (interdit, et ça
reste interdit — pas de onzième entrée dans `bank.yaml`) et *livrer un exercice original
attempt-first non sourcé* (**convention de la maison, déjà pratiquée dans ce fichier même**) :
`exercises.yaml:143-151` porte `r-variation`, exercice de forme examen **entièrement inventé**,
`sourcing.status: not-applicable`, note « *Variation construite exprès … n'a pas vocation à être
un sujet réel* », marqueur présent dans la leçon aujourd'hui. **Conséquence de l'ancienne
position :** l'unique objet de forme examen de la rung (l'ex-E8) était imprimé **avec sa solution
complète** sous son énoncé — « *une solution imprimée au sommet est un échec template-v2* »
(`exercises.yaml:4`).

**Ce qui est demandé :**
- **une entrée neuve dans `content/maths/arithmetique/exercises.yaml`**, `id: r-numeration`,
  `sourcing: { status: not-applicable, note: "Forme attendue de l'idiome SM, construite exprès —
  aucune annale vérifiée de numération dans bank.yaml (0/10). N'a pas vocation à être un sujet
  réel." }` ;
- **le marqueur `[[exercise:r-numeration]]` à la fin de R7b**, après la clôture ;
- **schéma du fichier** : `intro`, puis `questions` avec `stem` + `reasoning` (+ `steps` si
  utile). **Le raisonnement n'est servi qu'APRÈS l'engagement de l'élève** — c'est tout l'objet du
  composant ;
- **l'intro dit ce que c'est** : un exercice construit exprès, de la forme que prennent les
  questions de numération, **jamais présenté comme « un sujet de bac »** ;
- **le sommet SOURCÉ de la notion reste `r-bac` (2019, vérifié)** : `r-numeration` ne le remplace
  pas, ne le concurrence pas, et ne change rien à la case sourcing du template.

**L'énoncé, tel quel, et tous ses contrôles :**

> *Soit $N = \overline{x\,y\,x}_{(7)}$, où $x$ et $y$ sont des chiffres de la base 7 et $x \neq 0$.*
> *a) Montrer que $N = 50x + 7y$.*
> *b) Montrer que $N \equiv 2x+y \pmod 6$ et $N \equiv 2x-y \pmod 8$.*
> *c) Déterminer tous les couples $(x,y)$ pour lesquels $N$ est divisible à la fois par 6 et par 8.*
> *d) Ces $N$ sont-ils divisibles par 48 ?*

**a)** $N = x\cdot7^2 + y\cdot7 + x = 49x + 7y + x = 50x + 7y$ ✓.

**b)** Par les deux critères de E6 : modulo $6 = b-1$, $N \equiv x+y+x = 2x+y$ ; modulo
$8 = b+1$, $N \equiv a_0-a_1+a_2 = x-y+x = 2x-y$. *Contrôle par l'autre chemin, à écrire :*
$50 \equiv 2 \pmod 6$ et $7 \equiv 1 \pmod 6$ ✓ ; $50 \equiv 2 \pmod 8$ et
$7 \equiv -1 \pmod 8$ ✓. **Les deux lectures tombent sur la même chose — c'est le contrôle croisé
que la leçon pratique déjà.**

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
$\mathrm{PPCM}(6,8) = 24$ — et en effet $192 = 24\times8$ et $264 = 24\times11$. *La condition que
le chapitre 6 a nommée n'était pas décorative : voilà le contre-exemple, sorti d'un problème de
numération.* **Question NON COUPABLE** (elle porte le temps d'expert de l'exercice), et son
`reasoning` porte la décision nº 8 du §8.3 (*pourquoi 6 et 8 : parce que la base les donne
gratuitement*).

### 10.3 R8 — zéro édition

**R8 n'est pas touché.** La version précédente y ajoutait une clause (« la numération n'intervient
pas dans le sujet 2019 ») : honnête, mais elle atterrissait comme une **déflation** juste après la
rung, et son travail d'inoculation est mieux fait, positivement, par l'ancrage de la clôture
(§10.1). **Les trois renvois de `lesson.md:601` (chapitres 5, 3, 7) restent justes** (§2.1).
**La note d'auteur** (commentaire HTML, retiré au rendu) consignant « aucune annale vérifiée de
numération ; `r-numeration` est non sourcé par construction ; la demande de sourçage est ouverte »
est placée **au bas de R7b**, pas dans R8. ⚠ **Si elle introduit un mot neuf, le lexique d'auteur
gardé par `dom-truth` doit être mis à jour dans le même commit.**

---

## 11. Ce qu'il ne faut PAS faire

1. **Ne renuméroter aucune rung.** `## R7b`, suffixe lettré, exactement comme R6b. R0…R8 gardent
   leurs codes.
2. **Ne toucher à aucun chapitre existant.** En particulier : **ne pas « améliorer » le critère
   par 9 de R2** (`lesson.md:141-157`) pour le généraliser — c'est précisément ce que R7b fait, et
   le dédoubler affaiblirait les deux.
3. **Mettre à jour le garde-fou de périmètre de `checkpoints.yaml:52-55`** en y ajoutant
   « systèmes de numération (écriture en base, opérations, comparaison, critères par $b-1$ et
   $b+1$) ». **Édition obligatoire** : sans elle, les trois points d'arrêt neufs contredisent
   l'en-tête de leur propre fichier.
4. **Lancer `cd web && node scripts/carte-chapitres.mjs --porte`, LIRE le rouge, puis
   `--sceller`** (§2.1). **Ne pas sceller avant d'avoir lu la liste de renvois imprimée.**
5. **Ne pas éditer `coverage_summary` à la main** : il est **généré** (`items.yaml:2656`). Le
   régénérer et lire la sortie.
6. **Ne re-taguer, ne renuméroter, ne déplacer aucun item existant.** Dix familles siègent
   exactement au plancher (`items.yaml:2695-2718`) — et `numeration-retenue-a-dix` les rejoint.
7. **Ne pas ajouter d'entrée à `bank.yaml`.** « Introuvable = absent, jamais inventé »
   (`:27-28`). Pas de onzième entrée tant qu'un onzième sujet vérifié n'existe pas. *(Ajouter
   `r-numeration` à `exercises.yaml` n'est pas une exception à cette règle : ce n'est pas une
   source, c'est un exercice original déclaré comme tel — §10.2.)*
8. **Ne jamais présenter `r-numeration`, E7 ou leurs formes comme « un sujet de bac ».** `sourcing`
   ne peut pas valoir `sourced`.
9. **Ne pas écrire une seule ligne de prose sur les chiffres $\ge 10$** (§3.1-2), ni la forme
   $(a_n\cdots a_0)_b$ (§1).
10. **Ne pas corriger les notes de portée périmées signalées ailleurs** — en particulier les
    références devenues fausses signalées par le cadre lui-même (`maths-sm.yaml:622-627`).
    **Hors périmètre ; à router, pas à absorber.**
11. **Ne pas promouvoir le cadre.** `maths-sm.yaml` reste PROPOSITION ; la vérification de sources
    écarte le risque d'hallucination, elle ne vaut pas lecture du texte officiel (§0, §13).

---

## 12. Questions au propriétaire — avec le défaut pris en l'absence de réponse

| # | question | défaut si pas de réponse |
|---|---|---|
| **Q1** | **La convention d'écriture.** (a) indice ou exposant ? (b) Pour $b > 10$, chiffres en lettres (A = 10…) ou entre parenthèses ? | **(a) TRANCHÉ par cette révision : $\overline{abc}_{(b)}$ (indice parenthésé), + une phrase unique sur la variante en exposant** — les sources marocaines divergent (1 exposant vu / 1 indice vu / 1 indéterminable) et la forme à parenthèses autour des chiffres est **attestée nulle part**. **(b) TOUJOURS NON TRANCHÉ, donc AUCUNE base > 10 et AUCUNE ligne de prose sur les chiffres $\ge 10$** (§3.1-2). |
| **Q2** | **La capacité 2.1.6 s'étend-elle aux « algorithmes » en base 2** (binaire ↔ hexadécimal, complément à deux, représentation machine) ? | **Non.** La base 2 n'apparaît que comme une base parmi d'autres. **À confirmer** : c'est la seule zone où un manuel marocain pourrait aller plus loin que le cadre. |
| **Q3** | **Découper N3 et N4 ?** | **Un modèle chacun, deux manifestations** — précédent du fichier (`reste-non-normalise` en réunit quatre). Les découper doublerait la livraison (≥3 items chacun) et casserait le plafond de taille du §9.0. |
| **Q4** | **Élargir `critere-divisibilite-mal-applique` à la base générique**, ou créer `numeration-critere-b-plus-un` ? | **Élargir** (§4.5) : une ligne de `description`, une de `contradicts_principle`, **aucun re-tagage**. Si l'owner veut la famille séparée, ce sont AR-51/52 qui basculent — et elle serait **sous le plancher à 2 items**, donc il faudrait un treizième item. |
| **Q5** | **Le placement : R7b (chapitre 10) ou R2b (chapitre 4) ?** | **R7b.** Quatre raisons pédagogiques au §2.2 ; le coût — 0 renvoi contre 89 — confirme sans décider. |
| **Q6** | **DEMANDE DE SOURCES.** Existe-t-il un sujet national SM vérifiable portant sur une **écriture en base** ? | **Sans source, la rung ne porte aucun sommet sourcé propre** — et elle n'en a pas besoin : le sommet sourcé de la notion reste `r-bac` (2019), et `r-numeration` est un exercice original **déclaré** (§10.2). Une seule copie sourcée ferait mieux, et changerait le statut de la rung. **Le geste de 2.1.6 est, lui, déjà attesté à $b=10$** (fait **c′**). |
| **Q7** | **E7 et `r-numeration` sont-ils du bon calibre ?** | **Oui.** E7 fait travailler la contrainte en se faisant d'abord prendre ; `r-numeration` enchaîne quatre questions dont une de coprimalité. Ordre de coupe au §8.4 — **la question d) n'est plus coupable** (pédagogie I3). |
| **Q8** | **Trois points d'arrêt dans une seule rung** (la leçon en a six pour dix chapitres) : trop ? | **Non — un par modèle non confrontable autrement.** Si c'est trop, couper **`cp-r7b-retenue`** en premier (N4 garde trois items et une rupture chiffrée en prose). **`cp-r7b-predict-ecriture` et `cp-r7b-ordre-restes` ne sont pas coupables** : sans eux, la rung n'a pas d'engagement sur ses deux modèles racines. *(Priorité INVERSÉE par cette révision : la version précédente nommait `cp-r7b-critere` comme première coupe, alors que le vrai manque était l'absence d'engagement sur N1.)* |
| **Q9** | **Le manipulable « curseur de base »** (§7.2) : à construire, à embarquer, ou à laisser en dette ? | **Dette déclarée, emplacement d'amélioration en commentaire.** La rung tient sans lui. *Mais c'est, à mon jugement d'enseignement, le média qui rendrait le plus sur cette notion : N2 est un modèle qu'on casse en manipulant, pas en lisant* — jugement partagé par la critique pédagogique. |
| **Q10** | **NOUVEAU — le niveau d'enseignement.** La vérification de sources ne tranche pas 1ère Bac SM / 2ème Bac SM (le même résumé circule aux deux niveaux, numération incluse). | **On enseigne la rung en 2ème Bac SM**, parce que c'est l'épreuve que ce produit prépare et que le cadre d'examen national liste la capacité. **Si l'owner sait que le chapitre est fait en 1ère année**, la rung reste utile (révision) mais sa place dans la progression change — et la phrase de filière éventuelle est à écrire par lui, pas par moi. |
| **Q11** | **NOUVEAU — le mix `habilete` du lot (67/25/8 contre 40/40/20).** Imprimer l'écart, ou redessiner 3-4 items pour le réduire ? | **Imprimer l'écart** (§9.0), précédent du fichier à `items.yaml:2213-2217`. Le réduire honnêtement coûterait 2 à 4 items de plus, **ce que le défaut « lot au plancher » du §37 écarte**. Si l'owner préfère le ratio à la taille, le chemin est nommé : convertir AR-42 et AR-43 en questions de forme 2.1.6 (« l'écriture de $N$ en base 8 finit par $0$ : qu'en déduis-tu ? ») et ajouter un treizième item de synthèse. |

---

## 13. Ce que je n'ai pas pu vérifier — dit, pas maquillé

- **Aucune commande n'a été exécutée, aucune porte du dépôt n'a été lancée** — ni
  `carte-chapitres`, ni `resume-couverture`, ni `validate-content`, ni `dom-truth`. Les faits du
  §0 viennent de lectures et de `Grep` (re-mesurés le 2026-10-20 dans `/home/user/BAC-g`).
- **Le cadre reste non autoritatif.** La vérification du 2026-09-28 écarte le risque « la source
  unique a halluciné un chapitre entier » (sept sources, trois lues en page ou en texte brut) mais
  **n'a lu aucun texte officiel MEN/CNEEO** : le PDF du cadre est un scan sans couche texte, 0
  texte récupéré, re-testé le même jour. Les **libellés verbatim** 2.1.4/2.1.5/2.1.6 restent
  adossés à `pdfmath` seul. **Le découpage 1ère/2ème Bac SM n'est pas établi** (§12 Q10).
- **La notation est tranchée par PRÉVALENCE DE SOURCES, pas par un texte officiel.** Les sources
  marocaines divergent, et notre choix (indice parenthésé) est l'une des deux formes vues. **Le
  coût d'un changement ultérieur est connu et borné** : il porte sur un symbole unique, dans une
  seule rung, et la phrase sur la variante en exposant rend la lecture robuste des deux côtés.
- **Statut des formes d'énoncé — à présent DIFFÉRENCIÉ (fidélité I3).**
  - *Attesté, sur copie vérifiée et barémée, à $b = 10$ :* **fabriquer un critère de divisibilité
    à partir de l'écriture positionnelle, puis s'en servir** (`bk-2024-r-x5`). E6 et
    `r-numeration` b)-c) sont la généralisation d'un geste attesté.
  - *Non attesté :* la **généralisation à $b \ne 10$**, la **conversion de base** (E1, E2,
    AR-41…43) et la **détermination de chiffres par double écriture** (E7, AR-50). Ce sont **des
    formes ATTENDUES, pas des formes VÉRIFIÉES** — ma reconstruction de l'idiome SM, confortée par
    le fait que le matériel marocain enseigne explicitement ces gestes
    (`verification-numeration-2026-09-28.md` §1.1, sources B, D, F).
- **Le poids d'examen de la numération est INCONNU**, et l'observation 0/10 ne le donne pas
  (§1). **La prose commandée ici ne fait aucune affirmation de fréquence.**
- **Je n'ai pas mesuré ce que les 40 items existants encodent réellement.** Les deltas du §9.2
  supposent que le compteur généré compte comme il dit ; **c'est à la régénération de le dire.**
- **Je n'ai pas vérifié le rendu.** Les écritures $\overline{\cdots}_{(b)}$ sont fréquentes et
  longues ; **rien ne prouve ici qu'elles ne débordent pas** sur petit écran (mode de défaut
  d'ADR 0040). **À mesurer après écriture, pas à supposer.** *(Risque légèrement accru par cette
  révision : AR-44 et AR-47 portent des écritures à quatre chiffres dans les options.)*
- **Le plancher de 3 est un plancher de CONSTRUCTION, pas une preuve de diagnostic.** **Les quatre
  modèles neufs du §4 sont ma lecture didactique, adossée à zéro donnée d'usage et à zéro copie
  d'élève marocain.** C'est l'expérience d'enseignement du propriétaire qui tranche ça, et elle
  n'est pas remplaçable.
- **Les deux critiques ont recalculé tous les nombres de la version du 2026-09-28 et n'ont trouvé
  qu'une seule erreur dérivée** (pédagogie I1, corrigée au §5.2). **Les nombres NEUFS ou MODIFIÉS
  par cette révision n'ont été vérifiés que par moi, deux fois, à la main** : ils sont listés dans
  le journal ci-dessous pour être re-vérifiés par le prochain lecteur.

---

## Revision log 2026-10-20

Révision de la PROPOSITION du 2026-09-28 contre `docs/audits/critiques/numeration-pedagogie.md`
et `docs/audits/critiques/numeration-fidelite.md` (verdicts : BUILD AFTER FIXES ; tous leurs
chiffres vérifiés corrects), plus `docs/cadre/sources/verification-numeration-2026-09-28.md`,
le défaut du propriétaire sur la TAILLE du lot (`DECISIONS-EN-ATTENTE.md` §37) et l'entrée de
vague G1 de `DETTE-CADRE.md`. **Les numéros de ligne des deux critiques renvoyaient à la version
du 2026-09-28 ; toutes les cibles ont été re-localisées.**

### Fondation et cadre

| source | finding | décision | où |
|---|---|---|---|
| fidélité | **B1** (la ligne de cadre existe-t-elle ?) | **APPLIQUÉ — la porte a répondu OUI pour le sujet.** L'avertissement de fondation est réécrit : sept sources marocaines indépendantes, dont une publiée dans le chapitre Arithmétique du cours 2ème BAC SM A BIOF. Restent ouverts et NON bloquants : les libellés verbatim (source unique) et le niveau 1ère/2ème Bac (→ Q10). | §0 (en-tête), §13, Q10 |
| fidélité | **B2** (notation non vérifiée, cuite dans tous les artefacts) | **APPLIQUÉ et TRANCHÉ.** $\overline{a_n\cdots a_0}_{(b)}$ partout + **une seule** phrase sur la variante en exposant ; la forme à parenthèses autour des chiffres est **interdite** (attestée nulle part côté marocain). Consignation dans un registre de notation **routée**, pas faite ici. | §1, §8.3, Q1(a) |
| fidélité | **I4** (15 items pour une capacité à 0/10, observation jamais écrite) | **APPLIQUÉ.** L'observation 0/10 est écrite au §1 ; une ligne `_observation_examens` est **proposée et routée** (édition de cadre, pas ma main) ; la taille passe à **12** selon le défaut du propriétaire. | §1, §9.0 |
| fidélité | **I3** (« aucune annale » est vrai du mot, faux du geste) | **APPLIQUÉ en entier.** Nouveau fait **c′** (`bk-2024-r-x5`, sourcé, barémé, critère construit depuis $m = 10q+r$) ; §13 scinde le statut en *geste attesté à $b=10$* / *généralisation et conversion non attestées* ; l'ancrage de clôture remplace la clause déflationniste de R8. | fait **c′**, §10.1, §10.3, §13 |
| fidélité | **M1** (libellé de 2.1.6 tronqué dans des guillemets) | **APPLIQUÉ.** Libellé complet restitué. | §3 |

### Pédagogie — les trois BLOQUANTS

| finding | décision | où |
|---|---|---|
| **B1** — le registre revendiquait pour N3 une rupture que E7 ne mettait pas en scène | **APPLIQUÉ.** E7 est **réordonné** : on résout d'abord sans borner, le couple $(4,6)$ **passe l'équation** ($7\times4+6 = 34 = 5\times6+4$) et désigne $\overline{64}_{(5)}$, **une écriture qui n'existe pas** ; la ligne de contraintes arrive **après**, comme la décision d'expert que la cassure vient de justifier. Les deux acquis (rupture + geste) sont conservés. | §5.3, §9.6 |
| **B2** — aucun engagement en haut de rampe, et la solution de E8 imprimée | **APPLIQUÉ par la voie de la fidélité I1** : E8 **sort de la prose** et devient l'exercice attempt-first `r-numeration` (`exercises.yaml`, `status: not-applicable`), marqueur à la fin de R7b. L'échafaudage fond maintenant dans l'artefact : 3 QCM → 2 « prends position » écrits → 1 essai complet. | §10.2, §5.4 |
| **B3** — deux items rejouaient un exemple travaillé | **APPLIQUÉ.** AR-41 est **refait** avec des nombres frais ($234$, base 8) et ne contient plus la chaîne barrée par la prose ; l'ancien AR-45 ($\overline{101}_{(8)}$, dont la clé et un distracteur étaient imprimés dans E5) est **coupé** — la réduction de taille l'a absorbé. | §9.3, §5 (ledger) |

### Pédagogie — IMPORTANT et MINOR

| finding | décision | où |
|---|---|---|
| **I1** — la parenthèse « E4 mal conduite à 10 donnerait $\overline{15}\ldots$ » est fausse | **APPLIQUÉ.** Recalculé : le seuil 10 donne $\overline{170}$, et $7$ n'est pas un chiffre de la base 7 → l'erreur **se voit**. La règle de conception est réécrite sur son vrai critère (visible tant que la colonne produit un chiffre $\ge b$ ; invisible dès qu'elle atteint 10, ce qui arrive surtout en multiplication). La décision « sonder N4 par une multiplication » **survit**, mieux justifiée. | §5.2 |
| **I2** — N1, modèle signature, sans engagement | **APPLIQUÉ.** Nouveau point d'arrêt **`cp-r7b-ordre-restes`** entre les divisions de E1 et l'écriture assemblée ; pour qu'il ne soit pas contaminé, **l'accroche n'imprime plus la forme en base 7** (elle garde la forme binaire). `cp-r7b-critere` est retiré en échange : total inchangé à trois. | §5.0, §5.1, §6.2, Q8 |
| **I3** — aucune décision d'expert nommée dans l'exemple le plus dur | **APPLIQUÉ.** La liste fermée gagne deux décisions situées dans `r-numeration`, dont **« pourquoi modulo 6 et modulo 8 » marquée NON COUPABLE** ; la question d) sort de l'ordre de coupe. | §8.3, §8.4, §10.2 |
| **I4** — deux règles livrées sans mécanisme | **APPLIQUÉ.** La forme emboîtée est **justifiée** en une ligne (factorisation de la base) **et dé-nommée** (fidélité M2) ; la comparaison de gauche à droite reçoit sa raison (la position de tête pèse au moins $b^k$, tout le reste au plus $b^k-1$) ; et le modèle correspondant est **armé** (§4.6-1). | §5.1, §5.2, §4.2 |
| **I5** — AR-41 distracteur D mal dérivé et mal tagué | **APPLIQUÉ.** D devient $\overline{0352}_{(8)}$, **chiffre de tête nul**, face déclarée de N3 — bonne valeur, convention violée, retour exact. | §9.3 |
| **I6** — l'accroche ne promet rien, au placement où « pourquoi maintenant ? » est le plus vif | **APPLIQUÉ.** Une phrase de **promesse** obligatoire (fabriquer un critère dans n'importe quelle base ; retrouver un chiffre qu'un énoncé ne donne pas), sans aucune mention d'examen ; et l'ancrage réel en clôture au lieu de la clause déflationniste de R8. | §5.0, §10.1, §10.3 |
| **M1** — option C du QCM d'accroche jamais choisie | **APPLIQUÉ.** C devient « une base plus petite donne un nombre plus petit » (heuristique réelle, distincte de A). | §6.1 |
| **M2** — la « surprise » de E5 en base unique n'en est pas une | **APPLIQUÉ, en partie.** Le cadrage « surprise » tombe ; la règle garde sa place (c'est une capacité du cadre) avec sa raison ; **le temps inter-bases gagne de la place** et la comparaison en base unique est désormais **sondée** (AR-44). | §5.2, §9.4 |
| **M3** — deux blocs de checkpoint sans `skill_code` ni `tags` | **APPLIQUÉ.** Les trois blocs portent les deux champs. | §6 |
| **M4** — l'ordre des `id` n'est pas celui de la difficulté | **APPLIQUÉ comme déclaration explicite.** Les `id` suivent l'ordre des **blocs** ; la difficulté ne décroît pas **à l'intérieur** d'un bloc et repart plus bas au changement de bloc. Dit, pas caché. | §9.0 |
| **M5** — distracteur « réflexe binaire » discutable | **SANS OBJET** : l'item est coupé (B3 + taille). Et E5 n'utilise plus $\overline{101}$ mais $\overline{201}$, ce qui écarte le même réflexe de la prose. | §5.2 |
| **M6** — accord sur la dette de manipulable | **ENREGISTRÉ**, aucune action. | §7.2, Q9 |
| **M7** — la clôture n'exige aucune récupération | **APPLIQUÉ.** Une demande de travail (« écris $950$ en base $6$ et contrôle »), **réponse non imprimée**. | §10.1 |

### Fidélité — IMPORTANT et MINOR restants

| finding | décision | où |
|---|---|---|
| **I1** — zéro pratique de forme examen, et le motif ne tient pas | **APPLIQUÉ** (voir pédagogie B2) : `r-numeration` dans `exercises.yaml`, `status: not-applicable`, marqueur en fin de R7b ; `bank.yaml` **intouché** ; le sommet sourcé de la notion reste `r-bac`. | §10.2, §11.7 |
| **I2** — le 40/40/20 atteint par étiquetage | **APPLIQUÉ en entier.** Six tags corrigés (AR-43, 48, 49, 51 → `directe` ; AR-50, 52 → `non_explicite`), le **mix réel 8/3/1 ≈ 67/25/8 est imprimé à côté de la cible**, avec sa cause structurelle, et le niveau 3 est porté par `r-numeration` et les trois QCM `raisonnement`. **Aucun tag n'est forcé.** Le chemin pour réduire l'écart est écrit pour l'owner (Q11). | §9.0, Q11 |
| **I5** — « comparer dans une base » enseigné, jamais évalué | **APPLIQUÉ par la première branche** (item neuf en base unique) **et affiné** : la découverte du §4.2 est reformulée — c'est la face « chaîne lue en base 10 » qui exige l'inter-bases ; les faces « chiffre de tête » et « somme des chiffres » sont diagnosticables en base unique, et AR-44 les porte. Le modèle laissé non armé au §4.6-1 est, du même coup, **armé comme face de N2**. | §4.2, §4.6, §9.4 |
| **M2** — « Horner » hors lexique | **APPLIQUÉ** : la forme emboîtée reste, le nom disparaît. | §5.1 |
| **M3** — distracteur D d'AR-51 atteignable par deux chemins | **APPLIQUÉ** : nombres refaits ($\overline{8523}_{(9)}$), six chemins calculés et séparés. | §9.5 |
| **M4** — la prose sur les chiffres $\ge 10$ livrée avec sa réserve retirée au rendu | **APPLIQUÉ** : les deux lignes sont **supprimées**. La rung n'utilise aucune base > 9. | §3.1-2, Q1(b) |

### Rejets raisonnés (rien d'omis en silence)

1. **Fidélité I2, seconde branche — « rééquilibrer par REDESIGN : convertir 3-4 items mécaniques
   en énoncés de forme 2.1.6 ».** **REJETÉ pour cette livraison, et le motif est un arbitrage du
   propriétaire, pas un désaccord technique** : le défaut écrit au §37 est « **un lot au plancher**
   (≈ 12, trois par modèle) ». Rééquilibrer par redesign sans perdre de couverture demande 2 à 4
   items supplémentaires (les gestes de 2.1.4/2.1.5 sont de niveau 1 une fois la prose faite : les
   convertir en niveau 2 revient à les remplacer, donc à sous-sonder les modèles N1 et N4). J'ai
   appliqué la **première** branche du même finding (re-tagage honnête) et j'**imprime l'écart**
   plutôt que de le maquiller, avec le chemin exact pour le réduire si l'owner préfère le ratio à
   la taille (**Q11**). *Ce qui n'est pas rejeté :* l'effort libéré par les trois coupes **est**
   allé à 2.1.6, comme le §37 le demande — mais sous la forme que le cadre décrit pour cette
   capacité (l'exercice attempt-first de quatre questions), pas sous la forme de QCM
   supplémentaires.
2. **Fidélité I5, seconde branche — « ou bien déclarer que les items d'encadrement (anciens AR-46
   et AR-49) SONT la règle d'ordre déguisée ».** **REJETÉ** au profit de la première branche : un
   encadrement n'est pas une comparaison, et déclarer l'équivalence aurait laissé la capacité
   « comparer » évaluée par procuration. Un item la porte maintenant directement (AR-44).
3. **Fidélité B1, « build order : gate → author », dans sa version forte (ne rien écrire avant la
   relecture longue Gemini et la validation humaine).** **REJETÉ comme condition de blocage, pour
   la partie que la vérification a réglée.** La question étroite que la critique posait — *le
   cadre SM liste-t-il ces capacités ?* — a reçu sept sources convergentes et une page vue dans le
   cours 2ème BAC SM A BIOF ; exiger en plus la lecture d'un PDF **scanné sans couche texte**
   bloquerait la rung sur une porte qu'aucun instrument disponible ne peut passer. Ce qui reste
   ouvert est **nommé, borné et non bloquant** (libellés verbatim ; niveau d'enseignement, Q10),
   et le cadre **n'est pas promu**.
4. **Pédagogie I2, variante « re-cibler le QCM d'accroche pour qu'il porte N1 ET N2 ».**
   **REJETÉ** : un point d'arrêt a **un** `primary_misconception`, et un QCM qui sonde deux
   modèles racines à la fois ne diagnostique ni l'un ni l'autre. Un second point d'arrêt, placé où
   l'élève est réellement perdu, coûte moins qu'une sonde ambiguë.
5. **Pédagogie M4, dans sa version forte (renuméroter pour que la difficulté soit monotone sur les
   douze).** **REJETÉ** : l'ordre des `id` doit suivre l'ordre d'enseignement (les trois
   capacités), sinon un item de 2.1.6 porterait un `id` plus petit qu'un item de 2.1.4 et toute
   lecture par bloc deviendrait fausse. La dent de scie est **déclarée** au §9.0.
6. **Pédagogie B2, variante « convertir E8(c) en troisième point d'arrêt ».** **REJETÉ comme
   redondant** avec la solution retenue : l'exercice attempt-first est déjà un engagement, et plus
   exigeant qu'un QCM (l'élève produit sa réponse). Le point d'arrêt libéré est allé à N1 (I2).

### La traçabilité du lot : 15 → 12, item par item

| nouvel `id` | ancien `id` (2026-09-28) | ce qui a changé |
|---|---|---|
| **AR-41** | AR-41 | **refait** : nombre, base et divisions frais ($234$, base 8) ; distracteur D re-dérivé et re-tagué (I5) |
| **AR-42** | AR-42 | base changée ($8 \to 9$) pour ne pas doubler AR-41 ; même forme, nombres contrôlés |
| **AR-43** | AR-43 | inchangé ; **tag** `non_explicite` → `directe` |
| **AR-44** | — | **NEUF** : ordre en base unique (I5 ; arme la face « chiffre de tête » de N2) |
| **AR-45** | AR-44 | inchangé |
| **AR-46** | AR-46 | inchangé |
| **AR-47** | AR-50 | nombres changés (la chaîne « 243 » était partagée avec E3) |
| **AR-48** | AR-51 | inchangé ; **tag** `non_explicite` → `directe` |
| **AR-49** | AR-52 | inchangé ; **tag** `non_explicite` → `directe` |
| **AR-50** | AR-48 | inchangé ; **tag** `synthese` → `non_explicite` |
| **AR-51** | AR-53 | nombres refaits ($\overline{8523}_{(9)}$, M3) ; **tag** `non_explicite` → `directe` |
| **AR-52** | AR-55 | inchangé ; **tag** `synthese` → `non_explicite` |
| — | ~~AR-45~~ ($\overline{101}_{(8)}$) | **COUPÉ** : pré-résolu par E5 (B3) et absorbé par la réduction de taille |
| — | ~~AR-49~~ (encadrement base 7) | **COUPÉ** : redondant en geste avec AR-46 (encadrement, mais intersecté — plus exigeant) |
| — | ~~AR-54~~ (critère symbolique base 7) | **COUPÉ** : la face symbolique du critère est portée par la prose (E6) et par la question b) de `r-numeration` |

*Les trois coupes sont celles qui coûtaient le moins en COUVERTURE (aucun modèle ne passe sous le
plancher) et le moins en CAPACITÉ (le bloc 2.1.6 garde trois items QCM et gagne un exercice
attempt-first de quatre questions).*

### Ce qui reste pour le propriétaire

- **Q1(b)** chiffres $\ge 10$ · **Q2** base 2 et informatique · **Q3** découpage de N3/N4 ·
  **Q4** famille séparée pour le critère · **Q5** placement · **Q6** demande de sources ·
  **Q8** nombre de points d'arrêt · **Q9** le manipulable · **Q10 (neuve)** 1ère vs 2ème Bac SM ·
  **Q11 (neuve)** imprimer l'écart de mix, ou payer 2-4 items de plus.
- **Deux éditions hors de ma main, routées :** (a) la ligne `_observation_examens` proposée au §1
  (fichier de cadre) ; (b) la consignation de la décision de notation dans le cadre ou un registre
  de notation, pour que la prochaine rung l'hérite.
- **Nombres NEUFS ou MODIFIÉS par cette révision, à re-vérifier par le prochain lecteur** (chacun
  calculé puis contrôlé en sens inverse, deux fois, à la main) : la rupture E6 ($S = 15$,
  $15 \equiv 7 \pmod 8$ contre $2025 = 8\times253+1$) · la cassure E7 ($\overline{46}_{(7)} = 34
  = $ « $\overline{64}_{(5)}$ », inexistante) · le contrôle négatif de E4 au seuil 10
  ($\overline{170}$) · E5 ($\overline{201}_{(3)} = 19$, $\overline{201}_{(5)} = 51$) · la clôture
  ($950 = \overline{4222}_{(6)}$) · `cp-r7b-ordre-restes` ($831$, $1833$, $705$) · AR-41
  ($234 = \overline{352}_{(8)}$ ; $171$, $156$) · AR-42 ($500 = \overline{615}_{(9)}$) · AR-44
  ($99$, $107$, $178$ ; chemins $1{<}3{<}4$, sommes $6{<}7{<}11$, lecture inversée $59{<}123{<}386$)
  · AR-47 ($97+44 = 141 = \overline{1031}_{(5)}$ ; $476$, $201$, $111$) · AR-51
  ($\overline{8523}_{(9)} = 6258 = 8\times782+2$ ; $18$, $6$, $3$).
