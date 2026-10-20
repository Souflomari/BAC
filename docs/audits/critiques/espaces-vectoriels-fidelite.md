# BAC-FIDELITY CRITIC — WAVE 1 — `maths-structures-espaces-vectoriels` (R8 spec, unbuilt)

**Spec under review:** `/home/user/BAC/docs/pipeline/propositions/maths-structures-espaces-vectoriels.md` (995 lines; cited below as `spec:N`)
**Binding boundary:** `/home/user/BAC/docs/cadre/curriculum/maths-sm.yaml` — chapitre `espaces_vectoriels` `:289-298`; habiletés `:58-61`; `exclusions_transversales` `:431-432`
**Mirror (filière):** `/home/user/BAC/docs/cadre/curriculum/maths-sexp.yaml:252`, `:342`
**Exam shape:** `/home/user/BAC/docs/cadre/bac-reference.md:93-94`, `:127-128` · `/home/user/BAC/content/maths/structures-algebriques/bank.yaml` · `.../exercises.yaml` · `/home/user/BAC/docs/sujets/maths/structures-algebriques.md`

**VERDICT: BUILD AFTER FIXES.** No `exclusion` breach, no `limite` overshoot — the spec's `§10.4` interdits list (`spec:772-777`) is a faithful, complete transcription of the cadre's three `limites` (`maths-sm.yaml:298`) plus `exclusions_transversales:431`, and it goes *further* than the cadre by pre-excluding four unnamed topics (rank theorem, matrix of a linear map, sum/direct sum, polynomial spaces). On my own priority-1 test (off-syllabus is never acceptable) this spec **passes**, and it is the most cadre-literate spec I have read. The fixes below are exam-shape and evidence-allocation defects, not scope breaches — but four of them are blocking because they would teach a student the wrong thing about what the paper asks.

---

## 0. SCOPE — the boundary test, line by line

### Verified clean (no over-reach)
Checked every content line of `spec:§6` and `spec:§11` against the three `limites` at `maths-sm.yaml:298` and `exclusions_transversales:431-432`:

| boundary line | spec compliance |
|---|---|
| `limite 1` "Espaces vectoriels de **dimension finie**" | **CLEAN.** No infinite dimension, no sequence/function space, no "a basis always exists". Reference spaces restricted to ℝ², ℝ³, M₂(ℝ) (`spec:288-290`). |
| `limite 2` "pas de **réduction d'endomorphismes** (valeurs propres/diagonalisation)" | **CLEAN.** Zero occurrences of valeur propre / vecteur propre / polynôme caractéristique / diagonalisation / trace / déterminant-as-invariant anywhere in 995 lines. |
| `limite 3` "pas de **produit scalaire euclidien abstrait**" | **CLEAN**, and better than clean: `spec:88-90` explicitly forbids building any bridge to `geometrie-espace`'s produit scalaire. |
| `exclusions_transversales:431` "les espaces vectoriels s'arrêtent aux **bases/dimension/applications linéaires**" | **CLEAN.** Bloc E stops exactly at noyau/image. No rank theorem (`spec:960` defaults EXCLUDED), no matrix of a linear map, no sum/direct sum (`spec:963`). |
| `programme:293` / `savoir_faire:295-296` | All five blocs map onto printed lines. Bloc E is **not** over-reach: `:293` names "applications linéaires" and `:296` names "reconnaître une application linéaire (noyau, image)". |

**Filière: CORRECT.** `maths-sexp.yaml:342` ("Structures algébriques (… espaces vectoriels) : **SPÉCIFIQUE SM**. Absent du cadre SExp.") and `:252` ("pas de géométrie vectorielle abstraite (espaces vectoriels — spécifique SM)") both hold; the host notion carries `filieres: ["sm-a","sm-b"]` at `/home/user/BAC/web/src/lib/curriculum.ts:132` inside the SM-only "Approfondissement" unit. Nothing in this spec changes that. (Pre-existing caveat, out of this spec's scope: `curriculum.ts:34-40` says `filieres` is a *narrowing* signal, not a gate — a direct URL still renders for a SExp device. Not a finding against the spec.)

### Over-reach findings (unprinted content, ranked)

**S1 — `Vect` is an object and a notation the cadre does not print and no verified subject has ever printed.** (MEDIUM-HIGH)
`maths-sm.yaml:293` prints "combinaison linéaire ; famille génératrice, famille libre, base ; dimension" — it does **not** name the sous-espace engendré, and the French form "sous-espace engendré" appears nowhere in the spec. I grepped every `bank.yaml`/`exercises.yaml`/`items.yaml`/`checkpoints.yaml` in the repo for `Vect`: **zero occurrences** (all hits on `engendr` are "volume engendré" in calcul-integral/fonction-logarithme and Sartre's "engendre" in philo). Yet `Vect` is introduced mid-sentence at `spec:359` and then carries [C12] (`:426`), [C13] (`:443`), [C16] (`:472`), a **student-visible checkpoint stem** (`:582`) and four item keys (SA-50, SA-51, SA-52 at `:838`, `:844`, `:845`). The pedagogy critic reached the same beat from the vocabulary-ordering side (its B3); my angle is different and additive: this is an *unattested notation import*. It is defensible as a corollary of "famille génératrice", but it must be introduced under the name the cadre's register supports ("l'ensemble des combinaisons linéaires de la famille — le **sous-espace engendré**, noté Vect(…)"), not as a symbol that arrives already in use.

**S2 — Q7's admitted dimension shortcut is arbitrated the opposite way from Q3/Q4/Q6 on identical evidence.** (MEDIUM)
`spec:455-457` admits "*dans un espace de dimension n, une famille libre de n vecteurs est une base ; une famille génératrice de n vecteurs aussi*", and `spec:964` (Q7) defaults **INCLUDE**. But Q3 (théorème du rang, `:960`), Q4 (polynomial spaces, `:961`) and Q6 (somme/somme directe, `:963`) all default **EXCLUDE** with the *same* stated reason — "le cadre ne le nomme pas". The dimension-n shortcut is equally unnamed at `:293`. Either standard is arguable; applying both in one document is not. The cost is concrete: SA-42 D (`spec:820`) builds a diagnostic distractor on the *misreading* of this admitted shortcut ("libre : trois vecteurs et dim ℝ³ = 3, cela suffit"), so the chapter teaches an unprinted theorem and then penalises its converse.

**S3 — [C17] asserts "base ⟺ bijection" before the equivalence it rests on is proved, and the proof it gets is for the wrong category.** (LOW-MEDIUM)
`spec:485-486` states that "« (A,B) est une base de E » et « φ est une bijection de ℝ² sur E » sont la même phrase". That rests on *injective ⟺ ker = {0_E}* for linear maps — which `:296` does not name (it names only "reconnaître une application linéaire (noyau, image)"), and which the spec proves only at [C18] (`:497-498`) **for group morphisms**, i.e. one beat later and in another category. "Isomorphisme d'espaces vectoriels" is unprinted by the cadre. Fix is cheap: either prove the linear-map equivalence inside [C16] or restate [C17] as the two direct readings it actually computes (ker trivial = libre, Im = E = génératrice) without the bijection claim.

### Omissions against printed cadre lines

**S4 — "combinaison linéaire" is a printed `programme` item (`maths-sm.yaml:293`) that the spec never defines.** (MEDIUM) I concur with the pedagogy critic's B3 and add the boundary framing: this is not only a pedagogical gap, it is an **uncovered cadre line**. Bloc C's own heading promises it (`spec:368`) and the body defines only génératrice (`:370-372`) and libre (`:374-375`). Since `spec:769-770` forbids the content-author from re-deriving anything, an undelivered cadre line stays undelivered.

**S5 — "Étudier la liberté/**génération** d'une famille" (`:296`) has zero items.** (MEDIUM-HIGH, see also §2/F4) Génération is delivered by assertion only ("c'est **la définition même** de E … sans un calcul de plus", `spec:370-372`); none of the 18 items turns on a family that fails to generate. The savoir-faire line pairs the two halves with equal weight; the delivery is 3 items on liberté (SA-42/43/44) and 0 on génération. Pedagogy critic's I4 found the prose asymmetry; the item-level zero is the fidelity consequence — the savoir-faire is **unmeasurable** in our corpus as specified.

**S6 — "**Reconnaître** une application linéaire" (`:296`) has zero items.** (LOW) [C15] (`spec:464-469`) is the only delivery; SA-51/SA-52 ask ker/Im, SA-53 is a group morphism. No item asks "cette application est-elle linéaire ?" — the exact printed verb.

---

## 1. EXAM SHAPE — what the verified subjects actually ask

Complete scan of every vector-space question in the notion's verified corpus. **Four attestations, two question shapes, both "Montrer que".**

| source | printed wording (verbatim) | barème |
|---|---|---|
| `bank.yaml:1461` (bk-2023-n-x5 intro, sourcing **vérifié**) | "On rappelle que $(M_2(\mathbb{R}), +, \times)$ est un anneau non commutatif … et que **$(M_2(\mathbb{R}), +, \cdot)$ est un espace vectoriel réel.**" | recall, 0 pt |
| `bank.yaml:1468` | part title: "Partie I — $E$ : sous-groupe additif et **sous-espace vectoriel**" | — |
| **`bank.yaml:1488`** | "**(0,25 pt) Montrer que $E$ est un sous-espace vectoriel de $(M_2(\mathbb{R}), +, \cdot)$.**" with $E=\{M(x,y)=\binom{x+y\ \ y}{2y\ \ x-y}\}$; q1 (0,5 pt, `:1470`) asks the **sous-groupe** of $(M_2(\mathbb{R}),+)$ first | 0,25 / **3,5** (exercise total re-summed: 2×0,5 + 10×0,25 = 3,5 ✓) |
| `bank.yaml:2063` (bk-2025-n-x4 intro) | "… et que **$(M_3(\mathbb{R}),+,\cdot)$ est un espace vectoriel réel**" — recall only, no linear-algebra question in the exercise | recall |
| `docs/sujets/maths/structures-algebriques.md:256` (2018 N Ex1, **vérifié contre source retypée**) | "(0,25) **Montrer que $E$ est un sous-espace vectoriel de l'espace vectoriel $(M_2(\mathbb{R}),+,\cdot)$**" | 0,25 / 3,5 |
| **`docs/sujets/…:257`** | "(0,5) On pose $J = M(0,1)$. **Montrer que $(I,J)$ est une base de l'espace vectoriel réel $(E,+,\cdot)$**" | 0,5 / 3,5 |

Never printed, in any verified maths subject in this repo: **"dimension", "famille libre", "famille génératrice", "combinaison linéaire", "application linéaire", "noyau", "image", "Vect"**. The spec says this itself at `:144-156` and I confirm the direction of the claim.

### F1 — BLOCKING. The criterion the spec teaches is not the criterion the attested chain rewards, and the repo's own verified entry prints the other one.
`spec:303-305` teaches the two-condition criterion: *(1) $F \neq \varnothing$ / $0_E \in F$ ; (2) $\lambda u + \mu v \in F$.* The verified bank entry for the attested question prints the **three-condition** form, twice, in its step notes:
- `bank.yaml:1495` — "Deux des **trois** conditions d'un sous-espace vectoriel, déjà établies."
- `bank.yaml:1501` — "Non vide, stable pour $+$ et pour $\cdot$ : les **trois** conditions sont réunies."

Three consequences, all bad:
1. **The chapter will contradict the annale it points at.** `spec:507-512` closes by sending the student to `bk-2023-n-x5` Partie I q1-q2, and `spec:929-938` orders the rewrite of `bank.yaml:1448-1449` and `:1490` — but **not** of the step notes at `:1495`/`:1501`. After delivery, the lesson's criterion and the bank's criterion for the same question are different.
2. **The spec's own exam-shape thesis needs the three-condition form.** `spec:510` ("il demande le sous-groupe, puis le sous-espace — et **il ne reste alors que la loi externe à traiter**") and the most exam-faithful item in the lot, SA-41 (`spec:814`, "la question précédente a établi que $E'$ est un sous-groupe … Que reste-t-il à démontrer ?", key = "une seule chose : la stabilité pour la loi externe") are only coherent under the three-condition criterion. Under the criterion actually taught, the answer to SA-41 is *not* "only the external law" — $\lambda u + \mu v \in F$ has to be written out, subsuming $+$. The item's key contradicts the lesson's definition.
3. **It is the form the Moroccan corrigé convention does not use.** The two-condition $\lambda u + \mu v$ form is the French-prépa economy; every attestation we hold reaches the result through non-vide / stable pour $+$ / stable pour $\cdot$.

*Fix:* teach the three-condition form as the one that earns the 0,25 pt (it is also what makes the q1→q2 cascade free), and give $\lambda u + \mu v$ as the one-line compaction afterwards. This also repairs the pedagogy critic's I5 ("moins une condition" is false) at the root rather than in the wording: under the three-condition form the subgroup criterion *genuinely* loses condition 3 and keeps condition 2 unchanged, which is exactly the claim `spec:204` and `:307-311` want to make and cannot make as written.

### F2 — BLOCKING. The spec prescribes a student-visible exam-weight claim that its own §10.4 and §13.5 forbid.
`spec:135-138`: "**Le barème est petit, la place est fixe.** 0,25 pt … et 0,5 pt … sur les 3,5 pts : **7,1 % en 2023, 21,4 % en 2018**. C'est peu — et c'est **du point gratuit en début d'exercice, ce qui est exactement l'argument à donner à l'élève.**"
Against `spec:777` (§10.4 interdits): "**toute affirmation de fréquence ou de poids d'examen**" and `spec:916-917` (§13.5). The percentages are arithmetically correct (0,25/3,5 = 7,14 % ; 0,75/3,5 = 21,43 % ; both exercise totals re-summed to 3,5 ✓ — `docs/sujets/…:240` and my own sum of `bank.yaml` barèmes 1470→1657). That is not the problem. The problem is that "l'argument à donner à l'élève" routes a **weight judgement** into student-visible prose, and "point gratuit" is false as stated: in 2023 q2 is cheap *because q1 was done*, and in 2018 the pair is 21 % of the exercise with a genuine base computation. Delete the percentages and the "point gratuit" framing from the author's brief; keep the structural fact (the question opens the exercise and its answer rides on the previous one), which is teachable without a weight claim.

### F3 — BLOCKING (concur with pedagogy critic B1/I13, with a cadre citation it did not use). The printed verb is **Démontrer**; the delivery is 18/18 recognition items and no summit.
`maths-sm.yaml:295` reads "**Démontrer** qu'un ensemble est un sous-espace vectoriel ; **déterminer** une base et la dimension". 100 % of attested exam questions are "**Montrer que** …" redactions (`bank.yaml:1488`, `docs/sujets:256`, `:257`). `spec:877-884` adds no `exercises.yaml` entry, and all 18 items are MCQ. I fully support the fix shape: an `r8-bac` on `bk-2023-n-x5` q1-q2. **One constraint the pedagogy critic did not flag, and it is my lane: as written, the spec pre-solves that summit.** `spec:509-512` narrates the answer shape of q1-q2 in the clôture, and SA-41 (`spec:814`) *is* q2's reasoning turned into a multiple-choice question. If `r8-bac` = `bk-2023-n-x5` q1-q2, then `spec:510`'s sentence must be removed or moved into the exercise intro, and SA-41 must be re-cut. (`bank.yaml:52-58` confirms the house precedent is fine: it records that `bk-2023-n-x5` "ne recoupe aucun autre sommet", and `r-bac`/`bk-2019-n-x1` are already the same sujet in both files.)

### F4 — IMPORTANT. The item mix is inverted relative to attestation: dimension-heavy, base-light, génération-zero.
Attested: **base** (0,5 pt, 2018 q2b) and **sous-espace** (0,25 pt, ×2). Never printed: **dimension**.
Delivered (`spec:798-846`): six items ask "quelle est la dimension ?" (SA-45, SA-46, SA-48, SA-49, SA-50, and SA-47's first half), and the two ids carrying the largest floors are M4 (8 items) and M5 (8 items) — both dimension ids. Exactly **one** item (SA-47) asks for a base, and none asks it in the attested "**Montrer que** $(A,B)$ est une base de l'espace vectoriel réel $(E,+,\cdot)$" shape. Génération: zero (S5).
I am not asking for dimension to be cut — the cadre names it (`:293`, `:295`) and M5 is a real misconception. I am asking that the **weight follow the attestation**: at least one item (better: the `r8-variation`) must ask for a base as a produced, redacted object, and at least one must turn on génération.

### F5 — IMPORTANT. The attested *configuration* is never worked once.
In both attestations the exam's $E$ **contains $I$**, and the base is literally $(I, J)$ with $J = M(0,1)$ (`docs/sujets:257`; `bank.yaml:1531` "I = M(1,0) ∈ E"). The spec's central object [C6] is deliberately chosen so that $I \notin E$ (`spec:410-413`), is explicitly not stable for $\times$ (`spec:918-919`), and the author is instructed to tell the student "**La base d'un $E$ n'est pas « $(I,J)$ » par nature**". That anti-pattern is legitimate and I would keep it — but as a result the chapter never once walks the configuration the paper always gives, and `spec:507-512`'s claim that the exam chain is sous-groupe → sous-espace → base → stable pour × → anneau → corps is **asserted in three sentences and demonstrated on no object**. SA-41's $E'$ does contain $I$, which softens this, but SA-41 is an MCQ about what remains to prove. Taking F3's `r8-bac` fixes this at the same stroke; failing that, [C10] needs a second, exam-shaped object.

### F6 — IMPORTANT (missed by the pedagogy critic). Number reuse against the **summit** and two more lesson objects.
`spec:248-257` sets the rule and the forbidden list, including "2019 : $\binom{x\ \ y}{0\ \ x}$". Violations:
- **SA-50 (`spec:838`) uses two elements of the summit's own set.** The summit `r-bac` (2019 N) object is $F = \{M(x,y) = \binom{x\ \ y}{0\ \ x} \mid x\in\mathbb{R}_+^*, y\in\mathbb{R}\}$ (`/home/user/BAC/content/maths/structures-algebriques/exercises.yaml:165`, twinned at `bank.yaml:439`). SA-50's $A = \binom{1\ \ 1}{0\ \ 1} = M(1,1)$ and $B = \binom{2\ \ 2}{0\ \ 2} = M(2,2)$ are **both members of it** ($1, 2 \in \mathbb{R}_+^*$). This is a direct breach of the project rule "never reuse a bank/summit number in teaching content" *and* of `spec:251`'s own forbidden list.
- **SA-44 (`spec:822`) reuses two of [C8]'s three vectors.** [C8] (`spec:377`) is $v_1=(1,0,1), v_2=(1,1,0), v_3=(0,1,1)$ and concludes **libre**; SA-44 is $(1,1,0), (0,1,1), (1,0,-1)$ — i.e. $v_2, v_3$ verbatim — and the key is **liée**. The pedagogy critic caught SA-45's reuse of $v_1, v_2$ (its I7) but not this one. Two of the three M3 items therefore pattern-match against the lesson's own free family with the opposite key; a student who memorised [C8] is actively mis-cued, and the item will log M4/M3 for a defect the lesson created.
- SA-44's third vector $(1,0,-1)$ and SA-45's third generator $(0,1,-1)$ are **[C14]'s two basis vectors** (`spec:450`).
- Letter collisions: SA-50 names its set **$E$** — the name of [C6]'s object *and* of the bank's exam object — and its generators **$A$, $B$**, the names of [C10]'s basis.

### F7 — IMPORTANT. Two "always/never" exam generalisations taught as fact on n=8.
`spec:124-129` ("**Le candidat ne démontre jamais** qu'un ensemble est un espace vectoriel … les huit axiomes se lisent une fois, **ne se vérifient jamais**") and `spec:288-290` ("**L'énoncé les donne toujours ; on ne les démontre jamais.** Le dire explicitement à l'élève est un gain de temps d'examen"). The evidence is 3 of 8 transcriptions. The cadre's own house discipline for exactly this situation is explicit and binding by example: `maths-sm.yaml:364` keeps corpus patterns in a `_observation_examens` block labelled "**NI programme NI limite — motif OBSERVÉ, sans valeur de frontière**", and `:375` bounds a one-shot observation with "à traiter comme une piste, **pas comme un principe établi**". Teaching a student "the énoncé always gives you the ambient space" is a frontier claim dressed as a study tip, and it is the kind of claim a single unseen sujet falsifies. Voice it as an observation ("dans tous les sujets que nous avons lus…"), not a rule.

---

## 2. COGNITIVE MIX vs the habileté ratios

**Target:** `maths-sm.yaml:58-61` = application_directe **40** / application_non_explicite **40** / synthèse **20** (corroborated at `bac-reference.md:93-94`, "40% / 40% / 20% (research-consensus)", explicitly harder than SExp's 50/35/15).
**Spec:** 7 / 7 / 4 on 18 = **38,9 / 38,9 / 22,2** (`spec:786-789`). **Numerically compliant.** Label vocabulary also matches the house file (`items.yaml` uses `synthese`, `application_directe`, `application_non_explicite` at `:1592`, `:1730`, `:1803` etc.), so `spec:789`'s `synthese` is right even though the cadre key is `synthese_situations_inhabituelles`. No action on the numbers.

**F8 — IMPORTANT. The ratio is a relabelling of the difficulty axis, so it measures nothing.** Across all 18 items the mapping is **lockstep**: every `directe` item is difficulty 2, every `non_explicite` is 3, every `synthese` is 4 (verify on `spec:804-846`: SA-36 directe/2, SA-37 non_expl/3, SA-38 synth/4, SA-39 directe/2 … SA-53 synth/4 — 18/18, no exception). Habileté and difficulty are then one field written twice, and the 38,9/38,9/22,2 figure is a consequence of the difficulty spread, not an independent measurement of cognitive demand. ADR 0033's third failure mode applies: the ratio answers a narrower question than its header reads. At minimum, one `application_directe` item at difficulty 3 and one `synthese` at difficulty 3 would prove the two axes are separable.

**F9 — Note for the owner. The 40/40/20 is a *paper-level* ratio, and this rung is the paper's warm-up.** `bac-reference.md:127-128` places the niveau-3 demand in the paper's "**terminal synthesis question**". The attested vector-space questions are the *opening* 0,25 / 0,5-pt questions of a 3,5-pt exercise. Allocating 4 synthèse items (22,2 %) to that rung is defensible as pedagogy but is not what the exam does there — and of the four, SA-53 tests a **group** morphism (`:285`'s savoir-faire, not `:296`'s) and SA-41 is answerable by recalling one sentence of `spec:510` (pedagogy critic I7). Effectively ~2 of 18 items are genuine synthèse on this chapter's own savoir-faire. This belongs next to the spec's own `m6`-class question about R8 carrying 18 of 53 items.

**Format, against `bac-reference.md:121-128`:** maths = several exercises with a terminal synthesis question; this domain appears as a single 3,5-pt structured exercise of 9-12 cascading sub-questions, each "Montrer que / En déduire que / Vérifier que", with the vector-space pair at positions 1-2. The spec's ramp **ends on prose** (bloc E theory, `spec:489-512`) and ships **zero** artefacts in that format. See F3.

---

## 3. THE EVIDENCE IS NOT UNIFORM — the refinement Q1 needs (IMPORTANT, and it changes the owner's decision)

`spec:13-19` and Q1 (`spec:958`) treat the foundation risk as one yes/no: the cadre line is `source: research-consensus` on a scanned PDF, the cadre itself lists "*Inclusion des espaces vectoriels au cadre SM … à confirmer contre le cadre scanné*" among its weakest derived claims (`maths-sm.yaml:718`), and two verified subjects rescue it. **That rescue is partial, and the spec does not say which parts it covers.**

| chapter part | what backs it |
|---|---|
| ambient-space recall; **sous-espace by the criterion** (bloc B) | **Exam attestation**, twice, verbatim, barème in hand (`bank.yaml:1488`; `docs/sujets:256`) |
| **base** (half of bloc D) | **Exam attestation once** (`docs/sujets:257`) — but on the *retyped* 2018 source whose conversion is "soumise à arbitrage owner" (`docs/sujets:240`) |
| **famille libre / génératrice** (bloc C), **dimension** (other half of bloc D), **applications linéaires / noyau / image** (bloc E) | **Nothing but the unverified cadre line.** `programme:293` is `research-consensus` on a scan; `savoir_faire:295-296` are tagged `source: derived`. Zero attestation. |

**12 of the 18 items (M3 3, M4 3, M5 3, M6 3) and two and a half of the five blocs sit on the non-attested half.** That is the opposite allocation to the evidence. I still answer Q1 **yes, build** — the attested half alone justifies the chapter, and the cadre binds even where `derived`. But the owner should be told that the *rung's weight* is concentrated where the boundary is weakest, and the honest hedge is to make bloc B + base carry the summit and the heaviest item load, with bloc C/E taught thoroughly and tested lightly until the Gemini re-read of the scanned cadre (porte 1, `maths-sm.yaml:713`) returns.

---

## 4. NOTATION AND WORDING

**Matches what the subjects print** ✓ — and this is done well:
- `$(M_2(\mathbb{R}),+,\cdot)$` with `\cdot` for the external law, `\times` for the ring product: exactly the printed convention (`bank.yaml:1461` carries both in one sentence; `docs/sujets:251` likewise). The spec's `$(E,+,\cdot)$` (`spec:283`, `:303`) is right.
- "**espace vectoriel réel**" — printed verbatim in both attestations ✓.
- "**sous-espace vectoriel de**" ✓. "**base**" ✓ (`docs/sujets:257`). Basis written as an ordered pair of named matrices, $(I,J)$ / $(A,B)$ ✓.
- "famille libre" / "famille génératrice" / "combinaison linéaire": never printed by a subject, but printed by the cadre (`:293`) — cadre binds, so these are correct.

**Divergences (LOW-MEDIUM, all cheap):**
- **F10 — `$F$` carries three meanings in one chapter, and clashes with the host lesson's convention.** `spec:303` uses $F \subset E$ for the generic subspace; [C1] and `cp-r8-pari-scalaire` (`spec:270`, `:540`) use $F$ for chapter 5's concrete $\mathbb{Z}^2$ matrix set; SA-47 (`spec:830`) uses $F$ for the trace-zero matrices; [C15] (`spec:461`) uses $F$ as a codomain. **The host lesson uses $H$ for the generic subset** throughout its sub-group criterion (`lesson.md:296`, `:311-315`) and $F$ for concrete sets (`:323`, `:665`). Since `spec:307-311` explicitly presents the subspace criterion *as* chapter 5's criterion, it must use chapter 5's letters: $H$ generic, $F$ concrete. Same remark for $E$ (generic ambient space at `spec:283`, [C6]'s concrete object, and SA-50's set) and for $A, B$ (basis names in [C10], reused as unrelated matrices in SA-50).
- **F11 — the subjects print $M(x,y)$ with $(x,y) \in \mathbb{R}^2$; the spec prints $M(a,b)$ everywhere.** (`bank.yaml:1463`, `docs/sujets:253` vs `spec:270`, `:339`.) The spec's choice is defensible (it frees $(x,y)$ for ℝ² coordinates) — but the chapter should print the $M(x,y)$ form at least once, in the exam-shaped beat, since 100 % of attestations use it.
- **F12 — M₃(ℝ) is attested as an ambient space (`bank.yaml:2063`, bk-2025-n-x4) and is excluded from the chapter's three reference spaces (`spec:288-290`).** A student who meets the 2025 subject meets a 3×3 ambient space the chapter never showed. One sentence ("le même rappel existe en 3×3") costs nothing and does not require computing dim M₃ = 9.
- Minor precision, concurring with the pedagogy critic's m4: SA-46 D (`spec:829`) says "les deux premières colonnes sont égales" of a 2×2 matrix whose columns are $\binom{a+b}{c}$ and $\binom{a+b}{0}$ — the claim is about the first **row**, and "les deux premières" of two is odd phrasing.
- Minor, concurring with m1: the three checkpoints (`spec:536`, `:556`, `:577`) name no `habilete` value, and the house checkpoint vocabulary (`checkpoints.yaml:68,146,216,289,362,439`: `raisonnement` / `utilisation`) differs from the item vocabulary.

---

## 5. NUMBERS — recomputed independently

**I recomputed all 18 worked examples [C1]–[C18], the three checkpoint keys and premises, and all 18 item keys plus every distractor premise the spec asserts. Zero arithmetic errors.** This matches the pedagogy critic's audit, reached independently. Spot-checks worth recording because they are load-bearing: [C1]'s $\tfrac12 M(1,0) \notin F$ against the real chapter 5 ($F$ over $\mathbb{Z}^2$ at `lesson.md:323`, with $O = M(0,0)$ at `:327` — the anchor is real); [C6]'s regroup $A\pm B$ and its reverse check; [C7]'s decomposition; [C8]'s system **and** its independent generation control ($\alpha = \tfrac{x-y+z}{2}$ etc., and the $(1,0,0)$ spot-check); [C10] including $I \notin E$ via $a+b = 2 \neq 0$; [C12]'s $w = u+v$; [C13]'s $(a+b)I + cK$; [C16]'s antecedent $f(s+t,t,0) = (s,t)$; [C17]'s $\ker\varphi = \{(0,0)\}$ from coefficients (1,1) and (2,2); [C18]'s $\ker(x \mapsto x^2) = \{1,-1\}$ and $\mathrm{Im} = \mathbb{R}^*_+$; `cp-r8-pari-scalaire`'s author-note $M(a,b)M(c,d) = M(ac-bd, ad+bc)$ (correct for $M(x,y) = \binom{x\ \ -y}{y\ \ \ x}$, integer entries); SA-39's $\tfrac12\binom{1\ 0}{1\ 0}$; SA-43's $A_3 = A_1 + 2A_2$; SA-47's dim 3 basis; SA-51's $\ker = \mathrm{Vect}((2,1))$, $\mathrm{Im} = \mathrm{Vect}((1,2))$; SA-53's unit circle. Exam figures also check out: 0,25/3,5 = 7,14 % and 0,75/3,5 = 21,43 %, with both exercise totals independently re-summed to 3,5.

**Number collisions: three, all reported above as F6** (SA-50 ⊂ summit's set; SA-44 ⊃ [C8]'s $v_2,v_3$; SA-44/SA-45 ⊃ [C14]'s basis vectors). The pedagogy critic found SA-45 and SA-48/SA-37/SA-41; SA-50 and SA-44 are new.

---

## 6. WHAT WOULD MISLEAD A STUDENT ABOUT THE EXAM

Ranked: **F1** (a criterion that makes the attested q1→q2 cascade unusable, and contradicts the annale the chapter cites) · **F2** ("point gratuit", 7,1 %) · **F7** ("l'énoncé donne toujours / on ne démontre jamais") · **F5** (the chain asserted, never walked; and "$(I,J)$ n'est pas une base par nature" taught without ever showing the configuration where it *is*) · **F4** (a student drilled on "quelle est la dimension ?" six times meets a paper that has never asked it, and has written one base proof) · **F3** (told in bold at `spec:363-364` that the points come from "**le critère rédigé**", then never asked to redact anything).

---

## VERDICT: BUILD AFTER FIXES

The cadre boundary is respected. The blockers are exam-shape, not scope.

### Minimal fixes, ranked

1. **F1 — Re-base the criterion on the three-condition form** (non-vide / stable pour $+$ / stable pour $\cdot$), with $\lambda u + \mu v$ as the afterwards compaction. Update `spec:303-311`, `:510`, SA-41's key, and add `bank.yaml:1495` + `:1501` to the §14 edit list. *This single fix also resolves the pedagogy critic's I5 at the root.* → **pedagogy-architect**
2. **F2 — Strike the weight claim.** Remove "7,1 % / 21,4 % / c'est peu / du point gratuit … l'argument à donner à l'élève" from `spec:135-138`; keep the structural fact only. → **pedagogy-architect**
3. **F3 + F5 — Add the `r8-bac` on `bk-2023-n-x5` q1-q2** (pedagogy critic's B1 fix, which I endorse), **and in the same move delete `spec:510`'s answer-shape sentence and re-cut SA-41** so the spec stops pre-solving it. Add an `r8-variation` on a fresh two-parameter $E$ **that contains $I$** and ends on "Montrer que $(I,J)$ est une base" — the attested shape, which also repairs F5. → **pedagogy-architect**
4. **F7 — Demote the two "toujours/jamais" claims to observations** (`spec:124-129`, `:288-290`), per `maths-sm.yaml:364`/`:375`. → **pedagogy-architect**
5. **S1 — Name `Vect` in French before using it**: "le **sous-espace engendré** par la famille, noté $\mathrm{Vect}(\dots)$", defined where combinaison linéaire is defined (which is the pedagogy critic's B3 beat — one fix serves both). → **pedagogy-architect**
6. **F6 — Replace SA-50's $A,B$** (they are elements of the summit's set, `exercises.yaml:165`) and **SA-44's vectors** (two of [C8]'s three), and rename SA-50's set away from $E$. → **item-author**
7. **F4 + S5 — Re-weight toward attestation**: one item asking for a **base** as a produced object, one turning on a family that **fails to generate**; consider trading one of the six dimension items for them. → **item-author**
8. **S2 — Make Q7 consistent with Q3/Q4/Q6**, either way, and say which standard is being used. → **owner** (`spec:964`)
9. **F8 — Break the habileté↔difficulty lockstep** on at least two items so the 38,9/38,9/22,2 figure measures something. → **item-author**
10. **F10/F11/F12 — Notation pass**: $H$ for the generic subspace (per `lesson.md:296`, `:311-315`), one beat in the printed $M(x,y)$ form, one sentence acknowledging the M₃(ℝ) recall; fix SA-46 D's row/column. → **content-author / item-author**
11. **§3 (evidence is not uniform) — rewrite Q1 as two questions**: build the attested half now (yes), and flag that bloc C / dimension / bloc E rest on `derived` savoir-faire on a scanned source pending porte 1 (`maths-sm.yaml:713`), so their item load is the part to revisit. → **owner**
12. **S3, S4, S6** — prove (or drop) the linear-map injectivity equivalence at [C17]; define *combinaison linéaire*; add one "cette application est-elle linéaire ?" item. → **pedagogy-architect / item-author**

**Agreement/disagreement with the pedagogy critic** (`/home/user/BAC/docs/audits/critiques/espaces-vectoriels-pedagogie.md`): I concur with B1, B2, B3, I4, I5, I7, I13, m1, m4, m6 and reached B3/I4/I5/I7 independently from the boundary side. I add F1 (the criterion is an *exam-shape* defect, not just a wording defect — this is the one I would not ship without), F2, F6's two missed collisions, F7, F8, S1, S2, S3, F10-F12, and the non-uniform-evidence reframing of Q1. I disagree with nothing in it.

**Read-only: nothing was edited.** Key paths: `/home/user/BAC/docs/pipeline/propositions/maths-structures-espaces-vectoriels.md` · `/home/user/BAC/docs/cadre/curriculum/maths-sm.yaml` · `/home/user/BAC/docs/cadre/curriculum/maths-sexp.yaml` · `/home/user/BAC/docs/cadre/bac-reference.md` · `/home/user/BAC/content/maths/structures-algebriques/{bank.yaml,exercises.yaml,items.yaml,checkpoints.yaml,lesson.md}` · `/home/user/BAC/docs/sujets/maths/structures-algebriques.md` · `/home/user/BAC/web/src/lib/curriculum.ts`
