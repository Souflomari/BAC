# 14 — Quatre maquettes supplémentaires (crossing-over, décharge RC, miroir ln/exp, gènes liés)

> Remise du chantier 3 (branche `antigravity/maquettes-3`, PR brouillon vers `claude/vibrant-fermi-v1lxj5`).
> Les quatre nouveaux composants suivent les règles M1 à M9 de [`docs/refonte/09-regles-du-mouvement.md`](../../refonte/09-regles-du-mouvement.md),
> utilisent les primitives de [`web/src/components/pilote/maquettes/outils.ts`](../../../web/src/components/pilote/maquettes/outils.ts),
> lisent leurs valeurs dans les fichiers `*-outils.js` correspondants, et préservent la garde SSR `useHydrated`
> dans [`web/src/components/pilote/maquettes/MaquettesPageView.tsx`](../../../web/src/components/pilote/maquettes/MaquettesPageView.tsx).
> Aucun fichier de leçon (`*-moteur.js`, `*-scenes-*.js`, `*-outils.js`) ni `noyau.js` n’a été modifié.

---

## 1. Synthèse des quatre nouvelles maquettes et tailles mesurées à `390 px`

| Maquette | Onglet sur `/pilote/maquettes` | Clés d’étapes cibles | Largeur SVG à `390 px` | Corps minimal mesuré à `390 px` (règle M5) | Débordement horizontal |
| :--- | :--- | :--- | :---: | :---: | :---: |
| [`MaquetteMeioseCrossing.tsx`](../../../web/src/components/pilote/maquettes/MaquetteMeioseCrossing.tsx) | `Crossing-over` | `chiasma`, `echange`, `v-intra` | `348,0 px` | **`11,45 px`** | `0` |
| [`MaquetteDipoleRcDecharge.tsx`](../../../web/src/components/pilote/maquettes/MaquetteDipoleRcDecharge.tsx) | `RC décharge` | `ed-decharge`, `sol-decharge`, `i-decharge`, `v-37` | `348,0 px` | **`11,45 px`** | `0` |
| [`MaquetteExponentielleMiroir.tsx`](../../../web/src/components/pilote/maquettes/MaquetteExponentielleMiroir.tsx) | `Miroir ln / exp` | `pliage`, `reflet-pente`, `pente-hauteur`, `derivee` | `348,0 px` | **`11,45 px`** | `0` |
| [`MaquetteTransmissionLies.tsx`](../../../web/src/components/pilote/maquettes/MaquetteTransmissionLies.tsx) | `Gènes liés` | `vrai-tc`, `quatre-classes`, `crossing-over`, `pourcentage` | `348,0 px` | **`11,45 px`** | `0` |

---

## 2. Détail par maquette : cible, remplacement et points d’attention

### 1. `meiose` — `MaquetteMeioseCrossing.tsx`
- **Clés d’étapes cibles** : `chiasma`, `echange`, `v-intra` (beat 6 dans [`web/src/components/pilote/meiose-moteur.js`](../../../web/src/components/pilote/meiose-moteur.js)).
- **Valeurs importées** : `gametes(0, 1)` (`AD`, `Ad`, `aD`, `ad`) et `RECOMBINEES` (`2`) depuis [`web/src/components/pilote/meiose-outils.js`](../../../web/src/components/pilote/meiose-outils.js).
- **Ce qu’elle remplace** : la scène ancienne `meiose` à quatre barres horizontales portant chacune son propre centromère, qui rompait l’unité graphique avec `meiose-scenes-d.js` et masquait la différence entre chromatides sœurs et non sœurs.
- **Ce qu’elle montre** : la grande paire dessinée dans la même grammaire verticale bichromatidienne que `MaquetteMeiose` (un centromère par chromosome), le croisement (chiasma) entre les deux chromatides **non sœurs** internes, l’échange du segment portant `D`/`d`, puis le suivi continu des quatre chromatides jusqu’aux quatre gamètes (2 parentaux `AD`, `ad` et 2 recombinés `Ad`, `aD`).

### 2. `dipole-rc` — `MaquetteDipoleRcDecharge.tsx`
- **Clés d’étapes cibles** : `ed-decharge`, `sol-decharge`, `i-decharge`, `v-37` (beat 7 dans [`web/src/components/pilote/dipole-rc-moteur.js`](../../../web/src/components/pilote/dipole-rc-moteur.js)).
- **Valeurs importées** : `E_V`, `R_OHM`, `C_F`, `TAU`, `I0`, `uDech`, `iDech`, `U37`, `P37` depuis [`web/src/components/pilote/dipole-rc-outils.js`](../../../web/src/components/pilote/dipole-rc-outils.js).
- **Ce qu’elle remplace** : la séparation entre le circuit statique (`ed-decharge`, `i-decharge`) et la courbe isolée (`sol-decharge`, `v-37`), sans lien visuel entre le vidage des armatures, la chute de $u_C$ à 37 % à $t = \tau$ et l’inversion du courant réel.
- **Respect strict de la règle M9 (`i-decharge`)** : tant que l’élève n’a pas choisi un pari sur le signe de $i(t)$ (`i < 0`, `i > 0` ou `i(0⁺) = 0`), la scène masque le sens réel du courant dans la maille (`sens réel : ?`), masque la courbe négative $i(t)$ et n’affiche pas le signe de $i$ dans le bandeau supérieur. Dès le choix cliqué, la flèche rouge inversée et la courbe $i(t) = -(E/R)\,e^{-t/\tau}$ se révèlent et suivent le curseur de temps.

### 3. `exponentielle` — `MaquetteExponentielleMiroir.tsx`
- **Clés d’étapes cibles** : `pliage`, `reflet-pente`, `pente-hauteur`, `derivee` (beats 3 et 6 dans [`web/src/components/pilote/exponentielle-moteur.js`](../../../web/src/components/pilote/exponentielle-moteur.js)).
- **Valeurs importées** : `B_TAN` (`4`), `H_PH` (`6`), `LN2`, `LNB`, `X_PH` depuis [`web/src/components/pilote/exponentielle-outils.js`](../../../web/src/components/pilote/exponentielle-outils.js).
- **Ce qu’elle remplace** : les transitions séparées entre la symétrie `miroir` et la tangente `expo`, où l’élève ne peut pas faire glisser ensemble le point $M(x ; e^x)$ et son reflet $M'(e^x ; x)$ en voyant en direct que $\text{pente} = \text{hauteur} = e^x$.
- **Ce qu’elle montre** : repère orthonormé avec la droite miroir $y = x$, les courbes $\ln$ et $\exp$, le segment de réflexion perpendiculaire reliant $M$ et $M'$, la barre verticale de hauteur $e^x$, la tangente à $\exp$ (triangle de pente) et la tangente miroir à $\ln$ (activable/masquable) de pente $1/e^x$.

### 4. `transmission` — `MaquetteTransmissionLies.tsx`
- **Clés d’étapes cibles** : `vrai-tc`, `quatre-classes`, `crossing-over`, `pourcentage` (beat 6 dans [`web/src/components/pilote/transmission-moteur.js`](../../../web/src/components/pilote/transmission-moteur.js)).
- **Valeurs importées** : `SV24R`, `SV24R_REC` (`3 cM`), `SV24R_PAR`, `SV22_D` (`19 cM`), `SV22_PAR`, `SV22_REC`, `EX_TC`, `EX_N`, `EX_D` (`20 cM`) depuis [`web/src/components/pilote/transmission-outils.js`](../../../web/src/components/pilote/transmission-outils.js).
- **Ce qu’elle remplace** : le passage séparé entre la scène `echiquier` (4 classes inégales) et l’ancienne scène `meiose` (crossing-over), qui n’affiche pas côte à côte la cause chromosomique et les proportions du test-cross.
- **Ce qu’elle montre** : à gauche, la tétrade des chromosomes homologues de F1 portant les deux gènes liés (style bichromatidien unifié) qui subit un crossing-over ; à droite, les quatre classes du test-cross (2 grandes parentales, 2 petites recombinées) pour trois jeux réels du cours (`SVT 2024 R`, `SVT 2022 N`, exemple à `20 cM`) et la relation $d\text{ cM} = \%\text{ recombinés}$.
