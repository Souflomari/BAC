# Arithmetic check of `docs/pipeline/propositions/maths-structures-espaces-vectoriels.md`

**Verdict: ERRORS FOUND.** I re-ran 115 computations with exact arithmetic (Python `Fraction`; sympy isn't installed). There is **one math error**: SA-41's key is false, and one of its distractors is a valid argument. There are also **two collisions in today's new material**: SA-50 reuses two §6 vectors and claims it doesn't, and r8-variation's J is the matrix B from §6. Every other number in the spec is correct.

**Method.** I checked identities on 300 random rational points each, and computed kernels and ranks exactly. I searched every item, beat and exercise vector and matrix in the spec, `bank.yaml`, `exercises.yaml`, `lesson.md`, `items.yaml`, `checkpoints.yaml` and `docs/sujets/maths/structures-algebriques.md`, after normalising the LaTeX. No repo file was edited.

### 1. Computations checked (NEW = revised 2026-10-20)

| where in the spec | claimed | recomputed | result |
|---|---|---|---|
| [C1] / §7.1 B | M(1,0)=I∈F; ½M(1,0)=M(½,0), ½∉ℤ | same | OK |
| §7.1 note on D | M(a,b)M(c,d)=M(ac−bd, ad+bc), F stable for × | holds | OK |
| [C2] | 0·u=0_E; (−1)u=−u | valid steps | OK |
| [C3] | D={y=2x}: 0∈D, u+v=(t,2t), λu=(s,2s) | holds | OK |
| [C4] | 2·0+1=1≠0; (0,1),(1,3)∈D'; sum (1,4); 2·1+1=3≠4 | same | OK |
| [C5] / §7.2 B | 0∈X; λ²xy=0; (1,0)+(0,1)=(1,1)∉X | same | OK |
| [C6] | O=M(0,0); sum M(a+a',b+b'); λM=M(λa,λb); reverse checks | holds | OK |
| [C6b] NEW | (3,−2)=3u−2v; (t,2t)=t(1,2); λM(a,b)+μM(a',b')=M(s,t); compact form ⇔ conditions 2+3; Vect satisfies the 3 conditions | holds | OK |
| [C7] | M(a,b)=aA+bB | holds | OK |
| [C8] | (α+β, β+γ, α+γ); β=−α, γ=α, 2α=0; inverse α=(x−y+z)/2 etc.; (1,0,0)→(½,½,−½) | kernel {0}; formulas hold | OK |
| [C9] / M3 | pairwise non-colinear (2 vs ½; 3 vs 3/2; 3/2 vs 3); w1+w2=(3,3,3)=w3 | same | OK |
| [C9b](i) NEW | (x,2x,z)=x(1,2,0)+z(0,0,1) | holds | OK |
| [C9b](ii) NEW | (α, 2α+β, 3β); family free; (0,0,1) gives 0=1 | free; augmented rank 3 | OK |
| [C10a] NEW | t1+t2=(4,5)=t3; two writings of (4,5); (α+3β, 4α+β); −12β+β=−11β; (t1,t2) free | same | OK |
| [C10] | A=M(1,0), B=M(0,1); αA+βB=[[α,α+β],[α−β,β]]; free; I∉V (a+b=2≠0) | same | OK |
| §13.6 | V not stable for × | A²=[[2,1],[1,1]]∉V | OK |
| [C11] | xE11+…+tE22; dim M₂(ℝ)=4 | rank 4 | OK |
| [C11] killed face / §7.3 D NEW | αI+βE12+γE21=[[α,β],[γ,α]]; [[1,0],[0,2]] not reached | rank 3; augmented 4 | OK |
| [C12] / §7.4 | u+v=w; (α+γ)u+(β+γ)v; (α+2β, 2α+β, −α+β); β=α, 3α=0; dim 2; option C premises (2/1≠1/2, 3/1≠3/2, 3/2≠3/1) | same | OK |
| [C13] | N=(a+b)I+cK; αI+βK=[[α,β],[β,α]]; dim 2 | same | OK |
| [C14] | (x,y,−x−y)=x(1,0,−1)+y(0,1,−1); free; dim 2 | same | OK |
| [C15] | f linear; g(0,0)=(1,0); h(2,0)=(4,0) vs 2h(1,0)=(2,0) | same | OK |
| [C16] | ker f=Vect((1,1,1)); f(1,1,1)=(0,0); f(s+t,t,0)=(s,t) | same | OK |
| [C17] | φ linear, ker {(0,0)}, Im=V | same | OK |
| [C18] | ker x²={±1}; f(2)=f(−2)=4; Im=ℝ*₊ | same | OK |
| §7.2 D premise | X contains opposites | true | OK |
| §7.3 cp-r8-pari-notation NEW | key B=4; A,C=2; D=3 | ranks 4 / 3 | OK |
| SA-36 | (−1,−1)∉S; C premise for λ≥0; (1,1)+(−2,2)=(−1,3), 1≠3 | same | OK |
| SA-37 NEW | (1,1),(1,−2)∈T; sum (2,−1); (−3)(3)=−9; λ² factor; opposites in T | same | OK |
| SA-38 | key is a linear-form kernel; (1,1,0)+(1,−1,0)=(2,0,0), 4≠0; x+y+z=1 misses 0; {x≥0} | same | OK |
| SA-39 | U is a subgroup on ℤ²; [[1,0],[1,0]]=M(1,0); ½·it needs a=½; I∉U | same | OK |
| SA-40 | N is a subgroup; (½,0)∉N; N = union of lines x+y=k | same | OK |
| SA-41 premise NEW | product = [[ac+bd, ad+bc+bd],[bc+ad+bd, ac+ad+bc+2bd]]; Z stable for × | holds | OK |
| **SA-41 key NEW** | "Rien": ×-stability gives none of the 3 conditions | λI=Z(λ,0)∈Z and λ·M=(λI)×M, so ×-stability **gives** the scalar condition | **ERROR** |
| SA-42 | v1+v2−v3=0; pairwise non-colinear | same | OK |
| SA-43 | A1+2A2=A3; A1+A2=[[1,1],[2,1]]≠A3; pairwise non-proportional | same | OK |
| SA-44 NEW | 2x1+3x2=(8,3,7); system; −7β−21γ; α=−2γ; third equation gives 0; kernel γ(−2,−3,1); non-colinearity (2 vs −1/3, 8 vs 1, 4 vs −3); pairwise sums (3,2,3), (9,6,9), (10,2,8) | same; also no relation with coefficients in {−1,0,1} | OK |
| SA-45 NEW | generators (1,3,0), (0,1,2), (2,5,−2); 2g1−g2=g3; (g1,g2) free; non-colinear (2 vs 5/3); dim 2 | same | OK |
| SA-46 | Q=Vect([[1,1],[0,0]],E21); dim 2; D premise (row equal, columns differ) | same | OK |
| SA-47 | x[[1,0],[0,−1]]+yE12+zE21; dim 3; D family free and forces y=z | same | OK |
| SA-48 NEW | f, k linear; k(1,1)=(0,0); g(0,0)=(1,0); k(ℝ²) is a line | same | OK |
| SA-49 | aE11+bK+cE22; dim 3; (I,K) misses [[1,0],[0,2]] | same | OK |
| SA-50 NEW | (1,2,0)+(0,1,1)=(1,3,1); 2x−y+z=0 on all three; (1,0,0) gives 2≠0; D premise | same | OK (but see collisions) |
| SA-51 | ker=Vect((2,1)); Im=Vect((1,2)) | same | OK |
| SA-52 | ker=Vect((1,−1)); Im=Vect(I) | same | OK |
| SA-53 | ker = unit circle, a subgroup; f(1)=f(−1)=f(i)=1 | same | OK |
| r8-variation q1–q3 NEW | O∈E; sum M(x+x',y+y'); −M=M(−x,−y) (entries (2,1), (2,2)); λM=M(λx,λy); I=M(1,0); J=M(0,1)=[[0,1],[−1,1]]; xI+yJ=M(x,y); free; dim E=2 | same | OK |
| r8-bac (bank steps) | sum, opposite, scalar for [[x+y,y],[2y,x−y]] | same | OK |
| §11.0 counts | M1 6, M2 7, M3 5, M4 8, M5 6, M6 4, M7 3, M8 3, generalisation-hative 4 (13→17, matches `items.yaml:2283`); 35→53 | same | OK |
| §2 / §11.0 | habiletés 7/7/4 = 38,9/38,9/22,2; four lockstep breaks SA-41, 44, 46, 52 (NEW) | same | OK |
| Q1b NEW, Q11, §8.9 | 12/18 items; 18/53 = 34 %; +12 → 30/65 | 12; 33,96 %; 30/65 | OK |
| §3.2 | 3 of 8 sujets carry the "espace vectoriel réel" reminder (2025, 2023, 2018) | 8 headings; 3 matches | OK |
| §1.f, g, j | 10 `## ` headings; "chapitre 11" in the notion = 0; 35 items, floor 3 | same | OK |
| §1.i | 34 and 97 "occurrences" | these are matching **lines**; true occurrence counts are 35 (REVIEW has 3) and 110 (bank 58, REVIEW 5) | label wrong, figures right as lines |
| §1.k | `habilete` on the 8 items SA-27…34 | **9 items**: SA-35 also has it (`items.yaml:2194`) | minor ERROR |
| §4.2 | 15 web/ files, 7 `.base.json` seals | 15 / 7 | OK (but §16.3 says "six sceaux": should be 7) |

### 2. Errors, with corrections

- **E1 — SA-41 (NEW, blocking).** For Z={[[a,b],[b,a+b]]}, λI=[[λ,0],[0,λ]]=Z(λ,0) is in Z, and λ·M=(λI)×M. So ×-stability does yield the external-law condition. The key "Rien" is false, and option D ("λ·M est un produit") is a correct argument, so check (a) fails.
  - Swapping Z doesn't help: any linearly parametrised family containing I offers the same route.
  - Fix option (i): change the question to "Cette stabilité suffit-elle à conclure que Z est un sous-espace ?". The key becomes "Non : elle ne donne ni la non-vacuité ni la stabilité pour + ; ces conditions restent à écrire". B, C and D become false "Oui / il ne reste que O" options.
  - Fix option (ii): keep the question and make the key true: "Elle ne donne ni la non-vacuité ni la stabilité pour + ; elle peut donner la loi externe via λ·M=(λI)×M, λI=Z(λ,0)∈Z". D then has to be replaced.
- **E2 — SA-50 (NEW).** The sentence at 1687–1688 ("aucun de ces trois vecteurs n'apparaît dans le §6… vérifié contre [C8], [C9b]…") is false. (1,2,0) is the [C9b] (i) generator and the first vector of [C9b] (ii); (0,1,1) is v3 of [C8]. That is the same defect F6 used to reject the old SA-44.
  - Verified, collision-free replacement: (1,0,2), (0,3,1), (2,3,5), with (2,3,5)=2(1,0,2)+(0,3,1). All three lie on 6x+y−3z=0, (1,0,0) gives 6≠0, rank 2, pairs non-colinear, and the B/C/D premises still hold.
  - Or keep the vectors and delete the false sentence.
- **E3 — r8-variation (NEW).** J=M(0,1)=[[0,1],[−1,1]] is exactly B from [C7]/[C10]. The originality check compared only the set shapes, and the §10.3 letter table reserves A, B for V's basis.
  - Verified, collision-free fix: E′={[[x,y],[−y,x−y]]}, J′=M(0,1)=[[0,1],[−1,−1]]. q1–q3 still hold, I=M(1,0), and dim is 2.
- **Minor, older text:** fix §1.k to "SA-27…SA-35"; relabel §1.i/§16.1 as line counts; correct §16.3 "six" to 7. §1.g's "31 occurrences" can't be reproduced today: there are 37 outside this spec and its critique, including other notions. The decisive 0 holds. §7.5 says M3 rests on "ses trois items (SA-42/43/44)", but five items carry M3.

### 3. Does each distractor come from its labelled model?

All other option↔model pairs produce their option.

- **SA-38 D {x≥0} → M2:** not produced. Applying the sub-group checklist rejects it, since (−1,0,0)∉. M1 or "checked 0 and + only" produces it; the existing id `axiome-oublie` fits better.
- **SA-36 D → M2:** needs a false premise (S is neither +-stable nor a sub-group). M2 applied correctly reaches the key's verdict with the key's own witness, because λ=−1 is the opposite. `cloture-non-verifiee` fits the "assumed + closure" mechanism.
- **SA-37 D (NEW) → M2:** T isn't a sub-group either; D needs M2 plus testing + only on same-line pairs. It should be double-tagged M2↔generalisation-hative.
- **cp-r8-pari-scalaire D and cp-r8-pari-stabilite D → M2:** false premises, already acknowledged in the spec.
- **SA-46 D (=1) → M4:** M4 (count the letters) gives 3, which is option B. The 1 comes from reading only the first row.
- **SA-44 C → generalisation-hative:** weak fit ("square system ⇒ unique solution" is a false rule, not a generalisation from examples).
- **SA-53 C ("ne contient pas 0") → M2:** overlaps the existing `neutre-non-transporte`.
- **A wrong model reaches the key value**, against the spec's own §11.2 rule: cp-r8-pari-notation (M4, counting the 4 entries, lands on B=4), SA-46 (M5 "order 2" lands on 2), SA-49 (M4 "three letters" lands on 3).
- **Count impact of relabelling:** M2 would drop to 5 or 4, still at or above the floor of 3.

### 4. Collisions

- **New material:** E2 and E3 above.
- **Near-collision:** r8-variation's E=[[x,y],[−y,x+y]] differs from SA-41's Z=[[a,b],[b,a+b]] by one sign. Both contain I and both are ×-stable. The spec's "≠ SA-41" is true only literally.
- **Cues:** SA-48's g is again the affine "+1" non-linear map, as in [C15]. SA-52's φ:ℝ²→M₂(ℝ) mirrors [C17]'s φ, and its distractor B equals [C17]'s conclusion.
- **Repeated "third = first + second" relation:** [C9], [C10a] (new), [C12], SA-42, SA-50 (new). [C10a] sits just before cp-r8-pari-dimension, whose answer is u+v=w.
- **Witness reuse only:** SA-38 B's (1,1,0) is [C8]'s v2; SA-51's Im is [C3]'s line; SA-49 D's witness [[1,0],[0,2]] is [C11]'s.
- **No SA object occurs in `bank.yaml` or `exercises.yaml`.** The search hits there were false positives (3×3 matrix rows, table cells).

### 5. r8-bac transcription (bk-2023-n-x5 q1–q2)

It matches exactly.
- q1 "(0,5 pt) Montrer que E est un sous-groupe de (M₂(ℝ),+)." and q2 "(0,25 pt) … sous-espace vectoriel de (M₂(ℝ),+,·)." match `bank.yaml:1470` and `:1488`, and `docs/sujets/maths/structures-algebriques.md:187-188`.
- E matches `:1463`, the reminder `:1461`, and the step notes `:1495` and `:1501`; total 3,5 and status `sourced` also match.
- Side note: `bank.yaml:51-57` says bk-2023-n-x5 "ne recoupe aucun autre sommet". That becomes false once r8-bac ships, and it is not on §14's edit list.

Scripts are in `/tmp/claude-0/-home-user-BAC/b1255b66-abe5-57e2-99f2-ebcbcf8cf748/scratchpad/ev-arith/`: `check.py` (all computations), `collide.py` (collision search), `alt.py` and `alt50.py` (checks of the proposed fixes).
