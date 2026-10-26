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

### C. Questions ouvertes (tour 1)

1. **G2** : carrés entiers seulement, ou fond blanc ?
2. **« Les top 5 points sur les tapis »** : de quoi s'agit-il ?
3. **Étapes 13 → 14** : la remarque sur le passage soudain tient-elle ?
4. **Étape 2** : centrer le calcul posé ?

### D. Suite

Proposition : recueillir d'abord les retours sur la physique et la SVT, puisque la moitié des
remarques porte sur le format commun (G1 à G8) ; faire ces changements une fois, puis la deuxième
version des trois pilotes.
