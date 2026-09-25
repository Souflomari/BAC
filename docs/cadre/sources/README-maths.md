# Sources — Cadres de référence MATHÉMATIQUES (2ème Bac)

> Registre de provenance pour les frontières `docs/cadre/curriculum/maths-sm.yaml`
> et `docs/cadre/curriculum/maths-sexp.yaml` (ADR 0018). **Statut : PROPOSITION.**
> Non autoritatif tant que les trois portes ne sont pas passées (relecture longue
> Gemini = couverture ; research-challenger = couche dérivée ; validation humaine =
> profondeur). Voir l'en-tête de chaque YAML.

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
- **Format :** synthèse HTML (arabe). Donne : domaines **Analyse 50 % / Algèbre-Géométrie 50 %**, sous-répartition **Complexes+Structures ≈ 35 %**, **Arithmétique+Probabilités ≈ 15 %**, **« Géométrie de l'espace : Non »** (non testée au national SM), habiletés **40/40/20**, décompte des capacités par sous-domaine, mention explicite Rolle/accroissements finis/sommes de Riemann comme spécifiques SM. **Lisible et exploité.**

### 4. Synthèse HTML — Sciences Expérimentales (lisible, source de triangulation A)
- **URL :** https://www.pdfmath.com/cours/bac-2026-pc-svt/
- **Titre :** « الإطار المرجعي لمادة الرياضيات — علوم تجريبية BAC 2026 »
- **Format :** synthèse HTML (arabe). Donne : **Analyse 55 % / Algèbre-Géométrie 45 %**, **Géométrie (produit scalaire) 15 %**, **Complexes+Probabilités 30 %**, habiletés **50/35/15**. **Concorde exactement** avec `docs/cadre/cadre.yaml`. **Lisible et exploité.**

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

## Confiance par filière (résumé)

- **SExp (PC/SVT) : ÉLEVÉE** sur la structure/poids/habiletés (triangulation 3+4+7 concordantes). Zones dérivées à valider : granularité savoir-faire, limites/exclusions, **placement du produit vectoriel** (présent au programme SExp mais son statut d'objet testé est incertain — voir `coverage_notes`).
- **SM : ÉLEVÉE** sur le haut niveau (50/50, habiletés 40/40/20, ajout arithmétique/structures/Riemann/Rolle-TAF, **géométrie non testée au national**) via triangulation 3+6+7. **MOYENNE** sur les sous-répartitions fines (35 %/15 % : source 3 + preuve de composition 6, mais pas de tableau de spécification texte). Zones dérivées à valider : espaces vectoriels, sommes de Riemann, Rolle/TAF, limites/exclusions.

## Upgrade prioritaire
Obtenir le **PDF-texte officiel** (source 5, ou le tableau de spécification MEN) pour
faire passer les valeurs `research-consensus` en `cadre p.N` et transcrire les listes
de capacités **verbatim** (aujourd'hui reconstruites → `derived`).
</content>
</invoke>
