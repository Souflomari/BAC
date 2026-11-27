# Relectures pédagogiques des trois leçons du 2026-11-25

> Les trois listes du critique, telles que rendues, avant correction. Toutes ont été reprises le même jour
> (voir la section 0 de chaque plan dans `docs/refonte/specs/`). Elles restent ici comme grille : ce sont
> les défauts qu'aucun contrôle automatique ne voit. Les numéros de ligne datent de la relecture.

---

## Critique pédagogique du dipôle RL (2026-11-25)

Fichiers : web/src/components/pilote/dipole-rl-moteur.js, dipole-rl-scenes-a.js, -b.js, -d.js, dipole-rl-outils.js, exercices/dipole-rl.js ; catalogue web/src/lib/apprentissage-catalogue/dipole-rl.ts (généré par web/scripts/apprentissage-gen/spec-dipole-rl.mjs).

### Bloquant (réponse donnée avant la question)
1. `triangle-L`, `r-palier` : le sous-titre de la scène `couple` affiche toujours « E = 6 V · R = 50 Ω · r = 10 Ω · L = 0,30 H » (scenes-d l. 80, `ti.set` jamais rappelé). → sous-titre par étape sans la grandeur demandée.
2. `uL-rupture` : le reveal de `rupture-pari` joue déjà la rupture avec `ul:1` (courbe u_L, saut, lecture −5,0 V) ; le fb du leurre 3 dit « c'est u_L qui change de signe ». → `ul:0` à `rupture-pari`, retirer la phrase.
3. `energie-pari` : sous-titre « E_m en fonction de i : une parabole » avant le pari (scenes-b l. 161). → neutre jusqu'au reveal.
4. `influence-E` : `curseurs`, juste avant, affiche « L ne règle que la durée, E que la hauteur, R + r les deux ». → mettre `influence-E` avant `curseurs` ou retirer E de la phrase.
5. `q3` : leurres étiquetés (« 0,22 ms : r oubliée », « 0,20 s : mH non converti »). → sans étiquette, erreur nommée dans le fb.
6. `rappel` : leurre « … : c'est le condensateur que tu décris » se disqualifie. → sans commentaire.
7. `oscillo` : sous-titre « voie Y₁ de l'autre côté de R, masse entre R et la bobine » avant la question (scenes-a l. 243). → vide tant que `osc` = 0.

### À corriger
8. « i est continu » affirmé, jamais expliqué. → après `u0`, un pari « si i sautait de 0 à 100 mA en un instant, que vaudrait L di/dt ? ».
9. `verif` : réponse déjà donnée par `meme-equation`. → faire choisir la ligne « L/τ − (R + r) = 0 ».
10. `permanent` : à `u0`, `ic:1` dessine déjà toute la courbe i(t) en pointillé (scenes-d l. 224) → `ic:0` ou masquer `iGh`.
11. `energie-pari` : notion d'énergie pas posée. → « l'énergie dissipée dans R, avec P = R i² », puis le pari.
12. `bac-ed` : raisons = étiquettes ; écrire le « pourquoi ce geste », faire choisir la ligne 4.
13. `q1` : bonne réponse seule chiffrée et la plus longue. → un leurre chiffré aussi.
14. `triangle` (et exercice 3 QCM) : bonne option bien plus longue. → raccourcir, explication dans le fb.
15. `bac-2c` : leurre « lu à 3 mA » n'attrape rien (le texte donne 6 mA). → retirer la valeur du texte ou leurre τ = L/R₁.
16. `energie-etablir` (et ex. 15) : fb confus. → « r i² est la puissance perdue en chaleur ; seul L i di/dt = d(½ L i²)/dt est stocké. »
17. `allure` leurre 1 : « valeur finale » → « valeur maximale ».
18. `bac-AB` indice : « la bobine étant continue » → « i étant continu dans la bobine ».
19. `bobine-reelle` : « La même bobine, de résistance r = 10 Ω » contredit `pente-tension`. → « Une bobine réelle, L = 0,30 H et r = 10 Ω ».
20. Exercice 2 QCM : deux options équivalentes, bonne seule chiffrée.
21. Exercice 14 QCM B : seule la bonne option justifiée ; leurre absurde → « B = −E/(R + r) ».
22. Étiquettes `erreur` mal attribuées : ex. 8, 14, 10, 6, 13, 3 (une étiquette juste par piège).
23. Exercice 10 revendique 1.3.2.11 sans courbe. → tracer les trois courbes.
24. « 63 % », « 37 % », « 1 % » en dur (`sav-test` l. 120, 122 ; indices de `tau-63`, `rupture-tau` ; ex. 7, 8, 14). → `P63`, `P37`.

### À discuter
25. Redites avec RC : 63/37 % quatre fois, u_L(0⁺) = E trois fois ; `oscillo-voies` pourrait travailler voie et signe.
26. `pas-pari` : faire parier la valeur (9 / 10 / 8 mA).
27. `ed-forme` affiche la forme cible ; `triangle-L` : faire lire la pente.
28. `sav-rappel` : deux idées dans une étape.
29. Bilan : manque u_L(0⁺)/signe à la rupture et lecture de τ ; forme 2026 en u_R absente.

---

## Critique pédagogique « Transformations non totales » (2026-11-25)

Fichiers : web/src/components/pilote/transformations-non-totales-moteur.js (`moteur`), -scenes-b.js, -scenes-d.js, -outils.js (`outils`), exercices/transformations-non-totales.js (`exos`). Numéros = lignes au moment de la relecture.

### Bloquant (faux, ou réponse donnée)
1. `q2` : la scène `quiz` affiche toujours `big` et `sub` avant la réponse (scenes-d l.60) ; QUIZ[1] (moteur l.51) affiche « CH₃COO⁻ est une base / au sens de Brønsted » alors que l'étape demande laquelle est une base (l.434). → `big:'CH₃COO⁻ ou H₃O⁺ ?'`, réponse gardée pour `r1`.
2. `vitesses` : « autant » déjà donné : l'`apres` de `attendre` dit « le retour finit par compenser l'aller » (l.261) et ses rétroactions aussi (l.263-264) ; la rétroaction juste de `qui` dit « les molécules, elles, changent » (l.278). → `attendre` ne montre que le palier ; la compensation est gardée pour `vitesses`.
3. `double-fleche` : le texte « Les deux réactions ont lieu en même temps » (l.289) est la justification de la bonne option (l.291). → « Comment écrire l'équation de ce que tu viens de compter ? ».
4. `dilution-pourquoi` : les trois rétroactions de `dilution-pari` (l.353-355) disent déjà « A⁻ et H₃O⁺ se rencontrent moins souvent : le retour ralentit » = bonne option l.365. → rétroactions de `dilution-pari` : seulement l'observé (« le compte monte à 12 »).
5. `tableau` : le texte (l.182) et la case « excès » réfutent d'avance le leurre « il faudrait la quantité d'eau » ; la dérivation affiche n₀(AH) = C V = 1,0 × 10⁻³ mol (l.183) ; le leurre « 1,0 mol : V a été laissé en mL » dit son erreur (l.188). → retirer « en excès » du texte et le terme numérique de la 1re ligne ; leurre « 1,0 mol » sans commentaire.
6. `inverse`, `attendre`, `qui`, `vitesses` : le bandeau de partie « 05 — Les deux réactions qui se croisent » (BEATS l.94) annonce la réaction inverse avant la question. → renommer la partie « La solution à la loupe ».
7. `comparer`, et `exos` `tnt-xf` l.228 : « la réaction s'est arrêtée là » (l.206) est faux d'après la leçon elle-même. → « la transformation s'arrête là : x_f ne bouge plus ».
8. `ampholyte` : « NH₃ + H₂O → NH₄⁺ + HO⁻ » avec → (l.172) alors que la réaction est limitée. → ⇄, ou la note « flèche provisoire » d'`eau-base`.
9. `exos` `tnt-bronsted`, couple H₃O⁺/H₂O (l.86, 94, 98) : quand ce couple est tiré, `faux` vaut H₃O⁺ : Q1 propose « H₃O⁺ » avec la rétroaction « Tu as pris l'ion hydroxyde… » ; Q2 propose « H₃O⁺/H₃O⁺ : l'acide avec l'ion hydroxyde ». → retirer ce couple de `COUPLES`, ou leurre et rétroaction propres.

### À corriger
- `equilibre` : le texte « Le compte ne change plus » (l.297) donne la réponse. → « Le système est dans un état d'équilibre ».
- `transfert` : `loupe` (l.240) annonce « l'ion A⁻ et l'ion H₃O⁺ ». → retirer cette phrase de `loupe`.
- `tau-formule` : « HCl : τ = ? » déjà tranché par `si-totale` (l.192). → autre couple C/pH (ex. 10⁻³ et 3,7).
- `attendre` : axe des ordonnées 0–20 visible avant le pari (scenes-b l.119, 125), exclut « monte jusqu'à 100 » → axe 0–100 avant réponse puis zoom ; rétroaction de « jusqu'à 100 » (l.263) ne nomme pas l'erreur → « Tu as supposé que seul le sens direct agit… ».
- `bac-2b` : « montrer que α = 1 − τ » cité dans `bac-2a` (l.408). → demander la ligne α = 1 − x_f/(C_A V) → ? sans la montrer (l.418).
- Bonne réponse reconnaissable à sa forme : `tau-def` (l.214), `quasi-totale` (l.335), `q1` (l.429), `vitesses` (l.286), `bac` (l.383, ~90 caractères, et pari en BET sans indice alors qu'il a une bonne réponse → VF avec indices). → même forme pour les leurres.
- Leurres qui disent leur erreur : `palier` (l.270-271), `si-totale` (l.194), `tau-formule` (l.225), `hcl-zoom` (l.307), `dilution-calc` (l.361). → nombre seul, explication en rétroaction.
- `qui` : leurre « a quitté la solution » (l.279) n'attrape rien. → « est redevenue AH et le restera ».
- `sens` : texte du leurre (l.342) et rétroaction ne visent pas la même erreur. → les aligner (l'espèce ajoutée impose le sens).
- Modèle de la loupe (scenes-b l.45-63, 189) : chaque H₃O⁺ est posé contre « son » A⁻ et lui rend le proton. → le proton revient depuis le jeton d'une autre molécule voisine ; note « en vrai, toutes les molécules bougent ».
- Ordre `bac` → `bac-eq` (l.381-391) : commencer par `bac-eq`.
- Nombres en dur : `vitesse-avancement` « τ = 0,04 » (l.330) ; indice de `q3` « 0,0132 × 100 » (l.444) ; indice de `si-totale` « 10⁻² » (l.193) ; sous-titre de `limitee` « 90 % » (l.229) ; `sujet` de `palier` « 4 molécules » (l.266) ; fiche `tauxavancement` « 0,072 » et « 1,32 % » (l.476 ; 0,072 vient du sujet 2015, absent des sources d'`outils`). → tirer d'`outils`.
- Étiquettes `erreur` d'`exos` fausses : l.194 ; l.286 et 306 ; l.296 ; l.327 f2 ; l.369.
- `exos` `tnt-limitee` cas 1 (l.291) : tirer τ ∈ [0,8 ; 0,95]. Cas 0 (l.286) : leurre → « limitée : un acide faible ne cède jamais tout ».
- Langue : `exos` l.413, 416 « Une solution de un acide faible » ; « une solution de l'acide éthanoïque » ; l.322 « seuls leur nombre est stable ».

### À discuter
- `dilution-pari` l.349 : méta-phrase « enrichissement en PC et SM » dans un pari → note après la réponse.
- ⇄ montré dès `couple` (l.150) et `eau-base` (l.158) avant d'être construit → « = » dans les demi-équations, ou l'annoncer comme notation.
- `curseur-ph` : la phrase en gras dit ce que le geste doit faire découvrir (l.228) → un « Vérifie » après la manipulation.
- `bronsted`, tag 1923 (l.137) → fiche de mot.
- Quiz de fin : titres « Piège n° 1 / 2 / 3 des copies » sans source → « Piège de copie » ; remplacer `q2` par la conclusion ou par V.
- `bac-2a` : masquer aussi la case 4.
- `exos` `tnt-bac` 2021 (l.421-423) : deux options commencent par « la même valeur ».
- Bocal dilué : écartement 40 → 44 pour un volume ×10 → vignette à part, bocal visiblement plus grand.

---

## Critique pédagogique « Nombres complexes » (2026-11-25)

Chemins sous web/src/components/pilote/. Lignes = complexes-moteur.js sauf mention (au moment de la relecture).

### Bloquant
1. `bombelli`, `retour-cube` contre `q1` : la leçon écrit √ d'un négatif comme un objet défini, puis compte faux le même geste au bilan. l.101 « on note i ce nombre » revient à poser i = √−1 ; l.338 « on note 11i = √−121 » sans dire que −11i a le même carré ; l.425 `q1` marque faux « 3i, car (3i)² = −9, donc √(−9) = 3i ». → l.101 : « on appelle i un nombre tel que i² = −1 ». l.338 : « (11i)² = −121 : 11i joue le rôle de √−121 dans la formule ; −11i aussi, la formule choisit », sans signe =.
2. `fois-i` : l'option B s'appelle « un quart de tour autour de O » (l.145) alors que `quart` et `quatre-quarts` (l.120) viennent de poser cette règle. → options par position seule « en A (2 ; 3) », « en B (−2 ; 3) », « en C (−3 ; −2) », ou Vérifie « i(3 + 2i) = ? ».
3. `bac-c` : dès `bac` (l.367), `cercles:'bac', cu:1` dessine (Γ) et (Γ′) dans le repère gradué ; ils se touchent visiblement en −4, réponse de `bac-c` (l.393). → `cu:0` de `bac` à `bac-c`, cercles tracés au `reveal` de `bac-c` ; ou figure sans graduations.
4. `retour-pourquoi` : rétro et indice du 3e leurre (l.362) affirment « le plan est venu après le calcul avec √−1 », fait classé « à vérifier ». → retirer cette chronologie ; rétro : « le plan les rend visibles ; il ne dit pas pourquoi la formule donne 4 ».
5. `retour-pourquoi` : l'`apres` de `retour-somme` (l.356) dit « la formule donne 4, en osant calculer avec √−121 » = option juste suivante (l.360). → `apres` réduit à « La formule donne 4. », ou `retour-pourquoi` avant `retour-cube` en pari de prédiction.
6. Exercice 11 (exercices/complexes.js l.519) : le leurre « conjugué de δ » donne {z₂, z₁} quand Re z₁ = Re z₂ (~1 tirage sur 6), affiché « z₂ et z₁ » à côté de la bonne ; le filtre `vus` compare des chaînes. → rejeter le tirage si Re z₁ = Re z₂, ou comparer des ensembles.
7. Exercice 11 (l.527) : quand ct(bb) commence par « − », le « + » disparaît : `z^2 (-3-i)z + (…) = 0`. → `z^2 + (${ct(bb)})z` ou `z^2 - (${ct(S_)})z`.
8. Exercice 8 (l.401–402) : avec q = 1 et a = 1, `reel()` retire le « i » de « 1-i » et affiche « z = 1- ou z = 1+ » (~4 % des tirages). → construire le leurre « sans i » à partir des nombres.

### À corriger
- `fausse` : la courbe est entière depuis `cubique` (seq `cb:1`, l.84), ses trois passages par l'axe se voient avant le pari ; le `reveal` `trois` n'ajoute que des étiquettes ; les rétros disent « Regarde la courbe » (l.93–95). → tracer la courbe au `reveal`, dire « La réponse viendra à la fin de la leçon ».
- `bombelli` : le texte présente déjà la bonne option (« Une issue… en posant (√−1)² = −1 », l.99) ; rétro du 2e leurre (l.102) n'explique pas. → texte neutre (« deux règles se contredisent ») ; rétro : « garder la règle donne i² = 1, et l'on perd le nombre de carré −1 qu'on voulait ».
- `quart` (l.110–114) : « c'est donc… » après « un demi-tour » appelle le seul « quart de tour » ; deux leurres « multiplications », la bonne un « tour ». → trois options de même nature géométrique.
- `conjuguees` (l.288) : pari de prédiction alors que la réponse découle de la définition, sans second essai. → Vérifie avec indices.
- `bac` (l.370) : pari de prédiction alors que le rétro tranche ; bonne option seule à porter une formule. → VF avec indices, options de même forme.
- `diviser` (l.218) : leurre « (2 + 3i)/5 » contredit la dérivation affichée (l.211–212). → fraction renversée ou « −4 + 7i ».
- `sm-resoudre` (l.324) : leurre « δ = 1 + i » impossible (le texte l.320 donne δ = 1 − i). → division par 2 oubliée, ou signe de −b.
- `retour-conj` (l.344) : « La formule contient aussi un nombre de la forme 2 − i » est faux. → « La formule contient aussi ∛(2 − √−121) : essayons 2 − i ».
- Énigme mal refermée (l.350–364) : l'élève ne voit jamais ∛(2 + √−121) = 2 + i parce que (2 + i)³ = 2 + 11i. → ligne `tex` « x = (2 + i) + (2 − i) = 4 » sous la formule au `reveal` de `retour-somme`.
- `module-somme` (l.238–239) : rétro et indice parlent du « triangle de la figure » ; ENSEMBLES.tri ne dessine que trois points (complexes-scenes-b.js l.172). → tracer O → z → z + w, ou retirer « figure ».
- Nombres en dur : `canonique` tex `z^2-2z+5` (l.274) ; fiche `canonique` (l.461) ; `sm-somme-produit` « racines 1 et 2, la somme vaut 3 » (l.329) ; légende « y = x³ − 15x − 4 » (complexes-scenes-a.js l.67). → complexes-outils.js.
- Exercice 6 (l.311–315) : deux options égales quand B = −3A ; l'affixe du milieu n'est enseignée nulle part. → `distincts` sur `mil` ; retirer la question du milieu ou l'enseigner.
- Exercice 1 (l.111) : teste « imaginaire pur », jamais défini. → fiche `[[imaginaire-pur|imaginaire pur]]` (Re = 0), définir aussi « forme algébrique ».
- Étiquettes `erreur` : exercice 4 l.223 ; exercice 8 l.406 ; exercice 10 l.492 (à l'envers).
- Renvois du bilan (l.468) : `q2` → exercice 7 ; `q1` → exercice 9.
- Cartouches du bilan `quiz` (l.48–50) : « Piège 3 sur 3 : Δ < 0 » donne le signe de Δ ; tags et textes de `q1`, `q2` nomment le piège. → tags neutres.

### À discuter
- `retour-cube` (l.334) : « Essayons 2 + i » sans raison → « on cherche a + i dont le cube a 2 pour partie réelle ».
- Orthogonalité OM ⊥ OM′ affirmée (équerre, note l.502), jamais montrée par a·(−b) + b·a = 0.
- Bilan : `q2` refait `module-somme` ; i² = +1 dans un produit ou une division n'est pas au bilan.
- `point-z` (l.128) : cinq notions dans une étape.
- « Calculons / Prenons / Reprenons / Essayons » au lieu de l'impératif tutoyé.
- `savoir` (l.77) : la bonne réponse est la seule qui dit « aucune ».
