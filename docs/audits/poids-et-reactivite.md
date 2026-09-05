# Le poids et la réactivité — la page qui a l'air chargée mais ne répond pas

> Mesuré le 2026-09-04. Point 1 de la liste « ce que RIEN ne mesure encore »
> (`docs/audits/INSTRUMENTS.md`) : le temps de chargement, jamais regardé
> sur ce projet. Instrument : `web/scripts/poids-sweep.mjs` (trois passes).

---

## Ce que la mesure a trouvé

Une leçon dense **se peint en une demi-seconde et reste sourde pendant
six à neuf**.

Sur un téléphone bon marché (processeur bridé ×6), `reactions-acido-basiques`
affiche son texte au bout de **0,54 s** — l'élève voit sa leçon, elle a l'air
prête — puis **ne répond à aucun appui pendant 6,7 s**. Une pression sur la
flèche de chapitre ne fait rien. Un appui sur un bouton de QCM ne fait rien.
La page est là, elle ne bouge pas.

C'est la pire forme de lenteur : celle qui ne ressemble pas à un chargement.
Un écran vide dit « attends » ; une page complète qui ignore le doigt dit
« c'est cassé ».

**Et c'est invisible depuis une machine de développement.** Sans bridage, le
même défaut vaut 0,86 s — agaçant, indétectable. Exactement comme le CLS ne
se voyait qu'en réseau bridé : *le harnais ne trouve que ce qu'on lui
demande de regarder.*

## Le chiffre, par appareil (état AVANT le correctif de cette session)

| Page | nœuds | ×1 (bureau) | ×4 (milieu de gamme) | ×6 (téléphone bon marché) |
|---|---:|---:|---:|---:|
| `pc/reactions-acido-basiques` | 42 987 | 0,86 s | 3,42 s | **6,67 s** |
| `maths/suites-numeriques` | 41 167 | 0,84 s | 3,68 s | **6,05 s** |
| `pc/rlc-serie` | 29 988 | 0,98 s | 4,52 s | **7,72 s** |
| `svt/moyens-de-defense` (témoin, sans formules) | 1 506 | 0,10 s | 0,57 s | 0,80 s |
| `/examens/<id>` | 132 | — | — | — |

*(« réactif après » : le temps au bout duquel une PRESSION DE TOUCHE change
enfin de chapitre. On ne guette pas un marqueur du DOM — le serveur rend
déjà le chapitre 0 comme actif, un marqueur mentirait.)*

**Le témoin est la moitié de la démonstration.** `moyens-de-defense` est une
leçon complète, avec ses figures, ses exercices, ses chapitres — et 1 506
nœuds parce qu'elle ne contient pas de formules. Elle répond en 0,8 s là où
ses voisines mettent sept fois plus. Ce n'est donc pas « les leçons sont
lourdes ». C'est le VOLUME DE FORMULES.

## La chaîne de causes, mesurée maillon par maillon

1. **992 formules** sur `reactions-acido-basiques`.
2. KaTeX rend chacune en **~40 nœuds** (MathML pour le lecteur d'écran +
   HTML visuel) → **39 424 nœuds de KaTeX**, soit **92 % du document**.
3. Les 14 chapitres sont tous rendus côté serveur, 13 masqués :
   **98 % des nœuds sont dans un chapitre que l'élève ne lit pas**.
4. Le document pèse **4,8 Mo brut / 412 ko gzip**, dont **2,96 Mo (62 %) de
   charge RSC** — la même arborescence re-sérialisée en JSON dans des
   `<script>`, pour l'hydratation.
5. À ×4, l'ANALYSE du HTML seule prend **1,4 à 1,6 s** ; l'hydratation et
   l'exécution des chunks ajoutent le reste.

## Ce qui a été fait — et ce que ça vaut, honnêtement

**`rehype-katex` a été remplacé par `rehypeKatexHtml`** (`web/src/lib/`),
qui pose la sortie de KaTeX comme **une chaîne HTML** au lieu d'un arbre
React de quarante nœuds. KaTeX est inerte — aucun état, aucun écouteur,
aucune interactivité — donc React n'a aucune raison de posséder ses nœuds.

**Le DOM produit est identique au caractère près.** Ce n'est pas une
opinion : `web/scripts/katex-identite.mjs` charge les 70 routes dans un vrai
navigateur, sérialise `document.documentElement.outerHTML` après hydratation
et compare. **70 routes, 0 différence.**

Résultat, en A/B vérifié (même machine, même session, build servi contrôlé à
chaque bascule — voir « le piège » plus bas) :

| | base | après | |
|---|---:|---:|---|
| document `acido` (gzip) | 410 ko | 393 ko | −4 % |
| somme des 70 documents | 10,6 Mo | 10,2 Mo | −4 % |
| accueil, poids total | 1 712 ko | 1 589 ko | −7 % |
| blocage ×4, `acido` | 4 470 ms | 4 120 ms | −8 % |
| blocage ×6, `acido` | 8 709 ms | 6 279 ms | **−28 %** |
| blocage ×6, `suites` | 8 382 ms | 6 008 ms | **−28 %** |
| blocage ×6, `rlc-serie` | 9 741 ms | 7 846 ms | −19 % |
| réactif ×6, `acido` | 6 671 ms | 5 392 ms | **−19 %** |
| réactif ×6, `suites` | 6 054 ms | 5 038 ms | −17 % |
| réactif ×6, `rlc-serie` | 7 719 ms | 6 487 ms | −16 % |

**À dire tel quel : ce n'est pas la victoire espérée.** On visait le poids
du document et on en a pris 4 %, parce que la charge RSC échappe chaque `<`
en `<` — six octets pour un — ce qui mange presque tout le gain
théorique de la forme chaîne. Ce qu'on obtient vraiment, c'est **du travail
en moins pour React à l'hydratation**, et cela se voit là où le processeur
est le facteur limitant : **à ×6, c'est-à-dire sur le téléphone de l'élève
visé**. À ×4 et à ×1, c'est dans le bruit.

Une seconde et demie rendue à un élève sur un téléphone bon marché, sans
qu'un pixel bouge. C'est petit et c'est réel. Ça ne referme pas le sujet.

## Ce qui reste — et c'est un arbitrage de propriétaire

**Le vrai levier n'est pas KaTeX, c'est le nombre de chapitres servis
d'un coup.** 98 % des nœuds sont dans des chapitres masqués. Le témoin
`moyens-de-defense` montre le prix : **0,8 s au lieu de 6,7 s**, soit
environ **85 % du défaut**, si le document ne portait que le chapitre lu.

Mais rendre les chapitres à la demande CASSE quatre propriétés que le
produit tient aujourd'hui, et aucune n'est négligeable :

- **l'impression déplie tout** (un élève imprime sa leçon entière) ;
- **la recherche du navigateur (⌘F) trouve dans toute la leçon** ;
- **un lien profond vers n'importe quel titre s'ouvre instantanément**, sans
  requête — c'est ce que la sonde de pagination vérifie sur 11 promesses ;
- **une fois la page chargée, plus rien ne dépend du réseau** — ce qui
  compte quand la connexion est ce qu'elle est.

Un compromis existe (ne servir que le chapitre demandé + les autres en
différé), mais il déplace le coût plutôt qu'il ne l'efface, et il ajoute un
état de chargement au milieu d'une leçon. **C'est une décision de produit,
pas une optimisation** : elle appartient au propriétaire. Le chiffre est ici
pour qu'elle se prenne sur un fait.

## Un défaut vivant trouvé en chemin : cinq formules rendues en LaTeX brut

En comparant deux rendus, le contrôle d'identité a buté sur des
`<span class="katex-error">`. Cinq leçons affichaient **du LaTeX brut, en
rouge, à l'élève** :

`maths/equations-differentielles`, `maths/geometrie-espace`, `pc/dipole-rl`,
`pc/ondes-mecaniques-progressives`, `pc/rc-charge`.

**La cause, et pourquoi la porte ne l'avait pas vue.** Un bloc `$$…$$` sur
plusieurs lignes dont la fermeture est COLLÉE à la fin de la dernière ligne
de formule. `validate-content` extrayait les blocs avec une expression
permissive (`/\$\$([\s\S]*?)\$\$/`) et les trouvait parfaitement valides.
`remark-math`, lui, ne ferme un bloc de flux QUE sur une ligne ne contenant
que `$$` : il continuait donc de lire, avalait le paragraphe suivant, et
donnait le tout à KaTeX. **Le validateur disait « math ok » ; la page disait
le contraire.**

Les cinq sont corrigées, et `validate-content` porte désormais la règle —
testée dans les deux sens : en recollant la fermeture de `dipole-rl`, elle
échoue en nommant les lignes 221 et 223 ; remise en place, elle passe.

C'est le troisième défaut de cette semaine dont la cause est **un écart
entre ce que la porte modélise et ce que le moteur fait vraiment**. La leçon
se répète : *une porte qui parle de la SOURCE doit être confrontée au
RENDU*.

## Le piège de mesure, écrit pour qu'il ne soit pas payé deux fois

`/proc/<pid>/comm` est **tronqué à 15 caractères** : le serveur s'y nomme
`next-server (v1`, jamais `next-server`. Un arrêt qui teste l'égalité stricte
ne mord donc pas ; le vieux serveur survit ; le nouveau échoue en
`EADDRINUSE` en silence dans un `nohup` ; **et l'on mesure le build précédent
en croyant mesurer le nouveau**. Une première série de chiffres a été jetée
pour cette raison.

Depuis : `web/scripts/_srv.sh` filtre sur des MOTIFS de `comm`, vérifie que
le port se tait après l'arrêt — et, surtout, **chaque bascule est suivie
d'une vérification du build réellement servi** (la forme de la charge RSC :
arbre `"className":"katex"` = base, chaîne `<span class="katex-mathml"`
= nouveau). Une mesure d'A/B sans preuve du côté A n'est pas une mesure.

## Ce que ce balayage ne dit toujours pas

- **Le réseau réel** : DNS, TLS, CDN, cache de Vercel. Tout ceci est un
  build local servi par `next start`. Le POIDS, lui, est transposable.
- **Le LCP sur une vraie 3G** : mesuré ici en bridage CDP, à 2,0–2,1 s sur
  toutes les routes — donc « bon » au sens Core Web Vitals, et ce n'est pas
  là qu'est le problème.
- **La consommation de données sur un forfait — INSTRUMENTÉ ET CORRIGÉ le
  2026-09-05, et le chiffre écrit ici était très en dessous.** Ce paragraphe
  annonçait « ~920 ko de préchargement RSC » sur l'accueil : c'était ce que
  la page tire IMMOBILE. En défilant jusqu'en bas, `donnees-sweep` a mesuré
  **6 475 ko**, soit 91 % du transfert de la page — parce que `next/link`
  précharge à l'entrée dans le champ de vision, et que l'accueil porte 62
  liens de leçon. Le préchargement est passé du champ de vision à
  l'INTENTION (survol, focus, doigt posé) dans `src/components/ui/Lien.tsx` ;
  l'accueil est retombé à 791 ko et une séance de révision de 8,72 Mo à
  1,38 Mo. Voir `docs/audits/donnees-et-forfait.md`, et la porte
  `donnees-sweep --porte` qui garde le terrain repris.

  La leçon de méthode : **ce balayage-ci mesure la PATIENCE de l'élève, pas
  sa FACTURE**, et il arrête de compter exactement là où le préchargement
  commence. Un chiffre cité de mémoire dans la colonne « ce qu'on ne mesure
  pas » n'est pas une mesure — il n'a jamais été réexécuté par personne.
