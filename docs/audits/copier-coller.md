# Le presse-papier — ce que l'élève obtient quand il recopie son cours

*Mesuré et corrigé le 2026-09-05. Instrument : `web/scripts/copie-maths.mjs`.
Corpus : les 62 leçons, 22 947 formules.*

---

## L'angle mort

Un élève qui révise **recopie**. Il sélectionne un passage, il le colle dans
ses notes, dans un document, dans un message à un camarade. Ce que le
presse-papier lui donne est donc un rendu du produit au même titre que la
page — et personne ne l'avait jamais regardé.

## Le défaut

KaTeX rend **chaque formule deux fois** : un arbre MathML pour les lecteurs
d'écran (`.katex-mathml`) et un arbre HTML pour l'œil (`.katex-html`). Le
premier est masqué **visuellement** — `clip-path: inset(50%)`, 1×1 px — mais
il reste dans le flux, donc dans la **sélection**, donc dans le presse-papier.

Concrètement, sur `rlc-serie`, ⌘A puis ⌘C donnait :

> que va faire la tension **u C ( t ) u C ​ (t)** aux bornes du condensateur ?

au lieu de :

> que va faire la tension **u C ​ (t)** aux bornes du condensateur ?

**Sur les 62 leçons : 138 773 caractères parasites**, soit une formule
doublée à peu près partout où il y en a une. Un élève qui recopie un chapitre
de maths dans ses notes obtient un texte illisible et croit s'être trompé de
manipulation.

## Le correctif

Deux lignes de CSS, dans `web/src/app/globals.css` :

```css
.katex-mathml { user-select: none; -webkit-user-select: none; }
```

`user-select: none` retire le MathML de la **sélection** sans toucher à
l'**arbre d'accessibilité** : un lecteur d'écran continue de lire la formule
exactement comme avant — c'est `aria-hidden` qui gouverne cela, et il n'est
pas touché. Ce que l'élève colle devient ce qu'il voit.

**Après : zéro caractère parasite sur 62 pages et 22 947 formules.**

---

## L'instrument, et les deux critères qu'il a fallu jeter

Le résultat est exact et binaire, mais il a demandé trois essais — et les
deux premiers auraient publié un chiffre faux.

**Ce qui marche : trois copies, et une comparaison.** L'instrument fait ⌘A/⌘C
pour de vrai (`navigator.clipboard.readText()`), trois fois par page :

| Copie | État de la page | Ce qu'elle vaut |
|---|---|---|
| **IDÉAL** | MathML retiré du rendu (`display: none`) | par construction, ce que l'œil voit |
| **RÉEL** | la page telle qu'elle est livrée | ce que l'élève obtient |
| **TÉMOIN** | sélection RENDUE au MathML (`user-select: text !important`) | l'état d'avant le correctif |

Propre si **RÉEL == IDÉAL** (espaces mis à part : retirer une boîte du rendu
change la façon dont le navigateur sérialise les sauts de ligne, et ce n'est
pas le sujet). Et l'instrument **n'a le droit de conclure que si TÉMOIN !=
IDÉAL** — sinon il ne sait pas voir le défaut qu'il prétend écarter.

**Les deux critères jetés :**

1. **Chercher le bloc Unicode « Mathematical Alphanumeric Symbols »**
   (𝑢 = U+1D462), en croyant que le MathML s'écrit toujours avec. Il ne
   s'écrit pas avec ici — « u », « C », « t » y sont des lettres ordinaires —
   et le témoin restait **muet** sur une page pleine de formules doublées.
2. **Chercher la signature « texte MathML + texte HTML » collés.** `u_n`
   donne « un » + « un​ », et la phrase « …s'il reste un u_n ou un u_n
   dedans… » la déclenche sans qu'aucune formule ne soit doublée ; et dans
   une dérivation, la fin d'une formule et le début de la suivante forment la
   même suite de caractères. **Un critère par sous-chaîne ne peut pas
   distinguer une coïncidence de prose d'un doublon.**

Et un piège de méthode, payé avant les deux autres : la première mesure
utilisait une sélection **construite à la main** (`Range` +
`selectNodeContents`). Une sélection programmatique sérialise **tout**, y
compris ce que `user-select: none` retire à l'utilisateur : elle annonçait
donc un correctif à moitié efficace alors qu'il était total. **Pour mesurer
ce que vit l'élève, il faut faire son geste — ⌘A, ⌘C — et lire le
presse-papier.**

---

## Ce que la mesure ne dit pas

- **Le collage RICHE.** On lit `text/plain`. Ce qu'un traitement de texte
  reçoit en `text/html` — donc ce qui arrive dans Word ou Docs quand le
  collage garde la mise en forme — n'est pas mesuré.
- **`innerText` continue d'inclure les deux arbres.** Les balayages qui
  lisent le texte rendu voient donc encore la formule en double. C'est sans
  conséquence pour ceux d'aujourd'hui (ils cherchent des motifs de rédaction,
  pas des formules), mais un instrument futur qui compterait des caractères
  de prose s'y ferait prendre.
- **La recherche du navigateur (⌘F).** Elle n'est pas mesurée ici ; savoir si
  elle mord sur le MathML masqué reste ouvert.
