# Ce qu'un lecteur d'écran annonce — et ce qu'il fallait traverser d'abord

> Mesuré le 2026-09-04. Point 2 de la liste « ce que RIEN ne mesure encore »
> (`docs/audits/INSTRUMENTS.md`). Instrument :
> `web/scripts/annonce-sweep.mjs`, 68 pages.

---

## Ce que le harnais gardait déjà — et ce qu'il ne gardait pas

`dom-truth` vérifiait l'OSSATURE : niveaux de titres sans saut, noms
accessibles présents, landmarks en place. Rien ne disait **ce qui est
prononcé, dans quel ordre, ni ce qui INTERROMPT**.

L'interruption est le point sensible pour un produit qui se veut « un tuteur
patient » : une région `aria-live="assertive"` coupe la phrase en cours.
Posée sur un compteur ou une barre de progression, elle transforme la
lecture d'une leçon en bégaiement.

## Le défaut : le lien d'évitement était là où il ne sert à rien

**68 pages sur 68.** Le site avait bien un lien « Aller au contenu de la
leçon » — mais **seulement sur les pages de leçon**, et **après l'en-tête**.
Un lecteur d'écran devait donc traverser le wordmark, la recherche, le
sélecteur de filière et le menu Notions **avant d'atteindre le lien censé
lui épargner exactement ce trajet**. Sur les six pages hors leçon — accueil,
épreuves, matières, atelier, commencer — il n'y en avait aucun.

Un lien d'évitement qui n'est pas le premier focusable n'est pas un lien
d'évitement. C'est un lien.

**Corrigé** : `LienEvitement`, premier enfant du document, sur toutes les
routes, cible `#main-content` — ce `<main>` existe partout.

**Et il a fallu un attribut de plus pour qu'il MARCHE vraiment.** Après
activation, le focus restait sur `<body>` : Chromium se contentait de
déplacer le « point de départ de navigation séquentielle » (la tabulation
suivante tombait bien dans `<main>` — vérifié), mais la cible n'était jamais
focalisée, et plusieurs lecteurs d'écran continuent alors d'annoncer depuis
le haut de la page. `tabIndex={-1}` sur `<main>`, et le comportement cesse
de dépendre d'une heuristique de navigateur.

## Ce que la mesure a trouvé de SAIN — et c'est la moitié du rapport

- **Aucune région `assertive` dans tout le site.** Les quatre familles de
  régions live sont toutes `polite` : le compteur « Étape n / N » d'une
  figure par étapes, la position « Chapitre n / N » du rail, le retour d'un
  bouton de choix, la valeur recalculée d'une figure interactive. Ce sont
  exactement les cas où une annonce discrète est utile — et aucune ne coupe
  la parole.
- **Ordre de tabulation : 0 recul franc** sur 68 pages. Ce qui est annoncé
  suit ce qui est vu.
- **Le focus survit au changement de chapitre.** Il ne retombe jamais sur
  `<body>` — le pire cas, où le lecteur repart du haut de la page.
- **Le changement de chapitre est annoncé** : la région
  `p.chapter-position` porte « Chapitre n / N » et se met à jour.

## La porte

`dom-truth` vérifie désormais, sur six routes témoins, non pas la PRÉSENCE
du lien mais qu'il MARCHE, en trois faits :

1. la première tabulation l'atteint ;
2. il devient visible en recevant le focus (sinon il est inutilisable pour
   qui voit) ;
3. l'activer déplace vraiment le focus dans `<main>`.

Testée dans les deux sens : le lien retiré de `PageShell`, la porte échoue
en nommant la route et ce que la première tabulation donne à la place ;
remis, elle passe.

## Ce que ce balayage ne dit toujours pas

Il lit le DOM et l'arbre d'accessibilité — **pas la voix**. Ce qu'un vrai
lecteur d'écran prononce dépend aussi de son mode (navigation vs formulaire),
de sa verbosité et de sa langue. Le `lang="fr"` du document et les
`lang="ar"` posés sur les blocs arabes (voir
`docs/audits/arabe-direction.md`) sont les deux seuls leviers que ce corpus
lui donne ; on ne sait pas ce qu'il en fait.
