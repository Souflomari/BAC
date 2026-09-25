<!--
  PATH B — direct, high-effort single-Opus pass on the notion, written WITHOUT
  going through the content-author/spec handoff. This is the quality CEILING for
  the both-ways handoff test (RULES §5 / pipeline.md). The harness renders
  lesson.md (path A); this file exists only for the A-vs-B comparison.
  Same notion, same French voice-ready + KaTeX constraints.
-->

# Probabilités conditionnelles

## Commençons par une surprise

Une maladie touche **1 personne sur 100**. Il existe un test fiable : il détecte
**95 %** des personnes malades, et il ne se trompe que dans **10 %** des cas chez
les personnes saines (des « faux positifs »).

Vous passez le test. Il est **positif**.

Avant de calculer quoi que ce soit, donnez votre intuition : à votre avis, quelle
est la probabilité que vous soyez réellement malade ? Notez un nombre.

La plupart des gens répondent « environ 95 % » — le test est fiable, il est
positif, donc je suis probablement malade. **Gardez votre réponse de côté.** À la
fin de cette leçon, on calculera la vraie valeur, et l'écart va surprendre. C'est
toute l'histoire des probabilités conditionnelles : *ce qui est probable change
selon ce que l'on sait déjà.*

## « Sachant que », c'est réduire l'univers

La probabilité conditionnelle de $B$ **sachant** $A$ se note $P(B|A)$ — ou, dans la
convention marocaine, $P_A(B)$. Les deux notations désignent la même chose et on
les utilisera toutes les deux. Sa définition :

$$P(B|A) = \frac{P(A \cap B)}{P(A)}, \quad \text{pour } P(A) \neq 0.$$

Le piège classique, c'est de croire que $P(B|A)$ et $P(A\cap B)$ sont la même
chose. Ce ne sont pas les mêmes. Voyons pourquoi avec une classe de 100 élèves.

Sur ces 100 élèves, $60$ font du **sport** ($S$), et parmi tous les élèves, $24$
font du sport **et** sont en terminale scientifique ($T$). Deux questions qui se
ressemblent mais ne se ressemblent pas :

- « Quelle proportion de **toute la classe** fait du sport ET est en T ? »
  C'est l'intersection : $P(S\cap T) = \tfrac{24}{100} = 0{,}24$. Le dénominateur,
  c'est *tout le monde*.
- « Quelle proportion **des sportifs** est en T ? » C'est la conditionnelle :
  $P(T|S) = \tfrac{24}{60} = 0{,}40$. Le dénominateur, c'est *seulement les
  sportifs*.

Vous voyez ce qui change : le **numérateur est le même** ($24$ élèves), mais le
**dénominateur rétrécit**. Conditionner par $S$, c'est *réduire l'univers aux
sportifs*, puis mesurer $T$ à l'intérieur. Diviser par $P(S)$, c'est exactement
l'acte de rétrécir l'univers.

> Retenez le réflexe d'expert : quand on lit « **parmi** les … », « **sachant
> que** … », c'est le signal que l'univers se réduit — donc qu'on divise par la
> probabilité de l'événement qui conditionne.

Et $P(A|B) = P(A\cap B)$ seulement dans le cas particulier où $P(B)=1$ : si $B$
est *tout l'univers*, le réduire ne change rien.

## La règle du produit, et l'arbre pondéré

Réarrangeons la définition. Multiplions les deux côtés par $P(A)$ :

$$P(A \cap B) = P(A)\,\cdot\,P(B|A) = P(B)\,\cdot\,P(A|B).$$

C'est la **règle du produit** (ou formule des probabilités composées). Elle se lit
naturellement sur un **arbre pondéré**, l'outil central de toute cette notion.

[[ARBRE_PONDERE]]

Lisons-le. On part de la racine. Une première branche mène à $A$ (probabilité
$P(A)=0{,}6$) ou à $\bar{A}$ (probabilité $P(\bar A)=0{,}4$). Puis, depuis chaque
nœud, une seconde branche mène à $B$ ou $\bar B$, avec les probabilités
**conditionnelles** : $P(B|A)=0{,}5$, $P(B|\bar A)=0{,}2$, etc.

Deux opérations, deux directions :

- **Le long d'une branche, on multiplie.** La feuille $A\cap B$ vaut
  $P(A)\cdot P(B|A) = 0{,}6 \times 0{,}5 = 0{,}30$. Pourquoi un produit et pas une
  somme ? Parce que $P(B|A)$ est une proportion *de ce qui est déjà arrivé à $A$* :
  $0{,}5$ veut dire « la moitié **de** ceux qui ont fait $A$ ». Et « la moitié de
  $60\,\%$ », c'est $0{,}5 \times 0{,}6$. « **De** » se traduit par « $\times$ ».
- **À travers les feuilles, on additionne** (on y revient pour $P(B)$).

> Garde-fou : si on *additionnait* le long d'une branche, on obtiendrait ici
> $0{,}6 + 0{,}5 = 1{,}1$ — une « probabilité » supérieure à $1$, ce qui est
> impossible. Une probabilité qui dépasse $1$ est le signal qu'on a additionné là
> où il fallait multiplier.

## Indépendance n'est pas incompatibilité

Voici la confusion reine de cette notion. Deux mots qui sonnent comme « sans
rapport » mais qui veulent dire des choses **opposées**.

| | Incompatibles | Indépendants |
|---|---|---|
| Définition | $A \cap B = \varnothing$, donc $P(A\cap B)=0$ | $P(A\cap B) = P(A)\cdot P(B)$ |
| En clair | ne peuvent pas arriver ensemble | l'un n'informe pas sur l'autre : $P(B\|A)=P(B)$ |
| Influence de $A$ sur $B$ | **maximale** (si $A$, alors $B$ impossible) | **nulle** |

Regardez la dernière ligne : les incompatibles, c'est l'**influence maximale**
(savoir que $A$ est arrivé interdit $B$) ; les indépendants, c'est l'**influence
nulle**. Ce sont les deux extrêmes, pas des synonymes.

**La contradiction qui le prouve.** Lançons un dé. $A$ = « obtenir $2$ », $B$ =
« obtenir $5$ ». Ces deux événements sont incompatibles (on ne peut pas faire $2$
*et* $5$ d'un seul lancer). Sont-ils indépendants ? Calculons $P(B|A)$ : *sachant
qu'on a fait $2$*, la probabilité d'avoir fait $5$ est… $0$. Or si $B$ était
indépendant de $A$, on aurait $P(B|A)=P(B)=\tfrac16$. Comme $0 \neq \tfrac16$, $A$
influence $B$ — énormément. **Donc des événements incompatibles (de probabilités
non nulles) ne sont jamais indépendants.**

Deux pièges arithmétiques en découlent, à désamorcer :

- « Indépendants $\Rightarrow P(A\cap B)=0$. » **Faux.** Deux pièces de monnaie :
  $A$ = « pile au 1ᵉʳ », $B$ = « pile au 2ᵉ ». Clairement indépendants — et
  pourtant $P(A\cap B) = P(\text{deux piles}) = \tfrac14 \neq 0$. L'indépendance ne
  *supprime* pas l'intersection ; elle en **fixe la valeur** à $P(A)\cdot P(B)$.
- « Indépendants $\Rightarrow P(A\cap B)=P(A)+P(B)$. » **Faux** — c'est le « $+$ »
  de la réunion d'incompatibles qui contamine l'intersection. Pour des événements
  indépendants, l'intersection se **multiplie** : avec $P(A)=0{,}4$, $P(B)=0{,}5$,
  $P(A\cap B)=0{,}4\times 0{,}5 = 0{,}20$ — et surtout pas $0{,}9$. Vérification de
  magnitude : $0{,}9$ dirait que les deux arrivent ensemble *plus souvent* que
  chacun séparément. Absurde : une intersection ne peut jamais dépasser le plus
  petit des deux, $P(A\cap B) \le \min(P(A),P(B))$.

> $\cap$ va avec $\times$ (intersection d'indépendants) ; $\cup$ va avec $+$
> (réunion d'incompatibles). Garder ces deux fils séparés, c'est l'essentiel de ce
> chapitre.

## La formule des probabilités totales

Revenons à l'arbre. Comment calculer $P(B)$, la probabilité de $B$ *tout court* ?
$B$ peut arriver de deux façons : en passant par $A$, ou en passant par $\bar A$.
Ce sont les deux **feuilles où $B$ apparaît**. On les additionne :

$$P(B) = P(A\cap B) + P(\bar A \cap B) = P(A)\,P(B|A) + P(\bar A)\,P(B|\bar A).$$

Avec nos nombres : $P(B) = 0{,}6\times 0{,}5 + 0{,}4\times 0{,}2 = 0{,}30 + 0{,}08
= 0{,}38$.

Le piège ici, c'est d'oublier les **poids** $P(A)$ et $P(\bar A)$ et d'écrire
$P(B) = P(B|A) + P(B|\bar A) = 0{,}5 + 0{,}2 = 0{,}7$. C'est faux, et on peut le
*sentir* : $P(B)$ est une moyenne des taux $0{,}5$ et $0{,}2$ **pondérée** par la
taille des branches — elle doit donc tomber *entre* $0{,}2$ et $0{,}5$. La valeur
$0{,}7$ est hors de cet intervalle : impossible. On ne fait pas la moyenne de deux
taux sans pondérer par la population de chaque groupe.

(Pour que ça marche, $\{A, \bar A\}$ doit être une **partition** de l'univers :
les deux cas ne se chevauchent pas et couvrent tout. C'est ce qui garantit que
chaque issue de $B$ est comptée exactement une fois.)

## Lire l'arbre à rebours : la vraie probabilité d'être malade

On sait maintenant tout faire « vers l'avant » : de la cause vers l'effet. La
question du début demande l'**inverse** : on *observe* l'effet (test positif) et on
remonte vers la cause (être malade). C'est $P(A|B)$ quand l'arbre a été construit
dans le sens $A \to B$.

La définition n'a pas changé :

$$P(A|B) = \frac{P(A\cap B)}{P(B)}.$$

Le seul point délicat — et c'est *là* que tout se joue — c'est le **dénominateur**.
On ne divise pas par $P(A)$ (la branche d'où l'on vient), ni par $P(B|A)$ (le taux
donné). On divise par $P(B)$ : **toutes** les façons dont l'effet a pu se produire.
D'où la méthode : on *colorie toutes les feuilles où $B$ se produit*, et $P(A|B)$
est la part de la feuille favorable $A\cap B$ dans ce *total colorié*.

Reprenons le dépistage. $A=M$ « être malade » ($P(M)=0{,}01$), $B=T^{+}$ « test
positif ». On donne $P(T^{+}|M)=0{,}95$ et $P(T^{+}|\bar M)=0{,}10$.

1. Feuille favorable : $P(M\cap T^{+}) = 0{,}01 \times 0{,}95 = 0{,}0095$.
2. L'autre feuille où $T^{+}$ apparaît : $P(\bar M \cap T^{+}) = 0{,}99 \times
   0{,}10 = 0{,}099$.
3. Total des feuilles positives : $P(T^{+}) = 0{,}0095 + 0{,}099 = 0{,}1085$.
4. Enfin :
$$P(M|T^{+}) = \frac{0{,}0095}{0{,}1085} \approx 0{,}088 \approx 9\,\%.$$

**Neuf pour cent.** Pas $95\,\%$. Comparez à votre intuition du début. Pourquoi si
bas ? Parce que la maladie est *rare* : la petite population malade ($1\,\%$)
produit peu de vrais positifs, tandis que l'énorme population saine ($99\,\%$),
même avec seulement $10\,\%$ de faux positifs, produit *beaucoup* plus de positifs.
La plupart des tests positifs sont des faux positifs. Le réflexe d'expert :

> On observe l'effet et on remonte vers la cause — donc on divise par **tout** ce
> qui produit cet effet, pas seulement par la branche qu'on soupçonne. C'est
> pourquoi $P(M|T^{+})$ (ce qu'on cherche) et $P(T^{+}|M)$ (ce qu'on nous donne)
> sont radicalement différents : même numérateur, dénominateurs opposés.

C'était la surprise annoncée. La probabilité dépend de ce qu'on sait — et la
renverser sans changer de dénominateur est l'erreur la plus coûteuse de toute la
notion.

## Récapitulatif

- $P(B|A) = P_A(B) = \dfrac{P(A\cap B)}{P(A)}$ : conditionner, c'est **réduire
  l'univers** et diviser par sa probabilité.
- **Le long d'une branche on multiplie** ; **sur les feuilles on additionne**.
- $P(A\cap B) = P(A)P(B|A)$ (règle du produit).
- **Indépendants** : $P(A\cap B)=P(A)P(B)$ ($\cap$, $\times$). **Incompatibles** :
  $P(A\cap B)=0$ ($\cup$, $+$). Opposés, jamais synonymes.
- $P(B) = P(A)P(B|A) + P(\bar A)P(B|\bar A)$ : moyenne **pondérée**, sur une
  partition.
- À rebours : $P(A|B) = \dfrac{P(A\cap B)}{P(B)}$ — diviser par **tout** $B$.
