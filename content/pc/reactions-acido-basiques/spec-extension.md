# Spec d'extension — Réactions acido-basiques : le cluster titrage + distribution

> **Statut :** spec de conception pédagogique (pedagogy-architect). N'écrit PAS le
> `lesson.md` ni les `items.yaml` — content-author et item-author exécutent ci-dessous.
> **Ne pas toucher** aux chapitres existants R0–R7 ni au sommet « Pour t'entraîner ».

---

## 0. Cadrage cadre (autorité : `docs/cadre/curriculum/pc-physique-chimie.yaml`)

- **Filière / matière :** sciences_physiques / physique_chimie
- **Domaine → sous-domaine → chapitre :** chimie → `transformations_non_totales` → `reactions_acido_basiques`
- **Poids examen (sous-domaine) :** `part_examen: 10` (à égalité 1er en chimie). Habiletés à viser (cadre p.18-19, ratios examen U 50 % / App. exp. 15 % / Résol. 35 %) : Utilisation 5.0 · Application expérimentale 1.5 · Résolution 3.5. **Ce cluster est fortement expérimental** (lecture de courbe pH = f(V), montage, choix d'indicateur, TP dosage de l'aspirine) — item-author doit sur-représenter le mode *application expérimentale* ici par rapport à la moyenne de la leçon.
- **Savoir-faire couverts par ce cluster** (cadre p.15, chapitre `reactions_acido_basiques`) :
  - « Indiquer l'espèce prédominante connaissant pH et pKA ; exploiter les diagrammes de prédominance **et de distribution**. » → R8
  - « Écrire l'équation de dosage (une seule flèche) ; connaître le montage d'un dosage acido-basique ; exploiter la courbe/les résultats. » → R9
  - « Repérer et exploiter le point d'équivalence ; justifier le choix de l'indicateur coloré. » → R10, R11
  - Programme p.24 : « Diagrammes de prédominance et de distribution ; zone de virage d'un indicateur coloré ; titrage pH-métrique (volume à l'équivalence, choix de l'indicateur) ; réaction totale : détermination du taux d'avancement final à partir d'un dosage acido-basique. »
- **Limites (cadre p.15) portées comme contraintes DURES :**
  - « pH par exploitation expérimentale et bilans ; équivalence repérée graphiquement (**tangentes / dérivée**). » → aucune formule analytique du pH à l'équivalence n'est exigée ; l'équivalence se REPÈRE sur la courbe, elle ne se CALCULE pas par une expression fermée.
  - « Acides/bases selon BRØNSTED uniquement. »
- **Exclusions du sous-domaine (s'appliquent) :**
  - Solutions tampons quantitatives (Henderson-Hasselbalch, calcul de pH de tampon) — HORS-CADRE.
  - Polyacides / diagrammes multi-pKA au-delà de l'exploitation simple — HORS-CADRE.
  - Dosages d'oxydo-réduction quantitatifs — HORS-CADRE.
- **Dosage conductimétrique d'acide fort — VÉRIFICATION FAITE : HORS-CADRE pour cette leçon.** Le cadre ne liste, pour `reactions_acido_basiques`, que le **titrage pH-métrique** (programme p.24) et le repérage colorimétrique par indicateur. La conductimétrie n'apparaît qu'aux chapitres `suivi_temporel_vitesse` et `etat_equilibre` (conductance ↔ concentrations), jamais comme méthode de **dosage acido-basique**. → Ne pas introduire la conductimétrie dans ce cluster. Si content-author veut une phrase de renvoi, elle doit dire « la conductimétrie est un autre mode de suivi, traité ailleurs », sans l'enseigner ici.

---

## 1. Placement et numérotation

Insérer **4 nouveaux chapitres** entre l'actuel R7 (réaction entre deux couples, K, τ) et
l'actuel sommet « Pour t'entraîner ». Numérotation :

| Nouveau | Titre | Ancien devenu |
|---|---|---|
| **R8** | Le diagramme de distribution : lire les proportions, pas seulement qui l'emporte | — |
| **R9** | Le titrage pH-métrique : suivre une réaction acide-base goutte à goutte | — |
| **R10** | Repérer l'équivalence sur la courbe pH = f(V) : tangentes et dérivée | — |
| **R11** | Choisir l'indicateur coloré : la zone de virage | — |
| R12 | Pour t'entraîner (sommet) | ancien R8 |

**Delta chapitres réels : +4.** Le sommet passe de R8 à R12. content-author doit
renuméroter le sommet et actualiser son « Récapitulatif express » pour intégrer les
quatre nouvelles idées (distribution, équivalence, relation à l'équivalence, zone de virage).

**Cohérence d'enchaînement :** R8 (distribution) est le prolongement direct de R5
(diagramme de prédominance) et de R4 (pKA) — ouvrir R8 en s'y référant explicitement
(« Au rung 5 tu savais *qui* l'emporte ; ici tu vas savoir *dans quelle proportion* »).
R11 (indicateur) réutilise R5/R8 (un indicateur est lui-même un couple acide/base
faible) et le pH à l'équivalence lu en R10.

**Voix à respecter (dispositifs de la leçon, obligatoires) :** worked examples ouverts par
« *Ce qu'on cherche ici, et pourquoi ce geste :* » ; confrontations de misconception par
« **Teste l'idée avant de la croire :** » ou « **Prends position avant de…** » (predict-then-break) ;
médias par `[[figure:slug]]` (structural-diagram) et `[[embed:slug]]` (manipulable).

---

## 2. R8 — Le diagramme de distribution

**Objectif d'apprentissage.** À partir de pH et pKA, lire sur un diagramme de distribution
le **pourcentage** de chaque forme d'un couple AH/A⁻, et distinguer ce diagramme du
diagramme de prédominance (qui, lui, ne dit que quelle forme l'emporte).

**Mécanisme à enseigner (concret avant abstrait, le pourquoi).**
1. Repartir du résultat déjà établi en R5 : $\dfrac{[A^-]}{[AH]} = 10^{\text{pH}-pK_A}$.
2. Définir les **pourcentages** (fractions) de chaque forme :
   $\%AH = \dfrac{[AH]}{[AH]+[A^-]}\times 100$ et $\%A^- = \dfrac{[A^-]}{[AH]+[A^-]}\times 100$,
   avec $\%AH + \%A^- = 100$ (toujours — c'est le garde-fou de lecture).
3. Injecter le rapport : $\%A^- = \dfrac{100}{1 + 10^{pK_A - \text{pH}}}$. Faire voir les trois
   points clés sans calcul lourd : à **pH = pKA** l'exposant est nul → chaque forme vaut
   **exactement 50 %** (les deux courbes se **croisent** là) ; pH ≪ pKA → %AH → 100 ;
   pH ≫ pKA → %A⁻ → 100.
4. **Point de contraste central (le cœur du chapitre) :** le diagramme de prédominance
   est un **axe de pH à une dimension** avec une frontière à pKA qui dit *qui domine* ;
   le diagramme de distribution est un **graphe à deux dimensions** (% en ordonnée, pH en
   abscisse) qui donne *le nombre*. La prédominance est une réponse « qui gagne » ; la
   distribution est une réponse chiffrée « dans quelle proportion ».

**Misconceptions à confronter (predict-then-break).**
- **AB-DIST-1 — « à la frontière pH = pKA, la forme dominante est là à ~100 %, l'autre a disparu. »**
  Casser : à pH = pKA les deux courbes se croisent à **50/50** ; aucune forme n'a disparu.
  Le diagramme de prédominance, mal lu, laisse croire qu'une frontière = une bascule totale.
- **AB-DIST-2 — « prédominance et distribution, c'est la même chose dans deux présentations. »**
  Casser : la prédominance ne donne JAMAIS un pourcentage exact ; deux solutions où A⁻
  prédomine peuvent être à 55 % ou à 99,9 % de A⁻ — seul le diagramme de distribution
  les distingue.
- **AB-DIST-3 — « le croisement des deux courbes est à pH = 7 (la neutralité). »**
  Casser : le croisement est à **pH = pKA** (propriété du couple), sans rapport avec la
  neutralité pH = 7 (propriété de l'eau, R3). Confusion entre pKe/neutralité et pKA/couple.

**Arc d'exemple travaillé.** Couple $CH_3COOH/CH_3COO^-$, $pK_A = 4{,}8$ (réutiliser la valeur
calculée en R4). *Ce qu'on cherche :* lire les proportions à trois pH — pH = 3,8 (une unité
sous pKA), pH = 4,8 (= pKA), pH = 5,8 (une unité au-dessus). Montrer que ±1 unité de pH
autour de pKA fait passer le rapport à ~1/10 ou ~10/1 (donc ~9 % / 91 %), et qu'au croisement
c'est 50/50. Refermer sur la lecture : « prédominer, ce n'est pas être seul » (écho explicite
à la formule de R5).

**Médias (ADR 0017).**
- `[[figure:diagramme-distribution-vs-predominance]]` — **type: structural-diagram · tool: svg+katex.**
  Superposer sur le même axe pH : (haut) l'axe de prédominance à 1D avec la frontière pKA ;
  (bas) les deux courbes de distribution %AH et %A⁻ se croisant à 50 % à pH = pKA. Labels KaTeX exacts.
- `[[embed:distribution-curseur-pH]]` — **type: manipulable · tool: interactive-svg.** **LIVRÉ le
  2026-09-24**, en figure manipulable de première partie (INTERACTIVE-FIGURE-SPEC) sur la figure
  `distribution-curseur-pH` elle-même : après sa dernière étape, un curseur de pH (1 à 9, pas 0,2)
  déplace un repère sur les deux courbes et affiche les deux pourcentages — jamais « 0 » ni « 100 »,
  la leçon réfutant juste avant « la forme dominante a déjà tout pris ». (geogebra/desmos sont fermés
  aux nouveaux embeds depuis l'amendement du 2026-07-07 à l'ADR 0017.)
  Sert à *sentir* que la somme fait toujours 100 % et que le croisement est à pKA (pas à 7).

**HORS-CADRE (citer la limite).** Pas de diagramme de distribution de **polyacide / multi-pKA**
au-delà de l'exploitation simple (exclusion sous-domaine). Pas de calcul de composition d'une
**solution tampon** ni d'exploitation Henderson-Hasselbalch (exclusion sous-domaine). On **lit**
la distribution, on ne l'utilise pas pour prédire un pH de mélange par formule.

**3 items diagnostiques (item-author rédige le YAML final ; ≥3 items/misconception au total).**
1. *Stem :* Diagramme de distribution du couple AH/A⁻ de pKA = 4,8. À pH = 4,8, quelles proportions ?
   - (A) 50 % AH et 50 % A⁻ — **CORRECT.**
   - (B) ≈ 100 % AH, A⁻ négligeable — encode **AB-DIST-1** (la frontière lue comme bascule totale).
   - (C) ≈ 100 % A⁻ — encode AB-DIST-1 (variante symétrique).
   - (D) Impossible sans connaître la concentration c — encode « la distribution dépend de c » (elle ne dépend que de pH − pKA).
2. *Stem :* Quelle est la différence entre diagramme de prédominance et diagramme de distribution ?
   - (A) La distribution donne les pourcentages exacts en fonction du pH ; la prédominance ne dit que quelle forme l'emporte — **CORRECT.**
   - (B) Ce sont les deux mêmes informations, dans deux unités différentes — encode **AB-DIST-2.**
   - (C) La prédominance donne les pourcentages ; la distribution dit qui domine — encode AB-DIST-2 (inversion).
   - (D) La distribution nécessite de connaître la concentration totale — encode « dépend de c ».
3. *Stem :* Sur un diagramme de distribution, les deux courbes se croisent à 50 %. À quel pH ?
   - (A) À pH = pKA du couple — **CORRECT.**
   - (B) À pH = 7 (neutralité) — encode **AB-DIST-3** (confusion pKA/couple ↔ pKe/neutralité).
   - (C) À pH = 0 — distracteur de non-compréhension de l'échelle.
   - (D) Au pH de la solution étudiée, quel qu'il soit — encode « le croisement suit la solution » (il est fixé par le couple).

---

## 3. R9 — Le titrage pH-métrique

**Objectif d'apprentissage.** Écrire l'équation de la réaction **support** d'un dosage
(flèche simple), décrire le **montage**, définir l'**équivalence**, et exploiter la relation
à l'équivalence $C_A V_A = C_B V_E$ (réaction 1:1) pour déterminer une concentration inconnue.

**Mécanisme à enseigner.**
1. **Pourquoi une flèche simple.** Un dosage n'est utile que si sa réaction support est
   **totale, rapide et unique** — écho direct à R7 : c'est le cas $K \gg 1$ (par ex. acide
   faible + base forte HO⁻, dont le pKA élevé de l'eau garantit $K$ énorme). D'où la flèche
   simple $\rightarrow$ (et non $\rightleftharpoons$) : le titrant consommé l'est pour de bon.
   *C'est ce qui rend l'équivalence nette et exploitable.*
2. **Le montage** (concret) : burette graduée (titrant de concentration connue) au-dessus,
   bécher (prise d'essai de la solution titrée, volume connu) sous agitation, sonde pH reliée
   au pH-mètre. On verse le titrant par petits volumes et on relève pH = f(V versé).
3. **L'équivalence, définie proprement :** l'instant où le titrant a été versé en quantité
   **juste stœchiométrique** pour consommer tout le réactif titré — avant, le titré est en
   excès ; après, le titrant est en excès. Pour une réaction 1:1 : $n_{\text{titré}}(0) = n_{\text{titrant}}(V_E)$,
   soit $C_A V_A = C_B V_E$. **C'est une relation de quantités de matière, pas de pH** :
   l'équivalence n'est PAS définie par « pH = 7 ».
4. Le **saut de pH** brutal au voisinage de l'équivalence est la signature exploitable
   (préparé ici, exploité en R10).

**Misconceptions à confronter (predict-then-break).**
- **AB-TIT-1 — « l'équivalence, c'est quand pH = 7. »** Casser : vrai seulement pour
  acide fort / base forte. Pour un acide **faible** titré par une base forte, pH_E > 7
  (milieu basique à l'équivalence, car il reste la base conjuguée A⁻). L'équivalence est
  un fait de **stœchiométrie**, pas une valeur de pH imposée.
- **AB-TIT-2 — « à l'équivalence on a versé le même volume, $V_E = V_A$. »** Casser :
  $V_E = C_A V_A / C_B$ ; les volumes ne sont égaux que si $C_A = C_B$. La relation
  correcte fait intervenir les deux concentrations.
- **AB-TIT-3 — « une réaction à l'équilibre (non totale) peut servir de dosage. »** Casser :
  une réaction limitée ne donne pas d'équivalence nette ni de stœchiométrie exacte ; d'où
  l'exigence *totale, rapide, unique* (lien R7 : il faut $K \gg 1$).

**Arc d'exemple travaillé.** Doser $V_A = 20{,}0\ \text{mL}$ d'acide éthanoïque de concentration
inconnue $C_A$ par la soude $C_B = 0{,}10\ \text{mol/L}$. *Ce qu'on cherche :* (1) écrire la réaction
support $CH_3COOH + HO^- \rightarrow CH_3COO^- + H_2O$ ; justifier $K \gg 1$ donc réaction totale.
(2) Poser la relation à l'équivalence. (3) Étant donné $V_E = 15{,}0\ \text{mL}$ (lu plus tard sur la
courbe en R10), calculer $C_A = C_B V_E / V_A = 0{,}10\times 15{,}0/20{,}0 = 7{,}5\times10^{-2}\ \text{mol/L}$.
Insister : le pH_E > 7 ici et ce n'est pas un problème — l'équivalence se lit au saut, pas à 7.

**Médias (ADR 0017).**
- `[[figure:montage-dosage-phmetrique]]` — **type: structural-diagram · tool: svg+katex.**
  Schéma légendé : burette (titrant), bécher + agitateur, sonde pH + pH-mètre. Structure
  et labels exacts (pas de rendu génératif).

**HORS-CADRE (citer la limite).** Aucun **calcul analytique du pH** aux points remarquables
(demi-équivalence, équivalence) par formule fermée — limite cadre p.15 : « pH par exploitation
expérimentale et bilans ». Pas de **dosage conductimétrique** (voir §0 : hors-cadre pour cette
leçon). Pas de dosage d'oxydo-réduction (exclusion sous-domaine).

**3 items diagnostiques.**
1. *Stem :* On titre un acide **faible** par une base forte. À l'équivalence, le pH vaut :
   - (A) Une valeur > 7 (milieu basique), à lire sur le saut de la courbe — **CORRECT.**
   - (B) Exactement 7, toujours — encode **AB-TIT-1.**
   - (C) Exactement le pKA de l'acide — encode confusion équivalence ↔ demi-équivalence.
   - (D) 0, car tout l'acide a réagi — non-compréhension de l'échelle.
2. *Stem :* On dose $V_A = 20{,}0\ \text{mL}$ d'acide ($C_A$ inconnue) par une base $C_B = 0{,}10\ \text{mol/L}$ ; équivalence à $V_E = 15{,}0\ \text{mL}$ (réaction 1:1). $C_A$ = ?
   - (A) $C_A = C_B V_E / V_A = 7{,}5\times10^{-2}\ \text{mol/L}$ — **CORRECT.**
   - (B) $C_A = C_B = 0{,}10\ \text{mol/L}$ — encode **AB-TIT-2** (ignore les volumes).
   - (C) $C_A = C_B V_A / V_E = 0{,}13\ \text{mol/L}$ — encode inversion du rapport de volumes.
   - (D) $C_A = C_B (V_A + V_E)/V_A$ — encode confusion volume à l'équivalence / volume total.
3. *Stem :* Pourquoi la réaction support d'un titrage doit-elle être totale, rapide et unique ?
   - (A) Pour que l'équivalence soit nette et la relation stœchiométrique exacte — **CORRECT.**
   - (B) Pour que le pH vaille 7 à l'équivalence — encode AB-TIT-1.
   - (C) Une réaction limitée (à l'équilibre) conviendrait aussi bien — encode **AB-TIT-3.**
   - (D) Pour que l'indicateur change de couleur — encode confusion support ↔ repérage.

---

## 4. R10 — Repérer l'équivalence : tangentes et dérivée

**Objectif d'apprentissage.** Sur une courbe expérimentale pH = f(V), **repérer** le volume
équivalent $V_E$ par la **méthode des tangentes** et par la **méthode de la dérivée** dpH/dV,
puis en déduire une grandeur (concentration, quantité de matière).

**Mécanisme à enseigner.**
1. **L'équivalence = le milieu du saut = le point d'inflexion.** Autour de l'équivalence, pH
   varie très vite pour un très petit ajout de titrant : c'est le **saut**. Le point où la
   pente est **maximale** (point d'inflexion) marque $V_E$.
2. **Méthode des tangentes** (géométrique, concret) : tracer deux tangentes à la courbe,
   parallèles entre elles, de part et d'autre du saut ; tracer la parallèle **équidistante**
   entre les deux ; son intersection avec la courbe donne $V_E$ (et pH_E en ordonnée).
3. **Méthode de la dérivée** : tracer dpH/dV en fonction de V ; le **maximum** de cette
   courbe dérivée localise $V_E$. (Insister : c'est le maximum de la *dérivée*, pas un zéro.)
4. Les deux méthodes doivent donner le même $V_E$ — c'est la vérification croisée à exiger,
   comme partout dans cette leçon.

**Misconceptions à confronter (predict-then-break).**
- **AB-EQU-1 — « on lit V_E à l'endroit où pH = 7. »** Casser : on lit $V_E$ au **saut**
  (inflexion), pas à une valeur de pH fixée (renforce AB-TIT-1 depuis la lecture graphique).
- **AB-EQU-2 — « avec la dérivée, l'équivalence est là où dpH/dV = 0. »** Casser : à
  l'équivalence dpH/dV est **maximale**, pas nulle ; c'est l'extremum de la *dérivée*, pas de
  pH. (Confusion classique « extremum → dérivée nulle » appliquée au mauvais niveau.)
- **AB-EQU-3 — lecture de V_{E/2} au lieu de V_E.** À la **demi-équivalence** ($V_{E}/2$) on a
  pH = pKA (repère utile pour retrouver le pKA), mais ce n'est PAS l'équivalence. Casser en
  faisant identifier les deux points sur la même courbe.

**Arc d'exemple travaillé.** Reprendre le dosage de R9 (acide éthanoïque par soude). *Ce qu'on
cherche :* sur la courbe fournie, (1) placer les deux tangentes parallèles et la parallèle
médiane → $V_E = 15{,}0\ \text{mL}$, pH_E ≈ 8,5 ; (2) vérifier sur la courbe dérivée que le maximum
tombe au même $V_E$ ; (3) repérer la demi-équivalence à $V_E/2 = 7{,}5\ \text{mL}$ et lire pH ≈ pKA ≈ 4,8
(cohérent avec R4) — ce qui **distingue** clairement les deux points. Boucler sur le calcul de
$C_A$ (déjà amorcé en R9).

**Médias (ADR 0017).**
- `[[figure:equivalence-methode-tangentes]]` — **type: structural-diagram · tool: svg+katex.**
  Courbe pH = f(V) avec les deux tangentes parallèles, la parallèle médiane et le point E marqué
  ($V_E$, pH_E). Structure et graduations exactes.
- `[[figure:equivalence-courbe-derivee]]` — **type: structural-diagram · tool: svg+katex.**
  Courbe dpH/dV = f(V) avec le maximum aligné verticalement sur $V_E$.
- `[[embed:lecture-Ve-courbe-dosage]]` — **type: manipulable · tool: interactive-svg.** **LIVRÉ le
  2026-09-24**, en figure manipulable de première partie (INTERACTIVE-FIGURE-SPEC) sur la figure
  `lecture-Ve-courbe-dosage` elle-même : après sa dernière étape, l'élève fait glisser un point SUR
  la courbe dessinée (V de 0 à 25 mL, pas 0,1) ; deux repères le relient aux axes, V et pH se
  lisent. La lecture ne dit « équivalence » qu'à $V_E = 15{,}0$ mL et « demi-équivalence :
  pH = pKA » qu'à 7,5 mL — jamais au point où pH = 7 (AB-EQU-1). (geogebra/desmos sont fermés aux
  nouveaux embeds depuis l'amendement du 2026-07-07 à l'ADR 0017.) Sert le mode
  application-expérimentale.

**HORS-CADRE (citer la limite).** Cadre p.15 : « équivalence **repérée graphiquement**
(tangentes / dérivée) » — donc **aucune détermination analytique** de $V_E$ ou de pH_E par
formule. Pas de dérivée seconde ni d'ajustement numérique de courbe. On repère, on ne calcule pas.

**3 items diagnostiques.**
1. *Stem :* Sur une courbe pH = f(V), où se situe le volume équivalent $V_E$ ?
   - (A) Au milieu du saut de pH (point d'inflexion), repéré par la méthode des tangentes — **CORRECT.**
   - (B) À l'abscisse où pH = 7 — encode **AB-EQU-1.**
   - (C) Au début du saut, dès que pH commence à monter vite — encode « seuil » ≠ inflexion.
   - (D) À l'abscisse où pH = pKA — encode **AB-EQU-3** (demi-équivalence confondue avec équivalence).
2. *Stem :* Sur la courbe dérivée dpH/dV = f(V), l'équivalence correspond au point où :
   - (A) dpH/dV est **maximale** — **CORRECT.**
   - (B) dpH/dV = 0 — encode **AB-EQU-2.**
   - (C) dpH/dV est minimale — encode AB-EQU-2 (variante).
   - (D) dpH/dV = 7 — encode confusion axes (valeur de pH plaquée sur la dérivée).
3. *Stem :* Sur la même courbe, à la demi-équivalence ($V = V_E/2$), on lit pH ≈ pKA. Que représente ce point ?
   - (A) La demi-équivalence : la moitié du titré a réagi ; il n'est pas l'équivalence — **CORRECT.**
   - (B) L'équivalence elle-même — encode **AB-EQU-3.**
   - (C) Le point où la solution est neutre — encode AB-EQU-1 (pH = 7 plaqué).
   - (D) Un point sans signification — nie l'exploitation pKA = pH à V_E/2.

---

## 5. R11 — Choisir l'indicateur coloré : la zone de virage

**Objectif d'apprentissage.** Justifier le choix d'un indicateur coloré pour un dosage :
sa **zone de virage** doit **encadrer le pH à l'équivalence** lu en R10.

**Mécanisme à enseigner.**
1. **Un indicateur coloré est lui-même un couple acide/base faible** $HIn/In^-$, dont les
   deux formes ont des **couleurs différentes**. Réutiliser R5/R8 : la forme qui prédomine
   impose la couleur.
2. **Zone de virage** = l'intervalle de pH (≈ **pKA(indicateur) ± 1**) sur lequel on passe
   visuellement d'une couleur à l'autre (aucune forme n'écrase l'autre à plus de ~10/1). En
   dehors, une seule couleur domine.
3. **Le critère de choix** (le cœur) : on choisit un indicateur dont la **zone de virage
   contient le pH à l'équivalence** ($pH_E$, lu en R10). Ainsi le changement de couleur se
   produit au voisinage immédiat du saut, donc quasi au bon volume $V_E$. Concret avant
   abstrait : superposer la zone de virage (bande horizontale) et le saut de la courbe de
   dosage — l'indicateur convient si sa bande coupe le saut.

**Misconceptions à confronter (predict-then-break).**
- **AB-IND-1 — « n'importe quel indicateur convient. »** Casser : un indicateur dont la zone
  de virage ne contient pas $pH_E$ vire trop tôt ou trop tard → erreur sur $V_E$. Prendre
  l'hélianthine (3,1–4,4) pour un dosage à $pH_E ≈ 8{,}5$ : elle a déjà viré bien avant l'équivalence.
- **AB-IND-2 — « l'indicateur vire à pH = 7. »** Casser : chaque indicateur vire dans SA
  propre zone (fixée par son pKA), rien à voir avec 7. Choisir en fonction de $pH_E$, pas de 7.
- **AB-IND-3 — « le changement de couleur donne le volume EXACT à l'équivalence. »** Casser :
  il en donne une **bonne approximation** *à condition* que la zone de virage encadre $pH_E$ ;
  sinon l'écart est réel. L'indicateur repère, il ne définit pas l'équivalence.

**Arc d'exemple travaillé.** Dosage de R9/R10 : $pH_E ≈ 8{,}5$. *Ce qu'on cherche :* choisir parmi
hélianthine (3,1–4,4), BBT (6,0–7,6), phénolphtaléine (8,2–10,0). Seule la phénolphtaléine a
une zone de virage qui **contient 8,5** → c'est elle. Montrer, sur le schéma superposé, que
l'hélianthine virerait dès ~4 mL (loin de 15 mL) et fausserait le dosage. Refermer : « la
couleur change quasi au saut, donc quasi à $V_E$ — c'est tout ce qu'on demande à l'indicateur ».

**Médias (ADR 0017).**
- `[[figure:zone-virage-sur-saut]]` — **type: structural-diagram · tool: svg+katex.**
  Courbe pH = f(V) avec trois bandes horizontales (zones de virage des trois indicateurs) ;
  seule celle qui coupe le saut est retenue. Labels pKA et bornes exacts.

**HORS-CADRE (citer la limite / exclusion).** Traitement **qualitatif** du choix d'indicateur ;
aucune modélisation quantitative de l'équilibre coloré de l'indicateur (pas de calcul du
rapport [In⁻]/[HIn] pour prédire une teinte intermédiaire au-delà de la logique de prédominance R5).
Pas de **solution tampon** (exclusion sous-domaine). Brønsted uniquement.

**3 items diagnostiques.**
1. *Stem :* Dosage d'un acide faible par une base forte, $pH_E ≈ 8{,}5$. Indicateurs : hélianthine (3,1–4,4), BBT (6,0–7,6), phénolphtaléine (8,2–10,0). Lequel choisir ?
   - (A) La phénolphtaléine (sa zone de virage contient 8,5) — **CORRECT.**
   - (B) L'hélianthine (n'importe lequel convient) — encode **AB-IND-1.**
   - (C) Le BBT (car il vire vers 7, le « neutre ») — encode **AB-IND-2.**
   - (D) Celui dont la zone de virage contient le pH **initial** de la solution — encode confusion pH_initial ↔ pH_E.
2. *Stem :* La zone de virage d'un indicateur coloré s'étend approximativement sur :
   - (A) pKA(indicateur) ± 1 — **CORRECT.**
   - (B) Exactement pH = pKA (un point) — encode « virage ponctuel » (pas une zone).
   - (C) Autour de pH = 7 pour tous les indicateurs — encode **AB-IND-2.**
   - (D) Un intervalle qui dépend de la concentration du titrant — encode « la zone bouge avec le dosage ».
3. *Stem :* Le volume au changement de couleur de l'indicateur donne-t-il l'équivalence exacte ?
   - (A) Une bonne approximation, si la zone de virage encadre $pH_E$ — **CORRECT.**
   - (B) Oui, exactement et toujours — encode **AB-IND-3.**
   - (C) Oui, car l'indicateur vire à pH = 7 = équivalence — encode AB-IND-2 + AB-TIT-1.
   - (D) Non, l'indicateur n'a aucun lien avec $V_E$ — nie le rôle de repérage.

---

## 6. Notes de build

**Pour content-author.**
- 4 chapitres R8→R11 dans la voix existante ; renuméroter le sommet en **R12** et étoffer son
  « Récapitulatif express » (ajouter : distribution vs prédominance ; définition + relation à
  l'équivalence ; tangentes/dérivée ; zone de virage encadrant $pH_E$).
- Fil rouge numérique unique à travers R9–R11 (même dosage acide éthanoïque / soude,
  $V_E = 15{,}0\ \text{mL}$, $pH_E ≈ 8{,}5$, pKA = 4,8) — comme les leçons existantes réutilisent un
  même exemple de rung en rung.
- Renvois explicites : R8→R5 (prédominance) et R4 (pKA) ; R9→R7 (K ≫ 1 = réaction totale) ;
  R11→R5/R8 (indicateur = couple faible) et R10 ($pH_E$).
- Ajouter au sommet une **variation** de type « lecture de courbe de dosage réelle » (mode
  application expérimentale) et une variation « choix d'indicateur ».

**Pour item-author.**
- Coverage floor : **≥ 3 items par misconception** (AB-DIST-1/2/3, AB-TIT-1/2/3, AB-EQU-1/2/3,
  AB-IND-1/2/3) — les 3 items/chapitre ci-dessus sont des germes ; compléter pour atteindre le plancher.
- **Sur-représenter l'application expérimentale** (lecture de courbe pH = f(V), lecture de
  distribution, superposition zone de virage / saut) pour matcher le poids expérimental du cluster.
- Prévoir ≥ 1 item réutilisant un **document de TP** (courbe de dosage de l'aspirine, cf. TP cadre
  p.28) en lecture directe.
- Double-tag autorisé : un item « lire pH = pKA à la demi-équivalence » relève à la fois de
  R10 (repérage) et de R4 (pKA) — dual-tag, ce n'est pas un défaut de tige.
