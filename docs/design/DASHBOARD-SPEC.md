# DASHBOARD-SPEC — l'accueil devient un vrai tableau de bord

**Statut :** OWNER-DIRECTED (Day 12) — direction : « home becomes a real
dashboard; content composed, sides functional ». Spec seule, exécutable à
froid (standard LESSON-EXPERIENCE-SPEC : contrats, fichiers, vérification).
Fondations : home B1 session-first (ledger §5, FABLE-DECIDED /
OWNER-REVIEW-PENDING) + DESIGN-BIBLE §8 (périphérie fonctionnelle, cœur
calme) + la règle honest-state (absolue ici — un tableau de bord est LE
lieu où la fabrication de progrès s'invite ; elle est bannie).

---

## 0. Principe d'ordre

**L'élément primaire reste la session : « aujourd'hui / continuer ».**
Tout le reste compose AUTOUR de lui, jamais au-dessus. Un seul appel à
l'action primaire par écran (bible §7/§8) ; le dashboard est la SEULE
surface autorisée à une composition multi-colonnes (périphérie, pas cœur).

## 1. Anatomie (ordre DOM = ordre mobile, une colonne)

1. **Session du jour** — LA carte : leçon recommandée « continuer » /
   « commencer », temps de lecture réel, position de chapitre réelle si
   état présent (« Chapitre 4 / 10 »), motif de couverture. UN bouton.
2. **« Quoi étudier ensuite »** — UNE seule recommandation textuelle calme
   sous la carte (pas une liste) : dérivée de l'état si présent, sinon de
   l'ordre curriculaire honnête (première leçon non ouverte du parcours).
3. **Carte de maîtrise** — la vue par-notion : chaque notion un jeton
   calme (titre court + état). États AUTORISÉS (contrat StudentState §2) :
   `non-ouvert · entamé (ch. n/N) · lu · exercé (n items) · à revoir`.
   JAMAIS de pourcentage inventé, jamais de « maîtrisé » sans critère.
4. **Étagère-bibliothèque** — les couvertures (Cover.tsx, COVER-SPEC) par
   matière, l'existant B1 recomposé ; accès direct, pas de gamification.
5. **Progrès par matière** — une ligne par matière : « n leçons lues /
   N » + minutes réelles cumulées. Compte, pas score.
6. **Emplacement jalon-mérité** — spécifié, VIDE au lancement : un slot
   où un jalon RÉEL (première leçon finie, premier chapitre d'exercices
   réussi) pourra s'afficher sobrement. Pas de streaks, pas d'XP, pas de
   badges — « progress-made-vivid », engagement aux bords seulement.
   Le slot rend `null` tant que le jalon n'est pas défini ET gagné.

## 2. Le contrat StudentState (ce qui rend quand la persistance existe)

```ts
type StudentState = {
  lastSession: { notionId: string; chapterIndex: number; at: string } | null;
  perNotion: Record<string, {
    opened: boolean;
    chaptersVisited: number[];   // indices réels visités
    chaptersTotal: number;
    itemsAttempted: number;      // tentatives réelles, pas « vues »
    itemsCorrect: number;
    lastVisit: string;           // ISO
  }>;
};
```

- **Source future :** la lane production human-gated (supabase-architect,
  gate de sync d'abord — HANDOFF §0.4). AUCUN stockage navigateur en
  attendant (règle artefacts existante).
- **Dérivations autorisées :** `entamé` = chaptersVisited non vide ;
  `lu` = tous les chapitres visités ; `exercé` = itemsAttempted > 0 ;
  `à revoir` = lastVisit > 21 jours ET lu. Chaque règle est affichable
  telle quelle en infobulle — si la phrase d'explication ne peut pas être
  écrite honnêtement, l'état n'existe pas.

## 3. Rendu dégradé véridique (AUJOURD'HUI, sans persistance)

- Session du jour → **cadrage première-visite** : « Commence ici » sur la
  leçon d'entrée du parcours (règle d'éligibilité = gate propriétaire
  HANDOFF §0.5 — ne pas inventer) ; temps de lecture réels (existants).
- Quoi étudier ensuite → ordre curriculaire, formulé « Ensuite dans le
  parcours », jamais « Recommandé pour toi » (pas de « toi » sans état).
- Carte de maîtrise → tous les jetons `non-ouvert`, rendus comme un
  SOMMAIRE calme (pas une mer de gris culpabilisante) : l'état zéro est
  une table des matières, pas un déficit.
- Progrès par matière → « 14 leçons · ~6 h de lecture » (faits), pas
  « 0 % » (déficit fabriqué).
- Jalon → null (le slot n'apparaît pas).

## 4. Composition large (la seule surface multi-colonnes)

- **1280 :** deux colonnes — session+suivant (gauche, 2/3), carte de
  maîtrise (droite, 1/3) ; étagère + matières pleine largeur dessous.
- **1536 :** trois zones — session (centre-gauche), maîtrise (droite),
  matières (rail gauche fin) ; l'étagère pleine largeur.
- **1920 :** identique à 1536 avec marges accrues — PAS de 4e colonne ;
  le vide respire (leçon D8 : occupancy mesurée, pas remplissage).
- Mobile <600 : l'ordre DOM §1, une colonne, rien caché.

## 5. Invariants dom-truth (à ajouter avec le build)

- Honest-state étendu à CHAQUE élément : `notText:
  /\d+\s?%|maîtrisé|streak|série de|XP|points/i` sur tout le dashboard
  sans persistance ; la carte session ne contient PAS « continuer » en
  l'absence d'état (c'est « commencer »).
- Un seul élément `[data-primary-action]` sur la page.
- Jetons de maîtrise : count == nombre réel de notions listées
  (listNotions()) ; chaque jeton d'état ≠ non-ouvert DOIT porter
  `data-state-source` (l'ancre de la donnée réelle qui le justifie).
- Le slot jalon absent du DOM sans jalon gagné (motif AttemptFirst).
- Multi-colonnes : à 1280/1536/1920 la carte session est premier dans
  l'ordre de lecture (DOM order stable, colonnes par grid, pas de reorder).

## 6. Fichiers pressentis (le builder confirme)

`web/src/app/page.tsx` (recomposition), nouveaux
`web/src/components/dashboard/{SessionCard,MasteryMap,SubjectProgress,NextUp,MilestoneSlot}.tsx`,
`globals.css` (.dashboard-grid aux trois paliers), dom-truth (§5 ci-dessus),
shots home aux trois paliers × deux thèmes. Wireframes optionnels —
CETTE spec est le livrable.

## Retraits et corrections

*(néant pour l'instant)*
