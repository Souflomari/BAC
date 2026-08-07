# `denombrement` — Dénombrement & probabilités combinatoires (tirages simultanés, combinaisons)

> Annales examen national, Mathématiques 2ème Bac. Transcriptions **non
> vérifiées** — voir `README.md` §3. Provenance sur chaque entrée.
> Exercices de **probabilité par dénombrement** (urne, tirage simultané,
> équiprobabilité, combinaisons $\binom{n}{p}$) — sans conditionnement ni
> variable aléatoire. Les exercices avec arbre pondéré / probabilité
> conditionnelle / loi d'une variable aléatoire sont sous
> `probabilites-conditionnelles.md`.

---

## 2019 — session normale — Exercice 3
Source: https://www.alloschool.com/element/68527
Statut: vérifié — agent-vérificateur-adversarial, 2026-07-12 : source re-fetchée indépendamment (element → course/upload re-dérivé) et diff caractère-par-caractère conforme au scan (valeurs, notation, indices, exposants, barèmes, énoncé) ; filière et code NS..F confirmés sur l'en-tête du scan.

- Filière / épreuve : SVT **et** Sciences Physiques (BIOF) — Mathématiques, 3 h, coef 7
- Code sujet : NS 22F · Barème de l'exercice : 3 points
- Images lues : `.../course-438/upload-54971/0002-big.jpg`
- Pages du scan : 2 (sur 4)

**Calcul des probabilités (tirage simultané de 3 boules).**

Une urne contient dix boules : trois boules vertes, six boules rouges et une boule noire indiscernables au toucher. On tire au hasard et simultanément trois boules de l'urne.

On considère les événements suivants :
- $A$ : « Obtenir trois boules vertes. »
- $B$ : « Obtenir trois boules de même couleur. »
- $C$ : « Obtenir au moins deux boules de même couleur. »

1. (2) Montrer que $p(A) = \dfrac{1}{120}$ et $p(B) = \dfrac{7}{40}$
2. (1) Calculer $p(C)$.

---

## 2022 — session normale — Exercice 3
Source: https://www.alloschool.com/element/136586
Statut: vérifié — agent-vérificateur-adversarial, 2026-07-12 : source re-fetchée indépendamment (element → course/upload re-dérivé) et diff caractère-par-caractère conforme au scan (valeurs, notation, indices, exposants, barèmes, énoncé) ; filière et code NS..F confirmés sur l'en-tête du scan.

- Filière / épreuve : SVT **et** Sciences Physiques (BIOF) — Mathématiques, 3 h, coef 7
- Code sujet : NS 22F · Barème de l'exercice : 3 points
- Images lues : `.../course-438/upload-84495/0003-big.jpg`
- Pages du scan : 3 (sur 4)

**Calcul des probabilités (tirage simultané de 3 boules).**

Une urne contient dix boules : trois boules blanches, trois boules vertes et quatre boules rouges indiscernables au toucher. On tire au hasard simultanément trois boules de l'urne.

1. (0,75) Montrer que $p(A) = \dfrac{1}{6}$ ; où $A$ est l'évènement « N'obtenir aucune boule rouge »
2. (0,75) Calculer $p(B)$ ; où $B$ est l'évènement « Obtenir trois boules blanches ou trois boules vertes »
3. (0,75) Montrer que $p(C) = \dfrac{1}{2}$ ; où $C$ est l'évènement « Obtenir exactement une boule rouge »
4. (0,75) Calculer $p(D)$ ; où $D$ est l'évènement « Obtenir au moins deux boules rouges »

---

## 2024 — session normale — Exercice 4
Source: https://www.alloschool.com/element/144505
Statut: vérifié — agent-vérificateur-adversarial, 2026-08-06 : source re-fetchée indépendamment (element 144505 → course-438/upload-87124 re-dérivé, 4 pages, page 3), diff caractère-par-caractère conforme au scan (urne de 7 boules : 4 portant le n°1, 2 portant le n°2, 1 portant le n°3 ; tirage simultané de 2 ; $p(A)=\tfrac13$, $p(B)=\tfrac{5}{21}$, questions $p(A\cap B)$ et indépendance ; barème $0{,}5\times4 = 2$) ; maths re-dérivées : $\binom{7}{2}=21$, $A$ = même numéro → $\binom{4}{2}+\binom{2}{2}=6+1=7$ ⇒ $p(A)=\tfrac{7}{21}=\tfrac13$, $B$ = somme $4$ → $(1,3):4\times1$ et $(2,2):1$ = $5$ ⇒ $p(B)=\tfrac{5}{21}$, $A\cap B=\{(2,2)\}$ ⇒ $p(A\cap B)=\tfrac{1}{21}$, $p(A)p(B)=\tfrac{5}{63}\neq\tfrac{1}{21}$ ⇒ non indépendants ; classification combinatoire-pure confirmée indépendamment (tirage simultané unique, comptage par combinaisons, aucun conditionnement / arbre pondéré / $p(A/B)$ / loi d'une variable aléatoire) — c'est bien du dénombrement et non des probabilités conditionnelles ; filière Sciences Expérimentales (مسلك علوم الحياة والأرض ومسلك العلوم الفيزيائية خيار فرنسية) et code NS 22F confirmés sur l'en-tête du scan.

- Filière / épreuve : Sciences Expérimentales (SVT et Sc. Physiques) — مسلك علوم الحياة والأرض ومسلك العلوم الفيزيائية (خيار فرنسية) (BIOF) — Mathématiques, 3 h, coef 7
- Code sujet : NS 22F · Barème de l'exercice : 2 points
- Images lues : `.../course-438/upload-87124/0003-big.jpg`
- Pages du scan : 3 (sur 4)

> **Note de lecture (mojibake)** : aucun (lecture directe du scan image).

**Calcul des probabilités (tirage simultané de 2 boules, événements indépendants).**

Une urne contient sept boules : quatre boules portant le numéro 1, deux boules portant le numéro 2 et une boule portant le numéro 3. Toutes les boules sont indiscernables au toucher.
On tire simultanément au hasard deux boules de cette urne.

1. (0,5) Montrer que $p(A) = \dfrac{1}{3}$, où $A$ est l'évènement « les deux boules tirées portent le même numéro »
2. (0,5) Montrer que $p(B) = \dfrac{5}{21}$, où $B$ est l'évènement « La somme des numéros des boules tirées est 4 »
3. (0,5) Calculer $p(A \cap B)$
4. (0,5) Les événements $A$ et $B$ sont-ils indépendants ? Justifier.

## 2018 — session normale — Exercice 3
Source: https://www.alloschool.com/element/94699
Statut: transcrit (non vérifié — brouillon Gemini gemini-pro-latest, formaté par l'orchestrateur) — 2026-08-07, transcription depuis scan course-438/upload-70450, page(s) 3. À faire vérifier (README §3).

- Filière / épreuve : Sciences Expérimentales (SVT et Sc. Physiques) — مسلك علوم الحياة والأرض ومسلك العلوم الفيزيائية — خيار فرنسية — Mathématiques, 3 h, coef 7
- Code sujet : NS 22F · Barème de l'exercice : 3 points
- Images lues : `.../course-438/upload-70450/0003-big.jpg`
- Pages du scan : 3 (sur 4)

> **Note de lecture** : brouillon issu de la voie Gemini (première passe de volume) — à confronter au scan en vérification adversariale. **Classement** : combinatoire pur en Q1 (urne, tirage simultané, comptage) → ce fichier ; la Q2 introduit une variable aléatoire **binomiale** (répétition avec remise) — extension au-delà du comptage pur, signalée pour la conversion en banque.

**Dénombrement (urne, tirage simultané, puis variable binomiale).**

Une urne contient $9$ boules indiscernables au toucher : **cinq boules rouges** portant les nombres $1\ ;\ 1\ ;\ 2\ ;\ 2\ ;\ 2$ et **quatre boules blanches** portant les nombres $1\ ;\ 2\ ;\ 2\ ;\ 2$.

On considère l'expérience suivante : on tire au hasard et simultanément trois boules de l'urne.

Soient les événements :
$A$ : « les trois boules tirées sont de même couleur » ;
$B$ : « les trois boules tirées portent le même nombre » ;
$C$ : « les trois boules tirées sont de même couleur et portent le même nombre ».

1) (1,5) Montrer que $p(A) = \frac{1}{6}$, $p(B) = \frac{1}{4}$ et $p(C) = \frac{1}{42}$.
2) On répète l'expérience précédente trois fois avec remise dans l'urne des trois boules tirées après chaque tirage, et on considère la variable aléatoire $X$ qui est égale au nombre de fois de réalisation de l'événement $A$.
   a) (0,5) Déterminer les paramètres de la variable aléatoire binomiale $X$.
   b) (1) Montrer que $p(X = 1) = \frac{25}{72}$ et calculer $p(X = 2)$.

*(Somme du barème : 1,5 + 0,5 + 1 = 3 points.)*

---
