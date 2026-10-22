# Les règles de travail

> Une page, réécrite le 2026-10-22 (ADR 0042). Elle remplace l'ancien RULES.md (305 lignes) et les
> « lois de méthode » des ADR 0031 à 0041. Ordre d'autorité : la [VISION](../product/VISION.md),
> puis ces règles, puis les agents. L'ancienne version reste lisible :
> `git show d3810007:docs/Rules/RULES.md`.

## Deux sortes de travail

- **Le produit et le contenu** (leçons, exercices, visuels, interface, documentation) : les agents
  construisent, vérifient, commitent et poussent sur la branche de travail, sans attendre.
- **La production** (la base Supabase, `main`) : chaque pas est décidé par le propriétaire.

Le propriétaire est le **rédacteur en chef** : il juge le produit rendu (la page, la leçon, le
pilote), pas le code. On lui apporte des choses à regarder et des questions précises.

## Sécurité de production — inchangée, non négociable

1. Aucune poussée en production sans décision explicite du propriétaire. Aucun agent ne pousse sur `main`.
2. Aucune poussée en production sans `scripts/branch-test.ps1` vert contre staging.
3. Chaque migration porte un bloc de vérification qui affirme la cardinalité après coup, et
   l'identité du contenu pour une migration de contenu.
4. RLS activée dans la migration qui crée la table ; les RPC d'écriture d'état utilisateur sont
   réservées à `service_role`.
5. Aucun changement de production hors fichier de migration ; l'éditeur SQL du tableau de bord
   sert à lire.
6. Une migration passée en production ne se modifie jamais : on en écrit une nouvelle.
7. Tant que la synchronisation de production n'a pas été vérifiée en séance supervisée, aucune
   migration ne part (048 à 051 attendent).

## Produit

8. La VISION tranche. L'écran ne montre que du vrai : pas de progrès fabriqué, pas de faux état.
9. Le cœur d'apprentissage est calme : une idée par écran, les visuels avancent au rythme de
   l'élève (au clic), un pari avant chaque révélation, sans théâtre d'engagement, et
   `prefers-reduced-motion` est respecté.
10. Les maths sont du texte vivant (KaTeX) ; le français est juste (accents, typographie) ; l'arabe
    s'affiche dans le bon sens.
11. Le [référentiel officiel](../referentiel/README.md) borne chaque leçon et chaque exercice. Ce qui
    va au-delà (histoire, culture, « pour aller plus loin ») se signale comme tel. La
    [bible du bac](../bible/README.md) dit, notion par notion, comment l'enseigner.

## Vérité

12. « Fait » veut dire : la CI est verte sur le commit poussé. Ce qui n'a pas été vérifié se dit
    « non vérifié ». Un fait ou une anecdote sans source n'entre pas dans le produit.
13. Un contrôle neuf doit avoir été vu rouge une fois, sur un défaut réel ou provoqué, avant d'être
    cru. On ne le re-prouve pas à chaque commit.
14. Un contrôle qui ne protège pas l'élève, ou qui n'a rien attrapé depuis longtemps, passe en
    hebdomadaire ou disparaît. Pas de sceau ni de cliquet sans raison écrite.

## Exercices générés

15. Aucun item généré n'entre dans `content/` sans passer le vérificateur : schéma, recalcul
    numérique ou symbolique, doublons, indices de forme (longueur, absolus, refus), périmètre du
    référentiel, rendu KaTeX.
16. Un échantillon de chaque lot est relu (par un juge, puis par le propriétaire) et le taux de
    rejet est noté.
17. Le générateur ne modifie jamais le référentiel, les misconceptions déclarées ni les annales
    sources.

## Travail

18. L'état courant tient dans [`docs/ETAT.md`](../ETAT.md) : une page, qu'on réécrit au lieu de
    l'allonger. L'histoire, c'est git.
19. Une décision durable fait un ADR court (une page au plus, avec sa section « Retractions and
    Corrections »). Pas de journal de session dans un ADR.
20. Les questions au propriétaire vivent dans un seul fichier par chantier (aujourd'hui
    [`docs/bible/QUESTIONS.md`](../bible/QUESTIONS.md) et la section « Décisions » d'ETAT), chacune
    avec un défaut proposé.
21. Les modèles se désignent par leur **rôle** (jugement, volume, génération en lot) et par alias
    (`opus`, `sonnet`, `haiku`, `inherit`), jamais par un identifiant daté dans un fichier versionné.
