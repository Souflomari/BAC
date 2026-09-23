# ADR 0041 — Scènes 3D de première partie : quand, comment, et ce qui les prouve

**Date :** 2026-09-23 · **Statut :** accepté (prolonge ADR 0017 et son amendement du 2026-07-07, ADR 0032, 0034, 0036, 0039)

---

## Contexte

Le propriétaire a demandé « quelque chose de plus visuel, avec three.js, qui
pousse le produit au niveau suivant ». Deux contraintes du dépôt cadraient la
réponse avant la première ligne :

- **L'amendement d'ADR 0017 (2026-07-07)** a fermé la porte aux nouveaux embeds
  GeoGebra/Desmos pour trois raisons : licence commerciale, vérification
  headless impossible, fidélité du vocabulaire français. Une scène three.js de
  PREMIÈRE partie répond aux trois : three.js est sous licence MIT, un Chromium
  sans carte graphique la dessine (SwiftShader) et une porte peut en lire les
  pixels, et chaque mot affiché est écrit par nous.
- **La dette de manipulation** (`dette-manipulable`, §11.119) comptait six
  manipulables prescrits par une spec et remplacés par une figure figée. L'un
  d'eux, `orbites-gravite` (pc/chute-mouvements-plans, R10), écrivait dans son
  en-tête ce qu'il perdait : « au lieu d'un curseur de rayon continu, TROIS
  rayons fixes ».

La VISION tranche le reste : « an interactive appears because manipulation is
the path to understanding » ; en physique-chimie, « confront the wrong model »
(prédire, puis voir la contradiction) ; et « the moment a modality serves
stimulation over comprehension, it is cut ».

Les faits de la construction sont en `docs/HANDOFF.md` §11.187.

---

## Décision

### 1. Le critère : la 3D quand l'idée est SPATIALE, jamais pour le relief

Une scène 3D n'est admise que si le concept exige de **changer de point de vue**
ou porte sur une grandeur spatiale qu'une figure plane énonce sans la montrer :
un plan, un sens de rotation, un référentiel. Pour l'orbite géostationnaire,
deux des trois conditions sont spatiales (le **plan** équatorial, le **sens**),
et la misconception CH-KEP-2 (« immobile dans l'absolu ») se casse en changeant
de **référentiel** sous les yeux de l'élève. Une figure plane qui suffit gagne
toujours : le relief n'est jamais une raison.

### 2. three.js : une dépendance épinglée, chargée au clic et nulle part ailleurs

`three@0.186.0`, version exacte (l'API bouge d'une version à l'autre). Importée
**uniquement** par `import()` dynamique quand l'élève ouvre la scène : aucune
route ne la charge à l'initial (≈ 64 Ko gzip, un morceau à part). La preuve est
prise À L'EXÉCUTION — `window.__THREE__`, que three.js pose à son import, est
indéfini tant que la scène est fermée — et non dans le manifeste de build, où un
import paresseux est invisible (ADR 0039).

### 3. Le partage contenu / code

- **Le contenu** (`content/<m>/<n>/media/<slug>.json`, `"tool": "scene3d"`)
  porte la pédagogie : les ÉTAPES, leur consigne, le contrôle que chacune
  ouvre, l'état qu'elle pose. Le marqueur reste `[[embed:<slug>]]` : pour la
  leçon, c'est un manipulable comme un autre.
- **Le code** (`web/src/lib/scene3d/`) porte la physique (`kepler.ts`, sans
  three.js) et le rendu (`orbite-geostationnaire.ts`). Le registre
  `scenes.json` nomme les scènes, leurs contrôles et leurs bornes ; il est lu
  par le code ET par les validateurs.
- `validate-content` échoue EN DUR sur une scène inconnue, un contrôle inconnu,
  un état hors bornes, un contrôle qu'aucune étape n'ouvre — tout ce qui, sinon,
  tomberait en silence au rendu. `dette-manipulable` ne compte une scène pour
  livrée que si elle est enregistrée.

### 4. Le contrat de calme (DESIGN-BIBLE §0, §5, §6, §7, §9)

Fermée par défaut (opt-in, comme `EmbedPanel`) ; le temps EN PAUSE à
l'ouverture ; rien ne bouge qui n'ait été lancé ; rendu à la demande, aucune
boucle quand rien ne change. Des étapes : une consigne et UN contrôle neuf par
étape, les autres ABSENTS du DOM. Langue visuelle plate et douce : couleurs LUES
sur les jetons `--figure-*` à l'exécution (et relues au changement de thème),
lumière attachée à la caméra (l'ombrage ne défile jamais), ni texture, ni
étoiles, ni halo ; l'accent marque une seule chose. Contrôles natifs, conditions
en texte + glyphe, verdict en région live qui ne parle que quand il change ;
glisser pour tourner la vue ne bloque jamais le défilement vertical, et trois
vues prédéfinies en sont l'équivalent clavier.

### 5. L'honnêteté : les nombres, la précision, l'absence de 3D

Chaque lecture est calculée avec les constantes de la LEÇON (l'élève qui refait
l'exemple travaillé retrouve le rayon que la scène désigne). **La précision
d'affichage est un choix pédagogique** : à 0,1 h près, douze positions du
curseur affichaient « 24,0 h » — une PLAGE de rayons géostationnaires, la
misconception même que la scène doit casser. À 0,01 h et sur une grille de
10 km, une seule position coche la condition. Sans WebGL, la scène le dit et
garde le curseur et les calculs. À l'impression, le panneau disparaît ; la
figure figée qui le précède couvre le papier.

### 6. Chaque étape commence par un PARI ; la scène répond avant le texte

Une scène de physique qui pose des questions sans jamais faire S'ENGAGER
l'élève démontre, elle ne confronte pas (VISION : « the misconception must be
surfaced and broken »). Chaque étape porte donc un pari (`pari` dans le
descripteur) : tant que l'élève n'a pas choisi, ni le temps ni le contrôle de
l'étape n'existent dans le DOM. Quand c'est le TEMPS qui révèle
(`revele_apres_h`), le verdict et son « pourquoi » attendent que la scène ait
montré la réponse ; le contrôle de l'étape s'ouvre ensuite, avec la tâche
suivante. Les paris parlent la grammaire des points d'arrêt (`ChoiceButton`,
`ResultRow`) : un seul langage de question dans tout le produit. Et une
misconception n'est « servie » que si elle casse sur SA propre conséquence :
pour CH-KEP-1, l'étape libre affiche T/r et T³/r² qui bougent à côté de T²/r³
qui ne bouge pas.

La scène vient AVANT la prose qui explique, pas après : placée derrière les
paragraphes qui donnent déjà les réponses, aucune étape ne pouvait rien casser
(critique pédagogique, 2026-09-23).

### 7. Une scène collante ne masque jamais un contrôle focalisé

La scène reste sous les yeux pendant qu'on règle (collante, à toutes les
largeurs) : sans cela, au téléphone, le curseur tombait à ~750 px sous l'image
qu'il change. Contrepartie obligatoire : chaque contrôle du panneau porte un
`scroll-margin-top` égal au header + la hauteur de la scène, pour qu'un focus
clavier ne le range jamais DESSOUS (WCAG 2.2 — 2.4.11). Vérifié en donnant
le focus, pas en le supposant.

### 8. Une scène ne part qu'avec une porte qui lit son RENDU

Un canvas n'a ni texte ni DOM : aucune porte existante ne peut le voir. Chaque
scène livre donc sa porte, qui vérifie sur le rendu réel, au navigateur :
rien avant le clic ; les nombres, recalculés par une SECONDE implémentation
(ADR 0036 : une porte qui importe le module du produit se donne raison) ; les
PIXELS, dans les deux sens (le géostationnaire vu du sol ne bouge pas au pixel
près ; hors du bon rayon, ou vu du centre de la Terre, il bouge) ; les étapes ;
l'état sans WebGL. Un `--essai-rouge` retourne l'attente de chaque famille, et
chaque famille doit crier. Si WebGL manque au banc, la porte sort **MUET**, en
échec, jamais en vert (ADR 0034).

---

## Conséquences

- La dette de manipulation baisse d'un cran : 6 → 5 substitutions écrites, et le
  cliquet est redescendu à 5 — un cliquet qu'on ne resserre pas quand une dette
  est payée laisse la place à la suivante, en silence.
- La CI gagne une étape (~3 min, vert puis rouge).
- Le bundle de la leçon ne porte que le panneau et la physique (quelques Ko) ;
  three.js n'est payé que par l'élève qui ouvre la scène.

## Ce que cet ADR ne tranche pas

- **La deuxième scène.** Candidate écrite : la cuve à ondes de
  pc/ondes-mecaniques-periodiques (largeur de fente réglable ; misconception :
  une fente plus étroite étale PLUS l'onde, θ = λ/a), autre substitution de la
  dette. Elle passera par le critère du §1 comme la première.
- **La performance sur un téléphone d'entrée de gamme.** Mesuré seulement sous
  rendu logiciel : ~7,5 images/s, 6 ms de JS par mise à jour. Aucun appareil
  réel n'a été mesuré ; c'est une mesure à faire, pas une supposition à écrire.
- **Le glisser au doigt** n'est pas gardé par la porte (les vues prédéfinies
  et le clavier le sont).

## Addendum du 2026-09-23 — la deuxième scène, et ce qui est devenu commun

**La deuxième scène est la sphère coupée par un plan, puis par une droite**
(`maths/geometrie-espace`, R9, `[[embed:sphere-plan]]`). Elle passe le critère
du §1 sans discussion : l'intersection d'une sphère et d'un plan est un CERCLE
que toute figure plane dessine en ellipse, et le point clé du chapitre — la
dimension de l'objet qui coupe décide de la forme du résultat — se VOIT en
passant du plan à la droite à distance égale du centre. Quatre étapes, un pari
chacune (§6), sans temps simulé : le verdict est immédiat, `validate-content`
interdit désormais `revele_apres_h > 0` sur une scène sans temps. Curseurs au
pas de 0,1, pour que le cas tangent $d = R$ soit atteint EXACTEMENT et que la
scène ne montre jamais un « presque tangent » qu'elle appellerait tangent (§5).

**Ce qui est devenu commun.** Deux scènes ont fait voir ce qui n'appartenait
pas à l'orbite : l'ouverture au clic, le cycle de vie du rendu (import
paresseux, contexte WebGL perdu, thème, redimensionnement, destruction), le
pari, les vues prédéfinies, le transport entre étapes, le plateau collant et
sa marge de focus (§7). Tout cela vit dans `web/src/components/notion/scene/`
(`useSceneRendu`, `usePari`, `SceneOptIn`, `PariBloc`, `VuesBloc`,
`TransportEtapes`, `Plateau`) ; chaque scène garde SON panneau — ses contrôles,
ses lectures, ses conditions — et `Scene3DPanel` n'est plus qu'un aiguillage.
Côté rendu, la palette lue dans les jetons et les traits à largeur constante
(`palette.ts`, `traits.ts`) sont partagés. Les attributs `data-*` que lit la
porte de l'orbite n'ont pas bougé : sa porte est repassée VERTE (37/37) sur le
panneau reconstruit, ce qui est la seule preuve qu'un refactor n'a rien changé.

**Sa porte** (`scene-sphere`, §8) : 30 mesures en 10 familles, dont les nombres
recalculés par une seconde implémentation, les trois cas (sécant, tangent,
extérieur) lus dans le texte ET dans les pixels, et le pari qui ne dit rien
avant l'engagement. Un premier rouge de pixels était vrai : les surfaces
translucides, dessinées après le cercle d'intersection, le noyaient (71 px de
trait visibles) ; l'ordre de rendu corrigé en fait 1 069. Essai rouge 7/7.

## Retractions and Corrections

- **2026-09-23 — la « deuxième scène » annoncée n'était pas la bonne
  candidate.** « Ce que cet ADR ne tranche pas » nommait la cuve à ondes de
  `pc/ondes-mecaniques-periodiques`. Relue contre le §1 du même ADR, elle n'y
  passe pas : la diffraction par une fente, dans une cuve, est un phénomène
  PLAN, et une scène 3D y ajouterait du relief sans rien ajouter à l'idée.
  Elle reste une dette de manipulation, à payer par un manipulable 2D. La
  deuxième scène livrée est la sphère (addendum ci-dessus).
