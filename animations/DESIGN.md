# La grammaire visuelle des explications animées (v3)

> Verdict owner 2026-08-11 (2ᵉ revue du pilote) : niveau de détail et
> rythme validés ; il faut EN PLUS (1) une couche de SENS — dire ce que
> chaque objet signifie, construire la compréhension, pas seulement la
> correction ; (2) plus de VISUEL — annoter dans la formule (entourer
> a, b, c et les relier par des flèches) ; (3) une vraie GESTION DE
> L'ÉCRAN — le texte du pilote v2 se chevauchait.
>
> Fondement : les principes multimédia de Mayer (signaling, contiguïté
> spatiale, segmentation avec contrôle du rythme, cohérence) et la
> taxonomie des rôles didactiques de la visualisation animée (école
> 3Blue1Brown) — chaque animation doit servir un rôle nommé.

## 1. Les zones d'écran (limites DURES — rien ne les traverse)

```
┌──────────────────────────────────────────────────┐ y=+4.0
│ BANDEAU : question+barème (gauche) · étape (droite)│ y≥+3.2
├──────────────────────────────┬───────────────────┤
│ COLONNE DE TRAVAIL           │ RÉGION FIGURE     │
│ (calculs, outils)            │ (plan, courbes)   │
│ x ∈ [−7 ; −0,6]              │ x ∈ [+0,2 ; +7]   │
│ y ∈ [−2,3 ; +2,6]            │ y ∈ [−2,4 ; +3,1] │
├──────────────────────────────┴───────────────────┤ y=−2,55
│ BANDE LÉGENDE (registre parlé, 1 à 3 lignes)     │
└──────────────────────────────────────────────────┘ y=−4.0
```

- Sans figure (ex. la résolution algébrique d'ouverture), la colonne
  de travail peut s'élargir et se centrer — utiliser l'écran.
- La bande légende est inviolable : aucun calcul n'y descend.
- L'« ardoise » (`ecrit()`/`nettoie()` de BacScene) gère la colonne :
  ce qui est CONSOMMÉ s'efface avant que la suite n'arrive — jamais
  plus de ~4 lignes vivantes (principe de cohérence ; c'est le correctif
  structurel du bug de chevauchement du v2).

## 2. Le signaling (l'exemple owner : entourer a, b, c)

- Toute identification se fait DANS la formule : on entoure le morceau
  (`entoure()`), on tire une flèche vers sa valeur (`fleche_vers()`),
  et la couleur du cadre = la couleur de la valeur = la couleur de ses
  réapparitions plus loin (continuité du code couleur).
- Code couleur sémantique stable d'une scène à l'autre :
  - coefficient/objet nº1 : sarcelle forte (`BAC_ACCENT_STRONG`)
  - coefficient/objet nº2 : or (`BAC_WARNING`)
  - coefficient/objet nº3 : vert (`BAC_SUCCESS`)
  - piège / mise en garde : rouge (`BAC_ERROR`), réservé à ça
  - outil du cours : encadré sarcelle (`SurroundingRectangle` accent)
  - conclusion d'une question : sarcelle ou vert, jamais rouge.
- Contiguïté spatiale : l'étiquette se pose À CÔTÉ de ce qu'elle nomme
  (sur la figure : près du point, du segment, de l'angle), pas dans
  une colonne parallèle.

## 3. La couche de sens (« que signifie… ? »)

Chaque objet mathématique NOUVEAU reçoit, à sa première apparition,
un temps « ce que ça signifie » AVANT le calcul, avec son identité
visuelle propre :

| Objet | Identité visuelle | Ce qu'on dit |
|---|---|---|
| discriminant Δ | mini-table des 3 cas, le cas actif surligné | « le détecteur du nombre de racines » |
| module | segment O→point tracé et étiqueté | « la DISTANCE de O au point » |
| argument | arc d'angle depuis l'axe réel positif | « l'ANGLE depuis l'axe réel » |
| conjugué | symétrie par rapport à l'axe réel, tracée | « le reflet dans l'axe réel » |
| e^{iθ} | point du cercle unité à l'angle θ | « le point du cercle unité d'angle θ » |
| rotation | arc de trajectoire, rayon conservé | « on multiplie l'affixe par e^{iθ} » |
| translation | vecteur tracé, point qui glisse | « on ajoute l'affixe du vecteur » |

Le calcul ne commence qu'après ce temps de sens. C'est la différence
entre corriger un exercice et construire une compréhension.

## 4. Rôles didactiques : une animation = un rôle

Avant d'animer quoi que ce soit, nommer son rôle : montrer une
transformation (le point qui TOURNE), ancrer une définition (le
segment-module), signaler une structure (le cadre sur b²−4ac),
avertir d'un piège (d ≠ a). Une animation sans rôle est du décor —
elle saute (cohérence, calm core).

## 5. Rappels de production

- Sections = étapes = clics (segmentation, rythme contrôlé par l'élève).
- Légende écran = registre parlé court ; la narration E3 la reprendra —
  ne pas écrire de pavés (redondance).
- TEMPO global dans BacScene ; « trop rapide » se corrige là, pas en
  retouchant 30 scènes.

Sources : R. E. Mayer, *Evidence-based principles for how to design
effective instructional videos* (J. Applied Research in Memory and
Cognition, 2021) ; « A taxonomy of didactic roles of dynamic
visualization in animated mathematics videos » (Teaching Mathematics
and its Applications, Oxford, 2024) ; corpus 3Blue1Brown.
