# Suites numériques

> **Notion :** Suites numériques — SM · 2ème Bac
> **Skill :** `sma_suites_numeriques` (code proposé — à confirmer par supabase-architect)

---

## R0 — Accroche : le réservoir qui ne se vide jamais (et ne déborde jamais)

Un réservoir contient au départ 100 000 litres d'eau. On note $u_0 = 100$ le volume présent, exprimé en milliers de litres. Chaque jour, deux choses se passent, toujours dans le même ordre :

- une pompe évacue **la moitié** de l'eau présente dans le réservoir ;
- puis un robinet ajoute **10 000 litres** (donc $10$, en milliers de litres).

Si $u_n$ désigne le volume au matin du jour $n$, cette règle se traduit par :

$$u_{n+1} = 0{,}5\,u_n + 10 \qquad \text{avec } u_0 = 100$$

Avant de continuer, prends position. Sur le long terme — après des mois, des années de ce même cycle — que va devenir ce réservoir ? Trois scénarios sont a priori possibles :

- il se vide progressivement (le volume tend vers 0) ;
- il continue de gonfler indéfiniment (le volume tend vers $+\infty$) ;
- il se stabilise autour d'une valeur précise, ni vide ni débordant.

Note ta réponse — et si tu penses qu'il se stabilise, essaie même de deviner **autour de quelle valeur**, et pourquoi cette valeur précisément et pas une autre.

Calculons les premiers termes pour voir ce qui se passe réellement :

$$u_0 = 100, \quad u_1 = 0{,}5 \times 100 + 10 = 60, \quad u_2 = 0{,}5 \times 60 + 10 = 40, \quad u_3 = 0{,}5 \times 40 + 10 = 30$$

$$u_4 = 25, \quad u_5 = 22{,}5, \quad u_6 = 21{,}25, \quad u_7 = 20{,}625, \ldots$$

Le volume diminue, mais de moins en moins vite, et semble se rapprocher de 20. Est-ce vraiment ce qui se passe ? Continue-t-il à diminuer indéfiniment, aussi lentement soit-il, ou bien se stabilise-t-il **exactement** à une valeur — et si oui, laquelle, et pourquoi celle-là ?

Répondre proprement à cette question demande tous les outils de ce chapitre : montrer qu'une suite ne descend jamais en dessous d'un certain seuil (majorer, minorer), montrer qu'elle est décroissante (monotonie), établir qu'une suite décroissante et minorée est forcément convergente (un théorème qu'on va démontrer et comprendre), et enfin calculer la valeur exacte de la limite. On construit ces outils un par un — et à la fin de cette leçon, on referme complètement la question du réservoir.

---

## R1 — Le raisonnement par récurrence : le mécanisme des dominos

### Le problème que ça résout

On veut souvent prouver qu'une propriété est vraie **pour tous les rangs $n$** d'une suite — une infinité de valeurs de $n$. Impossible de vérifier un par un : $n=0$, puis $n=1$, puis $n=2$… on n'en finirait jamais. Il faut un raisonnement qui couvre l'infinité des rangs **d'un seul coup**. C'est le raisonnement par récurrence.

### Le mécanisme : une chaîne de dominos

Imagine une infinité de dominos alignés, numérotés $0, 1, 2, 3, \ldots$ Tu veux être sûr que **tous** tombent. Il suffit de garantir deux choses :

- **le premier domino tombe** (tu le pousses toi-même) ;
- **chaque domino, en tombant, fait tomber le suivant** (ils sont assez rapprochés).

Si ces deux conditions sont vraies, alors le domino 0 tombe, ce qui fait tomber le domino 1, ce qui fait tomber le domino 2, et ainsi de suite — **tous** les dominos tombent, sans exception, même si tu n'as jamais poussé que le premier toi-même.

C'est exactement la structure du raisonnement par récurrence, pour prouver qu'une propriété $P(n)$ est vraie pour tout entier $n \geq n_0$ :

- **Initialisation :** on vérifie que $P(n_0)$ est vraie (le premier domino tombe).
- **Hérédité :** on suppose que $P(n)$ est vraie pour un rang $n$ quelconque, fixé — c'est **l'hypothèse de récurrence** — et on démontre qu'alors $P(n+1)$ est vraie aussi (ce domino fait tomber le suivant).
- **Conclusion :** ces deux points suffisent à garantir que $P(n)$ est vraie pour tout $n \geq n_0$.

**Le point qu'il ne faut pas rater :** à l'étape d'hérédité, on ne suppose pas que $P(n)$ est vraie pour tout $n$ — ce serait supposer ce qu'on veut démontrer, un raisonnement circulaire. On suppose $P(n)$ vraie **pour un seul rang $n$, fixé**, et on montre que ça suffit à entraîner $P(n+1)$. C'est cette implication $P(n) \Rightarrow P(n+1)$ — valable pour n'importe quel $n$ — qui joue le rôle de « chaque domino fait tomber le suivant ».

### Exemple travaillé : une propriété sur notre réservoir

Reprenons la suite du réservoir : $u_0 = 100$ et $u_{n+1} = 0{,}5\,u_n + 10$. Montrons que $u_n > 20$ pour tout entier $n$. (On aura besoin de ce résultat plus loin, pour étudier la monotonie de la suite — retiens-le.)

**Ce qu'on cherche ici, et pourquoi ce geste :** on ne peut pas vérifier l'inégalité $u_n > 20$ pour une infinité de $n$ un par un. On utilise donc la récurrence : montrer que ça démarre vrai, et que ça se transmet d'un rang au suivant.

**Initialisation.** Pour $n=0$ : $u_0 = 100$, et $100 > 20$. La propriété est vraie au rang 0.

**Hérédité.** Supposons que, pour un rang $n$ fixé, $u_n > 20$ (hypothèse de récurrence). Montrons qu'alors $u_{n+1} > 20$.

Partons de l'hypothèse et appliquons la relation de récurrence, une transformation à la fois :

$$u_n > 20$$

$$0{,}5\,u_n > 0{,}5 \times 20 = 10$$

$$0{,}5\,u_n + 10 > 10 + 10 = 20$$

$$u_{n+1} > 20$$

(On a multiplié l'inégalité par $0{,}5 > 0$ — ce qui conserve le sens de l'inégalité — puis ajouté 10 des deux côtés.)

**Conclusion.** L'initialisation et l'hérédité sont vérifiées : par récurrence, $u_n > 20$ pour tout entier $n \geq 0$.

### L'erreur à repérer

Une erreur fréquente : oublier l'initialisation, et croire que l'hérédité seule suffit. Mais l'hérédité dit seulement « *si* c'est vrai à un rang, ça reste vrai au suivant » — une implication conditionnelle, un domino qui pousse le suivant. Sans le premier domino pour démarrer la chute, l'implication ne sert à rien : elle est peut-être vraie, mais aucun domino ne tombe jamais. Une hérédité vraie associée à une initialisation fausse — ou absente — ne prouve rien du tout.

---

## R2 — Suites arithmétiques et suites géométriques

### Deux façons simples de passer d'un terme au suivant

Beaucoup de suites sont définies par une règle donnant $u_{n+1}$ à partir de $u_n$. Deux règles sont si fréquentes qu'elles ont un nom.

**Suite arithmétique :** on passe d'un terme au suivant en **ajoutant toujours le même nombre** $r$ (la raison) :

$$u_{n+1} = u_n + r$$

**Suite géométrique :** on passe d'un terme au suivant en **multipliant toujours par le même nombre** $q$ (la raison, avec $q \neq 0$) :

$$u_{n+1} = q \times u_n$$

### La formule explicite — et pourquoi on peut « sauter » les étapes intermédiaires

Écrire $u_{n+1} = u_n + r$ dit comment avancer d'un cran. Mais si on veut $u_{50}$ à partir de $u_0$, on ne va pas ajouter $r$ cinquante fois à la main. Il faut une formule qui donne $u_n$ **directement**, en fonction de $n$.

**Cas arithmétique.** Chaque étape ajoute $r$. Après $n$ étapes depuis $u_0$, on a ajouté $r$ un total de $n$ fois :

$$u_n = u_0 + n\,r$$

Prouvons-le proprement par récurrence — exactement le mécanisme du R1, appliqué ici.

Initialisation : pour $n=0$, $u_0 + 0 \times r = u_0$. Vrai.

Hérédité : supposons $u_n = u_0 + n\,r$ pour un rang $n$ fixé. Alors, en utilisant la définition puis l'hypothèse de récurrence :

$$u_{n+1} = u_n + r$$

$$u_{n+1} = (u_0 + n\,r) + r = u_0 + (n+1)\,r$$

C'est exactement la formule au rang $n+1$. L'hérédité est vérifiée, donc $u_n = u_0 + n\,r$ pour tout $n$.

**Cas géométrique.** Chaque étape multiplie par $q$. Après $n$ étapes, on a multiplié par $q$ un total de $n$ fois :

$$u_n = u_0 \times q^n$$

La preuve suit exactement le même moule (à toi de la refaire : initialisation triviale au rang 0, puis hérédité $u_{n+1} = u_n \times q = (u_0\,q^n) \times q = u_0\,q^{n+1}$).

### Somme des premiers termes

Deux formules à connaître (admises ici — elles se prouvent aussi par récurrence, mais ce n'est pas l'objet de cette leçon) :

$$\text{Arithmétique :} \quad S_n = u_0 + u_1 + \cdots + u_n = (n+1) \times \frac{u_0 + u_n}{2}$$

$$\text{Géométrique (}q \neq 1\text{) :} \quad S_n = u_0 + u_1 + \cdots + u_n = u_0 \times \frac{1 - q^{\,n+1}}{1-q}$$

Ce qu'il faut retenir de la formule arithmétique : c'est **(nombre de termes) × (moyenne du premier et du dernier)**. Ce qu'il faut retenir de la formule géométrique : elle échoue si $q=1$ (division par 0) — mais dans ce cas la suite est constante, donc $S_n = (n+1)\,u_0$ directement, sans avoir besoin de la formule.

### Pourquoi c'est utile pour la suite du chapitre

Voici l'idée qu'on va exploiter plus loin (R8) : une suite qui n'est **ni** arithmétique **ni** géométrique peut parfois être **transformée**, via une suite auxiliaire bien choisie, en une suite géométrique — une famille qu'on sait déjà traiter complètement. C'est exactement ce qui va arriver avec la suite du réservoir. Garde cette idée de côté pour l'instant.

---

## R3 — Suites majorées, minorées, bornées

### Les définitions, et ce qu'elles capturent vraiment

- $(u_n)$ est **majorée** s'il existe un réel $M$ tel que, **pour tout $n$**, $u_n \leq M$. $M$ est appelé un **majorant**.
- $(u_n)$ est **minorée** s'il existe un réel $m$ tel que, **pour tout $n$**, $u_n \geq m$. $m$ est appelé un **minorant**.
- $(u_n)$ est **bornée** si elle est à la fois majorée et minorée.

**Le piège de vocabulaire à éviter :** un majorant n'est pas forcément **atteint** par la suite, et il n'est pas unique — si $M$ majore $(u_n)$, alors $M+1$ aussi. « Majorée » dit seulement qu'un plafond existe quelque part, pas lequel est le plus serré.

### Pourquoi c'est plus dur à prouver qu'à calculer

On ne peut pas prouver « $u_n \leq M$ pour tout $n$ » en calculant $u_0, u_1, u_2, \ldots$ un par un — il y en a une infinité. Comme pour toute propriété portant sur « tous les rangs », l'outil naturel est la récurrence (R1).

### Exemple travaillé : borner le réservoir

Reprenons $u_0=100$, $u_{n+1} = 0{,}5\,u_n+10$. On a déjà montré (R1) que $u_n > 20$ pour tout $n$ — la suite est **minorée** par 20. Montrons maintenant qu'elle est aussi **majorée** par 100, c'est-à-dire que le réservoir ne dépasse jamais son volume initial.

**Ce qu'on cherche ici, et pourquoi ce geste :** même stratégie qu'en R1 — initialisation puis hérédité, en utilisant la relation de récurrence pour faire passer l'inégalité d'un rang au suivant.

**Initialisation.** $u_0 = 100 \leq 100$. Vrai (au sens large).

**Hérédité.** Supposons $u_n \leq 100$ pour un rang $n$ fixé.

$$u_n \leq 100$$

$$0{,}5\,u_n \leq 50$$

$$0{,}5\,u_n + 10 \leq 60 \leq 100$$

Donc $u_{n+1} \leq 100$.

**Conclusion.** Par récurrence, $u_n \leq 100$ pour tout $n$. Combiné au R1, on a $20 < u_n \leq 100$ pour tout $n$ : la suite est **bornée**.

**Remarque utile pour la suite du chapitre :** l'hérédité vient en fait de montrer un résultat plus précis que « $u_n \leq 100$ » — elle donne $u_{n+1} \leq 60$, un majorant qui se resserre à chaque étape. On y revient au R4, et ce resserrement est justement ce qui va permettre de démontrer que la suite est décroissante.

### L'erreur à repérer

Confondre « majorée » avec « qui augmente vers une valeur qu'elle ne dépasse jamais ». Être bornée ne dit **rien** sur le sens de variation. Une suite peut très bien osciller — monter, descendre, remonter — tout en restant bornée. La monotonie est une propriété séparée, qu'on étudie au rung suivant.

---

## R4 — Monotonie : le sens de variation d'une suite

### Le mécanisme : comparer un terme à son voisin, pour tout n à la fois

Pour savoir si une suite est croissante ou décroissante, on ne « regarde » pas la suite — on **calcule** le signe de la différence entre deux termes consécutifs :

$$(u_n) \text{ est croissante} \iff u_{n+1} - u_n \geq 0 \text{ pour tout } n$$

$$(u_n) \text{ est décroissante} \iff u_{n+1} - u_n \leq 0 \text{ pour tout } n$$

(Avec inégalité stricte, on parle de croissance ou décroissance **strictes**.)

**Pourquoi la différence, et pas juste « regarder si ça monte » :** parce que regarder ne prouve rien pour une infinité de termes — exactement le même problème qu'en R1 et R3. Calculer le signe d'une expression algébrique, une bonne fois pour toutes, en fonction de $n$ (ou d'une hypothèse sur $u_n$), couvre tous les rangs d'un coup.

**Variante utile quand $u_n > 0$ pour tout $n$ :** comparer le quotient à 1 plutôt que la différence à 0 :

$$\frac{u_{n+1}}{u_n} \geq 1 \iff u_{n+1} \geq u_n \quad \text{(croissante, si tous les } u_n>0\text{)}$$

Cette méthode du quotient est surtout pratique pour les suites géométriques à termes positifs, où $u_{n+1}/u_n = q$ est immédiat à calculer.

### Exemple travaillé : la monotonie du réservoir

Reprenons $u_{n+1} = 0{,}5\,u_n + 10$. Calculons la différence :

$$u_{n+1} - u_n = (0{,}5\,u_n + 10) - u_n = 10 - 0{,}5\,u_n$$

$$u_{n+1} - u_n = 0{,}5\,(20 - u_n)$$

**Ce qu'on cherche ici, et pourquoi ce geste :** on a factorisé pour faire apparaître $(20-u_n)$ précisément parce qu'on connaît déjà (R1) le signe de cette quantité : on a montré $u_n > 20$ pour tout $n$, donc $20 - u_n < 0$.

$$u_{n+1} - u_n = 0{,}5 \times (\text{un nombre strictement négatif}) < 0$$

Donc $u_{n+1} - u_n < 0$ pour tout $n$ : **la suite est strictement décroissante**.

**Ce que ce résultat confirme :** le réservoir perd du volume à chaque étape mais, d'après le R3, il reste toujours au-dessus de 20. Une suite décroissante et minorée — exactement la situation qu'il faut pour le théorème du R7.

### Le cas d'une suite $u_{n+1} = f(u_n)$ : comparer $f(x)$ à $x$

Quand une suite est définie par $u_{n+1} = f(u_n)$, il existe un raccourci pour deviner le sens de variation avant même de recalculer $u_{n+1}-u_n$ à chaque fois : étudier le signe de $f(x) - x$.

En effet, $u_{n+1} - u_n = f(u_n) - u_n$. Si $f(x) - x \geq 0$ pour tout $x$ dans l'intervalle où vivent les $u_n$, alors $u_{n+1}-u_n \geq 0$ pour tout $n$ : la suite est croissante. Et inversement pour décroissante.

Vérifions sur notre exemple : $f(x) = 0{,}5x+10$, donc $f(x)-x = 10-0{,}5x = 0{,}5(20-x)$. Pour $x>20$ (l'intervalle où vivent nos $u_n$, d'après R1), $f(x)-x < 0$ : on retrouve exactement le calcul précédent, mais formulé une bonne fois pour toutes en fonction de $x$, sans repartir de $u_n$ à chaque étape.

### L'erreur à repérer

Conclure la monotonie à partir des trois ou quatre premiers termes calculés numériquement ($u_0=100$, $u_1=60$, $u_2=40$… « ça diminue, donc c'est décroissant »). Voir une tendance sur quelques termes n'est pas une preuve — exactement le problème que la récurrence (ou ici, le calcul de signe valable pour tout $n$) est faite pour résoudre. Une suite peut très bien décroître sur ses dix premiers termes puis se remettre à croître ensuite.

---

## R5 — La limite d'une suite : définition et unicité

### L'idée avant la définition formelle

On dit qu'une suite $(u_n)$ **converge vers** un réel $L$ quand ses termes $u_n$ se rapprochent d'aussi près qu'on veut de $L$, à condition d'aller assez loin dans la suite (à partir d'un certain rang). Reprends l'exemple du réservoir : $22{,}5$, puis $21{,}25$, puis $20{,}625$… les termes se rapprochent de 20, et l'écart à 20 devient de plus en plus petit.

### La définition, précisément

$(u_n)$ **converge vers $L$** — on note $\lim\limits_{n \to +\infty} u_n = L$ — si : pour **tout** intervalle ouvert autour de $L$, aussi petit soit-il, tous les termes de la suite finissent par y entrer et n'en ressortent plus, à partir d'un certain rang.

Autrement dit, en fixant un seuil de tolérance $\varepsilon > 0$ (aussi petit que tu veux), il existe toujours un rang $N$ tel que, pour tout $n \geq N$ :

$$|u_n - L| < \varepsilon$$

**Ce que fait cette définition :** elle transforme « se rapproche » — une idée vague — en une garantie précise et vérifiable : pour chaque niveau de précision $\varepsilon$ qu'on exige, il existe un rang $N$ à partir duquel la promesse est tenue.

[[figure:convergence-limite]]

Si une suite ne converge vers aucun réel, on dit qu'elle **diverge**. Diverger recouvre deux cas très différents : la suite peut tendre vers $+\infty$ ou $-\infty$ (ses termes dépassent n'importe quel seuil, aussi grand soit-il, à partir d'un certain rang), ou bien elle peut ne tendre vers rien du tout — osciller sans jamais se stabiliser (par exemple $u_n = (-1)^n$, qui vaut alternativement $1$ et $-1$).

### Pourquoi la limite, si elle existe, est unique

Un résultat qu'on utilise tout le temps sans le redémontrer, mais qui mérite qu'on voie **pourquoi** il est vrai : une suite convergente a une **seule** limite. Elle ne peut pas converger à la fois vers 20 et vers 21, par exemple.

**L'argument, en idée :** si les termes finissent par être aussi proches qu'on veut à la fois de 20 et de 21, alors à partir d'un certain rang ils devraient être proches des deux en même temps. Mais 20 et 21 sont à distance fixe (1) l'un de l'autre — un même terme ne peut pas être arbitrairement proche de deux points distincts simultanément. Dès qu'on choisit $\varepsilon$ plus petit que la moitié de l'écart entre les deux limites supposées, la contradiction apparaît : $u_n$ ne peut pas être à la fois à moins de $\varepsilon$ de 20 et à moins de $\varepsilon$ de 21. L'hypothèse « deux limites différentes » s'effondre : la limite, si elle existe, est unique.

### Limites usuelles à connaître

**Suites arithmétiques** ($u_n = u_0 + n\,r$) :

- si $r>0$ : $\lim\limits_{n\to+\infty} u_n = +\infty$
- si $r<0$ : $\lim\limits_{n\to+\infty} u_n = -\infty$
- si $r=0$ : la suite est constante, $\lim\limits_{n\to+\infty} u_n = u_0$

**Suites géométriques** ($u_n = u_0\,q^n$, avec $u_0 \neq 0$) :

- si $-1 < q < 1$ : $\lim\limits_{n\to+\infty} q^n = 0$
- si $q=1$ : $q^n=1$ pour tout $n$, donc $\lim\limits_{n\to+\infty} u_n = u_0$
- si $q>1$ : $\lim\limits_{n\to+\infty} q^n = +\infty$ (et $u_0\,q^n$ tend vers $+\infty$ si $u_0>0$, vers $-\infty$ si $u_0<0$)
- si $q \leq -1$ : $(q^n)$ n'a pas de limite (elle oscille de signe, et si $q<-1$, elle oscille avec une amplitude qui explose)

Ces résultats sont admis ici — les démontrer proprement demande des outils qu'on introduit justement dans les rungs suivants (comparaison, monotonie bornée).

### Opérations sur les limites

Quand deux suites convergent, $\lim u_n = L$ et $\lim v_n = L'$, les limites se combinent « comme on s'y attend » :

$$\lim(u_n + v_n) = L+L' \qquad \lim(u_n \times v_n) = L \times L' \qquad \lim \frac{u_n}{v_n} = \frac{L}{L'} \ \text{(si } L' \neq 0\text{)}$$

Ces règles s'étendent aussi, avec prudence, aux limites infinies — par exemple $\lim u_n = +\infty$ et $\lim v_n = +\infty$ donnent $\lim(u_n+v_n) = +\infty$. Mais certaines combinaisons ne se laissent pas deviner : $(+\infty)-(+\infty)$, $0 \times (\pm\infty)$, $\dfrac{\pm\infty}{\pm\infty}$, $\dfrac{0}{0}$ sont des **formes indéterminées** — le résultat dépend de **comment** chaque suite tend vers l'infini (ou vers 0), pas seulement du fait qu'elle y tend. Il faut alors transformer l'écriture de la suite (factoriser, simplifier) avant de conclure — jamais appliquer la règle comme si de rien n'était.

### L'erreur à repérer

Appliquer une opération sur les limites à une forme indéterminée sans la reconnaître. Exemple : $u_n = n+1$ et $v_n = -n$ tendent chacune vers l'infini (l'une vers $+\infty$, l'autre vers $-\infty$), et pourtant leur somme $u_n+v_n = 1$ est **constante**, donc tend vers 1 — pas vers « $+\infty-\infty$ », qui n'a pas de valeur déterminée en général. Le signal d'alarme : dès qu'une opération combine deux limites infinies en soustraction, une limite nulle avec une limite infinie en produit, ou deux limites infinies en quotient, il faut transformer l'expression avant de conclure quoi que ce soit.

---

## R6 — Théorèmes de comparaison et théorème des gendarmes

### Le problème que ces théorèmes résolvent

Calculer la limite d'une suite directement est parfois difficile — l'expression est compliquée, ou on ne connaît même pas de formule explicite. Mais si on peut **encadrer** ou **comparer** cette suite à d'autres suites plus simples, dont on connaît déjà la limite, on peut souvent conclure sans calcul direct.

### Théorèmes de comparaison (limites infinies)

Si, à partir d'un certain rang, $u_n \leq v_n$, alors :

- si $\lim\limits_{n\to+\infty} u_n = +\infty$, alors $\lim\limits_{n\to+\infty} v_n = +\infty$ (une suite plus grande qu'une suite qui explose vers $+\infty$ explose aussi) ;
- si $\lim\limits_{n\to+\infty} v_n = -\infty$, alors $\lim\limits_{n\to+\infty} u_n = -\infty$ (symétriquement, une suite plus petite qu'une suite qui plonge vers $-\infty$ plonge aussi).

**Pourquoi c'est vrai :** si $u_n$ dépasse n'importe quel seuil, aussi grand soit-il, à partir d'un certain rang, et que $v_n$ est encore plus grande que $u_n$, alors $v_n$ dépasse ce seuil aussi. $v_n$ « hérite » du fait de dépasser tous les seuils.

### Le théorème des gendarmes (limite finie, par encadrement)

C'est le cas le plus utilisé en pratique. Si, à partir d'un certain rang :

$$u_n \leq w_n \leq v_n$$

et que $(u_n)$ et $(v_n)$ convergent **vers la même limite** $L$, alors $(w_n)$ converge aussi, et $\lim\limits_{n\to+\infty} w_n = L$.

**L'image qui donne son nom au théorème :** $w_n$ est encadrée par deux suites, comme un prisonnier entre deux gendarmes. Si les deux gendarmes convergent vers le même point $L$, le prisonnier coincé entre eux n'a pas d'autre choix que de finir au même endroit — il ne peut s'échapper ni à gauche, ni à droite.

**Pourquoi c'est vrai :** aussi petit que soit l'intervalle de tolérance autour de $L$, $u_n$ finit par y entrer, et $v_n$ aussi (chacune à partir d'un certain rang). Comme $w_n$ est coincée entre les deux, dès que $u_n$ et $v_n$ sont toutes deux dans l'intervalle, $w_n$ y est forcée aussi.

### Exemple travaillé

Étudions $w_n = \dfrac{\cos(n)}{n+1}$ pour $n \geq 0$.

**Ce qu'on cherche ici, et pourquoi ce geste :** calculer $\lim \cos(n)$ directement n'a pas de sens — $\cos(n)$ oscille sans jamais se stabiliser, il n'a pas de limite. Mais on n'a pas besoin de connaître son comportement précis : il suffit de savoir qu'il reste toujours encadré.

On sait que, pour tout $n$, $-1 \leq \cos(n) \leq 1$. Divisons par $n+1>0$ (ce qui conserve le sens des inégalités) :

$$\frac{-1}{n+1} \leq \frac{\cos(n)}{n+1} \leq \frac{1}{n+1}$$

Or $\lim\limits_{n\to+\infty} \dfrac{-1}{n+1} = 0$ et $\lim\limits_{n\to+\infty} \dfrac{1}{n+1} = 0$ : deux suites qui tendent vers la même limite, 0. Par le théorème des gendarmes :

$$\lim_{n\to+\infty} \frac{\cos(n)}{n+1} = 0$$

**Ce que ce résultat montre :** on a trouvé la limite d'une suite dont le comportement individuel ($\cos(n)$) est imprévisible, uniquement en l'encadrant par deux suites simples convergeant vers la même valeur.

### L'erreur à repérer

Utiliser le théorème des gendarmes avec un encadrement dont les deux bornes ne convergent **pas** vers la même limite (par exemple $u_n \to 0$ mais $v_n \to 1$). Dans ce cas, le théorème ne s'applique pas du tout, et on ne peut rien conclure sur $w_n$ par cette méthode. Il faut toujours vérifier que les deux bornes convergent, et vers la **même** valeur, avant d'invoquer le théorème.

---

## R7 — Le théorème de la limite monotone : convergence garantie, sans connaître la valeur

### Le problème que ce théorème résout

Les rungs précédents supposaient qu'on connaissait déjà (ou pouvait deviner) une limite pour comparer. Mais souvent, on veut d'abord savoir **si une suite converge du tout**, avant même de calculer combien vaut sa limite. C'est exactement le rôle de ce théorème.

### L'énoncé

- Toute suite **croissante et majorée** converge.
- Toute suite **décroissante et minorée** converge.

(Et, à l'inverse : une suite croissante et **non** majorée tend vers $+\infty$ ; une suite décroissante et non minorée tend vers $-\infty$.)

### Pourquoi c'est vrai (l'intuition)

Prends une suite décroissante et minorée par $m$ : $u_0 \geq u_1 \geq u_2 \geq \cdots \geq m$. Les termes descendent, descendent — mais ne peuvent jamais passer sous $m$. Une suite qui descend sans jamais pouvoir franchir un plancher ne peut pas descendre indéfiniment : elle est forcée de se rapprocher d'une valeur limite, en s'entassant juste au-dessus (ou exactement sur) un certain niveau qu'elle ne dépassera jamais vers le bas. (Une preuve rigoureuse de ce fait utilise la construction des nombres réels — hors programme ici ; on retient le résultat et l'intuition.)

**Le point capital à retenir :** ce théorème donne l'**existence** de la limite, mais **pas sa valeur**. Le minorant $m$ n'est en général **pas** la limite elle-même — c'est juste un plancher que la suite ne franchit pas, souvent bien en dessous de la vraie limite.

### Exemple travaillé : le réservoir converge

Reprenons $u_0=100$, $u_{n+1}=0{,}5\,u_n+10$. On a déjà établi :

- (R4) $(u_n)$ est décroissante ;
- (R3) $(u_n)$ est minorée par 20.

**Ce qu'on cherche ici, et pourquoi ce geste :** on a rassemblé exactement les deux hypothèses du théorème — décroissante et minorée. On peut donc conclure sans calcul supplémentaire.

Par le théorème de la limite monotone, $(u_n)$ converge vers une limite $L$, avec $L \geq 20$ (la limite ne peut pas descendre sous le minorant).

**Attention à l'erreur classique ici :** on sait que $(u_n)$ converge et que $L \geq 20$ — mais on ne sait **pas encore** que $L=20$. Rien dans ce théorème ne dit que la limite est exactement le minorant qu'on a utilisé. Trouver la valeur exacte de $L$ est une étape séparée : c'est l'objet du rung suivant.

---

## R8 — Suites du type $u_{n+1} = f(u_n)$ : trouver la valeur exacte de la limite

### Le geste manquant : passer à la limite dans la relation de récurrence

Le R7 nous dit que $(u_n)$ converge vers un certain $L$, mais ne dit pas combien vaut $L$. Comment trouver cette valeur ?

L'idée : la relation $u_{n+1} = f(u_n)$ reste vraie **pour tout $n$** — elle doit donc rester vraie « à la limite » aussi. Si $(u_n)$ converge vers $L$, alors $(u_{n+1})$ converge vers $L$ aussi (c'est la même suite, juste décalée d'un rang — décaler d'un rang ne change pas la limite). Et si $f$ est **continue**, alors $f(u_n)$ converge vers $f(L)$ quand $u_n$ converge vers $L$ (la continuité, c'est exactement la garantie que $f$ transporte la convergence : des entrées proches donnent des sorties proches).

En passant à la limite des deux côtés de $u_{n+1} = f(u_n)$ :

$$L = f(L)$$

$L$ est donc un **point fixe** de $f$ — une valeur que $f$ laisse inchangée. C'est une équation qu'on résout pour trouver $L$.

### Fermeture de l'arc : le réservoir, résolu

Reprenons $f(x) = 0{,}5x+10$. On cherche $L$ tel que $L=f(L)$ :

$$L = 0{,}5\,L + 10$$

$$L - 0{,}5\,L = 10$$

$$0{,}5\,L = 10$$

$$L = 20$$

Le réservoir se stabilise **exactement** à 20 — soit 20 000 litres — pas approximativement, exactement. C'est la réponse au mystère posé en R0 : ni vidange complète, ni débordement infini — une stabilisation précise, et on sait maintenant pourquoi cette valeur précise et pas une autre : c'est l'unique point fixe de la règle de mise à jour $f(x) = 0{,}5x+10$.

[[motion:escalier-pas-a-pas]]

[[figure:suite-escalier]]

### Vérifier avec la formule explicite (la technique de la suite auxiliaire)

On peut confirmer ce résultat par un calcul direct, sans passer par le théorème de convergence — en réutilisant l'idée du R2 (transformer en suite géométrique).

**Ce qu'on cherche ici, et pourquoi ce geste :** on pose une suite auxiliaire $v_n = u_n - L = u_n - 20$, précisément pour « recentrer » la suite sur son point fixe. L'espoir : que $(v_n)$ devienne géométrique, une famille qu'on sait déjà traiter complètement (R2, R5).

$$v_{n+1} = u_{n+1} - 20$$

$$v_{n+1} = (0{,}5\,u_n + 10) - 20 = 0{,}5\,u_n - 10$$

$$v_{n+1} = 0{,}5\,(u_n - 20) = 0{,}5\,v_n$$

$(v_n)$ est bien géométrique, de raison $0{,}5$, avec $v_0 = u_0 - 20 = 80$. Donc :

$$v_n = 80 \times 0{,}5^n$$

$$u_n = v_n + 20 = 20 + 80 \times 0{,}5^n$$

C'est la **formule explicite** de notre suite — on peut calculer $u_{100}$ directement, sans passer par les 100 étapes intermédiaires. Et sa limite se lit immédiatement avec les résultats du R5 : comme $-1 < 0{,}5 < 1$, $\lim\limits_{n\to+\infty} 0{,}5^n = 0$, donc :

$$\lim_{n\to+\infty} u_n = 20 + 80 \times 0 = 20$$

Les deux méthodes — théorème de convergence monotone + point fixe, et formule explicite via suite auxiliaire — donnent exactement la même réponse. C'est une bonne vérification croisée : si elles ne concordaient pas, on saurait qu'une erreur s'est glissée quelque part.

### La méthode complète, résumée

Pour une suite $u_{n+1} = f(u_n)$ :

1. Chercher un intervalle $I$ tel que $f(I) \subset I$ et $u_0 \in I$ — ça garantit, par récurrence (R1), que tous les $u_n \in I$, donc que la suite est bornée dans $I$.
2. Étudier le signe de $f(x)-x$ sur $I$ pour déterminer la monotonie (R4).
3. Conclure la convergence par le théorème de la limite monotone (R7) — bornée + monotone.
4. Résoudre $L = f(L)$ pour trouver la valeur de la limite (ce rung), à condition que $f$ soit continue.

### L'erreur à repérer

Résoudre $L=f(L)$ **sans avoir d'abord établi que la suite converge**. L'équation $L=f(L)$ peut avoir une solution parfaitement valide même si la suite ne converge pas du tout (elle pourrait osciller, diverger vers l'infini…). Le point fixe donne la valeur *si* la limite existe — il ne prouve jamais, à lui seul, qu'elle existe. Il faut toujours établir la convergence en premier (via R7, ou tout autre argument), et seulement ensuite chercher la valeur via le point fixe.

---

## R9 — Suites adjacentes

### Le problème : encadrer une limite qu'on ne sait pas calculer directement

Parfois, on ne dispose ni d'une formule explicite ni d'une fonction $f$ pratique à étudier, mais on dispose de **deux** suites qui se rapprochent l'une de l'autre en se resserrant progressivement — comme un étau. C'est l'idée des suites adjacentes.

### La définition, en trois conditions

$(u_n)$ et $(v_n)$ sont **adjacentes** si :

- $(u_n)$ est croissante ;
- $(v_n)$ est décroissante ;
- $\lim\limits_{n\to+\infty} (v_n - u_n) = 0$.

**Pourquoi les trois conditions ensemble, et pas seulement la troisième :** on pourrait croire que « l'écart tend vers 0 » suffit à garantir que les deux suites convergent vers la même limite. C'est faux en général — deux suites peuvent voir leur écart tendre vers 0 tout en divergeant toutes les deux vers $+\infty$ ensemble (par exemple $u_n = n$ et $v_n = n + \frac{1}{n+1}$ : leur écart tend vers 0, mais aucune des deux ne converge). C'est la monotonie de chaque suite — l'une monte, l'autre descend, en se resserrant l'une vers l'autre comme un étau qui se ferme — qui garantit que les deux se stabilisent.

### Le théorème

Si $(u_n)$ et $(v_n)$ sont adjacentes, alors :

- elles convergent toutes les deux, **vers la même limite** $L$ ;
- pour tout $n$ : $u_n \leq L \leq v_n$ (la limite reste toujours encadrée entre les deux suites).

**Pourquoi ça marche :** on montre d'abord que, pour tout $n$, $u_n \leq v_n$ (l'étau ne se referme jamais en se croisant) : comme $(u_n)$ croît et $(v_n)$ décroît, si on avait $u_n > v_n$ à un rang $n$, l'écart $v_n - u_n$ serait négatif à ce rang, et resterait négatif ensuite — ce qui empêcherait l'écart de tendre vers 0. Donc $u_n \leq v_n$ pour tout $n$, ce qui donne : $(u_n)$ est majorée par $v_0$ (donc converge, par R7), et $(v_n)$ est minorée par $u_0$ (donc converge aussi, par R7). Notons $L_u$ et $L_v$ leurs limites respectives. Comme $v_n-u_n \to 0$, et par les opérations sur les limites (R5), $L_v - L_u = 0$ : les deux limites sont égales.

### Exemple travaillé

Considérons $u_n = -\dfrac{1}{n+1}$ et $v_n = \dfrac{1}{n+1}$, pour $n \geq 0$.

**Ce qu'on cherche ici, et pourquoi ce geste :** vérifier les trois conditions une par une, dans l'ordre de la définition, plutôt que deviner le résultat.

- $(u_n)$ est croissante : $u_{n+1} - u_n = -\dfrac{1}{n+2} + \dfrac{1}{n+1} = \dfrac{1}{n+1} - \dfrac{1}{n+2} > 0$ (le dénominateur le plus petit donne la fraction la plus grande). ✓
- $(v_n)$ est décroissante : $v_{n+1} - v_n = \dfrac{1}{n+2} - \dfrac{1}{n+1} < 0$, par le même argument. ✓
- $v_n - u_n = \dfrac{1}{n+1} - \left(-\dfrac{1}{n+1}\right) = \dfrac{2}{n+1} \to 0$ quand $n \to +\infty$. ✓

Les trois conditions sont vérifiées : $(u_n)$ et $(v_n)$ sont adjacentes. Elles convergent donc vers la même limite — ici, on le voit directement, $L=0$ (les deux suites tendent vers 0, chacune depuis son côté), et on a bien, pour tout $n$, $u_n \leq 0 \leq v_n$.

### L'erreur à repérer

Conclure que deux suites sont adjacentes en vérifiant seulement que l'écart tend vers 0, sans vérifier la monotonie de chacune (ou en la vérifiant dans le mauvais sens — par exemple les deux croissantes). Les trois conditions sont **toutes** nécessaires ; en particulier, oublier de vérifier que l'une croît **pendant que** l'autre décroît laisse ouverte la possibilité que les deux suites divergent ensemble tout en se rapprochant l'une de l'autre.

---

## R10 — Pour t'entraîner

Tu as maintenant tous les outils du chapitre : récurrence, majoration/minoration, monotonie, théorème de la limite monotone, passage à la limite dans une relation $u_{n+1}=f(u_n)$, suite auxiliaire géométrique. Voici un exercice qui les enchaîne, dans l'esprit d'un exercice de bac — un exercice d'entraînement original, construit pour ce chapitre, pas un sujet officiel. Cherche chaque question sur papier avant de lire le raisonnement.

**Énoncé.** On considère la suite $(u_n)$ définie par $u_0 = 4$ et, pour tout entier $n$ :

$$u_{n+1} = \frac{1}{3}\,u_n + 4$$

1. Montrer par récurrence que, pour tout entier $n$, $u_n < 6$.
2. Montrer que $(u_n)$ est croissante.
3. Justifier que $(u_n)$ converge, et déterminer sa limite $L$.
4. On pose $v_n = u_n - 6$ pour tout $n$. Montrer que $(v_n)$ est géométrique, préciser sa raison et son premier terme, puis donner l'expression de $u_n$ en fonction de $n$.
5. Retrouver la limite de $(u_n)$ à partir de l'expression obtenue à la question 4.

**Raisonnement à voix haute.**

**Question 1.** Récurrence encore une fois — initialisation puis hérédité.

Initialisation : $u_0 = 4 < 6$. Vrai.

Hérédité : supposons $u_n < 6$ pour un rang $n$ fixé.

$$u_n < 6 \implies \frac{1}{3}u_n < 2 \implies \frac{1}{3}u_n + 4 < 6$$

Donc $u_{n+1} < 6$. Par récurrence, $u_n < 6$ pour tout $n$.

**Question 2.** On calcule la différence, en la factorisant pour faire apparaître le résultat de la question 1 — exactement le geste du R4 :

$$u_{n+1} - u_n = \left(\frac{1}{3}u_n+4\right) - u_n = 4 - \frac{2}{3}u_n$$

$$u_{n+1} - u_n = \frac{2}{3}(6-u_n)$$

D'après la question 1, $u_n < 6$, donc $6-u_n>0$, donc $u_{n+1}-u_n>0$ : $(u_n)$ est strictement croissante.

**Question 3.** On a réuni les deux hypothèses du théorème de la limite monotone (R7) : $(u_n)$ est croissante (question 2) et majorée par 6 (question 1). Donc $(u_n)$ converge vers une limite $L$, avec $L \leq 6$.

Pour trouver $L$ : la fonction $f(x) = \frac{1}{3}x+4$ est continue, donc on passe à la limite dans $u_{n+1}=f(u_n)$ (R8) :

$$L = \frac{1}{3}L+4$$

$$\frac{2}{3}L = 4$$

$$L = 6$$

**Question 4.**

$$v_{n+1} = u_{n+1} - 6 = \left(\frac{1}{3}u_n+4\right) - 6 = \frac{1}{3}u_n - 2$$

$$v_{n+1} = \frac{1}{3}(u_n-6) = \frac{1}{3}v_n$$

$(v_n)$ est géométrique de raison $\frac{1}{3}$, avec $v_0 = u_0-6 = 4-6 = -2$. Donc $v_n = -2 \times \left(\frac{1}{3}\right)^n$, et :

$$u_n = v_n+6 = 6 - 2\times\left(\frac{1}{3}\right)^n$$

**Question 5.** Comme $-1 < \frac{1}{3} < 1$, $\lim\limits_{n\to+\infty} \left(\frac{1}{3}\right)^n = 0$ (R5), donc :

$$\lim_{n\to+\infty} u_n = 6 - 2\times 0 = 6$$

On retrouve exactement $L=6$ trouvé à la question 3 — les deux méthodes concordent, ce qui confirme le résultat.

---

**À toi, sans corrigé.**

1. Soit $(w_n)$ définie par $w_0 = 1$ et $w_{n+1} = \dfrac{1}{2}w_n + 3$ pour tout $n$. Montre que $(w_n)$ est croissante et majorée par 6, justifie sa convergence, puis calcule sa limite de deux façons : par le point fixe, et via la suite auxiliaire $t_n = w_n - 6$.
2. Soit $(a_n)$ et $(b_n)$ définies par $a_n = 2 - \dfrac{1}{n+1}$ et $b_n = 2 + \dfrac{3}{(n+1)^2}$. Montre que $(a_n)$ et $(b_n)$ sont adjacentes, et donne leur limite commune.

<!-- Notes pour la relecture humaine (points d'incertitude, non bloquants) :
     (1) Le degré de formalisme attendu pour la définition de la limite
     (voisinage / epsilon-N) au R5 est aligné sur les manuels SM usuels,
     mais le cadre de référence exact (nom officiel « théorème de la limite
     monotone » vs « théorème de convergence monotone », ordre d'introduction
     suites arithmétiques/géométriques vs récurrence) reste à confirmer par
     research-lead / le cadre CNC avant validation finale.
     (2) Cette notion est rédigée au niveau SM (les 9 sous-thèmes du
     périmètre demandé, y compris suites adjacentes et le théorème des
     gendarmes, sont typiquement SM ; PC/SVT couvrent une version allégée).
     Si cette leçon doit aussi servir PC/SVT, une passe de calibrage de
     profondeur sera nécessaire. -->
