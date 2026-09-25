# Outillage visuel — DÉCIDÉ, partiellement livré

**Date :** 2026-08-15 · **Statut :** tranché par l'owner —
**M3 Expressive + Mafs + Rive (animations créées dans Figma/Rive)**.
Deux des trois sont livrés ; le troisième est bloqué sur une étape
humaine. État exact au §0.

> Ce fichier s'appelait `OUTILLAGE-DECISION-EN-ATTENTE.md`. Il a été
> renommé au moment de la décision : un document qui annonce « en
> attente » alors que le choix est fait et à moitié implémenté
> désinformerait quiconque le lit ensuite.

---

## 0. État de livraison

| Outil | État | Détail |
|---|---|---|
| **Mafs** | **livré** | `FigureSecanteMafs` : B se glisse le long de la courbe (`MovablePoint` contraint) au lieu d'un curseur. Vérifié au navigateur : h 1,60 → 0,89 en tirant, pente suit à 2,89. Thème remappé sur les jetons `--figure-*` (Mafs arrive en fond noir — l'inverse de la cible). |
| **M3 Expressive** | **livré** | `lib/m3-motion.ts` : jetons de ressort spatiaux publiés + intégration pas à pas d'un vrai ressort amorti. `useRessort` s'arrête au repos et respecte `prefers-reduced-motion`. **Les jetons `effect` sont marqués À CONFIRMER** — non trouvés sourcés, donc non inventés. |
| **Rive** | **bloqué (humain)** | Runtime installé (`@rive-app/react-canvas` 4.31). Mais un `.riv` s'autorise dans l'éditeur Rive : **aucune API pour en générer par code**, et Figma→Rive est un copier-coller SVG manuel, pas une synchro. L'intégration se posera quand un premier `.riv` existera. |

Livré aussi, hors outillage : la **page d'entrée de chaîne**
(`PlanChaine`) — destination, prérequis annoncés avec leur porte de
sortie, chemin entier visible. Répond au « ça arrive au hasard ».

**Livré ensuite — la composition de l'écran** (le point 4 du retour, celui
que l'owner classait « le plus à gagner ») :

- **Deux panneaux.** La scène (figure sur surface presque blanche) est
  COLLANTE à gauche ; la conduite défile à droite. L'explication d'une
  erreur se lit donc pendant que la figure qui la trace est encore à
  l'écran — avant, elle passait sous le pli.
- **L'explication a la taille d'un texte à lire** (`text-lead`, carte
  pleine largeur du panneau) au lieu d'une note sous les boutons.
- **Le mouvement M3 sert enfin à quelque chose de pédagogique** : la
  droite d'une réponse fausse ne surgit plus à sa place, elle PART de la
  bonne droite et s'en écarte au ressort. L'écart est parcouru, pas décrit.
- **Écrans de réglage** : une jauge « ta pente / objectif » en grand, le
  nombre animé au ressort. Le panneau droit n'est plus vide et l'élève sait
  s'il approche.
- **Les deux figures parlent la même langue** : ce qu'on avance en bleu, ce
  qu'on monte en brun, au collège comme sur la courbe, et le quotient écrit
  en entier (`5,76 / 1,60 = 3,60`) dans les mêmes couleurs.

---

---

## Le retour owner qui déclenche ce brief

Après avoir joué le prototype `/atelier` :

1. « Ça ne donne pas l'impression d'attraper mon erreur, c'est encore un
   quiz. » → **traité** (l'erreur se trace désormais sur la figure), mais
   voir §4 : la règle R3 était trop faible.
2. L'écran 4 (le curseur sécante→tangente) ne convainc pas non plus.
3. La structure d'ensemble manque : **pas de page d'entrée** disant « voilà
   ce qu'il faut déjà savoir, voilà le plan du début à la fin ». Ça donne
   l'impression de notions qui arrivent au hasard.
4. **Les explications sont écrites petit, en bas.** Elles ne prennent pas
   l'écran. « Tout le côté visuel n'est pas assez bon — c'est là qu'il y a
   le plus à gagner. »
5. **Aucune animation.** Les choses apparaissent, rien ne bouge. Cible
   citée : une UI de niveau Google, fond blanc, proche de **Material 3**.

Point 1 **traité** — 7 des 15 réponses fausses se tracent maintenant sur
la figure (3 au premier jet ; la porte durcie a fait remonter les autres).
Point 2 **traité par le rythme, pas par la figure** : l'écran incriminé
enchaînait courbe + notation f(x) + points A/B + sécante + passage à la
limite ; deux écrans intermédiaires ont été insérés (lire une pente sur
une courbe, puis nommer h). Point 3 **traité** (page d'entrée).
Point 4 **traité** (composition en deux panneaux, §0). Point 5 **traité
pour le mouvement** (ressorts M3 sur les entrées de bloc, la jauge et le
basculement des droites) mais **pas pour les animations riches** — Rive
reste bloqué sur la création d'un premier `.riv`.

---

## La limite à nommer avant de choisir

Claude écrit du code correctement et **juge mal le design visuel**. La
boucle de travail est : rendre une capture, la regarder, corriger — lente
et grossière. C'est ainsi qu'a été livré « un quiz avec une note en bas »
alors que la règle interne passait 4/4.

Conséquence directe sur le choix : demander à Claude d'**inventer** un
design de niveau Google, c'est viser sa faiblesse. Lui demander
d'**implémenter fidèlement un système publié**, c'est viser sa force.
Tout ce qui suit découle de là.

---

## Recommandation : cesser d'inventer le langage visuel, adopter celui de Google

### Material 3 Expressive (mai 2025)

La direction actuelle de Google. Ce qui nous intéresse : son **système de
mouvement en physique de ressorts** — raideur, amortissement, vitesse
initiale — avec des jetons *spatial* et *effect*, chacun en trois durées.

Point important pour nous : il n'existe pas de bibliothèque React
officielle ; les implémentations communautaires enveloppent Material Web,
et **Angular Material pilote ces ressorts avec GSAP**. Or **GSAP est déjà
dans le dépôt** (MotionStage s'en sert). Le mouvement M3 est donc un
changement de jetons + GSAP, pas une dépendance nouvelle.

### Mafs — figures mathématiques interactives en React

Composants React déclaratifs conçus pour exactement notre besoin : tracés,
points déplaçables, vecteurs. C'est le SVG écrit à la main dans
`components/atelier/Figures.tsx`, mais fait correctement par quelqu'un
dont c'était le métier.

**JSXGraph** est plus puissant en géométrie générale (et conviendrait à la
3D de `geometrie-espace`) mais n'est pas natif React. Recommandation :
Mafs par défaut, JSXGraph en issue de secours pour la 3D.

### Figma

Les outils Figma MCP sont disponibles dans la session. C'est la meilleure
réponse à « comment transformer Claude en outil de design » : travailler
depuis de vraies maquettes et de vraies specs de composants au lieu
d'inventer des mises en page. Cela déplace le rôle de *concepteur* vers
*implémenteur* — là où le résultat est fiable.

### Antigravity — le mauvais outil POUR CE TROU

Antigravity a produit les 21 scènes sans figure. Sa faiblesse est
précisément le goût et le jugement, c'est-à-dire ce qui manque
aujourd'hui. L'employer à chercher le design répéterait exactement
l'échec qu'on vient de diagnostiquer.

Son bon usage : une fois un motif **prouvé**, le déployer mécaniquement
sur 60 notions. Volume, pas jugement.

---

## Le défaut de règle à corriger

`NORTH-STAR-V2` §4, R3 dit : « chaque réponse fausse porte son feedback ».
Formulation trop faible — elle est satisfaite par du **texte**, et le texte
est justement ce qui est rejeté.

Nouvelle formulation proposée :

> **R3 — toute erreur prévue se MONTRE sur la figure.** Un feedback écrit
> seul ne satisfait pas la règle ; il ne peut qu'accompagner ce que la
> figure a déjà rendu visible.

`scripts/regle-atelier.mjs` doit alors vérifier que chaque option fausse
porte de quoi être tracée (aujourd'hui : le champ `montre`), pas seulement
un texte non vide.

---

## Ce qui reste ouvert, et qui ne doit pas être deviné

- **Rive.** Bloqué sur une étape humaine : il faut qu'un premier `.riv`
  soit créé dans l'éditeur. Tant qu'il n'existe pas, il n'y a rien à
  intégrer et le runtime installé ne sert à rien.
- **Les 8 erreurs encore non tracées.** Elles portent sur l'existence
  d'un quotient ou sur la nature d'une courbe — pas sur une grandeur.
  Certaines sont sans doute traçables autrement (une animation qui montre
  le dénominateur s'annuler) ; la porte les affiche une par une à chaque
  exécution, donc elles restent comptables au lieu de se perdre.
- **Le coût réel d'une compétence complète** (15–25 écrans). Toujours
  inconnu — la chaîne fait 8 écrans, donc on n'a même pas encore UNE
  compétence au format visé. Toutes les estimations passées de ce projet
  ont été faites avant d'avoir construit la chose estimée.
- **Le diagnostic d'entrée.** L'élève commence en bas de la chaîne, pour
  tout le monde pareil. Or « trouver où la chaîne casse pour LUI » est le
  cœur du dispositif (NORTH-STAR-V2 §2), et il n'est pas construit.
