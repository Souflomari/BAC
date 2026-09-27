# Sources — Cadres de référence MATHÉMATIQUES (2ème Bac)

> Registre de provenance pour les frontières `docs/cadre/curriculum/maths-sm.yaml`
> et `docs/cadre/curriculum/maths-sexp.yaml` (ADR 0018). **Statut : PROPOSITION.**
> Non autoritatif tant que les trois portes ne sont pas passées (relecture longue
> Gemini = couverture ; research-challenger = couche dérivée ; validation humaine =
> profondeur). Voir l'en-tête de chaque YAML.
>
> **Révision 2026-09-27 (wave B1).** Ajout d'une section « **Capacités verbatim
> récupérées** » (neuf libellés cités mot pour mot depuis les sources 3 et 4 : SExp 1.2.11 ;
> SM 1.2.6, 1.2.7, 1.3.7, 1.3.15, 2.1.4, 2.1.5, 2.1.6, 2.1.8). Elles ont servi à corriger
> deux frontières : (a) la **fonction réciproque** dans les **deux** filières — donnée à tort
> pour une spécificité SM, et dont la DÉRIVÉE était exclue du périmètre SExp ; (b)
> l'**arithmétique SM** — petit théorème de **Fermat** absent du programme alors que 2.1.8 le
> nomme, exclusion « résidus quadratiques » falsifiée par une annale vérifiée, et **systèmes de
> numération** (2.1.4/2.1.5/2.1.6, un tiers du sous-domaine) entièrement absents. Même statut
> PROPOSITION. La contrainte ci-dessous est
> **inchangée** : les PDF officiels restent des scans sans couche texte, donc aucune de ces
> citations ne porte de numéro de page et aucune ne devient `cadre p.N`.

---

## Contrainte de provenance majeure — à lire avant tout

Les **PDF officiels des cadres de référence de maths sont des IMAGES SCANNÉES**
(compression CCITT Fax, métadonnée de création **6 novembre 2015**), **sans couche
texte**. Ils ne sont donc **pas extractibles en texte** par notre outillage
(WebFetch renvoie le flux binaire, pas de texte ; nous n'avons pas d'OCR ni de
Bash pour en télécharger/convertir une copie). **Conséquence directe et
non-négociable :**

- **Aucune provenance `cadre p.N` n'est utilisée dans les deux YAML de maths.**
  Contrairement au fichier `pc-physique-chimie.yaml` (extrait d'un PDF-texte), ici
  le plafond de fidélité honnête est :
  - `research-consensus` — corroboré par **≥ 2 sources indépendantes** (synthèse
    pdfmath.com + `cadre.yaml`/`bac-reference.md` du dépôt, eux-mêmes réconciliés
    à partir de deux synthèses indépendantes + preuve de composition des examens
    nationaux). Réservé à : structure domaines/sous-domaines, poids, ratios
    d'habileté, présence des chapitres, compétences de haut niveau nommées.
  - `derived` — reconstruit à partir du programme marocain standard + expertise
    disciplinaire, **non vérifié mot-à-mot** contre un texte de cadre récupéré.
    Couvre : la granularité fine des `savoir_faire`, **toutes** les `limites`,
    **toutes** les `exclusions`, et les sous-répartitions de poids non publiées à
    cette granularité.

**Aucune page n'a été inventée.** Si une valeur ne pouvait être ni corroborée ni
défendue par expertise, elle est marquée `derived` avec justification, ou signalée
pour l'humain.

---

## Sources récupérées

### 1. PDF officiel — Sciences Mathématiques (A/B) — *image scannée, non-texte*
- **URL :** https://www.alloschool.com/assets/documents/course-436/cadre-de-reference-de-l-examen-national-maths-sciences-mathematiques.pdf
- **Titre :** « Cadre de référence de l'examen national — Maths Sciences Mathématiques »
- **Émetteur :** MEN / CNEEO (Centre National de l'Évaluation, des Examens et de l'Orientation)
- **Date/version :** métadonnée PDF création **2015-11-06** ; mise en ligne AlloSchool **2019-12-23**. Cadre 2015 **en vigueur pour la session 2026**.
- **Format :** PDF **scanné** (CCITT Fax, 8 pages, ~286 Ko) — **pas de couche texte**, non-OCR-able ici. **Atteignable** (fetch OK, contenu binaire).

### 2. PDF officiel — Sciences Expérimentales (PC/SVT) — *image scannée, non-texte*
- **URL :** https://www.alloschool.com/assets/documents/course-442/cadre-de-reference-de-l-examen-national-maths-sciences-experimentales.pdf
- **Titre :** « Cadre de référence de l'examen national — Maths Sciences Expérimentales »
- **Émetteur :** MEN / CNEEO
- **Date/version :** cadre 2015 ; mise en ligne AlloSchool **2020-10-11**. En vigueur session 2026.
- **Format :** PDF **scanné** (images, 8 pages, ~254 Ko) — **pas de couche texte**. **Atteignable**.

### 3. Synthèse HTML — Sciences Mathématiques (lisible, source de triangulation A)
- **URL :** https://www.pdfmath.com/cours/bacsm-2026-sm/
- **Titre :** « الإطار المرجعي لمادة الرياضيات — علوم رياضية BACSM 2026 »
- **Document que la page déclare reproduire :** « Cadres de référence de l'examen national du
  baccalauréat — options internationales, option français — Mathématiques, Série Sciences
  Mathématiques, filières “A” et “B” », CNEEO **2025**.
- **Capacités citées VERBATIM depuis cette source** *(ajout 2026-09-27, wave B1)* : **1.2.6,
  1.2.7, 1.3.7, 1.3.15** — voir la section « Capacités verbatim » plus bas.
- **Format :** synthèse HTML (arabe). Donne : domaines **Analyse 50 % / Algèbre-Géométrie 50 %**, sous-répartition **Complexes+Structures ≈ 35 %**, **Arithmétique+Probabilités ≈ 15 %**, **« Géométrie de l'espace : Non »** (non testée au national SM), habiletés **40/40/20**, décompte des capacités par sous-domaine, mention explicite Rolle/accroissements finis/sommes de Riemann comme spécifiques SM. **Lisible et exploité.**

### 4. Synthèse HTML — Sciences Expérimentales (lisible, source de triangulation A)
- **URL :** https://www.pdfmath.com/cours/bac-2026-pc-svt/
- **Titre :** « الإطار المرجعي لمادة الرياضيات — علوم تجريبية BAC 2026 »
- **Format :** synthèse HTML (arabe). Donne : **Analyse 55 % / Algèbre-Géométrie 45 %**, **Géométrie (produit scalaire) 15 %**, **Complexes+Probabilités 30 %**, habiletés **50/35/15**. **Concorde exactement** avec `docs/cadre/cadre.yaml`. **Lisible et exploité.**
- **Document que la page déclare reproduire :** « Cadres de référence de l'examen national du
  baccalauréat — options internationales, option français — Mathématiques, Série Sciences
  Expérimentales », CNEEO **2025**, applicable **session BAC 2026**.
- **Capacités citées VERBATIM depuis cette source** *(ajout 2026-09-27, wave B1 — voir la
  section « Capacités verbatim » plus bas)* : **1.2.11**.

### 5. Cadre 2025 « option français » (référencé — non récupéré en texte)
- **URL :** https://www.scribd.com/document/850285759/Cdr-Exam-Nat-Bac-25-Math-sm-Op-Fr
- **Titre :** « CDR Exam Nat Bac 25 Math-SM Op FR »
- **Pertinence :** **même série de nommage que le PDF PC déjà détenu** (`CDR_EXAM_NAT_BAC_25_PC-PC_Op_FR.pdf`), donc c'est le cadre officiel **session 2025 BIOF option français** pour les maths SM. Le contenu du cadre maths est **inchangé depuis 2015**. **Non récupérable en texte** (Scribd protégé). Signalé comme la meilleure cible d'un futur upgrade (récupérer le PDF-texte officiel).

### 6. Preuve de composition des examens nationaux SM (source de triangulation C)
- **Recueils :** Scribd « Livre des Examens Nationaux SM », Studocu (sessions 2015, 2022, 2023, 2025), corrigés 2008→2025.
- **Usage :** corrobore **indépendamment** la structure SM et **l'absence de géométrie** : l'épreuve nationale SM = ~4 exercices — *Structures algébriques (~4 pts) · Arithmétique OU Probabilités (~3 pts) · Nombres complexes (~3 pts) · Problème d'analyse (~10 pts = 6+4)*. Jamais de géométrie de l'espace. Concorde avec les poids de la source 3 (35 % + 15 % + Analyse 50 %).

### 7. Corroboration interne au dépôt (source de triangulation B)
- **Fichiers :** `docs/cadre/cadre.yaml`, `docs/cadre/bac-reference.md` (§6, §7) — eux-mêmes réconciliés à partir de deux synthèses de recherche indépendantes.
- **Usage :** confirme habiletés (SM 40/40/20 ; SExp 50/35/15), poids de domaine (SM 50/50 ; SExp 55/45, géométrie produit scalaire/vectoriel 15 + complexes & probabilités 30), et l'insight structurel « SM ajoute arithmétique, structures algébriques, sommes de Riemann, Rolle & accroissements finis, absents en SExp ».

---

## Capacités verbatim récupérées *(ajout 2026-09-27, wave B1)*

> **Ce que cette section est, et ce qu'elle n'est pas.** Les libellés ci-dessous sont
> reproduits **mot pour mot** tels que les sources 3 et 4 les impriment. Ils ne portent
> **pas** de numéro de page : les PDF officiels restent des images scannées (re-vérifié le
> 2026-09-27 sur la source 2 — flux CCITT Fax, aucune couche texte). La provenance reste
> donc `research-consensus`, jamais `cadre p.N`. Ce sont des citations d'une **source
> secondaire qui se déclare reproduire le cadre** — c'est exactement ce que la relecture
> longue Gemini devra confronter au scan.

### Sciences Expérimentales — source 4

| N° | Sous-domaine | Libellé verbatim |
|----|--------------|------------------|
| **1.2.11** | 1.2 — Continuité, dérivation et étude de fonctions | « Déterminer la dérivée et la monotonie de la fonction réciproque d'une fonction continue et strictement monotone, et la représenter graphiquement. » |

*Voisines relevées pour fixer la POSITION de 1.2.11 dans le bloc dérivation (elles encadrent
la capacité, et c'est ce qui justifie son placement dans notre chapitre
`derivabilite_etude_fonctions` plutôt que `limites_continuite`) :* 1.2.10 « Résoudre
graphiquement des équations f(x) = g(x) et des inéquations f(x) ≤ g(x). » · 1.2.12 « Résoudre
des problèmes d'application concernant les valeurs minimales et maximales. »

**Seconde jambe de triangulation pour 1.2.11 (jambe C, composition des examens nationaux) :**
les quatre problèmes SExp vérifiés du corpus portent tous une partie « fonction réciproque »,
et trois demandent explicitement la dérivée — 2020 N q8c `(f⁻¹)'(2−ln3)` 0,5 pt · 2022 N q7b
`(f⁻¹)'(ln 4)` 0,25 pt · 2024 N II-5b `(g⁻¹)'(1)` 0,75 pt · 2021 N q7 existence + courbe
1,25 pt. Les `file:line` sont consignés dans
`docs/cadre/curriculum/maths-sexp.yaml` → `coverage_notes.corrections`.

### Sciences Mathématiques — source 3

| N° | Sous-domaine | Libellé verbatim |
|----|--------------|------------------|
| **1.2.6** | 1.2 — Limites et continuité | « Déterminer la fonction réciproque d'une fonction continue et strictement monotone sur un intervalle. » |
| **1.2.7** | 1.2 — Limites et continuité | « Appliquer le théorème de la fonction réciproque (l'existence, la continuité, les variations et la représentation graphique de la fonction réciproque). » |
| **1.3.7** | 1.3 — Dérivation et étude de fonctions | « Étudier la dérivabilité et déterminer la dérivée de la fonction réciproque d'une fonction continue et strictement monotone. » |
| **1.3.15** | 1.3 — Dérivation et étude de fonctions | « Maîtriser le calcul sur les puissances réelles. » |
| **2.1.4** | 2.1 — Arithmétique | « Écrire un entier naturel dans un système de numération de base donnée » |
| **2.1.5** | 2.1 — Arithmétique | « Additionner, multiplier et comparer deux entiers dans un système de numération » |
| **2.1.6** | 2.1 — Arithmétique | « Utiliser les écritures dans des systèmes de numération dans des situations d'arithmétique » |
| **2.1.8** | 2.1 — Arithmétique | « Utiliser la divisibilité, la division euclidienne, les théorèmes de Gauss, de Bézout et de **Fermat**, le théorème fondamental et les propriétés des nombres premiers » |

*Le sous-domaine 2.1 (Arithmétique) compte **9 capacités**, 2.1.1→2.1.9, pour le bloc
« Arithmétique + Probabilités ≈ 15 % ». Les quatre reproduites ci-dessus sont celles qui ont
corrigé la frontière ; les cinq autres (PPCM/PGCD par décomposition, diviseurs, Euclide et
Bézout, congruences et ℤ/nℤ, résolution de ax+by=c) étaient déjà couvertes.*

**Ce que 2.1.8 a tranché, et ce qu'elle NE tranche pas.** Elle nomme **Fermat** : le petit
théorème de Fermat est donc bien au cadre SM, et son absence du programme dans
`maths-sm.yaml` était un défaut de notre frontière, pas un silence du cadre — c'est la réponse
à la question posée par `content/maths/arithmetique/lesson.md:591-609`. En revanche elle **ne
dit pas** si la *preuve* du théorème est attendue : le libellé commence par « Utiliser », mais
**6 des 9 capacités du sous-domaine commencent par « Utiliser »** — c'est le registre de la
liste, pas un statut démonstratif, et un cadre d'EXAMEN est de toute façon muet sur ce que le
cours démontre. **Décision owner**, consignée en `_question_ouverte_owner` sur le chapitre et
délibérément non tranchée ici.

**Ce que ces quatre lignes ont tranché.** La fonction réciproque est une capacité **commune
aux deux filières** — elle n'est PAS une spécificité SM, contrairement à ce que les deux YAML
affirmaient avant le 2026-09-27. L'écart réel est de profondeur/extension : SM la nomme trois
fois, la range en deux blocs (existence en 1.2.x, dérivée en 1.3.7 — ce qui corrobore notre
découpage en deux chapitres) et l'étend aux **puissances réelles** (1.3.15), à la racine
n-ième et aux réciproques trigonométriques (arctan, attestée sur copie SM). Les deux
corrections jumelles sont consignées dans `coverage_notes.corrections` des **deux** fichiers,
qui se citent mutuellement et ne doivent plus être révisés séparément.

---

## Confiance par filière (résumé)

- **SExp (PC/SVT) : ÉLEVÉE** sur la structure/poids/habiletés (triangulation 3+4+7 concordantes). Zones dérivées à valider : granularité savoir-faire, limites/exclusions, **placement du produit vectoriel** (présent au programme SExp mais son statut d'objet testé est incertain — voir `coverage_notes`).
- **SM : ÉLEVÉE** sur le haut niveau (50/50, habiletés 40/40/20, ajout arithmétique/structures/Riemann/Rolle-TAF, **géométrie non testée au national**) via triangulation 3+6+7. **MOYENNE** sur les sous-répartitions fines (35 %/15 % : source 3 + preuve de composition 6, mais pas de tableau de spécification texte). Zones dérivées à valider : espaces vectoriels, sommes de Riemann, Rolle/TAF, limites/exclusions.

**Ajout 2026-09-27 aux zones `derived` à valider, dans les deux filières :** les **limites de
profondeur de la fonction réciproque** (dérivée demandée EN UN POINT et non comme fonction sur
J ; théorème admis et jamais démontré ; expression de f⁻¹(x) non demandée ; réciproque portant
toujours sur la restriction d'une fonction déjà étudiée) sont reconstruites à partir de
**quatre copies SExp seulement**, et le tri « SM-seul » (racine n-ième, puissances réelles,
arctan) n'est sourcé que pour 1.3.15 et arctan. La capacité elle-même, en revanche, est
sourcée dans les deux filières (verbatim + examens).

## Upgrade prioritaire
Obtenir le **PDF-texte officiel** (source 5, ou le tableau de spécification MEN) pour
faire passer les valeurs `research-consensus` en `cadre p.N` et transcrire les listes
de capacités **verbatim** (aujourd'hui reconstruites → `derived`).
</content>
</invoke>
