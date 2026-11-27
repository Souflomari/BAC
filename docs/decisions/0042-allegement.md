# ADR 0042 — Allègement : un cadre de travail à la mesure du produit

**Date :** 2026-10-22 · **Statut :** accepté (décision du propriétaire : « on supprime tout ce qui
est obsolète ou amélioré… carte blanche pour tout réévaluer avec fresh eyes », confirmée le même
jour) · **Remplace :** les lois de méthode des ADR 0031 à 0040 (gardés comme histoire), RULES.md
v1, la séparation « vague 1 / vague 2 » des critiques.

## Contexte

L'audit [`docs/refonte/03-audit-framework.md`](../refonte/03-audit-framework.md) (2026-10-21) a
mesuré un appareil de vérification aussi gros que le produit : 146 scripts (46 430 lignes) pour
45 144 lignes de produit, une CI de 104 étapes en 5 jobs qui prenait 52 à 61 minutes et annulait la
moitié de ses runs, 91 lois de méthode, un HANDOFF de 161 000 mots, 17 agents épinglés sur des
identifiants de modèle de génération précédente. Sur un mois, 10 runs rouges venaient de 9 étapes
seulement ; les 95 autres n'avaient rien attrapé. Une bonne part de ces règles compensait les
défauts de modèles plus anciens, ou racontait un incident au lieu d'énoncer une règle.

## Décision

1. **CI** : `gates.yml` est remplacé par `ci.yml` (4 jobs parallèles : source, rendu, texte,
   téléphone ; environ 15 min), `scenes.yml` (les 17 portes de scène, seulement quand le code d'une
   scène, ses descripteurs ou le design changent) et `hebdo.yml` (les contrôles lents, chaque
   lundi et à la main). Les passes rouges rejouées à chaque push disparaissent (règle 13).
2. **Scripts** : 63 scripts supprimés (instruments qui mesuraient d'autres instruments, sondes
   ponctuelles dont le résultat est acquis, mécanismes du gabarit v2), avec 4 sceaux, le manifeste
   des essais rouges, les campagnes de sabotage et 5 scripts racine d'une seule campagne. La batterie
   locale devient la liste du job `source`.
3. **Documents** : 247 fichiers supprimés : HANDOFF, 58 audits datés (sauf deux qui servent au
   futur générateur), les spécifications v2 et leurs propositions, les briefs, `ops/`, l'ancien
   ROSTER, `work-orders/`, et les 67 notes `REVIEW-*.md` des leçons. Les renvois qui y menaient sont
   réécrits en simples noms de fichier, datés.
4. **Règles** : RULES.md tient en une page (21 règles). CLAUDE.md redevient un index. L'état courant
   tient dans `docs/ETAT.md`.
5. **Agents** : 11 rôles au lieu de 17, désignés par alias de modèle (règle 21).
6. **Référentiel** : `docs/cadre/` (écrit sous le cadre 2015, avec des erreurs relevées dans
   `docs/refonte/01-programme-bac-maroc.md` §7.2) est remplacé par `docs/referentiel/`, transcrit
   mot pour mot des cadres officiels 2025.

**Gardé** : les sept non-négociables de production ; tous les contrôles qui protègent ce que
l'élève voit (dans `ci.yml` ou `hebdo.yml`) ; les ADR (histoire, hors du chemin de lecture) ; les
scènes, les leçons, les annales, les 4 directions de design de la refonte ; `animations/` et ses 3
explications en ligne ; `backend/` (adjacent à la production : on n'y touche qu'avec la
vérification de synchronisation).

**Point d'archive** : le commit `d3810007`. Le dépôt distant refuse les tags ; tout fichier supprimé
se relit avec `git show d3810007:<chemin>`.

## Conséquences

- Une régression rare (impression, zoom 200 %, presse-papier, stockage refusé) peut attendre
  jusqu'à une semaine avant d'être vue. Coût accepté : ces contrôles n'avaient rien attrapé depuis
  leur correctif, sauf l'impression (une fois en un mois).
- Une scène dont seul le contenu d'une leçon change n'est pas re-mesurée avant le lundi suivant.
- Le contrôle des liens entre fichiers reste dans la CI rapide : c'est le filet de toute
  suppression future.

## Retractions and Corrections

*(aucune pour l'instant)*
