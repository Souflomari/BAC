# Décisions en attente — ce qui demande le propriétaire

**Dernière mise à jour : 2026-09-24** (§16 et §17 levées par leur prémisse ; §18, §19 et §20 neuves — §20 tranchée par défaut, réversible). Cette page existe parce qu'il n'y avait
nulle part où voir, d'un coup d'œil, ce qui attend un arbitrage. Les constats
vivent dans `docs/audits/` et le récit dans `docs/HANDOFF.md` §11 ; ceci est
seulement la liste, et ce que coûte chaque attente.

> **Rien ici n'est en train de se dégrader.** Chaque ligne porte un cliquet ou
> une porte qui empêche l'état d'empirer. Ce qui attend, c'est la décision de
> l'améliorer — et, pour la plupart, la décision de savoir si c'en est une.

---

## 0. ~~Hors produit, mais bloquant : la CI n'a pas de runner~~ — LEVÉ le 2026-09-23

**Levé par le propriétaire :** le dépôt est passé public, et le premier run
(744) a repris la porte entière sur un vrai runner — 36 étapes vertes avant
d'être coupé par un budget de 50 min devenu trop court (§11.188, porté à 80).
Ce qui suit est l'état d'avant, gardé pour l'histoire.


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

## 7. ~~`couverture-diagnostique` reste ROUGE, délibérément~~ — COMBLÉ le 2026-09-23

**Pris par la première voie, celle qui ne retire rien :** quatre items écrits
(AE-35, AE-36, AMN-31, SNS-13, §11.189), chacun avec des distracteurs de
familles distinctes dont le nombre ou le raisonnement est exactement celui de
l'erreur nommée. Les trois notions reviennent à 22, 19 et 7 misconceptions
évaluables ; le cliquet n'a pas été touché. La seconde voie — juger qu'une
étourderie d'exécution (`confusion-v-et-v-carre`) n'est pas un modèle physique
et la retirer du registre — reste une question ouverte du propriétaire, mais
elle ne tient plus la batterie en rouge. Ce qui suit est l'état d'avant.


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

## 10. Six manipulables dus à l'élève

`.claude/CLAUDE.md`, décision ouverte n°4, pose une ligne dure : un asset
généré ne remplace pas un manipulable là où la pédagogie exige la
manipulation. Six fois, une figure figée a pris la place d'un
`[[embed:slug]]` prescrit — et **les six fois, la substitution a été écrite**,
en tête du SVG, en nommant ce qui est perdu : « curseurs m,k → ici, DEUX
masses fixes » ; « curseur Δt → ici, DEUX tailles de pas fixes » ; « au lieu
d'un curseur de rayon continu, TROIS rayons fixes ». Rien n'a été maquillé.
Ce qui manquait était un endroit où les compter — c'est maintenant
`docs/audits/dette-manipulable-2026-09-20.md`, et une porte tient le nombre.

**Décision attendue :** les rendre, ou les accepter comme définitifs.

- *Les rendre* : six embeds à câbler, plus le cadrage que chaque descripteur
  existant montre — `boundary`, `boundary_guard_details`,
  `param_manipulation_guide`, `pedagogy_wiring`, attribution CC-BY. Les quatre
  descripteurs déjà en place donnent la mesure exacte du coût : ils sont longs,
  et c'est ce qui les rend sûrs.
- *Les accepter* : réponse également légitime — les figures sont bonnes,
  chacune sert l'item nommé, la dégradation est écrite. Mais il faut alors le
  dire dans les specs, qui continuent de prescrire un embed ; sinon la
  prescription reste une promesse ouverte.

---

## 11. La politique de sécurité du contenu (CSP) n'est pas posée

Mesuré le 2026-09-20 sur l'artefact déployé : sur cinq en-têtes de sécurité
attendus, **zéro** était servi. Vercel pose `strict-transport-security` de
lui-même ; tout le reste manquait, parce que rien n'était configuré.

**Quatre sont posés depuis (§11.138)** — `X-Content-Type-Options`,
`X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy` — vérifiés sur la
réponse servie, avec une porte dans `dom-truth`. Ils ne changent rien à ce que
la page rend.

**Le cinquième, `Content-Security-Policy`, ne l'est pas, et c'est délibéré.**
Une CSP juste demande de connaître chaque origine de script, de style et de
cadre du produit : les scripts en ligne de Next, KaTeX, les iframes PhET,
Supabase. Posée à l'aveugle, elle casse la page **en silence chez l'élève**, et
aucun contrôle local ne le verrait — il n'y a pas de CSP à vérifier tant qu'on
ne l'a pas écrite.

**Décision attendue :** la poser (et alors la construire en mode
`Content-Security-Policy-Report-Only` d'abord, pour lire ce qu'elle casserait
avant de l'imposer), ou écrire qu'on s'en passe. Sans arbitrage, le produit
reste sans la seule protection qui limite les dégâts d'un script injecté.


---

## 12. SVT : cinquième axe, même sous-ensemble

Une cinquième mesure indépendante isole exactement les 11 mêmes notions
(§11.141) : **12 barreaux portent un chapitre et aucun item** — 11 notions sur
11 en SVT, contre 0/14 en maths, 0/25 en PC, 1/12 en philo. Et le barreau
manquant est presque toujours le DERNIER (R6–R9) : le sommet, celui où l'élève
devrait affronter l'épreuve. **L'élève SVT lit le dernier chapitre de chaque
notion et n'a rien à y tenter.**

Les cinq axes, qui ne partagent ni motif, ni fichier, ni définition :

| Axe | SVT | Reste du corpus |
|---|---|---|
| Sommet de rampe sourcé (§11.114) | 0 / 11 | 47 / 51 |
| Marche d'entrée, items de niveau 1 (§11.119) | 0 / 102 items | 8,5 – 9,0 % |
| Leçons sans point d'arrêt | 11 des 13 | 2 |
| Figure manipulable (§11.129) | 0 / 11 | 9 / 51 |
| Barreau sans item (§11.141) | 11 / 11 notions | 1 / 51 |

**Décision attendue :** ce n'est pas un défaut par notion à corriger une par
une — c'est un **standard de fabrication différent**, et seul le propriétaire
peut dire si les 11 notions SVT doivent être portées au standard des 51 autres,
ou si SVT est délibérément un genre à part. Les instruments sont armés dans les
deux cas : cliquets posés au niveau mesuré, qui ne peuvent que descendre.

---

## 13. Les figures sont le seul texte du produit dans une police inconnue

**Le fait.** 242 des 257 figures déclarent
`font-family="'IBM Plex Sans', system-ui, sans-serif"`. **IBM Plex Sans n'est
chargée nulle part** : ni par l'application (le layout charge Source Serif 4,
Geist Sans et Geist Mono), ni dans l'image de ce conteneur. Le texte des figures
retombe donc sur `system-ui` — **la police du téléphone de l'élève**. C'est le
seul texte du produit qui ne soit pas dans une police que le site contrôle : la
prose, l'interface et les formules sont servies, les étiquettes de figure sont
tirées au sort.

La DESIGN-BIBLE §3 demande pourtant IBM Plex Sans nommément, et le commentaire
au-dessus des imports de `layout.tsx` dit la raison : « unambiguous 1/l/I/0 for
a maths product ». Sur un produit où une étiquette peut dire `l` ou `1`, ce
n'est pas un détail de goût.

**Ce que ça coûte aujourd'hui.** §11.152 l'a montré par l'exemple : Firefox
dessine `V (mL)` 17 % plus large que Chromium, et l'étiquette sortait du cadre
sur quatre figures. Corrigé — mais la cause reste : chaque appareil a sa propre
police, donc ses propres largeurs.

**Les trois options, MESURÉES sur les 4 108 textes du corpus** (Chromium, même
sonde, même tolérance) :

| | figures hors cadre | étiquettes sous 15 % de marge | largeur totale du texte |
|---|---|---|---|
| **aujourd'hui** (repli système) | 0 | **30** | 374 083 u |
| **Geist** (la police du site) | 0 | **6** | −15,3 % |
| **IBM Plex Sans** (la bible) | 0 | **4** | −16,0 % |

Les deux alternatives sont **meilleures que l'état actuel sur les deux
colonnes**, et elles rendent les largeurs DÉTERMINISTES — les mêmes sur tous les
appareils. Le corpus a visiblement été composé contre des métriques plus
étroites que le repli qu'il obtient.

**Ce que chacune demande :**

- **Geist** — une règle CSS, zéro octet de plus (la police est déjà servie) :
  `.figure svg text { font-family: var(--font-ui), system-ui, sans-serif }`.
  Une règle CSS l'emporte sur l'attribut de présentation des SVG, donc les 242
  fichiers n'ont pas à être touchés. Coût : les figures changent de caractère,
  et le produit s'écarte de la bible.
- **IBM Plex Sans** — la même règle, plus la police servie : **22,6 ko** pour le
  sous-ensemble latin 400 (`@fontsource/ibm-plex-sans`), à comparer aux 240 ko
  de polices déjà servis par page (§11.35). Coût : un fichier de plus sur le
  chemin critique ; gain : la bible est respectée, et c'est la meilleure des
  trois sur la marge.
- **Ne rien faire** — les 30 étiquettes serrées restent à la merci de la police
  de chaque appareil. Le cliquet `marge-etiquettes` empêche au moins que le
  nombre augmente.

**Pourquoi ce n'est pas à un agent de trancher.** Changer le caractère de 242
figures est une décision d'identité visuelle, et ajouter une police est une
décision de poids sur un produit destiné à des forfaits mobiles serrés. Les
trois chiffres sont mesurés ; le choix ne l'est pas.

---

## 14. Le produit exige Safari 16.4 à cause d'une dépendance qui ne sert à rien ici

**Le fait.** Le paquet livré contient un **regex lookbehind**. WebKit ne le
connaît qu'à partir de **Safari 16.4 (mars 2023)**. Avant, ce n'est pas une
dégradation : le morceau est refusé **à l'analyse**, et la page reste blanche.
Sur Android le moteur se met à jour tout seul ; sur iPhone il est soudé au
système — un 6s, un 7, un SE de première génération sont bloqués en iOS 15.
C'est le téléphone d'occasion d'un lycéen.

**Une des deux sources est corrigée** : `frenchTypography.ts` construisait
`(?<=\p{L})'(?=\p{L})` pour l'apostrophe française ; la lettre de gauche est
désormais capturée et réécrite, comportement identique (§11.163).

**L'autre est une dépendance** : `mdast-util-gfm-autolink-literal`, tirée par
`remark-gfm`. Elle transforme une URL ou une adresse e-mail NUE en lien.

**Ce que le corpus en fait, mesuré :**

| | |
|---|---|
| URL nues dans le contenu | **0** |
| adresses e-mail nues | **0** |
| tableaux GFM | **113** |
| barré `~~x~~` | 1 |
| notes de bas de page, listes de tâches | 0 |

**L'extension fautive ne sert donc à rien ici — et c'est elle qui fixe le
plancher.** Mais `remark-gfm` ne se retire pas : 113 tableaux en dépendent.

**Les options, et ce qu'elles coûtent :**

- **Recomposer le greffon** — remplacer `remark-gfm` par les seules extensions
  utilisées (tableau + barré, via `micromark-extension-gfm-table` /
  `mdast-util-gfm-table` et leurs équivalents « strikethrough »). Gain : le
  plancher retombe à **Safari 13.1 (2020)**. Coût : quatre dépendances
  explicites à la place d'une, et un pipeline markdown à re-vérifier sur les
  113 tableaux et les 62 leçons. **C'est une décision d'architecture, pas un
  correctif** : elle n'a pas été prise ici.
- **Ne rien faire** — le produit reste inaccessible aux iPhone d'avant
  iOS 16.4. La part d'élèves concernés n'est pas mesurable depuis ce dépôt.
- **Transpiler plus bas** — inutile : aucun compilateur ne sait réécrire un
  lookbehind, la sémantique n'a pas d'équivalent local.

**Pourquoi ce n'est pas à un agent de trancher.** Le gain est réel mais
l'exécution touche le rendu de tout le contenu ; et l'ampleur du bénéfice
dépend d'une donnée que le dépôt n'a pas — la part d'iPhone anciens chez les
élèves visés.

### Re-mesuré le 2026-09-21 : le lookbehind est toujours là, et la PORTÉE est plus large que « la leçon »

Un diagnostic non rejoué est une rumeur (ADR 0036) : refait sur le paquet
construit à HEAD, pas sur la mémoire de la passe précédente.

**Il reste exactement un lookbehind dans tout le JavaScript servi** — la
correction de `frenchTypography.ts` (§11.163) a bien retiré l'autre :

```
$ grep -rlE '\(\?<[=!]' .next/static --include='*.js'
.next/static/chunks/504-df951b40e87dd68b.js     (1 occurrence, 152 ko)

/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu
```

C'est l'autolien **e-mail** de `mdast-util-gfm-autolink-literal`. Le corpus en
compte toujours 0. Rien n'a changé : §14 tient.

**Ce qui est neuf, c'est la portée — et elle a failli être mal écrite.** Le
manifeste de build dit que **2 routes sur 14** chargent le morceau 504
(`/notions/[subject]/[slug]`, `/options/wide/[v]`), et **pas** `/examens/[id]`.
Lu seul, il conclut « les épreuves sont épargnées ». **C'est faux.** Le
morceau de la route épreuve contient `r.e(504)` : un import *dynamique*, que le
manifeste ne liste pas. Vérifié dans le navigateur, sur le build servi :

| page | morceau 504 demandé au chargement | après « Commencer » |
|---|---|---|
| `/notions/maths/suites-numeriques` | **oui** (morceau initial) | — |
| `/examens/sexp-2018-normale` | **oui** (préchargé) | oui |

L'épreuve le demande **dès le chargement**, pas au clic : `EpreuveShell.tsx`
(287–291) précharge `chargerMd()` dans un `useEffect` de montage — c'est
l'optimisation de §11.60, qui rend le clic instantané. Conséquence pour §14 :
le plancher Safari 16.4 couvre **toute la surface d'apprentissage**, leçons
*et* épreuves. L'estimation du bénéfice doit se faire sur les deux.

**La leçon de méthode, réutilisable :** *un manifeste de build n'est pas le
graphe de modules.* Il liste les morceaux initiaux d'une route ; un `import()`
paresseux y est invisible. Pour savoir ce qu'une page charge vraiment, il faut
soit chercher `\.e\(<id>\)` dans les autres morceaux, soit — mieux — le
demander au navigateur sur le build servi. Ici les deux sources se
contredisaient, et c'est le navigateur qui avait raison.

**Ce qui ne change pas :** la décision reste au propriétaire. Recomposer le
greffon touche le rendu de tout le contenu, et la part d'iPhone d'avant
iOS 16.4 chez les élèves visés n'est toujours pas mesurable depuis le dépôt.

---

## 15. Le plancher de 48 px que le dépôt s'est donné n'est pas tenu par 86 cibles sur 622

**Le fait.** `COMPONENT-STATES.md` §24 l'écrit sans réserve : « **Floor:** ≥48px
touch target height on **all** interactive elements », répété en §365–366 (« All
buttons and links; use `min-h-[48px]` ») et scellé dans `TOKENS.md`
(`--touch-target: 48px`). Mesuré pour la première fois le 2026-09-21, à 360 px,
sur les routes de `dom-truth` : **86 cibles sur 622 (13,8 %) sont en dessous**,
dont **8 dans l'en-tête**.

Toutes échouent sur la HAUTEUR seule — elles sont larges :

```
en-tête   80×33   « BAC » (le retour à l'accueil, sur TOUTES les pages)
en-tête  131×25   « Mathématiques »        en-tête  47×29   « Accueil »
contenu  286×33   « Suites numériques » et les autres titres de leçon
contenu  200×26   « Ouvrir dans un nouvel onglet »
```

**Ce que la porte armée dit, et ce qu'elle ne dit pas.** `dom-truth` vérifie
**24 px** — le critère AA de WCAG 2.2 (SC 2.5.8), et il tient : 622 sur 622. Ce
n'est pas une porte aveugle, c'est une porte exacte sur une question **plus
étroite que le plancher du dépôt** (ADR 0033). Son « ✓ toutes ≥ 24px » se lisait
volontiers comme « la règle de la maison tient ». Depuis le 2026-09-21 elle
imprime l'écart à voix haute, sans rougir.

**Les deux lectures, et leur coût :**

- **Le produit a tort** — remonter les 86 cibles à 48 px. C'est la lecture
  littérale de la règle. Coût : un titre de leçon passe de 33 à 48 px, donc
  **une liste de 14 notions gagne ~210 px** ; et dans un en-tête haut de 56 px,
  le mot-symbole `BAC` verrait son `state-layer` (le fond de survol) passer de
  33 à 48 px. Ce sont des pages que le propriétaire a réglées à la main.
- **La règle a tort** — la réécrire pour dire ce qui était voulu : 48 px pour
  les BOUTONS et les commandes autonomes, 24 px (WCAG 2.2 AA) pour les liens
  d'une liste ou d'une phrase, qui est exactement l'exception que la norme
  prévoit. Coût : le plancher écrit faiblit, et ça doit être un choix assumé,
  pas une retouche discrète.

**Pourquoi ce n'est pas à un agent de trancher.** Les deux options sont
défendables et l'une d'elles change le rythme visuel de toutes les listes du
produit. Le chiffre est mesuré et rejouable (`npm run dom-truth`, ligne
« MESURE ») ; le choix ne se mesure pas.

---

## 16. ~~La porte qui garde la largeur d'un téléphone n'est pas armée en CI~~ — ARMÉE le 2026-09-24

> **LEVÉE PAR SON PRÉMISSE, pas par un arbitrage** (§11.193). La seule objection
> écrite ci-dessous est le COÛT : un job unique de 50 min, où trois largeurs
> mangeaient la marge. Les deux faits ont changé : le dépôt est public (les
> minutes ne coûtent rien au propriétaire, §0) et les portes lourdes tournent
> désormais dans des jobs PARALLÈLES (§11.192), où une porte de plus n'allonge
> pas le mur. `etroit-sweep` est armée dans son propre job, `telephone`, à ses
> TROIS largeurs, avec un essai rouge neuf. Mesurée avant d'être armée : 0
> débord sur 108 × 3, 6 min 02 s ; l'essai rouge rend 4 débords sur 4. Si le
> dépôt redevient privé, la question du coût redevient celle du propriétaire.


**LE FAIT.** `etroit-sweep` mesure le corpus entier — 108 pages × 320/360/390 px,
chapitres dépliés, les 39 épreuves ouvertes en deux clics — sur un fait binaire
du document : `scrollWidth > innerWidth`. Sa référence inscrite est **0 débord**.
Elle n'apparaît **nulle part dans `.github/workflows/gates.yml`** : elle ne
tourne que si quelqu'un la lance à la main.

**POURQUOI ÇA COMPTE MAINTENANT.** Le 2026-09-22 elle a rattrapé une régression
que j'avais introduite et « prouvée » sûre par quatre mesures convergentes
(§11.181) : retirer `.prose-lesson p { overflow-x: auto }` faisait passer le
corpus de **0 à 185 débords** à la largeur d'un téléphone. Aucune autre porte ne
l'a vue — ni `dom-truth` (qui mesure le débord à 1 536 et 1 920 px), ni
`zoom-sweep` (texte doublé), ni le build. La condition qu'elle garde est la
condition PAR DÉFAUT du public visé : un élève marocain qui lit sur un
téléphone, à taille de texte normale.

**LE COÛT, mesuré.** Le budget du workflow est de **50 min** ; les runs verts
relevés tiennent en ~38 min, et les notes du fichier disent explicitement que
relever le budget « masquerait de nouveau un blocage ». Trois largeurs
coûteraient l'essentiel de la marge restante. Une seule largeur — **320 px**,
où la régression se voyait aussi (les trois largeurs la montraient) — en
coûterait environ le tiers, dans l'ordre de grandeur de `zoom-sweep` à 320 px
(207 s relevés).

**LES DEUX LECTURES.**

- *Armer à 320 px seulement.* La classe de défaut est attrapée, le budget tient.
  On perd la détection d'un défaut qui n'apparaîtrait qu'à 360 ou 390 px — cas
  qui n'a jamais été observé, les trois largeurs ayant toujours bougé ensemble.
- *Laisser locale.* Le budget reste intact et la porte garde ses trois largeurs
  pour l'audit à la main. On accepte qu'une régression de cette classe ne soit
  vue que si quelqu'un pense à la lancer — ce qui, ce jour-là, a tenu à un
  balayage d'instruments locaux fait par curiosité, pas par procédure.

**CE QUI N'EST PAS EN QUESTION :** la porte elle-même. Elle est juste, sa
référence est inscrite, et elle a fait exactement son travail. La question est
de savoir si le propriétaire veut payer ~3 min de CI pour qu'elle le fasse sans
qu'on y pense.

---

## 17. ~~Le verdict des QCM : six leçons en CI, ou les soixante-deux ?~~ — LES SOIXANTE-DEUX, ARMÉES le 2026-09-24

> **LEVÉE PAR SON PRÉMISSE, comme §16** (§11.193). La seule objection écrite
> ci-dessous est le BUDGET : un job unique de 50 min, où ~13 min de plus
> passaient au-dessus. Les deux faits ont changé : le dépôt est public (les
> minutes ne coûtent rien au propriétaire, §0) et les portes lourdes tournent
> dans des jobs PARALLÈLES (§11.192), où une porte de plus n'allonge pas le mur.
> `verdict-qcm` tourne sur le corpus entier dans son propre job, `qcm` ; son
> essai rouge reste sur les six leçons historiques, sur le même build. Mesuré
> avant d'être armé : vert sur les 62 leçons — **1 497 réponses d'item + 364 de
> point d'arrêt**, 1 629 items dont 132 hors banque de fin, 132/132 surfacés en
> point d'arrêt — en **15 min 04 s** ; essai rouge sur les six leçons : **177
> contradictions sur 177 réponses**, 1 min 31 s. Si le dépôt redevient privé, la
> question du coût redevient celle du propriétaire.


**LE FAIT.** `verdict-qcm` (§11.184) vérifie ce que personne ne vérifiait : après
une réponse, le produit dit-il « juste » à une bonne réponse et « faux » à un
distracteur ? Sur le corpus entier — **62 leçons, 1 481 réponses** — il est VERT,
et toutes les cartes montrent leur explication.

**LE COÛT, mesuré.** Six leçons (une par famille de contenu) : **73 s**. Les
62 leçons : **~13 min**. Le budget du workflow est de **50 min** ; les runs verts
relevés tiennent en ~38 min, et le fichier dit que le relever « masquerait de
nouveau un blocage ».

**CE QUI EST ARMÉ AUJOURD'HUI :** les six leçons, deux passages (vert puis essai
rouge), ~2,5 min — bien dans la marge. C'est un choix d'ingénierie assumé, pas
une mesure : un défaut de cette classe serait SYSTÉMIQUE (le mélange, le
composant de verdict, le repli d'explication), et six leçons couvrant les quatre
matières l'attrapent.

**CE QUI RESTE AU PROPRIÉTAIRE.** Faut-il payer ~13 min de CI pour le corpus
entier ? Les deux lectures :

- *Six suffisent.* Le défaut redouté est structurel, pas par-item ; le corpus
  entier se relance à la main avant une mise en production, et il est VERT
  aujourd'hui. On garde 11 min de marge.
- *Tout le corpus.* Un item peut être cassé SEUL — une donnée mal formée, un
  `choices` vide, un `correct` absent qu'aucune porte de contenu n'attrape. Six
  leçons ne le verraient pas. Le budget passerait de ~40 à ~53 min, donc
  au-dessus des 50 : il faudrait relever la limite, ce que le fichier
  déconseille explicitement, ou découper le job.

**CHIFFRE UTILE POUR TRANCHER :** 131 items sur 1 612 ne sont pas dans la banque
de fin — non parce qu'ils manquent, mais parce qu'un point d'arrêt les surface
EN LIGNE (`item_source: clone_of_<id>`). La porte le vérifie désormais dans les
deux sens, 131/131. Ni six ni soixante-deux leçons ne les répondent en tant
qu'items de banque, et c'est normal ; ce n'est donc pas un argument dans cet
arbitrage.


---

## 18. Le volume de révolution : quatre questions de périmètre, et une de filière

**LE FAIT.** Le barreau R9 de `maths/calcul-integral` (le volume d'un solide de
révolution, §11.193) comble le plus gros trou de couverture de la notion — un
savoir-faire des DEUX filières, jusque-là absent. Son architecte a tranché ce
qu'il pouvait tirer du cadre et d'un sujet vérifié (2023, rattrapage, SM), et
laissé le reste au propriétaire (`content/maths/calcul-integral/spec-extension.md`
§10). Rien de livré ne préjuge de ces réponses :

- **Rotation autour de (Oy) ?** Hors barreau. Aucun cadre ne nomme d'axe ; le
  seul sujet vérifié dit « autour de l'axe des abscisses » ; le cas (Oy) demande
  une fonction réciproque (SM seulement) ou la méthode des tubes (hors
  programme). Si les manuels l'énoncent : un paragraphe et trois items.
- **Volume entre deux courbes (π∫(f² − g²)) ?** Hors barreau : dans les deux
  cadres, « entre courbes » qualifie l'AIRE. À confirmer contre les manuels.
- **La notion est-elle SExp, SM, ou les deux ?** (REVIEW S1.2/S1.3.) C'est ce
  qui décide si la question nationale 2023 — SM, DOUBLE intégration par parties
  — entre telle quelle au sommet. Aujourd'hui le sommet porte une variation à
  une seule IPP (`r-volume`, sourcée « not-applicable »).
- **L'aparté « sommes de Riemann » pour SM ?** Différé exprès : les tranches de
  la scène en seraient l'application naturelle, mais ajouter un élément SM-seul
  à une notion dont la filière est en arbitrage aggraverait le défaut signalé.
- **Tout en QCM ?** La revue de fidélité le rappelle : l'examen de maths ne
  contient aucun QCM, et les treize items neufs en sont (le banc de la notion
  entier l'est déjà, REVIEW fid-S5.21-23). L'exercice `r-volume` est rédigé ;
  faut-il sortir CI-49/CI-50 du banc pour en faire des questions rédigées ?

**CE QUI N'EST PAS EN QUESTION :** les nombres (re-dérivés par deux critiques
indépendants), la frontière SExp (aucune somme, gardée par la porte de la
scène), et la décision de créer `conversion-unites-volume` à côté de
`conversion-unites-aire` plutôt que de l'élargir.

---

## 19. La première scène SVT est spécifiée — elle attend le dégel

**LE FAIT.** La SVT n'a aucune figure manipulable (0 sur 11, §1 et §12), sur la
matière dont la VISION dit « SVT thinking is visual, so it needs real
schema-construction interactions, **not displayed images** ». Une scène 3D est
prête à construire pour `svt/chaines-de-montagnes`, R1 :
`docs/pipeline/propositions/svt-chaines-de-montagnes-scene-foyers.md`
(architecte pédagogique, 2026-09-24 — rangée hors du dossier de la notion tant
qu'elle n'est pas adoptée : `dette-manipulable` lit toute spec d'un dossier de
notion comme une PRESCRIPTION, et une prescription non livrée fait rougir la
CI ; c'est juste — une proposition n'est pas encore une promesse faite à
l'élève). Les **vrais** séismes sous les Andes (catalogue USGS,
M ≥ 4,5, 2000 → 2023 : 3 074 foyers, jusqu'à 602 km) : vus du dessus, une tache ;
vus le long de la fosse, une bande inclinée — le plan de Wadati-Benioff, que le
cadre exige par son nom et que la leçon ne fait qu'affirmer. L'élève TRACE
lui-même le plan (pendage réel ≈ 22-23°, huit foyers sur dix à moins de 25 km),
lit sous quel plan se posent les 41 volcans (≈ 115-190 km), puis refait la même
mesure sur l'Himalaya (400 foyers, aucun au-delà de 89 km). Données du domaine
public, citées à l'écran ; mesures déjà faites (spec §3).

**POURQUOI ELLE N'EST PAS CONSTRUITE.** Le contenu SVT est **gelé** par décision
du propriétaire (`docs/cadre/curriculum/svt.yaml`, en-tête ; « SVT stays frozen
per the standing owner decision », `docs/pipeline/mastery-push-plan.md`). La
scène touche `lesson.md` (le marqueur, et surtout trois retouches de prose sans
lesquelles elle arrive APRÈS les paragraphes qui donnent déjà la réponse, ADR
0041 §6), `checkpoints.yaml` (`cp-r1-himalaya` change d'objet) et `items.yaml`
(une misconception neuve, `plan-de-sismicite-mal-lu`, et quatre items dont un
de niveau 1 et un au dernier barreau). Un mandat général d'avancer ne lève pas
un gel écrit ; il n'a donc pas été levé par défaut.

**CE QUI EST DEMANDÉ :** lever le gel pour cette notion — ou pour la SVT entière,
ce qui est la question du §1 — et trancher les points ouverts de la spec (§12.2 :
le format QCM de la SVT, le champ `habilete`, le seuil de 80 % de la lecture
d'ajustement, une figure figée de repli). Le reste est prêt : ordre de
construction écrit (§12.1), contrat « rien avant le pari » par étape (§7),
frontière de programme en douze interdits (§9), la porte en huit familles
(§11.4). Coût : ~25-40 Ko de données chargées au clic, une porte de ~3 min dans
le job `scenes`, quatre items à maintenir.

---

## 20. Le manège : un dixième modèle de misconception, pris par défaut — et réversible en une ligne

**LE FAIT.** La sixième scène 3D (`pc/rotation-axe-fixe`, R2, §11.195) repose
sur un trou de la leçon que la spec de l'architecte a mesuré : « Deux façons
d'avoir un moment nul » — la force sur l'axe, la force radiale. L'énoncé
marocain en compte trois : nul dès que la droite d'action **rencontre l'axe ou
lui est parallèle**. Le cas parallèle (le poids d'un enfant assis au bord d'un
manège, 245 N à 1,50 m, qui ne le fait pas tourner d'un degré) n'était écrit
nulle part, et c'est le seul que la 3D peut montrer. La spec
(`content/pc/rotation-axe-fixe/spec-scene-manege.md` §12) laissait quatre
questions au propriétaire ; le mandat permanent (« ne t'arrête pas pour mon
accord ») a été lu comme : trancher selon la recommandation de l'architecte,
l'écrire ici, et garder chaque choix réversible.

**CE QUI A ÉTÉ TRANCHÉ PAR DÉFAUT :**

1. **Le dixième modèle est OUVERT** — `moment-force-direction-vs-axe`, avec
   trois items de banc (ROT-26, ROT-27 à R2 ; ROT-28 à R6, co-étiqueté avec le
   pendule pesant). Recommandation de la spec (§8.2) : l'élève qui répond
   367,5 N·m pour le poids n'ignore pas le bras de levier, il échoue sur la
   DIRECTION — deux modèles sous une même étiquette, c'est un compteur qui ne
   dit plus lequel tourne. Plancher atteint, marge nulle (3 items).
   **Pour revenir en arrière** (voie de repli §8.5) : amender le seul
   `contradicts_principle` de `moment-force-sans-bras-de-levier`, ré-étiqueter
   les trois items et les trois choix de pari concernés, régénérer
   `coverage_summary` et les artefacts du modèle apprenant — une ligne par
   étiquette, aucune prose à réécrire.
2. **Les retouches de prose sont appliquées** (spec §4) : l'annonce avant la
   scène, « Trois façons d'avoir un moment nul » (exigée : sans elle, le chemin
   imprimé et le chemin sans WebGL perdent le cas parallèle), la parenthèse de
   R4 (« la réaction verticale du sol » décrivait un objet absent de la
   situation), deux rappels en R3 et R4. Une correction de plus, hors spec :
   « Ce deuxième fait est celui qu'on va réutiliser » désignait la réaction de
   l'axe — c'est le PREMIER cas (force appliquée sur l'axe) ; le texte dit
   maintenant « Le premier cas ».
3. **La troisième étape (deux points, un seul angle) est gardée** : la spec la
   désignait comme la seule coupable si l'on voulait quatre étapes. La
   critique pédagogique a montré que ce n'est plus un choix libre : la
   consigne de l'étape 4 cite le résultat de l'étape 3 (2,5 rad/s, 5,0 rad à
   0,30 m) — couper l'une casse l'autre.
4. **Les trois vues restent disponibles avant le pari**, comme dans les cinq
   autres scènes (équivalent clavier du glisser, WCAG 2.4.11).
5. **(ajouté le soir, après la revue des captures) L'étape 3 ouvre l'INSTANT,
   plus les sièges.** Le curseur des sièges y donnait à lire, une étape trop
   tôt, la réponse du pari de l'étape 4 (ω = 1,0 rad/s à 1,50 m), et la
   `suite` promettait « l'angle non plus » — faux. L'instant parcourt la même
   course au pas de 0,1 s et atteint t = 3,2 s exactement (les nombres de R1).
   C'est un choix de conception, pas une correction de faute seulement : un
   propriétaire qui préférerait l'exploration des sièges dès l'étape 3
   devrait accepter que le pari de l'étape 4 soit éventé pour qui explore —
   la porte (`fuite-inter-etapes`) rougirait, exprès. Spec amendée (§5.1,
   §7.3, §7.6).

**DEUX ÉCARTS À LA SPEC, IMPOSÉS PAR DES PORTES ARMÉES :** les troisièmes
distracteurs de ROT-26 et ROT-27 (« impossible sans la masse du disque »,
« indécidable sans le moment d'inertie ») REFUSAIENT de conclure — le cliquet
`indice-refus` interdit d'en ajouter à cette notion (11 items où le refus n'est
jamais vrai) ; ils sont devenus des affirmations engagées qui portent le même
modèle. Et « un poids ne fait jamais tourner » (ROT-28) a perdu son « jamais »
(cliquet `indice-absolu`).

**CE QUE LES CRITIQUES DE LA VAGUE 1 ONT LAISSÉ OUVERT** (le reste est
corrigé, §11.195) : le point d'arrêt de R2 ne sonde toujours que le cas
$d = 0$ — une variante « force parallèle à l'axe » est à écrire ; les trois
items neufs sont tous d'« utilisation des ressources », aucun ne lit de données
expérimentales, et le champ `habilete` reste vide sur les 28 items de la notion
(le 50/15/35 du cadre y est incalculable, déjà signalé par la REVIEW du
2026-09-19) ; ROT-28, barre tenue à l'horizontale, ne sépare pas le modèle
`pendule-pesant-bras-de-levier-…` (d sin θ = d à 90°) — une troisième position
le ferait.

**CE QUI RESTE AU PROPRIÉTAIRE** (spec §12.5, non comblé par cette scène) :
le mouvement uniformément varié, que la scène MONTRE mais que la leçon n'écrit
toujours pas ; l'accélération normale $a_N$ ; le système composé
(translation + rotation, fil, poulie), exigé par les trois annales de la
notion. Ce sont des travaux de prose et d'items, à ordonner séparément — et la critique
de fidélité recommande de commencer par le système composé, à R7, avec une
lecture de données expérimentales, AVANT tout nouvel item à R2 (R2 est
désormais le barreau le plus chargé de la notion, pour un savoir qui n'est pas
un savoir-faire du chapitre).

---

## 21. La cuve à ondes : huit questions tranchées par défaut, et huit écarts à la spec

**LE FAIT.** Le septième manipulable de première partie — le premier PLAN —
est livré dans `pc/ondes-mecaniques-periodiques`, R5 (§11.197) : une cuve à
ondes vue de dessus dont l'eau est CALCULÉE dans le navigateur (différences
finies, grille de 0,5 mm), cinq étapes à pari. Il solde une substitution
écrite de la dette de manipulation (la figure statique
`cuve-a-ondes-diffraction` remplaçait depuis le 2026-09-20 une cuve
« manipulable, largeur de fente réglable en direct »). La spec de l'architecte
(`content/pc/ondes-mecaniques-periodiques/spec-scene-cuve.md` §13) laissait
huit questions au propriétaire ; même lecture du mandat qu'au §20 — trancher
selon la recommandation, l'écrire ici, garder chaque choix réversible.

**CE QUI A ÉTÉ TRANCHÉ PAR DÉFAUT :**

1. **`"tool": "scene2d"` est accepté**, sur le même registre
   (`web/src/lib/scene3d/scenes.json`, champ `"dimension": "2d"`), le même
   chargeur, le même validateur, le même compteur de dette. **Le dossier
   `scene3d/` n'est PAS renommé** : la spec demandait un commit mécanique
   séparé, jamais dans celui de la scène — il reste à faire, si le
   propriétaire le veut.
2. **Le quatrième modèle `OND-DIF-4` est OUVERT** (« la fente seule décide ») —
   avec trois items (OMPP-26 à 28). C'était le seul modèle du chapitre qui
   cochait juste PARTOUT dans le corpus : aucun item ne faisait varier λ à a
   fixée. Plancher atteint, marge nulle. **Pour revenir en arrière** (spec
   §8.5) : amender la `description` d'OND-DIF-1, ré-étiqueter trois choix
   d'items et deux choix de paris, régénérer `coverage_summary` et les
   artefacts du modèle apprenant.
3. **Le point d'arrêt `cp-r5-diffraction` reste au-dessus de la scène.** Les
   paris ont été écrits pour ne pas le doubler (S1 demande une FORME, pas une
   condition). La contradiction de son champ (`after_R5` pour un marqueur au
   milieu de R5) est déjà signalée par validate-content, et reste ouverte.
4. **La légende NOMME la cuve idéalisée** : « ici toutes les fréquences
   avancent à la même célérité ; dans une vraie cuve, elle dépend un peu de la
   longueur d'onde — c'est le chapitre 7 ». (La spec disait « chapitre 8 » :
   c'est R7, « Pour t'entraîner ». La dispersion est R6, le chapitre 7 —
   corrigé dans la spec, la légende et le `fit_caveat`.)
5. **Les cinq étapes sont gardées**, S1 comprise : elle installe la fausse règle
   (« une grande ouverture laisse mieux passer ») que S2 casse.
6. **La normalisation de l'amplitude est gardée, dans sa forme MAXIMUM** — voir
   l'écart 3 ci-dessous.
7. **Les deux items expérimentaux de plus ne sont PAS commandés** dans cette
   passe : c'est une commande distincte (la spec le dit elle-même).
   `application_experimentale` passe à 2 items sur 28 avec OMPP-27.
8. **Les deux règles nées de cette spec sont gravées** dans un addendum de
   l'ADR 0041 : la seconde voie d'une SIMULATION établit des invariants, pas
   des nombres ; la porte a le droit de mesurer ce que le produit n'a pas le
   droit d'enseigner.

**HUIT ÉCARTS À LA SPEC, et pourquoi :**

1. **Un ralenti ×5 déclaré, pas le temps réel.** À 40 Hz, 40 rides par seconde
   sur un écran de 60 images ne sont qu'un brouillage. Le même facteur pour les
   quatre fréquences (sinon les rides lentes paraîtraient plus rapides, à
   célérité égale). Affiché en permanence, et le RALENTISSEMENT de l'appareil
   aussi, mesuré contre l'horloge.
2. **Une course de 2,0 s de cuve, pas 2,5 s** : le front atteint l'arc vers
   0,8 s, l'eau à 5 Hz est établie vers 1,5 s ; 2,0 s laisse une fenêtre de
   mesure de 0,8 s (quatre périodes au cran le plus lent).
3. **L'amplitude sur l'arc : 100 % = le MAXIMUM lu sur l'arc**, pas la lecture
   à 0°. Une fente étroite devant λ ne rayonne pas toujours le plus fort droit
   devant (champ proche, arc à 7 cm) : normalisée à 0°, elle affichait des
   valeurs au-dessus de 100 %.
4. **L'étape 5 est sur l'ARC seulement** (fente, fréquence, récepteur) : le
   flotteur de l'étape 3 y aurait ajouté un quatrième contrôle sans question.
5. **Une paroi RIGIDE** (pente nulle, cellules miroirs), pas une hauteur
   imposée nulle : cette dernière faisait rayonner une fente étroite en cos θ,
   et plaçait des nœuds contre la paroi — sous le flotteur.
6. **L'image ne montre pas l'énergie** (ajouté après le premier passage de la
   porte) : de chaque côté de la paroi, elle est à l'échelle de la ride la plus
   forte de ce côté. À une échelle unique, en racine, l'ombre d'une ouverture
   de 8λ était peinte pleine d'arcs pendant que le retour du pari disait
   « l'eau n'a presque pas bougé ». Écrit dans le `fit_caveat`.

7. **Devant la paroi, un CANAL** (ajouté après la revue des captures) : bords
   haut et bas rigides, règle d'un bord à l'autre, seule la bande de gauche
   absorbe. Avec des bandes sur les quatre côtés, l'onde plane de 5 Hz — quatre
   longueurs d'onde de large — se déformait en taches avant même la paroi. Une
   vraie cuve fait comme le canal : sa règle touche les deux bords.
8. **L'image arrêtée est un INSTANT CHOISI** : la course va à 2,0 s, puis au
   prochain maximum de l'onde stationnaire devant la paroi (au plus une
   demi-période). Arrêtée pile à 2,0 s, la cuve à 5 Hz tombait sur un zéro de
   cette onde — 1 % de son énergie — et l'écran montrait le résidu. La légende
   dit l'instant et pourquoi ; les mesures gardent leur fenêtre, qui finit à
   2,0 s.

**ET UN ÉCART AUX ITEMS DE LA SPEC :** OMPP-26 prend d'autres nombres que la
leçon et le pari S2 (a = 2,0 cm, 20 → 5,0 Hz) — un item qui recopie l'exemple
qu'on vient de lire mesure la mémoire ; son troisième distracteur porte
OND-DIF-2, pas le refus de conclure réservé par la spec (cliquet
`indice-refus`). OMPP-28 disait « mille fois plus petite » pour un rapport de
dix-neuf : corrigé avant fusion.

**CE QUI RESTE AU PROPRIÉTAIRE :** le renommage `scene3d/` → `scene/` (commit
séparé) ; la commande des deux items expérimentaux ; le placement du point
d'arrêt de R5 ; et le choix même d'une cuve idéalisée non dispersive — le
seul modèle qui permette de dire, à l'étape 2, « on n'a changé que λ ».

---

## 22. Trois substitutions payées par des figures manipulables — et ce qu'elles ne font pas de ce que la spec demandait

**LE FAIT.** Les quatre substitutions écrites qui restaient étaient toutes des
graphes de physique-chimie ; trois sont payées le 2026-09-24 par des figures
manipulables de première partie (INTERACTIVE-FIGURE-SPEC : un curseur lié à une
fonction connue, sur la figure étagée elle-même, déverrouillé à sa dernière
étape) — `distribution-curseur-pH` (pc/reactions-acido-basiques),
`euler-taille-de-pas` et `sandbox-chute-frottement` (pc/chute-mouvements-plans).
`dette-manipulable` : 4 → 1 ; `media-manipulable` : 12 → 13 notions. Reste
`lecture-Ve-courbe-dosage`.

**CE QUI A ÉTÉ TRANCHÉ PAR DÉFAUT :**

1. **La chute avec frottement n'a qu'UN curseur, la masse** (0,20 à 0,40 kg),
   là où la spec écrivait « curseurs $m$, $k$ ». Le mécanisme n'en porte qu'un ;
   c'est $m$ que la misconception CH-FR-3 met en cause (« la masse ne joue
   jamais ») ; au-delà de 0,40 kg, $v_\ell$ sortirait de l'axe dessiné. **Pour
   revenir en arrière** : un second curseur demande d'étendre le mécanisme
   (deux contrôles), ou une scène 2D — un travail, pas une ligne.
2. **Le pH va de 1 à 9, pas de 0 à 14**, et les pourcentages ne s'affichent
   jamais « 0 » ni « 100 » (la minoritaire à deux chiffres significatifs sous
   1 %). Arrondis à l'unité, ils écrivaient « 100 % » dès pH ≈ 7,1 — la phrase
   même que la leçon réfute. Aucune relation de Henderson–Hasselbalch n'est
   affichée (exclusion du cadre) ; la fraction ne sert qu'au calcul.
3. **Euler : Δt de 0,01 à 0,05 s**, les deux pas de la figure statique
   atteignables exactement ; la comparaison se lit à $t = 0{,}30$ s (l'instant
   de vérification de la figure d'origine) ; la « vraie » valeur est dessinée et
   chiffrée, jamais écrite en formule (la leçon ne la dérive pas).
4. **Les curseurs des figures passent à 48 px** (`.curseur`), les cinq figures de
   maths comprises — un changement de pièce commune.

**CE QUI RESTE AU PROPRIÉTAIRE :** `lecture-Ve-courbe-dosage` (lire trois points
sur une courbe de dosage : un point glissé sur une courbe définie par morceaux
— le mécanisme `drag-point` le permet, pas encore fait) ; et, si la chute doit
montrer $k$, le choix entre deux curseurs et une scène.

---

## La PORTÉE de cette page, mesurée

**Cette page ne recense pas toutes les décisions de propriétaire du dépôt.**
Elle recense celles qu'une passe a levées et écrites ici — et son titre, pris
seul, promet davantage. La mesure : **30 documents d'audit sur 50 portent au
moins un signal d'arbitrage** (« décision attendue », « arbitrage owner »,
« à trancher », « owner call »), et la plupart ne sont pas cités ici.

Beaucoup de ces signaux sont **clos** : le choix M1 a été pris et posé en
production le 2026-09-04, des campagnes entières ont été menées depuis. Trier
ce qui tient de ce qui est levé demande de relire chaque document contre l'état
actuel — c'est un travail de propriétaire, pas une mesure. Ce tableau existe
pour qu'il soit FAISABLE : il dit où chercher, pas ce qui reste.

| Document d'audit | signaux d'arbitrage |
|---|---|
| `fable-day3-ledger.md` | 57 |
| `remediation-campaign-2026-07.md` | 49 |
| `ux-bac-readiness-closure-2026-07.md` | 19 |
| `completion-evaluation-2026-07.md` | 19 |
| `lesson-completeness-docket.md` | 12 |
| `drapeaux-non-leves.md` | 8 |
| `contraste-figures.md` | 7 |
| `ux-bac-readiness-evaluation-2026-07.md` | 5 |
| `fable-ui-content-audit.md` | 5 |
| `content-correctness-docket-2026-07.md` | 5 |
| `chevauchements-figures.md` | 5 |
| `d95-content-audit.md` | 4 |
| `k8-remesure-2017-2019.md` | 3 |
| `hunt-flags-2026-07.md` | 3 |
| `gisement-arabophone.md` | 3 |
| `traces-barrant-etiquettes.md` | 2 |
| `indice-absolu.md` | 2 |
| `format-a-choix.md` | 2 |
| `fable-day2-notes.md` | 2 |
| `codes-de-barreau-fuites.md` | 2 |
| `b4-items-coverage-ledger.md` | 2 |
| `reseau-malade.md` | 1 |
| `recherche-navigateur.md` | 1 |
| `rampe-bac-2026-09-20.md` | 1 |
| `polices-de-repli.md` | 1 |
| `poids-et-reactivite.md` | 1 |
| `interactivity-candidates-2026-07.md` | 1 |
| `figure-stage-depth-audit.md` | 1 |
| `envoi-des-reponses.md` | 1 |
| `copier-coller.md` | 1 |

*(Compté par motif sur `docs/audits/*.md`, `DECISIONS-EN-ATTENTE.md` et
`INSTRUMENTS.md` exclus. Un signal n'est pas une décision ouverte : c'est un
endroit où quelqu'un a écrit qu'il en fallait une.)*

---

## 23. La corde : dix questions tranchées par défaut, un onzième modèle ouvert, et les écarts de la construction

**LE FAIT.** Le huitième manipulable de première partie — le deuxième PLAN — est
livré dans `pc/ondes-mecaniques-progressives`, en tête de R3 (§11.201) : une
corde de 4 m vue de côté, ANALYTIQUE (y(x, t) = y_S(t − x/v) : une translation,
aucun solveur), avec ses deux graphiques — le FILM d'un point (y en fonction de
t) et la PHOTO de la corde (y en fonction de x). Cinq étapes à pari. **Elle ne
solde aucune dette de manipulation** : aucune spec n'avait prescrit ici un
manipulable. Elle se justifie par un trou MESURÉ — les cinq médias de la notion
dessinent tous la corde dans l'espace, aucun ne trace une élongation en fonction
du temps, et rien ne dit que la photo est le MIROIR du geste — et par le
savoir-faire « proposer un montage de mesure », à 0 % dans la REVIEW-2026-09-19.
La spec de l'architecte (`spec-scene-corde.md` §13) laissait dix questions au
propriétaire ; même lecture du mandat qu'aux §20 et §21.

**CE QUI A ÉTÉ TRANCHÉ PAR DÉFAUT :**

1. **Le miroir est enseigné, borné** : lecture GRAPHIQUE seulement, la relation
   montrée reste y_M(t) = y_S(t − τ) avec τ = d/v ; jamais une écriture y(x, t)
   ni y_S(t − x/v) dans le panneau (la porte `frontiere` l'interdit). Et une
   demande à part : faire remonter au cadre l'ABSENCE de bloc `limites:` sur ce
   chapitre — la deuxième après `ondes_periodiques`.
2. **Le dossier `scene3d/` n'est toujours pas renommé** (commit séparé, s'il est
   voulu).
3. **Le onzième modèle `photo-film-confondus` est OUVERT**, avec OMP-22, 23, 24
   (plancher atteint, marge nulle). C'était le seul modèle du chapitre qui cochait
   juste PARTOUT : aucune question ne demandait de lire ou de dessiner une corde.
   **Pour revenir en arrière** (spec §8.5) : amender la `description` de
   `retard-relation-fausse`, ré-étiqueter trois items et le choix `recopie` du pari
   S2, retoucher `coverage_summary`.
4. **La scène ouvre R3**, avant toute prose (le seul placement qui laisse les cinq
   paris ouverts) ; τ = 0,30 s est donné comme une MESURE de l'appareil avant que
   τ = d/v soit écrite.
5. **L'exagération ×20 et le ralenti ×5 sont gardés**, déclarés sur l'image et en
   légende ; l'encart à l'échelle vraie en est la contrepartie (étape 1).
6. **Le cran de tension (4,0 → 8,0 m/s) est gardé**, ouvert à l'étape 5 seulement.
7. **OMP-25 est commandé et livré**, et OMP-26 avec lui
   (`celerite-est-vitesse-point` : 3 → 5) : la famille ne tient plus à la seule
   étiquette contestée d'OMP-20 D. OMP-26 est l'item de MONTAGE que la critique
   de fidélité demandait — « proposer un montage de mesure », le savoir-faire à
   0 % : deux capteurs, une distance, un retard.
8. **La scène « ressort » (transversale / longitudinale) reste une candidate**, non
   construite.
9. **Les deux règles nées de la spec sont gravées** dans un addendum de l'ADR
   0041 : une seconde voie ANALYTIQUE recalcule des NOMBRES (une simulation
   n'établit que des invariants) ; une SYMÉTRIE du réglage d'une étape peut être
   la condition de non-fuite d'une étape suivante.
10. **Les cinq étapes sont gardées**, S4 comprise.

**LES ÉCARTS DE LA CONSTRUCTION, et pourquoi :**

1. **Toutes les lectures attendent le verdict**, y compris celles que la spec
   rangeait dans l'énoncé à l'étape 1 (distance, célérité, retard) : leurs valeurs
   sont DANS la consigne ; une seule règle pour les cinq étapes, et la même que
   les sept autres scènes.
2. **`vitesse-M` s'affiche aussi aux étapes 1 et 4** (la suite de S1 et le retour
   `deux-fois-plus-tot` de S4 la citent : « la lecture le dit ») ; **l'étape 5 a
   huit lectures, pas neuf** — `mesure-v` n'a pas de sens sans la caméra.
3. **Le choix juste de S3 dit « de combien la BOSSE a avancé »**, pas « le sommet »
   : son propre retour calcule 1,60 − 0,80 m, qui sont les positions du FRONT (le
   sommet est à 0,40 puis 1,20 m). Le retour dit déjà que tout repère convient.
4. **Pas de bascule film ↔ photo à l'étape 5** : la bande du haut EST la photo, à
   l'instant choisi ; la suite dit « fais glisser l'instant de la photo » au lieu de
   « passe à la photo ».
5. **Après une course, un réglage montre tout de suite son image finale** (la corde
   est analytique) ; « Relancer » rejoue la course. La cuve, elle, remettait l'eau
   au repos : une simulation n'a pas d'image finale sans la calculer.
6. **`coverage_summary` est recompté à la main** : la spec le disait « généré » ;
   `resume-couverture.mjs` le VÉRIFIE (portes A–D), il ne l'écrit pas.
7. **Les clés des cinq items neufs sont réparties sur A/B/C/D** (C, B, D, A, B) :
   les 21 items existants ont tous leur clé en A — l'application mélange les choix
   à l'affichage, et l'auteur a préféré ne pas reproduire un biais de rédaction.
8. **Une citation de banque corrigée dans la spec** : l'exercice de la caméra
   n'est pas `bk-2018-n-x2` mais `bk-2015-r-x2` (bac 2015, session de
   rattrapage : 25 images/s, les photos n°8 et n°12). Vu par la critique de
   fidélité ; la spec porte la note de correction, et la suite de l'étape 3 cite
   le bon sujet.

**CE QUI RESTE AU PROPRIÉTAIRE :** le bloc `limites:` absent du cadre (deux
chapitres) ; le renommage `scene3d/` ; la scène « ressort » ; et la règle, nouvelle
ici, qu'un manipulable qui ne solde aucune dette doit se justifier par un trou
MESURÉ — acceptée par défaut, jamais écrite ailleurs que dans cette spec. Et une
demande de la critique pédagogique que le format ne sait pas tenir : des items de
PRODUCTION (l'élève dessine l'allure de la corde, écrit τ) plutôt que de choix —
la banque d'items est à choix multiples ; c'est une décision de format, pas un
item de plus.

**ET LA VAGUE 2 (le même jour) :** trois critiques (calme, dessin, ergonomie) sur
les captures ; ce qui a été appliqué, refusé et pourquoi est au §11.201. Une de
leurs affirmations — la scène collante INERTE au téléphone, sur les huit
scènes — a été **rejouée avant d'être corrigée, et elle était fausse** : la
correction écrite d'avance a été retirée. Restent au propriétaire, parce
qu'ils touchent l'appareillage des huit scènes et pas la corde seule : le
verdict dit deux fois (la pastille « correct » ET la ligne « Bonne réponse ») ;
le retour et la suite rangés dans une colonne de ~40 caractères sur grand écran
(la mesure de lecture est de 60 à 70) — les suites de la corde ont été
raccourcies de moitié, la colonne n'a pas bougé.

---

## Ce que cette page n'est pas

Ce n'est pas la liste des défauts du produit : ceux qui étaient objectifs ont
été corrigés le jour même et ne figurent pas ici. Ce n'est pas non plus un
ordre de travail — l'ordre appartient au propriétaire. C'est l'inventaire des
questions qu'un agent **ne doit pas** trancher seul.

## 24. La courbe et les noyaux : douze questions tranchées par défaut, un vingtième modèle ouvert, et les écarts de la construction

**LE FAIT.** Le neuvième manipulable de première partie — le troisième PLAN — est
livré dans `pc/decroissance-radioactive`, en tête de R4 (§11.202) : une courbe
de décroissance sur le quadrillage du bac, et une grille de noyaux qui tirent au
sort. **Il ne solde aucune dette écrite** ; il se justifie par un trou MESURÉ
(`REVIEW-2026-09-11` : application expérimentale 0 %, aucun item de lecture de
courbe, deux « déterminer graphiquement t½ » d'annales posés sur une courbe qui
n'existait pas ; un média animé qui éteignait exactement la moitié). La spec
(`spec-scene-noyaux.md` §13) laissait douze questions ; même lecture du mandat
qu'aux §20, §21, §23.

**CE QUI A ÉTÉ TRANCHÉ PAR DÉFAUT :**

1. **La scène écrit A, comme la leçon** — jamais a. Si le propriétaire adopte a
   (REVIEW fid-F15), la leçon, `checkpoints.yaml`, `exercises.yaml` et la scène
   changent dans le MÊME commit ; la porte lit le libellé (N2).
2. **Le vingtième modèle `loi-population-vs-noyau` est OUVERT** (DECRO-32, 33,
   35 : plancher, marge nulle). **Pour revenir en arrière** : amender la
   `description` de `division-lineaire-demi-vies`, ré-étiqueter trois items et
   deux choix du pari S3.
3. **Le curseur de l'instant est borné à [0 ; 10] jours partout**, S5 comprise :
   la non-fuite S1 → S2 est structurelle.
4. **Le dossier `scene3d/` n'est toujours pas renommé.**
5. **La course MIXTE** (une étape sur cinq) passait déjà `validate-content` :
   rien à assouplir.
6. **Le second isotope reste anonyme** (t½ = 4,0 j, λ double) ; aucun nuclide
   inventé.
7. **La scène ouvre R4** ; N₀ et la définition de la demi-vie sont donnés dans la
   consigne de S1.
8. **Le paragraphe « sans mémoire » de R3 ne bouge pas.**
9. **La règle des DEUX VOIES est gravée** (addendum de l'ADR 0041, soir du
   2026-09-24), avec son corollaire : « deux tirages diffèrent » se mesure sur le
   MOTIF.
10. **`pc/lois-de-newton` est inscrite comme la candidate suivante**, non
    construite.
11. **Les deux réparations de fidélité sont faites** : l'énoncé de la variation
    ne donne plus la réponse de sa q2 ; la leçon écrit « 8,0 jours ». **`r-bac`
    q2.1 est laissé tel quel** : son énoncé décrit déjà le quadrillage sans le
    lire, et une figure du Pu-238 n'existe pas. *(Tranché par défaut le 2026-09-24, §11.205 :
    la question demande « graphiquement » une demi-vie que l'élève ne pouvait
    lire nulle part — la figure est REDESSINÉE d'après la transcription (ses
    graduations) et le corrigé (t½ ≈ 88 ans, a₀ = 10¹¹ Bq), aucun autre nombre,
    et elle le dit dans son commentaire d'auteur. **Pour revenir en arrière** :
    retirer le marqueur de `r-bac` ; la figure reste inerte.)*
12. **Les cinq étapes sont gardées**, S4 comprise.

**LES ÉCARTS DE LA CONSTRUCTION, et pourquoi :**

1. **Trois chiffres significatifs aux lectures de la courbe**, pas deux (§5.6) :
   les retours citaient déjà 2,59, 1,68, 2,83 × 10¹⁴, et à deux chiffres 9,0 et
   9,5 jours affichent la même valeur — le curseur paraîtrait bloqué. D'où
   A₀ = 4,01 × 10⁸ Bq affiché (λN₀ avec la vraie λ) et « A₀ ≈ 4,0 × 10⁸ Bq » dans
   la consigne de S4.
2. **À l'étape libre, l'appareil se choisit par une VUE** (courbe / grille), pas
   par un contrôle du registre.
3. **Les lectures `instant` et `depart` sont retirées des étapes** : la valeur est
   écrite à côté du curseur.
4. **La puce de récapitulatif de R6 (§4.4) n'est PAS posée** : R6 n'a pas de
   récapitulatif. **Au propriétaire** : en créer un, ou poser la puce ailleurs.
5. **DECRO-34 a été réécrit pour le cliquet `indice-absolu`** : la clé porte
   « quel que soit le départ » (vrai), le distracteur A « toujours la moitié de la
   durée mesurée » (son erreur même).
6. **`lambda-depend-conditions-externes` compte 15 items, pas 14** : le résumé de
   la spec oubliait DECRO-33 D. L'auteur a compté les items, pas la spec.
7. **Le quadrillage de la figure graduée n'est plus en `--figure-grid`**
   (presque invisible) mais en encre douce à opacité réduite ; et une figure
   placée dans l'ÉNONCÉ d'un exercice s'arrête à l'étape que déclare son
   `.stages.json` (`"enonce"`) — une clé neuve du format, validée.

**CE QUI RESTE AU PROPRIÉTAIRE :** A ou a ; le récapitulatif de R6 ; la figure du
Pu-238 (faite par défaut depuis, §11.205 — reste à la confronter au scan d'origine) ; le champ `habilete` (toujours absent de la notion — le mélange 50/15/35
reste incalculable, §3) ; et, comme au §23, la règle « un manipulable qui ne solde
aucune dette se justifie par un trou MESURÉ », acceptée par défaut.

**ET LA VAGUE 2 (le même soir)** — trois critiques sur les captures ; le détail
de ce qui a été appliqué est au §11.203. Deux arbitrages entre critiques, écrits
parce qu'ils engagent les scènes suivantes :

- **Le quadrillage : la NORME l'emporte sur le goût maison.** Le calme voulait le
  « murmure » (traits forts à 1,98:1 sur la surface) ; le dessin rappelait
  WCAG 1.4.11 — 3:1 pour un graphique nécessaire à la compréhension, et ces
  traits-là, l'élève les COMPTE (« descends de deux gros carreaux »). Forts à
  ≈ 3:1, fins en dessous, la courbe (≈ 16:1) loin au-dessus. ADR 0039 : le
  normatif s'arme, le maison s'imprime à côté.
- **Les cases vidées ne sont plus en accent** — les deux critiques d'accord :
  775 contours d'accent à 1 024 cases faisaient de la grille l'objet le plus
  bruyant de la page, et marquaient le COMPLÉMENT de ce que le pari demandait
  (combien restent). Écart à la spec §6, écrit ici.

**Restent au propriétaire, parce qu'ils touchent l'appareillage des neuf
scènes :** la `suite` composée en `text-body-lg` (le calme la veut au corps du
texte) ; les choix faux d'un pari qui restent affichés, en entier, après la
révélation ; le rang de l'étape dit trois fois au lecteur d'écran ; un plancher de
cible à 44 px dans la porte ergonomie quand la bible écrit 48 ; des raccourcis
clavier pour relancer. **Et deux affirmations de l'ergonomie, REJOUÉES avant
toute correction** (le `<summary>` des encadrés à ~18 px de haut dans les neuf
scènes ; le focus laissé hors de l'écran quand une course révèle le verdict) —
leur verdict est au §11.203.

## 25. Le banc de diffraction : douze questions tranchées par défaut, un huitième modèle ouvert, et les écarts de la construction

**LE FAIT.** Le dixième manipulable de première partie — le quatrième PLAN — est
livré dans `pc/propagation-onde-lumineuse`, en tête de R3 (§11.204) : un banc
d'optique vu en coupe, un laser, une fente (ou un cheveu), un écran et sa règle, et
le graphe L = f(D) du sujet national 2021. **Il ne solde aucune dette écrite** ; il
se justifie par un trou MESURÉ (spec §0, §2.1) : la seule figure de diffraction du
corpus ne porte aucun nombre et exagère son angle d'un facteur 54 sans le dire ;
`exercises.yaml` donne la lecture que sa propre question réclame ; application
expérimentale 0 %. La spec (`spec-scene-diffraction.md` §13) laissait douze
questions ; même lecture du mandat qu'aux §20, §21, §23, §24.

**CE QUI A ÉTÉ TRANCHÉ PAR DÉFAUT :**

1. **Cette notion plutôt que `lois-de-newton`** (27 % du poids contre 11 %) : le trou
   de la diffraction est un INSTRUMENT manquant sur un contenu dense, celui de Newton
   un contenu manquant, qu'un manipulable ne referme pas. Réversible : Newton reste
   la candidate suivante.
2. **Le huitième modèle `figure-ombre-geometrique` est OUVERT** (« la figure est
   l'ombre portée de l'objet ») : POL-23, 24, 25 (plancher, marge nulle) et POL-26,
   un tableau de mesures (application expérimentale). C'est le seul modèle du
   chapitre qui coche la bonne réponse partout dans le corpus d'avant.
   **Pour revenir en arrière** : amender la `description` de
   `diffraction-condition-taille`, ré-étiqueter trois items et trois choix de paris.
3. **La tache ne prend jamais la couleur du laser** : les jetons, l'accent pour la
   réponse ; la couleur se lit dans un nombre. La porte le garde (`palette`).
4. **L'exagération ×10, déclarée et constante** — mesurée par la porte comme un
   invariant (`exageration-constante`).
5. **Pas de sixième étape « montage plongé dans un liquide »** (sujet 2025 R) : elle
   appartient à R4. Préparée par la spec, non construite.
6. **Le critère λ/a > 10⁻³ n'est pas introduit** : il vient d'un corrigé (2012 R), ni
   du cadre ni de la leçon. **À vérifier à la source** : s'il est attendu des
   élèves, la leçon d'abord, la scène ensuite. La frontière de la porte l'interdit.
7. **L'item « proposer un montage » (POL-27) n'est pas écrit** — une dette voisine, pas
   celle de cette scène.
8. **θ est dit « DEMI-écart angulaire »** partout, et la leçon le dit maintenant (§4.2
   de la spec, posé).
9. **Le dossier `scene3d/` n'est toujours pas renommé.**
10. **La scène ouvre le chapitre R3**, et sa consigne nomme fente, écran et tache
    centrale avant la prose ; `cp-r3-diffraction` n'a pas bougé d'un caractère.
11. **Cinq étapes, S2 (la couleur) gardée** : la seule qui fait varier λ à a fixée.
12. **La règle « la relation est un état qui fuit » est gravée** (ADR 0041, addendum
    de la nuit) : un retour ne contient que les facteurs que son étape a fait varier.

**LES ÉCARTS DE LA CONSTRUCTION** sont écrits en tête de la spec (neuf, dont un
nombre faux du §7.1 : « un dix-millième » pour 1/240). **Restent au propriétaire :**
la validation des `limites`/`exclusions` du cadre que la spec cite (elles sont
`source: derived`) ; le 44 contre 48 px de la porte ergonomie (§24) ; le choix de
nommer la couleur de 600 nm (la leçon ne le fait pas, la scène non plus).

**LA VAGUE 2 — CE QUI N'A PAS ÉTÉ APPLIQUÉ, et pourquoi** (le détail appliqué est en
tête de la spec et au §11.204) :

13. **Le verdict dit quatre fois** (choix teinté, « ✓ correct », bloc teinté, puis
    « Bonne réponse. » et son filet au-dessus de la suite — critique du calme). C'est
    `PariBloc`, commun aux dix scènes, et « Bonne réponse. » est la région vivante
    que lit le lecteur d'écran — les dix portes la lisent. **À trancher une fois
    pour toutes les scènes** : le rendre `sr-only` (l'annonce reste, le filet
    disparaît) est le geste le plus court.
14. **La colonne de 330 px à 1 280 px** (critique de l'ergonomie : le retour en
    maths dans un couloir de ~35 caractères, la cellule gauche vide sous la scène
    collante). C'est `GRILLE_SCENE` (3fr/2fr), commune aux dix panneaux : la changer
    rejoue les étiquettes des dix portes à 1 280 px. **MESURÉ (rejoué le soir même,
    cinq scènes, 1 280 / 1 440 / 1 920 px)** : la bande de scène fait 814 à 823 px
    À TOUTES CES LARGEURS — c'est la colonne de contenu de la leçon qui la borne
    (`.notion-content`, colonne 3 de la grille de page) — donc la scène ~480 px et la
    colonne ~320 px, retours de pari à 43–45 caractères par ligne (le bas de la
    fourchette lisible ; la critique disait ~35, sur un retour chargé de maths). Le
    « vide sous la scène » des captures pleine page n'en est pas un : la scène est
    collante, elle suit la lecture. **Les deux leviers, et leur prix :** (a) 1fr/1fr
    dans la bande : colonne ~400 px (~55 caractères), mais les dix scènes perdent 17 %
    de largeur (31 % de surface) — sur le produit dont la scène EST le contenu ; (b)
    une bande de scène qui sort de la colonne de contenu aux grands écrans : c'est la
    grille de PAGE, où des options d'écran large attendent déjà l'avis du propriétaire
    (`wideOption`, NotionPageView). **Non tranché, parce que les deux touchent ce qui
    n'est pas à trancher par défaut** ; la mesure est là pour qu'il le soit.
15. **Un bouton « revenir au réglage de l'énoncé »** : non — un contrôle de plus par
    étape, contre la règle « un contrôle neuf par étape » (ADR 0041) ; « Précédent »
    puis « Suivant » repose déjà l'état de l'étape.
16. **Les rayons et l'arc à l'accent adouci (α 0,55)** pour hiérarchiser l'accent
    (critique du dessin) : non — à 0,55, l'éventail tombe à ~2,3:1 sur la surface,
    sous le plancher des objets graphiques, et c'est la géométrie même de S3.
    L'accent a été rendu autrement : la tache ne le porte plus.
17. **La bande de l'écran de 12 à 18 px** (critique du dessin : « le sujet est la
    marque la plus discrète ») : non — la hiérarchie est rendue par la règle
    chiffrée tous les 2 cm (13 → 7 nombres) et par L écrit sur la scène ; et la
    porte lit l'éventail 2 px devant la face de la bande (`e.x − 12 − 2`) : la
    changer, c'est changer cette lecture dans le même geste.
18. **Les espacements du dessin sur la grille de 8 pt** (30 / 18 / 26 / 36…) : non,
    hors du titre du graphe (marge basse 42) — rien ne s'aligne sur les pastilles du
    DOM de toute façon.
19. **`justify-between` dans les lectures** (jusqu'à ~200 px entre le terme et sa
    valeur) : le motif est celui des dix panneaux ; à trancher avec le §14.
20. **Les autres traits sous 3:1 du corpus plan** — l'axe de repos de la corde (0,55),
    le bord de la cuve (0,5), la verticale du curseur des noyaux (0,5) — ne sont pas
    des traits qu'on LIT comme le quadrillage : non examinés ici, nommés pour qu'ils
    le soient.
