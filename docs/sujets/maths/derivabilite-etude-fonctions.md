# `derivabilite-etude-fonctions` — Dérivabilité, théorèmes de Rolle et des accroissements finis, point d'inflexion

> Annales examen national, Mathématiques 2ème Bac. Cette notion n'a **pas
> d'exercice national dédié** — confirmé dans `docs/sujets/maths/INDEX.md` §3-4 :
> « `derivabilite-etude-fonctions` | (embarqué dans problèmes d'analyse) |
> **cross-list — pas d'exercice dédié** ». Elle apparaît partout en filigrane
> dans les problèmes d'analyse (étude de fonction complète, tableau de
> variations) mais n'est jamais isolée dans un exercice à part entière — sauf
> pour un point précis (Rolle / TAF / point d'inflexion), qui EST isolable
> comme sous-partie autonome d'un problème déjà transcrit et vérifié.

> **Décision de sourcing (campagne summit-conversion, verrouillée) :** en
> l'absence d'exercice dédié, le r-bac de cette notion est sourcé par
> **extrait** d'un problème d'analyse déjà transcrit et vérifié pour une autre
> notion — `fonction-exponentielle.md`, entrée « 2019 — session normale —
> Exercice 4 (filière SM) », Partie I. Cette entrée cross-liste déjà
> explicitement `derivabilite-etude-fonctions` dans sa ligne « Recoupe » :
> « Rolle, TAF, point d'inflexion ». L'extrait ci-dessous ne reprend QUE les
> questions Q2a et Q3(a,b,c) de cette Partie I — pas le reste du problème
> (limites, tableau de variations complet, branches infinies, intégrale,
> suite — questions Q1, Q2b-d, Q4, Q5 et Partie II — qui relèvent d'autres
> notions, déjà cross-listées ailleurs : `limites-continuite`,
> `calcul-integral`, `suites-numeriques`).

---

## 2019 — session normale — Exercice 4, Partie I *(extrait — Q2a et Q3)* *(filière SM)*

Source: https://www.alloschool.com/element/68482
Statut: vérifié — provenance intégralement reprise de l'entrée déjà vérifiée
dans `docs/sujets/maths/fonction-exponentielle.md` (agent-vérificateur-adversarial,
2026-07-12 : source re-fetchée indépendamment — element/68482 →
course-436/upload-54931, p.4-5 — et diffée caractère-par-caractère contre le
scan ; filière SM et code NS 24F confirmés sur l'en-tête du scan). Aucune
re-vérification indépendante supplémentaire n'a été faite pour CET extrait
spécifiquement : c'est un sous-ensemble d'un texte déjà vérifié dans son
intégralité, transcrit ici sans modification.

- Filière / épreuve : Sciences Mathématiques (A) et (B), خيار فرنسية (BIOF) —
  Mathématiques, 4 h, coef 9
- Code sujet : NS 24F · Barème de l'extrait : Q2a (0,5) + Q3a (0,5) + Q3b (0,5)
  + Q3c (0,25) = 1,75 point sur les 10 de l'exercice complet
- Images lues : `.../course-436/upload-54931/0004-big.jpg`
- Pages du scan : 4 (sur 5)
- Portée : seules les questions **2a** (dérivabilité de $f$ sur $\mathbb{R}$ et
  expression de $f'$) et **3a, 3b, 3c** (théorème de Rolle appliqué à $f'$ →
  théorème des accroissements finis appliqué à $f''$ → conclusion : point
  d'inflexion) sont reprises ici. Le reste de l'exercice (Q1, Q2b-d, Q4, Q5,
  Partie II) est hors périmètre de cette notion et reste documenté dans
  `fonction-exponentielle.md`.

**Étude d'une fonction avec $e^{-x}$ — extrait ciblé sur la dérivabilité, le
théorème de Rolle, le théorème des accroissements finis (TAF), et le point
d'inflexion.**

Contexte transcrit intégralement (nécessaire pour que l'extrait se suffise à
lui-même) :

> **PARTIE I :** On considère la fonction $f$ définie sur $\mathbb{R}$ par :
> $f(x) = 4x\left(e^{-x} + \dfrac{1}{2}x - 1\right)$
> et on note $(C)$ sa courbe représentative dans un repère orthonormé
> $(O;\vec{i},\vec{j})$

Questions reprises, citées verbatim :

> **2.** a) (0,5) Montrer que $f$ est dérivable sur $\mathbb{R}$ et que
> $(\forall x \in \mathbb{R})\ ;\ f'(x) = 4\left(e^{-x} - 1\right)(1 - x)$

> **3.** a) (0,5) En appliquant le théorème de ROLLE à la fonction $f'$,
> montrer qu'il existe un réel $x_0$ de l'intervalle $]0,1[$ tel que :
> $f''(x_0) = 0$
>
> b) (0,5) En appliquant le théorème des accroissements finis à la fonction
> $f''$, montrer que, pour tout réel $x$ différent de $x_0$ de l'intervalle
> $[0,1]$, on a : $\dfrac{f''(x)}{x - x_0} > 0$
>
> c) (0,25) En déduire que $I\left(x_0, f(x_0)\right)$ est un point
> d'inflexion de la courbe $(C)$

*(Questions non reprises ici, pour référence : 2b « étudier les variations de
$f$ » ; 2c « existence d'un unique $\alpha \in ]3/2,2[$ tel que $f(\alpha)=0$ » ;
2d « vérifier $e^{-\alpha}=1-\alpha/2$ » ; 4 « branches infinies + tracé » ;
5 « signe de $f$, intégrale $\int_0^\alpha f$, aire » ; Partie II « suite
$u_{n+1}=f(u_n)+u_n$ » — toutes relèvent d'autres notions déjà cross-listées
dans `fonction-exponentielle.md`.)*

---

## Cross-lists — dérivabilité dans le sujet 2020 SExp (session normale, NS 22F, `element/109797`)

La dérivabilité est présente dans les deux volets d'analyse du sujet 2020
SExp session normale, transcrits **in extenso** ailleurs (scan
course-438/upload-80918, transcription 2026-08-06, non vérifiée) :

- **Exercice 3, Q1-a/b** (« Limites, dérivabilité et calcul intégral ») :
  dérivée $g'(x) = \dfrac{\sqrt{x}-1}{x}$ et croissance de
  $g(x) = 2\sqrt{x} - 2 - \ln x$ sur $[1,+\infty[$ — au service d'un
  encadrement puis d'une limite de croissances comparées.
  → `limites-continuite.md`.
- **Problème, Q4, Q5 et Q8** : dérivée $f'(x) = -\left(e^{x-2} - 1\right)^2$
  et tableau de variations (Q4), dérivée seconde et point d'inflexion
  $A(2,2)$ (Q5), fonction réciproque et $\left(f^{-1}\right)'(2 - \ln 3)$
  (Q8). → `fonction-exponentielle.md`.

---

## Note d'usage pour cette notion

`derivabilite-etude-fonctions` ne possède aucune entrée « pleine » dans cette
banque : ce fichier existe uniquement pour porter la provenance de l'extrait
utilisé comme r-bac dans `content/maths/derivabilite-etude-fonctions/exercises.yaml`.
Si un futur passage de collecte trouve un exercice/problème dédié isolant
Rolle/TAF/point d'inflexion sans dépendre d'un extrait, cette entrée devrait
être complétée (ou remplacée) en conséquence — voir `INDEX.md` §4.2 pour le
suivi de cette dette.
