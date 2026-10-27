# `rotation-axe-fixe` — Rotation d'un solide autour d'un axe fixe

> Annales examen national, PC-SPC (BIOF). Transcriptions **non vérifiées** —
> voir `README.md` §3 pour le protocole. Provenance sur chaque entrée.
>
> Statut de couverture : **deux entrées dédiées sourcées** (2011 rattrapage,
> 2024 normale). Ce thème reste **rare** dans l'épreuve PC-SPC : il ne
> figurait sur **aucune** couverture des sessions normales relevées lors du
> premier passage (2008 → 2021), et le premier exercice national dédié
> trouvé était la **session de rattrapage 2011** (« Étude dynamique d'une
> grue »). La couverture **2024 normale** (relevée le 2026-08-06) porte,
> elle, un intitulé explicite « Mouvement d'un système mécanique » (Exercice
> 5, Partie 2) qui s'avère être, à la lecture, un exercice de rotation
> d'axe fixe (poulie/cylindre + câble + charge sur plan incliné, R.F.D en
> rotation, moment d'inertie $J_\Delta$) — le même type de montage que 2011
> R, transcrit ci-dessous en second.

---

## 2011 — session rattrapage — Exercice Mécanique (1ère situation)
Source: https://www.alloschool.com/element/94449
Statut: vérifié — re-fetch indépendant AlloSchool + diff OK (agent-vérificateur, 2026-07-14)

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : RS28 · Barème de l'exercice « Mécanique » : 5,5 points au total
  (la **page de garde** annonce « Mécanique (05,5 points) » ; l'**en-tête page 6**
  imprime « Mécanique (05 points) » — **divergence TRANCHÉE le 2026-08-28 :
  c'est la PAGE 6 qui est fautive**, par trois contraintes imprimées et
  indépendantes — le recompte des marges donne 5,50 ; le total de l'épreuve
  ferait sinon 19,50 ; et le sous-total « Physique : (13 points) » de la
  page 1 se contredirait lui-même. Le `bareme_total = 2.25` de
  `bk-2011-r-x1` n'est pas affecté. Établi par la transcription de
  `docs/sujets/_incoming/pc-2011-r.md`). La
  **1ère situation** transcrite ici vaut **2,25 points** (1,5 + 0,75).
- Images lues (reproductibilité) : `.../course-422/upload-70317/0006-big.jpg`
  (1ère situation, rotation) ; `.../0007-big.jpg` (2ème situation, oscillateur)
- Pages du scan : 6 (et suite p.7) sur 7
- Portée : l'exercice « Mécanique » comporte **deux situations indépendantes**.
  Seule la **1ère situation (rotation de la poulie / grue autour d'un axe fixe)**
  est transcrite ici. La **2ème situation** (solide-ressort horizontal,
  énergétique) relève de `systemes-oscillants` / `aspects-energetiques`.

**Étude dynamique d'une grue — mouvement de rotation d'une poulie autour d'un
axe fixe.**

*Chapeau (transcrit p.6) :* « Les études dynamique et énergétique des systèmes
mécaniques, dans différentes situations, permettent la détermination de quelques
caractéristiques du système étudié et de suivre son évolution temporelle. Le but
de cet exercice est d'étudier deux situations mécaniques indépendantes. »

On néglige tous les frottements et on prendra : $g = 10\ \text{m}\cdot\text{s}^{-2}$.

Les poulies jouent un rôle principal dans un certain nombre d'appareils
mécaniques et électromécaniques, en particulier les grues pouvant soulever des
charges trop lourdes qu'on ne peut pas soulever manuellement ou à l'aide
d'appareils traditionnels.

On modélise une grue par une poulie $(\mathcal{P})$ homogène de rayon
$r = 20\ \text{cm}$, susceptible de tourner autour d'un axe horizontal $(\Delta)$
fixe confondu avec son axe de symétrie, et un solide $(S_1)$ de masse
$m_1 = 50\ \text{kg}$, relié à la poulie $(\mathcal{P})$ par un fil inextensible,
de masse négligeable, passant sans glisser sur la gorge de la poulie au cours du
mouvement.
$J_\Delta$ désigne le moment d'inertie de la poulie $(\mathcal{P})$ par rapport à
l'axe de rotation $(\Delta)$.

### 1 — Première situation
La poulie $(\mathcal{P})$ tourne sous l'action d'un moteur lui communiquant un
couple moteur de moment constant $\mathcal{M} = 104{,}2\ \text{N}\cdot\text{m}$,
entraînant le solide $(S_1)$ vers le haut.
On repère la position du centre d'inertie $G_1$ du solide $(S_1)$ à un instant
$t$ par l'ordonnée $z$ dans le repère $(O, \vec{k})$ supposé galiléen (figure 1).
$G_1$ coïncide avec l'origine $O$ du repère à l'instant $t_0 = 0$.

1. **1-1.** (1,5) En appliquant la deuxième loi de Newton et la R.F.D en cas de
   rotation sur le système (Poulie, $S_1$, fil), montrer que l'accélération
   $a_{G_1}$ du mouvement de $G_1$ est :
   $$a_{G_1} = \frac{\mathcal{M}\cdot r - m_1\cdot g\cdot r^2}{m_1\cdot r^2 + J_\Delta}$$
2. **1-2.** (0,75) L'étude expérimentale du mouvement de $G_1$ a permis d'établir
   l'équation horaire $z = 0{,}2\,t^2$, avec $z$ en mètre et $t$ en seconde.
   Déterminer le moment d'inertie $J_\Delta$.

*Figure 1 (schéma) :* la poulie $(\mathcal{P})$ (disque) tourne autour de l'axe
$(\Delta)$ horizontal passant par son centre ; le sens positif $(+)$ est fléché
sur la poulie. Un axe vertical $z$ orienté vers le haut, d'origine $O$ ; le
vecteur unitaire $\vec{k}$ pointe vers le haut. Le solide $(S_1)$, de centre
d'inertie $G_1$, est suspendu au fil qui s'enroule sur la gorge de la poulie ;
$G_1$ est confondu avec $O$ à $t_0 = 0$.

> Contexte (rappel, transcrit p.7) : la **2ème situation** — indépendante —
> étudie un oscillateur horizontal { solide $(S_2)$, $m_2 = 182\ \text{g}$ –
> ressort de raideur $K$ } : équation différentielle
> $\ddot{x} + \frac{K}{m_2}x = 0$, solution $x(t) = X_m\cos(\frac{2\pi}{T_0}t + \varphi)$,
> détermination graphique de $X_m$, $T_0$, $\varphi$, puis $K$, et étude
> énergétique ($E_c = \frac{K}{2}(X_m^2 - x^2)$, $E_m$, $V_{G_2}$). → à
> cross-lister sous `systemes-oscillants` / `aspects-energetiques` si besoin.

---

## 2024 — session normale — Exercice 5 (Partie 2)
Source: https://www.alloschool.com/element/145763
Statut: vérifié — **1ʳᵉ passe de vérification adversariale
(agent-vérificateur-indépendant, 2026-08-07), diff OK.**
**Élément re-dérivé** : `element/145763` → `course-422/upload-87465`, **6 pages**
(`0007-big.jpg` = 404), URLs d'images ré-extraites du HTML de la page `element/`
et non reprises du champ « Images lues » ; couverture p.1 relue — **NS 28F**,
SPC/BIOF, 3 h, coef 7 ; carte du sujet $7+2{,}5+2+3{,}5+5=\mathbf{20}$ ✓.
**Portée du diff** : `0006-big.jpg` intégral pour la Partie 2 (chapeau, les trois
tirets de composition du système, données relues au zoom ×2 —
$g=10\ \text{m.s}^{-2}$, $r=10\ \text{cm}$, $m=100\ \text{kg}$,
$\alpha=45°$, $J_\Delta=2\cdot10^{-2}\ \text{kg.m}^2$ —, repère $(O,\vec{i})$,
$\theta(t)=20t^2$, $a_G=4\ \text{m.s}^{-2}$, $\mathcal{M}=\frac{a_G}{r}
(J_\Delta+m.r^2)+mgr\sin\alpha$, figure 3) — **aucune divergence de valeur,
unité, indice ou exposant**. Barème marginal recompté au scan :
$0{,}5+0{,}75+1=\mathbf{2{,}25}$ ✓, et $2{,}75+2{,}25=\mathbf{5}$ ✓.
**Figure 3 : conforme**, revue élément par élément au zoom ×3,2 — plan incliné
montant de $O$ (bas-gauche) au cylindre en haut à droite ; cercle à centre pointé
portant « $(\Delta)$ » à l'intérieur et le symbole du cylindre juste en dessous ;
flèche courbe **sens horaire** au-dessus du cylindre avec le « + » ; petit carré
« (C) » sur la pente, $G$ pointé à l'intérieur ; câble étiqueté « câble » entre
la charge et le cylindre ; **flèche « x » en pointillés** parallèle à la pente,
dirigée vers le cylindre ; en $O$, $\vec{i}$ **flèche pleine** portée par la
pente vers le haut et $\vec{j}$ **flèche pleine** perpendiculaire vers le
haut-gauche, l'axe « y » associé étant en pointillés ; droite horizontale en
pointillés partant de $O$ vers la droite ; angle $\alpha$ marqué par un arc entre
cette horizontale et la pente ; légende « Figure 3 » ✓.
**Question du glyphe — adjugée (voir la note de transcription ci-dessous).**
(a) **Identité sémantique : certaine.** Les cinq occurrences désignent le même
objet — les trois qui portent le glyphe « $\vec{\mathbf{i}}$ » sont chacune
attachées au mot *cylindre* ou au câble qui s'y enroule, et les deux qui portent
le symbole calligraphique sont le second membre du système $\{(C)\,;\,\cdot\}$ et
l'étiquette de la poulie sur la figure 3. (b) **Le « $\vec{\mathbf{i}}$ » est un
artefact de police : confirmé** — au zoom ×3 il est strictement identique au
glyphe du vecteur unitaire $\vec{i}$ employé ailleurs, ce qui n'a aucun sens pour
nommer un solide. (c) **Identité de la lettre calligraphique : NON certifiable
sur ce scan** — au zoom ×18 (bbox 28×28 px) elle se lit comme une capitale
calligraphique à cuvette gauche et deux boucles obliques, compatible avec
$\mathcal{S}$ comme avec $\mathcal{E}$ ; aucune source texte n'a pu être trouvée
pour trancher. Le drapeau est donc **maintenu** : $(\mathcal{S})$ reste une
**convention de transcription signalée**, pas une affirmation.
**Physique re-dérivée par le vérificateur** : $\ddot\theta=40\ \text{rad.s}^{-2}$
⇒ $a_G=r\ddot\theta=0{,}10\times40=\mathbf{4\ \text{m.s}^{-2}}$ (Q1-1) ;
$d=\frac12a_Gt^2=\frac12\times4\times2^2=\mathbf{8\ \text{m}}$ (Q1-2) ;
$\mathcal{M}=\frac{4}{0{,}1}(2\cdot10^{-2}+100\times0{,}01)
+100\times10\times0{,}1\times\sin45°=40{,}8+70{,}7
\simeq\mathbf{111{,}5\ \text{N.m}}$ (Q2) — l'énoncé est auto-cohérent ✓.

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7 (NB :
  le résumé HTML d'AlloSchool pour `element/145763` annonce à tort « 2ème BAC
  Sciences Mathématiques B » ; l'en-tête du scan, lu directement, confirme
  sans ambiguïté SPC/BIOF — README §3, l'image fait foi)
- Code sujet : NS 28F · Barème de l'exercice complet : 5 points ; **Partie 2**
  = 2,25 points ($0{,}5+0{,}75+1$, barème en marge)
- Images lues (reproductibilité) : `.../course-422/upload-87465/0006-big.jpg`
- Pages du scan : 6 (sur 6)
- Portée : **Partie 2 — Mouvement d'un système mécanique** (plan incliné +
  poulie/cylindre entraînée par un couple moteur constant, reliés par un
  câble inextensible). La **Partie 1 (chute verticale d'une bille dans un
  liquide)** du même exercice est sous `chute-mouvements-plans.md`. Mention
  en tête de l'exercice : « Les parties 1 et 2 sont indépendantes ». Même
  structure physique que le précédent déjà dans ce fichier (2011 R : poulie
  + fil + charge, R.F.D en rotation + moment d'inertie $J_\Delta$) — sans
  cross-list nécessaire vers `systemes-oscillants`/`aspects-energetiques` :
  le mouvement est uniformément accéléré ($a_G = 4\ \text{m.s}^{-2}$
  constant), pas oscillatoire.

**Partie 2 : Mouvement d'un système mécanique.**

On se propose d'étudier le mouvement d'un système mécanique et de déterminer
quelques paramètres de ce mouvement. Ce système mécanique représenté sur la
figure 3 est constitué :
- d'une charge $(C)$ de masse $m$ et de centre d'inertie $G$ susceptible de
  glisser sans frottement sur un plan incliné d'un angle $\alpha$ par
  rapport au plan horizontal ;
- d'un cylindre $(\mathcal{S})$ de rayon $r$ et de moment d'inertie $J_\Delta$
  par rapport à son axe de rotation $(\Delta)$. Le cylindre est susceptible
  de tourner sans frottement autour de l'axe $(\Delta)$ sous l'effet d'un
  couple moteur de moment $\mathcal{M}$ constant ;
- d'un câble inextensible de masse négligeable qui s'enroule sans
  glissement sur $(\mathcal{S})$ et attaché à la charge $(C)$.

> **Note de transcription (glyphe) — vérifiée et précisée le 2026-08-07.**
> Le scan désigne le cylindre par **deux glyphes différents**, à cinq endroits :
>
> - **Trois occurrences** portent un symbole qui se lit, au zoom, comme un
>   « i » gras surmonté d'une flèche — $\vec{\mathbf{i}}$ — **strictement
>   identique au glyphe du vecteur unitaire $\vec{i}$** employé par ailleurs
>   pour l'axe du plan incliné : dans la liste à puces ci-dessus
>   (« d'un cylindre … de rayon $r$ »), dans « qui s'enroule sans glissement
>   sur … », et plus bas dans « L'équation horaire du mouvement d'un point du
>   cylindre … s'écrit ». Nommer un solide par le vecteur unitaire n'a aucun
>   sens : **c'est un artefact de rendu de police** (glyphe calligraphique mal
>   incorporé, retombant sur un caractère proche).
> - **Deux occurrences** portent une **capitale calligraphique** : dans
>   « le système mécanique $\{(C)\,;\,(\mathcal{S})\}$ » (deux fois : juste
>   après les données, puis dans la question 2) et comme étiquette de la poulie
>   sur la figure 3.
>
> **Identité de l'objet : certaine** — les cinq occurrences désignent le même
> cylindre (chaîne sémantique vérifiée phrase par phrase).
> **Identité de la lettre : non résolue.** Au zoom ×18 (boîte d'encre de
> 28×28 px) la capitale calligraphique se lit comme une cuvette à gauche
> surmontée de deux boucles obliques ; cette forme est compatible avec
> $\mathcal{S}$ **comme avec** $\mathcal{E}$, et le scan ne permet pas de
> trancher. Elle est transcrite ci-dessus $(\mathcal{S})$ **par convention
> uniforme**, ce qui est signalé ici et non affirmé — à confirmer sur un
> exemplaire de meilleure qualité ou sur une source texte.

**Données :** Intensité de la pesanteur : $g = 10\ \text{m.s}^{-2}$ ;
$r = 10\ \text{cm}$ ; $m = 100\ \text{kg}$ ; $\alpha = 45°$ ;
$J_\Delta = 2 \cdot 10^{-2}\ \text{kg.m}^2$.

On étudie le mouvement du système mécanique $\{(C)\,;\,(\mathcal{S})\}$ dans
un repère lié à un référentiel terrestre supposé galiléen. On repère la
position d'un point du cylindre à chaque instant $t$ par son abscisse
angulaire $\theta$ et la position du centre d'inertie $G$ de $(C)$ par son
abscisse $x$ suivant l'axe $(O,\vec{i})$.

1. L'équation horaire du mouvement d'un point du cylindre $(\mathcal{S})$
   s'écrit : $\theta(t) = 20t^2$ avec $\theta$ en rad et $t$ en s.
   1. **1-1.** (0,5) Vérifier que l'accélération du mouvement de $G$ est :
      $a_G = 4\ \text{m.s}^{-2}$.
   2. **1-2.** (0,75) Déterminer la distance $d$ parcourue par $G$ pendant
      les deux premières secondes.
2. (1) En appliquant la deuxième loi de Newton et la relation fondamentale
   de la dynamique dans le cas de la rotation au système mécanique
   $\{(C)\,;\,(\mathcal{S})\}$, montrer que
   $\mathcal{M} = \dfrac{a_G}{r}(J_\Delta + m.r^2) + mgr\sin\alpha$.
   Calculer la valeur de $\mathcal{M}$.

*Figure 3 (schéma) :* un plan incliné rectiligne monte, de gauche à droite,
depuis un point $O$ (bas) jusqu'à une poulie/cylindre $(\mathcal{S})$ (cercle,
centre marqué d'un point) monté sur son axe $(\Delta)$ (en haut à droite du
schéma) ; une flèche courbe au-dessus du cylindre, orientée dans le sens
horaire, porte le signe « + » (sens positif choisi pour la rotation). Sur le
plan incliné, un petit carré étiqueté « (C) » représente la charge, avec son
centre d'inertie $G$ marqué d'un point à l'intérieur. Un câble (segment
épais), étiqueté « câble », relie la charge au cylindre le long de la pente ;
une flèche en pointillés « x », partant d'un point proche de la charge et
dirigée vers le cylindre le long du câble, matérialise l'axe $(O,\vec{i})$.
À l'origine $O$ (bas du plan incliné), un repère est tracé : le vecteur
$\vec{i}$ (flèche pleine) est porté par le plan incliné, orienté vers le
haut de la pente ; le vecteur $\vec{j}$ (flèche pleine), avec l'axe « y »
associé, est perpendiculaire à $\vec{i}$, orienté vers le haut-gauche. Une
droite horizontale en pointillés part de $O$ vers la droite ; l'angle
$\alpha$ est marqué entre cette horizontale et le plan incliné, au niveau de
$O$. Légende : « Figure 3 ».
