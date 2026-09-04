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

---

## Annexe — le téléphone étroit (2026-09-04)

Cet audit, comme les deux autres balayages visuels, avait tout mesuré à
1280 px et au-dessus. Le produit s'adresse à des lycéens marocains, qui
lisent sur un téléphone. Le harnais mesurait le débord horizontal à 1536 et
1920 px — l'écran du propriétaire — et balayait le header de 320 à 1280 px,
sur l'accueil seulement. **Les 62 leçons n'avaient jamais été mesurées sous
1280 px.**

`web/scripts/etroit-sweep.mjs` : 70 pages (62 leçons + 8 pages hors leçon)
× 3 largeurs (320, 360, 390), tous les chapitres dépliés — un chapitre
masqué qui déborde débordera le jour où l'élève y arrive.

**Trouvé : quatre leçons débordaient à 320 px** (`pc/etat-equilibre` +51,
`pc/rlc-serie` +31, `maths/nombres-complexes-2` +24,
`maths/suites-numeriques` +14), **et une encore à 360 px**
(`pc/etat-equilibre` +11). La page glissait sous le doigt.

**Cause unique, trouvée par bissection du DOM** (masquer un enfant, regarder
si le débord disparaît, descendre) : les cartes d'items. Puis, en isolant
les classes : masquer `[data-item-id]` OU masquer les formules en ligne
résolvait, les deux à chaque fois. Une formule en ligne est **insécable** —
KaTeX ne coupe pas au milieu de $Q_r = [Cr_2O_7^{2-}]\ldots$ — et quinze
d'entre elles, mesurées une à une, dépassaient le bord utile de leur carte :
jusqu'à 91 px pour `EE-24`, 71 px pour `RLC-R8-1`, 22 px pour la réponse
$CH_3COOH/CH_3COO^-$ de `RAB-18`.

**Correctif de mise en page, pas de contenu.** Les conteneurs de texte des
items défilent désormais (`McqItem` énoncé + solution, `CheckpointItem`
énoncé, `ChoiceButton` réponse + retour) — exactement ce que
`.katex-display` fait déjà dans la prose. Rien n'est coupé, rien n'est
réécrit, et la page tient. Réécrire les quinze formules aurait traité les
symptômes du jour et laissé la seizième casser la page demain.

**Après : 70 pages × 3 largeurs = 210 mesures, zéro débord.** Porte armée
dans dom-truth (206 contrôles) sur les quatre leçons fautives à la largeur
où elles cassaient.

---

## Annexe 2 — la figure sur un téléphone : 260 sur 260 illisibles (2026-09-04)

Le balayage étroit ci-dessus ne mesurait que le DÉBORD. En regardant les
mêmes pages, une seconde question s'est posée : à quelle taille le texte des
figures arrive-t-il réellement sur un téléphone ?

Le SVG remplit la largeur disponible (`[&>svg]:w-full`). Sur un écran de
360 px, la bande de lecture fait 328 px. Une figure dessinée sur un canevas
de 900 unités est donc rendue à **0,36×**, et ses étiquettes — 9 unités à
l'autorat, la plus petite valeur du corpus — arrivent à **3 px**.

**Mesure, 62 leçons, 360 px de large : les 260 figures statiques rendaient
du texte sous 9 px. 237 sous 6 px. La plus petite : 2,95 px**
(`svt/liberation-energie-matiere-organique`, « NADH,H+ »). La couche média
entière — schémas, graphes, arbres, circuits — était décorative sur
l'appareil que l'élève utilise réellement.

Ce n'est pas un défaut de dessin : les mêmes figures sont impeccables à
1280 px. C'est la RÈGLE DE TAILLE qui manquait.

**Règle posée : jamais sous la taille naturelle.** Un dessin est autoré à
une échelle où son texte se lit ; en dessous, il ne se lit plus. Sous 600 px
le cadre défile horizontalement et le SVG garde sa largeur de viewBox.
L'élève fait glisser la figure — comme une carte — au lieu de deviner. Rien
n'est coupé, aucune figure n'est réécrite, et au-dessus de 600 px rien ne
change.

**Après : 272 figures (statiques + animées), échelle 1 partout, plus petit
texte rendu 7,5 px, aucune sous 7.** Porte armée dans dom-truth (207
contrôles) sur les deux faces de la règle — l'échelle ET le texte rendu :
mesurer l'échelle seule laisserait passer une figure autorée trop petite ;
mesurer le texte seul laisserait passer une figure rendue à 40 % dont les
étiquettes seraient énormes.

**Trois pièges payés en chemin**, écrits dans le code :
- `figure svg` attrape les ICÔNES des contrôles de transport (viewBox 24,
  rendues à 14 px) : la porte échouait à « 0,58 » sans rien avoir à voir avec
  une figure. La bonne cible est `.figure-cadre svg`.
- au `domcontentloaded`, la feuille de style n'est pas appliquée : toutes les
  figures paraissent réduites. `networkidle`.
- viser `> svg` laissait la scène ANIMÉE à 328 px avec un SVG de 680 dedans,
  donc recadrée verticalement : c'est le conteneur d'aspect-ratio qu'il faut
  élargir. La règle vise l'enfant direct, quel qu'il soit.

---

## Annexe 3 — les cibles tactiles (2026-09-04)

Troisième lentille du même balayage : à quelle taille les contrôles sont-ils
touchables sur un téléphone ? 68 pages à 360 px, pointeur tactile émulé,
tous chapitres dépliés. Référence : WCAG 2.2 SC 2.5.8 (AA), 24 px dans la
plus petite dimension. Le DESIGN-BIBLE §9 vise 48 ; le harnais ne vérifiait
que le header, sur l'accueil.

**Deux classes trouvées :**

1. **1 832 ancres de titre `§`, 7×17 px.** Elles apparaissent au SURVOL du
   titre (`opacity: 0` sinon). Sur un téléphone, il n'y a pas de survol :
   elles étaient donc invisibles en permanence, mais toujours cliquables et
   toujours dans l'arbre d'accessibilité — une cible de 7 px collée à la fin
   de chaque titre, qui ne se montre jamais et qui change l'URL quand le
   pouce dérape. **Retirées sous `@media (hover: none)`.** Un contrôle
   invisible n'est pas un contrôle. Au-dessus, avec un vrai pointeur, rien ne
   change.

2. **Les fils d'Ariane, 21 px de haut** (« Accueil », « Mathématiques »…, sur
   les 65 pages de leçon). Sous le minimum. L'exception « Inline » de la
   norme ne les couvre pas : un fil d'Ariane est un contrôle de navigation, pas
   un lien en pleine phrase. **Portés à 29 px** par un `py-1 -my-1` — la zone
   grandit, la hauteur de ligne ne bouge pas.

**Deux cas laissés tels quels, et c'est la norme qui le dit :** les deux
liens de l'accueil qui vivent DANS une phrase (« Prêt à te tester en
conditions réelles ? *Examens blancs…* », « Ensuite dans le parcours :
*Limites et continuité*. ») relèvent de l'exception *Inline* ; les agrandir
casserait l'interligne du paragraphe sans rien gagner. Et le lien
d'évitement `sr-only`, 1×1 au repos, prend sa taille réelle dès qu'il a le
focus — c'est son fonctionnement, pas un défaut.

**Après : 602 cibles mesurées, toutes ≥ 24 px.** Porte armée dans dom-truth
(208 contrôles), avec les deux exceptions écrites dans le code.

---

## Annexe 4 — le clavier seul (2026-09-04) : un résultat NÉGATIF, et il compte

Quatrième fenêtre ouverte le même jour, jamais mesurée avant. On tabule
jusqu'à 200 fois sur quatre surfaces et on regarde **ce qui reçoit le
focus**, à chaque arrêt : un arrêt dans un chapitre `[hidden]` (le focus part
dans du contenu que personne ne voit) ; un arrêt de taille ou d'opacité
nulle ; un arrêt sans indicateur visible ; un `tabindex` positif ; un piège
où le focus ne bouge plus.

**Résultat : rien.** 46, 79, 49 et 90 arrêts sur les quatre surfaces, aucun
défaut — et la même chose à 360 px après la mise en cadre défilant des
figures (qui aurait pu ajouter des arrêts muets : Chrome rend focusables les
conteneurs défilants).

C'est un résultat négatif et il vaut d'être **gardé** : cette classe régresse
en silence, et le prochain composant qui pose un `tabindex="1"` ou une ombre
de focus absente ne se signalera pas tout seul. Porte armée dans dom-truth
(209 contrôles).

**Deux pièges de mesure, payés une fois chacun**, écrits dans le code :
- l'opacité du `§` est **animée** au focus : lire le style juste après la
  touche renvoie une valeur intermédiaire, et la sonde accusait une ancre
  invisible qui ne l'était pas ;
- la clé d'identité d'un arrêt doit porter la **position**, pas seulement le
  libellé : deux liens voisins (« Nombres complexes — forme algébrique » et
  « … trigonométrique ») partagent leurs 24 premiers caractères, et une clé
  textuelle les déclarait « focus bloqué ». Deux éléments ne peuvent pas
  occuper le même point.
