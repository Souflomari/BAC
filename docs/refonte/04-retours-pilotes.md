# Retours du propriétaire sur les pilotes

> Un tour de retours par section, dans l'ordre où ils arrivent. Chaque remarque garde le sens donné
> par le propriétaire ; la colonne « proposition » est notre lecture, à valider. Les numéros d'étape
> sont ceux du compteur du pilote. Les passages dictés que la transcription a déformés sont signalés.

## Tour 1 — 2026-10-26 — pilote maths (`/pilote/logarithme`, 34 étapes)

**Verdict d'ensemble.** « Pas encore suffisamment expliqué » : il faut entrer davantage dans les
détails. Beaucoup d'améliorations à faire. Aimé : l'animation des règles à calcul (15-16), l'étape 20.

### A. Remarques générales (elles valent pour les trois pilotes)

| # | Remarque | Proposition |
|---|---|---|
| G1 | Le texte est un seul long paragraphe, avec trop d'espace vide en dessous ; « ça s'applique partout ». | Découper chaque texte en phrases courtes, réparties sur la hauteur du panneau. |
| G2 | Le fond quadrillé laisse des carrés coupés aux bords (la grille de 40 px ne tombe pas juste sur la scène). Il aime les carrés. | Deux options : **seulement des carrés entiers** (une zone quadrillée d'un nombre entier de carrés, centrée), ou **fond blanc sans carrés**. À trancher. |
| G3 | Un résultat ne doit pas apparaître d'un bloc : une petite animation avant (étape 3). | On voit le résultat se construire, comme la multiplication de l'étape 2. |
| G4 | Ce qui forme une suite ne s'affiche pas d'un coup (les +1 de l'étape 6). | Révéler un par un. |
| G5 | Les paris préparent la suite, c'est bien ; mais il manque des **questions de compréhension** qui vérifient et synthétisent ce qui vient d'être vu. 22 étapes sans une seule, c'est trop. | Une courte question de synthèse à la fin de chaque partie (table, trous, règle, aire, définition). |
| G6 | Ne pas interroger sur ce qui n'a pas été enseigné (étape 33 : ln(1/8) avant d'avoir vu les règles). | Enseigner chaque règle avant le quiz qui la vérifie. |
| G7 | Chaque passage d'une idée à la suivante doit être justifié (étapes 13-14, 17, 23, 26, 27). | Une phrase-pont à chaque changement de scène : pourquoi on y va. |
| G8 | Deux courbes différentes ne doivent pas avoir la même couleur (étape 28). | Une couleur par objet, gardée d'une étape à l'autre. |

### B. Étape par étape

| Étape | Ce qu'elle montre | Remarque | Proposition |
|---|---|---|---|
| 1 | Napier, 1614 : les multiplications des astronomes | texte en un bloc (G1) | G1 |
| 2 | la multiplication posée : 49 produits, 7 lignes | trop rapide à suivre, **mais c'est voulu** (montrer que c'est dur) ; peut-être centrer le calcul | garder la vitesse ; centrer le calcul [à confirmer] |
| 3 | les mêmes nombres, additionnés | une animation avant que l'addition apparaisse [transcription déformée, lecture probable] | l'addition se pose chiffre par chiffre, plus vite que la multiplication |
| 5 | la table des puissances de 2 | mieux expliquer le but [transcription : « le budget »] | dire pourquoi on écrit cette table : deux lignes qui avancent ensemble, l'une par +1, l'autre par ×2 |
| 6 | les flèches +1 et ×2 | tous les +1 apparaissent d'un coup | un par un (G4) |
| 6 ? | « les top 5 points sur les tapis, c'est à expliquer » | transcription illisible | **question ouverte** |
| 7 | 16 × 32 avec la table | pas assez expliqué | pas à pas : 16 est au pas 4, 32 au pas 5 ; 4 + 5 = 9 ; au pas 9, on lit 512 |
| 12 | 3 × 7 = 21 au pas 110 + 196 = 306 | un visuel de « la multiplication devient une somme » | les deux longueurs de pas mises bout à bout (110 puis 196) arrivent au pas 306 ; en face, 3 × 7 = 21 |
| 13 → 14 | de la courbe (table lue à l'envers) à la règle de Gunter | passage soudain — puis « ah non, c'est pas ça, pardon » | **question ouverte** : la remarque tient-elle ? Si oui : la règle, c'est la table des pas posée sur une longueur |
| 15-16 | les règles d'Oughtred | « j'aime trop bien l'animation » [transcription : « les tabs »] | garder |
| 17 | l'hyperbole y = 1/x arrive | compris, mais on ne voit pas comment on passe de la table à cette courbe | une étape-pont : pourquoi chercher une courbe, pourquoi celle-là |
| 20 | la tranche de 1 à 2 étirée ×2 | aimé | garder |
| 21 | écrasée ÷2, elle épouse la courbe | montrer que c'est **exact**, une vraie division, pas un ajustement à l'œil | suivre un point : (x ; 1/x) devient (2x ; 1/(2x)), qui est encore sur la courbe |
| 23 | la même chose avec a et b quelconques | pas clair | d'abord un exemple chiffré (a = 3), puis a quelconque |
| 24 | A(ab) = A(a) + A(b) | compris, mais à détailler | le découpage en deux couleurs, morceau par morceau |
| 26 | vers la primitive (la bande fine) | pas clair | expliquer d'abord pourquoi on s'intéresse à la vitesse à laquelle l'aire grandit |
| 27 | A′(x) = 1/x | pas clair pour qui ne maîtrise pas la dérivée | un rappel visuel de la dérivée (taux d'accroissement, pente) avant, en détour juste-à-temps |
| 28 | ln = la primitive de 1/x qui s'annule en 1 | les deux courbes ont la même couleur ; montrer comment on passe de 1/x à ln x, et pourquoi ln 1 = 0 | couleurs distinctes (G8) ; ln 1 = 0 parce que l'aire de 1 à 1 est nulle (la bande se réduit à rien) ; la hauteur de 1/x devient la pente de ln x |
| 33 | quiz : ln(1/8) | les règles de ln n'ont pas été expliquées | enseigner ln(ab), ln(1/a), ln(aⁿ) avant le quiz, chacune avec les aires (G6) |

### C. Questions ouvertes (tour 1), tranchées le 2026-10-26

1. **G2** : on garde les carrés, **seulement des carrés entiers**.
2. « Les top 5 points sur les tapis » : oublié par le propriétaire, remarque abandonnée.
3. Étapes 13 → 14 : la remarque ne tient pas, le passage reste tel quel.
4. Étape 2 : **oui**, centrer le calcul posé.

## Tour 2 — 2026-10-26 — pilotes SVT et physique

**Consigne d'ensemble.** « Mes remarques pour les maths s'appliquent aux autres, et vice versa » :
les remarques générales G1 à G11 valent pour les trois pilotes.

### A. Nouvelles remarques générales

| # | Remarque | Proposition |
|---|---|---|
| G9 | Chaque mot technique doit être expliqué quand il apparaît. Le propriétaire ne vient pas de la SVT et a été « très confus » au début (globule, drépanocytose, hémoglobine, acide aminé, chaîne β, chromosome, cytoplasme, ribosome, ARN polymérase, 3′ et 5′, bases, méthionine, anticodon) ; un élève en difficulté est dans la même situation. | Deux outils : (1) un court départ « ce qu'il faut savoir » qui montre les prérequis en images avant l'énigme ; (2) chaque mot technique, à sa première apparition, s'ouvre en une petite fiche illustrée sans quitter l'étape. |
| G10 | « Tout ce qui est formule » : développer étape par étape (physique 16, 20, 21 ; maths 27, 28). | Une dérivation s'écrit ligne par ligne, chaque ligne avec sa raison (« on prend le ln des deux côtés, parce que… »), et apparaît au rythme de l'explication. |
| G11 | Aimé : les manipulations et les simulations (les dés, le tableau du code génétique, le ribosome qu'on fait avancer) ; « avec les schémas et les petits graphiques, j'ai bien compris la transcription ». | Garder ; c'est la partie validée du format. |

### B. SVT (`/pilote/expression-genetique`, 36 étapes)

| Étape | Ce qu'elle montre | Remarque | Proposition |
|---|---|---|---|
| 1-3 | le globule en faucille, Pauling et Ingram, le gène sur le chromosome 11 | très confus au départ : globule, drépanocytose, hémoglobine, acide aminé, chaîne β, chromosome | G9 : commencer par ce qu'il faut savoir — la protéine comme chaîne d'acides aminés, l'hémoglobine et ses chaînes, le chromosome comme long ADN rangé dans le noyau — puis l'énigme ; « peut-être une petite restructuration » |
| 4-6 | le noyau, le cytoplasme, les ribosomes ; transcription et traduction | aimé : que l'ADN ne quitte pas le noyau « arrive vraiment bien » ; mais expliquer sur la figure ce que sont le cytoplasme et les ribosomes | légender la figure et ouvrir une fiche pour chaque mot (G9) |
| 8-11 | l'ARN polymérase, la copie lettre par lettre, 3′ → 5′ | qu'est-ce que l'ARN polymérase ? que veulent dire 3′ et 5′ ? les bases ne sont pas expliquées [transcription déformée : « les tapkins », « la cytidaminée »] | montrer l'enzyme en action (elle ouvre, lit, assemble) ; expliquer 3′ et 5′ par l'orientation du brin, comme le sens d'une flèche ; nommer les bases (adénine, thymine, guanine, cytosine, uracile) |
| 18 | le tableau du code, à manipuler | « j'aime vraiment bien » | garder |
| 19-20 | le ribosome, l'ARNt, l'anticodon | on ne sait pas ce qu'est une méthionine, un anticodon ; « mais les visuels sont bien » | G9 |

### C. Physique (`/pilote/radioactivite`, 36 étapes)

| Étape | Ce qu'elle montre | Remarque | Proposition |
|---|---|---|---|
| 5-10 | la simulation des dés | « j'aime vraiment bien » : elle aide à comprendre « et c'est plus joli » | garder |
| 7 | le pari : combien de dés au bout de 10 tics ? | bon pari, contre-intuitif (l'intuition dit 10 × 1/6) ; mais expliquer davantage pourquoi c'est 1/6 **de ce qui reste** | après le pari, compter tic par tic : 100 → 83 → 69…, en montrant que chaque tic enlève un sixième des dés encore là, pas un sixième des 100 du départ |
| 9 | le dé qui a survécu à 10 lancers et le dé neuf | **bogue** : les deux affichent souvent la face 3 (le dé neuf montre toujours 3), on croit voir le même dé | deux faces différentes, et l'histoire du survivant (ses 10 lancers sans 6) affichée |
| 5-10 | les 6 en rouge | bien, mais ajouter une petite animation rapide où l'on voit les 6 sortir | les dés tombés sur 6 rougissent puis quittent la grille |
| 16 | après *n* demi-vies, il reste *N*₀/2ⁿ | expliquer pourquoi | G10 : *N*₀ → *N*₀/2 → *N*₀/4 → *N*₀/8, une demi-vie à la fois, puis la règle |
| 20 | de la réalité (les dés) à la formule | pas clair | G10 : écrire le premier tic, le deuxième, le troisième, puis généraliser |
| 21 | de (5/6)ᵏ à l'exponentielle et à λ | développer comment on arrive à la formule et comment on passe de l'une à l'autre | G10 : chaque réécriture sur sa ligne, avec sa raison (5/6 = e^(−ln(6/5)), donc (5/6)ᵏ = e^(−k ln(6/5))) |

### D. La deuxième version : le plan

1. **Un noyau commun aux trois pilotes.** Les trois moteurs ont aujourd'hui chacun leur copie du
   même mécanisme (déroulé des étapes, paris, panneau, voix, clavier). On le met en commun, puis on
   y fait les changements de format **une seule fois** : texte en phrases courtes qui apparaissent
   au rythme de l'animation (G1, G3, G4), carrés entiers (G2), questions de compréhension « Vérifie »
   distinctes des paris (G5), fiches de mots (G9), dérivations ligne par ligne (G10).
2. **Le pilote maths en deuxième version**, sur ce noyau, avec toutes les remarques du tour 1.
3. **Puis la physique et la SVT**, de la même façon.

**Avancement.** Points 1 et 2 faits le 2026-10-26 ([ADR 0043](../decisions/0043-noyau-des-pilotes.md)) :
le pilote maths passe de 34 à 51 étapes, en huit parties finies chacune par « Vérifie » ; les règles
de ln (produit, inverse, quotient, puissance) sont enseignées avant le quiz ; un rappel en images de
la dérivée précède A′(x) = 1/x ; ln est en rouge, 1/x en noir. La physique et la SVT gardent leur
moteur, dans la coquille commune (carrés entiers déjà appliqués), en attendant le point 3.

Point 3, physique, fait le 2026-10-26 : 56 étapes en dix parties, chacune finie par « Vérifie »
(sauf le quiz final). Les barres « 100 → 83 → 69… » montrent le sixième qui part de ce qui reste ;
les deux dés ont des faces différentes et l'histoire du survivant (10 lancers, aucun 6) est affichée ;
les 6 rougissent puis quittent la grille ; N₀/2ⁿ, le passage des dés à N₀(5/6)ᵏ puis à N₀e^(−λt),
t½, τ, A = λN et l'âge au carbone 14 sont développés ligne par ligne ; 18 fiches de mots.

Point 3, SVT, fait le 2026-10-26 : 58 étapes en neuf parties, chacune finie par « Vérifie ». La leçon
s'ouvre sur « Ce qu'il faut savoir » (la protéine comme collier d'acides aminés et ses 20 sortes,
l'hémoglobine et ses 4 chaînes dans le globule rouge, le zoom cellule → noyau → chromosome → ADN, le
gène) avant l'énigme ; le cytoplasme et les ribosomes sont légendés ; l'ARN polymérase agit en trois
gestes (ouvrir, lire, assembler) ; 5′ et 3′ sont des flèches ; les bases sont nommées ; l'ARNt, la
méthionine et l'anticodon sont légendés et dérivés ligne par ligne ; 38 fiches de mots. Les trois
manipulations (tableau du code, ribosome, atelier de mutation) sont gardées.
