# dipole-rl — registre des misconceptions (Box B, NOTION-TEMPLATE-V2 §B)

> **Statut : v1, 2026-09-27.** Écrit par pedagogy-architect après la relecture
> pédagogique de la vague 1 sur la dette d'examen (vague C). Constat : les trois
> distracteurs de RL-27 (rapport inversé $72/18$, multiplication au lieu de la
> division, ordonnée à l'origine lue comme $1/L$) portent tous
> `tau-mauvais-groupement`, et c'est aussi le `primary_misconception` de l'item
> — alors que RL-27 ne demande jamais $\tau$. Même chose pour RL-24 D (rapport
> de fractions inversé) et RL-25 D (signe faux en isolant $r$). Le modèle
> apprenant dirait à l'élève « tu ne sais pas ce qu'est $\tau = L/R$ » alors
> qu'il a écrit la bonne relation et l'a mal retournée.
>
> **Cette notion n'a pas de `spec.md`.** Ce fichier est donc le registre de
> référence (Box B) pour l'id neuf et pour les délégations prose → items. Un
> `spec.md` complet reste une dette ouverte, signalée au propriétaire.
>
> **Exécution :** `docs/audits/dette-examen/vague-c-retag.md`.

---

## 1. L'id neuf

Convention de comptage (la seule qui compte pour la chaîne et la porte,
`web/scripts/lib/couverture-compte.mjs`) : **≥ 3 ITEMS du banc portant l'id sur
au moins un distracteur** ; un item compte une fois.

```yaml
  - id: mc.physics.pc_dipole_rl.isolement-grandeur-non-controle
    label: "« La relation est écrite, il ne reste qu'à retourner les nombres » (rapport inversé, facteur oublié, signe faux)"
    description: "Erreur de CONDUITE du calcul, pas modèle physique faux : l'élève écrit la bonne relation (le palier $R_0E/(R_0+r)$, $I_p = E/(R_0+r)$, l'ordonnée à l'origine $E/L$) puis l'isole de travers — il inverse le rapport, ajoute au lieu de retrancher, ou laisse tomber le facteur qui multiplie le coefficient lu."
    contradicts_principle: "Isoler une grandeur se contrôle par deux réflexes indépendants du calcul : l'HOMOGÉNÉITÉ ($H/\\Omega = s$, $V/A = \\Omega$, $V/(A\\,s^{-1}) = H$) et l'ORDRE DE GRANDEUR PHYSIQUE (une tension aux bornes d'une partie de la maille ne dépasse pas $E$ ; la résistance interne d'une bobine ne dépasse pas la résistance totale de la maille ; une bobine de laboratoire ne fait pas $1300\\ \\text{H}$). Un résultat qui viole l'un des deux est faux avant toute relecture du calcul."
```

**Pourquoi un seul id ici, alors que rc-charge en reçoit quatre.** Les trois
manifestations de dipole-rl (rapport inversé, facteur oublié, signe faux)
partagent la MÊME remédiation : écrire la relation, isoler, puis passer les deux
contrôles. Les séparer produirait trois ids dont aucun n'atteindrait le
plancher, et n'apprendrait rien de plus à l'élève. La cousine de cet id chez
rc-charge est `lecture-graphique-mal-exploitee` (même geste, restreint à
l'exploitation d'un graphe) : les ids sont per-notion par convention, la parenté
est notée ici exprès.

---

## 2. Ce qui bouge

| Item | Choix | Ancien id | Nouvel id |
|---|---|---|---|
| RL-24 | D | tau-mauvais-groupement | isolement-grandeur-non-controle |
| RL-25 | D | tau-mauvais-groupement | isolement-grandeur-non-controle |
| RL-27 | B, C, D | tau-mauvais-groupement | isolement-grandeur-non-controle |
| RL-27 | *primary* | tau-mauvais-groupement | isolement-grandeur-non-controle |

Cinq distracteurs, trois items. **Aucun feedback n'a besoin d'être réécrit** :
ils plaidaient déjà exactement le bon contrôle (« $\frac{R_0+r}{R_0} > 1$, donc
cette valeur dépasse $E$ — impossible », « une inductance de cet ordre de
grandeur est physiquement absurde pour une bobine de laboratoire », « $E/I_p$
est la résistance TOTALE ; l'ajouter donne une bobine plus résistante que la
maille entière »). C'est le tag qui était faux, pas l'explication — et c'est
précisément ce qui rendait le défaut invisible.

## 3. Ce qui reste, et pourquoi

| Item / choix | Reste sur | Raison |
|---|---|---|
| RL-3 B, C, D | tau-mauvais-groupement | Cas canonique : $R/L$, $RC$, unité en henry. |
| RL-16 C | tau-mauvais-groupement | Cas limite, examiné : c'est bien un rapport inversé ($R/\tau$ au lieu de $\tau R$), mais son feedback le formule comme le groupement canonique — « comme si $\tau = R/L$ au lieu de $\tau = L/R$ » — et le contrôle d'ordre de grandeur y est déjà. Reste donc sur l'id, qu'il aide à tenir à 5 items. |
| RL-18 B, D ; RL-20 C, D ; RL-22 B, D | tau-mauvais-groupement / imax-etablissement | Dépendance de $\tau$ en $L$ et en $R$ (sens de variation), et rôles distincts « ce qui fixe la valeur finale » / « ce qui fixe la durée ». Modèle, pas arithmétique. |
| RL-24 B | oubli-resistance-interne | $A = E$ revient à poser $r = 0$ : l'id déclaré, mot pour mot. Garde l'item dans l'id, et reste son `primary`. |
| RL-24 C | bobine-nature-erronee | Confond la part de $E$ qui revient à la bobine et celle qui revient au résistor. |
| RL-25 B | oubli-resistance-interne | $r = E/I_p$ sans retrancher $R_0$ : c'est le piège nommé en prose (L194). Reste `primary`. |
| RL-25 C | bobine-nature-erronee | « une bobine réelle a $r = 0$ ». |
| RL-26 B, C, D | courant-saute / imax / bobine-nature | Continuité du courant à l'ouverture, rôle de $L$ : modèles. Attributions justes. |

## 4. Comptes (convention de la porte, items par id)

| id | avant | après re-tag |
|---|---|---|
| courant-saute-instantane | 5 | 5 |
| bobine-nature-erronee | 9 | 9 |
| imax-etablissement-mal-compris | 11 | 11 |
| oubli-resistance-interne | 6 | 6 |
| tau-mauvais-groupement | 8 | **5** |
| lecture-tau-erronee | 4 | 4 |
| energie-lineaire-en-i | 4 | 4 |
| **isolement-grandeur-non-controle** | — | **3** (RL-24, RL-25, RL-27) |

`plancher` : **7 → 8**. Aucun id existant ne descend sous 3. **Aucun item neuf
n'est nécessaire dans cette notion** : l'id honnête atteint le plancher avec les
items existants, sans forcer un seul tag.

## 5. Registre Box B pour l'id neuf

| id neuf | rompu en prose @ barreau | ou délégué |
|---|---|---|
| isolement-grandeur-non-controle | **R2** `lesson.md` L192-194 : « *Le piège nommé :* écrire $r = E/I_p$ tout court en oubliant de retrancher $R_0$ — cette valeur brute est la résistance TOTALE » ; **R3** L214 (contrôle d'homogénéité de $L/R$, mené explicitement) ; **R4** L263 : « *Le piège nommé de cette lecture :* prendre la pente pour $\tau$… le contrôle qui tranche » ; **R2** L116 : « ne cherche pas à deviner $A$ à l'oreille, identifie-le en comparant terme à terme ». | — (rupture en prose, à trois endroits, avec le contrôle donné à chaque fois) |

## 6. Délégations — geste testé par un item, non enseigné en prose

**Aucune.** Vérifié ligne à ligne : les quatre gestes de la vague C sont tous
démontrés dans `lesson.md`.

| Geste | Item | Prose |
|---|---|---|
| ED en $u_{R_0}$, forme $\tau\,du_{R_0}/dt + u_{R_0} = A$, identifier $A$ | RL-24 | **R2 L98-116**, changement de variable en trois gestes + $A = R_0E/(R_0+r)$ nommé comme le palier. |
| $r = E/I_p - R_0$ à partir du palier | RL-25 | **R3 L188-194**, avec le piège nommé. |
| Rupture : $u$ aux bornes de la maille de secours à $t=0^+$ par continuité | RL-26 | **R5 L281-313**, avec $R' = R_d + r$ et $\tau' = L/R'$. |
| Droite $di/dt = f(i)$, $L$ depuis l'ordonnée à l'origine $E/L$ | RL-27 | **R4 L243-269**, les trois éléments remarquables + l'exemple numérique. |

## 7. Dette ouverte (pour le propriétaire)

1. **Pas de `spec.md`** pour dipole-rl. Ce registre ne couvre que Box B pour
   l'id neuf et les délégations.
2. **Registre Box B incomplet** pour les 7 ids préexistants (citation
   ligne à ligne de leur rupture). À faire avec le `spec.md`.
3. **Pas d'id « préfixe/unité non converti » ici**, alors que la notion
   manipule des mA, des mH et des µs. Raison : il n'atteindrait pas 3 items sans
   en écrire deux, et la relecture de la vague 1 ne l'a pas signalé. Décision
   écrite plutôt que silencieuse — à armer si un futur passage d'items le
   nourrit (l'équivalent existe chez rc-charge :
   `mc.physics.pc_rc_charge.prefixe-unite-non-converti`).
