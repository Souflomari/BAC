# La dette de manipulation — registre du 2026-09-20

> Produit par `web/scripts/dette-manipulable.mjs`. Relancer :
> `node scripts/dette-manipulable.mjs` (depuis `web/`).

## Pourquoi ce document existe

`.claude/CLAUDE.md`, décision ouverte n°4, pose une ligne dure : *« the hard
line that generated assets never substitute for a manipulable interactive
where the pedagogy requires manipulation »*. Une spec qui prescrit
`[[embed:slug]]` demande une chose que l'élève **touche** — un curseur qu'il
pousse, une masse qu'il change, un rayon qu'il balaie. Une figure figée montre
le résultat de ce geste ; elle ne le rend pas.

**Ce qui a été trouvé est à l'honneur des auteurs.** Les six substitutions
sont ÉCRITES, chacune en tête du SVG qui remplace le manipulable, et chacune
nomme ce qui est perdu. Rien n'a été maquillé : la discipline d'état honnête
(ADR 0025) a tenu au point exact de la substitution.

**Ce qui manquait est un endroit où les COMPTER.** Chaque dette vivait dans
l'en-tête d'un fichier que seul celui qui l'ouvre lira. `media-manipulable`
(§11.129) compte les `.interactive.json` — il ne savait rien de ces
substitutions-là. Aucun document du dépôt ne les réunissait. C'est la leçon de
l'ADR 0031 une fois de plus : **une dette qu'aucun registre ne nomme est
invisible, même quand chaque ligne est honnête.**

## Le registre

```
━━ ce que le produit doit encore à l'élève qui manipule ━━

  prescriptions [[embed:]] dans les specs ... 4
  manipulables LIVRÉS ...................... 4
     ✓ pc/chute-mouvements-plans/projectile-sandbox
     ✓ pc/rc-charge/rc-sandbox
     ✓ pc/rlc-serie/rlc-sandbox
     ✓ pc/systemes-oscillants/ressort-sandbox

  SUBSTITUTIONS ÉCRITES (la dette) ......... 6
     · pc/chute-mouvements-plans/euler-taille-de-pas
         « remplace l'embed manipulable [[embed:euler-taille-de-pas]] pour cette passe de couverture (curseur Δt → ici, DEUX tailles de pas fixes tracées contre  »
     · pc/chute-mouvements-plans/orbites-gravite
         « remplace l'embed [[embed:orbites-gravite]] (PhET "Gravity and Orbits") pour cette passe de couverture : au lieu d'un curseur de rayon continu, TROIS r »
     · pc/chute-mouvements-plans/sandbox-chute-frottement
         « remplace l'embed manipulable [[embed:sandbox-chute-frottement]] pour cette passe de couverture (curseurs m,k → ici, DEUX masses fixes tracées côte à c »
     · pc/ondes-mecaniques-periodiques/cuve-a-ondes-diffraction
         « Remplace l'ancien [[embed:…]] (cuve à ondes manipulable, largeur de fente réglable en direct) par une figure STATIQUE qui fige la même leçon visuelle  »
     · pc/reactions-acido-basiques/distribution-curseur-pH
         « remplace le marqueur [[embed:distribution-curseur-pH]] par une version statique — vague de comblement de couverture, cf. »
     · pc/reactions-acido-basiques/lecture-Ve-courbe-dosage
         « remplace le marqueur [[embed:lecture-Ve-courbe-dosage]] par une version statique (vague de comblement de couverture, cf. »

  promesses tombées SANS UN MOT ............ 0

  PORTÉE — l'instrument lit des PRESCRIPTIONS, pas des besoins : une
  pédagogie qui exige la manipulation sans qu'aucune spec ne l'ait écrite
  lui est invisible, et les onze notions de SVT n'ont ni spec de ce genre
  ni embed (§11.119). Il ne juge pas non plus si le manipulable livré
  manipule la bonne grandeur.
```

## Ce que la décision engage

Six manipulables sont dus. Les rendre, c'est six embeds à câbler (PhET,
GeoGebra ou Desmos selon la spec) plus le travail de cadrage que chaque
descripteur existant montre : `boundary`, `boundary_guard_details`,
`param_manipulation_guide`, `pedagogy_wiring`, l'attribution CC-BY. Les quatre
descripteurs déjà en place donnent la mesure exacte de ce que ça coûte — ils
sont longs, et c'est ce qui les rend sûrs.

Les accepter comme définitifs est une réponse également légitime : les figures
qui les remplacent sont bonnes, chacune sert l'item nommé, et la dégradation
est écrite. Mais alors il faut le dire dans les specs, qui continuent de
prescrire un embed — sinon la prescription reste une promesse ouverte.

**Ce que cette page ne tranche pas :** laquelle des deux. C'est une décision de
propriétaire (`DECISIONS-EN-ATTENTE` §10).

## Portée de l'instrument

Il lit des PRESCRIPTIONS, pas des besoins : une pédagogie qui exige la
manipulation sans qu'aucune spec ne l'ait écrite lui est invisible — et les
onze notions de SVT n'ont ni spec de ce genre, ni embed, ni figure manipulable
(§11.119, §11.129). Il ne juge pas non plus si le manipulable livré manipule la
bonne grandeur.
