# Probabilités conditionnelles

> **Notion :** Probabilités conditionnelles — SM · 2ème Bac
> **Skill :** `sma_prob_conditionnelle` (code proposé — à confirmer par supabase-architect)

---

## R0 — Le déclencheur : une question qui va te surprendre

Voici une situation réelle. Prends le temps d'y répondre avant de lire la suite.

---

Une maladie touche **1 % de la population**. Il existe un test de dépistage qui est très efficace : il détecte la maladie chez **95 % des personnes malades**. Il a un seul défaut : il donne parfois un résultat positif à tort — **10 % des personnes saines reçoivent un faux positif**.

Tu passes ce test. Le résultat est **positif**.

**Quelle est, selon toi, la probabilité que tu sois réellement malade ?**

Prends une seconde. Note mentalement ta réponse.

[[checkpoint:cp-r0-predict]]

La plupart des gens — y compris des médecins — répondent « environ 95 % ». C'est l'efficacité du test, après tout. Si le test détecte 95 % des malades, un résultat positif veut bien dire qu'on est malade à 95 %, non ?

**Non. La réponse est environ 9 %.**

Un test positif, dans cette situation, signifie qu'on a moins d'une chance sur dix d'être réellement malade.

Pourquoi un si grand écart ? La réponse à cette question, c'est exactement ce que cette leçon va t'apprendre à calculer — et à comprendre. On va construire les outils qu'il faut, pièce par pièce. Et à la fin, on reviendra sur ce test et on calculera ce 9 % ensemble, pas à pas.

---

## Décortiquer

### R1 — Qu'est-ce qu'une probabilité conditionnelle ?

#### La question concrète avant la formule

Voici une classe de 100 élèves. On a relevé deux informations sur chacun d'eux : est-ce qu'il pratique un sport collectif, et est-ce qu'il joue au football ?

|  | Football | Pas de football | Total |
|--|--|--|--|
| **Sport collectif** | 30 | 30 | 60 |
| **Pas de sport collectif** | 8 | 32 | 40 |
| **Total** | 38 | 62 | 100 |

Posons-nous deux questions différentes.

**Question 1 :** Quelle fraction *de toute la classe* pratique un sport collectif *et* joue au football ?

On cherche les élèves qui sont dans les deux groupes à la fois. Il y en a 30 sur 100, donc la réponse est $\frac{30}{100} = 0{,}30$.

**Question 2 :** Parmi les élèves qui pratiquent un sport collectif, quelle fraction joue au football ?

Ici, on ne s'intéresse plus à toute la classe. On **restreint** le regard aux 60 sportifs. Dans ce groupe de 60, combien jouent au football ? 30. La réponse est $\frac{30}{60} = 0{,}50$.

La deuxième question, c'est une **probabilité conditionnelle**. On a réduit l'univers : au lieu de regarder toute la classe, on ne regarde que les sportifs.

[[figure:univers-restreint]]

#### La formule, maintenant qu'on voit ce qu'elle fait

Notons $A$ l'événement « pratiquer un sport collectif » et $B$ l'événement « jouer au football ».

La probabilité conditionnelle de $B$ **sachant** $A$ — c'est-à-dire la probabilité de $B$ si on sait déjà que $A$ a eu lieu — s'écrit de deux façons équivalentes :

$$P(B|A) = P_A(B) = \frac{P(A \cap B)}{P(A)}$$

Dans notre exemple :

$$P(B|A) = P_A(B) = \frac{30/100}{60/100} = \frac{0{,}30}{0{,}60} = 0{,}50$$

**Ce que fait cette formule :** elle divise par $P(A)$ pour **ramener l'univers à $A$**. On ne compte plus parmi tout le monde — on compte parmi les gens pour qui $A$ s'est réalisé. C'est le dénominateur $P(A)$ qui accomplit ce rétrécissement.

> **Note de notation :** les deux écritures $P(B|A)$ et $P_A(B)$ désignent la même chose. La barre verticale se lit « sachant que ». Le subscrit $A$ dans $P_A(B)$ signifie « dans l'univers restreint à $A$ ». On les utilisera toutes les deux dans cette leçon.

#### L'erreur classique à éviter ici

Faisons attention à une confusion fréquente. Dans l'exemple ci-dessus :

- $P(A \cap B) = 0{,}30$ — c'est la probabilité qu'un élève pris au hasard *dans toute la classe* soit à la fois sportif et footballeur.
- $P_A(B) = 0{,}50$ — c'est la probabilité qu'un élève *parmi les sportifs seulement* joue au football.

Ces deux nombres partagent le même numérateur (30 élèves) mais ont des dénominateurs différents (100 vs 60). La probabilité conditionnelle est **plus grande**, parce qu'on divise par un univers plus petit.

Si on oublie de diviser par $P(A)$ — si on répond directement $P_A(B) = 0{,}30$ en confondant la conditionnelle avec l'intersection — on fait l'erreur de mesurer dans le mauvais univers. La formule $P_A(B) = P(A \cap B) / P(A)$ est précisément là pour corriger ça : elle **renormalise** à l'univers $A$.

**Vérification rapide :** quand est-ce que $P(A|B) = P(A \cap B)$ ? Uniquement quand $P(B) = 1$, c'est-à-dire quand $B$ est l'univers entier — ce qui voudrait dire qu'on n'a pas du tout réduit l'univers. En pratique, ça n'arrive jamais dans les problèmes du bac.

#### La symétrie qui n'existe pas

$P(B|A)$ et $P(A|B)$ ne sont pas la même chose. Elles partagent le même numérateur $P(A \cap B)$, mais leurs dénominateurs sont différents :

$$P(B|A) = \frac{P(A \cap B)}{P(A)} \qquad \text{et} \qquad P(A|B) = \frac{P(A \cap B)}{P(B)}$$

Dans notre exemple : $P(B|A) = 0{,}50$ et $P(A|B) = \frac{0{,}30}{0{,}38} \approx 0{,}79$. Ce sont deux questions très différentes — « parmi les sportifs, combien jouent au football ? » n'est pas la même question que « parmi les footballeurs, combien pratiquent un sport collectif ? ». Les deux réponses sont différentes parce que les deux groupes de référence ($A$ et $B$) sont de tailles différentes.

Elles ne sont égales que dans le cas particulier où $P(A) = P(B)$.

[[checkpoint:cp-r1-cond-vs-inter]]

---

### R2 — La règle du produit et l'arbre pondéré

#### De la formule conditionnelle à la formule du produit

On repart de la définition. Si $P_A(B) = \frac{P(A \cap B)}{P(A)}$, on peut multiplier les deux membres par $P(A)$ :

$$P(A \cap B) = P(A) \cdot P_A(B) = P(A) \cdot P(B|A)$$

C'est la **règle du produit** (ou formule des probabilités composées). On peut aussi l'écrire dans l'autre sens, en conditionnant par $B$ :

$$P(A \cap B) = P(B) \cdot P_B(A) = P(B) \cdot P(A|B)$$

Les deux sont vraies et donnent le même résultat — parce qu'elles calculent la même intersection $A \cap B$.

**Ce que dit la règle du produit en mots :** pour que $A$ et $B$ se réalisent ensemble, il faut d'abord que $A$ arrive (probabilité $P(A)$), puis que $B$ arrive *sachant qu'on est dans $A$* (probabilité $P(B|A)$). On enchaîne les deux étapes en les multipliant.

#### L'arbre pondéré

L'outil central de cette notion, c'est l'**arbre pondéré**. Il dessine visuellement cet enchaînement d'étapes.

Voici comment le lire. Prenons un exemple concret : dans une classe, 60 % des élèves pratiquent un sport collectif ($P(A) = 0{,}6$). Parmi les sportifs, 50 % jouent au football ($P(B|A) = 0{,}5$). Parmi les non-sportifs, 20 % jouent quand même au football ($P(B|\bar{A}) = 0{,}2$).

<!-- SLOT D'AMÉLIORATION : figure arbre pondéré (diagram-author, ADR 0017 —
     schéma structurel = SVG codé). Le marqueur ci-dessous est un no-op
     silencieux tant que media/arbre-pondere.svg n'existe pas. La prose
     adjacente référence l'arbre : dette C5 notée au HANDOFF. -->

[[figure:arbre-pondere]]

**Comment lire cet arbre :**

- On part de la racine (l'univers $\Omega$).
- La **première bifurcation** sépare $A$ (sport collectif) et $\bar{A}$ (pas de sport collectif). Les probabilités sur ces branches sont $P(A) = 0{,}6$ et $P(\bar{A}) = 0{,}4$.
- La **deuxième bifurcation** sépare $B$ (football) et $\bar{B}$ (pas de football). Les probabilités sur ces branches sont **conditionnelles** : elles dépendent de la branche sur laquelle on se trouve.
- Chaque **feuille** (bout de branche) représente une intersection. Sa probabilité est le **produit des deux probabilités sur le chemin** qui y mène.

Les quatre feuilles :

$$P(A \cap B) = P(A) \cdot P(B|A) = 0{,}6 \times 0{,}5 = 0{,}30$$

$$P(A \cap \bar{B}) = P(A) \cdot P(\bar{B}|A) = 0{,}6 \times 0{,}5 = 0{,}30$$

$$P(\bar{A} \cap B) = P(\bar{A}) \cdot P(B|\bar{A}) = 0{,}4 \times 0{,}2 = 0{,}08$$

$$P(\bar{A} \cap \bar{B}) = P(\bar{A}) \cdot P(\bar{B}|\bar{A}) = 0{,}4 \times 0{,}8 = 0{,}32$$

**Vérification :** la somme des quatre feuilles doit valoir 1 : $0{,}30 + 0{,}30 + 0{,}08 + 0{,}32 = 1{,}00$. C'est le cas.

#### La règle d'or de l'arbre : multiplier vers le bas, additionner en travers

C'est la règle la plus importante à mémoriser sur l'arbre :

- **On multiplie le long d'une branche** (de la racine jusqu'à une feuille) pour obtenir la probabilité d'une intersection.
- **On additionne les feuilles** qui correspondent au même événement pour obtenir sa probabilité totale.

#### Pourquoi on multiplie — le raisonnement

Demandons-nous pourquoi c'est une multiplication et pas une addition. Reprenons l'exemple : 60 % des élèves font du sport. Parmi eux, 50 % jouent au football. Combien d'élèves font les deux ?

50 % **de** 60 %, ça veut dire : on prend 60 élèves sur 100, puis on en garde 50 % — soit 30 sur 100. « De » en français, en probabilité, c'est « × ». Ce n'est pas 50 % + 60 % = 110 %, ce qui n'a aucun sens.

Chaque arête de l'arbre est une proportion *de ce qui est arrivé à l'étape précédente*. On enchaîne des proportions en les multipliant.

#### L'erreur à repérer

Une erreur très fréquente sur l'arbre : **additionner** les probabilités le long d'une branche au lieu de les multiplier.

Dans notre exemple, la branche $A \to B$ porte les probabilités $0{,}6$ puis $0{,}5$. L'erreur donne $0{,}6 + 0{,}5 = 1{,}1$, une « probabilité » supérieure à 1 — ce qui est impossible. Quand on obtient un résultat supérieur à 1 sur une feuille, c'est le signal immédiat qu'on a additionné au lieu de multiplier. Une probabilité ne peut jamais dépasser 1.

[[checkpoint:cp-r2-arbre]]

---

### R3 — Indépendance et incompatibilité : deux relations qu'on confond souvent

Ce paragraphe est dense en pièges. On va le prendre lentement, morceau par morceau.

#### Les deux relations, posées côte à côte

Il existe deux façons pour deux événements $A$ et $B$ d'avoir une relation « particulière » :

| | Indépendants | Incompatibles |
|--|--|--|
| **Ce que ça veut dire** | La réalisation de $A$ ne change rien à la probabilité de $B$ | $A$ et $B$ ne peuvent pas se réaliser en même temps |
| **Formule** | $P(A \cap B) = P(A) \cdot P(B)$ | $P(A \cap B) = 0$ |
| **En termes de conditionnel** | $P(B\|A) = P(B)$ (quand $P(A) \neq 0$) | $P(B\|A) = 0$ (quand $P(A) \neq 0$) |
| **Exemple intuitif** | Deux lancers de pièce distincts | Obtenir « 2 » et « 5 » sur un même lancer de dé |

Ces deux notions ne sont pas du tout la même chose. Elles sont même, dans un sens précis, **opposées**.

#### L'exemple qui force la contradiction

Prenons un dé équilibré à 6 faces. Posons :
- $A$ = « obtenir 2 »
- $B$ = « obtenir 5 »

Ces deux événements sont **incompatibles** : un seul résultat sort à chaque lancer, donc il est impossible d'obtenir à la fois 2 et 5. On a bien $A \cap B = \emptyset$ et $P(A \cap B) = 0$.

Maintenant, la question : **$A$ et $B$ sont-ils indépendants ?**

Calculons $P(B|A)$ : si on sait qu'on a obtenu 2, quelle est la probabilité d'avoir obtenu 5 ? **Zéro**. On vient de savoir que le résultat est 2, donc c'est impossible que ce soit aussi 5.

Or $P(B) = \frac{1}{6} \neq 0$.

Donc $P(B|A) = 0 \neq \frac{1}{6} = P(B)$.

Connaître $A$ a **massivement changé** notre évaluation de $B$ — elle est passée de $\frac{1}{6}$ à 0. Ce n'est pas de l'indépendance. C'est exactement le contraire.

**Conclusion :** deux événements incompatibles (avec des probabilités non nulles) sont toujours **dépendants**, jamais indépendants. L'incompatibilité est la forme la plus forte de dépendance.

La règle à retenir : si $P(A) > 0$, $P(B) > 0$ et $A \cap B = \emptyset$, alors $A$ et $B$ sont incompatibles **mais pas indépendants**.

#### Ce que « indépendant » veut dire vraiment

Si $A$ et $B$ sont indépendants, ça ne veut pas dire qu'ils ne peuvent pas se produire ensemble. Ça veut dire que leur probabilité de se produire ensemble est exactement le produit de leurs probabilités individuelles :

$$A \text{ et } B \text{ indépendants} \iff P(A \cap B) = P(A) \cdot P(B)$$

Exemple concret : on lance deux pièces de monnaie distinctes. $A$ = « la première tombe sur pile », $B$ = « la deuxième tombe sur pile ». Ces événements sont indépendants — l'une n'influence pas l'autre.

Est-ce que $A \cap B$ peut arriver ? Oui, bien sûr : on peut obtenir deux piles. La probabilité est $P(A \cap B) = \frac{1}{2} \times \frac{1}{2} = \frac{1}{4}$.

L'indépendance ne supprime pas l'intersection. Elle en fixe la **valeur** : le produit.

#### La formule d'indépendance utilise ×, pas +

Résumons les deux formules qui coexistent dans cette leçon :

$$\text{Événements incompatibles :} \quad P(A \cup B) = P(A) + P(B)$$

$$\text{Événements indépendants :} \quad P(A \cap B) = P(A) \cdot P(B)$$

Ce sont deux formules pour deux relations différentes et deux opérations ensemblistes différentes ($\cup$ vs $\cap$). Il ne faut pas mélanger les deux.

**Un test de magnitude pour ne pas se tromper :** si $P(A) = 0{,}4$ et $P(B) = 0{,}5$ et que les deux événements sont indépendants, est-ce que $P(A \cap B) = 0{,}9$ (la somme) est possible ?

Non. Une intersection ne peut jamais être plus grande que chacun de ses membres : $P(A \cap B) \leq \min(P(A), P(B)) = 0{,}4$. Une probabilité de 0,9 pour l'intersection d'événements dont l'un a probabilité 0,4, c'est absurde — ça voudrait dire que $A \cap B$ est plus probable que $A$ lui-même.

La réponse correcte : $P(A \cap B) = 0{,}4 \times 0{,}5 = 0{,}20$.

[[figure:independant-vs-incompatible]]

#### Récapitulatif (à garder en tête)

- **Incompatibles :** $A$ et $B$ ne se chevauchent pas ($A \cap B = \emptyset$). Connaître $A$ exclut $B$ totalement. Formule de l'**union** : $P(A \cup B) = P(A) + P(B)$.
- **Indépendants :** $A$ et $B$ peuvent se chevaucher, et ce chevauchement vaut exactement $P(A) \cdot P(B)$. Connaître $A$ ne change rien sur $B$. Formule de l'**intersection** : $P(A \cap B) = P(A) \cdot P(B)$.
- Avec des probabilités non nulles, on **ne peut pas** être les deux à la fois.

---

### R4 — La formule des probabilités totales

#### Le problème que la formule résout

Parfois on ne connaît pas directement $P(B)$. On connaît $P(B|A)$ et $P(B|\bar{A})$ — c'est-à-dire la probabilité de $B$ dans chacune des deux situations possibles — mais pas $P(B)$ globalement.

Comment calculer $P(B)$ à partir de ces informations ?

#### La réponse : additionner les feuilles $B$ de l'arbre

Sur l'arbre pondéré, $B$ se réalise sur exactement **deux feuilles** : $A \cap B$ et $\bar{A} \cap B$. Ces deux feuilles couvrent **tous** les cas où $B$ arrive, et elles ne se chevauchent pas (une personne ne peut pas être à la fois dans $A$ et dans $\bar{A}$). Donc :

$$P(B) = P(A \cap B) + P(\bar{A} \cap B)$$

En appliquant la règle du produit à chaque terme :

$$\boxed{P(B) = P(A) \cdot P(B|A) + P(\bar{A}) \cdot P(B|\bar{A})}$$

C'est la **formule des probabilités totales**.

<!-- SLOT D'AMÉLIORATION : figure arbre pondéré (diagram-author, ADR 0017 —
     schéma structurel = SVG codé). Le marqueur ci-dessous est un no-op
     silencieux tant que media/arbre-pondere.svg n'existe pas. La prose
     adjacente référence l'arbre : dette C5 notée au HANDOFF. -->

[[figure:arbre-pondere]]

**Application avec nos chiffres :** $P(A) = 0{,}6$, $P(B|A) = 0{,}5$, $P(\bar{A}) = 0{,}4$, $P(B|\bar{A}) = 0{,}2$.

$$P(B) = 0{,}6 \times 0{,}5 + 0{,}4 \times 0{,}2 = 0{,}30 + 0{,}08 = 0{,}38$$

#### Pourquoi on ne peut pas juste additionner les conditionnelles

On pourrait être tenté d'écrire $P(B) = P(B|A) + P(B|\bar{A}) = 0{,}5 + 0{,}2 = 0{,}7$. C'est une erreur.

Voici pourquoi. $P(B|A) = 0{,}5$ est le taux de $B$ **dans la sous-population $A$**, qui représente 60 % du total. $P(B|\bar{A}) = 0{,}2$ est le taux de $B$ **dans la sous-population $\bar{A}$**, qui représente seulement 40 %. Si on veut le taux global, on ne peut pas faire une simple somme — il faut une **moyenne pondérée** par la taille de chaque sous-population.

C'est exactement ce que fait la formule : elle multiplie chaque taux $P(B|A_i)$ par le poids $P(A_i)$ de sa sous-population.

**Test de cohérence :** $P(B)$ doit nécessairement se trouver **entre** $P(B|A) = 0{,}5$ et $P(B|\bar{A}) = 0{,}2$. La réponse 0,38 est bien entre 0,2 et 0,5. La réponse 0,7, elle, est au-dessus de 0,5 — ce qui est impossible, puisque même dans la meilleure sous-population $A$, seulement 50 % arrivent à $B$.

#### Condition de validité : une partition

La formule des probabilités totales fonctionne parce que $A$ et $\bar{A}$ forment une **partition** de l'univers : ils couvrent tout ($A \cup \bar{A} = \Omega$), sans se chevaucher ($A \cap \bar{A} = \emptyset$), et leurs probabilités font bien 1 ($P(A) + P(\bar{A}) = 1$). Chaque issue de $\Omega$ est comptée exactement une fois.

Si on utilisait des événements qui ne forment pas une partition — qui se chevauchent, ou qui n'couvrent pas tout $\Omega$ — la formule serait fausse.

---

### R5 — Lire l'arbre à rebours : trouver $P(A|B)$ quand on a construit l'arbre dans l'autre sens

#### Le problème de la lecture inverse

L'arbre qu'on a construit jusqu'ici va de la **cause vers l'effet** : d'abord on sait si l'élève est sportif ($A$ ou $\bar{A}$), puis on sait s'il joue au football ($B$ ou $\bar{B}$). C'est l'ordre naturel de construction.

Mais parfois, la question qu'on pose va dans l'**autre sens** : on observe l'effet ($B$ a eu lieu) et on veut remonter vers la cause ($A$ ou $\bar{A}$ ?). C'est la **lecture inverse de l'arbre**.

Comment calculer $P(A|B)$ à partir d'un arbre construit dans le sens $A \to B$ ?

#### La méthode : repérer toutes les feuilles où $B$ se produit

Voici le raisonnement. On sait que $B$ a eu lieu. Ça signifie qu'on se trouve sur l'une des feuilles où $B$ figure. Sur notre arbre, il y en a exactement deux : $A \cap B$ (feuille en haut) et $\bar{A} \cap B$ (feuille en bas).

$P(A|B)$ est la part de « trouver $A \cap B$ » parmi « toutes les façons d'arriver à $B$ » :

$$P(A|B) = P_B(A) = \frac{P(A \cap B)}{P(B)} = \frac{P(A \cap B)}{P(A \cap B) + P(\bar{A} \cap B)}$$

**La procédure concrète :**
1. Identifier toutes les feuilles où $B$ apparaît (les « feuilles $B$ »).
2. Faire la somme de leurs probabilités — c'est $P(B)$.
3. La feuille qui nous intéresse est $A \cap B$.
4. Diviser : $P(A|B) = \frac{P(A \cap B)}{P(B)}$.

<!-- SLOT D'AMÉLIORATION : figure arbre pondéré (diagram-author, ADR 0017 —
     schéma structurel = SVG codé). Le marqueur ci-dessous est un no-op
     silencieux tant que media/arbre-pondere.svg n'existe pas. La prose
     adjacente référence l'arbre : dette C5 notée au HANDOFF. -->

[[figure:arbre-pondere]]

**Application :** $P(A \cap B) = 0{,}30$, $P(\bar{A} \cap B) = 0{,}08$, donc $P(B) = 0{,}38$.

$$P(A|B) = \frac{0{,}30}{0{,}38} = \frac{30}{38} = \frac{15}{19} \approx 0{,}79$$

Parmi les élèves qui jouent au football, 79 % pratiquent un sport collectif.

#### Ce qu'il ne faut pas faire

L'erreur la plus fréquente à ce stade : diviser $P(A \cap B)$ par le **mauvais dénominateur**.

- On ne divise pas par $P(A) = 0{,}6$ (la branche $A$ entière) — ça, ce serait $P(B|A)$, la question dans l'autre sens.
- On ne divise pas par $P(B|A) = 0{,}5$ — ce n'est pas la bonne grandeur.

On divise par $P(B)$ — c'est-à-dire par **la somme de toutes les feuilles où $B$ se produit**. « Sachant $B$ » signifie qu'on restreint l'univers à $B$. Il faut donc rassembler **toutes** les façons dont $B$ peut se produire, pas seulement une seule branche.

#### Pour aller plus loin : joue avec l'arbre interactif (C2)

> **Sandbox GeoGebra (optionnel) :** tu peux explorer ce que fait la lecture inverse en faisant varier $P(A)$, $P(B|A)$ et $P(B|\bar{A})$ dans l'outil interactif associé à cette leçon. Quand tu déplaces le curseur $P(A)$ vers 0 ou vers 1, observe comment $P(A|B)$ évolue — tu verras pourquoi le résultat peut être très éloigné de ce qu'on attend intuitivement.

#### Fermeture de l'arc : le test médical du départ, résolu

Tu te souviens de la question posée tout au début ? Un test positif pour une maladie touchant 1 % de la population. On avait prédit « environ 95 % » — et la vraie réponse était « environ 9 % ».

Construisons l'arbre maintenant.

Soit $M$ = « être malade » et $T^+$ = « test positif ».

**Données :**
- $P(M) = 0{,}01$, donc $P(\bar{M}) = 0{,}99$
- $P(T^+|M) = 0{,}95$ (sensibilité du test)
- $P(T^+|\bar{M}) = 0{,}10$ (taux de faux positifs)

**Étape 1 — Calculer les feuilles :**

$$P(M \cap T^+) = P(M) \cdot P(T^+|M) = 0{,}01 \times 0{,}95 = 0{,}0095$$

$$P(\bar{M} \cap T^+) = P(\bar{M}) \cdot P(T^+|\bar{M}) = 0{,}99 \times 0{,}10 = 0{,}099$$

**Étape 2 — Calculer $P(T^+)$ par les probabilités totales :**

$$P(T^+) = P(M \cap T^+) + P(\bar{M} \cap T^+) = 0{,}0095 + 0{,}099 = 0{,}1085$$

**Étape 3 — Lire l'arbre à rebours :**

$$P(M|T^+) = \frac{P(M \cap T^+)}{P(T^+)} = \frac{0{,}0095}{0{,}1085} \approx 0{,}088 \approx 9\%$$

**Pourquoi ce résultat paraît surprenant ?** La maladie est rare : 1 % de la population. Ça veut dire que dans un groupe de 10 000 personnes, il y a 100 malades et 9 900 personnes saines. Le test donne un positif à 95 % des malades (95 personnes) et à 10 % des saines (990 personnes). Sur les $95 + 990 = 1085$ résultats positifs, seulement 95 viennent de vrais malades. $\frac{95}{1085} \approx 9\%$.

Les 990 **faux positifs** produits par la vaste population saine noient les 95 vrais positifs. C'est l'effet de la **rareté de la maladie** — et c'est exactement ce que $P(B)$ au dénominateur capture : il prend en compte **toutes** les sources de résultats positifs, pas seulement la source qu'on suspecte.

L'erreur intuitive de 95 % était de confondre $P(T^+|M)$ avec $P(M|T^+)$ — la question dans le sens « du test vers la maladie » avec la question dans l'autre sens. C'est l'erreur M1 (transposer le conditionnel), et c'est pour ça qu'elle est si dangereuse dans les raisonnements médicaux et judiciaires.

---

## La rampe — de la définition aux questions de bac

Le tableau ci-dessous donne la progression. Chaque palier augmente la demande en raisonnement, pas seulement en calcul.

| Palier | Type de travail | Ce qu'on développe |
|--|--|--|
| **1.** Définition | Exemple guidé, tous les pas montrés | Lire la formule $P_A(B) = P(A \cap B)/P(A)$ et comprendre ce qu'elle fait (restreindre l'univers). |
| **2.** Règle du produit et arbre | Exercice guidé (arbre pré-dessiné, à compléter) | Remplir les feuilles d'un arbre en multipliant le long des branches. Détecter l'erreur d'addition. |
| **3.** Indépendance | Confronter la contradiction | Distinguer indépendants et incompatibles. Utiliser le critère $P(A \cap B) = P(A) \cdot P(B)$ pour tester. |
| **4.** Probabilités totales | Travaillé puis guidé | Assembler $P(B)$ à partir des feuilles de l'arbre. Vérifier par encadrement. |
| **5.** Lecture inverse | Peu d'aide, tu conduis | Identifier les feuilles $B$, former $P(B)$, calculer $P(A|B)$ en divisant par $P(B)$. |
| **6.** Questions de bac authentiques | Sans aide | Reconnaître quelle procédure s'applique sur des questions réelles de l'examen national. |
| **7.** Variations inédites | Sans aide | Appliquer la même logique sur des contextes jamais vus : filtre anti-spam, deux fournisseurs, tirage dans des ensembles différents. Ce que le bac teste vraiment : reconnaître la structure quand le problème est habillé différemment. |

---

## Pour t'entraîner — les questions de type bac

Les paliers 6 et 7 de la rampe, maintenant : d'abord une **question d'examen national authentique**, puis une **variation inédite** pour vérifier que tu reconnais la structure même quand l'habillage change. La règle du jeu — c'est là que se joue le vrai progrès : pour chaque question, cherche sur papier d'abord, engage une réponse, et seulement ensuite ouvre le raisonnement expert pour le comparer au tien.

### Exercice de type bac (2023)

Le sujet ci-dessous ajoute un ingrédient nouveau à ce qu'on a construit : une **variable aléatoire** $X$ (un nombre attaché à chaque résultat de l'expérience) et sa **loi de probabilité** (la liste des valeurs de $X$ avec leurs probabilités). Rien de plus que l'arbre et le conditionnement, mais organisés autrement. Deux réflexes suffiront : les probabilités de la deuxième branche sont **conditionnelles** (l'urne change après le transfert d'une boule), et une loi de probabilité **somme toujours à 1**.

Un piège propre à ce sujet — le transfert de la boule — à trancher avant de te lancer :

[[checkpoint:cp-bac-dependance]]

[[exercise:r-bac]]

### Une variation pour ne pas mémoriser

Même machinerie, autre habillage : deux sacs au lieu de deux urnes, un transfert lui aussi, mais une variable aléatoire qui est cette fois une **somme** $X = a+b$ et non un produit. À toi de reconnaître que l'arbre, le conditionnement et la loi s'appliquent exactement pareil. Un dernier réflexe sur la loi avant de te lancer :

[[checkpoint:cp-bac-loi]]

[[exercise:r-variation]]

---

<!-- NOTE DE VALIDATION (relecture humaine) — déplacée en commentaire le
     2026-07-03 : elle rendait côté élève (audit externe, classe résiduelle 1).
     **Note de validation (⚠ pour la relecture humaine) :** Deux questions de notation et de périmètre restent ouvertes, conformément au spec §7. (1) Le cadre SM nomme-t-il « théorème de Bayes » explicitement, ou uniquement la lecture inverse de l'arbre ? Si oui, R5 peut se clore par une phrase qui nomme la formule comme résumé de ce que l'arbre fait déjà — mais le mécanisme reste l'arbre. (2) Quelle notation est primaire dans les manuels SM : $P_A(B)$ ou $P(B|A)$ ? Cette leçon utilise les deux à égalité ; l'ordre d'introduction peut être ajusté après confirmation.
-->
