# Docket de complétude des leçons — maths / PC

**Source unique : les SCOPE NOTES (et notes hors-rung apparentées) accumulées
en tête des `bank.yaml`.** Ce docket ne modifie aucune leçon ni banque — il
compile, classe et arbitre-prêt les écarts que les auteurs de banque ont déjà
signalés eux-mêmes, honnêtement, au fil de la transcription des annales
réelles. Périmètre : les 13 `bank.yaml` de `content/maths/` (13/13 notions,
toutes banquées) et les 18 `bank.yaml` de `content/pc/` qui existent à ce jour
(7 notions PC — `aspects-energetiques`, `atome-mecanique-newton`,
`controle-catalyse`, `lois-de-newton`, `propagation-onde-lumineuse`,
`transformations-deux-sens`, `transformations-lentes-rapides` — n'ont pas
encore de banque et sont hors périmètre de ce docket).

---

## Résumé chiffré

| | Compte |
|---|---|
| Fichiers `bank.yaml` lus (maths + PC) | 31 |
| Fichiers portant au moins une SCOPE NOTE de lacune d'outil | 22 |
| Fichiers sans aucune lacune d'outil signalée (« SCOPE NOTE : aucune » ou silence) | `calcul-integral`, `suivi-temporel-vitesse`, `decroissance-radioactive`, `evolution-spontanee`, `probabilites-conditionnelles`* |
| **Lacunes distinctes (notion · outil) après dédoublonnage** | **41** |
| — dont **catégorie A** (in-cadre, à intégrer) | **26** à l'audit (9 « contenu neuf à écrire », 17 « pont léger »). **Révisé le 2026-08-23 : 8 et 18.** A23 était classé « contenu neuf » sur un constat erroné — le rung existe depuis toujours au chapitre précédent (voir sa ligne) ; il est requalifié en pont léger, et posé |
| — dont **catégorie B** (cadre incertain, arbitrage owner) | **3** questions d'arbitrage (+ 1 précédent contextuel déjà tranché ailleurs) |
| — dont **catégorie C** (hors-corps assumé, correct tel quel) | **12** |

\* `probabilites-conditionnelles` a une SCOPE NOTE, mais elle recouvre la
même lacune que `denombrement` (variable aléatoire) — comptée une seule fois,
sous catégorie A7.

**Note de méthode sur les sources cadre.** `docs/cadre/curriculum/
pc-physique-chimie.yaml` porte le statut `COMPLETE` (ADR 0018) — haute
confiance. `docs/cadre/curriculum/maths-sm.yaml` et `maths-sexp.yaml`
portent tous deux l'en-tête `STATUT : PROPOSITION — NON AUTORITATIVE`
(en attente des trois portes RULES §5 : relecture Gemini, research-challenger,
validation humaine). Les classements A qui s'appuient sur ces deux fichiers
utilisent leur tier de provenance le plus solide (`research-consensus` : ≥2
sources indépendantes) mais héritent de cette réserve — signalé ligne par
ligne ci-dessous, pas juste ici.

---

## Catégorie A — In-cadre, à intégrer

### A · Maths — contenu pédagogique neuf à écrire

| # | Notion hôte | Outil manquant | Sujets qui le mobilisent | Pontage actuel | Recommandation |
|---|---|---|---|---|---|
| A1 | `structures-algebriques` | Critère de **sous-groupe** (checklist restreinte, ou critère compact) | 2019 q7 · 2022 q1 · 2023 q1+q8 · 2024 q8 — **5 occurrences sur 4 sujets** | Chaque entrée redécline le checklist à 4 axiomes du R3 sur le sous-ensemble, sans jamais nommer « sous-groupe » ni de critère dédié | Rung dédié juste après R3/R4. Cadre `maths-sm.yaml:247` (`research-consensus`, pdfmath) : « Groupe, **sous-groupe**, groupe commutatif » — figure explicitement au programme SM |
| A2 | `structures-algebriques` | **Anneau intègre** (absence de diviseurs de zéro) | 2022 q4a–c · 2023 q6 (implicite) — 2 occurrences | Définition introduite au point d'usage à chaque fois, jamais nommée par lesson.md (grep vérifié : 0 occurrence d'« intègre ») | Rung après R5/R6 (« anneau », « corps »). Cadre `maths-sm.yaml:248` : « Anneau (unitaire, commutatif, **intègre**) ; corps » — même ligne cadre que l'axiome « unitaire » déjà remonté P1 dans `docs/audits/content-correctness-docket-2026-07.md` (finding #2) : **les deux lacunes touchent le même couple de rungs R5/R6 et peuvent être corrigées dans la même passe d'auteur** |
| A3 | `nombres-complexes-1` **et** `nombres-complexes-2` | Résolution d'une **équation du second degré à coefficients complexes** (Δ potentiellement complexe, racine carrée reconnue comme carré parfait, formule (−b±δ)/2a ; relations de Viète en 2021 q1a) | nc-2 : 2017, 2019, 2020, 2021, 2022, 2024, 2025 (7/8 sujets vérifiés) + le sommet r-bac de nc-1 (2019) — **la lacune la plus citée de tout ce docket** | `reasoning` re-expose le geste (Δ carré parfait, ou Viète direct) à chaque occurrence, sans rattacher à un rung nommé — les deux notes de validation en pied des deux `lesson.md` sœurs le signalent déjà | Rung dédié, probablement en tête de `nombres-complexes-1` (avant le socle algébrique) — exactement la question que la SCOPE NOTE 1 de `nombres-complexes-2/bank.yaml` pose déjà. Cadre `maths-sm.yaml:224+228` (`research-consensus`) : « Résolution d'équations dans ℂ (second degré à coefficients complexes…) » listé nommément en programme ET en savoir-faire |
| A4 | `probabilites-conditionnelles` (+ écho dans `denombrement`) | **Variable aléatoire** (loi, espérance) et **loi binomiale** | `denombrement` 2018 q2/q3 · `probabilites-conditionnelles` 2023 q3 — 3 occurrences sur 2 notions | Chaque fois construite ad hoc depuis la définition d'une répétition d'épreuves indépendantes, sans rung | Nouveau rung dans `probabilites-conditionnelles` (notion hôte naturelle). **Déjà signalé indépendamment comme « LACUNE PRIORITAIRE »** par `maths-sexp.yaml:335` — ce docket confirme, depuis les banques, que la lacune a un coût concret (3 questions de bac déjà transcrites la contournent) |
| A5 | `equations-differentielles` | **Équation caractéristique générale** $ar^2+br+c=0$ pour $ay''+by'+cy=0$ (cas Δ>0 / Δ=0 / Δ<0) | 2022 q2a (bk-2022-n-x4, = sommet r-bac) | R4 ne couvre que $y''+\omega^2y=0$ (sans terme $y'$) ; `reasoning` autoportant, ré-explique la méthode de A à Z | **FAIT (2026-08-23).** Écrit comme **section terminale de R4**, et non comme rung « R4-bis » : renuméroter les rungs casserait les marqueurs de checkpoint, le menu de chapitres et les références croisées du corpus, pour un gain nul. La section « Le cas général : $ay''+by'+cy=0$ et son équation caractéristique » établit la substitution $y=e^{rx}$ (avec le pourquoi : seule famille dont les dérivées sont proportionnelles à elle-même), le trinôme, les trois cas de discriminant, un exemple travaillé avec contrôle, et le piège nommé (oublier le facteur $x$ du cas double, qui laisse une seule constante là où le second ordre en exige deux). Un « Arrête-toi » dédié **referme le rung sur lui-même** : $y''+\omega^2y=0$ est le cas 3 avec $\alpha=0$, et $e^{\alpha x}=1$ précisément parce qu'il n'y a pas de terme en $y'$ — c'est le terme en $y'$ qui amortit, ce qui donne au passage le pont vers le RLC amorti de la physique. **B1 reste ouvert** : la légitimité pédagogique est cadre-confirmée SM (`maths-sm.yaml:154+157`) et n'attendait pas d'arbitrage ; c'est l'appartenance filière du SUJET porteur, tagué SExp dans la transcription, qui reste à trancher par l'owner — indépendamment de ce rung |
| A6 | `derivabilite-etude-fonctions` (notion cible, actuellement sans rung) — mobilisé par `fonction-exponentielle` et `fonction-logarithme` | **Fonction réciproque** : existence (bijection continue strictement monotone), construction symétrique par rapport à $y=x$, **dérivée d'une réciproque en un point** | `fonction-exponentielle` 2020 q8a/b/c · `fonction-logarithme` 2021 Q7, 2024 Q5/Q5-b — 2 notions, récurrent | Grep vérifié : `derivabilite-etude-fonctions/lesson.md` (R0–R5) ne construit nulle part la fonction réciproque — ni les deux notions consommatrices. Chaque `reasoning` la reconstruit isolément | Rung dédié, probablement dans `derivabilite-etude-fonctions` (la notion générale de dérivation), avec cross-ref depuis `fonction-exponentielle`/`fonction-logarithme`. Cadre `maths-sexp.yaml:101` confirme : « Théorème de la fonction réciproque : traité de façon opératoire… » — explicitement au programme SExp |
| A7 | `geometrie-espace` | **Tangence droite–sphère** (généralisation du critère R9, qui ne couvre que plan–sphère) | 2022 q6 | `reasoning` transpose directement le critère plan-sphère à une droite (distance point-droite R8 + Pythagore) | Étendre R9 (ou ajouter un exemple) — généralisation directe et peu coûteuse du mécanisme déjà enseigné. Le produit vectoriel et la distance point-droite qui la portent sont eux-mêmes cadre-confirmés (`maths-sexp.yaml:218-220`) |
| A8 | `geometrie-espace` | **Médiatrice d'un segment** dans l'espace (lieu des points équidistants) | 2024 q7 | Reconstruite entièrement depuis le milieu (R1) + orthogonalité par produit scalaire (R2), jamais nommée | Addendum court après R1/R2 |
| A9 | `suites-numeriques` | Suite auxiliaire **« homographique »** (ratio $\dfrac{au_n+b}{cu_n+d}$, au-delà du simple $v_n=u_n-L$ de R8) | 2020 q4a · 2021 q5b · 2024 q3a — **3 sujets vérifiés sur 3** | Chaque `reasoning` nomme le geste et son rattachement le plus proche (R8), sans jamais prétendre qu'il est enseigné tel quel | Rung « R8-bis » — la totalité des sujets vérifiés de cette notion en dépendent, ce qui en fait un candidat à fort ratio couverture/effort |

### A · Maths — ponts légers (rung cible déjà existant ailleurs dans le corpus)

| # | Notion hôte | Outil manquant | Sujets | Cible du pont |
|---|---|---|---|---|
| A10 | `nombres-complexes-1` | Forme trigo/exponentielle, formules de rotation ($z'=e^{i\theta}z$…), vocabulaire « homothétie » | Les **7 sujets vérifiés** de la notion | `nombres-complexes-2` (déjà enseigné, R0–R6) — cadre `maths-sexp.yaml:250` confirme translation/homothétie/rotation en programme SExp |
| A11 | `denombrement` | Indépendance de deux événements $p(A\cap B)=p(A)p(B)$ | 2024 q4 | `probabilites-conditionnelles` R3 (déjà enseigné — indépendance/incompatibilité) |
| A12 | `fonction-exponentielle` | **Point d'inflexion** (changement de signe de $f''$) | 2022 q5c · 2020 q5 | `derivabilite-etude-fonctions` R5 (rung complet, avec checkpoint `cp-r5-inflexion`) |
| A13 | `fonction-exponentielle` | **Intégration par parties** (IPP) | 2019 (calcul de $\int 4xe^{-x}dx$) | `calcul-integral` (IPP confirmée en programme SExp, `maths-sexp.yaml:175`) |
| A14 | `fonction-exponentielle` | **Limite monotone** (suite décroissante minorée) | 2019 | `suites-numeriques` (rung adjacent à R8, cadre `maths-sexp.yaml:70` confirmé) |
| A15 | `fonction-logarithme` | Comparaison graphique $e^x$/$x$, $\ln(e^x)=x$, $xe^{-x}\to0$ | 2024 (Partie I) | `fonction-exponentielle` (déjà enseigné) |
| A16 | `arithmetique` | Formule de Moivre pour $(1+i)^p$ | 2023 q6–8 | `nombres-complexes-2` (déjà enseigné) — priorité basse, une seule occurrence |

### A · Physique — contenu pédagogique neuf à écrire

| # | Notion hôte | Outil manquant | Sujets | Pontage actuel | Recommandation |
|---|---|---|---|---|---|
| A17 | `piles` | **Schéma conventionnel** (notation à barres : anode/cathode, pont salin) | 2020 q2 (+ sommet r-bac déjà concerné) | Écart déjà présent dans `exercises.yaml` r-bac lui-même | **FAIT (2026-08-23).** Section « Le schéma conventionnel : écrire une pile en une ligne » ajoutée au R3 de `piles/lesson.md`, juste avant le checkpoint `cp-r3-anode-cathode` : les trois règles d'écriture (borne − à gauche, barre simple = frontière de phases, double barre = jonction/pont salin), le schéma complet de la Daniell, sa relecture de gauche à droite comme trajet des électrons dans le circuit extérieur, et le piège nommé (écrire la pile à l'envers) avec son contrôle — l'espèce à l'extrême gauche est celle qui s'oxyde. Cadre `pc-physique-chimie.yaml:509` : « Schématiser une pile (schéma conventionnel) » |
| A18 | `chute-mouvements-plans` | **Poussée d'Archimède** comme 3ᵉ force du bilan (R7 ne modélise qu'un bilan à 2 forces) | 2018 q1 · 2022 q2 · 2024 q1 — 3 occurrences | Ajout de la 3ᵉ force au même schéma de projection, à chaque fois | Étendre R7 pour mentionner explicitement le cas à 3 forces (prérequis d'hydrostatique/mécanique antérieur) |
| A19 | `dipole-rl` | Lecture d'une droite $di/dt = f(i)$ (pente → $L$, ordonnées → $R_1+r$) | 2024 q2a/q2b | R3 ne couvre que 2 méthodes de lecture de $\tau$ sur $i(t)$ (tangente à l'origine, 63 %) | 3ᵉ méthode de lecture à ajouter à R3 |
| A20 | `rc-charge` | Lecture d'une droite $du_C/dt = f(u_C)$ (pente → $E/RC$…) | 2021 q2 | R1 établit l'équation affine mais la leçon ne trace jamais ce type de graphe | 3ᵉ méthode de lecture, même logique qu'A19 |
| A21 | `rc-charge` | Association de deux condensateurs en **parallèle** ($C_{eq}=C_1+C_2$) | 2018 q1, q3 | R0–R4 n'étudient qu'un condensateur unique | Mention courte — prérequis d'électricité générale |
| A22 | `electrolyse` | Conversion **quantité de matière → volume de gaz** via le volume molaire ($n=V/V_m$) | 2018 q4 | R4 ne chiffre que des masses, jamais des volumes de gaz | Extension de R5 (« applications ») |
| A23 | `ondes-mecaniques-progressives` (ou `-periodiques`) | Définition générale d'**onde transversale** (perturbation ⊥ propagation) | `-periodiques` 2019 q1, 2020 q2 | ~~Seule la longitudinale est formellement définie (R4 de `-periodiques`) ; la transversale est déduite par contraste + rappel du chapitre précédent, qui ne la définit pas non plus formellement~~ | **RÉSOLU — et le constat de départ était FAUX (2026-08-23).** Le chapitre précédent définit bel et bien les deux : `ondes-mecaniques-progressives/lesson.md` R2 « Ondes transversales et longitudinales » pose le critère des deux directions et énonce la transversale mot pour mot (ligne 74), avec ses deux exemples fondateurs (corde, ressort) et une figure. La lacune n'était donc pas « contenu neuf à écrire » mais un simple **pont manquant** depuis `-periodiques`. Le pont est posé : un rappel du critère complet a été ajouté au R4 de `-periodiques`, renvoyant nommément au rung 2 du chapitre précédent. Aucun rung neuf n'était nécessaire |
| A24 | `ondes-mecaniques-progressives` | **Analyse dimensionnelle** (équations aux dimensions) | 2024 q3-1 | Outil transversal, jamais introduit par aucun rung d'aucune leçon de mécanique/électricité du corpus | Encart transversal — **cadre-confirmé** comme savoir-faire répété sur au moins 3 chapitres (`pc-physique-chimie.yaml:176,195,275`) sans jamais avoir de rung propre nulle part |

### A · Physique — ponts légers

| # | Notion hôte | Outil manquant | Sujets | Cible du pont |
|---|---|---|---|---|
| A25 | `rotation-axe-fixe` | Décomposition du poids sur un plan incliné ($mg\sin\alpha$) | 2024 q3 | `chute-mouvements-plans` (déjà enseigné) |
| A26 | `systemes-oscillants` | $W=-\Delta E_p$ (travail d'une force conservative) — R5 · **et** énergie cinétique de rotation $E_c=\frac12 J_\Delta\dot\theta^2$ — 2023 q2a | 2018 q3 · 2023 q2a | `aspects-energetiques` (référencé mais non chiffré ici) · `rotation-axe-fixe` R3 (dérivée en passant à la définition de $J_\Delta$, ligne 152-158 de son lesson.md — rung déjà présent, cible confirmée) |

---

## Catégorie B — Cadre incertain : questions d'arbitrage owner

**B1. `equations-differentielles` — l'équation caractéristique générale
appartient-elle au programme SExp, ou seulement SM ?**
Le sujet 2022 qui mobilise $ay''+by'+cy=0$ avec racine double (bk-2022-n-x4)
est tagué **filière SExp** dans la transcription (`bank.yaml` de
`calcul-integral` et `equations-differentielles`, cohérent entre les deux
fichiers). Or `maths-sexp.yaml:158` exclut explicitement ce cas pour SExp
(« PAS de $y''+ay'+by=0$ générale… qui relève du programme SM »), et le
fichier **s'auto-signale incertain sur ce point précis**
(`_flag_derive_fort`, ligne 159 : « à confirmer »). Le programme SM, lui, ne
fait aucun doute (`maths-sm.yaml:154`, `research-consensus`). Trois lectures
possibles, à trancher par l'owner avec le PDF cadre SExp en main : (a) la
limite SExp dérivée est trop stricte et doit être corrigée ; (b) le tag
filière de ce sujet 2022 est erroné ; (c) ce point du sujet 2022 déborde
légitimement le programme SExp officiel (un cas de « sujet plus dur que son
cadre », déjà vu ailleurs dans le corpus). La réponse ne change rien à la
légitimité du rung pour SM (voir A5) — elle détermine seulement si
`equations-differentielles` doit rester une leçon unique ou se
différencier par filière sur ce point.

**B2. `reactions-acido-basiques` (bk-2023-n-x1, q2.3) — formaliser un
résultat de pH pour un mélange équimolaire, ou confirmer l'exclusion
délibérée ?**
La question demande $pH=(pK_{A1}+pK_{A2})/2$ pour un mélange équimolaire
acide/base de deux couples. Le rung 8 de `reactions-acido-basiques` exclut
*explicitement*, par choix de conception, tout calcul analytique de ce type
(« Ce que ce chapitre ne couvre pas »). Le `reasoning` actuel re-dérive le
résultat depuis les seules définitions de $K_{A1}$/$K_{A2}$ (R4) et la
symétrie du tableau d'avancement (R7) — une synthèse légitime, pas une
formule mémorisée hors-programme — mais reste, dans son ensemble, au-delà de
ce que les rungs couvrent nommément. La SCOPE NOTE du fichier demande
elle-même l'arbitrage : est-ce qu'un futur rung formalise ce type de mélange
(promotion partielle d'un raisonnement de type Henderson-Hasselbalch), ou
l'exclusion délibérée du R8 doit-elle rester telle quelle et cette entrée
rester une synthèse ad hoc ?

**B3. `nombres-complexes-2` — le birapport mérite-t-il un rung, ou les
contournements de géométrie élémentaire restent-ils la doctrine ?**
Trois entrées (2017 q2c, 2021 q3b, 2025 q II.2c) demandent de montrer que
quatre points sont cocycliques. L'outil « manuel » standard est le
birapport — absent des deux `lesson.md` sœurs, et **absent aussi du cadre
SM extrait** (aucune occurrence de « birapport »/« cross-ratio » dans
`maths-sm.yaml`, silence complet plutôt qu'exclusion explicite). Les trois
entrées contournent l'outil avec de la géométrie élémentaire déjà enseignée
(cercles de Thalès, parallélogramme par affixes, angle inscrit) — un choix
d'auteur explicitement signalé comme tel, pas une couverture du birapport.
Question à trancher : le silence du cadre extrait signifie-t-il que le
birapport est hors-programme (les contournements sont la bonne réponse
durable, → catégorie C), ou est-ce un simple angle mort de l'extraction
(le birapport mérite un rung, → catégorie A) ? Le cadre SM étant encore au
statut PROPOSITION — NON AUTORITATIVE, cette question ne peut pas se
trancher depuis le dépôt seul.

**Précédent contextuel (pas une nouvelle question d'arbitrage) — statut du
produit vectoriel en filière SExp.** `geometrie-espace` l'enseigne sans
ambiguïté (R3) et aucune SCOPE NOTE de banque ne le remet en cause : les deux
lacunes réelles de cette notion (A7, A8) sont des généralisations du
mécanisme R8/R9, pas un doute sur le produit vectoriel lui-même. Mais le
cadre SExp extrait porte sa propre incertitude sur ce point
(`maths-sexp.yaml:222` : « Son statut d'objet TESTÉ… est incertain. À
trancher par l'humain ») et le même doute a déjà produit un P1 dans
`docs/audits/content-correctness-docket-2026-07.md` (« produit vectoriel
dans le programme SM »). Mentionné ici pour mémoire — precedent que ce type
de question a déjà, une fois, atteint l'owner par un autre canal — mais ne
requiert aucune action de ce docket.

---

## Catégorie C — Hors-corps assumé, ponté au point d'usage : correct tel quel

| Notion hôte | Outil hors-corps | Sujets | Pourquoi c'est la bonne réponse en l'état |
|---|---|---|---|
| `arithmetique` | Petit théorème de Fermat | 7/8 sujets vérifiés | Déjà traité, dans `lesson.md` lui-même, par un rupture-gate dédié (`cp-r6-fermat`) juste avant `[[exercise:r-bac]]` — même discipline que la banque, précédent établi et cohérent |
| `arithmetique` | Critère d'Euler | 2025 q1–3 | Entièrement re-dérivé dans le `reasoning` depuis Fermat + lemme d'Euclide (R6) — rien n'est admis sans démonstration, ce n'est pas un « outil manquant » mais une construction en règle |
| `arithmetique` | Analogue du théorème des restes chinois | 2021 q6–7 | Construit entièrement à partir de R4 (Bézout) — extension directe, pas un import extérieur |
| `fonction-exponentielle` | Théorèmes de Rolle et des accroissements finis (TAF) | 2019 (bk-2019-n-x4, filière **SM**) | Confirmé **spécifique SM** par le cadre (`maths-sexp.yaml:116` + `:303` : « PAS de Rolle/TAF » en SExp) — et la notion hôte naturelle (`derivabilite-etude-fonctions`) traite déjà Rolle/TAF exactement de la même façon dans son propre sommet r-bac : admis, ponté au point d'usage, jamais promu au rang de rung formel (R4 : « le théorème des accroissements finis, hors programme ici »). Convention maison cohérente sur deux notions — rien à corriger |
| `noyaux-masse-energie` | Raccourci $E_{lib}=E_\ell(\text{produit})-\sum E_\ell(\text{réactifs})$ | 2023 q2 | Corollaire direct de R2 ($E_\ell=\Delta m\,c^2$) + R4, re-dérivé explicitement dans le `reasoning`, pas assumé sans preuve |
| `chute-mouvements-plans` | Méthode d'Euler « à l'envers » (inverser l'équation différentielle pour retrouver $v$ à partir de $a$ donné) | 2023 q3c | Simple inversion de sens de la même récurrence d'Euler déjà enseignée (R8) — pas un outil neuf |
| `chute-mouvements-plans` | Décomposition multi-segments d'une distance parcourue | 2021 q3 | Composition de deux formules déjà établies (R1 et R7), jamais un troisième outil |
| `ondes-em-modulation` | Lecture de $F_p$/$f_s$/$S_m$/$U_0$ sur deux tensions d'entrée séparées plutôt que sur l'enveloppe de sortie | 2021 q2a/q2b | Même grandeurs, mêmes rungs (R2/R3), scénario de lecture différent — pas un nouvel outil |
| `rlc-serie` | Généralisation $R\to R+r$ dans les formules d'amortissement/entretien (R5, R7) | 2020 q1b/q2a · 2018 q2b | Substitution triviale (la résistance propre de la bobine s'ajoute à la résistance externe dans la même loi des mailles) — pas un concept neuf |
| `ondes-mecaniques-progressives` | Notion de milieu dispersif (renvoyée au chapitre suivant) | 2024 q1 (QCM) | Référence en avant assumée et délibérée dans la progression du corpus ; la question se résout par élimination des trois autres propositions, sans invoquer la définition manquante |
| `systemes-oscillants` | Hauteur d'un pendule $z=\ell(1-\cos\theta)$ | 2023 q1 | Géométrie élémentaire du cercle, jamais un rung requis pour ce genre de fait |
| `reactions-acido-basiques` | Calcul analytique $K_b=K_e/K_A$ pour recouper une lecture graphique de pH | 2018 q2 | R9 l'exclut *explicitement* par conception (« aucun calcul analytique du pH aux points remarquables ») et le `reasoning` de l'entrée ne s'en sert effectivement jamais — la donnée existe dans la source, la banque l'écarte à bon droit |

---

## Annexe — dépendances inter-notions (hors périmètre A/B/C)

Plusieurs SCOPE NOTES documentent des **valeurs numériques** (pas des
techniques) empruntées à un sujet-frère transcrit sous une autre notion :
`rlc-serie` bk-2019-n-x3/bk-2020-n-x4 empruntent $C$, $L$, $r$ à
`rc-charge`/`dipole-rl` (même sujet, partie différente) ; `rlc-serie`
bk-2021-n-x4 dépend d'une entrée `rc-charge` 2021 pas encore convertie au
moment de l'écriture. Ce ne sont pas des lacunes pédagogiques (le rung qui
donne la *méthode* est bien présent dans chaque leçon) — seulement des
provenances de données à surveiller si les fichiers sœurs sont réédités.
Aucune action recommandée ici.

`rlc-serie/bank.yaml` signale aussi que le sommet r-bac de sa propre notion
(`exercises.yaml`, statut `unsourced`) a une portée obsolète au regard de
deux sujets maintenant vérifiés (2018, 2020 — cas amorti) — candidats
directs au remplacement prévu par l'ADR 0019. C'est une question de
sourcing du sommet de leçon, pas une lacune de corps R : signalée pour
mémoire, hors périmètre de ce docket.
