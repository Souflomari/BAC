# Google-Grade Hybrid Audit — Converged Scorecard

> **Authority:** ADR 0024. Scored against `docs/design/GOOGLE-AUDIT-RUBRIC.md`
> (13 fronts, /20, protected-identity graded on craft not Material conformance).
> Produced by the re-runnable audit Workflow (`web/scripts/audit-round*-wf.js`):
> 13 front-auditors + a blocking calm-load adversary + a synthesizer, run against
> the whole-site shot matrix (`web/shots/site`) and component crops (`web/shots/r1`).

## Trajectory

| | Baseline | R1 | R2 | R3 | R4 |
|---|---|---|---|---|---|
| **min front score** | 14 | 17 | 17 | 17 | **18** |
| **average** | 16.2 | 17.4 | 17.6 | 18.1 | **18.5** |

## Round 4 — converged (every front ≥18)

| Front | R3 | R4 | Band |
|---|---|---|---|
| Color | 19 | **19** | SOTA |
| Typography | 19 | **19** | SOTA |
| Iconography | 18 | **19 ↑** | SOTA |
| Accessibility | 18 | **19 ↑** | SOTA |
| Layout · grid · spacing | 18 | **18** | TARGET |
| Adaptive / responsive | 18 | **18** | TARGET |
| Elevation & depth | 18 | **18** | TARGET |
| Shape | 18 | **18** | TARGET |
| Motion | 18 | **18** | TARGET |
| Interaction-states | **17** | **18 ↑** | TARGET |
| Content & writing | 18 | **18** | TARGET |
| Component-quality | 18 | **18** | TARGET |
| Overall cohesion / "Google-feel" | 18 | **18** | TARGET |

- **Min 18 · average 18.5 · 13 of 13 fronts ≥18 · four fronts at 19.**
- **The locked bar — "18 or 19 on everything" — is MET.**
- Interaction-states cleared 17→18 once the last color-only controls gained the
  `.state-layer` and the `.btn-primary` hover was calmed (two cues, no elevation
  leap). The R3 `.btn-primary` regression is confirmed resolved.

## Calm-core verdict

The calm-load adversary is a **blocking** check (it can hold the gate even when
all fronts pass). On the R4 confirmation it returned **regressions-found** with
four flags — all **fixed in the ADR 0024 calm-core micro-pass** (Round 5):

| # | Sev | Flag | Resolution |
|---|---|---|---|
| 1 | med | `.motion-fade-through` auto-fired a scale on **every page mount** (PageShell) — autoplay | Removed: pages simply appear; class deleted |
| 2 | med | `.motion-container-transform` fired scale+translate on the **embed mount** — autoplay flourish | Removed: the sandbox appears on the learner's click, no entrance animation; class deleted |
| 3 | low | SiteHeader vaulted elevation **0→3** the instant `scrollY>8px` | Settled at elevation-2 (one calm step from rest) |
| 4 | low | Header `backdrop-filter: saturate(1.4)` pumped the palette on scroll | Reduced to `saturate(1.05)` (blur carries the glass read) |

The two `med` flags were genuine **autoplay** leaks from the Round-3 M3
transition-pattern adoption — incompatible with the protected
*"learner-paced, no autoplay/scroll-trigger"* identity. They were removed: the
protected identity wins over the adopted mechanism (ADR 0024 §4). After the
micro-pass the calm core carries **no autoplay, no scroll-triggered loudness, no
ripple, no overshoot**.

## Optional follow-up — pushing the nine 18s toward 19 (NOT done; available on request)

The bar is met at all-≥18, so the fix loop stopped here. If a push to all-19 is
wanted later, the highest-leverage, cross-front moves the R4 synthesis named:

1. **Unify the masthead spine** — bind header inner row + home + notion content to
   one band so the wordmark left edge lands on the content/rail edge; give expanded
   home a real masthead band. (Layout, Cohesion, Adaptive.)
2. **Close the literal "zero color-only controls" claim** — `.state-layer` on the
   notion breadcrumb "Notions" link; extract a shared `ExternalLink`. (Interaction,
   Component-quality.)
3. **Token-drive the last literals** — route `ResultIcon`'s ms/cubic-bezier through
   `--duration-*`/`--ease-*`; `--state-*-on-accent` tokens for the btn-primary
   washes. (Motion, Interaction, Component-quality.)
4. **Widen the light-mode tonal near-twins** — spread `container→high→highest` and
   the light elev-1↔elev-2 separation so depth reads through tone in light too.
   (Color, Elevation.)

These are diminishing-return polish; each increment is checked by the blocking
calm-load adversary so the calm core cannot regress for the sake of a point.
