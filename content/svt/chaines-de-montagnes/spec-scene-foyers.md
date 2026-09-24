# spec — scène 3D `foyers-sismiques` (SVT · chaines-de-montagnes, R1)

**Statut : PROPOSITION, non validée.** Écrite le 2026-09-24 par pedagogy-architect.
Rien ici n'est à construire avant la validation du propriétaire : la scène touche
`lesson.md`, `items.yaml` et `checkpoints.yaml` d'une matière que la campagne
déclare **GELÉE** (`docs/cadre/curriculum/svt.yaml`, `coverage_notes`). Le gel
doit être levé explicitement pour les retouches de prose du §4 ; la scène seule
(descripteur + registre + porte) n'y touche pas.

**Ce que ce document est.** Le cadrage pédagogique complet d'une scène three.js
de première partie (ADR 0041) : sa justification contre le §1, son placement, ses
cinq étapes à pari, ses contrôles et ses lectures, la liste de ce qui ne doit pas
être à l'écran avant chaque pari, les lignes d'honnêteté, la frontière de
programme, une misconception nouvelle avec ses quatre items de banc, et le
contrat de code.

**Ce que ce document n'est pas.** Il n'écrit ni le JSON, ni le TypeScript, ni la
prose finale, ni les items finaux. Le descripteur est de content-author
(`content/svt/chaines-de-montagnes/media/foyers-sismiques.json`), le rendu et le
registre de frontend-builder (`web/src/lib/scene3d/`), les items d'item-author
(`items.yaml`).

**Enjeu de corpus.** Ce serait la **première figure manipulable de toute la SVT**
(0 sur 11 aujourd'hui — `docs/audits/DECISIONS-EN-ATTENTE.md` §1 et §12), sur la
matière dont la VISION dit en propre : « SVT thinking is visual, so it needs real
schema-construction interactions (drawing, labeling), **not displayed images** ».
La SVT porte 49 SVG statiques et zéro construction. L'étape 3 de cette scène est
une construction de schéma au sens strict : l'élève **trace lui-même** le plan de
Wadati-Benioff sur des foyers réels, et lit ce que son tracé vaut.

---

## 1. Le cadre : ce que le programme autorise, et ce qu'il interdit

### 1.1 Placement

Filière **SVT** · matière **SVT** · domaine **géologie** · sous-domaine
**`geodynamique_chaines_montagnes`** · chapitre **`chaines_de_montagnes`**
(`docs/cadre/curriculum/svt.yaml`, l. 282-352). Prérequis immédiat : le chapitre
voisin `tectonique_plaques` (lithosphère/asthénosphère, frontières de plaques,
sismicité comme tracé des frontières). Aval immédiat :
`granitisation_deformation` (pression de confinement, faciès, anatexie) — **la
scène n'y entre pas**.

### 1.2 Les `savoir_faire` que la scène sert (citation exacte)

- « Interpréter une coupe de terrain : identifier le type de chaîne à partir
  d'indices indépendants (ophiolites, chevauchements, métamorphisme,
  volcanisme/sismicité). »
- La compétence du sous-domaine : « … **exploiter cartes, coupes, profils et
  données géophysiques**. »
- Programme du chapitre : « Chaîne de subduction (type andin) : fosse, **plan de
  sismicité incliné (Wadati-Benioff)**, volcanisme andésitique (**fusion
  partielle par déshydratation de la plaque**). » · « Chaîne de collision (type
  himalayen) : … **absence de volcanisme et de séismes profonds**. »

La scène est l'exécution littérale de « exploiter cartes, coupes, profils et
données géophysiques ». La revue du 2026-09-19 note que ce geste **n'est jamais
exécuté** dans la notion (« Le geste d'expert — lire un document — n'est jamais
exécuté ») ; c'est cette dette-là que la scène paie.

### 1.3 `limites` et `exclusions` portées en contraintes DURES

Du chapitre (`limites`) :
1. « Volcanisme de subduction expliqué par la **fusion partielle hydratée du
   manteau (qualitatif)** ; **pas de diagrammes de phase quantitatifs**. »
   → la scène énonce le lien eau → abaissement du seuil de fusion en **une
   phrase**, sans courbe, sans solidus, sans pourcentage de fusion.
2. « Obduction : … **À CONFIRMER** (statut exact dans le cadre incertain). »
   → la scène **n'en parle pas du tout**.

Du sous-domaine (`exclusions`, valables pour tous ses chapitres) :
3. Modélisation numérique de la convection → **aucune** dynamique, aucune force,
   aucun moteur chiffré.
4. Thermobarométrie quantitative / chemins P-T-t → hors sujet ici, mais interdit
   d'y glisser.
5. Sédimentologie de bassin, stratigraphie séquentielle → néant.
6. Géochimie isotopique fine → néant.

**Ces six lignes sont des non-négociables pour content-author et item-author.**
Le §9 les développe en frontière opérationnelle.

### 1.4 Poids d'examen et mélange cognitif — **à ne pas inventer**

Le cadre SVT **ne publie pas** de `part_examen` par sous-domaine : le champ dit
littéralement « répartition % par domaine non publiée (PDF scanné) — voir
coverage_notes », et les habiletés portent la note « barème transversal **25/75**
; la géologie est un **fort pourvoyeur de Partie II** (coupes, profils, cartes) ».

**Ce qu'on peut donc écrire, et rien de plus :** la cible cognitive de cette
notion est la **Partie II** (raisonnement sur document, 75 % du barème). C'est
exactement le registre de la scène et des quatre items du §10. Le déséquilibre
constaté par la revue — « 10 items sur 10 sont des QCM ; le QCM est un format de
Partie I (5/20) », et 108/108 items SVT en `type: mcq` — **n'est pas résolu ici**
: les quatre items proposés restent des QCM pour ne pas ouvrir seul un chantier
de format sur tout le corpus. Le §12 le porte en décision ouverte.

---

## 2. Pourquoi la 3D — ADR 0041 §1, appliqué

**L'idée est spatiale, et elle n'est spatiale que dans la troisième dimension.**

(a) **La profondeur n'est pas une donnée de plus : c'est une direction.** Une
carte de sismicité — le document que l'élève reçoit à l'épreuve — est une
projection qui **détruit exactement la dimension qui porte le sens**. Vus du
dessus, 3 074 foyers forment une tache. Vus le long de la fosse, les mêmes points
forment une bande inclinée. Rien n'a été ajouté, rien n'a été colorié : on a
tourné. C'est la définition même du critère du §1 — « changer de point de vue
révèle ce qu'une figure plane énonce sans le montrer ».

(b) **Un PLAN ne se prouve pas sur une coupe.** Une coupe montre une **ligne** ;
le cadre, lui, exige le mot **plan** (« plan de sismicité incliné »). La
différence entre une ligne dans une coupe et un plan qui tient sur 900 km de
chaîne ne s'établit qu'en faisant glisser la tranche du nord au sud et en voyant
la même pente revenir (étape 2). Aucune figure plane ne peut faire ça ; une
figure plane ne peut que l'**affirmer** — et c'est précisément ce que fait
aujourd'hui `lesson.md` l. 50 (« ces séismes … dessinent un plan incliné »).

(c) **La position des volcans est une conséquence géométrique du pendage.** « À
23°, la profondeur de 100 km est atteinte à 235 km de la fosse ; le premier
volcan est à 240 km » est un raisonnement qui met en jeu une distance
horizontale, une profondeur et un angle — trois grandeurs de l'espace. Sur une
carte, les volcans sont une ligne sans raison ; en 3D, ils sont posés à
l'aplomb d'une profondeur.

(d) **Le relief n'est jamais invoqué.** Aucune texture, aucun ombrage de
paysage, aucune Terre en perspective : des points, deux traits (côte, fosse), un
plan réglable. Si une figure plane suffisait, elle gagnerait — elle ne suffit
pas, et la notion en a déjà cinq qui le prouvent.

---

## 3. Les données — réelles, mesurées, et ce qu'on n'a pas mesuré

Trois sources du domaine public, citées **à l'écran** (§8).

### 3.1 Séismes — USGS ComCat

| | Andes (nord du Chili / sud du Pérou / Bolivie / NO Argentine) | Himalaya (Népal) |
|---|---|---|
| Critères | M ≥ 4,5 · 2000-01-01 → 2024-01-01 | **identiques** |
| Boîte | lat −26…−18, lon −74…−62 | lat 26…31, lon 80…89 |
| Foyers | **3 074** | **400** |
| Profondeur | 1 → **602 km** | médiane 10 km · max **89 km** |
| Foyers > 100 km | **1 927** | **0** |
| — | | 90 % au-dessus de 36 km |

Histogramme andin (somme vérifiée = 3 074) : 0-35 : 588 · 35-70 : 319 · 70-100 :
240 · 100-150 : 944 · 150-200 : 533 · 200-300 : 402 · 300-400 : 2 · 400-500 : 0 ·
500-600 : 44 · 600+ : 2. D'où **1 927 = 3 074 − (588 + 319 + 240)**.

**Profil andin** — profondeur médiane par bande de 1° de longitude, convertie en
distance à la fosse (fosse ≈ lon −71,5 ; 103 km par degré à 22°S) :

| Distance à la fosse | 0 km | 103 | 206 | 309 | 412 | 515 | 618 | *721* | *824* |
|---|---|---|---|---|---|---|---|---|---|
| Profondeur médiane | 17 km | 27 | 101 | 114 | 176 | 200 | 255 | *14* | *526* |

Les deux dernières colonnes sont **deux populations distinctes**, traitées au §8.

**Ajustement** : droite profondeur/distance à la fosse, sur les foyers de moins
de 350 km et hors population superficielle d'arrière-arc → **pendage ≈ 23°**,
écart perpendiculaire médian **11 km**, **80 %** des foyers à moins de 23 km du
plan, **90 %** à moins de 33 km. Le vrai panneau est plus plat près de la fosse
et plus raide au-delà de 100 km ; **un plan unique est le modèle du programme**.

### 3.2 Volcans — NOAA NCEI

**41 volcans de l'Holocène** dans la boîte andine (Parinacota, Guallatiri,
Isluga, Irruputuncu, Ollagüe, San Pedro, Putana, Licancabur, Láscar, Socompa,
Llullaillaco, Lastarria…), presque tous entre lon −69,2 et −67,4, soit
**≈ 240 à 420 km de la fosse**. Sous eux, profondeur médiane des foyers de plus
de 60 km : **116 km** (lon −68,5) · **126 km** (−68,0) · **192 km** (−67,5).

### 3.3 Côtes — Natural Earth 1:110m (1:50m si la boîte l'exige)

### 3.4 Ce qui n'est PAS mesuré — à mesurer à la construction, jamais à inventer

1. **Le nombre de volcans holocènes dans la boîte himalayenne.** Probablement
   nul, **non vérifié**. Tant que la mesure n'est pas faite, **la scène ne dit
   rien des volcans himalayens** (l'absence de volcanisme est portée par R2 en
   prose, et par `cp-r1-himalaya` — §4.5).
2. **Le nombre de foyers himalayens à exactement 10,0 km.** La ligne d'honnêteté
   du §8 l'annonce ; le chiffre doit être **calculé au build** et affiché, ou la
   phrase reste qualitative. Interdiction d'écrire un nombre non mesuré.
3. **La robustesse de la fenêtre de 2° de latitude** (étape 2) : il faut vérifier
   que **chaque** position de la fenêtre porte la bande. Repli écrit d'avance :
   si une position se vide, la fenêtre passe à 4°, ou à trois bandes fixes
   (nord / centre / sud) — **le pari ne change pas**.
4. **L'effectif de la population principale** (après exclusions du §8) : calculé,
   affiché par la lecture `effectif`, jamais écrit en dur dans un texte.
5. **La valeur exacte de « part des foyers à moins de 25 km du plan » au meilleur
   réglage.** On sait seulement qu'elle est **strictement comprise entre 80 %
   (le chiffre à 23 km) et 90 % (celui à 33 km)**. C'est cette fourchette, et
   non un nombre, qui sert de test d'acceptation à la porte.

### 3.5 Le fichier de données vit dans le dépôt

ADR 0031 — un fait affiché vient d'une source qui survit à un clone. Les
catalogues sont **extraits une fois** et versionnés :
`web/src/lib/scene3d/data/foyers-andes.json` et `foyers-himalaya.json`,
`volcans-andes.json`, `cotes-boites.json`. En-tête de chaque fichier : source,
requête exacte (URL + paramètres), date d'extraction, effectif, arrondis
appliqués (coordonnées à 0,01° ≈ 1,1 km ; profondeur à 0,1 km). Chargés
**uniquement** par l'`import()` dynamique de la scène, comme three.js
(ADR 0041 §2) — jamais à l'initial d'une route.

---

## 4. Placement dans la leçon, et les retouches de prose

### 4.1 Où la scène se pose

**Dans R1, juste après le bloc « ### Ce qui se voit en surface » (fin de la
l. 36), AVANT « ### Pourquoi un volcanisme, et pourquoi justement là ».**

Motif (ADR 0041 §6 et sa rétractation) : à cet endroit, l'élève connaît les deux
faits de surface — fosse, alignement de volcans décalé — et **aucun mécanisme**.
Placée plus bas, la scène n'aurait plus rien à casser : la l. 42 explique déjà la
déshydratation et le décalage, et la l. 50 annonce mot pour mot la conclusion de
l'étape 1 (« ces séismes … dessinent un plan incliné qui suit exactement la
trajectoire de la plaque plongeante »). La figure `subduction-andes`, elle,
livre la réponse dès la légende de son étape 4.

Marqueur : `[[embed:foyers-sismiques]]`, seul sur sa ligne.

### 4.2 Le paragraphe d'annonce à écrire AVANT le marqueur (2 à 3 phrases, calmes)

> Rédaction proposée : « Ces deux reliefs se voient depuis la surface. Ce qui se
> passe **en dessous**, personne ne peut aller le regarder — mais les séismes,
> eux, remontent l'information. Voici les 3 074 séismes enregistrés sous cette
> portion des Andes entre 2000 et 2024 : à toi de voir ce qu'ils dessinent, avant
> qu'on te le dise. »

### 4.3 « ### Pourquoi un volcanisme, et pourquoi justement là » — réamorçage

**Ce qui change :** la l. 40 pose aujourd'hui la question « pourquoi ces volcans
apparaissent-ils à distance de la fosse ». Après la scène, l'élève a **mesuré**
la réponse géométrique (le plan est à 115-190 km sous l'arc). La question qui
reste est le **mécanisme**, et elle doit être posée comme telle.

> Remplacer la l. 40 par : « Tu viens de le mesurer : sous la ligne de volcans,
> le plan des foyers est à 115-190 kilomètres de profondeur — et nulle part
> ailleurs le long de la coupe cette profondeur n'est atteinte. La géométrie dit
> donc **où**. Reste la vraie question, celle que la géométrie ne dit pas :
> **pourquoi** une plaque qui passe à 120 kilomètres sous le continent y
> fabrique-t-elle des volcans ? »

Le reste du paragraphe (l. 42, la déshydratation ; l. 44, l'andésite) ne bouge
pas : c'est le mécanisme, et la scène ne l'a pas donné.

### 4.4 « ### Pourquoi les séismes s'enfoncent avec la distance à la fosse » — réécriture

**Ce sous-chapitre ne peut plus annoncer une découverte que l'élève vient de
faire lui-même.** Son nouveau rôle : **nommer** ce qui a été vu (le cadre exige
le nom *Wadati-Benioff*, que la revue trouve aujourd'hui **uniquement dans une
étiquette SVG**), et en tirer l'inférence.

> Remplacer les l. 46-50 par (titre compris) :
>
> « ### Le plan de Wadati-Benioff, et ce qu'il prouve
>
> Ce que tu as tracé porte un nom : le **plan de Wadati-Benioff**. C'est la
> surface inclinée sur laquelle s'alignent les foyers sismiques d'une zone de
> subduction, du plus superficiel près de la fosse au plus profond vers
> l'intérieur du continent. Sous les Andes du nord du Chili, huit foyers sur dix
> en sont à moins de 25 kilomètres, sur une région de 1 200 kilomètres de large.
>
> Le raisonnement tient en une phrase, et il faut pouvoir le refaire seul : un
> séisme suppose une roche **rigide** qui casse ; une bande de foyers qui descend
> régulièrement jusqu'à des centaines de kilomètres suppose donc une plaque
> rigide **encore en train de s'enfoncer là, aujourd'hui**. Le plan de
> Wadati-Benioff n'est pas une image de la plaque plongeante : c'en est la preuve
> directe. »

Et conserver le paragraphe « Retiens ces deux signatures… » (l. 52) tel quel.

**Ajout obligatoire, une phrase, juste avant `[[figure:subduction-andes]]` :**

> « Le schéma qui suit est un schéma de principe : comme presque tous les
> schémas de manuel, il **exagère la pente** de la plaque pour la faire tenir
> dans le cadre. Le pendage réel, celui que tu viens de régler, est d'environ
> 23°. »

Sans elle, le produit se contredit : l'étape 3 apprend à l'élève que les schémas
exagèrent, et la ligne suivante lui en sert un.

### 4.5 `cp-r1-himalaya` — la sonde doit changer d'objet, pas disparaître

**Le problème :** l'étape 5 de la scène règle par la donnée la question que la
sonde pose (« l'Himalaya a-t-il des séismes profonds ? »). Laissée telle quelle,
la sonde devient un test de mémoire à trente secondes d'intervalle.

**La réparation, sans casser quoi que ce soit :** la scène règle la
**sismicité** ; elle **ne dit rien du volcanisme himalayen** (§3.4 point 1). La
sonde garde donc sa place (fin de R1, avant que R2 réponde), sa
`primary_misconception` (`subduction-collision-confondues`) et ses quatre
options, mais **change d'objet**.

> `stem` proposé : « Tu viens de le voir : sous l'Himalaya, aucun foyer ne
> dépasse 89 km, quand les Andes en comptent 1 927 au-delà de 100 km.
> **Engage-toi avant de lire la suite :** et le volcanisme ? L'Himalaya porte-t-il,
> comme les Andes, une chaîne de volcans actifs ? »
>
> - **A** (faux, `subduction-collision-confondues`) — « Oui : une convergence
>   implique qu'une lithosphère plonge, donc qu'elle relâche de l'eau, donc des
>   volcans. » *Retour :* conserver le retour actuel de A, en remplaçant sa
>   dernière phrase par « … et tu viens de voir qu'il n'y a là-dessous aucune
>   plaque en train de plonger. »
> - **B** (juste) — « Non : pas de volcan actif — et, tu viens de le mesurer, pas
>   de foyer profond non plus. C'est cette double absence qu'il faut expliquer. »
> - **C** (faux, `subduction-collision-confondues`) — conserver (« oui, mais
>   enfouis sous l'épaisseur de la chaîne »).
> - **D** (faux, `subduction-collision-confondues`) — conserver (« non, parce que
>   la chaîne est trop ancienne »).

Les sondes ne comptent pas dans le plancher de couverture (`coverage_summary`,
`method`) : cette retouche **ne touche aucun compteur**.

### 4.6 Ce qui ne bouge pas

- Les cinq figures, y compris `subduction-andes` (recap schématique, désormais
  **après** la scène) et sa dette de restaging déférée sur
  `enfouissement-exhumation`.
- L'exercice travaillé de R7 : son observation « tous les séismes enregistrés ont
  des foyers situés à moins de 40 kilomètres de profondeur » **concorde** avec la
  mesure himalayenne (médiane 10 km, 90 % sous 36 km). Rien à corriger ; à noter
  comme cohérence acquise.
- Les cinq misconceptions déclarées et les dix items existants : **inchangés**.

---

## 5. La scène : registre, contrôles, lectures

### 5.1 Identité

- `slug` : **`foyers-sismiques`** · `scene` : **`foyers-sismiques`** ·
  `tool` : **`scene3d`** · `type` (taxonomie ADR 0017) : **`manipulable`**.
- Descripteur : `content/svt/chaines-de-montagnes/media/foyers-sismiques.json`.

> **Note de taxonomie — à lire avant de « corriger » la valeur de `tool`.**
> L'amendement d'ADR 0017 du 2026-07-07 a **fermé** les nouveaux embeds
> GeoGebra/Desmos (licence, vérification headless impossible, fidélité du
> vocabulaire français). ADR 0041 fait de la scène three.js de première partie le
> `manipulable` sanctionné. `tool: scene3d` est donc **délibéré**, et non une
> dérive de l'ancienne liste `geogebra/desmos/falstad/phet`.

- `title_fr` : « 3 074 séismes réels, en trois dimensions »
- `caption_fr` : « Le catalogue de l'USGS sur vingt-quatre ans, sous les Andes du
  nord du Chili, puis sous l'Himalaya. Cinq étapes : à chaque fois tu paries
  d'abord, puis tu regardes. »

**Le titre et la légende sont rendus AVANT tout pari** : ni l'un ni l'autre ne
doit contenir « plan », « incliné », « Benioff », « profondeur croissante ». La
formulation ci-dessus est calibrée pour ça.

### 5.2 Entrée de registre — `web/src/lib/scene3d/scenes.json`

```
"foyers-sismiques": {
  "temps": false,
  "controles": ["basculer", "latitude", "pendage", "ancrage", "sonde", "region"],
  "etat":      ["region", "vue", "plan", "volcans", "fenetre",
                "lat_offset", "pendage_deg", "ancrage_lon", "sonde_km"],
  "bornes":    { "lat_offset": [-3, 3], "pendage_deg": [0, 85],
                 "ancrage_lon": [-73, -70], "sonde_km": [0, 900] },
  "valeurs":   { "region":  ["andes", "himalaya"],
                 "vue":     ["carte", "coupe", "biais"],
                 "plan":    ["absent", "regle"],
                 "volcans": ["masques", "visibles"],
                 "fenetre": ["toute-la-boite", "2-degres"] },
  "lectures":  ["profil", "effectif", "profondeur_max", "nb_profonds",
                "ajustement", "ecart_median", "profil_local"]
}
```

`validate-content` échoue **en dur** sur une scène inconnue, un contrôle inconnu,
un état hors bornes, une lecture inconnue, ou un contrôle qu'aucune étape
n'ouvre : **l'entrée de registre précède le descripteur**. Chacun des six
contrôles est bien ouvert par une étape (1 : `basculer` ; 2 : `latitude` ;
3 : `pendage` + `ancrage` ; 4 : `sonde` ; 5 : `region`). `volcans` et `plan` sont
des champs d'**état seulement** — délibérément : ils sont posés par l'étape, pas
manipulés.

### 5.3 Les six contrôles

| Contrôle | Écrit | Forme, bornes, pas | Ouvert à |
|---|---|---|---|
| `basculer` | `vue` | bascule à deux positions : **carte** ↔ **coupe**. La bascule joue une rotation de caméra calme (≈1,2 s, sans rebond ; coupure immédiate sous `prefers-reduced-motion`). | 1 |
| `latitude` | `fenetre`, `lat_offset` | case « toute la boîte » + curseur de centre de fenêtre, **−3° à +3°** autour du centre de la boîte, **pas 0,5°**, fenêtre large de **2°** (≈220 km). | 2 |
| `pendage` | `pendage_deg` | curseur **0° à 85°**, **pas 1°**. | 3 |
| `ancrage` | `ancrage_lon` | curseur — « où le plan sort à la surface » — **−73,0° à −70,0°**, **pas 0,1°** (≈10 km). | 3 |
| `sonde` | `sonde_km` | curseur de distance à la fosse, **0 à 900 km**, **pas 10 km**. | 4 |
| `region` | `region` | bascule **Andes** ↔ **Himalaya**. | 5 |

**Vues prédéfinies** (`VuesBloc`, équivalent clavier du glisser) : `carte` (du
dessus, **caméra orthographique**), `coupe` (le long de la fosse pour les Andes,
le long de la chaîne pour l'Himalaya ; **orthographique**), `biais` (oblique,
élévation 35°). **Deux étapes bornent ce bloc** — voir §7.

**Pourquoi ces bornes et ces pas (ADR 0041 §5 : la précision est un choix
pédagogique).**
- `pendage_deg` **jusqu'à 85°** : parce qu'un des paris de l'étape 3 est « la
  plaque plonge presque à la verticale ». Un curseur qui s'arrêterait à 60°
  empêcherait l'élève de **voir son propre modèle échouer** — or c'est la seule
  façon de le casser (ADR 0041 §6 : une misconception ne se sert que sur SA
  conséquence).
- `pendage_deg` **au pas de 1°** : la mesure vaut 23°. Au pas de 5°, une plage
  d'angles cocherait la même condition — la faute exacte du curseur à 0,1 h de
  l'orbite géostationnaire.
- `ancrage_lon` **au pas de 0,1°** : assez fin pour atteindre −71,5 exactement,
  assez grossier pour ne pas suggérer qu'on connaît la fosse au kilomètre.
- `sonde_km` **au pas de 10 km** : l'arc volcanique est large de 180 km ; une
  sonde au kilomètre afficherait une précision que l'objet n'a pas.

### 5.4 Les sept lectures — définitions exactes et précision affichée

Toutes les lectures sont **post-pari** (§7). Chacune est une ligne de fiche
(grammaire `ResultRow`).

| Lecture | Définition exacte | Précision affichée | Pourquoi cette précision |
|---|---|---|---|
| `profil` | Tableau : pour chaque bande de **100 km** de distance à la fosse, la **médiane** des profondeurs des foyers de la bande, et leur nombre. Neuf lignes ; les deux dernières (721 km et 824 km) sont **séparées visuellement** et étiquetées « hors du plan » (§8). | **1 km**, **jamais arrondi à la dizaine ni « classé »** | Un affichage par paliers de 100 km rendrait 17→0, 101→100, 114→100 : un escalier, c'est-à-dire l'image même de la misconception « les séismes sont dans une couche ». La précision au kilomètre est ce qui rend la **pente** lisible. |
| `effectif` | Nombre de foyers **actuellement affichés** (fenêtre de latitude et région comprises), et le total de la région. | entier | — |
| `profondeur_max` | Profondeur du foyer le plus profond de la région affichée. | **1 km** (602 · 89) | Deux nombres qui doivent pouvoir être cités tels quels dans une copie. |
| `nb_profonds` | Nombre de foyers de **plus de 100 km** de profondeur. | entier (1 927 · 0) | Le contraste le plus net de toute la notion. |
| `ajustement` | **Part des foyers de la population principale situés à moins de 25 km du plan réglé**, distance mesurée **perpendiculairement au plan**. Population principale = profondeur ≤ 350 km **et** non (distance à la fosse > 650 km **et** profondeur < 40 km). La définition est **imprimée sous la lecture**, pas cachée. | **% entier**, avec une ligne de condition « > 80 % » en texte + glyphe ✓/✗ | Un chiffre à la décimale ferait croire à une précision de mesure ; le point de la lecture est de franchir un seuil, pas de faire un classement. |
| `ecart_median` | Médiane des distances perpendiculaires au plan réglé, même population. | **1 km** (11 km au meilleur réglage) | Confirme la lecture précédente par une autre grandeur. |
| `profil_local` | À la distance de la sonde : (a) profondeur du **plan réglé**, (b) profondeur **médiane des foyers réels** de la bande (± 50 km), (c) **nombre de volcans** dans la bande. | **10 km** pour (a) et (b) ; entier pour (c) | Même raison que le pas de la sonde : la bande fait 100 km de large, le kilomètre y serait faux. |

**Le seuil de 80 % est provisoire et se tranche sur la mesure.** On sait que la
valeur au meilleur réglage est strictement entre 80 % et 90 %. Si la mesure
montre qu'une **plage large** de pendages franchit 80 %, le seuil monte jusqu'à
ce qu'une fenêtre étroite (± 3°) le franchisse seule — décision ADR 0041 §5,
prise sur le chiffre, pas avant.

---

## 6. Les cinq étapes

> **Contrat de pari (ADR 0041 §6 + addendum du soir).** Avant l'engagement,
> **RIEN ne répond** : ni le contrôle de l'étape, ni la fiche de lectures, ni le
> verdict, ni un dessin qui montre l'issue, ni une **vue** qui la montre, ni la
> description lue au lecteur d'écran. Ce qui reste visible, c'est l'**énoncé** :
> la scène telle que l'étape la pose. Le §7 en fait une liste par étape, et cette
> liste **est** la porte.

> **Le pari écrit l'état.** Aux étapes 3 et 5, la réponse choisie par l'élève
> **initialise le réglage** au moment de la révélation : celui qui parie 80°
> voit **son** plan de 80° traverser le vide. C'est un comportement neuf par
> rapport aux cinq scènes existantes → §11.3. Repli si le coût est trop élevé :
> le plan apparaît à 45° et la `suite` le dit.

### Étape 1 — `carte` · « 3 074 séismes, vus du dessus »

- `etat` : `{ region: "andes", vue: "carte", plan: "absent", volcans: "masques", fenetre: "toute-la-boite", lat_offset: 0, pendage_deg: 45, ancrage_lon: -71.5, sonde_km: 300 }`
  — `pendage_deg` est posé à **45** et non à 23 : aucun 23 ne doit exister nulle
  part dans l'état de la scène avant l'étape 3.
- `controles` : `["basculer"]` · `lectures` : `["effectif", "profil"]`
- `consigne` : « Voici, vus du dessus, tous les séismes de magnitude 4,5 ou plus
  enregistrés entre 2000 et 2024 sous le nord du Chili et ses voisins : 3 074
  foyers. La côte et la fosse sont tracées. Chaque point est identique aux autres
  — une carte ne dit rien de la profondeur. La vue reste bloquée à la verticale
  le temps du pari : ce serait trop facile de regarder avant de répondre. »
- `pari.question` : « Quand on s'éloigne de la fosse vers l'intérieur du
  continent, la profondeur des foyers… »
  - `augmente` — « augmente régulièrement » · **juste**
    *retour* : « Oui. 17 km près de la fosse, 255 km à 600 km de là. Et retiens
    surtout le geste : on n'a rien ajouté à l'image, on a tourné. La profondeur
    n'est pas une donnée de plus à décoder, c'est une **direction de l'espace** —
    il suffit de regarder dans le bon sens. »
  - `hasard` — « ne suit rien : les foyers sont répartis au hasard dans toute
    l'épaisseur » · faux · **`plan-de-sismicite-mal-lu`**
    *retour* : « Regarde ce que la bascule vient de montrer : les 3 074 foyers ne
    remplissent pas le volume, ils occupent une bande étroite qui descend. Un
    hasard remplirait l'image. Et la médiane par bande de 100 km monte sans une
    seule exception : 17, 27, 101, 114, 176, 200, 255 km. »
  - `sous-la-fosse` — « diminue : les foyers les plus profonds sont sous la
    fosse, là où la plaque entre » · faux · **`plan-de-sismicite-mal-lu`**
    *retour* : « C'est l'inverse, et la bascule le montre d'un coup : sous la
    fosse, la médiane vaut 17 km — les foyers les plus **superficiels** de toute
    la région. La plaque n'entre pas à la verticale ; elle glisse en biais, donc
    elle est encore près de la surface là où elle vient d'entrer. »
  - `couche` — « ne change pas : les séismes se produisent tous dans la même
    couche » · faux · **`plan-de-sismicite-mal-lu`**
    *retour* : « Une couche donnerait la même médiane partout. Elle passe de 17 km
    près de la fosse à 255 km six cents kilomètres plus loin : quinze fois plus.
    Ce n'est pas une couche, c'est une pente. »
- `suite` : « Bascule autant de fois que tu veux entre la carte et la coupe. Deux
  lignes du tableau ne suivent pas la pente : à 700 km de la fosse une médiane de
  14 km, et à 800 km une de 526 km. Elles sont vraies, elles sont dans les
  données, et on y revient à l'étape 3 — un modèle honnête dit aussi ce qu'il ne
  couvre pas. »
- **Ce que la scène montre APRÈS le pari :** la caméra bascule (≈1,2 s) de la
  carte à la coupe ; **ensuite seulement** apparaissent le verdict, le retour, la
  fiche `effectif` + `profil`, et le contrôle `basculer`.

### Étape 2 — `tranche` · « La coupe du manuel, c'est une tranche »

- `etat` : `{ region: "andes", vue: "coupe", plan: "absent", volcans: "masques", fenetre: "toute-la-boite", lat_offset: 0, pendage_deg: 45, ancrage_lon: -71.5, sonde_km: 300 }`
- `controles` : `["latitude"]` · `lectures` : `["effectif", "profil"]`
- `consigne` : « L'image que tu regardes écrase 900 kilomètres de chaîne sur une
  seule vue : du nord au sud, tous les foyers sont projetés au même endroit.
  C'est exactement ce que fait la coupe d'un manuel. Question honnête : cette
  bande existe-t-elle vraiment, ou n'est-elle que l'effet de l'écrasement ? »
- `pari.question` : « Si on ne garde qu'une tranche de 2° de latitude — 220 km de
  chaîne au lieu de 900 — la bande… »
  - `demeure` — « reste la même, avec moins de foyers : chaque tranche montre la
    même pente » · **juste**
    *retour* : « Oui, et c'est ce qui autorise le mot **plan**. Une ligne
    n'existerait que dans une coupe ; ici la même pente revient dans chaque
    tranche, du nord au sud — une surface inclinée qui suit toute la fosse. Ta
    coupe de manuel dessine cette surface sans pouvoir la montrer : elle n'en
    voit qu'une tranche. »
  - `disparait` — « disparaît : dans une seule tranche les foyers sont dispersés,
    la bande n'était qu'un effet de projection » · faux ·
    **`plan-de-sismicite-mal-lu`**
    *retour* : « Fais glisser la fenêtre du nord au sud : à chaque position, la
    même bande, au même endroit, avec la même pente. Ce qui change, c'est le
    nombre de foyers, pas leur géométrie. Une bande qui survit à chaque tranche
    n'est pas un effet de projection : c'est un objet, et cet objet a deux
    dimensions. »
  - `morcelee` — « ne subsiste que par endroits : quelques tranches portent des
    foyers, les autres non » · faux · *non étiqueté* (§10.3)
    *retour* : « Parcours la fenêtre d'un bout à l'autre : aucune position ne se
    vide. La sismicité de cette marge est continue sur les 900 km de la boîte —
    c'est d'ailleurs ce qui autorise à parler d'**une** chaîne, et non d'une
    série d'accidents. »
- `suite` : « Promène la fenêtre du nord au sud, puis reviens à la boîte entière.
  Retiens le geste : une coupe est une **tranche**, pas un dessin — et une
  tranche ne vaut que si les voisines lui ressemblent. »

### Étape 3 — `pendage` · « Trace le plan toi-même »

- `etat` : `{ region: "andes", vue: "coupe", plan: "absent", volcans: "masques", fenetre: "toute-la-boite", lat_offset: 0, pendage_deg: 45, ancrage_lon: -73.0, sonde_km: 300 }`
  — l'ancrage part à **−73,0°**, soit 155 km à l'ouest de la fosse : il y a deux
  choses à trouver, pas une.
- `controles` : `["pendage", "ancrage"]` · `lectures` : `["ajustement", "ecart_median"]`
- `consigne` : « À toi de tracer. Tu disposes d'un plan dont tu règles deux
  choses : son **inclinaison**, et l'endroit où il **sort à la surface**.
  L'objectif est écrit : faire passer ce plan par les foyers, et le lire — la
  part des foyers qui en sont à moins de 25 kilomètres. Avant de toucher aux
  réglages, engage-toi sur l'inclinaison. »
- `pari.question` : « Quelle inclinaison fera passer le plan par la bande de
  foyers ? »
  - `vingt-trois` — « environ 23° » · **juste**
    *retour* : « Oui. Règle 23°, puis fais glisser la sortie du plan jusqu'à la
    fosse : la lecture franchit 80 %. Huit foyers sur dix à moins de 25 km d'un
    **seul** plan, dans une région de 1 200 km sur 900. La preuve n'est pas le
    dessin : c'est le chiffre. »
  - `dix` — « environ 10°, presque à plat sous le continent » · faux ·
    *non étiqueté*
    *retour* : « Essaie. À 10°, le plan est à 70 km de profondeur à 400 km de la
    fosse, là où la médiane mesurée vaut 176 km : il passe trop haut, et la
    lecture le dit. »
  - `quarante-cinq` — « environ 45° » · faux · *non étiqueté*
    *retour* : « C'est l'angle que dessinent la plupart des schémas — y compris
    celui de cette leçon, un peu plus bas. Un schéma redresse la plaque pour la
    faire tenir dans le cadre. Cette scène, elle, n'exagère rien : l'échelle
    verticale y est **la même** que l'horizontale, et l'angle que tu lis à
    l'écran est l'angle réel. Règle 45° et regarde la lecture tomber. »
  - `vertical` — « environ 80° : la plaque s'enfonce presque à la verticale sous
    la fosse » · faux · **`plan-de-sismicite-mal-lu`**
    *retour* : « Règle 80° et regarde : le plan tombe comme un mur sous la fosse
    et ne rencontre presque rien. Surtout, regarde la carte de l'étape 1 : une
    plaque verticale aurait tous ses foyers au **même endroit** sur la carte. Ils
    s'étalent sur 600 km vers l'intérieur — et c'est la pente, elle seule, qui
    explique cet étalement. »
- `suite` : « Cherche le meilleur réglage : tu dois dépasser 80 %. Puis remarque
  **où** le plan doit sortir à la surface pour que ça marche : à la fosse, et
  nulle part ailleurs — ce n'est pas un hasard, c'est là que la plaque entre.
  Deux groupes de foyers restent en gris : ils ne sont pas comptés dans la
  lecture (profondeur supérieure à 350 km ; foyers superficiels à plus de 650 km
  de la fosse). Ils existent, ils sont affichés, et ce plan-là ne prétend pas les
  expliquer. »
- **Ce que la scène montre après :** le plan apparaît **à l'inclinaison pariée**,
  ancré à −73,0 ; les deux groupes exclus passent en gris atténué ; la fiche
  affiche `ajustement` (avec sa définition imprimée) et `ecart_median`, et la
  ligne de condition « > 80 % » avec son glyphe.

### Étape 4 — `volcans` · « Pourquoi les volcans sont là, et pas ailleurs »

- `etat` : `{ region: "andes", vue: "carte", plan: "regle", volcans: "visibles", fenetre: "toute-la-boite", lat_offset: 0, pendage_deg: 23, ancrage_lon: -71.5, sonde_km: 300 }`
  — le plan est acquis (`regle`) mais **n'est pas dessiné en vue carte** (§11.2) :
  un plan vu du dessus n'est qu'une bande sans signification.
- `controles` : `["sonde"]` · `lectures` : `["profil_local"]`
- `consigne` : « Sur la carte, 41 volcans actifs depuis l'Holocène, relevés par
  la NOAA dans la même boîte. Ils forment une ligne parallèle à la fosse, entre
  240 et 420 kilomètres d'elle. Tu connais maintenant le plan des foyers — et la
  vue est de nouveau bloquée à la verticale le temps du pari. »
- `pari.question` : « À l'aplomb de cette ligne de volcans, à quelle profondeur
  passe le plan des foyers ? »
  - `cent` — « entre 100 et 200 km » · **juste**
    *retour* : « Oui : sous l'alignement, la profondeur médiane des foyers vaut
    116 km, 126 km puis 192 km selon l'endroit, et le plan réglé les suit. C'est
    la profondeur à laquelle la plaque, réchauffée, relâche l'eau qu'elle
    transportait — et l'eau, en abaissant le seuil de fusion du manteau situé
    au-dessus d'elle, y déclenche une fusion partielle. Les volcans ne sont pas
    décalés au hasard : ils sont là où le plan atteint cette profondeur. Le
    mécanisme, tu le lis juste après. »
  - `croute` — « une vingtaine de kilomètres, juste sous la croûte » · faux ·
    **`plan-de-sismicite-mal-lu`**
    *retour* : « Promène la sonde : le plan n'est à 20 km qu'à une cinquantaine
    de kilomètres de la fosse — au fond de l'océan, là où il n'y a aucun volcan.
    Fais le calcul dans l'autre sens : à 23°, la profondeur de 100 km est
    atteinte à 235 km de la fosse, et le premier volcan est à 240 km. »
  - `profond` — « plus de 500 km : la plaque fond quand elle est le plus
    profonde » · faux · *non étiqueté*
    *retour* : « Le plan réglé n'atteint jamais 500 km dans cette boîte : à 23°,
    il faudrait dépasser 1 100 km de la fosse. Les seuls foyers à 500-600 km
    forment un groupe isolé, à 800 km de la fosse, nettement **sous** le plan et
    séparé de lui par un intervalle presque vide — et là non plus, aucun volcan.
    La fusion ne suit pas la profondeur maximale : elle suit la profondeur à
    laquelle la plaque se déshydrate. »
- `suite` : « Promène la sonde de la fosse vers l'intérieur du continent. Elle
  affiche, pour chaque distance, la profondeur du plan **et** la profondeur
  médiane des foyers réellement mesurés dans la bande. Les deux se suivent : c'est
  le même objet, vu de deux façons. »
- **Ce que la scène montre après :** la caméra bascule en vue coupe ; des traits
  verticaux descendent des volcans jusqu'au plan ; `profil_local` s'affiche.

### Étape 5 — `himalaya` · « La même mesure, sur l'Himalaya »

- `etat` : `{ region: "himalaya", vue: "carte", plan: "absent", volcans: "masques", fenetre: "toute-la-boite", lat_offset: 0, pendage_deg: 23, ancrage_lon: -71.5, sonde_km: 300 }`
  — `plan: absent` : un plan ajusté sur les Andes n'a aucun sens au Népal, et
  l'afficher serait une réponse avant le pari.
- `controles` : `["region"]` · `lectures` : `["effectif", "profondeur_max", "nb_profonds"]`
- `consigne` : « Même catalogue, mêmes critères — magnitude 4,5 ou plus, de 2000
  à 2024 — dans une boîte de taille comparable posée sur l'Himalaya, au Népal :
  400 foyers. Rien d'autre n'a changé que la région. La vue est bloquée à la
  verticale le temps du pari. »
- `pari.question` : « Le foyer le plus profond de cette boîte se trouve à… »
  - `cent` — « moins de 100 km : aucun foyer profond » · **juste**
    *retour* : « Oui : 89 km au maximum, une médiane de 10 km, 90 % des foyers
    au-dessus de 36 km. Bascule et regarde : une mince couche superficielle,
    aucune bande inclinée. Les deux régions ont été traitées avec le même
    catalogue et les mêmes critères — la différence n'est pas dans la méthode,
    elle est dans le sous-sol. »
  - `six-cents` — « environ 600 km, comme aux Andes : c'est aussi une
    convergence, donc aussi une plongée » · faux ·
    **`subduction-collision-confondues`**
    *retour* : « Bascule : il n'y a pas de bande. 89 km au maximum, et pas un
    seul foyer au-delà de 100 km — contre 1 927 aux Andes. Convergence, il y en a
    bien une, et elle est toujours active : ce qui manque, c'est la plaque
    **océanique** qui plongeait. Deux plaques continentales ne s'enfoncent pas. »
  - `trois-cents` — « environ 300 km : la plongée y est plus ancienne, donc moins
    profonde » · faux · **`subduction-collision-confondues`**
    *retour* : « Il n'y a pas de demi-plongée. 89 km au maximum, 90 % des foyers
    au-dessus de 36 km : la sismicité himalayenne est **entièrement**
    superficielle. Ce n'est pas une subduction affaiblie par l'âge, c'est un
    autre mécanisme — et le chapitre suivant dit lequel. »
- `suite` : « Fais l'aller-retour entre les deux régions : 602 km contre 89 km,
  1 927 foyers profonds contre 0. Et une honnêteté de lecture, utile à
  l'épreuve : dans la boîte himalayenne, beaucoup de foyers sont donnés à
  **exactement 10,0 km**. C'est la valeur **par défaut** du catalogue quand la
  profondeur est mal contrainte — pas une mesure. Ça ne change rien à la
  conclusion, puisque aucun foyer ne dépasse 89 km ; mais un alignement parfait
  sur une profondeur ronde doit toujours te faire vérifier si tu lis une mesure
  ou une convention. »

---

## 7. Ce qui ne doit PAS être à l'écran avant chaque pari

**Cette liste est le cahier des charges de la famille `avant-pari` de la porte
(§11.4).** Elle applique le §6 d'ADR 0041 et son addendum du soir : tout ce qui
dépend de l'ISSUE attend la révélation ; ne reste visible que l'énoncé.

**Interdits sur toute la scène, à tout moment (pas seulement avant les paris) :**
- **Aucune couleur par profondeur, aucune échelle de couleurs, aucune taille de
  point variable.** Décision de principe : dans cette scène, la profondeur est une
  **position**, jamais une légende à décoder. Elle rend le contrat d'avant-pari
  trivial à tenir et elle est le cœur de l'argument (§2 a).
- Aucune exagération verticale : échelle verticale = échelle horizontale.
- Aucun brouillard de profondeur, aucune ombre, aucune opacité variable avec la
  distance à la caméra — trois façons de faire fuiter la profondeur en vue carte.
- La caméra de la vue `carte` est **orthographique** : en perspective, la
  parallaxe trahit la profondeur.

| Étape | Doit être ABSENT avant le pari | Reste visible (l'énoncé) |
|---|---|---|
| **1** | toute lecture ; le plan ; les volcans ; le tableau `profil` ; le mot « profondeur » assorti d'un nombre ; **les vues `coupe` et `biais`** (`VuesBloc` ne propose que `carte`) ; **le glisser libre** (élévation verrouillée à 90°) ; le contrôle `basculer` ; le verdict et les retours ; toute description d'écran mentionnant une inclinaison | la carte orthographique, la côte, la fosse tracée et nommée, 3 074 points identiques, la consigne |
| **2** | toute lecture ; le contrôle `latitude` ; tout surlignage d'une tranche ; toute enveloppe, bande ou trait dessiné autour des foyers ; toute mention d'épaisseur ; le plan | la vue coupe telle que l'étape 1 l'a laissée, avec l'ensemble des foyers |
| **3** | **le plan, sous toute forme** — y compris un plan « d'exemple », un plan ajusté, une droite de tendance ou un repère d'angle ; toute marque, crantage ou couleur sur le curseur de pendage désignant une valeur ; les lectures `ajustement` et `ecart_median` ; l'atténuation en gris des deux groupes exclus ; les contrôles | la coupe, les foyers, la consigne qui annonce l'objectif chiffré |
| **4** | les traits verticaux volcans→plan ; `profil_local` ; le plan **dessiné** ; la vue `coupe` et le glisser libre (**élévation reverrouillée à 90°**) ; toute mention de 100-200 km ; le contrôle `sonde` | la carte, la fosse, les 41 volcans posés en surface, la consigne (qui donne la distance des volcans à la fosse — c'est un fait de surface, déjà dans la leçon) |
| **5** | `profondeur_max` ; `nb_profonds` ; la vue `coupe` et le glisser libre (**élévation reverrouillée à 90°**) ; le contrôle `region` ; toute comparaison chiffrée avec les Andes | la carte du Népal, ses 400 points identiques, la consigne (qui donne l'effectif — un comptage, pas une profondeur) |

**Le verrouillage de la vue est assumé à voix haute**, pas subi : les consignes 1,
4 et 5 le disent (« la vue est bloquée à la verticale le temps du pari : ce serait
trop facile de regarder avant de répondre »). C'est une règle qui **enseigne** —
prédire avant de voir est le geste que la scène entraîne.

---

## 8. Les lignes d'honnêteté — ce que la scène dit des données

### 8.1 Source, toujours à l'écran (pied du plateau, pas une infobulle)

> « Séismes : catalogue **USGS ComCat**, magnitude ≥ 4,5, du 1ᵉʳ janvier 2000 au
> 1ᵉʳ janvier 2024. **Andes** : boîte 26°S-18°S / 74°O-62°O, **3 074 foyers**. ·
> **Himalaya** : boîte 26°N-31°N / 80°E-89°E, **400 foyers**. Volcans : **NOAA
> NCEI**, 41 volcans de l'Holocène. Côtes : **Natural Earth**. Données publiques. »

### 8.2 Le seuil de magnitude (dans la légende, une phrase)

> « Pourquoi M ≥ 4,5 ? Les séismes plus petits existent — beaucoup plus nombreux
> — mais ils sont moins bien localisés et le catalogue en manque davantage loin
> des stations. Ce seuil n'est pas un choix de mise en scène : c'est ce qui rend
> les deux régions **comparables**. »

### 8.3 Les deux populations qui ne sont pas sur le plan (étape 1 `suite`, puis étape 3)

Elles sont **affichées, comptées et nommées**, jamais retirées.

- **Foyers superficiels loin de la fosse** (≈ 721 km, médiane 14 km) :
  > « Ce sont des séismes de la **croûte continentale** en train d'être
  > raccourcie — ceux d'une chaîne qui se plisse et se chevauche, chapitres 5 et
  > 6. Ils ne sont pas sur le plan de la plaque plongeante, et c'est normal : ils
  > n'ont pas la même cause. »
  (Aucun nom de structure andine, aucune tectonique d'arrière-arc : **une** phrase.)
- **Groupe profond isolé** (≈ 824 km, 46 foyers entre 500 et 600 km, séparé de la
  bande par un intervalle de ≈ 200 km presque vide) :
  > « Quarante-six foyers, entre 500 et 600 kilomètres, séparés du reste par un
  > intervalle presque vide. Ils sont réels. Le modèle du plan unique **ne les
  > explique pas**, et l'explication de leur profondeur dépasse le programme de
  > terminale. Un modèle qui dit ce qu'il ne couvre pas vaut mieux qu'un modèle
  > qui fait semblant de tout couvrir. »

Leur **exclusion du calcul** de `ajustement` est imprimée sous la lecture
elle-même, en toutes lettres (§5.4), et ils sont visuellement atténués — **pas
masqués** — à partir de l'étape 3.

### 8.4 Le plan unique est un modèle (légende, champ `fit_caveat`)

> « Le vrai panneau plongeant est plus plat près de la fosse et plus raide
> au-delà de 100 km. Un **plan unique** est le modèle du programme : il rend
> compte de huit foyers sur dix à moins de 25 km, et c'est ce qu'on lui demande.
> La fosse elle-même est représentée par un méridien (71,5°O) : la fosse réelle
> n'est pas rectiligne — c'est cette simplification qui permet de parler d'une
> **distance à la fosse**. »

### 8.5 Les profondeurs à 10,0 km du catalogue himalayen (étape 5 `suite`)

Texte au §6, étape 5. **Le comptage doit être mesuré au build** (§3.4 point 2) ;
sans mesure, la phrase reste qualitative et ne cite aucun nombre.

### 8.6 L'échelle et l'angle

> « L'échelle verticale est la même que l'horizontale : le pendage que tu lis à
> l'écran est le pendage réel. » (Et la porte le vérifie **en pixels** — §11.4.)

---

## 9. La frontière — ce que la scène ne fera ni ne dira jamais

Tirée des `limites` et `exclusions` du §1.3, plus les frontières de bon sens.

1. **Aucune tomographie mantellique**, aucune image de vitesse sismique, aucune
   coupe de manteau : la scène montre des **foyers**, pas une plaque imagée.
2. **Aucun diagramme de phase, aucune courbe de solidus, aucun pourcentage de
   fusion.** Le lien eau → abaissement du seuil de fusion tient en **une phrase**
   qualitative, celle du retour juste de l'étape 4, identique à `lesson.md` l. 42.
3. **Aucune dynamique** : ni slab-pull, ni ridge-push, ni force, ni vitesse de
   plaque, ni convection chiffrée. La scène ne dit pas **pourquoi** la plaque
   plonge ; elle montre **qu'elle** plonge, et où.
4. **Aucune explication du groupe profond 500-600 km** (il faudrait la stagnation
   du panneau ou une transition de phase) : il est nommé, compté, et laissé
   ouvert (§8.3).
5. **Aucune obduction** — le cadre porte lui-même ce point comme « À CONFIRMER ».
6. **Aucune trigonométrie.** Le pendage se **règle** sur un curseur et se lit ; il
   ne se calcule jamais par une tangente. Le seul calcul demandé à l'élève, dans
   les items, est une **division** (profondeur gagnée par 100 km).
7. **Aucun mécanisme au foyer**, aucune solution de plan de faille, aucune
   orientation de contrainte, aucune magnitude autre que le seuil de sélection.
8. **Aucun aléa, aucune prévision, aucun risque sismique.**
9. **Aucune structure andine nommée** au-delà de la fosse, de la plaque de Nazca
   et de la plaque sud-américaine déjà présentes dans la leçon.
10. **Aucune affirmation sur les volcans himalayens** tant que la mesure du §3.4
    point 1 n'est pas faite.
11. **Aucun mot de la granitisation, de l'anatexie, des faciès métamorphiques ou
    de la pression de confinement** : chapitre suivant du cadre.
12. **Aucune date, aucune datation**, aucune histoire de l'ouverture de la Téthys :
    R2 et R6 s'en chargent.

---

## 10. Misconception nouvelle et items de banc

### 10.1 Pourquoi les cinq déclarées ne suffisent pas

L'erreur que cette scène casse — *les foyers ne disent rien de la géométrie de la
plaque* — n'est décrite par aucune des cinq familles de `items.yaml` :
`subduction-collision-confondues` porte la confusion entre deux **types de
chaînes** (et sert légitimement l'étape 5) ; `roche-mal-identifiee`,
`deformation-mal-interpretee` et `pression-metamorphique-mal-situee` portent des
objets pétrographiques et structuraux ; `histoire-de-la-chaine-mal-reconstituee`
porte le refus de lire une **trajectoire de roche**, pas la lecture d'un **champ
de données géophysiques**. Étiqueter les paris des étapes 1 à 4 sous l'une
d'elles serait exactement le défaut que la revue du 2026-09-19 reproche déjà à
`CDM-10 C` : une étiquette qui ne décrit pas l'erreur réellement encodée.

### 10.2 La misconception à déclarer

```yaml
- id: mc.svt.svt_chaines_montagnes.plan-de-sismicite-mal-lu
  label: "« Les foyers sismiques ne dessinent aucune géométrie » — dispersés au
    hasard, tous à la même profondeur, les plus profonds sous la fosse, et les
    volcans à l'aplomb de celle-ci"
  description: >
    Devant une carte, une coupe ou un profil de sismicité, l'élève ne cherche
    pas de géométrie : il lit une liste de séismes au lieu d'une surface. Quatre
    manifestations, toutes issues du même modèle — une plaque qui plongerait à
    la verticale, ou pas du tout : (1) les foyers seraient répartis au hasard ;
    (2) ils seraient tous dans une même couche, à profondeur constante ; (3) les
    plus profonds seraient sous la fosse, là où la plaque entre ; (4) les volcans
    seraient à l'aplomb de la fosse, ou au-dessus des foyers les plus profonds.
  contradicts_principle: >
    Les foyers d'une zone de subduction s'alignent sur un PLAN incliné — le plan
    de Wadati-Benioff : sous le nord du Chili, la profondeur médiane passe de
    17 km près de la fosse à 255 km six cents kilomètres plus loin, soit environ
    40 km gagnés tous les 100 km, et huit foyers sur dix sont à moins de 25 km
    d'un plan unique incliné de 23°. C'est cette pente, et non une plongée
    verticale, qui étale les foyers sur des centaines de kilomètres — et c'est
    elle qui place les volcans à 240-420 km de la fosse, là où le plan atteint
    100 à 200 km, la profondeur à laquelle la plaque se déshydrate.
```

**Conséquence de gabarit :** l'id doit être **déclaré avant** que le descripteur
de la scène ne le cite (les étiquettes non déclarées entrent telles quelles dans
le modèle apprenant — `validate-content` l. 434-498, échec dur). Ordre de
construction au §12.

### 10.3 Choix de paris laissés SANS étiquette, et pourquoi

Trois mauvais choix ne portent aucune misconception : `morcelee` (étape 2),
`dix` et `quarante-cinq` (étape 3), `profond` (étape 4). Ce ne sont pas des
modèles du registre — ce sont des **sondes de conséquence** (un écart numérique,
ou la confiance au schéma plutôt qu'à la donnée). Les ranger sous la famille
nouvelle lui ferait porter deux mécanismes à la fois, exactement le défaut que la
revue reproche à `CDM-7 C`. Le validateur n'exige pas d'étiquette sur un mauvais
choix (il exige un `retour`) ; le corpus existant fait de même (`sphere-plan.json`).

> **À surveiller :** `quarante-cinq` encode « se fier au schéma plutôt qu'aux
> données », voisin de `perspective-fiable` du registre de `geometrie-espace`. Si
> ce modèle réapparaît ailleurs en SVT, c'est une famille à déclarer — pas
> maintenant, sur un seul cas.

### 10.4 Les quatre items de banc — **specs pour item-author**

Plancher du produit : **≥ 3 items** par misconception avant que son compte soit
porteur de confiance. Quatre sont spécifiés, pour une **marge de 1** : la revue
note que quatre familles sur cinq siègent déjà **exactement** à 3, « la marge est
nulle et tout retrait d'item la casse ».

Format commun : `type: mcq`, `skill_code: svt_chaines_montagnes`, quatre choix,
un `feedback` par distracteur **qui casse le modèle sur sa propre conséquence**,
et un bloc `solution` en trois temps comme les dix items existants.

---

#### **CDM-11** — *la marche d'entrée* — `rung: R1` · `difficulty_level: 1` · `habilete: comprehension`
`tags: [seismes, carte, profondeur, lecture_de_document]`

> **Motif :** la SVT ne porte **aucun item de niveau 1 sur 102** (audit §1) alors
> que les trois autres matières en ont 8,5 à 9 %. C'est la marche d'entrée qui
> manque, et la VISION promet l'élève **en difficulté**. Cet item est
> délibérément facile.

- **Énoncé.** « Sur une carte de sismicité, tous les séismes d'une région de
  subduction sont représentés par des points **identiques**. Un élève regarde
  cette carte et conclut : “les foyers sont dispersés au hasard.” Qu'est-ce qui
  ne va pas dans ce raisonnement ? »
- **Clé (A).** « Une carte est vue **du dessus** : elle ne montre pas la
  profondeur. Pour savoir si les foyers ont une géométrie, il faut une **coupe**,
  perpendiculaire à la fosse — c'est là qu'apparaît, ou non, une organisation. »
- **B** — « Rien : des points sans motif visible signifient bien que les séismes
  se produisent au hasard. » → `plan-de-sismicite-mal-lu`. *Feedback :* la carte
  ne montre que deux des trois dimensions ; conclure du dessin plat qu'il n'y a
  pas d'organisation, c'est conclure de ce qu'on n'a pas regardé.
- **C** — « Il faudrait davantage de séismes : avec 3 000 points au lieu de
  quelques dizaines, l'organisation apparaîtrait sur la carte. » →
  `plan-de-sismicite-mal-lu`. *Feedback :* avec 3 074 points, la carte reste une
  tache — ce n'est pas une question de nombre, c'est la **dimension manquante**.
- **D** — « Il faudrait colorer les points selon leur **magnitude**. » → *non
  étiqueté* (confusion de grandeur, pas un modèle du registre). *Feedback :* la
  magnitude dit l'énergie libérée, pas l'endroit ; c'est la **profondeur** qui
  porte la géométrie.

---

#### **CDM-12** — *lecture de profil, le cœur* — `rung: R1` · `difficulty_level: 3` · `habilete: application`
`tags: [profil_sismique, wadati_benioff, pendage, lecture_de_document]`

> **Document réel, obligatoire dans l'énoncé** (données du §3.1, USGS ComCat,
> M ≥ 4,5, 2000-2024, nord du Chili) :
>
> | Distance à la fosse (km) | 0 | 100 | 200 | 300 | 400 | 500 | 600 |
> |---|---|---|---|---|---|---|---|
> | Profondeur médiane des foyers (km) | 17 | 27 | 101 | 114 | 176 | 200 | 255 |

- **Énoncé.** « Le tableau donne, pour une coupe perpendiculaire à la fosse du
  Chili, la profondeur médiane des foyers sismiques en fonction de la distance à
  la fosse. **Que peut-on en déduire, et combien de kilomètres de profondeur les
  foyers gagnent-ils en moyenne tous les 100 km parcourus vers le continent ?** »
- **Clé (A).** « Les foyers s'enfoncent régulièrement vers le continent — environ
  **40 km de profondeur gagnés tous les 100 km** (255 − 17 = 238 km gagnés sur
  600 km). Ils dessinent un **plan incliné**, le plan de Wadati-Benioff, qui
  matérialise la plaque océanique en train de plonger. »
- **B** — « Les foyers sont répartis au hasard : les valeurs 101 puis 114
  montrent qu'il n'y a aucune régularité. » → `plan-de-sismicite-mal-lu`.
  *Feedback :* deux valeurs proches ne cassent pas une tendance qui va de 17 à
  255 km **sans jamais redescendre**. Un hasard donnerait des médianes qui montent
  et descendent ; ici elles ne font que monter, sur 600 km.
- **C** — « Environ **4 km** gagnés tous les 100 km : la profondeur augmente,
  mais si peu que la plaque est quasiment horizontale. » → *non étiqueté* (erreur
  d'un facteur 10 dans la division). *Feedback :* 238 km divisés par 600 km font
  0,4 km par kilomètre, donc **40 km** par 100 km — vérifie l'ordre de grandeur
  sur la dernière colonne : 255 km sous 600 km, ce n'est pas « quasiment
  horizontal ».
- **D** — « Les séismes sont tous dans une même couche du manteau, dont la
  profondeur varie selon l'endroit où on la mesure. » →
  `plan-de-sismicite-mal-lu`. *Feedback :* une couche a une profondeur ; celle-ci
  est quinze fois plus grande à un bout qu'à l'autre. Ce n'est pas une couche
  dont la profondeur varie, c'est une **surface inclinée**.
- **`solution`** en trois temps : (1) le sens de variation, sans exception ;
  (2) la division 238/600 ≈ 0,4 km/km = 40 km par 100 km ; (3) l'inférence : une
  plaque **rigide** qui casse, donc encore en train de plonger aujourd'hui. On
  peut ajouter, comme honnêteté de méthode : l'ajustement sur les 3 000 foyers
  donne 23° de pendage, soit 42 km par 100 km — **deux estimations qui
  concordent**.

---

#### **CDM-13** — *la géométrie place les volcans* — `rung: R1` · `difficulty_level: 3` · `habilete: raisonnement`
`tags: [volcanisme_andesitique, fusion_partielle, geometrie_subduction]`

- **Énoncé.** « Dans les Andes du nord du Chili, les 41 volcans actifs s'alignent
  entre 240 et 420 km de la fosse. Sous cet alignement, la profondeur médiane des
  foyers vaut 116, 126 puis 192 km. Pourquoi les volcans sont-ils **là**, et pas
  à l'aplomb de la fosse ? »
- **Clé (A).** « Parce que c'est à 100-200 km de profondeur que la plaque
  plongeante, réchauffée, relâche l'eau qu'elle transportait ; cette eau abaisse
  le seuil de fusion du manteau situé au-dessus, qui fond partiellement. Avec un
  pendage d'environ 23°, cette profondeur est atteinte à 240-420 km de la fosse :
  la **géométrie du plan** décide de l'endroit. »
- **B** — « Parce que c'est à l'aplomb de la fosse que la plaque s'enfonce ; les
  volcans devraient donc s'y trouver, et leur décalage vient du magma qui migre
  latéralement sous la croûte. » → `plan-de-sismicite-mal-lu`. *Feedback :* sous
  la fosse, la plaque est à 17 km de profondeur — beaucoup trop haut pour s'être
  déshydratée. Il n'y a rien à faire migrer : la fusion ne commence qu'en
  profondeur, et cette profondeur est atteinte loin de la fosse parce que la
  plaque descend **en biais**.
- **C** — « Parce que la fusion se produit là où la plaque est la plus profonde,
  et que les foyers les plus profonds de la région sont à 500-600 km. » →
  `plan-de-sismicite-mal-lu`. *Feedback :* les foyers de 500-600 km sont à 800 km
  de la fosse, et il n'y a **aucun volcan** là-bas. Si la profondeur maximale
  déclenchait le volcanisme, l'arc y serait.
- **D** — « Parce que la croûte continentale est plus mince à cette distance, ce
  qui laisse remonter le magma. » → *non étiqueté* (explication de surface
  substituée au mécanisme profond). *Feedback :* la croûte andine est au
  contraire **épaisse** sous la cordillère. Ce n'est pas la facilité de remontée
  qui décide, c'est l'endroit où le magma est **produit**.

---

#### **CDM-14** — *le sommet : un modèle et ce qu'il ne couvre pas* — `rung: R7` · `difficulty_level: 4` · `habilete: raisonnement`
`tags: [profil_sismique, esprit_critique, lecture_de_document, wadati_benioff]`

> **Motif de rung :** l'audit §12 mesure que **11 notions SVT sur 11** portent un
> chapitre sans aucun item, « et le barreau manquant est presque toujours le
> DERNIER : le sommet, celui où l'élève devrait affronter l'épreuve ». Ici, R7
> (`ramp_coverage.R7: 0`). Cet item y met le premier.

> **Document** : le tableau de CDM-12, **complété de ses deux lignes réelles
> supplémentaires** :
>
> | Distance à la fosse (km) | … | 600 | **700** | **800** |
> |---|---|---|---|---|
> | Profondeur médiane (km) | … | 255 | **14** | **526** |
>
> avec la précision : à 800 km, 46 foyers entre 500 et 600 km, séparés du reste
> par un intervalle de 200 km presque vide.

- **Énoncé.** « Un élève a établi, à partir des sept premières colonnes, que les
  foyers dessinent un plan incliné d'environ 23°. On lui montre alors les deux
  dernières colonnes. **Ces deux valeurs invalident-elles son modèle ?** »
- **Clé (A).** « Non. Elles signalent **deux populations distinctes** : à 700 km,
  des séismes **superficiels de la croûte continentale** raccourcie, qui n'ont
  pas la même cause que ceux de la plaque plongeante ; à 800 km, un groupe
  **profond isolé**, séparé du plan par un intervalle presque vide. Le modèle du
  plan décrit la population principale, et un bon compte rendu **dit lesquelles
  il laisse dehors**. »
- **B** — « Oui : puisque deux valeurs sortent de la tendance, la profondeur ne
  suit aucune loi et le plan n'existe pas. » → `plan-de-sismicite-mal-lu`.
  *Feedback :* sept bandes sur neuf montent sans exception, et 80 % des foyers
  sont à moins de 25 km d'un plan unique. Deux populations étrangères ne
  détruisent pas une structure vérifiée sur les autres — elles s'ajoutent à elle.
- **C** — « Oui, mais on peut le sauver : il suffit d'incliner davantage le plan
  pour qu'il passe aussi par le groupe de 526 km. » → `plan-de-sismicite-mal-lu`.
  *Feedback :* un plan plus incliné cesserait de passer par les 3 000 autres
  foyers — la part à moins de 25 km s'effondrerait. Faire passer un modèle par
  **tous** les points le fait rater ceux qui comptent.
- **D** — « Non : ces deux valeurs sont des erreurs de mesure du catalogue, qu'il
  faut écarter. » → *non étiqueté* (invoquer l'erreur de mesure pour sauver un
  modèle). *Feedback :* 46 foyers cohérents entre eux, tous entre 500 et 600 km,
  ne sont pas une erreur de localisation. Écarter une donnée parce qu'elle gêne
  est le contraire d'une lecture critique : on la **garde**, et on dit que le
  modèle ne la couvre pas.

---

### 10.5 Ce que ces quatre items obligent à retourner

- `coverage_summary.per_misconception` : nouvelle entrée
  `plan-de-sismicite-mal-lu: { count: 4, items: [CDM-11, CDM-12, CDM-13, CDM-14] }`.
- `coverage_summary.total_items` : **10 → 14**.
- `coverage_summary.ramp_coverage` : R1 **1 → 4**, R7 **0 → 1**.
- `coverage_summary.honest_state` : à réécrire — cinq familles à 3 ou 4, une
  sixième à 4 ; et le commentaire « R7 : le chapitre ne porte aucun item » devient
  faux.
- La porte `web/scripts/resume-couverture.mjs` **échoue dans les deux
  directions** dès que `floor_met` ou `total_items` cesse de correspondre : la
  mise à jour n'est pas facultative.

---

## 11. Ce que la scène exige du code — frontend-builder, pas content-author

### 11.1 Données et chargement
Les quatre fichiers du §3.5, chargés par le seul `import()` dynamique de la
scène. `three@0.186.0`, version épinglée, importée au **clic** ; la preuve reste
`window.__THREE__` **à l'exécution** (ADR 0041 §2, ADR 0039).

### 11.2 Règles de rendu non négociables
1. Vue `carte` : **caméra orthographique**, élévation 90°.
2. Vue `coupe` : **orthographique**, regard le long de la fosse (Andes) ou de la
   chaîne (Himalaya) ; **aucune exagération verticale**.
3. **Le plan n'est jamais dessiné en vue `carte`.**
4. Points de foyers : **rayon constant**, **couleur unique** lue sur les jetons
   `--figure-*`, opacité constante, **aucun** encodage de profondeur.
5. Atténuation en gris des deux populations exclues : **seulement à partir de la
   révélation de l'étape 3**, jamais avant.
6. L'accent ne marque **qu'une** chose par étape (le plan à l'étape 3 ; les
   traits volcans→plan à l'étape 4).
7. Bascule de caméra : ≈1,2 s, sans rebond, **coupée** sous
   `prefers-reduced-motion` ; le verdict n'apparaît **qu'après**.
8. Plateau collant + `scroll-margin-top` sur chaque contrôle (WCAG 2.4.11,
   ADR 0041 §7), vérifié en **donnant** le focus.

### 11.3 Comportements neufs par rapport aux cinq scènes existantes
- **`VuesBloc` filtré par étape** (étapes 1, 4, 5 : la seule vue `carte` avant le
  pari). Le composant prend déjà `vues` en propriété : c'est une décision de
  panneau, **aucune modification du composant partagé**.
- **Verrouillage de l'élévation du glisser** à 90° avant les paris des étapes 1,
  4 et 5.
- **Le pari initialise un réglage** (étape 3 : `pendage_deg` = la valeur pariée).
  Repli écrit si le coût est jugé trop élevé : 45° par défaut, et la `suite` le dit.
- **Attributs de sonde** exposés pour la porte : `data-scene="foyers-sismiques"`,
  `data-vue`, `data-elevation-deg`, `data-plan`, `data-pendage-deg`,
  `data-region`. Rappel d'ADR 0041 (addendum) : **une porte trouve son panneau
  par `[data-scene="foyers-sismiques"]`, jamais par `[data-scene]` seul.**

### 11.4 La porte — `scene-foyers`, huit familles (ADR 0041 §8)
1. **`avant-pari`** — la table du §7, étape par étape : aucune lecture, aucun
   plan en pixels, `data-elevation-deg` **reste à 90** après un glisser
   programmé, **un seul** bouton de vue dans le DOM, zéro pixel **de teinte
   d'accent** — mesuré en **chrominance**, jamais en écart de luminance
   (ADR 0041, addendum du solide de révolution : 78 366 faux positifs).
2. **`carte-sans-profondeur`** — en vue carte, le nombre de **couleurs
   distinctes** des points vaut 1, et l'histogramme des tailles de tache n'a
   qu'un mode.
3. **`angle-vrai`** — en vue coupe, l'angle du plan **mesuré en pixels** vaut
   `data-pendage-deg` ± 1°, à 10°, 23° et 45°. Rouge si une exagération verticale
   est introduite. Sonde réglée sur l'**échelle** de la scène, pas sur le pixel
   (addendum du champ magnétique), et lancée à **quatre largeurs d'écran**.
4. **`nombres`** — `profil`, `effectif`, `profondeur_max`, `nb_profonds`,
   `ajustement`, `ecart_median`, `profil_local` recalculés par une **seconde
   implémentation** lisant le fichier de données (jamais le module du produit).
   Invariants d'acceptation : Andes `profondeur_max = 602`, `nb_profonds = 1 927`,
   total 3 074 ; Himalaya 400, `profondeur_max = 89`, `nb_profonds = 0` ; à
   (23°, −71,5) la part à moins de 25 km est **strictement entre 80 % et 90 %**.
5. **`maximum`** — la lecture d'ajustement est maximale au voisinage de
   (23° ± 3°, −71,5 ± 0,3°) et **s'effondre** à (23°, −73,0) et à (85°, −71,5) :
   deux directions, jamais une seule.
6. **`etapes`** — cinq étapes, un pari chacune, exactement un `juste`, un
   `retour` sur chaque choix, et chaque étiquette `misconception` **déclarée**
   dans `items.yaml`.
7. **`frontiere`** — aucun des mots interdits du §9 dans le DOM du panneau
   (tomographie, solidus, slab-pull, obduction, magnitude hors seuil, faciès,
   anatexie…). Précédent : la porte du solide de révolution garde ainsi
   l'exclusion des sommes de Riemann. Une frontière de programme tenue par la
   seule retenue de l'auteur se perd à la première retouche.
8. **`sans-webgl`** — le panneau le dit, garde les paris, les réglages, les
   nombres et le tableau `profil` ; si WebGL manque au banc, la porte sort
   **MUET, en échec, jamais en vert** (ADR 0034).

`--essai-rouge` : chaque famille doit **crier**, avec un sabotage **dans la forme
que le PRODUIT écrit** (ADR 0039), et la porte relancée plusieurs fois avant
d'être crue (ADR 0036).

### 11.5 Champs de fin de descripteur
- `boundary` : les douze points du §9, resserrés en un paragraphe.
- `fit_caveat` : le §8.4 + les pas de curseur et leur raison (§5.3).
- `fallback_note` : « Sans WebGL, le panneau le dit et garde les paris, les
  réglages, les nombres et le tableau des profondeurs médianes — c'est-à-dire le
  document lui-même. La figure `subduction-andes`, plus bas dans la leçon, en
  donne le schéma de principe. À l'impression, le panneau disparaît ; aucune
  figure ne le précède dans le chapitre, la figure de rappel vient après. »
- `pedagogy_wiring.misconceptions` : `mc.svt.svt_chaines_montagnes.plan-de-sismicite-mal-lu`
  et `mc.svt.svt_chaines_montagnes.subduction-collision-confondues`.
- `pedagogy_wiring.why_3d` : le §2, resserré en trois phrases.
- `pedagogy_wiring.predict_then_reveal` : la table du §7, résumée.
- `spec_ref` : `content/svt/chaines-de-montagnes/spec-scene-foyers.md` ·
  `adr_ref` : `docs/decisions/0041-scenes-3d-de-premiere-partie.md`.

---

## 12. Ordre de construction, et ce qui attend une décision humaine

### 12.1 Ordre imposé (chaque étape est bloquante pour la suivante)

1. **Décision du propriétaire** : lever le gel SVT pour cette notion (§4 touche
   `lesson.md` et `checkpoints.yaml`), et trancher les points du §12.2.
2. **item-author** — déclarer `plan-de-sismicite-mal-lu`, écrire CDM-11 à
   CDM-14, retourner `coverage_summary` (§10.5). *Sans cette étape, toute
   étiquette citée par la scène est une étiquette fantôme, et `validate-content`
   échoue.*
3. **Extraction des données** — les quatre fichiers du §3.5, avec les cinq
   mesures manquantes du §3.4 **faites**, pas supposées.
4. **frontend-builder** — entrée de registre (§5.2), module de rendu, panneau,
   puis la porte `scene-foyers` **verte, puis rouge** (§11.4).
5. **content-author** — le descripteur `media/foyers-sismiques.json` (§5, §6),
   le marqueur, le paragraphe d'annonce et les retouches de prose (§4).
6. **pedagogy-architect** — revue de l'ensemble contre cette spec avant remise à
   l'humain.

### 12.2 Ce que je ne tranche pas, et qui doit l'être

1. **Le gel SVT.** Les retouches de prose du §4 sont le cœur de la valeur
   pédagogique (une scène posée derrière les paragraphes qui répondent ne casse
   rien — ADR 0041 §6, rétractation). Livrer la scène **sans** elles est
   possible, mais alors la scène perd son statut de confrontation. À trancher
   explicitement, pas par défaut.
2. **Le format QCM.** Les quatre items restent des QCM alors que la géologie est
   « un fort pourvoyeur de **Partie II** » et que 108/108 items SVT sont déjà des
   QCM (revue du 2026-09-19, audit §3). Ouvrir un format de réponse construite
   dépasse cette notion : décision de corpus.
3. **`habilete` sur les items.** Aucun des dix items existants n'en porte ; les
   quatre nouveaux en proposent un. Soit on l'ajoute partout, soit on l'enlève —
   un champ porté par 4 items sur 14 ne rend le ratio 25/75 mesurable nulle part.
4. **Le seuil de 80 %** de la lecture `ajustement` : à confirmer sur la mesure
   (§5.4), c'est un choix de précision au sens d'ADR 0041 §5.
5. **Une figure figée de repli** (une coupe des foyers réels en SVG, pour le
   papier et le sans-WebGL) : **non commandée ici**. Le repli actuel s'appuie sur
   le panneau chiffré + `subduction-andes`. À décider séparément.
6. **Les dettes déjà déférées de la notion** (restaging de
   `enfouissement-exhumation`, réétiquetage de `CDM-7 C` et `CDM-10 C`,
   l'isostasie de la l. 80, « schiste bleu », l'ancrage marocain absent) restent
   **intactes et hors périmètre** : cette scène n'en répare aucune et n'en
   aggrave aucune.

### 12.3 Ce que la scène coûte, honnêtement

Une dépendance déjà payée (`three@0.186.0`, chargée au clic) ; environ 25 à 40 Ko
compressés de données, chargés eux aussi au clic et par personne qui ouvre la
scène ; une porte de plus en CI (≈3 min) ; quatre items de plus à maintenir. En
face : la première manipulation de toute la SVT, le premier geste de lecture de
document réellement exécuté dans cette notion, un item de niveau 1 et un item au
dernier barreau — c'est-à-dire quatre des cinq axes de l'audit §12 entamés sur
une notion.
