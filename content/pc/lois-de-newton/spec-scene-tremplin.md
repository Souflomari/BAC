# spec — manipulable 2D `tremplin-circulaire` (PC · `lois-de-newton`, R3)

**Statut : LIVRÉE (2026-09-25, HANDOFF §11.206)** ; les réponses par défaut du §13 ont
été appliquées, chacune reste réversible. Écrite le 2026-09-24 par pedagogy-architect,
rangée d'abord sous `docs/pipeline/propositions/` tant qu'elle n'était pas construite
(DÉCISIONS §19 : dans le dossier d'une notion, `dette-manipulable` lit toute spec comme
une PRESCRIPTION), elle a rejoint le dossier de la notion dans le commit qui livre la
scène. Les chemins qu'elle nommait existent : le descripteur
`content/pc/lois-de-newton/media/tremplin-circulaire.json`, le modèle
`web/src/lib/scene2d/tremplin-modele.ts` (et son test unitaire
`web/scripts/test-tremplin.mjs`), le rendu `web/src/lib/scene2d/tremplin-rendu.ts`, le
panneau `web/src/components/notion/scene/TremplinPanel.tsx`, la porte
`web/scripts/scene-tremplin.mjs`.

**Ce que la construction, la porte et la vague 2 ont changé à cette spec, écrit ici
plutôt que corrigé en douce :**
- **Ni flèche $\vec v$, ni témoin des vitesses** (§5.8, §6.2 les prescrivaient). En B,
  $\vec v$, $\vec u_T$ et $a_T\vec u_T$ sont COLINÉAIRES : trois flèches sur une même
  droite, dont deux à des échelles différentes, ne se lisaient pas. La vitesse est un
  NOMBRE sur la scène (le compteur du tableau de bord, « $v = 18{,}0$ », qui ne bouge
  pas pendant la course — c'est le fait de S1) ; sa direction, c'est $\vec u_T$. Deux
  échelles, deux témoins ; `echelle-constante` en vérifie deux.
- **Les lectures n'existent qu'après le pari**, comme dans les dix autres scènes.
- **`etat_revele` se pose en DEUX temps, pour une scène à course** : l'ENGAGEMENT pose
  le réglage que la question décrit (S2 : 9,0 → 18,0 m·s⁻¹ — la course doit courir dans
  ce réglage-là), sans le repère ; la RÉVÉLATION pose le repère où la course s'est
  arrêtée (B) et le DIT dans la région vivante.
- **$\vec u_N$ est à l'ENCRE** (§6.2 le voulait à l'accent) : c'est la BASE, un
  vecteur de convention ; l'accent reste à la seule réponse — l'accélération.
- **Le centre** : « centre du virage » à côté de son point quand il tombe dans le
  cadre ; sinon « centre : à 20 m » au bout du rayon coupé au bord.
- **Le plateau est carré** ; les accélérations à $0{,}0115 \times$ la largeur par
  m·s⁻² (à 0,0085, les flèches de S4 et leurs noms se serraient dans 60 px) ; B à 88 px
  du bas (une rangée d'étiquettes entre la piste et les témoins) ; 3,4 m après C
  (l'étiquette « 18° » sortait du cadre à $R = 30$ m).
- **De deux flèches colinéaires, la plus COURTE est dessinée dessus.** Toujours
  par-dessus, $\vec u_T$ et son liseré effaçaient $a_T$ tout entier aux gaz (25 px sous
  30 px) ; toujours dessous, $\vec u_N$ disparaissait sous la flèche de S1. Quand les
  deux pointes se confondent (à 3 px près), le NOM du vecteur unitaire se retire.
- **À S4, pas de flèche de référence** (`reference: aucune`) : la flèche « vitesse
  tenue » EST la composante normale d'aujourd'hui — un fantôme superposé à $a_N$.
- **Le retour de S1 dit « la partie droite », pas « la pente »** (une forme du §9).
- **À S5, la lecture $a_N\times R$ est retirée** (vague 2 : un reste de S3) ; N3 se
  lit à S3, aux quatre tremplins, à 18,0 m·s⁻¹ — pas aux douze couples du §11.1.
- **Tolérances de la porte** (§11.2) : les flèches à 3 px + 1 % (et non 2 px — la
  pointe lissée perd ~1,5 px sur l'accent fort ; pire mesuré : 1,6 px + 1 %), la
  composition à 3,5 px (pire : 1,9 px) ; la normale et $\vec u_T$ à 1°, comme
  prescrit (pire : 0,03°) ; l'arc à 3 % du rayon et 1° de rotation. Les vecteurs
  unitaires se jugent par leur longueur DÉCLARÉE et les deux AILES de leur pointe —
  sous une flèche d'accent, leur longueur ne se lit pas aux pixels.
- **Ce qui n'est pas appliqué de la vague 2, et pourquoi** : DÉCISIONS §26.

**Ce que ce document est.** Le cadrage pédagogique complet d'un manipulable
**PLAN** de première partie (ADR 0041, `"tool": "scene2d"`, mêmes pièces que la
cuve, la corde, les noyaux et le banc de diffraction) : sa justification mesurée,
sa frontière officielle, son placement, ses cinq étapes à pari, ses contrôles,
ses lectures avec leurs unités et leur précision, la table de ce qui ne doit pas
être à l'écran avant chaque pari, les lignes d'honnêteté, un vingtième modèle de
misconception avec ses items, et le contrat de porte.

**Ce que ce document n'est pas.** Il n'écrit ni le JSON, ni le TypeScript, ni la
prose finale, ni les items finaux. Le descripteur est de content-author, le rendu
et le registre de frontend-builder, les items d'item-author. Le §4 **décrit** les
paragraphes à écrire ; il ne les rédige pas.

Marqueur : `[[embed:tremplin-circulaire]]` · clé de registre : `tremplin-circulaire` ·
sélecteur de porte : `[data-scene="tremplin-circulaire"]`.

**Orthographe : « Freinet » ou « Frenet » ?** Mesuré avant d'écrire. Le **cadre**
imprime **« Freinet »** deux fois (`docs/cadre/curriculum/pc-physique-chimie.yaml`
l. 269 et l. 272) ; la prose du corpus aussi
(`content/pc/chute-mouvements-plans/lesson.md:339` et `:591`,
`content/pc/chute-mouvements-plans/items.yaml:427`,
`content/pc/chute-mouvements-plans/spec-extension.md:256`,
`content/pc/lois-de-newton/REVIEW-2026-09-12.md:65`). Le **nom exact** est
**Frenet** (Jean Frédéric Frenet), ce que `content/pc/chute-mouvements-plans/bank.yaml`
documente déjà longuement (l. 2966 : « *« Freinet » est un pédagogue, sans
rapport* » ; l. 2997 : l'arabe du sujet écrit `فريني`) et emploie dans sa propre
voix éditoriale (titres, `reasoning` : l. 3007, 3211, 3239), tout en **préservant
« Freinet » dans les énoncés recopiés** (l. 3199, avec son *(sic)*).
**Cette spec suit la graphie dominante — « base de Freinet » — partout où la
scène et la leçon parlent à l'élève**, et commande **une seule** parenthèse de
prose qui nomme Frenet (§4.3). *Écart de corpus signalé au propriétaire, §13.9 :
aujourd'hui un élève lit « Freinet » dans la leçon et « Frenet » dans le titre
d'une entrée de banque de la notion voisine.*

---

## 0. Pourquoi cette notion maintenant — et la réponse à l'objection écrite contre elle

**L'objection existe, elle est écrite, et elle est de bonne foi.** La spec du banc
de diffraction (`content/pc/propagation-onde-lumineuse/spec-scene-diffraction.md`
§0) a pesé `lois-de-newton` comme dauphine et l'a écartée en ces termes :

> « `lois-de-newton` porte **plus de poids d'examen** (27 % contre 11 %) et elle
> était **déjà inscrite** comme candidate suivante. […] Mais son trou est un trou
> de **couverture** — trois savoir-faire *absents* — et un manipulable ne referme
> pas une absence : il faut d'abord de la **prose** et des **items**. Construire
> la scène avant le contenu qu'elle illustrerait, ce serait décorer un vide. »

**La réponse, en trois points mesurés.**

1. **Ce n'est pas un vide : c'est un trou porteur.** Trois fichiers de la notion
   **affirment déjà** le fait manquant, sans jamais l'enseigner :
   - `items.yaml:97` — la `description` de `vitesse-scalaire` écrit « *dirigé vers
     le centre de la courbe (**direction de l'accélération**)* » ;
   - `items.yaml:937-941` — le `feedback` du choix C de **LDN-12** écrit « *C'est
     la direction de l'**ACCÉLÉRATION** (ou d'une de ses composantes) dans un
     mouvement courbe* » ;
   - `items.yaml:2109-2112` — la `solution` de **LDN-33** promet « *C'est ce qui
     permettra d'écrire $\vec a$ comme sa variation, et de comprendre qu'un
     **mouvement circulaire uniforme est accéléré bien que la norme ne change
     pas*** ». **La leçon ne l'écrit nulle part.**

   Et **deux leçons voisines s'appuient dessus par un renvoi** :
   `content/pc/chute-mouvements-plans/lesson.md:339` — « *Décompose l'accélération
   dans la base de Freinet, **comme au chapitre des lois de Newton*** » (`grep`
   « Freinet » sur `content/pc/lois-de-newton/` hors REVIEW : **0**) ; et
   `content/pc/atome-mecanique-newton/lesson.md:76-78` ré-enseigne
   $a_N = v^2/r$ **de zéro**, sans base ni vecteurs unitaires, parce qu'il n'a rien
   à citer. `content/pc/chute-mouvements-plans/bank.yaml:1874` écrit « *Exactement
   le raisonnement du chapitre 10 : on décompose l'accélération dans la base de
   Freinet fournie* ». Un renvoi est une instruction (ADR 0031) : celui-ci pointe
   sur rien.
2. **Cette proposition ne commande pas une scène seule.** Elle commande, dans cet
   ordre : **un modèle de misconception + quatre items** (§8), **la scène** (§5-§7),
   **quatre paragraphes de prose** (§4), **une retouche chez le voisin** (§4.6).
   L'ordre de construction est écrit au §12 et `validate-content` l'impose : la
   scène ne valide pas tant que le modèle n'est pas déclaré. *La scène est la
   première page de l'enseignement manquant, pas sa décoration.*
3. **Le poids.** `mecanique` : `poids: { part_examen: 27, rang_physique: 1 }` — le
   plus lourd sous-domaine de toute la physique. Aucun autre chapitre du corpus ne
   porte trois savoir-faire du cadre à zéro sur 27 % d'examen.

**Ce que cette proposition NE referme pas, écrit à côté de ce qu'elle arme**
(ADR 0035) :

- **Les équations aux dimensions** (troisième savoir-faire à zéro) ne sont
  refermées qu'en **tranche** : le §4.3 commande un contrôle dimensionnel d'une
  ligne sur $v^2/R$ ($\mathrm{L}^2\mathrm{T}^{-2}/\mathrm{L} =
  \mathrm{L}\,\mathrm{T}^{-2}$), pas un traitement du savoir-faire. **Reste dû.**
- **La lecture graphique d'une pente** (`REVIEW-2026-09-12`, « Reporté ») : quatre
  entrées de banque sur six l'exigent, rien ne l'enseigne. Cette scène **n'a pas de
  graphe** (§6) et ne l'entame pas. **Reste dû.**
- **Le BLOQUANT propriétaire de la notion** (525 N contre 532 N pour la même
  question réelle, `REVIEW-2026-09-12`) est **intact** : la scène est cinématique
  et **n'affiche jamais $F$, ni $m$, ni aucune force**. Elle n'emploie du sujet
  2019 N que les **quatre valeurs sur lesquelles `r-bac` et `bank.yaml`
  s'accordent explicitement** — $a_G = 4{,}5\ \mathrm{m\,s^{-2}}$, $AB = 36$ m,
  $t_B = 4{,}0$ s, $V_B = 18{,}0\ \mathrm{m\,s^{-1}}$ (`bank.yaml:229-232` :
  « *ces trois valeurs coïncident exactement avec r-bac* »). **Choix de
  conception, pas hasard.**
- **Le champ `habilete` n'existe sur aucun des 33 items** de la notion (`grep` ⇒
  **0**). Le mélange 50 / 15 / 35 du cadre y est **incalculable** — c'est la
  décision de propriétaire `DECISIONS-EN-ATTENTE` §3, et cette livraison **ne la
  tranche pas** (§13.10).

**Elle ne solde aucune dette écrite.** `content/pc/lois-de-newton/` ne porte
**aucun `spec.md`** (contenu du dossier : `lesson.md`, `items.yaml`,
`checkpoints.yaml`, `bank.yaml`, `exercises.yaml`, `REVIEW-2026-09-12.md`,
`media/`) : aucune spec n'y a jamais prescrit d'`embed`. Comme la corde, comme le
banc, cette scène **ne doit pas être comptée comme un paiement** :
`dette-manipulable` ne bouge pas, `media-manipulable` monte d'une notion.

---

## 1. Le cadre (la frontière officielle, lue avant tout le reste)

- **Filière / matière :** `sciences_physiques` (et SM) / `physique_chimie`.
- **Domaine → sous-domaine → chapitre :** physique → **`mecanique`** →
  **`lois_de_newton`** (`docs/cadre/curriculum/pc-physique-chimie.yaml`,
  l. 254-275).
- **Poids :** `poids: { part_examen: 27, rang_physique: 1 }` (cadre p. 18) — **le
  premier sous-domaine de la physique**. **Habiletés du sous-domaine** (cadre
  p. 19, déclarées dans le YAML l. 257-260) : **utilisation des ressources
  13,5 %**, **application expérimentale 4,05 %**, **résolution de problème
  9,45 %**. *C'est la cible chiffrée de l'item-author et le nombre que le critique
  de fidélité doit mesurer.*
- **`competences_ciblees` du sous-domaine** (cadre p. 29) : « Analyser, suivre et
  **prévoir l'évolution** d'un système mécanique en adoptant un modèle simple. »
- **`programme` du chapitre** (cadre p. 21), **cité entier, parce que son ORDRE
  décide du placement** (§3) :
  > « **Vecteur vitesse / vecteur accélération (repère de Freinet)** ; 2e loi
  > (rôle de la masse, référentiel galiléen) ; 3e loi (actions réciproques). »

  Le repère de Freinet est nommé **avant** la deuxième loi, **dans la même ligne
  que le vecteur accélération**. La scène se place donc entre la construction de
  $\vec a_G$ et l'énoncé de la deuxième loi — c'est l'ordre du cadre, pas une
  préférence.
- **`savoir_faire` que la scène sert** (cadre p. 10, YAML l. 271-275) :
  - « Connaître/exploiter les expressions du **vecteur vitesse instantanée** et du
    **vecteur accélération** ; **unité de l'accélération**. » — S1 à S5.
  - « **Connaître les coordonnées de l'accélération en repère cartésien et dans la
    base de Freinet.** » — **le savoir-faire central de cette scène**, et il est à
    **0 %** dans la notion (`grep` « Freinet » ⇒ 0 hors REVIEW).
  - « **Exploiter le produit $\vec a\cdot\vec v$ pour déterminer la nature du
    mouvement (accéléré/retardé).** » — **S4, S5**, et il est à **0 %** aussi
    (`grep` `a\cdot v` / `a.v` sur `lesson.md`, `items.yaml`, `checkpoints.yaml`
    ⇒ 0).
  - « Connaître le référentiel galiléen… » — **acquis** (R1, R2) ; la consigne de
    S1 le **déclare** sans l'enseigner.
  - « Appliquer la 2e loi… ; utiliser les **équations aux dimensions**. » —
    **hors scène** ; la prose en prend une tranche (§4.3, §0).
- **`limites` du chapitre :** le YAML **n'en déclare aucune** pour
  `lois_de_newton` (contrairement à `applications_dynamique`, `rotation_axe_fixe`
  et `systemes_oscillants`, qui en portent). *Il n'y a donc **rien** à porter en
  dur depuis ce champ — et c'est une absence à signaler, pas une licence (§15.4).*
- **`exclusions` du sous-domaine `mecanique` portées en dur** (l. 356-359) :
  1. « Régime sinusoïdal forcé analytique des oscillateurs (amplitude de
     résonance, facteur de qualité, déphasage) » ;
  2. « **Oscillations de grande amplitude / non linéaires** » ;
  3. « **Mécanique lagrangienne / hamiltonienne** ».

  Aucune ne mord directement ici ; la troisième borne quand même le vocabulaire
  (§9.11 : ni lagrangien, ni action, ni coordonnées généralisées).
- **La frontière qui mord vraiment est INTERNE, et elle est double.**
  1. **Le chapitre voisin.** Tout ce qui suit le point C — le saut, la parabole,
     la portée, la flèche, $x_G(t)$ et $y_G(t)$ — est `applications_dynamique`
     (cadre l. 277-293) et vit dans `pc/chute-mouvements-plans`. **La piste de la
     scène s'arrête en C** (§9.1). De même la gravitation, Kepler, le satellite
     (R9-R10 du voisin) et la force de Lorentz (R6 du voisin) : **la scène ne les
     nomme jamais** (§9.5), alors même qu'elles sont les trois endroits où le bac
     emploie la base de Freinet. *C'est un renoncement réel : la scène enseigne
     l'outil, le voisin en fait l'usage que le bac demande.*
  2. **Le rang dans la leçon.** La scène est posée **AVANT** `### L'énoncé de la
     deuxième loi` (`lesson.md:123`). À cet endroit de la leçon, **la deuxième loi
     n'a pas encore été énoncée**. La scène est donc **purement cinématique** :
     elle ne dessine, ne nomme et ne mesure **aucune force**, **aucune masse**,
     **aucun newton** (§9.2). Ce n'est pas une prudence d'auteur, c'est la
     chronologie de la leçon — et la porte la garde.
- **La garde de périmètre déjà écrite dans la notion**
  (`checkpoints.yaml:34-38`) : « *Translation seulement. […] pas de rotation.* »
  Une trajectoire courbe n'est ni l'une ni l'autre au sens strict. **Résolution,
  écrite plutôt que glissée :** la scène décrit le mouvement du **centre
  d'inertie G réduit à un point** — exactement l'objet dont le cadre demande « les
  **coordonnées de l'accélération** » — et **jamais** la rotation d'un solide
  autour d'un axe, qui est le chapitre `rotation_axe_fixe` et la scène
  `manege-rotation`. Ni $\omega$, ni $\theta$, ni moment, ni moment d'inertie
  n'entrent (§9.3). *Retouche de la garde proposée au §13.7.*

---

## 2. Pourquoi un manipulable — et ce qu'aucun média existant ne fait

### 2.1 Les six figures de la notion, mesurées une par une

| média | rung | ce qu'il montre | ce qu'il ne peut pas faire |
|---|---|---|---|
| **`vecteur-vitesse-tangente`** (4 étapes) | **R1** | **une trajectoire COURBE**, $G_1$, la corde $G_1G_2$, son pivotement, et à la limite **$\vec v_G$ tangente** | **aucune accélération**, jamais ; aucune valeur numérique (« *Aucune valeur physique n'est attachée (figure conceptuelle)* », en-tête du SVG) ; **rien ne bouge** : la « limite » est quatre dessins successifs |
| `deux-chariots-inertie` | R3 | deux chariots, une force, deux accélérations | rectiligne ; aucune direction à découvrir |
| `actions-reciproques-livre-table` | R4 | les deux flèches de la 3ᵉ loi | hors sujet ici |
| `bilan-forces-caisse-horizontale` | R5 | quatre forces, deux axes | **des forces** — ce que la scène s'interdit (§1) ; rectiligne |
| `chute-libre-comparaison` | R6 | deux billes, $x = \frac12 gt^2$ | rectiligne vertical |
| `plan-incline-forces` | R7 | $mg\sin\alpha$, $mg\cos\alpha$, $\vec N$, $\vec f$ | **des forces** ; rectiligne |

**Le constat, et il est exact :** la notion possède **une** figure à trajectoire
courbe (`vecteur-vitesse-tangente`, R1) ; elle s'arrête **précisément** là où
cette spec commence — elle construit $\vec v_G$ tangente et ne dit rien de
$\vec a_G$. Les cinq autres figures sont **rectilignes**. Et le texte de R1 qui
la commente se termine par (`lesson.md:63`) :

> « *Ce qui va compter, c'est de savoir **si, et comment**, $\vec v_G$ **change**
> au cours du temps.* »

**La leçon pose la question et ne donne jamais la moitié « comment ».** Elle
répond « $\vec a_G = d\vec v_G/dt$ » (`:119`) et passe à la deuxième loi.

### 2.2 Le motif central : un VECTEUR qui change sans que son NOMBRE change

Le point que la scène existe pour installer, en une phrase :

> Un vecteur vitesse a **deux** façons de changer : sa **longueur** peut changer,
> sa **direction** peut changer — et la seconde n'apparaît nulle part sur le
> compteur de vitesse. Une moto qui tient exactement 18 m·s⁻¹ dans un tremplin de
> 20 mètres subit **16,2 m·s⁻²**, soit **plus de trois fois et demie**
> l'accélération qu'elle avait sur la pente, et **rien** sur son compteur ne le
> dit.

**Aucune figure ne peut le montrer**, parce que le fait à montrer est
*qu'il ne se passe rien sur un cadran pendant qu'il se passe tout sur un vecteur*.
Il faut **voir le nombre rester fixe pendant que la flèche tourne** — c'est-à-dire
du **temps**, et un objet qu'on **lance**. C'est le critère du §1 de l'ADR 0041,
rempli sans relief : l'idée est **spatiale** (une direction qui tourne) et
**temporelle** (pendant qu'un nombre ne bouge pas).

### 2.3 L'antidote obligatoire : une relation construite en QUATRE temps

$\vec a = \dfrac{dv}{dt}\,\vec u_T + \dfrac{v^2}{R}\,\vec u_N$ contient quatre
réponses ; un retour trop bavard les donne toutes d'un coup. Même discipline
qu'au banc de diffraction (sa §2.3, sa règle `formule-graduee`, ADR 0041 addendum
de la nuit du 2026-09-24 : *la relation est un ÉTAT qui fuit*) :

- **S1** établit l'**existence** et la **direction** de la composante normale. Le
  retour écrit « *une composante normale, vers le centre du virage* », **et rien
  de plus** : ni $v^2$, ni $R$, ni fraction.
- **S2** ajoute le **carré de la vitesse**. Le retour peut écrire « *$v$ au carré,
  au numérateur* » ; il ne peut pas écrire la fraction entière.
- **S3** ajoute le **rayon** : le retour écrit enfin
  $a_N = \dfrac{v^2}{R}$, **entière**, et l'invariant $a_N \times R = v^2$.
- **S4** ajoute la **composante tangentielle** et le **produit scalaire** : le
  retour écrit $\vec a = \dfrac{dv}{dt}\vec u_T + \dfrac{v^2}{R}\vec u_N$ et
  $\vec a\cdot\vec v$.

**Contrainte non négociable et mesurable :** les chaînes `v^2/R`, `v²/R`, `\frac{v^2}{R}`
n'apparaissent **nulle part** dans le panneau avant la révélation de S3 ; `dv/dt`,
`\vec u_T`, `a\cdot v`, `a_T` pas avant celle de S4. La porte le lit dans le
`textContent` **rendu**, annotations TeX de KaTeX comprises (§11.2,
`formule-graduee`).

### 2.4 Ce que le bac demande, et que le corpus ne fait pas faire

| sujet | où il vit | ce qu'il exige | ce que le corpus en fait |
|---|---|---|---|
| **2019 N, Ex IV** | `bank.yaml` `bk-2019-n-x4` **et** le sommet `r-bac` | la piste est « *formée d'une partie rectiligne A'B' inclinée […] d'un **tremplin B'C' circulaire** […] d'une zone d'atterrissage* » (`docs/sujets/pc/lois-de-newton.md:24-28`) | **le tremplin n'est jamais étudié** : la partie I s'arrête en B, la partie II démarre en C avec $V_C = 20\ \mathrm{m\,s^{-1}}$ **donnée**. La courbure de la piste du sujet phare de la notion n'est traitée nulle part. |
| **2012 R** (Jupiter) | `content/pc/chute-mouvements-plans/bank.yaml:3199` | « *Écrire les expressions des composantes du vecteur accélération dans le **repère de Freinet***, et déduire que le mouvement de Jupiter est circulaire uniforme » — **1,25 pt** | le `reasoning` doit **enseigner la base entière** sur place (l. 3211 : « *C'est une base **mobile, liée au point**…* ») faute de pouvoir citer le chapitre |
| **2010 R** (Mars) | `docs/sujets/_incoming/pc-2010-r.md:1367` | « *2ᵉ loi de Newton dans la base de Frenet : la force est radiale → accélération tangentielle nulle → ‖V‖ constante* » | même chose |
| **2017 N, 2011 N, 2015 R** (skieurs) | `bank.yaml` | plan incliné **puis** plan horizontal : accéléré, puis retardé | la **nature** du mouvement est lue sur le signe d'une composante, jamais sur $\vec a\cdot\vec v$ — le savoir-faire du cadre |

**Le geste que rien n'exerce, et que la scène rend :** décomposer l'accélération
d'un mobile **sur une piste réelle**, et lire la **nature** de son mouvement sur
un produit scalaire dont le signe **ne dépend d'aucun axe choisi**.

### 2.5 Ce que la scène NE double pas

- **`manege-rotation`** (`pc/rotation-axe-fixe`, R2) traite le **moment d'une
  force** et la rotation autour d'un **axe fixe** ($\omega$, $J$, $\mathcal{M}_\Delta$).
  Sa spec note d'ailleurs, dans les restes au propriétaire (DÉCISIONS §20) :
  « *l'accélération normale $a_N$* » — **encore due chez le voisin aussi**, mais
  en **grandeurs angulaires**, ce qui est le savoir-faire de *son* chapitre. La
  scène du tremplin ne prononce ni $\omega$, ni $\theta$, ni « angulaire » (§9.3).
- **`particule-champ-magnetique`** (`pc/chute-mouvements-plans`, R6) montre un
  mouvement **circulaire uniforme** provoqué par une force. Elle **suppose** la
  décomposition de Freinet (la prose qui la suit, `lesson.md:339-343`, s'en sert
  aussitôt). **Le tremplin fabrique l'outil que la particule consomme.**
- **`orbite-geostationnaire`** (3D) est un problème de **référentiel** et de
  **plan**, jamais de composantes d'accélération.

### 2.6 Trois idées volontairement écartées

- **Le sommet d'une bosse ($\vec u_N$ vers le BAS), ÉCARTÉ de la scène, gardé par
  un item.** C'est le cas qui casse le mieux « *la normale, c'est vers le haut* » —
  mais **la piste du sujet 2019 ne comporte aucune partie convexe**, et aucune
  entrée de banque de la notion n'en comporte (`grep` « bosse », « dos d'âne »,
  « looping », « piste circulaire » sur `content/` ⇒ **0** pour cette notion).
  Inventer une bosse pour le plaisir du cas serait quitter le sujet réel.
  **LDN-36 le porte** (§8.4), sur un dos d'âne chiffré. *§13.2.*
- **La deuxième loi projetée sur la base ($N < P$ au sommet, la « sensation de
  légèreté »), ÉCARTÉE par le placement.** Superbe, et c'est exactement le geste
  de 2012 R — mais la scène est **avant** l'énoncé de la deuxième loi (§1). Une
  étape qui projetterait $\sum\vec F = m\vec a$ enseignerait la section suivante.
  *Renvoyée au §13.1 : la **prose** qui suit la scène peut la faire, en trois
  lignes, une fois la loi énoncée.*
- **Un graphe $a_N = f(v)$ ou $a_N = f(1/R)$, ÉCARTÉ faute d'enseignement de la
  lecture de pente.** `REVIEW-2026-09-12` : « *la lecture graphique d'une pente
  n'est enseignée nulle part* », et c'est une dette **non résolue**. Une scène ne
  doit pas exercer un geste que la leçon n'a pas posé. **La scène n'a aucun
  graphe** (§6), et l'invariant se lit en **produit**, comme au banc de
  diffraction. *§13.6.*

---

## 3. Placement

**Dans `## R3 — La deuxième loi de Newton`, entre la fin de `### Construire
$\vec{a}_G$ (`lesson.md:121`) et `### L'énoncé de la deuxième loi`
(`lesson.md:123`)** — c'est-à-dire **après** que $\vec a_G = d\vec v_G/dt$ soit
posée, et **avant** que la deuxième loi soit énoncée.

Ligne exacte à insérer (seule sur sa ligne, comme l'exige `MARKER_LINE`) :

```
[[embed:tremplin-circulaire]]
```

précédée du titre d'une sous-section neuve et d'un paragraphe d'annonce neutre
(§4.1, §4.2).

**Trois raisons, dans l'ordre de leur force.**

1. **C'est l'ordre du cadre, au mot près.** `programme` du chapitre : « *Vecteur
   vitesse / vecteur **accélération (repère de Freinet)** ; **2e loi**…* » — la
   base est nommée **dans la ligne du vecteur accélération**, et **avant** la
   deuxième loi. Placer la scène là, c'est suivre le programme ; la placer après
   la deuxième loi, c'est l'inverser.
2. **C'est ce qui rend la scène cinématique HONNÊTE, et non prude.** À
   `lesson.md:121`, la leçon a $\vec v_G$, $\vec a_G$ et le principe d'inertie, et
   **elle n'a pas encore $\sum\vec F = m\vec a_G$**. Une scène posée là **ne peut
   pas** parler de forces sans enseigner le paragraphe suivant. La frontière du
   §9.2 n'est donc pas une préférence de l'architecte : c'est le rang de la scène,
   et la porte la mesure.
3. **Les cinq paris restent entiers.** Vérification étape par étape :

| étape | la prose (ou l'item) qui répondrait | où elle est | déjà lue au marqueur ? |
|---|---|---|---|
| S1 — le virage à vitesse tenue | rien dans `lesson.md` ; **LDN-12 C** (feedback) et **LDN-33** (solution) le disent, mais ce sont des items du **banc de fin** | `items.yaml:937`, `:2109` | ❌ non (le banc est après la leçon) |
| S2 — deux fois plus vite | rien, nulle part | — | ❌ non |
| S3 — deux fois plus serré | rien, nulle part | — | ❌ non |
| S4 — gaz ou freinage, $\vec a\cdot\vec v$ | rien ; `lesson.md:133` dit que $\vec a_G$ est colinéaire à $\sum\vec F_{ext}$ et « **JAMAIS forcément** dans la direction de $\vec v_G$ » | R3, `:133` — **APRÈS** le marqueur | ❌ non |
| S5 — la nature du mouvement | rien ; `cp-r3-force-vitesse` sonde `force-liee-a-vitesse`, jamais $\vec a\cdot\vec v$ | R3, `:150` | ❌ non |

**Deux tensions réelles, écrites plutôt que maquillées.**

1. **Le marqueur coupe R3 en deux.** R3 s'ouvre sur une prédiction (les deux
   chariots, `:111`) à laquelle le texte répond à `:113`, puis construit
   $\vec a_G$, puis — désormais — la scène, puis l'énoncé. Le fil tient : on
   **finit** de construire $\vec a_G$ (sa définition **et** sa décomposition)
   avant la loi qui l'emploie. *Si le propriétaire préfère un rung à part
   (« R3bis »), §13.3.*
2. **La consigne de S1 doit poser du vocabulaire que la prose n'a pas encore
   écrit** : tremplin, rayon, point d'entrée B, point C. Même prix que le banc de
   diffraction (fente, écran, tache) et que les noyaux ($N_0$). Acceptable pour la
   même raison : ces mots sont **descriptifs** (ce qu'on voit sur la piste), pas
   **explicatifs** (pourquoi la flèche apparaît). En revanche « composante
   normale », « $\vec u_T$ », « $\vec u_N$ », « base de Freinet » sont
   **explicatifs** : la consigne de S1 **ne les emploie pas** — le retour de S1
   les introduit (§7.1, ⟂-avant-pari).

**Ce qui ne bouge pas :** `cp-r3-force-vitesse` (`lesson.md:150`) et les six
figures. La scène **n'en déplace aucune** et n'en modifie aucun caractère.

---

## 4. La prose à écrire — CAHIER DES CHARGES pour content-author

**Ce §4 décrit ; il ne rédige pas.** Chaque bloc porte : son **ancre exacte**, son
**travail**, les **faits qu'il doit contenir**, ce qu'il **ne doit pas contenir**,
et une **longueur cible**. Les phrases finales sont de content-author.

**Interdit dans tout ce qui précède le marqueur :** rien qui réponde à un pari
(§7.6). 4.1 est **avant** et strictement neutre ; 4.3 à 4.6 sont **après**.

### 4.1 Le titre de sous-section et le paragraphe d'annonce — AVANT le marqueur

*Ancre : après `lesson.md:121` (« …vu comme un cas particulier de ce qu'on énonce
maintenant. »), avant `### L'énoncé de la deuxième loi` (`:123`).*

- **Titre proposé :** `### Comment un vecteur vitesse change — la base de Freinet`.
  *Le titre nomme l'outil ; il ne donne aucune de ses propriétés.*
- **Travail :** présenter l'appareil et donner l'unique donnée numérique dont S1 a
  besoin, sans rien affirmer.
- **Doit contenir :** (a) le rappel que $\vec a_G = d\vec v_G/dt$ mesure la
  variation d'un **vecteur** — deux mots, pas trois lignes ; (b) la piste : celle
  du sujet national **2019**, une partie rectiligne inclinée puis un **tremplin
  circulaire** ; (c) l'annonce du geste : « tu paries d'abord, la piste répond
  ensuite » ; (d) les unités qu'on va lire (m·s⁻¹, m·s⁻², mètres).
- **Ne doit PAS contenir :** « composante », « normale », « tangentielle »,
  « perpendiculaire », « vers le centre », « $v^2/R$ », « $\vec a\cdot\vec v$ »,
  ni aucune valeur d'accélération ; ni le mot « force » (§9.2).
- **Longueur :** 60 à 90 mots.

### 4.2 Le marqueur

Seul sur sa ligne, immédiatement après 4.1.

### 4.3 Le cœur — « Deux façons de changer, deux composantes » (APRÈS le marqueur)

- **Travail :** écrire la teaching que la notion n'a pas, et que deux leçons
  voisines citent déjà.
- **Doit contenir, dans cet ordre :**
  1. **Les deux vecteurs unitaires.** $\vec u_T$ : unitaire, **tangent** à la
     trajectoire, **dans le sens du mouvement** — donc $\vec v = v\,\vec u_T$ avec
     $v > 0$. $\vec u_N$ : unitaire, **perpendiculaire** à $\vec u_T$, dirigé
     **vers le centre de courbure**, c'est-à-dire **du côté vers lequel la
     trajectoire tourne** (jamais « vers le haut », jamais « vers la route »).
     Le couple $(\vec u_T ; \vec u_N)$ est la **base de Freinet** ; elle est
     **mobile** : elle voyage avec le point et tourne avec la trajectoire.
  2. **La relation**, en une ligne affichée :
     $$\vec a = \frac{dv}{dt}\,\vec u_T + \frac{v^2}{R}\,\vec u_N$$
     avec $R$ le **rayon de courbure** au point considéré. **Écrite
     identiquement à `content/pc/chute-mouvements-plans/lesson.md:341`** — c'est
     le renvoi du voisin qui doit tomber juste, au symbole près.
  3. **Les deux cas limites, chiffrés sur la scène :** sur une **droite**,
     $R \to \infty$ donc $a_N = 0$ et $\vec a$ est portée par $\vec u_T$ ; à
     **vitesse de norme constante**, $dv/dt = 0$ donc $\vec a$ est **purement
     normale** et **non nulle** — « *un mouvement circulaire uniforme est accéléré
     bien que la norme ne change pas* », la phrase que `items.yaml:2111` promet
     déjà.
  4. **Le contrôle dimensionnel, une ligne** (savoir-faire du cadre, §0) :
     $\left[\dfrac{v^2}{R}\right] = \dfrac{(\mathrm{L\,T^{-1}})^2}{\mathrm{L}} =
     \mathrm{L\,T^{-2}}$ — bien une accélération, en m·s⁻².
  5. **La note de notation et d'orthographe, une parenthèse :** les sujets
     écrivent souvent la base $(\vec u\,;\,\vec n)$ et les composantes
     $a_\tau$ et $a_n$ ; et ils impriment « **Freinet** » là où le mathématicien
     s'appelle **Frenet** — à reconnaître le jour de l'examen. *Source : le sujet
     2012 R imprime « repère de Freinet » (`chute-mouvements-plans/bank.yaml:3199`),
     et 2010 R emploie $a_\tau$, $a_n$ (`docs/sujets/_incoming/pc-2010-r.md:1367`).*
- **Ne doit PAS contenir :** aucune force, aucune masse, aucun newton (la deuxième
  loi n'est pas encore énoncée) ; ni $\omega$, ni angulaire ; ni parabole/saut.
- **Longueur :** 220 à 300 mots, équations comprises.

### 4.4 « La nature du mouvement se lit sur $\vec a\cdot\vec v$ »

- **Travail :** rendre exploitable le deuxième savoir-faire à zéro.
- **Doit contenir :** (a) $\vec a\cdot\vec v = \dfrac{dv}{dt}\,v$ — **la composante
  normale disparaît du produit**, parce qu'elle est perpendiculaire à $\vec v$, et
  $v > 0$ toujours : **le signe de $\vec a\cdot\vec v$ est celui de $dv/dt$** ;
  (b) la règle : $>0$ **accéléré**, $<0$ **retardé**, $=0$ **uniforme** ; (c) le
  point qui coûte des points au bac : le **signe d'une composante dépend de l'axe
  choisi**, le signe de $\vec a\cdot\vec v$ **ne dépend d'aucun axe** — c'est pour
  ça que le programme demande ce produit et pas un signe ; (d) le contre-exemple
  qui ferme la porte : **uniforme ne veut pas dire $\vec a = \vec 0$** — dans le
  tremplin à vitesse tenue, $\vec a\cdot\vec v = 0$ et $\|\vec a\| = 16{,}2$ m·s⁻².
- **Longueur :** 110 à 150 mots.

### 4.5 L'exemple travaillé — les nombres de la scène, refaits à la main

- **Travail :** que l'élève qui refait le calcul retrouve **exactement** ce que la
  scène a affiché (ADR 0041 §5).
- **Doit contenir :** le tremplin $R = 20$ m abordé à $v = 18$ m·s⁻¹, et les
  **deux** régimes opposés, côte à côte :
  - gaz gardés, $dv/dt = +4{,}5$ : $a_N = 18^2/20 = 16{,}2$ ;
    $\|\vec a\| = \sqrt{16{,}2^2 + 4{,}5^2} = \sqrt{282{,}69} = 16{,}8$ m·s⁻² ;
    $\vec a\cdot\vec v = +4{,}5\times18 = +81{,}0$ → **accéléré** ;
  - freinage, $dv/dt = -4{,}5$ : **le même** $a_N = 16{,}2$, **la même** norme
    $\|\vec a\| = 16{,}8$ m·s⁻², et $\vec a\cdot\vec v = -81{,}0$ → **retardé**.
  - **La phrase à ne pas perdre :** deux mouvements de natures opposées avec
    **exactement la même norme d'accélération** ; seule le produit
    $\vec a\cdot\vec v$ les sépare. *C'est l'argument entier du savoir-faire, et
    il est chiffré.*
- **Longueur :** 130 à 180 mots.

### 4.6 Deux puces au récapitulatif (R8) et la retouche chez le voisin

- **(a) `lesson.md:349-356`, « Récapitulatif express ».** Après la puce sur
  $\vec a_G = d\vec v_G/dt$ (`:352`), **ajouter deux puces** : l'une porte la base
  de Freinet et la relation entière avec les deux cas limites ; l'autre porte
  $\vec a\cdot\vec v$ et les trois natures, avec le rappel qu'« uniforme » ne veut
  pas dire « accélération nulle ». *Ne pas toucher aux six puces existantes.*
- **(b) LE RENVOI FAUX DU VOISIN —
  `content/pc/chute-mouvements-plans/lesson.md:339`.** Il écrit aujourd'hui :
  « *Décompose l'accélération dans la base de Freinet, **comme au chapitre des
  lois de Newton*** » — et `grep` « Freinet » sur `content/pc/lois-de-newton/`
  (hors `REVIEW-2026-09-12.md`) donne **0**. Deux cas, et **un seul** est à
  exécuter :
  - **Si cette proposition est adoptée**, le renvoi **devient vrai** : il suffit de
    le rendre **précis** — nommer le chapitre (« au **chapitre 4** de la leçon
    *Lois de Newton*, sur le tremplin circulaire »). *La numérotation « chapitre 4 »
    est celle du corpus : `bank.yaml:290` écrit déjà « la définition
    $a_G = dv_G/dt$ du **chapitre 4** », et R0 y compte pour 1.*
  - **Si elle est refusée**, le renvoi doit être **retiré** et la phrase réécrite
    en **établissement** (« On décompose l'accélération dans une base liée au
    mouvement, la base de Freinet : … »), parce qu'un renvoi est une instruction
    et que celle-ci pointe sur rien (ADR 0031).
  - **`lesson.md:591` est JUSTE et ne bouge pas** : « comme au chapitre 7 » désigne
    R6 de la **même** leçon (R0 = chapitre 1 ⇒ R6 = chapitre 7), là où la
    décomposition est écrite à `:341`. *Vérifié, pas supposé.*
- **(c) Aucun nouveau point d'arrêt.** Les **cinq paris** de la scène jouent le
  rôle de porte d'engagement dans R3 ; `checkpoints.yaml` n'est pas touché. *§13.5
  si le propriétaire veut une porte écrite en plus.*

---

## 5. Le modèle, les constantes, les contrôles, l'état, les lectures

### 5.1 La piste — géométrie, et d'où vient chaque nombre

| grandeur | valeur | d'où elle vient |
|---|---|---|
| pente de l'approche | $\beta = 10°$ sous l'horizontale, **descendante** | sujet 2019 N : « *l'angle $\beta = 10°$* » (`docs/sujets/pc/lois-de-newton.md:35`) |
| direction en C | $\alpha = 18°$ **au-dessus** de l'horizontale | même sujet, partie II : « *une vitesse $\vec V_C$ formant un angle $\alpha = 18°$ avec l'horizontale* » (`docs/sujets/pc/chute-mouvements-plans.md:299`) |
| **rotation totale du tremplin** | $\mathbf{28{,}0°} = 0{,}488\,692$ rad | $18° - (-10°)$ — **déduit des deux données du sujet**, pas inventé |
| longueur d'approche dessinée | **9,0 m** avant B | choisie : c'est la plus grande longueur telle que le réglage le plus lent (9 m·s⁻¹) avec les gaz parte d'une vitesse $\ge 0$ ($\sqrt{81-81}=0$ : la moto part **du repos**, comme dans le sujet) |
| longueur d'arc | $s = R\times0{,}488\,692$ | **4,89** · **7,33** · **9,77** · **14,7** m pour $R =$ 10 · 15 · 20 · 30 |
| dénivelé du tremplin | $\Delta y = R(\cos10° - \cos18°) = R\times0{,}033\,75$ | 0,337 · 0,506 · **0,675** · 1,01 m |
| portée horizontale du tremplin | $\Delta x = R(\sin18° + \sin10°) = R\times0{,}482\,67$ | 4,83 · 7,24 · **9,65** · 14,5 m |

*Vérifications : $\cos10° = 0{,}984\,808$, $\cos18° = 0{,}951\,056$, différence
$0{,}033\,751$ ✓ · $\sin18° = 0{,}309\,017$, $\sin10° = 0{,}173\,648$, somme
$0{,}482\,665$ ✓ · $28° \times \pi/180 = 0{,}488\,692$ ✓.*

### 5.2 Les réglages — et pourquoi ces valeurs-là

| grandeur | valeurs | d'où elles viennent |
|---|---|---|
| $v$ **au point B** | **9,0** · **12,0** · **18,0** m·s⁻¹ | **18,0** est $V_B$ du sujet 2019 N, recalculée deux fois dans le corpus : $V_B = a_G t_B = 4{,}5\times4{,}0$ et $V_B^2 = 2a_G\,AB = 2\times4{,}5\times36 = 324$ (`bank.yaml:229-232`). **9,0** est sa moitié exacte (le pari du carré). **12,0** est la valeur intermédiaire qui donne des lectures rondes ($144$). |
| $R$ (rayon du tremplin) | **10** · **15** · **20** · **30** m | **le sujet ne donne aucun rayon** (§10.7). **20 m** est le défaut, choisi pour une raison mesurée : avec les gaz gardés à l'accélération du sujet, la moto arrive en C à **20,3 m·s⁻¹**, soit **1,5 %** du $V_C = 20$ m·s⁻¹ que le même sujet **donne**. Les quatre crans forment **deux chaînes de doublement** : 10↔20 et 15↔30. |
| $dv/dt$ (le régime) | `gaz` **+4,50** · `tenue` **0** · `freinage` **−4,50** m·s⁻² | **+4,50** est $a_G$ du sujet 2019 N (`bank.yaml:313` : $a_G = (9-0)/(2-0) = 4{,}5$ m·s⁻²). **−4,50** est son **miroir exact**, choisi exprès : les deux donnent **la même norme** $\|\vec a\|$ et des **natures opposées** — c'est l'argument entier de $\vec a\cdot\vec v$ (§4.5, §7.4). |
| repères de lecture | `approche` (6,0 m avant B) · `entree` (B, premier point de l'arc) · `milieu` · `sortie` (C) | quatre lieux, pas un curseur : ce sont les **trois** endroits où la réponse vit, plus la droite qui sert de témoin |

**Ce que la scène n'emploie PAS du sujet, et pourquoi.** $m = 190$ kg,
$g = 10$ m·s⁻², $F$ (525 ou 532 N — le BLOQUANT), $AB = 36$ m,
$V_C = 20$ m·s⁻¹ : **aucune de ces cinq valeurs n'apparaît à l'écran.** La
scène est cinématique ; la masse ne figure dans aucune de ses relations ($a_N =
v^2/R$ n'en contient pas), et $F$ est en arbitrage ouvert. *La porte le mesure :
`190`, `kg`, `N`, `525`, `532` sont des formes interdites (§9.2).*

### 5.3 Le modèle — trois lignes, et rien d'autre

En un repère de lecture, avec $v$ la vitesse **au point B** réglée par le contrôle
et $a_T$ le régime :

$$v(\text{repère}) = \sqrt{v_B^2 + 2\,a_T\,\ell} \quad (\ell = \text{abscisse du repère comptée depuis B})$$
$$a_N = \begin{cases} 0 & \text{sur la droite (}\ell < 0\text{)}\\[2pt] \dfrac{v^2}{R} & \text{dans l'arc}\end{cases} \qquad a_T = \text{le régime} \qquad \|\vec a\| = \sqrt{a_T^2 + a_N^2}$$
$$\vec a\cdot\vec v = a_T\,v \qquad (\text{car } \vec u_N \perp \vec v)$$

**Le zéro de $a_N$ sur la droite est STRUCTUREL dans le code** — la branche
« droite » renvoie `0`, il n'est jamais obtenu par un $1/R$ avec $R$ très grand
(précédent : le moment nul du manège, ADR 0041). La porte le lit par **égalité de
chaîne**, « 0,00 m·s⁻² », aux 36 réglages.

**Le raccordement est idéalisé, et c'est déclaré :** en B la courbure saute de $0$
à $1/R$. `entree` désigne le **premier point de l'arc** (côté arc). *Ligne
d'honnêteté §10.4 ; c'est exactement l'idéalisation que la figure du sujet fait en
dessinant un coude.*

### 5.4 Contrôles (4) — un neuf par étape, et **un seul ouvert par étape**

| id | ce qu'il règle | valeurs | ouvert par |
|---|---|---|---|
| `position` | le repère de lecture | `approche` · `entree` · `milieu` · `sortie` | **S1**, S5 |
| `vitesse` | $v$ au point B | `9` · `12` · `18` (m·s⁻¹) | **S2**, S5 |
| `rayon` | $R$ du tremplin | `10` · `15` · `20` · `30` (m) | **S3**, S5 |
| `pilotage` | le régime $dv/dt$ | `gaz` · `tenue` · `freinage` | **S4**, S5 |

**Aucun contrôle n'est « hérité » d'une étape à la suivante** — même discipline
qu'au banc de diffraction (S2 : `couleur` **seul**). C'est ce qui rend la table
de non-fuite du §7.6 close : à S4, `vitesse` est fermé, donc le réglage
(12 m·s⁻¹, freinage) qui tranche S5 **reste inatteignable**.

**Des crans, pas des curseurs continus** : un rayon de tremplin est une pièce de
piste, pas un réglage ; et les invariants ($a_N\times R = v^2$, le doublement) ne
se lisent que sur des valeurs rondes. *Conséquence mesurable : deux réglages
voisins n'affichent jamais la même valeur à trois chiffres — le défaut de
l'orbite (« douze positions affichant 24,0 h ») ne peut pas se reproduire.*

### 5.5 État (5 clés)

`v_ms`, `R_m`, `regime`, `repere` — les quatre que les contrôles règlent — plus
**une clé posée par l'étape, sans contrôle** (précédents : `support` et
`fenetre_j` dans les noyaux, `chemin` dans la cuve, `reference` et `vue` au banc) :

- **`reference`** (`aucune` | `depart`) décide si la flèche que le réglage **de
  départ de l'étape** donnait **au même repère** reste dessinée, à l'encre, en
  trait interrompu, à côté de la flèche courante. C'est ce qui rend la comparaison
  « avant / après » visible en S2, S3 et S4. *Avant le pari, **aucune** flèche
  n'existe (§7.6) : la référence ne peut donc rien révéler.*

Les trois angles de la piste ($10°$, $18°$, $28°$), la longueur d'approche
(9,0 m) et le facteur de ralenti (×6) sont des **constantes du modèle**, pas des
clés d'état : aucun contrôle ne les atteint.

### 5.6 Lectures — définitions exactes, unité, précision

| id | ce qui s'affiche | unité | précision | justification |
|---|---|---|---|---|
| `vitesse` | $v$ **au repère courant** (pas au point B) | m·s⁻¹ | 3 c.s. | c'est ce que la scène MONTRE, pas ce qu'un réglage demande (règle de la corde, ADR 0041) |
| `rayon` | $R$ — et, sur la droite, « **droite : pas de courbure** » | m | entier | le cas $R\to\infty$ se dit en mots, jamais par un nombre géant |
| `acceleration-normale` | $a_N$ | m·s⁻² | **3 c.s.** | §5.7 : c'est la précision qui rend l'invariant $a_N\times R$ vrai à l'écran |
| `acceleration-tangentielle` | $a_T = dv/dt$, **signée** | m·s⁻² | 3 c.s. (`+4,50` · `0,00` · `−4,50`) | le signe est l'objet du savoir-faire |
| `acceleration` | $\|\vec a\| = \sqrt{a_T^2+a_N^2}$ | m·s⁻² | 3 c.s. | **S4 et S5 seulement** |
| `produit-a-v` | $\vec a\cdot\vec v$, **signé** | **m²·s⁻³** | 3 c.s. | le savoir-faire du cadre, écrit avec son unité |
| `nature` | « accéléré » · « retardé » · « **uniforme** » | — | — | **S4 et S5 seulement**, et **après** la révélation : c'est la réponse |
| `aN-fois-R` | $a_N \times R$, calculé **sur les deux nombres affichés** | m²·s⁻² | 3 c.s. | l'invariant de S3 ; une **chaîne de calcul**, pas une valeur isolée |

> **La précision est un arbitrage entre deux mensonges.** Trop de chiffres, une
> valeur calculée se déguise en mesure ; trop peu, l'invariant devient faux à
> l'écran. **Trois chiffres significatifs** est le seul réglage qui tienne les
> deux, et voici la mesure qui le prouve : à deux chiffres, $4{,}05$ s'écrirait
> $4{,}1$ et $4{,}1\times20 = 82 \ne 81$ — l'invariant $a_N\times R = v^2$ serait
> **faux à l'écran**, sur le réglage (9 m·s⁻¹ ; 20 m). *C'est la seule raison des
> trois chiffres.*

### 5.7 Les tables de nombres — **toute l'arithmétique de la scène, vérifiée**

**A — $a_N = v^2/R$ au repère `entree`** (m·s⁻², 3 c.s.) :

| $v$ (m·s⁻¹) \ $R$ (m) | **10** | **15** | **20** | **30** |
|---|---|---|---|---|
| **9,0** | 8,10 | 5,40 | **4,05** | 2,70 |
| **12,0** | 14,4 | 9,60 | **7,20** | 4,80 |
| **18,0** | **32,4** | 21,6 | **16,2** | 10,8 |

*Vérifications : $81/10 = 8{,}10$ ✓ · $81/20 = 4{,}05$ ✓ · $144/15 = 9{,}60$ ✓ ·
$324/10 = 32{,}4$ ✓ · $324/20 = 16{,}2$ ✓ · $324/30 = 10{,}8$ ✓.*

**Les deux doublements que la scène exploite :** à $R$ fixé, $9 \to 18$ donne
$4{,}05 \to 16{,}2$ et $8{,}10 \to 32{,}4$ — **×4** ✓ ; à $v$ fixée,
$R : 20 \to 10$ donne $16{,}2 \to 32{,}4$ et $R : 30 \to 15$ donne
$10{,}8 \to 21{,}6$ — **×2** ✓.

**B — l'invariant $a_N \times R = v^2$, sur les valeurs AFFICHÉES** :

| $v$ | $v^2$ | $R=10$ | $R=15$ | $R=20$ | $R=30$ |
|---|---|---|---|---|---|
| 9,0 | **81,0** | $8{,}10\times10$ | $5{,}40\times15$ | $4{,}05\times20$ | $2{,}70\times30$ |
| 12,0 | **144** | $14{,}4\times10$ | $9{,}60\times15$ | $7{,}20\times20$ | $4{,}80\times30$ |
| 18,0 | **324** | $32{,}4\times10$ | $21{,}6\times15$ | $16{,}2\times20$ | $10{,}8\times30$ |

**Douze produits, trois valeurs, à l'affichage près.** C'est l'analogue exact du
$a\times L = 0{,}240$ du banc de diffraction, et il porte en plus une leçon : le
produit **est** $v^2$, que l'élève lit sur le compteur.

**C — $\|\vec a\| = \sqrt{a_N^2 + 4{,}50^2}$, aux régimes `gaz` ET `freinage`**
(m·s⁻², 3 c.s.) — **identique aux deux régimes, c'est le point** :

| $v$ \ $R$ | **10** | **15** | **20** | **30** |
|---|---|---|---|---|
| **9,0** | 9,27 | 7,03 | **6,05** | 5,25 |
| **12,0** | 15,1 | 10,6 | **8,49** | 6,58 |
| **18,0** | 32,7 | 22,1 | **16,8** | 11,7 |

*Vérifications : $\sqrt{16{,}2^2+4{,}5^2} = \sqrt{262{,}44+20{,}25} = \sqrt{282{,}69}
= 16{,}814 \to 16{,}8$ ✓ · $\sqrt{7{,}20^2+4{,}5^2} = \sqrt{51{,}84+20{,}25}
= \sqrt{72{,}09} = 8{,}4906 \to 8{,}49$ ✓ · $\sqrt{4{,}05^2+4{,}5^2} =
\sqrt{16{,}4025+20{,}25} = \sqrt{36{,}6525} = 6{,}054 \to 6{,}05$ ✓ ·
$\sqrt{32{,}4^2+4{,}5^2} = \sqrt{1049{,}76+20{,}25} = \sqrt{1070{,}01} = 32{,}711
\to 32{,}7$ ✓ · $\sqrt{10{,}8^2+4{,}5^2} = \sqrt{136{,}89} = 11{,}700 \to 11{,}7$ ✓.
Au régime `tenue`, $\|\vec a\| = a_N$ : la table A.*

**D — $\vec a\cdot\vec v = a_T\,v$** (m²·s⁻³) :

| $v$ | `gaz` (+4,50) | `tenue` (0) | `freinage` (−4,50) |
|---|---|---|---|
| 9,0 | **+40,5** | **0** | **−40,5** |
| 12,0 | **+54,0** | **0** | **−54,0** |
| 18,0 | **+81,0** | **0** | **−81,0** |
| `nature` | **accéléré** | **uniforme** | **retardé** |

**E — ce que la piste fait le long de l'arc** ($R = 20$ m, $v_B = 18{,}0$) :

| repère | $\ell$ (m) | `tenue` : $v$ / $a_N$ | `gaz` : $v$ / $a_N$ | `freinage` : $v$ / $a_N$ |
|---|---|---|---|---|
| `approche` | −6,00 | 18,0 / **0,00** | 16,4 / **0,00** | 19,4 / **0,00** |
| `entree` | 0 | 18,0 / 16,2 | **18,0 / 16,2** | **18,0 / 16,2** |
| `milieu` | +4,89 | 18,0 / 16,2 | 19,2 / 18,4 | 16,7 / 14,0 |
| `sortie` (C) | +9,77 | 18,0 / 16,2 | **20,3** / 20,6 | 15,4 / 11,8 |

*Vérifications : gaz, $\ell = 9{,}774$ : $v^2 = 324 + 2\times4{,}5\times9{,}774 =
411{,}96 \Rightarrow v = 20{,}297 \to 20{,}3$ et $a_N = 411{,}96/20 = 20{,}598 \to
20{,}6$ ✓ · gaz, $\ell = 4{,}887$ : $v^2 = 367{,}98 \Rightarrow 19{,}18 \to 19{,}2$,
$a_N = 18{,}399 \to 18{,}4$ ✓ · freinage, $\ell = 9{,}774$ : $v^2 = 236{,}04
\Rightarrow 15{,}363 \to 15{,}4$, $a_N = 11{,}802 \to 11{,}8$ ✓ · approche gaz :
$v^2 = 324 - 54 = 270 \Rightarrow 16{,}43 \to 16{,}4$ ✓.*

> **Le nombre qui ferme la boucle, et qui justifie $R = 20$ m :** gaz gardés, la
> moto quitte la piste en C à **20,3 m·s⁻¹**. Le sujet 2019 N **donne**
> $V_C = 20$ m·s⁻¹ (partie II). **Écart : 1,5 %.** La scène **ne prétend pas**
> retrouver ce nombre — le sujet ne dit rien du tremplin et $V_C$ y est une
> donnée — mais c'est ce qui rend $R = 20$ m défendable plutôt qu'arbitraire, et
> c'est écrit dans les lignes d'honnêteté (§10.7).

### 5.8 Les échelles du dessin — **trois, déclarées, constantes**

C'est la décision d'honnêteté la plus lourde de cette scène, et elle est
**l'inverse** de celle du banc de diffraction : ici, **rien n'est exagéré**.

| échelle | ce qu'elle mesure | plage utile | déclarée par |
|---|---|---|---|
| **géométrique** | les mètres de piste, **identique en $x$ et en $y$** | 13,8 à 23,5 m de large | une **règle d'échelle** posée sur la scène (« 5 m ») |
| **des vitesses** | la longueur de la flèche $\vec v$ | 0 à 20,8 m·s⁻¹ | une **flèche-témoin** (« 10 m·s⁻¹ ») |
| **des accélérations** | la longueur des flèches $\vec a$, $a_T\vec u_T$, $a_N\vec u_N$ | 0 à 32,7 m·s⁻² | une **flèche-témoin** (« 10 m·s⁻² ») |

**Quatre conséquences, toutes gardées par la porte :**

1. **Les trois facteurs ne changent JAMAIS avec le réglage** (§11.2,
   `echelle-constante`). Un cadrage « pour que ça rende bien » à chaque cran est
   exactement le défaut que le banc de diffraction a trouvé dans un SVG du corpus.
2. **La géométrie n'est pas exagérée.** Un virage de 20 m de rayon qui ne tourne
   que de 28° **est** une courbe douce : sa flèche d'arc vaut
   $R(1-\cos14°) = 0{,}594$ m pour une corde de 9,68 m. **La scène le montre tel
   quel** ; ce qui saute aux yeux, c'est la **rotation de 28°** des vecteurs, pas
   une courbure gonflée. *Ligne d'honnêteté §10.5.*
3. **La flèche de $\vec v$ et celle de $\vec a$ ne se comparent pas** : deux
   grandeurs différentes, deux échelles différentes, deux témoins distincts.
   *Ligne d'honnêteté §10.1 — et c'est le piège classique des figures de manuel.*
4. **$\vec u_T$ et $\vec u_N$ sont des vecteurs UNITAIRES** : leur longueur
   dessinée est **une convention, la même partout**, et elle ne mesure rien.
   *Ligne d'honnêteté §10.2 ; la porte vérifie qu'elle est identique aux 36
   réglages.*

**Le centre de courbure.** Il est marqué (un point + le rayon en trait
interrompu) **quand il tombe dans le plateau** — ce qui est le cas pour $R = 10$,
$15$ et $20$ m à la largeur de bureau. Pour $R = 30$ m il sort du cadre : la
scène dessine alors le rayon **jusqu'au bord**, étiqueté « vers le centre du
virage — à 30 m ». *La porte ne juge jamais la direction de $\vec u_N$ sur le
point dessiné, mais sur l'**angle** avec la tangente (§11.2).*

---

## 6. La course, et la langue visuelle

### 6.1 Oui, une course — et le pari reste entier AVANT tout mouvement

`temps: false`, **`course: true`**, `revele_apres_course: 1` aux cinq étapes.
Même régime que la cuve, la corde, les noyaux, le manège et la particule.

**Pourquoi une course, ici, et pas un simple curseur.** Le fait à montrer est
*qu'un nombre ne bouge pas pendant qu'un vecteur tourne*. Un nombre qui ne bouge
pas ne se constate qu'**en le regardant ne pas bouger**, donc dans le temps. Et
la composante normale doit **apparaître** : elle n'existe pas sur la droite, elle
existe dans l'arc. On ne voit naître une chose qu'en franchissant l'instant où
elle naît.

**Ce que la course est, exactement.** Elle part de **9,0 m avant B**, sur la
droite inclinée, et **s'arrête au point B**, premier point de l'arc. Elle ne
traverse pas l'arc : c'est le contrôle `position` qui le fait, à la main, après.
*Précédent : la cuve « s'arrête au prochain maximum, et la légende dit
l'instant » ; le manège ouvre `instant` pour reparcourir la même course à la
main.*

**Comment le pari reste avant tout mouvement** (ADR 0041 §6 et son addendum du
2026-09-23 soir) :

- tant que l'élève n'a pas choisi, **le bouton « Lancer » n'existe pas dans le
  DOM** — ni le contrôle de l'étape, ni le verdict, ni aucune lecture-réponse ;
- la scène montre l'**énoncé arrêté** : la piste à l'encre, la moto au départ,
  $\vec v$ et $\vec u_T$ à l'encre, les valeurs que la consigne vient d'énoncer ;
- **aucune flèche d'accélération, à aucun moment, avant l'engagement** — même sur
  la droite, même quand $a_T \ne 0$ : $\vec a$ est **l'objet-réponse** de cette
  scène, et il n'a pas d'existence d'énoncé (§7.6) ;
- après l'engagement : la moto part, le compteur vit, et **à l'arrivée en B la
  flèche normale apparaît**. C'est **la scène qui répond, avant le texte**.

**Le ralenti est déclaré, et constant : ×6.** 1 seconde à l'écran = 0,167 s
réelle. Une course dure de **3,0 s** (18 m·s⁻¹, vitesse tenue : 9,0 m parcourus
en 0,50 s réelle) à **6,0 s** (9 m·s⁻¹, tenue). *Sans ralenti, la course la plus
rapide durerait un demi-battement de cil : ce serait une animation décorative, ce
que DESIGN-BIBLE interdit.* **Les vitesses affichées sont les vraies**, et le
facteur **ne change jamais avec le réglage** — la porte le mesure **contre
l'horloge**, pas contre les pas demandés (leçon de la cuve, ADR 0041 §6 de son
addendum).

**Vitesses de départ de la course** ($\ell = -9{,}0$ m) : `tenue` → $v_B$ ;
`gaz` → $\sqrt{v_B^2-81}$, soit **0** (9 m·s⁻¹, la moto part **du repos**, comme
dans le sujet), **7,94** (12), **15,6** (18) ; `freinage` → $\sqrt{v_B^2+81}$,
soit **12,7**, **15,0**, **20,1**. *Vérifications : $\sqrt{144-81} = \sqrt{63} =
7{,}937$ ✓ · $\sqrt{324-81} = \sqrt{243} = 15{,}588$ ✓ · $\sqrt{405} = 20{,}125$ ✓.*

**Éclairs et mouvement réduit.** Un point qui translate et deux flèches qui
tournent ne produisent **aucune paire de variations opposées** : le critère WCAG
2.3.1 est structurellement satisfait — **et mesuré quand même** (§11.3,
`eclairs`, *attendu structurellement vide*), parce qu'une chose n'est prouvée
absente que si l'on a énuméré ses formes (ADR 0036). Sous
`prefers-reduced-motion`, la course **calcule sans animer** et montre l'image
finale (bouton « Image finale » pour tous), comme la cuve. **Toute courbe ou
trajectoire tracée l'est sur une grille FIXE** (règle de la corde) — ici, la
piste est fixe par construction, et la seule chose qui bouge est la moto.

**Aucune trace entre étapes** : chaque étape repart de son état déclaré.
**Aucune VUE** : la scène est plane et n'a qu'un point de vue ; les trois vues
prédéfinies de l'ADR 0041 §4 sont l'équivalent clavier d'un glisser qui n'existe
pas ici.

### 6.2 La langue visuelle (DESIGN-BIBLE §0, §5, §7 ; ADR 0041 §4)

- **À l'ENCRE — c'est l'ÉNONCÉ** : la **piste** (droite inclinée + arc), le repère
  **B** et le repère **C**, l'horizontale en trait interrompu et les angles $10°$
  et $18°$, la **moto réduite à son centre d'inertie G**, la **flèche $\vec v$**,
  le **vecteur unitaire $\vec u_T$**, les **trois témoins d'échelle**, le
  **compteur de vitesse**, et la **flèche de référence** (`reference: depart`) une
  fois qu'elle n'est plus le réglage courant.
  *Corollaire du manège, appliqué à la lettre : une donnée de l'énoncé ne se peint
  jamais dans la couleur de la réponse.*
- **À l'ACCENT — et seulement après la révélation** : $\vec u_N$, la flèche
  $a_N\vec u_N$, la flèche $a_T\vec u_T$, la **flèche $\vec a$** et le
  parallélogramme qui la décompose, le **centre de courbure** et son rayon en
  trait interrompu, l'étiquette de $\vec a\cdot\vec v$.
- **$\vec u_N$ n'est dessiné que là où la trajectoire TOURNE.** Sur la droite, la
  normale n'a pas de côté concave : l'orienter serait inventer une information.
  La scène y montre $\vec u_T$ seul et la lecture `rayon` dit « droite : pas de
  courbure ». *Point de rigueur, et il est vrai : $\vec u_N$ se définit par
  $d\vec u_T/ds = \vec u_N / R$, qui est $\vec 0$ sur une droite.*
- **Le centre de courbure est une RÉPONSE, jamais l'énoncé.** Le marquer avant le
  pari, c'est dessiner la direction que S1 demande. La valeur de $R$ est donnée
  **en nombre** dans la consigne et dans la lecture `rayon` ; **le point, lui,
  n'apparaît qu'après**. *C'est la ligne la plus fine de cette scène (§7.6).*
- **Toutes les échelles sont linéaires**, et la géométrique est **isotrope**
  (même facteur en $x$ et en $y$) — sans quoi les angles dessinés seraient faux
  (§9.13).
- **Aucune teinte hors jetons** : toutes les couleurs sont lues sur les jetons
  `--figure-*` à l'exécution (`lib/jetons-figure.ts`, **pas**
  `scene3d/palette.ts`, qui importerait three), et relues au changement de thème.
- **$\vec u_T$, $\vec u_N$, $a_T$, $a_N$, $\vec a\cdot\vec v$ passent par KaTeX**,
  jamais par la police du chrome (ADR 0030, addendum : Geist dessine $\omega$
  comme $\Omega$ — le même piège guette les indices et le point du produit
  scalaire).
- **Les étiquettes se posent avec `disposer`, jamais `poser`** : à `milieu`, les
  étiquettes $\vec v$, $\vec u_T$, $\vec u_N$, $a_T$, $a_N$, $\vec a$ et « C »
  vivent toutes dans un rayon de 200 px. *Obligatoire ici ; famille `etiquettes`
  à 1 280 **et** à 390 px.*
- **La valeur qu'on règle et la valeur qu'on lit vont ENSEMBLE sur la scène
  collante** (leçon de la vague 2 du banc) : « $R = 20$ m » sur le rayon,
  « $v = 18{,}0$ m·s⁻¹ » au compteur, « $a_N = 16{,}2$ m·s⁻² » le long de sa
  flèche. La liste des lectures défile ; la scène, non.

---

## 7. Les cinq étapes

Notation : `⟂-avant-pari` = ce qui doit être **absent du DOM et du rendu** tant
que l'élève n'a pas parié (ADR 0041 §6 + addendum du 2026-09-23 soir : *tout ce
qui dépend de l'ISSUE attend la révélation*).

### 7.1 S1 — `le-virage-a-vitesse-tenue` · « Le tremplin, à vitesse tenue »

- **État :** `v_ms: "18"`, `R_m: "20"`, `regime: "tenue"`, `repere: "approche"`,
  `reference: "aucune"`.
- **`etat_revele` :** `repere: "entree"`.
- **Contrôle ouvert :** `position` (**neuf**). **Lectures :** `vitesse`, `rayon` —
  et `acceleration-normale` **après révélation seulement**.
- **Consigne (voix) :** « La piste du sujet national de 2019, vue de côté. À
  gauche, une partie rectiligne qui descend, inclinée de 10 degrés. Elle se
  raccorde en B à un **tremplin circulaire de 20 mètres de rayon**, qui relève la
  piste jusqu'au point C — où la piste s'arrête. Le motard aborde le tremplin à
  **18 mètres par seconde**, environ 65 km/h, et il **tient exactement cette
  vitesse** : le compteur affiche 18 à l'entrée du virage, 18 au milieu, 18 à la
  sortie. Deux choses sont dessinées au point où il se trouve : sa **vitesse**,
  tangente à la piste, et $\vec u_T$, le vecteur **unitaire** qui porte cette
  tangente — sa longueur dessinée est une convention, elle ne mesure rien. »
- **Pari :** « Lance la moto. Au moment où elle entre dans le tremplin, en B, son
  vecteur **accélération**… »

| choix | texte | juste | misconception | retour (casse sur SA conséquence) |
|---|---|---|---|---|
| `nulle` | est **nul** : la vitesse ne change pas, donc il n'y a pas d'accélération | non | **`acceleration-traitee-comme-un-nombre`** *(nouveau, §8.2 ; forme A — une seule composante)* | « Regarde le compteur pendant toute la course : **18,0** du début à la fin, et pourtant une flèche vient d'apparaître en B. Elle mesure **16,2 m·s⁻²** — plus de **trois fois et demie** l'accélération que la moto avait sur la pente. Ce qui ne change pas, c'est le **nombre** 18. Le **vecteur** vitesse, lui, va tourner de **28 degrés** entre B et C : même longueur, autre direction. Et l'accélération mesure la variation du **vecteur**, pas celle du nombre. » |
| `vers-lavant` | est dirigé **vers l'avant**, dans le sens du mouvement : il faut bien quelque chose pour entraîner la moto dans le virage | non | **`force-entretient-mouvement`** | « Le compteur ne bouge pas : 18,0 à l'entrée, 18,0 au milieu, 18,0 en C. Une accélération dirigée vers l'avant **ferait grandir la vitesse** — c'est sa définition même. La flèche qui apparaît est **perpendiculaire** à la trajectoire : elle n'entraîne rien, elle **fait tourner**. Fais glisser la moto sur les quatre repères, et lis le compteur à chacun. » |
| `vers-le-centre` | est **perpendiculaire** à la vitesse, dirigé vers **l'intérieur** du virage | **oui** | — | « Oui. La flèche pointe vers le **centre** du tremplin — le centre du cercle dont l'arc B-C est une portion — et vaut **16,2 m·s⁻²**. C'est la **composante normale** de l'accélération, $a_N$, portée par le vecteur unitaire $\vec u_N$ qui va, par définition, **vers le centre de courbure**. Elle n'existe que là où la trajectoire tourne : sur la droite, avant B, la scène n'a dessiné aucune flèche, et la lecture disait « droite : pas de courbure ». » |
| `vers-lexterieur` | est perpendiculaire à la vitesse, dirigé vers l'**extérieur** du virage : dans un virage, on est projeté vers l'extérieur | non | **`acceleration-traitee-comme-un-nombre`** *(forme B — la normale mal orientée)* | « La sensation est réelle ; la conclusion est retournée. Regarde la piste : entre B et C, elle s'incurve **vers le haut**, du côté du centre du cercle. Une accélération dirigée vers l'extérieur courberait la trajectoire **de l'autre côté** — la moto quitterait la piste au lieu de la suivre. L'accélération pointe **toujours** du côté vers lequel la trajectoire tourne : c'est ce que « vers le centre de courbure » veut dire. Ce que tu sens vers l'extérieur, c'est ton propre corps qui continue **tout droit** pendant que la moto tourne sous toi — exactement le passager du bus qui freine, au chapitre 2. » |

*(Arithmétique des retours, vérifiée. $a_N = 18^2/20 = 324/20 = 16{,}2$ m·s⁻² ✓.
$16{,}2/4{,}5 = 3{,}6$ — « plus de trois fois et demie » ✓. La rotation
$18° - (-10°) = 28°$ ✓, §5.1.)*

- **`suite` (35 mots) :** « Promène la moto sur les quatre repères — approche,
  entrée, milieu, sortie. Sur la droite : aucune flèche, et « pas de courbure ».
  Dans l'arc : **16,2** partout, toujours vers le centre, et la flèche tourne avec
  la moto. »
- **⟂-avant-pari :** **toute** flèche d'accélération ; $\vec u_N$ ; le **centre de
  courbure** et son rayon ; la lecture `acceleration-normale` ; le bouton
  « Lancer » ; le verdict ; **tout pixel d'accent** (mesuré en **chrominance**) ;
  la description lue au lecteur d'écran ne doit contenir ni « perpendiculaire »,
  ni « centre », ni « 16,2 », ni « normale ».
  **Reste visible (l'énoncé) :** la piste entière à l'encre avec B et C,
  l'horizontale interrompue et les angles $10°$ / $18°$, la moto **arrêtée** au
  départ de la course, $\vec v$ et $\vec u_T$ à l'encre, les trois témoins
  d'échelle, le compteur à **18,0**, et les lectures `vitesse` et `rayon`
  (**20 m** — c'est la donnée de la consigne, en nombre ; le **point** central,
  lui, est la réponse).
- **Interdit dans les retours de S1 :** `v^2`, `v²`, `/R`, `\frac{v^2}{R}`,
  `dv/dt`, `a_T`, `a\cdot v` (§2.3). S1 n'établit que l'**existence** et la
  **direction**.

### 7.2 S2 — `deux-fois-plus-vite` · « Deux fois plus vite, même tremplin »

- **État :** `v_ms: "9"`, `R_m: "20"`, `regime: "tenue"`, `repere: "approche"`,
  `reference: "depart"`.
- **`etat_revele` :** `v_ms: "18"`, `repere: "entree"`.
- **Contrôle ouvert :** `vitesse` (**neuf**). **Lectures :** `vitesse`, `rayon`,
  `acceleration-normale`.
- **Consigne :** « Même tremplin — 20 mètres de rayon, **on n'y touchera plus** —
  et le motard tient toujours sa vitesse. Mais il aborde le virage **deux fois
  moins vite** : **9,0 mètres par seconde**. À l'entrée, la flèche vers le centre
  mesure **4,05 m·s⁻²**. On va le renvoyer à **18,0**, deux fois plus vite, sur le
  même tremplin. »
- **Pari :** « À 18,0 m·s⁻¹ au lieu de 9,0, la flèche vers le centre mesurera… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `deux-fois` | **8,10 m·s⁻²** — deux fois plus : l'accélération suit la vitesse | non | **`acceleration-traitee-comme-un-nombre`** *(forme C — la loi perdue, version linéaire)* | « La flèche affiche **16,2**, pas 8,10 : **quatre fois** plus, pas deux. Le doublement de la vitesse agit **deux fois** — la moto passe par chaque point du virage deux fois plus vite, **et** sa direction doit tourner deux fois plus vite aussi. Deux effets qui se multiplient : c'est la **vitesse au carré** qui est au numérateur, et $2^2 = 4$. » |
| `quatre-fois` | **16,2 m·s⁻²** — quatre fois plus | **oui** | — | « Oui, et retiens la forme exacte de ce résultat : c'est **$v$ au carré** qui est au numérateur. Doubler la vitesse **quadruple** la composante normale. Parcours les trois crans sans toucher au tremplin : **4,05**, **7,20**, **16,2** — et compare-les aux carrés 81, 144, 324. Les deux suites sont dans le même rapport. » |
| `inchangee` | **4,05 m·s⁻²** — inchangée : c'est le virage qui décide, et il n'a pas changé | non | **`acceleration-traitee-comme-un-nombre`** *(forme C — la vitesse absente de la loi)* | « Le virage n'a effectivement pas changé, et la flèche a changé quand même : **4,05** puis **16,2**. Le virage fixe la **forme** de la trajectoire ; la vitesse décide **à quelle cadence** on la parcourt. Passe les trois crans à tremplin fixe et lis : 4,05 · 7,20 · 16,2. » |
| `moitie` | **2,03 m·s⁻²** — deux fois moins : plus on va vite, **moins on a le temps** de tourner dans le virage | non | **`acceleration-traitee-comme-un-nombre`** *(forme C — la loi retournée)* | « « Moins de temps » est vrai, et il joue **contre** ton intuition : c'est justement parce que le même changement de direction doit être fait en **deux fois moins de temps** que l'accélération est plus grande, pas plus petite. L'accélération, c'est *par seconde* — moins de secondes pour la même rotation, donc davantage à chaque seconde. La flèche affiche **16,2**. » |

*(Arithmétique vérifiée. $9^2/20 = 81/20 = 4{,}05$ ✓ · $18^2/20 = 16{,}2$ ✓ ·
$12^2/20 = 7{,}20$ ✓ · le distracteur `deux-fois` $= 2\times4{,}05 = 8{,}10$ ✓,
qui est aussi $a_N$ de (9 ; 10 m) — la scène ne peut pas l'atteindre à S2,
`rayon` étant fermé · `moitie` $= 4{,}05/2 = 2{,}025 \to 2{,}03$ ✓ ·
$4{,}05 : 7{,}20 : 16{,}2 = 81 : 144 : 324$ ✓.)*

- **`suite` (38 mots) :** « Repasse les trois vitesses sans toucher au tremplin :
  9,0 · 12,0 · 18,0 donnent **4,05** · **7,20** · **16,2**. Écris les carrés à
  côté : 81 · 144 · 324. Les deux suites sont dans le même rapport, exactement. »
- **⟂-avant-pari :** la flèche du réglage à 18 ; la référence une fois qu'elle
  diffère du courant ; **toute** flèche d'accélération ; $\vec u_N$ ; le centre ;
  `acceleration-normale` ; le bouton « Lancer » ; le verdict ; tout pixel
  d'accent ; la description lue ne doit contenir ni « quatre », ni « carré », ni
  « 16,2 ».
  **Reste visible :** la piste à l'encre, la moto au départ, le compteur à
  **9,0**, la lecture `rayon` = 20 m, et la lecture `acceleration-normale` à sa
  valeur de départ **4,05** — *c'est la mesure que la consigne vient d'énoncer,
  et la scène l'a déjà montrée à l'étape 1 sur un autre réglage : c'est un acquis,
  pas une réponse.*
- **Interdit dans les retours de S2 :** `/R`, `\frac{v^2}{R}`, `dv/dt`, `a_T`,
  `a\cdot v`. S2 peut écrire « $v$ au carré, au numérateur » ; **elle ne peut pas
  écrire la fraction**.

### 7.3 S3 — `deux-fois-plus-serre` · « Deux fois plus serré, même vitesse »

C'est l'étape qui **ferme la relation** $a_N = v^2/R$.

- **État :** `v_ms: "18"`, `R_m: "30"`, `regime: "tenue"`, `repere: "approche"`,
  `reference: "depart"`.
- **`etat_revele` :** `R_m: "15"`, `repere: "entree"`.
- **Contrôle ouvert :** `rayon` (**neuf**). **Lectures :** `vitesse`, `rayon`,
  `acceleration-normale` — et `aN-fois-R` **après révélation seulement**.
- **Consigne :** « Le motard revient à **18,0 mètres par seconde** et tient sa
  vitesse, **on n'y touchera plus**. C'est le tremplin qui change : il est
  maintenant très ouvert, **30 mètres de rayon**, et la flèche vers le centre
  mesure **10,8 m·s⁻²**. On va le **resserrer à 15 mètres** — deux fois plus
  serré, à la même vitesse. »
- **Pari :** « Sur un tremplin deux fois plus serré, à la même vitesse, la flèche
  vers le centre mesurera… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `moitie` | **5,40 m·s⁻²** — deux fois moins : un virage plus serré, c'est moins de place, donc moins d'accélération | non | **`acceleration-traitee-comme-un-nombre`** *(forme C — le rayon au numérateur)* | « La flèche affiche **21,6** : deux fois **plus**. Le rayon est au **dénominateur**, et la scène te donne le contrôle qui le prouve en trois secondes : parcours les quatre tremplins à 18,0 m·s⁻¹ et lis 32,4 · 21,6 · 16,2 · 10,8 quand le rayon va de 10 à 30. Plus serré, plus de flèche : c'est le virage le plus serré qui demande le plus de changement de direction par mètre parcouru. » |
| `double` | **21,6 m·s⁻²** — deux fois plus | **oui** | — | « Oui, et la relation est maintenant complète, puisqu'on a fait varier les deux grandeurs : $$a_N = \dfrac{v^2}{R}$$ La vitesse **au carré** au numérateur, le **rayon de courbure** au dénominateur. Vérifie-la autrement, sans division : multiplie les deux nombres affichés. $10{,}8\times30 = 324$. $21{,}6\times15 = 324$. Et $324$, c'est $18^2$ — le carré de la vitesse que tu lis sur le compteur. » |
| `quatre-fois` | **43,2 m·s⁻²** — quatre fois plus : comme pour la vitesse, l'effet est au carré | non | **`acceleration-traitee-comme-un-nombre`** *(forme C — le carré mis au mauvais endroit)* | « Le carré existe, et il n'est pas là. La flèche affiche **21,6**, exactement le double. Contrôle-le sur la paire de tremplins que la scène te laisse : 10 et 20 mètres donnent **32,4** et **16,2** — un facteur deux, pas quatre. Le carré porte sur la **vitesse** ; le rayon, lui, agit au premier degré. » |
| `inchangee` | **10,8 m·s⁻²** — inchangée : la vitesse n'a pas bougé, et c'est elle qui décide | non | **`acceleration-traitee-comme-un-nombre`** *(forme C — le rayon absent de la loi)* | « La vitesse n'a effectivement pas bougé, et la flèche a changé quand même : **10,8** puis **21,6**. À vitesse égale, c'est la **forme** du virage qui décide de combien la direction doit tourner à chaque mètre. Parcours les quatre tremplins : 32,4 · 21,6 · 16,2 · 10,8. » |

*(Arithmétique vérifiée. $324/30 = 10{,}8$ ✓ · $324/15 = 21{,}6$ ✓ ·
$324/10 = 32{,}4$ ✓ · $324/20 = 16{,}2$ ✓ · le distracteur `quatre-fois`
$= 4\times10{,}8 = 43{,}2$ ✓, valeur que la scène **ne peut pas atteindre**
(il faudrait $R = 7{,}5$ m) · `moitie` $= 5{,}40$ ✓, qui est $a_N$ de (9 ; 15) —
inatteignable à S3, `vitesse` étant fermée · les douze produits $a_N\times R$ :
table B du §5.7 ✓.)*

- **`suite` (40 mots) :** « Parcours les quatre tremplins à 18,0 m·s⁻¹ et
  multiplie chaque fois les deux nombres affichés : $32{,}4\times10$ ;
  $21{,}6\times15$ ; $16{,}2\times20$ ; $10{,}8\times30$. Toujours **324**. Et 324
  est le carré de 18, la vitesse au compteur. »
- **⟂-avant-pari :** la flèche du tremplin à 15 m ; la référence une fois qu'elle
  diffère ; toute flèche d'accélération ; $\vec u_N$ ; le centre ; `aN-fois-R` ;
  le bouton « Lancer » ; le verdict ; tout pixel d'accent ; la description lue ne
  doit contenir ni « double », ni « dénominateur », ni « 21,6 ».
  **Reste visible :** la piste à l'encre **avec son arc de 30 m**, la moto au
  départ, le compteur à **18,0**, `rayon` = 30 m, `acceleration-normale` = **10,8**
  (la mesure que la consigne énonce).
- **Interdit dans les retours de S3 :** `dv/dt`, `a_T`, `\vec u_T`, `a\cdot v`.
  S3 **peut** écrire $a_N = v^2/R$ ; elle ne peut pas écrire la relation
  vectorielle entière, qui est le pari de S4.

### 7.4 S4 — `gaz-ou-frein` · « Il garde les gaz »

- **État :** `v_ms: "18"`, `R_m: "20"`, `regime: "tenue"`, `repere: "approche"`,
  `reference: "depart"`.
- **`etat_revele` :** `regime: "gaz"`, `repere: "entree"`.
- **Contrôle ouvert :** `pilotage` (**neuf**). **Lectures :** `vitesse`, `rayon`,
  `acceleration-normale`, `acceleration-tangentielle` — et `acceleration`,
  `produit-a-v`, `nature` **après révélation seulement**.
- **Consigne :** « Retour au tremplin de **20 mètres**, abordé à **18,0 m·s⁻¹**,
  avec sa flèche de **16,2 m·s⁻²** tournée vers le centre. Jusqu'ici le motard
  **tenait** sa vitesse. Cette fois il **garde les gaz** : en entrant dans le
  virage, sa vitesse gagne **4,50 mètres par seconde chaque seconde** — c'est
  exactement l'accélération qu'il avait sur la partie droite, celle du sujet. »
- **Pari :** « Avec les gaz, à l'entrée du tremplin, le vecteur accélération… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `somme-des-nombres` | pointe toujours **exactement vers le centre**, mais plus long : **20,7 m·s⁻²**, c'est-à-dire $16{,}2 + 4{,}5$ | non | **`resultante-mal-composee`** | « Deux vecteurs qui ne sont pas dans la même direction ne s'additionnent pas comme deux nombres. Ceux-ci sont **perpendiculaires** : 16,2 vers le centre, 4,50 vers l'avant. La scène dessine le rectangle qu'ils ferment, et sa diagonale mesure $\sqrt{16{,}2^2 + 4{,}50^2} = \sqrt{282{,}69} = \mathbf{16{,}8}$ m·s⁻² — **moins** que ta somme, et **pas dans la même direction** : elle penche vers l'avant. » |
| `bascule-vers-lavant` | **bascule vers l'avant** : il garde sa composante vers le centre (**16,2**) et gagne une composante dans le sens du mouvement (**4,50**) ; l'ensemble mesure **16,8 m·s⁻²** | **oui** | — | « Oui — et voici la relation entière, maintenant qu'on a fait varier les trois choses : $$\vec a = \dfrac{dv}{dt}\,\vec u_T + \dfrac{v^2}{R}\,\vec u_N$$ Une composante **tangentielle**, $dv/dt$, qui dit comment la vitesse **grandit ou diminue** ; une composante **normale**, $v^2/R$, qui dit comment la direction **tourne**. Les deux sont perpendiculaires, et la norme vaut $\sqrt{4{,}50^2+16{,}2^2} = 16{,}8$. Une nouvelle lecture apparaît : $\vec a\cdot\vec v = \mathbf{+81{,}0}$ m²·s⁻³. Elle vaut $\frac{dv}{dt}\times v$ — la composante normale **disparaît du produit**, parce qu'elle est perpendiculaire à la vitesse. Son signe donne la **nature** du mouvement : positif, **accéléré**. » |
| `tout-vers-lavant` | se couche **entièrement** dans le sens du mouvement : **4,50 m·s⁻²**, puisque c'est la vitesse qui augmente | non | **`force-liee-a-vitesse`** | « La composante vers l'avant est juste — c'est bien 4,50 — mais elle n'a pas chassé l'autre. Le virage n'a pas disparu parce qu'on a mis les gaz : le rayon est toujours de 20 mètres et la direction doit toujours tourner. La flèche vers le centre est toujours là, à **16,2**, et la scène dessine les deux. Un vecteur accélération n'est pas obligé d'être dans le sens du mouvement — la leçon le dira trois lignes plus bas. » |
| `inchangee` | **ne change pas** : **16,2 m·s⁻²** vers le centre — c'est le virage qui décide de l'accélération | non | **`acceleration-traitee-comme-un-nombre`** *(forme A — une seule composante, l'autre face)* | « À l'étape 1, la vitesse ne changeait pas et tu as vu une flèche apparaître : la **direction** qui tourne compte. Ici, c'est la **norme** qui change en plus — et elle compte tout autant. La flèche mesure maintenant **16,8** et **penche vers l'avant** : elle a gardé ses 16,2 vers le centre **et** gagné 4,50 vers l'avant. Les deux façons de changer s'ajoutent, comme deux côtés d'un rectangle. » |

*(Arithmétique vérifiée. $\sqrt{16{,}2^2+4{,}50^2} = \sqrt{262{,}44+20{,}25} =
\sqrt{282{,}69} = 16{,}814 \to 16{,}8$ ✓ · le distracteur `somme-des-nombres`
$16{,}2+4{,}5 = 20{,}7$ ✓ · $\vec a\cdot\vec v = 4{,}50\times18{,}0 = 81{,}0$
m²·s⁻³ ✓.)*

- **`suite` (42 mots) :** « Passe les trois régimes sans rien toucher d'autre :
  gaz, vitesse tenue, freinage. La flèche penche en avant, se redresse vers le
  centre, penche en arrière. $\vec a\cdot\vec v$ vaut **+81,0**, **0**, **−81,0**.
  Et la composante vers le centre ne bouge d'aucun chiffre : **16,2** dans les
  trois cas. »
- **⟂-avant-pari :** la flèche du régime `gaz` ; la référence une fois qu'elle
  diffère ; **toute** flèche d'accélération, y compris la normale de l'état de
  départ ; $\vec u_N$ ; le centre ; `acceleration`, `produit-a-v`, `nature` ; le
  bouton « Lancer » ; le verdict ; tout pixel d'accent ; la description lue ne
  doit contenir ni « bascule », ni « 16,8 », ni « accéléré ».
  **Reste visible :** la piste à l'encre, la moto au départ, le compteur à
  **18,0**, `rayon` = 20 m, `acceleration-normale` = **16,2** et
  `acceleration-tangentielle` = **0,00** — *ce sont les deux mesures de l'état
  que la consigne décrit ; ce qui est en jeu, c'est ce qu'elles deviennent.*

### 7.5 S5 — `libre` · « Tout s'ouvre : la nature du mouvement »

- **État :** `v_ms: "12"`, `R_m: "20"`, `regime: "freinage"`, `repere: "approche"`,
  `reference: "aucune"`.
- **`etat_revele` :** `repere: "entree"`.
- **Contrôles ouverts :** les **quatre** (`position`, `vitesse`, `rayon`,
  `pilotage`), tous rouverts. **Lectures :** les **huit**.
- **Pas de contrôle neuf** — S5 est l'étape de synthèse, et sa `suite` est une
  manœuvre en trois vérifications qui a besoin des quatre réglages. *(Même choix
  que la cuve, la corde et le banc à leur étape libre ; les noyaux, eux, gardaient
  un contrôle neuf. Écrit ici plutôt que découvert à la revue.)*
- **Consigne :** « Dernière situation, puis tout s'ouvre. Le motard aborde le
  tremplin de **20 mètres** à **12,0 m·s⁻¹** et il **freine** : sa vitesse perd
  **4,50 mètres par seconde chaque seconde** — la même intensité que les gaz de
  l'étape précédente, en sens inverse. »
- **Pari :** « À l'entrée du tremplin, la **nature** de son mouvement et la
  **norme** de son accélération sont… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `retarde-8-49` | **retardé** ; $\|\vec a\| = \mathbf{8{,}49}$ m·s⁻² | **oui** | — | « Oui, et les deux morceaux comptent. La **nature** : $\vec a\cdot\vec v = -4{,}50\times12{,}0 = \mathbf{-54{,}0}$ m²·s⁻³, négatif, donc **retardé** — la composante normale n'entre pas dans ce produit, elle est perpendiculaire à la vitesse. La **norme** : $\sqrt{4{,}50^2 + 7{,}20^2} = \sqrt{20{,}25+51{,}84} = \sqrt{72{,}09} = 8{,}49$ m·s⁻². Et refais maintenant le geste qui résume tout le chapitre : remets les **gaz** au même endroit. La norme redevient **8,49** — exactement la même — et $\vec a\cdot\vec v$ passe à **+54,0**. Deux mouvements de natures opposées, la **même** norme d'accélération. Seul le produit $\vec a\cdot\vec v$ les sépare : c'est pour cela que le programme le demande. » |
| `retarde-4-50` | **retardé** ; $\|\vec a\| = 4{,}50$ m·s⁻² — c'est le freinage qui donne l'accélération | non | **`acceleration-traitee-comme-un-nombre`** *(forme D — l'accélération réduite à un nombre signé)* | « La nature est juste, la norme ne l'est pas : la scène affiche **8,49**. 4,50 n'est qu'**une** des deux composantes, celle qui est le long du mouvement. L'autre, **7,20** vers le centre, existe aussi et elle est même **plus grande**. Un vecteur a une norme, pas un signe : $\sqrt{4{,}50^2+7{,}20^2} = 8{,}49$. Le signe, lui, vit dans $\vec a\cdot\vec v$, et c'est lui seul qui dit « retardé ». » |
| `accelere-8-49` | **accéléré** ; $\|\vec a\| = 8{,}49$ m·s⁻² — l'accélération n'est pas nulle, donc le mouvement est accéléré | non | **`acceleration-traitee-comme-un-nombre`** *(forme D — la nature lue sur la norme)* | « La norme est juste, la nature ne l'est pas. « Accéléré » ne veut pas dire « qui a une accélération » : **tout** mouvement courbe en a une. Cela veut dire « **dont la vitesse grandit** », et c'est le signe de $\vec a\cdot\vec v$ qui le dit : ici **−54,0**, donc **retardé**. Lis le compteur pendant la course : de 15,0 à 12,0 m·s⁻¹. Contrôle qui tranche pour toujours : à vitesse **tenue** dans le virage, $\vec a\cdot\vec v = 0$ et $\|\vec a\| = 7{,}20$ — mouvement **uniforme**, accélération **non nulle**. » |
| `retarde-2-70` | **retardé** ; $\|\vec a\| = 2{,}70$ m·s⁻² — on retranche le freinage de la composante vers le centre : $7{,}20 - 4{,}50$ | non | **`resultante-mal-composee`** | « On ne retranche que ce qui est sur la **même** droite. Ces deux composantes sont **perpendiculaires** : l'une ne peut ni renforcer ni annuler l'autre. La scène dessine le rectangle qu'elles ferment ; sa diagonale vaut $\sqrt{7{,}20^2+4{,}50^2} = \mathbf{8{,}49}$ — plus grande que chacune des deux, et non pas plus petite. Le contrôle d'ordre de grandeur : une diagonale est toujours plus longue qu'un côté. » |

*(Arithmétique vérifiée. $a_N = 12^2/20 = 144/20 = 7{,}20$ ✓ ·
$\sqrt{7{,}20^2+4{,}50^2} = \sqrt{51{,}84+20{,}25} = \sqrt{72{,}09} = 8{,}4906
\to 8{,}49$ ✓ · $\vec a\cdot\vec v = -4{,}50\times12{,}0 = -54{,}0$ ✓ ·
$7{,}20-4{,}50 = 2{,}70$ ✓ · vitesse au départ de la course en freinage :
$\sqrt{144+81} = \sqrt{225} = \mathbf{15{,}0}$ exactement ✓ — c'est le nombre que
le retour de `accelere-8-49` cite.)*

- **`suite` (40 mots) :** « Trois vérifications. Tremplin fixe, vitesse fixe :
  la norme est la même aux gaz et au frein, $\vec a\cdot\vec v$ change de signe.
  Vitesse tenue : $\vec a\cdot\vec v = 0$ partout, et la flèche n'est jamais
  nulle dans l'arc. Sur la droite : la composante vers le centre est nulle aux
  douze réglages. »
- **⟂-avant-pari :** **toute** flèche d'accélération ; $\vec u_N$ ; le centre ;
  `acceleration`, `produit-a-v`, `nature` ; le bouton « Lancer » ; le verdict ;
  tout pixel d'accent.
  **Reste visible :** la piste à l'encre, la moto au départ de la course, le
  compteur à **15,0** (la vitesse de départ, que le freinage ramènera à 12,0 en
  B), `rayon` = 20 m, `vitesse`, et la **description écrite** de la situation dans
  le pari — *c'est l'énoncé ; la nature et la norme sont la réponse.*

### 7.6 Le contrat « avant le pari », et la fuite entre les étapes

**Règle générale, valable aux cinq étapes, et plus stricte ici qu'ailleurs.**
Dans cette scène, **le vecteur accélération EST la réponse** — à toutes les
étapes, à tous les repères, y compris sur la droite où il n'est que tangentiel.
Il n'a donc **aucune existence d'énoncé** : avant l'engagement, **aucune flèche
d'accélération, aucun $\vec u_N$, aucun centre de courbure, aucun
parallélogramme, aucune lecture d'accélération qui n'ait été énoncée par la
consigne**, aucun verdict, et aucune phrase de lecteur d'écran qui les décrive.

Ce qui **reste**, c'est l'énoncé : la piste à l'encre, la moto **arrêtée** à son
départ, $\vec v$ et $\vec u_T$, les angles $10°$ / $18°$, les trois témoins
d'échelle, le compteur, et les **valeurs que la consigne vient d'énoncer**.

**Le contrat vaut ENTRE les étapes** (ADR 0041, addendum du soir du 2026-09-24 :
*ce qu'une étape révélée OUVRE ne doit pas atteindre l'état qu'un pari SUIVANT
fait deviner*). La porte **réécrit elle-même** cette table contre le descripteur
(§11.2, `fuite-inter-etapes`) :

| étape | contrôle ouvert | ce qu'il peut atteindre | un pari suivant est-il mis en danger ? |
|---|---|---|---|
| **S1** | `position` seul (4 repères) | le même réglage (18 ; 20 m ; tenue) en quatre lieux | **non** pour S2 : `vitesse` fermée, une seule vitesse. **non** pour S3 : `rayon` fermé. **non** pour S4 et S5 : `pilotage` fermé — aucune composante tangentielle n'est atteignable. |
| **S2** | `vitesse` seule (3 crans) | $a_N$ à trois vitesses, **sur le seul tremplin de 20 m**, à vitesse tenue | **non** pour S3 : `rayon` fermé — la variation en $R$ est hors d'atteinte. **non** pour S4/S5 : `pilotage` fermé. |
| **S3** | `rayon` seul (4 crans) | $a_N$ à quatre rayons, **à la seule vitesse 18,0**, à vitesse tenue | **non** pour S4/S5 : `pilotage` fermé. |
| **S4** | `pilotage` seul (3 régimes) | les trois régimes **à (18,0 ; 20 m) uniquement** | **non** pour S5 : `vitesse` fermée — le réglage qui tranche S5 est **(12,0 ; freinage ; 20 m)**, et **12,0 est inatteignable à S4**. |
| **S5** | les quatre | tout | — |

**Une fuite molle, écrite franchement.** Un élève qui a fait S4 arrive à S5 en
sachant que *freiner* donne un $\vec a\cdot\vec v$ négatif et que la flèche
penche en arrière. **Ce n'est pas une fuite au sens de la règle** : la règle
interdit d'**atteindre l'état** qu'un pari fait deviner, pas de comprendre la
physique qui y mène — et **les deux nombres** que S5 demande (8,49 et −54,0) ne
sont produits par aucun réglage accessible avant S5. C'est volontaire : **S5 doit
être gagnable par le raisonnement.**

**Une fuite par le TEXTE, et c'est la plus dangereuse ici.** La relation
$\vec a = \frac{dv}{dt}\vec u_T + \frac{v^2}{R}\vec u_N$ contient les **quatre**
réponses. La porte la garde dans les deux sens (§11.2, `formule-graduee`) :

| après la révélation de… | chaînes **autorisées** dans le panneau | chaînes **interdites** |
|---|---|---|
| **S1** | « composante normale », « vers le centre », $a_N$ **comme nombre lu**, $\vec u_N$ | `v^2`, `v²`, `/R`, `\frac{v^2}{R}`, `dv/dt`, `a_T`, `\vec u_T` **en position de composante**, `a\cdot v`, `\vec a\cdot\vec v` |
| **S2** | « $v$ au carré », « au numérateur », `v^2` | `/R`, `\frac{v^2}{R}`, `dv/dt`, `a_T`, `a\cdot v` |
| **S3** | $a_N = \dfrac{v^2}{R}$ **entière**, $a_N\times R$ | `dv/dt`, `a_T`, `a\cdot v`, `\|\vec a\|`, « tangentielle » |
| **S4, S5** | tout, y compris $\vec a = \frac{dv}{dt}\vec u_T + \frac{v^2}{R}\vec u_N$, $\vec a\cdot\vec v$, « accéléré / retardé / uniforme » | — |

*Note : $\vec u_T$ est **dessiné et nommé dès S1** (c'est la tangente, un acquis
de R1 : `lesson.md:59`, « $\vec v_G$ est **tangent à la trajectoire** »). Ce qui
est interdit avant S4, c'est $\vec u_T$ **en position de porteur d'une composante
de $\vec a$** — donc les chaînes `a_T`, `dv/dt`, et « composante tangentielle ».
La porte cherche ces trois formes-là, pas le symbole $\vec u_T$ seul.*

---

## 8. Misconceptions

Les **dix-neuf** modèles déclarés de la notion vivent dans `items.yaml` sous le
préfixe `mc.physics.pc_lois_newton.`. Les comptes sont **au niveau ITEM**, méthode
`coverage_summary` déclarée en fin de fichier (« *une misconception compte un item
dès qu'au moins un de ses distracteurs la porte, une seule fois par item* ») :
**33 items**, plancher **3**, `floor_met: true`, et un `honest_state` qui prévient
que « *quatorze y siègent EXACTEMENT (3 items) : la marge est nulle et tout retrait
d'item la casse* ». **Les paris de scène ne comptent pas.**

### 8.1 Ce que la scène vise, avec l'inventaire actuel

| étape | misconceptions visées | compte actuel (items) |
|---|---|---|
| S1 | **`acceleration-traitee-comme-un-nombre` proposé** (formes A, B) · `force-entretient-mouvement` | **0 — à créer** · 6 |
| S2 | **proposé** (forme C, ×3) | **0** |
| S3 | **proposé** (forme C, ×3) | **0** |
| S4 | `resultante-mal-composee` · `force-liee-a-vitesse` · **proposé** (forme A) | 3 · 3 · **0** |
| S5 | **proposé** (forme D, ×2) · `resultante-mal-composee` | **0** · 3 |

**Plusieurs distracteurs sur un même modèle dans une même question** (S2, S3, S5) :
assumé, parce que les **formes** diffèrent et que les `retour` diffèrent — même
arbitrage qu'aux specs des noyaux et du banc. Le compteur d'exposition ne s'en
trouve pas faussé : le plancher se compte sur les **items**.

**Ce que la scène ne confronte PAS, écrit à côté de ce qu'elle confronte**
(ADR 0035) :

- `masse-poids-confondus`, `chute-depend-masse`, `erreur-cinematique-uniforme`
  (R6) : la scène **n'a pas de masse et pas de pesanteur** (§9.2). Hors champ.
- `action-reaction-meme-corps`, `action-reaction-inegale-ou-conditionnelle`
  (R4) : aucune interaction, aucune force. Hors champ.
- `projection-plan-incline`, `role-normale-mal-compris`, `bilan-forces-incorrect`,
  `frottement-mal-traite` (R5, R7) : ce sont des modèles de **bilan de forces** ;
  la scène est **avant** la deuxième loi (§1). *Et c'est un renoncement réel :
  « la réaction est plus petite que le poids au sommet d'une bosse » serait la plus
  belle conséquence de cette scène. Elle appartient à la prose, §13.1.*
- `mouvement-absolu`, `referentiel-toujours-galileen` (R1) : la consigne **déclare**
  le référentiel terrestre supposé galiléen sans l'interroger. Acquis, pas visé.

### 8.2 « L'accélération traitée comme un nombre » — un vingtième modèle, et voici pourquoi

**La mesure qui le justifie, et elle est vérifiable en une commande.** Les
**33 items** de la notion et ses **6 entrées de banque** décrivent tous des
mouvements **rectilignes** : palet, chariots, caisse, billes en chute, skieurs et
solides sur plan incliné, trains, bus. `grep` « courbe | circulaire | virage » sur
`items.yaml` : la seule occurrence utile est **LDN-12**, qui parle d'une
trajectoire courbe **pour interroger la VITESSE**, jamais l'accélération.

> **Conséquence : un élève qui dérive la NORME de la vitesse au lieu du VECTEUR
> répond juste aux 33 items.** Sur une droite, les deux opérations coïncident au
> signe près. Le modèle est **structurellement invisible** dans le corpus actuel —
> exactement l'argument qui a fait ouvrir `figure-ombre-geometrique` au banc de
> diffraction et `moment-force-direction-vs-axe` au manège.

Et il n'est couvert par aucun des dix-neuf :

- **`vitesse-scalaire`** porte sur **le vecteur vitesse** (« réduit à un nombre, ou
  mal orienté ») — pas sur l'accélération. Son propre `feedback` (LDN-12 C) doit
  d'ailleurs **invoquer** l'accélération normale pour se justifier, sans qu'aucun
  modèle ne la nomme.
- **`force-liee-a-vitesse`** porte sur le **lien force/vitesse** et sur
  « l'accélération placée dans le sens de la vitesse » — en **rectiligne**. Elle ne
  dit rien de ce qui se passe quand la trajectoire tourne, rien de $v^2/R$, rien de
  $\vec a\cdot\vec v$.
- **`resultante-mal-composee`** porte sur la **composition de forces** (additionner
  des sens opposés, diviser par le poids). Elle attrape le distracteur
  « $16{,}2 + 4{,}50$ » et c'est tout.

Fusionner, ce serait un compteur qui ne dit plus lequel tourne — même arbitrage
qu'au manège et aux noyaux.

**Recommandation : ouvrir un vingtième modèle.** Proposition complète, au format
et avec les trois champs employés par `items.yaml` de cette notion (`id`, `label`,
`description` ; **cette notion n'emploie pas `contradicts_principle`** — vérifié :
ses dix-neuf modèles n'ont que `label` + `description`) :

```yaml
  - id: mc.physics.pc_lois_newton.acceleration-traitee-comme-un-nombre
    label: "L'accélération traitée comme un NOMBRE : dérivée de la vitesse-nombre, sans composante normale, et dont le signe seul dirait la nature du mouvement"
    description: >-
      L'élève dérive la NORME de la vitesse au lieu du VECTEUR vitesse. Quatre
      formes. Forme A — une seule composante : à norme constante dans un virage il
      conclut a = 0 (la direction qui tourne ne compte pas), ou, quand la norme
      varie, il laisse l'accélération inchangée (la composante tangentielle ne
      compte pas). Forme B — la normale mal orientée : il admet une composante
      normale mais la dirige vers l'EXTÉRIEUR du virage, au lieu du centre de
      courbure. Forme C — la loi de a_N perdue : a_N croîtrait comme v et non
      comme v², ou avec R au lieu de 1/R, ou ne dépendrait ni de v ni de R.
      Forme D — la nature lue sur un nombre : « accéléré » parce que a n'est pas
      nul, ou la norme de a prise égale à sa seule composante tangentielle ; alors
      que la nature se lit sur le SIGNE de a·v, qui ne dépend d'aucun axe choisi.
      Ce modèle répond CORRECTEMENT à tout exercice RECTILIGNE — c'est-à-dire aux
      33 items et aux 6 entrées de banque actuelles de la notion : sur une droite,
      dériver la norme ou le vecteur revient au même au signe près. Il ne se révèle
      qu'en demandant ce que devient l'accélération quand la TRAJECTOIRE TOURNE.
```

**Note de rédaction pour item-author, à ne pas perdre.** Ce champ est une
méta-donnée d'auteur, jamais rendue. Il est écrit **sans « force centripète »**,
**sans « force centrifuge »** et **sans aucune force** : le modèle est cinématique,
comme la scène et comme le rang de la leçon (§1, §9.2).

*Note de séquencement, non négociable* (ADR 0041, addendum du 2026-09-24) :
`validate-content` exige qu'un `misconception:` employé par un **pari de scène**
soit **déclaré dans `items.yaml` au moment où la scène est validée**. Le modèle
passe donc **avant** le descripteur dans l'ordre de construction (§12).

**Voie de repli si le modèle n'est pas adopté** (quelques lignes changent) : les
onze choix qui le portent passent sous `force-liee-a-vitesse`, dont la
`description` doit alors être amendée pour couvrir « l'accélération d'un mouvement
courbe ». *Je ne la recommande pas :* ce serait ranger sous une même étiquette une
erreur sur le **lien force–vitesse** et une erreur sur la **dérivation d'un
vecteur**, et le modèle fusionné passerait au-dessus du plancher sans qu'on sache
lequel des deux tourne.

### 8.3 Les quatre items que ce modèle exige (specs pour item-author)

Plancher de couverture : **≥ 3 items** dont le `primary_misconception` est le
modèle. **Les paris de la scène ne comptent pas.** Total après : **4, plancher
atteint, marge 1.**

**Conventions de ce fichier, à respecter à la lettre** (vérifiées) : les items
portent `id`, `rung`, `difficulty_level`, `skill_code`, `tags`,
`primary_misconception`, `stem`, `type: mcq`, `choices` (chacun `id` A/B/C/D,
`text`, `correct`, et pour les faux `misconception:` + `feedback:`),
`correct_feedback`, `solution`. **`items.yaml` de cette notion ne porte AUCUN
champ `habilete:` (0 occurrence sur 33 items) : ne pas en ajouter** — ce serait un
changement de schéma, pas une décision d'item (`DECISIONS-EN-ATTENTE` §3).
**`skill_code: pc_lois_newton`**, comme les 33 autres. **Aucun distracteur qui
REFUSE de conclure** et **aucun « jamais » / « toujours » comme indice de forme**
(cliquets `indice-refus`, `indice-absolu` — *à vérifier avant écriture : LDN-3 D
(« On ne peut rien dire […] sans connaître les vitesses initiales ») est un refus
déjà présent dans le fichier ; s'il y est toléré, c'est que le cliquet n'est pas
armé sur cette notion. Ne pas s'en autoriser un de plus pour autant.*)

---

**LDN-34** — `rung: "R3"`, `difficulty_level: 2`,
`primary_misconception: mc.physics.pc_lois_newton.acceleration-traitee-comme-un-nombre`

- *stem :* Un motard aborde un tremplin **circulaire** de rayon
  $R = 20\ \text{m}$ et le parcourt en **tenant exactement sa vitesse** : son
  compteur affiche $18\ \text{m·s}^{-1}$ à l'entrée, au milieu et à la sortie. Que
  peut-on dire de son vecteur accélération au milieu du tremplin ?
- *clé (A) :* il est **non nul**, **perpendiculaire** à la vitesse, dirigé **vers
  le centre** du tremplin, et vaut $v^2/R = 16{,}2\ \text{m·s}^{-2}$.
- *distracteurs :*
  - (B) « il est **nul** : la vitesse ne change pas » → **forme A**. `feedback` :
    c'est la NORME qui ne change pas ; le VECTEUR vitesse, lui, tourne de 28° entre
    l'entrée et la sortie, et l'accélération mesure la variation du vecteur. Un
    mouvement circulaire uniforme est **accéléré** bien que sa norme soit
    constante.
  - (C) « il est perpendiculaire à la vitesse, mais dirigé vers l'**extérieur** du
    virage » → **forme B**. `feedback` : la trajectoire s'incurve **vers le
    centre** ; une accélération dirigée vers l'extérieur la courberait dans
    l'autre sens. $\vec u_N$ pointe, par définition, vers le centre de courbure.
  - (D) « il est dirigé **vers l'avant**, dans le sens du mouvement : il faut bien
    quelque chose pour entraîner la moto » → **`force-entretient-mouvement`**.
    `feedback` : une accélération vers l'avant **ferait grandir la vitesse**, et
    l'énoncé dit qu'elle ne bouge pas.
- *solution :* dans la base de Freinet,
  $\vec a = \frac{dv}{dt}\vec u_T + \frac{v^2}{R}\vec u_N$ ; ici $dv/dt = 0$ donc
  $\vec a = \frac{v^2}{R}\vec u_N$, de norme $324/20 = 16{,}2\ \text{m·s}^{-2}$,
  dirigée vers le centre.

**LDN-35** — `rung: "R8"`, `difficulty_level: 3`, même `primary_misconception`

- *stem :* Sur le tremplin de $R = 20\ \text{m}$ pris à vitesse tenue, la
  composante normale de l'accélération vaut $4{,}05\ \text{m·s}^{-2}$ à
  $9{,}0\ \text{m·s}^{-1}$. Combien vaut-elle (i) à $18\ \text{m·s}^{-1}$ sur le
  **même** tremplin, puis (ii) à $18\ \text{m·s}^{-1}$ sur un tremplin de
  $R = 10\ \text{m}$ ?
- *clé (A) :* $16{,}2$ puis $32{,}4\ \text{m·s}^{-2}$.
- *distracteurs :*
  - (B) « $8{,}10$ puis $16{,}2$ » → **forme C** *(linéaire en $v$)*. `feedback` :
    doubler la vitesse **quadruple** $a_N$, parce que $v$ y est au carré.
  - (C) « $16{,}2$ puis $8{,}10$ » → **forme C** *($R$ au numérateur)*.
    `feedback` : $R$ est au **dénominateur** — un virage plus serré demande
    **plus** d'accélération, pas moins.
  - (D) « $16{,}2$ puis $64{,}8$ » → **forme C** *(le carré appliqué aussi à $R$)*.
    `feedback` : le carré porte sur la vitesse seule ; diviser $R$ par deux
    **double** $a_N$.
- *solution :* $a_N = v^2/R$. (i) $18^2/20 = 16{,}2$ ; (ii) $18^2/10 = 32{,}4$.
  Contrôle sans division : $a_N \times R$ vaut $324 = v^2$ dans les deux cas.
- *arithmétique (vérifiée) :* $81/20 = 4{,}05$ ✓ · $324/20 = 16{,}2$ ✓ ·
  $324/10 = 32{,}4$ ✓ · $2\times4{,}05 = 8{,}10$ ✓ · $4\times16{,}2 = 64{,}8$ ✓.

**LDN-36** — `rung: "R8"`, `difficulty_level: 4`, même `primary_misconception`
*(le cas que la scène ne montre pas : la courbure dans l'autre sens — §2.6)*

- *stem :* Une voiture franchit le **sommet d'un dos d'âne** dont le rayon de
  courbure vaut $R = 50\ \text{m}$, à la vitesse constante de
  $20\ \text{m·s}^{-1}$. Au sommet, quelle est la **direction** de la composante
  normale de son accélération, et combien vaut-elle ?
- *clé (A) :* dirigée **vers le bas**, vers le centre de courbure qui est **sous**
  la route ; $a_N = v^2/R = 8{,}0\ \text{m·s}^{-2}$.
- *distracteurs :*
  - (B) « vers le **haut**, $8{,}0\ \text{m·s}^{-2}$ : la normale est dirigée vers
    le haut, comme la route la pousse » → **forme B**. `feedback` : $\vec u_N$ ne
    pointe pas « vers le haut » ni « du côté de la route » : il pointe vers le
    **centre de courbure**, c'est-à-dire du côté **concave** de la trajectoire.
    Au sommet d'une bosse, ce côté est **en dessous**.
  - (C) « elle est **nulle** : la vitesse est constante » → **forme A**.
    `feedback` : la norme est constante, la direction ne l'est pas — au sommet, la
    voiture passe de « monter » à « descendre ».
  - (D) « vers le bas, $0{,}40\ \text{m·s}^{-2}$ » → **forme C** *($v/R$ au lieu de
    $v^2/R$)*. `feedback` : $v/R$ n'est même pas une accélération — contrôle
    dimensionnel : $\mathrm{L\,T^{-1}/L = T^{-1}}$, l'inverse d'un temps.
    $v^2/R$ donne bien des $\mathrm{m·s^{-2}}$.
- *solution :* $a_N = 20^2/50 = 400/50 = 8{,}0\ \text{m·s}^{-2}$, vers le centre de
  courbure, sous la route. *(Vérifications : $400/50 = 8{,}0$ ✓ ; $20/50 = 0{,}40$ ✓.)*

**LDN-37** — `rung: "R3"`, `difficulty_level: 3`, même `primary_misconception`
*(le savoir-faire $\vec a\cdot\vec v$, qu'aucun item n'exerce)*

- *stem :* Sur la partie rectiligne inclinée de sa piste, un motard **accélère**
  ($dv/dt > 0$) ; plus loin, sur une portion horizontale, il **freine**
  ($dv/dt < 0$). Dans les deux cas on calcule le produit scalaire
  $\vec a\cdot\vec v$. Que peut-on en dire ?
- *clé (A) :* $\vec a\cdot\vec v > 0$ à la montée en vitesse (**mouvement
  accéléré**) et $\vec a\cdot\vec v < 0$ au freinage (**mouvement retardé**) ; ces
  deux signes **ne dépendent d'aucun choix d'axe**.
- *distracteurs :*
  - (B) « $\vec a\cdot\vec v > 0$ dans les deux cas, puisque le motard **avance**
    dans les deux cas » → **forme D**. `feedback` : $\vec a\cdot\vec v$ ne dit pas
    dans quel sens on va, il dit si la vitesse **grandit**. Il vaut
    $\frac{dv}{dt}\times v$ avec $v > 0$ : son signe est celui de $dv/dt$.
  - (C) « au freinage le signe dépend de l'axe : orienté vers l'arrière, l'axe
    rend $\vec a\cdot\vec v$ positif » → **forme D**. `feedback` : c'est le signe
    d'une **composante** qui dépend de l'axe ; un **produit scalaire de deux
    vecteurs** n'en dépend pas — c'est exactement pour cela que le programme
    demande ce produit plutôt qu'un signe.
  - (D) « au freinage $\vec a\cdot\vec v = 0$, parce que $\vec a$ et $\vec v$ sont
    de **sens opposés** » → **forme D**. `feedback` : le produit scalaire s'annule
    quand les vecteurs sont **perpendiculaires**, pas quand ils sont opposés — de
    sens opposés, il est **négatif**, et de valeur maximale en valeur absolue.
- *solution :* $\vec a\cdot\vec v = \left(\frac{dv}{dt}\vec u_T +
  \frac{v^2}{R}\vec u_N\right)\cdot\left(v\,\vec u_T\right) = \frac{dv}{dt}\,v$,
  car $\vec u_N \perp \vec u_T$. Avec $v > 0$, le signe du produit est celui de
  $dv/dt$ : positif → accéléré, négatif → retardé, nul → uniforme. Et il ne
  dépend d'aucun repère.

**Après application :** `total_items: **37**` ;
`acceleration-traitee-comme-un-nombre: 4` (LDN-34, 35, 36, 37 — plancher atteint,
**marge 1**) ; `force-entretient-mouvement: 6 → 7` (LDN-34 D) ;
`resultante-mal-composee` et les dix-sept autres **inchangés**.
`ramp_coverage` : **R3 : 4 → 6**, **R8 : 3 → 5**, les sept autres inchangés —
total $3+5+4+6+3+4+4+3+5 = 37$ ✓. `coverage_summary` régénéré par
`node web/scripts/resume-couverture.mjs`, jamais à la main.

### 8.4 Ce que ce paquet NE referme pas, et il faut le dire

- **Le champ `habilete` n'existe sur aucun des 33 items** ; ajouter les quatre
  nouveaux ne rend donc **pas** calculable le mélange 13,5 / 4,05 / 9,45 du §1.
  C'est `DECISIONS-EN-ATTENTE` §3, et cette livraison **ne la tranche pas**.
- **Les quatre items neufs sont tous d'« utilisation des ressources »** au sens du
  cadre ; **aucun ne lit de données expérimentales**. La cible du sous-domaine est
  **4,05 %** d'application expérimentale, et la notion est à **0 %** — la même
  remarque que la critique de fidélité a faite au manège (DÉCISIONS §20).
  **Reste dû**, et c'est un travail de table de mesures, pas de scène.
- **Les équations aux dimensions** ne sont touchées que par une ligne de prose
  (§4.3) et un `feedback` (LDN-36 D). **Reste dû.**
- **La rampe ne monte pas jusqu'au bac pour ce qu'on vient d'enseigner** (vague 1,
  critique pédagogique, 2026-09-25) : le sommet de R8 est la **Partie I** du sujet
  2019 N (rectiligne) et `bank.yaml` n'a **aucune** entrée qui demande la base de
  Freinet ou $\vec a\cdot\vec v$ — le savoir-faire plafonne aux items. Candidats
  à mesurer : la **Partie II** du même sujet (« tremplin circulaire B'C' puis
  saut », NON transcrite — `docs/sujets/pc/lois-de-newton.md:17-20` ; on ne sait
  donc pas si elle interroge l'arc ou seulement le saut) et le sujet 2012 R
  (Jupiter, §2.4, dans la banque de `chute-mouvements-plans`). **Reste dû**, et c'est une transcription
  vérifiée d'un sujet réel, pas un item de plus. *Omis de cette liste à la
  livraison ; la critique l'a trouvé — ce qu'on n'arme pas s'écrit (ADR 0035).*

---

## 9. La frontière de programme — ce que la scène n'affiche jamais

Chaînes **interdites dans le panneau ouvert**, mesurées par la porte (§11.3,
`frontiere`), **et chacune avec son essai rouge** (§11.4, sabotage 21).

> **On interdit des FORMES, pas des noms** (ADR 0036 : *une chose n'est prouvée
> absente que si l'on a énuméré ses FORMES*). Interdire « force » sans interdire
> `\vec F` laisse passer l'équation ; interdire « angulaire » sans interdire
> `\omega` laisse passer le symbole. Chaque ligne liste donc les **variantes
> d'écriture**, symbole et forme LaTeX comprises, et la porte les cherche dans le
> texte **RENDU** (après KaTeX, annotations TeX comprises — c'est la forme que le
> produit écrit, ADR 0039), pas dans la source. *Rappel de la porte des noyaux :
> `\b` ignore les accents — chercher en **début de mot** et en Unicode.*

1. **Aucun saut, aucune parabole, aucun projectile.** C'est
   `applications_dynamique` et la notion `pc/chute-mouvements-plans` (§1).
   **La piste s'arrête en C**, et la scène le dit ainsi : « le point C, où la piste
   s'arrête ». Interdits : `saut`, `sauter`, `s'envole`, `envol`, `décoll`,
   `parabole`, `parabolique`, `portée`, `flèche de la trajectoire`, `projectile`,
   `atterriss`, `x_G(t)`, `y_G(t)`, `V_C`, `zone (π)`, `(\pi)`.
2. **Aucune force, aucune masse, aucun newton.** Frontière **de rang** : la scène
   est **avant** `### L'énoncé de la deuxième loi` (§1, §3). Interdits : `force`,
   `\vec F`, `\sum \vec F`, `F_{ext}`, `m\vec a`, `m \vec{a}`, `poids`, `\vec P`,
   `réaction`, `\vec N`, `\vec R`, `frottement`, `newton`, `\text{N}`, ` N`,
   `masse`, `kg`, `190`, `525`, `532`, **`centripète`**, **`centrifuge`**,
   `pesanteur`, `g =`, `9,8`, `10 m·s⁻²` *(en position d'intensité de pesanteur)*.
   *« centripète » nomme une **force** et appartient à R9 du voisin ; la scène dit
   « composante **normale** », qui est le mot du cadre.*
3. **Aucune rotation autour d'un axe, aucune grandeur angulaire.** C'est
   `rotation_axe_fixe` et la scène `manege-rotation` (§2.5). Interdits : `\omega`,
   `oméga`, `angulaire`, `rad/s`, `rad·s`, `abscisse angulaire`, `\ddot\theta`,
   `\dot\theta`, `moment`, `\mathcal{M}`, `bras de levier`, `moment d'inertie`,
   `J = `, `tour`, `tr/min`, `RFD`, `période`, `T =`.
4. **Aucune énergie.** C'est `aspects_energetiques`. Interdits : `énergie`,
   `cinétique`, `potentielle`, `travail`, `W(`, `joule`, `\text{J}`,
   `conservation de l'énergie`, `théorème`.
5. **Aucune gravitation, aucun satellite, aucune force de Lorentz.** Ce sont R6,
   R9 et R10 du voisin — **les trois endroits où le bac emploie réellement la base
   de Freinet**, et la scène les laisse au voisin (§1). Interdits : `gravitation`,
   `Kepler`, `satellite`, `orbite`, `orbital`, `planète`, `Jupiter`, `héliocentr`,
   `géocentr`, `Lorentz`, `\wedge`, `champ magnétique`, `\vec B`, `charge`.
6. **Aucune équation différentielle, aucune méthode d'Euler.** Interdits :
   `équation différentielle`, `Euler`, `pas de calcul`, `\Delta t`, `intégr`,
   `primitive`, `solution de la forme`.
7. **Aucun appareil de Frenet au-delà du plan.** Le cadre demande **une base**
   dans un plan. Interdits : `binormale`, `torsion`, `trièdre`, `Frenet-Serret`,
   `Serret`, `\kappa`, `courbure` **en position de scalaire $\kappa$**,
   `abscisse curviligne`, `d\vec u_T/ds`, `ds`.
   *« rayon de courbure » et « centre de courbure » sont **autorisés** : ce sont
   les mots du voisin (`chute-mouvements-plans/lesson.md:339`) et du bac.*
8. **Aucun frottement, aucun modèle de résistance.** C'est le chapitre suivant.
   Interdits : `frottement`, `fluide`, `résistance de l'air`, `-k\,v`, `vitesse
   limite`, `régime permanent`.
9. **Aucune relativité de référentiel discutée.** La consigne **déclare** le
   référentiel terrestre supposé galiléen, une fois, et n'en fait pas un objet.
   Interdits : `non galiléen`, `changement de référentiel`, `force d'inertie`,
   `entraînement`.
10. **Aucune mécanique analytique** (exclusion du sous-domaine, §1). Interdits :
    `lagrang`, `hamilton`, `action`, `coordonnées généralisées`.
11. **Aucune oscillation, aucun régime forcé** (exclusions du sous-domaine).
    Interdits : `oscill`, `pendule`, `résonance`, `amortiss`, `pseudo-période`.
12. **Aucun angle affiché autre que les trois angles de la piste.** Les seuls `°`
    du panneau sont **10**, **18** et **28**, et ils viennent du sujet (§5.1).
    Interdits : tout autre nombre suivi de `°` ; `angle de \vec a`, `arctan`,
    `\alpha =` *(sauf 18)*, `\beta =` *(sauf 10)*. *La porte compte les
    occurrences de `°` et vérifie l'ensemble exact des trois valeurs.*
13. **Aucune échelle non linéaire, aucune anisotropie.** Les trois échelles du
    §5.8 sont **linéaires**, et la géométrique est **isotrope**. Interdits :
    `log`, `logarithmique`, `semi-log`, `exagér`, `hors échelle`, `pas à
    l'échelle`. *La porte le mesure aussi en pixels : le facteur px/m est le même
    horizontalement et verticalement (`echelle-constante`).*
14. **Aucun graphe.** La scène n'en a pas (§2.6) : elle ne trace ni axes, ni
    points, ni droite, ni pente. Interdits : `pente`, `coefficient directeur`,
    `axe des abscisses`, `ordonnée à l'origine`, `f(t)`, `graphe`, `courbe
    représentative`.
15. **Aucune 3D.** Canvas 2D, aucune caméra. **`window.__THREE__` doit rester
    indéfini même panneau OUVERT** — famille de porte à part entière.
16. **La scène n'est pas un TP et ne le prétend jamais.** Le cadre en liste un
    pour ce chapitre (« *Lois de Newton → vérifier la 2e loi* », p. 27) ; la scène
    n'en est pas un — elle n'a ni mesure, ni incertitude, ni dispersion.
    Interdits : `travaux pratiques`, `TP`, `mesuré au laboratoire`, `incertitude`,
    `±`, `chronophotographie`.

---

## 10. Ce que cette scène peut honnêtement prétendre (`fit_caveat`)

Une image calculée est plus crédible qu'une figure dessinée, donc plus
dangereuse. Et cette scène dessine **six objets vectoriels au même endroit** :
c'est le maximum de place qu'une figure peut donner à un malentendu d'échelle.

> **Portée du champ rendu :** le `fit_caveat` du descripteur reprend **les points
> 1 à 4 SEULEMENT**, et ce sont aussi les phrases de légende. **Les points 5 à 9
> ne sont rendus nulle part** : ce sont des notes de conception, pour l'auteur et
> pour la revue.

1. **Deux flèches, deux échelles, deux témoins — elles ne se comparent pas.** La
   flèche de la **vitesse** (m·s⁻¹) et celle de l'**accélération** (m·s⁻²) sont
   dessinées à deux facteurs différents, chacun **déclaré par son propre témoin**
   sur la scène et **constant à tous les réglages**. Comparer leurs **longueurs**
   n'a aucun sens ; comparer deux flèches **de même nature** entre deux réglages
   en a un, et il est exact. *Légende :* « Deux échelles : une pour les vitesses,
   une pour les accélérations. Chacune a son témoin. Une flèche de vitesse et une
   flèche d'accélération ne se comparent jamais en longueur. »
2. **$\vec u_T$ et $\vec u_N$ sont des vecteurs UNITAIRES : leur longueur dessinée
   est une convention.** Elle est la **même partout**, à tous les réglages, et
   elle ne mesure rien — ni une vitesse, ni une accélération. Ils ne servent qu'à
   donner **deux directions**. Et **$\vec u_N$ n'est dessiné que dans l'arc** :
   sur une droite, la normale n'a pas de côté vers lequel pointer. *Légende :*
   « $\vec u_T$ et $\vec u_N$ sont unitaires : leur longueur est une convention.
   Sur la partie droite, $\vec u_N$ n'a pas de sens — la trajectoire ne tourne
   pas. »
3. **Le motard est réduit à un POINT, son centre d'inertie G, et aucune masse
   n'entre nulle part.** La scène ne dit rien de l'inclinaison de la moto, de la
   rotation de ses roues, de sa suspension, ni de ce que ressent le pilote.
   $a_N = v^2/R$ **ne contient aucune masse** : le résultat serait identique pour
   un camion. *Légende :* « Le système est réduit à son centre d'inertie. Aucune
   masse n'intervient : $a_N = v^2/R$ n'en contient pas. »
4. **Le raccordement en B est idéalisé.** La courbure y saute de zéro à $1/R$ d'un
   coup, donc la composante normale **apparaît d'un bloc**. Une vraie piste adoucit
   ce passage sur quelques mètres, et la composante y grandirait progressivement.
   *C'est exactement l'idéalisation que la figure du sujet fait en dessinant un
   coude.* *Légende :* « Le raccordement est idéalisé : la courbure passe de zéro à
   $1/R$ d'un seul coup en B. Sur une vraie piste, le passage est adouci. »
5. *(non rendu — note de conception)* **Rien n'est exagéré dans la géométrie.**
   Une seule échelle géométrique, **la même horizontalement et verticalement** :
   un tremplin de 20 m de rayon qui ne tourne que de 28° **est** une courbe douce
   (flèche d'arc 0,594 m pour une corde de 9,68 m ; dénivelé 0,675 m). Ce qui doit
   sauter aux yeux, ce n'est pas une courbure gonflée, c'est la **rotation de 28°
   des vecteurs**. *C'est le choix inverse de celui du banc de diffraction, et pour
   la même raison : là-bas l'exagération était inévitable et déclarée ; ici elle
   serait gratuite et elle fausserait les angles $10°$ et $18°$, qui sont des
   données du sujet.*
6. *(non rendu)* **La scène est CINÉMATIQUE : elle ne montre aucune force.** Ce qui
   fait accélérer, tenir ou freiner la moto, c'est son moteur et ses freins ; la
   scène dit seulement **de combien sa vitesse change**. C'est un choix de rang, pas
   de prudence : à cet endroit de la leçon, la deuxième loi n'est pas encore
   énoncée (§1, §3). La prose qui suit la scène projettera la loi sur la base.
7. *(non rendu)* **$R = 20$ m n'est PAS dans le sujet.** Le sujet 2019 N décrit un
   « tremplin B'C' circulaire » et **ne donne aucun rayon**. La valeur est choisie,
   et voici sa justification mesurée : gaz gardés à l'accélération du sujet
   ($4{,}50$ m·s⁻²), la moto quitterait la piste en C à **20,3 m·s⁻¹**, à **1,5 %**
   du $V_C = 20$ m·s⁻¹ que le même sujet **donne** en partie II. Ce n'est pas une
   vérification du sujet — le sujet ne dit rien de ce qui se passe sur le tremplin —
   c'est ce qui rend le choix défendable au lieu d'arbitraire. *À écrire dans la
   `caption_fr`, pas dans le `fit_caveat` : c'est une provenance, pas une limite.*
8. *(non rendu)* **Le freinage à $-4{,}50$ m·s⁻² est le miroir exact des gaz, et
   c'est délibéré.** Une vraie moto freine plus fort qu'elle n'accélère. La
   symétrie est choisie pour que les deux régimes donnent **la même norme**
   $\|\vec a\|$ et des **natures opposées** — l'argument entier du savoir-faire
   $\vec a\cdot\vec v$ (§4.5, §7.5).
9. *(non rendu)* **Le ralenti ×6 est un facteur de TEMPS, jamais de vitesse.** Les
   valeurs affichées au compteur sont les vraies ; c'est l'horloge qui est
   dilatée, d'un facteur déclaré et constant. Sans lui, la course la plus rapide
   durerait 0,50 s.

---

## 11. La porte (`web/scripts/scene-tremplin.mjs`, ADR 0041 §8)

Principe : elle lit **le rendu réel** (`next start` + Chromium), jamais le code du
produit ; elle trouve son panneau par `[data-scene="tremplin-circulaire"]`,
**jamais** par `[data-scene]` seul (précédent : la porte de l'orbite ouvrant le
chapitre du champ magnétique, run 747 — et `pc/lois-de-newton` n'a qu'une scène
aujourd'hui, ce qui est exactement la situation où l'on prend l'habitude
dangereuse). Elle se lance **plusieurs fois, à plusieurs largeurs** (1 280 px et
390 px au minimum) avant d'être crue. Quatre verdicts honnêtes (ADR 0034/0038) :
**ROUGE**, **AVERTISSEMENT-vu**, **VERT-ambigu**, **MUET**. Si le contexte Canvas
2D n'est pas disponible au banc, elle sort **MUET, en échec**, jamais en vert.

**Le calcul de cette scène est ANALYTIQUE, donc la porte refait les NOMBRES**
(règle de la corde, ADR 0041 : *une seconde voie analytique recalcule des nombres ;
une simulation n'établit que des invariants*). Elle les recalcule **sans importer
aucun module du produit** (ADR 0036 : une porte qui importe le module se donne
raison), depuis les seules constantes de cette spec.

### 11.1 Les nombres, recalculés par une seconde implémentation

| # | ce que la porte recalcule | attendu | tolérance |
|---|---|---|---|
| N1 | $a_N = v^2/R$ aux **12** couples (3 vitesses × 4 rayons) au repère `entree` | la table A du §5.7 | **égalité de chaîne** avec `acceleration-normale`, 3 c.s. |
| N2 | $a_T$ aux **3** régimes, **avec son signe** | `+4,50` · `0,00` · `−4,50` | égalité de chaîne ; le **signe** et l'unité **m·s⁻²** |
| N3 | $a_N \times R$ aux 12 couples, **sur les valeurs AFFICHÉES** | **81,0** · **144** · **324** | égalité de chaîne — *chaîne de calcul, pas valeur isolée* |
| N4 | $\|\vec a\| = \sqrt{a_T^2+a_N^2}$ aux **36** réglages | la table C du §5.7 (et la table A au régime `tenue`) | égalité de chaîne, 3 c.s. |
| N5 | $\vec a\cdot\vec v = a_T\,v$ aux **9** couples (vitesse × régime) | $\pm40{,}5$ · $\pm54{,}0$ · $\pm81{,}0$ · $0$, **en m²·s⁻³** | égalité de chaîne **et unité** |
| N6 | `nature` déduite du **signe de $\vec a\cdot\vec v$** aux 9 couples | accéléré / uniforme / retardé — **et le cas « uniforme avec $\|\vec a\| \ne 0$ » DOIT se produire** dans l'arc | chaîne exacte |
| N7 | au repère `approche` : $a_N$ **et** la lecture `rayon`, aux **36** réglages | **« 0,00 »** et **« droite : pas de courbure »** | égalité de chaîne — *le zéro est structurel (§5.3), jamais un $1/R$ à grand $R$* |
| N8 | $v(\ell) = \sqrt{v_B^2+2a_T\ell}$ aux quatre repères, avec $s = R\times0{,}488\,692$ | la table E du §5.7 ; en particulier **20,3 m·s⁻¹ en C** pour (18 ; gaz ; 20 m) | égalité de chaîne, 3 c.s. |
| N9 | l'identité **gaz / freinage** : $\|\vec a\|$ est le MÊME aux deux régimes, aux 12 couples | identiques **au bit près** | exact — *l'identité est STRUCTURELLE dans le code (une seule fonction, $a_T^2$), jamais deux branches recopiées* |
| N10 | les **bornes** : `vitesse` a exactement 3 crans, `rayon` 4, `pilotage` 3, `position` 4 ; aucune valeur intermédiaire | — | exact |

### 11.2 Les faits de PIXELS, mesurés dans les deux sens

*Toutes les sondes lisent en **fractions de l'échelle de la scène**, jamais au
pixel absolu : le facteur px/m est **lu sur le témoin géométrique**, le facteur
px par m·s⁻² sur le **témoin d'accélération**, le facteur px par m·s⁻¹ sur le
**témoin de vitesse** (leçon de la porte du champ magnétique — « une sonde qui lit
un détail de dessin se règle sur l'ÉCHELLE, pas sur le pixel »). Lancée à
**1 280 et 390 px** au minimum.*

| famille | le sens qui doit passer | le sens qui doit rougir |
|---|---|---|
| `fleches-a-l-echelle` | la longueur **en pixels** de chaque flèche ($\vec v$, $a_T\vec u_T$, $a_N\vec u_N$, $\vec a$) $=$ sa valeur affichée × le facteur lu sur SON témoin, à $\le 2$ px, aux 36 réglages × 4 repères | une flèche dessinée depuis un autre nombre que celui affiché doit rougir |
| `normale-vers-le-centre` | l'angle entre la flèche $a_N\vec u_N$ et la **tangente locale à la piste dessinée** vaut $90{,}0°$ à $\le 1°$, **et** elle pointe du côté **concave** (le demi-plan qui contient le centre du cercle), aux 4 rayons × 3 repères d'arc | $\vec u_N$ **retourné** (vers l'extérieur — la misconception posée dans le code) doit rougir **seule** ; un $\vec u_N$ à $80°$ aussi |
| `droite-sans-normale` | au repère `approche` : **aucune** flèche normale, **aucun** $\vec u_N$, **aucun** centre dessiné, aux 36 réglages | une composante normale non nulle sur la droite doit rougir **seule** |
| `composition` | le parallélogramme se ferme : (flèche $\vec a$) $=$ (flèche $a_T\vec u_T$) $+$ (flèche $a_N\vec u_N$) **en pixels**, à $\le 2$ px, aux 24 réglages où $a_T \ne 0$ | $\|\vec a\| = a_N + a_T$ ou $a_N - a_T$ (les deux distracteurs réalisés) doivent rougir |
| `tangente-vraie` | la direction de $\vec u_T$ et celle de $\vec v$ coïncident avec la **direction locale de la piste dessinée** à $\le 1°$, aux 4 repères ; et l'angle de la piste vaut $-10{,}0°$ avant B et $+18{,}0°$ en C, à $\le 0{,}5°$ | $\vec u_T$ horizontal, ou une piste dont les angles d'entrée/sortie ne sont pas ceux du sujet, doivent rougir |
| `arc-de-cercle` | la distance du **centre dessiné** à 20 points échantillonnés de l'arc est constante à $\le 1$ px et vaut $R \times$ (px/m) ; la rotation totale mesurée vaut $28{,}0°$ à $\le 0{,}5°$, aux **4** rayons | un arc « joli » de rayon fixe, ou une rotation de 40°, doivent rougir |
| `echelle-constante` | les **trois** facteurs (px/m, px par m·s⁻¹, px par m·s⁻²) sont identiques aux **36** réglages **et** aux 4 repères, à $\le 1\%$ ; **et** le facteur px/m est le même **horizontalement et verticalement** (isotropie), à $\le 1\%$ | un facteur qui change d'un réglage à l'autre (un cadrage « pour que ça rende bien »), ou une échelle verticale exagérée, doivent rougir **seuls** |
| `unitaires-constants` | les longueurs dessinées de $\vec u_T$ et de $\vec u_N$ sont **identiques** aux 36 réglages, à $\le 1$ px | un $\vec u_T$ proportionnel à $v$ doit rougir : il inviterait à lire une échelle qui n'existe pas (§5.8) |
| `signe-du-produit` | le signe affiché de $\vec a\cdot\vec v$ concorde avec l'**angle dessiné** entre $\vec a$ et $\vec v$ : aigu ⇔ positif, obtus ⇔ négatif, droit ⇔ zéro, aux 36 réglages | un $\vec a\cdot\vec v$ calculé comme $\|\vec a\|\,v$ (l'angle ignoré) doit rougir **seul** |
| `course` | rien ne bouge avant l'engagement ; après, la moto part du repère de départ et **s'arrête en B** ; la durée mesurée **à l'horloge** vaut $\ell/\bar v \times 6$ à $\le 10\%$, aux 9 couples (vitesse × régime) | une course qui traverse l'arc, ou un ralenti qui change avec le réglage, doivent rougir |
| `avant-pari` | à chaque étape, avant l'engagement : **zéro** pixel d'accent (mesuré en **CHROMINANCE**, jamais en luminance — ADR 0041, cinquième scène) ; aucune flèche d'accélération ; aucun $\vec u_N$ ; aucun centre ; aucun parallélogramme ; aucune lecture-réponse dans le DOM ; aucun bouton « Lancer » | après l'engagement : les flèches, $\vec u_N$, le centre et les lectures apparaissent, et l'accent avec |
| `palette` | tout pixel teinté du canvas a la **teinte** d'un jeton `--figure-*` lu à l'exécution ; relecture au changement de thème | une flèche peinte en rouge « parce que c'est l'accélération » doit rougir **seule** |
| `formule-graduee` | le panneau **ne contient pas** `v^2` avant la révélation de S2, ni `/R` ni `\frac{v^2}{R}` avant celle de S3, ni `dv/dt` ni `a_T` ni `a\cdot v` avant celle de S4 ; et les contient **après** | écrire la relation entière dans un retour de S1 doit rougir **seule** — *la fuite par le TEXTE, §2.3* |
| `fuite-inter-etapes` | la porte **réécrit elle-même** la table du §7.6 contre le descripteur : `vitesse` n'est ouvert qu'à S2 et S5, `rayon` qu'à S3 et S5, `pilotage` qu'à S4 et S5 ; **aucune étape n'hérite d'un contrôle** | ouvrir `pilotage` dès S1, ou laisser `vitesse` ouvert à S4 (ce qui rendrait le réglage de S5 atteignable), doit rougir |
| `pas-de-3d` | `window.__THREE__` **indéfini panneau OUVERT** ; aucun contexte `webgl` créé ; le canvas est en `2d` | un `import("three")` dans le module de la scène doit rougir |

### 11.3 Les autres familles

`rien-avant-le-clic` (panneau fermé : aucun canvas, aucune boucle) · `etapes`
(chaque étape pose son état, n'ouvre que **son** contrôle, les autres **absents du
DOM** ; `etat_revele` pose bien le réglage annoncé) · `paris` (3 ou 4 choix,
exactement un juste, un `retour` par choix, rien dans la région live avant
l'engagement) · `frontiere` (aucune des chaînes du §9 dans le panneau ouvert,
**une sonde par forme**, et l'ensemble exact des `°` affichés $= \{10, 18, 28\}$) ·
`eclairs` (aucune fenêtre de 10° ne s'éclaire plus de trois fois par seconde,
mesurée **image par image** pendant une course — **attendu structurellement
vide**, mesuré quand même, §6.1) · `sans-mouvement` (`prefers-reduced-motion` : la
course calcule sans animer et montre l'image finale ; bouton « Image finale »
présent pour tous) · `katex` (aucun LaTeX brut visible ; $\vec u_T$, $\vec u_N$,
$a_T$, $a_N$, $\vec a\cdot\vec v$ rendus — jamais par la police du chrome,
ADR 0030) · `etiquettes` (aucune étiquette n'en chevauche une autre, **ni le
DESSIN sous une étiquette sans fond** (mesure neuve du banc, vague 2), n'est barrée
par un trait, ni ne sort du cadre — à 1 280 **et** à 390 px ; pièce commune
`disposer`, **obligatoire** ici : sept étiquettes vivent dans 200 px au repère
`milieu`) · `ergonomie` (pièce commune `scripts/lib/scene-ergonomie.mjs`, argument
`course` : ouvrir, parier, **lancer**, avancer, revenir **au clavier** sans perdre
le focus ni le pousser hors de l'écran ; toute cible visible $\ge 44$ px, `<summary>`
compris ; colonne de réglages $\ge$ 18rem ; `scroll-margin-top` **vérifié en
donnant le focus**) · `console` (aucune erreur).

### 11.4 `--essai-rouge` : ce qui doit faire crier chaque famille

Un rouge ne prouve rien sans le vert qui l'a précédé, **dans ce dossier, avec
cette commande** (ADR 0034). Sabotages à outiller :

1. poser $a_N = v/R$ (**le carré manquant**) → `nombres` (N1, N3, N8),
   `fleches-a-l-echelle` ;
2. poser $a_N = v^2/R^2$ → `nombres` (N1), et **N3 seul** attrape l'invariant ;
3. poser $a_N = v^2 R$ (rayon au numérateur) → `nombres` (N1, N3) ;
4. retourner $\vec u_N$ (la flèche vers l'extérieur — la misconception forme B,
   posée dans le code) → `normale-vers-le-centre` **seule** ;
5. dessiner $a_N\vec u_N$ à $80°$ de la tangente au lieu de $90°$ →
   `normale-vers-le-centre` **seule** ;
6. faire apparaître une composante normale non nulle sur la droite (par un
   $R = 10^6$ m au lieu d'une branche à zéro) → `droite-sans-normale` **seule**
   *(et non `nombres`, si l'affichage arrondit à 0,00 : c'est précisément le cas
   qu'une porte de nombres ne voit pas)* ;
7. poser $\|\vec a\| = a_N + |a_T|$ (la somme des nombres — le distracteur de S4
   réalisé) → `nombres` (N4), `composition` ;
8. poser $\|\vec a\| = a_N - |a_T|$ (le distracteur de S5 réalisé) → `nombres`
   (N4), `composition` ;
9. calculer $\vec a\cdot\vec v$ comme $\|\vec a\|\,v$ (l'angle ignoré) →
   `signe-du-produit` **seule** au régime `freinage`, `nombres` (N5) partout ;
10. déduire `nature` de $\|\vec a\| \ne 0$ (« accéléré » dès que $\vec a \ne \vec 0$)
    → `nombres` (N6) **seule** ;
11. faire varier le facteur d'échelle des accélérations avec le réglage (recadrer
    à chaque cran) → `echelle-constante` **seule** ;
12. dessiner la flèche de vitesse à l'échelle des accélérations →
    `echelle-constante`, `fleches-a-l-echelle` ;
13. étirer l'échelle verticale d'un facteur 3 (pour « mieux voir le virage ») →
    `echelle-constante` (isotropie) **et** `tangente-vraie` (les angles $10°$ et
    $18°$ deviennent faux) ;
14. dessiner l'arc avec un rayon fixe indépendant de $R$ → `arc-de-cercle`
    **seule** ;
15. porter la rotation du tremplin à $40°$ → `arc-de-cercle`, `tangente-vraie` ;
16. dessiner $\vec u_T$ horizontal (au lieu de tangent) → `tangente-vraie`
    **seule** ;
17. dessiner $\vec u_T$ de longueur proportionnelle à $v$ → `unitaires-constants`
    **seule** ;
18. afficher **une** flèche d'accélération, ou $\vec u_N$, ou le **centre de
    courbure**, **avant** le pari → `avant-pari` ;
19. faire partir la moto avant l'engagement → `course`, `avant-pari` ;
20. faire traverser l'arc à la course (au lieu de s'arrêter en B) → `course`
    **seule** ;
21. changer le ralenti avec la vitesse (×6 à 18 m·s⁻¹, ×3 à 9) → `course`
    **seule** ;
22. écrire « $a_N = v^2/R$ » dans le retour de S1 → `formule-graduee` **seule** ;
23. écrire « $\vec a\cdot\vec v$ » dans le retour de S3 → `formule-graduee`
    **seule** ;
24. ouvrir `pilotage` dès S1, ou laisser `vitesse` ouvert à S4 →
    `fuite-inter-etapes` **seule** ;
25. faire du régime `freinage` une branche recopiée (un $\|\vec a\|$ écrit à la
    main) → `nombres` (N9) **seule** ;
26. peindre la flèche $\vec a$ dans une teinte hors jetons → `palette` **seule** ;
27. `import("three")` dans le module de la scène → `pas-de-3d` ;
28. **une forme interdite du §9 à la fois, insérée dans le panneau — UNE MESURE
    PAR FORME**, jamais une seule pour la liste entière (ADR 0036). La porte
    déclare une sonde nommée par forme et l'essai rouge les parcourt toutes :
    `saut`, `parabole`, `portée`, `projectile`, `V_C` · `force`, `\vec F`,
    `poids`, `\vec N`, `newton`, `kg`, **`centripète`**, **`centrifuge`**,
    `pesanteur` · `\omega`, `angulaire`, `moment`, `moment d'inertie` ·
    `énergie`, `travail`, `joule` · `Kepler`, `satellite`, `Lorentz`,
    `\wedge` · `équation différentielle`, `Euler` · `binormale`, `torsion`,
    `abscisse curviligne` · `frottement`, `vitesse limite` · `lagrang` ·
    `oscill`, `résonance` · un `°` autre que 10, 18, 28 · `log`,
    `logarithmique` · `pente`, `f(t)` · `TP`, `incertitude`, `±`.
    **Chacune doit faire rougir `frontiere` SEULE** ; une forme qui ne fait rien
    rougir est une **sonde manquante**, pas un produit propre.

**Un sabotage qui n'atteint pas la porte n'est pas un essai rouge** : il sort en
quatrième verdict, **AMBIGU** (ADR 0038). Et chaque défaut ne doit faire rougir
que **la** porte qui le garde : si le sabotage 11 fait aussi rougir
`fleches-a-l-echelle`, c'est que les deux familles mesurent la même chose et
qu'il faut en resserrer une.

---

## 12. Entrée de registre, descripteur, ordre de construction

**Registre** (`web/src/lib/scene3d/scenes.json` — le renommage du dossier reste la
question héritée, §13.8) :

```json
"tremplin-circulaire": {
  "temps": false,
  "course": true,
  "dimension": "2d",
  "controles": ["position", "vitesse", "rayon", "pilotage"],
  "etat": ["v_ms", "R_m", "regime", "repere", "reference"],
  "valeurs": {
    "v_ms": ["9", "12", "18"],
    "R_m": ["10", "15", "20", "30"],
    "regime": ["gaz", "tenue", "freinage"],
    "repere": ["approche", "entree", "milieu", "sortie"],
    "reference": ["aucune", "depart"]
  },
  "lectures": ["vitesse", "rayon", "acceleration-normale",
               "acceleration-tangentielle", "acceleration",
               "produit-a-v", "nature", "aN-fois-R"]
}
```

*Aucune clé `bornes` : **tous** les réglages sont des crans (§5.4), comme `a_mm`
et `lambda_nm` au banc, `f_hz` dans la cuve, `v_ms` dans la corde, `t_demi_j` dans
les noyaux — **aucune machinerie nouvelle** dans `validate-content`.*

**Table des états, à recopier dans le descripteur :**

| étape | `v_ms` | `R_m` | `regime` | `repere` | `reference` | `etat_revele` | contrôle neuf |
|---|---|---|---|---|---|---|---|
| S1 | `18` | `20` | `tenue` | `approche` | `aucune` | `repere: entree` | `position` |
| S2 | **`9`** | `20` | `tenue` | `approche` | `depart` | **`v_ms: 18`**, `repere: entree` | `vitesse` |
| S3 | `18` | **`30`** | `tenue` | `approche` | `depart` | **`R_m: 15`**, `repere: entree` | `rayon` |
| S4 | `18` | `20` | `tenue` | `approche` | `depart` | **`regime: gaz`**, `repere: entree` | `pilotage` |
| S5 | **`12`** | `20` | **`freinage`** | `approche` | `aucune` | `repere: entree` | — *(les quatre rouverts)* |

Les cinq étapes portent `revele_apres_course: 1`.

**Champs du descripteur, au-delà des étapes** (modèle :
`content/pc/propagation-onde-lumineuse/media/banc-de-diffraction.json`) : `slug`,
`tool: "scene2d"`, `type: "manipulable"`, `scene: "tremplin-circulaire"`,
`title_fr`, `caption_fr` (qui porte la provenance du §10.7), `boundary` (le §9 en
une phrase dense), `fit_caveat` (les points 1 à 4 du §10 **seulement**),
`fallback_note`, `pedagogy_wiring` (`why_manipulable`, `predict_then_reveal`,
`misconceptions` — la liste des ids employés par les paris), `spec_ref`, `adr_ref`.

**`fallback_note` proposée :** « Sans JavaScript et à l'impression, le panneau
disparaît. La figure `vecteur-vitesse-tangente` (chapitre 2) couvre la
construction du vecteur vitesse tangent à une trajectoire courbe ; **aucune**
figure du corpus ne montre le vecteur accélération sur une trajectoire courbe, ni
ses deux composantes, ni le produit $\vec a\cdot\vec v$ — c'est précisément ce que
le tremplin apporte, et c'est pourquoi les paragraphes de prose qui le suivent
l'écrivent en toutes lettres. »

**Ordre de construction, et ce qui doit être vert avant l'étape suivante :**

1. `items.yaml` — déclarer `acceleration-traitee-comme-un-nombre` (§8.2) et écrire
   **LDN-34 à LDN-37** (§8.3) ; régénérer `coverage_summary`
   (`total_items: 37`). **`validate-content --strict` vert avant la suite** (la
   scène ne validera pas sans le modèle).
2. `web/src/lib/scene2d/tremplin-modele.ts` — la géométrie de la piste,
   $v(\ell)$, $a_N$, $a_T$, $\|\vec a\|$, $\vec a\cdot\vec v$, la nature ; aucun
   rendu, aucune couleur. **Une seule fonction pour les trois régimes** (N9) et
   **une branche à zéro** pour la droite (N7). Test unitaire
   `web/scripts/test-tremplin.mjs` : les tables A, B, C, D, E du §5.7 à
   $10^{-12}$, l'invariant $a_N R = v^2$, et l'identité gaz/freinage.
3. `web/src/lib/scene2d/tremplin-rendu.ts` — la piste, l'arc, **les trois échelles
   et leurs témoins** (§5.8), la moto, le compteur, les vecteurs ; palette lue
   dans les jetons (`lib/jetons-figure.ts`, **pas** `scene3d/palette.ts`, qui
   importerait three) ; étiquettes posées par `disposer`, jamais `poser`.
4. `web/src/components/notion/scene/TremplinPanel.tsx` — sur les pièces communes
   (`useSceneRendu`, `usePari`, `SceneOptIn`, `PariBloc`, `TransportEtapes`,
   `Plateau`), sans `VuesBloc` (§6.1).
5. `scenes.json` + le descripteur `media/tremplin-circulaire.json`.
6. Les blocs de prose du §4, **le §4.1 avant le marqueur**, et la retouche du
   voisin (§4.6 b).
7. `web/scripts/scene-tremplin.mjs` — la porte, **avec son `--essai-rouge`** ;
   lancée **deux fois à quatre largeurs** avant d'être crue.

---

## 13. Questions au propriétaire — chacune avec sa réponse par défaut

1. **La scène est-elle CINÉMATIQUE, ou projette-t-elle la deuxième loi ?**
   (§1, §2.6, §10.6.) La plus belle conséquence du chapitre — *au sommet d'une
   bosse, la route pousse **moins** fort que le poids ; à $v^2/R = g$, elle ne
   pousse plus du tout* — demande $\sum\vec F = m\vec a$ projetée sur la base.
   **Recommandation : la scène reste cinématique, et la PROSE fait la
   projection**, trois lignes après l'énoncé de la deuxième loi. Deux raisons :
   la scène est **avant** cet énoncé (une étape qui projetterait enseignerait le
   paragraphe suivant), et la frontière « aucune force » devient alors mesurable
   au lieu d'être une prudence. *Réversible : une sixième étape, placée après
   `lesson.md:150`, coûterait une clé d'état `masse` et un second marqueur — pas
   une étape de plus au même endroit.*
2. **Faut-il une bosse (courbure inverse) dans la scène ?** (§2.6.) C'est le cas
   qui casse le mieux « la normale, c'est vers le haut ». **Recommandation :
   non** — la piste du sujet 2019 n'a **aucune** partie convexe, aucune entrée de
   banque de la notion n'en a, et inventer une bosse pour le plaisir du cas serait
   quitter le sujet réel. **LDN-36 la porte**, chiffrée (dos d'âne, $R = 50$ m,
   $20$ m·s⁻¹, $a_N = 8{,}0$ m·s⁻² vers le bas). *Si le propriétaire tranche
   l'inverse : une valeur `bosse` au contrôle `rayon`, une famille de porte
   symétrique, et l'échelle géométrique à revoir.*
3. **Le placement dans R3, ou un rung « R3bis » à part ?** (§3.) **Recommandation :
   dans R3**, entre `### Construire $\vec a_G$` et `### L'énoncé de la deuxième
   loi` — c'est **l'ordre du `programme` du cadre**, qui nomme le repère de
   Freinet dans la ligne du vecteur accélération et **avant** la 2ᵉ loi. Un rung à
   part obligerait à renuméroter R4→R9 et casserait **cinq** `lesson_placement` et
   tous les `rung:` des 33 items. *Coût du défaut : R3 devient long.*
4. **Le vingtième modèle de misconception** (§8.2) : ouvrir
   `acceleration-traitee-comme-un-nombre` avec ses quatre items, ou amender
   `force-liee-a-vitesse` ? **Recommandation : ouvrir.** C'est le seul modèle qui
   **coche la bonne réponse aux 33 items et aux 6 entrées de banque** — tous
   rectilignes — et que trois `feedback`/`solution` du fichier invoquent déjà sans
   pouvoir le nommer. Décision humaine : elle touche l'inventaire et un
   `coverage_summary` généré. *Réversible : onze étiquettes de choix, quatre
   `primary_misconception`, une `description` à amender (§8.2, voie de repli).*
5. **Un point d'arrêt de plus dans R3 ?** (§4.6 c.) `checkpoints.yaml` en porte
   cinq ; R3 a déjà `cp-r3-force-vitesse`. **Recommandation : non** — les **cinq
   paris** de la scène sont des portes d'engagement, et la `REVIEW-2026-09-12`
   reproche déjà à la notion d'avoir « **cinq items du banc pré-dépensés** », dont
   trois clones de checkpoints. Ajouter une sixième porte en clonant LDN-34
   aggraverait exactement ce défaut. *Si le propriétaire en veut une, qu'elle
   porte $\vec a\cdot\vec v$ (LDN-37) et **pas** le virage (LDN-34), pour ne pas
   pré-dépenser l'item qui sert le savoir-faire central.*
6. **Un graphe $a_N = f(v)$ ou $a_N = f(1/R)$ ?** (§2.6, §9.14.)
   **Recommandation : non.** La lecture graphique d'une pente **n'est enseignée
   nulle part dans la notion** (`REVIEW-2026-09-12`, dette non résolue), et quatre
   entrées de banque sur six l'exigent. Une scène ne doit pas exercer un geste que
   la leçon n'a pas posé — et la dette de la pente se paie par de la **prose**,
   pas par un graphe de plus. L'invariant se lit en **produit**
   ($a_N \times R = v^2$), comme au banc de diffraction. *Si la dette de la pente
   est payée un jour, une sixième étape « graphe » deviendra naturelle.*
7. **La garde de périmètre de `checkpoints.yaml:34-38`** dit « *Translation
   seulement. […] pas de rotation.* » Une trajectoire courbe n'est ni l'une ni
   l'autre. **Recommandation : retoucher la ligne**, sans changer le périmètre :
   « *Mouvement du centre d'inertie, rectiligne ou curviligne (base de Freinet) ;
   pas de rotation d'un solide autour d'un axe.* » *C'est une ligne de commentaire
   YAML, non rendue ; mais une garde qui interdit ce que la leçon enseigne est une
   garde qui ne sera plus lue.*
8. **`tool: "scene2d"` et le nom du dossier.** Question héritée des specs de la
   cuve, de la corde, des noyaux et du banc : faut-il renommer
   `web/src/lib/scene3d/` (+ `scenes.json`) en `scene/` ? **Recommandation :** oui,
   mais dans un commit **mécanique séparé**, jamais dans celui de la scène.
   *Cinquième spec à poser la même question : c'est le signe qu'il faut outiller le
   geste, pas réécrire la note (ADR 0033).*
9. **L'orthographe « Freinet » / « Frenet » dans le corpus RENDU** (en-tête).
   Aujourd'hui, un élève lit « base de **Freinet** » dans la leçon de
   `chute-mouvements-plans` et « base de **Frenet** » dans le **titre** d'une
   entrée de banque de la même notion. **Recommandation : « Freinet » partout où
   l'on parle à l'élève** (c'est ce qu'impriment le cadre **et** les sujets), avec
   **une** parenthèse de prose qui nomme Frenet une fois (§4.3, point 5), et la
   graphie **gardée par la porte** (`frontiere` : la scène écrit « Freinet »).
   *Décision humaine : elle touche un nom propre et la fidélité à l'examen.*
10. **Le champ `habilete`** (§0, §8.4) : il est **absent des 33 items**, et le
    mélange 13,5 / 4,05 / 9,45 du cadre est donc **incalculable** sur cette notion
    comme sur les autres. **Recommandation : ne pas l'ajouter ici** — ce serait un
    changement de schéma décidé au détour d'une scène. C'est
    `DECISIONS-EN-ATTENTE` §3, et il faut le trancher pour les 62 notions à la
    fois. *Conséquence assumée : les quatre items neufs sont tous d'utilisation
    des ressources, et personne ne peut le mesurer autrement qu'à la lecture.*
11. **Le BLOQUANT 525 N / 532 N** (`REVIEW-2026-09-12`) reste ouvert. La scène
    **ne le touche pas** : elle n'affiche ni $F$, ni $m$, ni $g$, et n'emploie que
    les quatre valeurs sur lesquelles `r-bac` et `bank.yaml` s'accordent
    explicitement (§0). **Recommandation : le trancher quand même avant de
    livrer**, parce que la scène **attire l'attention sur ce sujet précis** : un
    élève qui reconnaît la piste ira lire le sommet et la banque, et y trouvera
    deux corrigés contradictoires. *Ce n'est pas une dette de cette scène ; c'est
    une dette que cette scène rend plus visible.*
12. **$R = 20$ m est une constante INVENTÉE** (§5.2, §10.7) : le sujet décrit un
    « tremplin B'C' circulaire » et **ne donne aucun rayon**. **Recommandation :
    garder**, pour la raison mesurée qui la rend défendable — gaz gardés à
    l'accélération du sujet, elle amène la moto en C à **20,3 m·s⁻¹**, à
    **1,5 %** du $V_C = 20$ m·s⁻¹ que le même sujet donne. La provenance est
    écrite dans la `caption_fr`, jamais tue. *Si le propriétaire refuse toute
    constante hors sujet, il n'y a pas de scène : le rayon est l'objet même de
    l'étape 3.*
13. **Couper une étape ?** Si le propriétaire veut quatre étapes, la **coupable en
    premier est S2** (le carré de la vitesse) : son geste survit dans la `suite` de
    S3 et dans **LDN-35**. Je la garde par défaut pour une raison mesurée : c'est
    **la seule étape où la dépendance quadratique s'établit par une expérience**,
    et c'est la forme du modèle (forme C) qui porte **six** des onze choix de la
    scène. *À l'inverse, S4 n'est pas coupable : elle est la seule à introduire
    $\vec a\cdot\vec v$, savoir-faire du cadre à 0 %.*
14. **Une règle générale née ici, à graver ou à garder en spec.** Deux candidates,
    toutes deux nouvelles :
    - **(a) L'objet-réponse peut n'avoir AUCUNE existence d'énoncé.** Le manège a
      posé « une donnée de l'énoncé ne se peint pas dans la couleur de la
      réponse » ; ici, le vecteur $\vec a$ **est** le concept enseigné, donc il
      n'y a **rien** à peindre à l'encre de ce vecteur, **à aucune étape, à aucun
      repère, même quand il est non nul et banal** (sur la droite, en freinant).
      *Corollaire outillé : `avant-pari` mesure une absence TOTALE, pas une
      absence d'accent.*
    - **(b) Une scène peut être bornée par son RANG dans la leçon, pas seulement
      par le cadre.** La frontière « aucune force » (§9.2) ne vient d'aucune
      `limite` ni d'aucune `exclusion` : elle vient de ce que la scène est posée
      **avant** le paragraphe qui énonce la deuxième loi. C'est une frontière
      **de placement**, et elle se garde exactement comme une frontière de
      programme. *Précédent le plus proche : le solide de révolution bornait le
      **programme** ; ici c'est la **page**.*
    Méritent-elles un addendum à l'ADR 0041 ?

---

## 14. Fait quand

- `node web/scripts/validate-content.mjs --strict content/pc/lois-de-newton`
  passe — **ce qui suppose que `acceleration-traitee-comme-un-nombre` soit déclaré
  dans `items.yaml` au moment où la scène est validée** (§8.2), sans quoi la scène
  part sur la voie de repli.
- `node web/scripts/scene-tremplin.mjs --porte` : **toutes** les familles vertes,
  sur un rendu réel, relancé à **quatre** largeurs d'écran, **au moins deux fois**.
- `node web/scripts/scene-tremplin.mjs --essai-rouge` : **chaque** famille crie,
  avec le vert qui l'a précédée, même dossier, même commande ; et chaque sabotage
  ne fait rougir que la famille qui le garde (§11.4).
- `node web/scripts/test-tremplin.mjs` : les tables A, B, C, D et E du §5.7,
  l'invariant $a_N\times R = v^2$ et l'identité gaz/freinage, à $10^{-12}$.
- `node web/scripts/resume-couverture.mjs` régénéré : `total_items` passe à
  **37**, `acceleration-traitee-comme-un-nombre` à **4**,
  `force-entretient-mouvement` à **7**, `ramp_coverage` R3 à **6** et R8 à **5**.
- **Aucune forme du §9 n'apparaît dans le panneau rendu**, une sonde par forme, et
  `--essai-rouge` les parcourt toutes. En particulier : **aucune « force », aucun
  « poids », aucun « newton », aucun « kg », aucun « centripète », aucun
  « centrifuge », aucun « $\omega$ », aucun « saut »** — ni dans la scène, ni dans
  les quatre items, ni dans les blocs de prose.
- **Les `°` affichés dans le panneau forment exactement $\{10, 18, 28\}$.**
- Les blocs de prose du §4 sont posés **aux ancres nommées**, et **le §4.1 ne
  répond à aucun pari** (relu contre la liste `⟂-avant-pari` de S1).
- **`cp-r3-force-vitesse` est inchangé, au caractère près**, et les six figures de
  la notion n'ont pas bougé.
- **`content/pc/chute-mouvements-plans/lesson.md:339` ne renvoie plus à un
  chapitre qui ne contient pas ce qu'il cite** (§4.6 b) — et `:591` **n'a pas été
  touchée** (elle est juste).
- `dette-manipulable` : **inchangée**. Cette scène ne solde aucune dette écrite —
  elle ne doit donc **pas** être comptée comme un paiement, et le cliquet ne bouge
  pas. `media-manipulable` monte d'une notion.
- La scène ne compte pour **livrée** que si elle est enregistrée dans
  `scenes.json` (ADR 0041 §3).

---

## 15. Ce que je n'ai pas pu vérifier

Écrit ici plutôt que supposé ailleurs. Rien de ce qui suit n'est un défaut connu :
ce sont des **mesures à faire**, pas des affirmations à croire.

1. **Je n'ai pas eu d'accès `git` ni de shell dans cette session.** La convention
   d'en-tête `CHEMIN À CRÉER:` n'a donc **pas** été relue sur la première version
   de la proposition du banc (`git show aa5d04be:…`) : elle est recopiée de la
   proposition SVT, qui survit et qui la porte
   (`docs/pipeline/propositions/svt-chaines-de-montagnes-scene-foyers.md`, l. 9-14).
   Si la forme exacte attendue par la porte `liens-fichiers` diffère, c'est **ici**
   qu'il faut corriger, pas dans la porte.
2. **Le rayon du tremplin n'existe nulle part dans la source.** J'ai lu
   `docs/sujets/pc/lois-de-newton.md` (statut « vérifié ») et la description de
   figure de `docs/sujets/pc/chute-mouvements-plans.md` (l. 238-289), **pas les
   scans**. Aucun des deux ne donne de rayon, et la description de figure ne permet
   pas de le **mesurer au pixel**. *Si quelqu'un peut mesurer l'arc sur
   `0006-big.jpg`, la valeur mesurée doit remplacer les 20 m — et le §10.7 avec.*
3. **La cohérence interne du sujet sur le tremplin n'a pas été résolue, et elle
   est douteuse.** $V_B = 18$ m·s⁻¹ en bas de pente, $V_C = 20$ m·s⁻¹ en **haut**
   du tremplin : si le tremplin était parcouru **sans moteur et sans frottement**,
   la vitesse devrait **diminuer** en montant. Le sujet ne dit rien de cette phase
   (il donne $V_C$), et la scène **n'en conclut rien** : elle laisse l'élève régler
   le pilotage. *C'est une observation sur le sujet réel, pas un défaut du corpus,
   et elle n'est pas à « réparer » — elle est à ne pas contredire.*
4. **Le cadre ne déclare AUCUNE `limites` pour `lois_de_newton`**, et les
   `exclusions` de `mecanique` sont marquées `source: derived` — **inférées, pas
   imprimées**. Le §9 repose donc sur : le `programme` du chapitre (imprimé), les
   `savoir_faire` (imprimés), les chapitres **voisins** du même sous-domaine, et le
   **rang dans la leçon**. *Deux de ces quatre appuis sont des jugements ; ils sont
   à faire valider par le propriétaire avant construction (ADR 0018 : la frontière
   ne se re-dérive pas, elle se signale).*
5. **La forme interdite « ` N` » du §9.2 est dangereusement large** et attrapera du
   français ordinaire. La porte doit la resserrer (`\text{N}`, `newton`, un chiffre
   suivi d'espace puis `N`), **et le resserrement doit être écrit à côté du motif**
   (ADR 0038 : l'unité d'un motif s'écrit à côté du motif). Idem pour `courbure`,
   qui doit rester autorisé dans « rayon de courbure » et « centre de courbure ».
6. **L'échelle du dessin n'a jamais été regardée à l'écran.** Elle est **calculée**
   (§5.8), pas vue. Deux points à trancher **en regardant l'image**, pas en
   calculant : (a) à environ 25 px/m, le centre de courbure tient dans le plateau
   pour $R = 10$, $15$ et $20$ m, **pas pour 30** — l'étiquette « vers le centre —
   à 30 m » doit être essayée ; (b) l'arc de 28° sur 20 m de rayon a une **flèche
   de 0,594 m pour une corde de 9,68 m**, soit ~15 px sur ~240 px : si cela ne
   **se lit pas comme un virage**, il faut changer la **scène** (cadrer plus
   serré, quitte à perdre le centre), **jamais l'échelle verticale** — l'étirer
   fausserait les angles $10°$ et $18°$, qui sont des données du sujet.
7. **La combinaison `course: true` + `etat_revele` n'a jamais été essayée.** Le
   banc de diffraction a `etat_revele` **sans** course ; la cuve, la corde, les
   noyaux, le manège et la particule ont une course **sans** `etat_revele`. Cette
   scène veut les deux, **plus** une étape libre à quatre contrôles. *À vérifier
   dans `validate-content` et dans `usePari` **avant** d'écrire une ligne de rendu :
   c'est le seul endroit où cette scène sort du gabarit des dix précédentes.*
8. **Les cliquets `indice-refus` et `indice-absolu` n'ont pas été lus dans leur
   code.** L'indice qui m'a servi est interne : **LDN-3 choix D** (« On ne peut
   rien dire […] sans connaître les vitesses initiales ») est un **refus de
   conclure** qui vit dans le fichier aujourd'hui, ce qui suggère que le cliquet
   n'est pas armé sur cette notion. *À confirmer avant d'écrire les items — et à
   ne pas prendre pour une permission (§8.3).*
9. **« Les 33 items et les 6 entrées de banque sont tous rectilignes » est mesuré
   par mots-clés, pas par lecture intégrale.** `grep` « courbe | circulaire |
   virage | tourne » sur `items.yaml` donne LDN-12 (qui interroge la **vitesse**)
   et deux occurrences de contexte. C'est l'appui principal du §8.2 : **à
   re-mesurer par une lecture des 33 `stem` avant d'ouvrir le modèle.**
10. **L'ordre des notions n'a pas été re-mesuré.** Je suppose que
    `pc/lois-de-newton` précède `pc/chute-mouvements-plans` et
    `pc/atome-mecanique-newton` — c'est l'ordre du cadre et celui que les deux
    renvois supposent. Si l'ordre de programme affiché disait autre chose, la
    retouche du §4.6 b tomberait, et avec elle un des arguments du §0.
11. **Le ralenti ×6 n'a pas été éprouvé.** Une course de 3,0 s (18 m·s⁻¹) à 6,0 s
    (9 m·s⁻¹) est un **calcul**. La cuve a montré qu'une durée se juge en la
    regardant, et qu'un onglet d'arrière-plan fausse tout : la porte doit mesurer
    la durée **contre l'horloge** (§11.2, `course`) et la page doit rester au
    premier plan.
12. **Personne n'a encore vu six objets vectoriels au même point.** Au repère
    `milieu`, la scène dessine $\vec v$, $\vec u_T$, $\vec u_N$, $a_T\vec u_T$,
    $a_N\vec u_N$, $\vec a$, le parallélogramme et sept étiquettes — dans un rayon
    de ~200 px, et ~60 px au téléphone. **C'est le risque de lisibilité principal
    de cette scène.** `disposer` est obligatoire, et si cela ne suffit pas, la
    réponse est de **retirer un objet** (le parallélogramme, ou $\vec v$ dont la
    direction est déjà portée par $\vec u_T$), **jamais** d'élargir la tolérance
    de la famille `etiquettes`.


