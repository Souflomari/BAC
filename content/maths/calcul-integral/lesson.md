# Calcul intégral

---

## R0 — Accroche : la distance qu'une courbe de vitesse ne te donne pas directement

Une voiture accélère. Son compteur de vitesse instantanée $v(t)$, en mètres par seconde, obéit à la loi $v(t) = t^2$ sur les deux premières secondes ($t$ en secondes, $t \in [0,2]$). Elle démarre à l'arrêt ($v(0)=0$) et sa vitesse grandit de plus en plus vite.

**Question : quelle distance a-t-elle parcourue entre $t=0$ et $t=2\ \text{s}$ ?**

Tu connais déjà le principe : sur un graphique vitesse-temps, la distance parcourue est **l'aire sous la courbe** de $v(t)$. Si $v(t)$ était constante, ce serait un rectangle — base $\times$ hauteur. Si $v(t)$ était une droite (accélération constante), ce serait un triangle — tu saurais faire le calcul avec les formules de géométrie du collège.

Mais ici, $v(t)=t^2$ trace une parabole, pas une droite. Aucun découpage en rectangles ou en triangles ne donne le contour exact de cette région. Avant de lire la suite, prends position quand même : à vue d'oeil, penses-tu que cette distance est plus proche de $1\ \text{m}$, de $2$ à $3\ \text{m}$, ou de plus de $4\ \text{m}$ ? Engage-toi sur une réponse avant de continuer.

[[checkpoint:cp-r0-predict]]

Le problème est là depuis toujours : on sait calculer une aire quand le contour est fait de droites. On ne sait pas encore quoi faire quand le contour est une courbe. C'est exactement l'outil que cette leçon construit — et on va résoudre cette voiture, avec la valeur exacte, dès le chapitre 2.

---

## R1 — Le mécanisme : de l'aire à la primitive

### Le lien qu'on va utiliser

Tu sais déjà ce qu'est une primitive : $F$ est une primitive de $f$ sur un intervalle si $F'=f$ sur cet intervalle. Voici le fait qui fonde tout ce chapitre.

**Définition.** Soit $f$ une fonction continue sur un segment $[a,b]$, et soit $F$ une primitive de $f$ sur $[a,b]$. L'**intégrale de $f$ entre $a$ et $b$** est le nombre :

$$\int_a^b f(x)\,\mathrm{d}x = F(b) - F(a)$$

On note aussi $F(b)-F(a) = \big[F(x)\big]_a^b$. Le nombre $a$ est la **borne inférieure**, $b$ la **borne supérieure**.

### Pourquoi le choix de la primitive n'a aucune importance

Une objection immédiate : une fonction $f$ a une infinité de primitives (elles diffèrent toutes d'une constante). Si tu choisis une primitive différente, tu risques d'obtenir un résultat différent — et alors la définition ne voudrait rien dire.

Regarde pourquoi ce risque ne se réalise jamais. Soit $G$ une autre primitive de $f$ sur $[a,b]$. Alors $F'=G'=f$, donc $(G-F)'=0$ sur $[a,b]$ : une fonction de dérivée nulle sur un intervalle est constante (chapitre "Dérivabilité et étude des fonctions"), donc $G-F$ est égale à une constante $C$ :

$$G(x) = F(x) + C \quad \text{pour tout } x \in [a,b]$$

Calcule maintenant ce que ça donne pour $G(b)-G(a)$ :

$$G(b) - G(a) = \big(F(b)+C\big) - \big(F(a)+C\big)$$

$$G(b) - G(a) = F(b) - F(a)$$

La constante $C$ s'annule exactement dans la soustraction. Peu importe la primitive choisie, $F(b)-F(a)$ donne toujours le même nombre. C'est ce qui rend la définition cohérente : $\int_a^b f(x)\,\mathrm{d}x$ ne dépend pas d'un choix arbitraire, il ne dépend que de $f$, $a$ et $b$.

### L'interprétation en aire

On admet, comme pour toute fonction continue positive, le fait suivant : si $f$ est continue et $f \geq 0$ sur $[a,b]$, alors $\int_a^b f(x)\,\mathrm{d}x$ est exactement l'**aire** de la région délimitée par la courbe de $f$, l'axe des abscisses, et les droites d'équations $x=a$ et $x=b$. Cette aire est exprimée dans une unité appelée **unité d'aire**, notée u.a. — l'aire du carré de côté $1$ dans le repère choisi. (On revient sur la conversion en cm² au chapitre 9, quand ça compte vraiment.)

### Résoudre l'accroche

Reviens à la voiture du chapitre 1 : $v(t)=t^2$ sur $[0,2]$. La distance parcourue est $\int_0^2 t^2\,\mathrm{d}t$. Une primitive de $t \mapsto t^2$ est $F(t) = \dfrac{t^3}{3}$ (tu la connais depuis le chapitre "Primitives").

$$\int_0^2 t^2\,\mathrm{d}t = F(2) - F(0) = \frac{2^3}{3} - \frac{0^3}{3}$$

$$\int_0^2 t^2\,\mathrm{d}t = \frac{8}{3}$$

La distance exacte est $\dfrac{8}{3} \approx 2{,}67\ \text{m}$. Si ta prédiction du chapitre 1 se situait entre $2$ et $3\ \text{m}$, tu avais vu juste : la courbe $t^2$ démarre lentement, donc l'aire sous elle est plus proche de $0$ que ne le serait un triangle de même hauteur finale (qui donnerait $\frac12 \times 2 \times 4 = 4$).

[[figure:aire-sous-courbe]]

### Un deuxième exemple : une primitive que tu connais déjà

Le chapitre "Fonction logarithme" a défini $\ln$ comme l'unique primitive de $t \mapsto \dfrac1t$ sur $\left]0,+\infty\right[$ qui s'annule en $1$. Applique directement la définition de l'intégrale à cette primitive, pour $x>0$ :

$$\int_1^x \frac{1}{t}\,\mathrm{d}t = \ln(x) - \ln(1)$$

Et $\ln(1)=0$ par définition, donc :

$$\int_1^x \frac{1}{t}\,\mathrm{d}t = \ln(x)$$

Ce n'est pas une coïncidence ni un nouveau calcul à apprendre : c'est exactement ce que dit la définition de ce chapitre, appliquée à une primitive que tu connais déjà depuis un autre chapitre. L'intégrale et la primitive, ce sont deux regards sur le même objet.

### L'erreur à repérer ici

Une confusion fréquente à ce stade : penser qu'il faut « la bonne » primitive, celle qui vérifie une condition particulière (par exemple $F(0)=0$), et que choisir une autre primitive changerait le résultat. Ce n'est pas vrai — on vient de le démontrer : la constante s'annule toujours. Prends n'importe quelle primitive, la moins compliquée à écrire, et applique $F(b)-F(a)$.

[[checkpoint:cp-r1-primitive]]

---

## R2 — La linéarité de l'intégrale

### Le mécanisme

Tu calcules déjà des primitives terme par terme — une primitive de $3x^2-4x+5$, tu la trouves en primitivant chaque morceau séparément. Voici pourquoi ce geste, que tu fais sans y penser, est légitime.

Soient $f$ et $g$ deux fonctions continues sur $[a,b]$, de primitives respectives $F$ et $G$. Alors $F+G$ est une primitive de $f+g$, puisque $(F+G)'=F'+G'=f+g$. Applique la définition du chapitre 2 à cette primitive :

$$\int_a^b \big(f(x)+g(x)\big)\,\mathrm{d}x = \big(F(b)+G(b)\big) - \big(F(a)+G(a)\big)$$

$$\int_a^b \big(f(x)+g(x)\big)\,\mathrm{d}x = \big(F(b)-F(a)\big) + \big(G(b)-G(a)\big)$$

$$\int_a^b \big(f(x)+g(x)\big)\,\mathrm{d}x = \int_a^b f(x)\,\mathrm{d}x + \int_a^b g(x)\,\mathrm{d}x$$

Même raisonnement pour un facteur constant : $(kF)' = kF' = kf$, donc $kF$ est une primitive de $kf$, d'où :

$$\int_a^b k\,f(x)\,\mathrm{d}x = k\int_a^b f(x)\,\mathrm{d}x \qquad (k \in \mathbb{R})$$

$$\boxed{\int_a^b \big(f+g\big)(x)\,\mathrm{d}x = \int_a^b f(x)\,\mathrm{d}x + \int_a^b g(x)\,\mathrm{d}x \qquad \text{et} \qquad \int_a^b k f(x)\,\mathrm{d}x = k \int_a^b f(x)\,\mathrm{d}x}$$

C'est la **linéarité de l'intégrale**. Elle dit exactement pourquoi primitiver terme par terme fonctionne : chaque terme peut être traité séparément, puis on additionne (ou on soustrait) les résultats.

### Exemple travaillé

Calcule $\displaystyle\int_0^2 \big(3x^2-4x+5\big)\,\mathrm{d}x$ de deux façons, pour vérifier que la linéarité donne bien le même résultat que la primitive globale.

**Ce qu'on cherche et pourquoi ce geste :** on va d'abord traiter chaque terme séparément (en s'appuyant sur la linéarité qu'on vient d'établir), puis vérifier avec la primitive combinée $F(x)=x^3-2x^2+5x$ — les deux méthodes doivent coïncider.

**Terme par terme :**

$$\int_0^2 3x^2\,\mathrm{d}x = 3\left[\frac{x^3}{3}\right]_0^2 = 3\times\frac{8}{3} = 8$$

$$\int_0^2 4x\,\mathrm{d}x = 4\left[\frac{x^2}{2}\right]_0^2 = 4\times 2 = 8$$

$$\int_0^2 5\,\mathrm{d}x = 5\big[x\big]_0^2 = 5\times 2 = 10$$

Par linéarité :

$$\int_0^2 \big(3x^2-4x+5\big)\,\mathrm{d}x = 8 - 8 + 10 = 10$$

**Vérification avec la primitive globale** $F(x)=x^3-2x^2+5x$ :

$$F(2) = 8-8+10 = 10 \qquad F(0) = 0$$

$$\int_0^2 \big(3x^2-4x+5\big)\,\mathrm{d}x = F(2)-F(0) = 10$$

Les deux méthodes donnent $10$. C'est exactement ce que garantit la linéarité : découper en morceaux plus simples ne change pas le résultat, à condition de bien recombiner par addition et multiplication par $k$ — jamais par une autre opération.

---

## R3 — La relation de Chasles

### Une convention nécessaire d'abord

Jusqu'ici, on a toujours écrit $\int_a^b$ en supposant $a \leq b$. Pour que ce qui suit marche pour n'importe quel réel $c$ — pas seulement les $c$ situés entre $a$ et $b$ — on adopte deux conventions, qui découlent directement de la définition $F(b)-F(a)$ :

$$\int_a^a f(x)\,\mathrm{d}x = 0 \qquad \text{et} \qquad \int_b^a f(x)\,\mathrm{d}x = -\int_a^b f(x)\,\mathrm{d}x$$

La première est immédiate : $F(a)-F(a)=0$. La deuxième aussi : $F(a)-F(b) = -\big(F(b)-F(a)\big)$.

### Le mécanisme

Soit $f$ continue sur un intervalle contenant $a$, $b$ et $c$ (trois réels quelconques, dans n'importe quel ordre), et $F$ une primitive de $f$. Écris $F(b)-F(a)$ en faisant apparaître $F(c)$ au passage — un simple ajout et retrait qui ne change rien à la valeur :

$$F(b) - F(a) = \big(F(b) - F(c)\big) + \big(F(c) - F(a)\big)$$

Traduis chaque parenthèse en intégrale, grâce à la définition du chapitre 2 :

$$\boxed{\int_a^b f(x)\,\mathrm{d}x = \int_a^c f(x)\,\mathrm{d}x + \int_c^b f(x)\,\mathrm{d}x}$$

C'est la **relation de Chasles**. Elle est vraie pour n'importe quel $c$ — y compris un $c$ situé en dehors du segment $[a,b]$ — précisément parce que les conventions ci-dessus donnent un sens à $\int_c^b$ et $\int_a^c$ dans tous les cas.

### Exemple travaillé

On te donne $\displaystyle\int_0^5 f(x)\,\mathrm{d}x = 12$ et $\displaystyle\int_0^2 f(x)\,\mathrm{d}x = 5$. Calcule $\displaystyle\int_2^5 f(x)\,\mathrm{d}x$, sans connaître l'expression de $f$.

**Ce qu'on cherche et pourquoi ce geste :** on ne connaît pas $f$, donc impossible de chercher une primitive. Le seul outil disponible ici est la relation de Chasles, appliquée en $c=2$, qui relie les trois intégrales entre elles sans jamais avoir besoin de $f$ explicitement.

$$\int_0^5 f(x)\,\mathrm{d}x = \int_0^2 f(x)\,\mathrm{d}x + \int_2^5 f(x)\,\mathrm{d}x$$

$$12 = 5 + \int_2^5 f(x)\,\mathrm{d}x$$

$$\int_2^5 f(x)\,\mathrm{d}x = 7$$

C'est tout l'intérêt de Chasles dans les exercices : elle relie des intégrales entre elles par une simple relation additive, même quand $f$ reste une fonction abstraite — c'est aussi l'outil qu'on utilisera au chapitre 9 pour découper une aire à l'endroit où une courbe change de signe.

[[figure:chasles-decoupage-aire]]

[[checkpoint:cp-lin-chasles]]

---

## R4 — Positivité et comparaison

### Le mécanisme de la positivité

**Propriété.** Si $f$ est continue et $f \geq 0$ sur $[a,b]$ (avec $a \leq b$), alors $\displaystyle\int_a^b f(x)\,\mathrm{d}x \geq 0$.

**Pourquoi c'est vrai :** soit $F$ une primitive de $f$ sur $[a,b]$. Comme $F'=f\geq 0$ sur tout l'intervalle, $F$ est **croissante** sur $[a,b]$ (chapitre "Dérivabilité et étude des fonctions" : dérivée positive $\Rightarrow$ fonction croissante). Une fonction croissante vérifie $F(b) \geq F(a)$ dès que $b \geq a$. Donc :

$$\int_a^b f(x)\,\mathrm{d}x = F(b) - F(a) \geq 0$$

Ce n'est pas qu'une histoire d'aire (« une aire ne peut pas être négative ») : c'est une conséquence directe du sens de variation de la primitive.

### Le mécanisme de la comparaison

**Propriété.** Si $f \leq g$ sur $[a,b]$ (avec $a \leq b$), alors $\displaystyle\int_a^b f(x)\,\mathrm{d}x \leq \int_a^b g(x)\,\mathrm{d}x$.

**Pourquoi c'est vrai :** $f \leq g$ signifie $g-f \geq 0$ sur $[a,b]$. Applique la positivité à la fonction $g-f$ :

$$\int_a^b \big(g(x)-f(x)\big)\,\mathrm{d}x \geq 0$$

Par linéarité (chapitre 3), le membre de gauche se sépare :

$$\int_a^b g(x)\,\mathrm{d}x - \int_a^b f(x)\,\mathrm{d}x \geq 0$$

$$\int_a^b f(x)\,\mathrm{d}x \leq \int_a^b g(x)\,\mathrm{d}x$$

La comparaison n'est donc pas une nouvelle règle indépendante : c'est la positivité, appliquée à la différence, combinée à la linéarité.

### Exemple travaillé

Sans calculer $\displaystyle\int_0^1 x^2\,\mathrm{d}x$ directement, encadre-la à l'aide de la comparaison.

**Ce qu'on cherche et pourquoi ce geste :** on cherche deux fonctions faciles à intégrer qui encadrent $x^2$ sur $[0,1]$. Sur cet intervalle précis, $0 \leq x \leq 1$, donc $x^2 \leq x$ (multiplier une inégalité entre nombres de $[0,1]$ par $x \geq 0$ ne change pas son sens) — vérifie-le directement : $x - x^2 = x(1-x) \geq 0$ pour $x \in [0,1]$, car les deux facteurs sont positifs sur cet intervalle. On a donc l'encadrement $0 \leq x^2 \leq x$ sur $[0,1]$.

Par positivité (borne du bas) et par comparaison (borne du haut) :

$$0 \leq \int_0^1 x^2\,\mathrm{d}x \leq \int_0^1 x\,\mathrm{d}x$$

Calcule la borne de droite : $\displaystyle\int_0^1 x\,\mathrm{d}x = \left[\frac{x^2}{2}\right]_0^1 = \frac12$. Donc $0 \leq \displaystyle\int_0^1 x^2\,\mathrm{d}x \leq \dfrac12$.

**Vérification :** la valeur exacte est $\displaystyle\int_0^1 x^2\,\mathrm{d}x = \left[\frac{x^3}{3}\right]_0^1 = \dfrac13$. On a bien $0 \leq \dfrac13 \leq \dfrac12$ — l'encadrement tient.

[[figure:comparaison-aires-nichees]]

---

## R5 — L'inégalité de la moyenne

### Le mécanisme

**Propriété (inégalité de la moyenne).** Si $f$ est continue sur $[a,b]$ (avec $a \leq b$) et si, pour tout $x \in [a,b]$, $m \leq f(x) \leq M$ (deux constantes), alors :

$$m(b-a) \leq \int_a^b f(x)\,\mathrm{d}x \leq M(b-a)$$

**Pourquoi c'est vrai :** applique deux fois la comparaison du chapitre 5, une fois à $m \leq f(x)$, une fois à $f(x) \leq M$ — en traitant $m$ et $M$ comme des fonctions constantes. Une primitive de la fonction constante $x \mapsto m$ est $x \mapsto mx$, donc :

$$\int_a^b m\,\mathrm{d}x = m(b-a) \qquad \text{et} \qquad \int_a^b M\,\mathrm{d}x = M(b-a)$$

La comparaison $m \leq f \leq M$ donne alors directement, en intégrant chaque membre :

$$m(b-a) \leq \int_a^b f(x)\,\mathrm{d}x \leq M(b-a)$$

Une conséquence utile de la même idée, appliquée à $|f|$ : si $|f(x)| \leq M$ sur $[a,b]$, alors $\left|\displaystyle\int_a^b f(x)\,\mathrm{d}x\right| \leq M(b-a)$ (on applique l'encadrement ci-dessus à $m=-M$).

### Exemple travaillé

Encadre $\displaystyle\int_0^1 e^x\,\mathrm{d}x$ sans la calculer, à l'aide de l'inégalité de la moyenne, puis compare à la valeur exacte.

**Ce qu'on cherche et pourquoi ce geste :** on a besoin du minimum et du maximum de $e^x$ sur $[0,1]$. La fonction exponentielle est strictement croissante (chapitre "Fonction exponentielle"), donc sur $[0,1]$ son minimum est atteint en $x=0$ et son maximum en $x=1$ :

$$e^0 \leq e^x \leq e^1 \quad \text{pour } x \in [0,1] \qquad \text{c’est-à-dire} \qquad 1 \leq e^x \leq e$$

Applique l'inégalité de la moyenne avec $m=1$, $M=e$, $b-a=1$ :

$$1 \times 1 \leq \int_0^1 e^x\,\mathrm{d}x \leq e \times 1$$

$$1 \leq \int_0^1 e^x\,\mathrm{d}x \leq e$$

**Vérification :** la valeur exacte est $\displaystyle\int_0^1 e^x\,\mathrm{d}x = \big[e^x\big]_0^1 = e - 1 \approx 1{,}718$. On a bien $1 \leq e-1 \leq e$ (puisque $e \approx 2{,}718$) — l'encadrement est cohérent, et il donne une estimation rapide de la valeur, sans même calculer $e-1$.

[[figure:inegalite-moyenne-rectangles]]

---

## R6 — La valeur moyenne d'une fonction

### Le mécanisme

Reprends l'inégalité de la moyenne du chapitre 6 : $m(b-a) \leq \displaystyle\int_a^b f(x)\,\mathrm{d}x \leq M(b-a)$. Divise les trois membres par $b-a>0$ :

$$m \leq \frac{1}{b-a}\int_a^b f(x)\,\mathrm{d}x \leq M$$

Ce nombre coincé entre $m$ et $M$ a un nom : c'est la **valeur moyenne** de $f$ sur $[a,b]$.

**Définition.** La valeur moyenne de $f$ sur $[a,b]$ est le réel :

$$\boxed{\mu = \frac{1}{b-a}\int_a^b f(x)\,\mathrm{d}x}$$

**L'image à garder :** $\mu$ est la hauteur du rectangle de largeur $(b-a)$ dont l'aire est **exactement égale** à l'aire sous la courbe de $f$ sur $[a,b]$ (quand $f \geq 0$). C'est un aplatissement : on remplace une courbe qui monte et qui descend par une seule hauteur constante, choisie pour que l'aire totale ne change pas. Et comme on vient de le montrer, cette hauteur est toujours coincée entre le minimum $m$ et le maximum $M$ de $f$ sur l'intervalle — elle ne peut pas être plus extrême que la fonction elle-même.

### Exemple travaillé

Calcule la valeur moyenne de $f(x)=x^2$ sur $[0,3]$.

**Ce qu'on cherche et pourquoi ce geste :** appliquer directement la définition — calculer d'abord l'intégrale, puis diviser par la longueur de l'intervalle.

$$\int_0^3 x^2\,\mathrm{d}x = \left[\frac{x^3}{3}\right]_0^3 = \frac{27}{3} = 9$$

$$\mu = \frac{1}{3-0}\times 9 = 3$$

La valeur moyenne de $x^2$ sur $[0,3]$ est $3$. Un rectangle de largeur $3$ et de hauteur $3$ a une aire de $9$ — exactement la même aire que sous la parabole entre $0$ et $3$.

**Vérification de cohérence :** sur $[0,3]$, $f$ varie de $m=f(0)=0$ à $M=f(3)=9$. On a bien $0 \leq 3 \leq 9$ : la valeur moyenne est coincée entre le minimum et le maximum, comme le garantit le mécanisme.

[[figure:valeur-moyenne-rectangle]]

---

## R7 — L'intégration par parties

### D'où vient la formule

Toutes les propriétés vues jusqu'ici viennent de la définition et de la linéarité. Celle-ci vient d'ailleurs : de la règle de dérivation d'un produit, que tu connais depuis le chapitre "Dérivabilité et étude des fonctions".

Soient $u$ et $v$ deux fonctions dérivables sur $[a,b]$, à dérivées $u'$ et $v'$ continues. La règle du produit donne, pour tout $x \in [a,b]$ :

$$(uv)'(x) = u'(x)v(x) + u(x)v'(x)$$

Cette égalité est vraie **pour tout** $x$ de $[a,b]$ ; intègre les deux membres entre $a$ et $b$ (par linéarité, le membre de droite se sépare en deux intégrales) :

$$\int_a^b (uv)'(x)\,\mathrm{d}x = \int_a^b u'(x)v(x)\,\mathrm{d}x + \int_a^b u(x)v'(x)\,\mathrm{d}x$$

Le membre de gauche se calcule directement : $uv$ est elle-même une primitive de $(uv)'$, donc $\displaystyle\int_a^b (uv)'(x)\,\mathrm{d}x = \big[u(x)v(x)\big]_a^b$. Remplace :

$$\big[u(x)v(x)\big]_a^b = \int_a^b u'(x)v(x)\,\mathrm{d}x + \int_a^b u(x)v'(x)\,\mathrm{d}x$$

Isole le terme en $v'$ — c'est souvent lui qui est difficile à intégrer directement :

$$\boxed{\int_a^b u(x)v'(x)\,\mathrm{d}x = \big[u(x)v(x)\big]_a^b - \int_a^b u'(x)v(x)\,\mathrm{d}x}$$

C'est l'**intégration par parties (IPP)**. Elle ne fait pas disparaître la difficulté : elle **l'échange**. Un produit $u \cdot v'$ difficile à intégrer devient un produit $u' \cdot v$, plus facile, au prix d'un terme de bord $[uv]_a^b$. Le jeu entier de l'IPP consiste à choisir $u$ (dont la dérivée $u'$ doit être plus simple que $u$) et $v'$ (dont une primitive $v$ doit être facile à trouver).

### Exemple travaillé 1

Calcule $\displaystyle\int_0^1 x\,e^x\,\mathrm{d}x$.

**Ce qu'on cherche et pourquoi ce geste :** il faut choisir quel facteur dériver et quel facteur primitiver. Si on dérive $x$, on obtient $1$ — plus simple. Si on dérive $e^x$, on obtient encore $e^x$ — ça ne simplifie rien. Le bon choix est donc $u=x$ (car $u'=1$ est plus simple que $u$) et $v'=e^x$ (dont une primitive $v=e^x$ est immédiate). Le mauvais réflexe serait de poser $u=e^x$ et $v'=x$ : on obtiendrait $v=\frac{x^2}{2}$, ce qui complique l'intégrale suivante au lieu de la simplifier.

Avec $u=x$ ($u'=1$) et $v'=e^x$ ($v=e^x$) :

$$\int_0^1 x\,e^x\,\mathrm{d}x = \big[x\,e^x\big]_0^1 - \int_0^1 1\cdot e^x\,\mathrm{d}x$$

$$= \big(1\cdot e^1 - 0\cdot e^0\big) - \big[e^x\big]_0^1$$

$$= e - (e-1)$$

$$= 1$$

### Exemple travaillé 2

Calcule $\displaystyle\int_1^e \ln(x)\,\mathrm{d}x$.

**Ce qu'on cherche et pourquoi ce geste :** ici, il n'y a pas de produit visible — seulement $\ln(x)$. Le geste classique : écrire $\ln(x) = 1 \times \ln(x)$, et poser $u=\ln(x)$ (car $u'=\frac1x$ est plus simple que $\ln(x)$ lui-même) et $v'=1$ (dont la primitive la plus simple est $v=x$).

Avec $u=\ln(x)$ ($u'=\frac1x$) et $v'=1$ ($v=x$) :

$$\int_1^e \ln(x)\,\mathrm{d}x = \big[x\ln(x)\big]_1^e - \int_1^e x\cdot\frac1x\,\mathrm{d}x$$

$$= \big[x\ln(x)\big]_1^e - \int_1^e 1\,\mathrm{d}x$$

$$= \big(e\ln(e) - 1\ln(1)\big) - \big[x\big]_1^e$$

$$= (e - 0) - (e-1)$$

$$= 1$$

Les deux exemples tombent sur $1$ — pas par miracle, juste parce que les nombres ont été choisis pour rester lisibles ; ce qui compte, c'est la méthode : le terme de bord moins l'intégrale du produit dérivé-primitivé.

[[checkpoint:cp-ipp]]

---

## R8 — Calculer des aires : sous une courbe, entre deux courbes, et les unités d'aire

### Le piège : l'intégrale signée n'est pas toujours l'aire

L'interprétation en aire (chapitre 2) suppose $f \geq 0$. Dès que $f$ change de signe sur l'intervalle, $\displaystyle\int_a^b f(x)\,\mathrm{d}x$ n'est **plus** l'aire — les parties où $f<0$ soustraient de la valeur au lieu d'ajouter, alors qu'une aire est toujours positive. La méthode : repérer les intervalles où $f \geq 0$ et ceux où $f \leq 0$ (typiquement en cherchant les racines de $f$), utiliser Chasles (chapitre 4) pour découper, et prendre la valeur absolue de chaque morceau négatif.

### Exemple travaillé : une courbe qui change de signe

Calcule l'aire de la région délimitée par la courbe de $f(x)=x^2-4$, l'axe des abscisses, et les droites $x=0$ et $x=3$.

**Ce qu'on cherche et pourquoi ce geste :** avant d'intégrer quoi que ce soit, il faut savoir où $f$ change de signe. $f(x)=0 \iff x^2=4 \iff x=2$ (seule racine dans $[0,3]$, puisque $x=-2$ n'y est pas). Teste un point de chaque côté : $f(0)=-4<0$ et $f(3)=5>0$. Donc $f \leq 0$ sur $[0,2]$ et $f \geq 0$ sur $[2,3]$ — la courbe traverse l'axe en $x=2$.

Une primitive de $f$ est $F(x) = \dfrac{x^3}{3}-4x$.

$$F(0)=0 \qquad F(2) = \frac83-8 = -\frac{16}{3} \qquad F(3) = 9-12 = -3$$

Sur $[0,2]$, $f \leq 0$, donc l'aire de ce morceau est l'**opposé** de l'intégrale :

$$\text{aire}_{[0,2]} = -\int_0^2 f(x)\,\mathrm{d}x = -\big(F(2)-F(0)\big) = -\left(-\frac{16}{3}\right) = \frac{16}{3}$$

Sur $[2,3]$, $f \geq 0$, donc l'aire de ce morceau est directement l'intégrale :

$$\text{aire}_{[2,3]} = \int_2^3 f(x)\,\mathrm{d}x = F(3)-F(2) = -3-\left(-\frac{16}{3}\right) = \frac{7}{3}$$

Par Chasles, l'aire totale est la somme de ces deux morceaux — **jamais** leur différence, puisqu'une aire s'accumule :

$$\text{aire totale} = \frac{16}{3}+\frac{7}{3} = \frac{23}{3}\ \text{u.a.}$$

**L'erreur à repérer :** si tu avais calculé directement $\displaystyle\int_0^3 f(x)\,\mathrm{d}x = F(3)-F(0) = -3$, tu aurais obtenu un nombre **négatif** — ce n'est déjà pas une aire. Et si tu avais pris la valeur absolue de ce résultat global, $|-3|=3$, ce n'est **toujours pas** la bonne aire ($\frac{23}{3} \approx 7{,}67 \neq 3$) : la partie positive et la partie négative se sont annulées partiellement dans l'intégrale globale avant que tu ne prennes la valeur absolue. Il faut découper **avant** de prendre les valeurs absolues, pas après.

### Aire entre deux courbes

Pour l'aire entre les courbes de $f$ et de $g$ sur $[a,b]$, le même principe s'applique à leur différence : l'aire est $\displaystyle\int_a^b |f(x)-g(x)|\,\mathrm{d}x$, ce qui, en pratique, demande de déterminer d'abord le signe de $f-g$ (souvent en résolvant $f(x)=g(x)$ pour trouver les points d'intersection, puis en testant un point de chaque sous-intervalle).

**Exemple travaillé.** Calcule l'aire de la région comprise entre les courbes de $f(x)=x$ et $g(x)=x^2$, entre leurs deux points d'intersection.

**Ce qu'on cherche et pourquoi ce geste :** trouver d'abord où les deux courbes se croisent, puis déterminer laquelle est au-dessus sur l'intervalle entre ces points.

$$f(x)=g(x) \iff x=x^2 \iff x(1-x)=0 \iff x=0 \text{ ou } x=1$$

Sur $[0,1]$, teste un point, par exemple $x=0{,}5$ : $f(0{,}5)=0{,}5$ et $g(0{,}5)=0{,}25$, donc $f \geq g$ sur $[0,1]$ (vérifie-le en général : $x-x^2=x(1-x) \geq 0$ pour $x \in [0,1]$, comme au chapitre 5). Comme le signe de $f-g$ ne change pas sur $[0,1]$, l'aire s'obtient directement, sans découpage :

$$\text{aire} = \int_0^1 \big(x-x^2\big)\,\mathrm{d}x = \left[\frac{x^2}{2}-\frac{x^3}{3}\right]_0^1 = \frac12-\frac13$$

$$\text{aire} = \frac16\ \text{u.a.}$$

[[figure:aire-entre-courbes]]

### Les unités d'aire, converties en cm²

L'unité d'aire (u.a.) dépend du repère choisi : c'est l'aire du rectangle de côtés $1$ (une unité sur l'axe des abscisses) et $1$ (une unité sur l'axe des ordonnées). Si un exercice précise que le repère est gradué à raison de $2\ \text{cm}$ par unité sur chaque axe, alors :

$$1\ \text{u.a.} = 2\ \text{cm} \times 2\ \text{cm} = 4\ \text{cm}^2$$

Pour l'exemple précédent, l'aire réelle serait $\dfrac16 \times 4 = \dfrac23\ \text{cm}^2$. Le réflexe : ne jamais convertir avant d'avoir fini le calcul en unités d'aire — l'intégrale donne toujours un nombre en u.a., et la conversion vers cm² (ou toute autre unité de longueur) vient à la toute fin, en multipliant par le produit des deux échelles du repère.

[[checkpoint:cp-aire-signe]]

---

## R9 — Faire tourner la région : le volume d'un solide de révolution

Au chapitre 9, tu as mesuré une région : son aire, en u.a., puis en cm². Fais-la maintenant tourner d'un tour complet autour de l'axe des abscisses : elle ne balaie plus une surface, elle engendre un **solide** — et ce solide a un volume que la même intégrale sait calculer. Pense au profil d'un verre, ou d'un vase, tourné sur un tour de potier : le tour de potier, c'est cette rotation-là. Et la question qu'on se pose alors est concrète — combien de liquide ce vase peut-il contenir ? C'est très exactement la question que pose le bac :

> « Calculer, en cm³, le volume du solide engendré par la rotation d'un tour complet autour de l'axe des abscisses de la portion de la courbe $(C)$ relative à l'intervalle $[a,b]$. (On prendra $\|\vec i\| = 1$ cm) »

Avant d'aller plus loin, mets ta première intuition à l'épreuve : dans la scène qui suit, cinq étapes, et à chaque fois un pari avant que la scène ne réponde.

[[embed:solide-de-revolution]]

### Le mécanisme

**Le geste.** La région sous la courbe, sur $[a,b]$, tourne d'un tour complet autour de $(Ox)$. Elle ne balaie plus une surface : elle **engendre un solide**.

**Où couper.** On coupe le solide par un plan perpendiculaire à l'axe, à l'abscisse $x$. C'est le découpage qui rend la coupe simple — parce que l'axe de rotation la traverse au centre.

**La coupe est un disque, pas un cercle.** Le segment vertical qui va de $(x,0)$ à $(x,f(x))$ appartient entièrement à la région. Chacun de ses points, à la hauteur $y$, décrit un cercle de rayon $y$ ; le segment tout entier balaie donc tous les cercles de rayon $0$ à $f(x)$ : un disque **plein** de rayon $f(x)$. (Pour $f(x)=\sqrt{x}$, à l'abscisse $2{,}25$ : un disque de rayon $1{,}5$.)

**L'aire de cette tranche.** Un disque de rayon $f(x)$ a pour aire $\pi f(x)^2$ (ici $\pi\times 1{,}5^2 = 2{,}25\pi$). C'est le point où tout se joue : **le rayon est au carré** — doubler $f$ ne double pas la tranche, il la **quadruple**.

[[figure:volume-revolution-tranche]]

**On accumule le long de $[a,b]$.** Prends une tranche très fine, d'épaisseur $\mathrm{d}x$, autour de l'abscisse $x$ : son volume vaut à peu près l'aire de sa face, $\pi f(x)^2$, fois cette épaisseur. L'intégrale accumule exactement ces aires de tranche, tout le long de $[a,b]$ — au chapitre 2, elle accumulait des hauteurs et rendait une aire ; ici, elle accumule des aires et rend un volume : la même machine, un cran plus haut en dimension. D'où :

$$\boxed{V = \pi\int_a^b \big(f(x)\big)^2\,\mathrm{d}x} \quad \text{(en unités de volume, u.v.)}$$

**Ce qu'on admet, et dans quel registre.** Comme au chapitre 2 pour l'aire (« on admet, comme pour toute fonction continue positive, le fait suivant… »), on admet ici que l'accumulation des aires de tranches est donnée par cette intégrale. Même registre, même honnêteté : on dit qu'on l'admet, on ne le déguise pas en démonstration.

**Les hypothèses, énoncées, pas sous-entendues.** $f$ continue et **positive** sur $[a,b]$ : le carré rend $f(x)^2$ automatiquement positif, donc, contrairement à l'aire au chapitre 9, il n'y a jamais besoin de découper selon le signe de $f$ à l'intérieur de cette intégrale. Et le repère est **orthonormé** : c'est ce qui garantit que l'unité de volume est un cube, donc que $1$ u.v. $= k^3$ cm³.

[[checkpoint:cp-volume-disque]]

### L'erreur à repérer

Reprenons $f(x)=\sqrt{x}$ sur $[0,4]$. Quelle est son aire ? Une primitive de $\sqrt{x}$ est $x\mapsto \dfrac23 x\sqrt{x}$ — vérifie-le en la dérivant. D'où :

$$\int_0^4 \sqrt{x}\,\mathrm{d}x = \left[\frac{2}{3}x\sqrt{x}\right]_0^4 = \frac{2}{3}\times4\times2 = \frac{16}{3}\ \text{u.a.}$$

Voici, sur cette unique fonction, cinq calculs qu'un élève pourrait écrire pour le volume — un seul est le bon :

| Ce qu'on écrit | Ce que ça vaut | Le modèle qui tourne derrière |
|---|---|---|
| $V = \pi\displaystyle\int_0^4 x\,\mathrm{d}x = 8\pi \approx 25{,}13$ | **correct** | la tranche est un **disque** d'aire $\pi f(x)^2$ |
| $\pi\displaystyle\int_0^4 \sqrt{x}\,\mathrm{d}x = \dfrac{16\pi}{3} \approx 16{,}76$ | faux | le rayon n'est pas élevé au carré |
| $2\pi\displaystyle\int_0^4 \sqrt{x}\,\mathrm{d}x = \dfrac{32\pi}{3} \approx 33{,}51$ | faux | « un tour complet vaut $2\pi$, donc on multiplie l'aire par $2\pi$ » — on prend la **circonférence** pour le disque |
| $\displaystyle\int_0^4 x\,\mathrm{d}x = 8$ | faux | « l'intégrale donne directement le volume, comme elle donnait l'aire » |
| $\pi\left(\displaystyle\int_0^4 \sqrt{x}\,\mathrm{d}x\right)^2 = \dfrac{256\pi}{9} \approx 89{,}36$ | faux | le carré posé sur **l'intégrale** au lieu de la **fonction** |

La ligne du rayon non élevé au carré casse sur le chiffre lui-même : à $x=1$ le rayon vaut $1$, à $x=4$ il vaut $2$ — il a doublé. $\pi\displaystyle\int f$ traite alors la tranche comme si son aire avait doublé aussi, alors que la géométrie dit qu'elle a quadruplé : $\pi\times1^2$ contre $\pi\times2^2$. Et le contrôle dimensionnel confirme l'erreur : $\pi\displaystyle\int f$ accumule des longueurs, il rend une aire — jamais un volume.

La ligne du $2\pi$ casse sur une raison géométrique, pas sur l'autorité d'un calcul : les points de la région ne sont pas tous à la même distance de l'axe — celui qui est à la hauteur $1$ décrit un cercle de rayon $1$, celui qui est à la hauteur $2$ un cercle deux fois plus grand. Multiplier toute l'aire par un seul facteur revient à supposer qu'ils balaient tous la même chose.

La ligne sans $\pi$ casse sur les unités elles-mêmes : $\frac{16}{3}$ u.a. mesure une **surface**, $8\pi$ u.v. mesure un **volume** — une aire ne répond jamais à une question de volume, même quand le nombre paraît raisonnable. Et $\displaystyle\int f^2$ toute seule, sans le $\pi$, empilerait des **carrés** de côté $f(x)$, pas des disques : ce n'est même pas l'aire de la bonne tranche.

La ligne du carré posé sur l'intégrale casse sur un contre-exemple d'une ligne. Prends $f(x)=x$ sur $[0,1]$ : $\displaystyle\int_0^1 f(x)\,\mathrm{d}x = \frac12$, donc $\left(\displaystyle\int_0^1 f(x)\,\mathrm{d}x\right)^2 = \frac14$ — alors que $\displaystyle\int_0^1 f(x)^2\,\mathrm{d}x = \frac13$. Deux nombres différents : le carré ne peut donc pas se poser sur l'intégrale, il doit se poser sur la fonction, avant d'intégrer. La linéarité (chapitre 3) ne dit rien du produit de deux fonctions — encore moins du carré d'une intégrale.

### Exemple travaillé 1

**Ce qu'on cherche et pourquoi ce geste :** calculer le volume engendré par $f(x)=\sqrt{x}$ sur $[0,4]$. Le carré n'est pas une corvée, c'est une **chance** — il fait disparaître la racine : $(\sqrt{x})^2 = x$, un polynôme. Chaque fois qu'un énoncé de bac met une racine dans $f$ pour une question de volume, c'est presque toujours pour que $f^2$ redevienne simple — c'est le montage standard de ce type de question.

$$V = \pi\int_0^4 \big(\sqrt{x}\big)^2\,\mathrm{d}x$$

La racine a disparu : c'est le carré qui l'a effacée, il reste un polynôme.

$$= \pi\int_0^4 x\,\mathrm{d}x$$

$$= \pi\left[\frac{x^2}{2}\right]_0^4$$

$$= \pi\left(\frac{16}{2}-0\right)$$

$$\boxed{V = 8\pi\ \text{u.v.} \approx 25{,}13\ \text{u.v.}}$$

Le solide est un paraboloïde — le bol qu'on obtient en faisant tourner une parabole couchée.

### Exemple travaillé 2

**Ce qu'on cherche et pourquoi ce geste :** on prend une figure dont on connaît **déjà** le volume depuis le collège, et on vérifie que l'outil neuf redonne la vieille formule. Si ça ne collait pas, c'est l'outil qui serait faux.

La droite $f(x) = \dfrac23 x$ sur $[0,3]$ engendre un **cône** de rayon $r=2$ (la valeur de $f$ en $3$) et de hauteur $h=3$.

$$V = \pi\int_0^3 \left(\frac{2}{3}x\right)^2\mathrm{d}x$$

$$= \pi\int_0^3 \frac{4}{9}x^2\,\mathrm{d}x$$

On sort la constante $\frac49$ de l'intégrale (linéarité, chapitre 3) plutôt que de la laisser mêlée à $x^2$ : il ne reste plus qu'à primitiver $x^2$ seul.

$$= \pi\cdot\frac{4}{9}\left[\frac{x^3}{3}\right]_0^3$$

$$= \pi\cdot\frac{4}{9}\cdot\frac{27}{3}$$

$$= \pi\cdot\frac{4}{9}\cdot 9$$

$$\boxed{V = 4\pi\ \text{u.v.}}$$

**La vérification :** la formule du cône donne $\dfrac{\pi r^2 h}{3} = \dfrac{\pi\times 2^2\times 3}{3} = 4\pi$. **Identique.**

**Le cas général, en trois lignes** — la preuve que la coïncidence n'en est pas une — avec $f(x) = \dfrac{r}{h}x$ sur $[0,h]$ :

$$\pi\int_0^h \frac{r^2}{h^2}x^2\,\mathrm{d}x = \pi\frac{r^2}{h^2}\left[\frac{x^3}{3}\right]_0^h$$

$$= \pi\frac{r^2}{h^2}\cdot\frac{h^3}{3}$$

$$= \frac{\pi r^2 h}{3}$$

La formule du cône n'est plus une formule à retenir : c'est une intégrale qu'on sait refaire.

### Exemple travaillé 3

**Ce qu'on cherche et pourquoi ce geste :** sur $[1,e]$, $\ln x \geq 0$, donc $f(x)=\sqrt{\ln x}$ est bien définie et positive. Le carré donne $f(x)^2 = \ln x$ — et cette intégrale-là, **on l'a déjà calculée au chapitre 8** (exemple travaillé 2 de l'intégration par parties). Le réflexe d'expert n'est pas de recalculer : c'est de **reconnaître** et de réutiliser.

$$V = \pi\int_1^e \big(\sqrt{\ln x}\big)^2\,\mathrm{d}x$$

$$= \pi\int_1^e \ln(x)\,\mathrm{d}x$$

On reconnaît ici l'intégrale du chapitre 8 : pas besoin de refaire l'intégration par parties, la valeur $1$ est déjà acquise.

$$= \pi \times 1$$

$$\boxed{V = \pi\ \text{u.v.} \approx 3{,}14\ \text{u.v.}}$$

*(Rappel du chapitre 8, sans refaire l'intégration par parties : $\int_1^e \ln x\,\mathrm{d}x = \big[x\ln x\big]_1^e - \int_1^e 1\,\mathrm{d}x = e-(e-1) = 1$.)*

### Les unités de volume, et la conversion en cm³

**Le mécanisme, en une image :** $1$ u.a. est l'aire du **carré** bâti sur l'unité des deux axes. $1$ u.v. est le volume du **cube** bâti sur l'unité — trois longueurs, pas deux.

[[figure:unite-de-volume-cube]]

Dans un repère **orthonormé** où l'unité vaut $k$ cm sur chaque axe :

$$1\ \text{u.a.} = k^2\ \text{cm}^2 \qquad\text{et}\qquad \boxed{1\ \text{u.v.} = k^3\ \text{cm}^3}$$

Avec $k=2$ cm : $1$ u.v. $= 2\times2\times2 = 8$ cm³, donc l'exemple 1 vaut

$$V = 8\pi\ \text{u.v.}$$

On multiplie par le facteur du cube, $k^3=8$, maintenant que $V$ est connu en u.v. — jamais avant, jamais en cours de route.

$$= 8\pi \times 8\ \text{cm}^3$$

$$= 64\pi\ \text{cm}^3 \approx 201{,}1\ \text{cm}^3$$

**L'erreur à repérer :** multiplier par $k^2=4$ (le facteur de l'**aire**) et annoncer $32\pi\ \text{cm}^3$. C'est l'erreur d'un élève qui a **bien** appris la règle de l'aire et l'a transportée d'un cran trop court. Le réflexe qui protège, et qu'il faut nommer : une longueur se convertit avec $k$, une aire avec $k^2$, un volume avec $k^3$ — compte les directions.

[[checkpoint:cp-volume-unite]]

**Et pourquoi cette conversion ne s'apprend jamais toute seule :** le bac écrit très souvent « on prendra $\|\vec i\| = 1$ cm ». Alors $1$ u.v. $=1$ cm³ et **le nombre ne change pas** — la conversion est invisible, donc jamais exercée. Le jour où l'énoncé écrit $2$ cm, l'élève qui n'a jamais vu le cube multiplie par $4$.

**Pourquoi on ne convertit jamais en cours de route :** l'intégrale rend **toujours** des u.v. ; la conversion vient à la toute fin. Même règle qu'au chapitre 9 pour les u.a.

### Le réflexe de bac — traduire la phrase

Le bac ne demande jamais « calcule $\pi\int f^2$ ». Il écrit la phrase que tu as lue en ouvrant ce chapitre :

> « Calculer, en cm³, le volume du solide engendré par la rotation d'un tour complet autour de l'axe des abscisses de la portion de la courbe $(C)$ relative à l'intervalle $[a,b]$. (On prendra $\|\vec i\| = 1$ cm) »

Trois mots à repérer, et la traduction est automatique : **« un tour complet »** → le disque est entier ; **« autour de l'axe des abscisses »** → $V = \pi\displaystyle\int_a^b f(x)^2\,\mathrm{d}x$ ; **« en cm³ »** → il y aura une conversion à la toute fin, $1$ u.v. $=k^3$ cm³.

---

## R10 — Pour t'entraîner : les questions de type bac

Trois exercices, maintenant, à chercher **sans solution imprimée sous les yeux**. D'abord un **sujet d'examen national authentique** (2022), puis une **variation inédite** qui rejoue les mêmes gestes avec d'autres nombres — pour vérifier que tu reconnais la structure quand l'habillage change — et enfin une question de **volume de révolution**, dans le registre exact du bac. La règle du jeu, c'est là que se joue le vrai progrès : pour chaque question, cherche sur papier, engage une réponse, et **seulement ensuite** ouvre le raisonnement expert pour le comparer au tien.

### Exercice de type bac (2022)

Le sujet ci-dessous enchaîne les deux gestes du chapitre les plus fréquents à l'examen : **reconnaître une primitive** (en la dérivant, pas en l'intégrant), puis une **intégration par parties** dont l'intégrale restante se ramène au premier calcul. Deux réflexes suffisent : vérifier une primitive, c'est contrôler $F'=h$ ; et une IPP bien menée réutilise ce qu'on a déjà calculé plutôt que de repartir de zéro.

[[exercise:r-bac]]

### Une variation pour ne pas mémoriser

Même machinerie, autres nombres : une fonction $(x+2)e^x$ au lieu de $(x+1)e^x$, l'intervalle $[0,1]$ au lieu de $[-1,0]$, et un carré $(x+2)^2 e^x$ à intégrer par parties. À toi de reconnaître que « vérifier la primitive, puis une IPP qui réutilise l'intégrale » s'applique exactement pareil.

[[exercise:r-variation]]

### Un volume de révolution, pour finir

Une troisième question, toujours dans le registre du bac, sur l'intervalle $[1,e]$. Cherche les deux questions sur papier, engage une réponse, et seulement ensuite ouvre le raisonnement expert pour le comparer au tien.

[[exercise:r-volume]]

<!-- NOTE DE VALIDATION (relecture humaine) — points ouverts, non résolus par
     cet auteur :
     (1) skill_code proposé : `maths_calcul_integral`, même convention que
     `maths_fonction_logarithme` déjà présente dans le corpus. À confirmer
     contre une éventuelle convention de préfixe par filière (le corpus
     contient aussi des skill_code préfixés `sma_`) avant intégration en base.
     (2) Cette leçon suppose que le chapitre "Fonctions primitives" précède
     "Calcul intégral" dans la progression (ordre standard marocain :
     logarithme -> exponentielle -> primitives -> calcul intégral), et que
     l'élève maîtrise déjà les primitives usuelles (polynômes, 1/x -> ln,
     e^x, sin/cos). Le dossier `content/maths/primitives/` n'existe pas
     encore dans ce corpus — la continuité de voix/notation a été vérifiée
     contre `fonction-logarithme` (qui admet lui-même l'existence des
     primitives) plutôt que contre un chapitre "Primitives" propre. À
     confirmer que cet ordre correspond bien à la progression réelle du
     produit.
     (3) Terminologie "inégalité de la moyenne" (R5) : à confirmer qu'elle
     correspond au nom utilisé dans les manuels marocains SM (certains
     manuels français distinguent "inégalité de la moyenne" de la version
     stricte avec valeur absolue ; ici les deux formes sont présentées comme
     une seule propriété avec son corollaire).
     (4) Bornes de difficulté des items.yaml : les 6 items couvrent R1, R2,
     R4, R6, R7, R8 ; R3 (Chasles) et R5 (inégalité de la moyenne) ne sont
     pas couverts par un item dédié — laissé à la discrétion de la relecture
     pédagogique, le format 4-6 items du brief étant déjà atteint.

     NOTE AJOUTÉE (extension R9 — volume d'un solide de révolution, spec-
     extension.md) :
     (5) [CORRIGÉ] R9 utilise, pour la première fois dans cette leçon, la
     primitive de $\sqrt{x}$ (exemple travaillé 1, et le calcul d'aire de
     « L'erreur à repérer »). Le rung N'INVOQUE PAS la règle générale
     $x^r \to x^{r+1}/(r+1)$ pour $r$ rationnel (potentiellement hors de la
     limite SExp sur les fonctions puissances) : la primitive $x\mapsto
     \frac23 x\sqrt{x}$ est donnée directement dans le texte, et l'élève est
     invité à la vérifier en la dérivant — exactement le même geste que pour
     toute primitive candidate ailleurs dans cette leçon (chapitre 2,
     chapitre 8). Aucun nouveau prérequis n'est donc introduit ; signalé
     pour la relecture par prudence, comme le point (2).
     (6) items.yaml, checkpoints.yaml et le descripteur de scène
     `media/solide-de-revolution.json` sont produits par d'autres auteurs en
     parallèle sur la base du même spec-extension.md ; les marqueurs
     `[[figure:volume-revolution-tranche]]`, `[[figure:unite-de-volume-cube]]`,
     `[[embed:solide-de-revolution]]` et `[[checkpoint:cp-volume-disque]]`
     posés dans R9 attendent ces livrables pour résoudre (validate-content les
     signalera comme non résolus tant qu'ils ne sont pas livrés).
-->
