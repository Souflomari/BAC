# La rampe d'entrée — par où un élève en difficulté commence

**Mesuré le 2026-09-20** · `node web/scripts/rampe-entree.mjs`
Corpus : 62 notions, 1 612 items.

> **Ce document ne signale pas un défaut. Il signale un ÉCART DE STANDARD**
> entre les 11 notions SVT et les 51 autres — visible sur quatre axes
> indépendants, dont deux ne dépendent d'aucune étiquette d'auteur. C'est un
> arbitrage de fabrication, donc une décision de propriétaire.

---

## La mesure

| matière | notions | items / notion | barreaux / notion | 1er barreau (moy.) | pente | items de niveau 1 |
|---|---|---|---|---|---|---|
| maths | 14 | 32,4 | 8,6 | 1,33 | +2,70 | 41 / 454 — **9,0 %** |
| pc | 25 | 27,6 | 7,6 | 1,19 | +2,87 | 62 / 690 — **9,0 %** |
| philo | 12 | 30,5 | 7,6 | 1,18 | +2,81 | 31 / 366 — **8,5 %** |
| **svt** | **11** | **9,3** | **5,2** | **2,62** | **+1,09** | **0 / 102 — 0,0 %** |

`difficulty_level` va de 1 à 5 dans le corpus (134 / 367 / 685 / 373 / 53).

---

## Pourquoi « 0 sur 102 » n'est pas une question d'échelle

L'objection évidente : `difficulty_level` est une étiquette d'auteur, et rien
dans `docs/design/` ni dans aucun agent ne définit ce que valent ses cinq
crans. Des auteurs SVT qui calibreraient « 3 = normal » produiraient
mécaniquement une moyenne plus haute, sans qu'aucune notion soit plus dure.

**L'objection tient pour la moyenne. Elle ne tient pas pour le zéro.**

- Les trois autres matières atterrissent **indépendamment** entre 8,5 % et
  9,0 % d'items de niveau 1. Une convention d'échelle propre à SVT expliquerait
  un écart — 4 %, 2 % — pas une absence complète sur 102 items.
- Deux des quatre axes ne dépendent d'**aucune** étiquette : SVT a **un tiers**
  des items par notion (9,3 contre 27,6–32,4) et **deux tiers** des barreaux
  (5,2 contre 7,6–8,6).
- Sept notions SVT ont un premier barreau composé d'**un seul item**. Pour six
  d'entre elles, toute l'entrée dans la notion est un item unique donné à 3/5.

---

## Le même sous-ensemble, trouvé par trois chemins qui ne se parlent pas

C'est ce qui rend le constat difficile à écarter. Trois mesures conçues pour
des raisons différentes, à des moments différents, isolent les mêmes 11
notions :

1. **Le sommet** (`rampe-bac`, §11.114) — la rampe atteint un vrai sujet de bac
   **sourcé** dans 47 notions sur 62. En SVT : **0 sur 11**.
2. **Les points d'arrêt** (§11.37) — 13 leçons du corpus n'ont aucun point
   d'arrêt. **11 des 13 sont en SVT.**
3. **L'entrée** (ce document) — 12 notions n'offrent aucune marche basse.
   **11 des 12 sont en SVT.**

Une notion SVT n'a donc, en moyenne : pas de marche d'entrée, un tiers du
volume, une rampe deux fois moins pentue, pas de point d'arrêt, et pas de
sommet sourcé sur un sujet réel.

**Ce n'est pas onze défauts. C'est un standard de fabrication qui n'a pas été
appliqué à une matière.** La VISION promet un tuteur pour l'élève *en
difficulté* ; c'est précisément la marche d'entrée qui porte cette promesse.

---

## L'exception hors SVT, qui mérite d'être regardée à part

`philo/analyse-de-texte` est la seule notion non-SVT dans les deux listes :

- aucun item de niveau 1 à son premier barreau (3 items, moyenne 2,0/5) ;
- **pente +0,00 sur 7 barreaux** — profil 2,0 · 2,6 · 2,0 · 2,9 · 3,0 · 2,7 ·
  2,0. Elle finit exactement où elle commence, après sept barreaux.

C'est la notion la plus plate du corpus entier, SVT comprise. Une lecture
indulgente : l'analyse de texte est une méthode, pas une matière à
difficulté croissante — chaque barreau travaille un geste différent plutôt
qu'un geste plus dur. Si c'est l'intention, elle mérite d'être écrite, parce
qu'aucun lecteur du fichier ne peut la deviner.

---

## Ce qui a été armé, et ce qui ne l'a pas été

**Armé** (`rampe-entree.mjs`, deux cliquets à une seule direction, comme
`rampe-bac`) : le nombre de notions sans marche d'entrée ne peut pas dépasser
12, et le nombre de rampes plates ne peut pas dépasser 4. On empêche la
régression ; on n'exige pas la réparation.

**Pas armé, délibérément :** aucune porte n'exige qu'une notion SVT rattrape
les autres. Ce serait 11 portes rouges le jour de leur pose, et une porte
rouge en permanence n'est plus une porte — c'est du bruit qu'on apprend à
ignorer.

---

## Ce que ce document ne dit pas

- **Rien sur la DIFFICULTÉ RÉELLE des notions SVT.** Il mesure des étiquettes,
  des volumes et des pentes, pas ce qu'un élève éprouve. Une notion SVT courte
  peut être excellente ; elle n'a simplement pas la forme des 51 autres.
- **Rien sur la cause.** Le corpus ne dit pas si les 11 notions SVT ont été
  produites plus tôt, plus vite, par une autre voie, ou selon un spec différent.
  Le journal de fabrication le dirait ; ce document ne l'a pas consulté.
- **Rien sur le programme officiel.** Il se peut que le bac SVT demande
  effectivement moins de progression graduée que le bac maths. La question est
  pour `research-lead` et le Cadre de Référence, pas pour un script.
