# Sources — Cadre de référence PHILOSOPHIE (2ème Bac, filières scientifiques)

> Registre de provenance pour la frontière `docs/cadre/curriculum/philo.yaml`
> (ADR 0018). **Statut : PROPOSITION.** Non autoritatif tant que les trois portes
> ne sont pas passées (RULES §5) : relecture longue Gemini = couverture ;
> research-challenger = couche dérivée ; validation humaine = profondeur.
> Voir l'en-tête du YAML.

---

## Contrainte de provenance majeure — à lire avant tout

Le **cadre de référence de l'examen national de philosophie** (الإطار المرجعي لمادة
الفلسفة) est publié par le MEN/CNEEO. Comme pour les cadres de maths, les copies
en circulation sont des **PDF scannés / documents Scribd protégés, sans couche
texte fiablement extractible** par notre outillage (WebFetch renvoie le binaire ou
un 403 ; pas d'OCR ni de Bash). **Conséquence directe et non-négociable :**

- **Aucune provenance `cadre p.N` n'est utilisée dans `philo.yaml`.** Contrairement
  à `pc-physique-chimie.yaml` (extrait d'un PDF-texte), le plafond de fidélité
  honnête ici est :
  - `research-consensus` — corroboré par **≥ 2 sources indépendantes** (au moins
    une plateforme pédagogique structurée par filière **+** une épreuve nationale
    réelle **ou** une seconde plateforme). Réservé à : structure des mujazūʾāt
    (modules) / mafāhīm (notions), format de l'épreuve, durée, coefficient,
    grille d'évaluation (سلم التنقيط), présence des notions au programme.
  - `derived` — reconstruit à partir du programme marocain standard + expertise
    disciplinaire, **non vérifié mot-à-mot** contre le texte du cadre. Couvre : la
    granularité fine des `savoir_faire`, **toutes** les `limites`, **toutes** les
    `exclusions`, et le statut d'inclusion/exclusion des notions **contestées**.

**Aucune page n'a été inventée.** La philosophie n'a pas de « poids par domaine »
au sens de la physique (l'épreuve = UN sujet choisi parmi trois, pas une somme
pondérée de domaines) — voir la note de schéma dans le YAML.

---

## Faits verrouillés (triangulés)

| Fait | Valeur | Provenance |
|------|--------|-----------|
| Coefficient (toutes filières sci.) | **2** | research-consensus (cadre.yaml du dépôt + épreuves nationales + 9rayti) |
| Durée de l'épreuve (filières sci.) | **2 heures (ساعتان)** | research-consensus (en-têtes des épreuves nationales 2024 & 2025 علوم) |
| Langue | Arabe | research-consensus |
| Format | **Choix d'UN sujet parmi TROIS** | research-consensus (épreuves 2024/2025 + synthèses) |
| Types de sujets | (1) سؤال / question-dissertation · (2) قولة مرفقة بمطلب / citation · (3) نص / texte à analyser et discuter | research-consensus |
| Grille /20 (النص) | Compréhension 4 · Analyse 5 · Discussion 5 · Synthèse/Tarkīb 3 · Aspects formels 3 | research-consensus (profsalmi « وفقا للاطار المرجعي » + corroboration taalimpress) |
| Modules (mujazūʾāt) | 4 : الوضع البشري · المعرفة · السياسة · الأخلاق | research-consensus (unanime) |

> **NB durée :** plusieurs synthèses grand-public annoncent « 4 heures » — c'est la
> durée des **filières littéraires/humaines** (آداب 3h, علوم إنسانية 4h). Les
> **en-têtes des épreuves nationales علوم réelles** (2024, 2025) portent
> **ساعتان = 2h** ; c'est la valeur retenue.

> **NB « 17 notions » :** une réponse de moteur de recherche a listé *art, langage,
> religion, inconscient, conscience, technique, nature, travail…* — c'est le
> **programme FRANÇAIS**, **pas** le programme marocain (structuré en 4 mujazūʾāt).
> Ces notions sont explicitement **hors périmètre** (voir `exclusions` du YAML).

---

## Point de fidélité le plus sensible — PÉRIMÈTRE DES NOTIONS (à valider)

Les sources **divergent** sur le sous-ensemble exact de notions au programme des
filières scientifiques. C'est la zone `derived`/contestée la plus importante du
fichier, celle que le challenger doit attaquer et que l'humain doit trancher sur
le cadre officiel.

- **Consensus (8 notions « cœur »)** — inclusion confirmée par **deux plateformes
  structurées par filière** (AlloSchool « علوم فيزيائية » + 9rayti « programme
  filières scientifiques »), **et** présence dans les épreuves nationales علوم
  récentes :
  الشخص · الغير · النظرية والتجربة · الحقيقة · الدولة · الحق والعدالة · الواجب · الحرية.
- **Contestées (3 notions)** — **omises** des arborescences de cours par filière
  (AlloSchool علوم فيزيائية et 9rayti n'en font pas des leçons), **mais**
  référencées ailleurs :
  - **التاريخ (l'histoire)** : citée par profsalmi comme notion du module الوضع
    البشري pour les filières scientifiques.
  - **العنف (la violence)** : une **قولة sur État + violence** est tombée à
    l'épreuve nationale علوم **2023** ; souvent rattachée au concept الدولة (axe
    « الدولة بين الحق والعنف ») plutôt que traitée comme notion autonome.
  - **السعادة (le bonheur)** : omise par AlloSchool/9rayti ; le thème du bonheur
    apparaît de façon incidente (Aristote, finalité de l'État) mais pas clairement
    comme notion examinable autonome en filière scientifique.
  → **Décision NON prise ici** : ces trois notions sont marquées
  `statut_scope: flagge` dans le YAML (possiblement hors-périmètre / sur-scopées).
  **À trancher sur le texte du cadre officiel + validation humaine.**

---

## Sources récupérées

### A. Cadre de référence officiel (MEN/CNEEO) — *non extractible en texte*
1. **MEN — page de publication des cadres de référence**
   - URL : https://www.men.gov.ma/Ar/Pages/Publication.aspx?IDPublication=7181
   - Émetteur : Ministère de l'Éducation nationale (MEN).
   - Format : portail officiel ; document cible = PDF/scanné. **Émetteur autoritatif** ;
     contenu non extrait en texte ici.
2. **الإطار المرجعي للفلسفة (Scribd)**
   - URL : https://www.scribd.com/document/732140219/
   - Format : document Scribd (protégé, non-texte). Réservé provenance, non ré-parsé.
3. **الإطار المرجعي لاختبار مادة الفلسفة — 2010, جميع المسالك (Scribd)**
   - URL : https://www.scribd.com/document/714666725/
   - Pertinence : version historique du cadre (structure stable) ; provenance seulement.
4. **AlloSchool — الإطار المرجعي للامتحان الوطني الموحد**
   - URL : https://www.alloschool.com/element/20823
5. **Index des cadres 2026 / 2025 (agrégateurs)**
   - https://www.afaqalmaghrib.com/الأطر-المرجعية-للامتحان-الوطني-2026/
   - https://www.jadid-alwadifa.com/الإطار-المرجعي-لامتحانات-البكالوريا/

### B. Épreuves nationales réelles — filières scientifiques (durée / coef / format)
6. **Épreuve nationale de philosophie 2024 — الشعب العلمية (profsalmi)**
   - URL : https://www.profsalmi.com/2024/06/exam-national-falsafa-2bac.html
   - Donne : **مدة الإنجاز ساعتان (2h)**, **المعامل 2**, **3 sujets** — (1) سؤال sur
     العدالة, (2) قولة sur الغير, (3) نص sur الحقيقة/المعرفة. **Exploité.**
7. **Épreuve nationale 2025 — الشعب العلمية والتقنية (profsalmi)**
   - URL : https://www.profsalmi.com/2025/05/exam-nat2025-philo-3olom.html
   - Corrobore durée 2h et le format à trois sujets. **Exploité.**
8. **Épreuve nationale 2023 — الشعب العلمية (profsalmi)**
   - URL : https://www.profsalmi.com/2024/02/exam-philo-2023-aleilmia.html
   - Contient la **قولة État+violence** (« كل دولة تولد عن طريق العنف… ») et un sujet
     sur الحقيقة → point d'appui du flag sur العنف. **Exploité.**
9. **Archive des épreuves nationales de philosophie (Moutamadris)**
   - URL : https://moutamadris.ma/امتحانات-وطنية-مادة-الفلسفة-الثانية-ب/
   - Usage : vérification transversale des notions effectivement tombées en filières
     scientifiques (couverture).

### C. Périmètre des notions par filière (structure du programme)
10. **AlloSchool — الفلسفة الثانية باك علوم فيزيائية** (arborescence de cours par filière)
    - URL : https://www.alloschool.com/course/alflsfa-althania-bak-alom-fiziaiia
    - Donne : **8 notions** (2 par module) — الشخص، الغير | النظرية والتجربة، الحقيقة |
      الدولة، الحق والعدالة | الواجب، الحرية. **N'inclut PAS** التاريخ / العنف / السعادة.
      **Source de triangulation A du périmètre.** **Exploité.**
11. **9rayti — programme الفلسفة filières scientifiques**
    - URL : https://www.9rayti.com/doros/programme/الفلسفة-الثانية-باكالوريا
    - Concorde avec la source 10 (mêmes 8 notions). **Source de triangulation B.** **Exploité.**
12. **Talamidi — دروس الفلسفة ثانية باك علوم**
    - URL : https://talamidi.com/دروس-الفلسفة-2-باك-علوم-pdf-2bac/
    - Confirme les 4 modules pour la filière « علوم » (granularité notions non lisible
      via fetch). Corroboration structurelle.
13. **Kezakoo — 2bac SPC (Sciences Physiques et Chimie), philosophie**
    - URL : https://www.kezakoo.com/cours/2bac/spc/
    - Corrobore le module الوضع البشري pour la filière scientifique SPC.

### D. Méthode (analyse de texte / dissertation) + grille d'évaluation
14. **Méthodologie تحليل ومناقشة نص فلسفي « وفقا للاطار المرجعي » (profsalmi)**
    - URL : https://www.profsalmi.com/2023/08/minhajiyat-nas-falsafi.html
    - Donne la **grille /20 du NÉS** : Fahm 4 / Tahlīl 5 / Munāqasha 5 / Tarkīb 3 /
      Aspects formels 3, avec sous-répartitions. **Source principale de la méthode.** **Exploité.**
15. **« 18/20 en philosophie » — étapes méthodiques + سلم التنقيط (taalimpress)**
    - URL : https://www.taalimpress.info/2019/05/18.html
    - Corrobore la grille 4/5/5/3/3. **Source de triangulation.** **Exploité.**
16. **Méthodes des trois sujets (نص / سؤال / قولة) — mostajad**
    - URL : https://mostajad.com/منهجية-تحليل-النص-الفلسفي-السؤال-ال/
    - Confirme la structure commune aux trois formats (مقدمة/عرض/خاتمة ; fahm/tahlīl/
      munāqasha/tarkīb). Grille chiffrée non reproduite sur la page.
17. **Corroboration interne au dépôt**
    - Fichiers : `docs/cadre/cadre.yaml`, `docs/cadre/bac-reference.md` (§5) — philosophie
      coefficient 2 dans les quatre filières scientifiques. Concorde avec les épreuves réelles.

---

## Confiance par bloc (résumé)

- **Format / durée / coefficient / grille /20 : ÉLEVÉE** (triangulation 6+7+8 pour
  le format & la durée ; 14+15 pour la grille).
- **Structure des 4 modules et des notions « cœur » (8) : ÉLEVÉE** (triangulation 10+11
  + présence en épreuve réelle).
- **Périmètre des 3 notions contestées (التاريخ / العنف / السعادة) : FAIBLE / à trancher.**
  Signaux contradictoires — voir section « Point de fidélité le plus sensible ». C'est
  la question dont dépend le verdict « leçon sur-scopée ou non ».
- **savoir_faire fins, limites, exclusions : `derived`** — à valider par le challenger
  puis l'humain.

## Upgrade prioritaire
Obtenir le **texte du cadre de référence officiel de philosophie** (source 1/2, ou la
version PDF-texte MEN) pour : (a) **trancher le périmètre des 3 notions contestées**,
(b) transcrire la grille القدرات المستهدفة × المضامين **verbatim** et confirmer les
grilles /20 des formats سؤال et قولة (ici alignées sur celle du نص, `derived`).
