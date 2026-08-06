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
  imprime « Mécanique (05 points) » — divergence du scan signalée). La
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
Statut: transcrit (non vérifié) — 2026-08-06, transcription depuis scan
course-422/upload-87465, page(s) 6. À faire vérifier (README §3).

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7 (NB :
  le résumé HTML d'AlloSchool pour `element/145763` annonce à tort « 2ème BAC
  Sciences Mathématiques B » ; l'en-tête du scan, lu directement, confirme
  sans ambiguïté SPC/BIOF — README §3, l'image fait foi)
- Code sujet : NS28F · Barème de l'exercice complet : 5 points ; **Partie 2**
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

> **Note de transcription (glyphe) :** dans la liste à puces ci-dessus, le
> scan imprime pour désigner le cylindre un symbole qui se lit, au zoom,
> comme un « i » gras surmonté d'une flèche — $\vec{\mathbf{i}}$ —
> visuellement identique au vecteur unitaire $\vec{i}$ utilisé par ailleurs
> sur la figure 3 pour l'axe du plan incliné. Ce même objet est pourtant
> désigné sans ambiguïté ailleurs par le symbole script « $(\mathcal{S})$ » :
> dans la phrase « le système mécanique $\{(C)\,;\,(\mathcal{S})\}$ » (juste
> après les données) et dans la légende de la figure 3. Il s'agit
> vraisemblablement d'un artefact de rendu de police du scan (glyphe
> calligraphique mal incorporé, retombant sur un caractère proche) plutôt que
> de deux objets distincts. Transcrit ci-dessus comme $(\mathcal{S})$ par
> cohérence avec ces deux autres occurrences non ambiguës — signalé, non
> résolu par invention.

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
