# D9.5 content audit — the 61-lesson fill

> **What this is.** A full review of the draft lesson corpus authored in the
> D9.5 content-fill (waves 1–9): every chapter of Maths (14), Physique-Chimie
> (25), SVT (11), and Philosophie (11) — 61 lessons, each `lesson.md` +
> `items.yaml`. The `si` stub subject is out of scope by design.
>
> **Method.** Eleven independent critic passes: `bac-fidelity-critic` and
> `pedagogy-critic` per subject batch (maths / pc-physics / pc-chimie / svt /
> philo), plus one cross-corpus `coherence-critic` (WAVE 2). Fidelity was
> judged against the official cadre where one exists (PC only:
> `docs/cadre/curriculum/pc-physique-chimie.yaml`) and against the standard
> 2ème-Bac programme otherwise (maths/svt/philo have no cadre extraction — every
> scope call there is provisional). Pedagogy was judged against the VISION
> notion anatomy and `docs/pipeline/skeleton-lesson-brief.md` (the authoring
> contract these were written to).

---

## Headline

**The corpus is strong.** Across all four subjects the critics independently
reached the same verdict: these are real graduated-ramp lessons that teach
*mechanisms* ("pourquoi c'est vrai"), not fact-lists; worked examples carry
visible expert reasoning; R0 hooks are genuine predict-then-confront moments;
and item feedback names the reasoning error, not just « faux ». Two high-stakes
axes came back clean: **philosophy attribution** (≈40 doctrine/author pairings
spot-checked — zero misattributions, zero fabricated quotations) and **maths
scope** (zero off-syllabus drift). For content written by ~50 blind subagents,
coherence held remarkably well (uniform voice; `A//a`, `g = 9,8`, and
conditional-probability notation consistent; named cross-references resolve).

The findings are the dents — concentrated, unsurprisingly, in **PC** (the one
cadre-bound subject, where an authoritative boundary makes real breaches
visible) and in a handful of mechanical slips.

---

## Findings by severity

### Tier 0 — unambiguous defects (fixed in this pass, see Remediation)

| Chapter | Defect |
| --- | --- |
| `svt/theorie-tectonique-plaques` | Arithmetic error in a worked example: `10 km = 10 000 000 cm` (should be 10⁶), spreading rate 10 cm/an instead of 1 cm/an — and R8 step 3 *defended* the wrong number as "coherent with GPS." Confirmed contained to `lesson.md` R8 (L251/253); items reference no rate value, so untouched. |
| `svt/moyens-de-defense` | Typo "on vient de établir" → "d'établir" (L223). |
| `pc/chute-mouvements-plans` | Typo "negligeable" → "négligeable" (L310). |
| `maths/calcul-integral` | English "boundary term" leaked into French prose (L337) → "le terme de bord". |
| `pc/propagation-onde-lumineuse` | Garbled R5 heading "Ce que change, à peine, la couleur, sur l'indice" (L176). |
| `pc/ondes-mecaniques-progressives` | Garbled self-correction in an item quote "« l'eau — pardon, la corde — »" (L229). |
| `pc/esterification-hydrolyse` | Named the ester "butanoate de propyle" (7 C); cadre caps ester nomenclature at 5 C. Swapped the R6 pair to `acide éthanoïque + propan-1-ol → éthanoate de propyle` (5 C) — τ/K numbers unaffected. |
| `svt/dysfonctionnements-immunitaires` | `items.yaml` entirely un-accented ("immunite", "serotherapie", …) and thinner than siblings — regenerated with correct orthography + sibling-depth feedback. |
| coherence: `pc/esterification-hydrolyse` | Unnamed "chapitre précédent" collided (meant *transformations-deux-sens* at L7 and *état-équilibre* at L86/L233). Named the siblings. |
| coherence: `pc/propagation-onde-lumineuse` | Frequency `ν` introduced with no bridge to the `f` used in the earlier wave chapters. Added the one-line bridge (the corpus already models this for the célérité `v→c` switch). |
| coherence: `svt/genetique-humaine` | R4 pointer to *génétique des populations* over-promised (that chapter is autosomal-only). Softened + added the X-linked caveat (affected males ∝ q, not q²) to defuse the trap. |

### Tier 1 — real cadre / completeness gaps (need authoring; owner scope call)

These are genuine but larger — each changes or expands what a chapter teaches.
The PC ones are cadre-authoritative (not judgment calls about *whether*, only
about *when*); the two coverage additions are high-frequency bac topics.

| Chapter | Gap | Source |
| --- | --- | --- |
| `pc/controle-catalyse` | **Cadre exclusion breach:** introduces *énergie d'activation Eₐ* + reaction-coordinate profile (explicitly Hors cadre). Also misreads "contrôle par un réactif" (= substituting an anhydride, not increasing quantity), so **anhydride d'acide + saponification/savon** is missing entirely; **autocatalyse** is over-scope. Biggest single rework. | pc-chimie fidelity |
| `pc/reactions-acido-basiques` | Missing ~half the chapter's savoir-faire: **titrage pH-métrique, équivalence, indicateurs colorés, diagramme de distribution.** High-frequency exam content. | pc-chimie fidelity |
| `pc/chute-mouvements-plans` | **Scope-swap:** teaches a charged particle in an *electric* field; cadre scopes this chapter to a *magnetic* field (force de Lorentz, B⊥v₀). The required Lorentz/magnetic-deflection savoir-faire is absent, displaced by out-of-scope E-field content. Item CMP-6 too. | pc-physics fidelity |
| `pc/systemes-oscillants` | Omits the **résonance** savoir-faire (excitateur / résonateur / résonance mécanique + amortissement); its R6 teaches "entretien des oscillations", which is the RLC chapter's concept. (Bundle the `M_Δ → 𝓜_Δ` notation alignment here.) | pc-physics fidelity + coherence N2 |
| `pc/aspects-energetiques` | Delivers generic TEC / gravitational-energy (largely 1ère-Bac); the cadre's `aspects_energetiques` is **oscillator energy** (élastique ½kx², torsion, pendule pesant). Elastic PE actually landed in `systemes-oscillants` R5 — placement drift to reconcile. | pc-physics fidelity |
| `pc/ondes-mecaniques-periodiques` | Omits **diffraction** of sound/ultrasound (condition + montage) and "milieu dispersif" — both named savoir-faire, diffraction heavily tested. | pc-physics fidelity |
| `pc/decroissance-radioactive` | **Limite overshoot:** solves the ODE by separation of variables; cadre says know/verify the solution, don't integrate. Inconsistent with `dipole-rl`/`rlc-serie`, which correctly posit-and-verify. Trim R3. | pc-physics fidelity |
| `pc/rc-charge` | **Incomplete fragment claiming "Disponible":** only an R1 rung — no R0, no ODE-resolution rung, no worked numeric, no summit, **no items.yaml**; uses a forbidden `[[figure:]]` marker. (Pre-existing, not a D9.5 author's — but live.) Complete it or de-list it. | pc-physics fidelity + pedagogy |
| coherence D1: `pc/evolution-spontanee` ↔ `pc/piles` | Near-duplicate through R0–R2 (same Zn/Cu tube scene, same Qr-vs-K derivation), each citing *état-équilibre* instead of each other. De-dup: `evolution-spontanee` owns the criterion; `piles` cites it and opens on its own question (energy recovery). | coherence + pc-chimie pedagogy |
| coherence C1: `pc/transformations-deux-sens` vs redox chapters | Teaches "⇌ ⟹ limitée" as a hard rule, but `piles`/`electrolyse`/`evolution-spontanee` write quasi-total redox reactions with ⇌. Needs one convention ruling (cadre: électrode half-eqs ⇌, équation-bilan →) then a half-sentence softening. Also fixes the `piles`/`electrolyse` bilan-arrow nit. | coherence + pc-chimie fidelity |

### Tier 2 — quality / systemic (mostly brief-bounded or owner decisions)

- **Philo answer-key bias** — in 9 of 11 chapters the correct answer is *always
  choice A* and the longest option; a test-wise student can score without
  reading. Feedback quality is excellent, so this is mechanical (shuffle +
  length-balance). `le-devoir`/`la-liberte` already vary the key — the pattern
  exists.
- **Misconception ledgers empty** (`misconceptions: []`) in ~54/61 item files —
  the brief permitted it, and prose ruptures + named-error feedback carry the
  *teaching*; but the diagnostic *routing* isn't wired.
  `decroissance-radioactive` and `moyens-de-defense` show the populated pattern.
- **Summits print full solutions inline** (no attempt-first staging) and **R0
  commits are rhetorical** (no checkpoint gate) — both DRAFT/platform
  limitations, not author faults.
- **No official cadre for maths / svt / philo** — the single highest-value
  structural upgrade; PC's audit caught real breaches the others structurally
  cannot.
- **Maths is authored entirely at SM depth but exposed to all four filières** —
  a PC/SVT student would receive off-syllabus SM material (arithmétique,
  structures, produit vectoriel). Needs filière-gating (ADR 0018 keys boundaries
  on filière for exactly this).
- **Philo depth may exceed the science-stream exam demand** (5–7 named
  philosophers per notion); in-syllabus, but possibly over-calibrated. Verify
  against the eventual cadre.
- **Voice fatigue over the long session** — the philo "fermeture de l'arc"
  strains in the 7-regard chapters; scaffolding phrases repeat verbatim across
  chapters. De-templatise, don't rebuild.
- **Coverage gaps against a full programme** — philo doesn't teach *analyse de
  texte*; maths lacks trig limits, Rolle/TAF (SM), a Primitives chapter, espaces
  vectoriels; svt defers *linked genes / brassage intrachromosomique* with no
  home in the genetics unit.

---

## Per-subject one-liners

- **Maths (14) — cleanest batch.** Zero scope drift, zero pedagogy findings on
  12/14; the ceiling is that summits synthesise but don't add a *fresh-variation
  recognition* rung (the exemplar does). Structural risk: SM-depth exposed to
  all filières.
- **PC physics (15) — most findings, all caught by the cadre pass.** One
  scope-swap (chute → E vs B field), four missing savoir-faire (diffraction,
  résonance, elastic/torsion energy, Lorentz), one ODE-method overshoot, the
  `rc-charge` fragment. The two chapters the authors *worried* about
  (`ondes-em-modulation` résonance, `atome-mecanique-newton` Bohr) were verified
  clean — the un-flagged ones are the problems.
- **PC chimie (10) — strong chain, two real holes.** The Qr/K spine is
  numerically and conceptually consistent across all 10 (the batch's biggest
  strength). Holes: `controle-catalyse` (Eₐ breach + saponification missing) and
  `reactions-acido-basiques` (dosage missing). One duplication seam
  (`evolution-spontanee`/`piles`).
- **SVT (11) — clean except one arithmetic slip.** No off-syllabus overshoot, no
  other factual error across immunology or geology. The tectonics arithmetic
  (fixed) and the soft genetics seam (fixed) were the only substantive items.
- **Philo (11) — attribution-clean, argument-strong.** Genuine philosophical
  argument-building, not "X said Y" lists; honesty rule fully respected
  (dissertations labelled original entraînement). The fixes are diagnostic
  (answer-key bias) and stylistic (fermeture fatigue), not doctrinal.

---

## Remediation

**This pass (Tier 0) — done, on branch `claude/vibrant-fermi-v1lxj5`.** The
tectonics arithmetic, the five typos/garbled-prose slips, the over-limit ester
name, the three coherence one-liners (named cross-refs, `ν` bridge, genetics
caveat), and the un-accented `dysfonctionnements` items file. All validated
(KaTeX + YAML), build green, dom-truth green.

**Next (Tier 1) — needs an owner scope decision** on how far to take it, because
each item is real authoring that changes/expands a chapter: the cadre-driven PC
reworks (controle-catalyse, chute field-swap, systemes-oscillants résonance,
aspects-energetiques oscillator-energy, decroissance ODE trim, ondes-périodiques
diffraction), the two coverage additions (acido-basiques dosage; saponification),
completing or de-listing `rc-charge`, and the `evolution-spontanee`/`piles`
de-dup. Recommended order: correctness/exclusion fixes first (controle-catalyse
Eₐ, chute field-swap, decroissance trim, rc-charge), then coverage
(dosage, saponification, résonance, diffraction, oscillator-energy), then the
de-dup and convention ruling.

**Later (Tier 2) — owner calls / infrastructure:** cadre extraction for
maths/svt/philo, filière-gating for maths, misconception-ledger discipline,
philo answer-key de-bias, voice de-templatising, the programme coverage gaps.
