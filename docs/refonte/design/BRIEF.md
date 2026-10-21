# Brief commun — directions de design (refonte, ordinateur d'abord)

Le propriétaire a joué le prototype logarithme et dit : « c'est surtout le design qu'on va refaire ».
Ses critiques de l'app actuelle : trop d'espace vide sur les côtés, les couleurs (beige), « too much AI slop »,
les examens affichés sur une demi-page. Il veut un design neuf, pas une retouche.

Chaque direction = UN fichier HTML autonome qui montre QUATRE écrans du même produit, à 1440 × 900 :

| hash | écran | contenu imposé (identique pour toutes les directions, pour comparer) |
|---|---|---|
| `#accueil` | Tableau de bord de l'élève | voir § Accueil |
| `#lecon` | Le lecteur de leçon (format du prototype : scène + script, étape par étape) | étape 19/34 de la leçon logarithme, avec un PARI |
| `#examen` | Une épreuve du bac en mode examen | un vrai exercice du dépôt, en PLEINE LARGEUR |
| `#systeme` | La fiche du système | couleurs (tokens), échelle typographique, composants, et 5 lignes « ce que cette direction parie / ses risques » |

Navigation entre les 4 écrans : une petite barre fixe, discrète, hors maquette (ex. en bas à droite), avec
les 4 écrans + un bouton clair/sombre. Le hash change l'écran (`location.hash`), pour que les captures marchent.

## Contraintes techniques (contrat des pages Artifact)

- Un seul fichier `.html`, `<!doctype html>`, `<meta charset>`, `<meta name="viewport" ...>`, `<title>` de 2 à 4 mots.
- Polices : Google Fonts uniquement (`<link rel="stylesheet" href="https://fonts.googleapis.com/css2?...">`).
  Scripts externes : seulement `https://cdn.jsdelivr.net/npm/mathjax@3.2.2/es5/tex-svg.js` si besoin de maths
  (config : `svg:{fontCache:'local'}`, rendu via `MathJax.tex2svg`, puis
  `MathJax.startup.document.clear(); MathJax.startup.document.updateDocument();`, et ajouter le CSS
  `mjx-assistive-mml{position:absolute!important;clip:rect(1px,1px,1px,1px);height:1px!important;width:1px!important;overflow:hidden!important}`).
  Sinon des maths en HTML/SVG soignés. Aucun autre fichier externe, aucune image distante.
- Couleurs en tokens sur `:root` ; variante sombre sous
  `@media (prefers-color-scheme: dark){ :root:not([data-theme="light"]){...} }` ET `:root[data-theme="dark"]{...}` ;
  `body` a un fond explicite. Le bouton clair/sombre pose `data-theme` sur `<html>`.
- Pas de défilement horizontal. Les 4 écrans tiennent à 1440 × 900 (l'accueil peut défiler verticalement).
  À 390 px de large : ça ne casse pas (empilement simple), mais on ne soigne PAS le mobile maintenant.
- `localStorage` seulement dans un try/catch, et seulement pour le thème.

## Contraintes de design (le cœur)

- **Pleine largeur utile** : à 1440 px, pas de colonne centrale de 700 px entourée de vide. La largeur sert
  (scène + script, énoncé + espace de travail, grilles). Le TEXTE courant garde une mesure lisible (≤ 72 caractères).
- **Pas d'« AI slop »** — interdit : dégradés décoratifs, flous / verre dépoli, ombres douces partout, cartes
  `rounded-2xl` empilées, rangées de 3 cartes « feature », icônes emoji, étincelles ✨, violet-bleu générique,
  beige / crème + serif + terracotta, Inter / Space Grotesk / Poppins par défaut, illustrations génériques,
  textes marketing (« Débloque ton potentiel »). Chaque choix doit pouvoir se justifier.
- **Calme et flux** (VISION) : un élève y passe deux heures. Contraste AA minimum, cibles ≥ 44 px, focus visible.
- **Contenu réel, en français**, typographie française (espace fine insécable avant ; : ! ?, guillemets « »,
  virgule décimale). Aucun chiffre inventé présenté comme réel hors des données fictives de l'élève ci-dessous.

## § Accueil — données fictives de l'élève (identiques partout)

- Élève : Salma, 2ème Bac Sciences Mathématiques A. Examen national : juin 2027 (≈ 33 semaines).
- Séance du jour (≈ 45 min), dans cet ordre :
  1. Rappel — 4 questions sur la dérivation (5 min)
  2. Leçon — Fonction logarithme, partie 5 « L’aire sous 1/x » (12 min)
  3. Exercices ciblés — 8 exercices sur « ln d’une somme », générés pour toi (15 min)
  4. Exercice type bac — étude de fonction avec ln, corrigé pas à pas (13 min)
- Matières de l'examen national, coefficients RÉELS (SM-A) : Maths 9 · Physique-Chimie 7 · SVT 3 ·
  Philosophie 2 · Anglais 2. Maîtrise fictive : Maths 58 %, PC 46 %, SVT 31 %, Philo 40 %, Anglais 62 %.
- Maths SM, poids OFFICIELS du cadre de référence 2025 : Analyse 50 % · Nombres complexes + structures
  algébriques 35 % · Arithmétique + probabilités 15 %. Maîtrise fictive : 61 % · 52 % · 66 %.
- Points faibles détectés (fictifs) : « ln(a + b) traité comme ln a + ln b » (3 erreurs cette semaine) ;
  « primitive de u′/u : valeur absolue oubliée » ; « récurrence : hérédité non rédigée ».
- Montrer où se perdent les points (poids × lacune), pas des badges ni des séries de jours.

## § Leçon — l'étape à montrer

Étape 19 / 34, partie 5 « L’aire » (parties : Le problème · La table · Les trous · La règle · L’aire ·
Ce que le bac appelle ln · À toi). Texte du script :
« Voici l’aire entre 2 et 4 : deux fois plus large, mais plus basse. Laquelle est la plus grande ? »
Pari : 1. Celle de 2 à 4 · 2. Elles sont égales · 3. Celle de 1 à 2. Rien n'est encore choisi.
Scène : axes, courbe y = 1/x de x = 0,4 à 8,8, aire de 1 à 2 colorée (couleur A), aire de 2 à 4 colorée
(couleur B), étiquette « y = 1/x ». Boutons Retour / Suivant (Suivant désactivé : « Choisis d’abord »).
Le prototype de référence (structure et contenu) : `/home/user/BAC/docs/refonte/prototypes/logarithme-v3.html`.

## § Examen — une vraie épreuve

Prendre un VRAI exercice transcrit dans le dépôt : chercher dans
`/home/user/BAC/content/maths/fonction-logarithme/bank.yaml` (ou une notion voisine) une entrée dont
`source` porte une filière SM, une année et une session, avec plusieurs questions et un barème. Citer la
source à l'écran (« Bac SM, session normale 20xx — exercice n »). Ne rien inventer dans l'énoncé.
Écran : en-tête d'épreuve (matière, durée réelle si connue — sinon ne pas l'afficher —, minuteur, barème
total /20), navigation entre exercices, l'énoncé lisible EN PLEINE LARGEUR (pas une demi-page), et un espace
de travail à côté (réponse / brouillon / « corrigé pas à pas, verrouillé jusqu'à ta tentative »).

## Vérification (obligatoire avant de rendre)

`node /tmp/claude-0/-home-user-BAC/b1255b66-abe5-57e2-99f2-ebcbcf8cf748/scratchpad/design/shoot.cjs <ton.html> <dossier>/<nom>`
fait les 4 captures à 1440 × 900 avec les vraies polices Google (et `--dark` pour le sombre,
`--w=390 --h=844` pour vérifier que rien ne déborde). REGARDE chaque capture (outil Read sur le PNG),
corrige, recommence. Rendre seulement quand les 8 captures (clair + sombre) sont propres, sans erreur
console, sans débordement.
