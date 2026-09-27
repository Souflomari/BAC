# rlc-serie — registre des misconceptions (Box B, NOTION-TEMPLATE-V2 §B)

> **Statut : v1, 2026-09-27.** Écrit par pedagogy-architect après la relecture
> pédagogique de la vague 1 sur la dette d'examen (vague C). Deux faux
> diagnostics, tous deux dans les items de la vague 3 :
>
> - **RLC-M7-6 B** ($\varphi = \pm\pi/3$ : l'élève résout $\cos\varphi = 0{,}50$
>   et s'arrête, sans jamais utiliser le signe de $di/dt$) porte
>   `confusion-roles-C-L-stockage`. L'élève n'a rien inversé entre le
>   condensateur et la bobine : il a laissé une condition initiale sur la table.
> - **RLC-M7-6 D** ($-\pi/3$, la mauvaise branche) porte
>   `plus-de-R-oscille-plus-vite` + `resistance-entretient-oscillations`, et son
>   feedback argumente sur un amortissement que l'élève n'a jamais invoqué.
> - **RLC-M7-5 C et D** (« il faut attendre un maximum de $u_C$ » / « sans la
>   solution $q(t)$, $i(t)$ reste inconnu ») portent
>   `energie-consommee-non-conservee` et
>   `cas-amorti-solution-sinusoidale-fermee`. Or D dit exactement le CONTRAIRE
>   de ce dernier id : l'élève ne croit pas qu'une forme fermée existe, il croit
>   que sans elle rien n'est calculable. Le commentaire d'auteur au-dessus du
>   choix l'avouait déjà (« id le plus proche de l'inventaire, pas une redite
>   littérale de sa description »).
>
> **Cette notion a un `spec.md`** (`content/pc/rlc-serie/spec.md`, inventaire §1,
> 9 ids). Les deux ids neufs ci-dessous doivent y être **reportés dans le même
> passage** : un id qui vit dans `items.yaml` mais pas dans le spec est un
> registre à deux vérités.
>
> **Exécution :** `docs/audits/dette-examen/vague-c-retag.md`.

---

## 1. Les deux ids neufs

Convention de comptage (`web/scripts/lib/couverture-compte.mjs`) : **≥ 3 ITEMS
du banc portant l'id sur au moins un distracteur** ; un item compte une fois ;
`also_reveals` **ne compte pas** (la chaîne ne lit que `misconception:`).

```yaml
  - id: mc.physics.rlc_serie.phase-initiale-mal-determinee
    label: "« $\\cos\\varphi$ donne $\\varphi$ » : on s'arrête à $\\pm\\varphi$, ou on choisit la branche au hasard"
    description: "L'élève détermine la phase initiale à partir de la seule valeur initiale ($i(0)$ ou $u_C(0)$), sans utiliser la seconde condition — le SIGNE de la dérivée à $t=0$ : soit il laisse le résultat ambigu ($\\pm\\varphi$), soit il tranche du mauvais côté, soit il réclame $R$ pour conclure."
    contradicts_principle: "Une sinusoïde a DEUX constantes à fixer, donc il faut DEUX conditions initiales. $\\cos\\varphi = i(0)/I_m$ laisse deux branches ; c'est le signe de $\\frac{di}{dt}(0) = -I_m\\omega_0\\sin\\varphi$ qui fixe le signe de $\\sin\\varphi$ et lève l'ambiguïté. Le geste est le même que pour l'oscillateur mécanique. $R$ n'entre ni dans l'une ni dans l'autre condition : en régime idéal, il est négligé par construction."

  - id: mc.physics.rlc_serie.sans-solution-rien-de-calculable
    label: "« On n'a pas résolu l'équation amortie, donc on ne peut rien calculer » (sauf aux maxima)"
    description: "L'élève prend la LIMITE du programme (en régime amorti, on établit l'équation différentielle sans la résoudre) pour une interdiction de calculer : il refuse d'exploiter une lecture d'oscillogramme à un instant quelconque, ou ne s'autorise que les instants remarquables où $i = 0$."
    contradicts_principle: "Ne pas connaître $q(t)$ n'enlève rien aux relations INSTANTANÉES, qui sont vraies à chaque instant sans aucune solution : $i = u_R/R$ (loi d'Ohm), $q = Cu_C$, $E_t = \\frac{1}{2}Cu_C^2 + \\frac{1}{2}Li^2$, et $\\frac{dE_t}{dt} = -Ri^2$. L'astuce « $i=0$ à un maximum de $u_C$ » est une commodité, pas une condition : à un instant quelconque, on lit $u_C$ et $u_R$ sur les deux voies, on en déduit $i$, et le bilan se ferme."
```

**Pourquoi `phase-initiale-mal-determinee` est un vrai modèle faux et pas un
dérapage de calcul.** L'élève qui s'arrête à $\pm\pi/3$ croit qu'une valeur
initiale suffit à fixer une sinusoïde. C'est une croyance sur le nombre de
conditions qu'une solution à deux constantes exige — et elle se transporte
telle quelle en mécanique (systemes-oscillants). Remédiation : compter les
constantes, puis compter les conditions.

**Pourquoi `sans-solution-rien-de-calculable` méritait d'exister.** C'est la
misconception **fabriquée par la limite du cadre elle-même** : on enseigne
« amorti → on établit, on ne résout pas », et une partie des élèves en conclut
« donc on ne calcule rien ». Elle est exactement à l'opposé de
`cas-amorti-solution-sinusoidale-fermee` (qui, lui, sur-généralise la forme
fermée) — les deux sont les deux bords du même passage étroit, et un élève qui
tombe d'un côté n'a pas le problème de celui qui tombe de l'autre.

---

## 2. Ce qui bouge

| Item | Choix | Ancien id | Nouvel id |
|---|---|---|---|
| RLC-M7-5 | C | energie-consommee-non-conservee | sans-solution-rien-de-calculable |
| RLC-M7-5 | D | cas-amorti-solution-sinusoidale-fermee | sans-solution-rien-de-calculable |
| RLC-M7-6 | B | confusion-roles-C-L-stockage | phase-initiale-mal-determinee |
| RLC-M7-6 | D | plus-de-R-oscille-plus-vite (+ `also_reveals: [resistance-entretient-oscillations]`) | phase-initiale-mal-determinee, `also_reveals: []` |

Quatre distracteurs, deux items. **À supprimer en même temps** : les trois
commentaires d'auteur « M7 reuse / M3 reuse / M6 reuse » qui justifiaient le
rattachement approximatif (lignes juste au-dessus de RLC-M7-5 D, RLC-M7-6 B et
RLC-M7-6 D). Un tag qui a besoin d'un commentaire pour se défendre est un tag
faux — c'est le signal que la relecture a suivi.

**Un feedback à réécrire** : RLC-M7-6 D, qui plaide aujourd'hui l'amortissement
(« Le circuit est idéal ($R\approx0$) : un courant qui décroît à un instant
donné fait partie de l'oscillation normale, pas d'un amortissement »). La
première moitié est juste mais hors sujet ; il faut nommer l'erreur réellement
commise — la mauvaise branche. Texte proposé dans le plan §4.

**Les deux feedbacks de RLC-M7-5 (C et D) restent** : ils argumentent déjà la
bonne chose (« la relation $i = u_R/R$ reste valable à tout instant, y compris
en régime amorti », « $u_C(t)$ et $u_R(t)$ sont mesurés directement à l'instant
$t$ »). Seul le tag change.

## 3. Ce qui reste, et pourquoi

| Item / choix | Reste sur | Raison |
|---|---|---|
| RLC-M7-6 C (« Indéterminée sans la valeur de $R$ ») | T0-depend-de-R | Le libellé de l'id parle de $T_0$, mais son principe contredit — « $R$ ne gouverne que l'amortissement, il n'entre ni dans la période ni dans les conditions initiales » — est exactement ce que ce distracteur viole. C'est le réflexe « $R$ s'invite dans une formule qui n'en a pas besoin », pas une erreur de phase. Garde l'item dans l'id (compte inchangé). Si un futur passage donne 3 porteurs à un id « R s'invite partout », ce choix y migrera. |
| RLC-M7-5 B | confusion-roles-C-L-stockage | Inversion directe des rôles $C$/$L$ dans les deux formules d'énergie : l'id, mot pour mot. |
| RLC-M2-4 B, C, D ; RLC-M2-5 B, C, D ; RLC-M6-4 B, C, D | ids existants | Relus un par un : attributions justes (énergie consommée en bloc, rôles inversés, cosinus idéal dans l'équation amortie, « $R$ fournit de l'énergie »). Rien à bouger. |
| RLC-M5-2 (« impossible de déterminer $T$ car l'amplitude décroît ») | pseudo-periode-egale-periode-propre | Sa description dit explicitement « soit nie toute notion de période sur une trace amortie ». Ce refus-là est bien nommé — à distinguer du refus de calculer *sans la solution*, qui est l'id neuf. |

## 4. Comptes (convention de la porte, items par id)

| id | avant | après re-tag | après M9/M10 |
|---|---|---|---|
| resistance-entretient-oscillations | 8 | 8 | **9** |
| energie-consommee-non-conservee | 10 | **9** | 9 |
| plus-de-R-oscille-plus-vite | 9 | **8** | 8 |
| T0-depend-de-R | 10 | 10 | **11** *(M9-1 D)* |
| pseudo-periode-egale-periode-propre | 6 | 6 | 6 |
| cas-amorti-solution-sinusoidale-fermee | 7 | **6** | **7** |
| confusion-roles-C-L-stockage | 14 | **13** | 13 |
| entretien-est-regime-force | 6 | 6 | 6 |
| confond-oscillation-avec-decharge-rc | 3 | 3 | **4** |
| **phase-initiale-mal-determinee** | — | *1 (M7-6)* | **3** (M7-6, M9-1, M9-2) |
| **sans-solution-rien-de-calculable** | — | *1 (M7-5)* | **3** (M7-5, M10-1, M10-2) |

`plancher` : **9 → 9 → 11**. Aucun id existant ne descend sous 3 ; le plus bas
(`confond-oscillation-avec-decharge-rc`, à 3) remonte même à 4 grâce à
RLC-M9-2 D.

**Conséquence de porte, non négociable :** `resume-couverture` est une porte
FRANCHE sur `floor_met` — un id DÉCLARÉ sous le plancher rend `floor_met: true`
mensonger. Les deux ids neufs ne se déclarent donc **que dans le même commit que
leurs items** (RLC-M9-1/M9-2 et RLC-M10-1/M10-2). Et `total_items` passe de 41 à
45 (porte FRANCHE aussi).

**Piège local :** la ligne de base de cette notion est `sansTag: 23` — le
cliquet interdit de la faire monter. Les quatre items neufs doivent donc porter
un `misconception:` réel sur **chacun** de leurs distracteurs (jamais `null`,
jamais de champ absent).

## 5. Quatre items à écrire (spécifiés dans le plan §5)

Aucun des deux ids neufs ne peut atteindre 3 avec le banc actuel : un seul item
existant porte honnêtement chacun. On n'étire pas les tags pour atteindre le
plancher — on écrit les quatre items manquants : **RLC-M9-1** (conceptuel : quelle
seconde condition lève l'ambiguïté), **RLC-M9-2** (numérique, sur $u_C$ au lieu
de $i$), **RLC-M10-1** (conceptuel : quelles relations restent utilisables en
régime amorti), **RLC-M10-2** (lecture d'oscillogramme : $dE_t/dt$ à un instant
quelconque).

**Convention d'id d'item.** Les familles `M1…M8` de ce fichier suivent l'ordre
de l'inventaire ; les deux ids neufs prennent donc `M9` et `M10`. **RLC-M7-6 et
RLC-M7-5 ne sont PAS renommés** malgré leur nouveau tag : un id d'item est cité
ailleurs (audits, données apprenant) et le renommer casserait ces références —
la porte `validate-content` surveille d'ailleurs l'unicité des ids d'item.

**Mix d'habiletés.** Le résumé actuel est à 36,6 / 41,5 / 22,0 (Utilisation /
Résolution / Application expérimentale) pour une cible ~50/35/15. Les quatre
items neufs sont donc dosés **2 utilisation, 1 résolution, 1 application
expérimentale** → 37,8 / 40,0 / 22,2 : le déséquilibre reste (il est structurel,
la dette d'examen étant par nature résolution-lourde) mais ne s'aggrave pas.
À re-signaler au garde éditorial, pas à masquer.

## 6. Registre Box B pour les ids neufs

| id neuf | rompu en prose @ barreau | ou délégué aux items |
|---|---|---|
| phase-initiale-mal-determinee | **R2** `lesson.md` L170 : « on détermine $\varphi$ à partir de $i(0)$ et du signe de $\frac{di}{dt}$ à cet instant, qui lève l'ambiguïté entre les deux valeurs de $\varphi$ compatibles avec la même valeur de $\cos$ ». Le fait est enseigné, **mais la rupture n'est pas STAGED** : aucun pari, aucune mise en scène du modèle faux. | **Rupture déléguée** aux items (RLC-M7-6, M9-1, M9-2). **Prose recommandée (dette légère, non bloquante) :** en R2, un « arrête-toi » de trois lignes — « combien de constantes dans un cosinus ? combien de conditions t'a-t-on données ? » — sur le patron de l'exemplaire R1 L104-108. |
| sans-solution-rien-de-calculable | **R6** `lesson.md` L472 : « si les deux instants choisis ne sont **pas** des maxima de $u_C$, l'astuce “$i = 0$” ne s'applique plus : il faut revenir à $E_t = \frac12Cu_C^2 + \frac12Li^2$, avec $i$ obtenu à partir de la tension aux bornes de $R$ lue sur l'oscillogramme, $i = u_R/R$ ». Le fait est là, en toutes lettres ; la rupture, non. | **Rupture déléguée** aux items (RLC-M7-5, M10-1, M10-2). **Prose recommandée :** en R5, juste après la règle « idéal → on résout ; amorti → on établit et on s'arrête », une phrase qui coupe la sur-lecture : « s'arrêter là ne veut pas dire qu'on ne peut plus rien calculer — toutes les relations instantanées restent vraies ». C'est le barreau qui FABRIQUE la misconception ; c'est là qu'elle doit être désamorcée. |

## 7. Délégations — geste testé par un item, non enseigné en prose

| Geste | Item | Enseigné ? | Verdict |
|---|---|---|---|
| Déterminer $\varphi$ à partir de $i(0)$ **et** du signe de $di/dt(0)$ | RLC-M7-6 | **Énoncé** (R2 L170), jamais travaillé sur un exemple numérique. | **Délégation acceptable**, et c'est même le bon partage : une détermination de phase s'apprend en la faisant. À écrire dans le spec (§1/§3) comme délégation assumée, pas comme oubli. |
| Bilan énergétique instantané à un instant non remarquable ($i = u_R/R$ puis $E_t$) | RLC-M7-5, RLC-M10-2 | **Oui**, R6 L472 (la relation) — mais aucun exemple numérique à un instant non remarquable : R6 ne chiffre que le cas « deux maxima ». | **Délégation acceptable** (la relation est donnée, l'item l'applique), avec la prose recommandée du §6 pour couper la sur-lecture. |

## 8. Dette ouverte (pour le propriétaire)

1. ~~Reporter les deux ids neufs dans `spec.md` §1~~ — **fait** (2026-09-27) :
   M9 et M10 dans `spec.md` §1, et le onzième id plus ancien
   (`confond-oscillation-avec-decharge-rc`, les items d'accroche R0) reporté en
   M11 ; le tableau de rampe (§2 du spec) nomme M9 en R2, M10 en R5–R6, M11 en
   R0. Le spec et `items.yaml` déclarent désormais le même inventaire.
2. **Question de fond, pour le jugement du propriétaire :**
   `phase-initiale-mal-determinee` est-elle une misconception de RLC, ou de
   `systemes-oscillants` (où le même geste se fait pour la première fois) ? Les
   ids sont per-notion, donc la déclarer ici est légal — mais si l'élève la
   porte depuis la mécanique, la remédiation devrait pointer là-bas.
3. **Le mix d'habiletés** s'éloigne durablement de 50/35/15 (voir §5) : décision
   éditoriale, déjà signalée par la vague 3, non résolue.
