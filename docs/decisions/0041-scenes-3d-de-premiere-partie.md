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

**Et la porte a été éprouvée sur le PRODUIT, pas seulement sur ses attentes**
(ADR 0038). Les deux formes de la misconception, posées dans le code et
rebâties : la coupe dessinée en anneau fait rougir la famille `pixels` seule
(disque rempli à 41 et 38 %) ; le volume sans le carré, π ∫ f, fait rougir
`nombres` et `frontiere` seules (16,76 lu pour 8π ≈ 25,13). Chaque défaut n'a
atteint que la porte qui le garde.

## Addendum du 2026-09-24 (suite) — la sixième scène : le manège ; et l'ergonomie devient une famille de porte

`pc/rotation-axe-fixe`, R2, `[[embed:manege-axe-fixe]]`, juste après la figure
plane du moment d'une force. Critère du §1, au mot près : la figure plane
dessine l'axe comme un POINT (⊙) et toutes les forces dans le plan de la page ;
une force PARALLÈLE à l'axe y est indessinable — vue de dessus un point, vue de
côté un énorme bras de levier. Le poids d'un enfant assis au bord (245 N, à
1,50 m) ne fait pas tourner le manège d'un degré ; l'axe basculé, le même
poids, au même point, à la même distance, donne 367,5 N·m. Le moment n'est pas
une propriété de la force : c'est celle d'un couple (force, axe). Cinq étapes à
pari (le poids parallèle, l'axe basculé, deux points d'un même disque, la
répartition de la masse, l'étape libre), spec de l'architecte :
`content/pc/rotation-axe-fixe/spec-scene-manege.md`.

**Une scène à course en TEMPS RÉEL.** La poussée dure 4,0 s, comme dans
l'exemple travaillé de R4 : aucun facteur d'échelle temporelle à déclarer, donc
aucun à mal lire. Pour le poids, la preuve EST la durée pendant laquelle il ne
se passe rien ; le verdict attend la course entière. L'axe basculé s'arrête à
l'équilibre (≈ 1,08 s) : aucune oscillation, le chapitre 7 est renvoyé, pas
entamé. Le zéro du moment est STRUCTUREL dans le code (la composante d'une force
parallèle à Δ est posée à 0, jamais obtenue par un cos 90° flottant), et la
porte le lit par égalité de chaîne, « 0,0 N·m », à toutes les distances.

**Les forces sont l'ÉNONCÉ, pas la réponse : à l'encre.** Le poids et la
poussée restent visibles avant le pari, sur une seule échelle (1,00 m pour
100 N — le rapport 8:1 est l'argument). Ce que la scène AJOUTE pour répondre —
la droite d'action, le bras de levier, les arcs — est à l'accent et n'existe
qu'après le pari. Corollaire écrit pour les scènes à venir : une donnée de
l'énoncé ne se peint pas dans la couleur de la réponse, sinon la règle « aucun
pixel d'accent avant le pari » devient impossible à tenir honnêtement.

**Un pari de scène nomme un modèle DÉCLARÉ.** La scène vise un dixième modèle
de misconception, `moment-force-direction-vs-axe` (DÉCISIONS §20). La spec
exigeait qu'il soit déclaré au moment où la scène est validée ; rien ne le
vérifiait — la règle §11.58 ne lisait que les items et les points d'arrêt.
`validate-content` l'exige maintenant des paris de scène et de
`pedagogy_wiring` (essai rouge §11.195 c).

**L'ergonomie, mesurée sur le rendu — une famille commune aux six portes.** La
revue WAVE 2 de la cinquième scène a trouvé, sur le RENDU : le focus renvoyé à
`<body>` à l'ouverture, à chaque pari, et en revenant à l'étape 1 ; « Suivant »
qui laissait l'écran sur la queue d'un panneau de 1 400 à 1 900 px ; des
curseurs natifs de 16 px (poignée de 14) alors que `.curseur` (48 px) existait
sans emploi ; une phrase d'issue en région live, relue à chaque cran de
curseur ; une colonne de réglages de 212 px à 840 px de large. Devenu commun,
dans les pièces partagées :
1. **le focus ne tombe jamais à `<body>`** — le titre de l'étape le reçoit à
   l'ouverture et à chaque changement d'étape (la page remonte au haut de la
   scène si le titre est hors de vue, sans animation) ; le choix coché reste
   focalisable (`aria-disabled`) — dans TOUT le produit, pas seulement dans
   les scènes : chaque point d'arrêt renvoyait le focus à `<body>` ; « Ton
   pari : … » le reçoit quand il remplace la liste ; « Précédent » à l'étape 1
   est `aria-disabled` ;
2. **les curseurs sont `.curseur`** (poignée à l'encre douce dans une scène :
   l'accent reste à l'objet étudié) ;
3. **chaque étape garde son pari** ; « Recommencer » repart à blanc ;
4. **une seule région live par geste** : la phrase d'issue ne l'est plus quand
   elle suit un curseur (le verdict de l'orbite, qui ne change qu'à la bascule,
   le reste) ;
5. **la colonne des réglages ne descend jamais sous 18rem** ; au téléphone, les
   vues suivent le pari et le lancement, plus la fiche ;
6. **la porte le mesure** : `scripts/lib/scene-ergonomie.mjs`, famille
   `ergonomie` de chacune des six portes — ouvrir, parier, avancer, revenir AU
   CLAVIER sans perdre le focus ; au téléphone, Tab de commande en commande sans
   qu'aucune ne se range sous la scène collante ni sous le header ; toute cible
   visible du panneau ≥ 44 px (WCAG 2.5.5 — le normatif armé, ADR 0039).

## Addendum du 2026-09-24 (soir) — la revue des captures : un réglage qui répondait au pari SUIVANT, et des étiquettes qui se posent

Le manège était vert (71 mesures, 17 familles). Les captures prises pour la
vague 2 ont montré, en les LISANT, trois choses qu'aucune famille ne mesurait.

**1. Le contrat du §6 vaut ENTRE les étapes.** L'étape 3 (« deux points, un
seul angle ») ouvrait, après sa révélation, le curseur des sièges. Le pousser à
1,50 m et relancer affichait ω = 1,0 rad/s — la réponse exacte du pari de
l'étape 4, une étape avant qu'il soit posé. Et sa `suite` promettait « l'angle
non plus » : faux, déplacer les sièges déplace des masses, J change, l'angle
avec. Chaque famille regardait SON étape ; la fuite passait d'une étape à
l'autre par un RÉGLAGE. Règle, désormais : **ce qu'une étape révélée ouvre ne
doit pas atteindre l'état qu'un pari suivant fait deviner** — un réglage est le
seul chemin vers un état. C'est la deuxième FORME de la même fuite (ADR 0036) :
le 2026-09-24 au matin, les lignes de fiche du solide de révolution
répondaient aux paris suivants dès l'étape 1 ; le soir, un curseur. L'étape 3
ouvre maintenant `instant` — la même course, parcourue à la main, au pas de
0,1 s : il atteint t = 3,2 s EXACTEMENT, où la fiche affiche les 0,60 et
3,00 m/s de R1 (en temps réel, la porte n'avait jamais fait mieux que 3,25 s ;
un élève non plus). Famille `fuite-inter-etapes` : la porte écrit elle-même
quel réglage répond à quel pari (les sièges → étape 4, la poussée → étape 5),
contre le descripteur.

**2. Une étiquette de texte se POSE ; elle ne se centre pas sur son ancre.**
`poser` centre une étiquette sur le point qu'elle nomme. Vue du dessus — la vue
que le retour du pari de l'étape 1 demande —, « 245 N » et « dans le plan de
rotation : 0 N » tombaient sur le même point, illisibles ; de côté, « 245 N »
était barré par sa propre flèche. `disposer` (pièce commune, `Plateau.tsx`)
essaie l'ancre puis douze directions à huit distances et garde la place au coût
le plus bas : hors du cadre ≫ sur une étiquette ≫ barrée par un trait ≫ loin.
Première version en « première place parfaite, sinon la première libre » : la
porte l'a prise en défaut deux fois sur quatre-vingt-dix mesures. Famille
`etiquettes`, à 1 280 ET à 390 px, écrite une seconde fois dans la porte
(Liang–Barsky, rien d'importé). Les cinq premières scènes posent encore leurs
étiquettes avec `poser` — des lettres (N, P, S, H, Δ), sans collision vue ; les
faire passer à `disposer` est ouvert, leurs portes ne le mesurent pas.

**3. Ce que la scène écrit en texte passe par la police du chrome.** « à ω
constante » s'affichait « à Ω constante » : Geist dessine ω comme Ω (ADR 0030,
addendum du même jour). Corrigé à la racine, pour tout le produit ; la scène
écrit aussi désormais ses en-têtes de tableau en KaTeX ($v = d\,\omega$), comme
la fiche.

## Addendum du 2026-09-24 (nuit) — la cuve à ondes : une scène PLANE sur les mêmes pièces, et ce qu'une simulation doit à sa porte

La première entrée des « Retractions and Corrections » ci-dessous laissait une
dette : la diffraction dans une cuve est un phénomène PLAN, « à payer par un
manipulable 2D ». Elle est payée (`pc/ondes-mecaniques-periodiques`, R5 ; spec
`spec-scene-cuve.md` ; HANDOFF §11.197 ; DÉCISIONS §21). Une cuve vue de
dessus, dont l'eau est CALCULÉE pendant que l'élève regarde (l'équation d'onde
en différences finies, grille de 0,5 mm), cinq étapes à pari.

**1. Une scène plane reprend TOUT l'appareillage, sauf la 3D.** Même registre
(`scenes.json`, `"dimension": "2d"`), même descripteur (`"tool": "scene2d"`),
même opt-in au clic, mêmes étapes, même pari avant tout, même famille
ergonomie, même porte au rendu. Ni caméra, ni three.js — et la porte le prouve
PANNEAU OUVERT : `window.__THREE__` indéfini, canvas en contexte 2d. Il a fallu
pour cela sortir la lecture des jetons de couleur de `scene3d/palette.ts`, qui
importait three pour sa `Color` (`lib/jetons-figure.ts`) : importer une pièce
commune ne doit pas charger le moteur d'une autre.

**2. La seconde voie d'une SIMULATION établit des invariants, pas des nombres.**
Un second solveur, avec les mêmes approximations, ne prouverait rien de plus ;
avec d'autres, il donnerait d'autres chiffres. La porte lit donc sur le rendu ce
que le champ doit satisfaire QUELLE QUE SOIT sa numérique, avec les seules
constantes de la spec : λ = c/f et a/λ par égalité de chaîne ; a et λ en
cellules entières ; λ mesurée sur l'eau, la même des deux côtés de la paroi,
juste à 3 % et jamais égale au bit près à c/f (une mesure, pas un écho du
réglage) ; la fréquence au flotteur des deux côtés ; et les deux phrases du
chapitre comme deux SENS DE VARIATION — à λ fixée, le signal à 60° croît quand
l'ouverture se referme ; à ouverture fixée, il croît quand λ s'allonge.

**3. La porte a le droit de mesurer ce que le produit n'a pas le droit
d'enseigner.** Le cadre exclut toute largeur angulaire chiffrée (θ = λ/a est
au chapitre de la lumière) : la scène n'en affiche aucune, et la famille
`frontiere` le vérifie. Mais la porte, elle, lit des amplitudes angle par angle
— c'est ainsi qu'elle sait que la scène dit vrai.

**4. Une image de simulation se juge contre la PHRASE qu'elle illustre.** Au
premier passage, la porte a rougi sur « va tout droit » : derrière une
ouverture de 8λ, l'ombre était peinte pleine d'arcs, pendant que le retour du
pari disait « l'eau n'a presque pas bougé ». Le champ, lui, était juste (0,01 à
0,1 de l'onde dans l'ombre, mesurés) : c'était l'EXPOSITION — une échelle
unique, en racine, choisie pour que l'onde faible d'une fente étroite reste
visible. Elle est désormais déclarée, par côté de la paroi (la ride la plus
forte de ce côté = le plus sombre), et le `fit_caveat` dit ce que l'image tait :
l'énergie. Règle : **la manière de MONTRER un champ calculé est un choix de
mesure, et il se vérifie contre les mots de l'étape — pas contre le champ.**

**5. Un artefact numérique peut INVERSER la leçon.** Deuxième passage : à
ouverture de 0,50 cm, le signal à 60° valait 25 · 74 · 94 · 77 % quand λ
s'allongeait — une fente plus étroite devant λ qui étalait MOINS. La cause
n'était ni la physique ni la mesure : des bandes absorbantes de 2 cm, plus
minces que la longueur d'onde de 4 cm, en renvoyaient une partie, qui
interférait sur l'arc. Isolé par une expérience sur le solveur seul (bandes de
2, 4, 6 cm ; une condition de Mur au bord n'y changeait rien) ; à 4 cm, une
fente étroite devant λ rayonne presque à plat, comme le veut la théorie (97 à
100 % de 0° à 60° sur le solveur seul ; 93 et 91 % à 60° dans le produit).
Corollaire pour la porte : **une mesure RELATIVE sature** (100 % = le maximum
sur l'arc) ; exiger qu'elle croisse strictement jusqu'au bout ferait rougir
sur du bruit. La porte exige la croissance jusqu'à saturation (≥ 85 %), et une
variation franche d'un bout à l'autre (≥ 30 points) — un profil plat saturé
partout ne passerait pas.

**6. Une porte qui pilote un calcul PAR IMAGE doit tenir sa page au premier
plan.** Un onglet d'arrière-plan reçoit environ une image par seconde : la
course de 2 s y durait plus de 90 s. Et le produit, qui promet de dire quand
l'appareil ralentit, disait « ×0,52 » quand il avançait à 6 % — il divisait les
pas faits par les pas DEMANDÉS, plafonnés par image. Il mesure désormais contre
l'horloge.

**7. Une image ARRÊTÉE est un instant CHOISI — et ce choix se relit.** Les
captures de l'étape 2 (la plus importante de la scène) montraient, devant la
paroi, des taches au lieu de rides droites. Deux causes superposées, trouvées
en mesurant avant de corriger : des bandes absorbantes en haut et en bas qui
rongeaient une onde plane large de quatre longueurs d'onde (devant la paroi, la
cuve est désormais un CANAL aux bords rigides, comme une vraie cuve dont la
règle touche les deux bords) ; et un arrêt à 2,0 s pile qui tombait, à 5 Hz,
sur un ZÉRO de l'onde stationnaire que la paroi renvoie — 1 % de son énergie à
l'écran, le reste était du résidu. La course s'arrête maintenant au prochain
maximum, et la légende dit l'instant. Au passage, λ mesurée devant la paroi
passe de 2,02 à 2,00 cm (0,01 % de l'autre côté). Règle : **quand un produit
montre un instant d'un phénomène périodique, l'instant fait partie de ce qu'il
affirme** — la porte lisait des mesures justes sur une image qui ne l'était pas.

**8. Une onde rapide au ralenti est un motif d'ÉCLAIRS — et cela se mesure.**
La revue ergonomie de la vague 2 l'a vu sans le mesurer : au ralenti ×5, une
onde de 40 Hz inverse chaque point de l'eau huit fois par seconde, et la
grille couvre plus de la moitié d'un champ visuel de 10° — le motif de rayures
que le critère WCAG 2.3.1 (niveau A) nomme. Mesuré ensuite sur le canvas du
produit, contraste plein : **63 %** d'une fenêtre de 10° éclairait plus de trois
fois par seconde. Pendant qu'une onde de plus de trois inversions par seconde
DÉFILE, l'eau est maintenant dessinée sous la définition même de l'éclair
(chaque couleur au-dessus de 0,80 de luminance sur fond clair, à moins de 0,08
du fond sur fond sombre) ; l'image arrêtée reprend son contraste d'étude en
450 ms ; et si le système demande moins de mouvement, la cuve CALCULE sans
animer, puis montre l'image finale (bouton « Image finale » pour tous). Deux
familles de porte, `eclairs` (qui lit les pixels du produit image par image
et compte les paires de variations, comme le critère) et `sans-mouvement` ; un
sabotage du produit (le pâle retiré) les fait rougir. Règle : **une scène qui
anime un phénomène périodique rapide doit être jugée contre le critère des
éclairs, sur ses pixels** — une porte de nombres n'y voit rien, et la revue qui
l'a trouvé ne mesurait pas.

## Addendum du 2026-09-24 (après-midi) — la corde : une scène ANALYTIQUE, et une fuite qui passe par la donnée elle-même

Le huitième manipulable, le deuxième PLAN : « la corde : la photo et le film »
(`pc/ondes-mecaniques-progressives`, en tête de R3 ; spec
`content/pc/ondes-mecaniques-progressives/spec-scene-corde.md`). Une corde de
4 m vue de côté, calculée par la seule relation de la leçon — y(x, t) =
y_S(t − x/v) : une TRANSLATION, pas un solveur —, avec ses deux graphiques :
le FILM d'un point (y en fonction de t) et la PHOTO de la corde (y en fonction
de x), dont l'un est le MIROIR de l'autre. Mêmes pièces que la cuve (opt-in,
étapes, paris, plateau paysage, `scene2d`), aucune 3D.

**Elle ne solde aucune dette.** C'est la première scène qui n'acquitte rien
d'écrit : aucune spec n'avait prescrit ici un manipulable. Elle se justifie
par un trou MESURÉ (aucun des cinq médias de la notion ne trace une élongation
en fonction du TEMPS ; rien ne dit que la photo est le geste retourné) et par
un savoir-faire à 0 % (« proposer un montage de mesure »). `dette-manipulable`
ne bouge pas ; `media-manipulable` monte d'une notion.

**Deux règles nées de sa spec, gravées ici :**

1. **Une seconde voie ANALYTIQUE recalcule des NOMBRES ; une SIMULATION
   n'établit que des invariants.** La porte de la cuve s'interdisait de refaire
   les nombres d'un champ calculé (un second solveur ne prouve rien de plus) ;
   la porte de la corde, elle, refait chaque τ, chaque front, chaque élongation,
   chaque chaîne de mesure depuis les constantes de la spec, par sa propre
   arithmétique, et exige l'égalité de CHAÎNE. Le critère n'est pas la scène,
   c'est la nature de son calcul.
2. **Une SYMÉTRIE du réglage d'une étape peut être la condition de non-fuite
   d'une étape suivante.** Le film de l'étape 1 dessine la corde ; si le geste y
   était asymétrique, la corde montrerait le miroir — la réponse au pari de
   l'étape 2 — avant qu'il soit posé. Le geste de l'étape 1 est donc une bosse
   SYMÉTRIQUE, son propre miroir. Cette fuite-là ne passe ni par un affichage
   (§6), ni par un réglage ouvert (addendum du soir, `fuite-inter-etapes`) :
   elle passe par LA DONNÉE. La porte la mesure aux pixels (`miroir-inerte` : la
   bosse finale est symétrique à 2 % près) et vérifie le descripteur.

**Et une leçon de la critique pédagogique, à ne pas refaire :** la première
construction ouvrait à l'étape 5 un curseur d'instant qui, en vue « film », ne
bougeait rien sur la corde, et une lecture du front calculée depuis ce curseur
plutôt que depuis ce que la corde montrait. Deux affirmations que l'écran ne
tenait pas — la synthèse même de la scène (« deux appareils, deux axes, un seul
nombre »). Corrigé, et gardé par une famille de porte (`instant-photo`) qui
lit le front AUX PIXELS. Règle : **une lecture dit ce que la scène MONTRE, pas
ce qu'un réglage demande** — les deux divergent dès qu'un réglage ne s'applique
pas.

**Et une règle de RENDU, née du premier passage de la porte :** un tracé
échantillonné sur une grille qui GLISSE avec l'instant (« n points entre 0 et
t ») fait trembler ses sommets d'un pixel à chaque image. Invisible sur une
capture ; pour la porte `eclairs`, 14 éclairs par seconde (WCAG 2.3.1). Toute
courbe animée d'une scène se trace sur une grille FIXE — un point par pixel,
toujours aux mêmes places — plus les COUDES exacts de ce qu'elle dessine. Le
sabotage qui rétablit la grille glissante est dans la campagne de la porte.

**Et une règle de MESURE, née de la campagne de sabotages :** une porte qui lit
des pixels lit l'ENCRE DE L'OBJET, jamais un tracé que le produit dérive de ses
propres nombres. Après le verdict de l'étape 3, la scène trace en accent une
règle entre les deux fronts qu'elle CALCULE ; la porte cherchait « la colonne
levée la plus à droite » du second cliché — et trouvait le bout de cette règle.
Le sabotage « les deux photos au même instant » est resté VERT : la photo était
fausse, la règle juste, et la porte lisait la règle. Exactement le troisième cas
de l'ADR 0033 (une porte exacte sur une question plus étroite que son en-tête).
Corrigé : la lecture ignore l'encre colorée ; rejoué, le même sabotage rougit.

**Et une affirmation de critique, rejouée avant d'être corrigée :** la vague 2
affirmait la scène collante INERTE au téléphone sur les huit scènes (« un élément
de grille ne voyage que dans sa case »). Mesuré sur l'ancien panneau — la grille
remontée 120 px au-dessus de l'écran —, la scène restait à 56 px, sous le
header : FAUX. La correction écrite d'avance a été retirée ; le test mécanique
reste dans la porte ergonomie commune. ADR 0036 : un diagnostic non rejoué est
une rumeur — y compris celui d'une critique qu'on a soi-même commandée.

### Addendum (soir du 2026-09-24) — la neuvième scène : deux voies de calcul dans une scène

« La courbe et les noyaux » (pc/decroissance-radioactive, R4, §11.202) porte une
courbe ANALYTIQUE et une grille STOCHASTIQUE. **Une scène peut porter les deux
voies, à condition que chaque lecture déclare de laquelle elle vient** (« la loi
prévoit » / « on compte ») **et que la porte applique à chacune son exigence** :
des nombres refaits par égalité de chaîne pour la loi (règle de la corde), des
INVARIANTS à bandes larges pour le tirage (règle de la cuve). Corollaires, mesurés :

- **« Deux tirages diffèrent » se mesure sur le MOTIF, jamais sur le compte** :
  deux courses donnent le même compte ~3 % du temps, et une porte instable est
  pire qu'une porte absente. Le compte ne sert qu'à l'inverse — cinq tirages de
  64 tous à exactement 32 (probabilité ~10⁻⁵) trahissent l'horloge.
- **Ce qu'aucun comptage ne distingue du bruit se garde autrement, et la porte
  l'écrit** : p = λΔt au lieu de 1 − e^(−λΔt) déplace la survie de 0,24σ sur
  1 024 noyaux. La probabilité par pas est exposée dans un attribut de mesure
  (`data-p-pas`, jamais un texte) ; la porte la recalcule, un test unitaire garde
  le modèle.
- **La frontière interdit des FORMES** (√, \sqrt, « écart typ », dater, datant…),
  cherchées en DÉBUT de mot et en Unicode (`\b` ignore « é » : « intégration »
  était trouvé dans « désintégrations ») ; l'essai rouge injecte chaque forme
  dans le panneau et exige qu'elle soit vue.

**Et une règle de rendu, née de la figure d'énoncé :** une figure placée dans
l'énoncé d'un exercice est FIGÉE à l'étape d'énoncé que déclare son
`.stages.json` ; ce qui suit — la lecture — est absent du DOM, avec les
commentaires d'auteur du SVG. Un bouton « Suivant » dans un énoncé donne la
réponse avant la tentative.

## Addendum de la nuit du 2026-09-24 — le banc de diffraction : une révélation qui pose un réglage, et une relation qui fuit par son texte

Le dixième manipulable, quatrième PLAN : `banc-de-diffraction`, en tête de R3 de
`pc/propagation-onde-lumineuse` (HANDOFF §11.204). Sans temps ni course. Deux
pièces neuves, écrites ici parce qu'elles valent pour les scènes suivantes.

**1. `etat_revele` : la révélation pose le réglage que le pari interrogeait.** Dans
une scène sans temps, le verdict est immédiat — et jusqu'ici la scène, elle, ne
bougeait pas : le pari « une fente deux fois plus fine, la tache mesurera… » aurait
reçu son verdict pendant que la règle montrait encore l'ancienne tache. La clé
`etat_revele` d'une étape s'applique UNE fois à la révélation (et de nouveau quand on
revient à une étape déjà révélée) : c'est la scène qui répond, sur la règle, avant le
texte. `validate-content` la contrôle comme `etat` (mêmes clés, mêmes bornes) et la
refuse sans pari.

**2. La relation est un ÉTAT qui fuit — la quatrième forme de la fuite**, après
l'affichage (§6), le réglage ouvert (`fuite-inter-etapes`) et la donnée
(`miroir-inerte` de la corde). Quand une scène construit une relation à plusieurs
facteurs (L = 2λD/a : a, puis λ, puis D), **le retour d'une étape ne contient que les
facteurs que cette étape a fait varier** : écrire la relation entière au retour de S1
donnerait les paris de S2 et de S3. La porte le lit dans le `textContent` — les
annotations TeX de KaTeX comprises, parce que c'est la forme que le produit ÉCRIT
(ADR 0039) — dans les deux sens : absent avant, présent après (`formule-graduee`).

Et deux leçons de construction : un nom posé sur la scène qui ne tient nulle part
près de son objet va dans la LÉGENDE (la courbe et les noyaux, même nuit) ; et un
instrument qui lit une tache au pixel se déclare aveugle sous une taille (8 px) plutôt
que de rendre un verdict sur ce qu'il ne résout pas.

**3. Ce que la vague 2 du banc ajoute à l'appareillage.** Une étiquette SANS FOND ne
se pose jamais sur de l'encre : les portes vérifiaient les étiquettes entre elles, et
contre la légende — pas contre le DESSIN sous une étiquette transparente ; « D (cm) »
recouvrait 28 pixels de « 200 » (mesure neuve de `etiquettes`, rouge sur le build
d'avant). Une révélation qui CHANGE un réglage le DIT (la région vivante), et un
curseur ne parle qu'une fois par cran (la valeur qui dépend de lui dans son
`aria-valuetext`, rien dans la région vivante). La valeur qu'on règle et la valeur
qu'on lit vont ENSEMBLE sur la scène collante (« L = 2,40 cm » comme « D = 2,00 m ») :
la liste des lectures défile, la scène non. Une ligne radio COCHÉE porte une surface
(`.ligne-radio:has(input:checked)`) : le survol ne se lit plus comme la sélection. Et
« environ 3:1 » écrit à côté d'un trait n'est pas une mesure : 0,6 d'encre douce
donnait 2,91:1 dans le graphe des noyaux comme dans celui du banc (0,7 : 3,6:1).

## Addendum du 2026-09-25 — le tremplin circulaire : une réponse sans existence d'énoncé, une frontière de RANG, et deux flèches sur une même droite

Le onzième manipulable, cinquième PLAN : `tremplin-circulaire`, dans R3 de
`pc/lois-de-newton`, AVANT l'énoncé de la deuxième loi (HANDOFF §11.206). La moto du
sujet national 2019 N sur sa piste ; une course de −9,0 m jusqu'à B, au ralenti ×6 ;
la base de Freinet et le vecteur accélération. Quatre pièces neuves.

**1. `etat_revele`, dans une scène à COURSE, se pose en deux temps.** Au banc (sans
course), la révélation posait le réglage d'un coup. Ici la course doit courir DANS le
réglage que la question décrit (S2 : « à 18,0 au lieu de 9,0 ») : l'ENGAGEMENT pose
les clés de réglage de `etat_revele`, sans le repère ; la RÉVÉLATION, à la fin de la
course, pose le repère où elle s'est arrêtée et le DIT. La porte mesure les deux
temps (`etapes` : « l'engagement pose v = 18 »).

**2. L'objet-réponse peut n'avoir AUCUNE existence d'énoncé.** Le manège avait posé
« une donnée de l'énoncé ne se peint pas dans la couleur de la réponse ». Ici le
vecteur $\vec a$ EST le concept enseigné : il n'a rien à peindre à l'encre, à aucune
étape, à aucun repère, même quand il est non nul et banal (sur la droite, en
freinant). `avant-pari` y mesure une absence TOTALE — ni flèche, ni $\vec u_N$, ni
centre, ni lecture —, pas une absence d'accent.

**3. Une scène peut être bornée par son RANG dans la page.** La frontière « aucune
force, aucune masse » ne vient d'aucune `limite` du cadre : elle vient de ce que la
scène précède le paragraphe qui énonce la deuxième loi. C'est une frontière de
PLACEMENT, et elle se garde exactement comme une frontière de programme — forme par
forme (`frontiere` : « force », « \vec F », « 525 N », « centripète »…). Le solide de
révolution bornait le PROGRAMME ; ici, c'est la PAGE.

**4. De deux flèches COLINÉAIRES, la plus courte est dessinée dessus.** Les vecteurs
unitaires de la base sont, par définition, colinéaires aux composantes de
l'accélération. Dessinés toujours par-dessus, $\vec u_T$ et son liseré effaçaient
$a_T$ tout entier aux gaz (25 px sous 30) — la réponse de S4 était invisible, et la
porte l'a vue (`fleches-a-l-echelle` : « composante −1 px ») ; dessinés toujours
dessous, $\vec u_N$ disparaissait sous la flèche de S1 et son nom flottait sur rien.
L'ordre de peinture se décide par la LONGUEUR ; quand les deux pointes se confondent
(à 3 px), le nom du vecteur unitaire se retire. Même règle pour la flèche de
référence (« départ »), dont le bout est un anneau par-dessus tout. Et deux mesures
neuves, rouges d'abord sur le build fautif : une étiquette OPAQUE ne cache pas la
réponse (le nom de $\vec u_T$ couvrait 95 px d'accent au pied des flèches), et un
nom ne se pose que sur ce qui se voit.

## Addendum du 2026-09-25 (suite) — le banc de modulation : un étage qui n'existe qu'à la révélation, deux lectures qui divergent, et une spec qui violait sa propre frontière

Le douzième manipulable, sixième PLAN : `banc-de-modulation`, en tête de R3 de
`pc/ondes-em-modulation` (HANDOFF §11.207). Un multiplieur (une boîte noire marquée X),
l'écran d'un oscilloscope — 10 × 8 divisions, 1,00 V/div, 0,50 ms/div —, et, à S4, un
détecteur de crête. Ni temps ni course. Cinq pièces neuves.

**1. Une révélation peut faire APPARAÎTRE un étage du schéma.** Au banc de diffraction,
`etat_revele` posait un réglage ; ici (`sortie: "modulee-et-detectee"`), il BRANCHE le
détecteur : la diode, $R_0$ et $C_0$ dans le montage, et le second tracé sur l'écran.
Avant, l'étage n'est pas caché : il n'EXISTE PAS dans le DOM — on ne peut pas répondre
au pari du détecteur depuis une étape où le détecteur n'est pas. `avant-pari` y mesure
l'absence des repères de l'étage ; `fuite-inter-etapes` réécrit la table des états
ATTEIGNABLES avant chaque étape (l'état posé, sa révélation, puis chaque contrôle
ouvert sur tous ses crans) et vérifie que « détecteur branché » n'apparaît qu'à la
révélation de S4, et « (1,2 kHz, détecteur) » qu'à S5.

**2. Là où une méthode de lecture SATURE, la scène affiche les deux lectures, l'une
sous l'autre.** Dès que $m \ge 1$, $U_{min}$ lu vaut 0 et
$(U_{max}-U_{min})/(U_{max}+U_{min})$ rend exactement 1,00 quel que soit le vrai $m$ ;
et $(U_{max}+U_{min})/2$ cesse d'être $A$ (1,25 V contre 1,00 V à $m = 1{,}50$). Le
taux LU et le taux RÉGLÉ, l'amplitude LUE et l'amplitude RÉGLÉE : identiques tant que la
méthode tient, différents dès qu'elle cède — la porte (N4) exige les DEUX sens. Une
lecture qui sature affichée seule enseignerait un faux nombre ; la réglée seule
cacherait pourquoi les sujets demandent alors de « conclure sur la qualité ».

**3. Les notes d'honnêteté sont du texte, et le texte fuit.** Les quatre lignes de
`fit_caveat` parlent du taux $m$ et du détecteur ; affichées dès S1, elles écrivaient
« diode » trois étapes avant le pari du détecteur. Les notes suivent la chaîne comme
le reste : la ligne sur $m$ à partir de S2, celle du détecteur une fois l'étage
branché. `formule-graduee` lit les notes avec le panneau.

**4. Une spec peut violer sa propre frontière — et se tromper là où elle ne
recalcule pas.** Les textes que la spec rédigeait portaient des formes que son §9
interdisait (« montage de TP », « 5 % » de la sortie du détecteur, « ondulation »,
« au demi-carreau près », « déphasée ») : la frontière s'applique AUX TEXTES DE LA
SPEC, qui ne sont qu'une proposition de plus. Et la spec, vérifiée nombre par nombre,
se trompait sur ce qu'elle ne recalculait pas : un argument de sensibilité faux (à
2 V/div, les crêtes ne « deviennent » pas 6 et 2 V — ce sont les divisions qui
changent) ; « la descente dure un quart de période » (une demi) ; « 8,06 div »
(8,08) ; et une récurrence du détecteur qui, sous la bosse retournée ($m > 1$),
chargeait le condensateur sur une crête NÉGATIVE. La vague 1 a trouvé deux
défauts de plus — un contrôle prescrit qui n'existait pas, et la contradiction de
notation que la sous-section neuve créait avec la leçon qu'elle devait réconcilier.

**5. Une courbe se trace sur une grille de pixels FIXE, plus les instants exacts de
ses crêtes ; et son origine est celle des traits.** Échantillonnées au pixel seul,
les crêtes d'une porteuse à 8 kHz tombaient sous l'enveloppe d'un écart qui changeait
avec le cran — l'enveloppe n'aurait pas été « inerte », ce que la scène existe pour
montrer. Et l'axe tracé au milieu d'un pixel (`net`) tombait un demi-pixel sous le zéro
des courbes : l'origine des tracés est désormais celle des traits.

**6. Une porte lit un tracé aux instants que la PHYSIQUE désigne, jamais à ses extrema
locaux — et un quadrillage se peint opaque.** L'enveloppe ne touche une porteuse
qu'aux extrema de celle-ci, $t_k = k\,T_p/2$ ; entre deux, l'extremum LOCAL du tracé
tombe à côté et dessous (1,5 px à 1,2 kHz). La première porte lisait les maxima locaux
et rougissait sur un produit juste ; elle lit maintenant aux $t_k$, avec le signe que la
spec prescrit — ce qui lui fait MESURER l'opposition de phase sous la bosse, au lieu de
la supposer. Et Chromium compose DEUX FOIS les sous-chemins qui se croisent dans un
même trait semi-transparent (sonde : 168 au nœud contre 204 sur la ligne) : chaque nœud
d'une grille à 30 % devient un point à 51 %, un faux sommet pour qui lit l'écran — la
porte comprise. Le banc de modulation peint sa grille en couleur opaque (le voile de
l'encre sur la surface, calculé depuis les jetons, donc juste dans les deux thèmes), et
c'est la règle des rendus plans à venir. **Dette écrite** : `diffraction-rendu.ts` et
`noyaux-rendu.ts` peignent encore leurs quadrillages en transparence, trait par trait —
leurs nœuds sont plus sombres que leurs lignes ; leurs portes ne lisent pas de crêtes à
travers, et sont vertes. À reprendre dans une passe commune, portes relancées.

## Addendum du 2026-09-25 (soir) — le banc d'électrolyse : une colonne muette se mesure comme une égalité, et une formule se lit par sa source

Le treizième manipulable (`pc/electrolyse`, en tête de R4 ; HANDOFF §11.208), le
septième PLAN, à course. Trois points qui valent au-delà de lui :

1. **Montrer qu'une grandeur N'AGIT PAS est un fait de première classe, et il se
   mesure comme une ÉGALITÉ DE CHAÎNES, pas comme une absence.** Le cœur du banc est
   que la tension ne décide que du sens : aux trois tensions, charge, masse et quotient
   doivent être les MÊMES caractères (27 états, 9 jeux de valeurs — la ligne N12 de la
   porte). La façon la plus sûre de le tenir est structurelle : la tension n'est
   l'argument d'AUCUNE fonction de calcul du modèle, et le test unitaire le vérifie
   sur les signatures. Une scène qui veut enseigner « ceci ne compte pas » doit donner
   à ce bouton un rôle réel (ici, le sens et l'aiguille qui ne bouge pas) — sinon l'élève
   apprend qu'il est décoratif, pas qu'il est muet.
2. **Le texte d'une formule KaTeX se lit par sa SOURCE** (prolongement de l'ADR 0039,
   « la forme que le produit écrit »). Son `textContent` concatène le MathML, la source
   TeX et le rendu : « $1{,}1$ volt » s'y lit « 1,11{,}11,1 volt ». Toute sonde de
   frontière, de formule graduée ou de nombre remplace chaque `.katex` par son
   annotation avant de chercher.
3. **Un petit effet se lit par son GENRE avant sa mesure.** À 30 min et 0,200 A, la
   lame qui se dissout ne perd qu'un pixel : la mesure ne tranche plus. Le rendu garde
   le contour d'origine en TIRETS, et la porte lit sur une colonne si l'accent y est
   PLEIN (un dépôt) ou en TIRETS (une entaille) — une lecture catégorielle qui tient à
   1 px, puis la mesure là où elle a un sens. C'est le même geste que le côté de
   l'aiguille (un signe) avant sa déviation (un nombre).

## Retractions and Corrections

- **2026-09-23 — la « deuxième scène » annoncée n'était pas la bonne
  candidate.** « Ce que cet ADR ne tranche pas » nommait la cuve à ondes de
  `pc/ondes-mecaniques-periodiques`. Relue contre le §1 du même ADR, elle n'y
  passe pas : la diffraction par une fente, dans une cuve, est un phénomène
  PLAN, et une scène 3D y ajouterait du relief sans rien ajouter à l'idée.
  Elle reste une dette de manipulation, à payer par un manipulable 2D. La
  deuxième scène livrée est la sphère (addendum ci-dessus). **Payée le 2026-09-24** : la cuve à ondes, manipulable plan sur les mêmes
  pièces (addendum de la nuit du 2026-09-24).
- **2026-09-23 — §6 était trop étroit.** « Rien avant l'engagement » ne
  couvrait que le temps et les contrôles ; les fiches, les verdicts, les
  intersections dessinées et les descriptions répondaient au pari avant qu'il
  soit posé, dans les deux premières scènes. Corrigé et gardé par les portes
  (addendum du soir) ; la règle est élargie à tout ce qui dépend de l'issue.
- **2026-09-24 — « 1, 12 ou 40 tranches » (addendum de la cinquième scène) est
  devenu « 1, 8 ou 16 ».** La revue calme a jugé qu'à 40 tranches l'accent
  noyait la scène ; le curseur s'arrête à 16, la porte mesure l'invariance du
  volume à n = 1, 8, 16. L'argument (aucune somme, la valeur exacte à tout n)
  est inchangé.
- **2026-09-24 — §7 disait le contrat de focus « vérifié en donnant le focus,
  pas en le supposant » ; il ne l'était pas.** Une seule mesure de clavier
  existait (deux flèches sur un curseur, scène 5), et la revue ergonomie a
  trouvé le focus perdu à l'ouverture, à chaque pari et au retour à l'étape 1,
  dans les cinq scènes. Corrigé dans les pièces communes et gardé par la
  famille `ergonomie` des six portes (addendum ci-dessus). Une règle écrite au
  présent n'est pas une règle vérifiée.
- **2026-09-24 (soir) — l'élargissement du §6 du 2026-09-23 (« à tout ce qui
  dépend de l'issue ») était encore trop étroit.** Il pensait l'ÉTAPE : ce
  qu'elle affiche avant son propre pari. Une étape révélée pouvait ouvrir le
  réglage qui répond au pari de l'étape SUIVANTE (manège, étape 3 → étape 4).
  Corrigé et gardé (addendum du soir, famille `fuite-inter-etapes`) ; la
  `suite` fausse de l'étape 3 (« l'angle non plus ») est retirée — la porte
  vérifiait les nombres affichés, qui étaient justes, pas la phrase qui les
  annonçait.
- **2026-09-24 (nuit) — le contrat de focus de l'addendum ergonomie (point 1,
  « le focus ne tombe jamais à `<body>` ») laissait passer un focus aussi perdu
  que celui-là : un focus HORS DE L'ÉCRAN.** Dans les six scènes à course,
  l'élève au clavier lance la course ; le verdict, la suite et les lectures
  s'insèrent au-dessus de « Lancer… », qui descend de 1 000 à 2 000 px sous
  l'écran — Entrée relance à l'aveugle. La règle devient : **on ne déplace
  jamais un focus que l'élève VOIT** ; tombé à `<body>` ou poussé hors de
  l'écran, il revient au choix retenu, amené dans la vue sans passer sous la
  scène collante (`PariBloc`). Et le point 6 mesurait les cibles sous une seule
  forme (`button`, `input`) : le `<summary>` des encadrés, 18 px dans trois
  scènes, n'était pas compté. Les deux sont mesurés maintenant (famille
  `ergonomie`, argument `course` ; la famille se lance seule sur les neuf scènes,
  `scene-ergonomie.mjs`) — rouges sur le produit d'avant (15 manquements), verts
  après. HANDOFF §11.203.
