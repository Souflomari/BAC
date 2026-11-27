# Mandat leçons — le second regard d'Antigravity sur les leçons v3

> Demande du propriétaire (2026-11-24) : comment Antigravity peut-il améliorer la qualité et
> économiser l'usage ? Réponse : en faisant ce qu'il fait mieux que la chaîne de production, sur son
> propre quota. La chaîne (plan, écriture, contrôles automatiques, relecture d'exactitude) reste à
> Claude. Antigravity regarde les leçons **dans un vrai navigateur**, corrige ce qui se voit, et
> vérifie les faits en attente. Le format de travail est celui du [`BRIEF.md`](BRIEF.md) : un rapport
> court, des PR sur une branche `antigravity/<nom>`, relues et fusionnées par Claude.

## 1. Les leçons concernées

Neuf leçons, toutes sous `/pilote/<nom>`, chacune avec sa page `/pilote/<nom>/exercices` :

| Matière | Leçons |
|---|---|
| Maths | `logarithme`, `exponentielle`, `suites` |
| Physique | `radioactivite`, `noyaux`, `dipole-rc` |
| SVT | `expression-genetique`, `meiose`, `transmission` |

Les règles du format sont dans [`07-regles-du-format.md`](../refonte/07-regles-du-format.md), les
fichiers d'une leçon dans [`08-kit-de-lecon.md`](../refonte/08-kit-de-lecon.md).

## 2. Chantier A — la critique visuelle, en vrai (le plus utile)

Parcourir **chaque leçon en entier**, sur ordinateur (1280 × 800) puis au téléphone (390 × 844),
en thème clair puis sombre, en cliquant d'abord les mauvaises réponses (c'est le pire cas pour la
place). Rendre un rapport par leçon, `rapports/NN-lecon-<nom>.md`, une ligne par défaut :

`étape (numéro et clé) · écran · thème · ce qui cloche · correction proposée`

Ce qu'on cherche, par ordre de gravité :

1. Un texte de scène illisible ou coupé ; deux étiquettes qui se chevauchent.
2. Une figure qui ne montre pas la situation de la question (mauvais état, mauvais zoom).
3. Une scène chargée : plus d'une chose en rouge, des aplats ou des hachures qui écrasent le tracé.
4. Le panneau de texte qui déborde de plus d'un écran après deux erreurs.
5. Une animation qui saute, ne finit pas, ou repart seule.
6. Au téléphone : une cible de moins de 44 px, un texte de scène sous 10 px réels.

Ce qui est déjà connu et corrigé le 2026-11-24 (ne pas le resignaler) : la bande du bas de la scène,
le compteur d'étapes, les boutons secondaires, l'option fausse en gris.

## 3. Chantier B — les corrections visuelles

Après accord sur le rapport, corriger dans les fichiers de scènes de la leçon
(`web/src/components/pilote/<nom>-scenes-*.js`, `<nom>.css`) : positions d'étiquettes, fenêtres,
tailles de texte, épaisseurs, ce qu'on montre à chaque étape. Une PR par leçon.

Limites :
- les couleurs passent par les classes existantes (`k-ink`, `k-a`, `s-a`…), jamais une couleur en dur ;
- on ne touche pas au **texte pédagogique** (phrases, questions, retours) ni aux **valeurs** : un
  défaut de fond se signale dans le rapport, Claude tranche ;
- on ne touche pas à `noyau.js` (le moteur commun) : un besoin se demande ;
- avant de pousser, depuis `web/` : `npx next build`, puis `node scripts/pilotes-regles.mjs --porte`,
  `node scripts/pilotes-parcours.mjs --porte --pilote <nom>` (ordinateur, puis
  `--ecran 390x844`), `node scripts/token-gate.mjs`, et `scripts/verif-commit.sh` à la racine.

## 4. Chantier C — les faits en attente

Chaque leçon de la série porte une courte liste « à vérifier » dans
[`06-plan-lancement.md`](../refonte/06-plan-lancement.md) §4 bis. À établir sur la source première,
avec l'adresse et la page, dans `rapports/NN-faits-lecons.md` :

| Leçon | À établir |
|---|---|
| `exponentielle`, `suites` | dans le **programme officiel** marocain de 2e bac (pas le cadre d'examen) : exp est-elle définie comme la réciproque de ln ? le théorème de convergence des suites monotones bornées est-il « admis » ? |
| `suites` | la formulation exacte de la question 4 du problème, Sciences expérimentales 2022, session normale |
| `noyaux` | les emplois cités : stimulateur au plutonium 238, fluor 18 en imagerie, iode 131 |
| `dipole-rc` | la notation de l'énergie emmagasinée dans les sujets nationaux ; la figure 1 du sujet 2022 (disposition du montage) |
| `transmission` | les effectifs de Mendel sur le mémoire de 1866 (5 474 et 1 850 ; 6 022 et 2 001 ; 315, 108, 101, 32) |
| `meiose` | Sutton 1903 sur le scan d'origine ; l'emploi de « tétrade » et de « bivalent » dans les manuels marocains |

Une réponse « introuvable » est une réponse : elle s'écrit telle quelle, on n'invente rien.

## 5. Ce qui reste à Claude

Les plans de leçon, l'écriture, l'exactitude, les contrôles automatiques, la relecture finale et la
fusion. Deux lecteurs sur deux modèles différents attrapent plus qu'un seul qui se relit : c'est le
but de ce mandat.
