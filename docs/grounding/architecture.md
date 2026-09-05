# architecture.md — ce qui existe aujourd'hui

> **Re-mesuré le 2026-09-05**, contre le dépôt, commande par commande. La
> version précédente décrivait l'application **Flutter** comme l'état
> courant et affirmait que « Next.js n'apparaît nulle part dans le dépôt » —
> vrai quand elle a été écrite (2026-06), faux depuis la reconstruction
> (ADR 0016). Elle est archivée telle quelle sous
> `docs/archive/architecture-ere-flutter-2026-06.md`, avec l'aperçu qui
> l'accompagnait (`docs/archive/architecture-apercu-ere-flutter.md`) : ce
> sont des documents d'HISTOIRE, pas d'orientation.
>
> **Ce document est le « où nous en sommes »** que `.claude/CLAUDE.md`
> désigne. Il dit ce qui EST, avec de quoi le re-vérifier. Il ne dit pas ce
> qu'il faudrait faire (c'est `docs/product/VISION.md`), ni comment on
> travaille (`docs/Rules/RULES.md`), ni pourquoi on en est là
> (`docs/decisions/`).
>
> **La règle qui lui donne sa valeur :** chaque chiffre ci-dessous est
> accompagné de la commande qui le produit. Un document d'état que rien ne
> réexécute est juste le jour où on l'écrit, et faux le lendemain — c'est
> exactement ce qui est arrivé à la version précédente.

---

## 0. En une phrase

Un site **Next.js statique** qui rend un **corpus de fichiers** (62 leçons
écrites à la main, avec leurs items, exercices et figures), adossé à un
**Supabase** qui ne sert qu'à l'état de l'élève — et dont la synchro de
production reste **NON VÉRIFIÉE**.

---

## 1. La pile, mesurée

| Couche | Ce que c'est | Où |
|---|---|---|
| Frontend | **Next.js 14.2.35** (App Router) + React 18.3 + Tailwind, déployé sur Vercel | `web/` |
| Rendu | **Statique** (SSG) — 122 pages prérendues au build | `web/.next` |
| Maths | **KaTeX** rendu côté serveur (texte vivant, jamais des images) | `rehype-katex`, `web/src/lib/rehypeKatexHtml.ts` |
| Contenu | **Des fichiers**, pas des lignes de base de données | `content/<matière>/<notion>/` |
| Backend | **Supabase** (Postgres + Auth + Storage + Edge Functions), ref `iwoydyudjondihzzsqay`, EU-Central | `backend/supabase/` |
| Design | Jetons uniques dans `tokens.ts`, qui génèrent les variables CSS et la config Tailwind | `web/src/lib/tokens.ts` |
| Animations | Manim (lane « explication animée », ADR 0028) | `animations/` |

**Il n'y a plus d'application Flutter.** Les 19 fichiers `.dart` restants
sont des encodeurs JSON de graine sous `backend/seed/` — des outils
d'alimentation de migrations, pas une application.

```sh
find . -name '*.dart' -not -path './node_modules/*'   # 19, tous sous backend/seed/
node -e "console.log(require('./web/package.json').dependencies.next)"
```

---

## 2. Ce que contient le dépôt

```
web/          le site (102 fichiers .ts/.tsx sous src/, 49 scripts sous scripts/)
content/      le corpus : 4 matières, 62 notions
backend/      supabase/ (migrations, functions, config) + seed/
docs/         vision, règles, ADR, audits, specs, sujets d'annales, cadre
animations/   la lane Manim (scènes, style, manifeste)
scripts/      outils Python transverses (typographie, figures, publication)
work-orders/  les bons de travail de conversion d'annales
```

```sh
ls -d content/*/*/ | wc -l                      # 62 notions
find web/src -name '*.ts' -o -name '*.tsx' | wc -l
ls backend/supabase/migrations/*.sql | wc -l    # 50 (49 numérotées + 1 utilitaire)
```

---

## 3. Le frontend

### 3.1 Les routes

Huit routes, toutes statiques sauf la surface authentifiée :

```
/                       le tableau de bord
/matieres/[subject]     la carte du programme d'une matière
/notions/[subject]/[slug]  une leçon (62 pages)
/examens                l'index des épreuves
/examens/[id]           une épreuve assemblée (39 pages)
/commencer  /connexion  /atelier  /options/wide/[v]
```

**Le site est SSG et doit le rester** (AUTH-SPEC §2/§4). Le `matcher` du
middleware ne couvre QUE `/moi/*` et `/connexion` : jamais `/notions/*`,
jamais `/matieres/*`, jamais `/`. Étendre ce matcher rendrait le corpus
dynamique — et casserait d'un coup la pagination, l'impression et la moitié
des instruments.

### 3.2 Comment une leçon se rend

1. `lib/content.ts` lit le répertoire de la notion (aucune base de données) ;
2. `lib/chapters.ts` découpe la prose aux titres `##` — un chapitre par
   titre ;
3. `NotionBody` transforme les marqueurs sur leur propre ligne
   (`[[figure:…]]`, `[[motion:…]]`, `[[embed:…]]`, `[[checkpoint:…]]`,
   `[[exercise:…]]`, `[[derivation:…]]`) en composants, et confie le reste à
   `LessonRenderer` ;
4. `ChapterShell` pagine : un chapitre visible à la fois, le rail de gauche
   navigue (LESSON-EXPERIENCE-SPEC §1.4).

Un marqueur ne se résout QUE s'il est seul sur sa ligne. `validate-content`
garde cette règle, et vérifie que chaque marqueur pointe un asset ou un id
qui existe.

### 3.3 Le lien, et le préchargement

Tous les liens du produit passent par **un seul composant**,
`web/src/components/ui/Lien.tsx`. C'est là que vit la politique de
préchargement : à l'INTENTION (survol, focus, doigt posé), jamais au champ
de vision, et rien du tout si l'élève a activé l'économiseur de données
(`docs/audits/donnees-et-forfait.md`).

### 3.4 Le design

`web/src/lib/tokens.ts` est la source unique : il GÉNÈRE les variables CSS
et la configuration Tailwind. Le code des composants ne parle que par alias
nommés, et `scripts/token-gate.mjs` échoue si une valeur arbitraire
apparaît.

---

## 4. Le contenu — et c'est le fait d'architecture le plus important

**Une notion est un répertoire de fichiers.** Rien de ce que l'élève lit ne
vient de la base de données.

```
content/pc/rlc-serie/
  lesson.md          la leçon (prose + marqueurs, titres ## = chapitres)
  items.yaml         le banc de fin — les items diagnostiques
  checkpoints.yaml   les points d'arrêt posés DANS la leçon
  exercises.yaml     les exercices d'annales convertis
  bank.yaml          le banc d'entraînement (annales)
  derivations.yaml   les dérivations dépliables
  retenir.json       la zone « à retenir » (≥1536 px)
  media/             SVG statiques, .motion.svg + .motion.json, .stages.json
  spec.md            la conception pédagogique de la notion
```

Couverture mesurée par matière :

| matière | notions | `bank.yaml` | `exercises.yaml` | `checkpoints.yaml` |
|---|---:|---:|---:|---:|
| maths | 14 | 14 | 14 | 14 |
| pc | 25 | 24 | 25 | 25 |
| philo | 12 | **0** | 10 | 12 |
| svt | 11 | **0** | **0** | 11 |

Les trous ne sont pas des oublis : ils sont **arbitrés ou bloqués**, et
`docs/HANDOFF.md` §10.6 dit lesquels (la SVT n'a aucune banque d'annales
source ; la philo attend une décision sur le sens d'un banc pour une épreuve
de dissertation ; `pc/atome-mecanique-newton` est absente des 21 sessions
couvertes, décision verrouillée).

```sh
for m in maths pc philo svt; do
  echo "$m $(ls -d content/$m/*/ | wc -l) $(ls content/$m/*/bank.yaml 2>/dev/null | wc -l)"
done
```

---

## 5. Le backend — tel que les MIGRATIONS le déclarent

> **Attention, et ce n'est pas une formule de prudence.** Tout ce paragraphe
> décrit ce que les fichiers de migration DÉCLARENT. **La synchro de
> production reste NON VÉRIFIÉE** (`.claude/CLAUDE.md`) : personne n'a
> confirmé, depuis la dormance, que l'état de production correspond à cet
> historique. Ne pas lire ce tableau comme une description de la base
> vivante.

- **49 migrations numérotées** (001–051, trous assumés en 019 et 035) plus
  `_apply_002_to_006_idempotent.sql`. Append-only : **on n'édite jamais une
  migration déjà passée en production**, on en écrit une nouvelle.
- **25 tables** créées. `subjects`, `stream_subjects`, `topics`, `skills`,
  `skill_prerequisites`, `items`, `badges` (le curriculum) ; `profiles`,
  `sessions`, `user_*` (l'état de l'élève) ; `bac_exams`, `exam_questions`
  (les annales de l'ère précédente).
- **RLS déclarée sur les 25**, plus `storage.objects`. La lacune historique
  des sept tables de curriculum a été fermée par la migration 040.
- **23 fonctions**, dont les quatre du chemin d'écriture actuel :
  `record_answer_event` et `record_chapter_visit` (mig. 048),
  `record_notion_misconception_exhibited` et `…_cleared` (mig. 049). Les
  quatre sont **REVOKE de `PUBLIC`, `authenticated`, `anon` puis GRANT à
  `service_role` seulement** — la non-négociable des RPC d'écriture d'état
  par utilisateur.
- **6 fonctions edge** : `record-notion-event` (le chemin d'écriture
  courant), `submit-answer`, `progress`, `next-session`, `daily-quests`,
  `delete-self-account`, plus `_shared`.

```sh
grep -c "ENABLE ROW LEVEL SECURITY" backend/supabase/migrations/*.sql | grep -v ':0'
grep -n "GRANT\|REVOKE" backend/supabase/migrations/048_*.sql
```

---

## 6. La boucle qui fait le produit

C'est la chaîne à comprendre avant toute autre :

```
items.yaml : un distracteur porte `misconception: <id>`
      ↓  scripts/build-learner-inputs.mjs
web/src/lib/learner-model-data.json      { notion → { misconception → nb d'items } }
backend/…/record-notion-event/item-misconceptions.json   (le même, pour l'edge function)
      ↓  l'élève répond
web/src/lib/events/{payload,emitter}.ts  → POST record-notion-event
      ↓
user_answer_events (journal) + user_notion_misconception_states (état)
      ↓
web/src/lib/learner-model.ts             ce que le produit propose ensuite
```

Deux règles de cette chaîne, non négociables parce que tout en dépend :

1. **Le modèle ne déclare une misconception ÉVALUABLE qu'à partir de 3 items
   du BANC DE FIN.** Les points d'arrêt ne comptent pas — sinon un item
   cloné en ligne serait compté deux fois. Le corpus est aujourd'hui à
   **767 misconceptions déclarées-ou-taguées, 767 évaluables, 0 sous le
   plancher, 62 notions sur 62** (`couverture-diagnostique --porte`).
2. **L'envoi est feu-et-oubli** : un réessai, à 4 s, puis la réponse est
   perdue, sans que l'élève ni le produit ne le sachent
   (`docs/audits/envoi-des-reponses.md`).

---

## 7. Les instruments

Le harnais ne trouve que ce qu'on lui demande de regarder. La liste de ce
qu'il regarde — **et de ce qu'il ne regarde pas** — vit dans
`docs/audits/INSTRUMENTS.md`, avec les angles morts encore ouverts. Les
portes qui cassent l'intégration sont dans `.github/workflows/gates.yml`.

---

## 8. Ce que ce document ne dit PAS

- **L'état réel de la production.** Voir §5. C'est la première chose à
  vérifier en session supervisée avant toute nouvelle migration.
- **Ce qui est BON.** Il décrit une structure, pas une qualité. La qualité
  pédagogique se juge contre `docs/product/VISION.md` ; la qualité visuelle
  contre `docs/product/DESIGN-BIBLE.md`.
- **Ce qui reste à faire.** `docs/HANDOFF.md` §0 et §10.6 tiennent les
  décisions ouvertes ; `docs/grounding/known-issues.md` tient le reste.

---

## Retraits et corrections

- **2026-09-05** — réécriture complète. La version précédente (2026-06)
  décrivait l'application Flutter comme l'état courant. Elle n'a pas été
  corrigée passage par passage : elle a été archivée et remplacée, parce que
  sa prémisse — la pile — avait changé. La proposition de réconciliation de
  2026-06 (`docs/reestablish-state/proposed-reconciliation--grounding-architecture.md`)
  déclarait la question du frontend « bloquée sur une décision humaine » ;
  cette décision a été rendue depuis, par l'ADR 0016 et par
  `.claude/CLAUDE.md` (« The frontend architecture — RESOLVED »). Le blocage
  est donc levé, et c'est ce qui autorise cette réécriture.
- Les corrections mécaniques listées par cette même proposition (nombres de
  migrations, RLS des tables de curriculum, RPC manquants, table
  `user_misconception_states`) sont **incorporées ici par re-mesure**, pas
  recopiées : les chiffres de 2026-06 étaient eux-mêmes périmés.
