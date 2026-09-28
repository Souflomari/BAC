# RLC mining report — what the archive holds for `rlc_serie`

> **Scope:** the notion *"Oscillations libres dans un circuit RLC série"* only
> (`rlc_serie` in `docs/cadre/curriculum/pc-physique-chimie.yaml`). This is an
> **inventory**, not a recovery — nothing here is merged into the working tree.
> Recovery is a build-phase decision for the human.
>
> **Archive anchor:** commit **`6ba4c78`** (on `origin/claude/vibrant-fermi-v1lxj5`;
> local annotated tag `archive/pre-rebuild`). The working tree was **not cleared**
> (the website content is DB-resident → §3-gated), so every path below is also
> readable directly today. Retrieval either way: `git show 6ba4c78:<path>` (or
> `git show archive/pre-rebuild:<path>` locally).
>
> **The bar each candidate is judged against:**
> - the cadre `rlc_serie` **savoir_faire** (regimes; *establish* the damped ODE;
>   closed-form **only** in the undamped LC case, `T₀=2π√(LC)`; energy diagrams;
>   entretien), and especially its **LIMITES** (damped → establish-ODE-only, **no**
>   closed-form damped solution / no pseudo-period as f(R,L,C)) and **EXCLUSIONS**
>   (forced resonance, impedance, phasors, complex notation, AC power, active
>   components);
> - the **DESIGN-BIBLE** (coded structural visuals; manipulables are embeds, not
>   rebuilt; calm core);
> - the new **item standard** (misconception-mapped distractors, ≥3/misconception).

---

## Candidates (each with a worth-recovering verdict)

### 1. RLC curriculum placement & prereq chain — `032_seed_pc_skills.sql`
- **Path:** `backend/supabase/migrations/032_seed_pc_skills.sql` (skill `pc_rlc_oscillations` — "Oscillations RLC libres" — under `pc_electricity`, prereqs `pc_rc_circuit` + `pc_rl_circuit`; downstream `pc_am_modulation`).
- **What:** the old skill node + its prerequisite edges for RLC.
- **Verdict: recover the *confirmation* only, not the data.** The RC→RL→RLC→modulation chain **matches** the cadre chapitre order (`dipole_rc → dipole_rl → rlc_serie → applications_modulation`), so it's a useful cross-check that the boundary's placement is right. But the old skill **code** (`pc_rlc_oscillations`) is **not** the cadre id (`rlc_serie`) — do **not** reuse it (ADR 0011 skill-code reconciliation). No teaching content here.

### 2. Old RLC / RC / RL lesson JSON — `033_long_lessons_pc.sql` (+ short intros in `032`)
- **Path:** `backend/supabase/migrations/033_long_lessons_pc.sql` (rich `lesson` JSON blocks for Dipôle RC and Dipôle RL — EDO, `τ`, stored energy, a worked example, an MCQ checkpoint — and the RLC-oscillations entry).
- **What:** structured prior teaching content (formulas, worked numbers, checkpoints).
- **Verdict: recover *substance/numbers* as a sanity reference, re-author prose; RLC part GATED behind a boundary check.** The RC/RL worked numbers (`τ=RC`, `E_C=½Cu²`, the 5τ rule, the 12 V / 1 kΩ / 100 µF example) are sound and reusable as worked-example seeds (RC/RL are the cadre prerequisites `dipole_rc`/`dipole_rl`). **For the RLC entry specifically, verify before reusing** that it does **not** (a) solve the *damped* case in closed form, (b) give a pseudo-period as a function of R,L,C, or (c) touch forced resonance/impedance — all are cadre **LIMITES/EXCLUSIONS** for `rlc_serie`; any such content is **off-boundary → not worth recovering**. Format is the old JSON-block model, **not** the DESIGN-BIBLE décortiquer — recover the *substance*, author the lesson **fresh**.

### 3. PC exam papers / questions — `034_exam_papers_pc.sql`
- **Path:** `backend/supabase/migrations/034_exam_papers_pc.sql` (contains RLC exam questions).
- **What:** bac-style RLC exam items.
- **Verdict: candidate for ramp R6 (past-bac) — pending PROVENANCE + boundary.** The `rlc-scope-check` already flagged that R6 needs **genuine, year+session-sourced** national-exam questions. If these carry real citations, they're valuable; if they are reconstructions (as the old probability bank turned out to be), they are **not** a substitute for sourced exams. Inventory them as candidates to **verify**, not to trust. Must also be screened against the boundary (reject any forced-regime/impedance question).

### 4. Physics items / lessons seed — `items_physics_expanded.sql`, `lessons_physics.json`, `010_items_physics_svt.sql`
- **Path:** `backend/seed/content/items_physics_expanded.sql` (0 RLC hits — little/no RLC), `backend/seed/content/lessons_physics.json` (some circuit/oscillation matches), `backend/supabase/migrations/010_items_physics_svt.sql`.
- **Verdict: low value.** Sparse RLC coverage, and the old items are **not** built to the new diagnostic standard (no misconception-mapped distractors, no ≥3/misconception floor). Treat as background only; the new items are authored fresh by item-author from the pedagogy spec.

### 5. `rlc_simulator_widget.dart` — the interactive RLC simulator ★
- **Path:** `mobile/bac_app/lib/widgets/physics/rlc_simulator_widget.dart` (706 lines).
- **What:** a working interactive — sliders for R/L/C, the three regimes (périodique / pseudo-périodique / apériodique), energy exchange capacitor↔inductor, oscilloscope-style trace.
- **Verdict: HIGH value as a BEHAVIOUR SPEC — not as code.** Flutter is retired (ADR 0016); the new manipulable is a **GeoGebra/Falstad embed** (ADR 0017 / `interactive-author`, where Falstad is called out as critical for circuits). This widget proves the *right* interaction (drag R → watch the regime change; see the energy diagram) and is the behaviour reference the embed should reproduce — exactly as the probability spec cited the old `ProbabilityTreeWidget`. **Recover as a behaviour reference; re-implement as an embed.** Keep it inside the boundary: free oscillations + entretien, **never** forced resonance.

### 6. `circuit_simulator_widget.dart` — RC/RL/RLC circuit sim ★
- **Path:** `mobile/bac_app/lib/widgets/physics/circuit_simulator_widget.dart` (803 lines).
- **Verdict: behaviour reference (medium).** Same status as #5 for the circuit-schematic + simulation side — a reference for the Falstad circuit interactive, not reusable Flutter code.

### 7. RC prerequisite widgets — `capacitor_charge_widget.dart` (+ other physics widgets)
- **Verdict: tangential / low.** RC charge is the `dipole_rc` *prerequisite*, not `rlc_serie`. Behaviour reference only if the lesson revisits RC; otherwise skip.

---

## One-line summary
**Worth pulling forward (as references, gated behind a boundary check):** the two interactive widgets (#5, #6) as **behaviour specs** for the new GeoGebra/Falstad embed, and the RC/RL/RLC **worked numbers** in `033` as worked-example seeds. **Verify provenance** of the `034` exam questions before using any for R6. **Not worth recovering wholesale:** the old lesson *prose* (wrong format) and the old *items* (not misconception-built) — and any RLC content that solves the damped case in closed form or enters forced resonance/impedance (off the cadre boundary). Author the notion **fresh** from the cadre + the pedagogy spec; reuse contexts/numbers, not text.

*Nothing in this inventory has been recovered into the working tree — that is a build-phase decision.*
