# Pedagogy spec — Probabilités conditionnelles (SM · 2ème Bac)

> **Notion:** Probabilités conditionnelles (conditional probability)
> **Subject / stream:** Mathématiques — Sciences Mathématiques (SMA / SMB), 2ème Bac
> **`skills.code` target:** `sma_prob_conditionnelle` *(proposed — see "Skill attribution & open items" §0.4; the legacy unprefixed `conditional_prob` UUID is `33333333-0000-0000-0000-000000000017` and must NOT be reused for SMA items, per the ADR 0011 two-parallel-banks ruling)*
> **`subject_code`:** `math`
> **Pipeline step:** 1 of 7 (`docs/pipeline/pipeline.md`). This spec is the input to content-author (step 2) and item-author (step 3).
> **Authored by:** pedagogy-architect (Opus), autonomously.
> **Language policy:** This spec's *meta* is English. **Every student-facing string** — lesson prose, item stems, choices, explanations, hints, and the misconception `label` / `description` / `contradicts_principle` as they will be stored and shown — **MUST be authored in French.** The French exemplars in this spec are the register and the substance the authors copy; they are not placeholders to be translated from English.
>
> ---
>
> ## ⚠ VALIDATION STATUS — NOT YET HUMAN-VALIDATED
>
> Per the pedagogy-architect lane (RULES §0; agent file "Working rules"), Phases 1–3 are **human-gated collaboration, not autonomous work.** This spec was authored **autonomously** because the human chose "author the whole notion now" for the disposable eval harness. It has **not** had the human's domain-judgment pass. The human holds bacs in SMA and Sciences Physiques and knows where students actually fail; that knowledge has **not** been applied here yet. Treat every pedagogical claim, every misconception, every difficulty placement, and especially every **scope boundary** below as *proposed*, pending the editorial gate. Items flagged ⚠ are the ones most likely to need the human's correction.

---

## 0. Scope and prerequisite placement

### 0.1 What the bac asks here (in scope — bound tightly)

The SM probability strand teaches, in this order: dénombrement → probabilité (univers, événements, équiprobabilité) → **probabilités conditionnelles** (this notion) → variables aléatoires / loi binomiale. This notion sits **after** basic probability and **before** random variables. It is the modeling-and-misconception-heavy core of the strand.

The notion covers **exactly** these objects and no more:

1. **La probabilité conditionnelle** — définition and notation:
   `P(B|A) = P(A∩B) / P(A)`, defined for `P(A) ≠ 0`.
   *(French notation note: the Moroccan SM convention is often written `P_A(B)` as well as `P(B|A)`. The lesson MUST present and use both forms, leading with `P_A(B)` if that is what the cadre/manuels use — flagged ⚠ for the human to confirm which is primary.)*
2. **La règle du produit / formule des probabilités composées** —
   `P(A∩B) = P(A) · P(B|A) = P(B) · P(A|B)`.
3. **L'arbre pondéré** (the weighted probability tree) — the **central représentation** of this notion. The student must be able to *build* a 2-level binary tree, read `P(A∩B)` as the **product along a branch**, and read `P(B)` as a **sum over the leaves where B occurs**.
4. **La formule des probabilités totales** — for a partition `{A, Ā}` (and more generally `{A₁, …, Aₙ}` partitioning Ω):
   `P(B) = P(A)·P(B|A) + P(Ā)·P(B|Ā)`.
5. **L'indépendance de deux événements** —
   `A et B indépendants ⇔ P(A∩B) = P(A)·P(B) ⇔ P(B|A) = P(B)` (when `P(A)≠0`).
6. **La lecture inverse de l'arbre — P(A|B) "à rebours"** — a *light* Bayes-style reversal: given a tree built forward (root → A/Ā → B/B̄), compute `P(A|B)` by `P(A∩B) / P(B)`, i.e. "the favourable leaf over the sum of all leaves where B occurs." This is the disease-test / two-machines question type the bac actually asks.

### 0.2 Out of scope — do not let the lesson or items drift here

- **Full Bayes theorem stated as a named, memorised formula** `P(Aᵢ|B) = P(Aᵢ)P(B|Aᵢ)/Σ P(Aⱼ)P(B|Aⱼ)`. ⚠ **Scope boundary flagged for the human.** The brief instructs: keep the reversal to tree-reading, do **not** drift into full Bayes formalism. The *recovered old item bank* (`backend/seed/content/math_05_probability.sql`, items 107 "disease test" and 108 "two machines") DID invoke "le théorème de Bayes" by name. This spec deliberately reframes those same question *types* as **tree-reversal** (`P(A|B) = P(A∩B)/P(B)`, normalise over the B-leaves) rather than as a named theorem. **The human must confirm** whether the SM cadre names Bayes explicitly or only asks the tree-reversal computation. If the cadre names it, add one terminal lesson beat that *names* the formula as a packaging of what the tree already does — but the mechanism stays the tree, never a memorised formula.
- Continuous probability, densities, conditional expectation.
- The général partition with n > 2 branches as a *separate* heavy treatment — the lesson teaches the 2-branch partition fully and *generalises in one sentence*; multi-branch partitions appear only as a stretch rung, not as core.
- Dénombrement technique (arrangements vs combinaisons) — that is the **prior** skill. We *use* counting results but do not re-teach them. (Note: "arrangement vs combination" is listed in the agent file as a probability misconception, but it belongs to the dénombrement skill, not here — see §0.5.)

### 0.3 Prerequisites (must be in place before this notion)

- **Probabilité de base:** univers Ω, événement, équiprobabilité `P(A)=card(A)/card(Ω)`, événement contraire `P(Ā)=1−P(A)`, réunion/intersection, événements **incompatibles** `P(A∪B)=P(A)+P(B)`. *(The incompatible-events formula is the load-bearing prerequisite: the independent-vs-incompatible confusion, M3 below, is precisely a collision between this prior fact and the new independence fact.)*
- **Dénombrement:** counting favourable/total outcomes; combinaisons (for "sans remise" item types).
- **Arithmetic of fractions and decimals.**

### 0.4 Skill attribution (carry to supabase-architect, step 7 — do NOT act on it here)

Per ADR 0011, items must land on the **SMA-prefixed** skill, never the legacy unprefixed `conditional_prob` (`…0017`) which serves SMB and carries the old, untagged item bank. The misconception IDs and item `skill_id` must resolve to the SMA skill so the scheduler's "unresolved misconceptions on this skill" join returns rows (the FK-semantic-mismatch finding, ADR 0011). **The exact SMA `skills.code` and UUID must be confirmed by supabase-architect against the live schéma before any migration.** Proposed code: `sma_prob_conditionnelle`. This is a step-7 concern; flagged here only so the IDs below are coherent.

### 0.5 A note on the agent-file "expected" misconceptions

The pedagogy-architect agent file predicts for *Probabilités (SM)*: "independent vs mutually exclusive; P(A|B) vs P(B|A); arrangement vs combination." The first two are dead-centre for *this* notion and are M3 and M1 below. **"Arrangement vs combination" is a dénombrement misconception, not a conditional-probability one** — it is explicitly routed out of this skill (it belongs on the counting skill, same way M-candidates were routed out of `sma_limit_calc` to `sma_limit_ops` in ADR 0008). Flagged so the human sees the deliberate cut.

---

## 1. The misconception inventory — the diagnostic spine

Eight misconceptions. Each is a **wrong model**, not a slip (ADR 0008 §3 criterion a). Each names the principle it contradicts (criterion b), is distinguishable from the others on at least one stem (criterion c — the `distinguishing_mcq_stem` below is that stem), and is grounded in didactics literature + the recovered bac item bank + standard Moroccan SM error patterns (criterion d).

**Downstream shape contract (mined from migrations 043/044/045 and ADR 0008/0009):** each misconception, when item-author / supabase-architect encode it, carries the canonical fields
`{ id, label, description, contradicts_principle, distinguishing_mcq_stem{ stem_text, distractor_choice_label, distractor_rationale, correct_choice_label, correct_rationale }, label_ar:null }`.
The seed JSON additionally carries `evidence[]` (≥1 citation). **All of `label`, `description`, `contradicts_principle`, and the stem text are French.** The `distractor_choice_label` is a letter A–D; item-author converts to the 0-based string index (`A=0, B=1, C=2, D=3`) for `items.distractor_misconceptions` (migration 046 convention).

ID format (ADR 0008 §2): `mc.math.<skill_code>.<short-label>`. Below uses `sma_prob_conditionnelle` as the skill segment — supabase-architect reconciles to the real code at encode time.

---

### M1 — `mc.math.sma_prob_conditionnelle.transpose-conditionnel`
**Label (FR, as shown):** « P(A|B) et P(B|A) sont la même chose »
**The wrong model.** The student treats the conditional as symmetric — reads `P(B|A)` and `P(A|B)` as interchangeable, because "the probability of A and B together" feels order-free the way `A∩B` is. The bar is read as "et" rather than as "sachant que". This is the transposed conditional / prosecutor's-fallacy-lite.
**How it manifests.** Asked for `P(maladie | test positif)`, the student returns the given `P(test positif | maladie)` (the test's sensitivity) — a large number where the true answer is small. On a tree built root→cause→effect, the student reads the *given* effect-given-cause edge as if it were the asked cause-given-effect.
**The correct model.** `P(B|A) = P(A∩B)/P(A)` and `P(A|B) = P(A∩B)/P(B)` share the **same numerator** but have **différent denominators**. They are equal only in the special case `P(A)=P(B)`. The conditioning event is the *denominator* — "sachant que B" means "restrict the universe to B, then measure A inside it."
**Confrontation strategy (predict-then-reveal, the probability-as-PC-profile move).** Give the disease-test scenario with sensitivity 95% and a rare disease (1%). Ask the student to *predict* `P(malade | test +)`. Most predict ≈95% (running M1). Reveal ≈9% by walking the tree backwards: of all positive tests, the vast majority come from the huge healthy population's false positives. The gap between the predicted 95% and the actual 9% is the rupture that breaks the symmetry intuition. This is the single most important confrontation in the notion.
**Distinguishing stem (FR):** « Une maladie touche 1 % de la population. Un test détecte 95 % des malades (P(T+|M)=0,95) et donne 10 % de faux positifs (P(T+|M̄)=0,10). Une personne est testée positive : quelle est P(M|T+) ? Choix : A) ≈ 0,09 ; B) 0,95 ; C) 0,50 ; D) 0,01. »
→ trigger **B** (returns the given P(T+|M)); correct **A**. (B is the signature of M1; C is the base-rate-ignoring "could be either" guess, D is the prior P(M) — neither C nor D is another M in this set, see co-attribution note.)

---

### M2 — `mc.math.sma_prob_conditionnelle.conditionnelle-egale-intersection`
**Label (FR):** « P(A|B) = P(A∩B) »
**The wrong model.** The student conflates the conditional with the joint — drops the `/P(B)` normalisation. "Sachant B" and "et B" collapse into one idea: both feel like "A and B happen."
**How it manifests.** Given `P(A∩B)=0,3` and `P(B)=0,5`, the student answers `P(A|B)=0,3` instead of `0,6`. On a tree, the student stops at the leaf value (the product along the branch) and reports it as the conditional, never dividing by the branch-total.
**The correct model.** The conditional **renormalises** to the conditioning event: `P(A|B)=P(A∩B)/P(B)`. The joint `P(A∩B)` is measured in the full universe Ω; the conditional is measured in the *restricted* universe B. Concretely: `P(A∩B)` is "what fraction of *everyone* is in both," `P(A|B)` is "what fraction *of the B people* are also in A." Dividing by `P(B)` is what shrinks the universe down to B.
**Confrontation strategy.** Concrete-before-abstract with a population grid: 100 students, show the A∩B count, the B count, and ask both questions side by side ("quelle fraction de *toute la classe*…" vs "quelle fraction *des sportifs*…"). The same numerator over two différent denominators makes the `/P(B)` visible as the act of restricting the universe. Then check: when is `P(A|B)=P(A∩B)`? Only when `P(B)=1`.
**Distinguishing stem (FR):** « On donne P(A∩B)=0,3 et P(B)=0,5. Que vaut P(A|B) ? Choix : A) 0,6 ; B) 0,3 ; C) 0,8 ; D) 0,15. »
→ trigger **B** (= the joint, undivided); correct **A**. (C = P(A∩B)+P(B)−… additive confusion noise; D = the *product* P(A∩B)·P(B), a différent slip not in this set.)

---

### M3 — `mc.math.sma_prob_conditionnelle.independant-egale-incompatible`
**Label (FR):** « Indépendants = incompatibles »
**The wrong model.** The student fuses the two relationships that the strand introduces back-to-back. "Indépendant" (no influence) and "incompatible / disjoint" (cannot co-occur) are heard as synonyms for "separate, unrelated." This is the headline confusion of the whole notion and the one the recovered old true/false item (item 106) already targeted.
**How it manifests.** The student declares two incompatible events independent, or applies the wrong formula: uses `P(A∪B)=P(A)+P(B)` (the incompatible rule) when asked about independence, or reasons "they're independent so they can't happen together."
**The correct model.** They are **opposite** notions, not the same:
- **Incompatibles:** `A∩B=∅`, so `P(A∩B)=0`. Knowing A happened tells you B *cannot* — that is maximal influence, the opposite of independence.
- **Indépendants:** `P(A∩B)=P(A)·P(B)`. Knowing A happened changes nothing about B: `P(B|A)=P(B)`.
Two events with non-zero probabilities **cannot be both** incompatible and independent (if incompatible, `P(A∩B)=0≠P(A)P(B)>0`). This is the cleanest possible refutation and the lesson must state it explicitly.
**Confrontation strategy (confront the contradiction).** Force the collision: take a concrete A, B with `P(A),P(B)>0` that are incompatible (e.g. on one die roll, A="obtenir 2", B="obtenir 5"). Ask "sont-ils indépendants ?" The student running M3 says yes. Then compute `P(B|A)`: given we rolled a 2, the probability of having rolled a 5 is **0**, not `P(B)=1/6`. So A *massively* influences B — they are the *furthest thing from* independent. The contradiction is the teaching moment.
**Distinguishing stem (FR):** « A et B sont deux événements avec P(A)=0,4, P(B)=0,5 et P(A∩B)=0. Lesquels sont vrais ? Choix : A) A et B sont incompatibles mais PAS indépendants ; B) A et B sont indépendants car ils n'ont aucun lien ; C) A et B sont à la fois incompatibles et indépendants ; D) A et B sont indépendants car P(A∩B)=0. »
→ trigger **C** (the literal fusion); correct **A**. (B is the "no link = independent" verbal form of M3; D is M4's signature — see M4. Note B and C and D all touch M3-family thinking; the **primary** diagnostic trigger for M3 is **C** because it asserts the fusion outright. B and D are co-attributable — see the co-attribution note below.)

---

### M4 — `mc.math.sma_prob_conditionnelle.independant-implique-intersection-nulle`
**Label (FR):** « Indépendants ⇒ P(A∩B)=0 »
**The wrong model.** A specific, separable conséquence of the independent/incompatible muddle, but distinct enough to diagnose on its own: the student believes independence *means* the events don't overlap, so `P(A∩B)=0`. (M3 is the conceptual fusion; M4 is the operative wrong équation it produces. They are split because a student can hold M4 — "independent things don't intersect" — while *also* being shaky on the word "incompatible," and an item can isolate M4 cleanly.)
**How it manifests.** Given A, B independent with `P(A)=0,4`, `P(B)=0,5`, the student answers `P(A∩B)=0` instead of `0,2`.
**The correct model.** Independent events with non-zero probability **must** overlap: `P(A∩B)=P(A)·P(B)=0,2≠0`. Independence is about the *value* of the overlap (it equals the product), not the *absence* of overlap.
**Confrontation strategy.** Two coin flips: A="1er pile", B="2e pile", clearly independent. Ask `P(A∩B)` = P(two piles) = 1/4, which is plainly not 0 — you can obviously get two piles. Independence did not forbid the overlap; it *fixed* its size to `P(A)·P(B)=1/2·1/2`.
**Distinguishing stem (FR):** « A et B sont indépendants, avec P(A)=0,4 et P(B)=0,5. Que vaut P(A∩B) ? Choix : A) 0,2 ; B) 0 ; C) 0,9 ; D) 0,1. »
→ trigger **B** (=0, the no-overlap belief); correct **A** (=product). (C = P(A)+P(B)−P(A)P(B) or just the sum-confusion; D = noise.) This stem isolates M4 from M3: it gives independence as a premise and asks only for the overlap value, so the verbal fusion (M3's C) cannot fire here.

---

### M5 — `mc.math.sma_prob_conditionnelle.independant-somme`
**Label (FR):** « Indépendants ⇒ P(A∩B) = P(A) + P(B) »
**The wrong model.** The student knows independence has a formula but retrieves the **wrong opération** — adds instead of multiplies. The addition comes from contamination by the incompatible-events formula `P(A∪B)=P(A)+P(B)`: the "+" from union leaks onto the intersection. This is the exact error the recovered old item 106 was written as a true/false trap.
**How it manifests.** Independent A, B with `P(A)=0,4`, `P(B)=0,5` → student answers `P(A∩B)=0,9`. Note `0,9` is also a *possible* contamination value on other stems; the diagnosis relies on the value being `P(A)+P(B)` specifically.
**The correct model.** For **independent** events the intersection **multiplies**: `P(A∩B)=P(A)·P(B)`. Addition is for the **union of incompatible** events. Two différent opérations, two différent relationships, two différent set-operations (∩ vs ∪). The lesson must tabulate them side by side so the student stops cross-wiring.
**Confrontation strategy.** Sanity-check by magnitude: `P(A)+P(B)=0,9` would say two independent events co-occur 90% of the time — more often than *either* one alone happens. That is absurd: the overlap can never exceed the smaller event. A probability that *exceeds its parts* is the red flag. (`P(A∩B) ≤ min(P(A),P(B))` always.)
**Distinguishing stem (FR):** « A et B sont indépendants, avec P(A)=0,4 et P(B)=0,5. Que vaut P(A∩B) ? Choix : A) 0,2 ; B) 0,9 ; C) 0 ; D) 0,45. »
→ trigger **B** (= the sum); correct **A** (= the product). (C = M4's no-overlap value; D = the average, noise.) Same premise as M4's stem but a *différent distractor set*: here the M4 value (0) is present as a non-target and the M5 sum (0,9) is the trigger. **This is a deliberate co-attribution: choice C "0" on this stem is reachable by M4, and choice B "0,9" on M4's stem is reachable by M5.** See the co-attribution / dual-tag note — these are NOT stem defects.

---

### M6 — `mc.math.sma_prob_conditionnelle.arbre-additionne-branche`
**Label (FR):** « On additionne le long d'une branche : P(A∩B)=P(A)+P(B|A) »
**The wrong model.** When reading a weighted tree, the student **adds** the two edge-probabilities along a single root-to-leaf path instead of **multiplying** them. The visual of "going down two steps" reads as "accumulate / add up," the way distances add along a path.
**How it manifests.** Tree with `P(A)=0,6` then `P(B|A)=0,4`: the student writes the leaf as `0,6+0,4=1,0` instead of `0,6·0,4=0,24`. Often produces leaf "probabilities" > 1, which the student does not flag as impossible.
**The correct model.** **Along a branch, multiply** (the compound rule `P(A∩B)=P(A)·P(B|A)` is exactly "the chain of conditional steps"); **across branches / over leaves, add** (the total-probability sum). Multiply *down*, add *across* — the two directions of the tree do two différent opérations. The product is right because each edge is a conditional *proportion of what reached the node above it*.
**Confrontation strategy.** The impossibility check: if adding were right, a deep tree would give "probabilities" above 1, which is meaningless. Then ground it: of the 60% who do A, only 40% of *those* go on to B — so the A∩B leaf is 40% **of** 60%, and "40% of 60%" is multiplication, not addition. "Of" = ×.
**Distinguishing stem (FR):** « Sur un arbre : P(A)=0,6 et P(B|A)=0,4. Que vaut P(A∩B) (probabilité de la branche A puis B) ? Choix : A) 0,24 ; B) 1,0 ; C) 0,2 ; D) 0,5. »
→ trigger **B** (= the sum 0,6+0,4); correct **A** (= product). (C = différence, D = noise.) The "> 1 would be impossible" property makes B uniquely the additive signature.

---

### M7 — `mc.math.sma_prob_conditionnelle.totales-sans-ponderation`
**Label (FR):** « Probabilités totales sans pondérer : P(B)=P(B|A)+P(B|Ā) »
**The wrong model.** Applying the law of total probability, the student sums the **conditional** probabilities directly, forgetting to weight each by the probability of its branch. The structure `P(B)=Σ …` is remembered, but the `P(Aᵢ)·` factor is dropped.
**How it manifests.** With `P(A)=0,6`, `P(B|A)=0,5`, `P(Ā)=0,4`, `P(B|Ā)=0,2`: the student writes `P(B)=0,5+0,2=0,7` instead of `0,6·0,5+0,4·0,2=0,38`. A close cousin: using a set of events that is **not a partition** (overlapping, or not covering Ω) and summing anyway.
**The correct model.** `P(B)=P(A)·P(B|A)+P(Ā)·P(B|Ā)` — each conditional is **weighted by how often you are on that branch**. The weights `P(A)`, `P(Ā)` are the sizes of the sub-populations; you cannot average two rates without weighting by population. And the weights must come from a **partition** (`A∪Ā=Ω`, `A∩Ā=∅`, all `P(Aᵢ)` sum to 1) — that is what makes every B-outcome counted exactly once.
**Confrontation strategy.** Weighted-average intuition: branch A's B-rate is 50% but only 60% of people are there; branch Ā's B-rate is 20% over the other 40%. The overall B-rate is the weighted average 0,38, which must lie *between* 0,2 and 0,5 — `0,7` is outside that range and therefore impossible. Re-derive it as a sum over the **leaves** of the tree where B occurs (`A∩B` leaf + `Ā∩B` leaf), which is automatically weighted because each leaf already carries its branch product.
**Distinguishing stem (FR):** « P(A)=0,6, P(B|A)=0,5, P(Ā)=0,4, P(B|Ā)=0,2. Que vaut P(B) ? Choix : A) 0,38 ; B) 0,7 ; C) 0,35 ; D) 0,1. »
→ trigger **B** (= unweighted sum of conditionals); correct **A**. (C = simple average (0,5+0,2)/2, a *related but distinct* unweighting error — secondary signature of M7, acceptable as same-M co-attribution; D = noise.)

---

### M8 — `mc.math.sma_prob_conditionnelle.rebours-mauvais-denominateur`
**Label (FR):** « Lecture inverse de l'arbre : mauvais dénominateur pour P(A|B) »
**The wrong model.** Reading the tree **backwards** to get `P(A|B)`, the student divides the favourable leaf by the **wrong denominator** — typically by `P(A)` (the forward branch they came down) instead of `P(B)` (the sum of *all* leaves where B occurs). The student normalises against the cause instead of against the observed effect.
**How it manifests.** Two-machines item: `P(M₁∩D)=0,030`, `P(D)=0,042`. The student computes `P(M₁|D)` as `0,030/0,60` (÷ P(M₁)) or `0,030/0,05` (÷ P(D|M₁)), instead of `0,030/0,042 = 5/7`. They forget to form `P(B)` by total probability first.
**The correct model.** `P(A|B)=P(A∩B)/P(B)`, and **`P(B)` must be assembled from the whole tree** by total probability (`P(B)=P(A∩B)+P(Ā∩B)`, the sum of *every* leaf where B happens). The denominator is the *observed* event B (all the ways it could have arisen), not the single path you are asking about. "Sachant B" restricts to B, so divide by all of B.
**Confrontation strategy.** Make the denominator concrete as "the whole B world": shade *every* leaf where B occurs on the tree; the favourable one is `A∩B`; `P(A|B)` is its share of the *shaded total*, not its share of branch A. Connect explicitly to M2 (the missing `/P(B)`) and M1 (which conditional is asked) — M8 is where those two reappear inside the reversal.
**Distinguishing stem (FR):** « Deux machines : M₁ fait 60 % des pièces (5 % défectueuses), M₂ fait 40 % (3 % défectueuses). Une pièce défectueuse est tirée : P(M₁|D) ? Choix : A) 5/7 ; B) 0,05 ; C) 0,6 ; D) 0,03. »
→ trigger **C** (divides by the wrong denominator → returns ≈ the prior P(M₁)=0,6) **or** secondary **B** (returns P(D|M₁)=0,05, the un-reversed conditional); correct **A** (=5/7≈0,71). Primary diagnostic trigger **C**. (B is co-attributable with M1's transposition — see note.)

---

### Co-attribution / dual-tag note (carry verbatim to item-author)

Several misconceptions in this set are *cousins* (the independent/incompatible family M3–M5; the reversal family M1/M8). This produces **legitimate cross-reachable distractors**, which per the agent standard are **NOT stem defects**:

- *Correct-answer contamination* (a stem that lets a misconception reach the **correct** answer) **is** a defect — revise the stem. None of the stems above do this; verify each authored item against this.
- *Target-distractor co-attribution across skills/misconceptions* (a single distractor reachable by more than one misconception's wrong model) **is expected and fine** — it requires **dual-tagging**, i.e. `items.distractor_misconceptions` maps that choice index to **both** misconception IDs where genuinely co-reachable, or each item is built so its *primary* trigger is unique and secondary co-reachable choices are tagged accordingly.

Concretely flagged co-attributions item-author must handle:
- **M4 ↔ M5:** "0" (no-overlap) and "0,9" (sum) on the independence-overlap stems. Build M4's primary item so its trigger "0" is the unique target and "0,9" is a tagged secondary (→ M5), and vice-versa on M5's primary item. Do not treat the cross-reachability as a bug.
- **M1 ↔ M8:** the un-reversed conditional (returning the given `P(effect|cause)`) is reachable by both the transposition model (M1) and the wrong-denominator reversal (M8). Tag the shared distractor to both where it appears; keep each item's *primary* trigger distinct (M1's primary is on a pure two-event stem; M8's primary "C" is the prior-as-denominator value, which M1 does not produce).
- **M2 is the root of M8.** M8 items will also lightly surface M2 (missing `/P(B)`). That is intended scaffolding-of-diagnosis, not contamination.

---

## 2. The graduated ramp

Reasoning-demand rises and scaffolding fades across the rungs (VISION: "early rungs build fluency … later rungs build recognition"). The probability-as-confront-the-model profile means **several rungs are predict-then-reveal**, not just compute-the-answer. Each rung names the misconception(s) it confronts and the scaffolding level.

| Rung | Type | Scaffolding | Confronts | What the student does |
|---|---|---|---|---|
| **R0 — Hook** | predict-then-reveal | full (it's narrative) | M1 (sets it up) | The disease-test surprise: predict P(malade\|test+), feel the gap when it's ≈9%. No computation expected yet — the *question* is planted. |
| **R1 — Définition, fully worked** | worked example | full — every step shown, expert reasoning out loud | M2 | `P(A\|B)=P(A∩B)/P(B)` on a population grid (sportifs/footballeurs, recovered item 105 type). Expert voice: "on nous demande la proportion *parmi les sportifs* — donc on ramène l'univers aux sportifs, on divise par P(sport)." |
| **R2 — Règle du produit, guided** | guided practice | high — the tree is pre-drawn, student fills products | M6 | Build/read a 2-branch tree; compute the four leaves as products. First place the "multiply down" rule fires. Impossibility check (leaf > 1) introduced. |
| **R3 — Indépendance vs incompatibilité** | confront-the-contradiction | medium — the contradiction is staged, student resolves it | M3, M4, M5 | The side-by-side table; the die example forcing P(B\|A)=0 for incompatibles; the magnitude sanity-checks. The independence formula is *multiply*, isolated from the union-add formula. |
| **R4 — Probabilités totales** | worked → guided | fading — first one worked, second student-led | M7 | Assemble P(B) over the leaves; weighted-average intuition; the "answer must lie between the branch rates" check. Partition condition stated. |
| **R5 — Lecture inverse (P(A\|B) à rebours)** | worked example, high reasoning | low — minimal scaffolding, student drives the reversal | M8, M1 (revisited), M2 (revisited) | The two-machines reversal (recovered item 108). Shade-all-B-leaves; favourable-over-shaded-total. The hook's disease-test (R0) is *now solved* here — closing the arc. |
| **R6 — Past-bac** | exam item, unscaffolded | none | all, mixed | **Real SM bac questions.** ⚠ The recovered old bank gives the *types* (sans-remise urn, conditioning-on-sum dice, disease test, two machines) but those are reconstructions, not sourced exam papers. **Flag for the human / curriculum-extraction:** insert genuine past SM national-exam conditional-probability questions here with year+session citations. Until sourced, R6 uses bac-style reconstructions clearly labelled as such. |
| **R7 — Fresh variation** | novel transfer | none | recognition under unfamiliar dress | Same deep structure as R6, re-skinned so nothing is memorisable: e.g. the two-machines reversal re-dressed as spam-filter / two-suppliers / two-urns. Tests "can you see which procédure applies when the problem is dressed unfamiliarly" (VISION). |

**Where scaffolding fades:** full at R0–R1, high at R2, then steadily down — by R5 the student is doing the reversal with only a structural prompt, and R6–R7 are unscaffolded. The **reasoning demand** rises faster than the arithmetic: R5's numbers are no harder than R2's, but the *decision* (which denominator, which direction of the tree) is the whole difficulty.

**Arc closure (important for the lesson's felt cohérence):** the disease-test planted in R0 as an unanswered surprise is *deliberately left open* until R5, where the now-equipped student resolves it. content-author must wire this callback explicitly — it is the payoff that makes the notion feel like one journey, not a list of formulas.

---

## 3. Media / interactive callouts (every callout typed per ADR 0017)

Only what the concept genuinely needs. The arbre pondéré is the one non-negotiable visual; everything else is judged against "does the idea *need* this modality."

### C1 — The weighted probability tree (the central representation) — REQUIRED
- **Type:** `structural / labelled`
- **Tool:** **coded SVG + KaTeX** — **never Gemini.** (ADR 0017: the first smoke test proved Gemini draws a *plausible* 2→3→6 tree with garbled `P(A|B)` labels when asked for a correct 2→2→4 tree. Structure and glyphs must be code. The garbled-tree PNGs at `content/_media-test/conditional-probability-tree*.png` are the evidence — do not use them.)
- **Where:** introduced at **R2**, reused at R4 (total probability = sum over B-leaves) and R5 (reversal = shade the B-leaves). One canonical tree component, re-labelled per use.
- **What it MUST show, exactly:**
  - Root node (Ω / "départ").
  - **Two** first-level branches: `A` and `Ā`, edges labelled `P(A)` and `P(Ā)=1−P(A)` (KaTeX).
  - From **each** first-level node, **two** second-level branches: `B` and `B̄`, edges labelled with the **conditional** probabilities `P(B|A)`, `P(B̄|A)`, `P(B|Ā)`, `P(B̄|Ā)`.
  - **Exactly four leaves**, each labelled with its intersection and its product value: `A∩B = P(A)·P(B|A)`, `A∩B̄`, `Ā∩B`, `Ā∩B̄`.
  - The "multiply along the branch" reading and the "sum the B-leaves for P(B)" reading must be visually expressible (e.g. a soft signal-highlight on the two B-leaves when illustrating total probability; a différent highlight on the single `A∩B` leaf + the two B-leaves when illustrating the reversal denominator).
  - DESIGN-BIBLE §6: flat, soft, muted, single restrained accent for the highlighted path; labels integrated *beside* their edges (no split-attention); KaTeX for every probability glyph (DESIGN-BIBLE §3 "math is rendered, not imaged").
- **Number values:** use round, checkable numbers (the R2/R4/R5 worked examples) so a student can verify by hand.

### C2 — The manipulable tree sandbox (deep understanding) — RECOMMENDED
- **Type:** `manipulable`
- **Tool:** **embed** (GeoGebra applet) — the maths profile demands a *manipulable* conceptual layer (VISION: "drag the point, predict the tangent, watch it update", wired to the symbolic notation). **Do not rebuild from scratch** (ADR 0017). *(Référence only, not a foundation: the retired Flutter `ProbabilityTreeWidget` at `mobile/bac_app/lib/widgets/math/probability_tree_widget.dart` already implemented exactly this — three sliders `P(A)`, `P(B|A)`, `P(B|Ā)` driving live leaf products, `P(B)` as the leaf-sum, and `P(A|B)` recomputed live. It is the proof the interaction is right and a spec for the embed's behaviour; it is **not** reusable code — Flutter is retired, ADR 0016.)*
- **Behaviour the embed must have:** student drags `P(A)`, `P(B|A)`, `P(B|Ā)`; the four leaf products, `P(B)` (leaf-sum), and `P(A|B)` (reversal) update live. This lets the student *see* M1 (P(A|B) ≠ P(B|A) as both move), M5/M6 (products vs sums), and M7 (weighting) by manipulation.
- **Placement:** offered at R5 as the "play with the reversal" beat, after the worked reversal. Optional-depth, in the calm core (no engagement theater).
- **Fallback:** if no suitable embed is wired in time, C1 (static, with 2–3 pre-set parameter snapshots) carries the load; the manipulable is an enhancement, not a blocker.

### C3 — Hook image (the disease-test scene) — OPTIONAL, light
- **Type:** `atmospheric / illustrative`
- **Tool:** **Gemini** (gemini-image MCP) with the **DESIGN-BIBLE style preamble appended verbatim** (pipeline.md "mandatory style preamble").
- **Where:** R0 hook only. A calm, gallery-like scène evoking the medical-test moment (a single patient receiving a result) — **scene-setting only, zéro numbers, zéro structure, no diagram, no labels.** The instant any probability, tree, or notation is needed, that is C1's job (structural → code), never Gemini.
- **Strictly bounded:** if it risks adding stimulation over comprehension (VISION), cut it. The hook works on prose alone; the image is a mood, not information.

### C4 — Independence vs incompatibility — NO new media
- Handled by an **inline coded comparison table** (KaTeX in the lesson body) + the die example in prose. Type would be `structural` if it were a figure, but a two-row HTML/markdown table with KaTeX cells is lighter and lives in the prose. **No Gemini, no separate asset.** Flagged explicitly so content-author does not over-produce here — the cohérence principle (DESIGN-BIBLE §6) says only the marks essential to the idea.

**No Manim callout.** Motion is reserved for the hardest dynamic concepts (ADR 0017 e.g. RLC energy exchange). Conditional probability's hard part is *structural* (the tree) and *manipulable* (the sandbox), not *motion*. A Manim animation here would be decoration. If, on the human's review, the "restricting the universe to B" idea (M2/M8) proves to need motion, that is the *one* candidate for a future `motion / Manim` callout — flagged, not built.

---

## 4. Build spec — for content-author (writes `lesson.md`)

**Profile:** Maths, but this notion runs the **confront-the-model** variant (agent file slice exception: Probabilités is misconception-heavy, closer to the PC predict-then-reveal profile). So: worked procédure **and** staged contradiction, not procédure alone.

**Structure to produce, in this order (VISION's "what a notion is"):**
1. **Hook (R0)** — the disease-test surprise. Make the student *predict* before revealing. Plant the question; leave it open. (C3 optional image.)
2. **Décortiquer** — take the conditional fully apart, concrete before abstract:
   - Start from the population-grid picture (proportion *among* B), arrive at `P(A|B)=P(A∩B)/P(B)` as the *act of restricting the universe* — mechanism made obvious, not just the formula. Confront M2 here.
   - Then the compound rule and the tree (R2): "multiply down, add across", with the why (each edge is a proportion *of what reached it*). Confront M6.
   - Then independence vs incompatibility (R3): the side-by-side, the die contradiction, the magnitude checks. Confront M3, M4, M5. **This is the highest-density misconception beat — pace it slowly, check each pièce before moving on.**
   - Then total probability (R4): weighted average; partition condition. Confront M7.
   - Then the reversal (R5): shade-all-B-leaves; favourable-over-shaded-total; **resolve the R0 hook here.** Confront M8 (and revisit M1, M2).
3. **Expert reasoning shown out loud** in every worked example — not "on divise par P(B)" but "*on nous demande la proportion parmi les B, donc l'univers se réduit à B, donc le dénominateur est P(B)*." For the reversal: "*on observe l'effet (le test positif) et on remonte vers la cause — donc on divise par TOUT ce qui produit cet effet, pas seulement par la branche qu'on suspecte.*"
4. **Graduated ramp** R1→R7 as §2, scaffolding fading as specified.
5. **Grounded throughout** — the recovered real contexts (sport/football, urne sans remise, dépistage médical, deux machines) are good, concrete, bac-authentic; reuse the *contexts*, author the prose fresh.

**Hard rules for content-author:**
- **French, voice-ready** (VISION "authored voice-ready"; written to be spoken aloud, conversational, "on calcule…" impersonal per content-guide). Every string the student sees is French.
- **KaTeX for all math**, never images of équations (DESIGN-BIBLE §3).
- **Use both notations** `P(B|A)` and `P_A(B)` (⚠ confirm primary with human).
- **Place C1 (the coded tree) exactly at R2/R4/R5** as specified; référence C2 sandbox at R5.
- **Do not** introduce full Bayes formula as a named memorised object (⚠ scope boundary; tree-reversal only unless the human confirms otherwise).
- **Do not** re-teach dénombrement; assume it.
- **One idea per beat** (DESIGN-BIBLE §7 sacred zone); the R3 independence beat is the one to slow down on.

## 5. Build spec — for item-author (writes `items.yaml`)

**Coverage floor (the explicit build target):** **≥3 items per misconception** before its `exhibited_count` is confidence-bearing (VISION; ADR 0011 learner-model floor; agent standard). With **8 misconceptions**, the floor is **≥24 misconception-driven items.** Diminishing-returns ceiling is 6/misconception (ADR 0011) — do not exceed 6. **Target: 3 per misconception (24 items) for v1-to-floor; the harness slice may ship a smaller proof set but must state its per-misconception count in the coverage summary.**

**Per misconception, author ≥3 items that:**
- use the misconception's `distinguishing_mcq_stem` (above) as the **canonical first item**, then **2 structural variants** — same wrong-model trigger, *différent surface* (différent numbers, différent context, différent function/scenario) so nothing is memorisable and the trigger is robust (the M4-style "only non-linear stems expose it" lesson from ADR 0008 `close_to_the_line`: vary the surface enough that the misconception, not pattern-matching, is what's tested).
- have **4 choices**, exactly one correct, with `distractor_misconceptions` mapping the trigger choice's **0-based string index** to the misconception ID (migration 046 convention: `A=0,B=1,C=2,D=3`).
- carry `tags` including `'misconception_driven'` and the skill code; the reversal items (M8) and the conditioning items may also warrant a context tag (e.g. `'sans_remise'`, recovered from the old bank).
- include `explanation.text_fr` + `steps[]` (French), and `wrong_choice_explanations[]` aligned to the choices array (content-guide), each naming the *specific* wrong model for that distractor — that is what turns a wrong answer into a diagnosis.

**Stem-defect discipline (carry verbatim):**
- **Correct-answer contamination is a defect** — if any misconception's wrong model can reach the *correct* choice on a stem, **revise the stem.** Check every item.
- **Cross-misconception co-attribution is NOT a defect** — it requires **dual-tagging** (§1 co-attribution note). Specifically handle M4↔M5 (0 vs 0,9 on independence-overlap stems) and M1↔M8 (the un-reversed conditional). Where a non-target distractor is genuinely reachable by another misconception in the set, **tag it to that misconception too** rather than reshuffling to hide it.

**Diagnostic isolation:** each item's **primary** trigger must distinguish *its* misconception from the other seven (criterion c). The cousins (M3/M4/M5; M1/M8) are the hard cases — use the premise framing shown in their stems (e.g. give independence as a premise to isolate M4/M5 from the verbal-fusion M3; ask only the overlap value to separate M4 from M5 by which distractor is the trigger vs the tagged secondary).

**Difficulty:** R-rung maps roughly to `difficulty_level` — definition/product items 2; independence and total-probability items 3; reversal (M8) items 3–4 (the two-step reversal is the discriminating end, like M4 was on `sma_limit_calc`). Tag the reversal items so the SRS does not surface them before the easier ones.

**Diagnostic-output contract (ADR 0011, non-negotiable):** until a student has seen a tagged item, a misconception is **"unassessed"**, never "no misconception detected." Item-author does not implement this, but authors *enough* coverage (the ≥3 floor) that the diagnosis can leave "unassessed" — that is the whole point of the floor.

**Coverage summary (end of `items.yaml`, required by pipeline step 3):** a table of items-per-misconception so the ≥3 floor is checkable at a glance, plus an explicit list of every dual-tagged distractor and the two (or more) misconceptions it attributes to.

---

## 6. Review checklist (pedagogy-architect, pipeline step 4 — against THIS spec)

Bounce the authored lesson/items back if any of these drift:
- Scope: no full-Bayes-formula creep; no dénombrement re-teaching; tree-reversal only (unless human re-scoped).
- All 8 misconceptions present in the inventory the items target; ≥3 items each (or the harness count stated); co-attributions dual-tagged, not hidden.
- No correct-answer contamination on any stem.
- The coded tree (C1) shows exactly root→2→4 with conditional edge labels and product leaves; no Gemini structural art.
- Hook→reversal arc closed (R0 disease-test resolved at R5).
- Everything student-facing is French, voice-ready, KaTeX-rendered.
- The R3 independence beat is paced (not rushed) — the highest-misconception-density section.

---

## 7. Open items for the human (validation gate)

1. ⚠ **Bayes naming** (§0.2) — does the SM cadre name "théorème de Bayes" / "probabilité a posteriori", or only ask the tree-reversal computation? Decides whether R5 ends by naming the formula.
2. ⚠ **Notation primacy** (§0.1) — is `P_A(B)` or `P(B|A)` the primary form in the SM manuels?
3. ⚠ **Real past-bac items** (R6) — the recovered contexts are reconstructions; genuine year+session national-exam items must be sourced (curriculum-extraction phase).
4. ⚠ **Misconception completeness** — are these the 8 where SM students actually fail, or is one missing / one not real? (The human's teaching expérience is the authority the agent must not fabricate.)
5. ⚠ **M3/M4/M5 split** — is splitting the independent/incompatible muddle into three diagnosable misconceptions the right granularity, or should it be two (conceptual fusion + the operative error)? A didactics+expérience call.
6. **Skill code/UUID** (§0.4) — supabase-architect confirms the SMA-prefixed target before any step-7 migration.

---

### Sources consulted (scope verification)
- [Probabilités — AlloSchool (SM section listing, confirms "Probabilités conditionnelles" as a named SM lesson)](https://www.alloschool.com/section/4723)
- [Mathématiques 2ème BAC Sciences Mathématiques A BIOF — AlloSchool](https://www.alloschool.com/course/mathematiques-2eme-bac-sciences-mathematiques-a-biof)
- [Cours de probabilités 2bac BIOF Sciences Mathématiques — Moutamadris](https://moutamadris.ma/wp-content/uploads/2022/06/cours-Probabilites-2bac-biof-Sciences-Mathematiques-1.pdf)
- Recovered old project (référence only): `backend/seed/content/math_05_probability.sql` (item types/contexts), `mobile/bac_app/lib/widgets/math/probability_tree_widget.dart` (the manipulable-tree behaviour spec).
