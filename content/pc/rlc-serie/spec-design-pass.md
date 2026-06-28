# Pedagogy spec — DESIGN-PASS ADDENDUM — Oscillations libres dans un circuit RLC série (PC · 2ème Bac)

> **What this is.** The *experience-layer* addendum to `content/pc/rlc-serie/spec.md` — the first
> time RLC gets the design pass (motion, figure-driven explanation, in-lesson practice, progressive
> figures). It is **additive and structural**, not a re-spec of the physics. Source of intent:
> `docs/design/01-rlc-design-pass-brief.md`. Tooling authority: ADR 0021 (coded motion = exact;
> Veo = intuition only; the hard line; PhET POC) extending ADR 0017.
>
> **Read this WITH `spec.md`, not instead of it.** Everything in `spec.md` stands — the §0.4
> boundary, the eight-misconception inventory (M1–M8), the R0→R9 ramp, the habileté mix, the
> coverage floor. This addendum adds *how the existing beats are experienced*. Where this file
> introduces a callout, it uses the same typed style (`type` + `tool`) as `spec.md §3`.
>
> **What this addendum does NOT do.** It does not re-litigate the physics or §0.4 (both converged).
> It does not write lesson prose, final items, diagrams, or code — it **specs**; the Phase-C
> producers (motion-author, diagram-author, interactive-author, content-author, item-author, the
> Veo lane) build. It does not shorten depth (see §D5, the anti-microlearning guardrail).
>
> **Language policy unchanged.** Meta is English; **every student-facing string is French.**
> The §0.4 boundary is reproduced as a one-line guard at the head of each producer section so no
> Phase-C author can build a beat without seeing it.
>
> ---
>
> ## ⚠ VALIDATION STATUS — proposed, not yet human-validated
> Same gate as `spec.md`: produced ahead of the human's domain-judgment pass; the human reviews at
> the rendered-notion editorial gate (Phase F). Every placement below is *proposed*.

---

## D0. The boundary guard — reproduced verbatim, applies to every beat in this addendum

**No new beat, figure, motion clip, Veo clip, or checkpoint may cross §0.4.** Restated so no
Phase-C producer can miss it while building the experience layer:

- **Damped case → ESTABLISH the ODE only.** No closed-form damped solution, no pseudo-période as
  `f(R,L,C)`, no damping coefficient / λ / α / facteur de qualité / décrément logarithmique, no
  closed-form `e^{−αt}` envelope. The damped regimes are **qualitative + energetic + experimental**.
- **Closed form ONLY undamped (LC, R négligeable):** `q(t)=Q_max·cos(2πt/T₀+φ)`, `T₀=2π√(LC)`.
- **Entretien = Joule-loss compensation** restoring the **FREE** regime at `T₀` (`u_G=k·i`, `k=R`
  cancels the damping term). Never framed as a forced/driven regime.
- **EXCLUSIONS — never enter:** résonance forcée, impédance, déphasage, **phaseurs**, notation
  complexe, puissance en régime alternatif. No AC-sweep, no résonance curve, no impedance readout —
  **in figures, in motion, in Veo, in the interactive, in checkpoints.**

This is the spine of correctness; the review gate (§D6) bounces any drift.

---

## D1. Derive-with-the-figure beats — equations built term-by-term ON the picture

The reviewer's remark (brief #4, #5): *equations are asserted, not visibly derived* — and
specifically *where does `u_C = q/C` come from?* The wave-1 lesson asserts `u_C=q/C`,
`i=dq/dt`, `u_L=L·di/dt` as "known from RC/RL" (lesson R2 lines 104–108). The design pass keeps
that brevity for the *full* re-derivation (we do NOT re-teach RC/RL) but adds a **brief
intuition reveal** for each constitutive relation and **builds the loi des mailles term-by-term on
a labelled schematic** at R2.

### D1.1 — R2: the loi-des-mailles term-by-term build (the central derive-with-figure beat)

This is the headline of the design pass. At R2 the lesson currently writes `u_C+u_L=0`, substitutes,
and arrives at `L·q''+q/C=0` in flat prose. Replace the static `[[figure:rlc-schema]]` here with a
**labelled, progressively-built schematic on which the equation assembles term by term**, so the
student sees *what each symbol is on the circuit* as it enters the equation.

- **The figure (structural, exact — coded):** a single series LC loop in convention récepteur, the
  same topology as the existing `rlc-schema`, with **`u_C` across the condensateur, `u_L` across the
  bobine, the current `i` and its arrow** all marked **on the components themselves** (labels beside
  the marks, no split-attention — DESIGN-BIBLE §6).
- **The build, as a 4-step reveal synchronised figure↔equation** (this is the
  `loi-des-mailles-build` motion callout, D3.3 — coded, so the equation is exact):
  1. **Step 1 — the loop, highlight `u_C`.** Soft-highlight the condensateur; the equation line shows
     only `u_C`. Caption ties `u_C` to *the tension across the condensateur you see highlighted*.
  2. **Step 2 — add `u_L`.** Highlight the bobine; `u_C + u_L` appears. The series loop with no source
     ⇒ the two tensions sum to zero around the mesh: `u_C + u_L = 0`.
  3. **Step 3 — substitute the constitutive relations** (each with its origin chip — D1.2):
     `u_C → q/C`, `u_L → L·d²q/dt²` (via `i=dq/dt`). Equation becomes `q/C + L·d²q/dt² = 0`.
  4. **Step 4 — reorder + the R-is-absent beat.** `L·q'' + q/C = 0`, then signal **R is nowhere in
     this equation** (the M4 confrontation, lesson lines 118 / spec §1 M4). The figure shows no
     resistor in the ideal loop — *that absence is the point*, made visible.
- **Why on the picture:** the M7 confusion (which element stores/relates to which variable) and the
  M4 confusion (R in the period) are both *spatial* confusions. Seeing `u_C` sit on the condensateur
  and `R` be physically absent from the ideal loop is the cleanest confrontation.

### D1.2 — Origin of `u_C = q/C`, `i = dq/dt`, `u_L = L·di/dt` — intuition shown, not re-taught

The reviewer wants the *intuition* shown (Crash-Course/TED register), **briefly**, without
re-teaching the RC/RL chapters. These are **micro-reveals**, one or two sentences + one small visual
each, attached at first use (R1 for `i=dq/dt`; R2 for `u_C=q/C` and `u_L=L·di/dt`). They are
**not** new rungs and **not** worked derivations — they are "remember *why* this is true" chips.

| Relation | Where (first use) | The one-breath intuition (FR register, content-author writes) | Visual support |
|---|---|---|---|
| `u_C = q/C` | R2 | « Plus on entasse de charge `q` sur les armatures, plus la tension monte — proportionnellement. `C` (la capacité) est juste le facteur de proportionnalité : `q = C·u_C`, donc `u_C = q/C`. » | A tiny capacitor with charge accumulating on the plates, `u_C` rising in step. `type: structural-diagram` / `tool: svg+katex` — part of the D2.1 `rlc-schema` decomposition, NOT a separate figure. |
| `i = dq/dt` | R1 | « Le courant, c'est le débit de charge : combien de charge passe par seconde. Mathématiquement, c'est la vitesse de variation de `q` : `i = dq/dt`. » | Inline KaTeX + a soft arrow on the loop showing charge flowing off the plate; reuse the R1 schematic. No standalone figure. |
| `u_L = L·di/dt` | R2 | « La bobine s'oppose aux *variations* de courant : plus le courant change vite, plus elle réagit fort. La tension à ses bornes est proportionnelle à la vitesse de variation du courant : `u_L = L·di/dt`. » | Inline; optionally one frame of the loi-des-mailles build where the bobine is highlighted as "the one that reacts to *change*". No standalone figure. |

**Hard rule for content-author (D1.2):** these are **recall-with-intuition**, not derivations. Each
is ≤2 sentences. Do **not** expand into a mini-lesson on capacitors/inductors — that violates the
"do not re-teach RC/RL" rule in `spec.md §4`. If a chip starts to grow into a paragraph, cut it back.

### D1.3 — R5: the verification, shown on the same figure family

R5's "the ideal cosine does NOT solve the damped ODE" (lesson lines 300–318) is already a
derive-out-loud beat. The design pass adds: **reuse the R2 loi-des-mailles figure with the resistor
now present** so the student sees the `u_R = R·i` term *appear physically* (the resistor is now in
the loop) and then watches the `R·q'` term be the one residue that won't cancel. This is the
`loi-des-mailles-build` figure's *damped variant* (one extra reveal step: add the resistor, add the
`u_R` term). It makes M6 (the boundary-tripwire misconception) a *visible* consequence: the term
that breaks the closed form is the term that corresponds to the component you just added.

---

## D2. Progressive (less-charged) figures — one idea per step

The brief (#3) flags the current figures as correct but "charged" — too much to decipher at once.
The three existing callouts map to the lesson's `[[figure:...]]` names. Decompose each into a
**progressive reveal** (one idea per step). Each stays `type: structural-diagram` / `tool: svg+katex`
(exact structure + math labels — **never gemini**, ADR 0017). Progressive = the same figure with
staged reveals (step buttons / scroll-tied), **not** a shallower figure. Depth is preserved; only the
*per-moment density* drops.

### D2.1 — `rlc-schema` (the circuit) — currently too charged at first sight

**Problem:** the wave-1 spec C1 asks one schematic to show C, L, r, R, K, convention récepteur, and
all of `u_C / u_R / u_L / i` arrowed at once (spec §3 C1) — a lot to read on first contact at R0.

**Decompose into a 3-step progressive reveal** (used at R0/R1; the *full* labelled version is the
R2 build figure D1.1):
1. **Step 1 — the bare loop.** Just the condensateur and the bobine in a closed loop, plus the
   switch K. No tensions, no current arrow yet. Idea: *"a charged condensateur, connected to a coil,
   nothing else."* This is the R0 hook's whole content — keep it that bare.
2. **Step 2 — add the current.** The current `i` and its arrow appear; one line: *"on ferme K, le
   courant circule."* Idea: *something flows.*
3. **Step 3 — add the tensions.** `u_C` and `u_L` labelled on their components, convention récepteur
   marked. Idea: *the two tensions we will write the loop law with.*

The **resistor R / internal resistance r** is **withheld until R3** (where R is the subject) — at R0/R1
the ideal loop has no visible resistor, which is *correct* and reduces clutter. When R3 introduces R,
a 4th reveal adds the resistor + `u_R` to the loop. (This also tightens the M1 confrontation: R is
literally a *later addition* to the picture, not the thing that was making it oscillate.)

### D2.2 — `regimes-uc` (the three traces) — currently three panels at once

**Problem:** the three `u_C(t)` regime traces (périodique / pseudo-périodique / apériodique) are shown
together; at R0 only the périodique panel is referenced (lesson line 21), yet a three-panel figure
invites the student to decode all three before the concept of "regime" exists.

**Decompose into a reveal that matches the lesson's own pacing:**
1. **At R0 — périodique ALONE.** Only the undamped sinusoid, against the student's "it just decays"
   prediction. One idea: *it doesn't stop — it swings.* (The hook's payoff; the other two panels do
   not exist yet for the student.)
2. **At R3/R4 — the three reveal IN SEQUENCE, tied to R rising.** périodique (R≈0) → pseudo-périodique
   (R modérée) → apériodique (R grande), each appearing as R is described as increasing. One panel per
   step; the **pseudo-période `T` marker** appears only on the pseudo-périodique panel, only when R4
   introduces the pseudo-période. Idea per step: *more R changes the shape, in this order.*
3. **At R6 — the pseudo-périodique panel ALONE, annotated for measurement** (two consecutive maxima,
   the `T = t_{n+1} − t_n` read-off). Idea: *how you measure `T` off a trace.* The other two panels are
   not needed for the measurement beat — show only the one being measured.

**Net effect:** the same three traces, but the student never decodes more than one regime at the moment
it is being taught. The "synthèse" table (lesson lines 258–262) remains as the *consolidation* after
all three are seen — that table is the right place for all-three-at-once, because by then the student
has met each.

### D2.3 — `energy-exchange` (the `E_C`↔`E_L` antiphase diagram) — currently the densest figure

**Problem:** this figure carries the most simultaneous information (two antiphase curves, their sum as
flat-line-ideal *and* decreasing-envelope-damped, the `u_C` max/`i=0` and `u_C=0`/`i` max instants
marked — spec §3 C3). Shown whole, it is the figure most likely to overwhelm.

**Decompose into a 4-step progressive reveal:**
1. **Step 1 — `E_C` alone.** The condensateur's energy `E_C = ½q²/C`, maximal when `u_C` is max,
   zero when `u_C=0`. One curve. Idea: *the condensateur's energy rises and falls.*
2. **Step 2 — add `E_L` in antiphase.** The bobine's `E_L = ½Li²`, drawn so its maxima fall exactly
   where `E_C` is zero. Idea (the M2/M7 core): *when one is full, the other is empty — they trade.*
   Mark the two key instants (`u_C` max / `i=0`; `u_C=0` / `i` max) here, not before.
3. **Step 3 — the sum, ideal.** `E_C + E_L` drawn as the **flat line**. Idea: *the total is conserved —
   the energy is not consumed, it moves* (M2 confrontation).
4. **Step 4 — the sum, damped.** The total becomes a **decreasing envelope**; caption names the
   destination: *not gone — turned to heat in R by effet Joule* (M2 in the amorti case, spec §1 M2).
   The antiphase exchange continues *inside* the shrinking envelope.

Steps 1–3 sit at R1 (the ideal mechanism); step 4 is recalled at R4 (the damped regime). This staging
exactly matches the lesson's own order (R1 ideal → R4 damped), so the figure reveals in lockstep with
the prose — no figure showing more than the prose has reached.

---

## D3. Motion callouts — typed (coded = manim/css for exact; veo for intuition only)

Per ADR 0021: **coded motion** (Manim or SVG/CSS) carries *exact* content; **Veo** carries
*atmospheric/felt intuition only* and is **never load-bearing** (no derivation, no exact structure, no
fake interactive — the hard line). Each callout below gives `type` + `tool` + a one-line behaviour
spec + the misconception/idea it serves. All coded motion is **`prefers-reduced-motion`-safe**: it
must degrade to the corresponding static progressive figure (D2) with a step control — the static
figure is the floor, the motion is the enhancement.

> **Note on the wave-1 "NO Manim" decision (spec §3).** `spec.md §3` declined a Manim energy clip
> because the *manipulable* (C2) delivers the C↔L exchange interactively and better. The design pass
> **revisits this narrowly**, per the brief (#2: "figures should move; static figures stall"). The
> resolution: motion is added **to the figures that the student READS (not manipulates)** — the
> energy *diagram* and the loi-des-mailles *build* — where there is no manipulation to begin with, so
> motion is not redundant with C2. The manipulable still owns the *parameter-driven* exploration
> (R3). This keeps the bias-toward-not honest: motion appears only where reading-a-static-figure
> genuinely stalls, never as decoration over what the interactive already does.

### M-1 — `energy-pendulum` — the C↔L exchange in antiphase (coded)
- **Type:** `motion`  **Tool:** `manim` (or SVG/CSS if the antiphase + envelope can be done cleanly in
  CSS; manim preferred for the synchronised dual-curve + circuit-state pairing).
- **Behaviour (one line):** over one period, the energy bar/curve fills the condensateur as `E_C`
  rises and empties it into the bobine as `E_L` rises, in strict antiphase, with the running total
  shown — flat (ideal) then, in a second pass with R on, a slowly shrinking envelope.
- **Serves:** **M2** (energy exchanged, not consumed) and **M7** (which element stores what, when) —
  the antiphase is the exact thing `spec.md §3` flagged as the *one future candidate* the human might
  ask for. The design pass commissions it, scoped to the energy *diagram* (read, not manipulated).
- **Placement:** R1 (ideal antiphase, total flat) and recalled at R4 (R on, envelope shrinks → "heat
  in R"). It is the animated form of the D2.3 progressive figure — same content, reveal becomes motion.
- **Boundary guard:** the shrinking envelope is shown **qualitatively** (it gets smaller); **no**
  `e^{−αt}` formula, **no** damping coefficient on screen (§0.4 / D0).
- **Reduced-motion fallback:** the D2.3 static 4-step progressive figure.

### M-2 — `regime-traces-forming` — the three traces drawing themselves (coded)
- **Type:** `motion`  **Tool:** `manim` (deterministic trace draw) or `css` (stroke-dash reveal of a
  precomputed path).
- **Behaviour (one line):** each `u_C(t)` trace *draws left-to-right in real time* as the circuit
  evolves — the périodique sinusoid drawing forever, the pseudo-périodique drawing with visibly
  shrinking peaks, the apériodique drawing as a single monotonic return.
- **Serves:** **M3** (oscillations *decay* faster vs *oscillate* faster — seeing the peaks shrink
  while their *spacing stays equal* as the trace draws is the cleanest separation of decay from rate)
  and regime recognition (Utilisation). It animates D2.2.
- **Placement:** R3/R4, tied to R rising (the trace redraws as R increases). Optional at R6 as the
  trace being measured.
- **Boundary guard:** peak *spacing* is shown constant **by eye**; the pseudo-période is **measured**,
  never computed (§0.4). No résonance/forced sweep.
- **Reduced-motion fallback:** the D2.2 static staged panels.

### M-3 — `loi-des-mailles-build` — the equation assembling on the schematic (coded)
- **Type:** `motion`  **Tool:** `manim` (exact KaTeX-quality glyphs + circuit must be coded — ADR
  0017: generation cannot render exact equations/structure).
- **Behaviour (one line):** the 4-step (R2 ideal) / 5-step (R5 damped) build from D1.1/D1.3 plays as a
  reveal — each component highlights on the schematic as its term slides into the equation line.
- **Serves:** **M4** (R-absent-from-the-ideal-equation, made visible — the resistor isn't in the loop,
  so it can't be in `T₀`) and **M7** (each `u` sits on its component); at R5, **M6** (the `R·q'` term
  appears with the physically-added resistor and is the one residue that won't cancel).
- **Placement:** R2 (ideal build) and R5 (damped build + the failed-verification residue).
- **Boundary guard:** R5 shows the residue **does not cancel** and **stops** — it does **not** proceed
  to solve the damped equation (§0.4 LIMITE 1 / D0). The build never introduces a damping coefficient.
- **Reduced-motion fallback:** the D1.1 static labelled schematic with the equation shown fully built,
  plus a step control to walk the terms manually.

### V-1 — `balancement` — the felt intuition before the math (GENERATED, intuition only)
- **Type:** `atmospheric-illustration` (motion form)  **Tool:** `veo` (Gemini media lane).
- **Behaviour (one line):** a short, calm, gallery-quiet clip evoking *back-and-forth exchange* — a
  single pendulum swinging, or an abstract "energy passing between two vessels" motif — mood and
  metaphor **only**.
- **Serves:** the **R0 hook's felt intuition** — the "balancement" *before* any circuit, trace, or
  equation. It primes the energy-pendulum analogy (M2's mechanical anchor) at the level of *feeling*,
  not information.
- **Placement:** R0 hook only — the animated form of the wave-1 C4 optional hook image. If V-1 ships,
  it **replaces** C4 (do not run both; one mood asset per hook).
- **HARD LINE (ADR 0021 / D0), non-negotiable:** **ZERO circuit structure, zero numbers, zero labels,
  no oscilloscope, no equations, no trace.** The instant anything exact is needed, that is M-1/M-3/the
  coded figures' job. V-1 is **never load-bearing** — the hook works fully on prose + M-1 + the
  interactive without it; V-1 is a mood, removable with no loss of correctness. **At most this one Veo
  clip** in the notion (the brief allows 1–2; one suffices here, V-2 below is held, not built).
- **Aesthetic gate:** must pass the DESIGN-BIBLE §6 "gallery-calm, not attention-grabbing" test; the
  DESIGN-BIBLE style preamble is appended to the Veo prompt verbatim.

### V-2 — HELD, NOT BUILT — a second intuition clip
- The brief permits 1–2 Veo clips. A *second* candidate (e.g. an atmospheric "leaking bucket refilled
  at exactly the leak rate" for the R7 entretien intuition) is **flagged for the editorial gate, not
  built now.** One Veo clip (V-1) is the design-pass budget; the entretien "seau percé" intuition is
  already carried well in prose (lesson line 438). Build V-2 only if the human's review finds the
  entretien intuition does not land in prose + the coded build (M-3).

### Motion summary (count discipline)
- **Coded (exact, load-bearing-OK):** M-1 `energy-pendulum`, M-2 `regime-traces-forming`,
  M-3 `loi-des-mailles-build`. Each has a static progressive-figure fallback (D2/D1). Three coded
  clips, each tied to a specific misconception, none decorative.
- **Generated (intuition-only, never load-bearing):** V-1 `balancement` (R0). One clip. V-2 held.
- **Anti-decoration check (DESIGN-BIBLE §5 / VISION "no stimulation for its own sake"):** every coded
  clip *is* a figure the student would otherwise read statically and which the brief judged "stalls";
  motion here is the reveal mechanism, not added movement. No ambient/looping motion in the core.

---

## D4. In-lesson checkpoint questions — practice as you go (distinct from the 28-item end bank)

The brief (#7): interleave a few checkpoints *inside* the lesson so the student practices as he
climbs, rather than meeting all items at the end. These are **formative** — one focused probe right
after the beat that earns it, with immediate per-action feedback (DESIGN-BIBLE §7). They are **NOT**
the end bank: the ≥3-per-misconception coverage floor (spec §5, ≥24 items) is unchanged and still
lives at the end. Checkpoints are a **subset/preview**, placed for *timing*, not coverage.

**Design rules for the checkpoints (carry to item-author):**
- **2–4 checkpoints total** — enough to break the read with active recall, few enough to keep calm
  (anti-microlearning, §D5). **Specified here: 4**, one after each of the highest-leverage beats.
- Each is a **single MCQ**, ≤30s, with immediate feedback that *names the wrong model* on a wrong pick
  (the diagnostic-not-just-wrong rule, VISION).
- **Reuse an existing end-bank item where one fits** (reference its eventual id by misconception +
  framing); the checkpoint and the end-bank item may be the *same* item surfaced once inline and again
  in the bank — item-author decides whether to clone or share. Where no existing framing fits the
  *inline* moment, specify a **new lightweight checkpoint** (still tagged to its misconception).
- Checkpoints are **calm-core**: no score, no streak, no "X/4 correct" tally, no celebratory animation
  — just "right / here's the model you ran" (DESIGN-BIBLE §0, §7).

| # | Sits AFTER | Probes (misconception) | Why HERE | Item source |
|---|---|---|---|---|
| **CP-1** | **R3** (R is the brake, not the motor) — the single most important beat (spec §2) | **M1** (R drives) — primary; brushes **M3** (R→rate) | R3 is *the* confrontation; a checkpoint immediately after locks the rupture ("R→0 ⇒ oscillations *persist*, not stop") before the energy picture buries it. Catching M1 here, while the predict-then-reveal is fresh, is worth more than catching it at the end. | **Reuse M1's `distinguishing_mcq_stem`** (spec §1 M1: "on diminue R jusqu'à négligeable… que deviennent les oscillations?", correct A). It is the exact R3 rupture in MCQ form. |
| **CP-2** | **R2** (establish ideal ODE + `T₀`) | **M4** (`T₀` depends on R) — primary | R2 ends on "R n'apparaît pas — donc `T₀` n'en dépend pas." A checkpoint here, picking the correct `T₀=2π√(LC)` against the `2π√(RC)` leak, converts the asserted point into a *retrieved* one at the moment it is made. Also a gentle Utilisation rep (apply the formula). | **Reuse M4's `distinguishing_mcq_stem`** (spec §1 M4: which expression is `T₀`?, correct A `2π√(LC)`, trigger B `2π√(RC)`). |
| **CP-3** | **R4** (the three regimes + pseudo-période introduced) | **M5** (pseudo-période vs `T₀`; "no period at all") — primary | R4 is where the pseudo-période first appears and where M5 (either "no period" or "exactly equals `T₀`") is most likely to form. A checkpoint here tests "the spacing is regular even though amplitude decays, and `T ≈ T₀` only for weak damping" right as the idea lands. | **New lightweight checkpoint** (or reuse M5's stem trimmed): a single MCQ on a pseudo-périodique panel — "the time between two successive maxima: A) exists and ≈ `T₀` for faible amortissement [correct]; B) doesn't exist because amplitude decays [M5 trigger]". Tag `document_experimental`. |
| **CP-4** | **R7** (entretien) | **M8** (entretien = forced regime) — primary | R7 is the last beat and the boundary's most seductive crossing (entretien read as "imposing a frequency"). A checkpoint here — "the generator compensates Joule loss; the period is still `T₀=2π√(LC)`, set by L and C, not by k" — seals the boundary and closes the R0→R7 arc on an *active* note rather than a passive read. | **Reuse M8's `distinguishing_mcq_stem`** (spec §1 M8: role of `u_G=k·i` + period of entretenu oscillations; correct A, trigger B "régime forcé"). Tag `entretien`. |

**Placement rationale (one line):** checkpoints sit after **R2, R3, R4, R7** — the four beats where a
misconception *forms or is confronted* and where catching it in-flow beats catching it at the end.
**No checkpoint after R5** (establish-and-stop): R5's M6 is a *boundary-judgment* beat best assessed in
the end bank where its correct answer ("we establish and do not solve") can be stated at length; an
inline checkpoint risks compressing the boundary into a card (§D5). **No checkpoint after R0/R1**: the
hook and the mechanism need to *land uninterrupted* before the first probe — the first active beat is
R2/R3, by design.

**Coverage note (carry to item-author):** CP-1…CP-4 are surfaced inline AND counted toward the end
bank only if shared (item-author's call). The ≥3-per-misconception floor is computed over the **end
bank**, not the checkpoints; checkpoints do not reduce the bank. If a checkpoint is a clone, label it
so the coverage tally is not double-counted.

---

## D5. The anti-microlearning guardrail — for the producers and the calm-load critic

**State, explicitly and for the record:** this design pass adds **craft, motion, and in-flow
practice**. It does **not** shorten depth, and it does **not** turn the décortiquer's beats into
shallow swipe-cards. **The Imprint reference is for figure-craft and one-idea-per-moment, NOT for
chunk-size.** Our depth — the full mechanism (R1), the full ideal derivation with the guess-then-verify
(R2), the full predict-then-reveal on R (R3), the establish-and-STOP boundary lesson (R5), the
trace-reading procedure (R6), the entretien derivation and arc-closure (R7) — **stays at length.**

The line, concretely:

- **WHAT WE ADD:** progressive *reveal* of existing figures (same content, staged), coded *motion* on
  figures the student reads, *origin chips* for the constitutive relations, and 4 *checkpoints*. Each
  is a craft/timing improvement over the *same* depth.
- **WHAT WE DO NOT DO — flag any of these as a defect to the calm-load critic:**
  1. **No splitting a beat into multiple shallow cards to manufacture "progress."** R2 stays one
     sustained derivation; the progressive build (D1.1) is a *reveal within one beat*, not three
     beats. One-idea-per-*moment* is a reveal technique; one-idea-per-*card* (severing the
     reasoning chain) is the microlearning failure we reject.
  2. **No trimming the mechanism or the reasoning-out-loud to "fit a card."** If a progressive reveal
     would require cutting an explanatory sentence, the reveal yields — depth wins.
  3. **No motion that does not replace a stalling static figure.** Motion that is "movement to hold
     attention" with no comprehension job is decoration (DESIGN-BIBLE §5) — cut it. (This is why V-1
     is capped at one mood clip and the coded clips are each tied to a named misconception.)
  4. **No engagement theater on the checkpoints.** No score, no tally, no streak, no confetti, no "X
     in a row." A checkpoint is a calm formative probe, not a game beat (DESIGN-BIBLE §0/§7).
  5. **No gamified progress bar / XP / "lesson 3 of 12" framing inside the core.** Progress lives in
     the *periphery* (DESIGN-BIBLE §8), never injected into the lesson to drive engagement.
- **The test (for the calm-load critic, applied to every design-pass addition):** *does this addition
  make the existing idea land more clearly and calmly — or is it there to hold attention / signal
  progress / add stimulation?* If the latter, cut it, regardless of how engaging it is. The reward is
  still the click of understanding; the design pass makes that click *arrive more clearly*, not more
  often-and-shallower.

**Felt-coherence preserved:** the R0→R7 arc ("perpetual swing → where does the energy go → R dissipates
it → entretien refills exactly that leak") is *strengthened* by the design pass, not fragmented — V-1
plants the balancement feeling at R0, M-1 carries the energy-exchange through R1/R4, CP-4 closes it
actively at R7. The journey stays one journey.

---

## D6. Design-pass review checklist (pedagogy-architect, against THIS addendum + spec.md §8)

Bounce the Phase-C output back if any of these drift (this is **in addition to** `spec.md §8`, which
still applies in full):

- **Boundary held (§0.4 / D0) in the NEW layer too:** no figure, motion clip, Veo clip, interactive
  mode, or checkpoint introduces a closed-form damped solution, a damping coefficient/decrement,
  pseudo-période as `f(R,L,C)`, résonance, impédance, phaseurs, complex notation, or AC power. The R5
  damped build (M-3) **stops at the non-cancelling residue**; the energy envelope (M-1) shrinks
  **qualitatively** only.
- **Coded vs generated split honoured (ADR 0021 hard line):** every exact thing (equations,
  schematics, traces, energy curves, labels) is **coded** (manim/css/svg+katex), **never Veo/Gemini**.
  V-1 carries **zero** structure/number/label/equation. No generated asset is load-bearing.
- **Progressive figures are reveals of the SAME content (D2), not shallower figures:** depth and all
  labels survive; only per-moment density drops. The consolidation table (R4) and full labelled R2
  build still show everything, once the student has met each piece.
- **Origin chips (D1.2) are ≤2 sentences each** and do **not** re-teach RC/RL (spec §4 rule held).
- **Checkpoints (D4) are calm-core formative probes:** 2–4 total, immediate model-naming feedback, **no
  score/streak/tally/animation**; the end-bank ≥3-per-misconception floor is **unchanged** and not
  reduced by checkpoints; clones are labelled so coverage isn't double-counted.
- **Anti-microlearning (D5):** no beat severed into shallow cards; no mechanism/reasoning trimmed to
  fit a reveal; no motion without a comprehension job; no engagement theater or progress-gamification
  in the core. The depth is intact.
- **Reduced-motion safety:** every coded clip (M-1/M-2/M-3) degrades to its static progressive figure
  with a step control (DESIGN-BIBLE §5, accessibility floor).
- **Interactive boundary guard still on (spec §7):** the PhET POC (ADR 0021) — replacing Falstad as the
  C2 manipulable — exposes **no** driven-AC / résonance-sweep / impédance mode in the lesson config;
  CC-BY attribution + PhET logo preserved (ADR 0021 §4). *(Interactive swap is the interactive-author's
  task per the brief #6; this addendum only restates the boundary guard for it.)*
- **Arc preserved:** R0 (V-1 balancement) → R1/R4 (M-1 energy exchange) → R7 (CP-4 closes) reads as one
  journey; the design pass strengthens the arc, does not fragment it.

---

## D7. Open items for the human (design-pass editorial gate)

1. ⚠ **Manim revisit (M-1).** `spec.md §3` declined a Manim energy clip; this addendum commissions it,
   scoped to the *read* energy diagram (not the manipulated C2). Confirm this narrow revisit is right,
   or hold M-1 and rely on the PhET interactive + static D2.3 reveal.
2. ⚠ **Checkpoint count/placement (D4).** 4 checkpoints after R2/R3/R4/R7 proposed. Confirm the count
   (2–4) and that R5 is rightly checkpoint-free (boundary beat → end bank), and R0/R1 rightly
   uninterrupted.
3. ⚠ **Veo budget (V-1 / V-2).** One mood clip (V-1, R0 balancement) proposed; V-2 (entretien "seau
   percé") held. Confirm one is enough, or release V-2.
4. ⚠ **`u_C=q/C` chip depth (D1.2).** Confirm the ≤2-sentence intuition register is right and does not
   need a fuller derivation (the human knows where PC students actually need more on the constitutive
   relations).
5. **PhET fit (cross-ref ADR 0021 / brief #6).** The interactive swap (Falstad → PhET POC) is the
   interactive-author's task; flagged here only because the C2 references in `spec.md §3/§7` predate
   ADR 0021. supabase/frontend boundary-guard config for the PhET embed is confirmed at render (Phase D).

---

### Sources consulted (design pass)
- **Intent:** `docs/design/01-rlc-design-pass-brief.md` (the reviewer's remarks as design targets).
- **Tooling authority:** `docs/decisions/0021-motion-generated-video-interactive-poc.md` (coded =
  exact; Veo = intuition; the hard line; PhET POC), extending ADR 0017 (visual-sourcing taxonomy).
- **Unchanged foundation:** `content/pc/rlc-serie/spec.md` (§0.4 boundary, M1–M8, R0→R9 ramp, coverage
  floor, habileté mix) and `content/pc/rlc-serie/lesson.md` (the converged R0→R9 prose this layer
  dresses).
- **Standard:** `docs/Product/VISION.md` (notion anatomy; PC confront-the-model profile),
  `docs/Product/DESIGN-BIBLE.md` (§0 calm-core/no-engagement-theater, §5 motion, §6 visual language,
  §7 the sacred learning core, §8 periphery).
