# 07 — Les règles du format de leçon

> Pour quiconque écrit ou refait une leçon au nouveau format : un humain, ou un modèle. Les trois
> pilotes (`web/src/components/pilote/*-moteur.js`) sont l'exemple ; ce document dit ce qui, dans
> ces exemples, est une **règle**. Les raisons sont dans
> [`02-comprendre-en-profondeur.md`](02-comprendre-en-profondeur.md) ; l'état du chantier dans
> [`06-plan-lancement.md`](06-plan-lancement.md).
>
> **Avant d'étendre le format à d'autres notions : l'accord du propriétaire** (`docs/ETAT.md`).

## 1. Ce qui se vérifie tout seul

`web/scripts/pilotes-regles.mjs --porte` (dans la CI, job `rendu`) lit les étapes de chaque leçon
et refuse tout écart aux règles **armées**. Une leçon n'est pas « faite » tant que ce contrôle, le
parcours (`pilotes-parcours.mjs --porte`) et les exercices (`pilotes-exercices.mjs --porte`) ne
passent pas.

| # | Règle armée | Seuil |
|---|---|---|
| A1 | Une étape est courte | au plus 4 phrases et 85 mots, hors formules |
| A2 | Une seule phrase forte par étape | `fort: true` une fois au plus |
| A3 | Chaque option a son retour | `fb` sur toutes les options, paris compris |
| A4 | Une question à bonne réponse en a exactement une, et chaque option fausse porte un `indice` pour le second essai | |
| A5 | La bonne réponse ne se devine pas à sa forme | sa longueur ≤ 1,3 × la médiane des fausses, ou un écart de 12 caractères au plus |
| A6 | Pas d'option « aucune idée » ni « je ne sais pas » | ce n'est pas un pari |
| A7 | L'élève agit souvent | jamais plus de 5 étapes de suite sans pari ni « Vérifie » |
| A8 | Un rappel au milieu | une étape de clé `rappel`, avec une question « Vérifie », entre 30 % et 70 % de la leçon |
| A9 | Chaque étape a une clé unique | `cle` |

Deux **cibles**, affichées sans bloquer, parce que les pilotes eux-mêmes n'y sont pas encore :

- 60 mots par étape (les pilotes montent à 83) ;
- une ligne choisie par l'élève dans toute dérivation de 3 lignes ou plus (voir B3).

Une cible devient une règle armée le jour où les trois pilotes la tiennent.

## 2. Ce qui demande un relecteur

Aucun script ne juge ces règles. Elles se relisent, par un modèle plus fort que celui qui a écrit.

**B1 — Un pari est un raisonnement.** Au moment où il est posé, l'élève a de quoi raisonner, et au
moins deux options se défendent. Le texte de l'étape ne contient pas la réponse. Deux formes :
le pari de prédiction, avant une expérience ou une animation (aucune option marquée juste à
l'écran, la suite tranche) ; la question, avec une bonne réponse, un indice puis un second essai.

**B2 — Un retour nomme l'erreur et la répare.** Deux phrases au plus. Il dit ce que l'élève a
confondu, puis donne le bon geste. Jamais « Non. », jamais de jugement, jamais d'exclamation.

**B3 — Un calcul se fait, il ne se lit pas.** Dans une dérivation de 3 lignes ou plus, l'élève
choisit une ligne (`deriv` pour les lignes données, puis un `pari` dont `apres` montre la suite).
Les leurres sont les erreurs classiques de la fiche bible, pas des absurdités. Un leurre mène toujours à
un résultat faux : si le mauvais calcul retombe sur la bonne solution, on change l'énoncé.

**B4 — Une idée par étape.** Si une étape porte deux idées, on la coupe. Un fait qui ne sert à
rien dans la suite (un nom, une date, une anecdote) part, ou va dans une fiche de glossaire.

**B5 — Chaque conception erronée de la fiche bible est affrontée** : elle est le leurre d'au moins
un pari ou d'une question. L'auteur tient la liste (conception → clé de l'étape) et la rend avec la
leçon.

**B6 — Au bac : un exemple, puis l'élève.** Un exemple commenté complet, qui commence par « quel
est le premier geste ? ». Puis un second où l'élève choisit au moins deux lignes de la copie. Tout
point de barème cite son sujet, ou porte le mot « indicatif ». Aucune phrase sur ce que « le
correcteur » fait sans source.

**B7 — Leçon et exercices se répondent.** Aucun exercice ne teste une capacité officielle que la
leçon n'enseigne pas. Chaque question porte `sujet` (ce qu'on dira à l'élève de revoir) ; la fin de
la leçon renvoie, piège par piège, vers l'exercice qui le travaille.

**B8 — L'histoire est une expérience à prédire**, pas un décor : on demande à l'élève ce que
Becquerel va trouver dans son tiroir avant de le lui montrer. Une date ou un nom sans pari n'a pas
sa place dans le fil.

**B9 — L'exactitude d'abord.** Le périmètre est celui du cadre officiel (`docs/referentiel/`), mot
pour mot. Toute valeur est calculée par le code ou sourcée. Ce qu'on n'a pas vérifié s'écrit « à
vérifier » dans la remise, et ne s'affiche pas à l'élève.

**B10 — La langue.** On tutoie, à l'impératif (« Choisis », « Regarde »). Phrases courtes. Pas de
tiret cadratin, pas d'émoji, pas de point d'exclamation, pas de superlatif. Le vocabulaire est
celui du bac ; un mot nouveau a sa fiche (`[[cle|mot]]`).

## 3. La marche à suivre pour une nouvelle leçon

1. **Lire** : la fiche bible de la notion, ses capacités dans le référentiel, les sujets réels
   (`docs/sujets/`), et un pilote de la même matière en entier.
2. **Écrire le plan** avant toute étape : l'énigme d'ouverture ; la chaîne des idées (chacune
   repose sur les précédentes) ; les paris, avec la conception erronée que chacun affronte ; la
   place de la pause et du rappel ; l'exemple du bac et celui que l'élève complète. Le plan se
   relit avant d'écrire.
3. **Écrire les étapes** dans le moteur de la leçon, avec les scènes existantes quand c'est
   possible. Une scène d'un type nouveau est une décision du propriétaire.
4. **Écrire les exercices** : des gabarits à tirage (`exercices/modele.js`), réponse calculée,
   chaque piège nommé.
5. **Passer les contrôles** : `pilotes-regles`, `pilotes-parcours` (ordinateur et téléphone),
   `pilotes-exercices`, puis la batterie du dépôt. Regarder les captures, pas seulement le vert.
6. **Rendre** : la leçon, la liste « conception → étape » (B5), la liste de ce qui reste « à
   vérifier » (B9), et les captures des étapes à pari.
7. **Relecture** par un modèle plus fort : exactitude (B9), puis pédagogie (B1 à B8).

## 4. Ce qu'il ne faut pas perdre

Les pilotes font bien cinq choses ; une leçon qui respecte toutes les règles mais perd celles-ci
est ratée :

1. Les paris mettent en scène la vraie conception erronée, et le second essai est guidé.
2. Les manipulations portent l'idée (la règle à calcul, les dés, le ribosome), et l'élève ne peut
   pas passer sans les avoir faites.
3. L'histoire sert d'expérience à prédire.
4. Les paris reviennent plus loin dans la leçon : l'élève voit que sa réponse comptait.
5. La rigueur du bac : le premier geste, l'expression littérale avant le nombre, les conditions
   d'existence en tête, le vocabulaire exact.
