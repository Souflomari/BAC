# spec — manipulable 2D `champ-des-pentes` (Maths · `equations-differentielles`, **R2**)

**Statut : PROPOSITION révisée TROIS FOIS après la vague 1 — non construite.**
**La dette $\Delta=0$ qui la précédait est PAYÉE. La vague 1bis a lu cette révision : les DEUX
critiques rendent CONSTRUIRE APRÈS CORRECTIFS, et cette TROISIÈME passe applique leurs
correctifs.** *Ce qui reste n'est ni un ordre ni une relecture de scope : ce sont **deux
décisions de propriétaire** (§13.20 tranchée ici, §13.21 neuve) et **une capacité de
descripteur à confirmer** (§15.3 d).*
Écrite le 2026-09-25 par pedagogy-architect · **révisée le 2026-09-27 après la vague 1**
(bac-fidelity-critic + pedagogy-critic, tous deux **CONSTRUIRE PLUS TARD — après la dette, puis
seulement avec les correctifs**) · **révisée une TROISIÈME fois le 2026-09-27 après la vague
1bis** (bac-fidelity-critic + pedagogy-critic, tous deux **CONSTRUIRE APRÈS CORRECTIFS**).

> ✅ **L'ORDRE EST TRANCHÉ, IL A ÉTÉ EXÉCUTÉ, ET LA PORTE EST LEVÉE.** La question 1 du §13
> (« faut-il construire cette scène plutôt que de payer la dette mesurée de la notion ? ») avait
> pour **défaut : la dette d'abord**. Les deux critiques de vague 1 ont confirmé ce défaut et
> l'ont **durci en ORDRE**. **La dette est aujourd'hui PAYÉE** — commit **`b70f9a41`** :
> l'exemple travaillé de $y''+6y'+9y=0$, le modèle `racine-double-sans-x`, les items `EQDIFF-31`
> à `-33`, le point d'arrêt `cp-r4-racine-double`. *Vérifié ici par lecture : `items.yaml` porte
> `total_items: 33`, **23** modèles, `ramp_coverage.R4: 7`, **14** modèles au plancher ;
> `checkpoints.yaml` porte **6** points d'arrêt. Le trou de `REVIEW:94-100` (F4) est refermé.*
>
> **Ce qui reste donc, et c'est tout ce qui reste :** le « CONSTRUIRE PLUS TARD » des deux
> critiques avait **deux** conditions — *(a)* la dette d'abord, **satisfaite** ; *(b)* « et alors
> seulement avec BLOQ-1, BLOQ-2, BLOQ-3 corrigés / I1–I5 appliqués », **ce que cette révision
> fait**. **Mais aucun critique n'a encore lu ces correctifs**, et cette révision a trouvé **trois
> défauts que ni l'écriture ni la vague 1 n'avaient vus** (§15.12). **Donc : vague 1bis d'abord,
> construction ensuite** — §12 (ordre de construction, étape 6) et §13.1.
>
> ⚠ **Et tous les comptes de couverture de ce document ont été REFAITS après la dette** (§8) :
> 30 items → **33**, 22 modèles → **23**, 15 au plancher → **14**, 5 points d'arrêt → **6**.
> *Ne pas hériter d'un chiffre de la première rédaction sans le relire ici.*

> ⚠ **AVERTISSEMENT D'INSTRUMENT, en tête, parce que c'est la faute que la spec sœur a dû
> confesser en vague 1 (§15.9 de `maths-nombres-complexes-2-scene-plan.md`).** **`Bash` était
> indisponible dans la session d'écriture ET dans la session de révision** : la révision a
> disposé de `Read`, `Grep` (ripgrep) et `Glob`, **et de rien qui exécute**. Les faits de
> fichier ci-dessous ont donc été **relus un par un avec `Grep`/`Read` pendant la révision** —
> c'est une vérification réelle du CONTENU, ce n'est pas l'exécution d'une commande shell.
> **La commande shell donnée en regard de chaque fait est celle qui le REPRODUIT ; elle n'a été
> lancée ni à l'écriture, ni à la révision.** Aucun chiffre de ce document n'est attribué à une
> sortie que je n'aurais pas lue. Ce que je n'ai pas pu vérifier est au §15 — et la vague 1
> **n'a pas pu exécuter davantage** (les deux critiques le déclarent). ⚠ **La TROISIÈME passe
> non plus : `Read`, `Grep`, `Glob`, rien qui exécute. Et la vague 1bis le déclare aussi** (« *je
> n'ai pu exécuter ni l'un ni l'autre, donc les faits de pixels restent de l'arithmétique, comme
> pour l'architecte* »). **Quatre lectures d'affilée sans exécution : c'est le risque principal
> qui reste sur ce document** (§15.1, §15.13).

---

## Ce que la TROISIÈME passe a changé (vague 1bis)

*Les deux rapports de vague 1bis lus en entier, **puis chaque ligne qu'ils citent rouverte et relue**
dans la spec ET dans les fichiers source. Verdict commun : **CONSTRUIRE APRÈS CORRECTIFS.***
**Solde en une phrase : les CINQ reproches bloquants sont appliqués ; tous les IMPORTANT/MEDIUM sont
appliqués ; les MINOR/LOW sont appliqués sauf un, accepté tel quel avec sa raison ; et le §16 porte
UNE réfutation partielle, UNE correction de cadrage, UNE RÉTRACTATION de la deuxième passe et DEUX
nuances de mesure.** *Et cette passe a trouvé **trois défauts de plus** que personne n'avait vus, dont
un qui rend **impossible** (et non seulement coûteux) l'un des trois remèdes proposés par un critique
(§15.13, §16.1).*

| le reproche | ce qui a changé | où |
|---|---|---|
| **B1** (péd., BLOQUANT) — la réponse de S6 est **PRESCRITE** par trois `suite` de la scène : celle de S3 entraîne la comparaison « ligne plate = $b$ ? » (et **viole l'interdit que S3 s'impose**), celle de S4 prescrit la promenade de $b$ pendant que `a` est son contrôle neuf, celle de S5 dit « puis $a$ » | **(a)** le contrôle `a` n'offre plus que **deux crans** ($-0{,}5$ ; $+0{,}5$) à S4 et S5 — le cran $-1$ n'est atteignable **qu'à S6, après la révélation** : la non-fuite passe du SILENCE DES TEXTES au PRODUIT ; **(b)** la `suite` de S3 est **réécrite** et visée sur « **de combien de graduations la ligne se déplace** », plus sur une coïncidence ; **(c)** « puis $a$ » **supprimé** de la `suite` de S5 | §5.2 A, §5.5, §7.3 (`suite`), §7.4, §7.5 (`suite`), §7.7 A/B/C, §11.1 N9, §11.2, §11.4 (n° 22 ter), §12, §13.19, §15.3 d |
| **B2** (péd., BLOQUANT) — S6 ouvre avec **son propre contrôle porteur de pari déjà ouvert**, contre ADR 0041 §6 (« *tant que l'élève n'a pas choisi, ni le temps ni le contrôle de l'étape n'existent dans le DOM* », relu à `0041:98-100`) | **`a` est ABSENT du DOM à S6 avant l'engagement, PRÉSENT après** — l'idiome exact déjà appliqué à `point` à S2 et S3. La **troisième exception du §7.7 est SUPPRIMÉE** : il n'y en a plus que deux | §6.1, §7.6, §7.7 (table des exceptions), §11.2 (`avant-pari`, `fuite-inter-etapes`), §11.4 (n° 22 quater) |
| **B3** (péd., BLOQUANT) — `formule-graduee` **cassée par quatre textes de la scène elle-même** : « Avant toute **courbe** » à S1, « dans $y'=ay+\mathbf{b}$ » à S2, la queue de `arretee` à S2 (la réponse ET le mécanisme de S4, deux étapes trop tôt), la `suite` de S3 | **les quatre chaînes réécrites dans le vocabulaire autorisé de leur étape**, une par une | §7.1, §7.2 (×2), §7.3 |
| **BLOCKING-1** (fid., BLOQUANT) — les deux seuils « dérivés » sont dérivés d'**UN état** alors que `a` est ouvert : sweepés, les deux portes **rougissent sur un produit juste** (2,56 / 1,64 px à $a=-1$) | **les deux familles sont EXPLICITEMENT BORNÉES À L'ÉTAT POSÉ de leur étape**, écrit dans l'en-tête de famille (ADR 0033) ; les chiffres sweepés sont portés au `fit_caveat` ; **et le test unitaire du §14.2 compare chaque seuil au plancher DE L'ÉTAT POSÉ**, sinon il forçait le MUET | §10.3, §11.2 (2 familles + l'encadré), §14.2 |
| ⚠ **et ce que la vague 1bis n'a pas vu** : le pire cas n'est pas $a=-1$ au bord DROIT, c'est **$a=+0{,}5$ au bord GAUCHE** — la fenêtre est asymétrique ($8$ unités à gauche, $4$ à droite), donc $e^{0{,}5\times(-8)} = e^{-4}$ avec un écart initial de $1$ : **0,85 px au bureau, 0,55 px au téléphone.** *Conséquence : le remède (b) du critique (« dériver le plancher sur tout le domaine ») n'est pas seulement coûteux, il est **impossible** — il faudrait un seuil sous-pixel. Le remède (a) est le seul praticable, et il est retenu* | chiffres recalculés et écrits | §10.3, §11.2, §15.13 a |
| **BLOCKING-2** (fid., BLOQUANT) — « *un piège que **l'examen** connaît* » dans la consigne de S6 : **aucune annale vérifiée de la notion ne pose $y'=ay+b$**, et `REVIEW:23-29` mesure zéro affirmation de fréquence et conclut « **Ne pas en ajouter** » | **clause supprimée** (« *c'est le piège le plus coûteux de ce chapitre* ») ; **et une frontière NEUVE, §9.12** : `examen`, `au bac`, `les sujets`, `annale`, `chaque année`, `souvent`, `piège classique`… avec leur sonde et leur essai rouge | §7.6, §9.12, §11.4 (n° 28) |
| **IMPORTANT-3** (fid.) — les citations `lesson.md` de la région R5 sont **fausses de $+60$ lignes** depuis le commit de la dette, et la révision précédente avait **déclaré fausses deux citations justes** | **toutes reprises contre le fichier tel qu'il est** : commentaire `:562-596`, filière `:580-582`, R5/physique `:583-591`, $C_0$ `:478`, $\tau=L/R$ `:520`, R5 $\approx$ `:472-538` ; **la réfutation M4 est RETIRÉE** (§16) ; `items.yaml:1973-1975` → `:2211-2218`, `:1994-2001` → `:2246-2253`, `checkpoints.yaml:130-175` → `:139-184`, `:141-175` → `:150-184` | §0.1 d, §0.2, §0.3, §1, §2.5, §2.6, §7.5, §9.3, §13.15, §16 |
| **IMPORTANT-4** (fid.) — des comptes que le document jure avoir refaits après la dette, et qui sont d'avant | **30 → 33** (six endroits), **oscillateur 18 étiquettes / 9 items → 19 / 10** (union $\{4;5;16;18;21;27;28;29;30;\mathbf{32}\}$), **embeds maths 4 → 5** (`nombres-complexes-2` en porte **deux**) | §0.1 b, §0.1 d, §0.2, §0.3, §1, §4.6 |
| **IMPORTANT-5** (fid.) — §9.10 (« aucun nombre hors des grilles ») **rougirait sur deux textes de choix nécessaires** (`+1` à S6, `1` à S1) | la règle est **bornée aux LECTURES et au badge**, écrit dans la règle et dans l'essai rouge n° 28 | §9.10, §11.4 (n° 28) |
| **M-a** (péd.) — §13.11 s'est déclarée close trop tôt : le retour réécrit de S4 **raconte encore** ce que S5 fait parier (« les segments au-dessous montent »), et celui de S3 aussi (« ils montent à pic ») | les deux retours **DÉSIGNENT la région sans en raconter le sens** ; le retour de S4 casse désormais sur **un geste** (basculer $a$ sur $+0{,}5$), ce qui donne enfin au contrôle neuf de S4 un emploi écrit | §7.3, §7.4, §13.11 |
| **M-b** (péd.) — `pentes-comparees` introduit un **second point non déclaré** $(0;3)$, et le point mobile porte **trois lettres** ($P$, $Q$, $R$) | **une seule lettre dans toute la scène : $P$ est le point mobile, partout.** Le point de comparaison n'a **pas de lettre** : il est nommé par ses coordonnées $(0\,;3)$, **et il est déclaré dessiné à l'encre à S2**, budget d'étiquettes refait | §5.6, §6.2, §7.2, §7.7 A, §11.1 N3, §13.18 |
| **M-c** (péd.) — la `suite` de S5 demande « combien de lignes plates ? » et son geste (promener $b$, puis $a$) en produit **six** | le geste est visé sur **la variable de l'invariance — les DÉPARTS** : une seule courbe, cinq crans de départ, la ligne ne bouge sur **aucun** | §7.5 |
| **M-d** (péd.) — cellule périmée : « $a=-1$ … il est la CIBLE de la `suite` de S4 », or cette `suite` est supprimée depuis la vague 1 | cellule réécrite : $a=-1$ est **l'état de S1-S2 (à $b=0$) et la RÉPONSE de S6**, et **il n'est offert comme cran ni à S4 ni à S5** | §5.2 A |
| **M-e** / **MINOR-8** (péd. + fid.) — la consigne de S6 impute la misconception au « chapitre 2 », qui **n'a pas de $b$** (R1 = $y'=ay$, `lesson.md:44-112`) | imputée à **la lecture naturelle de l'équation**, pas à un chapitre | §7.6 |
| **M-f** / **MINOR-6** (péd. + fid.) — **owner-q20** : `palier-oubli` sur `b-zero-seulement` est une **recherche incomplète**, pas un modèle tenu | ⚠ **DÉFAUT INVERSÉ, et c'est la décision du §13.20 : le choix reste, l'ÉTIQUETTE TOMBE.** S6 porte deux distracteurs étiquetés sur trois ; `pedagogy_wiring` le déclare ; aucun compte ne bouge | §7.6, §8.1, §8.2, §8.4, §13.20, §14.0 |
| **MINOR-7** (fid.) — $\lvert-1\times(-6)+(-2)\rvert$ vaut **4**, pas 8 | témoin corrigé : $\lvert-1\times(-6)+2\rvert = 8$ ; **tout l'aval était juste** | §6.2 |
| **MINOR-9** (fid.) — « séparées de moins d'un pixel sur **tout le tiers droit** » : le franchissement est à $x=6{,}8$ / $7{,}7$, pas à $6$ | phrase quantifiée au lieu d'être rhétorique | §5.1.1 |
| **MINOR-10** (fid.) — la queue de `arretee` à S2 est une exception **non couverte** par la table du §7.7 C | **c'est B3.3 : la phrase est réécrite**, donc il n'y a plus d'exception à couvrir | §7.2 |
| **MINOR-11** (fid.) — « le cas $a=0$ est **hors cadre** » : aucun cadre ne le dit ; c'est `lesson.md:142` | « **hors du cadre de CE CHAPITRE** (`lesson.md:142`) » | §1 |
| **B.1** (fid., réfutation de la réfutation) — l'étiquette « **Faux d'une unité** » sur le $x\approx6{,}0$ du critique de vague 1 ne survit pas à la correction du $32{,}5$ px/u deux pages plus loin | **étiquette retirée** ; le recalcul reste, le verdict « faux » part | §« Ce que la vague 1 a changé », §16 |
| **L-a** (péd.) — « Garde $P$ où il est » à S4, où `point` est **absent du DOM** | « sans rien changer d'autre » | §7.4 |
| **L-b** (péd.) — `pente` est listée dans les lectures de S6 et **aucun texte de S6 ne l'emploie** | **retirée des lectures de S6** ; S6 n'affiche que `palier` | §7.6, §11.2 |
| **L-c** (péd.) — « juste au-dessus, **d'une unité** » livre l'écart un temps trop tôt | « d'une unité » **coupé** | §7.4 |
| **L-d** (péd.) — le $-1{,}5$ de `amortie` est **stipulé** par le texte du choix, pas dérivé | **accepté tel quel** : c'est déclaré au §13.12 et le critique le juge acceptable — aucun changement | §13.12 |
| **L-e** (péd.) — « toute valeur de hauteur autre que celles de $P$ » (interdit de S1) **n'est pas mesurable** sur un texte rendu : la porte sortirait MUETTE ou faussement rouge | remplacé par une **liste blanche énumérable** de nombres (les cinq couples de $P$ et les quatre pentes qu'ils produisent à $y'=-y$) ; **et le même défaut trouvé à S3-S4-S5** (« toute phrase où « palier » et « $b$ » sont dits ÉGAUX » — qui aurait **rougi sur le distracteur `recopie-b` de S3, un texte nécessaire**) est remplacé par des FORMES | §7.7 C, §15.13 c |

**Et ce que la TROISIÈME passe a trouvé seule, qu'aucune des quatre lectures n'avait vu : §15.13.**
*(a)* le bord GAUCHE est pire que le droit (ci-dessus) ; *(b)* `courbe-jamais-sur-le-palier`
mesurait « en tout $x$ du cadre » une courbe qui n'est dans le cadre que sur
$x \in [-1{,}386 ; 4]$ — **la même mesure sans objet que la famille voisine avait déjà su
écarter** ; *(c)* l'interdit « toute phrase où « palier » et « $b$ » sont dits ÉGAUX » aurait
fait rougir un distracteur nécessaire.

---

## Ce que la vague 1 a changé

*Les deux rapports lus en entier ; **chaque ligne citée par eux a été rouverte et relue ici**.
Ce tableau est le solde : ce qui est accepté, ce qui est réfuté, et ce que la révision a trouvé
en plus. **Trois de leurs citations sont fausses en ligne mais justes en jugement, et une des
miennes l'était aussi** — le détail est en bas de cette section.*

**En une phrase : le verdict commun des deux critiques était « CONSTRUIRE PLUS TARD — la dette
$\Delta=0$ d'abord, puis seulement avec les correctifs ». La dette est payée (`b70f9a41`) ; les
correctifs sont ci-dessous ; il reste une relecture.**

**Le volume, pour que personne ne suppose que « révisé » veut dire « retouché » :** une **étape
de plus** (S6, six au lieu de cinq), **la fenêtre de données déplacée**, **le format du plateau
changé**, **six `suite` refaites**, **sept retours réécrits**, **deux contrôles rouverts**, **deux
familles de porte dont les seuils sont désormais DÉRIVÉS**, **sept entrées d'essai rouge ajoutées
et une supprimée parce qu'elle n'était pas un défaut**, **cinq questions neuves au propriétaire**,
et **tous les comptes de couverture refaits** après la dette.

### Accepté et appliqué

| # | le défaut | où c'est réparé |
|---|---|---|
| **BLOQ-1** (péd.) | la découverte du cran $a=-1$ était **imprimée dans une `suite`**, jamais pariée | **nouvelle étape S6** (§7.7) : le pari est « *pour quel $a$ la ligne plate tombe-t-elle sur $b$ à CHAQUE cran de $b$ ?* », $a=-1$ est la **réponse**, l'état posé est $a=-0{,}5$ — **le garde-fou de stem du §7.6 E est respecté au lieu d'être contredit** |
| **BLOQ-2** (péd.) | « jamais » et « jamais confondues » **contredits par le dessin** ; la porte $\ge 3$ px ne pouvait pas passer au vert sur un produit juste | **fenêtre changée** ($x \in [-8;4]$), **format changé** (`carre-partout`), **quantité variable armée** (l'échelle de $b$ à S4), **tous les seuils de porte RECALCULÉS depuis cette arithmétique** (§5.1, §7.4, §11.2), **et une clause de `fit_caveat` qui dit qu'un dessin fini ne peut PAS montrer « jamais »** (§10.3) |
| **BLOQ-3** (péd.) | la consigne de S4 **racontait le champ** et livrait le mécanisme avant le pari | phrase supprimée (§7.4) |
| **I1–I2** (péd.) | moitiés porteuses dans les `suite` ; quatre `suite` sur cinq à deux questions | **chaque `suite` : une question, un geste** (§7.1–§7.7) ; la moitié porteuse de S2 devient une **lecture qui varie**, celle de S4 une **échelle de crans**, celle de S3-S4 le **pari de S6** |
| **I3** (péd.) | trois retours de S3 citent une lecture inatteignable | **`point` rouvert APRÈS la révélation de S3** ; les trois retours réécrits sur des hauteurs **atteignables** ; `pente` gagne sa ligne à S3 (§7.3) |
| **I4** (péd.) | aucune étape ne fait LIRE une pente sur le quadrillage | **la `suite` de S1** le demande (§7.1) |
| **I5** (péd.) | `pentes-comparees` ne pouvait afficher que deux valeurs ÉGALES | **`point` rouvert après la révélation de S2** ; la lecture compare le point de référence $(0;3)$ et $P$ **mobile** (§5.6, §7.2) — N3 devient exerçable dans ses deux sens |
| **I7** (péd.) | les crans de `point` nommés par des ids dont un (`sur`) imprime une réponse | **les cinq crans portent leurs COORDONNÉES** comme étiquette (§5.2 C) |
| **I8** (péd.) | $b$ arrive sans motif, le marqueur étant posé au-dessus du paragraphe qui le motive | **marqueur déplacé après `lesson.md:124`** (§3), coût déclaré |
| **I9** (péd.) | la révélation de S3 = 170 marques d'accent d'un coup | **champ révélé à l'ENCRE** ; l'accent réservé à **la rangée plate et sa ligne** (§6.2) |
| **I1** (fid.) | « *13 emplacements d'items sur 30 … loin devant l'oscillateur* » : **unités mélangées, et faux** | **« 8 items sur 33 portent un modèle du palier (13 étiquettes) »**, comparaison à R4 **supprimée** (§0.1 d, §0.2, §13.2). ⚠ *La révision avait écrit « sur **30** » — le dénominateur d'avant la dette, dans le correctif d'un défaut d'unité : **corrigé en troisième passe** (fidélité IMPORTANT-4)* |
| **I2** (fid.) | le seul terme hors cadre à l'écran est **le titre de la carte** | **titre par la QUESTION** ; `champ-des-pentes` ne survit que comme slug, clé de registre et sélecteur de porte (§9.7, §12) |
| **I3** (fid.) | S5 justifie un fait du cadre par un argument **hors cadre** | les deux retours **énoncent l'observation** et **renvoient au chapitre 4** (§7.5) |
| **I4** (fid.) | la moitié « $T$ seule, palier $0$ » de `modele-sans-ecart` est **affichée comme vraie** à S1-S2 | **déclarée** au §8.1, et le retour `zero` de S3 **nommé** comme la réparation |
| **I5** (fid.) | la règle du pas 2 repose sur **un écart faux** | **recalculé** — et la vraie géométrie est PIRE que celle du reproche (§5.1) : **pas de 1 aux deux largeurs**, écart $\approx 13{,}8$ px, essai rouge n° 16 supprimé, `suite` de S2 rendue indépendante de la largeur (§6.2, §7.2) |
| **M1–M8** (fid.) et **M1–M8** (péd.) | citations, cellules, valeurs | toutes reprises ci-dessous et dans le corps |

### Réfuté, en écrit

| # | ce que la vague 1 dit | pourquoi c'est faux |
|---|---|---|
| **BLOQ-2, moitié « la lecture ne varie pas »** (péd.) | « *`ecart-au-palier` … a constant of the state ; `point` is CLOSED at S4 … therefore has exactly one value, at one step, unvaryable* » | **Faux.** À S4, `a` est le contrôle NEUF et `b` est ROUVERT (§7.4, première rédaction comme celle-ci). Les équations atteignables à $P=(0;5)$ donnent plusieurs valeurs d'`ecart-au-palier`, et `pente` $= a \times$ écart à **toutes**. La lecture variait déjà. *⚠ Chiffres refaits en troisième passe : c'était **douze** équations et six écarts $\{1;3;4;5;7;9\}$ à la deuxième passe ; depuis le retrait du cran dégénéré (B1), c'est **huit** équations et **cinq** écarts $\{1;3;5;7;9\}$ (§5.5). **La réfutation ne dépend pas du chiffre** : ce qui compte est qu'il soit $> 1$.* *Ce qui était vrai — et c'est le fond du BLOQ — c'est que **rien ne demandait à l'élève de la faire varier** : elle était exerçable et non exercée. La réparation est donc une `suite` qui l'exerce, pas un contrôle de plus.* |
| **BLOQ-2, remède « ouvrir `point` après la révélation de S4 »** (péd. ; **repris par la commande**) | « *opening `point` after S4's reveal leaks nothing by §7.6 A's own logic, since `famille` is closed and no second curve is drawable* » | **Faux, et c'est la fuite exacte que §5.5 ferme.** À S4, après la révélation, `famille` vaut `une` : rouvrir `point` ne dessine pas DEUX courbes, il dessine **une courbe après l'autre, toutes visant la même ligne** — c'est-à-dire **la première moitié de la réponse de S5** (« *s'approchent toutes les trois de la même hauteur* »). La fuite ne tient pas à la simultanéité, elle tient à ce que l'élève APPREND. *La quantité qui varie est obtenue autrement, sans fuite : **l'échelle de `b`** (écarts $1 \to 3 \to 5 \to 9$, pentes $-0{,}5 \to -1{,}5 \to -2{,}5 \to -4{,}5$), avec le contrôle que S4 ouvre déjà.* **`point` reste FERMÉ à S4** ; il est en revanche rouvert à **S2 et S3** (où il ne fuit rien), ce que la vague 1 demandait aussi. **Question au propriétaire, §13.16** — c'est le seul point où cette révision s'écarte d'une consigne reçue. |
| **x ≈ 6,0 à 390 px** (péd., BLOQ-2) | « *the top pair falls under 3 px … from $x\approx 6{,}0$ at 390 px* » | ⚠ **ÉTIQUETTE RETIRÉE EN TROISIÈME PASSE (fidélité 1bis, B.1), et le retrait est juste.** *La révision écrivait « **faux d'une unité** ». Le recalcul, lui, tient : $3e^{-x/2}\cdot\text{px/u} = 3$ donne $x = 2\ln(\text{px/u})$, soit $6{,}96$ **à $32{,}5$ px/u**. **Mais $32{,}5$ px/u est démoli deux pages plus loin par ce même document** (§5.1.0) : la vraie géométrie de `carre` à 390 px donnait $\approx 22$ px/u, donc $x = 2\ln 22 = \mathbf{6{,}2}$ — **plus près du $6{,}0$ du critique que du $6{,}96$ du réfuteur.* **Un document qui corrige un chiffre ne peut pas garder le verdict qu'il avait rendu AVEC ce chiffre.** *Ce qui reste, et qui est l'essentiel : la conclusion du BLOQ — la porte ne pouvait pas passer au vert — est **juste et plus grave** que mesurée.* |
| **« keep the step at 1 at both widths (clearance holds) »** (fid., I5) | le remède proposé | **Le diagnostic est juste, le remède l'était par accident.** L'écart de $32{,}5-16=16{,}5$ px que le critique calcule s'appuie sur le $32{,}5$ px/u de la spec, **qui est faux**. Avec la vraie géométrie (`carre` = 4:3 à 390 px) l'écart tombait à $\approx 6{,}4$ px, **au ras du critère de la porte** — le pas de 2 était donc presque justifié, pour une raison que personne n'avait écrite. *Le remède ne redevient juste qu'une fois `carre-partout` posé (§5.1).* |
| **M4** (fid.) | « *the quoted R5 passage starts at `:523` … inside the HTML comment opened at `lesson.md:502`* » | 🔻 **RÉFUTATION RETIRÉE EN TROISIÈME PASSE — c'est MOI qui avais tort, et deux fois.** *La révision déclarait « les deux numéros sont faux » et posait `:538`/`:572`/`:556-558`/`:559-564` : **aucun de ces quatre numéros ne correspond au fichier**, ni avant ni après la dette. **Relu ligne à ligne en troisième passe :** le commentaire `<!-- NOTE DE VALIDATION` s'ouvre à **`lesson.md:562`** et se ferme à **`:596`** ; le désaccord de filière est à **`:580-582`** ; le passage R5/physique à **`:583-591`**. Les numéros de la vague 1 (`:502` pour le commentaire, `:523` pour le passage) **étaient justes contre le fichier d'AVANT la dette** — le commit `b70f9a41` a inséré **60 lignes** au-dessus de R5 ($562-60=502$ ✓, $583-60=523$ ✓). **Le critique avait raison, je l'ai déclaré faux, et j'ai inventé un troisième jeu de numéros qui ne correspond à aucun des deux états du fichier.*** **Le JUGEMENT, lui, était le sien et il est appliqué : les deux citations sont DE LA NOTE DE VALIDATION, invisible à l'élève.** *Leçon, et elle est neuve : **corriger la citation d'un fichier qui a bougé sous le document exige de relire le fichier, pas de recalculer un décalage.*** |
| **M1** (fid.) | « *the only file in `docs/pipeline/propositions/` containing any form of the word is the spec itself* » | **Vrai à l'heure du rapport, faux à l'heure de la révision.** `Grep -i "diff.?rentiel"` sur le dossier rend **deux** fichiers : cette spec et **`maths-equations-differentielles-delta-nul.md` (8 occurrences)** — la spec de la dette, écrite le même jour. *Le fait initial (la notion n'avait jamais été pesée par une spec) reste vrai ; sa formulation est corrigée au §0.* ⚠ **Le compte propre de CETTE spec n'est plus cité, et c'est délibéré** (troisième passe) : il change à chaque révision — la révision écrivait « 40 », la vague 1bis a mesuré « 43 » deux jours plus tard. **Un nombre qui croît avec le document qui le porte n'est pas un fait, c'est un compteur.** |

### Ce que la révision a trouvé en plus, et qu'aucune des deux vagues n'avait vu

⚠ **`format: "carre"` n'est PAS carré au téléphone.** `Plateau.tsx:63` déclare
`format?: "carre" | "carre-partout" | "paysage" | "paysage-haut"` et `:74` rend
`format === "carre-partout" ? "aspect-square" : "aspect-[4/3] bp-expanded:aspect-square"`.
**Donc `carre` = 4:3 sous le point de rupture `bp-expanded`, carré seulement au-dessus.** Une
fenêtre de données carrée dans une boîte 4:3, à facteur px/unité ÉGAL sur les deux axes,
**oblige la fenêtre à s'élargir en $x$ au téléphone** — exactement la chose que §5.1 interdit
(« *elle ne change JAMAIS* »). Le $390/12 = 32{,}5$ px/unité de la première rédaction était donc
faux deux fois : mauvais format, et mauvaise dimension limitante. **Corrigé : `carre-partout`**
(précédent écrit dans `Plateau.tsx:59-61` : le banc de diffraction, « *en 4:3, le tracé n'avait
que 61 px* »). *C'est le défaut le plus coûteux du document, et il rendait fausses toutes les
arithmétiques de pixels à 390 px, y compris celles sur lesquelles la vague 1 a raisonné.*

---

Quinzième manipulable de première partie, **neuvième PLAN** (ADR 0041, `"tool": "scene2d"`,
mêmes pièces que la cuve, la corde, les noyaux, le banc de diffraction, le tremplin, le banc
de modulation, le banc d'électrolyse et le plan complexe). **Deuxième scène de maths sans
3D**, après `plan-complexe-transformation`.

**Ce que ce document est.** Le cadrage pédagogique complet : le trou **mesuré** qui le
justifie (ou ne le justifierait pas), la frontière officielle, le placement, **six** étapes à
pari, les contrôles, l'état, les lectures, la table de ce qui ne doit pas être à l'écran avant
chaque pari, **le refus motivé de déclarer un modèle neuf**, et le contrat de porte.

**Ce que ce document n'est pas.** Il n'écrit ni le JSON, ni le TypeScript, ni la prose finale,
ni les items finaux. Le descripteur est de content-author ; le modèle, le rendu, le panneau et
le registre de frontend-builder ; les items d'item-author. **Aucun fichier de la notion n'a
été touché par cette proposition** — ni `lesson.md`, ni `items.yaml`, ni `checkpoints.yaml`,
ni le code.

Marqueur : `[[embed:champ-des-pentes]]` · clé de registre : `champ-des-pentes` · sélecteur de
porte : `[data-scene="champ-des-pentes"]` · **titre RENDU : « Ce que l'équation dit en chaque
point »** *(⚠ la chaîne `champ-des-pentes` ne paraît dans AUCUN texte vu par l'élève — §9.7,
correctif de vague 1)*.

**Et la révision n'a touché que ce fichier.** *Ni `lesson.md`, ni `items.yaml`, ni
`checkpoints.yaml`, ni `bank.yaml`, ni `exercises.yaml`, ni le code, ni le registre.* **Le
déplacement du marqueur (§3), la variation de stem (§4.6) et les deux clés de registre (§12) sont
COMMANDÉS ici, pas exécutés ici.**

**Numérotation des chapitres, mesurée avant d'écrire, et RELUE à la révision.** La convention de
la notion est `chapitre N = R(N−1)`, et elle est **prouvée par le texte** : **`lesson.md:144`**
« *ramener le cas général au chapitre 2* » désigne R1 ✓ *(⚠ **corrigé en vague 1, fidélité M3** :
la première rédaction citait `:146`, qui porte « (chapitre 2) » et soutient la même
conclusion — **le verbatim est à `:144`, c'est le titre de l'Étape 2**)* ; `lesson.md:236`
« *la forme $y'=ay+b$ du chapitre 3* » désigne R2 ✓ ; `lesson.md:376` « *l'oscillateur du
chapitre 5* » désigne R4 ✓ ; `lesson.md:39` « *on la referme au chapitre 4* » désigne R3 ✓.
*Les quatre relus un par un à la révision.* **Donc R2 = chapitre 3**, et toute prose commandée
ici emploie cette numérotation-là, jamais « R2 ».
*Appui : `REVIEW-2026-09-12.md:19-21` — « **les 49 citations « chapitre N » des cinq fichiers
sont justes**, vérifiées une à une par les deux critiques — personne ne doit en « corriger »
une seule. »* ⚠ **Et cette spec en AJOUTE deux, déclarées au §4** (fidélité M6) : la première
rédaction prétendait n'en ajouter aucune **tout en en commandant deux**. *Les deux sont justes
sous la convention ci-dessus ; elles portent le compte de 49 à 51, et aucune ne vise un rung que
ce document ne sert pas.*

---

**Chemins que ce document commande et qui n'existent pas encore** (la porte des liens les
exempte un par un) :

    CHEMIN À CRÉER: content/maths/equations-differentielles/media/champ-des-pentes.json — le descripteur de la scène (content-author)
    CHEMIN À CRÉER: content/maths/equations-differentielles/spec-scene-champ-des-pentes.md — la destination de ce document à la livraison
    CHEMIN À CRÉER: web/src/lib/scene2d/champ-pentes-modele.ts — le modèle (frontend-builder) : la pente ay+b, le palier −b/a, la courbe par un point, les valeurs exactes
    CHEMIN À CRÉER: web/src/lib/scene2d/champ-pentes-rendu.ts — le rendu 2D (frontend-builder) : le repère isotrope, le quadrillage opaque, les segments du champ, la ligne du palier, les courbes clippées
    CHEMIN À CRÉER: web/src/components/notion/scene/ChampPentesPanel.tsx — le panneau (frontend-builder)
    CHEMIN À CRÉER: web/scripts/test-champ-pentes.mjs — le test unitaire du modèle (les 60 états)
    CHEMIN À CRÉER: web/scripts/scene-champ-pentes.mjs — la porte de la scène (+ son `--essai-rouge`)

---

## 0. Pourquoi cette notion maintenant — le trou, mesuré

**Aucune spec antérieure n'avait pesé `maths/equations-differentielles` ; il y en a une
depuis, et c'est celle de la dette.** *Corrigé deux fois : la première rédaction citait
`svt-chaines-de-montagnes-scene-foyers.md`, **qui ne contient pas la chaîne** (fidélité M1) ; et
le rapport de vague 1 concluait « le seul fichier est la spec elle-même », **ce qui n'est plus
vrai**.* **Mesure de la révision**, motif accent-agnostique `diff.?rentiel` (-i) sur
`docs/pipeline/propositions/` : **deux fichiers**, cette spec et
**`maths-equations-differentielles-delta-nul.md` (8 occurrences)** — la spec de la dette
$\Delta=0$, écrite le même jour, **et c'est elle qui s'est construite d'abord**.
⚠ **Le compte propre de cette spec n'est PAS cité, en troisième passe et pour de bon** : il croît
à chaque révision (40 à la deuxième passe, 43 mesurées par la vague 1bis), donc **ce n'est pas un
fait, c'est un compteur** — et un document qui se cite lui-même comme mesure se disculpe
(ADR 0036). *Commande qui reproduit le fait qui compte (« combien de fichiers », pas « combien
d'occurrences ») :* `grep -rilE "diff.?rentiel" docs/pipeline/propositions/`.

**`content/maths/equations-differentielles/` ne porte aucun `spec.md`** (contenu du dossier :
`lesson.md`, `items.yaml`, `checkpoints.yaml`, `bank.yaml`, `exercises.yaml`,
`REVIEW-2026-09-12.md`, `media/`). Aucune spec n'y a jamais prescrit d'`[[embed:]]`. **Cette
scène ne solde donc aucune dette écrite** : `dette-manipulable` ne bouge pas,
`media-manipulable` monte d'une notion. *(Affirmé sur lecture, pas sur exécution des deux
instruments — §15.7.)*

### 0.1 Les huit faits, chacun avec la commande qui le reproduit

| # | le fait | la commande / la citation |
|---|---|---|
| **a** | **La notion porte QUATRE médias et AUCUN manipulable.** `refroidissement-modeles`, `famille-solutions`, `oscillateur-periode`, `rc-charge-decharge` : quatre SVG à étapes figées, quatre `.stages.json`. **Aucun `.interactive.json`, aucun descripteur de scène, aucun réglage.** | `ls content/maths/equations-differentielles/media/` ⇒ **4 `.svg` + 4 `.stages.json`, rien d'autre** |
| **b** | **La leçon ne porte aucun marqueur de manipulable**, et le corpus maths n'en porte que **CINQ** en tout (`geometrie-espace` ×2, **`nombres-complexes-2` ×2**, `calcul-integral` ×1) — **aucun en analyse hors calcul intégral**. ⚠ *Était « quatre » jusqu'à la troisième passe (fidélité IMPORTANT-4) : `nombres-complexes-2` en porte **deux**, `plan-complexe-transformation` à `:273` **et `plan-complexe-rapport` à `:367`**. **Les deux conclusions tiennent** — aucun dans `equations-differentielles`, aucun en analyse hors `calcul-integral`.* | `grep -rn '\[\[embed:' content/maths/*/lesson.md` ⇒ **5** occurrences, **aucune dans `equations-differentielles`** |
| **c** | **La figure qui porte l'idée centrale est gelée sur UNE équation.** `famille-solutions` trace $T(t)=(T_0-20)e^{-0,1t}+20$ pour $T_0 \in \{90 ; 60 ; 40 ; 0\}$ : **un seul $a$ ($-0{,}1$), un seul $b$ ($2$), un seul palier ($20$)**. Ce qui varie, c'est la condition initiale — **jamais l'équation**. | `media/famille-solutions.svg:3` (`aria-label`) et `:5-30` (l'en-tête de commentaire, qui écrit « $a = -0,1$ et $b = 2$ ») |
| **d** | **Le cluster du PALIER n'est servi que par des formules.** `palier-recopie-b` (5 étiquettes), `palier-signe` (4), `palier-oubli` (4) : **8 items sur 33 portent un modèle du palier (13 étiquettes)** — union $\{2;6;10;12;13;14;17;19\}$, **recomptée à la révision et RE-recomptée en troisième passe** — plus le point d'arrêt `cp-r2-palier`. **Les huit demandent tous de choisir une ÉCRITURE** ($Ce^{ax}+b$ contre $Ce^{ax}-b/a$…). **Aucun ne demande où la chose se trouve dans le plan.** ⚠ *La première rédaction écrivait « 13 emplacements sur 30 » — un compte d'ÉTIQUETTES divisé par un compte d'ITEMS, l'erreur d'unité que l'ADR 0039 nomme (fidélité I1). Le total d'étiquettes du fichier est **81** (74 avant la dette), pas 30.* ⚠ **Et la deuxième passe a corrigé l'unité en gardant le dénominateur d'AVANT la dette : « sur 30 » → « sur 33 » (fidélité 1bis, IMPORTANT-4). Le numérateur, lui, était juste.** | `items.yaml:2211-2218` (`coverage_summary`, sa `method`) et `:2219-2242` (les 23 lignes) ; `checkpoints.yaml:139-184` (les quatre choix de `cp-r2-palier` sont quatre formules) — ⚠ *les trois citations refaites en troisième passe : la spec citait `items.yaml:1973-1975` et `checkpoints.yaml:130-175`, qui tombent respectivement dans le retour d'`EQDIFF-31` et deux lignes avant le bloc* |
| **e** | **La leçon ÉNONCE la famille et le palier ; elle ne les fait jamais TROUVER.** R1 pose la question « une fonction, ou une famille de fonctions ? » (`lesson.md:87-91`) et y répond en prose. R2 « Arrête-toi : le palier, ce n'est PAS $b$ » (`lesson.md:180-184`) réfute par le calcul, sur un exemple, **après** avoir donné la formule. La réfutation est excellente — `REVIEW:146-147` la cite comme modèle — **et elle est entièrement verbale.** | `lesson.md:87-91`, `:180-184` ; `REVIEW-2026-09-12.md:146-147` |
| **f** | **Aucun objet de la notion ne montre l'équation AVANT sa solution.** Les quatre figures tracent des **solutions** (courbes $T(t)$, $u_C(t)$, $y=3\cos 4x+2\sin 4x$). **Rien ne dessine ce que l'équation dit d'elle-même** : une pente imposée en chaque point. Le modèle `ed-inconnue-nombre` écrit pourtant le principe mot pour mot — « *reliant $y'$ à $y$ en CHAQUE point* » — et ses 3 items sont des QCM d'écriture. | les quatre `*.stages.json` ; `items.yaml:212-215` |
| **g** | ⚠ **RECOMPTÉ APRÈS LA DETTE : la notion déclare 23 modèles pour 33 items, plancher 3, et QUATORZE modèles siègent exactement au plancher.** *Avant la dette : 22 / 30 / 15, recomptés tag par tag par les deux critiques de vague 1 (« les 22 lignes tombent juste », « le bloc de couverture le plus propre qu'elle ait audité »).* **La marge reste quasi nulle : tout retrait d'item casse un plancher.** | `items.yaml:2219-2259` ; `REVIEW-2026-09-12.md:13-17` |
| **h** | ⚠ **RECOMPTÉ : le champ `habilete` existe sur les 6 points d'arrêt et sur AUCUN des 33 items.** Le mélange d'habiletés est donc **incalculable** sur la couche qui porte le volume, **avant comme après la dette**. **NON-VERDICT déclaré** (ADR 0034), pas un vert. | `grep -c habilete content/maths/equations-differentielles/items.yaml` ⇒ **0** ; `checkpoints.yaml` ⇒ **6** *(relevé à la révision)* |

**Le geste que rien n'exerce, et que la scène rend :** régler $a$, régler $b$, poser un point,
**et regarder ce qui bouge et ce qui ne bouge pas** — la ligne plate qui se déplace avec $b$
mais pas là où $b$ est, la pente qui change avec la hauteur et jamais avec l'abscisse, les
courbes qui visent toutes le même palier d'où qu'elles partent. **Aucune figure de la notion
ne fait varier une équation** ; le seul paramètre qui varie dans tout le corpus est une
condition initiale, dans un SVG figé.

### 0.2 Pourquoi R2 et pas R1, R3 ou R4 — l'arbitrage, écrit

**Quatre mesures disent R2 (chapitre 3).**

1. **Les modèles du palier sont nombreux et le rung R2 est le plus pauvre du banc.**
   **8 items sur 33 portent un modèle du palier (13 étiquettes)** (fait **d**), et
   `ramp_coverage` (`items.yaml:2246-2253`) donne R0 4 · R1 6 · **R2 3** · R3 5 · **R4 7** ·
   R5 5 · R6 3. *La ligne R2 est la PLUS PAUVRE du banc alors que ses modèles sont parmi les plus
   servis : **les items du palier vivent dans les autres rungs**.*
   ⚠ **Ce point ne classe RIEN, et la comparaison à R4 est supprimée** (fidélité I1) : le
   cluster de l'oscillateur pèse **19 étiquettes sur 10 items distincts**
   $\{4;5;16;18;21;27;28;29;30;32\}$ — **plus lourd que celui du palier dans les DEUX unités.**
   *La première rédaction affirmait le contraire en comparant des étiquettes à des items de rung.
   **Le placement à R2 ne repose donc PAS sur ce point** : il repose sur les points 2, 3 et 4
   ci-dessous, qui sont suffisants — et un nombre faux ne doit pas porter une décision juste.*
   ⚠ **RECOMPTÉ EN TROISIÈME PASSE (fidélité 1bis, IMPORTANT-4), et la révision se contredisait
   elle-même** : elle écrivait « **18** étiquettes sur **9** items … recompté à la révision »
   alors que son propre §8 enregistrait `signe-second-membre-second-ordre` $4 \to 5$. *Le compte
   juste, relu ligne à ligne dans `items.yaml:2232-2236` : $3+5+3+4+4 = \mathbf{19}$ étiquettes,
   union de **DIX** items (`EQDIFF-32` s'y est ajouté avec la dette). **La conclusion en sort plus
   forte, pas plus faible** ; et `ramp_coverage.R4` passe de 4 à **7** dans la même ligne, que la
   révision avait laissée à 4 ici tout en écrivant 7 au §8.*
2. **R2 est le seul rung dont la réponse se VOIT.** « Le palier est $-b/a$ » est une
   **position dans le plan**. « La solution est $Ce^{ax}$ » (R1) est une écriture ; « $C$ vaut
   $y_0e^{-ax_0}$ » (R3) est un calcul ; « $r^2-3r+2=0$ » (R4) est un trinôme. **Un seul des
   sept rungs a un contenu que le plan peut trancher, et c'est celui-là.**
3. **La scène y vient AVANT la prose qui explique** (ADR 0041 §6). L'Étape 1 de R2
   (`lesson.md:132-142`) DÉMONTRE $k=-b/a$ en cinq lignes ; posée au-dessus, la scène le fait
   **parier**. Posée à R3 ou plus bas, elle arriverait après la démonstration : plus rien à
   casser.
4. **R1 est trop tôt, R4 est un autre objet.** À R1 il n'y a pas de $b$, donc pas de palier —
   la scène perdrait son cluster. À R4 l'équation est du second ordre : un champ de pentes n'y
   dit rien (il faudrait un plan de phase, hors de tout cadre, §9.7).

**Conséquence non négociable : la scène est bornée par son RANG** (précédent du tremplin,
ADR 0041, addendum du 2026-09-25, point 3). Elle n'écrit **jamais** $Ce^{ax}$, ni « solution
générale », ni « condition initiale », ni $C$, ni $y''$, ni $\omega$, ni $\tau$, ni aucune
unité physique (§9). *Le solide de révolution bornait le PROGRAMME ; le tremplin bornait la
PAGE ; ici, c'est la PAGE aussi.*

### 0.3 Ce que cette proposition NE referme pas, écrit à côté de ce qu'elle arme (ADR 0035)

- ⚠ **LE TROU MESURÉ LE PLUS LOURD DE CETTE NOTION N'EST PAS CELUI-CI, ET LA SCÈNE NE LE
  TOUCHE PAS.** `REVIEW-2026-09-12.md:94-100` (F4) : « *Le seul cas attesté dans un sujet
  vérifié est $\Delta=0$ (racine double), et il vaut **0,5 des 1,0 point** que porte la
  notion. Dans la leçon : $\Delta>0$ a l'exemple travaillé complet avec ses contrôles ;
  **$\Delta=0$ a trois lignes, aucune vérification par substitution, aucun exemple travaillé**,
  et aucun item. L'élève rencontre le seul cas que l'examen lui a posé **pour la première fois
  dans l'exercice d'examen lui-même**.* » **C'est de la prose et des items, à R4, et c'est
  routé à content-author + item-author, pas à une scène.** *Si le propriétaire doit choisir UNE
  chose à faire sur cette notion, c'est celle-là, pas celle-ci. §13.1.*
  ✅ **ÉTAT AU 2026-09-27 : CETTE DETTE EST PAYÉE.** La spec existe
  (`docs/pipeline/propositions/maths-equations-differentielles-delta-nul.md`, écrite le
  2026-09-25 : « *un exemple travaillé, un modèle d'erreur, trois items, un point d'arrêt.
  Rien d'autre.* ») **et elle est livrée** — commit **`b70f9a41`** : l'exemple travaillé de
  $y''+6y'+9y=0$, le modèle `racine-double-sans-x`, `EQDIFF-31` à `-33`, `cp-r4-racine-double`.
  *Mesuré à la révision : `total_items: 33`, `ramp_coverage.R4: 7`, 23 modèles, 6 points d'arrêt.*
  **« L'élève rencontre le seul cas que l'examen lui a posé pour la première fois dans l'exercice
  d'examen lui-même » n'est plus vrai.**
  ⚠ **Ce que ce paragraphe garde de sa forme initiale, et pourquoi :** la phrase « *si le
  propriétaire doit choisir UNE chose à faire sur cette notion, c'est celle-là, pas celle-ci* »
  **était juste, elle a été suivie, et c'est la seule raison pour laquelle cette scène peut
  aujourd'hui être discutée sur ses mérites.** *Elle reste écrite ici, au passé, parce qu'un
  document qui efface l'arbitrage qu'il a perdu perd aussi la trace de pourquoi il a attendu.*
  ⚠ **Réserve, §15.11 : je n'ai relu NI la prose NI les items de la dette — j'ai vérifié les
  COMPTES. La porte est déclarée levée sur la foi de comptes, pas d'une relecture pédagogique.**
- ⚠ **AUCUNE ANNALE VÉRIFIÉE DE CETTE NOTION NE DEMANDE $y'=ay+b$.** `bank.yaml` ne porte
  **qu'une** entrée — 2022 session normale, **SExp**, « *Résoudre $(E) : y''-2y'+y=0$* », 1,0
  point (`bank.yaml:91-102`, `:136`). L'en-tête du fichier l'écrit : « *Introuvable = absent :
  aucun autre sujet vérifié n'existe pour cette notion à ce jour* » (`:24-25`). **Ce que la
  scène prépare est un savoir-faire que les DEUX cadres listent** (`maths-sm.yaml:156`,
  `maths-sexp.yaml:154`) **et qu'aucune annale du corpus n'atteste.** Déclaré, pas maquillé.
  *Et `REVIEW:23-29` prévient : la notion ne fait **zéro** affirmation de fréquence d'examen,
  et c'est la bonne décision sur un relevé d'un seul exercice — le verbatim se termine par
  « **Ne pas en ajouter.** » **Cette spec n'en ajoute aucune**, et la prose commandée au §4 n'en
  écrira aucune.*
  🔻 ⚠ **ET ELLE EN AVAIT AJOUTÉ UNE, EN CONTREDISANT CETTE PHRASE-CI TROIS FOIS
  (fidélité 1bis, BLOCKING-2).** *La consigne de S6 écrivait : « *Une dernière chose, et c'est un
  piège que **l'examen** connaît.* » **Aucune preuve de cela n'existe** : la seule annale vérifiée
  est du second ordre et ne pose pas $y'=ay+b$ (ci-dessus). La phrase contredisait **ce
  paragraphe**, **le §10.2** (« la scène n'entraîne à AUCUN geste d'examen ») et
  **`REVIEW:23-29`**. *Et le grep des relecteurs — `chaque année|presque toujours|le plus
  courant|souvent|revient` — **ne l'aurait pas attrapée** : une chose n'est prouvée absente que si
  l'on a énuméré ses FORMES (ADR 0036).* **Réparé en deux temps : la clause est supprimée (§7.6),
  et la forme est ARMÉE — §9.12 est une frontière neuve, avec sa sonde et son essai rouge, pour
  que cette classe ne puisse pas revenir par relecture.***
- **Le champ de pentes N'EST UN OBJET D'AUCUN DES DEUX CADRES.** Ni `maths-sm.yaml:152-159`
  ni `maths-sexp.yaml:150-159` ne nomment un champ de pentes, un champ de directions, une
  courbe intégrale ou une isocline. **La scène enseigne donc du contenu de cadre (le palier,
  la famille, le signe de $a$) à travers une représentation qui n'est pas au cadre.**
  Conséquence dure, portée au §9.6 et au §13.2 : **aucun item ne testera jamais la lecture
  d'un champ de pentes**, et le panneau ne laissera jamais croire que l'examen la demande.
- **Les deux fichiers de cadre maths sont des PROPOSITIONS NON AUTORITATIVES**
  (`maths-sm.yaml:12`, `maths-sexp.yaml:10`), aucune des trois portes de RULES §5 n'est
  passée, et le PDF officiel est un scan sans couche texte — **donc aucune citation `cadre
  p.N` n'existe pour maths**. §1 le porte en tête. §13.3.
- **Le désaccord de filière de la notion n'est pas tranché, et la scène ne le tranche pas.**
  ⚠ **Citation refaite TROIS FOIS, et c'est la troisième qui est juste** (fidélité 1bis,
  IMPORTANT-3 ; **relue ligne à ligne contre le fichier tel qu'il est aujourd'hui**). Le texte est
  à **`lesson.md:580-582`**, **à l'intérieur du commentaire HTML
  `<!-- NOTE DE VALIDATION (relecture humaine)` ouvert à `:562` et fermé à `:596`** — donc dans
  une **note d'auteur que l'élève ne voit jamais**, pas dans la leçon. *(Historique, parce qu'il
  enseigne quelque chose : la première rédaction citait `:519-522` ; la vague 1 corrigeait en
  `:502`/`:523`, **justes contre le fichier d'AVANT la dette** ; la deuxième passe a déclaré ces
  deux numéros faux et posé `:538`/`:572`/`:556-558`, **qui ne correspondent à aucun des deux
  états du fichier**. La dette a inséré **60 lignes** au-dessus de R5 : $562-60=502$,
  $583-60=523$. **Le JUGEMENT du critique était juste depuis le début ; c'est mon arithmétique de
  décalage qui a tenu lieu de relecture.*** Verbatim : « *Reste ouvert, en
  revanche, le desaccord de filiere : cette note dit SM, alors que checkpoints.yaml,
  exercises.yaml et bank.yaml declarent SExp — et que le seul sujet verifie de la notion est un
  sujet SExp.* » **Reste dû.**
- **Le cadre est PÉRIMÉ sur le second ordre, et c'est le cadre qui a tort.**
  `REVIEW-2026-09-12.md:71-90` (F2 → research-lead) : `maths-sexp.yaml:158` et `:307`
  interdisent l'équation générale du 2ᵉ ordre en SExp, **et le seul sujet vérifié, SExp, la
  demande**. **Hors périmètre de cette scène** (qui est du premier ordre), **cité pour que
  personne ne croie l'arbitrage clos.**
- **Le champ `habilete` reste absent des 33 items** (fait **h**) : le mélange 50/35/15 (SExp)
  ou 40/40/20 (SM) est **incalculable avant comme après cette livraison**. **NON-VERDICT**,
  pas un vert. Adjugé corpus-wide (`REVIEW:119-120`).
- **Le sidecar « à retenir » est absent** (`REVIEW:127-132`, F-11) : le chapitre 4 retombe sur
  $T(t)=70e^{-0,1t}+20$ — la réponse d'une tasse de café, pas une méthode. **Hors scène.**
  Reste dû.
- **17 des 22 modèles ne sont pas rompus en prose et aucune spec ne consigne la délégation**
  *(compte de `REVIEW`, établi avant la dette $\Delta=0$ ; l'inventaire en porte **23** depuis —
  et la dette a livré la spec d'un rung, donc **deux** des sept rungs en ont une : R2 ici, R4 là)*
  (`REVIEW:105-109`, F-1/F-3/F-8). **Cette spec n'est pas le `spec.md` de la notion** : elle
  revendique **onze** modèles pour un rung et laisse les onze autres non revendiqués. §13.4.

---

## 1. Le cadre (la frontière officielle, lue avant tout le reste)

> ⚠ **RÉSERVE DE PROVENANCE, à porter dans tout ce qui descend de ce document.** Les deux
> fichiers de cadre maths portent en en-tête **« STATUT : PROPOSITION — NON AUTORITATIVE »**
> (`maths-sm.yaml:12-17`, `maths-sexp.yaml:10-16`) et **aucune de leurs trois portes n'est
> passée**. Les `savoir_faire`, **toutes** les `limites` et **toutes** les `exclusions` y sont
> marqués `source: derived` — reconstruits, **non vérifiés verbatim**. Je **ne corrige pas** et
> **ne contourne pas** ces fichiers (RULES : le cadre est autoritatif, une objection se
> signale) ; je **les signale** : *les frontières du §9 sont aussi solides que ces fichiers, et
> pas davantage.* **À faire valider par l'humain avant construction** (§13.3).
> *Et une réserve de plus, propre à CETTE notion : la vague 1 a démontré que le cadre est FAUX
> sur le second ordre SExp (`REVIEW:71-90`). Un fichier dont on a déjà prouvé qu'il se trompe
> une fois est un fichier qu'on cite en le disant.*

- **Filière / matière :** **deux** filières concernées — `sciences_mathematiques` (SM-A/SM-B)
  et `sciences_experimentales` (Sciences Physiques **et** SVT) / `mathematiques`.
  ⚠ **La seule annale de la notion est `filiere: "SExp"`** (`bank.yaml:100`). **Toute la preuve
  d'examen citée ici est donc SExp** — et elle porte sur le second ordre, pas sur l'objet de
  cette scène (§0.3).
- **Domaine → sous-domaine → chapitre :**
  - **SM** : `analyse` → `derivation_etude_fonctions` → **`equations_differentielles`**
    (`maths-sm.yaml:149-159`).
  - **SExp** : `analyse` → `continuite_derivation_fonctions` → **`equations_differentielles`**
    (`maths-sexp.yaml:147-159`).
- **Poids :**
  - **SM** — domaine `analyse` : **`part_examen: 50`** (`maths-sm.yaml:55`). Le sous-domaine
    `derivation_etude_fonctions` porte `poids: { part_domaine: "Analyse", note: "sous-domaine
    le plus lourd (20 capacités, pdfmath)" }` (`:105`) — **aucun `part_examen` chiffré au
    sous-domaine, et aucun au chapitre.**
  - **SExp** — domaine `analyse` : **`part_examen: 55`** (`maths-sexp.yaml:52`). Sous-domaine
    `continuite_derivation_fonctions` : « *sous-domaine le plus lourd de l'Analyse (24
    capacités, pdfmath)* » (`:84`) — **aucun chiffre plus fin.**
  - ⚠ **Le partage interne de l'Analyse n'est publié à aucune granularité** (`maths-sexp.yaml:58`
    le dit en toutes lettres). **Il n'existe donc AUCUN `part_examen` attribuable aux équations
    différentielles.** Le seul chiffre mesuré dont on dispose est celui de l'annale : **1,0
    point sur 20** (`bank.yaml:102`, `bareme_total: 1`), et `REVIEW:31-33` juge ce poids léger
    **juste** : « *ce chapitre pèse 1 point sur 20 dans le seul sujet vérifié. Le « gonfler »
    éloignerait de l'examen.* » **Cette spec ne le gonfle pas.**
- **Habiletés (la cible chiffrée de l'item-author, et le nombre que le critique de fidélité
  doit mesurer) :**
  - **SM** (`maths-sm.yaml:39-42`, recoupé `bac-reference.md:93-94`) : **application directe
    40 % · application non explicite 40 % · synthèse en situation inhabituelle 20 %.**
    *Coefficient 9, 4 h (`:36-37`).*
  - **SExp** (`maths-sexp.yaml:40-43`, recoupé `bac-reference.md:95-96`) : **50 % · 35 % ·
    15 %.** *Coefficient 7 (contesté 7-vs-5), 3 h (`:37-38`).*
  - **NON-VERDICT DÉCLARÉ** : `habilete` n'existe sur aucun des 33 items (fait **h**), donc
    **le rapport n'est calculable ni avant ni après cette livraison**. *Et cette livraison
    n'ajoute AUCUN item (§8.2), donc elle ne le déplace pas — ce qui est, pour une fois, la
    seule chose honnête qu'on puisse dire d'un rapport incalculable.*
- **`competences_ciblees` du sous-domaine :**
  - SM (`:107`) : « *Étudier une fonction […] et **résoudre les équations différentielles
    $y'=ay+b$ et $y''+ay'+by=0$**.* »
  - SExp (`:86`) : « *Étudier une fonction numérique […] et **résoudre des équations
    différentielles simples issues notamment de la physique**.* »
- **`programme` du chapitre, cité entier :**
  - SM (`maths-sm.yaml:153-154`) :
    > « **Équations $y'=ay$ et $y'=ay+b$ : solutions, condition initiale.** »
    > « Équation linéaire du second ordre à coefficients constants $y''+ay'+by=0$ : équation
    > caractéristique, forme des solutions selon le discriminant (cas $y''+\omega^2y=0$
    > inclus). »
  - SExp (`maths-sexp.yaml:151-152`) :
    > « **Équation $y'=a\cdot y$ ; équation $y'=a\cdot y+b$ : ensemble des solutions, solution
    > vérifiant une condition initiale.** »
    > « Équation de l'oscillateur $y''+\omega^2\cdot y=0$ : forme des solutions, condition
    > initiale (lien avec la physique : RC, RL, oscillateur). »

  *Les deux filières écrivent **$y'=ay+b$** à l'identique. C'est l'objet de cette scène, et
  c'est le seul objet de la notion que les deux cadres nomment de la même façon.*
- **Les `savoir_faire` que chaque étape sert :**
  1. SM (`:156`) « **Résoudre $y'=ay+b$ avec condition initiale.** » → **S3, S4, S5**
     (le palier à S3, le comportement à S4, la famille à S5).
  2. SExp (`:154`) « **Résoudre $y'=ay$ et $y'=ay+b$ ; déterminer la solution vérifiant une
     condition initiale.** » → **S1, S2** (la lecture locale de $y'=ay$), **S3, S4, S5**.
  3. SExp (`:156`) « Reconnaître, dans un contexte physique (charge/décharge, oscillateur),
     l'équation différentielle correspondante. » → **hors scène** : c'est R5, et c'est la
     frontière avec la physique du §9.3.
  4. SM (`:157`) « Écrire et résoudre l'équation caractéristique de $y''+ay'+by=0$ […] » →
     **hors scène** : c'est R4 (§9.2), et c'est le trou mesuré du §0.3 que cette scène ne
     referme pas.
- **`limites` portées en dur :**
  - SM (`maths-sm.yaml:158-159`, `source: derived`) :
    > « **SM : équation caractéristique du 2e ordre à coefficients constants et SANS second
    > membre. Pas de second membre non constant (pas de solution particulière/variation de la
    > constante générale).** »
  - SExp (`maths-sexp.yaml:157-159`, `source: derived`, avec un `_flag_derive_fort`) :
    > « **Uniquement : $y'=ay+b$ (1er ordre, coefficients constants) et $y''+\omega^2y=0$ (2e
    > ordre SANS terme du 1er ordre). PAS de $y''+ay'+by=0$ générale (avec amortissement) […]
    > PAS de second membre non constant, pas de variation de la constante.** »

  **Quatre conséquences non négociables :**
  1. **$b$ est une CONSTANTE, à tous les crans, à toutes les étapes** — aucun second membre
     dépendant de $x$, jamais (§9.6). *C'est la seule `limite` des deux cadres qui morde
     directement sur le premier ordre, et elle mord ici : un champ de pentes rend un second
     membre variable trivialement dessinable, donc tentant.*
  2. **Aucune variation de la constante, aucune séparation des variables, aucune intégration**
     (§9.6). *La leçon résout par la fonction auxiliaire $z=ye^{-ax}$ (`lesson.md:65`) et par
     le changement $z=y-y_p$ (`:148`) ; la scène ne résout pas du tout.*
  3. **Aucun second ordre** : ni $y''$, ni $\omega$, ni équation caractéristique, ni
     discriminant (§9.2). *La scène est du premier ordre, et un champ de pentes ne dit rien
     d'une équation du second ordre.*
  4. **Le cas $a=0$ est hors du cadre de CE CHAPITRE et n'est pas un cran** : la leçon l'écarte
     elle-même (`lesson.md:142` : « *l'équation $y'=b$ se traite directement comme une primitive
     constante, hors du cadre de ce chapitre* »), et $-b/a$ n'y a pas de sens (§9.6).
     ⚠ **FORMULATION CORRIGÉE EN TROISIÈME PASSE (fidélité 1bis, MINOR-11), et la distinction est
     exactement celle que ce document impose partout ailleurs** : *la révision écrivait « **hors
     cadre** » tout court. **Aucun des deux fichiers de cadre ne dit quoi que ce soit de
     $a \neq 0$** ; ce qui l'écarte est la LEÇON, plus le fait que la division n'a pas de sens.
     Le §9.9 l'attribuait correctement ; ce paragraphe-ci ne le faisait pas. **Une exclusion de
     chapitre et une exclusion de cadre ne se citent pas de la même façon.***
- **`exclusions_transversales` : elles existent, au NIVEAU DU FICHIER (pas du sous-domaine).**
  **7 entrées** dans `maths-sm.yaml:340-347`, **8** dans `maths-sexp.yaml:300-308`, toutes
  `source: derived — À VALIDER`. **Deux mordent ici**, et elles sont portées en dur au §9 :
  1. `maths-sexp.yaml:307` — « *Équation différentielle $y''+ay'+by=0$ générale (avec
     amortissement) : SExp limité à $y'=ay+b$ et $y''+\omega^2y=0$ ; le cas amorti relève de
     SM.* » → **§9.2** *(et c'est l'exclusion que `REVIEW:71-90` démontre FAUSSE ; la scène ne
     s'en approche pas, donc le désaccord ne l'atteint pas).*
  2. `maths-sm.yaml:341` — « *Développements limités / formule de Taylor : hors 2e Bac* » et
     `maths-sm.yaml:342` — « *Intégrales impropres / généralisées* » → **§9.6** (les deux
     formes qu'un champ de pentes met à portée de main : l'approximation locale et
     l'intégration).

  *Aucune exclusion propre au sous-domaine n'existe ; la granularité diffère de
  `pc-physique-chimie.yaml`, qui porte des `exclusions` par sous-domaine. **Même constat que la
  spec sœur, même routage à research-lead**, et pas une objection de plus. §13.3.*
- **La frontière qui mord le plus fort est INTERNE, et elle est triple.**
  1. **Le rang dans la leçon.** La scène est en tête de **R2 (chapitre 3)**. À cet endroit
     l'élève a lu R0 (la tasse, $T'=-k(T-20)$, le point d'arrêt `cp-r0-predict`) et R1
     ($y'=ay$, la preuve de complétude, $Ce^{ax}$, le sens du signe de $a$, `cp-r1-signe-a`) —
     **et rien d'autre**. Il n'a lu ni $y_p=-b/a$, ni la solution générale de $y'=ay+b$, ni la
     méthode de la condition initiale, ni le second ordre.
  2. **$Ce^{ax}$ est un ACQUIS, pas un objet — et la scène ne l'écrit JAMAIS.** La solution de
     $y'=ay$ est établie et encadrée à `lesson.md:83`. La scène **dessine des courbes** ; elle
     **n'écrit aucune formule de solution**, à aucune étape (§9.1). *Motif : la formule de R2
     est exactement ce que la prose qui suit démontre. Une scène qui l'écrirait volerait la
     démonstration ; une scène qui dessine la met en appétit.*
  3. **La constante $C$ n'existe pas dans la scène.** Ni la lettre, ni la valeur, ni le mot
     « constante d'intégration ». *C'est le cœur de R3 (chapitre 4), et la lettre `C` est déjà
     un point de friction de la notion — **`lesson.md:478`** note que la capacité est écrite $C_0$
     « pour ne pas la confondre avec la constante d'intégration ». *(⚠ citation refaite en
     troisième passe : `:418` était la ligne d'avant la dette.)**

---

## 2. Pourquoi un manipulable — et ce qu'aucun média existant ne fait

### 2.1 Les quatre médias de la notion, mesurés un par un

| média | rung | ce qu'il montre | ce qu'il ne peut pas faire |
|---|---|---|---|
| `refroidissement-modeles` (4 étapes) | **R0** | les quatre mesures, le modèle A (droite qui s'arrête net à 12,7 min), le modèle B (la courbe qui ralentit) | **une seule équation**, une seule tasse, un seul palier ($20$). Aucun réglage. Et c'est une figure de MODÉLISATION : elle ne montre aucune équation différentielle, seulement deux courbes candidates |
| `famille-solutions` (3 étapes) | **R3** | **la figure la plus proche de cette scène** : quatre solutions de $T'=-0{,}1T+2$, pour $T_0 \in \{90;60;40;0\}$, convergeant vers le palier $20$ tracé en pointillés | **$a$ et $b$ sont gelés** ($-0{,}1$ et $2$). Ce qui varie est la condition initiale. **La ligne du palier ne se déplace donc JAMAIS** — et c'est précisément la chose que les 13 items du palier demandent de calculer. Aucun réglage |
| `oscillateur-periode` (3 étapes) | **R4** | $y=3\cos 4x+2\sin 4x$, la période $\pi/2$, l'amplitude $\sqrt{13}$ | autre objet (second ordre), hors scène (§9.2) |
| `rc-charge-decharge` (3 étapes) | **R5** | la charge $E(1-e^{-t/RC_0})$ et la décharge $U_0e^{-t/RC_0}$, le palier $E$ en pointillés | autre rung, et **en habits physiques** : hors scène (§9.3) |

**Le constat, et il est exact : aucune figure de la notion ne fait varier une ÉQUATION.** La
seule chose réglable de tout le corpus est une condition initiale, dans un SVG figé, sur une
seule équation, à R3.

### 2.2 Le motif central : une équation qui parle en chaque point, et une ligne plate qui n'est pas là où on croit

Le point que la scène existe pour installer, en une phrase :

> $y'=ay+b$ ne donne pas une courbe : elle donne, **en chaque point du plan**, une pente — et
> cette pente ne dépend **que de la hauteur $y$**, jamais de l'abscisse. Là où cette pente
> s'annule, il y a une **ligne plate** : c'est le palier, il est à la hauteur $-\dfrac{b}{a}$,
> **et ce n'est pas $b$**. Toutes les solutions visent cette même ligne, d'où qu'elles
> partent, et aucune ne la franchit.

**Quatre raisons mesurées pour lesquelles aucune figure ne peut le montrer.**

1. **« Le palier est $-b/a$, pas $b$ » ne se voit pas sur un exemple.** Sur
   `famille-solutions`, $b=2$ et le palier vaut $20$ : les deux nombres sont si éloignés que
   rien ne se joue. Il faut **garder $a$ et promener $b$** et voir la ligne plate se déplacer
   **d'un facteur $-1/a$**, ou l'inverse. Une figure ne fait ni l'un ni l'autre. *Et le corpus
   mesure ce modèle cinq fois (`palier-recopie-b`, 5 items) — c'est le plus couvert des 22.*
2. **Le cas où le modèle faux tombe JUSTE existe, et il est exactement identifiable.** La
   leçon l'écrit en toutes lettres (`lesson.md:184`) : « *si $y(x)=Ce^{ax}+b$ était solution,
   l'identification des deux membres imposerait $b(a+1)=0$ — donc $b=0$ ou $a=-1$
   seulement.* » **Sur la grille de la scène, $a=-1$ est le seul cran où le palier vaut $b$
   à chaque $b$** (§5.3 A). Faire TROUVER cette ligne-là — « le seul réglage où la règle fausse
   ne se fait pas prendre » — est impossible sur une figure, et c'est le geste qui transforme
   une règle apprise en une règle comprise.
   ⚠ **Réparé en vague 1 (BLOQ-1) : ce geste est désormais un PARI, et il a son étape, S6**
   (§7.7). *La première rédaction l'IMPRIMAIT dans la `suite` de S4 (« *la ligne plate tombe sur
   la valeur de $b$ à chaque cran. Cherche pourquoi* ») — c'est-à-dire qu'elle livrait par
   assertion la seule chose que la scène existe pour faire trouver.* **Et la tension avec le
   garde-fou de stem est résolue, pas contournée : le pari de S6 demande POUR QUEL $a$, l'état
   posé est $a=-0{,}5$, et $a=-1$ est la RÉPONSE** — donc **le cran $a=-1$ n'est toujours l'état
   d'AUCUN pari** (§5.2 A, §7.6 E), et aucun choix qui atteindrait la bonne réponse par
   `palier-recopie-b` n'existe (le porteur de ce modèle à S6 répond « *à tous les crans* », qui
   est faux).
3. **« La pente ne dépend que de $y$ » est une NON-observation.** On ne peut pas la dessiner
   d'un trait : il faut **regarder deux points à la même hauteur et constater qu'ils portent le
   même segment**, puis deux points à la même abscisse et constater qu'ils n'en portent pas le
   même. C'est exactement le geste que `orbite-geostationnaire` a rendu (« il ne bouge pas au
   pixel près ») et qu'aucune figure plane ne peut porter. *Et c'est le mécanisme de R0 :
   « c'est l'**écart** qui pilote la vitesse » (`lesson.md:31`) — écrit une fois, en prose,
   jamais montré.*
4. **« Toutes visent le même palier » est montré sur UNE équation, et c'est le problème.**
   `famille-solutions` le montre — pour $a=-0{,}1$, $b=2$. Un élève peut en sortir en croyant
   que le palier est une propriété de CETTE tasse. La scène le lui fait vérifier sur **les douze
   équations de la grille** — ⚠ *dont **huit** sont atteignables au clic à S5 et **les douze à
   S6**, où le contrôle `a` expose ses trois crans après la révélation (§5.2 A, §5.5 : le cran
   dégénéré n'est offert qu'à S6). **La réponse au « c'est la propriété de CETTE tasse » est déjà
   tranchée par huit ; les douze sont atteintes avant la fin de la scène.***

**Et la leçon pose les deux moitiés sans jamais les opposer.** R1 donne la famille $Ce^{ax}$
et son comportement ; R2 donne le palier par le calcul ; **rien, nulle part, ne met les deux
dans le même plan sous les yeux de l'élève avant `famille-solutions`, qui arrive à R3, après
que tout a été démontré.**

### 2.3 L'antidote obligatoire : une chaîne construite en SIX temps

$y'=ay+b$ contient quatre réponses (la pente locale, l'invariance en $x$, le palier, le
comportement) ; un retour trop bavard les donne toutes d'un coup. Même discipline qu'au banc
de diffraction (règle `formule-graduee` ; ADR 0041, addendum du 2026-09-24 nuit : *la relation
est un ÉTAT qui fuit*). **La frontière se pose ÉTAPE PAR ÉTAPE, consigne ET retours ET
lectures** — une consigne a le droit d'imprimer ce que son propre énoncé exige.

- **S1** établit que l'équation impose une pente **en un point**, et que cette pente se calcule
  avec le coefficient ET la hauteur. Aucun $b$, aucun palier, aucune courbe.
- **S2** ajoute l'**invariance en $x$** : deux points de même hauteur portent la même pente.
  Il ne peut ni parler de palier, ni tracer une courbe.
- **S3** ajoute le **palier** : $b$ apparaît, et la ligne plate est à $-\dfrac{b}{a}$. Il ne
  peut tracer aucune courbe.
- **S4** ajoute la **courbe** et son comportement : elle s'approche du palier sans l'atteindre,
  et le signe de $a$ décide si elle s'en approche ou s'en écarte. Il ne peut pas montrer
  plusieurs courbes.
- **S5** ajoute la **famille** : plusieurs courbes, un seul palier, aucune intersection.
- **S6** ajoute le **cran où la règle fausse se cache** : il existe un $a$, et un seul, pour
  lequel « le palier, c'est $b$ » tombe juste à chaque $b$. *Il ne peut rien ajouter d'autre :
  c'est le dernier temps, et il ne fait que **fermer** le modèle le plus servi de la notion.*

**Contrainte non négociable et mesurable. La table du §7.6 C est la SEULE autorité ; ce qui
précède en est un résumé et ne doit jamais la contredire** (correctif de vague 1 de la spec
sœur, fidélité S10) : `b`, `palier`, `ligne plate`, `-\dfrac{b}{a}` pas avant **S3** ;
toute COURBE tracée pas avant **S4** ; plus d'une courbe pas avant **S5** ; **le fait
« il existe un $a$ où le palier vaut $b$ » pas avant la révélation de S6** ; et **à toutes les
étapes**, les chaînes du §9. La porte le lit dans le `textContent` **rendu**, en remplaçant
chaque `.katex` par son **annotation TeX** (leçon du banc d'électrolyse).

### 2.4 Ce que le bac demande, et que le corpus ne fait pas faire

⚠ **Cette table est plus courte que celle de la spec sœur, et c'est un fait, pas une
omission : la notion ne porte QU'UNE annale vérifiée, et elle ne traite pas $y'=ay+b$**
(§0.3). Les deux premières lignes viennent donc du **cadre**, pas d'annales.

| geste | où il est demandé | ce que le corpus en fait |
|---|---|---|
| **Résoudre $y'=ay+b$ (donc trouver le palier)** | `maths-sm.yaml:156` et `maths-sexp.yaml:154`, savoir-faire des DEUX cadres | **8 items (13 étiquettes)**, **tous en choix d'écriture** ; un point d'arrêt, **quatre formules** ; une figure, **un seul palier gelé** (§0.1 d, c) |
| **Reconnaître qu'une équation ne fixe qu'une famille** | `maths-sm.yaml:153` / `maths-sexp.yaml:151` (« ensemble des solutions ») | R1 l'énonce en prose (`lesson.md:87-91`) ; `famille-solutions` le montre sur une équation, à R3, **après la démonstration** |
| **Résoudre $y''+ay'+by=0$ (cas $\Delta=0$)** | **la seule annale vérifiée** : `bank.yaml:136`, 0,5 pt sur les 1,0 de la notion | **trois lignes de prose, aucun exemple travaillé, aucun item** (`REVIEW:94-100`) — **et ce n'est pas le travail de cette scène** (§0.3, §13.1) |

### 2.5 Ce que la scène ne double pas

- **`famille-solutions`** (R3) : une équation figée, la condition initiale seule variable, et
  **placée trois rungs plus bas**. La scène est générique et réglable ; la figure est l'ancrage
  de la tasse de café. *Recouvrement partiel et VOULU sur un seul fait (« toutes visent le même
  palier »), sur deux objets différents : la scène le fait TROUVER sur les douze équations de la
  grille à R2 *(huit atteignables à S5, les douze à S6 — §5.5)*, la
  figure le CONSIGNE sur celle de la leçon à R3. §7.5 le vérifie ligne à ligne.*
- **`cp-r2-palier`** (`checkpoints.yaml:139-184`, après R2) : quatre **écritures**
  ($Ce^{4x}+2$, $-8$, $-2$, rien). La scène pose un **lieu** (à quelle hauteur le champ est-il
  plat ?). *Complémentaires, jamais doublons — et le §7.5 le vérifie choix par choix, comme la
  spec sœur a dû le faire après la vague 1.*
- **`cp-r0-predict`** (R0) : les deux modèles de refroidissement, en mots. La scène ne rejoue
  ni la tasse, ni les degrés, ni les minutes (§9.3).
- **`rc-sandbox`** (`pc/rc-charge`, embed PhET) et **`sandbox-chute-frottement`**
  (`pc/chute-mouvements-plans`, SVG + curseur) : **la même équation, en habits physiques,
  dans une autre matière.** §9.3 écrit la frontière et §13.6 la question.
- **`plan-complexe-transformation`, `sphere-plan-droite`, `produit-vectoriel`,
  `solide-revolution`** : autres notions, autres objets. Aucun recouvrement.

### 2.6 Trois idées volontairement écartées

- **L'échelle de temps $-\dfrac{1}{a}$, ÉCARTÉE — et c'était dans le titre de travail.**
  *Trois motifs mesurés.* **(a)** Aucun des deux cadres ne nomme une constante de temps côté
  maths : `maths-sm.yaml:153-157` et `maths-sexp.yaml:151-156` n'écrivent ni $\tau$, ni
  « constante de temps », ni « temps caractéristique ». **(b)** Dans CETTE leçon, $\tau$
  n'apparaît qu'à **R5**, en physique (**`lesson.md:520`** : $\tau=L/R$ — *citation refaite en
  troisième passe, `:460` était la ligne d'avant la dette*), et le modèle `tau-inverse`
  est un modèle de R5 (items EQDIFF-17, -28, -30). Le porter à R2 serait un écart de phase de
  **trois rungs** — exactement ce que la vague 1 du banc d'électrolyse a refusé. **(c)** Le
  seul mot de la leçon pour cette idée est déjà pris par la physique. **Pour défaire :** §13.5
  donne le chemin (une sixième étape en tête de R5, ou une scène PC). *Ce qu'on perd est réel
  et il est écrit : la scène montre QUE la courbe s'approche du palier, jamais À QUELLE
  VITESSE.*
- **Un point $P$ librement déplaçable à la souris, ÉCARTÉ.** Avec un $(x_0;y_0)$ quelconque,
  **aucune lecture n'est exacte** : la pente devient un décimal arbitraire, l'écart au palier
  aussi. *La valeur pédagogique de cette scène tient à ce que tout nombre affiché est exact
  (§5.4).* **Cinq positions discrètes**, choisies pour cela. *§13.7 — et contrairement à la
  scène sœur, **aucun balayage muet n'est proposé ici** : ce que le continu dirait (« la pente
  varie sans à-coup avec la hauteur ») est déjà dit par le champ tout entier, qui est un
  continuum discrétisé. Un balayage n'ajouterait rien qu'un cran n'ajoute.*
- **Une animation de la courbe qui se construit pas à pas depuis le champ, ÉCARTÉE.**
  `temps: false`, `course: false`. *Deux motifs.* **(a)** Le mouvement n'est jamais une raison
  (ADR 0041 §1). **(b)** Plus grave : une courbe **construite pas à pas en suivant les
  segments** EST la méthode d'Euler — au programme de `pc/chute-mouvements-plans`
  (`pc-physique-chimie.yaml:284`) et **de AUCUN des deux cadres maths**. Ce serait une scène
  qui glisse hors du cadre en donnant l'impression d'expliquer. **Interdit au §9.6, avec sa
  sonde.** *§13.8.*

---

## 3. Placement

⚠ **DÉPLACÉ EN VAGUE 1 (pédagogie I8).** **Après `lesson.md:124`, avant
`### Poser l'équation générale` (`lesson.md:126`)** — c'est-à-dire **après** le paragraphe qui
motive l'existence d'un terme constant, **avant** toute prose qui l'explique.

*Motif, relu ligne à ligne à la révision.* `lesson.md:120-124` est **exactement** le temps
« pourquoi un terme constant existe » : $T'(t) = -kT(t) + 20k$, puis « *Ce n'est **pas** de la
forme $y'=ay$ : il traîne un terme constant, $20k$ […] le café ne se refroidit pas vers
$0\ °\text{C}$, mais vers la température de la pièce […] un **palier** non nul.* » **Posée
au-dessus (l'ancien `lesson.md:116`), la scène ouvrait S3 sur « *Un terme constant est
apparu* » — une mutation algébrique sans raison**, ce que VISION §« concret avant abstrait »
refuse. Posée ici, $b$ arrive motivé, et **la démonstration de $-b/a$ (`lesson.md:132-142`) suit
toujours la scène** : ADR 0041 §6 (« *la scène vient AVANT la prose qui explique* ») est intact.

> ⚠ **LE COÛT, DÉCLARÉ.** `lesson.md:124` écrit le mot **« palier »** et le fait qu'il est
> **« non nul »**. Le distracteur `zero` de S3 (« *à la hauteur $0$* », `palier-oubli`) en est
> **affaibli** : l'élève vient de lire que le palier n'est pas $0$.
> *Ce que cela ne change pas :* (a) **R0 l'écrivait déjà** — la tasse « *ne descend jamais sous
> $20$* » est au-dessus du marqueur dans les deux placements, donc `zero` était **déjà**
> affaibli ; (b) `zero` ne meurt pas, il mesure l'élève qui **transporte R1 sans $b$**, et c'est
> un transport, pas une lecture ; (c) **rien dans `:120-124` ne donne la HAUTEUR**, qui est la
> question de S3. *Arbitrage : un $b$ motivé vaut mieux qu'un distracteur au maximum de sa
> force. Réversible en une ligne — §13.17 le met au propriétaire.*

*Ancien placement, pour mémoire : en tête de `## R2` (`lesson.md:116`), entre le titre et
`### Pourquoi $y'=ay$ ne suffit pas toujours` (`lesson.md:118`).*

Ligne exacte à insérer (seule sur sa ligne, comme l'exige `MARKER_LINE`) :

```
[[embed:champ-des-pentes]]
```

précédée du paragraphe d'annonce neutre du §4.1.

**Pourquoi là, et pourquoi pas ailleurs** (ADR 0041 §6 : *la scène vient AVANT la prose qui
explique*).

Vérification étape par étape contre **tout** ce qui est lu au marqueur — la prose
`lesson.md:1-124` (R0, R1, **titre de R2 et le paragraphe du terme constant compris**)
**et** les retours des deux points d'arrêt situés au-dessus, `cp-r0-predict`
(`checkpoints.yaml:28-81`) et `cp-r1-signe-a` (`:83-128`).

⚠ **Une colonne DE PLUS qu'à la première rédaction** (pédagogie M8) : la table ne vérifiait
que ce qui est **déjà lu au-dessus** du marqueur, jamais **ce qu'un rung ULTÉRIEUR doit encore
posséder en propre**. *Une scène qui ne vole pas le passé peut très bien voler l'avenir.*

| étape | ce qui répondrait | où | déjà lu au marqueur ? | **ce qu'un rung PLUS TARD doit garder** |
|---|---|---|---|---|
| **S1** — la pente en un point vaut $a\,y$ | **nulle part.** R1 dérive $Ce^{ax}$ et vérifie $y'=ay$ (`lesson.md:57`), mais **toujours sur la fonction, jamais en un point du plan**. Le principe est écrit dans un registre de misconception (`items.yaml:212-215`), que l'élève ne lit pas | — | ❌ **non** | rien |
| **S2** — la pente ne dépend que de la hauteur | **la règle est DÉRIVABLE** en une ligne de $y'=ay$ ; **mais la lecture « deux points à la même hauteur portent le même segment » n'est écrite nulle part**, et R0 pose explicitement la question inverse (« le rythme a changé du tout au tout », `lesson.md:25`) sans jamais dire de quoi il dépend en un point | — | ❌ **non** *(le mécanisme est à `lesson.md:31`, en mots, sur la tasse ; sa lecture dans un plan, jamais)* | rien |
| **S3** — le palier vaut $-\dfrac{b}{a}$ | `lesson.md:132-142` (Étape 1 de R2) | **R2, APRÈS** le marqueur | ❌ **non** | **la DÉMONSTRATION** ($0=ak+b$ pour tous $a$, tous $b$) reste à la prose : la scène en montre **une trace sur les douze équations de la grille**, jamais la preuve (§4.1 d). *⚠ À S3 elle-même, seules les **quatre** équations à $a=-0{,}5$ sont atteignables — `a` y est fermé ; les douze le sont à S6 (§5.5). **Ce qui ne change rien à la conclusion : une trace n'est pas une preuve, que ce soit sur quatre ou sur douze.*** |
| **S4** — la courbe s'approche du palier sans l'atteindre ; le signe de $a$ décide | ⚠ R0 l'écrit **pour la tasse** : « *sans jamais l'atteindre tout à fait* » (`lesson.md:13`, modèle B, et `:29`) ; et R1 « Le sens du signe de $a$ » (`:93-100`) donne $a<0 \Rightarrow e^{ax}\to 0$ | **AVANT**, pour $b=0$ et pour une tasse | ⚠️ **partiellement lu — coût déclaré ci-dessous** | la **limite** comme objet ($\lim_{x\to+\infty}$) et la **vitesse** d'approche ($-1/a$, R5) : la scène ne les nomme jamais (§2.6, §9.3) |
| **S5** — un seul palier pour toute la famille ; aucune intersection | ⚠ R1 « une fonction, ou une famille de fonctions ? » (`:87-91`) établit **l'infinité de solutions** et annonce qu'une information de plus est nécessaire. **Il n'écrit ni « exactement une par point », ni « elles ne se coupent jamais », ni « elles partagent le palier »** — ce dernier n'arrive qu'à `:256`, à R3 | **AVANT**, pour la moitié | ⚠️ **partiellement lu — coût déclaré** | ⚠ **R3 doit garder « une valeur en un point fixe la constante ».** La première rédaction le livrait mot pour mot dans le retour de `se-coupent` (« *un point donné ne détermine qu'une seule solution* ») — **supprimé** (fidélité I3, pédagogie M8) : S5 énonce l'**observation** et **renvoie** au chapitre 4 (§7.5) |
| **S6** — il existe un $a$, et un seul, où le palier vaut $b$ | `lesson.md:184` l'écrit en une ligne : « *$b(a+1)=0$ — donc $b=0$ ou $a=-1$ seulement* » | **R2, APRÈS** le marqueur (dans « Arrête-toi : le palier, ce n'est PAS $b$ ») | ❌ **non** | l'**identification des deux membres** qui produit $b(a+1)=0$ reste à la prose : la scène fait **trouver le cran**, jamais l'algèbre qui le prouve (§4.4) |

**Le coût résiduel, déclaré (deux fois).**

1. **S4.** L'élève arrive en sachant que *cette tasse* ne descend jamais sous $20$ et que, pour
   $b=0$, $a<0$ mène à $0$. **Ce qu'il ne sait pas, c'est que la limite est le palier
   $-b/a$ — et c'est ce que S4 fait choisir** (le distracteur `palier-oubli`, « elle descend
   vers $0$ », est exactement l'élève qui transporte R1 sans $b$). *La force de S4 est
   entamée, pas annulée ; et le distracteur le plus fort de S4 est précisément celui que R1
   fabrique.*
2. **S5.** L'élève sait qu'il y a une infinité de solutions. **Ce qu'il ne sait pas, c'est
   qu'elles partagent un palier et ne se croisent jamais.** *Le pari de S5 porte sur cela seul,
   et ses trois distracteurs le mesurent ; « combien y en a-t-il ? » n'est PAS la question de
   S5, précisément parce que R1 y a déjà répondu.*

**Deux tensions réelles, écrites plutôt que maquillées.**

1. **S1 et S2 sont DÉRIVABLES de R1, et c'est assumé.** Un élève qui a lu $y'(x)=a\,y(x)$
   (`lesson.md:49`) peut en déduire les deux. **Ce que S1 et S2 attrapent, ce n'est pas la
   règle : c'est ce que la notion entière encourage sans le vouloir** — sept rungs qui traitent
   une équation différentielle comme une **formule à trouver**, et pas une seule ligne qui la
   traite comme une **consigne locale**. Le fait **f** du §0.1 le mesure : les quatre figures
   tracent des solutions, aucune ne dessine l'équation.
2. **La scène ne prépare AUCUN geste d'examen directement.** Aucune annale vérifiée ne demande
   $y'=ay+b$, et aucune ne demandera jamais de lire un champ de pentes (§0.3, §9.6). **La scène
   est un instrument d'enseignement, pas d'entraînement**, et c'est écrit dans le
   `fit_caveat` (§10.1) et dans le paragraphe d'annonce (§4.1). *C'est la tension la plus
   sérieuse de cette proposition, et §13.2 la met au propriétaire.*

**Ce que le placement NE fait pas.** `cp-r2-palier` reste où il est, **après** R2
(`lesson.md:186`), et **n'est pas modifié** ; `cp-r1-signe-a` et `cp-r0-predict` non plus.
Le §7.5 vérifie choix par choix que la scène et `cp-r2-palier` ne se doublent pas.

---

## 4. La prose à écrire — CAHIER DES CHARGES pour content-author

*Le §4 décrit ; il ne rédige pas. Toute prose commandée ici emploie la numérotation
« chapitre N » établie en tête de document (**R2 = chapitre 3**) et la voix du reste de la
notion.*

⚠ **Correction de vague 1 (fidélité M6) : ce document AJOUTE des citations « chapitre N », et
il les déclare au lieu de les nier.** La première rédaction écrivait « *n'introduit aucune
citation « chapitre N » nouvelle* » **tout en en commandant deux** (§4.1 a « ce que le
chapitre 2 a laissé », §4.5 « la même chose que dans le plan du chapitre 3 »). **Les deux sont
justes** sous la convention prouvée en tête (`lesson.md:39`, `:144`, `:236`, `:376`), **et
elles portent le compte de `REVIEW:19-21` de 49 à 51.** *Ce qui reste vrai : aucune citation
vers un rung que ce document ne sert pas ; et chaque ajout est nommé ici, donc vérifiable.*

### 4.1 Le paragraphe d'annonce — AVANT le marqueur

**Emplacement :** juste après `lesson.md:124` (le paragraphe du terme constant), avant le
marqueur — **déplacé avec lui** (§3).
**Longueur : 80 à 110 mots. Ton : neutre, il n'annonce aucune réponse.**

Il doit : **(a)** rappeler ce que le chapitre 2 a laissé — une famille de courbes, et rien qui
dise vers quoi elles vont quand un terme constant s'ajoute ; **(b)** dire qu'on va **essayer
avant de démontrer** ; **(c)** **ne nommer ni $-b/a$, ni « solution constante », ni AUCUNE
hauteur comme un résultat** — *le mot « palier » vient d'être employé à `lesson.md:124`, donc
l'interdire ici serait absurde ; ce qui est interdit, c'est de dire **où il est*** ; **(d)**
dire à l'élève, en une phrase, que **ce qu'il va essayer ne démontre rien** — le plan lui
montrera la règle sur une poignée d'équations, et **la démonstration, c'est le paragraphe qui
suit** ; **(e)** ⚠ **AJOUTÉ EN VAGUE 1 (pédagogie M7) — poser la QUESTION que la scène
tranche, sans la répondre.** *La première rédaction n'avait aucune clause d'accroche, et
l'accroche naturelle (le café qui se refroidit vers $20$, pas vers $0$) est **interdite dans la
scène** par §9.3 — mais elle n'est pas interdite dans la PROSE, et elle est juste au-dessus du
marqueur depuis le déplacement du §3.* **La clause (e) fait le raccord** : une équation qui
impose une pente en chaque point du plan, ça se regarde — et la question qu'on va lui poser est
*où* le plan devient plat, pas *comment* on l'écrit. **Sans nommer la hauteur.**

*Formulation possible pour (d), à retravailler par content-author : « Attention à ce que ce
plan est : un banc d'essai, pas une preuve. Douze équations bien choisies ne démontrent rien en
mathématiques — la démonstration vient juste après, et elle vaut pour tous les $a$ et tous les
$b$ à la fois. »* **C'est la seule clause du §4.1 dont le contenu est non négociable** : sans
elle, une scène de maths qui « vérifie » une règle sur soixante états enseigne, en creux, que
vérifier suffit. *Interdit, en revanche : toute phrase de la forme « tu verras que… ».*

### 4.2 Le marqueur

Seul sur sa ligne : `[[embed:champ-des-pentes]]`.

### 4.3 Une phrase de mécanisme dans l'Étape 1 de R2 — APRÈS le marqueur

**Emplacement : dans `### Étape 1 : chercher une solution constante`, après
`lesson.md:142`. 30 à 50 mots.** Elle doit **raccorder la démonstration au plan** en une
phrase, sans le rejouer : la solution constante $y_p=-\dfrac{b}{a}$ est **la ligne où le
plan était plat** — une fonction dont la dérivée est nulle partout, c'est exactement une
courbe qui, en chaque point, reçoit la pente $0$.

*C'est le seul endroit où la prose a le droit de nommer le plan. Elle le fait une fois, en
aval, et jamais comme une preuve.*

### 4.4 Une phrase dans « Arrête-toi : le palier, ce n'est PAS $b$ » — le cas $a=-1$

**Emplacement : `lesson.md:184`, à la suite de « *l'identification des deux membres imposerait
$b(a+1)=0$ — donc $b=0$ ou $a=-1$ seulement* ». 20 à 35 mots.**

La leçon écrit déjà **la** phrase juste. Il lui manque de dire que ce cas **existe** et
**qu'on peut le rencontrer** : quand $a=-1$, recopier $b$ tombe juste **par accident**, et
c'est le pire des cas — une règle fausse qui ne se fait pas prendre. ⚠ **Corrigé en vague 1 :
c'est désormais le PARI de S6 (§7.7) qui le fait trouver, pas une `suite` qui l'imprime ; la
prose le nomme APRÈS.** *L'ordre compte : la scène fait chercher le cran, `lesson.md:184`
donne l'algèbre qui prouve qu'il est unique, et cette phrase-ci dit pourquoi ça vaut la peine de
le savoir.*

### 4.5 Une puce dans la fermeture d'arc de R3 — et rien de plus

**Emplacement : `lesson.md:256`, dans le paragraphe qui commente `famille-solutions`. 15 à
30 mots.** Il écrit déjà « *qui partagent toutes le même palier $T_p=-b/a=20$ sans jamais le
franchir* ». Ajouter que c'est **la même chose que dans le plan du chapitre 3**, sur une
équation particulière. *Un raccord, pas une leçon.*

### 4.6 Aucun nouveau point d'arrêt, et aucun item — c'est un livrable NÉGATIF

**Cette spec ne commande AUCUN item et AUCUN point d'arrêt.** *Trois motifs, chacun mesuré.*

1. **Aucun modèle neuf n'est nécessaire** (§8.2) : les onze modèles que la scène confronte
   sont tous déjà déclarés et tous déjà au-dessus du plancher.
2. **`REVIEW:124-126` (F12)** signale déjà deux items quasi jumeaux (EQDIFF-1 / EQDIFF-22,
   tous deux $y'=3y$) et **`honest_state` prévient que la marge est nulle** : ajouter du volume
   QCM dans cette notion n'est pas ce qu'elle demande.
3. **Ce que la notion demande en items est ailleurs** : le cas $\Delta=0$, à R4, sans aucun
   item (`REVIEW:94-100`). **Routé, pas absorbé** (§13.1).

⚠ **Une conséquence dure, et elle est déclarée : la scène enseigne six faits que le banc de
fin ne mesure toujours PAS directement.** Les onze modèles qu'elle confronte restent mesurés
par les mêmes **33** QCM d'écriture qu'avant *(⚠ « 30 » jusqu'à la troisième passe — fidélité
1bis, IMPORTANT-4)*. **La scène déplace la compréhension, pas le modèle
apprenant.**

⚠ **DURCI EN VAGUE 1 (pédagogie I6) : la passe d'items n'est plus « à part », elle est
COUPLÉE — et elle VARIE au lieu d'AJOUTER.** *Motif du critique, relu et accepté : la
complémentarité revendiquée au §7.5 entre S3 et `cp-r2-palier` est **plus mince** que ce que ce
document affirmait — **les deux exigent de calculer $-b/a$**, seul le format de sortie diffère
(une hauteur / une écriture). **La compétence vraiment neuve — la ligne comme un LIEU qui se
DÉPLACE avec $b$ — n'est mesurée nulle part**, et un livrable qui n'ajoute aucun item la laisse
invisible pour toujours.*
**La forme retenue résout la contradiction avec la marge nulle** (fidélité B1, qui l'écrit
exactement) : **on ne crée aucun item ; on VARIE le stem d'un item existant du cluster du
palier** pour qu'il se lise sur une figure plutôt que sur une écriture, **en gardant ses
étiquettes de modèle intactes** — donc `coverage_summary` sort de la livraison **au caractère
près**, et les **quatorze** planchers ne bougent pas *(⚠ « quinze » ici jusqu'à la troisième
passe, alors que le §8 et le §13.9 écrivaient déjà quatorze — **le même chiffre juste à un endroit
et périmé à l'autre, qui est le défaut que les deux passes précédentes ont le plus souvent
trouvé**)*. *Candidat naturel : l'un des huit items du
cluster (union $\{2;6;10;12;13;14;17;19\}$). **Le choix est d'item-author, pas d'ici**, et
§13.9 garde la question ouverte — mais son DÉFAUT change : « aucun item » devient « **une
variation de stem, couplée à la construction** ».*

---

## 5. Le modèle, les constantes, les contrôles, l'état, les lectures

### 5.1 Le repère — isotrope, fixe, gradué, et l'isotropie est ici une question de VÉRITÉ

> ⚠ **CE PARAGRAPHE EST ENTIÈREMENT RÉÉCRIT EN VAGUE 1.** La fenêtre a changé, le format a
> changé, et **les deux facteurs px/unité de la première rédaction étaient faux**. C'est la
> réparation du **BLOQ-2** (pédagogie) et de **I5** (fidélité), et **tous les seuils de porte du
> §11 en descendent** au lieu d'être choisis.

**Fenêtre de données : $x \in [-8 ; 4]$, $y \in [-6 ; 6]$ — un CARRÉ ($12 \times 12$). Elle ne
change JAMAIS**, à aucune étape, à aucun réglage, **à aucune largeur**.
**`format: "carre-partout"`** (`Plateau.tsx:63`, et le motif à `:59-61`).

#### 5.1.0 Pourquoi `carre-partout` et pas `carre` — le défaut que ni l'écriture ni la vague 1 n'avaient vu

`Plateau.tsx:74` rend :
`format === "carre-partout" ? "aspect-square" : "aspect-[4/3] bp-expanded:aspect-square"`.
**Donc `carre` est 4:3 SOUS le point de rupture et carré seulement au-dessus.** Une fenêtre de
données carrée dans une boîte 4:3, **à facteur px/unité égal sur les deux axes** (§5.1.1, qui
n'est pas négociable), **force la fenêtre à s'élargir en $x$ au téléphone** — ce que la ligne
précédente interdit en toutes lettres. *La première rédaction calculait $390/12 = 32{,}5$
px/unité à 390 px : c'est la largeur divisée par la portée, alors que c'est la **hauteur** qui
borne dans une boîte 4:3.* **`carre-partout` supprime le problème à la racine : la boîte est
carrée partout, donc la fenêtre est la même partout, donc la scène ne ment à aucune largeur.**
*Précédent déjà écrit dans le fichier (`Plateau.tsx:59-61`) : le banc de diffraction, « *en 4:3,
le tracé n'avait que 61 px* ».*

#### 5.1.1 Pourquoi cette fenêtre-LÀ — l'arithmétique de « jamais », faite avant le dessin

**Le BLOQ-2 en une ligne : sur $x \in [-2;10]$, la courbe de S4 et sa ligne de palier finissaient
séparées de MOINS D'UN PIXEL avant le bord droit du cadre. Le dessin disait « elle arrive ».**
*Refait ici, et **quantifié au lieu d'être rhétorique** (⚠ fidélité 1bis, MINOR-9 : la révision
écrivait « **sur tout le tiers droit du cadre** », ce qui **surestime** — le franchissement est
plus tard que ça) : à $a=-\tfrac12$, palier $4$, $P=(0;5)$, l'écart vaut $e^{-x/2}$ ; il passe sous
$1$ px **exactement** à $x = 2\ln(\text{px/u})$, soit $x = 7{,}7$ à $46{,}7$ px/u et $x = 6{,}8$ à
$29{,}8$ px/u. **Sur l'ancienne fenêtre $x\in[-2;10]$ et avec les facteurs retenus ici, cela fait
les $3{,}2$ dernières unités sur $12$ au téléphone (le dernier QUART) et les $2{,}3$ dernières au
bureau (le dernier CINQUIÈME) — pas « tout le tiers droit ». Le défaut est le même ; le chiffre est
maintenant juste.***

**Ce qui borne, et ce qui est libre.**
- $y$ **est borné par le contenu** : les paliers de la grille couvrent $[-4;4]$ (table A) et le
  point le plus haut est $(0;5)$ ⟹ **$y \in [-6;6]$ est le plus petit intervalle symétrique
  avec une marge d'une unité. Il ne bouge pas.**
- La fenêtre est **carrée** (§5.1.2) ⟹ **la portée en $x$ vaut 12, elle aussi. Elle ne bouge
  pas non plus.**
- **Ce qui est libre, c'est OÙ on met ces 12 unités.** Et c'est le seul levier.

**Le calcul qui a choisi $x \in [-8;4]$.** Les courbes passent toutes par $x=0$ ; à gauche elles
quittent le cadre très vite (table C : $x \approx -1{,}39$, $-3{,}22$, $-0{,}71$), **donc la
partie gauche du cadre n'a jamais porté de courbe, dans aucun placement** — c'est le territoire
du champ, qui est le même partout (et c'est précisément ce que S1-S3 enseignent). **La longueur
utile est donc la course À DROITE de $x=0$, et c'est elle qu'il fallait raccourcir.**

| course à droite | écart de S4 au bord droit, en unités | **en px à 1 280** ($46{,}67$ px/u) | **en px à 390** ($29{,}83$ px/u) |
|---|---|---|---|
| $10$ *(ancienne fenêtre)* | $e^{-5}=0{,}00674$ | **0,31 px** ✗ | **0,20 px** ✗ |
| $6$ | $e^{-3}=0{,}0498$ | 2,32 px ✗ | 1,49 px ✗ |
| $5$ | $e^{-2{,}5}=0{,}0821$ | 3,83 px ~ | 2,45 px ✗ |
| **$4$ — RETENU** | $e^{-2}=0{,}1353$ | **6,32 px** ✓ | **4,04 px** ✓ |

**Donc $x_{\max}=4$, et $x \in [-8;4]$.** *Le prix est écrit : l'origine n'est plus au milieu,
et le tiers gauche du cadre ne porte que du champ. **Ce n'est pas une perte** — le champ y est
exactement aussi informatif qu'ailleurs, et « l'équation parle en CHAQUE point » y est plus
visible que sur un cadre rempli de courbes.*

**Ce que cela change ailleurs, et qu'il faut porter :** le cran `decale` passe de $(4;3)$ à
**$(2;3)$** (§5.2 C) — sinon il serait au bord. *La table B est inchangée : **la pente ne
dépend que de $y$**, jamais de $x$. C'est le fait de S2, et il vient de rendre la fenêtre
gratuite à déplacer.*

> ⚠ **ET LA CLAUSE D'HONNÊTETÉ, QUI COMPTE PLUS QUE LA FENÊTRE.** Aucune fenêtre, à aucune
> échelle, ne peut montrer « jamais » : la courbe est asymptote, donc **pour toute fenêtre il
> existe un $x$ au-delà duquel les deux traits se confondent** — raccourcir le cadre ne fait que
> déplacer l'endroit. **Une fenêtre ne rend pas « jamais » visible ; elle empêche seulement le
> dessin de dire le CONTRAIRE.** Ce que « jamais » a de démontrable à ce niveau est
> **arithmétique**, et c'est l'échelle de $b$ de S4 (§7.4) : *si l'écart était nul, la pente
> serait nulle, donc la courbe serait la solution constante — une courbe qui n'est pas la
> constante ne peut donc pas avoir un écart nul.* **C'est une preuve, elle est au niveau de
> l'élève, et c'est elle qui porte le mot.** *Porté au `fit_caveat` (§10.3) et au retour de
> `approche` (§7.4).*

#### 5.1.2 L'isotropie

> **L'isotropie n'est pas un confort ici, c'est la condition pour que la scène ne MENTE pas.**
> Un segment de champ est dessiné à l'angle $\arctan(m)$. Si le facteur px/unité diffère entre
> les deux axes, **le segment affiché n'a plus la pente $m$** : une pente $1$ ne fait plus
> $45°$, une pente $0$ reste plate mais une pente $-3$ paraît en valoir $-2$ ou $-5$. La scène
> existe pour faire LIRE une pente sur un trait ; un repère anisotrope la rend fausse au
> premier coup d'œil, tout en restant juste dans les nombres. **C'est le pire genre de défaut :
> cohérent.**
>
> *Le dépôt a déjà payé pour l'avoir oublié — dans une AUTRE notion.*
> `docs/ops/SCENE-CONTRACT.md:186-203` : « *Le repère doit être ISOTROPE […] Défaut RÉEL trouvé
> le 2026-08-14 […] **écart de 36,9 % entre le rayon écran et la distance H-centre** — le
> dessin contredit alors la preuve qu'il illustre.* »
>
> **Donc :** le facteur px/unité est **le même horizontalement et verticalement**, à tout
> instant et à toute largeur. Si la largeur disponible impose un autre rapport, **la fenêtre
> s'ÉTEND symétriquement du côté qui a de la place** — elle ne se redimensionne jamais sur un
> seul axe. **Famille de porte à part entière** (§11.2, `isotropie`), mesurée dans les deux
> sens, et **avec une sonde propre à cette scène : l'angle écran d'un segment de pente connue**
> (§11.2, `segment-a-la-bonne-pente`).

Sont tracés à l'encre, toujours : les deux axes, **les graduations entières**, l'origine $O$,
et **le quadrillage entier, OPAQUE** (règle du banc de modulation, ADR 0041 addendum du
2026-09-25 point 6 : *Chromium compose deux fois les sous-chemins qui se croisent dans un même
trait semi-transparent*). *Le quadrillage n'est pas décoratif : c'est lui qui rend une pente
lisible sans rapporteur — une pente $-3$ descend de trois carreaux pour un carreau à droite,
et c'est ainsi qu'un élève la vérifie.*

**Échelle — CALCULÉE, pas relevée sur le rendu (§15.1), et RECALCULÉE en vague 1.** Avec
`carre-partout` le plateau est carré à toute largeur : son côté vaut
$\min(\text{largeur disponible},\ \text{plafond de hauteur})$.
- **À $1\,280$ px**, plafond **560 px** ⟹ plateau $560 \times 560$ ⟹
  $560/12 \approx \mathbf{46{,}67}$ px/unité.
- **À 390 px**, la largeur borne : largeur disponible $\approx \mathbf{358}$ px (390 moins les
  deux gouttières de page) ⟹ plateau $358 \times 358$ ⟹ $358/12 \approx \mathbf{29{,}83}$
  px/unité.

⚠ **Les deux nombres sont des HYPOTHÈSES à mesurer avant construction** (§15.1) : le plafond de
560 px est **choisi**, la gouttière de 358 px est **estimée**. *Ce qui n'est PAS une hypothèse,
c'est que le $32{,}5$ de la première rédaction était faux de deux façons : mauvais format
(`carre` = 4:3 au téléphone) et mauvaise dimension limitante.* **Toute la campagne de porte du
§11.2 relit ces deux facteurs sur les GRADUATIONS du rendu, jamais sur ces chiffres-ci.**

### 5.2 Les crans — et pourquoi ces valeurs-là

**A — les trois coefficients $a$** :

| cran | $a$ | ce qu'il fait | pourquoi ce cran |
|---|---|---|---|
| `-1` | $-1$ | décroissance rapide vers le palier | ⚠ **LE CRAN DÉGÉNÉRÉ** : c'est le seul où $-\dfrac{b}{a}=b$ **pour tout $b$** (`lesson.md:184`, $b(a+1)=0$). **Il n'est l'état d'AUCUN pari** ; c'est **l'état posé de S1 et S2 — à $b=0$, où aucun palier n'est en jeu** — et c'est **la RÉPONSE du pari de S6**. ⚠ **ET IL N'EST OFFERT COMME CRAN NI À S4 NI À S5** (troisième passe, pédagogie 1bis B1) : le contrôle `a` n'y expose que $-0{,}5$ et $+0{,}5$ ; le cran $-1$ n'apparaît qu'à S6, **après la révélation** |
| `-0.5` | $-\dfrac12$ | décroissance plus lente ; palier $=2b$ | **l'état de S3, S4, S5 et S6** : le palier y vaut le DOUBLE de $b$, donc « recopier $b$ » se voit du premier coup d'œil |
| `0.5` | $\dfrac12$ | **croissance** : la courbe FUIT le palier | **le seul $a>0$** — sans lui, `signe-a-comportement` n'a pas de cran où casser, et la moitié du « Sens du signe de $a$ » de R1 (`lesson.md:93-100`) n'existe pas dans la scène. **C'est le second cran du contrôle `a` à S4 et S5**, et le retour de `vers-moins-infini` s'appuie dessus (§7.4) |

> 🔻 ⚠ **CELLULE PÉRIMÉE, CORRIGÉE EN TROISIÈME PASSE (pédagogie 1bis, M-d) — et sa péremption
> était le symptôme du BLOQUANT B1.** *La cellule de $-1$ disait encore « **il est la CIBLE de la
> `suite` de S4** ». **Cette `suite` a été supprimée en vague 1** (c'était le BLOQ-1 : elle
> IMPRIMAIT la découverte). **Donc, depuis la vague 1, le cran $a=-1$ n'avait plus AUCUN emploi
> déclaré à S4 ni à S5 — et il y restait pourtant offert.*** **C'est exactement ce que le retrait
> demandé par B1 coûte : rien.** *Un cran offert sans emploi écrit, dont la seule conséquence
> possible est de livrer la réponse de l'étape suivante, n'est pas un réglage : c'est une fuite qui
> attend.*

> **Pourquoi trois et pas quatre ou sept.** Un quatrième cran ($a=-0{,}25$ ou $a=1$) a été
> essayé et **retiré sur un calcul** : avec $a=-0{,}25$ et $b=2$, le palier vaut $8$, **hors
> de la fenêtre** ; avec $a=1$, la courbe issue de $(0;5)$ quitte le cadre par le haut avant
> $x=0{,}3$, ce qui ne montre plus rien. *Trois crans suffisent à tout ce que les **six** étapes
> demandent : un dégénéré, un pédagogique, un de signe opposé.* ⚠ **Et depuis la vague 1, le cran
> dégénéré n'est plus seulement une CIBLE de `suite` : il est la RÉPONSE d'un pari (S6, §7.6).
> Trois crans est donc le minimum strict — avec deux, « pour quel $a$ ? » n'aurait plus de
> question.**
>
> ⚠ **ET UNE DISTINCTION NEUVE, QUE LA TROISIÈME PASSE OBLIGE À ÉCRIRE : trois crans DANS LE
> MODÈLE, deux OFFERTS à S4 et S5.** *Le modèle calcule les $3 \times 4 = 12$ équations et le test
> unitaire les refait toutes (§14.2). Ce qui est borné, c'est ce que le CONTRÔLE expose à une étape
> donnée :* **`a` offre $\{-0{,}5 ; +0{,}5\}$ à S4 et S5, et $\{-1 ; -0{,}5 ; +0{,}5\}$ à S6, après
> la révélation.** *Le cran $-1$ reste donc un état du modèle, atteignable par `etat` (S1, S2) et
> par `etat_revele` (S6) — jamais par un clic avant S6.* **Conséquence de descripteur, déclarée et
> non résolue : cela exige une clé `crans` PAR ÉTAPE, qui n'a aucun précédent dans le dépôt
> (§12, §15.3 d) ; le repli, s'il est refusé, est au §13.21.**

**B — les quatre termes constants $b$** : `-2` · `0` · `1` · `2`.

*`0` est indispensable (c'est le cas de R1, et le seul où le palier est l'axe) ; `-2` est le
seul NÉGATIF, et il fait exister le double signe qui produit `palier-signe` ; `1` et `2`
donnent des paliers $2$ et $4$ à $a=-0{,}5$, tous deux bien distincts de $b$.*

**C — les cinq points $P$** (`point`) :

> ⚠ **CORRIGÉ EN VAGUE 1 (pédagogie I7) : les cinq crans s'affichent par leurs COORDONNÉES,
> jamais par leur id.** *Motif du critique, accepté sans réserve : `sur` veut dire « exactement
> SUR le palier », **qui est la réponse de S3**, et ce cran est offert dès **S1**, où `point`
> est le contrôle ouvert. Une étiquette de contrôle qui imprime la réponse d'une étape
> ultérieure est une fuite par le RÉGLAGE, et elle échappait à la table du §7.6 A parce que
> celle-ci n'énumérait que des ÉTATS, jamais des MOTS.* **Les ids ci-dessous restent la clé du
> descripteur, du registre et de la porte ; ils ne sont jamais rendus.** *`origine` était en
> plus trompeur : il nomme $(0;3)$ alors que l'origine $O$ du repère est $(0;0)$.*

| cran (id, non rendu) | **étiquette rendue** | $(x_0 ; y_0)$ | pourquoi ce cran |
|---|---|---|---|
| `origine` | **« $(0\,;3)$ »** | $(0 ; 3)$ | **l'état de S1** |
| `decale` | **« $(2\,;3)$ »** | $(2 ; 3)$ | **l'état de S2** — **même hauteur que le précédent, deux unités plus loin.** C'est le seul couple de la grille qui partage une ordonnée, et il existe pour cela. ⚠ *Était $(4;3)$ : déplacé en vague 1 avec la fenêtre (§5.1.1) — à $x_{\max}=4$ il aurait été au bord. **La table B ne bouge pas : la pente ne dépend que de $y$.*** |
| `haut` | **« $(0\,;5)$ »** | $(0 ; 5)$ | **l'état de S4** : au-dessus de tous les paliers (le plus haut vaut $4$) |
| `bas` | **« $(0\,;-3)$ »** | $(0 ; -3)$ | sous tous les paliers positifs — la remontée **vers** le palier (le cas « $T_0=0$ » de `famille-solutions`) ; **l'état de S5** |
| `sur` | **« $(0\,;2)$ »** | $(0 ; 2)$ | **exactement SUR le palier** quand $(a;b)=(-1;2)$ ou $(-0{,}5;1)$ ⟹ la solution **constante**, une droite horizontale. *C'est l'Étape 1 de R2, vue* — **et c'est pour cela que son id ne doit JAMAIS être rendu** |

**Il n'y a pas de cran $x_0 < 0$, et c'est délibéré** : la leçon travaille des temps qui
démarrent (`lesson.md:194`), et un $x_0$ négatif n'ajoute rien qu'une lecture de plus.

### 5.3 Les tables de nombres — l'arithmétique de la scène, vérifiée

**A — les DOUZE paliers $-\dfrac{b}{a}$** (le cœur de S3) :

| $a \backslash b$ | $-2$ | $0$ | $1$ | $2$ |
|---|---|---|---|---|
| $-1$ | $\mathbf{-2}$ | $\mathbf{0}$ | $\mathbf{1}$ | $\mathbf{2}$ |
| $-\tfrac12$ | $-4$ | $0$ | $2$ | $4$ |
| $\tfrac12$ | $4$ | $0$ | $-2$ | $-4$ |

*Vérifications : $-(-2)/(-1)=-2$ ✓ · $-1/(-1)=1$ ✓ · $-2/(-1)=2$ ✓ · $-(-2)/(-\tfrac12)=-4$ ✓ ·
$-1/(-\tfrac12)=2$ ✓ · $-2/(-\tfrac12)=4$ ✓ · $-(-2)/\tfrac12=4$ ✓ · $-1/\tfrac12=-2$ ✓ ·
$-2/\tfrac12=-4$ ✓.*

> **La première ligne est en gras parce qu'elle EST le piège de la leçon.** À $a=-1$, le palier
> vaut $b$ **aux quatre crans** — c'est $b(a+1)=0$ de `lesson.md:184`, rendu visible. Aux deux
> autres lignes, le palier ne vaut $b$ **qu'à $b=0$**, et c'est une coïncidence d'un seul cran.
> **Conséquence de conception, non négociable : le cran $a=-1$ n'est l'état d'aucun pari**
> (§7.6 E) — sinon le distracteur `palier-recopie-b` atteindrait la **bonne réponse**, ce qui
> est une *contamination de la réponse juste*, un défaut de **stem**. *C'est exactement le
> défaut que la spec sœur a dû corriger à son S2 ; ici il est désamorcé avant d'exister.*

**Tous les paliers tiennent dans $[-4;4]$, donc à $\ge 2$ unités du bord de la fenêtre** ✓.

**B — les pentes $a\,y_0 + b$ aux cinq points** (le cœur de S1 et S2). *Les cinq points n'ont
que **quatre** ordonnées distinctes — $3$ (`origine` et `decale`), $5$, $-3$, $2$ — donc la
table entière tient en quatre colonnes :*

| $(a;b) \backslash y_0$ | $3$ | $5$ | $-3$ | $2$ |
|---|---|---|---|---|
| $(-1;0)$ | $\mathbf{-3}$ | $-5$ | $3$ | $-2$ |
| $(-1;2)$ | $-1$ | $-3$ | $5$ | $\mathbf{0}$ |
| $(-\tfrac12;2)$ | $\tfrac12$ | $\mathbf{-\tfrac12}$ | $\tfrac72$ | $1$ |
| $(\tfrac12;2)$ | $\tfrac72$ | $\tfrac92$ | $\tfrac12$ | $3$ |

*Vérifications : $-1\times3+0=-3$ ✓ · $-1\times2+2=0$ ✓ (le point `sur` est bien FIXE à
$(a;b)=(-1;2)$) · $-\tfrac12\times5+2=-\tfrac12$ ✓ (l'état de S4 : la pente vaut
$a\times(\text{écart au palier})=-\tfrac12\times(5-4)=-\tfrac12$ ✓✓ — **les deux routes
donnent le même nombre, et la porte refait les deux**) · $-\tfrac12\times(-3)+2=\tfrac72$ ✓ ·
$\tfrac12\times3+2=\tfrac72$ ✓.*

> **Toutes les pentes de la scène sont des entiers ou des demi-entiers.** $a \in \{-1;
> -\tfrac12; \tfrac12\}$ et $y_0 \in \{3;5;-3;2\}$ donnent des produits dans
> $\tfrac12\mathbb{Z}$, et $b$ est entier. **C'est une propriété de la grille, pas une
> convention d'affichage, et la porte la mesure** (§11.1 N5 : aucune lecture `pente` hors de
> $\tfrac12\mathbb{Z}$). *Une pente affichée $-1{,}33$ est un bug avant d'être une faute de
> goût.*

**C — les trois courbes de S5** ($a=-\tfrac12$, $b=2$, palier $4$) — ⚠ **TABLE ENTIÈREMENT
RECALCULÉE en vague 1 sur la fenêtre $x \in [-8;4]$**, et **la cellule fausse de la première
rédaction est réparée** (pédagogie M2, fidélité (d) : le bord gauche de la courbe du bas était
écrit « $\approx -0{,}6$ » dans la table et « $\approx -0{,}71$ » dans sa propre vérification —
**c'est $-0{,}71$**) :

| point de passage | la courbe | à $x=0$ | **à $x=4$ (bord droit)** | où elle quitte le cadre par la gauche |
|---|---|---|---|---|
| `haut` $(0;5)$ | descend vers $4$ | $5$ | $4 + e^{-2} \approx \mathbf{4{,}135}$ | $x=-2\ln 2 \approx \mathbf{-1{,}386}$ *(elle dépasse $6$)* |
| `sur` $(0;2)$ | monte vers $4$ | $2$ | $4 - 2e^{-2} \approx \mathbf{3{,}729}$ | $x=-2\ln 5 \approx \mathbf{-3{,}219}$ *(elle passe sous $-6$)* |
| `bas` $(0;-3)$ | monte vers $4$ | $-3$ | $4 - 7e^{-2} \approx \mathbf{3{,}053}$ | $x=-2\ln\tfrac{10}{7} \approx \mathbf{-0{,}713}$ *(elle passe sous $-6$)* |

*Vérifications : l'écart au palier est multiplié par $e^{ax}$ ; à $x=4$ et $a=-\tfrac12$,
$e^{-2}\approx 0{,}13534$, donc $5 \to 4+0{,}135$ ✓, $2 \to 4-2\times0{,}135=3{,}729$ ✓,
$-3 \to 4-7\times0{,}135=3{,}053$ ✓. À gauche : $4+e^{-x/2}=6 \Rightarrow e^{-x/2}=2
\Rightarrow x=-2\ln2$ ✓ ; $4-2e^{-x/2}=-6 \Rightarrow e^{-x/2}=5 \Rightarrow x=-2\ln5$ ✓ ;
$4-7e^{-x/2}=-6 \Rightarrow e^{-x/2}=\tfrac{10}{7} \Rightarrow x=-2\ln\tfrac{10}{7}$ ✓.*

**C′ — les SÉPARATIONS, qui sont le vrai objet de la porte** (réparation du BLOQ-2). Les trois
courbes sont **toutes les trois dans le cadre** sur $x \in [-0{,}713 ; 4]$ ; c'est **là, et
seulement là**, que « aucune n'en traverse une autre » se mesure en pixels.

| paire | écart en unités | **minimum sur le cadre** (atteint à $x=4$) | **en px à 1 280** | **en px à 390** |
|---|---|---|---|---|
| `haut` / `sur` — **la plus serrée** | $3e^{-x/2}$ | $3e^{-2}=0{,}4060$ | **18,9 px** | **12,1 px** |
| `sur` / `bas` | $5e^{-x/2}$ | $5e^{-2}=0{,}6767$ | 31,6 px | 20,2 px |
| `haut` / `bas` | $8e^{-x/2}$ | $8e^{-2}=1{,}0827$ | 50,5 px | 32,3 px |

**Et l'écart de S4** (une seule courbe contre la ligne du palier) : $e^{-x/2}$, **minimum
$e^{-2}=0{,}1353$ u ⟹ 6,32 px à $1\,280$ et 4,04 px à 390** (§5.1.1).

> **Les deux seuils de porte en descendent, et ils ne sont plus choisis** (§11.2) :
> `courbes-jamais-confondues` exige **$\ge 6$ px** (plancher mesuré : 12,1 px — marge $\times 2$)
> et `courbe-jamais-sur-le-palier` exige **$\ge 3$ px** (plancher mesuré : 4,04 px).
> *La première rédaction exigeait $\ge 3$ px « **en tout $x$ du cadre** » sur une fenêtre où la
> séparation tombait à $0{,}2$ px : **la porte ne pouvait pas passer au vert sur un produit
> juste**, ce que le BLOQ-2 démontre et ce que cette table répare.*

> **Les courbes sont CLIPPÉES au cadre, jamais PLAFONNÉES.** Une courbe qui sort continue hors
> champ ; elle ne s'aplatit pas sur le bord. *C'est une distinction que la porte doit tenir
> (§11.2, `courbe-clippee-pas-plafonnee`) : une courbe plafonnée dessine un palier qui n'existe
> pas — le pire mensonge possible dans CETTE scène.*
> **Et avec $a=\tfrac12$, toute courbe finit par sortir. C'est la vérité d'une croissance
> exponentielle, et la porte vérifie qu'elle SORT** — une courbe qui resterait sagement dans le
> cadre à $a>0$ serait le bug, pas l'inverse.

**D — les 60 états.** $3\ (a) \times 4\ (b) \times 5\ (\text{points}) = \mathbf{60}$. *Le test
unitaire du §14.2 les refait tous — la pente, le palier, l'écart, et le point de sortie de la
courbe. **Les tables A, B, C ci-dessus sont un contrôle ponctuel, jamais la source** (leçon de
la spec sœur, §11.1 N3).*

### 5.4 La précision — **exacte, ou rien**

> **Aucune lecture de cette scène n'affiche un nombre arrondi.** Les paliers sont des entiers
> ($-4$ à $4$) ; les pentes, des entiers ou des demi-entiers ; les écarts au palier, des
> entiers ou des demi-entiers. **Aucun « ≈ », aucune troncature, aucun chiffre de plus que le
> nombre n'en a.**

> ⚠ **Et c'est une règle DIFFÉRENTE de celle de la spec sœur, délibérément.** Le plan complexe
> interdisait tout décimal, parce que ses arguments sont des fractions de $\pi$ et que le bac
> les écrit ainsi. **Ici, la leçon elle-même écrit des décimaux** — $y'=-0{,}5y$
> (`lesson.md:104`), $-0{,}1$ (`:238`), $T(5)\approx 62{,}5$ (`:250`). Interdire le décimal
> serait interdire la langue de la leçon. **La règle honnête n'est donc pas « pas de décimal »,
> c'est « EXACT » :** $-\tfrac12$ s'écrit $-0{,}5$ **ou** $-\dfrac12$, jamais $-0{,}50$ ni
> $\approx -0{,}5$. *Décision déclarée, et §13.10 la met au propriétaire (une seule écriture, ou
> les deux ?). **Défaut : la fraction pour les demi-entiers ($-\tfrac12$, $\tfrac72$), le
> décimal pour $a$ sur son badge ($-0{,}5$), parce que c'est ainsi que la leçon écrit les
> deux.***

**Trois précisions d'écriture, non négociables :**
1. **Les nombres de la scène sont sans unité, à toutes les étapes.** Ni degré, ni minute, ni
   volt, ni seconde (§9.3). *Les axes sont $x$ et $y$, les lettres de la leçon
   (`lesson.md:47-49`).*
2. **La valeur $-\dfrac{b}{a}$ n'est JAMAIS écrite comme une formule avant la révélation de
   S3.** Avant, elle n'existe pas ; après, la lecture `palier` affiche **le nombre** ($4$), et
   c'est le **retour** du pari qui écrit une fois la route ($0=ak+b$). *La lecture affiche un
   lieu, le retour donne le mécanisme — deux objets, deux endroits.*
3. **Aucune formule de solution, à aucune étape** : ni $Ce^{ax}$, ni $e$, ni « exponentielle ».
   *§9.1, et c'est la frontière de rang la plus dure de cette scène.*

### 5.5 Contrôles (5) — un neuf par étape

> ⚠ **DEUX OUVERTURES AJOUTÉES EN VAGUE 1, ET UNE REFUSÉE.** `point` est **rouvert APRÈS la
> révélation** à **S2** (pédagogie I5) et à **S3** (pédagogie I3) — deux étapes où il ne fuit
> rien et où il répare une lecture morte. Il **reste FERMÉ à S4**, et c'est un **refus motivé**
> d'une consigne de vague 1 : voir l'encadré de réfutation ci-dessous et §13.16. *La vague 1bis a
> **accepté** ce refus (« *owner-q16 … ACCEPTED* »).*
>
> ⚠ **ET DEUX CHANGEMENTS DE TROISIÈME PASSE, TOUS DEUX SUR `a`, TOUS DEUX BLOQUANTS
> (pédagogie 1bis).** **(B1)** `a` n'expose plus que **deux crans** à S4 et S5 — le cran dégénéré
> $-1$ n'est atteignable **qu'à S6, après la révélation**. **(B2)** `a` est **ABSENT DU DOM à S6
> avant l'engagement**, comme `point` l'est à S2 et S3 : *ADR 0041 §6 (relu à `0041:98-100`) —
> « **tant que l'élève n'a pas choisi, ni le temps ni le contrôle de l'étape n'existent dans le
> DOM** ». S6 est l'étape dont `a` porte le pari ; il ne peut donc pas être ouvert avant.*

| id | ce qu'il règle | valeurs | ouvert par |
|---|---|---|---|
| `point` | $P$ | 5 crans, **étiquetés par leurs coordonnées** (§5.2 C) | **S1** · S2 *(rouvert **après la révélation**)* · S3 *(rouvert **après la révélation**)* · S5 *(rouvert)* · S6 *(rouvert)* |
| `champ` | la densité du champ tracé | `aucun` · `un-point` · `ligne` · `plan` | **S2**, S5 *(rouvert)*, S6 *(rouvert)* |
| `b` | le terme constant | `-2` · `0` · `1` · `2` | **S3**, S4 *(rouvert)*, S5, **S6** |
| `a` | le coefficient | 3 crans dans le MODÈLE (`-1` · `-0.5` · `0.5`), **2 OFFERTS à S4 et S5** (`-0.5` · `0.5`), **3 à S6** | **S4** *(2 crans)*, S5 *(2 crans)*, **S6** *(3 crans, et **absent du DOM avant l'engagement** — c'est à S6 qu'il porte le pari)* |
| `famille` | combien de courbes sont tracées | `aucune` · `une` · `trois` | **S5**, S6 *(rouvert)* |

> ⚠ **POURQUOI `a` PERD SON TROISIÈME CRAN À S4 ET S5 — la réparation du BLOQUANT B1, et elle
> coûte RIEN.** *Le reproche, relu et vérifié ligne à ligne : **trois `suite` de la scène
> prescrivaient ensemble la réponse de S6.** Celle de S3 entraînait explicitement la comparaison
> « la ligne plate tombe-t-elle sur la valeur de $b$ ? » (et **violait, au passage, l'interdit que
> S3 s'impose à elle-même** au §7.7 C) ; celle de S4 prescrit « promène $b$ » **pendant que `a` est
> le contrôle neuf de l'étape** ; celle de S5 disait « promène $b$, **puis $a$** ». **L'argument de
> non-fuite du §7.7 A reposait sur trois clauses — « $b$ et $a$ doivent être promenés ensemble »,
> « `palier` n'est pas comparé à $b$ à l'écran », « aucun texte ne le mentionne » — et les trois
> tombaient.***
> **Les trois `suite` sont réécrites (§7.3, §7.4, §7.5). Et le cran part, parce que rien ne
> l'employait** (§5.2 A, cellule périmée) : *à S4, le contraste de signe se fait entre $-0{,}5$ et
> $+0{,}5$ ; à S5, l'invariance porte sur les DÉPARTS, pas sur $a$.* **Ce que le retrait achète :
> la non-fuite de S6 passe du SILENCE DES TEXTES au PRODUIT.** *C'était l'aveu du §7.7 A — « la
> ligne de S6 ne peut pas tenir par un contrôle fermé » — et il n'a plus lieu d'être : le cran est
> inatteignable avant S6, et la porte le mesure.*

**Aucun curseur continu. Aucune borne.** *Tout est en crans discrets, pour la raison du §5.4.*
**Aucune clé de `bornes` dans le registre** — deuxième scène du dépôt dans ce cas, après
`plan-complexe-transformation` (§12).

**`point` est FERMÉ à S4, et c'est une décision de non-fuite, pas un oubli.** À S4 la clé
`famille` vaut `une` après la révélation ; si `point` était rouvert, promener $P$ redessinerait
une courbe après l'autre, **toutes visant le même palier — c'est-à-dire la réponse de S5**
(§7.6 A). *C'est exactement l'anti-motif du manège (ADR 0041, addendum du 2026-09-24 soir :
une étape révélée qui ouvre le réglage répondant au pari SUIVANT).*

> ⚠ **RÉFUTATION ÉCRITE — la vague 1 demande d'ouvrir `point` à S4, et je ne le fais pas.**
> Le rapport de pédagogie écrit : « *opening `point` after S4's reveal leaks nothing by §7.6 A's
> own logic, since `famille` is closed and no second curve is drawable* ». **C'est faux, et
> l'erreur est sur ce qu'est une fuite.** Rouvrir `point` à S4 ne dessine pas deux courbes à la
> fois — il dessine **une courbe après l'autre, depuis cinq départs, toutes visant la même
> ligne**. Ce que l'élève APPREND en trois clics est **la première moitié mot pour mot de la
> bonne réponse de S5** (« *s'approchent toutes les trois de la même hauteur $4$* »). *La fuite
> ne se mesure pas au nombre de traits simultanés ; elle se mesure à ce que l'élève sait avant
> d'avoir parié.* **Et la porte l'arme déjà** (`fuite-inter-etapes`, essai rouge n° 22).
>
> **Ce que la vague 1 voulait vraiment est obtenu sans ouvrir `point` :** une quantité qui
> VARIE, pour que « jamais » s'exerce au lieu de s'énoncer. **Le contrôle qui la donne est déjà
> ouvert à S4 : c'est `b`.** À $P=(0;5)$ et $a=-\tfrac12$, promener $b$ sur ses quatre crans
> donne
> **écart $9 \to 5 \to 3 \to 1$** et **pente $-4{,}5 \to -2{,}5 \to -1{,}5 \to -0{,}5$**,
> avec `pente` $= a \times$ `ecart-au-palier` **aux quatre**. *Et sur les **HUIT** équations
> atteignables à S4, `ecart-au-palier` prend **cinq** valeurs distinctes $\{1;3;5;7;9\}$.*
> **C'est la `suite` de S4 (§7.4), et c'est l'exercice du mécanisme.**
> ⚠ **CHIFFRES REFAITS EN TROISIÈME PASSE, et c'est la propagation du B1** : *`a` n'offrant plus que
> deux crans à S4, les équations atteignables passent de $3\times4=12$ à $\mathbf{2\times4=8}$, et
> l'écart perd la valeur $4$ (qui venait de $a=-1$, $b=1$) : $\{1;3;5;7;9\}$, **cinq** valeurs.
> Détail, à $P=(0;5)$ : à $a=-\tfrac12$, écarts $\{9;5;3;1\}$ / pentes
> $\{-4{,}5;-2{,}5;-1{,}5;-0{,}5\}$ ; à $a=\tfrac12$, écarts $\{1;5;7;9\}$ / pentes
> $\{0{,}5;2{,}5;3{,}5;4{,}5\}$ ; **`pente` $= a\times$ écart aux HUIT** ✓.* **Le fond de la
> réfutation ne bouge pas : la lecture variait déjà, et elle varie encore sur huit états.**
>
> ⚠ **Au passage, une moitié du BLOQ-2 est réfutée sur les faits** : le rapport affirme que
> `ecart-au-palier` « *a exactement une valeur, à une étape, invariable* ». **`b` était rouvert
> à S4 dans la première rédaction déjà** (§7.4). La lecture VARIAIT ; ce qui manquait, c'est
> qu'on demande à l'élève de la faire varier. *La réparation est une `suite`, pas un contrôle.*

### 5.6 État (5 clés) et lectures (4)

**État :** `a`, `b`, `point`, `champ`, `famille`. **Aucune clé posée sans contrôle.** La
fenêtre du repère, le pas du quadrillage et la longueur des segments sont des **constantes du
modèle** : aucun contrôle ne les atteint.

| id | ce qui s'affiche | forme | à partir de |
|---|---|---|---|
| `pente` | la pente que l'équation impose au point $P$ : $a\,y_0+b$ | entier ou demi-entier **exact** | **S1** |
| `pentes-comparees` | la pente **au point fixe $(0\,;3)$** et la pente en **$P$**, l'une sous l'autre. ⚠ **Le point fixe n'a PAS de lettre : il est nommé par ses coordonnées** (troisième passe, pédagogie 1bis M-b) | deux valeurs exactes | **S2** |
| `palier` | la hauteur où le champ est plat | entier **exact** ; « — » si l'étape ne l'a pas découvert | **S3** |
| `ecart-au-palier` | $y_0 - \left(-\dfrac{b}{a}\right)$ | entier ou demi-entier exact | **S4**, S5 *(ajoutée en vague 1)* |

**`pentes-comparees` est la lecture double du banc de modulation, transposée** (ADR 0041,
addendum du 2026-09-25, point 2 : *« là où une méthode de lecture SATURE, la scène affiche les
deux lectures, l'une sous l'autre »*). Ici la « méthode qui sature » est **lire la pente en
supposant qu'elle dépend de l'avancement** : elle donne le bon résultat **exactement quand les
deux points ont la même ordonnée**, et s'écroule dès que les ordonnées diffèrent.

> ⚠ **RÉÉCRITE EN VAGUE 1 (pédagogie I5), et c'est le défaut le plus fin des deux rapports.**
> *La première rédaction disait « les pentes aux DEUX POINTS QUE LA CONSIGNE CITE » — et la
> consigne de S2 cite $(0;3)$ et $(2;3)$, avec `point` **verrouillé** sur $(2;3)$. **La lecture ne
> pouvait donc afficher que deux valeurs ÉGALES, à toutes les étapes, sur tous les états.** Le
> contraste qui donne son sens à l'invariance — *hauteur différente $\Rightarrow$ pente
> différente* — n'était affiché par AUCUNE lecture, et surtout pas par celle bâtie pour lui.*
> **Conséquence de porte, et c'est de l'ADR 0033 tout cru :** N3 revendiquait une mesure dans
> les deux sens (« *DIFFÉRENTES sinon* ») **que le produit ne pouvait pas exercer**, et l'essai
> rouge n° 4 (« toujours égales ») était **indétectable** — une porte exacte sur une question
> plus étroite que son en-tête.
>
> **La réparation :** la lecture compare **un point FIXE, $(0\,;3)$** (celui de S1), **et $P$, qui
> devient mobile après la révélation de S2**. À la révélation, $P$ est en $(2;3)$ ⟹ les deux
> valeurs sont **égales** ($-3$ et $-3$) ; l'élève pose ensuite $P$ à une autre hauteur et elles
> **diffèrent** ($-5$ en $(0;5)$, $+3$ en $(0;-3)$, $-2$ en $(0;2)$ — table B). **Les deux sens
> existent dans le produit, donc N3 et les essais rouges n° 4 et n° 5 mesurent enfin quelque
> chose.**
>
> 🔻 ⚠ **ET LA RÉPARATION DE VAGUE 1 AVAIT UN DÉFAUT PROPRE, CORRIGÉ EN TROISIÈME PASSE
> (pédagogie 1bis, M-b) : elle a fait naître un SECOND POINT que rien ne déclarait, et une
> COLLISION DE LETTRES à trois noms.** *État de la deuxième passe, relu : le §5.6 appelait le point
> de comparaison **$R$**, la consigne et le pari de S2 appelaient le point mobile **$Q$**, le retour
> de `identique` disait « déplace **$P$** », et $(0;3)$ s'appelait **$P$** à S1 et **$R$** à S2.
> **Le même lieu portait deux lettres, et le point mobile en portait trois.** Et **aucune table du
> §5 ni du §6 ne déclarait ce second point comme DESSINÉ ni comme ÉTIQUETÉ** — une marque à
> l'écran que le contrat de dessin ne mentionnait pas.*
> **Règle neuve, non négociable, et elle vaut pour les six étapes :**
> - **Le point mobile s'appelle $P$, partout, à toutes les étapes.** *La lettre $Q$ disparaît du
>   document ; la lettre $R$ n'y entre pas.*
> - **Le point de comparaison de S2 n'a pas de lettre : il est désigné par ses coordonnées
>   $(0\,;3)$**, comme les cinq crans de `point` le sont depuis la vague 1 (§5.2 C, pédagogie I7).
>   *Une lettre de plus est une chose de plus à retenir, pour un objet que la scène n'utilise qu'une
>   fois.*
> - **Il est DÉCLARÉ dessiné** : à S2, à l'ENCRE, avec ses coordonnées, **et il compte dans le
>   budget d'étiquettes** (§6.2 — à S2 il n'y a pas d'étiquette de palier, donc le budget de quatre
>   tient exactement).

**`ecart-au-palier` est la lecture du MÉCANISME, et elle est autorisée parce que R0 l'a déjà
écrite.** `lesson.md:33` pose $T'(t)=-k\big(T(t)-20\big)$ : la vitesse est proportionnelle à
l'écart. La lecture affiche **le nombre** $y_0 - y_p$, à côté de `pente` — et l'élève voit,
sans qu'une ligne de prose le lui dise, que `pente` $= a \times$ `ecart-au-palier`. *Elle
n'apparaît qu'à **S4**, après que le palier a été trouvé : avant, elle n'a pas de sens.*

> **Ce qu'elle parcourt à S4, contre le reproche de vague 1 — ⚠ CHIFFRES REFAITS EN TROISIÈME
> PASSE (propagation du B1).** À $P=(0;5)$, avec `a` (neuf, **deux crans**) et `b` (rouvert)
> ouverts, les **HUIT** équations atteignables donnent
> `ecart-au-palier` $\in \{1;3;5;7;9\}$ — **cinq** valeurs — et `pente` $= a \times$ écart **aux
> huit** : à $a=-\tfrac12$, écarts $\{9;5;3;1\}$ / pentes $\{-4{,}5;-2{,}5;-1{,}5;-0{,}5\}$ ;
> à $a=\tfrac12$, écarts $\{1;5;7;9\}$ / pentes $\{0{,}5;2{,}5;3{,}5;4{,}5\}$. *La ligne $a=-1$
> (écarts $\{7;5;4;3\}$ / pentes $\{-7;-5;-4;-3\}$) **existe dans le modèle et le test unitaire la
> refait**, mais elle n'est plus **atteignable au clic** à S4 : c'est elle qui apportait la valeur
> $4$.* **La lecture variait déjà ; ce qui manquait, c'est une `suite` qui la fasse varier — elle
> existe maintenant (§7.4).**
> ⚠ **Et elle est AJOUTÉE aux lectures de S5** (elle n'y était pas) : à S5 la famille rend le
> même mécanisme lisible sur trois départs, et le retour de `meme-ligne` s'y appuie.

**Aucune lecture ne répète ce que le DESSIN montre déjà** (leçon de la vague 2 du banc
d'électrolyse). Le partage est strict et mesuré :

| ce qui vit SUR le plan (jamais dans la liste) | ce qui vit dans la LISTE (jamais sur le plan) |
|---|---|
| l'équation $y'=ay+b$ **avec ses valeurs**, sur son badge · le point $P$ et ses coordonnées · les segments du champ · la **ligne du palier** (tirets d'accent) · les courbes | `pente` · `pentes-comparees` · `palier` *(le NOMBRE — la ligne est sur le plan, sa hauteur est dans la liste)* · `ecart-au-palier` |

*La porte le vérifie **dans les deux sens** : la liste ne contient pas l'équation (le badge la
porte), et le plan ne porte aucun des quatre nombres de la liste. **Une exception déclarée :**
la hauteur du palier est à la fois une lecture et l'ordonnée d'une ligne dessinée — c'est le
seul doublon, et il est voulu, parce que la ligne sans son nombre ne dit pas lequel des quatre
paris est juste (exactement l'exception de l'arc dans la spec sœur).*

**Ce que la scène n'affiche PAS, et il faut le dire :**
- **Aucune formule de solution**, à aucune étape, sous aucune forme (§9.1).
- **Aucune constante $C$**, ni lettre, ni valeur (§9.1).
- **Aucun palier quand $a$ le rendrait indéfini** : le cas $a=0$ n'est pas un cran, donc la
  lecture `palier` a toujours une valeur — **il n'y a aucun « — » à afficher**, et c'est une
  propriété de la grille, pas un hasard.
- **Aucune pente en un point qui ne serait pas $P$** : le champ montre des directions, la
  liste ne chiffre que celle de $P$ (et celle du second point cité à S2).

---

## 6. Ni temps ni course — et la langue visuelle

### 6.1 `temps: false`, `course: false` — et le pari reste entier

Même régime que `plan-complexe-transformation`, `sphere-plan-droite` et
`banc-de-diffraction` : le verdict est **immédiat**, et c'est `etat_revele` qui fait répondre
la **scène avant le texte** (ADR 0041, addendum du 2026-09-24 nuit, point 1).
`validate-content` interdit `revele_apres_h > 0` sur une scène sans temps ; **il n'y en a
aucun ici**.

**Comment le pari reste avant tout :**
- tant que l'élève n'a pas choisi, **le contrôle de l'étape n'existe pas dans le DOM**, ni le
  verdict, ni aucune lecture-réponse ;
- la scène montre l'**énoncé arrêté** : le repère, le quadrillage, le badge de l'équation avec
  ses valeurs, le point $P$ avec ses coordonnées — **et rien de plus** ;
- **aucun segment de champ au-delà de ce que l'étape déclare, aucune ligne de palier, aucune
  courbe, aucun pixel d'accent, à aucun moment, avant l'engagement** (§7.6) ;
- après l'engagement : le champ s'étend, la ligne du palier se pose, la courbe se trace, les
  lectures de l'étape s'écrivent. **C'est le plan qui répond, avant le texte.**

**CINQ étapes sur six portent un `etat_revele`, et c'est une différence avec la scène sœur (qui
n'en avait aucun) :** S2 (`champ: "ligne"`), S3 (`champ: "plan"`), S4 (`famille: "une"`), S5
(`famille: "trois"`), **S6 (`a: "-1"`)**. *S1 n'en porte pas.* ⚠ **Et S6 est le seul dont la
révélation change un RÉGLAGE D'ÉQUATION** (elle pose $a=-1$) — les quatre autres ne font
qu'**ouvrir le dessin**. *C'est justifié et c'est mesuré : le pari de S6 porte précisément sur
« quel $a$ ? », donc la scène répond en **posant le $a$** et en laissant l'élève promener $b$
pour le vérifier.*
🔻 ⚠ **ET LA RÉVÉLATION DE S6 FAIT UNE SECONDE CHOSE DEPUIS LA TROISIÈME PASSE : ELLE FAIT
APPARAÎTRE LE CONTRÔLE `a` DANS LE DOM** (pédagogie 1bis, **B2**). *Avant l'engagement, `a` **n'existe
pas** — l'idiome exact déjà appliqué à `point` à S2 et S3. **ADR 0041 §6, relu verbatim
(`docs/decisions/0041-scenes-3d-de-premiere-partie.md:98-100`) : « tant que l'élève n'a pas choisi, ni
le temps ni le contrôle de l'étape n'existent dans le DOM. »*** **La deuxième passe laissait `a`
ouvert avant le pari de S6, au motif qu'« essayer les trois crans EST le geste que l'étape veut » —
ce qui faisait de S6 un pari gagnable par TÂTONNEMENT.**
*Conséquence de porte, et c'est un défaut de MESURE qu'il faut nommer : la deuxième passe écrivait
« `avant-pari` mesure que $a$ **vaut** $-0{,}5$ avant l'engagement et $-1$ après » — **une sonde de
VALEUR, qui reste verte sur un contrôle ouvert trop tôt** (ADR 0033, troisième cas). **Il en faut
DEUX, et le §11.2 les porte séparément : la PRÉSENCE du contrôle, et la VALEUR de $a$.*** Et
`stem-non-contamine` vérifie en plus que l'état POSÉ de S6 n'est pas $-1$ **et que le cran $-1$ n'est
offert par aucun contrôle avant S6** (§11.3). **La porte mesure les deux temps ET les deux faits**
(§11.3, `etapes` ; §11.2, `avant-pari`).

**Éclairs et mouvement réduit.** Rien n'anime : la famille `eclairs` est **attendue
structurellement vide**, et **mesurée quand même** (§11.3) — *une chose n'est prouvée absente
que si l'on a énuméré ses formes* (ADR 0036). **Aucune courbe tracée en mouvement**, donc
aucune grille glissante à surveiller (règle de la corde). **Aucune trace entre étapes** :
chaque étape repart de son état déclaré. **Aucune VUE** : la scène est plane.

### 6.2 La langue visuelle (DESIGN-BIBLE §0, §5, §7 ; ADR 0041 §4)

- **À l'ENCRE — c'est l'ÉNONCÉ** : les deux axes et leurs graduations, le **quadrillage
  opaque**, l'origine, le **badge de l'équation** portant $y' = ay+b$ **avec ses valeurs
  numériques**, le **point $P$** avec ses coordonnées, **les segments du champ que l'étape
  a déjà ouverts**, ⚠ **et — À S2 SEULEMENT — le point fixe $(0\,;3)$ avec ses coordonnées**
  *(ajouté en troisième passe, pédagogie 1bis M-b : la lecture `pentes-comparees` le compare à $P$
  depuis la vague 1, **et aucune table ne le déclarait dessiné**. Il est de l'ÉNONCÉ de S2, donc à
  l'encre ; il **n'a pas de lettre**, seulement ses coordonnées ; et **il ne paraît à aucune autre
  étape**)*, ⚠ **et — à S5 — les TROIS points de départ** $(0;5)$, $(0;2)$, $(0;-3)$, que la
  consigne donne (déjà écrit au §7.5, **déclaré ici aussi** pour que cette liste soit complète).
  ⚠ **Précision de budget que la troisième passe rend nécessaire : les trois départs de S5 sont des
  MARQUES, sans étiquette HTML** — *leurs coordonnées sont dans la CONSIGNE, pas sur le plan ; sinon
  le budget de quatre étiquettes (ci-dessous) sauterait à six.* **Seul $P$ porte une étiquette, à
  toutes les étapes.**
  *Corollaire du manège, appliqué à la lettre : une donnée de l'énoncé ne se peint jamais dans
  la couleur de la réponse.*
- **À l'ACCENT — et seulement après la révélation** : la **ligne du palier** (tirets), **la
  rangée de segments qui est plate** (ceux posés à la hauteur du palier), les **courbes**, et
  les lectures de l'étape.
  > ⚠ **CORRIGÉ EN VAGUE 1 (pédagogie I9).** La première rédaction mettait **« les segments
  > neufs que la révélation ajoute »** à l'accent — c'est-à-dire, à S3, **169 marques d'accent
  > plus une ligne, d'un seul coup**. *La réponse au pari devenait une marque parmi cent
  > soixante-dix*, contre DESIGN-BIBLE « une chose à la fois, la richesse apparaît DANS le
  > calme ». **Règle nouvelle, non négociable : le champ révélé se pose à l'ENCRE ; l'ACCENT
  > est réservé à la RÉPONSE** — la rangée plate et sa ligne à S3, la courbe à S4, les trois
  > courbes à S5, la ligne et la lecture `palier` à S6. *Mesuré par `avant-pari` dans son
  > second sens (le champ DOIT exister après la révélation) et par une sonde de chrominance qui
  > compte les pixels d'accent : **à S3, après la révélation, l'accent ne couvre que la ligne et
  > la rangée de $13$ segments plats**, jamais les $169$.*
- **La ligne du palier n'a AUCUNE existence d'énoncé avant S3.** Règle 2 du tremplin (ADR 0041,
  addendum du 2026-09-25) : *l'objet-réponse peut n'avoir aucune existence d'énoncé.* Elle
  n'est **ni dessinée, ni nommée, ni décrite, ni atteignable par un réglage** avant la
  révélation de S3 — `avant-pari` y mesure une **absence TOTALE**, pas une absence d'accent
  (§11.2).
- **Les segments du champ ont une LONGUEUR FIXE à l'écran** (22 px au bureau, 16 px au
  téléphone), indépendante de la pente. *Sinon un segment de pente $-5$ serait cinq fois plus
  long qu'un segment de pente $-1$, et le champ raconterait une intensité qui n'existe pas.
  C'est une exagération, elle est constante, et le `fit_caveat` la dit (§10.5 — *renuméroté en
  vague 1 : une clause a été insérée en 3ᵉ position, celle qui dit qu'un dessin fini ne peut pas
  montrer « jamais »*).*
- **Le pas du champ est de 1 unité À TOUTES LES LARGEURS — $13 \times 13 = 169$ segments,
  partout.** ⚠ **RÈGLE REFAITE EN VAGUE 1 (fidélité I5, pédagogie M1), et le nombre qui la
  portait était faux.**
  *Ce que la première rédaction écrivait : « à $32{,}5$ px/unité ils se toucheraient — d'où le
  pas de 2 ». **Faux deux fois.*** **(1)** À $32{,}5$ px/unité et 16 px de segment, l'écart pire
  cas vaut $32{,}5-16 = 16{,}5$ px : ils ne se touchent pas, et **la porte aurait fait ROUGIR un
  pas de 1 sur une configuration qui passe son propre critère de lisibilité** ($\ge 6$ px) —
  c'est le reproche du critique, et il est exact. **(2)** Mais $32{,}5$ px/unité était lui-même
  faux (§5.1.0) : avec `carre` la vraie valeur à 390 px était $\approx 22$ px/unité, donc un
  écart de $\approx 6{,}4$ px, **au ras du critère** — le pas de 2 était presque juste, pour une
  raison que personne n'avait écrite.
  **L'arithmétique refaite sur `carre-partout`, qui est la configuration retenue :**

  | largeur | px/unité | longueur de segment | écart pire cas *(deux segments voisins, pente $0$ ou pente maximale $8$)* | verdict |
  |---|---|---|---|---|
  | $1\,280$ px | $46{,}67$ | 22 px | $46{,}67 - 22 = \mathbf{24{,}7}$ px | ✓ |
  | 390 px | $29{,}83$ | 16 px | $29{,}83 - 16 = \mathbf{13{,}8}$ px | ✓ |

  *Le pire cas est démontré, pas supposé : deux voisins HORIZONTAUX portent la MÊME pente (elle
  ne dépend que de $y$), donc ils sont colinéaires quand la pente vaut $0$ — c'est là que leurs
  extrémités sont le plus proches, à $\text{px/u} - L$. Deux voisins VERTICAUX sont au pire
  quasi verticaux (**pente maximale de la grille : $|-1 \times (-6) + 2| = 8$**, atteinte en
  $y=-6$ avec $a=-1$, $b=2$ — et son symétrique $|-1\times 6 - 2| = 8$ en $y=+6$ avec $b=-2$), et
  leur écart vaut $\text{px/u} - L\sin(\arctan 8) = 29{,}83 - 15{,}87 = 13{,}96$ px à 390. Les
  voisins diagonaux sont à $\text{px/u}\sqrt2$, toujours plus loin.*
  ⚠ **TÉMOIN CORRIGÉ EN TROISIÈME PASSE (fidélité 1bis, MINOR-7) : la révision écrivait
  $|-1\times(-6)+(-2)|$, qui vaut $\mathbf{4}$, pas 8.** *La VALEUR $8$ était juste et tout l'aval
  l'est aussi ($16\sin(\arctan 8) = 15{,}88$, puis $13{,}96$ px) ; c'est le **témoin** qui était
  faux — un $b$ de signe inverse. **Un nombre juste soutenu par un calcul faux est plus dangereux
  qu'un nombre faux : il traverse une relecture.***
  **Conséquences : `champ-lisible` exige $\ge 6$ px et un pas de 1 AUX DEUX LARGEURS ; l'essai
  rouge n° 16 (« passer le pas à 1 à 390 px ») est SUPPRIMÉ et remplacé (§11.4) ; et la `suite`
  de S2 n'a plus de réponse dépendante de la largeur** (§7.2 — c'était M1 côté pédagogie).
  ⚠ **Ce qui reste à MESURER en vague 2, et qui n'est pas de l'arithmétique : le CALME.** 169
  marques dans un carré de 358 px sont lisibles ; sont-elles calmes ? *Si la relecture de calme
  à 390 px juge que non, **le repli est un pas de 2 (49 segments) sous 600 px**, et il ne casse
  plus rien — la `suite` de S2 est désormais indépendante de la largeur par construction.
  **Écrit ici pour que le repli soit une décision, pas une improvisation.***
- **Aucune teinte hors jetons** : toutes les couleurs sont lues sur les jetons `--figure-*` à
  l'exécution (`lib/jetons-figure.ts`, **pas** `scene3d/palette.ts`, qui importerait three), et
  relues au changement de thème.
- **Tous les nombres passent par KaTeX**, jamais par la police du chrome : $y'$, $-\dfrac12$,
  $-\dfrac{b}{a}$, $\tfrac72$. *Exception, comme au plan complexe : **les nombres des
  graduations sont peints sur le canvas** (12 px, la police du chrome) — ce sont des entiers.*
- **Les étiquettes se posent avec `disposer`, jamais `poser`** (`Plateau.tsx:258`),
  **obligatoire ici** : le badge de l'équation, le nom de $P$, ses coordonnées et l'étiquette
  du palier peuvent tomber dans le même voisinage (à $b=2$, $a=-0{,}5$, `point: "haut"`, le
  palier est à $4$ et $P$ à $5$ — **une unité d'écart, soit 46,7 px au bureau et 29,8 px au
  téléphone**, chiffres refaits en vague 1). *Famille `etiquettes` à $1\,280$ **et** à 390 px.*
- **Budget d'étiquettes, mesuré — ⚠ REFAIT EN TROISIÈME PASSE, étape par étape (pédagogie 1bis,
  M-b).** Au plus **quatre** étiquettes HTML simultanées, **et le quatrième emplacement n'est pas
  occupé par la même chose partout** :
  - **S1** : badge, $P$, coordonnées de $P$ ⟹ **trois**.
  - **S2** : badge, $P$, coordonnées de $P$, **coordonnées du point fixe $(0\,;3)$** ⟹ **quatre**
    *(pas d'étiquette de palier : la ligne n'existe pas avant S3 — c'est ce qui laisse la place,
    et c'est pour cela que le budget tient exactement)*.
  - **S3, S4, S6** : badge, $P$, coordonnées de $P$, **étiquette du palier** ⟹ **quatre**.
  - **S5** : badge, $P$, coordonnées de $P$, étiquette du palier ⟹ **quatre** *(les trois départs
    sont des MARQUES sans étiquette, ci-dessus)*.

  **Sous 600 px, les nombres des axes passent de tous les $1$ à tous les $2$** ; les quatre
  étiquettes restent. *(Le pas des
  NOMBRES d'axe et le pas du CHAMP sont deux choses distinctes : le champ reste à 1 partout,
  les nombres passent à 2 sous 600 px. **Deux sondes séparées**, §11.2/§11.3.)*
- **La valeur qu'on règle et la valeur qu'on lit vont ENSEMBLE sur la scène collante** (leçon
  du banc de diffraction) : $a$ et $b$ sur le badge de l'équation, $P$ sur le plan. La liste
  des lectures défile ; le plan, non.

---

## 7. Les SIX étapes

**La pente en un point → elle ne regarde que la hauteur → la ligne plate → la courbe →
la famille → le cran où la règle fausse se cache.** Notation : `⟂-avant-pari` = ce qui doit
être **absent du DOM et du rendu** tant que l'élève n'a pas parié (ADR 0041 §6 + addendum du
2026-09-23 soir : *tout ce qui dépend de l'ISSUE attend la révélation*).

> **RÈGLE ARMÉE AVANT LES TABLES (leçon B2 de la spec sœur) : la valeur de CHAQUE choix est
> recalculée depuis le modèle que son étiquette nomme, et elle DIFFÈRE de la bonne réponse.**
> Les **vingt-quatre** choix qui suivent ont été refaits un par un sur cette règle ; le §14.0 la
> remet en tête de la liste de livraison.

> ⚠ **RÈGLE AJOUTÉE EN VAGUE 1 (pédagogie I2) : UNE `suite` = UNE QUESTION + UN GESTE.**
> *Quatre des cinq `suite` de la première rédaction en portaient deux (S2, S3, S4, S5), et c'est
> exactement la règle que la vague 2 de la scène sœur avait dû imposer (DÉCISIONS §29, HANDOFF
> §11.210).* **Les six `suite` ci-dessous sont refaites sur cette règle**, et ce qui en sort
> n'est pas jeté : la moitié porteuse qui y vivait devient **un pari** (S6), **une lecture qui
> varie** (S2, S4) ou **un retour** — jamais une phrase de plus.

### 7.1 S1 — `la-pente-en-un-point` · « Que dit l'équation, ici ? »

- **État :** `a: "-1"`, `b: "0"`, `point: "origine"` $(0;3)$, `champ: "un-point"`,
  `famille: "aucune"`.
- **`etat_revele` :** aucun. *La révélation **trace le segment** en $P$ et ouvre `pente` ; elle
  ne change aucun réglage.*
- **Contrôle ouvert :** `point` (**neuf**). **Lectures :** `pente`.
- **Consigne (voix) — ⚠ RÉÉCRITE EN TROISIÈME PASSE (pédagogie 1bis, B3.1) :** « Le plan, ses
  graduations, et un point $P$ **aux** coordonnées $(0\,;\,3)$. L'équation du chapitre 2,
  $y' = -y$. Tu sais déjà à quoi ressemblent ses solutions. **Oublie-les une minute.** **Avant même
  de rien tracer**, l'équation dit **une seule chose en chaque point du plan** : quelle pente
  aurait une solution qui passerait par là. »
  > **Ce qui a changé, et pourquoi c'était bloquant.** *La phrase disait « **Avant toute
  > courbe** ». **Le mot `courbe` est dans la colonne « interdit » de S1** (§7.7 C) — donc la
  > consigne de S1 **cassait la porte `formule-graduee` de S1, dans le document même qui l'arme.**
  > La porte aurait rougi au premier lancement, et sur le premier texte que l'élève lit.* **Le
  > remplacement ne coûte rien : « avant même de rien tracer » dit exactement la même chose sans
  > nommer l'objet que S4 introduira.** *(Et la faute d'accord « au coordonnées » est corrigée au
  > passage.)*
  > ⚠ **Et une chaîne est AJOUTÉE à la colonne « autorisé » de S1 : `solution`.** *Le pari de S1
  > écrit « Une **solution** passe par $P(0;3)$ » depuis la première rédaction, et la table ne
  > l'autorisait pas explicitement. **Une porte qui lit une liste blanche doit voir la chaîne que
  > le produit écrit** (ADR 0039) — sinon elle rougit sur un texte nécessaire, ce qui est le défaut
  > que la fidélité 1bis a trouvé au §9.10 (IMPORTANT-5).*
- **Pari :** « Une solution passe par $P(0\,;\,3)$. Quelle pente l'équation lui impose-t-elle
  en ce point ? »

| choix | texte | juste | misconception | retour (casse sur SA conséquence) |
|---|---|---|---|---|
| `produit` | $-3$ — la pente vaut $a\,y$, c'est-à-dire $-1 \times 3$ | **oui** | — | « Oui, et **retiens le mécanisme, pas le résultat** : l'équation $y'=-y$ se lit « la pente vaut moins la hauteur ». Elle a besoin de **deux** choses pour répondre — le coefficient, et **l'endroit où tu te tiens**. Pose $P$ ailleurs et relis : la pente change, alors que l'équation n'a pas bougé d'une lettre. » |
| `coefficient-seul` | $-1$ — l'équation dit $y' = -1$ : la pente est le coefficient | non | **`ed-comme-primitive`** | « Le plan dit $-3$. Ton modèle traite $y'=-y$ comme s'il s'agissait de $y'=-1$, c'est-à-dire d'une **primitive à trouver** — et une primitive de $-1$ est une droite, pas ce que le chapitre 2 a démontré. Le membre de droite ne dépend pas de $x$ : il dépend de **$y$**, donc de l'endroit. Change $P$ et regarde : si la pente valait $-1$, elle ne bougerait jamais. » |
| `signe-recopie` | $+3$ — $y'=-y$ se récrit $y'+y=0$ : le coefficient est $1$, donc la pente vaut $1 \times 3$ | non | **`signe-exposant`** | « Le geste est juste, la lecture est faite trop tôt. $y'+y=0$ est la **même** équation, mais le coefficient ne se lit **qu'une fois l'équation mise sous la forme $y'=ay$** : ici $y'=-y$, donc $a=-1$, pas $+1$. Le plan le confirme : le segment **descend**. Un $+3$ ferait monter une solution que le chapitre 2 fait tendre vers $0$. » |
| `pente-nulle` | $0$ — résoudre une équation, c'est chercher où quelque chose s'annule : la pente cherchée est $0$ | non | **`ed-inconnue-nombre`** | « Regarde le segment : il n'est pas plat. Ce que ton modèle cherche — **un point** où quelque chose s'annule — n'est pas ce qu'une équation différentielle demande : son inconnue n'est ni un nombre ni un point, c'est une **fonction entière**, et l'équation relie $y'$ à $y$ **en chaque point**, pas seulement là où c'est nul. *Il y aura bien une hauteur où la pente est nulle ; elle n'a rien à voir avec « résoudre », et ce n'est pas encore la question.* » |

- **`suite` (31 mots) — ⚠ REMPLACÉE EN VAGUE 1 (pédagogie I4) :** « Ne lis pas le nombre :
  **compte sur le quadrillage.** En avançant d'**un** carreau vers la droite le long du
  segment, de combien de carreaux descend-il ? »
  *Réponse : **trois**, et la lecture `pente` affiche $-3$ ✓ — les deux doivent tomber
  ensemble.* **Une question, un geste** ✓.
  > **Pourquoi ce remplacement.** §5.1 défend le quadrillage comme porteur — « *une pente $-3$
  > descend de trois carreaux pour un carreau à droite, **et c'est ainsi qu'un élève la
  > vérifie*** » — et **aucune étape ne demandait jamais cette vérification : toutes les pentes
  > de la scène étaient IMPRIMÉES.** *Le profil maths de VISION exige que courbe ↔ équation ↔
  > valeur numérique bougent ensemble ; ici équation↔nombre était câblé et dessin↔nombre ne
  > l'était jamais.* **Et ça reste dans le cadre** : lire un coefficient directeur sur un
  > quadrillage n'est pas du vocabulaire de champ de pentes, c'est de la lecture graphique de
  > seconde.
  >
  > **Ce que cette `suite` remplace, et où c'est parti.** L'ancienne (« promène $P$ : sur
  > combien de positions la pente est-elle la même ? » → **deux**) était la charnière vers S2.
  > *Elle n'est pas perdue : le retour de `produit` la porte déjà mot pour mot (« **Pose $P$
  > ailleurs et relis** : la pente change, alors que l'équation n'a pas bougé d'une lettre »), et
  > un retour a le droit de commander un geste.* **La charnière tient, et la `suite` n'a plus
  > qu'une question.**
- **⟂-avant-pari :** le segment en $P$ ; la lecture `pente` ; **tout autre segment de champ** ;
  toute ligne de palier ; toute courbe ; le verdict ; **tout pixel d'accent** (mesuré en
  **chrominance**, leçon du solide de révolution) ; et la description lue au lecteur d'écran ne
  doit contenir ni « $-3$ », ni « descend », ni « pente ».

### 7.2 S2 — `la-hauteur-seule-decide` · « Et deux unités plus loin ? »

- **État :** `a: "-1"`, `b: "0"`, `point: "decale"` $(2;3)$, `champ: "un-point"`,
  `famille: "aucune"`.
- **`etat_revele` :** **`champ: "ligne"`** — la révélation **étend le champ à toute
  l'horizontale $y=3$**, treize segments parallèles. *C'est la scène qui répond, avant le
  texte.*
- **Contrôles :** `champ` (**neuf**) ; **`point` est ROUVERT APRÈS la révélation** (⚠ vague 1,
  pédagogie I5 — voir la `suite`). *Avant la révélation, `point` est **absent du DOM** : $P$ est
  verrouillé en $(2;3)$.* **Lectures :** `pentes-comparees`.
- **Consigne (voix) — ⚠ RÉÉCRITE EN VAGUE 1 (pédagogie M3, M4), **et la LETTRE change en troisième
  passe** (pédagogie 1bis, M-b) :** « Même équation, $y'=-y$. À l'étape précédente, en
  $(0\,;\,3)$, elle imposait la pente $-3$. **Voici maintenant $P$.** »
  *Le plan porte **$P$ et ses coordonnées $(2\,;\,3)$** à l'ENCRE, **et le point fixe $(0\,;3)$ avec
  ses coordonnées, sans lettre** : c'est l'énoncé, et c'est au DESSIN de le dire.*
  > **Deux corrections de vague 1, et elles vont ensemble.** *(M3)* La première rédaction écrivait
  > « ***même hauteur**, quatre unités plus loin* » **en gras**, pour un pari dont la question
  > est précisément « est-ce que la hauteur seule décide ? » — **le pouce sur la balance**. Les
  > coordonnées portent le fait sans le souffler. *(M4)* Et en énonçant « le point est à la hauteur
  > $3$ » **dans le texte**, la consigne **réfutait elle-même** le choix `arretee` (« la
  > solution est arrivée en bas et s'est arrêtée ») : une option morte. *En la laissant au
  > dessin, la réfutation reste disponible — mais c'est l'élève qui doit la voir, et c'est
  > exactement ce qu'on veut lui apprendre à faire.* **Jugement déclaré : l'option n'est pas
  > « vivante » au sens plein ; elle est **réfutable par une observation que l'élève doit
  > faire**. §13.18 la met au propriétaire.*
  > ⚠ **ET LA CORRECTION DE TROISIÈME PASSE : la lettre $Q$ disparaît du document.** *Le point
  > mobile s'appelle **$P$** aux six étapes ; le point de comparaison de S2 **n'a pas de lettre**.
  > Motif au §5.6 : la vague 1 avait introduit $R$ pour le point fixe **pendant que** la consigne
  > appelait le point mobile $Q$ **et que** le retour de `identique` disait « déplace $P$ » —
  > **trois lettres pour deux points, et $(0;3)$ s'appelait $P$ à S1 et $R$ à S2.** Une scène dont
  > la nomenclature change d'une étape à l'autre enseigne, en creux, que les noms ne veulent rien
  > dire.*
- **Pari :** « Quelle pente l'équation impose-t-elle en $P$ ? »
- **Les quatre valeurs, recalculées chacune depuis SON modèle, et distinctes :** $-3$ ·
  $-1{,}5$ (la pente amortie de moitié) · $0$ (arrivé en bas, arrêté) · $-1$ (le coefficient). ✓
  *⚠ **$-0{,}75 \to -1{,}5$ en vague 1** (fidélité M7) : $-0{,}75$ était **hors de
  $\tfrac12\mathbb{Z}$**, l'invariant que §5.3 B déclare pour TOUTE pente de la scène et que la
  porte arme en N5. La porte ne lisant que les LECTURES, elle n'aurait pas rougi — **mais on
  offrait à l'élève une pente que la scène déclare impossible.** $-1{,}5$ est dans
  $\tfrac12\mathbb{Z}$, distinct des trois autres, et porte le même modèle.*

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `identique` | $-3$ — la **même** qu'en $(0;3)$ | **oui** | — | ⚠ **RÉÉCRIT EN TROISIÈME PASSE (B3.2)** : « Oui, et c'est **la** chose à retenir de cette étape : **dans l'équation, l'abscisse n'apparaît nulle part.** À droite du signe égal il n'y a que la hauteur. L'équation ne sait pas où tu en es ; elle ne sait qu'**à quelle hauteur** tu es. Le champ vient de se déplier sur toute la ligne : treize segments, tous parallèles. **Maintenant déplace $P$ : mets-le à une autre hauteur et regarde les deux lectures.** » |
| `amortie` | $-1{,}5$ — plus loin, la pente s'est amortie : elle vaut la moitié | non | **`modele-sans-ecart`** | « Le plan affiche $-3$, comme au départ. Ton modèle fait dépendre la pente **du chemin parcouru** — et c'est exactement ce que le chapitre 1 a démenti : le rythme ralentit, oui, mais **pas parce qu'on a avancé**. Il ralentit parce que la **hauteur** a changé. Ici, elle n'a pas bougé, donc la pente non plus. **Déplace $P$ vers le haut : là, elles diffèrent.** » |
| `arretee` | $0$ — une solution qui descend de $3$ par unité serait déjà arrivée en bas bien avant : là où elle s'arrête, sa pente est nulle | non | **`modele-taux-constant`** | ⚠ **RÉÉCRIT EN TROISIÈME PASSE (B3.3 / fidélité MINOR-10)** : « Regarde où $P$ est posé : à la hauteur $3$ — le plan l'y montre, et il lui donne $-3$. Ton modèle prédisait qu'il ne pouvait plus y être. **Une pente de $-3$ ne dit pas « je vais m'arrêter là » : elle ne dit que ce qui se passe ICI, à cette hauteur. Déplace $P$ vers le haut et relis : la pente n'est pas la même. Il n'y a donc aucun rythme unique à prolonger jusqu'à une arrivée.** » |
| `coefficient-seul` | $-1$ — la pente vaut le coefficient, partout et toujours | non | **`ed-comme-primitive`** | « Le plan affiche $-3$. Si la pente valait $-1$ partout, **tous** les segments du champ seraient parallèles, y compris à des hauteurs différentes — étends le champ à tout le plan et regarde : ils ne le sont pas. Ce que tu viens de voir de vrai, c'est qu'ils sont parallèles **sur une même ligne horizontale**, et seulement là. » |

> ⚠ **DEUX RETOURS DE S2 RÉÉCRITS EN TROISIÈME PASSE, et les deux cassaient la porte que ce
> document arme (pédagogie 1bis, B3 ; fidélité 1bis, MINOR-10).**
> **(1) `identique` écrivait « dans $y'=ay+b$ » — et `b` et `+ b` sont dans la colonne « interdit »
> de S2** (§7.7 C). *Le retour JUSTE de l'étape, celui que l'élève lit quand il a raison,
> introduisait le terme constant **une étape avant que S3 ne le fasse naître**. `formule-graduee`
> aurait rougi sur S2.* **La réécriture dit la même chose sans l'écrire : « dans l'équation,
> l'abscisse n'apparaît nulle part ; à droite du signe égal il n'y a que la hauteur ».**
> **(2) `arretee` se terminait par « elle ralentit à mesure qu'elle approche, et c'est pour cela
> qu'elle n'arrive pas ».** *C'est **la bonne réponse de S4 ET son mécanisme**, deux étapes trop
> tôt — et la table du §7.7 C n'autorise `s'approche` / `n'atteint jamais` qu'à partir de **S4**.
> La fidélité le classe « exception non couverte » (MINOR-10), la pédagogie « la réponse de S4 deux
> étapes en avance » (B3.3) : **les deux ont raison, et c'est la même phrase.*** **La réécriture
> casse `modele-taux-constant` sur SA conséquence — « il n'y a aucun rythme unique à prolonger » —
> avec le geste que S2 vient d'ouvrir (déplacer $P$), et elle ne dit rien de ce que fait une
> courbe.** *Aucune exception à déclarer : il n'y en a plus.*

- **`suite` (28 mots) — ⚠ REFAITE EN VAGUE 1 (pédagogie I2, I5, M1) :** « Pose $P$ à une
  **autre hauteur**. Les deux lectures restent-elles égales ? »
  *Réponses, toutes exactes et toutes dans la table B : $P=(0;3)$ ⟹ $-3$ et $-3$, **égales** ;
  $P=(0;5)$ ⟹ $-3$ et $-5$ ; $P=(0;-3)$ ⟹ $-3$ et $+3$ ; $P=(0;2)$ ⟹ $-3$ et $-2$ — **la
  hauteur, et elle seule, les fait diverger**.* **Une question, un geste** ✓, **et la réponse ne
  dépend d'aucune largeur d'écran** ✓.
  > **Ce que cette `suite` remplace.** L'ancienne en portait **deux** (« parcours une
  > horizontale… parcours une verticale… ») et **la seconde avait une réponse dépendante de la
  > largeur** (« treize » au pas de 1, **sept** au pas de 2 — M1 et I5) : l'élève au téléphone
  > comptait sept et concluait qu'il s'était trompé. *Le pas est maintenant de 1 partout (§6.2),
  > donc le défaut n'existe plus — **mais la `suite` ne le rejoue pas quand même**, parce que ce
  > n'est pas le geste qui manquait.* **Le geste qui manquait, c'est celui-ci** : la moitié
  > porteuse de S2 — *la pente VARIE avec $y$, donc il existe une hauteur qui la tue* — était
  > dans une `suite` non pariée et **n'était affichée par aucune lecture** (I1, I5). Elle est
  > maintenant **dans la lecture même**, et le champ dépliable la confirme.
- **⟂-avant-pari :** le segment en $P$ ; **tout segment ailleurs qu'en $P$** ; la lecture
  `pentes-comparees` ; **le contrôle `point`** ; toute ligne de palier ; toute courbe ; le
  verdict ; tout pixel d'accent ; et la phrase lue ne contient ni « $-3$ » comme valeur en $P$,
  ni « même », ni « parallèle ».
  *La pente en $(0;3)$ est **ÉNONCÉE dans la consigne**, à l'encre — le pari ne porte pas sur
  elle, mais sur ce qu'elle devient ailleurs. **C'est la première des deux exceptions du
  §7.7**, et « la valeur est ÉNONCÉE » n'est pas « la LECTURE existe » : `pentes-comparees`
  n'est pas dans le DOM avant la révélation.*
  ⚠ **Et le point fixe $(0\,;3)$ lui-même EST de l'énoncé** : il est dessiné à l'encre avec ses
  coordonnées **avant** le pari (§6.2, troisième passe) — *ce qui attend la révélation, c'est **sa
  pente dessinée** et **la lecture qui met les deux nombres l'un sous l'autre**, jamais la marque.*

### 7.3 S3 — `la-ligne-plate` · « À quelle hauteur le champ est-il plat ? »

- **État :** `a: "-0.5"`, `b: "2"`, `point: "haut"` $(0;5)$, **`champ: "aucun"`**,
  `famille: "aucune"`.
- **`etat_revele` :** **`champ: "plan"`** — la révélation **déplie le champ entier À L'ENCRE**
  et **pose en ACCENT la ligne du palier à $y=4$ (tirets) avec la rangée de segments qui y est
  plate**. *C'est le moment le plus « la scène répond avant le texte » de toute la scène.*
  ⚠ *La première rédaction peignait **les 169 segments neufs en accent** en même temps que la
  ligne : la réponse devenait une marque sur cent soixante-dix (pédagogie I9). **Le champ est de
  l'encre ; l'accent est la réponse.** §6.2.*
- **Contrôles :** `b` (**neuf**) ; **`point` est ROUVERT APRÈS la révélation** (⚠ vague 1,
  pédagogie I3). *Avant la révélation, `champ`, `point` et `a` sont **absents du DOM** — ouvrir
  `champ` répondrait au pari (§7.6 A).* **Lectures :** `pente`, **`palier`**.
  > **Pourquoi `point` s'ouvre ici, et pourquoi ça ne fuit rien.** *Trois des quatre retours de
  > S3 citent une valeur de `pente` que l'élève était invité à lire et **ne pouvait pas
  > atteindre** : avec `point` verrouillé sur $(0;5)$, la lecture n'affichait que $-0{,}5$ —
  > **un nombre qu'aucun texte de S3 n'emploie**. Le modèle le plus servi de la notion
  > (`palier-recopie-b`) cassait donc sur un chiffre inaccessible.* **`point` ouvert, la lecture
  > `pente` parcourt $\{0{,}5 ; -0{,}5 ; 3{,}5 ; 1\}$ aux quatre hauteurs de la grille
  > (table B), et `pente` gagne enfin sa ligne à S3** — une lecture ne mérite sa ligne que là où
  > elle est découverte ou utilisée. **Et la fuite est nulle** : `famille` est fermé, donc
  > **aucune courbe n'est traçable**, et `ecart-au-palier` n'est pas dans le DOM avant S4.
- **Consigne (voix) :** « L'équation change : $y' = -0{,}5\,y + 2$. Un terme constant est
  apparu. **Et on efface le champ** : c'est à toi de dire, avant de le revoir, ce qu'il fait.
  Quelque part dans ce plan, il y a une hauteur où les segments sont **horizontaux** — une
  solution qui passerait par là ne monterait ni ne descendrait. »
- **Pari :** « À quelle hauteur le champ est-il plat ? »
- **Les quatre valeurs, recalculées chacune depuis SON modèle, et distinctes :**
  $-\dfrac{b}{a} = 4$ · $b = 2$ · $+\dfrac{b}{a} = -4$ · $0$ (comme si $b=0$). ✓
  *Les quatre sont dans la fenêtre $[-6;6]$ et sur une graduation entière : les quatre sont
  DÉSIGNABLES sur le plan, et c'est ce qui rend la révélation lisible.*

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `moins-b-sur-a` | à la hauteur $4$ | **oui** | — | « Oui. Et voici **pourquoi**, en une ligne : une solution plate est une fonction **constante**, $y=k$ ; sa dérivée est nulle partout ; l'équation devient donc $0 = a\,k + b$, et il n'y a qu'un $k$ possible : $k = -\dfrac{b}{a} = -\dfrac{2}{-0{,}5} = 4$. **On ne devine pas cette hauteur : on la résout.** Le paragraphe qui suit cette scène la démontre pour tous les $a$ et tous les $b$. » |
| `recopie-b` | à la hauteur $2$ — c'est la valeur de $b$ | non | **`palier-recopie-b`** | « Le plan vient de tracer la ligne plate à $4$, pas à $2$. Vérifie-le toi-même sans le plan : si $y=2$ était plat, on aurait $0 = -0{,}5\times 2 + 2 = 1$ — et $1 \neq 0$. **Pose $P$ sur $(0\,;2)$ : la lecture affiche $+1$**, le champ y **monte**. Le terme $b$ ne se recopie pas : il se **divise**, et il change de signe. » |
| `signe` | à la hauteur $-4$ | non | **`palier-signe`** | ⚠ **RÉÉCRIT EN TROISIÈME PASSE (pédagogie 1bis, M-a)** : « La route est la bonne, le signe non — et c'est l'erreur la plus coûteuse du chapitre, parce qu'elle donne un nombre qui **ressemble** à la réponse. $-\dfrac{b}{a} = -\dfrac{2}{-0{,}5}$ : **deux** signes moins, donc un résultat **positif**, $+4$. Le contrôle qui ne trompe jamais : réinjecte. À $y=-4$, la pente vaudrait $-0{,}5\times(-4)+2 = +4$ — **et tu peux le vérifier toi-même : regarde les segments tout en bas du plan, ils sont tout sauf plats. Pose $P$ sur $(0\,;-3)$ et lis.** En bas, rien n'est plat. » |
| `zero` | à la hauteur $0$ — comme au chapitre 2 | non | **`palier-oubli`** | « C'était vrai **tant que $b$ valait $0$** — et c'est exactement ce qui vient de changer. **Remets $b$ à $0$ : la ligne plate revient sur l'axe, et ta réponse redevient juste.** Remets-le à $2$ : elle remonte. À la hauteur $0$ le champ **monte** maintenant, tu le vois sur les segments — le terme constant est précisément ce qui décolle la ligne plate de l'axe. » |

> ⚠ **LES TROIS RETOURS SONT RÉÉCRITS EN VAGUE 1 (pédagogie I3), et le défaut valait le
> reproche.** *Les trois citaient une valeur de `pente` juste — $+1$ à $y=2$, $+4$ à $y=-4$,
> $+2$ à $y=0$ — **et aucune des trois n'était atteignable** : `point` était verrouillé sur
> $(0;5)$, où la lecture affiche $-0{,}5$.* **Réparé en deux temps :** `point` s'ouvre après la
> révélation, **et** chaque retour ne cite plus qu'un contrôle **réellement disponible** —
> $(0;2)$ ⟹ $+1$ ✓, $(0;-3)$ ⟹ $+3{,}5$ ✓, et le cran $b=0$ ⟹ la ligne revient sur l'axe ✓.
> *Les hauteurs $-4$ et $0$ n'ont pas de cran de point : les retours les font **VOIR sur le
> champ** (qui est à l'écran depuis la révélation) au lieu de les faire **lire**. **Une
> observation disponible vaut mieux qu'un nombre inaccessible.***
>
> ⚠ **ET UNE RETOUCHE DE TROISIÈME PASSE SUR `signe` (pédagogie 1bis, M-a) : il RACONTAIT le sens
> des segments du bas — « ils montent à pic » — et ce sens est la moitié de ce que S5 fait parier**
> (`celle-du-bas-descend` : « sous la ligne, ça descend »). *Le retour DÉSIGNE désormais la région
> (« regarde les segments tout en bas du plan, ils sont **tout sauf plats** ») et **laisse l'élève
> lire le nombre** en posant $P$ sur $(0;-3)$ — la lecture y affiche $+3{,}5$, et c'est **lui** qui
> en tire le sens.* **Ce que S3 doit établir, c'est « en bas, rien n'est plat » ; le SENS du champ
> sous la ligne appartient à S4 et S5.**

- **`suite` (26 mots) — 🔻 ⚠ REFAITE EN TROISIÈME PASSE, ET C'EST LA MOITIÉ PORTEUSE DU BLOQUANT
  B1 :** « Promène $b$, $a$ inchangé, et **suis la ligne plate du regard** : de combien de
  graduations se déplace-t-elle quand $b$ passe de $1$ à $2$ ? »
  *Réponse : **deux graduations, pour un seul cran de $b$** — à $a=-0{,}5$ les paliers valent $-4$,
  $0$, $2$, $4$ pour $b=-2$, $0$, $1$, $2$ (table A du §5.3 ✓), donc $2 \to 4$ : **la ligne se
  déplace deux fois plus loin que $b$.*** **Une question, un geste** ✓.
  > 🔻 **CE QUE CETTE `suite` REMPLACE, ET POURQUOI C'ÉTAIT BLOQUANT** (pédagogie 1bis, B1.1).
  > *La `suite` de la deuxième passe demandait : « **Sur combien de crans la ligne plate tombe-t-elle
  > exactement sur la valeur de $b$ ?** » (réponse : un seul, $b=0$). **Deux défauts, et le second
  > est grave.***
  > **(1) Elle violait l'interdit que S3 s'impose à elle-même.** *La table du §7.7 C interdisait à
  > S3 « toute phrase où « palier » et « $b$ » sont dits ÉGAUX », et la porte `formule-graduee` lit
  > la `suite` autant que la consigne et les retours (§11.2). **La `suite` de S3 aurait fait rougir
  > S3.***
  > **(2) Elle ENTRAÎNAIT le geste qui donne la réponse de S6.** *Un élève qui a compté les crans où
  > « la ligne plate tombe sur $b$ » à S3 **a appris à faire cette comparaison** ; à S4 la `suite`
  > lui dit « promène $b$ », `palier` est affiché, $b$ est sur le badge, et `a` était son contrôle
  > neuf. **La découverte de S6 n'était plus protégée que par le fait que personne ne la nommait —
  > alors que la scène venait d'en enseigner le geste.*** **C'est la prise la plus juste des deux
  > rapports de vague 1bis.**
  > **Ce que la nouvelle `suite` fait à la place, et pourquoi elle est MEILLEURE que celle qu'elle
  > remplace :** *elle exerce **la compétence que ce document déclare mesurée nulle part** — « **la
  > ligne comme un LIEU qui se DÉPLACE avec $b$** » (§4.6, §7.5, §13.9). Elle ne compare jamais le
  > palier à $b$ ; elle mesure un DÉPLACEMENT. Et sa réponse est exacte, entière, et lisible sur le
  > quadrillage.*
  > ⚠ **Conséquence à porter : S3 n'établit plus la racine $b=0$ de $b(a+1)=0$.** *Ce n'est pas une
  > perte — cette racine est désormais établie **là où elle sert**, dans le retour de
  > `b-zero-seulement` à S6 (« à $a=-0{,}5$ comme à $a=0{,}5$, la seule coïncidence est $b=0$ »), et
  > `lesson.md:184` réunit les deux. §7.7 E est réécrit en conséquence.*
- **⟂-avant-pari :** **le champ tout entier** (aucun segment, nulle part — l'état est
  `champ: "aucun"`) ; **la ligne du palier**, sous toutes ses formes : ni trait, ni étiquette,
  ni nombre, ni mention dans la description lue (**absence TOTALE**, règle du tremplin) ; la
  lecture `palier` ; la lecture `pente` ; **le contrôle `point`** ; le verdict ; tout pixel
  d'accent.
  *$P$, ses coordonnées et le badge de l'équation **sont l'ÉNONCÉ** : ils restent à l'encre.*

### 7.4 S4 — `elle-n-y-arrive-jamais` · « On part au-dessus : que fait la courbe ? »

- **État :** `a: "-0.5"`, `b: "2"` (palier $4$), `point: "haut"` $(0;5)$, `champ: "plan"`,
  `famille: "aucune"`.
- **`etat_revele` :** **`famille: "une"`** — la révélation **trace la courbe qui passe par
  $P$**, et ouvre `ecart-au-palier`.
- **Contrôle ouvert :** `a` (**neuf**), ⚠ **sur DEUX crans seulement — $-0{,}5$ et $+0{,}5$**
  (troisième passe, pédagogie 1bis B1 : *le cran dégénéré $-1$ n'est **pas offert**, parce qu'il
  n'avait plus d'emploi écrit à S4 depuis la vague 1 et que son seul effet possible était de livrer
  la réponse de S6 — §5.2 A, §5.5*). *`b` est **rouvert** (la `suite` en a besoin) ;
  `point`, `champ` et `famille` sont **absents** (§5.5 : rouvrir `point` ici donnerait la
  réponse de S5 — **et c'est le seul endroit où cette révision refuse une consigne de vague 1**,
  refus **accepté par la vague 1bis**, §5.5 et §13.16).* **Lectures :** `pente`, `palier`,
  **`ecart-au-palier`**.
- **Consigne (voix) — ⚠ AMPUTÉE EN VAGUE 1 (BLOQ-3), **et raccourcie encore en troisième passe**
  (pédagogie 1bis, L-c) :** « Même équation. Tu viens de trouver la ligne plate : elle est à $4$.
  Le point $P$ est en $(0\,;\,5)$ — **juste au-dessus**. »
  > ⚠ **« d'une unité » est COUPÉ** (L-c). *Cette locution livrait **l'écart au palier** — la
  > lecture que la révélation ouvre et sur laquelle le retour de `approche` bâtit tout le
  > mécanisme — **un temps avant que la scène ne l'affiche.** « Juste au-dessus » suffit à poser
  > l'état ; le NOMBRE appartient à la lecture.*
  > **Ce qui a été coupé, et pourquoi c'est bloquant.** *La phrase supprimée était : « *Les
  > segments autour de lui descendent doucement ; plus bas, près de la ligne, ils sont presque
  > plats.* » **C'est le mécanisme qui décide le pari, livré juste avant le pari.** Le texte
  > répondait avant le dessin — l'inversion exacte de la règle de la maison, et **une répétition
  > d'un défaut déjà corrigé sur la scène précédente** (DÉCISIONS §29 / HANDOFF §11.210 :
  > « *la phrase de S3 qui racontait le dessin* », coupée en vague 2).* **Et elle faisait
  > plonger la rampe** : la consigne de S3 ne donne rien de plus que son état, celle de S4
  > donnait la valeur du palier **et** son interprétation — l'étayage AUGMENTAIT là où la
  > demande de raisonnement devait monter. **La consigne pose l'état et s'arrête. Le champ est à
  > l'écran : qu'il parle.**
- **Pari :** « La solution qui passe par $P$… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `approche` | descend vers $4$ et s'en approche **sans jamais l'atteindre** | **oui** | — | « Oui — et regarde les deux lectures l'une sous l'autre, c'est là qu'est le mécanisme : l'écart au palier vaut $1$, la pente vaut $-0{,}5$. **La pente est l'écart multiplié par $a$.** Promène $b$ et vérifie-le : écart $3$, pente $-1{,}5$ ; écart $5$, pente $-2{,}5$ ; écart $9$, pente $-4{,}5$. **Et voilà pourquoi « jamais » :** si l'écart tombait à zéro, la pente tomberait à zéro — la courbe serait alors la ligne plate elle-même, celle qui ne bouge jamais. Une courbe qui n'est pas cette ligne-là ne peut donc pas avoir un écart nul. ⚠ **Ce n'est pas le dessin qui te le dit** : à droite du cadre, les deux traits sont à quelques pixels l'un de l'autre, et plus loin encore ils se confondraient. **« Jamais » ne se voit pas ; il se calcule.** » |
| `droite-puis-stop` | descend **en ligne droite** jusqu'à $4$, puis s'arrête net | non | **`modele-taux-constant`** | « C'est le modèle A du chapitre 1, et le champ le dément sous tes yeux : une droite garderait la même pente, or les segments **changent d'inclinaison à chaque hauteur** — raides en haut, presque plats près de $4$. Une courbe qui suit ce champ ne peut pas être droite, et rien dans le plan ne lui dit de « s'arrêter ». » |
| `vers-zero` | descend vers $0$, comme au chapitre 2 | non | **`palier-oubli`** | « C'était la réponse **avant** que $b$ n'existe. Regarde le champ à la hauteur $0$ : les segments y **montent** (pente $+2$). Une courbe qui arriverait là serait repoussée vers le haut. Ce qui l'attend n'est pas l'axe, c'est la ligne que tu viens de trouver. » |
| `vers-moins-infini` | descend **sans limite** : $a$ est négatif, donc la solution décroît indéfiniment | non | **`signe-a-comportement`** | ⚠ **RÉÉCRIT EN TROISIÈME PASSE (pédagogie 1bis, M-a)** : « $a<0$ ne veut pas dire « ça descend toujours » : ça veut dire « ça **se rapproche** ». Regarde l'inclinaison des segments **au-dessous** de la ligne plate, et **compare-la à celle des segments au-dessus** : ce n'est pas la même chose. Ce que le signe de $a$ décide, c'est si la courbe **vise** le palier ou le **fuit**, pas le sens dans lequel elle va. **Et tu peux voir « sans limite », le vrai : bascule le coefficient sur $+0{,}5$. Là, la courbe s'éloigne de la ligne et sort du cadre. C'est ça, une décroissance — ou une croissance — sans limite ; ce n'est pas ce que fait $-0{,}5$.** » |

> ⚠ **Le retour de `vers-moins-infini` a été réécrit DEUX FOIS, et la deuxième réécriture répare la
> première.**
> **Vague 1 :** *il disait « *mets $P$ sous la ligne plate* » — **un geste que `point`, fermé à S4,
> rend impossible** : la scène commandait une action indisponible.* **Réécrit pour argumenter depuis
> le CHAMP.**
> 🔻 **Vague 1bis (M-a) : la réécriture avait introduit une autre version du même défaut.** *« ***
> Regarde les segments AU-DESSOUS de la ligne plate : ils montent.*** » **raconte** ce que S5 fait
> parier — `celle-du-bas-descend` prédit exactement que, sous la ligne, ça descend. Le retour de S4
> le réfutait **en mots**, un pas avant que S5 ne le demande. §13.11 s'était déclarée close ; **elle
> ne l'était pas.***
> **Troisième passe :** le retour **DÉSIGNE la région et fait COMPARER** (« compare l'inclinaison
> au-dessous et au-dessus »), sans dire le sens — *et il casse sur un GESTE que le contrôle neuf de
> S4 rend disponible : basculer $a$ sur $+0{,}5$ et voir la courbe s'éloigner.* **C'est ce qui donne
> enfin au contrôle neuf de S4 un emploi ÉCRIT** — la deuxième passe affirmait que « `a` garde son
> emploi » sans qu'aucun texte ne le commande. *§13.11 est rouverte puis refermée, avec son
> historique ; §13.16 reste.*

- **`suite` (19 mots — *plus courte de dix mots que celle de la deuxième passe, et elle dit la même
  chose*) — ⚠ REFAITE EN VAGUE 1 (BLOQ-1, BLOQ-2, I1, I2), **et sa première phrase corrigée en
  troisième passe** (pédagogie 1bis, L-a) :** « **Promène $b$**, sans rien changer
  d'autre. Regarde les deux lectures bouger ensemble : **que vaut la pente quand l'écart double ?** »
  *Réponses, exactes et toutes dans les tables A et B : à $a=-0{,}5$ et $P=(0;5)$, les quatre
  crans de $b$ donnent **écart $9 \to 5 \to 3 \to 1$** et **pente $-4{,}5 \to -2{,}5 \to -1{,}5
  \to -0{,}5$** ; **la pente est l'écart multiplié par $-0{,}5$, aux quatre.** Quand l'écart
  double, la pente double.* **Une question, un geste** ✓.
  > ⚠ **« Garde $P$ où il est » est REMPLACÉ par « sans rien changer d'autre »** (L-a). *La phrase
  > commandait de ne pas toucher à un contrôle **qui n'est pas dans le DOM à S4** (`point` y est
  > fermé, §5.5). **Une consigne qui nomme un réglage absent apprend à l'élève à chercher quelque
  > chose qui n'existe pas** — c'est le même genre de défaut que le « mets $P$ sous la ligne » que la
  > vague 1 avait fait couper dans le retour voisin.*
  > **C'est la réparation de fond du BLOQ-2.** *Le mécanisme qui rend « jamais » nécessaire —
  > l'écart rétrécit, donc la pente rétrécit, donc l'arrivée est impossible — n'était énoncé que
  > dans un retour, **et rien ne demandait de l'exercer**. Il est maintenant **la `suite`**, sur
  > une échelle de quatre valeurs exactes, avec un contrôle déjà ouvert et **sans aucune
  > fuite**.* ⚠ **Et la moitié de BLOQ-2 qui prétendait que la lecture ne pouvait pas varier est
  > réfutée** (§5.5) : elle variait déjà, sur **huit** états atteignables depuis la troisième passe
  > (douze avant le retrait du cran dégénéré) ; ce qui manquait était la consigne.
  >
  > **Ce que cette `suite` ne fait PLUS, et où c'est parti.** *L'ancienne portait **trois**
  > gestes et **imprimait la découverte de la scène** : « *mets $a$ sur $-1$ et promène $b$ :
  > **la ligne plate tombe sur la valeur de $b$ à chaque cran.** Cherche pourquoi* ». **C'est le
  > BLOQ-1** : la seule chose qu'une figure ne pourrait pas remplacer était livrée par assertion,
  > dans une `suite` facultative, sans pari, sans verdict, sans lecture et sans item. **Elle est
  > devenue l'étape S6 (§7.6), et son énoncé est un PARI dont $a=-1$ est la RÉPONSE.***
  > 🔻 ⚠ **ET LA VAGUE 1bis A MONTRÉ QUE LA SUPPRESSION NE SUFFISAIT PAS (B1.2).** *Ce `suite`-ci
  > dit « promène $b$ » **pendant que `a` était le contrôle neuf de l'étape et offrait encore le cran
  > $-1$**, que `palier` est une lecture affichée et que $b$ est sur le badge. **Supprimer le texte
  > qui nommait la coïncidence ne la rendait pas inatteignable : elle restait à deux clics, et S3
  > venait d'en enseigner le geste.*** **Réparé au PRODUIT : `a` n'offre plus le cran $-1$ à S4
  > (ci-dessus), et la `suite` de S3 n'entraîne plus la comparaison (§7.3).** *Le contrôle neuf de
  > S4 garde son emploi, et il est maintenant ÉCRIT : le retour de `vers-moins-infini` commande de
  > basculer sur $+0{,}5$.*
- **⟂-avant-pari :** **toute courbe** ; la lecture `ecart-au-palier` ; le verdict ; tout pixel
  d'accent ajouté par rapport à l'état d'énoncé. *Le champ, la ligne du palier, $P$ et le badge
  **sont l'ÉNONCÉ** ici — la consigne les donne, et le pari porte sur ce qu'une COURBE fait
  dedans. **C'est la seconde des deux exceptions du §7.7.*** ⚠ **Et le cran $a=-1$ n'est pas
  atteignable ici** — le contrôle n'en offre que deux (troisième passe, B1).

### 7.5 S5 — `toutes-la-meme-ligne` · « Trois départs, trois courbes : que font-elles ? »

- **État :** `a: "-0.5"`, `b: "2"` (palier $4$), `point: "bas"` $(0;-3)$, `champ: "plan"`,
  **`famille: "aucune"`**.
- **`etat_revele` :** **`famille: "trois"`** — la révélation trace les **trois** courbes
  passant par $(0;5)$, $(0;2)$ et $(0;-3)$.
- **Contrôle ouvert :** `famille` (**neuf**). *`point`, `b` et `champ` sont **rouverts** ; **`a`
  est rouvert sur DEUX crans**, $-0{,}5$ et $+0{,}5$ (troisième passe, pédagogie 1bis B1 : le cran
  dégénéré $-1$ n'est pas offert — il n'a aucun emploi à S5 depuis que la moitié de `suite` qui le
  posait a été supprimée en vague 1, et c'est la réponse de S6).*
  **Lectures :** `pente`, `palier`, **`ecart-au-palier`** *(⚠ ajoutée en vague 1 : le mécanisme
  de S4 doit rester lisible quand trois départs sont à l'écran — c'était une des prises du
  BLOQ-2, et elle est juste)*.
- **Consigne (voix) :** « Dernière question. Même équation, même ligne plate à $4$. On marque
  **trois** départs : $(0\,;\,5)$ au-dessus, $(0\,;\,2)$ en dessous, $(0\,;\,-3)$ bien en
  dessous. Une solution part de chacun. »
- **Pari :** « Ces trois courbes… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `meme-ligne` | s'approchent **toutes les trois** de la même hauteur $4$, et **aucune n'en traverse une autre** | **oui** | — | « Oui, et c'est ce que l'équation a d'étrange et de puissant : **la ligne plate ne dépend que de $a$ et de $b$**, jamais du point de départ. Les trois courbes viennent de trois endroits et visent le même $4$ — et **aucune n'en traverse une autre** : traverser voudrait dire deux pentes différentes au même point, ce que le champ ne permet pas. Regarde les trois écarts au palier : chacun rétrécit de son côté, aucun ne change de signe. » *(⚠ la dernière phrase — « Promène $P$ : tu ne trouveras pas de départ qui change la ligne » — est **retirée du retour et devenue la `suite`** en troisième passe : c'est un GESTE, et un geste à exercer appartient à la `suite`, pas au retour qui donnerait sa réponse.)* |
| `se-coupent` | se croisent quelque part, puisqu'elles vont toutes au même endroit | non | **`nombre-solutions-condition`** | « Regarde le point où elles se couperaient : le champ n'y donne **qu'une** direction. Deux courbes qui se croisent auraient, en ce point, deux pentes différentes — l'équation ne le permet pas. **Ce que tu observes, c'est qu'aucune n'en traverse une autre.** *Le chapitre 4 le démontrera : il suffit d'une valeur en un point pour n'en garder qu'une.* » |
| `une-seule-vraie` | une seule des trois est **la** solution de l'équation ; les deux autres n'en sont pas | non | **`solution-fonction-unique`** | « Les trois suivent le champ partout, donc les trois sont des solutions — le chapitre 2 le disait déjà : une équation différentielle ne détermine pas **une** fonction mais une **famille**. Ce qui choisit un membre de la famille, c'est le **point de départ**, pas l'équation. Change le nombre de courbes et regarde-les apparaître : rien ne distingue l'une des autres. » |
| `celle-du-bas-descend` | celle qui part de $-3$ **descend** : $a$ est négatif, donc toute solution décroît | non | **`signe-a-comportement`** | « Regarde-la : elle **monte**. Sous la ligne plate, le champ pointe vers le haut — à la hauteur $-3$ la pente vaut $-0{,}5\times(-3)+2 = 3{,}5$, et la lecture l'affiche. Son écart au palier vaut $-7$ : il est **négatif**, et c'est lui qui donne à la pente son signe $+$. $a<0$ ne dit pas « décroît » : il dit « **revient vers la ligne** », par en haut ou par en bas. » |

> ⚠ **DEUX RETOURS RÉÉCRITS EN VAGUE 1, POUR DEUX MOTIFS DIFFÉRENTS.**
> **(1) Fidélité I3 — un fait DU cadre justifié par un argument HORS cadre.** *Le fait (une
> seule solution par point) est au cadre des deux filières (« *solution vérifiant une condition
> initiale* », `maths-sexp.yaml:151`, `maths-sm.yaml:153`). L'ARGUMENT que la première rédaction
> en donnait ne l'est pas : « *C'est pour cela qu'un point donné ne détermine qu'une seule
> solution* », posé à la suite d'un raisonnement de non-croisement, **c'est le théorème que §9.7
> interdit par son nom** (`Cauchy-Lipschitz`, `unicité`), et **un élève ne peut pas l'écrire à
> l'examen.*** **Réparé :** les retours **énoncent l'observation** (« aucune n'en traverse une
> autre ») et **renvoient la preuve au chapitre 4**, dont la route est celle du cadre —
> `items.yaml:119-121` : « *Une condition initiale $y(x_0)=y_0$ fixe $C$ à une valeur unique* ».
> *La formule de renvoi est choisie pour ne déclencher aucune forme interdite du §9.2 : « il
> suffit d'une valeur en un point pour n'en garder qu'une » ne contient ni « condition
> initiale », ni « $x_0$ », ni « fixer la constante ».*
> **(2) Une VIOLATION DE LA FRONTIÈRE §9.3, que ni l'une ni l'autre des deux vagues n'a vue, et
> qui était dans le document depuis la première rédaction.** *Le retour de
> `celle-du-bas-descend` se terminait par « *C'est exactement la tasse du chapitre 1 […] un
> objet à $0\ °$C posé dans une pièce à $20\ °$C se réchauffe* » — **cinq chaînes interdites par
> le §9.3 dans une seule phrase** (`tasse`, `°C`, `°`, et le registre thermique entier), dans un
> texte destiné au PANNEAU. Le §9 affirmait pourtant : « *Relu : le §7 n'écrit aucune forme
> interdite.* » **C'était faux, et la porte `frontiere` aurait fait rougir la scène au premier
> lancement.*** *Deux autres occurrences du même défaut ont été supprimées au passage : la fin
> du retour de `approche` à S4 (« la tasse… le café… la température de la pièce ») et celle de
> `amortie` à S2. **Leçon, et elle est de l'ADR 0036 : une frontière qui se déclare relue se
> disculpe. C'est la porte qui doit le dire — et ici elle l'aurait dit.***
> *Et un troisième détail du même ordre : `une-seule-vraie` disait « Change `famille` » — **le
> nom d'une clé de descripteur**, que l'élève ne connaît pas. Réécrit en français.*

- **`suite` (29 mots) — 🔻 ⚠ REFAITE EN TROISIÈME PASSE (pédagogie 1bis, M-c **et** B1.3) :**
  « L'équation ne change pas. Réduis à **une** seule courbe, puis promène son départ sur les cinq
  crans : **sur combien de ces crans la ligne plate change-t-elle de hauteur ?** »
  *Réponse : **aucun** — le palier ne dépend que de $a$ et de $b$, jamais du départ (table A ✓).*
  **Une question, un geste** ✓ *(« réduis à une » est la configuration de départ, la promenade est
  le geste)*.
  > 🔻 **DEUX DÉFAUTS RÉPARÉS D'UN COUP, ET LE PREMIER EST UNE CONTRADICTION INTERNE.**
  > **(M-c) La `suite` de la deuxième passe demandait « combien de lignes plates différentes
  > trouves-tu ? » en prescrivant « promène $b$, puis $a$ » — un geste qui produit SIX lignes
  > plates.** *À $a=-0{,}5$, promener $b$ donne les paliers $-4$, $0$, $2$, $4$ ; ajouter $a$ en
  > donne d'autres encore. **La réponse déclarée était « une seule », et le geste prescrit la
  > démentait.*** *La cause est nommable : **l'invariance de S5 porte sur les DÉPARTS, pas sur
  > l'équation** — « un seul palier, quels que soient les points de départ » est vrai ; « un seul
  > palier, quels que soient $a$ et $b$ » est faux. **Le geste visait la mauvaise variable.**
  > **(B1.3)** *Et « puis $a$ » était la troisième des trois `suite` qui, ensemble, prescrivaient la
  > réponse de S6.* **Les deux mots partent, et le cran $-1$ avec eux (le contrôle `a` ne l'offre
  > plus ici).**
  > **Ce que cette `suite` ne fait plus depuis la VAGUE 1, et qui reste valable.** *La seconde
  > moitié (« mets $P$ sur $(0;2)$ avec $a=-1$ et $b=2$ : **une des trois courbes devient une
  > droite** ») cumulait trois défauts : un second geste ; **la réponse imprimée** ; et surtout
  > **elle POSAIT $a=-1$**.* **La solution constante reste trouvable sans passer par le cran
  > dégénéré** : c'est l'état `sur` $(0;2)$ à $(a;b)=(-0{,}5;1)$ — palier $2$, pente
  > $-0{,}5\times2+1 = 0$ ✓, **et ce couple est atteignable à S5, les deux contrôles étant
  > ouverts** — et le retour de `moins-b-sur-a` à S3 la nomme déjà (« *une solution plate est une
  > fonction constante* »).
- **⟂-avant-pari :** **toute courbe** (l'état est `famille: "aucune"`) ; le verdict ; tout pixel
  d'accent. *Les trois **points** de départ, le champ, la ligne du palier et le badge sont
  l'ÉNONCÉ — la consigne donne les trois. **Ce qui attend la révélation, ce sont les
  courbes.***

#### S5 et `famille-solutions` (R3) — confrontés, parce que c'est le seul vrai recouvrement de cette spec

| ce qui est montré | la scène, S5 (R2) | la figure `famille-solutions` (R3) | doublon ? |
|---|---|---|---|
| plusieurs solutions d'une même équation | **trois**, sur **huit** équations réglables à S5 *(et les douze à S6 — §5.5, troisième passe)* | **quatre**, sur **une** équation gelée ($a=-0{,}1$, $b=2$) | **non** : l'une fait varier l'équation, l'autre la condition initiale |
| le palier partagé | **trouvé** par un pari, puis vérifié en promenant $a$ et $b$ | **consigné** dans une légende, après la démonstration | **non** — et l'ordre compte : la scène précède la preuve, la figure la referme |
| la condition initiale qui choisit un membre | **jamais nommée** (§9.1) : la scène montre le fait géométrique, pas la méthode | **c'est son sujet** : la courbe en accent, $T(0)=90$, $C=70$ | **non** : deux objets distincts, et la frontière de rang tient |
| le cas « départ sous le palier » | le cran `bas` $(0;-3)$, et c'est le distracteur de S5 | la courbe $T_0=0$, en ink-soft, sans commentaire | **non** — *et la scène fait ce que la figure ne fait pas : elle en fait une QUESTION* |

**Conclusion : ils ne se doublent pas, et ils se complètent — la scène fait TROUVER à R2 ce que
la figure CONSIGNE à R3.** *Le §4.5 commande la phrase de raccord qui le dit à l'élève.*

#### S3 confrontée à `cp-r2-palier`, choix par choix

*La spec sœur a dû faire cette vérification APRÈS la vague 1, faute de l'avoir faite. Elle est
faite ici.*

| modèle | le choix de S3 | le choix de `cp-r2-palier` (**`checkpoints.yaml:150-184`** — *citation refaite en troisième passe ; `:141` est la ligne `habilete`, les quatre choix commencent à `:150`*) | doublon ? |
|---|---|---|---|
| `palier-recopie-b` | `recopie-b` : **une HAUTEUR**, $2$ — « où la ligne plate se trouve » | B : **une ÉCRITURE**, $y=Ce^{4x}-8$ — « quelle formule » | **non** : l'un se lit sur le plan, l'autre sur la page. *Ils nomment le même défaut, et l'élève qui échoue aux deux échoue deux fois au même endroit — ce qui est **voulu** : c'est le modèle le plus servi de la notion (5 étiquettes)* |
| `palier-signe` | `signe` : $-4$, **un lieu du plan** où l'on voit le champ monter à pic | C : $Ce^{4x}-2$, **une formule** | **non** |
| `palier-oubli` | `zero` : $0$, **l'axe**, et le champ y monte | D : $Ce^{4x}$, **une formule sans terme** | **non** |
| les nombres | $a=-0{,}5$, $b=2$, palier $4$ | $a=4$, $b=-8$, palier $2$ | ⚠ **CORRIGÉ EN VAGUE 1 (fidélité M5).** *La première rédaction écrivait « **aucun nombre commun** » : **c'est littéralement faux** — $2$ et $4$ figurent des deux côtés.* **Ce qui est vrai est plus fort : les RÔLES sont inversés.** $2$ est la **bonne** réponse du point d'arrêt et la **mauvaise** de la scène ; $4$ est le **coefficient $a$** du point d'arrêt et la **bonne réponse** de la scène. *Un élève qui mémorise « $2$ » échoue à la scène ; un élève qui mémorise « $4$ » échoue au point d'arrêt. **Rien de mémorisé ne transfère**, et c'est mieux que « aucun nombre commun ».* |

**Le coût résiduel, mesuré — ⚠ et REVU À LA HAUSSE en vague 1 (pédagogie I6).**
`cp-r2-palier` reste **après** R2 et garde ses quatre choix ; **rien, dans le rung, ne mesure la
lecture du palier comme un LIEU**. *Et la complémentarité revendiquée est **plus mince** que ce
document l'écrivait : **les deux exigent de calculer $-b/a$**, seul le format de sortie diffère.
La compétence vraiment neuve — **la ligne comme un LIEU qui se DÉPLACE quand $b$ change** — est
dans une `suite`, non pariée, et n'est mesurée nulle part.* **C'est ce qui a fait passer §13.9
de « aucun item » à « une variation de stem, COUPLÉE à la construction » (§4.6).**

### 7.6 S6 — `le-cran-ou-la-regle-fausse-se-cache` · « Pour quel $a$ « le palier, c'est $b$ » tombe-t-il juste ? »

> ⚠ **ÉTAPE NOUVELLE, ET C'EST LA RÉPARATION DU BLOQ-1.** *Ce que la première rédaction appelait
> « **la seule chose de cette scène qu'une figure ne pourrait pas remplacer même en dix
> étapes** » était livré par **une phrase affirmative dans une `suite` facultative de S4** :
> « *mets $a$ sur $-1$ et promène $b$ : **la ligne plate tombe sur la valeur de $b$ à chaque
> cran**. Cherche pourquoi.* » **La découverte était ÉNONCÉE, jamais trouvée** — pas de pari,
> pas de verdict, pas de lecture, pas d'item. **Une scène qui existe pour remplacer l'assertion
> livrait sa contribution unique par assertion.** *C'est l'inverse exact de TEMPLATE V2 §A
> (« prédire-s'engager-confronter … s'engage PAR une interaction réelle, jamais seulement
> rhétoriquement ») et de VISION (« chaque morceau vérifié avant de passer au suivant »).*
>
> **Et la tension avec le garde-fou de stem est RÉSOLUE, pas contournée.** §7.6 E interdit
> qu'une étape dont un choix porte `palier-recopie-b` **POSE** $a=-1$ — parce que le distracteur
> atteindrait alors la bonne réponse (*contamination de la réponse juste*, un défaut de stem).
> **La forme retenue est celle que la vague 1 suggère et que l'arithmétique confirme : le pari
> demande POUR QUEL $a$, l'état posé est $a=-0{,}5$, et $a=-1$ est la RÉPONSE.** *Le porteur de
> `palier-recopie-b` répond « à tous les crans » — **faux à $a=-0{,}5$ comme à $a=0{,}5$**, donc
> aucune contamination. Vérifié sur la table A, cellule par cellule.*

- **État :** `a: "-0.5"`, `b: "1"` (palier $2$), `point: "sur"` $(0;2)$, `champ: "plan"`,
  `famille: "aucune"`.
  *⚠ **L'état posé n'est PAS le cran dégénéré**, et la porte le mesure (`stem-non-contamine`).
  Et il est choisi pour que le contraste soit maximal sans être le piège : à $a=-0{,}5$, $b=1$,
  le palier vaut $2$ — **le double de $b$**, et $P$ y est posé **dessus**, donc la solution est
  la constante.*
- **`etat_revele` :** **`a: "-1"`** — la révélation **pose le coefficient sur $-1$**, **fait
  APPARAÎTRE le contrôle `a` dans le DOM** (avec ses trois crans) et repeint la ligne du palier à
  sa nouvelle hauteur, $1$. *C'est le seul `etat_revele` de la scène qui change un réglage
  d'ÉQUATION, et c'est exigé par la forme du pari : la question est « quel $a$ ? », donc la scène
  répond en posant le $a$ (§6.1). **L'élève promène ensuite $b$ lui-même pour le vérifier** — c'est
  la `suite`.*
- **Contrôles :** 🔻 ⚠ **`a` est ABSENT DU DOM AVANT L'ENGAGEMENT et PRÉSENT après** (troisième
  passe, pédagogie 1bis **B2**) ; `b`, `point`, `champ` et `famille` sont **rouverts** dès l'énoncé
  *(ils ne portent pas le pari)*. **Lectures :** **`palier`** *(⚠ `pente` RETIRÉE en troisième passe
  — pédagogie 1bis, L-b : **aucun texte de S6 ne l'emploie**, et la règle que ce document s'est
  donnée au §7.3 est qu'« une lecture ne mérite sa ligne que là où elle est découverte ou
  utilisée ». S6 se joue tout entier sur la HAUTEUR de la ligne)*.
  > 🔻 **POURQUOI `a` SE FERME AVANT LE PARI — la réparation du BLOQUANT B2, et elle était
  > inévitable.** *La deuxième passe écrivait, au §5.5 : « `a` … **S6** *(et c'est à S6 qu'il porte
  > le pari)* », et au §7.7 une **troisième exception** justifiant qu'il soit ouvert avant
  > l'engagement au motif que « **essayer les trois crans EST le geste que l'étape veut** ».*
  > **ADR 0041 §6, relu verbatim à `docs/decisions/0041-scenes-3d-de-premiere-partie.md:98-100` :
  > « *Chaque étape porte donc un pari … **tant que l'élève n'a pas choisi, ni le temps ni le
  > contrôle de l'étape n'existent dans le DOM**.* »** *L'exception confondait **l'ÉNONCÉ** (ce que
  > la scène montre pour qu'on puisse parier) avec **l'APPAREIL** (ce qui permet de chercher la
  > réponse). Un contrôle qui permet d'essayer les réponses n'est pas un énoncé : **c'est le
  > brouillon, et le pari passe avant le brouillon.*** **Et ce n'était pas seulement une entorse de
  > doctrine : `a` ouvert avant le pari faisait de S6 un pari qu'on pouvait GAGNER PAR TÂTONNEMENT
  > sans rien comprendre** — l'inverse exact de ce que la scène existe pour faire.
  > **Ce que la fermeture coûte : rien de ce que S6 enseigne.** *Le geste d'épuiser les crans est
  > **la `suite`**, où il est à sa place — après l'engagement, pour transformer un verdict en
  > certitude. Et ce qui restait caché reste caché : **l'unicité** (qu'aucun $a$ hors grille ne
  > marche) et **le motif** $b(a+1)=0$, tous deux dans le retour puis dans `lesson.md:184`.*
  > **Conséquence de contrat : la « troisième exception » du §7.7 est SUPPRIMÉE.** *Il n'y a de
  > nouveau que **deux** exceptions — S2 et S4 — ce que la phrase d'introduction du §7.7 disait déjà
  > (« Deux exceptions ») pendant que sa table en portait trois. **Le texte et la table sont
  > réconciliés dans le sens du texte.***
- **Consigne (voix) — 🔻 ⚠ RÉÉCRITE EN TROISIÈME PASSE, DEUX FOIS DANS LA MÊME PHRASE
  (fidélité 1bis **BLOCKING-2** ; pédagogie 1bis **M-e** = fidélité **MINOR-8**) :** « Une dernière
  chose, et **c'est le piège le plus coûteux de ce chapitre**. **La formule du palier se lit vite,
  et de travers** : « le palier, c'est $b$ ». Tu as vu que non — ici $b$ vaut $1$ et la ligne plate
  est à $2$. **Mais il y a un réglage où cette règle fausse tombe juste à tous les coups.** »
  > 🔻 **(1) « un piège que L'EXAMEN connaît » est SUPPRIMÉ, et c'était une affirmation sans
  > preuve dans un texte vu par l'élève** (BLOCKING-2). *La notion porte **une** annale vérifiée
  > (`bank.yaml:100`, `:102`, `:136` — 2022 N, SExp, $y''-2y'+y=0$, 1,0 pt) **et elle ne demande pas
  > $y'=ay+b$**. Il n'existe donc **aucune** preuve que l'examen pose ce piège. La phrase
  > contredisait le §0.3 (« *Cette spec n'en ajoute aucune* »), le §10.2 (« *La scène n'entraîne à
  > AUCUN geste d'examen* ») **et** `REVIEW-2026-09-12.md:23-29`, qui mesure zéro affirmation de
  > fréquence dans la notion et conclut « **Ne pas en ajouter.** »* **Le remplacement dit la même
  > chose du côté de l'ÉLÈVE, où c'est vrai et mesuré : ce modèle porte 5 étiquettes, le plus servi
  > des vingt-trois** (§0.1 d). *Et la forme est **armée** au §9.12 pour que cette classe
  > d'affirmation ne puisse pas revenir par relecture — le grep des relecteurs de `REVIEW` ne
  > l'aurait pas attrapée.*
  > 🔻 **(2) « Le chapitre 2 laissait croire… » est SUPPRIMÉ : le chapitre 2 ne laisse rien croire
  > de tel** (M-e / MINOR-8). *Sous la convention prouvée en tête de ce document
  > (`chapitre N = R(N-1)`), **le chapitre 2 est R1, $y'=ay$** — relu à `lesson.md:44-112` : **il
  > n'y a pas de $b$, et le mot « palier » n'y paraît pas.** Le terme constant naît à
  > `lesson.md:120-124`, **dans le chapitre 3**, et c'est là que la tentation naît avec lui.* **La
  > misconception est donc imputée à ce qu'elle vient vraiment de : la lecture rapide de la
  > formule.** *Imputer une erreur au mauvais chapitre coûte deux fois : ça désoriente l'élève qui
  > irait vérifier, et ça salit les seules citations « chapitre N » que `REVIEW:19-21` déclare
  > toutes justes.*
- **Pari :** « Pour quel coefficient $a$ la ligne plate tombe-t-elle exactement sur la valeur de
  $b$, **et cela pour CHACUN des quatre crans de $b$** ? »
- **Les quatre choix, chacun recalculé depuis SON modèle, tous distincts, aucun n'égalant la
  bonne réponse :**

| choix | texte | juste | misconception | retour (casse sur SA conséquence) |
|---|---|---|---|---|
| `a-moins-un` | pour $a = -1$, et pour lui seul | **oui** | — | « Oui. Et voici **pourquoi il est unique** : dire « le palier vaut $b$ », c'est écrire $-\dfrac{b}{a} = b$, donc $-b = ab$, donc $b(a+1)=0$. **Ou bien $b=0$ — le cas trivial, il n'y a rien à recopier — ou bien $a=-1$.** Il n'y a pas de troisième porte. Promène $b$ : à $-2$ la ligne est à $-2$, à $1$ elle est à $1$, à $2$ elle est à $2$. **C'est le pire cas possible pour un élève : une règle fausse qui ne se fait pas prendre.** Le paragraphe « Arrête-toi » qui suit cette scène l'écrit en toutes lettres. » |
| `tous` | pour **tous** : le palier, c'est $b$, toujours | non | **`palier-recopie-b`** | « Remets $a$ sur $-0{,}5$ : $b$ vaut $1$ et la ligne est à $2$. Mets $b$ sur $2$ : elle est à $4$. **À ce réglage-là, la ligne vaut le DOUBLE de $b$, jamais $b$.** Ta règle n'est pas « presque toujours vraie avec quelques exceptions » : **elle est fausse partout sauf à un endroit**, et tout l'intérêt de cette étape est de savoir lequel. » |
| `a-plus-un` | pour $a = +1$ | non | **`palier-signe`** | « La route est la bonne — tu as bien résolu « palier $=b$ » — mais un signe s'est perdu en chemin. $-\dfrac{b}{a}=b$ donne $-b = a\,b$, donc $a = -1$, **pas $+1$**. Le contrôle qui ne trompe jamais : essaie. À $a=-1$ et $b=2$, la ligne est à $2$ ✓ ; le plan te le montre. **C'est exactement le même signe perdu qu'à l'étape de la ligne plate** — et il coûte deux fois. » |
| `b-zero-seulement` | pour **aucun** $a$ : ça ne tombe juste qu'à $b=0$ | non | 🔻 **AUCUNE — délibérément** *(troisième passe : §13.20 tranchée, `palier-oubli` retiré)* | ⚠ **RÉÉCRIT EN TROISIÈME PASSE** : « Tu as raison sur ce que tu as pu essayer : à $a=-0{,}5$ comme à $a=+0{,}5$, la seule coïncidence est $b=0$ — **c'est une racine de la question, et c'est la triviale : quand $b$ vaut $0$, il n'y a rien à recopier.** Mais il y en a une seconde, et elle est ailleurs : **mets le coefficient sur $-1$ et promène $b$. La ligne suit $b$ à chaque cran.** **Il existe, et il est unique.** » |

*Vérification, table A du §5.3, cellule par cellule :* à $a=-1$, palier $= b$ **aux quatre
crans** ($-2 \to -2$, $0 \to 0$, $1 \to 1$, $2 \to 2$) ✓ ; à $a=-0{,}5$, paliers $-4;0;2;4$ —
coïncidence **au seul $b=0$** ✓ ; à $a=0{,}5$, paliers $4;0;-2;-4$ — **idem** ✓. *Les quatre
textes de choix sont des ÉNONCÉS, pas des hauteurs : ils sont distincts deux à deux par
construction, et **aucun n'est l'énoncé juste**.* ✓

> 🔻 ⚠ **S6 PORTE DEUX DISTRACTEURS ÉTIQUETÉS SUR TROIS, ET C'EST UNE DÉCISION, PAS UN TROU
> (§13.20 tranchée en troisième passe ; pédagogie 1bis M-f, fidélité 1bis MINOR-6 — **les deux
> critiques disent la même chose et inversent le défaut**).**
> *Le rattachement de `palier-oubli` à `b-zero-seulement` était déclaré « **le plus mince des
> vingt-quatre** » et mis au propriétaire — ⚠ **et « vingt-quatre » était déjà un compte faux : il
> n'y a que DIX-HUIT distracteurs, les six autres choix étant les bonnes réponses** (§8.2, corrigé en
> troisième passe). **Les deux rapports de vague 1bis le refusent, pour le même
> motif, et le motif est juste :*** « *Ça ne tombe juste qu'à $b=0$* » **est ce que conclut un élève
> qui cherche BIEN et s'arrête tôt** — *une **recherche incomplète**, pas un modèle tenu.* **Et
> `palier-oubli` dit autre chose** (`items.yaml:68-72`, relu : « *ne garde que la partie homogène
> $Ce^{ax}$ et oublie d'ajouter le palier, comme si le terme constant $b$ était nul* ») : *c'est un
> défaut de **forme écrite de solution**, que la scène n'écrit jamais.*
> **Le choix RESTE, l'étiquette TOMBE.** *Motif, et il est de la doctrine du diagnostic : **une
> étiquette fausse est pire qu'une étiquette absente**, parce que le modèle apprenant en tire un
> signal qui n'existe pas. Un élève qui coche `b-zero-seulement` ne nous dit pas qu'il croit le
> palier nul : il nous dit qu'il a cherché sans finir — ce qui est une information, mais pas celle
> que l'étiquette prétendrait porter.*
> **Ce que ça change, et c'est peu :** `pedagogy_wiring` déclare ce choix **sans `misconception`**
> (§12) ; **`palier-oubli` reste servi par la scène à S3 et à S4**, donc **les onze modèles
> revendiqués ne bougent pas** ; **aucun compte de couverture ne bouge** (la scène n'a jamais touché
> `items.yaml`) ; et le §14.0 compte désormais **dix-sept** distracteurs étiquetés sur dix-huit.
> *La `description` de repli du §8.2 n'a plus d'objet pour ce choix-là.*

- **`suite` (25 mots) :** « Le coefficient reste sur $-1$. **Promène $b$ et lis la hauteur à chaque
  cran : sur combien de crans la ligne rate-t-elle la valeur de $b$ ?** »
  *(⚠ « $a$ » devient « le coefficient » en troisième passe — un simple choix de voix, la lettre
  restant sur le badge ; la `suite` est POST-verdict, donc aucune frontière ne s'y joue.)*
  *Réponse : **aucun** — à $a=-1$ le palier vaut $b$ aux quatre crans (table A ✓).*
  **Une question, un geste** ✓. *C'est le geste qui transforme le verdict en certitude : l'élève
  ne croit pas la scène sur parole, il l'épuise.* ⚠ **Et c'est ici, et seulement ici, que le
  contrôle `a` existe** (B2) : *la `suite` est le premier moment où l'élève peut promener le
  coefficient — le pari est derrière lui.*
- **⟂-avant-pari :** 🔻 **le CONTRÔLE `a` lui-même — absent du DOM, comme `point` l'est à S2 et S3**
  (troisième passe, B2) ; **le cran $a=-1$ comme ÉTAT** (l'état posé est $-0{,}5$, et `avant-pari`
  le mesure) ; le verdict ; tout pixel d'accent ajouté ; **et aucune mention, dans la consigne ou
  dans la description lue, d'une valeur de $a$** — ni « $-1$ », ni « moins un », ni
  « $b(a+1)=0$ », ni « unique ». *Le champ, la ligne plate à $2$, $P$ et le badge **sont
  l'ÉNONCÉ** : la consigne les donne.* 🔻 ⚠ **IL N'Y A PLUS DE « TROISIÈME EXCEPTION » AU §7.7 :
  elle est supprimée, et c'était elle le BLOQUANT B2.**
  > 🔻 **CE QUE CE PARAGRAPHE DISAIT, ET POURQUOI IL NE PEUT PLUS LE DIRE.** *La deuxième passe
  > écrivait : « **`a` est OUVERT avant le pari** … **C'est voulu, et ce n'est pas une fuite :
  > essayer les trois crans EST la réponse.** » **Deux choses ne tenaient pas.** **(a)** ADR 0041 §6
  > (`0041:98-100`) est sans réserve : *tant que l'élève n'a pas choisi, le contrôle de l'étape
  > n'existe pas dans le DOM*. **(b)** Et sur le fond : un pari dont l'appareil permet d'essayer les
  > réponses **se gagne par tâtonnement**. *La deuxième passe avait même écrit une clause
  > `avant-pari` qui « mesure que $a$ vaut $-0{,}5$ **avant** l'engagement » — **une porte exacte
  > sur une question plus étroite que son en-tête** (ADR 0033, troisième cas) : elle mesurait la
  > VALEUR posée, jamais la PRÉSENCE du contrôle. **Le défaut qu'elle aurait dû attraper passait
  > donc au vert.***
  > *Ce qui reste caché est inchangé : **l'unicité** — qu'aucun autre $a$, au-delà des trois de la
  > grille, ne marche — et le **motif**, $b(a+1)=0$. **La scène fait trouver le cran ; la prose
  > prouve qu'il est seul.***

### 7.7 Le contrat « avant le pari », et les cinq formes de la fuite

*⚠ **Le §7.6 est désormais l'étape S6** ; ce contrat, qui portait ce numéro, devient le §7.7.
**Tous les renvois « §7.6 A/B/C/D/E » du document désignent les sous-sections A à E
ci-dessous** — ils sont conservés tels quels pour ne pas casser les citations de la vague 1, et
la lettre suffit à lever l'ambiguïté.*

**Règle générale, valable aux SIX étapes.** Ce qui dépend de l'ISSUE — un segment de champ
au-delà de ce que l'étape déclare, la ligne du palier, toute courbe, et toute lecture que la
consigne n'a pas énoncée — **n'existe pas dans le DOM avant l'engagement**, ni dans le rendu,
ni dans la phrase lue au lecteur d'écran.

**Deux exceptions, déclarées, et chacune motivée. 🔻 ⚠ DEUX, ET NON TROIS : la « troisième
exception » de la deuxième passe est SUPPRIMÉE en troisième passe (pédagogie 1bis, B2).**
*La phrase d'introduction disait « Deux exceptions » pendant que la table en portait trois —
**la table et le texte se contredisaient, et c'est la table qui avait tort.***

| étape | ce qui est visible AVANT le pari, en plus | pourquoi | ce que ça coûte |
|---|---|---|---|
| **S2** | **la valeur $-3$, la pente en $(0;3)$, écrite dans la CONSIGNE** ; **et le point fixe $(0\,;3)$ dessiné à l'encre avec ses coordonnées** *(déclaré en troisième passe, M-b)* | la consigne **donne** le point de comparaison ; le pari ne porte pas sur elle, mais sur ce qu'elle devient deux unités plus loin | rien : le segment en $P$, **le segment au point fixe**, la lecture `pentes-comparees`, le contrôle `point` et tout le reste du champ restent absents. *« La valeur est ÉNONCÉE » n'est pas « la LECTURE existe » — la porte mesure la seconde* |
| **S4** | **le champ entier et la ligne du palier, à l'ENCRE** | la consigne les **donne** (« tu viens de trouver la ligne plate : elle est à $4$ ») ; le pari porte sur ce qu'une COURBE y fait | rien : toute courbe, `ecart-au-palier` et l'accent restent absents. ⚠ **Et le pari reste gagnable par le raisonnement depuis le champ — c'est le but** (§7.7 D) |
| ~~**S6**~~ | 🔻 **SUPPRIMÉE.** *La deuxième passe exemptait **le contrôle `a` lui-même, ouvert avec ses trois crans**, au motif qu'« essayer les trois crans EST le geste que l'étape veut ».* | 🔻 **Le motif confondait l'ÉNONCÉ et l'APPAREIL** — ADR 0041 §6 (`0041:98-100`) : *le contrôle de l'étape n'existe pas dans le DOM avant le choix.* **Et un pari dont l'appareil essaie les réponses se gagne par tâtonnement.** | 🔻 **La suppression ne coûte rien : le geste d'épuiser les crans est la `suite` de S6**, donc il a lieu — après l'engagement, là où il transforme un verdict en certitude au lieu de le remplacer |

#### A — la fuite par les RÉGLAGES

*La porte **réécrit elle-même** cette table contre le descripteur (§11.2,
`fuite-inter-etapes`) : elle énumère, avant chaque étape, tous les états ATTEIGNABLES (l'état
posé, sa révélation, puis chaque contrôle ouvert sur tous ses crans) et vérifie qu'aucun ne
produit la réponse d'un pari ultérieur.*

*⚠ **Table refaite en vague 1** : `point` est rouvert à S2 et S3 (après la révélation), S6
s'ajoute, et **la colonne de droite doit montrer que les deux ouvertures neuves ne fuient
rien**. La porte relit cette table contre le descripteur ; **une ouverture qui n'y est pas
écrite fait rougir `fuite-inter-etapes`.***
🔻 *⚠ **ET REFAITE ENCORE EN TROISIÈME PASSE (pédagogie 1bis, B1 et B2) : la colonne « contrôle(s)
ouvert(s) » porte désormais le NOMBRE DE CRANS OFFERTS, et pas seulement le nom du contrôle.***
**C'est la leçon de fond du BLOQUANT B1 :** *cette table énumérait les CONTRÔLES ouverts et
supposait qu'un contrôle ouvert offre tous ses crans. **La fuite de S6 vivait exactement dans cette
supposition** — `a` « ouvert à S4 » voulait dire « le cran dégénéré est à un clic, dès S4 ». **Un
contrat de non-fuite qui compte les contrôles et pas les crans ne peut pas voir ce genre de
fuite.***

| étape | contrôle(s) ouvert(s) | ce qu'ils atteignent | un pari suivant est-il mis en danger ? |
|---|---|---|---|
| **S1** | `point` seul (5) | les 5 points, **à la seule équation $y'=-y$**, `champ` verrouillé sur `un-point` | **non** pour S2 : `champ` est fermé — **le champ ne peut pas s'étendre**, donc l'invariance ne se VOIT pas ; elle se DÉDUIT en promenant $P$, et le retour de `produit` le demande. **non** pour S3/S4/S5/S6 : `b`, `a`, `famille` fermés — **$b$ vaut $0$, donc il n'y a pas de palier à trouver** |
| **S2** | `champ` (neuf, 4) **+ `point` (rouvert APRÈS la révélation, 5)** | les quatre densités **et** les cinq points, **à la seule équation $y'=-y$** | **non** pour S3 : `b` est fermé, donc **le palier est l'axe** et la lecture `palier` **n'existe pas dans le DOM** — promener $P$ ne fait varier que `pentes-comparees`, et c'est exactement ce que S2 enseigne (§7.2). **non** pour S4/S5 : `famille` fermé, **aucune courbe n'est traçable**. **non** pour S6 : `a` fermé, **un seul $a$ atteignable** |
| **S3** | `b` (neuf, 4) **+ `point` (rouvert APRÈS la révélation, 5)** | les quatre $b$ × les cinq points, **au seul $a=-0{,}5$** ; `champ` fermé (`aucun` avant la révélation, `plan` après) | **non** pour S4 : `famille` fermé, **aucune courbe** — `ecart-au-palier` n'est pas dans le DOM. **non** pour S5 : idem. **non** pour S6 : **`a` est FERMÉ**, donc le cran $a=-1$ est inatteignable et la question « pour quel $a$ ? » n'a pas d'expérience disponible. *C'est la raison pour laquelle `point` peut s'ouvrir ici sans coût (pédagogie I3)* |
| **S4** | `a` (neuf, 🔻 **2 crans : $-0{,}5$ et $+0{,}5$**) + `b` (rouvert, 4 crans) | 🔻 **$2 \times 4 = 8$ équations**, **au seul point `haut`**, `famille` figée à `une` après révélation | **non** pour S5 : **`point` est FERMÉ** — on ne peut pas faire naître une courbe ailleurs, donc « elles visent toutes le même palier » n'est pas atteignable. *C'est la raison d'être de la fermeture (§5.5), et c'est **le point où cette révision refuse une consigne de vague 1** (§13.16, **refus accepté par la vague 1bis**).* 🔻 ✅ **pour S6 : PLUS DE DANGER, ET IL EST TENU PAR LE PRODUIT.** *Le cran $a=-1$ **n'est pas offert** : la coïncidence palier $=b$ **n'est pas atteignable à S4**, quel que soit le nombre de clics.* **C'était un « DANGER PARTIEL borné par le silence des textes » jusqu'à la troisième passe ; c'est maintenant une impossibilité, et la porte la mesure sur le DESCRIPTEUR** (`fuite-inter-etapes`, essai rouge n° 22 ter) |
| **S5** | `famille` (neuf, 3) + `point` (5) + `b` (4) + `champ` (4) + `a` (🔻 **2 crans**) | 🔻 **8 équations** × 5 points × 4 densités × 3 familles | 🔻 ✅ **non** pour S6, **et par le produit** : *le cran $a=-1$ n'est pas offert à S5 non plus. La moitié de `suite` qui le posait a été supprimée en vague 1 ; **le cran lui-même part en troisième passe**, et « puis $a$ » quitte la `suite` restante (§7.5, M-c).* **Aucun texte de S5 ne nomme un cran de $a$, ET aucun clic ne l'atteint** |
| **S6** | les cinq contrôles — 🔻 **mais `a` n'ENTRE dans le DOM qu'à la révélation**, avec ses **3 crans** | tout | — |

**L'héritage est DÉCLARÉ** : `b` est rouvert à S4, S5 et S6 ; `point` à S2, S3, S5 et S6 ;
`champ` à S5 et S6 ; **`a` à S4 et S5 sur DEUX crans, et à S6 sur trois, après la révélation.**
*Sans cet héritage, aucune `suite` ne pourrait faire constater un invariant — et l'invariant est ce
que la scène enseigne.*
🔻 **LA NON-FUITE EST DÉSORMAIS TENUE PAR LE PRODUIT AUX SIX LIGNES** : par des **contrôles
fermés**, par des **crans non offerts**, par des **lectures absentes du DOM**. *Le TEXTE reste une
seconde barrière (§7.7 C), il n'est plus la seule.*

> 🔻 ✅ **L'AVEU DE LA DEUXIÈME PASSE EST LEVÉ, ET C'EST LE MEILLEUR RÉSULTAT DE LA TROISIÈME.**
> *La deuxième passe écrivait : « **Les quatre premières lignes de cette table tiennent la non-fuite
> par des contrôles fermés — c'est-à-dire par le PRODUIT. La ligne de S6 ne peut pas : son cran est
> atteignable depuis S4.** La non-fuite y est tenue par le fait qu'aucun texte n'attire l'attention
> dessus, ce qui est une garantie **plus faible**. » **C'était honnête, et c'était insuffisant** —
> et la vague 1bis a montré pourquoi : **trois `suite` de la scène attiraient l'attention dessus**,
> dont celle de S3, qui en **entraînait le geste** (B1).*
> **Ce qui a changé : on ne borne plus le danger, on le supprime.** *Le cran $-1$ n'est pas offert
> avant S6 ; à S6 le contrôle lui-même n'existe pas avant l'engagement.* **Et le coût, mesuré, est
> nul :** *le §5.2 A montre que ce cran n'avait plus aucun emploi écrit à S4 ni à S5 depuis la vague
> 1 — la cellule qui lui en attribuait un citait une `suite` supprimée.*
> **Ce que la scène continue de NE PAS donner, et qui appartient à la prose :** *l'**unicité**
> (qu'aucun $a$ hors des trois de la grille ne marche) et le **motif** $b(a+1)=0$ — trois crans
> essayés ne prouvent rien, et c'est `lesson.md:184` qui prouve.* **§13.19 change donc de réponse :
> la question « faut-il FERMER `a` à S4-S5 ? » reçoit « non — il suffit de lui retirer un CRAN », ce
> qui coûte zéro `suite` au lieu de deux.**

#### B — la fuite par les RETOURS (chaque `retour` relu contre le pari SUIVANT)

*Cinquième forme de la fuite (ADR 0036), trouvée au banc d'électrolyse : **le retour d'une
étape qui annonce la suivante**. Elle ne se voit qu'en relisant les textes les uns contre les
autres.*

| les retours de… | menacent-ils le pari suivant ? |
|---|---|
| **S1** | ⚠ **une quasi-fuite, tranchée.** Le retour de `pente-nulle` écrit « *il y aura bien une hauteur où la pente est nulle ; elle n'a rien à voir avec « résoudre », et ce n'est pas encore la question* ». Il **annonce l'existence** du palier — deux étapes en avance. **Phrase CONSERVÉE**, parce qu'elle est nécessaire pour ne pas laisser croire que $y'=0$ n'arrive jamais, **et bornée par une règle** : *aucun retour de S1 ne nomme $b$, ne chiffre une hauteur, ni n'emploie les mots « palier » ou « plat ».* Le retour de `produit` écrit « *la pente change, alors que l'équation n'a pas bougé* » — c'est la conséquence directe du pari de S1, pas l'invariance de S2 : **vérifié mot à mot, aucun retour de S1 ne contient « même hauteur », « horizontale », « parallèle » ni « abscisse »** |
| **S2** | ⚠ **une fuite trouvée et bornée.** Le retour de `coefficient-seul` écrit « *étends le champ à tout le plan et regarde : ils ne le sont pas* » — il invite à l'action que la `suite` demande, ce qui est légitime, **mais il ne doit pas dire ce qu'on y verra de plus**. **Règle : aucun retour de S2 ne nomme $b$, un palier, une hauteur plate, ni une courbe.** *Le mot « hauteur » subsiste (c'est l'objet même de S2) ; « plate » est interdit* |
| **S3** | 🔻 ⚠ **UNE FUITE TROUVÉE EN VAGUE 1bis, ET ELLE ÉTAIT DANS LA `suite`, PAS DANS LES RETOURS (B1.1).** *Cette cellule affirmait « aucun ne nomme … la coïncidence palier $=b$ » — **vrai des quatre retours, faux de la `suite`**, qui demandait « sur combien de crans la ligne plate tombe-t-elle exactement sur la valeur de $b$ ? ». **Et la `suite` est lue par `formule-graduee` comme les retours** (§11.2). **Cette cellule ne regardait pas tout ce que l'étape écrit.*** **`suite` réécrite (§7.3)** ; pour le reste : aucun retour ne trace ni ne décrit de courbe, et aucun ne dit ce qu'une solution FAIT du palier. *Vérifié mot à mot : les quatre retours ne contiennent ni « courbe », ni « atteint », ni « s'approche », ni « famille ». Le retour juste écrit « le paragraphe qui suit cette scène la démontre » — renvoi à la PROSE, autorisé et commandé (§4.1 d).* 🔻 *Et le retour de `signe` ne RACONTE plus le sens du champ sous la ligne (M-a).* **Les retours de S3 nomment le cran $b=0$ ; aucun texte de S3 ne nomme un cran de $a$ ni la coïncidence** — *relu mot à mot après la troisième réécriture* |
| **S4** | 🔻 **non, et la troisième passe a dû refermer une TROISIÈME fuite que les deux réécritures précédentes avaient laissée.** *(1)* **Vague 1 :** le retour de `vers-moins-infini` disait « *mets $P$ sous la ligne plate* » — **un geste impossible** (`point` fermé). **Réécrit pour argumenter depuis le CHAMP.** *(2)* **Vague 1 :** la `suite` qui imprimait la coïncidence $a=-1$ **est supprimée** (BLOQ-1) — c'était la fuite la plus grave du document. *(3)* 🔻 **Vague 1bis (M-a) : la réécriture de (1) racontait « les segments AU-DESSOUS de la ligne plate : ils montent » — c'est-à-dire la réfutation EN MOTS de `celle-du-bas-descend`, le distracteur de S5.** *Le même modèle (`signe-a-comportement`) est confronté à S4 et à S5 : si S4 en donne la conclusion, S5 n'a plus rien à casser.* **Troisième réécriture : DÉSIGNER la région et faire COMPARER, sans dire le sens ; et casser sur un geste ($a$ sur $+0{,}5$).** *Relu mot à mot : aucun retour et aucune `suite` de S4 ne contient « $-1$ », « palier $=b$ », « recopier », ni « au-dessous … montent ».* 🔻 **Et le cran $-1$ n'y est plus atteignable du tout** (B1) |
| **S5** | 🔻 **non pour S6, et désormais par le PRODUIT autant que par le texte.** ⚠ *Vague 1 : la moitié de `suite` qui posait $a=-1$ et annonçait « une des trois courbes devient une droite » **a été supprimée**.* 🔻 *Vague 1bis (B1.3) : « **puis $a$** » **part** de la `suite` restante, **et le cran $-1$ n'est plus offert**.* *Relu mot à mot : aucun texte de S5 ne nomme un cran de $a$.* 🔻 **Et `celle-du-bas-descend` a retrouvé sa force**, puisque S4 ne le réfute plus en mots (ligne ci-dessus) |
| **S6** | tout | — |

#### C — la fuite par le TEXTE : `formule-graduee`, ÉTAPE par ÉTAPE

*La frontière se pose **par étape**, consigne **et** retours **et** lectures. Une consigne a le
droit d'imprimer ce que son propre énoncé exige.*

🔻 ⚠ **TABLE REFAITE EN TROISIÈME PASSE, ET C'EST ICI QUE LE BLOQUANT B3 SE SOLDE. La portée de
chaque ligne est écrite noir sur blanc, parce qu'elle a été mal lue trois fois : une ligne couvre la
CONSIGNE, les RETOURS, la `suite` ET les lectures de l'étape** — *c'est ce que la porte lit
(§11.2), et **c'est la `suite` de S3 qui a échappé à deux relectures** faute que ce soit écrit ici.*

| pendant l'étape… | **autorisé** (consigne + retours + **`suite`** + lectures) | **interdit** |
|---|---|---|
| **S1** | `pente`, `coefficient`, `hauteur`, `y' = ay`, `y' = -y`, `y' + y = 0`, `point`, `segment`, `fonction`, **`solution`** *(🔻 ajoutée : le pari de S1 l'écrit)*, **`tracer`** *(🔻 ajoutée : la consigne réécrite l'écrit)*, `primitive` *(dans le seul retour de `ed-comme-primitive`, pour nommer le modèle qu'il casse)* | `b`, `+ b`, `palier`, `plat`, `horizontal`, `parallèle`, `abscisse`, **`courbe`**, `famille`, `-\dfrac{b}{a}` ; 🔻 **et, EN NOMBRES : aucun nombre hors de $\{0;2;3;5;-3;-1;-2;-5\}$** — *les cinq couples de coordonnées de `point` et les quatre pentes qu'ils produisent à $y'=-y$ ($-3$, $-5$, $+3$, $-2$), plus le coefficient $-1$ et le $+3$/$0$/$-1$ des distracteurs* |
| **S2** | + `abscisse`, `même hauteur`, `horizontale`, `parallèle`, `ne dépend que de`, `champ` | `b`, `+ b`, `palier`, `plat`, `courbe`, `famille`, `solution qui passe par`, `-\dfrac{b}{a}`, 🔻 **`s'approche`**, 🔻 **`n'arrive pas`**, 🔻 **`ralentit`** *(ajoutés : c'est la réponse et le mécanisme de S4 — B3.3)* |
| **S3** | + `b`, `terme constant`, `palier`, `plat`, `horizontal`, `solution constante`, `0 = ak+b`, `-\dfrac{b}{a}`, 🔻 **`graduation`**, 🔻 **`se déplace`** *(la `suite` réécrite les emploie)* | `courbe`, `trajectoire`, `s'approche`, `atteint`, `tend vers`, `famille`, `plusieurs solutions`, `écart au palier`, **`b(a+1)`**, **`a = -1`**, **`le palier vaut b`**, **`la ligne plate vaut b`**, 🔻 **`tombe sur la valeur de b`**, 🔻 **`à chaque cran de b`**, 🔻 **`à tous les crans de b`**, 🔻 **`pour tout b`**, 🔻 **`quel que soit b`** |
| **S4** | + `courbe`, `s'approche`, `n'atteint jamais`, `écart au palier`, `signe de a`, `fuit`, 🔻 **`compare`**, 🔻 **`inclinaison`** | `famille`, `plusieurs`, `toutes les solutions`, `se coupent`, `d'où qu'elles partent`, **`b(a+1)`**, **`a = -1`**, **`le palier vaut b`**, **`recopier`**, 🔻 **`à chaque cran de b`**, 🔻 **`à tous les crans de b`**, 🔻 **`pour tout b`**, 🔻 **`quel que soit b`**, 🔻 **`au-dessous … montent`** *(la forme que M-a a fait couper : le SENS du champ sous la ligne appartient à S5)* |
| **S5** | + `famille`, `plusieurs solutions`, `d'où qu'elles partent`, `traverse`, `se coupent` | **`b(a+1)`**, **`a = -1`**, **`le palier vaut b`**, **`recopier`**, **`unique`**, **`un seul réglage`**, 🔻 **`à chaque cran de b`**, 🔻 **`à tous les crans de b`**, 🔻 **`pour tout b`**, 🔻 **`quel que soit b`** |
| **S6** | tout | — |

⚠ **Les quatre dernières colonnes « interdit » ont été ÉLARGIES en vague 1, et c'est la
conséquence directe de BLOQ-1.** *Dès lors que « il existe un $a$ où le palier vaut $b$ »
devient **un pari** (S6), c'est une RÉPONSE, donc elle tombe sous `formule-graduee` comme
n'importe quelle autre : **aucune des cinq étapes précédentes ne peut la nommer**.* **La porte mesure
une étape à la fois** (§11.2, `formule-graduee`), **et l'essai rouge n° 23 bis porte la forme**
(écrire « $a=-1$ » dans un texte de S3, S4 ou S5 doit rougir).

> 🔻 ⚠ **ET DEUX DÉFAUTS DE CETTE TABLE ELLE-MÊME, TROUVÉS EN TROISIÈME PASSE — DONT UN QUE LA
> VAGUE 1bis A VU ET UN QUE J'AI TROUVÉ EN L'APPLIQUANT.**
> **(1) Une ligne d'interdit N'ÉTAIT PAS MESURABLE** (pédagogie 1bis, **L-e**). *S1 interdisait
> « **toute valeur de hauteur autre que celles de $P$** » — une catégorie sémantique, pas une
> forme. **Une porte ne peut pas la chercher** : soit elle ne scanne rien (MUET), soit elle
> invente une heuristique et rougit sur un texte juste. **Remplacé par une LISTE BLANCHE de
> nombres**, énumérable et donc mesurable (ADR 0036 : *on interdit des FORMES*).*
> **(2) Et le même défaut, en pire, à S3-S4-S5 : « toute phrase où « palier » et « $b$ » sont dits
> ÉGAUX » aurait fait rougir un DISTRACTEUR NÉCESSAIRE.** 🔻 *Défaut trouvé en appliquant B1, et que
> ni l'écriture ni les deux vagues n'avaient vu : **le choix `recopie-b` de S3 dit « à la hauteur
> $2$ — c'est la valeur de $b$ »**, qui est exactement « palier et $b$ dits égaux ». C'est l'ÉNONCÉ
> du distracteur le plus servi de la notion : **il doit être là.** Une porte armée sur la
> formulation générale l'aurait déclaré fuite.* **Remplacé par les FORMES qui portent vraiment la
> réponse de S6** — celles qui affirment que la coïncidence vaut **pour tout $b$** (`à chaque cran
> de b`, `à tous les crans de b`, `pour tout b`, `quel que soit b`), plus les deux littérales
> (`le palier vaut b`, `la ligne plate vaut b`) et le `a = -1`. **C'est ce qui distingue le
> DISTRACTEUR — « à cette hauteur-ci, c'est $b$ », faux et nécessaire — de la RÉPONSE DE S6 — « il
> existe un réglage où c'est $b$ à chaque cran ».** *Un interdit qui ne sait pas faire cette
> différence est le troisième cas de l'ADR 0033 : exact sur une autre question.*

**À toutes les étapes, sans exception : les chaînes du §9.** *La porte cherche ces formes-là
dans le `textContent` **rendu**, en remplaçant chaque `.katex` par son **annotation TeX** —
leçon du banc d'électrolyse — et en début de mot, en Unicode (leçon des noyaux : `\b` ignore
les accents).*

#### D — la fuite par la DONNÉE, et la fuite par la RELATION

- **Par la DONNÉE** (règle de la corde) : **une seule, et elle est déclarée.** Les cinq points
  contiennent `origine` $(0;3)$ et `decale` $(2;3)$, qui partagent une ordonnée — **c'est la
  réponse de S2, posée dans la grille de S1**. *Elle n'est pas atteignable comme un ÉTAT (à S1
  la lecture `pente` s'affiche pour un point à la fois, jamais deux), mais un élève attentif
  qui promène $P$ à S1 verra deux fois $-3$. **C'est voulu : le retour de `produit` le lui
  demande explicitement.** Ce n'est pas une fuite, c'est la rampe.*
- **Par la RELATION** (règle du banc de diffraction) : c'est la table C ci-dessus.
  $y'=ay+b$ a **cinq** facteurs de sens — la pente locale, l'invariance en $x$, le palier, le
  comportement, **et le cran dégénéré** — et **chaque étape n'écrit que ceux qu'elle a fait
  varier**.

#### E — la fuite par le STEM : le cran $a=-1$

**Le cran $a=-1$ n'est l'état POSÉ d'aucun pari** (S1 et S2 l'emploient avec $b=0$, où aucun
palier n'est en jeu ; S3, S4, S5 et **S6** sont à $a=-0{,}5$).
*Motif, et il est arithmétique (§5.3 A) : à $a=-1$, $-\dfrac{b}{a}=b$, donc le distracteur
`palier-recopie-b` atteindrait la **bonne réponse** — une **contamination de la réponse
juste**, qui est un défaut de **stem**, à corriger et non à co-étiqueter.* **La porte le
vérifie sur le descripteur : aucune étape dont un choix porte `palier-recopie-b` ne pose
`a: "-1"`** (§11.3, `stem-non-contamine`).
🔻 ⚠ **ET, DEPUIS LA TROISIÈME PASSE, IL N'EST PLUS NON PLUS UN CRAN OFFERT AVANT S6** (B1) :
*la contamination était bornée à l'état POSÉ ; elle est maintenant bornée à l'ATTEIGNABLE. **C'est
une garantie strictement plus forte, et elle est du même ordre que le garde-fou lui-même** — un
distracteur qui ne peut pas atteindre la bonne réponse, et un élève qui ne peut pas atteindre la
bonne réponse par tâtonnement.*

> ⚠ **LA RÉCONCILIATION AVEC BLOQ-1, ÉCRITE ICI PARCE QUE C'EST ICI QUE LA TENSION VIT.**
> La vague 1 demande que le cran $a=-1$ soit **parié** ; ce garde-fou interdit qu'il soit
> **posé**. *Les deux tiennent ensemble, et il n'y a qu'une forme qui le permette :*
>
> | | **S6, tel qu'écrit** | **ce que le garde-fou interdirait** |
> |---|---|---|
> | l'état posé | $a=-0{,}5$, $b=1$, palier $2$ | $a=-1$ |
> | la question | « **pour quel $a$** la ligne tombe-t-elle sur $b$ à chaque cran ? » | « à quelle **hauteur** est la ligne plate ? » |
> | ce que répond le porteur de `palier-recopie-b` | « **à tous les crans** » — **faux** ✓ | « à la hauteur $b$ » — **JUSTE**, donc contaminé ✗ |
> | ce que la porte mesure | l'état posé de S6 n'est pas $-1$ ✓ ; les quatre choix sont distincts ✓ | — |
>
> **Le distracteur du modèle le plus servi de la notion reste faux, et il l'est pour la raison
> qui compte : il généralise une coïncidence en règle.** *C'est un meilleur emploi de
> `palier-recopie-b` que celui de S3, où il donne simplement un mauvais nombre.*
>
> 🔻 ⚠ **ET LE CAS $b=0$ — LA SECONDE RACINE — A CHANGÉ DE PORTEUR EN TROISIÈME PASSE.**
> $b(a+1)=0$ a **deux** racines. *La deuxième passe la faisait trouver par **la `suite` de S3**
> (« sur combien de crans la ligne plate tombe-t-elle sur la valeur de $b$ ? » → un seul, $b=0$).
> **C'est précisément cette `suite` que le BLOQUANT B1 a fait supprimer** : elle entraînait la
> comparaison qui donne la réponse de S6.*
> **Nouveau partage, et il est meilleur :** *la racine triviale $b=0$ est établie **dans le retour
> de `b-zero-seulement` à S6** — « à $a=-0{,}5$ comme à $a=+0{,}5$, la seule coïncidence est $b=0$ …
> **c'est une racine de la question, et c'est la triviale** » — et la racine $a=-1$ par le pari
> lui-même.* **Les deux racines sont donc trouvées À S6, dans le même souffle, et c'est
> `lesson.md:184` qui prouve qu'il n'y en a pas de troisième.** *Ce qui est plus propre que le
> partage précédent : **la seconde racine n'est plus enseignée deux étapes avant la question qu'elle
> aide à résoudre.***

---

## 8. Misconceptions

> ⚠ **TOUS LES COMPTES DE CE §8 SONT REFAITS APRÈS LE PAIEMENT DE LA DETTE $\Delta=0$**
> (commit `b70f9a41`, 2026-09-25 : l'exemple travaillé de $y''+6y'+9y=0$, le modèle
> `racine-double-sans-x`, `EQDIFF-31` à `-33`, `cp-r4-racine-double`). **Relus ici un par un
> avec `Grep`/`Read`, pas hérités.**

Les **23** modèles déclarés de la notion vivent dans `items.yaml` sous le préfixe
`mc.math.maths_equations_differentielles.`. Les comptes sont **au niveau ITEM**, méthode
`coverage_summary` déclarée en fin de fichier (`items.yaml:2212-2218`) : **33 items, plancher
3, `floor_met: true`, QUATORZE modèles EXACTEMENT au plancher** (`items.yaml:2243-2259`).

| | avant la dette | **après la dette (état mesuré)** |
|---|---|---|
| modèles déclarés | 22 | **23** *(+ `racine-double-sans-x`)* |
| items | 30 | **33** *(+ `EQDIFF-31`, `-32`, `-33`)* |
| étiquettes de modèle | 74 | **81** |
| modèles à marge nulle | 15 | **14** |
| points d'arrêt | 5 | **6** *(+ `cp-r4-racine-double`)* |
| `ramp_coverage.R4` | 4 | **7** |
| `habilete` sur les items | **0** | **0** *(inchangé — le NON-VERDICT tient, §1)* |

*Trois comptes de modèles ont bougé avec les trois items neufs, et ils sont relus :
`solution-fonction-unique` $3 \to \mathbf{5}$, `signe-second-membre-second-ordre` $4 \to
\mathbf{5}$, `nombre-solutions-condition` $3 \to \mathbf{4}$.* **Deux de ces trois sont des
modèles que cette scène revendique** (§8.1), **et la marge de la notion s'est donc
ÉLARGIE, pas rétrécie.**

*`REVIEW:13-17` : les deux critiques de vague 1 avaient recompté les 22 lignes tag par tag sur
les 90 distracteurs — **elles tombaient juste**, et l'une le qualifiait du « bloc de couverture
le plus propre qu'elle ait audité ». **Cette spec ne touche toujours pas à ce fichier**, et le
§14.1 le vérifie au caractère près.*

### 8.1 Ce que la scène vise — ONZE modèles, tous DÉJÀ déclarés

| modèle existant | compte **mesuré après la dette** | où la scène le casse | **sur quelle conséquence il casse** |
|---|---|---|---|
| `ed-comme-primitive` | 3 | **S1** (`coefficient-seul`), **S2** (`coefficient-seul`) | promène $P$ : si la pente valait $a$, elle ne bougerait jamais — et le champ entier serait un seul faisceau de parallèles. **Il ne l'est pas** |
| `signe-exposant` | 3 | **S1**, choix `signe-recopie` | le segment **descend** : $y'+y=0$ est la même équation, mais le coefficient ne se lit qu'après l'avoir écrite $y'=-y$ |
| `ed-inconnue-nombre` | 3 | **S1**, choix `pente-nulle` | le segment n'est pas plat ; l'équation parle en **chaque** point, pas seulement là où quelque chose s'annule |
| `modele-sans-ecart` | 3 | **S2**, choix `amortie` ($-1{,}5$) | la hauteur n'a pas bougé, donc la pente non plus — c'est la **hauteur**, jamais le chemin parcouru, qui pilote. ⚠ **Et la MOITIÉ de ce modèle est affichée comme VRAIE à S1 et S2 : voir l'encadré ci-dessous (fidélité I4)** |
| `modele-taux-constant` | 3 | **S2** (`arretee`), **S4** (`droite-puis-stop`) | le champ **change d'inclinaison à chaque hauteur** : une courbe qui le suit ne peut pas être une droite, et rien ne lui dit de s'arrêter |
| `palier-recopie-b` | **5** | **S3** (`recopie-b`), **S6** (`tous`) | à S3 : la ligne plate est à $4$, pas à $2$ — pose $P$ sur $(0;2)$, la lecture affiche $+1$, le champ y **monte**. **À S6 : la règle n'est pas « presque toujours vraie », elle est fausse partout sauf à UN cran** — et le trouver, c'est cesser de la croire |
| `palier-signe` | 4 | **S3** (`signe`), **S6** (`a-plus-un`) | à S3 : à $y=-4$ la pente vaut $+4$, la ligne monte à pic. **À S6 : le même signe perdu, un étage plus haut** — $-\dfrac{b}{a}=b$ donne $a=-1$, pas $+1$ |
| `palier-oubli` | 4 | **S3** (`zero`), **S4** (`vers-zero`) — 🔻 **et PLUS S6** | à $y=0$, le champ **monte** (pente $+2$) : une courbe qui y arriverait serait repoussée. 🔻 ⚠ **L'attache à S6 (`b-zero-seulement`) est RETIRÉE en troisième passe** — *§13.20 tranchée : « ça ne tombe juste qu'à $b=0$ » est une **recherche incomplète**, pas ce modèle-ci, dont la `description` (`items.yaml:68-72`) parle d'une **forme écrite de solution** que la scène n'écrit jamais. **Le choix reste, sans étiquette** (§7.6). **Le modèle reste servi deux fois par la scène**, donc il reste dans les onze* |
| `signe-a-comportement` | 3 | **S4** (`vers-moins-infini`), **S5** (`celle-du-bas-descend`) | sous la ligne plate, avec le même $a<0$, le champ **monte**. $a<0$ ne dit pas « décroît », il dit « revient vers la ligne » |
| `nombre-solutions-condition` | **4** *(était 3 ; `EQDIFF-33` l'a rejoint avec la dette)* | **S5**, choix `se-coupent` | au point d'intersection supposé, le champ ne donne **qu'une** direction — deux courbes n'y tiennent pas |
| `solution-fonction-unique` | **5** *(était 3 ; `EQDIFF-31` et `-33` l'ont rejoint avec la dette)* | **S5**, choix `une-seule-vraie` | les trois suivent le champ partout : les trois sont des solutions |

> ⚠ **DÉCLARATION EXIGÉE PAR LA VAGUE 1 (fidélité I4) : `modele-sans-ecart` est affiché À MOITIÉ
> VRAI pendant DEUX étapes, et ce document ne le disait pas.**
> *Sa `description` (**`items.yaml:199-201`**, relue verbatim à la révision **et à la troisième
> passe — le texte court jusqu'à `:201`, la révision s'arrêtait à `:200`**) a **deux** moitiés :
> « *L'élève fait dépendre la vitesse de refroidissement de $T$ **seule (palier $0$)** ou **du
> temps $t$*** ». **S1 et S2 tournent à $b=0$** — donc la pente y dépend de la hauteur seule et
> **le palier EST l'axe** : **la première moitié du modèle faux y est exactement CORRECTE, et la
> scène l'affiche comme telle, deux étapes de suite.** La scène ne casse que la seconde moitié
> (`amortie`, « ça dépend du chemin parcouru »).*
> **Ce n'est pas un défaut à réparer, c'est une rampe à déclarer** — et la réparation existe déjà
> dans la scène : **le retour de `zero` à S3 est le point de rupture désigné**, et il est écrit
> pour ça : « *C'était vrai **tant que $b$ valait $0$** — et c'est exactement ce qui vient de
> changer.* » **Aucun changement d'état n'est nécessaire : l'échelle $b=0 \to b\neq0$ est ce qui
> fait fonctionner S3.** *Ce qui change ici est le registre : la ligne du §8.1 le dit, et
> content-author doit garder cette phrase du retour de `zero` **intacte** — c'est elle qui solde
> les deux étapes précédentes.*

**Onze modèles servis, ZÉRO neuf** *(et S6 n'en ajoute aucun : il **réemploie** les trois du
palier, ce qui est le meilleur argument pour son existence).* *Les DOUZE autres de l'inventaire
ne sont **pas** visés, et c'est déclaré : `coefficient-a-mal-identifie` porte sur la **forme
écrite** de la solution, que la scène n'écrit jamais (§9.1) ; **`racine-double-sans-x` est le
modèle neuf de la dette $\Delta=0$, et il est du second ordre — hors scène (§9.2)** ;
`condition-initiale-sans-decalage`,
`condition-initiale-exposant-sans-a` et `resolution-exponentielle-lineaire` sont R3 ;
`omega-vs-omega2`, `signe-second-membre-second-ordre`, `oscillateur-B-sans-omega`,
`oscillateur-A-B-roles` et `periode-omega` sont R4 ; `charge-decharge-confondues` et
`tau-inverse` sont R5. **La scène ne les touche pas.***

### 8.2 Pourquoi AUCUN modèle neuf — le refus, et ce qui le fonde

*La spec sœur en a déclaré deux. **Celle-ci n'en déclare aucun, et c'est un résultat, pas une
paresse.***

**Trois mesures, dans cet ordre.**

1. **L'inventaire de cette notion est déjà, et de loin, le plus complet du corpus maths que
   j'aie lu : 23 modèles pour 7 rungs, tous au-dessus du plancher** (`REVIEW:13-17` pour les 22
   premiers, **recomptés à la révision pour le 23ᵉ**). *Comparaison : `nombres-complexes-2`
   déclare 23 modèles pour un corpus deux fois plus gros, et sa spec de scène a dû en ajouter
   deux.*
2. **Les vingt-quatre choix des six étapes ont été construits d'abord, puis confrontés un par un
   à l'inventaire** — pas l'inverse. 🔻 ⚠ **COMPTE CORRIGÉ EN TROISIÈME PASSE, et il était faux
   d'une unité de trop et d'une classe de trop** : *les vingt-quatre choix se répartissent en
   **six bonnes réponses** (qui ne portent aucun modèle, par construction) et **dix-huit
   distracteurs**. **Dix-sept des dix-huit** trouvent un modèle déclaré dont la `description`
   couvre le distracteur ET dont la valeur se recalcule (§8.1) ; **le dix-huitième —
   `b-zero-seulement` à S6 — reste DÉLIBÉRÉMENT SANS ÉTIQUETTE** (§13.20 tranchée, §7.6).* **La
   deuxième passe écrivait « les vingt-quatre trouvent un modèle déclaré », ce qui attribuait un
   modèle aux six bonnes réponses.** *Deux cas où la couverture était douteuse et a été retenue
   APRÈS lecture de la `description`, chacun avec sa réserve — **le troisième a été refusé par les
   deux critiques de vague 1bis et il est ci-dessous, barré** :*
   - `signe-exposant` (S1) : sa description écrit « *ou **recopie $y'+ay=0$ tel quel sans
     l'écrire $y'=-ay$ avant de lire $a$*** » (`items.yaml:25-26`, **relu verbatim à la
     révision**) — le distracteur `signe-recopie` **couvre ce GESTE**.
     ⚠ **Réserve corrigée en vague 1 (pédagogie M6, fidélité M8).** *La première rédaction
     écrivait « **le distracteur `signe-recopie` est littéralement ce texte** » : c'est
     **surinterprété**. La `description` couvre le cas où l'équation est **PRÉSENTÉE** sous la
     forme $y'+ay=0$ ; à S1 elle est présentée $y'=-y$, et le distracteur demande à l'élève de
     la **réécrire lui-même** en $y'+y=0$ avant de mal lire le coefficient — **une étape de plus,
     que peu d'élèves franchissent spontanément.** Et la fidélité ajoute que le `label` du modèle
     parle de **l'exposant d'une formule de solution que la scène est interdite d'écrire**
     (§9.1) : **le rattachement ne tient que par la seconde clause de la `description`**, qui est
     bien, elle, sans représentation. **Rattachement CONSERVÉ, et sa minceur est écrite ici.***
   - `modele-sans-ecart` (S2) : sa description écrit « *fait dépendre la vitesse […] de $T$
     seule (palier $0$) **ou du temps $t$*** » (**`items.yaml:199-201`**) — **le distracteur
     `amortie` est « la pente dépend du chemin parcouru ».** *Réserve déclarée : la
     `description` est rédigée dans les variables de la tasse ($T$, $t$, $20$), et la scène est
     abstraite ($x$, $y$). **Je juge que le mécanisme est le même et que l'habillage est un
     habillage.*** ⚠ **La vague 1 ne l'a PAS contredit** *(la pédagogie le classe « jugement, pas
     mesure », M5, et la fidélité l'accepte)* **— donc aucun modèle neuf, et §13.12 garde sa
     déclaration de repli prête.** *Et §8.1 porte désormais la moitié du modèle que la scène
     affiche comme VRAIE (fidélité I4), qui est la vraie faiblesse de ce rattachement.*
   - 🔻 ~~`palier-oubli` (S6, `b-zero-seulement`)~~ : **RATTACHEMENT RETIRÉ EN TROISIÈME PASSE, ET
     C'EST LE SEUL ENDROIT OÙ LES DEUX CRITIQUES DE VAGUE 1bis DEMANDENT LA MÊME CHOSE**
     (pédagogie M-f, fidélité MINOR-6). *La deuxième passe l'annonçait comme « le rattachement le
     plus mince » et écrivait déjà la clause de repli : « **si la vague 1bis le refuse, le choix
     reste et perd son étiquette** ». **La vague 1bis le refuse. La clause est exécutée.***
     **Le motif des deux critiques, et il est le bon :** *« ça ne tombe juste qu'à $b=0$ » est ce
     que conclut un élève **qui cherche bien et s'arrête tôt** — une **recherche incomplète**. Et la
     `description` de `palier-oubli` (`items.yaml:68-72`, relue : « *ne garde que la partie homogène
     $Ce^{ax}$ et oublie d'ajouter le palier, comme si le terme constant $b$ était nul* ») décrit un
     défaut de **forme écrite de solution**, que la scène n'écrit jamais (§9.1).* ⚠ *La fidélité
     ajoute une précision juste : le voisin le plus proche dans le registre serait la **première
     clause de `modele-sans-ecart`** (`items.yaml:200` : « *de $T$ seule (**palier $0$**)* »), qui
     dit littéralement « le palier est l'axe ». **Mais elle non plus ne décrit pas une recherche
     interrompue**, et une étiquette approchante n'est pas une étiquette.*
     **Décision : le choix reste (il est pédagogiquement juste — c'est la réponse la plus fréquente
     d'un élève qui cherche), l'étiquette tombe, et `pedagogy_wiring` le déclare.** *§13.20 porte le
     raisonnement complet et la décision.*
3. **Un modèle neuf coûte trois items, et cette notion vient d'en absorber trois.**
   Quatorze modèles y siègent à marge nulle (`items.yaml:2243-2259`) et deux items sont déjà
   quasi jumeaux (`REVIEW:124-126`). **La dette $\Delta=0$ a consommé le budget d'ajout
   disponible** (`EQDIFF-31` à `-33` pour `racine-double-sans-x`) : **ajouter du volume QCM ici,
   c'est ajouter du bruit à un banc qui vient d'être étendu là où l'examen le demandait.**

### 8.3 Les DEUX modèles CANDIDATS — consignés, pas déclarés

*Refuser de déclarer un modèle faute de mesure est le seul geste honnête disponible, et il
s'écrit à côté de ce qu'on arme (ADR 0035). Précédent : `centre-lu-sur-b` dans la spec sœur.*

**Candidat A — « le palier cru fixé par le point de départ ».** Un élève qui croit qu'une
solution partie plus haut tend vers un palier plus haut, ou qu'une solution partie SOUS le
palier ne peut pas y monter. *Ce qui le rend plausible :* `famille-solutions.svg` existe
**uniquement** pour montrer que quatre $T_0$ différents visent un seul palier — l'auteur de la
figure a donc jugé la confusion réelle. *Ce qui manque pour le déclarer :* **aucune donnée de
fréquence**. Aucun des **33** items ne l'attrape, aucune annale ne l'éclaire (il n'y en a
qu'une, et elle est du second ordre), et je n'ai pas l'expérience d'enseignement qui
trancherait. **La scène le confronte quand même, par le fait** (S5, choix `meme-ligne` et sa
`suite`) — **sans distracteur étiqueté**, ce qui est précisément la limite de ce refus. *§13.12
donne au propriétaire la déclaration YAML prête et ses trois items ; par défaut, elle n'est pas
écrite.*

**Candidat B — « la pente lue comme l'ordonnée seule » ($a$ oublié).** Répondre $3$ à S1 au
lieu de $-3$. *Ce qui manque :* aucune donnée, et le modèle est peut-être un simple lapsus
plutôt qu'un modèle. **Écarté des choix de S1 pour cette raison** — c'est ce qui a mené à la
table finale du §7.1, où les quatre choix sont tous couverts. *Consigné pour mémoire.*

### 8.4 Le solde de couverture, honnête

| | **état mesuré avant cette livraison** *(après la dette $\Delta=0$)* | après cette livraison |
|---|---|---|
| modèles déclarés | **23** | **23** *(inchangé)* |
| items | **33** | **33** *(inchangé — ou **33** avec **un stem varié**, §4.6)* |
| modèles à marge nulle | **14** | **14** *(inchangé)* |
| points d'arrêt | **6** | **6** *(inchangé)* |
| modèles **revendiqués par une spec, rung par rung** | 0 *(la notion n'a pas de `spec.md` — `REVIEW:105-109`)* | **11**, pour le seul R2 |
| 🔻 **distracteurs de la scène portant une étiquette** | — | **17 sur 18** *(troisième passe : `b-zero-seulement` à S6 reste **sans étiquette**, §13.20 — et **aucune ligne de ce tableau ne bouge pour autant**, la scène ne touchant pas `items.yaml`)* |

**Ce que ce paquet NE referme pas :**
- **Le banc de fin ne verra presque aucune différence.** Onze modèles sont confrontés par la
  scène et mesurés, comme avant, par des QCM d'écriture (§4.6). ⚠ **Nuance de vague 1
  (pédagogie I6) : la variation de stem couplée (§4.6) est ce qui empêche ce « presque » de
  devenir « aucune ».** **Déclaré.**
- **DOUZE modèles restent non revendiqués** (`coefficient-a-mal-identifie`, **`racine-double-sans-x`**
  et les dix de R3, R4, R5). **Cette spec n'est pas le `spec.md` de la notion.** §13.4.
- ⚠ **`REVIEW:110-114` (F-6) signale que plusieurs distracteurs n'ENCODENT pas le modèle dont
  ils portent l'étiquette, et qu'« *au recompte honnête une famille tomberait sous le
  plancher* ».** **Cette spec n'a pas re-audité les distracteurs existants** ; elle s'appuie
  sur les `description` telles qu'écrites. *Si ce recompte a lieu un jour et déplace une
  famille, les rattachements du §8.1 sont à relire.* **Déclaré, §15.5.**
- **Zéro item de niveau 3 ajouté, contre une cible de 15 % (SExp) ou 20 % (SM).** *Et le rapport
  reste **incalculable**, `habilete` n'existant sur aucun des 33 items — **revérifié à la
  révision : `Grep -c habilete` rend 6 occurrences, toutes dans `checkpoints.yaml`, zéro dans
  `items.yaml`.*** **NON-VERDICT**, pas un vert. *La dette $\Delta=0$ n'a pas déplacé ce
  compte-là non plus.*

---

## 9. La frontière — ce que la scène n'affiche jamais

Chaînes **interdites dans le panneau ouvert**, mesurées par la porte (§11.3, `frontiere`),
**et chacune avec son essai rouge** (§11.4).

> **On interdit des FORMES, pas des noms** (ADR 0036 : *une chose n'est prouvée absente que si
> l'on a énuméré ses FORMES*). La porte les cherche dans le texte **RENDU** — en remplaçant
> chaque `.katex` par son **annotation TeX** — **en début de mot et en Unicode**.
>
> **Et la frontière s'applique AUX TEXTES DE CETTE SPEC**, qui ne sont qu'une proposition de
> plus (leçon du banc de modulation, point 4). *Les §0, §1, §2 et §13 en écrivent plusieurs — ils
> parlent du cadre, pas à l'élève, et la porte ne lit que le PANNEAU.*
>
> ⚠ **CORRECTION DE LA RÉVISION, ET C'EST LA PLUS GÊNANTE DU DOCUMENT.** *La première rédaction
> écrivait ici, en toutes lettres : « **Relu : le §7 n'écrit aucune forme interdite.** »*
> **C'ÉTAIT FAUX.** Trois retours du §7 destinés au PANNEAU contenaient des chaînes interdites
> par le point 3 ci-dessous : `celle-du-bas-descend` à S5 (« *un objet à $0\ °$C posé dans une
> pièce à $20\ °$C se réchauffe* » — `°C`, `°`, et le registre thermique), `approche` à S4 (« *la
> tasse… le café… la température de la pièce* ») et `amortie` à S2 (« *la température se rapproche
> de celle de la pièce* »). **Les trois sont supprimés ou réécrits** (§7.2, §7.4, §7.5).
> **Ni l'écriture ni les DEUX critiques de vague 1 ne l'ont vu** — la porte `frontiere`, elle,
> aurait fait rougir la scène au premier lancement.
> **La leçon, et elle est de l'ADR 0036 : une porte qui se cite elle-même se disculpe.** *Une
> phrase « relu, rien à signaler » écrite par l'auteur de ce qu'il relit n'est pas une mesure,
> c'est une intention. **Cette section n'affirme donc plus que le §7 est propre : elle dit que
> c'est à la porte de le dire**, et l'essai rouge n° 23 ter remet les trois phrases pour vérifier
> qu'elle le dit.*

1. **FRONTIÈRE DE RANG — aucune formule de solution, aucune constante.** *Ne vient d'aucune
   `limite` du cadre : vient de ce que la scène précède l'Étape 2 de R2 (§0.2).*
   Interdits : `Ce^{ax}`, `Ce^{`, `C e^{`, `\exp`, `e^{ax}`, `e^{-ax}`, `exponentielle`,
   `solution générale`, `ensemble des solutions`, `C \in \mathbb{R}`, `constante
   d'intégration`, `y(x) =`, `y = C`, `-\dfrac{b}{a}` **en position de formule affichée par une
   LECTURE** *(la lecture `palier` affiche un NOMBRE ; le retour de S3 a le droit d'écrire la
   route une fois — §5.4 point 2)*.
   *Le symbole `e` seul n'est pas cherché : il est dans « pente », « écart », partout. **La
   porte cherche `e^` et `\exp`, jamais `e`.** Leçon des noyaux, transposée.*
2. **FRONTIÈRE DE RANG — rien de R3.** Interdits : `condition initiale`, `y(x_0)`, `y_0 =`,
   `x_0`, `déterminer C`, `fixer la constante`, `épingler`, `passe par le point` *(en position
   de méthode ; « une solution passe par $P$ » reste autorisé, c'est l'énoncé de S1 —
   **la porte cherche le syntagme `pour que la courbe passe par`, pas le verbe seul**)*.
3. **FRONTIÈRE DE RANG — rien de R4, rien de R5, et AUCUNE unité physique.**
   Interdits R4 : `y''`, `y^{\prime\prime}`, `second ordre`, `équation caractéristique`,
   `discriminant`, `\Delta =`, `racine double`, `\omega`, `pulsation`, `\cos`, `\sin`,
   `période`, `oscill`.
   Interdits R5 et physique : `RC`, `RL`, `u_C`, `i(t)`, `\tau`, `constante de temps`,
   `condensateur`, `bobine`, `résistance`, `charge`, `décharge`, `circuit`, `intensité`,
   `tension`, `volt`, `ampère`, `ohm`, `farad`, `henry`, `seconde`, `minute`, `°C`, `degré`,
   `°`, `température`, `café`, `tasse`, `refroidi`, `radioactiv`, `\lambda`, `N_0`, `N(t)`.
   *La scène est sans unité et sans histoire : ses axes sont $x$ et $y$ (§5.4 point 1). **C'est
   la frontière la plus large de ce document, et le §9.3 dit pourquoi elle est si large.***
4. **Aucun second membre non constant.** **`limite` des DEUX cadres** (`maths-sm.yaml:159`,
   `maths-sexp.yaml:158`) : « *PAS de second membre non constant, pas de variation de la
   constante.* » Interdits : `y' = ay + f(x)`, `f(x)`, `g(x)`, `second membre`, `+ x`,
   `+ \cos`, `+ e^{`, `variation de la constante`, `solution particulière` *(le mot est de la
   leçon, `lesson.md:142`, mais il appartient à la PROSE de R2 qui suit ; la scène dit « ligne
   plate » et « palier »)*.
   ⚠ **C'est la `limite` qui mord le plus fort ici, et pour une raison propre au champ de
   pentes : un champ rend un second membre variable trivialement dessinable, donc tentant.**
   *Un $b$ qui dépendrait de $x$ inclinerait le champ le long des horizontales — un joli
   dessin, hors cadre.*
5. **Aucune méthode de résolution.** Interdits : `séparation des variables`, `séparer les
   variables`, `\dfrac{dy}{y}`, `\int`, `intégrer`, `primitive` *(sauf dans le seul retour de
   `ed-comme-primitive` à S1 — **exception déclarée, une occurrence, une étape**, §7.6 C)*,
   `logarithme`, `\ln`, `fonction auxiliaire`, `z = y e^{`.
6. **Aucune approximation, aucune construction pas à pas.** **`exclusions_transversales`**,
   `maths-sm.yaml:341` (« *Développements limités / formule de Taylor : hors 2e Bac* ») et
   `:342` (« *Intégrales impropres* ») ; **et la frontière de matière du §9.3.**
   Interdits : `Euler`, `méthode d'Euler`, `pas à pas`, `pas de discrétisation`, `\Delta x`,
   `\Delta t`, `approximation`, `approché`, `tangente successive`, `Taylor`,
   `développement limité`.
   ⚠ **C'est l'interdit le plus important de ce §9, et il n'est pas théorique.** La méthode
   d'Euler est **au cadre PC** (`pc-physique-chimie.yaml:284`), elle a **déjà un manipulable
   livré** (`content/pc/chute-mouvements-plans/media/euler-taille-de-pas.interactive.json`,
   un curseur sur $\Delta t \in [0{,}01 ; 0{,}05]$), et **elle n'est au cadre maths d'aucune
   des deux filières**. Une scène de champ de pentes est à un geste d'elle. *§2.6 l'a écartée ;
   ici elle est gardée.*
7. **Aucun vocabulaire de systèmes dynamiques.** *Ne vient d'aucune `limite` : vient de ce
   qu'aucun des deux cadres ne nomme ces objets (§0.3), et qu'un mot qu'un élève ne reverra
   jamais est un mot qui coûte sans rendre.* Interdits : `champ de vecteurs`, `champ de
   directions`, `courbe intégrale`, `isocline`, `portrait de phase`, `plan de phase`,
   `point d'équilibre`, `équilibre stable`, `stabilité`, `attracteur`, `autonome`,
   `flot`, `Cauchy-Lipschitz`, `théorème de Cauchy`, `unicité` *(le FAIT est l'objet de S5 ; le
   MOT est hors cadre — la scène dit « une seule »)*.
   ⚠ **RÈGLE DURCIE EN VAGUE 1 (fidélité I2), et c'était le dernier mot hors cadre à l'écran.**
   *La première rédaction écrivait : « le nom « champ des pentes » n'est employé QUE dans le
   titre et la légende de la carte ». **Le titre d'une carte est la ligne la plus lue de la
   carte** — c'était donc le seul endroit où un terme que **ni** `maths-sm.yaml` **ni**
   `maths-sexp.yaml` ne nomment était affiché **comme un nom**. (Le critique a regrepé les deux
   fichiers : `champ`, `isocline`, `direction` — aucune occurrence pertinente.)*
   **Nouvelle règle, à coût nul :**
   - **`champ-des-pentes` ne survit que comme SLUG, clé de registre et sélecteur de porte**
     (`[data-scene="champ-des-pentes"]`) — **jamais dans un texte rendu.**
   - **Le `title_fr` porte la QUESTION, pas l'objet : « Ce que l'équation dit en chaque
     point »** (§12). *La légende suit la même règle.*
   - **Interdits ajoutés aux formes cherchées par la porte** : `champ des pentes`,
     `champ de pentes`, `champ de directions` *(ce dernier l'était déjà)*.
   - *Le mot **« champ »** seul reste autorisé comme **nom commun descriptif** (« ouvre le champ
     sur tout le plan », « le champ monte ici ») — il est indispensable et il n'est présenté
     nulle part comme un terme à retenir. **C'est une frontière de SYNTAGME, pas de mot**, et
     c'est ainsi que la porte la cherche.*
   **Et aucune consigne ne demande de « lire un champ de pentes ». §13.2.**
8. **Aucune algèbre linéaire, aucun système.** Interdits : `matrice`, `\begin{pmatrix}`,
   `système différentiel`, `dérivée partielle`, `\partial`, `vecteur propre`.
9. **Aucun cas $a=0$.** `lesson.md:142` l'écarte (« *hors du cadre de ce chapitre* ») et
   $-\dfrac{b}{a}$ n'y a pas de sens. Interdits : `a = 0`, `a=0`, `y' = b`, `y'=b`.
   *Sans objet sur la grille (aucun cran), et interdit quand même.*
10. 🔻 **Aucun nombre hors des trois grilles — DANS LES LECTURES ET SUR LE BADGE, et nulle part
    ailleurs.** **⚠ RÈGLE BORNÉE EN TROISIÈME PASSE (fidélité 1bis, IMPORTANT-5) : la portée est
    désormais dans le titre de la règle, et pas seulement sous-entendue par sa deuxième phrase.**
    Les seuls $a$ **affichés par une lecture ou par le badge** sont les trois du §5.2 A ;
    les seuls $b$, les quatre du §5.2 B ; les seuls points, les cinq du §5.2 C ; les seuls
    paliers, les six valeurs de la table A ; les seules pentes, celles de $\tfrac12\mathbb{Z}$
    calculées à la table B. *La porte relève l'ensemble exact des nombres affichés **dans les
    lectures et sur le badge** et le compare. Un nombre qui n'y est pas est soit un bug, soit une
    frontière franchie.*
    > 🔻 **POURQUOI LA BORNE, ET POURQUOI C'ÉTAIT UNE PORTE QUI NE POUVAIT PAS PASSER AU VERT.**
    > *La règle disait « **Aucun nombre hors des trois grilles** », sans restriction, **et
    > l'essai rouge n° 28 armait « un nombre hors des grilles du §9.10 » comme forme cherchée dans
    > le PANNEAU.* **Or deux textes de choix — rendus dans le panneau, et pédagogiquement
    > nécessaires — affichent un $a$ hors grille : `a-plus-un` à S6 (« pour $a = +1$ ») et
    > `signe-recopie` à S1 (« le coefficient est $1$ »).** *Ce sont **les deux distracteurs de perte
    > de signe** : leur nombre EST le modèle faux. Les retirer, c'est retirer `palier-signe` de S6 et
    > `signe-exposant` de S1.* **Donc, tel qu'écrit, le §9.10 faisait rougir la porte sur un produit
    > juste — ou bien il voulait dire quelque chose de plus étroit que son en-tête, ce qui est le
    > troisième cas de l'ADR 0033.** *La deuxième phrase de la règle (« la porte relève les nombres
    > affichés **dans les lectures** ») l'impliquait déjà ; **une porte ne se lit pas par
    > implication.***
    > **Un distracteur a le DROIT d'afficher un nombre faux : c'est sa fonction.** *Ce qui n'a pas le
    > droit d'être faux, c'est ce que la scène affirme — les LECTURES et le BADGE.*
11. **Aucune 3D.** Canvas 2D, aucune caméra, aucune vue. **`window.__THREE__` doit rester
    indéfini même panneau OUVERT** — famille de porte à part entière (§11.2, `pas-de-3d`).
12. 🔻 **AUCUNE AFFIRMATION SUR L'EXAMEN — FRONTIÈRE NEUVE, AJOUTÉE EN TROISIÈME PASSE
    (fidélité 1bis, BLOCKING-2).** *Ne vient d'aucune `limite` du cadre : vient de ce que **la
    notion ne porte qu'UNE annale vérifiée, qui ne pose pas $y'=ay+b$** (§0.3), et de ce que
    `REVIEW-2026-09-12.md:23-29` a mesuré **zéro** affirmation de fréquence dans la notion et conclut
    « **Ne pas en ajouter.** »*
    Interdits : `examen`, `l'examen`, `au bac`, `le bac`, `les sujets`, `un sujet`, `annale`,
    `chaque année`, `presque toujours`, `le plus courant`, `souvent`, `revient`, `classique`,
    `piège classique`, `piège d'examen`, `piège du bac`, `tombe souvent`, `on te le demandera`.
    *Le mot **`piège`** seul reste **autorisé** — la consigne réécrite de S6 l'emploie (« le piège le
    plus coûteux de **ce chapitre** ») et c'est une affirmation sur la LEÇON, pas sur l'examen.
    **C'est une frontière de SYNTAGME, pas de mot**, comme celle de « champ » au point 7.*
    ⚠ **Et voici pourquoi cette frontière doit exister au lieu d'être une consigne de relecture :**
    *la phrase fautive — « **un piège que l'examen connaît** » — **a traversé une écriture, une
    révision et DEUX critiques de vague 1**, et le grep que les relecteurs de `REVIEW` avaient
    employé (`chaque année|presque toujours|le plus courant|souvent|revient`) **ne l'aurait pas
    attrapée**. **Une chose n'est prouvée absente que si l'on a énuméré ses FORMES** (ADR 0036) —
    et c'est la troisième fois dans ce document qu'une forme non énumérée est passée.

### 9.3 La frontière avec la PHYSIQUE — la question posée, et la réponse

**La même équation vit dans trois notions PC**, et ⚠ **CITATION CORRIGÉE EN VAGUE 1 (fidélité
M4) : ce n'est PAS « la leçon de maths qui le dit elle-même » — 🔻 et les NUMÉROS sont refaits en
troisième passe, pour la troisième fois** (fidélité 1bis, IMPORTANT-3). *Le passage est à
**`lesson.md:583-591`**, **à l'intérieur du commentaire HTML `<!-- NOTE DE VALIDATION` ouvert à
`:562` et fermé à `:596`** — donc dans une **note d'auteur invisible à l'élève**. **Relu ligne à
ligne contre le fichier tel qu'il est.** Historique : mes `:526-528` de la première rédaction
étaient justes **contre le fichier d'avant la dette** ($586-60=526$) ; les `:523`/`:502` du critique
aussi ; et les `:559-564`/`:538`/`:572` de la deuxième passe **n'étaient justes contre aucun des deux
états**. **La réfutation M4 est retirée** (§« Ce que la vague 1 a changé », §16).
**Attribué correctement : c'est la note de validation de `lesson.md` qui le dit, et
c'est une note de relecture humaine, pas la leçon.*** Verbatim : « *R5 (applications
RC/RL/oscillateur) suppose que les équations différentielles physiques (RC u_C'+u_C=E,
L i'+Ri=E, L q''+q/C=0) sont déjà établies côté physique […] cette leçon ne les re-dérive pas
depuis la loi des mailles, elle les RECONNAÎT.* »
*Précédent de la notion pour ce genre d'erreur : `REVIEW` F1 relève déjà un renvoi vers un texte
qu'aucun élève ne peut voir. **La conclusion ne change pas — la frontière est la même — mais une
spec ne doit pas faire dire à une leçon ce qui est écrit dans sa marge.***

**Mesuré, côté PC :**

| notion | ce qu'elle a déjà | mesure |
|---|---|---|
| `pc/rc-charge` | **un manipulable**, `rc-sandbox` — un **embed PhET** (`"tool": "phet"`, CCK:AC), marqueur `[[embed:rc-sandbox]]` à `lesson.md:323`. **Et il se déclare POC** : « *la cible long terme reste un interactif RC **propriétaire**, pour la maîtrise du design et l'autonomie de l'hébergement* » | `media/rc-sandbox.json:3`, `:25` (`poc_status`) |
| `pc/chute-mouvements-plans` | **deux manipulables SVG+curseur** : `sandbox-chute-frottement` (curseur sur $m$, qui redessine $v(t)$, **son asymptote $v_{lim}$ et son $\tau$**) et `euler-taille-de-pas` (curseur sur $\Delta t$) | `media/sandbox-chute-frottement.interactive.json`, `media/euler-taille-de-pas.interactive.json` |
| `pc/dipole-rl` | **AUCUN manipulable** : 5 SVG, 4 `.stages.json`, rien d'autre | `ls content/pc/dipole-rl/media/` |

**La réponse, en trois points.**

1. **La SCÈNE n'est pas partagée. Le MOTEUR peut l'être.** `champ-pentes-modele.ts` calcule une
   pente $ay+b$, un palier $-b/a$ et une courbe par un point : **rien là-dedans n'est
   mathématique plutôt que physique**. Une future scène PC (`rc-charge`, en remplacement du POC
   PhET) pourrait l'importer et n'ajouter qu'une couche d'unités et d'habillage. *Mais un
   moteur partagé n'est pas une scène partagée, et les deux ne se décident pas ensemble.*
2. **La frontière côté maths est NETTE : aucune unité physique, jamais** (§9.3 des interdits
   ci-dessus, point 3). *Trois motifs.* **(a)** Habiller la scène en volts et en millisecondes
   ferait entrer le palier ($E$) et l'échelle de temps ($\tau$), c'est-à-dire **R5** — trois
   rungs plus bas. **(b)** Le cadre PC n'attend pas d'un élève qu'il explore un champ de
   pentes : il attend « *Établir l'équation différentielle et vérifier sa solution* »
   (`pc-physique-chimie.yaml:173` pour RC, `:192` pour RL) — **établir et vérifier, pas
   explorer**. **(c)** `rc-sandbox` porte déjà des `boundary_guard_details` qui interdisent la
   bobine, l'alternatif et l'impédance dans son montage : une scène partagée devrait porter
   **les deux frontières à la fois**, celle du cadre maths et celle du cadre PC, sur un même
   panneau servi à quatre filières. *C'est la manière la plus sûre de se tromper deux fois.*
3. **Le PONT existe déjà, et il est en PROSE, à sa place.** R5 (**`lesson.md:472-538`** — *plage
   refaite en troisième passe : l'en-tête de R5 est à `:472`, la dernière ligne de sa prose à
   `:538`, R6 ouvre à `:542` ; la spec citait `:412-478`, d'avant la dette*) fait
   exactement le travail : il RECONNAÎT $y'=ay+b$ dans $RC_0u_C'+u_C=E$ et dans $Li'+Ri=E$, et
   il calcule les paliers $E$ et $E/R$ **avec la formule $-b/a$ du chapitre 3**. **Le pont est
   donc déjà bâti, il est textuel, et il est du bon côté.** *La scène n'a rien à y ajouter, et
   §4 ne commande aucune prose à R5.*

**Ce qui reste dû, et qui n'est pas de cette spec :** `pc/dipole-rl` n'a aucun manipulable ;
`pc/rc-charge` en a un qui se déclare POC et qui dépend d'un hébergeur tiers.
**Ces deux faits appartiennent à la matière PC**, et une proposition de scène PC les traiterait
avec le cadre PC sous les yeux. **Routé, pas absorbé.** *§13.6.*

---

## 10. Ce que cette scène peut honnêtement prétendre (`fit_caveat`)

Un plan calculé est plus crédible qu'une figure dessinée, donc plus dangereux. Et celui-ci
affiche des **valeurs exactes** — l'affichage qui ressemble le plus à une preuve.

1. **La scène ne démontre rien : elle exhibe.** Elle montre la règle sur **60 états**
   ($3\ a \times 4\ b \times 5$ points) — c'est un échantillon, pas une preuve. **La
   démonstration est la prose de R2, qui vient juste après** (`lesson.md:132-164`).
   *C'est structurel en mathématiques : en physique, une scène qui vérifie une loi sur dix
   réglages est convaincante ; ici, soixante cas ne prouvent rien, et un élève de 2ᵉ Bac le
   sait.* ⚠ **Cette clause ne vit PAS seulement ici : elle est REMONTÉE dans le paragraphe
   d'annonce du §4.1, adressée à l'élève, avant le marqueur.** *Une réserve qui n'existe que
   dans un champ `fit_caveat` n'est lue par personne.*
2. **La scène n'entraîne à AUCUN geste d'examen.** Aucune annale vérifiée de la notion ne
   demande $y'=ay+b$ (§0.3), et **aucune ne demandera jamais de lire un champ de pentes**, qui
   n'est au cadre d'aucune des deux filières (§9.7). **C'est un instrument d'enseignement, pas
   d'entraînement** — et ce qu'il enseigne (le palier, la famille, le signe de $a$) est, lui,
   au cadre des deux. *C'est la réserve la plus lourde de ce document après le §1, et §13.2 la
   met au propriétaire.*
3. ⚠ **CLAUSE NOUVELLE, ET C'EST LA PLUS IMPORTANTE DU §10 (réparation du BLOQ-2) : AUCUN
   DESSIN FINI NE PEUT MONTRER « JAMAIS ».** La courbe est asymptote au palier : **pour toute
   fenêtre, à toute échelle, il existe un $x$ au-delà duquel les deux traits se confondent au
   pixel.** *La fenêtre retenue (§5.1.1) garantit seulement que **le dessin ne dit pas le
   CONTRAIRE** — **à l'état POSÉ de S4** ($a=-0{,}5$, $b=2$, $P=(0;5)$), au bord droit l'écart vaut
   encore 6,3 px au bureau et 4,0 px au téléphone. Elle
   ne rend pas « jamais » visible, parce que rien ne peut le rendre visible.*

   🔻 ⚠ **ET UNE PRÉCISION QUE LA TROISIÈME PASSE REND OBLIGATOIRE (fidélité 1bis, BLOCKING-1) :
   CES DEUX CHIFFRES SONT CEUX DE L'ÉTAT POSÉ, ET D'AUCUN AUTRE.** *Le contrôle `a` est ouvert à
   S4 ; sur d'autres réglages atteignables, **la confusion arrive DANS le cadre** :*

   | réglage | où l'écart est minimal | écart minimal | **à 1 280 px** | **à 390 px** |
   |---|---|---|---|---|
   | $a=-0{,}5$, $b=2$ — **l'état POSÉ de S4** | bord DROIT, $x=4$ | $e^{-2}=0{,}1353$ u | **6,32 px** | **4,04 px** |
   | $a=-0{,}5$, $b=1$ *(palier $2$, écart initial $3$)* | bord droit | $3e^{-2}=0{,}4060$ u | 18,9 px | 12,1 px |
   | $a=+0{,}5$, $b=-2$ *(palier $4$, écart initial $1$)* | 🔻 **bord GAUCHE, $x=-8$** | $e^{-4}=0{,}01832$ u | 🔻 **0,85 px** | 🔻 **0,55 px** |
   | $a=-1$, $b=2$ *(palier $2$, écart initial $3$ — atteignable à S6 seulement)* | bord droit | $3e^{-4}=0{,}05495$ u | **2,56 px** | **1,64 px** |

   **Ce qu'il faut en dire en clair : « jamais » n'est un fait de pixels à AUCUN réglage — et au
   cran le plus raide les deux traits sont à moins d'un pixel l'un de l'autre DANS le cadre.**
   *C'est pourquoi la preuve est arithmétique (juste en dessous) et pourquoi les deux portes de
   séparation sont **bornées à l'état posé de leur étape** (§11.2) : une porte qui balaierait les
   réglages rougirait sur un produit parfaitement juste — **exactement le défaut que le BLOQ-2
   prétendait avoir refermé, réintroduit un étage plus haut.***
   🔻 ⚠ **Et le pire cas n'est pas celui que la vague 1bis a calculé.** *Le rapport pointe $a=-1$ au
   bord DROIT (2,56 / 1,64 px — recalculé, **juste**). **Mais le vrai minimum est à $a=+0{,}5$ au
   bord GAUCHE : 0,85 px au bureau, 0,55 px au téléphone**, parce que **la fenêtre est
   asymétrique** — $8$ unités à gauche de $x=0$, $4$ à droite. Une solution CROISSANTE s'approche de
   son palier **quand $x$ décroît** : elle dispose de **deux fois plus de longueur** pour s'en
   rapprocher, et $e^{0{,}5\times(-8)} = e^{-4}$ est le même facteur que $e^{-1\times 4}$ avec un
   écart initial **trois fois plus petit**.* **Conséquence pratique, et elle tranche entre les trois
   remèdes du critique : le remède (b) — « dériver le plancher sur tout le domaine atteignable » —
   n'est pas seulement coûteux, il est IMPOSSIBLE (il faudrait un seuil sous-pixel). Le remède
   retenu est le (a), celui que le critique recommande : BORNER la porte à l'état posé, et
   l'écrire dans son en-tête.**

   **Ce qui porte le mot est ARITHMÉTIQUE, et c'est au niveau de l'élève :** si l'écart tombait
   à zéro, la pente tomberait à zéro (`pente` $= a \times$ `ecart-au-palier`, exhibé sur quatre
   crans à S4), donc la courbe serait **la solution constante** — celle qui ne bouge jamais. Une
   courbe qui n'est pas cette droite-là **ne peut donc pas avoir un écart nul.**
   ⚠ **Cette clause ne vit PAS seulement ici : elle est REMONTÉE dans le retour de `approche` à
   S4, adressée à l'élève** (« *ce n'est pas le dessin qui te le dit […] « jamais » ne se voit
   pas ; il se calcule* »). *Même discipline que la clause 1 : une réserve qui n'existe que dans
   un champ `fit_caveat` n'est lue par personne.*
   *Et c'est aussi la raison pour laquelle la porte `courbe-jamais-sur-le-palier` mesure un
   SEUIL DÉRIVÉ (3 px, plancher mesuré 4,04 **à l'état posé de S4**) et non « les deux traits ne se
   touchent jamais » — une porte qui exigerait cela serait une porte qui ne peut pas passer au vert,
   ce qui était exactement le défaut du BLOQ-2 (§11.2).* 🔻 **Et c'est la même raison qui oblige à
   BORNER la porte à l'état posé plutôt qu'à balayer les réglages : un seuil dérivé d'un état et
   appliqué à tous n'est pas un seuil dérivé, c'est un seuil choisi qui se croit dérivé.**
4. **Les nombres sont exacts ; le DESSIN est arrondi au pixel.** Une pente $\tfrac72$ est
   affichée exactement et **tracée** à $\pm\,0{,}5$ px. Les lectures affirment des valeurs
   exactes ; le dessin n'affirme qu'une direction.
5. **Les segments du champ ont une longueur FIXE**, indépendante de la pente (§6.2). Un
   segment de pente $-5$ et un segment de pente $-\tfrac12$ ont la même longueur à l'écran.
   **C'est une exagération, elle est constante, et elle est déclarée.** *Sans elle, le champ
   raconterait une « intensité » que l'équation ne dit pas.*
6. **Le champ est ÉCHANTILLONNÉ** : **un segment par point entier, aux deux largeurs** (§6.2,
   règle refaite en vague 1). **L'équation, elle, impose une pente en chaque point du plan, y
   compris entre les segments.** *Le `fit_caveat` doit le dire à l'élève en une phrase, sans quoi
   la scène enseigne, en creux, qu'une équation différentielle parle sur une grille.*
7. **Le point $P$ ne se déplace pas librement.** Cinq positions, choisies pour que toute
   lecture soit exacte (§2.6). Un élève qui voudrait « voir ce qui se passe entre deux
   positions » ne le peut pas — c'est le prix de l'exactitude, payé sciemment.
8. **La scène ne montre qu'une équation à la fois, et toujours à coefficients constants.**
   Aucun second membre variable, aucun système, aucun second ordre (§9.4, §9.8, §9.3).
9. **La scène ne dit rien de la VITESSE d'approche.** Elle montre QUE la courbe s'approche du
   palier, jamais en combien de temps : l'échelle $-1/a$ est hors scène et hors cadre maths
   (§2.6). *Un élève qui sortirait d'ici en croyant que toutes les décroissances se valent
   n'aurait pas été détrompé par la scène ; c'est R5 et la physique qui le font.*
10. **Les courbes à $a>0$ quittent le cadre, et c'est la vérité, pas un défaut de dessin.**
    Elles sont **clippées**, jamais aplaties sur le bord (§5.3 C). *Une courbe plafonnée
    dessinerait un palier qui n'existe pas — le seul mensonge que cette scène ne peut pas se
    permettre, et la porte le garde dans les deux sens.*
11. ⚠ **CLAUSE NOUVELLE — l'origine du repère n'est PAS au centre du cadre**
    ($x \in [-8;4]$, §5.1.1). *La partie gauche du cadre ne porte jamais de courbe : les trois
    solutions de S5 quittent le cadre avant $x \approx -3{,}2$ (table C).* **Ce n'est pas un
    défaut de cadrage, c'est le prix payé pour que « n'atteint jamais » ne soit pas démenti par le
    dessin** — et ce que cette partie du cadre montre, le champ, y est exactement aussi vrai
    qu'ailleurs, ce qui est précisément le fait de S2. *Un futur contributeur qui « recentrerait »
    le repère casserait les deux portes de séparation ; l'essai rouge n° 12 bis existe pour ça.*

---

## 11. La porte (`web/scripts/scene-champ-pentes.mjs`, ADR 0041 §8)

Principe : elle lit **le rendu réel** (`next start` + Chromium), jamais le code du produit ;
elle trouve son panneau par `[data-scene="champ-des-pentes"]`, **jamais** par `[data-scene]`
seul (précédent : la porte de l'orbite ouvrant le chapitre du champ magnétique, run 747). Elle
se lance **plusieurs fois, à plusieurs largeurs** ($1\,280$ px et 390 px au minimum) avant
d'être crue. Quatre verdicts honnêtes (ADR 0034/0038) : **ROUGE**, **AVERTISSEMENT-vu**,
**VERT-ambigu**, **MUET**. Si le contexte Canvas 2D n'est pas disponible au banc, elle sort
**MUET, en échec**, jamais en vert.

**Le calcul de cette scène est ANALYTIQUE, donc la porte refait les NOMBRES** (règle de la
corde). Elle les recalcule **sans importer aucun module du produit** (ADR 0036 : *une porte qui
importe le module du produit se donne raison*), depuis les seules constantes de cette spec.

### 11.1 Les nombres, recalculés par une seconde implémentation

| # | ce que la porte recalcule | attendu | tolérance |
|---|---|---|---|
| N1 | la **pente** $a\,y_0+b$ aux **60 états**, **recalculée pour chacun** — la table B du §5.3 n'est qu'un **contrôle ponctuel, jamais la source** | table **B** en contrôle | **égalité de chaîne** avec la lecture `pente`, **plus** égalité numérique à $10^{-9}$ |
| N2 | le **palier** $-\dfrac{b}{a}$ aux **12 équations du MODÈLE**, recalculé **deux fois** : par $-b/a$ **et** en résolvant $0=ak+b$. 🔻 ⚠ **Les douze ne sont pilotables depuis l'interface qu'à S6** (où `a` offre ses trois crans après la révélation) ; **à S3 quatre, à S4 et S5 huit** (§5.5, troisième passe). *La porte les balaie donc **à S6**, ou en posant l'état par le descripteur ; **elle ne les cherche pas à S4**, où deux d'entre elles ne sont pas atteignables* | table **A** du §5.3 | égalité de chaîne avec `palier` ; *les deux routes doivent donner le même caractère* |
| **N3** | **LA LIGNE DE L'INVARIANCE** : `pentes-comparees` affiche **deux valeurs IDENTIQUES au caractère près quand $P$ est à la même ordonnée que le point FIXE $(0\,;3)$** *(🔻 sans lettre — troisième passe, pédagogie 1bis M-b : la deuxième passe l'appelait $R$ pendant que la consigne de S2 appelait $P$ « $Q$ »)*, et **DIFFÉRENTES sinon** | table **B** | **égalité de chaîne dans les DEUX sens** ; *une scène où les deux lignes seraient toujours égales, ou jamais, doit rougir*. ⚠ **EXERÇABLE SEULEMENT DEPUIS LA VAGUE 1** (pédagogie I5) : avec `point` verrouillé à S2, les deux valeurs étaient **toujours égales** et ce second sens **ne mesurait rien** — une porte exacte sur une question plus étroite que son en-tête (ADR 0033). *`point` rouvert après la révélation, les cinq crans donnent $-3/-3$, $-3/-5$, $-3/+3$, $-3/-2$.* 🔻 **Et une sonde de NOM, ajoutée en troisième passe : aucun texte du panneau ne contient « $Q$ » ni « $R$ » comme nom de point** — *une seule lettre dans toute la scène, §5.6* |
| N4 | l'**écart au palier** $y_0 - \left(-\dfrac{b}{a}\right)$ aux 60 états, **ET la relation** `pente` $= a \times$ `ecart-au-palier` | tables **A** et **B** | égalité de chaîne, **et** égalité numérique de la relation à $10^{-9}$ |
| **N5** | **aucune lecture `pente` hors de $\tfrac12\mathbb{Z}$, aucune lecture `palier` hors de $\mathbb{Z}$**, aux 60 états | §5.3 B et A | exact ; *c'est une propriété de la GRILLE, pas d'un arrondi — une valeur à trois décimales est un bug de modèle* |
| N6 | **aucun arrondi, aucun « ≈ », aucun zéro de queue** dans les quatre lectures, aux 60 états | §5.4 | `-0{,}50`, `≈ 4`, `3{,}500` font rougir |
| N7 | la **courbe** : aux 3 points de S5 et aux **12 équations du modèle** *(🔻 pilotées à S6, cf. N2)*, la valeur de la courbe en 200 abscisses, recalculée depuis $a$, $b$ et le point de passage | table **C** en contrôle | égalité numérique à $10^{-9}$ contre la position des pixels tracés, converties par l'échelle lue sur les graduations |
| N8 | le **point fixe** : quand $y_0 = -\dfrac{b}{a}$ (cran `sur` à $(a;b)=(-1;2)$ et $(-0{,}5;1)$), `pente` vaut **$0$** et la courbe est **horizontale au pixel près** sur toute la largeur | §5.3 B | égalité de chaîne (`0`), **et** écart vertical $\le 1$ px entre les deux bords |
| **N9** | 🔻 **REFAITE EN TROISIÈME PASSE, ET ELLE MESURE DÉSORMAIS DEUX CHOSES DISTINCTES** (pédagogie 1bis, B1). **(a) Dans le MODÈLE** : `a` a exactement 3 valeurs, `b` 4, `point` 5, `champ` 4, `famille` 3 ; **aucune valeur intermédiaire, aucune borne continue**. **(b) OFFERTES PAR LE CONTRÔLE, étape par étape** : `a` expose **2 crans à S4 et S5** ($-0{,}5$ ; $+0{,}5$) et **3 à S6, après la révélation** ; les quatre autres contrôles exposent tous leurs crans partout où ils sont ouverts | §5.2, §5.5 | exact, **dans les deux volets** ; *un contrôle `a` qui offrirait $-1$ à S4 ou S5 doit rougir **seul** (essai rouge n° 22 ter), et un contrôle `a` qui n'offrirait que deux crans à S6 aussi* |
| **N10** | **la ligne du cran dégénéré** : à $a=-1$, `palier` **égale** $b$ aux quatre crans ; **aux deux autres $a$, elle ne l'égale qu'à $b=0$** | table **A** | **égalité de chaîne dans les DEUX sens** ; *une scène qui la raterait enseignerait le contraire de `lesson.md:184`*. ⚠ **PROMU EN VAGUE 1 : c'est désormais l'arithmétique qui porte LE PARI DE S6** (et non plus une `suite` de S4). *Un N10 qui échoue ne rend pas une `suite` fausse : il rend **une bonne réponse fausse**. À traiter comme N2 et N8, pas comme une vérification de confort* |

### 11.2 Les faits de PIXELS, mesurés dans les deux sens

*Toutes les sondes lisent en **fractions de l'échelle de la scène**, jamais au pixel absolu :
le facteur px/unité est lu sur **les graduations entières des deux axes**. Lancée à $1\,280$
**et** 390 px au minimum.*

| famille | le sens qui doit passer | le sens qui doit rougir |
|---|---|---|
| **`isotropie`** | le facteur px/unité mesuré sur l'axe des $x$ et sur celui des $y$ est **identique à $\le 0{,}5\%$**, aux deux largeurs ; **et la fenêtre de données couvre exactement 12 unités sur CHAQUE axe, aux deux largeurs** | un repère où `x_length/x_span ≠ y_length/y_span` doit rougir **seul** — *c'est le défaut RÉEL du 2026-08-14 (`SCENE-CONTRACT.md:186-203`, 36,9 % d'écart)*. ⚠ **ET, vague 1, le sens qui manquait : un plateau NON CARRÉ à 390 px doit rougir** — *`format: "carre"` rend `aspect-[4/3]` sous `bp-expanded` (`Plateau.tsx:74`), donc la fenêtre s'y élargirait en $x$ ; c'est le défaut que §5.1.0 a trouvé, et il n'était mesuré par rien* |
| **`segment-a-la-bonne-pente`** | **la sonde propre à cette scène** : pour chaque segment du champ, l'**angle mesuré aux pixels** (par les deux extrémités du trait) égale $\arctan(a\,y+b)$ **à $\le 1°$**, aux **12 équations du modèle** *(🔻 pilotées à S6, cf. N2 — troisième passe)*, aux deux largeurs | un champ dessiné à un facteur d'échelle vertical différent doit rougir **seul** ; **un champ dont tous les segments sont parallèles aussi** *(c'est `ed-comme-primitive` posé dans le code)* ; **et un champ dont les segments varient le long d'une HORIZONTALE aussi** *(c'est `modele-sans-ecart` posé dans le code, et c'est le sabotage le plus important de la campagne)* |
| `segment-longueur-fixe` | tous les segments d'un même rendu ont la **même longueur en pixels**, à $\le 1$ px, quelle que soit leur pente | une longueur proportionnelle à la pente doit rougir **seule** |
| `champ-lisible` | ⚠ **REFAITE EN VAGUE 1** : le pas du champ est de **1 unité AUX DEUX LARGEURS** ($13 \times 13 = 169$ segments) ; **aucun segment n'en touche un autre** — **écart $\ge 6$ px**, seuil **DÉRIVÉ** du pire cas mesuré au §6.2 (24,7 px à $1\,280$, **13,8 px à 390**) | un pas de **2** doit rougir **seul** ; **et un écart réel $< 6$ px aussi** — *les deux sens, parce que le pas est une convention et l'écart est un fait* |
| **`ligne-du-palier`** | la ligne de tirets est tracée **exactement à l'ordonnée $-\dfrac{b}{a}$**, à $\le 2$ px, aux **12 équations du modèle** *(🔻 pilotées à S6 — à S3 la porte n'en atteint que quatre, `a` y étant fermé ; cf. N2)* ; **et les segments du champ qui la touchent sont HORIZONTAUX** (angle $\le 1°$) | une ligne tracée à $b$ doit rougir **seule** *(c'est `palier-recopie-b` posé dans le code)* ; une ligne à $+\dfrac{b}{a}$ aussi ; **une ligne juste au-dessus d'un champ non plat aussi** — les deux faits sont mesurés SÉPARÉMENT |
| **`courbe-clippee-pas-plafonnee`** | une courbe qui sort du cadre **est coupée au bord et ne reparaît pas** ; **elle ne longe jamais le bord** (aucun segment horizontal de plus de 3 px au ras du cadre) | une courbe **plafonnée** au bord doit rougir **seule** — *elle dessinerait un palier qui n'existe pas* ; **et à $a=\tfrac12$, une courbe qui NE SORT PAS doit rougir aussi** (les deux sens) |
| **`courbes-jamais-confondues`** 🔻 **— PORTÉE ÉCRITE DANS L'EN-TÊTE : À L'ÉTAT POSÉ DE S5 ($a=-0{,}5$, $b=2$, les trois départs), ET À LUI SEUL** *(troisième passe, fidélité 1bis BLOCKING-1)* | ⚠ **SEUIL DÉRIVÉ EN VAGUE 1 (BLOQ-2).** À S5 révélée **et à son état posé**, sur l'intervalle où **les trois courbes sont dans le cadre** ($x \in [-0{,}713 ; 4]$, table C), elles sont **séparées de $\ge 6$ px** — plancher **mesuré** : $3e^{-2} = 0{,}406$ u, soit **18,9 px à $1\,280$ et 12,1 px à 390** (table C′), donc **marge $\times 2$**. **Et aucune n'en croise une autre** : l'ORDRE vertical des trois est constant sur $\ge 200$ abscisses. **Et aucune ne franchit la ligne du palier** | deux courbes qui se croisent doivent rougir ; une courbe qui passe de l'autre côté du palier aussi — *les deux sens, comme le géostationnaire*. ⚠ **Et le seuil ne doit PAS être remis à « en tout $x$ du cadre » : hors de l'intervalle des trois, une courbe est CLIPPÉE, et comparer un trait absent à un trait présent est une mesure sans objet.** 🔻 ⚠ **NI ÊTRE BALAYÉ SUR `a` : à $a=+0{,}5$ (bord gauche) comme à $a=-1$ (bord droit), la paire la plus serrée tombe à $3e^{-4}=0{,}0549$ u — 2,56 px au bureau, 1,64 px au téléphone — donc SOUS le seuil, sur un produit juste.** *Le NON-CROISEMENT et le NON-FRANCHISSEMENT, eux, se balaient sur tous les réglages : ce sont des faits d'ORDRE, pas de distance* |
| **`courbe-jamais-sur-le-palier`** *(famille NOUVELLE, vague 1)* 🔻 **— PORTÉE ÉCRITE DANS L'EN-TÊTE : À L'ÉTAT POSÉ DE S4 ($a=-0{,}5$, $b=2$, $P=(0;5)$), ET À LUI SEUL** *(troisième passe, BLOCKING-1)* | à S4 révélée **et à son état posé**, la courbe et la ligne du palier sont **séparées de $\ge 3$ px partout où LA COURBE EST DANS LE CADRE** — plancher **mesuré** : $e^{-2}=0{,}1353$ u, soit **6,32 px à $1\,280$ et 4,04 px à 390** (§5.1.1). 🔻 ⚠ **« où la courbe est dans le cadre » remplace « en tout $x$ du cadre » : la courbe de S4 sort par le haut à $x=-2\ln 2 = -1{,}386$ (table C), donc sur $x \in [-8 ; -1{,}386]$ il n'y a PAS de courbe à comparer à la ligne** | une courbe qui **touche** la ligne (écart $< 3$ px) doit rougir **seule** ; **et une courbe qui s'en écarterait de plus de l'écart initial aussi** (elle ne s'approche plus) — *les deux sens*. 🔻 ⚠ **En revanche, un BALAYAGE de `a` ne doit PAS rougir et ne doit pas être armé : à $a=+0{,}5$, $b=-2$, la courbe et le palier sont à 0,85 px au bureau et 0,55 px au téléphone AU BORD GAUCHE, sur un produit juste** (§10.3) |

| `avant-pari` | à chaque étape, avant l'engagement : **zéro** pixel d'accent (mesuré en **CHROMINANCE**) ; **aucune courbe** ; **aucun segment au-delà de ce que l'`etat` déclare** ; aucune lecture-réponse dans le DOM. **À S3 : aucune ligne de palier — ni trait, ni étiquette, ni nombre, ni mention dans la description lue** (absence TOTALE, règle du tremplin) **et ZÉRO segment de champ**. ⚠ **À S2 et S3 : le contrôle `point` est ABSENT du DOM avant la révélation, PRÉSENT après** (vague 1). 🔻 ⚠ **À S6 : le CONTRÔLE `a` est ABSENT du DOM avant l'engagement et PRÉSENT après** (troisième passe, pédagogie 1bis **B2**) ; **et la VALEUR de $a$ est $-0{,}5$ avant, $-1$ après** — *les deux faits sont mesurés SÉPARÉMENT : **la deuxième passe ne mesurait que la valeur**, et une porte qui lit la valeur d'un contrôle ouvert trop tôt reste verte sur le défaut (ADR 0033, troisième cas)* | après l'engagement : le champ s'étend, la ligne se pose, les courbes apparaissent, l'accent avec. **À S2 et S4, le champ (ou la ligne) EST présent avant le pari, à l'ENCRE — un champ ABSENT y doit rougir aussi** : les 🔻 **DEUX** exceptions du §7.7 sont mesurées dans les deux sens *(elles étaient trois avant la troisième passe ; celle de S6 est supprimée)*. 🔻 **Et à S6, le sens inverse : `a` qui n'apparaîtrait PAS après la révélation doit rougir aussi** — *sinon la `suite` de S6 commande un geste indisponible.* ⚠ **Et le SENS NEUF de l'accent (pédagogie I9) : après la révélation de S3, l'accent couvre la ligne du palier ET la rangée de 13 segments plats, et RIEN D'AUTRE — un champ révélé entièrement en accent (170 marques) doit rougir** |
| `palette` | tout pixel teinté du canvas a la **teinte** d'un jeton `--figure-*` lu à l'exécution ; relecture au changement de thème | une couleur posée en dur doit rougir **seule** |
| `quadrillage-opaque` | les **nœuds** du quadrillage ont la même valeur que ses **lignes**, à $\le 2$ niveaux | un quadrillage peint en transparence trait par trait doit rougir *(règle du banc de modulation)* |
| `formule-graduee` | **la table C du §7.7, étape par étape** *(SIX lignes)* : le panneau ne contient aucune des chaînes interdites de l'étape courante — 🔻 **consigne, retours, `suite`, lectures et région vivante CONFONDUES, et la `suite` en fait partie, ce que la troisième passe a dû écrire en gras parce que c'est par là que le BLOQUANT B1 est passé** | écrire « palier » dans un retour de S1, « famille » dans un retour de S4, **ou « $a=-1$ » dans un texte de S3, S4 ou S5**, doit rougir **seule** ; 🔻 **écrire « à chaque cran de $b$ » / « pour tout $b$ » dans un texte de S3, S4 ou S5 aussi** *(la forme qui porte la réponse de S6 sans la nommer)* ; 🔻 **et écrire « les segments au-dessous montent » dans un texte de S4 aussi** *(M-a)*. 🔻 ⚠ **En revanche, le distracteur `recopie-b` de S3 (« à la hauteur $2$ — c'est la valeur de $b$ ») NE DOIT PAS rougir : c'est un ÉNONCÉ FAUX NÉCESSAIRE, et l'interdit de S3 a été reformulé en FORMES pour ne plus l'attraper** (§7.7 C) |
| `fuite-inter-etapes` | ⚠ **TABLE REFAITE EN VAGUE 1, 🔻 ET REFAITE ENCORE EN TROISIÈME PASSE — ELLE LIT DÉSORMAIS LES CRANS, PAS SEULEMENT LES CONTRÔLES** (pédagogie 1bis B1/B2). La porte **réécrit elle-même** la table A du §7.7 contre le descripteur : `point` ouvert à **S1, S2 *(après révélation)*, S3 *(après révélation)*, S5, S6** ; `champ` à **S2, S5, S6** ; `b` à **S3, S4, S5, S6** ; `famille` à **S5 et S6** ; 🔻 **`a` à S4 et S5 avec EXACTEMENT les crans $\{-0{,}5 ; +0{,}5\}$, et à S6 avec les trois, APRÈS la révélation seulement** ; et `palier` **absent du DOM avant S3**, `ecart-au-palier` **avant S4** | **ouvrir `point` à S4 doit rougir** *(c'est la fermeture qui protège S5, §5.5)* ; faire exister `famille` à S4 aussi ; **ouvrir `point` AVANT la révélation à S2 ou S3 aussi** — *les deux sens : une ouverture trop tôt fuit, une ouverture jamais faite casse la `suite`*. 🔻 ⚠ **ET, TROISIÈME PASSE : offrir le cran $a=-1$ à S4 ou à S5 doit rougir SEUL** *(c'est le BLOQUANT B1 — la réponse de S6 à deux clics)* ; **faire exister le contrôle `a` à S6 AVANT l'engagement doit rougir SEUL** *(B2)* ; **et ne PAS le faire exister après doit rougir aussi** — *les deux sens* |
| `pas-de-3d` | `window.__THREE__` **indéfini panneau OUVERT** ; aucun contexte `webgl` créé ; le canvas est en `2d` | un `import("three")` dans le module de la scène doit rougir |

> ⚠ **POURQUOI `courbes-jamais-confondues` ET `courbe-jamais-sur-le-palier` SONT LA RÉPARATION
> DU BLOQ-2, ET CE QU'ELLES NE PRÉTENDENT PAS.**
> *La première rédaction exigeait « $\ge 3$ px **en tout $x$ du cadre** » sur une fenêtre où la
> séparation tombait à **0,2 px** : **la porte ne pouvait pas passer au vert sur un produit
> juste.** C'est le cas le plus pur de « porte qui ne peut pas être verte » — pire qu'une porte
> aveugle, parce qu'elle aurait enseigné à ignorer le rouge de toutes les autres (ADR 0036).*
> **Les deux seuils sont maintenant DÉRIVÉS de l'arithmétique du §5.1.1 et de la table C′, jamais
> choisis** — et si la fenêtre change, **ils changent avec elle** : la porte recalcule
> $\Delta_0\,e^{a\,x_{\max}} \times \text{px/u}$ depuis les constantes de la spec, puis **compare
> son propre seuil au plancher qu'elle vient de calculer**. *Une porte dont le seuil est au-dessus
> de son propre plancher sort **MUET, en échec** (ADR 0034), jamais verte — et l'essai rouge
> n° 12 ter l'outille.*
>
> 🔻 ⚠ **ET LE DÉFAUT QUE LA VAGUE 1bis A TROUVÉ DANS CETTE RÉPARATION MÊME (fidélité BLOCKING-1) :
> LE SEUIL AVAIT ÉTÉ RENDU ARITHMÉTIQUE, LA PORTE NON.** *Les deux planchers étaient calculés au
> **seul** $a=-\tfrac12$, **alors que `a` est le contrôle ouvert de S4 et le reste à S5** — et que
> toutes les familles voisines de ce §11.2 balaient « **les 12 équations** ». **Une porte qui balaie
> `a` sur un seuil dérivé d'un seul $a$ rougit sur un produit juste**, et le test unitaire du §14.2
> (« chaque seuil strictement sous son plancher ») l'aurait alors, très correctement, fait sortir
> **MUETTE** : **la spec, telle qu'écrite, ne pouvait pas passer au vert par ses propres règles.**
> C'est, mot pour mot, le BLOQ-2 réintroduit un étage plus haut.*
> **CE QUI EST TRANCHÉ, ET C'EST LE REMÈDE (a) DU CRITIQUE :** **les deux familles de séparation
> sont BORNÉES À L'ÉTAT POSÉ de leur étape, et la borne est écrite dans leur EN-TÊTE, pas dans une
> note** *(ADR 0033 : un en-tête ne promet pas plus que la mesure)*. **Le plancher que le test
> unitaire compare au seuil est donc celui de l'ÉTAT POSÉ** (§14.2, corrigé).
> *Le remède (b) — dériver le plancher sur tout le domaine — a été calculé et **écarté comme
> impossible** : le vrai minimum est $e^{-4}$ u à $a=+0{,}5$ **au bord GAUCHE**, soit **0,55 px à
> 390** ; aucun seuil de lisibilité ne vit sous un demi-pixel (§10.3, et c'est un chiffre que la
> vague 1bis n'avait pas vu). Le remède (c) — raccourcir $x_{\max}$ — coûte S4.*
> **Ce qu'elles ne prétendent pas :** elles ne mesurent **pas** « jamais ». « Jamais » n'est pas
> un fait de pixels (§10.3) — elles mesurent que **le dessin ne dit pas le contraire, à l'état que
> l'étape POSE**. 🔻 **Et ce qu'elles ne mesurent pas non plus, désormais explicitement : les autres
> réglages.** *Ce qui y est vrai est écrit au `fit_caveat` (§10.3), adressé à l'élève et au
> propriétaire, **parce qu'une chose qu'aucune porte ne mesure doit au moins être ÉCRITE**.*
> 🔻 *Ce qui reste balayé sur TOUS les réglages, parce que ce sont des faits d'ORDRE et non de
> distance : **le non-croisement** des trois courbes, **le non-franchissement** de la ligne du
> palier, et **le clippage**.*

### 11.3 Les autres familles

`rien-avant-le-clic` · `etapes` (chaque étape pose son état, n'ouvre que **ses** contrôles, les
autres **absents du DOM** ; **S2, S3, S4, S5 et S6 portent un `etat_revele` et S1 non**, et
c'est déclaré, §6.1 ; **six étapes** ; 🔻 **et — troisième passe — le contrôle `a` de S6 n'existe
pas avant l'engagement**, mesuré ici comme dans `avant-pari`) · `paris` (4 choix, exactement un
juste, un `retour` par choix, rien dans la région live avant l'engagement ; 🔻 **et un `retour`
pour le choix SANS `misconception` aussi** — *`b-zero-seulement` à S6 n'a pas d'étiquette et garde
son retour, §13.20 : une porte qui exigerait une `misconception` par distracteur rougirait sur ce
choix-là*) · **`stem-non-contamine`** (*famille propre
à cette scène* : aucune étape dont un choix porte `palier-recopie-b` ne pose `a: "-1"` — ⚠ **et
S6 est le test réel de cette famille, puisqu'il porte `palier-recopie-b` ET que sa RÉPONSE est
$a=-1$ : la porte vérifie que son `etat` pose `-0.5` et que son `etat_revele` seul pose `-1`** ;
🔻 **et, troisième passe : que le cran `-1` n'est OFFERT par aucun contrôle avant S6** — *la
contamination se mesure désormais sur l'ATTEIGNABLE, pas seulement sur le POSÉ* ;
et plus généralement, pour chaque étape, **les quatre valeurs de choix sont distinctes deux à
deux** — §7, §14.0) ·
**`frontiere`** (aucune des chaînes du §9 dans le panneau ouvert, **une sonde par forme** ;
🔻 **y compris les formes du §9.12, neuves : `examen`, `au bac`, `les sujets`, `annale`, `chaque
année`, `souvent`, `piège classique`…** — *et **le mot `piège` seul reste autorisé**, la consigne
de S6 l'emploie : une sonde qui l'attraperait rougirait sur un texte juste*) ·
`eclairs` (**attendu structurellement vide**, mesuré quand même, §6.1) · `sans-mouvement` ·
`katex` (aucun LaTeX brut visible ; $y'$, $-\dfrac{b}{a}$, $\tfrac72$ rendus) · `etiquettes`
(aucune étiquette n'en chevauche une autre, **ni le DESSIN sous une étiquette sans fond**,
n'est barrée par un trait, ni ne sort du cadre — à $1\,280$ **et** à 390 px ; pièce commune
`disposer` (`Plateau.tsx:258`), **obligatoire** ici ; **et le budget du §6.2 vérifié :
$\le 4$ étiquettes simultanées, graduations tous les 2 sous 600 px**) · `lectures-entieres`
(chaque formule d'une lecture tient entre les bords de sa liste, à $1\,280$, 390 et au grand
texte — *mesure née de la vague 2 de la scène sœur*) · `ergonomie` (pièce commune
`scripts/lib/scene-ergonomie.mjs`, **sans** l'argument `course`) · `console`.

### 11.4 `--essai-rouge` : ce qui doit faire crier chaque famille

Un rouge ne prouve rien sans le vert qui l'a précédé, **dans ce dossier, avec cette commande**
(ADR 0034). Sabotages à outiller :

1. poser la pente $= a + y$ au lieu de $a\,y+b$ → **N1** et `segment-a-la-bonne-pente` ;
2. poser la pente $= a$ (tous les segments parallèles) → **`segment-a-la-bonne-pente` seule**,
   dans son second sens *(c'est `ed-comme-primitive` posé dans le code)* ;
3. **faire dépendre la pente de $x$** (par exemple pente $= a\,y+b$ divisée par $1+x$) →
   **`segment-a-la-bonne-pente` seule**, dans son troisième sens, **et N3** *(c'est
   `modele-sans-ecart` posé dans le code — **le sabotage le plus important de la campagne**,
   parce que c'est le fait de S2)* ;
4. **faire afficher à `pentes-comparees` deux valeurs toujours égales**, y compris à ordonnées
   différentes → **N3 seule** ;
5. **faire afficher à `pentes-comparees` deux valeurs toujours différentes**, y compris à
   ordonnée égale → **N3 seule, dans l'autre sens** *(une porte qui n'exigerait que « les deux
   sont égales » resterait verte sur un produit qui ne mesure rien)* ;
6. **tracer la ligne du palier à $b$** → **`ligne-du-palier` seule** et **N2** *(c'est
   `palier-recopie-b` posé dans le code)* ;
7. **tracer la ligne du palier à $+\dfrac{b}{a}$** → **les mêmes, et seulement elles**
   *(`palier-signe`)* ;
8. **tracer la ligne du palier à $0$** → **les mêmes** *(`palier-oubli`)* ;
9. **tracer la ligne du palier au bon endroit mais laisser le champ non plat dessus** (par
   exemple en calculant la ligne par $-b/a$ et le champ par $ay$) → **le second volet de
   `ligne-du-palier` seul** *(un sabotage qui ne rougirait que sur le premier volet est le
   signe que les deux faits ne sont pas mesurés séparément)* ;
10. **plafonner une courbe au bord du cadre** → **`courbe-clippee-pas-plafonnee` seule** ;
11. **empêcher les courbes de sortir à $a=\tfrac12$** (en bornant $y$) → **la même famille,
    dans l'autre sens** ;
12. **faire franchir le palier à une courbe** (en calculant la courbe depuis $a$ et le point
    sans le palier, c'est-à-dire $y=y_0e^{ax}$) → **`courbes-jamais-confondues` seule**, et
    **N7** *(c'est `palier-oubli` posé dans le code)* ;
12 bis. ⚠ **AJOUTÉ EN VAGUE 1 — rendre la fenêtre trop large** (remettre $x \in [-2;10]$, la
    fenêtre de la première rédaction) → **`courbe-jamais-sur-le-palier` seule** *(l'écart au bord
    droit tombe à 0,31 px au bureau et 0,20 px au téléphone, §5.1.1)* **et
    `courbes-jamais-confondues`** *(la séparation la plus serrée tombe à 0,9 px)*. **C'est
    l'essai rouge du BLOQ-2, et il doit rougir AUX DEUX LARGEURS.** *Sans lui, rien ne garantit
    que la fenêtre retenue n'est pas remise « au propre » par un futur contributeur qui la
    trouvera décentrée ;*
12 ter. ⚠ **AJOUTÉ EN VAGUE 1 — poser un seuil de porte au-dessus de son propre plancher**
    (exiger $\ge 20$ px à `courbes-jamais-confondues`, alors que le plancher mesuré est 12,1 px
    à 390) → **la porte doit sortir MUET, EN ÉCHEC**, jamais verte et jamais rouge. *C'est le
    quatrième verdict (ADR 0034/0038) appliqué à la porte elle-même : **une porte qui ne peut pas
    être verte doit le DIRE**, et c'est le défaut exact que le BLOQ-2 a trouvé ;*
13. **faire bouger le point fixe** : à $(a;b)=(-1;2)$ et $P=(0;2)$, incliner la courbe d'un
    pixel → **N8 seule** ;
14. **rendre le repère anisotrope** (allonger `y_length` de 20 %) → **`isotropie` seule**,
    *et `segment-a-la-bonne-pente` — deux familles, et c'est attendu : l'anisotropie EST une
    fausse pente. **Le sabotage doit faire rougir les deux et rien d'autre*** ;
15. **donner aux segments une longueur proportionnelle à la pente** →
    `segment-longueur-fixe` **seule** ;
16. ⚠ **REMPLACÉ EN VAGUE 1 (fidélité I5).** *L'ancien sabotage — « passer le pas du champ à 1
    unité à 390 px » — **n'était pas un défaut** : à 390 px l'écart au pas de 1 vaut 13,8 px,
    très au-dessus du critère de 6 px de la porte. **Une porte armée pour rougir sur une
    configuration qui passe son propre test de lisibilité est une porte fausse**, et c'est
    exactement ce que ce n° 16 aurait outillé.*
    **Le sabotage qui le remplace : passer le pas du champ à 2 unités** (49 segments au lieu de
    169) → `champ-lisible` **seule**. *Et son jumeau dans l'autre sens : **allonger les segments à
    28 px à 390 px** (écart $29{,}83-28 = 1{,}8$ px) → `champ-lisible` **seule**, sur son second
    volet.* **Deux sens, parce que le pas est une convention et l'écart est un fait ;**
17. arrondir une lecture à deux décimales ($3{,}50$ pour $\tfrac72$) → **N6 seule** ;
18. faire afficher à `pente` une valeur à trois décimales → **N5 seule** ;
19. afficher la courbe, ou la ligne du palier, ou une lecture-réponse, **avant** le pari →
    `avant-pari` ;
20. **retirer le champ avant le pari de S2, ou la ligne du palier avant celui de S4** →
    `avant-pari` **dans l'autre sens** *(les deux exceptions du §7.6 sont mesurées, sinon elles
    ne sont qu'une intention)* ;
21. **faire exister un segment de champ à S3 avant la révélation**, même en encre douce →
    `avant-pari` **seule** ;
22. ouvrir `point` à S4, ou faire exister `famille` à S4 → `fuite-inter-etapes` **seule** ;
22 bis. ⚠ **AJOUTÉ EN VAGUE 1 — ouvrir `point` AVANT la révélation à S2 ou à S3** →
    `fuite-inter-etapes` **seule** *(les deux ouvertures neuves sont conditionnées à la
    révélation ; une ouverture inconditionnelle laisserait promener $P$ avant le pari, ce qui à
    S2 donne la réponse et à S3 ne la donne pas mais casse le contrat)* ; **et son jumeau dans
    l'autre sens : ne PAS ouvrir `point` après la révélation** → `fuite-inter-etapes` **seule**
    *(sinon la réparation de I3 et I5 n'est qu'une intention — trois retours de S3 et la lecture
    `pentes-comparees` redeviennent morts, et c'est invisible)* ;
22 ter. 🔻 ⚠ **AJOUTÉ EN TROISIÈME PASSE (pédagogie 1bis, B1) — offrir le cran `a: "-1"` dans le
    contrôle `a` à S4 ou à S5** → **`fuite-inter-etapes` seule**, *et **N9 dans son second volet***.
    *C'est **la réponse de S6 à deux clics**, et c'était l'état du document jusqu'ici : la non-fuite
    y tenait par le seul fait qu'aucun texte n'y attirait l'attention — **pendant que trois `suite`
    y attiraient l'attention.** **Et son jumeau dans l'autre sens : n'offrir que deux crans à S6**
    → la même famille *(sinon la `suite` de S6 et le retour de `b-zero-seulement` commandent un
    geste indisponible)* ;
22 quater. 🔻 ⚠ **AJOUTÉ EN TROISIÈME PASSE (pédagogie 1bis, B2) — faire exister le contrôle `a`
    dans le DOM de S6 AVANT l'engagement** → **`avant-pari` seule** *(et `etapes`, qui lit la même
    chose : c'est attendu, les deux doivent rougir et rien d'autre)*. *ADR 0041 §6 (`0041:98-100`)
    est sans réserve, et un pari dont l'appareil essaie les réponses **se gagne par tâtonnement**.*
    **Et son jumeau : ne PAS le faire exister après la révélation** → la même famille, second sens.
    ⚠ *Et un sabotage de MESURE, pas de produit, à outiller aussi : **armer `avant-pari` sur la
    seule VALEUR de $a$ (comme le faisait la deuxième passe) et y poser un `a` ouvert trop tôt** →
    **la porte doit RESTER VERTE**, ce qui prouve que la sonde « valeur » ne suffit pas et que la
    sonde « présence » est indispensable. **Un essai rouge qui reste vert est un résultat, ici : il
    documente pourquoi il y a deux sondes** ;*
23. écrire « palier » dans un retour de S1, « famille » dans un retour de S4, ou « courbe »
    dans un retour de S3 → `formule-graduee` **seule**, **une mesure par étape** ;
23 quater. 🔻 ⚠ **AJOUTÉ EN TROISIÈME PASSE (pédagogie 1bis, B3) — remettre l'une des QUATRE
    chaînes que la troisième passe a réécrites** : « **Avant toute courbe** » dans la consigne de S1,
    « **dans $y'=ay+b$** » dans le retour de `identique` à S2, « **elle ralentit à mesure qu'elle
    approche** » dans celui de `arretee` à S2, « **sur combien de crans la ligne plate tombe sur la
    valeur de $b$** » dans la `suite` de S3 → **`formule-graduee` seule, UNE MESURE PAR CHAÎNE**.
    *Les quatre étaient **dans le document**, dans la section qui arme cette porte, et **elles ont
    survécu à une écriture, une révision et deux critiques de vague 1**. La quatrième est passée
    parce que la table du §7.7 B ne regardait que les RETOURS, pas la `suite`.* ⚠ **Et le
    contre-essai, obligatoire : le distracteur `recopie-b` de S3 (« à la hauteur $2$ — c'est la
    valeur de $b$ ») doit laisser la porte VERTE.** *L'interdit de S3 a été reformulé en FORMES
    précisément pour ne plus attraper ce texte nécessaire (§7.7 C) ; **sans ce contre-essai, la
    reformulation n'est qu'une intention** ;*
23 quinquies. 🔻 ⚠ **AJOUTÉ EN TROISIÈME PASSE (pédagogie 1bis, M-a) — remettre « regarde les
    segments AU-DESSOUS de la ligne plate : ils montent » dans le retour de `vers-moins-infini`
    à S4** → **`formule-graduee` seule**, sur la forme `au-dessous … montent` de la ligne S4.
    *C'est la réfutation EN MOTS du distracteur de S5, un pas avant S5 ;*
23 bis. ⚠ **AJOUTÉ EN VAGUE 1 — écrire « $a = -1$ », « $b(a+1)$ », « le palier vaut $b$ » ou
    « recopier » dans un texte de S3, S4 ou S5** → `formule-graduee` **seule**, **une mesure par
    étape**. *C'est la réponse de S6, et c'est la fuite exacte que la première rédaction
    commettait dans la `suite` de S4 (BLOQ-1) — **elle doit être attrapée par une porte, pas par
    une relecture**, parce qu'elle a survécu à une écriture et à deux critiques ;*
23 ter. ⚠ **AJOUTÉ EN VAGUE 1 — remettre l'une des trois phrases thermiques supprimées**
    (« la tasse », « le café », « une pièce à $20\ °$C ») dans un retour de S2, S4 ou S5 →
    **`frontiere` seule**, sur les formes `tasse`, `café`, `°C`, `température` du §9.3.
    *Ces trois phrases étaient **dans le document** et le §9 affirmait le contraire : **la porte
    aurait rougi au premier lancement.** L'essai rouge existe pour que ce ne soit plus jamais une
    relecture qui le trouve ;*
24. **poser `a: "-1"` comme état d'une étape dont un choix porte `palier-recopie-b`** →
    **`stem-non-contamine` seule** *(c'est le défaut de stem du §7.7 E, et il doit être
    attrapé par une porte et non par une relecture)*. ⚠ **Et la variante que S6 rend
    nécessaire : poser `a: "-1"` comme `etat` de S6 (au lieu de son `etat_revele`)** →
    **`stem-non-contamine` seule** *(le porteur de `palier-recopie-b` y atteindrait la bonne
    réponse — c'est la réconciliation du §7.7 E, et elle doit être gardée par une porte)* ;
25. **donner à deux choix d'une même étape la même valeur** → **la même famille, second
    volet** ;
26. ajouter un cran $a = 0$ → **N9 seule**, *et `frontiere` sur la forme `y' = b`* ;
27. `import("three")` dans le module de la scène → `pas-de-3d` ;
28. **une forme interdite du §9 à la fois, insérée dans le panneau — UNE MESURE PAR FORME**,
    jamais une seule pour la liste entière (ADR 0036) : `Ce^{ax}`, `\exp`, `exponentielle`,
    `solution générale`, `C \in \mathbb{R}` · `condition initiale`, `x_0`, `déterminer C` ·
    `y''`, `équation caractéristique`, `discriminant`, `\omega`, `\cos` · `RC`, `u_C`, `\tau`,
    `condensateur`, `volt`, `seconde`, `°C`, `café` · `second membre`, `f(x)`,
    `variation de la constante` · `séparation des variables`, `\int`, `\ln` · **`Euler`,
    `méthode d'Euler`, `pas à pas`, `\Delta t`, `approximation`** · `champ de vecteurs`,
    `courbe intégrale`, `isocline`, `point d'équilibre`, `Cauchy-Lipschitz`, `unicité` ·
    `matrice`, `système différentiel` · `a = 0`, `y' = b` · 🔻 **`examen`, `au bac`, `les sujets`,
    `annale`, `chaque année`, `souvent`, `piège classique`** *(les formes NEUVES du §9.12,
    troisième passe)* · 🔻 **un nombre hors des grilles du §9.10 — DANS UNE LECTURE OU SUR LE
    BADGE, et nulle part ailleurs** *(forme RESSERRÉE en troisième passe, fidélité 1bis
    IMPORTANT-5 : telle qu'écrite, elle aurait rougi sur `a-plus-un` à S6 et sur `signe-recopie` à
    S1, deux textes de choix nécessaires)*.
    **Chacune doit faire rougir `frontiere` SEULE** ; une forme qui ne fait rien rougir est une
    **sonde manquante**, pas un produit propre.
    🔻 ⚠ **Et DEUX contre-essais obligatoires, tous deux nés de la troisième passe : (i) le mot
    `piège` seul, dans la consigne de S6, doit laisser la porte VERTE** *(§9.12 borne la frontière
    aux syntagmes d'examen ; `piège` est une affirmation sur le chapitre)* ; **(ii) le « $+1$ » de
    `a-plus-un` et le « $1$ » de `signe-recopie`, dans leurs textes de choix, doivent laisser la
    porte VERTE** *(§9.10 borné aux lectures et au badge)*. **Sans ces deux contre-essais, les deux
    resserrements ne sont que des intentions.**

**Un sabotage qui n'atteint pas la porte n'est pas un essai rouge** : il sort en quatrième
verdict, **AMBIGU** (ADR 0038). Et chaque défaut ne doit faire rougir que **la** porte qui le
garde. 🔻 **Et un sabotage dont on ATTEND qu'il laisse vert (un contre-essai) doit être étiqueté
comme tel dans la campagne**, sinon il sera lu comme un rouge manquant.

> ⚠ **LE COMPTE DE LA CAMPAGNE A CHANGÉ EN VAGUE 1, PUIS ENCORE EN TROISIÈME PASSE, ET IL FAUT LE
> DIRE JUSTE.** *La première rédaction annonçait « **les 28 sabotages** » ; la deuxième passe en
> comptait **33** entrées numérotées.*
> 🔻 **La campagne de la TROISIÈME passe porte 37 entrées numérotées** : les 33 de la deuxième
> passe, **plus `22 ter`** *(le cran $-1$ offert à S4/S5 — B1)*, **`22 quater`** *(`a` ouvert avant
> le pari de S6 — B2)*, **`23 quater`** *(les quatre chaînes de B3)* et **`23 quinquies`**
> *(« au-dessous … montent » — M-a)*. **Et elle porte en plus TROIS CONTRE-ESSAIS explicitement
> attendus VERTS** : le mot `piège` à S6, les deux nombres hors grille des textes de choix, et le
> distracteur `recopie-b` de S3.
> *Plusieurs entrées portent DEUX sens, donc **le nombre de MESURES est plus grand que le nombre
> d'entrées** ; et **le nombre de mesures ATTENDUES ROUGES est différent du nombre total**, puisque
> trois sont attendues vertes. **C'est à frontend-builder de fixer les trois comptes exacts dans
> l'en-tête de la porte, et au §14.5 de les citer depuis là plutôt que depuis ici** — un total
> opt-in est un plancher, pas une somme (ADR 0036).*

---

## 12. Entrée de registre, descripteur, ordre de construction

**Registre** (`web/src/lib/scene3d/scenes.json` — le renommage du dossier reste la question
héritée, §13.13) :

```json
"champ-des-pentes": {
  "temps": false,
  "dimension": "2d",
  "format": "carre-partout",
  "fenetre": { "x": [-8, 4], "y": [-6, 6] },
  "controles": ["point", "champ", "b", "a", "famille"],
  "etat": ["a", "b", "point", "champ", "famille"],
  "valeurs": {
    "a": ["-1", "-0.5", "0.5"],
    "b": ["-2", "0", "1", "2"],
    "point": ["origine", "decale", "haut", "bas", "sur"],
    "champ": ["aucun", "un-point", "ligne", "plan"],
    "famille": ["aucune", "une", "trois"]
  },
  "lectures": ["pente", "pentes-comparees", "palier", "ecart-au-palier"]
}
```

> ⚠ **DEUX CLÉS AJOUTÉES EN VAGUE 1, et je ne sais pas si le registre les accepte.**
> **`format: "carre-partout"`** est la réparation du §5.1.0 (avec `carre`, le plateau est 4:3 au
> téléphone et la fenêtre carrée ne peut pas y tenir à px/unité égal). **`fenetre`** rend la
> fenêtre de données **lisible par la porte**, qui en a besoin pour **dériver ses propres seuils**
> (§11.2) au lieu de les recevoir en dur. *⚠ **Ni l'une ni l'autre n'existe dans les entrées de
> registre que j'ai lues** : `format` est pour l'instant un `prop` de `Plateau.tsx`, pas une clé
> de `scenes.json`, et `fenetre` n'a aucun précédent. **À trancher par frontend-builder avant
> construction** (§15.3) : soit le registre les accueille, soit elles vivent dans le descripteur
> et la porte les lit là. **Ce qui n'est pas négociable, c'est que la porte puisse LIRE la fenêtre
> quelque part** — sinon ses seuils redeviennent des nombres choisis, et le BLOQ-2 revient par la
> fenêtre.*
>
> 🔻 ⚠ **UNE TROISIÈME CAPACITÉ, AJOUTÉE EN TROISIÈME PASSE, ET C'EST ELLE QUI PORTE LA RÉPARATION
> DU BLOQUANT B1 : UNE CLÉ `crans` PAR ÉTAPE, DANS LE DESCRIPTEUR.** *La `valeurs` du registre
> ci-dessus reste à **trois** crans pour `a` — c'est le MODÈLE, et le test unitaire refait les 12
> équations. Ce qu'il faut pouvoir écrire, c'est **ce que le contrôle OFFRE à une étape donnée** :*
> ```json
> { "id": "elle-n-y-arrive-jamais", "controles": ["a", "b"],
>   "crans": { "a": ["-0.5", "0.5"] }, "...": "..." }
> ```
> ⚠ **Ni ce dépôt ni la scène sœur n'ont de précédent.** *Relu à
> `content/maths/nombres-complexes-2/media/plan-complexe-transformation.json` : `etapes[].controles`
> est **une simple liste d'identifiants** ; aucune étape n'y restreint les crans d'un contrôle, et
> la lecture naturelle est donc « un contrôle listé offre toutes ses `valeurs` ». **C'est
> exactement cette lecture naturelle qui faisait la fuite de S6.***
> **À trancher par frontend-builder AVANT la construction (§15.3 d), et le repli est écrit :** si la
> clé est refusée, **§13.21** met au propriétaire le choix entre *(i)* fermer `a` entièrement à S5 et
> le garder à deux crans à S4 par une valeur en dur dans le panneau, ou *(ii)* revenir aux trois
> crans et **rétablir l'aveu du §7.7 A** — la non-fuite de S6 redevenant tenue par le seul silence
> des textes, ce que la vague 1bis a jugé insuffisant. **Ce qui n'est PAS négociable : le cran $-1$
> ne doit pas être atteignable au clic avant S6.** *Par quel mécanisme, c'est au produit de le dire ;
> qu'il le soit, c'est à la pédagogie.*

> **Pas de clé `bornes`, comme au plan complexe** : tout est en crans, il n'y a aucun
> continuum. *Deuxième scène du dépôt dans ce cas ; la première a livré, donc le validateur
> l'accepte — **mais je ne l'ai pas relu** (§15.3).*

**Descripteur** (`content/maths/equations-differentielles/media/champ-des-pentes.json`), mêmes
clés qu'au plan complexe : `slug`, `tool: "scene2d"`, `type: "manipulable"`, `scene`,
`title_fr`, `caption_fr`, `etapes[]` (`id`, `titre`, `consigne`, `pari{question, choix[]}`,
`suite`, `controles[]`, 🔻 **`crans{}` — clé NEUVE, aux seules étapes S4 et S5, pour y borner `a` à
$\{-0{,}5 ; +0{,}5\}$ (voir l'encadré ci-dessus et §15.3 d)**, `lectures[]`, `etat{}`,
**`etat_revele{}` à S2, S3, S4, S5 et S6**),
`boundary`, `boundary_guard_details`, `fit_caveat`, `param_manipulation_guide`,
`fallback_note`, `pedagogy_wiring{why_manipulable, predict_then_reveal, misconceptions[]}`,
`spec_ref`, `adr_ref`.
🔻 ⚠ **Et une contrainte sur `choix[]` que la troisième passe rend explicite : un choix peut n'avoir
AUCUNE clé `misconception`.** *C'est le cas de `b-zero-seulement` à S6 (§13.20 tranchée) : **il garde
son `retour`, il n'a pas d'étiquette.** À vérifier auprès de `validate-content` — *si le validateur
exige une `misconception` sur tout distracteur, c'est une contrainte à assouplir ou une décision à
rouvrir, et c'est au §15.3 e.**

> ⚠ **`title_fr` ET `caption_fr` : LA QUESTION, JAMAIS L'OBJET** (fidélité I2, §9.7).
> **`title_fr` : « Ce que l'équation dit en chaque point ».** *La chaîne `champ-des-pentes` ne
> vit que dans `slug`, dans la clé de registre et dans le sélecteur de porte — **elle n'apparaît
> dans aucun texte rendu**, et `frontiere` cherche les syntagmes « champ des pentes » / « champ
> de pentes » dans le panneau ouvert.* **Coût : zéro. Gain : le dernier terme hors cadre
> disparaît de l'écran de l'élève.**

> ⚠ **SIX `etapes[]`, et la sixième est neuve** (§7.6, réparation du BLOQ-1). *La différence
> structurelle avec la première rédaction : **S6 est la seule étape dont l'`etat_revele` change
> un réglage d'équation** (`{"a": "-1"}`) — les quatre autres n'ouvrent que le dessin. À vérifier
> auprès de `validate-content` avant construction (§15.3), au même titre que les `etat_revele`
> eux-mêmes.*

**Callouts médias de cette spec (ADR 0017 + ADR 0041), avec leurs deux champs obligatoires :**

| ce qui est prescrit | `type` | `tool` | statut |
|---|---|---|---|
| `champ-des-pentes` *(slug ; **titre rendu : « Ce que l'équation dit en chaque point »**, §9.7)* — une équation du premier ordre réglable, et ce qu'elle impose en chaque point du plan | **`manipulable`** | **`scene2d`** *(première partie, ADR 0041 ; l'amendement d'ADR 0017 du 2026-07-07 a fermé les nouveaux embeds tiers)* | 🔻 **PROPOSÉ, RÉVISÉ TROIS FOIS (vague 1 puis vague 1bis), non construit** |
| `famille-solutions` — la famille de la tasse, à R3 | `structural-diagram` | `svg+katex` | **EXISTE** (`media/famille-solutions.svg`), inchangé par cette spec |
| `refroidissement-modeles`, `oscillateur-periode`, `rc-charge-decharge` | `structural-diagram` | `svg+katex` | **EXISTENT**, inchangés |

*Aucune illustration d'ambiance, aucune scène `manim`, aucune 3D n'est prescrite ici : l'idée
n'est ni atmosphérique, ni spatiale, ni dynamique — elle est **locale et réglable**, ce qui est
exactement le critère d'un manipulable plan.*

**`pedagogy_wiring.misconceptions` (ONZE ids, tous EXISTANTS)** — `validate-content` exige
qu'un pari de scène nomme un modèle DÉCLARÉ (ADR 0041, addendum du manège) : **les onze le sont
déjà dans `items.yaml`, donc rien ne bloque la validation, et item-author n'a RIEN à livrer
avant la construction.** *C'est la différence structurelle avec la scène sœur, dont les deux
modèles neufs bloquaient tout le reste.*
🔻 ⚠ **ET UNE DÉCLARATION NÉGATIVE À ÉCRIRE À CÔTÉ, en troisième passe :
`pedagogy_wiring` doit nommer explicitement le distracteur SANS étiquette** — *quelque chose
comme `distracteurs_sans_modele: ["le-cran-ou-la-regle-fausse-se-cache/b-zero-seulement"]`,
avec son motif en une ligne : « **recherche incomplète, pas un modèle tenu — §13.20** ».*
**Motif de cette exigence : un trou déclaré est une décision ; un trou silencieux est un oubli, et
la prochaine relecture le « réparera » en remettant une fausse étiquette.** *Les onze ids
ci-dessous sont inchangés : `palier-oubli` reste servi à S3 et S4.*

```
mc.math.maths_equations_differentielles.ed-comme-primitive
mc.math.maths_equations_differentielles.signe-exposant
mc.math.maths_equations_differentielles.ed-inconnue-nombre
mc.math.maths_equations_differentielles.modele-sans-ecart
mc.math.maths_equations_differentielles.modele-taux-constant
mc.math.maths_equations_differentielles.palier-recopie-b
mc.math.maths_equations_differentielles.palier-signe
mc.math.maths_equations_differentielles.palier-oubli
mc.math.maths_equations_differentielles.signe-a-comportement
mc.math.maths_equations_differentielles.nombre-solutions-condition
mc.math.maths_equations_differentielles.solution-fonction-unique
```

**`fallback_note` à écrire :** sans JavaScript et à l'impression, le panneau disparaît. **La
figure `famille-solutions`, trois rungs plus bas (R3), couvre une partie de l'idée** — une
famille, un palier partagé — **sur UNE équation figée, et APRÈS la démonstration.** *L'élève
sans JavaScript perd donc les **quatre** faits que cette scène installe : l'équation comme loi
locale, l'invariance en $x$, le palier qui se DÉPLACE quand $b$ change, **et le cran où « le
palier, c'est $b$ » tombe juste** (S6, ajouté en vague 1 — et celui-là, `lesson.md:184` l'écrit
en prose, donc c'est le seul des quatre que l'élève sans JavaScript ne perd pas entièrement).
**Le coût est réel et il est écrit** ; §13.14 dit ce qu'il faudrait commander pour le payer.*

**Ordre de construction** ⚠ *(modifié en vague 1 : il y a désormais une étape item-author, et
elle est COUPLÉE — pédagogie I6, §4.6)* :
1. **frontend-builder** écrit `champ-pentes-modele.ts` (la pente, le palier par **deux
   routes**, la courbe par un point — en rationnels exacts pour les lectures, en flottants pour
   le tracé) et son test unitaire `test-champ-pentes.mjs` contre **les 60 états**, pas
   seulement contre les tables du §5.3.
2. **frontend-builder** écrit `champ-pentes-rendu.ts` (repère isotrope d'abord, quadrillage
   opaque, puis les segments à longueur fixe, puis la ligne du palier, puis les courbes
   clippées ; `disposer` pour les étiquettes), puis `ChampPentesPanel.tsx`, puis l'entrée de
   registre.
3. **content-author** écrit le descripteur (§7) et la prose (§4.1, §4.3, §4.4, §4.5).
4. **frontend-builder** écrit la porte `scene-champ-pentes.mjs` et sa campagne `--essai-rouge`
   (§11.4) — **vert d'abord, puis rouge, dans ce dossier, avec cette commande**. ⚠ **Et la porte
   commence par recalculer ses propres planchers de séparation (§11.2) : si un seuil est
   au-dessus de son plancher, elle sort MUET.** 🔻 **Le plancher à recalculer est celui de l'ÉTAT
   POSÉ de l'étape que la famille mesure, et la famille le déclare dans son en-tête** (troisième
   passe, fidélité 1bis BLOCKING-1) — *un plancher dérivé d'un état et appliqué à un balayage n'est
   pas dérivé.* **Et la campagne porte trois CONTRE-essais attendus VERTS** (§11.4) : *à étiqueter
   comme tels, sinon ils seront lus comme des rouges manquants.*
5. ⚠ **item-author** varie le stem d'UN item existant du cluster du palier, **sans en créer ni
   en retirer**, et sans toucher aux étiquettes (§4.6). *Couplé, pas différé.*
6. ✅ 🔻 **vague 1bis : PASSÉE** — bac-fidelity-critic + pedagogy-critic, tous deux **CONSTRUIRE
   APRÈS CORRECTIFS**, et **les correctifs sont appliqués dans cette troisième passe** (bandeau de
   tête). *Ce qu'ils avaient à revérifier nommément a été tranché : le refus d'ouvrir `point` à S4
   (§13.16) est **ACCEPTÉ** ; le rattachement `palier-oubli` de S6 (§13.20) est **REFUSÉ, et
   l'étiquette tombe** ; et le fait que la porte ne peut pas mesurer « jamais » (§10.3) est
   **accepté, et durci** — les deux portes de séparation sont désormais bornées à l'état posé.*
   ⚠ **Ce que ce document NE dit PAS : qu'il est relu.** *La troisième passe a trouvé **trois
   défauts de plus** (§15.13), dont un qui rend insuffisant l'un des remèdes proposés par un
   critique. **Un document qui trouve trois défauts neufs à chaque relecture n'est pas un document
   dont la quatrième relecture est inutile** — mais la décision de lancer une vague 1ter, ou de
   construire, appartient au propriétaire (§13.22).*
7. **vague 2** : dessin, calme *(dont les 169 marques à 390 px, §6.2)*, ergonomie, captures
   relues. **Elle n'a pas eu lieu, et elle est POST-construction par nature** (elle lit des
   pixels rendus).

---

## 13. Questions au propriétaire — chacune avec sa réponse par défaut, et comment la défaire

1. ✅ **RÉSOLUE, ET EXÉCUTÉE — LA DETTE $\Delta=0$ EST PAYÉE.** *Question telle qu'elle était
   posée : « faut-il construire cette scène plutôt que de payer la dette mesurée de la notion ? »
   **Défaut : la dette d'abord, la scène ensuite.** Les deux critiques de vague 1 ont confirmé le
   défaut et l'ont durci en **ORDRE** (« *the debt first, the scene second* » ; « *je
   l'endurcirais d'une préférence à un ordonnancement* »).*
   **État au 2026-09-27 : la dette est PAYÉE** — commit **`b70f9a41`** : l'exemple travaillé de
   $y''+6y'+9y=0$, le modèle **`racine-double-sans-x`**, les items **`EQDIFF-31` à `-33`**, le
   point d'arrêt **`cp-r4-racine-double`**. *Vérifié ici par lecture : `items.yaml` porte
   `total_items: 33`, 23 modèles, `ramp_coverage.R4: 7`, et `checkpoints.yaml` un sixième point
   d'arrêt. **Le trou que `REVIEW:94-100` (F4) mesurait — « l'élève rencontre le seul cas que
   l'examen lui a posé pour la première fois dans l'exercice d'examen lui-même » — est
   refermé.***
   ⚠ **CONSÉQUENCE DIRECTE SUR LE STATUT DE CETTE SCÈNE : la porte d'ordonnancement ne bloque
   plus.** *Le « CONSTRUIRE PLUS TARD » des deux critiques avait **deux** conditions : (a) la
   dette d'abord — **satisfaite** ; (b) « *et alors seulement avec BLOQ-1, BLOQ-2 et BLOQ-3
   corrigés* » / « *avec I1–I5 appliqués* » — **c'est ce que cette révision fait.** **Ce qui reste
   avant de construire n'est donc plus un ORDRE, c'est une RELECTURE** : une vague 1bis sur cette
   révision (§12, ordre de construction, étape 6), parce qu'aucune des corrections ci-dessus n'a
   encore été lue par un critique. *Et parce que cette révision a trouvé **trois défauts que ni
   l'écriture ni la vague 1 n'avaient vus** — le format `carre` non carré au téléphone, trois
   phrases thermiques interdites dans les retours, et une porte qui ne pouvait pas être verte :
   **un document qui se corrige de trois défauts neufs n'est pas un document qu'on construit sans
   relecture.***
2. ⚠ **UNE SCÈNE PEUT-ELLE ENSEIGNER PAR UNE REPRÉSENTATION QUI N'EST PAS AU CADRE ?**
   (§0.3, §9.7, §10.2.) Le champ de pentes n'est nommé par **aucun** des deux fichiers de
   cadre. La scène l'emploie comme **moyen** (le palier, la famille, le signe de $a$ sont, eux,
   au cadre des deux filières) et **jamais comme fin**.
   **Défaut : OUI, avec trois verrous** — (a) aucun item ne teste jamais la lecture d'un champ
   de pentes (§4.6) ; (b) le panneau ne présente jamais l'expression comme un terme à retenir
   (§9.7) ; (c) le `fit_caveat` et le paragraphe d'annonce le disent (§10.2, §4.1).
   *Pour défaire :* renoncer — **coût : on renonce au seul objet capable de faire VOIR le
   palier, et le cluster du palier (8 items, 13 étiquettes) reste servi par des choix de
   formules.** **C'est une décision de doctrine, pas de scène, et elle vaudra pour toutes les
   scènes de maths à venir.** ⚠ *Et la vague 1 a resserré le verrou (b) : **le titre de la carte
   porte désormais la question, pas l'objet** (§9.7, §12) — c'était le dernier endroit où un
   terme hors cadre s'affichait comme un nom.*
3. **LE CADRE MATHS N'EST PAS AUTORITATIF, et toute cette spec en dépend.** (§0.3, §1.)
   `maths-sm.yaml:12-17`, `maths-sexp.yaml:10-16` : « PROPOSITION — NON AUTORITATIVE », les
   trois portes de RULES §5 non passées, le PDF officiel scanné sans couche texte.
   **Défaut : on construit quand même, et on le déclare** — les `limites` et les
   `exclusions_transversales` citées au §1 sont toutes `source: derived — À VALIDER`.
   ⚠ **Et ici, contrairement à la scène sœur, on SAIT déjà que le fichier se trompe une fois**
   (`REVIEW:71-90`, le second ordre SExp). *Pour défaire :* faire passer les trois portes
   **avant** de construire. **Coût du défaut : si une borne dérivée est fausse, le §9 interdit
   des formes que le programme autorise, ou l'inverse.**
4. **Faut-il écrire le `spec.md` manquant de la notion ?** (§8.4, `REVIEW:105-109`.)
   **Défaut : ce document NE l'est PAS.** Il revendique **onze** modèles pour un rung ; **DOUZE
   restent non revendiqués** *(compte refait après la dette : 23 modèles, dont le neuf
   `racine-double-sans-x`)*, et `REVIEW` relève que « *17 des 22 lignes du registre ne sont pas
   rompues en prose et aucune spec ne consigne la délégation* ». ⚠ *La dette $\Delta=0$ a
   **réduit** ce trou : elle a livré la spec du seul rung qui manquait vraiment
   (`docs/pipeline/propositions/maths-equations-differentielles-delta-nul.md`), donc **deux** des
   sept rungs ont désormais une spec — R2 par ce document, R4 par celui-là.* *Pour défaire :* une
   passe pedagogy-architect sur la notion entière — **un travail distinct, plus gros que cette
   scène.** **Reste dû, et il a rétréci.**
5. **L'échelle de temps $-\dfrac{1}{a}$ doit-elle entrer ?** (§2.6, §10.9 — **et c'était dans
   le titre de travail de la commande**.) **Défaut : NON.** *Trois motifs mesurés au §2.6 :
   aucun cadre maths ne nomme une constante de temps ; dans cette leçon $\tau$ est un objet de
   **R5**, trois rungs plus bas ; et le modèle `tau-inverse` est un modèle de R5.*
   *Pour défaire, deux chemins :* **(a)** une **sixième étape**, posée en tête de **R5** et non
   de R2, qui ferait lire $-1/a$ sur le champ **une fois les habits physiques mis** — c'est une
   autre scène, ou une extension datée ; **(b)** une **scène PC** (§13.6). **Coût du défaut,
   écrit : la scène montre QUE la courbe s'approche, jamais à quelle vitesse** (§10.9).
6. **Faut-il partager la scène avec la physique ?** (§9.3.) **Défaut : NON pour la SCÈNE, OUI
   pour le MOTEUR — et la frontière côté maths est « aucune unité physique, jamais ».**
   *Mesuré : `pc/rc-charge` a un manipulable qui se déclare POC PhET et vise un interactif
   propriétaire (`rc-sandbox.json:25`) ; `pc/chute-mouvements-plans` a deux manipulables SVG,
   dont un qui montre déjà $v_{lim}$ et $\tau$ ; `pc/dipole-rl` n'en a aucun. Et le PONT
   maths↔physique existe déjà, en prose, à R5.* *Pour défaire :* une **proposition de scène
   PC** distincte, écrite avec `pc-physique-chimie.yaml` sous les yeux, qui réutiliserait
   `champ-pentes-modele.ts` et ajouterait une couche d'unités. **Coût du défaut : rien n'est
   perdu côté maths ; côté PC, `dipole-rl` reste sans manipulable et `rc-charge` reste sur un
   hébergeur tiers.** *Routé à une autre proposition, pas absorbé ici.*
7. **Le point $P$ doit-il être librement déplaçable ?** (§2.6, §5.2 C, §10.7.)
   **Défaut : NON — cinq crans.** *Motif : la valeur de la scène tient à ce que tout nombre
   affiché est exact (§5.4) ; un $(x_0;y_0)$ libre donnerait des pentes arbitraires.*
   ⚠ **Et contrairement à la scène sœur, aucun balayage muet n'est proposé** : ce qu'un
   continuum dirait ici (« la pente varie sans à-coup avec la hauteur ») est **déjà dit par le
   champ**, qui est un continuum échantillonné. *Pour défaire :* un balayage vertical de $P$,
   lectures à « — » pendant — **coût : une famille de porte de plus, pour un fait déjà
   montré.* **Je ne le recommande pas.**
8. **La scène doit-elle construire la courbe pas à pas en suivant les segments ?** (§2.6,
   §9.6.) **Défaut : NON, et c'est un interdit gardé, pas une préférence** — une construction
   pas à pas EST la **méthode d'Euler**, au cadre **PC** (`pc-physique-chimie.yaml:284`), avec
   un manipulable déjà livré (`euler-taille-de-pas`), et **au cadre maths d'aucune des deux
   filières**. *Pour défaire :* il faudrait d'abord que le cadre maths le porte. **Coût du
   défaut : on perd le geste le plus spectaculaire que cette scène pourrait faire — et c'est
   précisément pour ça qu'il fallait l'écrire comme un interdit et non comme un oubli.**
9. ⚠ **DÉFAUT CHANGÉ EN VAGUE 1 (pédagogie I6) — « Faut-il des items qui mesurent ce que la
   scène enseigne ? »** (§4.6, §8.4, §7.5.)
   **NOUVEAU défaut : OUI — UNE VARIATION DE STEM, COUPLÉE À LA CONSTRUCTION. Aucun item créé,
   aucun retiré, aucune étiquette touchée.**
   *Ce qui a fait changer le défaut : la complémentarité revendiquée entre S3 et `cp-r2-palier`
   est **plus mince** que ce document l'affirmait — **les deux exigent de calculer $-b/a$**, seul
   le format de sortie diffère. **La compétence vraiment neuve — la ligne comme un LIEU qui se
   DÉPLACE avec $b$ — n'est mesurée nulle part**, et un livrable à zéro item la laisse invisible
   pour toujours. Le critique le dit : « *la passe d'items devrait être COUPLÉE à la
   construction, pas différée* ».*
   **Et la contradiction avec la marge nulle est résolue, pas ignorée** (fidélité B1 en donne la
   forme exacte) : **on VARIE le stem d'un item existant** du cluster du palier (union
   $\{2;6;10;12;13;14;17;19\}$) pour qu'il se lise sur une figure plutôt que sur une écriture,
   **en gardant ses étiquettes** — donc `coverage_summary` sort de la livraison **au caractère
   près**, et les quatorze planchers ne bougent pas. *Le choix de l'item et la rédaction sont
   d'item-author.*
   *Pour défaire :* revenir à zéro item — **coût : le banc de fin ne verra aucune différence,
   et la scène enseigne six faits que rien ne mesure.** *Ou aller plus loin : trois à six items
   « lieu » neufs — **coût : trois items dans une notion qui vient d'en absorber trois.***
10. **Fractions ou décimaux ?** (§5.4.) La leçon écrit les deux ($-0{,}5$ à `lesson.md:104`,
    $-\dfrac{b}{a}$ partout). **Défaut : la FRACTION pour les demi-entiers d'une lecture
    ($-\tfrac12$, $\tfrac72$), le DÉCIMAL pour $a$ sur son badge ($-0{,}5$)** — parce que c'est
    ainsi que la leçon écrit chacun des deux. *Pour défaire :* tout en décimal, ou tout en
    fraction. **Coût : une ligne de rendu et une ligne de porte. Réversible.** *La règle qui ne
    bouge pas, quoi qu'il arrive : **exact, jamais arrondi, jamais « ≈ »**.*
11. 🔻 ✅ **ROUVERTE PAR LA VAGUE 1bis, PUIS REFERMÉE — « Le retour de S4 annonce-t-il trop de
    S5 ? »** (§7.7 B ; pédagogie 1bis, **M-a**.)
    *La question portait sur « mets $P$ sous la ligne plate : avec $a<0$, la courbe monte », qui
    annonçait une moitié du distracteur `celle-du-bas-descend` de S5. Le défaut était « on garde
    et on déclare le coût ».*
    ⚠ **La vague 1 a trouvé pire, et sa réparation a soldé les deux d'un coup : `point` est FERMÉ à
    S4, donc cette phrase commandait un geste IMPOSSIBLE.** *Une scène qui dit « mets $P$
    ailleurs » à une étape où le contrôle n'est pas dans le DOM n'a pas un problème de fuite, elle
    a un problème de véracité.* **La deuxième passe a alors écrit : « Rien ne reste à déclarer.
    Question close. »**
    🔻 **ET C'ÉTAIT PRÉMATURÉ.** *La réécriture de vague 1 argumentait depuis le champ — « **regarde
    les segments AU-DESSOUS de la ligne plate : ils montent** » — ce qui est **la conclusion de
    `celle-du-bas-descend` énoncée en mots**, un pas avant que S5 ne la fasse parier. *La vague 1bis
    relève aussi que le retour de `signe` à S3 (« ils montent à pic ») en faisait autant, plus tôt
    encore.* **On avait remplacé un geste impossible par une réponse anticipée : le défaut avait
    changé de forme, pas disparu.***
    🔻 **TROISIÈME RÉPARATION, et la règle qu'elle pose :** *un retour antérieur **DÉSIGNE** la
    région sans **RACONTER** son sens.* **À S4 : « compare l'inclinaison des segments au-dessous à
    celle des segments au-dessus » + une cassure par le GESTE (basculer $a$ sur $+0{,}5$). À S3 :
    « les segments tout en bas sont tout sauf plats » + une LECTURE que l'élève va chercher
    ($(0;-3)$ ⟹ $+3{,}5$).** *Dans les deux cas, **le sens vient de l'élève**, pas du texte.*
    **Et une forme est ARMÉE pour que ça ne revienne pas** : `au-dessous … montent` est interdite
    à S4 (§7.7 C) avec son essai rouge (n° 23 quinquies).
    **`celle-du-bas-descend` retrouve sa force pleine à S5. Question refermée — pour la seconde
    fois, et cette fois avec une porte.**
12. **`modele-sans-ecart` couvre-t-il un distracteur écrit en $x$ et $y$ ?** (§8.2, §8.3.)
    Sa `description` nomme « *le temps $t$* » dans les variables de la tasse
    (**`items.yaml:199-201`**) ; le distracteur `amortie` de S2 dit « la pente dépend du chemin
    parcouru » dans un plan abstrait. **Défaut : OUI, le mécanisme est le même et l'habillage est
    un habillage — AUCUN modèle neuf.**
    ✅ ⚠ **LA VAGUE 1 NE L'A PAS CONTREDIT, et le défaut tient.** *La pédagogie le classe
    « jugement, pas mesure » (M5) et note que la valeur $-0{,}75$ n'était pas recalculable depuis
    le modèle nommé — **corrigé par un autre chemin** : la valeur est passée à $-1{,}5$ (fidélité
    M7, invariant $\tfrac12\mathbb{Z}$) et le texte du choix dit désormais « **amortie de
    moitié** », qui est une décroissance ad hoc **selon le chemin parcouru**, c'est-à-dire la
    seconde clause de la `description`, mot pour mot.* **La déclaration de repli reste prête
    ci-dessous ; elle n'est toujours pas écrite.** ⚠ *Ce que la vague 1 a trouvé DE PLUS sur ce
    modèle est ailleurs et il est plus grave : **sa PREMIÈRE clause est affichée comme VRAIE à S1
    et S2** (fidélité I4, §8.1). Ce n'est pas un problème de couverture, c'est une rampe à
    déclarer — et elle l'est.*
    🔻 ✅ **LA VAGUE 1bis NE L'A PAS CONTREDIT NON PLUS.** *La pédagogie ne reprend pas ce point ; la
    fidélité classe la valeur $-1{,}5$ « stipulée par le texte du choix, pas dérivée » — **acceptable
    et déclarée** (son propre classement : LOW, « acceptable, declared §13.12 »). **Je l'accepte tel
    quel et je ne change rien** : une décroissance « de moitié » est une invention de l'élève, pas
    une conséquence de la grille ; c'est **la forme normale d'un distracteur ad hoc**, et l'invariant
    $\tfrac12\mathbb{Z}$ est ce qui la contraint à être une valeur que la scène pourrait afficher.*
    **Trois lectures, aucune contradiction : le défaut tient, et la déclaration de repli reste non
    écrite.**
    *Pour défaire, si une relecture ultérieure juge le contraire, voici la déclaration prête (à
    n'écrire que sur décision) :*
    ```yaml
      - id: mc.math.maths_equations_differentielles.pente-selon-x
        label: "La pente d'une solution crue dépendante de x (du temps écoulé), pas de y"
        description: >-
          Devant y'=ay+b, l'élève fait dépendre la pente de l'ABSCISSE : plus
          loin en x, donc plus douce (« ça s'amortit ») ou plus raide. Il donne
          deux pentes différentes à deux points de même ordonnée. Forme jumelle :
          il croit qu'une solution « finit par s'arrêter » au bout d'un certain x.
        contradicts_principle: >-
          Dans y'=ay+b, l'abscisse n'apparaît pas : la pente imposée en un point
          ne dépend que de l'ordonnée. Deux points de même hauteur portent la
          même pente, aussi éloignés soient-ils ; c'est la hauteur qui change la
          pente, jamais le chemin parcouru.
    ```
    *Et ses trois items, esquissés : (i) deux points de même ordonnée, quelle pente en chacun ;
    (ii) une courbe solution donnée, où sa pente est-elle la plus forte ; (iii) deux solutions
    de la même équation qui passent par la même ordonnée à des $x$ différents — que peut-on
    dire de leurs pentes.* **Coût du « pour défaire » : trois items dans une notion à marge
    nulle. Gain : un modèle abstrait là où il n'y a qu'un modèle habillé en café.**
13. **Le dossier `web/src/lib/scene3d/` s'appelle toujours `scene3d` alors qu'il porterait
    NEUF scènes PLANES sur quinze.** **Défaut : on n'y touche pas** — question héritée, déjà
    posée par le banc d'électrolyse et par le plan complexe. *Pour défaire :* un renommage qui
    touche quinze portes, quinze panneaux et le registre. **Décision de propriétaire, à prendre
    entre deux livraisons.**
14. **Faut-il une figure figée de repli pour l'élève sans JavaScript ?** (§12,
    `fallback_note`.) **Défaut : NON, et le coût est écrit** — `famille-solutions` couvre une
    partie de l'idée, sur une équation gelée, trois rungs plus bas. *Pour défaire :* commander
    une **cinquième figure** à trois étapes, posée juste après le marqueur : (1) le champ d'une
    équation, (2) le même champ avec $b$ changé et la ligne plate déplacée, (3) trois courbes
    visant la même ligne. **Coût : un SVG + son `.stages.json` dans une notion qui en porte
    déjà quatre ; gain : l'élève sans JavaScript garde les trois faits.**
15. **La scène est-elle servie aux DEUX filières ?** (§1 ; 🔻 **citation refaite en troisième
    passe : `lesson.md:580-582`, dans la note de validation ouverte à `:562` et fermée à `:596`** —
    ni `:519-522`, ni `:556-558`.)
    **Défaut : OUI, et sans marque de filière** — les deux cadres écrivent $y'=ay+b$ à
    l'identique (§1), et c'est le seul objet de la notion dans ce cas. ⚠ **Mais le désaccord de
    filière de la notion n'est pas tranché** (la note de validation dit SM, les trois fichiers
    de données disent SExp, et la seule annale est SExp). **La scène n'ouvre pas ce dossier** ;
    elle se borne à ne rien écrire qu'un cadre réserve à l'autre. **Reste dû.**

---

**CINQ QUESTIONS NÉES DE LA VAGUE 1 (16 à 20), 🔻 PLUS DEUX NÉES DE LA VAGUE 1bis (21, 22).**
*Parmi les cinq premières : quatre étaient des endroits où la deuxième passe avait tranché **contre**
une consigne reçue ou sur un jugement que personne n'avait mesuré ; la cinquième était un défaut
trouvé seul. **Chacune est écrite là où elle agit, avec son défaut et son coût** (ADR 0035).*
🔻 **SOLDE DE LA VAGUE 1bis SUR CES CINQ : la 16 est ACCEPTÉE telle quelle, la 19 CHANGE DE RÉPONSE,
la 20 est TRANCHÉE dans le sens des critiques, la 17 et la 18 ne sont pas rouvertes.** *Les deux
neuves sont **une capacité de produit** (21) et **une décision de cadence** (22).*

16. ⚠ **FAUT-IL OUVRIR `point` APRÈS LA RÉVÉLATION DE S4 ?** (§5.5, §7.4, §7.7 A.)
    **C'est le SEUL point où cette révision refuse une consigne reçue, et elle le déclare.**
    *La vague 1 (BLOQ-2) et la commande qui a lancé cette révision demandent tous deux d'ouvrir
    `point` après la révélation de S4, au motif que « *ça ne fuit rien, puisque `famille` est
    fermé et qu'aucune seconde courbe n'est traçable* ».*
    **Défaut : NON, `point` reste FERMÉ à S4.** *Motif, et il est structurel : rouvrir `point` ne
    dessine pas deux courbes à la fois — il dessine **une courbe après l'autre, depuis cinq
    départs, toutes visant la même ligne**, c'est-à-dire **la première moitié mot pour mot de la
    bonne réponse de S5**. La fuite ne se mesure pas au nombre de traits simultanés ; elle se
    mesure à ce que l'élève sait avant d'avoir parié.*
    **Et ce que la consigne voulait est obtenu autrement, sans fuite :** la quantité qui varie est
    l'**échelle de `b`** (écarts $1 \to 3 \to 5 \to 9$, pentes $-0{,}5 \to -1{,}5 \to -2{,}5 \to
    -4{,}5$), avec un contrôle **déjà ouvert** à S4 (§7.4). *Et `point` EST rouvert là où il ne
    fuit rien — **S2 et S3** — ce que la vague 1 demandait aussi, et qui répare I3 et I5.*
    *Pour défaire :* ouvrir `point` à S4 — **coût : il faut réécrire le pari de S5 pour qu'il ne
    porte plus que sur « se coupent-elles ? », remplacer le distracteur `celle-du-bas-descend`
    (qui devient atteignable à S4), refaire la table A du §7.7, et retirer l'essai rouge n° 22.
    Ce n'est pas un réglage, c'est une refonte de S5.** *Je ne le recommande pas — **et si le
    propriétaire ou la vague 1bis tranche autrement, c'est cette liste-là qu'il faut exécuter, pas
    seulement le contrôle qu'il faut ouvrir.***
    🔻 ✅ **VAGUE 1bis : LE REFUS EST ACCEPTÉ.** *Le rapport de pédagogie l'écrit sans réserve
    (« owner-q16 — not reopening `point` at S4 — **ACCEPTED** »), et la fidélité note que le fait
    factuel sur lequel le refus s'appuie est juste (« `b` était déjà rouvert à S4 dans la première
    rédaction, et `ecart-au-palier` y prend bien plusieurs valeurs »).* **La question est close dans
    le sens de la deuxième passe** — *c'est le seul endroit du document où un refus de consigne a été
    ratifié, et il valait la peine de l'écrire.* ⚠ *Le chiffre du détail change tout de même : les
    écarts atteignables à S4 sont **cinq** ($\{1;3;5;7;9\}$) et non six, depuis le retrait du cran
    dégénéré (§5.5, B1).*
17. **LE MARQUEUR DÉPLACÉ AFFAIBLIT-IL TROP LE DISTRACTEUR `zero` DE S3 ?** (§3, pédagogie I8.)
    *Le marqueur passe de `lesson.md:116` à après `:124`, pour que $b$ arrive motivé. Mais
    `:124` écrit le mot « palier » et le fait qu'il est « non nul » — donc l'élève arrive en
    sachant que la réponse de S3 n'est pas $0$, ce qui est exactement le distracteur `zero`.*
    **Défaut : OUI, on déplace, et le coût est déclaré.** *Motif : **R0 l'écrivait déjà** (la
    tasse ne descend jamais sous $20$), donc `zero` était **déjà** affaibli dans les deux
    placements ; `zero` mesure un **transport de R1 sans $b$**, pas une lecture ; et rien dans
    `:120-124` ne donne la HAUTEUR, qui est la question de S3.*
    *Pour défaire :* remettre le marqueur à `:116` — **coût : S3 ouvre sur « un terme constant est
    apparu », une mutation algébrique sans raison, et la scène perd son ancrage concret.**
    **Réversible en une ligne, dans les deux sens.**
18. **L'OPTION `arretee` DE S2 EST-ELLE ASSEZ VIVANTE ?** (§7.2, pédagogie M4.)
    *La vague 1 la déclare **morte** : la consigne énonçait « le point est à la hauteur $3$ », ce qui
    réfute l'option dans son propre énoncé.*
    **Défaut : on la garde, en déplaçant la réfutation du TEXTE vers le DESSIN.** La consigne dit
    « Voici maintenant $P$ » et **le plan porte $(2;3)$ à l'encre** ; l'option prédit que $P$ ne
    peut pas y être. *Jugement déclaré : ce n'est pas une option « vivante » au sens plein — elle
    est **réfutable par une observation que l'élève doit faire**, et apprendre à la faire est
    précisément ce que S2 enseigne.*
    *Pour défaire :* remplacer `arretee` — **coût : `modele-taux-constant` perd sa cassure à S2 et
    ne vit plus qu'à S4 (`droite-puis-stop`), et il faut trouver un quatrième choix recalculable
    depuis un modèle déclaré non déjà servi à S2. Je n'en ai pas trouvé** (§8.2). **Question
    ouverte, honnêtement.**
    🔻 ⚠ **CE QUI A CHANGÉ EN TROISIÈME PASSE, et ce n'est pas la réponse :** *la vague 1bis n'a pas
    rouvert ce jugement, **mais elle a fait réécrire le RETOUR de cette option** (B3.3 / MINOR-10 :
    sa queue livrait la réponse et le mécanisme de S4). **Le retour casse maintenant sur un geste
    disponible à S2** — déplacer $P$ et relire —, ce qui rend l'option **plus** vivante qu'avant,
    puisque sa réfutation est désormais une expérience que l'élève fait au lieu d'une phrase qu'il
    lit. **Le défaut « on la garde » en sort renforcé, et la question reste ouverte.***
19. 🔻 **FAUT-IL FERMER `a` À S4 ET S5 POUR PROTÉGER LE PARI DE S6 ? — RÉPONSE CHANGÉE EN TROISIÈME
    PASSE** (§7.7 A ; pédagogie 1bis, **B1**.)
    *État de la question à la deuxième passe : « S6 est la seule étape dont la non-fuite ne tient PAS
    par un contrôle fermé ; `a` est ouvert depuis S4, donc un élève curieux peut trouver la
    coïncidence avant qu'on la lui demande. La non-fuite y est tenue par le fait qu'aucun TEXTE ne
    l'y attire — une garantie plus faible. » **Défaut d'alors : NON, on ne ferme pas, et on écrit
    l'aveu.***
    🔻 **CE QUE LA VAGUE 1bis A MONTRÉ : l'aveu était faux dans sa prémisse. TROIS `suite` de la
    scène attiraient l'attention dessus** — celle de S3 en **entraînait le geste**, celle de S4
    prescrivait « promène $b$ » pendant que `a` était le contrôle neuf, celle de S5 disait « puis
    $a$ ». *La garantie « aucun texte ne l'y attire » n'existait pas.*
    🔻 **NOUVEAU DÉFAUT : NON, on ne FERME pas `a` — on lui RETIRE UN CRAN.** *`a` reste le contrôle
    neuf de S4 et reste rouvert à S5, **sur $\{-0{,}5 ; +0{,}5\}$**. Le cran $-1$ n'apparaît qu'à S6,
    après la révélation.* **Coût mesuré : ZÉRO `suite`.** *La `suite` de S4 promène `b` ; celle de
    S5 promène les DÉPARTS ; le contraste de signe de S4 se fait entre $-0{,}5$ et $+0{,}5$. Et le
    §5.2 A montre que ce cran **n'avait plus aucun emploi écrit** à S4 ni à S5 depuis la vague 1 — la
    cellule qui lui en attribuait un citait une `suite` supprimée.*
    **C'est strictement meilleur que les deux options précédentes : fermer `a` coûtait deux `suite`,
    le laisser ouvert coûtait la protection du pari de S6. Retirer un cran ne coûte rien.**
    *Pour défaire :* remettre les trois crans — **coût : l'aveu du §7.7 A revient, et la vague 1bis
    l'a jugé insuffisant.** *Et si le descripteur ne sait pas exprimer une restriction de crans par
    étape, c'est **§13.21**, pas ici.*
20. 🔻 **TRANCHÉE — LE RATTACHEMENT `palier-oubli` DU CHOIX `b-zero-seulement` DE S6 NE TIENT PAS :
    LE CHOIX RESTE, L'ÉTIQUETTE TOMBE.** (§7.6, §8.1, §8.2 ; pédagogie 1bis **M-f**, fidélité 1bis
    **MINOR-6**.)
    *La question posée à la deuxième passe : « ça ne tombe juste qu'à $b=0$ » est ce qu'on conclut si
    l'on tient le palier pour l'axe (`items.yaml:68-72`) — **mais c'est aussi ce que conclut un élève
    qui a bien compris et n'a essayé que deux crans sur trois**. **Défaut d'alors : rattachement
    PROPOSÉ, jugement DÉCLARÉ**, avec une clause de repli écrite : « si la vague 1bis le refuse, le
    choix reste et perd son étiquette ».*
    🔻 **LES DEUX CRITIQUES LE REFUSENT, POUR LE MÊME MOTIF, ET LE DÉFAUT EST DONC INVERSÉ. La
    clause de repli est exécutée.**
    **POURQUOI JE TRANCHE DANS LEUR SENS, en trois raisons et dans cet ordre :**
    **(1) L'asymétrie des coûts n'est pas symétrique du tout.** *Une étiquette ABSENTE coûte un
    signal diagnostique qu'on n'aura pas. Une étiquette FAUSSE coûte un signal diagnostique **qu'on
    aura et qui sera faux** — et le modèle apprenant ne sait pas distinguer les deux. **Dans le
    doute, on n'étiquette pas.** C'est la même règle que le NON-VERDICT du §1 : *un vert incertain
    est pire qu'un trou déclaré.**
    **(2) La `description` ne couvre pas le geste.** *Relue : « ne garde que la partie homogène
    $Ce^{ax}$ et oublie d'ajouter le palier, **comme si le terme constant $b$ était nul** »
    (`items.yaml:68-72`). C'est **un défaut de forme écrite de solution** — et **la scène n'écrit
    jamais de forme de solution** (§9.1). Le rattachement passait par une reformulation (« celui qui
    croit le palier nul conclurait ceci »), **pas par le texte.*** *La fidélité ajoute une précision
    juste : le voisin le plus proche serait la première clause de `modele-sans-ecart`
    (`items.yaml:200`, « de $T$ seule (**palier $0$**) »), qui dit littéralement « le palier est
    l'axe » — **mais elle ne décrit pas davantage une recherche interrompue.** Une étiquette
    approchante n'est pas une étiquette.*
    **(3) Et le choix est BON sans étiquette.** *C'est la réponse la plus fréquente d'un élève qui
    cherche bien et s'arrête tôt ; le retour la traite comme telle (« **tu as raison sur ce que tu as
    pu essayer** … mais il y en a une seconde »), ce qui est pédagogiquement plus juste que de le
    traiter comme un porteur de misconception. **Un distracteur n'a pas besoin d'une étiquette pour
    mériter sa place : il a besoin d'être ce qu'un élève répond vraiment.***
    **CE QUE ÇA CHANGE, exhaustivement :** *S6 porte **2 distracteurs étiquetés sur 3** ; la scène
    en porte **17 sur 18** (§8.4) ; `pedagogy_wiring` déclare le trou **explicitement**, avec son
    motif (§12) ; **les onze modèles revendiqués ne bougent pas** (`palier-oubli` reste servi à S3 et
    S4) ; **aucun compte de `items.yaml` ne bouge** ; et `validate-content` doit accepter un `choix`
    sans clé `misconception` (§15.3 e).*
    *Pour défaire :* remettre l'étiquette — **coût : un signal diagnostique faux sur le modèle le
    plus servi du cluster voisin.** *Je ne le recommande pas.*
21. 🔻 **NOUVELLE — LE DESCRIPTEUR SAIT-IL BORNER LES CRANS D'UN CONTRÔLE À UNE ÉTAPE ?** (§5.2 A,
    §12, §15.3 d.)
    *La réparation du BLOQUANT B1 exige que le contrôle `a` n'offre que $\{-0{,}5 ; +0{,}5\}$ à S4 et
    S5, et ses trois crans à S6. **Aucun descripteur du dépôt ne fait cela** : relu à
    `plan-complexe-transformation.json`, `etapes[].controles` est une liste d'identifiants, et un
    contrôle listé offre toutes ses `valeurs`.*
    **Défaut : on demande la clé — `"crans": { "a": ["-0.5", "0.5"] }` par étape — et c'est
    frontend-builder qui tranche sa faisabilité avant de commencer.**
    *Pour défaire, si la clé est refusée, DEUX replis, et le second est moins bon :*
    **(i)** *fermer `a` à S5 (sa `suite` ne l'emploie plus) et coder en dur la restriction à deux
    crans dans `ChampPentesPanel.tsx` pour S4* — **coût : une exception dans le panneau que le
    descripteur ne déclare pas, donc invisible à la porte** ;
    **(ii)** *revenir aux trois crans partout* — **coût : l'aveu du §7.7 A revient, et la vague 1bis
    l'a jugé insuffisant.**
    ⚠ **Ce qui n'est pas négociable, quel que soit le mécanisme : le cran $-1$ ne doit pas être
    atteignable au clic avant S6.** *Par quel moyen, c'est au produit de le dire ; qu'il le soit,
    c'est à la pédagogie.*
22. 🔻 **NOUVELLE — FAUT-IL UNE VAGUE 1ter, OU CONSTRUIRE ?**
    *Les deux critiques de vague 1bis rendent **CONSTRUIRE APRÈS CORRECTIFS**, et les correctifs sont
    appliqués. **Mais cette troisième passe a encore trouvé trois défauts que personne n'avait vus**
    (§15.13), dont un — le bord GAUCHE pire que le droit — qui **rend impossible l'un des trois
    remèdes proposés par un critique**. *Le taux de découverte ne baisse pas : trois défauts neufs à
    la deuxième passe, trois à la troisième.**
    **Défaut : CONSTRUIRE, et voici pourquoi — mais c'est une décision de propriétaire, pas
    d'architecte.** *Motif : **les trois défauts trouvés par cette passe sont tous des défauts de
    MESURE, et les trois auraient été attrapés par une EXÉCUTION** (une porte lancée, un test
    unitaire, un rendu lu). **Quatre lectures sans exécution ont atteint leur rendement marginal ;
    une cinquième lecture n'est pas ce qui manque — c'est un banc.*** *Pour défaire :* une vague 1ter
    — **coût : un cycle de plus sur un document qui a déjà consommé quatre lectures, pendant que la
    seule chose qui trouverait les défauts restants (l'exécution) attend la construction.**

---

## 14. Fait quand

La scène est **faite** quand, et seulement quand :

0. ⚠ **RÈGLE EN TÊTE (leçon B2 de la spec sœur) : la valeur de CHAQUE choix de pari est
   recalculée depuis le modèle que son étiquette nomme.** Pour les **vingt-quatre** choix (6
   étapes × 4), on refait le calcul que le texte du choix annonce, et on vérifie **(a)** qu'il
   donne bien le nombre ou le comportement affiché, **(b)** qu'il **diffère de la bonne
   réponse**, et **(c)** que la `description` du modèle nommé **couvre** le distracteur. *Le
   sous-cas (b) est le défaut de stem du §7.7 E, armé par la famille `stem-non-contamine`, et
   **S6 en est le test réel** : son état posé est $a=-0{,}5$ et sa réponse est $a=-1$.*
   🔻 ⚠ **PRÉCISION DE COMPTE, TROISIÈME PASSE : (a) et (b) valent pour les VINGT-QUATRE choix ;
   (c) ne vaut que pour les DIX-SEPT distracteurs ÉTIQUETÉS.** *Les six bonnes réponses ne portent
   aucun modèle, et **le dix-huitième distracteur — `b-zero-seulement` à S6 — n'en porte pas non
   plus, par décision** (§13.20). **Une vérification (c) qui balaierait les vingt-quatre échouerait
   sur sept choix parfaitement corrects** : c'est la même classe de défaut que le §9.10 avant son
   resserrement.*
1. **Aucun modèle neuf n'est écrit et aucun item n'est AJOUTÉ** (§8.2, §4.6) : `items.yaml`
   sort de cette livraison **avec le même nombre d'items (33), les mêmes 23 modèles et le même
   `coverage_summary` au caractère près** ; `checkpoints.yaml`, `bank.yaml` et `exercises.yaml`
   **inchangés au caractère près**. ⚠ **La SEULE exception autorisée, et elle est nommée : le
   stem d'UN item du cluster du palier peut être VARIÉ** (§4.6, §13.9) — *sans créer, sans
   retirer, sans toucher aux étiquettes ni aux `misconception`*. **Si `coverage_summary` a bougé
   d'un caractère, la livraison a dépassé sa commande.**
2. Le test unitaire `test-champ-pentes.mjs` passe sur **les 60 états**, pas seulement sur les
   tables du §5.3, en **valeurs exactes** ET en flottants — **et il vérifie les DEUX routes du
   palier** ($-b/a$ et la résolution de $0=ak+b$), qui doivent donner le même caractère.
   ⚠ **Et, ajouté en vague 1 : il refait les PLANCHERS DE SÉPARATION** — $\Delta_0 e^{a x_{\max}}
   \times \text{px/u}$ aux deux largeurs — **et vérifie que chaque seuil de porte du §11.2 est
   STRICTEMENT EN DESSOUS de son plancher.** *Un seuil au-dessus de son plancher est une porte
   qui ne peut pas être verte : c'était le défaut du BLOQ-2, et il doit être attrapé par le test
   unitaire AVANT la porte.*
   🔻 ⚠ **CORRIGÉ EN TROISIÈME PASSE, ET SANS CETTE CORRECTION LE TEST FORÇAIT LE MUET
   (fidélité 1bis, BLOCKING-1) : le plancher à comparer est celui de l'ÉTAT POSÉ de l'étape que la
   famille mesure**, pas le minimum sur les réglages atteignables.
   *Démonstration, et c'est de l'arithmétique : le plancher sur les réglages atteignables vaut
   $e^{-4}$ u (à $a=+0{,}5$, bord GAUCHE, écart initial $1$), soit **0,55 px à 390 px**. Un test
   qui exigerait « seuil $<$ plancher » sur ce minimum-là ferait sortir les deux familles **MUETTES
   en échec** — **la spec, telle qu'écrite avant cette passe, ne pouvait pas passer au vert par ses
   propres règles.***
   **Et une exigence de plus, symétrique : le test vérifie aussi que chaque famille DÉCLARE l'état
   sur lequel son plancher est calculé.** *Un plancher sans état déclaré est un nombre orphelin, et
   c'est par là que le défaut est entré.*
   🔻 **Le test refait en outre les QUATRE lignes de la table du §10.3** (les minimums à $a=-0{,}5$
   $b=2$, $a=-0{,}5$ $b=1$, $a=+0{,}5$ $b=-2$, $a=-1$ $b=2$, avec le bord où chacun est atteint) —
   *parce que ces chiffres sont écrits dans un `fit_caveat` rendu à l'élève et au propriétaire, et
   **un chiffre affiché doit venir d'une source qui survit à un clone** (ADR 0031).*
3. `validate-content` passe : scène enregistrée, contrôles connus, **tout contrôle ouvert par
   au moins une étape**, aucun `revele_apres_h`, **les CINQ `etat_revele` acceptés — dont celui
   de S6, qui change un réglage d'équation (`{"a": "-1"}`) et non une densité de dessin**, chaque
   pari nommant un modèle **déjà déclaré**. ⚠ **Et les deux clés neuves du registre
   (`format`, `fenetre`) sont acceptées, ou relogées dans le descripteur** (§12, §15.3).
   🔻 ⚠ **PLUS DEUX EXIGENCES NEUVES (troisième passe) :** **(a)** la clé **`crans` par étape** est
   acceptée — *ou le repli du §13.21 est exécuté ; **et ce qui n'est pas négociable, c'est que le
   cran $-1$ ne soit pas atteignable au clic avant S6*** ; **(b)** un `choix` **sans clé
   `misconception`** est accepté — *`b-zero-seulement` à S6, §13.20 ; **si le validateur l'exige,
   c'est une décision à rouvrir, pas une étiquette à inventer**.*
4. La porte `scene-champ-pentes.mjs` sort **VERT** à $1\,280$ **et** à 390 px, **lancée trois
   fois** (une porte instable est pire qu'une porte absente).
5. `--essai-rouge` : **les sabotages du §11.4 font crier la famille annoncée, et elle seule** —
   🔻 **37 entrées numérotées après la troisième passe** *(33 après la vague 1 ; + `22 ter`,
   `22 quater`, `23 quater`, `23 quinquies`)*, **plus TROIS CONTRE-ESSAIS attendus VERTS**, **et le
   compte exact des MESURES est celui que la porte imprime dans son en-tête, pas celui qu'on lit
   ici** (§11.4). Un sabotage qui n'atteint
   pas la porte sort **AMBIGU**, jamais vert. 🔻 **CINQ sabotages de référence — le fait central de
   la scène, plus un par défaut bloquant OUTILLABLE des deux vagues** *(les huit bloquants ne sont pas
   tous outillables : BLOQ-3 et B3 sont des suppressions de texte, gardées par `formule-graduee` aux
   n° 23 et 23 quater ; BLOCKING-1 est gardé par le test unitaire du §14.2 ; BLOCKING-2 par
   `frontiere` au n° 28)* **:** le **n° 3** (la pente qui dépend de $x$ — le fait de S2) ;
   le **n° 12 bis** (remettre la fenêtre large — le BLOQ-2 de la vague 1) ; le **n° 23 bis**
   (écrire « $a=-1$ » à S3, S4 ou S5 — le BLOQ-1 de la vague 1) ; 🔻 le **n° 22 ter** (offrir le
   cran $-1$ à S4 ou S5 — le **B1** de la vague 1bis) ; 🔻 le **n° 22 quater** (`a` ouvert avant le
   pari de S6 — le **B2** de la vague 1bis). *S'il en manque un, la scène ne mesure pas l'un des
   cinq défauts bloquants que les deux vagues ont trouvés.* 🔻 **Et si les trois contre-essais ne
   sont pas étiquetés « attendu VERT », ils seront lus comme des rouges manquants** (§11.4).
6. La prose du §4 est écrite, **et le paragraphe d'annonce porte ses clauses (d) ET (e)** —
   sans (d), une scène de maths qui « vérifie » une règle sur soixante états enseigne que
   vérifier suffit ; sans (e), elle n'a pas d'accroche (§4.1).
7. 🔻 ✅ **Vague 1bis : PASSÉE** (bac-fidelity-critic : chaque nombre recalculé, chaque citation de
   cadre vérifiée à la ligne, les rattachements de modèles du §8.1 relus un par un contre les
   `description` d'`items.yaml`, S6 compris — **verdict : scope CLEAN, aucun dépassement de `limite`,
   aucune `exclusion` franchie, S6 dans la frontière** ; pedagogy-critic : la rampe, les six paris,
   les retours relus les uns contre les autres — **verdict : les onze modèles sont tous
   confrontés**). **Tous deux : CONSTRUIRE APRÈS CORRECTIFS, et les correctifs sont dans cette
   troisième passe.** *Ce que chacune a changé est écrit **ici**, dans le tableau de tête et à
   l'endroit qui agit — **pas corrigé en douce**.*
   ⏳ **Vague 2 : PAS FAITE, et elle est POST-construction par nature** (captures relues à deux
   largeurs, ergonomie au clavier, étiquettes, **la lisibilité ET LE CALME du champ à 390 px — 169
   marques**, §6.2) : *elle lit des pixels, donc elle attend qu'il y ait des pixels.*
   ⚠ 🔻 **Et les SEPT questions du §13 nées des deux vagues (16 à 22) ont une réponse.** *Solde :
   **16 acceptée** par la vague 1bis ; **17 et 18 non rouvertes** ; **19 CHANGE de réponse** (on
   retire un cran au lieu de fermer le contrôle) ; **20 TRANCHÉE** contre la deuxième passe
   (l'étiquette tombe) ; **21 et 22 sont NEUVES et ATTENDENT** — *la 21 est une capacité de produit
   (frontend-builder), la 22 une décision de cadence (propriétaire). **Ce sont les deux seules choses
   qui restent ouvertes sur ce document.***

---

## 15. Ce que je n'ai pas pu vérifier

1. **Je n'ai exécuté ni le produit, ni aucune commande — ni à l'écriture, ni à la révision,
   🔻 ni à la troisième passe.** `Bash` était indisponible dans les trois sessions ; **chacune a
   disposé de `Read`, `Grep` (ripgrep) et `Glob`, et de rien qui exécute.** *Ce que cela permet :
   relire le CONTENU d'un fichier, compter des occurrences, vérifier un numéro de ligne — et c'est
   ce qui a été fait, fichier par fichier, pour tous les faits cités en vague 1 **et en vague 1bis**
   (les quatre critiques n'ont pas pu exécuter davantage, et les quatre le déclarent).* **Ce que
   cela ne permet pas : lancer le produit, une porte, un validateur, ou une commande shell.** Les
   commandes citées en regard des faits sont celles qui les REPRODUISENT ; **aucune n'a été lancée.**
   🔻 ⚠ **ET C'EST LE RISQUE PRINCIPAL QUI RESTE SUR CE DOCUMENT, chiffré : quatre lectures
   d'affilée sans exécution, et CHACUNE a trouvé des défauts que les précédentes avaient manqués.**
   *La vague 1 a trouvé trois bloquants ; la deuxième passe trois défauts neufs en s'auto-relisant ;
   la vague 1bis deux bloquants de plus ; la troisième passe trois défauts neufs (§15.13). **Le taux
   de découverte ne baisse pas.** Et — c'est le fait le plus utile de ce paragraphe — **les trois
   défauts de la troisième passe sont TOUS des défauts de MESURE** (un plancher calculé sur le
   mauvais bord, une porte qui compare un trait absent à un trait présent, un interdit non
   mesurable) : **les trois auraient été attrapés par une exécution, aucun ne l'a été par quatre
   lectures.** *C'est l'argument du §13.22.*
   ⚠ **Et les facteurs px/unité sont toujours CALCULÉS, mais ils ont changé, et le précédent
   était FAUX** (§5.1.0) : **$46{,}67$ px/unité à $1\,280$ px** (plafond de plateau de **560 px
   que j'ai CHOISI**, pas relevé) et **$29{,}83$ px/unité à 390 px** (largeur disponible
   **estimée à 358 px**, pas relevée). *Le $32{,}5$ de la première rédaction supposait à la fois
   un mauvais format (`carre` est 4:3 au téléphone) et une mauvaise dimension limitante.*
   **TOUS les seuils de porte du §11.2 descendent de ces deux nombres : si la mesure réelle les
   démentait, les seuils changeraient avec eux — c'est pourquoi la porte les RECALCULE sur les
   graduations du rendu (§11.2) au lieu de les lire ici.**
2. **Je n'ai pas lu le code des panneaux existants en entier.** J'ai lu les **signatures**
   exportées de `web/src/components/notion/scene/` (`Plateau`, `Etiquette`, `poser`,
   `disposer` — **vérifié à la révision : `Plateau.tsx:258`, `export function disposer(`** —,
   `boiteLegende`, `PariBloc`, `ConsigneEtape`, `TransportEtapes`, `SceneOptIn`, `usePari`,
   `useSceneRendu`, `commun.ts` avec `MARGE_FOCUS_CARRE` et `GRILLE_SCENE`). ⚠ **Et à la révision
   j'ai lu le CORPS du composant, pas seulement son en-tête — c'est ce qui a trouvé le défaut de
   `format`** (`Plateau.tsx:63` pour le type, **`:74` pour le rendu réel** : `carre` ⟹
   `aspect-[4/3] bp-expanded:aspect-square`, §5.1.0). *Leçon : l'en-tête d'un composant énumère
   ses options, il ne dit pas ce qu'elles FONT — la première rédaction citait `:31` et `:53-60`,
   c'est-à-dire la valeur par défaut et le commentaire, jamais la ligne qui rend.*
   **Je n'ai vérifié ni qu'un champ de 169 segments s'y rende sans retouche, ni le coût de rendu
   de ces segments à chaque changement d'état, ni la largeur réelle du plateau à 390 px.** À
   vérifier par frontend-builder avant de commencer.
3. **CINQ `etat_revele`, aucune clé `bornes`, et 🔻 CINQ points sans précédent connu : est-ce
   accepté ?** Je n'ai **pas relu `validate-content`**, ni à l'écriture, ni à la révision, ni à la
   troisième passe. *La scène sœur a livré sans `bornes`, donc le validateur l'accepte ; pour les
   `etat_revele`, d'autres scènes en portent.* ⚠ **Mais 🔻 CINQ points sont neufs et sans précédent
   connu** *(trois à la deuxième passe, **deux à la troisième**)* : **(a)** l'`etat_revele` de S6
   change **un réglage
   d'équation** (`{"a": "-1"}`) et non une densité de dessin — *tous les autres `etat_revele` du
   dépôt que je connais ouvrent le dessin* ; **(b)** `format: "carre-partout"` **n'est pas une clé
   de `scenes.json` que j'aie vue** (c'est un `prop` de `Plateau.tsx`) ; **(c)** `fenetre` n'a
   **aucun précédent** ; 🔻 **(d)** **`crans` par étape** — la clé qui borne `a` à deux valeurs à S4
   et S5, **et c'est elle qui porte la réparation du BLOQUANT B1** : *relu à
   `content/maths/nombres-complexes-2/media/plan-complexe-transformation.json`, `etapes[].controles`
   est **une simple liste d'identifiants**, sans aucun moyen de restreindre les crans ; **le repli
   est au §13.21**, et ce qui n'est pas négociable est que le cran $-1$ ne soit pas atteignable au
   clic avant S6* ; 🔻 **(e)** **un `choix` SANS clé `misconception`** — *`b-zero-seulement` à S6
   garde son `retour` et n'a pas d'étiquette (§13.20 tranchée). **Si `validate-content` exige une
   `misconception` sur tout distracteur, c'est la contrainte qu'il faut assouplir, pas l'étiquette
   qu'il faut inventer** : une étiquette écrite pour satisfaire un validateur est exactement le faux
   signal que la décision du §13.20 refuse.*
   *Si l'un des cinq est refusé, c'est à trancher **avant** la construction,
   pas pendant — et pour (c) le repli est clair : la fenêtre vit dans le descripteur et la porte
   la lit là. **Ce qui n'est pas négociable, c'est que la porte puisse LIRE la fenêtre quelque
   part**, sinon ses seuils redeviennent des nombres choisis (§11.2).*
4. **Je n'ai pas vérifié les 60 états un par un.** J'ai recalculé **les douze paliers** (table
   A), **seize pentes** (table B) et **les trois courbes de S5** avec leurs points de sortie
   (table C). Les 60 pentes, les 60 écarts et les 60 tracés **sont l'affaire du test unitaire
   du §14.2, pas de ce document** — et c'est exactement le raisonnement qui avait échoué à la
   spec sœur quand elle avait audité 35 états sur 70.
5. ⚠ **Je n'ai pas re-audité les distracteurs existants d'`items.yaml`** (90 avant la dette, plus
   ceux des trois items neufs). `REVIEW:110-114` (F-6) signale que plusieurs n'encodent pas le
   modèle dont ils portent l'étiquette et qu'« *au recompte honnête une famille tomberait sous le
   plancher* ». **Les rattachements du §8.1 s'appuient sur les `description` telles qu'écrites,
   pas sur les items.** *Si ce recompte a lieu, ils sont à relire — **et la marge est désormais de
   14 modèles au plancher, pas 15**, donc le risque a très légèrement baissé.* ⚠ **Et les deux
   critiques de vague 1 ont fait le même choix que moi** (« *j'ai jugé les onze rattachements
   contre les textes des `description`, pas contre les items qui portent les étiquettes* ») :
   **cette limite est partagée par les trois lectures, ce qui ne la rend pas moins vraie.**
6. ✅ **REFERMÉ EN VAGUE 1 (fidélité M2), et la réponse est propre.** *La question était : « une
   scène Manim de cette notion montre-t-elle déjà un champ de pentes ? »* **Mesuré à la
   révision** (`Glob animations/scenes/maths/equations-differentielles/*`) : **un seul fichier,
   `bk-2022-n-x4.py`** — l'exercice de banque 2022. **Il ne dessine aucun champ de pentes** ; le
   seul objet voisin est une **tangente** (`:214` « *Tangente en (0,1) : pente h'(0) = 2* » ;
   `:239` `axes.plot(lambda x: 2 * x + 1, …)`). **Aucun recouvrement. Le trou du §0 tient.**
7. **Je n'ai pas mesuré l'effet de cette scène sur `media-manipulable` ni sur
   `dette-manipulable`.** J'affirme au §0 que la première monte d'une notion et que la seconde
   ne bouge pas, **sur la base de lectures de fichiers et non d'une exécution des deux
   instruments** (`web/scripts/media-manipulable.mjs`, `web/scripts/dette-manipulable.mjs`
   existent tous deux).
8. **Le poids d'examen de ce chapitre n'est mesurable par RIEN.** Aucun `part_examen` n'existe
   sous le domaine (§1), et le seul chiffre est le barème d'une annale unique (1,0 point). **Je
   ne l'ai pas estimé et je ne l'estime pas** : ce serait exactement l'affirmation de fréquence
   que `REVIEW:23-29` félicite la notion de n'avoir jamais faite.
9. **La couverture de `modele-sans-ecart` sur un distracteur abstrait est un JUGEMENT, pas une
   mesure** (§8.2, §13.12). *Il était annoncé comme « le point le plus attaquable du §8 » ; **ni la
   vague 1 ni la vague 1bis ne l'ont contredit** — la pédagogie le classe « jugement, pas mesure », et
   la fidélité 1bis ne lui trouve qu'un LOW (« la valeur $-1{,}5$ est stipulée par le texte du choix,
   pas dérivée — acceptable, déclaré »). **Trois lectures, aucune contradiction ; la déclaration de
   repli reste prête et non écrite.***
   🔻 ⚠ **ET LE SOLDE DES DEUX JUGEMENTS NEUFS DE LA DEUXIÈME PASSE : l'un est TRANCHÉ CONTRE MOI,
   l'autre TIENT.**
   *(i)* **Le rattachement `palier-oubli` du choix `b-zero-seulement` de S6 est REFUSÉ par les DEUX
   critiques de vague 1bis, et l'étiquette tombe** (§13.20). *C'était le jugement que j'annonçais
   comme « le plus mince » ; il était trop mince. **La clause de repli que j'avais écrite à côté a
   servi — c'est l'argument le plus concret de ce document pour écrire ses replis d'avance.***
   *(ii)* **Le maintien de `arretee` à S2 comme option réfutable-par-observation TIENT** : *aucun des
   deux critiques ne l'a rouvert, et son RETOUR a été réécrit (B3.3), ce qui le rend **plus** vivant
   — sa réfutation est désormais un geste à faire, pas une phrase à lire* (§13.18). **Reste un
   jugement, et il reste déclaré.**
10. **Le cadre est une proposition non validée, et on sait déjà qu'il se trompe une fois**
    (§1, §13.3). C'est écrit trois fois dans ce document parce que c'est la chose qu'il ne faut
    pas oublier. ⚠ *Et la vague 1 a ajouté une nuance qu'il faut garder : le verdict de portée du
    critique de fidélité est **exactement aussi solide que ces deux fichiers, et pas davantage**
    — il l'écrit lui-même.*
11. ⚠ **AJOUTÉ À LA RÉVISION — je n'ai relu NI la prose NI les items de la dette $\Delta=0$.**
    J'ai vérifié **les comptes** (`items.yaml` : `total_items: 33`, 23 modèles,
    `ramp_coverage.R4: 7`, 14 au plancher ; `checkpoints.yaml` : un sixième point d'arrêt ;
    `racine-double-sans-x` et `EQDIFF-31..33` présents) **et je me suis arrêté là.** *Je n'ai lu ni
    l'exemple travaillé de $y''+6y'+9y=0$, ni les trois stems, ni le nouveau point d'arrêt.*
    **Ce que cela veut dire pour ce document : la porte d'ordonnancement du §13.1 est déclarée
    LEVÉE sur la foi de comptes, pas d'une relecture pédagogique de ce qui a été livré.** *Si la
    prose de la dette devait être reprise, l'ordre pourrait redevenir un sujet.*
    🔻 ⚠ **ET LA VAGUE 1bis N'A PAS COMBLÉ CETTE RÉSERVE NON PLUS** : *le rapport de fidélité
    recompte les comptes (33 items, 23 modèles, 81 étiquettes, 14 au plancher, `ramp_coverage.R4: 7`,
    6 points d'arrêt — **tous confirmés ligne à ligne**) et **ne dit rien de la prose ni des stems de
    la dette**. **Trois lectures ont donc vérifié les mêmes comptes et aucune n'a relu ce qui a été
    livré.*** **Reste dû, et ce n'est pas le travail de cette scène.**
12. ⚠ **AJOUTÉ À LA RÉVISION — trois défauts ont été trouvés par cette relecture, que ni
    l'écriture ni les DEUX critiques n'avaient vus.** *(a)* `format: "carre"` n'est pas carré au
    téléphone (§5.1.0) — **et la vague 1 a raisonné SUR le chiffre faux qui en découlait**.
    *(b)* Trois retours du §7 contenaient des chaînes que le §9.3 interdit (`tasse`, `café`,
    `°C`, `température`), alors que le §9 affirmait « *relu : le §7 n'écrit aucune forme
    interdite* ». *(c)* Une porte (`courbes-jamais-confondues`) dont le seuil rendait le vert
    **impossible** sur un produit juste. **Aucun des trois n'est un défaut de jugement : les trois
    sont des défauts de MESURE, et les trois auraient été attrapés par une exécution.**
    🔻 *Post-scriptum de la troisième passe : **la vague 1bis a confirmé les trois** — et a montré
    que la réparation de (c) était **incomplète** (le seuil était devenu arithmétique, la porte non :
    BLOCKING-1). **Réparer un défaut de mesure sans exécuter laisse une chance sur deux d'en laisser
    la moitié.***
13. 🔻 ⚠ **AJOUTÉ À LA TROISIÈME PASSE — TROIS DÉFAUTS DE PLUS, trouvés en APPLIQUANT les
    correctifs de la vague 1bis, et qu'aucune des QUATRE lectures n'avait vus.** *Ils sont écrits ici
    parce qu'un document qui ne consigne que les défauts qu'on lui signale se croit meilleur qu'il
    n'est.*
    **(a) LE BORD GAUCHE EST PIRE QUE LE BORD DROIT, et le remède (b) du critique en devient
    impossible.** *La fidélité 1bis re-dérive le plancher de séparation à $a=-1$ **au bord DROIT**
    (2,56 px / 1,64 px — juste). **Mais la fenêtre est ASYMÉTRIQUE** ($x \in [-8;4]$ : huit unités à
    gauche, quatre à droite), et **une solution croissante ($a>0$) s'approche de son palier quand $x$
    DÉCROÎT** : à $a=+0{,}5$, $b=-2$, l'écart au bord gauche vaut $e^{0{,}5\times(-8)} = e^{-4}$ u,
    soit **0,85 px au bureau et 0,55 px au téléphone** — **un tiers du chiffre du critique.**
    *Conséquence : son remède (b) (« dériver le plancher sur tout le domaine ») exigerait un seuil
    sous-pixel ; seul son remède (a) est praticable, et il est retenu (§10.3, §11.2).* **Leçon : sur
    une fenêtre asymétrique, le pire cas d'un comportement asymptotique n'est pas du côté où l'on
    regarde — il est du côté où il y a le plus de place.**
    **(b) `courbe-jamais-sur-le-palier` comparait un trait ABSENT à un trait PRÉSENT.** *Elle
    exigeait $\ge 3$ px « **en tout $x$ du cadre** », alors que la courbe de S4 **sort du cadre par le
    haut à $x=-2\ln 2 = -1{,}386$** (c'est écrit dans la table C du même document) : sur
    $x \in [-8;-1{,}386]$, **il n'y a pas de courbe à comparer.* **Et la famille voisine
    (`courbes-jamais-confondues`) avait DÉJÀ écarté cette mesure sans objet, en toutes lettres.** *Le
    même document tenait donc la bonne règle à un endroit et la fausse à l'autre, à trois lignes
    d'écart. **Corrigé : « partout où LA COURBE EST DANS LE CADRE ».***
    **(c) UN INTERDIT AURAIT FAIT ROUGIR UN DISTRACTEUR NÉCESSAIRE.** *La pédagogie 1bis signale
    qu'un interdit de S1 n'est pas mesurable (**L-e** : « toute valeur de hauteur autre que celles de
    $P$ »). **En le rendant mesurable, j'ai trouvé le même défaut en pire à S3-S4-S5** : « **toute
    phrase où « palier » et « $b$ » sont dits ÉGAUX** » aurait attrapé le choix `recopie-b` de S3
    (« à la hauteur $2$ — c'est la valeur de $b$ »), **qui est l'énoncé du distracteur le plus servi
    de la notion et qui DOIT être là.** *Corrigé en FORMES qui distinguent le distracteur (« à cette
    hauteur-ci, c'est $b$ ») de la réponse de S6 (« c'est $b$ à chaque cran »).* **Leçon : un interdit
    rédigé en catégorie sémantique ne se contente pas d'être immesurable — il attrape le contenu
    nécessaire dès qu'on essaie de le mesurer.**
    ⚠ **Les trois sont, encore, des défauts de MESURE. Les trois auraient été attrapés par une
    exécution. Aucun ne l'a été par quatre lectures.** *C'est l'argument du §13.22.*

---

## 16. Ce que la troisième passe RÉFUTE, et ce qu'elle RETIRE

*Une réfutation ne vaut que citée à la ligne. Et une réfutation qu'on a soi-même écrite à tort se
retire au même endroit, avec la même précision.* **Trois entrées : une réfutation partielle, une
correction du CADRAGE d'un reproche par ailleurs juste, et une RÉTRACTATION.**

### 16.1 — RÉFUTÉ EN PARTIE : le remède (b) de la fidélité 1bis n'est pas coûteux, il est impossible

**Ce que le rapport écrit** (BLOCKING-1, liste de remèdes) :

> « *soit (a) **borner les deux portes à l'état posé de l'étape** … ; soit (b) **dériver le plancher
> comme $\min_{a<0}\Delta_0e^{4a}\times$ px/u $= 1{,}64$ px @390** et poser les seuils en dessous, ce
> qui tue la revendication de lisibilité ; soit (c) raccourcir $x_{\max}$, ce qui coûte S4.* »

**Ce qui est juste, et qui est appliqué :** *le diagnostic entier, le remède (a), et le chiffre
$3e^{-4} = 0{,}0549$ u $\to$ 2,56 px / 1,64 px à $a=-1$ — **recalculé ici, il tombe juste.***

**Ce qui est faux, et c'est la formule du remède (b) :** *$\min_{a<0}$ **exclut le seul $a$ positif de
la grille**, et $e^{4a}$ **suppose que l'approche se fait toujours au bord DROIT**. Les deux
hypothèses tombent ensemble pour $a=+0{,}5$ : la courbe s'approche de son palier **quand $x$
décroît**, donc le facteur est $e^{0{,}5\times(-8)} = e^{-4}$ — **le même exposant qu'à $a=-1$**, mais
avec un écart initial de $1$ au lieu de $3$.*

| | formule du critique | ce qu'il faut écrire |
|---|---|---|
| domaine | $\min_{a<0}$ | $\min_{a \neq 0}$ — **le cran $+0{,}5$ existe, et c'est lui qui borne** |
| bord | $e^{4a}$ *(bord droit)* | $e^{a\,x_{\text{bord d'approche}}}$ : **$x=+4$ si $a<0$, $x=-8$ si $a>0$** |
| plancher | $3e^{-4} = 0{,}0549$ u ⟹ **1,64 px @390** | $1 \cdot e^{-4} = 0{,}01832$ u ⟹ **0,55 px @390** |

**Conséquence, et c'est pourquoi la réfutation compte :** *le critique présente (b) comme un choix
possible dont le coût serait « la revendication de lisibilité ». **À 0,55 px, ce n'est plus un coût,
c'est une impossibilité** : aucun seuil de séparation visuelle ne vit sous un demi-pixel, et un seuil
posé là ne mesurerait plus rien du tout.* **Il ne reste donc pas trois remèdes mais deux — (a) et
(c) — et (c) coûte S4. (a) est retenu, ce qui est la recommandation du critique ; ce qui change,
c'est qu'elle n'est plus un choix parmi trois, elle est le seul chemin praticable.** *§10.3 porte le
tableau complet des quatre réglages, §11.2 la borne, §14.2 le test qui la garde.*

### 16.2 — CADRAGE CORRIGÉ : le B1.1 de la pédagogie est juste, et la règle qu'il invoque était elle-même fausse

**Ce que le rapport écrit** (B1, point 1) : *la `suite` de S3 « *breaks §7.7 C S3 row forbidding any
sentence where « palier » and « b » are said EQUAL* ».*

**C'est exact, et la `suite` est réécrite** (§7.3). **Mais la règle invoquée ne pouvait pas servir de
juge**, et il faut le dire, sinon la réparation s'appuie sur un appui creux : *cet interdit — « **toute
phrase où « palier » et « $b$ » sont dits ÉGAUX** » — **aurait aussi attrapé le choix `recopie-b` de
S3**, dont le texte est « **à la hauteur $2$ — c'est la valeur de $b$** ». C'est l'énoncé du
distracteur porteur de `palier-recopie-b`, **le modèle le plus servi de la notion (5 étiquettes)**, et
**il doit être là.***

**Donc :** *la `suite` de S3 était bien une fuite — **pour la raison que le rapport donne par
ailleurs, et qui est la bonne** : elle **entraînait le geste** de comparer le palier à $b$, ce que S6
fait parier. **Elle n'était pas une fuite parce qu'elle violait cet interdit-là**, puisque cet
interdit condamnait aussi un texte nécessaire.* **L'interdit est donc reformulé en FORMES** qui
séparent le distracteur (« à cette hauteur-ci, c'est $b$ ») de la réponse de S6 (« c'est $b$ **à
chaque cran** ») — §7.7 C, avec son contre-essai obligatoire (§11.4, n° 23 quater).
*Le verdict du critique tient ; son APPUI est remplacé par un appui qui, lui, se mesure.*

### 16.3 — 🔻 RÉTRACTATION : la réfutation M4 de la deuxième passe est RETIRÉE, et c'est moi qui avais tort

**Ce que la deuxième passe écrivait**, dans son tableau « Réfuté, en écrit » :

> « **M4** (fid.) … **Les deux numéros sont faux** — et les miens aussi. Le commentaire
> `<!-- NOTE DE VALIDATION` s'ouvre à **`lesson.md:538`** et se ferme à **`:572`** ; le désaccord de
> filière est à **`:556-558`**, le passage R5 à **`:559-564`**. »

**Aucun de ces quatre numéros ne correspond au fichier, ni avant ni après la dette.** *Relu ligne à
ligne en troisième passe : **le commentaire s'ouvre à `:562` et se ferme à `:596`** ; le désaccord de
filière est à **`:580-582`** ; le passage R5/physique à **`:583-591`**.*
**Et les numéros de la vague 1, que j'avais déclarés faux, étaient JUSTES contre le fichier
d'avant la dette :** *le commit `b70f9a41` a inséré **60 lignes** au-dessus de R5, et
$562-60 = 502$ ✓, $583-60 = 523$ ✓ — les deux nombres du critique.*

**Ce que cette rétractation enseigne, et c'est une règle neuve pour ce dépôt :** *quand un fichier a
bougé sous un document, **on ne corrige pas une citation en recalculant un décalage : on relit le
fichier.** J'ai fait l'inverse — j'ai raisonné sur un décalage supposé, j'ai produit un troisième jeu
de numéros qui ne correspond à rien, **et j'ai déclaré faux un critique qui avait raison, dans le
paragraphe même où je me félicitais de corriger ses citations.*** **C'est le défaut le plus gênant
des trois passes, parce que c'est un défaut de méthode et non d'arithmétique.**
*Le JUGEMENT du critique, lui, était juste depuis la vague 1 et il est appliqué depuis : les deux
citations sont **de la note de validation**, invisible à l'élève — **une spec ne doit pas faire dire à
une leçon ce qui est écrit dans sa marge.***

### 16.4 — Deux nuances de mesure, sans conséquence, notées pour l'exactitude

- **`cp-r2-palier` : `:139-184`, pas `:139-185`.** *Le rapport de fidélité écrit `:139-185` ;
  `checkpoints.yaml:185` est **une ligne vide**, et le dernier caractère du point d'arrêt est à
  `:184`. **Aucune conséquence** — j'écris la plage bornée par le contenu, et je le signale pour que
  la prochaine lecture ne « corrige » pas dans l'autre sens. Les quatre choix commencent à `:150`.*
- **Le compte propre de cette spec dans son propre grep n'est PLUS cité.** *Le rapport note à juste
  titre que « 40 » était devenu « 43 ». **Ce n'est pas un chiffre à mettre à jour, c'est un chiffre à
  retirer** : il croît avec le document qui le porte. §0 ne cite plus que le nombre de FICHIERS et le
  compte de `…-delta-nul.md` (8), qui, lui, est stable.*

---

**Dernier mot, et il est pour le propriétaire. Les comptes, puisque ce document en fait une
discipline :**

| | vague 1 | vague 1bis | total |
|---|---|---|---|
| défauts **BLOQUANTS** signalés par les critiques | **3** *(BLOQ-1, BLOQ-2, BLOQ-3 — pédagogie)* | **5** *(B1, B2, B3 — pédagogie ; BLOCKING-1, BLOCKING-2 — fidélité)* | **8** |
| défauts **NEUFS trouvés par la passe qui appliquait** *(que personne n'avait signalés)* | **3** *(§15.12, deuxième passe)* | **3** *(§15.13, troisième passe)* | **6** |
| dont **défauts de MESURE** *(un plancher, un interdit, une porte — pas un jugement)* | **3 sur 3** | **3 sur 3** | **6 sur 6** |

*Quatre lectures, **huit** bloquants, **six** défauts neufs trouvés par les relectures elles-mêmes —
**et les six sont tous des défauts de MESURE que rien, dans une lecture, ne pouvait attraper autrement
que par chance.** Ce document a atteint ce qu'une relecture sans banc peut donner. **Ce qui manque
maintenant n'est pas un regard de plus : c'est une exécution** (§13.22, §15.1).*






