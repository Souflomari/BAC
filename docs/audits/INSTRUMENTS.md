# Les instruments — ce que chacun mesure, et ce qu'il ne mesure PAS

> Écrit le 2026-09-04, après une journée où **sept fenêtres de mesure** ont
> été ouvertes et où **six d'entre elles ont trouvé une classe entière de
> défauts**. La leçon de cette journée n'est pas dans les correctifs : c'est
> que **le harnais ne trouve que ce qu'on lui demande de regarder**, et que
> personne ne tenait la liste de ce qu'il ne regardait pas.
>
> Ce document est cette liste. Chaque entrée dit **ce que l'instrument
> mesure**, **comment on le lance**, et — la colonne qui compte — **ce qu'il
> ne dit rien de**.

---

## Les portes (elles cassent le build)

| Instrument | Mesure | Ne dit RIEN de |
|---|---|---|
| `web/scripts/validate-content.mjs` | La SOURCE : math équilibrée, YAML valide, marqueurs qui résolvent, jargon d'autorat (codes R, « rung ») hors du texte visible, niveaux de titres sans saut, sommet légataire, **fermeture d'un bloc `$$` sur sa propre ligne** | Le RENDU. Une figure structurellement valide peut être illisible ; c'est `figure-preview` qui le dit |
| `web/scripts/dom-truth.mjs` | Le RENDU, 210 contrôles : styles calculés contre les jetons, anatomie de page, pagination, ancres accentuées, débord à 320 px, taille naturelle des figures, cibles tactiles, tabulation, texte à 200 %, **direction d'écriture (RTL)**, **jargon de rédaction dans le texte rendu**, **reflow à 320 × 256**, **lien d'évitement fonctionnel** | Le corpus ENTIER — il échantillonne quelques leçons témoins. Les balayages ci-dessous font le tour complet |
| `web/scripts/token-gate.mjs` | Une seule syntaxe de consommation des jetons (pas de `-[var(--…)]`, pas de hex, pas de rupture Tailwind morte) | Si le jeton lui-même est juste — c'est `contrast-gate` |
| `web/scripts/contrast-gate.mjs` | Les 80 paires de la palette, ratio par ratio, clair ET sombre | Le contraste d'une figure : les couleurs y sont peintes en jetons, mais leur VOISINAGE n'est pas jugé |

## Les balayages de corpus (outils, pas portes)

| Instrument | Mesure | Ne dit RIEN de |
|---|---|---|
| `web/scripts/figure-preview.mjs` | Une figure hors du site, **sept classes** : texte hors CADRE, texte hors de SON PANNEAU, chevauchements d'étiquettes, tracés qui barrent du texte, aplats restés clairs en thème sombre, **contraste d'un texte contre ce qui est vraiment peint derrière lui**, **texte effacé par une étape ultérieure**. Le contraste est jugé en deux temps — le modèle de peinture propose, un ÉTAGE PIXEL dispose (capture, retrait du texte, recapture, couleur médiane du fond). `--pixels-tous` passe TOUS les textes du corpus au crible des pixels (~25 min) ; `--porte` arme les deux classes propres (cadre, panneau) et tourne en CI | La GRAVITÉ d'une collision en thème sombre (contraste non rejugé). Le HALO (`paint-order`) : l'étage pixel le retire avec le texte et juge quand même sur la teinte — aucune figure ne s'en sert aujourd'hui. Un texte sous 0,5 d'opacité, traité comme un ornement. Les trois classes non armées restent informatives — 7 chevauchements, 85 tracés, 2 aplats, tous documentés |
| `web/scripts/etroit-sweep.mjs` | 70 pages × 3 largeurs de téléphone (320/360/390) : débord horizontal, chapitres dépliés | La lisibilité. Une page peut ne pas déborder ET rester illisible — c'est ce que la sonde de figures a montré |
| `web/scripts/horsligne-sweep.mjs` | Six scènes de coupure réseau : navigation par chapitre, clic vers une autre leçon, bouton Retour, leçon déjà visitée, réponse à un QCM, retour du réseau. **Ce qui tient tient ; ce qui casse est borné** — voir `docs/audits/hors-ligne.md` | Le réseau qui RAMPE au lieu de mourir (latence + pertes de paquets), et la coupure pendant un enregistrement |
| `web/scripts/reseau-malade.mjs` | Le réseau qui RAMPE : 300 ms de latence, ~400 kbit/s, **une requête sur cinq perdue** (tirage à graine, donc rejouable). Cinq scènes + un TÉMOIN sur réseau parfait sans lequel rien n'est concluant. A trouvé qu'un morceau de JS perdu laisse le cours lisible et la page morte **sans un mot**, et qu'une route qui a échoué **reste morte après le retour du réseau** | Le vrai réseau (DNS, TLS, CDN, cache Vercel) : tout est un build local derrière une émulation. Et la reprise d'un enregistrement coupé en vol |
| `web/scripts/annonce-sweep.mjs` | Ce qu'un lecteur d'écran ANNONCE : les régions live et leur politesse, le premier pas au clavier, les reculs de l'ordre de tabulation, le sort du focus au changement de chapitre. **68 pages** ; a trouvé que le lien d'évitement n'était ni premier ni universel | La VOIX. Ce qu'un vrai lecteur prononce dépend de son mode, de sa verbosité et de sa langue — on ne lit ici que le DOM et l'arbre d'accessibilité |
| `web/scripts/zoom400-sweep.mjs` | WCAG 1.4.10 dans sa forme STRICTE : 320 × 256 px, soit 1280 × 1024 vu à 400 %. Débord horizontal, part de hauteur prise par les barres collantes, lignes de prose qui restent, navigation atteignable. **70 pages, 0 défaut** — l'en-tête collant fait 57 px, soit 22 % de l'écran, et il reste 7 à 9 lignes | Le zoom du SYSTÈME (loupe d'OS), qui agrandit les pixels au lieu de reflow |
| `web/scripts/zoom-sweep.mjs` | Le corpus avec le texte doublé (SC 1.4.4) : débord et texte COUPÉ | Le zoom NAVIGATEUR (qui redimensionne tout, pas seulement le texte) |
| `web/scripts/cls-sweep.mjs` | Le saut de mise en page au chargement, réseau libre puis 3G bridé | Le TEMPS de chargement lui-même (LCP, TTFB) — jamais mesuré sur ce projet |
| `web/scripts/pagination-probe.mjs` | 11 promesses × 5 leçons : un seul chapitre visible, liens profonds, flèches bornées, ancres, impression dépliée | Ce que l'élève COMPREND de la pagination — aucune mesure ne le dira |
| `web/scripts/poids-sweep.mjs` | Trois passes : (A) le document seul sur les 70 routes, (B) LCP/TTFB/poids ventilé par type, réseau libre puis 3G, (C) **processeur bridé ×1/×4/×6 — blocage total et temps au bout duquel un APPUI change enfin de chapitre** | Le réseau RÉEL (DNS, TLS, CDN, cache Vercel) : tout est un build local. Et la consommation de données d'un forfait — l'accueil tire ~920 ko de préchargement RSC, après la peinture donc hors chronomètre |
| `web/scripts/renvois-visibles.mjs` | Le jargon de rédaction que l'élève voit VRAIMENT (`innerText`, chapitres dépliés) : codes de barreau `R<n>` et mot « rung ». C'est lui qui a montré que la campagne de juillet, déclarée close, laissait 529 codes dans les sidecars | La JUSTESSE d'un renvoi : « chapitre 3 » peut être visible et faux. C'est ce qui est arrivé — voir `renvois-barreaux.py` |
| `web/scripts/slugs-visibles.mjs` | Les noms de DOSSIER (`la-verite`) arrivés sous les yeux d'un élève. Classe désormais vide et gardée dans `dom-truth` | Les slugs d'un seul mot (`autrui`), volontairement hors champ : ce sont aussi des mots français |
| `web/scripts/katex-identite.mjs` | Que deux builds rendent le MÊME DOM : les 70 routes chargées dans un navigateur, `outerHTML` sérialisé après hydratation et comparé octet par octet | Rien du rendu VISUEL — deux DOM identiques ont forcément la même image, mais l'inverse n'est pas vrai |
| `web/scripts/hunt.mjs` | Le balayage adversarial de toutes les routes | — |
| `web/scripts/item-stats.mjs` | Le biais de position des bonnes réponses, avant/après mélange | La QUALITÉ des distracteurs |
| `web/scripts/regle-atelier.mjs` | La règle NORTH-STAR-V2 §4, rendue mécanique | — |

## Les harnais d'image

| Instrument | Mesure |
|---|---|
| `web/scripts/shots.mjs` | Une leçon en profondeur : pleine page clair/sombre, header au repos et défilé, **chaque battement de chaque animation**, chaque figure statique, **un shot par chapitre**, aux trois paliers de bureau (1280 / 1536 / 1920) + mobile |
| `web/scripts/site-shots.mjs` | La matrice de ruptures du site entier |
| `web/scripts/components-shots.mjs` | Les gros plans des composants interactifs |

---

## Ce que RIEN ne mesure encore

Écrit ici pour que la prochaine session n'ait pas à le redécouvrir :

1. **La consommation de données.** L'accueil tire ~920 ko de préchargement
   RSC des leçons visibles (comportement par défaut de `next/link`). C'est
   APRÈS la peinture, donc invisible au chronomètre — mais pas au forfait
   d'un élève. Ni mesuré en continu, ni arbitré.
2. **La VOIX d'un vrai lecteur d'écran.** Ce qui est annoncé est maintenant
   mesuré (`annonce-sweep`) — régions live, ordre, focus au changement de
   chapitre. Ce qui ne l'est pas : ce qu'un lecteur PRONONCE réellement,
   qui dépend de son mode, de sa verbosité et de sa langue.
3. **La gravité d'une collision d'étiquettes en thème sombre.** Le CONTRASTE
   en thème sombre, lui, n'est plus un angle mort : mesuré aux pixels le
   2026-09-04, dans les deux thèmes, et armé en CI dans les deux
   (`docs/audits/contraste-figures.md`). Ce qui reste ici, c'est la gravité
   d'un CHEVAUCHEMENT — deux étiquettes qui se marchent dessus se lisent
   différemment selon le thème, et rien ne le juge.
4. **La reprise d'un enregistrement coupé en vol** (progression, tentative).
   Le réseau qui rampe, lui, est mesuré depuis le 2026-09-04
   (`reseau-malade`, `docs/audits/reseau-malade.md`) : c'est lui qui a montré
   qu'un seul morceau de JavaScript perdu laisse le cours lisible et la page
   MORTE, sans un mot pour l'élève. Ce que ce balayage ne touche pas : ce qui
   est ENVOYÉ après une réponse — la sauvegarde, pas l'affichage.
6. **Le reste du multilingue.** `dom-truth` garde maintenant la DIRECTION
   d'un bloc arabe. Ce qu'il ne garde pas : la césure, la fonte arabe
   réellement choisie par le navigateur (aucune des fontes du site n'a de
   glyphes arabes — c'est un repli système), et les 48 caractères du corpus
   hors du sous-ensemble `latin` (→, ≠, ✓, α, β, ᵉ) qui tombent eux aussi
   sur un repli.
7. **La production.** Tout ce document parle d'un build local. La synchro
   de production reste NON VÉRIFIÉE (CLAUDE.md).

*(Le point 3 de la version du matin — « le zoom navigateur à 400 %, dans la
forme stricte de SC 1.4.10 » — a été instrumenté le même jour :
`zoom400-sweep`, 320 × 256 px, 70 pages, **0 défaut**. C'est le premier
balayage de la journée à ne rien trouver, et c'est une information : la
colonne de lecture et l'en-tête collant tiennent à 400 % de zoom. Deux de
ses quatre contrôles sont armés dans `dom-truth` sur sept pages témoins.)*

*(Le point 1 de la version du matin — « le temps de chargement : LCP, TTFB,
poids des pages » — a été instrumenté le jour même par `poids-sweep`, et sa
passe la plus utile n'était dans aucun des trois mots : le PROCESSEUR bridé.
Une leçon dense se peint en 0,5 s et reste sourde 6,7 s sur un téléphone bon
marché. Voir `docs/audits/poids-et-reactivite.md`. Ce qui reste sous ce
numéro, c'est la consommation de données — une autre question.)*

*(La classe « contraste d'un texte de figure contre ce qui est vraiment peint
derrière lui », nommée dans ce document le 2026-09-03 comme non instrumentée,
a été mesurée et fermée le lendemain — et elle a rapporté une classe de
défaut que personne n'avait imaginée : **un texte effacé par une étape
ultérieure**, dont le contraste nominal est parfait. Trois figures
s'effaçaient elles-mêmes. Voir `docs/audits/contraste-figures.md`.)*

*(Le point 5 de la première version de cette liste — « le texte qui sort de
son panneau », nommé le 2026-09-03 et non instrumenté — a été mesuré et
fermé le lendemain : 9 cas, 4 débordements voulus déclarés
`data-hors-panneau`, 5 défauts corrigés, porte armée en CI. C'est
exactement l'usage prévu de cette liste.)*

## Une règle de comptage, apprise deux fois le même jour

**Une mesure qu'on ne met pas à l'épreuve n'est pas une mesure.** Deux fois
le 2026-09-04, un compteur a annoncé un ordre de grandeur de trop :

- **144 « noms de fichier » visibles** — il y en avait **6**. Les 138 autres
  vivaient dans le `<title>` d'un SVG : le nom ACCESSIBLE de la figure, qui
  a le droit de nommer son fichier et que personne ne lit.
- **2 945 « mots anglais » dans la prose française** — il y en avait **2**.
  L'échappement d'un `lookbehind` avait collapsé (`\\w` au lieu de `\w`),
  et « the » mordait dans « authentique », « per » dans « personne ».

Dans les deux cas, le chiffre absurde était le signal. **Un compteur qui
trouve beaucoup plus que ce qu'un œil trouve sur une page doit être suspecté
avant d'être cru** — et une porte armée sur un tel compteur serait désarmée
dans la semaine.

La règle a resservi **trois fois** le lendemain, sur la sonde de contraste
des figures — 418 défauts, puis 60, puis 70 « textes invisibles » qui sont
parfaitement lisibles, avant que le compte honnête (101, dont 30 sous dette
owner) sorte. D'où le corollaire, qui vaut pour tout instrument qui
RAISONNE sur un rendu au lieu de le regarder :

> **Le modèle propose, les pixels disposent.**
> Un modèle de peinture — géométrie, ordre du document, `fill-opacity`,
> opacité des groupes — est fidèle et se trompe en silence. Quand une mesure
> peut être faite pour de vrai (capturer, retirer l'élément, recapturer,
> comparer), elle doit l'être, et c'est ELLE qui rend le verdict.

Et un instrument qui mesure doit porter son propre **témoin** : la sonde de
contraste refuse de trancher quand le fond qu'elle mesure est celui du corps
de la page, parce que c'est physiquement impossible à l'intérieur d'une
carte de figure. C'est ce témoin qui aurait dû exister d'emblée — il aurait
épargné une passe entière de faux positifs.

## La règle de méthode

**Une porte ne s'arme que sur une classe propre.** Si la classe ne l'est
pas, l'instrument reste un OUTIL et la dette s'écrit — sinon la porte ment
en vert. C'est pourquoi `cls-sweep` n'est pas une porte : `/examens/<id>`
est à 0,320, et c'est un arbitrage de propriétaire.

**Et toute exception vit dans le fichier**, jamais dans la tête de qui l'a
posée : `COULEURS SÉMANTIQUES:`, `DETTE OWNER:`, `RECOUVREMENT ASSUMÉ:`,
`CODES R LÉGITIMES:`, `data-rature`, l'exception « Inline » des cibles
tactiles, les trois exclusions du balayage à 200 %.

`RECOUVREMENT ASSUMÉ:` (2026-09-04) est le plus récent, et il pose une
exigence de plus que ses aînés : **il doit NOMMER le texte concerné entre
guillemets français**, et la sonde n'exempte que celui-là. Un marqueur qui
vaut pour tout un fichier fait taire l'instrument pour l'accident qu'on y
introduira demain.
