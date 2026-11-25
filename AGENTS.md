# AGENTS.md — règles pour tout agent qui travaille dans ce dépôt (Antigravity, Gemini, autre)

> Lu automatiquement par Antigravity. Les règles de Claude sont dans [`.claude/CLAUDE.md`](.claude/CLAUDE.md) :
> elles valent pour toi aussi (production décidée par un humain, jamais de travail sur `main`).
> Les rôles sont partagés : chaque fichier de [`.claude/agents/`](.claude/agents/) est une consigne en
> texte ; quand un flux de travail te donne un rôle, lis ce fichier et tiens-le.

## Le projet, en trois lignes

Préparation au bac marocain (2ème Bac, en français). Le but : un tuteur patient et exact, qui mène un
élève en difficulté jusqu'à la réussite. La vision : [`docs/product/VISION.md`](docs/product/VISION.md).
L'état courant et le périmètre du lancement : [`docs/ETAT.md`](docs/ETAT.md).

## Ce que tu ne fais jamais

- Toucher à `main`, fusionner une PR, pousser en production, écrire une migration.
- Modifier `web/src/components/pilote/noyau.js` (le lecteur), ni `web/src/lib/tokens.ts`.
- Importer une scène d'une leçon dans une autre : on copie et on adapte.
- Écrire un nombre à la main dans un texte de leçon : il vient du fichier d'outils de la leçon.
- Afficher comme un fait ce qu'un plan marque « à vérifier ».
- Citer comme chemin un fichier qui n'existe pas.
- Nommer un modèle d'IA dans le code, un commit, une PR ou un document.

## Le geste de travail

1. Une branche `antigravity/<nom>` par chantier, créée depuis `claude/vibrant-fermi-v1lxj5`.
2. Une PR **brouillon** vers `claude/vibrant-fermi-v1lxj5`. Jamais vers `main`.
3. Avant de pousser, depuis `web/` : `npx next build`, `npx tsc --noEmit`,
   `node scripts/pilotes-regles.mjs --porte`, `node scripts/pilotes-exercices.mjs --porte`,
   `node scripts/token-gate.mjs`, `node scripts/contrast-gate.mjs`,
   `node scripts/syntaxe-vieux-moteurs.mjs` (« lookbehind dans src/ » reste à 0) ; à la racine :
   `scripts/verif-commit.sh` et `node web/scripts/liens-fichiers.mjs --porte`. Un contrôle rouge ne se pousse pas.
4. Tu termines par : ce qui est fait, ce que tu n'as pas pu vérifier, ce qui reste.

## La règle qui coûte le plus cher quand on l'oublie

**La réponse ne se lit nulle part avant la question.** Aucun contrôle automatique ne le voit ; trois
leçons de suite sont sorties avec 7, 9 et 8 défauts de ce type malgré tous les contrôles verts. La
grille est dans [`docs/revue-externe/rapports/16-relectures-pedagogiques.md`](docs/revue-externe/rapports/16-relectures-pedagogiques.md).
Pour chaque étape à question : rien à l'écran (titre de partie, titre et sous-titre de scène, légende,
lecture, figure) ni dans l'étape précédente (texte, note, rétroactions) ne donne la réponse ; les options
ont la même forme ; aucun leurre n'annonce sa propre erreur ; une leçon n'enseigne pas un geste qu'elle
compte faux ailleurs.

**Une leçon n'est jamais « finie » par celui qui l'a écrite.** Elle passe par
[`.agents/workflows/relire-lecon.md`](.agents/workflows/relire-lecon.md), dans une conversation neuve,
puis par [`.agents/workflows/corriger-lecon.md`](.agents/workflows/corriger-lecon.md).

## Les flux de travail

| Flux | Pour |
|---|---|
| [`ecrire-lecon`](.agents/workflows/ecrire-lecon.md) | écrire une leçon à partir de son plan de `docs/refonte/specs/` |
| [`relire-lecon`](.agents/workflows/relire-lecon.md) | relire une leçon livrée, sans la modifier |
| [`corriger-lecon`](.agents/workflows/corriger-lecon.md) | corriger une leçon d'après sa relecture |
