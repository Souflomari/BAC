# ADR 0037 — La mesure qui mesurait le banc, et le motif qui mangeait le corpus

**Date :** 2026-09-20 · **Statut :** accepté (prolonge ADR 0031, 0033, 0034,
0035 et 0036, dont il ne contredit rien) · **Preuves :** `docs/HANDOFF.md`
§11.148 à §11.161 · **Instruments :** `preferences-secours`,
`desaccords-hydratation`, `trois-moteurs`, `figures-trois-moteurs`,
`marge-etiquettes`, `stockage-refuse`, `mouvement-reduit`, `calculs-numeriques`,
`prose-jumelle`, `dollars-apparies`

## Contexte

ADR 0036 demandait : quand une mesure dit « absent », de quoi est-ce la preuve ?
L'arc suivant a buté sur la question d'avant. **Avant même de croire un verdict,
il faut savoir si la grandeur mesurée est celle du PRODUIT ou celle du BANC.**

Six fois dans la même journée, une mesure a bougé sans que le produit bouge, ou
n'a pas bougé quand le produit était cassé. Aucune n'était une faute de logique.
Chaque fois, la grandeur choisie dépendait d'autre chose que ce qu'on croyait
mesurer.

## Décisions

### 1. Une mesure ne s'arme qu'après avoir été éprouvée DANS LES DEUX SENS

Il ne suffit pas qu'une mesure bouge quand le défaut est présent. Il faut aussi
qu'elle **ne bouge pas** quand seul le banc change. Les deux moitiés se
vérifient avant l'armement, pas après le premier faux rouge.

Trois mesures ont été écartées ce jour-là, chacune parce qu'une moitié manquait :

| mesure envisagée | ce qu'elle fait quand le DÉFAUT est là | ce qu'elle fait quand seul le BANC change |
|---|---|---|
| largeur cumulée des `.katex` | **+1,0 %** (polices KaTeX bloquées) | **7 %** (barre de défilement de WebKit) |
| `innerText` du corrigé | — | **4 %** (retours à la ligne par moteur) |
| nombre de familles de police déclarées | **0** (20 avant, 20 après) | — |

La seule qui a survécu — le nombre de familles réellement **chargées**, 2 → 0 —
est celle dont les deux moitiés tenaient. Le remplaçant d'`innerText` est
`textContent` : **125 517 caractères dans les trois moteurs, au caractère près.**

**Corollaire :** mesurer le rouge AVANT de choisir le seuil. Un seuil choisi
d'abord, puis « validé » par un vert, ne dit rien : c'est le vert qui a été
choisi.

### 2. Un motif qui apparie des délimiteurs sur tout un fichier finit par manger le contenu

Trois masques successifs ont avalé de la prose le même jour, tous pour la même
raison : ils appariaient de gauche à droite **sur un fichier entier**, où un
seul délimiteur orphelin propage l'erreur jusqu'au suivant.

- `\$\$?[^$]*\$\$?` masquait un TIERS des expressions du corpus (13 936 → 21 938
  une fois réparé) ;
- l'affichée non ancrée confond deux maths en ligne collées (`$a$$b$`) avec un
  `$$` ;
- et `^---[\s\S]*?^---` pour le front-matter masquait **les lignes 3 à 38** d'une
  leçon qui n'a pas de front-matter du tout : elle emploie `---` comme séparateur
  de chapitre. 16 473 mots de prose invisibles.

**La règle :** borner l'appariement à l'unité que la porte reçoit réellement.
Une leçon markdown se lit **ligne par ligne** — une boucle borne les dégâts à une
ligne ; une expression régulière les propage. Un champ YAML, lui, peut contenir
une formule pliée sur deux lignes : la parade du markdown y serait exactement le
mauvais geste, et la garantie doit alors être posée **en amont, sur les données**
(`dollars-apparies` : 73 611 champs, 0 orphelin).

**Et un préfixe de fichier ne se retire que s'il PRÉFIXE le fichier.**

### 3. La bonne unité d'analyse est celle que la porte reçoit, pas celle du disque

Le relevé « 1 326 lignes portent un nombre impair de `$` » annonçait quatre
portes armées aveugles. Le relevé juste — 73 611 **champs**, 0 impair — a montré
qu'aucune ne l'était : les formules pliées sont rejointes par YAML avant que la
porte ne les voie.

Le refactor évité aurait été du bruit, et il aurait cassé le seul cas qui marche.
**Ne pas réparer ce qui n'est pas cassé ; garder la condition qui le maintient
ainsi.**

### 4. Une exemption large est un trou où le défaut se cache

`prose-jumelle` exemptait tout passage porté par un chapitre de méthode, parce
que le gabarit de dissertation s'y répète à dessein. L'essai rouge — un
paragraphe de 87 mots recopié — est resté **vert** : il avait été collé sous
« Pour t'entraîner ».

Une exemption doit porter sur la **propriété** qui rend la répétition
légitime, pas sur le lieu où elle se trouve. Ici : un gabarit se répète dans
BEAUCOUP de leçons, un copier-coller n'existe que dans DEUX. Le critère est la
**diffusion**, pas le chapitre.

### 5. Le témoin fait partie de la mesure, et il parle en premier

Quatre bancs ont eu un témoin rouge avant d'avoir un verdict, et à chaque fois
c'était le banc :

- deux contrôles rouges dans les TROIS colonnes du banc « stockage » — sélecteurs
  inventés, et chapitres `<details>` jamais ouverts ;
- les mêmes rouges de nouveau — les commandes vivent derrière « Menu et
  réglages » à 390 px ;
- un serveur `next start` vieux de cinq heures répondait sur le port qu'on
  croyait frais, servant un build périmé ;
- un observateur de mutations posé sur `documentElement` **avant que `<html>`
  existe** annonçait « 0 réécriture » sur une page qui en faisait cinq.

**Un banc dont le témoin tombe ne mesure pas le produit.** Et un banc sans témoin
ne le sait pas.

### 6. Une porte doit prouver que son sabotage a PRIS

Le banc « stockage refusé » demande à la page si l'accès lève vraiment avant de
conclure quoi que ce soit. Sans ce contrôle, une colonne « refusé » qui n'aurait
rien refusé rendrait un vert parfaitement vide — la porte MUETTE de l'ADR 0034,
sous un autre nom.

### 7. Ce qui se répète dans un produit n'est pas forcément une faute

Un tuteur qui confronte les misconceptions et qui démontre **contient des
égalités fausses par construction** : l'arithmétique modulaire (« $2\times2=0$ »
est vrai dans Z/4Z), l'erreur citée pour être réfutée, le raisonnement par
l'absurde. Une porte arithmétique naïve se battrait contre la pédagogie du
produit.

De même, trois familles de prose DOIVENT rester identiques d'une leçon à
l'autre : le gabarit de méthode, la citation, et l'avertissement d'honnêteté.

**Quand une porte et le produit se contredisent, il faut d'abord se demander si
le produit a raison.** Ici, il l'avait, trois fois sur trois.

## Retractions and Corrections

Aucune. Les six mesures écartées ou corrigées l'ont été avant d'être armées,
sauf `prose-jumelle`, dont la première exemption a été retirée le jour même,
avant tout usage.
