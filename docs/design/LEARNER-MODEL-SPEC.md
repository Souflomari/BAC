# LEARNER-MODEL-SPEC — des événements bruts à « ce que l'élève maîtrise »

**Statut :** OWNER-DIRECTED (arc persistance) — direction posée ; chaque
seuil ci-dessous est FABLE-DECIDED / OWNER-REVIEW-PENDING avec sa raison,
consigné au ledger §14. **Rien ici ne touche un projet vivant** : les
schémas nouveaux sont des BROUILLONS (`docs/drafts/migrations/`).
**Prior art consommé, pas réinventé** : migrations 040–047 + ADR
0007/0011/0012/0013, DASHBOARD-SPEC (contrat StudentState + honest-state),
RULES §§0–3.

---

## 0. Les règles dures héritées (inchangées, re-déclarées exécutoires)

1. **Active / Cleared / Unassessed** (ADR 0011:195-219) — contrat de
   COUCHE DE LECTURE, jamais une colonne DB. Trois états de sortie par
   (élève, misconception) ; « non détecté » ne s'effondre JAMAIS en
   « pas de misconception » (le mode d'échec « false-completeness »,
   ADR 0011:209-214).
2. **Plancher d'évaluation** (ADR 0011:174-180) : une misconception n'est
   évaluable que si la banque publie **≥ 3 items** qui la ciblent
   (plancher de couverture, lisible dans `items.yaml` →
   `coverage_summary.floor_met`) ; l'exhibition demande **≥ 2 événements**.
   Sous l'un ou l'autre plancher → **Unassessed**, toujours.
3. **`exhibited_count` est un drapeau binaire** sous le plancher — jamais
   porteur de confiance (ADR 0012:199-204). On n'affiche jamais « vu 7
   fois » comme si c'était une mesure.
4. **Le chemin d'écriture ne classifie pas** (ADR 0013:93-96) : les RPC
   enregistrent des FAITS (événements) ; la classification A/C/U vit dans
   la lecture.
5. **Honest-state** (DASHBOARD-SPEC) : aucun état fabriqué ; chaque état
   non-défaut affiché porte `data-state-source`.

## 1. Le pont notion ↔ fondation (la décision structurante)

La fondation 040–047 est **clé skills (UUID)** ; le monde contenu actuel
est **clé notions** (`<matière>/<slug>`, 61 leçons, items.yaml). Décision :

- **v1 est clé notion, par chaînes** — `notion_id TEXT` (`"pc/rlc-serie"`),
  `item_id TEXT`, `misconception_id TEXT`, sur le PRÉCÉDENT établi par 043
  (`misconception_id TEXT — string key into content, PAS un FK`). Le
  contenu est la vérité filesystem ; on ne le duplique pas en registre DB.
- `user_misconception_states` (skills) reste INTACTE — c'est la lane
  Flutter/héritage. Le monde notion reçoit sa jumelle
  `user_notion_misconception_states` (brouillon 049) portant les MÊMES
  colonnes sémantiques et les MÊMES règles dures. Aucune migration de
  données ; les deux mondes coexistent jusqu'à une décision propriétaire
  de convergence. `[LEDGER 14.1]`

## 2. Les trois tables (brouillons — voir docs/drafts/migrations/)

- **`user_answer_events`** (brouillon 048) — le journal APPEND-ONLY, source
  de vérité : `(id, user_id, notion_id, item_id, kind
  'item'|'checkpoint'|'exercise_reveal', choice_index, is_correct,
  misconception_id NULL, chapter_index NULL, created_at)`. RLS : SELECT
  self ; écriture par RPC service_role-only. Les événements ne se
  corrigent pas — ils se succèdent.
- **`user_notion_progress`** (brouillon 048) — le PLI matérialisé par
  (user, notion) : `chapters_visited INT[]`, `items_attempted`,
  `items_correct`, `first_visit_at`, `last_visit_at`,
  `last_chapter_index`. Toujours recalculable depuis les événements ;
  maintenu par les mêmes RPC (écriture transactionnelle événement+pli).
- **`user_notion_misconception_states`** (brouillon 049) — la jumelle
  notion de 043 : PK `(user_id, notion_id, misconception_id)`,
  `exhibited_count`, `first/last_exhibited_at`, `remediation_attempts`,
  `cleared_at` (nom : `cleared_at`, pas `resolved_at` — l'état lu
  s'appelle Cleared ; divergence délibérée, `[LEDGER 14.2]`).

Discipline intégrale dans chaque brouillon : RLS dans la migration
créatrice (040), RPC d'écriture SECURITY DEFINER + EXECUTE service_role
uniquement (047), verify block qui affirme la CARDINALITÉ (046) avec le
cast `roles::text[]` (ADR 0007:58-61).

## 3. La classification en lecture — A/C/U par (élève, notion, misconception)

Entrées nommées : `floor_met(m)` (items.yaml, ≥3 items ciblant m),
`events(m)` (journal), l'état ligne (`exhibited_count`, `cleared_at`).

```
si NOT floor_met(m)                        → Unassessed (« couverture insuffisante »)
sinon si exhibitions(m) ≥ 2 ET cleared_at IS NULL       → Active
sinon si cleared_at IS NOT NULL                          → Cleared
sinon (0 ou 1 exhibition, plancher couvert)              → Unassessed
```

- `exhibitions(m)` = nombre d'ÉVÉNEMENTS d'exhibition distincts (journal),
  pas `exhibited_count` (qui reste le drapeau binaire de la ligne d'état).
- **Clearing v1** (déterministe) : `cleared_at` est posé par le RPC quand,
  APRÈS la dernière exhibition, l'élève répond correctement à **2 items
  distincts** ciblant m sans nouvelle exhibition entre eux. Une exhibition
  postérieure ré-ouvre (cleared_at → NULL, remediation_attempts += 1).
  Seuil 2 : symétrique du plancher d'exhibition ; un seul succès peut être
  de la chance ; trois serait décourageant. `[LEDGER 14.3]`
- **Langue élève** (le contrat porté jusqu'à l'écran) :
  Active → « **À travailler** : {label de la misconception} » ;
  Cleared → « **Surmontée** : {label} » ;
  Unassessed → « **Pas encore évaluée** » (avec la raison : « il te faut
  encore des exercices sur ce point » ou « couverture à venir »).
  L'écran ne montre JAMAIS un vide là où l'état est Unassessed.

## 4. StudentState — le remplissage du contrat DASHBOARD-SPEC

`StudentState.perNotion[n]` se dérive ainsi (chaque règle affichable en
une phrase — si la phrase honnête n'existe pas, l'état n'existe pas) :

| État affiché | Dérivation (signaux nommés) |
|---|---|
| non-ouvert | aucune ligne user_notion_progress |
| entamé (ch. k/N) | chapters_visited ≠ ∅ ; k = max+1 visité, N du contenu |
| lu | chapters_visited couvre 1..N (N au moment de la visite ; si le contenu grandit, l'état RÉGRESSE honnêtement à entamé) `[LEDGER 14.4]` |
| exercé (n items) | items_attempted > 0 (le compte affiché = attempted, jamais un %) |
| à revoir | lu ET last_visit_at > 21 jours `[LEDGER 14.5 : 21 j ≈ mi-chemin d'un trimestre de révision bac ; PAS une courbe d'oubli prétendue — v1 assume un seuil simple et le dit]` |

`lastSession` = la ligne progress au `last_visit_at` max.

## 5. « Quoi étudier ensuite » v1 — déterministe, explicable, traçable

UNE recommandation (bible §8 : une seule, confiante). Priorité stricte,
premier prédicat vrai gagne ; chaque sortie porte `data-reco-source` :

1. `misconception-active` — ∃ misconception Active → la notion de la plus
   ANCIENNE `last_exhibited_at` (la plus mûre pour la remédiation), ancrée
   au chapitre de ses items. Texte : « Reprends {notion} — un point précis
   te fait encore trébucher : {label}. »
2. `reprise` — ∃ entamé non-lu → la lastSession. « Continue {notion},
   chapitre k/N. »
3. `revision` — ∃ à revoir → le plus ancien last_visit_at. « Ça fait
   {j} jours — refais un passage sur {notion}. »
4. `parcours` — sinon la première notion non-ouverte de l'ordre
   curriculaire de la filière. « Ensuite dans le parcours : {notion}. »

Aucun score composite, aucune pondération opaque : un ordre lexical de
prédicats nommés. `[LEDGER 14.6 : l'ordre misconception > reprise >
révision > parcours — la faute active est le signal le plus actionnable
d'un tuteur ; owner peut inverser 1↔2]`

## 6. Retour espacé — v1 = le seuil « à revoir » seulement

La planification par intervalles (SM-2 et parents) est **explicitement
DIFFÉRÉE** : sans données réelles d'oubli par notion, des intervalles
inventés seraient de la pseudo-science habillée en pédagogie —
anti-honest-state. v1 n'a QUE le seuil 21 j (§4) et le dit à l'élève en
clair. La v2 (intervalle adaptatif) exige : ≥ un trimestre d'événements
réels + une décision propriétaire. `[LEDGER 14.7]`

## 7. Rendus dégradés

- **Zéro donnée** : DASHBOARD-SPEC §3 inchangé (sommaire calme, jamais un
  déficit).
- **Épars** (des événements, mais planchers non atteints) : la carte de
  maîtrise montre entamé/lu/exercé (dérivables) ; le panneau misconceptions
  dit « Pas encore assez d'exercices pour un diagnostic fiable — encore
  {3−n} questions sur ce point » ; la reco tombe aux prédicats 2–4.
- **Riche** : tout §3–§5 actif.

## 8. Vérité et gardes

- dom-truth : chaque état non-défaut porte `data-state-source` ; la reco
  porte `data-reco-source` ∈ {misconception-active, reprise, revision,
  parcours} ; la garde anti-fabrication (%/streak/XP/maîtrisé) s'étend à
  l'état riche — « maîtrisé » reste BANNI même avec données (le mot promet
  plus que le modèle ne sait). `[LEDGER 14.8]`
- La classification A/C/U est du code pur (lecture) → tests unitaires sur
  table de cas, pas dom-truth.

## Retraits et corrections

*(néant pour l'instant)*
