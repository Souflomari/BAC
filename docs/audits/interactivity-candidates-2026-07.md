# Interactivity candidates — scan of the 65 newly-staged figures (2026-07)

**Status:** SCAN-AND-RECOMMEND ONLY. Nothing is built here. Per the product
owner's own choice ("staging now, flag candidates for later"), the drag/slider
layer is explicitly deferred to a future session. This document ranks where
adding the *existing* interactive-figure mechanism
(`docs/design/INTERACTIVE-FIGURE-SPEC.md`) would genuinely deepen understanding,
so the next session does not have to re-triage all 65 from scratch.

---

## Method and the bar a candidate has to clear

I read the two contracts (`LESSON-EXPERIENCE-SPEC.md` §2.5/§2.8,
`INTERACTIVE-FIGURE-SPEC.md`) and all five shipped pilots — their
`.interactive.json` sidecars and their `web/src/lib/interactive-figures/*.ts`
modules — then triaged all 65 staged figures at the `.stages.json` +
lesson-context level, deep-reading the SVG geometry of every figure that
survived the first cut.

The five pilots share one spine, and it is the bar:

- **They re-prove a number (or an invariant) the student already computed by
  hand.** `tangente-derivee` re-proves the slope; `aire-sous-courbe` re-proves
  the integral; `racines-unite` re-proves the n-gon; `suite-escalier` re-proves
  that the limit is independent of u₀; `asymptotes` is a *live* version of the
  converging-values table the R0 hook already hands over.
- **One continuous control** (drag a point on a curve, or a slider) that
  **recomputes a portion of the SVG already drawn** — a path, a point, a text
  label. Never a second figure, never a new mechanism.
- **The manipulation stays strictly inside what the lesson currently teaches.**
  The `asymptotes` module carries the load-bearing example of this discipline:
  the drag is allowed in the direction "x → gap" (drag x, *observe* the gap
  shrink) and is forbidden in the direction "gap → x" (pick a tolerance, hunt
  for x), because the second is ε/δ and out of scope for a lesson that teaches
  limits only intuitively.

So a good candidate is a **graph or a parametric construction** where a single
control re-proves a hand-computed result or an invariant, without stepping past
the lesson's boundary. "Would be neat" (rotating a 3-D figure, animating a
schematic) does not clear the bar; those are rejected below with reasons.

A note on complexity, since leverage = value ÷ complexity: the lowest-cost
builds are the ones whose math is a **single closed-form curve** the pilot
modules already demonstrate (`tangente-derivee`, `aire-sous-courbe` are
near-templates). Rebuilding a whole rotating diagram (an inclined plane, a
force fan) is real work — still worth it when the misconception payoff is high,
but it is not a copy-paste of an existing module.

---

## Ranked top 10 candidates (by leverage)

### 1. `avancement-tangente` — PC / suivi-temporel-vitesse

- **(a) Figure + lesson.** `content/pc/suivi-temporel-vitesse/media/avancement-tangente` — the advancement curve x(t), tangent at t₁ giving the volumetric rate.
- **(b) What is manipulated.** Drag the point along the x(t) curve over the time domain of the plotted curve (t from ~0 to the plateau). Identical control to the `tangente-derivee` pilot — a point on a curve.
- **(c) What recomputes and why.** The tangent line at the dragged instant and the readout "pente = dx/dt → v(t₁) = (1/V)·(dx/dt)". As the point moves toward the plateau, the tangent visibly flattens and the rate readout falls toward zero. This directly confronts the single most common kinetics error — reading the rate as the *secant* x/t (average) instead of the *tangent* dx/dt (instantaneous), and believing the rate is constant. The student watches the instantaneous rate decrease along the very curve they read in the exam.
- **(d) Curriculum caution.** None. Volumetric rate as the tangent slope divided by volume is exactly what this lesson teaches; this is `tangente-derivee` transposed to chemistry. Highest leverage of the whole set: proven module pattern, near-zero conceptual risk, and one of the most exam-central reads in PC.

### 2. `aire-entre-courbes` — Maths / calcul-integral

- **(a) Figure + lesson.** `content/maths/calcul-integral/media/aire-entre-courbes` — f(x)=x and g(x)=x², shaded region between them on [0,1], area = 1/6.
- **(b) What is manipulated.** Drag the upper bound b along the x-axis. Domain **[0, 1]** in data space (keep it there — see caution). Direct sibling of the `aire-sous-courbe` pilot (which drags the bound over [0.3, 2.0]).
- **(c) What recomputes and why.** The shaded region between the two curves grows/shrinks with b, and the formula box updates ∫₀ᵇ(f−g) to the running value, reaching 1/6 at b=1. It re-proves the exact number the lesson computes by hand and makes "area between curves = integral of the *difference*" tactile: the shaded strip is always bounded above by f and below by g.
- **(d) Curriculum caution.** Keep the domain at **b ≤ 1**. Past x=1 the curves cross and g overtakes f, so (f−g) goes negative and the "area between" needs |f−g| / a swap of the upper function — a genuinely harder idea the figure's own comment flags. Staying on [0,1] keeps it to the single worked example. Very low complexity (the `aire-sous-courbe` module is a near-template).

### 3. `plan-complexe` — Maths / nombres-complexes-1

- **(a) Figure + lesson.** `content/maths/nombres-complexes-1/media/plan-complexe` — point M of affix z=3+4i, projections a=3, b=4, vector OM, module |z|=5.
- **(b) What is manipulated.** Drag M in the first quadrant (a drag-point, free in x and y, or two coupled reads). Domain bounded to the panel's first quadrant (a∈[0, ~6], b∈[0, ~4] in data units at 70 px/unit).
- **(c) What recomputes and why.** The projections a and b, the vector OM, and the module |z|=√(a²+b²) update live. It re-proves the module computation the R4/R5 do by hand (the 3-4-5 triple) and makes |z| viscerally "the length of OM." Strong because the module is the load-bearing quantity of the lesson and students routinely conflate |z| with a or with a+b.
- **(d) Curriculum caution — already baked into the SVG.** This lesson covers module but **NOT argument** (the SVG comment says so explicitly, citing the lesson's own validation note). The interactive must therefore recompute **only a, b, |z|** — it must **never** draw the angle, an arc, or an arg(z) label. That would introduce notation the text never defines. This is a clean, in-scope drag *as long as* the "no angle" line holds; treat it exactly like the `asymptotes` sign-off. Two-axis drag is slightly more than the pilots' single-axis drag but well within the primitive.

### 4. `uc-charge` — PC / rc-charge (representative of a family)

- **(a) Figure + lesson.** `content/pc/rc-charge/media/uc-charge` — capacitor charging curve u_C(t), asymptote E, tangent at origin, τ marker (read by the tangent or by the 63 % point).
- **(b) What is manipulated.** A **slider on τ** (equivalently on R or C — τ=RC is in scope). Domain a curriculum-safe band of τ around the lesson's value.
- **(c) What recomputes and why.** The exponential reshapes (steeper/flatter) and — the payoff — the tangent-at-origin always meets the asymptote E at exactly t=τ, and the 63 % mark tracks with it. Re-proves the τ construction and that τ is a *time* read off the horizontal axis, not a voltage. RC is one of the highest-frequency exam topics, so retention value is large.
- **(d) Curriculum caution.** None for the charge case (τ=RC, tangent construction, 63 % are all core). **Build this one first as the representative**, then the near-identical siblings become cheap follow-ons that reuse the module shape: `uc-decharge` (37 %), `i-etablissement` (dipole-rl, τ=L/R), and `tangente-tau` (radioactive decay, below). Do **not** fan all four out at once — pick RC as the pilot.

### 5. `plan-incline-forces` — PC / lois-de-newton

- **(a) Figure + lesson.** `content/pc/lois-de-newton/media/plan-incline-forces` — solid on a 30° incline, force balance, weight decomposed into mg·sin α (along) and mg·cos α (perpendicular).
- **(b) What is manipulated.** A **slider on the incline angle α**, domain roughly [10°, 60°] (stay off the degenerate 0°/90° ends).
- **(c) What recomputes and why.** The plane's slope, the solid, the normal/friction directions, and the two weight components all redraw; the mg·sin α arrow grows and the mg·cos α arrow shrinks as α increases (and the labels/values track). This confronts *the* inclined-plane misconception head-on: which component gets sin and which gets cos. Watching sin α → 0 as the plane flattens and → mg as it steepens settles it far better than the static 30° snapshot.
- **(d) Curriculum caution.** Force projection on an incline is core lois-de-newton content, so it is in scope. The honest cost note: this is **higher complexity than the point-drag pilots** — α re-draws the hypotenuse, the block, three force vectors, the axes and the parallelogram guides, so it is a parametric redraw of most of the figure, not a one-point move. High misconception payoff justifies the cost, but rank it a build-effort tier below #1–3.

### 6. `moment-force` — PC / rotation-axe-fixe

- **(a) Figure + lesson.** `content/pc/rotation-axe-fixe/media/moment-force` — solid on axis Δ, force F, its extended line of action, lever arm d (distance from Δ to the *line of action*), moment M_Δ = ±d·F.
- **(b) What is manipulated.** A **slider on the orientation of F** at its (fixed) application point — swinging the force direction. (Alternatively a drag on the application point along the solid.)
- **(c) What recomputes and why.** The extended line of action rotates, the perpendicular lever arm d re-drops from Δ, and M=d·F updates — going to **zero** when the line of action passes through Δ. This confronts the classic moment error precisely: students take the lever arm as the distance from the axis to the *point of application* (which the figure's stage 3 explicitly warns against) instead of to the *line of action*. Watching d collapse to zero while the application point stays far from the axis is the whole lesson in one gesture.
- **(d) Curriculum caution.** None — M_Δ(F)=±d·F is core. Moderate complexity (recompute the extended line, the perpendicular foot, the arc, the value). Strong misconception-confronting pick.

### 7. `famille-solutions` — Maths / equations-differentielles

- **(a) Figure + lesson.** `content/maths/equations-differentielles/media/famille-solutions` — a family of solutions T(t)=(T₀−20)e^(−0,1t)+20 of y'=ay+b, all converging to the palier −b/a=20; the initial condition T(0)=90 isolates one.
- **(b) What is manipulated.** A **slider on the initial condition T₀**, domain ~[0, 100].
- **(c) What recomputes and why.** The accent solution curve reshapes as T₀ moves up/down the T-axis, but every member of the family flattens to the *same* palier 20. This re-proves the R3 idea — "the ODE fixes a *family*; the initial condition picks *one* member" — and that the asymptote −b/a is independent of T₀. It is the exact conceptual sibling of the `suite-escalier` pilot (drag u₀, always converges to the same ℓ), which is the strongest evidence it belongs here.
- **(d) Curriculum caution.** The general solution y=Ce^(ax)−b/a and the family/initial-condition split are both taught (R2/R3), so it is in scope. Moderate complexity (single exponential recompute plus its start point/label).

### 8. `energie-oscillateur` — PC / systemes-oscillants

- **(a) Figure + lesson.** `content/pc/systemes-oscillants/media/energie-oscillateur` — E_c(t) and E_pe(t) oscillating in opposition (cos²/sin² domes), sum E_m constant at E_max.
- **(b) What is manipulated.** Drag a point along the **time axis** (a vertical read-line), over one or two periods of the plotted curves.
- **(c) What recomputes and why.** At the dragged instant, markers on the two curves plus a stacked read (two segments, or E_c and E_pe values) that always sum to E_max — the "sloshing" made live: energy pours from kinetic to elastic and back while the total never moves. Re-proves E_m = E_c + E_pe = constant at any instant, the central result of the chapter, and the sub-point that E_c/E_pe have their own period T₀/2.
- **(d) Curriculum caution.** In scope **because this is the undamped free oscillator** (the sum is constant — no damping). Do not extend the manipulation toward a damped/forced regime: the damped closed form is a curriculum *limite* and forced resonance is an *exclusion* for the oscillator family. Staying on the undamped energy-exchange picture keeps it clean. Moderate complexity.

### 9. `bonne-surmodulation` — PC / ondes-em-modulation

- **(a) Figure + lesson.** `content/pc/ondes-em-modulation/media/bonne-surmodulation` — good modulation (m=0,5) vs over-modulation (m≈1,33); the rate m=Sm/U0 separates the two at m=1.
- **(b) What is manipulated.** A **slider on the modulation index m** (=Sm/U0), domain ~[0,2, 1,5].
- **(c) What recomputes and why.** The modulated waveform s(t)=(U0+Sm·cos ω_m t)·cos ω_p t redraws as m changes; the envelope touches zero exactly at m=1 and inverts (the "pinch"/phase-flip) beyond it. This re-proves the m<1 vs m>1 fidelity criterion — the single most examinable idea in AM — and shows *why* over-modulation destroys the signal, rather than asserting it.
- **(d) Curriculum caution.** m=Sm/U0 and the m<1 condition for faithful modulation are core; in scope. Moderate-to-higher complexity: the bound path is a dense carrier×envelope product (many points), but it is still one path recompute, not a new mechanism. `modulation-amplitude` is the gentler intro figure and a weaker interactive target — prefer `bonne-surmodulation` because the m threshold *is* the whole point.

### 10. `diffraction-fente` — PC / propagation-onde-lumineuse

- **(a) Figure + lesson.** `content/pc/propagation-onde-lumineuse/media/diffraction-fente` — plane wave on a slit of width a, geometric-optics prediction vs the real angular spread θ=λ/a, central spot L with L/2=D·θ.
- **(b) What is manipulated.** A **slider on the slit width a** (or, secondarily, on λ), over a curriculum-safe band.
- **(c) What recomputes and why.** The diffracted spread and the central-spot width recompute from θ=λ/a and L=2λD/a: **narrowing the slit widens the spread**. This confronts the geometric-optics intuition the figure's own stage 2 sets up ("a narrower slit would give a narrower beam") — the inverse relationship is exactly the misconception, and sliding a past the point where the spread visibly balloons is the correction.
- **(d) Curriculum caution.** θ=λ/a and L=2λD/a are core; in scope. Keep the readout descriptive (spread, central spot) — do not drift into secondary-minima/intensity-pattern detail the lesson does not teach. Moderate complexity.

---

## Strong but flagged / next tier (build after the top 10, or only after a boundary sign-off)

- **`convergence-limite` (Maths / suites-numeriques) — HIGH value, but MANDATORY curriculum flag.** This figure *is* the formal ε–N definition (its title is "la définition ε–N": the band ]ℓ−ε, ℓ+ε[ and the rank N). The canonical interactive here is a **slider on ε** that shrinks the band and makes N grow (N>log₂(80/ε) for this reservoir) — pedagogically superb. But this is the *exact* manipulation that `asymptotes` forbids in the intuitive-limits lesson. The difference is the boundary: `convergence-limite`'s lesson explicitly teaches ε–N, so the "tolerance → rank" direction is in scope *here* while it is out of scope *there*. **Do not build until a human confirms ε–N formalism is genuinely in the SM programme for this lesson** (the figure asserts it; the boundary should be verified, not inferred). This is the mirror-image teaching moment to `asymptotes` and worth a line in whatever curriculum-boundary doc governs the two lessons.
- **`continuite-tvi` (Maths / limites-continuite).** Slider on the intermediate height k in ]f(b), f(a)[; the guaranteed point c tracks along the curve and projects to the x-axis — re-proves the TVI ("any height between the ends → a c exists"). In scope (the TVI is taught) and the "k → c" direction *is* the theorem, not ε/δ. Slightly higher build cost: recomputing c needs a small numeric root-find (Newton on x³−3x=k, monotone so unique), which the module layer can carry but is more than a plain f(x) eval.
- **`trajectoire-parabolique` (PC / chute-mouvements-plans).** Slider on the launch speed v₀ (magnitude), re-drawing the parabola and updating the flèche f and portée D. In scope. **Flag:** slide the *magnitude*, not the launch *angle* — a variable angle invites the "45° maximises the range" optimisation, which likely exceeds this lesson. Magnitude-only keeps it to the horaire-equation reads the lesson does.
- **`diagramme-predominance` (PC / reactions-acido-basiques).** Slider moving a pH cursor along the axis; the predominant species flips at pH=pKA and the ratio [base]/[acid]=10^(pH−pKA) reads out. Low complexity (a 1-D cursor + a text recompute), in scope (the lesson already states the pH=7 → ~160:1 ratio). Lower ceiling than the graph candidates because the core behaviour is a single threshold flip, but cheap and genuinely useful.
- **`module-argument` (Maths / nombres-complexes-2).** Despite the slug, this figure is about the **conjugate** (reflection over the real axis) and the **opposite** (symmetry through O), not the argument. Drag z and watch z̄ and −z follow by their symmetries — re-proves both constructions. In scope; medium value; same "no argument angle" discipline as `plan-complexe`.

---

## Considered and rejected (so the next session does not re-litigate)

**Already excluded by contract.**
- `arbre-pondere` (probabilites-conditionnelles) — explicitly out of the first
  pilot wave in INTERACTIVE-FIGURE-SPEC §7 (hardest migration, 3 placements,
  no step-N groups). Leave it.

**Structural / discrete diagrams — no curve or parametric geometry to
manipulate; a control would be theatre, not a re-proof.**
- `euclide-cascade`, `arbre-denombrement`, `arrangement-combinaison`
  (a slider on n would just re-label a discrete count, no live geometry),
  `table-groupe` (Cayley table), `niveaux-energie`, `spectre-raies`,
  `courbe-aston`, `defaut-masse`, `cellule-electrolyse`, `pile-daniell`,
  `deux-chariots-inertie`, `dispersion-prisme`, `double-periodicite`,
  `moment-inertie`, `avancement-limite`, `lente-rapide`,
  `equilibre-concentrations`, `temps-demi-reaction` (a pure read-off already
  covered conceptually by `avancement-tangente`), `zones-predominance-2`
  (a two-couple comparison; the single `diagramme-predominance` carries the
  interactive idea more cleanly).

**3-D geometry — cannot be manipulated meaningfully in a flat authored SVG
without becoming a new mechanism (a real 3-D viewer), which is out of scope.**
- `plan-normal`, `sphere-plan` (geometrie-espace).

**Curriculum-boundary risk outweighs the payoff.**
- `origin-i`, `origin-uL`, `origin-uc` (rlc-serie) — `origin-uc` is just the
  linear u_C=q/C (trivial to manipulate, nothing re-proven); `origin-i`/
  `origin-uL` sit at the initial-condition/tangent of the RLC oscillation,
  where the damped closed form is a curriculum *limite*. A control here risks
  sliding into the forbidden damped solution. Low value, real risk — skip.
- `effet-catalyseur`, `facteurs-cinetiques` (controle-catalyse) — the honest
  manipulation would need a rate law / temperature dependence (Arrhenius) that
  is not in scope, so any slider could only move a curve *qualitatively* with
  no hand-computed number to re-prove. Fails the "re-prove a number" bar.

**Different-mechanism risk — the natural interaction is not "recompute a path in
the SVG" but "sync a graph to a table/second panel", which the shared contract
does not cover.**
- `tableau-variations-courbe` (derivabilite) — the pedagogy (sign of f′ ↔
  variation row) would require driving table cells from a dragged point; that is
  a new coupling, not a path recompute, and the sign-of-derivative idea is
  already served by the `tangente-derivee` pilot.

**Real but lower-leverage — genuine curves, but the marginal understanding over
the static staged version is small, or a proven pilot already covers the idea.**
- `courbe-exponentielle`, `courbe-logarithme` — a tangent-drag would re-prove
  exp′=exp / ln′(x)=1/x, but this overlaps the `tangente-derivee` pilot almost
  exactly; low marginal value, and these figures' pedagogy leans on the exp/ln
  *symmetry* (a static comparison), not a slope read.
- `rotation-complexe` — a slider on the rotation angle θ would show distance
  preservation for any angle, but the worked example fixes θ=π/2 and the payoff
  (rotations preserve length) is already legible in the static staged figure.
- `conservation-em` — conceptually attractive (energy bars summing to a constant
  E_m), but the figure is a **discrete four-position bar chart across two
  panels**, not a parametric curve; a continuous "position" slider would be a
  re-architecture, and the friction panel has *no closed-form decay law* (the
  SVG comment says so), so only the frictionless panel could go live. The
  `energie-oscillateur` pick (#8) delivers the same "sum stays constant" insight
  on an actual curve at far lower cost.
- `dephasage`, `onde-propagation-retard`, `deflexion-magnetique`,
  `rendement-esterification`, `quotient-vers-K`, `critere-qr-k`,
  `decroissance-courbe` — each has a plausible one-parameter slider (phase/
  delay; B or v → radius; initial ratio → yield; advancement → Q approaching K;
  λ → decay curve), but each is either a lower-frequency exam read or a weaker
  re-proof than a top-10 sibling. `decroissance-courbe`/`tangente-tau` in
  particular fold into the `uc-charge` time-constant family (#4) and should ride
  that module rather than get bespoke builds.

---

## The three picks to start with

If the future session builds only a handful, start with the three highest-
leverage, lowest-risk items — all of which reuse a proven module shape and carry
essentially no boundary risk:

1. **`avancement-tangente`** (PC / suivi-temporel-vitesse) — `tangente-derivee`
   transposed to a reaction curve; confronts secant-vs-tangent; exam-central.
2. **`aire-entre-courbes`** (Maths / calcul-integral) — `aire-sous-courbe` with a
   second curve; re-proves the 1/6; keep the bound on [0,1].
3. **`plan-complexe`** (Maths / nombres-complexes-1) — drag M → live |z|; the
   "no argument angle" boundary is already documented in the SVG and must hold.

Then, for misconception payoff at a higher build cost: `plan-incline-forces`
(sin vs cos on the incline) and `moment-force` (lever arm to the line of action,
not the application point).
