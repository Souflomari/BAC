# Examen national Mathématiques — SM — 2017, session NORMALE (NS 25) — exercice 4

> **Fichier d'entrée (`_incoming`) — NON VÉRIFIÉ.** Protocole
> `docs/sujets/maths/README.md`. Rien d'ici ne peut devenir une entrée de
> banque avant qu'un vérificateur **indépendant, qui re-fetche le scan
> lui-même**, ait marqué l'exercice `Statut: vérifié`.
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

Comme le sujet 2022, ce scan substitue les symboles mathématiques. La
substitution est **systématique mais moins étendue** qu'en 2022 : les grandes
parenthèses extensibles y sont plus rares et les fractions restent lisibles.
Table de correspondance établie occurrence par occurrence :

| Rendu à l'écran | Lu comme | Base de l'adjudication |
|---|---|---|
| `"` | $\forall$ | Position en tête de quantificateur |
| `Î` | $\in$ | Toujours entre une variable et un ensemble |
| `¥` | $\mathbb{N}$ ou $+\infty$ | **Deux valeurs**, comme en 2022 : $\mathbb{N}$ dans « $n \in$ ¥$^*$ », $+\infty$ dans « $[0,+$¥$[$ » et sous les `lim` |
| `£` | $\le$ | Toujours dans des encadrements |
| `³` | $\ge$ | Le glyphe « exposant 3 » ; adjugé par le sens (« $a_4$ ³ $1$ » = « $a_4 \ge 1$ ») |
| `®` | $\to$ | Sous les `lim` : « $n$ ® $+$¥ » |
| `æ ö ç ÷ è ø` | grandes parenthèses | Fragments d'une parenthèse extensible |
| `Ò` | $\int$ | Signe d'intégrale (Partie 2, q2-a) |

**Le piège le plus dangereux de ce scan** est le couple `£` / `³` : deux
inégalités **de sens opposé**, rendues par deux glyphes qui ne se ressemblent
pas mais qui ne portent aucun des deux le sens attendu. Chaque occurrence a
été adjugée par la cohérence mathématique, jamais par la forme. Le
vérificateur doit les recompter une à une.

---

## 2017 — session normale — Exercice 4
Source: https://www.alloschool.com/element/57970
Statut: **transcrit (NON vérifié)** — première lecture, 2026-08-27. En attente
d'une passe adversariale indépendante avec re-fetch du scan.

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

**Partie 2** — On considère la fonction numérique $F$ définie sur $[0, +\infty[$ par :

$$F(x) = \int_x^{1} f(t)\,dt$$

1. *(0,25)* Montrer que la fonction $F$ est continue sur l'intervalle $[0, +\infty[$.

2. **a)** *(0,5)* En utilisant la méthode d'intégration par parties, montrer que :

   $$\left(\forall x \in\, ]0, +\infty[\right)\quad \int_x^{1} e^{-\frac{1}{t}}\,dt = e^{-1} - x\,e^{-\frac{1}{x}} - \int_x^{1} \frac{1}{t}\,e^{-\frac{1}{t}}\,dt$$

   **b)** *(0,25)* Déterminer $\displaystyle\int_x^{1}\left(1 + \frac{1}{t}\right)e^{-\frac{1}{t}}\,dt$ pour tout $x$ de $]0, +\infty[$.

   **c)** *(0,5)* Montrer que : $\displaystyle\int_0^{1} f(t)\,dt = e^{-1}$

3. *(0,5)* Calculer, en $cm^2$, l'aire du domaine plan limité par la courbe $(C)$ et les droites d'équations : $x = 0$, $x = 2$ et $y = 0$.

4. On considère la suite numérique $(u_n)_{n \ge 0}$ définie par : $u_n = F(n) - F(n+2)$

   **a)** *(0,5)* En utilisant le théorème des accroissements finis, montrer que pour tout entier naturel $n$, il existe un réel $v_n$ de l'intervalle $]n, n+2[$ tel que :

   $$u_n = 2\left(1 + \frac{1}{v_n}\right)e^{-\frac{1}{v_n}}$$

   **b)** *(0,25)* Montrer que : $\left(\forall n \in \mathbb{N}^{*}\right)\quad 2\left(1+\frac{1}{n}\right)e^{-\frac{1}{n}} \le u_n \le 2\left(1+\frac{1}{n+2}\right)e^{-\frac{1}{n+2}}$

   **c)** *(0,25)* En déduire $\displaystyle\lim_{n \to +\infty} u_n$

**Partie 3**

1. **a)** *(0,5)* Montrer que pour tout entier naturel non nul $n$, il existe un nombre réel strictement positif **unique** $a_n$ tel que : $f(a_n) = e^{-\frac{1}{n}}$

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

## Classement proposé (à confirmer par le vérificateur)

| Exercice | Barème | Slug proposé |
|---|---|---|
| Exercice 4 | 10 pts | **`fonction-exponentielle`** (dominant : $f(x)=(1+1/x)e^{-1/x}$, et l'exponentielle porte l'étude entière) · cross-lists : `limites-continuite` (P1 q1-a, q2-a), `derivabilite-etude-fonctions` (P1 q1-b/c, q3-a le point d'inflexion, P2 q4-a le TAF), `calcul-integral` (P2 tout entière), `suites-numeriques` (P2 q4, P3), `fonction-logarithme` (P3 q1-c et q2-b, où $\ln$ est central) |

**Le choix du slug dominant mérite discussion.** La Partie 3, qui pèse
3,75 pts sur 10, tourne entièrement autour de $\ln(1+x)$ et de son
encadrement — le même mécanisme que le sujet SM 2022 N, classé
`fonction-logarithme`. Deux lectures défendables, à trancher :
`fonction-exponentielle` (la fonction étudiée) ou `fonction-logarithme` (la
machinerie de la dernière partie).

## Ce que la vérification devra trancher en priorité

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
