# spec — manipulable 2D `plan-complexe-rapport` (Maths · `nombres-complexes-2`, **R6**)

**Statut : PROPOSITION révisée deux fois (vague 1, deux passes) — non construite.** Écrite le
2026-09-25 par pedagogy-architect, après la livraison de la scène sœur `plan-complexe-transformation`
(R5), dont le §13.3 en esquissait déjà la charte. Révisée le 2026-09-25 après les deux
rapports de vague 1 (bac-fidelity-critic, pedagogy-critic), verdict commun **BUILD AFTER
FIXES** ; **révisée une seconde fois le 2026-09-25** après les deux rapports de **seconde
passe**, verdict commun **BUILD AFTER FIXES** de nouveau.

> ## Ce que la vague 1 a changé
>
> **Deux critiques, verdict commun : construire, mais pas telle qu'écrite.** Chaque
> constatation est vérifiée ligne à ligne contre les fichiers avant d'être appliquée ; les
> deux que je réfute sont réfutées **par écrit, avec la citation**, au §15.12.
>
> **Quatre BLOQUANTS pédagogiques, tous appliqués.**
> **B1 — les ÉTIQUETTES de cran imprimaient la réponse des étapes suivantes.** Les ids
> `equilateral`, `mediatrice`, `droite` servaient aussi de libellés : au moment où le contrôle
> `forme` de S2 apparaissait, le panneau contenait « équilatéral », la réponse de S3, mot pour
> mot. → **les libellés visibles sont désormais séparés des ids** (§5.2 : ordinaux neutres pour
> `forme` et `position`, **affixes** pour `pointM` — la convention de la scène sœur, vérifiée
> `scenes.json:773-775`), et **le balayage de la porte `formule-graduee` inclut les libellés de
> cran** (§7.5 C, §11.2).
> **B2 — un retour de S1 employait les deux mots de S2** (« longueurs », « directions ») et le
> §7.5 B certifiait le contraire. → retour réécrit dans le seul vocabulaire de S1, et **le
> §7.5 B est refait retour par retour, cité**.
> **B3 — le distracteur `angle-lu-depuis-l-axe` de S2 portait sa propre réfutation** entre
> parenthèses (« $\frac{\sqrt3}{2}$ serait $AC$, **soit $2\sqrt3$** »). → S2 est reconstruite
> (elle **parie des valeurs**, plus des étiquettes : voir I2), les parenthèses réfutantes
> disparaissent, et **le §14.0 gagne une clause (d)** : *le texte d'un choix ne contient jamais
> le nombre qui le réfute.*
> **B4 — le pari de S3 rejouait NBCOMPLEX2-6.** Vérifié : `items.yaml:557-596` pose les mêmes
> deux nombres ($\vert w\vert = 1$, $\arg = \frac{\pi}{3}$), la même conclusion et un sur-ensemble
> des options. → **la table de doublon du §7.4 est refaite pour S1, S2 et S3** (§7.6), et **le
> pari de S3 est déplacé sur le fait que la scène existe pour porter** : `demi-equilateral`, et
> **depuis quel sommet** une ligne s'allume.
>
> **Neuf constatations IMPORTANTES de fidélité, toutes appliquées.**
> **I1 — la « règle unique » de lecture alphabétique était une invention de scène que l'examen
> contredit.** Vérifié : `bank.yaml:656` lit $\frac{p-r}{q-r}$ au sommet $R$ et `bank.yaml:1204`
> lit $\frac{p-d}{q-d}$ au sommet $D$ — dans les deux cas l'ordre inverse de la règle. → **la
> règle est rétrogradée en règle de GÉNÉRATION DU BADGE, sans statut d'examen** (§5.2 C), **les
> deux retours `ordre-inverse` sont réécrits** sur la vraie conséquence (inverser la fraction
> inverse le rapport des longueurs et change le SIGNE de l'angle), et **le fait mesuré est
> écrit** : *les quatre lignes de `lesson.md:381-386` sont invariantes par $w \to 1/w$.*
> §10.12, §4.3.
> **I2 — `angle-lu-depuis-l-axe` était recruté « sans le redéclarer », alors que son texte
> déclaré est borné à une TRANSFORMATION** (`items.yaml:258-270` : « M et son **image** M′ »,
> « l'**homothétie** », « de **centre** Ω ») — le test exact que le §8.1 applique pour refuser
> deux autres modèles. → **l'élargissement est écrit mot pour mot au §8.2 bis**, livrable
> d'item-author **avant `validate-content`**, et **la règle 0 du §14 re-dérive désormais la
> PORTÉE d'un modèle, pas seulement ses nombres**.
> **I3 — `maths-sexp.yaml:328` n'avait jamais été lu**, bien que la REVIEW citée quatre fois le
> nomme (`REVIEW:114`). → ajouté au §1 et au §13.2 ; la divergence SExp est restituée à
> **trois** lignes `derived` (`:251` contre, `:254` pour, `:328` contre).
> **I4 — « S4 marquée SM » n'avait aucune portée** (aucun `filiere:` dans le corpus,
> `REVIEW:116`). → **la marque passe dans la PROSE du §4.4**, sur le précédent livré
> `lesson.md:327` (« En filière Sciences Mathématiques, cette transformation porte un nom… ») ;
> **le panneau reste non marqué**, motif de la scène sœur (`scene-plan.md:2052-2055`).
> **I5 — le §13.3 rapportait faux la recommandation S7.** Vérifié `REVIEW:127-130` : S7
> **recommande une direction** (« aligner sur « angle inscrit » / « cercle de diamètre » ») et
> nomme **content-author**, pas le propriétaire. → §13.3 corrigé ; **la prose du §4.4 nomme
> « théorème de l'angle inscrit » une fois, après le mécanisme** ; **« Thalès » reste banni** ;
> et le §4.6 commande l'alignement de `checkpoints.yaml:375`, qui envoie aujourd'hui l'élève sur
> « réciproque de Thalès », le nom que la REVIEW dit univoquement faux.
> **I6 — les quatre items neufs peuvent porter `habilete`**, et cette notion a déjà le champ
> (`checkpoints.yaml:289`, `:352`). → **`habilete` obligatoire sur les quatre, au vocabulaire
> MATHS** (`application_directe` / `application_non_explicite` /
> `synthese_situations_inhabituelles`), pas au vocabulaire PC des checkpoints. §8.3, §14.1.
> **I7 — un `savoir_faire` de cadre à 0/41 était orphelin entre deux specs** (la scène sœur le
> lui assignait, `scene-plan.md:2444-2447` ; celle-ci le refusait, §0.2). → **§13.13, question
> numérotée au propriétaire, avec la piste des deux documents.**
> **I8 — le bac de maths ne contient AUCUN QCM.** `bac-reference.md:127-128` + dix énoncés de
> banque en réponse construite. → §8.4 le dit sous sa forme exacte, et **NBCOMPLEX2-42 est
> reformé sur le geste attesté de la banque** (`bank.yaml:1202-1204` : « on vérifie que
> $p-d = i(q-d)$ »).
> **I9 — les distracteurs `w-sommet-ignore` ne doivent pas enseigner qu'un rapport d'affixes
> est vide de sens** : l'examen le lit exactement ainsi quand le sommet EST l'origine
> (`bank.yaml:812-816`, `:463`). → **contrainte de retour écrite au §8.3** : chaque retour
> nomme le sommet depuis lequel le mauvais rapport lit ($O$), et **aucun ne dit qu'il ne veut
> rien dire**.
>
> **Treize constatations IMPORTANTES de pédagogie (I1–I13), TOUTES appliquées.**
> **I1** — le plan répond avant le texte à S2 (une **longueur reportée** sur la direction de
> $\vec{AB}$) et à S3 (le **petit carré de l'angle droit**, posé en $C$ pendant que la lecture,
> en $A$, écrit « aucune des quatre ») ; chaque marque expliquée une fois, **par les quatre
> retours**. *Le rapport proposait des « marques de côtés égaux » à S3 ; elles répondaient au
> pari équilatéral du premier jet, que le correctif B4 a retiré. **Le carré est la marque du
> pari qui reste**, et il fait mieux : il répond **ailleurs que là où on lit**.* **I2** — S2 ne fait plus apparier des étiquettes : elle **parie un couple
> de valeurs**, quatre options structurellement parallèles, et la signification arrive à la
> révélation. **I3** — la `suite` de S2 n'envoie plus lire l'état de S3. **I4/I5/I7** — les
> règles de vague 2 de la scène sœur sont appliquées (`HANDOFF.md:16446-16449`) : *une lecture
> ne prend sa ligne qu'à l'étape qui la découvre ou l'emploie* (§5.6), *une `suite` = une
> question + un geste* (les quatre), *S4 garde un pari et les deux autres lieux passent dans la
> prose du §4.4*. **I6** — la convention de la flèche épaisse est dite dans la consigne de S1.
> **I8** — la lecture au sommet $M$ est **dérivée** (retourner les deux flèches ajoute $\pi$ aux
> deux directions ; l'écart ne bouge pas). **I9** — le mécanisme du cercle de diamètre est nommé
> en clair : $O$ milieu de $[AB]$, $OM = OA = OB = \frac{AB}{2}$. **I10** — le retour `affixes`
> de S1 casse sur la conséquence, plus sur l'autorité. **I11** — $w$ varie sur les items neufs
> ($i$, $-\frac12$, $-\frac34 i$) et l'un d'eux conclut « alignés », pas « rectangle et
> isocèle ». **I12** — `droite-ab` (S4) et le distracteur D de NBCOMPLEX2-45 passent à
> `ensemble-points-locus-confondu`, dont le texte déclaré nomme « droite (AB) »
> (`items.yaml:221-232`). **I13** — l'annonce porte un crochet en forme de question qui ne nomme
> aucune ligne de la table.
>
> **Les MINEURS appliqués** : années de banque corrigées et deux sessions de **rattrapage**
> signalées (fidélité M1) ; le jeu des « quatre objets » nommé une seule fois (M2) ; la fuite de
> $w$ dans un distracteur de NBCOMPLEX2-20 ajoutée au fait mesuré (M3) ; `ensemble-points-locus-confondu`
> n'est plus dit « modèle de R6 » — NBCOMPLEX2-24 est **R7** (M4) ; `nature` nomme **toutes** les
> lignes vérifiées (M5) ; la citation de `limite` SM ramenée à `:232` (M6) ; la forme
> pré-argument de `produit-quotient-argument-operation` déclarée à S1 (M7) ; la forme
> $\left\vert\frac{z-a}{z-b}\right\vert = 1$ déclarée **non attestée** dans les dix annales
> vérifiées (M8) ; côté pédagogie : les retours parlent en libellés visibles et non en ids (M1),
> $u$ est présenté à l'élève (M2), **le cercle unité n'est tracé qu'en `mode: lieu`** (M3 — ce
> qui tranche le §13.8 par une raison), la sonde « aucun nombre hors grille » est bornée (M4),
> la qualification immesurable « *(en position de critère)* » est retirée (M5), le retour juste
> de S2 est ramené à un mécanisme et un rappel (M7), et la frontière avec
> `angle-lu-depuis-l-axe` est écrite dans la déclaration neuve (M8).
>
> **Réfuté, avec la preuve : pédagogie M6** (« divergence avec la scène sœur sous
> `prefers-reduced-motion` »). Le critique a comparé au **§6.1 de la spec sœur** ; le bloc
> « Ce que la construction a changé » de cette même spec, écrit au-dessus, dit exactement
> l'inverse — `scene-plan.md:26-29` : « *Sous `prefers-reduced-motion`, rien ne change […] les
> « trois positions discrètes » du §6.1 **ne sont pas construites**.* » **Cette spec est alignée
> sur ce qui a été LIVRÉ**, pas sur ce qui avait été projeté. §15.12.
> **Partiellement réfuté : fidélité I3** — `maths-sexp.yaml:328` vit sous `coverage_notes`, pas
> sous `programme` ; la phrase du §1 (« la seule divergence de **programme** ») était donc
> littéralement vraie, et trop étroite pour être honnête. La ligne est ajoutée, et la phrase
> réécrite. §15.12.

> ## Ce que la SECONDE PASSE de la vague 1 a changé
>
> **Les deux critiques ont relu la première révision et rendu le même verdict : BUILD AFTER
> FIXES.** Ils ont recalculé toute l'arithmétique neuve — les trois $w$ de la nouvelle S3, les
> quatre items refaits, le registre, le partage d'habileté, les cinq crans du mode `lieu` — et
> **n'ont trouvé aucune erreur de nombre**. Ce qu'ils ont trouvé est ailleurs, et le plus grave
> vient d'un correctif de la première passe.
>
> **UN BLOQUANT, et il est de mon fait. BQ-1 — le balayage de S4 effaçait l'invariant qu'il
> existe pour montrer.** Le premier jet révisé écrivait « *pendant ce glissement **toutes** les
> lectures chiffrées sont remplacées par « — »* ». **La règle LIVRÉE à côté dit le contraire, et
> je l'avais citée sans la lire** : `scene-plan.md:33-44` (bloc « Ce que la construction a
> changé », point 2) — « *Le BALAYAGE n'efface que ce qui dépend de la **POSITION** […] **Les
> invariants restent écrits** […] les voir immobiles pendant que les deux directions tournent
> **EST le fait de S3**.* » **Le motif du §5.4 (aucun décimal) ne vaut que pour la moitié
> positionnelle** : sur la médiatrice $\vert u\vert = 1$ **exactement** à chaque point du
> balayage ; sur le cercle $\arg(u) = -\frac{\pi}{2}$ **exactement**. Effacer les deux, c'était
> retirer à S4 sa vérification et transformer sa `suite` en jugement à l'œil, dans la seule
> scène qui déclare « exacte, ou rien ». → **§6.1, la `suite` de S4 (§7.4), la famille
> `balayage-invariants` (§11.2) et les sabotages 20 à 22 sont refaits sur la règle livrée, LIEU
> PAR LIEU**, avec les **bornes** qui rendent l'invariant vraiment invariant (le demi-cercle
> supérieur ; la demi-droite au-delà de $B$) — sans elles, l'argument sauterait de
> $-\frac{\pi}{2}$ à $+\frac{\pi}{2}$ et de $0$ à $\pi$ au milieu du geste. **Et les autres
> leçons livrées du balayage sont carrées cette fois** (`scene-plan.md:19-21`,
> `HANDOFF.md:16449-16451`) : début et relâchement **dits par la région vivante**, « Échap »
> dans le **libellé visible**, **une valeur parlée qui varie**, et un **pas qui déplace
> visiblement $M$** (5° sur le cercle, $\frac14$ d'unité sur les deux lieux droits).
>
> **Quatre IMPORTANTES de pédagogie.**
> **IM-1 — S3 écrivait « aucune des quatre » à un élève qui n'a jamais vu les quatre.** La table
> est à `lesson.md:381-386`, **après** le marqueur, et la scène n'allume jamais « isocèle »,
> « équilatéral » ni « alignés ». → **Correctif choisi, un seul et délibérément : la lecture
> `nature` n'énumère plus un ensemble invisible — elle écrit LES CRITÈRES QU'ELLE VIENT DE
> VÉRIFIER, avec la valeur qui les déclenche ou qui les tue.** *Pourquoi celui-là et pas les
> deux autres : « faire porter les quatre critères à la révélation » ajoute de l'encre et
> imprime « équilatéral » comme un mot que rien n'allume ; « cesser de parler de la table »
> coupe le lien avec la leçon. **Écrire ce qui a été vérifié fait les deux à la fois** — la
> lecture devient auto-suffisante, elle varie avec l'état (donc elle diagnostique), et elle
> montre le geste que la prose devra ensuite justifier. Le §7.5 C autorisait déjà « la table
> entière » à S3 : aucune frontière ne bouge.* **Conséquence heureuse : au sommet $B$,
> $\arg(w) = -\frac{\pi}{3}$ est EXACTEMENT la valeur de la ligne « équilatéral », et c'est
> $\vert w\vert = \frac12$ qui l'interdit — la lecture l'écrit désormais, et la `suite` de S3
> est reconstruite dessus.** §5.3 B, §5.6, §7.3, §11.1 N6.
> **IM-2 — S4 : combien de courbes ?** Le document disait « **la** courbe » au §6.1 et « chaque
> lieu » dans la `suite`, pendant que la porte en exigeait trois. → **Tranché : TROIS courbes,
> tracées à la révélation, et le retour JUSTE les nomme toutes les trois.** *Motif, et il n'est
> pas de goût : le balayage existe à **quatre** des cinq crans et glisse « le long de la courbe
> du lieu qui passe par le cran courant » — sans les trois courbes, deux des quatre balayages
> glissent le long de rien. La décision était déjà prise par la porte et par le balayage ; elle
> n'était pas écrite.* §6.1, §7.4, §11.2.
> **IM-3 — la clause (d) du §14.0 était trop étroite, et `rectangle-partout` ambigu.** (d) ne
> défendait que contre **le nombre** qui réfute un choix ; ce qui réfutait `rectangle-partout`
> était **un fait déjà à l'encre** (l'arc en $A$). → **(d) passe de « le nombre » à « le FAIT »**,
> et **`rectangle-partout` est réécrit comme la croyance réellement tenue** : *le triangle est
> rectangle — et le sommet n'y est pour rien*. Sa première moitié est vraie et ne peut pas se
> réfuter au dessin ; c'est la seconde qui porte le modèle. §14.0, §7.3.
> **IM-4 + fidélité NEW-3 — la règle (e) (« re-dériver la PORTÉE déclarée du modèle ») avait été
> écrite en vague 1 et lancée UNE fois.** → **Elle est lancée sur les 32 choix, et le verdict
> est une table** (§14.0 bis). *Ce qu'elle a trouvé, et c'est plus intéressant que « deux
> attributions étirées » : **trois descriptions de modèle sont plus étroites que leurs PROPRES
> items livrés**. `lecture-w-module-argument` ne nomme ni la bonne grandeur lue contre le mauvais
> seuil — alors que NBCOMPLEX2-6 B fait exactement cela depuis toujours (`items.yaml:567-575`) ;
> `ensemble-points-locus-confondu` énumère trois lieux et pas le cercle de centre $O$ ;
> `produit-quotient-argument-operation` parle d'arguments et sert trois choix **avant** qu'aucun
> argument existe.* **Les trois élargissements sont écrits mot pour mot au §8.2 ter**, tous
> additifs, tous vérifiés sans perte d'attache.
>
> **Onze constatations de fidélité (NEW-1 à NEW-11), toutes appliquées.** La plus importante est
> **NEW-1** : je qualifiais de `derived` les **trois** lignes du partage SExp, alors que
> `maths-sexp.yaml:248` et `maths-sm.yaml:222` déclarent leur bloc `programme`
> **`research-consensus`**. **La conclusion se renforce et le routage change de sens** : la ligne
> la MIEUX sourcée (`:251`, research-consensus) est celle qui argumente **contre** S4 en SExp, et
> la seule qui argumente **pour** est `derived`. §1, §13.2, §10.8. Ensuite : **NEW-2** (la moitié
> R6 du modèle élargi part à zéro item — dette nommée, §8.4, §13.14) · **NEW-4** (la marque de
> filière est portée aux **trois** endroits où le cercle est commandé, pas à un seul) ·
> **NEW-5** (le cercle unité traînait encore dans l'énoncé gelé du §6.1 — un produit conforme
> aurait fait rougir la porte `palette` de la scène elle-même) · **NEW-6** (N6 : **seize** états,
> pas douze) · **NEW-7** (**cinq** checkpoints portent `habilete`, pas deux :
> `checkpoints.yaml:88`, `:156`, `:227`, `:289`, `:352` — la dette déclarée était 2,5 fois trop
> petite) · **NEW-9** (la seule attestation de « théorème de l'angle inscrit » dans la banque,
> `bank.yaml:1064`, vit **dans l'entrée que la scène bannit** — `bk-2024-r-x3`, quatre points
> cocycliques ; et le mécanisme du §4.4 est celui de la **médiane de l'hypoténuse**, un autre
> théorème : la couture est dite en une clause, et la réciproque cesse d'être affirmée) ·
> **NEW-10** (le correctif « un clic » s'étend à `items.yaml:1645`, `:1650`, `:1662`, mêmes trois
> lignes, même lieu, un rung plus loin) · **NEW-11** (les ordinaux « Triangle 1..4 » sont une
> convention de scène sans statut d'examen — `fit_caveat`).
>
> **Les dix MINEURS de pédagogie, appliqués — dont un qui retire une pièce du dépôt.**
> **La clé de registre `libelles` est ABANDONNÉE** au profit de la route **déjà livrée** :
> `PlanComplexePanel.tsx:431-444` fait passer chaque valeur de contrôle par une fonction
> `texte(v)` adossée à une table `id → affichage` du modèle (`M.TEX_POINT`,
> `M.TEX_COEFFICIENT`), et `enClair()` en tire l'`aria-label`. *Motif : la contrainte non
> négociable est que l'élève ne LISE jamais `equilateral` — elle se mesure sur le panneau RENDU,
> et la porte `libelles-de-cran` est indifférente à l'endroit où vit la table. Choisir la route
> livrée retire **un** des deux inconnus de validateur qui bloquaient le chantier (§15.4) et
> n'ajoute aucune pièce. Le prix est réel et déclaré : un libellé devient du CODE, donc
> content-author ne peut plus le changer seul.* §12, §13.16.
> Puis : la consigne de S4 passe de ~110 à ~70 mots et n'ouvre plus sur une objection que
> personne n'a faite (M1) · le retour juste de S2 ne dit plus « bien avant $B$ » pour un report à
> $0{,}87$ de $AB$ (M2) · le motif périmé du cran `equilateral` est refait (M3) · la note (b) du
> §7.5 C décrit le texte qu'elle certifie, et non un texte rêvé (M4) · **les trois qualifications
> immesurables survivantes sont supprimées** — `semblable` *(en position de transformation)*,
> `(r,\theta)` *(en position de couple)*, `y =` *(en position d'équation de droite)* (M5) · les
> deux `suite` à demi confirmées par un retour de leur propre étape sont **reconstruites ou
> déclarées** (M6) · la `suite` de S1 ne represcrit plus le geste que son retour vient de
> prescrire (M7) · les leçons de balayage livrées sont carrées (M9) · et **le fait qu'à S1 la
> bonne réponse ne demande AUCUNE division complexe** — structurel, $\vec{AB}$ étant un monôme à
> tous les placements — est porté au `fit_caveat` et à une question numérotée, avec le correctif
> qui marcherait et son prix (M10).
>
> **Réfuté, avec la preuve — une constatation, et c'est la mienne que je corrige d'abord.** Ma
> réfutation de pédagogie M6 citait `scene-plan.md:26-29` ; **la phrase citée est à `:45-49`**
> (`:26` est le titre du bloc, `:28-32` le point 1, sur `argument-image`), **et les lignes que
> j'ai sautées, `:33-44`, portaient précisément la règle du balayage que BQ-1 vient de me
> reprocher**. Le corollaire que j'ajoutais — « la spec sœur devrait y renvoyer depuis son §6.1 »
> — **est déjà satisfait** : `scene-plan.md:1255-1257` porte le crochet en ligne. *Les deux
> citations sont corrigées au §15.12, et la leçon est écrite là où elle agit : **citer un bloc,
> c'est le lire en entier** (ADR 0031 : une référence croisée est une instruction).* **Ce qui
> reste réfuté sur le fond : la divergence `prefers-reduced-motion` n'existe pas ; les deux
> critiques l'ont concédé.** §15.12.

**Seconde scène de la notion, et seconde scène de maths sans 3D.** Mêmes pièces que la
première (ADR 0041, `"tool": "scene2d"`), même arithmétique exacte, même cadre carré, même
contrat de pari. Ce qui change : **trois points au lieu d'un couple**, un **sommet** depuis
lequel on lit, et — au dernier cran — un **point qui se déplace** et dont la lecture dessine
un lieu.

**Ce que ce document est.** Le cadrage pédagogique complet : le trou **mesuré** qui le
justifie, la frontière officielle, le placement, quatre étapes à pari, les contrôles, l'état,
les lectures avec leur précision, la table de ce qui ne doit pas être à l'écran avant chaque
pari, **un modèle de misconception neuf** avec ses items, et le contrat de porte.

**Ce que ce document n'est pas.** Il n'écrit ni le JSON, ni le TypeScript, ni la prose
finale, ni les items finaux. Le descripteur est de content-author ; le modèle, le rendu, le
panneau et le registre de frontend-builder ; les items d'item-author. Le §4 **décrit** les
paragraphes à écrire ; il ne les rédige pas.

Marqueur : `[[embed:plan-complexe-rapport]]` · clé de registre : `plan-complexe-rapport` ·
sélecteur de porte : `[data-scene="plan-complexe-rapport"]`.

**Numérotation des chapitres.** La convention de la notion est `chapitre N = R(N−1)`, établie
et vérifiée par la spec sœur (trois citations concordantes : `lesson.md:279`, `bank.yaml:312`,
`bank.yaml:1631` où « chapitre 7 » désigne la lecture du rapport). **Donc R6 = chapitre 7**,
et toute prose commandée ici emploie cette numérotation-là, jamais « R6 ». *Réserve inchangée :
`REVIEW-2026-09-11.md:69-80` (S1) démontre que le schéma est appliqué de façon
auto-contradictoire ailleurs ; ce n'est pas à cette spec de le réparer, et elle n'ajoute
aucune citation nouvelle vers un autre rung.*

---

**Chemins que ce document commande et qui n'existent pas encore** (la porte des liens les
exempte un par un) :

    CHEMIN À CRÉER: content/maths/nombres-complexes-2/media/plan-complexe-rapport.json — le descripteur de la scène (content-author)
    CHEMIN À CRÉER: content/maths/nombres-complexes-2/spec-scene-rapport.md — la destination de ce document à la livraison
    CHEMIN À CRÉER: web/src/lib/scene2d/plan-complexe-rapport-modele.ts — le modèle (frontend-builder) : les trois points, le rapport w, les lieux
    CHEMIN À CRÉER: web/src/components/notion/scene/PlanComplexeRapportPanel.tsx — le panneau (frontend-builder)
    CHEMIN À CRÉER: web/scripts/test-plan-complexe-rapport.mjs — le test unitaire du modèle (les formes exactes, les 53 états)
    CHEMIN À CRÉER: web/scripts/scene-plan-complexe-rapport.mjs — la porte de la scène (+ son `--essai-rouge`)
    CHEMIN À CRÉER: content/maths/nombres-complexes-2/media/trois-lieux.svg — la figure de repli des trois lieux (§2.7)
    CHEMIN À CRÉER: content/maths/nombres-complexes-2/media/trois-lieux.stages.json — ses étapes

---

## 0. Le trou, mesuré — et il est réel

**Verdict d'entrée, avant tout dessin : le trou EST réel, et il est plus étroit et plus
précis que « R6 n'a pas de manipulable ».** Il tient en une phrase mesurée :

> **Les quatre objets diagnostiques de R6 posent tous le sommet $A$ à l'origine, ou bien
> donnent $w$ déjà calculé. La soustraction $z_C - z_A$ — le geste qui FABRIQUE le rapport —
> n'est exercée nulle part. Et la banque, elle, ne lit presque jamais à l'origine : elle lit
> au sommet $D$, au sommet $R$, au sommet $M_1$, en un point $M$ variable, et parfois entre
> deux vecteurs qui ne partent même pas du même point.**

> ⚠ **« Les quatre objets diagnostiques de R6 » — le jeu est nommé UNE fois, ici, et il ne
> change plus** *(fidélité, vague 1, M2 : le premier jet en nommait deux jeux différents)*.
> **Ce sont les quatre objets qui portent `rung: "R6"` : NBCOMPLEX2-6, -20, -21, -32**
> (`grep -c 'rung: "R6"' items.yaml` ⇒ 4). Le point d'arrêt `cp-r6-lecture-w`
> (`checkpoints.yaml:287-341`) est un **cinquième** objet de R6 qui ne porte pas de `rung:`
> d'item ; quand il compte, il est nommé à part. *Et NBCOMPLEX2-32 est le cas le plus fort,
> pas le plus faible : `items.yaml:2131-2133` ne contient **aucun rapport** — c'est
> $\vert z-1\vert = \vert z+2i\vert$.*

### 0.1 Les sept faits, chacun avec la commande qui le produit

| # | le fait | la commande / la citation qui le produit |
|---|---|---|
| **a** | **R6 porte QUATRE items sur 41, et UN seul média — une figure gelée.** `ramp_coverage` : R0 3 · R1 4 · R2 5 · R3 4 · R4 4 · **R6 4** · R7 3 — contre **R5 14** depuis la livraison de la scène sœur. | `items.yaml:2786-2794` (`coverage_summary.ramp_coverage`) ; `grep -c 'rung: "R6"' items.yaml` ⇒ **4** (NBCOMPLEX2-6, -20, -21, -32) |
| **b** | **Les deux modèles que R6 sert sont EXACTEMENT au plancher, marge nulle.** `lecture-w-module-argument` : **3** (-6, -20, -21), **tous R6**. `ensemble-points-locus-confondu` : **3** (-24, -32, -33) — dont **un seul est R6** (-32) ; **-24 est R7** (`items.yaml:1599-1600`) et -33 est R4. *Ce n'est donc pas « un modèle de R6 » : c'est un modèle **servi depuis R4 jusqu'à R7**, dont R6 ne porte qu'un tiers* (correction de vague 1, fidélité M4). Treize modèles de la notion sont à 3 ; ces deux-là en font partie, et **tout retrait casse le plancher**. | `items.yaml:2779-2780` ; `:1600` (rung de -24) ; `honest_state` à `:2795-2810` |
| **c** | **LE FAIT CENTRAL — les quatre objets de R6 ne font jamais former le rapport.** NBCOMPLEX2-6 : $z_A=0$, **et $w$ est donné dans l'énoncé** (« *On calcule $\frac{z_C-z_A}{z_B-z_A} = e^{i\pi/3}$* »). NBCOMPLEX2-20 : $z_A=0$, $z_B=1$ — la division est **par $1$** — **et son propre distracteur A imprime $w$** (« *Les points ne sont pas alignés, car $w=-2$ est négatif* ») : un élève qui lit les quatre choix obtient $w$ gratuitement. NBCOMPLEX2-21 : $z_A=0$, **et $w=\frac32 i$ est donné**. NBCOMPLEX2-32 : **aucun rapport du tout** ($\vert z-1\vert = \vert z+2i\vert$). `cp-r6-lecture-w` : **aucun point n'est même cité**, $w$ arrive nu. | `items.yaml:558`, `:1364`, `:1424` (les trois $z_A=0$) ; `items.yaml:560`, `:1426` (les deux $w$ donnés) ; `items.yaml:1370` (la fuite de $w$ — ajoutée en vague 1, fidélité M3) ; `items.yaml:2131-2133` (-32, aucun rapport) ; `checkpoints.yaml:296-298` (aucun affixe) |
| **d** | **La figure de R6 est gelée sur un triangle, et elle est placée APRÈS l'exemple travaillé qui l'a déjà résolu.** Trois étapes, un seul triangle ($z_A=1$, $z_B=1+i$, $z_C=2$, $w=-i$), aucun réglage. | `media/nature-triangle-w.stages.json` (3 légendes, un seul jeu d'affixes) ; `lesson.md:408` (le marqueur, après l'exemple de `:392-406`) |
| **e** | **La banque lit le rapport à un sommet qui n'est PAS l'origine, et le dit en toutes lettres.** « *c'est la lecture du chapitre 7, **ici entre deux vecteurs qui ne partent pas du même point*** » — le corpus nomme lui-même la forme que la leçon ne définit jamais. Relevé des formes lues, **avec les sessions RE-VÉRIFIÉES en vague 1 contre les bornes des dix entrées** : $\frac{b-a}{\omega}$, $\frac{h-a}{b-a}$, $\frac{h}{b-a}$ (**2019 N**) · $\frac{b}{a}$, $\frac{r-p}{q}$ (**2020 N**) · $\frac{p-r}{q-r}$ au sommet $R$ (**2022 N**) · $\frac{z_3-z_1}{z_2-z_1}$ au sommet $M_1$ (**2024 R — session de RATTRAPAGE**) · $\frac{z_1-m}{z_2-m}$ au sommet **variable** $M$ (**2017 N**) · $\frac{p-d}{q-d}$ au sommet $D$ (**2021 N**) · $\frac{p-a}{c-b}$, **sans sommet commun** (**2023 R — session de RATTRAPAGE**) · $\frac{h-a}{b-a}$ au sommet $A$ (**2025 N**). | `bank.yaml:1631` (la citation, dans `bk-2023-r-x2`) ; `:340`, `:353-359`, `:463`, `:511`, `:656`, `:1062-1090`, `:1204`, `:1833`, `:2014-2042`. **Bornes des entrées** (`grep -n "^  - id: bk-"`) : 211 `bk-2019-n-x2` · 385 `bk-2020-n-x3` · 523 `bk-2022-n-x2` · 668 `bk-2024-n-x3` · 831 `bk-2024-r-x3` · 1102 `bk-2021-n-x2` · 1251 `bk-2023-n-x3` · 1400 `bk-2023-r-x2` · 1731 `bk-2025-n-x2` · 1908 `bk-2017-n-x2`. *Le premier jet datait `:1062-1090` de 2017 et `:1631` de 2025 : **deux erreurs d'année, corrigées en vague 1 (fidélité M1)**, et deux des entrées relevées sont des **rattrapages** (`bank.yaml` SCOPE NOTE 3, `:150-151`), ce que le premier jet ne disait pas.* |
| **f** | **Les dix entrées de banque — 100 % des annales vérifiées de la notion — invoquent le chapitre 7.** 38 occurrences de « chapitre 7 », réparties sur **les dix** entrées (aucune n'en est dépourvue). | `grep -c "chapitre 7" bank.yaml` ⇒ **38** ; `grep -n "^  - id: bk-\|chapitre 7" bank.yaml` ⇒ les 10 `bk-` (lignes 211, 385, 523, 668, 831, 1102, 1251, 1400, 1731, 1908) encadrent chacune ≥ 1 occurrence |
| **g** | **Le défaut de R6 est déjà ÉCRIT, deux fois, par la revue de vague 1.** (i) « *La table R6 n'a pas de ligne « lieu », et `cp-ensemble-points` + NBCOMPLEX2-24 testent une méthode introduite pour la première fois DANS le retour d'item — **méthode dans la réponse, l'anti-motif**. Fix : segment R6 qui dérive les deux lieux (réel → droite, imaginaire pur → cercle).* » (ii) « *Le mécanisme central de R6 (Chasles) est expédié sur le mot « précisément » ; la ligne « équilatéral » de la table arrive sans justification en prose.* » | `REVIEW-2026-09-11.md:132-137` (S8) et `:164-167` (D3) ; `:192-195` (D10) |

### 0.2 Ce que la scène sœur a laissé — et l'arbitrage de périmètre, écrit

La spec de R5 (§0.2) a choisi R5 **contre** R6, sur quatre mesures, et a promis la suite
(§13.3) : *« une SECONDE SCÈNE, PRÉVUE ENSUITE […] trois points et le rapport $w$, sur le même
moteur et les mêmes pièces »*. Ce document l'écrit. Trois choses ont changé depuis, et elles
comptent :

1. **R5 est passé de 11 à 14 items ; R6 est resté à 4.** L'écart s'est creusé, il ne s'est pas
   résorbé (fait **a**).
2. **Le modèle `angle-lu-depuis-l-axe` existe maintenant** (`items.yaml:254-270`, 4 items) et
   l'**erreur** se transpose à R6 : lire $\arg(z_C - z_A)$, la direction du côté depuis l'axe
   réel, au lieu de l'**écart** entre les deux côtés ; lire $AC$ au lieu du **quotient**
   $\frac{AC}{AB}$.
   > ⚠ **CORRECTION DE VAGUE 1 (fidélité I2) — le premier jet écrivait « sa
   > `contradicts_principle` est déjà écrite en toute généralité […] la scène le recrute à S2,
   > sans le redéclarer ». C'est FAUX, et c'est exactement le test que le §8.1 applique pour
   > refuser deux autres modèles.** Son texte déclaré est borné à une **transformation** :
   > `items.yaml:258-264` parle de « *M et son **image** M′* », du « *rapport de
   > l'**homothétie*** » ; `:265-270` de « *l'angle d'une **rotation** […] de **centre** Ω* ».
   > Or le §9.2 de cette scène **interdit dans son panneau** `rotation`, `homothétie`, `centre`,
   > `image de M`. **La scène bannissait le vocabulaire dans lequel vit le modèle qu'elle
   > recrute.** → **le modèle doit être ÉLARGI avant d'être recruté**, et l'édit est écrit mot
   > pour mot au **§8.2 bis** ; il est **livrable d'item-author, avant `validate-content`**.
   > *Les quatre items existants (-35, -36, -37, -40) sont tous R5 et restent attachés sous le
   > texte élargi — vérifié.*
3. **La prose de R6 a gagné son raccord** (`lesson.md:367` : « *Ce rapport $w$ n'est pas un
   outil neuf : c'est le coefficient du chapitre 6, lu à l'envers.* ») — commandé par le §4.5
   de la spec sœur, et livré. **La scène n'a donc plus à construire ce pont ; elle le suppose.**

**Trois choses que la charte du §13.3 demandait et que cette scène NE porte PAS.** Écrites ici
plutôt que découvertes en vague 1 :

- **La reconstruction du centre d'une rotation depuis un couple point/image**
  ($\omega = \frac{z'-e^{i\theta}z}{1-e^{i\theta}}$, `bank.yaml:475`, `:1176`). **Refusée, et le
  motif est le même que celui qui a borné la scène sœur : c'est du R5.** La scène de R5 s'est
  interdit R6 par un argument de rang (§0.2, §9.1) ; faire l'inverse ici serait l'erreur
  symétrique. C'est de surcroît un geste **algébrique** — résoudre un point fixe — que la
  manipulation n'éclaire pas. **Reste dû, et c'est de la prose et des items** (§10.9).
  ⚠ **Correction de vague 1 (fidélité I7) : ce refus laissait un `savoir_faire` de cadre
  ORPHELIN entre deux documents.** `maths-sm.yaml:229` nomme « *Caractériser une similitude
  directe (rapport, angle, **centre**)* » ; `REVIEW:100-105` (S4) le mesure à **0/34 items** ;
  la scène sœur **le lui assignait** (`scene-plan.md:2444-2447` : « *elle porterait le
  savoir-faire `bank.yaml:475` / `:1176`* ») ; ce document le **refuse**. Deux documents qui se
  renvoient l'un à l'autre, c'est exactement la façon dont un savoir-faire à 0 % reste à 0 %.
  **Il a désormais un propriétaire nommé et une question numérotée : §13.13.**
- **La cocyclicité de quatre points. Le cadre ne l'autorise pas, et c'est MESURÉ, pas
  supposé.** `bank.yaml:97-118` (SCOPE NOTE 2) : « *L'outil « manuel » habituel pour ce type de
  question est le **birapport** […] un outil qui […] n'est couvert par **AUCUN rung** du corps
  actuel des deux frères-notions.* » Et sa mise à jour (`:120-148`) : quatre entrées en
  dépendent désormais, dont une où *le sujet impose l'outil*. **Une scène ne peut pas ouvrir un
  rung que la notion n'a pas.** La scène ne traite donc **jamais quatre points**, et le mot
  `cocyclique` est une chaîne interdite (§9.1). *Ce qui est dû, c'est un rung « quatre points
  cocycliques », et `bank.yaml:144-148` le dit déjà. §13.10.*
- **Le modèle candidat `centre-lu-sur-b`. Il n'est TOUJOURS pas déclarable, et cette scène n'y
  change rien.** La spec sœur le refusait faute de données de fréquence (§8.3, §15.13). **Ce
  refus tient, et pour la même raison exactement** : aucune entrée de banque de cette notion ne
  demande de caractériser un $z'=az+b$ **donné**. Une scène ne produit pas de données de
  fréquence ; elle ne peut donc pas trancher une question de fréquence. *Prétendre le contraire
  serait déclarer un modèle sur une intuition — ce que la spec sœur a explicitement refusé de
  faire.* **Il reste candidat, et le §13.4 dit ce qui le trancherait vraiment.**

### 0.3 Ce que cette proposition NE referme pas, écrit à côté de ce qu'elle arme (ADR 0035)

- **Le fichier de cadre maths reste une PROPOSITION NON AUTORITATIVE** (`maths-sm.yaml:12-17`,
  `maths-sexp.yaml:10-16` : « STATUT : PROPOSITION — NON AUTORITATIVE », trois portes non
  passées, PDF officiel scanné sans couche texte). **Inchangé depuis la spec sœur, et c'est la
  réserve la plus lourde de ce document aussi.** §1, §13.1.
- **Le champ `habilete` reste absent des 41 items EXISTANTS** (`grep -c habilete items.yaml`
  ⇒ **0**) : le mélange SM 40/40/20 est **incalculable sur le corpus existant**. **NON-VERDICT
  déclaré** (ADR 0034), escaladé par `REVIEW:107` (S5), corpus-wide.
  ⚠ **Correction de vague 1 (fidélité I6) : le non-verdict ne s'étend PAS aux items neufs.**
  Le champ existe déjà dans cette notion — **sur CINQ points d'arrêt, pas deux**
  (`grep -n habilete checkpoints.yaml` ⇒ `:88` `raisonnement`, `:156` `utilisation`, `:227`
  `utilisation`, `:289` `raisonnement`, `:352` `raisonnement`) ; **les quatre items du §8.3 le
  portent donc, au vocabulaire MATHS**
  (`application_directe` / `application_non_explicite` / `synthese_situations_inhabituelles`),
  **pas au vocabulaire PC que les cinq checkpoints emploient** (`REVIEW:109-111` : « *les
  checkpoints maths utilisent `raisonnement`/`utilisation` — le vocabulaire PC — jamais
  « application directe »* »). *Le non-verdict devient ainsi un **plancher mesuré** : 1 directe /
  3 non explicites / 0 synthèse sur les quatre neufs (§8.4). L'incohérence de vocabulaire entre
  ces quatre items et les **cinq** checkpoints de la notion est **réelle, créée ici, et
  déclarée** : elle appartient au correctif corpus-wide de S5, §13.14.*
  ⚠ **Corrigé en seconde passe (fidélité NEW-7) : le premier jet révisé écrivait « les deux
  checkpoints existants » en citant `:289` et `:352`, qui étaient les deux EXEMPLES du critique,
  pas un dénombrement.** Le `grep` en donne **cinq**. *La dette déclarée au §13.14 (a) était donc
  **2,5 fois plus petite que la réalité** — et c'est la faute que ce document punit ailleurs :
  une chose n'est prouvée absente (ou présente en tel nombre) que si l'on a énuméré ses formes
  (ADR 0036). **La règle vaut aussi pour compter ce qui EST là.***
- **Aucun scoping de filière** (`REVIEW:113-120`, S6). La scène ne l'ouvre pas ; elle se borne
  à **déclarer** que son étape 4 est de profondeur SM (§10.8) et à n'écrire nulle part le mot
  que le cadre réserve à SM (§9.3).
- **La linéarisation** (`maths-sm.yaml:223,227`, `REVIEW:82-90`) : hors scène, **reste dû**.
- **Le second degré dans $\mathbb{C}$** : divergence cadre ↔ corpus toujours ouverte
  (`REVIEW:92-98`, spec sœur §13.15), **routée à research-lead**, pas close.
- **La marche en réponse construite** (`REVIEW:201-204`, D13, « la lacune structurelle
  centrale ») : **quatre paris de plus ne la referment pas**, et 45 items QCM non plus.
  **Reste dû, et c'est toujours le plus gros.**
- **Le nommage « Thalès » / « angle inscrit »** (`REVIEW:122-130`, S7, ~15 occurrences en texte
  rendu). ⚠ **Corrigé en vague 1 (fidélité I5) : S7 ne renvoie PAS au propriétaire.** Relu
  verbatim (`REVIEW:127-130`) : « *Recommandation : **aligner sur « angle inscrit » / « cercle
  de diamètre »**, mais faire confirmer la convention marocaine par le **content-author*** ».
  C'est une **direction recommandée** et un **propriétaire nommé**, pas un report. → **la scène
  reste muette** (aucun nom de théorème dans le panneau, §9.1), **mais la prose du §4.4 nomme
  « théorème de l'angle inscrit » une fois**, après le mécanisme, et « **Thalès » reste
  banni** ; et le §4.6 commande l'alignement de `checkpoints.yaml:375-376`, qui envoie
  aujourd'hui l'élève sur « réciproque de Thalès » — le nom que `REVIEW:124-126` dit
  « *univoquement le mauvais* ». **Ce qui reste au propriétaire, c'est la passe corpus-wide sur
  les ~15 occurrences, pas la direction.** §13.3.

---

## 1. Le cadre (la frontière officielle, lue avant tout le reste)

> ⚠ **RÉSERVE DE PROVENANCE, à porter dans tout ce qui descend de ce document.** Les deux
> fichiers de cadre maths portent en en-tête **« STATUT : PROPOSITION — NON AUTORITATIVE »**
> (`maths-sm.yaml:12`, `maths-sexp.yaml:10`) et **aucune de leurs trois portes n'est passée**.
> Les `savoir_faire`, **toutes** les `limites` et **toutes** les `exclusions_transversales` y
> sont marquées `source: derived` — reconstruites, **non vérifiées verbatim**. Je **ne corrige
> pas** et **ne contourne pas** ce fichier (RULES : le cadre est autoritatif, une objection se
> signale). Je **le signale** : *les frontières du §9 sont aussi solides que ce fichier, et pas
> davantage.* **À faire valider par l'humain avant construction** (§13.1).

- **Filière / matière :** **deux** filières — `sciences_mathematiques` (SM-A/SM-B) et
  `sciences_experimentales` / `mathematiques`.
  ⚠ **Les DIX entrées de banque de cette notion sont `filiere: "SM"`** (`bank.yaml:22`).
  *Toute la preuve d'examen citée ici est donc SM ; ce que la scène « prépare » pour un élève
  SExp est **déduit du cadre, jamais mesuré sur des annales**.*
- **Domaine → sous-domaine → chapitre :**
  - **SM** : `algebre_geometrie` → `nombres_complexes` → `complexes_moivre_racines_transformations` (`maths-sm.yaml:193-232`).
  - **SExp** : `algebre_geometrie` → `nombres_complexes` → `complexes_equations_geometrie` (`maths-sexp.yaml:226-258`).
- **Poids :** SM — domaine `algebre_geometrie` **50 %** (`maths-sm.yaml:195`), bloc
  « Complexes + Structures » **≈ 35 %** (`:205`, partage interne `derived`, donc **non
  sourcé**). SExp — sous-domaine `nombres_complexes` **15 %** (`maths-sexp.yaml:228`,
  « ≈ moitié du bloc *Complexes + Probabilités = 30 %* », le 30 % `research-consensus`, le
  partage `derived`).
- **Habiletés (la cible chiffrée de l'item-author, et le nombre que le critique de fidélité
  doit mesurer) :**
  - **SM** (`maths-sm.yaml:39-42`) : **application directe 40 % · application non explicite
    40 % · synthèse en situation inhabituelle 20 %**. *Coefficient 9, 4 h.*
  - **SExp** (`maths-sexp.yaml:40-43`) : **50 % · 35 % · 15 %**. *Coefficient 7 (contesté), 3 h.*
  - **NON-VERDICT DÉCLARÉ SUR LE CORPUS EXISTANT** : le champ `habilete` n'existe sur aucun des
    41 items, donc **le rapport global n'est calculable ni avant ni après cette livraison**
    (§0.3). ⚠ **Mais il devient calculable sur les quatre items neufs, et c'est exigé**
    (vague 1, fidélité I6) : **-43 `application_directe` ; -42, -44, -45
    `application_non_explicite` ; aucun `synthese_situations_inhabituelles`** — soit
    **25 / 75 / 0** contre une cible SM de **40 / 40 / 20**. *Ce n'est plus une impression de
    lecture : c'est un chiffre, et il manque le niveau 3.* §8.3, §8.4, §14.1.
- **`programme` du chapitre, cité entier — et c'est ici que les deux filières DIVERGENT :**
  - SM (`maths-sm.yaml:225`) :
    > « Interprétation géométrique : module/argument comme distance/angle ; transformations
    > […] ; **nature de configurations (triangle, cercle, alignement)**. »
  - SExp (`maths-sexp.yaml:251`) :
    > « **Nature d'une configuration (triangle, alignement) à partir des affixes.** »

  **Le mot « cercle » est dans la ligne SM et ABSENT de la ligne SExp.** C'est la seule
  divergence entre les deux lignes `programme`, et elle tombe exactement sur l'**étape 4**
  (les lieux). **Conséquence portée en dur : S4 est marquée de profondeur SM** (§10.8, §13.2).

  ⚠ **CORRECTION DE VAGUE 1 (fidélité I3) — le premier jet écrivait « c'est la SEULE divergence
  de programme qui morde sur cette scène » et s'arrêtait là. La phrase était littéralement vraie
  (deux lignes `programme`) et trop étroite pour être honnête : une TROISIÈME ligne du
  même fichier parle, et la REVIEW que ce document cite quatre fois la nomme.** Le partage SExp
  se lit donc sur **trois** lignes, **et elles ne disent pas la même chose — ni ne sont sourcées
  de la même façon** :

  | ligne | provenance déclarée, relue à l'en-tête de son bloc | ce qu'elle dit de cette scène | sens |
  |---|---|---|---|
  | `maths-sexp.yaml:251` (`programme`) | **`research-consensus (pdfmath)`** (`maths-sexp.yaml:248`) | « Nature d'une configuration **(triangle, alignement)** » — pas de cercle | **contre** S4 |
  | `maths-sexp.yaml:254` (`savoir_faire`) | **`derived`** (`maths-sexp.yaml:252`) | « Interpréter $\vert z-z'\vert$ et $\arg\!\left(\frac{z-a}{z-b}\right)$ géométriquement » — **exactement** l'objet de S4 | **pour** S4 |
  | `maths-sexp.yaml:328` (`coverage_notes`) | **`derived`** (`maths-sexp.yaml:311`) | « *R4 (racines n-ièmes) et **configurations avancées** relèvent de SM ; **SExp n'utilise que formes trigo/exp, second degré réel, transformations $z'=az+b$**.* » | **contre** S4 — **et, lu à la lettre, contre S1–S3 aussi** |

  ⚠ **CORRECTION DE SECONDE PASSE (fidélité NEW-1) — le premier jet révisé écrivait « trois
  lignes, toutes `derived` », et c'est faux trois fois** (ici, au §10.8 et au §13.2).
  `maths-sexp.yaml:248` coiffe le bloc `programme` de `# source: research-consensus (pdfmath)` ;
  `maths-sm.yaml:222` fait de même pour `:225`. **Seules `:254` et `:328` sont `derived`.**
  *Pourquoi cela compte, et pourquoi la conclusion en sort PLUS forte, pas plus faible :
  l'argument du §13.2 n'est plus « trois lignes également faibles se contredisent » mais **« la
  ligne la mieux sourcée des trois est celle qui argumente CONTRE S4 en SExp, et la seule qui
  argumente POUR est `derived` »**. Le défaut « S4 marquée SM par prudence » est donc soutenu par
  la meilleure source disponible, et non par un partage 2-contre-1 entre pièces équivalentes.*
  **Et c'est le genre d'erreur que ce document ne peut pas se permettre : toute sa méthode est de
  citer la provenance.**

  *Le pointeur existait : `REVIEW-2026-09-11.md:114` (S6) cite « `maths-sexp.yaml:257,305,**328**` ».
  Le premier jet citait S6 au §0.3, au §9.2, au §13.2 et au §10.8 **sans jamais suivre le
  pointeur**.* **Conséquence : le défaut « S4 = SM par prudence » est RENFORCÉ, pas affaibli**
  (deux lignes contre une, dont la mieux sourcée), **et le routage à `research-lead` est plus
  précis : dans un même fichier non autoritatif, une ligne `research-consensus` et une ligne
  `derived` se contredisent sur ce que SExp prend de cette leçon.** **Je ne tranche pas : je
  signale, je marque S4 SM par prudence, et je route** (§13.2).
- **Les `savoir_faire` que chaque étape sert :**
  1. SM (`maths-sm.yaml:229`) « *Caractériser une similitude directe (rapport, angle, centre) ;
     **démontrer une propriété de configuration par les affixes***. » → **S1, S2, S3, S4**
     (la seconde moitié de la ligne, celle que la scène sœur ne servait pas).
  2. SExp (`maths-sexp.yaml:255`) « ***Déterminer la nature d'un triangle, un alignement, à
     partir d'affixes***. » → **S1, S2, S3**. *La spec sœur classait cette ligne « hors scène,
     c'est R6 » (§1.3). La voici servie.*
  3. SExp (`maths-sexp.yaml:254`) « *Interpréter $\arg\!\left(\frac{z-a}{z-b}\right)$
     géométriquement* » → **S4**, sous la réserve ci-dessus.
- **`limites` portées en dur :**
  - SM (`:232`) : « *Pas de similitudes indirectes/antidéplacements approfondis (au-delà de
    z ↦ conjugué) ; pas de géométrie projective.* » → **§9.4**.
    ⚠ *Correction de vague 1 (fidélité M6) : le premier jet citait « `:231-232` » en ne
    reproduisant que `:232`. `maths-sm.yaml:231` est une **autre** limite (« SM va jusqu'aux
    racines n-ièmes générales, aux équations à coefficients COMPLEXES et aux similitudes… »).
    Et il ajoutait « (et `birapport` y est nommé) », ce qui se lit comme si le cadre nommait le
    birapport : **il ne le nomme pas** — seul le §9.4 de ce document le range sous « projectif »,
    et c'est `bank.yaml:97-118` qui porte le constat, pas le cadre. Le §9.1 l'écrivait déjà
    correctement (« Ne vient pas d'une `limite` mais d'un constat mesuré du corpus ») ; le §1
    s'aligne dessus.*
  - SExp (`:257-258`) : « *RACINES n-ièmes générales […] : HORS cœur SExp* » → **§9.5** ;
    « *Similitudes/compositions […] : plutôt SM.* » → **§9.3**.
- **`exclusions_transversales`** (niveau FICHIER, pas sous-domaine — **7 entrées SM
  `maths-sm.yaml:340-347`, 8 SExp `maths-sexp.yaml:300-308`, toutes `derived — À VALIDER`**).
  **Trois mordent ici**, portées au §9 :
  1. `maths-sexp.yaml:305` — racines n-ièmes / $z^n=a$ : **SPÉCIFIQUE SM** → §9.5.
  2. `maths-sexp.yaml:302` + `maths-sm.yaml:343` — structures algébriques, espaces vectoriels,
     réduction d'endomorphismes → §9.6.
  3. `maths-sexp.yaml:306` — produit mixte / **déterminant** → §9.6.

  *Réserve inchangée depuis la spec sœur : **aucune exclusion propre au sous-domaine
  `nombres_complexes` n'existe** — la granularité diffère de `pc-physique-chimie.yaml`, qui en
  porte par sous-domaine. §13.1.*
- **La frontière qui mord le plus fort est INTERNE.** La scène est en tête de **R6
  (chapitre 7)**. À cet endroit l'élève a lu R0 à R5 — **y compris la scène sœur et toute la
  prose de R5** : le rapport $|c|$, l'angle comme **écart**, le centre comme **point fixe**, et
  $z'=az+b$. Il n'a lu **ni** $w$, **ni** la table des configurations, **ni** un seul mot sur
  les lieux. **La scène peut poser les questions de R6** (elle vient avant la prose qui
  explique, ADR 0041 §6) ; **elle ne peut pas entrer dans R7**, ni rouvrir le vocabulaire de
  transformation de R5 dans son panneau (§9.2).

---

## 2. Pourquoi un manipulable — et ce qu'aucun média existant ne fait

### 2.1 Ce que R6 possède, mesuré

| média | ce qu'il montre | ce qu'il ne peut pas faire |
|---|---|---|
| `nature-triangle-w` (3 étapes) | **le seul média de R6.** Un triangle, $A(1)$, $B(1+i)$, $C(2)$ ; les deux vecteurs $\vec{AB}$ et $\vec{AC}$ ; $w=-i$, donc $\vert w\vert=1$ et $\arg(w)=-\frac{\pi}{2}$ | **un seul triangle, un seul sommet, une seule position.** Aucun réglage. Elle ne peut montrer ni qu'on change de sommet, ni qu'on déplace la figure, ni ce qui arrive quand le point de lecture **bouge** |
| `plan-complexe-transformation` (scène R5) | le manipulable livré : coefficient, point, centre, écriture | **il s'interdit explicitement $w$** (sa §9.1 : `w =`, `z_C`, `triangle`, `isocèle`, `aligné`, `cocyclique` sont des chaînes interdites dans son panneau) |
| `racines-unite.interactive.json` (R4) | un curseur sur $n$ | autre rung, autre objet ; **et le cadre SExp l'exclut** (`maths-sexp.yaml:257`) |

**Le constat, exact : R6 n'a aucun réglage. Le seul geste que l'élève peut faire dans ce rung
est de cliquer sur une figure à trois étapes fixes.**

### 2.2 Le motif central : le rapport se lit DEPUIS un point, et ce point n'est presque jamais l'origine

Le point que la scène existe pour installer, en une phrase :

> $w$ ne se lit pas sur les **affixes** : il se lit sur les deux **vecteurs** issus du sommet.
> Son **module** est un **quotient de longueurs** ($\frac{AC}{AB}$), jamais une longueur ; son
> **argument** est un **écart de directions** (l'angle en $A$), jamais la direction d'un côté.
> Déplacer la figure ne change rien à $w$ — c'est une lecture de **forme**. Changer de
> **sommet**, si.

**Trois raisons mesurées pour lesquelles aucune figure ne peut le montrer.**

1. **« Le sommet compte » est invisible tant que le sommet est en $O$.** Or il l'est dans les
   quatre objets diagnostiques de R6 (fait **c**), où $z_C - z_A$ **vaut** $z_C$. Un élève peut
   réussir les quatre en divisant les affixes — et se casser sur la première question de bac,
   qui lit au sommet $D$ (`bank.yaml:1204`) ou au sommet $R$ (`:656`). **Pour que la différence
   existe, il faut pouvoir DÉPLACER la figure hors de l'origine, et y revenir.** Aucune figure
   ne le fait.
2. **« Le module est un quotient » ne se voit pas sur un exemple où il vaut $1$.** La figure de
   R6 est exactement ce cas ($w=-i$, $|w|=1$) : $AC$ et $AB$ y sont égales, donc le quotient et
   les deux longueurs sont indiscernables. **Il faut un triangle où $AC \ne AB$**, et pouvoir
   passer de l'un à l'autre. La notion n'en dessine aucun.
3. **« Un lieu de points » est une NON-observation sur une figure.** On ne peut pas dessiner
   « l'ensemble des $M$ tels que… » : il faut **essayer plusieurs $M$** et voir lesquels
   passent. C'est exactement le geste que `orbite-geostationnaire` a rendu, et qu'aucune figure
   plane ne porte — **et c'est la méthode que `REVIEW:132-137` (S8) reproche au corpus
   d'enseigner *dans un retour d'item*.**

### 2.3 L'antidote obligatoire : une chaîne construite en QUATRE temps

$w = \dfrac{z_C-z_A}{z_B-z_A}$ contient trois réponses (le sommet, les deux lectures, la
nature) et en ouvre une quatrième (le lieu). Un retour trop bavard les donne toutes d'un coup.
Même discipline qu'au banc de diffraction et qu'à la scène sœur (règle `formule-graduee`) :
**la frontière se pose ÉTAPE PAR ÉTAPE, consigne ET retours ET lectures.**

- **S1** établit que le rapport se forme sur les **vecteurs**, donc **depuis un sommet**. Aucun
  module, aucun argument, aucun angle, aucun nom de configuration.
- **S2** ajoute les **deux lectures** : $|w| = \frac{AC}{AB}$ (un quotient) et $\arg(w)$ =
  l'angle **en $A$** (un écart). Il ne peut nommer aucune configuration.
- **S3** ajoute la **table** *et le fait qu'elle s'indexe par le sommet* : le contrôle `sommet`
  devient réglable, et le pari porte sur **depuis quel sommet** une ligne s'allume. Il ne peut
  pas parler d'ensemble de points.
- **S4** ajoute le **point qui bouge** et **un** lieu parié — module $1$ ⟹ médiatrice ; *les
  deux autres (imaginaire pur ⟹ cercle de diamètre, réel ⟹ droite) sont portés par la **prose**
  du §4.4, pas par un second pari* (vague 1, pédagogie I7).

**Contrainte non négociable et mesurable : la table du §7.5 C est la SEULE autorité ;** ce
résumé en est une paraphrase et ne doit jamais la contredire. La porte lit le `textContent`
**rendu**, en remplaçant chaque `.katex` par son **annotation TeX** (leçon du banc
d'électrolyse), en début de mot et en Unicode (leçon des noyaux).

### 2.4 Ce que le bac demande, et que le corpus ne fait pas faire

| geste | où le bac le demande | ce que le corpus en fait |
|---|---|---|
| **Former le rapport à un sommet $\neq O$** | `bank.yaml:1204` (sommet $D$), `:656` (sommet $R$), `:1090` (sommet $M_1$), `:2014` (sommet $M$, **variable**), `:1833` (sommet $A$) | **0/4** : les quatre objets de R6 posent $z_A=0$ ou donnent $w$ (fait **c**) |
| **Lire un rapport entre deux vecteurs SANS sommet commun** | `bank.yaml:1631` (« *ici entre deux vecteurs qui ne partent pas du même point* »), `:340`, `:511`, `:2016` | **0 ligne de prose**. La leçon ne définit $w$ qu'au sommet commun (`lesson.md:369-377`) |
| **Identifier un ENSEMBLE de points depuis une condition sur un rapport** | `bank.yaml:2028-2047` (**2017 N**, q. finale), `:810-816` (**2024 N** — *corrigé en vague 1, le premier jet écrivait « 2023 »*) | **enseigné nulle part** : la méthode paraît pour la première fois dans un retour d'item (`REVIEW:132-137`, S8 ; `checkpoints.yaml:372-376`) |

### 2.5 Ce que la scène ne double pas

- **`plan-complexe-transformation` (R5)** : son objet est $z \mapsto cz$ et $z'=az+b$ ; son §9.1
  **s'interdit nommément** $w$, `z_C`, `triangle`, `isocèle`, `aligné`, `cocyclique`. **Zéro
  recouvrement, et la frontière a été posée par elle, pas par moi.** La réciproque est écrite
  au §9.2 de ce document : **cette scène s'interdit `rotation`, `homothétie`, `centre`,
  `point fixe`, $\omega$, $z'=az+b$ dans son panneau.** Les deux frontières se ferment l'une
  l'autre.
- **`nature-triangle-w`** : un triangle gelé, **placé après l'exemple travaillé**. La scène est
  **avant** toute prose (§3). Elle le remplacera comme objet de travail ; la figure **reste**
  comme repli sans JavaScript (§2.7, §12).
- **`racines-unite.interactive.json`, les huit scènes Manim, les trois scènes 3D de maths** :
  autres rungs, autres objets, voie « explication après coup ». Aucun recouvrement.

### 2.6 Trois idées volontairement écartées

- **La cocyclicité de quatre points, ÉCARTÉE par le CADRE, pas par le goût.** `bank.yaml:97-148`
  : le birapport « *n'est couvert par AUCUN rung* ». **Chaînes interdites au §9.1**, et la
  dette est routée telle quelle (§13.10). *C'est le seul endroit de ce document où j'écarte
  quelque chose que la banque demande quatre fois.*
- **Trois points librement déplaçables à la souris, ÉCARTÉE.** Même motif qu'à la scène sœur
  (§2.6) : avec des affixes quelconques, **aucune lecture n'est exacte** — $\arg(w)$ devient un
  décimal, et la scène écrirait « $0{,}52$ rad » là où le bac écrit $\frac{\pi}{6}$. **Quatre
  formes, quatre placements, trois sommets, cinq positions de $M$** — tous choisis pour que
  **tout nombre affiché soit exact** (§5.4). *L'exception est le **balayage** de S4, muet,
  hérité de S3 de la scène sœur (§6.1).* §13.9.
- **Une animation du triangle qui se déforme, ÉCARTÉE.** `temps: false`, `course: false` : la
  nature se **lit**, elle ne se **parcourt** pas. *Motif : le mouvement n'est jamais une raison
  en soi (ADR 0041 §1).*

### 2.7 Les appels média, avec leur `type` et leur `tool` (taxonomie ADR 0017)

**Trois appels, et trois seulement. Chacun porte les deux champs obligatoires.**

| # | ce que c'est | `type` | `tool` |
|---|---|---|---|
| **M1** | **La scène elle-même** — trois points, le sommet réglable, le rapport, les lieux | `manipulable` | `geogebra/desmos/falstad/phet` *(taxonomie ADR 0017)* — **réalisé en dépôt comme `"tool": "scene2d"`** |
| **M2** | **La figure de repli des trois lieux** (`trois-lieux.svg` + `.stages.json`) : $A$, $B$, un $M$ sur chacun des trois lieux, les trois courbes, les trois conditions en KaTeX | `structural-diagram` | `svg+katex` |
| **M3** | *(aucun)* | — | — |

> ⚠ **Divergence de taxonomie, déclarée et non tranchée par moi.** ADR 0017 range un
> `manipulable` sous `tool: geogebra/desmos/falstad/phet` — « *embed, don't rebuild* ». **Le
> dépôt a décidé l'inverse pour cette famille** : ADR 0041 crée `"tool": "scene2d"` /
> `"scene3d"`, des scènes construites en dépôt, et **quatorze scènes sont livrées sous ce
> régime**, dont la scène sœur de celle-ci. **Je ne réarbitre pas ADR 0041 ; je note que les
> deux documents ne disent pas la même chose, et je dis pourquoi le dépôt a raison ICI** : un
> embed GeoGebra ne peut tenir ni l'arithmétique exacte en $\mathbb{Q}(\sqrt3)[i]$ (§5.4), ni
> le contrat « rien de la réponse dans le DOM avant le pari » (§7.5), qui sont les deux
> propriétés qui font la valeur pédagogique de cette scène. *Si l'on veut réconcilier les deux
> ADR, c'est une passe de documentation, pas une décision de scène.* **§13.11.**
>
> **Pourquoi PAS `atmospheric-illustration` / `gemini` :** rien ici n'est une ambiance ; tout
> est structure et étiquette exacte — précisément ce que les essais média ont montré que Gemini
> ne sait pas rendre. **Pourquoi PAS `motion` / `manim` :** rien ne bouge sans la main ; le seul
> continuum est un balayage tenu par l'élève (§6.1), pas une animation.

---

## 3. Placement

**En tête de `## R6 — Configurations : la nature d'un triangle, l'alignement`**
(`lesson.md:363`), entre le titre et `### Le rapport qui encode toute la forme d'un triangle`
(`lesson.md:365`).

Ligne exacte à insérer (seule sur sa ligne, comme l'exige `MARKER_LINE`) :

```
[[embed:plan-complexe-rapport]]
```

précédée du paragraphe d'annonce du §4.1.

**Pourquoi là** (ADR 0041 §6 : *la scène vient AVANT la prose qui explique*). Vérification
étape par étape contre **tout** ce qui est lu au marqueur — prose `lesson.md:1-363` (R0 à R5,
**titre de R6 compris**), retours de `cp-r0-predict`, `cp-r4-racines`, `cp-r5-ecriture`, **et
les quatre étapes de la scène sœur** :

| étape | ce qui répondrait | où | déjà lu au marqueur ? |
|---|---|---|---|
| **S1** — le rapport se forme sur les **vecteurs**, depuis le sommet | `lesson.md:373` (« *Le numérateur $z_C-z_A$ est l'affixe du vecteur $\vec{AC}$…* ») ; et R5 a posé $z'-z_A = c(z-z_A)$ (`:291`) et le point fixe | `:373` **APRÈS** ; R5 **AVANT**, mais **sur une transformation, pas sur une configuration** | ⚠ **dérivable, non écrit — coût déclaré ci-dessous** |
| **S2** — $\vert w\vert$ quotient, $\arg(w)$ écart | `lesson.md:375` **APRÈS** ; la règle du quotient est à `:175` (R3) et l'écart à `:347` (R5, second exemple travaillé) | R3 et R5 **AVANT** | ⚠ **la règle est lue ; sa LECTURE SUR UN TRIANGLE ne l'est pas** |
| **S3** — la table des configurations, **et son indexation par le sommet** | la table : `lesson.md:379-388`. **L'indexation par le sommet : NULLE PART** — ni la table, ni l'exemple travaillé (`:392-406`), ni la figure gelée, ni aucun des quatre objets de R6 ne lisent deux fois le même triangle | la table **R6, APRÈS** ; l'indexation, **jamais** | ❌ non — *et pour l'indexation, la réponse est ❌ dans toute la notion* |
| **S4** — **un** lieu (le module) ; les deux autres en prose (§4.4) | **nulle part dans la notion** (`REVIEW:132-137`, S8 : la méthode paraît pour la première fois dans un retour d'item, à R7) | — | ❌ **non** |

**Le coût résiduel, déclaré.** **Le titre de R6 nomme deux des quatre lignes de la table** —
« *la nature d'un triangle, l'alignement* ». C'est le même défaut que le titre de R5 (spec
sœur §13.13), et la même réponse : **je ne le retire pas** (renommer un titre de rung dépasse
cette spec), **je le déclare**, et **je commande une alternative** à content-author : un titre
en forme de question, par exemple « *R6 — Que sait-on d'un triangle rien qu'en divisant deux
affixes ?* ». *Si le titre ne change pas, S3 perd une partie de sa force : un élève qui lit le
titre sait qu'il est question d'alignement. **Ce qu'il ne sait toujours pas, c'est laquelle des
deux lectures décide de quoi** — et c'est ce que S2 et S3 font choisir.* **§13.5.**

**Deux tensions réelles, écrites plutôt que maquillées.**

1. **S1 et S2 sont DÉRIVABLES de R3 et de R5, et c'est assumé.** Un élève qui a fait la scène
   sœur sait déjà qu'un angle est un écart et qu'un rapport est un quotient. **Ce que S1 et S2
   attrapent, ce n'est pas la règle : c'est ce que le corpus de R6 encourage sans le vouloir**
   — quatre objets diagnostiques où $z_A = 0$ (fait **c**) et une figure où $|w|=1$ (fait
   **d**). *La scène sœur a payé exactement ce prix à ses S1/S2, et elle avait raison.*
2. **S4 pose une question qu'aucun paragraphe ne pose.** C'est le même écart de phase que S5 de
   la scène sœur, **et il se paie de la même façon : la scène ne part qu'accompagnée de la
   prose du §4.4**, le segment R6 sur les lieux que `REVIEW:132-137` (S8) et `REVIEW:164-167`
   (D3) réclament déjà. **Sans ce segment, S4 est l'anti-motif « méthode dans la réponse »
   déplacé d'un cran, et je ne le livrerai pas ainsi.**
   ⚠ **Et cette clause s'est ALOURDIE en vague 1 (pédagogie I7).** S4 ne parie plus qu'**un**
   lieu (celui du module) ; **les deux autres — imaginaire pur ⟹ cercle de diamètre, réel ⟹
   droite — ne sont plus portés par une `suite` de comptage, ils sont portés uniquement par le
   §4.4.** *Le premier jet donnait à S4 un pari et trois idées ; il en a désormais une. **Le
   prix : sans le §4.4, ce ne sont plus « les trois lieux » qui manquent à l'élève, ce sont deux
   d'entre eux entièrement.*** **C'est la raison la plus forte de ne pas livrer la scène sans sa
   prose, et le §14.6 la tient.**

**Ce que le placement NE fait pas.** `cp-r6-lecture-w` reste où il est (`lesson.md:410`) et
**ses quatre choix ne changent pas** ; `cp-ensemble-points` reste à R7 (`:423`). Le §4.6 leur
commande une phrase de cadrage et une reprise — la même dette que `REVIEW:196-198` (D11) a
relevée pour R4/R5/R6.

---

## 4. La prose à écrire — CAHIER DES CHARGES pour content-author

*Le §4 décrit ; il ne rédige pas. Toute prose commandée ici emploie la numérotation
« chapitre N » (**R6 = chapitre 7**), la voix du reste de la notion, et n'introduit **aucune**
citation « chapitre N » nouvelle vers un autre rung (`REVIEW:69-80`, S1).*

### 4.1 Le paragraphe d'annonce — AVANT le marqueur

**Emplacement :** juste après le titre `## R6` (`lesson.md:363`), avant le marqueur.
**Longueur : 60 à 85 mots. Ton : neutre, il n'annonce aucune réponse.**

Il doit : **(a) — AJOUTÉ EN VAGUE 1 (pédagogie I13) — s'OUVRIR sur un crochet en forme de
QUESTION, qui ne nomme aucune ligne de la table** : par exemple « *Un seul nombre peut-il
décider de la forme d'un triangle ?* ». *Motif : le marqueur se pose à `lesson.md:363`, donc
**avant** l'unique phrase de ce rung qui donne une raison d'y tenir (`:367`, « c'est le
coefficient du chapitre 6, lu à l'envers ») — et le (c) ci-dessous interdit de la recopier.
Sans crochet, l'élève entre dans quatre paris sans une seule réponse à « pourquoi voudrait-on
ce nombre ? ». VISION : « *It opens by making the student care* » ; NOTION-TEMPLATE-V2 §D.*
(b) rappeler d'où l'on vient — au chapitre 6, on **connaissait** le coefficient et on cherchait
l'image ; ici on **connaît les points** et on cherche ce que leur rapport dit ;
(c) dire qu'on va d'abord **essayer** ; (d) **ne nommer ni « isocèle », ni « équilatéral », ni
« rectangle », ni « aligné », ni « ensemble de points » comme des résultats** ; et **(e) — la
clause non négociable, reprise de la scène sœur §4.1 — dire à l'élève, en une phrase, que *ce
qu'il va essayer ne démontre rien*** : quelques triangles bien choisis ne prouvent aucune règle,
et la démonstration est le paragraphe qui suit.

*Il ne doit PAS reprendre la phrase de raccord déjà écrite à `lesson.md:367` (« *c'est le
coefficient du chapitre 6, lu à l'envers* ») : elle reste où elle est, en tête de la prose qui
explique. **Interdit :** toute phrase de la forme « tu verras que… ». **Le crochet (a) est une
QUESTION, pas une annonce** : il ne doit contenir ni « on va montrer », ni un nom de
configuration.*

> **Une alternative, si content-author la juge meilleure, et elle est explicitement
> autorisée :** déplacer la phrase de raccord de `lesson.md:367` **au-dessus** du marqueur et la
> reformuler autrement dans la prose. *Coût : une ligne de `lesson.md` en dehors du périmètre de
> cette scène ; gain : le crochet est alors la raison du chapitre, pas une question d'auteur.*
> **Je ne tranche pas ; les deux respectent le (d).**

### 4.2 Le marqueur

Seul sur sa ligne : `[[embed:plan-complexe-rapport]]`.

### 4.3 Le mécanisme de R6, à écrire pour de bon (APRÈS le marqueur)

**Motif : `REVIEW:192-195` (D10) — « *le mécanisme central de R6 (Chasles) est expédié sur le
mot « précisément » ; la ligne « équilatéral » de la table arrive sans justification en prose,
elle vit dans un retour d'item*. »** Deux réparations, dans le paragraphe existant
`lesson.md:373-377` et la table `:381-386` :

1. **Le « précisément » de `lesson.md:377` devient deux lignes de mécanisme** (40 à 70 mots) :
   $\arg(w) = \arg(z_C-z_A) - \arg(z_B-z_A)$ est la **différence de deux directions** ; une
   différence de directions **est** l'angle orienté $(\vec{AB}, \vec{AC})$ — c'est exactement
   ce que le chapitre 6 a établi pour l'angle d'une transformation, relu ici entre deux côtés
   d'un triangle. *Écrire le pourquoi, pas l'affirmer.*
2. **La ligne « équilatéral » de la table gagne sa justification en prose** (30 à 50 mots),
   sortie du retour d'item `items.yaml:589-596` : un triangle **isocèle en $A$** dont l'angle
   **au sommet $A$** vaut $\frac{\pi}{3}$ a ses deux autres angles égaux à
   $\frac{\pi - \pi/3}{2} = \frac{\pi}{3}$ : les trois valent $\frac{\pi}{3}$.
   *Cette réparation est **plus urgente qu'avant** : depuis la vague 1, aucun pari de la scène
   ne conclut « équilatéral » (§7.3, correctif B4), donc **la prose est le seul endroit où cette
   ligne est justifiée**.*
   **Et la table doit écrire $\pm\frac{\pi}{3}$** — mais **le motif du premier jet était faux et
   il est refait** (vague 1, fidélité I1) :
   > ⛔ **Motif RETIRÉ** : « *parce que la banque lit $-\frac{\pi}{3}$ (`bank.yaml:664`) et que
   > la scène le montre au sommet $B$* ». C'était comparer deux signes obtenus sous **deux
   > ordres de lecture différents** : `bank.yaml:656` isole $\frac{p-r}{q-r}$ au sommet $R$,
   > c'est-à-dire l'ordre **inverse** de celui que la scène génère (§5.2 C). Un signe n'est pas
   > comparable d'un ordre à l'autre.
   > ✅ **Motif RETENU, et il ne dépend d'aucune convention** : un triangle équilatéral **est**
   > équilatéral dans les deux orientations. L'angle au sommet vaut $+\frac{\pi}{3}$ si les
   > sommets sont nommés dans le sens direct et $-\frac{\pi}{3}$ dans le sens indirect ; l'énoncé
   > d'un sujet ne promet ni l'un ni l'autre. **La table écrit donc $\pm$ parce que la
   > CONCLUSION est invariante par changement d'orientation — et la banque en donne l'exemple à
   > `bank.yaml:664`, avec un moins.** *À écrire en une phrase, pas en note de bas de page :
   > c'est le genre de $\pm$ qu'un élève prend pour une coquille.*
3. **AJOUTÉ EN VAGUE 1 (pédagogie I4) — la phrase qui FERME la recherche de S1** (25 à 40 mots,
   dans le même paragraphe `lesson.md:373-377`). **Motif : le descripteur n'a aucun champ de
   réponse** (vérifié sur le JSON livré de la scène sœur) ; la `suite` de S1 envoie l'élève
   chercher l'unique placement où « diviser les affixes » tombe juste, **et rien, ni dans la
   scène ni dans la prose, ne lui dit s'il l'a trouvé.** Pour un élève en difficulté, une
   recherche non close n'est pas un exercice : c'est un piège. **La phrase à écrire est déjà
   rédigée dans la déclaration du modèle neuf** (§8.2) : *« L'erreur est invisible quand
   $z_A = 0$ — cas où $z_C - z_A$ vaut exactement $z_C$ — et c'est précisément le cas de tous les
   exemples habituels. »* **Contrainte : elle s'écrit comme un avertissement sur les exemples
   habituels, jamais comme le corrigé d'un exercice de la scène.**

### 4.4 Une sous-section neuve — « Des points qui vérifient une condition : trois lieux à ne pas confondre »

**C'est la contrepartie obligatoire de S4** (§3, tension 2), et elle solde un défaut écrit deux
fois (`REVIEW:132-137` S8 ; `:164-167` D3). **Emplacement : après l'exemple travaillé de R6
(`lesson.md:406`), avant `[[figure:nature-triangle-w]]`. Longueur : 160 à 230 mots.**

Elle doit établir, dans cet ordre et **en montrant le mécanisme** :

1. On change de question : jusqu'ici les trois points étaient **donnés** ; maintenant $A$ et
   $B$ sont fixes et **$M$ est l'inconnue**. Le rapport devient
   $u = \dfrac{z - z_A}{z - z_B}$, et on le lit **au sommet $M$** : $|u| = \dfrac{MA}{MB}$ et
   $\arg(u) = (\vec{MB}, \vec{MA})$, l'angle **en $M$**.
   ⚠ **CETTE LECTURE SE DÉRIVE, ELLE NE S'AFFIRME PAS (vague 1, pédagogie I8) — et c'est
   exactement là qu'un élève qui a pris S1 au sérieux se perd.** S1 lui a enseigné : *les deux
   flèches partent toutes les deux du sommet*. Or $z - z_A$ et $z - z_B$ sont les affixes de
   $\vec{AM}$ et $\vec{BM}$, qui **arrivent** en $M$. **La phrase qui manque, et qui tient en
   une ligne : retourner les deux flèches, c'est passer de $\vec{AM}, \vec{BM}$ à
   $\vec{MA}, \vec{MB}$ — ce qui multiplie les deux affixes par $-1$, donc ajoute $\pi$ aux deux
   directions et laisse les deux longueurs inchangées. L'ÉCART des directions, lui, ne bouge
   pas, et le QUOTIENT des longueurs non plus : $\dfrac{z_A - z}{z_B - z} = \dfrac{z-z_A}{z-z_B}
   = u$.** *Le même nombre, lu au sommet $M$.*
2. **$|u| = 1$** ⟺ $MA = MB$ ⟺ **$M$ est sur la médiatrice de $[AB]$**. *Le pourquoi : un
   quotient vaut $1$ exactement quand les deux longueurs sont égales — rien de plus.*
3. **$u$ réel** ⟺ l'angle en $M$ vaut $0$ ou $\pi$ ⟺ **$M$ est sur la droite $(AB)$** (privée
   de $A$ et $B$).
4. **$u$ imaginaire pur** ⟺ l'angle en $M$ vaut $\pm\frac{\pi}{2}$ ⟺ **$M$ voit $[AB]$ sous un
   angle droit** ⟺ **$M$ est sur le cercle de diamètre $[AB]$** (privé de $A$ et $B$).
   ⚠ **LE MÉCANISME, ÉCRIT — c'est le seul endroit neuf de cette sous-section, et le premier jet
   s'y contentait de répéter le quoi** (« *un angle droit en $M$ place $M$ sur le cercle de
   diamètre $[AB]$, et réciproquement* » — une assertion, pas une raison ; **exactement le
   défaut que `REVIEW:192-195` (D10) reproche déjà à R6**, reproduit dans le correctif censé le
   fermer). **Vague 1, pédagogie I9 — l'argument à écrire, et il est dans le cadre, sans aucun
   nom de théorème :** soit $O$ le **milieu de $[AB]$**. Si le triangle $AMB$ est rectangle en
   $M$, alors **la médiane issue de l'angle droit vaut la moitié de l'hypoténuse** (géométrie du
   collège) : $OM = \dfrac{AB}{2} = OA = OB$. Les trois points $A$, $B$, $M$ sont donc à la même
   distance de $O$ : **$M$ est sur le cercle de centre $O$ et de rayon $\frac{AB}{2}$,
   c'est-à-dire le cercle de diamètre $[AB]$.**
   ⚠ **LA RÉCIPROQUE S'ÉCRIT, ELLE NE SE « LIT PAS DANS LE MÊME SENS » (seconde passe, fidélité
   NEW-9).** Le premier jet révisé finissait par « *et la réciproque se lit dans le même sens* »
   — **une assertion, dans le paragraphe même qui existe pour cesser d'asserter.** Elle tient en
   une ligne de plus, sur les mêmes trois égalités lues à l'envers : *si $M$ est sur ce cercle,
   alors $OM = OA = OB$, donc la médiane $[OM]$ du triangle $AMB$ vaut la moitié du côté $[AB]$
   — et un triangle dont une médiane vaut la moitié du côté qu'elle joint est rectangle au
   sommet d'où elle part.* **Les deux sens, trois égalités chacun, aucune formule.**
   ⚠ **ET LA COUTURE ENTRE LE MÉCANISME ET LE NOM DOIT ÊTRE DITE, EN UNE CLAUSE (seconde passe,
   fidélité NEW-9).** Ce qui est démontré ici est la propriété de la **médiane de
   l'hypoténuse** ; le nom donné au point 6 est celui d'une propriété **plus générale** (un angle
   inscrit dans un demi-cercle est droit). **Les deux sont dans le cadre, et ce sont deux énoncés
   différents** : content-author écrit donc, au point 6, que le nom désigne le cas général et que
   ce qui vient d'être démontré en est le cas particulier — *pas que la démonstration s'appelle
   ainsi.* **Sans cette clause, la prose fait exactement ce que `REVIEW:122-130` reproche au
   corpus : coller un nom de théorème sur l'énoncé du voisin.**
   *Trois égalités, aucune formule, aucun nom : c'est le mécanisme, pas le mot.*
   ⚠ **MARQUE DE FILIÈRE, sur le précédent livré (vague 1, fidélité I4).** Ce point 4 est le
   **seul** élément contesté entre les deux filières (le mot « cercle » est dans
   `maths-sm.yaml:225` et absent de `maths-sexp.yaml:251`). **La prose le marque en clair, une
   fois, comme R5 le fait déjà** : `lesson.md:327` écrit « *En filière Sciences Mathématiques,
   cette transformation porte un nom : une **similitude directe**…* » (décision de la scène
   sœur, §4.4). Ici : une clause du même type, **portant sur le cercle seulement**, du genre
   « *Cette troisième lecture — celle du cercle — est au programme de la filière Sciences
   Mathématiques.* » *Motif de l'asymétrie, repris mot pour mot de `scene-plan.md:2052-2055` :
   **la prose peut porter une marque de filière en clair ; un panneau servi aux deux filières,
   sans métadonnée `filiere` nulle part dans le corpus (`REVIEW:113-120`), ne le peut pas.**
   Le panneau reste donc non marqué.* **C'est ce qui transforme une revendication de métadonnée
   que personne ne lit (§10.8) en quelque chose que l'élève lit vraiment.**
5. **Une phrase d'exclusion :** $M = A$ et $M = B$ sont écartés (le rapport n'y est pas défini,
   ou vaut $0$).
6. **UNE SEULE fois, et APRÈS le mécanisme du point 4 : le nom — avec sa couture.** « *Cette
   propriété a un nom dans tes cours de géométrie : le **théorème de l'angle inscrit**, qui dit
   qu'un angle inscrit dans un demi-cercle est droit. Ce que tu viens de démontrer en est le cas
   particulier, obtenu avec la seule médiane. Le nom ne change rien à la démonstration.* »
   ⚠ **Et la seule attestation de ce nom dans la banque est ailleurs que là où on croit**
   *(seconde passe, fidélité NEW-9)*. `bank.yaml:1064` écrit bien « *C'est exactement le
   **théorème de l'angle inscrit**, en angles orientés modulo $\pi$* » — **mais cette ligne vit
   dans `bk-2024-r-x3`** (l'entrée court de `:831` à `:1101`), **c'est-à-dire l'exercice à
   QUATRE points cocycliques que le §9.1 bannit.** *Le seul endroit où le corpus emploie le bon
   nom est le seul exercice que la scène s'interdit. Ce n'est pas une raison de changer de nom —
   `REVIEW:124-130` tranche la direction — mais c'est une attestation FAIBLE, et elle doit être
   écrite à côté de la décision plutôt que suggérer un usage courant.* **Aucune autre entrée de
   banque ne nomme l'angle inscrit ; douze lignes nomment Thalès.** §13.3.

⚠ **CONTRAINTE DE NOMMAGE — RETOURNÉE EN VAGUE 1 (fidélité I5), et voici le motif.** Le premier
jet interdisait les trois noms (« Thalès », « réciproque de Thalès », « angle inscrit ») **au
motif que `REVIEW:122-130` (S7) aurait laissé la convention « à l'arbitrage du propriétaire ».
Relue verbatim, S7 dit autre chose** : « *Recommandation : **aligner sur « angle inscrit » /
« cercle de diamètre »**, mais faire confirmer la convention marocaine par le **content-author***
» (`REVIEW:127-130`). C'est une **direction** et un **propriétaire nommé**. Et la conséquence du
premier jet était mauvaise pour l'élève : le §4.6 l'envoie sur `cp-ensemble-points`, dont le
retour correct écrit « *Par la **réciproque de Thalès**…* » (`checkpoints.yaml:375-376`) —
c'est-à-dire **le nom que `REVIEW:124-126` qualifie d'« univoquement le mauvais »**. Une prose
muette envoyait donc l'élève apprendre le mauvais nom un clic plus loin.

**Règle retenue :**
- la sous-section **écrit d'abord la propriété en français et son mécanisme** (point 4) ;
- elle **nomme « théorème de l'angle inscrit » UNE fois** (point 6), et **jamais avant le
  mécanisme** ;
- **« Thalès » et « réciproque de Thalès » restent bannis** de toute prose commandée ici — la
  banque emploie le bon nom **une fois** (`bank.yaml:1064`, « *C'est exactement le **théorème de
  l'angle inscrit**, en angles orientés modulo $\pi$* »), *et cette fois-là est dans l'entrée
  cocyclique que la scène bannit (`bk-2024-r-x3`, `:831-1101`) : l'attestation est réelle et
  faible, elle est déclarée comme telle ci-dessus* ;
- **le PANNEAU de la scène, lui, ne nomme aucun théorème** (§9.1) — il nomme le **lieu**.
  *Motif : la scène vient AVANT la prose ; nommer un théorème dans un pari, c'est donner la
  méthode dans la réponse.*
- **et le §4.6 commande l'alignement de `checkpoints.yaml:375-376`.**

*Ce qui reste au propriétaire : la passe **corpus-wide** sur les ~15 occurrences contestées, pas
la direction. §13.3.*

### 4.5 Deux phrases dans R7 — et rien de plus

`lesson.md:416-419` liste les outils. Ajouter : (a) « $w$ se lit **depuis un sommet**, sur les
deux **vecteurs** issus de ce sommet — jamais sur les affixes eux-mêmes » ; (b) « une condition
sur $\left|\frac{z-z_A}{z-z_B}\right|$ donne une **médiatrice** ; une condition sur son
**argument** donne une **droite**, ou — **en filière Sciences Mathématiques** — un **cercle** ».

> ⚠ **La clause de filière du (b) est AJOUTÉE EN SECONDE PASSE (fidélité NEW-4).** Le premier
> jet révisé déplaçait la marque de filière du champ de métadonnées vers la prose (§4.4 point 4)
> — bonne décision — **puis commandait ici une phrase NEUVE qui re-pose le cercle sans la
> marque**, et au §4.6 une phrase de cadrage qui parle des « trois lieux » sans elle non plus.
> *Le mot « cercle » est le **seul** élément contesté entre les deux filières (`maths-sm.yaml:225`
> l'a, `maths-sexp.yaml:251` ne l'a pas). **Une marque posée à un site sur trois a le tiers de
> la portée** — et c'était exactement le motif du correctif d'origine : un champ que personne ne
> lit ne marque rien.* **Les TROIS sites sont désormais marqués : §4.4 point 4, §4.5 (b), §4.6
> (cadrage de `cp-ensemble-points`).** *Et c'est le compte exact : `grep` sur la prose commandée
> par ce document ⇒ trois endroits où le cercle-lieu est nommé comme résultat.*

### 4.6 Deux reprises de points d'arrêt — et c'est un livrable

**Aucun nouveau point d'arrêt.** Mais `REVIEW:196-198` (D11) relève que les points d'arrêt
R4/R5/R6 sont des **marqueurs nus**, et la scène aggrave le manque à deux endroits :

- **`cp-r6-lecture-w`** (`lesson.md:410`) **garde ses quatre choix inchangés.** Il gagne
  **une phrase de cadrage avant** (15 à 25 mots — « *la scène t'a fait trouver **ce que $w$
  vaut** ; ici on vérifie **ce qu'il dit*** ») **et une reprise après** (25 à 40 mots) qui pose
  la question du **sommet** : *« Et si on lisait le même triangle depuis $C$ ? Le module change,
  l'argument change — et la nature, elle, ne change pas de triangle : elle change de sommet. »*
  **Contrainte :** la reprise emploie les nombres de S3 et **ne redonne pas** la table.
- **`cp-ensemble-points`** (`lesson.md:423`) **garde ses quatre choix inchangés** et **reste à
  R7**. Il gagne **une phrase de cadrage** (15 à 25 mots) qui renvoie explicitement au segment
  neuf du §4.4 : *« Tu as vu les trois lieux au chapitre 7 — dont celui du cercle, au programme
  de la filière Sciences Mathématiques ; celui-ci est le même, sur d'autres points. »*
  **C'est cette phrase, et le §4.4, qui retirent l'anti-motif relevé par
  `REVIEW:132-137`** : la méthode cesse d'être introduite dans la réponse.
  ⚠ **La clause de filière est AJOUTÉE ICI EN SECONDE PASSE (fidélité NEW-4)** — troisième et
  dernier site où la prose commandée nomme le cercle comme résultat. *Sans elle, un élève SExp
  arriverait sur `cp-ensemble-points` après une phrase qui lui promet « les trois lieux » comme
  s'ils étaient tous les siens.*
  ⚠ **ET UN SECOND LIVRABLE, AJOUTÉ EN VAGUE 1 (fidélité I5) : aligner le retour correct de
  `cp-ensemble-points`.** `checkpoints.yaml:375-376` écrit aujourd'hui « *Par la **réciproque de
  Thalès**, $M$ décrit le cercle de diamètre $[AB]$, privé de $A$ et $B$.* » — le nom que
  `REVIEW:124-126` qualifie d'« univoquement le mauvais » (c'est la réciproque du théorème des
  milieux). **Envoyer l'élève de la prose neuve du §4.4 vers ce retour, c'est le faire changer
  de nom en un clic, et pour le mauvais.** → **content-author remplace cette phrase par le
  mécanisme du §4.4 point 4, suivi du nom retenu** : par exemple « *$M$ voit $[AB]$ sous un
  angle droit, donc $OM = OA = OB = \frac{AB}{2}$ : $M$ décrit le cercle de diamètre $[AB]$,
  privé de $A$ et $B$ (théorème de l'angle inscrit, chapitre 7).* » **Les quatre choix et la
  bonne réponse ne changent pas ; seule la phrase de justification change.** *C'est le
  propriétaire que S7 nomme (`REVIEW:128-129`), et c'est une ligne.*
  ⚠ **ET LE MÊME CORRECTIF S'ÉTEND À SON VOISIN IMMÉDIAT — AJOUTÉ EN SECONDE PASSE (fidélité
  NEW-10).** L'argument « un clic plus loin, le mauvais nom » ne s'arrête pas au point d'arrêt :
  **NBCOMPLEX2-24 (R7) porte le même nom trois fois, sur le MÊME lieu**, et c'est l'item que
  `cp-ensemble-points` double — `items.yaml:1645` (« *par le théorème de Thalès), pas
  l'inverse* »), `:1650` (« *théorème de Thalès, $M$ décrit le cercle de diamètre $[AB]$* »),
  `:1662` (« ***Théorème de Thalès (réciproque) :** l'ensemble des points $M$…* »). *Relevées
  moi-même par `grep`, à la ligne, ce 2026-09-25 : **les numéros que `REVIEW:125` cite
  (`items:1624`, `checkpoints:344`) ont bougé** — un relevé de revue vieux de deux semaines n'est
  pas une adresse.* → **content-author remplace ces trois occurrences dans la même passe**, par
  le mécanisme du §4.4 point 4 et le nom retenu. **Les choix et les bonnes réponses ne changent
  pas.** *Motif de l'extension : le §4.6 justifiait sa propre exception par « un clic » ; le
  premier objet que l'élève rencontre APRÈS `cp-ensemble-points` est précisément -24. **Une
  frontière tracée à un clic et pas au suivant est arbitraire.*** **Ce qui reste hors périmètre
  et va au propriétaire : les douze lignes de `bank.yaml` et le reste du corpus** — c'est la
  passe corpus-wide de S7, §13.3.
- **Coût résiduel, déclaré :** ni l'un ni l'autre n'interroge la **formation** de $w$ à un
  sommet $\neq O$ — cela ne se mesure que sur NBCOMPLEX2-42, -43, -44 (§8.3), au banc de fin.

---

## 5. Le modèle, les crans, les contrôles, l'état, les lectures

### 5.1 Le repère — réutilisé tel quel, et c'est une décision

**Fenêtre de données : $x \in [-9;9]$, $y \in [-9;9]$ — le CARRÉ de la scène sœur, inchangé**
(`plan-complexe-modele.ts:95`, `FENETRE = 9`). Elle ne change à aucune étape, à aucun réglage.

> **La règle est héritée, et elle vaut ici aussi.** La spec sœur l'a écrite après avoir trouvé
> trois états hors cadre : *« l'ensemble atteignable d'une scène de rotation se borne par un
> DISQUE ; son cadre est CARRÉ, ou il ment »* (§5.1). **Ici c'est encore plus direct** : le
> contrôle `position` applique des **rotations** d'un quart de tour et des demi-tours à toute
> la figure (§5.2 B). Un cadre paysage laisserait sortir la figure tournée. **Carré, ou il
> ment.**

Sont tracés à l'encre, toujours : les deux axes avec leurs noms ($\vec u$, $\vec v$), **les
graduations entières** et l'origine $O$. **Le cercle unité, lui, n'est tracé qu'en
`mode: lieu`** — décision prise en vague 1, motif ci-dessous.

> ⚠ **DÉCISION DE VAGUE 1 (pédagogie M3) : le cercle unité est tracé en `mode: lieu`
> UNIQUEMENT, donc à S4 seulement.** Dans la scène sœur il était l'**étalon** de $|c| = 1$.
> Ici, **à S1, S2 et S3 il n'a aucun rôle** : aucun module lu n'est comparé à $1$ sur le dessin,
> et c'est alors de l'encre que rien n'explique — la faute même que la vague 2 de la scène sœur
> a punie (« *aucune marque inexpliquée* »). **À S4 il en a un, et il est décisif** : « $|u|=1$ »
> **est** le pari, et le cercle unité est **un distracteur explicite** du pari (« l'ensemble des
> $M$ tels que $|u|=1$ est le cercle de rayon $1$ », §7.4). Le tracer là, et là seulement, rend
> le distracteur *visible et réfutable* au lieu de le laisser abstrait — et le retirer de S1 à
> S3 supprime trois étapes d'encre muette. **Le §13.8 était posé comme une question de goût ; il
> est désormais tranché par une raison, et la porte le mesure dans les deux sens** (`palette` /
> `avant-pari` : **aucun cercle unité en `mode: triangle`**, **un cercle unité en `mode: lieu`**,
> essai rouge n° 34). **§13.8.**

**Échelle** : identique à la scène sœur (`plan-complexe-rendu.ts`) — plateau carré de côté
$\min(\text{largeur}, 560)$, soit $\approx 31$ px/unité à $1\,280$ px et $\approx 21{,}7$ px/unité
à 390 px ; graduations tous les $2$ sous $540$ px de côté
(`plan-complexe-rendu.ts:91`, `COTE_GRADUATIONS_FINES`).

### 5.2 Les crans — et pourquoi ces valeurs-là

> ## ⚠ BLOQUANT DE VAGUE 1 (pédagogie B1) — **les ids de cran ne sont PAS les libellés
> visibles**, et c'est une règle de scène, pas un détail d'implémentation.
>
> **Le défaut mesuré :** le premier jet donnait au contrôle `forme` les valeurs `rect-isocele`,
> `equilateral`, `demi-equilateral`, `aligne`, et au contrôle `pointM` les valeurs `cercle-1`,
> `cercle-2`, `mediatrice`, `droite`. **Ces chaînes étaient à la fois les ids du descripteur et
> ce que l'élève lit.** Conséquences, toutes deux fatales :
> - au moment où le contrôle `forme` apparaît (après le pari de **S2**), le panneau contient
>   « équilatéral » — **la réponse du pari de S3, mot pour mot** ; et la porte `formule-graduee`
>   du §11.2 (« *le panneau ne contient aucune chaîne interdite de l'étape courante* ») **devait
>   rougir sur le produit conforme à la spec** ;
> - au moment où le contrôle `pointM` apparaît (après le pari de **S4**), il porte
>   « médiatrice » et « droite » — **la réponse du pari de S4 et celles de sa `suite`**.
>
> **La règle, désormais :** *aucun libellé de cran ne contient une chaîne interdite à l'étape
> où son contrôle est ouvert, ni le texte d'un choix juste d'un pari, présent ou à venir.*
> **Le descripteur porte donc une clé `libelles`** (§12), et **le balayage de `formule-graduee`
> inclut les libellés de cran** (§7.5 C, §11.2, essai rouge n° 32).
>
> **Le partage retenu, et son motif :**
> - **`forme` et `position` → ordinaux neutres** (« Triangle 1 · 2 · 3 · 4 », « Placement 1 · 2 ·
>   3 · 4 »). *Motif : ce sont des CONFIGURATIONS ; tout nom descriptif nomme une réponse
>   (« équilatéral »), et tout nom d'état nomme une cible de `suite` (« origine » — que la
>   `suite` de S1 fait précisément CHERCHER, §7.1).*
> - **`pointM` → les AFFIXES** ($2+4i$ · $\sqrt3+i$ · $-\sqrt3+i$ · $2\sqrt3\,i$ · $4$).
>   *Motif : c'est un POINT, et c'est exactement la convention de la scène sœur, vérifiée dans le
>   registre livré (`web/src/lib/scene3d/scenes.json:773-775` : les crans de `z` sont `1+i`,
>   `2i`, …). Un affixe est exact, déjà à l'encre sur le plan, et ne nomme aucun lieu.*
> - **`sommet` → `A` · `B` · `C`**, inchangé. *Ce sont les trois sommets nommés par l'énoncé ;
>   les trois sont présents, donc aucun ne désigne une réponse.*
>
> **Conséquence sur toute la suite de ce document : les `suite` et les retours parlent en
> LIBELLÉS VISIBLES, jamais en ids** (pédagogie M1). *Les ids restent dans le descripteur, le
> modèle et la porte.*

**A — les quatre FORMES** (`forme`, libellés **« Triangle 1 » à « Triangle 4 »**). Une forme est
un triangle **relatif au sommet $A$** : $\vec{AB}$ et $\vec{AC}$. La forme décide
**entièrement** de $w$ ; le placement (B) n'y change rien — et c'est le fait de S1.

| id | libellé visible | $\vec{AB}$ | $\vec{AC}$ | pourquoi ce cran |
|---|---|---|---|---|
| `rect-isocele` | **Triangle 1** | $4$ | $4i$ | **l'état de S1.** Le seul où $\vert w\vert = 1$ **et** $\arg(w) = \frac{\pi}{2}$ : les deux lectures sont « pleines », et la figure de R6 est ce cas-là |
| `equilateral` | **Triangle 2** | $4$ | $2+2\sqrt3\,i$ | **l'état d'AUCUN pari** *(changé en vague 1, correctif B4 : c'était l'état de S3, et le pari de S3 rejouait NBCOMPLEX2-6)*. **Il reste parce qu'il est le seul état où la table exige de COMBINER les deux lectures** ($\vert w\vert = 1$ **et** $\arg = \pm\frac{\pi}{3}$), et il est atteignable au contrôle `forme` de S2 |
| `demi-equilateral` | **Triangle 3** | $4$ | $3+\sqrt3\,i$ | **l'état de S2 ET de S3**, à deux placements différents. $\vert w\vert \neq 1$ **et** $\arg(w) \notin \{0,\pm\frac{\pi}{2},\pi\}$ : **aucune ligne de la table ne s'allume au sommet $A$** — et une s'allume au sommet $C$ (§5.3 A). **C'est la forme la plus instructive de la scène, et c'est désormais celle que S3 parie** |
| `aligne` | **Triangle 4** | $4$ | $-2$ | le cas dégénéré : $w$ **réel négatif**, les trois points alignés, $C$ du côté opposé à $B$ — la configuration de NBCOMPLEX2-20 |

> **Une forme servant deux étapes, déclaré franchement** (conséquence du correctif B4). S2 et S3
> paient tous deux sur `demi-equilateral`, à `tournee` puis `retournee`. **Pourquoi c'est la
> seule solution** : S2 exige $\vert w\vert \neq 1$ (sinon « le module est un quotient » est
> indiscernable, §2.2 raison 2) **et** un $\vec{AB}$ non horizontal (sinon le distracteur
> `angle-lu-depuis-l-axe` atteint la bonne valeur, §7.2) ; S3 exige une forme qui n'allume
> **rien** au sommet nommé en premier et **quelque chose** ailleurs. **`demi-equilateral` est la
> seule des quatre à satisfaire l'un ou l'autre**, et fabriquer une cinquième forme exacte dans
> $\mathbb{Q}(\sqrt3)[i]$ n'a pas donné de triangle dont l'argument soit un multiple de
> $\frac{\pi}{12}$ (§5.4). **Le prix, réel et déclaré : un élève attentif au dessin de S2 a déjà
> VU l'angle droit en $C$ quand arrive S3.** *Ce n'est pas la réponse du pari — le pari de S3
> porte sur l'**indexation par le sommet** (deux de ses quatre choix disent « rectangle »), que
> le dessin ne dit pas — mais c'est une aide, et elle est portée au `fit_caveat` (§10.13).*

> ⚠ *Motif refait en seconde passe (pédagogie, MINEUR 3).* Le premier jet révisé justifiait ce
> cran par « *et la `suite` de S2 **y mène*** » — **c'était vrai du premier jet et faux depuis** :
> la `suite` de S2 envoie sur **Triangle 4** (§7.2, correctif de vague 1). *Un cran dont la
> raison écrite ne tient plus est un cran qu'on garde par habitude ; la vraie raison est
> ci-dessus, et elle n'a jamais eu besoin de la `suite`.*

*Vérifications : $\vert 4i\vert = 4$ ✓ · $\vert 2+2\sqrt3 i\vert = \sqrt{4+12} = 4 = \vert\vec{AB}\vert$ ✓
(équilatéral) · $\vert 3+\sqrt3 i\vert = \sqrt{9+3} = 2\sqrt3$, $\cos = \frac{3}{2\sqrt3} = \frac{\sqrt3}{2}$,
$\sin = \frac{\sqrt3}{2\sqrt3} = \frac12$ ⟹ $\arg = \frac{\pi}{6}$ ✓ (table `lesson.md:71-74`).*

**B — les quatre PLACEMENTS** (`position`). Un placement est un **déplacement rigide** :
$z_P = t + r\,(\text{base}_P)$, avec $\text{base}_A = 0$ et $r$ de module $1$. **$w$ est
invariant** : $r$ se simplifie entre numérateur et dénominateur, et $t$ disparaît dans les
différences.

| id | libellé visible | $t$ (où est $A$) | $r$ | pourquoi ce cran |
|---|---|---|---|---|
| `origine` | **Placement 1** | $0$ | $1$ | **LE CAS DE TOUS LES OBJETS DÉCLARÉS DE R6** (fait **c**) : $A$ en $O$, $\vec{AB}$ sur l'axe réel. **Jamais un état de pari** — c'est une cible de `suite` (§7.1). *Le libellé est neutre, et c'est la raison même de la règle B1 : un cran nommé « origine » répondrait à la `suite` de S1 avant qu'elle ne soit posée* |
| `posee` | **Placement 2** | $-2+2i$ | $1$ | **l'état de S1** : déplacée seulement |
| `tournee` | **Placement 3** | $2-3i$ | $i$ | **l'état de S2** : déplacée **et** tournée d'un quart de tour, donc $\vec{AB}$ n'est plus horizontal — **la condition pour que `angle-lu-depuis-l-axe` soit séparable** (§7.2) |
| `retournee` | **Placement 4** | $4+4i$ | $-1$ | **l'état de S3** : déplacée **et** retournée. $r = -1$ n'est pas une rotation « visible » comme $i$ : c'est le placement le plus dur à rapporter mentalement à l'origine |

> **Le cran `origine` est une CONTAMINATION DÉLIBÉRÉE, et elle est bornée.** À ce placement,
> $z_A = 0$, donc $z_C - z_A = z_C$ : **le raccourci faux de S1 (« on divise les affixes »)
> donne la bonne réponse.** C'est une *contamination de la réponse juste*, donc un défaut de
> stem — **et c'est pourquoi `origine` n'est l'état de PARI d'aucune étape**. Il n'est
> atteignable que par le contrôle `position`, **après** la révélation de S1, et la `suite` de
> S1 le fait **chercher** : « *une seule position rend le raccourci juste ; trouve-la* »
> (§7.1). *Même construction qu'à S3 de la scène sœur, où les deux points de l'axe réel
> confondaient les deux lectures d'angle : le cas dégénéré se fait TROUVER, il ne se cache pas.*

**C — les trois SOMMETS** (`sommet`) : libellés `A` · `B` · `C`.

> **Le badge écrit la fraction ; il ne demande à personne de retenir un ordre.** Le badge du
> panneau affiche la fraction **en toutes lettres**, à tout instant, et le contrôle `sommet` la
> réécrit : sommet $A$ ⟹ $w = \dfrac{z_C-z_A}{z_B-z_A}$ *(la formule de la leçon, mot pour
> mot)* · sommet $B$ ⟹ $w = \dfrac{z_C-z_B}{z_A-z_B}$ · sommet $C$ ⟹
> $w = \dfrac{z_B-z_C}{z_A-z_C}$. *La porte vérifie que la fraction affichée correspond au
> sommet réglé (§11.2, `formule-au-sommet`).*
>
> ## ⚠ CORRECTIF DE VAGUE 1 (fidélité I1) — **la « règle unique » est rétrogradée en règle de
> GÉNÉRATION DU BADGE, sans aucun statut d'examen.**
>
> **Ce que le premier jet écrivait**, et qui est faux : « *Règle unique : le dénominateur est le
> vecteur vers le point de nom alphabétiquement le plus petit parmi les deux autres.* », plus,
> dans un retour de S1, « *le sens de lecture fait partie de la définition, il ne se choisit
> pas* ».
>
> **Ce que l'examen fait, vérifié sur les deux lignes de banque que ce document cite le plus :**
> - `bank.yaml:656` — « *on isole $\dfrac{p-r}{q-r}$* », au sommet **$R$**. Le plus petit des
>   deux autres noms est $P$ ; la règle exigerait $P$ au dénominateur. **Le sujet met $Q$.**
> - `bank.yaml:1204` — « *$\dfrac{p-d}{q-d} = i$* », au sommet **$D$**. Même violation.
> - **Et NBCOMPLEX2-44 du premier jet copiait l'ordre de la banque**, donc **enfreignait la
>   règle que la scène venait de poser.**
>
> **Ce qui est vrai, et qui est plus fort que la règle :** *le bac écrit l'ordre qui raccourcit
> l'algèbre*, et **les quatre lignes de la table de `lesson.md:381-386` sont INVARIANTES par
> $w \to \frac1w$** — réel reste réel, imaginaire pur reste imaginaire pur, $\vert w\vert = 1$
> reste $\vert w\vert = 1$, et $\arg = \pm\frac{\pi}{3}$ reste $\pm\frac{\pi}{3}$. **Inverser la
> fraction ne change pas la CONCLUSION ; cela inverse le rapport des longueurs
> ($\frac{AC}{AB} \to \frac{AB}{AC}$) et change le SIGNE de l'angle.**
>
> **Donc :** la règle ci-dessus dit seulement **comment la scène choisit la fraction à écrire sur
> le badge**, pour que le badge soit déterministe et que la porte `formule-au-sommet` ait une
> attente. **Elle n'est enseignée à personne, elle n'apparaît dans aucune consigne, aucun retour
> et aucune `suite`**, et **aucun pari ne la suppose**. *Le badge écrit la fraction en toutes
> lettres : c'est le bon design, et il n'a besoin d'aucune règle.* **Porté au `fit_caveat`
> (§10.12) et aux deux retours `ordre-inverse` (§7.1, §7.2).**

**D — les cinq positions de $M$** (`pointM`), en mode `lieu`, avec $z_A = -2$ et $z_B = 2$
**fixes**. **Libellés visibles : les AFFIXES** (règle B1) :

| id | libellé visible | $z_M$ | pourquoi ce cran |
|---|---|---|---|
| `libre` | **$2+4i$** | $2+4i$ | **l'état de S4** : sur aucun des trois lieux |
| `cercle-1` | **$\sqrt3+i$** | $\sqrt3+i$ | sur le **cercle de diamètre $[AB]$** (module $2$), hors de l'axe imaginaire |
| `cercle-2` | **$-\sqrt3+i$** | $-\sqrt3+i$ | idem, de l'autre côté — **et de module $\vert u\vert$ DIFFÉRENT** : c'est ce qui prouve que le cercle est une affaire d'**argument**, pas de module |
| `mediatrice` | **$2\sqrt3\,i$** | $2\sqrt3\,i$ | sur la **médiatrice** de $[AB]$ (l'axe imaginaire), **et pas sur le cercle de diamètre** |
| `droite` | **$4$** | $4$ | sur la **droite $(AB)$** (l'axe réel), hors du segment |

*Pourquoi pas $z_M = 2i$ : il est sur le cercle de diamètre **ET** sur la médiatrice (les deux
se coupent en $\pm 2i$) — un cran qui allume deux lieux à la fois ne diagnostique rien.
Pourquoi pas $z_M = 0$ : sur la droite $(AB)$ **ET** sur la médiatrice. **Les deux sont
délibérément absents des crans.*** *(Le premier jet les faisait nommer par la `suite` de S4 ;
la `suite` a été ramenée à une question et un geste en vague 1 — pédagogie I4/I7 — et **ces deux
points ne sont plus mentionnés nulle part**. Ils restent hors des crans, et c'est tout.)* §13.7.

### 5.3 Les tables de nombres — toute l'arithmétique de la scène, vérifiée

**A — les DOUZE valeurs de $w$ (4 formes × 3 sommets). Elles ne dépendent PAS du placement**
(§5.2 B), donc les $4\times4\times3 = 48$ états du mode `triangle` se ramènent à ces douze.

| forme | sommet $A$ : $\frac{z_C-z_A}{z_B-z_A}$ | sommet $B$ : $\frac{z_C-z_B}{z_A-z_B}$ | sommet $C$ : $\frac{z_B-z_C}{z_A-z_C}$ |
|---|---|---|---|
| `rect-isocele` | $i$ | $1-i$ | $1+i$ |
| `equilateral` | $\dfrac{1+\sqrt3\,i}{2}$ | $\dfrac{1-\sqrt3\,i}{2}$ | $\dfrac{1+\sqrt3\,i}{2}$ |
| `demi-equilateral` | $\dfrac{3+\sqrt3\,i}{4}$ | $\dfrac{1-\sqrt3\,i}{4}$ | $\dfrac{\sqrt3}{3}\,i$ |
| `aligne` | $-\dfrac12$ | $\dfrac32$ | $3$ |

*Vérifications, sur la base $A=0$, $B=4$ :*
- *`rect-isocele` ($C = 4i$) : $A$ : $\frac{4i}{4}=i$ ✓ · $B$ : $\frac{4i-4}{-4}=1-i$ ✓ ·
  $C$ : $\frac{4-4i}{-4i}$ ; $\frac{1}{-4i}=\frac{i}{4}$, donc $(4-4i)\frac{i}{4}=(1-i)i=i+1$ ✓.*
- *`equilateral` ($C = 2+2\sqrt3 i$) : $A$ : $\frac{2+2\sqrt3 i}{4}=\frac{1+\sqrt3 i}{2}$ ✓ ·
  $B$ : $\frac{-2+2\sqrt3 i}{-4}=\frac{1-\sqrt3 i}{2}$ ✓ · $C$ : $\frac{2-2\sqrt3 i}{-2-2\sqrt3 i}$ ;
  on multiplie par $\overline{(-2-2\sqrt3 i)} = -2+2\sqrt3 i$ : dénominateur $4+12=16$,
  numérateur $(2-2\sqrt3 i)(-2+2\sqrt3 i) = -4+4\sqrt3 i+4\sqrt3 i+12 = 8+8\sqrt3 i$, d'où
  $\frac{1+\sqrt3 i}{2}$ ✓.*
- *`demi-equilateral` ($C = 3+\sqrt3 i$) : $A$ : $\frac{3+\sqrt3 i}{4}$ ✓ ·
  $B$ : $\frac{-1+\sqrt3 i}{-4}=\frac{1-\sqrt3 i}{4}$ ✓ · $C$ : $\frac{1-\sqrt3 i}{-3-\sqrt3 i}$ ;
  on multiplie par $-3+\sqrt3 i$ : dénominateur $9+3=12$, numérateur
  $(1-\sqrt3 i)(-3+\sqrt3 i) = -3+\sqrt3 i+3\sqrt3 i+3 = 4\sqrt3 i$, d'où
  $\frac{4\sqrt3 i}{12}=\frac{\sqrt3}{3}i$ ✓.*
- *`aligne` ($C = -2$) : $A$ : $\frac{-2}{4}=-\frac12$ ✓ · $B$ : $\frac{-2-4}{-4}=\frac32$ ✓ ·
  $C$ : $\frac{4-(-2)}{0-(-2)}=\frac{6}{2}=3$ ✓.*

**B — les modules, les arguments et la NATURE, aux douze.**

> ⚠ **CORRECTIF DE VAGUE 1 (fidélité M5) : la lecture `nature` nomme TOUTES les lignes de la
> table que $w$ vérifie à ce sommet, dans l'ordre de la table — pas « la » ligne, pas « la plus
> forte ».** Le premier jet écrivait « *la **ligne** que $w$ vérifie* » (§5.6) et « *elle nomme
> **une** ligne exactement* » (§11.1 N6) tout en écrivant « rectangle **ET** isocèle en $A$ »
> pour `rect-isocele` et le seul mot « équilatéral » pour `equilateral` — **deux conventions
> incompatibles dans le même tableau**, et une porte N6 non implémentable telle qu'écrite. *Or
> un triangle équilatéral vérifie BIEN deux lignes ($\vert w\vert = 1$, donc isocèle ; puis
> $\vert w\vert = 1$ et $\arg = \pm\frac{\pi}{3}$, donc équilatéral), et le cacher enseignerait
> que les lignes s'excluent.* **Règle unique, mesurable, appliquée ci-dessous et au §11.1 N6.**

> ## ⚠ IMPORTANT DE SECONDE PASSE (pédagogie IM-1) — **`nature` n'énumère plus un ensemble que
> l'élève n'a jamais vu : elle écrit LES CRITÈRES QU'ELLE VIENT DE VÉRIFIER.**
>
> **Le défaut mesuré.** La lecture écrivait « *aucune des quatre* » — **et l'élève n'a jamais vu
> les quatre.** La table est à `lesson.md:381-386`, c'est-à-dire **après** le marqueur (§3), et
> depuis le correctif B4 + I5 la scène ne peut plus allumer qu'un seul mot : `nature` n'existe
> qu'à S3 (§5.6), `forme` y est fermé (§5.5), donc **les seules valeurs atteignables de toute la
> scène sont « rien au sommet $X$ » deux fois et « rectangle en $C$ » une fois.** « Isocèle »,
> « équilatéral » et « alignés » ne s'allument **nulle part**, et quatre textes de S3 invoquaient
> pourtant « la table » comme un objet connu. *Le §2.3 écrivait « **S3** ajoute la **table** » :
> ce n'était plus vrai de l'objet construit.*
>
> **Le correctif retenu — UN seul, et voici pourquoi celui-là.** Trois routes existaient :
> (i) faire porter les quatre critères à la révélation ; (ii) cesser de parler de « la table » ;
> (iii) **faire nommer à la lecture ce qu'elle a VÉRIFIÉ, plutôt que compter un ensemble
> invisible.** *La (i) ajoute de l'encre et imprime « équilatéral » comme un mot que rien
> n'allume — le défaut déplacé, pas retiré. La (ii) coupe le lien avec la table de la leçon, qui
> est précisément ce que S3 prépare. **La (iii) fait les deux : la lecture devient
> auto-suffisante (aucun renvoi à un objet non lu), elle VARIE avec l'état (donc elle
> diagnostique), et elle montre le geste — vérifier une valeur contre un seuil — que la prose
> devra ensuite justifier.*** **Le §7.5 C autorisait déjà « la table entière » à S3 : aucune
> frontière ne bouge, aucune chaîne interdite n'apparaît.**
>
> **La règle, écrite une fois et mesurable dans quatre sens (§11.1 N6) :**
> - **quand un ou deux critères s'allument**, `nature` écrit **chacun, dans l'ordre de la table,
>   avec la valeur qui le déclenche** — « $\vert w\vert = 1$ ⟹ isocèle en $A$ » ;
> - **quand aucun ne s'allume**, elle écrit **les critères vérifiés et la valeur qui les tue** —
>   jamais un décompte ;
> - **jamais une conclusion sans le critère qui la produit**, et **jamais « aucune des quatre »**.
>
> *Bénéfice qui n'était pas cherché et qui est le meilleur de la seconde passe : au sommet $B$
> de `demi-equilateral`, $\arg(w) = -\frac{\pi}{3}$ est **exactement** la valeur de la ligne
> « équilatéral », et c'est $\vert w\vert = \frac12$ qui l'interdit. L'ancienne lecture répondait
> « aucune des quatre » sans dire pourquoi, sur le quasi-succès le plus instructif de la scène.
> **La nouvelle l'écrit — et la `suite` de S3 est reconstruite dessus** (§7.3).*

| forme · sommet | $\vert w\vert$ | $\arg(w)$ | ce que la lecture `nature` écrit |
|---|---|---|---|
| `rect-isocele` · $A$ | $1$ | $\dfrac{\pi}{2}$ | $\vert w\vert = 1$ ⟹ **isocèle en $A$** · $\arg(w) = \dfrac{\pi}{2}$ ⟹ **rectangle en $A$** |
| `rect-isocele` · $B$ | $\sqrt2$ | $-\dfrac{\pi}{4}$ | $\vert w\vert = \sqrt2 \neq 1$ · $\arg(w) = -\dfrac{\pi}{4}$ : ni $0$, ni $\pi$, ni $\pm\dfrac{\pi}{2}$ — **rien ne s'allume au sommet $B$** |
| `rect-isocele` · $C$ | $\sqrt2$ | $\dfrac{\pi}{4}$ | $\vert w\vert = \sqrt2 \neq 1$ · $\arg(w) = \dfrac{\pi}{4}$ : ni $0$, ni $\pi$, ni $\pm\dfrac{\pi}{2}$ — **rien ne s'allume au sommet $C$** |
| `equilateral` · $A$ | $1$ | $\dfrac{\pi}{3}$ | $\vert w\vert = 1$ ⟹ **isocèle en $A$** · et $\arg(w) = \dfrac{\pi}{3}$ ⟹ **équilatéral** |
| `equilateral` · $B$ | $1$ | $-\dfrac{\pi}{3}$ | $\vert w\vert = 1$ ⟹ **isocèle en $B$** · et $\arg(w) = -\dfrac{\pi}{3}$ ⟹ **équilatéral** *(le signe change, la conclusion non)* |
| `equilateral` · $C$ | $1$ | $\dfrac{\pi}{3}$ | $\vert w\vert = 1$ ⟹ **isocèle en $C$** · et $\arg(w) = \dfrac{\pi}{3}$ ⟹ **équilatéral** |
| `demi-equilateral` · $A$ | $\dfrac{\sqrt3}{2}$ | $\dfrac{\pi}{6}$ | $\vert w\vert = \dfrac{\sqrt3}{2} \neq 1$ · $\arg(w) = \dfrac{\pi}{6}$ : ni $0$, ni $\pi$, ni $\pm\dfrac{\pi}{2}$ — **rien ne s'allume au sommet $A$** |
| `demi-equilateral` · $B$ | $\dfrac12$ | $-\dfrac{\pi}{3}$ | $\arg(w) = -\dfrac{\pi}{3}$ est bien l'angle de la ligne « équilatéral » — **mais $\vert w\vert = \dfrac12 \neq 1$**, et cette ligne demande les DEUX · ni $0$, ni $\pi$, ni $\pm\dfrac{\pi}{2}$ — **rien ne s'allume au sommet $B$** |
| `demi-equilateral` · $C$ | $\dfrac{\sqrt3}{3}$ | $\dfrac{\pi}{2}$ | $\vert w\vert = \dfrac{\sqrt3}{3} \neq 1$ · $\arg(w) = \dfrac{\pi}{2}$ ⟹ **rectangle en $C$** |
| `aligne` · $A$ | $\dfrac12$ | $\pi$ | $\vert w\vert = \dfrac12 \neq 1$ · $\arg(w) = \pi$ ⟹ **alignés** |
| `aligne` · $B$ | $\dfrac32$ | $0$ | $\vert w\vert = \dfrac32 \neq 1$ · $\arg(w) = 0$ ⟹ **alignés** |
| `aligne` · $C$ | $3$ | $0$ | $\vert w\vert = 3 \neq 1$ · $\arg(w) = 0$ ⟹ **alignés** |

*Vérifications des modules non triviaux : $\vert 1-i\vert = \sqrt2$ ✓ ·
$\left\vert\frac{1\pm\sqrt3 i}{2}\right\vert = \frac{\sqrt{1+3}}{2}=1$ ✓ ·
$\left\vert\frac{3+\sqrt3 i}{4}\right\vert = \frac{\sqrt{9+3}}{4}=\frac{2\sqrt3}{4}=\frac{\sqrt3}{2}$ ✓ ·
$\left\vert\frac{1-\sqrt3 i}{4}\right\vert = \frac{2}{4}=\frac12$ ✓ ·
$\left\vert\frac{\sqrt3}{3}i\right\vert = \frac{\sqrt3}{3}$ ✓.
Des arguments : $\frac{1+\sqrt3 i}{2}$ a $\cos=\frac12$, $\sin=\frac{\sqrt3}{2}$ ⟹ $\frac{\pi}{3}$ ✓ ·
$\frac{3+\sqrt3 i}{4}$ a module $\frac{\sqrt3}{2}$, $\cos = \frac{3/4}{\sqrt3/2}=\frac{\sqrt3}{2}$,
$\sin = \frac{\sqrt3/4}{\sqrt3/2}=\frac12$ ⟹ $\frac{\pi}{6}$ ✓ ·
$\frac{1-\sqrt3 i}{4}$ a module $\frac12$, $\cos=\frac12$, $\sin=-\frac{\sqrt3}{2}$ ⟹ $-\frac{\pi}{3}$ ✓.*

> **Les trois lignes `demi-equilateral` sont le cœur de la scène, et il faut les regarder en
> face.** Le **même** triangle n'allume **aucune** ligne de la table au sommet $A$, **aucune**
> au sommet $B$, et **« rectangle »** au sommet $C$. **La nature d'un triangle n'est pas une
> propriété du rapport : c'est une propriété du COUPLE (triangle, sommet).** Aucune figure gelée
> ne peut porter ce fait, et aucun des quatre objets déclarés de R6 ne l'approche.
> **⚠ Changement de vague 1 (pédagogie B4) : ce fait n'est plus relégué dans une `suite` — il
> EST le pari de S3** (§7.3). *Le premier jet le qualifiait lui-même de « fait le plus important
> de la scène » tout en le confiant à une consigne non pariée, pendant que le pari, lui,
> rejouait NBCOMPLEX2-6. C'était l'inverse de ce qu'il fallait faire.* Le §4.6 le fait rappeler
> par la reprise de `cp-r6-lecture-w`, et **NBCOMPLEX2-44 le mesure au banc** (§8.3).

> **Et les trois lignes `equilateral` portent un second fait, énoncé correctement depuis la
> vague 1 :** le module vaut $1$ aux trois sommets, l'argument vaut $+\frac{\pi}{3}$,
> $-\frac{\pi}{3}$, $+\frac{\pi}{3}$ — **et la conclusion « équilatéral » ne bouge pas.**
> ⚠ *Le premier jet en tirait « **le signe dépend du sommet**, la nature non » et en faisait une
> `suite`. La vague 1 (fidélité I1) a montré que la moitié « le signe dépend du sommet » est un
> fait sur l'ORDRE DE LECTURE que la scène s'est choisi (§5.2 C), pas sur les triangles : au
> sommet $B$, l'autre ordre donnerait $+\frac{\pi}{3}$.* **Ce qui reste, et qui est vrai sans
> convention : la conclusion est invariante — par changement de sommet ET par inversion de la
> fraction.** C'est ce que la banque illustre en écrivant
> « *$\left\vert\frac{p-r}{q-r}\right\vert=1$ et $\arg = -\frac{\pi}{3}$ ⟹ $PQR$ équilatéral* »
> (`bank.yaml:664`) là où la table de la leçon écrit « $\pm$ » (`lesson.md:386`). §4.3 point 2.

**C — les LONGUEURS au sommet (la lecture `longueurs`), pour chaque forme, au sommet $A$ :**

| forme | $AB$ | $AC$ | $\dfrac{AC}{AB}$ | $= \vert w\vert$ ? |
|---|---|---|---|---|
| `rect-isocele` | $4$ | $4$ | $1$ | ✓ |
| `equilateral` | $4$ | $4$ | $1$ | ✓ |
| `demi-equilateral` | $4$ | $2\sqrt3$ | $\dfrac{2\sqrt3}{4}=\dfrac{\sqrt3}{2}$ | ✓ |
| `aligne` | $4$ | $2$ | $\dfrac12$ | ✓ |

**D — les placements, et la vérification de cadre.** Les trois points d'un état sont
$t$, $t+4r$, $t+r\,\vec{AC}$. Tous les points de toutes les formes sont à distance $\le 4$ de
$A$ (max : $\vert 4i\vert = 4$, $\vert 2+2\sqrt3 i\vert = 4$, $\vert 3+\sqrt3 i\vert = 2\sqrt3 \approx 3{,}46$,
$\vert -2\vert = 2$), **et $r$ est de module $1$, donc la figure entière tient dans le disque de
rayon $4$ centré sur $z_A = t$.**

| placement | $t$ | $\vert t\vert$ | excursion max $\vert z\vert \le \vert t\vert + 4$ | extrêmes relevés | marge au cadre $[-9;9]^2$ |
|---|---|---|---|---|---|
| `origine` | $0$ | $0$ | $4$ | $4$ · $4i$ · $-2$ | **5 unités** |
| `posee` | $-2+2i$ | $2\sqrt2 \approx 2{,}83$ | $\approx 6{,}83$ | $-4+2i$ · $2+2i$ · $-2+6i$ | **$\ge 3$ unités** |
| `tournee` | $2-3i$ | $\sqrt{13} \approx 3{,}61$ | $\approx 7{,}61$ | $2-5i$ · $-2-3i$ · $2+i$ | **$\ge 4$ unités** |
| `retournee` | $4+4i$ | $4\sqrt2 \approx 5{,}66$ | $\approx 9{,}66$ ⚠ | $6+4i$ · $4i$ · $2+(4-2\sqrt3)i$ | **voir ci-dessous** |

> ⚠ **Le placement `retournee` demande une vérification EXPLICITE, parce que sa borne
> grossière dépasse le cadre.** $\vert t\vert + 4 \approx 9{,}66 > 9$ : la borne par le disque
> **ne suffit pas**. Il faut énumérer. Avec $r = -1$, les trois points sont $t$, $t-4$,
> $t - \vec{AC}$, soit $4+4i$, $4i$, et $4+4i-\vec{AC}$ :
> `rect-isocele` ⟹ $4+4i-4i = 4$ · `equilateral` ⟹ $2+(4-2\sqrt3)i \approx 2+0{,}54i$ ·
> `demi-equilateral` ⟹ $1+(4-\sqrt3)i \approx 1+2{,}27i$ · `aligne` ⟹ $6+4i$.
> **Coordonnée extrême : $6$ en abscisse, $4$ en ordonnée. Marge : 3 unités.** ✓
> *C'est exactement le raisonnement qui avait échoué à la scène sœur (borne par le disque
> appliquée à un cadre rectangulaire) ; il est refait ici **point par point** sur le seul
> placement où la borne grossière ne conclut pas, et le §14.2 le confie au test unitaire.*

**E — le mode `lieu` : $z_A = -2$, $z_B = 2$, $u = \dfrac{z-z_A}{z-z_B} = \dfrac{z+2}{z-2}$ :**

| cran | $z_M$ | $u$ | $\vert u\vert$ | $\arg(u)$ | $MA$ | $MB$ | lieu |
|---|---|---|---|---|---|---|---|
| `libre` | $2+4i$ | $1-i$ | $\sqrt2$ | $-\dfrac{\pi}{4}$ | $4\sqrt2$ | $4$ | **aucun** |
| `cercle-1` | $\sqrt3+i$ | $-(2+\sqrt3)\,i$ | $2+\sqrt3$ | $-\dfrac{\pi}{2}$ | — | — | **cercle de diamètre $[AB]$** |
| `cercle-2` | $-\sqrt3+i$ | $-(2-\sqrt3)\,i$ | $2-\sqrt3$ | $-\dfrac{\pi}{2}$ | — | — | **cercle de diamètre $[AB]$** |
| `mediatrice` | $2\sqrt3\,i$ | $\dfrac12-\dfrac{\sqrt3}{2}i$ | $1$ | $-\dfrac{\pi}{3}$ | $4$ | $4$ | **médiatrice de $[AB]$** |
| `droite` | $4$ | $3$ | $3$ | $0$ | $6$ | $2$ | **droite $(AB)$** |

*Vérifications, toutes refaites :*
- *`libre` : $z+2 = 4+4i$, $z-2 = 4i$ ; $\frac{1}{4i} = -\frac{i}{4}$, donc
  $u = (4+4i)\left(-\frac{i}{4}\right) = (1+i)(-i) = -i+1 = 1-i$ ✓. $MA = \vert -2-2-4i\vert = \vert -4-4i\vert = 4\sqrt2$ ✓,
  $MB = \vert 2-2-4i\vert = 4$ ✓, quotient $\sqrt2$ ✓.*
- *`cercle-1` : $z+2 = (2+\sqrt3)+i$, $z-2 = (\sqrt3-2)+i$ ; $\vert z-2\vert^2 = (2-\sqrt3)^2+1 = 8-4\sqrt3$ ;
  numérateur $\big((2+\sqrt3)+i\big)\big((\sqrt3-2)-i\big) = (2+\sqrt3)(\sqrt3-2) - i(2+\sqrt3) + i(\sqrt3-2) + 1
  = -1 - 4i + 1 = -4i$ ; d'où $u = \frac{-4i}{8-4\sqrt3} = \frac{-i}{2-\sqrt3} = -i(2+\sqrt3)$ ✓
  (car $\frac{1}{2-\sqrt3} = 2+\sqrt3$).*
- *`cercle-2` : $z+2 = (2-\sqrt3)+i$, $z-2 = (-2-\sqrt3)+i$ ; $\vert z-2\vert^2 = (2+\sqrt3)^2+1 = 8+4\sqrt3$ ;
  numérateur $\big((2-\sqrt3)+i\big)\big((-2-\sqrt3)-i\big) = -1 - 4i + 1 = -4i$ ; d'où
  $u = \frac{-4i}{8+4\sqrt3} = \frac{-i}{2+\sqrt3} = -i(2-\sqrt3)$ ✓.*
- *`mediatrice` : $z+2 = 2+2\sqrt3 i$ (module $4$, argument $\frac{\pi}{3}$), $z-2 = -2+2\sqrt3 i$
  (module $4$ ; $\cos = -\frac12$, $\sin = \frac{\sqrt3}{2}$ ⟹ $\frac{2\pi}{3}$) ; d'où
  $\vert u\vert = 1$ ✓ et $\arg u = \frac{\pi}{3}-\frac{2\pi}{3} = -\frac{\pi}{3}$ ✓, soit
  $u = \frac12 - \frac{\sqrt3}{2}i$ ✓. $MA = \vert -2-2\sqrt3 i\vert = 4 = MB$ ✓.*
- *`droite` : $u = \frac{6}{2} = 3$ ✓.*
- *Cadre : la coordonnée extrême du mode `lieu` est $4$ ; **marge 5 unités** ✓.*

> **Le fait que S4 existe pour montrer, en une ligne :** `cercle-1` et `cercle-2` ont **le même
> argument** ($-\frac{\pi}{2}$) et **des modules différents** ($2+\sqrt3 \approx 3{,}73$ et
> $2-\sqrt3 \approx 0{,}27$) ; `mediatrice` a **le module $1$** et un argument **quelconque**
> ($-\frac{\pi}{3}$). **Le cercle est une affaire d'ARGUMENT ; la médiatrice une affaire de
> MODULE. Deux crans le prouvent, sans une phrase d'auteur** — et c'est exactement la
> distinction que `ensemble-points-locus-confondu` échoue à faire.

### 5.4 La précision — exacte, ou rien

> **Aucune lecture de cette scène n'affiche un décimal.** Tous les affixes sont dans
> $\mathbb{Q}(\sqrt3)[i]$ ; tous les modules sont des radicaux exacts ($1$, $\sqrt2$,
> $\frac{\sqrt3}{2}$, $\frac{\sqrt3}{3}$, $2\pm\sqrt3$) ; tous les arguments sont des multiples
> de $\frac{\pi}{12}$ dans $]-\pi;\pi]$. **C'est la raison pour laquelle les crans sont
> discrets** (§2.6) et **c'est une frontière mesurée** (§9.8).

**Quatre précisions d'écriture, non négociables :**
1. **Radians, en fraction de $\pi$** — jamais de degrés, jamais de décimales. *Les **retours de
   pari** ont le droit d'écrire « environ $0{,}87$ » ou « environ $50°$ » : ce sont des
   arguments d'**ordre de grandeur** adressés à un modèle faux, et ils sont **déclarés au
   §9.8** pour que la porte les cherche dans les **lectures**, pas dans le panneau entier.*
2. **Arguments dans $]-\pi;\pi]$, la borne $-\pi$ réécrite $+\pi$.** *La grille la déclenche :
   `aligne` au sommet $A$ donne $\arg(w) = \pi$ exactement* (§5.3 B). La règle de réduction est
   celle du modèle livré (`plan-complexe-modele.ts:191-194`, `reduire`) ; **elle se réutilise
   telle quelle.**
3. **$2\pm\sqrt3$ s'écrit sous forme exacte, jamais $3{,}73$ ni $0{,}27$.** *C'est le seul
   module « inhabituel » de la scène, et c'est délibéré : un module qui n'est ni $1$ ni un
   radical familier est ce qui rend le contraste de S4 indiscutable.*
4. **Quand une lecture n'existe pas, la LIGNE DISPARAÎT** (règle héritée, scène sœur, décision
   de construction n° 1) — elle n'écrit pas « — ». *Le seul cas : en mode `lieu`, si $M$
   coïncidait avec $A$ ou $B$. **Aucun cran ne le permet** (§5.2 D), donc ce cas ne se produit
   pas ; la règle est écrite pour la porte, pas pour l'élève.*

### 5.5 Contrôles (4 + le balayage) — un neuf par étape

| id | ce qu'il règle | valeurs (ids) | libellés visibles | ouvert par |
|---|---|---|---|---|
| `position` | le placement de la figure | `origine` · `posee` · `tournee` · `retournee` | Placement 1 · 2 · 3 · 4 | **S1** *(et S1 seul)* |
| `forme` | le triangle | `rect-isocele` · `equilateral` · `demi-equilateral` · `aligne` | Triangle 1 · 2 · 3 · 4 | **S2** *(et S2 seul)* |
| `sommet` | depuis quel point on lit | `A` · `B` · `C` | $A$ · $B$ · $C$ | **S3** |
| `pointM` | la position de $M$ | `libre` · `cercle-1` · `cercle-2` · `mediatrice` · `droite` | $2+4i$ · $\sqrt3+i$ · $-\sqrt3+i$ · $2\sqrt3\,i$ · $4$ | **S4** |
| **`balayage`** | un glissement **continu** de $M$ | *aucun cran, aucune borne d'état* | — | **S4 seulement, APRÈS la révélation, et jamais au cran $2+4i$** |

**Aucun curseur continu, aucune borne, aucune clé `bornes` dans le registre** — même régime que
la scène sœur (§12), pour la raison du §5.4.

> ⚠ **CHANGEMENT DE VAGUE 1 (pédagogie I5) : plus aucun contrôle n'est « rouvert ». Un contrôle
> est ouvert par UNE étape, celle dont le geste en a besoin.** Le premier jet rouvrait `forme`
> et `position` à S3 parce que la `suite` de S3, en trois temps, en avait besoin. **La `suite`
> de S3 est ramenée à une question et un geste** (`HANDOFF.md:16448` : « *les suites de S3 et S5
> à une question et un geste* »), **et ce geste est `sommet`**. Les deux réouvertures
> disparaissent avec elle. *Gain mesuré : S3 passait de trois contrôles et six lectures sur le
> placement le plus dur (`retournee`) à **un contrôle et quatre lectures** — le pic de charge de
> la rampe cesse d'être aussi son point le plus encombré. La table du §7.5 A et la porte
> `fuite-inter-etapes` sont refaites en conséquence.*

**`position` n'est ouvert qu'à S1, `forme` qu'à S2 — et c'est mesuré** (§7.5 A). *Conséquence
directe : l'état de pari de S3 (`demi-equilateral` × `retournee`) n'est atteignable depuis S2
par aucun réglage, puisque `position` y est fermé.*

**Le balayage est la pièce héritée de S3 de la scène sœur** (ADR 0041, décision de construction
n° 2) : il **explore sans régler** — aucun cran, aucune clé d'`etat`, **aucune lecture
POSITIONNELLE chiffrée pendant qu'il agit** (les lectures INVARIANTES, elles, restent écrites :
§6.1, correctif de seconde passe), et l'état retrouvé intact au relâchement. Au clavier il ne se
relâche pas au `keyup` ; sous `prefers-reduced-motion` **rien ne change** (manipulation directe,
pas animation). *Ici il glisse $M$ **le long du lieu révélé**, pas sur un cercle arbitraire —
c'est la différence avec la scène sœur, et elle porte tout le sens de S4 (§7.4).*

> ⚠ **LES QUATRE AUTRES LEÇONS LIVRÉES DU BALAYAGE, CARRÉES EN SECONDE PASSE (pédagogie,
> MINEUR 9).** Le premier jet révisé n'héritait que du principe et de la règle `keyup`. La
> construction et la vague 2 de la scène sœur en ont livré quatre de plus
> (`scene-plan.md:19-21`, `HANDOFF.md:16449-16451` : « *le balayage au cran de 5, son début et
> son relâchement DITS, sa valeur parlée qui varie, « Échap » dans le libellé visible* »).
> **Elles s'appliquent toutes, et l'une d'elles doit être transposée plutôt que copiée :**
> 1. **Le début et le relâchement sont DITS par la région vivante.** *Sans quoi un élève au
>    lecteur d'écran ne sait ni qu'il a pris le point, ni qu'il l'a lâché.*
> 2. **« Échap » est dans le LIBELLÉ VISIBLE du contrôle**, pas seulement dans l'aide.
> 3. **Le pas déplace visiblement $M$.** *La scène sœur a mesuré qu'au cran de $1°$ une flèche ne
>    bougeait rien de visible.* **Ici les lieux ne sont pas tous des arcs : le pas est de $5°$ sur
>    le CERCLE, et de $\frac14$ d'unité sur la MÉDIATRICE et sur la DROITE** — soit $\approx 8$ px
>    à $1\,280$ et $\approx 5$ px à 390 (§5.1). **Mesuré, pas supposé : `balayage-invariants`
>    exige qu'un appui de flèche déplace $M$ d'au moins 4 px aux deux largeurs.**
> 4. **Une valeur parlée qui VARIE — et ici elle ne peut pas être un nombre.** *La scène sœur
>    annonçait une valeur numérique ; §5.4 l'interdit ici, puisque la grandeur qui varie n'est
>    exacte à presque aucun point du continuum.* **Transposition : la région vivante annonce
>    l'invariant avec sa valeur exacte, et le SENS de variation des deux distances** — « *$MA$ et
>    $MB$ augmentent ensemble ; le module vaut toujours $1$* » sur la médiatrice, « *$MA$
>    augmente, $MB$ diminue ; l'angle en $M$ reste droit* » sur le cercle. *Le sens de variation
>    change pendant le geste : l'annonce n'est donc jamais deux fois la même chaîne — ce qui est
>    la propriété que la leçon livrée cherchait.* **Porte : la chaîne annoncée diffère entre deux
>    positions échantillonnées du balayage, et contient la valeur exacte de l'invariant.**

> ⚠ **CONSTATATION DE VAGUE 1 RÉFUTÉE, avec la citation (pédagogie M6).** Le rapport écrit :
> « *§5.5/§6.1 disent sous `prefers-reduced-motion` « rien ne change » ; **la spec de la scène
> sœur remplace le balayage par trois positions discrètes supplémentaires**. Aligner ou
> déclarer.* » **Le critique a lu le §6.1 de la spec sœur, pas le bloc « Ce que la construction a
> changé » écrit au-dessus, qui le corrige** — `maths-nombres-complexes-2-scene-plan.md:26-29` :
> « *Au clavier, le balayage ne se relâche pas au `keyup` […] **Sous `prefers-reduced-motion`,
> rien ne change** : le balayage est une manipulation DIRECTE — rien ne bouge sans la main —,
> pas une animation (WCAG 2.3.3 vise le mouvement déclenché, pas celui qu'on tient) ; **les
> « trois positions discrètes » du §6.1 ne sont pas construites**.* » **Cette spec est donc
> alignée sur ce qui a été LIVRÉ, et la divergence est avec un texte que la construction a déjà
> retiré.** *Rien à changer ; la réfutation est consignée au §15.12.*

### 5.6 État (5 clés) et lectures (7)

**État :** `position`, `forme`, `sommet`, `pointM`, **`mode`**. *`mode` (`triangle` | `lieu`)
est **posé par les étapes**, sans contrôle — même contrat que `reference` et `image` à la scène
sœur. En `mode: lieu`, les contrôles `position`, `forme` et `sommet` sont **absents du DOM**.*

> ⚠ **CHANGEMENT DE VAGUE 1 (pédagogie I5) — la colonne « à partir de » devient « à
> quelle(s) étape(s) », et le modèle n'est plus cumulatif.** Le premier jet faisait porter à
> chaque étape toutes les lectures ouvertes avant elle : S2 traînait `vecteurs` et `w` sans les
> employer, S3 traînait « les six du mode `triangle` » en n'en utilisant que trois. **La règle
> désormais, et c'est celle que la vague 2 de la scène sœur a écrite et LIVRÉE**
> (`HANDOFF.md:16446-16447` : « *les lectures de S4 et S5 réduites à ce que l'étape découvre ou
> emploie (S5 : six au lieu de neuf)* ») : **une lecture n'apparaît qu'à l'étape qui la découvre
> ou qui s'en sert.** *Une lecture peut donc DISPARAÎTRE d'une étape à la suivante ; ce n'est pas
> un bug, et la porte `fuite-inter-etapes` mesure l'ensemble exact, étape par étape.*

| id | ce qui s'affiche | forme | étapes où elle existe |
|---|---|---|---|
| `vecteurs` | les affixes des **deux vecteurs** du rapport ($z_C - z_A$ et $z_B - z_A$), l'un sous l'autre | exacte | **S1 seule** *(elle porte le modèle neuf ; S2 à S4 ne s'en servent pas)* |
| `w` | la valeur de $w$ | algébrique exacte | **S1** (révélation) · **S2** (ÉNONCÉ : le pari de S2 porte sur ce qu'on lit DANS ce $w$) · **S3** (énoncé) |
| `module-w` | $\vert w\vert$ | entier ou radical **exact** | **S2** (révélation) · **S3** (énoncé) |
| `argument-w` | $\arg(w)$ | fraction de $\pi$, dans $]-\pi;\pi]$ | **S2** (révélation) · **S3** (énoncé) |
| `longueurs` | les deux distances au sommet ($AB$ et $AC$) | radicaux exacts | **S2 seule** (révélation — c'est la PREUVE que le module est un quotient) |
| `nature` | **les CRITÈRES vérifiés à ce sommet, dans l'ordre de la table, chacun avec la valeur qui le déclenche ou qui le tue**, puis la ou les conclusions qui s'allument ; **jamais un décompte** *(réécrite en seconde passe, pédagogie IM-1 — texte exact aux douze états : §5.3 B)* | en toutes lettres, les valeurs en KaTeX | **S3 seule** (révélation) |
| `rapport-lieu` | en `mode: lieu` : $\left\vert\frac{z-z_A}{z-z_B}\right\vert$ **et** son argument, l'un sous l'autre. **Pendant le balayage, la ligne INVARIANTE du lieu reste écrite et exacte ; l'autre affiche « — »** (§6.1) | exacte | **S4 seule** (révélation) |

**Chaque lecture existe donc à au moins une étape, et chacune est employée là où elle existe.**
*La seule dérogation à « ce que l'étape découvre ou emploie » est `w`, gardé à S2 et S3 comme
ÉNONCÉ : le pari de S2 porte sur ce que $w$ contient, celui de S3 sur ce que $w$ dit selon le
sommet — dans les deux cas, cacher $w$ rendrait la consigne sans objet. **C'est déclaré, pas
silencieux.***

**`vecteurs` est la lecture qui porte le modèle neuf** : elle affiche **les deux différences**,
jamais les deux affixes. *C'est la transposition directe de la lecture double du banc de
modulation (« *là où une méthode de lecture SATURE, la scène affiche les deux lectures, l'une
sous l'autre* ») : la méthode qui sature ici est **diviser les affixes**, et elle donne le bon
résultat **exactement quand $z_A = 0$**.*

**Aucune lecture ne répète ce que le DESSIN montre déjà.** Le partage est strict et mesuré :

| ce qui vit SUR le plan (jamais dans la liste) | ce qui vit dans la LISTE (jamais sur le plan) |
|---|---|
| les trois points et leurs affixes · les **deux vecteurs** tracés depuis le sommet · l'**arc** de l'angle au sommet et son étiquette · **la longueur reportée** de S2 · **le petit carré d'angle droit** de S3 · **la fraction en toutes lettres** sur son badge · en `mode: lieu` : le cercle unité, $A$, $B$, $M$, les deux segments, et **les TROIS courbes de lieu** après la révélation *(tranché en seconde passe, pédagogie IM-2, §7.4)* | $z_C-z_A$ et $z_B-z_A$ · $w$ · $\vert w\vert$ · $\arg(w)$ · $AB$ et $AC$ · les **critères et la nature** · $\left\vert\frac{z-z_A}{z-z_B}\right\vert$ et son argument |

> **Deux marques de plan sont NEUVES depuis la vague 1 (pédagogie I1), et chacune a un motif et
> une porte.**
> - **La LONGUEUR REPORTÉE de S2.** À la révélation de S2, la longueur $AC$ est **reportée sur
>   la direction de $\vec{AB}$, depuis $A$** : un segment d'accent qui s'arrête à
>   $\frac{AC}{AB}$ du chemin vers $B$. *Motif : le premier jet livrait la moitié « module » de
>   S2 par une ligne de liste — le §5.1 le concédait lui-même (« ici aucun module lu n'est
>   comparé à $1$ sur le dessin »). **Avec la longueur reportée, « le module est un QUOTIENT »
>   se voit** : l'extrémité tombe visiblement avant $B$, et le rapport se lit à l'œil avant de
>   se lire dans la liste.* **Porte : `longueurs-au-rapport`, étendue** (§11.2).
> - **LE PETIT CARRÉ D'ANGLE DROIT de S3.** À la révélation de S3, un petit carré se pose **au
>   sommet $C$** de `demi-equilateral`, entre $\vec{CA}$ et $\vec{CB}$ — **pendant que la
>   lecture `nature`, au sommet $A$, écrit « aucune des quatre »**. *Motif : le premier jet
>   n'ajoutait RIEN au plan à la révélation de S3 ; tout y était déjà de l'encre et `nature`
>   était une phrase. **Ici le plan répond avant le texte, et il répond ailleurs que là où on
>   lisait** — ce qui EST le fait de l'étape.* **Porte : `angle-droit-marque`** (§11.2).
>
> **Chaque marque est expliquée UNE fois, dans le retour de l'étape — et par les QUATRE retours,
> pas seulement par celui du choix juste** (leçon de vague 2 de la scène sœur : *aucune marque
> inexpliquée*). **Un élève qui répond juste ne doit pas être le seul à ne pas savoir ce qu'il
> voit.**

*Une exception déclarée, la même qu'à la scène sœur : **l'étiquette de l'arc** porte la valeur
de `argument-w`. C'est le seul doublon, et il est voulu — un arc sans son nombre ne dit pas
lequel des paris est juste.*

**Ce que la scène n'affiche PAS, et il faut le dire :**
- **Aucun quotient d'affixes $\frac{z_C}{z_B}$ n'est jamais affiché**, à aucune étape. *On
  n'affiche pas un modèle faux : on le met dans un choix de pari, et le retour le réfute avec
  les nombres de l'écran.*
- **Aucune valeur de $w$ en `mode: lieu`** : là, la lecture s'appelle `rapport-lieu` et sa
  fraction est $\frac{z-z_A}{z-z_B}$, écrite sur le badge. *Deux objets, deux noms.*
- **Aucune équation de courbe** : la médiatrice, la droite et le cercle sont **dessinés et
  nommés en français**, jamais donnés par une équation cartésienne. *Ce n'est pas le rung des
  équations de lieux.*

---

## 6. Ni temps ni course — et la langue visuelle

### 6.1 `temps: false`, `course: false` — et le pari reste entier

Même régime que la scène sœur : le verdict est **immédiat**, et c'est la révélation qui fait
**répondre la scène avant le texte** (ADR 0041). `validate-content` interdit
`revele_apres_h > 0` sur une scène sans temps ; **il n'y en a aucun ici, et aucune étape n'a
d'`etat_revele`** (la révélation ne change aucun réglage : elle **ajoute** du dessin et des
lectures). §15.3.

**Comment le pari reste avant tout :**
- tant que l'élève n'a pas choisi, **le contrôle de l'étape n'existe pas dans le DOM**, ni le
  verdict, ni aucune lecture-réponse ;
- la scène montre l'**énoncé arrêté** : le repère, les points que la consigne nomme avec leurs
  affixes, le badge portant **la fraction en toutes lettres** — **et, en `mode: lieu`
  UNIQUEMENT, le cercle unité** ;
  > ⚠ *Corrigé en seconde passe (fidélité NEW-5).* Cette phrase listait encore « le cercle
  > unité » **sans condition**, alors que le §5.1, le §6.2 et le §13.8 ont tranché en vague 1
  > qu'il n'est tracé qu'en `mode: lieu`, **et que la porte `palette` exige désormais qu'un
  > cercle unité tracé en `mode: triangle` ROUGISSE SEUL** (§11.2, essai rouge n° 34).
  > **Un constructeur qui aurait suivi cette ligne aurait livré un produit que la porte de la
  > scène elle-même refuse** — le même défaut de classe que B1 : une ligne survivante qui
  > contredit la décision prise ailleurs dans le même document.
- **aucun vecteur tracé, aucun arc, aucune courbe de lieu, aucun pixel d'accent, à aucun
  moment, avant l'engagement** (§7.5) ;
- après l'engagement : les deux vecteurs se tracent, l'arc apparaît, les lectures de l'étape
  s'écrivent, et — à S4 — **les trois courbes de lieu** se dessinent (§7.4, pédagogie IM-2).

**Une exception, et une seule : le BALAYAGE de S4.** Après la révélation, un contrôle
supplémentaire fait glisser $M$ **continûment sur la courbe du lieu qui passe par le cran
courant**. Le balayage **ne pose aucun cran et ne modifie pas l'état** : au relâchement, la
scène est exactement où elle était.

> ## ⚠ BLOQUANT DE SECONDE PASSE (pédagogie BQ-1) — **le balayage n'efface que ce qui dépend de
> la POSITION. L'invariant reste ÉCRIT.**
>
> **Ce que le premier jet révisé écrivait**, et qui est faux : « *pendant ce glissement **toutes**
> les lectures chiffrées sont remplacées par « — »* », avec une porte qui exigeait « *les sept
> lectures affichent « — » et **aucun chiffre*** » et une `suite` qui se vantait de le dire
> « *sans un chiffre* ».
>
> **Ce qui a été LIVRÉ à côté**, et que j'ai cité sans le lire — `scene-plan.md:33-44`, bloc
> « Ce que la construction a changé », point 2, **la famille de porte porte déjà ce nom** :
> « ***Le BALAYAGE n'efface que ce qui dépend de la POSITION*** […] **Les invariants restent
> écrits** […] *Ils sont EXACTS à chaque position — c'est la règle même qui le garantit — et les
> voir immobiles pendant que les deux directions tournent **EST le fait de S3**. Le §6.1 effaçait
> tout pour qu'aucun décimal ne paraisse ; l'intention tient, la règle est plus fine.* »
>
> **Pourquoi c'était bloquant et non cosmétique, en trois points mesurés :**
> - **le motif du §5.4 ne couvre que la moitié positionnelle.** Sur la **médiatrice**,
>   $\vert u\vert = 1$ **exactement** en tout point du balayage ; sur le **cercle de diamètre**,
>   $\arg(u) = -\frac{\pi}{2}$ **exactement**. Seule l'autre moitié est inexacte. Et
>   `rapport-lieu` empile déjà les deux lectures « l'une sous l'autre » (§5.6) : **le partage est
>   structurellement disponible, et LAQUELLE des deux reste gelée EST le fait de S4** ;
> - **le pari de S4 est « l'ensemble des $M$ tels que $\vert u\vert = 1$ ».** Le balayage EST sa
>   vérification. Chiffres effacés, l'élève ne peut vérifier **qu'à un cran** et **jamais le long
>   du lieu** — et la `suite` devenait un jugement à l'œil sur deux segments, dans la seule scène
>   qui écrit « exacte, ou rien » ;
> - **la porte punissait le comportement correct** : l'essai n° 20 (« faire afficher un chiffre
>   pendant le balayage → rouge ») aurait rougi sur un produit construit selon la règle livrée
>   (ADR 0038).
>
> ### La règle, LIEU PAR LIEU — avec sa BORNE, sans laquelle l'invariant n'en est pas un
>
> | lieu balayé | ce qui reste **ÉCRIT**, exact, identique au caractère près | ce qui affiche **« — »** | **borne du geste**, et pourquoi elle est obligatoire |
> |---|---|---|---|
> | **médiatrice de $[AB]$** *(l'axe imaginaire)* | $\vert u\vert = 1$ | $\arg(u)$ | toute la portion visible du cadre — *$\vert u\vert$ vaut $1$ en **tout** point de la médiatrice, $z = 0$ compris ; aucune borne n'est nécessaire* |
> | **cercle de diamètre $[AB]$** | $\arg(u) = -\dfrac{\pi}{2}$ | $\vert u\vert$ | **le DEMI-cercle supérieur, $A$ et $B$ exclus.** *Sous l'axe réel, $\arg(u)$ vaut $+\frac{\pi}{2}$ : un balayage non borné ferait SAUTER l'« invariant » au milieu du geste, et enseignerait le contraire de ce qu'il montre. Les deux crans du cercle ($\sqrt3+i$, $-\sqrt3+i$) sont tous deux dans la moitié haute — vérifié §5.3 E.* |
> | **droite $(AB)$** *(l'axe réel)* | $\arg(u) = 0$ | $\vert u\vert$ | **la demi-droite $x > 2$, $B$ exclu.** *L'axe réel a TROIS morceaux : $\arg(u) = 0$ pour $x > 2$, $\arg(u) = \pi$ entre $A$ et $B$, $\arg(u) = 0$ de nouveau pour $x < -2$. Le cran `droite` est $z = 4$, donc dans le premier ; franchir $B$ change la valeur écrite.* |
>
> **Et l'affixe de $M$ peint sur le plan est POSITIONNELLE : elle s'efface pendant le geste**,
> comme les affixes de $M$ et $M'$ chez la sœur. *Les deux segments, l'arc et $M$ bougent ;
> l'étiquette d'affixe, non — elle disparaît.*
>
> **Ce que l'élève voit alors, et c'est exactement le fait de l'étape :** sur la médiatrice, les
> deux segments changent ensemble, l'arc s'ouvre et se ferme, **et la ligne du module ne bouge
> pas d'un caractère** ; sur le cercle, les deux longueurs changent, **et c'est la ligne de
> l'argument qui ne bouge pas**. **Une seule manipulation, deux invariants opposés, et dans les
> deux cas un NOMBRE EXACT qui refuse de bouger.** *Aucun cran ne peut le dire : il faut le
> continuum — et il faut que le nombre reste écrit, sans quoi le continuum ne dit rien.*
>
> **Deux autres différences avec le balayage de la scène sœur, inchangées :**
> (a) **il n'existe qu'aux crans qui SONT sur un lieu** (`mediatrice`, `cercle-1`, `cercle-2`,
> `droite`) ; **au cran `libre` ($2+4i$), le contrôle est absent du DOM** — *glisser « au
> hasard » ne montre rien* ;
> (b) au clavier il ne se relâche pas au `keyup`, et sous `prefers-reduced-motion` **rien ne
> change** — c'est une manipulation directe, pas une animation (WCAG 2.3.3 vise le mouvement
> déclenché, pas celui qu'on tient).
>
> **Conséquences de porte, toutes refaites (§11.2, §11.4) :** la famille `balayage-invariants` se
> mesure **dans quatre sens et LIEU PAR LIEU** — l'invariant tenu, le positionnel effacé, le
> mouvement réel, la borne respectée — **et le sabotage qui compte le plus est désormais
> l'inverse de celui que le premier jet armait : effacer AUSSI l'invariant doit rougir.**

**Éclairs et mouvement réduit.** Hors balayage, rien n'anime : la famille `eclairs` est
**attendue structurellement vide**, et **mesurée quand même** (ADR 0036 : *une chose n'est
prouvée absente que si l'on a énuméré ses formes*). **Aucune trace entre étapes** ; **aucune
VUE** (scène plane).

### 6.2 La langue visuelle (DESIGN-BIBLE §0, §5, §7 ; ADR 0041 §4)

- **À l'ENCRE — c'est l'ÉNONCÉ** : les deux axes et leurs noms, les graduations entières, $O$,
  **les trois points avec leurs noms et leurs affixes**, et le **badge portant la fraction**
  ($w = \frac{z_C-z_A}{z_B-z_A}$, réécrite par le contrôle `sommet`). En `mode: lieu` :
  **le cercle unité** (et là seulement, §5.1), $A$, $B$, $M$ et leurs affixes, et le badge
  $\frac{z-z_A}{z-z_B}$.
- **À l'ACCENT — et seulement après la révélation** : les **deux vecteurs** tracés depuis le
  sommet (deux flèches), l'**arc** de l'angle **au sommet** et son étiquette, **la longueur
  reportée** (S2), **le petit carré d'angle droit** (S3), les lectures de l'étape, et — à S4 —
  la **courbe du lieu**.
- **L'ARC EST TRACÉ AU SOMMET, ENTRE LES DEUX VECTEURS — JAMAIS DEPUIS L'AXE RÉEL.** *C'est la
  règle de rendu la plus lourde de cette scène : un arc parti de l'axe réel serait la
  misconception `angle-lu-depuis-l-axe` posée dans le pixel. La scène sœur a déjà armé cette
  porte (`arc-entre-les-bonnes-directions`) ; ici le sabotage correspondant est le plus
  important de la campagne (§11.4, n° 5).*
- **L'arc est dessiné à un rayon FIXE**, indépendant de $AB$ et $AC$ (`rayonArc`,
  `plan-complexe-rendu.ts:89`) — sinon il serait invisible sur `demi-equilateral` au sommet $C$
  et démesuré sur `aligne`. **C'est une exagération, elle est constante, et le `fit_caveat` la
  dit** (§10.4).
- **Les deux vecteurs sont deux FLÈCHES, et la flèche du DÉNOMINATEUR est distinguée de celle
  du NUMÉRATEUR** (trait plus épais pour le dénominateur, comme la référence d'un rapport).
  *Motif : le pari de S1 porte exactement sur quelle fraction on forme ; si les deux flèches
  sont identiques, le dessin ne distingue pas $w$ de $\frac1w$.* **Famille de porte
  `numerateur-denominateur-distincts`.**
  ⚠ **La convention est DITE, une fois, dans la consigne de S1** (vague 1, pédagogie I6). *Le
  premier jet ne l'expliquait que dans le retour du choix `ordre-inverse` — donc **jamais pour
  l'élève qui répond juste**, qui héritait d'une marque inexpliquée pour les trois étapes
  suivantes. La consigne est le seul endroit que tout le monde lit. Écrire des étiquettes
  « numérateur » / « dénominateur » à côté des flèches serait plus direct, mais ferait passer le
  budget d'étiquettes de cinq à sept à S1 (ci-dessous) : la consigne est retenue.*
- **Quand deux points coïncident au pixel près**, une seule étiquette est tracée. *Cas réel :
  `aligne` au placement `origine`, où $C(-2)$, $A(0)$ et $B(4)$ sont sur une droite mais
  distincts — **aucun état de la grille ne superpose deux points**, et la porte le vérifie
  (écart $\ge 8$ px aux 48 + 5 états).*
- **Aucune teinte hors jetons** (`lib/jetons-figure.ts`, relue au changement de thème) ; **le
  quadrillage se peint OPAQUE** (règle du banc de modulation) ; **tous les nombres passent par
  KaTeX** ($\sqrt3$, $\frac{\pi}{6}$, $\vec{AB}$, $z_C$, $\vert w\vert$).
- **Les étiquettes se posent avec `disposer`, jamais `poser`** — **obligatoire ici** : trois
  points, un arc, un badge et jusqu'à trois nombres d'axes peuvent tomber dans le même
  voisinage. **Budget : au plus SIX étiquettes HTML simultanées** ($A$, $B$, $C$, l'angle, le
  badge, un nom d'axe) ; **sous 600 px, les nombres des axes passent de tous les $1$ à tous les
  $2$** et les noms d'axes sont retirés. *Mesuré aux deux largeurs.*
  ⚠ **LE PIRE CAS EST S3, ET IL S'EST AGGRAVÉ EN VAGUE 1 — déclaré plutôt que découvert.**
  `demi-equilateral` au placement `retournee` a ses trois points dans une boîte de
  $4 \times 1{,}73$ unités ($z_A = 4+4i$, $z_B = 4i$, $z_C = 1+(4-\sqrt3)i$), **et S3 y ajoute
  désormais le petit carré d'angle droit en $C$**. *Le carré n'est PAS une étiquette HTML (il est
  peint sur le canvas), donc le budget de six tient ; mais il occupe des pixels dans le
  voisinage le plus encombré de la scène.* **La porte `etiquettes` doit être lancée
  spécifiquement sur l'état de S3 après révélation, aux deux largeurs**, et le carré compte
  comme obstacle de placement (§11.2). *Si la mesure montre un chevauchement irréductible à
  390 px, le repli est de passer S3 au placement `posee` — même forme, même arithmétique, même
  boîte, mais plus de place autour.*

---

## 7. Les quatre étapes

**Le sommet → les deux lectures → la table → le point qui bouge.**
Notation : `⟂-avant-pari` = ce qui doit être **absent du DOM et du rendu** tant que l'élève n'a
pas parié.

### 7.1 S1 — `depuis-quel-point` · « Depuis quel point mesure-t-on ? »

- **État :** `forme: "rect-isocele"`, `position: "posee"`, `sommet: "A"`, `mode: "triangle"`.
  ⟹ $z_A = -2+2i$, $z_B = 2+2i$, $z_C = -2+6i$.
- **Contrôle ouvert :** `position` (**neuf**). **Lectures :** `vecteurs`, `w`.
- **Consigne (voix) :** « Trois points : $A$ en $-2+2i$, $B$ en $2+2i$, $C$ en $-2+6i$. On va
  s'intéresser à un seul nombre, celui que le badge écrit :
  $w = \dfrac{z_C - z_A}{z_B - z_A}$. Quand tu auras répondu, deux flèches apparaîtront : la
  plus épaisse est celle du **dénominateur**. »
  > *Deux changements de vague 1 dans cette seule consigne.* **(a) La phrase « Regarde bien ce
  > qu'il y a au numérateur et au dénominateur — ce ne sont pas les affixes des points » est
  > RETIRÉE** : elle **prévenait l'élève contre `w-sommet-ignore` avant qu'il ne parie**, donc
  > elle clôturait le modèle que S1 existe pour attraper *(pédagogie, réponse à la question 1 :
  > « le stem met la misconception hors d'atteinte à l'avance »)*. **(b) La convention de la
  > flèche épaisse est DITE ici** (pédagogie I6) : elle n'était expliquée que dans le retour du
  > choix `ordre-inverse`, c'est-à-dire jamais pour qui répond juste.
- **Pari :** « Que vaut $w$ ? »

| choix | texte | juste | misconception | retour (casse sur SA conséquence) |
|---|---|---|---|---|
| `vecteurs` | $i$ | **oui** | — | « Oui. $z_C - z_A = 4i$ et $z_B - z_A = 4$ : **ce sont les deux vecteurs issus de $A$**, pas les deux affixes. $\dfrac{4i}{4} = i$. Et retiens le mécanisme, pas le résultat : la soustraction $-\,z_A$ est ce qui fait partir la mesure **de $A$**. Sans elle, on mesurerait depuis l'origine — qui n'est nulle part dans cette figure. » |
| `affixes` | $1+2i$ — on divise les affixes : $\dfrac{z_C}{z_B} = \dfrac{-2+6i}{2+2i}$ | non | **`w-sommet-ignore`** *(modèle neuf, §8.2 — face A)* | « $\dfrac{z_C}{z_B}$ est un vrai rapport, mais il part de $O$, pas de $A$ : c'est le rapport qu'on lirait si l'origine était un sommet de la figure. **Et voici sa conséquence, vérifie-la :** promène la figure sur les quatre placements. **Ton nombre change à chaque fois — et le triangle, lui, ne change pas de forme.** Un nombre qui bouge quand la figure ne fait que se déplacer ne peut rien dire de sa forme. Le badge écrit $\dfrac{z_C - z_A}{z_B - z_A}$, et lui ne bouge pas. » |
| `demi-soustraction` | $1+i$ — on retire $z_A$ au numérateur, pas au dénominateur : $\dfrac{z_C - z_A}{z_B}$ | non | **`w-sommet-ignore`** *(face A, forme « à moitié »)* | « Le geste est bon au numérateur et abandonné au dénominateur. Regarde les deux flèches : elles partent **toutes les deux** de $A$. Celle que tu as gardée part de $A$ ; celle que tu as laissée part de $O$. Deux flèches qui ne partent pas du même point ne se comparent pas — et ton nombre, lui aussi, change dès qu'on déplace la figure. » |
| `ordre-inverse` | $-i$ — on écrit $\dfrac{z_B - z_A}{z_C - z_A}$ | non | **`produit-quotient-argument-operation`** *(forme PRÉ-ARGUMENT, déclarée : §8.1, note M7)* | « Tu as retourné la fraction. Le badge dit laquelle des deux flèches est au **dénominateur** : la plus épaisse, celle qui va vers $B$. Ta fraction donne $\dfrac{4}{4i} = -i$, pas $i$ : ce n'est pas le même nombre. **Les deux fractions sont utiles, et le bac écrit celle qui raccourcit le calcul** — mais il faut savoir laquelle on a écrite, parce que ce qu'on lira dessus n'est pas pareil. » |

> **Le retour `ordre-inverse` a été refait en vague 1 (fidélité I1).** Il finissait par « *Le
> sens de lecture fait partie de la définition, il ne se choisit pas.* » — **c'est faux de
> l'examen** : `bank.yaml:656` et `:1204` écrivent tous deux l'ordre contraire à la règle de
> génération du badge (§5.2 C). La phrase est remplacée par ce qui est vrai : **les deux
> fractions se lisent, mais pas de la même façon.** *Ce que ça change précisément — le rapport
> des longueurs s'inverse, le signe de l'angle change, la conclusion ne bouge pas — est dit à
> S2, où le mot « angle » est autorisé.*

- **`suite` (une question, un geste — 29 mots) :** « **Reprends les quatre placements, un par
  un.** Une seule rend juste le raccourci « je divise les affixes » : laquelle, et qu'a-t-elle
  de particulier ? »
  > *Reformulée en seconde passe (pédagogie, MINEUR 7).* Elle ouvrait sur « **Promène la figure
  > sur les quatre placements** » — **les mots exacts que le retour `affixes` venait de
  > prescrire** (« *promène la figure sur les quatre placements* »). *L'intention était bonne —
  > voir le nombre changer, puis chercher l'exception — mais lus à la suite, les deux phrases
  > se lisent comme une répétition, et un élève qui vient de faire le geste croit avoir déjà
  > répondu. **« Reprends » dit que c'est le MÊME geste avec une AUTRE question.***
  *Réponse vérifiée : **Placement 1**, et il y marche **parce que $z_A = 0$, donc $z_C - z_A$
  EST $z_C$**. **C'est exactement la position des quatre objets diagnostiques de R6** (fait
  **c** du §0.1), et la `suite` la fait TROUVER au lieu de la dénoncer.*
  > **Changé en vague 1 (pédagogie I4) :** la `suite` en comptait deux (« sur combien $w$
  > change-t-il ? » **et** « trouve le placement où le raccourci marche »). La première question
  > est **absorbée par le retour `affixes`**, qui en avait besoin pour casser sur une
  > conséquence (I10) ; **la `suite` ne garde que la seconde**, une question et un geste.
  > ⚠ **Et la réponse de cette `suite` n'existe que dans ce document.** Le descripteur n'a pas
  > de champ « réponse » (vérifié sur le JSON livré de la scène sœur). **Elle doit donc être
  > FERMÉE pour l'élève par la prose**, et c'est un livrable : §4.3 point 3 ci-dessous.
- **⟂-avant-pari :** les deux flèches ; l'arc ; les lectures `vecteurs` et `w` ; le verdict ;
  **tout pixel d'accent** (mesuré en **chrominance**) ; et la description lue au lecteur
  d'écran ne contient ni « $i$ », ni « quart de tour », ni « vecteur ».

### 7.2 S2 — `deux-lectures` · « Deux nombres, deux lectures »

- **État :** `forme: "demi-equilateral"`, `position: "tournee"`, `sommet: "A"`,
  `mode: "triangle"`. ⟹ $z_A = 2-3i$, $z_B = 2+i$, $z_C = 2-\sqrt3$.
> ## ⚠ S2 EST RECONSTRUITE EN VAGUE 1 — trois constatations convergentes (B3, I2, I3)
>
> **Ce que le premier jet faisait :** la consigne **donnait** $\vert w\vert = \frac{\sqrt3}{2}$
> et $\arg(w) = \frac{\pi}{6}$, et le pari demandait de les **apparier** à des étiquettes
> (« quotient », « angle »). Trois défauts, chacun fatal :
> - **B3 — le distracteur du seul modèle que S2 prétend casser portait sa propre réfutation** :
>   « *$\frac{\sqrt3}{2}$ serait la longueur $AC$ (**soit $2\sqrt3$**)* ». L'option annonçait
>   « $\frac{\sqrt3}{2}$ est $AC$, et $AC$ vaut $2\sqrt3$ ». **Personne ne peut s'engager
>   là-dessus** ; le modèle était nommé, pas confrontable.
> - **I2 (pédagogie) — rien n'était prédit.** « *La question n'est pas de les calculer — ils
>   sont là* » : le pari se gagnait par élimination de formulations. Et les options n'étaient pas
>   parallèles (trois attribuaient un sens aux **deux** nombres, une seule à un).
> - **I3 (pédagogie) — la `suite` instruisait la fuite** : elle envoyait l'élève sur la forme
>   `equilateral` lire $\vert w\vert = 1$, c'est-à-dire l'état et le nombre du pari de S3.
>
> **Ce que S2 fait désormais** (forme éprouvée de la scène sœur) : **elle parie un COUPLE DE
> VALEURS**, quatre options structurellement parallèles (un module, un argument), **et la
> SIGNIFICATION arrive à la révélation**, portée par deux preuves visibles — les deux longueurs
> écrites et **la longueur reportée** sur la direction de $\vec{AB}$ (§5.6, pédagogie I1).

- **Contrôle ouvert :** `forme` (**neuf**). *`position` n'est ouvert qu'à S1 — motif mesuré au
  §7.5 A.* **Lectures :** `w` (ÉNONCÉ) ; à la révélation : `module-w`, `argument-w`,
  `longueurs`. *`vecteurs` n'existe pas à S2 : S2 ne la découvre ni ne l'emploie (§5.6,
  pédagogie I5) — les deux flèches, elles, sont sur le plan.*
- **Les nombres :** $\vec{AB} = 4i$ · $\vec{AC} = -\sqrt3+3i$ · $w = \dfrac{3+\sqrt3\,i}{4}$ ·
  $\vert w\vert = \dfrac{\sqrt3}{2}$ · $\arg(w) = \dfrac{\pi}{6}$ · $AB = 4$ · $AC = 2\sqrt3$.
  *Vérifications : $\vec{AC} = i(3+\sqrt3 i) = 3i - \sqrt3$ ✓ ; $\frac{-\sqrt3+3i}{4i} =
  (-\sqrt3+3i)\left(-\frac{i}{4}\right) = \frac{\sqrt3\,i + 3}{4}$ ✓ ; $\vert -\sqrt3+3i\vert =
  \sqrt{3+9} = 2\sqrt3$ ✓ ; $\frac{2\sqrt3}{4} = \frac{\sqrt3}{2}$ ✓ ; $\vert w\vert^{-1} =
  \frac{2}{\sqrt3} = \frac{2\sqrt3}{3}$ ✓.*
- **Pourquoi CE placement, et pas un autre — c'est une décision mesurée.** Au placement
  `tournee`, $\vec{AB} = 4i$ : **le côté de référence n'est PAS horizontal.** Du coup
  $\arg(\vec{AC}) = \dfrac{2\pi}{3} \neq \dfrac{\pi}{6} = \arg(w)$, et le distracteur
  `valeurs-absolues` est **séparable**. *À `origine`, $\vec{AB} = 4$ est sur l'axe réel, donc
  $\arg(\vec{AC}) = \arg(w)$ : le distracteur atteindrait la bonne valeur — une contamination
  de la réponse juste, donc un défaut de stem. **C'est le même piège qu'à S3 de la scène sœur,
  et c'est pour l'éviter que `position` n'est pas ouvert ici.***
- **Consigne (voix) :** « Nouveau triangle, et il est posé de travers exprès. La scène a déjà
  formé le rapport : $w = \dfrac{3+\sqrt3\,i}{4}$. Dans ce seul nombre, il y en a deux — son
  **module** et son **argument**. Avant de les lire : que valent-ils ? »
- **Pari :** « $\vert w\vert$ et $\arg(w)$ valent… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `quotient-et-ecart` | $\vert w\vert = \dfrac{\sqrt3}{2}$ et $\arg(w) = \dfrac{\pi}{6}$ | **oui** | — | « Oui — et regarde ce que la scène vient d'ajouter au dessin : $AC$ **reporté** sur la direction de $\vec{AB}$. **Il n'atteint pas $B$** : il s'arrête à $\dfrac{\sqrt3}{2}$ du chemin. **Le module n'est pas une longueur : c'est une longueur RAPPORTÉE à une autre**, $\dfrac{AC}{AB} = \dfrac{2\sqrt3}{4}$ — **un nombre sans unité.** Et l'arc, lui, part de $\vec{AB}$ et arrive à $\vec{AC}$ : **un écart de directions, pas une direction** — la règle du chapitre 4, $\arg\!\left(\frac{z}{z'}\right) = \arg z - \arg z'$. » |
| `valeurs-absolues` | $\vert w\vert = 2\sqrt3$ et $\arg(w) = \dfrac{2\pi}{3}$ | non | **`angle-lu-depuis-l-axe`** *(texte à ÉLARGIR avant validation : §8.2 bis)* | « Ces deux nombres existent, et la scène vient de les montrer — mais ce ne sont pas ceux de $w$ : $2\sqrt3$ est la longueur $AC$ toute seule, et $\dfrac{2\pi}{3}$ la direction de $\vec{AC}$ comptée depuis l'axe réel. **Aucun des deux ne regarde $\vec{AB}$.** Or $w$ est un rapport : son module compare $AC$ **à $AB$**, son argument compare la direction de $\vec{AC}$ **à celle de $\vec{AB}$**. C'est pour ça que déplacer ou tourner le triangle ne change pas $w$, alors que tes deux nombres, eux, tournent avec lui. » |
| `roles-echanges` | $\vert w\vert = \dfrac{\pi}{6}$ et $\arg(w) = \dfrac{\sqrt3}{2}$ | non | **`lecture-w-module-argument`** | « Les deux bons nombres, échangés. Un ordre de grandeur suffit à le voir : un angle de $\dfrac{\sqrt3}{2}$ radian fait environ $50°$, et l'arc que la scène vient de tracer en fait $30$. Le **module** compare deux longueurs ; l'**argument** est un angle. Ils ne sont pas interchangeables. » |
| `fraction-retournee` | $\vert w\vert = \dfrac{2\sqrt3}{3}$ et $\arg(w) = -\dfrac{\pi}{6}$ | non | **`produit-quotient-argument-operation`** | « Ce sont les deux nombres de $\dfrac1w$ — tu as lu la fraction à l'envers. **Et c'est instructif : retourner la fraction RETOURNE le rapport des longueurs** ($\dfrac{AB}{AC}$ au lieu de $\dfrac{AC}{AB}$) **et CHANGE LE SIGNE de l'angle** ($-\dfrac{\pi}{6}$ au lieu de $\dfrac{\pi}{6}$, l'angle $(\vec{AC},\vec{AB})$ au lieu de $(\vec{AB},\vec{AC})$). Le badge écrit laquelle des deux tu regardes ; l'arc part du dénominateur. » |

> **Les quatre options sont structurellement parallèles** (un module, puis un argument) et
> **aucune ne contient le nombre qui la réfute** (§14.0, clause (d) neuve). **Chacune se
> recalcule depuis le modèle que son étiquette nomme :** $2\sqrt3 = AC$ et $\frac{2\pi}{3} =
> \arg(\vec{AC})$ se lisent sur le dessin sans jamais regarder $\vec{AB}$ ; l'échange est
> l'échange ; $\frac{2\sqrt3}{3}$ et $-\frac{\pi}{6}$ sont exactement $\vert\frac1w\vert$ et
> $\arg\frac1w$. **Les quatre couples sont deux à deux distincts** ✓.
>
> ⚠ **Deux mots changés dans le retour juste, en seconde passe (pédagogie, MINEURS 2 et 4).**
> *(i)* Il disait « *Il s'arrête **bien avant** $B$* » — **or le report tombe à
> $\frac{\sqrt3}{2} \approx 0{,}87$ de $AB$**, soit $2\sqrt3$ contre $4$ : à $1\,280$ px c'est
> **$\approx 17$ px** avant $B$. *Le rapport proche de $1$ est exactement le cas que le §2.2
> raison 2 dit indiscernable ; le retour survendait ce que le pixel montre.* **Il dit maintenant
> « il n'atteint pas $B$ », qui est vrai et vérifiable ;** la `suite` fait ensuite voir le cas
> franc (Triangle 4, rapport $\frac12$). *(ii)* La locution « **un nombre sans unité** » est
> **ajoutée** : le §7.5 C note (b) certifiait déjà que le retour la contenait — **elle n'y était
> pas.** *J'ai choisi de rendre la note VRAIE plutôt que de la corriger : la formule est bonne,
> c'est le texte qui lui manquait.* **C'est le motif B2 en miniature — une table qui décrit les
> textes au lieu d'être passée sur eux.**
>
> **Ce que le pari NE teste pas, et c'est assumé :** un élève qui calcule correctement
> $\left\vert\frac{3+\sqrt3 i}{4}\right\vert$ gagne sans rencontrer aucun modèle. *C'est la
> définition d'un bon diagnostic : la bonne méthode passe, et chacune des trois mauvaises mène
> à une case distincte.* **Le distracteur `valeurs-absolues` n'est atteignable QUE par le
> dessin** — c'est sa signature.

- **`suite` (une question, un geste — 24 mots) :** « **Change de triangle.** Sur lequel les deux
  longueurs sont-elles le plus différentes ? Lis-les, ne les devine pas. »
  *Réponse : **Triangle 4**, $AB = 4$ et $AC = 2$, module $\frac12$ (§5.3 C).*
  > **Changé en vague 1 (pédagogie I3 + I4).** La première question (« sur combien le module
  > vaut-il exactement $1$ ? ») est **supprimée** : elle envoyait lire l'état de S3 tel qu'il
  > était alors, et donnait la moitié de son retour correct. *Le déplacement du pari de S3
  > (correctif B4) aurait suffi à la rendre inoffensive ; elle part quand même, parce qu'une
  > `suite` = une question et un geste (`HANDOFF.md:16448`).*
- **⟂-avant-pari :** l'**arc** et son étiquette ; **la longueur reportée** ; les lectures
  `module-w`, `argument-w`, `longueurs` ; le verdict ; tout pixel d'accent ajouté par rapport à
  l'état d'énoncé. *Sont à l'ENCRE : les trois points et leurs affixes, **les deux flèches**, le
  badge, et **la lecture `w`** — la consigne la donne.*
  > **Une simplification de vague 1 :** le premier jet faisait de $\vert w\vert$ et $\arg(w)$ des
  > valeurs d'ÉNONCÉ, donc une exception au contrat « rien de la réponse avant le pari ».
  > **Elles sont maintenant la RÉPONSE** : l'exception S2 du §7.5 **rétrécit aux deux flèches et
  > à la lecture `w`**, qui sont l'énoncé. *La moitié dangereuse de l'exception disparaît, et
  > c'est celle qui portait les deux nombres du pari.*

### 7.3 S3 — `depuis-quel-sommet` · « Rectangle — mais depuis où ? »

> ## ⚠ BLOQUANT DE VAGUE 1 (pédagogie B4) — le pari de S3 REJOUAIT un item existant, et le fait
> que la scène existe pour porter était relégué dans une `suite` non pariée.
>
> **Ce que le premier jet pariait :** `equilateral` × `retournee`, $\vert w\vert = 1$,
> $\arg(w) = \frac{\pi}{3}$, question « le triangle $ABC$ est… », options *équilatéral /
> isocèle seul / rectangle / rien*.
> **Ce que `items.yaml:551-601` (NBCOMPLEX2-6, rung R6) contient déjà**, vérifié ligne à ligne :
> le même $\vert w\vert = 1$, le même $\arg(w) = \frac{\pi}{3}$, la même conclusion, et les
> options *équilatéral / rectangle en $A$ / alignés / isocèle en $A$ seul* — **le premier jet en
> était l'union avec celles de `cp-r6-lecture-w` (`checkpoints.yaml:302-341`)**. Son retour
> correct reproduisait mot pour mot l'argument de `items.yaml:589-596`, **celui-là même que le
> §4.3 demande à content-author de déplacer en prose**.
> **Et pendant ce temps**, le fait que ce document appelle lui-même « **le fait le plus important
> de la scène** » — *la nature est une propriété du COUPLE (triangle, sommet)* — vivait dans une
> `suite` de 62 mots, sans pari, sans verdict, et sans réponse visible pour l'élève.
> **Le pari de S3 est donc déplacé dessus.** *La table de doublon qui aurait dû être faite pour
> S1–S3 dès le premier jet — et qui ne l'avait été que pour S4 — est au §7.6.*

- **État :** `forme: "demi-equilateral"`, `position: "retournee"`, `sommet: "A"`,
  `mode: "triangle"`. ⟹ $z_A = 4+4i$, $z_B = 4i$, $z_C = 1+(4-\sqrt3)i$.
- **Contrôle ouvert :** `sommet` (**neuf**), **et lui seul**. *`forme` et `position` ne sont
  plus rouverts — la `suite` réduite n'en a plus besoin (§5.5, pédagogie I5).*
  **Lectures :** `w`, `module-w`, `argument-w` (ÉNONCÉ) ; à la révélation : **`nature`**.
- **Les nombres, au sommet $A$ :** $\vec{AB} = -4$ · $\vec{AC} = -3-\sqrt3\,i$ ·
  $w_A = \dfrac{3+\sqrt3\,i}{4}$ · $\vert w_A\vert = \dfrac{\sqrt3}{2}$ ·
  $\arg(w_A) = \dfrac{\pi}{6}$ · $AB = 4$ · $AC = 2\sqrt3$.
  **Au sommet $C$ :** $w_C = \dfrac{\sqrt3}{3}i$ — **imaginaire pur** ⟹ **rectangle en $C$**.
  **Au sommet $B$ :** $w_B = \dfrac{1-\sqrt3\,i}{4}$, module $\dfrac12$, argument
  $-\dfrac{\pi}{3}$ ⟹ **aucune ligne**.
  *Vérifications : $z_B - z_A = 4i - 4 - 4i = -4$ ✓ ; $z_C - z_A = 1+(4-\sqrt3)i-4-4i =
  -3-\sqrt3 i$ ✓ ; $\frac{-3-\sqrt3 i}{-4} = \frac{3+\sqrt3 i}{4}$ ✓ ;
  $\vert -3-\sqrt3 i\vert = \sqrt{9+3} = 2\sqrt3$ ✓. Les trois sommets : table du §5.3 B, ligne
  `demi-equilateral`.*
- **Consigne (voix) :** « Encore un autre triangle, encore ailleurs, encore retourné. Depuis
  $A$, tu lis $\vert w\vert = \dfrac{\sqrt3}{2}$ et $\arg(w) = \dfrac{\pi}{6}$ : ni $1$, ni un
  quart de tour. **Maintenant regarde le triangle lui-même, pas seulement les deux nombres.** »
- **Pari :** « Ce triangle est-il rectangle — et si oui, en quel sommet ? »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `rectangle-en-C` | **Oui — rectangle en $C$.** | **oui** | — | « Oui. Le petit carré que la scène vient de poser est **en $C$** — et regarde ce qu'elle a écrit **en $A$** : $\vert w\vert = \dfrac{\sqrt3}{2}$, qui n'est pas $1$, et $\arg(w) = \dfrac{\pi}{6}$, qui n'est ni $0$, ni $\pi$, ni un quart de tour. **Rien ne s'y allume.** Change de sommet et lis : $w_C = \dfrac{\sqrt3}{3}\,i$, imaginaire pur, donc **angle droit en $C$**. Ce que la table classe, ce n'est pas un triangle : c'est un **couple (triangle, sommet)**. » |
| `aucune-ligne` | **Non, il n'est rectangle nulle part** : lu depuis $A$, $w$ n'est ni réel ni imaginaire pur, et son module ne vaut pas $1$. | non | **`w-sommet-ignore`** *(face B — la lecture non indexée, §8.2)* | « Tout ce que tu as lu est juste — **et tu l'as lu à un seul endroit.** $w$ sans sommet n'existe pas : le badge écrit $\dfrac{z_C-z_A}{z_B-z_A}$, c'est-à-dire le rapport **au sommet $A$**. « Rien au sommet $A$ » ne veut pas dire « rien ». La preuve est déjà sur le dessin : le petit carré s'est posé **en $C$**. Change de sommet, et le nombre change avec lui — les critères que la lecture vérifie aussi. » |
| `rectangle-partout` | **Oui, il est rectangle** — et le sommet n'y est pour rien : une fois qu'un triangle est rectangle, il l'est, quel que soit le sommet depuis lequel on forme $w$. | non | **`w-sommet-ignore`** *(face B, dans l'autre sens)* | « La première moitié est juste : le triangle **est** rectangle, et le petit carré est là, en $C$. La seconde ne l'est pas, et elle coûte cher à l'examen. Le rapport que tu formes **dépend du sommet que tu choisis** : au sommet $A$ il vaut $\dfrac{3+\sqrt3\,i}{4}$, au sommet $C$ il vaut $\dfrac{\sqrt3}{3}\,i$ — deux nombres différents, deux lectures différentes. **Le triangle a UN angle droit ; le critère « imaginaire pur » ne se vérifie qu'au sommet où cet angle se trouve.** Change de sommet et regarde les critères s'allumer, ou pas. » |
| `rectangle-en-A` | **Oui — rectangle en $A$**, puisque l'argument de $w$ n'est pas nul. | non | **`lecture-w-module-argument`** *(face « bonne grandeur, mauvais seuil » — texte à ÉLARGIR avant validation : §8.2 ter)* | « « Rectangle » ne correspond pas à « argument non nul » : il correspond à **$\pm\dfrac{\pi}{2}$ exactement**, c'est-à-dire à un $w$ **imaginaire pur**. Ici l'argument vaut $\dfrac{\pi}{6}$, soit $30°$ — l'arc est sous tes yeux, en $A$, et il n'est pas droit. Le petit carré, lui, s'est posé ailleurs. **Tu regardes la bonne grandeur ; c'est le seuil qui est faux.** Chaque ligne de la table demande une valeur **précise**, pas « différente de zéro ». » |

> **Les quatre retours nomment le petit carré**, parce que c'est la marque neuve de l'étape et
> qu'aucune marque ne reste inexpliquée — **y compris pour l'élève qui répond juste** (leçon de
> vague 2 de la scène sœur). **Deux choix sur quatre disent « rectangle » :** la discrimination
> ne porte pas sur le fait, elle porte sur **l'indexation**, qui est le sujet de l'étape.
> **Ce que le dessin donne et ce qu'il ne donne pas :** un élève attentif VOIT l'angle droit en
> $C$ (et l'a peut-être vu dès S2, §5.2 A) — donc il élimine `aucune-ligne` et `rectangle-en-A`
> **par le dessin**. **Il ne peut pas départager `rectangle-en-C` de `rectangle-partout` par le
> dessin** : c'est là que se joue le pari, et c'est exactement le fait neuf.
>
> ## ⚠ `rectangle-partout` EST RÉÉCRIT EN SECONDE PASSE (pédagogie IM-3)
>
> **Ce qu'il disait :** « *Oui — et donc **rectangle aux trois sommets** : être rectangle est une
> propriété du triangle, pas du point d'où on le regarde.* » **Défaut mesuré : lue comme de la
> géométrie, cette phrase affirme un angle droit EN $A$ — que l'arc déjà tracé en $A$ réfute
> avant le pari** (l'arc est à l'ENCRE à S3, §7.5) **et que la consigne réfute aussi** (« ni $1$,
> ni un quart de tour »). *Lue comme une phrase sur les LECTURES, c'est bien la misconception —
> mais c'est alors une phrase qu'aucun élève ne compose.* **Et la défense du pari écrite juste
> au-dessus — « il ne peut pas départager `rectangle-en-C` de `rectangle-partout` par le
> dessin » — était fausse sous la première lecture.**
>
> **Ce qu'il dit désormais** ne fait qu'une affirmation vraie (« il est rectangle ») et une
> fausse, **qui est exactement la croyance tenue** : *le verdict appartient au triangle, le
> sommet n'est qu'un point de vue.* **Aucune encre d'avant-pari ne la réfute** — il faut changer
> de sommet, c'est-à-dire faire le geste de l'étape. *Et la clause (d) du §14.0, élargie du
> NOMBRE au FAIT (§14.0), est ce qui aurait attrapé l'ancienne version.*

- **`suite` (une question, un geste — 29 mots) :** « **Change de sommet, et lis les critères.**
  Au sommet $B$, l'argument vaut $-\dfrac{\pi}{3}$ — l'angle même de la ligne « équilatéral ».
  Qu'est-ce qui, à lui seul, interdit cette ligne ? »
  *Réponse vérifiée : **le module**, $\vert w\vert = \dfrac12 \neq 1$ — la ligne « équilatéral »
  demande les DEUX (§5.3 B, ligne `demi-equilateral` · $B$).*
  > **Changé en vague 1 (pédagogie I4/I5), puis RECONSTRUIT en seconde passe (IM-1 + MINEUR 6).**
  > *En vague 1* : le premier jet en comptait trois temps, dont l'un portait le fait désormais
  > parié et un autre l'affirmation « le signe dépend du sommet », que la fidélité I1 a montrée
  > dépendante de la convention de badge (§5.2 C).
  > *En seconde passe* : la version de vague 1 (« **À combien des trois une ligne de la table
  > s'allume-t-elle ?** ») avait **deux** défauts. **(a)** Elle demandait de compter dans un
  > ensemble — « une ligne de la table » — que l'élève n'a jamais vu (IM-1). **(b)** Sa réponse
  > était **déjà imprimée par un retour de sa propre étape** : `rectangle-partout` écrivait
  > « *au sommet $A$ […] aucune des quatre ; au sommet $B$ aussi* » (MINEUR 6). **La nouvelle
  > `suite` n'est écrite dans aucun retour**, elle porte sur le quasi-succès le plus instructif
  > de la scène — *le même $-\frac{\pi}{3}$ que la ligne « équilatéral » demande* —, et **elle
  > n'est répondable qu'en lisant les critères que la nouvelle `nature` écrit.** *Elle transforme
  > une question de comptage en une question de critère : c'est le geste du bac.*
- **⟂-avant-pari :** la lecture **`nature`** ; **le petit carré d'angle droit** ; le contrôle
  `sommet` ; le verdict ; tout pixel d'accent ajouté. *Sont à l'ENCRE : les trois points et
  leurs affixes, les deux flèches, **l'arc en $A$ et son étiquette**, le badge, et les lectures
  `w`, `module-w`, `argument-w` — la consigne donne les deux nombres, et S2 a construit leur
  sens.* **`nature` et le carré attendent, parce qu'ils SONT la réponse.**

### 7.4 S4 — `le-point-qui-bouge` · « Et si c'était le point de lecture qui se déplaçait ? »

- **État :** `mode: "lieu"`, `pointM: "libre"`. ⟹ $z_A = -2$, $z_B = 2$, $z_M = 2+4i$.
  *En `mode: lieu`, les contrôles `position`, `forme` et `sommet` sont **absents du DOM**.*
- **Contrôle ouvert :** `pointM` (**neuf**) ; **et `balayage`**, ouvert **après la révélation**
  et **seulement aux crans qui sont sur un lieu** (§6.1). **Lecture :** `rapport-lieu`.
- **Les nombres :** $u = \dfrac{z-z_A}{z-z_B} = \dfrac{z+2}{z-2}$ ; au cran `libre`,
  $u = 1-i$, $\vert u\vert = \sqrt2$, $\arg(u) = -\dfrac{\pi}{4}$, $MA = 4\sqrt2$, $MB = 4$
  (§5.3 E, vérifié).
- **Consigne (voix — ~70 mots) :** « On renverse la question. Ici **deux** points sont fixes —
  $A$ en $-2$, $B$ en $2$ — et c'est **$M$ qui est l'inconnue**. On appelle $u$ le rapport lu
  **au sommet $M$** : $u = \dfrac{z - z_A}{z - z_B}$. *(Les deux flèches arrivent en $M$ au lieu
  d'en partir : les retourner ajoute $\pi$ aux deux directions, et l'écart ne bouge pas.)* Pour
  le $M$ à l'écran, $u$ vaut $1-i$. La question n'est pas ce que ça dit de **ce** $M$ : c'est
  **où sont tous les autres**. »
  > *Raccourcie en seconde passe (pédagogie, MINEUR 1) : ~110 → ~70 mots.* Elle était **la plus
  > longue consigne de la scène à l'étape la plus dure** (S1 ~55, S2 ~45, S3 ~40) et **elle
  > ouvrait son deuxième tiers sur « **Oui**, les deux flèches arrivent en $M$… » — une réponse à
  > une objection que l'élève n'a pas encore faite.** *Le contenu de I8 reste, en incise et à sa
  > place : après la définition, pas avant.* **La dérivation complète est au §4.4 point 1 ; la
  > consigne n'en porte que la version courte, et le §14.6 tient le §4.4 comme bloquant.**
  > *Vérifié : aucune phrase retirée ne portait un fait que la `suite` ou un retour suppose.*
  > *Ajouté en vague 1 (pédagogie I8).* S1 a enseigné « les deux flèches partent **toutes les
  > deux** du sommet ». $z - z_A$ et $z - z_B$ sont $\vec{AM}$ et $\vec{BM}$ : elles **arrivent**
  > en $M$. **La valeur est la même** — $\frac{z_A - z}{z_B - z} = \frac{z-z_A}{z-z_B}$, les deux
  > signes $-1$ se simplifient — **mais un élève qui a pris S1 au sérieux se casse exactement
  > là**, et le premier jet ne le voyait nulle part.
  > *Changé en vague 1 (pédagogie M2) : la lettre $u$ est **présentée** ici. Le premier jet
  > l'employait dans les retours de S4 et dans le §4.4 sans jamais la donner à l'élève, alors
  > que le §5.6 pose la règle « deux objets, deux noms ».*
- **Pari :** « L'ensemble des points $M$ pour lesquels ce rapport a un **module égal à $1$**,
  c'est… »

| choix | texte | juste | misconception | retour |
|---|---|---|---|---|
| `mediatrice` | **la médiatrice de $[AB]$** | **oui** | — | « Oui, et le mécanisme tient en une ligne : $\vert u\vert = \dfrac{MA}{MB}$ — un quotient de deux distances. Il vaut $1$ exactement quand $MA = MB$ : c'est la définition même de la médiatrice. **La scène vient de tracer TROIS courbes, et une seule répond à cette question-ci.** Les deux autres sont les lieux de cette figure qui répondent à des conditions sur l'**argument** : le **cercle de diamètre $[AB]$** et la **droite $(AB)$** — tu vas les voir travailler dans les trois autres retours. Pose $M$ sur la médiatrice, **au cran $2\sqrt3\,i$**, puis **fais-le glisser sans lâcher** : une des deux lignes du panneau refuse de bouger. » |
| `cercle-diametre` | le **cercle de diamètre $[AB]$** | non | **`ensemble-points-locus-confondu`** | « Teste-le toi-même : pose $M$ sur ce cercle, **au cran $\sqrt3+i$**. Le module y vaut $2+\sqrt3$, pas $1$. Ce cercle est bien un lieu de cette figure — mais c'est celui de l'**argument** (l'angle droit en $M$), pas celui du module. Les deux conditions ne sélectionnent pas les mêmes points, et c'est tout l'enjeu. » |
| `cercle-unite` | le **cercle de centre $O$ et de rayon $1$** : « $\vert u\vert = 1$ » veut dire que $M$ est à distance $1$ de l'origine | non | **`ensemble-points-locus-confondu`** | « Tu as lu la **valeur** du rapport comme la **position** de $M$. Ce sont deux choses différentes : $\vert u\vert$ ne mesure pas où est $M$ par rapport à $O$ — $O$ n'intervient nulle part ici —, il compare $MA$ et $MB$. La preuve est à l'écran, et le cercle unité est tracé juste à côté : **le cran $2\sqrt3\,i$** place $M$ à $2\sqrt3 \approx 3{,}46$ de l'origine, très loin de ce cercle, et son module vaut pourtant exactement $1$. » |
| `droite-ab` | la **droite $(AB)$** | non | **`ensemble-points-locus-confondu`** *(ré-attribué en vague 1 — pédagogie I12)* | « Tu as appliqué au module un critère qui est celui de l'argument : « $M$ sur la droite $(AB)$ » correspond à « $u$ **réel** », c'est-à-dire à un **argument** de $0$ ou $\pi$ — pas à un module de $1$. Pose $M$ sur la droite, **au cran $4$** : l'argument y vaut bien $0$, et le module vaut $3$. Deux critères, deux grandeurs, deux lieux. » |

> **Ré-attribution de vague 1 (pédagogie I12), et le motif est celui que la scène sœur a payé.**
> `droite-ab` portait `lecture-w-module-argument`. Mais le texte déclaré de
> `ensemble-points-locus-confondu` **nomme cette réponse-là, nommément** :
> « *l'élève identifie l'ensemble […] au mauvais lieu (médiatrice, cercle centré en $A$,
> **droite $(AB)$**)* » (`items.yaml:221-232`). *Rattacher un distracteur à un modèle dont le
> texte déclaré ne le nomme pas, quand un autre modèle le nomme, est **exactement** le correctif
> B1 de la vague 1 de la scène sœur, que le §8.1 cite deux fois comme leçon payée.* **Les
> quatre choix de S4 servent donc un seul modèle — et c'est cohérent : S4 est l'étape des
> lieux.**

> ## ⚠ COMBIEN DE COURBES ? — TRANCHÉ EN SECONDE PASSE (pédagogie IM-2) : **TROIS, tracées à la
> révélation, et le retour JUSTE les nomme toutes les trois.**
>
> **Le document se contredisait.** Le §6.1 et la `suite` disaient « **la** courbe du lieu »
> (singulier) ; la famille de porte `courbe-du-lieu` (§11.2) exigeait **médiatrice ET cercle de
> diamètre ET droite** ; la `suite` disait « **chaque** lieu ». **Les deux lectures coûtaient :**
> avec une seule courbe, les retours `cercle-diametre` et `droite-ab` (« *pose $M$ sur **ce**
> cercle* », « *pose $M$ **sur la droite*** ») **désignent un objet qui n'est pas dessiné** ;
> avec trois, deux courbes apparaissent sans explication **pour l'élève qui répond juste** —
> contre la règle que ce document adopte onze lignes plus haut (§5.6 : *chaque marque est
> expliquée UNE fois, **par les QUATRE retours***).
>
> **La décision était en fait déjà prise ailleurs, et par la pièce la plus contraignante : le
> BALAYAGE.** Il existe à **quatre** des cinq crans (`mediatrice`, `cercle-1`, `cercle-2`,
> `droite`) et glisse $M$ « *le long de la courbe du lieu qui passe par le cran courant* »
> (§6.1). **Sans les trois courbes, deux de ces quatre balayages glissent le long de rien** — et
> la `suite`, qui compare les invariants d'un lieu à l'autre, n'a plus d'objet. *Ce n'était donc
> pas une question ouverte : c'était une décision non écrite.*
>
> **Ce qui la rend payante et non coûteuse :** les trois courbes, ensemble, **sont** le fait de
> S4 — *le cercle est une affaire d'ARGUMENT, la médiatrice une affaire de MODULE* (§5.3 E) —, et
> **les quatre retours se partagent l'explication exactement une fois chacun** : le juste nomme
> les trois et dit laquelle répond ; `cercle-diametre` explique le cercle ; `droite-ab` explique
> la droite ; `cercle-unite` explique pourquoi le cercle unité, lui, n'est le lieu de rien ici.
> **Aucune marque n'est laissée inexpliquée à personne.**

- **`suite` (une question en deux temps, un geste — 27 mots) :** « **Fais glisser $M$ le long de
  chaque lieu, sans lâcher.** Sur chacun, **une des deux lignes du panneau reste écrite et ne
  bouge pas** : laquelle, et que vaut-elle ? »
  *Réponses vérifiées (§5.3 E, §6.1) : sur la **médiatrice**, c'est le **module**, et il vaut
  $1$ ; sur le **cercle de diamètre**, c'est l'**argument**, et il vaut $-\dfrac{\pi}{2}$ ; sur
  la **droite**, c'est l'**argument**, et il vaut $0$. **C'est le seul moment de la scène où un
  continuum dit quelque chose qu'aucun cran ne dit — et il le dit AVEC un nombre exact qui refuse
  de bouger.***
  > **Changé en vague 1 (pédagogie I4/I7), puis REFAIT en seconde passe (BQ-1).**
  > *En vague 1* : le premier jet posait trois questions de comptage plus un geste, et les trois
  > réponses étaient écrites sur les libellés de cran d'alors (« médiatrice », « droite »).
  > *En seconde passe* : la version de vague 1 (« *sur lequel les deux segments restent-ils
  > égaux, et sur lequel est-ce l'arc qui reste droit ?* ») **demandait un jugement à l'œil**
  > — deux segments « égaux » et un arc « droit », appréciés au pixel — **parce que le balayage
  > effaçait tous les chiffres.** *Dans une scène qui écrit « exacte, ou rien » (§5.4), c'était
  > le contraire de ce qu'elle promet.* **Le balayage tenant désormais l'invariant écrit et
  > exact (§6.1), la `suite` demande de LIRE UN NOMBRE QUI NE BOUGE PAS** — ce que le dessin
  > suggère et que seule la lecture prouve.
  > ⚠ **Ce que je ne prétends pas (pédagogie, MINEUR 6) :** la `suite` n'est pas entièrement
  > vierge. Le retour `cercle-diametre` doit dire de quoi le cercle est le lieu (« *celui de
  > l'argument, l'angle droit en $M$* ») — c'est son travail — et il donne donc un tiers de la
  > réponse au cran près. **Ce que la `suite` ajoute et qu'aucun retour ne donne : que l'invariant
  > reste EXACT et IDENTIQUE AU CARACTÈRE le long d'un continuum.** *Un retour parle d'un point ;
  > la `suite` parle d'une courbe. C'est un transfert, pas une confirmation — et c'est déclaré
  > plutôt que nié (§10.17).*
  > **Les deux autres lieux ne sont toujours pas portés par un PARI : ils sont portés par les
  > courbes, les retours, et la PROSE du §4.4**, qui reste un livrable bloquant (§3, tension 2).
  > *S4 garde un pari et une idée.*
- **⟂-avant-pari :** **les TROIS courbes de lieu** (aucune n'est tracée) ; la lecture
  `rapport-lieu` ; l'arc en $M$ ; le contrôle `pointM` ; le contrôle `balayage` ; le verdict ;
  tout pixel d'accent. *$A$, $B$, $M$, leurs affixes, **le cercle unité** (tracé en `mode: lieu`, §5.1) et
  **la valeur $1-i$ énoncée par la consigne** sont à l'ENCRE. **La distinction que la porte doit
  tenir : « la valeur est ÉNONCÉE » n'est pas « la LECTURE existe »** — la ligne `rapport-lieu`,
  qui range le module et l'argument l'un sous l'autre, n'existe pas dans le DOM avant la
  révélation.*

#### S4 confrontée à `cp-ensemble-points`, choix par choix

*La scène sœur a payé pour avoir affirmé « complémentaires, jamais doublons » sans le
vérifier (§7.4, pédagogie I7). Voici la vérification.*

| | S4 | `cp-ensemble-points` (`checkpoints.yaml:350-409`) | doublon ? |
|---|---|---|---|
| la **condition** | $\vert u\vert = 1$ — un **module** | $\frac{z-z_A}{z-z_B}$ **imaginaire pur** — un **argument** | **non** : ce sont les deux critères que le modèle confond, pris l'un après l'autre |
| la **réponse** | la **médiatrice** | le **cercle de diamètre**, privé de $A$ et $B$ | **non** |
| les **points** | $z_A = -2$, $z_B = 2$ | $z_A = -1$, $z_B = 3$ | **non** — *et c'est délibéré : rejouer les affixes d'un point d'arrêt ferait mesurer la mémoire de l'écran* |
| le **moment** | **avant** toute prose de R6 (prédiction) | **après** R7, avant le sommet (contrôle) | **non** |

**Conclusion : ils ne se doublent pas — et surtout, S4 + le §4.4 DONNENT à
`cp-ensemble-points` l'antécédent qui lui manque.** `REVIEW:132-137` (S8) lui reproche
aujourd'hui d'introduire sa méthode **dans son propre retour** — « *méthode dans la réponse,
l'anti-motif* ». Après cette livraison, la méthode est enseignée deux rungs plus tôt, **et
l'élève l'a trouvée lui-même.** *C'est le défaut écrit que cette scène referme.*

#### §7.6 — S1, S2 et S3 confrontées aux objets existants de R6 : la table que le premier jet n'avait PAS faite

> ⚠ **Vague 1, pédagogie B4.** Le premier jet faisait cette vérification **pour S4 seulement**,
> en citant explicitement le prix payé par la scène sœur (« *elle a payé pour avoir affirmé
> « complémentaires, jamais doublons » sans le vérifier* ») — **puis omettait la même
> vérification sur trois étapes.** La voici, contre les **quatre objets de R6** (NBCOMPLEX2-6,
> -20, -21, -32) **et** `cp-r6-lecture-w`.

| | ce que l'étape fait faire | l'objet le plus proche | doublon ? |
|---|---|---|---|
| **S1** | **FORMER** $w$ à partir de trois affixes, avec $z_A \neq 0$ | aucun. -6 et -21 **donnent** $w$ ; -20 a $z_A = 0$ **et** $z_B = 1$ (division par $1$) **et** imprime $w$ dans son distracteur A (`items.yaml:1370`) ; -32 n'a **aucun rapport** ; `cp-r6-lecture-w` fait arriver $w$ nu | **non — et c'est le trou mesuré lui-même** (fait **c**). *0/5 objets font former le rapport.* |
| **S2** | dire **ce que mesurent** $\vert w\vert$ et $\arg(w)$, en les **prédisant** depuis $w$ | -6, -20, -21 et `cp-r6-lecture-w` demandent tous la **nature du triangle**, jamais ce que les deux nombres mesurent ; aucun ne fait calculer un module ou un argument | **non.** *Le modèle partagé (`lecture-w-module-argument`) est le même ; la QUESTION ne l'est pas — et un modèle servi deux fois sur deux gestes différents n'est pas un doublon.* |
| **S3** *(premier jet : `equilateral`, $\vert w\vert=1$, $\arg=\frac{\pi}{3}$, « le triangle est… »)* | — | **NBCOMPLEX2-6** (`items.yaml:551-601`) : mêmes deux nombres, même conclusion, options en sous-ensemble ; **et `cp-r6-lecture-w`** pour le reste des options | **OUI — doublon confirmé.** *C'est pourquoi le pari a été déplacé.* |
| **S3** *(après correctif : `demi-equilateral`, « rectangle — en quel sommet ? »)* | lire le **même** triangle depuis **plusieurs sommets** | **aucun objet du corpus ne lit deux fois le même triangle.** Ni les quatre items, ni `cp-r6-lecture-w`, ni la figure `nature-triangle-w` (un triangle, un sommet, une position), ni l'exemple travaillé `lesson.md:392-406` | **non — et c'est le second trou mesuré** (§5.3 B). |
| **S4** | un lieu par le **module** | `cp-ensemble-points` : un lieu par l'**argument**, d'autres affixes, un autre rung | **non** — table ci-dessus, choix par choix |

### 7.5 Le contrat « avant le pari », et les cinq formes de la fuite

**Règle générale, valable aux quatre étapes.** Ce qui dépend de l'ISSUE — les deux flèches,
l'arc, la lecture `nature`, la courbe du lieu, et toute lecture que la consigne n'a pas
énoncée — **n'existe pas dans le DOM avant l'engagement**, ni dans le rendu, ni dans la phrase
lue au lecteur d'écran.

**Trois exceptions, déclarées, chacune motivée** (corollaire du manège : *une donnée de
l'énoncé ne se peint jamais dans la couleur de la réponse*). **Elles sont toujours trois, mais
celle de S2 a RÉTRÉCI** : la reconstruction du pari lui a retiré sa moitié dangereuse (§7.2) :

| étape | ce qui est visible AVANT le pari, en plus | pourquoi | ce que ça coûte |
|---|---|---|---|
| **S2** *(exception RÉDUITE en vague 1)* | **les deux flèches** et la lecture **`w`** — à l'ENCRE | le pari porte sur ce que $w$ CONTIENT ; sans $w$ écrit et sans les deux vecteurs tracés, la consigne n'a pas d'objet, et le distracteur `valeurs-absolues` (qui se lit sur le dessin) devient inatteignable | rien : l'**arc**, **la longueur reportée**, `module-w`, `argument-w`, `longueurs` et le verdict restent absents. ⚠ **Ce que l'exception ne couvre plus : $\vert w\vert$ et $\arg(w)$ étaient donnés par la consigne du premier jet ; ils sont désormais LA RÉPONSE.** *Une exception de moins, et la plus dangereuse des trois* |
| **S3** | les deux flèches, **l'arc en $A$ et son étiquette**, et les lectures `w`, `module-w`, `argument-w` — à l'ENCRE | le pari porte sur **où** une ligne s'allume ; ces lectures donnent les nombres **à un seul sommet**, et ne nomment aucune ligne | rien : **`nature` et le petit carré attendent**, et ils sont la réponse |
| **S4** | **la valeur $u = 1-i$**, énoncée par la consigne, le cercle unité et les deux segments $MA$, $MB$ à l'ENCRE | le pari porte sur un **ensemble**, pas sur une valeur | rien : la **courbe**, l'**arc en $M$**, la lecture `rapport-lieu`, le contrôle `pointM` et le **balayage** restent absents |

#### A — la fuite par les RÉGLAGES

*La porte **réécrit elle-même** cette table contre le descripteur : elle énumère, avant chaque
étape, tous les états ATTEIGNABLES (l'état posé, sa révélation, puis chaque contrôle ouvert sur
tous ses crans) et vérifie qu'aucun ne produit la réponse d'un pari ultérieur.*

| étape | contrôle(s) ouvert(s) | ce qu'ils atteignent | un pari suivant est-il mis en danger ? |
|---|---|---|---|
| **S1** | `position` seul (4) | 4 placements, **sur la seule forme `rect-isocele`**, sommet $A$ | **non** pour S2 : `forme` est fermé (donc `demi-equilateral` est hors d'atteinte) **et** `module-w`, `argument-w`, `longueurs` **n'existent dans le DOM à aucune étape antérieure à S2**. **non** pour S3 : `nature` absent, `sommet` fermé, aucun carré d'angle droit. **non** pour S4 : `mode` fixé à `triangle`, `pointM` et `rapport-lieu` absents |
| **S2** | `forme` seul (4) | 4 formes, **au seul placement `tournee`**, sommet $A$ | **non** pour S3 : `nature` **n'existe pas**, `sommet` est fermé, **et le petit carré d'angle droit n'est dessiné à aucune étape antérieure à S3**. ⚠ *Le premier jet déclarait ici une « fuite molle » — S2 atteignait les deux NOMBRES de l'état de S3. **Elle n'existe plus** : S3 parie désormais sur la même forme que S2, donc ses deux nombres sont déjà à l'écran, **et son pari ne porte pas sur eux**.* **non** pour S4 |
| **S3** | `sommet` seul (3) | les **3** sommets, **sur la seule forme `demi-equilateral`, au seul placement `retournee`** | **non** pour S4 : `mode` est fixé, `pointM` et `rapport-lieu` absents, et **aucune courbe n'est dessinable en mode `triangle`** |
| **S4** | `pointM` (neuf) + `balayage` **après la révélation et seulement sur un lieu** | les 5 positions de $M$, plus un continuum **le long d'une courbe** | — |

> **Changement de vague 1 (pédagogie I5) : l'ensemble atteignable de S3 passe de 48 états à 3.**
> Le premier jet rouvrait `forme` et `position` à S3 pour sa `suite` en trois temps. **La
> `suite` réduite n'a plus besoin que de `sommet`**, et le pari, lui, se joue sur un seul
> triangle à un seul placement. *La porte `fuite-inter-etapes` s'en trouve simplifiée : elle
> vérifie que `position` n'existe qu'à S1, `forme` qu'à S2, `sommet` qu'à S3, `pointM` qu'à S4.*

**Pourquoi `position` n'est ouvert qu'à S1, et c'est une décision mesurée.** S'il était rouvert
à S2, S2 atteindrait `demi-equilateral` × `retournee` × sommet $A$ — **l'état de pari de S3 au
caractère près**. *La fermeture supprime la fuite d'ÉTAT. Ce qu'elle ne supprime pas — et qui
est déclaré en toutes lettres au §5.2 A et au §10.13 — c'est que **S2 et S3 paient sur le même
triangle**, donc qu'un élève attentif au dessin de S2 a déjà vu l'angle droit en $C$. **Ce n'est
pas la réponse du pari de S3** : deux de ses quatre choix disent « rectangle », et le dessin ne
départage pas « en $C$ » de « aux trois sommets ».*

#### B — la fuite par les RETOURS, **refaite RETOUR PAR RETOUR en vague 1 (pédagogie B2)**

> ⚠ **Ce que la vague 1 a trouvé, et il faut le dire net : ce paragraphe certifiait quelque
> chose de FAUX contre les textes du §7.1 de ce document même.** Il affirmait « *aucun retour de
> S1 ne contient « module », « argument », « angle », **« longueur »**, « distance »* » — alors
> que le retour `demi-soustraction` de S1 écrivait « *ni deux **longueurs** issues du même
> point, ni deux **directions** issues du même point* ». **Et ce n'était pas seulement une
> infraction de porte : « deux longueurs / deux directions » est exactement le couple que S2
> fait parier.** *Une table de conformité qui n'a pas été passée sur les textes qu'elle
> certifie n'est pas un instrument, c'est une intention (ADR 0035 : vérifier le BANC avant le
> produit).* **Voici la relecture, un retour à la fois, contre la ligne de l'étape au §7.5 C.**

| retour | les mots qu'il emploie et qui touchent la ligne de l'étape | verdict |
|---|---|---|
| **S1 · `vecteurs`** (juste) | `vecteurs`, `affixes`, `soustraction`, `mesure`, `origine`, `figure` | ✅ **aucun interdit de S1** |
| **S1 · `affixes`** *(réécrit en vague 1, pédagogie I10)* | `rapport`, `origine`, `sommet`, `placements`, **`forme`**, `badge` | ✅ *`rapport` seul est autorisé à S1 ; l'interdit est `rapport des` (suivi d'une grandeur). **`forme` n'est pas un interdit de S1** — c'est le mot de la question, pas un nom de configuration.* |
| **S1 · `demi-soustraction`** *(RÉÉCRIT — c'était le défaut)* | `numérateur`, `dénominateur`, `flèches`, `point`, `figure` | ✅ **« longueurs » et « directions » ont disparu.** *Le retour dit désormais la même chose avec le seul vocabulaire de S1 : « deux flèches qui ne partent pas du même point ne se comparent pas », plus la conséquence (« ton nombre change dès qu'on déplace la figure »).* |
| **S1 · `ordre-inverse`** *(réécrit en vague 1, fidélité I1)* | `fraction`, `flèche`, `dénominateur`, `badge`, `calcul`, `nombre` | ✅ *La phrase « le sens de lecture fait partie de la définition » est partie pour une raison de fidélité, pas de fuite. Ce qui la remplace — « ce qu'on lira dessus n'est pas pareil » — **ne nomme ni le module ni l'argument** ; le détail est renvoyé à S2, où les deux mots sont autorisés.* |
| **S2 · `quotient-et-ecart`** (juste) | `module`, `argument`, `longueur`, `quotient`, `écart`, `arc`, `direction`, `reporté` | ✅ *Et la fuite du premier jet (« *quand ce quotient vaut $1$, le triangle est isocèle* ») reste supprimée : **« isocèle » n'apparaît dans aucun texte de S2**, retours, consigne, `suite` et libellés de cran compris.* |
| **S2 · `valeurs-absolues`** | `longueur`, `direction`, `axe réel`, `rapport`, `module`, `argument` | ✅ |
| **S2 · `roles-echanges`** | `angle`, `radian`, `arc`, `module`, `argument`, **`30°`** | ✅ *Le degré est un ordre de grandeur dans un retour, inventorié au §9.8 — pas une lecture.* |
| **S2 · `fraction-retournee`** | `fraction`, `rapport des longueurs`, `signe`, `angle`, `badge`, `dénominateur` | ✅ *Il nomme « le rapport des longueurs » et « le signe de l'angle » — **autorisés à S2** — et **jamais** une ligne de la table.* |
| **S3 · les quatre** | `rectangle`, `sommet`, `imaginaire pur`, `table`, `arc`, `carré`, `angle droit`, `nature` | ✅ **aucun ne nomme un ensemble de points, un lieu, une médiatrice ni un cercle.** *Re-vérifié mot à mot après la réécriture : le mot « cercle » n'apparaît dans aucun texte de S3.* |
| **S4 · les quatre** | tout est autorisé | — |

**Et la même relecture porte désormais sur les LIBELLÉS DE CRAN** (correctif B1) : à S2, le
contrôle `forme` affiche « Triangle 1 · 2 · 3 · 4 » — **plus « équilatéral »** ; à S4, le
contrôle `pointM` affiche des affixes — **plus « médiatrice » ni « droite »**. *C'est la moitié
de la table C qui n'était pas mesurée du tout.*

#### C — la fuite par le TEXTE : `formule-graduee`, ÉTAPE par ÉTAPE

*La frontière se pose **par étape**, consigne **et** retours **et** lectures **et — ajouté en
vague 1 (B1) — LIBELLÉS DE CRAN des contrôles ouverts**. Une consigne a le droit d'imprimer ce
que son propre énoncé exige. **Cette table est la SEULE autorité** ; le §2.3 n'en est qu'un
résumé.*

| pendant l'étape… | **autorisé** (consigne + retours + `suite` + lectures + **libellés de cran**) | **interdit** |
|---|---|---|
| **S1** | `vecteur`, `\vec{AB}`, `\vec{AC}`, `z_C - z_A`, `z_B - z_A`, `sommet`, `numérateur`, `dénominateur`, `w`, `origine`, `soustraction`, `affixe`, `forme`, **`Placement 1..4`** | `module`, `\vert w\vert`, `argument`, `\arg`, `angle`, `longueur`, `distance`, `quotient`, `rapport des`, `isocèle`, `équilatéral`, `rectangle en`, `aligné`, `nature`, `ensemble`, `lieu`, `médiatrice`, `cercle de` |
| **S2** | + `module`, `\vert w\vert`, `argument`, `\arg(w)`, `angle en A`, `écart`, `direction`, `longueur`, `distance`, `quotient`, `rapport des longueurs`, `\dfrac{AC}{AB}`, `arc`, `reporté`, `sens direct`, **`Triangle 1..4`** | `isocèle`, `équilatéral`, `rectangle en`, `aligné`, `alignés`, `nature du triangle`, `imaginaire pur`, **`réel`**, `ensemble`, `lieu`, `médiatrice`, `cercle de` |
| **S3** | + `nature`, `isocèle`, `équilatéral`, `rectangle`, `rectangle en`, `aligné`, `alignés`, `imaginaire pur`, `réel`, `angle droit`, `carré`, la table entière, **`A`/`B`/`C`** | `ensemble des points`, `ensemble de points`, `lieu`, `médiatrice`, `cercle de diamètre`, `cercle de centre`, `angle inscrit`, `Thalès` |
| **S4** | tout, **libellés d'affixe compris** | — |

> **Deux corrections de vague 1 dans cette table.**
> **(a) La colonne de gauche inclut désormais les LIBELLÉS DE CRAN** (correctif B1). *Sans cela,
> la porte `formule-graduee` ne balaie que la moitié du panneau : les contrôles portent du texte
> visible, et le premier jet y mettait « équilatéral » à S2 et « médiatrice » à S4.*
> **(b) La qualification « `réel` *(en position de critère)* » est SUPPRIMÉE à S2** (pédagogie
> M5). *Motif : une porte qui cherche une chaîne en début de mot **ne peut pas** distinguer
> « un réel positif » d'un critère — la règle était donc immesurable, donc inerte (ADR 0034 :
> un seuil qui rend la porte inerte est pire qu'une porte absente).* **`réel` est simplement
> interdit à S2, et les textes de S2 ont été réécrits pour s'en passer** : le retour juste dit
> « un nombre sans unité », pas « un réel positif ». **Mesurable dans les deux sens.**
> ⚠ *Seconde passe (pédagogie, MINEUR 4) : cette note (b) certifiait une phrase qui n'était pas
> dans le texte qu'elle certifie — le retour juste de S2 ne contenait pas « un nombre sans
> unité ». **J'ai rendu la note vraie plutôt que de l'affaiblir** : la formule est la bonne, elle
> manquait au retour, elle y est (§7.2). C'est le motif B2 en miniature, et il a suffi d'une
> relecture dans l'autre sens — du texte vers la table, pas de la table vers le texte.*
> **(c) — SECONDE PASSE (pédagogie, MINEUR 5) — la classe entière des qualifications
> immesurables est balayée, pas seulement l'occurrence nommée.** La vague 1 avait retiré
> « `réel` *(en position de critère)* » **là où le critique l'avait pointé**, et laissé trois
> sœurs vivantes au §9 : `semblable` *(en position de transformation)*, `(r,\theta)` *(en
> position de couple)*, `y =` *(en position d'équation de droite)*. *Une porte qui cherche une
> chaîne en début de mot dans du texte rendu **ne sait pas** ce qu'est une « position » ; chacune
> de ces trois parenthèses rendait sa ligne inerte.* **Les trois sont supprimées au §9.3 et au
> §9.10, et les trois chaînes sont interdites sans condition** — aucun texte de cette scène n'en
> a besoin, vérifié au §7. *Corriger l'exemple et laisser la classe, c'est réparer le symptôme
> nommé : la leçon d'ADR 0036 vaut aussi pour les correctifs.*

**À toutes les étapes, sans exception : les chaînes du §9.** *La porte cherche ces formes dans
le `textContent` **rendu**, en remplaçant chaque `.katex` par son **annotation TeX**, en début
de mot et en Unicode.*

#### D — la fuite par la DONNÉE, et la fuite par la RELATION

- **Par la DONNÉE :** **deux régularités existent et elles sont déclarées.**
  **(i)** Les quatre formes partagent le **même** $\vec{AB} = 4$. *Ce n'est pas une fuite —
  aucune réponse ultérieure ne s'en déduit — mais c'est un choix : il rend les quatre formes
  comparables d'un coup d'œil (la base ne bouge pas, seul $C$ bouge), au prix de ne jamais
  montrer un triangle où le côté de référence change. **Déclaré au `fit_caveat` (§10.5).***
  **(ii) — AJOUTÉE EN VAGUE 1 — S2 et S3 paient sur la MÊME forme** (`demi-equilateral`), à deux
  placements. *Conséquence : les deux nombres de S3 sont déjà à l'écran quand S3 commence, et
  l'angle droit en $C$ est déjà **visible** depuis S2. **Ce n'est pas une fuite du pari de S3**
  — son pari porte sur l'indexation par le sommet, que le dessin ne dit pas — mais c'est une
  aide, et le motif de ce choix (aucune autre des quatre formes ne satisfait les contraintes des
  deux étapes) est écrit au §5.2 A. **Déclaré au `fit_caveat` (§10.13).***
  *Le seul candidat de fuite réelle serait une forme où $\vert w\vert = 1$ **et**
  $\arg(w) = \pm\frac{\pi}{2}$ **et** un placement à l'origine — c'est-à-dire la figure
  existante `nature-triangle-w`. **Elle n'est aucun cran de la scène**, et la scène est placée
  **avant** elle (§3).*
- **Par la RELATION :** $w = \dfrac{z_C-z_A}{z_B-z_A}$ porte **quatre** facteurs de sens — le
  sommet, le module, l'argument, la nature — et un cinquième s'ouvre en mode `lieu`. **Chaque
  étape n'écrit que ceux qu'elle a fait varier**, et la table C ci-dessus le mesure.

**Une fuite molle, écrite franchement.** Un élève qui a fait S2 arrive à S3 en sachant que $w$
porte deux nombres de natures différentes ; un élève qui a fait S3 arrive à S4 en sachant
qu'un argument de $\pm\frac{\pi}{2}$ signale un angle droit. **Ce n'est pas une fuite au sens
de la règle** : la règle interdit d'**atteindre l'état** qu'un pari fait deviner, pas de
comprendre la mathématique qui y mène. **S2, S3 et S4 doivent être gagnables par le
raisonnement — c'est même le but.**

---

## 8. Misconceptions

Les **25** modèles déclarés de la notion vivent dans `items.yaml:11-270` sous le préfixe
`mc.math.maths_complexes_trigo.`. Les comptes sont **au niveau ITEM**, méthode déclarée à
`items.yaml:2751-2756` : **41 items**. *`REVIEW:156-159` (D1) prévient que, faute de `spec.md`,
ces lignes sont **formellement non revendiquées**. **Ce document n'est pas le `spec.md` de la
notion** : il revendique **quatre** modèles existants pour un rung, en déclare **un** neuf, et
laisse les vingt autres non revendiqués. §13.6 de la spec sœur, toujours ouvert.*

### 8.1 Ce que la scène vise, sur l'inventaire déjà déclaré

| modèle existant | compte actuel | où la scène le casse | **sur quelle conséquence il casse** |
|---|---|---|---|
| **`w-sommet-ignore`** *(modèle NEUF, §8.2 — deux faces)* | **0 → 3** | **S1** (`affixes`, `demi-soustraction`) = **face A** · **S3** (`aucune-ligne`, `rectangle-partout`) = **face B** | *face A* : le nombre obtenu **change à chaque placement** alors que la forme du triangle ne change pas — la `suite` de S1 fait trouver l'unique placement où il tombe juste, celui où $z_A = 0$ · *face B* : la lecture écrit « aucune des quatre » **au sommet $A$** pendant que le petit carré se pose **en $C$**, et le contrôle `sommet` le confirme en un clic |
| `lecture-w-module-argument` | 3 | **S2** (`roles-echanges`), **S3** (`rectangle-en-A`) | un ordre de grandeur suffit : un angle de $0{,}87$ rad n'est pas l'arc de $30°$ tracé à l'écran ; et à S3, « rectangle » exige $\pm\frac{\pi}{2}$ **exactement**, pas « non nul ». ⚠ **Son texte déclaré doit être ÉLARGI avant recrutement — §8.2 ter** (seconde passe, pédagogie IM-4 / fidélité NEW-3 : la face « bonne grandeur, mauvais seuil » n'est pas dans sa `description`, alors que son propre item NBCOMPLEX2-6 B la sert depuis toujours) |
| `angle-lu-depuis-l-axe` | 4 | **S2**, choix `valeurs-absolues` | au placement `tournee`, $\arg(\vec{AC}) = \frac{2\pi}{3}$ et $\arg(w) = \frac{\pi}{6}$ : **les deux nombres sont à l'écran et ils diffèrent** ; et la longueur reportée montre que $2\sqrt3$ n'est pas le module. ⚠ **Son texte déclaré doit être ÉLARGI avant recrutement — §8.2 bis** (vague 1, fidélité I2) |
| `produit-quotient-argument-operation` | 4 | **S1** (`ordre-inverse`, **forme pré-argument**), **S2** (`fraction-retournee`) | l'arc **tracé** part du dénominateur et arrive au numérateur ; et à S2, le retour dit exactement ce que l'inversion change — **le rapport des longueurs, et le signe de l'angle**, jamais la conclusion. ⚠ **Son texte déclaré doit être ÉLARGI — §8.2 ter** (seconde passe : **trois** de ses quatre attributions, ici et au banc, agissent AVANT qu'aucun argument existe) |
| `ensemble-points-locus-confondu` | 3 | **S4**, **les trois distracteurs** (`cercle-diametre`, `cercle-unite`, **`droite-ab`** — ré-attribué en vague 1) | chaque lieu faux est **réfuté par un cran atteignable** : le cran $\sqrt3+i$ a un module de $2+\sqrt3$ ; le cran $2\sqrt3\,i$ est à $2\sqrt3$ de l'origine et son module vaut pourtant $1$ ; le cran $4$ a un argument de $0$ et un module de $3$. ⚠ **Son énumération de lieux doit gagner UN terme — §8.2 ter** (seconde passe : elle nomme « médiatrice, cercle centré en $A$, droite $(AB)$ », **pas le cercle de centre $O$**, qui est le distracteur `cercle-unite` et le choix C de NBCOMPLEX2-45) |

**Cinq modèles servis — quatre de l'inventaire existant, un neuf — et aucun n'est servi deux
fois pour la même raison.** *Les vingt autres modèles de l'inventaire appartiennent à R0–R5 et
R7. **La scène ne les touche pas, et c'est déclaré.***

> **Note de vague 1 (fidélité M7) — la forme PRÉ-ARGUMENT de
> `produit-quotient-argument-operation`, déclarée plutôt que supposée.** Le texte du modèle est
> écrit entièrement sur les arguments : « *l'élève soustrait les arguments […] **inverse l'ordre
> de la soustraction*** » (`items.yaml:75-82`). **Or à S1 le mot `argument` est une chaîne
> interdite**, et l'élève n'a encore inversé qu'une **fraction de deux affixes de vecteurs** —
> avant qu'aucun argument n'existe dans la scène. **C'est la même erreur une étape plus tôt, et
> c'est écrit ici pour que personne ne prenne le rattachement de S1 pour un étirement** : la
> face « fraction retournée » de S2 est la forme pleine, celle de S1 en est l'antécédent
> mécanique.
>
> ⚠ **CE QUE LA SECONDE PASSE A CHANGÉ ICI, et pourquoi la déclaration ne suffisait plus.** La
> règle (e) du §14.0, lancée cette fois sur les 32 choix (§14.0 bis), montre que **ce n'est pas
> UN rattachement lâche, c'est TROIS** : S1 `ordre-inverse`, **NBCOMPLEX2-42 D** ($q-d = i(p-d)$,
> une égalité algébrique, aucun argument calculé) et **NBCOMPLEX2-43 B** ($\frac1w = -2$ lu comme
> $\frac{AC}{AB}$ — un rapport de LONGUEURS, pas d'arguments). **Trois attributions sur quatre
> reposaient sur une forme que le texte du modèle ne contient pas** — et le repli que je nommais
> (« retirer le modèle et laisser le choix sans modèle nommé ») **n'existe pas** : le contrat des
> paris et `validate-content` exigent un modèle déclaré. *Un repli indisponible n'est pas un
> repli ; c'est une phrase.* → **Le texte du modèle gagne une clause, écrite mot pour mot au
> §8.2 ter.** *La note ci-dessus reste, parce qu'elle explique le geste ; ce qui change, c'est
> que la couverture vit désormais dans le MODÈLE, où item-author et la porte la lisent, et plus
> seulement dans cette spec.*

> **Deux modèles que la scène NE sert PAS, et pourquoi — parce que la scène sœur a payé pour
> cette leçon** (son correctif B1 : un distracteur rattaché à un modèle dont la définition
> déclarée décrit l'erreur **inverse**).
> - **`transformation-centre-oublie`** (4 items) semble être le voisin naturel de
>   `w-sommet-ignore` — c'est le même oubli. **Mais sa description déclarée est bornée à une
>   TRANSFORMATION** : « *L'élève écrit $z' = c\cdot z$ (centrée en $O$) pour une transformation
>   de centre $A$, oubliant les termes $z - z_A$* » (`items.yaml:175-184`). Un élève qui divise
>   deux affixes pour lire une **configuration** n'écrit aucune transformation. **Le rattacher
>   serait l'étirement exact que la vague 1 de la scène sœur a refusé.** §8.2.
> - **`rotation-sens-inverse`** (6 items) semble couvrir l'inversion de la fraction. **Mais sa
>   description est bornée au COEFFICIENT d'une rotation** : « *L'élève prend le coefficient
>   $e^{-i\theta}$ […] pour une rotation d'angle $+\theta$* » (`items.yaml:185-193`). Inverser
>   $\frac{z_C-z_A}{z_B-z_A}$ n'est pas prendre un mauvais coefficient : c'est **inverser
>   l'ordre d'une soustraction d'arguments**, ce que
>   `produit-quotient-argument-operation` déclare **nommément** (`items.yaml:72-82` : « *inverse
>   l'ordre de la soustraction* »). **C'est donc lui, et pas l'autre.**

### 8.2 Le modèle neuf — `w-sommet-ignore` — et la mesure qui le rend nécessaire

**Ce que le corpus fabrique, et que rien ne nomme.** Les **quatre** objets diagnostiques de R6
posent $z_A = 0$ ou livrent $w$ tout calculé (fait **c** du §0.1). Un élève peut donc les
réussir **tous les quatre** en divisant les affixes, sans jamais former un vecteur. Et la
banque, elle, lit au sommet $D$, au sommet $R$, au sommet $M_1$, en un $M$ variable, et parfois
entre deux vecteurs sans sommet commun (fait **e**). **L'écart entre ce que le corpus exerce et
ce que l'examen demande est total, et il n'a pas de nom.**

**Pourquoi ce n'est PAS `lecture-w-module-argument`.** Celui-ci suppose $w$ **déjà formé** et
décrit une erreur de **lecture** : « *l'élève échange les rôles du module et de l'argument, ou
n'en lit qu'un des deux* » (`items.yaml:211-220`). Ici, $w$ n'est **pas le bon nombre** : le
défaut est en amont de toute lecture.

**Pourquoi ce n'est PAS `transformation-centre-oublie` ni `rotation-sens-inverse`** : §8.1
ci-dessus, avec les citations.

**Pourquoi ce n'est PAS `angle-lu-depuis-l-axe`, et la frontière s'écrit dans la déclaration**
*(ajouté en vague 1, pédagogie M8 — le premier jet distinguait le modèle neuf de trois voisins
et **pas du plus proche**)* : `angle-lu-depuis-l-axe` dit lui-même que « *c'est **le point de
départ de la mesure** qui est faux* » (`items.yaml:258-264`) — ce qui ressemble beaucoup.
**La frontière est temporelle, et elle est nette : `w-sommet-ignore` agit AVANT que le rapport
existe** (le mauvais quotient est formé) ; **`angle-lu-depuis-l-axe` agit APRÈS** (le bon
quotient est formé, et on lit à côté : une longueur au lieu d'un quotient, une direction au lieu
d'un écart). *Un même élève peut porter les deux ; ils ne se recouvrent pas.* **Et le lien de
généralisation avec `transformation-centre-oublie` est nommé**, pour que la remédiation route
les deux ensemble : c'est le **même oubli du point de départ**, une fois dans une transformation
écrite, une fois dans une configuration lue.

**⚠ DEUX FACES, déclarées dès la naissance du modèle (conséquence du correctif B4).** Le pari de
S3 porte désormais sur l'indexation par le sommet ; il lui faut un modèle, et **c'est le même
oubli** :
- **face A — la soustraction non faite.** L'élève divise les affixes (ou n'en soustrait qu'une) :
  le rapport est pris **depuis $O$**. *S1 ; NBCOMPLEX2-42 (B, C), -43 (D), -44 (D).*
- **face B — la lecture non indexée.** Le rapport est correctement formé **à un sommet**, puis
  son verdict — ou son absence de verdict — est appliqué **au triangle**, comme si le sommet
  n'y était pour rien. *S3 ; NBCOMPLEX2-44 (B).*

**Le symptôme mécanique est le même dans les deux cas : le sommet ne joue aucun rôle dans la
lecture.** *Déclarer deux faces est un choix, et il a un coût : voir §13.14, où le scindement
est chiffré (il coûterait trois items de plus).*

**Déclaration à ajouter à `items.yaml` (bloc `misconceptions:`) :**

```yaml
  - id: mc.math.maths_complexes_trigo.w-sommet-ignore
    label: >-
      « Le SOMMET ne joue aucun rôle : rapport lu sur les affixes au lieu des
      vecteurs, ou verdict lu à un sommet et appliqué au triangle entier »
    description: >-
      Deux faces du même oubli. FACE A — devant w = (z_C − z_A)/(z_B − z_A),
      l'élève divise z_C par z_B, ou ne fait la soustraction que d'un seul
      côté : il lit un rapport pris depuis l'ORIGINE, pas depuis le sommet A.
      FACE B — le rapport est bien formé à un sommet, mais l'élève traite sa
      conclusion comme une propriété du triangle : « w n'est ni réel ni
      imaginaire pur au sommet A, donc ce triangle n'a rien de particulier »,
      ou « il est rectangle, donc rectangle vu de n'importe quel sommet ».
      Symptôme mécanique commun : le sommet n'apparaît pas dans le
      raisonnement. L'erreur de la face A est invisible quand z_A = 0 — cas
      où z_C − z_A vaut exactement z_C — et c'est précisément le cas de tous
      les exemples habituels.
    contradicts_principle: >-
      w se lit sur les deux VECTEURS issus d'un sommet NOMMÉ : z_C − z_A est
      l'affixe de AC, z_B − z_A celle de AB. Son module est le quotient AC/AB
      et son argument l'angle en A. (a) z_C/z_B est le rapport pris au sommet
      O — un rapport parfaitement licite, et l'examen l'emploie quand le
      sommet EST l'origine (bank.yaml:463, :812) —, mais il ne dit rien du
      triangle ABC dès que A n'est pas l'origine : w ne change pas quand on
      déplace la figure, alors que z_C/z_B change à chaque déplacement.
      (b) La table des configurations classe un COUPLE (triangle, sommet),
      pas un triangle : le même triangle peut n'allumer aucune ligne au
      sommet A et « rectangle » au sommet C. « Rien ici » ne veut pas dire
      « rien », et « rectangle ici » ne veut pas dire « rectangle partout ».
    voisins:
      - angle-lu-depuis-l-axe   # AVANT que le rapport existe (ici) vs APRÈS (là-bas)
      - transformation-centre-oublie  # même oubli du point de départ, côté transformation
```

*La phrase (a) de `contradicts_principle` est exactement ce que la `suite` de S1 fait constater
sur quatre placements (§7.1), et la phrase (b) ce que le pari de S3 fait prédire : **le principe
et les gestes de la scène sont la même chose**.*

> ⚠ **La clause « — un rapport parfaitement licite, et l'examen l'emploie quand le sommet EST
> l'origine » est AJOUTÉE EN VAGUE 1 (fidélité I9), et elle est load-bearing.** Sans elle, le
> modèle enseignerait qu'un rapport d'affixes ne veut rien dire — **ce qui est faux, et que la
> banque contredit deux fois** : `bank.yaml:812` (« *« Rectangle en $O$ » signifie […]
> $\dfrac{z_1}{z_2}$ imaginaire pur (chapitre 7)* ») et `:463` (« *$O$, $A$, $B$ sont alignés si
> et seulement si le rapport $\dfrac{b}{a}$ […] est réel* »). **La scène tenait déjà cette
> nuance** (le cran `origine`, §5.2 B) ; **le modèle et les items doivent la tenir aussi**
> (§8.3, contrainte de retour).

### 8.2 bis Un modèle EXISTANT à élargir avant recrutement — `angle-lu-depuis-l-axe` (vague 1, fidélité I2)

**Le défaut, mesuré.** Le §0.2 point 2 affirmait que ce modèle « *se transpose mot pour mot* » et
que « *la scène le recrute à S2, sans le redéclarer* ». **Son texte déclaré ne le permet pas** :

> `items.yaml:258-264` : « *Devant M et son **image** M′, l'élève donne arg(z′) […] Forme jumelle
> sur les longueurs : il donne OM′ pour le rapport de l'**homothétie**, au lieu du quotient
> OM′/OM.* »
> `items.yaml:265-270` : « *L'angle d'une **rotation** (ou d'une rotation-homothétie) de
> **centre** Ω est l'ÉCART arg(z′ − z_Ω) − arg(z − z_Ω)…* »

**Et le §9.2 de cette scène interdit dans son panneau `rotation`, `homothétie`, `centre`,
`image de M`.** *La scène bannissait donc le vocabulaire dans lequel vit le modèle qu'elle
recrute — pendant que le §8.1 appliquait exactement ce test pour REFUSER
`transformation-centre-oublie` et `rotation-sens-inverse`. Le test strict était passé sur les
deux refus et sauté sur le seul emprunt.*

**L'édit, écrit ici pour qu'item-author n'ait rien à deviner. Deux clauses ajoutées, rien
retiré :**

```yaml
  - id: mc.math.maths_complexes_trigo.angle-lu-depuis-l-axe
    label: >-
      « Angle lu comme une DIRECTION (depuis l'axe réel) au lieu de l'ÉCART
      entre deux directions ; longueur lue au lieu du QUOTIENT de deux
      longueurs »
    description: >-
      Devant M et son image M′, l'élève donne arg(z′) — la direction de
      l'image mesurée depuis l'axe réel — comme angle de la rotation ; ou
      donne arg(z′ − z), la direction du déplacement. Forme jumelle sur les
      longueurs : il donne OM′ pour le rapport de l'homothétie, au lieu du
      quotient OM′/OM. MÊME ERREUR SANS AUCUNE TRANSFORMATION : devant un
      rapport de deux vecteurs w = (z_C − z_A)/(z_B − z_A), il donne
      arg(z_C − z_A) — la direction d'un seul côté depuis l'axe réel — pour
      arg(w), et la longueur AC pour |w|. Dans tous les cas la grandeur et
      l'opération sont les bonnes ; c'est le point de départ de la mesure qui
      est faux, et le second terme de la comparaison qui est oublié.
    contradicts_principle: >-
      Un ÉCART de deux directions n'est pas une direction, et un QUOTIENT de
      deux longueurs n'est pas une longueur. L'angle d'une rotation (ou d'une
      rotation-homothétie) de centre Ω est l'ÉCART arg(z′ − z_Ω) −
      arg(z − z_Ω) = arg((z′ − z_Ω)/(z − z_Ω)) = arg(c), et son rapport est le
      QUOTIENT ΩM′/ΩM = |c| ; de même, l'argument de (z_C − z_A)/(z_B − z_A)
      est l'écart des directions de AC et de AB — l'angle en A — et son module
      le quotient AC/AB. arg(z′) ne donne l'angle que si arg(z − z_Ω) = 0, et
      OM′ ne donne le rapport que si ΩM = 1 : deux cas particuliers, pas la
      règle. Un rapport a toujours DEUX termes.
    label_change: true   # le libellé cesse de dire « d'une transformation »
```

**Ce que l'élargissement ne casse pas, vérifié :** les quatre items attachés (NBCOMPLEX2-35,
-36, -37, -40, `items.yaml:2782`) sont **tous R5**, tous sur une transformation, et **tous
couverts par la première moitié du texte, inchangée**. *Aucun ne perd son attache.*

**Contrainte de calendrier, non négociable :** `validate-content` exige qu'un pari de scène
nomme un modèle **déclaré**. **Cet édit doit donc être appliqué AVANT la validation de la
scène**, au même titre que la déclaration de `w-sommet-ignore` — §12, ordre de construction,
étape 1.

### 8.2 ter TROIS modèles existants dont la DESCRIPTION est plus étroite que leurs propres items (seconde passe, pédagogie IM-4 / fidélité NEW-3)

> **D'où cela vient.** La règle (e) du §14.0 — *ouvrir le texte déclaré du modèle et vérifier
> qu'il décrit CE geste-là* — avait été écrite en vague 1 après une seule trouvaille, et **lancée
> une seule fois**. Les deux critiques ont fait la même remarque : *une règle écrite après un
> constat et jamais exécutée n'est pas un instrument.* **Elle est lancée sur les 32 choix, et le
> verdict est une table** (§14.0 bis).
>
> **Ce qu'elle a trouvé est plus intéressant que « deux attributions étirées ».** Dans les trois
> cas, **la `description` du modèle est plus étroite que les items que le corpus lui attache
> DÉJÀ** — ce n'est donc pas une attribution inventée par cette scène, c'est une description qui
> n'a jamais rattrapé ses propres items. *Le premier des trois le montre sans appel.*
>
> **Les trois édits sont ADDITIFS. Vérifié pour chacun : aucun item existant ne perd son
> attache.** Tous trois sont **livrables d'item-author avant `validate-content`**, au même titre
> que le §8.2 et le §8.2 bis — §12, ordre de construction, étape 1.

**(a) `lecture-w-module-argument` — la face « bonne grandeur, MAUVAIS SEUIL ».**

*Choix concernés : **S3 `rectangle-en-A`** et **NBCOMPLEX2-44 C** (« *rectangle en $P$, puisque
l'argument de $\frac{r-p}{q-p}$ n'est pas nul* »).*
**Le défaut :** la `description` (`items.yaml:214-216`) dit « *l'élève **échange les rôles** du
module et de l'argument, **ou n'en lit qu'un des deux*** ». **Ces deux choix ne sont ni l'un ni
l'autre** : l'élève lit la **bonne** grandeur (l'argument, qui est bien ce qui décide de
« rectangle ») et la compare au **mauvais seuil** (« non nul » au lieu de $\pm\frac{\pi}{2}$).
**La preuve que l'attribution est juste et que c'est la description qui est en retard :
`items.yaml:567-575` — NBCOMPLEX2-6, choix B, dans le corpus livré — est *mot pour mot* ce geste
(« *Le triangle $ABC$ est rectangle en $A$* », retour : « *pas pour n'importe quel argument non
nul* »), **et il porte déjà `lecture-w-module-argument`**.** *Et le `contradicts_principle`
(`:217-220`) le couvre explicitement : « *$\arg(w)$ donne l'angle en $A$ (rectangle si
$\pm\pi/2$…)* ». **Seule la `description` ne le dit pas.***

```yaml
  - id: mc.math.maths_complexes_trigo.lecture-w-module-argument
    label: >-
      « Lecture partielle, intervertie, ou lue contre le mauvais seuil, de |w|
      (isocèle) et arg(w) (rectangle/aligné) »
    description: >-
      Pour w = (z_C−z_A)/(z_B−z_A), l'élève échange les rôles du module et de
      l'argument, ou n'en lit qu'un des deux, pour la nature du triangle.
      TROISIÈME FACE, sans échange ni oubli : il lit la BONNE grandeur et la
      compare au MAUVAIS SEUIL — « l'argument n'est pas nul, donc rectangle »
      au lieu de « l'argument vaut ±π/2 », ou « le module n'est pas 1, donc
      rien » là où l'argument décide seul. Chaque ligne de la table demande
      une valeur PRÉCISE, pas une valeur différente d'une autre.
    contradicts_principle: >-
      |w| donne le rapport AC/AB (isocèle en A si |w| = 1) et arg(w) donne
      l'angle en A (rectangle si ±π/2, aligné si réel) : deux critères SÉPARÉS,
      chacun sur sa grandeur, et chacun avec son SEUIL exact. « Différent de
      zéro » n'est le seuil d'aucune ligne.
```

*Ce que l'élargissement ne casse pas, vérifié : les trois items attachés (NBCOMPLEX2-6, -20, -21,
`items.yaml:2779`) restent couverts par la première moitié, **inchangée** — et -6 B est même
**mieux** couvert qu'avant.*
⚠ **Conséquence sur la question §13.6 (« un modèle ou trois ? ») : elle devient mieux posée, pas
tranchée.** Le §13.6 listait la troisième face hypothétique comme « *argument lu contre la
mauvaise ligne* » ; **elle est désormais DÉCLARÉE**, ce qui la rend comptable si le propriétaire
décide un jour de scinder. **Le défaut reste UN modèle** — le scindement coûte toujours six
items.

**(b) `ensemble-points-locus-confondu` — un terme de plus dans l'énumération des lieux.**

*Choix concernés : **S4 `cercle-unite`** et **NBCOMPLEX2-45 C** (« le cercle de centre $O$ et de
rayon $1$ »).*
**Le défaut :** la `description` (`items.yaml:224-227`) nomme « *au mauvais lieu (**médiatrice,
cercle centré en $A$, droite $(AB)$**)* » — **trois lieux, et aucun n'est un cercle centré sur un
point qui ne joue AUCUN rôle dans la condition.** *La clause de tête (« identifie l'ensemble […]
au mauvais lieu ») et le `contradicts_principle` (« *« module constant » donne un cercle ou une
médiatrice **selon la forme*** ») couvrent bien le geste ; **c'est l'énumération qui est en
retard**, et ce document se refuse ailleurs à recruter sur une clause de tête quand l'énumération
dit autre chose (§8.1, les deux refus).*
**Attestation la plus proche dans le corpus livré : `items.yaml:2140-2148` (NBCOMPLEX2-32 B) —
« *Le CERCLE de centre $1$ et de rayon $\vert -2i\vert = 2$* », avec le retour « *Un cercle
correspond à $\vert z-a\vert = R$ — une distance CONSTANTE à un point fixe* ».** *C'est la même
mécanique — lire la VALEUR comme une DISTANCE À UN POINT — mais le centre y est encore l'un des
deux points nommés. **Le cercle de centre $O$ est un cran plus loin, et il n'a aucun précédent :
je le déclare plutôt que de le supposer couvert.***

```yaml
    description: >-
      L'élève identifie l'ensemble défini par une condition sur le module ou
      l'argument d'un rapport de complexes au mauvais lieu (médiatrice, cercle
      centré en A, cercle de centre O, droite (AB)). Forme fréquente sur le
      module : il lit la VALEUR du rapport comme une DISTANCE À UN POINT FIXE
      — « |u| = 1, donc M est à distance 1 de l'origine » —, alors que le
      rapport ne compare que MA et MB et que O n'intervient nulle part.
```

*(`label` et `contradicts_principle` inchangés. Les trois items attachés — -24, -32, -33 — sont
couverts par la clause de tête, inchangée.)*

**(c) `produit-quotient-argument-operation` — la forme AMONT, avant qu'aucun argument existe.**

*Choix concernés : **S1 `ordre-inverse`**, **NBCOMPLEX2-42 D**, **NBCOMPLEX2-43 B** — trois des
quatre attributions de ce modèle dans cette livraison.*
**Le défaut :** la `description` (`items.yaml:75-78`) est écrite **entièrement sur les
arguments** (« *soustrait les arguments […] inverse l'ordre de la soustraction* »). Or à S1 le
mot `argument` est une **chaîne interdite** (§7.5 C), -42 D est une **égalité algébrique**, et
-43 B est un **rapport de longueurs**. *La vague 1 avait déclaré ce décalage pour S1 seul, avec
un repli qui n'existe pas (§8.1). **Un modèle dont trois quarts des nouvelles attributions vivent
hors de son texte n'est pas « déclaré » : il est étiré.***

```yaml
    description: >-
      L'élève soustrait les arguments pour un produit, les additionne pour un
      quotient, inverse l'ordre de la soustraction, ou oublie un terme ou un
      signe. FORME AMONT, avant tout calcul d'argument : devant un rapport
      w = (z_C − z_A)/(z_B − z_A), il écrit la fraction dans l'ordre inverse —
      même inversion, un cran plus tôt. Elle ne se voit pas sur la conclusion
      (les critères de configuration sont invariants par w ↦ 1/w) mais sur le
      QUOTIENT DES LONGUEURS, qui se retourne, et sur le SIGNE de l'angle, qui
      change.
    contradicts_principle: >-
      arg(zz') = arg(z)+arg(z') (produit) et arg(z/z') = arg(z)−arg(z')
      (quotient, dans cet ordre) : l'opération sur les arguments suit celle des
      modules, sans terme ni signe oublié. Et une fraction écrite à l'envers
      n'est pas la même : 1/w a pour module 1/|w| et pour argument −arg(w).
```

*Ce que l'élargissement ne casse pas, vérifié : les quatre items attachés (NBCOMPLEX2-2, -12,
-14, -35, `items.yaml:2764`) portent tous sur des arguments et restent couverts par la première
moitié, inchangée.*
**Bénéfice de porte :** le retour de S1 `ordre-inverse` et celui de S2 `fraction-retournee`
disaient déjà, chacun, exactement ce que la clause neuve écrit (« *inverser la fraction inverse
le rapport des longueurs et change le SIGNE de l'angle* », §5.2 C, correctif de fidélité I1).
**Le modèle rejoint ses retours ; il ne les précède pas.**

> **Coût total des quatre interventions sur l'inventaire** *(un modèle neuf + trois
> élargissements)* **: quatre blocs YAML, tous additifs, tous avant `validate-content`.** *C'est
> une charge réelle pour item-author, et elle est délibérée : la règle (e) ne sert à rien si son
> verdict n'a pas de suite. **Le §14.1 en fait un « fait quand », et le §14.0 bis en garde la
> table.***

### 8.3 Les QUATRE items que la livraison exige (specs pour item-author)

**Plancher : ≥ 3 items par modèle neuf.** Trois items portent `w-sommet-ignore` en
`primary_misconception` (**-42, -43, -44**) ; un quatrième (**-45**) attaque
`ensemble-points-locus-confondu` par le critère de **module**, que rien ne teste aujourd'hui.
*Chaque distracteur porte un `misconception:` nommé, comme le reste du fichier.*

> ## ⚠ TROIS CONTRAINTES AJOUTÉES EN VAGUE 1, valables sur les quatre items
>
> **1 — `habilete:` OBLIGATOIRE, au vocabulaire MATHS** (fidélité I6). Valeurs :
> `application_directe` · `application_non_explicite` · `synthese_situations_inhabituelles`.
> **Pas** `raisonnement` ni `utilisation` : c'est le vocabulaire PC, et **les CINQ checkpoints de
> cette notion l'emploient à tort** (`checkpoints.yaml:88`, `:156`, `:227`, `:289`, `:352` ;
> `REVIEW:109-111`) — *cinq, relevés au `grep` en seconde passe ; le premier jet révisé écrivait
> « les deux », en reprenant pour un dénombrement les deux lignes que le critique donnait en
> exemple (fidélité NEW-7)*. *Le champ existe donc déjà dans la notion ; ces quatre items sont
> les premiers à le porter au bon vocabulaire. L'incohérence qui en résulte à l'intérieur de la
> notion est **déclarée** et appartient au correctif corpus-wide de S5 : §13.14.*
>
> **2 — CONTRAINTE DE RETOUR sur tout distracteur `w-sommet-ignore` de face A** (fidélité I9).
> Chaque retour **doit** (a) **nommer le sommet depuis lequel le mauvais rapport lit
> réellement** — c'est $O$ —, et (b) **ne jamais dire ou suggérer qu'un rapport d'affixes est
> vide de sens**. *Motif mesuré : l'examen lit exactement ce rapport quand le sommet EST
> l'origine — `bank.yaml:812` (« *« Rectangle en $O$ » signifie […] $\frac{z_1}{z_2}$ imaginaire
> pur (chapitre 7)* »), `:816`, `:463` (« *$O$, $A$, $B$ sont alignés si et seulement si le
> rapport $\frac{b}{a}$ est réel* »). Le premier jet écrivait deux fois, sur deux items, la même
> phrase « rien de particulier / on ne peut rien conclure » — **il apprenait à l'élève à jeter
> un outil que le bac utilise**.* **Formulation type, à adapter :** « *$\frac{z_C}{z_B}$ est un
> vrai rapport du chapitre 7 — mais lu **au sommet $O$**. Il répond à une question sur $O$, $B$
> et $C$, et l'examen s'en sert exactement ainsi quand le sommet est l'origine. Ici le sommet
> est $A$.* »
>
> **3 — VARIER $w$ et VARIER LA CONCLUSION** (pédagogie I11). Le premier jet donnait $w = i$ aux
> **trois** porteurs du modèle neuf, et -43/-44 étaient le même item à sommets renommés ; avec
> l'exemple travaillé (`lesson.md:392-406`, $w=-i$), la figure gelée et l'état de S1, cela
> faisait **six objets de R6 sur une seule configuration**. **Désormais : $w = i$ · $-\frac12$ ·
> $-\frac34 i$ ; conclusions : une égalité à vérifier · un **alignement** · un angle droit **à
> un sommet qu'il faut trouver**.**

**NBCOMPLEX2-42 — R6, `habilete: application_non_explicite`.**
*(`primary_misconception: w-sommet-ignore`)*
> $D$, $P$, $Q$ ont pour affixes $d = 1+i$, $p = 1+3i$, $q = 3+i$.
> **Montrer que $\dfrac{p-d}{q-d} = i$ revient à vérifier une seule égalité. Laquelle ?**

| | texte | misconception |
|---|---|---|
| **A** | $p - d = i\,(q - d)$ | **juste** |
| B | $p = i\,q$ | `w-sommet-ignore` *(face A : la soustraction jamais faite)* |
| C | $p - d = i\,q$ | `w-sommet-ignore` *(face A : la soustraction faite d'un seul côté)* |
| D | $q - d = i\,(p - d)$ | `produit-quotient-argument-operation` *(la fraction retournée — **forme AMONT**, texte élargi au **§8.2 ter (c)**)* |

*Vérifications : $p-d = 2i$, $q-d = 2$, donc $\frac{p-d}{q-d} = i$ ✓ et $i(q-d) = 2i = p-d$ ✓
(A vraie). $iq = i(3+i) = -1+3i \neq 1+3i = p$ ✓ (B fausse). $iq = -1+3i \neq 2i = p-d$ ✓ (C
fausse). $i(p-d) = i\cdot 2i = -2 \neq 2 = q-d$ ✓ (D fausse). **Une seule vraie**, et chacune des
trois autres est **exactement** ce qu'écrit le modèle qu'elle porte ✓.*

> **REFORMÉ EN VAGUE 1 (fidélité I8), et le motif est une mesure de format.** Le premier jet
> demandait « **Que vaut $w$ ?** » avec quatre nombres complexes en réponse — *la forme la plus
> éloignée de tout ce qui est attesté*. **`bac-reference.md:127-128` : le bac de maths est en
> « *several exercises, with a terminal synthesis question* » — réponse construite, barème ;
> aucun QCM.** Et le geste que la banque exécute sur ce rapport précis est **« Montrer que … » /
> « En déduire … »** : `bank.yaml:1202-1204` fait exactement ceci — « *On vérifie que
> $p-d = i(q-d)$ : le numérateur et $i$ fois le dénominateur coïncident terme à terme* », puis
> « *En déduire la nature du triangle $PDQ$* » (`:1208`). **L'item transpose ce geste sur
> d'autres nombres, en gardant la forme QCM que le banc impose** : on ne demande plus une
> valeur, on demande **quelle égalité il faut vérifier** — le premier pas de la démonstration,
> celui qui échoue précisément quand le sommet est oublié.

**NBCOMPLEX2-43 — R6, `habilete: application_directe`.**
*(`primary_misconception: w-sommet-ignore`)*
> $A$, $B$, $C$ ont pour affixes $z_A = 1+2i$, $z_B = 5+4i$, $z_C = -1+i$.
> Que peut-on dire de ces trois points ?

| | texte | misconception |
|---|---|---|
| **A** | Ils sont **alignés**, et $AC = \dfrac12\,AB$ | **juste** |
| B | Ils sont alignés, et $AC = 2\,AB$ | `produit-quotient-argument-operation` *(la fraction retournée : $\frac{z_B-z_A}{z_C-z_A} = -2$, lu comme $\frac{AC}{AB}$ — **forme AMONT**, sur le quotient des LONGUEURS : texte élargi au **§8.2 ter (c)**)* |
| C | Ils ne sont **pas** alignés, car $\vert w\vert = \dfrac12 \neq 1$ | `lecture-w-module-argument` *(le critère du module appliqué à une question d'angle)* |
| D | Ils ne sont **pas** alignés, car $\dfrac{z_C}{z_B}$ n'est ni réel ni imaginaire pur | `w-sommet-ignore` *(face A)* |

*Vérifications : $z_B - z_A = 4+2i$ ; $z_C - z_A = -2-i = -\frac12(4+2i)$, donc
$w = \frac{z_C-z_A}{z_B-z_A} = -\frac12$ ✓ — **réel négatif ⟹ alignés**, avec $C$ du côté opposé
à $B$. $AB = \vert 4+2i\vert = 2\sqrt5$, $AC = \vert -2-i\vert = \sqrt5$, donc
$\frac{AC}{AB} = \frac12 = \vert w\vert$ ✓. Distracteur B : $\frac1w = -2$, de module $2$ ✓.
Distracteur D : $\frac{z_C}{z_B} = \frac{(-1+i)(5-4i)}{41} = \frac{-5+4i+5i+4}{41} =
\frac{-1+9i}{41}$, ni réel ni imaginaire pur ✓ — **le modèle mène bien à « pas alignés »**.*

> **Trois choses ont changé en vague 1.** *(i)* L'item **concluait « rectangle et isocèle en
> $A$ » avec $w = i$** — la même conclusion et la même valeur que -42, -44 et l'exemple travaillé
> de la leçon ; **il conclut désormais à un ALIGNEMENT**, ligne de la table qu'un seul item du
> corpus touche (-20, avec $z_A = 0$ et $z_B = 1$). *(ii)* Son distracteur `w-sommet-ignore`
> disait « rien de particulier » ; **il dit maintenant ce que le modèle produit vraiment**
> (« pas alignés »), et son retour porte la contrainte n° 2 ci-dessus. *(iii)* Le distracteur B
> **fait travailler ce que l'inversion change vraiment** — le rapport des longueurs — au lieu de
> supposer qu'elle change la conclusion (fidélité I1).
> **Les affixes ne sont celles d'aucun état de la scène** ($z_A = 1+2i$ n'est aucun placement)
> et $z_A \neq 0$ : l'item ne peut être réussi ni de mémoire, ni par le raccourci.

**NBCOMPLEX2-44 — R6, `habilete: application_non_explicite` (le sommet qu'il faut TROUVER).**
*(`primary_misconception: w-sommet-ignore`, face B)*
> $P$, $Q$, $R$ ont pour affixes $p = 1+i$, $q = 5+i$, $r = 5+4i$.
> Le triangle $PQR$ est-il rectangle ? Si oui, en quel sommet ?

| | texte | misconception |
|---|---|---|
| **A** | Oui — **rectangle en $Q$** | **juste** |
| B | Non : $\dfrac{r-p}{q-p} = 1+\dfrac34 i$ n'est ni réel ni imaginaire pur, et son module ne vaut pas $1$ | `w-sommet-ignore` *(**face B** : le verdict lu au sommet $P$, appliqué au triangle)* |
| C | Oui — **rectangle en $P$**, puisque l'argument de $\dfrac{r-p}{q-p}$ n'est pas nul | `lecture-w-module-argument` *(face « bonne grandeur, mauvais seuil » — texte élargi au **§8.2 ter (a)**, seconde passe)* |
| D | Non : $\dfrac{r}{q}$ n'est ni réel ni imaginaire pur | `w-sommet-ignore` *(face A)* |

*Vérifications. Au sommet $P$ : $r-p = 4+3i$, $q-p = 4$, donc $\frac{r-p}{q-p} = 1+\frac34 i$ —
ni réel, ni imaginaire pur, module $\frac54$ ✓ (B est bien ce que le modèle produit). **Au
sommet $Q$** : $r-q = 3i$, $p-q = -4$, donc $\frac{r-q}{p-q} = -\frac34 i$ — **imaginaire pur
⟹ rectangle en $Q$** ✓, et module $\frac34 \neq 1$ ⟹ **pas isocèle**. Au sommet $R$ :
$p-r = -4-3i$, $q-r = -3i$, donc $\frac{p-r}{q-r} = \frac{-4-3i}{-3i} = \frac{4+3i}{3i} =
\frac{(4+3i)(-i)}{3} = \frac{3-4i}{3} = 1-\frac43 i$ — rien ✓. Contrôle géométrique :
$PQ = 4$, $QR = 3$, $PR = 5$, et $16+9 = 25$ ✓. Distracteur D :
$\frac{r}{q} = \frac{(5+4i)(5-i)}{26} = \frac{25-5i+20i+4}{26} = \frac{29+15i}{26}$, ni réel ni
imaginaire pur ✓.*

> **C'est le seul objet du corpus — items, checkpoints, figures, exemples travaillés — qui lit
> le MÊME triangle depuis plus d'un sommet** (§7.6). *Il mesure la face B du modèle neuf, celle
> que le pari de S3 fait prédire, et il porte à lui seul les deux faces (B et D).*
> **Le sommet ne s'appelle pas $A$, et ce n'est pas le premier de la liste** — la forme que la
> banque emploie (`bank.yaml:1204`, sommet $D$ ; `:656`, sommet $R$).
> **Et l'ordre des fractions écrites dans les options suit celui qui raccourcit le calcul, pas
> une règle** : c'est ce que fait l'examen (§5.2 C), et **l'inversion ne changerait aucune des
> quatre réponses** — $\frac1{-\frac34 i} = \frac43 i$, toujours imaginaire pur.

**NBCOMPLEX2-45 — R6, `habilete: application_non_explicite` (le lieu par le MODULE).**
*(`primary_misconception: ensemble-points-locus-confondu`)*
> $A$ et $B$ ont pour affixes $z_A = -3$ et $z_B = 1$. Quel est l'ensemble des points $M$
> d'affixe $z \neq z_B$ tels que $\left\vert\dfrac{z-z_A}{z-z_B}\right\vert = 1$ ?

| | texte | misconception |
|---|---|---|
| **A** | la **médiatrice** du segment $[AB]$ | **juste** |
| B | le **cercle de diamètre $[AB]$**, privé de $A$ et $B$ | `ensemble-points-locus-confondu` |
| C | le **cercle de centre $O$ et de rayon $1$** | `ensemble-points-locus-confondu` *(énumération élargie au **§8.2 ter (b)**, seconde passe : elle ne nommait pas le cercle de centre $O$)* |
| D | la **droite $(AB)$**, privée de $B$ | `ensemble-points-locus-confondu` *(ré-attribué en vague 1 — pédagogie I12)* |

*Vérifications : $\left\vert\frac{z-z_A}{z-z_B}\right\vert = \frac{MA}{MB}$, qui vaut $1$
exactement quand $MA = MB$ ⟹ médiatrice de $[AB]$ ✓ (ici la droite d'équation $x = -1$). Le
cercle de diamètre $[AB]$ répond à « rapport **imaginaire pur** » ✓ (c'est la réponse de
NBCOMPLEX2-24, sur d'autres points) ; la droite $(AB)$ répond à « rapport **réel** » ✓.
**Les affixes $(-3\,;\,1)$ ne sont celles ni de NBCOMPLEX2-24 ($-1\,;\,3$), ni de
`cp-ensemble-points` ($-1\,;\,3$), ni de la scène ($-2\,;\,2$)** ✓.*

> **Le distracteur D est ré-attribué** (pédagogie I12) : le texte déclaré
> d'`ensemble-points-locus-confondu` nomme « *le mauvais lieu (médiatrice, cercle centré en $A$,
> **droite $(AB)$**)* » (`items.yaml:221-232`). *Le rattacher à `lecture-w-module-argument`,
> dont le texte ne parle pas de lieux, était le correctif B1 de la vague 1 de la scène sœur
> reproduit à l'identique. **Conséquence sur le registre : `lecture-w-module-argument` passe de
> 6 à 5 attendus — toujours au-dessus du plancher** (§8.4).*
>
> **C'est le seul objet du corpus qui interroge le critère de MODULE sur un rapport.** Les
> trois items existants d'`ensemble-points-locus-confondu` portent sur l'argument (-24), sur
> une égalité de distances (-32) ou sur les racines (-33). *Le distracteur C — « $\vert u\vert=1$
> donc $M$ est sur le cercle unité » — est la face que la scène met en pari à S4, et qu'aucun
> item ne mesure aujourd'hui.*
>
> ⚠ **Réserve de vague 1 (fidélité M8), déclarée plutôt que découverte plus tard : la FORME de
> cet item n'est attestée dans aucune des dix annales vérifiées.** `grep` sur `bank.yaml` :
> **« médiatrice » y apparaît ZÉRO fois** (toutes les occurrences du corpus sont dans
> `items.yaml` et `checkpoints.yaml`). La route attestée vers une médiatrice est
> $\vert z-a\vert = \vert z-b\vert$ (NBCOMPLEX2-32, `items.yaml:2131-2133`), **pas**
> $\left\vert\frac{z-a}{z-b}\right\vert = 1$. *La forme est **dans le cadre** — c'est une
> réécriture triviale, couverte par `maths-sexp.yaml:254` et `maths-sm.yaml:225` — et c'est la
> bonne face diagnostique pour ce modèle (le critère de module sur un RAPPORT, que rien ne
> mesure). **Mais le pari central de S4 et cet item reposent tous deux sur une forme que les dix
> annales n'écrivent pas**, et un document qui mesure doit le dire.* **Porté au `fit_caveat`,
> §10.14.**

### 8.4 Le solde de couverture, honnête

*Comptes au niveau **ITEM** (un item compte une fois par modèle, qu'il le porte en
`primary_misconception` ou dans un distracteur) — méthode déclarée d'`items.yaml:2751-2756`.*

| modèle | avant | après | items ajoutés | marge au plancher (3) |
|---|---|---|---|---|
| **`w-sommet-ignore`** *(neuf, deux faces)* | — | **3** | -42 (B, C = face A), -43 (D = face A), -44 (B = **face B**, D = face A) | **0 — déclarée** |
| `lecture-w-module-argument` | 3 | **5** | -43 (C), -44 (C) | 2 |
| `ensemble-points-locus-confondu` | 3 | **4** | -45 *(primaire ; B, C **et D**)* | 1 |
| `produit-quotient-argument-operation` | 4 | **6** | -42 (D), -43 (B) | 3 |
| `angle-lu-depuis-l-axe` | 4 | **4** | *(aucun — servi par la SCÈNE, pas par le banc ; **son texte est élargi**, §8.2 bis)* | 1 — ⚠ **mais voir la dette ci-dessous : sa moitié NEUVE est à ZÉRO** |
| **`total_items`** | **41** | **45** | **+4** | — |
| **`ramp_coverage.R6`** | **4** | **8** | -42, -43, -44, -45 | — |

*Le registre a changé en vague 1 : le premier jet donnait `lecture-w-module-argument` **6** et
`produit-quotient-argument-operation` **5**. La ré-attribution du distracteur D de -45
(pédagogie I12) et la refonte de -43 déplacent deux attaches. **Les cinq modèles restent au
plancher ou au-dessus** ✓.*

**Aucun item n'est retiré.** *Treize modèles siègent exactement à 3 (`items.yaml:2795-2810`) ;
cette livraison n'en touche aucun à la baisse, **en sort un** (`ensemble-points-locus-confondu`)
et **en crée un** à marge nulle.*

**La mesure d'habileté, désormais CALCULABLE sur ce paquet** (vague 1, fidélité I6) :

| | `application_directe` | `application_non_explicite` | `synthese_situations_inhabituelles` |
|---|---|---|---|
| les quatre items neufs | **1** (-43) | **3** (-42, -44, -45) | **0** |
| en part | **25 %** | **75 %** | **0 %** |
| cible SM (`maths-sm.yaml:40-42`) | 40 % | 40 % | **20 %** |
| cible SExp (`maths-sexp.yaml:41-43`) | 50 % | 35 % | **15 %** |

**Ce que ce paquet NE referme pas :**
- **`w-sommet-ignore` part à marge nulle, et avec DEUX faces déclarées.** *Un modèle neuf à
  exactement trois items n'est confidence-bearing qu'au plancher : le moindre retrait le casse.
  Et une seule des trois attaches porte la face B (-44).* **Déclaré** — c'est le même choix, et
  le même aveu, que `multiplication-rotation-par-defaut` à la livraison précédente. §13.14.
- **Le paquet ajoute 0 % de niveau 3 contre une cible SM de 20 %, et ce n'est plus un
  non-verdict : c'est un chiffre.** *Ce qui porterait le niveau 3 dans cette notion, c'est
  `[[exercise:r-bac]]`, pas le banc.* **Manque mesuré sur les quatre items neufs ; le rapport
  sur les 41 items existants reste, lui, incalculable** (§0.3, NON-VERDICT corpus-wide,
  ADR 0034).
- **LE FORMAT — et il faut le dire sous sa forme exacte** *(refait en vague 1, fidélité I8)*.
  Le premier jet écrivait « les quatre items neufs sont des QCM » en le rattachant à la marche
  de niveau 3. **La formulation exacte est plus dure : le bac de maths ne contient AUCUN QCM.**
  `bac-reference.md:127-128` : « *Mathématiques : several exercises, with a **terminal synthesis
  question** carrying the niveau-3 demand.* » Et les dix entrées vérifiées sont, sans exception,
  en réponse construite avec barème — `bank.yaml:338` « *En déduire que $(O\Omega) \perp (AB)$…*
  », `:353` « *Montrer que…* », `:654` « *En déduire que le triangle $PQR$ est équilatéral* »,
  `:810` « *Déterminer l'ensemble $\Gamma$…* », `:1208` « *En déduire la nature du triangle
  $PDQ$* », `:2028` « *Déterminer l'ensemble des points $M$…* ». **Quatre QCM de plus ne
  referment donc ni la marche de niveau 3, ni la lacune de FORMAT** (`REVIEW:201-204`, D13 : la
  lacune structurelle de cette notion est l'absence de rung en réponse construite).
  *Ce que la vague 1 a obtenu en échange : **NBCOMPLEX2-42 imite désormais le geste attesté**
  (« Montrer que … $= i$ », `bank.yaml:1202-1204`) à l'intérieur de la forme QCM. C'est un
  rapprochement, pas une fermeture, et je ne prétends pas le contraire.*
- **`lecture-w-module-argument` gagne deux items mais reste servi UNIQUEMENT en R6/R7** : la
  scène ne change rien au fait que ce modèle n'est jamais mesuré ailleurs.
- ⚠ **AJOUTÉ EN SECONDE PASSE (fidélité NEW-2) — `angle-lu-depuis-l-axe` part avec une MOITIÉ À
  ZÉRO ITEM, et c'est la dette que le premier jet révisé ne déclarait pas.** Le §8.2 bis étend le
  texte du modèle de la seule **transformation** à un **rapport de deux vecteurs**
  ($w = \frac{z_C-z_A}{z_B-z_A}$) — c'est-à-dire qu'il lui ouvre une face **R6**. Or **les quatre
  items attachés (NBCOMPLEX2-35, -36, -37, -40, `items.yaml:2782`) sont TOUS R5 et tous sur une
  transformation**, et cette livraison ne lui en ajoute aucun : **la face R6 est mesurée par zéro
  item, contre un plancher de trois.** *C'est exactement la forme de la face B de
  `w-sommet-ignore`, que le §13.14 (b) déclare en entier — **ce document en déclarait une et pas
  l'autre.*** **Elle est servie par la SCÈNE (S2, `valeurs-absolues`) et par rien d'autre.**
  *Aucun item n'est exigé ici — la scène est le bon endroit pour cette face —, mais la dette doit
  porter un nom, sans quoi elle est invisible* (ADR 0036). **§13.14 (c).**
- ⚠ **AJOUTÉ EN SECONDE PASSE — les deux autres élargissements du §8.2 ter n'ajoutent ni ne
  retirent aucun compte.** *Vérifié : un élargissement de `description` ne déplace pas une
  attache. `lecture-w-module-argument` reste à **5**, `ensemble-points-locus-confondu` à **4**,
  `produit-quotient-argument-operation` à **6**. **Ce qu'ils changent, c'est que le compte
  MESURE ce qu'il prétend mesurer** — trois faces qui étaient servies sans être déclarées le sont
  désormais.*

---

## 9. La frontière — ce que la scène n'affiche jamais

Chaînes **interdites dans le panneau ouvert**, mesurées par la porte (§11.3, `frontiere`),
**et chacune avec son essai rouge** (§11.4).

> **On interdit des FORMES, pas des noms** (ADR 0036). Chaque ligne liste les **variantes
> d'écriture**, symbole et forme LaTeX comprises. La porte les cherche dans le texte **RENDU**
> — en remplaçant chaque `.katex` par son **annotation TeX** —, **en début de mot et en
> Unicode**. **Et la frontière s'applique AUX TEXTES DE CETTE SPEC** : relu, le §7 n'écrit
> aucune forme interdite au §9.

1. **FRONTIÈRE DE RANG ET DE CADRE — aucun birapport, aucune cocyclicité.** *Ne vient pas d'une
   `limite` mais d'un constat mesuré du corpus : `bank.yaml:97-118` (SCOPE NOTE 2) écrit que le
   birapport « *n'est couvert par AUCUN rung du corps actuel des deux frères-notions* », et sa
   mise à jour (`:120-148`) qu'une **quatrième** entrée en dépend désormais. **Une scène
   n'ouvre pas un rung que la notion n'a pas.*** Interdits : `birapport`, `cocyclique`,
   `cocycliques`, `quatre points`, `même cercle`, `\dfrac{z_4-z_2}{z_4-z_1}`.
   *Le mot « **cercle** » seul est autorisé (la scène en dessine deux en `mode: lieu` : le cercle
   unité et le cercle de diamètre), et « **cercle de diamètre $[AB]$** » l'est à S4 — c'est le
   nom du lieu, pas le nom d'un théorème. **La porte cherche les syntagmes, pas le mot isolé.***
1 bis. **AUCUN NOM DE THÉORÈME DANS LE PANNEAU — et c'est une frontière séparée, pas un
   sous-cas de la précédente** *(dégroupé en vague 1, fidélité I5)*. Interdits :
   `angle inscrit`, `Thalès`, `thalès`, `théorème des milieux`.
   *Motif — et **il n'est pas de cadre** : le théorème de l'angle inscrit est parfaitement dans
   le programme, la banque le nomme (`bank.yaml:1064`), et **la prose du §4.4 le nomme
   désormais une fois** (correctif de vague 1). Ce qui est interdit ici est plus étroit : **la
   scène vient AVANT la prose** ; nommer un théorème dans un pari, c'est donner la méthode dans
   la réponse — l'anti-motif même que `REVIEW:132-137` reproche au corpus. **Le panneau nomme le
   LIEU ; la prose nomme le théorème.*** *Le premier jet rangeait `angle inscrit` et `Thalès`
   sous la frontière « birapport / cocyclicité », ce qui se lisait comme si le cadre les
   excluait. Il ne les exclut pas.* §13.3.
2. **Aucun vocabulaire de TRANSFORMATION dans le panneau — c'est la frontière RÉCIPROQUE de
   celle de la scène sœur.** Sa §9.1 s'interdit `w`, `z_C`, `triangle`, `isocèle`, `aligné` ;
   celle-ci s'interdit `rotation`, `rotations`, `homothétie`, `homothéties`, `centre`,
   `point fixe`, `\omega`, `z' = az`, `z'=az+b`, `e^{i\theta}z`, `image de M`, `antécédent`.
   *Motif : la prose fait déjà le pont (`lesson.md:367`, commandé par la spec sœur §4.5). Un
   panneau qui le referait mélangerait les deux objets — « quelle transformation ? » et « quelle
   configuration ? » — dans la seule scène où l'élève doit apprendre à les distinguer.*
3. **Le mot « similitude » et ses dérivés — INTERDITS DANS LE PANNEAU.** `maths-sexp.yaml:258`
   le réserve à SM ; `maths-sm.yaml:232` en exclut la forme indirecte ; la prose de R5 l'emploie
   déjà **une fois, marquée de filière** (`lesson.md:327`, décision de la spec sœur §4.4), et
   c'est assez. Interdits : `similitude`, `similitudes`, `similaire`, `semblable`.
   *⚠ Seconde passe (pédagogie, MINEUR 5) : la qualification « *(en position de transformation)* »
   est **retirée** — une porte qui cherche une chaîne en début de mot ne sait pas lire une
   position, donc la ligne était inerte (ADR 0034). **`semblable` est interdit sans condition** ;
   aucun texte du §7 ne l'emploie, vérifié.*
4. **Aucune similitude indirecte, aucun antidéplacement, aucune géométrie projective.**
   `maths-sm.yaml:232`. Interdits : `indirecte`, `antidéplacement`, `z \mapsto \bar z`,
   `réflexion`, `symétrie glissée`, `symétrie axiale`, `retournement`, `projectif`,
   `projective`, `inversion`, `birapport` *(déjà au §9.1 — la double garde est voulue : il est
   à la fois hors rung et hors limite)*.
5. **Aucune racine n-ième, aucune équation $z^n = a$.** `maths-sexp.yaml:305`
   (**`exclusions_transversales`**) et `:257` (`limite` du chapitre). **Sans objet en R6**, et
   interdit quand même. Interdits : `racine n-ième`, `racines de l'unité`, `z^n =`, `z^{n}`,
   `2k\pi/n`, `polygone régulier`, `\rho e^{i\alpha}`.
6. **Aucune algèbre linéaire, aucune matrice, aucun déterminant.**
   `maths-sexp.yaml:302`, `:306` ; `maths-sm.yaml:343`. Interdits : `matrice`,
   `\begin{pmatrix}`, `déterminant`, `\det`, `application linéaire`, `endomorphisme`,
   `vecteur propre`, `base canonique`, `\mathbb{R}^2`, `produit mixte`.
   *⚠ Attention à un faux positif : le mot « **vecteur** » est **au cœur** de cette scène et
   **autorisé partout**. La porte cherche `vecteur propre`, jamais `vecteur` seul.*
7. **Aucune trigonométrie au-delà de la table de R1.** Interdits : `linéaris`, `Euler`,
   `e^{i\theta}+e^{-i\theta}`, `angle moitié`, `\cos^2`, `\cos^3`, `\sin^2`, `\sin^3`, `\tan`,
   `arctan`. *`REVIEW:82-90` (S2) : la linéarisation est un savoir-faire à 0 %, et ce n'est pas
   le travail de cette scène.*
8. **Aucun décimal dans une lecture, aucun degré.** *C'est la frontière de PRÉCISION du §5.4.*
   La porte relève, **dans les sept lectures uniquement**, toute occurrence de `,` ou `.` entre
   deux chiffres, et toute occurrence de `°`, `degré`, `deg`. **Et pendant le balayage de S4,
   les lectures chiffrées n'affichent que « — »** (§6.1).
   *Les **retours de pari** ont le droit d'écrire un ordre de grandeur, et **les occurrences
   sont inventoriées ici, RE-RELEVÉES après la réécriture des textes en vague 1**, pour que la
   porte les cherche au bon endroit :*
   | occurrence | où | forme |
   |---|---|---|
   | $50°$ | S2, retour `roles-echanges` (« un angle de $\frac{\sqrt3}{2}$ radian fait environ $50°$ ») | **degré** |
   | $30$ | S2, retour `roles-echanges` (« l'arc […] en fait $30$ ») | **degré implicite, en toutes lettres** |
   | $30°$ | S3, retour `rectangle-en-A` (« $\frac{\pi}{6}$, soit $30°$ ») | **degré** |
   | $3{,}46$ | S4, retour `cercle-unite` ($2\sqrt3 \approx 3{,}46$) | **décimale** |
   **UNE décimale et trois degrés, tous en position « ordre de grandeur », tous dans des
   retours, aucun dans une lecture ni dans une `suite`.**
   > ⚠ **RE-RELEVÉ UNE TROISIÈME FOIS EN SECONDE PASSE, après la réécriture de S3 et de S4.**
   > *Textes réécrits depuis le relevé précédent : la lecture `nature` aux douze états (§5.3 B),
   > les quatre retours de S3 et sa `suite`, la consigne de S4, son retour juste et sa `suite`,
   > le retour juste de S2, la `suite` de S1, et les quatre annonces de région vivante du
   > balayage (§5.5).* **Résultat : l'inventaire ne bouge pas — aucune décimale et aucun degré
   > neufs, et aucun des quatre existants n'a disparu.** *La lecture `nature` était le risque
   > principal (elle écrit désormais des valeurs) : **elle n'écrit que des radicaux exacts et des
   > fractions de $\pi$**, vérifié ligne à ligne au §5.3 B. Les annonces du balayage n'écrivent
   > qu'un invariant exact et un sens de variation en toutes lettres.*
   > *Deux occurrences de plus vivent dans la PROSE DE CETTE SPEC et non dans le panneau —
   > $0{,}87$ et « $17$ px » au §7.2, dans le motif du correctif MINEUR 2. **La porte ne doit pas
   > les relever** : elle lit le panneau rendu, pas ce document. C'est la même distinction que
   > pour le $0{,}54$ du `fit_caveat` ci-dessous.*
   > *Le premier jet en inventoriait sept décimales et deux degrés ; **cinq de ces sept n'existent
   > plus** — $0{,}87$, $3{,}46$ et $0{,}52$ vivaient dans des textes de S2 qui ont été
   > réécrits, $3{,}73$ et $0{,}27$ dans la `suite` de S4, ramenée à une question et un geste —
   > **et un degré est NEUF** (S3, retour `rectangle-en-A`). **Un inventaire de porte se
   > re-relève après chaque réécriture, sans quoi il garde des fantômes et laisse passer les
   > neufs** (ADR 0035 : vérifier le BANC avant le produit).*
   *Une occurrence de plus vit dans le `fit_caveat` du descripteur ($0{,}54$, §10.2) : **elle
   n'est pas une lecture, et la porte ne doit pas la relever** — c'est précisément pourquoi la
   sonde est bornée aux sept lectures et non au panneau entier.*
9. **Aucune équation du second degré dans $\mathbb{C}$.** C'est la leçon sœur
   (`bank.yaml:77-95`). Interdits : `discriminant`, `\Delta =`, `az^2`, `second degré`,
   `Viète`, `\delta^2`.
10. **Aucune équation de courbe, aucune coordonnée polaire nommée.** Interdits :
    `coordonnées polaires`, `repère polaire`, `\rho`, `(r,\theta)`, `x = -1`, `y =`, `x^2+y^2`.
    *⚠ Seconde passe (pédagogie, MINEUR 5) : les deux qualifications « *(en position de couple)* »
    et « *(en position d'équation de droite)* » sont **retirées** pour la même raison qu'au §9.3
    — **deux lignes inertes de plus, découvertes en balayant la CLASSE au lieu de l'occurrence
    signalée.** Aucun texte de cette scène n'écrit `(r,\theta)` ni `y =` : l'interdiction sans
    condition ne coûte rien et se mesure.* *La scène **dessine** et
    **nomme** les trois lieux ; elle ne les met pas en équation — ce n'est pas le rung des
    équations de lieux, et `REVIEW:132-137` demande un segment de prose, pas de l'analytique.*
11. **Aucune 3D.** Canvas 2D, aucune caméra, aucune vue. **`window.__THREE__` doit rester
    indéfini même panneau OUVERT** — famille de porte à part entière (§11.3, `pas-de-3d`).
12. **Aucun nombre hors des trois grilles — SONDE BORNÉE** *(bornage ajouté en vague 1,
    pédagogie M4)*. **La sonde lit trois zones et trois seulement : les sept LECTURES, les
    ÉTIQUETTES DE POINT sur le plan, et le BADGE.** Les seuls **affixes** qu'elle y admet sont
    ceux des 48 états du mode `triangle` (§5.2 A, B) et des 5 du mode `lieu` (§5.2 D) ; les
    seuls **modules** et **arguments**, ceux des tables du §5.3.
    > ⚠ *Le premier jet écrivait « aucun nombre hors des trois grilles » **sans borner la
    > zone** : la sonde aurait rougi sur les valeurs des paris eux-mêmes ($1+2i$ et $1+i$ à S1,
    > $\frac{2\sqrt3}{3}$ à S2, $-\frac34 i$ nulle part mais $2\sqrt3$ à S2), qui sont des
    > distracteurs et doivent exister. **Un faux positif sur un texte de pari rendrait la scène
    > inconstruisible** — exactement le défaut que l'essai rouge NÉGATIF du §11.4 existe pour
    > prévenir. Le §9.8 bornait déjà sa propre sonde aux lectures ; celle-ci s'aligne.*
    *Un nombre hors grille **dans l'une des trois zones** est soit un bug, soit une frontière
    franchie.*

---

## 10. Ce que cette scène peut honnêtement prétendre (`fit_caveat`)

Un plan calculé est plus crédible qu'une figure dessinée, donc plus dangereux — et celui-ci
affiche des **valeurs exactes**, l'affichage qui ressemble le plus à une preuve.

1. **La scène ne démontre rien : elle exhibe.** Elle montre la règle sur **48 états** du mode
   `triangle` (4 formes × 4 placements × 3 sommets) et **5** du mode `lieu` — un échantillon,
   pas une preuve. **La démonstration est la prose de R6, qui vient juste après.**
   ⚠ **Cette clause ne vit PAS seulement ici : elle est REMONTÉE dans le paragraphe d'annonce
   du §4.1, adressée à l'élève, avant le marqueur** *(leçon de la scène sœur : une réserve qui
   n'existe que dans un champ de métadonnées n'est lue par personne).* **Et elle mord plus fort
   ici qu'ailleurs : S4 fait « trouver » un lieu sur CINQ points. Cinq points ne déterminent
   pas un lieu ; c'est le §4.4 qui le démontre.**
2. **Les nombres sont exacts ; le DESSIN est arrondi au pixel.** Le point $2+(4-2\sqrt3)i$ est
   affiché exactement et **tracé** à $0{,}54$ unité près du zéro, donc à $\pm\,0{,}5$ px.
3. **L'échelle est isotrope et constante** : une longueur se compare à une longueur sur toute
   la scène, et le cercle unité est l'étalon. *C'est une propriété du rendu, pas une convention
   d'auteur, et elle est gardée par une porte.*
4. **L'arc est dessiné à un rayon FIXE**, indépendant de $AB$ et $AC$ : l'arc au sommet $C$ de
   `demi-equilateral` et celui au sommet $A$ de `aligne` ont la même taille à l'écran alors que
   les côtés sont très différents. **Exagération constante et déclarée** — sans elle, l'arc
   serait invisible dans un cas et démesuré dans l'autre.
5. **Les quatre formes partagent le même côté $\vec{AB} = 4$.** *Choix assumé : il rend les
   quatre comparables d'un coup d'œil (seul $C$ bouge). **Le prix est réel** : la scène ne
   montre jamais un triangle où le côté de référence change de longueur, et un élève pourrait
   croire que $AB$ est toujours l'unité de mesure. **Les lectures `longueurs` affichent les deux
   distances explicitement, à chaque état, précisément pour que ce ne soit pas silencieux.***
6. **Quatre triangles seulement, et l'un d'eux n'allume aucune ligne de la table.** *C'est
   délibéré : la table décrit des **cas particuliers**, pas une classification. Un élève qui ne
   verrait que des triangles remarquables croirait que tout triangle en est un.*
7. **$M$ ne se déplace pas librement** : cinq positions, plus un balayage **le long d'un lieu
   déjà révélé**. *Un élève qui voudrait « voir ce qui se passe entre deux positions
   quelconques » ne le peut pas — c'est le prix de l'exactitude, payé sciemment.*
8. **S4 est de PROFONDEUR SM, et c'est une décision déclarée.** Le programme SM nomme
   « *nature de configurations (triangle, **cercle**, alignement)* » (`maths-sm.yaml:225`) ; le
   programme SExp nomme « *(triangle, alignement)* » **sans le cercle** (`maths-sexp.yaml:251`).
   **S1, S2 et S3 couvrent seules le périmètre SExp.**
   ⚠ **Et la divergence n'est pas nette :** le `savoir_faire` SExp `:254` écrit
   $\arg\!\left(\frac{z-a}{z-b}\right)$, c'est-à-dire exactement l'objet de S4. **Programme et
   savoir_faire du même fichier se contredisent — et ils ne pèsent PAS le même poids :** le
   `programme` (`:251`) est **`research-consensus`** (en-tête `:248`), le `savoir_faire` (`:254`)
   est **`derived`** (en-tête `:252`). *Corrigé en seconde passe, fidélité NEW-1 : le premier jet
   révisé écrivait « **et les deux sont `derived`** ».* **La ligne la mieux sourcée est celle qui
   argumente CONTRE S4 en SExp : la marque SM n'est donc pas un partage à pile ou face, c'est la
   meilleure source disponible.** *Je marque S4 SM par prudence et je route (§13.2).* **Pour défaire, si le scoping de filière est un jour
   tranché : S4 devient une étape optionnelle marquée, c'est un champ du descripteur, rien de
   plus.**
9. **La scène ne prépare PAS la reconstruction d'un centre de rotation depuis un couple
   point/image** ($\omega = \frac{z'-e^{i\theta}z}{1-e^{i\theta}}$, `bank.yaml:475`, `:1176`).
   La scène sœur l'a déclaré dû (son §10.9) ; **il reste dû**, et c'est de la prose et des
   items (§0.2).
10. **La scène ne traite JAMAIS quatre points, donc jamais la cocyclicité** — que **quatre**
    entrées de banque demandent (`bank.yaml:97-148`). **Le motif est un constat du corpus, pas
    un goût** : aucun rung ne porte le birapport. **Dette déclarée et routée** (§13.10).
11. **Toute la preuve d'examen de ce document est SM** (`bank.yaml:22`, dix entrées sur dix) :
    ce que la scène « prépare » pour un élève SExp est **déduit du cadre, jamais mesuré sur des
    annales**.
12. **L'ORDRE DE LECTURE du badge est une convention de scène, pas une règle d'examen**
    *(ajouté en vague 1, fidélité I1)*. Le badge choisit toujours la même fraction pour un
    sommet donné (§5.2 C) ; **le bac, lui, écrit l'ordre qui raccourcit l'algèbre** —
    `bank.yaml:656` met $Q$ au dénominateur au sommet $R$, `bank.yaml:1204` met $Q$ au
    dénominateur au sommet $D$, **tous deux contraires à la convention de la scène**. *Ce que
    l'élève doit retenir — et que les retours disent — c'est que **les quatre lignes de la table
    sont invariantes par $w \to \frac1w$** : l'inversion change le rapport des longueurs et le
    signe de l'angle, jamais la conclusion. **La scène ne peut pas montrer ça** (son badge
    n'écrit qu'un ordre) ; **seuls les retours le disent, et c'est un mot d'auteur, pas une
    manipulation.***
13. **S2 et S3 paient sur le MÊME triangle** (`demi-equilateral`, deux placements) *(ajouté en
    vague 1)*. *Motif au §5.2 A : aucune autre des quatre formes ne satisfait les contraintes
    des deux étapes, et une cinquième forme exacte n'a pas été trouvée dans
    $\mathbb{Q}(\sqrt3)[i]$ avec un argument multiple de $\frac{\pi}{12}$.* **Le prix : un élève
    attentif au dessin de S2 a déjà vu l'angle droit en $C$ quand arrive S3.** *Ce n'est pas la
    réponse du pari — deux des quatre choix de S3 disent « rectangle », et le dessin ne les
    départage pas — mais c'est une aide, et elle est réelle.*
14. **La forme $\left\vert\frac{z-z_A}{z-z_B}\right\vert = 1$, sur laquelle reposent le pari de
    S4 ET NBCOMPLEX2-45, n'est attestée dans AUCUNE des dix annales vérifiées** *(ajouté en
    vague 1, fidélité M8)*. `grep` : « médiatrice » apparaît **zéro** fois dans `bank.yaml`. La
    route attestée est $\vert z-a\vert = \vert z-b\vert$ (NBCOMPLEX2-32). *La forme est **dans
    le cadre** (réécriture triviale ; `maths-sexp.yaml:254`, `maths-sm.yaml:225`) et c'est la
    bonne face diagnostique — le critère de MODULE sur un rapport, que rien ne mesure. **Mais
    c'est une forme choisie pour sa valeur pédagogique, pas relevée sur des sujets, et il faut
    le dire.***
15. **La marque de filière de S4 vit dans la PROSE, pas dans le panneau** *(ajouté en vague 1,
    fidélité I4)*. Voir le point 8 : le champ `filiere` du descripteur **n'est lu par personne**
    (`REVIEW:116` : ni `lesson.md` ni `items.yaml` ne déclarent `filiere:`). **Ce qui porte
    réellement la marque, ce sont TROIS clauses de prose** — §4.4 point 4, §4.5 (b), et le
    cadrage de `cp-ensemble-points` au §4.6 —, sur le modèle livré de `lesson.md:327`. *Le
    panneau, lui, est servi non marqué aux deux filières — motif de l'asymétrie :
    `scene-plan.md:2052-2055`.* ⚠ *Seconde passe, fidélité NEW-4 : le premier jet révisé n'en
    marquait qu'un des trois. **Une marque posée à un site sur trois a le tiers de la portée**,
    et c'était exactement le défaut qu'elle venait réparer.*
16. **Les LIBELLÉS DE CRAN ordinaux sont une convention de scène, sans aucun statut d'examen**
    *(ajouté en seconde passe, fidélité NEW-11)*. « Triangle 1 · 2 · 3 · 4 » et « Placement 1 ·
    2 · 3 · 4 » sont la bonne réponse au problème de fuite B1 — **mais le bac n'indexe jamais une
    configuration par un ordinal**, et aucun énoncé ne dira « le triangle 3 ». *L'élève doit
    comprendre que ces numéros sont des poignées de la scène, pas un vocabulaire.* **C'est le
    même genre de convention que l'ordre de lecture du badge (point 12), et elle se déclare au
    même endroit.** *Pour défaire : des libellés descriptifs — impossible, c'est précisément ce
    que B1 interdit ; ou des affixes, comme pour `pointM` — mais une FORME n'a pas d'affixe.
    **Les ordinaux restent, et ils sont déclarés.***
17. **Deux `suite` sur quatre sont partiellement mises en place par un retour de leur propre
    étape** *(ajouté en seconde passe, pédagogie, MINEUR 6)*. À S4, le retour `cercle-diametre`
    doit dire de quoi le cercle est le lieu — c'est son travail — et donne donc un tiers de la
    réponse de la `suite` au cran près ; à S1, le retour `affixes` fait faire le geste que la
    `suite` reprend. *C'est le **revers assumé** du correctif I4 de la vague 1 : en fermant les
    recherches par le mécanisme, on rapproche les retours des `suite`.* **Ce que les `suite`
    ajoutent et qu'aucun retour ne donne :** à S1, l'exception (le placement où le raccourci
    tombe juste) ; à S4, **que l'invariant reste exact et identique au caractère le long d'un
    CONTINUUM**, là où un retour ne parle que d'un point. *La `suite` de S3 a, elle, été
    reconstruite pour n'être répondue par aucun retour (§7.3) ; celle de S2 ne l'a jamais été.*
18. **À S1, la bonne réponse ne demande AUCUNE division complexe — et c'est structurel**
    *(ajouté en seconde passe, pédagogie, MINEUR 10)*. Les quatre formes partagent
    $\vec{AB} = 4$ (point 5) et les quatre placements appliquent $r \in \{1, i, -1\}$ (§5.2 B) :
    **le dénominateur de $w$ est donc un MONÔME à tous les placements** ($4$, $4i$, $-4$).
    Résultat à l'état de S1 : la bonne réponse se lit $\frac{4i}{4} = i$ et le distracteur
    `ordre-inverse` $\frac{4}{4i} = -i$, **tandis que les deux distracteurs de face A
    (`affixes`, `demi-soustraction`) exigent, eux, une vraie division complexe.** *Un élève qui
    choisit « la plus simple à calculer » réduit le champ à deux sans rien comprendre.* **Le prix
    est réel ; il est le revers de l'exactitude** (§5.4 : tout nombre affiché est exact, donc les
    crans sont discrets et les rotations sont des quarts de tour). *Le correctif qui marcherait,
    et son coût, sont écrits en question numérotée : §13.17.*

---

## 11. La porte (`web/scripts/scene-plan-complexe-rapport.mjs`, ADR 0041 §8)

Principe : elle lit **le rendu réel** (`next start` + Chromium), jamais le code du produit ;
elle trouve son panneau par `[data-scene="plan-complexe-rapport"]`, **jamais** par
`[data-scene]` seul. Elle se lance **plusieurs fois, à plusieurs largeurs** ($1\,280$ px et
390 px au minimum) avant d'être crue. Quatre verdicts honnêtes (ADR 0034/0038) : **ROUGE**,
**AVERTISSEMENT-vu**, **VERT-ambigu**, **MUET**. Si le contexte Canvas 2D n'est pas disponible
au banc, elle sort **MUET, en échec**, jamais en vert.

**Le calcul est ANALYTIQUE, donc la porte refait les NOMBRES**, sans importer aucun module du
produit (ADR 0036), depuis les seules constantes de cette spec. **Et elle compare des FORMES
EXACTES, pas des flottants** : deux mesures par ligne — (a) **égalité de chaîne** sur la forme
rendue, contre les tables du §5.3 ; (b) **égalité numérique à $10^{-9}$** entre l'évaluation de
la chaîne lue et le calcul flottant refait, *pour attraper la belle forme exacte qui ne vaut
pas le bon nombre*.

### 11.1 Les nombres, recalculés par une seconde implémentation

| # | ce que la porte recalcule | attendu | tolérance |
|---|---|---|---|
| N1 | $w$ aux **48** états du mode `triangle`, **recalculé depuis les trois affixes rendues**, jamais depuis la table | les 12 valeurs du §5.3 A, **répétées à l'identique sur les 4 placements** | **égalité de chaîne** avec la lecture `w`, **plus** égalité numérique à $10^{-9}$ |
| **N2** | **LA LIGNE DU MODÈLE NEUF — l'INVARIANCE PAR PLACEMENT** : pour chacun des 12 couples (forme, sommet), les **4** valeurs de `w` sont **identiques au caractère près** | 12 groupes de 4 chaînes identiques | **égalité de chaîne exacte**, dans les deux sens : *une scène où $w$ changerait avec le placement doit rougir, et une scène où il ne changerait pas avec le SOMMET aussi* |
| N3 | la lecture `vecteurs` : les deux différences $z_C - z_A$ et $z_B - z_A$ aux 48 | calculées depuis les affixes rendues | égalité de chaîne ; **et ni l'une ni l'autre n'est égale à $z_C$ ou $z_B$** sauf au placement `origine` |
| N4 | $\vert w\vert$ et $\arg(w)$ aux 48 | table §5.3 B, en **contrôle ponctuel** — la porte recalcule les 48 | chaînes ; **arguments en fractions de $\pi$, dans $]-\pi;\pi]$** ; *`aligne` au sommet $A$ doit écrire $\pi$, jamais $-\pi$* |
| N5 | `longueurs` : $AB$ et $AC$ aux 48, **et leur quotient égale $\vert w\vert$** | table §5.3 C | égalité de chaîne, **et** $\frac{AC}{AB} = \vert w\vert$ à $10^{-9}$ |
| **N6** | **`nature` aux 48, dans QUATRE sens.** Elle écrit **les CRITÈRES vérifiés à ce sommet, dans l'ordre de la table, chacun avec sa valeur**, puis la ou les conclusions qui s'allument. Répartition des 48 états : **deux conclusions** aux **SEIZE** états `rect-isocele`·$A$ et `equilateral`·$A$/$B$/$C$ *(4 couples × 4 placements)* · **une** aux **SEIZE** états `demi-equilateral`·$C$ et `aligne`·$A$/$B$/$C$ · **aucune** aux **SEIZE** états `rect-isocele`·$B$/$C$ et `demi-equilateral`·$A$/$B$. **Somme : 48** ✓ | §5.3 B, colonne de droite, **texte par texte** | **quatre sens :** (1) une scène qui conclurait toujours doit rougir ; (2) une qui ne conclurait jamais aussi ; (3) **une qui ne nommerait qu'UNE conclusion là où deux sont vérifiées** aussi *(fidélité M5)* ; (4) **NEUF — une qui écrirait une conclusion SANS le critère qui la produit, ou qui écrirait un DÉCOMPTE (« aucune des quatre ») au lieu des critères vérifiés, doit rougir seule** *(seconde passe, pédagogie IM-1)* |
| N7 | le mode `lieu` : $u$, $\vert u\vert$, $\arg(u)$, $MA$, $MB$ aux **5** crans | table §5.3 E | égalité de chaîne + $10^{-9}$ ; **et $\frac{MA}{MB} = \vert u\vert$** |
| **N8** | **la CLASSIFICATION des 5 crans** : $\vert u\vert = 1$ **au seul** `mediatrice` ; $\arg(u) = \pm\frac{\pi}{2}$ **aux seuls** `cercle-1` et `cercle-2` ; $\arg(u) \in \{0,\pi\}$ **au seul** `droite` ; **aucune** des trois au cran `libre` | §5.3 E | **exact, dans les deux sens** — *c'est la ligne qui garde S4* |
| N9 | les **crans** : `position` en a exactement 4, `forme` 4, `sommet` 3, `pointM` 5 ; **aucune valeur intermédiaire, aucune borne continue** | — | exact |
| N10 | **aucun décimal, aucun degré** dans les sept lectures, aux 53 états | — | §9.8 ; *relevé sur les lectures seules, pas sur le panneau* |
| N11 | **tous les points de tous les états sont dans $[-9;9]^2$**, aux 53, **avec une marge $\ge 1$ unité** | §5.3 D | exact ; *et le placement `retournee` est vérifié **point par point**, pas par la borne du disque* |

> ⚠ **Le compte de N6 est corrigé en seconde passe (fidélité NEW-6).** Le premier jet révisé
> écrivait « *donc **deux** lignes aux **douze** états `rect-isocele`·$A$ et
> `equilateral`·$A$/$B$/$C$ (× 4 placements)* » : **quatre couples (forme, sommet) × quatre
> placements font SEIZE, pas douze** — le « 12 » était le nombre de COUPLES de la table du §5.3
> A, recopié dans une phrase qui parle d'ÉTATS. *Les deux autres seaux étaient justes (4 couples
> chacun), et les trois somment bien à 12 couples et 48 états.* **La règle était juste et
> mesurable ; c'est l'ATTENTE de la porte qui était fausse — et une attente fausse dans une table
> de porte est un faux rouge (ou un faux vert) programmé.**

### 11.2 Les faits de PIXELS, mesurés dans les deux sens

*Toutes les sondes lisent en **fractions de l'échelle de la scène**, jamais au pixel absolu :
le facteur px/unité est lu sur **les graduations entières des deux axes**. Lancée à $1\,280$
**et** 390 px au minimum.*

| famille | le sens qui doit passer | le sens qui doit rougir |
|---|---|---|
| **`isotropie`** *(héritée)* | (a) le facteur px/unité est **identique à $\le 0{,}5\%$** sur les deux axes, et le **cercle unité** mesure le même nombre de pixels en largeur et en hauteur à $\le 1$ px ; (b) **le cadre est CARRÉ** | un repère anisotrope doit rougir **seul** — *c'est le défaut RÉEL du 2026-08-14 dans cette notion (`SCENE-CONTRACT.md:186-203`, 36,9 % d'écart ; **citation reprise de la spec sœur §5.1, non revérifiée par moi** — §15.11)* ; une fenêtre paysage aussi |
| **`arc-au-sommet`** | l'arc **part de la direction du vecteur DÉNOMINATEUR et arrive à celle du NUMÉRATEUR**, mesuré aux pixels sur les deux extrémités, **aux 48 états** ; son **sens** suit le signe de `argument-w` | **un arc tracé depuis l'AXE RÉEL doit rougir** *(c'est `angle-lu-depuis-l-axe` posée dans le code, et c'est le sabotage le plus important de la campagne)* ; **un arc tracé à l'ORIGINE plutôt qu'au sommet aussi** *(c'est `w-sommet-ignore` posée dans le code)* ; un arc tracé dans le sens inverse aussi |
| **`numerateur-denominateur-distincts`** | les deux flèches ont des épaisseurs différentes, et **la plus épaisse part vers le point du DÉNOMINATEUR** que le badge nomme, aux 48 | deux flèches identiques doivent rougir **seules** ; l'épaisse posée sur le numérateur aussi |
| **`formule-au-sommet`** | le badge affiche la fraction **correspondant au cran `sommet`** : $\frac{z_C-z_A}{z_B-z_A}$ · $\frac{z_C-z_B}{z_A-z_B}$ · $\frac{z_B-z_C}{z_A-z_C}$ | un badge figé sur la formule du sommet $A$ doit rougir **seul** |
| `point-a-sa-place` | les trois points (et $M$) sont dessinés **à la position que leur affixe demande**, à $\le 2$ px, aux 53 états ; **et deux points ne sont jamais à moins de 8 px l'un de l'autre** | un point dessiné depuis un autre nombre que celui affiché doit rougir ; une position **plafonnée** au bord du cadre aussi |
| `longueurs-au-rapport` *(étendue en vague 1)* | (a) le rapport des **longueurs en pixels** des deux flèches égale la lecture `module-w`, à $\le 2\%$, aux 48 ; (b) **à S2 après révélation, la LONGUEUR REPORTÉE part de $A$, suit la direction de $\vec{AB}$ à $\le 1°$, et son extrémité tombe à $\vert w\vert \times AB$ du départ, à $\le 2$ px** | une flèche dessinée à une autre échelle que l'autre doit rougir **seule** ; **une longueur reportée posée sur la direction de $\vec{AC}$, ou de longueur $AB$ au lieu de $AC$, doit rougir seule** ; **et son ABSENCE après la révélation de S2 aussi** |
| **`angle-droit-marque`** *(NEUVE — vague 1, pédagogie I1)* | à S3, **après** la révélation : un petit carré est dessiné **au sommet $C$**, entre les directions de $\vec{CA}$ et $\vec{CB}$, à $\le 2$ px du sommet ; **et il n'y en a aucun aux sommets $A$ et $B$** | un carré posé au sommet $A$ (celui qu'on lit) doit rougir **seule** ; **un carré absent après la révélation** aussi ; **un carré présent AVANT le pari** aussi (`avant-pari`) ; **et un carré posé sur un état où aucun angle droit n'existe** aussi |
| **`libelles-de-cran`** *(NEUVE — vague 1, pédagogie B1)* | chaque contrôle affiche les **libellés** du §5.5, **et non ses ids** : `forme` ⟹ « Triangle 1..4 », `position` ⟹ « Placement 1..4 », `pointM` ⟹ les cinq affixes, `sommet` ⟹ $A$/$B$/$C$ ; **et l'`aria-label` de chaque bouton radio porte le même libellé, en clair** | **un contrôle qui afficherait ses ids doit rougir seul** — et c'est le sabotage n° 32 : remettre « équilatéral » comme libellé de `forme` doit faire rougir `libelles-de-cran` **et** `formule-graduee` à S2. *⚠ **Cette porte lit le panneau RENDU : elle est indifférente à l'endroit où vit la table `id → affichage`.** C'est ce qui a permis, en seconde passe, d'abandonner la clé de registre `libelles` au profit de la route déjà livrée (§12) sans toucher à une seule ligne de mesure.* |
| **`courbe-du-lieu`** *(précisée en seconde passe — pédagogie IM-2 : **TROIS** courbes)* | en `mode: lieu`, **après la révélation** : **les TROIS courbes sont tracées** — médiatrice, cercle de diamètre $[AB]$, droite $(AB)$ — et chacune passe à $\le 2$ px des crans qui lui appartiennent et à $\ge 8$ px de ceux qui ne lui appartiennent pas (médiatrice ⟵ `mediatrice` · cercle ⟵ `cercle-1` **et** `cercle-2` · droite ⟵ `droite`) ; **aucune courbe avant la révélation, à aucun cran** | une médiatrice tracée comme un cercle doit rougir ; **une SEULE courbe tracée au lieu des trois doit rougir seule** *(c'est l'ambiguïté que la seconde passe a levée : le §6.1 disait « la courbe », la porte en exigeait trois)* ; une courbe **présente avant la révélation** aussi (`avant-pari`) ; **une courbe tracée au cran `libre` AVANT le pari** aussi |
| **`balayage-invariants`** *(héritée de la scène sœur — **REFAITE en seconde passe sur la règle LIVRÉE**, pédagogie BQ-1)* | **pendant** le balayage, **LIEU PAR LIEU** (§6.1) : **(1) l'INVARIANT reste écrit et vaut exactement la valeur de sa ligne, IDENTIQUE AU CARACTÈRE, à $\ge 3$ positions échantillonnées** — $\vert u\vert = 1$ sur la médiatrice · $\arg(u) = -\frac{\pi}{2}$ sur le cercle · $\arg(u) = 0$ sur la droite ; **(2) l'autre ligne affiche « — »** et aucun chiffre ; **(3) l'étiquette d'affixe de $M$ sur le plan disparaît** ; **(4) les deux segments et l'arc BOUGENT** (pixels, 3 positions) ; **(5) $M$ reste sur sa courbe à $\le 2$ px** ; **(6) le geste reste DANS SA BORNE** (demi-cercle supérieur ; demi-droite $x>2$) ; **(7) un appui de flèche déplace $M$ d'au moins 4 px aux deux largeurs** ; **(8) la chaîne de la région vivante diffère entre deux positions et contient la valeur exacte de l'invariant** | **après** le relâchement : les deux lectures redeviennent **exactement** celles d'avant, au caractère près. **Et huit sens qui doivent rougir SEULS :** *(a)* ⚠ **effacer AUSSI l'invariant** *(la faute que le premier jet révisé commandait)* ; *(b)* écrire un chiffre sur la ligne positionnelle ; *(c)* écrire un décimal ; *(d)* un balayage inerte aux pixels ; *(e)* $M$ qui sort de sa courbe ; *(f)* **franchir la borne** — le cercle sous l'axe réel (l'argument saute à $+\frac{\pi}{2}$), la droite au-delà de $B$ (l'argument saute à $\pi$) ; *(g)* un pas qui ne déplace rien de visible ; *(h)* une région vivante muette, ou qui répète deux fois la même chaîne. **Et un balayage OUVERT au cran $2+4i$** (`fuite-inter-etapes`) |
| `avant-pari` | à chaque étape, avant l'engagement : **zéro** pixel d'accent (mesuré en **CHROMINANCE**) ; aucune flèche à S1 ; aucun arc **à S1 et S2** ; **aucune longueur reportée** ; **aucun petit carré** ; aucune courbe ; **aucun contrôle de l'étape** ; aucune lecture-réponse dans le DOM. **À S2, S3 et S4 : les trois exceptions du §7.5 SONT présentes, à l'ENCRE** | après l'engagement : les flèches, l'arc, la longueur reportée, le carré, la courbe et les lectures apparaissent, et l'accent avec. **À S2, des flèches ABSENTES avant le pari doivent rougir ; à S3, un arc en $A$ ABSENT avant le pari aussi** — les trois exceptions sont mesurées **dans les deux sens** |
| `palette` · `quadrillage-opaque` · `etiquettes` | *(héritées de la scène sœur)* jetons `--figure-*` lus à l'exécution ; nœuds du quadrillage à la même valeur que ses lignes ($\le 2$ niveaux) ; **≤ 6 étiquettes simultanées**, aucun chevauchement, graduations tous les 2 sous 600 px. **Neuf : `etiquettes` est lancée SPÉCIFIQUEMENT sur l'état de S3 après révélation, aux deux largeurs** — c'est le voisinage le plus encombré de la scène, et le petit carré y compte comme obstacle de placement (§6.2). **Neuf : `palette` vérifie le cercle unité dans les deux sens — présent en `mode: lieu`, ABSENT en `mode: triangle`** (§5.1, pédagogie M3) | une couleur en dur, un quadrillage semi-transparent, une étiquette qui en chevauche une autre ou qui sort du cadre — **chacune seule** ; **un cercle unité tracé en `mode: triangle` doit rougir seul, et son absence en `mode: lieu` aussi** |
| `formule-graduee` | **la table C du §7.5, étape par étape** : le panneau ne contient aucune chaîne interdite de l'étape courante — **consigne, `pari`, retours, `suite`, lectures, LIBELLÉS DE CRAN des contrôles ouverts et région vivante confondus** *(les libellés sont l'ajout de vague 1, correctif B1 : c'était la moitié non balayée)* — et contient bien celles que l'étape emploie | écrire « module » dans un retour de S1, « isocèle » dans un retour de S2, « médiatrice » dans un retour de S3, **ou remettre « équilatéral » comme libellé de cran de `forme`**, doit rougir **seule** |
| `fuite-inter-etapes` | la porte **réécrit elle-même** la table A du §7.5 : `position` **qu'à S1** ; `forme` **qu'à S2** ; `sommet` **qu'à S3** ; `pointM` **qu'à S4** ; `balayage` **qu'à S4, après la révélation, et jamais au cran $2+4i$**. **Et les lectures, par ENSEMBLE EXACT et non par seuil** (§5.6) : S1 = {`vecteurs`, `w`} · S2 = {`w`} puis {`w`, `module-w`, `argument-w`, `longueurs`} · S3 = {`w`, `module-w`, `argument-w`} puis + {`nature`} · S4 = {} puis {`rapport-lieu`} | ouvrir `sommet` dès S2, rouvrir `position` à S2 ou à S3, faire exister `nature` à S2, ouvrir `balayage` au cran $2+4i$ — **et aussi : laisser `vecteurs` exister à S2, ou `longueurs` à S3.** *Une porte qui ne vérifierait qu'« au moins les lectures attendues » resterait verte sur une scène cumulative : elle compare des ENSEMBLES, dans les deux sens* |
| `pas-de-3d` | `window.__THREE__` **indéfini panneau OUVERT** ; aucun contexte `webgl` ; le canvas est en `2d` | un `import("three")` dans le module de la scène doit rougir |

### 11.3 Les autres familles

`rien-avant-le-clic` · `etapes` (chaque étape pose son état, n'ouvre que **ses** contrôles, les
autres **absents du DOM** ; **S1 à S4 n'ont aucun `etat_revele`, et c'est déclaré**, §15.3) ·
`paris` (4 choix, exactement un juste, un `retour` par choix, rien dans la région live avant
l'engagement) · **`frontiere`** (aucune des chaînes du §9 dans le panneau ouvert, **une sonde
par forme**) · `eclairs` (**attendu structurellement vide**, mesuré quand même) ·
`sans-mouvement` · `katex` ($\sqrt3$, $\frac{\pi}{6}$, $\vec{AB}$, $\vert w\vert$, $z_C$ rendus ;
aucun LaTeX brut visible) · `ergonomie` (pièce commune `scripts/lib/scene-ergonomie.mjs`,
**sans** l'argument `course`) · `console`.

### 11.4 `--essai-rouge` : ce qui doit faire crier chaque famille

Un rouge ne prouve rien sans le vert qui l'a précédé, **dans ce dossier, avec cette commande**
(ADR 0034). Sabotages à outiller :

1. poser $w = \dfrac{z_C}{z_B}$ (la misconception `w-sommet-ignore` **posée dans le code**) →
   **N1 et N3**, et `arc-au-sommet` si l'arc suit ; *et **rien au placement `origine`**, où les
   deux coïncident — **un sabotage qui ne rougit pas à `origine` est le signe que la sonde est
   au bon endroit** ;*
2. poser $w = \dfrac{z_C - z_A}{z_B}$ (la forme « à moitié ») → **N1 et N3** ;
3. **faire dépendre $w$ du placement** (par exemple en oubliant de diviser par $r$) →
   **N2 seule** ;
4. **faire que $w$ ne dépende PAS du sommet** (figer le sommet $A$) → **N2 dans l'autre sens**,
   et `formule-au-sommet` ;
5. **tracer l'arc depuis l'AXE RÉEL** au lieu de la direction du dénominateur →
   **`arc-au-sommet` seule**, et **N4** si la lecture suit le tracé ;
5 bis. **tracer l'arc à l'ORIGINE** au lieu du sommet → **`arc-au-sommet` seule** ;
6. inverser numérateur et dénominateur ($w \to \frac1w$) → **N1, N4, N5**, et `arc-au-sommet`
   (le sens) ;
7. **faire afficher à `module-w` la longueur $AC$** au lieu du quotient → **N4 et N5 seules** ;
8. **faire afficher à `argument-w` la direction $\arg(\vec{AC})$** → **N4 seule**, *et
   **seulement aux placements où $\vec{AB}$ n'est pas réel** : à `origine` et `posee` les deux
   coïncident. Un sabotage qui rougirait partout serait le signe que la sonde mesure autre
   chose ;*
9. **supprimer la réduction dans $]-\pi;\pi]$** → **N4 seule, et seulement sur `aligne` au
   sommet $A$**, où l'écart brut vaut $-\pi$ et doit s'écrire $+\pi$ ;
10. **faire nommer une ligne de la table à `nature` dans tous les cas** → **N6 seule** ;
11. **faire écrire « aucune des quatre » partout** → **N6 dans l'autre sens** *(une porte qui
    n'exigerait que « la nature est parfois nommée » resterait verte)* ;
11 bis. **ne faire nommer qu'UNE ligne là où deux sont vérifiées** (écrire « équilatéral » sans
    « isocèle en $X$ ») → **N6, TROISIÈME sens** *(vague 1, fidélité M5 — le sens que le premier
    jet rendait non mesurable en écrivant « elle nomme UNE ligne exactement »)* ;
12. arrondir une lecture à deux décimales ($1{,}73$ pour $\sqrt3$, $0{,}52$ pour
    $\frac{\pi}{6}$) → **N10 seule** ;
13. afficher un angle en degrés → **N10 seule** ;
14. afficher une forme exacte qui ne vaut pas le bon nombre ($\sqrt2$ au lieu de $\sqrt3$) →
    **le volet (b) de la double mesure**, jamais le volet (a) ;
15. **rendre le repère anisotrope** (allonger `y_length` de 20 %) → **`isotropie` seule** ;
16. dessiner un point à une position plafonnée au bord du cadre → `point-a-sa-place` **seule** ;
17. **tracer la médiatrice comme un cercle** (ou l'inverse) en mode `lieu` →
    **`courbe-du-lieu` seule** ;
18. **tracer la courbe AVANT la révélation de S4** → **`avant-pari` seule** ;
19. **retirer l'arc avant le pari de S3** → **`avant-pari` dans l'autre sens** *(les trois
    exceptions du §7.5 sont mesurées, sinon elles ne sont qu'une intention)* ;
20. ⚠ **REFAIT EN SECONDE PASSE (pédagogie BQ-1) — effacer AUSSI l'INVARIANT pendant le
    balayage** (afficher « — » sur les deux lignes) → **`balayage-invariants`, volet
    « invariant tenu », seule.** *C'est le sabotage qui reproduit la faute que le premier jet
    révisé COMMANDAIT : l'ancien n° 20 armait le contraire (« faire afficher un chiffre pendant
    le balayage → rouge »), et **un produit construit sur la règle livrée l'aurait fait rougir**
    — une porte qui punit le comportement correct (ADR 0038).* **Il se rejoue sur les TROIS
    lieux** : sur la médiatrice l'effacement porte sur le module, sur le cercle et sur la droite
    sur l'argument. *Un sabotage qui ne rougirait que sur un lieu est le signe que la porte ne
    mesure qu'un cas.*
20 bis. **faire afficher un chiffre sur la ligne POSITIONNELLE pendant le balayage** (par exemple
    $\arg(u) \approx -0{,}87$ sur la médiatrice) → **la même famille, volet « positionnel
    effacé », seule** ;
21. **rendre le balayage inerte** (le contrôle existe, rien ne bouge aux pixels) → **la même
    famille, volet « mouvement réel »** ;
21 bis. **mettre le pas du balayage à $1°$ sur le cercle, ou à $\frac{1}{50}$ d'unité sur les
    lieux droits** (un appui de flèche ne déplace rien de visible) → **la même famille, volet
    « pas visible », seule** *(seconde passe : leçon livrée, `scene-plan.md:19-21` — la scène
    sœur a mesuré ce défaut sur elle-même)* ;
22. **faire sortir $M$ de la courbe pendant le balayage** → **la même famille, volet « sur la
    courbe »** ;
22 bis. ⚠ **NEUF (seconde passe, BQ-1) — retirer la BORNE du balayage** : laisser $M$ passer sous
    l'axe réel sur le cercle, ou franchir $B$ sur la droite → **la même famille, volet
    « borne »**, parce que **la valeur écrite de l'« invariant » CHANGE** ($-\frac{\pi}{2} \to
    +\frac{\pi}{2}$ ; $0 \to \pi$). *C'est le sabotage le plus subtil de la campagne : le produit
    a l'air correct — un nombre reste écrit — et il ment sur le fait même de l'étape.*
22 ter. **rendre la région vivante muette pendant le balayage, ou lui faire répéter deux fois la
    même chaîne** → **la même famille, volet « valeur parlée qui varie », seule** *(seconde
    passe, leçon livrée `HANDOFF.md:16449-16451`)* ;
23. **ouvrir le balayage au cran `libre`, ou avant la révélation de S4** →
    **`fuite-inter-etapes` seule** ;
24. **rouvrir `position` à S2** → **`fuite-inter-etapes` seule** *(c'est le seul sabotage de la
    campagne qui reproduise une décision de cette spec, §7.5 A)* ;
24 bis. **laisser `vecteurs` exister à S2** (modèle cumulatif au lieu du modèle par ensemble) →
    **`fuite-inter-etapes`, volet « ensembles exacts »** *(vague 1, pédagogie I5)* ;
25. donner aux deux flèches la même épaisseur → **`numerateur-denominateur-distincts` seule** ;
26. figer le badge sur $\frac{z_C-z_A}{z_B-z_A}$ quel que soit le sommet →
    **`formule-au-sommet` seule** ;
27. peindre le quadrillage en transparence trait par trait → `quadrillage-opaque` **seule** ;
28. écrire « module » dans un retour de S1, « isocèle » dans un retour de S2, « médiatrice »
    dans un retour de S3 → `formule-graduee` **seule**, **une mesure par étape** ;
29. ajouter un cran de forme, ou un cinquième placement → **N9 seule** ;
30. `import("three")` dans le module de la scène → `pas-de-3d` ;
31. **une forme interdite du §9 à la fois, insérée dans le panneau — UNE MESURE PAR FORME**,
    jamais une seule pour la liste entière (ADR 0036) : `birapport`, `cocyclique`,
    `quatre points`, `angle inscrit`, `Thalès` · `rotation`, `homothétie`, `centre`,
    `point fixe`, `\omega`, `z'=az+b` · `similitude`, `semblable` · `indirecte`,
    `antidéplacement`, `réflexion`, `projective`, `inversion` · `racine n-ième`,
    `racines de l'unité`, `z^n =` · `matrice`, `déterminant`, `application linéaire`,
    `vecteur propre` · `linéaris`, `Euler`, `angle moitié`, `\tan`, `arctan` · `discriminant`,
    `\Delta =`, `Viète` · `coordonnées polaires`, `\rho`, `x^2+y^2` · `°`, `degré` ·
    **un affixe hors des 53 états**.
    **Chacune doit faire rougir `frontiere` SEULE** ; une forme qui ne fait rien rougir est une
    **sonde manquante**, pas un produit propre.
    ⚠ **Et un essai rouge NÉGATIF, obligatoire : insérer le mot « vecteur » seul doit laisser
    la porte VERTE** (§9.6). *Une sonde qui rougirait sur « vecteur » rendrait cette scène
    inconstruisible, et c'est exactement le genre de faux positif qui apprend à ignorer le
    rouge.*

**Six sabotages AJOUTÉS EN VAGUE 1 :**

32. **remettre les ids comme libellés de cran** (« équilatéral » sur le contrôle `forme`,
    « médiatrice » sur `pointM`) → **`libelles-de-cran` seule**, **et `formule-graduee` à S2**
    *(deux portes, et c'est voulu : la première dit que le libellé est faux, la seconde que ce
    qu'il imprime est interdit à cette étape — correctif B1)* ;
33. **poser le petit carré d'angle droit au sommet $A$** (celui qu'on lit) au lieu de $C$ →
    **`angle-droit-marque` seule** ; **et le RETIRER après la révélation de S3** → la même
    famille, dans l'autre sens ;
34. **tracer le cercle unité en `mode: triangle`** → **`palette` seule** ; **et le retirer en
    `mode: lieu`** → la même famille, dans l'autre sens *(pédagogie M3 — la décision du §5.1 se
    mesure dans les deux sens, sinon c'est une intention)* ;
35. **reporter la longueur $AB$ au lieu de $AC$ à S2**, ou la reporter sur la direction de
    $\vec{AC}$ → **`longueurs-au-rapport` volet (b) seul** ;
36. **faire exister `vecteurs` à S2 ou `longueurs` à S3** → **`fuite-inter-etapes`, volet
    « ensembles exacts »** ;
37. ⚠ **ESSAI RED NÉGATIF n° 2, obligatoire :** **insérer « théorème de l'angle inscrit » dans
    la PROSE de `lesson.md`** — la prose du §4.4 le nomme une fois, et **la porte de la scène ne
    doit rien voir** : elle lit le panneau, pas la leçon. *Une sonde qui rougirait là
    interdirait le correctif de fidélité I5.* **En revanche, l'insérer dans le PANNEAU doit
    rougir** (`frontiere`, §9.1 bis) — **les deux sens, sur la même chaîne, dans deux zones
    différentes.***

**Un sabotage qui n'atteint pas la porte n'est pas un essai rouge** : il sort en quatrième
verdict, **AMBIGU** (ADR 0038). Et chaque défaut ne doit faire rougir que **la** porte qui le
garde.

---

## 12. Entrée de registre, descripteur, ordre de construction

**Registre** (`web/src/lib/scene3d/scenes.json` — le renommage du dossier reste la question
héritée, §13.11) :

```json
"plan-complexe-rapport": {
  "temps": false,
  "course": false,
  "dimension": "2d",
  "controles": ["position", "forme", "sommet", "pointM", "balayage"],
  "etat": ["position", "forme", "sommet", "pointM", "mode"],
  "valeurs": {
    "position": ["origine", "posee", "tournee", "retournee"],
    "forme": ["rect-isocele", "equilateral", "demi-equilateral", "aligne"],
    "sommet": ["A", "B", "C"],
    "pointM": ["libre", "cercle-1", "cercle-2", "mediatrice", "droite"],
    "mode": ["triangle", "lieu"]
  },
  "libelles": {
    "position": ["Placement 1", "Placement 2", "Placement 3", "Placement 4"],
    "forme": ["Triangle 1", "Triangle 2", "Triangle 3", "Triangle 4"],
    "sommet": ["A", "B", "C"],
    "pointM": ["2+4i", "\\sqrt3+i", "-\\sqrt3+i", "2\\sqrt3\\,i", "4"]
  },
  "lectures": [
    "vecteurs", "w", "module-w", "argument-w", "longueurs", "nature", "rapport-lieu"
  ]
}
```

> ## ⚠ `libelles` EST UNE CLÉ NEUVE DU DÉPÔT (correctif de vague 1, pédagogie B1)
>
> La scène sœur n'en a pas besoin : **ses ids de cran SONT des affixes** (`scenes.json:764-775` :
> `"c": ["2", "0.5", "i", "-2", "1+i", "2i", "sqrt3+i"]`), donc afficher l'id est déjà afficher
> un libellé neutre. **Ici les ids sont descriptifs** — `equilateral`, `mediatrice` — parce que
> le modèle et la porte en ont besoin pour être lisibles, **et ce sont précisément des réponses**.
> **Séparer les deux est la seule issue** : renommer les ids en `f1..f4` rendrait le modèle, le
> test unitaire et les 37 essais rouges illisibles ; afficher les ids imprime la réponse.
>
> **Trois conséquences, à vérifier AVANT de commencer (§15.4) :**
> 1. **`validate-content` accepte-t-il une clé `libelles` ?** *Si non, c'est lui qu'il faut
>    étendre : une clé d'affichage est une pièce neuve, pas une irrégularité.*
> 2. **`libelles[c]` doit avoir exactement la même longueur que `valeurs[c]`**, pour chaque
>    contrôle — et **c'est une assertion du test unitaire**, pas une convention.
> 3. **Les libellés passent par KaTeX** quand ils portent des maths (les cinq affixes de
>    `pointM`), comme le reste des nombres de la scène (§6.2).
>
> *Et si le dépôt préfère, la clé peut vivre dans le DESCRIPTEUR plutôt que dans le registre —
> c'est une décision de frontend-builder. **Ce qui n'est pas négociable, c'est que l'élève ne
> lise jamais `equilateral` sur un contrôle ouvert à S2.***

> **Pas de clé `bornes`, comme la scène sœur** : tout est en crans, sauf le balayage, qui
> parcourt une **courbe**, ne pose aucun état et n'écrit aucune clé. *Le validateur a déjà
> accepté ce cas une fois (la scène sœur est livrée) ; **la nouveauté ici est qu'un contrôle
> (`balayage`) n'existe qu'à CERTAINS crans d'un autre contrôle** (§6.1). **À vérifier contre
> `validate-content` avant de commencer** (§15.4) ; si le validateur le refuse, **c'est lui
> qu'il faut étendre** — un contrôle conditionnel est une pièce neuve, pas une irrégularité.*

**Descripteur** (`content/maths/nombres-complexes-2/media/plan-complexe-rapport.json`), mêmes
clés que `plan-complexe-transformation.json` : `slug`, `tool: "scene2d"`, `type: "manipulable"`,
`scene`, `title_fr`, `caption_fr`, `etapes[]` (`id`, `titre`, `consigne`, `pari{question,
choix[]}`, `suite`, `controles[]`, `lectures[]`, `etat{}`, **pas d'`etat_revele`**),
`boundary`, `boundary_guard_details`, `fit_caveat`, `param_manipulation_guide`,
`fallback_note`, `pedagogy_wiring{why_manipulable, predict_then_reveal, misconceptions[]}`,
`spec_ref`, `adr_ref`.

**`pedagogy_wiring.misconceptions` (CINQ ids** : `w-sommet-ignore`, `lecture-w-module-argument`,
`angle-lu-depuis-l-axe`, `produit-quotient-argument-operation`,
`ensemble-points-locus-confondu`**)** — *`validate-content` exige qu'un pari de scène nomme un
modèle DÉCLARÉ : **`w-sommet-ignore` doit être déclaré dans `items.yaml` AVANT que la scène
soit validée**, sans quoi la porte de validation échoue en dur. **`transformation-centre-oublie`
et `rotation-sens-inverse` n'y figurent PAS** (§8.1).*

**`fallback_note` à écrire :** sans JavaScript et à l'impression, le panneau disparaît. **La
figure `nature-triangle-w`, plus bas dans le chapitre, couvre un seul triangle, à un seul
sommet, avec $\vert w\vert = 1$** — c'est-à-dire le cas où le module et les deux longueurs sont
indiscernables (§2.2, raison 2). *L'élève sans JavaScript perd donc les trois faits centraux :
le sommet comme point de départ, le module comme quotient, et les trois lieux.* **C'est
pourquoi le §2.7 commande M2 (`trois-lieux.svg`), une figure structurelle à trois étapes, qui
paie au moins le troisième.** §13.12.

**Ce qui se RÉUTILISE, et ce qui est NEUF** *(à vérifier par frontend-builder avant de
commencer — §15.2)* :

| pièce | réutilisation |
|---|---|
| `plan-complexe-modele.ts` — **la couche d'arithmétique exacte** : `Q`, `R3`, `C`, `add/sub/mul/div`, `racine`/`Radical`, `argument` en douzièmes de $\pi$, `reduire`, `texComplexe`, `texRadical`, `texAngle` | **RÉUTILISÉE TELLE QUELLE.** *Toutes les valeurs de cette scène vivent dans $\mathbb{Q}(\sqrt3)[i]$ et tous les arguments sont des multiples de $\frac{\pi}{12}$ : **vérifié aux 53 états** (§5.3). **Décision à prendre par frontend-builder : importer depuis le module de la scène sœur, ou EXTRAIRE la couche dans un module partagé.** Importer crée une dépendance entre deux scènes ; extraire touche un fichier livré et gardé par une porte. **Je recommande l'extraction, en un commit séparé, avec la porte de la scène sœur relancée avant et après** — mais c'est une décision de code, et je ne la prends pas.* |
| `plan-complexe-rendu.ts` — repère isotrope carré, quadrillage opaque, graduations, cercle unité, `disposer`, filets d'étiquettes, `rayonArc`, `COTE_GRADUATIONS_FINES` | **RÉUTILISÉE, mais l'interface d'état change.** `EtatRenduPlan` décrit un couple $M$/$M'$ et un centre ; il faut **trois points nommés, deux flèches d'épaisseurs différentes, un arc à un sommet quelconque, et — neuf — une COURBE (droite ou cercle)**. *C'est un vrai travail, pas un paramétrage.* |
| l'arc | **RÉUTILISÉ** : l'arc de la scène sœur va déjà d'une direction à une autre autour d'un point quelconque. Ici les deux directions sont les deux flèches. |
| **la COURBE du lieu** | **NEUVE.** Aucune scène plane du dépôt ne trace de courbe géométrique. *Conséquence : la famille de porte `courbe-du-lieu` est neuve elle aussi, et la règle « aucune courbe tracée, donc aucune grille glissante à surveiller » de la scène sœur **ne s'applique plus** — il faut la mesurer.* |
| le **balayage** | **RÉUTILISÉ dans son principe** (continu, muet, sans état, non relâché au `keyup`), **neuf dans sa contrainte** : il glisse **le long d'une courbe**, et **n'existe qu'à certains crans** (§6.1). |

**Ordre de construction :**
1. **item-author** (a) déclare **`w-sommet-ignore`** dans `items.yaml` avec ses **deux faces**
   (§8.2), (b) **ÉLARGIT `angle-lu-depuis-l-axe`** selon l'édit écrit au **§8.2 bis** *(ajouté en
   vague 1, fidélité I2 — sans lui, la scène recrute à S2 un modèle dont le texte déclaré ne la
   couvre pas)*, et (c) écrit les **quatre** items (§8.3), **chacun avec son champ `habilete:`
   au vocabulaire maths** (fidélité I6). *Sans (a) et (b), rien d'autre ne valide.*
1 bis. **content-author** écrit (a) les **deux reprises de points d'arrêt** (§4.6) **et (b)
   l'alignement de `checkpoints.yaml:375-376`** — la phrase « réciproque de Thalès » remplacée
   par le mécanisme et le nom retenu *(ajouté en vague 1, fidélité I5 ; les quatre choix et la
   bonne réponse ne changent pas)*. **Livrables indépendants de tout code.**
2. **frontend-builder** tranche la question du module partagé (ci-dessus), puis écrit
   `plan-complexe-rapport-modele.ts` et son test unitaire `test-plan-complexe-rapport.mjs`
   contre **les cinq tables du §5.3 et les 53 états**.
3. **frontend-builder** étend le rendu (les trois points, les deux flèches, l'arc au sommet, la
   courbe), puis `PlanComplexeRapportPanel.tsx`, puis l'entrée de registre.
4. **content-author** écrit le descripteur (§7) et la prose (§4), **y compris la sous-section
   neuve du §4.4 — sans laquelle S4 ne part pas** (§3, tension 2).
5. **frontend-builder** écrit la porte et sa campagne `--essai-rouge` (§11.4) — **vert d'abord,
   puis rouge, dans ce dossier, avec cette commande**.
6. **vague 1** : bac-fidelity-critic + pedagogy-critic. **vague 2** : dessin, calme, ergonomie,
   captures relues.

---

## 13. Questions au propriétaire — chacune avec sa réponse par défaut, et comment la défaire

1. **LE CADRE MATHS N'EST PAS AUTORITATIF, et toute cette spec en dépend.** (§0.3, §1.)
   `maths-sm.yaml:12-17`, `maths-sexp.yaml:10-16` : « PROPOSITION — NON AUTORITATIVE », trois
   portes non passées, PDF officiel scanné. **Défaut : on construit quand même, et on le
   déclare.** *Pour défaire :* faire passer les trois portes **avant** de construire. **Coût du
   défaut : si une borne dérivée est fausse, le §9 interdit des formes que le programme
   autorise, ou autorise des formes qu'il interdit.** **C'est la décision la plus lourde de ce
   document, et elle appartient à l'humain.**
2. **S4 (les lieux) est-elle de profondeur SM ?** (§1, §10.8, §10.15.) **Défaut : OUI, marquée
   SM DANS LA PROSE, et servie quand même aux deux filières.** *Motif — **et il repose sur TROIS
   lignes `derived` qui ne disent pas la même chose**, pas sur deux (correction de vague 1,
   fidélité I3)* :
   - `maths-sm.yaml:225` (`programme`) nomme « cercle » ⟹ **SM couvre S4** ;
   - `maths-sexp.yaml:251` (`programme`) ne le nomme pas ⟹ **contre S4 en SExp** ;
   - `maths-sexp.yaml:254` (`savoir_faire`) nomme $\arg\!\left(\frac{z-a}{z-b}\right)$, **qui EST
     l'objet de S4** ⟹ **pour S4 en SExp** ;
   - `maths-sexp.yaml:328` (`coverage_notes`) : « *configurations avancées relèvent de SM ; SExp
     n'utilise que formes trigo/exp, second degré réel, transformations $z'=az+b$* » ⟹ **contre
     S4 — et, lu à la lettre, contre S1–S3 aussi.**
   **Le partage est donc 2 contre 1 en faveur de la prudence, et le défaut en sort renforcé.**
   ⚠ **Et la marque a changé de support en vague 1 (fidélité I4) : elle vit désormais dans la
   PROSE du §4.4 point 4**, sur le modèle livré de `lesson.md:327` — parce qu'un champ
   `filiere` du descripteur **n'est lu par personne** (`REVIEW:116`). *Pour défaire dans un
   sens :* retirer S4 pour SExp — **coût : un élève SExp perd le seul endroit du corpus où un
   lieu est construit, et `cp-ensemble-points` lui retombe dessus sans antécédent.** *Pour
   défaire dans l'autre :* retirer la clause de prose — **coût : on revient à une revendication
   que personne ne lit.**
   **À router à `research-lead` : TROIS lignes `derived` d'un même fichier non autoritatif se
   contredisent sur ce que SExp prend de cette leçon.**
3. **Comment nommer le cercle de diamètre ?** (§4.4, §4.6, §9.1 bis ; `REVIEW:122-130`, S7.)
   ⚠ **DÉFAUT RETOURNÉ EN VAGUE 1 (fidélité I5), et d'abord parce que le premier jet rapportait
   faux la recommandation.** Il écrivait « *`REVIEW:122-130` (S7) a laissé la convention
   marocaine à l'arbitrage du propriétaire* ». **S7 dit au contraire** (`REVIEW:127-130`) :
   « *Recommandation : **aligner sur « angle inscrit » / « cercle de diamètre »**, mais faire
   confirmer la convention marocaine par le **content-author*** ». *Une direction, et un
   propriétaire nommé — pas un report.*
   **Défaut retenu, et il adopte la direction de S7 :** (a) la **prose du §4.4** écrit le
   mécanisme ($O$ milieu, $OM = OA = OB = \frac{AB}{2}$), puis **nomme « théorème de l'angle
   inscrit » une seule fois, après** ; (b) **« Thalès » et « réciproque de Thalès » restent
   bannis** partout — `REVIEW:124-126` les dit « univoquement le mauvais nom » ; (c) **le
   panneau de la scène ne nomme aucun théorème** (§9.1 bis), parce qu'il vient AVANT la prose ;
   (d) **`checkpoints.yaml:375-376` est aligné** (§4.6), sans quoi la prose muette envoyait
   l'élève apprendre le mauvais nom un clic plus loin.
   **Ce qui reste au propriétaire : la passe CORPUS-WIDE sur les ~15 occurrences contestées**
   (`items.yaml:1607,1612,1624` ; `checkpoints.yaml:344` ; douze lignes de `bank.yaml`), **pas
   la direction.** *Pour défaire :* garder le silence total — **coût : la scène et la prose sont
   muettes là où l'élève entendra un nom en classe, et le point d'arrêt continue de lui donner
   le faux.**
4. **`centre-lu-sur-b` : toujours candidat, et cette scène ne le tranche pas.** (§0.2 ; spec
   sœur §8.3, §15.13.) **Défaut : il reste CANDIDAT, non déclaré.** *Motif inchangé et vérifié
   : aucune entrée de banque de cette notion ne demande de caractériser un $z'=az+b$ **donné** ;
   la fréquence n'est mesurée par rien, et **une scène ne produit pas de données de
   fréquence**.* *Pour défaire :* l'instrumenter — poser le libellé comme **étiquette
   provisoire** sur le distracteur B de NBCOMPLEX2-38 et relever son taux de sélection quand la
   télémétrie existera. **Coût du défaut : un modèle peut-être réel reste invisible. Coût de le
   déclarer sans mesure : exactement ce que la spec sœur a refusé de faire, et elle avait
   raison.**
5. **Le TITRE de R6 nomme deux des quatre lignes de la table.** (§3.) `lesson.md:363` :
   « *R6 — Configurations : **la nature d'un triangle, l'alignement*** ». **Défaut : on ne le
   change pas, et on déclare le coût.** *Pour défaire :* content-author le remplace par une
   question — par exemple « *Que sait-on d'un triangle rien qu'en divisant deux affixes ?* ».
   **Coût du défaut : un élève qui lit le titre sait qu'il sera question d'alignement. Coût du
   correctif : une ligne, et une passe de cohérence sur les renvois « chapitre 7 » du corpus —
   38 dans `bank.yaml` seul.** *C'est exactement la question §13.13 de la spec sœur, posée une
   seconde fois sur un autre titre : **si le propriétaire tranche, qu'il tranche pour les
   deux.***
6. **`lecture-w-module-argument` doit-il être UN modèle ou TROIS ?** (§8.1.) **Défaut : UN.**
   *Motif : sa description déclare explicitement les trois faces (« *échange les rôles […]
   ou n'en lit qu'un des deux* », `items.yaml:211-220`), et les trois items existants portent
   déjà tous leurs distracteurs par lui.* *Pour défaire :* scinder en « rôles échangés »,
   « module seul lu » et « argument lu contre la mauvaise ligne » — **et alors deux des trois
   tombent sous le plancher**, ce qui exige **six items de plus**. **Coût du scindement : six
   items ; gain : une granularité diagnostique que je ne sais pas justifier aujourd'hui.**
   ⚠ *Note de vague 1 : la question était ancrée sur S3, où trois distracteurs portaient ce
   modèle. **Après le correctif B4, S3 n'en porte plus qu'un** (`rectangle-en-A`), et le modèle
   est servi à S2 (`roles-echanges`) et par -43 (C) et -44 (C). **La question reste ouverte, mais
   elle n'a plus d'ancrage dans cette scène** : elle se tranche sur le corpus, pas ici.*
7. **Faut-il un cran de $M$ sur DEUX lieux à la fois ?** (§5.2 D.) **Défaut : NON.** $2i$ est
   sur le cercle **et** sur la médiatrice ; $0$ est sur la droite **et** sur la médiatrice.
   *Motif : un cran qui allume deux conditions ne diagnostique rien, et à S4 la question est
   précisément de les séparer.* *Pour défaire :* ajouter $2i$ comme sixième cran et lui faire
   afficher $u = -i$ (module $1$ **et** argument $-\frac{\pi}{2}$) — **gain : le cas où deux
   lieux se coupent, qui est joli et que le balayage rendrait visible ; coût : un cran, une
   ligne de porte, et le risque que ce soit l'état que l'élève retienne.** *Réversible.*
8. **Faut-il garder le cercle unité ?** (§5.1.) ⚠ **TRANCHÉ EN VAGUE 1 (pédagogie M3) — par une
   raison, pas par un goût. Réponse : OUI en `mode: lieu`, NON en `mode: triangle`.** *Motif :
   à S1, S2 et S3, **aucun module lu n'est comparé à $1$ sur le dessin** — le §5.1 du premier jet
   le concédait lui-même —, donc le cercle y est de l'encre que rien n'explique, sur trois
   étapes. À S4, « $\vert u\vert = 1$ » **EST** le pari et le cercle unité **EST** un
   distracteur explicite : il y rend l'erreur visible et réfutable au lieu de l'abstraire.*
   **Ce n'est donc plus une question ouverte : c'est une décision, et la porte la mesure dans
   les deux sens** (`palette`, essai rouge n° 34). *Pour défaire :* le tracer partout, ou nulle
   part — **coût du « partout » : trois étapes d'encre muette ; coût du « nulle part » : le
   distracteur `cercle-unite` de S4 redevient abstrait.* **Laissé au propriétaire comme
   décision déjà prise, pas comme question ouverte.**
9. **Le balayage doit-il exister ?** (§6.1.) **Défaut : OUI, muet, à S4 seulement, et seulement
   aux crans qui sont sur un lieu.** *Motif : c'est le seul endroit de la scène où un continuum
   dit quelque chose qu'aucun cran ne dit — deux invariants opposés selon la courbe.* *Pour
   défaire :* le retirer, avec sa famille de porte et ses quatre essais rouges (20 à 23) ;
   **rien d'autre ne bouge — c'est un ajout strictement additif.**
10. **Le rung « quatre points cocycliques » est-il dû ?** (§0.2, §9.1, §10.10.) **Défaut : OUI,
    et ce n'est PAS cette scène.** `bank.yaml:144-148` l'écrit déjà : « *un rung dédié — quatre
    points cocycliques : l'angle inscrit lu sur les affixes — est désormais clairement dû,
    puisque le corpus contient maintenant QUATRE entrées qui en dépendent, dont une où le sujet
    impose l'outil.* » **Je le relaie sans l'absorber** : c'est une passe pedagogy-architect sur
    un rung neuf, plus grosse que cette scène.
11. **ADR 0017 et ADR 0041 ne rangent pas un manipulable sous le même `tool`.** (§2.7.)
    **Défaut : on suit ADR 0041 (`"tool": "scene2d"`), et on le déclare.** *Pour défaire :* une
    passe de documentation qui réconcilie les deux ADR — **décision de propriétaire, à prendre
    indépendamment de cette scène**, et de préférence en même temps que la question héritée du
    dossier `scene3d/` qui porte des scènes planes (spec sœur §13.12).
12. **Faut-il commander la figure de repli `trois-lieux` ?** (§2.7 M2, §12.) **Défaut : OUI** —
    c'est le seul des trois faits centraux qu'une figure statique peut porter honnêtement.
    *Pour défaire :* s'en passer — **coût : un élève sans JavaScript n'a, pour les lieux,
    strictement rien, puisque `nature-triangle-w` ne les montre pas.** **Coût de la commander :
    un SVG et son `.stages.json`, dans une notion qui en porte déjà sept dont une orpheline
    (`REVIEW:139-141`, S9) — et l'occasion de remplacer l'orpheline plutôt que d'en ajouter
    une huitième.**
13. ⚠ **AJOUTÉE EN VAGUE 1 (fidélité I7) — UN `savoir_faire` DE CADRE EST ORPHELIN ENTRE DEUX
    SPECS, ET IL EST À 0 %.** *Ce n'est pas une question de scène : c'est une dette de
    pédagogie que deux documents se renvoient.*
    **La piste, en trois lignes :**
    - `maths-sm.yaml:229` (`savoir_faire`) : « *Caractériser une similitude directe (rapport,
      angle, **centre**)* » ;
    - `REVIEW-2026-09-11.md:100-105` (S4) : « *Similitude directe (rapport, angle, centre) :
      jamais enseignée, jamais nommée, **0/34 items**. […] le geste INVERSE ($\omega = b/(1-a)$,
      rapport $\vert a\vert$, angle $\arg a$) sont absents et non testés. Fix : lesson +
      items.* » ;
    - **la scène sœur l'a assigné À CETTE SCÈNE** — `scene-plan.md:2444-2447` : « *elle
      porterait le savoir-faire `bank.yaml:475` / `:1176` — le centre d'une rotation reconstruit
      depuis un couple point/image […] que **cette** scène ne prépare pas (§10.9)* » ;
    - **et ce document le REFUSE** (§0.2 : « *c'est du R5* », plus un argument de rang et un
      argument de nature — reconstruire un point fixe est algébrique, la manipulation ne
      l'éclaire pas).
    **Les deux refus sont défendables. Leur somme ne l'est pas : deux documents qui se
    renvoient l'un à l'autre, c'est exactement la façon dont un savoir-faire à 0 % reste à
    0 %.** La demande d'examen est vérifiée (`bank.yaml:475`, `:479`).
    **Défaut proposé : ce n'est ni l'une ni l'autre des deux scènes — c'est une passe PROSE +
    ITEMS sur R5, à router à pedagogy-architect puis item-author, avec un livrable nommé** :
    un paragraphe de `lesson.md` qui définit le geste inverse ($\omega = \frac{b}{1-a}$,
    $\vert a\vert$, $\arg a$) **et trois items**. *Pour défaire :* l'assigner à la scène R6
    malgré tout — **coût : une cinquième étape sur un geste algébrique que la manipulation
    n'éclaire pas, dans une scène déjà à quatre paris.** **Ce que je ne fais pas : le laisser
    sans propriétaire une troisième fois.**
14. ⚠ **AJOUTÉE EN VAGUE 1 — DEUX DETTES CRÉÉES PAR CETTE LIVRAISON, écrites à côté de ce
    qu'elle arme** (ADR 0035, ADR 0036 : *une dette honnête reste invisible tant qu'aucun
    registre ne la nomme*).
    **(a) Le vocabulaire d'`habilete` devient incohérent À L'INTÉRIEUR de cette notion.** Les
    quatre items neufs portent le triplet MATHS (`application_directe` /
    `application_non_explicite` / `synthese_situations_inhabituelles`, §8.3) ; les deux
    checkpoints existants portent `habilete: raisonnement`, **du vocabulaire PC**
    (`checkpoints.yaml:289`, `:352` ; `REVIEW:109-111`). **Défaut : on écrit le bon vocabulaire
    sur les items neufs et on déclare l'incohérence**, plutôt que de propager le mauvais.
    *Pour défaire :* aligner les deux checkpoints dans la même passe — **deux lignes, et c'est
    tentant ; mais c'est un correctif corpus-wide (S5) que cette scène n'a pas mandat de
    trancher, et le faire ici sur deux fichiers de quatorze notions serait un demi-correctif.*
    **Coût du défaut : un fichier de notion parle deux langues d'habileté.**
    **(b) `w-sommet-ignore` naît avec DEUX faces et trois items.** La face A (la soustraction
    oubliée) en a trois ; **la face B (la lecture non indexée par le sommet) n'en a qu'un**
    (-44 B), plus deux distracteurs de scène (S3). *Pour défaire :* scinder en deux modèles —
    **coût : trois items de plus, la face B partant sinon à 1 sur un plancher de 3.* **Coût du
    défaut : une des deux faces est déclarée mais sous-mesurée, et un taux d'exhibition agrégé
    mélangera deux gestes.** *C'est le même aveu, à la même place, que
    `multiplication-rotation-par-defaut` à la livraison précédente — et je le pose avant la
    construction, pas après.*

---

## 14. Fait quand

La scène est **faite** quand, et seulement quand :

0. ⚠ **RÈGLE HÉRITÉE DE LA VAGUE 1 DE LA SCÈNE SŒUR, ÉLARGIE PAR LA VAGUE 1 DE CELLE-CI, à
   vérifier AVANT tout le reste : chaque choix de pari est recalculé depuis le modèle que son
   étiquette nomme.** Pour les **seize** choix de la scène (4 étapes × 4) **et** les **seize**
   choix des quatre items neufs, on refait ce que le texte du choix annonce, et on vérifie :
   - **(a)** qu'il donne bien la valeur ou l'énoncé affiché ;
   - **(b)** qu'il **diffère de la bonne réponse** ;
   - **(c)** qu'**aucune valeur n'est atteignable par deux modèles différents** sans que le
     double étiquetage soit déclaré ;
   - **(d) — NEUVE (vague 1, pédagogie B3) — que le texte du choix ne contient PAS le nombre
     qui le réfute.** *Le défaut mesuré : « $\frac{\sqrt3}{2}$ serait la longueur $AC$ (**soit
     $2\sqrt3$**) » — l'option donnait entre parenthèses la valeur vraie qui la démolit. **Un
     élève qui porte la misconception ne peut pas s'y engager**, donc le modèle est nommé sans
     jamais être confrontable, **et la porte ne verra jamais rien** puisque le choix n'est
     jamais coché. La règle : **la réfutation est le travail du RETOUR, jamais du choix.***
   - **(e) — NEUVE (vague 1, fidélité I2) — que la PORTÉE DÉCLARÉE du modèle couvre le geste du
     choix**, pas seulement ses nombres. *Le défaut mesuré : `angle-lu-depuis-l-axe` était
     recruté à S2 alors que son texte déclaré est borné à une TRANSFORMATION
     (`items.yaml:258-270`), dans un vocabulaire que le §9.2 de cette même scène interdit. **La
     règle 0 du premier jet re-dérivait les NOMBRES et jamais la PORTÉE** — et c'est exactement
     l'attribution que la vague 1 de la scène sœur avait déjà punie. **Pour chaque choix : ouvrir
     le texte déclaré du modèle, et vérifier qu'il décrit ce geste-là. S'il ne le décrit pas :
     élargir le modèle (avec l'édit écrit) ou changer de modèle. Jamais supposer.***

   *Le sous-cas (b) est le défaut de stem que le §5.2 B déclare et borne (le placement
   `origine`), et le §7.2 évite (le placement `tournee`).*
1. **`w-sommet-ignore` est déclaré** dans `items.yaml` avec ses deux faces (§8.2), **et
   `angle-lu-depuis-l-axe` est ÉLARGI** selon l'édit du §8.2 bis, **et** les **quatre** items du
   §8.3 existent, **chacun avec `habilete:` au vocabulaire maths**, chaque distracteur portant
   un `misconception:` nommé, **et chaque distracteur `w-sommet-ignore` de face A respectant la
   contrainte de retour du §8.3** (nommer $O$ ; ne jamais dire qu'un rapport d'affixes est vide
   de sens). **Et ni `transformation-centre-oublie` ni `rotation-sens-inverse` n'apparaissent
   dans `pedagogy_wiring` ou dans un choix de la scène** (§8.1).
1 bis. Les **deux reprises de points d'arrêt** du §4.6 sont écrites, **et
   `checkpoints.yaml:375-376` est aligné** (la phrase « réciproque de Thalès » remplacée, choix
   inchangés).
1 ter. **Aucun libellé de cran n'est un id**, et `libelles[c]` a la même longueur que
   `valeurs[c]` pour les quatre contrôles (§12).
2. Le test unitaire `test-plan-complexe-rapport.mjs` passe sur **les cinq tables du §5.3**, en
   formes exactes **et** en flottants, **et sur les 53 états**, pas seulement sur les lignes
   tabulées. **Il vérifie en particulier, point par point, que les 48 + 5 états tiennent dans
   $[-9;9]^2$** — le raisonnement du §5.3 D ne suffit pas au placement `retournee`.
3. `validate-content` passe : scène enregistrée, contrôles connus, **tout contrôle ouvert par
   au moins une étape** *(vérifié après le retrait des réouvertures : `position` → S1,
   `forme` → S2, `sommet` → S3, `pointM` et `balayage` → S4 ✓)*, aucun `revele_apres_h`, aucun
   `etat_revele` (déclaré), chaque pari nommant un modèle déclaré, **le contrôle conditionnel
   `balayage` accepté**, **et la clé `libelles` acceptée** (§12, §15.4).
4. La porte `scene-plan-complexe-rapport.mjs` sort **VERT** à $1\,280$ **et** à 390 px,
   **lancée trois fois** (une porte instable est pire qu'une porte absente).
5. `--essai-rouge` : **les sabotages numérotés du §11.4 — n° 1 à 37, plus les trois « bis »
   (5 bis, 11 bis, 24 bis), soit QUARANTE entrées dont HUIT ajoutées en vague 1 — font crier la
   famille annoncée, et elle seule** ; **plus les DEUX essais
   NÉGATIFS** (le mot « vecteur » seul ne doit rien faire rougir ; « théorème de l'angle
   inscrit » **dans la prose de `lesson.md`** ne doit rien faire rougir non plus, alors que le
   même syntagme **dans le panneau** doit rougir). Un sabotage qui n'atteint pas la porte sort
   **AMBIGU**, jamais vert. **Le n° 1 se rejoue aux quatre placements** : il doit rougir à trois
   et rester vert à `origine`, sans quoi il ne reproduit pas le défaut qu'il garde.
6. **La prose du §4 est écrite, et la sous-section neuve du §4.4 (les trois lieux) est en
   place** — sans elle, S4 déplace d'un rung l'anti-motif que `REVIEW:132-137` reproche déjà au
   corpus, et je ne la livrerai pas ainsi. ⚠ **Cette clause s'est alourdie en vague 1**
   (pédagogie I7) : S4 ne parie plus qu'**un** des trois lieux, **les deux autres ne sont plus
   portés que par le §4.4**. *Et la sous-section doit contenir ses cinq points plus le
   sixième* — **la dérivation de la lecture au sommet $M$** (point 1, pédagogie I8), **le
   mécanisme $OM = OA = OB = \frac{AB}{2}$** (point 4, pédagogie I9), **la clause de filière**
   (point 4, fidélité I4) **et le nom « théorème de l'angle inscrit », une fois, après le
   mécanisme** (point 6, fidélité I5). **Une sous-section qui les omettrait n'est pas la
   sous-section commandée.**
6 bis. **La phrase qui FERME la recherche de S1 est écrite** (§4.3 point 3) — le descripteur n'a
   pas de champ de réponse, et une recherche non close est un piège pour l'élève en difficulté.
7. **Vague 1 — PASSÉE le 2026-09-25**, et ce qu'elle a changé est écrit en tête de ce document
   et à chaque endroit où le changement agit, pas corrigé en douce ; **les deux constatations
   réfutées le sont par écrit, avec la citation** (§15.12).
   **Vague 2 — À FAIRE** (captures relues à deux largeurs, ergonomie au clavier, étiquettes).
   ⚠ **Trois points à lui remettre explicitement**, parce qu'ils sont neufs ou aggravés :
   (a) **l'encombrement de S3 après révélation** — trois points dans une boîte de
   $4 \times 1{,}73$ unités **plus** le petit carré en $C$, aux deux largeurs (§6.2) ;
   (b) **la lisibilité de la longueur reportée de S2** — elle doit se distinguer de la flèche
   du dénominateur qu'elle longe (§5.6) ; (c) **les cinq libellés d'affixe du contrôle
   `pointM`**, rendus en KaTeX dans des boutons radio, à 390 px (§12).

---

## 15. Ce que je n'ai pas pu vérifier

1. **Je n'ai pas exécuté le produit.** Toutes les positions de pixels, les budgets d'étiquettes
   et les facteurs px/unité de ce document sont **hérités de la spec sœur**, elle-même
   **calculée et non mesurée**. *Le plafond de hauteur de plateau de 560 px reste un choix, pas
   un relevé.*
2. **Je n'ai lu le code de la scène sœur que par ses INTERFACES.** J'ai lu
   `plan-complexe-modele.ts` en entier (l'arithmétique exacte, les crans, les lectures) et
   `plan-complexe-rendu.ts` par son en-tête et ses types exportés. **Je n'ai lu ni
   `PlanComplexePanel.tsx`, ni `disposer`, ni `usePari`, ni `Plateau`.** *L'affirmation du §12
   « le rendu se réutilise, mais l'interface d'état change » est donc **une lecture de types,
   pas une lecture d'implémentation**. **À vérifier par frontend-builder avant de commencer**,
   en particulier : un arc à un sommet arbitraire, deux flèches d'épaisseurs différentes, et une
   COURBE — dont aucune scène plane du dépôt n'a d'exemple.*
3. **`etat_revele` absent aux quatre étapes : accepté ?** La scène sœur est livrée sans, donc la
   réponse est probablement oui — **mais je ne l'ai pas relu dans `validate-content`.**
4. **Un contrôle CONDITIONNEL (`balayage` présent à certains crans de `pointM` seulement) est
   une pièce neuve du dépôt.** Le balayage de la scène sœur existait à toute son étape. *Je
   n'ai vérifié ni que `validate-content` l'accepte, ni que le panneau sait ouvrir un contrôle
   qui dépend de la valeur d'un autre.* **C'est la nouveauté technique la plus risquée de cette
   spec.**
5. **Je n'ai pas audité les 38 occurrences de « chapitre 7 » de `bank.yaml`.** J'ai relevé et
   cité **neuf** formes de rapport, à leurs lignes (fait **e** du §0.1), et compté les
   occurrences et les entrées par `grep`. *L'affirmation « la banque lit presque toujours à un
   sommet $\neq O$ » repose donc sur **un échantillon nommé**, pas sur un recensement. **Les
   trois contre-exemples que j'ai trouvés sont cités** ($\frac{b}{a}$ à `:463`,
   $\frac{z_1}{z_2}$ à `:812` — **2024 N, pas 2023 : année corrigée en vague 1** —, et
   $\frac{u^n}{u^0}$, dont je n'ai **pas** re-vérifié la session).* ⚠ **La vague 1 a par
   ailleurs re-vérifié les sessions de tout le relevé contre les bornes des dix entrées, et en a
   corrigé deux** (fidélité M1) : `:1062-1090` est **2024 rattrapage** (et non 2017) et `:1631`
   est **2023 rattrapage** (et non 2025). *Deux des entrées relevées sont des **rattrapages**,
   ce que le premier jet ne disait pas — `bank.yaml` SCOPE NOTE 3.*
6. **Je n'ai pas vérifié les 48 états un par un.** J'ai vérifié **les douze valeurs de $w$**
   (§5.3 A, à la main, les quatre formes aux trois sommets), **l'argument d'invariance par
   placement** (§5.2 B : $r$ se simplifie, $t$ disparaît), et **les bornes de cadre point par
   point au seul placement où la borne grossière ne conclut pas** (§5.3 D, `retournee`).
   *C'est exactement le raisonnement qui avait échoué à la spec sœur ; il est valide sur un
   cadre carré, mais **c'est le test unitaire du §14.2 qui doit le prouver, pas ce document**.*
   ⚠ **La vague 1 de fidélité a re-dérivé indépendamment toute l'arithmétique du premier jet —
   les douze $w$, les modules et arguments, les rapports de longueurs, les quatre positions de
   `retournee` point par point, les cinq états du mode `lieu` et les 32 valeurs d'option — et
   n'a trouvé AUCUNE erreur.** *Ce qui a changé depuis n'est donc pas une correction de calcul,
   mais des états et des items neufs : **les nombres de la nouvelle S3** (les trois sommets de
   `demi-equilateral` × `retournee`) **et ceux des quatre items refaits** (§8.3) **n'ont été
   vérifiés que par moi, une fois.*** **Ils sont la première chose que la vague 1 suivante doit
   recalculer**, et le test unitaire du §14.2 les couvre tous sauf les items.
7. **Je n'ai pas mesuré la fréquence de `w-sommet-ignore` chez de vrais élèves.** Je l'ai
   déclaré sur **ce que le corpus fabrique** (quatre objets sur quatre avec $z_A = 0$ ou $w$
   donné) et **sur ce que l'examen demande** (neuf formes relevées à un sommet $\neq O$).
   *C'est une inférence de dispositif, pas une donnée de copie. **Elle est plus forte que celle
   qui m'a fait refuser `centre-lu-sur-b` (§13.4) — où le corpus ne fabrique rien et où
   l'examen ne demande rien — mais elle reste une inférence, et l'humain doit la juger.***
8. **Je n'ai pas mesuré l'effet de cette scène sur `media-manipulable` ni sur
   `dette-manipulable`.** *Comme la scène sœur, elle ne solde aucune dette écrite :
   `grep -c '\[\[embed:' lesson.md` ⇒ **1** (la scène sœur), et aucune spec n'a jamais prescrit
   d'`[[embed:]]` pour R6.*
9. **Je n'ai pas relu les huit scènes Manim de la notion.** *Si l'une d'elles montre déjà la
   lecture de $w$ à un sommet quelconque, cela ne retire rien au trou — elles sont dans la voie
   « explication après coup », pas dans la leçon — mais cela mérite d'être su.* *(La spec sœur
   portait déjà cette réserve, §15.5 ; elle n'a pas été levée.)*
10. **Le cadre est une proposition non validée** (§13.1). C'est écrit trois fois dans ce
    document parce que c'est la chose qu'il ne faut pas oublier.
11. **Deux citations sont REPRISES de la spec sœur sans que je les aie rouvertes** :
    `docs/ops/SCENE-CONTRACT.md:186-203` (le défaut d'isotropie réel du 2026-08-14 dans cette
    notion, 36,9 % d'écart) et les addenda d'ADR 0041 sur le balayage, la lecture double et le
    quadrillage opaque. *Elles sont vraies **au sens où la spec sœur les a vérifiées et où sa
    vague 1 les a relues** ; elles ne sont pas remesurées ici. **Une citation héritée reste une
    citation à vérifier**, et c'est la faute exacte que la vague 1 de la spec sœur a punie
    (§15.9 de ce document-là).* ⚠ **La vague 1 de fidélité de CE document ne les a pas rouvertes
    non plus** et l'écrit : « *il reste une citation deux fois non vérifiée* ». **Réserve
    maintenue, et elle appartient désormais à frontend-builder, qui touche le rendu.**
12. ⚠ **CE QUE LA VAGUE 1 A DIT ET QUE JE RÉFUTE — deux constatations, avec la preuve.**
    *(Une constatation qu'on n'applique pas se réfute par écrit, ou elle revient.)*
    - **Pédagogie M6 — « divergence avec la scène sœur sous `prefers-reduced-motion` ».
      RÉFUTÉE.** Le rapport oppose le §6.1 de cette spec (« rien ne change ») au §6.1 de la spec
      sœur (« trois positions discrètes »). **Mais la spec sœur porte, AU-DESSUS de son §6.1, un
      bloc « Ce que la construction a changé » qui la corrige** —
      `docs/pipeline/propositions/maths-nombres-complexes-2-scene-plan.md:26-29` : « *Sous
      `prefers-reduced-motion`, **rien ne change** […] ; les « trois positions discrètes » du
      §6.1 **ne sont pas construites**.* » **Cette spec est alignée sur ce qui a été LIVRÉ.**
      *Ce que la constatation enseigne quand même, et qui est vrai : **quand deux documents se
      contredisent à l'intérieur du même fichier, c'est le bloc de construction qui gagne, et
      la spec sœur devrait y renvoyer depuis son §6.1.** Signalé, non corrigé ici — je ne touche
      pas la spec sœur.*
    - **Fidélité I3 — « la seule divergence de programme » est fausse. PARTIELLEMENT RÉFUTÉE,
      et appliquée quand même.** `maths-sexp.yaml:328` vit sous **`coverage_notes`**, déclaré à
      `:311`, **pas sous `programme`** ; la phrase du §1 (« la seule divergence de
      **programme** ») était donc **littéralement exacte**. *Ce que la constatation a raison de
      dire : elle était **trop étroite pour être honnête** — une troisième ligne `derived` du
      même fichier parle du même partage, la REVIEW citée quatre fois la nomme (`REVIEW:114`),
      et ce document ne l'avait pas ouverte.* **La ligne est ajoutée au §1 et au §13.2, et la
      phrase est réécrite en « la seule divergence entre les deux lignes `programme` », suivie
      du tableau des trois lignes.**


