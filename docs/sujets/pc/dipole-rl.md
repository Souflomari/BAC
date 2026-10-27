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
Statut: vérifié — **3ᵉ passe : relecture de contrôle du point unique laissé
ouvert par la 2ᵉ passe**, par un vérificateur adversarial indépendant
(agent-vérificateur-adversarial, 2026-08-07). **La correction de 2ᵉ passe sur la
figure 3 est CONFIRMÉE au pixel** ⇒ README §3, l'entrée passe à
`Statut: vérifié`.
**✅ Figure 3 — flèche $i$ : confirmée VERTICALE, orientée vers le HAUT.**
Relevé pixel indépendant sur `0005-big.jpg` (fenêtre x 810–960, y 430–600, seuil
de luminance, sans réutiliser la lecture précédente) : la branche gauche de la
boucle est le fil **vertical** en $x\simeq884$ (du fil supérieur $y=444$ jusqu'au
fil inférieur $y=596$) ; sur ce fil, une **pointe pleine triangulaire** occupe
$y=466\to478$ — largeur $4$ px au sommet ($y=466$) puis $5,7,9,11,13$ px en
descendant jusqu'à $y=476$ : **base en bas, apex en haut ⇒ flèche vers le haut**,
non ambiguë. L'étiquette « i » (point $y=462$–$464$ + hampe $y=468$–$476$) est en
$x\simeq861$–$864$, soit **à gauche** de la pointe et à la même hauteur ✓. Le
générateur est le cercle centré $(884\,;\,532)$, $\varnothing\simeq50$ px,
traversé du même trait vertical : la flèche $i$ est donc bien **juste au-dessus
du générateur** ✓. **Seconde flèche confirmée** : fût vertical en
$x\simeq848$–$850$ ($y=512\to574$) surmonté d'une pointe pleine
($y=498\to510$, largeur $1\to12$ px vers le bas) ⇒ **vers le haut**, avec la
lettre « E » en $x\simeq825$–$834$, $y=516$–$530$. Ce fût est en dehors du
rectangle de la boucle (dont le bord gauche est le fil $x=884$) et à gauche du
cercle ✓. **La description corrigée dans le corps de l'entrée est fidèle ; aucune
retouche supplémentaire.**
**Élément re-dérivé (3ᵉ fois, indépendamment)** : `element/145763` →
`course-422/upload-87465`, **6 pages** (`0001`…`0006-big.jpg` ré-extraites du HTML
de la page `element/` ; le résumé HTML annonce toujours à tort « Sciences
Mathématiques B »). En-tête de `0005-big.jpg` relu : **NS 28F**, page **5/6**,
SPC/BIOF. Barème marginal de la Partie 2 re-recompté au scan :
$0{,}5+0{,}5+0{,}5=\mathbf{1{,}5}$ ✓, et avec la Partie 1
($0{,}25+0{,}5+0{,}5+0{,}75=2{,}0$) $\Rightarrow\mathbf{3{,}5}$ ✓.
**— Trace de la 2ᵉ passe, conservée (2026-08-07, agent-vérificateur-indépendant) —**
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
Statut: vérifié — **2ᵉ passe : relecture de contrôle des deux paragraphes de
figure laissés ouverts par la 1ʳᵉ passe**, par un re-lecteur indépendant
(agent-relecteur-indépendant, 2026-08-07), mesures pixel refaites de zéro sans
reprise des relevés précédents. **Les corrections de 1ʳᵉ passe sur la figure 1
et l'étalonnage de la figure 2 sont CONFIRMÉS au pixel** ⇒ README §3, l'entrée
passe à `Statut: vérifié`.

**Élément re-dérivé (indépendamment)** : `element/142476` →
`assets/documents/course-422/upload-85304`, **6 pages** (`0001`…`0006-big.jpg`
ré-extraites du HTML de la page `element/` ; `<title>` = « Examen National
Physique-Chimie **SPC 2023 Normale** - Sujet ») ; en-tête de `0004-big.jpg`
(1240×1754) relu : **NS 28F**, page **4/6**, « EXERCICE 3 (5 points) ».

**✅ Figure 1 — $R$ bien sur la branche DROITE, en série sous la bobine.**
Relevé pixel : la boucle a pour côtés le fil supérieur $y=413{,}5$, le fil
inférieur $y=652{,}5$, la branche gauche $x=989{,}5$ et la branche droite
$x=1139$. Sur la branche droite, de haut en bas : fil, **spires de la bobine
$(b)$** ($y\simeq435$–$525$, boucles débordant à droite jusqu'à $x=1156$), fil,
puis le **rectangle $R$**, bornes $x=1128$–$1154$ et $y=543$–$600$, traversé en
son milieu par le fil de branche $x=1139$ ⇒ **en série juste sous la bobine** ✓.
Le **fil inférieur est nu** : encre continue sur $150$ px de $x=990$ à
$x=1139$, aucun composant ✓. Générateur $E$ : **cercle** centré
$(989\,;\,582)$, $\varnothing\simeq54$ px, **traversé par le fil de la branche**
($x=989{,}5$, encre continue de $y=528$ à $y=621$) ; à sa gauche une **flèche
verticale** de fût $x=957{,}5$ ($y=613\to562$) surmontée d'une **pointe pleine
apex en haut** ($y=550$–$562$, largeur croissant vers le bas) ⇒ **vers le
haut**, et la lettre « E » plus à gauche encore ($x\simeq946$–$952$) ✓. $K$ en
haut de la branche gauche, symbole **ouvert** (deux disques de contact + segment
oblique), « K » à gauche ✓.

**✅ Figure 2 — étalonnage confirmé trait par trait.** *Cadre :* traits
principaux noirs en abscisse $x=775{,}5\,/\,830{,}5\,/\,885{,}5\,/\,940{,}5\,/
\,995\,/\,1050\,/\,1105$ ⇒ **6 divisions** ; en ordonnée $y=1001$ (axe) puis
$946{,}5\,/\,892\,/\,837{,}5\,/\,782{,}5\,/\,728$, bord supérieur $y=701$ ⇒
**5 divisions et demie** — coordonnées **identiques** à celles du corps de
l'entrée. *Graduations :* sous l'axe **exactement deux tirets**, $x=830{,}5$ et
$885{,}5$, et les seuls glyphes chiffrés relevés sont « 0 » ($x\,770$–$778$),
« 2 » ($x\,821$–$829$), « 4 » ($x\,880$–$888$) ⇒ **1 div $=2\ \text{ms}$** ✓ ;
à gauche de l'axe **exactement trois tirets**, $y=729$, $892$, $945$, dont
seuls les deux derniers sont chiffrés (« 9,6 » à 1 div, « 19,2 » à 2 div) ⇒
**1 div $=9{,}6\ \text{mA}$** ✓ et le tiret $y=729$ est bien **à 5 divisions de
l'axe et non chiffré** ✓. *Palier :* en $x=1070$–$1100$ la courbe et le trait
$y=728$ ne forment plus qu'une seule encre de 3 px, alors qu'en $x=960$–$1020$
la courbe ($y\simeq731$–$739$) en est encore détachée ⇒ le palier **vient se
confondre avec le trait non chiffré** ⇒ $I_0=5\times9{,}6=\mathbf{48\ \text{mA}}$
✓. *Tangente $(T)$ :* trait **pointillé**, relevé à $x\simeq829{,}5$ pour
$y=736$ et $x\simeq834$ pour $y=712$ ⇒ par interpolation elle coupe le palier
$y=728$ en $x\simeq831$, c'est-à-dire **au trait chiffré « 2 »** ⇒
$\tau\simeq\mathbf{2{,}0\ \text{ms}}$ ✓, d'où $R=E/I_0=500\ \Omega$ et
$L=R\tau=\mathbf{1\ \text{H}}$ — exactement la Q1-2-2.

*(Seule nuance relevée, non bloquante et sans effet sur aucune lecture : les
« pas » annoncés dans le corps de l'entrée — $54{,}75$ px en abscisse, $54{,}6$
px en ordonnée — sont mesurés ici à $54{,}9$ et $54{,}5$ px ; toutes les
coordonnées de traits, elles, coïncident au pixel.)* **Aucune retouche : les
deux paragraphes de figure sont fidèles.**

**Portée du diff (2026-08-07).** Source re-dérivée de zéro :
`element/142476` → `assets/documents/course-422/upload-85304`, **6 pages**
(URLs ré-extraites du HTML de la page `element/`, aucune reprise des
« Images lues »). Couverture p.1 relue : **NS 28F**, session normale 2023,
3 h, coef 7, SPC/BIOF ; carte $7+2{,}5+5+5{,}5=\mathbf{20}$ ✓ et l'Exercice 3
y est bien annoncé « **5 points** » avec les trois volets (RL / LC /
modulation). **Texte du §1 : conforme, aucune divergence** de valeur, unité,
indice ou exposant ($E = 24\ \text{V}$, résistance négligeable de la bobine,
$t_0=0$, $i(t)=A+B.e^{-t/\tau}$, « Montrer que $L=1\ \text{H}$ », $u_L(t)$,
« en unité SI »). **Barème marginal recompté au scan** :
$0{,}25+0{,}5+0{,}5+0{,}5=\mathbf{1{,}75}$ ✓ ; et
$\S1+\S2+\S3 = 1{,}75+1{,}5+1{,}75 = \mathbf{5{,}00}$ = Exercice 3 ✓.

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

*Figure 1 (schéma) :* boucle rectangulaire. **Branche gauche (verticale)** :
l'interrupteur $K$ en haut (symbole d'interrupteur **ouvert** : deux petits
disques de contact reliés par un segment oblique, étiquette « K » à gauche),
puis, en dessous, le générateur $E$ — un **cercle traversé par le fil de la
branche**, avec une **flèche verticale orientée vers le haut, étiquetée
« E », placée à gauche du cercle**. **Branche supérieure** : fil portant la
flèche de courant $i$ orientée vers la droite (étiquette « i » au-dessus),
du sommet de la branche $K$ jusqu'au coin supérieur droit. **Branche droite
(verticale)** : la bobine $(b)$ en spires **en haut** (étiquette « (b) » à
sa gauche) et, **en série juste en dessous d'elle, sur la même branche
verticale**, le conducteur ohmique $R$ (rectangle vertical, étiquette « R »
à sa droite). **Branche inférieure** : **simple fil** reliant le bas de $R$
au bas du générateur $E$ — *(❌→✅ correction 2026-08-07 : l'ancienne
description plaçait $R$ « branche inférieure » ; sur le scan $R$ est sur la
branche **droite**, sous la bobine, et la branche du bas est nue)*. Légende :
« Figure 1 ».

*Figure 2 (courbe) :* $i\ (\text{mA})$ en fonction de $t\ (\text{ms})$, sur
quadrillage à double graduation (traits principaux, sous-quadrillage fin
bleu).

**Étalonnage (mesuré au pixel sur `0004-big.jpg`, 1240×1754).** Cadre :
**6 divisions principales en abscisse** ($x = 775{,}5 / 830{,}5 / 885{,}5 /
940{,}5 / 995 / 1050 / 1105$ px, pas $54{,}75$) et **5 divisions et demie en
ordonnée** au-dessus de l'axe ($y = 1001$ = axe, puis $946{,}5 / 892 /
837{,}5 / 782{,}5 / 728$, pas $54{,}6$ ; le bord supérieur du cadre est à
$y = 701$, soit une demi-division au-dessus du dernier trait).
- **Abscisse** : seuls **deux** traits portent un tiret de graduation sous
  l'axe ($x = 830{,}5$ et $885{,}5$) et ce sont exactement les deux traits
  chiffrés, « 2 » (glyphe $x\,821$–$831$) et « 4 » ($x\,880$–$888$), origine
  « 0 » ($x\,770$–$778$) ⇒ **1 division $= 2\ \text{ms}$**.
- **Ordonnée** : trois tirets seulement, en $y = 945$ (« 9,6 », glyphe
  centré $y\,944{,}5$), $y = 892$ (« 19,2 », centré $y\,891{,}5$) et
  $y = 729$, **non chiffré**. « 9,6 » est à **1 division** de l'axe et
  « 19,2 » à **2 divisions** ⇒ **1 division $= 9{,}6\ \text{mA}$** ; le
  tiret non chiffré est à **5 divisions** de l'axe.

Courbe croissante et concave, partant de l'origine $(0\,;\,0)$, montant
rapidement puis s'aplatissant sur un palier horizontal (régime permanent)
qui vient se confondre avec le trait principal non chiffré ⇒
**$I_0 = 5\times9{,}6 = \mathbf{48\ \text{mA}}$** *(le drapeau « valeur
exacte du palier non chiffrée — lecture à confirmer » est **tranché** :
la valeur est au trait, à $y = 728$)*. La droite $(T)$, en pointillés, est
tangente à la courbe à l'origine et bien plus raide qu'elle ; elle **coupe
le palier en $x \simeq 831$ px**, c'est-à-dire au premier trait chiffré ⇒
**$\tau \simeq 2{,}0\ \text{ms}$**. Légende : « Figure 2 ».

**Contrôle croisé par la physique (referme la Q1-2-2).**
$R = E/I_0 = 24/48\cdot10^{-3} = \mathbf{500\ \Omega}$ et
$L = R\tau = 500 \times 2\cdot10^{-3} = \mathbf{1\ \text{H}}$ — exactement ce
que la question 1-2-2 demande de montrer. Toute autre lecture de
l'étalonnage donnerait un autre $L$.
