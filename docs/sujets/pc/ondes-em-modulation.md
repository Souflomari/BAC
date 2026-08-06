# `ondes-em-modulation` — Ondes EM & modulation d'amplitude

> Annales examen national, PC-SPC (BIOF). Transcriptions **non vérifiées** —
> voir `README.md` §3 pour le protocole. Provenance sur chaque entrée.

---

## 2017 — session normale — Exercice III (Partie II)
Source: https://www.alloschool.com/element/57711
Statut: vérifié — re-fetch indépendant AlloSchool + diff OK (agent-vérificateur, 2026-07-11)

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS28F · Barème de l'exercice complet : 5 points (Partie II ≈ 1,75 point)
- Images lues : `.../course-422/upload-45103/0005-big.jpg`, `.../0006-big.jpg`
- Pages du scan : 5 et 6 (sur 8)
- Portée : la **Partie II (modulation d'amplitude)** est transcrite ici. La
  **Partie I (établissement et rupture du courant dans un dipôle RL)** du même
  exercice relève de `dipole-rl.md` (cross-list, non encore transcrite là).

**Partie II — Modulation d'amplitude.**

Pour étudier la modulation d'amplitude et vérifier la qualité de la modulation,
au cours d'une séance de TP, le professeur a utilisé avec ses élèves, un circuit
intégré multiplieur $(X)$ en appliquant une tension sinusoïdale
$u_1(t) = P_m \cos(2\pi F_p\,t)$ à son entrée $E_1$ et une tension
$u_2(t) = U_0 + s(t)$ à son entrée $E_2$, avec $U_0$ la composante continue de la
tension et $s(t) = S_m \cos(2\pi f_s\,t)$ la tension modulante (figure 3).

La courbe de la figure 4 représente la tension de sortie
$u_s(t) = k\,u_1(t)\,u_2(t)$, visualisée par les élèves sur l'écran d'un
oscilloscope. $k$ est une constante positive caractérisant le multiplieur $X$.

1. (0,75) Montrer, en précisant les expressions de $A$ et de $m$, que la tension
   $u_s(t)$ s'écrit sous la forme :
   $u_s(t) = A\left[1 + m \cos(2\pi f_s\,t)\right]\cos(2\pi F_p\,t)$.
2. En exploitant la courbe de la figure 4 :
   1. (0,5) Trouver les fréquences $F_p$ de la porteuse et $f_s$ de la tension
      modulante.
   2. (0,5) Déterminer le taux de modulation et en déduire la qualité de
      modulation.

*Figure 3 (schéma) :* circuit intégré multiplieur $(X)$ (symbole $\times$) avec
deux entrées, $E_1$ (tension $u_1(t)$) et $E_2$ (tension $u_2(t)$), et une sortie
$S$ (tension $u_s(t)$), le montage étant relié à la masse.

*Figure 4 (oscillogramme) :* $u_s\ (\text{V})$ en fonction de $t\ (\text{ms})$ ;
signal modulé en amplitude (enveloppe sinusoïdale) ; ordonnées graduées de $-3$ à
$+3$ ; axe des abscisses marqué aux valeurs $5$ et $15\ \text{ms}$. Amplitude
maximale de l'enveloppe $\approx 3\ \text{V}$ et minimale $\approx 1\ \text{V}$
*(lecture d'échelle à confirmer)*.

---

## 2021 — session normale — Exercice IV (Partie III)
Source: https://www.alloschool.com/element/127287
Statut: transcrit (non vérifié) — 2026-08-06, transcription depuis scan
course-422/upload-84195, page(s) 6–7. À faire vérifier (README §3).

- Filière / épreuve : Sciences Physiques (SPC), BIOF — PC, 3 h, coef 7
- Code sujet : NS 28F · Barème de l'exercice complet : 4,75 points · Barème de
  la Partie III transcrite ici : 1,75 point
- Images lues : `.../course-422/upload-84195/0006-big.jpg`, `.../0007-big.jpg`
- Pages du scan : 6 et 7 (sur 8)
- Portée : **Partie III (modulation d'amplitude)** de l'exercice IV du sujet
  2021 N, transcrite ici. La **Partie I (réponse d'un dipôle RC à un
  échelon)** est sous `rc-charge.md` ; la **Partie II (oscillations LC)** est
  sous `rlc-serie.md`. Différence notable avec l'exercice 2017 N Ex III-II
  (même thème, ci-dessus) : ici l'oscilloscope visualise les **deux tensions
  d'entrée** $u_1(t)$ et $u_2(t)$ du multiplieur, **pas** la sortie modulée
  $u_s(t)$.

**III- Modulation d'amplitude d'un signal.**

Pour obtenir un signal modulé en amplitude, on réalise le montage représenté
sur le schéma de la figure 5 où le multiplieur $X$ est un circuit intégré
possédant deux entrées $E_1$ et $E_2$ et une sortie $S$.

On applique :
- sur l'entrée $E_1$ une tension $u_1(t)$ ayant pour expression $u_1(t) =
  P_m \cos(2\pi F_p.t)$ ;
- sur l'entrée $E_2$ une tension $u_2(t)$ ayant pour expression $u_2(t) =
  U_0 + s(t)$ où $s(t) = S_m \cos(2\pi f_s.t)$ est la tension modulante et
  $U_0$ est la composante continue de cette tension.

On obtient à la sortie $S$ du multiplieur $X$ une tension $u_s(t)$ modulée en
amplitude. On visualise la tension $u_1(t)$ sur la voie A de l'oscilloscope et
la tension $u_2(t)$ sur la voie B (figure 6).

**Données :** Sensibilité verticale : $1\ \text{V/div}$. Sensibilité
horizontale : $2\ \text{ms/div}$.

1. (0,25) Définir la modulation d'amplitude.
2. Déterminer graphiquement :
   1. (0,5) les fréquences $F_p$ et $f_s$.
   2. (0,5) la valeur de $S_m$ et celle de $U_0$.
3. (0,5) La modulation réalisée dans ce cas sera-t-elle de bonne qualité ?
   Justifier votre réponse.

*Figure 5 (schéma) :* cadre englobant, à l'intérieur duquel le multiplieur $X$
est représenté par un rectangle étiqueté « X ». Deux lignes horizontales
entrent par la gauche dans le rectangle : la ligne supérieure, étiquetée
$E_1$, reliée par une flèche verticale montante $u_1$ à un rail de masse en
bas du cadre ; la ligne inférieure, étiquetée $E_2$, reliée par une flèche
verticale montante $u_2$ au même rail de masse. Une ligne horizontale sort par
la droite du rectangle, étiquetée $S$, reliée par une flèche verticale
montante $u_s$ au rail de masse. Le rail de masse porte le symbole de terre
(hachures) en son milieu.

*Figure 6 (oscillogramme) :* écran d'oscilloscope quadrillé (grille
rectangulaire, trait pointillé vertical marquant le centre de l'écran). Deux
tracés superposés : $u_1(t)$, oscillation rapide de faible amplitude occupant
toute la largeur de l'écran (porteuse, très resserrée) ; $u_2(t)$, oscillation
nettement plus lente et de plus grande amplitude (enveloppe), visible sur
environ deux périodes complètes à l'écran, dont les sommets affleurent le haut
du faisceau formé par $u_1(t)$ — allure caractéristique d'un signal support
d'une modulation d'amplitude. Les deux courbes sont repérées par des flèches
et les étiquettes « $u_2(t)$ » et « $u_1(t)$ » en bordure droite de l'écran
*(nombre exact de divisions et amplitudes chiffrées non lues avec certitude —
lecture à confirmer)*.
