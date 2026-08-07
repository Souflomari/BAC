# `chute-mouvements-plans` — Chutes verticales & mouvements plans (frottement fluide, projectile, champs)

> Annales examen national, PC-SPC (BIOF). Transcriptions **non vérifiées** —
> voir `README.md` §3 pour le protocole. Provenance sur chaque entrée.

---

## Note de routage — 2025 N Ex IV Partie 1 (satellite artificiel)

L'exercice ci-dessous (mouvement d'un satellite en orbite circulaire :
deuxième loi de Newton, force gravitationnelle, 3ᵉ loi de Kepler) a été
classé ici, **et non sous `atome-mecanique-newton.md`**, malgré une
consigne de routage générale « satellites/atome → atome-mecanique-newton.md ».
Raison, documentée honnêtement pour la traçabilité :

- Le contenu du sommet `content/pc/atome-mecanique-newton/lesson.md` porte
  spécifiquement sur le **modèle planétaire de l'électron** (force de
  Coulomb, orbite de l'électron autour du noyau, limite de la mécanique
  classique, quantification $\Delta E = h\nu$) — **pas** sur la gravitation
  ni les satellites. Un exercice sur un satellite terrestre n'y enseigne
  rien du programme propre à ce chapitre.
- `docs/sujets/pc/atome-mecanique-newton.md` lui-même, à l'issue d'une
  recherche antérieure (21 couvertures lues), concluait déjà explicitement
  que le thème « satellite artificiel (2022 N, 2025 N — gravitation, orbite
  circulaire) … relève de la **mécanique céleste**, pas du chapitre atome ».
- `content/pc/atome-mecanique-newton/exercises.yaml` documente une décision
  **verrouillée par le propriétaire du plan** : ce sommet reste
  délibérément `unsourced` (le seul de la campagne PC), avec un exercice
  interne non officiel (`r-bac`) explicitement `required_for_done: false`.
  Y déverser un exercice de satellite casserait cette décision sans
  justification pédagogique.
- Le contenu « gravitation et mouvement circulaire, 3ᵉ loi de Kepler,
  satellite géostationnaire » est en réalité déjà enseigné dans
  `content/pc/chute-mouvements-plans/lesson.md` (rungs R9–R10), qui est
  donc le sommet correctement adossé à cet exercice.

Voir aussi la note symétrique ajoutée dans `atome-mecanique-newton.md`
(2026-08-06).

La même logique de routage s'applique à l'entrée **2022 N Exercice 4
Partie 2** (satellite artificiel), transcrite plus loin dans ce fichier —
`atome-mecanique-newton.md` cite d'ailleurs déjà « satellite artificiel
(2022 N, 2025 N — gravitation, orbite circulaire) » comme thème hors
périmètre du chapitre atome, dès sa recherche antérieure (21 couvertures
lues). Précédent direct pour ce classement.

---

## 2020 — session normale — Exercice V
Source: https://www.alloschool.com/element/109742
Statut: vérifié — re-fetch indépendant AlloSchool + diff OK (agent-vérificateur, 2026-07-11)

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS28F · Barème de l'exercice : 2,5 points
- Images lues : `.../course-422/upload-80870/0007-big.jpg`
- Pages du scan : 7 (sur 7)

**Étude du mouvement de chute verticale d'une bille dans un liquide visqueux.**

On se propose d'étudier le mouvement de la chute verticale, avec frottement
fluide, dans un liquide visqueux d'une bille homogène de masse $m$.

À l'aide d'une caméra numérique et d'un logiciel adéquat, on suit l'évolution de
la vitesse du centre d'inertie $G$ de la bille lors de sa chute verticale dans un
liquide visqueux.

On étudie le mouvement de $G$ dans un référentiel terrestre supposé galiléen.

On repère la position de $G$, à chaque instant $t$, par son ordonnée $y$ sur
l'axe vertical $(O, \vec{j})$ orienté vers le bas (figure 1).

Les forces de frottement fluide exercées sur la bille sont modélisées par la
force : $\vec{f} = -k\,v\,\vec{j}$ ; avec $v$ la vitesse instantanée de $G$ et $k$
une constante positive.

On néglige la poussée d'Archimède par rapport aux autres forces exercées sur la
bille.

**Données :**
- accélération de la pesanteur : $g = 10\ \text{m.s}^{-2}$ ;
- $m = 2{,}5 \cdot 10^{-2}\ \text{kg}$.

1. (0,5) En appliquant la deuxième loi de Newton sur la bille, montrer que
   l'équation différentielle du mouvement du centre d'inertie $G$ s'écrit :
   $\dfrac{dv}{dt} + \dfrac{k}{m}\,v = g$.
2. (0,25) Trouver l'expression de la vitesse limite $v_\ell$ de $G$ en fonction
   de $g$, $m$ et $k$.
3. (0,25) La courbe de la figure 2 représente l'évolution de la vitesse $v$ du
   centre d'inertie $G$ de la bille. Déterminer graphiquement la valeur de
   $v_\ell$.
4. (0,5) Vérifier que, dans le système international d'unités, l'équation
   différentielle du mouvement de $G$ s'écrit ainsi :
   $\dfrac{dv}{dt} = 10 - 6{,}67\,v$.
5. À l'aide des données du tableau ci-contre et de la méthode d'Euler, calculer :
   1. (0,5) l'accélération $a_1$ à l'instant $t_1$.
   2. (0,5) la vitesse $v_3$ à l'instant $t_3$ sachant que le pas de calcul est :
      $\Delta t = 0{,}015\ \text{s}$.

   | $t$ | $v\ (\text{m.s}^{-1})$ | $a\ (\text{m.s}^{-2})$ |
   |-----|:----------------------:|:----------------------:|
   | / | / | / |
   | $t_1$ | 0,150 | $a_1 = \ldots$ |
   | $t_2$ | 0,285 | 8,10 |
   | $t_3$ | $v_3 = \ldots$ | / |

*Figure 1 (schéma) :* axe vertical $(O, \vec{j})$ orienté vers le bas ; la bille
(centre $G$) tombe dans le liquide visqueux le long d'une règle graduée ;
ordonnée $y$ croissante vers le bas.

*Figure 2 (courbe) :* $v\ (\text{m.s}^{-1})$ en fonction de $t\ (\text{s})$ ;
courbe croissante depuis $0$ vers un palier (vitesse limite) au voisinage de
$v_\ell \approx 1{,}5\ \text{m.s}^{-1}$ *(lecture d'échelle à confirmer)* ;
ordonnées graduées $0{,}3,\ 0{,}6,\ 0{,}9,\ 1{,}2,\ 1{,}5$ ; abscisses graduées
$0{,}15,\ 0{,}3,\ 0{,}45,\ 0{,}6$.

---

## 2019 — session normale — Exercice IV (Partie II)
Source: https://www.alloschool.com/element/68300
Statut: vérifié — 2026-08-06, vérification adverse indépendante par un second
agent puis **figure re-lue en 4ᵉ passe indépendante et jugée fidèle ;
énoncé/valeurs diffé-conformes (2ᵉ passe) ; corrections des 2ᵉ/3ᵉ passes
confirmées** (README §3). Vérification adverse indépendante
(second agent) effectuée le 2026-08-06 : `element/68300` re-fetché,
`course-422/upload-54757` (7 pages) re-dérivé et **conforme** ; en-tête du scan
**confirmé** (NS28F, Sciences Physiques BIOF, 3 h, coef 7 ; Exercice IV
= 5 points, Partie I = 6 × 0,5 = 3 pts, Partie II = 4 × 0,5 = 2 pts) ; diff
caractère par caractère de la p. 7 (valeurs, unités, indices/exposants,
équations différentielles avec signes, libellés et numérotation, barème par
question) — **aucun écart** ; physique re-dérivée et cohérente
($V_C = \sqrt{19{,}02^2+6{,}18^2} = 20{,}0$ m.s⁻¹, $\tan\alpha = 6{,}18/19{,}02
\Rightarrow \alpha = 18{,}0°$, coefficient $-5 = -g/2$ ; retombée à
$t = 6{,}18/5 = 1{,}236$ s d'où $CP = 23{,}5$ m $< 30$ m, saut non réussi ;
$V_{min} = \sqrt{30g/\sin 2\alpha} = 22{,}6$ m.s⁻¹) ; partition de périmètre
**confirmée** (Partie I p. 6 = « I- Etude du mouvement sur la partie A'B' »,
plan incliné + force motrice constante + 2ème loi ⇒ bien `lois-de-newton.md`).
**(complété sur re-lecture : la phrase de cadrage du système (S), p. 5,
a été relue et intégrée ci-dessous.)** **Non promu à ce stade** (verdict de la
2ᵉ passe, levé depuis — voir ci-dessous) : la description de la
figure 1 comportait six erreurs de lecture (A' placé « en bas de la pente »,
B placé « sur l'horizontale », tremplin arrêté à C au lieu de C', axe des x
dit « gradué », axe « y » pris pour un repère global décoratif, P placé « sur »
la bande (π)) — **corrigées ci-dessous** ; l'entrée repart pour un tour de
vérification (README §3 : corriger et laisser en `transcrit (non vérifié)`).
**Troisième passe — re-lecture indépendante des figures par un tiers
(2026-08-06).** `element/68300` re-fetché et `course-422/upload-54757`
(7 pages) re-dérivé sans reprendre le travail du vérificateur précédent ;
p. 6 re-lue au zoom, élément par élément. **Les six corrections précédentes
sont confirmées fidèles** (A' = extrémité haute en haut à gauche ; B sur la
trajectoire en pointillés à l'aplomb de B', hors de l'horizontale ; tremplin
s'arrêtant à C' ; axes de $(C, \vec{i_1}, \vec{j_1})$ **non gradués** — aucune
graduation, seulement des pointes de flèche ; axe vertical fléché vers le haut
et noté « y », appartenant bien à ce repère ; P au niveau de l'axe horizontal
— même hauteur que C, mesuré au pixel — et **non** sur la bande (π), qui est
tracée en dessous). **Non promu à ce stade (nouveau tour)** (verdict de la
3ᵉ passe, levé par la 4ᵉ — voir ci-dessous) **:** deux écarts subsistaient et
ont été corrigés par ce tiers, dont la correction demande à son tour une
re-lecture — (i) la clause « il n'y a pas d'autre repère sur la figure » était
**fausse** et se contredisait avec la phrase décrivant l'axe $(A, \vec{i})$
deux paragraphes plus haut : la figure porte bien **deux** repères ; (ii) la
flèche « x » après B n'est **pas** tracée « le long de la trajectoire » — elle
prolonge **en ligne droite** la direction A'B' et s'écarte de la trajectoire,
qui s'incurve vers le haut au-dessus du tremplin. Ajouté par ailleurs, comme
précision de tracé vérifiée : l'axe horizontal est en trait plein jusqu'à sa
pointe de flèche puis **prolongé en pointillés**, et P est sur ce prolongement.
**Quatrième passe — re-lecture indépendante de la figure 1 par un quatrième
relecteur (2026-08-06).** `element/68300` re-fetché et `course-422/upload-54757`
(7 pages) re-dérivé sans reprendre le travail des relecteurs précédents ; p. 6
re-lue au zoom (×6 à ×11) et **mesurée au pixel**, affirmation par affirmation.
**Toutes les affirmations du bloc de description sont jugées fidèles** et
**aucune correction n'a été nécessaire à cette passe** ; les deux corrections de
la 3ᵉ passe sont confirmées — la flèche « x » après B est bien une **droite en
pointillés** de pente $\approx 10{,}5°$, soit la direction A'B' (mesurée à
$11{,}4°$ de A' $(201;713)$ à B' $(565;787)$), qui **diverge** de la
trajectoire, laquelle s'incurve vers le haut ; et la figure porte **exactement
deux** repères — un balayage de tout le cadre (lignes 540–880, colonnes
160–1185) ne fait apparaître aucun troisième axe, le quart supérieur gauche
(lignes 548–660, colonnes 175–700) étant entièrement vide. Autres mesures
confirmant le bloc : A' = extrémité **haute** du tracé épais, pointe à
$(201;713)$, contre B' à $(565;787)$ ; l'arc de β est centré sur B' (rayon
$\approx 206$ px, extrémités $(359;750)$ et $(359;787)$, soit bien 10°) ;
B $(565;760)$ à l'aplomb **exact** de B' et 27 px au-dessus de l'horizontale en
pointillés (ligne 787) ; tremplin épais s'arrêtant à C' $(\approx 718;758)$,
C $(714{,}5;737)$ à son aplomb ; axes de $(C,\vec{i_1},\vec{j_1})$ **sans aucune
graduation** (aucune encre hors-axe entre les colonnes 772 et 946 pour l'axe
horizontal, ni entre les lignes 576 et 687 pour l'axe vertical) ; axe vertical
fléché vers le haut (pointe lignes 563–573) et noté « y » (colonnes 726–731) ;
axe horizontal **plein** de C jusqu'à sa pointe de flèche (colonnes 940–958),
puis **prolongé en pointillés** (tirets à partir de la colonne 974), P étant un
point de ce prolongement à $(1036;738{,}5)$ contre C à $(714{,}5;737)$ — même
hauteur à $1{,}5$ px ; bande (π) **en dessous** de cet axe (lignes 765–769,
colonnes 976–1111), label « (π) » à sa droite (colonnes 1116–1129), P n'y
touchant pas ; légende « Figure 1 » (lignes 829–855). **Promu `vérifié`.**

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS28F · Barème de l'exercice IV : 5 points (Partie I — plan
  incliné / force motrice / 2ème loi, non transcrite ici, voir
  `lois-de-newton.md` : 3 points ; Partie II — saut/projectile, transcrite
  ici : 2 points)
- Images lues : `.../course-422/upload-54757/0005-big.jpg (cadrage), 0006-big.jpg, 0007-big.jpg`
- Pages du scan : 6–7 (sur 7) — cadrage de l'exercice en p. 5
- Mojibake : aucun

*Thème : mouvement plan dans le champ de pesanteur uniforme — projectile
après un tremplin (sans frottement).*

**Mouvement du centre d'inertie d'un système mécanique.**

*(Titre porté par la page de garde. En tête de l'exercice, p. 5, le sujet
écrit : « Etude du mouvement du centre d'inertie d'un système mécanique ».)*

**Cadrage (page 5, complété sur re-lecture) :**

*Le saut en longueur à moto est une épreuve sportive de performance où il y
a un véritable défi de sauter le plus loin à partir d'un espace défini.*

*Cet exercice se propose d'étudier le mouvement du centre d'inertie G d'un
système (S) formé d'un motard et d'une moto se déplaçant sur une piste de
compétition.*

**Contexte (page 6) :**

Cette piste est formée :
- d'une partie rectiligne A'B' inclinée d'un angle β par rapport à
  l'horizontale ;
- d'un tremplin B'C' circulaire ;
- d'une zone d'atterrissage (π) plane et horizontale. (figure 1).

Dans tout l'exercice, les frottements sont négligés et l'étude du mouvement
du centre d'inertie G est réalisée dans le référentiel terrestre considéré
comme galiléen.

**Données :**
- L'angle $\beta = 10°$ ;
- Intensité de la pesanteur : $g = 10\ \text{m.s}^{-2}$ ;
- Masse du système (S) : $m = 190\ \text{kg}$.

> **Figure 1 (description d'après le scan — corrigée sur re-lecture au
> zoom, puis re-corrigée sur re-lecture indépendante par un tiers)** :
> schéma de la piste complète, en trois éléments raccordés. Deux
> lignes distinctes courent d'un bout à l'autre du schéma : le **tracé épais
> de la piste**, qui porte les points « primés » A', B', C', et, juste
> au-dessus, la **trajectoire en pointillés du centre d'inertie G**, qui
> porte les points A, B, C.
>
> À gauche, le plan incliné rectiligne descend de **A' (extrémité haute,
> en haut à gauche du schéma)** vers **B' (bas de la pente)** ; l'angle β
> est marqué en bas de la pente, entre la piste et une droite horizontale
> en pointillés. Sur ce plan est dessinée une moto avec son pilote (le
> système (S)), le centre d'inertie G étant repéré au-dessus du véhicule.
> Le point **A**, sur la trajectoire en pointillés à l'aplomb de A', porte
> le vecteur $\vec{i}$ orienté le long du plan incliné dans le sens de la
> descente ; **B est un point de cette même trajectoire en pointillés, à
> l'aplomb de B'** — ce n'est pas un point de la droite horizontale.
> **Au-delà de B**, une courte flèche en pointillés notée « x » prolonge
> **en ligne droite la direction A'B'** et se termine par une pointe de
> flèche : c'est l'axe des x du repère $(A, \vec{i})$ utilisé en partie I.
> Elle **s'écarte donc de la trajectoire**, qui, elle, s'incurve vers le
> haut au-dessus du tremplin.
>
> Le tremplin circulaire relève ensuite la piste de **B' jusqu'à C'**
> (extrémité haute du tremplin, sur le tracé épais). **C**, à l'aplomb de
> C' sur la trajectoire, est l'origine du repère $(C, \vec{i_1},
> \vec{j_1})$ : $\vec{j_1}$ est porté par l'axe **vertical**, fléché vers
> le haut et **noté « y »** ; $\vec{i_1}$ est porté par l'axe
> **horizontal**, fléché vers la droite et **noté « x »**. Ces deux axes
> — **non gradués** — sont ceux dans lesquels sont exprimées $x_G(t)$ et
> $y_G(t)$. L'axe vertical « y » appartient bien au repère $(C,
> \vec{i_1}, \vec{j_1})$ : ce n'est pas un repère global décoratif. La
> figure ne porte que **deux** repères — celui-ci et l'axe $(A, \vec{i})$
> de la partie I décrit ci-dessus. Le vecteur
> $\vec{V_C}$ part de C en faisant l'angle α avec $\vec{i_1}$, tangent à la
> trajectoire.
>
> De C part un arc en pointillés (la trajectoire du saut) qui monte,
> culmine, puis redescend et **recoupe l'axe horizontal au point P** — P
> est donc à la **même hauteur que C** (c'est ce qui rend $y_G = 0$ en P).
> *Précision de tracé : l'axe horizontal est dessiné en trait plein de C
> jusqu'à sa pointe de flèche, puis **prolongé en pointillés** ; P se
> trouve sur ce prolongement en pointillés, au-delà de la pointe de
> flèche. Mesuré au pixel sur le scan : axe solide à la ligne 737, C à
> 736,5, prolongement en pointillés et point P à 738–739 — P et C sont
> donc à la même hauteur à 2–3 px près, soit la tolérance du tracé (la
> bande (π), elle, est 30 px plus bas, lignes 765–769). L'arc de la
> trajectoire se poursuit brièvement sous cette ligne après P.*
> La zone d'atterrissage (π) est figurée par une **bande horizontale
> épaisse tracée en dessous de cet axe**, à droite, avec le label « (π) »
> à sa droite ; P n'est pas dessiné sur cette bande. Légende :
> « Figure 1 ».

*(Partie I — « Étude du mouvement sur la partie A'B' » : plan incliné,
force motrice constante, deuxième loi de Newton — déjà transcrite sous
`lois-de-newton.md`, non reprise ici.)*

**II- Etude du mouvement de G lors de la phase du saut**

A un instant choisi comme nouvelle origine des dates (t = 0), le système (S)
quitte le tremplin lors du passage de G par le point C avec une vitesse
$\vec{V_C}$ formant un angle $\alpha = 18°$ avec l'horizontale. (S) retombe
en une position où le point G se confond avec le point P. On suppose que le
système n'est soumis qu'à son poids au cours de cette phase. L'étude du
mouvement est effectuée dans le repère orthonormé $(C, \vec{i_1},
\vec{j_1})$ indiqué sur la figure 1.

1. (0,5) En appliquant la deuxième loi de Newton, montrer que les équations
   différentielles vérifiées par les coordonnées $x_G(t)$ et $y_G(t)$ du
   centre d'inertie G dans le repère $(C, \vec{i_1}, \vec{j_1})$ s'écrivent
   ainsi : $\dfrac{dx_G}{dt} = V_C.\cos\alpha$ et $\dfrac{dy_G}{dt} =
   -g.t + V_C.\sin\alpha$
2. (0,5) Les expressions numériques des équations horaires $x_G(t)$ et
   $y_G(t)$ du mouvement de G s'écrivent ainsi : $x_G(t) = 19{,}02.t$ et
   $y_G(t) = -5.t^2 + 6{,}18.t$ ($x_G$ et $y_G$ exprimées en mètre et $t$
   en seconde). Vérifier que la vitesse de G au point C est :
   $V_C = 20\ \text{m.s}^{-1}$.
3. On considère qu'un saut est réussi si la condition $CP \geq 30\ \text{m}$
   est vérifiée.
   1. (0,5) Montrer que le saut effectué dans ce cas n'est pas réussi.
   2. (0,5) Déterminer la vitesse minimale $V_{min}$ avec laquelle doit
      passer G par le point C pour que le saut soit réussi.

---

## 2021 — session normale — Exercice V
Source: https://www.alloschool.com/element/127287
Statut: vérifié — 2026-08-06, vérification adverse indépendante par un second
agent puis **figures re-lues indépendamment (tiers) et jugées fidèles ;
énoncé/valeurs déjà diffé-conformes (passe précédente)** (README §3).
Vérification adverse indépendante (second agent) effectuée le 2026-08-06 :
`element/127287` re-fetché,
`course-422/upload-84195` (8 pages) re-dérivé et **conforme** ; en-tête du scan
**confirmé** (NS 28F, Sciences Physiques BIOF, 3 h, coef 7 ; page de garde :
« Exercice V (2,75 points) — Etude du mouvement d'un parachutiste ») ; diff
caractère par caractère des pp. 7–8 (valeurs, unités, indices/exposants, force
$\vec{F} = -\alpha.v^2.\vec{k}$ signe et chapeaux vectoriels compris, libellés,
numérotation 1.1/1.2/2.1→2.4/3, barème par question) — **aucun écart**, total
$0{,}5{+}0{,}5{+}0{,}5{+}0{,}25{+}0{,}25{+}0{,}25{+}0{,}5 = 2{,}75$ pts
**confirmé** ; physique re-dérivée et cohérente (phase 1 : pente de la fig. 2
$= 10$ m.s⁻² $= g$ ⇒ chute libre, et $v(\Delta t_1) = g\Delta t_1 = 40$ m.s⁻¹ ;
phase 2 : $V_\ell = \sqrt{mg/\alpha} = 5$ m.s⁻¹ ⇒ $\alpha = mg/V_\ell^2 = 40$ SI ;
question 3 : $d = h - \frac{1}{2}g\Delta t_1^2 - V_\ell(\Delta t - \Delta t_1
- 30) = 660 - 80 - 180 = 400$ m — les trois lectures graphiques se recoupent).
**(corrigé sur re-lecture : fig. 3 — la courbe part exactement de
$40$ m.s⁻¹, non de « ~44 » ; le palier vaut exactement $5$ m.s⁻¹, non
« 5–6 » ; la séparation des régimes est exactement à $t = 30$ s — les trois
drapeaux « lecture à confirmer » sont levés. Fig. 2 — droite confirmée par
$(1;10)$, $(2;20)$, $(3;30)$.)** **Non promu à ce stade** (verdict de la
2ᵉ passe, levé depuis par la 3ᵉ — voir ci-dessous) : la description de la
figure 1
affirmait un « hélicoptère en vol stationnaire d'où **un** personnage se laisse
tomber » alors que le cliché reproduit sur le sujet montre un **avion** (aile
horizontale, dérive arrière) sous lequel **trois** silhouettes sont en chute —
le texte de l'énoncé avait été importé dans la description de l'image.
**Corrigée ci-dessous** ; l'entrée était repartie pour un tour de vérification
(README §3 : corriger et laisser en `transcrit (non vérifié)`).
**Troisième passe — re-lecture indépendante des figures par un tiers
(2026-08-06), qui promeut l'entrée.** `element/127287` re-fetché et
`course-422/upload-84195` (8 pages) re-dérivé sans reprendre le travail du
vérificateur précédent ; les trois figures (toutes en p. 7) re-lues au zoom
et à la mesure de pixels, élément par élément — **toutes conformes**.
*Fig. 1* : axe vertical à gauche ; **O** en haut, marqué par un petit tiret
en travers de l'axe ; **$\vec{k}$ bien dessiné comme une courte flèche à
pointe pleine orientée vers le bas**, portée par l'axe juste sous O (le
symbole « k » avec son accent vectoriel est écrit à gauche) ; l'axe se
termine en bas par une pointe de flèche étiquetée « z » ⇒ orientation vers
le bas confirmée. Cliché du haut : **avion** — long fuselage/aile horizontal
avec une **grande dérive verticale en flèche à l'arrière** (à gauche de
l'image, l'appareil volant vers la droite) ; **ni mât, ni disque rotor, ni
poutre de queue** : ce n'est pas un hélicoptère, alors que l'énoncé écrit
bien « un hélicoptère en vol stationnaire » — la note honnête texte-vs-photo
est exacte et conservée. **Trois** silhouettes en chute sous l'appareil
(comptées au zoom sous contraste rehaussé : deux nettement humaines, membres
écartés, et une troisième plus lointaine). Vignette du bas : parachutiste
suspendu à son parachute ouvert. *Fig. 2* : droite passant par l'origine,
vérifiée au pixel en $(1;10)$, $(2;20)$, $(3;30)$ — pente $= 9{,}8$–$10$
m.s⁻² $= g$ ; ordonnées $10, 20, 30$, abscisses $1, 2, 3$ ; tracé prolongé
un peu au-delà de $t = 3$ s. *Fig. 3* : départ de la courbe **exactement sur
la graduation 40** (sommet du tracé mesuré à $39{,}8$ m.s⁻¹) ; palier mesuré
à $5{,}0$ m.s⁻¹ sur cinq colonnes ($t = 38$ à $54$ s), sur la sous-graduation
5 ; verticale en pointillés **exactement confondue avec la ligne $t = 30$ s**
(mesurée à $\pm 1$ px), « Régime initial » à gauche, « Régime permanent » à
droite ; ordonnées $10, 20, 30, 40$, abscisses $10, 20, 30, 40, 50$.

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS 28F · Barème de l'exercice : 2,75 points (exercice complet)
- Images lues : `.../course-422/upload-84195/0007-big.jpg, 0008-big.jpg`
- Pages du scan : 7–8 (sur 8)
- Mojibake : aucun

*Thème : chute verticale avec frottement fluide quadratique — mouvement
d'un parachutiste (chute libre puis régime avec frottement en $v^2$).*

**EXERCICE V (2,75 points) — Étude du mouvement d'un parachutiste.**

*Le parachute est un dispositif destiné, après son ouverture, à freiner le
mouvement d'un parachutiste en chute verticale dans l'air.*

Cet exercice se propose d'étudier un modèle simplifié du mouvement d'un
parachutiste. Ce dernier se laisse tomber sans vitesse initiale d'un
hélicoptère en vol stationnaire situé à une hauteur h au-dessus du sol. On
étudie le mouvement du centre d'inertie G du système (S), constitué d'un
parachutiste équipé de son parachute, dans le repère $(O, \vec{k})$ lié à
un référentiel terrestre considéré comme galiléen (figure 1). On considère
que la trajectoire de G est verticale et que l'accélération de la
pesanteur reste constante.

**Données :**
- La masse du système (S) : $m = 100\ \text{kg}$ ;
- Accélération de la pesanteur : $g = 10\ \text{m.s}^{-2}$ ;
- La hauteur h : $h = 660\ \text{m}$.

Le mouvement du système s'effectue en deux phases.

**1) Phase 1 : parachute fermé**

Le parachutiste se laisse tomber de l'hélicoptère sans vitesse initiale à
un instant choisi comme origine des dates $t = 0$. La chute se fait
durant cette phase avec le parachute fermé. On modélise l'évolution de la
vitesse du centre d'inertie G du système (S) durant cette phase par la
courbe de la figure 2.

1. (0,5) Quelle est la nature du mouvement de G ? justifier votre réponse.
2. (0,5) Peut-on considérer que le mouvement du parachutiste, durant cette
   phase, est une chute libre ? Justifier votre réponse.

**2) Phase 2 : parachute ouvert**

Le parachutiste ouvre son parachute après une durée $\Delta t_1 = 4\ \text{s}$
depuis le début de sa chute. On choisit l'instant d'ouverture du
parachute comme nouvelle origine des dates pour cette phase. Durant cette
phase, le système est soumis à son poids et aux frottements de l'air
modélisés par une force de contact $\vec{F} = -\alpha.v^2.\vec{k}$ avec $v$
la vitesse de G et $\alpha$ une constante positive. On modélise
l'évolution de la vitesse de G durant cette phase par la courbe de la
figure 3.

1. (0,5) Montrer que l'équation différentielle vérifiée par la vitesse $v$
   s'écrit : $\dfrac{dv}{dt} + \dfrac{\alpha}{m}.v^2 = g$.
2. (0,25) Trouver l'expression de la vitesse limite $V_\ell$ du mouvement
   en fonction de $m$, $g$ et $\alpha$.
3. (0,25) Déterminer graphiquement $V_\ell$.
4. (0,25) En déduire la valeur de $\alpha$.

3) (0,5) Sachant que la durée totale du mouvement de G depuis le début de
la chute jusqu'à l'arrivée au sol est $\Delta t = 70\ \text{s}$, trouver la
distance $d$ parcourue par G durant le régime initial de la phase 2.

> **Figure 1 (description d'après le scan — corrigée sur re-lecture au
> zoom)** : à gauche, une longue droite verticale porte, en haut,
> l'origine **O** (marquée par un petit tiret sur l'axe) puis, juste en
> dessous, le vecteur $\vec{k}$ dessiné comme une courte flèche **orientée
> vers le bas** ; la droite se termine en bas par une pointe de flèche
> accompagnée du label « z », confirmant que l'axe $(O, \vec{k})$ est
> orienté vers le bas. À droite de l'axe, deux illustrations superposées :
> en haut une **photographie en niveaux de gris d'un avion** en vol (aile
> horizontale, dérive verticale à l'arrière — ce n'est pas un hélicoptère,
> bien que l'énoncé parle d'un hélicoptère en vol stationnaire), sous
> lequel **trois petites silhouettes** sont en chute, venant de sauter
> (illustration de la phase 1) ; en dessous, un dessin d'un **parachutiste
> suspendu à son parachute ouvert** (illustration de la phase 2). Légende :
> « Figure 1 ».

> **Figure 2 (courbe, phase 1) (description d'après le scan — lecture
> confirmée sur re-lecture)** : $v\ (\text{m.s}^{-1})$ en fonction de
> $t\ (\text{s})$, sur papier quadrillé. Droite croissante passant par
> l'origine (mouvement rectiligne uniformément accéléré) ; ordonnées
> graduées $10,\ 20,\ 30$ ; abscisses graduées $1,\ 2,\ 3$. La droite passe
> par $(1\ \text{s};\ 10\ \text{m.s}^{-1})$, $(2\ \text{s};\
> 20\ \text{m.s}^{-1})$ et $(3\ \text{s};\ 30\ \text{m.s}^{-1})$ : son
> coefficient directeur vaut $10\ \text{m.s}^{-2}$, soit exactement $g$
> — c'est le fondement de la réponse attendue en 1.2. Le tracé se prolonge
> légèrement au-delà de $t = 3\ \text{s}$.

> **Figure 3 (courbe, phase 2) (description d'après le scan — lectures
> corrigées/confirmées sur re-lecture)** : $v\ (\text{m.s}^{-1})$ en
> fonction de $t\ (\text{s})$, sur papier quadrillé. Courbe décroissante
> partant de $v_0 = 40\ \text{m.s}^{-1}$ *(corrigé : la courbe démarre
> exactement sur la graduation 40, et non « ~44 » ; cohérent avec
> $g.\Delta t_1 = 10 \times 4 = 40\ \text{m.s}^{-1}$)*, décroissance rapide
> puis aplatissement sur un palier horizontal (vitesse limite) à
> $V_\ell = 5\ \text{m.s}^{-1}$ *(corrigé : le palier coïncide avec la
> sous-graduation 5, à mi-distance de 0 et 10 ; il donne
> $\alpha = mg/V_\ell^2 = 40$ SI en 2.4 et $d = 400\ \text{m}$ en 3)* ; une
> ligne verticale en pointillés placée **exactement à $t = 30\ \text{s}$**
> *(confirmé)* sépare la courbe en deux zones annotées « Régime initial »
> (à gauche) et « Régime permanent » (à droite) ; ordonnées graduées
> $10,\ 20,\ 30,\ 40$ ; abscisses graduées $10,\ 20,\ 30,\ 40,\ 50$.

---

## 2018 — session normale — Exercice IV (Partie I)
Source: https://www.alloschool.com/element/57726
Statut: vérifié — 2026-08-06, vérification adverse indépendante par un second
agent (README §3). `element/57726` re-fetché, `course-422/upload-45118`
(8 pages) re-dérivé et **conforme** à la citation. En-tête du scan **confirmé
sur l'image** (NS28F ; « شعبة العلوم التجريبية : مسلك العلوم الفيزيائية – خيار
فرنسية » = Sciences Physiques BIOF ; 3 h ; coef 7 ; Exercice IV = 5,5 points ;
barème en marge de la p. 7 : $1 + 0{,}5 + 1 + 1 = 3{,}5$ pts pour la Partie I,
donc 2 pts pour la Partie II) — *NB : le résumé HTML d'AlloSchool annonce
« Sciences Mathématiques B », contredit par le scan, qui fait foi (README §3).*
Diff caractère par caractère des pp. 6–7 : valeurs, unités, indices et
exposants ($m = 2.10^{-2}$ kg, $9{,}26$, $18{,}52$, $0{,}015/0{,}126$,
$0{,}020/6{,}28$, $0{,}025/0{,}192/5{,}70$), signes et chapeaux vectoriels
($\vec{f} = -k.\vec{v_G}$, $\vec{F_a}$, axe $\overrightarrow{Oy}$ vers le bas),
libellés, numérotation et barème par question — **aucun écart**. Figures 1 et 2
jugées au zoom sur le scan et **conformes**. Physique re-dérivée et
**auto-cohérente** : Euler donne $a_3 = 9{,}26 - 18{,}52 \times 0{,}126
= 6{,}93$ m.s⁻², puis $v_4 = 0{,}126 + 6{,}93 \times 0{,}005 = 0{,}161$ m.s⁻¹,
et la ligne suivante du tableau se reconstitue exactement ($v_5 = 0{,}161
+ 6{,}28 \times 0{,}005 = 0{,}192$ ; $a_5 = 9{,}26 - 18{,}52 \times 0{,}192
= 5{,}70$) ; $v_{Glim} = 9{,}26/18{,}52 = 0{,}500$ m.s⁻¹ et
$\tau = 1/18{,}52 = 0{,}054$ s, valeurs que la figure 2 restitue au pixel près.
Partition de périmètre **confirmée** : la Partie II p. 7 est bien
« Etude énergétique d'un oscillateur mécanique (solide-ressort) »
($K = 35$ N.m⁻¹, $x(t) = X_m\cos(2\pi t/T_0 + \varphi)$) ⇒ `systemes-oscillants.md`.
**(corrigé sur re-lecture : fig. 2 — le palier vaut exactement
$0{,}50\ \text{m.s}^{-1}$ et la tangente à l'origine coupe l'asymptote
exactement à $t = 54\ \text{ms} = \tau$, lisible car le quadrillage est
sous-gradué tous les 18 ms — le drapeau « lecture à confirmer » est levé ;
fig. 1 — le cercle en pointillés est **au niveau de** O, non « juste sous »
O, conformément à l'énoncé qui place G en O à $t = 0$.)** Écart non bloquant
relevé et laissé en l'état : le scan imprime « On remplie » et « camera »
(coquilles de l'original), normalisées en « On remplit » et « caméra » dans la
transcription ci-dessous.

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS28F · Barème de l'exercice IV : 5,5 points (Partie I —
  chute verticale, transcrite ici : 3,5 points ; Partie II — oscillateur
  solide-ressort, non transcrite ici, voir `systemes-oscillants.md` :
  2 points)
- Images lues : `.../course-422/upload-45118/0006-big.jpg, 0007-big.jpg`
- Pages du scan : 6–7 (sur 8)
- Mojibake : aucun

*Thème : chute verticale avec frottement fluide linéaire et poussée
d'Archimède non négligeable — bille dans un liquide visqueux (méthode
d'Euler).*

**EXERCICE IV (5,5 points) — Étude du mouvement de chute verticale d'une
bille dans un liquide visqueux.**

*Les parties I et II sont indépendantes.*

**Partie I- Étude du mouvement de chute verticale d'une bille dans un
liquide visqueux**

Afin de déterminer quelques caractéristiques du mouvement de chute d'une
bille dans un liquide visqueux, on réalise l'expérience suivante :

On remplit une éprouvette graduée par un liquide visqueux et transparent,
de masse volumique ρ, puis on libère, sans vitesse initiale dans ce
liquide, une bille de masse $m = 2.10^{-2}\ \text{kg}$, de volume $V$ et
de centre d'inertie G.

On étudie le mouvement du centre d'inertie G dans un repère $(O,
\vec{j})$ lié à un référentiel terrestre considéré comme galiléen. La
position instantanée du centre d'inertie G est repérée sur un axe
vertical $\overrightarrow{Oy}$ orienté vers le bas (figure 1). On
considère que la position de G à l'instant $t = 0$ est confondue avec
l'origine de l'axe $Oy$ et que la poussée d'Archimède $\vec{F_a}$ n'est
pas négligeable devant les autres forces.

La force de frottement fluide est modélisée par $\vec{f} = -k.\vec{v_G}$.
($\vec{v_G}$ étant le vecteur vitesse instantanée du centre d'inertie G et
$k$ une constante positive).

On rappelle que l'intensité de la poussée d'Archimède vaut le poids du
liquide déplacé : $F_a = \rho.V.g$, où $g$ est l'intensité de pesanteur.

Avec une caméra numérique et un logiciel adapté, on obtient, après
traitement des données expérimentales, la courbe des variations de la
vitesse instantanée du centre d'inertie de la bille en fonction du temps
(voir figure 2).

1. (1) En appliquant la deuxième loi de Newton, montrer que l'équation
   différentielle vérifiée par la vitesse s'écrit sous la forme :
   $\dfrac{dv_G}{dt} + \dfrac{1}{\tau}.v_G = A$, en précisant l'expression
   du temps caractéristique $\tau$ en fonction de $k$ et $m$ et
   l'expression de la constante $A$ en fonction de $g$, $m$, $\rho$ et
   $V$.
2. (0,5) Déterminer graphiquement la valeur de la vitesse limite
   $v_{Glim}$ et la valeur de $\tau$.
3. (1) Trouver la valeur de $k$ et celle de $A$.
4. (1) L'équation différentielle du mouvement de G s'écrit sous la forme
   numérique : $\dfrac{dv_G}{dt} = 9{,}26 - 18{,}52.v_G$.

   En utilisant la méthode d'Euler et les données du tableau suivant,
   calculer la valeur approchée de $a_3$ et celle de $v_4$.

   | $t\ (\text{s})$ | $v_G\ (\text{m.s}^{-1})$ | $a_G\ (\text{m.s}^{-2})$ |
   |:---:|:---:|:---:|
   | ⋮ | ⋮ | ⋮ |
   | 0,015 | 0,126 | $a_3$ |
   | 0,020 | $v_4$ | 6,28 |
   | 0,025 | 0,192 | 5,70 |

*(Partie II — « Étude énergétique d'un oscillateur mécanique
(solide-ressort) » : hors périmètre de ce slug, déjà transcrite sous
`systemes-oscillants.md`, non reprise ici.)*

> **Figure 1 (description d'après le scan — vérifiée au zoom)** : schéma
> d'une éprouvette graduée verticale, posée sur un pied, remplie presque
> jusqu'en haut d'un liquide visqueux et transparent (teinté en jaune sur
> le scan) ; la graduation est dessinée le long de la paroi. L'axe est
> tracé **à gauche de l'éprouvette** : c'est une droite verticale portant
> le point O (origine, marqué par un tiret) puis, juste en dessous, le
> vecteur $\vec{j}$ dessiné comme une courte flèche orientée **vers le
> bas** ; la droite se termine en bas par une pointe de flèche et le label
> « y », complétant le repère $(O, \vec{j})$. Dans l'éprouvette, un
> **cercle en pointillés est dessiné au niveau de O** (même hauteur que
> l'origine, en haut du liquide) : c'est la position initiale de la bille,
> à $t=0$, conformément à l'énoncé qui confond G avec l'origine de $Oy$ ;
> plus bas dans l'éprouvette, un disque noir plein représente la bille à un
> instant ultérieur de sa chute. Légende : « Figure 1 ».

> **Figure 2 (courbe) (description d'après le scan — lectures confirmées
> sur re-lecture)** : $v_G\ (\text{m.s}^{-1})$ en fonction de
> $t\ (\text{ms})$, sur quadrillage à double graduation. Axe des ordonnées
> gradué $0{,}1\ ;\ 0{,}2\ ;\ 0{,}3\ ;\ 0{,}4\ ;\ 0{,}5$ (sous-graduation
> tous les $0{,}05$) ; axe des abscisses gradué $36\ ;\ 72\ ;\ 108\ ;\ 144$
> (sous-graduation tous les $18\ \text{ms}$). Courbe croissante depuis
> l'origine, concave, tendant asymptotiquement vers un palier horizontal
> à $v_{Glim} = 0{,}50\ \text{m.s}^{-1}$ — le palier se confond avec la
> graduation $0{,}5$, et la valeur est corroborée par l'équation numérique
> de la question 4 ($9{,}26/18{,}52 = 0{,}500$). Une droite en pointillés,
> tangente à la courbe à l'origine, est tracée : elle **coupe l'asymptote
> horizontale $v_G = 0{,}5$ à $t = 54\ \text{ms}$** (soit trois
> sous-graduations, ou une division et demie), ce qui donne
> $\tau = 0{,}054\ \text{s}$ — également corroboré par
> $1/18{,}52 = 0{,}0540\ \text{s}$. La valeur $54$ n'est pas chiffrée sur
> le scan : elle se lit sur le quadrillage.

---

## 2025 — session normale — Exercice 4 (Partie 1)
Source: https://www.alloschool.com/element/145796
Statut: vérifié — **2ᵉ passe : re-lecture indépendante par un troisième agent**
(agent-vérificateur-tiers), 2026-08-06, diff OK. Les deux corrections de figure
de la 1ʳᵉ passe sont **confirmées au zoom** (relevés ci-dessous), aucune
divergence nouvelle. Historique : transcription → corrections de figure
(agent-vérificateur-adversarial) → **promotion (3ᵉ lecture)**.
**Élément re-dérivé (2ᵉ fois, indépendamment)** : `element/145796` →
`course-422/upload-87489`, **6 pages**
(`0007-big.jpg` = 404) ; couverture p.1 relue — **NS28F**, SPC/BIOF, 3 h, coef 7 ;
carte $7+2{,}5+5+5{,}5=\mathbf{20}$ ✓, dont « Exercice 4 : Mécanique
(**5,5 points**) ».
**Énoncé : conforme.** Diff caractère par caractère contre `0005-big.jpg`
(titre, « Les parties 1 et 2 sont indépendantes », « Partie1 : Mouvement d'un
satellite artificiel », chapeau complet, « (On note que dans la figure 1
l'échelle n'est pas respectée) ») et `0006-big.jpg` (Données + questions) :
$G=6{,}67\cdot10^{-11}\ \text{kg}^{-1}.\text{m}^3.\text{s}^{-2}$,
$R_T=6380\ \text{km}$, $T=1\text{h}\,52\text{min}$, $h=1336\ \text{km}$,
base de « **Freinet** » $(\vec{u};\vec{n})$ (orthographe du scan, conservée),
$\dfrac{T^2}{(R_T+h)^3}=k$ — aucune divergence de valeur, unité, indice ou
exposant. Barème marginal recompté
**$0{,}5+0{,}5+0{,}75+0{,}75+0{,}5=3{,}0$** pts ; avec la Partie 2
($2{,}5$) : $3{,}0+2{,}5=\mathbf{5{,}5}$ ✓.
**Figure 1 : deux divergences, corrigées.** (i) « deux cercles concentriques **en
pointillés** » — **seul le cercle extérieur** (orbite) est en pointillés ; le
cercle intérieur (Terre) est un trait **plein et épais** (la phrase se
contredisait elle-même). (ii) « $\vec{n}$, une flèche **pointillée** » — au zoom
maximal, $\vec{n}$ **et** $\vec{u}$ sont **deux flèches pleines** à pointe
noire partant de $G_S$ ; le **seul** élément en pointillés de la figure est la
double flèche verticale « $h$ ». Le reste est **conforme** : $O$ marqué d'un point
au centre, $G_S$ point noir sur l'orbite, $\vec{n}$ dirigée vers $O$, $\vec{u}$
tangente, encadrés « Le satellite (S) » et « La Terre » reliés par des flèches,
légende « Figure 1 ». Aucun drapeau « lecture à confirmer » dans cette partie
(schéma sans échelle — le sujet le dit lui-même).
**Physique re-dérivée (Kepler)** : $T=1\text{h}52\text{min}=6720\ \text{s}$,
$R_T+h=7{,}716\cdot10^{6}\ \text{m}$ ⇒
$m_T=\dfrac{4\pi^2(R_T+h)^3}{G\,T^2}=6{,}0\cdot10^{24}\ \text{kg}$ ✓ (masse de la
Terre) ; $v_S=\sqrt{\dfrac{Gm_T}{R_T+h}}=7{,}2\cdot10^{3}\ \text{m.s}^{-1}$ et
$2\pi(R_T+h)/v_S=6{,}7\cdot10^{3}\ \text{s}=T$ ✓ — les quatre données du sujet
sont mutuellement cohérentes.

**Relevés indépendants de la 2ᵉ passe (`0006-big.jpg`, zooms ×4 et ×9) :**
- **Cercle extérieur (orbite) : en gros pointillés** (série de carrés noirs
  séparés) sur tout son pourtour ; **cercle intérieur (Terre) : trait plein et
  épais continu** — les deux tracés sont sans ambiguïté de nature différente ✓.
- **$\vec{n}$ et $\vec{u}$ : deux flèches PLEINES** à pointe noire triangulaire,
  partant du point noir $G_S$ ; $\vec{n}$ vers l'intérieur (vers $O$), $\vec{u}$
  tangente orientée vers le bas-gauche. Aucun pointillé sur ces deux vecteurs ✓.
- **Seul élément pointillé hors orbite** : la **double flèche verticale « $h$ »**
  (pointe en haut sur l'orbite, pointe en bas sur la surface de la Terre) ✓.
  Les flèches de rappel des encadrés « Le satellite (S) » et « La Terre » sont,
  elles, **pleines** — vérifié au zoom.
- $O$ marqué d'un point au centre du cercle intérieur ✓ ; légende « Figure 1 » ✓ ;
  barème marginal recompté sur le scan : $0{,}5+0{,}5+0{,}75+0{,}75+0{,}5=3{,}0$ ✓.

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS28F · Barème de l'exercice complet : 5,5 points ; **Partie 1**
  = 3,0 points ($0{,}5+0{,}5+0{,}75+0{,}75+0{,}5$)
- Images lues (reproductibilité) : `.../course-422/upload-87489/0005-big.jpg`
  (intro), `.../0006-big.jpg` (données, questions, figure 1)
- Pages du scan : 5 (fin) et 6 (sur 6)
- Portée : **Partie 1 — Mouvement d'un satellite artificiel**. Voir la « Note
  de routage » en tête de ce fichier : classée ici plutôt que sous
  `atome-mecanique-newton.md`. La **Partie 2 (mouvement d'un oscillateur
  solide-ressort)** du même exercice est transcrite sous
  `systemes-oscillants.md` (cross `aspects-energetiques.md`). Mention en
  tête de l'exercice : « Les parties 1 et 2 sont indépendantes ».

**EXERCICE 4 : Mécanique (5,5 points) — Partie 1 : Mouvement d'un satellite
artificiel.**

On se propose d'étudier dans cette partie le mouvement d'un satellite
artificiel autour de la Terre. Un satellite $(S)$ de centre d'inertie $G_S$
et de masse $m_S$ est destiné à l'observation des océans.

Dans le référentiel géocentrique considéré galiléen, $(S)$ décrit une orbite
circulaire autour de la Terre avec une période de révolution $T$. $(S)$ se
trouve à une altitude $h$ de la surface de la Terre (figure 1). (On note que
dans la figure 1 l'échelle n'est pas respectée).

On considère que la Terre est sphérique, de centre $O$, de rayon $R_T$, de
masse $m_T$ et ayant une symétrie sphérique de répartition de masse et que
$(S)$ n'est soumis qu'à la force gravitationnelle exercée par la Terre.

**Données :**
- Constante de gravitation universelle : $G = 6{,}67 \cdot 10^{-11}\
  \text{kg}^{-1}.\text{m}^3.\text{s}^{-2}$ ;
- Rayon de la Terre : $R_T = 6380\ \text{km}$ ;
- Période de révolution : $T = 1\text{h}\,52\text{min}$ ;
- L'altitude : $h = 1336\ \text{km}$.

1. (0,5) Ecrire l'expression vectorielle de la force d'attraction
   gravitationnelle $\vec{F}$ exercée par la Terre sur $(S)$ dans la base de
   Freinet $(\vec{u}\,;\,\vec{n})$ (figure 1).
2. En appliquant la deuxième loi de Newton :
   1. **2-1.** (0,5) Montrer que le mouvement circulaire du centre d'inertie
      $G_S$ autour de la Terre est uniforme.
   2. **2-2.** (0,75) Déterminer $v_S$ la norme de la vitesse de $G_S$ en
      fonction de $G$, $m_T$, $R_T$ et $h$.
   3. **2-3.** (0,75) Déduire la relation :
      $\dfrac{T^2}{(R_T + h)^3} = k$ ($k$ étant une constante), traduisant la
      troisième loi de Kepler relative au mouvement du centre d'inertie
      $G_S$ autour de la Terre.
3. (0,5) Calculer alors la valeur de la masse $m_T$.

*Figure 1 (schéma) :* deux cercles concentriques centrés sur le point « $O$ »
(marqué par un point au centre) — le cercle **intérieur**, en **trait plein et
épais**, représente la Terre (étiquetée « La Terre » dans un encadré relié par une
flèche) ; le cercle **extérieur**, **en pointillés**, représente la trajectoire du
satellite. Sur ce cercle extérieur, un point noir étiqueté « $G_S$ » (relié
par une flèche à un encadré « Le satellite $(S)$ ») porte deux vecteurs, tous
deux tracés en **flèches pleines à pointe noire** :
$\vec{n}$, dirigée vers le centre $O$ (vers l'intérieur), et $\vec{u}$,
tangente au cercle, orientée vers le bas à gauche du schéma (sens du
mouvement). Le **seul élément en pointillés** hors du cercle-orbite est une
**double flèche verticale, étiquetée « $h$ »**, qui relie le cercle intérieur
(Terre) au cercle extérieur (orbite) et matérialise l'altitude. Légende :
« Figure 1 ».

---

## 2024 — session normale — Exercice 5 (Partie 1)
Source: https://www.alloschool.com/element/145763
Statut: vérifié — **2ᵉ passe, vérificateur indépendant
(agent-vérificateur-indépendant, 2026-08-07), diff OK.**
**Élément re-dérivé** : `element/145763` → `course-422/upload-87465`, **6 pages**
(`0007-big.jpg` = 404), URLs d'images ré-extraites du HTML de la page `element/` ;
couverture p.1 relue — **NS 28F**, SPC/BIOF, 3 h, coef 7 ; carte du sujet
$7+2{,}5+2+3{,}5+5=\mathbf{20}$ ✓.
**Portée du diff** : `0005-big.jpg` (« Les parties 1 et 2 sont indépendantes »,
repère $(O,\vec{k})$ dirigé vers le bas, $(t_0=0)$, $z=0$,
$\vec{f}=-\mu.\vec{v}$ avec $\vec{v}=v_z.\vec{k}$,
$\vec{F}=-\rho_L.V_B.\vec{g}$, données $g=10\ \text{m.s}^{-2}$,
$m_B=5{,}0\ \text{g}$, $\rho_B=5{,}526\cdot10^{3}\ \text{kg.m}^{-3}$, figure 1)
et `0006-big.jpg` (équation différentielle
$\frac{dv_z}{dt}+\frac{1}{\tau}v_z=g(1-\frac{\rho_L}{\rho_B})$, Q2-1 à Q3,
figure 2) — **aucune divergence de valeur, unité, indice ou exposant**. Barème
marginal recompté au scan : $0{,}75+0{,}25+0{,}25+0{,}5+1=\mathbf{2{,}75}$ ✓, et
$2{,}75+2{,}25=\mathbf{5}$ ✓.
**Figure 1 — revue au zoom ×2,6, correction de 1ʳᵉ passe confirmée** : colonne
grisée (parois noires, fond fermé) **à gauche**, disque noir plein = la bille,
étiquette « (S) » **à droite de la colonne** à la hauteur de la bille ; **l'axe
vertical est bien à DROITE de la colonne**, avec « O » en haut, la courte flèche
pleine $\vec{k}$ **vers le bas** juste en dessous, et la pointe de flèche
étiquetée « z » en bas ; **ligne horizontale en pointillés** reliant $O$ au
sommet de la colonne ; légende « Figure 1 » ✓.
**Figure 2 — re-mesurée intégralement, correction de 1ʳᵉ passe confirmée.**
Étalonnage refait : traits principaux **noirs** en abscisse
$x=720{,}5/780/839/898{,}5/957/1017/1076/1135{,}5$ px (pas $59{,}3$) ⇒
**7 divisions**, étiquettes **0,1** et **0,2** ⇒ $1$ division $=0{,}1$ s, cadre
$=0{,}7$ s ✓ ; en ordonnée $y=371/429{,}5/489{,}5/548/607{,}5$ (axe), étiquettes
**0,4** et **0,2** ⇒ $1$ division $=0{,}2\ \text{m.s}^{-1}$, cadre
$=0{,}8\ \text{m.s}^{-1}$ ✓ ; **traits bleus à chaque demi-division** relevés à
$y=400{,}5\,/\,459\,/\,519\,/\,577{,}5$ px, soit $0{,}7$, $0{,}5$, $0{,}3$ et
$0{,}1\ \text{m.s}^{-1}$ ✓. Le palier de la courbe est mesuré à $y=400$–$401$ px
$\Rightarrow v_\ell=\mathbf{0{,}7005\ \text{m.s}^{-1}}$ : il se couche
**exactement sur le trait bleu de $0{,}70$** (lecture au trait, pas une
estimation).
**Contrôle exponentiel refait sur toute la trace** : $v(0{,}050)=0{,}271$,
$v(0{,}097)=0{,}433$, $v(0{,}212)=0{,}616$, $v(0{,}306)=0{,}670$,
$v(0{,}414)=0{,}690$ — le modèle $v_\ell(1-e^{-t/\tau})$ avec
$v_\ell=0{,}70$ et $\tau=0{,}1$ s prédit $0{,}275$, $0{,}442$, $0{,}605$,
$0{,}665$, $0{,}687$ : accord à $\pm0{,}011$ sur toute la plage ✓.
**Tangente $(T)$ (pointillés) re-suivie point par point** : elle part de
$(0\,;\,0)$ et **coupe l'asymptote $v_\ell=0{,}70$ à $t=0{,}1000$ s** (mesuré par
interpolation entre $x=778$ et $x=782$ px), c'est-à-dire exactement sur le trait
principal $0{,}1$ s ⇒ $\tau=\mathbf{0{,}1\ \text{s}}$, lecture au trait — c'est
la construction attendue en Q2-2 ✓.
**Physique re-dérivée par le vérificateur** :
$a_0=v_\ell/\tau=\mathbf{7\ \text{m.s}^{-2}}$ (Q2-3, cohérent avec la pente
mesurée de $(T)$) ; $\tau=m_B/\mu$ ⇒
$\mu=m_B/\tau=5{,}0\cdot10^{-3}/0{,}1=\mathbf{5\cdot10^{-2}\ \text{kg.s}^{-1}}$ ;
$a_0=g\!\left(1-\rho_L/\rho_B\right)$ ⇒ $\rho_L=0{,}3\,\rho_B
=\mathbf{1{,}66\cdot10^{3}\ \text{kg.m}^{-3}}$ (Q3) — les trois réponses sortent
de **lectures au trait**, ce qui valide l'étalonnage par une voie indépendante.

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7 (NB :
  le résumé HTML d'AlloSchool pour `element/145763` annonce à tort « 2ème BAC
  Sciences Mathématiques B » ; l'en-tête du scan, lu directement, confirme
  sans ambiguïté SPC/BIOF — README §3, l'image fait foi)
- Code sujet : NS 28F · Barème de l'exercice complet : 5 points ; **Partie 1**
  = 2,75 points ($0{,}75+0{,}25+0{,}25+0{,}5+1$, barème en marge)
- Images lues (reproductibilité) : `.../course-422/upload-87465/0005-big.jpg`
  (chapeau, données, figure 1), `.../0006-big.jpg` (questions, figure 2)
- Pages du scan : 5 et 6 (sur 6)
- Portée : **Partie 1 — Chute verticale d'une bille dans un liquide** (avec
  frottement fluide linéaire ET poussée d'Archimède non négligeable). La
  **Partie 2 (mouvement d'un système mécanique : plan incliné + poulie)** du
  même exercice est sous `rotation-axe-fixe.md`. Mention en tête de
  l'exercice : « Les parties 1 et 2 sont indépendantes ».

**EXERCICE 5 (5 points) : Mécanique.**

*Les parties 1 et 2 sont indépendantes.*

**Partie 1 : Chute verticale d'une bille dans un liquide.**

On étudie le mouvement, dans un liquide $(L)$, d'une bille $(S)$ de centre
d'inertie $G$, homogène, de masse $m_B$, de volume $V_B$ et de masse
volumique $\rho_B$.

On étudie le mouvement de $G$ dans un repère $(O,\vec{k})$ lié à un
référentiel terrestre supposé galiléen. On repère la position de $G$ à
chaque instant $t$ par la cote $z$ sur l'axe vertical $(O,\vec{k})$ dirigé
vers le bas.

À l'instant de date $t_0$, prise comme origine des dates ($t_0=0$), on lâche
la bille dans le liquide $(L)$ sans vitesse initiale d'une position où la
cote de $G$ est nulle ($z=0$) (figure 1).

Au cours de la chute dans le liquide, la bille $(S)$ est soumise, en plus de
son poids, à :
- la force de frottement fluide : $\vec{f} = -\mu.\vec{v}$ où
  $\vec{v} = v_z.\vec{k}$ et $\mu$ le coefficient de frottement fluide ;
- la poussée d'Archimède : $\vec{F} = -\rho_L.V_B.\vec{g}$ où $g$ est
  l'intensité de la pesanteur et $\rho_L$ la masse volumique du liquide $(L)$.

**Données :** Intensité de la pesanteur : $g = 10\ \text{m.s}^{-2}$ ;
$m_B = 5{,}0\ \text{g}$ ; $\rho_B = 5{,}526 \cdot 10^{3}\ \text{kg.m}^{-3}$.

1. (0,75) En appliquant la deuxième loi de Newton, montrer que la vitesse
   $v_z(t)$ de $G$ obéit à l'équation différentielle :
   $\dfrac{dv_z}{dt} + \dfrac{1}{\tau}v_z = g\left(1-\dfrac{\rho_L}{\rho_B}\right)$
   avec $\tau$ le temps caractéristique du mouvement de $(S)$.
2. L'exploitation d'un enregistrement vidéo du mouvement de $G$ à l'aide
   d'un logiciel adéquat, a permis d'obtenir la courbe de la figure 2
   représentant l'évolution temporelle de la vitesse $v_z(t)$ de $G$. Dans
   la figure 2, $(T)$ représente la tangente à la courbe au point
   d'abscisse $t_0 = 0$.

   Par exploitation de la courbe de la figure 2, déterminer la valeur de :
   1. **2-1.** (0,25) la vitesse limite $v_\ell$ du mouvement de $G$.
   2. **2-2.** (0,25) $\tau$ le temps caractéristique du mouvement de $G$.
   3. **2-3.** (0,5) l'accélération $a_0$ du mouvement de $G$ à l'instant
      $t_0 = 0$.
3. (1) Déduire la valeur de $\mu$ et celle de $\rho_L$.

*Figure 1 (schéma) :* le schéma occupe la marge droite de la page. **À gauche du
schéma**, une colonne verticale grisée (parois en traits noirs, fond fermé par un
trait horizontal) figure le liquide $(L)$ ; un **disque noir plein** y représente
la bille, étiquetée « **(S)** » — l'étiquette est posée à droite de la colonne,
à la hauteur de la bille. **À droite de la colonne**, un axe vertical orienté
vers le bas porte, en haut, l'origine **$O$** puis le vecteur $\vec{k}$ (courte
flèche pleine orientée vers le bas) juste en dessous ; l'axe se termine en bas
par une pointe de flèche étiquetée « **z** ». Une **ligne horizontale en
pointillés** relie $O$ (sur l'axe) au haut de la colonne de liquide, marquant le
niveau où $z = 0$ (position initiale de $G$). Légende : « Figure 1 ».

*Figure 2 (courbe) :* $v_z\ (\text{m.s}^{-1})$ en fonction de $t\ (\text{s})$.
Axe des ordonnées : traits principaux **noirs** chiffrés $0{,}2$ et $0{,}4$,
origine $0$ — **1 division principale $= 0{,}2\ \text{m.s}^{-1}$**, avec un
**trait bleu à chaque demi-division ($0{,}1$)** ; le cadre compte 4 divisions,
soit $0{,}8\ \text{m.s}^{-1}$ de haut. Axe des abscisses : traits principaux
chiffrés $0{,}1$ et $0{,}2$, origine $0$ — **1 division $= 0{,}1\ \text{s}$**,
même sous-quadrillage bleu à la demi-division ; le cadre compte 7 divisions, soit
$0{,}7\ \text{s}$ de large.

Courbe croissante et concave partant de l'origine $(0\,;\,0)$, tendant
asymptotiquement vers un **palier horizontal (vitesse limite) qui vient se
coucher exactement sur le trait bleu de $v_\ell = 0{,}70\ \text{m.s}^{-1}$**
(3,5 divisions au-dessus de l'axe) et le suit jusqu'au bord droit ; le palier est
pratiquement atteint dès $t \simeq 0{,}4\ \text{s}$. La droite $(T)$, tracée
**en pointillés** et étiquetée « (T) » à sa gauche, est tangente à la courbe à
l'origine : elle part de $(0\,;\,0)$ et **coupe l'asymptote au repère
$t = 0{,}1\ \text{s}$** — d'où $\tau = 0{,}1\ \text{s}$ et
$a_0 = v_\ell/\tau = 7\ \text{m.s}^{-2}$ (lectures au trait, non estimées).
Légende : « Figure 2 ».

---

## 2023 — session normale — Exercice 4 (Partie I)
Source: https://www.alloschool.com/element/142476
Statut: vérifié — 1ʳᵉ passe de vérification adversariale indépendante
(agent-vérificateur-adversarial, 2026-08-07) : re-fetch AlloSchool
indépendant, diff caractère par caractère de l'énoncé, recompte du barème et
relevé au pixel de la figure 1 — **aucune divergence**.

**Portée du diff (2026-08-07).** Source re-dérivée de zéro :
`element/142476` → `assets/documents/course-422/upload-85304`, **6 pages**
(URLs ré-extraites du HTML de la page `element/`, aucune reprise des
« Images lues »). Couverture p.1 relue : **NS 28F**, session **normale
2023**, 3 h, coef 7, SPC/BIOF ; carte $7+2{,}5+5+5{,}5=\mathbf{20}$ ✓, et
l'Exercice 4 y est annoncé « **5,5 points** » avec ses deux volets (chute
d'une balle / balançoire).
- **Valeurs, unités, indices, exposants — tous confirmés sur l'image** :
  $V_0 = 12\ \text{m.s}^{-1}$, $m = 80\ \text{g}$, $g = 10\ \text{m.s}^{-2}$,
  repère $(O\,;\,\vec{k})$, $\vec{f} = -\lambda\vec{v}$ avec
  $\vec{v} = v_z\vec{k}$ et $\lambda = 0{,}12$ **S.I.**, équation
  $\frac{dv_z}{dt} + \frac{1}{\tau}v_z + g = 0$, $a_{i-1} = 5\ \text{m.s}^{-2}$,
  $\Delta t = 66\ \text{ms}$, « valeur algébrique $v_{OZ}$ », « nouvelle
  origine des dates $t_0 = 0$ », « On néglige la poussée d'Archimède devant
  ces deux forces ».
- **Barème marginal recompté au scan** :
  $0{,}75+0{,}5+0{,}5+0{,}5+0{,}25+0{,}75 = \mathbf{3{,}25}$ ✓ ; et
  **Partie I + Partie II $= 3{,}25 + 2{,}25 = \mathbf{5{,}50}$** = Exercice 4 ✓.
- **Figure 1 relue élément par élément (relevé pixel sur `0005-big.jpg`)** :
  axe $Z$ vertical, flèche pleine vers le **haut**, étiquette « Z » ; ligne
  horizontale **en pointillés noirs** traversant l'axe en haut ; disque noir
  plein **sur l'axe**, juste sous cette ligne, étiqueté « (S) » à droite ;
  flèche pleine vers le **haut** étiquetée $\vec{V_0}$ sous (S) ; flèche
  pleine vers le **haut** étiquetée $\vec{k}$ juste au-dessus de O ; point
  « O » à droite de l'axe ; **double flèche verticale** (pointes aux **deux**
  extrémités) étiquetée « h », à gauche de l'axe, reliant le niveau de O à la
  ligne pointillée ; ligne horizontale **en pointillés bleus** partant de O
  vers la gauche ; l'axe se poursuit en trait plein sous O. **La description
  transcrite correspond point par point** — et le seul « double » de cette
  figure est bien une cote de longueur, pas une flèche d'étalonnage de temps.
- **Physique re-dérivée (cohérence interne)** : $v_z(t) = -10t+12$,
  $z(t) = -5t^2+12t$ ⇒ $h = V_0^2/2g = \mathbf{7{,}2\ \text{m}}$ et
  $v_{OZ} = -12\ \text{m.s}^{-1}$ ; $\tau = m/\lambda = 0{,}080/0{,}12 =
  0{,}667\ \text{s}$ ⇒ $|v_\ell| = g\tau \simeq \mathbf{6{,}7\ \text{m.s}^{-1}}$ ;
  Euler : $a_{i-1} = -g - v_{i-1}/\tau = 5$ ⇒ $v_{i-1} = -10\ \text{m.s}^{-1}$,
  d'où $v_z(t_i) = -10 + 5\times0{,}066 = \mathbf{-9{,}67\ \text{m.s}^{-1}}$.
  Les données du sujet referment bien les questions.

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
  (en-tête du scan confirmé directement sur l'image : « شعبة العلوم
  التجريبية مسلك العلوم الفيزيائية (خيار فرنسية) » = Sciences Physiques,
  BIOF, option française — le résumé HTML d'AlloSchool pour `element/142476`
  annonce à tort « Sciences Mathématiques B », README §3, l'image fait foi)
- Code sujet : NS 28F · Barème de l'exercice complet : 5,5 points ; **Partie
  I** = 3,25 points ($0{,}75+0{,}5+0{,}5+0{,}5+0{,}25+0{,}75$, barème en
  marge)
- Images lues (reproductibilité) : `.../course-422/upload-85304/0005-big.jpg`
  (chapeau, données, figure 1, question 1), `.../0006-big.jpg` (questions
  2-1 à 2-3)
- Pages du scan : 5 et 6 (sur 6)
- Portée : **Partie I — Étude de la chute d'une balle** (chute libre puis
  chute avec frottement fluide linéaire, méthode d'Euler). La **Partie II
  (mouvement d'une balançoire, pendule pesant)** du même exercice est sous
  `systemes-oscillants.md`. Mention en tête de l'exercice : « Les deux
  parties sont indépendantes. »

**EXERCICE 4 (5,5 points).**

*Les deux parties sont indépendantes.*

**Partie I : Étude de la chute d'une balle**

Dans le champ de pesanteur, on lance verticalement vers le haut à l'instant
$t = 0$, à partir d'un point $O$, une balle $(S)$ de masse $m$ et de centre
d'inertie $G$, avec une vitesse initiale de valeur $V_0 = 12\ \text{m.s}^{-1}$
(figure 1).

On étudie le mouvement du centre d'inertie $G$ de la balle dans un repère
$(O\,;\,\vec{k})$ lié à un référentiel terrestre supposé galiléen en deux
phases :
- mouvement de chute libre de la balle dans la première phase.
- mouvement de chute de la balle avec frottement dans la deuxième phase.

**Données :**
- La masse : $m = 80\ \text{g}$ ;
- L'intensité de la pesanteur : $g = 10\ \text{m.s}^{-2}$.

**1- Mouvement de la balle en chute libre**

Pendant son mouvement le centre d'inertie $G$ de la balle est considéré en
chute libre.

1. **1-1.** (0,75) En appliquant la deuxième loi de Newton, déterminer les
   équations horaires numériques donnant la vitesse $v_z(t)$ et la position
   $z(t)$ du centre d'inertie $G$ de la balle.
2. **1-2.** En utilisant les équations $v_z(t)$ et $z(t)$ déterminer :
   1. **1-2-1.** (0,5) la hauteur maximale $h$ atteinte par $G$.
   2. **1-2-2.** (0,5) la valeur algébrique $v_{OZ}$ de la vitesse de $G$
      lors de son passage vers le bas par le point $O$.

**2- Mouvement de chute de la balle avec frottement**

À partir de l'instant du passage du centre d'inertie $G$ par le point $O$
vers le bas, qu'on prend comme nouvelle origine des dates $t_0 = 0$, la
balle est soumise, en plus de son poids $\vec{P}$, à une force de
frottement fluide modélisée par $\vec{f} = -\lambda\vec{v}$ avec
$\vec{v} = v_z\vec{k}$ et $\lambda = 0{,}12$ S.I. (On néglige la poussée
d'Archimède devant ces deux forces).

1. **2-1.** (0,5) Montrer que l'équation différentielle vérifiée par la
   vitesse $v_z$ du centre d'inertie $G$ de la balle s'écrit :
   $\dfrac{dv_z}{dt} + \dfrac{1}{\tau}v_z + g = 0$ avec $\tau$ le temps
   caractéristique du mouvement.
2. **2-2.** (0,25) Déduire la norme de la vitesse limite du mouvement du
   centre d'inertie $G$ de la balle.
3. **2-3.** (0,75) Déterminer, en utilisant la méthode d'Euler, la valeur
   algébrique $v_z(t_i)$ de la vitesse à l'instant $t_i$ sachant que
   l'accélération du mouvement à l'instant $t_{i-1}$ est
   $a_{i-1} = 5\ \text{m.s}^{-2}$ et on prend le pas de calcul
   $\Delta t = 66\ \text{ms}$.

*Figure 1 (schéma) :* axe vertical $Z$ (flèche pleine orientée vers le
haut, étiquetée « Z » en haut). Une ligne horizontale en pointillés
traverse l'axe, plus haut sur la figure ; un disque noir plein étiqueté
« (S) » (la balle) est placé juste en dessous de cette ligne pointillée,
sur l'axe. Une double flèche verticale, étiquetée « h », relie le niveau de
l'origine $O$ à cette ligne pointillée (matérialisant la hauteur maximale).
En dessous de (S), une courte flèche pleine orientée vers le haut,
étiquetée « $\vec{V_0}$ » (vecteur vitesse initiale). Plus bas, au niveau
de l'origine, une courte flèche pleine orientée vers le haut étiquetée
« $\vec{k}$ », avec le point « O » juste à droite ; une ligne horizontale
en pointillés (bleue) part de O vers la gauche. L'axe $Z$ se poursuit en
trait plein en dessous de O jusqu'au bas de la figure. Légende :
« Figure 1 ».

---

## 2022 — session normale — Exercice 4 (Partie 1)
Source: https://www.alloschool.com/element/136621
Statut: transcrit (non vérifié) — **corrigé le 2026-08-07 par la passe de
vérification adversariale indépendante ; laissé non vérifié, la correction
appelle une re-lecture de contrôle** (README §3).
**Élément re-dérivé** : `element/136621` → `course-422/upload-84516`, **8 pages**
(re-extrait du HTML de `element/` ; résumé HTML toujours faux sur la filière).
**Couverture p.1 relue** : NS 28F, 3 h, coef 7, SPC/BIOF ; carte
$7+3{,}5+4{,}5+5=\mathbf{20}$ ✓.
**Barème marginal recompté au pixel (p.7 + p.8)** : $0{,}5+0{,}75+0{,}5+0{,}25$
(p.7) $+\ 0{,}75$ (Q4, en tête de p.8) $=\mathbf{2{,}75}$ ✓ (la ligne 3,
en-tête, ne porte aucune annotation) ; $2{,}75+2{,}25=\mathbf{5}$ = total de
l'Exercice 4 ✓.
**Diff du texte** : Données $m = 10\ \text{g}$,
$\rho_a = 7{,}8\ \text{g.cm}^{-3}$, $g = 10\ \text{m.s}^{-2}$ (relues au
zoom ×3), l'expression $F_a = \rho_r.V.g$, le modèle
$\vec{F} = -k.\vec{v}$ et l'équation
$\frac{dv}{dt}+\frac{1}{\tau}v = g\left(1-\frac{\rho_r}{\rho_a}\right)$ —
**aucune divergence de valeur, unité, indice ou exposant**.
**Figure 2 — mesurée au pixel.** Étalonnage relevé sur les traits imprimés :
**traits majeurs tous les 0,1 s et tous les 0,2 m.s⁻¹**, quadrillage fin de
0,02 s × 0,04 m.s⁻¹ ; le cadre s'étend jusqu'à **$t = 1{,}0\ \text{s}$** et
**$v = 1{,}0\ \text{m.s}^{-1}$**, alors que le chiffrage s'arrête à 0,3 s et
0,8 m.s⁻¹ — **les traits majeurs de 0,4 s à 1,0 s ne sont pas chiffrés**.
**Adjudication des deux « lecture à confirmer » — LEVÉES :**
- *Palier* : $v$ mesurée constante à **0,875–0,885** de $t = 0{,}5\ \text{s}$
  jusqu'au bord du cadre ⇒ $V_\ell = \mathbf{0{,}88\ \text{m.s}^{-1}}$,
  c'est-à-dire **deux traits fins au-dessus du repère 0,8** — sensiblement
  au-dessus de 0,8, et non « proche de 0,8 ».
- *Frontière zone1/zone2* : **divergence trouvée et corrigée**. Le trait
  vertical en pointillés qui sépare les deux zones est en colonne **609,5** ;
  l'axe des ordonnées est en 322 et le pas majeur vaut 57,2 px ⇒
  $t = (609{,}5-322)/57{,}2 \times 0{,}1 = \mathbf{0{,}50\ \text{s}}$, soit
  exactement le 5ᵉ trait majeur après 0,1/0,2/0,3. La transcription annonçait
  « $t \approx 0{,}2\ \text{s}$ » — erreur d'un facteur 2,5, conséquence directe
  du chiffrage qui s'arrête à 0,3. La valeur 0,5 s est confirmée par la physique
  ($5\tau = 0{,}5\ \text{s}$ : le régime transitoire y est éteint).
- *Tangente $(T)$* : ajustement de Hough sur les droites issues de l'origine ⇒
  pente $\mathbf{8{,}8\ \text{m.s}^{-2}}$, qui atteint $V_\ell = 0{,}88$ à
  $t = \mathbf{0{,}100\ \text{s}} = \tau$ (repère chiffré « 0,1 »).
**Figure 1 — deux imprécisions corrigées** : l'éprouvette **ne porte aucune
graduation** (la transcription disait « éprouvette graduée ») ; et le petit
cercle $G$ est dessiné **nettement sous** la ligne en pointillés de $O$
(la bille est figurée déjà immergée), non « au niveau de $O$ ».
**Physique re-dérivée** : $\tau = m/k$ ⇒
$k = m/\tau = 10\cdot10^{-3}/0{,}1 = \mathbf{0{,}1\ \text{kg.s}^{-1}}$ (SI) ;
au régime permanent $V_\ell/\tau = g(1-\rho_r/\rho_a)$ ⇒
$\rho_r = \rho_a\left(1-\frac{V_\ell}{g\tau}\right)
= 7800\times(1-0{,}88) = \mathbf{936\ \text{kg.m}^{-3}}$ — masse volumique de
l'huile de ricin (≈ 960 kg.m⁻³ en table) ✓. Les trois lectures graphiques
($\tau = 0{,}1\ \text{s}$, $V_\ell = 0{,}88\ \text{m.s}^{-1}$, frontière à
$5\tau$) sont donc mutuellement cohérentes.

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
  (en-tête du scan confirmé directement sur l'image ; le résumé HTML
  d'AlloSchool pour `element/136621` annonce à tort « Sciences Mathématiques
  B », README §3, l'image fait foi)
- Code sujet : NS 28F · Barème de l'exercice complet : 5 points ;
  **Partie 1** = 2,75 points ($0{,}5+0{,}75+0{,}5+0{,}25+0{,}75$, barème en
  marge)
- Images lues (reproductibilité) : `.../course-422/upload-84516/0007-big.jpg`,
  `.../0008-big.jpg` (haut de page : question 4 et son barème 0,75)
- Pages du scan : 7 et 8 (haut) sur 8 — *la question 4 (0,75) est imprimée en
  tête de la page 8, au-dessus du titre de la Partie 2* (rectifié 2026-08-07 :
  la fiche n'annonçait que la page 7)
- Portée : **Partie 1 (chute d'une bille dans un liquide visqueux)**.
  Mention en tête de l'exercice : « Les parties 1 et 2 sont indépendantes ».
  La **Partie 2 (mouvement d'un satellite artificiel)** du même exercice est
  transcrite ci-dessous (même fichier, voir la « Note de routage » en tête).

**EXERCICE 4 (5 points) — Partie 1 : Etude de la chute d'une bille dans un
liquide visqueux.**

On se propose dans cette partie, de déterminer la masse volumique $\rho_r$
d'huile de ricin.

On libère, sans vitesse initiale, une bille homogène en acier dans une
éprouvette remplie d'huile de ricin. Cette bille a une masse $m$ et une
masse volumique $\rho_a$.

On étudie le mouvement du centre d'inertie $G$ de la bille dans un repère
$(O, \vec{k})$ lié à un référentiel terrestre considéré comme galiléen
(figure 1).

La bille est soumise, durant sa chute verticale dans le liquide, à l'action
de trois forces :
- son poids $\vec{P}$.
- la poussée d'Archimède $\vec{F}_a$ de direction verticale, de sens vers
  le haut et d'intensité $F_a = \rho_r.V.g$ où $V$ est le volume de la
  bille et $g$ l'accélération de la pesanteur.
- la force de frottement fluide, modélisée par le vecteur
  $\vec{F} = -k.\vec{v}$ où $k$ est une constante positive et $\vec{v}$ le
  vecteur vitesse de $G$ à un instant $t$.

Un système d'acquisition informatisé permet d'obtenir la courbe de la
figure 2 représentant l'évolution de la vitesse $v(t)$.

La droite $(T)$ étant la tangente à la courbe au point d'abscisse $t = 0$.

**Données :** $m = 10\ \text{g}$ ; $\rho_a = 7{,}8\ \text{g.cm}^{-3}$ ;
$g = 10\ \text{m.s}^{-2}$.

1. (0,5) La courbe de la figure 2 présente deux zones. Attribuer à chaque
   zone le régime correspondant.
2. (0,75) Par application de la deuxième loi de Newton, montrer que
   l'équation différentielle du mouvement de $G$ s'écrit ainsi :
   $\dfrac{dv}{dt} + \dfrac{1}{\tau}.v = g\!\left(1 - \dfrac{\rho_r}{\rho_a}\right)$
   où $\tau$ est le temps caractéristique du mouvement qu'on exprimera en
   fonction de $m$ et $k$.
3. Déterminer graphiquement :
   1. **3.1.** (0,5) la valeur de $\tau$ puis en déduire, dans le système
      international d'unités, la valeur de $k$.
   2. **3.2.** (0,25) la valeur de la vitesse limite $V_\ell$.
4. (0,75) Trouver l'expression de la masse volumique $\rho_r$ de l'huile de
   ricin en fonction de $\tau$, $g$, $\rho_a$ et $V_\ell$. Calculer sa
   valeur.

*Figure 1 (schéma) :* une éprouvette verticale **sans graduations** (simple
récipient cylindrique à rebord et socle sombres). L'axe vertical est tracé **à
gauche de l'éprouvette**, à l'extérieur. En haut, une ligne en pointillés
horizontale part de la marque « $O $ » portée sur cet axe et traverse
l'éprouvette (elle figure la surface du liquide) ; juste en dessous, la flèche
$\vec{k}$ orientée vers le bas. Dans l'éprouvette, un petit cercle étiqueté
« $G$ » est dessiné **un peu au-dessous** de cette ligne (la bille est figurée
déjà immergée), le reste de l'éprouvette étant grisé (liquide). En bas, l'axe
se poursuit et se termine par une pointe de flèche orientée vers le bas,
étiquetée « $z$ ». Légende : « Figure1 ».

*Figure 2 (courbe) :* $v\ (\text{m.s}^{-1})$ en fonction de $t\ (\text{s})$,
sur quadrillage à double graduation. Axe des ordonnées **chiffré**
$0{,}2,\ 0{,}4,\ 0{,}6,\ 0{,}8$ ; axe des abscisses **chiffré**
$0{,}1,\ 0{,}2,\ 0{,}3$. **Traits majeurs mesurés tous les $0{,}1\ \text{s}$ et
tous les $0{,}2\ \text{m.s}^{-1}$, quadrillage fin de
$0{,}02\ \text{s} \times 0{,}04\ \text{m.s}^{-1}$ ; le cadre s'étend jusqu'à
$t = 1{,}0\ \text{s}$ et $v = 1{,}0\ \text{m.s}^{-1}$ — les traits majeurs de
$0{,}4$ à $1{,}0\ \text{s}$ ne sont donc pas chiffrés** (mesuré au pixel,
2026-08-07). Courbe croissante depuis l'origine, concave, tendant
asymptotiquement vers un palier **mesuré à
$V_\ell = 0{,}88\ \text{m.s}^{-1}$** (deux traits fins au-dessus du repère
$0{,}8$). Une droite en pointillés $(T)$, tangente à la courbe à l'origine, est
tracée : sa pente mesurée vaut $8{,}8\ \text{m.s}^{-2}$ et **elle coupe le
palier à $t = 0{,}1\ \text{s}$**, d'où $\tau = 0{,}1\ \text{s}$. Deux zones sont
annotées directement sur le graphe, séparées par **un trait vertical en
pointillés situé exactement à $t = 0{,}50\ \text{s}$** : « **zone1** » (étiquette
vers $t \approx 0{,}3\ \text{s}$), sur la portion courbée qui précède ;
« **zone2** » (étiquette vers $t \approx 0{,}7\ \text{s}$), sur le palier qui
suit. Légende : « Figure 2 ».

---

## 2022 — session normale — Exercice 4 (Partie 2)
Source: https://www.alloschool.com/element/136621
Statut: vérifié — **passe de vérification adversariale indépendante**
(agent-vérificateur-adversarial, 2026-08-07), **diff OK**.
**Élément re-dérivé** : `element/136621` → `course-422/upload-84516`, **8 pages**,
URLs ré-extraites du HTML de `element/` (le résumé HTML annonce toujours à tort
« Sciences Mathématiques B » — README §3, l'image fait foi). **Couverture p.1
relue au pixel** : NS 28F, 3 h, coef 7, SPC/BIOF ; carte
$7+3{,}5+4{,}5+5=\mathbf{20}$ ✓, dont « Exercice 4 (5 points) — Etude de la
chute d'une bille dans un liquide visqueux · Etude du mouvement d'un satellite
artificiel ».
**Portée du diff — `0008-big.jpg`, caractère par caractère** : chapeau
(météorologie, télécommunications, recherche scientifique, contrôle des
frontières), référentiel géocentrique, symétrie sphérique ; **bloc Données relu
au zoom ×3** — $M_T = 5{,}97\cdot10^{24}\ \text{kg}$,
$R_T = 6380\ \text{km}$ (et non 6370),
$G = 6{,}67\cdot10^{-11}\ \text{N.m}^2.\text{kg}^{-2}$,
$h_1 = 1000\ \text{km}$ ; **les 4 items A–D du QCM relus un à un** — A
$G\frac{M_Tm_s}{h_1^2}$, B $G\frac{M_Tm_s}{(R_T+h_1)^2}$, C
$G\frac{M_Tm_s}{R_T^2}$, D $G\frac{(M_Tm_s)^2}{(R_T+h_1)^2}$ ; l'expression
$v=\sqrt{\frac{G.M_T}{R_T+h_1}}$, $T_1 \approx 1{,}75\ \text{h}$,
$T_2 = 24\ \text{h}$ — **aucune divergence de valeur, unité, indice ou
exposant**.
**Barème marginal recompté au pixel** : $0{,}5+0{,}5+0{,}5+0{,}75
=\mathbf{2{,}25}$ ✓ (la ligne 1, en-tête, ne porte aucune annotation, ce que la
transcription respecte) ; $2{,}75+2{,}25=\mathbf{5}$ = total de l'Exercice 4 ✓.
**Figure 3 — relue au zoom ×5, verdict conforme.** Cercle extérieur en
pointillés (orbite) et cercle intérieur à trait plein (Terre) concentriques ;
$O$ au centre avec « Terre » juste en dessous ; $R_T$ porté par une flèche
radiale **à l'intérieur** du cercle terrestre ; $h_1$ porté par un segment
radial en pointillés à double pointe **entre la surface de la Terre et le
point $S$**, lui-même matérialisé par un point plein sur l'orbite (en haut à
droite) ; légende « Figure 3 ». Aucune position d'élément ni de flèche n'est
fautive, et **la figure ne comporte ni courbe ni axe gradué** — la classe de
défaut « flèche d'étalonnage lue comme période » est **sans objet** ici.
**Physique re-dérivée indépendamment** : $r = R_T+h_1 = 7380\ \text{km}$ ;
$v=\sqrt{GM_T/r}=\sqrt{3{,}982\cdot10^{14}/7{,}38\cdot10^{6}}
= 7{,}35\cdot10^{3}\ \text{m.s}^{-1}$ ⇒
$T_1 = 2\pi r/v = 6{,}31\cdot10^{3}\ \text{s} = \mathbf{1{,}754\ \text{h}}$,
soit exactement le $T_1 \approx 1{,}75\ \text{h}$ que 1.3 demande de vérifier ✓.
**Contrôle du QCM** : seule **B** est homogène et correcte (la distance
centre-à-centre est $R_T+h_1$) — une et une seule réponse juste, les quatre
items sont donc transcrits correctement. **3ᵉ loi de Kepler** :
$r_2 = r_1(T_2/T_1)^{2/3} = 7380\times(13{,}68)^{2/3}
= 4{,}23\cdot10^{4}\ \text{km}$ ⇒
$h_2 = r_2-R_T \simeq \mathbf{3{,}6\cdot10^{4}\ \text{km}}$ — l'altitude
géostationnaire (35 786 km en table) ✓, cohérent avec $T_2 = 24\ \text{h}$.

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
  (en-tête du scan confirmé directement sur l'image ; le résumé HTML
  d'AlloSchool pour `element/136621` annonce à tort « Sciences Mathématiques
  B », README §3, l'image fait foi)
- Code sujet : NS 28F · Barème de l'exercice complet : 5 points ;
  **Partie 2** = 2,25 points ($0{,}5+0{,}5+0{,}5+0{,}75$, barème en marge)
- Images lues (reproductibilité) : `.../course-422/upload-84516/0008-big.jpg`
- Pages du scan : 8 (sur 8)
- Portée : **Partie 2 (mouvement d'un satellite artificiel)**. Classée ici,
  **et non sous `atome-mecanique-newton.md`** — voir la « Note de routage »
  en tête de ce fichier (même raisonnement que pour 2025 N Ex IV Partie 1,
  précédent direct). Mention en tête de l'exercice : « Les parties 1 et 2
  sont indépendantes ». La **Partie 1 (chute d'une bille dans un liquide
  visqueux)** du même exercice est transcrite ci-dessus.

**Partie 2 : Etude du mouvement d'un satellite artificiel.**

*(Cadrage de la partie, transcrit intégralement : « Les satellites
artificiels sont placés en orbite autour de la Terre, pour des utilisations
variées telles la météorologie, les télécommunications, la recherche
scientifique ainsi que le contrôle des frontières… L'objectif de cette
partie est d'étudier quelques grandeurs caractérisant le mouvement d'un
satellite artificiel autour de la Terre. »)*

On étudie le mouvement d'un satellite artificiel $S$ de masse $m_s$ dans un
référentiel géocentrique supposé galiléen.

On admet que la Terre présente une distribution de masse à symétrie
sphérique.

On néglige toutes les forces exercées sur le satellite $S$ devant la force
d'attraction universelle exercée par la Terre ainsi que les dimensions de
$S$ devant la distance qui le sépare du centre $O$ de la Terre.

**Données :**
- Masse de la Terre : $M_T = 5{,}97 \cdot 10^{24}\ \text{kg}$ ;
- Rayon de la Terre : $R_T = 6380\ \text{km}$ ;
- Constante de gravitation universelle :
  $G = 6{,}67 \cdot 10^{-11}\ \text{N.m}^2.\text{kg}^{-2}$.

1. Ce satellite est placé sur une orbite circulaire de centre $O$ et de
   rayon $r = R_T + h_1$, où $h_1 = 1000\ \text{km}$ (figure 3).
   1. **1.1.** (0,5) Choisir, parmi les propositions suivantes, celle qui
      est juste. L'expression de l'intensité de la force de gravitation
      universelle exercée par la Terre sur le satellite est :

      | | |
      |---|---|
      | A | $F_{T/S} = G\dfrac{M_T.m_s}{h_1^2}$ |
      | B | $F_{T/S} = G\dfrac{M_T.m_s}{(R_T+h_1)^2}$ |
      | C | $F_{T/S} = G\dfrac{M_T.m_s}{R_T^2}$ |
      | D | $F_{T/S} = G\dfrac{(M_T.m_s)^2}{(R_T+h_1)^2}$ |

   2. **1.2.** (0,5) En appliquant la deuxième loi de Newton, montrer que
      l'expression de la vitesse $v$ de $S$ est :
      $v = \sqrt{\dfrac{G.M_T}{R_T+h_1}}$.
   3. **1.3.** (0,5) Vérifier que la période de révolution du mouvement de
      $S$ autour de la Terre est : $T_1 \approx 1{,}75\ \text{h}$.
2. (0,75) Le satellite $S$ est placé sur une autre orbite circulaire située
   à une altitude $h_2$ de la surface de la Terre. Il a alors un mouvement
   circulaire uniforme de période de révolution $T_2 = 24\ \text{h}$. En
   utilisant la troisième loi de Kepler, déterminer l'altitude $h_2$.

*Figure 3 (schéma) :* deux cercles concentriques centrés sur le point
« $O$ », marqué au centre et étiqueté « Terre » juste en dessous. Le cercle
intérieur, plein, représente la Terre, de rayon noté « $R_T$ » (segment
radial étiqueté à l'intérieur du cercle). Le cercle extérieur, en
pointillés, représente l'orbite du satellite ; un point sur ce cercle est
étiqueté « $S$ ». Un segment radial en pointillés, étiqueté « $h_1$ »,
relie le bord du cercle intérieur au point $S$ sur le cercle extérieur.
Légende : « Figure 3 ».
