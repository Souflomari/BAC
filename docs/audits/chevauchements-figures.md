# Chevauchements d'étiquettes — le tri, figure par figure

> **Mesuré le 2026-09-03, TRIÉ le 2026-09-04.** La version précédente de ce
> document mesurait 35 chevauchements et disait honnêtement n'en avoir
> ouvert qu'un seul : « les 34 autres ne sont donc ni confirmés ni
> réfutés ». Ils le sont maintenant. Ce document est devenu le journal de
> ce tri.

## Le verdict, d'abord

**Vingt-quatre cas ouverts, VINGT-QUATRE RÉELS. Zéro faux positif.**

Les deux hypothèses d'indulgence que le relevé formulait sont mortes :

1. « Ce sont des artefacts de l'aperçu, qui montre toutes les étapes à la
   fois. » **Faux, sans exception.** La mise en étapes est cumulative : à
   la dernière étape l'élève voit bien tous les groupes ensemble.
2. « Ce sont des remplacements masqués. » Vrai pour 3 cas — mais ces
   trois-là avaient déjà été retirés du relevé par la sonde, qui tient
   compte des masques depuis le 2026-09-03. Il n'en restait aucun.

Autrement dit : **le reliquat ne contenait que de vrais défauts**, et
l'hésitation à les ouvrir aura coûté un jour.

## Ce qui a été réparé

Vingt-quatre chevauchements, dans dix-neuf figures. Chacune a été ouverte,
corrigée, re-rendue et **re-regardée** ; chaque correctif laisse dans le
fichier SVG la raison ET la mesure, pour que le prochain lecteur sache
pourquoi l'étiquette est là où elle est.

| Figure | Ce que l'élève lisait |
|---|---|
| `courbe-ph.svg` | « optimum ≈ pH 2 » et « optimum ≈ pH 7 » l'un DANS l'autre — le mot qui porte toute la figure (chaque enzyme a SON optimum) était le seul illisible |
| `diagramme-distribution-vs-predominance.svg` | « dist100ution » — légende, unité et graduation empilées sur quinze pixels |
| `equivalence-courbe-derivee.svg` | « rappepH— pH = f(V) » |
| `trois-catalyses.svg` | « P✱d » — l'étoile de la réaction de surface au cœur de « Pt / Pd / Rh » |
| `chimiosmose-atp-synthase.svg` | « espac⊕intermembranaire » |
| `droite-point-direction.svg` | « t = −2,O3 » |
| `etude-fonction-rationnelle.svg` | « A(0̶ ; −1) » posée sur l'axe, la graduation « 0 » dessous |
| `croissances-comparees-ln.svg` | « 10y » |
| `orbite-geostationnaire.svg` | « r » imprimé dans « Terre : T_Terre ≈ 24 h » |
| `travail-force-signe.svg` | « θ » dans « force résistante » |
| `arbre-denombrement.svg` | « n₂ = 2 possibilités » dans « Salade + Tajine » |
| `cube-diagonales.svg` | « (mais aucun point commun) » à travers le sommet C |
| `desintegrations-nz.svg` | « ΔZ = −2, ΔN = −2 » sur l'étiquette « N = Z » |
| `distribution-curseur-pH.svg` | la lecture à pH = 3,8 franchissait l'axe et barrait « 100 » |
| `echelle-acide-neutre-basique.svg` | trois annotations sur une seule ligne de 640 px |
| `conservation-em.svg` | le repère « 1 » sous le titre du panneau |
| `vecteur-vitesse-tangente.svg` | les deux légendes d'étape en travers de la construction |
| `convection-mantellique-moteur.svg` | « redescend (froid, dense) » dans « slab-pull » |
| `frontieres-plaques-quatre-types.svg` | « inclinée (Benioff) » dans la légende du panneau |
| `pangee-reconstruction-preuves.svg` | « (pas le littoral actuel) » sur « Afrique » |
| `profil-age-plancher-oceanique.svg` | deux étiquettes disant la même chose, superposées |
| `seismicite-volcanisme-gps-carte.svg` | « ~8 cm/an » dans « océan Pacifique » |
| `circuit-accorde-selection.svg` | « 900 kHz » écrit deux fois au même point, en bavure |
| `detecteur-crete.svg` | la note de bas de figure sur l'étiquette « s(t) » du schéma |

**Restent 7 chevauchements, tous dans `loi-mailles-build.svg`** — figure
sous **dette owner** (HANDOFF §0.7bis : couleurs codées en dur, orpheline
mais câblée, sort à trancher). La réparer reviendrait à décider qu'on la
garde. **Intouchée, délibérément.**

## Ce que le tri a appris, et qui vaut plus que les correctifs

### 1. La sonde était aveugle aux transformations

`getBBox()` rend la boîte dans l'espace utilisateur PROPRE de l'élément :
un `<text transform="rotate(…)">` était mesuré à la place qu'il occuperait
SANS son transform. La sonde comparait des boîtes exprimées dans des
repères différents — elle pouvait aussi bien inventer un chevauchement
qu'en manquer un, et son test de débordement (comparé au viewBox de la
racine) était faux pour ces éléments.

Corrigé le 2026-09-04 : toutes les boîtes sont ramenées dans le repère du
SVG racine via `getScreenCTM()`. Le correctif s'est payé immédiatement —
`kepler3-linearisation.svg` sortait « aucun défaut » depuis toujours, et
son étiquette de pente, tournée à −28° le long de la droite, percutait
« satellite 3 » à 100 %.

### 2. La sonde criait sur les figures de mouvement

Un `.motion.svg` est joué par MotionStage : le rendu statique n'est l'état
d'aucun instant du film. Passées à la sonde, les 10 figures de mouvement
rendaient **111 « défauts » sur 144** — 77 % du rapport en bruit. Le
balayage du 2026-09-03 les avait écartées **à la main**, sans que rien
dans l'outil ne le dise. C'est écrit et appliqué : elles sont capturées,
plus sondées.

### 3. Deux classes de défaut que la sonde ne peut PAS voir

Elles sont apparues en regardant, jamais en mesurant. Aucune n'est gardée.

- **Collision texte ↔ tracé.** Une courbe qui barre une étiquette. Six cas
  trouvés et réparés en passant : la porteuse de 900 kHz barrant
  « 1 200 kHz » ; la courbe barrant « point d'inflexion » ; la droite
  N = Z barrant sa propre étiquette PUIS « ni A ni Z ne changent » ;
  l'oscillation traversant « u_C ≈ U_0 + s_m(t) » ; les arêtes de l'arbre
  de dénombrement barrant « Soupe ».
- **Texte hors de SON panneau.** `travail-force-signe` servait
  « (comme un frottement) » à cheval sur deux panneaux : calée en ancrage
  `end` à x=378 alors que son panneau commence à x=330, elle traversait la
  gouttière et entrait de 55 px dans le panneau voisin. Le test de
  débordement compare au viewBox, pas aux panneaux ; la sonde de
  chevauchement ne compare que des textes. Personne ne regardait.

### 4. Un défaut d'ORDRE de peinture

`frontieres-plaques-quatre-types` peignait sa bande de manteau (opacity
0.55) APRÈS les étiquettes « zone sismique / inclinée (Benioff) » : elles
étaient délavées. On pouvait croire à un choix de couleur ; c'était un
ordre de peinture. Même mécanisme que les arêtes de l'arbre de
dénombrement, qui partaient du CENTRE d'un nœud déjà peint et barraient
son mot.

## Les gestes qui marchent, pour la prochaine fois

Par ordre de préférence — c'est la règle du skill `figure-authoring`
(« élargis le cadre plutôt que de déplacer une étiquette bien placée »)
étendue par ce tri :

1. **Élargir le cadre** quand la place manque vraiment
   (`circuit-accorde-selection` : +56 px à gauche pour une colonne
   d'étiquettes ; `solutions-diophantiennes-reseau` : +44 px en haut pour
   donner au titre sa propre bande).
2. **Envoyer chaque étiquette du côté libre de ce qu'elle nomme**
   (`courbe-ph` : chacune vers l'extérieur de sa cloche).
3. **Passer en légende d'axe tournée** quand trois textes se disputent le
   coin d'un panneau (`diagramme-distribution-vs-predominance`, puis sa
   sœur `distribution-curseur-pH` par cohérence : les deux se lisent l'une
   après l'autre dans la même leçon).
4. **Déporter avec une amorce** quand il n'y a de place que loin
   (`cube-diagonales`, `pangee-reconstruction-preuves`, `desintegrations-nz`).
5. **Poser sur une pastille opaque** quand aucune zone n'est libre — et la
   faire lire COMME une pastille (contour accent discret), pas comme un
   trou dans la courbe (`detecteur-crete`).
6. **Masquer avant de réécrire** quand une étape remplace un texte
   (`circuit-accorde-selection`, technique documentée dans `rlc-schema`).

## Ce qui n'a PAS été fait

- Les 7 chevauchements de `loi-mailles-build.svg` (dette owner).
- **Le balayage des COLLISIONS n'a porté que sur le thème CLAIR.** Les
  métriques de texte ne dépendent pas du thème, donc la LISTE serait la
  même ; la gravité d'une collision, elle, dépend du contraste.

  **Le thème sombre a en revanche été vérifié sur un autre point, le
  2026-09-04 :** les grands aplats restés CLAIRS sur page sombre. La porte
  de couleur garantit que les figures parlent en jetons ; elle ne garantit
  pas le rendu. Une quatrième sonde mesure donc, en sombre, la part du
  cadre couverte par une forme claire dont la couleur N'EST PAS un jeton du
  thème — c'est-à-dire une couleur qui ne suit pas le thème, par définition.

  **Résultat sur les 258 figures statiques : DEUX, et ce sont les deux
  connues.** `loi-mailles-build` (59 % du cadre) et `energy-exchange`
  (51 %) — la paire sous dette owner, dont les couleurs sont codées en dur.
  Aucune autre. Le contrat de couleur tient donc au RENDU, et pas seulement
  à la source.

  *Deux faux positifs écartés en route, tous deux instructifs : une
  étiquette d'accent est légitimement claire en sombre (c'est son rôle), et
  la boîte englobante d'un `<path>` fait de plusieurs sous-tracés éloignés
  mesure tout l'espace entre eux — trois petits disques de 5 px de rayon
  donnaient « 20 % du cadre ». D'où l'exclusion des jetons du thème, qui
  vise exactement ce qu'on cherche : la couleur qui ne bascule pas.*
- Les deux classes du §3 ne sont gardées par rien. Les cas trouvés l'ont
  été à l'œil, sur les 24 figures ouvertes — **il en reste très
  probablement dans les 244 autres.**
