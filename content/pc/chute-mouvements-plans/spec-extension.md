# Spec d'extension — Chute libre et mouvements plans : frottement fluide + satellites

> **Statut :** spec de conception pédagogique (pedagogy-architect). N'écrit PAS le
> `lesson.md` ni les `items.yaml`. **Ne pas toucher** aux chapitres R0–R6 ni au sommet
> « Pour t'entraîner ».

---

## 0. Cadrage cadre (autorité : `docs/cadre/curriculum/pc-physique-chimie.yaml`)

- **Filière / matière :** sciences_physiques / physique_chimie
- **Domaine → sous-domaine → chapitre :** physique → `mecanique` → `applications_dynamique`
- **Poids examen (sous-domaine) :** `part_examen: 27` — **le sous-domaine le plus lourd de
  toute la physique** (rang 1). Habiletés à viser (ratios U 50 / App. exp. 15 / Résol. 35) :
  Utilisation 13,5 · Application expérimentale 4,05 · Résolution 9,45. → item-author :
  ce cluster porte une part majeure de l'examen ; viser un fort volume de **résolution de
  problème** (établissement d'équation différentielle, établissement de la 3e loi de Kepler)
  et un mode **application expérimentale** réel (méthode d'Euler sur données, TP chute avec frottement).
- **Savoir-faire couverts** (cadre p.10-11, chapitre `applications_dynamique`, programme p.22) :
  - « Connaître/exploiter les deux modèles de frottement fluide : $F = -k\,v$ et $F = -k\,v^2$. » → R7
  - « Exploiter $v_G = f(t)$ pour déterminer vitesse limite $v_\ell$, temps caractéristique $\tau$, régime initial/permanent. » → R7
  - « Appliquer la 2e loi pour établir l'équation différentielle (chute verticale avec frottement) ; appliquer la **méthode d'Euler** (résolution approchée). » → R7 (ODE), R8 (Euler)
  - « Connaître les référentiels héliocentrique/géocentrique ; les trois lois de Kepler ; les appliquer (trajectoire circulaire). » → R9, R10
  - « Connaître la loi de gravitation universelle (forme vectorielle) ; établir la 3e loi de Kepler (cas circulaire) ; force gravitationnelle centripète ; appliquer la 2e loi (satellite/planète). » → R9, R10
- **Limites (cadre p.10-11) portées comme contraintes DURES :**
  - « **Méthode d'Euler : seule méthode numérique au programme.** » → aucune autre méthode
    numérique (Runge-Kutta, etc.).
  - Le régime amorti de la chute avec frottement s'étudie par **établissement de l'équation
    différentielle + exploitation de $v_G = f(t)$ + Euler**, JAMAIS par **intégration analytique
    fermée** (pas de séparation des variables, pas de solution exponentielle $v(t)=v_\ell(1-e^{-t/\tau})$
    dérivée à la main). Cette frontière **est le miroir exact de la frontière RLC/oscillateur amorti**
    du cadre (établir l'ODE seulement ; solution fermée réservée au cas idéalisé). content-author
    peut *nommer* le comportement (montée vers $v_\ell$) mais ne le **dérive pas** analytiquement.
  - « Particule chargée : champ magnétique uniforme avec $\vec B \perp \vec v_0$ uniquement. » (déjà couvert en R6, rappel de cohérence).
- **HORS-CADRE explicite (task + cadre) :** **orbites elliptiques quantitatives.** Le cadre
  n'exige les lois de Kepler qu'énoncées, et leur **application au seul cas circulaire**
  (« les appliquer (trajectoire circulaire) » ; « établir la 3e loi de Kepler (**cas circulaire**) »).
  → On peut énoncer les 3 lois (dont la 1re : ellipses, foyer occupé par l'astre), mais tout
  calcul (vitesse, période, rayon) se fait en **circulaire uniforme**. Pas d'équation de vis-viva,
  pas de demi-grand axe quantitatif, pas de calcul sur ellipse.
- **Exclusions du sous-domaine (s'appliquent) :** régime forcé analytique / résonance analytique ;
  moment cinétique vectoriel général ; mécanique lagrangienne ; relativité.

---

## 1. Placement et numérotation

Insérer **4 nouveaux chapitres** (deux clusters) entre l'actuel R6 (particule chargée dans
$\vec B$) et le sommet « Pour t'entraîner ».

| Nouveau | Titre | Cluster |
|---|---|---|
| **R7** | La chute verticale réelle : quand le fluide freine (frottement, $v_\ell$, $\tau$) | (a) frottement |
| **R8** | Résoudre pas à pas : la méthode d'Euler | (a) frottement |
| **R9** | Gravitation et mouvement circulaire : la force centripète | (b) satellites |
| **R10** | La 3e loi de Kepler (cas circulaire) et le satellite géostationnaire | (b) satellites |
| R11 | Pour t'entraîner (sommet) | — (ancien R7) |

**Delta chapitres réels : +4.** Le sommet passe de R7 à R11.

**Cohérence d'enchaînement.**
- R7 s'oppose frontalement à R1 (chute **libre** = idéalisation sans frottement) : l'ouvrir en
  disant « au R1, on avait négligé l'air ; ici on ne le néglige plus ». La masse, qui avait
  *disparu* en chute libre (R1–R3), **réapparaît** avec le frottement — point de contraste fort.
- R9 réutilise **exactement la méthode de R6** (force perpendiculaire à $\vec v$ → norme de $v$
  constante → mouvement circulaire uniforme) : la force de Lorentz de R6 et la force
  gravitationnelle de R9 sont deux forces centripètes qui ne travaillent pas. Le faire dire
  explicitement (« même raisonnement qu'au rung 6, autre force »). L'indépendance de la masse
  du satellite fait écho à l'indépendance de la masse du projectile (R2–R3).

**Voix (dispositifs obligatoires) :** worked examples ouverts par « *Ce qu'on cherche ici, et
pourquoi ce geste :* » ; predict-then-break par « **Prends position avant de…** » / « **Arrête-toi
avant de lire la suite** » ; médias `[[figure:slug]]` (structural-diagram), `[[motion:slug]]`
(manim), `[[embed:slug]]` (manipulable).

---

## 2. R7 — La chute verticale réelle : frottement fluide, $v_\ell$, $\tau$

**Objectif d'apprentissage.** Établir, par la 2e loi, l'équation différentielle de la vitesse
d'un solide en chute verticale avec frottement fluide ($F = -k v$ ou $F = -k v^2$) ; en extraire
la **vitesse limite** $v_\ell$ et le **temps caractéristique** $\tau$ ; distinguer **régime initial**
et **régime permanent** en exploitant $v = f(t)$.

**Mécanisme à enseigner (concret avant abstrait).**
1. **Le bilan change.** À la chute libre (R1), une seule force : le poids. Ici, une seconde
   force apparaît, la **force de frottement fluide**, qui s'oppose au mouvement — donc dirigée
   vers le haut quand l'objet descend. Deux modèles au programme : $\vec F = -k\vec v$ (basses
   vitesses, frottement linéaire) et $\vec F = -k v\,\vec v$ de norme $k v^2$ (vitesses plus
   grandes, frottement quadratique). Bien préciser : $F$ **croît avec $v$** — c'est toute la clé.
2. **L'équation différentielle** (cas linéaire, axe $Oy$ vers le bas pour la simplicité ; le
   signe suit le choix d'axe, méthode R1). 2e loi projetée : $m\dfrac{dv}{dt} = mg - k v$, soit
   $$\frac{dv}{dt} = g - \frac{k}{m}\,v.$$
   L'écrire aussi sous la forme structurelle $\tau\dfrac{dv}{dt} = v_\ell - v$ en **identifiant**
   (pas en résolvant) $\tau = m/k$ et $v_\ell = mg/k$.
3. **Régime initial.** À $t=0$, $v=0$ → frottement nul → $\dfrac{dv}{dt} = g$ : l'objet démarre
   *comme en chute libre* (accélération $g$). Le frottement ne « mord » qu'une fois la vitesse installée.
4. **Régime permanent / vitesse limite.** Quand $v$ augmente, $F=kv$ augmente jusqu'à
   **compenser** le poids. Alors $\dfrac{dv}{dt}=0$ et la vitesse se stabilise :
   $mg = k v_\ell \Rightarrow v_\ell = \dfrac{mg}{k}$ (cas linéaire) ou $v_\ell=\sqrt{\dfrac{mg}{k}}$
   (cas quadratique). $v_\ell$ s'obtient en **annulant l'accélération dans l'ODE** — pas en
   résolvant l'ODE. $\tau$ se lit graphiquement (tangente à l'origine, ou ~63 % de $v_\ell$).
5. **La masse revient.** $v_\ell = mg/k$ dépend de $m$ : contrairement à la chute libre, **deux
   objets de même forme mais de masses différentes n'ont pas la même vitesse limite** (le plus
   lourd va plus vite). Contraste explicite avec R1–R3.

**Misconceptions à confronter (predict-then-break).**
- **CH-FR-1 — « à la vitesse limite, il n'y a plus de force / la force de frottement a disparu. »**
  Casser : à $v_\ell$, la force de frottement est **maximale et égale au poids** ($k v_\ell = mg$) ;
  ce qui est nul, c'est la **somme** des forces (donc l'accélération), pas le frottement. « Somme
  nulle » ≠ « pas de force ».
- **CH-FR-2 — « avec frottement, l'objet accélère indéfiniment / tombe de plus en plus vite tout du long. »**
  Casser : l'accélération **décroît** vers 0 ; la vitesse **plafonne** à $v_\ell$. (Prédiction
  demandée avant de montrer la courbe $v=f(t)$.)
- **CH-FR-3 — « la masse ne joue jamais dans une chute (comme en chute libre). »**
  Casser : vrai seulement sans frottement (R1). Avec frottement, $v_\ell = mg/k$ dépend de $m$ :
  le plus lourd atteint une vitesse limite plus grande. La règle « tous tombent pareil » ne vaut
  qu'à l'idéalisation R1.

**Arc d'exemple travaillé.** Une bille lâchée sans vitesse dans un liquide visqueux, frottement
linéaire $F=-kv$, données $m$, $k$, $g$ fournies. *Ce qu'on cherche :* (1) bilan + 2e loi →
$\dfrac{dv}{dt}=g-\frac{k}{m}v$ ; (2) à $t=0$, $a=g$ (régime initial, comme R1) ; (3) $v_\ell=mg/k$
en posant $a=0$ ; (4) lire $\tau$ sur la courbe $v=f(t)$ fournie (tangente à l'origine coupant
l'asymptote $v_\ell$ à $t=\tau$). Refermer : la solution complète $v(t)$ n'est **pas** demandée
— on établit l'ODE et on l'exploite (cf. HORS-CADRE).

**Médias (ADR 0017).**
- `[[figure:vitesse-vs-temps-frottement]]` — **type: structural-diagram · tool: svg+katex.**
  Courbe $v=f(t)$ montant de 0 vers l'asymptote $v_\ell$ ; tangente à l'origine (pente $g$),
  repère de $\tau$, zones « régime initial » / « régime permanent » annotées.
- `[[figure:bilan-forces-chute-frottement]]` — **type: structural-diagram · tool: svg+katex.**
  Deux instantanés : au début ($\vec P$ seul « efficace », $\vec f$ petit) ; à $v_\ell$
  ($\vec P$ et $\vec f$ opposés et égaux). Vecteurs et labels exacts.
- `[[embed:sandbox-chute-frottement]]` — **type: manipulable · tool: geogebra/desmos.**
  Curseurs $m$, $k$ ; la courbe $v=f(t)$ se redessine, $v_\ell$ et $\tau$ s'affichent. Sert
  CH-FR-3 (voir $v_\ell$ monter avec $m$).

**HORS-CADRE (citer la limite).** **Aucune intégration analytique fermée** de l'ODE (pas de
séparation des variables, pas de $v(t)=v_\ell(1-e^{-t/\tau})$ dérivée) — miroir exact de la
frontière RLC/oscillateur amorti (« établir l'ODE seulement »). On établit l'équation, on
identifie $v_\ell$ et $\tau$, on exploite la courbe et on résout numériquement par Euler (R8).

**3 items diagnostiques.**
1. *Stem :* Un solide en chute verticale dans un fluide ($F=-kv$) atteint sa vitesse limite. Que peut-on dire de l'accélération et de la force de frottement à cet instant ?
   - (A) $a=0$ et la force de frottement égale le poids ($kv_\ell = mg$) — **CORRECT.**
   - (B) $a=0$ et la force de frottement est nulle — encode **CH-FR-1.**
   - (C) $a=g$ toujours, le frottement ne change rien — encode « frottement négligeable ».
   - (D) L'objet s'arrête ($v_\ell=0$) — encode « vitesse limite = arrêt ».
2. *Stem :* De l'ODE $\dfrac{dv}{dt}=g-\dfrac{k}{m}v$, la vitesse limite vaut :
   - (A) $v_\ell = \dfrac{mg}{k}$ — **CORRECT.**
   - (B) $v_\ell = \dfrac{k}{mg}$ — encode inversion du rapport.
   - (C) $v_\ell = \dfrac{g}{k}$ — encode oubli de la masse.
   - (D) $v_\ell = \sqrt{\dfrac{mg}{k}}$ — encode confusion avec le modèle quadratique $F=-kv^2$.
3. *Stem :* Deux billes de **même forme** mais de masses différentes tombent dans le même fluide (frottement $F=-kv$, même $k$). Que dire de leurs vitesses limites ?
   - (A) La plus lourde a une vitesse limite plus grande ($v_\ell=mg/k$) — **CORRECT.**
   - (B) Elles ont la même vitesse limite (la masse n'intervient jamais) — encode **CH-FR-3.**
   - (C) La plus légère va plus vite — encode inversion.
   - (D) Sans frottement, la masse jouait ; avec frottement, non — encode inversion de la règle R1.

---

## 3. R8 — Résoudre pas à pas : la méthode d'Euler

**Objectif d'apprentissage.** Appliquer la méthode d'Euler pour résoudre numériquement l'ODE
établie en R7 : à partir de la valeur en $t_i$ et de la pente donnée par l'ODE, calculer la
valeur en $t_{i+1}=t_i+\Delta t$.

**Mécanisme à enseigner (concret avant abstrait).**
1. **Le problème.** L'ODE de R7 donne la **pente** $\dfrac{dv}{dt}$ en tout point, mais pas
   directement $v(t)$ (et on ne la résout pas analytiquement — cadre). Idée d'Euler : avancer
   par petits pas de durée $\Delta t$, en supposant la pente **constante sur chaque pas**.
2. **La formule** (le geste central) :
   $$v_{i+1} = v_i + \left(\frac{dv}{dt}\right)_{\!i}\Delta t = v_i + a_i\,\Delta t,\qquad a_i = g-\frac{k}{m}v_i.$$
   Image mentale : « je connais où je suis ($v_i$) et dans quelle direction je vais ($a_i$) ; je
   marche dans cette direction pendant $\Delta t$, puis je recalcule la direction. » (concret :
   marcher dans le sens de la tangente pendant un court instant, puis corriger le cap).
3. **La position aussi**, si demandé : $y_{i+1}=y_i+v_i\Delta t$. Insister sur l'homogénéité
   (une vitesse × un temps = une longueur ; une accélération × un temps = une vitesse) — c'est le
   garde-fou anti-erreur.
4. **Approximation, pas exactitude.** Euler donne des valeurs **approchées** ; l'erreur
   s'accumule et **diminue quand $\Delta t$ diminue**. C'est un compromis coût/précision, pas
   une solution exacte.

**Misconceptions à confronter (predict-then-break).**
- **CH-EU-1 — « la méthode d'Euler donne la valeur exacte. »** Casser : c'est une **approximation** ;
  plus $\Delta t$ est petit, plus on s'approche de la vraie courbe, sans jamais l'atteindre
  exactement. Montrer deux pas de tailles différentes contre la courbe « vraie ».
- **CH-EU-2 — oubli du $\Delta t$ : « $v_{i+1}=v_i+a_i$. »** Casser par l'**homogénéité** :
  $v_i+a_i$ additionne une vitesse et une accélération — impossible. Le facteur $\Delta t$ est
  obligatoire (accélération × temps = vitesse).
- **CH-EU-3 — pente prise au mauvais point / $a$ non recalculé.** Casser : $a_i$ dépend de $v_i$
  (via l'ODE), donc **change à chaque pas** ; utiliser $a=g$ constant (comme en chute libre)
  ignore le frottement et fausse tout dès le 2e pas.

**Arc d'exemple travaillé.** Reprendre la bille de R7 (mêmes $m$, $k$, $g$), $v_0=0$, $\Delta t$
donné. *Ce qu'on cherche :* dresser un **tableau d'Euler** de 3–4 lignes : colonnes $t_i$,
$v_i$, $a_i=g-\frac{k}{m}v_i$, $v_{i+1}=v_i+a_i\Delta t$. Faire voir que $a_i$ **décroît** ligne
après ligne (le frottement mord de plus en plus) et que $v_i$ tend vers le $v_\ell$ calculé en R7
— cohérence croisée entre l'ODE (R7) et le calcul pas à pas (R8).

**Médias (ADR 0017).**
- `[[figure:tableau-euler-pas-a-pas]]` — **type: structural-diagram · tool: svg+katex.**
  Le tableau $t_i / v_i / a_i / v_{i+1}$ rempli, plus le schéma géométrique « marcher le long de
  la tangente sur $\Delta t$, puis recalculer ». Structure exacte.
- `[[embed:euler-taille-de-pas]]` — **type: manipulable · tool: geogebra/desmos.**
  Curseur $\Delta t$ : la ligne brisée d'Euler se superpose à la courbe « vraie » ; en réduisant
  $\Delta t$, l'écart se resserre. Sert directement CH-EU-1.

**HORS-CADRE (citer la limite).** Cadre p.11 : « Méthode d'Euler : **seule méthode numérique au
programme**. » → ne présenter aucune autre méthode (Euler implicite, Runge-Kutta, point milieu).
Pas d'analyse d'erreur formelle (ordre de convergence). On applique la récurrence explicite, point.

**3 items diagnostiques.**
1. *Stem :* Dans la méthode d'Euler appliquée à $\dfrac{dv}{dt}=a(v)$, la valeur au pas suivant est :
   - (A) $v_{i+1}=v_i+a_i\,\Delta t$ — **CORRECT.**
   - (B) $v_{i+1}=v_i+a_i$ — encode **CH-EU-2** (oubli de $\Delta t$, incohérence dimensionnelle).
   - (C) $v_{i+1}=v_i\cdot\Delta t$ — encode confusion produit/somme.
   - (D) $v_{i+1}=v_i+g\,\Delta t$ — encode **CH-EU-3** (pente figée à $g$, frottement ignoré).
2. *Stem :* Bille avec $v_i=2{,}0\ \text{m/s}$, $a_i=6{,}0\ \text{m/s}^2$ (issu de l'ODE), $\Delta t=0{,}1\ \text{s}$. Valeur d'Euler de $v_{i+1}$ ?
   - (A) $2{,}6\ \text{m/s}$ ($2{,}0+6{,}0\times0{,}1$) — **CORRECT.**
   - (B) $8{,}0\ \text{m/s}$ ($2{,}0+6{,}0$) — encode CH-EU-2.
   - (C) $2{,}0+9{,}8\times0{,}1 = 2{,}98\ \text{m/s}$ — encode CH-EU-3 (utilise $g$ au lieu de $a_i$).
   - (D) $1{,}4\ \text{m/s}$ ($2{,}0-6{,}0\times0{,}1$) — encode erreur de signe.
3. *Stem :* La méthode d'Euler donne-t-elle la solution exacte de l'équation différentielle ?
   - (A) Non : c'est une approximation ; elle s'améliore quand $\Delta t$ diminue — **CORRECT.**
   - (B) Oui, exactement, quel que soit $\Delta t$ — encode **CH-EU-1.**
   - (C) Oui, à condition que $\Delta t$ soit grand — encode CH-EU-1 (inversion sur le pas).
   - (D) Elle ne marche que pour les équations sans frottement — nie son domaine d'emploi.

---

## 4. R9 — Gravitation et mouvement circulaire : la force centripète

**Objectif d'apprentissage.** Connaître la loi de gravitation universelle (forme vectorielle) ;
appliquer la 2e loi à un satellite en orbite **circulaire** pour montrer que le mouvement est
**circulaire uniforme** et établir la vitesse orbitale $v=\sqrt{GM/r}$, indépendante de la masse
du satellite.

**Mécanisme à enseigner.**
1. **La loi de gravitation universelle.** Deux corps de masses $m_A$, $m_B$ distants de $r$
   s'attirent : $\vec F_{A/B} = -G\dfrac{m_A m_B}{r^2}\,\vec u$ (vecteur unitaire de $B$ vers $A$),
   force **attractive**, dirigée selon la droite des centres, $G$ constante universelle.
2. **Cas du satellite** (masse $m$) autour de la Terre (masse $M$, rayon $R$), orbite circulaire
   de rayon $r$. La force gravitationnelle pointe **toujours vers le centre** de la Terre :
   elle est **centripète**, donc **perpendiculaire à la vitesse** à chaque instant.
3. **Réutiliser R6 mot pour mot.** Force perpendiculaire à $\vec v$ → composante tangentielle
   nulle → $\dfrac{dv}{dt}=0$ → **norme de la vitesse constante** → **mouvement circulaire
   uniforme**. La force gravitationnelle ne travaille pas, comme la force de Lorentz de R6.
4. **Vitesse orbitale.** 2e loi projetée sur la normale (base de Freinet) :
   $m\dfrac{v^2}{r}=G\dfrac{Mm}{r^2}\Rightarrow v=\sqrt{\dfrac{GM}{r}}$. Le $m$ du satellite se
   **simplifie** : $v$ ne dépend **pas** de la masse du satellite — écho à l'indépendance de la
   masse du projectile (R2–R3). Plus l'orbite est haute (grand $r$), plus $v$ est faible.

**Misconceptions à confronter (predict-then-break).**
- **CH-SAT-1 — « en orbite il n'y a pas de gravité / le satellite ne subit aucune force (il flotte). »**
  Casser : la gravité est **exactement** la force qui courbe la trajectoire ; sans elle, le
  satellite partirait en ligne droite (inertie). L'« apesanteur » ressentie est une chute libre
  permanente, pas une absence de gravité. **Misconception phare de ce chapitre.**
- **CH-SAT-2 — « il faut une force dans le sens du mouvement (ou un moteur) pour maintenir le satellite. »**
  Casser : la seule force est **centripète** (perpendiculaire à $\vec v$) ; elle ne pousse jamais
  vers l'avant. Aucune force tangentielle, aucun moteur — le mouvement uniforme se maintient seul.
- **CH-SAT-3 — « un satellite plus lourd doit aller plus vite (ou plus lentement) sur la même orbite. »**
  Casser : $v=\sqrt{GM/r}$ ne contient pas $m$ ; sur une orbite de rayon donné, tous les
  satellites ont la même vitesse, quelle que soit leur masse (comme la chute libre, R2–R3).

**Arc d'exemple travaillé.** Satellite en orbite circulaire basse (rayon $r$ donné, $G$, $M_T$
fournis). *Ce qu'on cherche :* (1) bilan (seule la force gravitationnelle, poids = cette force à
l'altitude considérée) ; (2) montrer force centripète → MCU (renvoi R6) ; (3) 2e loi sur la
normale → $v=\sqrt{GM_T/r}$ ; (4) souligner que $m$ a disparu (renvoi R2–R3). Calculer $v$
numériquement. Contraste explicite avec R6 : Lorentz et gravitation, deux forces centripètes qui
ne travaillent pas, mais l'une électromagnétique, l'autre gravitationnelle.

**Médias (ADR 0017).**
- `[[figure:orbite-force-centripete]]` — **type: structural-diagram · tool: svg+katex.**
  Cercle d'orbite ; à un point, $\vec v$ tangent et $\vec F$ gravitationnelle pointant vers le
  centre (perpendiculaire à $\vec v$). Labels $r$, $M_T$, $\vec F=G\frac{Mm}{r^2}$ exacts.
- `[[motion:satellite-chute-permanente]]` — **type: motion · tool: manim.**
  Montrer le satellite « qui tombe en permanence » : sans force, ligne droite (inertie) ; avec
  force centripète, la trajectoire se referme en cercle. Confronte visuellement CH-SAT-1/CH-SAT-2.

**HORS-CADRE (citer la limite).** Application au **cas circulaire uniquement** (cadre p.11 :
« les appliquer (trajectoire circulaire) »). Pas de calcul sur orbite elliptique, pas de vitesse
de libération, pas d'énergie mécanique orbitale quantitative au-delà de ce que le programme
mécanique traite ailleurs. Pas de problème à deux corps général.

**3 items diagnostiques.**
1. *Stem :* Un satellite décrit une orbite circulaire autour de la Terre. Quelle force subit-il et dans quelle direction ?
   - (A) La force gravitationnelle, centripète (vers le centre de la Terre), perpendiculaire à $\vec v$ — **CORRECT.**
   - (B) Aucune force : à cette altitude il n'y a plus de gravité — encode **CH-SAT-1.**
   - (C) Une force dans le sens du mouvement, qui le fait avancer — encode **CH-SAT-2.**
   - (D) Une force centrifuge, dirigée vers l'extérieur — encode l'inversion centripète/centrifuge.
2. *Stem :* La vitesse d'un satellite en orbite circulaire de rayon $r$ est :
   - (A) $v=\sqrt{\dfrac{GM_T}{r}}$, indépendante de la masse du satellite — **CORRECT.**
   - (B) $v=\sqrt{\dfrac{GM_T}{r}}$ mais un satellite plus lourd va plus vite — encode **CH-SAT-3.**
   - (C) $v=\dfrac{GM_T}{r}$ — encode oubli de la racine (erreur de projection normale).
   - (D) $v=\sqrt{\dfrac{GM_T}{r^2}}$ — encode confusion force/accélération centripète.
3. *Stem :* Pourquoi un astronaute « flotte-t-il » dans la station spatiale en orbite ?
   - (A) Il est en chute libre permanente ; la gravité agit toujours et courbe sa trajectoire — **CORRECT.**
   - (B) Il n'y a plus de gravité à cette altitude — encode CH-SAT-1.
   - (C) Il va assez vite pour échapper à la gravité — encode confusion avec vitesse de libération.
   - (D) La station a un moteur qui compense la gravité — encode CH-SAT-2.

---

## 5. R10 — 3e loi de Kepler (cas circulaire) et satellite géostationnaire

**Objectif d'apprentissage.** Établir la 3e loi de Kepler dans le cas circulaire
($T^2/r^3 = 4\pi^2/GM$) ; l'appliquer au **satellite géostationnaire** (conditions + rayon d'orbite).

**Mécanisme à enseigner.**
1. **Les 3 lois de Kepler énoncées** (référentiel héliocentrique/géocentrique nommés) : (1)
   trajectoire elliptique, l'astre attracteur à un foyer ; (2) loi des aires ; (3)
   $T^2/a^3=$ cste. Préciser tout de suite : **on ne calcule qu'en circulaire** (le rayon $r$
   joue le rôle du demi-grand axe).
2. **Établir la 3e loi (circulaire).** Partir de $v=\sqrt{GM/r}$ (R9) et de $v=\dfrac{2\pi r}{T}$
   (périmètre / période, MCU). Égaler :
   $$\frac{2\pi r}{T}=\sqrt{\frac{GM}{r}}\ \Rightarrow\ \frac{4\pi^2 r^2}{T^2}=\frac{GM}{r}\ \Rightarrow\ \frac{T^2}{r^3}=\frac{4\pi^2}{GM}.$$
   Insister : le membre de droite ne dépend **que de l'astre central** ($M$), donc $T^2/r^3$ est
   la **même constante** pour tous ses satellites — c'est la 3e loi.
3. **Le satellite géostationnaire.** Trois conditions **simultanées** : (i) période
   $T=T_{\text{Terre}}$ (≈ 24 h) ; (ii) orbite dans le **plan équatorial** ; (iii) **même sens**
   que la rotation terrestre. Alors le satellite paraît **immobile pour un observateur au sol**.
   La 3e loi fixe alors **un rayon unique** : $r=\left(\dfrac{GM_T\,T^2}{4\pi^2}\right)^{1/3}$
   (≈ 42 000 km ; altitude ≈ 36 000 km). **Une seule altitude possible.**
4. **Immobile par rapport à quoi ?** Dans le référentiel géocentrique, le satellite **se
   déplace** à sa vitesse orbitale sur un cercle ; il n'est immobile que **relativement au sol**,
   parce qu'il tourne à la **même vitesse angulaire** que la Terre.

**Misconceptions à confronter (predict-then-break).**
- **CH-KEP-1 — 3e loi mal mémorisée : $T/r$ ou $T^3/r^2$ = cste.** Casser par l'établissement :
  c'est $T^2/r^3$ = cste ; le carré est sur la période, le cube sur le rayon (le suivre depuis la dérivation).
- **CH-KEP-2 — « le satellite géostationnaire est immobile dans l'espace / n'a pas de vitesse. »**
  Casser : il est immobile **seulement pour un observateur terrestre** ; dans le géocentrique il
  parcourt un cercle à ~3 km/s. « Immobile » est relatif à un référentiel.
- **CH-KEP-3 — « n'importe quelle altitude peut être géostationnaire. »** Casser : la condition
  $T=24\ \text{h}$ + la 3e loi imposent **un seul** rayon ; toute autre altitude donne une autre
  période, donc un satellite qui dérive par rapport au sol.

**Arc d'exemple travaillé.** *Ce qu'on cherche :* (1) établir $T^2/r^3=4\pi^2/GM_T$ (dérivation
ci-dessus, cohérence croisée avec R9) ; (2) poser les trois conditions géostationnaires ; (3)
avec $T=86\,164\ \text{s}$ (ou $24\ \text{h}$ selon l'énoncé), $G$, $M_T$ donnés, calculer
$r=(GM_T T^2/4\pi^2)^{1/3}\approx 4{,}2\times10^7\ \text{m}$, puis l'altitude $h=r-R_T\approx 3{,}6\times10^7\ \text{m}$.
Boucler : le satellite bouge (dans le géocentrique) mais reste au-dessus du même point au sol.

**Médias (ADR 0017).**
- `[[figure:kepler3-linearisation]]` — **type: structural-diagram · tool: svg+katex.**
  Graphe $T^2 = f(r^3)$ : une droite passant par l'origine, de pente $4\pi^2/GM$ ; quelques
  satellites placés sur la droite (même astre → même droite). Labels et échelles exacts.
- `[[figure:orbite-geostationnaire]]` — **type: structural-diagram · tool: svg+katex.**
  Terre + orbite équatoriale, satellite au-dessus d'un point fixe du sol, flèches de rotation
  (même sens, même $\omega$). Structure exacte.
- `[[embed:orbites-gravite]]` — **type: manipulable · tool: geogebra/desmos/falstad/phet.**
  Embarquer la simulation PhET « Gravity and Orbits » (ne pas la reconstruire) : varier le rayon
  et observer la période changer → il n'existe qu'un rayon donnant $T=24\ \text{h}$ (sert CH-KEP-3).

**HORS-CADRE (citer la limite / task).** **Orbites elliptiques quantitatives = HORS-CADRE** :
les 3 lois s'énoncent, mais tout calcul (période, rayon, vitesse) reste **circulaire** (cadre
p.11 : « établir la 3e loi de Kepler (**cas circulaire**) » ; « les appliquer (trajectoire
circulaire) »). Pas de demi-grand axe chiffré sur ellipse, pas d'excentricité, pas d'équation
de vis-viva, pas de bilan énergétique orbital elliptique.

**3 items diagnostiques.**
1. *Stem :* Pour les satellites d'un même astre en orbite circulaire, la 3e loi de Kepler s'écrit :
   - (A) $\dfrac{T^2}{r^3}=$ constante $=\dfrac{4\pi^2}{GM}$ — **CORRECT.**
   - (B) $\dfrac{T}{r}=$ constante — encode **CH-KEP-1.**
   - (C) $\dfrac{T^3}{r^2}=$ constante — encode CH-KEP-1 (inversion des exposants).
   - (D) $\dfrac{T^2}{r^2}=$ constante — encode confusion (accélération centripète mal projetée).
2. *Stem :* Un satellite géostationnaire est décrit comme « fixe au-dessus d'un point de l'équateur ». Est-il immobile ?
   - (A) Immobile pour un observateur au sol ; dans le référentiel géocentrique il parcourt un cercle à vitesse orbitale — **CORRECT.**
   - (B) Totalement immobile dans l'espace, sans vitesse — encode **CH-KEP-2.**
   - (C) Immobile car aucune force ne s'exerce sur lui — encode CH-KEP-2 + CH-SAT-1.
   - (D) Sa vitesse est nulle car sa période est infinie — encode non-compréhension de $T$.
3. *Stem :* Quelles conditions un satellite doit-il remplir pour être géostationnaire ?
   - (A) $T=T_{\text{Terre}}$, orbite dans le plan équatorial, même sens que la rotation terrestre (→ rayon unique) — **CORRECT.**
   - (B) N'importe quelle altitude convient, tant qu'il est en orbite — encode **CH-KEP-3.**
   - (C) Une orbite polaire à haute altitude — encode confusion géostationnaire/polaire.
   - (D) Une vitesse nulle par rapport au centre de la Terre — encode CH-KEP-2.

---

## 6. Notes de build

**Pour content-author.**
- 4 chapitres R7→R10 dans la voix existante ; renuméroter le sommet en **R11** et étoffer son
  « Récapitulatif express » (ajouter : chute avec frottement / $v_\ell$ / $\tau$ / régimes ;
  méthode d'Euler ; gravitation → MCU → $v=\sqrt{GM/r}$ ; 3e loi de Kepler circulaire ; géostationnaire).
- Fils rouges numériques : réutiliser **la même bille** de R7 à R8 (mêmes $m$, $k$, $g$), et
  **le même astre/satellite** de R9 à R10, comme les leçons existantes filent un exemple.
- Renvois explicites obligatoires : R7↔R1 (chute libre = idéalisation, retour de la masse) ;
  R9↔R6 (force centripète qui ne travaille pas) et R9↔R2/R3 (indépendance de la masse) ;
  R10↔R9 (établissement de la 3e loi à partir de $v=\sqrt{GM/r}$).
- Ajouter au sommet une **variation « lecture d'Euler / de courbe $v=f(t)$ »** (mode application
  expérimentale, TP chute avec frottement) et une **variation Kepler/géostationnaire**.

**Pour item-author.**
- Coverage floor : **≥ 3 items par misconception** (CH-FR-1/2/3, CH-EU-1/2/3, CH-SAT-1/2/3,
  CH-KEP-1/2/3) ; les 3 items/chapitre ci-dessus sont des germes.
- Sous-domaine le plus lourd de l'examen (27 %) : prévoir un fort volume de **résolution de
  problème** (établir l'ODE de R7 ; établir la 3e loi de R10) et un mode **application
  expérimentale** réel (tableau d'Euler à compléter ; lecture de $v_\ell$/$\tau$ sur courbe $v=f(t)$).
- CH-SAT-1 (« pas de gravité en orbite ») est la misconception à la plus haute valeur
  diagnostique : lui consacrer plusieurs items sous des habillages variés (astronaute, ISS, Lune).
- Double-tag autorisé : un item « un satellite plus lourd va-t-il plus vite ? » active à la fois
  CH-SAT-3 (R9) et l'indépendance de la masse (R2/R3) — dual-tag, pas un défaut.
