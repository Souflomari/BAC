# `dipole-rl` — Dipôle RL (établissement / rupture du courant, τ = L/R)

> Annales examen national, PC-SPC (BIOF). Transcriptions **non vérifiées** —
> voir `README.md` §3 pour le protocole. Provenance sur chaque entrée.

---

## 2020 — session normale — Exercice IV (Partie I)
Source: https://www.alloschool.com/element/109742
Statut: vérifié — re-fetch indépendant AlloSchool + diff OK (agent-vérificateur, 2026-07-11)

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS28F · Barème de l'exercice complet : 5 points (Partie I ≈ 1,5 point)
- Images lues : `.../course-422/upload-80870/0005-big.jpg`
- Pages du scan : 5 (sur 7)
- Portée : la **Partie I (réponse du dipôle RL à un échelon)** est transcrite
  ici. Les **Parties II (décharge d'un condensateur dans un dipôle RL,
  régime pseudopériodique) et III (entretien des oscillations RLC)** du même
  exercice relèvent de `rlc-serie.md` (cross-list, non encore transcrites là).

**I — Réponse d'un dipôle RL à un échelon de tension.**

On réalise le montage schématisé sur la figure 1. Ce montage comporte :
- une bobine d'inductance $L$ et de résistance $r$ ;
- un conducteur ohmique de résistance $R = 90\ \Omega$ ;
- un générateur de force électromotrice $E$ et de résistance interne négligeable ;
- un interrupteur $K$.

On ferme l'interrupteur à un instant de date $t = 0$.

Un système d'acquisition informatisé permet de tracer les courbes $(C_1)$ et
$(C_2)$ représentant successivement l'évolution de l'intensité du courant $i(t)$
traversant le circuit et l'évolution de la tension $u_L(t)$ aux bornes de la
bobine. La droite $(T)$ représente la tangente à la courbe $(C_1)$ à $t = 0$
(figure 2).

1. (0,5) Montrer que l'équation différentielle vérifiée par l'intensité du
   courant $i(t)$ s'écrit ainsi :
   $\dfrac{di}{dt} + \dfrac{R+r}{L}\,i = \dfrac{E}{L}$.
2. (0,5) En exploitant les deux courbes $(C_1)$ et $(C_2)$, lorsque le régime
   permanent est atteint, déterminer la valeur de $r$.
3. (0,5) Vérifier que $L = 1\ \text{H}$.

*Figure 1 (schéma) :* circuit série orienté par le courant $i$ : générateur $E$
(branche de gauche), conducteur ohmique $R$ (branche du haut), bobine $(L, r)$
(branche de droite, tension $u_L$ à ses bornes), interrupteur $K$ (branche du bas).

*Figure 2 (courbes) :*
- $(C_1)$ : $i\ (\text{mA})$ en fonction de $t\ (\text{s})$ ; courbe croissante de
  $0$ vers un palier à $i = 100\ \text{mA}$ (régime permanent) ; axe des abscisses
  gradué $0{,}01,\ 0{,}02,\ 0{,}03,\ 0{,}04,\ 0{,}05$ ; ordonnées graduées
  $20,\ 40,\ 60,\ 80,\ 100$. La tangente $(T)$ à l'origine (en pointillés) est
  tracée.
- $(C_2)$ : $u_L\ (\text{V})$ en fonction de $t\ (\text{s})$ ; courbe décroissante
  depuis $u_L \approx 9\ \text{V}$ à $t = 0$ vers un palier au voisinage de
  $u_L \approx 1\ \text{V}$ *(lecture d'échelle à confirmer)* ; ordonnées graduées
  $2,\ 4,\ 6,\ 8$ ; abscisses graduées $0{,}01,\ 0{,}02,\ 0{,}03,\ 0{,}04$.

---

## 2024 — session normale — Exercice 4 (Partie 2)
Source: https://www.alloschool.com/element/145763
Statut: transcrit (non vérifié) — **2ᵉ passe, vérificateur indépendant
(agent-vérificateur-indépendant, 2026-08-07) : tout est confirmé SAUF un point de
la figure 3, corrigé ci-dessous** ⇒ README §3, l'entrée **reste
`transcrit (non vérifié)`** et n'appelle plus qu'une **relecture de contrôle de ce
seul point** (le sens de la flèche $i$).
**❌→✅ Figure 3 : la flèche de courant $i$ est VERTICALE, orientée vers le HAUT**
— et non « orientée vers la droite ». Zoom ×10 sur `0005-big.jpg` (x 840–910,
y 450–530) : la pointe pleine est au sommet d'un fût **vertical** porté par la
branche gauche, juste au-dessus du générateur, l'étiquette « i » étant à sa
gauche ; une seconde flèche pleine verticale vers le haut, étiquetée « E », est
tracée **à gauche du cercle, hors de la boucle** (elle n'était pas mentionnée).
Le sens physique du courant est inchangé (montée par la branche gauche puis
parcours vers la droite le long de la branche supérieure), mais un lecteur
reconstruisant la figure d'après l'ancienne description l'aurait dessinée
horizontale. Description corrigée dans le corps de l'entrée ; **à relire**.
**Élément re-dérivé** : `element/145763` → `course-422/upload-87465`, **6 pages**
(`0007-big.jpg` = 404), URLs d'images ré-extraites du HTML de la page `element/` ;
couverture p.1 relue — **NS 28F**, SPC/BIOF, 3 h, coef 7 ; carte du sujet
$7+2{,}5+2+3{,}5+5=\mathbf{20}$ ✓.
**Portée du diff** : `0005-big.jpg` ($E=6\ \text{V}$, « la bobine (b) et le
conducteur ohmique de résistance R ajustable et l'interrupteur K, précédemment
utilisés », $R_1$, $t_0=0$,
$\frac{di}{dt}=-\left(\frac{R_1+r}{L}\right)i+\frac{E}{L}$, « Vérifier que la
valeur de $L$ est : $L=2\ \text{mH}$ », constante de temps $\tau$) — **aucune
divergence de valeur, unité, indice ou exposant**. Barème marginal recompté au
scan : $0{,}5\times3=\mathbf{1{,}5}$ ✓, et $2{,}0+1{,}5=\mathbf{3{,}5}$ ✓.
**Reste de la figure 3 : conforme** au zoom ×3 (rhéostat $R$ après $K$ sur la
branche supérieure, bobine en spires à droite avec « (L,r) » à gauche et « (b) »
à droite, fil nu en bas, légende « Figure 3 »).
**Figure 4 — re-mesurée intégralement, correction de 1ʳᵉ passe confirmée.**
Étalonnage refait : traits principaux en abscisse
$x=763{,}5/822{,}5/881{,}5/941/1000{,}5/1059{,}5/1119{,}5$ px (pas $59{,}3$) ⇒
**6 divisions**, étiquettes **1** et **2** aux 2ᵉ et 3ᵉ traits ⇒ $1$ division
$=1$ mA et **bord droit $=6$ mA** ; en ordonnée $y=696/756/815/876$ ⇒
**3 divisions**, étiquettes **2**, **1**, **0** ⇒ **bord supérieur
$=3\cdot10^{3}\ \text{A.s}^{-1}$**. Le segment est tracé **de coin à coin**,
du coin supérieur gauche $(0\,;\,3\cdot10^{3})$ au coin inférieur droit
$(6\ \text{mA}\,;\,0)$ : **les deux ordonnées à l'origine sont au trait**
(drapeaux levés). Contrôle de la classe de défaut « flèche d'étalonnage lue comme
période » : **sans objet** (pas d'axe de temps ici).
**Physique re-dérivée par le vérificateur** :
$\left.\frac{di}{dt}\right|_{i=0}=\frac{E}{L}=3\cdot10^{3}$ ⇒
$L=6/3000=\mathbf{2\ \text{mH}}$ ✓ (c'est exactement ce que demande la Q2-2-1) ;
$I_{max}=E/(R_1+r)=6\ \text{mA}$ ⇒ $R_1+r=1000\ \Omega$ ;
$\tau=L/(R_1+r)=\mathbf{2\cdot10^{-6}\ \text{s}}$, retrouvé comme l'inverse du
module de la pente ($3\cdot10^{3}/6\cdot10^{-3}=5\cdot10^{5}\ \text{s}^{-1}$) ✓.
La lecture erronée $i\simeq3$ mA aurait donné $\tau=1\ \mu$s.

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7 (NB :
  le résumé HTML d'AlloSchool pour `element/145763` annonce à tort « 2ème BAC
  Sciences Mathématiques B » ; l'en-tête du scan, lu directement, confirme
  sans ambiguïté SPC/BIOF — README §3, l'image fait foi)
- Code sujet : NS 28F · Barème de l'exercice complet : 3,5 points ; **Partie 2**
  = 1,5 point ($0{,}5+0{,}5+0{,}5$, barème en marge)
- Images lues (reproductibilité) : `.../course-422/upload-87465/0005-big.jpg`
- Pages du scan : 5 (sur 6)
- Portée : **Partie 2 — Réponse d'un dipôle RL à un échelon de tension**.
  La **Partie 1 (décharge d'un condensateur dans un dipôle RL, oscillations
  pseudopériodiques amorties)** du même exercice est sous `rlc-serie.md`
  (même montage $R$, $(L,r)$, réutilisés ici avec un générateur idéal $E$ à
  la place du condensateur $C$).

**2- Réponse d'un dipôle RL à un échelon de tension.**

On réalise le circuit schématisé dans la figure 3 en utilisant le générateur
de tension de force électromotrice $E = 6\ \text{V}$ ; la bobine $(b)$ et le
conducteur ohmique de résistance $R$ ajustable et l'interrupteur $K$,
précédemment utilisés.

On ajuste la valeur de la résistance $R$ à une valeur $R_1$ et on ferme
l'interrupteur $K$ à l'instant $t_0 = 0$.

1. **2-1.** (0,5) En appliquant la loi d'additivité des tensions, montrer
   que : $\dfrac{di}{dt} = -\left(\dfrac{R_1+r}{L}\right)i + \dfrac{E}{L}$.
2. **2-2.** La courbe de la figure 4 représente les variations de
   $\dfrac{di}{dt}$ en fonction de l'intensité $i$. En s'aidant du graphe de
   la figure 4 :
   1. **2-2-1.** (0,5) Vérifier que la valeur de $L$ est : $L = 2\ \text{mH}$.
   2. **2-2-2.** (0,5) Déterminer la valeur de la constante de temps $\tau$
      du circuit.

*Figure 3 (schéma) :* boucle rectangulaire. Branche gauche : générateur de
tension idéale $E$ (cercle traversé d'un trait vertical), avec, **à sa gauche et
hors de la boucle, une flèche pleine verticale orientée vers le haut étiquetée
« E »** ; sur le fil de cette même branche gauche, **juste au-dessus du
générateur, une flèche de courant $i$ (pointe pleine) orientée vers le haut**,
étiquetée « i » à sa gauche. Branche supérieure : interrupteur
$K$ (à gauche), puis conducteur ohmique de résistance $R$ ajustable
(rectangle traversé d'une flèche oblique, symbole rhéostat), étiqueté « R ».
Branche droite (verticale) : bobine dessinée en spires, étiquetée « (L,r) »
à gauche du symbole et « (b) » à droite. Branche inférieure : simple fil
refermant la boucle. Légende : « Figure 3 ».

*Figure 4 (courbe) :* axe des ordonnées $\dfrac{di}{dt}\ (10^{3}\
\text{A.s}^{-1})$, gradué (traits principaux chiffrés) $1$ et $2$, origine
$0$ ; axe des abscisses $i\ (\text{mA})$, gradué (traits principaux
chiffrés) $1$ et $2$, origine $0$. Sous-quadrillage bleu fin. Le cadre compte
**6 divisions principales en abscisse** ($1$ division $=1\ \text{mA}$, donc
**bord droit $= 6\ \text{mA}$**) et **3 divisions en ordonnée** ($1$ division
$=10^{3}\ \text{A.s}^{-1}$, donc **bord supérieur $= 3\cdot10^{3}\
\text{A.s}^{-1}$**) ; les traits de $3$, $4$, $5$, $6$ mA et de
$3\cdot10^{3}\ \text{A.s}^{-1}$ existent mais ne sont pas chiffrés.

Droite décroissante tracée **d'un coin à l'autre du cadre** : elle part du
**coin supérieur gauche**, c'est-à-dire de l'ordonnée à l'origine
$\left.\dfrac{di}{dt}\right|_{i=0} = 3\cdot10^{3}\ \text{A.s}^{-1}$ (lecture au
trait), et rejoint le **coin inférieur droit**, où elle coupe l'axe des
abscisses à $\dfrac{di}{dt}=0$ pour $i = 6\ \text{mA}$ (lecture au trait) — juste
avant le départ de la flèche de l'axe « $i(\text{mA})$ ». Sa pente vaut donc
$-0{,}5\cdot10^{3}\ \text{A.s}^{-1}$ par mA, soit
$-5\cdot10^{5}\ \text{s}^{-1} = -\dfrac{R_1+r}{L}$. Légende : « Figure 4 ».

---

## 2023 — session normale — Exercice 3, §1 (Réponse d'un dipôle RL à un échelon de tension)
Source: https://www.alloschool.com/element/142476
Statut: transcrit (non vérifié) — 2026-08-06, transcription depuis scan
course-422/upload-85304, page(s) 4. À faire vérifier (README §3).

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
  (en-tête du scan confirmé directement sur l'image : « شعبة العلوم
  التجريبية مسلك العلوم الفيزيائية (خيار فرنسية) » = Sciences Physiques,
  BIOF, option française — le résumé HTML d'AlloSchool pour `element/142476`
  annonce à tort « Sciences Mathématiques B », README §3, l'image fait foi)
- Code sujet : NS 28F · Barème de l'exercice complet : 5 points ; **§1** =
  1,75 point ($0{,}25+0{,}5+0{,}5+0{,}5$, barème en marge)
- Images lues (reproductibilité) : `.../course-422/upload-85304/0004-big.jpg`
- Pages du scan : 4 (sur 6)
- Portée : **§1 — Réponse d'un dipôle RL à un échelon de tension**. Le
  **§2** (circuit oscillant LC, même bobine (b)) du même exercice est sous
  `rlc-serie.md` ; le **§3** (modulation d'amplitude) est sous
  `ondes-em-modulation.md`. Mention en tête de l'exercice : « Cet exercice
  se propose d'étudier : - la réponse d'un dipôle RL à un échelon de
  tension ; - un circuit oscillant LC ; - la modulation d'amplitude d'un
  signal. »

**1- Réponse d'un dipôle RL à un échelon de tension**

On réalise le montage électrique, représenté sur le schéma de la figure 1,
comportant :
- un générateur de tension de force électromotrice $E = 24\ \text{V}$ ;
- un conducteur ohmique de résistance $R$ ;
- une bobine $(b)$ d'inductance $L$ et de résistance négligeable ;
- un interrupteur $K$.

On ferme l'interrupteur $K$ à l'instant de date $t_0 = 0$. Un système
d'acquisition informatisé adéquat permet d'obtenir la courbe représentant
l'évolution temporelle de l'intensité du courant électrique $i(t)$ dans le
circuit (figure 2). La droite $(T)$ représente la tangente à la courbe au
point d'abscisse $t_0 = 0$.

1. **1-1.** (0,25) Établir l'équation différentielle vérifiée par $i(t)$.
2. **1-2.** L'expression de l'intensité du courant circulant dans le
   circuit est : $i(t) = A + B.e^{-t/\tau}$ avec $A$ et $B$ deux constantes
   et $\tau$ la constante de temps du circuit.
   1. **1-2-1.** (0,5) Déterminer les expressions de $A$ et $B$ en fonction
      de $E$ et $R$.
   2. **1-2-2.** (0,5) Montrer que $L = 1\ \text{H}$.
3. **1-3.** (0,5) Déterminer, en unité SI, l'expression numérique de la
   tension $u_L(t)$ aux bornes de la bobine lors de l'établissement du
   courant.

*Figure 1 (schéma) :* boucle rectangulaire. Branche gauche : générateur de
tension $E$ (cercle), en série avec l'interrupteur $K$ (symbole
d'interrupteur ouvert) au-dessus de lui. Branche supérieure : fil portant
la flèche de courant $i$ orientée vers la droite, allant du sommet de la
branche $K$ jusqu'au coin supérieur droit. Branche droite (verticale) :
bobine $(b)$ dessinée en spires. Branche inférieure : conducteur ohmique de
résistance $R$ (rectangle étiqueté « R »), reliant le bas de la bobine au
bas du générateur $E$. Légende : « Figure 1 ».

*Figure 2 (courbe) :* $i\ (\text{mA})$ en fonction de $t\ (\text{ms})$, sur
quadrillage à double graduation (traits principaux, sous-quadrillage fin
bleu). Axe des ordonnées gradué (traits principaux chiffrés) $9{,}6$ et
$19{,}2$ (un trait principal supplémentaire, non chiffré, apparaît
au-dessus de $19{,}2$, au niveau du palier de la courbe) ; axe des
abscisses gradué (traits principaux chiffrés) $2$ et $4$, origine $0$.
Courbe croissante et concave, partant de l'origine $(0\,;\,0)$, montant
rapidement puis s'aplatissant vers un palier horizontal (régime permanent)
situé au-dessus du repère $19{,}2$ *(valeur exacte du palier non chiffrée —
lecture à confirmer)*. La droite $(T)$, en pointillés, est tangente à la
courbe à l'origine ; elle est nettement plus raide que la courbe. Légende :
« Figure 2 ».
