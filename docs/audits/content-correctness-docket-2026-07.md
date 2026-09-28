# Content-correctness docket — deep pass (2026-07-06)

**The owner's ruling docket.** Every substantive finding across all 61
lessons, recomputed independently — twice, in Python — by six parallel deep
auditors (calculator, not mental math). **Nothing here is silently
corrected**: the owner sat the SMA and Sciences Physiques bac; he is the
correctness gate. This docket becomes his ruling session, then a gated
Sonnet cleanup.

**Headline.** ~350 worked examples recomputed. **Zero P0** (no wrong
value/law on a correct-answer path that a student reproduces and loses marks
on). **3 P1** (one physics arithmetic slip, twice-independently-confirmed;
one maths definition that is cadre-scope + internally inconsistent). The
rest are P2/P3 framing, distractor slips, and cadre-scope questions.
**50 of 61 lessons are fully clean** — a real result.

**Legend.** SEV: P0 = exam harm on the correct path · P1 = wrong, self-evident ·
P2 = misleading · P3 = refinement. CONF = auditor's confidence it is truly an
error (recomputed twice before *high*). TYPE: `domain-fact` = pure science,
sure · `cadre-scope` = correctness depends on the Moroccan *cadre de
référence* (not accessible here) — general-science answer noted, owner rules.

**Confidence note for the owner:** the PC and Maths numerical findings are
where an independent calculator is decisive — I mark those **high** where two
agents concur. The cadre-scope items (HW condition count, anneau unitaire,
produit vectoriel in the SM programme, intestinal pH convention) are exactly
where **your** eye is needed: the general science is stated, the *examined
curriculum* is your call.

---

## P0 — exam harm on the correct path

**None.** Every marked-correct worked value across all 61 lessons recomputed
exact (to stated rounding). This is the single most important line in the
docket.

## P1 — wrong, self-evident

| # | Subj | file:line | printed | recomputed / correct | working | CONF | TYPE |
|---|---|---|---|---|---|---|---|
| 1 | PC | `pc/atome-mecanique-newton/lesson.md:215` **&** `:217` | v ≈ **3,1×10⁶ m/s** ; T ≈ **5,3×10⁻¹⁷ s** | v ≈ **4,4×10⁶ m/s** ; T ≈ **3,7×10⁻¹⁷ s** | He⁺, la formule L211 $v=\sqrt{2ke^2/m_e r}$ est correcte ; substitution numérique : 2·9,0e9·(1,6e-19)²/(9,1e-31·2,6e-11)=1,948e13 → v=4,41e6. Le 3,1e6 imprimé = $\sqrt{ke^2/m_e r}$ — **le facteur 2 a sauté dans le calcul numérique** ; T=2πr/v hérite l'erreur. | **high** (confirmé 3× indépendamment : B1 + 2 auditeurs profonds, chacun en Python) | domain-fact |
| 2 | Maths | `maths/structures-algebriques/lesson.md:251-259` (+ table :327) | `anneau` = 3 axiomes, aucune unité (L259 : « Rien n'exige que × ait un neutre ») | ajouter l'axiome **élément unité pour ×** (anneau *unitaire*) | (a) **cadre** : le programme SM définit l'anneau comme unitaire ; la définition donnée décrit un *pseudo-anneau*. (b) **incohérence interne** : R6 définit `corps` par « tout élément non nul a un symétrique pour × », or « symétrique pour × » (R2:123) suppose le neutre de × — jamais garanti par les axiomes d'anneau. La chaîne anneau→corps présuppose une unité que l'anneau n'exige pas. | **high** (sur l'incohérence interne) ; cadre-scope sur la convention | cadre-scope |

## P2 — misleading / degraded

| # | Subj | file:line | claim | correct | CONF | TYPE |
|---|---|---|---|---|---|---|
| 3 | SVT | `svt/genetique-populations/lesson.md:194,196` (echo :348 ; items GP-3) | titre « **quatre** conditions » | le corps **énumère cinq** conditions bien distinctes (grand effectif, **panmixie** L199, absence de migration/mutation/sélection), chacune expliquée | **high** (incohérence interne) ; cadre-scope sur le compte officiel | cadre-scope |
| 4 | SVT | `svt/role-enzymes/lesson.md:223` | trypsine intestinale active « à pH **proche de la neutralité** » | milieu intestinal **légèrement basique/alcalin (~8)** ; suc pancréatique bicarbonaté ; optimum trypsine ~8. (Amylase ~7 et pepsine ~2 dans la même table = corrects.) | med | domain-fact (certains manuels marocains simplifient « neutre/légèrement basique ») |

> **Correction du docket B1** (honest-state) : le flag B1 disait que la leçon
> HW « omet la panmixie du compte ». **C'est faux sur le fichier** : la
> panmixie EST le 2ᵉ puce (L199), pleinement expliquée. Le vrai défaut est le
> mot « quatre » qui contredit les **cinq** puces de la leçon. La direction de
> résolution (relabelliser en « cinq », ou retirer la panmixie pour tenir
> « quatre ») dépend du cadre — d'où le classement cadre-scope, pas un
> auto-fix. Le B1 avait aussi sur-classé role-enzymes ; ici confirmé P2.

## P3 — refinement / loose framing / distractor slips

| # | Subj | file:line | issue | recomputed | CONF | TYPE |
|---|---|---|---|---|---|---|
| 5 | PC | `pc/rlc-serie/items.yaml:492` | distractor « 2π√(RC) ≈ **14 ms** » | ≈ **140,5 ms** (RC=5e-4 ; 2π√=0,1405 s) — facteur ~10 | high | domain-fact — **distractor (`correct:false`)**, hors chemin correct |
| 6 | PC | `pc/rlc-serie/items.yaml:670` | distractor « ≈ **14 ms** » (R=30 Ω) | ≈ **108,8 ms** ; le même « ≈14 ms » copié-collé depuis :492 (R=50) | high | domain-fact — distractor |
| 7 | PC | `pc/rlc-serie/items.yaml:1177` | distractor « 2π√(RC) ≈ **1,4 ms** » (R=5 Ω) | ≈ **44,4 ms** (~32× trop petit) ; l'option correcte A (2π√(LC)≈4,0 ms) est exacte | high | domain-fact — distractor |
| 8 | PC | `pc/rlc-serie/items.yaml:504` | distractor « 2π√(RLC) ≈ **22 ms** » | 2π√(RLC)=44,4 ms ; 22 ms = π√(RLC) (facteur π, pas 2π) ; et √(RLC) n'est pas homogène à un temps | high | domain-fact — distractor, formule volontairement absurde |
| 9 | PC | `pc/evolution-spontanee/lesson.md:215` (+ items:15) | K(Fe+2Ag⁺) « ≈ **4,0×10¹⁵** » | ≈ **8×10⁴¹** ; E°cell=0,80−(−0,44)=1,24 V ; logK=2·1,24/0,0592=41,9. Le 4e15 correspond à **E°(Ag⁺/Ag) pris = 0** | med | domain-fact (K-depuis-E° est hors-cadre bac ; conclusion Qr≪K inchangée) |
| 10 | PC | `pc/evolution-spontanee/lesson.md:257` | K(Mg+2Ag⁺) « ordre de **10⁸⁰** » | ≈ **10¹⁰⁷** ; même omission du potentiel Ag⁺/Ag (~27 ordres) ; « à toi » invention | med | domain-fact |
| 11 | PC | `pc/noyaux-masse-energie/lesson.md:212` | « [fusion 17,6 MeV] presque autant d'un coup que les 173 MeV de la fission » | rapport 173/17,6 ≈ **9,8×** ; les deux nombres sont justes, seul le « presque autant » sur-vend | med | domain-fact (cadrage) |
| 12 | PC | `pc/noyaux-masse-energie/lesson.md:212` | « masse de départ des **centaines** de fois plus petite » | rapport de masses D+T vs n+U235 ≈ **47×** (dizaines) | med | domain-fact (cadrage) |
| 13 | Maths | `maths/probabilites-conditionnelles/lesson.md:85` | « $P(A\|B)=P(A\cap B)$ **uniquement** quand $P(B)=1$ » | aussi quand **$P(A\cap B)=0$** (cas dégénéré) ; la leçon la caveate déjà (« n'arrive jamais au bac ») | med | domain-fact (impact minime, auto-caveaté) |
| 14 | Maths | `maths/geometrie-espace/lesson.md:134-224` | produit vectoriel ∧ et produit mixte présentés comme outils de cours | **calculs tous exacts** ; question : le produit vectoriel est-il au cadre SM ? (l'auteur l'a déjà noté :520-526) | low | cadre-scope |
| 15 | SVT | `svt/genetique-humaine/lesson.md:46` | drépanocytose « maladie génétique **rare** » | pas rare — la monogénique grave la plus fréquente au monde, présente au Maroc ; molécularement HbA/HbS **codominants** (utilisée ici en récessif simple) | med | cadre-scope/domain-fact |
| 16 | SVT | `svt/genetique-humaine/lesson.md:7` | daltonisme « beaucoup moins d'une femme sur 200 » | q_mâle≈1/12 → q²_femme≈1/145 ; taux empirique ~1/200–1/250 → **autour de** 1/200, pas « beaucoup moins » | med | domain-fact (niveau accroche) |
| 17 | SVT | `svt/theorie-tectonique-plaques/lesson.md:164` | « au large du Japon la plaque pacifique plonge sous la plaque **eurasiatique** » | sous la plaque **Okhotsk / nord-américaine** (NE Japon) ; simplification manuel très courante, défendable au bac | low | cadre-scope |

## Investigated and withdrawn (do not re-flag)

- `maths/probabilites-conditionnelles/lesson.md:182` — `$P(B\|A)$` in a
  markdown table. Suspected ‖ double-bar. **FALSE POSITIVE** (B1, re-affirmed):
  `\|` is correct table escaping; KaTeX gets `|`; served HTML renders
  `P(B|A)`; page carries 0 `.katex-error`. Rendered truth over source reading.

## Per-subject substantive counts + confidence

| Subject | Lessons | Fully clean | With findings | P0 | P1 | P2 | P3 | high-conf | cadre-scope |
|---|---|---|---|---|---|---|---|---|---|
| PC | 25 | 21 | 4 | 0 | 1 | 0 | 8 | 5 | 0 |
| Maths | 14 | 11 | 3 | 0 | 1 | 0 | 2 | 1 | 2 |
| SVT | 11 | 7 | 4 | 0 | 0 | 2 | 3 | 1 | 3 |
| Philo | 11 | 11 | 0 | 0 | 0 | 0 | 0 | — | — |
| **All** | **61** | **50** | **11** | **0** | **2*** | **2** | **13** | **7** | **5** |

*P1 count = 2 findings (the He⁺ v+T is one physics defect across two lines;
the anneau is one). Where the owner's eye is decisive: **PC #1 (He⁺)** —
domain-fact, triple-confirmed, high; **Maths #2 (anneau)** and **SVT #3 (HW
count)** — cadre-scope, need your ruling on the examined curriculum.

## Verified-clean lessons (a real result, not a null one)

**PC (21):** dipole-rl, rc-charge, systemes-oscillants, chute-mouvements-plans,
lois-de-newton, rotation-axe-fixe, aspects-energetiques,
ondes-mecaniques-progressives, ondes-mecaniques-periodiques,
propagation-onde-lumineuse, ondes-em-modulation, decroissance-radioactive,
suivi-temporel-vitesse, transformations-lentes-rapides, controle-catalyse,
etat-equilibre, transformations-deux-sens, reactions-acido-basiques,
esterification-hydrolyse, piles, electrolyse.
**Maths (11):** suites-numeriques, nombres-complexes-1, nombres-complexes-2,
calcul-integral, derivabilite-etude-fonctions, arithmetique,
fonction-exponentielle, fonction-logarithme, equations-differentielles,
limites-continuite, denombrement.
**SVT (7):** transmission-caracteres, liberation-energie-matiere-organique,
soi-non-soi, moyens-de-defense, dysfonctionnements-immunitaires,
chaines-de-montagnes, granitisation-deformation.
**Philo (11):** all — every author, date, work title and quotation verified
(Descartes 1637/1641, Kant 1785/1797, Hobbes 1651, Rousseau 1755/1762,
Marx 1848/1859, Popper, Bloch †1944, Hume 1739, Rawls 1971, Kelsen 1934…).

## Method note (the guard is process, not a check)

Content correctness is not dom-truth-able — no selector proves a physics
number right. The guard for this class is the **recompute-agent sweep
itself**: six independent Python auditors, each recomputing twice, cross-
checking the known docket items. Re-run it on any content change to a
numeric lesson (the six briefs are reproducible from this docket's scope
lists). dom-truth stays the mechanical net (129 checks); this docket is the
numerical net.
