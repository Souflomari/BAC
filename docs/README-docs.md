# Documentation structure

This file explains how the project's documentation is organized and what
each layer is for. It is a map, not content.

The documentation is layered by *kind of question it answers*. Each
document has one job; keeping them separate keeps each one stable as the
others evolve.

---

## The layers

### `docs/product/VISION.md` — *why and what*
The canonical product vision. What the app is, who it serves, how learning
works, how it should feel. The north star the entire project serves. It is
**stable** — it changes rarely, and only when the vision itself shifts,
never to accommodate a build constraint. Every other document and every
agent answers to this one.

### `docs/Rules/RULES.md` — *how we work*
The build discipline and rules of work: cadence, how agents operate, the
content pipeline, production safety as operating procedure. It **evolves**
as the build is figured out. Kept separate from the vision so that changing
how we work never muddies what we're building.
*(Status: being defined.)*

### `.claude/agents/*.md` — *who does what*
The specialist subagents Claude Code uses. Each owns a lane and routes
rather than reaching outside it. Loaded per task by Claude Code.
*(Status: roster under revision.)*

### `docs/grounding/` — *where we are*
Current-state documents, reconciled against the actual repo:
- `architecture.md` — what exists today (stack, structure, conventions).
  **Réconcilié le 2026-09-05** : re-mesuré contre le dépôt, avec la commande
  qui produit chaque chiffre. La version d'avant décrivait l'application
  Flutter et vit désormais dans `docs/archive/`.
- `schema-reconciliation.md` — the database state and migration path.
  **Son jugement était juste et a été exécuté ; ce qui a vieilli est le
  temps des verbes. Étiquette de statut vérifiée en tête du document
  (2026-09-05).**
- `known-issues.md` — the catalogued, severity-scored issue list.
  **Backlog de l'ère Flutter, conservé pour ce qu'il DIT ; six entrées
  re-vérifiées contre le dépôt le 2026-09-05 (l'étiquette en tête du
  document les donne), le reste laissé au jugement du propriétaire.**

These are **not write-once.** They are reconciled whenever they drift, and
always after a dormancy or a major change. When stale, proposed
reconciliations live in `docs/reestablish-state/` pending review.

Et la leçon que la réconciliation de `architecture.md` a coûtée : **un
document d'état sans le moyen de le re-mesurer est juste le jour où on
l'écrit.** Le nouveau porte, à côté de chaque chiffre, la commande qui le
produit.

### `docs/decisions/*.md` — *what we decided and why*
The ADR (Architecture Decision Record) trail. Numbered sequentially,
append-only. Each records a decision, its context, its consequences, and a
"Retractions and Corrections" section (present even when empty). This is
the project's memory of *why* things are the way they are — referenced for
history, not edited after the fact.

### `CLAUDE.md` (repo root) — *the index*
Read automatically by Claude Code every session. Short. Orients and points
to the documents above; carries only the most essential always-on facts
(the stack, the production-safety non-negotiables, the open decisions).
Deliberately does not contain the full vision or rules — those are linked,
not duplicated.

---

## The rule of thumb

- Deciding *what to build or why* → `VISION.md`.
- Deciding *how to do the work* → `RULES.md`.
- Doing a *specific task* → the relevant agent in `.claude/agents/`.
- Asking *what's the current state* → `docs/grounding/`.
- Asking *why was this decided* → `docs/decisions/`.
- Starting any session → Claude Code reads `CLAUDE.md`, which points here.

When two documents seem to conflict, the order of authority is:
**VISION → RULES → agents.** The vision wins, or it gets revisited
deliberately — never overridden by accident.
