# Examen national Mathématiques — SM — 2017, session NORMALE (NS 25) — exercice 4

> **Fichier d'entrée (`_incoming`) — VÉRIFIÉ EN DEUX PASSES.
> CLEARÉ POUR CONVERSION.** Protocole `docs/sujets/maths/README.md`.
>
> **Historique honnête de ce fichier, parce qu'il compte.** Une première passe
> adversariale a été lancée sur l'exercice 4 le 2026-08-27 et **tuée en cours
> d'écriture** (plafond de session) : elle avait posé son en-tête et une part
> réelle de son travail, mais la section `## Ce que la vérification a trouvé`
> — annoncée par l'en-tête et appelée « plus bas » par le docket — n'avait
> jamais été écrite. L'en-tête portait alors « VÉRIFIÉ » et renvoyait à une
> section absente. Le statut a été ramené à la vérité (« PASSE INTERROMPUE »),
> puis une **seconde passe** a repris les points restés ouverts et les a
> soldés. C'est cette seconde passe qui autorise le « vérifié » ci-dessus.
>
> **Ce que la première passe avait établi, avec preuve :**
> le recompte du barème partie par partie ($3{,}25 + 3{,}0 + 3{,}75 = 10$) ·
> la table de substitution de police et son décodage (§ NOTE DE LECTURE) ·
> l'adjudication du `;` de P1 q3-b **au niveau de l'octet** (police `F15`,
> vraie Times New Roman, WinAnsi, sans `/Differences` — donc un point-virgule
> authentique, et une incohérence du SUJET OFFICIEL, pas un artefact) ·
> le classement, tranché vers `fonction-exponentielle` avec son argument.
>
> **Ce que la seconde passe a soldé** (points 1, 2, 3, 5, 6 du docket, détail
> et preuves dans `## Ce que la vérification a trouvé`) : le recompte et
> l'adjudication **une par une** des 7 `£` et des 3 `³` — les deux inégalités
> de sens opposé —, celui des 5 `¥` ($\mathbb{N}$ vs $+\infty$), le signe
> négatif de l'exposant $e^{-\frac{1}{x}}$, et les deux identités de P3
> (q1-c et q3-b) relues sur l'image puis re-dérivées.
>
> **Les quatre contrôles anti-CDN sont tous faits** — `<title>` servi, année
> et code **NS 25** relus sur chaque page (couche texte **et** OCR), MD5 des
> cinq images consignés —, plus deux ajoutés : concordance JPEG ↔ PDF au pixel
> et OCR intégral du corps des pages 3–5, indépendant de la couche texte.
>
> **La seule adjudication non lue reste déclarée comme telle** : le
> $\mathbb{N}^{*}$ de **P2 q4-b**, physiquement absent du PDF officiel (une
> image de 2×2 pixels à sa place), adjugé par le contexte. Trou signalé, pas
> comblé.
>
> Le fichier reste dans le sas jusqu'à la conversion ; le déplacement vers
> `docs/sujets/maths/<notion>.md` se fait **après** la conversion, jamais en
> même temps.
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
>   P2 q2-a (imprimés `ò` — voir la correction dans la table) et les deux
>   séparateurs de P1 q3-b (imprimés `;`).
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
> en P2 q2-a l'intégrale est cassée (`ò`) alors qu'en q2-b et q2-c elle est
> correcte ($\int$).

Table de correspondance, **valable pour les zones cassées seulement**,
recomptée occurrence par occurrence par relevé des identifiants de glyphe
(GID) dans le PDF — pas à l'œil.

> **Note de la 2ᵉ passe.** Tous les comptes de cette table ont été refaits et
> sont confirmés ; les six GID aussi. Mais **un GID ne porte pas le sens d'une
> inégalité** — ce sont des indices de glyphe dans une vraie Times New Roman.
> La preuve qui manque à la colonne de droite (la correspondance exacte avec
> l'encodage **Adobe Symbol**, établie sur dix points de code) est ajoutée dans
> `## Ce que la vérification a trouvé`. La table est laissée telle quelle comme
> trace, à la ligne `ò` près, corrigée en place.


| Rendu à l'écran | Lu comme | Occurrences dans l'ex. 4 | Base de l'adjudication |
|---|---|---|---|
| `"` | $\forall$ | 3 — P3 q1-c, q2-a, q2-b | GID `0x0005` ; position en tête de quantificateur |
| `Î` | $\in$ | 3 — idem | GID `0x00CC` ; toujours entre une variable et un ensemble |
| `¥` | $+\infty$ **ou** $\mathbb{N}$ | 5, **toutes en Partie 3** : 4× $+\infty$ (q2-a, q2-b, et sous les 2 `lim` de q3-c/q3-d) · **1× $\mathbb{N}$** (q1-c, « $n \in$ ¥$^*$ ») | GID `0x0096`. **Deux valeurs**, comme en 2022 |
| `£` | $\le$ **ou** $\mathbb{C}$ | 7 dans l'ex. 4, **toutes $\le$ et toutes en Partie 3** : q2-a ×2, q2-b ×2, q3-b ×2, q3-c ×1 | GID `0x0085`. **Piège : le même glyphe vaut $\mathbb{C}$ ailleurs dans ce PDF** — l'exercice 2 imprime « $m$ Î £ \ {0,1,i} » pour $m\in\mathbb{C}\setminus\{0,1,i\}$. L'ex. 4 n'a pas de complexes, donc les 7 sont bien $\le$ |
| `³` | $\ge$ | 3, **toutes en P3 q3-a** : « $a_4$ ³ 1 », « $a_n$ ³ 1 », « $e^{3/4}$ ³ 2 » | GID `0x00F1` — **distinct** de celui de `£` |
| `®` | $\to$ | 2 — sous les `lim` de P3 q3-c et q3-d | GID `0x008A` |
| `æ ö ç ÷ è ø` | grandes parenthèses | P3 q1-c uniquement | Fragments d'une parenthèse extensible empilés |
| `ò` | $\int$ | 2 — **P2 q2-a seulement** | **Corrigé par la 2ᵉ passe** : le point de code est `ò` **minuscule** (U+00F2), pas `Ò` majuscule — le glyphe paraît capital parce qu'il est composé en grand corps. La correction porte : `0xF2` = `integral` dans l'encodage Symbol, ce qui confirme la lecture $\int$. Ailleurs le $\int$ est correct (déf. de $F$, q2-b, q2-c) |
| `□` (boîte vide) | $\mathbb{N}$ | 1 — **P2 q4-b** | **Ni `¥` ni un glyphe** : le symbole est un **PNG blanc de 2×2 pixels** étiré, donc littéralement absent du document. Adjugé $\mathbb{N}^*$ par le contexte ($n$ entier naturel, et $1/n$ impose $n\neq0$) et par P3 q1-c qui écrit le même quantificateur en toutes lettres |

**Le piège le plus dangereux de ce scan** est le couple `£` / `³` : deux
inégalités **de sens opposé**, rendues par deux glyphes qui ne se ressemblent
pas mais qui ne portent aucun des deux le sens attendu. Chaque occurrence a
été adjugée par la cohérence mathématique, jamais par la forme. Le
vérificateur doit les recompter une à une.

---

## 2017 — session normale — Exercice 4
Source: https://www.alloschool.com/element/57970
Statut: vérifié — re-fetch indépendant + re-dérivation, en **deux** passes adversariales
(1ʳᵉ passe interrompue puis 2ᵉ passe de reprise, toutes deux le 2026-08-27 ; les cinq
points laissés ouverts par la 1ʳᵉ sont soldés — voir `## Ce que la vérification a trouvé`)

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

> **Passe de reprise — 2026-08-27** (date réelle relevée par `date -u` :
> `Thu Aug 27 17:48:19 UTC 2026`). Écrite par une **seconde** passe
> adversariale, lancée avec pour seul mandat de solder les cinq points laissés
> ouverts par la passe tuée en cours d'écriture (points 1, 2, 3, 5, 6 du
> docket). Les points 4 (le `;`) et 7 (le barème) n'ont pas été refaits : ils
> étaient déjà soldés avec preuve — le 7 a néanmoins été recoupé gratuitement
> par l'OCR (voir plus bas). **Les cinq points sont soldés.**

### Matériel de la passe, et les quatre contrôles anti-CDN

Re-fetch complet et indépendant depuis `https://www.alloschool.com/element/57970`,
URLs d'images **dérivées du HTML servi** (jamais reconstruites de mémoire), le
2026-08-27 à 17:48 UTC.

| Contrôle anti-CDN demandé | Fait ? | Preuve |
|---|---|---|
| `<title>` servi par le HTML | **oui** | `Examen National Mathématiques Sciences Maths 2017 Normale - Sujet - AlloSchool` |
| Année relue sur chaque page | **oui** | Couche texte : `2017` sur les 5 pages. **OCR des JPEG** (tesseract, indépendant de la couche texte) : `2017` net sur les pages 2, 3, 4, 5 ; page 1 lue `5017` (le `2` confondu avec un `5` par l'OCR sur fond arabe) — tranché par la couche texte et par un recadrage ×10 |
| Code **NS 25** relu sur chaque page | **oui** | Couche texte sur les 5 pages ; **OCR** : `NS 25` page 1, `INS 25` pages 2–5 (le `I` est le filet du cadre) |
| MD5 des images consignés | **oui** | voir table ci-dessous |

```
d211f3ee3ab008f0d03688b1b040a8a2  0001-big.jpg   (page 1)
3b908b2d9195b352f658d846b4c8a433  0002-big.jpg   (page 2)
1deb8606612cb9efd2ab290576456a0e  0003-big.jpg   (page 3 — début ex. 4)
f5c0ba32bcbee4b4cbd3f4d883134251  0004-big.jpg   (page 4 — P1 fin + P2)
1c41ccd4576f0324f5b2ba84be0c55a0  0005-big.jpg   (page 5 — P3)
ed087b7c5bf7eb2a7b30416e86513e96  examen-national-mathematiques-sciences-maths-2017-normale-sujet.pdf
```

**Deux contrôles supplémentaires, non demandés, ajoutés parce que l'incident
SM 2025 (pages d'un AUTRE sujet servies depuis le cache CDN) est une classe de
panne que la relecture ne voit pas :**

- **Concordance JPEG ↔ PDF au pixel.** Le PDF servi sous le nom
  `…-2017-normale-sujet.pdf` a été rendu localement à 150 dpi (la densité
  exacte des JPEG) et comparé page à page aux cinq JPEG. Recouvrement d'encre
  IoU 0,68–0,76 et volumes d'encre à moins de 5 % — l'écart est celui de deux
  rastériseurs sur *le même* document, pas celui de deux documents. Les JPEG
  d'AlloSchool sont donc bien les pages de ce PDF-là.
- **OCR intégral du corps des pages 3, 4 et 5**, sur les pixels du JPEG, sans
  jamais montrer la transcription à l'OCR. Il rend, de lui-même :
  `Partie3 :`, `("n I ¥°)`, `("ri [0,+¥ [) l- t ££ ——£ l- t+¢r`,
  `a,* 1 , en déduire que a,*? 1 (On admettra que: e*? 2)`,
  `(On pourra utiliser les questions 1-c) et 2-b) de la partie 3)`,
  `n®B+¥`, `f (1); 0,7 et 4e 3+ 0,2`, `(vn el )`. Rien de tout cela ne peut
  provenir d'un autre sujet. L'illusion CDN est écartée.

L'OCR a aussi recraché, seul, **tous les points de barème dans la marge** :
page 4 → `0.25 · 0.5 · 0.5 · 0.5 · 0.25 · 0.75 · 0.5` (P1 = 3,25) puis
`0.25 · 0.5 · 0.25 · 0.5 · 0.5 · 0.5 · 0.25 · 0.25` (P2 = 3,00) ; page 5 →
`0.5 · 0.25 · 0.25 · 0.25 · 0.5 · 0.5 · 0.5 · 0.5 · 0.5` (P3 = 3,75).
**Le recompte du point 7 est ainsi confirmé une seconde fois, par une voie
indépendante : 3,25 + 3,00 + 3,75 = 10.**

### La clé de décodage — et c'est elle qui tranche les points 1 et 2

La passe précédente avait relevé les **GID** des glyphes cassés. Ce relevé est
exact — je l'ai refait et je retrouve les six mêmes identifiants au glyphe
près : `£`=133 (0x0085), `³`=241 (0x00F1), `¥`=150 (0x0096), `"`=5 (0x0005),
`Î`=204 (0x00CC), `®`=138 (0x008A).

**Mais un GID ne dit pas le sens.** Ce sont des indices de glyphe dans une
vraie *Times New Roman* : ils disent « livre sterling », « exposant trois »,
« yen ». Ils ne disent ni $\le$ ni $\ge$. Prise seule, la colonne « base de
l'adjudication » de la table de lecture ne prouve donc pas ce qu'elle annonce.
**Voici la preuve qui manquait.**

Le point de code Unicode de chaque glyphe cassé, lu **comme un code de la
police Adobe Symbol**, retombe exactement sur le symbole attendu — et cela
tient sur **dix points de code indépendants**, dont quatre que la table
n'avait pas exploités :

| Code | Rendu | Symbol (Adobe) | Où, dans ce PDF |
|---|---|---|---|
| `0x22` | `"` | `universal` $\forall$ | P3 q1-c, q2-a, q2-b |
| `0xA3` | `£` | **`lessequal` $\le$** | P3 (7×) |
| `0xA5` | `¥` | **`infinity` $\infty$** | P3 (5×) |
| `0xAE` | `®` | `arrowright` $\to$ | P3 q3-c, q3-d |
| `0xB3` | `³` | **`greaterequal` $\ge$** | P3 q3-a (3×) |
| `0xB4` | `´` | `multiply` $\times$ | exercice 3 (`¥*´¥*`) |
| `0xBA` | `º` | `equivalence` $\equiv$ | exercice 3 (congruence) |
| `0xCE` | `Î` | `element` $\in$ | P3 q1-c, q2-a, q2-b |
| `0xE6 E7 E8 / 0xF6 F7 F8` | `æ ç è / ö ÷ ø` | `parenleft/right` `tp ex bt` | P3 q1-c (parenthèse extensible) |
| `0xF2` | `ò` | **`integral` $\int$** | P2 q2-a (2×) |

Dix correspondances exactes, sans une seule exception, sur des symboles de
familles sans rapport (quantificateur, relations d'ordre, opérateur, morceaux
de parenthèse, intégrale). Ce n'est pas une coïncidence : la chaîne de
production a lu des **octets encodés en Symbol** comme du Latin-1, puis les a
composés en Times New Roman. `0xA3` = `lessequal` et `0xB3` = `greaterequal`
dans l'encodage Symbol : **`£` vaut $\le$ et `³` vaut $\ge$, sans ambiguïté
possible.**

*Précision sur le mécanisme — correction à la NOTE DE LECTURE.* La note dit
que `F17` est « un sous-ensemble Type0 dont la table `ToUnicode` renvoie vers
du Latin-1 », comme si la `ToUnicode` était le défaut. Vérifié : `F17` est
**réellement incorporée** (273 884 octets de TrueType, `Identity-H`), et ses
glyphes *sont* bel et bien `£`, `³`, `¥`, `ò`, `æ`… La `ToUnicode` est fidèle.
Le dégât est **cuit dans le PDF officiel** : n'importe quel lecteur conforme
affichera les mêmes mauvais glyphes. Ce n'est donc ni un artefact du
rastériseur d'AlloSchool, ni un artefact de mon rendu local — les deux
montrent la même chose, et c'est ce que la comparaison au pixel ci-dessus
établit. *(Que la corruption soit survenue en amont, dans le document Word,
est l'explication la plus probable ; c'est une inférence, pas une mesure.)*

*Élimination.* Deux ressources de la page s'appellent « Times New Roman » :
`F15` (TrueType/WinAnsi) et `F17` (Type0/Identity-H). `F15` déclare
`FirstChar 40 / LastChar 125` : elle **ne peut pas** encoder 0xA3, 0xA5, 0xB3.
Tous les glyphes cassés viennent donc de `F17`, et de `F17` seule — y compris
ceux de l'exercice 3. C'est ce qui fonde le paragraphe suivant.

---

### Point 1 — chaque `£` et chaque `³`, une par une

**Recompte : 7 `£` et 3 `³` dans l'exercice 4, toutes en Partie 3 (page 5).
Aucune ailleurs dans l'exercice.** (Balayage exhaustif des caractères
non-ASCII des pages 3, 4 et 5 : la page 4 n'en contient **aucun** des deux, et
la seule occurrence de `£` sur la page 3 appartient à l'**exercice 2**.)

Chaque occurrence est repérée par ses coordonnées PDF réelles (points, origine
du caractère), pas par un rang de lecture.

| # | Question | y | x | GID | Lu | Preuve mathématique indépendante |
|---|---|---|---|---|---|---|
| 1 | P3 q2-a, borne gauche | 222,0 | 292,9 | 133 | $\le$ | $\frac{1}{1+t}\ge 1-t \iff 1\ge 1-t^2 \iff t^2\ge0$ — vrai pour tout $t$ |
| 2 | P3 q2-a, borne droite | 222,0 | 328,3 | 133 | $\le$ | $\frac{1}{1+t}\le 1-t+t^2 \iff 1\le 1+t^3 \iff t^3\ge0$ — vrai car $t\ge0$ |
| 3 | P3 q2-b, borne gauche | 257,8 | 297,1 | 133 | $\le$ | intégration de (1) sur $[0,x]$ : $x-\frac{x^2}{2}\le\ln(1+x)$ |
| 4 | P3 q2-b, borne droite | 257,8 | 379,0 | 133 | $\le$ | intégration de (2) sur $[0,x]$ : $\ln(1+x)\le x-\frac{x^2}{2}+\frac{x^3}{3}$ |
| 5 | P3 q3-b, borne gauche | 343,5 | 232,0 | 133 | $\le$ | voir point 6 — $\times(-2a_n^2)$ retourne l'inégalité droite de q2-b |
| 6 | P3 q3-b, borne droite | 343,5 | 268,2 | 133 | $\le$ | voir point 6 — $\times(-2a_n^2)$ retourne l'inégalité gauche de q2-b |
| 7 | P3 q3-c | 401,9 | 208,6 | 133 | $\le$ | $\sqrt{n/6}\le a_n$ : de q3-b, $\frac{2a_n^2}{n}\ge1-\frac{2}{3a_n}\ge\frac13$ (car $a_n\ge1$), d'où $a_n^2\ge n/6$ |
| 8 | P3 q3-a, $a_4$ | 313,2 | 197,5 | 241 | $\ge$ | $f(a_4)=e^{-1/4}=0{,}7788>0{,}7358=2e^{-1}=f(1)$ et $f$ croissante $\Rightarrow a_4>1$ |
| 9 | P3 q3-a, $a_n$ | 313,2 | 333,8 | 241 | $\ge$ | $(a_n)$ croissante et $n\ge4$ $\Rightarrow a_n\ge a_4\ge1$ |
| 10 | P3 q3-a, $e^{3/4}$ | 313,2 | 490,8 | 241 | $\ge$ | $e^{3/4}=2{,}117\ldots>2$. Avec $\le$ l'énoncé serait **faux** |

**Les trois encadrements à deux bornes — le piège nommé par le docket.**
Inverser les deux sens ensemble est invisible à l'œil ; ça ne l'est pas au
calcul :

- **q2-a inversé** donnerait $1-t\ge\frac{1}{1+t}\ge 1-t+t^2$, donc
  $1-t \ge 1-t+t^2$, donc $t^2\le0$ : faux dès que $t>0$.
- **q2-b inversé** donnerait $-\frac{x^2}{2}\ge -x+\ln(1+x)\ge -\frac{x^2}{2}+\frac{x^3}{3}$,
  donc $0\ge\frac{x^3}{3}$ : faux dès que $x>0$.
- **q3-b inversé** donnerait $1\le\frac{2a_n^2}{n}\le 1-\frac{2}{3a_n}$, donc
  $\frac{2}{3a_n}\le 0$ : faux puisque $a_n>0$.

Dans les trois cas, **le sens imprimé est le seul qui rende l'énoncé vrai**.
Cette adjudication ne repose ni sur la forme du glyphe, ni sur l'attente du
lecteur.

*(Rappel utile pour qui reprendra ce PDF : hors exercice 4, le même `£`/GID 133
est mis pour $\mathbb{C}$ — l'exercice 2 imprime « $m$ `Î` `£` \\{0,1,i} ». La
table de lecture le signalait déjà ; c'est confirmé, et c'est le même GID, donc
**l'encodage ne discrimine pas**. Dans l'exercice 4 il n'y a aucun complexe :
les 7 sont des $\le$.)*

---

### Point 2 — chaque `¥`, une par une

**Recompte : 5 `¥` dans l'exercice 4 — 4 pour $+\infty$, 1 pour $\mathbb{N}$ —
plus 4 dans l'exercice 3, hors périmètre.** *(Le docket rappelait qu'en 2022 une
« estimation à une dizaine » cachait 18 occurrences. Ici : compté, pas estimé —
balayage exhaustif des points de code de chaque page, avec coordonnées.)*

| # | Où | Page | y | x | GID | Lu | Ce qui tranche |
|---|---|---|---|---|---|---|---|
| 1 | P3 q1-c, `(∀n Î ¥*)` | 5 | 183,7 | 210,9 | 150 | **$\mathbb{N}$** | La q1-a écrit le même quantificateur **en toutes lettres** : « pour tout entier naturel non nul $n$ ». Et « $\infty^*$ » ne veut rien dire |
| 2 | P3 q2-a, `[0,+¥ [` | 5 | 222,0 | 224,2 | 150 | **$+\infty$** | Précédé d'un `+`, encadré par `[ … [` : c'est une borne d'intervalle. Et l'inégalité de q2-a est vraie sur $[0,+\infty[$ tout entier |
| 3 | P3 q2-b, `[0,+¥[` | 5 | 257,8 | 231,7 | 150 | **$+\infty$** | idem |
| 4 | P3 q3-c, sous `lim` : `n ® + ¥` | 5 | 438,5 | 177,3 | 150 | **$+\infty$** | Sous un `lim`, précédé de `n ®` ($n\to$) et d'un `+` |
| 5 | P3 q3-d, sous `lim` : `n ® + ¥` | 5 | 474,0 | 186,6 | 150 | **$+\infty$** | idem |
| — | **exercice 3** (hors périmètre) | 3 | 484,9 | 216,6 / 245,9 | 150 | $\mathbb{N}$ | « le couple $(x,y)$ de `¥*´¥*` » |
| — | **exercice 3** (hors périmètre) | 3 | 596,8 | 397,3 / 426,6 | 150 | $\mathbb{N}$ | idem |

**Le fait dur, et il faut le dire tel quel : le glyphe ne discrimine pas.** Les
neuf occurrences du document portent **le même GID 150** et le même point de
code `0xA5`, qu'elles vaillent $\mathbb{N}$ ou $+\infty$. La clé Symbol
(`0xA5` = `infinity`) explique les quatre $+\infty$ ; elle **n'explique pas**
les $\mathbb{N}$. La lecture honnête est donc : une **seconde** police source —
celle des lettres ajourées $\mathbb{N},\mathbb{C}$ — a été écrasée sur les
mêmes codes, et la substitution a effacé son identité. Je ne peux pas la
nommer depuis le fichier, et je ne la devine pas.

Ce que je peux affirmer : **dans l'exercice 4, les cinq occurrences sont
tranchées sans recours à la forme du glyphe** — par le texte français de la
q1-a pour la première, par la syntaxe d'intervalle et de limite pour les
quatre autres.

---

### Point 3 — le signe de l'exposant : $e^{-\frac{1}{x}}$, confirmé trois fois

C'était le point où une erreur aurait coûté tout l'exercice. **Trois preuves
indépendantes, dont deux non visuelles :**

1. **Au niveau du code de caractère.** Dans la définition de $f$ (page 3,
   ligne $y\approx696{,}3$, $x=427{,}2$), le signe de l'exposant est un
   caractère de la police **`F20` = SymbolMT**, correctement incorporée, de
   code **`0x2D`** = `minus` dans l'encodage Symbol. Ce n'est pas un trait
   d'union : c'est le vrai signe moins. La pile complète relevée caractère par
   caractère est : `e` (x=421,0) · `−` (x=427,2) · `1` (x=435,8, au-dessus) ·
   `x` (x=436,3, en dessous) → $e^{-\frac{1}{x}}$.
2. **Par une autre question, sur une autre page.** L'IPP de **P2 q2-a** ne
   tient qu'avec le moins :
   $\int_x^1 e^{-1/t}dt = [t\,e^{-1/t}]_x^1 - \int_x^1 t\cdot\frac{1}{t^2}e^{-1/t}dt
   = e^{-1} - x e^{-1/x} - \int_x^1 \frac{1}{t}e^{-1/t}dt$ —
   **exactement** la ligne imprimée. Avec $e^{+1/t}$ le calcul ne retombe pas.
3. **Par la valeur numérique de P1 q3-b.** Le point d'inflexion est en
   $x=1/3$ (car $f''(x)=e^{-1/x}x^{-5}(1-3x)$) et $f(1/3)=4e^{-3}=0{,}199$ —
   or le scan imprime « $4e^{-3}\ ;\ 0{,}2$ ». Avec $e^{+1/x}$ on aurait
   $4e^{3}\approx80$, incompatible avec le repère de tracé fourni.

Recadrage ×20 sur l'exposant à titre de confirmation visuelle : le moins est
net. **Le signe est bien négatif.** *(En prime, la même vérification confirme
le domaine $[0,+\infty[$ et le quantificateur $(\forall x\in\,]0,+\infty[)$ :
sur la page 3, ces symboles sont de vrais glyphes SymbolMT — `0x5B`/`0x5D`
pour les crochets, `0xA5` pour $\infty$, `0x22` pour $\forall$, `0xCE` pour
$\in$ — ce qui confirme la NOTE DE LECTURE : la Partie 1 s'imprime juste.)*

---

### Point 5 — P3 q1-c : l'identité, confirmée sur le scan

Relevée caractère par caractère à sa position, page 5, ligne $y\approx172$ :

`(` `"`(∀) `n` `Î`(∈) `¥`(ℕ) `*` `)` puis `−` [fraction `1`/`a`+indice `n`]
`+` `ln` `(` `1` `+` [fraction `1`/`a`+indice `n`] `)` `=` `−`
[fraction `1`/`n`]

soit exactement
$$\left(\forall n \in \mathbb{N}^{*}\right)\quad -\frac{1}{a_n} + \ln\left(1+\frac{1}{a_n}\right) = -\frac{1}{n}$$

Confirmé au recadrage ×6 sur le JPEG, et re-dérivé : $f(a_n)=e^{-1/n}$ avec
$f(a_n)=\left(1+\frac{1}{a_n}\right)e^{-1/a_n}$ ; en passant au logarithme,
$\ln\left(1+\frac{1}{a_n}\right)-\frac{1}{a_n}=-\frac{1}{n}$. **Identique à
l'imprimé, aux termes près qui commutent.** Rien à corriger dans la
transcription.

---

### Point 6 — P3 q3-b : l'encadrement, confirmé et re-dérivé

Relevé caractère par caractère, page 5, ligne $y\approx331{,}9$ :
`1` `−` [fraction `2` / `3a`+indice `n`] `£` [fraction `2a`+indice `n`+exposant `2` / `n`] `£` `1`

soit
$$1 - \frac{2}{3a_n} \;\le\; \frac{2a_n^2}{n} \;\le\; 1$$

Confirmé au recadrage ×8. **Re-dérivation complète**, qui est aussi la preuve
des occurrences 5 et 6 du point 1 :

Poser $x=\dfrac{1}{a_n}$ (licite : $a_n\ge1>0$ pour $n\ge4$, donc $x\in\,]0,1]\subset[0,+\infty[$).
La q2-b donne
$$-\frac{1}{2a_n^{2}} \;\le\; -\frac{1}{a_n}+\ln\!\left(1+\frac{1}{a_n}\right) \;\le\; -\frac{1}{2a_n^{2}}+\frac{1}{3a_n^{3}}$$
et la q1-c remplace le membre central par $-\dfrac{1}{n}$ :
$$-\frac{1}{2a_n^{2}} \;\le\; -\frac{1}{n} \;\le\; -\frac{1}{2a_n^{2}}+\frac{1}{3a_n^{3}}$$
Multiplier par $-2a_n^{2}$ — **négatif, donc les deux inégalités se
retournent** :
$$1 \;\ge\; \frac{2a_n^{2}}{n} \;\ge\; 1-\frac{2}{3a_n}$$
c'est-à-dire, réécrit dans l'ordre imprimé,
$1-\frac{2}{3a_n}\le\frac{2a_n^{2}}{n}\le 1$. **Exactement l'énoncé.**

Le docket avait raison de relier ce point au point 1 : c'est ce
retournement-là qui explique pourquoi les deux `£` de q3-b pointent dans le
même sens que ceux de q2-b alors que la chaîne de déduction les inverse. Un
transcripteur qui aurait « corrigé » l'un des deux aurait produit un énoncé
faux et indémontrable.

*(Cohérence aval, gratuite mais rassurante : q3-c en déduit
$\sqrt{n/6}\le a_n$ — vérifié ci-dessus — et q3-d demande
$\lim a_n\sqrt{2/n}$, qui vaut $1$ par encadrement direct depuis q3-b. La
chaîne q1-c → q2-b → q3-b → q3-c → q3-d se referme sans reste.)*

---

### Corrections apportées à la passe précédente

Rien n'est lissé : voici les deux endroits où je ne dis pas la même chose
qu'elle, et comment j'ai tranché.

1. **Le glyphe de l'intégrale de P2 q2-a est `ò` (minuscule, U+00F2), pas `Ò`
   (majuscule, U+00D2).** La table le décrivait comme « O majuscule accent
   grave gras » — c'est la description de ce qu'on *voit* (le glyphe est
   composé en grand corps, il paraît capital), mais le point de code est
   minuscule. J'ai corrigé la ligne dans la table. **La correction n'est pas
   cosmétique** : `0xF2` est précisément `integral` dans l'encodage Symbol,
   alors que `0xD2` y est `registerserif`. Le vrai code confirme la lecture
   $\int$ ; le code faussement relevé ne l'aurait pas confirmée. *Méthode :
   énumération des points de code non-ASCII de la page 4, puis recadrage ×7.*
2. **La colonne « Base de l'adjudication » de la table promet plus que le GID
   ne donne.** Le relevé de GID est exact (je retrouve les six mêmes), mais un
   GID de Times New Roman ne porte pas le sens d'une inégalité. La base réelle
   — et suffisante — est la correspondance avec l'encodage **Adobe Symbol**,
   établie ci-dessus sur dix points de code. Je n'ai pas réécrit la table :
   j'ai ajouté la preuve manquante plutôt que d'effacer la trace.

Sur tout le reste, **je confirme la passe précédente sans réserve** : les
comptes d'occurrences (`£` 7, `³` 3, `¥` 5, `"` 3, `Î` 3, `®` 2, parenthèses
extensibles en q1-c seulement, `ò` 2, la boîte vide 1), le confinement de la
substitution à la Partie 3 plus deux endroits isolés de la page 4, le barème,
et l'adjudication du `;` à l'octet.

### Défauts du sujet officiel — ce qui reste à porter à la conversion

Aucun n'est un défaut de transcription. Tous sont dans le document publié.

1. **Le `;` de P1 q3-b** là où le sens exige $\simeq$ (déjà établi à l'octet
   par la passe précédente ; l'OCR le relit indépendamment `f (1); 0,7`).
   Deux occurrences.
2. **La substitution de police** sur toute la Partie 3 et sur les deux $\int$
   de P2 q2-a. Cuite dans le PDF officiel : police incorporée, glyphes
   réellement faux. Un élève qui télécharge ce sujet voit `£` et `³` à la
   place de $\le$ et $\ge$.
3. **Le $\mathbb{N}$ absent de P2 q4-b** : à sa place, le PDF pose une **image
   de 2×2 pixels** (bbox `[208,5 · 657,9 · 230,4 · 671,5]`, dimensions
   déclarées 2×2), étirée. Le symbole n'est pas cassé — il est **absent**.
   $\mathbb{N}^{*}$ y reste une **adjudication par le contexte**, et le fichier
   le dit déjà à sa place. Confirmé : l'OCR lit `(vn el )`, sans rien entre
   `∈` et `*`.

Ces trois-là sont documentés, pas réparés, conformément à la règle.

---

### Verdict de la passe de reprise

**Les cinq points ouverts (1, 2, 3, 5, 6) sont soldés**, chacun par au moins un
recoupement non visuel, et les points 4 et 7 tiennent (le 7 est même reconfirmé
par l'OCR). **Les quatre contrôles anti-CDN demandés ont tous été faits**, plus
deux ajoutés (concordance JPEG↔PDF au pixel, OCR intégral du corps).

**Aucune valeur illisible ne subsiste dans l'exercice 4**, à une exception près,
qui était déjà déclarée et le reste : le $\mathbb{N}^{*}$ de **P2 q4-b**, absent
du document, adjugé par le contexte. Ce n'est pas un trou comblé au jugé — c'est
un trou signalé, localisé, et corroboré par la q1-c de la Partie 3 qui écrit le
même quantificateur avec un glyphe présent.

**Le fichier est cleared pour conversion.**
