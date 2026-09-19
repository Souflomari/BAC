# Contrôle par un réactif ou par catalyse

---

## R0 — Accroche : le parfumeur pressé

Reviens au chimiste-parfumeur du chapitre estérification et hydrolyse. Il fabrique un ester odorant en mélangeant un acide carboxylique et un alcool :

$$CH_3COOH + C_2H_5OH \rightleftharpoons CH_3COOC_2H_5 + H_2O$$

Et il a buté sur deux murs. Le premier : c'est **lent** — plusieurs jours à température ambiante pour atteindre l'état final. Le second, plus frustrant encore : c'est **limité** — même en attendant indéfiniment, il ne convertit qu'environ deux tiers de son acide en ester ($\tau \approx 2/3$), parce que la réaction inverse, l'hydrolyse, ronge une partie de ce qu'il produit. La double flèche de l'équation dit exactement ça : tout seul, ça n'ira jamais jusqu'au bout.

La leçon précédente lui a donné des leviers pour déplacer cet équilibre sans le résoudre (verser un réactif en excès, éliminer l'eau au fur et à mesure). Ce chapitre-ci en ouvre un tout autre, plus radical : **et si on remplaçait carrément l'un des ingrédients par un cousin plus réactif ?**

Voici l'idée qu'on va tester. Au lieu de partir de l'acide éthanoïque, on part de son **anhydride** — une molécule de la même famille, mais bien plus mordante. Avant de lire la suite, prends position. En remplaçant l'acide par son anhydride, à ton avis :

- (a) on retombe sur le même équilibre limité à $\tau \approx 2/3$, juste atteint plus vite ;
- (b) on obtient un peu plus d'ester, mais ça reste un équilibre ;
- (c) la réaction devient rapide **et** totale — tout l'alcool y passe.

Engage-toi sur une des trois avant de continuer. Puis on tranche — et on verra pourquoi un simple changement de réactif peut réussir ce qu'aucun réglage de température ne fera jamais. Ensuite, une fois l'ester fabriqué, on apprendra à le défaire proprement — jusqu'au savon.

[[checkpoint:cp-r0-predict]]

---

## R1 — Contrôle par un réactif : passer à l'anhydride d'acide

### L'idée : un réactif plus réactif

« Contrôler une transformation par un réactif », dans ce chapitre, ne veut pas dire jouer sur les quantités — ça, c'était le déplacement d'équilibre du chapitre précédent. Ça veut dire quelque chose de plus direct : **remplacer un réactif de départ par un autre, chimiquement plus réactif, qui mène au même produit mais par une réaction plus favorable.** Pour fabriquer un ester, le réactif plus réactif que l'acide carboxylique, c'est son **anhydride d'acide**.

### Reconnaître un anhydride d'acide

Un anhydride d'acide dérive d'un acide carboxylique : imagine qu'on prend deux molécules d'acide $R-COOH$, qu'on leur retire une molécule d'eau, et qu'on soude les deux restes par un atome d'oxygène. Le groupe caractéristique qui en résulte est le groupe **anhydride**, $-CO-O-CO-$ :

$$R-CO-O-CO-R$$

Par exemple, l'anhydride éthanoïque, $CH_3-CO-O-CO-CH_3$ (qu'on écrit aussi $(CH_3CO)_2O$), dérive de deux molécules d'acide éthanoïque. C'est le quatrième des groupes caractéristiques au programme, aux côtés de l'hydroxyle $-OH$, du carboxyle $-CO_2H$ et de l'ester $-CO_2R$.

### L'équation générale : anhydride + alcool

Quand un anhydride d'acide rencontre un alcool, il se comporte comme l'acide dont il dérive, mais en plus vif : le groupe $-OH$ de l'alcool se fixe, un ester se forme, et le second morceau de l'anhydride repart sous forme d'acide carboxylique. L'équation générale s'écrit :

$$R-CO-O-CO-R + R'-OH \rightarrow R-CO-O-R' + R-COOH$$

[[figure:anhydride-alcool]]

Regarde bien les deux différences avec l'estérification classique du chapitre précédent :

- **Une seule flèche, pas une double.** La réaction est **totale** : elle avance jusqu'à épuisement du réactif limitant, sans réaction inverse qui viendrait la ronger. Pas de plafond à $\tau \approx 2/3$ ici — on va jusqu'à $\tau = 1$.
- **Le sous-produit n'est pas de l'eau, mais un acide carboxylique.** Aucune eau n'est formée pour réhydrolyser l'ester : c'est l'une des raisons pour lesquelles rien ne fait marche arrière.

Et cette réaction est **rapide** : là où l'acide demandait des jours, l'anhydride réagit en quelques minutes, souvent sans même chauffer. Deux qualités d'un coup : **rapide et totale.** C'est la réponse à l'accroche — la proposition (c) était la bonne.

Concrètement, sur le couple du parfumeur — anhydride éthanoïque et éthanol :

$$CH_3-CO-O-CO-CH_3 + C_2H_5OH \rightarrow CH_3-CO-O-C_2H_5 + CH_3COOH$$

Il récupère l'éthanoate d'éthyle, exactement le même ester qu'avant, mais vite et en totalité, accompagné d'acide éthanoïque au lieu d'eau.

### Chiffrer le gain : le rendement

Pour comparer honnêtement les deux voies, on utilise le **rendement** $\eta$ d'une transformation : le rapport de la quantité de produit réellement obtenue à la quantité maximale qu'on obtiendrait si la réaction était totale.

$$\eta = \frac{n_{\text{obtenu}}}{n_{\text{max}}}$$

*Ce qu'on cherche ici, et pourquoi ce geste :* le dénominateur est toujours la quantité que donnerait une réaction totale — c'est la référence idéale à laquelle on compare la réalité, quel que soit le chemin choisi. Un rendement de $100\,\%$ signifie « rien perdu par rapport à l'idéal totale ».

**Exemple travaillé.** On veut produire de l'éthanoate d'éthyle à partir de $n_0 = 0{,}50\ \text{mol}$ d'éthanol.

- *Par la voie de l'anhydride (rapide et totale)*, avec l'anhydride éthanoïque en léger excès (l'éthanol est alors le réactif limitant) : la réaction consomme tout l'éthanol, donc $n(\text{ester}) = 0{,}50\ \text{mol}$. C'est aussi la quantité maximale théorique, d'où :

$$\eta_{\text{anhydride}} = \frac{0{,}50}{0{,}50} = 1 = 100\,\%$$

- *Par la voie de l'acide (lente et limitée)*, en partant de $0{,}50\ \text{mol}$ d'acide éthanoïque et $0{,}50\ \text{mol}$ d'éthanol (estérification simple, $\tau \approx 2/3$) : la réaction plafonne à $n(\text{ester}) = \tau \, n_0 = \tfrac{2}{3} \times 0{,}50 \approx 0{,}33\ \text{mol}$, pour la même quantité maximale théorique $0{,}50\ \text{mol}$ :

$$\eta_{\text{acide}} = \frac{0{,}33}{0{,}50} \approx 0{,}67 = 67\,\%$$

Changer de réactif fait passer le rendement de $67\,\%$ à $100\,\%$ — et en un temps bien plus court. Voilà, très précisément, ce qu'on appelle **contrôler une transformation par un réactif** : ne pas régler les conditions, mais choisir un réactif de départ intrinsèquement plus efficace.

---

## R2 — Le catalyseur : accélérer sans déplacer

### Ce qu'est un catalyseur, et ses deux rôles

Un **catalyseur** est une espèce chimique qui **accélère** une réaction sans être consommée : il participe au déroulement de la transformation, mais il en ressort intact, en même quantité et de même nature qu'au départ.

[[checkpoint:cp-r2-catalyseur-bilan]]

Puisqu'il n'appartient ni au camp des réactifs ni à celui des produits, on l'écrit **au-dessus de la flèche** de l'équation — jamais parmi les uns, jamais parmi les autres.

Le programme lui reconnaît deux rôles, qu'il faut savoir nommer :

- un rôle **accélérateur** : il augmente la vitesse de la réaction ;
- un rôle **sélectif** : lorsque plusieurs réactions concurrentes sont possibles à partir des mêmes réactifs, un catalyseur donné peut n'en accélérer qu'une seule, et orienter ainsi le système vers le produit voulu plutôt qu'un autre. (Les enzymes, qu'on verra au chapitre suivant, poussent cette sélectivité à l'extrême.)

Le catalyseur rejoint ainsi les autres **facteurs cinétiques** déjà rencontrés — la température et la concentration des réactifs : tous des leviers qui agissent sur la **vitesse** d'une transformation, jamais sur son état final.

[[checkpoint:cp-r2-facteurs-cinetiques]]

### Ce qu'un catalyseur ne change jamais : l'état final

Voici le point le plus important, et le plus contre-intuitif. Un catalyseur accélère — mais il ne change **ni la quantité finale de produit d'une réaction totale, ni la constante d'équilibre $K$ d'une réaction limitée.** Il change *quand* on arrive à l'état final, jamais *où* se trouve cet état final.

Pour une transformation totale, c'est presque évident : le catalyseur n'apporte et ne retranche aucune matière, donc la quantité de produit reste fixée par le réactif limitant, avec ou sans lui.

Pour une transformation limitée — un équilibre —, l'affirmation est plus délicate. Et c'est là qu'il faut un vrai argument, pas une simple affirmation.

[[figure:facteurs-cinetiques]]

### Pourquoi un catalyseur ne peut pas déplacer un équilibre

Reviens à ce qu'est un équilibre, vu au chapitre état d'équilibre : c'est l'instant où la **vitesse de la réaction directe** devient égale à la **vitesse de la réaction inverse**. Les deux réactions continuent, mais à vitesses égales — si bien que les quantités n'évoluent plus.

Maintenant, la propriété clé d'un catalyseur : il accélère la réaction directe **et** la réaction inverse, et il les multiplie **par le même facteur**. Le même catalyseur qui aide $A + B$ à donner $C + D$ aide tout autant $C + D$ à redonner $A + B$ : c'est le même chemin, parcouru dans les deux sens.

Suis la conséquence, pas à pas. Sans catalyseur, l'équilibre s'établit quand :

$$v_{\text{directe}} = v_{\text{inverse}}$$

Ajoute le catalyseur : chaque vitesse est multipliée par le même facteur $\alpha > 1$. La condition d'équilibre devient :

$$\alpha \, v_{\text{directe}} = \alpha \, v_{\text{inverse}}$$

C'est **la même égalité** — on peut diviser les deux membres par $\alpha$ et retomber exactement sur la précédente. Elle est donc vérifiée pour **le même rapport de concentrations** qu'avant, c'est-à-dire pour la même valeur de $Q_r$ à l'équilibre — donc le même $K$. Le catalyseur fait converger les deux vitesses vers leur égalité plus rapidement, mais il ne déplace pas le point où cette égalité se produit.

Retiens la formule qui résume tout : un catalyseur qui n'accélérerait qu'un seul sens déplacerait l'équilibre — mais alors ce ne serait plus un catalyseur. Un vrai catalyseur agit sur les deux sens à la fois, dans les mêmes proportions, et c'est précisément pour ça qu'il laisse $K$ intact.

[[figure:effet-catalyseur]]

### Teste l'idée avant de la croire : « un catalyseur améliore le rendement »

Reprends le parfumeur du chapitre 1, resté sur la voie de l'acide (lente, limitée à $\tau \approx 2/3$). Il se dit : « je vais ajouter plus de catalyseur acide, ça poussera la réaction plus loin. » Faux — et tu sais maintenant l'argumenter. Le catalyseur accélère l'estérification et l'hydrolyse dans les mêmes proportions ; le rapport de leurs vitesses ne bouge pas, donc l'équilibre se rétablit au même $\tau \approx 2/3$, simplement atteint plus vite. Pour dépasser les deux tiers, il lui faut un autre type de levier : soit déplacer l'équilibre (excès d'un réactif, élimination d'un produit — chapitre précédent), soit changer de réactif (l'anhydride — chapitre 2). Le catalyseur, lui, ne fait gagner que du temps.

[[checkpoint:cp-r2-catalyseur-equilibre]]

---

## R3 — Les trois visages de la catalyse : homogène, hétérogène, enzymatique

On sait maintenant ce que fait un catalyseur ; reste à voir sous quelles formes il se présente. On en distingue trois grandes familles, selon la **phase** qu'occupe le catalyseur par rapport à celle des réactifs.

### Catalyse homogène : même phase que les réactifs

Un catalyseur est dit **homogène** quand il se trouve dans la même phase que les réactifs — le plus souvent, dissous dans la même solution qu'eux. C'est le cas des ions $Fe^{3+}$ que l'on peut ajouter à un mélange d'ions peroxodisulfate $S_2O_8^{2-}$ et d'ions iodure $I^-$ : dissous dans la même solution aqueuse que les réactifs, ils accélèrent la réaction en deux étapes rapides qui, additionnées, redonnent exactement l'équation bilan, sans que $Fe^{3+}$ (régénéré) n'apparaisse jamais dans ce bilan.

Tu as croisé un autre exemple sans t'y attarder, au chapitre estérification et hydrolyse : l'estérification de l'acide éthanoïque et de l'éthanol, réalisée avec quelques gouttes d'acide sulfurique comme catalyseur. L'acide sulfurique $H_2SO_4$, dissous dans le même mélange liquide que les réactifs organiques, est lui aussi un catalyseur homogène.

### Catalyse hétérogène : une phase différente, une réaction de surface

Un catalyseur est dit **hétérogène** quand il se trouve dans une phase différente de celle des réactifs — le plus souvent un solide, en contact avec des réactifs gazeux ou en solution. La réaction catalysée se produit alors à la SURFACE du catalyseur solide : les molécules réactives s'y fixent temporairement (on dit qu'elles s'adsorbent), y réagissent, puis les produits formés s'en détachent, libérant la surface pour de nouvelles molécules.

L'exemple le plus concret : le pot catalytique automobile, un bloc de céramique recouvert de platine, de palladium et de rhodium métalliques, solides. Les gaz d'échappement — monoxyde de carbone, oxydes d'azote, hydrocarbures imbrûlés, tous gazeux — traversent ce bloc et réagissent à la surface des métaux pour donner du dioxyde de carbone, du diazote et de l'eau, bien moins polluants.

### Teste-toi : homogène ou hétérogène ?

Le platine du pot catalytique et les gaz d'échappement : deux phases clairement différentes — un solide, des gaz. C'est un catalyseur hétérogène. Et c'est précisément parce qu'il est hétérogène — donc solide, donc physiquement séparable du flux gazeux — qu'on peut le laisser en place, des années durant, sans jamais avoir à le récupérer ni à le remplacer à chaque trajet : seule sa surface travaille, au contact de ce qui la traverse.

Une confusion à éviter : un catalyseur n'est pas hétérogène simplement parce qu'il s'agit d'une espèce chimique différente des réactifs — TOUS les catalyseurs, homogènes ou hétérogènes, sont des espèces différentes des réactifs, sinon on ne pourrait pas les distinguer d'eux. Ce qui tranche entre homogène et hétérogène, c'est uniquement la PHASE : dissous avec les réactifs (homogène) ou dans une phase séparée, typiquement solide (hétérogène) — jamais la nature chimique du catalyseur en elle-même.

### Catalyse enzymatique : le catalyseur du vivant

Une **enzyme** est un catalyseur biologique, une protéine produite par les cellules vivantes. Elle agit comme tout catalyseur : elle accélère une réaction chimique précise sans jamais en changer l'état final, et elle en ressort intacte. Ce qui la distingue des catalyseurs chimiques usuels, c'est son extrême **spécificité** : une enzyme donnée ne catalyse en général qu'une seule réaction, sur un seul type de molécule (son substrat), grâce à une forme géométrique qui s'ajuste précisément à cette molécule — une clé qui n'ouvre qu'une seule serrure. C'est la sélectivité poussée à son comble. Elle permet à des milliers de réactions différentes de se dérouler côte à côte, sans se gêner, dans une seule cellule vivante, chacune pilotée par son enzyme propre, à une température de l'ordre de $37\,^\circ\text{C}$ — là où un catalyseur chimique industriel exige souvent des conditions bien plus dures (haute température, haute pression) pour un résultat comparable.

Exemple concret : l'amylase salivaire catalyse l'hydrolyse de l'amidon, une grosse molécule, en molécules de sucre bien plus petites — une réaction d'hydrolyse, de la même famille que celle qu'on va rencontrer pour les esters au chapitre suivant, mais ici accélérée par une enzyme plutôt que par un acide ou une base.

[[figure:trois-catalyses]]

[[checkpoint:cp-r3-types-catalyse]]

---

## R4 — L'hydrolyse basique et la saponification

Jusqu'ici, on a fabriqué des esters. On sait aussi, du chapitre précédent, comment les défaire : leur hydrolyse **en milieu acide** est la réaction inverse de l'estérification — lente, et **limitée** (c'est le même équilibre, lu à l'envers). Il existe une autre façon d'hydrolyser un ester, qui change tout : l'hydrolyse **en milieu basique**.

### L'hydrolyse basique d'un ester est totale

En présence d'ions hydroxyde $HO^-$, un ester ne redonne pas l'acide carboxylique, mais l'**ion carboxylate** correspondant $R-COO^-$, accompagné de l'alcool :

$$R-CO-O-R' + HO^- \rightarrow R-COO^- + R'-OH$$

Par exemple, pour l'éthanoate d'éthyle :

$$CH_3-CO-O-C_2H_5 + HO^- \rightarrow CH_3-COO^- + C_2H_5-OH$$

Et cette réaction, contrairement à l'hydrolyse acide, est **totale**. Voici pourquoi, sans quitter le cadre : en milieu acide, l'hydrolyse redonne l'acide carboxylique $R-COOH$, qui peut aussitôt re-réagir avec l'alcool (l'estérification, en sens inverse) — d'où l'équilibre. En milieu basique, le produit n'est pas l'acide, mais sa base conjuguée, l'ion carboxylate $R-COO^-$. Or le carboxylate ne s'estérifie pas : il n'existe pas de réaction inverse pour reconstituer l'ester. Rien ne fait marche arrière, donc la réaction va jusqu'au bout. **Hydrolyse acide : limitée. Hydrolyse basique : totale.**

### La saponification : hydrolyser un corps gras

Applique cette hydrolyse basique non pas à un petit ester, mais à un **corps gras**. Un corps gras (une huile, une graisse) est un **triglycéride** : un triester du glycérol — une molécule de glycérol dont les trois groupes $-OH$ sont estérifiés par trois longues chaînes d'acides gras. Sa formule, en notant $R$ les longues chaînes carbonées :

$$C_3H_5(O-CO-R)_3$$

Hydrolyse ce triester en milieu basique (par de la soude, $Na^+ + HO^-$) : les trois fonctions ester sont hydrolysées d'un coup, et on récupère trois ions carboxylate à longue chaîne, plus le glycérol libéré :

$$C_3H_5(O-CO-R)_3 + 3\,HO^- \rightarrow 3\,R-COO^- + C_3H_5(OH)_3$$

Cette réaction porte un nom : la **saponification**. Ses deux produits sont :

- le **savon** : l'ensemble des ions carboxylate à longue chaîne $R-COO^-$ (associés aux ions $Na^+$ apportés par la soude) ;
- le **glycérol** $C_3H_5(OH)_3$, aussi appelé propane-1,2,3-triol.

Comme toute hydrolyse basique, la saponification est **lente mais totale** — c'est pour ça qu'on l'emploie pour fabriquer le savon depuis des siècles : tout le corps gras finit par être transformé.

[[checkpoint:cp-r4-vitesse-avancement]]

### La structure d'un savon : une tête et une queue

Regarde de près un ion du savon, $R-COO^-$, avec $R$ une longue chaîne carbonée (souvent quinze à dix-sept atomes de carbone). Il a deux bouts qui ne se ressemblent pas du tout :

- La **tête**, le groupe carboxylate $-COO^-$ : c'est un groupe porteur d'une **charge électrique**. Comme l'eau est un solvant polaire, cette tête ionique est attirée par l'eau — on la dit **hydrophile** (« qui aime l'eau »).
- La **queue**, la longue chaîne carbonée $R$ : une suite d'atomes de carbone et d'hydrogène, sans charge, qui n'a aucune affinité pour l'eau mais se mélange volontiers aux graisses et aux huiles — on la dit **hydrophobe** (« qui fuit l'eau »), ou lipophile.

*Ce qu'on cherche ici, et pourquoi ce geste :* pour reconnaître la partie hydrophile et la partie hydrophobe d'un ion carboxylate à longue chaîne, on ne regarde jamais la taille, mais la **charge**. Le bout qui porte la charge $-COO^-$ est toujours l'hydrophile ; la longue chaîne carbonée neutre est toujours l'hydrophobe.

C'est cette double personnalité qui explique le pouvoir lavant du savon. Face à une tache de gras dans l'eau, chaque ion oriente sa queue hydrophobe vers le gras (où elle se plaît) et sa tête hydrophile vers l'eau (où elle se plaît aussi). Les ions savon entourent ainsi les petites gouttes de gras, tête tournée vers l'eau, et les emportent au rinçage. Une molécule qui a un pied dans chaque camp — voilà la relation structure-propriété au cœur du savon.

[[figure:savon-amphiphile]]

---

## R5 — Pour t'entraîner

### Récapitulatif express

| Levier | Ce qu'il change | Ce qu'il ne change pas |
|---|---|---|
| **Changer de réactif** (acide → anhydride) | Rend la réaction rapide ET totale ($\tau = 1$, rendement $\approx 100\,\%$) | — |
| **Catalyseur** | La vitesse (rôle accélérateur et sélectif) | Ni $x_{max}$, ni $K$, ni le rendement à l'équilibre |
| **Hydrolyse basique / saponification** | Rend l'hydrolyse totale (au lieu de limitée en milieu acide) | — |

- **Contrôle par un réactif** = remplacer l'acide carboxylique par son **anhydride d'acide**. La réaction anhydride + alcool $\rightarrow$ ester + acide carboxylique est **rapide et totale** (une seule flèche), là où acide + alcool est lente et limitée à $\tau \approx 2/3$.
- Un **catalyseur** accélère sans déplacer l'état final : il multiplie les vitesses directe et inverse par le même facteur, donc $K$ et le rendement à l'équilibre restent inchangés — seul le temps pour les atteindre diminue. Ses deux rôles : **accélérateur** et **sélectif**.
- Trois types de catalyse : **homogène** (catalyseur et réactifs dans la même phase), **hétérogène** (phases différentes, réaction de surface), **enzymatique** (catalyseur biologique, extrêmement spécifique).
- L'**hydrolyse basique** d'un ester (ester + $HO^-$ $\rightarrow$ carboxylate + alcool) est **totale**, contrairement à l'hydrolyse acide, limitée. Appliquée à un corps gras, c'est la **saponification** : triglycéride + $HO^-$ $\rightarrow$ savon ($R-COO^-$) + glycérol.
- Un ion de savon $R-COO^-$ est **amphiphile** : tête $-COO^-$ **hydrophile** (chargée), longue queue carbonée **hydrophobe** — d'où son pouvoir lavant.

### Exercice de type bac

C'est un sujet d'examen national — **2025 (session normale)** : un suivi cinétique d'estérification mené dans trois conditions (deux températures, puis avec catalyseur). Le format que tu retrouveras le jour J. Pour chaque question : cherche sur papier d'abord, engage une réponse, puis seulement ouvre le raisonnement expert et compare-le au tien.

[[exercise:r-bac]]

### Une variation pour ne pas mémoriser

Même structure profonde, habillage différent : un autre couple acide/alcool, d'autres nombres, deux expériences au lieu de trois. À toi de reconnaître, sous les nombres qui changent, quelle idée s'applique — la vitesse ou l'état final.

[[exercise:r-variation]]
