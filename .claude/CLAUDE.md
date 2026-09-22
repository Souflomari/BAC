# CLAUDE.md

> This file is read automatically by Claude Code at the start of every
> session. It is an **index and orientation file** — it points to the
> deeper documents and carries only the most essential always-on facts.
> It deliberately does NOT contain the full product vision or the full
> rules of work; those live in their own documents (linked below) to
> keep this file short and to avoid burning context re-reading it.

---

## What this project is

A Moroccan baccalauréat preparation app for science-stream students
(SM-A, SM-B, Sciences Physiques, SVT — 2ème Bac, French first). The goal
is to replace private tutoring with a more effective, far cheaper
solution: a patient, omniscient, infinitely-available tutor that takes a
struggling student to excelling at the bac.

**Read `docs/product/VISION.md` before making any product decision.** It
is the canonical statement of what the app is and why; every decision
answers to it.

---

## The documentation map

Read the right document for the task at hand:

- **`docs/product/VISION.md`** — *why and what.* The product vision. The
  north star the whole project serves. Read before any product decision.
- **`docs/Rules/RULES.md`** — *how we work.* The build discipline,
  operating procedure, safety non-negotiables, and cadence. Authority
  order: VISION → RULES → agents. A living document that evolves as the
  build is figured out.
- **`.claude/agents/*.md`** — *who does what.* The specialist subagents.
  Loaded per task. **[STATUS: roster under revision to match the locked
  vision and pending architecture decisions — see "Open decisions" below.]**
- **`docs/grounding/`** — *where we are.* Current-state documents:
  `architecture.md`, `schema-reconciliation.md`, `known-issues.md`.
  **[STATUS, 2026-09-05: `architecture.md` RÉCONCILIÉ — re-mesuré contre le
  dépôt et réécrit ; la version précédente décrivait encore l'application
  Flutter comme l'état courant et affirmait que « Next.js n'apparaît nulle
  part dans le dépôt ». Elle est archivée sous `docs/archive/`. Le blocage
  invoqué par la proposition de 2026-06 (« ne pas toucher au cadrage
  frontend tant que la décision de pile n'est pas actée ») était levé depuis
  l'ADR 0016. `known-issues.md` porte désormais une ÉTIQUETTE DE STATUT
  vérifiée : six entrées re-mesurées contre le dépôt (une résolue, une
  toujours vraie mais morte, une à moitié, une devenue sans objet), le reste
  laissé au jugement du propriétaire. `schema-reconciliation.md` porte lui aussi une ÉTIQUETTE
  DE STATUT vérifiée : son JUGEMENT était juste et a été exécuté ; ce qui a
  vieilli est le temps des verbes, et le §6 (la pile frontend) est tranché
  par l'ADR 0016.]**
- **`docs/decisions/*.md`** — *what we decided and why.* The ADR trail.
  Numbered, append-only history. Referenced for context on past
  decisions. **ADR 0025 consolidates the July-2026 sprint's first arc**
  (rendered/deployed-truth discipline, page anatomy, honest-state,
  template v2, the component set, the portability protocol, the
  external-audit event). **ADR 0026 consolidates the second arc and the
  Fable close** (site skeleton, the 61-lesson fill, the D10 media layer,
  Lesson Experience v2, the handoff corpus — HANDOFF §5, the post-Fable
  work order, DASHBOARD-SPEC, THEME-ARCHITECTURE, the three skills).
  **ADR 0031 consolidates the September-2026 arc** (a displayed fact must
  come from a source that survives a clone — file dates are banned as
  content facts; programme order is the single ordering source; a figure
  in a document carries the command that produces it; status labels are
  per-document; a cross-reference is an instruction — the live/archive
  link gate; a mechanism's REACH is measured separately from whether it
  works; a gate has two directions when one alone can be gamed; **a gate
  must be able to go RED — a green badge says nothing failed, not that
  everything was measured**). **ADR 0034 (2026-09-20) — the instrument that could not
  hear itself:** a red test proves nothing without the green that preceded it,
  in that directory with that command; a failing red test is AMBIGUOUS (gate
  blind, or test wrong — half of ours were the test); an anti-noise threshold
  belongs on a MEASURE, never on a ratchet, where it silently makes the gate
  inert; a gate has four honest verdicts (RED / WARNING-seen / GREEN-ambiguous /
  MUTE); red tests live in a re-runnable suite, because a property that cannot
  be re-measured is a memory; a pattern and its preprocessing are one thing.
  **ADR 0035 (2026-09-20) — ce qui tourne vraiment, et qui le sait :**
  l'inventaire de ce qui s'exécute se CALCULE, il ne se lit pas (`npm run` et le
  crochet `prebuild` échappent à tout grep) ; un fichier généré doit nommer
  TOUTES les mains qui l'écrivent, et fusionner plutôt qu'écraser ; une porte
  écrite après un `process.exit` n'existe pas ; un instrument qu'aucun catalogue
  ne nomme est mort, avec le savoir de son en-tête ; une porte prise dans un
  agrégat doit pouvoir être lancée SEULE ; **douze fois en un jour la mesure
  était fausse avant le produit** — vérifier le BANC avant le produit ; et la
  décision de NE PAS armer s'écrit à côté du motif voisin.
  **ADR 0036 (2026-09-20) — la bonne chose, cherchée sous une seule de ses
  formes :** une chose n'est prouvée ABSENTE que si l'on a énuméré ses FORMES
  — sept fois dans la journée « il n'y a rien » était faux (`data-build-sha`
  cherché en `<meta>`, `noindex` cherché en en-tête, `### R<n>` cherché en
  `##`) ; un filtre anti-bruit bâti sur ce qui EXISTE DÉJÀ est structurellement
  aveugle à ce qui manque entièrement ; **une porte qui se cite elle-même se
  disculpe** ; un total opt-in est un plancher, pas une somme ; prescription et
  livraison se mesurent SÉPARÉMENT (4 manipulables prescrits, 4 livrés, aucun
  en commun) ; **une dette honnête reste invisible tant qu'aucun registre ne la
  nomme** ; un diagnostic non rejoué est une rumeur (« le relais coupe
  Chromium » : deux semaines d'angle mort pour un CA auquel on ne faisait pas
  confiance) ; et ce qu'on choisit de NE PAS armer s'écrit à côté de ce qu'on
  arme ; et **un instrument neuf se lance plusieurs fois avant d'être cru** —
  une porte instable est pire qu'une porte absente, car elle enseigne à ignorer
  le rouge de toutes les autres.
  **ADR 0038 (2026-09-21) — la règle présente et sans effet :** un correctif de
  style ou de configuration se vérifie sur son EFFET mesuré, jamais sur la
  présence de la déclaration (`max-width` posé sur une boîte `display:inline`
  était là et ne faisait rien) ; **un défaut peut rendre une porte VERTE sur un
  autre défaut** — un correctif qui fait rougir une porte sans rien casser est
  un signal, pas du bruit ; une sabotage qui n'atteint pas la porte n'est pas un
  essai rouge (quatrième verdict AMBIGU, outillé dans `essai-rouge`) ; **ne pas
  armer est un résultat, à condition de nommer la condition qui mériterait une
  porte** — d'où une porte étroite née du refus d'une porte large ; l'unité d'un
  motif s'écrit à côté du motif, et se justifie par ce qui peut se retrouver
  ENSEMBLE ; et le geste de vérification le plus utile est le plus bête — faire
  ce que ferait l'élève jusqu'au bout et lire le chiffre (deux épreuves sur 39
  refusaient le 20/20 à une copie parfaite).
  **ADR 0039 (2026-09-21) — la forme que le produit écrit :** un manifeste de
  build n'est pas le graphe de modules (un `import()` paresseux y est
  invisible) ; **ce n'est pas la chose cherchée qui change de forme, c'est le
  PRODUIT qui la réécrit avant de l'écrire** — une porte qui compare du texte à
  du texte RENDU doit justifier que les deux côtés sont dans la même forme, ou
  changer d'empreinte pour ce que le rendu ne peut pas produire ; un essai
  rouge doit porter la forme que le PRODUIT écrit, pas celle que la porte
  cherche ; **le premier chiffre rouge n'est pas plus fiable que le vert qu'il
  remplace** (53 trouvées, aucune n'était le défaut visé) ; une UNITÉ mal
  choisie noie le signal sous la convention (`cp-r0-predict` dans 62 notions
  sur 62 est un nom de rôle, pas une collision) ; un défaut LATENT se gate sans
  s'alarmer et sans se corriger en douce ; **quand un dépôt s'écrit un seuil
  plus exigeant que la norme, il faut mesurer les DEUX** — le normatif s'arme,
  le maison s'imprime à côté sans rougir ; et deux valeurs qui devraient
  différer et sont égales à l'octet près sont un défaut de mesure, pas un
  résultat.
  **ADR 0040 (2026-09-22) — la case manquante de la grille :** la case qu'une
  grille de mesure oublie est presque toujours la case PAR DÉFAUT — trois cases
  pleines ressemblent à une preuve, et c'est la quatrième qui décidait (un
  correctif « prouvé » sûr sur 15 700 paragraphes a fait passer le corpus de 0 à
  185 débords) ; une sonde qui FABRIQUE un état que le produit ne montre jamais
  répond fidèlement à une autre question, ce qui est pire qu'un faux chiffre
  parce que c'est un chiffre cohérent ; **un verdict obtenu pendant qu'autre
  chose tourne n'est pas un verdict** (page non stylée, serveur tué, Chromium
  absent — trois fois le même jour) ; `node --check` prouve qu'un fichier se
  PARSE, pas qu'il TOURNE, et après une réécriture automatique il faut LANCER la
  chose ; **un identifiant non unique fait mentir l'instrument, pas le produit**
  — une collision d'ids est une dette d'OBSERVABILITÉ qui se paie au premier
  outil qui nomme les choses, d'où la clé `notion::id` ; **rendre une chose
  mesurable est un travail, pas un préalable gratuit** — 362 points d'arrêt, ce
  qu'un élève rencontre EN PREMIER, n'étaient adressables par aucun instrument
  faute d'un attribut ; un chiffre qu'on ne sait pas EXPLIQUER est une rumeur
  même quand il est exact (« 131 jamais rendus » : le nombre juste, le mot
  faux) ; et quand la CI est morte, son travail devient manuel — le lancer avec
  les COMMANDES ET ARGUMENTS EXACTS du workflow, ce qui a trouvé dix épreuves
  dont le contenu était coupé à 200 % de texte.
  **ADR 0032 (2026-09-11) — the honest wait before
  hydration:** a server-rendered command is `disabled` + `aria-busy` until
  React takes over (`useHydrated`), the page says so once, calmly, and
  `dom-truth` reads the SERVED HTML to keep it true.
  **ADR 0033 (2026-09-20) — la porte exacte sur une
  AUTRE question :** une porte verte peut ne rien garantir de trois façons —
  elle ne scanne rien (morte), son motif ne reconnaît plus le défaut
  (aveugle), ou **elle répond exactement à une question plus étroite que son
  en-tête ne le laisse lire**. C'est le troisième cas qui est neuf, et le plus
  dur à voir : il n'y a rien à réparer dans la porte. Corollaire : *un
  pourcentage au-dessus du hasard ne prouve pas qu'il y a de quoi tricher — la
  MARGE le prouve.* Deux instruments complémentaires (`portee-portes`,
  `essai-rouge`), et la règle « quand une règle est reprise trois fois, c'est
  le geste qu'il faut outiller, pas la note qu'il faut réécrire ».
- **`docs/HANDOFF.md`** — *start here after the July-2026 sprint.* The
  open-gates list (owner decisions pending), the external-audit triage,
  and the "how not to regress this" invariants — written as the sprint's
  last act for the next maintainer.

---

## Stack (current, verified)

- **Frontend:** **Next.js** (App Router) + React + Tailwind, deployed to
  **Vercel**. This is the whole frontend — the Flutter Web MVP was retired
  in the rebuild (ADR 0016); there is no shell/hybrid and no Flutter left in
  the running app.
- **Backend:** Supabase (Postgres + Auth + Storage + Edge Functions),
  project ref `iwoydyudjondihzzsqay`, EU-Central.
- **Design system:** single source of truth in `web/src/lib/tokens.ts`
  (generates the CSS vars + Tailwind config); component code speaks named
  token aliases only, enforced by `scripts/token-gate.mjs` (Phase A).

---

## Production-safety non-negotiables (always in force)

These hold regardless of what else is or isn't decided. They are derived
from hard-won lessons in the ADR trail; violating them has caused real
incidents.

- **Production pushes are human-gated. Always.** No autonomous push to
  production, ever.
- **No production push without a passing branch-test** against the
  staging project, via `scripts/branch-test.ps1`. (See ADR 0005.)
- **Every migration ships a verify block that asserts post-state
  cardinality, not just structure.** A migration that appears to succeed
  while silently doing nothing is the failure mode this prevents.
  (Lesson: migration 046.)
- **RLS enabled in the creating migration**; per-user-state write RPCs
  get **service_role-only grants**. (Lessons: migrations 040, 047.)
- **No out-of-band changes to production.** All schema and seed data flow
  through migration files. The dashboard SQL editor is read-only on
  production. (Lesson: the 73 untracked edges, ADR 0003.)
- **Never edit a migration that has already run on production** — write a
  new one. Migrations are append-only history.
- **Production sync is currently UNVERIFIED** after a long dormancy.
  Before any new migration ships, confirm the production migration state
  matches local history in a supervised session.

---

## How work is documented

- Cross-cutting decisions get an **ADR** in `docs/decisions/`, numbered
  sequentially, with a "Retractions and Corrections" section (present
  even when empty).
- Grounding docs are reconciled when they drift — and always after a
  dormancy or major change. They are not write-once.

---

## Open decisions (resolve before resuming build)

These are known-unresolved and block a clean resumption. Do not paper
over them.

1. **The rules of work — RESOLVED.** Written and now living at
   `docs/Rules/RULES.md` (the two-kinds-of-work split, the human gate,
   cadence and working loop, the multi-model architecture, and the
   documentation/rebuild discipline). A living document that continues to
   evolve as the build is figured out.
2. **The frontend architecture — RESOLVED.** Next.js (App Router) on
   Vercel is the whole frontend (ADR 0016). There is no hybrid and no
   `nextjs-frontend` shell agent — `frontend-builder` IS the frontend
   agent (`docs/agents/ROSTER.md` §3, the roster refresh ADR).
3. **The agent roster — RESOLVED.** Refreshed for the 5-family model
   (Fable 5 orchestration / Opus 5 judgment / Sonnet 5 volume / Gemini
   media lane) and recorded as-lived in `docs/agents/ROSTER.md` v2 + the
   roster ADR. No new agents added; the lean roster held.
4. **Generative-content tooling.** Gemini (imagery, video) and ElevenLabs
   (narration) are intended production tools. Their sanctioned uses — and
   the hard line that generated assets never substitute for a manipulable
   interactive where the pedagogy requires manipulation — need to be
   written into the rules and the relevant agents. **[Phase E of the
   perfect-product plan resolves this.]**
5. **Production sync verification.** See non-negotiables above.

---

## The one-line reminder

Everything here serves the vision in `docs/product/VISION.md`: a calm,
deep, infinitely-patient tutor that takes a struggling student to bac
mastery. When a build decision and the vision conflict, the vision wins —
or the vision gets revisited deliberately, never overridden by accident.
