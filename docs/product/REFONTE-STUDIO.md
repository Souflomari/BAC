# REFONTE « STUDIO » — le plan de la remise à plat visuelle

**Date :** 2026-08-17 · **Statut :** décisions verrouillées par l'owner
(quatre questions posées et répondues le jour même) · **Autorité :** ce
document pilote la refonte ; il sera adossé à l'ADR 0030 (pivot
d'identité, remplace l'identité « warm editorial » de l'ADR 0023) à la
première étape d'exécution.

**La séquence, fixée par l'owner :** corriger tout → reconstruire UNE
tranche parfaite avec Fable → la codifier en règles → faire reproduire
le reste par Antigravity.

---

## 0 · Pourquoi une refonte et pas des retouches

Trois audits convergent (owner 15/08, audit Fable 17/08, critique
externe 17/08) : le SYSTÈME est au niveau — tokens uniques
(`web/src/lib/tokens.ts`), échelle M3 unifiée (600/840/1200/1600),
ressorts physiques (`m3-motion.ts`), honest-state, portes vertes — mais
l'IDENTITÉ et l'EXÉCUTION ne le sont pas. Symptômes nommés : beige
uniforme sans séparation de surfaces, sérif éditorial qui jure avec
l'UI technique, curseurs natifs nus, listes plates sans organisation ni
recherche, accueil redondant (3 modules qui disent la même chose),
navigation en coupe sèche, aucun badge/raccourci. Verdict owner, deux
fois : « generic AI prototype ».

La critique externe diagnostique juste et prescrit faux : son ordonnance
(slate-50 + indigo-600 + Inter + shadcn) est le look le plus commoditisé
de 2026. On prend sa STRUCTURE (canvas encadré, dock de contrôles,
badges clavier, readouts mono), on rejette sa PEAU.

## 1 · Ce que dit la recherche (sources primaires)

- **Linear** (billet officiel de leur refonte) : couleur en LCH pour une
  clarté perçue uniforme ; ~98 variables par thème réduites à TROIS
  génératrices (base, accent, contraste) ; contraste augmenté, chrome
  désaturé ; hiérarchie par paliers de ton + bordures — les ombres sont
  quasi bannies (une seule vraie : le CTA) ; une famille en deux coupes
  optiques (Inter Display / Inter) ; durées 100/160/400 ms.
- **Apple** : l'UI s'efface devant le contenu ; blanc / près-noir, UN
  accent discret ; grille 8 pt subdivisée 4 ; le blanc tournant est un
  piédestal, pas un reste ; UNE famille (SF) en coupes optiques ; pages
  choréographiées au scroll.
- **Brilliant** : toile blanche ; la figure interactive EST le contenu ;
  chemin de progression visualisé ; feedback immédiat et vivant sur
  l'ACTION. Leurs streaks/XP restent interdits ici (cœur calme,
  NORTH-STAR-V2) — la vivacité du feedback, elle, est adoptable.
- **Motion 2026** : trois couloirs — CSS pour le simple, ressorts pour
  l'interactif (les nôtres existent et s'arrêtent au repos), View
  Transitions API pour la continuité entre routes. UI ≤ 300 ms.
- **Navigation 2026** : barre du haut = utilitaires ; un catalogue de
  62 notions = panneau organisé par catégories + ⌘K pour l'accès direct.

**Le dénominateur commun n'est pas une palette.** C'est : contraste
élevé, un accent, surfaces nettes (bordures + tons), une famille typo,
retenue. Notre système a déjà la moitié — il a le mauvais neutre et il
lui manque les 20 derniers pourcents d'exécution.

## 2 · Les quatre décisions (owner, 2026-08-17)

| # | Question | Décision |
|---|---|---|
| D1 | Palette | **« Studio clair »** — surfaces blanches sur toile près-blanc neutre-chaud, encre presque noire, bordures nettes ; le sarcelle signature est CONSERVÉ, recalibré pour le blanc ; thème sombre dérivé par la même méthode. Ni beige, ni slate. |
| D2 | Typographie | **Grotesque + sérif de prose** — Geist (coupe display pour titres, text pour l'UI) + Geist Mono pour nombres/readouts ; le sérif QUITTE tout le chrome et l'atelier ; Source Serif 4 reste UNIQUEMENT dans le corps des leçons (lecture longue). KaTeX garde ses fontes mathématiques. |
| D3 | Matières | **Couleur sémantique par matière** — 5 teintes (maths, pc, svt, philo, si) générées en OKLCH à clarté/chroma ÉGALES, déclinées clair/sombre. Wayfinding : nav, couvertures, chips. Le sarcelle reste l'accent PRODUIT (actions/CTA). |
| D4 | Tranche 1 | **Coquille + Atelier** — header fin unifié + panneau Notions organisé + ⌘K, puis l'atelier complet au nouveau standard. C'est la tranche la plus codifiable. |

## 3 · Pourquoi c'est moins cher qu'il n'y paraît

La systemisation de Phase A paie exactement ici : les ALIAS ne changent
pas (`text-primary`, `bg-surface-raised`, `border-subtle`…), seules les
VALEURS changent dans `tokens.ts`, et les familles dans `layout.tsx`.
dom-truth (sweep 70 vars, les deux thèmes), token-gate et tailwind-merge
dérivent tous de tokens.ts : ils suivent sans être touchés. Le pivot
d'identité est une édition de données, pas un codemod.

## 4 · Le système cible « Studio » (spécification de R1)

**Méthode couleur.** Tout en OKLCH (support navigateur : baseline depuis
2023 ; le générateur émet aussi le hex de secours). Trois génératrices,
méthode Linear : teinte de base (cast neutre-chaud ~90°, PAS le bleu
slate), accent, contraste. Ancres cibles — à affiner sous porte de
contraste, pas à recopier aveuglément :

- Toile `≈ oklch(0.975 0.003 90)` ; surface de travail `#FFFFFF` ;
  surfaces container en paliers de 1–2 % de clarté.
- Encre `≈ oklch(0.22 0.015 90)` (≥ 13:1 sur toile) ; secondaire ≥ 7:1 ;
  tertiaire ≥ 4,5:1.
- Bordures : `subtle ≈ oklch(0.92)`, `field ≥ 3:1` (WCAG 1.4.11, jeton
  dédié déjà en place).
- Accent produit : sarcelle recalibré `≈ oklch(0.52 0.10 185)` — ≥ 4,5:1
  sur blanc en texte, on-accent ≥ 4,5:1.
- Matières, MÊMES clarté/chroma (poids visuel identique) :
  maths `h≈265`, pc `h≈60`, svt `h≈150`, philo `h≈330`, si `h≈205` —
  chacune : accent, subtle (wash), on-accent, versions sombres.
- Figures : `--figure-*` recalibrés pour fond blanc (encre du repère,
  grille très légère, les 4 couleurs de rôle alignées sur les teintes
  matières quand pertinent). Mafs suit automatiquement (déjà mappé).
- Ombres : DEUX niveaux seulement (carte au repos, overlay) + la seule
  « vraie » ombre sur le CTA primaire. La hiérarchie vient des bordures
  et des paliers de ton.

**Typographie.** Geist + Geist Mono via `next/font/google` (si absents
du manifeste de fontes de Next 14.2 → `next/font/local`, woff2
auto-hébergés ; décision technique en R1, pas un blocage). Échelle
FLUIDE : chaque cran en `clamp()` (ratio ~1,25 en compact → ~1,333 en
large), display en tracking négatif. `--font-reading-serif` ne reste
consommé QUE par la prose de leçon (`prose-lesson`). `tabular-nums`
partout où un nombre change.

**Densité.** Grille 8 pt, subdivision 4 ; hauteurs de contrôle
32/40/48 ; les docks de l'atelier travaillent en 40.

## 5 · La contrainte honest-state (inventoriée, non négociable)

Vérifié dans le code : signé-déconnecté, il n'existe AUCUNE donnée de
progression (localStorage ne porte que filière/thème/taille ; l'écriture
d'événements est no-op hors auth live ; le modèle d'apprenant
`learner-model.ts` est prêt mais pas câblé). Donc :

- L'accueil visualise la **couverture du programme** — réelle,
  vérifiable : N chapitres au cadre · M disponibles, par matière
  (`subjectChapterCount` / `subjectAvailableCount`, curriculum.ts).
- AUCUNE barre « ta progression », aucun %, aucun état de maîtrise
  rendu hors session live. Les états `entamé/lu/exercé` n'apparaissent
  que signés, branchés sur `useStudentState()`.
- Interdits maintenus : streaks, XP, badges, célébrations.

## 6 · Les phases

**R0 · Actes (Fable, court).** ADR 0030 « pivot Studio » (remplace
l'identité de l'ADR 0023, conserve ses non-négociables : cœur calme,
honest-state, reduced-motion, 65ch de prose) ; verser le journal du plan
précédent dans `docs/archive/` ; DESIGN-BIBLE marquée « v2 en cours ».

**R1 · Tokens v3 (Fable).** Réécrire les VALEURS de `tokens.ts` (les
deux thèmes) selon §4 ; familles dans `layout.tsx` ; échelle fluide dans
`typeScale` (le générateur et tailwind.config dérivent déjà) ; jetons
matières ; figures recalibrées. NOUVELLE PORTE : sweep de contraste
calculé (toutes les paires texte/fond + matières, les deux thèmes,
échec = build rouge) ajouté à dom-truth. Gate : build, dom-truth,
token-gate, contraste 0 échec, captures clair/sombre.

**R2 · Coquille (Fable).** Header 56 px : wordmark seul (« · sciences »
part), toolbar droite unifiée, panneau Notions organisé par matière
(teinte matière + « N chapitres · M disponibles », filière-aware,
remplace le dropdown plat), **⌘K** (dépendance `cmdk` — la seule ajoutée
avec, éventuellement, `next-view-transitions` en R4) : 62 notions +
actions (thème, taille, matières). Footer dégraissé. Gate : dom-truth
anatomie header, a11y (navigation clavier complète du panneau et de ⌘K).

**R3 · Atelier au standard (Fable — LA tranche).**
- Scène = « workspace » : carte blanche, bordure nette, fond
  points-de-grille discret, et un DOCK intégré en pied : steppers −/+
  (pas de curseur nu), readouts `Geist Mono tabular-nums`, pilule
  formule `pente = Δy/Δx = 0,50`. Le curseur continu ne survit que pour
  h (sécante) en version custom 48 px.
- QCM : cartes structurées, badge clavier `A/B/C/D` DANS la carte,
  raccourcis clavier réels, états hover/selected/verdict nets (ring
  accent), verdict non chromatique conservé.
- Carte de feedback : en-tête badge + violet tracé, corps, et ligne de
  comparaison mono « ta pente 8,00 · attendue 0,50 ».
- Rail → fil compact en pilules, sticky sous le header.
- Le sérif quitte l'atelier (D2). Gate : règle-atelier 0, parcours
  clavier complet vérifié au navigateur, captures 390/768/1440/1920 ×
  clair/sombre, et l'œil de l'owner sur la préview.

**R4 · Motion & continuité (Fable + spike).** View Transitions entre
routes (spike : `next-view-transitions` sur App Router 14 ; si
instable → différé à la montée Next 15, sans bloquer le reste) ; stagger
d'entrée sur listes/panneaux (Apparition existe) ; élévation au survol
des cartes ; press-scale ressort sur les contrôles. Reduced-motion :
audit complet.

**R5 · Codification (Fable).** DESIGN-BIBLE v2 (les règles Studio) ;
`STUDIO-SPEC.md` : anatomie exacte par composant (header, panneau,
workspace/dock, carte QCM, carte feedback, fil) avec jetons et classes ;
mise à jour PAGE-ANATOMY-SPECS ; portes ajoutées à demeure (échelle de
rupture M3 seule, contraste, anatomie workspace). **C'est le contrat
qu'Antigravity consomme.**

**R6 · Reproduction (Antigravity, portes Claude).** Bons de travail par
surface, échantillon d'acceptation par lot (discipline
DISTRIBUTED-BUILD éprouvée sur les 53 scènes Manim) :
- **Accueil** : fusion des 3 modules redondants en une « Carte du
  programme » par matière (couverture réelle §5, jamais de % fabriqué),
  cartes compactes texte-first (les 5 motifs Cover répétés → vignette
  48 px max), SessionCard fusionnée au sommet. L'incohérence d'ordre
  des matières (AvailableShelf trie alphabétiquement, le reste par
  SUBJECT_ORDER) se règle par UNE constante canonique dans
  `lib/subjects.ts`.
- **/matieres/**, **leçons** (titres grotesques, prose sérif 65ch,
  précédent/suivant, position), **connexion/404**.
- Gates verts obligatoires à chaque lot ; production humaine inchangée.

**État d'exécution (2026-08-18).** R0 `e6f6227` (ADR 0030) · R1 `d4063fd`
(tokens Studio + Geist + porte de contraste) · R2+R3+R6-accueil `578731e`
(l'overhaul : coquille, accueil, atelier — la fusion accueil prévue en R6
a été absorbée ici) · R4 `dfcbbc8` (View Transitions + entrées animées +
filtre net de la palette ; le spike était stable, pas de report Next 15) ·
R5 : `docs/design/STUDIO-SPEC.md` + bible v2 (autorité partagée) +
PAGE-ANATOMY amendé + porte M3-seule dans token-gate. **Reste de R6 :**
reproduction Antigravity — /matieres/, passe titres des leçons (3 témoins
d'abord), connexion/404, retrait des vieux bancs /options/* (owner-gaté).

## 7 · Risques nommés

1. **Geist absent du manifeste next/font de 14.2** → next/font/local,
   décision en R1.
2. **KaTeX à côté de Geist** : KaTeX a ses propres fontes ; vérifier le
   gris optique des tailles à R1 (une capture leçon suffit).
3. **62 leçons typographiées autour du sérif** : le corps GARDE le
   sérif (D2) ; seuls les titres changent — vérifier le rythme vertical
   sur 3 leçons témoins avant le fan-out R6.
4. **Thème sombre** : dérivé par la même méthode OKLCH, couvert par le
   sweep — mais l'œil de l'owner reste la porte finale par phase.
5. **View Transitions sur Next 14** : spike isolé, jamais bloquant.
6. **Deux dépendances ajoutées maximum** (`cmdk`, `next-view-transitions`)
   — tout le reste se fait avec l'existant ; la leçon des 8 dépendances
   mortes vaut règle.

## 8 · Vérification

Par phase : build + dom-truth (étendu) + token-gate + sweep contraste +
captures examinées contre les références (Linear/Apple/Brilliant
ouvertes à côté — le test §10 de la bible, tenu). Fin de tranche (R3) :
parcours complet clavier + souris + mobile sur la préview déployée,
verdict owner AVANT codification R5. Fin de R6 : audit externe frais sur
le site déployé, même protocole que les audits qui ont déclenché ce
plan.

## Retractions and Corrections

*(présent dès la création, par discipline — vide pour l'instant)*
