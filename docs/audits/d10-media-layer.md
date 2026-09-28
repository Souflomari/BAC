# D10 — La couche média (figures, motion, interactifs)

**Date :** 6 juillet 2026 · **Branche :** `claude/vibrant-fermi-v1lxj5` (PR #2)
**Périmètre :** PC + Maths. **SVT exclue** sur directive explicite du
propriétaire (les contenus de biologie déclenchent les mesures de sécurité
du modèle Fable 5 utilisé pour la session ; la SVT reste en prose, intacte).

---

## Ce qui a été livré

### Figures statiques codées (SVG + tokens)

Chaque leçon non-stub de PC et de Maths porte désormais au moins une figure
codée, insérée par un marqueur `[[figure:slug]]` seul sur sa ligne.

- **PC — 25/25 leçons.** Vagues A (électricité/ondes/nucléaire, 13 fig.),
  B (mécanique, 12 fig.), C (chimie complète, 14 fig.), plus
  `atome-mecanique-newton` (niveaux d'énergie hydrogène réels + raies de
  Balmer). Les schémas de cellules (pile Daniell, électrolyse) et les
  schémas mécaniques (`plan-incline-forces`, `deux-chariots-inertie`) sont
  plafonnés à 680 px via `STRUCTURAL_SLUGS`.
- **Maths — 14/14 leçons.** Escalier des suites, aire sous/entre courbes,
  tangente/variations, courbes exp et ln, asymptotes + TVI, plan complexe,
  rotation + racines de l'unité, plan/normale + sphère-plan en cavalière
  divulguée, familles de solutions d'équa-diff, arbres de dénombrement,
  cascade d'Euclide à l'échelle, table de Cayley.
- **Deux refus honnêtes, documentés dans les rapports d'agents :**
  `congruence-horloge` (le R2 d'arithmétique est computationnel, pas
  positionnel) et `morphisme-schema` (la leçon de structures ne couvre pas
  les morphismes). Une figure qui ne sert pas la pédagogie n'est pas créée.
- Tous les aria-labels sont câblés à la main dans `FIGURE_ARIA_LABELS`
  (`web/src/components/notion/NotionBody.tsx`).

### Motion (MotionStage, beats cliquables)

Cinq nouvelles pièces, chacune choisie parce que *voir la chose évoluer*
est la pédagogie (jamais décoratif) :

| Slug | Leçon | Ce qu'elle tue |
|---|---|---|
| `onde-qui-avance` (pilote) | ondes-mecaniques-progressives | « l'onde transporte la matière » |
| `escalier-pas-a-pas` | suites-numeriques | la perte du geste de construction |
| `vecteurs-le-long-parabole` | chute-mouvements-plans | « v = 0 au sommet » |
| `population-aleatoire` | decroissance-radioactive | « les noyaux s'usent / les plus vieux partent » |
| `construction-modulation` | ondes-em-modulation | l'enveloppe « donnée » au lieu de construite |

Toutes vérifiées beat par beat en screenshots (clair + sombre), et
cohérentes avec leurs figures statiques sœurs (mêmes valeurs, même
géométrie quand c'est pertinent).

### Interactifs embarqués (curation PhET)

Trois descripteurs complets sur le modèle du gold `rlc-sandbox.json`
(caption de manipulation, garde-fous de cadre, câblage des misconceptions,
attribution CC-BY, fallback vers les figures statiques) :

- `projectile-sandbox` (chute, R5 — predict-then-reveal sur l'angle optimal)
- `ressort-sandbox` (systemes-oscillants, R2 + R6)
- `rc-sandbox` (rc-charge, R4 — τ = RC en manipulation)

Les six URLs (fr/en) ont été **vérifiées en direct (HTTP 200)** avant commit.

## La discipline qui a tenu

Pilote d'abord (une pièce, vérifiée en rendu, avant tout fan-out) ; agents
Sonnet 5 parallèles avec le contrat de rendu dans le brief (SVG text/tspan,
`var(--figure-*)`, pas de KaTeX/foreignObject/hex, viewBox seul, marqueur
seul sur sa ligne) ; par atterrissage : validate-content → build →
dom-truth (121/0 constant) → screenshots → commit → push. Le garde-marqueur
de `validate-content.mjs` fait échouer tout marqueur sans asset.

## Pièges opérationnels documentés en route

- `pkill -f "next start"` ne tue PAS le process `next-server` : trois
  séries de screenshots ont servi un build périmé. Toujours vérifier par
  `curl` qu'une coordonnée fraîche est servie avant de croire un screenshot.
- Deux découvertes moteur (MotionStage) faites par les agents :
  `"from": "below"` est un no-op silencieux (seuls up/down/left/right/none
  existent — la référence `regime-traces-forming.motion.json` porte ce bug
  bénin) ; `pulse-settle` force `autoAlpha:0` en pré-état, dangereux sur
  une cible déjà visible d'un beat antérieur.

## Reste à faire (délibérément différé)

1. **Embeds maths (GeoGebra/Desmos).** Différés : le contenu d'un applet
   ne peut pas être vérifié en headless ici, et un embed faux est pire
   qu'absent (honest-state). À curer avec un humain dans la boucle.
2. **`[[video:slug]]`** reste stubbé à null dans le renderer — décision
   produit à prendre (cf. décision ouverte n°4, outillage génératif).
3. **`rlc-serie/media/energy-exchange.svg`** (héritage) : couleurs hex au
   lieu des tokens + un intervalle crête-à-crête d'une courbe en cos²
   étiqueté « T₀ » alors que c'est physiquement T₀/2. À corriger.
4. **SVT** : toute la couche média (11 leçons) attend une session non-Fable.

## Retraits et corrections

*(néant pour l'instant)*
