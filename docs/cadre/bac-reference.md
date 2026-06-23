# Bac exam-shape reference — Moroccan science baccalauréat (2ème Bac)

> The machine-readable companion to this document is `docs/cadre/cadre.yaml`.
> Provenance is cited inline: **research-consensus** (both syntheses agree, on
> secondary sources), **cadre-confirmed** (verified against an official cadre PDF
> we hold), or **contested** (secondary sources disagree; a working value is
> adopted and flagged pending the official source).

## 1. Purpose & scope

This is the exam **SHAPE** reference: streams, coefficients, durations, domain
weights, habileté (cognitive-demand) ratios, the grading architecture, and the
per-subject paper format. It is the companion to — and a *different layer* from —
the per-filière curriculum **BOUNDARIES** in `docs/cadre/curriculum/`, which carry
the in-scope *savoir-faire* content (ADR 0018). Shape answers "how is the exam
weighted and built?"; boundary answers "what is in and out of scope?". This
reference is reconciled from **two independent research syntheses** that converge
on every load-bearing fact; the one genuine conflict (two coefficient cells) is
flagged, not hidden.

## 2. Grading architecture (research-consensus)

The bac **moyenne** combines three components:

- **Examen national** — 50% (sat in 2ème Bac, standardized nationwide),
- **Examen régional** — 25% (sat at the end of 1ère Bac),
- **Contrôle continu** — 25% (2ème Bac).

For **post-bac concours preselection**, only the standardized components count,
reweighted to **national 75% / régional 25%** (contrôle continu excluded).

Thresholds and rules:

- **Pass:** moyenne ≥ **10/20**.
- **Eliminatory:** any **national** subject **< 5/20** is an automatic fail;
  a **régional** result **< 3/20** is eliminatory, and there is **no régional
  rattrapage**.
- **Rattrapage:** a moyenne in **[8, 9.99]** routes to the rattrapage session.
- **Mentions** (/20): Passable 10–12, Assez Bien 12–14, Bien 14–16,
  Très Bien 16–18, Excellent ≥ 18.

## 3. The Cadre de Référence machinery

Each subject×stream **cadre de référence** guarantees three properties:
**couverture** (every domain is tested), **représentativité** (each domain and
skill is weighted in proportion to its instructional importance), and
**conformité** (assessed situations match the taught competences and conditions).
These are operationalized by a **Tableau de Spécification** — a two-way matrix
crossing content domains × cognitive (habileté) levels that maps every point of
the /20 scale. National-exam items are built directly from that matrix, which is
why the domain weights and habileté ratios below are not descriptive trivia but
the actual construction targets.

## 4. The elaboration process (source: research synthesis 2)

National exams are produced under the **CNEEO** (MEN). Regional teachers draft
proposals against the cadre; regional inspectors filter them; up to ~**48
versions per subject** go **under seal** to national commissions of **4–12
inspectors** appointed by the Minister. Commissions meet **≥ 6 times, ≥ 3 days
each**, **sequestered** (accommodated by the ministry, zero leaks), and they
**rework rather than merely select** the strongest proposals — changing
variables, contexts, and data. Each subject yields **three versions**: *normale*,
*rattrapage*, *réserve*. **Two non-drafting members sit the exam** under real
conditions to catch ambiguities and translation issues (especially for the
French/BIOF option). After administration, an **"experimental correction"** grades
~10 sample copies collectively to calibrate the *grille de correction*.

## 5. Stream map & coefficients (national-exam subjects)

| Subject            | SM-A | SM-B | PC (Sciences Physiques)   | SVT                       |
|--------------------|:----:|:----:|---------------------------|---------------------------|
| Mathématiques      |  9   |  9   | 7 [contested: 7-vs-5]     | 7 [contested: 7-vs-3/5]   |
| Physique-Chimie    |  7   |  7   | 7                         | 5                         |
| SVT                |  3   | N/A  | 5                         | 7                         |
| Sciences Ingénieur | N/A  |  3   | N/A                       | N/A                       |
| Philosophie        |  2   |  2   | 2                         | 2                         |
| Langue étrangère   |  2   |  2   | 2                         | 2                         |

The **Maths-in-PC** and **Maths-in-SVT** cells are adopted as **WORKING
consensus** (value **7**, taken from the cleaner of the two syntheses) and are
**PENDING the official MEN per-stream coefficient table**, which is the definitive
tiebreaker. **Reliably established** (not contested): SM-Maths = 9, SVT-in-SVT =
7, SVT-in-PC = 5, and PC = 7 in the SM and PC streams.

**Durations:** SM-stream maths & PC = **4h**; Sciences-Expérimentales streams =
**3h**. The **PC-stream physique-chimie = 3h** figure is **cadre-confirmed** (2025
PC cadre, p.4), which resolves a previously-flagged 3h-vs-4h question.

## 6. Niveaux d'habileté (cognitive-demand ratios)

The ratios differ by **subject *and* stream**:

- **Maths, Sciences Mathématiques (SM-A/B):** 40% application directe / 40%
  application non-explicite / 20% synthèse (research-consensus).
- **Maths, Sciences Expérimentales (PC/SVT):** 50% / 35% / 15%
  (**cadre-confirmed**, 2022 maths cadre).
- **Physique-Chimie, Sciences Expérimentales:** 50% utilisation des ressources /
  15% application expérimentale / 35% résolution de problème (**cadre-confirmed**,
  2025 PC cadre — note the **subject-specific split**, distinct from the maths
  triplet).

These ministry-published ratios are the **bac-fidelity critic's rubric**, and they
**match the per-sous-domaine figures** in the curriculum boundary files (same
source).

## 7. The cross-stream divergence (the load-bearing insight)

The **same nominal subject differs structurally by stream — not just in
difficulty but in CONTENT.** SM maths (coef **9**, **4h**) adds whole domains
absent from SExp maths: arithmetic (Bézout / Gauss / Fermat / congruences),
algebraic structures (groups / rings / fields / vector spaces), Riemann sums, and
Rolle & accroissements finis. Its domain split is **50/50** (vs **55/45** in
SExp) and its cognitive mix is harder (**20% vs 15% synthèse**, **40% vs 50%
application directe**). Likewise, PC is materially harder in the SM stream (**4h**,
denser cadre) than in the SVT stream (**3h**, coef **5**).

**Implication for the product:** maintain **stream-specific content trees** —
"bac maths" or "bac PC" is *not one thing*. This is exactly why the curriculum
boundaries key on **filière as a top-level dimension** (ADR 0018).

## 8. Per-subject exam format

- **Physique-Chimie:** **3–4 independent thematic exercises**; **non-programmable
  scientific calculator** (cadre-confirmed).
- **SVT:** a two-part paper — **Partie I restitution (5 pts)** + **Partie II
  raisonnement scientifique & communication graphique (15 pts)**.
- **Mathématiques:** several exercises, with a **terminal synthesis question**
  carrying the niveau-3 demand.

## 9. Standards anchoring & context

The system is **competency-based** (Approche Par Compétences, from the Charte
Nationale 1999) and anchors its habileté levels to the **TIMSS/PISA cognitive
domains** (knowing / applying / reasoning). **BIOF** (option français) is the same
national bac with the scientific subjects taught and examined in French; legal
basis **loi-cadre n° 51-17** (9 Aug 2019), with BIOF classes instituted from 2015
under the Vision stratégique 2015–2030.

## 10. Authoritative sources

Official cadres are issued by the **Centre National des Examens et de l'Évaluation
des apprentissages (CNEEO, MEN)**. Past national exams and corrigés are on the
established educational repositories. The official cadre PDFs we already hold —
the **2022 maths (Sciences Expérimentales)** and **2025 PC** cadres — live in
`docs/cadre/sources/`.

## 11. Caveats

Both syntheses lean on **secondary sources for the per-stream coefficients**. The
single highest-value upgrade is obtaining the raw **official MEN per-stream
coefficient table** ("جدول توزيع المواد والمعاملات"), which would let the two
contested cells drop their pending flags. Where a held cadre PDF resolves a
research-flagged uncertainty, **the cadre is authoritative** (e.g., PC-stream PC
duration = 3h). The **session-2026 dates** in `cadre.yaml` are from the MEN
2025–2026 calendar.
