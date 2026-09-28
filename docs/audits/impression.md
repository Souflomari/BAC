# L'impression — ce que l'élève obtient sur le papier

*Mesuré le 2026-09-05. Instrument : `web/scripts/impression.mjs`.
Corpus : les 62 leçons + l'accueil, `/examens`, `/matieres/pc` — 65 pages,
650 contrôles.*

---

## Pourquoi cette mesure

Un élève marocain de terminale **imprime**. Il imprime pour annoter au stylo,
pour réviser sans écran, pour emporter en salle d'étude. La feuille est donc
un rendu du produit au même titre que la page.

`globals.css` porte trois blocs `@media print` soignés — chrome masqué, fond
blanc, grille effondrée, figures non coupées, chapitres dépliés. **Rien ne
vérifiait qu'ils font ce qu'ils disent**, et c'est exactement la forme
d'affirmation que cette session a passé deux jours à démentir ailleurs.

## Ce qui marchait déjà

Cinq des six contrôles passaient dès la première mesure, sur les 65 pages :

- l'en-tête, le rail et le pied **disparaissent** (0 px) ;
- **tous les chapitres sont dépliés** — 11/11 sur `rlc-serie`, 13/13 sur
  `suites-numeriques` : l'élève imprime le cours entier, pas le chapitre
  ouvert ;
- rien ne dépasse la colonne imprimable (717 px en A4) ;
- aucune figure n'est plus large que la page ;
- le corps est **noir sur blanc**.

C'est un bon résultat, et il vaut d'être dit : le travail d'impression fait
en amont tient.

## Le défaut : imprimer en thème sombre donnait des aplats noirs

Un élève qui **lit en thème sombre** et qui imprime obtenait ses figures sur
fond `#1A1917`. Des aplats noirs pleine page : une cartouche vidée, une
feuille sur laquelle on ne peut plus écrire au stylo, et des figures dont le
contraste n'a jamais été pensé pour de l'encre.

**Pourquoi.** Le bloc `@media print` de `globals.css` remettait bien le corps
en blanc — mais il ne touchait qu'à deux jetons de surface, pas aux jetons de
FIGURE. Et la classe `.dark` de `tokens.generated.css`, de même spécificité
et déclarée après, gardait la main sur tout le reste.

**Le correctif appartient à la source des jetons, pas à la feuille de style.**
`generate-tokens.mjs` émet désormais, après les deux thèmes, un bloc

```css
@media print { :root, :root.dark { /* toute la palette CLAIRE */ } }
```

Une seconde liste de couleurs écrite à la main dans `globals.css` aurait
dérivé dès la première retouche de la palette ; générée, elle ne peut pas.
**Le papier n'a pas de thème.**

---

## L'instrument, et les deux boîtes fantômes

Deux fois, la sonde a annoncé des débordements qui n'existaient pas — et deux
fois la cause était la même : **une boîte que le navigateur déclare mais ne
peint pas.**

1. **Les descendants d'un `<svg>`.** La boîte d'un `<path>` ignore le
   découpage du `viewBox` : 8 239 px annoncés pour une figure de 640. C'est
   le `<svg>` lui-même qui doit tenir dans la page, et il est vérifié à part.
2. **Le MathML de KaTeX.** `.katex-mathml` fait 1×1 px et découpe, mais le
   `<math>` qu'il contient déclare sa largeur naturelle — 822 px pour une
   formule longue, alors que **rien n'est peint**. Deux leçons entières
   (`probabilites-conditionnelles`, `genetique-populations`) étaient
   déclarées fautives par cette boîte invisible.

Et un troisième piège, de méthode celui-là : la première version mettait la
page en page dans une **fenêtre de la largeur de la FEUILLE** (794 px) au lieu
de la **colonne imprimable** (717 px). Tout ce qui fait 100 % de large
« débordait » — six faux défauts par leçon. À l'impression, Chrome met en
page dans la zone imprimable ; l'émulation doit faire pareil.

**Le test négatif de la porte a été joué** : en retirant le bloc d'impression
du générateur de jetons et en rebâtissant, la porte sort en 1 et nomme
exactement le défaut (`--figure-surface = #1a1917`). Une première tentative de
test négatif avait, elle, échoué en silence : elle tronquait le fichier
généré, `prebuild` (`generate-tokens --check`) refusait le build, et
l'instrument mesurait l'ANCIEN build — vert, donc rassurant, donc faux.
*Un test négatif qui ne rebâtit pas ne teste rien.*

---

## Ce que la mesure ne dit pas

- **Le PDF réel.** On mesure la mise en page en émulation `print`, pas le
  fichier produit. Le nombre de pages, les coupures de page effectives et le
  rendu des polices à l'impression ne sont pas jugés.
- **Les autres formats de papier.** Tout est en A4 aux marges par défaut de
  Chrome ; Letter, ou des marges resserrées, changeraient la colonne.
- **L'encre.** Un aplat d'accent conforme à l'écran peut rester coûteux à
  imprimer. Personne n'a arbitré ce que le produit a le droit de consommer.
