# Rapport 07 — Fidélité au bac et exactitude scientifique des trois pilotes

- **Base auditée** : `origin/claude/vibrant-fermi-v1lxj5` au commit `0fadbe11` (post-corrections du rapport 01 `a57dbc5e`).
- **Périmètre** : les trois leçons pilotes (`/pilote/logarithme`, `/pilote/radioactivite`, `/pilote/expression-genetique`), leurs scènes, leurs données et leurs 35 exercices générés (14 Maths, 11 Physique, 10 SVT), confrontés aux cadres de référence officiels 2025 (`docs/referentiel/`), aux sujets du bac (`docs/sujets/`, `docs/bible/`) et aux sources scientifiques primaires.

## Synthèse (5 lignes)

Le socle scientifique des trois pilotes est d'un niveau rarement atteint dans le secondaire : les 64 codons de la table NCBI, la séquence réelle de *HBB* (`NM_000518.5`), les 19 désintégrations nucléaires des exercices et les repères historiques vérifiés sont justes. L'audit révèle néanmoins **trois défauts bloquants d'exactitude** qu'un élève rencontre directement : une erreur de physique nucléaire dans un feedback de la leçon de radioactivité ($\beta^-$ confondu avec $\beta^+$), un indice de l'exercice 10 de SVT codé en dur pour le « brin non transcrit » même quand le sujet tire le « brin transcrit » (50 % des tirages), et une ambiguïté génétique non filtrée dans l'exercice 8 de SVT (~21,5 % des indels) qui rejette des réponses biologiquement justes. Sur la fidélité au bac, la plus grosse lacune programme est l'absence totale du **diagramme $(N, Z)$ de Segrè** en physique (`1.2.1.3`–`1.2.1.4`), pourtant tombé au bac 2025 N et 2023 N. En mathématiques, l'exercice 14 (« format bac ») omet la limite en $+\infty$ et les branches infinies, les exercices 13–14 exigent $\ln a$ approché sans le donner (bloquant en filière SM sans calculatrice), et les indices des exercices 12–14 divulguent la réponse de la question précédente.

## Les 5 changements qui auraient le plus d'effet

1. **Corriger le feedback physique erroné de `v-ecrire` (`G-07-001`)** : remplacer « Ce serait β⁻ : Z + 1 » par « Ce serait β⁺ : Z − 1 » sur le distracteur ${}^{238}_{93}\mathrm{Np}$ de la désintégration du ${}^{238}_{94}\mathrm{Pu}$ (`radioactivite-moteur.js:222`).
2. **Corriger l'indice de l'exercice 10 de SVT selon le brin tiré (`G-07-002`)** : conditionner l'indice Q1 sur `brin === "transcrit"` vs `"non transcrit"` (`exercices/expression-genetique.js:581`) afin d'arrêter d'envoyer l'élève dans le piège 1 fois sur 2.
3. **Éliminer les indels ambigus dans l'exercice 8 de SVT (`G-07-003`)** : filtrer dans le générateur tout tirage où deux triplets différents produisent la même séquence mutée `m` (et éviter `p === 0` pour une insertion), supprimant les faux rejets dans ~21,5 % des délétions et ~21,7 % des insertions.
4. **Ajouter le diagramme $(N, Z)$ de Segrè en physique (`G-07-004`)** : couvrir les capacités officielles `1.2.1.3` et `1.2.1.4` (zones de stabilité, $\beta^-$, $\beta^+$, $\alpha$) dans la leçon et dans un exercice dédié, conformément au bac 2025 N et 2023 N.
5. **Aligner les exercices séance 2 de maths sur le bac réel (`G-07-005`, `G-07-006`, `G-07-008`)** : fournir les valeurs approchées de $\ln a$ (ou demander la valeur exacte) pour la filière SM sans calculatrice, ajouter $\lim_{x\to+\infty} f(x)$ et une branche infinie à l'exercice 14, et réécrire les indices 12 b, 13 b et 14 d pour qu'ils ne divulguent plus la question précédente.

---

## Ce qui a été vérifié et est remarquablement exact

Avant de lister les écarts, voici les vérifications positives effectuées sur `0fadbe11` :

- **SVT — Code génétique et séquence réelle *HBB*** : vérification scriptée des **64/64 codons** de `expression-genetique-code.js:24-25` contre la table standard NCBI 1 → **0 erreur**. La séquence `CDS` (444 nt, 147 aa avant clivage de Met, 146 aa mûrs) reproduit exactement `NP_000509.1` ; les mutations scénarisées (`GAG→GTG` Glu6Val, `GAG→GAA` silencieuse, `GAG→TAG` non-sens, délétion `FSC 6 (-A)` donnant un stop prématuré à 17 aa mûrs, et codon 39 `CAG→TAG` fréquente au Maroc) sont exactes. Le sens de migration de l'électrophorèse en tampon alcalin (`expression-genetique-scenes-a.js:232-244`, HbS moins négative avançant moins loin vers le pôle +) et les dates historiques (Pauling 1949, Ingram 1956–1957, Nirenberg & Matthaei 27 mai 1961) sont exacts.
- **Physique — Constantes nucléaires et repères historiques** : les 19 réactions de `DESINT` et les 10 demi-vies de `COURTS`/`LONGS` (`exercices/radioactivite.js:68-90`) sont physiquement justes. Les constantes de `radioactivite-outils.js:85-114` ($N_A = 6{,}02\times 10^{23}$, $t_{1/2}({}^{220}\mathrm{Rn}) = 55{,}6\text{ s}$, $t_{1/2}({}^{238}\mathrm{U}) = 4{,}468\times 10^9\text{ ans}$, $t_{1/2}({}^{14}\mathrm{C}) = 5\,730\text{ ans}$, perte d'${}^{238}\mathrm{U}$ depuis 1896 $\approx 2\times 10^{-8}$, Jebel Irhoud $315\text{ ka}$, tableau de Rutherford 1900) et les dates de Becquerel (26–27 février / 1er mars 1896) sont exactes.
- **Maths — Construction et calculs de la séance 1** : la progression historique (Stifel 1544, Napier 1614 à Édimbourg), la construction de $\ln$ comme aire sous $1/x$ puis primitive nulle en 1, les propriétés algébriques, les conditions d'existence et tous les calculs des exercices 1 à 9 sont mathématiquement rigoureux.

---

## Partie 1 — Faits vérifiables

### G-07-001 — Feedback erroné en physique nucléaire : β⁻ (Z + 1) affirmé pour un noyau à Z − 1 (β⁺)
- **Gravité** : BLOQUANT
- **Où** : `web/src/components/pilote/radioactivite-moteur.js:219-222` (`/pilote/radioactivite`, étape `v-ecrire`)
- **Constat** : Dans la question du sujet 2021 sur la désintégration $\alpha$ du plutonium 238 (${}^{238}_{94}\mathrm{Pu}$), le distracteur ${}^{238}_{93}\mathrm{Np}$ affiche le feedback suivant :
  > « Ce serait β⁻ : *Z* + 1, *A* inchangé. α emporte 4 nucléons, dont 2 protons. »
- **Preuve** : Dans ${}^{238}_{94}\mathrm{Pu} \to {}^{238}_{93}\mathrm{Np}$, le numéro atomique passe de $Z = 94$ à $Z' = 93$, soit **$Z - 1$** (émission d'un positon ${}^{0}_{+1}\mathrm{e}$, radioactivité **$\beta^+$**). Une désintégration $\beta^-$ ($Z + 1$) donnerait $Z' = 95$, soit l'américium ${}^{238}_{95}\mathrm{Am}$, et non le neptunium ${}^{238}_{93}\mathrm{Np}$. L'explication enseigne littéralement l'inverse de la loi de conservation de la charge sur le piège le plus fréquent du chapitre (`pc-pc 1.2.1.6` et `1.2.1.8`).
- **Proposition** : Remplacer le feedback de la ligne 222 par :
  > « Ce serait β⁺ : *Z* − 1, *A* inchangé. α emporte 4 nucléons, dont 2 protons. »
  (Ou, si l'on préfère tester le distracteur $\beta^-$, changer le distracteur en ${}^{238}_{95}\mathrm{Am}$.)
- **Certitude** : certain
- **Effort** : petit

---

### G-07-002 — Exercice 10 SVT (« bac-2026 ») : l'indice de la question 1 contredit l'énoncé dans 50 % des tirages
- **Gravité** : BLOQUANT
- **Où** : `web/src/components/pilote/exercices/expression-genetique.js:537, 579-581` (`/pilote/expression-genetique/exercices`, exercice 10 `bac-2026`, question 1)
- **Constat** : L'exercice tire aléatoirement `const brin = h.pick(["non transcrit", "transcrit"]);` (ligne 537) et adapte l'énoncé (`brin transcrit`, `3′-…-5′` ou `brin non transcrit`, `5′-…-3′`), mais l'indice de la question 1 est codé en dur ligne 581 :
  > `indice: "Le document donne le brin non transcrit : l’ARNm a la même séquence, avec U à la place de T."`
- **Preuve** : Lorsque le tirage sélectionne `brin === "transcrit"` (1 fois sur 2), l'énoncé affiche « *un fragment du **brin transcrit** du gène de P* » (`3′-…-5′`), tandis que l'indice affirme à l'élève que le document donne le **brin non transcrit** et lui recommande de recopier les bases en remplaçant T par U — ce qui le fait tomber exactement dans le piège `pieges1` ligne 569 (*« Tu as recopié le brin transcrit en changeant T en U : l’ARNm est son complémentaire. »*).
- **Proposition** : Conditionner l'indice ligne 581 sur `brin` :
  ```js
  indice: brin === "transcrit"
    ? "Le document donne le brin transcrit : l’ARNm est son complémentaire (U en face de A, A en face de T, C avec G)."
    : "Le document donne le brin non transcrit : l’ARNm a la même séquence, avec U à la place de T.",
  ```
- **Certitude** : certain
- **Effort** : petit

---

### G-07-003 — Exercice 8 SVT (`type-mutation`) : ~21,5 % des délétions et ~21,7 % des insertions ont un numéro de triplet ambigu
- **Gravité** : BLOQUANT
- **Où** : `web/src/components/pilote/exercices/expression-genetique.js:391-414, 446-452` (`/pilote/expression-genetique/exercices`, exercice 8 `type-mutation`, question 2)
- **Constat** : L'exercice affiche un allèle normal et un allèle muté (5 triplets), puis demande : *« Dans quel triplet se trouve la mutation (1 = premier triplet montré) ? »* en n'acceptant qu'une seule valeur numérique `reponse: j + 1`. Or, pour les délétions et les insertions, le générateur ne vérifie pas que la position du triplet muté est **uniquement identifiable** à partir des deux séquences affichées.
- **Preuve** : Une simulation de 10 000 tirages d'indels avec exactement la logique des lignes 391–414 donne :
  - **Délétions** : **1 063 / 4 955 (21,5 %)** produisent exactement la même séquence mutée `m` par suppression d'un nucléotide dans **deux triplets différents** (homopolymère chevauchant la frontière). Exemple concret généré : `s = CGA TCG GTC ACG GCT`, `m = CGA TCG TCA CGG CT` (`k = 6`, `expected = 3`), où supprimer le `G` final du **triplet 2** (`TCG → TC`) et supprimer le `G` initial du **triplet 3** (`GTC → TC`) produisent **caractère pour caractère la même chaîne** `CGATCGTCACGGCT`. Un élève qui répond `2` a biologiquement et mathématiquement raison, mais reçoit une réponse fausse.
  - **Insertions** : **1 093 / 5 045 (21,7 %)** sont strictement indiscernables entre deux triplets par répétition de base à la frontière (exemple : `s = GAG GAC ACT TGC ACT`, `m = GAG GAC CAC TTG CAC T`, insertion de `C` dans le triplet **2** ou au début du triplet **3**), et **2 680 / 5 045 (53,1 %)** tombent à une frontière `p = 0` entre deux triplets où « inséré avant le 1er nucléotide du triplet `j + 1` » est indistinguable de « inséré après le 3e nucléotide du triplet `j` ».
- **Proposition** : Dans la boucle `for (;;)` de `type-mutation` (lignes 393–414) :
  1. Pour une **délétion**, compter tous les triplets distincts `Math.floor(idx / 3)` tels que `s.slice(0, idx) + s.slice(idx + 1) === m` et rejeter le tirage si le cardinal est > 1.
  2. Pour une **insertion**, tirer `p` dans `[1, 2]` (strictement à l'intérieur d'un triplet, jamais à la frontière `p = 0`) et rejeter le tirage si la base insérée est égale à une base voisine permettant d'obtenir la même séquence `m` dans un autre triplet.
- **Certitude** : certain
- **Effort** : petit

---

### G-07-004 — Physique : le diagramme $(N, Z)$ de Segrè (`1.2.1.3` et `1.2.1.4`) est totalement absent de la leçon et des exercices
- **Gravité** : BLOQUANT
- **Où** : `web/src/components/pilote/radioactivite-moteur.js`, `web/src/components/pilote/radioactivite-scenes-*.js`, `web/src/components/pilote/exercices/radioactivite.js`
- **Constat** : Le diagramme $(N, Z)$ de Segrè (vallée de stabilité, zones d'instabilité $\beta^-$, $\beta^+$ et noyaux lourds $\alpha$, lecture d'une désintégration comme déplacement sur le diagramme) n'apparaît nulle part dans la leçon pilote ni dans les 11 exercices.
- **Preuve** :
  - **Cadres officiels 2025** : les capacités `1.2.1.3` (*« Reconnaître les domaines de stabilité et d'instabilité des noyaux sur le diagramme (N, Z) »*) et `1.2.1.4` (*« Exploiter le diagramme (N, Z) »*) figurent dans les **trois** filières (`docs/referentiel/pc-pc.yaml:138-139`, `pc-sm.yaml:139-140`, `pc-svt.yaml:141-142`).
  - **Annales réelles** : au **Bac 2025 session normale (NS28F, Exercice 2, Q1 item C)** (`docs/sujets/pc/decroissance-radioactive.md:183`), le diagramme $(N, Z)$ de Segrè est **l'unique affirmation juste** du QCM (0,5 pt) ; au **Bac 2023 session normale (NS28F, Exercice 2, Q1-1 item B)** (`docs/sujets/pc/decroissance-radioactive.md:113`), l'item porte explicitement sur les domaines $\beta^-$ et noyaux lourds du diagramme $(N, Z)$.
  - **Code** : 0 occurrence de `Segrè` ou `(N, Z)` dans tout le pilote de radioactivité ; les tags `capacites` de `exercices/radioactivite.js` couvrent 12 des 15 capacités de `1.2.1`, omettant `1.2.1.3`, `1.2.1.4` et `1.2.1.5`.
- **Proposition** :
  1. Ajouter une étape courte (1 scène SVG interactive) dans la partie « Écrire la désintégration » montrant la bissectrice $N = Z$, la vallée de stabilité, les 3 domaines ($\beta^-$ au-dessus, $\beta^+$ au-dessous, $\alpha$ pour $Z > 82$) et les vecteurs de déplacement $(\Delta Z, \Delta N) = (+1, -1)$ pour $\beta^-$, $(-1, +1)$ pour $\beta^+$, $(-2, -2)$ pour $\alpha$.
  2. Ajouter un 12e exercice dans `exercices/radioactivite.js` couvrant `1.2.1.3` et `1.2.1.4` (lecture d'un extrait de diagramme $(N, Z)$ : identifier un isotope, le type de désintégration ou le noyau fils).
- **Certitude** : certain
- **Effort** : moyen

---

### G-07-005 — Maths : les exercices 13 et 14 (et 10) exigent une valeur décimale de $\ln a$ ou $\log m$ sans la fournir (incompatible avec la filière SM sans calculatrice)
- **Gravité** : IMPORTANT
- **Où** : `web/src/components/pilote/exercices/logarithme.js:521-528` (Ex. 10), `:636-645` (Ex. 13), `:687-705` (Ex. 14)
- **Constat** :
  - Exercice 13 (`ln-tangente`, Q b, ligne 641) : demande l'ordonnée à l'origine $\ln a - 1$ « à $0{,}01$ près » pour $a \in \{2, 3, 4, 5\}$ sans donner la valeur approchée de $\ln a$.
  - Exercice 14 (`ln-etude`, Q d, ligne 700) : demande le minimum $1 + \ln a$ « à $0{,}01$ près » pour $a \in \{1, 2, 3\}$ sans donner $\ln 2$ ni $\ln 3$.
  - Exercice 10 (`log-decimal`, PC/SVT, ligne 525) : demande $x = \log m + k$ « à $0{,}01$ près » pour $m \in \{2, 3, 5\}$ sans fournir $\log m$ (ni indiquer qu'une calculatrice est attendue).
- **Preuve** :
  - Au bac marocain, la filière **Sciences Mathématiques** (explicitement affichée `SM · PC · SVT` dans l'en-tête du pilote) compose **sans calculatrice** (`docs/bible/01-maths.md:15`).
  - Les exercices 1, 2 et 3 du même fichier (`exercices/logarithme.js`) prennent bien soin de fournir les valeurs approchées de $\ln 2, \ln 3, \ln 5$ dans l'énoncé ; les exercices 10, 13 et 14 ne le font pas.
  - Dans les annales réelles (`docs/sujets/maths/fonction-logarithme.md`, 2019–2024), toute valeur approchée nécessaire (ex. $\ln 2 \approx 0{,}69$) est donnée dans l'énoncé, ou la question attend la valeur exacte.
- **Proposition** : Ajouter dans l'énoncé de l'ex. 13 et de l'ex. 14 (quand $a > 1$) la donnée explicite « *On donne $\ln a \approx \dots$* » (ou poser la Q b / Q d en QCM symbolique avec la valeur exacte $\ln a - 1$ et $1 + \ln a$, plus fidèle au bac SM). Pour l'ex. 10 (PC/SVT), ajouter « *On donne $\log m \approx \dots$* » afin qu'un élève sur téléphone puisse aussi le résoudre sans quitter l'application.
- **Certitude** : certain
- **Effort** : petit

---

### G-07-006 — Maths, exercice 14 (`ln-etude`, « au format bac ») : ni limite en $+\infty$, ni croissances comparées, ni branche infinie
- **Gravité** : IMPORTANT
- **Où** : `web/src/components/pilote/exercices/logarithme.js:659-716` (`/pilote/logarithme/exercices`, exercice 14 `ln-etude`)
- **Constat** : L'exercice 14 est intitulé *« Une étude de fonction au format bac »* et déclare `capacites: ["maths-sexp 1.2.22", "maths-sexp 1.2.19", "maths-sexp 1.2.7"]` et `erreurs: [..., "croissances comparées à l’envers", ...]`. Or la fonction étudiée est $f(x) = ax - \ln x$, et :
  1. La seule limite demandée (Q a, ligne 689) est $\lim_{x \to 0^+} f(x)$, qui est directe ($0 + \infty$) et ne mobilise **aucune croissance comparée** (`1.2.19`).
  2. La limite en $+\infty$ (qui demande de factoriser $x(a - \frac{\ln x}{x})$) n'est jamais posée.
  3. Aucune **interprétation géométrique** (asymptote verticale d'équation $x = 0$, branche parabolique en $+\infty$) n'est demandée.
- **Preuve** :
  - Cadres 2025 : `maths-sexp 1.2.22` et `maths-sm 1.3.16` exigent explicitement les *« branches infinies »* dans l'étude de fonctions.
  - Annales réelles (`docs/sujets/maths/fonction-logarithme.md`) : **4 sujets sur 4** (2019 N, 2021 N, 2023 N, 2024 N) commencent systématiquement par les limites aux deux bornes ($0^+$ et $+\infty$ avec croissance comparée) suivies de l'interprétation géométrique (asymptote verticale $x=0$ et branche infinie en $+\infty$).
- **Proposition** : Ajouter deux questions QCM courtes à l'exercice 14 :
  1. Juste après Q a : $\lim_{x\to+\infty} f(x)$ (avec la factorisation par $x$ et le piège « croissances comparées à l'envers » qui est déjà déclaré dans `erreurs` ligne 664 !).
  2. Une question d'interprétation géométrique : « *De $\lim_{x\to 0^+} f(x) = +\infty$, on déduit que la courbe $\mathcal{C}_f$ admet…* » (asymptote verticale d'équation $x = 0$, contre asymptote horizontale $y = 0$).
- **Certitude** : certain
- **Effort** : petit

---

### G-07-007 — Maths : trois capacités explicites des cadres `maths-sexp` / `maths-sm` (et promises en séance 2) absentes des 14 exercices
- **Gravité** : IMPORTANT
- **Où** : `web/src/components/pilote/exercices/logarithme.js:504-718` et `web/src/components/pilote/logarithme-moteur.js:999`
- **Constat** : Quatre éléments explicitement présents dans le cadre officiel 2025 ou annoncés par le pilote comme appartenant à la séance 2 manquent dans les exercices :
  1. **Systèmes logarithmiques** : `maths-sexp 1.2.17` et `maths-sm 1.3.10` (*« résolution des équations, des inéquations et des **systèmes** logarithmiques »*) → **0 exercice** sur 14.
  2. **Inéquations décimales $10^x \le a$ ou $10^x \ge a$** : explicitement citées dans `maths-sexp 1.2.18` (*« en particulier pour résoudre des équations du type $10^x = a$ et des inéquations du type $10^x \le a$ ou $10^x \ge a$ »*) → l'ex. 10 (`log-decimal`, lignes 508–542) ne tire que l'équation $10^x = m \cdot 10^k$.
  3. **Primitives de $u'/u$ (et dérivée de $\ln|u|$)** : annoncées en fin de leçon (`logarithme-moteur.js:999` : *« la dérivée de ln u et les primitives de u'/u »*, et ligne 1003 : *« Ses exercices sont déjà prêts »*) et requises par `maths-sexp 1.2.15` / `maths-sm 1.3.8` → **0 exercice** dans la section séance 2 (Ex. 10–14).
  4. **Limite de référence $\lim_{x \to 0}\frac{\ln(1+x)}{x} = 1$** : absente du pool de l'ex. 11 (`exercices/logarithme.js:554-559`), alors qu'elle fait partie des limites usuelles du programme (`docs/bible/01-maths.md:356`).
- **Preuve** : Comparaison directe de `docs/referentiel/maths-sexp.yaml:59-63` et `maths-sm.yaml:62-65` avec les 14 générateurs de `exercices/logarithme.js`.
- **Proposition** :
  - Ajouter $\lim_{x\to 0}\frac{\ln(1+x)}{x} = 1$ au pool de l'ex. 11 (1 ligne).
  - Varier l'ex. 10 entre équation $10^x = A$ et inéquation $10^x \le A$ ou $10^x \ge A$ (comme en chimie/pH).
  - Ajouter 2 exercices à la séance 2 : un système simple à deux inconnues (type $\ln x + \ln y = a$, $\ln x - \ln y = b$) et une recherche de primitive de $u'/u$ sur un intervalle donné (avec la remarque $\ln|u|$).
- **Certitude** : certain
- **Effort** : moyen

---

### G-07-008 — Maths, exercices 12, 13 et 14 : l'indice d'une question divulgue la réponse de la question précédente
- **Gravité** : IMPORTANT
- **Où** : `web/src/components/pilote/exercices/logarithme.js:605` (Ex. 12 Q b), `:644` (Ex. 13 Q b), `:703` (Ex. 14 Q d)
- **Constat** : Toutes les questions d'un exercice étant affichées ensemble sur la page, l'indice de la question suivante contient littéralement la réponse de la question précédente :
  - Ex. 12 Q a demande $f'(x)$ (QCM) ; l'indice de Q b (`:605`) écrit : *« Remplace $x$ par $x_0$ dans $\dfrac{2ax}{ax^2+b}$. »*
  - Ex. 13 Q a demande l'équation de la tangente $T$ (QCM) ; l'indice de Q b (`:644`) écrit : *« Développe $y = \frac{1}{a}(x - a) + \ln a$ et lis le terme constant. »*
  - Ex. 14 Q c demande l'abscisse du minimum ($1/a$) ; l'indice de Q d (`:703`) écrit : *« Calcule $f(\frac{1}{a}) = 1 - \ln\frac{1}{a}$… »*
- **Preuve** : Lecture directe des lignes 605, 644 et 703 de `exercices/logarithme.js` sur `0fadbe11` et vérification de `ExercicesPilote.tsx` (qui affiche le bouton « Indice » de chaque question libre indépendamment de la résolution des questions précédentes).
- **Proposition** : Formuler ces trois indices sans divulguer la réponse précédente :
  - Ex. 12 Q b : *« Remplace $x$ par $x_0$ dans l'expression de $f'(x) = u'(x)/u(x)$ trouvée à la question précédente. »*
  - Ex. 13 Q b : *« Dans l'équation réduite $y = mx + p$ trouvée à la question précédente, l'ordonnée à l'origine est le terme constant $p$. »*
  - Ex. 14 Q d : *« Remplace $x$ par l'abscisse $x_0$ trouvée à la question précédente dans $f(x) = ax - \ln x$, puis utilise $\ln(1/a) = -\ln a$. »*
- **Certitude** : certain
- **Effort** : petit

---

### G-07-009 — Physique : `1.2.1.14` (analyse dimensionnelle) taguée sans question, `1.2.1.5` non exercée, et état excité $Y^*$ absent de l'émission $\gamma$
- **Gravité** : IMPORTANT
- **Où** : `web/src/components/pilote/exercices/radioactivite.js:270-300` (Ex. 5), `web/src/components/pilote/radioactivite-moteur.js:212-217` (étape `gamma`)
- **Constat** : Trois écarts précis par rapport au cadre `pc-pc 1.2.1` :
  1. **Capacité `1.2.1.14`** (*« Utiliser l'équation aux dimensions pour déterminer les unités de $\lambda$ et $\tau$ »*) : l'exercice 5 (`lambda-unites`) porte le tag `"pc-pc 1.2.1.14"` ligne 273, mais ses trois questions sont uniquement des calculs numériques ($t_{1/2}$ en s, $\lambda$, $\tau$). L'équation aux dimensions n'apparaît que dans une remarque de la correction (ligne 296 : `[\lambda]\times[t]=1`), jamais en question active.
  2. **Capacité `1.2.1.5`** (*« Définir un noyau radioactif »* — instable, se désintégrant spontanément et aléatoirement en un noyau fils plus stable avec émission d'une particule) : absente des 11 exercices.
  3. **Émission $\gamma$ (`1.2.1.7`)** : `radioactivite-moteur.js:217` écrit l'équation globale ${}^{192}_{77}\mathrm{Ir} \to {}^{192}_{78}\mathrm{Pt} + {}^{0}_{-1}\mathrm{e} + \gamma$ sans montrer la notation standard du programme marocain avec le noyau fils **excité** : ${}^{192}_{78}\mathrm{Pt}^* \to {}^{192}_{78}\mathrm{Pt} + \gamma$.
- **Preuve** : `docs/referentiel/pc-pc.yaml:140, 142, 149` (`1.2.1.5`, `1.2.1.7`, `1.2.1.14`) et lecture de `exercices/radioactivite.js:270-300` et `radioactivite-moteur.js:212-217`.
- **Proposition** :
  - Ajouter à l'ex. 5 une question QCM courte sur l'analyse dimensionnelle de $\lambda t$ (sans dimension $\Rightarrow [\lambda] = T^{-1}$ et $[\tau] = T$) pour honorer réellement le tag `1.2.1.14`.
  - Mentionner en deux lignes dans `radioactivite-moteur.js:217` la désexcitation ${}^{192}_{78}\mathrm{Pt}^* \to {}^{192}_{78}\mathrm{Pt} + \gamma$ (avec l'astérisque de l'état excité).
  - Intégrer la définition d'un noyau radioactif (`1.2.1.5`) en QCM dans l'ex. 1 ou dans un nouvel exercice Partie I / diagramme $(N, Z)$.
- **Certitude** : certain
- **Effort** : petit

---

### G-07-010 — SVT : la capacité `2.2.4` (schéma de synthèse) est annoncée en en-tête des exercices mais absente des 10 exercices
- **Gravité** : IMPORTANT
- **Où** : `web/src/components/pilote/exercices/expression-genetique.js:4` et ensemble des 10 exercices (`:51-596`)
- **Constat** : L'en-tête du fichier déclare ligne 4 : `Capacités : svt-svt / svt-pc 2.1.8, 2.1.9, 2.2.1–2.2.4`. Pourtant, l'audit des tags `capacites` montre que les 10 exercices couvrent uniquement `2.1.8`, `2.1.9`, `2.2.1`, `2.2.2`, `2.2.3` : **`2.2.4` n'apparaît nulle part** (`0` exercice).
- **Preuve** : `docs/referentiel/svt-svt.yaml:196` et `svt-pc.yaml:184` définissent `2.2.4` : *« Construire un schéma résumant les étapes de synthèse des protéines. »* Cette capacité est bien travaillée dans la leçon (`cle: 'schema'`, `expression-genetique-moteur.js:320-322`), mais un élève qui révise par la page d'exercices n'a aucun entraînement sur le schéma bilan (légendes, localisation noyau/cytoplasme, sens 5′→3′, appariement des acteurs), pourtant classique de Partie I.
- **Proposition** : Ajouter un exercice léger de Partie I (avec figure SVG du schéma de synthèse numéroté 1 à 6, reprenant le format « Recopiez les couples (1,…) » du bac SVT) tagué `CAP("2.2.4")`, ou a minima corriger le commentaire ligne 4 si le schéma reste uniquement dans la leçon.
- **Certitude** : certain
- **Effort** : moyen (exercice SVG) / petit (commentaire seul)

---

### G-07-011 — Étiquetage `capacites` incomplet pour les filières secondaires en Physique (`pc-sm`, `pc-svt`) et Maths (`maths-sm` séance 2)
- **Gravité** : MINEUR
- **Où** : `web/src/components/pilote/exercices/radioactivite.js:120-505` et `web/src/components/pilote/exercices/logarithme.js:583, 625, 663`
- **Constat** :
  - `exercices/radioactivite.js` ne tague que `pc-pc 1.2.1.*` sur ses 11 exercices, omettant `pc-sm 1.2.1.*` et `pc-svt 1.2.1.*`, alors que les 15 identifiants de `1.2.1` sont rigoureusement identiques dans les trois filières et que `exercices/expression-genetique.js:15` utilise un helper `CAP(...)` qui émet bien les deux filières (`svt-svt` et `svt-pc`).
  - `exercices/logarithme.js` tague `maths-sm` sur les exercices 1–9 et 11, mais l'omet sur les exercices 12 (`ln-derivee`, `:583`), 13 (`ln-tangente`, `:625`) et 14 (`ln-etude`, `:663`), qui relèvent aussi de `maths-sm 1.3.16` (et `1.3.11` pour l'ex. 14).
- **Preuve** : Extraction automatisée des tableaux `capacites` sur `0fadbe11` comparée à `docs/referentiel/pc-sm.yaml`, `pc-svt.yaml` et `maths-sm.yaml`.
- **Proposition** : Utiliser un helper `CAP(...)` en Physique (émettant `pc-pc`, `pc-sm`, `pc-svt`) comme en SVT, et ajouter `maths-sm 1.3.16` (et `1.3.11`) aux exercices 12, 13 et 14 de Maths.
- **Certitude** : certain
- **Effort** : petit

---

### G-07-012 — Maths, exercice 11 (`ln-limites`) : affichage `x^{1}` quand `n = 1`
- **Gravité** : MINEUR
- **Où** : `web/src/components/pilote/exercices/logarithme.js:553-556`
- **Constat** : Le générateur tire `const n = h.int(1, 3)` et insère systématiquement `x^{${n}}` dans les deux premières limites du pool et `x^${n}` dans les feedbacks. Quand `n === 1` (1 tirage sur 3), l'énoncé affiche $\lim_{x\to+\infty}\frac{\ln x}{x^1}$ ou $\lim_{x\to 0^+} x^1 \ln x$.
- **Preuve** : Lecture directe de `exercices/logarithme.js:553-556` sur `0fadbe11` (alors que la ligne 557 utilise bien `coef(n)` pour éviter `1x`).
- **Proposition** : Définir `const xn = n === 1 ? "x" : \`x^{${n}}\`;` et l'utiliser aux lignes 555 et 556 (énoncé et feedbacks).
- **Certitude** : certain
- **Effort** : petit

---

## Partie 2 — Avis (fidélité pédagogique et format d'examen)

Les points suivants relèvent de choix pédagogiques ou d'alignement fin avec les habitudes d'examen : il ne s'agit pas d'erreurs scientifiques, mais d'améliorations que nous jugeons utiles.

### G-07-013 — SVT : expliciter l'orientation `3′→5′` de l'anticodon dans la leçon et le glossaire, comme le fait déjà l'exercice 6
- **Gravité** : IMPORTANT (avis)
- **Où** : `web/src/components/pilote/expression-genetique-moteur.js:310, 324, 490`, `web/src/components/pilote/expression-genetique-mots.js:196`, `web/src/components/pilote/expression-genetique-scenes-b.js:297`
- **Constat** : Dans la leçon, le glossaire et la légende du ribosome, l'anticodon est écrit sans polarité (`anticodon UAC` face à `AUG`, `anticodon CAC` face à `GUG`), avec la précision verbale *« écrit sous le codon, base en face de base »*. En revanche, l'exercice 6 (`exercices/expression-genetique.js:307`) écrit rigoureusement `3′-${ac}-5′` et teste explicitement le piège de l'inversion de lecture.
- **Preuve** : En biologie moléculaire, une séquence d'ARN écrite sans polarité est par convention lue de `5′` vers `3′` (donc l'anticodon de `5′-AUG-3′` s'écrit `3′-UAC-5′` ou `5′-CAU-3′`). Sans repère `3′`/`5′` dans la leçon, un élève qui rencontre un sujet ou un manuel notant un anticodon en `5′→3′` risque de complémenter sans inverser.
- **Proposition** : Afficher `3′-UAC-5′` (et `3′-CAC-5′`, `3′-${anticodon(c)}-5′`) dans le texte de la leçon, sur le schéma du ribosome et dans la fiche glossaire `anticodon`, en parfaite cohérence avec l'exercice 6.
- **Certitude** : probable
- **Effort** : petit

---

### G-07-014 — SVT, exercice 10 (`bac-2026`) : inclure aussi les délétions et insertions dans le tirage de l'exercice complet
- **Gravité** : MINEUR (avis)
- **Où** : `web/src/components/pilote/exercices/expression-genetique.js:536`
- **Constat** : L'exercice complet au format bac ne tire que `const genre = h.pick(["non-sens", "faux-sens"]);` — jamais de délétion ni d'insertion (décalage du cadre de lecture).
- **Preuve** : `docs/bible/04-svt.md:482-483` rappelle que l'exercice « maladie – protéine – gène » du bac SVT porte sur les trois mécanismes (*substitution, délétion, insertion*) et leurs conséquences (*faux-sens, non-sens, décalage du cadre de lecture*).
- **Proposition** : Ajouter `"délétion"` (et éventuellement `"insertion"`, en respectant le filtre anti-ambiguïté de `G-07-003`) au pool de l'exercice 10, afin que l'exercice complet entraîne aussi le décalage du cadre de lecture en contexte de sujet bac.
- **Certitude** : probable
- **Effort** : moyen

---

### G-07-015 — Physique, exercice 11 (`bac-complet`) : demander au moins une expression littérale pour honorer la consigne imprimée du bac
- **Gravité** : MINEUR (avis)
- **Où** : `web/src/components/pilote/exercices/radioactivite.js:523-536`
- **Constat** : L'énoncé de l'exercice complet imprime fidèlement la consigne officielle du bac PC : *« On donnera les expressions littérales avant les applications numériques. »* (ligne 523), mais ses 5 questions sont toutes purement numériques (aucune vérification de l'expression littérale, contrairement à l'exercice 7 `instant-seuil` qui pose d'abord un QCM d'expression littérale avant le calcul).
- **Preuve** : `radioactivite-outils.js:47-49` et `docs/sujets/pc/decroissance-radioactive.md` montrent que dans les barèmes officiels PC, l'expression littérale rapporte la moitié des points d'une question de calcul.
- **Proposition** : Insérer un QCM d'expression littérale avant la question 3 ($N_0 = \frac{a_0\,t_{1/2}}{\ln 2}$) ou la question 4 ($t_1 = \frac{t_{1/2}}{\ln 2}\ln\frac{1}{1-p}$), sur le modèle réussi de l'exercice 7.
- **Certitude** : probable
- **Effort** : petit
