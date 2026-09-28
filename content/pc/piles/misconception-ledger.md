# piles — registre des misconceptions (Box B, NOTION-TEMPLATE-V2 §B)

> **Statut : v1, 2026-09-27.** Écrit par pedagogy-architect après la relecture
> pédagogique de la vague 1 sur la dette d'examen (vague C). Deux constats :
>
> 1. **Une délégation non écrite.** PILES-28 teste la lecture d'un ampèremètre
>    par sa borne COM (affichage négatif ⇒ le courant entre par COM) ; la leçon
>    n'enseigne que la version **voltmètre à vide** (R5 L181-187). La délégation
>    est défendable — l'énoncé de l'item DONNE la convention — mais elle doit
>    être écrite quelque part, et cette notion n'a pas de `spec.md`. C'est ce
>    fichier.
> 2. **Une attribution fausse, du même genre que celles trouvées ailleurs.**
>    PILES-26 C et D (« la pile durerait autant que sa lame de cuivre ») portent
>    `role-constituants`, dont la description parle du fil, du pont salin, de
>    l'électrode et de la disposition. L'élève n'a pas confondu le rôle du pont
>    salin : il a choisi le mauvais réservoir comme réactif limitant. Le modèle
>    apprenant lui dirait « tu ne comprends pas à quoi sert le pont salin »,
>    ce qui est faux.
>
> **À la décharge de la vague C :** `calcul-quantite-electricite` est, lui, un id
> déjà **honnêtement procédural** — sa description nomme explicitement les unités
> non converties (mA, h) et le saut de stœchiométrie. PILES-25 (les trois
> distracteurs : ×2 oublié, ÷2 au lieu de ×2, mA non converti) est donc
> correctement étiqueté, et sert de patron à ce que les autres notions viennent
> seulement d'obtenir.
>
> **Exécution :** `docs/audits/dette-examen/vague-c-retag.md`.

---

## 1. L'id neuf

Convention de comptage (`web/scripts/lib/couverture-compte.mjs`) : **≥ 3 ITEMS
du banc portant l'id sur au moins un distracteur** ; un item compte une fois.

```yaml
  - id: mc.physics.pc_piles.reactif-limitant-mal-identifie
    label: "« Le réactif limitant, c'est celui qu'on voit » (la lame, le plus gros, ou les deux additionnés)"
    description: "L'élève calcule la durée de vie ou la quantité d'électricité à partir du réactif en EXCÈS (souvent l'électrode massive, la plus visible), ou additionne les deux réservoirs, au lieu de comparer les deux quantités d'électrons disponibles et de retenir la plus petite."
    contradicts_principle: "Une pile s'arrête au PREMIER réactif épuisé. Le geste est une comparaison, toujours la même : pour chaque réactif, on calcule les moles d'électrons qu'il peut échanger — $n(e^-) = 2\\,n(Zn)$ à l'anode, $n(e^-) = 2\\,n(Cu^{2+})$ ou $n(e^-) = n(Ag^{+})$ à la cathode — et le PLUS PETIT des deux fixe $Q_{max} = n(e^-)_{max}F$. Les deux réservoirs ne s'additionnent jamais : ils ne se consomment pas l'un après l'autre, ils se consomment ensemble."
```

**Pourquoi un id à part et pas `pile-source-illimitee`.** L'élève de PILES-26
C/D admet parfaitement que la pile s'épuise : il se trompe de réservoir. Le
mettre dans `pile-source-illimitee` (« la pile ne s'use pas ») serait la même
faute qu'on vient de corriger ailleurs — dire à l'élève qu'il croit quelque
chose qu'il ne croit pas. Et la remédiation est différente : *comparer les deux
réservoirs et prendre le plus petit*, un geste, pas une conviction.

---

## 2. Ce qui bouge

| Item | Choix | Ancien id | Nouvel id |
|---|---|---|---|
| PILES-26 | C | role-constituants | reactif-limitant-mal-identifie |
| PILES-26 | D | role-constituants | reactif-limitant-mal-identifie |

Deux distracteurs, un item. **Aucun feedback à réécrire** : les deux plaidaient
déjà la bonne chose (« la lame ne limite pas ici : les ions $Ag^{+}$ ne
fournissent que $5{,}0\times10^{-3}$ mol d'électrons », « une pile s'arrête au
PREMIER réactif épuisé »). Le tag était le seul mensonge.

Les items de cette notion ne portent pas de champ `primary_misconception` : rien
d'autre à toucher.

## 3. Ce qui reste, et pourquoi

| Item / choix | Reste sur | Raison |
|---|---|---|
| PILES-25 B, C, D | calcul-quantite-electricite | ×2 stœchiométrique oublié, ÷2 au lieu de ×2, mA non converti — la description de l'id nomme ces trois-là explicitement. Attribution juste : c'est déjà un id procédural honnête. |
| PILES-26 B | calcul-quantite-electricite | $Ag^{+} + e^- \to Ag$ : un électron, pas deux. Stœchiométrie — l'id, mot pour mot. Garde l'item dans l'id. |
| PILES-27 B, D | calcul-quantite-electricite | Ions formés comptés sans les initiaux ; $n(e^-)$ pris pour $n(Zn^{2+})$. Attributions justes. |
| PILES-27 C | anode-cathode-polarite | Croit que $[Zn^{2+}]$ diminue : c'est l'oxydation/réduction inversée aux électrodes. Juste. |
| PILES-28 B, C, D | courant-sens-electrons / anode-cathode-polarite | B : électrons dans le sens du courant (l'id canonique) ; C et D : le signe affiché pris pour la polarité de la borne. Attributions justes — l'item est bien un item de sens du courant et de polarité, pas un item d'instrumentation. |
| PILES-24 B, C, D | pile-source-illimitee | $Q_{totale}$ qui dépendrait du courant demandé : l'id, mot pour mot. |
| PILES-7, 10, 11, 12 | role-constituants | Fil, pont salin, électrode, disposition : le cœur déclaré de l'id, intact. |

## 4. Comptes (convention de la porte, items par id)

| id | avant | après re-tag | après PILES-29/30 |
|---|---|---|---|
| anode-cathode-polarite | 8 | 8 | 8 |
| courant-sens-electrons | 5 | 5 | 5 |
| pile-source-illimitee | 3 | 3 | **4** |
| qr-evolution-equilibre | 3 | 3 | 3 |
| calcul-quantite-electricite | 6 | 6 | **7** |
| expression-quotient-reaction | 4 | 4 | 4 |
| fem-mal-comprise | 3 | 3 | 3 |
| pile-nature-mal-comprise | 3 | 3 | 3 |
| role-constituants | 5 | **4** | 4 |
| **reactif-limitant-mal-identifie** | — | *1 (PILES-26)* | **3** (PILES-26, 29, 30) |

`plancher` : **9 → 9 → 10**. Aucun id existant ne descend sous 3 (le plus bas,
`role-constituants`, passe de 5 à 4).

**Conséquence de porte, non négociable :** `resume-couverture` est une porte
FRANCHE sur `floor_met` — un id DÉCLARÉ sous le plancher rend `floor_met: true`
mensonger. `reactif-limitant-mal-identifie` ne se déclare donc **que dans le même
commit que PILES-29 et PILES-30**, et `total_items` passe de 28 à 30 (porte
FRANCHE aussi). La ligne de base est `sansTag: 0` : chaque distracteur des items
neufs doit porter un id réel (jamais `null`).

## 5. Deux items à écrire (spécifiés dans le plan §5)

`reactif-limitant-mal-identifie` ne peut pas atteindre 3 avec le banc actuel :
un seul item (PILES-26) porte honnêtement l'erreur. On ne force pas le tag — on
écrit **PILES-29** (les deux réservoirs calculés et comparés, c'est la LAME qui
limite cette fois, l'inverse de PILES-26) et **PILES-30** (conceptuel : pourquoi
« il reste du zinc » ne dit rien de la durée).

## 6. Registre Box B pour l'id neuf

| id neuf | rompu en prose @ barreau | ou délégué aux items |
|---|---|---|
| reactif-limitant-mal-identifie | Partiellement : **R6** enseigne $Q = I\Delta t = n(e^-)F$ et l'usure, mais la comparaison des DEUX réservoirs (et le choix du plus petit) n'est pas mise en scène comme un piège. | **Rupture déléguée** aux items (PILES-26, 29, 30). **Prose recommandée (dette légère, non bloquante) :** en R6, après le calcul de $\Delta t_{max}$, trois lignes sur le patron « le piège nommé » : on calcule les électrons disponibles DES DEUX CÔTÉS, on prend le plus petit, et le contrôle qui tranche — « l'électrode massive est presque toujours en excès ; c'est la solution qui s'épuise ». |

## 7. Délégations — geste testé par un item, non enseigné en prose

| Geste | Item | Enseigné ? | Verdict |
|---|---|---|---|
| **Lecture d'un ampèremètre par sa borne COM** : un affichage négatif signifie que le courant entre par COM, donc qu'il vient de l'électrode reliée à COM — donc quelle électrode est le pôle $+$ | **PILES-28** | **Non.** La leçon fait dévier l'ampèremètre (R0 L21, R5 L153-171) mais n'exploite jamais le SIGNE affiché ; la seule mesure signée enseignée est celle du **voltmètre à vide** (R5 L181-187, $E = V_+ - V_-$). | **Délégation acceptable, et c'est écrit ici pour cette raison :** l'énoncé de PILES-28 **donne la convention instrumentale** en clair (« un ampèremètre affiche une valeur positive quand le courant entre par sa borne mA et ressort par COM »). L'item ne teste donc pas une convention non enseignée : il teste le modèle **enseigné** (courant de $+$ vers $-$ dans le circuit extérieur, électrons en sens inverse, R5 L153-155) appliqué à une donnée fournie. C'est de la reconnaissance en habillage inhabituel — exactement ce que la rampe doit produire en haut (VISION L76-82). **Prose recommandée (non bloquante) :** une phrase en R5, à côté du voltmètre — « un appareil branché à l'envers affiche la valeur négative : le signe dit par quelle borne le courant entre, il ne dit pas que la pile a changé de polarité ». |
| Réactif limitant identifié en comparant deux réservoirs | PILES-26, 29, 30 | Partiellement (voir §6). | Délégation acceptable + prose recommandée. |

## 8. Dette ouverte (pour le propriétaire)

1. **Pas de `spec.md`** pour piles. Ce registre couvre Box B pour l'id neuf et
   les délégations ; la rampe, le cadre et l'inventaire complet restent à écrire.
2. **Registre Box B incomplet** pour les 9 ids préexistants. À faire avec le
   `spec.md`.
3. **`qr-evolution-equilibre`, `fem-mal-comprise`, `pile-nature-mal-comprise`
   sont à exactement 3 items** : aucun re-tag futur ne peut leur retirer un item
   sans les faire tomber sous le plancher. À garder en tête avant tout nouveau
   passage de ré-étiquetage.
