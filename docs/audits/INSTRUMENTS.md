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
| `web/scripts/accents-manquants.mjs` | Le français DÉSACCENTUÉ dans le texte rendu, chapitres dépliés : 615 formes dont la version sans accent n'est pas un mot français (« theoreme », « egalite », « deja », « etre »). Attribue chaque écart au SITE DE RENDU. A trouvé **128 occurrences sur 65 pages** — libellés d'items et titres d'exercices. Corpus à zéro, `--porte` armée | Les mots dont la forme nue EST du français (« cote », « des », « sur », « croissante ») : hors champ par construction, et c'est ce qui rend la porte tenable. Les fautes d'accord et de conjugaison — « deux choses different » a été trouvé, mais parce que « different » était dans la liste, pas parce qu'un outil sait accorder |
| `web/scripts/indice-longueur.mjs` | L'INDICE DE LONGUEUR : sur les items QCM, la bonne réponse est-elle la plus longue, et son avance se VOIT-elle (≥ 20 caractères ET ≥ 20 % de la deuxième) ? Longueur comptée sur le RENDU, segments KaTeX ramenés à leur largeur à l'écran. Garde les DEUX sens : l'indice direct et l'indice INVERSE (clé strictement la plus courte, rapport pris sur la clé). Né cliquet — une notion en dette ne peut plus s'aggraver, une notion neuve naît sous 40 % — scellé aujourd'hui à 0 + 0, donc porte franche | La QUALITÉ pédagogique du distracteur allongé. Un distracteur peut être long, parallèle à la clé, et ne correspondre à aucune erreur réelle d'élève — seule une relecture par la voie pédagogie le dira |
| `web/scripts/indice-absolu.mjs` | L'INDICE DE L'ABSOLU : la clé est-elle la seule réponse à ne pas sur-affirmer ? Applique la règle que tous les manuels de stratégie de QCM enseignent — « barre ce qui contient toujours, jamais, uniquement, aucun » — et compte les items où elle désigne UNE réponse et où c'est la bonne. `seul` et `seulement` volontairement exclus des marqueurs (précision, pas sur-affirmation). Garde les deux sens ; scellé à 0 direct (contre 54 avant campagne, 51 % de réussite pour la stratégie) et 70 inverse, sous le hasard | Si l'absolu d'un distracteur EST son erreur ou n'est qu'un ornement — l'instrument ne fait pas la différence, c'est au rédacteur de la faire. Et les autres indices de forme : reprise d'un mot de l'énoncé dans la clé, accord grammatical qui ne va qu'avec un seul choix |
| `web/scripts/couverture-diagnostique.mjs` | LA COUVERTURE DIAGNOSTIQUE : chaque distracteur porte-t-il le tag `misconception` qui relie « l'élève se trompe » à « le produit sait quoi lui proposer ensuite » ? Compte les distracteurs muets (en isolant les `null` EXPLICITES, qui sont des décisions), les tags pointant un id non déclaré, et les misconceptions atteignant le plancher de 3 items du BANC — seules celles-là sont évaluables par le modèle. Nomme les notions AVEUGLES : celles où le modèle ne dira jamais rien. Porte FRANCHE sur les omissions et les fantômes (0 et 0) ; cliquet sur le reste, avec le plancher en cliquet INVERSE (il ne peut que monter) | Si le tag est le BON. Un distracteur peut porter un id parfaitement déclaré sans rapport avec l'erreur qu'il incarne — l'instrument garde la plomberie, pas le sens. Et combien d'items manquent réellement à une misconception sous le plancher : c'est un arbitrage d'auteur, pas un défaut de code |
| `web/scripts/resume-couverture.mjs` | CE QUE LE CORPUS DIT DE LUI-MÊME : chaque `items.yaml` se termine par un `coverage_summary` écrit à la main, lu par les humains qui reprennent la notion et réexécuté par personne. L'instrument confronte ses DEUX affirmations à sens unique — `floor_met` et `total_items` — à ce que le fichier contient réellement, avec la convention de comptage de la chaîne (`scripts/lib/couverture-compte.mjs`, partagée avec `couverture-diagnostique`). Trois portes FRANCHES : un `floor_met: true` avec une misconception sous le plancher, un `floor_met: false` alors qu'aucune ne l'est (la dette payée mais non déclarée), un `total_items` faux. Un CLIQUET sur les notions sans résumé, scellé à ZÉRO — les 62 en portent un, aucun ne peut plus disparaître. Le périmètre du plancher est l'UNION du déclaré et du tagué : une misconception déclarée qu'aucun item du banc ne vise compte zéro, pas rien (16 dans le corpus, plusieurs sondées par un checkpoint — ce qui ne compte pas). Mesuré à l'armement : 4 notions se surestimaient, 15 misconceptions sous plancher ; 18 notions sans résumé, générés. Depuis la campagne du plancher (165 items, 32 notions closes), les 62 notions déclarent `floor_met: true` — la porte A vaut donc de fait sur tout le corpus : déclarer une misconception sans lui écrire ses trois items casse l'intégration | Les tableaux PAR MISCONCEPTION. Le corpus les tient selon six conventions différentes — par item, par distracteur, par attribution primaire — toutes légitimes et toutes déclarées ; les comparer entre elles accuserait de mensonge une notion honnête. Ils restent de la prose, relue par des humains. Et `gated_floor_met`, affirmation de portée réduite qu'on ne peut mécaniser sans deviner la portée |
| `web/scripts/donnees-sweep.mjs` | CE QUE LE PRODUIT COÛTE AU FORFAIT : les octets de FIL (`encodedDataLength` — corps compressé + en-têtes, ce que l'opérateur compte), séparés en AVANT le `load` (le prix d'entrée), APRÈS (ce que la page tire seule) et EN DÉFILANT (le préchargement au champ de vision). Quatre passes : pages de liste, leçon, séance type à cache actif, économiseur de données. Mesuré à l'armement : l'accueil tirait **6,5 Mo** de préchargement RSC en défilant, 91 % du transfert, pour 62 leçons dont l'élève en ouvre une ; une séance de révision coûtait 8,72 Mo. Après la politique de préchargement à l'INTENTION (`src/components/ui/Lien.tsx`) : 1,38 Mo, soit 743 séances dans un forfait de 1 Go au lieu de 117. PORTE FRANCHE à DEUX SENS — aucune page de liste ne tire d'octets sans un geste de l'élève, ET le survol doit encore précharger, ET l'économiseur de données doit être honoré (couper tout préchargement passerait le premier contrôle en rendant la navigation plus lente) | Le CDN et le cache de Vercel — tout est mesuré sur un `next start` local ; l'ordre de grandeur est transposable, pas le chiffre à l'octet près. Et ce que l'élève fait VRAIMENT : la séance mesurée est un parcours plausible, pas une statistique d'usage |
| `web/scripts/liens-fichiers.mjs` | LES RENVOIS : tout chemin de fichier cité dans un fichier suivi par git (markdown, YAML, TS, MJS, workflows) mène-t-il quelque part ? Un chemin est résolu depuis la racine, depuis `web/` (la convention d'exécution des scripts) ou depuis le répertoire qui le cite. DEUX ZONES : la zone VIVANTE — orientation, agents, compétences, vision, règles, specs, runbooks, code, contenu, CI — est une PORTE FRANCHE ; la zone d'ARCHIVE — ADR, registres d'audit, CHANGELOG, rapports de reprise, ancrage périmé — nomme délibérément ce qui n'existe plus et n'est que comptée. L'exception vit dans le fichier et NOMME son chemin (`CHEMIN DISPARU:`), comme `RECOUVREMENT ASSUMÉ:`. Mesuré à l'armement : `docs/Product/` ET `docs/product/` coexistaient — VISION.md et DESIGN-BIBLE.md dans le premier, 23 renvois vers le second, dont ceux de `.claude/CLAUDE.md`, du README, du HANDOFF et de NEUF agents. Chaque agent à qui l'on disait « lis la vision d'abord » lisait le vide, et sur la machine de l'owner (Windows, insensible à la casse) les deux répertoires entrent en collision | Si le document CIBLE dit encore ce que le renvoi prétend. Un chemin qui résout peut pointer un texte périmé — c'est le travail des humains et des documents de réconciliation |
| `web/scripts/ancres-uniques.mjs` | LES ANCRES « § » : deux titres d'une même leçon peuvent-ils partager un `id` ? C'est la promesse d'un lien profond — l'élève copie le lien de la section qu'il lit. Mesuré à l'armement : depuis la pagination, `LessonRenderer` est appelé une fois par SEGMENT et `rehype-slug` remet son compteur d'unicité à zéro à chaque passe ; `maths/suites-numeriques` portait HUIT titres « L'erreur à repérer » avec le même id — sept ancres sur huit renvoyaient à la première. 95 titres au libellé répété existent dans 32 leçons. Corrigé par un compteur PARTAGÉ (`web/src/lib/rehypeSlugPartage.ts`), la première occurrence gardant son id nu pour que les liens déjà partagés survivent. PORTE FRANCHE : 62 leçons, 2 190 titres, 0 doublon | Les ids INTERNES des SVG, dupliqués eux aussi quand une figure est posée plusieurs fois. Vérifié inoffensif deux fois — `MediaDiagram` masque les étapes en réécrivant le markup de chaque figure, jamais par `getElementById`, et aucun identifiant n'est défini DIFFÉREMMENT par deux figures d'une notion tout en étant déréférencé par `url(#…)`. Armer sur « aucun id dupliqué » aurait été rouge sur un fait sans conséquence |
| `web/scripts/portee-corpus.mjs` | LA PORTÉE d'un mécanisme : sur combien de pages du corpus une fonctionnalité livrée a réellement quelque chose à montrer. Compte, par notion et par matière, les points d'arrêt, figures, figures étagées, mouvements, embarqués, interactives, dérivations, exercices, et les chapitres portant une carte « à retenir ». Mesuré à l'armement (62 notions, 491 chapitres) : points d'arrêt **62/62**, figures **51/62**, exercices **49/62**, « à retenir » **44/62**, mouvements **6/62**, interactives **5/62**, embarqués **4/62**, dérivations **1/62**. La philosophie : 92 chapitres, 4 figures (toutes dans une seule notion), zéro de tout le reste. `--resume` pour les totaux seuls | SI LA PORTÉE EST BONNE. Une dérivation dépliable n'a de sens que là où il y a une dérivation ; une figure absente sur toute une matière est peut-être une dette, peut-être une décision. Le tableau est un fait, le verdict est pédagogique |
| `web/scripts/test-attempt-events.mjs` | LE CHEMIN D'ÉCRITURE, côté client : les constructeurs de charge utile, la forme du fil telle que le validateur de l'edge function l'accepte, et — depuis le 2026-09-05 — le chemin de PERTE (échec, réessai unique à 4 s, borne de 20, 401, coupure réseau, visite de chapitre). 20 tests, minuteries simulées. `npm run test-attempt-events` | Le SERVEUR : idempotence de `record-notion-event`, double envoi, écritures concurrentes. Et le TAUX de perte réel, qui dépend du réseau de l'élève — les tests établissent la sémantique, pas la fréquence |

## Les balayages de corpus (outils, pas portes)

| Instrument | Mesure | Ne dit RIEN de |
|---|---|---|
| `web/scripts/figure-preview.mjs` | Une figure hors du site, **sept classes** : texte hors CADRE, texte hors de SON PANNEAU, chevauchements d'étiquettes, tracés qui barrent du texte, aplats restés clairs en thème sombre, **contraste d'un texte contre ce qui est vraiment peint derrière lui**, **texte effacé par une étape ultérieure**. Le contraste est jugé en deux temps — le modèle de peinture propose, un ÉTAGE PIXEL dispose (capture, retrait du texte, recapture, couleur médiane du fond). `--pixels-tous` passe TOUS les textes du corpus au crible des pixels (~25 min) ; `--porte` arme les deux classes propres (cadre, panneau) et tourne en CI | La GRAVITÉ d'une collision en thème sombre (contraste non rejugé). Le HALO (`paint-order`) : l'étage pixel le retire avec le texte et juge quand même sur la teinte — aucune figure ne s'en sert aujourd'hui. Un texte sous 0,5 d'opacité, traité comme un ornement. Les trois classes non armées restent informatives — 7 chevauchements, 85 tracés, 2 aplats, tous documentés |
| `web/scripts/etroit-sweep.mjs` | 70 pages × 3 largeurs de téléphone (320/360/390) : débord horizontal, chapitres dépliés | La lisibilité. Une page peut ne pas déborder ET rester illisible — c'est ce que la sonde de figures a montré |
| `web/scripts/horsligne-sweep.mjs` | Six scènes de coupure réseau : navigation par chapitre, clic vers une autre leçon, bouton Retour, leçon déjà visitée, réponse à un QCM, retour du réseau. **Ce qui tient tient ; ce qui casse est borné** — voir `docs/audits/hors-ligne.md` | Le réseau qui RAMPE au lieu de mourir (latence + pertes de paquets), et la coupure pendant un enregistrement |
| `web/scripts/polices-de-repli.mjs` | Quels caractères ne sont PAS dessinés par la police du site, et par quoi ils le sont — via `CSS.getPlatformFontsForNode` (protocole DevTools), qui rend les fontes RÉELLEMENT utilisées et le compte de glyphes. Produit l'INVENTAIRE des caractères à couvrir : `ᵉ` (66), l'arabe (~500), les symboles mathématiques écrits en Unicode (~120) | Si le repli se VOIT — l'instrument localise, la capture tranche. Et la fonte de repli MESURÉE est celle de ce conteneur Linux : sur un téléphone ce sera Roboto/Noto ou San Francisco |
| `web/scripts/recherche-navigateur.mjs` | Ce que ⌘F trouve : un mot du chapitre ouvert (témoin), un mot qui n'existe QUE dans un chapitre replié, et le texte du MathML masqué de KaTeX. A montré que **10 chapitres sur 11 sont hors d'atteinte de la recherche** — la moitié « ⌘F » de l'arbitrage des chapitres, enfin mesurée | Firefox et Safari (moteurs de recherche différents), et l'interface ⌘F elle-même : on passe par `window.find()`, qui partage la machinerie mais n'est pas l'UI |
| `web/scripts/typo-francaise.mjs` | La typographie FRANÇAISE dans le texte rendu, chapitres dépliés : apostrophe droite entre deux lettres, espace manquante devant `; : ?`, guillemets mal espacés. Attribue chaque écart au SITE DE RENDU (le chemin des éléments), ce qui dit où corriger. A trouvé ~1 100 écarts hors prose — figures, `\text{}` des formules, titres, libellés du programme. 73 pages (leçons + accueil, examens, matières, atelier, connexion, options), zéro écart aujourd'hui ; `--porte` armée | Le point d'exclamation (factorielle `n!`), les commentaires XML des figures, et le `style` inliné d'une figure (du CSS, pas du français — exclu explicitement) |
| `web/scripts/impression.mjs` | Ce que l'élève obtient sur le PAPIER : six contrôles en émulation `print`, dans les DEUX thèmes, sur 65 pages — chrome masqué, chapitres dépliés, rien hors colonne, figures dans la page, encre sur papier. A trouvé qu'un élève lisant en thème sombre **imprimait des aplats noirs** (les jetons de figure n'étaient pas remis au clair). `--porte` armée en CI | Le PDF réel (nombre de pages, coupures effectives, rendu des polices), les autres formats de papier, et le COÛT EN ENCRE d'un aplat conforme à l'écran |
| `web/scripts/copie-maths.mjs` | Ce que l'élève OBTIENT quand il recopie son cours : ⌘A/⌘C pour de vrai, presse-papier lu, comparé à trois états de la page (idéal / livré / témoin d'avant-correctif). A trouvé **138 773 caractères parasites** sur 62 leçons — chaque formule sortait en DOUBLE, le MathML de KaTeX étant masqué à l'œil mais pas à la sélection. `--porte` disponible | Le collage RICHE (`text/html`), donc ce qui arrive dans Word ou Docs quand la mise en forme est gardée. Et la recherche du navigateur (⌘F) |
| `web/scripts/reseau-malade.mjs` | Le réseau qui RAMPE : 300 ms de latence, ~400 kbit/s, **une requête sur cinq perdue** (tirage à graine, donc rejouable). Cinq scènes + un TÉMOIN sur réseau parfait sans lequel rien n'est concluant. A trouvé qu'un morceau de JS perdu laisse le cours lisible et la page morte **sans un mot** — corrigé par la veille d'hydratation, et la correction est mesurée. A aussi produit **deux conclusions fausses** en cliquant un lien de boîte 0×0, retirées depuis | Le vrai réseau (DNS, TLS, CDN, cache Vercel) : tout est un build local derrière une émulation. Et la reprise d'un enregistrement coupé en vol |
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
| `web/scripts/item-stats.mjs` | Le biais de position des bonnes réponses, avant/après mélange, **plus l'indice de longueur brut** — que le script signale lui-même comme non réglé par le mélange | La GRAVITÉ de cet indice : `indice-longueur.mjs` la mesure et la garde. Et la qualité des distracteurs |
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

1. **La consommation de données — FERMÉ le 2026-09-05.** Le soupçon était
   juste et le chiffre très en dessous : ce n'était pas ~920 ko mais
   **6,5 Mo** sur l'accueil dès qu'on défilait, 91 % du transfert. Mesuré
   par `donnees-sweep`, corrigé en un seul fichier (le préchargement passe
   du champ de vision à l'INTENTION), armé en CI dans les deux sens. Une
   séance de révision est passée de 8,72 Mo à 1,38 Mo. Voir
   `docs/audits/donnees-et-forfait.md`. Ce qui reste sous ce numéro : les
   octets MONTANTS, qui sont le point 4.
2. **La VOIX d'un vrai lecteur d'écran.** Ce qui est annoncé est maintenant
   mesuré (`annonce-sweep`) — régions live, ordre, focus au changement de
   chapitre. Ce qui ne l'est pas : ce qu'un lecteur PRONONCE réellement,
   qui dépend de son mode, de sa verbosité et de sa langue.
3. **La gravité d'une collision d'étiquettes en thème sombre — SANS OBJET
   sur le corpus vivant, mesuré le 2026-09-05.** Le CONTRASTE en thème sombre
   n'était déjà plus un angle mort (mesuré aux pixels le 2026-09-04, armé en
   CI dans les deux thèmes). Restait la gravité d'un CHEVAUCHEMENT, qu'un
   changement de thème peut effectivement rendre pire. La mesure tranche :
   **zéro chevauchement sur le corpus vivant, en clair comme en sombre.** Les
   sept qui subsistent sont tous sur `loi-mailles-build.svg`, en dette owner,
   et identiques dans les deux thèmes. Il n'y a donc rien à juger tant que
   cette figure n'est pas arbitrée — et le jour où un chevauchement
   réapparaîtra, c'est la question de sa gravité par thème qu'il faudra
   rouvrir, pas celle de son existence.
4. **La reprise d'un enregistrement coupé en vol — SÉMANTIQUE ÉTABLIE le
   2026-09-05, fréquence toujours inconnue.** Le chemin de PERTE de
   `src/lib/events/emitter.ts` n'avait aucun test : les 14 tests existants
   couvraient tous le chemin heureux. Six tests l'ont fermé
   (`scripts/test-attempt-events.mjs`, 20 au total). Ce qui en ressort :
   **un** réessai à 4 s, puis la réponse est perdue ; un 401 est réessayé
   avec le MÊME jeton, donc un jeton expiré est une perte structurelle ; la
   file bornée à 20 garde les échecs les plus ANCIENS et abandonne les plus
   récents ; et rien ne peut prévenir l'élève, parce que `recordAnswerEvent`
   rend `void` et qu'aucun appelant n'a de quoi afficher un état d'envoi.
   Voir `docs/audits/envoi-des-reponses.md` — deux arbitrages y sont posés
   pour l'owner. Ce qui reste sous ce numéro : le TAUX réel de perte, qui
   dépend du réseau de l'élève, et le comportement côté serveur
   (idempotence, double envoi).
   Le réseau qui rampe, lui, est mesuré depuis le 2026-09-04
   (`reseau-malade`, `docs/audits/reseau-malade.md`) : c'est lui qui a montré
   qu'un seul morceau de JavaScript perdu laisse le cours lisible et la page
   MORTE, sans un mot pour l'élève.

5 bis. **La recherche du navigateur (⌘F) sur d'AUTRES moteurs.** Sur Chromium
   elle est mesurée depuis le 2026-09-05 (`recherche-navigateur`) : elle ne
   voit PAS les chapitres repliés — 10 sur 11 hors d'atteinte — et ne voit pas
   non plus le MathML masqué (tant mieux). Firefox et Safari ne sont pas
   mesurés. Le collage RICHE, lui, l'est depuis le 2026-09-05 : le MathML
   y voyage avec ses styles de masquage (donc pas de formule doublée dans
   Word ou Docs), mais une leçon entière pèse **27,8 Mo de HTML pour 67,5 ko
   de texte** — la préflight de Tailwind, recopiée sur chaque span. Un
   arbitrage owner est ouvert : le corriger coûterait le rendu visuel des
   formules dans le collage riche (`docs/audits/copier-coller.md`).
6. **Le multilingue sur un VRAI téléphone.** `dom-truth` garde la DIRECTION
   d'un bloc arabe ; les replis de fonte sont inventoriés depuis le
   2026-09-05 (`polices-de-repli`) et se lisent bien ici. Mais la fonte de
   repli mesurée est celle de ce conteneur Linux : sur Android ou iOS, ce
   sera une autre. Ce qui est stable, c'est QU'IL Y A repli ; ce qui ne
   l'est pas, c'est de quoi il a l'air.
7. **Ce qu'une fonctionnalité livrée montre VRAIMENT, corpus en main —
   OUVERT ET INSTRUMENTÉ le même jour.** La question est née d'une mesure :
   la zone « à retenir », livrée et vérifiée par `dom-truth` sur des leçons
   témoins, ne remplit que **47 % des chapitres** — 0 % de la philosophie.
   Le mécanisme marche ; il n'a rien à montrer sur un quart du corpus.
   `portee-corpus.mjs` (ci-dessus) répond désormais pour NEUF mécanismes à la
   fois. **Le harnais prouve qu'un mécanisme fonctionne ; seule une mesure
   sur le corpus dit sur combien de pages il a quelque chose à montrer.**
   Ce qui reste sous ce numéro : la même question pour les surfaces HORS
   leçon (l'assembleur d'épreuves, l'atelier, le tableau de bord), qu'aucun
   compteur ne couvre.

8. **La production.** Tout ce document parle d'un build local. La synchro
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

*(RE-CERTIFIÉE le 2026-09-05, dans les deux thèmes, par un second
`--pixels-tous` complet : **0 défaut de classe armée sur le corpus vivant**.
Une re-certification qui ne trouve rien EST un résultat — c'est la seule
façon de savoir que la passe rapide, qui manque ~17 % des cas par
construction, ne cache rien. Elle a aussi produit une distinction que le
total masquait : sur les 37 figures portant un « barre », **dix le déclarent
dans leur fichier, vingt-sept sont muettes** ; le pire cas du corpus (29 %,
`anhydride-alcool`) était muet et a été corrigé. Voir
`docs/audits/contraste-figures.md`.)*

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

**Et deux corollaires de plus, payés le 2026-09-05 :**

> **Une porte ne juge que ce qu'on lui donne : la liste des routes EST la
> portée.** La porte typographique déclarait 69 pages propres — parce que
> `/atelier`, `/connexion`, `/options` et les pages d'épreuve n'y étaient pas.
> Elles portaient 65 écarts à elles seules.

> **Un caractère invisible ne se tape pas, il s'échappe.** Trois fois dans la
> journée, une insécable fine écrite littéralement dans un script a été perdue
> en route : la passe annonçait des changements, le fichier gardait son espace
> ordinaire. Dans un script, `\u202f` ; à la lecture, on imprime le point de
> code, jamais on ne juge une espace à l'œil dans un terminal.

**Et le corollaire du corollaire, payé le 2026-09-04 sur le balayage réseau :
une scène de test qui ÉCHOUE doit prouver qu'elle a EU LIEU.** Le premier
`a[href^="/notions/"]` d'une page de leçon vit dans le panneau replié du
header — boîte 0×0. `page.click` expirait, un `.catch()` vide avalait
l'erreur, et la scène concluait « navigation perdue » alors qu'aucun clic
n'avait été dispatché. Deux conclusions spectaculaires en sont sorties, dont
un diagnostic élaboré (« le cache du routeur est empoisonné ») bâti sur un
clic qui n'existait pas — et un composant d'interface écrit pour le corriger,
supprimé depuis. **Un `.catch()` vide est l'endroit exact où un instrument
commence à mentir.**

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
