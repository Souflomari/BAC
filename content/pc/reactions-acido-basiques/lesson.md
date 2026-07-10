# Réactions acido-basiques

---

## R0 — Accroche : deux acides, une même concentration, deux pH différents

Imagine que le laboratoire te confie deux béchers, préparés avec le même soin. Étiquette du premier : acide chlorhydrique, concentration $c = 1{,}0 \times 10^{-2}\ \text{mol/L}$. Étiquette du second : acide éthanoïque — celui du vinaigre — exactement à la même concentration, $c = 1{,}0 \times 10^{-2}\ \text{mol/L}$. Même formule chimique de départ pour le mot « acide », même concentration au dixième de millimole près.

Avant de plonger la sonde pH dans chaque bécher, prends position : est-ce que les deux solutions vont afficher le même pH ? Après tout, c'est la même concentration du même type d'espèce — un acide. Engage-toi sur une réponse avant de continuer.

Voici ce qu'affiche réellement la sonde :

- Bécher 1 (acide chlorhydrique) : $\text{pH} = 2{,}0$.
- Bécher 2 (acide éthanoïque) : $\text{pH} = 3{,}4$.

Un écart net — plus d'une unité de pH, ce qui, tu le verras vite, représente un facteur d'environ 25 sur la quantité d'ions présents en solution. Deux acides, exactement la même concentration apportée, et pourtant deux acidités mesurées très différentes.

Si tu avais prédit un pH identique, l'écart est justement ce qu'on va comprendre. Si tu avais deviné une différence, la vraie question commence maintenant : **qu'est-ce qui, à concentration égale, rend un acide plus acide qu'un autre ?** Ce n'est manifestement pas la concentration — elle est identique dans les deux béchers. Il doit exister une propriété propre à chaque acide, indépendante de la quantité qu'on en dissout. Toute cette leçon construit les outils pour nommer cette propriété, la mesurer, et l'utiliser — et on refermera la boucle sur ces deux béchers avant la fin.

---

## R1 — Le mécanisme : le transfert de proton, acide et base selon Brønsted

### Une définition qui tient sur une phrase, pour deux rôles

Un **acide**, au sens de Brønsted, est une espèce chimique capable de **céder un proton $H^+$**. Une **base** est une espèce capable de **capter un proton $H^+$**. C'est tout — pas de couleur, pas de goût, pas de « brûlure » : uniquement cette capacité à donner ou recevoir un proton.

Ces deux rôles ne sont jamais isolés : à chaque acide correspond la base qui reste quand il a cédé son proton, et réciproquement. On appelle ce duo un **couple acide/base**, noté $AH/A^-$ (ou $BH^+/B$ si l'acide est chargé positivement), et on le décrit par une **demi-équation** :

$$AH \rightleftharpoons A^- + H^+$$

Le symbole $\rightleftharpoons$ n'est pas cosmétique : il signifie que la transformation peut se faire dans les deux sens, selon ce que l'espèce rencontre en face d'elle. $AH$ est l'acide du couple ; $A^-$ en est la **base conjuguée**.

### Pourquoi on ne peut jamais écrire une demi-équation toute seule

Voici le point qui structure tout le reste de ce chapitre, et qui devrait te rappeler quelque chose : en solution aqueuse, **il n'existe pas de proton libre** — exactement comme il n'existe pas d'électron libre en solution, dans les réactions d'oxydoréduction que tu connais déjà. Un $H^+$ ne flotte pas tout seul entre deux molécules : il doit être immédiatement capté par une base, au moment même où un acide le cède.

Une réaction acido-basique est donc toujours la **rencontre de deux couples** : l'acide de l'un cède son proton à la base de l'autre. On additionne les deux demi-équations — l'une écrite dans le sens où l'acide cède le proton, l'autre dans le sens où la base le capte — et, comme pour les électrons en oxydoréduction, le $H^+$ échangé s'annule exactement dans la somme.

### Exemple travaillé : l'ion ammonium face à l'eau

Prenons le couple $NH_4^+/NH_3$ (l'ion ammonium et l'ammoniac). L'ion ammonium peut céder un proton :

$$NH_4^+ \rightleftharpoons NH_3 + H^+ \qquad \text{(1)}$$

*Ce qu'on cherche ici, et pourquoi ce geste :* pour que ce proton parte quelque part, il faut une base prête à le capter. L'eau peut jouer ce rôle : elle appartient au couple $H_3O^+/H_2O$, et dans ce couple, c'est $H_2O$ la base — elle capte un proton pour donner l'acide $H_3O^+$. On écrit donc cette demi-équation dans le sens où $H_2O$ capte le proton, c'est-à-dire l'inverse du sens habituel d'écriture du couple :

$$H_2O + H^+ \rightleftharpoons H_3O^+ \qquad \text{(2)}$$

On additionne (1) et (2), membre à membre :

$$NH_4^+ + H_2O + H^+ \rightleftharpoons NH_3 + H^+ + H_3O^+$$

Le $H^+$ apparaît une fois de chaque côté : il s'annule, exactement comme les électrons s'annulaient dans l'équation d'oxydoréduction du chapitre sur les transformations lentes et rapides. Il reste :

$$NH_4^+ + H_2O \rightleftharpoons NH_3 + H_3O^+$$

C'est l'équation d'une réaction acido-basique complète : l'ion ammonium (acide du couple 1) a cédé son proton à l'eau (base du couple 2), donnant l'ammoniac (base du couple 1) et l'ion oxonium $H_3O^+$ (acide du couple 2).

### Un détail qui va tout changer dans les rungs suivants : l'eau joue les deux rôles

Regarde bien ce qu'on vient de faire : on a utilisé l'eau comme **base**, dans le couple $H_3O^+/H_2O$. Mais l'eau appartient aussi à un second couple, $H_2O/HO^-$, où cette fois c'est elle l'**acide** :

$$H_2O \rightleftharpoons HO^- + H^+$$

Une espèce qui peut jouer le rôle d'acide dans un couple et de base dans un autre s'appelle un **ampholyte** (ou espèce amphotère). L'eau en est l'exemple le plus important du programme — et cette double identité est précisément ce qui va nous permettre, au rung suivant après la mesure du pH, de construire la réaction de l'eau avec elle-même.

Vérifie ta compréhension avant d'avancer : identifie l'acide et la base dans le couple $HCOOH/HCOO^-$ (acide méthanoïque et ion méthanoate), puis écris la demi-équation correspondante avant de lire la suite.

[[figure:transfert-proton-ammonium]]

---

## R2 — Mesurer l'acidité : le pH

### Pourquoi ne pas simplement annoncer $[H_3O^+]$ en mol/L ?

L'acidité d'une solution est directement liée à la quantité d'ions oxonium $H_3O^+$ qu'elle contient : plus $[H_3O^+]$ est grand, plus la solution est acide. On pourrait s'arrêter là et annoncer directement cette concentration. Mais regarde l'étendue réelle des valeurs rencontrées en solution aqueuse : d'environ $1\ \text{mol/L}$ dans un acide concentré à $10^{-14}\ \text{mol/L}$ dans une base concentrée — quatorze ordres de grandeur. Manipuler des nombres comme $0{,}000\,000\,000\,1$ à la main, ou comparer $3{,}2 \times 10^{-5}$ à $7{,}9 \times 10^{-8}$ d'un coup d'oeil, n'a rien de pratique.

Le logarithme décimal résout exactement ce problème : il transforme une plage de quatorze ordres de grandeur en une échelle de nombres simples, de $0$ à $14$ environ. C'est pour ça qu'on définit le **pH** :

$$\text{pH} = -\log[H_3O^+]$$

où $[H_3O^+]$ est exprimée en mol/L. Le signe « moins » n'est pas un détail : sans lui, une solution très acide (grand $[H_3O^+]$) aurait un $\log$ grand, donc un « pH » grand — ce qui inverserait le sens intuitif de l'échelle. Avec le signe moins, une concentration élevée en $H_3O^+$ donne un $\log[H_3O^+]$ élevé, donc un $-\log[H_3O^+]$ **petit**. Retiens bien ce sens : **plus la solution est acide, plus $[H_3O^+]$ est grand, et plus le pH est petit.**

### Retrouver $[H_3O^+]$ à partir du pH

La relation se retourne, en appliquant $10^{(\cdot)}$ aux deux membres :

$$\text{pH} = -\log[H_3O^+]$$

$$\Longrightarrow \quad 10^{-\text{pH}} = 10^{\log[H_3O^+]}$$

$$\Longrightarrow \quad [H_3O^+] = 10^{-\text{pH}}$$

La deuxième ligne utilise le fait que $10^{\log x} = x$ : élever $10$ à la puissance du logarithme d'un nombre redonne ce nombre. C'est cette propriété, et elle seule, qui permet de « défaire » le logarithme.

### Exemple travaillé : passer d'un sens à l'autre

*Ce qu'on cherche ici, et pourquoi ce geste :* une solution a $[H_3O^+] = 2{,}0 \times 10^{-3}\ \text{mol/L}$. On veut son pH. On décompose le logarithme d'un produit en somme de logarithmes plutôt que de sortir directement une calculatrice à l'aveugle — c'est ce qui rend le résultat vérifiable à la main :

$$\log(2{,}0 \times 10^{-3}) = \log(2{,}0) + \log(10^{-3}) \approx 0{,}30 - 3 = -2{,}70$$

$$\text{pH} = -\log[H_3O^+] = -(-2{,}70) = 2{,}70$$

Et dans l'autre sens : une solution a un pH mesuré de $5{,}2$. On veut $[H_3O^+]$. On décompose l'exposant en partie entière et partie décimale, pour pouvoir estimer $10^{0{,}8}$ sans calculatrice (on sait que $10^{0{,}8}$ est proche de $6{,}3$) :

$$[H_3O^+] = 10^{-5{,}2} = 10^{-6} \times 10^{0{,}8} \approx 10^{-6} \times 6{,}3 = 6{,}3 \times 10^{-6}\ \text{mol/L}$$

Dans les deux sens, la même règle : décomposer plutôt que deviner.

---

## R3 — L'eau se dédouble : le produit ionique $K_e$

### Construire la réaction de l'eau sur elle-même

Tu as vu au rung précédent que l'eau est un ampholyte : elle est base dans le couple $H_3O^+/H_2O$, et acide dans le couple $H_2O/HO^-$. Rien n'empêche alors une molécule d'eau de céder un proton... à une *autre* molécule d'eau. C'est exactement la même construction qu'à l'exemple travaillé du rung 1 : on additionne les deux demi-équations et le $H^+$ s'annule.

Une molécule d'eau joue l'acide (elle cède un proton) :

$$H_2O \rightleftharpoons HO^- + H^+ \qquad \text{(1)}$$

Une autre molécule d'eau joue la base (elle capte ce proton) :

$$H_2O + H^+ \rightleftharpoons H_3O^+ \qquad \text{(2)}$$

En additionnant (1) et (2), le $H^+$ s'annule des deux côtés :

$$2\,H_2O \rightleftharpoons H_3O^+ + HO^-$$

C'est l'**autoprotolyse de l'eau** : dans **toute** solution aqueuse — même de l'eau pure, même en présence d'un acide ou d'une base — cette réaction a lieu, produisant en permanence un peu de $H_3O^+$ et de $HO^-$.

### Le produit ionique de l'eau : une constante, pas une coïncidence

Fait expérimental central : dans une solution aqueuse, quelle qu'elle soit, à une température donnée, le produit $[H_3O^+] \times [HO^-]$ garde **toujours la même valeur**. On l'appelle le **produit ionique de l'eau**, noté $K_e$ :

$$K_e = [H_3O^+] \times [HO^-]$$

À $25\,^\circ\text{C}$, ce produit vaut $K_e = 1{,}0 \times 10^{-14}$ (grandeur sans unité, par convention). On définit, sur le même principe que le pH, $pK_e = -\log K_e$, ce qui donne à $25\,^\circ\text{C}$ :

$$pK_e = 14$$

Que $[H_3O^+]$ et $[HO^-]$ varient énormément d'une solution à l'autre, leur produit, lui, ne bouge pas (à température fixée) : si l'un augmente, l'autre diminue dans les mêmes proportions, pour que le produit reste constant.

### Solution neutre, acide, basique : d'où vient la frontière à pH $= 7$

Dans une solution **neutre** — ni acide ni basique — les deux espèces issues exclusivement de l'autoprotolyse de l'eau sont produites à parts égales : $[H_3O^+] = [HO^-]$. Combine cette égalité avec la définition de $K_e$ :

$$K_e = [H_3O^+] \times [HO^-] = [H_3O^+]^2$$

$$[H_3O^+] = \sqrt{K_e} = \sqrt{10^{-14}} = 10^{-7}\ \text{mol/L}$$

$$\text{pH} = -\log(10^{-7}) = 7$$

Voilà d'où vient le fameux « pH $= 7$ » : ce n'est pas une convention arbitraire, c'est la conséquence directe de $K_e = 10^{-14}$ à $25\,^\circ\text{C}$, combinée à la condition $[H_3O^+] = [HO^-]$ qui définit la neutralité.

On classe ensuite n'importe quelle solution, à $25\,^\circ\text{C}$, en comparant $[H_3O^+]$ à $[HO^-]$ — ou, ce qui revient au même, en comparant le pH à $7$ :

- **Solution acide :** $[H_3O^+] > [HO^-]$, donc $\text{pH} < 7$.
- **Solution neutre :** $[H_3O^+] = [HO^-]$, donc $\text{pH} = 7$.
- **Solution basique :** $[H_3O^+] < [HO^-]$, donc $\text{pH} > 7$.

### Teste l'idée avant de la croire : « pH petit, c'est plus faible, donc plus basique »

Voici une confusion fréquente, et elle mérite d'être affrontée directement : un pH petit donne l'impression d'un nombre « faible », donc de quelque chose de peu marqué — et certains en concluent qu'un pH bas correspondrait à une solution basique, ou en tout cas peu acide.

Reviens à la mécanique du rung précédent. Le pH n'est pas $[H_3O^+]$ lui-même : c'est $-\log[H_3O^+]$, avec ce signe moins qui **inverse** le sens de variation. Une solution très acide a un $[H_3O^+]$ **grand** — mais justement à cause du signe moins, son pH est **petit**. Le nombre « petit » que tu lis sur l'échelle ne signifie donc pas « peu d'acidité » : il signifie « beaucoup de $H_3O^+$ », donc **beaucoup** d'acidité. pH petit et acidité forte vont dans le même sens, pas dans des sens opposés.

Vérifie sur un exemple chiffré : une solution à $\text{pH} = 2$ a $[H_3O^+] = 10^{-2}\ \text{mol/L}$ ; une solution à $\text{pH} = 9$ a $[H_3O^+] = 10^{-9}\ \text{mol/L}$ — un million de fois moins. La solution au pH le plus **petit** est donc bien celle qui contient le **plus** de $H_3O^+$ : c'est elle la plus acide, pas la plus basique.

### Exemple travaillé

*Ce qu'on cherche ici, et pourquoi ce geste :* on mesure, dans une solution à $25\,^\circ\text{C}$, $[HO^-] = 1{,}0 \times 10^{-5}\ \text{mol/L}$. On veut le pH, et la nature de la solution. On passe par $K_e$, qui relie directement les deux concentrations :

$$[H_3O^+] = \frac{K_e}{[HO^-]} = \frac{10^{-14}}{10^{-5}} = 10^{-9}\ \text{mol/L}$$

$$\text{pH} = -\log(10^{-9}) = 9$$

$\text{pH} = 9 > 7$ : la solution est **basique** — cohérent avec $[HO^-] = 10^{-5} > [H_3O^+] = 10^{-9}$, l'hydroxyde y est bien plus abondant que l'oxonium.

[[figure:echelle-acide-neutre-basique]]

---

## R4 — La constante d'acidité $K_A$ et le $pK_A$ d'un couple

### Rappel express : quotient de réaction et constante d'équilibre

Beaucoup de réactions, en solution, ne vont pas jusqu'au bout : réactifs et produits coexistent dans un état d'**équilibre chimique**. Pour décrire où en est une réaction à un instant donné, on utilise le **quotient de réaction** $Q_r$, construit à partir des concentrations présentes à cet instant. Fait essentiel : quand la réaction atteint l'équilibre, ce quotient cesse de varier et se fige à une valeur bien précise, qui ne dépend que de la température — c'est la **constante d'équilibre**, notée $K$, propre à la réaction considérée.

### Appliquer cette idée à un couple acide/base : définir $K_A$

Applique ce principe à la réaction d'un acide $AH$ avec l'eau, construite exactement comme au rung 1 :

$$AH + H_2O \rightleftharpoons A^- + H_3O^+$$

Le quotient de cette réaction, une fois l'équilibre atteint, se fige à une valeur constante (à température fixée), spécifique du couple $AH/A^-$ : on l'appelle la **constante d'acidité** du couple, notée $K_A$ :

$$K_A = \frac{[A^-]_{eq} \times [H_3O^+]_{eq}}{[AH]_{eq}}$$

($K_A$ est une grandeur sans unité, par la même convention que pour $K_e$.) Et, sur le même principe que le pH et le $pK_e$ :

$$pK_A = -\log K_A$$

### Ce que $K_A$ (ou $pK_A$) raconte sur un couple

Regarde ce que dit la formule : $K_A$ compare la quantité de produits ($A^-$ et $H_3O^+$) à la quantité de réactif restant ($AH$), une fois l'équilibre atteint.

- $K_A$ **grand** (donc $pK_A$ petit, voire négatif) : à l'équilibre, $A^-$ et $H_3O^+$ dominent largement — l'acide $AH$ a cédé son proton presque entièrement. C'est un acide qui « lâche facilement » son proton : un acide **fort**.
- $K_A$ **petit** (donc $pK_A$ grand) : à l'équilibre, $AH$ domine encore largement — l'acide a très peu réagi avec l'eau. C'est un acide qui retient son proton : un acide **faible**.

### Teste l'idée avant de la croire : « $K_A$ grand veut dire $pK_A$ grand »

C'est une confusion à surveiller de près, et elle a la même racine que celle du rung précédent sur le pH : $pK_A = -\log K_A$ contient un logarithme **et** un signe moins, donc $pK_A$ ne varie pas dans le même sens que $K_A$ — il varie dans le sens **opposé**.

Vérifie-le sur deux couples concrets : un couple avec $K_A = 10^{-2}$ a $pK_A = 2$ ; un couple avec $K_A = 10^{-9}$ a $pK_A = 9$. Le premier couple a le $K_A$ le plus **grand** ($10^{-2} > 10^{-9}$) et pourtant le $pK_A$ le plus **petit** ($2 < 9$). $K_A$ grand va avec $pK_A$ petit — exactement comme $[H_3O^+]$ grand va avec pH petit. C'est le même mécanisme logarithmique qui inverse le sens de variation dans les deux cas.

### Exemple travaillé : retrouver $K_A$ et $pK_A$ à partir d'une mesure de pH

Reprends le bécher 2 de l'accroche : une solution d'acide éthanoïque $CH_3COOH$, de concentration apportée $c = 1{,}0 \times 10^{-2}\ \text{mol/L}$, dont le pH mesuré est $3{,}4$.

*Ce qu'on cherche ici, et pourquoi ce geste :* on veut $K_A$ du couple $CH_3COOH/CH_3COO^-$. Il faut d'abord reconstituer les trois concentrations à l'équilibre à partir des deux seules données dont on dispose : le pH et $c$.

D'abord, $[H_3O^+]_{eq}$, directement à partir du pH :

$$[H_3O^+]_{eq} = 10^{-3{,}4} \approx 4{,}0 \times 10^{-4}\ \text{mol/L}$$

Ensuite, $[CH_3COO^-]_{eq}$ : la réaction $CH_3COOH + H_2O \rightleftharpoons CH_3COO^- + H_3O^+$ produit $CH_3COO^-$ et $H_3O^+$ en quantités égales. En négligeant la contribution de l'autoprotolyse de l'eau devant celle, bien plus grande, de l'acide (hypothèse valable ici car $[H_3O^+]_{eq}$ est très supérieure à $10^{-7}\ \text{mol/L}$) :

$$[CH_3COO^-]_{eq} \approx [H_3O^+]_{eq} \approx 4{,}0 \times 10^{-4}\ \text{mol/L}$$

Enfin, $[CH_3COOH]_{eq}$ : ce qu'il reste de l'acide initial, une fois retirée la part qui a réagi (dont la trace est justement la quantité de $H_3O^+$ formée) :

$$[CH_3COOH]_{eq} \approx c - [H_3O^+]_{eq} = 1{,}0 \times 10^{-2} - 4{,}0 \times 10^{-4} \approx 9{,}6 \times 10^{-3}\ \text{mol/L}$$

On calcule enfin $K_A$ :

$$K_A = \frac{[CH_3COO^-]_{eq} \times [H_3O^+]_{eq}}{[CH_3COOH]_{eq}} = \frac{(4{,}0 \times 10^{-4})^2}{9{,}6 \times 10^{-3}} \approx 1{,}7 \times 10^{-5}$$

$$pK_A = -\log(1{,}7 \times 10^{-5}) \approx 4{,}8$$

Garde ces deux valeurs — $pK_A \approx 4{,}8$ pour le couple $CH_3COOH/CH_3COO^-$ — elles reviennent dans les rungs suivants.

---

## R5 — Qui prédomine ? Le diagramme de prédominance

### D'où sort le rapport $[A^-]/[AH]$

Reprends la définition de $K_A$, et isole le rapport des deux formes du couple :

$$K_A = \frac{[A^-][H_3O^+]}{[AH]}$$

$$\frac{[A^-]}{[AH]} = \frac{K_A}{[H_3O^+]}$$

Passe au logarithme des deux côtés — c'est ce qui va faire apparaître le pH et le $pK_A$ directement :

$$\log\left(\frac{[A^-]}{[AH]}\right) = \log K_A - \log[H_3O^+]$$

$$\log\left(\frac{[A^-]}{[AH]}\right) = \text{pH} - pK_A$$

Ce qu'on cherche ici, et pourquoi ce geste : cette dernière ligne dit que le rapport des deux formes du couple ne dépend que de **l'écart** entre le pH de la solution et le $pK_A$ du couple — rien d'autre.

### Trois zones, une frontière

En reprenant $10^{(\cdot)}$ des deux côtés, $\dfrac{[A^-]}{[AH]} = 10^{\text{pH} - pK_A}$. Trois cas :

- **$\text{pH} = pK_A$ :** l'exposant est nul, le rapport vaut $1$ : $[A^-] = [AH]$. C'est la frontière — les deux formes coexistent à parts égales.
- **$\text{pH} > pK_A$ :** l'exposant est positif, le rapport dépasse $1$ : $[A^-] > [AH]$. La **base** $A^-$ **prédomine**.
- **$\text{pH} < pK_A$ :** l'exposant est négatif, le rapport est inférieur à $1$ : $[A^-] < [AH]$. L'**acide** $AH$ **prédomine**.

| Zone de pH | Espèce prédominante |
|---|---|
| $\text{pH} < pK_A$ | $AH$ (forme acide) |
| $\text{pH} = pK_A$ | $[AH] = [A^-]$ (frontière) |
| $\text{pH} > pK_A$ | $A^-$ (forme basique) |

### Exemple travaillé

Prends le couple $NH_4^+/NH_3$, de $pK_A \approx 9{,}2$. À $\text{pH} = 7{,}0$ (proche de la neutralité), quelle espèce domine, et dans quelles proportions ?

*Ce qu'on cherche ici, et pourquoi ce geste :* $\text{pH} = 7{,}0 < pK_A = 9{,}2$, donc on s'attend déjà à ce que $NH_4^+$ (la forme acide) domine. On chiffre l'écart pour voir à quel point :

$$\frac{[NH_3]}{[NH_4^+]} = 10^{\text{pH} - pK_A} = 10^{7{,}0 - 9{,}2} = 10^{-2{,}2} \approx 6{,}3 \times 10^{-3}$$

Le rapport est très inférieur à $1$ : pour environ $160$ ions $NH_4^+$, on ne trouve qu'une seule molécule $NH_3$. À pH sanguin (voisin de $7{,}4$), l'azote de l'ammoniac circule donc presque exclusivement sous sa forme ionisée $NH_4^+$ — un exemple concret de ce que « prédominer » veut dire en pratique : pas « être seul », mais « écraser numériquement l'autre forme ».

[[figure:diagramme-predominance]]

---

## R6 — Force et concentration : deux choses différentes (retour à l'accroche)

### Refermer la question posée en R0

Reviens aux deux béchers de l'accroche : même concentration $c = 1{,}0 \times 10^{-2}\ \text{mol/L}$, et pourtant $\text{pH} = 2{,}0$ pour l'acide chlorhydrique contre $\text{pH} = 3{,}4$ pour l'acide éthanoïque. Tu as maintenant tous les outils pour comprendre pourquoi.

### Acide fort, acide faible : ce que ça veut dire pour la réaction avec l'eau

Un **acide fort** est un acide dont la réaction avec l'eau est **quasi totale** : pratiquement toutes les molécules $AH$ introduites cèdent leur proton. C'est le cas de l'acide chlorhydrique : dissous dans l'eau, $HCl$ réagit avec l'eau de façon quasi totale, $HCl + H_2O \rightarrow Cl^- + H_3O^+$ (on écrit ici une flèche simple, pas $\rightleftharpoons$, précisément parce que la réaction ne revient pratiquement pas en arrière). Résultat : $[H_3O^+]_{eq} \approx c$, la concentration en $H_3O^+$ est directement égale à la concentration apportée.

$$\text{pH} = -\log(c) = -\log(1{,}0 \times 10^{-2}) = 2{,}0$$

C'est exactement la valeur mesurée dans le bécher 1. Rien à ajuster : l'acide fort donne tout son proton, un point c'est tout.

Un **acide faible**, comme l'acide éthanoïque, ne réagit que **partiellement** avec l'eau : un équilibre s'installe, avec $[AH]_{eq}$ encore largement présent à la fin — c'est exactement ce que tu as calculé au rung 4, où $[CH_3COOH]_{eq} \approx 9{,}6 \times 10^{-3}\ \text{mol/L}$ restait très proche de $c$ tout entier. Beaucoup moins de $H_3O^+$ est produit qu'avec un acide fort à la même concentration, donc le pH est plus élevé : $3{,}4$ au lieu de $2{,}0$.

### Chiffrer « à quel point » la réaction a eu lieu : le taux d'avancement final $\tau$

On définit le **taux d'avancement final** d'une réaction :

$$\tau = \frac{x_f}{x_{max}}$$

où $x_f$ est l'avancement réellement atteint à l'équilibre, et $x_{max}$ l'avancement qu'on aurait si la réaction allait jusqu'au bout. $\tau$ est donc compris entre $0$ (rien ne s'est passé) et $1$ (réaction totale).

*Ce qu'on cherche ici, et pourquoi ce geste :* reprends l'acide éthanoïque du rung 4, dans un volume $V$. $x_{max}$ correspond à la disparition complète de l'acide introduit, soit $x_{max} = c \times V$. $x_f$ se lit sur la quantité de $H_3O^+$ réellement formée, $x_f \approx [H_3O^+]_{eq} \times V$. Le volume $V$ se simplifie dans le rapport :

$$\tau = \frac{x_f}{x_{max}} = \frac{[H_3O^+]_{eq} \times V}{c \times V} = \frac{[H_3O^+]_{eq}}{c} = \frac{4{,}0 \times 10^{-4}}{1{,}0 \times 10^{-2}} = 0{,}040$$

Seulement $4\,\%$ de l'acide éthanoïque introduit a effectivement réagi avec l'eau — le reste, $96\,\%$, est resté sous forme $CH_3COOH$ intacte. Pour un acide fort, ce même calcul donnerait $\tau \approx 1$ (réaction quasi totale, par définition).

### Teste l'idée avant de la croire : « cet acide est fort parce qu'il est concentré »

Voici la confusion qui se cache derrière l'accroche, et il faut la nommer clairement : la **force** d'un acide (son $K_A$, son $pK_A$, son $\tau$ face à l'eau) est une propriété de sa **nature chimique** — elle ne dépend, à une température donnée, que du couple auquel il appartient. La **concentration** $c$ décrit une tout autre chose : la quantité de matière qu'on a choisi de dissoudre dans un volume donné. Ce sont deux grandeurs indépendantes.

Prends un exemple qui casse l'intuition : une solution d'acide éthanoïque très concentrée (par exemple $c = 1{,}0\ \text{mol/L}$, du vinaigre pur presque non dilué) reste un acide **faible** — son $K_A$ ne change pas avec $c$, et une bonne partie de l'acide reste sous forme $CH_3COOH$ à l'équilibre, quelle que soit la quantité totale dissoute. À l'inverse, de l'acide chlorhydrique très dilué (par exemple $c = 1{,}0 \times 10^{-4}\ \text{mol/L}$) reste un acide **fort** — la réaction avec l'eau reste quasi totale, seule la quantité de $H_3O^+$ produite est faible parce qu'on est parti de peu. « Fort » qualifie un mécanisme (jusqu'où va la réaction avec l'eau), pas une quantité (combien on en a mis).

[[figure:fort-vs-faible-avancement]]

---

## R7 — Une réaction entre deux couples : constante d'équilibre et taux d'avancement final $\tau$

### Généraliser au-delà de la réaction avec l'eau

Jusqu'ici, chaque couple $AH/A^-$ a réagi avec l'eau. Mais rien n'oblige un acide à réagir spécifiquement avec l'eau : il peut céder son proton à **n'importe quelle base**, y compris la base d'un autre couple acide/base. Prends le couple 1, $A_1H/A_1^-$ (constante $K_{A1}$), et le couple 2, $A_2H/A_2^-$ (constante $K_{A2}$) : l'acide $A_1H$ du couple 1 réagit avec la base $A_2^-$ du couple 2 :

$$A_1H + A_2^- \rightleftharpoons A_1^- + A_2H$$

### Établir $K = K_{A1}/K_{A2}$

*Ce qu'on cherche ici, et pourquoi ce geste :* on veut la constante d'équilibre $K$ de cette réaction, sans repartir de zéro — en la reliant aux deux $K_A$ qu'on sait déjà écrire.

$$K = \frac{[A_1^-]_{eq}[A_2H]_{eq}}{[A_1H]_{eq}[A_2^-]_{eq}}$$

On réarrange le quotient en deux rapports séparés, un par couple :

$$K = \frac{[A_1^-]_{eq}}{[A_1H]_{eq}} \times \frac{[A_2H]_{eq}}{[A_2^-]_{eq}}$$

Le premier rapport vaut $K_{A1}/[H_3O^+]$ (directement depuis la définition de $K_{A1}$) ; le second vaut $[H_3O^+]/K_{A2}$ (depuis la définition de $K_{A2}$, inversée). En les multipliant, $[H_3O^+]$ se simplifie :

$$K = \frac{K_{A1}}{[H_3O^+]} \times \frac{[H_3O^+]}{K_{A2}} = \frac{K_{A1}}{K_{A2}}$$

$K$ ne dépend donc que des deux couples en présence — jamais du pH ni des concentrations. C'est ce qui en fait un outil de comparaison universel entre deux couples donnés.

### Ce que $K$ raconte : quasi total, ou limité ?

- $K \gg 1$ (typiquement $K_{A1} \gg K_{A2}$, c'est-à-dire $A_1H$ nettement plus fort qu'$A_2H$) : la réaction, telle qu'écrite, est **quasi totale** — $\tau$ proche de $1$. L'acide le plus fort impose son proton à la base la plus forte.
- $K \ll 1$ ($A_1H$ plus faible qu'$A_2H$) : la réaction reste très **limitée** dans le sens écrit — $\tau$ proche de $0$.
- $K$ proche de $1$ (couples de forces comparables) : ni totale ni négligeable — il faut vraiment résoudre le tableau d'avancement pour connaître $\tau$.

### Exemple travaillé 1 : une réaction quasi totale

Mélange de l'acide éthanoïque ($pK_{A1} = 4{,}8$) avec de l'ammoniac $NH_3$ (base du couple $NH_4^+/NH_3$, $pK_{A2} = 9{,}2$) :

$$CH_3COOH + NH_3 \rightleftharpoons CH_3COO^- + NH_4^+$$

$$K = \frac{K_{A1}}{K_{A2}} = 10^{pK_{A2} - pK_{A1}} = 10^{9{,}2 - 4{,}8} = 10^{4{,}4} \approx 2{,}5 \times 10^4$$

$K \gg 1$ : la réaction est quasi totale, $\tau \approx 1$. Sans surprise : l'acide éthanoïque ($pK_{A1} = 4{,}8$) est un acide bien plus fort que l'ion ammonium ($pK_{A2} = 9{,}2$), donc il impose son proton à l'ammoniac presque sans retour en arrière.

[[figure:zones-predominance-2]]

### Exemple travaillé 2 : une réaction limitée — calculer $\tau$ pour de vrai

Mélange, cette fois, de l'acide éthanoïque ($pK_{A1} = 4{,}8$) avec des ions méthanoate $HCOO^-$ (base du couple $HCOOH/HCOO^-$, $pK_{A2} \approx 3{,}8$) :

$$CH_3COOH + HCOO^- \rightleftharpoons CH_3COO^- + HCOOH$$

$$K = 10^{pK_{A2} - pK_{A1}} = 10^{3{,}8 - 4{,}8} = 10^{-1} = 0{,}10$$

$K$ n'est ni très grand ni très petit : il faut résoudre le tableau d'avancement. On introduit des quantités égales, $n_0 = 1{,}0 \times 10^{-3}\ \text{mol}$ de chaque réactif, dans un même volume $V = 0{,}100\ \text{L}$ :

| | $CH_3COOH$ | $HCOO^-$ | $CH_3COO^-$ | $HCOOH$ |
|---|---|---|---|---|
| État initial | $n_0$ | $n_0$ | $0$ | $0$ |
| À l'avancement $x$ | $n_0 - x$ | $n_0 - x$ | $x$ | $x$ |

*Ce qu'on cherche ici, et pourquoi ce geste :* les quantités initiales étant égales et le volume commun à toutes les espèces, le rapport des concentrations à l'équilibre est directement le rapport des quantités de matière — le volume se simplifie entièrement, et $K$ se retrouve sous la forme d'un carré parfait :

$$K = \frac{[CH_3COO^-]_{eq}[HCOOH]_{eq}}{[CH_3COOH]_{eq}[HCOO^-]_{eq}} = \frac{x^2}{(n_0 - x)^2}$$

Comme les deux membres sont des carrés, on peut prendre la racine carrée directement, ce qui évite de développer une équation du second degré complète :

$$\frac{x}{n_0 - x} = \sqrt{K} = \sqrt{0{,}10} \approx 0{,}316$$

$$x = 0{,}316\,(n_0 - x) \implies 1{,}316\,x = 0{,}316\,n_0 \implies x \approx 0{,}240\,n_0$$

Ici, $x_{max} = n_0$ (les deux réactifs, introduits en quantités égales, s'épuiseraient exactement ensemble si la réaction était totale). Donc :

$$\tau = \frac{x_f}{x_{max}} = \frac{0{,}240\,n_0}{n_0} = 0{,}240$$

Seulement $24\,\%$ d'avancement : bien moins que l'exemple 1, et c'est cohérent avec les deux $pK_A$ en présence — $4{,}8$ et $3{,}8$ ne diffèrent que d'une unité, deux acides de force assez proche, donc une réaction qui reste franchement partielle entre eux, sans favoriser massivement un camp.

---

## R8 — Pour t'entraîner

### Récapitulatif express

- **pH :** $\text{pH} = -\log[H_3O^+]$, donc $[H_3O^+] = 10^{-\text{pH}}$. Le signe moins inverse le sens : $[H_3O^+]$ grand $\Rightarrow$ pH petit.
- **Brønsted :** acide = donneur de proton, base = accepteur ; couple $AH/A^-$, demi-équation $AH \rightleftharpoons A^- + H^+$. Une réaction acido-basique combine toujours deux couples ; le $H^+$ s'annule dans la somme, comme les électrons en oxydoréduction. L'eau est un ampholyte : base dans $H_3O^+/H_2O$, acide dans $H_2O/HO^-$.
- **Produit ionique de l'eau :** $K_e = [H_3O^+][HO^-] = 10^{-14}$ à $25\,^\circ\text{C}$ ($pK_e = 14$). Neutre : $\text{pH} = 7$. Acide : $\text{pH} < 7$. Basique : $\text{pH} > 7$.
- **$K_A$ et $pK_A$ :** pour $AH + H_2O \rightleftharpoons A^- + H_3O^+$, $K_A = \dfrac{[A^-][H_3O^+]}{[AH]}$, $pK_A = -\log K_A$. $K_A$ grand $\Leftrightarrow$ $pK_A$ petit $\Leftrightarrow$ acide fort.
- **Diagramme de prédominance :** $\dfrac{[A^-]}{[AH]} = 10^{\text{pH} - pK_A}$. $\text{pH} > pK_A$ : $A^-$ prédomine. $\text{pH} < pK_A$ : $AH$ prédomine.
- **Force ≠ concentration :** la force ($K_A$, $\tau$ face à l'eau) est une propriété du couple ; la concentration $c$ est une quantité dissoute — deux grandeurs indépendantes.
- **Réaction entre deux couples :** $K = K_{A1}/K_{A2}$, indépendant du pH. $K \gg 1$ : réaction quasi totale ($\tau \approx 1$). $\tau = x_f/x_{max}$.

### Exercice de type bac (original — entraînement, non un sujet officiel)

On étudie une solution d'acide benzoïque $C_6H_5COOH$ (couple $C_6H_5COOH/C_6H_5COO^-$), de concentration apportée $c = 1{,}0 \times 10^{-2}\ \text{mol/L}$. Le pH mesuré de cette solution est $3{,}1$.

**1) Écris la demi-équation du couple $C_6H_5COOH/C_6H_5COO^-$, puis l'équation de la réaction de cet acide avec l'eau.**

*Ce qu'on cherche ici, et pourquoi ce geste :* on identifie d'abord l'acide et la base du couple, on écrit sa demi-équation, puis on la combine avec le couple de l'eau agissant comme base — exactement la construction du rung 1.

$$C_6H_5COOH \rightleftharpoons C_6H_5COO^- + H^+$$

$$C_6H_5COOH + H_2O \rightleftharpoons C_6H_5COO^- + H_3O^+$$

**2) Calcule $[H_3O^+]$ de cette solution, et détermine si elle est acide, basique ou neutre. Justifie à partir de la comparaison avec $[HO^-]$.**

*Ce qu'on cherche ici, et pourquoi ce geste :* on retrouve $[H_3O^+]$ depuis le pH, puis on compare au pH de neutralité établi au rung 3 — pas à une impression.

$$[H_3O^+] = 10^{-3{,}1} = 10^{-4} \times 10^{0{,}9} \approx 7{,}9 \times 10^{-4}\ \text{mol/L}$$

$\text{pH} = 3{,}1 < 7$, donc $[H_3O^+] > [HO^-]$ : la solution est **acide**.

**3) En négligeant la contribution de l'autoprotolyse de l'eau, calcule $K_A$ puis $pK_A$ du couple.**

*Ce qu'on cherche ici, et pourquoi ce geste :* même démarche qu'au rung 4 — reconstituer les trois concentrations à l'équilibre à partir du pH et de $c$, avant de former le quotient.

$$[C_6H_5COO^-]_{eq} \approx [H_3O^+]_{eq} \approx 7{,}9 \times 10^{-4}\ \text{mol/L}$$

$$[C_6H_5COOH]_{eq} \approx c - [H_3O^+]_{eq} \approx 1{,}0 \times 10^{-2} - 7{,}9 \times 10^{-4} \approx 9{,}2 \times 10^{-3}\ \text{mol/L}$$

$$K_A = \frac{(7{,}9 \times 10^{-4})^2}{9{,}2 \times 10^{-3}} \approx 6{,}8 \times 10^{-5} \qquad pK_A = -\log(6{,}8 \times 10^{-5}) \approx 4{,}2$$

**4) Calcule le taux d'avancement final $\tau$ de la réaction de cet acide avec l'eau. L'acide benzoïque est-il un acide fort ?**

*Ce qu'on cherche ici, et pourquoi ce geste :* $\tau$ se lit comme au rung 6, en comparant $[H_3O^+]_{eq}$ à la concentration apportée $c$.

$$\tau = \frac{[H_3O^+]_{eq}}{c} = \frac{7{,}9 \times 10^{-4}}{1{,}0 \times 10^{-2}} \approx 0{,}079$$

$\tau \approx 8\,\%$, très loin de $1$ : l'acide benzoïque est un acide **faible** — cohérent avec un $pK_A$ de $4{,}2$, ni très négatif ni proche de zéro.

**5) À $\text{pH} = 7{,}4$ (pH sanguin), quelle espèce du couple prédomine ? Donne un ordre de grandeur du rapport des deux concentrations.**

*Ce qu'on cherche ici, et pourquoi ce geste :* on compare le pH donné au $pK_A$ trouvé en question 3, exactement la logique du rung 5.

$$\frac{[C_6H_5COO^-]}{[C_6H_5COOH]} = 10^{\text{pH} - pK_A} = 10^{7{,}4 - 4{,}2} = 10^{3{,}2} \approx 1\,585$$

$\text{pH} = 7{,}4 \gg pK_A = 4{,}2$ : la base conjuguée $C_6H_5COO^-$ (l'ion benzoate) prédomine très largement — pour une molécule $C_6H_5COOH$ restante, on compte environ $1\,585$ ions $C_6H_5COO^-$.

### À toi

**Variation 1.** Le couple $HCOOH/HCOO^-$ a pour $pK_A \approx 3{,}8$. Une solution de ce couple a un pH de $5{,}5$. Quelle espèce prédomine ? Calcule le rapport $[HCOO^-]/[HCOOH]$ à ce pH, et donne un ordre de grandeur du pourcentage de méthanoate sous forme ionisée.

**Variation 2.** On mélange, en quantités égales, de l'acide benzoïque ($C_6H_5COOH$, $pK_A = 4{,}2$) et des ions éthanoate ($CH_3COO^-$, base du couple $CH_3COOH/CH_3COO^-$, $pK_A = 4{,}8$). Écris l'équation de la réaction entre ces deux espèces, calcule sa constante d'équilibre $K$, puis dis — sans résoudre le tableau d'avancement en entier — si tu attends un taux d'avancement final $\tau$ plutôt proche de $1$, proche de $0$, ou proche de $0{,}5$. Justifie uniquement à partir de la valeur de $K$ et des deux $pK_A$ en présence.
