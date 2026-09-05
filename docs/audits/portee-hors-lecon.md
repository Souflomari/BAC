# La portée des surfaces hors leçon — et 212 renvois à une figure absente

**Mesuré le 2026-09-05** · instrument : `web/scripts/portee-hors-lecon.mjs`
(à lancer depuis `web/`) · angle mort n° 7, seconde moitié
(`docs/audits/INSTRUMENTS.md`)

`portee-corpus` répond à « sur combien de LEÇONS ce mécanisme a-t-il
quelque chose à montrer ». Il s'arrête à la porte de la leçon. Les autres
surfaces — l'assembleur d'épreuves, l'atelier — n'avaient aucun compteur,
et ce sont elles qu'un élève ouvre le mois du bac.

## Le tableau

```
node scripts/portee-hors-lecon.mjs --resume     # depuis web/
```

| | |
|---|---|
| épreuves assemblées | **39** |
| morceaux servis | 247 |
| questions d'épreuve | **1 472** |
| avec un raisonnement expert | 1 472 — **100 %** |
| avec une dérivation dépliable (`steps`) | 1 132 — **77 %** |
| renvois visuels distincts dans les énoncés | **212** |
| l'atelier | **1 notion sur 62** (prototype : maths/dérivées) |

Deux faits en ressortent, de nature très différente.

## 1. Le raisonnement est partout, la dérivation ne l'est pas — et pas au hasard

Aucune des 1 472 questions n'envoie l'élève sans explication : chacune
porte un raisonnement expert. En revanche 340 n'ont pas de pas-à-pas
déplié, et ces 340 ne sont pas réparties uniformément — quatre épreuves
concentrent l'essentiel :

| épreuve | questions | avec dérivation |
|---|---:|---:|
| SPC 2021 rattrapage | 41 | **0** |
| SPC 2024 rattrapage | 35 | **3** |
| SPC 2023 rattrapage | 34 | **4** |
| SPC 2022 rattrapage | 40 | 20 |
| *(médiane du corpus)* | | *~80 %* |

Zéro sur quarante-et-une, ce n'est pas quarante-et-une décisions d'auteur
prises une par une — c'est une lacune de campagne. **Arbitrage
propriétaire :** une épreuve entière sans un seul pas-à-pas est-elle
acceptable, sachant que le raisonnement en prose y est complet ? Le fait
est ici ; le verdict est pédagogique.

## 2. Les 212 renvois à une figure — un résultat NÉGATIF, et il fallait le mesurer

Sur les 39 épreuves, 22 sont des sujets de physique-chimie, et leurs
énoncés désignent constamment quelque chose qui se regarde : « les courbes
de la figure ci-contre », « le montage de la figure 1 », « le schéma de la
figure 3 ». **212 renvois distincts.** Et le produit ne rend AUCUNE image
d'épreuve : zéro `[[figure:…]]`, zéro `<img>`, zéro `<svg>` dans les
1 472 questions.

La conclusion évidente — « un sujet de physique sans ses figures est
insoluble » — est **fausse**, et c'est le résultat de cette mesure. Chaque
renvoi est servi par une **description textuelle** de la figure, écrite
au moment de la transcription et souvent mesurée sur le PDF natif :

> Les courbes de la figure ci-contre représentent l'évolution temporelle
> de l'avancement $x$…
>
> *Figure (courbes) :* axe des ordonnées $x\ (\text{mmol})$ gradué à
> $26{,}6$ et $53{,}2$ ; axe des abscisses $t\ (\text{min})$ gradué à
> $30$ et $60$…

Le compteur brut annonçait d'abord **554 questions portant un renvoi
« orphelin » (37,6 %)**, puis 25, puis 16 à mesure que le motif de
DESCRIPTION s'élargissait. Les seize derniers ont été ouverts un par un :
**aucun n'est un défaut.** Ils se répartissent en trois cas —

- **décrits sous un autre libellé** — « **Le dispositif (figure 1).** Une
  barre métallique horizontale… », « **La courbe (figure 2).** $\Delta t$
  en millisecondes… » : la description est complète, le motif ne la
  reconnaissait pas ;
- **décrits en ligne**, juste après le renvoi, introduits par deux points
  ou une apposition — « le montage représenté par la figure 3, constitué
  d'un générateur idéal de f.é.m. $E$, d'un conducteur ohmique
  $R = 1600\ \Omega$… » ;
- **délibérément pontés** — SPC 2024 R renvoie à une figure 2 traitée sous
  une autre notion, et la transcription donne les deux valeurs qu'on en
  tirait : « $E = 5{,}0$ V, lue au départ de la figure 2, et
  $C = 0{,}10\ \mu$F… Tu peux entrer directement dans la partie 2 avec ces
  deux valeurs. »

### Pourquoi aucune porte n'est armée sur cette classe

Le corpus emploie **au moins cinq conventions** pour introduire la
description d'une figure : `*Figure 3 (courbe).*`,
`**Figure 1 (schéma).**`, `**Le dispositif (figure 1).**`,
`**Figure A (courbes)**` (quand le sujet ne numérote pas), et la
description en ligne sans étiquette. Un contrôle automatique ne peut
distinguer « décrit en ligne » de « orphelin » sans juger le SENS.

Uniformiser les cinq conventions pour rendre la classe machine-vérifiable
coûterait seize modifications de contenu sur des passages **déjà corrects
pour l'élève** — de la turbulence au service d'un vérificateur, pas d'un
lecteur. **La règle du projet est qu'une porte ne s'arme que sur une
classe propre ; celle-ci est propre pour l'élève sans l'être pour la
machine, et c'est un cas où l'on s'abstient.** Le compteur reste, avec sa
sortie « sans bloc de description » explicitement étiquetée MAJORANT.

## 3. L'atelier

Une notion sur 62. C'est un prototype, il n'a jamais prétendu autre chose,
et le compter n'est pas un reproche — c'est ce que l'angle mort n° 7
demande : savoir sur combien de pages une chose livrée a de quoi paraître.

## Ce que la mesure a corrigé au passage

Regarder ces pages a produit quatre correctifs, consignés ailleurs :

- la carte « Le programme » du tableau de bord triait ses 62 chapitres par
  ordre alphabétique — 59 sur 62 à un autre rang que dans le cadre ;
- le menu « Notions » du header offrait les quatre premiers DOSSIERS ;
- l'index des épreuves listait SPC 2015 rattrapage avant la normale, seule
  année sur vingt-deux ;
- le masthead de l'unique épreuve partielle affichait « 10,5 pts » nu.

## Deux règles de méthode, apprises ici

1. **`lib/content.ts` résout la racine du contenu depuis le répertoire
   COURANT.** Lancé hors de `web/`, il rend une liste vide — sans erreur.
   Un compteur a donc annoncé « 0 épreuve » avec le même aplomb que
   « 39 ». Tout script qui charge le contenu se lance depuis `web/`.
2. **`innerText` ne voit pas les chapitres masqués.** Sur ce site tous les
   chapitres d'une leçon sont présents-mais-masqués (c'est l'invariant qui
   fait marcher ⌘F, l'impression et le hors-ligne). Un balayage de corpus
   qui lit `innerText` ne juge donc que le chapitre ACTIF : c'est ainsi
   qu'un « 2ème » dans une banque a échappé à ma mesure et a été trouvé par
   la porte, qui dépouille le HTML. La règle « le texte que l'élève lit est
   `innerText` » vaut pour JUGER une page à l'écran ; pour BALAYER un
   corpus paginé, il faut dépouiller le HTML ou visiter chaque chapitre.
