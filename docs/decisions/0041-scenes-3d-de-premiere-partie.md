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

## Addendum du 2026-09-23 (soir) — la troisième scène, et une règle que §6 n'écrivait pas

**La troisième scène : une particule chargée dans un champ magnétique**
(`pc/chute-mouvements-plans`, R6, `[[embed:champ-magnetique]]`), posée juste
après la règle du sens de la force, avant les deux « conséquences » qu'elle
fait découvrir. Critère du §1 : la force de Lorentz est un PRODUIT VECTORIEL ;
v, B et F sont deux à deux perpendiculaires, et la figure plane doit coder la
troisième direction par ⊗ et ⊙. Ici le champ est dessiné en flèches qui
TRAVERSENT un anneau posé dans le plan du mouvement : vues d'en haut (« comme
la figure du manuel »), elles SONT les ⊗ et ⊙ du manuel ; vues de biais, elles
montrent ce que ces symboles ont toujours voulu dire. Cinq étapes : le côté
(le signe de q), la vitesse (elle ne change pas), le rayon (B double, R de
moitié, l'ancien cercle en pointillé), le couloir de l'exemple travaillé
(R ≈ 5,7 cm, θ ≈ 21°, puis le demi-tour quand R < ℓ), et le libre (deux
inversions). Une scène à COURSE : on lance la particule, et le pari attend la
fraction de course que l'étape annonce (`revele_apres_course`).

**Deux décisions d'honnêteté, prises en regardant l'image.** Les flèches v et
F ont des longueurs proportionnelles à leurs normes ; or longueur(F) / R
croît comme B², et à 5 mT la flèche F traversait le centre vers lequel elle
pointe. Le champ s'arrête donc à 3,0 mT, où elle reste dans le cercle — on a
borné le réglage plutôt que plafonné la flèche, parce qu'une flèche plafonnée
mentirait à son plafond. Et la tête d'une flèche de champ qui s'éloigne de
l'œil est dessinée SANS fond : avec son disque, le ⊗ se lisait ⊙, le contraire
de ce qu'il dit.

**La règle que §6 n'écrivait pas : avant le pari, RIEN ne répond.** §6 disait
« tant que l'élève n'a pas parié, ni le temps ni le contrôle n'existent ». Ce
n'était pas assez : dans l'orbite, la fiche des trois conditions affichait
« ✗ … pas géostationnaire » à côté de la question « reste-t-il au-dessus de
P ? » (étapes 2 et 3) ; dans la sphère, l'étape 2 dessinait ses deux points et
cochait « deux points » avant le pari, et la description lue au lecteur
d'écran donnait le rayon du cercle. Désormais, tout ce qui dépend de l'ISSUE —
le dessin qui la montre, la fiche qui la coche, le verdict qui la dit, la
phrase qui la décrit — attend la révélation. Ce qui reste visible, c'est
l'énoncé : la scène telle que l'étape la pose. Les trois portes ont une
famille `avant-pari`, et son essai rouge.

## Addendum du 2026-09-23 (nuit) — la quatrième scène : le produit vectoriel

`maths/geometrie-espace`, R3, `[[embed:produit-vectoriel]]`, posée juste après
la définition par les coordonnées, avant les deux démonstrations qu'elle fait
découvrir (orthogonalité, norme = aire). Critère du §1 : le produit
vectoriel fabrique une direction qui SORT du plan des deux facteurs, et le
registre de la notion nomme l'erreur que la figure plane entretient
(`perspective-fiable` : se fier au dessin pour juger un angle droit). La
dernière étape la provoque exprès — un plan incliné de 50°, où le produit ne
« paraît » plus perpendiculaire à v — et la fait tomber en tournant autour.
Cinq étapes à pari, six misconceptions déclarées de la notion visées, les
nombres du tétraèdre de l'exemple travaillé (AB ∧ AC = (0 ; 0 ; 4)).

Un choix de cadrage, pris en regardant l'image : la caméra cadre tout ce que
la scène PEUT montrer pour la norme, l'inclinaison et l'ordre courants — v et
le produit pour chaque angle θ, étiquettes comprises. Cadrer le contenu
courant ferait bouger la caméra à chaque cran de θ ; cadrer le pire cas
laissait la moitié du canvas vide.

## Addendum du 2026-09-23 (nuit, suite) — une leçon, plusieurs scènes ; une sonde à l'échelle de l'écran

**Une porte ne nomme que SA scène.** Le §8 dit qu'une scène ne part qu'avec une
porte qui lit son rendu ; il ne disait pas comment la porte TROUVE la scène. Les
quatre portes cherchaient le chapitre par `[data-scene]` — la première scène
venue. Juste tant qu'une leçon n'en portait qu'une ; faux dès que la troisième
scène est entrée dans la leçon de l'orbite (`pc/chute-mouvements-plans`) : la
porte de l'orbite a ouvert le chapitre du champ magnétique et échoué (run 747).
Règle : une porte de scène trouve son panneau, son chapitre et ses jetons par
`[data-scene="<nom>"]`, jamais par l'attribut seul.

**Une sonde qui lit un détail de dessin se règle sur l'ÉCHELLE de la scène,
pas sur le pixel.** La porte du champ magnétique lit maintenant le glyphe du
champ (⊗ entrant, ⊙ sortant). Sa première version cherchait l'anneau et les
bras au pixel près : rouge sur un produit juste, parce qu'à 6 px de rayon la
tête du ⊙ débordait sur la bande des bras et que la croix, décalée d'un pixel
par la perspective, passait entre les échantillons. Le produit pose désormais
deux repères invisibles (le centre du glyphe, le bord de son anneau) ; la
sonde mesure en fractions du rayon. Elle a été lancée à quatre tailles d'écran
avant d'être crue, et deux défauts du PRODUIT — le disque qui faisait lire ⊙
pour ⊗, le glyphe dessiné pour le champ opposé — la font rougir, elle seule.

**Et le téléphone a demandé un glyphe plus grand.** À 390 px, l'anneau faisait
8 px de diamètre, et dans les coins la perspective poussait la croix hors du
centre (on lisait ⊘). Anneau porté de 0,22 à 0,34 cm, le point du ⊙ ramené à
un tiers du rayon — un ⊙ de manuel, plus une cible. L'étiquette de B, qui se
posait à 0,6 cm d'un glyphe, se pose ENTRE deux glyphes.

## Addendum du 2026-09-24 — la cinquième scène : le solide de révolution, et une scène qui borne le programme

`maths/calcul-integral`, R9, `[[embed:solide-de-revolution]]` — le volume
d'un solide de révolution, savoir-faire explicite des deux filières que le
corpus ne portait pas du tout (`REVIEW-2026-09-12` S2.6). Critère du §1 : la
misconception centrale est SPATIALE — prendre la coupe pour un CERCLE (sa
circonférence, 2πf(x), à la place de son aire), ou multiplier l'aire de la
région par 2π parce qu'« un tour complet, c'est 2π »
(`volume-circonference-vs-disque`), là où chaque point du segment balaie son
propre cercle et la coupe est un DISQUE PLEIN. Une figure plane le dit ; il faut regarder la coupe
LE LONG DE L'AXE pour le voir, puis de biais pour comprendre pourquoi on la
dessine en ellipse. Cinq étapes à pari (le balayage, la coupe, les tranches,
le cône, l'unité de volume), sur les trois fonctions des exemples travaillés ;
les volumes (8π, 4π, π) sont CALCULÉS par une primitive de f² et recalculés
par la porte par une autre voie (Simpson).

**Une scène peut borner le programme, et la porte le garde.** Le cadre SExp
exclut les sommes de Riemann comme construction de l'intégrale. Les tranches
empilées sont donc une IMAGE : aucune somme n'est calculée ni affichée, le
module de géométrie n'a pas de fonction pour ça, et la lecture du volume est
la valeur exacte de l'intégrale, identique pour 1, 12 ou 40 tranches. La
porte le mesure dans les deux sens (aucun « Σ / somme / total » dans le
panneau ; le volume lu invariant ET égal au vrai). Une frontière de programme
qui n'est tenue que par la retenue de l'auteur se perd à la première
retouche ; tenue par une porte, elle rougit.

**La teinte se lit dans la couleur, pas dans l'écart au fond.** La première
sonde « rien d'accentué avant le pari » classait comme teinté d'accent tout
pixel dont l'écart au fond allait vers l'accent. Sur un fond clair, l'accent
est sombre — et n'importe quel gris plus sombre s'y projette : 78 366 pixels
« teintés » sur un solide gris. La sonde lit maintenant la CHROMINANCE (la
couleur moins son gris). Règle pour les portes à venir : une couleur qui porte
un sens se reconnaît à sa teinte, jamais à sa luminance seule.

## Retractions and Corrections

- **2026-09-23 — la « deuxième scène » annoncée n'était pas la bonne
  candidate.** « Ce que cet ADR ne tranche pas » nommait la cuve à ondes de
  `pc/ondes-mecaniques-periodiques`. Relue contre le §1 du même ADR, elle n'y
  passe pas : la diffraction par une fente, dans une cuve, est un phénomène
  PLAN, et une scène 3D y ajouterait du relief sans rien ajouter à l'idée.
  Elle reste une dette de manipulation, à payer par un manipulable 2D. La
  deuxième scène livrée est la sphère (addendum ci-dessus).
- **2026-09-23 — §6 était trop étroit.** « Rien avant l'engagement » ne
  couvrait que le temps et les contrôles ; les fiches, les verdicts, les
  intersections dessinées et les descriptions répondaient au pari avant qu'il
  soit posé, dans les deux premières scènes. Corrigé et gardé par les portes
  (addendum du soir) ; la règle est élargie à tout ce qui dépend de l'issue.
