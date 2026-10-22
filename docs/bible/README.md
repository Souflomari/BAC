# La bible du bac — ce qu'il faut savoir, comprendre et voir pour réussir

> **Statut : brouillon v0, ouvert à la discussion avec le propriétaire.** Commencé le 2026-10-22.
> Rien ici n'est encore validé. Les questions ouvertes sont regroupées dans
> [`QUESTIONS.md`](QUESTIONS.md) : c'est par elles que la bible doit avancer.

## À quoi sert ce document

C'est la **base de développement** de l'application. Une fois validé, chaque leçon, chaque
exercice, chaque visuel et chaque parcours doit pouvoir y renvoyer. Il répond à cinq questions,
notion par notion :

1. **Que demande le bac ?** Les capacités officielles (cadres de référence CNEE 2025), le poids
   dans l'épreuve, la forme des exercices tels qu'ils tombent vraiment.
2. **Que faut-il savoir avant ?** Les prérequis, du collège à la 1ère Bac, avec une question-test
   pour chacun : on ne construit pas sur un trou.
3. **Qu'est-ce qui coince ?** Les conceptions erronées et les pièges de copie.
4. **Comment le montrer ?** Les représentations propres à la notion : figure pas à pas,
   manipulable, simulation, expérience réelle, analogie. Avec la figure-clé et les paris.
5. **Qu'est-ce qui rend la notion vivante ?** L'histoire (le problème qui l'a fait naître, le
   moment où ça a coincé, ce que ça a changé), les personnages, le Maroc quand c'est vrai, les
   applications.

Elle s'appuie sur la recherche déjà faite, qu'elle ne recopie pas mais organise :

- [`docs/refonte/01-programme-bac-maroc.md`](../refonte/01-programme-bac-maroc.md) — l'examen, les
  8 cadres 2025, les poids, les créneaux observés ;
- [`docs/refonte/02-comprendre-en-profondeur.md`](../refonte/02-comprendre-en-profondeur.md) — le
  format de notion v3 et la banque de ≈ 110 accroches historiques sourcées ;
- [`docs/cadre/curriculum/`](../cadre/curriculum/) — les frontières de programme par matière ;
- [`docs/sujets/`](../sujets/) — les annales transcrites, rangées par notion.

## Les fichiers

| Fichier | Contenu |
|---|---|
| [`00-reussir-le-bac.md`](00-reussir-le-bac.md) | L'examen dans son ensemble : notes, coefficients, créneaux, barème, rédaction attendue, gestion du temps, stratégie par filière, façons classiques de perdre des points. |
| [`01-maths.md`](01-maths.md) | Mathématiques — SM-A/SM-B et sciences expérimentales (PC, SVT). |
| [`02-physique.md`](02-physique.md) | Physique — ondes, nucléaire, électricité, mécanique. |
| [`03-chimie.md`](03-chimie.md) | Chimie — les 7 points fixes de chaque sujet de PC. |
| [`04-svt.md`](04-svt.md) | SVT — filière SVT, filière PC, SM-A (trois cadres différents). |
| [`QUESTIONS.md`](QUESTIONS.md) | Les décisions et préférences attendues du propriétaire. |
| [`sources/`](sources/) | Les vérifications des cadres officiels et des sujets récents. |

## Comment lire une fiche

Chaque matière commence par un **tableau d'ensemble** (notion · filières · poids · fréquence aux
annales · difficulté · état dans l'application), puis une **fiche par notion**, toujours dans le
même ordre :

```
### <Nom de la notion>   (`slug` du dossier content/ s'il existe, sinon « absente de l'application »)

**Filières et poids.**  Qui l'a au programme (SM-A, SM-B, PC, SVT), les identifiants des capacités
officielles, le poids dans l'épreuve, la fréquence dans les sujets (avec les sujets cités).

**Ce que le bac demande.**  Les capacités en mots simples ; les formes d'exercice qui reviennent
(« Montrer que… », « Déterminer graphiquement… », « Exploiter le document 2… ») ; le barème habituel.

**L'idée-clé.**  Une phrase. Puis l'image-clé : ce que l'élève doit « voir » quand il pense à la notion.

**Prérequis.**  Tableau : prérequis · niveau (collège, tronc commun, 1ère Bac, autre notion de
2ème Bac) · question-test d'une ligne · si la réponse est fausse, quoi revoir.

**Conceptions erronées et pièges.**  Ce que l'élève croit, pourquoi c'est tentant, comment le
confronter (de préférence par un pari dont la révélation le réfute).

**Représentations.**  Liste typée : figure-clé pas à pas · manipulable (curseur, glisser) ·
simulation · animation · expérience réelle (vidéo, TP) · analogie · 3D · frise. Pour chacune : ce
qu'elle fait comprendre, et le pari qu'elle permet. La figure-clé de la notion est désignée.

**Histoire et personnages.**  ① le problème qui a fait naître l'idée · ② le moment où ça a coincé
· ③ ce que ça a changé. Avec une source et une étiquette [V] / [S] / [L]. Le patrimoine marocain
et arabe quand il est vrai et porteur.

**Pour aller plus loin.**  Applications, métiers, curiosités, liens avec le monde de l'élève.

**Liens.**  Les autres notions, dans la même matière et ailleurs (ln → pH, radioactivité, RC…).

**À trancher.**  (facultatif) Ce que le propriétaire doit décider pour cette notion.
```

## Étiquettes de provenance

Reprises de 01 et de 02, pour qu'aucun chiffre ni aucune anecdote ne soit inventé :

| Étiquette | Sens |
|---|---|
| **[OFF]** | Lu dans un document officiel (cadre de référence CNEE, guide du candidat), page citée. |
| **[OFF-sujet]** | Lu dans l'en-tête ou les consignes d'un sujet national officiel. |
| **[PROPRE]** | Notre dépouillement d'annales (échantillon indiqué). Pas une statistique officielle. |
| **[SEC]** | Source secondaire sérieuse (site éducatif, presse). |
| **[V]** | Anecdote vérifiée sur la source citée. |
| **[S]** | Anecdote de seconde main, à reformuler prudemment. |
| **[L]** | Légende : peut se raconter, mais comme légende. |
| **[NC]** / **[NT]** | Non confirmé / non trouvé. Rien n'est inventé à la place. |
| **[À VÉRIFIER]** | Proposition de l'auteur (pédagogie, prérequis, représentation), à valider. |

## Le vocabulaire des représentations

Pour que « comment le montrer » veuille dire la même chose partout :

| Type | Ce que c'est | Quand c'est le bon choix |
|---|---|---|
| **Figure-clé pas à pas** | Une scène qui se construit en 8 à 16 étapes, un seul changement par étape, avec 1 à 3 paris. | Pour l'idée centrale de la notion. Une par acte. |
| **Manipulable** | Un curseur ou un point à glisser, lié à une seule grandeur. | Quand l'idée est une variation continue (τ = RC, la demi-vie, la pente). |
| **Simulation** | Un modèle qui tourne (aléatoire, pas de temps, particules). | Quand la loi émerge de beaucoup d'événements (désintégrations, Hardy-Weinberg, diffusion). |
| **Animation** | Un mécanisme qui se déroule, rejouable étape par étape. | Pour un processus (traduction, potentiel d'action, subduction). |
| **Expérience réelle** | Une vidéo ou un TP du programme, avec mesures. | Quand le phénomène doit être vu « pour de vrai » (diffraction, chute, électrolyse). |
| **Analogie** | Une image familière, avec ses limites dites. | Pour un premier contact, jamais comme preuve. |
| **3D** | Une scène spatiale (three.js, ADR 0041). | Seulement si l'idée est spatiale (plan, sens, orbite, hélice). |
| **Frise** | Le fil historique d'une idée. | Pour situer, en ouverture ou en fin, ≤ 5 % du temps. |

**Règle générale** (VISION et ADR 0017) : une image générée ne remplace jamais un manipulable
quand la pédagogie demande de manipuler.
