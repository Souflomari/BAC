# Construire à deux moteurs — Google exécute, Claude orchestre

> Décision owner du 2026-08-12. Le coût par jeton de Claude rend
> impossible de lui faire écrire les ~35 scènes restantes, les
> conversions PC, et les phases D/E. L'abonnement Google Pro est un
> forfait : le volume y est gratuit à la marge. On change donc de
> répartition, **pas** de standard de qualité.
>
> Ce document dit qui fait quoi, comment le travail circule, et
> pourquoi c'est sûr. Il se lit avec `docs/ops/SCENE-CONTRACT.md` (la
> loi de fabrication) et `work-orders/README.md` (le format des bons).

---

## 1. Le principe : déléguer le volume, garder le jugement

La question n'est pas « Google est-il bon ? » mais **« cette tâche
échoue-t-elle bruyamment ? »**. Une tâche est délégable quand son échec
est rattrapé par une machine, pas par un œil coûteux.

Ce que le projet a déjà mesuré (pilote Gemini de transcription, août
2026) : **~1 erreur substantielle par 3 exercices, ~4 normalisations
silencieuses par exercice.** La conclusion tenait alors — et tient
toujours : *lane utilisable pour le volume, la porte adversariale
reste non négociable*. La faille documentée est la **corruption
silencieuse de valeur** (une affixe recopiée depuis la ligne voisine).

Or l'écriture de scènes Manim a un profil de risque bien plus favorable
que la transcription :

| Risque | Rattrapé par |
|---|---|
| le code ne tourne pas | le rendu (porte 2) — bruyant |
| les maths sont fausses | les assertions numériques au chargement (porte 0) |
| une valeur a été normalisée en silence | `scripts/bank-fidelity.py` (porte 4) |
| une ligne fantôme, un orphelin, un arc à l'envers | `scripts/scene-lint.py` (porte 1) |
| une étiquette sur un trait, un chevauchement | l'audit image par image (porte 3) — **la seule qui demande un œil** |

Et la porte 3 elle-même est délégable : les modèles Google lisent les
images. Un agent peut extraire ses propres planches-contact, les
regarder, corriger, et recommencer. C'est exactement la boucle que
Claude a exécutée 16 fois cette semaine.

**Donc : Google prend la boucle écrire → rendre → auditer → corriger en
entier. Claude ne revient qu'aux points où le jugement est irréductible.**

---

## 2. Qui fait quoi

| Travail | Moteur | Pourquoi |
|---|---|---|
| Écriture des scènes d'explication | **Google** | volume ; portes mécaniques |
| Auto-audit image par image + correctifs | **Google** | vision ; forfait |
| Rendus (brouillon et final) | **Google** (local) | calcul pur |
| Conversions de banque PC restantes | **Google** | motif déjà éprouvé |
| Brouillons de transcription (scans) | **Google** | déjà piloté |
| **Vérification adversariale d'une transcription** | **Claude (Opus)** | mode d'échec documenté — jamais délégué |
| Rédaction des bons de travail | **Claude (Fable)** | c'est là que le jugement s'encode |
| Échantillonnage d'acceptation (1 scène sur N) | **Claude (Fable)** | garde l'étalon |
| Arbitrage pédagogie / cadre / barème | **Claude (Opus)** | jugement irréductible |
| Modification du contrat, de `bac_scene.py`, des ADR | **Claude (Fable)** | ce sont les lois |
| Migrations, Supabase, production | **Claude + porte humaine** | non négociable |

Règle de sécurité qui ne bouge pas : **aucune poussée de production
autonome, jamais** (`.claude/CLAUDE.md`).

---

## 3. Le protocole de fichiers

Trois couches, pour qu'un agent Google n'ait jamais besoin de poser une
question à Claude :

```
docs/ops/SCENE-CONTRACT.md     ← LA LOI. Stable. Lue à chaque tâche.
work-orders/<id>.md            ← UNE tâche. Autoportante. Éphémère.
work-orders/LEDGER.md          ← Le journal. Append-only. Lu par Claude.
```

**Le contrat** ne se répète jamais dans un bon : le bon dit « respecte
le contrat » et n'ajoute que le propre de l'exercice (l'entrée de
banque, ses lignes exactes, ses pièges, ses gestes de sens attendus).

**Un bon de travail** contient, dans l'ordre : le fichier cible, la
source de vérité avec ses numéros de ligne, les modèles à imiter, les
points de vigilance spécifiques, la définition de fini (les six
portes), et **un bloc RÉSULTAT que l'agent remplit avec la sortie réelle
des commandes** — pas avec une affirmation.

**Le journal** est ce que Claude lit pour savoir où on en est, sans
ouvrir 35 fichiers. Une ligne par bon terminé.

Les bons se fabriquent avec `python scripts/make-work-order.py` : il
lit `animations/manifest.yaml` et les banques, et produit un bon par
entrée `a-produire`, avec les bons numéros de ligne. On ne les écrit
pas à la main.

---

## 4. Les six portes (résumé — le détail est dans le contrat)

```
0  le module se charge, assertions comprises
1  python scripts/scene-lint.py <fichier>            → 0 erreur
2  rendu -ql : nb de sections == nb d'étapes
3  AUDIT : dernière image de chaque section → planches 2×2 → les LIRE
4  python scripts/bank-fidelity.py <bank> <id> <f>   → 0 valeur perdue
5  rendu -qm, manifeste → validé, commit
```

L'agent colle la sortie réelle des portes 0, 1, 2, 4 dans le bloc
RÉSULTAT, et **la liste des défauts trouvés puis corrigés** à la porte
3. Un bon sans défauts trouvés à la porte 3 sur une longue scène est
suspect : sur 16 scènes auditées, deux seulement étaient propres du
premier coup.

---

## 5. Le mode d'emploi côté Antigravity

1. **Une fois** : connecter le dépôt ; vérifier que `manim` répond
   (`animations/SETUP.md`), que `ffmpeg` est là, que
   `python scripts/scene-lint.py --all` tourne.
2. **Par tâche** : ouvrir un agent, lui donner **un seul** bon de
   travail, avec cette amorce :

   > Lis `docs/ops/SCENE-CONTRACT.md` en entier, puis exécute
   > `work-orders/<id>.md`. Ne touche à aucun fichier hors de ceux que
   > le bon nomme. Ne modifie ni le contrat, ni `bac_scene.py`, ni une
   > scène déjà validée. Franchis les six portes dans l'ordre et colle
   > la sortie réelle de chacune dans le bloc RÉSULTAT du bon. Si la
   > banque semble incohérente, ARRÊTE-toi et écris-le : ne corrige
   > jamais la banque.

3. **Un bon à la fois par agent.** Plusieurs agents en parallèle, oui —
   mais sur des bons différents, donc des fichiers différents. Le seul
   point de contact est `manifest.yaml` (une ligne par scène : les
   conflits sont triviaux) et `LEDGER.md` (append-only).
4. **Ne pas lancer deux rendus Manim en parallèle sur la même machine**
   sans nécessité : une course sur dvisvgm a déjà fait échouer un rendu
   sain (le re-rendu seul l'a corrigé — ne pas sur-diagnostiquer).
5. Commit par bon terminé, poussé sur la branche de travail.

---

## 6. Le mode d'emploi côté Claude

À chaque retour de lot (disons 5–6 bons) :

1. Lire `work-orders/LEDGER.md` — pas les scènes.
2. **Échantillon d'acceptation** : prendre UNE scène du lot, lire ses
   planches-contact, rejuger les maths contre la banque. C'est
   l'étalonnage : si l'échantillon est propre, le lot passe ; s'il ne
   l'est pas, tout le lot repart avec un bon de correction et le
   contrat gagne une règle.
3. Re-rouler une porte au hasard sur une autre scène du lot (30
   secondes) — pour vérifier que les portes ont vraiment été passées et
   pas seulement déclarées.
4. Mettre à jour le plan et, si une règle est née, le contrat + un ADR.

Coût par lot de 6 scènes, côté Claude : une écriture de bons (~10 k
jetons de sortie) + un échantillon (~40 k d'entrée d'images). À
comparer aux ~250 k **par scène** que coûtait l'écriture. C'est le
facteur ~30 qui rend la campagne finançable.

---

## 7. Registre des risques

| Risque | Parade |
|---|---|
| Valeur corrompue en silence (mode d'échec connu) | porte 4 (`bank-fidelity.py`) + l'échantillon d'acceptation |
| L'agent « corrige » le contrat ou `bac_scene.py` pour faire passer sa scène | interdit par le contrat §6 ; `git diff --stat` dans le bloc RÉSULTAT ; Claude vérifie que le lot ne touche que ses fichiers |
| L'agent déclare les portes franchies sans les passer | le bloc RÉSULTAT exige la **sortie collée** ; Claude re-roule une porte au hasard |
| L'agent invente une valeur que la banque ne donne pas | le contrat impose de signaler toute illustration ; la porte 4 attrape les nombres perdus, l'échantillon les nombres ajoutés |
| Dérive lente de qualité sur 30 scènes | l'échantillon par lot ; le lint qui grossit à chaque défaut nouveau |
| Deux agents se marchent dessus | un fichier par bon ; manifeste ligne à ligne ; `git pull` avant de commencer |
| Un garde structurel manque dans `bac_scene.py` | il se **demande** par un bon dédié (Claude l'écrit), il ne s'improvise pas |

---

## 8. Ce qu'il faut faire en premier (ordre conseillé)

1. **BT-000 — les gardes structurels dans `bac_scene.py`** : monter
   `_fig_membres()` et `_graduations()` (aujourd'hui prisonniers de
   `bk-2019-n-x4.py`) dans la classe de base, pour que toute scène
   suivante en hérite. Un seul bon, ~1 h, débloque tout le reste.
2. **BT-001 — le rattrapage des graduations** : le lint signale
   aujourd'hui **14 scènes validées sans graduations numériques** — la
   nouvelle exigence owner. Un bon par notion, mécanique.
3. **BT-002 — finir les deux scènes en cours** : `bk-2019-n-x4`
   (3 classes de défauts diagnostiquées, correctifs à moitié appliqués)
   et `bk-2023-n-x4` (653 lignes sur ~1700).
4. **Puis le flot normal** : un bon par scène `a-produire`, dans
   l'ordre du manifeste (exp → intégrale → équadiff → dénombrement →
   probas → arith → structures → géométrie 3D), plus les six entrées
   nc-2 restantes.
5. **En parallèle, hors scènes** : les conversions PC en attente
   (4 nouvelles banques + 4 compléments) suivent le même protocole avec
   leur propre contrat (`BANK-SPEC`).

---

## 9. La comparaison de modèles demandée (owner, 2026-08-12)

L'owner veut comparer une vidéo écrite par chaque moteur. État :
- **Sonnet** : `bk-2019-n-x4` (95 étapes) et `bk-2021-n-x4` (91 étapes),
  écrites, rendues, auditées.
- **Opus** : `bk-2023-n-x4` — commencée (653 lignes), interrompue par la
  limite de session, à finir.
- **Fable** : `bk-2024-n-x4` — non commencée (crédits épuisés).
- **Google** : devient de fait le quatrième point de comparaison, sur
  la même notion.

Le juge est le même dans les quatre cas : les six portes, puis l'œil de
l'owner sur la vidéo finale. Écrire les quatre sur la **même notion**
(fonction-logarithme) est délibéré : c'est ce qui rend la comparaison
lisible.
