# Eval harness — DISPOSABLE

> ⚠️ **This is a throwaway evaluation rig, not the product.** It exists so the
> human can experience **one notion as a student** in a rendered UI. It is **not**
> the ADR-0016 Next.js/React frontend, it is not reusable-by-design, and it should
> be **deleted and redone cleanly** once the test notion is approved. Do not build
> on it.

## What it renders

The conditional-probability test notion (`content/maths/probabilites-conditionnelles/`):

- **`lesson.md`** — the pipeline-authored lesson (path A): hook → décortiquer →
  worked examples, with **math as live KaTeX** (never images), in a bounded
  ~65ch reading column.
- **`media/arbre-pondere.svg`** — the coded weighted-probability tree, inlined
  where the lesson places the `[[ARBRE_PONDERE]]` marker (per ADR 0017: structural
  diagrams are coded SVG + KaTeX, never Gemini).
- **`items.yaml`** — the 24 diagnostic items as **interactive questions**: the
  student answers, gets **immediate per-action feedback**, and each
  misconception-mapped distractor shows the specific wrong model it reveals.

Calm, one-thing-at-a-time, learning-core only — no streaks, XP, timers, or
peripheral chrome (DESIGN-BIBLE §7). Styling uses the **v0.3 provisional tokens**
(cool tinted-neutral surfaces, single blue accent `#3E5C86`, no pure black/white,
soft geometry).

## Stack (lightest that does the job)

- **Vite** + **vanilla TypeScript** (no framework).
- **marked** (markdown), **js-yaml** (items), **KaTeX** + auto-render (live math).
- Reads the content files directly via Vite `?raw` imports (`vite.config.ts`
  allows fs access to the repo root). Editing a content file hot-reloads.

## Run it

```bash
cd eval-harness
npm install      # first time only
npm run dev
```

Then open the URL Vite prints — by default **http://localhost:5173**.

To walk through it as a student: read the lesson top to bottom (the disease-test
hook is posed at the start and resolved at the reversal beat), then answer the
**« S'entraîner »** items at the bottom and read the feedback on each choice.

## Data source / staging note

For this disposable rig, item content and the correct/feedback logic come from the
local **`items.yaml`** (rendered and checked client-side). It does **not** connect
to Supabase: the staging migration is prepared **as files only** under
`content/maths/probabilites-conditionnelles/staging-migration/` (it was not run —
no Supabase CLI / staging credentials in this environment, and production is
off-limits). Wiring the harness to staging item-state is deferred to when the
notion is rebuilt cleanly; it is not needed to experience the notion.

## Throw it away

When the test notion is approved (or rejected), delete `eval-harness/`. Nothing
depends on it.
