# ADR 0035 — Ce qui tourne vraiment, et qui le sait

**Date :** 2026-09-20 · **Statut :** accepté (prolonge ADR 0031, 0033 et 0034,
dont il ne contredit rien) · **Preuves :** `docs/HANDOFF.md` §11.118 à §11.126 ·
**Instruments :** `enonces-jumeaux`, `rampe-entree`, `anatomie-notion`,
`batterie-locale --garde`, `rampe-bac` (deux sens de plus),
`accents-francais.py --verifier`, `validate-content` §11.121

## Contexte

ADR 0034 a réparé l'instrument qui ne s'entendait pas crier. La journée qui a
suivi a posé une autre question, plus bête et plus coûteuse : **qu'est-ce qui
tourne, au juste ?**

Elle est arrivée par trois portes différentes le même après-midi. Une garde
contre la dérive ne voyait que 28 des 36 scripts que la CI lance. Un fichier
généré avait deux producteurs et un seul nom dans son en-tête. Deux sens armés
dans une porte ne s'exécutaient jamais, parce qu'ils étaient écrits sous un
`process.exit`. Aucun de ces trois défauts n'est visible en lisant le code :
tous trois exigent de MESURER l'exécution.

## Décisions

### 1. L'inventaire de ce qui tourne se calcule, il ne se lit pas

Trois tentatives successives pour dresser la liste « quels scripts la CI
lance-t-elle », trois résultats faux, pour trois raisons différentes :

- un grep de `node <chemin>` manque tout ce qui passe par `npm run <nom>`,
  dont la vraie commande vit dans `package.json` ;
- résoudre `npm run` manque le crochet `prebuild`, que npm déclenche **seul**
  avant `npm run build` et que personne n'écrit nulle part ;
- et le nom d'un script dans un commentaire YAML ressemble à s'y méprendre à
  un appel.

**Un projet qui tient ses portes dans un YAML et ses commandes dans un
`package.json` ne peut pas répondre à « qu'est-ce qui tourne ? » par la
lecture.** La réponse est un programme, et ce programme est `batterie-locale
--garde`.

### 2. Un fichier généré a autant de producteurs qu'il en a, pas autant qu'il en déclare

`accents.mots.json` portait : « *Généré par le script. Ne pas éditer à la
main.* » Il en avait **deux** : le script Python (654 formes) et la campagne de
correction, qui y ajoute à la main les formes qu'elle vient de corriger
(192 de plus). Les deux consignes se détruisaient l'une l'autre — suivre
l'en-tête, comme la documentation l'imprime, effaçait 192 mots durement gagnés
et rendait la porte plus aveugle **par une régénération de routine, en
silence**.

ADR 0034 §10 disait déjà qu'un fichier généré et committé est une affirmation
datée. On ajoute : **elle doit aussi nommer toutes les mains qui l'écrivent.**
Et quand il y en a plusieurs, l'export **fusionne** au lieu d'écraser — la
propriété se vérifie en le relançant : il ne doit rien changer.

### 3. Une porte écrite après un `process.exit` est une porte qui n'existe pas

Deux sens ajoutés à `rampe-bac` ont été écrits, testés à la main, vus verts,
et documentés. Ils ne tournaient **jamais** sous `--porte` : le bloc
correspondant sort par `process.exit` une centaine de lignes plus haut.

C'est le cas d'ADR 0033 — la porte exacte sur une autre question — réduit à sa
forme la plus bête : la question n'est pas plus étroite, elle n'est **pas
posée**. Et rien dans le code ne le montre ; seul l'essai rouge l'a dit, en
revenant « AVEUGLE ».

**Corollaire opératoire :** un sens ajouté à une porte existante se prouve par
un essai rouge AVANT d'être consigné, jamais après. Un essai rouge qui revient
aveugle sur une porte qu'on vient d'écrire accuse la porte, pas l'essai.

### 4. Un instrument qu'aucun catalogue ne nomme est un instrument mort

Quatre scripts sur 87 n'étaient ni lancés ni catalogués. L'un d'eux,
`wide-measure.mjs`, **demandait par écrit dans son en-tête d'être rejoué**
après les arbitrages du propriétaire, pour produire la ligne « après » de son
propre tableau. Personne ne pouvait le savoir.

Ce dépôt tient son savoir dans des en-têtes de fichiers : les pièges mesurés,
les commandes qui produisent les chiffres, les raisons de chaque choix. **Un
fichier qu'aucun index ne nomme emporte tout cela avec lui** — le savoir existe
encore, il est seulement devenu inatteignable. D'où le second sens de la garde :
aucun `.mjs` ne peut être à la fois non lancé, non testé, non déclaré hors
champ et absent d'`INSTRUMENTS.md`.

### 5. Une porte ne se mesure que seule

Le premier essai rouge de la garde a échoué **au pré-contrôle** : la batterie
entière est rouge sur l'arbre intact, pour une raison documentée et sans
rapport (`couverture-diagnostique`). Un essai rouge ne prouve rien sur une
commande déjà rouge.

**Toute porte incluse dans un agrégat doit pouvoir être lancée seule** — d'où
`--garde`. Sans cela, la propriété « cette porte crie encore » cesse d'être
mesurable dès qu'une porte voisine tombe, et ADR 0034 §5 rappelle qu'une
propriété qu'on ne peut pas re-mesurer est un souvenir.

### 6. Le banc avant le produit — douze fois en une journée

Douze mesures ont annoncé un défaut qui n'existait pas :

| ce que la sonde disait | ce que c'était |
|---|---|
| deux choix identiques dans `calcul-integral` | `toLowerCase()` sur les `$…$` — en maths la casse EST la sémantique |
| quatre tags orphelins | `misconception: [a, b]` est sanctionnée et testée |
| 111 déclarations de clone mortes sur 132 | ma porte exigeait l'identité d'énoncé ; `clone_of_X` veut dire « dérivé de » |
| 41 renvois « réponse D » | le drapeau `i` + le `\b` ASCII : « la réponse **d**épend » |
| 201 renvois « (X) » | maths non retirées : `P(E)`, `\text{card}(E)` |
| 432 quasi-jumeaux | des options numériques — c'est à quoi ressemble un bon QCM |
| 18 « la première réponse » | en philo, la première réponse DU TEXTE |
| `dom-truth` jamais lancé en CI | il l'est, par `npm run` |
| `generate-tokens` orphelin | il tourne, par le crochet `prebuild` |
| 2 solutions contredisant leur clé | arrondis : `≈ 0,48` contre `0,483` |
| une porte neuve « aveugle » | elle était écrite sous un `process.exit` |
| « BUILD EXIT: 0 » | un journal laissé par une session précédente |

Aucun de ces douze n'a coûté cher, **parce qu'aucun n'a été cru**. Deux ont été
attrapés par des portes existantes en moins d'une minute : `liens-fichiers` sur
un chemin d'exemple inventé dans un commentaire, et le tampon de build de
§11.110 sur un `.next` vieux d'une heure et demie — contre la personne même qui
l'avait écrit.

**La règle tient, et se renforce d'être vérifiée douze fois : quand une mesure
annonce une catastrophe, vérifier le BANC avant le produit.**

### 7. Ce qu'on choisit de NE PAS garder compte autant

Trois mesures ont été prises puis écartées sans porte, et la raison est écrite
à côté du motif qui, lui, a été posé :

- les **quasi-jumeaux** (432 signalements, zéro vrai) ;
- le renvoi par **rang** — « la première réponse » (18 signalements, zéro vrai) ;
- la **solution qui ne cite pas la valeur de sa clé** (295 clés numériques
  examinées, 2 signalements, tous deux des arrondis corrects).

Une alarme qui sonne dès qu'on travaille est une alarme morte (ADR 0034 §9).
**Le corollaire neuf : la décision de ne pas armer doit être écrite là où la
prochaine personne aura l'idée de l'armer** — c'est-à-dire dans le code, à côté
du motif voisin, et pas seulement dans un journal.

## Ce que cet ADR ne décide pas

Rien sur le CONTENU. Les quatre constats de fond de la journée — l'écart de
standard des onze notions SVT, l'énoncé prescrit deux fois par un `spec.md`, le
mélange cognitif incalculable sur 97,8 % des items, les deux variations sans
note — sont des arbitrages de propriétaire, consignés dans `docs/audits/` et
délibérément non tranchés ici.

## Retractions and Corrections

Néant à ce jour. §11.103 (trois essais rouges faux) a été rétracté par ADR 0034
et reste rétracté.
