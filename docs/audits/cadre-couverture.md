# Couverture du cadre — chaque ligne a-t-elle un chapitre qui l'enseigne et un item qui la teste ?

**Date : 2026-09-28 · Statut : audit en lecture seule, aucun fichier du dépôt modifié.**
**Périmètre :** `docs/cadre/curriculum/maths-sm.yaml`, `maths-sexp.yaml`, `pc-physique-chimie.yaml`.
SVT (gelée) et philosophie (hors périmètre) ne sont pas lues.

**La question retournée.** `DETTE-EXAMEN.md` partait des banques (`content/*/*/bank.yaml`) :
« que demande un sujet VÉRIFIÉ que la leçon ne montre pas ? ». Un filtre bâti sur ce qui existe ne
voit pas ce qui manque entièrement (ADR 0036). Ici on part du **cadre** : pour chaque ligne
`programme` et `savoir_faire`, trouver le chapitre (`##`/`###`) qui l'**enseigne** (un exemple
travaillé, pas une mention) et au moins un id `items.yaml` ou `checkpoints.yaml` qui la **teste**.

---

## 1. Synthèse

| Fichier cadre | Lignes lues (prog. + s-f) | COUVERT | ENSEIGNÉ-NON-TESTÉ | ÉNONCÉ-SEULEMENT | ABSENT | HORS-SCOPE-DÉCLARÉ |
|---|---|---|---|---|---|---|
| `maths-sm.yaml` | 77 (39 + 38) | 50 | 3 | 4 | 20 (dont 2 déjà connus : numération) | 0 |
| `maths-sexp.yaml` | 80 (38 + 42) | 73 | 0 | 2 | 5 | 0 |
| `pc-physique-chimie.yaml` | 186 (45 + 141) | 163 | 2 | 11 | 10 | 0 |
| **Total** | **343** | **286** | **5** | **17** | **35** | **0** |

*Commande qui produit la colonne « lignes lues ».* Deux instruments donnent le même compte : une
regex ligne à ligne et le parcours YAML ci-dessous.

```
python3 -c "import yaml
def w(n,a):
  if isinstance(n,dict):
    for k,v in n.items():
      if k in('programme','savoir_faire') and isinstance(v,list): a[k]+=len(v)
      else: w(v,a)
  elif isinstance(n,list): [w(x,a) for x in n]
for f in['maths-sm','maths-sexp','pc-physique-chimie']:
  a={'programme':0,'savoir_faire':0}; w(yaml.safe_load(open(f'docs/cadre/curriculum/{f}.yaml')),a); print(f,a)"
```

**Comment lire les comptes.**
- Une ligne composée prend la classe de son **atome le plus faible**. La mention « (partiel) »
  dans le détail signale que ses autres atomes sont couverts. Sur les 35 lignes ABSENT, 25 sont
  partielles et 10 sont entièrement absentes : EV ×3, numération ×2, `a^x`/`x^α`, dichotomie
  (SExp), radioélément de datation, dangers de la radioactivité, oscillateur composé.
- **HORS-SCOPE = 0.** Aucune leçon n'exclut explicitement une ligne comptée. Il existe pourtant
  deux exclusions **hors leçon** qui contredisent une ligne du cadre (voir §2, calcul intégral et
  suivi temporel) :
  - `content/maths/calcul-integral/checkpoints.yaml:78` : « Pas de sommes de Riemann formelles »
    (garde calibrée SExp) ;
  - `pc-physique-chimie.yaml:480` : exclusion `derived` « Dosages d'oxydo-réduction quantitatifs ».
- **Provenance des 57 lignes non couvertes.**
  - PC : 23 lignes, toutes imprimées au cadre (`cadre p.N`).
  - Maths, `programme` : 19 lignes en `research-consensus`, sauf `maths-sm.yaml:206` (`derived`)
    et les atomes « base a » (`derived`).
  - Maths, `savoir_faire` : 15 lignes, toutes `derived` (« NON vérifié verbatim. À VALIDER »).
- **Écart avec DETTE-EXAMEN.** 34 sujets distincts ne sont pas couverts, numération mise à part.
  DETTE-EXAMEN n'en nommait que 3 (Riemann, `x ↦ ∫ₐˣ f`, anneau intègre). Les autres étaient soit
  inédits, soit signalés ailleurs : REVIEW d'une notion, `coverage_notes` du cadre, commentaire
  d'`items.yaml`.

**Déjà connus, non ré-instruits (hors comptes nouveaux) :**
- `maths-sm.yaml:332` et `:338`, systèmes de numération 2.1.4–2.1.6. **ABSENT**, spécification en
  cours. [SM]
- Changement de variable en calcul intégral. C'est une ligne `limites` (`maths-sm.yaml:210`,
  `maths-sexp.yaml:222`) et non une ligne comptée : **HORS-SCOPE par décision de cadre**.

---

## 2. Lignes non couvertes, par notion (la plus grave d'abord)

Notation : `fichier:ligne` du cadre, puis un extrait verbatim court ; `[SM]`, `[SExp]` ou
`[commun]` indique la filière (les leçons de maths servent les deux) ; « Lu » donne les lignes de
leçon lues ; « Fix » donne le correctif minimal.

### 2.1 structures-algebriques [SM]

- **ABSENT** : `maths-sm.yaml:293` « Espace vectoriel réel ; sous-espace vectoriel ; combinaison
  linéaire ; famille génératrice, famille libre, base ; dimension… ». Même classe pour `:295` et
  `:296` (savoir-faire). Provenance `research-consensus` (pdfmath).
  - Lu : `structures-algebriques/lesson.md` en entier (R0–R7) ; aucune section.
  - Recherché : « espace vectoriel », « sous-espace », « famille libre/génératrice »,
    « combinaison linéaire », « dimension » → 0 occurrence d'enseignement dans tout `content/maths`.
  - Attestation d'examen : `structures-algebriques/bank.yaml:1468-1500` (« Montrer que E est un
    sous-espace vectoriel de (M₂(ℝ),+,·) »).
  - Déjà au cadre : `maths-sm.yaml:291`, `:453` (« LACUNE PRIORITAIRE »).
  - **Fix :** un chapitre R8 (sous-espace par le critère, famille libre ou génératrice, base et
    dimension en dimension 2 ou 3 sur M₂(ℝ) et ℝ²) et au moins 3 items.
- **ABSENT (partiel)** : `maths-sm.yaml:285` « Étudier un homomorphisme (noyau, image,
  propriétés) » (`derived`).
  - Lu : R7 `lesson.md:563-680` (isomorphisme, transport de structure, image du neutre). SA-29 et
    SA-30 couvrent l'image ; « noyau » ou « ker » → 0.
  - **Fix :** un paragraphe « noyau d'un morphisme de groupes = sous-groupe, et morphisme injectif
    ⇔ noyau réduit au neutre », avec un exemple et un item.
- **ENSEIGNÉ-NON-TESTÉ (partiel)** : `maths-sm.yaml:280` « Groupe, sous-groupe… » et `:284`
  « …un groupe / sous-groupe ».
  - Lu : section `## Sous-groupe` (`lesson.md:267-363`), qui porte un exemple travaillé dans
    l'habillage de l'examen (`:309`). Cette section **n'a pas de numéro R** : aucun item ne peut
    s'y rattacher par rung.
  - Aucun item ni checkpoint ne teste le critère de sous-groupe. SA-14 (`items.yaml:748`) vérifie
    (2ℤ,+) par les quatre axiomes. Seul `exercises.yaml:146` (r-bac, Partie C) l'exerce.
  - **Fix :** numéroter la section, puis deux items : critère à deux conditions (le piège « deux
    conditions sur trois ») et H non inclus dans E.
- **ENSEIGNÉ-NON-TESTÉ (partiel)** : `maths-sm.yaml:281` « Anneau (unitaire, commutatif,
  intègre) ; corps ».
  - Lu : `## Anneau intègre` (`lesson.md:439-517`), là aussi sans numéro R, avec les gestes
    « montrer que l'anneau n'est pas intègre » et « montrer qu'il l'est ».
  - « intègre » ou « diviseur de zéro » → 0 dans `items.yaml` et `checkpoints.yaml`.
  - La banque l'atteste (`dette-examen/maths.md:371`, `:400`).
  - **Fix :** numéroter la section et deux items (ℤ/6ℤ non intègre ; un produit nul dans M₂(ℝ)).

### 2.2 calcul-integral [SM, et une ligne commune]

- **ABSENT (partiel)** : `maths-sm.yaml:216` « …SOMMES DE RIEMANN (approche par sommes)… » et
  `:219` « Encadrer/approcher une intégrale par des sommes de Riemann » (`research-consensus`,
  spécifique SM).
  - Lu : `lesson.md` R1–R10 ; « Riemann » ou `\sum_{k` → 0.
  - La seule mention est une **exclusion hors leçon** : `checkpoints.yaml:78` « Pas de sommes de
    Riemann formelles », une garde écrite pour SExp, qui contredit le cadre SM.
  - Attestée à l'examen : `bank.yaml:31-37` (bk-2024-r-x2 q1-b).
  - Déjà signalé : `dette-examen/maths.md:106` (GAP-A déclaré par l'owner).
  - **Fix :** un chapitre SM « encadrer ∫₀¹ f par (1/n)Σf(k/n) pour f monotone » avec un exemple
    et 2 items ; marquer la garde de `checkpoints.yaml` « SExp seulement ».
- **ABSENT (partiel)** : `maths-sm.yaml:206` « …formes u'·uⁿ, u'/u, u'·e^u, u'·cos u, u'·sin u ;
  primitive vérifiant une condition » (`derived`) et `:208` « …imposer une condition ».
  **[commun]** avec `maths-sexp.yaml:217` « Déterminer une primitive (…u'·uⁿ, u'/u, u'·e^u) »
  (`derived`).
  - Lu : R1 `lesson.md:77-122`. u'/u et u'/u² y sont travaillés et testés (CI-51 à CI-56).
  - u'eᵘ est dans `fonction-exponentielle/lesson.md:369-400` (EXP-20 à EXP-22).
  - u'uⁿ → 0. sin/cos → 0 occurrence dans les 4 fichiers de calcul-integral.
  - La « primitive vérifiant une condition » n'apparaît qu'en tant que confusion nommée (`:125`).
  - Déjà au cadre : `maths-sm.yaml:448-450`.
  - **Fix :** une sous-section R1 « table des formes » avec un exemple u'uⁿ, un exemple
    u'cos u (SM) et un exemple F(x₀)=y₀, plus 3 items.
- **ÉNONCÉ-SEULEMENT (partiel)** : `maths-sm.yaml:217` « …fonctions définies par une intégrale
  (x ↦ ∫ₐˣ f)… » et `:220` « …étudier une fonction définie par une intégrale ».
  - Lu : `lesson.md:65-75`. Seul le cas ∫₁ˣ dt/t = ln x est calculé ; le résultat général
    (F' = f, F(a) = 0) n'est jamais énoncé comme outil. `:676-678` l'inscrit comme « dette
    écrite ».
  - **Testé sans être enseigné** : CI-10 (`items.yaml:799`) et CI-58 (`:3478`) exigent F' = f.
  - Déjà signalé : `dette-examen/maths.md:88`.
  - **Fix :** un paragraphe R1 avec l'énoncé et un exemple de variations de F lues sur le signe
    de f (le cas de CI-58).

### 2.3 fonction-exponentielle / fonction-logarithme [SM]

- **ABSENT** : `maths-sm.yaml:177` « Étudier a^x et x^α (domaine, dérivée, variations, limites) »
  (`derived`).
- **ABSENT (partiel)** : `maths-sm.yaml:174` « Exponentielle de base a (a^x = e^{x ln a}) ;
  fonctions puissances x^α (α réel)… ».
  - Provenance : les puissances relèvent de la capacité 1.3.15, `research-consensus`
    (« Maîtriser le calcul sur les puissances réelles ») ; « base a » est `derived`.
  - Lu : `fonction-exponentielle/lesson.md:111-134` et `fonction-logarithme/lesson.md:95-148`.
    Seules les puissances **entières** et la racine carrée y figurent. `log_a`, `a^x`, `x^\alpha`,
    `\sqrt[n]`, « puissance réelle » → 0.
- **ABSENT (partiel)** : `maths-sm.yaml:162` « Logarithme décimal ; logarithme de base a ;
  équations… ».
  - Lu : R6 `fonction-logarithme/lesson.md:463-479`. Le logarithme décimal y est travaillé et
    testé (LOG-21) ; la base a est absente.
  - Le cadre disait « À vérifier » (`maths-sm.yaml:493`, `:495`) : c'est vérifié, c'est absent.
  - **Fix commun :** un chapitre R-SM « a^x, logₐ, x^α et ⁿ√x » (domaine, dérivée, limites, un
    exemple d'étude) et 3 items. Y ajouter arctan : c'est une ligne `limites`
    (`maths-sm.yaml:155`), non comptée ici, mais attestée sur copie SM
    (`fonction-exponentielle/bank.yaml:1705-1715`) et absente des leçons.

### 2.4 limites-continuite [commun]

- **ABSENT (partiel)** : `maths-sm.yaml:111` « …image d'un segment ; TVI ; dichotomie » et
  `:128` « …localiser une solution par dichotomie ».
  - SExp : `maths-sexp.yaml:101` (« …méthode de dichotomie »), et **ABSENT** en entier pour
    `:106` « Encadrer/localiser une solution par dichotomie ».
  - Lu : R5 `lesson.md:302-345`. TVI et corollaires y sont travaillés et testés (LIMCONT-6, -17,
    -18). « dichotom », « bissection » ou « milieu de l'intervalle » → 0 dans tout
    `content/maths`.
- **ABSENT (partiel)** : `maths-sexp.yaml:102` « Image d'un intervalle / d'un segment par une
  fonction continue » (`research-consensus`).
  - Le cas strictement monotone est couvert ailleurs : `derivabilite-etude-fonctions/lesson.md:527-541`
    (DERIVFCT-34, -37).
  - Le théorème général (f(I) est un intervalle, f([a,b]) = [m, M]) est absent.
  - Déjà signalé : `limites-continuite/REVIEW-2026-09-11.md:92-103`, toujours ouvert.
  - **Fix :** ajouter à la méthode de R5 une étape « encadrer la solution par dichotomie » (sur
    x³+x−1 de `:325`), une sous-section « image d'un segment » et 2 items.

### 2.5 probabilites-conditionnelles [commun]

- **ABSENT (partiel)** : `maths-sm.yaml:397` « Variable aléatoire : loi, espérance, variance,
  écart-type ; … loi binomiale » et `maths-sexp.yaml:326` « …espérance, variance, écart-type ».
  - Lu : R5b `lesson.md:394-482` (loi, espérance) et R5c `:483-574` (binomiale, E = np). Ces deux
    parties sont couvertes (PC-M9 à PC-M14).
  - « variance », « écart-type », `V(X)`, `\sigma(X)` → 0.
  - Déjà signalé par l'auteur d'items : `items.yaml:52-56` et `:1751-1754` (« owner : à statuer
    séparément »).
  - **Fix :** un paragraphe R5b (V(X) = E(X²) − E(X)², σ = √V), la binomiale V = np(1−p), un
    exemple et 2 items.

### 2.6 nombres-complexes-2 / -1 [SM]

- **ABSENT (partiel)** : `maths-sm.yaml:256` « Formule de Moivre ; linéarisation ; racines
  n-ièmes… » et `:260` « …linéariser cosⁿ/sinⁿ… ».
  - Lu : R3 `nombres-complexes-2/lesson.md:218-238` (Moivre) et R2 `:153-179` (factorisation
    1 ± e^{iθ}, ce qui s'en approche le plus).
  - « linéaris », formules d'Euler, `\cos^n` → 0.
  - **Fix :** une sous-section R3 « formules d'Euler et linéarisation de cos³x » avec un exemple
    et 1 item (le geste sert aussi aux primitives de 2.2).
- **ABSENT (partiel)** : `maths-sm.yaml:257` « Résolution d'équations dans ℂ (second degré à
  coefficients complexes, équations se ramenant au 2e degré) ».
  - Lu : R4b `nombres-complexes-1/lesson.md:270-401` (2nd degré, coefficients complexes,
    NBCOMPLEX-38 à NBCOMPLEX-41) et R4 de nc-2 (zⁿ = a).
  - Aucune factorisation par racine connue, ni équation bicarrée.
  - **Fix :** un exemple (cubique avec racine donnée, puis 2nd degré) et 1 item.

### 2.7 arithmetique [SM]

- **ABSENT (partiel)** : `maths-sm.yaml:312` « PGCD, algorithme d'Euclide ; PPCM ; … ».
  - Lu : R3 `lesson.md:163-214` (PGCD seulement).
  - « PPCM » ou « multiple commun » → aucune définition ; le PPCM n'apparaît que comme distracteur
    de `cp-r3-pgcd-ppcm` (`checkpoints.yaml:195`).
  - La banque l'emploie : `bank.yaml:1479`, `:1684` (PPCM(23,10)).
  - **Fix :** un paragraphe R3 (définition, ab = PGCD × PPCM) avec un exemple et 1 item.
- Numération `:332` et `:338` : voir §1 (connu).

### 2.8 equations-differentielles [SM]

- **ÉNONCÉ-SEULEMENT (partiel)** : `maths-sm.yaml:187` « y''+ay'+by=0 : équation caractéristique,
  forme des solutions selon le discriminant » et `:190`.
  - Lu : `lesson.md:338-470`.
  - Δ < 0 avec α ≠ 0 (régime amorti) : seule la formule est posée (`:370`), aucun exemple.
  - Δ > 0 : exemple travaillé (`:388-406`) mais aucun item ; seul l'exercice r-variation le
    teste.
  - Δ = 0 : couvert (EQDIFF-31, -32, -33, `cp-r4-racine-double`).
  - La note du cadre `maths-sm.yaml:184` (« ne couvre PAS ») est périmée.
  - **Fix :** un exemple y'' + 2y' + 5y = 0 et deux items (Δ > 0 et Δ < 0).

### 2.9 suites-numeriques [SExp]

- **ÉNONCÉ-SEULEMENT (partiel)** : `maths-sexp.yaml:75` « Suites arithmétiques et géométriques
  (terme général, somme des termes) » et `:80` « …calculer une somme de termes consécutifs ».
  - Lu : R2 `lesson.md:135-143`, où les deux formules sont « admises » sans exemple.
  - SUITES-13 (`items.yaml:856`) teste la somme **arithmétique** seulement ; la somme géométrique
    n'est jamais testée, et la somme de u_p à u_n n'est pas posée.
  - **Fix :** un exemple de somme géométrique (de u_p à u_n) et 1 item.

### 2.10 systemes-oscillants [PC]

- **ABSENT** : `pc:319` « Appliquer 2e loi + RFD à un système oscillant composé (translation +
  rotation autour d'un axe fixe) ».
  - « poulie » ou « composé » → 0 dans la leçon et les items.
  - L'exercice r-bac de rotation-axe-fixe est composé mais n'oscille pas.
  - **Fix :** un exemple travaillé (solide + ressort + poulie de moment J) et 1 item.
- **ABSENT (partiel)** : `pc:315` « SOLIDE-RESSORT : … (horizontal/incliné/vertical) … déterminer
  les deux types d'amortissement à partir des diagrammes x_G(t) ».
  - Lu : R1 `lesson.md:33-114`, horizontal seulement.
  - « ressort vertical », « allongement », `\Delta l_0` → 0.
- **ABSENT (partiel)** : `pc:314` « …reconnaître l'amortissement, ses types et régimes ».
  - Lu : R6 `:343-414`, frottement **fluide** seulement (régimes testés par SO-19 à SO-33).
  - « frottement solide » ou « sec » → 0.
  - **Fix :** un exemple de ressort vertical (Δl₀ à l'équilibre) et un paragraphe
    « frottement solide → enveloppe linéaire », plus 2 items.
- **ABSENT (partiel)** : `pc:317` « PENDULE PESANT … ; définir le pendule simple synchrone et sa
  période propre ».
  - Lu : R3 `:182-273` ; « synchrone » → 0 dans tout `content/pc`.
  - **Fix :** 3 lignes (L_éq = J/(m·d)) et 1 item.

### 2.11 decroissance-radioactive / noyaux-masse-energie [PC]

- **ABSENT** : `pc:122` « Déterminer le radioélément convenable pour dater un événement ».
  - Lu : R5 `decroissance-radioactive/lesson.md:364-415`, où les formules de datation sont
    couvertes (DECRO-16 à DECRO-18, DECRO-37, DECRO-39).
  - Aucun choix d'isotope selon t½ par rapport à l'âge : « convenable », « adapté », « choisir »
    → 0.
  - **Fix :** un paragraphe (C-14 et ~10⁴ ans, U ou K et 10⁹ ans) et 1 item.
- **ABSENT** : `pc:134` « Reconnaître quelques applications et quelques dangers de la
  radioactivité ».
  - « danger », « risque », « radioprotection », « déchet » → 0. Les applications ne sont
    qu'effleurées (iode 131 en médecine, `decroissance-radioactive/lesson.md:348`).
- **ÉNONCÉ-SEULEMENT (partiel)** : `pc:127` « …utilisations de l'énergie nucléaire ».
  - Lu : `noyaux-masse-energie/lesson.md:226` (ITER) et `:242-255` (ordres de grandeur).
  - **Fix :** un encadré « applications et dangers » et 2 items.
- **ENSEIGNÉ-NON-TESTÉ (partiel)** : `pc:133` « Faire le bilan énergétique ΔE (énergies de masse,
  énergies de liaison, **diagramme d'énergie**) ».
  - Les bilans par les masses et par les énergies de liaison sont couverts (NME-6, NME-14 à
    NME-19).
  - Le diagramme d'énergie n'est travaillé que dans les corrigés d'exercices
    (`exercises.yaml:44`, `:68-77`, `:117`, `:139`) ; aucun item ni checkpoint.
  - **Fix :** 1 item de lecture de diagramme.

### 2.12 rc-charge / dipole-rl / rlc-serie [PC]

- **ABSENT (partiel)** : `pc:178`, `pc:197` et `pc:220` « Proposer un montage d'étude ; brancher
  oscilloscope / acquisition… ».
  - Le montage est décrit : `rc-charge/lesson.md:31`, `dipole-rl/lesson.md:98-119` (visualiser i
    par u_R0), `rlc-serie/lesson.md:392-431`.
  - Le **branchement** (quelle tension sur quelle voie, point commun, visualiser i) n'est enseigné
    nulle part : « voie », « branchement » → 0 dans les leçons d'électricité.
  - RLC-M7-5 exploite deux voies sans les faire brancher.
  - Voisin : `dette-examen/pc-2.md:104` (lecture d'oscilloscope).
  - **Fix :** une sous-section commune (RC) avec un schéma annoté et 1 item par notion.
- **ÉNONCÉ-SEULEMENT** : `pc:169` « Représenter u_R et u_C en convention récepteur ; préciser les
  signes des charges ».
  - Lu : `rc-charge/lesson.md:31-35`. La figure `media/rc-schema.svg` porte les signes ± des
    armatures et i, mais aucune flèche de tension.
  - « convention récepteur » n'apparaît que dans le corrigé `exercises.yaml:43`. Aucun item.
- **ÉNONCÉ-SEULEMENT** : `pc:172` « Connaître la capacité équivalente des associations
  série/parallèle et l'intérêt de chacune ».
  - Lu : `rc-charge/lesson.md:329-339`. Le parallèle est dérivé sans application chiffrée ; la
    série est posée en une phrase ; aucun item.
- **ÉNONCÉ-SEULEMENT (partiel)** : `pc:166` (programme) « …algébrisation en convention récepteur
  (i, u, q)… ; associations série/parallèle ».
  - **Fix :** un schéma fléché, un exemple chiffré série et parallèle et 2 items.
- **ENSEIGNÉ-NON-TESTÉ** : `pc:189` « Représenter u_R et u_L en convention récepteur ».
  - Lu : `dipole-rl/lesson.md:36-49` et la figure `media/bobine-modele-rl.svg` (i, u, ±). Aucun
    item.
  - **Fix :** 1 item.

### 2.13 rotation-axe-fixe [PC]

- **ABSENT (partiel)** : `pc:303` « Connaître/exploiter le mouvement de rotation uniformément
  varié et ses équations horaires ».
  - Lu : `lesson.md:300-321`. ω = θ̈·t est utilisé et testé (ROT-15, ROT-22) ; θ(t) =
    ½θ̈t² + ω₀t + θ₀ n'est jamais écrit.
- **ÉNONCÉ-SEULEMENT** : `pc:301` « Connaître/exploiter a_N et a_T en fonction des grandeurs
  angulaires ».
  - a_T = d·θ̈ est établi à l'intérieur d'une preuve (`:253-273`). a_N = r·ω² n'est jamais écrit :
    seul a_N = v²/R figure, dans `lois-de-newton/lesson.md:129-156`. Aucun item.
  - **Fix :** un encadré « équations horaires et a_N, a_T » et 2 items.

### 2.14 atome-mecanique-newton [PC]

- **ÉNONCÉ-SEULEMENT** : `pc:342` « Connaître et exploiter ΔE = h·ν ; expliquer le spectre de
  raies ».
  - Lu : R4 `lesson.md:183-205`, un énoncé et deux figures, sans exemple chiffré.
  - La relation est pourtant **testée** : AMN-14, AMN-18, AMN-30 et `cp-r4-planck`.
  - `dette-examen/pc-2.md:113` compte ce point comme « enseigné » ; ici on exige un exemple
    travaillé.
- **ÉNONCÉ-SEULEMENT** : `pc:338` (programme) « …quantification … des niveaux d'énergie (atome,
  molécule, noyau) ; applications aux spectres ».
  - La molécule est absente ; le noyau n'apparaît que par la désexcitation γ
    (`decroissance-radioactive/lesson.md:152`).
  - **Fix :** un exemple travaillé (ΔE → ν → λ, placé dans le visible).

### 2.15 etat-equilibre / suivi-temporel-vitesse [PC]

- **ÉNONCÉ-SEULEMENT** : `pc:448` « Utiliser la relation conductance G ↔ concentrations molaires
  effectives [Xi] des ions ».
  - Aucune leçon n'énonce σ = Σλᵢ[Xᵢ] ni G = k·σ. La loi n'apparaît que comme étape du corrigé
    `etat-equilibre/exercises.yaml:56-62`.
  - `suivi-temporel-vitesse/lesson.md:201-248` donne directement σ = σ₀ + kx.
  - Le test n'est que qualitatif : TLR-21, TLR-22, TLR-28 et `cp-r5-conductimetrie`.
  - **Fix :** une sous-section (dans etat-equilibre, avant `:74`) avec l'exemple de l'acide
    benzoïque et 1 item.
- **ÉNONCÉ-SEULEMENT (partiel)** : `pc:398` « Justifier les opérations d'un suivi temporel … ;
  repérer et exploiter l'équivalence lors d'un titrage » (cadre p.14).
  - Lu : `suivi-temporel-vitesse/lesson.md:33-41`. Le titrage par prélèvements n'y est que nommé ;
    la trempe est couverte (STV-1).
  - La relation à l'équivalence d'un titrage **d'oxydoréduction** n'est jamais posée.
  - **Conflit :** l'exclusion `derived` `pc-physique-chimie.yaml:480` (« Dosages
    d'oxydo-réduction quantitatifs ») contredit cette capacité imprimée. Aucune entrée de banque
    ne l'atteste (« thiosulfate » → 0) : c'est le cadre seul qui lie, et c'est à trancher par
    l'owner.

### 2.16 ondes-em-modulation / esterification-hydrolyse [PC]

- **ÉNONCÉ-SEULEMENT** : `pc:230` « Connaître les opérations de transformation de l'information
  en messages ; vitesse de transmission ».
  - Lu : `lesson.md:5-66`. La chaîne (capteur, codage, émission) n'est qu'évoquée dans l'accroche.
    Aucun item.
  - **Fix :** un schéma de chaîne et 1 item.
- **ÉNONCÉ-SEULEMENT (partiel)** : `pc:557` « …retrouver l'acide et l'alcool à partir de la
  formule semi-développée de l'ester ».
  - Lu : R1 `lesson.md:41-57`, sens acide + alcool → ester seulement. R2 `:68-75` ne donne que
    l'équation générale d'hydrolyse.
  - EH-6, EH-10 et EH-19 testent le sens direct.
  - **Fix :** un exemple inverse (HCOOC₃H₇ → acide + alcool) et 1 item.

---

## 3. Notes de couverture du cadre devenues fausses (ADR 0031 : une référence croisée est une instruction)

- `maths-sm.yaml:144` et `:472` (« ne couvre PAS Rolle/TAF ») : **faux**. `derivabilite-etude-fonctions/lesson.md:320-367`
  (R4b) existe.
- `maths-sm.yaml:184` et `:476` (« ne couvre PAS y''+ay'+by=0 ») : **faux en partie** (voir 2.8).
- `maths-sm.yaml:394` et `:454-456`, `maths-sexp.yaml:322`, `:373-375` et `:387` (« PAS la
  variable aléatoire ni la loi binomiale ») : **faux**. R5b et R5c existent ; seules la variance
  et l'écart-type manquent.
- `maths-sm.yaml:478` et `maths-sexp.yaml:379-381` (limites trigonométriques « à vérifier » ou
  « non couvertes ») : **faux**. R6 `limites-continuite/lesson.md:347-433` et LIMCONT-22 à -31
  existent.
- `maths-sm.yaml:474` (fonctions définies par une intégrale « à vérifier »), `:493` et `:495`
  (base a et puissances « à vérifier ») : **vérifié, c'est absent** (voir 2.2 et 2.3).

---

## 4. Méthode et limites

- **Unité.** Chaque élément des listes `programme` et `savoir_faire` compte pour une ligne, soit
  343. Les listes `limites`, `exclusions`, `travaux_pratiques` et `competences_ciblees` ne sont pas
  comptées ; elles ne servent qu'à repérer les exclusions contradictoires.
- **« Enseigné ».** Une section `##` ou `###` montre le geste **au travail sur un cas** : exemple
  travaillé ou dérivation appliquée. Le corrigé « attempt-first » d'un exercice r-bac ou
  r-variation, rendu dans la leçon, compte aussi. Ne comptent pas : une formule « admise » sans
  exemple, une mention en accroche, un distracteur, une note `<!-- -->`, une note hors-programme.
- **« Testé ».** Un id d'`items.yaml` ou de `checkpoints.yaml` dont la réponse correcte exige le
  geste. Un exercice seul ne suffit pas ; c'est signalé à chaque fois.
- **Comment j'ai décidé.**
  - J'ai indexé chaque notion (titres `#`/`##`/`###` et énoncés des items, checkpoints et
    exercices).
  - Pour chaque ligne non COUVERT, j'ai **relu** les sections voisines et prouvé l'absence par
    **plusieurs formes** de grep sur `lesson.md`, les items, les checkpoints et les exercices de
    toute la matière (ADR 0036). Les formes cherchées sont citées dans chaque entrée.
  - Les faux positifs ont été relus un par un (par exemple « combinaison linéaire » dans
    arithmetique ou « allongement » dans aspects-energetiques).
  - `bank.yaml` n'a servi qu'à l'attestation d'examen.
- **Ce que je n'ai pas relu en entier.** Pour les 286 lignes COUVERT, le jugement repose sur le
  titre de section, la présence d'un « Exemple travaillé » et au moins un item au rung
  correspondant. Leur texte n'a pas été relu intégralement.
- **Ce que je n'ai pas pu vérifier.**
  1. **La portée des items.** Plusieurs rungs n'ont aucun titre correspondant dans la leçon
     (commande ci-dessous) :
     - limites-continuite : R7 (LIMCONT-19, -20, -21) et `R-bac` (`cp-bac-produit-infini`) ;
     - derivabilite-etude-fonctions : R6 (DERIVFCT-19, -20, -21, -23, -29, `cp-bac-rolle`,
       `cp-bac-taf`). Le COUVERT de Rolle et du TAF repose sur ces items et sur DERIVFCT-41 ;
     - probabilites-conditionnelles : R6/R7 (PC-M1-3, PC-M8-2, PC-M8-3, `cp-bac-dependance`,
       `cp-bac-loi`).

     Je n'ai pas mesuré si ces items sont réellement servis. Commande : pour chaque notion,
     comparer `grep -o '\[R[^]]*\]'` des items aux `R<n>` des titres `##`/`###`.
  2. **La justesse** des corrigés et des items, et le **rendu** : les figures n'ont été lues que
     par leurs libellés SVG.
  3. **Le cadre maths lui-même.** Il est PROPOSITION (PDF scanné) ; ses `savoir_faire` sont
     `derived`. Un ABSENT d'origine `derived` pèse moins qu'un ABSENT `research-consensus` ou
     `cadre p.N` : base a, noyau, u'·cos u, primitive avec condition, « équations se ramenant au
     2e degré ».
  4. **Le choix de l'atome** dans une ligne composée est un jugement. Les unités et les exemples
     isolés (par exemple lim x·eˣ, les unités de λ par les dimensions) n'ont pas déclassé une
     ligne.
