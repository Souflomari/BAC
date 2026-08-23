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
| PC SPC 2023 / 2024 / 2025 rattrapage | transcrit, NON vérifié | 0 / 12 |
| Maths SM 2023 / 2024 rattrapage | transcrit, NON vérifié | 0 / 9 |

Neuf exercices sont donc convertibles ; vingt et un ne le sont pas —
la passe a été coupée par l'épuisement des crédits, pas par un choix.

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
