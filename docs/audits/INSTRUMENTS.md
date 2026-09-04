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
| `web/scripts/dom-truth.mjs` | Le RENDU, 210 contrôles : styles calculés contre les jetons, anatomie de page, pagination, ancres accentuées, débord à 320 px, taille naturelle des figures, cibles tactiles, tabulation, texte à 200 %, **direction d'écriture (RTL)**, **slugs de leçon dans le texte rendu** | Le corpus ENTIER — il échantillonne quelques leçons témoins. Les balayages ci-dessous font le tour complet |
| `web/scripts/token-gate.mjs` | Une seule syntaxe de consommation des jetons (pas de `-[var(--…)]`, pas de hex, pas de rupture Tailwind morte) | Si le jeton lui-même est juste — c'est `contrast-gate` |
| `web/scripts/contrast-gate.mjs` | Les 80 paires de la palette, ratio par ratio, clair ET sombre | Le contraste d'une figure : les couleurs y sont peintes en jetons, mais leur VOISINAGE n'est pas jugé |

## Les balayages de corpus (outils, pas portes)

| Instrument | Mesure | Ne dit RIEN de |
|---|---|---|
| `web/scripts/figure-preview.mjs` | Une figure hors du site, **cinq classes** : texte hors CADRE, texte hors de SON PANNEAU, chevauchements d'étiquettes, tracés qui barrent du texte, aplats restés clairs en thème sombre. `--porte` arme les deux classes propres (cadre, panneau) et tourne en CI | La GRAVITÉ d'une collision en thème sombre (contraste non rejugé). Les trois classes non armées restent informatives — 7 chevauchements, 85 tracés, 2 aplats, tous documentés |
| `web/scripts/etroit-sweep.mjs` | 70 pages × 3 largeurs de téléphone (320/360/390) : débord horizontal, chapitres dépliés | La lisibilité. Une page peut ne pas déborder ET rester illisible — c'est ce que la sonde de figures a montré |
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
2. **Le lecteur d'écran, pour de vrai.** L'ossature est vérifiée (titres,
   noms accessibles, landmarks) ; ce qui est ANNONCÉ, dans quel ordre, avec
   quelles interruptions par `aria-live`, ne l'est pas.
3. **Le zoom navigateur à 400 %** (SC 1.4.10 dans sa forme stricte). On a
   mesuré 320 px à taille normale et 200 % de texte à 1280 — pas la
   combinaison exacte que la norme décrit.
4. **La gravité d'une collision d'étiquettes en thème sombre.**
5. **Le comportement hors ligne** et la reprise après coupure.
6. **Le reste du multilingue.** `dom-truth` garde maintenant la DIRECTION
   d'un bloc arabe. Ce qu'il ne garde pas : la césure, la fonte arabe
   réellement choisie par le navigateur (aucune des fontes du site n'a de
   glyphes arabes — c'est un repli système), et les 48 caractères du corpus
   hors du sous-ensemble `latin` (→, ≠, ✓, α, β, ᵉ) qui tombent eux aussi
   sur un repli.
7. **La production.** Tout ce document parle d'un build local. La synchro
   de production reste NON VÉRIFIÉE (CLAUDE.md).

*(Le point 1 de la version du matin — « le temps de chargement : LCP, TTFB,
poids des pages » — a été instrumenté le jour même par `poids-sweep`, et sa
passe la plus utile n'était dans aucun des trois mots : le PROCESSEUR bridé.
Une leçon dense se peint en 0,5 s et reste sourde 6,7 s sur un téléphone bon
marché. Voir `docs/audits/poids-et-reactivite.md`. Ce qui reste sous ce
numéro, c'est la consommation de données — une autre question.)*

*(Le point 5 de la première version de cette liste — « le texte qui sort de
son panneau », nommé le 2026-09-03 et non instrumenté — a été mesuré et
fermé le lendemain : 9 cas, 4 débordements voulus déclarés
`data-hors-panneau`, 5 défauts corrigés, porte armée en CI. C'est
exactement l'usage prévu de cette liste.)*

## La règle de méthode

**Une porte ne s'arme que sur une classe propre.** Si la classe ne l'est
pas, l'instrument reste un OUTIL et la dette s'écrit — sinon la porte ment
en vert. C'est pourquoi `cls-sweep` n'est pas une porte : `/examens/<id>`
est à 0,320, et c'est un arbitrage de propriétaire.

**Et toute exception vit dans le fichier**, jamais dans la tête de qui l'a
posée : `COULEURS SÉMANTIQUES:`, `DETTE OWNER:`, `CODES R LÉGITIMES:`,
`data-rature`, l'exception « Inline » des cibles tactiles, les trois
exclusions du balayage à 200 %.
