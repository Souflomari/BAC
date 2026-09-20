# Décisions en attente — ce qui demande le propriétaire

**Dernière mise à jour : 2026-09-20.** Cette page existe parce qu'il n'y avait
nulle part où voir, d'un coup d'œil, ce qui attend un arbitrage. Les constats
vivent dans `docs/audits/` et le récit dans `docs/HANDOFF.md` §11 ; ceci est
seulement la liste, et ce que coûte chaque attente.

> **Rien ici n'est en train de se dégrader.** Chaque ligne porte un cliquet ou
> une porte qui empêche l'état d'empirer. Ce qui attend, c'est la décision de
> l'améliorer — et, pour la plupart, la décision de savoir si c'en est une.

---

## 0. Hors produit, mais bloquant : la CI n'a pas de runner

Depuis le 19 au soir, chaque exécution de `gates.yml` échoue en 3–5 secondes
sans qu'aucun runner soit assigné (`runner_id 0`, aucun journal, HTTP 404 sur
les logs). Rien dans le dépôt ne l'explique ; le YAML n'a pas changé. La cause
probable est un quota de minutes ou une limite de dépense sur le compte —
c'est-à-dire **un réglage de facturation, hors de portée d'un agent**.

Conséquence mesurée : une porte de CI (`accents-manquants`) est restée rouge
vingt-quatre heures sans que personne puisse le savoir (§11.126). La batterie a
donc été rejouée **en entier, en local, sur HEAD** — 277 contrôles `dom-truth`,
257 SVG dans les deux thèmes, 101 pages de formules, 104 pages d'accents :
tout vert après correctif. Mais « vert en local » n'est pas « la CI est verte »,
et ce document ne prétendra jamais l'inverse.

**Décision attendue :** débloquer le compte. Rien d'autre ne débloque.

---

## 1. Les onze notions SVT sont bâties à un autre standard

**→ `rampe-entree-2026-09-20.md`, `anatomie-notion-2026-09-20.md` · §11.119**

Quatre mesures indépendantes isolent le même sous-ensemble :

| | SVT | maths / pc / philo |
|---|---|---|
| items par notion | **9,3** | 27,6 – 32,4 |
| barreaux par notion | **5,2** | 7,6 – 8,6 |
| items de niveau 1 | **0 sur 102** | 8,5 – 9,0 % |
| sommet de bac sourcé | **0 / 11** | 47 / 51 |
| source d'exercices | **0 / 11** | 49 / 51 |
| figures **manipulables** | **0 / 11** | 9 / 51 |

La dernière ligne est la plus tranchante, parce que la VISION nomme SVT en
propre : « la pensée SVT est visuelle, donc elle a besoin de vraies interactions
de construction de schéma (dessiner, étiqueter), **PAS d'images affichées** ».
SVT a 49 SVG statiques et 37 étagées — exactement des images affichées. Et sa
même ligne dit que l'épreuve SVT est « un argument travaillé montré en entier,
**puis estompé** » : on ne peut pas estomper vers rien, et SVT n'a aucun
`exercises.yaml`.

Deux de ces axes ne dépendent d'aucune étiquette d'auteur. Le zéro sur cent
deux ne s'explique pas par une convention d'échelle : les trois autres matières
tombent *indépendamment* entre 8,5 % et 9,0 %.

**Ce n'est pas onze défauts** — c'est un standard de fabrication qui n'a pas été
appliqué à une matière, et la VISION promet en propre l'élève *en difficulté*,
c'est-à-dire précisément la marche d'entrée qui manque.

**Options :** reprendre les onze au standard des 51 autres (gros) · décider que
le bac SVT demande moins de progression graduée et l'écrire (gratuit, mais il
faut le vérifier contre le Cadre) · laisser tel quel en le sachant.
**Déjà armé :** deux cliquets à une seule direction — ça ne peut pas empirer.

---

## 2. Un `spec.md` prescrit le même énoncé à deux misconceptions

**→ `enonces-jumeaux-2026-09-20.md` · §11.118**

`maths/probabilites-conditionnelles` pose deux fois la même question, au
caractère près, dans la même leçon (`PC-M4-1` et `PC-M5-1`). Ce n'est pas une
étourderie : `spec.md` lignes 116 et 127 prescrivent le même « distinguishing
stem » à M4 et à M5. Un seul des deux items suffit d'ailleurs à distinguer les
deux erreurs — les deux offrent `0` **et** `0,9`.

**Ce que ça ne coûte pas :** les deux misconceptions sont à 7 et 6 items,
plancher 3. **Ce que ça coûte :** chaque section tient exactement 3 items, donc
supprimer n'est pas une option — il faut **réécrire un énoncé, et amender le
spec d'abord**, sinon la prochaine régénération ramène le doublon.

---

## 3. Le mélange cognitif est incalculable sur 97,8 % des items

**→ `anatomie-notion-2026-09-20.md` · §11.120**

La chaîne existe entièrement, par écrit : le Cadre porte les ratios d'habiletés
par sous-domaine (sourcés p.19), `pedagogy-architect` a pour consigne de les
citer « *pour donner au critique de fidélité bac une cible numérique* »,
`item-author` écrit selon ce mélange, `bac-fidelity-critic` vérifie.

Le champ qui porte cette information — `habilete` — est renseigné sur **36
items, tous dans `pc/rlc-serie`**. Les 61 autres notions : zéro.

Le mélange cognitif du produit n'est pas mauvais : il est **incalculable**.

**Trois décisions, et la troisième est le statu quo :** étiqueter les 1 576
items restants · retirer la consigne et écrire que le mélange se juge à la
lecture · laisser tel quel. **La troisième est le choix actuel, mais il n'a
jamais été pris — il a été subi.** C'est la seule des trois qui ne devrait pas
survivre à ce document.

---

## 4. Seize items orphelins de chapitre

**→ §11.69 ·** rattachement éditorial. Les deux correctifs d'instrument sont
faits ; ce qui reste est de décider à quel chapitre chacun appartient.

---

## 5. Cent onze distracteurs sans tag

**→ `distracteurs-sans-tag-2026-09-20.md` · §11.102**

Quelles familles de misconceptions manquent à l'inventaire. Un distracteur sans
tag est une erreur d'élève que le produit voit passer sans la nommer.

---

## 6. Deux variations fraîches sans note de conception

**→ §11.124 ·** `philo/la-verite` et `philo/le-devoir` affirment
« anti-mémorisation » sans dire ce qui a été varié. Les 47 autres portent une
note substantielle. **Deux notes à écrire, pas deux exercices** — les exercices
existent. Cliquet armé à 2.

---

## 7. `couverture-diagnostique` reste ROUGE, délibérément

Trois réductions honnêtes, documentées : `pc/aspects-energetiques` 22→21,
`pc/atome-mecanique-newton` 19→18, `svt/soi-non-soi` 7→6. Dans chaque cas un
distracteur mal étiqueté a été rendu à sa vraie famille — le corpus est plus
juste, et le compte baisse.

**Décision attendue :** soit combler (écrire les items manquants), soit
abaisser le cliquet en écrivant que ces trois-là sont des corrections et non
des pertes. **Tant que ni l'un ni l'autre, la batterie locale annonce un rouge
permanent** — et un rouge permanent est un rouge qu'on apprend à ignorer.

---

## 8. Le jeu W (la colonne de droite à 1920 px) n'a jamais été choisi — et le vide s'est élargi de 115 px

En juillet, le carnet du jour 8 recommandait **W3 maintenant (rail de formules
clés), W1 en second profond**. Aucun des deux n'a été pris. La ligne APRÈS,
mesurée le 2026-09-20 (`fable-day3-ledger` §9 bis, §11.130), montre que
l'attente a un coût chiffrable : à droite de la prose, **528 px en juillet,
643 px aujourd'hui**. La colonne entière a glissé à gauche et s'est élargie —
ce qui est bon — mais rien n'a été posé à droite, donc le vide a suivi le
glissement.

**Ce que ça coûte vraiment, mesuré et non estimé.** Juillet annonçait W3
« cheap to make real (one authored formula per rung) ». `KeyFormulaRail.tsx`
existe et fonctionne ; la seule donnée qui l'alimente est une constante
`KEY_FORMULAS` écrite à la main dans `web/src/app/options/wide/[v]/page.tsx`,
pour une notion. Aucun champ `key_formulas` nulle part dans `content/`. **Le
composant est bâti, le canal d'auteur ne l'est pas** : c'est un champ template
v2 plus 62 notions de contenu — la même forme de travail que W1, pas une plus
petite.

**Décision attendue :** W3, W1, les deux en couches, ou aucun (et alors dire
que 643 px à droite est la composition voulue, ce qui est une réponse
légitime — le §4 du carnet a une clause « équilibré » que le 404 satisfait
déjà). Les deux cercles voisins du propriétaire, eux, sont fermés : l'accueil
(691 → 1760 px de plan utile) et la bande (choix M1, flancs symétriques).

---

## 9. 1 629 explications écrites et sans emploi

Le corpus porte `correct_feedback` sur 1 678 items des 62 notions —
l'explication de la bonne réponse. Aucun composant ne le lisait (§11.133).
Le repli posé aujourd'hui l'affiche **là où la carte était muette** : les 49
items de `philo/analyse-de-texte`, qui n'avaient ni `solution`, ni feedback sur
le choix correct. Les **1 629 autres** portent une `solution`, qui gagne — leur
`correct_feedback` reste donc inaffiché.

**Décision attendue :** montrer les deux (la solution complète ET la phrase
courte qui dit pourquoi), n'en garder qu'un, ou laisser ainsi. C'est une
question de dessin pédagogique — un agent ne doit pas trancher ce qu'un élève
lit après avoir répondu juste. Le code est prêt dans les trois cas ; ce qui
manque est l'arbitrage.

---

## Ce que cette page n'est pas

Ce n'est pas la liste des défauts du produit : ceux qui étaient objectifs ont
été corrigés le jour même et ne figurent pas ici. Ce n'est pas non plus un
ordre de travail — l'ordre appartient au propriétaire. C'est l'inventaire des
questions qu'un agent **ne doit pas** trancher seul.
