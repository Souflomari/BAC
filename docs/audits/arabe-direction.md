# L'arabe rendu de gauche à droite — 49 blocs, 10 leçons de philosophie

> Mesuré et corrigé le 2026-09-04, en inspectant le rendu de
> `philo/analyse-de-texte` pendant un travail sur les fontes. Personne ne
> cherchait ceci.

---

## Ce que le produit contient, et que personne n'avait regardé

**L'épreuve de philosophie du bac marocain est en arabe.** Les sujets réels
— libellé officiel (« حلّل (ي) النص و ناقشه (يه). »), citation, texte source
intégral — sont donc transcrits EN ARABE dans le corpus, à côté de leur
traduction de travail française. C'est la bonne décision de contenu : un
élève qui prépare cette épreuve doit voir le sujet tel qu'il tombera.

**Ils étaient tous rendus dans des blocs `dir="ltr"`, sans `lang`.**
49 blocs, 10 leçons : `analyse-de-texte`, `autrui`, `l-etat`, `la-liberte`,
`la-personne`, `la-verite`, `la-violence`, `le-devoir`,
`le-droit-la-justice`, `theorie-experience`.

## Pourquoi ça se voit — et pourquoi ça ne se voyait pas

L'algorithme bidi d'Unicode pose correctement chaque LIGNE de droite à
gauche. On regarde la page, l'arabe est à l'endroit, on passe. Mais la
DIRECTION DU BLOC reste latine, et trois choses clochent :

1. **La dernière ligne, courte, se colle à GAUCHE** au lieu de la droite.
   C'est le signe le plus visible pour qui lit l'arabe : un paragraphe qui
   se termine du mauvais côté.
2. **Un signe de ponctuation terminal prend la direction du bloc.** Le point
   final d'une phrase arabe se retrouve à droite de la phrase au lieu d'à
   gauche — la ponctuation d'une langue posée à l'envers.
3. **Sans `lang="ar"`, un lecteur d'écran lit l'arabe avec une voix
   française**, et le navigateur choisit sa fonte de repli au hasard.

Et un quatrième défaut, purement typographique : les citations héritaient de
l'`font-style: italic` du blockquote français. **L'écriture arabe n'a pas
d'italique.** Un navigateur à qui on en demande une PENCHE la fonte
mécaniquement : ce n'est pas une variante de style, c'est une déformation.

## Le correctif — au rendu, jamais dans le contenu

`web/src/lib/rehypeDirectionRtl.ts` : un bloc (`p`, `li`, `blockquote`,
titres, cellules) dont les lettres RTL sont PLUS NOMBREUSES que les lettres
latines reçoit `dir="rtl" lang="ar"`.

**La règle est volontairement plus stricte que `dir="auto"`.** `dir="auto"`
décide sur le PREMIER caractère fort : une ligne comme
« تحليل النص الفلسفي — Philosophie · 2ème Bac » basculerait en RTL alors
qu'elle est majoritairement française. On COMPTE. Résultat : une phrase
française qui cite un terme arabe entre parenthèses — le cas le plus
fréquent de ces leçons, « la thèse (أطروحة النص) » — ne bouge pas d'un
pixel. Elle est française.

Côté CSS (`globals.css`) : pas d'italique, filet de citation à droite,
interligne 1,9 — l'arabe empile des signes au-dessus et au-dessous de la
ligne de base, et à 1,65 les diacritiques d'une ligne touchent la suivante.

Le markdown et les YAML ne changent pas. **C'est le rendu qui sait lire ce
qu'il rend.**

## La porte, et ce qu'elle a rapporté d'elle-même

`dom-truth` porte désormais un balayage : *tout bloc majoritairement RTL est
rendu `dir=rtl`, porte `lang=ar`, et n'est pas en italique.*

Il ne teste pas UNE page : il relit le corpus, retient toute leçon dont la
source contient de l'écriture RTL, et vérifie chacune. **Une première
version ne lisait que `lesson.md` et ne trouvait donc qu'UNE leçon sur onze**
— les sujets de philosophie vivent dans `exercises.yaml`. Élargie aux
sidecars, elle a révélé la vraie surface : 49 blocs, 10 leçons, et une
seconde famille de composants (`MdBlock`, partagé par les cartes d'exercice
et de banque) qui n'était pas corrigée par le premier passage.

**C'est la porte qui a trouvé les trois quarts du défaut.** Le correctif
initial, écrit sur ce qu'un œil avait vu, ne couvrait que la leçon de
méthode.

État : **236 contrôles dom-truth, 0 échec**, 49 blocs arabes conformes,
15 leçons dont l'arabe ne vit que dans des commentaires YAML (rien au rendu,
signalé en une ligne pour que le compte reste lisible).

## Une note d'honnêteté sur l'identité du DOM

Le même commit remplace `rehype-katex` par `rehypeKatexHtml` dans les trois
composants CLIENTS (même gain d'hydratation que côté serveur). L'identité du
DOM tient sur **69 des 70 routes**. Sur la 70ᵉ (`pc/rlc-serie`), la seule
différence est l'espacement d'un attribut `style` :
`height: 1.415em; vertical-align: -0.345em;` devient
`height:1.415em;vertical-align:-0.345em`.

Ce n'est pas un écart de rendu — le CSS est identique. C'est la trace d'un
travail QUI N'A PLUS LIEU : avant, React réécrivait ces attributs pendant
l'hydratation, et le CSSOM du navigateur les re-sérialisait avec ses
espaces. Maintenant la chaîne de KaTeX arrive telle quelle et personne n'y
retouche.
