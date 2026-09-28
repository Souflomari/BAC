# Énoncés jumeaux — deux questions posées deux fois

**Mesuré le 2026-09-20** · `node web/scripts/enonces-jumeaux.mjs`
Corpus : 62 notions, 1 612 items, 362 points d'arrêt.

> **Ce document demande deux arbitrages ÉDITORIAUX.** Les deux constats
> ci-dessous ne sont pas des défauts mécaniques : ce sont des décisions
> prises en amont, dans les `spec.md`, et exécutées fidèlement par les
> auteurs. Les corriger demande de réécrire un énoncé — ce que l'outillage
> ne peut pas faire à la place du propriétaire. Le cliquet de la porte les
> tient à leur niveau actuel en attendant.

---

## Ce qui va bien (et qui n'était mesuré par rien)

`LESSON-EXPERIENCE-SPEC §1.1` promet, mot pour mot : « pour que la même
question n'apparaisse jamais deux fois ». Le mécanisme est un champ —
`item_source: clone_of_<id>` sur un point d'arrêt fait retirer `<id>` du
chapitre par `ItemsSection`.

**Les 132 clones du corpus le déclarent correctement. Zéro clone nu, zéro
déclaration pendante.** Le mécanisme est intact, et il est maintenant gardé
dans les deux directions (voir §11.118).

Ce n'était pas acquis : un auteur qui recopie un énoncé et oublie la ligne
`item_source:` ne cassait aucun test. Il faisait simplement voir deux fois la
même question à l'élève.

---

## Constat 1 — `maths/probabilites-conditionnelles` : M4 et M5 partagent leur énoncé canonique

`PC-M4-1` et `PC-M5-1` portent le **même énoncé, au caractère près** :

> « $A$ et $B$ sont deux événements indépendants avec $P(A)=0{,}4$ et
> $P(B)=0{,}5$. Que vaut $P(A \cap B)$ ? »

Même clé ($0{,}2$), mêmes deux distracteurs tagués (dans un ordre permuté),
et un seul quatrième distracteur qui diffère — $0{,}1$ contre $0{,}45$, tous
deux non tagués.

**Ce n'est pas une étourderie d'auteur.** Les deux items portent le commentaire
`# Canonical (spec's distinguishing stem)`, et le `spec.md` de la notion
prescrit effectivement le même énoncé aux deux misconceptions :

- `spec.md:116` — **M4** (`independant-implique-intersection-nulle`) :
  « … Que vaut P(A∩B) ? Choix : A) 0,2 ; B) 0 ; C) 0,9 ; D) 0,1. »
- `spec.md:127` — **M5** (`independant-somme`) :
  « … Que vaut P(A∩B) ? Choix : A) 0,2 ; B) 0,9 ; C) 0 ; D) 0,45. »

La conséquence est double.

**Pour l'élève.** Il rencontre deux fois la question identique dans la même
leçon, à deux endroits différents. Rien ne le lui explique.

**Pour le diagnostic.** Un seul de ces deux items suffit à distinguer M4 de M5 :
les deux proposent $0$ **et** $0{,}9$ ; choisir $0$ révèle M4, choisir $0{,}9$
révèle M5. Le second item ne peut donc rien révéler que le premier n'ait déjà
révélé. Deux des 1 612 items du corpus font le travail d'un seul.

**Ce que ça ne coûte PAS.** Les deux misconceptions sont à 7 et 6 items
respectivement — très au-dessus du plancher de 3. Réécrire l'un des deux
énoncés ne met aucune évaluation en danger.

**Ce que ça coûte.** Chaque section M<n> de cette notion tient exactement
3 items — son propre plancher. **Supprimer** l'un des deux clones ferait passer
sa section à 2. L'arbitrage est donc : réécrire, pas supprimer.

### Piste (à valider, non appliquée)

Le fichier porte déjà sa propre discipline de variantes, annoncée en
commentaire : M4 décline « deux pièces, contexte concret » puis « probabilités
différentes, contexte production » ; M5 décline « probabilités différentes,
contexte tirage » puis « vérification d'indépendance à rebours ». Seuls les
deux *ouvreurs* sont abstraits, et c'est là qu'ils se sont rejoints.

Donner à l'un des deux ouvreurs des valeurs et un cadre distincts — en
gardant sa misconception cible, sa clé et le distracteur qui la révèle —
rétablirait la même discipline à l'entrée de chaque section. **Le `spec.md`
étant la source, c'est lui qu'il faut amender d'abord**, sinon la prochaine
régénération ramènera le doublon.

---

## Constat 2 — `pc/suivi-temporel-vitesse` ⟂ `pc/transformations-lentes-rapides` : la définition de $t_{1/2}$

`STV-6` et `TLR-19` posent le même énoncé :

> « Comment définit-on le temps de demi-réaction $t_{1/2}$ ? »

Ce sont **deux notions voisines** du même chapitre de chimie cinétique, et la
définition de $t_{1/2}$ est un prérequis partagé. Deux lectures se défendent :

- **Délibéré** — l'élève qui n'aborde qu'une des deux notions doit trouver la
  définition là où il est ; la redondance est le prix de l'indépendance des
  notions. C'est l'argument fort, et le constat 1 ne s'applique pas ici :
  aucun élève ne voit les deux dans la *même* leçon.
- **À resserrer** — l'élève qui suit le programme dans l'ordre les voit à
  quelques jours d'intervalle, mot pour mot.

À noter : `pc/suivi-temporel-vitesse` clone par ailleurs `STV-6` dans son
point d'arrêt `cp-r4-demi-reaction`, **déclaré correctement** — donc la
question n'apparaît qu'une fois dans cette leçon-là. Le doublon est bien
entre notions, pas à l'intérieur d'une.

**Aucune action n'est proposée** : c'est un choix de cadrage, pas un défaut.
Le cliquet le tient à 1 pour qu'un troisième ne s'ajoute pas sans décision.

---

## Ce que ce document ne dit pas

- **Rien sur les énoncés qui posent la même question avec des mots
  différents.** La porte compare des énoncés normalisés, pas des intentions.
  Deux items peuvent être jumeaux sans qu'elle les voie — et c'est assumé :
  `clone_of_X` signifie « dérivé de X », pas « recopié de X », et 111 des
  132 clones sont légitimement reformulés.
- **Rien sur la qualité des deux questions en cause.** Elles sont bonnes ;
  le défaut est qu'il y en a deux.
