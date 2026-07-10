/**
 * NotionBody
 *
 * Splits lesson markdown on inline media markers and renders them in authored
 * order, interleaving prose segments with SVG diagrams, animations, embeds,
 * checkpoints, and video elements.
 *
 * Supported marker syntax (one per line, no other text on that line):
 *   [[figure:<slug>]]      → StagedFigure when media/<slug>.stages.json exists,
 *                            else MediaDiagram (static SVG, legacy stepped reveal)
 *   [[motion:<slug>]]      → MotionDiagram (animated SVG from *.motion.svg)
 *   [[embed:<slug>]]       → EmbedPanel (embed descriptor from media/*.json)
 *   [[checkpoint:<id>]]    → CheckpointItem (inline formative MCQ from checkpoints.yaml)
 *   [[video:<slug>]]       → VideoElement (graceful: renders if asset exists, omits if not)
 *
 * ── Chapterize (LESSON-EXPERIENCE-SPEC §1.2, ledger 11.2) ───────────────────
 * A SECOND pass over the marker-split segments re-splits every `prose`
 * segment at `^##\s` lines (the marker split above is blind to headings) and
 * tags each resulting piece with a `chapterIndex`. Each chapter renders as
 * its own `<section data-chapter-section data-chapter-index=…>` — ALL of
 * them present in the DOM (SSG, print, in-page anchors — ledger 11.4);
 * `ChapterShell` (client, a wrapper the caller supplies) is the only thing
 * that toggles which one is visible. This file stays a SERVER component:
 * chapter VISIBILITY is someone else's job, chapter CONTENT is this file's.
 *
 * Progressive (stepped) figure reveal — TWO mechanisms, coexisting this commit
 * (LESSON-EXPERIENCE-SPEC §2, ledger 11.7):
 *
 *   NEW — StagedFigure (docs/design/LESSON-EXPERIENCE-SPEC.md §2): a sidecar
 *   media/<slug>.stages.json declares the stage captions; the slug's step
 *   groups are REMOVED from the SVG string (real DOM absence) above the
 *   current stage, not merely hidden. `initialStage = min(occurrence,
 *   stages.length)` — repeated placements of the same figure start
 *   pre-revealed at their historical level, exactly like the legacy
 *   mechanism below, which this one supersedes slug-by-slug as sidecars land.
 *
 *   LEGACY — the STEPPED_FIGURE_MAX_STEPS allowlist below + MediaDiagramFigure's
 *   `visibleSteps` (display:none injection): still active for any stepped slug
 *   that has NOT yet grown a .stages.json sidecar. Cumulative count is tracked
 *   at render time; the Nth occurrence of a slug shows step groups 1..N.
 *
 *   Both read the SAME global occurrence counter (`figureOccurrenceCount`,
 *   author order, computed ACROSS ALL CHAPTERS before any per-chapter
 *   rendering — spec §1.2, ledger 11.2's "piège n°1 pour un repreneur froid"):
 *   a slug is tracked in it the moment it appears in EITHER map below. The
 *   counter object is declared ONCE, outside the chapter loop; iterating
 *   chapters-then-segments visits every segment in the exact same authored
 *   order as the pre-chapterize flat pass did, so this invariant survives
 *   pagination unchanged.
 *
 * Unknown slugs → silent no-op (nothing rendered, no crash).
 * No [[…]] literal ever leaks to the rendered page.
 * No browser storage anywhere in this component tree.
 *
 * This is a SERVER component — no "use client".
 * CheckpointItem, MotionDiagram, MotionStage and StagedFigure are client
 * components imported here and hydrated in the browser.
 *
 * DESIGN-BIBLE §0: learning core is sacred; no engagement theater.
 * DESIGN-BIBLE §7: one primary thing per screen; prose and media interleave as authored.
 */

import type { ReactNode } from "react";
import type { EmbedDescriptor, CheckpointItem as CheckpointItemType, NotionExercise, NotionDerivation, MediaStagesSpec, InteractiveFigureConfigSpec, NotionItem } from "@/lib/content";
import type { MotionSpec } from "@/lib/motion-spec";
import { minutesForText } from "@/lib/chapters";
import { frenchTypography } from "@/lib/frenchTypography";
import { LessonRenderer } from "./LessonRenderer";
import { MediaDiagramFigure } from "./MediaDiagram";
import { MotionDiagram } from "./MotionDiagram";
import { MotionStage } from "./MotionStage";
import { StagedFigure } from "./StagedFigure";
import { EmbedPanel } from "./EmbedPanel";
import { CheckpointItem } from "./CheckpointItem";
import { AttemptFirstExercise } from "./AttemptFirstExercise";
import { Derivation } from "./Derivation";
import { ChapterQuestions } from "./ChapterQuestions";
import { ChapterTransport } from "./ChapterShell";

// ── Stepped figure configuration ─────────────────────────────────────────────
// Slugs listed here have step groups (id="step-1"…"step-N") in their SVG.
// The maximum step count is specified so we can cap the reveal at that maximum
// (e.g., the 5th occurrence of a 4-step figure still shows all 4 steps).
const STEPPED_FIGURE_MAX_STEPS: Record<string, number> = {
  "rlc-schema":  4,  // R0/R1/R2/R3 → steps 1/2/3/4
  "regimes-uc":  3,  // R0/R3-R4/R6 → steps 1/2/3
};

// ── Aria-label map for known figure slugs ────────────────────────────────────
// French captions read aloud by screen readers. Extend as new figures arrive.
const FIGURE_ARIA_LABELS: Record<string, string> = {
  "rlc-schema":          "Schéma du circuit RLC série",
  "regimes-uc":          "Les trois régimes de u_C(t)",
  "energy-exchange":     "Échange d'énergie E_C ↔ E_L",
  "energy-pendulum":     "Animation : échanges d'énergie E_C et E_L en antiphase",
  "regime-traces-forming": "Animation : les trois régimes se tracent de gauche à droite",
  "loi-des-mailles-build": "Animation : construction terme à terme de la loi des mailles",
  "amortissement-energie": "Animation : l'échange d'énergie continue mais l'énergie totale diminue, dissipée dans R",
  "entretien-compensation": "Animation : le générateur d'entretien compense la perte Joule sans imposer la fréquence",
  "origin-uc":           "Origine de la relation u_C = q/C",
  "origin-i":            "Origine de la relation i = dq/dt",
  "origin-uL":           "Origine de la relation u_L = L di/dt",
  "loi-mailles-build":   "Construction terme à terme de la loi des mailles",
  "rl-schema":           "Schéma du circuit RL série : générateur E, résistor R0, bobine (L, r)",
  "i-etablissement":     "Établissement du courant i(t) : montée exponentielle vers I_max, tangente à l'origine et repère à t = τ",
  // D10 wave A — PC électricité / ondes / nucléaire
  "rc-schema":           "Schéma du circuit RC série : générateur E, interrupteur K, résistor R, condensateur C",
  "uc-charge":           "Charge du condensateur : u_C monte vers E, constante de temps τ = RC, tangente à l'origine et méthode des 63 %",
  "uc-decharge":         "Décharge du condensateur : u_C décroît de E vers 0, constante de temps τ = RC, méthode des 37 %",
  "onde-propagation-retard": "Propagation d'une onde : la même perturbation à t1 puis à t2 = t1 + τ, décalée de d = v·τ",
  "transverse-longitudinal": "Onde transversale (corde) et onde longitudinale (ressort) : déplacement perpendiculaire ou parallèle à la propagation",
  "double-periodicite":  "La double périodicité : période spatiale λ sur y(x) et période temporelle T sur y(t), liées par λ = c·T",
  "dephasage":           "Déphasage entre deux points : concordance de phase (d = λ) et opposition de phase (d = λ/2)",
  "diffraction-fente":   "Diffraction par une fente de largeur a : écart angulaire θ = λ/a et largeur de la tache centrale sur l'écran",
  "dispersion-prisme":   "Dispersion de la lumière blanche par un prisme : le violet est dévié plus que le rouge (n_violet > n_rouge)",
  "modulation-amplitude": "Modulation d'amplitude : la porteuse haute fréquence dont l'amplitude suit l'enveloppe U0 + s_m(t)",
  "bonne-surmodulation": "Bonne modulation (m < 1) et surmodulation (m > 1) : l'enveloppe se distord quand le taux dépasse 1",
  "decroissance-courbe": "Décroissance radioactive : N(t) = N0·e^(−λt) avec les demi-vies successives N0/2, N0/4, N0/8",
  "tangente-tau":        "Constante de temps radioactive τ = 1/λ : tangente à l'origine, relation t½ = τ·ln 2, méthode des 37 %",
  // D10 wave B — PC mécanique / nucléaire
  "trajectoire-parabolique": "Trajectoire parabolique d'un projectile : décomposition de la vitesse initiale v0, flèche et portée",
  "deflexion-magnetique": "Déflexion magnétique d'une particule chargée : trajectoire circulaire dans le champ B, force de Lorentz centripète",
  "courbe-aston":        "Courbe d'Aston : énergie de liaison par nucléon E_l/A en fonction du nombre de masse A, maximum vers A = 56 (fer, noyau le plus stable), fusion et fission rapprochant du sommet",
  "defaut-masse":        "Le défaut de masse Δm sur l'exemple de l'hélium 4 : la masse du noyau est inférieure à la somme des masses de ses nucléons",
  "moment-force":        "Moment d'une force par rapport à un axe fixe : bras de levier d, pied de la perpendiculaire à la ligne d'action, M_Δ = ± d·F",
  "moment-inertie":      "Moment d'inertie : une tige homogène et un haltère de même masse et même longueur ont des J_Δ différents (rapport 3)",
  "travail-poids-chemin": "Le travail du poids est indépendant du chemin suivi : il ne dépend que du dénivelé entre départ et arrivée",
  "conservation-em":     "Conservation de l'énergie mécanique : les barres d'énergie cinétique E_C, d'énergie potentielle E_pp et d'énergie mécanique E_m au cours du mouvement",
  "deux-chariots-inertie": "Même force de 20 N sur deux chariots : le chariot de 10 kg accélère à 2,0 m/s², celui de 40 kg à 0,5 m/s² — les flèches d'accélération sont à l'échelle, rapport 4:1 inverse des masses",
  "plan-incline-forces": "Solide sur un plan incliné à 30° : bilan des forces (poids P, réaction normale N, frottement f), repère Ox/Oy lié au plan, et décomposition du poids en mg·sinα le long du plan et mg·cosα perpendiculairement",
  "pendule-elastique":   "Pendule élastique : le ressort et la masse aux trois états −Xm, 0, +Xm, et l'élongation x(t) = Xm·cos(ω0·t + φ) au cours du temps",
  "energie-oscillateur": "Énergie de l'oscillateur : l'énergie potentielle élastique E_pe et l'énergie cinétique E_c en antiphase, l'énergie mécanique E_m restant constante",
  // B2 wave P5 — systemes-oscillants pendule simple
  "bilan-pendule-simple": "Le pendule simple : la géométrie (fil de longueur L, angle θ avec la verticale, trajectoire en arc de cercle), le bilan des forces (poids et tension), la décomposition tangentielle −mg sin θ, puis l'équation où la masse se simplifie",
  // D10 wave C — PC chimie
  "avancement-tangente": "L'avancement x(t) et la tangente en un instant t1 : la pente de la tangente donne la vitesse volumique de réaction",
  "temps-demi-reaction": "Construction graphique du temps de demi-réaction t½ : ligne horizontale à x_f/2, descente verticale vers t½ sur l'axe des temps",
  // B2 wave P5 — suivi-temporel-vitesse accroche + lecture figures
  "prediction-avancement": "Accroche : deux hypothèses sur l'allure de x(t), une droite à vitesse constante et une courbe qui ralentit vers un plateau, puis la révélation qu'aucune droite ne correspond à l'observation réelle",
  "tangentes-decroissantes": "Deux tangentes à la courbe x(t) : une pente forte tout au début de la réaction et une pente faible près du plateau, montrant que la vitesse volumique de réaction diminue continûment",
  "lente-rapide":        "Transformation rapide et transformation lente : mêmes états initial et final, seule l'échelle de temps change",
  // B2 wave P5 — transformations-lentes-rapides facteurs + modèle microscopique
  "comparaison-facteurs-cinetiques": "Trois expériences empilées : la référence A, puis B où seule la concentration double, puis C où seule la température augmente — chaque barre de durée raccourcit, un seul paramètre changé à la fois",
  "chocs-efficaces": "Le modèle microscopique des chocs : les entités s'agitent et se rencontrent, seuls les chocs bien orientés et assez énergétiques réagissent ; plus de concentration multiplie les chocs, plus de température les rend plus énergétiques",
  "facteurs-cinetiques": "Un facteur cinétique change la vitesse, pas l'état final : plusieurs courbes x(t) atteignant le même plateau à des vitesses différentes",
  "effet-catalyseur":    "Pourquoi un catalyseur ne déplace pas l'équilibre : il accélère l'atteinte du même état final",
  "equilibre-concentrations": "Concentrations vers un équilibre dynamique : les réactifs diminuent, les produits augmentent, tous atteignent un plateau sans que les réactifs s'épuisent",
  "quotient-vers-K":     "Le quotient de réaction Qr(t) évolue vers l'asymptote K : à l'équilibre Qr,éq = K",
  "avancement-limite":   "Avancement d'une transformation limitée : x(t) plafonne à x_éq sous le plafond x_max, taux d'avancement final τ = x_éq/x_max < 1",
  // B2 wave P5 — transformations-deux-sens construction du ⇌ + expériences miroir
  "sens-direct-inverse": "Construction de la double flèche : le sens direct (estérification) seul, puis le sens inverse (hydrolyse), puis les deux sens réunis dans le symbole ⇌ — les quatre espèces coexistent en permanence",
  "experiences-miroir": "Deux expériences miroir sur un axe de composition : partir de l'acide et l'alcool purs ou partir de l'ester et l'eau purs — les deux mélanges évoluent en sens opposés vers la zone de coexistence",
  "diagramme-predominance": "Diagramme de prédominance du couple NH4+/NH3 sur l'axe des pH : NH4+ prédomine pour pH < pKA, NH3 pour pH > pKA, frontière à pH = pKA ≈ 9,2",
  "zones-predominance-2": "Diagrammes de prédominance des couples CH3COOH/CH3COO− (pKA1 ≈ 4,8) et NH4+/NH3 (pKA2 ≈ 9,2) : entre les deux pKA, les deux produits de la réaction prédominent simultanément",
  "critere-qr-k":        "Le critère d'évolution spontanée sur l'axe des Qr : évolution en sens direct si Qr,i < K, en sens inverse si Qr,i > K, équilibre quand Qr = K",
  "rendement-esterification": "Estérification : le taux d'avancement τ(t) monte vers sa limite d'équilibre, la réaction est limitée par l'hydrolyse inverse",
  // D10 waves D/E — PC quantique + maths
  "niveaux-energie":     "Niveaux d'énergie quantifiés de l'atome d'hydrogène : E_n = −13,6/n² eV, limite d'ionisation E = 0, transitions d'absorption et d'émission avec ΔE = h·ν",
  "spectre-raies":       "Spectre continu et spectre de raies : la lumière blanche donne une bande continue, l'atome n'émet que des raies discrètes (série de Balmer : 410, 434, 486, 656 nm)",
  "table-groupe":        "Table de Cayley du groupe (Z/4Z, +) : la ligne et la colonne du neutre 0 en évidence, et la lecture du symétrique (1 + 3 = 0 donc 3 est le symétrique de 1)",
  "suite-escalier":      "Construction en escalier de la suite récurrente u_{n+1} = f(u_n) : un point de départ u0 que l'on peut faire glisser sur l'axe, et l'escalier qui se reconstruit en direct en convergeant toujours vers le même point fixe ℓ",
  "convergence-limite":  "Convergence d'une suite : les points (n, u_n) entrent dans la bande ]ℓ−ε, ℓ+ε[ à partir du rang N et n'en sortent plus",
  "aire-sous-courbe":    "L'intégrale comme aire : la région entre la courbe v(t) = t² et l'axe des abscisses, avec une borne b que l'on peut faire glisser pour voir l'aire ∫ t² dt se recalculer en direct, jusqu'à retrouver 8/3 en b = 2",
  "aire-entre-courbes":  "Aire entre deux courbes : la lentille entre f(x) = x et g(x) = x² sur [0, 1], d'aire ∫ (f − g) = 1/6 unité d'aire",
  "plan-complexe":       "Le plan complexe : le point M d'affixe z = 3 + 4i, ses projections a et b sur les axes, le vecteur OM et le module |z| = 5",
  "module-argument":     "Conjugué et opposé dans le plan complexe : z̄ symétrique de z par rapport à l'axe réel, −z symétrique de z par rapport à l'origine O",
  "plan-normal":         "Un plan de l'espace et son vecteur normal n : un point A0 du plan, un point M générique, et la caractérisation M appartient au plan si et seulement si n · A0M = 0",
  "sphere-plan":         "Sphère et plan sécants : le centre S, la distance d = SH au plan, le rayon R et le cercle d'intersection de rayon √(R² − d²), avec le triangle rectangle SHM",
  "euclide-cascade":     "L'algorithme d'Euclide en cascade de barres à l'échelle : PGCD(252, 198) = 18, chaque reste devient le diviseur suivant jusqu'au reste nul",
  "courbe-exponentielle": "La courbe de l'exponentielle : passage par (0, 1) et (1, e), tangente y = x + 1 en 0, asymptote y = 0 en −∞, et la courbe de ln en miroir par rapport à y = x",
  "courbe-logarithme":   "La courbe du logarithme népérien : passage par (1, 0) et (e, 1), asymptote verticale x = 0, tangente y = x − 1 en 1 illustrant l'inégalité ln x ≤ x − 1",
  "famille-solutions":   "Famille de solutions de T′ = −0,1·T + 2 : plusieurs courbes selon la condition initiale, toutes convergeant vers le palier T = 20 ; la condition initiale T(0) = 90 en choisit une seule",
  "arbre-denombrement":  "Arbre des choix du principe multiplicatif : 3 entrées × 2 plats = 6 menus, chaque feuille numérotée",
  "arrangement-combinaison": "Arrangements et combinaisons : les 6 ordres du groupe {Amine, Sara, Karim} regroupés en une seule combinaison — diviser par 3! fait passer de A à C",
  "rotation-complexe":   "Rotation de centre A(2i) et d'angle π/2 dans le plan complexe : B(3 + 2i) a pour image C(5i), avec AB = AC et z_C − z_A = i·(z_B − z_A)",
  "racines-unite":       "Les racines n-ièmes de l'unité sur le cercle trigonométrique, avec un curseur sur n (de 3 à 8) qui redessine le polygone régulier des n racines, régulièrement espacées de 2π/n",
  "tangente-derivee":    "La dérivée comme pente de la tangente : la courbe d(t) = t², une sécante qui pivote vers la tangente en A, puis un point A que l'on peut faire glisser le long de la courbe pour voir la pente d′(t) se recalculer en direct",
  "asymptotes":          "Asymptote verticale x = 2 et asymptote horizontale y = 2 de la courbe de f(x) = 2 + 1/(x − 2), avec un point que l'on peut faire glisser sur la branche de droite pour voir f(x) se rapprocher de 2 sans jamais l'atteindre",
  "continuite-tvi":      "Le théorème des valeurs intermédiaires : sur [−1, 1], f continue passe de f(−1) = 2 à f(1) = −2, la droite y = k coupe la courbe en un point c où f(c) = k",
  "tableau-variations-courbe": "Le lien signe de f′ / variations : la courbe de f(x) = x³ − 3x, tangentes horizontales aux extremums (−1, 2) et (1, −2), bande +/−/+ et flèches de variation synchronisées",
  "pile-daniell":        "Schéma de la pile Daniell : demi-pile Zn/Zn2+ (anode, borne −) et demi-pile Cu/Cu2+ (cathode, borne +), pont salin, circulation des électrons dans le circuit extérieur",
  "cellule-electrolyse": "Cellule d'électrolyse : le générateur extérieur impose le courant, oxydation à l'anode reliée au +, réduction à la cathode reliée au −, migration des ions",
  // D-persistance wave — SVT (session non-Fable, D10 §4 close-out)
  "disjonction-alleles": "Disjonction des allèles pendant la méiose : un parent hétérozygote G//g produit deux types de gamètes, G et g, à parts égales — jamais un seul",
  "pedigree-drepanocytose": "Arbre généalogique de la famille R1 : I-1 (homme sain) et I-2 (femme saine), tous deux A//a, ont deux enfants — II-1 (femme atteinte de drépanocytose), homozygote a//a, et II-2 (homme sain), dont le génotype reste incertain entre A//A et A//a jusqu'au R5. Légende : carré = homme, cercle = femme, case pleine = atteint, case vide = sain, trait horizontal = union.",
  "sensibilisation-reaction-allergie": "Les deux phases de l'allergie : lors du premier contact, les mastocytes se couvrent d'IgE sans aucun symptôme (sensibilisation) ; ce n'est que lors d'un contact ultérieur que l'allergène ponte deux IgE déjà fixées, déclenchant la dégranulation et la libération d'histamine (réaction)",
  "comptage-alleles": "Comptage des allèles dans une population de 1 000 escargots : 550 individus B//B, 300 B//b et 150 b//b donnent 1 400 exemplaires de l'allèle B et 600 exemplaires de l'allèle b — la fréquence allélique p = 0,70 diffère de la fréquence génotypique f(B//B) = 0,55, car chaque hétérozygote compte pour une moitié dans chaque camp, jamais pour un individu entier dans un seul",
  "echiquier-gametes": "Échiquier des gamètes 2 sur 2 : en marge, la fréquence p du gamète B et la fréquence q du gamète b, en haut et à gauche. Quatre cases, chacune le produit de ses deux marges : B//B = p au carré, B//b = p fois q, B//b = q fois p, b//b = q au carré. Les deux cases B//b sont mises en évidence puis regroupées en 2pq. L'encart final réunit f(B//B) = p au carré, f(B//b) = 2pq, f(b//b) = q au carré, et conclut : p au carré plus 2pq plus q au carré égale 1.",
  "cascade-inflammatoire": "La cascade de la réaction inflammatoire aiguë : une griffure infectée et une entorse sans microbe convergent toutes deux vers la même lésion tissulaire, qui déclenche une alerte chimique locale, puis la vasodilatation (rougeur, chaleur), l'augmentation de perméabilité vasculaire (gonflement, douleur) et la diapédèse des phagocytes — la même chaîne, quelle que soit la cause.",
  "reponse-humorale-cellulaire": "Les deux voies de l'immunité adaptative : à gauche, un antigène libre sélectionne un lymphocyte B qui se différencie, après expansion clonale et signal du lymphocyte T4, en plasmocyte sécrétant des anticorps — une action indirecte (neutralise, agglutine, marque) sur une cible extracellulaire. À droite, une cellule infectée affichant un fragment viral sélectionne un lymphocyte T8 qui se différencie, après expansion clonale et signal du lymphocyte T4, en lymphocyte T cytotoxique détruisant la cellule infectée par contact direct — la seule des deux voies qui détruit réellement sa cible.",
  "plis-chevauchement": "Une coupe de terrain : à gauche, des couches sédimentaires plissées avec le raccourcissement horizontal qu'elles traduisent (≈100 km à plat réduits à 60–70 km une fois pliées) ; à droite, un chevauchement le long d'un plan de fracture incliné, où un calcaire plus ancien repose directement au-dessus d'un grès plus jeune — la preuve que ce bloc de croûte a été charrié par-dessus l'autre",
  "granite-texture-grenue": "Comparaison entre une roche refroidie lentement en profondeur, à texture grenue (le granite, gros cristaux de quartz, feldspath, mica), et une roche refroidie rapidement en surface, à grain fin (une lave volcanique) — le granite est une roche plutonique, jamais volcanique",
  "cmh-abo-independants": "Comparaison CMH et ABO pour le choix d'un donneur de rein : le patient, son frère jumeau monozygote et un donneur non apparenté partagent le même groupe sanguin ABO, mais seul le jumeau partage un profil CMH identique à celui du patient — le donneur non apparenté a un CMH différent malgré l'ABO compatible, d'où un risque de rejet plus élevé",
  "cycle-enzyme-substrat": "Le cycle enzyme-substrat en quatre étapes : la rencontre forme un complexe enzyme-substrat, la transformation (hydrolyse) coupe le substrat, la libération relâche les produits, puis le recommencement montre le site actif redevenu libre et identique — la même petite région de l'enzyme, jamais consommée, à chaque cycle",
  "expansion-oceanique": "Coupe d'une dorsale océanique : deux plaques de lithosphère rigide s'écartent symétriquement de l'axe ; de la matière chaude de l'asthénosphère ductile remonte par un étroit conduit à l'axe, s'y solidifie, et devient la lithosphère la plus jeune de chaque plaque, avant d'être poussée vers l'extérieur à mesure qu'elle vieillit — le plancher se crée en continu, il ne glisse pas sur un fond fixe",
  "respiration-fermentation": "Schéma comparatif : la glycolyse, dans le cytoplasme, est l'étape commune de départ — une molécule de glucose donne 2 pyruvate et 2 ATP net. En présence de dioxygène, la respiration cellulaire fait entrer le pyruvate dans la mitochondrie (cycle de Krebs dans la matrice, chaîne respiratoire sur la membrane interne repliée en crêtes), pour un bilan d'environ 36 à 38 ATP par glucose, avec formation de CO2 et d'eau. En l'absence de dioxygène, la fermentation se déroule entièrement dans le cytoplasme, sans aucune mitochondrie : elle régénère le NAD+ nécessaire à la poursuite de la glycolyse et produit tout de même 2 ATP par glucose — jamais zéro — avec formation d'acide lactique ou d'éthanol et de CO2.",
  // B2 wave S1 — SVT tectonics (chaines-de-montagnes)
  "subduction-andes": "Coupe d'une subduction andine : la plaque océanique refroidie plonge sous la plaque continentale en creusant la fosse ; en s'enfonçant elle relâche de l'eau qui abaisse le seuil de fusion du manteau, d'où un arc volcanique décalé vers l'intérieur ; les foyers sismiques s'alignent sur un plan incliné qui s'enfonce — la preuve qu'une plaque rigide plonge encore",
  "collision-himalaya": "Quatre étapes de la collision himalayenne : un océan (la Téthys) entre l'Inde et l'Asie, dont la lithosphère océanique subduit ; l'océan se referme ; au contact des deux marges continentales, trop légères pour plonger, la subduction s'arrête ; la convergence continue alors épaissit la croûte, dont la colonne double (≈35 → 70-80 km) et porte la chaîne très haut",
  "sequence-ophiolite": "La séquence ophiolitique — basaltes en coussins, gabbro, péridotite du haut vers le bas — d'abord telle qu'elle se forme au plancher océanique, puis retrouvée intacte coincée entre deux blocs de granite continental à haute altitude : un vrai morceau de plancher océanique préservé, la preuve qu'un océan a existé ici puis s'est refermé",
  "enfouissement-exhumation": "Le trajet vertical d'une roche sur une échelle de profondeur : une roche sédimentaire de surface entraînée à ~30 km par l'empilement de la croûte, où de fortes pression et température la recristallisent sans la fondre (gneiss), puis ramenée en altitude par le soulèvement tectonique et l'érosion combinés — la preuve d'un enfouissement profond",
  // B2 wave S1 — SVT dysfonctionnements-immunitaires (3 StagedFigures)
  "rupture-tolerance-deux-voies": "La rupture de tolérance et ses deux voies : normalement les clones auto-réactifs sont éliminés ; dans une maladie auto-immune un tel clone survit et s'active contre une molécule du soi. Voie cellulaire — des LT8 cytotoxiques détruisent par contact des cellules β saines (diabète de type 1) ; voie humorale — des auto-anticorps forment des complexes immuns qui s'accumulent dans les articulations (polyarthrite rhumatoïde)",
  "vih-lt4-charge-virale": "Évolution au cours des années de deux grandeurs sur les mêmes axes : le nombre de LT4 chute, remonte partiellement, puis décline lentement jusqu'à l'effondrement ; la charge virale évolue presque à l'inverse (pic, chute, plateau bas, remontée finale). Sous le seuil critique d'environ 200 LT4 par mm³, la phase SIDA s'ouvre aux infections opportunistes",
  "titre-anticorps-vaccin-serum": "Titre d'anticorps dans le sang au cours du temps pour les deux traitements, sur les mêmes axes : après un vaccin, montée lente puis plateau durable, avec une remontée brutale au rappel (immunité active, mémoire) ; après un sérum, titre élevé immédiatement puis chute en quelques semaines, sans rebond (immunité passive, aucune mémoire) — deux miroirs inversés",
  // B2 wave S1 — SVT granitisation-deformation (4 StagedFigures)
  "pli-faille-profondeur": "Coupe verticale de la croûte, comprimée horizontalement à toutes les profondeurs : la même couche sédimentaire casse le long d'une faille près de la surface, où elle est froide et peu confinée, et se plie sans casser en profondeur, où elle est chaude et fortement confinée — avec une bande de transition fragile-ductile marquée vers 10 à 15 kilomètres",
  "facies-jauge-profondeur": "Une même pélite, suivie en profondeur croissante : à quelques kilomètres, à peine transformée ; vers 10 kilomètres, un schiste feuilleté ; vers 20 kilomètres, un gneiss rubané ; au-delà de 25 kilomètres, une migmatite mêlant zones solides et zones fondues — chaque faciès lit une profondeur",
  "solidus-seuil-anatexie": "Diagramme pression-température : le trajet d'enfouissement d'une roche continentale reste solide en se métamorphisant (schiste, gneiss), n'atteint jamais le solidus sec, mais franchit vers 25 à 30 kilomètres le solidus abaissé par l'eau, vers 650 à 700 degrés — déclenchant une fusion partielle, l'anatexie",
  "exhumation-erosion-granite": "Coupe verticale d'une chaîne de collision juste après l'épaississement : un gneiss vers 20 kilomètres et un pluton de granite vers 30 kilomètres, tous deux enfouis sous une haute chaîne. Le soulèvement tectonique pousse la croûte vers le haut pendant que l'érosion décape progressivement le sommet, exposant d'abord le gneiss puis, bien plus tard, le granite",
  // B2 wave S1 — SVT genetique-humaine (2 StagedFigures)
  "croisement-lie-x": "Échiquier de croisement lié à l'X : mère porteuse XᴬXᵃ croisée avec père sain XᴬY. Filles XᴬXᴬ et XᴬXᵃ, toutes saines ; fils XᴬY sain et XᵃY atteint. Le fils XᵃY est hémizygote — un seul X, aucun second X pour masquer Xᵃ — contrairement à sa sœur XᴬXᵃ, porteuse mais saine. Bilan : 0 % des filles atteintes, 50 % des fils atteints.",
  "proba-enfant-atteint": "De l'échiquier à l'arbre pondéré : le croisement A//a × A//a de I-1 et I-2 donne 1/4 A//A, 2/4 A//a, 1/4 a//a. Sachant II-2 sain, a//a est éliminé et les deux cas restants sont renormalisés sur 3/4 : P(A//A) = 1/3, P(A//a) = 2/3. L'arbre pondéré de l'enfant à naître III-1 combine les deux branches : P(III-1 atteint) = 2/3 × 1/4 + 1/3 × 0 = 1/6.",
  // B2 wave S2 — SVT liberation-energie-matiere-organique (4 figures)
  "atp-hydrolyse-cycle": "L'ATP schématisé : trois phosphates chargés qui se repoussent (molécule instable) ; l'hydrolyse détache le phosphate terminal (ADP + Pᵢ) en libérant l'énergie ; puis la boucle de régénération ADP + Pᵢ → ATP alimentée par le glucose — une monnaie qui circule, pas une réserve",
  "glycolyse-bilan-atp": "Le bilan de la glycolyse dans le cytoplasme, compteur d'ATP à l'appui : 2 ATP investis (bilan −2), le glucose (6 C) scindé en deux fragments à 3 C sans CO₂, puis 4 ATP produits (+ 2 NADH,H⁺) — bilan net 4 − 2 = +2 ATP par glucose, pas 4",
  "krebs-bilan-carbone": "Le comptage du carbone dans la matrice mitochondriale : les 2 pyruvate perdent chacun 1 C (2 CO₂) puis le cycle tourne deux fois (4 CO₂ de plus, coenzymes réduits chargés) — bilan 2 + 4 = 6 CO₂, les six carbones du glucose sont tous partis : oxydation complète",
  "chimiosmose-atp-synthase": "La chimiosmose sur la membrane interne : les coenzymes réduits cèdent leurs électrons aux complexes de la chaîne, qui pompent des H⁺ vers l'espace intermembranaire ; le gradient ainsi créé ne se décharge que par l'ATP synthase, qui assemble l'ATP ; le dioxygène accepte les électrons en bout de chaîne (→ H₂O) et débloque l'ensemble sans fabriquer lui-même l'ATP",
  // B2 wave S2 — SVT moyens-de-defense (5 figures)
  "phagocytose-etapes": "Les cinq étapes de la phagocytose d'une bactérie par un phagocyte : chimiotactisme (attraction à distance), adhérence, ingestion dans un phagosome, digestion après fusion avec un lysosome, puis rejet des débris — la bactérie est englobée et dissoute, pas tuée au contact",
  "selection-clonale": "La sélection clonale : parmi des millions de clones de lymphocytes B aux récepteurs de formes différentes, l'antigène ne se lie qu'au clone dont le récepteur épouse sa forme (il sélectionne un clone préexistant, il n'en crée aucun) ; ce clone se multiplie par expansion clonale puis se différencie en plasmocytes et lymphocytes B mémoire",
  "anticorps-agglutination": "L'action des anticorps : une forme en Y à deux sites de fixation identiques, chacun se liant à une bactérie (complexe immun), reliant les bactéries en un amas visible (agglutination) ; les bactéries agglutinées restent intactes, marquées — c'est un phagocyte qui les élimine ensuite : l'anticorps prépare, il ne tue pas",
  "lt8-cytotoxicite": "La cytotoxicité du LT8 : une cellule infectée affiche à sa surface des fragments viraux (soi modifié) ; un LT cytotoxique reconnaît spécifiquement ce fragment, entre en contact direct et déclenche l'autodestruction de la cellule — le virus est éliminé avec elle, avant qu'il ne produise de nouvelles particules",
  "reponse-primaire-secondaire": "Le titre d'anticorps au cours du temps (échelle log) pour deux rencontres avec le même antigène : la réponse primaire démarre lentement vers un pic modeste (~100 UA) ; la réponse secondaire démarre plus vite vers un pic bien plus élevé (~10 000 UA) et plus durable — l'effet des cellules mémoire",
  // B2 wave S2 — SVT role-enzymes (4 figures)
  "double-specificite": "La double spécificité d'une enzyme : parmi plusieurs molécules, seul l'amidon de forme complémentaire entre dans le site actif (spécificité de substrat) ; et la coupure se fait toujours au même endroit, donnant toujours du maltose (spécificité d'action) — deux propriétés distinctes : sur qui, et quoi lui faire",
  "courbe-temperature": "L'activité de l'amylase en fonction de la température : elle monte de 0 à 37 °C, atteint un maximum à l'optimum thermique (~37 °C), puis s'effondre au-delà de 40-45 °C parce que l'enzyme se dénature — un effondrement irréversible, pas un simple ralentissement",
  "courbe-ph": "L'activité enzymatique en fonction du pH : l'amylase salivaire a son optimum vers pH 7 (la bouche), la pepsine vers pH 2 (l'estomac) — chaque enzyme a son propre optimum de pH, ce qui explique leur répartition le long du tube digestif",
  "concentration-substrat-enzyme": "Deux graphes de la vitesse de réaction : à enzyme fixée, la vitesse croît avec la concentration en substrat puis plafonne (palier de saturation, tous les sites actifs occupés) ; à substrat en excès, la vitesse croît proportionnellement à la quantité d'enzyme (une droite) — un palier d'un côté, une droite de l'autre",
  // B2 wave S2 — SVT soi-non-soi (2 figures)
  "specificite-cle-serrure": "La spécificité antigène-anticorps : un antigène porte un site de forme précise ; l'anticorps spécifique s'y emboîte par complémentarité (la clé dans sa serrure) ; un autre anticorps de forme non complémentaire ne s'emboîte pas — la reconnaissance est spécifique, pas floue",
  "agglutination-transfusion": "Le mécanisme d'une transfusion incompatible (receveur A, donneur B) : le plasma du receveur contient déjà l'agglutinine anti-B ; les hématies du donneur arrivent portant l'agglutinogène B ; l'anti-B se lie à l'agglutinogène B (clé-serrure) et chaque anticorps relie plusieurs hématies en un amas — l'agglutination qui obstrue et provoque l'hémolyse",
  // B2 wave S2 — SVT transmission-caracteres (2 figures)
  "echiquier-dihybride": "L'échiquier du dihybridisme : chaque parent F1 (double hétérozygote C//c ; L//l) produit quatre types de gamètes en proportions égales ; l'échiquier 4 × 4 donne seize combinaisons, regroupées par phénotype en un rapport caractéristique 9 : 3 : 3 : 1",
  "test-cross-deux-hypotheses": "Le croisement-test : l'individu gris de génotype inconnu est croisé avec un testeur homozygote récessif g//g, qui ne produit qu'un seul gamète. Si l'individu est G//G, toute la descendance est grise (100 %) ; s'il est G//g, elle se partage 1/2 grise : 1/2 blanche — le rapport observé révèle directement le génotype caché",
};

function figureAriaLabel(slug: string): string {
  // Route through frenchTypography so the screen-reader-announced layer carries
  // the same curly apostrophe / narrow-no-break-space orthotypography as the
  // visible copy (ADR 0024 content pass — the announced layer must not regress).
  return frenchTypography(FIGURE_ARIA_LABELS[slug] ?? slug.replace(/-/g, " "));
}

// ── Step caption map: (slug × stepNumber) → caption text ─────────────────────
// Human-readable caption for each step of a progressive figure.
const STEP_CAPTIONS: Record<string, Record<number, string>> = {
  "rlc-schema": {
    1: "Étape 1 — la boucle nue : condensateur C et bobine L en série, interrupteur K.",
    2: "Étape 2 — le courant i et sa flèche apparaissent dans la boucle.",
    3: "Étape 3 — les tensions u_C et u_L sont étiquetées en convention récepteur.",
    4: "Étape 4 — la résistance R et u_R entrent dans le circuit.",
  },
  "regimes-uc": {
    1: "Étape 1 — régime périodique (R ≈ 0) : sinusoïde parfaite, amplitude constante.",
    2: "Étape 2 — régime pseudo-périodique ajouté : les oscillations s'amortissent.",
    3: "Étape 3 — régime apériodique ajouté : retour monotone vers zéro, sans oscillation.",
  },
};

function stepCaption(slug: string, step: number): string | undefined {
  return STEP_CAPTIONS[slug]?.[step];
}

// ── Marker regex ──────────────────────────────────────────────────────────────
// Matches an entire line that is ONLY a [[type:slug]] marker.
// Whitespace before/after the marker on the line is tolerated.
// Slug character set: lowercase letters, digits, hyphens.
// Also matches checkpoint IDs which may contain uppercase and underscores:
//   [[checkpoint:cp-r3-m1]]
// So we use a broader character class for the id part: [a-zA-Z0-9_-]+
const MARKER_LINE_RE =
  /^\s*\[\[(figure|motion|embed|checkpoint|video|exercise|derivation):([a-zA-Z0-9_-]+)\]\]\s*$/;

// ── Segment types ─────────────────────────────────────────────────────────────

type ProseSegment      = { kind: "prose";      md: string };
type FigureSegment     = { kind: "figure";     slug: string };
type MotionSegment     = { kind: "motion";     slug: string };
type EmbedSegment      = { kind: "embed";      slug: string };
type CheckpointSegment = { kind: "checkpoint"; id: string };
type VideoSegment      = { kind: "video";      slug: string };
type ExerciseSegment   = { kind: "exercise";   slug: string };
type DerivationSegment = { kind: "derivation"; slug: string };

type Segment =
  | ProseSegment
  | FigureSegment
  | MotionSegment
  | EmbedSegment
  | CheckpointSegment
  | VideoSegment
  | ExerciseSegment
  | DerivationSegment;

/**
 * Split lesson markdown into an ordered list of prose and marker segments.
 * Every line lands in exactly one segment — no content is dropped.
 * Order matches the authored order of the markdown source.
 */
function splitIntoSegments(markdown: string): Segment[] {
  const lines = markdown.split("\n");
  const segments: Segment[] = [];
  let proseLines: string[] = [];

  for (const line of lines) {
    const match = line.match(MARKER_LINE_RE);
    if (match) {
      if (proseLines.length > 0) {
        segments.push({ kind: "prose", md: proseLines.join("\n") });
        proseLines = [];
      }
      const markerKind = match[1] as Segment["kind"];
      const id = match[2];
      switch (markerKind) {
        case "figure":     segments.push({ kind: "figure",     slug: id }); break;
        case "motion":     segments.push({ kind: "motion",     slug: id }); break;
        case "embed":      segments.push({ kind: "embed",      slug: id }); break;
        case "checkpoint": segments.push({ kind: "checkpoint", id });        break;
        case "video":      segments.push({ kind: "video",      slug: id }); break;
        case "exercise":   segments.push({ kind: "exercise",   slug: id }); break;
        case "derivation": segments.push({ kind: "derivation", slug: id }); break;
      }
    } else {
      proseLines.push(line);
    }
  }

  if (proseLines.length > 0) {
    segments.push({ kind: "prose", md: proseLines.join("\n") });
  }

  return segments;
}

// ── Chapterize (LESSON-EXPERIENCE-SPEC §1.2) ────────────────────────────────

interface Chapter {
  /** 0-based, authored order. */
  index: number;
  segments: Segment[];
  /** words / 180 wpm, min 1 — see minutesForText (lib/chapters.ts). */
  minutes: number;
  /**
   * The rung code ("R3") parsed from this chapter's `## R<n> — …` heading,
   * when rung-shaped. Undefined for the non-rung heading exception
   * (lib/chapters.ts §1.4). Used to attach this chapter's inline diagnostic
   * items (ChapterQuestions), keyed by rung.
   */
  rung?: string;
}

/**
 * Second pass over `splitIntoSegments`' output: re-splits every `prose`
 * segment at `^##\s` lines and groups the resulting pieces (plus every
 * untouched non-prose segment) into chapters, in authored order.
 *
 * Content before the FIRST `## ` line anywhere in the document (rare — the
 * H1 is already stripped by `stripLeadingTitle`, lib/content.ts:265-274)
 * merges into chapter 0 rather than becoming a throwaway chapter of its own
 * (spec §1.1) — `isFirstHeadingEver` is captured BEFORE the pending buffer is
 * flushed so this merge happens regardless of whether that buffer was empty.
 */
function chapterizeSegments(segments: Segment[]): Chapter[] {
  const chapters: Chapter[] = [];

  function ensureChapter(): Chapter {
    if (chapters.length === 0) {
      chapters.push({ index: 0, segments: [], minutes: 0 });
    }
    return chapters[chapters.length - 1];
  }

  function openNewChapter(): void {
    chapters.push({ index: chapters.length, segments: [], minutes: 0 });
  }

  function pushProse(chunk: string): void {
    ensureChapter().segments.push({ kind: "prose", md: chunk });
  }

  for (const seg of segments) {
    if (seg.kind !== "prose") {
      ensureChapter().segments.push(seg);
      continue;
    }

    const lines = seg.md.split("\n");
    let buffer: string[] = [];
    for (const line of lines) {
      if (/^##\s/.test(line)) {
        const isFirstHeadingEver = chapters.length === 0;
        if (buffer.length > 0) {
          pushProse(buffer.join("\n"));
          buffer = [];
        }
        if (isFirstHeadingEver) {
          ensureChapter(); // no-op if the flush above already opened chapter 0
        } else {
          openNewChapter();
        }
        // Label the just-opened chapter with its rung, when the heading is
        // rung-shaped (`## R3 — …`). Non-rung headings leave rung undefined —
        // their inline items (if any) fall through to the orphan safety-net.
        const rungMatch = line.match(/^##\s+(R\d+)\b/);
        if (rungMatch) {
          chapters[chapters.length - 1].rung = rungMatch[1];
        }
      }
      buffer.push(line);
    }
    if (buffer.length > 0) {
      pushProse(buffer.join("\n"));
    }
  }

  if (chapters.length === 0) {
    // No `##` heading AND no content at all reached this point (defensive —
    // NotionPageView already skips rendering NotionBody when lessonMd is
    // empty, so this is unlikely to occur in practice).
    return [{ index: 0, segments: [], minutes: 1 }];
  }

  for (const c of chapters) {
    c.minutes = minutesForText(
      c.segments.filter((s): s is ProseSegment => s.kind === "prose").map((s) => s.md).join("\n")
    );
  }
  return chapters;
}

// ── Component ─────────────────────────────────────────────────────────────────

interface NotionBodyProps {
  /** Raw lesson markdown sourced from lesson.md */
  lessonMd: string;
  /** Attempt-first exercises keyed by id, from exercises.yaml. */
  exercises?: Record<string, NotionExercise>;
  /** Stepped derivations keyed by id, from derivations.yaml. */
  derivations?: Record<string, NotionDerivation>;
  /**
   * Static figure SVGs — media/*.svg (excluding *.motion.svg).
   * Keyed by filename (e.g. "rlc-schema.svg").
   */
  mediaSvgs: Record<string, string>;
  /**
   * Animated SVG diagrams — media/*.motion.svg.
   * Keyed by slug without ".motion.svg" (e.g. "energy-pendulum").
   */
  motionSvgs: Record<string, string>;
  /**
   * Declarative beat specs — media/*.motion.json, keyed by base slug.
   * When a motion slug has a spec, the real-motion engine (MotionStage)
   * renders it; otherwise the legacy stepped MotionDiagram is used.
   */
  motionSpecs: Record<string, MotionSpec>;
  /**
   * Staged-figure declarations — media/*.stages.json, keyed by base slug.
   * When a figure slug has an entry here, NotionBody dispatches to
   * StagedFigure instead of MediaDiagramFigure (LESSON-EXPERIENCE-SPEC §2).
   */
  mediaStages: Record<string, MediaStagesSpec>;
  /**
   * Bespoke-interactive declarations — media/*.interactive.json, keyed by
   * base slug. When a figure slug has an entry here, StagedFigure unlocks a
   * manipulation control once the student reaches `unlockAfterStage`
   * (docs/design/INTERACTIVE-FIGURE-SPEC.md §3).
   */
  mediaInteractive: Record<string, InteractiveFigureConfigSpec>;
  /** Map of slug → EmbedDescriptor for every media/*.json file. */
  mediaEmbeds: Record<string, EmbedDescriptor>;
  /** Checkpoint items keyed by id. */
  checkpoints: Record<string, CheckpointItemType>;
  /**
   * Diagnostic MCQ items grouped by rung ("R3" → its items), from items.yaml.
   * Each chapter renders its own rung's items inline at the end of its section
   * (ChapterQuestions) — the inline-items model that replaces the former single
   * end-of-lesson "S'entraîner" bank (LESSON-EXPERIENCE-SPEC §1.1). Items whose
   * rung matches no `## R<n>` chapter (e.g. the nested-heading exception) are
   * collected into the last chapter as an orphan safety-net so none is lost.
   */
  itemsByRung?: Record<string, NotionItem[]>;
  /**
   * True whenever a synthetic final "S'entraîner" chapter will be appended
   * AFTER NotionBody's own real chapters (LESSON-EXPERIENCE-SPEC §1.1 —
   * present whenever `itemsData` exists; NotionPageView renders that
   * chapter's `<section>` itself, hosting ItemsSection). When true,
   * NotionBody's own last real chapter is NOT the lesson's last chapter —
   * it does not render `lessonEnd` (the synthetic chapter does instead) and
   * its ChapterTransport still gets a "Chapitre suivant" (the shared
   * `total` from ChapterShell's context already accounts for the synthetic
   * chapter, regardless of this prop).
   */
  hasTrailingChapter: boolean;
  /**
   * LessonEnd (the session-close handoff) — appended inside NotionBody's own
   * LAST chapter. Used only when `hasTrailingChapter` is false: with no
   * items, the lesson's own last real chapter IS the lesson's last chapter,
   * and LessonEnd always closes the last chapter (spec §1.1).
   */
  lessonEnd?: ReactNode;
}

export function NotionBody({
  lessonMd,
  exercises,
  derivations,
  mediaSvgs,
  motionSvgs,
  motionSpecs,
  mediaStages,
  mediaInteractive,
  mediaEmbeds,
  checkpoints,
  itemsByRung,
  hasTrailingChapter,
  lessonEnd,
}: NotionBodyProps) {
  // Build a slug-keyed SVG map for static figures (strip ".svg" extension)
  const svgBySlug: Record<string, string> = {};
  for (const [filename, svg] of Object.entries(mediaSvgs)) {
    const slug = filename.replace(/\.svg$/, "");
    svgBySlug[slug] = svg;
  }

  const segments = splitIntoSegments(lessonMd);
  const chapters = chapterizeSegments(segments);

  // Track occurrence count per stepped figure slug for cumulative reveal.
  // Key: slug, Value: how many times this slug has been rendered so far.
  // Declared ONCE, outside the chapter loop below — see the file-header note
  // on why this must stay a single counter across ALL chapters (ledger 11.2).
  const figureOccurrenceCount: Record<string, number> = {};

  // One segment → one rendered node. Extracted to a named function (rather
  // than an inline map callback) purely so it can be called once per chapter
  // below instead of once over one flat array — every branch is UNCHANGED
  // from the pre-pagination version.
  function renderSegment(seg: Segment, key: string): ReactNode {
    // ── Prose ──────────────────────────────────────────────────────────
    if (seg.kind === "prose") {
      const trimmed = seg.md.trim();
      if (!trimmed) return null;
      return (
        // notion-prose: max-width 65ch + mx-auto (centered in content band)
        <div key={key} className="notion-prose">
          <LessonRenderer markdown={trimmed} />
        </div>
      );
    }

    // ── Figure (static SVG, optionally stepped) ────────────────────────
    if (seg.kind === "figure") {
      const svg = svgBySlug[seg.slug];
      if (!svg) return null; // Unknown slug — silent no-op

      const stagesSpec = mediaStages[seg.slug];
      const maxSteps = STEPPED_FIGURE_MAX_STEPS[seg.slug];

      // Global occurrence counter (author order, §1.2) — shared by BOTH
      // the new StagedFigure mechanism and the legacy allowlist below.
      // A slug is tracked the moment it needs either: repeated placements
      // start pre-revealed at their historical level either way.
      if (stagesSpec !== undefined || maxSteps !== undefined) {
        figureOccurrenceCount[seg.slug] =
          (figureOccurrenceCount[seg.slug] ?? 0) + 1;
      }
      const occurrence = figureOccurrenceCount[seg.slug];

      // NEW mechanism: a media/<slug>.stages.json sidecar exists.
      if (stagesSpec !== undefined) {
        return (
          <StagedFigure
            key={key}
            svg={svg}
            slug={seg.slug}
            label={figureAriaLabel(seg.slug)}
            stages={stagesSpec.stages}
            initialStage={Math.min(occurrence, stagesSpec.stages.length)}
            interactiveConfig={mediaInteractive[seg.slug]}
          />
        );
      }

      // LEGACY mechanism: STEPPED_FIGURE_MAX_STEPS allowlist + MediaDiagramFigure.
      let visibleSteps: number | undefined;
      let caption: string | undefined;

      if (maxSteps !== undefined) {
        // Clamp to max steps so extra occurrences show the full figure
        visibleSteps = Math.min(occurrence, maxSteps);
        caption = stepCaption(seg.slug, visibleSteps);
      }

      return (
        <MediaDiagramFigure
          key={key}
          slug={seg.slug}
          svg={svg}
          label={figureAriaLabel(seg.slug)}
          visibleSteps={visibleSteps}
          stepCaption={caption}
        />
      );
    }

    // ── Motion (animated SVG) ──────────────────────────────────────────
    if (seg.kind === "motion") {
      const svg = motionSvgs[seg.slug];
      if (!svg) return null; // Unknown slug — silent no-op

      // Real-motion engine when a beat spec exists; else legacy stepped
      // renderer (graceful: not every motion slug has been converted yet).
      const spec = motionSpecs[seg.slug];
      if (spec) {
        return (
          <MotionStage
            key={key}
            svg={svg}
            spec={spec}
            label={figureAriaLabel(seg.slug)}
          />
        );
      }

      return (
        <MotionDiagram
          key={key}
          svg={svg}
          label={figureAriaLabel(seg.slug)}
        />
      );
    }

    // ── Embed ──────────────────────────────────────────────────────────
    if (seg.kind === "embed") {
      const embed = mediaEmbeds[seg.slug] ?? null;
      // EmbedPanel handles null gracefully (shows placeholder)
      return (
        <EmbedPanel
          key={key}
          embed={embed}
        />
      );
    }

    // ── Checkpoint ─────────────────────────────────────────────────────
    if (seg.kind === "checkpoint") {
      const item = checkpoints[seg.id];
      if (!item) return null; // Unknown id — silent no-op

      return (
        <div key={key} className="my-10 notion-wide-band">
          <CheckpointItem item={item} />
        </div>
      );
    }

    // ── Video ──────────────────────────────────────────────────────────
    // Gracefully omit if the asset does not exist.
    // The lesson currently references [[video:balancement]] — if the Veo
    // asset has not been produced yet, this renders nothing (no error, no
    // placeholder — design brief specifies graceful omission).
    if (seg.kind === "video") {
      // Video assets are not loaded server-side in this pass —
      // the balancement Veo clip is pending production. When a video
      // asset exists, it would be passed in via a `mediaVideos` prop.
      // For now: silent no-op on all video markers.
      // This satisfies the "omit gracefully, never show a placeholder error"
      // requirement without blocking the build.
      return null;
    }

    // Attempt-first exercise (Day-5, audit C1): question → commit →
    // reasoning unlocks. Unknown slug → silent no-op like every marker.
    if (seg.kind === "exercise") {
      const ex = exercises?.[seg.slug];
      if (!ex) return null;
      return <AttemptFirstExercise key={key} exercise={ex} />;
    }

    // Stepped derivation (Day-6, §7): learner-paced worked math.
    if (seg.kind === "derivation") {
      const d = derivations?.[seg.slug];
      if (!d) return null;
      return <Derivation key={key} id={d.id} title={d.title} steps={d.steps} />;
    }

    return null;
  }

  const lastChapterIndex = chapters.length - 1;

  // Orphan safety-net: items whose rung matches no rung-shaped `## ` chapter
  // (the nested-heading exception, or any stray rung) still render — collected
  // into the last chapter — so no authored question is ever dropped. Empty for
  // the 60/61 lessons whose chapters are clean `## R<n>` headings.
  const consumedRungs = new Set(
    chapters.map((c) => c.rung).filter((r): r is string => !!r)
  );
  const orphanItems: NotionItem[] = itemsByRung
    ? Object.entries(itemsByRung)
        .filter(([rung]) => !consumedRungs.has(rung))
        .flatMap(([, items]) => items)
    : [];

  return (
    <>
      {chapters.map((chapter, ci) => (
        // Every chapter renders — non-active ones carry `hidden` (spec §1.3,
        // ledger 11.4): SSG, print, and in-page anchors all need the whole
        // lesson in the DOM. ChapterShell (the caller's client wrapper) is
        // the only thing that ever flips `hidden`/`data-chapter-active` on
        // these nodes; the default below (chapter 0 open) is what SSG and a
        // no-JS visitor see.
        <section
          key={`chapter-${chapter.index}`}
          data-chapter-section
          data-chapter-index={chapter.index}
          data-chapter-active={chapter.index === 0 ? "true" : "false"}
          hidden={chapter.index !== 0}
          className="chapter-view"
        >
          {/* Per-chapter reading time — quiet, above the chapter's own
              content (LESSON-EXPERIENCE-SPEC §1.3). Not literally inline
              with the markdown-rendered `##` heading below it: that heading
              is produced deep inside LessonRenderer/react-markdown, a
              shared, chapter-agnostic renderer this task does not touch. */}
          <p className="notion-prose mb-2 text-body-sm text-[var(--color-text-secondary)]">
            {`~${chapter.minutes} min`}
          </p>
          {chapter.segments.map((seg, i) => renderSegment(seg, `${chapter.index}-${i}`))}
          {/* This chapter's diagnostic items, inline (§1.1 inline-items). */}
          {chapter.rung && itemsByRung?.[chapter.rung] && (
            <ChapterQuestions items={itemsByRung[chapter.rung]} />
          )}
          {/* Orphan safety-net lands in the last chapter (empty for clean
              `## R<n>` lessons). */}
          {ci === lastChapterIndex && orphanItems.length > 0 && (
            <ChapterQuestions items={orphanItems} />
          )}
          {ci === lastChapterIndex && !hasTrailingChapter && lessonEnd}
          <ChapterTransport index={chapter.index} />
        </section>
      ))}
    </>
  );
}
