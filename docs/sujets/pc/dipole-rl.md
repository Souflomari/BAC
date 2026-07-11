# `dipole-rl` — Dipôle RL (établissement / rupture du courant, τ = L/R)

> Annales examen national, PC-SPC (BIOF). Transcriptions **non vérifiées** —
> voir `README.md` §3 pour le protocole. Provenance sur chaque entrée.

---

## 2020 — session normale — Exercice IV (Partie I)
Source: https://www.alloschool.com/element/109742
Statut: transcrit (non vérifié)

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
