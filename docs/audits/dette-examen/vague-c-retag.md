# Vague C — plan de ré-étiquetage des misconceptions (4 notions PC)

> **Statut : v1, 2026-09-27. Plan d'exécution, écrit par pedagogy-architect pour
> l'item-author.** Il se lit de haut en bas et s'exécute mécaniquement : chaque
> ligne dit quel fichier, quel item, quel choix, quel ancien tag, quel nouveau.
> Aucun jugement n'est laissé à l'exécutant — le jugement vit dans les quatre
> registres cités au §1, qui sont la source des libellés.
>
> **Pourquoi.** La relecture pédagogique de la vague 1 sur la dette d'examen a
> trouvé que les items neufs de la vague C accrochent des ids de MODÈLE (larges,
> physiques) à ce qui est en réalité un dérapage d'algèbre, d'arithmétique ou de
> lecture graphique. Le modèle apprenant dirait alors à l'élève quelque chose de
> faux sur son propre raisonnement — « tu ne sais pas ce qu'est $\tau$ » à un
> élève qui a écrit la bonne relation et l'a mal retournée. Six feedbacks
> devaient même plaider leur propre tag (« le même type de rapport inversé que
> confondre $RC$ et $R/C$ »), ce qui est le signe le plus fiable d'un tag faux.
>
> **Ce que ce plan ne fait pas.** Il ne touche aucun énoncé, aucune bonne
> réponse, aucune `solution`. Il change des étiquettes, sept feedbacks, et
> ajoute huit items.

---

## 1. Les huit ids neufs — où trouver le YAML à coller

Les blocs YAML sont écrits **une seule fois**, dans le registre de chaque
notion, `misconceptions:`-ready (guillemets doubles, `\\` pour LaTeX, style de
l'inventaire existant). **Copier verbatim, ne pas retaper.**

| Notion | Id neuf | Source du YAML |
|---|---|---|
| rc-charge | `mc.physics.pc_rc_charge.ed-transformee-sans-verification` | `content/pc/rc-charge/misconception-ledger.md` §1 |
| rc-charge | `mc.physics.pc_rc_charge.lecture-graphique-mal-exploitee` | idem |
| rc-charge | `mc.physics.pc_rc_charge.prefixe-unite-non-converti` | idem |
| rc-charge | `mc.physics.pc_rc_charge.charge-et-decharge-memes-lois` | idem |
| dipole-rl | `mc.physics.pc_dipole_rl.isolement-grandeur-non-controle` | `content/pc/dipole-rl/misconception-ledger.md` §1 |
| rlc-serie | `mc.physics.rlc_serie.phase-initiale-mal-determinee` | `content/pc/rlc-serie/misconception-ledger.md` §1 |
| rlc-serie | `mc.physics.rlc_serie.sans-solution-rien-de-calculable` | idem |
| piles | `mc.physics.pc_piles.reactif-limitant-mal-identifie` | `content/pc/piles/misconception-ledger.md` §1 |

Les ids se déclarent **à la fin du bloc `misconceptions:`** de `items.yaml`, dans
l'ordre du tableau, en respectant la ponctuation du fichier hôte (rc-charge et
dipole-rl : pas de ligne vide entre entrées ; rlc-serie et piles : une ligne vide
entre entrées).

### Règle de séquencement — non négociable

Trois portes se croisent ici, et une seule erreur d'ordre les fait rougir :

1. `scripts/validate-content.mjs` **échoue** si un `misconception:` (ou un
   `primary_misconception:`) n'est pas déclaré dans l'inventaire du même fichier.
   → **un tag et sa déclaration voyagent ensemble.**
2. `scripts/resume-couverture.mjs --porte` est une porte **FRANCHE** sur
   `floor_met` : un id **déclaré** couvert par moins de 3 items du banc rend
   `floor_met: true` mensonger.
   → **un id neuf et les items qui l'amènent à 3 voyagent ensemble.**
3. `scripts/couverture-diagnostique.mjs --porte` est un **cliquet** :
   `plancher` ne descend pas, `sansTag` et `fantomes` ne montent pas.
   → **tout distracteur d'un item neuf porte un id RÉEL** (jamais `null`, jamais
   de champ absent — `null` compte comme « sans tag » et ferait monter le
   compteur, y compris sur rlc-serie dont la base est déjà à 23).

**Donc : une notion = un commit,** contenant déclaration + re-tags + items neufs
+ `coverage_summary` réécrit. Les comptes attendus après coup sont dans le
registre de chaque notion, §4.

---

## 2. rc-charge — `content/pc/rc-charge/items.yaml`

### 2.1 Re-tags (17 distracteurs, 6 `primary_misconception`)

| Item | Choix | Ancien tag | Nouveau tag |
|---|---|---|---|
| RC-13 | B | `…pc_rc_charge.tau-mauvais-groupement` | `…pc_rc_charge.lecture-graphique-mal-exploitee` |
| RC-14 | B | `…tau-mauvais-groupement` | `…lecture-graphique-mal-exploitee` |
| RC-16 | B | `…tau-mauvais-groupement` | `…charge-et-decharge-memes-lois` |
| RC-16 | C | `…tau-mauvais-groupement` | `…charge-et-decharge-memes-lois` |
| RC-16 | *primary* | `…tau-mauvais-groupement` | `…charge-et-decharge-memes-lois` |
| RC-28 | B | `…tau-mauvais-groupement` | `…ed-transformee-sans-verification` |
| RC-28 | C | `…tau-mauvais-groupement` | `…ed-transformee-sans-verification` |
| RC-28 | *primary* | `…charge-a-debit-constant` | `…ed-transformee-sans-verification` |
| RC-29 | C | `…tau-mauvais-groupement` | `…ed-transformee-sans-verification` |
| RC-29 | D | `…tau-mauvais-groupement` | `…ed-transformee-sans-verification` |
| RC-29 | *primary* | `…tau-mauvais-groupement` | `…ed-transformee-sans-verification` |
| RC-30 | B | `…tau-mauvais-groupement` | `…ed-transformee-sans-verification` |
| RC-30 | D | `…tau-mauvais-groupement` | `…ed-transformee-sans-verification` |
| RC-30 | *primary* | `…charge-a-debit-constant` | `…ed-transformee-sans-verification` |
| RC-31 | B | `…tau-mauvais-groupement` | `…lecture-graphique-mal-exploitee` |
| RC-31 | C | `…tau-mauvais-groupement` | `…prefixe-unite-non-converti` |
| RC-31 | D | `…tau-mauvais-groupement` | `…lecture-graphique-mal-exploitee` |
| RC-31 | *primary* | `…tau-mauvais-groupement` | `…lecture-graphique-mal-exploitee` |
| RC-32 | C | `…tau-mauvais-groupement` | `…charge-et-decharge-memes-lois` |
| RC-33 | C | `…tau-mauvais-groupement` | `…lecture-graphique-mal-exploitee` |
| RC-33 | D | `…tau-mauvais-groupement` | `…lecture-graphique-mal-exploitee` |
| RC-33 | *primary* | `…tau-mauvais-groupement` | `…lecture-graphique-mal-exploitee` |
| RC-34 | B | `…tau-mauvais-groupement` | `…charge-et-decharge-memes-lois` |
| RC-34 | *primary* | `…charge-a-debit-constant` | `…charge-et-decharge-memes-lois` |

**Ne touche à rien d'autre.** En particulier restent en place, et c'est voulu
(justifications au §3 du registre) : RC-4 B/C/D, RC-9 D, RC-12 B/C/D,
RC-13 C/D, RC-16 D, RC-17 B/C/D, RC-19 D, RC-24 C, RC-25 C, RC-28 D, RC-29 B,
RC-30 C, RC-32 B/D, RC-33 B, RC-34 C/D.

### 2.2 Feedbacks à corriger (8) — la phrase qui plaidait le tag

Remplacer **uniquement** la ou les phrases citées ; garder le reste tel quel.

**RC-28 B** — supprimer « *C'est le même mauvais groupement des constantes $R$
et $C$ que confondre $RC$ et $R/C$ pour $\tau$.* » et écrire à la place :
> C'est le contrôle à faire systématiquement après une transformation, et il ne
> demande pas de connaître la bonne réponse d'avance.

**RC-28 C** — remplacer la fin « *— un mauvais groupement de $R$ et $C$, comme
celui qui confond $RC$ et $R/C$ pour $\tau$.* » par :
> Contrôle d'homogénéité : $[R\,dq/dt] = \Omega \times A = V$, comme $q/C$ et
> comme $E$ ; avec $1/(RC)$ devant $dq/dt$, les trois termes ne sont plus des
> volts.

**RC-29 C** — remplacer « *le multiplier ici est un mauvais groupement, qui
déplace un facteur du terme en $\alpha$ vers le terme en $A$.* » par :
> ce facteur a glissé du terme en $\alpha$ vers le terme en $A$ au moment de la
> substitution. Reprends l'injection et sépare les deux conditions : d'abord le
> terme constant, puis le coefficient de l'exponentielle.

**RC-30 B** — remplacer « *: un mauvais groupement de signe, comme celui qui
romprait la vérification de l'équation en $q$.* » par :
> . C'est le contrôle le moins coûteux après une dérivation : demande-toi ce que
> la solution ferait avec ce signe-là.

**RC-31 B** — remplacer « *— le même type de rapport inversé que confondre $RC$
et $R/C$.* » par :
> Le contrôle qui tranche, ce sont les unités :
> $I_0/\text{pente} = \text{A}/(\text{V/s}) = \text{A}\cdot\text{s/V} = \text{F}$,
> une capacité ; le produit, lui, n'a pas les unités d'une capacité.

**RC-31 C** — remplacer « *— une erreur d'unité de la même famille que confondre
secondes et millisecondes pour $\tau$.* » par :
> Convertis les préfixes avant de calculer, puis contrôle l'ordre de grandeur :
> $4{,}0\times10^{-3}\ \text{F}$ serait un condensateur monstrueux, sans rapport
> avec un composant de laboratoire.

**RC-31 D** — remplacer « *oublier $I_0$ dans ce rapport revient au même type de
groupement manquant que $\tau=RC$ (et non $\tau=C$ seul).* » par :
> le facteur lu sur le graphe doit être identifié au coefficient COMPLET de la
> relation théorique, $I_0$ compris.

**RC-34 B** — réécrire la première phrase pour nommer le modèle réellement
détecté, et ajouter le contrôle ; le reste inchangé :
> Ce résultat vient de $e^{-t/\tau}=U_S/E$ : c'est la loi de la DÉCHARGE
> ($u_C = U_0e^{-t/\tau}$) appliquée à une charge — le « $1-$ » a disparu.
> L'inversion de $E(1-e^{-t/\tau})=U_S$ donne $e^{-t/\tau}=(E-U_S)/E$ : c'est ce
> rapport-là qu'il faut passer au logarithme. Contrôle : à $t=\tau$, une charge a
> ATTEINT $63\,\%$ de $E$ ; une décharge, elle, en a encore $37\,\%$.

*(Huit au total : les sept qui plaidaient leur propre tag — RC-28 B, RC-28 C,
RC-29 C, RC-30 B, RC-31 B, RC-31 C, RC-31 D — plus RC-34 B, qui nommait l'erreur
d'algèbre sans nommer le modèle. RC-13 B, RC-14 B, RC-16 B/C, RC-32 C, RC-33 C/D
changent de tag **sans retouche de feedback** : leur texte plaidait déjà la
bonne chose.)*

### 2.3 Commentaire de bloc à corriger

Le bloc de commentaire au-dessus de RC-28 (`items.yaml` L1687-1707) affirme
« *Misconception-reuse note (house rule: a new id only if it can reach >= 3
items on its own). None of these 7 gestures has 3 items of its own, so no new
ids were added.* » **C'est cette conclusion que la relecture a renversée.**
Remplacer ce paragraphe par :

> Misconception-reuse note — REVISÉE le 2026-09-27 (vague 1 pédagogie).
> La version précédente rattachait les dérapages d'algèbre, d'arithmétique et de
> lecture graphique de ces 7 items à `tau-mauvais-groupement` et à
> `charge-a-debit-constant`, faute d'id plus juste. C'était un faux diagnostic :
> un signe inversé dans une équation différentielle n'est pas une confusion
> $RC$ / $R/C$. Quatre ids honnêtes ont été déclarés (voir l'inventaire et
> `misconception-ledger.md`) et les distracteurs concernés y ont été déplacés ;
> le détail item par item est dans `docs/audits/dette-examen/vague-c-retag.md`.

### 2.4 `coverage_summary`

- `total_items: 34` → **36**.
- Recompter `per_misconception` **avec la convention de la porte** (un item
  compte une fois par id si **au moins un de ses distracteurs** le porte —
  `web/scripts/lib/couverture-compte.mjs`), et **dire dans `method:` que c'est
  cette convention** : l'actuelle (« item-level, by primary_misconception »)
  diverge de ce que la chaîne compte, ce qui rend le bloc illisible pour le
  mainteneur. Valeurs attendues : registre §4.
- `floor_met: true` reste vrai **à condition** que RC-35/RC-36 soient dans le
  même commit.
- Ajouter une note de 3 lignes : re-tag vague 1, 4 ids neufs, 2 items neufs.

---

## 3. dipole-rl — `content/pc/dipole-rl/items.yaml`

### 3.1 Re-tags (5 distracteurs, 1 `primary_misconception`)

| Item | Choix | Ancien tag | Nouveau tag |
|---|---|---|---|
| RL-24 | D | `…pc_dipole_rl.tau-mauvais-groupement` | `…pc_dipole_rl.isolement-grandeur-non-controle` |
| RL-25 | D | `…tau-mauvais-groupement` | `…isolement-grandeur-non-controle` |
| RL-27 | B | `…tau-mauvais-groupement` | `…isolement-grandeur-non-controle` |
| RL-27 | C | `…tau-mauvais-groupement` | `…isolement-grandeur-non-controle` |
| RL-27 | D | `…tau-mauvais-groupement` | `…isolement-grandeur-non-controle` |
| RL-27 | *primary* | `…tau-mauvais-groupement` | `…isolement-grandeur-non-controle` |

**Aucun feedback à réécrire** : les cinq plaidaient déjà le bon contrôle
(dépassement de $E$ impossible, $1296\ \text{H}$ absurde, $E/I_p$ = résistance
TOTALE). Seul le tag était faux.

**Aucun item neuf** : l'id atteint 3 items avec RL-24, RL-25, RL-27.

### 3.2 Commentaire de bloc

Le bloc au-dessus de RL-24 (`items.yaml` L1288-1304) se termine par « *All four
distractors per item carry a misconception id from the existing inventory (no
new id added — none of the four gestures needed one beyond the seven already
floor-eligible).* » Remplacer la parenthèse par :

> (un id neuf a été ajouté le 2026-09-27, `isolement-grandeur-non-controle` :
> RL-27 ne demande jamais $\tau$, et ses trois distracteurs — rapport inversé,
> produit au lieu du quotient, facteur $E$ oublié — portaient
> `tau-mauvais-groupement` à tort. Détail :
> `docs/audits/dette-examen/vague-c-retag.md`.)

### 3.3 `coverage_summary`

`total_items` reste **27**. Recompter `per_misconception` avec la convention de
la porte et le dire dans `method:` (valeurs attendues : registre §4 —
`tau-mauvais-groupement` passe de 8 à 5, l'id neuf naît à 3). `floor_met: true`
reste vrai. Ajouter la note de re-tag.

---

## 4. rlc-serie — `content/pc/rlc-serie/items.yaml`

### 4.1 Re-tags (4 distracteurs)

| Item | Choix | Ancien tag | Nouveau tag |
|---|---|---|---|
| RLC-M7-5 | C | `…rlc_serie.energie-consommee-non-conservee` | `…rlc_serie.sans-solution-rien-de-calculable` |
| RLC-M7-5 | D | `…rlc_serie.cas-amorti-solution-sinusoidale-fermee` | `…rlc_serie.sans-solution-rien-de-calculable` |
| RLC-M7-6 | B | `…rlc_serie.confusion-roles-C-L-stockage` | `…rlc_serie.phase-initiale-mal-determinee` |
| RLC-M7-6 | D | `…rlc_serie.plus-de-R-oscille-plus-vite` | `…rlc_serie.phase-initiale-mal-determinee` |

Et sur **RLC-M7-6 D** : `also_reveals: [mc.physics.rlc_serie.resistance-entretient-oscillations]`
→ **`also_reveals: []`** (l'élève n'a invoqué aucun amortissement).

**RLC-M7-6 C reste sur `T0-depend-de-R`** (justification : registre §3). Ces
items ne portent pas de `primary_misconception` : rien d'autre à changer.

### 4.2 Trois commentaires d'auteur à SUPPRIMER

Ils justifiaient le rattachement approximatif — un tag qui a besoin d'un
commentaire pour se défendre est un tag faux :

- au-dessus de **RLC-M7-5 D** : « *M6 reuse : la même confusion de frontière
  (« établir sans résoudre ») étendue, à tort, jusqu'à interdire les relations
  instantanées… id le plus proche de l'inventaire, pas une redite littérale de sa
  description.* »
- au-dessus de **RLC-M7-6 B** : « *M7 reuse : même famille que la confusion
  u_C/i en opposition de phase…* »
- au-dessus de **RLC-M7-6 D** : « *M3 reuse : lit un trait ordinaire de
  l'oscillation idéale…* »

### 4.3 Un feedback à réécrire, un à compléter

**RLC-M7-6 D** — le feedback actuel argumente un amortissement que l'élève n'a
jamais invoqué. Le remplacer entièrement par :
> Modèle détecté : la branche choisie sans la seconde condition.
> $\cos\varphi = 0{,}50$ laisse bien deux valeurs, $+\pi/3$ et $-\pi/3$ ; c'est
> le signe de $\dfrac{di}{dt}(0)$ qui tranche. Avec $\varphi = -\pi/3$,
> $\sin\varphi < 0$, donc $\dfrac{di}{dt}(0) = -I_m\omega_0\sin\varphi > 0$ : le
> courant CROÎTRAIT à $t=0$, ce que l'énoncé exclut.

**RLC-M7-6 B** — garder le texte, ajouter en tête la ligne de convention du
fichier :
> Modèle détecté : une seule condition initiale suffirait.

**RLC-M7-5 C et D** — inchangés : ils plaident déjà la bonne chose (la loi d'Ohm
reste valable à tout instant ; $u_C$ et $u_R$ sont mesurés directement).

### 4.4 `coverage_summary`

- `total_items: 41` → **45** (porte FRANCHE).
- Recompter `per_misconception` (valeurs attendues : registre §4). Corriger les
  lignes de commentaire qui citent nommément les items déplacés.
- `floor_met: true` reste vrai **à condition** que les 4 items neufs soient dans
  le même commit.
- Mettre à jour `habilete_mix` : utilisation 15 → **17**, résolution 17 → **18**,
  application_experimentale 9 → **10** ; pourcentages 37,8 / 40,0 / 22,2 ;
  garder la note de signalement au garde éditorial (l'écart à 50/35/15 ne
  s'aggrave pas, il ne se résorbe pas non plus).

---

## 5. piles — `content/pc/piles/items.yaml`

### 5.1 Re-tags (2 distracteurs)

| Item | Choix | Ancien tag | Nouveau tag |
|---|---|---|---|
| PILES-26 | C | `…pc_piles.role-constituants` | `…pc_piles.reactif-limitant-mal-identifie` |
| PILES-26 | D | `…pc_piles.role-constituants` | `…pc_piles.reactif-limitant-mal-identifie` |

**Aucun feedback à réécrire.** Aucun `primary_misconception` dans cette notion.

### 5.2 `coverage_summary`

`total_items: 28` → **30**. Recompter (registre §4 : `role-constituants` 5 → 4,
id neuf à 3 avec PILES-29/30). `floor_met: true` reste vrai à condition que les
deux items neufs soient dans le même commit. Ajouter la note de re-tag + la
mention de la délégation PILES-28 (registre §7).

---

## 6. Les huit items à écrire

Règles communes, valables pour les huit :

- **Tous les distracteurs portent un `misconception:` réel** (jamais `null`,
  jamais de champ absent) — cliquet `sansTag`.
- **Nombres propres.** Aucun ne reprend les valeurs de la leçon, d'un item
  existant, ni d'une entrée de `bank.yaml` : **vérifier `bank.yaml` de la notion
  avant d'écrire** (règle de la maison des vagues précédentes). Les valeurs
  ci-dessous ont été choisies pour différer des items voisins cités ; la
  vérification `bank.yaml` reste à faire par l'auteur.
- **Position de la bonne réponse variée** (ne pas empiler des `correct: A`).
- Passer `node scripts/enonces-jumeaux.mjs` : aucun des huit énoncés ne doit être
  un jumeau d'un énoncé existant.
- Style : registre tu/on, français, KaTeX `$…$`, `solution:` en bloc avec le
  raisonnement d'expert (pas seulement l'algèbre propre).

### 6.1 RC-35 — `prefixe-unite-non-converti` (rc-charge)

| Champ | Valeur |
|---|---|
| `rung` | `"R3"` |
| `difficulty_level` | 2 |
| `primary_misconception` | `…pc_rc_charge.prefixe-unite-non-converti` |
| Geste testé | $\tau = RC$ avec **deux préfixes à convertir** (kΩ, nF) |
| Contrainte de nombres | $R = 4{,}7\ \text{k}\Omega$, $C = 100\ \text{nF}$ → $\tau = 4{,}7\times10^{-4}\ \text{s} = 0{,}47\ \text{ms}$. Différent de la leçon ($\tau = 1{,}0\ \text{ms}$), de RC-17 (3,0 µF / 6,0 ms) et de RC-33 (2,0 kΩ / 2,5 µF). |

Choix :
- **A (correct)** — $\tau = 4{,}7\times10^{3}\times1{,}00\times10^{-7} = 4{,}7\times10^{-4}\ \text{s} = 0{,}47\ \text{ms}$
- **B** — $\tau = 4{,}7\times100 = 4{,}7\times10^{2}\ \text{s}$ → `prefixe-unite-non-converti`
  *(les deux préfixes ignorés ; feedback : contrôle d'ordre de grandeur — 8 minutes pour charger un condensateur de labo, non)*
- **C** — $\tau = 0{,}47\ \text{s}$ → `prefixe-unite-non-converti`
  *(nF lu comme µF, décalage de $10^3$)*
- **D** — $\tau = R/C = 4{,}7\times10^{10}\ \text{s}$ → `tau-mauvais-groupement`
  *(le groupement canonique ; renforce l'id existant)*

### 6.2 RC-36 — `prefixe-unite-non-converti` (rc-charge)

| Champ | Valeur |
|---|---|
| `rung` | `"R4"` |
| `difficulty_level` | 3 |
| `primary_misconception` | `…pc_rc_charge.prefixe-unite-non-converti` |
| Geste testé | $E_C = \frac12Cu_C^2$ avec $C$ en **nF** |
| Contrainte de nombres | $C = 470\ \text{nF}$, $u_C = 15\ \text{V}$ → $E_C = 5{,}3\times10^{-5}\ \text{J} = 53\ \mu\text{J}$. Différent de RC-15 (2,0 µF / 12 V / 6,0 V). |

Choix (bonne réponse en **C**, pour varier) :
- **A** — $E_C = \frac12\times470\times225 = 5{,}3\times10^{4}\ \text{J}$ → `prefixe-unite-non-converti`
- **B** — $E_C = \frac12\times4{,}70\times10^{-7}\times15 = 3{,}5\times10^{-6}\ \text{J}$ → `energie-lineaire-en-u` *(carré oublié)*
- **C (correct)** — $E_C = \frac12\times4{,}70\times10^{-7}\times15^2 = 5{,}3\times10^{-5}\ \text{J} = 53\ \mu\text{J}$
- **D** — $E_C = 4{,}70\times10^{-7}\times225 = 1{,}1\times10^{-4}\ \text{J}$ → `energie-lineaire-en-u` *(facteur $\frac12$ oublié)*

*Effet collatéral voulu : `energie-lineaire-en-u`, aujourd'hui pile à 3 items,
passe à 4 — l'id le plus fragile de la notion cesse de l'être.*

### 6.3 PILES-29 — `reactif-limitant-mal-identifie` (piles)

| Champ | Valeur |
|---|---|
| `rung` | `"R6"` |
| `difficulty_level` | 3 |
| Geste testé | Comparer les DEUX réservoirs d'électrons et retenir le plus petit — ici c'est la **lame** qui limite (l'inverse de PILES-26, où c'est la solution) |
| Données | Lame de zinc $m = 0{,}65\ \text{g}$ ($M(Zn) = 65\ \text{g/mol}$) ; compartiment cuivre : $200\ \text{mL}$ à $[Cu^{2+}]_i = 0{,}50\ \text{mol/L}$ ; $I = 100\ \text{mA}$ ; $F \approx 9{,}65\times10^{4}\ \text{C/mol}$ |
| Calcul | $n(Zn) = 1{,}0\times10^{-2}$ mol → $n(e^-) = 2{,}0\times10^{-2}$ mol ; $n(Cu^{2+}) = 0{,}10$ mol → $n(e^-) = 0{,}20$ mol ; le zinc limite ; $Q = 1{,}93\times10^{3}$ C ; $\Delta t = 1{,}93\times10^{4}$ s $\approx 5{,}4$ h |

Choix (bonne réponse en **B**) :
- **A** — « Les ions $Cu^{2+}$ limitent : $\Delta t_{max} \approx 54\ \text{h}$ » → `reactif-limitant-mal-identifie`
- **B (correct)** — « Le zinc limite : $\Delta t_{max} \approx 5{,}4\ \text{h}$ »
- **C** — « Le zinc limite : $\Delta t_{max} \approx 2{,}7\ \text{h}$ » → `calcul-quantite-electricite` *(×2 stœchiométrique oublié)*
- **D** — « Les deux réservoirs s'additionnent : $\Delta t_{max} \approx 59\ \text{h}$ » → `reactif-limitant-mal-identifie`

L'énoncé **doit demander les deux choses** (« quel réactif limite, et quelle est
la durée maximale ») : c'est ce qui rend le tag honnête.

### 6.4 PILES-30 — `reactif-limitant-mal-identifie` (piles)

| Champ | Valeur |
|---|---|
| `rung` | `"R7"` |
| `difficulty_level` | 4 |
| Geste testé | Conceptuel, sans calcul : pourquoi « il reste du métal » ne dit rien de la durée |
| Énoncé | Un élève regarde une pile cuivre–argent et conclut : « la lame de cuivre est massive, il en restera encore longtemps — donc la pile durera longtemps ». Que répondre ? |

Choix (bonne réponse en **D**) :
- **A** — « La pile s'arrête quand les DEUX réactifs sont épuisés : il faut donc attendre l'épuisement du cuivre » → `reactif-limitant-mal-identifie`
- **B** — « La durée s'obtient en additionnant les électrons disponibles des deux côtés » → `reactif-limitant-mal-identifie`
- **C** — « La durée ne dépend pas des quantités de réactifs, seulement du courant demandé » → `pile-source-illimitee`
- **D (correct)** — « Ce que pèse la lame ne dit rien tant qu'on n'a pas comparé : on calcule les électrons disponibles des deux côtés ($2\,n(Cu)$ d'un côté, $n(Ag^{+})$ de l'autre) et on retient le PLUS PETIT — ici, presque toujours la solution »

*Effet collatéral voulu : `pile-source-illimitee`, aujourd'hui pile à 3 items,
passe à 4.*

### 6.5 RLC-M9-1 — `phase-initiale-mal-determinee` (rlc-serie)

| Champ | Valeur |
|---|---|
| `rung` | `"R2"` · `difficulty_level` 2 · `habilete: utilisation` |
| `tags` | `[misconception_driven, rlc_serie]` |
| Geste testé | Reconnaître **quelle** seconde condition lève l'ambiguïté (pas de calcul) |
| Énoncé | Circuit LC idéal, $i(t) = I_m\cos(2\pi t/T_0 + \varphi)$. Un élève écrit : $\cos\varphi = i(0)/I_m = 0{,}80$, donc $\varphi = \pm0{,}64\ \text{rad}$ — « on ne peut pas choisir entre les deux ». Que lui manque-t-il ? |

Choix (bonne réponse en **C**) :
- **A** — « La valeur de $T_0$ : c'est elle qui tranche entre les deux phases » → `phase-initiale-mal-determinee`
- **B** — « Rien : les deux valeurs sont également correctes, on garde $\pm0{,}64\ \text{rad}$ » → `phase-initiale-mal-determinee`
- **C (correct)** — « Le signe de $\dfrac{di}{dt}(0)$ : puisque $\dfrac{di}{dt}(0) = -I_m\omega_0\sin\varphi$, il fixe le signe de $\sin\varphi$, donc la branche. Un cosinus a deux constantes : il faut deux conditions. »
- **D** — « La valeur de $R$ » → `T0-depend-de-R`

*Le $0{,}80$ est délibérément différent du $0{,}50$ de RLC-M7-6.*

### 6.6 RLC-M9-2 — `phase-initiale-mal-determinee` (rlc-serie)

| Champ | Valeur |
|---|---|
| `rung` | `"R2"` · `difficulty_level` 3 · `habilete: résolution` |
| `tags` | `[misconception_driven, rlc_serie]` |
| Geste testé | Même détermination, **autre surface** : sur $u_C$ au lieu de $i$, avec un cosinus négatif |
| Données | $u_C(t) = U_m\cos(2\pi t/T_0 + \varphi)$, $U_m = 8{,}0\ \text{V}$, $u_C(0) = -4{,}0\ \text{V}$, et $u_C$ CROÎT à $t=0$ |
| Calcul | $\cos\varphi = -0{,}50 \Rightarrow \varphi = \pm2\pi/3$ ; $\dfrac{du_C}{dt}(0) = -U_m\omega_0\sin\varphi > 0 \Rightarrow \sin\varphi < 0 \Rightarrow \varphi = -2\pi/3$ |

Choix (bonne réponse en **A**) :
- **A (correct)** — $\varphi = -\dfrac{2\pi}{3}$
- **B** — $\varphi = +\dfrac{2\pi}{3}$ → `phase-initiale-mal-determinee` *(mauvaise branche)*
- **C** — $\varphi = \pm\dfrac{2\pi}{3}$ → `phase-initiale-mal-determinee` *(s'arrête à l'ambiguïté)*
- **D** — « Impossible : $u_C$ ne peut pas être négative, un condensateur qui se décharge va vers $0$ sans changer de signe » → `confond-oscillation-avec-decharge-rc`

*Effet collatéral voulu : `confond-oscillation-avec-decharge-rc`, aujourd'hui
pile à 3 items, passe à 4.*

### 6.7 RLC-M10-1 — `sans-solution-rien-de-calculable` (rlc-serie)

| Champ | Valeur |
|---|---|
| `rung` | `"R5"` · `difficulty_level` 3 · `habilete: utilisation` |
| `tags` | `[misconception_driven, rlc_serie]` |
| Geste testé | Savoir ce que « on établit sans résoudre » **n'interdit pas** |
| Énoncé | En régime amorti on établit $L\ddot q + R\dot q + q/C = 0$ et on s'arrête là : on ne dispose pas de $q(t)$. Sur un oscillogramme, à un instant $t$ qui n'est ni un maximum ni un passage par zéro, de quoi dispose-t-on pour calculer l'énergie totale $E_t(t)$ ? |

Choix (bonne réponse en **B**) :
- **A** — « De rien : sans $q(t)$, $i(t)$ et $u_C(t)$ restent inconnus à cet instant » → `sans-solution-rien-de-calculable`
- **B (correct)** — « Des relations instantanées, qui ne dépendent d'aucune solution : $i = u_R/R$, $q = Cu_C$, puis $E_t = \frac12Cu_C^2 + \frac12Li^2$ »
- **C** — « Uniquement des maxima de $u_C$, où $i = 0$ ; ailleurs le bilan n'est pas calculable » → `sans-solution-rien-de-calculable`
- **D** — « De la solution $q(t) = Q_{max}\cos(2\pi t/T_0 + \varphi)$, seule forme possible, utilisable malgré $R$ » → `cas-amorti-solution-sinusoidale-fermee`

*D remet `cas-amorti-solution-sinusoidale-fermee` à 7 items après le départ de
RLC-M7-5 — et il est ici honnête : ce distracteur affirme bien la forme fermée.*

### 6.8 RLC-M10-2 — `sans-solution-rien-de-calculable` (rlc-serie)

| Champ | Valeur |
|---|---|
| `rung` | `"R6"` · `difficulty_level` 3 · `habilete: application_experimentale` |
| `tags` | `[misconception_driven, rlc_serie, document_experimental]` |
| Geste testé | Lecture d'oscillogramme à un instant **non remarquable** : $i = u_R/R$ puis $\dfrac{dE_t}{dt} = -Ri^2$ |
| Données | $R = 25\ \Omega$, $L = 0{,}20\ \text{H}$, $C = 4{,}0\ \mu\text{F}$ ; $u_R(t) = 1{,}5\ \text{V}$ à un instant quelconque. Différent de RLC-M7-5 (0,1 H / 10 µF / 40 Ω / 4,0 V) et de RLC-M2-4 (5,0 µF). |
| Calcul | $i = 1{,}5/25 = 0{,}060\ \text{A}$ ; $\dfrac{dE_t}{dt} = -Ri^2 = -25\times3{,}6\times10^{-3} = -9{,}0\times10^{-2}\ \text{W}$ |

Choix (bonne réponse en **D**) :
- **A** — « Incalculable à cet instant : il faudrait la solution $q(t)$ du régime amorti » → `sans-solution-rien-de-calculable`
- **B** — « Nulle : l'énergie ne se perd qu'entre deux maxima, et seule la différence entre deux pics est mesurable » → `sans-solution-rien-de-calculable`
- **C** — $+9{,}0\times10^{-2}\ \text{W}$ → `resistance-entretient-oscillations`
- **D (correct)** — $-9{,}0\times10^{-2}\ \text{W}$

---

## 7. Comptes attendus après exécution (convention de la porte)

| Notion | `plancher` avant | après | `total_items` | ids passant sous 3 |
|---|---|---|---|---|
| rc-charge | 8 | **12** | 34 → 36 | aucun (`tau-mauvais-groupement` 17 → 11, puis 12 avec RC-35 D) |
| dipole-rl | 7 | **8** | 27 | aucun (`tau-mauvais-groupement` 8 → 5) |
| rlc-serie | 9 | **11** | 41 → 45 | aucun (le plus bas, `confond-oscillation-avec-decharge-rc`, monte de 3 à 4) |
| piles | 9 | **10** | 28 → 30 | aucun (`role-constituants` 5 → 4) |

Détail par id : §4 du registre de chaque notion.

## 8. Portes à passer (depuis `web/`)

```
node scripts/validate-content.mjs            # tout tag doit être déclaré
node scripts/couverture-diagnostique.mjs     # le rapport, à lire
node scripts/couverture-diagnostique.mjs --porte   # cliquet : plancher ↑, sansTag/fantômes ↓
node scripts/resume-couverture.mjs --porte    # FRANCHE : floor_met et total_items
node scripts/enonces-jumeaux.mjs             # les 8 énoncés neufs
```

Après le passage des quatre notions, `couverture-diagnostique --sceller` est
légitime (la couverture s'est améliorée) — **jamais pour faire taire une
régression**, et jamais avant d'avoir lu le rapport.

## 9. Ce que ce plan laisse ouvert (pour le propriétaire)

1. **rc-charge, dipole-rl et piles n'ont pas de `spec.md`.** Les
   `misconception-ledger.md` créés avec ce plan tiennent lieu de registre Box B
   pour les ids neufs et les délégations — pas de la rampe, pas du cadre.
2. **Les deux ids neufs de rlc-serie doivent être reportés dans son `spec.md`
   §1** (il en déclare 9) : sans cela, le spec et `items.yaml` portent deux
   inventaires différents.
3. **Quatre phrases de prose sont recommandées, aucune n'est bloquante** :
   rc-charge R1 (ED en $q$) et R3 (préfixes, « le piège nommé ») ; rlc-serie R5
   (« s'arrêter là ne veut pas dire qu'on ne peut plus rien calculer ») et R2
   (« combien de constantes, combien de conditions ») ; piles R5 (le signe
   affiché d'un appareil branché à l'envers) et R6 (comparer les deux
   réservoirs). Elles appartiennent à content-author, pas à item-author.
4. **RC-13 C/D** restent sur `tau-mauvais-groupement` faute d'un id « méthode de
   détermination de τ » qui atteindrait 3 items. Décision différée, écrite.
