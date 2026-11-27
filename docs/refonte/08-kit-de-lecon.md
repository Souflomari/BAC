# 08 — Le kit de leçon : de quoi est faite une leçon, et comment en ajouter une

> Le mode d'emploi technique du format, pour l'auteur d'une nouvelle leçon. Les règles d'écriture
> sont dans [`07-regles-du-format.md`](07-regles-du-format.md) ; ce document dit **où** on écrit et
> **avec quoi**. La physique (`radioactivite`) est le modèle le plus propre à copier : ses scènes,
> ses outils et son script sont dans des fichiers séparés.

## 1. Les fichiers d'une leçon

Pour une leçon de nom `nom` (minuscules, tirets), dans `web/src/` :

| Fichier | Rôle |
|---|---|
| `app/pilote/nom/page.tsx` | la page : métadonnées (titre, description, `alternates.canonical`), en-tête du site, le composant |
| `app/pilote/nom/nom.css` | les styles propres à la leçon, s'il en faut (les styles communs sont dans `app/pilote/logarithme/pilote.css`) |
| `app/pilote/nom/exercices/page.tsx` | la page d'exercices |
| `components/pilote/NomPilote.tsx` | le composant : `PiloteCoquille` + titre, filières, « pourquoi cette leçon », la fonction `monter` |
| `components/pilote/nom-moteur.js` | le script : `BEATS` (les parties), `STEPS` (les étapes), les fiches de mots, la fin |
| `components/pilote/nom-outils.js` | les données sourcées et les fonctions de calcul (aucun nombre écrit à la main ailleurs) |
| `components/pilote/nom-scenes-a.js`, `-b`, `-c` | les scènes SVG, par parties |
| `components/pilote/exercices/nom.js` | les gabarits d'exercices (`exercices/modele.js` décrit le format) |

Et quatre endroits où la déclarer : `components/pilote/exercices/catalogue.js` (les exercices) ; la
liste `PILOTES` de `web/scripts/pilotes-parcours.mjs` et de `web/scripts/pilotes-regles.mjs` (les
contrôles) ; la liste `PILOTES` de `app/sitemap.ts` (le plan du site).

Le moteur commun, `components/pilote/noyau.js`, ne se modifie pas pour une leçon : il porte le
déroulé, les paris et leur second essai, les questions « Vérifie », les calculs ligne à ligne, les
fiches de mots, la voix, la reprise après rechargement. Si une leçon a besoin de quelque chose qu'il
ne fait pas, c'est une demande à part, pas un contournement.

## 2. Une étape

Les champs sont décrits en tête de `noyau.js`. L'essentiel :

```js
{ cle: 'demi-vie',            // unique dans la leçon (règle A9)
  beat: 4,                    // l'indice de la partie dans BEATS
  scene: 'loi',               // la scène montrée à gauche
  set: { curve: 1, th: 0 },   // l'état de la scène au début de l'étape
  seq: [{ p: { th: 1 }, d: 900, w: 300 }],   // l'animation : paramètres visés, durée, attente
  text: ['Une phrase.', { t: 'Une phrase qui arrive avec la 1re image.', a: 0, fort: true }],
  tex: [['t_{1/2}=\\dfrac{\\ln 2}{\\lambda}', 't½ = ln 2 / λ']],   // formule + texte de repli
  sujet: 'la demi-vie' }      // ce qu'on dira à l'élève de revoir
```

Trois façons de faire agir l'élève :

- **`pari`** : `{ opts: [{ t, fb, ok?, indice? }], reveal, apres, label }`. Sans option `ok`, c'est
  un pari de prédiction : rien n'est noté, `reveal` lance l'expérience qui tranche. Avec une option
  `ok`, c'est une question : une erreur donne l'`indice` de l'option choisie et un second essai.
  `apres: { tex, html }` s'affiche une fois la question résolue.
- **`verifie`** : une question de compréhension, même forme qu'un `pari` à bonne réponse. C'est elle
  qu'on met dans l'étape `rappel` du milieu (règle A8).
- **`deriv`** : `[{ tex, alt, r, p }]`, un calcul révélé ligne à ligne, chaque ligne avec sa raison
  `r`. Pour que l'élève choisisse une ligne (règle B3) : les premières lignes dans `deriv`, puis un
  `pari` dont `apres.tex` montre la suite.
  Avec un `pari` ou un `verifie`, la question reste cachée tant que « Ligne suivante » n'a pas montré
  toutes les lignes de `deriv` : l'élève lit le calcul avant d'y répondre.

Les raccourcis des pilotes : `VF([[texte, juste?, retour, indice], …])` pour une question,
`BET([[texte, retour], …])` pour un pari de prédiction.

Dans un texte : `[[cle|mot]]` ouvre la fiche du mot ; `<i>x</i>` pour une variable ; l'espace devant
`: ; ? !` est posée par le moteur.

## 3. Une scène

Une scène est un dessin SVG dont l'état est un petit objet de paramètres, que le moteur anime d'une
étape à l'autre :

```js
scene('nz', {
  p: { pt: 1, fl: 0 },                 // les paramètres et leur valeur de départ
  build(g) { /* créer les éléments une fois, dans le groupe g */ },
  render() { /* les mettre à jour d'après this.p */ },
});
```

Le repère de dessin fait environ 1000 × 650. Les outils (voir `radioactivite-outils.js`,
`outilsScene`) : `E(balise, attributs, parent)` crée un élément ; `fx(parent, x, y, texte, classes,
ancre)` pose un texte avec `*x*` en italique, `^{2}` en exposant, `_{0}` en indice ;
`titre(g, titre, sous-titre)` ; `show(element, 0 ou 1)` ; des aides pour les axes et les courbes.

Les couleurs passent **uniquement** par des classes : `k-ink` (trait), `k-a` (trait d'accent),
`k-dim` (trait discret), `s-ink`, `s-a`, `s-dim` (remplissages), `nofill` ; les textes par
`t-titre`, `t-lab`, `t-lab2`, `t-cle`, `t-tick`. Jamais une couleur écrite en dur.

Règles d'une bonne scène : une idée ; des positions calculées, jamais posées à l'œil ; lisible à
390 px de large ; rien qui bouge tout seul sans que l'élève l'ait demandé.

**Avant d'écrire une scène, chercher si elle existe** : courbe avec lecture graphique (`loi`),
règle graduée (`rule`), tableau de valeurs (`table`), bandes d'aire (`bandes`, `hyper`), équation
et copie d'élève (`bac`), séquence à lire (`trans`, `transl`), schéma à légender (`schema`),
diagramme à points (`nz`). Une scène d'un type vraiment nouveau se signale dans la remise.

## 4. Les exercices

Un gabarit reçoit un tirage à graine et rend l'énoncé, les questions et la correction ; la réponse
est calculée par le code ; chaque mauvaise réponse prévue porte son explication et le nom de
l'erreur classique. Chaque exercice déclare ses `capacites` (identifiants du référentiel). Aucune
capacité en exercice que la leçon n'enseigne pas (règle B7).

## 5. Les contrôles, dans l'ordre

Depuis `web/`, après `npx next build` :

```
node scripts/pilotes-regles.mjs --porte                  # les règles armées A1 à A9
node scripts/pilotes-parcours.mjs --porte                # la leçon se parcourt, ordinateur
node scripts/pilotes-parcours.mjs --porte --ecran 390x844 --captures <dossier>   # téléphone, avec captures
node --no-warnings scripts/pilotes-exercices.mjs --porte # 300 tirages par gabarit
node scripts/token-gate.mjs                              # aucune couleur en dur
```

Puis, depuis la racine, `scripts/verif-commit.sh` sur le commit. Le vert ne suffit pas : ouvrir les
captures des étapes à pari, y compris après deux erreurs (le pire cas : le panneau ne doit pas
déborder de plus d'un écran).

## 6. La remise

Avec le code : la liste « conception erronée → clé de l'étape » (règle B5) ; la liste de ce qui
reste « à vérifier » (règle B9) ; les scènes nouvelles ; les captures. La leçon est ensuite relue par
un modèle plus fort : exactitude d'abord, pédagogie ensuite.
