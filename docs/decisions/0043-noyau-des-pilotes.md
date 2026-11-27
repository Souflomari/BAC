# ADR 0043 — Un noyau commun pour les leçons pilotes

- **Date** : 2026-10-26
- **Statut** : accepté (décision de construction, dans le cadre des retours du propriétaire)

## Contexte

Les trois leçons pilotes (maths, physique, SVT) avaient chacune leur copie du même moteur : le
déroulé des étapes, l'enchaînement des états de scène, les paris, le panneau, la voix, le clavier,
KaTeX. Les retours du propriétaire du 2026-10-26 ([`refonte/04-retours-pilotes.md`](../refonte/04-retours-pilotes.md))
demandent des changements de format qui valent pour les trois : texte en phrases au rythme de
l'animation, quadrillé en carrés entiers, questions de compréhension, mots techniques expliqués,
dérivations ligne par ligne. Les faire trois fois, c'était trois occasions de diverger.

## Décision

- `web/src/components/pilote/noyau.js` porte tout ce qui est commun. Une leçon n'écrit plus que
  ses scènes, son script et ses contrôles (`monterLecon(root, ctx => ({ BEATS, STEPS, CTL, mots,
  … }))`). Le format d'une étape est décrit en tête du fichier.
- `PiloteCoquille.tsx` est le squelette React commun (barre, scène, panneau, « Pourquoi ce
  format »), avec le quadrillé posé dans une zone d'un nombre entier de carrés.
- `scripts/pilotes-parcours.mjs` parcourt chaque pilote d'un bout à l'autre dans un navigateur
  (job `rendu` de la CI, environ 30 s) : erreurs de page, formules non rendues, phrase restée
  cachée, ligne de calcul inatteignable, « Suivant » bloqué.

## Conséquences

- Le pilote maths est réécrit sur le noyau (deuxième version, 51 étapes). La physique et la SVT
  y passent ensuite ; d'ici là elles gardent leur moteur, dans la coquille commune.
- Ce noyau n'est pas encore le format générique des leçons : il le deviendra si le propriétaire
  valide le format (la règle « ne pas étendre le format avant son accord » reste en vigueur).
