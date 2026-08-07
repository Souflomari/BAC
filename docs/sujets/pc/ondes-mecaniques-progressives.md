# `ondes-mecaniques-progressives` — Ondes mécaniques progressives

> Annales examen national, PC-SPC (BIOF). Transcription **non vérifiée** —
> voir `README.md` §3. Provenance sur l'entrée.
>
> Classement (README §4) : exercice centré sur **célérité** et **retard
> temporel** de propagation (ondes ultrasonores), sans périodicité spatiale
> imposée → `-progressives`.
>
> Cross-reference : **2020 N Exercice II** (« Propagation des ondes », QCM +
> cuve à ondes) est transcrit intégralement sous `ondes-mecaniques-periodiques.md`
> (la Partie II impose $\lambda$ et $N$) ; son item de QCM 5 porte sur la
> relation de retard $y_M(t)=y_s(t-\tau)$, une notion `-progressives`.

---

## 2018 — session normale — Exercice II
Source: https://www.alloschool.com/element/57726
Statut: vérifié — re-fetch indépendant AlloSchool + diff OK (agent-vérificateur, 2026-07-11)

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS28F · Barème de l'exercice : 2,5 points
- Images lues : `.../course-422/upload-45118/0003-big.jpg`, `.../0004-big.jpg`
- Pages du scan : 3 (fin) et 4 (sur 8)

**Détermination de la célérité d'une onde ultrasonore dans un liquide.**

Les ondes mécaniques se propagent seulement dans un milieu matériel, et leur
célérité (vitesse de propagation) croît avec la densité du milieu où elles se
propagent.

Pour déterminer la valeur approximative de la célérité $V_p$ d'une onde
ultrasonore dans le pétrole liquide, on réalise l'expérience suivante :
Dans une cuve contenant du pétrole, on fixe à l'une de ses extrémités deux
émetteurs $E_1$ et $E_2$ qui sont reliés à un générateur GBF. À l'instant
$t_0 = 0$, les deux émetteurs émettent chacun une onde ultrasonore, une se propage
dans l'air et l'autre dans le pétrole. À l'autre extrémité de la cuve, on place
deux récepteurs $R_1$ et $R_2$, l'un dans l'air et l'autre dans le pétrole. Les
récepteurs sont à une distance $L$ des émetteurs. (voir figure 1)
On visualise sur l'écran d'un oscilloscope les deux signaux reçus par $R_1$ et
$R_2$. (voir figure 2)

**Données :**
- les deux ondes parcourent la même distance $L = 1,84\ \text{m}$ ;
- la célérité des ultrasons dans l'air : $V_{air} = 340\ \text{m.s}^{-1}$ ;
- la sensibilité horizontale de l'oscilloscope : $2\ \text{ms/div}$.

1. (0,5) Les ondes ultrasonores sont-elles longitudinales ou transversales ?
   Justifier.
2. (0,5) En exploitant la figure 2, déterminer la valeur du retard temporel
   $\tau$ entre les deux ondes reçues.
3. (0,75) Montrer que l'expression de $\tau$ s'écrit sous la forme :
   $$\tau = L\left(\dfrac{1}{V_{air}} - \dfrac{1}{V_p}\right).$$
4. (0,75) Trouver la valeur approchée de la célérité $V_p$.

*Figure 1 (schéma) :* cuve horizontale. À gauche, les émetteurs $E_1$ (en haut,
dans l'air) et $E_2$ (en bas, dans le pétrole), reliés au **GBF**. À droite, les
récepteurs $R_1$ (air) et $R_2$ (pétrole), reliés à l'**oscilloscope**. La partie
haute de la cuve est de l'**air**, la partie basse (grisée) est le **pétrole** ;
la distance émetteurs → récepteurs est notée $L$.

*Figure 2 (écran d'oscilloscope) :* deux salves (trains d'ondes ultrasonores)
décalées horizontalement — **Voie A** (en haut) et **Voie B** (en bas). Le
décalage horizontal entre les débuts des deux salves matérialise le retard
$\tau$, à mesurer en divisions puis à convertir via $2\ \text{ms/div}$ *(nombre
de divisions du décalage à lire sur le scan)*.

---

## 2024 — session normale — Exercice 2
Source: https://www.alloschool.com/element/145763
Statut: transcrit (non vérifié) — **1ʳᵉ passe de vérification adversariale
effectuée (agent-vérificateur-tiers, 2026-08-06)** : `element/145763` re-dérivé
indépendamment → `course-422/upload-87465`, **6 pages** ; couverture p.1 relue —
**NS 28F**, SPC/BIOF, 3 h, coef 7 ; carte $7+2{,}5+2+3{,}5+5=\mathbf{20}$ ✓.
**Énoncé : conforme.** Diff caractère par caractère contre `0003-big.jpg`
(titre « Propagation d'un signal à la surface de l'eau », QCM A/B/C/D mot pour
mot, tableau $0\,/\,t_1\,/\,t_2=t_1+1{,}5$ et $0\,/\,r_1=14\,/\,r_2=56$,
$v=\sqrt{g.h}$, $g=9{,}8\ \text{m.s}^{-2}$) et `0004-big.jpg` (Q3-1, Q3-2) —
aucune divergence de valeur, unité ou indice ; barème marginal recompté
$0{,}5\times5=\mathbf{2{,}5}$ ✓. **Physique re-dérivée** :
$v=(r_2-r_1)/1{,}5=42/1{,}5=28\ \text{cm.s}^{-1}=0{,}28\ \text{m.s}^{-1}$ ;
$t_1=r_1/v=0{,}5\ \text{s}$ ⇒ $t_2=\mathbf{2{,}0\ \text{s}}$ ;
$h=v^2/g=0{,}28^2/9{,}8=\mathbf{8{,}0\cdot10^{-3}\ \text{m}}$ — valeurs rondes,
l'énoncé est cohérent ✓. **Deux inexactitudes dans la description de la figure
ont été corrigées** (voir ci-dessous) ⇒ README §3 : l'entrée **reste
`transcrit (non vérifié)`**.
**❌→✅ (i) Il n'y a pas de « petit disque » figurant le caillou** : le scan porte
un **encadré rectangulaire « Caillou »** dont une flèche pointe directement sur
le **point $O$** (gros point noir). **❌→✅ (ii) L'étiquette du grand front n'est
pas « $r_2(\text{cm})$ » mais « $r_2$ »** seule ; « $\mathbf{r(cm)}$ » est
l'étiquette **de l'axe**, écrite plus à droite, au-dessus de la flèche
horizontale. Précision ajoutée : les deux fronts d'onde sont des
**demi-cercles** (ouverts vers la gauche, tracés à droite d'une corde verticale
passant par $O$), pas des arcs quelconques.

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7 (NB :
  le résumé HTML d'AlloSchool pour `element/145763` annonce à tort « 2ème BAC
  Sciences Mathématiques B » ; l'en-tête du scan, lu directement, confirme
  sans ambiguïté SPC/BIOF — README §3, l'image fait foi)
- Code sujet : NS 28F · Barème de l'exercice : 2,5 points
  ($0{,}5+0{,}5+0{,}5+0{,}5+0{,}5$, barème en marge)
- Images lues (reproductibilité) : `.../course-422/upload-87465/0003-big.jpg`
  (énoncé, figure, Q1–Q3 stem), `.../0004-big.jpg` (Q3-1, Q3-2)
- Pages du scan : 3 (fin) et 4 (début) (sur 6)
- Classement (README §4) : onde circulaire à la surface de l'eau, question
  centrée sur la **célérité** (rapport rayon/temps, sans longueur d'onde ni
  fréquence imposées) → `-progressives`.

**EXERCICE 2 (2,5 points) : Propagation d'un signal à la surface de l'eau.**

On se propose dans cet exercice d'étudier la propagation d'un signal
mécanique à la surface de l'eau.

Un caillou jeté, en un point O, dans une cuve contenant de l'eau de
profondeur $h$, provoque la formation d'une onde circulaire qui se propage à
la surface de l'eau. (Figure ci-dessous)

1. (0,5) Choisir la proposition juste parmi les propositions suivantes :

   | | |
   |---|---|
   | A | Une onde progressive périodique est caractérisée par sa célérité. |
   | B | Un milieu est dispersif si la célérité de l'onde dépend de sa période T. |
   | C | Lors de la diffraction dans un même milieu, la célérité de l'onde est modifiée. |
   | D | Les ondes mécaniques progressives peuvent se propager dans le vide. |

2. La figure suivante donne l'aspect de la surface de l'eau à deux instants
   $t_1$ et $t_2$. Le tableau suivant donne les valeurs des rayons du front
   d'onde à des instants donnés :

   | $t(\text{s})$ | $0$ | $t_1$ | $t_2 = t_1 + 1{,}5$ |
   |---------------|:---:|:-----:|:-------------------:|
   | $r(\text{cm})$ | $0$ | $r_1 = 14$ | $r_2 = 56$ |

   1. **2-1.** (0,5) Déterminer la valeur de la célérité $v$ de l'onde.
   2. **2-2.** (0,5) En déduire la valeur de l'instant $t_2$.
3. On peut estimer la célérité $v$ de l'onde qui se propage à la surface de
   l'eau par la relation : $v = \sqrt{g.h}$ avec $g = 9{,}8\ \text{m.s}^{-2}$
   étant l'intensité de la pesanteur et $h$ la profondeur de l'eau.
   1. **3-1.** (0,5) En utilisant les équations aux dimensions, vérifier
      l'homogénéité de cette relation.
   2. **3-2.** (0,5) Calculer $h$.

*Figure (schéma, vue de dessus de la surface de l'eau) :* en haut à gauche, un
**encadré rectangulaire « Caillou »** relié par une flèche oblique descendante
au point $O$ (**gros point noir**, centre du dispositif) — le caillou lui-même
n'est pas dessiné. Centrés sur $O$ et tracés **à droite d'une corde verticale
passant par $O$**, deux **demi-cercles concentriques** matérialisent les fronts
d'onde successifs : le premier, de petit rayon, est relié par une flèche à un
encadré « **L'aspect à l'instant $t_1$** » (en haut à droite) ; le second, de
grand rayon, est relié par une flèche à un encadré « **L'aspect à l'instant
$t_2$** » (en bas à droite). Un **axe horizontal fléché vers la droite** part de
$O$, traverse les deux demi-cercles et porte, en bout, l'étiquette
« $\mathbf{r(cm)}$ ». Les rayons sont repérés par deux étiquettes posées sur cet
axe : « $r_1$ » juste après le petit demi-cercle et « $r_2$ » juste après le
grand ( « $r_2$ » **sans** l'unité — celle-ci n'apparaît que sur l'étiquette de
l'axe). Aucune valeur numérique autre que celles du tableau n'est chiffrée sur
le schéma ; pas de légende numérotée imprimée sur cette figure.

---

## 2022 — session normale — Exercice 2 (Partie 1)
Source: https://www.alloschool.com/element/136621
Statut: transcrit (non vérifié) — 2026-08-06, transcription depuis scan
course-422/upload-84516, page(s) 3 (fin)–4. À faire vérifier (README §3).

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
  (en-tête du scan confirmé directement sur l'image ; le résumé HTML
  d'AlloSchool pour `element/136621` annonce à tort « Sciences Mathématiques
  B », README §3, l'image fait foi)
- Code sujet : NS 28F · Barème de l'exercice complet : 3,5 points ;
  **Partie 1** = 1,25 point ($0{,}25+0{,}25+0{,}25+0{,}5$, barème en marge)
- Images lues (reproductibilité) : `.../course-422/upload-84516/0003-big.jpg`
  (fin, figure 1), `.../0004-big.jpg` (figure 2, questions)
- Pages du scan : 3 (fin) et 4 (sur 8)
- Portée : **Partie 1 (propagation des ondes sonores dans l'air)**. Mention
  en tête de l'exercice : « Les parties 1 et 2 sont indépendantes ». La
  **Partie 2 (désintégration de l'iode 131)** du même exercice est sous
  `decroissance-radioactive.md`.
- Classement (README §4) : exercice centré sur la **célérité** via une
  **mesure de retard temporel** (distance $L$ fixe, sans longueur d'onde ni
  fréquence imposées) → `-progressives`.

**EXERCICE 2 (3,5 points) — Partie 1 : Propagation des ondes sonores dans
l'air.**

Pour déterminer la célérité des ondes sonores dans l'air, on réalise le
montage expérimental représenté sur le schéma de la figure 1. Ce montage est
constitué d'un émetteur $E$ et d'un récepteur $R$ d'ondes sonores distants
de $L = 85\ \text{cm}$. Une onde sonore émise par $E$, se propageant dans
l'air, est reçue par $R$.

On visualise à l'aide d'un système d'acquisition informatisé, à la fois, le
signal (a) émis et le signal (b) reçu (figure 2).

1. Recopier le numéro de la question et répondre par vrai ou faux.
   1. **1.1.** (0,25) L'onde sonore est une onde transversale.
   2. **1.2.** (0,25) L'onde sonore ne se propage pas dans le vide.
2. (0,25) Déterminer la durée $\Delta t$ mise par le signal pour arriver au
   récepteur $R$.
3. (0,5) Calculer la célérité $v$ des ondes sonores dans l'air.

*Figure 1 (schéma) :* deux blocs rectangulaires étiquetés « $E$ » (Emetteur,
à gauche) et « $R$ » (Récepteur, à droite), chacun dessiné avec une découpe
en créneau sur le côté qui fait face à l'autre. Entre les deux, une flèche
horizontale orientée vers la droite, étiquetée « Sens de propagation »
au-dessus. En dessous, une double flèche horizontale reliant les deux blocs,
étiquetée « $L$ ». Légende : « Figure 1 ».

*Figure 2 (écran d'acquisition) :* grille quadrillée (environ huit colonnes
sur six lignes) représentant l'affichage du système d'acquisition. Deux
petits rectangles pleins (signaux) y sont dessinés : le signal **(a)**, en
haut à gauche de la grille (étiqueté « (a) » en dessous) ; le signal
**(b)**, plus bas et plus à droite (étiqueté « (b) » en dessous). Un repère
d'échelle temporelle, en bas à droite de la grille, est matérialisé par une
double flèche horizontale d'un carreau de large, étiquetée
« $0{,}5\ \text{ms}$ ». Légende : « Figure 2 ». *(Le nombre exact de
carreaux séparant les signaux (a) et (b) — nécessaire pour convertir le
décalage horizontal en $\Delta t$ — n'a pas été recompté au pixel près dans
cette passe : lecture à confirmer.)*
