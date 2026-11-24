# Mandat multimodal — ce que la vidéo et le mouvement peuvent apporter aux leçons

> Demande du propriétaire (2026-11-24), après avoir vu une démonstration « Visualizing systems »
> faite avec Antigravity et son modèle multimodal : aller voir ce qui se fait de mieux en vidéo
> pédagogique (CrashCourse et ses semblables), dire ce que cela apporterait à nos leçons, et montrer
> ce qu'Antigravity sait produire lui-même en animation. « Il n'y a pas de limite à ce qu'on peut
> faire » : ce mandat est une **exploration**, son livrable est un rapport et trois maquettes, pas une
> refonte. Il s'ajoute à [`MANDAT-LECONS.md`](MANDAT-LECONS.md).
>
> Pourquoi Antigravity : il **regarde** des vidéos et des écrans, ce que la chaîne de production des
> leçons ne fait pas. C'est son avantage, autant l'employer là.

## 1. Regarder, puis dire ce qui marche (rapport `rapports/NN-video-et-mouvement.md`)

Regarder en entier une douzaine de vidéos qui expliquent des notions de notre programme (2e bac
marocain : logarithme, exponentielle, suites, radioactivité, noyaux, dipôle RC, expression génétique,
méiose, lois de Mendel), prises chez au moins six producteurs différents, dont CrashCourse,
3Blue1Brown, Kurzgesagt, Veritasium, Khan Academy, une chaîne francophone de lycée et une chaîne
marocaine de préparation au bac. Pour chacune, noter avec l'adresse et l'instant précis :

1. **Les trois moments où l'on comprend quelque chose** : que voit-on exactement à l'écran à cet
   instant (un objet qui se transforme, deux choses comparées, une grandeur qui varie) ?
2. **Ce que le mouvement fait qu'une image fixe ne ferait pas** : montrer une cause, une
   continuité, un avant et un après, un changement d'échelle.
3. **Le rythme** : durée d'une idée, moments de pause, place de la voix par rapport à l'image.
4. **Ce qui distrait** : musique, humour, décor, vitesse. Notre règle est le calme
   ([`DESIGN-BIBLE.md`](../product/DESIGN-BIBLE.md)) : rien qui bouge sans raison.
5. **Ce que la vidéo ne fait pas et que nos leçons font** : demander un pari avant de montrer,
   attendre l'élève, réagir à son erreur.

Conclusion attendue : dix procédés visuels **transposables**, classés par ce qu'ils coûtent à
produire et par ce qu'ils apportent, chacun avec l'étape d'une de nos leçons où il servirait.

## 2. Montrer ce qu'Antigravity sait produire (trois maquettes)

Sur trois moments choisis de trois leçons, une par matière, produire le meilleur visuel animé
possible, par le moyen qu'il juge le meilleur (animation codée en SVG ou en canvas, vidéo générée,
séquence d'images), et dire pour chacun le temps passé et ce qu'il faudrait pour en faire cent :

| Leçon | Moment | Ce qu'il faut voir |
|---|---|---|
| `meiose` | la première division | les homologues qui s'apparient, s'alignent, se séparent ; puis la seconde orientation possible |
| `dipole-rc` | la charge du condensateur | les charges qui arrivent sur les armatures pendant que le courant faiblit et que la tension monte, les trois ensemble |
| `suites` | l'escalier d'une suite récurrente | les marches qui se resserrent vers le point fixe, puis le même escalier pour une suite qui s'éloigne |

Contraintes : les maquettes vont dans un dossier à part (`web/public/maquettes/` ou une page
`/pilote/maquettes`), sans toucher aux leçons ; elles respectent les couleurs du site (un seul accent
rouge, encre, gris, clair et sombre) ; elles restent **pilotées par l'élève** (rien ne démarre seul,
tout se rejoue) ; une vidéo générée porte la mention de son outil et ne montre rien de faux (un
schéma inexact est pire qu'un schéma absent : le contenu scientifique est relu par Claude avant
toute intégration).

## 3. Ce que le rapport doit trancher

- Faut-il de **vraies vidéos** (un fichier qui se lit) quelque part dans le produit, ou seulement des
  animations qui répondent à l'élève ? Avec quel poids pour un téléphone et une connexion marocaine
  moyenne ?
- Une **voix** apporte-t-elle quelque chose, et laquelle (le site a déjà un bouton « Voix ») ?
- Ce qu'un modèle multimodal peut faire **en continu** pour la qualité : regarder chaque leçon
  comme un élève et signaler l'instant où l'on décroche.

## 4. Ce qui ne change pas

Le cœur du produit est le diagnostic : savoir, d'après les réponses de l'élève, où sont ses lacunes
et lui donner la bonne chose à faire ensuite
([`APPRENTISSAGE-DONNEES.md`](../design/APPRENTISSAGE-DONNEES.md)). Un visuel n'entre dans une leçon
que s'il aide à répondre à une question ou à comprendre une erreur. Le mouvement sert l'idée, jamais
l'inverse.
