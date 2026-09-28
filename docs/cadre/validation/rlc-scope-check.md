# Boundary-application check — Oscillations libres dans un circuit RLC série

> **What this is.** A Stage-4 *wiring check*, produced by mechanically applying
> the pedagogy-architect Phase-1 boundary-scoping rules (ADR 0018) to the
> committed boundary `docs/cadre/curriculum/pc-physique-chimie.yaml`. It carries
> the boundary forward for the notion and **nothing more** — it is **NOT** a
> pedagogy spec: no misconception inventory, no difficulty ramp, no lesson. The
> human reviews whether the boundary came through; quality judgment is theirs.
>
> Generated from the YAML, not hand-transcribed.

## 1. Identification (boundary path)
- **filiere:** `sciences_physiques` · **matiere:** `physique_chimie` · **serie:** `sciences_experimentales` · **cadre:** 2025
- **domaine:** `physique` (Physique) -> **sous-domaine:** `electricite` (Électricité) -> **chapitre:** `rlc_serie`
- **notion:** Oscillations libres dans un circuit RLC série

## 2. In-scope savoir-faire (the lesson covers these; it does NOT exceed them)
- Définir et reconnaître les régimes périodique, pseudo-périodique et apériodique.
- Reconnaître/représenter les courbes u_C(t) pour les trois régimes et les exploiter.
- Établir l'équation différentielle (u_C ou charge q(t)) dans le cas d'un amortissement NÉGLIGEABLE et vérifier sa solution.
- Connaître et exploiter l'expression de q(t) ; en déduire i(t) et l'exploiter.
- Connaître et exploiter l'expression de la période propre T₀.
- Expliquer énergétiquement les trois régimes ; connaître/exploiter les diagrammes d'énergie et l'énergie totale du circuit.
- Établir l'équation différentielle (u_C ou charge) dans le cas d'un amortissement.
- Connaître le rôle du dispositif d'entretien : compenser l'énergie dissipée par effet Joule.
- Établir l'équation différentielle d'un RLC entretenu par un générateur délivrant u_G(t) = k·i(t).
- Exploiter des documents expérimentaux : tensions, régimes, influence de R/L/C, pseudo-période et période propre.
- Proposer un montage d'étude des oscillations libres ; brancher oscilloscope / acquisition.

## 3. HARD constraints carried forward

### 3a. `limites` (on the chapitre — depth boundaries; do not teach beyond)
- Cas AMORTI : on ÉTABLIT l'équation différentielle SEULEMENT. On ne la résout PAS analytiquement — pas de pseudo-période en fonction de R,L,C, pas de coefficient d'amortissement, pas d'enveloppe exponentielle en forme close. Le régime amorti est traité qualitativement, énergétiquement et expérimentalement.
- Solution analytique fermée UNIQUEMENT dans le cas non amorti (LC, résistance négligeable) : q(t) sinusoïdale, T₀ = 2π√(LC).

### 3b. `exclusions` (on the sous-domaine `electricite` — apply to this chapitre; do not enter)
- **Régime sinusoïdal forcé d'un RLC (résonance forcée, impédance, déphasage, phaseurs)** — Le cadre traite les oscillations LIBRES et l'ENTRETIEN, jamais le régime forcé piloté. (NB : la résonance MÉCANIQUE existe en Mécanique — ne pas confondre.)
- **Notation complexe / phaseurs pour les circuits** — Hors cadre ; non listé.
- **Puissance en régime alternatif (active/réactive, facteur de puissance)** — Hors cadre ; non listé.
- **Composants actifs comme objets d'étude (transistor, amplificateur opérationnel)** — Hors cadre ; seuls condensateur et bobine sont étudiés comme dipôles.

## 4. Targets (cite into the spec; downstream item-authoring matches the exam mix)
- **Sous-domaine weight (`poids.part_examen`):** **21%** of the exam (rang physique 2).
- **Habilete parts for this sous-domaine** (% of the whole exam):
  - Utilisation des ressources: 10.5
  - Application experimentale: 3.15 *(derived = 15% x 21%)*
  - Resolution de probleme: 7.35
- **As within-sous-domaine ratios:** Utilisation 50% / Application experimentale 15% / Resolution 35% — i.e. the exam-wide habilete ratios (Utilisation 50 / Application experimentale 15 / Resolution 35, cadre p.18-19).

---
*Check result: 11 savoir-faire, 2 limite(s) (chapitre), 4 exclusion(s) (sous-domaine) carried into scope.*
