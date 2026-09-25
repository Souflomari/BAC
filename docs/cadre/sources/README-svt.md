# Sources — Cadre de référence SVT (2ème Bac, filière Sciences de la Vie et de la Terre)

> Registre de provenance pour la frontière `docs/cadre/curriculum/svt.yaml` (ADR 0018).
> **Statut : PROPOSITION — DOCUMENTATION SEULEMENT.** Le contenu SVT est **gelé pour
> cette campagne** : cette extraction est journalisée, elle n'entraîne aucune
> modification de contenu. Elle constitue l'artefact autoritatif pour une **future
> session SVT**. Non autoritative tant que les trois portes ne sont pas passées
> (relecture longue Gemini = couverture ; research-challenger = couche dérivée ;
> validation humaine = profondeur). Voir l'en-tête du YAML.

---

## Contrainte de provenance majeure — à lire avant tout

Le **PDF officiel du cadre de référence SVT (filière SVT) est une IMAGE SCANNÉE**
(compression CCITT Fax, ~1 Mo, 3+ pages 1984×2806 px), **sans couche texte** — état
strictement identique aux cadres de maths. WebFetch en renvoie le flux binaire, pas
de texte ; nous n'avons ni OCR ni Bash pour en télécharger/convertir une copie.
**Conséquence directe et non-négociable :**

- **Aucune provenance `cadre p.N` n'est utilisée dans `svt.yaml`.** Contrairement au
  fichier `pc-physique-chimie.yaml` (extrait d'un PDF-texte), le plafond de fidélité
  honnête ici est :
  - `research-consensus` — corroboré par **≥ 2 sources indépendantes** (synthèses
    publiques + corroboration interne au dépôt `cadre.yaml`/`bac-reference.md`,
    eux-mêmes réconciliés à partir de deux synthèses de recherche indépendantes +
    lecture directe de nos 11 leçons `content/svt/`). Réservé à : structure de
    l'épreuve (durée, coefficient, barème 5/15), architecture domaines/chapitres,
    présence des unités, niveaux d'habileté nommés.
  - `derived` — reconstruit à partir du programme marocain standard 2 Bac SVT +
    expertise disciplinaire + le contenu de nos leçons, **non vérifié mot-à-mot**
    contre un texte de cadre récupéré. Couvre : la granularité fine des
    `savoir_faire`, **toutes** les `limites`, **toutes** les `exclusions`, et toute
    sous-répartition de poids par domaine non publiée.

**Aucune page n'a été inventée.** Toute valeur non corroborable ni défendable par
expertise est marquée `derived` avec justification, ou signalée pour l'humain.

---

## Fait établi par triangulation — la forme de l'épreuve (research-consensus)

Convergence de ≥ 2 sources indépendantes + corroboration interne :

- **Durée : 3 h · Coefficient : 7** (matière principale de la filière SVT).
- **Épreuve en deux parties, sur 20 :**
  - **Partie I — Restitution des connaissances : 5 pts (25 %).** Définitions, QCM,
    vrai/faux, schémas/légendes, restitution de mécanismes.
  - **Partie II — Raisonnement scientifique et communication graphique : 15 pts
    (75 %).** Analyse de documents, interprétation d'expériences, exploitation et
    construction de graphes/courbes/tableaux, échiquiers, arbres généalogiques,
    coupes géologiques, électrophorèses ; synthèse argumentée.
- Cette répartition **25 % / 75 % coïncide exactement** avec `domain_weights.svt_stream`
  et `exam_format.svt` de `docs/cadre/cadre.yaml` (§8 de `bac-reference.md`).

**C'est le fait le plus load-bearing de la matière :** l'épreuve SVT est dominée à
75 % par le raisonnement sur documents et la communication graphique, pas par la
restitution. La couche `savoir_faire` du YAML est écrite pour refléter cette réalité.

---

## Fait établi par triangulation — la structure du programme (research-consensus)

Le programme officiel **filière SVT** (2 Bac) comporte **six unités**, plus larges
que les quatre thèmes couverts par nos 11 leçons :

1. **Consommation de la matière organique et flux d'énergie** — enzymes (digestion),
   libération de l'énergie (respiration/fermentation), **ET le rôle du muscle strié
   squelettique dans la conversion de l'énergie**.
2. **Nature de l'information génétique et son expression + génie génétique**
   (ADN, réplication, synthèse des protéines, mutations, transgenèse). *— unité
   MOLÉCULAIRE, entièrement HORS de nos 11 leçons.*
3. **Transmission de l'information génétique / génétique humaine** (lois de Mendel,
   brassages inter- ET intrachromosomique, génétique humaine).
4. **Génétique des populations** (Hardy-Weinberg).
5. **Immunologie** (soi/non-soi, moyens de défense, dysfonctionnements et aides).
6. **Géologie** — phénomènes accompagnant la formation des chaînes de montagnes
   (tectonique des plaques, chaînes de subduction/collision, granitisation,
   métamorphisme, déformations).

`svt.yaml` détaille en pleine profondeur les **quatre domaines qui correspondent à
nos leçons** (métabolisme, génétique formelle, immunologie, géologie) et **signale
explicitement** les parties du cadre officiel sans leçon (unité moléculaire ;
chapitre muscle ; brassage intrachromosomique) — voir `coverage_notes`.

---

## Sources récupérées

### 1. PDF officiel — cadre SVT, filière SVT — *image scannée, non-texte*
- **URL PDF :** https://www.alloschool.com/assets/documents/course-398/cadre-de-reference-de-l-examen-national-svt-sciences-de-la-vie-et-le-terre.pdf
- **Page élément :** https://www.alloschool.com/element/48556
- **Émetteur :** MEN / CNEEO. **Cadre 2015 en vigueur pour la session 2026.**
- **Format :** PDF **scanné** (CCITT Fax, ~1 Mo) — **pas de couche texte**, non-OCR-able
  ici. **Atteignable** (fetch OK, contenu binaire confirmé).

### 2. PDF officiel — cadre SVT, filière Sciences Physiques (variante SVT-en-PC) — *distinct*
- **Page élément :** https://www.alloschool.com/element/48555
- **Pertinence :** confirme que la **variante SVT-pour-PC est un document DISTINCT**
  (cadre séparé), pas une simple restriction implicite. En filière PC, la SVT a
  **coefficient 5** (cf. `cadre.yaml`), une durée réduite et un **programme allégé**
  (sous-ensemble). **Non extrait ici** — nécessitera sa propre passe si l'app ouvre
  la filière PC. Signalé dans `svt.yaml` (`variante_pc`).

### 3. Synthèse de la forme de l'épreuve (triangulation A)
- **Sources :** fiches méthode de type schoolmouv / neosvt / inesmaths + le récapitulatif
  9rayti « cadre référentiel ». Donnent de façon concordante : **Partie I restitution
  5 pts · Partie II raisonnement scientifique & communication 15 pts · durée 3 h ·
  coefficient 7.**
  - https://neosvt.com/examens-nationaux-svt-2bac-svt/
  - https://www.9rayti.com/conseil/cadre-referentiel-du-baccalaureat-au-maroc

### 4. Synthèse de la structure du programme (triangulation B)
- **neosvt** (six unités, incl. muscle et génie génétique) :
  https://neosvt.com/examens-nationaux-svt-2bac-svt/
- **kezakoo** (confirme le chapitre « Le rôle du muscle strié squelettique dans la
  conversion de l'énergie » dans l'unité métabolisme) :
  https://www.kezakoo.com/unite/2bac/filiere-svt/la-consommation-de-la-matiere-organique-et-flux-denergie/

### 5. Corroboration 2015 (confirme le millésime du cadre en vigueur)
- **Studocu** « Cadre de Référence de l'Examen National SVT — Baccalauréat 2015 » :
  https://www.studocu.com/row/document/lycee-30-juillet/science/cadre-de-reference-de-lexamen-national-svt-baccalaureat-2015/131803910

### 6. Corroboration interne au dépôt (triangulation C)
- **Fichiers :** `docs/cadre/cadre.yaml` (`domain_weights.svt_stream` = restitution 25 /
  raisonnement 75 ; `exam_format.svt`), `docs/cadre/bac-reference.md` (§5 coef SVT-en-SVT
  = 7, §8 format SVT) — eux-mêmes réconciliés à partir de deux synthèses indépendantes.
- **Nos 11 leçons `content/svt/`** — lues intégralement : elles fixent, par leur contenu
  et leurs bornes explicites (ex. « les gènes liés sortent du programme de cette
  leçon »), une grande partie de la couche `savoir_faire`/`limites` dérivée.

---

## Confiance (résumé)

- **ÉLEVÉE** sur : forme de l'épreuve (durée, coefficient, barème 5/15), existence et
  intitulés des six unités du programme, présence des chapitres de nos quatre domaines.
  (Triangulation 3 + 4 + 6 concordantes.)
- **MOYENNE** sur : la **sous-répartition en pourcentage par domaine** (le tableau de
  spécification du cadre existe mais est illisible — PDF scanné). Le seul poids publié
  et confirmé est le barème 25 % / 75 %, transversal aux unités. Aucune répartition
  fine par unité n'est donnée → non chiffrée dans le YAML, signalée pour la relecture
  Gemini du cadre scanné.
- **DÉRIVÉE (à attaquer en priorité)** : toute la granularité des `savoir_faire`,
  **toutes** les `limites` et `exclusions`, la frontière exacte de profondeur de
  chaque chapitre (ex. jusqu'où va le bilan de la chaîne respiratoire ; statut exact
  du brassage intrachromosomique et de l'obduction).

## Lacunes de couverture repérées (détaillées dans `svt.yaml` → coverage_notes)

1. **Unité moléculaire entière absente** — « Nature/expression de l'information
   génétique + génie génétique » (ADN, réplication, synthèse des protéines, mutations,
   transgenèse) : **aucune de nos 11 leçons ne la couvre.** C'est la plus grande
   lacune de couverture du cadre.
2. **Chapitre muscle absent** — « Le rôle du muscle strié squelettique dans la
   conversion de l'énergie » : au cadre (unité métabolisme), sans leçon dédiée.
3. **Brassage intrachromosomique / gènes liés / crossing-over** — au programme de
   transmission filière SVT, mais **explicitement différé** dans la leçon
   `transmission-caracteres` (« ce cas de figure sort du programme de cette leçon »).

## Upgrade prioritaire
Obtenir le **PDF-texte officiel** (ou le tableau de spécification MEN lisible) pour
faire passer les valeurs `research-consensus` en `cadre p.N`, transcrire les capacités
**verbatim**, et récupérer la **répartition en pourcentage par domaine** (aujourd'hui
non chiffrée).
