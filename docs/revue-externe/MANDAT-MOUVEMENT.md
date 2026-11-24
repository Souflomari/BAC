# Mandat mouvement — des règles tirées des trois maquettes, puis les six autres leçons

> Décision du propriétaire (2026-11-24), après lecture du rapport
> [`rapports/10-video-et-mouvement.md`](rapports/10-video-et-mouvement.md) et des trois maquettes de
> `/pilote/maquettes` : les trois maquettes (méiose I, dipôle RC, suites) entrent dans les vraies
> leçons, et le même travail se fait pour les six autres. Ce mandat partage le travail : Antigravity
> écrit les **règles** et les **maquettes** ; Claude les **porte** dans les leçons (moteur, texte,
> paris, contrôles). Il s'ajoute à [`MANDAT-MULTIMODAL.md`](MANDAT-MULTIMODAL.md) et à
> [`MANDAT-LECONS.md`](MANDAT-LECONS.md).

## 1. Les règles (un fichier neuf, « 09-regles-du-mouvement », dans le dossier `docs/refonte/`)

Un document d'une à deux pages, que l'auteur d'une scène peut suivre sans avoir vu les maquettes.
Chaque règle tient en une phrase, suivie de son exemple dans une maquette (fichier et ligne) et du
contre-exemple dans une leçon actuelle. À couvrir au moins :

1. **Quand une scène doit bouger**, et quand elle doit rester fixe (un calcul qui se déroule, une
   question qu'on lit).
2. **Deux représentations couplées** : ce qui se lie (schéma et courbe, figure et jauge, cellule et
   bilan), par quel curseur commun, et ce qu'on ne couple pas.
3. **L'état déterministe** : toute scène est une fonction `etat(u)` d'un seul paramètre ; les
   paliers nommés ; ce que montre chaque palier.
4. **Le pilotage** : rien ne démarre seul, tout se rejoue, pas à pas et curseur ; ce que fait
   `prefers-reduced-motion`.
5. **La lisibilité** : taille minimale de texte **mesurée** à 390 px (la maquette RC affiche du
   texte à environ 8 px au téléphone, alors que le rapport annonce 10,8 px : mesurer, corriger, et
   écrire la règle avec la méthode de mesure), nombre d'étiquettes à l'écran, un seul rouge.
6. **L'exactitude** : ce qu'une animation n'a pas le droit de montrer (une charge qui traverse
   l'isolant, un centromère qui se clive en méiose I, un repère non orthonormé pour un escalier).
7. **Le tunnel** : au plus cinq étapes devant une scène qui ne change pas ; quoi faire sinon.
8. **Le poids** : budget par scène et par leçon.
9. **La place de la question** : la scène ne donne jamais la réponse avant le pari ; ce qui
   s'anime avant, ce qui s'anime après la réponse.

Et les **primitives communes** à extraire des trois maquettes (`web/src/components/pilote/maquettes/outils.ts`) :
repère, curseur et paliers, lecture et pause, jauge, chromosome, circuit. Une primitive n'entre
dans `outils.ts` que si deux maquettes s'en servent.

## 2. Les six autres maquettes

Une maquette par leçon, sur le moment où le mouvement apporte le plus (le rapport en propose ;
à confirmer en regardant la leçon **telle qu'elle est aujourd'hui** : les six leçons ont été
corrigées le 2026-11-24, l'ordre réel des étapes est en tête de chaque plan de
[`docs/refonte/specs/`](../refonte/specs/), section 0, et dans `<nom>-moteur.js`) :

| Leçon | Moment proposé | Ce qu'il faut voir |
|---|---|---|
| `logarithme` | la table des puissances | l'arc « + » sur les exposants et l'arc « × » sur les puissances, ensemble |
| `exponentielle` | la croissance comparée | la fenêtre qui s'élargit sans coupure pendant que eˣ écrase la droite ; ou la tangente dont la pente égale la hauteur |
| `radioactivite` | la désintégration β⁻ | un neutron devient proton dans le noyau pendant que le point saute d'une case sur le diagramme (N, Z) |
| `noyaux` | le défaut de masse | les nucléons séparés puis réunis, la balance qui montre Δm, l'énergie libérée |
| `expression-genetique` | le cadre de lecture | les triplets qui glissent à droite d'une délétion, avant la traduction |
| `transmission` | l'échiquier | les gamètes qui glissent des bords vers la case que l'élève choisit |

Même cadre que les trois premières : un composant par maquette dans
`web/src/components/pilote/maquettes/`, un onglet de plus dans `/pilote/maquettes`, aucune leçon
touchée, pas de `noyau.js`, jetons seulement, clair et sombre, rien ne démarre seul. Les valeurs
viennent du fichier d'outils de la leçon (`web/src/components/pilote/<nom>-outils.js`) quand il les
donne : une maquette ne recalcule pas autrement que la leçon.

## 3. Ce qu'il faut rendre

- le fichier des règles (§1) ;
- les six maquettes et les primitives ;
- un rapport neuf, « 11-maquettes-suite », dans le dossier `docs/revue-externe/rapports/` : pour chaque maquette, l'étape de la leçon
  (clé, pas numéro) où elle irait, ce qu'elle remplace, ce que le texte de l'étape devrait dire de
  différent (à signaler seulement : le texte reste à Claude), une capture à 1280 et à 390 px, et la
  taille de texte mesurée au téléphone ;
- les défauts du rapport 10 **revérifiés sur les leçons d'aujourd'hui** (sous-titre « Prophase I »
  en méiose, étiquettes pâles en RC et en suites, ligne coupée à l'étape `orientation`) : pour
  chacun, « toujours là » avec la clé de l'étape, ou « corrigé ».

Avant de pousser, depuis `web/` : `npx next build`, `npx tsc --noEmit`, `node scripts/token-gate.mjs`,
`node scripts/contrast-gate.mjs`, `node scripts/syntaxe-vieux-moteurs.mjs` (la ligne « lookbehind
dans src/ » reste à 0), `node scripts/typo-francaise.mjs --porte /pilote/maquettes` ; à la racine :
`scripts/verif-commit.sh`.

## 4. Ce qui reste à Claude

Le portage dans les leçons (les trois premières sont en cours : `dipole-rc`, puis `meiose`, puis
`suites`), le texte, les paris, les contrôles des leçons, la relecture d'exactitude et la fusion.
Pendant ce mandat, Antigravity ne modifie aucun fichier `web/src/components/pilote/<nom>-*.js` ni
`web/src/app/pilote/<nom>/` : les deux travaux se croiseraient.
