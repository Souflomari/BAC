# `rotation-axe-fixe` — Rotation d'un solide autour d'un axe fixe

> Annales examen national, PC-SPC (BIOF). Transcriptions **non vérifiées** —
> voir `README.md` §3 pour le protocole. Provenance sur chaque entrée.
>
> Statut de couverture : **une entrée dédiée sourcée** (2011 rattrapage). Ce
> thème est **quasi absent** de l'épreuve PC-SPC : il ne figure sur **aucune**
> couverture des sessions normales relevées (2008 → 2025). L'unique exercice
> national dédié trouvé à ce jour est la **session de rattrapage 2011**
> (« Étude dynamique d'une grue »), transcrit ci-dessous.

---

## 2011 — session rattrapage — Exercice Mécanique (1ère situation)
Source: https://www.alloschool.com/element/94449
Statut: transcrit (non vérifié)

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
