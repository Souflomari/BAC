# Brief (c) — a new Derivation instance: déduire i(t) dans le RLC idéal

**Task.** In the RLC notion, the step from q(t) to i(t) is currently stated
as a bare result (section « Déduire i(t) » in
`content/pc/rlc-serie/lesson.md`, inside R2). Upgrade it to a stepped,
learner-paced derivation through the Derivation component contract: from
q(t) = Q_max·cos(2πt/T₀ + φ) to i(t), one transformation per step, each step
carrying its "why this move" expert note (the wrong-reflex layer included —
think about where students actually slip when differentiating a composed
cosine).

**Governing docs and contracts (read in this order):**

1. `docs/pipeline/NOTION-TEMPLATE-V2.md` — the display-math discipline box
   (when a derivation must go through the component, and what each step
   must carry).
2. `content/pc/rlc-serie/derivations.yaml` — the existing instance
   (`verification-cosinus`) is the contract in situ: file shape, step
   fields, note register.
3. `web/src/components/notion/Derivation.tsx` — the component's header
   comment states the rendered contract (what is and isn't in the DOM
   before the student advances).
4. `docs/pipeline/EXEMPLARS.md` — register and annotation quality bar.

**Deliverables.**

- A new entry in `content/pc/rlc-serie/derivations.yaml` with id
  `i-de-t`.
- The `[[derivation:i-de-t]]` marker placed in `lesson.md`'s « Déduire
  i(t) » section, with the surrounding prose adjusted so the section reads
  as one continuous voice (the bare displayed result must not survive as a
  duplicate of what the derivation now builds).

**Physics guardrails (cadre):** i = dq/dt; the derivative of the composed
cosine with the 2π/T₀ inner factor; amplitude reading I_max = 2πQ_max/T₀.
Nothing beyond the national program; keep the existing lesson's notation
(T₀ and φ as authored).

**Acceptance boxes:**

- [ ] `cd web && npm run build` passes.
- [ ] On `/notions/pc/rlc-serie`, the derivation renders with step 1 only;
      later steps are NOT in the DOM until advanced (the component
      guarantees this — your job is to author through it, not around it).
- [ ] ≥3 steps, ONE transformation per step, a note on every step.
- [ ] The final result matches what the lesson's later sections rely on
      (check how i(t) is used elsewhere in the lesson before you write).

**Report back:** the steps and notes you authored, how you adjusted the
surrounding prose, and any question the docs should have answered but did
not.
