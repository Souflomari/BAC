# Nombres complexes — forme trigonométrique et applications

---

## R0 — Accroche : que fait une multiplication, géométriquement ?

Tu sais déjà représenter un nombre complexe comme un point du plan (son image), et tu sais que l'addition de deux affixes correspond à une addition de vecteurs — une translation. Tu sais aussi que le module $|z|$ mesure une distance : $|z|$ est la distance de l'image de $z$ à l'origine, et $|z_B-z_A|$ est la distance $AB$.

Mais il reste une question qu'on n'a pas encore posée : que fait, géométriquement, une **multiplication** de deux complexes ?

Prends le cas le plus simple : multiplier par $i$. Avant de calculer quoi que ce soit, prends position : d'après toi, multiplier un point du plan par $i$, qu'est-ce que ça produit — un agrandissement ? un déplacement ? une rotation ? autre chose ? Engage-toi vraiment sur une réponse avant de continuer.

Maintenant, calcule, pour trois points différents, l'effet de la multiplication par $i$ :

- $z=2$, le point $(2,0)$ : $i \times 2 = 2i$, soit le point $(0,2)$.
- $z=3i$, le point $(0,3)$ : $i \times 3i = 3i^2 = -3$, soit le point $(-3,0)$.
- $z=1+i$, le point $(1,1)$ : $i(1+i) = i+i^2 = -1+i$, soit le point $(-1,1)$.

Regarde ces trois couples (point de départ, point d'arrivée). Dans les trois cas, le point est resté à la même distance de l'origine : $|2|=2=|2i|$ ; $|3i|=3=|-3|$ ; $|1+i|=\sqrt2=|-1+i|$. Pas d'agrandissement. Mais la direction, elle, a changé : à chaque fois, le point a tourné exactement d'un quart de tour ($90°$) autour de $O$, dans le sens direct. Vérifie-le toi-même sur le troisième couple : le point $(1,1)$ tourné d'un quart de tour direct autour de $O$ donne bien $(-1,1)$.

Si ta prédiction était « une rotation », tu avais vu juste. Si tu avais prédit autre chose, regarde l'écart : multiplier par $i$ ne déplace pas, n'agrandit pas — ça **fait tourner** tout le plan d'un quart de tour autour de l'origine.

Et voilà la question qui porte toute cette leçon. $i$ produit une rotation de $90°$ parce que $i$ occupe une place particulière dans le plan (à distance $1$ de $O$, dans une direction précise, à $90°$ de l'axe réel). **Est-ce que tout nombre complexe produit, de la même façon, une rotation — et peut-être aussi un agrandissement — quand on multiplie par lui ?** Et surtout : comment lire cet angle et ce facteur d'agrandissement directement sur $z$, sans avoir à deviner comme on vient de le faire pour $i$ ?

C'est exactement ce qu'on va construire : une nouvelle façon d'écrire les complexes qui rend ces angles et ces rapports visibles, là où la forme algébrique $a+bi$ les cachait complètement.

---

## R1 — Argument d'un complexe et forme trigonométrique

### L'angle qu'on n'avait pas encore nommé

Prends $z=a+bi$ non nul, d'image $M$. Tu connais déjà $r=|z|$, la distance $OM$. Il manque une deuxième information pour repérer $M$ complètement : la **direction** dans laquelle il se trouve, vue depuis $O$. Cette direction se mesure par un angle.

**Définition.** Pour $z \neq 0$, on appelle **argument** de $z$, noté $\arg(z)$, une mesure en radians de l'angle $(\vec u, \vec{OM})$, où $\vec u$ est le vecteur unitaire de l'axe réel. Cet angle n'est défini qu'à un multiple entier de $2\pi$ près : on écrit

$$\arg(z) = \theta\ [2\pi]$$

ce qui se lit « un argument de $z$ est $\theta$, à $2\pi$ près » — $\theta, \theta+2\pi, \theta-2\pi, \theta+4\pi, \ldots$ décrivent tous la même direction, donc le même point $M$. Pour $z=0$, l'image est $O$ elle-même : aucune direction n'a de sens, l'argument n'est pas défini.

### Pourquoi $\cos\theta = a/r$ et $\sin\theta = b/r$

Le point $M$ est à distance $r$ de $O$, dans la direction d'angle $\theta$. Par définition même du cosinus et du sinus sur le cercle trigonométrique (étendue à un cercle de rayon $r$ plutôt que $1$, par simple agrandissement), les coordonnées de $M$ sont $(r\cos\theta,\, r\sin\theta)$. Or $M$ a pour coordonnées $(a,b)$, puisque $z=a+bi$. Donc

$$a = r\cos\theta \qquad \text{et} \qquad b = r\sin\theta$$

ce qui donne, en divisant par $r=|z|\neq 0$ :

$$\cos\theta = \frac{a}{r} \qquad \text{et} \qquad \sin\theta = \frac{b}{r}$$

Ces deux égalités déterminent $\theta$ de façon unique, à $2\pi$ près : le point $(a/r,\, b/r)$ est sur le cercle de rayon $1$ (puisque $(a/r)^2+(b/r)^2 = (a^2+b^2)/r^2 = r^2/r^2 = 1$), et un point du cercle unité correspond à exactement une direction, à un tour complet près.

**Méthode pratique — et le piège à éviter.** Pour lire un argument à partir de la forme algébrique : calcule $r=|z|$, puis $\cos\theta=a/r$ et $\sin\theta=b/r$, et cherche l'angle dont le cosinus **et** le sinus valent exactement ces deux nombres — pas seulement leur valeur absolue. C'est ce double contrôle qui fixe le bon quadrant. Se contenter d'un « angle de référence » sans vérifier les deux signes est l'erreur la plus fréquente : un $a$ négatif, par exemple, place $M$ dans le demi-plan gauche, et l'argument n'est alors ni l'angle de référence lui-même, ni son opposé, mais $\pi$ moins (ou plus) cet angle de référence, selon le signe de $b$.

### La forme trigonométrique

**Définition.** Pour $z\neq 0$, en posant $r=|z|$ et $\theta=\arg(z)\ [2\pi]$, on peut écrire

$$z = r(\cos\theta + i\sin\theta)$$

C'est la **forme trigonométrique** de $z$ : elle affiche directement, séparément, la distance $r$ et la direction $\theta$ — exactement l'information que la forme algébrique cachait.

### Quelques valeurs à avoir sous la main

| $\theta$ | $0$ | $\pi/6$ | $\pi/4$ | $\pi/3$ | $\pi/2$ |
|---|---|---|---|---|---|
| $\cos\theta$ | $1$ | $\dfrac{\sqrt3}{2}$ | $\dfrac{\sqrt2}{2}$ | $\dfrac12$ | $0$ |
| $\sin\theta$ | $0$ | $\dfrac12$ | $\dfrac{\sqrt2}{2}$ | $\dfrac{\sqrt3}{2}$ | $1$ |

Ce sont les valeurs que tu connais déjà depuis le cours de trigonométrie — on les réutilise ici telles quelles, rien de nouveau à mémoriser.

### Exemple travaillé

Écrire $z=1+i$ sous forme trigonométrique.

**Ce qu'on cherche et pourquoi ce geste :** il faut deux nombres, $r$ et $\theta$. On calcule $r=|z|$ d'abord (déjà connu du chapitre précédent), puis on en déduit $\cos\theta$ et $\sin\theta$, et on identifie $\theta$ dans le tableau ci-dessus.

$$r = |z| = \sqrt{1^2+1^2} = \sqrt2$$

$$\cos\theta = \frac{1}{\sqrt2} = \frac{\sqrt2}{2} \qquad \sin\theta = \frac{1}{\sqrt2} = \frac{\sqrt2}{2}$$

Ces deux valeurs correspondent, dans le tableau, à $\theta=\pi/4$. Donc

$$z = \sqrt2\left(\cos\frac{\pi}{4} + i\sin\frac{\pi}{4}\right)$$

### Deux propriétés immédiates, utiles plus loin

- $\arg(\overline{z}) = -\arg(z)\ [2\pi]$. **Pourquoi :** si $z=r(\cos\theta+i\sin\theta)$, alors $\overline z = r\cos\theta - ir\sin\theta = r(\cos(-\theta)+i\sin(-\theta))$, puisque $\cos(-\theta)=\cos\theta$ et $\sin(-\theta)=-\sin\theta$. C'est cohérent avec l'image géométrique du conjugué vue au chapitre 1 : le symétrique par rapport à l'axe réel inverse l'angle.
- $\arg(-z) = \arg(z)+\pi\ [2\pi]$. **Pourquoi :** $-z = r(-\cos\theta) + ir(-\sin\theta) = r(\cos(\theta+\pi)+i\sin(\theta+\pi))$, puisque $\cos(\theta+\pi)=-\cos\theta$ et $\sin(\theta+\pi)=-\sin\theta$. Encore une fois, cohérent avec l'image du symétrique par rapport à $O$ : un demi-tour de plus.

---

## R2 — La forme exponentielle et la règle du produit

### Une notation, choisie pour une bonne raison

On introduit maintenant une écriture plus compacte de $\cos\theta+i\sin\theta$. Ce n'est pas une nouvelle idée mathématique — c'est un **nom** qu'on donne à quelque chose qu'on connaît déjà, choisi parce qu'il va se comporter, dans les calculs, exactement comme une exponentielle réelle.

**Notation.** On pose, par définition,

$$e^{i\theta} = \cos\theta + i\sin\theta$$

Avec cette notation, la forme trigonométrique $z=r(\cos\theta+i\sin\theta)$ s'écrit $z = re^{i\theta}$ : c'est la **forme exponentielle** de $z$.

Une notation n'est justifiée que si elle se comporte bien. Ce qu'on attend d'une "exponentielle", c'est que multiplier deux exponentielles revienne à additionner les exposants : $e^{i\theta} \times e^{i\theta'} \stackrel{?}{=} e^{i(\theta+\theta')}$. Vérifions-le — et le calcul qui suit va, en prime, nous donner la règle du produit pour n'importe quel module.

### Le calcul qui justifie la notation : $|zz'|$ et $\arg(zz')$

Prends $z=r(\cos\theta+i\sin\theta)$ et $z'=r'(\cos\theta'+i\sin\theta')$, deux complexes non nuls. On calcule leur produit en développant, exactement comme on l'a fait au chapitre précédent pour un produit de deux formes algébriques.

$$zz' = rr'(\cos\theta+i\sin\theta)(\cos\theta'+i\sin\theta')$$

On développe le produit des deux facteurs entre parenthèses, comme n'importe quel produit de deux sommes :

$$= rr'\left[(\cos\theta\cos\theta'-\sin\theta\sin\theta') + i(\sin\theta\cos\theta'+\cos\theta\sin\theta')\right]$$

Et là, on reconnaît exactement les deux formules d'addition trigonométrique que tu connais déjà : $\cos(\theta+\theta')=\cos\theta\cos\theta'-\sin\theta\sin\theta'$ et $\sin(\theta+\theta')=\sin\theta\cos\theta'+\cos\theta\sin\theta'$. On substitue :

$$zz' = rr'\left[\cos(\theta+\theta') + i\sin(\theta+\theta')\right]$$

Ce résultat dit exactement deux choses : le module de $zz'$ est $rr'$, et un argument de $zz'$ est $\theta+\theta'$. Autrement dit :

$$|zz'| = |z| \times |z'| \qquad \qquad \arg(zz') = \arg(z)+\arg(z')\ [2\pi]$$

**Et voilà pourquoi la notation $e^{i\theta}$ est bien choisie :** ce résultat se relit $re^{i\theta} \times r'e^{i\theta'} = rr'\,e^{i(\theta+\theta')}$ — les modules se multiplient, les arguments s'additionnent, exactement comme les exposants d'une vraie exponentielle. Ce n'est pas un hasard de notation : c'est le calcul qu'on vient de faire, avec les formules d'addition trigonométrique, qui le garantit.

### Exemple travaillé

Calculer le module et un argument de $zz'$, avec $z=1+i$ et $z'=1+i\sqrt3$.

**Ce qu'on cherche et pourquoi ce geste :** plutôt que de développer directement le produit algébrique et de repartir de zéro pour en lire le module et l'argument, on convertit d'abord chaque facteur en forme trigonométrique — on a déjà la méthode du R1 — puis on applique la règle qu'on vient d'établir : multiplier les modules, additionner les arguments.

$$|z| = \sqrt{1^2+1^2} = \sqrt2, \qquad \cos\theta=\sin\theta=\frac{\sqrt2}{2} \implies \theta=\frac{\pi}{4}$$

$$|z'| = \sqrt{1^2+(\sqrt3)^2} = 2, \qquad \cos\theta'=\frac12,\ \sin\theta'=\frac{\sqrt3}{2} \implies \theta'=\frac{\pi}{3}$$

Par la règle du produit :

$$|zz'| = \sqrt2 \times 2 = 2\sqrt2 \qquad \qquad \arg(zz') = \frac{\pi}{4}+\frac{\pi}{3} = \frac{3\pi}{12}+\frac{4\pi}{12} = \frac{7\pi}{12}$$

**Vérification partielle, par l'algèbre directe :** $zz' = (1+i)(1+i\sqrt3) = 1+i\sqrt3+i+i^2\sqrt3 = (1-\sqrt3) + i(1+\sqrt3)$. On calcule son module directement :

$$|zz'| = \sqrt{(1-\sqrt3)^2+(1+\sqrt3)^2} = \sqrt{(4-2\sqrt3)+(4+2\sqrt3)} = \sqrt8 = 2\sqrt2$$

Le module coïncide bien avec la prédiction de la règle. Pour l'argument, en revanche, il aurait fallu remonter par un arctangente peu commode — c'est précisément le gain qu'apporte la règle du produit : on lit $\arg(zz')$ directement, sans repasser par une factorisation astucieuse.

---

## R3 — Quotient et puissance : la formule de Moivre

### Le quotient, obtenu à partir de l'inverse — un outil déjà connu

Plutôt que de refaire un calcul de développement pour le quotient, on va réutiliser un résultat du chapitre précédent : $z\overline z = |z|^2$. Cherchons d'abord $1/z$ pour $z=re^{i\theta}$ non nul.

$$\frac{1}{z} = \frac{\overline z}{z\overline z} = \frac{\overline z}{r^2}$$

Or $\overline z = r(\cos\theta - i\sin\theta) = r(\cos(-\theta)+i\sin(-\theta)) = re^{-i\theta}$ (même calcul qu'au R1). On substitue :

$$\frac{1}{z} = \frac{re^{-i\theta}}{r^2} = \frac{1}{r}\,e^{-i\theta}$$

Donc $|1/z| = 1/|z|$ et $\arg(1/z) = -\arg(z)\ [2\pi]$ : diviser par $z$ inverse son module et change le signe de son argument. C'est exactement l'outil du conjugué du chapitre 1, réutilisé sous une forme nouvelle.

À partir de là, pour $z'\neq 0$ :

$$\frac{z}{z'} = z \times \frac{1}{z'} = re^{i\theta} \times \frac{1}{r'}e^{-i\theta'} = \frac{r}{r'}\,e^{i(\theta-\theta')}$$

D'où la règle du quotient :

$$\left|\frac{z}{z'}\right| = \frac{|z|}{|z'|} \qquad \qquad \arg\!\left(\frac{z}{z'}\right) = \arg(z)-\arg(z')\ [2\pi]$$

**Exemple travaillé.** Calculer le module de $\dfrac{1+i\sqrt3}{1+i}$.

**Ce qu'on cherche et pourquoi ce geste :** on a déjà, du R2, $|1+i\sqrt3|=2$ et $|1+i|=\sqrt2$. La règle du quotient donne directement le module cherché sans repasser par la division algébrique.

$$\left|\frac{1+i\sqrt3}{1+i}\right| = \frac{2}{\sqrt2} = \sqrt2$$

**Vérification par la méthode du conjugué (chapitre 1) :** on multiplie haut et bas par $\overline{1+i}=1-i$ :

$$\frac{1+i\sqrt3}{1+i} = \frac{(1+i\sqrt3)(1-i)}{(1+i)(1-i)} = \frac{(1+\sqrt3)+i(\sqrt3-1)}{2}$$

Le module du numérateur, divisé par $2$ :

$$\left|\frac{(1+\sqrt3)+i(\sqrt3-1)}{2}\right| = \frac{\sqrt{(1+\sqrt3)^2+(\sqrt3-1)^2}}{2} = \frac{\sqrt{8}}{2} = \frac{2\sqrt2}{2} = \sqrt2$$

Les deux méthodes donnent bien $\sqrt2$.

### La puissance : que se passe-t-il si on multiplie $z$ par lui-même ?

La règle du produit, appliquée à $z\times z$, donne $|z^2| = |z|\times|z| = |z|^2$ et $\arg(z^2) = \arg(z)+\arg(z) = 2\arg(z)\ [2\pi]$. En répétant l'opération — $z^3 = z^2 \times z$, puis $z^4=z^3\times z$, et ainsi de suite — chaque multiplication supplémentaire par $z$ ajoute encore un facteur $|z|$ au module et encore un $\arg(z)$ à l'argument. Pour un entier naturel $n$, on obtient donc :

$$z^n = r^n\left(\cos(n\theta)+i\sin(n\theta)\right), \qquad \text{soit} \qquad \left(e^{i\theta}\right)^n = e^{in\theta}$$

C'est la **formule de Moivre**. Elle dit que pour élever $z=re^{i\theta}$ à la puissance $n$, on élève le module à la puissance $n$ (une opération ordinaire sur un réel positif) et on **multiplie** l'argument par $n$ (on ne l'élève pas à la puissance $n$ — l'argument est un angle, pas un module, et il se comporte comme l'exposant d'une vraie exponentielle : $(e^{i\theta})^n=e^{in\theta}$, exactement comme $(e^x)^n=e^{nx}$).

**Exemple travaillé.** Calculer $z^4$ pour $z=1+i$, par la formule de Moivre, puis vérifier par calcul direct.

**Ce qu'on cherche et pourquoi ce geste :** on a déjà $z=\sqrt2\, e^{i\pi/4}$ (R1). La formule de Moivre donne le module et l'argument de $z^4$ en une ligne ; on vérifie ensuite par élévations au carré successives, une méthode purement algébrique, pour confirmer que les deux chemins mènent au même résultat.

$$|z^4| = (\sqrt2)^4 = 4 \qquad \qquad \arg(z^4) = 4\times\frac{\pi}{4} = \pi$$

$$z^4 = 4(\cos\pi + i\sin\pi) = 4(-1+0i) = -4$$

**Vérification directe :** $z^2 = (1+i)^2 = 1+2i+i^2 = 2i$. Puis $z^4=(z^2)^2=(2i)^2=4i^2=-4$. Les deux méthodes donnent exactement $-4$.

---

## R4 — Racines n-ièmes : de l'unité, puis d'un complexe quelconque

### Résoudre $z^n=1$ : les racines n-ièmes de l'unité

On cherche tous les complexes $z$ tels que $z^n=1$, pour un entier naturel $n\geq 1$ fixé. Le réflexe : écrire $z$ sous forme exponentielle, $z=\rho e^{i\alpha}$ (avec $\rho\geq 0$), et utiliser la formule de Moivre pour transformer l'équation en deux conditions séparées — une sur le module, une sur l'argument.

$$z^n = \rho^n e^{in\alpha} \qquad \text{et} \qquad 1 = 1 \times e^{i0}$$

L'égalité $z^n=1$ équivaut donc à $\rho^n=1$ **et** $n\alpha \equiv 0\ [2\pi]$ (deux nombres complexes égaux ont même module et même argument, à $2\pi$ près). Comme $\rho\geq 0$ est réel, $\rho^n=1$ impose $\rho=1$ (c'est l'unique réel positif ou nul dont la puissance $n$-ième vaut $1$). Et $n\alpha\equiv 0\ [2\pi]$ signifie que $\alpha$ est un multiple de $\dfrac{2\pi}{n}$ :

$$\alpha = \frac{2k\pi}{n}, \qquad k \in \mathbb{Z}$$

En faisant varier $k$, on obtient le même point dès que $k$ change d'un multiple de $n$ (car alors $\alpha$ change d'un multiple de $2\pi$) : il y a donc exactement $n$ solutions distinctes, obtenues pour $k=0,1,\ldots,n-1$.

$$\boxed{z_k = e^{i\frac{2k\pi}{n}}, \qquad k=0,1,\ldots,n-1}$$

**Exemple travaillé — les racines cubiques de l'unité ($n=3$).** On applique directement la formule avec $n=3$, $k=0,1,2$ :

$$z_0 = e^{i0} = 1 \qquad z_1 = e^{i2\pi/3} \qquad z_2 = e^{i4\pi/3}$$

Les trois solutions de $z^3=1$ sont donc $1$, $e^{i2\pi/3}$ et $e^{i4\pi/3}$ — trois points sur le cercle de rayon $1$, régulièrement espacés d'un tiers de tour.

### Résoudre $z^n=Z$ pour un complexe quelconque $Z\neq 0$

Même mécanisme, avec un second membre général. Écris $Z$ sous forme exponentielle, $Z=Re^{i\Phi}$ (avec $R=|Z|>0$), et cherche $z=\rho e^{i\alpha}$ tel que $z^n=Z$ :

$$\rho^n e^{in\alpha} = Re^{i\Phi}$$

Même raisonnement qu'à l'instant : $\rho^n=R$ impose $\rho = R^{1/n}$ (la racine $n$-ième réelle positive de $R$, qui existe et est unique puisque $R>0$), et $n\alpha \equiv \Phi\ [2\pi]$ donne $\alpha = \dfrac{\Phi+2k\pi}{n}$. D'où les $n$ solutions :

$$z_k = R^{1/n}\, e^{i\frac{\Phi+2k\pi}{n}}, \qquad k=0,1,\ldots,n-1$$

**Exemple travaillé.** Trouver les racines cubiques de $Z=8i$.

**Ce qu'on cherche et pourquoi ce geste :** avant d'appliquer la formule, il faut d'abord écrire $Z$ sous forme exponentielle — exactement la méthode du R1, appliquée à $Z=8i$ (partie réelle $0$, partie imaginaire $8$).

$$R = |8i| = 8, \qquad \Phi = \arg(8i) = \frac{\pi}{2}$$

$$\rho = R^{1/3} = 8^{1/3} = 2$$

On calcule les trois arguments, pour $k=0,1,2$ :

$$k=0:\ \alpha_0 = \frac{\pi/2}{3} = \frac{\pi}{6} \qquad k=1:\ \alpha_1 = \frac{\pi/2+2\pi}{3} = \frac{5\pi}{6} \qquad k=2:\ \alpha_2 = \frac{\pi/2+4\pi}{3} = \frac{3\pi}{2}$$

Les trois racines cubiques de $8i$ sont donc $2e^{i\pi/6}$, $2e^{i5\pi/6}$ et $2e^{i3\pi/2}$.

**Vérification sur la dernière racine :** $2e^{i3\pi/2} = 2(\cos\frac{3\pi}{2}+i\sin\frac{3\pi}{2}) = 2(0-i) = -2i$. On calcule $(-2i)^3 = -8i^3 = -8\times(-i) = 8i$, qui est bien $Z$. La racine vérifie l'équation.

---

## R5 — Interprétation géométrique : rotation et homothétie

### Ce que fait, en général, la multiplication par un complexe fixe

Reviens à la question du R0. Fixe un complexe non nul $c=re^{i\theta}$, et regarde ce qui se passe quand on associe, à un point $M$ d'affixe $z$, le point $M'$ d'affixe $z' = c\,z$.

Par la règle du produit du R2, appliquée à $c$ et $z$ :

$$|z'| = |c|\,|z| = r\,|z| \qquad \qquad \arg(z') = \arg(c)+\arg(z) = \theta+\arg(z)\ [2\pi]$$

**Ce que ça veut dire géométriquement :** la distance de $M'$ à $O$ est celle de $M$ à $O$, multipliée par $r$ — c'est une **homothétie de centre $O$ et de rapport $r$**. Et la direction de $M'$ vu de $O$ est celle de $M$, tournée d'un angle $\theta$ — c'est une **rotation de centre $O$ et d'angle $\theta$**. La transformation $z\mapsto cz$ est donc la composée de ces deux-là, toutes deux centrées en $O$.

C'est exactement la réponse à la question du R0 : $i=e^{i\pi/2}$ a pour module $r=1$ (pas d'agrandissement) et pour argument $\theta=\pi/2$ (un quart de tour) — c'est pour ça, précisément, que multiplier par $i$ fait tourner le plan d'un quart de tour sans rien agrandir. Ce n'était pas une coïncidence propre à $i$ : c'est le comportement général de toute multiplication.

### Centrer la transformation ailleurs qu'en $O$

La même idée s'étend à une transformation centrée en un point $A$ quelconque, d'affixe $z_A$ : celle qui associe, à $M$ d'affixe $z$, le point $M'$ d'affixe $z'$ tel que

$$z' - z_A = c\,(z-z_A)$$

**Pourquoi c'est la bonne écriture :** le point $A$ est fixe par cette transformation (si $z=z_A$, alors $z'-z_A=0$, donc $z'=z_A$) — exactement ce qu'on attend d'un centre de rotation ou d'homothétie. Et le vecteur $\vec{AM'}$, d'affixe $z'-z_A$, se déduit du vecteur $\vec{AM}$, d'affixe $z-z_A$, par la même règle que ci-dessus (produit par $c=re^{i\theta}$) :

$$|z'-z_A| = r\,|z-z_A| \qquad \qquad \arg(z'-z_A) = \theta + \arg(z-z_A)\ [2\pi]$$

Donc cette transformation est la composée d'une rotation de centre $A$ et d'angle $\theta=\arg(c)$, et d'une homothétie de centre $A$ et de rapport $r=|c|$.

Deux cas particuliers valent d'être repérés : si $c$ est un réel strictement positif ($\theta=0$), il n'y a aucune rotation — seulement une homothétie. Si $|c|=1$, il n'y a aucun changement de taille — seulement une rotation.

### Exemple travaillé

Soit $c=1+i$. Déterminer l'image du point $M$ d'affixe $z=3$ par la transformation $z'=cz$ (centrée en $O$), et décrire cette transformation.

**Ce qu'on cherche et pourquoi ce geste :** on a besoin du module et de l'argument de $c$ pour décrire la transformation ; on calcule ensuite $z'$ des deux façons (directement par le produit algébrique, et via $|z'|,\arg(z')$) pour vérifier la cohérence.

$$|c| = \sqrt{1^2+1^2} = \sqrt2 \qquad \qquad \arg(c) = \frac{\pi}{4}$$

La transformation est donc la composée d'une rotation de centre $O$ et d'angle $\pi/4$, et d'une homothétie de centre $O$ et de rapport $\sqrt2$.

**Calcul direct :** $z' = (1+i)\times 3 = 3+3i$.

**Vérification géométrique :** $z=3$ a pour module $3$ et pour argument $0$. D'après la règle, $z'$ doit avoir pour module $3\sqrt2$ et pour argument $0+\pi/4=\pi/4$. Or $|3+3i| = \sqrt{9+9}=\sqrt{18}=3\sqrt2$, et $3+3i$ a bien pour argument $\pi/4$ (car $\cos = \sin = \frac{3}{3\sqrt2}=\frac{\sqrt2}{2}$). Les deux méthodes coïncident.

---

## R6 — Configurations : la nature d'un triangle, l'alignement

### Le rapport qui encode toute la forme d'un triangle

Soient $A$, $B$, $C$ trois points d'affixes $z_A$, $z_B$, $z_C$, avec $B\neq A$. On s'intéresse au nombre complexe

$$w = \frac{z_C - z_A}{z_B - z_A}$$

**Pourquoi ce rapport porte exactement l'information qu'on veut.** Le numérateur $z_C-z_A$ est l'affixe du vecteur $\vec{AC}$, le dénominateur $z_B-z_A$ est l'affixe de $\vec{AB}$. Par les règles du quotient (R3) :

$$|w| = \frac{|z_C-z_A|}{|z_B-z_A|} = \frac{AC}{AB} \qquad \qquad \arg(w) = \arg(z_C-z_A) - \arg(z_B-z_A)\ [2\pi]$$

Cette différence d'arguments est précisément l'angle qu'il faut pour amener la direction de $\vec{AB}$ sur celle de $\vec{AC}$ — c'est-à-dire l'angle géométrique $(\vec{AB}, \vec{AC})$, l'angle du triangle **au sommet $A$**. Un seul nombre complexe, $w$, porte donc à la fois le rapport des longueurs $AC/AB$ et l'angle en $A$.

Ce qui donne la table de lecture suivante :

| Condition sur $w=\dfrac{z_C-z_A}{z_B-z_A}$ | Conséquence sur le triangle $ABC$ |
|---|---|
| $w \in \mathbb{R}^*$ (réel non nul) | $A,B,C$ alignés (angle en $A$ égal à $0$ ou $\pi$) |
| $w$ imaginaire pur non nul | triangle rectangle en $A$ (angle en $A$ égal à $\pm\pi/2$) |
| $|w|=1$ | triangle isocèle en $A$ ($AB=AC$) |
| $|w|=1$ et $\arg(w)=\pm\pi/3\ [2\pi]$ | triangle équilatéral |

**Un repère minimal pour la première ligne.** Avec $z_A=0$, $z_B=1+i$, $z_C=2+2i=2(1+i)$ : $w = \dfrac{2(1+i)}{1+i} = 2$, un réel strictement positif. En effet, $C$ est bien sur la droite $(AB)$ — c'est le point qui double le vecteur $\vec{AB}$.

### Exemple travaillé

Soient $A$, $B$, $C$ d'affixes respectives $z_A=1$, $z_B=1+i$, $z_C=2$. Déterminer la nature du triangle $ABC$.

**Ce qu'on cherche et pourquoi ce geste :** on calcule $w=\dfrac{z_C-z_A}{z_B-z_A}$, puis on lit son module et son argument pour appliquer la table ci-dessus.

$$z_B - z_A = (1+i)-1 = i \qquad \qquad z_C - z_A = 2-1 = 1$$

$$w = \frac{1}{i}$$

**Pour calculer $\dfrac1i$, on utilise l'outil du R3 :** $\dfrac1i = \dfrac{\overline i}{i\overline i} = \dfrac{-i}{1} = -i$ (puisque $i\overline i = |i|^2=1$).

$$w = -i$$

$w$ est imaginaire pur non nul, donc le triangle est **rectangle en $A$**. Et $|w|=|-i|=1$, donc **isocèle en $A$** aussi : $AB=AC$. Le triangle $ABC$ est donc **rectangle et isocèle en $A$**.

**Vérification directe sur les coordonnées :** $A(1,0)$, $B(1,1)$, $C(2,0)$. Le vecteur $\vec{AB}=(0,1)$ et $\vec{AC}=(1,0)$ sont bien orthogonaux (produit scalaire nul), et de même norme ($1$ chacun). La conclusion tirée du calcul complexe est directement confirmée par la géométrie élémentaire.

---

## R7 — Pour t'entraîner

Voici un exercice de type bac, **original** — ce n'est pas un sujet officiel, c'est un exercice d'entraînement construit pour cette leçon, qui rassemble plusieurs des outils vus dans ce chapitre.

### Exercice travaillé

On considère les points $A$, $B$, $C$ d'affixes respectives $z_A=2i$, $z_B=3+2i$, $z_C=5i$.

1. Calculer $z_B-z_A$ et $z_C-z_A$ sous forme algébrique, puis donner leur module et un argument.
2. Calculer $w = \dfrac{z_C-z_A}{z_B-z_A}$, par deux méthodes : directement sous forme algébrique, puis en utilisant les modules et arguments trouvés en 1.
3. En déduire la nature du triangle $ABC$.
4. Donner l'écriture complexe de la rotation $r$ de centre $A$ et d'angle $\pi/2$, et vérifier que $r$ transforme $B$ en $C$.

**Raisonnement à voix haute.**

**Question 1.** On soustrait les affixes, comme au chapitre 1 :

$$z_B - z_A = (3+2i)-2i = 3 \qquad \qquad z_C - z_A = 5i - 2i = 3i$$

$z_B-z_A=3$ est un réel positif : module $3$, argument $0$. $z_C-z_A=3i$ est un imaginaire pur positif : module $3$, argument $\pi/2$.

**Question 2.** Directement, sous forme algébrique :

$$w = \frac{3i}{3} = i$$

Par les modules et arguments (règle du quotient, R3) : module $\dfrac{3}{3}=1$, argument $\dfrac{\pi}{2}-0=\dfrac{\pi}{2}$. Donc $w = 1\times e^{i\pi/2} = \cos\dfrac{\pi}{2}+i\sin\dfrac{\pi}{2} = i$. Les deux méthodes donnent bien $w=i$.

**Question 3.** $w=i$ est imaginaire pur non nul $\implies$ triangle **rectangle en $A$**. Et $|w|=1 \implies$ **isocèle en $A$** ($AB=AC$). Le triangle $ABC$ est **rectangle et isocèle en $A$**.

**Question 4.** La rotation de centre $A$ et d'angle $\pi/2$ a pour écriture complexe (R5, avec $c=e^{i\pi/2}=i$) :

$$z' - z_A = i\,(z - z_A)$$

On isole $z'$ :

$$z' = i\,z - i\,z_A + z_A$$

Avec $z_A=2i$ : $-i\,z_A = -i\times 2i = -2i^2 = 2$. Donc

$$z' = iz + 2 + 2i$$

**Vérification que $r$ transforme $B$ en $C$ :** on remplace $z$ par $z_B=3+2i$.

$$z' = i(3+2i) + 2+2i = 3i + 2i^2 + 2 + 2i = 3i - 2 + 2 + 2i = 5i$$

On retrouve exactement $z_C=5i$. La rotation transforme bien $B$ en $C$ — cohérent avec la question 3 : $A$ étant équidistant de $B$ et de $C$ avec un angle droit entre les deux, une rotation de $\pi/2$ centrée en $A$ devait envoyer l'un sur l'autre.

### À toi de jouer

**(a)** Soient $A$, $B$, $C$ d'affixes respectives $z_A=-1$, $z_B=1$, $z_C=i\sqrt3$. Calculer $w=\dfrac{z_C-z_A}{z_B-z_A}$ sous forme exponentielle, puis en déduire la nature du triangle $ABC$.

**(b)** Déterminer, sous forme exponentielle, les solutions dans $\mathbb{C}$ de l'équation $z^4=-16$.

<!-- NOTE DE VALIDATION (relecture humaine) — points ouverts, non résolus par cet
     auteur :
     (1) skill_code proposé ici : `maths_complexes_trigo` (convention
     "<subject>_<short>" du brief, choisi pour se distinguer du skill_code du
     chapitre 1, `maths_complexes_algebrique`). À confirmer contre la
     convention réelle utilisée en base avant intégration.
     (2) Périmètre : cette leçon suppose acquis tout le chapitre 1
     (nombres-complexes-1 : forme algébrique, opérations, conjugué, module,
     affixe/image, distance) et couvre PARTIE 2 du programme SM : argument,
     formes trigonométrique/exponentielle, produit/quotient/puissance
     (Moivre), racines n-ièmes (unité + complexe quelconque), interprétation
     géométrique (rotation/homothétie), applications aux configurations
     (nature de triangle, alignement via le rapport (z_C-z_A)/(z_B-z_A)).
     Les équations du second degré à coefficients complexes (discriminant
     négatif, etc.) ne sont volontairement PAS traitées ici — à confirmer si
     elles appartiennent à ce chapitre ou à un chapitre séparé dans la
     progression réelle du manuel/cadre SM.
     (3) La table de lecture du R6 ne couvre que l'angle en A et le rapport
     AC/AB via w ; le cas "ensemble de points" (lieu géométrique défini par
     une condition sur un rapport de complexes, du type "l'ensemble des M tels
     que (z_M-z_A)/(z_M-z_B) est réel ou imaginaire pur") n'est qu'esquissé en
     filigrane (via la table) et pas traité en exercice dédié — à évaluer si
     ça mérite un ajout avant la relecture pédagogique finale.
     (4) L'accroche du R0 (multiplication par i vue comme rotation) est un
     choix pédagogique de cet auteur, pas une citation du cadre officiel — à
     valider comme dispositif d'accroche.
-->
