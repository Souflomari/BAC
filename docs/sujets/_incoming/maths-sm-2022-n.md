# Examen national Mathématiques — SM — 2022, session NORMALE (NS 24F) — exercice 1

> **Fichier d'entrée (`_incoming`).** Protocole
> `docs/sujets/maths/README.md`. Rien d'ici ne peut devenir une entrée de
> banque avant qu'un vérificateur **indépendant, qui re-fetche le scan
> lui-même**, ait marqué l'exercice `Statut: vérifié`.
>
> **Exercice 1 VÉRIFIÉ — passe adversariale du 2026-08-27.** Re-fetch
> indépendant de `element/136604`, URLs d'images **re-dérivées depuis le
> HTML** (`course-436/upload-84506/0001`–`0005-big.jpg`, 1240×1754 chacune),
> et re-lecture des pages 1, 2, 3 (et 4 pour un contrôle croisé) **sur
> l'image**, avec zooms 4× à 20× et mesures de gabarit de glyphes. Les cinq
> parties ont été **re-dérivées mathématiquement** de bout en bout ; toutes
> tombent juste. **Un défaut a été trouvé et corrigé** — la table de
> correspondance des glyphes lisait le symbole de la partie E comme un `D`
> latin alors que le scan porte un **Δ** (voir la correction en tête de
> partie E). Le détail complet est dans **« Ce que la vérification a
> trouvé »** en fin de fichier.
>
> **⚠️ CE SUJET EST LE PLUS RISQUÉ DES QUATRE TRANSCRITS CETTE NUIT.** Son
> scan souffre d'une substitution de police massive (voir la note de lecture
> ci-dessous) : presque **tous** les symboles mathématiques non alphabétiques
> y sont remplacés par des caractères d'une autre police. Chaque occurrence a
> dû être adjugée. La vérification a été proportionnellement plus lente et
> plus méfiante ici que sur les sujets 2024 et 2025.
>
> **Portée volontairement partielle.** Ce fichier ne transcrit que
> l'**exercice 1** (le problème d'analyse, 10 pts). Les exercices 2, 3 et 4
> sont **déjà en banque** — `bk-2022-n-x2` de `nombres-complexes-2`,
> `bk-2022-n-x3` de `arithmetique`, `bk-2022-n-x4` de
> `structures-algebriques` — et ne doivent surtout pas être reconvertis :
> l'assemblage d'épreuves somme les `bareme_total`, un doublon fausserait
> le /20.

## Pourquoi ce sujet

L'épreuve **SM 2022 session normale** est assemblée à **10,00/20** dans
Examens blancs. Cet exercice vaut exactement les 10 points qui manquent.
Quatrième pièce du gisement SM.

## En-tête du scan (relu)

- الامتحان الوطني الموحد للبكالوريا — **الدورة العادية 2022** — الموضوع
- Code sujet **NS 24F** · مادة : الرياضيات
- مسلك العلوم الرياضية — أ و ب — خيار فرنسية
- Source : https://www.alloschool.com/element/136604
- Images : `.../course-436/upload-84506/000{1..5}-big.jpg` (5 pages)
- L'exercice 1 occupe les pages 2 et 3 (paginées « 2/5 » et « 3/5 »).

## ⚠️ NOTE DE LECTURE — substitution de police massive

Ce scan a été produit à partir d'un document dont les polices de symboles
n'ont pas été incorporées. Le résultat est une substitution **systématique**,
et non intermittente comme sur les sujets 2023. **Aucun glyphe ne se lit pour
ce qu'il montre.**

> **Le mécanisme, identifié par le vérificateur.** La substitution n'est pas
> arbitraire : c'est la police **Symbol** rendue avec une police latine **au
> même code de caractère**. Chaque ligne de la table ci-dessous se vérifie
> alors sur la table Symbol, et non plus seulement « par la logique de
> l'exercice » : `"`=0x22→$\forall$, `¢`=0xA2→$'$, `£`=0xA3→$\le$,
> `¥`=0xA5→$\infty$, `a`=0x61→$\alpha$, `®`=0xAE→$\to$, `Î`=0xCE→$\in$,
> `å`=0xE5→$\sum$, `ò`=0xF2→$\int$, `æ ç è ö ÷ ø`=0xE6/E7/E8/F6/F7/F8→les six
> fragments de parenthèse extensible, `é ù`=0xE9/F9→les fragments de crochet
> (visibles dans l'exercice 2). **Dix-sept glyphes concordants (9 symboles isolés + 6
> fragments de parenthèse + 2 de crochet) : le décodage est établi, pas
> deviné.** Deuxième signature, indépendante : un caractère
> substitué sort **en romain droit**, alors que toute lettre latine réellement
> variable de ce sujet est en **italique**. Preuve sur pièce, page 4 : la
> transformation $\varphi$ de l'exercice 2 s'affiche « j » **droit** à deux
> lignes du nombre complexe $j$ en **italique**.
>
> Conséquence directe : `D`=0x44→$\Delta$. Voir la correction en partie E.

Table de correspondance, **contrôlée glyphe par glyphe sur le scan** par le
vérificateur (colonne « adjudication » réécrite là où elle était fausse ou
imprécise) :

| Rendu à l'écran | Lu comme | Base de l'adjudication |
|---|---|---|
| `"` | $\forall$ | Symbol 0x22. Position en tête de quantificateur, systématique |
| `Î` | $\in$ | Symbol 0xCE. Toujours entre une variable et un ensemble |
| `¡` | $\mathbb{R}$ | **Pas Symbol** (Symbol 0xA1 = ϒ) : vient de la police *blackboard-bold* du document. Dans « $\forall x \in$ ¡$^+$ », et l'exercice porte sur des réels positifs |
| `¥` | $\mathbb{N}$ ou $+\infty$ | **Deux valeurs distinctes !** $+\infty$ = Symbol 0xA5 ; le $\mathbb{N}$, lui, vient de la **seconde** police du document, celle des lettres ajourées (la même que `¡`=$\mathbb{R}$), qui porte elle aussi un caractère au code 0xA5. **Deux polices, un même code** : un seul glyphe rendu pour deux sens. *Ce qui est mesuré* : les deux rôles rendent bien le même glyphe (corrélation 0,90) ; *ce qui est proposé* : l'explication par la seconde police. Vérifié : **18 occurrences, 5 en $+\infty$, 13 en $\mathbb{N}$/$\mathbb{N}^*$** — liste exhaustive en fin de fichier |
| `£` | $\le$ | Symbol 0xA3. Toujours dans des encadrements |
| `®` | $\to$ | Symbol 0xAE. Dans « $x$ ® $+$¥ » sous un `lim` |
| `¢` | $'$ (prime) | Symbol 0xA2. Dans « $f$¢$(x)$ » et « $F$¢$(x)$ » |
| `a` | $\alpha$ | Symbol 0x61. Rendu **droit**, là où le $f$ voisin est italique — signature de la substitution |
| `p,+¥ [` | $]0,+\infty[$ | **Précision du vérificateur** : le « `p` » n'est pas un crochet seul, c'est le crochet `]` **et le chiffre `0`** qui se chevauchent (crénage). Le zéro est bien là ; l'intervalle est $]0,+\infty[$, pas $],+\infty[$ |
| `ò` | $\int$ | Symbol 0xF2. Signe d'intégrale |
| `å` | $\sum$ | Symbol 0xE5. Signe de somme |
| `æ ö ç ÷ è ø` | grandes parenthèses | Symbol 0xE6/F6/E7/F7/E8/F8 : les six fragments d'une parenthèse extensible ; le contenu est entre elles |
| `1` (isolé, E-2c) | $\ell$ | **Ce n'est pas un glyphe substitué** : c'est la **lettre `l` minuscule**, en romain droit, mesurée au pixel (voir fin de fichier). Rendue $\ell$ ici pour la lisibilité ; le scan porte un `l` ordinaire |
| `D` (E) | $\Delta_k$ | **CORRIGÉ par le vérificateur.** Symbol 0x44 = $\Delta$. Le glyphe est **droit** là où le $S_n$ de la même formule est italique, et il est **identique au pixel près** au `D` du discriminant de l'exercice 2. Ce n'est pas une lettre latine |
| `D` (ex. 2) | $\Delta$ | Symbol 0x44, discriminant. Lecture déjà confirmée par la passe adversariale de `bk-2022-n-x2` |

**Deux pièges spécifiques à ce scan, contrôlés en priorité par le
vérificateur :**

1. **Le glyphe `¥` a DEUX significations** selon le contexte ($\mathbb{N}$ ou
   $+\infty$). Toute lecture qui les confond casse un quantificateur ou une
   borne. — **Contrôlé : les 18 occurrences sont justes**, aucune confusion.
2. **En D-2a, le « l » de « ln » chevauche** le glyphe de parenthèse
   extensible.
   > **Rectification du vérificateur.** Le transcripteur écrivait que le
   > « l » avait été **absorbé** (scan affichant « …$\big)$$n(1+x)$ »). C'est
   > inexact : **au zoom 8×, le `l` est présent et lisible** — il est
   > simplement *superposé* au fragment `÷` de la parenthèse extensible, ce
   > qui le noie à taille normale mais ne le supprime pas. La **lecture
   > transcrite est bonne**, seule la description du défaut était fausse.
   > Double contrôle refait indépendamment : (i) à $x = 1$,
   > $F(1) = \int_1^1 f = 0$ et l'expression donne $2\ln 2 - 2\ln 2 = 0$ ✔ ;
   > (ii) l'intégration par parties a été refaite en entier et redonne
   > exactement $2\ln 2 - \left(1+\frac1x\right)\ln(1+x)$ (détail en fin de
   > fichier).

Aucune **valeur numérique** n'est touchée par la substitution — seuls les
symboles le sont. *Vérifié : tous les nombres imprimés (barèmes, bornes,
exposants, dénominateurs) ont été relus sur l'image.*

---

## 2022 — session normale — Exercice 1
Source: https://www.alloschool.com/element/136604
Statut: vérifié — re-fetch indépendant + re-dérivation (vérificateur adversarial, 2026-08-27)

- Filière / épreuve : Sciences Mathématiques (A) et (B), option française — Mathématiques, 4 h, coef 9
- Code sujet : NS 24F · Barème de l'exercice : **10 points**
- Recompte question par question, relevé dans la marge du scan :
  A $= 0{,}25+0{,}25 = 0{,}5$ ·
  B-1 $= 0{,}5 \times 3 = 1{,}5$ ·
  B-2 $= 0{,}5+0{,}5+0{,}25+0{,}25 = 1{,}5$ ·
  B-3 $= 0{,}25+0{,}5 = 0{,}75$ ·
  C-1 $= 0{,}5$ ·
  C-2 $= 0{,}5+0{,}5+0{,}5+0{,}25 = 1{,}75$ ·
  D-1 $= 0{,}5$ ·
  D-2 $= 0{,}5+0{,}5+0{,}5 = 1{,}5$ ·
  E-1 $= 0{,}25+0{,}5 = 0{,}75$ ·
  E-2 $= 0{,}25+0{,}25+0{,}25 = 0{,}75$ —
  total $= \mathbf{10}$ ✔
- Images lues : `.../0002-big.jpg` (parties A, B, début de C), `.../0003-big.jpg` (fin de C, D, E)
- Aucune figure n'est imprimée : la question B-3-b demande au candidat de **représenter** la courbe.

**EXERCICE 1 (10 points)**

**A**

1. *(0,25)* Vérifier que : $\left(\forall x \in \mathbb{R}^{+}\right)\ ;\quad 0 \le 1 - x + x^2 - \dfrac{1}{x+1} \le x^3$

2. *(0,25)* En déduire que : $\left(\forall x \in \mathbb{R}^{+}\right)\ ;\quad 0 \le x - \dfrac{x^2}{2} + \dfrac{x^3}{3} - \ln(1+x) \le \dfrac{x^4}{4}$

**B** — On considère la fonction $f$ définie sur $I = [0, +\infty[$ par :

$$f(0) = \frac{1}{2} \qquad \text{et pour tout } x \text{ de } ]0, +\infty[\ ;\quad f(x) = \frac{x - \ln(1+x)}{x^2}$$

et soit $(C)$ sa courbe représentative dans un repère orthonormé $(O\,; \vec{i}, \vec{j})$.

1. **a)** *(0,5)* Montrer que $f$ est continue à droite en $0$.

   **b)** *(0,5)* Montrer que $f$ est dérivable à droite en $0$.

   **c)** *(0,5)* Calculer $\displaystyle\lim_{x \to +\infty} f(x)$, puis interpréter graphiquement le résultat obtenu.

2. **a)** *(0,5)* Montrer que : $\left(\forall x \in\, ]0, +\infty[\right)\ ;\quad f'(x) = -\dfrac{g(x)}{x^3}$

   où $g(x) = x + \dfrac{x}{x+1} - 2\ln(1+x)$

   **b)** *(0,5)* Montrer que : $\left(\forall x \in I\right)\ ;\quad 0 \le g'(x) \le x^2$

   **c)** *(0,25)* En déduire que : $\left(\forall x \in I\right)\ ;\quad 0 \le g(x) \le \dfrac{x^3}{3}$

   **d)** *(0,25)* Déterminer le sens de variation de $f$ sur $I$.

3. **a)** *(0,25)* Dresser le tableau de variation de $f$.

   **b)** *(0,5)* Représenter graphiquement la courbe $(C)$ dans le repère $(O\,;\vec{i}, \vec{j})$. *(On prendra $\|\vec{i}\| = 2\,cm$ et $\|\vec{j}\| = 2\,cm$)*

**C**

1. *(0,5)* Montrer qu'il existe un unique réel $\alpha \in\, ]0\,;1[$ tel que $f(\alpha) = \alpha$.

2. On considère la suite $(u_n)_{n \in \mathbb{N}}$ définie par :

   $$u_0 = \frac{1}{3} \qquad \text{et} \qquad \left(\forall n \in \mathbb{N}\right)\ ;\quad u_{n+1} = f(u_n)$$

   **a)** *(0,5)* Montrer que : $\left(\forall n \in \mathbb{N}\right)\ ;\quad u_n \in [0\,;1]$

   **b)** *(0,5)* Montrer que : $\left(\forall n \in \mathbb{N}\right)\ ;\quad |u_{n+1} - \alpha| \le \dfrac{1}{3}|u_n - \alpha|$

   **c)** *(0,5)* Montrer par récurrence que : $\left(\forall n \in \mathbb{N}\right)\ ;\quad |u_n - \alpha| \le \left(\dfrac{1}{3}\right)^{n}$

   **d)** *(0,25)* En déduire que la suite $(u_n)_{n \in \mathbb{N}}$ converge vers $\alpha$.

**D** — Pour tout $x \in I$, on pose : $F(x) = \displaystyle\int_x^{1} f(t)\,dt$

1. *(0,5)* Montrer que la fonction $F$ est dérivable sur $I$ et calculer $F'(x)$ pour tout $x \in I$.

2. **a)** *(0,5)* En utilisant la méthode d'intégration par parties, montrer que :

   $$\left(\forall x \in\, ]0, +\infty[\right)\ ;\quad F(x) = 2\ln 2 - \left(1 + \frac{1}{x}\right)\ln(1+x)$$

   **b)** *(0,5)* Calculer $\displaystyle\lim_{x \to 0^{+}} F(x)$, puis en déduire que : $\displaystyle\int_0^{1} f(t)\,dt = 2\ln 2 - 1$

   **c)** *(0,5)* Calculer, en $cm^2$, l'aire du domaine plan limité par la courbe $(C)$, l'axe des abscisses, l'axe des ordonnées et la droite d'équation $x = 1$.

> **Correction du vérificateur — partie E, le symbole indexé.** Le
> transcripteur lisait **$D_k$** (« lettre latine, pas $\Delta$ », dit sa
> table de glyphes). **C'est faux : le scan porte $\Delta_k$.** Trois mesures
> indépendantes, toutes faites sur l'image :
> 1. **Décodage.** La substitution de ce scan est la police **Symbol** rendue
>    au même code par une police latine (dix-sept glyphes concordants, voir la
>    note de lecture). **Symbol 0x44 = $\Delta$.**
> 2. **Droit contre italique.** Dans la formule
>    $S_n = \sum_{k=0}^{k=n-1} \Delta_k$, le $S$ et le $n$ sont **italiques**
>    (variables latines) et le glyphe indexé est **romain droit** — la
>    signature d'un caractère substitué. Même contraste page 4 : la
>    transformation $\varphi$ de l'exercice 2 sort « j » droit, le nombre
>    complexe $j$ sort italique.
> 3. **Identité au pixel.** Le glyphe de la partie E et le glyphe du
>    discriminant de l'exercice 2 (p. 3), recadrés au plus juste, mesurent
>    **19×20 px tous les deux** et diffèrent d'une moyenne de **0,09/255**
>    par pixel : c'est **le même caractère**. Or celui de l'exercice 2 est le
>    discriminant, lu $\Delta$ par la passe adversariale de `bk-2022-n-x2`.
>
> **Portée** : la correction est **purement notationnelle** — la question,
> les bornes et la démonstration sont identiques dans les deux lectures.
> Elle est corrigée ici parce que la table de glyphes est le cœur de ce
> fichier et qu'elle se contredisait (même glyphe, deux verdicts opposés).
> **Réserve honnête** : le scan ne peut pas *montrer* un $\Delta$ — la police
> est détruite. La lecture repose sur le décodage ci-dessus, pas sur une
> forme lisible.

**E** — On pose : pour tout $k$ de $\mathbb{N}$, $\quad \Delta_k = f(k) - \displaystyle\int_k^{k+1} f(t)\,dt$

et pour tout $n$ de $\mathbb{N}^{*}$, $\quad S_n = \displaystyle\sum_{k=0}^{k=n-1} \Delta_k$

1. **a)** *(0,25)* Vérifier que : $\left(\forall k \in \mathbb{N}\right)\ ;\quad 0 \le \Delta_k \le f(k) - f(k+1)$

   **b)** *(0,5)* En déduire que : $\left(\forall n \in \mathbb{N}^{*}\right)\ ;\quad 0 \le S_n \le \dfrac{1}{2}$

2. **a)** *(0,25)* Montrer que la suite $(S_n)_{n \in \mathbb{N}^{*}}$ est monotone.

   **b)** *(0,25)* En déduire que la suite $(S_n)_{n \in \mathbb{N}^{*}}$ est convergente.

   **c)** *(0,25)* Montrer que la limite $\ell$ de la suite $(S_n)_{n \in \mathbb{N}^{*}}$ vérifie : $\dfrac{3}{2} - 2\ln 2 \le \ell \le \dfrac{1}{2}$

> **Contrôle du vérificateur — E-2c, le « $\ell$ ».** La lecture du
> transcripteur est **confirmée par mesure**, pas seulement par le sens. Sur
> la ligne de texte, le glyphe isolé mesure **6×18 px** ; les trois `l` de
> « **l**a **l**imite … de **l**a suite » de la **même ligne** mesurent
> **6×17 px** (corrélation normalisée **0,945**), tandis que le chiffre `1`
> de la même police de texte mesure **7×16 px** (corrélation **0,839**). Dans
> la formule, même verdict : le glyphe isolé fait **6 px** de large, contre
> **7–8 px** pour les chiffres `1` voisins. C'est donc **la lettre `l`**,
> imprimée en romain droit. Elle est rendue $\ell$ ici pour la lisibilité :
> le sens est identique, la forme du scan est un `l` ordinaire. La lecture
> « chiffre 1 » est de toute façon impossible — $\tfrac32 - 2\ln 2 \le 1 \le
> \tfrac12$ serait faux.

---

## Classement — confirmé par le vérificateur

Les cinq slugs existent bien dans `content/maths/` (contrôlé par `ls`) :
`fonction-logarithme`, `limites-continuite`, `derivabilite-etude-fonctions`,
`suites-numeriques`, `calcul-integral`. Le classement dominant est confirmé
sur le fond : $\ln(1+x)$ est l'objet des parties A et B (l'encadrement de
A-1/A-2 est un développement de $\ln(1+x)$, et $g$ en B-2 est bâti dessus).

| Exercice | Barème | Slug proposé |
|---|---|---|
| Exercice 1 | 10 pts | **`fonction-logarithme`** (dominant : $f(x) = \frac{x-\ln(1+x)}{x^2}$, et les parties A et B tournent entièrement autour de l'encadrement de $\ln(1+x)$) · cross-lists : `limites-continuite` (B-1), `derivabilite-etude-fonctions` (B-1b, B-2, B-3), `suites-numeriques` (C-2, E), `calcul-integral` (D tout entière, E) |

## Ce que la vérification devait trancher en priorité (liste du transcripteur)

> *Conservée telle quelle comme trace de la commande — y compris ses deux
> formulations que la vérification a rectifiées (point 1 : « une dizaine »
> d'occurrences, en réalité **18** ; point 2 : le « l » n'est pas absorbé
> mais superposé). Chaque point est repris et soldé dans la section
> suivante.*

**Ce sujet demande une vigilance renforcée : la substitution de police est
totale, pas intermittente.** Priorités :

1. **Chaque occurrence du glyphe `¥`**, qui vaut tantôt $\mathbb{N}$ tantôt
   $+\infty$. Il y en a une dizaine. Une seule confusion casse un
   quantificateur ou une borne d'intervalle.
2. **L'expression de $F(x)$ en D-2a** : le « l » de « ln » est absorbé par le
   glyphe de parenthèse. Lu $2\ln 2 - \left(1+\frac1x\right)\ln(1+x)$, et
   confirmé par le test $F(1) = 0$. À revérifier au zoom.
3. **L'exposant de la majoration en C-2c** : lu $\left(\frac13\right)^{n}$
   **sans** facteur $|u_0 - \alpha|$. Comparer avec les sujets 2023 N, 2024 N
   et 2025 N transcrits en parallèle, qui n'écrivent pas tous la même forme —
   c'est un endroit où un transcripteur normalise sans s'en rendre compte.
4. **La borne supérieure de la somme en E** : lu $\sum_{k=0}^{k=n-1}$.
   Vérifier que ce n'est pas $k=n$.
5. **L'encadrement final de E-2c** : $\frac32 - 2\ln 2 \le \ell \le \frac12$.
   Contrôle de vraisemblance déjà fait : $\frac32 - 2\ln 2 = 0{,}114$, donc
   l'encadrement $0{,}114 \le \ell \le 0{,}5$ est cohérent. À confirmer.
6. **Le recompte du barème**, partie par partie, dans la marge.
7. **La re-dérivation mathématique complète.** Points obligatoires :
   l'encadrement de A-1 et sa conséquence A-2 (par intégration terme à terme
   entre $0$ et $x$) ; l'expression de $f'$ en B-2a ; l'encadrement de $g'$ en
   B-2b, qui doit donner celui de $g$ en B-2c par intégration ; l'intégration
   par parties de D-2a ; et l'inégalité $D_k \le f(k) - f(k+1)$ de E-1a, qui
   doit découler de la décroissance de $f$.

---

## Ce que la vérification a trouvé

**Passe adversariale indépendante, 2026-08-27.** Second lecteur, mandat de
chercher l'erreur et non de confirmer.

### Méthode réellement suivie

1. `curl` sur `https://www.alloschool.com/element/136604` ; **URLs d'images
   re-dérivées depuis le HTML** (et non recopiées du fichier) :
   `assets/documents/course-436/upload-84506/0001…0005-big.jpg`, cinq pages,
   1240×1754 chacune. Titre de la page : *« Examen National Mathématiques
   Sciences Maths 2022 Normale - Sujet »*. Conforme.
2. Pages **1, 2, 3** téléchargées et **lues comme images**, jamais par
   relecture du texte transcrit. Page **4** ouverte en plus, pour un contrôle
   croisé sur le mécanisme de substitution.
3. Zooms **4× à 20×** (rééchantillonnage Lanczos) sur chaque point fragile ;
   pour les glyphes litigieux, **analyse en composantes connexes** avec
   mesure des boîtes englobantes au pixel et **corrélation normalisée** entre
   glyphes.
4. **Re-dérivation mathématique complète** des parties A à E.

### Verdict

**Un défaut réel trouvé et corrigé. Deux descriptions inexactes rectifiées.
Aucune erreur sur une valeur, une borne, un exposant ou un barème.** Le
corps de l'énoncé était juste : le seul point faux du fichier était **dans la
table de glyphes**, c'est-à-dire dans son organe le plus critique.

### 1. Le défaut : le symbole de la partie E n'est pas un `D` latin

Le transcripteur avait écrit dans sa table : « `D` (E) → $D_k$ — **lettre
latine, pas $\Delta$** ». **C'est faux.** Le scan porte $\Delta_k$. La table
se contredisait d'ailleurs elle-même : la ligne suivante lit **le même glyphe
rendu** comme $\Delta$ dans l'exercice 2.

Comment c'est mesuré (détail dans le bloc de correction en tête de partie E) :

- **Décodage de la substitution.** Dix-sept glyphes de ce scan concordent avec
  la police **Symbol** lue au même code par une police latine
  (`"`→$\forall$, `£`→$\le$, `¥`→$\infty$, `a`→$\alpha$, `Î`→$\in$,
  `®`→$\to$, `¢`→$'$, `å`→$\sum$, `ò`→$\int$, `æ ç è ö ÷ ø`→les six
  fragments de parenthèse extensible). **Symbol 0x44 = $\Delta$.**
- **Droit contre italique.** Dans la ligne
  $S_n = \sum_{k=0}^{k=n-1}\Delta_k$, le $S$ et le $n$ sont **italiques** et
  le glyphe indexé est **romain droit** ; idem pour le $\alpha$ de la partie
  C, rendu « a » droit à côté d'un $f$ italique. Contrôle croisé page 4 : la
  transformation $\varphi$ de l'exercice 2 sort **« j » droit** à deux lignes
  du nombre complexe $j$ qui sort **italique**.
- **Identité au pixel.** Recadrés au plus juste, le glyphe de la partie E et
  celui du discriminant de l'exercice 2 mesurent **19×20 px tous les deux**
  et diffèrent de **0,09/255** en moyenne par pixel : **même caractère**.

**Portée** : purement notationnelle — question, bornes et démonstration
identiques dans les deux lectures. Corrigé quand même, parce que la table de
glyphes est ce que la conversion en banque va lire.
**Réserve honnête** : le scan ne peut pas *montrer* un $\Delta$, sa police
est détruite. La lecture repose sur le décodage ci-dessus.

### 2. Deux descriptions inexactes, rectifiées

- **« Le `l` de `ln` a été absorbé » (D-2a) — non.** Au zoom 8×, le `l` est
  **présent et lisible** ; il est *superposé* au fragment `÷` de la
  parenthèse extensible, ce qui le noie à taille normale sans le supprimer.
  La lecture transcrite était bonne ; c'est le diagnostic qui était faux.
- **« Le `p` initial est le crochet ouvrant renversé » — incomplet.** Au zoom
  12×, la forme en « þ » est le crochet `]` **et le chiffre `0`** en
  chevauchement. Dit autrement : le zéro de $]0,+\infty[$ est bien imprimé,
  il n'est pas manquant.

### 3. Les points nommés fragiles — tous contrôlés, tous justes

| Point | Verdict | Comment |
|---|---|---|
| **Les `¥`** (piège n°1) | **juste** | 18 occurrences relevées ; **5** en $+\infty$, **13** en $\mathbb{N}$/$\mathbb{N}^*$ (liste exhaustive ci-dessous). Aucune confusion. Les deux rôles rendent bien **le même glyphe** (corrélation 0,90) — d'où le piège |
| **$F(x)$ en D-2a** (piège n°2) | **juste** | $2\ln 2 - \left(1+\frac1x\right)\ln(1+x)$ lu au zoom 8× ; confirmé par $F(1)=0$ **et** par l'IPP refaite |
| **Exposant en C-2c** | **juste** | Zoom 6× : $\left(\frac13\right)^{n}$, exposant `n` en italique posé sur le fragment `ö`, et **rien après la parenthèse fermante**. Pas de facteur $\lvert u_0-\alpha\rvert$. Le transcripteur n'a pas normalisé |
| **Borne de la somme en E** | **juste** | Zoom 4× : la borne haute est **« $k = n-1$ »** (le `-` et le `1` sont distincts), la borne basse « $k = 0$ ». Ce n'est pas $k=n$ |
| **Le « $\ell$ » de E-2c** | **juste** | Mesuré : glyphe **6×18 px**, contre **6×17 px** pour les trois `l` de la même ligne (corr. **0,945**) et **7×16 px** pour le chiffre `1` de la même police (corr. **0,839**). Dans la formule : **6 px** de large contre **7–8 px** pour les `1` voisins. C'est **la lettre `l`**, imprimée en romain droit (rendue $\ell$ ici pour la lisibilité) |
| **Encadrement de E-2c** | **juste** | $\frac32 - 2\ln 2 \le \ell \le \frac12$, relu au zoom. Vraisemblance : $0{,}1137 \le \ell \le 0{,}5$, et la borne basse est exactement $S_1$ (voir re-dérivation) |
| **Barème** | **juste** | Recompté dans la marge, ligne à ligne, sur les deux pages : **p. 2 = 5,75** (0,25·2 + 0,5·5 + 0,25·3 + 0,5·4) et **p. 3 = 4,25** (0,5 + 0,25 + 0,5·4 + 0,25 + 0,5 + 0,25·3) → **10,00**. Le recompte du transcripteur est reproduit à l'identique. Cohérent avec la page 1, qui annonce 10 + 3,5 + 3 + 3,5 = 20, et avec les banques (`bk-2022-n-x2` 3,5 · `bk-2022-n-x3` 3 · `bk-2022-n-x4` 3,5) |

**Les 18 occurrences de `¥`, une par une.**

*En $+\infty$ — 5 occurrences* : (1) $I=[0,+\infty[$, définition de $I$ en
tête de B · (2) « pour tout $x$ de $]0,+\infty[$ », ligne de $f(x)$ en B ·
(3) $\lim_{x\to+\infty}f(x)$ en B-1c · (4) $\forall x\in\,]0,+\infty[$ en
B-2a · (5) $\forall x\in\,]0,+\infty[$ en D-2a.

*En $\mathbb{N}$ ou $\mathbb{N}^*$ — 13 occurrences* : (1)
$(u_n)_{n\in\mathbb{N}}$ et (2) $\forall n\in\mathbb{N}$ dans le préambule de
C-2 · (3) C-2a · (4) C-2b · (5) C-2c · (6) $(u_n)_{n\in\mathbb{N}}$ en C-2d ·
(7) « pour tout $k$ de $\mathbb{N}$ » et (8) « pour tout $n$ de
$\mathbb{N}^*$ » dans le préambule de E · (9) E-1a · (10) E-1b · (11) (12)
(13) $(S_n)_{n\in\mathbb{N}^*}$ en E-2a, E-2b et E-2c.
**Règle de départage vérifiée** : le glyphe précédé d'un `+` et enfermé dans
des crochets vaut $+\infty$ ; le glyphe qui suit un `Î` ou un « de » vaut
$\mathbb{N}$. Aucune occurrence n'est ambiguë une fois la règle posée.

### 4. La re-dérivation mathématique — tout tombe juste

- **A-1.** Mise au même dénominateur :
  $(1-x+x^2)(x+1)-1 = (x^3+1)-1 = x^3$, donc l'expression centrale vaut
  exactement $\dfrac{x^3}{x+1}$. Pour $x\ge 0$ : $x+1\ge 1$, d'où
  $0 \le \frac{x^3}{x+1} \le x^3$. ✔
- **A-2 découle bien de A-1 par intégration terme à terme sur $[0,x]$.**
  $\int_0^x\!\big(1-t+t^2-\frac1{t+1}\big)dt = x-\frac{x^2}{2}+\frac{x^3}{3}-\ln(1+x)$
  et $\int_0^x t^3dt = \frac{x^4}{4}$. **Les puissances et les dénominateurs
  se correspondent un à un** (2, 3, 4). ✔
- **B-2a.** $f'(x)=\dfrac{\frac{x^3}{1+x}-2x^2+2x\ln(1+x)}{x^4}
  = -\dfrac{2x-\frac{x^2}{1+x}-2\ln(1+x)}{x^3}$, et
  $2x-\frac{x^2}{1+x} = \frac{x^2+2x}{x+1} = x+\frac{x}{x+1}$ — **exactement
  le $g$ imprimé**. ✔ (identité non triviale : elle valide la forme imprimée
  de $g$, qui aurait pu être une faute de recopie)
- **B-2b.** $g'(x) = 1+\frac{1}{(x+1)^2}-\frac{2}{x+1}
  = \frac{\big((x+1)-1\big)^2}{(x+1)^2} = \left(\frac{x}{x+1}\right)^2$,
  donc $0 \le g'(x) \le x^2$ sur $I$. ✔
- **B-2c découle de B-2b par intégration**, avec $g(0)=0$ :
  $0 \le g(x) \le \int_0^x t^2dt = \frac{x^3}{3}$. ✔
- **B-2d.** $g \ge 0 \Rightarrow f' \le 0$ : $f$ décroissante sur $I$. ✔
- **C-2b/C-2c, cohérence interne.** $\lvert f'\rvert = \frac{g(x)}{x^3} \le
  \frac{x^3/3}{x^3} = \frac13$ — **c'est B-2c qui produit le $\frac13$ de
  C-2b**. Et l'initialisation de C-2c tient sans facteur :
  $\lvert u_0-\alpha\rvert = \lvert\frac13-\alpha\rvert < \frac23 \le 1 =
  \left(\frac13\right)^0$ puisque $\alpha\in\,]0,1[$. **La forme imprimée
  $\left(\frac13\right)^n$ est donc démontrable telle quelle** — le sujet
  n'est pas fautif ici.
- **D-2a, intégration par parties refaite.**
  $F(x)=\int_x^1\!\big(\frac1t-\frac{\ln(1+t)}{t^2}\big)dt$ ; avec
  $u=\ln(1+t)$, $v=-\frac1t$ :
  $\int_x^1\frac{\ln(1+t)}{t^2}dt = -\ln 2+\frac{\ln(1+x)}{x}-\ln 2-\ln x+\ln(1+x)$,
  d'où $F(x) = 2\ln 2 - \frac{\ln(1+x)}{x} - \ln(1+x)
  = 2\ln 2-\left(1+\frac1x\right)\ln(1+x)$. **Identique à l'imprimé.** ✔
- **D-2b.** $(1+\frac1x)\ln(1+x) \to 0+1 = 1$ quand $x\to0^+$, donc
  $\lim_{x\to0^+}F(x) = 2\ln 2-1 = \int_0^1 f$. ✔
- **E-1a découle bien de la décroissance de $f$** (B-2d) : pour
  $t\in[k,k+1]$, $f(k+1)\le f(t)\le f(k)$, donc
  $f(k+1) \le \int_k^{k+1}f \le f(k)$, d'où
  $0 \le \Delta_k \le f(k)-f(k+1)$. ✔
- **E-1b** par télescopage : $S_n \le f(0)-f(n) \le \frac12$. ✔
- **E-2c.** $(S_n)$ croît ($S_{n+1}-S_n=\Delta_n\ge0$), donc
  $\ell \ge S_1 = \Delta_0 = f(0)-\int_0^1 f = \frac12-(2\ln 2-1) =
  \frac32-2\ln 2$ ; et $\ell \le \frac12$ par E-1b. **Les deux bornes de
  l'encadrement imprimé sont exactement $S_1$ et le majorant de E-1b** —
  l'encadrement n'est pas approximatif, il est optimal au premier rang.
  Numériquement $0{,}1137 \le \ell \le 0{,}5$. ✔

**Aucune identité imprimée n'est fausse ; aucune donnée ne manque.** Toutes
les questions sont résolubles avec le seul énoncé transcrit.

### 5. Contrôles annexes

- **En-tête, page 1 relue** : durée **4 h**, coefficient **9**, code **NS
  24F**, الدورة العادية 2022, مسلك العلوم الرياضية أ و ب خيار فرنسية,
  répartition **EXERCICE1 analyse (10 pts) · EXERCICE2 nombres complexes
  (3,5) · EXERCICE3 arithmétique (3) · EXERCICE4 structures algébriques
  (3,5)** = 20. Conforme au fichier. *Détail non repris par le transcripteur,
  sans conséquence : la page 1 porte aussi la mention* المسالك الدولية.
- **Aucune figure imprimée** dans l'exercice : confirmé sur l'image. B-3-b
  demande bien au candidat de tracer $(C)$, avec $\lVert\vec i\rVert =
  \lVert\vec j\rVert = 2\,cm$ (relu au zoom 3×).
- **Slugs du classement** : `ls content/maths/` — `fonction-logarithme`,
  `limites-continuite`, `derivabilite-etude-fonctions`, `suites-numeriques`,
  `calcul-integral` **existent tous les cinq**.
- **Aucun `content/**/bank.yaml` n'a été touché**, aucun autre fichier de
  `_incoming/` non plus.

### 6. Ce qui reste indécidable

**Rien qui porte sur une valeur.** Le scan a permis de trancher tous les
points listés comme fragiles. Le seul endroit où la certitude est
*inférentielle* et non *visuelle* est le $\Delta$ de la partie E : la police
est détruite, donc la forme de la lettre ne peut pas être lue directement —
la lecture repose sur le décodage Symbol, le contraste droit/italique et
l'identité au pixel avec le discriminant de l'exercice 2. Trois indices
concordants, mais pas un glyphe lisible. Comme la question ne change pas d'un
iota selon qu'on écrit $D_k$ ou $\Delta_k$, **aucun risque pédagogique n'est
attaché à ce point** ; il est signalé pour l'honnêteté du dossier, pas comme
une réserve sur l'exploitabilité de l'exercice.
