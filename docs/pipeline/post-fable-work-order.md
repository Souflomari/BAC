# Ordre de travail post-Fable №1 — finir Lesson Experience v2

**Exécutant visé :** Sonnet (ou Opus), session froide. **Standard :** brief
Day-7 resserré — chaque item porte son contrat, ses fichiers, sa
vérification. **Contrat maître :** `docs/design/LESSON-EXPERIENCE-SPEC.md`
(SHA b761972) — LIS-LE EN ENTIER D'ABORD, puis ledger §11
(`docs/audits/fable-day3-ledger.md`). Livré/vérifié : §§1–2 (commits
9846496, 626fd8a). Restant : ci-dessous, dans l'ordre.

**Invariants de session :** RULES.md tient (jamais de production) ; branche
de travail only ; §13 (« poussé, déploiement non vérifié ») ; honest-state ;
dom-truth AVANT et APRÈS (121+ verts) ; commit par pièce.

**Pièges connus (payés une fois, ne les repaie pas) :**
- `git` s'exécute depuis `/home/user/BAC`, PAS depuis `web/` (le cwd
  persiste entre commandes — des commits ont échoué toute la semaine ainsi).
- `pkill -f "next start"` ne tue PAS `next-server` : trois séries de
  screenshots ont servi un build périmé. Tue par
  `pgrep -f next-server | xargs kill` (code 144 attendu, inoffensif), puis
  VÉRIFIE par curl qu'une chaîne fraîche est servie avant de croire un shot.
- `assembleSvg` (StagedFigure.tsx) ré-insère les groupes step-N juste avant
  `</svg>` : toute figure migrée doit garder ses groupes step-N EN DERNIERS
  enfants du SVG (contenu non-steppé AVANT les groupes), sinon réordre.
- Le compteur d'occurrences des figures est GLOBAL au document, calculé
  avant le découpage en chapitres (NotionBody) — ne le scope jamais.
- Les entrées du rail sont des `<button>` (plus des `<a>`) depuis 626fd8a.

## Item 1 — Zones latérales (spec §3) + M1 au masthead

Contrat : spec §3 intégral (grille ≥1536, RetenirZone adaptée de
KeyFormulaRail, sidecar `retenir.json` + fallback premier `$$`, notes de
marge, M1 cover-in-band par défaut — OWNER-DIRECTED).
Fichiers : `globals.css` (.notion-page-grid @1536), nouveau
`RetenirZone.tsx`, `content.ts` (chargeur retenir), `NotionPageView.tsx`
(zone + M1 par défaut), `content/pc/rlc-serie/retenir.json` (exemplaire —
une entrée par rung, formule KaTeX + note courte, fidèle à la leçon).
Vérif : build ; dom-truth ; shots 1536/1920 (item 4 d'abord si tu préfères) ;
la zone est VIDE ET SILENCIEUSE quand ni sidecar ni `$$` (honest-state).

## Item 2 — Vérification du sweep pagination

La pagination est renderer-level : déjà active partout. Vérifie sur :
`lois-de-newton` (9 ch.), `suites-numeriques` (11 ch. + motion +
StagedFigure à venir), `probabilites-conditionnelles` (la SEULE leçon à
`##` non-rung — ledger 11.11), une leçon SVT et une philo (items/LessonEnd).
Vérif : screenshot chapitre 1 + un `?chapitre=n` profond chacun ; flèches ;
`⌘P`/emulateMedia print = tout déplié. Toute anomalie = fix + ligne ledger.

## Item 3 — Fan-out StagedFigure (la table ledger §11)

Contrat : spec §2.5 (seuil) + §2.8 (stages AUTORÉS). 70 figures restantes
(census ledger §11 : 34 graphes → toujours staged ; 23 schémas + 15 autres
→ jugement « geste d'enseignement », refus documenté légitime).
Par figure : (a) éditer le SVG — envelopper les couches en
`<g id="step-N">` EN DERNIERS enfants, ordre = axes → données → lecture
pour les graphes ; (b) écrire `media/<slug>.stages.json` (captions
prosifiées, PAS de x_y bruts dans le texte visible) ; (c)
`node web/scripts/validate-content.mjs content/<m>/<leçon>` vert.
Procède par vagues de ≤6 leçons, pilote d'abord (une figure vérifiée en
rendu avant le fan-out — discipline D10). Mets à jour la table ledger §11
(done/pending/declined-with-reason) À CHAQUE VAGUE, pas à la fin.
`arbre-pondere` (3 placements, AUCUN groupe) est le cas le plus délicat :
ses 3 placements doivent retrouver leur progression via initialStage.
SVT : NE PAS TOUCHER (gate propriétaire).

## Item 4 — Paliers shots 1536/1920

Contrat : spec §5. `web/scripts/shots.mjs` : ajouter wide 1536×960 +
ultra 1920×1080 ; ouvrir les gates `vpName === "desktop"` (:167,:182) aux
trois paliers desktop ; un shot par chapitre via `?chapitre=n` sur la leçon
de preuve. Le hack thème (classList) est une dette CONNUE (ledger 11.12) —
ne le corrige que si trivial, sinon laisse.

## Item 5 — Batterie dom-truth §5 complète

Contrat : spec §5. Ajouts : StagedFigure absence/présence après clic
(précédent exact `:133` + le clic de shots.mjs `:190`) ; chapitre 2
`hidden` présent dans le DOM ; deep-link `?chapitre=3` actif ; affordance
`Chapitre 3 /` ; print émulé = chapitres visibles + contrôles masqués ;
RetenirZone honest-state (jamais de contenu fabriqué — vide autorisé).
Vérif : 121+N verts, deux fois de suite (le boot à froid flake parfois).

## Clôture

Chaque item : commit dédié, §13 dans tout langage de déploiement, rapport
final = état de la table §11 + URLs complètes cliquables
(`https://bac-pink.vercel.app/notions/pc/rlc-serie?chapitre=3` est la
preuve type). Ce qui ne tient pas dans ta fenêtre : laisse la table §11
exacte — c'est elle, le handoff.
