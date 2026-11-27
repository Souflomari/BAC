# ADR 0026 — Clôture Fable : le second arc (2026-07-04 → 07-06) et la passation

**Statut :** RECORD (Day 12, clôture — dernière session Fable). Consolide
le second arc du sprint ; le premier (06-27 → 07-03) est **ADR 0025**,
rien n'en est dupliqué. Évidence détaillée : ledger
`docs/audits/fable-day3-ledger.md` §§9–11, `docs/audits/d10-media-layer.md`,
`docs/audits/d95-content-audit.md`, `docs/design/LESSON-EXPERIENCE-SPEC.md`.

## 1. Décisions de record du second arc

1. **D9 — le squelette entier du site** : navigation filière → matière →
   chapitre, tout SSG, honnêtement à-venir où le contenu manquait alors.
2. **D9.5 — le remplissage complet** : 61 leçons réelles (maths 14, PC 25,
   SVT 11, philo 11), vague par vague, audit 11 critiques
   (`d95-content-audit.md`), remédiation Tier-1 sur décision propriétaire.
3. **D10 — la couche média, PC + maths seulement** (SVT exclue par
   directive propriétaire — hors périmètre Fable ; c'est une DÉCISION,
   pas un oubli) : 39 leçons couvertes en figures codées (72+ SVG, tokens
   seulement, deux refus honnêtes documentés), 5 motions vérifiées beat
   par beat, 3 embeds PhET curatés (URLs vérifiées HTTP 200, garde-fous
   de cadre + câblage misconceptions sur le modèle rlc-sandbox).
   Discipline confirmée : pilote vérifié en rendu AVANT tout fan-out.
4. **D11 — Lesson Experience v2, spec-first** : LESSON-EXPERIENCE-SPEC
   (commit b761972) écrite et commise AVANT le code, sur scout 6 voies ;
   StagedFigure livré (9846496 — étapes RETIRÉES du DOM, motif
   AttemptFirst généralisé aux figures) ; pagination par chapitres livrée
   (626fd8a — rail navigateur, ?chapitre=n, flèches, print linéaire) ;
   §§3–5 transmis via l'ordre de travail. Douze décisions au ledger §11 ;
   la revue M/W du D8 close par supersession (M1 + W3 adapté + W1).
5. **D12 — la passation** : HANDOFF §5 (QA trois jambes, règle de swap de
   modèle, spec-first), `docs/pipeline/post-fable-work-order.md` (brief
   Sonnet froid, standard Day-7), DASHBOARD-SPEC (honest-state absolu,
   contrat StudentState + dégradé véridique), THEME-ARCHITECTURE (règle de
   cartographie sémantique + thème « craie » travaillé), trois skills
   (`.claude/skills/design-bible|figure-authoring|verification`).

## 2. Les règles nées ou confirmées ce sprint (état exécutoire au 07-06)

- **rendered-truth** : rien n'est vrai avant d'être rendu et regardé.
- **deployed-truth (§13)** : « poussé, déploiement non vérifié » ; les
  webhooks de plateforme sont des rapports, pas des preuves.
- **guards-target-classes** : une garde vise la classe du défaut, jamais
  l'instance ; le vocabulaire nouveau entre dans la garde le même commit.
- **verification-conditions-span-owner-conditions** : thème réel,
  viewports réels, chemins réels — pas de conditions de laboratoire.
- **honest-state** : aucun état fabriqué, ni dans l'UI ni dans les
  rapports d'agents ; refus documenté = livrable légitime.
- **spec-first** (né D11) : l'architecture atterrit en spec commise avant
  le code ; la fenêtre qui se ferme laisse la spec comme relève.
- **pilot-before-fan-out** (né D10) : une pièce vérifiée en rendu avant
  tout parallélisme.

## 3. La flotte d'instruments (état au 07-06)

dom-truth 121 vérifications (batterie duck-typed + sweeps : contraste deux
thèmes, mesure ≤75ch, lexique d'auteur, parité MathML 488/488, stamp de
build == HEAD, paliers larges) · validate-content (garde-marqueurs +
sidecars .stages.json en échec dur) · shots (viewports, beats de motion,
étapes de StagedFigure) · le ledger vivant. Extension due : ordre de
travail items 4–5 (paliers 1536/1920, batterie pagination/StagedFigure).

## 4. Renvois au premier arc (ADR 0025 — non dupliqués)

Amendements bible + §§11–13 · TOKENS v2 · template v2 (le champ `stages`
ajouté au §E ce second arc) · Derivation, AttemptFirstExercise, LessonEnd,
covers (StagedFigure les rejoint ce second arc) · le verdict de
portabilité Day-7 (« la boucle de resserrement converge ») — vérifié une
seconde fois ce second arc à l'échelle : 25+ agents Sonnet ont produit
figures/motions/embeds recevables sous briefs resserrés, les écarts
(marqueurs non insérés, une session-limite) rattrapés par le protocole,
pas par la chance · le triage d'audit externe et ses fixes.

## 5. Ce qui n'est PAS fait (transmis, pas caché)

L'ordre de travail №1 (§§3–5 de la spec v2, 70 figures à migrer, paliers
de shots, batterie dom-truth) · les portes propriétaire de HANDOFF §0
(1–7bis) · SVT média · la lane production (sync gate d'abord) · le
dashboard et les thèmes (specs prêtes, zéro code).

## Retractions and Corrections

*(néant à la clôture)*
