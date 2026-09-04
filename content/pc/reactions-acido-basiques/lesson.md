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

### Un détail qui va tout changer dans les chapitres suivants : l'eau joue les deux rôles

Regarde bien ce qu'on vient de faire : on a utilisé l'eau comme **base**, dans le couple $H_3O^+/H_2O$. Mais l'eau appartient aussi à un second couple, $H_2O/HO^-$, où cette fois c'est elle l'**acide** :

$$H_2O \rightleftharpoons HO^- + H^+$$

Une espèce qui peut jouer le rôle d'acide dans un couple et de base dans un autre s'appelle un **ampholyte** (ou espèce amphotère). L'eau en est l'exemple le plus important du programme — et cette double identité est précisément ce qui va nous permettre, au chapitre suivant après la mesure du pH, de construire la réaction de l'eau avec elle-même.

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

Tu as vu au chapitre précédent que l'eau est un ampholyte : elle est base dans le couple $H_3O^+/H_2O$, et acide dans le couple $H_2O/HO^-$. Rien n'empêche alors une molécule d'eau de céder un proton... à une *autre* molécule d'eau. C'est exactement la même construction qu'à l'exemple travaillé du chapitre 2 : on additionne les deux demi-équations et le $H^+$ s'annule.

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

Reviens à la mécanique du chapitre précédent. Le pH n'est pas $[H_3O^+]$ lui-même : c'est $-\log[H_3O^+]$, avec ce signe moins qui **inverse** le sens de variation. Une solution très acide a un $[H_3O^+]$ **grand** — mais justement à cause du signe moins, son pH est **petit**. Le nombre « petit » que tu lis sur l'échelle ne signifie donc pas « peu d'acidité » : il signifie « beaucoup de $H_3O^+$ », donc **beaucoup** d'acidité. pH petit et acidité forte vont dans le même sens, pas dans des sens opposés.

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

Applique ce principe à la réaction d'un acide $AH$ avec l'eau, construite exactement comme au chapitre 2 :

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

C'est une confusion à surveiller de près, et elle a la même racine que celle du chapitre précédent sur le pH : $pK_A = -\log K_A$ contient un logarithme **et** un signe moins, donc $pK_A$ ne varie pas dans le même sens que $K_A$ — il varie dans le sens **opposé**.

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

Garde ces deux valeurs — $pK_A \approx 4{,}8$ pour le couple $CH_3COOH/CH_3COO^-$ — elles reviennent dans les chapitres suivants.

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

### Refermer la question posée au chapitre 1

Reviens aux deux béchers de l'accroche : même concentration $c = 1{,}0 \times 10^{-2}\ \text{mol/L}$, et pourtant $\text{pH} = 2{,}0$ pour l'acide chlorhydrique contre $\text{pH} = 3{,}4$ pour l'acide éthanoïque. Tu as maintenant tous les outils pour comprendre pourquoi.

### Acide fort, acide faible : ce que ça veut dire pour la réaction avec l'eau

Un **acide fort** est un acide dont la réaction avec l'eau est **quasi totale** : pratiquement toutes les molécules $AH$ introduites cèdent leur proton. C'est le cas de l'acide chlorhydrique : dissous dans l'eau, $HCl$ réagit avec l'eau de façon quasi totale, $HCl + H_2O \rightarrow Cl^- + H_3O^+$ (on écrit ici une flèche simple, pas $\rightleftharpoons$, précisément parce que la réaction ne revient pratiquement pas en arrière). Résultat : $[H_3O^+]_{eq} \approx c$, la concentration en $H_3O^+$ est directement égale à la concentration apportée.

$$\text{pH} = -\log(c) = -\log(1{,}0 \times 10^{-2}) = 2{,}0$$

C'est exactement la valeur mesurée dans le bécher 1. Rien à ajuster : l'acide fort donne tout son proton, un point c'est tout.

Un **acide faible**, comme l'acide éthanoïque, ne réagit que **partiellement** avec l'eau : un équilibre s'installe, avec $[AH]_{eq}$ encore largement présent à la fin — c'est exactement ce que tu as calculé au chapitre 5, où $[CH_3COOH]_{eq} \approx 9{,}6 \times 10^{-3}\ \text{mol/L}$ restait très proche de $c$ tout entier. Beaucoup moins de $H_3O^+$ est produit qu'avec un acide fort à la même concentration, donc le pH est plus élevé : $3{,}4$ au lieu de $2{,}0$.

### Chiffrer « à quel point » la réaction a eu lieu : le taux d'avancement final $\tau$

On définit le **taux d'avancement final** d'une réaction :

$$\tau = \frac{x_f}{x_{max}}$$

où $x_f$ est l'avancement réellement atteint à l'équilibre, et $x_{max}$ l'avancement qu'on aurait si la réaction allait jusqu'au bout. $\tau$ est donc compris entre $0$ (rien ne s'est passé) et $1$ (réaction totale).

*Ce qu'on cherche ici, et pourquoi ce geste :* reprends l'acide éthanoïque du chapitre 5, dans un volume $V$. $x_{max}$ correspond à la disparition complète de l'acide introduit, soit $x_{max} = c \times V$. $x_f$ se lit sur la quantité de $H_3O^+$ réellement formée, $x_f \approx [H_3O^+]_{eq} \times V$. Le volume $V$ se simplifie dans le rapport :

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

## R8 — Le diagramme de distribution : lire les proportions, pas seulement qui l'emporte

### Depuis « qui l'emporte » vers « dans quelle proportion »

Au chapitre 6, tu as appris à répondre à une question binaire : à un pH donné, qui domine, $AH$ ou $A^-$ ? Le diagramme de prédominance te donne un camp gagnant, jamais un score. Or deux solutions où $A^-$ l'emporte peuvent être très différentes l'une de l'autre — l'une à $55\,\%$ de $A^-$, l'autre à $99{,}9\,\%$. Le diagramme de prédominance ne fait aucune différence entre les deux. Il te faut un outil qui, au lieu de désigner un vainqueur, te donne le score exact : le **diagramme de distribution**.

### Définir les pourcentages

Reprends le rapport déjà établi au chapitre 6 :

$$\frac{[A^-]}{[AH]} = 10^{\text{pH}-pK_A}$$

*Ce qu'on cherche ici, et pourquoi ce geste :* on veut transformer ce rapport en deux pourcentages qui se lisent directement sur un graphe, un pour chaque forme. On définit :

$$\%AH = \frac{[AH]}{[AH]+[A^-]}\times 100 \qquad \%A^- = \frac{[A^-]}{[AH]+[A^-]}\times 100$$

Ces deux pourcentages se partagent nécessairement la totalité des espèces du couple présentes en solution — c'est le garde-fou de toute lecture d'un diagramme de distribution :

$$\%AH + \%A^- = 100 \quad \text{(toujours)}$$

### Faire apparaître le pH et le $pK_A$ dans le pourcentage

On injecte le rapport $[A^-]/[AH] = 10^{\text{pH}-pK_A}$ dans la définition de $\%A^-$, en divisant numérateur et dénominateur par $[AH]$ :

$$\%A^- = \frac{[A^-]/[AH]}{1+[A^-]/[AH]}\times 100 = \frac{10^{\text{pH}-pK_A}}{1+10^{\text{pH}-pK_A}}\times 100$$

On multiplie numérateur et dénominateur par $10^{pK_A-\text{pH}}$ pour faire disparaître l'exposant du numérateur — c'est ce qui donne la forme la plus lisible :

$$\%A^- = \frac{100}{1+10^{pK_A-\text{pH}}}$$

Trois lectures suffisent à comprendre entièrement cette courbe, sans calcul lourd :

- **$\text{pH} = pK_A$** : l'exposant $pK_A - \text{pH}$ est nul, $10^0 = 1$, donc $\%A^- = 100/(1+1) = 50$. **Chaque forme vaut exactement $50\,\%$** — c'est le point où les deux courbes **se croisent**.
- **$\text{pH} \ll pK_A$** : l'exposant est grand et positif, $10^{pK_A-\text{pH}}$ devient énorme, donc $\%A^- \to 0$ et $\%AH \to 100$.
- **$\text{pH} \gg pK_A$** : l'exposant est grand et négatif, $10^{pK_A-\text{pH}} \to 0$, donc $\%A^- \to 100$.

### Le cœur du chapitre : deux diagrammes, deux natures différentes

[[figure:diagramme-distribution-vs-predominance]]

Regarde bien la différence de nature entre les deux objets. Le diagramme de prédominance est un **axe de pH à une seule dimension**, coupé par une frontière unique à $pK_A$ : il répond à une question de type « qui gagne ». Le diagramme de distribution est un **graphe à deux dimensions** — un pourcentage en ordonnée, le pH en abscisse — et il répond à une question chiffrée : « dans quelle proportion ». Le premier est une réponse binaire ; le second est une réponse numérique. Ce n'est pas la même information présentée autrement : c'est strictement plus d'information.

### Teste l'idée avant de la croire : « à la frontière, la forme dominante a déjà tout pris »

Voici une lecture trop rapide de la frontière du chapitre 6 : puisque $AH$ domine juste en dessous de $pK_A$ et que $A^-$ domine juste au-dessus, on pourrait croire qu'à $\text{pH} = pK_A$ pile, on bascule d'un coup — une forme à quasiment $100\,\%$, l'autre déjà évanouie.

Teste-le avec la formule que tu viens d'établir. À $\text{pH} = pK_A$, l'exposant $pK_A - \text{pH}$ vaut $0$, donc $\%A^- = 100/(1+10^0) = 100/2 = 50$. Les deux pourcentages valent $50$, pas $0$ et $100$. La frontière du diagramme de prédominance n'est pas un instant de bascule brutale : c'est le point exact où les deux formes coexistent à parts strictement égales. Rien n'a « déjà disparu » — c'est même l'endroit où les deux formes sont les plus également représentées de toute la courbe.

### Teste l'idée avant de la croire : « prédominance et distribution disent la même chose »

Prends deux solutions du même couple $AH/A^-$ ($pK_A$ fixé) : l'une à $\text{pH} = pK_A + 0{,}1$, l'autre à $\text{pH} = pK_A + 3$. Sur le diagramme de prédominance, le verdict est identique dans les deux cas : $\text{pH} > pK_A$, donc $A^-$ prédomine — rien ne distingue les deux solutions.

Calcule maintenant $\%A^-$ pour chacune avec la formule établie plus haut. Pour $\text{pH} = pK_A + 0{,}1$ : $\%A^- = 100/(1+10^{-0{,}1}) \approx 56\,\%$ — à peine au-dessus de l'équilibre. Pour $\text{pH} = pK_A + 3$ : $\%A^- = 100/(1+10^{-3}) \approx 99{,}9\,\%$ — la forme $AH$ a quasiment disparu. Deux solutions que la prédominance déclare « identiques dans leur verdict » sont en réalité à $56\,\%$ et à $99{,}9\,\%$ de $A^-$ : des compositions radicalement différentes. Seul le diagramme de distribution fait cette différence.

### Teste l'idée avant de la croire : « le croisement est à pH = 7 »

Reprends le couple $NH_4^+/NH_3$ du chapitre 6, de $pK_A \approx 9{,}2$. Si le croisement à $50/50$ se produisait toujours à $\text{pH} = 7$ (la neutralité), on devrait trouver $\%NH_3 \approx 50\,\%$ à $\text{pH} = 7$.

Or tu as déjà calculé, au chapitre 6, qu'à $\text{pH} = 7{,}0$ le rapport $[NH_3]/[NH_4^+] \approx 6{,}3\times10^{-3}$ — $NH_4^+$ écrase $NH_3$ dans un rapport d'environ $160$ pour $1$. On est très loin de $50/50$. Le croisement réel de ce couple se produit à $\text{pH} = pK_A \approx 9{,}2$, pas à $7$. La confusion vient d'un mélange entre deux constantes qui n'ont rien à voir : $pK_e = 14$ (propriété de l'eau, chapitre 4) fixe la neutralité à $\text{pH} = 7$ ; $pK_A$ (propriété du **couple** étudié) fixe, lui, le croisement des courbes de distribution — et $pK_A$ change d'un couple à l'autre, alors que $pK_e$ reste le même pour toute solution aqueuse à $25\,^\circ\text{C}$.

### Exemple travaillé : lire trois points de la courbe

Reprends le couple $CH_3COOH/CH_3COO^-$, $pK_A = 4{,}8$ (chapitre 5).

*Ce qu'on cherche ici, et pourquoi ce geste :* on veut voir, sur trois pH espacés d'une unité autour de $pK_A$, à quel point la composition bascule vite — c'est ce qui donne à la courbe sa forme en « S ».

À $\text{pH} = 3{,}8$ (une unité sous $pK_A$) : $\%A^- = 100/(1+10^{4{,}8-3{,}8})$, soit $\%A^- = 100/(1+10) \approx 9\,\%$. $AH$ domine à environ $91\,\%$.

À $\text{pH} = 4{,}8$ (= $pK_A$) : $\%A^- = 50\,\%$, $\%AH = 50\,\%$ — le croisement.

À $\text{pH} = 5{,}8$ (une unité au-dessus de $pK_A$) : $\%A^- = 100/(1+10^{-1}) \approx 91\,\%$.

En ne déplaçant le pH que de $\pm 1$ unité autour de $pK_A$, le rapport passe d'environ $1/10$ à $10/1$ — la composition bascule vite, mais jamais brutalement à $0$ ou $100\,\%$ pile à la frontière. Retiens la formule qui résume tout ce chapitre : **prédominer, ce n'est pas être seul.**

[[figure:distribution-curseur-pH]]

### Ce que ce chapitre ne couvre pas

Le programme limite l'exploitation du diagramme de distribution à un couple $AH/A^-$ simple : pas de diagramme multi-$pK_A$ pour un polyacide au-delà d'une lecture directe. On **lit** une distribution donnée ; on ne l'utilise pas pour calculer par avance la composition d'un mélange tampon (relation de Henderson-Hasselbalch) — cette exploitation quantitative des mélanges sort du cadre de cette leçon.

---

## R9 — Le titrage pH-métrique : suivre une réaction acide-base goutte à goutte

### Pourquoi une flèche simple, et pas $\rightleftharpoons$

Au chapitre 8, tu as vu qu'une réaction entre deux couples n'est exploitable comme réaction quasi totale que si $K \gg 1$. Un **titrage** (ou dosage) a précisément besoin de cette totalité : il ne sert à rien de verser un réactif titrant si la réaction ne consomme pas *tout* le réactif titré de façon fiable.

*Ce qu'on cherche ici, et pourquoi ce geste :* vérifions-le sur le cas qui nous occupera pour les trois prochains chapitres — doser l'acide éthanoïque $CH_3COOH$ ($pK_{A1} = 4{,}8$) par la soude, c'est-à-dire par les ions hydroxyde $HO^-$. $HO^-$ est la base du couple $H_2O/HO^-$, dont on retient, par convention usuelle, $pK_{A2} = pK_e = 14$ (chapitre 4). On applique directement la formule établie au chapitre 8 :

$$CH_3COOH + HO^- \rightleftharpoons CH_3COO^- + H_2O$$

$$K = \frac{K_{A1}}{K_{A2}} = 10^{pK_{A2}-pK_{A1}}$$

$$K = 10^{14-4{,}8} = 10^{9{,}2} \approx 1{,}6\times10^{9}$$

$K$ est gigantesque : la réaction est quasi totale, exactement le cas $K \gg 1$ du chapitre 8. C'est pour cette raison — et uniquement pour cette raison — qu'on a le droit d'écrire une flèche simple :

$$CH_3COOH + HO^- \rightarrow CH_3COO^- + H_2O$$

Le titrant versé est consommé pour de bon, sans retour en arrière significatif. **C'est ce qui rend l'équivalence nette et exploitable** : si la réaction n'allait pas jusqu'au bout, il resterait, à tout instant, un mélange flou de réactifs et de produits, et aucun volume particulier ne marquerait un « avant » et un « après » tranchés.

### Le montage

[[figure:montage-dosage-phmetrique]]

Concrètement : le **titrant**, de concentration connue, est placé dans une **burette graduée**, au-dessus du **bécher** qui contient une **prise d'essai** de volume connu de la solution à titrer (le **titré**), maintenue sous **agitation**. Une **sonde pH**, reliée à un **pH-mètre**, plonge dans le bécher. On verse le titrant petit à petit, et après chaque ajout on relève le volume versé $V$ et le pH correspondant — ce qui construit, point par point, la courbe $\text{pH} = f(V)$.

### Définir l'équivalence proprement

L'**équivalence** est l'instant où le titrant a été versé en quantité **juste stœchiométrique** pour consommer la totalité du réactif titré initialement présent — ni plus, ni moins. Avant l'équivalence, le titré est encore en excès dans le bécher ; après, c'est le titrant versé en trop qui s'accumule.

Pour une réaction 1:1 comme celle écrite plus haut, cette égalité stœchiométrique s'écrit directement sur les quantités de matière : la quantité de titré initialement présente est égale à la quantité de titrant versée au volume équivalent $V_E$ :

$$n_{\text{titré}}(0) = n_{\text{titrant}}(V_E)$$

$$C_A V_A = C_B V_E$$

Regarde bien ce que dit cette relation : c'est une égalité de **quantités de matière**, construite uniquement à partir de la stœchiométrie de la réaction — **elle ne mentionne le pH nulle part**. L'équivalence n'est pas définie par une valeur de pH : elle est définie par un équilibre de quantités versées.

### Teste l'idée avant de la croire : « l'équivalence, c'est quand pH = 7 »

Le mot « neutralisation », qu'on entend parfois pour parler d'un dosage acide-base, laisse penser que le résultat final est forcément neutre — $\text{pH} = 7$ à l'équivalence, toujours.

Reviens à la définition que tu viens de lire : l'équivalence est un fait de **stœchiométrie** (une quantité de titrant qui égale une quantité de titré), pas une valeur de pH imposée. Regarde ce qui se trouve réellement dans le bécher au volume équivalent de notre dosage : tout l'acide éthanoïque introduit a été converti en ion éthanoate $CH_3COO^-$, dissous dans l'eau. Or $CH_3COO^-$ est une base — certes faible, mais une base. Une solution qui ne contient, comme espèce du couple, que la base conjuguée d'un acide faible est basique : $\text{pH}_E > 7$. (Le calcul exact de cette valeur sort du cadre de cette leçon — on ne le calcule pas par une formule, on le **lit** sur la courbe, ce que tu feras au chapitre suivant.) L'équivalence à $\text{pH} = 7$ n'est vraie que dans un cas particulier — acide fort dosé par base forte — jamais comme règle générale.

### Teste l'idée avant de la croire : « on a versé le même volume, $V_E = V_A$ »

Une autre intuition trompeuse : puisqu'on « neutralise » un volume $V_A$ de titré, on pourrait croire qu'il faut verser exactement ce même volume $V_A$ de titrant pour atteindre l'équivalence.

Regarde la relation que tu viens d'établir : $C_A V_A = C_B V_E$, donc $V_E = C_A V_A / C_B$. Cette égalité ne se réduit à $V_E = V_A$ que dans le cas particulier où $C_A = C_B$ — les deux concentrations doivent être égales pour que les deux volumes le soient. En général, rien ne garantit que le titrant et le titré ont la même concentration : $V_E$ dépend du **rapport** des deux concentrations, pas d'une supposée symétrie des volumes.

### Teste l'idée avant de la croire : « une réaction limitée pourrait aussi servir de dosage »

Reviens au chapitre 8, exemple travaillé 2 : le mélange $CH_3COOH$ / $HCOO^-$, avec $K = 0{,}10$ — ni grand ni petit. Pourrait-on utiliser une telle réaction comme réaction support d'un titrage ?

Non : avec $K = 0{,}10$, tu as calculé au chapitre 8 un taux d'avancement final $\tau \approx 0{,}240$ — seulement $24\,\%$ de réaction. À aucun volume versé la réaction n'est complète : il resterait, à tout instant, un mélange de réactif et de produit dans des proportions floues, sans palier net avant/après. Aucun volume particulier ne se distinguerait par un saut de pH exploitable. C'est exactement pour cette raison que le chapitre 8 exige $K \gg 1$ pour une réaction *totale, rapide et unique* : sans cette totalité, il n'existe pas d'équivalence nette à repérer.

### Exemple travaillé : poser la relation, l'utiliser

On dose $V_A = 20{,}0\ \text{mL}$ d'une solution d'acide éthanoïque de concentration inconnue $C_A$, par une solution de soude de concentration $C_B = 0{,}10\ \text{mol/L}$.

*Ce qu'on cherche ici, et pourquoi ce geste :* on veut $C_A$, mais on ne la connaît pas encore directement — il faut d'abord passer par $V_E$, qu'on ne peut lire que sur la courbe expérimentale (ce sera l'objet du chapitre 11). Pour l'instant, on pose juste la démarche.

D'abord, l'équation support, justifiée plus haut par $K \gg 1$ :

$$CH_3COOH + HO^- \rightarrow CH_3COO^- + H_2O$$

Ensuite, la relation à l'équivalence :

$$C_A V_A = C_B V_E$$

En admettant, pour l'instant, que la courbe donne $V_E = 15{,}0\ \text{mL}$ (tu vérifieras cette lecture au chapitre suivant), on isole $C_A$ :

$$C_A = \frac{C_B V_E}{V_A} = \frac{0{,}10 \times 15{,}0}{20{,}0} = 7{,}5\times10^{-2}\ \text{mol/L}$$

Retiens le fil : $V_A \neq V_E$ ($20{,}0 \neq 15{,}0$), ce qui est cohérent avec $C_A \neq C_B$ — exactement ce que dit la relation, et le contraire de la confusion testée plus haut. Et le $\text{pH}_E$ qu'on trouvera au chapitre suivant sera supérieur à $7$, sans que ce soit un problème : l'équivalence se lit au saut de la courbe, pas à une valeur de pH fixée d'avance.

### Ce que ce chapitre ne couvre pas

Aucun calcul analytique du pH aux points remarquables de la courbe (ni à l'équivalence, ni à la demi-équivalence) par une formule fermée : le programme exige que le pH s'obtienne par **exploitation expérimentale**, pas par calcul — c'est l'objet du chapitre suivant. Le suivi par **conductimétrie** est une autre méthode de suivi d'une réaction, traitée ailleurs dans le programme ; on ne l'introduit pas ici. Et un dosage d'oxydoréduction est une tout autre famille de réaction, hors de ce chapitre.

---

## R10 — Repérer l'équivalence sur la courbe pH = f(V) : tangentes et dérivée

### L'équivalence, c'est le milieu du saut

Reprends la courbe $\text{pH} = f(V)$ du dosage du chapitre précédent. Loin de $V_E$, le pH varie lentement à chaque goutte versée. Au voisinage de $V_E$, en revanche, un tout petit ajout de titrant fait bondir le pH de plusieurs unités : c'est le **saut**. Le point où le pH varie **le plus vite** — où la pente de la courbe est **maximale** — est le **point d'inflexion** de la courbe, et c'est précisément ce point qui marque $V_E$.

### Méthode 1 : les tangentes

[[figure:equivalence-methode-tangentes]]

*Ce qu'on cherche ici, et pourquoi ce geste :* on veut localiser géométriquement, sans aucun calcul, le point d'inflexion — le point où la courbe change de concavité au milieu du saut. La construction : trace deux tangentes à la courbe, une avant le saut (là où le pH monte encore doucement) et une après le saut (là où il remonte doucement à nouveau), **parallèles entre elles**. Trace ensuite la droite parallèle à ces deux tangentes, mais **équidistante** des deux — à mi-chemin exact entre elles. Le point où cette droite médiane coupe la courbe est le point d'équivalence : son abscisse donne $V_E$, son ordonnée donne $\text{pH}_E$.

### Méthode 2 : la dérivée

[[figure:equivalence-courbe-derivee]]

*Ce qu'on cherche ici, et pourquoi ce geste :* la pente de la courbe $\text{pH} = f(V)$ en chaque point, c'est justement $\dfrac{d\text{pH}}{dV}$. On trace cette dérivée en fonction de $V$ : c'est une nouvelle courbe, qui monte, passe par un pic, puis redescend. Le pH varie lentement loin du saut (dérivée petite des deux côtés) et très vite au saut (dérivée grande) — le **maximum** de cette courbe dérivée se produit exactement là où la pente de $\text{pH} = f(V)$ est la plus raide, donc exactement à $V_E$.

Insiste bien sur ce que tu cherches : c'est le **maximum de la dérivée**, pas un endroit où elle s'annule.

### Les deux méthodes doivent s'accorder

Les deux constructions — tangentes et dérivée — repèrent le même point géométrique par deux chemins différents. Elles doivent donner le même $V_E$, à la précision de lecture graphique près. C'est la vérification croisée à exiger de toi-même à chaque dosage : si les deux méthodes ne s'accordent pas, une des deux lectures est fautive.

### Teste l'idée avant de la croire : « on lit $V_E$ où pH = 7 »

Sur la courbe de notre dosage, $\text{pH}_E \approx 8{,}5$ (tu vas le vérifier plus bas) : le pH vaut $7$ quelque part **avant** le point d'inflexion, sur la pente montante du saut — pas au sommet de la pente. Si tu avais lu $V_E$ à l'abscisse où $\text{pH} = 7$, tu aurais lu un volume trop petit, avant que le saut n'ait fini de se produire. C'est la même confusion qu'au chapitre précédent, appliquée cette fois directement à la lecture graphique : on repère $V_E$ au **saut** (le point d'inflexion, où la pente est maximale), jamais à une valeur de pH choisie d'avance.

### Teste l'idée avant de la croire : « la dérivée s'annule à l'équivalence »

Voici un réflexe qui vient d'ailleurs et qui trompe ici : tu as l'habitude qu'un extremum se repère en cherchant où une dérivée **s'annule**. Le piège, c'est d'appliquer ce réflexe au mauvais niveau : ici, ce n'est pas le pH qu'on maximise, c'est **sa dérivée**.

Regarde la courbe $\dfrac{d\text{pH}}{dV} = f(V)$ que tu viens de tracer : elle vaut à peu près $0$ tout au début et tout à la fin du dosage (là où le pH varie très peu, sur les paliers avant et après le saut), et elle culmine en un seul pic au milieu. $V_E$ correspond à ce **pic** — au **maximum** de la dérivée —, pas aux zones où la dérivée est proche de $0$. Chercher $\dfrac{d\text{pH}}{dV} = 0$ te ramènerait vers les paliers plats, loin de l'équivalence, exactement là où il ne se passe presque rien.

### Teste l'idée avant de la croire : « demi-équivalence et équivalence, c'est pareil »

Sur cette même courbe, repère le volume $V_E/2$ — la moitié du volume équivalent — et lis le pH à cet endroit-là. Tu vas trouver $\text{pH} \approx pK_A$ du couple titré (une propriété que tu retrouveras plus bas). Ce point est-il l'équivalence ?

Non. À $V_E/2$, seule la **moitié** du titré initial a réagi — le titré est encore majoritairement en excès dans le bécher, ce n'est pas du tout l'instant « juste stœchiométrique » défini au chapitre 10. La **demi-équivalence** est un point utile — elle donne accès au $pK_A$ du couple, sans calcul — mais ce n'est pas l'équivalence : sur la courbe, ce sont deux points géométriquement distincts ($V_E/2$ n'est pas le point d'inflexion), et il faut les distinguer soigneusement.

### Exemple travaillé : les trois lectures sur la même courbe

Reprends le dosage des chapitres précédents : acide éthanoïque, $V_A = 20{,}0\ \text{mL}$, par la soude $C_B = 0{,}10\ \text{mol/L}$.

*Ce qu'on cherche ici, et pourquoi ce geste :* on veut vérifier, sur une seule et même courbe, que les deux méthodes de repérage s'accordent, puis distinguer clairement l'équivalence de la demi-équivalence.

(1) Par la méthode des tangentes : les deux tangentes parallèles et leur médiane donnent $V_E = 15{,}0\ \text{mL}$, avec $\text{pH}_E \approx 8{,}5$.

(2) Sur la courbe dérivée $\dfrac{d\text{pH}}{dV} = f(V)$ : le maximum tombe à la même abscisse, $V = 15{,}0\ \text{mL}$ — les deux méthodes s'accordent.

(3) À la demi-équivalence, $V_E/2 = 7{,}5\ \text{mL}$ : on y lit $\text{pH} \approx 4{,}8$ — exactement le $pK_A$ du couple $CH_3COOH/CH_3COO^-$ trouvé au chapitre 5. Deux points bien distincts sur la même courbe : $7{,}5\ \text{mL}$ (demi-équivalence, $\text{pH} \approx pK_A$) et $15{,}0\ \text{mL}$ (équivalence, le saut).

[[figure:lecture-Ve-courbe-dosage]]

Avec $V_E = 15{,}0\ \text{mL}$ confirmé, tu peux boucler le calcul amorcé au chapitre 10 : $C_A = C_B V_E / V_A = 7{,}5\times10^{-2}\ \text{mol/L}$.

### Ce que ce chapitre ne couvre pas

Le programme exige que $V_E$ (et $\text{pH}_E$) soient **repérés graphiquement** — aucune détermination analytique par formule fermée n'est exigée. On ne dérive pas une seconde fois, on n'ajuste pas numériquement la courbe par un modèle : on **repère**, à la règle et au crayon, ou avec l'outil numérique qui trace la dérivée — jamais par le calcul.

---

## R11 — Choisir l'indicateur coloré : la zone de virage

### Un indicateur, c'est un couple acide/base de plus

Reviens aux chapitres 6 et 8 : la forme qui prédomine dans une solution impose ce qu'on y observe. Un **indicateur coloré** est lui-même un couple acide/base faible, noté $HIn/In^-$, dont la particularité est que ses deux formes ont des **couleurs différentes** — c'est ce qui le rend utile. Comme pour n'importe quel couple, à un pH donné, c'est la forme qui prédomine qui impose ce qu'on voit.

### La zone de virage

Entre les deux couleurs pures, il existe une plage de pH où les deux formes coexistent en proportions suffisamment comparables pour qu'aucune des deux couleurs n'écrase l'autre à l'œil : c'est la **zone de virage**, approximativement l'intervalle $pK_A(\text{indicateur}) \pm 1$. En dehors de cette zone, une seule couleur domine visuellement (c'est le résultat du chapitre 9 : à plus d'une unité de $pK_A$, une forme dépasse déjà $\sim 91\,\%$).

### Le critère de choix

[[figure:zone-virage-sur-saut]]

*Ce qu'on cherche ici, et pourquoi ce geste :* on veut qu'un indicateur, ajouté au bécher, change de couleur **au moment même** où l'on franchit l'équivalence — ni avant, ni après. On choisit donc un indicateur dont la **zone de virage contient le $\text{pH}_E$** lu au chapitre 11. Vois-le concrètement : superpose la zone de virage (une bande horizontale de pH) sur le saut de la courbe de dosage. Si la bande **coupe** le saut, le changement de couleur se produit au voisinage immédiat du saut — donc quasi au bon volume $V_E$. Si la bande ne coupe pas le saut, la couleur change à un volume qui n'a rien à voir avec l'équivalence.

### Teste l'idée avant de la croire : « n'importe quel indicateur convient »

Reprends notre dosage, $\text{pH}_E \approx 8{,}5$, et teste l'hélianthine, dont la zone de virage est $3{,}1$–$4{,}4$.

Superpose cette bande sur la courbe : $3{,}1$–$4{,}4$ se situe très loin en dessous du saut, qui se produit vers $\text{pH} \approx 8{,}5$. L'hélianthine a déjà fini de virer bien avant que le saut n'ait lieu — dès qu'on approche de $\text{pH} \approx 4$, à un volume versé de l'ordre de quelques mL, très loin des $15{,}0\ \text{mL}$ de l'équivalence réelle. Si tu t'étais arrêté au changement de couleur de l'hélianthine, tu aurais lu un volume beaucoup trop petit, et une concentration $C_A$ fausse. Un indicateur mal choisi ne donne pas une petite imprécision : il peut donner un résultat franchement faux.

### Teste l'idée avant de la croire : « l'indicateur vire à pH = 7 »

Toujours la même confusion qui revient, cette fois appliquée à l'indicateur : compare les trois zones de virage — hélianthine ($3{,}1$–$4{,}4$), BBT ($6{,}0$–$7{,}6$), phénolphtaléine ($8{,}2$–$10{,}0$). Chacune est fixée par le $pK_A$ **propre à cet indicateur**, sans rapport avec $7$ : celle de l'hélianthine encadre $3{,}75$ environ, celle de la phénolphtaléine encadre $9{,}1$ environ — le BBT est simplement celui, par coïncidence, dont la zone est proche de $7$, pas une règle générale. Choisir un indicateur, ce n'est jamais chercher celui qui « vire à 7 » : c'est chercher celui dont la zone encadre le $\text{pH}_E$ **de ce dosage précis**.

### Teste l'idée avant de la croire : « la couleur donne le volume exact »

Même avec le bon indicateur — la phénolphtaléine ici —, le changement de couleur donne-t-il $V_E$ au millilitre près ?

Non, mais c'est une **bonne approximation**, précisément parce que la zone de virage de la phénolphtaléine encadre $\text{pH}_E \approx 8{,}5$ : le virage se produit dans l'intervalle très raide du saut, donc à un volume très proche de $V_E$. Ce n'est vrai **qu'à cette condition** — la zone doit encadrer $\text{pH}_E$. L'indicateur **repère** l'équivalence, il ne la **définit** pas : la définition reste celle du chapitre 10, une égalité de quantités de matière, et la vraie référence reste la lecture par tangentes ou dérivée du chapitre 11.

### Exemple travaillé : choisir, pour de vrai

*Ce qu'on cherche ici, et pourquoi ce geste :* pour le dosage de l'acide éthanoïque par la soude ($\text{pH}_E \approx 8{,}5$), on doit choisir parmi trois indicateurs disponibles : hélianthine ($3{,}1$–$4{,}4$), BBT ($6{,}0$–$7{,}6$), phénolphtaléine ($8{,}2$–$10{,}0$).

On teste chaque zone contre $\text{pH}_E = 8{,}5$ : l'hélianthine ($3{,}1$–$4{,}4$) ne contient pas $8{,}5$ — écartée. Le BBT ($6{,}0$–$7{,}6$) ne contient pas non plus $8{,}5$ — écarté. Seule la phénolphtaléine ($8{,}2$–$10{,}0$) contient $8{,}5$ : c'est elle qu'on retient.

Retiens la phrase qui résume tout ce chapitre : la couleur change quasi au saut, donc quasi à $V_E$ — c'est tout ce qu'on demande à l'indicateur, rien de plus.

### Ce que ce chapitre ne couvre pas

Le traitement du choix d'indicateur reste **qualitatif** : on superpose une zone de virage et un saut, on ne modélise pas quantitativement l'équilibre coloré de l'indicateur (pas de calcul du rapport $[In^-]/[HIn]$ pour prédire une teinte intermédiaire, au-delà de la logique de prédominance déjà vue au chapitre 6). Et comme dans toute cette leçon, on reste dans le cadre de Brønsted.

---

## R12 — Pour t'entraîner

### Récapitulatif express

- **pH :** $\text{pH} = -\log[H_3O^+]$, donc $[H_3O^+] = 10^{-\text{pH}}$. Le signe moins inverse le sens : $[H_3O^+]$ grand $\Rightarrow$ pH petit.
- **Brønsted :** acide = donneur de proton, base = accepteur ; couple $AH/A^-$, demi-équation $AH \rightleftharpoons A^- + H^+$. Une réaction acido-basique combine toujours deux couples ; le $H^+$ s'annule dans la somme, comme les électrons en oxydoréduction. L'eau est un ampholyte : base dans $H_3O^+/H_2O$, acide dans $H_2O/HO^-$.
- **Produit ionique de l'eau :** $K_e = [H_3O^+][HO^-] = 10^{-14}$ à $25\,^\circ\text{C}$ ($pK_e = 14$). Neutre : $\text{pH} = 7$. Acide : $\text{pH} < 7$. Basique : $\text{pH} > 7$.
- **$K_A$ et $pK_A$ :** pour $AH + H_2O \rightleftharpoons A^- + H_3O^+$, $K_A = \dfrac{[A^-][H_3O^+]}{[AH]}$, $pK_A = -\log K_A$. $K_A$ grand $\Leftrightarrow$ $pK_A$ petit $\Leftrightarrow$ acide fort.
- **Diagramme de prédominance :** $\dfrac{[A^-]}{[AH]} = 10^{\text{pH} - pK_A}$. $\text{pH} > pK_A$ : $A^-$ prédomine. $\text{pH} < pK_A$ : $AH$ prédomine.
- **Force ≠ concentration :** la force ($K_A$, $\tau$ face à l'eau) est une propriété du couple ; la concentration $c$ est une quantité dissoute — deux grandeurs indépendantes.
- **Réaction entre deux couples :** $K = K_{A1}/K_{A2}$, indépendant du pH. $K \gg 1$ : réaction quasi totale ($\tau \approx 1$). $\tau = x_f/x_{max}$.
- **Diagramme de distribution :** $\%A^- = \dfrac{100}{1+10^{pK_A-\text{pH}}}$, avec $\%AH + \%A^- = 100$ toujours. Croisement à $50/50$ exactement à $\text{pH} = pK_A$ (jamais à $7$) — il donne un pourcentage, là où la prédominance ne donne qu'un vainqueur.
- **Titrage pH-métrique :** réaction support totale, rapide et unique ($K \gg 1$) $\Rightarrow$ flèche simple. Équivalence : $C_A V_A = C_B V_E$ — une relation de quantités de matière, jamais une valeur de pH imposée.
- **Repérer $V_E$ :** méthode des tangentes (deux tangentes parallèles + médiane équidistante) ou méthode de la dérivée (le **maximum** de $d\text{pH}/dV$, jamais un zéro). À la demi-équivalence $V_E/2$ : $\text{pH} \approx pK_A$ — un point distinct de l'équivalence.
- **Choisir l'indicateur :** un indicateur coloré est un couple $HIn/In^-$ ; sa zone de virage ($\approx pK_A(\text{indicateur}) \pm 1$) doit **encadrer** $\text{pH}_E$ pour que le virage se produise au voisinage du saut.

### Prends position avant de te lancer

Le sommet de cette leçon n'est pas une solution imprimée à lire, mais un vrai sujet à tenter toi-même. Avant de dérouler la courbe de dosage, engage-toi sur une prédiction — c'est en t'y risquant que la lecture qui suit prendra son sens.

[[checkpoint:cp-r0-predict]]

### Exercice de type bac

Voici un sujet **national vérifié** (session normale 2021, PC BIOF). On dose un acide carboxylique inconnu par la soude, puis on l'identifie à partir de son $pK_A$. Prends le temps de chercher chaque question avant de déplier le raisonnement expert.

[[exercise:r-bac]]

### Vérifie que les gestes clés sont solides

Ce sujet traverse les quatre pièges classiques du cluster titrage/distribution. Teste-les à froid — chaque bonne réponse doit venir d'un modèle, pas d'un réflexe.

[[checkpoint:cp-r9-dosage]]

[[checkpoint:cp-r10-equivalence]]

[[checkpoint:cp-r11-indicateur]]

[[checkpoint:cp-r8-distribution]]

### Une variation pour ne pas mémoriser

Même cluster de compétences, contexte retourné : une **base faible** dosée par un **acide fort**. La courbe décroît, et le pH à l'équivalence change de côté. Tu ne peux pas recopier le sujet précédent — il faut reconnaître ce qui reste vrai et ce qui bascule.

[[exercise:r-variation]]
