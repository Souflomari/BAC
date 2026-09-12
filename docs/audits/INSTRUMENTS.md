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
| `web/scripts/validate-content.mjs` | La SOURCE : math équilibrée, YAML valide, marqueurs qui résolvent, jargon d'autorat (codes R, « rung ») hors du texte visible, niveaux de titres sans saut, sommet légataire, **fermeture d'un bloc `$$` sur sa propre ligne**, **le sens INVERSE de la porte figures : un `.svg` de `media/` qu'aucun marqueur ne place — asset→marqueur, ⚠ non bloquant, §11.43** ; **l'intégrité rung↔titre : un `rung: R<n>` d'item/checkpoint qui ne nomme aucun titre `## R<n>` de lesson.md — ⚠, §11.44** ; **le code de barreau `R<n>` dans un `\text{}` RENDU des exercices (bank/items/exercises/checkpoints) — l'angle mort de la porte jargon, qui ne balayait que la prose de lesson.md — ⚠, §11.46** ; **toute valeur de `misconception:` doit être DÉCLARÉE dans le items.yaml de la notion — ÉCHEC, §11.58** ; **le SECOND SENS de rung↔titre : un `##` qui enseigne sans porter de code de barreau ne peut recevoir aucun item — ⚠, §11.60** ; **un renvoi d'AUTEUR dans un champ rendu (« voir la SCOPE NOTE en tête de fichier », un chemin de dépôt, le mot « owner ») — ÉCHEC, §11.61** ; **l'`intro` d'un exercice, rendue HORS de la porte d'essai, qui AFFIRME la valeur que le premier pas gardé calcule — ÉCHEC, §11.62** | Le RENDU. Une figure structurellement valide peut être illisible ; c'est `figure-preview` qui le dit |
| `web/scripts/dom-truth.mjs` | Le RENDU, 210 contrôles : styles calculés contre les jetons, anatomie de page, pagination, ancres accentuées, débord à 320 px, taille naturelle des figures, cibles tactiles, tabulation, texte à 200 %, **direction d'écriture (RTL)**, **jargon de rédaction dans le texte rendu**, **reflow à 320 × 256**, **lien d'évitement fonctionnel**, **HTML servi et prérendu : aucune commande active avant l'hydratation (7 routes par `fetch` + les 118 pages prérendues, plancher 100)** | Le corpus ENTIER pour ce qui se mesure au DOM — il échantillonne quelques leçons témoins ; seule la vérification du HTML prérendu couvre toutes les pages. Les balayages ci-dessous font le tour complet |
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
| `web/scripts/liens-internes.mjs` | UN LIEN DU PRODUIT MÈNE-T-IL QUELQUE PART ? `liens-fichiers` garde les renvois des DOCUMENTS ; celui-ci pose la même question du côté de l'élève — de tous les `<a href="/…">` que le site rend, combien répondent autre chose qu'un 200 ? Déplie les `<details>` d'abord (les chapitres sont présents-mais-masqués). Mesuré à l'écriture : **72 pages, 108 cibles distinctes, 0 morte**. ⚠️ à lancer depuis `web/`, avec `BASE=…` | **PAS DE PORTE, délibérément.** Le job CI venait d'être mesuré à ~30 min pour un budget de 30 ; y ajouter ~180 navigations aurait aggravé le défaut qu'on venait de constater. L'armement attend l'assainissement du budget (portes navigateur parallélisées, ou serveur partagé) |
| `web/scripts/portee-hors-lecon.mjs` | LA PORTÉE des surfaces HORS leçon — la seconde moitié de la même question. Compte, par épreuve : morceaux servis, questions, questions portant un raisonnement expert, questions dont la correction DÉROULE l'algèbre (par `steps` OU par des blocs `$$…$$`), et les renvois visuels de l'énoncé. Mesuré à l'armement : **39 épreuves, 247 morceaux, 1 472 questions**, 100 % avec raisonnement, **94 % dont la correction déroule l'algèbre** (1 132 par `steps`, 247 par des blocs `$$…$$` seuls), et l'atelier à **1 notion sur 62**. ⚠️ à lancer depuis `web/`. `--resume` pour les totaux seuls | SI L'ALGÈBRE MONTRÉE EST BONNE, et si son contenant est le bon. Et l'ORPHELINAT d'un renvoi visuel : la colonne « sans description » est un MAJORANT, parce que le corpus emploie cinq conventions de description et que « décrit en ligne » ne se distingue pas de « orphelin » sans juger le sens. Les 16 du premier tour ont été ouverts un par un : aucun défaut |
| `web/scripts/test-session.mjs` | L'ACTION PRINCIPALE DE L'ACCUEIL : quelle notion `sessionFromState` propose, et si l'on dit « commencer » ou « reprendre ». 10 tests — l'ordre du programme l'emporte sur l'ordre du tableau reçu ; la notion proposée existe dans la liste ; une notion disparue ou une entrée `perNotion` absente retombent sur « commencer », jamais sur une reprise cassée ; un index de chapitre hors bornes est ramené dans l'intervalle ; `chaptersTotal = 0` ne produit jamais « Chapitre 1 / 0 » ; et le motif affiché n'invoque plus jamais une DATE. `npm run test-session` | Le RENDU de la carte — c'est `dom-truth` qui le garde. Et l'état réel d'un élève : ces tests fabriquent un `StudentState`, ils ne disent rien de ce que les trois tables renvoient vraiment |
| `web/scripts/test-examens.mjs` | LES INVARIANTS DE L'ASSEMBLEUR D'ÉPREUVES, sur le corpus RÉEL. 13 tests. L'en-tête de `lib/examens.ts` raconte QUATRE défauts d'ordre déjà corrigés ; un cinquième a été trouvé le 2026-09-05 (SPC 2015 listait le rattrapage avant la normale) ; aucun n'était gardé. Ce que la porte tient : les morceaux d'un exercice sont rendus dans l'ordre du SUJET (partie I avant partie II, quelle que soit la convention d'ordinal) ; la liste est triée complètes d'abord, année décroissante, normale avant rattrapage ; le barème ne dépasse jamais 20 ; « complète » veut dire ≥ 19,5 points ET RIEN D'AUTRE ; aucune épreuve sous le seuil n'est listée ; la durée officielle est 4 h en SM et 3 h ailleurs ; `nbExercices` compte les exercices du sujet, jamais les morceaux servis ; un en-tête ne s'arrête pas sur son numéro de section ; un titre est du texte, pas du TeX ; chaque question porte un raisonnement. **Le premier test vérifie que le corpus est CHARGÉ** — sans lui les douze autres seraient verts sur zéro épreuve. `npm run test-examens` (⚠️ depuis `web/`) | Ce que les épreuves DISENT — la fidélité au sujet officiel, elle, se vérifie contre le PDF, à la main. Et le rendu de la page : c'est `dom-truth` |
| `web/scripts/test-melange.mjs` | LE MÉLANGE DES RÉPONSES FAIT-IL CE QU'IL PROMET. 7 tests, sur le corpus réel. `lib/shuffle.ts` affirmait depuis des années que « le biais de 58 % sur le choix A disparaît » ; personne ne l'avait re-mesuré. C'est une affirmation sur des DONNÉES : elle peut cesser d'être vraie sans qu'une ligne de code change. Re-mesuré le 2026-09-05 sur 1 612 items : le biais rédactionnel n'est plus 58 % mais **65 %** ; après mélange, 25,7 / 25,4 / 24,0 / 24,9 %. **Deux témoins** — plat APRÈS, et le biais existe encore AVANT, sans quoi « c'est plat » serait vert avec le mélange retiré. Le dernier test compare le COMPORTEMENT des deux copies de l'algorithme (`item-stats.mjs`, `dom-truth.mjs`) à celui du vrai module sur 500 tirages — la copie d'`item-stats` n'était gardée par rien. `npm run test-melange` (⚠️ depuis `web/`) | Que le mélange soit BON pédagogiquement — un distracteur mieux placé qu'un autre, cela ne se mesure pas ici. Et le rendu : c'est le sweep « answer-choice shuffle » de `dom-truth` |
| `web/scripts/accents-campagne.mjs` | LA PASSE QUI REND LEURS ACCENTS AU TEXTE DE L'ÉLÈVE — un outil de campagne, **pas une porte** (la porte reste `accents-manquants.mjs`). Trouve ses candidats par PREUVE INTERNE, sans dictionnaire externe : une forme nue est suspecte quand sa variante accentuée existe déjà dans le corpus et y est ≥ 5× plus fréquente — le corpus est son propre dictionnaire. Trois garde-fous : une seule variante accentuée possible ; contexte français obligatoire (un chemin de fichier ou de l'anglais est refusé) ; et **la relecture du diff mot par mot**, qui est le seul des trois à avoir trouvé quelque chose — cinq faux positifs (`conjugue` l'impératif, `honore`, `aveuglement` le nom, `serre`, `colore`) et une régression réelle : `[[video:balancement]]` devenu `[[vidéo:…]]`, qui aurait éteint l'intégration vidéo en silence. Ne touche jamais une clé YAML, un commentaire, du TeX, du code, ni une directive `[[…]]` ; un YAML qui ne se recharge pas est laissé intact. `node scripts/accents-campagne.mjs [--appliquer]` (⚠️ depuis `web/`) | Les formes AMBIGUËS — `piege` (piège/piégé), `arrete` (arrête/arrêté) : écartées par construction, 389 occurrences restent pour une relecture humaine. Et le verdict : c'est le RENDU, via `accents-manquants`, qui tranche |
| `web/scripts/routes-examens.mjs` | LA LISTE DES 39 ÉPREUVES, lue là où elle est vraie — `listEpreuves()`, la même fonction que la page `/examens`. Existe parce que les pages d'épreuve n'avaient JAMAIS été balayées : la porte accents ne portait que `/examens` (la page de LISTE), la porte typographie une seule page de sujet ajoutée à la main. Écrire les 39 identifiants en dur dans le YAML de CI les aurait figés au jour de l'écriture — le corpus grandit, et une liste figée aurait rendu vertes les épreuves ajoutées ensuite. Sort en erreur sur zéro épreuve : `lib/content.ts` rend une liste VIDE hors de `web/`, sans erreur, et un zéro silencieux ici viderait la portée des deux portes. `node scripts/routes-examens.mjs` | Rien d'autre — c'est une liste, pas une mesure |
| `web/scripts/formules-rendues.mjs` | AUCUNE FORMULE NE S'AFFICHE EN LATEX BRUT. KaTeX, quand il n'arrive pas à lire une formule, ne disparaît pas : il PEINT LA SOURCE, en rouge, dans un `span.katex-error`. Un élève en correction d'épreuve lisait « \qquad\Longrightarrow\qquad v_L = \frac{c}{n_L}$$ » à la place du raisonnement — **49 formules, sur 11 des 39 sujets**. Cause : un bloc `$$…$$` dont les délimiteurs ne sont pas SEULS sur leur ligne ; le lecteur markdown ne voit alors pas le bloc et passe le `$$` de clôture à KaTeX, qui refuse (« Can't use function '$' in math mode »). 215 blocs remis en forme canonique dans 47 fichiers. **Deux directions, et aucune ne suffit seule.** (1) À LA SOURCE : chaque `$…$` et `$$…$$` du corpus passé à KaTeX — 71 174 formules, une seule refusée (« 90^\\circ », une contre-oblique de trop dans un scalaire YAML non quoté). Cette passe atteint ce qu'aucune page n'atteint : les 49 `exercises.yaml`, les descriptions de misconceptions, tout ce qui vit derrière une réponse — mais elle est AVEUGLE au défaut de markdown, chacune des 49 formules cassées étant, prise seule, du LaTeX valide. (2) AU RENDU : aucun `span.katex-error` sur les 101 pages — cette passe voit le défaut de markdown, et rien d'autre. La porte ouvre les épreuves en DEUX temps — « Commencer » puis « Terminer » — le corrigé n'entrant dans le DOM qu'à la seconde action. Vérifiée ROUGE dans les deux directions : un bloc remis dans l'ancienne forme (rendu), et une formule invalide glissée dans un `exercises.yaml` — un fichier qu'aucune page ne montre sans qu'on réponde d'abord (source). `node scripts/formules-rendues.mjs --porte` (⚠️ depuis `web/`) | Si la formule est JUSTE — la porte dit qu'elle est LISIBLE. Une formule fausse mais bien formée passe ici sans un mot |
| `web/scripts/test-attempt-events.mjs` | LE CHEMIN D'ÉCRITURE, côté client : les constructeurs de charge utile, la forme du fil telle que le validateur de l'edge function l'accepte, et — depuis le 2026-09-05 — le chemin de PERTE (échec, réessai unique à 4 s, borne de 20, 401, coupure réseau, visite de chapitre). 20 tests, minuteries simulées. `npm run test-attempt-events` | Le SERVEUR : idempotence de `record-notion-event`, double envoi, écritures concurrentes. Et le TAUX de perte réel, qui dépend du réseau de l'élève — les tests établissent la sémantique, pas la fréquence |

## Les balayages de corpus (outils, pas portes)

| Instrument | Mesure | Ne dit RIEN de |
|---|---|---|
| `web/scripts/figure-preview.mjs` | Une figure hors du site, **sept classes** : texte hors CADRE, texte hors de SON PANNEAU, chevauchements d'étiquettes, tracés qui barrent du texte, aplats restés clairs en thème sombre, **contraste d'un texte contre ce qui est vraiment peint derrière lui**, **texte effacé par une étape ultérieure**. Le contraste est jugé en deux temps — le modèle de peinture propose, un ÉTAGE PIXEL dispose (capture, retrait du texte, recapture, couleur médiane du fond). `--pixels-tous` passe TOUS les textes du corpus au crible des pixels (~25 min) ; `--porte` arme les deux classes propres (cadre, panneau) et tourne en CI | La GRAVITÉ d'une collision en thème sombre (contraste non rejugé). Le HALO (`paint-order`) : l'étage pixel le retire avec le texte et juge quand même sur la teinte — aucune figure ne s'en sert aujourd'hui. Un texte sous 0,5 d'opacité, traité comme un ornement. Les trois classes non armées restent informatives — 7 chevauchements, 85 tracés, 2 aplats, tous documentés |
| `web/scripts/etroit-sweep.mjs` | 70 pages × 3 largeurs de téléphone (320/360/390) : débord horizontal, chapitres dépliés **Ouvre les 39 épreuves** (2026-09-05) : la liste se lit par `routes-examens.mjs`, et chaque sujet est ouvert en deux clics — « Commencer », puis « Terminer » — sans lesquels l'instrument mesurait le masthead et déclarait la page propre. | La lisibilité. Une page peut ne pas déborder ET rester illisible — c'est ce que la sonde de figures a montré |
| `web/scripts/horsligne-sweep.mjs` | Six scènes de coupure réseau : navigation par chapitre, clic vers une autre leçon, bouton Retour, leçon déjà visitée, réponse à un QCM, retour du réseau. **Ce qui tient tient ; ce qui casse est borné** — voir `docs/audits/hors-ligne.md` | Le réseau qui RAMPE au lieu de mourir (latence + pertes de paquets), et la coupure pendant un enregistrement |
| `web/scripts/polices-de-repli.mjs` | Quels caractères ne sont PAS dessinés par la police du site, et par quoi ils le sont — via `CSS.getPlatformFontsForNode` (protocole DevTools), qui rend les fontes RÉELLEMENT utilisées et le compte de glyphes. Produit l'INVENTAIRE des caractères à couvrir : `ᵉ` (66), l'arabe (~500), les symboles mathématiques écrits en Unicode (~120) | Si le repli se VOIT — l'instrument localise, la capture tranche. Et la fonte de repli MESURÉE est celle de ce conteneur Linux : sur un téléphone ce sera Roboto/Noto ou San Francisco |
| `web/scripts/recherche-navigateur.mjs` | Ce que ⌘F trouve : un mot du chapitre ouvert (témoin), un mot qui n'existe QUE dans un chapitre replié, et le texte du MathML masqué de KaTeX. A montré que **10 chapitres sur 11 sont hors d'atteinte de la recherche** — la moitié « ⌘F » de l'arbitrage des chapitres, enfin mesurée | Firefox et Safari (moteurs de recherche différents), et l'interface ⌘F elle-même : on passe par `window.find()`, qui partage la machinerie mais n'est pas l'UI |
| `web/scripts/typo-francaise.mjs` | La typographie FRANÇAISE dans le texte rendu, chapitres dépliés : apostrophe droite entre deux lettres, espace manquante devant `; : ?`, guillemets mal espacés. Attribue chaque écart au SITE DE RENDU (le chemin des éléments), ce qui dit où corriger. A trouvé ~1 100 écarts hors prose — figures, `\text{}` des formules, titres, libellés du programme. 73 pages (leçons + accueil, examens, matières, atelier, connexion, options), zéro écart aujourd'hui ; `--porte` armée | Le point d'exclamation (factorielle `n!`), les commentaires XML des figures, et le `style` inliné d'une figure (du CSS, pas du français — exclu explicitement) |
| `web/scripts/impression.mjs` | Ce que l'élève obtient sur le PAPIER : six contrôles en émulation `print`, dans les DEUX thèmes, sur 65 pages — chrome masqué, chapitres dépliés, rien hors colonne, figures dans la page, encre sur papier. A trouvé qu'un élève lisant en thème sombre **imprimait des aplats noirs** (les jetons de figure n'étaient pas remis au clair). `--porte` armée en CI | Le PDF réel (nombre de pages, coupures effectives, rendu des polices), les autres formats de papier, et le COÛT EN ENCRE d'un aplat conforme à l'écran |
| `web/scripts/copie-maths.mjs` | Ce que l'élève OBTIENT quand il recopie son cours : ⌘A/⌘C pour de vrai, presse-papier lu, comparé à trois états de la page (idéal / livré / témoin d'avant-correctif). A trouvé **138 773 caractères parasites** sur 62 leçons — chaque formule sortait en DOUBLE, le MathML de KaTeX étant masqué à l'œil mais pas à la sélection. `--porte` disponible — et en mode porte le collage RICHE n'est pas mesuré : c'est une mesure (taille, masquage en ligne), pas un critère, et elle coûtait 4 à 5,5 s par page dense (28 à 37 Mo de HTML à sérialiser) — un tiers des 12 min de la porte en CI (2026-09-05). Le raccourci `getSelection().toString()` a été ESSAYÉ et écarté : il ignore `user-select: none` et rend le témoin égal au réel — il mesurerait autre chose que le presse-papier | Le collage RICHE (`text/html`), donc ce qui arrive dans Word ou Docs quand la mise en forme est gardée. Et la recherche du navigateur (⌘F) |
| `web/scripts/reseau-malade.mjs` | Le réseau qui RAMPE : 300 ms de latence, ~400 kbit/s, **une requête sur cinq perdue** (tirage à graine, donc rejouable). Cinq scènes + un TÉMOIN sur réseau parfait sans lequel rien n'est concluant. A trouvé qu'un morceau de JS perdu laisse le cours lisible et la page morte **sans un mot** — corrigé par la veille d'hydratation, et la correction est mesurée. A aussi produit **deux conclusions fausses** en cliquant un lien de boîte 0×0, retirées depuis | Le vrai réseau (DNS, TLS, CDN, cache Vercel) : tout est un build local derrière une émulation. Et la reprise d'un enregistrement coupé en vol |
| `web/scripts/annonce-sweep.mjs` | Ce qu'un lecteur d'écran ANNONCE : les régions live et leur politesse, le premier pas au clavier, les reculs de l'ordre de tabulation, le sort du focus au changement de chapitre. **68 pages** ; a trouvé que le lien d'évitement n'était ni premier ni universel **Ouvre les 39 épreuves** (2026-09-05) : la liste se lit par `routes-examens.mjs`, et chaque sujet est ouvert en deux clics — « Commencer », puis « Terminer » — sans lesquels l'instrument mesurait le masthead et déclarait la page propre. **Depuis le 2026-09-11, les deux gestes d'une épreuve aussi (« Commencer », « Terminer ») : focus perdu, aucune annonce — HANDOFF §11.33** | La VOIX. Ce qu'un vrai lecteur prononce dépend de son mode, de sa verbosité et de sa langue — on ne lit ici que le DOM et l'arbre d'accessibilité |
| `web/scripts/zoom400-sweep.mjs` | WCAG 1.4.10 dans sa forme STRICTE : 320 × 256 px, soit 1280 × 1024 vu à 400 %. Débord horizontal, part de hauteur prise par les barres collantes, lignes de prose qui restent, navigation atteignable. **70 pages, 0 défaut** — l'en-tête collant fait 57 px, soit 22 % de l'écran, et il reste 7 à 9 lignes **Ouvre les 39 épreuves** (2026-09-05) : la liste se lit par `routes-examens.mjs`, et chaque sujet est ouvert en deux clics — « Commencer », puis « Terminer » — sans lesquels l'instrument mesurait le masthead et déclarait la page propre. | Le zoom du SYSTÈME (loupe d'OS), qui agrandit les pixels au lieu de reflow |
| `web/scripts/zoom-sweep.mjs` | Le corpus avec le texte doublé (SC 1.4.4) : débord de la page et texte COUPÉ par une boîte `overflow-hidden`, coupable désigné par bissection. **Portée depuis le 2026-09-05 (soir)** : les 62 leçons, les **39 épreuves ouvertes** en deux clics (par `routes-examens.mjs`), les pages hors leçon — 105 pages ; largeurs par `--largeurs=` (défaut 1280 et 360 ; 320 a trouvé ce que 360 ne voyait pas). `--porte` (sortie 1 au premier signalement), serveur autonome sans `BASE`, et une GARDE : une feuille de style qui répond ≥ 400 arrête l'instrument (piège n° 4 ci-dessous). Lit la géométrie avant le style — le balayage est passé de plusieurs secondes par page à une fraction. Attend `document.fonts.ready` avant de mesurer — une hygiène, PAS l'explication des 61 débords vus ce jour-là : re-lancé seul, machine à froid, il en rendait toujours 61, et l'arbre d'HIER (6dfcb92, reconstruit dans un worktree, son propre code) en rendait 61 aussi. Le « 227 → 0 » consigné la veille n'était donc pas reproductible ; les 61 étaient réels (fil d'Ariane borné en `ch`, items flex et grille sans `min-w-0`, boutons inline-flex à largeur max-content) et sont corrigés à la source (HANDOFF §11.17). Ce que les deux surfaces neuves ont trouvé et ce qui a été corrigé : HANDOFF §11.18 — 8 cartes d'épreuve coupées et 36 px de débord sur presque toutes les leçons à 320 px (deux causes, un libellé d'Eyebrow et un libellé de bouton, tous deux des nœuds texte nus dans une boîte flex). **Après correctifs : 0 sur 105 pages à 360 px et 0 sur 105 pages à 320 px** (2026-09-05, soir ; 8 min 16 s pour les deux largeurs). En CI à 320 px, ~3 min 30 s. | Le zoom NAVIGATEUR (qui redimensionne tout, pas seulement le texte) |
| `web/scripts/gel-epreuve.mjs` | Le GEL du téléphone sur la page d'épreuve, processeur bridé ×6 : délai jusqu'au premier énoncé et jusqu'à `[data-sujet-complet]` après « Commencer », jusqu'au premier corrigé et à `[data-corrige-complet]` après « Terminer », tâches longues (somme, la plus longue, leur nombre), sur les 39 sujets. A trouvé, avant la révélation progressive, **3 à 15 s de gel au « Commencer » et 3 à 30 s au « Terminer »** (médianes 10 s et 17 s), en une tâche unique de 2,6 à 15,9 s (HANDOFF §11.20) ; après elle, médianes 1,4 s jusqu'au premier énoncé et 0,8 s jusqu'au premier corrigé, tâche la plus longue 0,7 s (1,6 s au pire), sujet et corrigé complets en 4,7 s et 7,8 s — les quatre corrigés les plus denses finissent encore en 20 à 30 s, lisibles entre-temps. Pas une porte : un temps dépend de la machine — un instrument de comparaison avant/après, machine à froid | Un vrai téléphone plutôt qu'un bridage émulé (les leçons : `gel-lecon.mjs`, ligne suivante) |
| `web/scripts/gel-lecon.mjs` | Le même protocole sur les 62 LEÇONS, processeur bridé ×6 : tâches longues au chargement (nombre, somme, blocage, la plus longue) et l'instant où la dernière finit — quand la page répond enfin. A trouvé : **aucune tâche ≥ 1 s, blocage total 0,6–2,8 s, page réactive 1,9–7,3 s après la navigation** (médiane 3,5 s ; 16 leçons > 5 s, toutes maths ou PC) — pas un gel, un silence d'hydratation (HANDOFF §11.21). Pas une porte, même raison ; s'arrête (code 2) si une feuille de style répond ≥ 400 | Un vrai téléphone. Le changement de chapitre est mesuré à part (`gel-chapitre`, HANDOFF §11.21–11.22) |
| `web/scripts/gel-chapitre.mjs` | Le gel d'un CHANGEMENT de chapitre une fois la leçon hydratée, processeur bridé ×6, 62 leçons : délai jusqu'au changement réel de `[data-chapter-active]`, tâches longues du geste (nombre, somme, la plus longue). A trouvé **une tâche de 1,2 s en médiane (2,8 s au pire, 36 leçons ≥ 1 s)** — la cause dans `useAttemptRecorder` ; après correctif : tâche la plus longue 1,19 → 0,41 s de médiane, 36 → 2 leçons ≥ 1 s, 10 → 0 ≥ 2 s (HANDOFF §11.22). `RETOUR=1` mesure aussi la flèche retour vers un chapitre déjà vu, `SANS_CV=1` rejoue une règle `display:none` sur le build courant (témoin de l'essai `content-visibility`) : témoin display:none → content-visibility, aller 0,41 → 0,44 s, retour 0,16 → 0,10 s de médiane (HANDOFF §11.24). Pas une porte, même raison ; s'arrête (code 2) si une feuille de style répond ≥ 400 | Un vrai téléphone ; le clic sur le rail — supposé identique à la flèche, non mesuré |
| `web/scripts/clic-qcm.mjs` | Le coût d'un CLIC DE RÉPONSE dans le premier QCM visible d'une leçon, processeur bridé ×6 : délai jusqu'au verdict, tâches longues du geste, formules de l'item. A servi à mesurer la mémoïsation de `MathText` : tâche la plus longue du clic 0,18 → 0,16 s de médiane à ×6 (0,36 → 0,23 s sur l'item le plus dense), un gain petit et réel (HANDOFF §11.23). Pas une porte, même raison ; s'arrête (code 2) si une feuille de style répond ≥ 400 | Un vrai téléphone ; le déployé — depuis ce conteneur, le relais coupe Chromium headless vers la preview (§11.23) ; les points d'arrêt (CheckpointItem), même composant, supposés identiques |
| `web/scripts/js-ventilation.mjs` | Le JavaScript téléchargé par une page, morceau par morceau (octets transférés), la part du pipeline markdown/KaTeX côté client — reconnue au CONTENU des fichiers, pas à leur nom — et l'initiateur/priorité de ces morceaux. A trouvé : **143 ko sur ~350 par leçon (126 sur 285 par épreuve), 40–44 % du JavaScript, leçon sans formule comprise** ; sur l'accueil, préchargés par le routeur (HANDOFF §11.26). Pas une porte : un état des lieux pour un arbitrage | Le coût d'analyse et de compilation de ces morceaux, isolé du reste de l'hydratation (le §11.21 le mesure en bloc) ; le déployé (point 9) |
| `web/scripts/trace-chargement.mjs` | Où passe le fil principal pendant le chargement d'une leçon, processeur bridé ×6 : trace CDP `devtools.timeline`, durées propres par famille — JavaScript (compilation, exécution, microtâches), style/mise en page, analyse du HTML, reste. A trouvé : **JavaScript 50–63 % du fil principal, dont 0,3–0,5 s seulement de compilation ; le gros est l'hydratation React, proportionnelle aux nœuds** (HANDOFF §11.26). Pas une porte ; la trace ralentit ce qu'elle mesure (~+40 % de mur) — les proportions comptent | La part d'hydratation de chaque composant client, isolée ; le déployé (point 9) |
| `web/scripts/epreuve-3g.mjs` | Une épreuve sur 3G LENTE (400 kb/s, 400 ms) et processeur ×4 : bouton visible, bouton ACTIF (plus `disabled`) et octets reçus à cet instant, appuis répétés jusqu'au premier énoncé, sujet complet, octets transférés. A trouvé : **bouton visible à 4–7 s et mort jusqu'à ~17 s (15–20 appuis)** ; après correctif : Même protocole, mêmes trois épreuves, même build : le bouton est visible à… (HANDOFF §11.27). Pas une porte, même raison | Un vrai réseau et un vrai téléphone ; le déployé (point 9) ; « Terminer » sur 3G (le corrigé n'a pas de réseau à attendre — supposé) |
| `web/scripts/lecon-3g.mjs` | Une leçon sur 3G LENTE (400 kb/s, 400 ms) et processeur ×4 : « Chapitre suivant » visible, ACTIF (plus `disabled`), appuis répétés jusqu'au changement réel de chapitre, octets. A trouvé : **bouton visible à 4–8 s et mort jusqu'à 17–28 s (16–29 appuis)** ; après `useHydrated` : désactivé et `aria-busy` jusqu'à l'hydratation (HANDOFF §11.28). Pas une porte, même raison | Un vrai réseau et un vrai téléphone ; le déployé (point 9) ; les autres gestes (réponse de QCM, révélation) — même mécanisme, supposés identiques |
| `web/scripts/veille-hydratation.mjs` | La VEILLE D'HYDRATATION, mesurée : sur un réseau lent émulé (KBPS/RTT, processeur ×4), chaque seconde — le bandeau « Recharger » est-il visible, la ligne « se prépare… » aussi, les deux ENSEMBLE, et quand l'hydratation arrive ; `PERTE=1` bloque le plus gros morceau d'entrée et mesure le délai perte → bandeau (+0,3 s depuis le 2026-09-11 ; +8,3 s avant) ; `BLOCAGE=cdp` fait l'échec INSTANTANÉ (celui qui passait sous l'écouteur `error` : 40,8 s ; avec Resource Timing, le bandeau suit l'arrivée des feuilles de style, 2–8 s sur 3G lente — le premier instant où quoi que ce soit peut se peindre ; le repère `veille-posee` et l'instant du bandeau sont pris dans la page) ; `RECHARGER=1` appuie sur « Recharger » une fois le réseau revenu et compte le temps et les octets (75 ko, 4,2 s). HANDOFF §11.29 | Le vrai réseau ; un bandeau qui MENT (il dit « connexion faible » aussi quand le morceau est perdu pour une autre raison) ; Firefox et Safari (Resource Timing y a-t-il `responseStatus` ? la vérification retombe sur les tailles) |
| `web/scripts/retour-bfcache.mjs` | Le bouton RETOUR : page A → page B → Retour, `pageshow.persisted`, temps jusqu'au signal de vie, chapitre conservé, et les RAISONS de Chromium quand il ne restaure pas. Retire `--disable-back-forward-cache` que Playwright pose par défaut — sans quoi tout est « rebâti » et l'instrument ment. A trouvé : leçons et épreuves restaurées en 0,1 s ; l'accueil rebâti sur 3G lente s'il est quitté pendant le préchargement de l'action principale (HANDOFF §11.30) | Le Retour après une navigation interne (cache du routeur, pas bfcache) ; Firefox et Safari ; un vrai téléphone qui décharge l'onglet |
| `web/scripts/memoire.mjs` | La MÉMOIRE : tas JavaScript après ramasse-miettes, nœuds DOM, écouteurs (CDP) sur les 62 leçons (`lecons`) ; la fuite sur 30 puis 60 changements de chapitre (`fuite`) ; les épreuves révélées (`epreuves`) ; VmRSS du processus de rendu, lu dans /proc (`rss`). A trouvé : 7–11 Mo de tas, aucune fuite, 97 % des nœuds dans des chapitres repliés, 166–309 Mo d'empreinte réelle (HANDOFF §11.31) | Un vrai téléphone (GPU, tuiles, Android) ; Firefox et Safari ; une séance de deux heures avec des réponses |
| `web/scripts/recherche-palette.mjs` | La palette ⌘K : ce qu'elle RÉPOND à 17 requêtes tapées comme un élève (matières par leur nom courant, années d'épreuve, accents pliés), et si Échap rend le focus au bouton. ROUGE si une matière ou une année ne trouve rien, ou si le focus ne revient pas (HANDOFF §11.34) | Les mots que les titres ne contiennent pas (« acide », « nucléaire ») — un champ de mots-clés par notion, lane contenu |
| `web/scripts/polices.mjs` | Les POLICES : fichiers woff2 téléchargés par page (nom, ko), puis les caractères de texte visible par famille / graisse / style, chapitres dépliés — ce que chaque face sert vraiment. A trouvé : 324 ko par page dont 84 ko de latin-ext préchargé pour aucun caractère, Geist Mono 70 ko pour 80 caractères (HANDOFF §11.35) | Quel glyphe est dessiné par quelle police (`CSS.getPlatformFontsForNode`, fait à la main le 2026-09-11 : Source Serif 4 partout, « œ » compris) ; les navigateurs autres que Chromium |
| `web/scripts/couleurs-forcees.mjs` | Windows CONTRASTE ÉLEVÉ (`forced-colors: active`, émulé) sur l'accueil, une leçon, une épreuve : commandes sans bordure ni contour, cartes sans bordure, le focus après trois tabulations, une capture par page. A trouvé : « Commencer l'épreuve » et 13 boutons d'une leçon rendus en texte nu → contour système (HANDOFF §11.36) | Un vrai Windows et ses thèmes ; les figures SVG (couleurs propres) ; `prefers-contrast: more` |
| `web/scripts/espacement-texte.mjs` | WCAG 1.4.12, ESPACEMENT DU TEXTE imposé (interligne 1,5, lettres 0,12 em, mots 0,16 em, paragraphes 2 em) sur 7 pages à 390 et 1 280 px : débord du document, texte coupé sous `overflow: hidden` (hors KaTeX, SVG, `sr-only`), texte hors fenêtre. A trouvé : rien ne déborde ; les troncatures « … » de l'accueil et des épreuves, qui coupaient déjà à l'espacement normal (HANDOFF §11.38) | Les infobulles du rail (28 ch) et les figures à transport, coupées par conception ; un vrai outil de lecture (l'extension applique parfois plus) |
| `web/scripts/radios-clavier.mjs`, `tab-corrige.mjs` | L'ÉPREUVE AU CLAVIER : combien de radios d'auto-évaluation sont des arrêts de tabulation (motif ARIA : 1 par groupe), si les flèches déplacent et cochent ; et l'ordre de tabulation complet d'un corrigé par type d'élément. A trouvé : 144 radios tabulables → 48 ; 99 paragraphes focalisables (Chrome 130, différé) — HANDOFF §11.39 | Le comportement selon la version de Chrome (le conteneur-défilant-focalisable est récent) ; Firefox et Safari, qui ne focalisent pas les scrollers |
| `web/scripts/noms-accessibles.mjs` | WCAG 4.1.2 : toute commande visible a-t-elle un NOM accessible (aria-label/labelledby, texte, title, alt, title de SVG, label associé), sur 9 pages × 390/1 280 px. ROUGE si une commande n'a aucun nom. A trouvé : 0, pages et états révélés compris (HANDOFF §11.41) | Les états dynamiques sont balayés à la main (`noms-dynamiques`, scratchpad) ; la QUALITÉ du nom (« Rechercher » vs un libellé creux), qu'aucune machine ne juge |
| `web/scripts/cibles-tactiles.mjs` | WCAG 2.5.8 (AA, 24×24) et 2.5.5 (AAA, 44×44) : taille des commandes à 390 px, y compris les radios d'un corrigé. A trouvé : AA tenu (seules des cibles exemptées sous 24×24) ; l'AAA a des manques assumés (HANDOFF §11.42) | L'exception d'espacement calculée finement (l'instrument liste sous-24, le jugement inline/espacement est à la main) ; un vrai doigt sur un vrai écran |
| `web/scripts/cv-chapitre.mjs` | Expérience : coût de démasquer un chapitre caché par `hidden` contre `content-visibility:hidden`, 1re et 2e fois, ×6, cinq leçons. A trouvé : **−35 % la première fois, ×30 à ×100 moins cher à chaque visite suivante** (20 ms au lieu de 600–1 300) — HANDOFF §11.22 ; levier essayé et RETIRÉ le 2026-09-06 (§11.24 : pas de gain à la première visite, et la géométrie des chapitres repliés devenait mesurable — dom-truth rouge) | Le produit lui-même (l'expérience manipule le DOM servi) ; l'impression, le lecteur d'écran et les balayages sous `content-visibility` — à rejouer si le levier est pris |
| `web/scripts/cls-sweep.mjs` | Le saut de mise en page au chargement, réseau libre puis 3G bridé | Le TEMPS de chargement lui-même (LCP, TTFB) — jamais mesuré sur ce projet |
| `web/scripts/pagination-probe.mjs` | 11 promesses × 5 leçons : un seul chapitre visible, liens profonds, flèches bornées, ancres, impression dépliée | Ce que l'élève COMPREND de la pagination — aucune mesure ne le dira |
| `web/scripts/poids-sweep.mjs` | Trois passes : (A) le document seul sur les 70 routes, (B) LCP/TTFB/poids ventilé par type, réseau libre puis 3G, (C) **processeur bridé ×1/×4/×6 — blocage total et temps au bout duquel un APPUI change enfin de chapitre** | Le réseau RÉEL (DNS, TLS, CDN, cache Vercel) : tout est un build local. Et la consommation de données d'un forfait — l'accueil tire ~920 ko de préchargement RSC, après la peinture donc hors chronomètre |
| `web/scripts/renvois-visibles.mjs` | Le jargon de rédaction que l'élève voit VRAIMENT (`innerText`, chapitres dépliés) : codes de barreau `R<n>` et mot « rung ». C'est lui qui a montré que la campagne de juillet, déclarée close, laissait 529 codes dans les sidecars **Masque le texte des formules et des étiquettes SVG avant de lire** (2026-09-05) : KaTeX rend `R_0` en spans dont l'innerText recolle « R0 », et le schéma RL porte onze étiquettes « R0 » — un résistor, pas un barreau. La leçon dipole-rl était déclarée fautive pour un résistor. Vérifié rouge avec un témoin « rung R4 et R7 » injecté en prose. | La JUSTESSE d'un renvoi : « chapitre 3 » peut être visible et faux. C'est ce qui est arrivé — voir `renvois-barreaux.py` |
| `web/scripts/slugs-visibles.mjs` | Les noms de DOSSIER (`la-verite`) arrivés sous les yeux d'un élève. Classe désormais vide et gardée dans `dom-truth` | Les slugs d'un seul mot (`autrui`), volontairement hors champ : ce sont aussi des mots français |
| `web/scripts/katex-identite.mjs` | Que deux builds rendent le MÊME DOM : les 70 routes chargées dans un navigateur, `outerHTML` sérialisé après hydratation et comparé octet par octet | Rien du rendu VISUEL — deux DOM identiques ont forcément la même image, mais l'inverse n'est pas vrai |
| `web/scripts/hunt.mjs` | Le balayage adversarial de toutes les routes | — |
| `web/scripts/item-stats.mjs` | Le biais de position des bonnes réponses, avant/après mélange, **plus l'indice de longueur brut** — que le script signale lui-même comme non réglé par le mélange | La GRAVITÉ de cet indice : `indice-longueur.mjs` la mesure et la garde. Et la qualité des distracteurs |
| `web/scripts/regle-atelier.mjs` | La règle NORTH-STAR-V2 §4, rendue mécanique | — |

### Le protocole d'ouverture d'une épreuve (2026-09-05, soir)

Une page `/examens/<id>` se rend en trois temps, et un instrument qui n'en
joue qu'un mesure un masthead. Le protocole commun aux dix instruments qui
ouvrent les 39 sujets (`routes-examens.mjs` les liste) :

1. cliquer « Commencer l'épreuve » (rôle `button`) ;
2. attendre `[data-sujet-complet]` — PAS `[data-exam-exo]`, et PAS un délai :
   depuis la révélation progressive, les coquilles d'exercice sont là
   d'emblée mais les énoncés arrivent par lots de questions (un budget
   d'environ 80 formules par commit) ;
3. cliquer « Terminer l'épreuve », puis attendre `[data-corrige-complet]`.

Un `waitForTimeout(400)` à la place du marqueur mesurait une page à moitié
rendue — et l'aurait mesurée VERTE (moins de texte, moins de défauts). Les
deux marqueurs sont posés par `EpreuveShell` sur sa racine quand le dernier
exercice de la phase est rendu.

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
   La seconde moitié — les surfaces HORS leçon — a été mesurée le même jour
   par `portee-hors-lecon.mjs` (`docs/audits/portee-hors-lecon.md`) : 39
   épreuves, 1 472 questions, **100 % avec un raisonnement expert, 94 % dont
   la correction déroule l'algèbre**, et l'atelier à **1 notion sur 62**. Elle a
   rapporté un résultat NÉGATIF qui valait la peine d'être établi : les
   énoncés portent **212 renvois distincts à une figure** que le produit ne
   rend jamais en image — et les 212 sont servis par une description
   textuelle. La conclusion évidente (« un sujet de physique sans ses
   figures est insoluble ») était fausse.
   Ce qui reste sous ce numéro : **une porte sur cette classe est
   volontairement NON armée.** Le corpus emploie cinq conventions pour
   introduire une description de figure, et distinguer « décrit en ligne »
   de « orphelin » demande de juger le sens. Les uniformiser coûterait seize
   modifications de passages déjà corrects pour l'élève — de la turbulence
   au service du vérificateur. Une porte ne s'arme que sur une classe
   propre ; celle-ci est propre pour l'élève sans l'être pour la machine.

8. **La production.** Tout ce document parle d'un build local. La synchro
   de production reste NON VÉRIFIÉE (CLAUDE.md).
9. **Le déployé, depuis ce conteneur — CONSTATÉ le 2026-09-06.** La preview
   Vercel répond à `curl` en 0,7 s, mais le relais réseau de la session coupe
   Chromium headless (`ERR_CONNECTION_RESET`, trois essais, `ws_closed_mid_
   exchange` côté relais). Tout ce que les §11.20 à 11.25 du HANDOFF mesurent
   — gels, changement de chapitre, clic de réponse — l'est sur le build local
   de HEAD, jamais sur l'artefact déployé. Ce qui se vérifie quand même : le
   HTML servi (par `curl`), donc les attributs et les classes ; pas la
   géométrie, pas le temps. À refaire depuis une machine libre.
10. **Le RÉSEAU d'un élève — ÉMULÉ depuis le 2026-09-11.** `epreuve-3g` et
   `lecon-3g` bridant Chromium à 400 kb/s et 400 ms (processeur ×4) ont
   trouvé les boutons morts avant l'hydratation (HANDOFF §11.27–11.28). Ce
   qui reste : un vrai réseau mobile — pertes, variations, radio qui
   s'endort — que `reseau-malade` approche autrement ; et un vrai téléphone.

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
marché. Voir `docs/audits/poids-et-reactivite.md` — et HANDOFF §11.21, qui a
mesuré les 62 leçons au même protocole : ce silence n'est pas un gel (aucune
tâche ≥ 1 s) mais une hydratation en une dizaine de tâches d'une demi-seconde ;
le seul gel de la leçon était le changement de chapitre, corrigé (§11.22). Ce qui reste sous ce
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

### Fermés le 2026-09-11 au soir (HANDOFF §11.29–11.38)

Ce que la liste ci-dessus ne nommait pas encore, et qui est mesuré depuis :
la **veille d'hydratation** (morceau perdu → bandeau, 0,3 s ; « Recharger »
coûte 75 ko), le **bouton Retour** (bfcache : leçons restaurées en 0,1 s,
l'accueil rebâti pendant son préchargement), la **mémoire** (7–11 Mo de tas,
0 fuite, 166–309 Mo d'empreinte), l'**adresse inconnue** (une page vide
servie — corrigée, porte armée), le **focus aux gestes de l'épreuve**
(annonce-sweep étendu), la **palette** (« maths », « svt », les épreuves),
les **polices** (−85 ko par page), le **contraste élevé Windows** (boutons
sans bord — corrigés), l'**espacement du texte** (WCAG 1.4.12 — rien ne
déborde ; les troncatures sorties au passage), et **ce que le serveur sert
sans JavaScript** (117 pages, ratio 1,00). Ce qui manque toujours : un vrai
téléphone, un vrai réseau, Firefox et Safari, un vrai Windows — et, depuis
18:53Z, **la CI elle-même** (§11.37 : plus de runner, cause côté compte).

## Trois façons dont une porte cesse de mesurer sans jamais rougir

Relevées le 2026-09-05, en regardant un run de CI jusqu'au bout plutôt qu'en
lisant sa pastille.

1. **Une route de la liste n'existe plus.** `/options` figurait dans la liste
   CI de la porte typographie ; il rend un 404 depuis la purge des bancs
   d'options. La porte mesurait la page « Page introuvable », la trouvait
   propre, et annonçait « **✓ /options** ». **La liste de routes EST la portée
   d'une porte** : une entrée fautive l'ampute en silence. Les quatre portes à
   liste (typographie, accents, impression, presse-papier) refusent désormais
   tout statut HTTP ≠ 200 et tombent.

2. **Deux portes se disputent un port.** `copie-maths` et `ancres-uniques`
   réclamaient toutes deux 3497 ; `donnees-sweep` et `accents-manquants`,
   3496. Chacune lance son propre `next start` détaché — et tuer l'enveloppe
   `npx` ORPHELINE l'enfant `next-server`, défaut écrit noir sur blanc dans
   l'en-tête de `dom-truth` depuis des mois, avec son remède (`3200 +
   process.pid % 500`). Les portes écrites après lui sont revenues aux ports
   fixes. Le remède est repris dans les six.

3. **Une porte FINIT son travail et ne rend jamais la main.**
   `ancres-uniques` imprimait « porte tenue ✓ », puis restait en vie jusqu'à
   ce que la limite de 30 min du job la tue — emportant les DEUX portes
   suivantes (données, hygiène model-id), qui n'ont jamais tourné.

   La cause tient en un mot : un enfant `spawn`é garde un handle sur la
   boucle d'événements du parent tant qu'il n'est pas `unref()`. Le serveur
   `next start` empêchait donc Node de sortir — et le crochet `process.on
   ("exit")` censé tuer ce serveur attendait la sortie que le serveur
   empêchait. Boucle fermée. Le chemin d'ÉCHEC s'en tirait (`process.exit(1)`
   est brutal) ; c'est le chemin de SUCCÈS qui pendait. Corrigé par
   `serveur.unref()` + un arrêt explicite ; même défaut latent réparé dans la
   branche rapport de `donnees-sweep`. **Le travail réel de cette porte prend
   24 secondes** (serveur froid, chronométré après le correctif) : les huit
   minutes que la CI lui voyait passer étaient de l'attente pure.

   **La classe a été balayée en entier**, pas seulement le cas trouvé : les
   NEUF instruments qui lancent leur propre `next start` ont été relus.
   `dom-truth` et `wide-measure` tuent le groupe de processus dans un
   `finally` — corrects par construction. `typo-francaise`,
   `accents-manquants`, `impression`, `copie-maths` et `polices-de-repli`
   appellent un arrêt explicite avant de rendre la main. Restaient les deux
   réparés ci-dessus. **Un défaut trouvé sans que sa classe soit balayée
   n'est qu'une anecdote.**

   **Et le mot du verdict trompait.** La pastille affichait « cancelled » —
   exactement ce que produit aussi `cancel-in-progress: true` quand une
   poussée en remplace une autre. Deux causes, un seul mot. La première
   lecture a été la mauvaise : j'ai d'abord conclu « le budget est trop
   court » et relevé la limite, avant de voir le processus pendre sur cette
   machine, log complet à l'appui. Le budget relevé reste (une marge n'a
   jamais nui), mais **ce n'était pas la cause**.

4. **Le serveur qui survit à son build.** Relevé le soir du 2026-09-05, sur
   la machine de travail, pas en CI — et il vaut pour tout instrument lancé
   avec `BASE=` sur un serveur déjà debout. Après `next build`, le `pkill -f
   "next start"` censé relancer le serveur n'a rien tué : Next renomme son
   processus `next-server`. L'ancien serveur a donc continué de servir des
   pages dont le HTML pointait vers les fichiers CSS de l'ANCIEN build — que
   le nouveau build venait d'effacer du disque. Réponse 400 sur la feuille de
   `globals.css` ; page rendue avec les seuls utilitaires Tailwind ; et
   l'instrument zoom, sur ce rendu, annonçait **876 px de débord** sur une
   leçon qui en fait **0**. Une demi-heure à chercher lequel de six correctifs
   avait « cassé » la mise en page, alors qu'aucun n'était en cause.

   Deux remèdes. Le serveur se tue par son PORT (le pid qui écoute sur 3911),
   jamais par un motif de ligne de commande — un `pkill -f` qui contient le
   nom du script tue aussi le shell qui le lance. Et `zoom-sweep` refuse
   maintenant de mesurer une page dont une feuille de style répond ≥ 400 :
   **une page sans sa feuille de style n'est pas une page, et rien de ce
   qu'on y mesure n'est vrai.** Testé en rouge : la feuille `globals.css`
   renommée sur le disque, l'instrument sort en code 2 au bout de 7 s en
   nommant la feuille et le statut. Le même garde est posé sur les trois autres
   balayages à `BASE=` (étroit, zoom 400, annonce) : la classe entière, pas le
   cas trouvé.

> **Une pastille verte dit que rien n'a échoué, pas que tout a été mesuré.**
> Les quatre cas ci-dessus produisent exactement la même couleur qu'un succès
> — ou, pour le quatrième, un rouge qui accuse le mauvais coupable.

## Un contrôle qui ne peut pas devenir rouge n'est pas un contrôle

Ajoutée le 2026-09-05, après avoir écrit deux versions d'une porte et jeté
les deux (`docs/audits/donnees-et-forfait.md`, dernière section).

L'enjeu était réel : 16 Mo de vidéos d'explication dorment dans `public/`,
dont trois fichiers de 2 à 2,7 Mo — un seul tiré sans être demandé coûterait
plus cher qu'une séance entière. Deux versions d'un contrôle « aucune vidéo
sans geste » ont été écrites. Les deux étaient VERTES sur un build où
`preload="auto"` remplaçait `preload="none"` ET où la garde de révélation
était court-circuitée.

Un diagnostic qui comptait les `<video>` du DOM a donné la raison : la vidéo
dort derrière TROIS portes (carte de banque fermée · validation attempt-first
· révélation). Le contrôle mesurait la première et croyait mesurer la
troisième.

> **Le test rouge ne sert pas à confirmer qu'on a raison. Il sert à découvrir
> ce que le contrôle mesure vraiment.** Une porte posée derrière trois portes
> fermées ne peut être que verte : elle ne certifie rien et se désarmerait
> toute seule le jour où la première change. Aucune porte n'a été armée ; le
> fait mesuré reste, écrit.

## Compter le CONTENANT, c'est mesurer une habitude de rédaction

Ajoutée le 2026-09-05, après avoir publié une fausse alerte et l'avoir
retirée le jour même.

`portee-hors-lecon` comptait les questions d'épreuve portant un tableau
`steps` — le pas-à-pas déplié — en trouvait 77 %, voyait quatre épreuves de
rattrapage concentrer le manque (SPC 2021 R : **0 sur 41**) et concluait à une
lacune de campagne. **Aucune de ces corrections n'avait été ouverte.** Elles
déroulent l'algèbre entièrement, mais dans le RAISONNEMENT, en blocs `$$…$$`,
chaque étape portant son « pourquoi ».

Les deux contenants font le même travail, et le comptage refait le prouve : les
questions SANS `steps` portent **deux fois plus** de blocs `$$…$$` (2,0 contre
1,0), et 740 des 1 132 « avec steps » n'en ont aucun. Les quatre épreuves
accusées sont celles qui en déroulent le plus (3,4 à 4,1 blocs par
raisonnement, le double de la moyenne). Le compte honnête : **94 %**. Et sur
les 93 questions sans ni l'un ni l'autre, **zéro** demande un calcul sans
recevoir de mathématiques.

> **Compter la chose, pas la case où elle est rangée.** Et avant de publier un
> manque : ouvrir un des cas qu'on accuse.

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

> **Un texte extrait du HTML BRUT n'est pas le texte rendu.** Le 2026-09-05,
> une extraction maison (`<[^>]+>` remplacé par une espace) a fait lire
> « 4 exercice s » sur l'index des épreuves, et le défaut typographique
> semblait certain. Il n'existe pas : JSX rend `exercice` et `s` en deux
> nœuds de texte, React SSR insère un `<!-- -->` entre eux, et c'est le
> commentaire que la substitution a transformé en espace. **Le texte que
> l'élève lit est `innerText`, jamais une regex sur le balisage** — et c'est
> pour ça que `typo-francaise`, `accents-manquants` et `renvois-visibles`
> lisent tous le DOM rendu. Le défaut n'a pas été rapporté : il a été
> vérifié dans un navigateur avant de l'être.

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

## Deux façons de ne rien mesurer sans s'en apercevoir

Ajoutées le 2026-09-05, après les avoir toutes deux commises.

- **`lib/content.ts` résout la racine du contenu depuis le répertoire
  COURANT.** Lancé ailleurs que dans `web/`, il rend une liste VIDE — sans
  la moindre erreur. Un compteur a donc annoncé « 0 épreuve » avec le même
  aplomb que « 39 », deux fois, avant que le motif se voie. **Un script qui
  charge le contenu se lance depuis `web/`**, et un total de zéro se
  suspecte avant d'être cru, exactement comme un total absurdement grand.
- **`innerText` ne rend pas le texte des chapitres masqués.** Sur ce site
  tous les chapitres d'une leçon sont présents-mais-masqués — l'invariant
  qui fait marcher ⌘F, l'impression et le hors-ligne. Un balayage de corpus
  qui lit `innerText` ne juge donc que le chapitre ACTIF. C'est ainsi qu'un
  « 2ème » caché dans une banque a échappé à une mesure et a été trouvé par
  la porte, qui dépouille le HTML. La règle de septembre — « le texte que
  l'élève lit est `innerText`, jamais une regex sur le balisage » — vaut
  pour JUGER une page à l'écran ; pour BALAYER un corpus paginé, il faut
  dépouiller le HTML ou visiter chaque chapitre. **Les deux règles ne se
  contredisent pas : elles répondent à deux questions différentes.**

## Deux façons de plus, le même soir

*(2026-09-11, HANDOFF §11.29 et §11.33.)* **Échantillonner depuis l'extérieur
une page occupée.** `page.evaluate` toutes les 500 ms disait « bandeau à
8,0 s » ; pris DANS la page (`MutationObserver` + `performance.now()`), le
bandeau était révélé à 2,3 s. Sur une page de 318 ko analysée à processeur
×4, un `evaluate` attend son tour des secondes : l'échantillon date le
moment où la sonde a pu regarder, pas le moment de l'événement. Règle : un
instant se prend dans la page, l'échantillonnage ne sert qu'à la présence.
**Compter un élément sans regarder s'il existe pour l'utilisateur.** Le
« premier focusable » d'`annonce-sweep` était le premier `a[href]` du DOM ;
le jour où le bandeau de la veille est passé en tête du body, son lien
« Recharger », sous `[hidden]`, a fait 106 faux « pas de lien d'évitement ».
Un élément sans géométrie ne reçoit jamais le focus ; le filtre est celui de
l'ordre de tabulation désormais. Règle : une requête DOM qui parle de
l'utilisateur passe par la géométrie (ou par `checkVisibility()`).

## Une troisième façon : mesurer un cache avec un outil qui l'éteint

*(2026-09-11, HANDOFF §11.29.)* `page.route()` de Playwright — l'interception
de requêtes — **désactive le cache HTTP** du contexte. La première mesure du
coût de « Recharger » après un morceau perdu disait 695 ko et 22,8 s, « 0 du
cache », alors que les morceaux sont `immutable` : c'était l'outil, pas le
produit. Bloqué par CDP (`Network.setBlockedURLs`), qui laisse le cache en
place : 75 ko et 4,2 s. Règle : une mesure qui touche au cache HTTP n'emploie
jamais `page.route()` ; et un chiffre de cache à zéro se vérifie contre les
en-têtes (`curl -I`) avant d'être cru.
