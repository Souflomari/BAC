# Recovered reference material — RLC (`rlc_serie`)

> **What this is.** The *worth-keeping* archive material the mining report
> (`docs/cadre/validation/rlc-mining-report.md`) identified, recovered as
> **INPUT/reference for the producers** — NOT as content to ship. Nothing here is
> finished content; it is a behaviour spec + worked-number seeds, each screened
> against the cadre `rlc_serie` boundary.
>
> Provenance: distilled from `mobile/bac_app/lib/widgets/physics/rlc_simulator_widget.dart`
> and `circuit_simulator_widget.dart`, and `backend/supabase/migrations/033_long_lessons_pc.sql`
> (archive anchor commit `6ba4c78`, local tag `archive/pre-rebuild`). Flutter is
> retired (ADR 0016) — the widgets are a **behaviour référence, not reusable code**.

---

## 1. Behaviour reference for the RLC manipulable (→ interactive-author)

The retired `rlc_simulator_widget.dart` is the proof of the right interaction. Reproduce its *behaviour* in the new embed (Falstad/GeoGebra), not its code:

- **Three sliders:** inductance `L` (≈ 0.5 H), capacitance `C` (≈ 100 µF), résistance `R` (≈ 10 Ω).
- **Live output:** the `u_C(t)` (and optionally `i(t)`) trace, updating as the sliders move; a régime label (**sous-amorti / critique / sur-amorti**); an energy view (C ↔ L exchange, R dissipating).
- **The teaching move it enables:** drag `R` from ~0 upward → watch the trace go from (near-)undamped oscillation → pseudo-periodic decay → critical → apériodique; drag `L`/`C` → watch the period change. This *is* the "influence of R/L/C on the régime and the period" the cadre asks for, experimentally.

> **⚠ BOUNDARY CAVEAT — read before reusing.** The old widget computes the damped
> response in **closed form** (`exp(-αt)·cos(ω_D t)` with `ω_D=√(ω₀²−α²)`, the
> over/critically-damped exponentials, the damping coefficient `α=R/2L`). That
> analytic damped solution is **OUT of scope** (cadre LIMITE: damped → *establish
> the ODE only*; no pseudo-period as f(R,L,C), no damping coefficient, no closed
> envelope). The manipulable may **display** the damped trace (that is the
> qualitative/experimental view the cadre allows), but the **lesson must not
> derive or formularize** it. The only analytic solution taught is the **undamped**
> one. Keep the embed free-oscillation + entretien; **never** forced résonance.

## 2. Worked-number seeds (→ content-author / pedagogy-architect)

Screened to stay inside the boundary. Reuse the *numbers*, author the prose fresh.

**Prerequisites (RC/RL — `dipole_rc`/`dipole_rl`, from migration 033, in-boundary):**
- RC time constant: `τ = RC`. Worked: `E=12 V, R=1 kΩ, C=100 µF → τ = 0,1 s = 100 ms`; régime établi ≈ `5τ`.
- Stored energy: `E_C = ½ C u_C²` (condensateur), `E_L = ½ L i²` (bobine).

**Undamped RLC (the ONLY analytic case — clean seed set):**
- Take `L = 0,1 H`, `C = 10 µF` → `LC = 10⁻⁶`, `√(LC) = 10⁻³ s`.
- Période propre: `T₀ = 2π√(LC) = 2π·10⁻³ ≈ 6,28 ms`; pulsation propre `ω₀ = 1/√(LC) = 1000 rad/s`.
- (Alt, matching the widget's defaults: `L=0,5 H, C=100 µF → T₀ ≈ 44,4 ms, ω₀ ≈ 141 rad/s`.)
- Energy in the undamped LC: `E_tot = E_C + E_L` is **conserved** and sloshes C↔L; with R present, `E_tot` decreases — R dissipates by **effet Joule** (this is the energetic interpretation of the damping, which IS in scope).

## 3. Circuit schematic reference (→ diagram-author)
A séries RLC: a charged capacitor `C`, an inductor `L` (with its internal résistance), a resistor `R`, and a switch — drawn as a clean coded SVG (structural-diagram, never Gemini). The old `circuit_simulator_widget.dart` is the topology référence only.

## 4. NOT recovered (per the mining report)
Old lesson **prose** (wrong format, not DESIGN-BIBLE décortiquer), old **items** (not misconception-built), and **any closed-form damped math or forced-resonance content** from the widgets/lessons — all off-boundary or off-standard. Author fresh from the spec.
