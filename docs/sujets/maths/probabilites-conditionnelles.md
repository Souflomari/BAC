# `probabilites-conditionnelles` — Probabilités conditionnelles (arbre pondéré, variable aléatoire, loi)

> Annales examen national, Mathématiques 2ème Bac. Transcriptions **non
> vérifiées** — voir `README.md` §3 pour le protocole (re-fetch + diff
> indépendants). Provenance sur chaque entrée. Toute figure décrite
> textuellement ; toute lecture d'échelle incertaine est signalée.

---

## 2023 — session normale — Exercice 3  *(entrée pilote)*
Source: https://www.alloschool.com/element/137482
Statut: transcrit (non vérifié)

- Filière / épreuve : SVT **et** Sciences Physiques (مسلك علوم الحياة والأرض ومسلك العلوم الفيزيائية), خيار فرنسية (BIOF) — Mathématiques, 3 h, coef 7
- Code sujet : NS 22F · Barème de l'exercice : 3 points
- Images lues : `.../course-438/upload-84924/0003-big.jpg`
- Pages du scan : 3 (sur 4)

**Calcul des probabilités.**

Une urne $U_1$ contient six boules portant les nombres : $0\ ;\ 0\ ;\ 1\ ;\ 1\ ;\ 1\ ;\ 2$ et une urne $U_2$ contient cinq boules portant les nombres : $1\ ;\ 1\ ;\ 1\ ;\ 2\ ;\ 2$.

On suppose que les boules des deux urnes sont indiscernables au toucher.

On considère l'expérience aléatoire suivante :

« On tire une boule de l'urne $U_1$ et on note le nombre $a$ qu'elle porte, puis on la met dans l'urne $U_2$, ensuite on tire une boule de l'urne $U_2$ et on note le nombre $b$ qu'elle porte ».

On considère les événements suivants :
- $A$ : « la boule tirée de l'urne $U_1$ porte le nombre $1$ »
- $B$ : « le produit $ab$ est égal à $2$ »

1. a) (0,5) Calculer $p(A)$ ; la probabilité de l'événement $A$.
   b) (0,5) Montrer que $p(B) = \dfrac{1}{4}$ *(On peut utiliser l'arbre des possibilités)*
2. (0,75) Calculer $p(A/B)$ ; probabilité de l'événement $A$ sachant que l'événement $B$ est réalisé.
3. Soit $X$ la variable aléatoire qui associe à chaque résultat de l'expérience, le produit $ab$
   1. a) (0,25) Montrer que $p(X = 0) = \dfrac{1}{3}$
   2. b) (0,5) Donner la loi de probabilité de $X$ *(Remarquer que les valeurs prises par $X$ sont : $0\ ;\ 1\ ;\ 2$ et $4$)*
   3. c) (0,5) On considère les événements :
      $M$ : « le produit $ab$ est pair non nul » et $N$ : « le produit $ab$ est égal à $1$ »
      Montrer que les événements $M$ et $N$ sont équiprobables.

> Note de classement : entrée **cœur** de `probabilites-conditionnelles` — elle
> contient explicitement une probabilité conditionnelle $p(A/B)$, un **arbre des
> possibilités** (arbre pondéré) et une **variable aléatoire** $X$ avec sa loi de
> probabilité. C'est l'exercice qui débloque le pilote de conversion maths.
> L'expérience « on met la boule tirée de $U_1$ dans $U_2$ » rend la 2ᵉ épreuve
> dépendante de la 1ʳᵉ (composition de $U_2$ modifiée) : c'est ce qui donne son
> sens au conditionnement.
