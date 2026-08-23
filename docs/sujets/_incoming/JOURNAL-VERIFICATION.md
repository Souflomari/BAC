# Journal de la vérification adversariale — campagne rattrapage

> Ce que la passe adversariale a réellement trouvé, sujet par sujet. Écrit
> parce que ces constats n'existaient nulle part dans le dépôt : sans ce
> journal, la preuve que la vérification SERT à quelque chose disparaît
> avec la session qui l'a produite.

## Bilan au 2026-08-22

| Sujet | Statut | Exercices vérifiés |
|---|---|---|
| PC SPC 2021 rattrapage | **vérifié** (corrigé) | 5 / 5 |
| PC SPC 2022 rattrapage | **vérifié** (corrigé) | 4 / 4 |
| PC SPC 2023 rattrapage | **vérifié** (12 défauts corrigés) | 4 / 4 |
| PC SPC 2024 rattrapage | **vérifié** | 5 / 5 |
| PC SPC 2025 rattrapage | **vérifié** | 4 / 4 |
| Maths SM 2023 rattrapage | **vérifié** | 4 / 4 |
| Maths SM 2024 rattrapage | **vérifié** | 5 / 5 |

**Les sept sujets sont vérifiés : 31 exercices.** Tous convertibles.

## PC SPC 2021 — 12 défauts sur 14 figures, dont 4 sérieux

Le texte de l'énoncé était **exact partout** : chaque nombre, indice,
exposant et unité des cinq exercices recontrôlé caractère par caractère
sur les huit pages de scan, barèmes recomptés en marge (7 · 2 · 2,5 ·
5,5 · 3 = 20). **Tous les défauts étaient dans les figures** — ce que le
protocole prédit depuis le début, et que cette passe confirme une fois de
plus.

Les trois classes nommées dans le protocole ont toutes mordu :

1. **Étiquettes d'axes arrêtées avant la fin de la plage** — quatre fois.
   Le pire : une figure décrite avec « deux maxima » et un axe s'arrêtant
   à 90 ms, alors que le cadre va à 180 ms et que la courbe montre quatre
   pseudopériodes.
2. **Figure décrite depuis le TEXTE et non depuis le dessin** — le
   montage pH-métrique était décrit avec « deux électrodes reliées à
   l'appareil » (ce que l'idée d'un dosage suggère) : le dessin ne porte
   qu'UNE sonde combinée avec un seul câble, et les deux traits pris pour
   des électrodes sont les parois du bécher. Même classe sur une
   trajectoire de projectile, tracée « jusqu'à la cible » par le texte
   alors que le dessin l'interrompt bien avant.
3. **Valeur lisible laissée en « lecture à confirmer »** — le sommet
   d'une courbe d'énergie valait 1,26 mJ, posé exactement sur un trait du
   quadrillage. Sans cette lecture, la question qui en dépend
   (E = 1,80 − 1,26 = 0,54 mJ) n'était pas exploitable. **L'exercice
   était inutilisable en l'état.**

Les sept mentions « lecture à confirmer » du fichier ont toutes été
levées par mesure au pixel **doublée d'une re-dérivation qui les valide**
— par exemple τ = 12 ms confirmé par R = E/I₀ = 120 Ω puis C = 100 µF,
et la courbe qui passe bien par I₀/e à cet instant. Les trois graphiques
de l'exercice RLC se recoupent sans contradiction (q₀ = 0,6 mC et
C = 100 µF donnent l'énergie initiale de 1,80 mJ effectivement lue).

**Une incohérence du sujet ORIGINAL a été signalée sans être « corrigée »** :
la courbe de dosage démarre à pH ≈ 3,2 et vaut ≈ 4,8 à la demi-équivalence,
ce qui n'est cohérent ni avec le pH mesuré ni avec le pK_A qui s'en déduit.
Le tracé n'est qualitatif qu'en dehors de l'équivalence. Noté dans le
fichier pour qu'aucun futur exercice n'en tire de lecture fausse — on ne
corrige pas un sujet officiel, on documente son défaut.

Un classement corrigé au passage : l'exercice de désintégration était
cross-listé `noyaux-masse-energie` à tort (ni défaut de masse, ni énergie
de liaison — ce sont les lois de Soddy, donc `decroissance-radioactive`
seul), et `lois-de-newton` a été ajouté sur le projectile.

## PC SPC 2022 — classement tranché

Vérifié 4/4. Le classement de l'exercice de mécanique hésitait entre
`chute-mouvements-plans` et un `lois-de-newton` supposé absent de la
table : contrôle fait, `lois-de-newton` existe bien — c'est lui, sans
cross-list (ni chute libre, ni frottement fluide, ni projectile).

## Ce que cette passe démontre

Sur deux sujets, la vérification a trouvé **un exercice inexploitable**
et **une figure décrite à l'envers**, dans un matériau dont le texte
était parfait. Un transcripteur consciencieux ne suffit pas : c'est le
re-fetch du scan par un second lecteur, avec obligation de re-décrire
les figures depuis l'image, qui attrape ces défauts. La règle du sas
(README) n'est pas une précaution théorique.


## PC SPC 2023 — le sujet où deux questions étaient inexploitables

Troisième sujet consécutif dont le **texte est irréprochable** — nombres,
indices, exposants, unités, QCM, tableau des indicateurs et barèmes
recontrôlés caractère par caractère sur six pages, aucune correction
textuelle. Et, une fois de plus, **100 % des douze défauts étaient dans
les figures**. Le protocole ne se trompe pas de cible.

Trois défauts étaient graves :

1. **Deux valeurs laissées « à confirmer » portaient chacune une question
   entière.** La constante de temps τ = 0,35 ms portait toute la question
   1-2 ; la charge initiale q(0) = 120 µC portait toute la question 2-3.
   Sans elles, ces questions n'étaient **pas calculables** — l'exercice
   était inexploitable en l'état. Les deux ont été verrouillées par TROIS
   voies indépendantes : mesure au pixel (intersection tangente/palier à
   866,8 px contre un repère à 866,6 px), re-dérivation théorique
   (τ = RC₀ = 35 × 10 µF), et recoupement entre figures (le palier de la
   figure 2 et le départ de la figure 3 valent tous deux 120 µC — ils le
   DOIVENT, puisque la décharge part du condensateur chargé).
2. **Une cote décrite depuis le texte et non depuis le dessin.** Sur la
   figure du terrain de volley, la cote D était donnée comme partant de
   la ligne de fond ; la mesure montre que la flèche part de l'origine du
   repère, 40 px plus à gauche. C'est ce qui place le filet à 11 m et la
   ligne adverse à 20 m — les questions 3 et 4 en dépendent entièrement.
   **Une figure refaite depuis l'ancienne description aurait décalé tout
   le terrain.**
3. **Un sous-quadrillage lu à moitié** : cinq carreaux annoncés par
   division, dix mesurés (5,9 px contre 59,4). Facteur deux — et c'est
   exactement le facteur qui permet de lire τ SUR un trait fin au lieu de
   le deviner entre deux traits. Même classe sur un minimum de sinusoïde
   annoncé à 0,2 s, mesuré à 0,138 s (45 % d'écart, confirmé par la
   théorie : T₀/3 = 0,133 s).

### Deux défauts du SUJET OFFICIEL, signalés sans être réparés

- Le même « condensateur de capacité C ajustable » doit valoir 10 µF dans
  une partie et 3 à 11 pF dans une autre : **six ordres de grandeur**,
  hors d'atteinte de tout condensateur variable réel. Les trois sections
  restent exploitables séparément, mais le montage ne peut pas être
  présenté comme un dispositif unique réalisable.
- Une concentration de triméthylamine dans l'urine donnée à 0,4 mol/L,
  comparée à un seuil diagnostique de 2,2·10⁻¹⁰ mol/L : **neuf ordres de
  grandeur**, ce qui rend la question vraie trivialement.

On ne corrige pas un sujet national. On documente son défaut pour
qu'aucun exercice futur n'en tire une lecture fausse.

### Classement corrigé

`dipole-rl` a été ÉCARTÉ d'une section malgré le libellé de couverture
« décharge dans un dipôle RL » : l'équation étudiée est celle du RLC
série, il n'y a nulle part de réponse d'un RL à un échelon. Même
arbitrage que le retrait d'un cross-list sur le sujet 2021 — le libellé
d'un sujet n'est pas sa physique.
