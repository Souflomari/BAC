# Figure stage-depth audit — Lane V2 (2026-07-24)

> **Commission.** Lane V2 of `docs/pipeline/mastery-push-plan.md`. Owner
> finding (2026-07-23): staged figures compress too much into ~3–4 stages.
> The standard against which every figure is judged here:
> **ONE idea per stage — no ceiling; as many stages as the concept needs.**
> A stage that narrates two transformations is two stages; a genuinely
> simple concept in 3 stages is CORRECT and left alone.
>
> **Method.** Read-only over content. For each `content/*/media/*.stages.json`
> (non-SVT — SVT is the frozen lane, skipped entirely) I read the stage
> count + captions, inspected the SVG step-group structure for the flagged
> figures, and read the hosting `lesson.md` section to judge concept
> complexity. Findings are a docket, not edits.
>
> **What "under-staged" means here.** A caption narrates 2+ distinct
> transformations ("d'abord X, puis Y"); consecutive stages jump a step a
> struggling student can't reconstruct; a caption is disproportionately
> long because it carries several beats; or the SVG reveals a rich,
> multi-part object all-at-once that would teach better sequentially.

---

## 1. Summary stats

| Metric | Count |
|---|---|
| Figures audited (non-SVT staged figures) | **198 / 198** |
| — maths | 71 |
| — pc | 126 |
| — philo | 1 |
| **Adequate** (one idea per stage; correct as-is) | **168** |
| **Under-staged — minor** (teaching survives; would benefit) | **22** |
| **Under-staged — major** (teaching actually breaks) | **8** |
| Not audited | 0 |

Coverage is complete. SVT (36 staged figures across 8 lessons) was
excluded by the standing frozen-lane decision, not by omission.

Headline: the corpus is **healthy** — 85% of figures already honour
one-idea-per-stage, and several are model fan-outs to copy (`euclide-cascade`
5 stages, `desintegrations-nz` 5, `tour-des-ensembles` 5, `travail-force-signe`
one sign-case per stage). The compression is concentrated in a recurring
few patterns (§4), not spread evenly.

---

## 2. The docket (worst first)

Detailed entries are capped at the 30 flagged figures (all of them fit
under the ~40 cap). Path is the `.stages.json`; "cur→rec" is current vs
recommended stage count. The 168 adequate figures are listed one-line in
§5.

### Major — teaching actually breaks

| # | Figure | cur→rec | The compressed idea(s) that must split |
|---|---|---|---|
| 1 | `content/pc/aspects-energetiques/media/diagrammes-energie-elastique.stages.json` | 3→6 | One "données" stage draws **five curves across two different coordinate systems** (Eₚₑ/E_c vs x, then x/Eₚₑ/E_c vs t) and one "lecture" stage fuses three separate readings (E_m ceiling, the crossing, the T₀-vs-T₀/2 frequency point) — two whole diagrams crammed into one figure's arc. |
| 2 | `content/maths/arithmetique/media/factorisation-360.stages.json` | 3→5 | Stage 1 collapses the **entire six-division peeling cascade** (360→2×180→2×90→2×45→3×15→3×5) into a single reveal, so the student meets the finished tree, never its construction; stage 3 then piles on 252's decomposition + the minimal-power rule + the PGCD conclusion. |
| 3 | `content/maths/arithmetique/media/bezout-remontee.stages.json` | 3→5 | The Bézout back-substitution — the hardest, most error-prone move — has each substitution stage carry three algebraic beats at once (substitute 54×4 → expand into 252×4−198×4 → recombine the −198 terms into −198×5 → read off u,v). |
| 4 | `content/maths/structures-algebriques/media/symetries-rectangle.stages.json` | 3→5 | Stage 2 introduces **all four group elements at once** (id, s_h, s_v, r each with their vertex-swaps in four panels), then stage 3 jumps straight to composing two of them — no beat to absorb each symmetry. |
| 5 | `content/pc/controle-catalyse/media/anhydride-alcool.stages.json` | 3→5 | The "réorganisation" stage narrates a **full reaction mechanism** — the C–O–C bond breaks, the bridge O stays on C1, a new O–C2 bond forms, the H migrates — four bond-level events a mechanism figure should reveal one at a time. |
| 6 | `content/pc/aspects-energetiques/media/plan-incline-travaux.stages.json` | 3→5 | The energy-reading stage computes **three independent work terms in one caption** (W(P) via the Δz=d·sinα projection, W(N)=0, W(f)=−f·d) — each force's work is its own idea, and the projection is itself a hidden geometric step. |
| 7 | `content/pc/aspects-energetiques/media/pendule-pesant-energie.stages.json` | 3→5 | Stage 2 fuses the **geometric derivation of z = L(1−cosθ)** (the crux — z is neither L nor the arc Lθ) with the plotting of both Eₚₚ(θ) and E_c(θ) energy curves. |
| 8 | `content/maths/probabilites-conditionnelles/media/independant-vs-incompatible.stages.json` | 3→5 | Two of the most-conflated ideas in probability (incompatibility as *maximal* dependence; independence via the area rectangle) are each crammed into a single dense stage carrying place-B + the relation + its interpretation. |

### Minor — teaching survives, would benefit

| # | Figure | cur→rec | The compressed idea(s) |
|---|---|---|---|
| 9 | `content/pc/chute-mouvements-plans/media/vitesse-vs-temps-frottement.stages.json` | 3→4 | Final stage bundles the tangent-at-origin/τ construction with the two-regime interpretation (initial a≈g, then permanent v≈v_ℓ). |
| 10 | `content/maths/derivabilite-etude-fonctions/media/etude-fonction-rationnelle.stages.json` | 5→7 | Already deep, but each branch-tracing stage narrates three beats (rise from −∞ → local extremum → plunge along the asymptote). |
| 11 | `content/pc/esterification-hydrolyse/media/catalyse-meme-palier.stages.json` | 3→4 | The data stage draws both flacon curves (fast-catalysed, slow-ambient) at once, when the contrasting timescales are the whole point. |
| 12 | `content/maths/limites-continuite/media/limite-trou.stages.json` | 3→4 | Stage 2 places all six table values (three per side) simultaneously; the left- and right-approach are two gestures. |
| 13 | `content/maths/structures-algebriques/media/table-multiplication-modulo4.stages.json` | 4→5 | Stage 2 fills all 16 cells at once with the worked example (2×3=6≡2) embedded inside the fill. |
| 14 | `content/maths/derivabilite-etude-fonctions/media/tableau-variations-courbe.stages.json` | 3→4 | Stage 3 reveals both extremum tangents plus the f′ sign row plus the variation arrows together. |
| 15 | `content/maths/denombrement/media/urne-deux-couleurs.stages.json` | 3→4 | Stage 2 packs the "ET → ×" rule with both binomial computations (C(5,2)=10 and C(4,1)=4). |
| 16 | `content/pc/chute-mouvements-plans/media/orbites-gravite.stages.json` | 3→4 | Stage 2 does three Kepler-period computations (r₁,r₂,r₃ → T₁,T₂,T₃) in one reveal. |
| 17 | `content/maths/denombrement/media/arrangement-reservoir.stages.json` | 3→4 | Stage 2 fills the podium in three sequential draws (8, then 7, then 6) as a single stage. |
| 18 | `content/pc/transformations-lentes-rapides/media/chocs-efficaces.stages.json` | 5→6 | Stage 3 carries two conditions for an efficient collision (good orientation AND sufficient energy). |
| 19 | `content/maths/limites-continuite/media/cubique-trois-racines.stages.json` | 3→4 | Stage 2 traces the curve and marks both local extrema at once, before the three-root reading. |
| 20 | `content/maths/equations-differentielles/media/refroidissement-modeles.stages.json` | 4→5 | Stage 2 dumps three measured data points at once; stage 4 fuses the model-B curve with two separate rate figures (~5.5 then ~3.3 °C/min). |
| 21 | `content/pc/ondes-mecaniques-periodiques/media/dephasage.stages.json` | 3→4 | Stage 3 reads both cases (concordance for d=λ, opposition for d=λ/2) plus the Δφ formula together. |
| 22 | `content/pc/ondes-mecaniques-periodiques/media/double-periodicite.stages.json` | 3→4 | Stage 3 reads λ (top panel) and T (bottom panel) and the relation λ=c·T in one caption spanning two panels. |
| 23 | `content/pc/ondes-mecaniques-periodiques/media/son-longitudinal-compressions.stages.json` | 3→4 | Stage 2 bundles compression + dilatation formation with the horizontal-displacement / longitudinal-definition idea. |
| 24 | `content/pc/rotation-axe-fixe/media/pendule-pesant-bras-levier.stages.json` | 3→4 | Stage 3 constructs the perpendicular bras de levier ΔH=d·sinθ, states the moment formula, and asserts the restoring sign all at once. |
| 25 | `content/maths/fonction-exponentielle/media/courbe-exponentielle.stages.json` | 3→4 | Stage 1 asserts many exp properties at once; stage 3 folds the exp/ln reciprocity + symmetry-about-y=x mirror in as a second idea. |
| 26 | `content/pc/chute-mouvements-plans/media/deflexion-magnetique.stages.json` | 3→4 | Stage 3 ties the force-perpendicular fact, the radius R it imposes, and the exit relation sinθ=ℓ/R together. |
| 27 | `content/pc/esterification-hydrolyse/media/condensation-ester.stages.json` | 3→4 | Stage 2 ("ce qui part") narrates the three atoms (acid −OH + alcohol H) combining into the departing water molecule — a mechanism beat compressed. |
| 28 | `content/pc/esterification-hydrolyse/media/qr-k-deplacement.stages.json` | 3→4 | Stage 3 bundles two distinct displacement gestures (remove water OR remove ester) plus the "repeatable → near-total conversion" idea. |
| 29 | `content/maths/suites-numeriques/media/convergence-monotone-plancher.stages.json` | 3→4 | Stage 3 reveals the minorant m and the true limit L and the L≥m "the floor is not the limit" distinction together. |
| 30 | `content/maths/equations-differentielles/media/famille-solutions.stages.json` | 3→4 | Stage 2 draws the whole family, states convergence to the plateau, and the never-crossing property in one dense reveal, before isolating one solution. |

---

## 3. Per-subject rollup

| Subject | Figures | Adequate | Under-staged minor | Under-staged major |
|---|---:|---:|---:|---:|
| maths | 71 | 56 | 11 | 4 |
| pc | 126 | 111 | 11 | 4 |
| philo | 1 | 1 | 0 | 0 |
| **Total** | **198** | **168** | **22** | **8** |

Under-staging rate is essentially equal across maths (21%) and pc (12%
flagged); the *major* breaks split evenly (4/4). No subject is
systematically worse — the pattern is per-figure, tied to the figure
*type* (§4), not the discipline.

---

## 4. Patterns seen (feeds the figure-authoring skill wording)

1. **The collapsed "lecture".** The `axes → données → lecture` graph
   recipe crushes the final reading into ONE stage carrying 2–4 distinct
   readings (asymptote + tangent + τ + 63 %; period + amplitude). The
   reading *is* the teaching — each reading is its own stage.
2. **Second curve + its reading in one stage.** Adding a companion curve
   (charge then décharge; two flacons; three satellites) together with
   its interpretation fuses two beats: the new object and what it means.
3. **Complex object revealed whole.** Full factor trees, all four group
   symmetries, a two-panel energy diagram, a reaction mechanism — built
   all-at-once instead of element-by-element. If the SVG has N labelled
   sub-parts that arrive together, ask whether N is really one idea.
4. **Procedures hiding sub-steps.** Back-substitution / algebraic
   manipulation stages hide expand-then-collect sub-lines inside a single
   reveal; sequential fills (podium draws, cell grids) drop the whole
   result at once.
5. **Compare/contrast crammed per case.** Two-scenario figures pack each
   case's full argument (place + relation + interpretation) into one
   stage per case — worst when the two cases are the exact pair students
   conflate (incompatible vs independent, fort vs faible).
6. **"Pitfall" stages.** A single stage carries the naive wrong attempt +
   why it fails + the correct value (negative Euclidean division).
7. **The good model to copy:** one atomic act per stage, no ceiling —
   `euclide-cascade` (one division/stage), `desintegrations-nz` (one
   decay/stage), `travail-force-signe` (one sign-case/stage). Fan-out
   like these.

---

## 5. Adequate figures (one-line; correct as-is, no re-staging)

168 figures judged one-idea-per-stage. Grouped by lesson; `[n]` = stage count.

- **maths/arithmetique**: bidons-3-5 [4], division-euclidienne-droite [4], euclide-cascade [5], solutions-diophantiennes-reseau [3]
- **maths/calcul-integral**: aire-entre-courbes [2], aire-sous-courbe [2], chasles-decoupage-aire [3], comparaison-aires-nichees [3], inegalite-moyenne-rectangles [3], valeur-moyenne-rectangle [3]
- **maths/denombrement**: arbre-denombrement [3], arrangement-combinaison [3], p-liste-cadenas [3], triangle-pascal [3]
- **maths/derivabilite-etude-fonctions**: regle-produit-aire [4], tangente-derivee [3]
- **maths/equations-differentielles**: oscillateur-periode [3], rc-charge-decharge [3]
- **maths/fonction-exponentielle**: exp-au-dessus-de-x-plus-1 [4], exp-reciproque-de-ln [4]
- **maths/fonction-logarithme**: courbe-logarithme [3], croissances-comparees-ln [4], ln-aire-sous-courbe [4]
- **maths/geometrie-espace**: cube-diagonales [3], distance-deux-pythagore [4], distance-point-plan [3], droite-point-direction [3], parallelepipede-volume [3], plan-normal [3], positions-droite-droite [3], produit-vectoriel-aire [3], sphere-plan [3]
- **maths/limites-continuite**: asymptotes [3], continuite-tvi [3], indetermination-trois-courbes [3], trois-discontinuites [4]
- **maths/nombres-complexes-1**: module-argument [3], plan-complexe [3], tour-des-ensembles [5]
- **maths/nombres-complexes-2**: argument-forme-trigo [3], multiplication-par-i [3], nature-triangle-w [3], racines-unite [2], rotation-complexe [4], rotation-homothetie [3], spirale-moivre [4]
- **maths/probabilites-conditionnelles**: arbre-pondere [3], univers-restreint [4]
- **maths/structures-algebriques**: echelle-structures [4], table-groupe [3]
- **maths/suites-numeriques**: convergence-limite [2], reservoir-premiers-termes [3], suite-bornee-non-monotone [3], suite-escalier [2], suites-adjacentes-etau [3], theoreme-gendarmes [3]
- **pc/aspects-energetiques**: conservation-em [2], ec-parabole [3], travail-force-signe [4], travail-ressort-triangle [3], travail-torsion-triangle [3]
- **pc/atome-mecanique-newton**: bilan-forces-orbite [4], niveaux-energie [3], spectre-raies [3], spirale-rayonnement [3]
- **pc/chute-mouvements-plans**: bilan-forces-chute-frottement [3], euler-taille-de-pas [3], kepler3-linearisation [3], orbite-force-centripete [3], orbite-geostationnaire [3], sandbox-chute-frottement [3], satellite-chute-permanente [3], symetrie-montee-descente [3], tableau-euler-pas-a-pas [3], trajectoire-parabolique [3]
- **pc/controle-catalyse**: effet-catalyseur [3], facteurs-cinetiques [3], savon-amphiphile [3], trois-catalyses [3]
- **pc/decroissance-radioactive**: datation-c14 [3], decroissance-courbe [3], desintegrations-nz [5], tangente-tau [3], vallee-stabilite [3]
- **pc/dipole-rl**: bilan-puissance-energie [3], bobine-modele-rl [3], i-etablissement [3], oscillogramme-exercice [3]
- **pc/electrolyse**: cellule-electrolyse [4], electrolyse-eau-cellule [4], seuil-tension-electrolyse [3]
- **pc/esterification-hydrolyse**: rendement-esterification [2], vitesses-equilibre-dynamique [3]
- **pc/etat-equilibre**: critere-evolution-qr-k [3], equilibre-concentrations [3], jauge-avancement-tau [3], quotient-vers-K [3]
- **pc/evolution-spontanee**: critere-qr-k [3], direct-vs-pile [3], transfert-direct-chaleur [3]
- **pc/lois-de-newton**: actions-reciproques-livre-table [4], bilan-forces-caisse-horizontale [4], chute-libre-comparaison [3], deux-chariots-inertie [3], plan-incline-forces [4], vecteur-vitesse-tangente [4]
- **pc/noyaux-masse-energie**: courbe-aston [3], defaut-masse [3], nucleaire-vs-chimique [4]
- **pc/ondes-em-modulation**: antenne-quart-onde [3], bonne-surmodulation [3], circuit-accorde-selection [3], detecteur-crete [3], modulation-amplitude [2]
- **pc/ondes-mecaniques-periodiques**: celerite-vs-frequence [3], cuve-a-ondes-diffraction [3], diffraction-fente-fronts [3], heritage-periode-retard [3], paquet-qui-se-deforme [3]
- **pc/ondes-mecaniques-progressives**: bouchon-oscille-sur-place [3], front-onde-dimensions [3], onde-propagation-retard [2]
- **pc/piles**: courant-vs-electrons [3], pile-daniell [3], qr-vs-k-echelle [3]
- **pc/propagation-onde-lumineuse**: cloche-a-vide-son-lumiere [3], diffraction-fente [4], dispersion-prisme [3], lambda-nu-changement-milieu [3]
- **pc/rc-charge**: exo-oscillogramme [3], saut-ou-montee [3], uc-charge [3], uc-decharge [3]
- **pc/reactions-acido-basiques**: diagramme-distribution-vs-predominance [4], diagramme-predominance [3], distribution-curseur-pH [4], echelle-acide-neutre-basique [3], equivalence-courbe-derivee [4], equivalence-methode-tangentes [4], fort-vs-faible-avancement [3], lecture-Ve-courbe-dosage [4], montage-dosage-phmetrique [3], transfert-proton-ammonium [4], zone-virage-sur-saut [4], zones-predominance-2 [4]
- **pc/rlc-serie**: origin-i [3], origin-uL [3], origin-uc [4], regimes-uc [3], rlc-schema [4]
- **pc/rotation-axe-fixe**: moment-force [4], moment-inertie [3], omega-vitesse-point [3]
- **pc/suivi-temporel-vitesse**: avancement-tangente [3], prediction-avancement [3], tangentes-decroissantes [3], temps-demi-reaction [3]
- **pc/systemes-oscillants**: bilan-pendule-simple [4], energie-oscillateur [3], montage-resonance [3], regimes-amortissement [3], resonance-sandbox [3]
- **pc/transformations-deux-sens**: avancement-limite [3], experiences-miroir [4], sens-direct-inverse [3]
- **pc/transformations-lentes-rapides**: comparaison-facteurs-cinetiques [4], lente-rapide [3]
- **philo/analyse-de-texte**: anatomie-du-texte [4]

---

## 6. Not audited

None. All 198 non-SVT staged figures were reached. SVT's 36 staged
figures are intentionally out of scope (frozen lane).

_Judgment calls worth a second eye on re-staging:_ `etude-fonction-rationnelle`
(#10) is already 5 stages and is a soft flag; `anatomie-du-texte` (philo,
[4]) was left adequate — its final "mouvement" stage carries four
argumentative beats and is the closest adequate-side call, worth
revisiting if philo figures get a pass.
