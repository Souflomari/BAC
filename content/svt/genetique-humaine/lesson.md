# La génétique humaine

---

## R0 — Accroche : pourquoi le daltonisme touche-t-il tellement plus les hommes ?

Voici un fait que tu as peut-être déjà remarqué sans jamais te demander pourquoi. Le daltonisme (la difficulté à distinguer le rouge et le vert) touche de l'ordre d'un homme sur douze, mais seulement environ une femme sur deux cents. L'écart n'est pas léger : il est massif, et il est constant, dans toutes les populations humaines étudiées.

**Avant de lire la suite, prends position.** Ce grand déséquilibre entre les sexes te semble-t-il un simple hasard statistique (les hommes seraient, par exemple, plus exposés à un facteur environnemental) — ou soupçonnes-tu qu'il existe une raison structurelle, ancrée dans la façon même dont un homme et une femme héritent différemment de leurs chromosomes ? Choisis une position avant de continuer.

[[checkpoint:cp-r0-predict]]

---

Ce n'est pas un hasard. Le daltonisme est dû à un gène porté par le chromosome X — et un homme et une femme n'ont pas le même nombre de chromosomes X. C'est cette asymétrie, et rien d'autre, qui explique l'écart. Mais pour comprendre précisément pourquoi, et pour être capable de reconnaître ce type de transmission dans n'importe quelle famille, il faut d'abord se donner un outil que la leçon précédente ne fournissait pas.

Dans la leçon sur les lois de Mendel, tu croisais des souris ou des pois à volonté : générations P, F1, F2, autant de croisements contrôlés que nécessaire. Chez l'Homme, c'est impossible — on ne provoque pas des naissances pour étudier un caractère. Le seul matériau dont dispose un généticien humain, ce sont les familles réelles, telles qu'elles se sont reproduites naturellement, reconstituées sous forme d'**arbres généalogiques**. Toute la démarche de cette leçon consiste à apprendre à lire ces arbres comme un détective lit des indices : en déduire le mode de transmission d'une maladie (récessif ou dominant, porté par un autosome ou par le chromosome X), puis calculer la probabilité qu'un enfant à venir soit atteint.

À la fin de cette leçon, tu sauras exactement pourquoi le daltonisme — et l'hémophilie, qui suit la même logique — frappe tellement plus les hommes. Ce ne sera plus une curiosité statistique : ce sera la conséquence directe et prévisible d'un mécanisme que tu pourras énoncer toi-même.

---

## R1 — Lire un arbre généalogique : vocabulaire et chromosomes humains

### Pourquoi l'arbre généalogique remplace l'échiquier de croisement

Un arbre généalogique (on dit aussi **pedigree**) représente les liens de parenté et les phénotypes observés dans une famille réelle, génération après génération. Contrairement aux croisements P, F1, F2 de la leçon précédente, on ne choisit pas les unions : on part de ce qui existe déjà, et on remonte l'enquête à l'envers — des phénotypes observés vers les génotypes qu'ils impliquent.

### Les conventions de lecture

Un arbre généalogique suit des règles fixes, qu'on va utiliser sous forme de tableau plutôt que de schéma dans cette leçon :

- un **carré** représente un homme, un **cercle** représente une femme ;
- une case **pleine** (noircie) signifie que l'individu est **atteint** par la maladie étudiée ; une case **vide** signifie qu'il est **sain** (phénotype normal) ;
- un trait horizontal entre un homme et une femme représente une **union** (un couple) ;
- les enfants d'une union sont reliés à leurs parents et forment une **fratrie** ;
- les générations sont numérotées en chiffres romains (I, II, III...) de la plus ancienne à la plus récente, et chaque individu d'une génération reçoit un numéro (I-1, I-2, II-1, II-2...).

Voici la famille qu'on va suivre tout au long des chapitres 2 à 6 :

| Génération | Individu | Sexe | Phénotype |
|---|---|---|---|
| I | I-1 | Homme | Sain |
| I | I-2 | Femme | Saine |
| II | II-1 (enfant de I-1 × I-2) | Femme | Atteinte |
| II | II-2 (enfant de I-1 × I-2) | Homme | Sain |

Cette famille illustre une maladie génétique rare et bien documentée : la **drépanocytose** (les globules rouges prennent une forme de faucille, ce qui perturbe la circulation sanguine). Elle nous servira de fil conducteur.

### Autosome et gonosome : deux catégories de chromosomes, pas une seule

Une cellule humaine porte 46 chromosomes, organisés en 23 paires. Parmi elles, **22 paires sont des autosomes** : elles sont rigoureusement identiques, en nombre et en nature, chez l'homme et chez la femme. La **23ᵉ paire** est différente : ce sont les **gonosomes** (ou chromosomes sexuels) — une femme porte deux chromosomes X ($X X$), un homme porte un chromosome X et un chromosome Y ($X Y$).

**Pourquoi cette distinction va compter tout au long de la leçon :** un gène porté par un autosome se transmet de la même façon, quel que soit le sexe de l'enfant qui hérite — c'est le cas qu'on a étudié toute la leçon précédente. Un gène porté par un gonosome (en pratique, presque toujours le chromosome X, le chromosome Y étant beaucoup plus petit et portant très peu de gènes) se transmet, lui, de façon **différente selon le sexe de l'enfant** — parce qu'un fils et une fille n'héritent pas des mêmes chromosomes sexuels de leurs deux parents. On appelle une maladie due à un gène porté par un gonosome une maladie **liée au sexe** (ou **gonosomale**), par opposition à une maladie **autosomale**.

### Vérification rapide

Avant de continuer : peux-tu dire, sans relire, combien de paires de chromosomes sont des autosomes, et combien sont des gonosomes ? (Réponse : 22 et 1 — ce sont ces deux nombres qui structurent toute la suite du raisonnement.)

[[checkpoint:cp-r1-caryotype]]

---

## R2 — Récessif ou dominant ? Le test décisif

### Le mécanisme qui rend ce test possible

Reprends la définition de la leçon précédente : un allèle **dominant** s'exprime dans le phénotype dès qu'il est présent en un seul exemplaire ; un allèle **récessif** ne s'exprime que lorsqu'il est présent en double exemplaire (génotype homozygote). Cette seule différence a une conséquence directe et testable sur un arbre généalogique.

**Si l'allèle responsable d'une maladie est dominant**, alors tout individu qui le porte — même un seul exemplaire — est atteint. Autrement dit, un enfant atteint doit nécessairement avoir reçu cet allèle d'un de ses deux parents, et ce parent, portant lui aussi l'allèle dominant, doit lui-même être atteint. (On admet ici, comme le fait le programme, l'hypothèse simplificatrice d'une pénétrance complète et l'absence de mutation nouvelle dans la famille : chaque allèle vient d'un parent qui le porte.) **Une maladie dominante ne saute donc jamais de génération.**

**Si l'allèle est récessif**, un individu hétérozygote (porteur d'un seul exemplaire) reste phénotypiquement sain — l'allèle dominant masque le récessif, exactement comme dans la leçon précédente. Deux parents peuvent donc être tous les deux hétérozygotes, tous les deux phénotypiquement sains, et transmettre chacun leur exemplaire récessif au même enfant, qui devient alors homozygote et atteint. **Une maladie récessive peut sauter une génération.**

### Le test

**Enfant atteint, deux parents phénotypiquement sains** ⟹ l’allèle ne peut pas être dominant ⟹ **l’allèle est récessif**, et les deux parents sont hétérozygotes (porteurs sains).

C'est un raisonnement par élimination, pas une supposition : si l'allèle était dominant, l'un des deux parents devrait être atteint, puisqu'il porterait forcément cet allèle pour le transmettre. Comme aucun des deux ne l'est, l'hypothèse dominante est directement contredite par l'observation — il ne reste que l'hypothèse récessive.

### Application à la famille du chapitre 2

Reprends le tableau : I-1 et I-2 sont tous les deux sains, et pourtant leur fille II-1 est atteinte de drépanocytose. D'après le test ci-dessus, l'allèle est **récessif**. Notons-le, comme dans le chapitre précédent, avec la lettre $A$ pour l'allèle sain (dominant) et $a$ pour l'allèle drépanocytaire (récessif). On peut alors affirmer, avec certitude :

- I-1 est hétérozygote : $A//a$ (sain, mais porteur — sinon il ne pourrait pas transmettre $a$) ;
- I-2 est hétérozygote : $A//a$, pour la même raison ;
- II-1 est homozygote récessive : $a//a$ (c'est la seule façon d'être atteinte).

Et II-2 (sain) ? Son génotype n'est pas encore déterminé avec certitude à ce stade — il peut être $A//A$ ou $A//a$, puisque les deux génotypes donnent un phénotype sain. On garde cette question ouverte : le chapitre 6 te donnera l'outil pour y répondre précisément, avec un chiffre.

[[figure:pedigree-drepanocytose]]

### L'erreur classique à éviter ici

Une erreur fréquente : penser qu'une maladie rare est forcément récessive, ou qu'une maladie fréquente est forcément dominante. La fréquence dans la population n'a rien à voir avec la dominance — ce sont deux informations indépendantes. Le seul test valable est celui du dessus : regarder si un enfant atteint peut avoir deux parents phénotypiquement sains.

Une deuxième erreur, plus subtile : conclure quoi que ce soit sur l'autosome ou le gonosome à partir de ce seul test. Le test de ce chapitre répond à UNE question (récessif ou dominant), pas à l'autre (autosomal ou lié au sexe) — ce sont deux axes de décision séparés, et il en faut un deuxième, complètement différent, pour trancher le second axe. C'est l'objet du chapitre 4.

[[checkpoint:cp-r2-recessif]]

---

## R3 — Autosomal ou lié au sexe ? Les tests décisifs

### La règle d'origine : ce qu'un fils et une fille reçoivent vraiment

Tout repose sur un seul fait, qu'il faut avoir parfaitement en tête : **un fils reçoit son unique chromosome X de sa mère, et son chromosome Y de son père. Une fille reçoit un chromosome X de son père ET un chromosome X de sa mère.** Rien de plus, rien de moins. C'est cette asymétrie — pas la dominance, pas la fréquence — qui va nous permettre de trancher entre autosomal et lié à l'X.

### Test A : une fille atteinte d'une maladie récessive liée à l'X impose un père atteint

Si une maladie récessive est liée à l'X, une fille atteinte doit être homozygote : $X^{a}X^{a}$. Elle a donc reçu un $X^{a}$ de sa mère, ET un $X^{a}$ de son père. Mais son père n'a qu'un seul chromosome X à transmettre — s'il transmet $X^{a}$, c'est que son propre génotype est $X^{a}Y$, c'est-à-dire qu'il est **lui-même atteint** (il n'a pas de second X pour masquer l'allèle, on y revient au chapitre 5).

**Conséquence directe, à retenir comme un réflexe de lecture d'arbre :** si tu observes une fille atteinte d'une maladie récessive dont le père est phénotypiquement sain, la transmission liée à l'X récessive est **impossible** pour ce caractère — il te reste l'hypothèse autosomale récessive.

### Test B : un père atteint (lié à l'X) ne transmet jamais son caractère à ses fils

Toujours à partir de la même règle d'origine : un père atteint transmet forcément son unique X (et donc l'allèle, quel qu'il soit) à **toutes** ses filles, qui deviennent au moins porteuses. Mais il transmet son chromosome Y — jamais son X — à **chacun** de ses fils. Un fils ne peut donc jamais recevoir, par cette voie, l'allèle porté par l'X de son père.

**Conséquence :** si un caractère porté par un père atteint réapparaît chez l'un de ses fils, ce caractère ne peut pas être porté par le chromosome X — quel que soit par ailleurs le phénotype de la mère. Il reste alors deux possibilités à départager : autosomal, ou porté par le chromosome Y (voir plus bas).

### Une famille de contraste : le daltonisme

Prends une famille différente de celle du chapitre 2, pour bien voir la signature propre au chromosome X. Génération I : I-1, un homme daltonien (atteint), marié à I-2, une femme à la vision normale, non apparentée à la famille de I-1 (on suppose donc, en l'absence d'indication contraire, qu'elle n'est pas porteuse). Génération II : leurs deux enfants, II-1 (fille) et II-2 (fils), tous deux à la vision normale.

I-1, atteint, est hémizygote $X^{d}Y$ (on détaille ce terme au chapitre 5). Il ne peut transmettre que $X^{d}$ à ses filles — c'est son seul X. II-1 reçoit donc, avec certitude, un $X^{d}$ de son père ; comme sa mère I-2 n'est pas porteuse ($X^{D}X^{D}$), elle reçoit un $X^{D}$ d'elle. II-1 est donc $X^{D}X^{d}$ : phénotypiquement saine, mais **certainement porteuse** — pas « probablement », vraiment certainement, puisque son père hémizygote n'avait qu'un seul type de gamète possible pour ce gène.

II-2, le fils, reçoit le chromosome Y de son père (donc rien de la maladie par cette voie) et un X de sa mère — forcément $X^{D}$, puisque sa mère n'en a pas d'autre à donner. II-2 est $X^{D}Y$, sain, et n'a strictement aucune chance d'avoir hérité de l'allèle daltonien de son père : c'est le Test B en action, avec des chiffres.

**Et si on inversait l'observation ?** Imagine à présent que ce soit II-1 (la fille) qui soit atteinte, avec un père I-1 phénotypiquement sain. D'après le Test A, cette situation est **impossible** pour une transmission récessive liée à l'X — il faudrait alors chercher du côté d'une maladie autosomale récessive (les deux parents seraient hétérozygotes, exactement comme au chapitre 3).

### Et le chromosome Y ?

Le programme mentionne aussi des gènes portés par le chromosome Y — c'est le cas, par exemple, de certains gènes liés à la fertilité masculine (des régions comme AZF, réellement étudiées en génétique humaine). Le chromosome Y ne se transmettant que du père vers ses fils (une fille n'en reçoit jamais), la signature d'une transmission liée à l'Y est la plus simple des trois : **tous les fils d'un père atteint sont atteints, et aucune fille ne l'est jamais.** Pas de génération sautée, pas de proportion à calculer — chaque fils reçoit intégralement le Y de son père.

### L'erreur classique à éviter ici

L'erreur la plus fréquente à ce stade : chercher à trancher autosomal / lié à l'X en ne regardant que le nombre d'individus atteints, ou en supposant qu'« une maladie qui touche plus les hommes est forcément liée à l'X ». Ce n'est pas un indice suffisant à lui seul dans un arbre précis : les deux tests A et B, eux, sont des déductions logiques certaines, construites directement sur la règle d'origine (qui reçoit quel chromosome), pas des tendances statistiques. Toujours revenir à la règle d'origine plutôt qu'à une impression générale.

[[checkpoint:cp-r3-lie-a-l-x]]

---

## R4 — Notation liée à l'X, hémizygotie : pourquoi les hommes sont plus touchés

### Une notation qui change de forme, et pourquoi

Pour un gène autosomal, on note le génotype avec le double trait `//` de la leçon précédente (par exemple $A//a$), parce que les deux allèles occupent deux chromosomes homologues strictement équivalents. Pour un gène porté par l'X, ce n'est plus le cas : le chromosome Y n'a pas d'équivalent pour la quasi-totalité des gènes de l'X. On adapte donc la notation : on écrit l'allèle porté directement en exposant du chromosome qui le porte.

- **Chez la femme** (deux chromosomes X, donc deux allèles réels pour ce gène) : $X^{A}X^{A}$ (saine, homozygote), $X^{A}X^{a}$ (saine, porteuse — hétérozygote), $X^{a}X^{a}$ (atteinte, homozygote).
- **Chez l'homme** (un seul chromosome X, accompagné d'un Y qui ne porte pas ce gène) : $X^{A}Y$ (sain) ou $X^{a}Y$ (atteint). Deux génotypes possibles seulement, jamais trois.

### Hémizygotie : la notion qui explique tout

Un homme ne porte qu'**un seul exemplaire** des gènes situés sur l'X — on dit qu'il est **hémizygote** pour ces gènes (du grec *hémi-*, « à moitié » : un seul exemplaire du gène, là où les chromosomes homologues en portent normalement une paire). Ce n'est pas une exception bizarre : c'est la conséquence directe du fait qu'il n'a qu'un seul chromosome X, sans second exemplaire homologue pour ce gène (le Y, beaucoup plus petit, ne porte pas de version de ce gène).

**Conséquence mécanique, et c'est la clé de toute la leçon :** un homme ne peut jamais être « porteur sain » d'une maladie récessive liée à l'X. Chez une femme hétérozygote, l'allèle dominant sur le second X masque le récessif — elle est saine tout en portant l'allèle. Chez l'homme, il n'y a pas de second X pour masquer quoi que ce soit : quel que soit l'allèle présent sur son unique X, il s'exprime directement dans le phénotype. $X^{a}Y$ n'a pas de case intermédiaire « porteur sain » : il est atteint, point final.

### Fermeture de l'arc : pourquoi le daltonisme touche tellement plus les hommes

Reviens à la question du tout début. Pour qu'une **femme** soit atteinte d'une maladie récessive liée à l'X, il lui faut DEUX exemplaires de l'allèle malade — un de chaque parent, un événement qui suppose deux transmissions indépendantes de l'allèle rare. Pour qu'un **homme** soit atteint, il lui suffit d'**un seul** exemplaire — celui qu'il reçoit de sa mère — puisqu'il n'a aucun second X pour le masquer. Exiger deux copies plutôt qu'une seule rend l'événement mécaniquement bien plus rare chez la femme. Ce n'est donc pas une coïncidence si le daltonisme et l'hémophilie touchent tellement plus les hommes : c'est la conséquence directe et nécessaire de l'hémizygotie masculine. (Chiffrer précisément cet écart à l'échelle d'une population entière — et non plus au sein d'une seule famille — relève de la génétique des populations et de ses fréquences alléliques. Attention : pour un gène porté par l'X, le raisonnement y est un peu différent du cas d'un gène autosomal, justement parce qu'un homme n'a besoin que d'**une** copie de l'allèle pour être atteint, là où une femme en demande **deux**.)

### Un échiquier adapté aux chromosomes sexuels

L'échiquier de croisement de la leçon précédente s'utilise exactement de la même façon ici, à condition de traiter le chromosome sexuel comme n'importe quel autre gamète. Prends une mère porteuse $X^{A}X^{a}$ et un père sain $X^{A}Y$ :

| | Gamète $X^{A}$ ($\frac12$, père) | Gamète $Y$ ($\frac12$, père) |
|--|--|--|
| **Gamète $X^{A}$ ($\frac12$, mère)** | $X^{A}X^{A}$ (fille saine) | $X^{A}Y$ (fils sain) |
| **Gamète $X^{a}$ ($\frac12$, mère)** | $X^{A}X^{a}$ (fille saine, porteuse) | $X^{a}Y$ (fils atteint) |

**Lecture par sexe :** parmi les filles, $100\,\%$ sont saines (aucune ne peut être $X^{a}X^{a}$, puisque le père ne transmet que $X^{A}$) ; parmi les fils, $\frac12$ sont atteints ($X^{a}Y$) et $\frac12$ sont sains ($X^{A}Y$). C'est un résultat qu'on ne peut JAMAIS obtenir avec un gène autosomal : là, le phénotype attendu ne dépend jamais du sexe de l'enfant. Ce contraste — un risque qui diffère selon qu'on attend une fille ou un fils — est justement la signature qu'on cherche pour reconnaître une transmission liée à l'X.

[[figure:croisement-lie-x]]

### L'erreur classique à éviter ici

Une erreur fréquente : oublier que le père transmet SOIT son X SOIT son Y (jamais les deux) à un enfant donné, et donc traiter à tort le sexe de l'enfant comme une variable indépendante du génotype pour ce gène. Pour un gène lié à l'X, sexe de l'enfant et génotype possible sont **liés** : c'est précisément pour ça que l'échiquier doit faire apparaître les deux informations dans la même case, comme ci-dessus.

[[checkpoint:cp-r4-hemizygotie]]

---

## R5 — Résoudre un arbre généalogique complet et calculer une probabilité

### Ce que tu as appris à distinguer : déduction certaine ou seulement probable

Regarde en arrière : certaines déductions de cette leçon sont **certaines** (I-1 et I-2 forcément hétérozygotes au chapitre 3 ; II-1 forcément porteuse au chapitre 4, parce que son père hémizygote n'avait qu'un seul gamète possible). D'autres restent **seulement probables** (le génotype de II-2, sain, encore incertain depuis le chapitre 3). Avant de calculer quoi que ce soit, il faut toujours commencer par identifier dans laquelle des deux situations on se trouve — une probabilité ne se calcule que là où une vraie incertitude subsiste.

### La méthode, en quatre étapes

1. **Récessif ou dominant ?** (chapitre 3) Un enfant atteint de deux parents sains impose récessif ; sinon, vérifier si le caractère saute des générations.
2. **Autosomal ou lié à l'X ?** (chapitre 4) Chercher une fille atteinte dont le père est sain (exclut le lié à l'X récessif) ou une transmission observée d'un père atteint vers un fils (exclut le lié à l'X, quel que soit le mode de dominance).
3. **Attribuer les génotypes certains**, individu par individu, à partir du mode déduit.
4. **Pour un individu dont le génotype reste incertain** (phénotype sain, mais parents connus hétérozygotes) : ne garder, parmi les cas de l'échiquier, que ceux compatibles avec le phénotype observé, puis **renormaliser** les proportions à l'intérieur de ce sous-ensemble.

### Cas d'étude : reprendre la famille des chapitres 2 à 3, et calculer enfin le génotype de II-2

Rappel du chapitre 3 : I-1 et I-2 sont $A//a$ ; II-1 (atteinte) est $a//a$ ; II-2 (sain) reste incertain. L'échiquier $A//a \times A//a$ donne, parmi TOUS les enfants possibles (atteints ou non) : $\frac14$ de $A//A$, $\frac24$ de $A//a$, $\frac14$ de $a//a$.

Mais on sait déjà que II-2 est **sain** — cette information élimine d'emblée la possibilité $a//a$. Il ne reste que les deux cas compatibles avec « sain » : $A//A$ (proportion $\frac14$ dans l'échiquier complet) et $A//a$ (proportion $\frac24$). Ensemble, ces deux cas représentent $\frac14 + \frac24 = \frac34$ de tous les enfants possibles — c'est ce $\frac34$ qui devient le nouveau total de référence, puisqu'on sait que II-2 appartient à ce groupe-là et à aucun autre.

$$P(\text{II-2 est } A//A \mid \text{sain}) = \frac{1/4}{3/4} = \frac{1}{3} \qquad\qquad P(\text{II-2 est } A//a \mid \text{sain}) = \frac{2/4}{3/4} = \frac{2}{3}$$

II-2, phénotypiquement sain, a donc $\frac23$ de chances d'être porteur ($A//a$) et seulement $\frac13$ de chances d'être homozygote sain ($A//A$) — le fait d'être « sain » ne veut pas dire « pas porteur » : c'est même le résultat le plus probable ici.

### Poursuivre l'enquête : un enfant à naître

II-2 se marie à II-3, une femme saine non apparentée à la famille, dont on sait par ailleurs (test génétique dans sa propre famille) qu'elle est hétérozygote confirmée : $A//a$. Le couple attend un enfant, III-1. Quelle est la probabilité que III-1 soit atteint de drépanocytose ?

**Ce qu'on cherche ici, et pourquoi ce geste :** on ne connaît pas le génotype de II-2 avec certitude — il faut donc envisager les deux cas possibles pour lui (établis ci-dessus), calculer la probabilité que III-1 soit atteint DANS CHAQUE CAS, puis pondérer chaque résultat par la probabilité de ce cas. C'est la même logique de combinaison de probabilités indépendantes qu'à la leçon précédente, appliquée ici à une incertitude de départ plutôt qu'à un simple croisement.

- **Si II-2 est $A//a$** (probabilité $\frac23$) : le croisement est $A//a \times A//a$, qui donne $\frac14$ d'enfants $a//a$ (atteints) — exactement l'échiquier du chapitre 3.
- **Si II-2 est $A//A$** (probabilité $\frac13$) : le croisement est $A//A \times A//a$ ; ce parent ne transmet que $A$, donc **aucun** enfant ne peut être $a//a$ — probabilité $0$.

$$P(\text{III-1 atteint}) = P(\text{II-2}=A//a) \times P(a//a \mid Aa \times Aa) \;+\; P(\text{II-2}=A//A) \times P(a//a \mid AA \times Aa)$$

$$P(\text{III-1 atteint}) = \left(\frac{2}{3} \times \frac{1}{4}\right) + \left(\frac{1}{3} \times 0\right) = \frac{2}{12} = \frac{1}{6}$$

[[figure:proba-enfant-atteint]]

### Vérification rapide

Le résultat $\frac16$ est logiquement plus petit que $\frac14$ (le risque si II-2 était certainement hétérozygote) : c'est cohérent, puisqu'il existe une chance non nulle ($\frac13$) que II-2 ne transmette aucun risque du tout. Une probabilité obtenue par ce type de calcul ne peut jamais dépasser le risque du cas le plus défavorable ; elle lui est même strictement inférieure dès qu'un cas moins défavorable garde une probabilité non nulle — comme ici.

[[checkpoint:cp-r5-probabilite]]

---

## R6 — Pour t'entraîner

### Exercice travaillé

**Énoncé.** Dans une famille, un homme (I-1) est atteint d'hémophilie — une maladie récessive liée au chromosome X, notons ses allèles $H$ (sain, dominant) et $h$ (hémophile, récessif). Il est marié à une femme saine (I-2), non apparentée à sa famille. Leur fille, II-1, est phénotypiquement saine. II-1 se marie à un homme sain (II-2), non apparenté et sans antécédent familial connu d'hémophilie. Le couple a un fils, III-1.

Détermine, avec justification, si II-1 peut être porteuse de l'allèle $h$, puis calcule la probabilité que III-1 soit atteint d'hémophilie.

**Raisonnement à voix haute.**

D'abord, le génotype de I-1 : atteint, hémophile, hémizygote — $X^{h}Y$. C'est un père hémizygote : il n'a qu'un seul type de gamète possible pour ce gène, $X^{h}$, et il le transmet à **toutes** ses filles, sans exception (c'est le Test A/B du chapitre 4, version certaine). II-1 reçoit donc, à coup sûr, un $X^{h}$ de son père.

**Ce qu'on reconnaît ici :** l'autre X de II-1 vient de sa mère I-2, qu'on suppose non porteuse en l'absence d'indication contraire ($X^{H}X^{H}$) — une hypothèse standard quand rien dans l'énoncé ne suggère le contraire. II-1 reçoit donc $X^{H}$ de sa mère. Son génotype est donc $X^{H}X^{h}$ : phénotypiquement saine, mais **certainement porteuse** — pas une probabilité à calculer ici, une certitude, exactement comme au chapitre 4.

Pour la suite : II-2 (le mari), phénotypiquement sain et hémizygote, est nécessairement $X^{H}Y$ — pour un homme, contrairement à une femme, le phénotype révèle directement et sans ambiguïté le génotype pour ce gène (il n'y a que deux génotypes masculins possibles, et « sain » n'en désigne qu'un seul).

Construisons l'échiquier $X^{H}X^{h}$ (II-1) $\times$ $X^{H}Y$ (II-2) :

| | $X^{H}$ ($\frac12$, père) | $Y$ ($\frac12$, père) |
|--|--|--|
| **$X^{H}$ ($\frac12$, mère)** | $X^{H}X^{H}$ (fille saine) | $X^{H}Y$ (fils sain) |
| **$X^{h}$ ($\frac12$, mère)** | $X^{H}X^{h}$ (fille saine, porteuse) | $X^{h}Y$ (fils atteint) |

On sait déjà que III-1 est un **fils** — cette information restreint l'échiquier aux deux cases où l'enfant reçoit un Y du père : $X^{H}Y$ (sain) et $X^{h}Y$ (atteint), chacune de proportion $\frac14$ dans l'échiquier complet, donc à parts égales ($\frac12$ chacune) une fois restreint aux seuls fils.

$$P(\text{III-1 atteint} \mid \text{c’est un fils}) = \frac{1/4}{1/4 + 1/4} = \frac{1}{2}$$

**Conclusion :** II-1 est certainement porteuse ($X^{H}X^{h}$), et III-1 a une probabilité $\frac12$ d'être atteint d'hémophilie.

### À toi de jouer

**Prompt 1.** Un caractère héréditaire $M$ est porté par le chromosome Y. Un homme atteint de $M$ a deux fils et une fille. D'après la règle de transmission du chromosome Y (chapitre 4), quel phénotype attends-tu chez chacun de ces trois enfants pour le caractère $M$ ? Justifie chaque cas séparément.

**Prompt 2.** Chez l'être humain, la brachydactylie (des doigts anormalement courts) est due à un allèle $B$, autosomal et dominant sur l'allèle normal $b$. Un homme brachydactyle, hétérozygote ($B//b$), a des enfants avec une femme saine et non apparentée ($b//b$). Construis l'échiquier de croisement correspondant, et donne la probabilité qu'un enfant du couple soit brachydactyle.
