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

## Ce que cette page n'est pas

Ce n'est pas la liste des défauts du produit : ceux qui étaient objectifs ont
été corrigés le jour même et ne figurent pas ici. Ce n'est pas non plus un
ordre de travail — l'ordre appartient au propriétaire. C'est l'inventaire des
questions qu'un agent **ne doit pas** trancher seul.
