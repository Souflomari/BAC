# Examen national Mathématiques — SM — 2017, session NORMALE (NS 25) — exercice 4

> **Fichier d'entrée (`_incoming`) — PASSE DE VÉRIFICATION INTERROMPUE.
> NON CLEARÉ POUR CONVERSION.** Protocole `docs/sujets/maths/README.md`.
>
> Une passe adversariale indépendante a bien été lancée sur l'exercice 4 le
> 2026-08-27, et une part réelle en a été faite (elle est ci-dessous, avec ses
> preuves). Mais **le processus a été tué en cours d'écriture** — plafond de
> session — et la section `## Ce que la vérification a trouvé`, que cet
> en-tête annonçait et que le docket en bas de fichier appelle « plus bas »,
> **n'a jamais été écrite**. L'en-tête portait « VÉRIFIÉ » et renvoyait à une
> section absente : c'est cette contradiction qui est corrigée ici.
>
> **Ce que la passe a établi, avec preuve dans le fichier :**
> le recompte du barème partie par partie ($3{,}25 + 3{,}0 + 3{,}75 = 10$) ·
> la table de substitution de police et son décodage (§ NOTE DE LECTURE) ·
> l'adjudication du `;` de P1 q3-b **au niveau de l'octet** (police `F15`,
> vraie Times New Roman, WinAnsi, sans `/Differences` — donc un point-virgule
> authentique, et une incohérence du SUJET OFFICIEL, pas un artefact) ·
> le classement, tranché vers `fonction-exponentielle` avec son argument.
>
> **Ce qu'elle n'a PAS livré :** le traitement systématique des sept points du
> docket. Seul le point 4 (le `;`) est soldé, et le point 7 (le barème) l'est
> par le recompte. **Les points 1, 2, 3, 5 et 6 restent ouverts** — c'est-à-dire
> le recompte une à une des occurrences de `£` et `³` (deux inégalités de sens
> OPPOSÉ rendues par des glyphes qui n'en portent aucun), celui des `¥`
> (tantôt $\mathbb{N}$, tantôt $+\infty$), le signe de l'exposant
> $e^{-\frac{1}{x}}$, et les deux identités de P3. Ce sont exactement les
> points où une erreur ne se voit pas.
>
> Les mentions `Statut: vérifié` qui subsistent plus bas datent de la passe
> interrompue : **elles ne valent pas quitus**. Une passe fraîche doit reprendre
> les cinq points ouverts avant toute conversion en banque. Le fichier reste
> dans le sas ; le déplacement vers `docs/sujets/maths/<notion>.md` se fait
> **après** la conversion, jamais en même temps.
>
> **Portée volontairement partielle.** Ce fichier ne transcrit que
> l'**exercice 4** (le problème d'analyse, 10 pts). Les exercices 1, 2 et 3
> sont **déjà en banque** — `bk-2017-n-x1` de `structures-algebriques`,
> `bk-2017-n-x2` de `nombres-complexes-2`, `bk-2017-n-x3` de `arithmetique` —
> et ne doivent surtout pas être reconvertis : l'assemblage d'épreuves somme
> les `bareme_total`, un doublon fausserait le /20.

## Pourquoi ce sujet

L'épreuve **SM 2017 session normale** est assemblée à **10,00/20** dans
Examens blancs. Cet exercice vaut exactement les 10 points qui manquent.
Cinquième et dernière pièce transcriptible du gisement SM — la sixième,
SM 2020, est **suspendue** pour cause de format à choix (voir
`docs/grounding/known-issues.md` K-0).

## En-tête du scan (relu)

- الامتحان الوطني الموحد للبكالوريا — **الدورة العادية 2017** — الموضوع
- Code sujet **NS 25** — *et non NS 24F* : c'est le code des sessions SM
  antérieures à 2018 environ, déjà relevé par le `CENSUS`.
- شعبة العلوم الرياضية (أ) و (ب) (الترجمة الفرنسية)
- Durée **4 h** · coefficient **9**
- Organisme imprimé : « المركز الوطني للتقويم والامتحانات والتوجيه »
- Marqueur « ★★ » en haut à gauche de la page 1.
- Source : https://www.alloschool.com/element/57970
- Images : `.../course-436/upload-45343/000{1..5}-big.jpg` (5 pages)
- L'exercice 4 commence en bas de la page 3 et occupe les pages 4 et 5.

**Consignes (p. 1, transcrites) :** « La durée de l'épreuve est de 4 heures. —
L'épreuve comporte **4** exercices indépendants. — Les exercices peuvent être
traités selon l'ordre choisi par le candidat. » Puis la carte des composantes :

| Exercice | Domaine | Barème |
|---|---|---|
| 1 | structures algébriques | 3,5 pts |
| 2 | nombres complexes | 3,5 pts |
| 3 | arithmétique | 3 pts |
| 4 | analyse | **10 pts** |

Somme : $3{,}5+3{,}5+3+10 = \mathbf{20}$ ✔

« L'usage de la calculatrice n'est pas autorisé. L'usage de la couleur rouge
n'est pas autorisé. »

## ⚠️ NOTE DE LECTURE — substitution de police

> **Correction du vérificateur — la substitution n'est PAS systématique.**
> La transcription décrivait une substitution « systématique mais moins
> étendue qu'en 2022 ». C'est inexact, et la correction change la façon de
> lire le scan. La substitution est **strictement confinée** à :
>
> - **toute la Partie 3 (page 5)**, et
> - **deux endroits isolés de la page 4** : les deux signes d'intégrale de
>   P2 q2-a (imprimés `Ò`) et les deux séparateurs de P1 q3-b (imprimés `;`).
>
> **Partout ailleurs — tout l'énoncé de la Partie 1 et toute la Partie 2 —
> les symboles s'impriment CORRECTEMENT** : $\forall$, $\in$, $]0,+\infty[$,
> $\int$, $\le$, $\ge$, $\to$ sont de vrais glyphes. Vérifié sur les JPEG
> d'AlloSchool eux-mêmes, pas seulement sur un rendu local.
>
> *Cause mécanique, relevée dans le PDF.* Le producteur du document a fondu
> deux polices source distinctes (Symbol et une police « ajourée »
> $\mathbb{N},\mathbb{C}$) sur **une seule** police de substitution : `F17`,
> un sous-ensemble Type0 nommé « Times New Roman » dont la table `ToUnicode`
> renvoie vers du Latin-1. Les équations restées en `F20 = SymbolMT`
> (correctement incorporée) s'impriment juste. C'est pourquoi le même énoncé
> mélange les deux régimes, parfois **à l'intérieur d'une même question** :
> en P2 q2-a l'intégrale est cassée (`Ò`) alors qu'en q2-b et q2-c elle est
> correcte ($\int$).

Table de correspondance, **valable pour les zones cassées seulement**,
recomptée occurrence par occurrence par relevé des identifiants de glyphe
(GID) dans le PDF — pas à l'œil :

| Rendu à l'écran | Lu comme | Occurrences dans l'ex. 4 | Base de l'adjudication |
|---|---|---|---|
| `"` | $\forall$ | 3 — P3 q1-c, q2-a, q2-b | GID `0x0005` ; position en tête de quantificateur |
| `Î` | $\in$ | 3 — idem | GID `0x00CC` ; toujours entre une variable et un ensemble |
| `¥` | $+\infty$ **ou** $\mathbb{N}$ | 5, **toutes en Partie 3** : 4× $+\infty$ (q2-a, q2-b, et sous les 2 `lim` de q3-c/q3-d) · **1× $\mathbb{N}$** (q1-c, « $n \in$ ¥$^*$ ») | GID `0x0096`. **Deux valeurs**, comme en 2022 |
| `£` | $\le$ **ou** $\mathbb{C}$ | 7 dans l'ex. 4, **toutes $\le$ et toutes en Partie 3** : q2-a ×2, q2-b ×2, q3-b ×2, q3-c ×1 | GID `0x0085`. **Piège : le même glyphe vaut $\mathbb{C}$ ailleurs dans ce PDF** — l'exercice 2 imprime « $m$ Î £ \ {0,1,i} » pour $m\in\mathbb{C}\setminus\{0,1,i\}$. L'ex. 4 n'a pas de complexes, donc les 7 sont bien $\le$ |
| `³` | $\ge$ | 3, **toutes en P3 q3-a** : « $a_4$ ³ 1 », « $a_n$ ³ 1 », « $e^{3/4}$ ³ 2 » | GID `0x00F1` — **distinct** de celui de `£` |
| `®` | $\to$ | 2 — sous les `lim` de P3 q3-c et q3-d | GID `0x008A` |
| `æ ö ç ÷ è ø` | grandes parenthèses | P3 q1-c uniquement | Fragments d'une parenthèse extensible empilés |
| `Ò` | $\int$ | 2 — **P2 q2-a seulement** | O majuscule accent grave gras. Ailleurs le $\int$ est correct (déf. de $F$, q2-b, q2-c) |
| `□` (boîte vide) | $\mathbb{N}$ | 1 — **P2 q4-b** | **Ni `¥` ni un glyphe** : le symbole est un **PNG blanc de 2×2 pixels** étiré, donc littéralement absent du document. Adjugé $\mathbb{N}^*$ par le contexte ($n$ entier naturel, et $1/n$ impose $n\neq0$) et par P3 q1-c qui écrit le même quantificateur en toutes lettres |

**Le piège le plus dangereux de ce scan** est le couple `£` / `³` : deux
inégalités **de sens opposé**, rendues par deux glyphes qui ne se ressemblent
pas mais qui ne portent aucun des deux le sens attendu. Chaque occurrence a
été adjugée par la cohérence mathématique, jamais par la forme. Le
vérificateur doit les recompter une à une.

---

## 2017 — session normale — Exercice 4
Source: https://www.alloschool.com/element/57970
Statut: vérifié — re-fetch indépendant + re-dérivation (vérificateur adversarial, 2026-08-27)

- Filière / épreuve : Sciences Mathématiques (A) et (B), traduction française — Mathématiques, 4 h, coef 9
- Code sujet : NS 25 · Barème de l'exercice : **10 points**
- Recompte question par question, relevé dans la marge du scan :
  Partie 1 $= 0{,}25+0{,}5+0{,}5+0{,}5+0{,}25+0{,}75+0{,}5 = 3{,}25$ ·
  Partie 2 $= 0{,}25+0{,}5+0{,}25+0{,}5+0{,}5+0{,}5+0{,}25+0{,}25 = 3{,}0$ ·
  Partie 3 $= 0{,}5+0{,}25+0{,}25+0{,}25+0{,}5+0{,}5+0{,}5+0{,}5+0{,}5 = 3{,}75$ —
  total $3{,}25+3{,}0+3{,}75 = \mathbf{10}$ ✔
- Images lues : `.../0003-big.jpg` (fin de page : énoncé de la Partie 1), `.../0004-big.jpg` (Parties 1 et 2), `.../0005-big.jpg` (Partie 3)
- Aucune figure n'est imprimée : la question 3-b de la Partie 1 demande au candidat de **tracer** la courbe.

**EXERCICE 4 (10 points)**

**Partie 1** — On considère la fonction numérique $f$ définie sur $[0, +\infty[$ par :

$$f(0) = 0 \qquad \text{et} \qquad \left(\forall x \in\, ]0, +\infty[\right)\quad f(x) = \left(1 + \frac{1}{x}\right)e^{-\frac{1}{x}}$$

Soit $(C)$ la courbe représentative de $f$ dans un repère orthonormé $(O, \vec{i}, \vec{j})$ *(on prend $\|\vec{i}\| = \|\vec{j}\| = 2\,cm$)*.

1. **a)** *(0,25)* Montrer que la fonction $f$ est continue à droite en $0$.

   **b)** *(0,5)* Montrer que la fonction $f$ est dérivable à droite en $0$.

   **c)** *(0,5)* Montrer que la fonction $f$ est dérivable sur $]0, +\infty[$ puis calculer $f'(x)$ pour tout $x$ dans l'intervalle $]0, +\infty[$.

2. **a)** *(0,5)* Calculer $\displaystyle\lim_{x \to +\infty} f(x)$ puis interpréter graphiquement le résultat obtenu.

   **b)** *(0,25)* Donner le tableau de variation de la fonction $f$.

3. **a)** *(0,75)* Montrer que la courbe $(C)$ admet un point d'inflexion $I$ dont on déterminera les coordonnées.

   **b)** *(0,5)* Tracer la courbe $(C)$. *(On prend : $f(1)\,;\ 0{,}7$ et $4e^{-3}\,;\ 0{,}2$)*

   > **Correction du vérificateur — le `;` n'est PAS une substitution de
   > glyphe.** La transcription soupçonnait « une substitution de plus » là où
   > on attendrait un $\simeq$. Vérifié au niveau de l'octet : le séparateur
   > est un **point-virgule authentique** (code `0x3B`, police `F15` = vraie
   > Times New Roman, encodage WinAnsi, sans tableau `/Differences`) — une
   > police *différente* de la `F17` cassée qui produit `£` et `³`. Il
   > s'imprime donc comme un point-virgule, et c'est bien ce que le scan
   > montre. **C'est une incohérence du sujet officiel**, pas un artefact de
   > numérisation ni une erreur de transcription : le sens exigé est
   > « $\simeq$ », puisque $f(1)=2e^{-1}=0{,}7358\ldots$ et
   > $4e^{-3}=0{,}1991\ldots$ Laissé tel qu'imprimé, conformément à la règle
   > « on documente, on ne répare pas ».
   >
   > *À noter pour la conversion* : $4e^{-3}$ est **exactement l'ordonnée du
   > point d'inflexion $I$** trouvé en q3-a. Les deux repères fournis pour le
   > tracé sont donc $f(1)$ et $f(1/3)$.

**Partie 2** — On considère la fonction numérique $F$ définie sur $[0, +\infty[$ par :

$$F(x) = \int_x^{1} f(t)\,dt$$

1. *(0,25)* Montrer que la fonction $F$ est continue sur l'intervalle $[0, +\infty[$.

2. **a)** *(0,5)* En utilisant la méthode d'intégration par parties, montrer que :

   $$\left(\forall x \in\, ]0, +\infty[\right)\quad \int_x^{1} e^{-\frac{1}{t}}\,dt = e^{-1} - x\,e^{-\frac{1}{x}} - \int_x^{1} \frac{1}{t}\,e^{-\frac{1}{t}}\,dt$$

   **b)** *(0,25)* Déterminer $\displaystyle\int_x^{1}\left(1 + \frac{1}{t}\right)e^{-\frac{1}{t}}\,dt$ pour tout $x$ de $]0, +\infty[$.

   **c)** *(0,5)* Montrer que : $\displaystyle\int_0^{1} f(t)\,dt = e^{-1}$

3. *(0,5)* Calculer en $cm^2$, l'aire du domaine plan limité par la courbe $(C)$ et les droites d'équations : $x = 0$, $x = 2$ et $y = 0$.

4. On considère la suite numérique $(u_n)_{n \ge 0}$ définie par : $u_n = F(n) - F(n+2)$

   **a)** *(0,5)* En utilisant le théorème des accroissements finis, montrer que pour tout entier naturel $n$, il existe un réel $v_n$ de l'intervalle $]n, n+2[$ tel que :

   $$u_n = 2\left(1 + \frac{1}{v_n}\right)e^{-\frac{1}{v_n}}$$

   **b)** *(0,25)* Montrer que : $\left(\forall n \in \mathbb{N}^{*}\right)\quad 2\left(1+\frac{1}{n}\right)e^{-\frac{1}{n}} \le u_n \le 2\left(1+\frac{1}{n+2}\right)e^{-\frac{1}{n+2}}$

   > **Note du vérificateur — le seul symbole illisible de tout l'exercice.**
   > Les deux $\le$ de cette ligne sont de **vrais** $\le$ sur le scan (zone
   > non cassée), et leur sens est confirmé : $f$ est strictement croissante
   > sur $]0,+\infty[$ (car $f'(x)=e^{-1/x}/x^3>0$), donc $n<v_n<n+2$ donne
   > $2f(n)\le u_n\le 2f(n+2)$. En revanche le « $\mathbb{N}$ » du
   > quantificateur **n'est pas imprimé** : à sa place le PDF pose un PNG
   > blanc de 2×2 pixels, qui s'affiche en **boîte vide**. $\mathbb{N}^{*}$
   > est donc une **adjudication par le contexte**, pas une lecture — appuyée
   > sur $1/n$ (qui impose $n\neq0$) et sur P3 q1-c, qui écrit le même
   > quantificateur avec un glyphe, lui, présent.

   **c)** *(0,25)* En déduire $\displaystyle\lim_{n \to +\infty} u_n$

**Partie 3**

1. **a)** *(0,5)* Montrer que pour tout entier naturel non nul $n$, il existe un nombre réel strictement positif unique $a_n$ tel que : $f(a_n) = e^{-\frac{1}{n}}$

   **b)** *(0,25)* Montrer que la suite numérique $(a_n)_{n \ge 1}$ est croissante.

   **c)** *(0,25)* Vérifier que : $\left(\forall n \in \mathbb{N}^{*}\right)\quad -\dfrac{1}{a_n} + \ln\left(1 + \dfrac{1}{a_n}\right) = -\dfrac{1}{n}$

2. **a)** *(0,25)* Montrer que : $\left(\forall t \in [0, +\infty[\right)\quad 1 - t \le \dfrac{1}{1+t} \le 1 - t + t^2$

   **b)** *(0,5)* Montrer que : $\left(\forall x \in [0, +\infty[\right)\quad -\dfrac{x^2}{2} \le -x + \ln(1+x) \le -\dfrac{x^2}{2} + \dfrac{x^3}{3}$

3. Soit $n$ un entier naturel supérieur ou égal à $4$.

   **a)** *(0,5)* Vérifier que : $a_4 \ge 1$, en déduire que $a_n \ge 1$. *(On admettra que : $e^{\frac{3}{4}} \ge 2$)*

   **b)** *(0,5)* Montrer que : $1 - \dfrac{2}{3a_n} \le \dfrac{2a_n^2}{n} \le 1$

   *(On pourra utiliser les questions 1-c) et 2-b) de la partie 3)*

   **c)** *(0,5)* Montrer que : $\sqrt{\dfrac{n}{6}} \le a_n$ *(On pourra utiliser les questions 3-a) et 3-b))*, en déduire $\displaystyle\lim_{n \to +\infty} a_n$

   **d)** *(0,5)* Déterminer $\displaystyle\lim_{n \to +\infty} a_n\sqrt{\dfrac{2}{n}}$

*(Le scan porte « FIN » sous cette dernière question.)*

---

## Classement — **tranché par le vérificateur**

| Exercice | Barème | Slug proposé |
|---|---|---|
| Exercice 4 | 10 pts | **`fonction-exponentielle`** (dominant : $f(x)=(1+1/x)e^{-1/x}$, et l'exponentielle porte l'étude entière) · cross-lists : `limites-continuite` (P1 q1-a, q2-a), `derivabilite-etude-fonctions` (P1 q1-b/c, q3-a le point d'inflexion, P2 q4-a le TAF), `calcul-integral` (P2 tout entière), `suites-numeriques` (P2 q4, P3), `fonction-logarithme` (P3 q1-c et q2-b, où $\ln$ est central) |

> **Décision du vérificateur : `fonction-exponentielle`.** La transcription
> laissait le choix ouvert en invoquant le parallèle avec SM 2022 N, classé
> `fonction-logarithme`. **Le parallèle est faux, et il se retourne.** En
> 2022, la fonction *étudiée* est elle-même logarithmique :
> $f(x)=\frac{x-\ln(1+x)}{x^2}$ — le $\ln$ est **dans la définition**, d'où le
> slug. En 2017, la fonction étudiée est $f(x)=(1+\frac1x)e^{-1/x}$ : le $\ln$
> n'apparaît **nulle part** dans sa définition, ni dans toute la Partie 1, ni
> dans toute la Partie 2 — soit **6,25 points sur 10 sans un seul
> logarithme**. Appliquée aux deux sujets, la même règle (« le slug suit la
> fonction sous étude ») donne `fonction-logarithme` en 2022 et
> `fonction-exponentielle` en 2017.
>
> En Partie 3 elle-même, l'objet reste exponentiel : $a_n$ est **défini** par
> $f(a_n)=e^{-1/n}$. Le $\ln$ y entre comme *outil* (linéariser en passant au
> logarithme en q1-c, puis l'encadrement classique de $\ln(1+x)$ en q2-b,
> réinvesti en q3-b). C'est un cross-list solide — il est conservé ci-dessus —
> mais pas le domaine dominant.
>
> Les neuf slugs cités dans la ligne ci-dessus ont été contrôlés contre
> `ls content/maths/` : **tous les neuf existent**.

## Le docket laissé par la transcription

*(Conservé tel quel comme trace. Les sept points sont traités un par un dans
`## Ce que la vérification a trouvé`, plus bas.)*

1. **Chaque occurrence de `£` et de `³`** — deux inégalités de sens opposé,
   rendues par deux glyphes qui n'en portent aucun. C'est le piège central de
   ce scan. Les recompter une à une, et vérifier en particulier le sens de
   celles de P3 q2-a, q2-b et q3-b, où un encadrement à deux bornes rend
   l'erreur invisible si les deux sens sont inversés ensemble.
2. **Chaque occurrence de `¥`**, qui vaut tantôt $\mathbb{N}$ tantôt
   $+\infty$ — même piège qu'en 2022.
3. **L'exposant de P1** : $e^{-\frac{1}{x}}$, avec le signe moins. Vérifier
   qu'il n'est pas $e^{\frac{1}{x}}$ ; toute l'étude en dépend.
4. **Les valeurs approchées de P1 q3-b** : « $f(1)\,;\ 0{,}7$ et
   $4e^{-3}\,;\ 0{,}2$ ». Le séparateur imprimé est un point-virgule là où on
   attendrait un $\simeq$ — vérifier s'il s'agit d'une substitution de glyphe
   de plus. Contrôle : $f(1) = 2e^{-1} = 0{,}736$ et $4e^{-3} = 0{,}199$, donc
   les deux valeurs sont bien des approximations de $f(1)$ et de $4e^{-3}$.
5. **P3 q1-c** : l'identité $-\frac{1}{a_n} + \ln(1+\frac{1}{a_n}) = -\frac1n$.
   Contrôle déjà fait à la transcription : elle découle directement de
   $f(a_n) = e^{-1/n}$ par passage au logarithme. À confirmer sur le scan.
6. **P3 q3-b** : l'encadrement $1 - \frac{2}{3a_n} \le \frac{2a_n^2}{n} \le 1$.
   Contrôle déjà fait : il découle de q1-c et q2-b avec $x = 1/a_n$, en
   multipliant par $-2a_n^2$ — ce qui **retourne** les deux inégalités, d'où
   l'importance du point 1 ci-dessus.
7. **Le recompte du barème**, partie par partie, dans la marge.

---

## Ce que la vérification a trouvé

> **Cette section n'a jamais été écrite.** Le docket ci-dessus y renvoie
> (« traités un par un […] plus bas ») ; le processus qui devait la produire a
> été tué avant d'y arriver. Elle est laissée ici, vide et datée, plutôt que
> supprimée : un renvoi qui pointe vers rien est un piège pour le prochain
> lecteur, et effacer le renvoi masquerait qu'un travail reste dû.
>
> **Reste dû, avant toute conversion** — les points 1, 2, 3, 5 et 6 du docket.
> Le point 4 est soldé dans le corps de l'énoncé (l'adjudication du `;` à
> l'octet) ; le point 7 l'est par le recompte du barème en tête de sujet.
