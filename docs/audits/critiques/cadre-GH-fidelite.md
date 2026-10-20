# WAVE 1 — bac-fidelity review of the « dette de cadre » waves G3–G7 + H1

**Headline: no `exclusion` breach and no `limite` overshoot in any of the six waves.** Every new passage and all 43 new items map onto a printed `savoir_faire` of the right filière. I recomputed every number in the new prose and every option of all 43 items: **zero arithmetic errors**. What needs fixing is marking, notation, and three validation notes that are factually wrong about the prose they document — one of which will cause an off-syllabus leak the next time an author reads it.

Boundary files judged against: `/home/user/BAC/docs/cadre/curriculum/maths-sm.yaml`, `maths-sexp.yaml`, `pc-physique-chimie.yaml`; owner defaults `/home/user/BAC/docs/audits/DECISIONS-EN-ATTENTE.md` §37; register `/home/user/BAC/docs/audits/DETTE-CADRE.md`. (No Bash in this run — I read files and banks directly rather than diffs; one consequence is flagged in F15.)

---

## 1. Scope — ranked

**F1 · HIGH — two validation notes assert a filière convention that their own prose contradicts, and that contradicts §37.**
`/home/user/BAC/content/maths/fonction-exponentielle/lesson.md:636-639` states: « Même convention de filière que la leçon sœur … **aucun marqueur inline dans le texte élève** — le scope filière se déclare seulement dans cette note, **jamais dans la prose lue par l'élève**. »
But **line 369 of the same file** carries exactly such a marker: « Cette section et les deux suivantes sont au programme de la filière Sciences Mathématiques ; en Sciences Expérimentales, tu peux passer directement au chapitre suivant. » And `calcul-integral/lesson.md:365` (same commit) carries one too. The note also claims « après la même vérification d'absence de précédent » — the precedent is in the same commit.
The twin note, `/home/user/BAC/content/maths/fonction-logarithme/lesson.md:590-597`, repeats the claim and widens it: « aucun marqueur inline n'apparaît dans le texte élève de cette leçon **ni de ses homologues** » — falsified twice over.
Both notes are wrong against the owner's own default: `DECISIONS-EN-ATTENTE.md:2177-2185` **prescribes** the filière sentence for « les fonctions puissances `x^α` avec la racine n-ième (`fonction-exponentielle`, chapitre 5) ». The prose is right; the notes are wrong. Secondary error in the same note (`:632-634`): « Les deux sont SM-seuls » (a^x **and** x^α) — `maths-sexp.yaml:185` says a^x is a « mention ; cœur SExp = e^x », and §37 says no sentence for it. Why this is top-ranked: an author who trusts `:636-639` strips the SExp skip sentence from an explicitly SM-only section, and SExp students walk into `x^α`, ⁿ√x and Riemann unmarked. (ADR 0031: a cross-reference is an instruction.)

**F2 · MEDIUM-HIGH — the `Z = z²` section reaches a depth the SExp cadre excludes *explicitly*, with no filière sentence.**
`/home/user/BAC/content/maths/nombres-complexes-1/lesson.md:478-516` resolves `z⁴−6z²+25=0` by passing through `z² = 3+4i` — i.e. `zⁿ = a` with `a` complex, solved by the `δ = x+iy` / modules method (`:500-504`). `maths-sexp.yaml:345` (exclusions_transversales) is explicit: « Racines n-ièmes générales / résolution de zⁿ=a dans ℂ — SPÉCIFIQUE SM. **SExp : second degré à coefficients réels seulement.** », matching the programme line `:289`. `maths-sm.yaml:257` prints it for SM (« équations se ramenant au 2e degré », research-consensus). §37's rule is that a sentence goes where the cadre names the line SM **in research-consensus or in an explicit limite** — both conditions hold here, and there is no sentence. Items `NBCOMPLEX-49` (`items.yaml:2821`, square roots of a non-real Z) and `NBCOMPLEX-50` (`:2876`, complex coefficient `−10i`) are the same depth; the authors declared it honestly at `items.yaml:2757-2763` and noted that no per-item `filiere` field exists (grep-confirmed: zero occurrences in any `items.yaml`/`checkpoints.yaml` in the repo). Mitigation that argues for "owner ruling" rather than "author fix": the pre-existing R4b « filet de sécurité » section of the same lesson is already SM-depth and unmarked, so the new section inherits a precedent — but then §37 should say so, because today the three G-wave notions apply three different rules (Riemann marked, x^α marked, Z=z² unmarked).

**F3 · MEDIUM — the Riemann lot tests the conclusion but not the printed verb.**
`maths-sm.yaml:219` prints « **Encadrer**/approcher une intégrale par des sommes de Riemann ». Both verified SM subjects open on exactly that: `calcul-integral/bank.yaml:938` (bk-2023-n-x2, q2-a, **0,5 pt**, « Vérifier que : ∀n, (1/n)Σ… ≤ Sₙ ≤ (1/n)Σ… ») and bk-2024-r-x2 q4-c. The three new items `CI-67` (`items.yaml:4140`), `CI-68` (`:4199`), `CI-72` (`:4421`) all ask only for the **limit**. No item asks the student to establish the encadrement. The lesson does build it (`lesson.md:369-385`), so this is an item-side gap, not a prose gap.

**F4 · MEDIUM — the cadre line prints « à partir des diagrammes x_G(t) » and the lot delivers no diagram.**
`pc-physique-chimie.yaml:315` (source: cadre p.11-13): « **déterminer les deux types d'amortissement à partir des diagrammes x_G(t)** ». The new section `/home/user/BAC/content/pc/systemes-oscillants/lesson.md:477-492` has no `[[figure:…]]`; its « Illustration » (`:490`) is prose-only ("par exemple six" allers-retours, with no parameters from which six follows). The two `application_experimentale` items `SO-50` (`items.yaml:3298`) and `SO-51` (`:3370`) hand the student a comma-separated list of peak values instead of a trace. The PC épreuve always supplies the curve. The existing `[[figure:regimes-amortissement]]` (`lesson.md:514`) covers the three **régimes**, not the two **types** — which `:492` is at pains to distinguish.

**F5 · MEDIUM — the H1 prose carries no scope note at all.**
`/home/user/BAC/content/pc/systemes-oscillants/lesson.md` has no validation-note block for this edit (only two unrelated comments, `:274` and `:556`), unlike all five maths lessons in the same commit. So the cadre citations, the filière reasoning, the §37 default it applies, and the one open question (F6) are recorded nowhere in the file. Also unrecorded: the new synchrone section's attestation, which exists and is excellent — `/home/user/BAC/content/pc/rotation-axe-fixe/bank.yaml:674`, a verified national subject asking « Calculer la valeur de la longueur **L** du pendule simple synchrone au pendule pesant étudié ».

**F6 · LOW-MEDIUM — composite oscillator: one notch past the printed verb; owner one-liner, not a fix.**
`pc-physique-chimie.yaml:319` prints only « Appliquer 2e loi + RFD à un système oscillant composé (translation + rotation autour d'un axe fixe) **pour établir les équations différentielles** ». The lesson establishes it correctly (`lesson.md:390-408`, algebra verified) then goes on to ω₀/T₀ (`:412`) plus a numeric application (`:414-424`), and `SO-47` (`items.yaml:3087`) / `SO-49` (`:3229`) exploit T₀. **My reading: in scope** — `:315` prints « établir et exploiter la période/fréquence propre » generically and `:321` permits the closed form in the undamped case, which this is. `J_Δ` is handed over (`lesson.md:382`, `items.yaml:3097`), respecting `:306` (« le moment d'inertie J est donné »). The items note (`items.yaml:2870-2874`) argues scope for *establishing* the ODE and is silent on T₀. Worth one owner line so it is not re-litigated.

**Scope checks that came out clean** (stated so they are not re-opened):
- G3 Riemann: marked SM (`lesson.md:365`), and the conflicting guard **was** updated in the same commit — `calcul-integral/checkpoints.yaml:78-80` now reads « ce calibrage SExp seulement : la filière Sciences Mathématiques les traite dans la leçon (cadre maths-sm.yaml:216) ». Cross-reference consistent.
- G3 `u'·uⁿ` unmarked = correct (`maths-sexp.yaml:217` lists it). `u'·cos u`/`u'·sin u` and the primitive-under-condition unmarked = the §37 default, and the author recorded the reasoning at `lesson.md:887-899`.
- G4 `a^x` and `log_a` unmarked = §37 default (`maths-sexp.yaml:171`, `:185`: « mention possible »). `x^{√2}`, `x^{−√5}` (EXP-45/46) are in scope: `maths-sm.yaml:180` « α réel quelconque » + capacité 1.3.15.
- G5 both lines are printed in **both** cadres (`maths-sm.yaml:111`, `:128`; `maths-sexp.yaml:101-102`, `:106`) — common, correctly unmarked. `LIMCONT-35` avoids f′ (the notion precedes dérivabilité in programme order) ✓.
- G6 linearisation: `maths-sm.yaml:256`/`:260`; `maths-sexp.yaml:283` allows « linéarisation simple » — degree 2 and 3 only, so no degree overshoot and no sentence needed. Note `DETTE-CADRE.md:46` tags G6 « [SM] », which is stronger than `maths-sexp.yaml:283` supports.
- G7 variance/écart-type: printed for **both** filières (`maths-sm.yaml:397`, `maths-sexp.yaml:326`), placed in the right chapter (R5b, after espérance at `lesson.md:459`, before the binomiale at `:529`).
- H1: vertical/incliné (`:315` « horizontal/incliné/vertical »), synchrone (`:317`), deux types d'amortissement (`:315`), damped case established-only and explicitly stopped there (`lesson.md:475`, matching limite `:321`), petites oscillations respected. Resonance untouched, so exclusion `:357` not approached.

---

## 2. Exam shape and notation

**F7 · MEDIUM — an indefinite integral, the only one in the whole maths corpus.**
`/home/user/BAC/content/maths/nombres-complexes-2/lesson.md:288`:
`$$\int \cos^3x\,dx = \int \frac{\cos3x+3\cos x}{4}\,dx = \frac14\times\frac{\sin3x}{3} + \frac34\sin x + C = \frac{\sin3x}{12} + \frac34\sin x + C$$`
Grep over `content/maths/**/*.md`: this is the **sole** occurrence of `∫ … dx = … + C` without bounds. The owning notion never uses it — `calcul-integral/lesson.md:171` writes « une primitive de u'·uⁿ est … », `:209`/`:213` write the family as « … + C » without an integral sign — and no verified subject prints an unbounded integral. The same line also writes `\,dx` where the corpus writes `\,\mathrm{d}x`. `NBCOMPLEX2-52` (`items.yaml:3670`) gets it right with bounds, which makes the prose the outlier.

**F8 · MEDIUM — « König-Huygens »: a named theorem the exam never names.**
Introduced student-visibly by G7: a `###` heading at `/home/user/BAC/content/maths/probabilites-conditionnelles/lesson.md:497`, and in item text/solutions at `items.yaml:153`, `:2761`, `:2799` (« **Étape 3 — König-Huygens** »), `:2832`, `:2874`, `:2969`. Repo-wide grep for `König|Koenig|Huygens`: **zero** occurrences in any `bank.yaml`, `exercises.yaml`, `docs/sujets/` maths file, or cadre file (the only hits are the Dutch clockmaker in a PC reading-comprehension subject). The formula is in the cadre; the name is not. A student can reasonably infer the name is expected vocabulary.

**F9 · LOW-MEDIUM — ℓ vs L for the synchronous length.** The verified subject prints **L** (`content/pc/rotation-axe-fixe/bank.yaml:674`); the new prose (`systemes-oscillants/lesson.md:322`, `:643`) and `SO-46` (`items.yaml:3024`) use **ℓ**. Defensible (L is the rod length in the worked example, `lesson.md:326`), but the subject's notation should be named once.

**F13 · LOW — a note that mis-quotes its own prose.** `calcul-integral/lesson.md:890-892` reports the Riemann sentence as « au programme de la filière Sciences Mathématiques ; en Sciences Expérimentales, tu peux passer… » (the §37 wording); `:365` actually reads « Ce qui suit est un **outil supplémentaire** de la filière Sciences Mathématiques… ». Two wordings for one role in one commit (`fonction-exponentielle:369` uses the §37 one). Pick one.

**F14 · LOW — the Riemann theorem is proved narrower than the subjects use it.** The lesson establishes it for f continuous **and increasing** (`lesson.md:369-385`); both verified SM subjects state and apply it for h merely **continuous** on [0,1] (`calcul-integral/bank.yaml:991-993` and `:1161`). All three new items use monotone f, so nothing is wrong — but a student holding only the monotone version cannot justify the attested step. One admitted-general sentence closes it, and stays inside the limite (`maths-sm.yaml:223` excludes only the abstract Riemann integral).

**Shape checks that came out clean:** MCQ is the corpus-wide diagnostic format, not an invented exam format — not flagged. The Riemann items' shape (identify f, take the limit; left-vs-right endpoints) matches the attested shape, which states the theorem and applies it to a given algebraic sum (`bank.yaml:936-1028`, `:1155-1177`). `SO-46` matches a verified question almost word for word. `LIMCONT-37` (dichotomy on a function with a pole at 1,3) is a hypothesis-check, within « Appliquer le TVI ; localiser une solution par dichotomie » (`maths-sm.yaml:128`). PC habileté values `utilisation` / `résolution` / `application_experimentale` are the **established** PC corpus convention (same values in `rc-charge`, `rlc-serie`, `dipole-rl`, `chute-mouvements-plans`, `evolution-spontanee`) — I checked and withdraw any taxonomy objection.

---

## 3. Numbers — every one recomputed, zero errors

Prose: `S₄=30/64≈0,469`, `T₄=14/64≈0,219`, `S₄−T₄=1/4=1/n`, `Σ(k/n)²≈n/3` ✓ · `∫₂³6/(3−2x)=−3ln3≈−3,30` ✓ · `∫₀²−3/(2x+1)²=−6/5` ✓ · `(x²+1)⁴/8` ✓ · `∫₀^{π/6}cos3x=1/3` ✓ · `F=(x²+1)³+4` ✓ · `F(x)=x²/2−2`, roots ±2, F(0)=−2 ✓ · `8ln2≈5,55` vs `3×2²=12` ✓ · `8^{1/3}=2` ✓ · `log(2¹⁰⁰)≈30,1 → 31 chiffres`, exact value 1 267 650 600 228 229 401 496 703 205 376 = 31 digits ✓ · `ln50/ln2≈5,64 ≠ ln25≈3,219` ✓ · dichotomy g(0,5)=−0,375, g(0,75)=0,171875, g(0,625)=−0,130859375, g(0,6875)=0,012451171875, final [0,625;0,6875], midpoint 0,65625, true root ≈0,6823 inside ✓ · `p([1,3])=[1/3;1]`, `q([−1,2])=[0;4]` ✓ · `cos³x=(cos3x+3cosx)/4`, test at π/3 = 1/8 ✓ · `z⁴−6z²+25`: Δ=−64, Z=3±4i, S={±(2+i),±(2−i)}, substitution check 0 ✓ · `V(X)=0,6196` by both routes, `σ≈0,787`, law sums to 1 ✓ · `V=3×0,4×0,6=0,72`, `σ≈0,849` ✓ · `ΔL₀=0,10 m` / `0,05 m`, ω₀=10, T₀≈0,628 ✓ · `J=⅓mL²=0,384`, `ℓ=0,80 m`, T₀≈1,777 s by both formulas ✓ · composite `(J+mR²)ẍ+kR²x=0` (algebra re-derived), ω₀=5,0, T₀≈1,257, X_eq=0,20 m, ideal pulley 7,07 rad/s ✓.

Items: all 43 keys and all distractors recomputed, including the distractor *derivations* (e.g. CI-59 A=14/3 from the dropped `n+1`; CI-60 A=2720, B=136; LOG-37 A=58 from 120·log3, B=10 from 0,4771×19,08, C=42 from log3+41, key 20 with `3⁴¹=36 472 996 377 170 786 403` = 20 digits ✓; NBCOMPLEX-49 A's check `(5+12i)²+10(5+12i)+169 = 100+240i` ✓; SO-47 A=0,66, B=0,81, D=0,17 ✓; SO-50 peak gaps 2,2/1,5/0,9/0,7 are genuinely geometric, ratio ≈0,66 ✓; SO-51 second record gaps exactly 0,6/0,6/0,6/0,6 ✓). **No error found.**

Two internal observations, neither an error: (a) `PC-M23-1` and `PC-M23-2` both land on `E(X)=2,1` — probably deliberate (same expectation, different dispersion, which is the lesson's own opening argument at `lesson.md:477`) but undocumented in the block note at `items.yaml:2721-2725`, which claims the laws are distinct; (b) `SO-46`'s « donnée » `J_Δ=3,78×10⁻²` is exactly `(1/12)mL²+md²` for the stated rod — self-consistent, a good sign. Collision spot-checks against `probabilites-conditionnelles/bank.yaml` (2,1 / 0,49 / 1,09 / 0,7) and `systemes-oscillants/bank.yaml` (0,525 / 0,80 / 1,05): no hits.

---

## 4. Student-visible claims about the exam

**F15 · LOW-MEDIUM.** `/home/user/BAC/content/pc/systemes-oscillants/lesson.md:548`: « C'est exactement cette lecture qu'un exercice de type bac te demandera de faire — **jamais** de recalculer h, seulement de reconnaître le régime à partir de sa signature graphique. » The recognition half is supported (`pc-physique-chimie.yaml:210-211`); the « jamais » is an absolute claim about the épreuve that no cadre line makes — the cadre is silent on computing h, and silence is not a prohibition (the exact defect mode `maths-sm.yaml:340-361` was written to prevent). Without Bash I could not confirm whether this line is new in ff15dbc2; it sits in the régime worked example immediately adjacent to the new « Deux types de frottement » section, so it belongs in the same pass either way.
Same class, pre-existing, listed for completeness: `calcul-integral/lesson.md:117` « une famille de primitives que les sujets de bac utilisent **sans arrêt** » (wave B) and `:767` « les deux gestes du chapitre les plus fréquents à l'examen »; `probabilites-conditionnelles/lesson.md:531` « Elle est fréquente à l'examen » (R5c, earlier wave). None of the six new lots adds a frequency claim of its own, which is the right instinct.

---

## 5. Habileté mix (`maths-sm.yaml:58-61` 40/40/20 · `maths-sexp.yaml:47-50` 50/35/15 · `pc-physique-chimie.yaml:257-260` 50/35/15 for mécanique)

**Aggregate across the 43 new items: 20 / 16 / 7 = 47 % / 37 % / 16 %** — within tolerance of both maths profiles. H1 alone: 4 `utilisation` / 3 `résolution` / 2 `application_experimentale` = 44/33/22 vs 50/35/15 — fine. **No skew worth an owner's attention.** Four individual labels are wrong, which matters more than the ratio:
- `CI-64` (`calcul-integral/items.yaml:3946`) is `synthese`/4 for one substitution into a *given* `G`, on the same geste as the lesson's worked example → `application_directe`. It is one of 4 synthese labels in a 15-item lot (27 % vs 20 %).
- `NBCOMPLEX-49` (`nombres-complexes-1/items.yaml:2821`) is `application_directe` at `difficulty_level: 4` while running the full complex-square-root system — the label contradicts its own difficulty.
- `PC-M23-2` (`probabilites-conditionnelles/items.yaml:2804`, `application_directe`/4, four chained steps + interpretation) and `PC-M23-4` (`:2944`, `application_non_explicite`, pure formula recall) look swapped.
- Three lots have **zero** level-3 items (EXP-41→46, NBCOMPLEX2-49→52, PC-M23-1→4).
Measurement caveat worth an instrument rather than a rewrite: most legacy items carry no `habilete` at all (`systemes-oscillants/items.yaml:2878` says so outright for its 43 prior items; roughly half of `calcul-integral`'s 73 lack it), so a true per-notion ratio **cannot** be computed from these files today.

---

## 6. Ranked minimal fixes

| # | Fix | File(s) | Role |
|---|---|---|---|
| 1 | Rewrite both validation notes: the convention is §37's — an inline student sentence **where the cadre names the line SM in research-consensus or in an explicit limite**; delete « jamais dans la prose lue par l'élève » and « aucun marqueur inline … ni de ses homologues »; correct « a^x est SM-seul » to the `maths-sexp.yaml:185` « mention » | `content/maths/fonction-exponentielle/lesson.md:632-639`; `content/maths/fonction-logarithme/lesson.md:590-597` | content author (maths lesson) |
| 2 | Add one filière sentence to the `Z=z²` section (same wording as `fonction-exponentielle:369`) **or** get an owner ruling that the pre-existing unmarked R4b sets the precedent — and record it in §37 either way | `content/maths/nombres-complexes-1/lesson.md:478`; §37 echo in `docs/audits/DECISIONS-EN-ATTENTE.md` | content author + **owner** |
| 3 | Add one Riemann item on **establishing the encadrement** (the attested 0,5-pt opening question, `bank.yaml:938`), the printed verb of `maths-sm.yaml:219` | `content/maths/calcul-integral/items.yaml` | item author |
| 4 | Add a figure callout contrasting the two envelopes (courbe vs rectiligne) in « Deux types de frottement », and point one of `SO-50`/`SO-51` at it — the cadre line is « à partir des **diagrammes** x_G(t) » | `content/pc/systemes-oscillants/lesson.md:477-492`; `items.yaml:3298`, `:3370` | media/figure author + item author |
| 5 | Rewrite `∫cos³x dx = … + C` as a primitive statement (or with bounds, as `NBCOMPLEX2-52` does); `\mathrm{d}x` | `content/maths/nombres-complexes-2/lesson.md:288` | content author |
| 6 | Demote « König-Huygens » to a parenthetical aside, or drop the name from student-visible text | `content/maths/probabilites-conditionnelles/lesson.md:497`; `items.yaml:153, 2761, 2799, 2832, 2874, 2969` | content author + item author |
| 7 | Add the missing H1 scope note: the four cadre citations (`:315`, `:317`, `:319`, `:306`), the §37 default applied for « deux types », the synchrone attestation (`rotation-axe-fixe/bank.yaml:674`), and the open question of fix 8 | `content/pc/systemes-oscillants/lesson.md` | content author (PC lesson) |
| 8 | One owner line: is deriving ω₀/T₀ for the **composite** oscillator in scope, given that `:319` prints only « établir les équations différentielles »? (my reading: yes, via `:315` + `:321`) | `docs/audits/DECISIONS-EN-ATTENTE.md` | **owner** |
| 9 | Soften « jamais de recalculer h » to what the cadre says (reconnaître les régimes, `:210-211`) | `content/pc/systemes-oscillants/lesson.md:548` | content author |
| 10 | Relabel `CI-64` → `application_directe`; `NBCOMPLEX-49` → `application_non_explicite`; swap `PC-M23-2`/`PC-M23-4` | the four items.yaml lines named in §5 | item author |
| 11 | Add one sentence admitting the general (continuous, non-monotone) Riemann statement that both verified subjects use | `content/maths/calcul-integral/lesson.md:385` | content author |
| 12 | Align the two filière sentences on one wording; fix the self-quote | `content/maths/calcul-integral/lesson.md:365, 890-892` | content author |
| 13 | Name the subject's notation **L** beside ℓ | `content/pc/systemes-oscillants/lesson.md:322`; `items.yaml:3024` | content author |
| 14 | Cadre maintenance: the « LACUNE PRIORITAIRE — variable aléatoire / loi binomiale, `lesson_slug: null` » entries are now stale — the corpus teaches all of it (R5b, R5c), and G7 closed the last line | `docs/cadre/curriculum/maths-sm.yaml:394, 454-456`; `maths-sexp.yaml:322, 373-375` | research-lead |
| 15 | `DETTE-CADRE.md:46` tags G6 « [SM] »; `maths-sexp.yaml:283` allows « linéarisation simple ». Align the register | `docs/audits/DETTE-CADRE.md:46` | research-lead |

---

## 7. Per-wave verdicts

| wave | verdict | why |
|---|---|---|
| **G3** calcul-integral | **FIX THEN SHIP** | Scope and marking correct, the conflicting `checkpoints.yaml:78` guard was updated in the same commit, numbers clean. Fixes 3, 11, 12. |
| **G4** exponentielle + logarithme | **FIX THEN SHIP** | The **prose is correct** per §37; the two validation **notes** are wrong and will mis-instruct the next author. Fix 1 (blocking), then ship. |
| **G5** limites-continuite | **SHIP** | Both lines printed in both cadres, no marking needed, numbers exact, habiletés sound, items correctly avoid f′. Nothing blocking. |
| **G6** complexes | **FIX THEN SHIP** | Fixes 2 (marking on an explicitly SExp-excluded depth) and 5 (notation). Linearisation itself is clean, degree 2–3 only. |
| **G7** probabilités | **FIX THEN SHIP** | In scope for both filières, right chapter, numbers exact. Fixes 6, 10, and 14 for research-lead. |
| **H1** systèmes oscillants | **FIX THEN SHIP** | Every passage maps to a printed `savoir_faire`; `J` given; damped case stopped at the ODE. Fixes 4, 7, 8, 9, 13 — none of them scope breaches. |

No wave needs REWORK. The one finding I would treat as blocking is **fix 1**, because it is the mechanism by which the next wave *would* go off-syllabus.
