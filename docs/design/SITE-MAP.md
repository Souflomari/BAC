# SITE-MAP — the product shell (Day-9 skeleton)

> **Why this exists.** Until Day 9 the app was one chapter behind a thin home.
> The owner asked for the *whole* navigable product — filière → matière →
> chapitre — so the experience can be audited end-to-end before content is
> authored. This is that shell: real structure, honest empty states, no
> invented content. Audience includes a cold maintainer (Sonnet/Opus) after
> the sprint.

## The route tree

```
/                         Dashboard — session card + subject grid + "disponible" shelf
/commencer                Filière onboarding (choose / change your stream)
/matieres/[subject]       Subject index — units → chapters (built = link, else "À venir")
/notions/[subject]/[slug] The lesson (existing; the only surface with real content)
/nonexistent-xyz          404 (existing)
/options/*                Owner decision-aid mocks (temporary; deleted after picks)
```

Navigation up the tree, everywhere: **Accueil › Matière › Notion** (the shared
`Breadcrumb`, `components/ui/Breadcrumb.tsx`). The notion breadcrumb's matière
segment links to `/matieres/[subject]`.

## The data model — `web/src/lib/curriculum.ts`

Pure structural data, no lesson content:

- **`FILIERES`** (4 science streams, from `docs/cadre/cadre.yaml`): sm-a, sm-b,
  pc, svt — each with its subjects in **coefficient order** (the real bac
  coefficients).
- **`SUBJECTS`** (maths, pc, svt, philo, si): each a list of **units** →
  **chapters**. PC is transcribed verbatim from the official cadre
  (`docs/cadre/curriculum/pc-physique-chimie.yaml`); maths/svt/philo are the
  standard 2ème-Bac programs pending their own cadre extraction (marked
  `source` in the data); si (SM-B) is a stub.
- A chapter's **id** is `${subjectId}/${slug}`. **Availability is never stored**
  — it is computed against the built content tree (`listNotions()`), so the
  catalogue can never claim a lesson that doesn't exist (the honest-state rule
  at the catalogue level). The three built today: `pc/rc-charge`,
  `pc/rlc-serie`, `maths/probabilites-conditionnelles`.

## Honest-state at the catalogue level

- Chapters show **"Disponible"** (built, links to the notion, real reading
  time) or **"À venir"** (un-built, calm non-interactive row). Never a fake
  "coming soon date," never a locked-with-progress teaser.
- Subject cards show **real counts** — "N chapitres · M disponibles" — computed,
  not invented. A stub subject says "Programme à venir."
- No progress, no %, no "reprendre" — learning state still does not exist and
  is not fabricated (the honest-state rule; dom-truth guards the dashboard
  text against `en cours|% terminé|complété|Reprendre|maîtrisé`).

## Filière as a device preference

`web/src/lib/useFiliere.ts` — the chosen stream persists in `localStorage`
(`bac-filiere`), exactly like the theme (ADR 0025 §2.11: device/chrome
preferences may persist; the honest-state rule governs *learning* state, which
this is not). **It never gates the app** — with no filière the dashboard shows
the four science subjects; with one set it shows that stream's subjects in
coefficient order with the coefficient chip. The header `FiliereBadge` shows the
current stream (or "Choisis ta filière") and links to `/commencer`.

## How to add …

- **… a chapter to the catalogue:** add `{ slug, title }` to the right unit in
  `SUBJECTS`. It renders immediately as "À venir".
- **… make a chapter a real lesson:** create `content/<subject>/<slug>/` (its
  slug MUST match the chapter slug). Availability, the dashboard count, the
  "Disponible" chip, and the reading time all light up automatically.
- **… a subject:** add it to `SUBJECTS` (+ its label in `subjects.ts`
  `SUBJECT_LABELS`, + a cover motif in `Cover.tsx`), and reference it from the
  relevant `FILIERES[].subjects`.
- **… a filière:** add it to `FILIERES` with its subjects + coefficients.

## What is deliberately NOT built (skeleton scope)

Content (all chapters but the three built), per-student progress/persistence
(production-lane, human-gated), search, and any filière-specific chapter
*depth* differences (subjects are shared; the streams differ by coefficient and
subject set, which is what the skeleton models). These are the owner's audit
surface — the shell is complete and navigable; the depth comes next.
