# rc-charge — registre des misconceptions (Box B, NOTION-TEMPLATE-V2 §B)

> **Statut : v1, 2026-09-27.** Écrit par pedagogy-architect en réponse à la
> relecture pédagogique de la vague 1 sur la dette d'examen (vague C), qui a
> trouvé que `tau-mauvais-groupement` — déclaré étroitement au début de
> `items.yaml` (« Mauvaise expression/unité de τ ») — servait d'étiquette
> fourre-tout à des dérapages d'algèbre et d'arithmétique. Un élève qui inverse
> le signe d'un terme dans une équation différentielle ne « confond pas RC et
> R/C » : lui dire le contraire, c'est lui raconter quelque chose de faux sur
> son propre raisonnement.
>
> **Cette notion n'a pas de `spec.md`.** Ce fichier est donc, en attendant, le
> registre de référence (Box B) pour les misconceptions déclarées ici et pour
> les délégations prose → items. Un `spec.md` complet reste une dette ouverte,
> signalée au propriétaire.
>
> **Meta en anglais / français selon l'usage du dépôt ; toute chaîne vue par
> l'élève est en français.** Les blocs YAML ci-dessous sont à coller tels quels
> dans `items.yaml` (guillemets doubles, `\\` pour LaTeX).
>
> **Exécution :** `docs/audits/dette-examen/vague-c-retag.md` (plan mécanique,
> item par item, choix par choix). Ce fichier-ci porte le JUGEMENT ; le plan
> porte les gestes.

---

## 1. Les quatre ids neufs

Convention de comptage, la seule qui compte pour la chaîne et la porte :
`web/scripts/lib/couverture-compte.mjs` — **une misconception est évaluable
quand ≥ 3 ITEMS du banc portent son id sur au moins un distracteur** (un item
compte une fois, quel que soit le nombre de ses distracteurs qui la portent ;
la bonne réponse ne compte pas ; les checkpoints ne comptent pas).

```yaml
  - id: mc.physics.pc_rc_charge.ed-transformee-sans-verification
    label: "« L'équation différentielle se réécrit en manipulant les symboles : un signe, un facteur, ça se retrouve à l'œil »"
    description: "Erreur de CONDUITE du calcul, pas modèle physique faux : en passant de u_C à q ou à i, ou en injectant une solution candidate, l'élève inverse le signe d'un terme, laisse un facteur RC parasite, ou fabrique un coefficient qui ne vient d'aucune étape — et ne contrôle rien après coup."
    contradicts_principle: "Une transformation d'équation différentielle se contrôle par deux gestes indépendants du calcul lui-même : l'HOMOGÉNÉITÉ (dans $R\\,dq/dt + q/C = E$, les trois termes sont des volts) et la SUBSTITUTION de la solution connue (le résidu exponentiel doit s'annuler exactement). Un signe inversé fait diverger la solution au lieu de la faire décroître ; un facteur $RC$ de trop casse l'homogénéité. Aucun de ces deux contrôles ne demande de savoir d'avance la bonne réponse."

  - id: mc.physics.pc_rc_charge.lecture-graphique-mal-exploitee
    label: "« La valeur lue sur le graphe EST la réponse » (reprise telle quelle, rapport inversé, facteur oublié)"
    description: "Erreur de conduite de l'exploitation d'un graphe : l'élève lit correctement un nombre (asymptote, pente, ordonnée à l'origine, abscisse), puis l'utilise sans l'identifier au coefficient de la relation théorique — il le recopie comme s'il était la grandeur cherchée, inverse le rapport, ou laisse tomber le facteur ($I_0$, $E$) qui le multiplie."
    contradicts_principle: "Un graphe ne donne jamais directement l'inconnue : il donne un COEFFICIENT. Le geste est toujours le même — écrire la relation théorique de ce qui est tracé, identifier terme à terme avec la lecture, puis isoler. La pente d'une droite $u_C=(I_0/C)t$ vaut $I_0/C$ (pas $1/C$) ; celle d'une droite $du_C/dt = f(u_C)$ vaut $-1/\\tau$ (pas $\\tau$) ; une ordonnée lue en volts n'est pas une durée. Le contrôle qui tranche : les unités du rapport formé."

  - id: mc.physics.pc_rc_charge.prefixe-unite-non-converti
    label: "« µA, nF, kΩ, µs : on garde les chiffres tels qu'ils sont écrits »"
    description: "Erreur de conduite numérique : l'élève reporte la valeur lue sans convertir son préfixe (2,0 µA pris pour 2,0 A, 220 nF pour 220 F, 250 µs pour 250 s), ou décale d'un préfixe (nF pris pour µF). Le raisonnement physique est juste ; le résultat est faux d'un facteur $10^3$ ou $10^6$."
    contradicts_principle: "Les relations du dipôle RC ($\\tau = RC$, $q = Cu_C$, $E_C = \\frac{1}{2}Cu_C^2$) ne sont homogènes qu'en unités SI : ohm, farad, ampère, seconde, volt. Un préfixe n'est pas une décoration, c'est une puissance de dix qui entre dans le calcul. Le contrôle : convertir AVANT de calculer, puis vérifier l'ordre de grandeur du résultat (un condensateur de laboratoire ne fait pas $10^{-3}$ F, une constante de temps de circuit usuel n'est pas $10^3$ s)."

  - id: mc.physics.pc_rc_charge.charge-et-decharge-memes-lois
    label: "« La décharge, c'est la charge : mêmes expressions, même signe de courant, même seuil de 63 % »"
    description: "L'élève traite les deux régimes comme interchangeables : il garde $1-e^{-t/\\tau}$ pour une décroissance (ou $e^{-t/\\tau}$ pour une montée), laisse le courant positif à la décharge, ou applique les 63 % de la montée à une courbe qui descend."
    contradicts_principle: "Le seul élément commun est $\\tau = RC$. À la charge, $u_C = E(1-e^{-t/\\tau})$ part de 0 et monte : à $t=\\tau$, $63\\,\\%$ de $E$ sont ATTEINTS. À la décharge, $u_C = U_0e^{-t/\\tau}$ part de $U_0$ et descend : à $t=\\tau$, il RESTE $37\\,\\%$ de $U_0$. Et le courant change de signe (le condensateur se vide au lieu de se remplir), parce que le second membre de l'équation différentielle perd son $E$."
```

**Pourquoi quatre ids et pas un seul « erreur de calcul ».** Chacun a une
remédiation différente, et c'est le seul critère qui compte : *substituer et
vérifier* (id 1), *écrire la relation théorique de ce qui est tracé* (id 2),
*convertir avant de calculer* (id 3), *rejouer la maille sans générateur*
(id 4). Une étiquette unique « erreur de calcul » ne dirait à l'élève rien
qu'il ne sache déjà.

**Les trois premiers ids nomment une conduite de calcul, pas un modèle
physique faux ; c'est écrit dans leur `description`** pour qu'aucun aval ne les
sur-lise. Le quatrième (`charge-et-decharge-memes-lois`) est, lui, un vrai
modèle faux — et c'est précisément le modèle que la vague C avait dissous dans
`tau-mauvais-groupement`.

---

## 2. Ce qui bouge (détail exécutable : voir le plan)

| Item | Choix | Ancien id | Nouvel id |
|---|---|---|---|
| RC-13 | B | tau-mauvais-groupement | lecture-graphique-mal-exploitee |
| RC-14 | B | tau-mauvais-groupement | lecture-graphique-mal-exploitee |
| RC-16 | B, C | tau-mauvais-groupement | charge-et-decharge-memes-lois |
| RC-16 | *primary* | tau-mauvais-groupement | charge-et-decharge-memes-lois |
| RC-28 | B, C | tau-mauvais-groupement | ed-transformee-sans-verification |
| RC-28 | *primary* | charge-a-debit-constant | ed-transformee-sans-verification |
| RC-29 | C, D | tau-mauvais-groupement | ed-transformee-sans-verification |
| RC-29 | *primary* | tau-mauvais-groupement | ed-transformee-sans-verification |
| RC-30 | B, D | tau-mauvais-groupement | ed-transformee-sans-verification |
| RC-30 | *primary* | charge-a-debit-constant | ed-transformee-sans-verification |
| RC-31 | B, D | tau-mauvais-groupement | lecture-graphique-mal-exploitee |
| RC-31 | C | tau-mauvais-groupement | prefixe-unite-non-converti |
| RC-31 | *primary* | tau-mauvais-groupement | lecture-graphique-mal-exploitee |
| RC-32 | C | tau-mauvais-groupement | charge-et-decharge-memes-lois |
| RC-33 | C, D | tau-mauvais-groupement | lecture-graphique-mal-exploitee |
| RC-33 | *primary* | tau-mauvais-groupement | lecture-graphique-mal-exploitee |
| RC-34 | B | tau-mauvais-groupement | charge-et-decharge-memes-lois |
| RC-34 | *primary* | charge-a-debit-constant | charge-et-decharge-memes-lois |

Dix-sept distracteurs, dix items touchés. Aucun énoncé, aucune bonne réponse,
aucune `solution` n'est modifié : ce sont des changements d'étiquette — plus huit
feedbacks à retoucher (sept dont la dernière phrase plaidait son propre tag, et
RC-34 B qui nommait l'erreur d'algèbre sans nommer le modèle). Sept autres
distracteurs changent de tag sans retouche de texte : leur feedback plaidait déjà
la bonne chose. Détail dans le plan §2.2.

## 3. Ce qui reste, et pourquoi

| Item / choix | Reste sur | Raison |
|---|---|---|
| RC-4 B, C, D | tau-mauvais-groupement | Le cas canonique : $R/C$, $L/R$, « RC en farads ». C'est la description déclarée, mot pour mot. |
| RC-9 D | tau-mauvais-groupement | « Le temps de charge est toujours le même » est une affirmation sur ce dont $\tau$ DÉPEND, donc sur son expression — pas un dérapage de calcul. |
| RC-12 B, C, D | tau-mauvais-groupement | Rôles de $R$ et $C$ dans $\tau$ (qui règle la vitesse, qui règle l'asymptote) : modèle, pas arithmétique. |
| RC-13 C, D | tau-mauvais-groupement | C : croit la méthode des 63 % obligatoire ; D : facteur $1/2$ sur la propriété de la tangente. Tous deux portent sur la MÉTHODE de détermination de $\tau$, pas sur l'exploitation d'un nombre lu. Laissés en place faute d'un troisième porteur honnête ; à revoir si un futur id « méthode de lecture de τ » atteint 3 items. |
| RC-16 D | tau-mauvais-groupement | « τ différent à la charge et à la décharge » : dépendance de $\tau$ — reste le seul porteur de l'id dans cet item, ce qui est voulu. |
| RC-17, RC-19 D, RC-24 C, RC-25 C | tau-mauvais-groupement | Vraies erreurs sur le groupement $R$, $C$, $RC$ ($R=\tau\times C$, etc.). |
| RC-28 D | charge-a-debit-constant | Sans le terme $q/C$, $dq/dt = E/R$ constant : c'est littéralement le verre au robinet. Attribution juste. |
| RC-29 B | tau-mauvais-groupement | $\alpha = RC$ au lieu de $1/(RC)$ : c'est l'inverse de $\tau$, le groupement canonique. Garde l'item dans l'id. |
| RC-30 C | charge-a-debit-constant | $di/dt = 0$ : courant constant. Attribution juste. |
| RC-32 B, D | tau-instant-d-arret | « τ = fin du phénomène » et la demi-vie à 50 % : l'id déclaré les couvre. |
| RC-33 B | tau-mauvais-groupement | $C = \tau$ : une durée prise pour une capacité, il manque la division par $R$. La seule des trois branches de RC-33 qui soit vraiment un groupement de $\tau$ — et c'est elle qui garde l'item dans l'id. |
| RC-34 C, D | charge-a-debit-constant / tau-instant-d-arret | C : $t_S \propto U_S$ (montée linéaire) ; D : $\tau$ comme réponse universelle au « quand ». Attributions justes. |

## 4. Comptes (convention de la porte, items par id)

| id | avant | après re-tag | après RC-35/36 |
|---|---|---|---|
| uc-saute-instantanement | 7 | 7 | 7 |
| charge-a-debit-constant | 9 | 9 | 9 |
| courant-part-de-zero | 4 | 4 | 4 |
| tau-mauvais-groupement | 17 | **11** | 12 *(RC-35 D le renourrit)* |
| tau-instant-d-arret | 9 | 9 | 9 |
| condensateur-conduit-en-permanent | 9 | 9 | 9 |
| energie-lineaire-en-u | 3 | 3 | **4** |
| uc-depasse-E | 8 | 8 | 8 |
| **ed-transformee-sans-verification** | — | **3** (RC-28, 29, 30) | 3 |
| **lecture-graphique-mal-exploitee** | — | **4** (RC-13, 14, 31, 33) | 4 |
| **charge-et-decharge-memes-lois** | — | **3** (RC-16, 32, 34) | 3 |
| **prefixe-unite-non-converti** | — | *1 (RC-31)* | **3** (RC-31, 35, 36) |

`plancher` (ids ≥ 3) : **8 → 11 → 12**. Aucun id existant ne descend sous 3 ;
le cliquet `couverture-diagnostique` ne peut donc que monter.

**Conséquence de porte, non négociable :** `resume-couverture` est une porte
FRANCHE sur `floor_met` — un id DÉCLARÉ sous le plancher rend `floor_met: true`
mensonger. Donc `prefixe-unite-non-converti` ne se déclare **que dans le même
commit que RC-35 et RC-36**. Les trois autres ids atteignent 3 avec les items
existants et peuvent être déclarés dès le commit de re-tag.

## 5. Deux items à écrire (spécifiés dans le plan §5)

`prefixe-unite-non-converti` ne peut pas atteindre 3 avec le banc actuel : un
seul distracteur du banc (RC-31 C) est honnêtement une erreur de préfixe. On ne
force pas le tag pour atteindre le plancher — on écrit les deux items qui
manquent : **RC-35** (τ à partir de $R$ en kΩ et $C$ en nF) et **RC-36**
($E_C$ avec $C$ en nF, qui renforce au passage `energie-lineaire-en-u` de 3 à
4). Spécifications complètes dans le plan.

## 6. Registre Box B pour les ids neufs (rupture en prose OU délégation)

| id neuf | rompu en prose @ barreau | ou délégué aux items |
|---|---|---|
| ed-transformee-sans-verification | **R2**, `lesson.md` L126-160 : « deviner la forme de la solution… puis vérifier qu'elle marche vraiment » — la vérification-contrôle est enseignée et jouée ; R1 L95-105 enseigne la dérivation de la maille pour $i$ et $u_R$ | Variante en $q$ : déléguée (RC-28) — voir §7 |
| lecture-graphique-mal-exploitee | **R1** L59 (« Le piège nommé : inverser le rapport… le contrôle qui tranche : les unités ») et **R3** L307 (« prendre la pente pour $\tau$ au lieu de $-1/\tau$ ») : le piège est nommé ET le contrôle donné | — |
| charge-et-decharge-memes-lois | **R4** L363-379 (équation de la décharge, courant négatif, même $\tau$) et L399 (« sur une courbe décroissante, $\tau$ se lit où il RESTE 37 % — pas 63 %, qui serait la part déjà perdue ») | — |
| prefixe-unite-non-converti | *non rompu* : la prose convertit correctement dans chaque exemple, mais ne nomme jamais le préfixe comme piège | **Délégué** aux items RC-31 C, RC-35, RC-36. Acceptable : un préfixe oublié ne se corrige pas en le lisant, il se corrige en se faisant prendre. **Prose recommandée (dette légère, non bloquante) :** une phrase de la forme « le piège nommé » en R3, après l'exemple numérique : convertir en unités SI avant de calculer, puis contrôler l'ordre de grandeur. |

## 7. Délégations — geste testé par un item, non enseigné en prose

| Geste | Item | Enseigné ? | Verdict |
|---|---|---|---|
| Équation différentielle en **q(t)** ($R\,dq/dt + q/C = E$) | RC-28 | **Non.** La prose établit l'ED en $u_C$ (R1 L75-91) puis, par dérivation de la maille, celles en $i$ et $u_R$ (L95-105). La variante en $q$ n'y est pas ; $q = Cu_C$ est rappelé L35 et $q(t) = CE(1-e^{-t/\tau})$ donné L219. | **Délégation acceptable.** Le geste demandé est une substitution unique ($u_C = q/C$) dans une équation que l'énoncé de RC-28 REDONNE, avec la relation $q = Cu_C$ fournie : l'item est autoportant, et la prose enseigne explicitement le changement de variable sur deux autres variantes. **Prose recommandée (non bloquante) :** une ligne en R1, à la suite des variantes $i$/$u_R$ — « et si le sujet demande l'équation en $q$, c'est la même substitution : $u_C = q/C$, le facteur $C$ se simplifie, il reste $R\,dq/dt + q/C = E$ ». |
| Identification de $A$ et $\alpha$ dans une solution candidate $A(1-e^{-\alpha t})$ | RC-29 | **En substance.** R2 (L126-160) pose une solution et la vérifie, et dit que « la vérification va nous imposer la valeur de $\tau$ ». La notation d'examen ($A$, $\alpha$ comme constantes à déterminer) n'apparaît pas. | **Délégation acceptable** (variante de notation d'un geste enseigné, et RC-29 donne l'expression candidate dans son énoncé). |
| Charge à **courant constant** ($u_C$ droite, $C = I_0/$pente) | RC-31 | **Oui**, R1 L45-59, avec le piège du rapport inversé nommé et le contrôle par les unités. | Pas une délégation. |
| Droite $du_C/dt = f(u_C)$ | RC-33 | **Oui**, R3 L295-317. | Pas une délégation. |
| Temps de seuil par inversion logarithmique | RC-34 | **Oui**, R3 L253. | Pas une délégation. |
| $\tau$ lu sur une courbe DÉCROISSANTE, valeur réelle à $t=\tau$ (37 %) | RC-32 | **Oui**, R4 L363-379 + L399. | Pas une délégation. |

## 8. Dette ouverte (pour le propriétaire)

1. **Pas de `spec.md`** pour rc-charge : ce registre couvre Box B pour les ids
   neufs et les délégations, pas la rampe ni le cadre. À écrire.
2. **Registre Box B incomplet** pour les 8 ids préexistants (rupture en prose
   non citée ligne à ligne). À compléter avec le `spec.md`.
3. **RC-13 C/D** restent sur `tau-mauvais-groupement` alors qu'ils portent sur
   la MÉTHODE de lecture de $\tau$ (tangente, 63 %). Un id « méthode de
   détermination de τ mal comprise » serait plus honnête, mais il n'atteindrait
   pas 3 items sans en écrire deux de plus. Décision différée, pas dissimulée.
