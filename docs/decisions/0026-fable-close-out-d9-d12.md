# ADR 0026 — Clôture Fable : le second arc (2026-07-04 → 07-06) et la passation

**Statut :** SKELETON (Day 12, matin) — étoffé en fin de journée, dernier
acte de la dernière session Fable. Ce document consolide le second arc du
sprint ; le premier (06-27 → 07-03 : amendements bible + §11–13, TOKENS v2,
template v2, Derivation/AttemptFirstExercise/LessonEnd/covers, l'événement
d'audit externe, le verdict de portabilité Day-7) est **ADR 0025** — rien
n'en est dupliqué ici, tout y est référencé.

## Périmètre (à étoffer)

1. **D9 — le squelette du site** : navigation filière → matière → chapitre.
2. **D9.5 — le remplissage** : 61 leçons réelles (maths 14, PC 25, SVT 11,
   philo 11) + l'audit 11 critiques + la remédiation Tier-1.
3. **D10 — la couche média** : 72+ figures codées (PC 25/25, maths 14/14,
   2 refus honnêtes), 5 motions vérifiées beat par beat, 3 embeds PhET
   curatés (URLs vérifiées en direct), bilan `docs/audits/d10-media-layer.md`.
4. **D11 — Lesson Experience v2** : LESSON-EXPERIENCE-SPEC (b761972),
   StagedFigure (absence réelle du DOM, 9846496), pagination par chapitres
   (626fd8a), ledger §11 (12 décisions + table de migration).
5. **D12 — la passation** : HANDOFF réécrit, ordre de travail post-Fable,
   DASHBOARD-SPEC, skills, THEME-ARCHITECTURE (si atterri).

## Les règles nées du sprint (état au 07-06 — à étoffer)

rendered-truth · deployed-truth (§13) · guards-target-classes ·
verification-conditions-span-owner-conditions · honest-state ·
spec-first (D11) · pilot-before-fan-out (D10).

## La flotte d'instruments (état au 07-06 — à étoffer)

dom-truth 121 vérifications · garde-classes lexicale · build stamp ·
paliers de viewport · validate-content (garde-marqueurs + sidecars stages) ·
shots (beats + étapes).

## Décisions de record (à étoffer)

*(les décisions D9–D12, chacune avec son ancre ledger/commit)*

## Retractions and Corrections

*(néant pour l'instant)*
