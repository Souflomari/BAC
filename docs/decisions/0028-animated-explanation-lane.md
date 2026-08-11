# ADR 0028 — The animated-explanation lane (Manim), and the industrialization verdicts

- **Date:** 2026-08-07
- **Status:** Accepted (owner-directed)
- **Owner directive:** "For math, I don't want to just do the exercise. I
  want the exercise to be explained with animation, visuals, etc.,
  something very well developed." Plus four industrialization verdicts
  recorded below.

## Context

The mastery road (Phase C) is filling the S'entraîner banks with real
past-bac exercises (113 live at the time of writing). The owner's next
product bar: each exercise should carry a **well-developed animated
explanation** — 3Blue1Brown-class visual walkthroughs, not just printed
correction steps.

ADR 0021 had partitioned motion/video and left `[[video:]]` hard-stubbed
with exactly one dead marker; the roster refresh (ADR 0027 era) replaced
stray "Manim" references with the MotionStage/GSAP lane. Those decisions
concerned **in-product interactive motion**. This ADR deliberately
revisits ADR 0021's video scope — per the VISION discipline that the
vision/rules get revisited deliberately, never overridden by accident —
to open a **new surface**: rendered per-exercise explanation videos.

Research verdict that shaped the tooling choice (2026-08-07, sourced in
the session log): **the ElevenLabs API is audio-only** (TTS, STT, music,
SFX, dubbing, voice tools, forced alignment). Their image/video product
(ElevenCreative, hosting Sora 2 / Veo 3.1 / Kling / Seedance / FLUX) is
Studio-UI-only with no API endpoints. The owner's pre-stated decision
rule therefore fires: we build our own scripted animation library.
Independently, generative video could not carry this content anyway —
exact equations, exact curves, step-synchronized reveals are precisely
the "load-bearing content" that ADR 0017 bars generated assets from
carrying. Manim is **coded** animation (programmatic, deterministic,
LaTeX-typeset) — the same philosophy as our coded SVG figures, rendered
to video.

## Decision

1. **Manim Community Edition is the engine of the explanation lane.**
   Scene scripts are first-class, reviewed source in `animations/`;
   rendered videos are build artifacts (never committed to git).
2. **Division of labor between the two motion lanes:**
   - **MotionStage/GSAP** keeps in-product, learner-paced, interactive
     reveals (live KaTeX, DOM-native, reduced-motion aware).
   - **Manim** renders the cinematic explanation walkthroughs attached
     to bank exercises ("Explication animée").
   - The ADR 0017 hard line stands unchanged: a rendered asset never
     substitutes for a manipulable interactive where the pedagogy
     requires manipulation.
3. **House rules for scenes** (enforced by review, carried by the
   `animations/style` module):
   - Exact values only — every number, equation, and curve comes from
     the verified bank entry; no decorative approximation.
   - The visual identity mirrors `web/src/lib/tokens.ts` (warm cream
     surfaces, warm ink, teal accent). The style module carries the
     mapped constants and names the token each mirrors; a token change
     implies a style-module sync (checked at review, same discipline as
     TOKENS.md).
   - French, bac register, decimal commas in prose; LaTeX follows the
     same conventions as the banks' KaTeX.
   - Calm-core player contract for the eventual web integration: no
     autoplay, learner-paced chapter stops per question, visible
     progress, `prefers-reduced-motion` respected (poster + transcript
     fallback), transcript/captions mandatory at fan-out.
   - Every scene carries a `NARRATION` script (plain French text per
     chapter) from day one, so ElevenLabs TTS (audio API) can be
     batch-muxed later without touching scenes — that remains Phase E3.
4. **Render execution: Claude Code directly** — this container or CI
   (the workflow can render via the official `manimcommunity/manim`
   Docker image), or any machine with the SETUP.md install. **Not
   Cowork** — the owner reserves Cowork for the ElevenLabs Studio phase
   (E3). This corrects the earlier draft plan that routed batch renders
   through Cowork.
5. **Roster:** no new agent (B4 principle). motion-author's charter
   extends to Manim scene authoring; adversarial review of a scene's
   mathematical content follows the same verification discipline as
   bank entries (author never self-certifies).
6. **Storage for fan-out is deliberately deferred.** The pilot is
   reviewed as a file delivered to the owner directly. Before fan-out,
   pick between Supabase Storage (+CDN) and Vercel-adjacent hosting —
   an owner-gated call recorded in a follow-up ADR or amendment here.

## Companion industrialization verdicts (same session, recorded once)

- **Usage overflow:** the owner stays within the existing subscriptions —
  **no Anthropic API key, no y-router/OpenRouter proxying**. The free
  Gemini lane (ADR-pending formal lift, see Phase E1 queue) remains the
  volume valve; weekly-window management remains the discipline.
- **Playwright/CI:** authorized — the truth gates now also run as a
  GitHub Actions workflow (`.github/workflows/gates.yml`) on every PR,
  costing zero session usage. `dom-truth` accepts `PW_CHROMIUM_PATH`
  so CI can supply its own Chromium.
- **NotebookLM:** adopted for zero-token document grounding (cadres,
  corrigés, SVT corpus) via the community MCP server, on the owner's
  desktop — setup guide at `docs/ops/NOTEBOOKLM-SETUP.md`. Unofficial,
  browser-automation-based: useful tooling, never load-bearing
  authority over the scans.

## Consequences

- `animations/` enters the repo with README, SETUP, style module, scene
  templates, a manifest mapping bank entries to scenes, and the pilot
  scene (`maths/nombres-complexes-1/bk-2018-n-x2` — the 2018 rotation/
  equilateral-triangle exercise).
- The `[[video:]]` question from ADR 0021/Phase E4 will be answered by
  this lane's web-integration step (likely a dedicated
  `Explication animée` block in the S'entraîner surface rather than the
  old inline marker) — decided at pilot review, not silently.
- Phase E1's "write the generative-media rules" obligation is unchanged
  and still owed; this ADR covers the **coded** animation lane only.

## Retractions and Corrections

*(none yet)*
