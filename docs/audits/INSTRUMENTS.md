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
| `web/scripts/validate-content.mjs` | La SOURCE : math équilibrée, YAML valide, marqueurs qui résolvent, jargon d'autorat (codes R, « rung ») hors du texte visible, niveaux de titres sans saut, sommet légataire, **fermeture d'un bloc `$$` sur sa propre ligne**, **le sens INVERSE de la porte figures : un `.svg` de `media/` qu'aucun marqueur ne place — asset→marqueur, ⚠ non bloquant, §11.43** ; **l'intégrité rung↔titre : un `rung: R<n>` d'item/checkpoint qui ne nomme aucun titre `## R<n>` de lesson.md — ⚠, §11.44 ; l'étiquette est lue ENTIÈRE depuis §11.69 (`R-bac` comme `R6`), et le `coverage_summary.per_rung` qui compte un barreau sans titre est signalé à part — ⚠** ; **le code de barreau `R<n>` dans un `\text{}` RENDU des exercices (bank/items/exercises/checkpoints) — l'angle mort de la porte jargon, qui ne balayait que la prose de lesson.md — ⚠, §11.46** ; **toute valeur de `misconception:` doit être DÉCLARÉE dans le items.yaml de la notion — ÉCHEC, §11.58** ; **le SECOND SENS de rung↔titre : un `##` qui enseigne sans porter de code de barreau ne peut recevoir aucun item — ⚠, §11.60** ; **un renvoi d'AUTEUR dans un champ rendu — le LABEL d'une note d'auteur (SCOPE NOTE, NOTE ÉDITORIALE, NOTE DE PORTÉE) suivi d'un « en tête de … » quelle qu'en soit la cible (fichier, bloc, entrée), `SOURCING GAP`, un chemin de dépôt, le mot « owner » — ÉCHEC, §11.61 ; NE se déclenche PAS sur « en-tête » seul, qui est de la prose légitime (« l'en-tête imprimé sur la copie »)** ; **l'`intro` d'un exercice, rendue HORS de la porte d'essai, qui AFFIRME la valeur que le premier pas gardé calcule — ÉCHEC, §11.62** ; **un `bareme_total` qui ne tombe pas sur la somme des points imprimés dans ses stems — ÉCHEC, §11.72 (motif tolérant « (0 ,5 pt) », coquille de sujet conservée délibérément)** ; **un code de barreau `R<n>` NU dans du texte rendu de YAML, AVEC exemption au vocabulaire de circuit voisin (en PC, `R1`/`R2`/`R0` sont des résistances) — ÉCHEC, §11.73** ; **un `lesson_placement` de checkpoint qui ment sur la position réelle de son marqueur dans lesson.md — seuil 90 % MESURÉ sur le corpus, pas décrété — ⚠, §11.71** ; **« chapitre N et N » — un renvoi qui cite deux fois le même chapitre, séquelle de la renumérotation barreau→chapitre — ÉCHEC, §11.70** ; **un IDENTIFIANT INTERNE dans un champ rendu — une clé d'entrée de banque `bk-AAAA-n-xN` ou un identifiant d'item `ABC-12` dont le préfixe est LU dans la notion elle-même — ÉCHEC, §11.67 ; les sous-arbres auteur (`sourcing`, `item_source`, `coverage_summary`, `contradicts_principle`) sont hors champ pour cette porte ET pour §11.61**, **la PROVENANCE DE TRANSCRIPTION et le vocabulaire de filière dans un champ rendu — « au pixel », « bitmap natif », « re-décrite depuis l'image », « CROSS-LIST », « la règle de la maison » : 125 occurrences dans 18 notions PC, §11.75**, **un NOM DE FICHIER NU (`lesson.md`, `etat-equilibre.md`) là où §11.61 n'attrapait que le chemin complet, §11.67 élargie**, **une NOTE D'ÉTAPE qui contredit le `math` qu'elle commente — §11.76, sonde resserrée en trois passes (55 faux positifs, puis 9, puis 0) jusqu'à ce qu'elle n'attrape plus que le cas réel**, **un « chapitre N » NU dont le numéro dépasse la leçon hôte — §11.77, mesuré sur 5 516 citations du corpus, exemption quand une notion est nommée avant le renvoi**, **un TOTAL ré-additionné à l'un de ses propres termes — une leçon qui pose « X = A + B » puis écrit « X + B », §11.78**, **un renvoi de chapitre MALFORMÉ (« chapitre 4/4 ») ou qui a AVALÉ UN SYMBOLE (« chapitre 1 (conducteur ohmique ajustable) », là où le composant s'appelle $R_0$) — séquelle de la campagne barreau→chapitre, §11.79 ; classe vue DEUX fois avant d'être armée**, **le SECOND SENS de la porte de sourçage : un exercice non sourcé n'était signalé que si `required_for_done: true` — le drapeau « non bloquant » éteignait la voix qui devait le dire ; désormais ⚠ inconditionnel (jamais bloquant, jamais muet), `not-applicable` exempté car c'est le statut normal des 44 variations fabriquées — 2 signalements réels, 0 faux, §11.80**, **la prose qui IMPRIME la réponse du point d'arrêt qui suit — « (Réponse : …) » dans les 500 caractères précédant un marqueur `[[checkpoint:]]` — ÉCHEC, §11.83 ; la sonde large (recouvrement des mots de la bonne réponse avec la prose d'avant) est ABANDONNÉE, 30 puis 13 signaux de sévérité mêlée, la liste des 13 étant consignée pour le pedagogy-architect** **§11.132 (2026-09-20)** : deux sens de plus sur les choix — un distracteur SANS retour (5 920/5 920 en portent un ; la porte ne regarde que `correct: false`, car les 1 612 champs vides du corpus sont tous sur la BONNE réponse, qui s'explique dans `solution`), et deux choix d'un même item avec le MÊME retour (0 sur 7 894 — sans ce second sens, un copier-coller entre distracteurs passerait, le champ étant rempli). Essais rouges §11.132a/b. **§11.133** : un item `items.yaml` doit dire QUELQUE CHOSE à l'élève qui répond juste — l'UNION de `solution`, `correct_feedback` et du feedback porté par le choix correct (0 muet sur 1 612 après le repli de `McqItem`). Viser `solution` seule aurait condamné un dessin légitime. Essai rouge §11.133. **§11.178 (2026-09-21)** : un id d'ITEM porté par deux notions — `LIB-1..9` existent dans `svt/liberation-energie-matiere-organique` ET `philo/la-liberte` (préfixe dérivé du slug, les deux en « li- »). LATENT : tout consomme la paire (notion, item) — `notion_id` sur chaque ligne d'événement, `PRIMARY KEY (user_id, notion_id)`, `perNotionItemMap`. La porte exige qu'aucune NOUVELLE n'apparaisse, les 9 étant déclarées avec leur raison ; second sens armé (une collision réparée doit sortir de la liste). **Les checkpoints sont EXCLUS, et c'est mesuré** : `cp-r0-predict` existe dans les 62 notions sur 62 — c'est une convention de nommage, pas un accident ; les compter aurait noyé 9 vraies collisions sous 10 fausses. **MUET** quand on lui donne moins que le corpus, plutôt qu'un vert non gagné. | Le RENDU. Une figure structurellement valide peut être illisible ; c'est `figure-preview` qui le dit |
| `web/scripts/dom-truth.mjs` | Le RENDU, 210 contrôles : styles calculés contre les jetons, anatomie de page, pagination, ancres accentuées, débord à 320 px, taille naturelle des figures, cibles tactiles, tabulation, texte à 200 %, **direction d'écriture (RTL)**, **jargon de rédaction dans le texte rendu**, **reflow à 320 × 256**, **lien d'évitement fonctionnel**, **HTML servi et prérendu : aucune commande active avant l'hydratation (7 routes par `fetch` + les 118 pages prérendues, plancher 100)** | Le corpus ENTIER pour ce qui se mesure au DOM — il échantillonne quelques leçons témoins ; seule la vérification du HTML prérendu couvre toutes les pages. Les balayages ci-dessous font le tour complet |
| `web/scripts/token-gate.mjs` | Une seule syntaxe de consommation des jetons (pas de `-[var(--…)]`, pas de hex, pas de rupture Tailwind morte) | Si le jeton lui-même est juste — c'est `contrast-gate` |
| `web/scripts/contrast-gate.mjs` | Les 80 paires de la palette, ratio par ratio, clair ET sombre | Le contraste d'une figure : les couleurs y sont peintes en jetons, mais leur VOISINAGE n'est pas jugé |
| `web/scripts/accents-manquants.mjs` | Le français DÉSACCENTUÉ dans le texte rendu, chapitres dépliés : 615 formes dont la version sans accent n'est pas un mot français (« theoreme », « egalite », « deja », « etre »). Attribue chaque écart au SITE DE RENDU. A trouvé **128 occurrences sur 65 pages** — libellés d'items et titres d'exercices. Corpus à zéro, `--porte` armée | Les mots dont la forme nue EST du français (« cote », « des », « sur », « croissante ») : hors champ par construction, et c'est ce qui rend la porte tenable. Les fautes d'accord et de conjugaison — « deux choses different » a été trouvé, mais parce que « different » était dans la liste, pas parce qu'un outil sait accorder |
| `web/scripts/indice-longueur.mjs` | L'INDICE DE LONGUEUR : sur les items QCM, la bonne réponse est-elle la plus longue, et son avance se VOIT-elle (≥ 20 caractères ET ≥ 20 % de la deuxième) ? Longueur comptée sur le RENDU, segments KaTeX ramenés à leur largeur à l'écran. Garde les DEUX sens : l'indice direct et l'indice INVERSE (clé strictement la plus courte, rapport pris sur la clé). Né cliquet — une notion en dette ne peut plus s'aggraver, une notion neuve naît sous 40 % — scellé aujourd'hui à 0 + 0, donc porte franche | La QUALITÉ pédagogique du distracteur allongé. Un distracteur peut être long, parallèle à la clé, et ne correspondre à aucune erreur réelle d'élève — seule une relecture par la voie pédagogie le dira |
| `web/scripts/indice-absolu.mjs` | L'INDICE DE L'ABSOLU : la clé est-elle la seule réponse à ne pas sur-affirmer ? Applique la règle que tous les manuels de stratégie de QCM enseignent — « barre ce qui contient toujours, jamais, uniquement, aucun » — et compte les items où elle désigne UNE réponse et où c'est la bonne. `seul` et `seulement` volontairement exclus des marqueurs (précision, pas sur-affirmation). Garde TROIS sens ; scellé à 0 direct (contre 54 avant campagne, 51 % de réussite pour la stratégie) et 67 inverse, sous le hasard. **Troisième sens, §11.108 — l'ÉCART : un distracteur sur-affirme 1,4 fois plus souvent qu'une clé (24 % contre 17 %), et jusqu'à +27 points sur `philo/la-liberte` ; TROIS notions où la clé ne sur-affirme JAMAIS (`chaines-de-montagnes`, `transmission-caracteres`, `granitisation-deformation`). Il compte des CHOIX, pas des items, donc il survit à la perte d'unicité que les deux premiers sens exigent — ajouter un absolu à un item qui en porte déjà un fait BAISSER les deux premiers chiffres en aggravant le corpus. Sans tolérance (ADR 0034 §3), sur ratios exacts, garde de portée ≥ 20 distracteurs** | Si l'absolu d'un distracteur EST son erreur ou n'est qu'un ornement — l'instrument ne fait pas la différence, c'est au rédacteur de la faire. Et les autres indices de forme : reprise d'un mot de l'énoncé dans la clé, accord grammatical qui ne va qu'avec un seul choix |
| `web/scripts/porte-engagement.mjs` | **LA PORTE D'ENGAGEMENT PRODUIT-ELLE UN SIGNAL ?** L'anatomie de la notion place dans l'accroche un point d'arrêt où l'élève SE PRONONCE AVANT LA RÉVÉLATION — le seul endroit du parcours où il parie. Si ses distracteurs ne portent pas de `misconception:`, l'élève s'engage et le produit ne retient rien. Soixante-deux portes dans le produit entier, une par notion : **FRANCHE**, pas cliquet. La porte est un RÔLE (convention d'identifiant `cp-r0-…`), pas une position — `pc/reactions-acido-basiques` place délibérément la sienne au sommet, avant l'exercice de type bac. Mesuré à l'armement : 61/62, le dernier corrigé le jour même. §11.112 | Si le pari est BIEN POSÉ. Un point d'arrêt d'accroche peut être tagué de bout en bout et demander une prédiction sans intérêt — c'est la voie pédagogie qui le dit |
| `web/scripts/enonces-jumeaux.mjs` | **LA MÊME QUESTION DEUX FOIS.** LESSON-EXPERIENCE-SPEC §1.1 promet à l'élève, mot pour mot, « que la même question n'apparaisse jamais deux fois » ; le mécanisme existe — un point d'arrêt qui reprend un item déclare `item_source: clone_of_<id>`, et `ItemsSection` retire alors cet id du chapitre. Il fonctionnait ; rien ne mesurait s'il ATTEIGNAIT encore tout le corpus (ADR 0031 : la PORTÉE se mesure à part du fonctionnement). **Deux directions franches**, parce qu'une seule se contourne : le clone NU (énoncé recopié, `item_source` absent → l'item reste au chapitre) et la déclaration PENDANTE (`clone_of_X` où X n'est pas dans `items.yaml` → rien n'est retiré, et la ligne dit le contraire). Mesuré à l'armement : **132 clones déclarés, 0 nu, 0 pendant**. Plus un **CLIQUET** séparé sur les énoncés jumeaux entre items (1 intra + 1 inter au 2026-09-20, tous deux d'origine SPEC — consignés pour le propriétaire). Les trois sens sont prouvés rejouables : essais rouges §11.118a/b/c. §11.118 | Si deux énoncés DIFFÉRENTS posent la même question — la reformulation lui échappe par construction, et c'est voulu : `clone_of_X` veut dire « dérivé de X », pas « recopié de X ». La première version exigeait l'identité et déclarait 111 déclarations saines « mortes » (ADR 0033) |
| `scripts/accents-francais.py --verifier` | **LA SONDE LIT-ELLE CE QUE LA RÉPARATION CONNAÎT ?** `accents.mots.json` est la liste unique que `accents-manquants.mjs` consulte. Elle a **deux producteurs** : ce script Python, et la campagne `accents-campagne.mjs`, qui y ajoute à la main les formes qu'elle vient de corriger « pour que la porte garde le terrain repris ». L'en-tête du JSON n'en nommait qu'un et INTERDISAIT l'autre — et le fichier committé portait **846 formes quand le script en produit 654**. Un `--exporter` nu, la commande que la doc imprime telle quelle, aurait effacé **192 formes** en silence. L'export fusionne désormais (vérifié idempotent) et cette porte garde le sens restant : aucune forme connue du script ne peut manquer à la liste. Essai rouge §11.125. §11.125 | Si les mots de la liste sont JUSTES. Elle compare deux ensembles ; c'est la règle d'admission écrite dans `accents-manquants` qui tranche — « la forme sans accent ne doit pas être un mot français » — et c'est elle qu'a violée « repartie », correcte en français et signalée pendant vingt-quatre heures |
| `web/scripts/media-manipulable.mjs` | **L'ÉLÈVE PEUT-IL TOUCHER LA FIGURE ?** La VISION distingue par MATIÈRE ce que « bien enseigné » veut dire, et la différence qu'elle pose est une différence d'INTERACTION : maths demande des manipulables (« glisser le point, prédire la tangente »), pc dit que « c'est là que les simulations paient le plus », et SVT — « la pensée SVT est visuelle, donc elle a besoin de vraies interactions de construction de schéma (dessiner, étiqueter), **PAS d'images affichées** ». Trois étages mesurés, qui ne valent pas la même chose : statique, étagé (l'élève avance mais ne manipule rien), manipulable. **9 notions sur 62** en portent — maths 5/14, pc 4/25, philo 0/12, **SVT 0/11 avec 49 SVG statiques et 37 étagées**, soit exactement la forme que sa ligne exclut. CINQUIÈME axe indépendant à isoler les onze notions SVT. Cliquet à une seule direction (9). Essai rouge §11.129 — revenu AVEUGLE à la première écriture, parce que la porte comptait des NOMS DE FICHIERS : un `.interactive.json` au JSON cassé comptait encore. Elle parse désormais. §11.129 | Si la manipulation SERT. Elle compte des capacités, pas des pédagogies — une figure manipulable dont le geste n'apprend rien passerait. Et elle ne voit pas les interactions de construction de schéma que SVT demande (dessiner, étiqueter) : elles n'existent nulle part dans le corpus, donc rien ne les représente encore |
| `web/scripts/portes-migrations.mjs` | **LES NON-NÉGOCIABLES DE SÛRETÉ PRODUCTION, mesurés.** `.claude/CLAUDE.md` en énonce une liste « toujours en vigueur », dérivée d'incidents réels ; deux se vérifient statiquement sur le texte des migrations — un **bloc de vérification qui asserte la CARDINALITÉ** de l'état final (leçon de 046 : une migration qui semble réussir en ne faisant silencieusement rien) et **RLS activée dans la migration qui CRÉE la table** (leçons 040, 047). Rien ne les mesurait. Les deux TIENNENT : **6/6** depuis 046, **7/7** depuis 002 ; le seul trou historique (les 7 tables de curriculum de 001) a été comblé par `040_enable_rls_curriculum_tables.sql`. Les fenêtres sont des DATES, pas des seuils de confort : les migrations sont append-only, exiger un bloc sur 001 serait exiger une faute. Essais rouges §11.128a/b. §11.128 | **Tout ce qui demande la base.** Elle lit du SQL, elle ne l'exécute pas : elle ne dit rien de l'état réel de production (toujours NON VÉRIFIÉ après dormance), ni de la justesse d'un bloc de vérification — seulement qu'il en existe un qui compte quelque chose et lève. Et rien des grants service_role-only, qui demandent une lecture de rôle |
| `web/scripts/rampe-bac.mjs` | **LA RAMPE ATTEINT-ELLE UNE VRAIE QUESTION DE BAC — PUIS SA VARIATION ?** La VISION décrit les deux derniers barreaux comme la promesse entière : « to actual past-bac questions, to fresh variations on those bac questions so nothing can be memorized ». **Sommet sourcé : 47/62** (maths 14/14, pc 23/25, philo 10/12, **svt 0/11**) ; trois états distincts — sourcé, sommet présent mais sujet non retrouvé, aucun `exercises.yaml`. **Dernier barreau (§11.124)** : 49/62 notions portent une variation fraîche, et **0 sommet sourcé n'en manque** — la promesse tient partout où le sommet existe. Trois sens : le cliquet historique (une rampe ne redescend pas), la VARIATION MANQUANTE (franche, 0) et la VARIATION MUETTE (cliquet 2 — `philo/la-verite` et `philo/le-devoir` affirment « anti-mémorisation » sans dire ce qui a été varié). Essais rouges §11.114, §11.124a/b. §11.114 · §11.124 | Si la variation est VRAIMENT fraîche — il lit un identifiant et une note, il ne compare pas les deux énoncés. Une variation qui ne varierait rien passerait. Et rien de la QUALITÉ du sujet réel : `sourcing.status: sourced` dit qu'on l'a retrouvé, pas qu'il est bien transcrit |
| `web/scripts/rampe-entree.mjs` | **PAR OÙ UN ÉLÈVE EN DIFFICULTÉ ENTRE.** `rampe-bac` mesure le SOMMET de la rampe ; celui-ci mesure l'autre bout — celui que la VISION promet en propre. Mesuré au 2026-09-20 : maths/pc/philo entrent à 1,2–1,3/5 et montent de +2,7 à +2,9 crans ; **SVT entre à 2,62 et ne monte que de +1,09**, avec **0 item de niveau 1 sur 102** là où les trois autres matières tombent indépendamment entre 8,5 % et 9,0 %. Deux axes échappent à toute étiquette d'auteur : SVT a un tiers des items par notion et deux tiers des barreaux. **Troisième mesure indépendante à isoler les mêmes 11 notions** (après le sommet §11.114 et les leçons muettes §11.37) — écart de standard, pas défaut par notion ; tranché par le propriétaire. Deux CLIQUETS à une seule direction, comme `rampe-bac` : sans marche ≤ 12, rampes plates ≤ 4. Essais rouges §11.119a/b. §11.119 | Ce qu'un élève ÉPROUVE. Il mesure des étiquettes, des volumes et des pentes — `difficulty_level` est une convention d'auteur que **aucun document ne définit**, et une notion SVT courte peut être excellente sans avoir la forme des 51 autres. Ne dit rien non plus de la CAUSE (le journal de fabrication le dirait), ni de ce que le programme officiel de SVT exige vraiment |
| `web/scripts/anatomie-notion.mjs` | **DE QUOI UNE NOTION EST FAITE.** Le dépôt parle partout de « la notion » comme d'une chose unique ; elle ne l'est pas. Trois artefacts sont universels (leçon, items, points d'arrêt), tous les autres sont inégalement répartis : `exercises.yaml` 49/62, `bank.yaml` 38/62, `media/` 51/62, `spec.md` **2/62**, `derivations.yaml` et `retenir.json` **1/62**. Le constat qui demande un arbitrage : **la chaîne du mélange cognitif est interrompue** — le Cadre porte les ratios d'habiletés (`docs/cadre/curriculum/*.yaml`, sourcés p.19), `pedagogy-architect` a pour consigne écrite de les citer « pour donner au critique de fidélité bac une cible numérique », et le champ `habilete` est renseigné sur **36 items, tous dans `pc/rlc-serie`**. Le mélange cognitif du produit est incalculable sur 97,8 % des items — non pas mauvais, incalculable. **PAS UNE PORTE**, délibérément : rien ici n'est une régression à empêcher, et un cliquet produirait des rouges permanents (ADR 0034 §9). §11.120 | Ce qui DEVRAIT être universel. Le dépôt ne définit nulle part l'anatomie minimale d'une notion, donc l'inventaire n'a aucune référence à laquelle se comparer — il décrit une dispersion, il ne la juge pas. Ne dit rien non plus de la qualité de ce qui existe |
| `web/scripts/batterie-locale.mjs --garde` | **LA LISTE DES PORTES A-T-ELLE DÉRIVÉ ?** La garde du bas de la batterie se compare à `gates.yml` et signale toute porte que la CI lance et qu'elle ignore — la leçon de §11.81, où « batterie locale » a été écrit dans chaque commit pendant une semaine pour quatre contrôles. **Elle ne voyait que 28 des 36 scripts réellement lancés** : elle cherchait `node` + un chemin, et la CI en atteint huit par `npm run` (dont `dom-truth` et les six suites de tests) ou par le crochet `prebuild` que npm déclenche seul (`generate-tokens --check`). Corrigée, elle résout les deux. Un seul vrai manque en sortait — `generate-tokens --check`, le contrôle de la source unique du design, absent de la batterie alors que la CI le lance à chaque construction. Le drapeau `--garde` existe pour que la propriété soit mesurable à PART : la batterie entière est déjà rouge (couverture-diagnostique), et un essai rouge ne prouve rien sur une commande déjà rouge (§11.104). Essai rouge §11.122. **SECOND SENS (§11.123)** : l'inverse exact — aucun `.mjs` de `web/scripts/` ne peut être à la fois non lancé, non testé, non déclaré hors champ et absent de ce fichier. Quatre l'étaient, dont `wide-measure.mjs` dont l'en-tête demandait par écrit d'être rejoué. 87 scripts, 81 catalogués, 0 orphelin. Essai rouge §11.123. §11.122–123 **TROISIÈME CONTRÔLE, en TÊTE (§11.142)** : `gates.yml` est-il seulement du YAML ? Tout le reste de la garde lit ce fichier au MOTIF, et un motif se moque de la validité — il trouve ses lignes dans un fichier que GitHub refuserait de charger, et la garde annonce « 33 portes » d'un workflow mort. C'est arrivé : un nom d'étape contenant un « : » non cité a rendu `gates.yml` illisible pendant SIX commits, sans que rien ne le dise, parce que la CI n'avait plus de runner depuis la veille — **le seul lecteur qui aurait protesté était absent**. Le contrôle s'arrête net sur un fichier invalide : comparer une liste extraite d'un relevé faux serait lui donner du crédit. Essai rouge §11.142. | Si les portes qu'elle liste MESURENT quelque chose — c'est la question d'`essais-rouges` et de `portee-portes`. Elle compare deux listes, elle ne juge aucun contrôle |
| `web/scripts/score-annonce.mjs` | En CORRECTION d'épreuve, noter une question fait-elle changer une région live ? La barre « X/Y notées · N/20 » doit être `aria-live="polite"` pour qu'un lecteur d'écran suive le total, le chrono restant `off`. Vérifie l'attribut ET qu'une note change bien le texte — l'attribut seul ne prouve rien. Sonde, pas porte : navigateur + serveur sur :3911. §11.40 | Ce que le lecteur d'écran PRONONCE vraiment : il lit le DOM, pas la synthèse vocale. Et rien du reste de la page |
| `web/scripts/tab-corrige.mjs` | L'ordre de tabulation COMPLET d'un corrigé d'épreuve, ventilé par type d'élément : combien de Tab pour le parcourir, et sur quoi. A trouvé les 243 arrêts pour 48 questions — 144 radios (motif ARIA : une par groupe), 99 paragraphes que Chrome rend focalisables via l'`overflow-x` de la prose, 4 liens. Sonde, pas porte : navigateur requis. §11.39 | Si l'ordre est LOGIQUE — il compte et classe les arrêts, il ne juge pas le parcours. Et ne regarde que le corrigé, pas l'épreuve en cours |
| `web/scripts/tracabilite-spec.mjs` | **DE L'ÉTIQUETTE DE CONCEPTION À L'ITEM QUI L'IMPLÉMENTE.** Les specs désignent les items qu'elles prescrivent par une étiquette (« **Item AE-R5-1** *(Résolution — the derivation)* ») ; l'auteur les a écrits sous un schéma plat (`AE-7`). **LA PÉDAGOGIE EST LIVRÉE — il faut le dire avant le compte, sinon il se lit comme un trou de contenu :** `aspects-energetiques` porte exactement 3 items en R5, 3 en R6, 3 en R7, les neuf que la spec appelait `AE-R5-1 … AE-R7-3`. Ce qui manque est la TRAÇABILITÉ : un lecteur qui veut vérifier qu'une figure « sert CH-FR-3 » ne peut pas remonter à l'item. La vérification est impossible, pas fausse. **CLIQUET (20), pas porte franche, et c'est délibéré** : une porte franche serait rouge en permanence, et un rouge permanent est un rouge qu'on apprend à ignorer (`DECISIONS-EN-ATTENTE` §7 le dit d'une autre porte). Essai rouge §11.136. §11.136 **SECOND SENS (§11.140)** : le barreau qu'un item vise et le chapitre qui devrait le porter — même espèce, une référence qu'on ne peut pas suivre. Cliquet à 16, le compte exact du §11.69 retrouvé par une mesure indépendante, notion par notion et barreau par barreau : la classe n'a pas bougé depuis qu'elle a été consignée. `validate-content` le signalait déjà, mais en AVERTISSEMENT et une fois par BARREAU — et §11.69 a été trouvé en triant « les avertissements que personne ne relit parce qu'ils ne bloquent rien ». Les titres se lisent à TOUT niveau : une notion range ses barreaux en `###` sous un `##` « Décortiquer », et un motif qui n'accepte que `##` invente 23 faux orphelins sur elle seule. **TROISIÈME SENS (§11.141)** : l'INVERSE exact — le chapitre qui existe et qu'aucun item ne vise, mesuré dans la même boucle et sur le même relevé de titres (deux directions d'une seule relation, jamais deux lectures qui divergent). 13 barreaux, dont **DOUZE en SVT**, touchant 11 notions sur 11 ; maths 0/14, pc 0/25, philo 1/12. Le barreau manquant est presque toujours le DERNIER (R6–R9), celui où l'élève devrait affronter l'épreuve. **Cinquième axe indépendant isolant le même sous-ensemble SVT.** Cliquet à 13. Essai rouge §11.141. | Il ne lit que les citations portant un VERBE D'USAGE (« sert X », « Item X ») — une étiquette posée sans verbe lui échappe. Il ne dit pas QUEL item implémente quelle étiquette : cette correspondance demande de lire le type cognitif décrit, donc un jugement. Il ne juge pas si l'item livré fait ce que l'étiquette décrivait |
| `web/scripts/deploye-sweep.mjs` | **L'ARTEFACT DÉPLOYÉ, MESURÉ DEPUIS CE CONTENEUR.** Lit le commit EN LIGNE (`data-build-sha`, SiteFooter) et le compare à HEAD — un chiffre mesuré sur un autre commit n'est pas un chiffre sur le nôtre ; puis l'attente honnête avant hydratation (ADR 0032) sur quatre pages, l'adresse inconnue (§11.67), et un TÉMOIN de correctif qui prouve qu'un correctif est en ligne et pas seulement commis. **Le point 9 de « ce que RIEN ne mesure encore » disait qu'il fallait une autre machine : c'était faux.** Le relais ne coupait rien — il re-termine TLS avec son propre CA, inconnu de Chromium (`ERR_CERT_AUTHORITY_INVALID`, pas `ERR_CONNECTION_RESET`). L'épingle de clé publique, calculée à chaque passage depuis le CA sur le disque, accepte exactement cette autorité et refuse les autres. **PAS en CI, et c'est un choix** : elle demande le réseau, un CA propre à la session, et elle mesure un artefact dont le commit varie — une porte là-dessus serait rouge chaque fois que le déploiement a du retard, donc un rouge qu'on apprendrait à ignorer. §11.137 **ET LE PARCOURS (§11.143)** : accueil → l'action du jour → la leçon → répondre, sur un téléphone de 390×844. Les autres contrôles regardent des pages une par une ; un produit peut avoir quatre pages saines et une couture morte entre deux. Mesuré : 28 items atteignables, 348 caractères de retour après une réponse, cible tactile 122px, 0px de débordement, 0 erreur — zéro rupture. Piège écrit sur place : attendre `networkidle` APRÈS le clic ne prouve rien (la condition est déjà satisfaite, on relit l'ancienne adresse) — il faut attendre l'ADRESSE. **ET LE PARCOURS D'ÉPREUVE (§11.144)** : l'index → un vrai sujet → « Commencer » (22 675 caractères de sujet) → « Terminer » (29 180 de corrigé, 105 commandes d'auto-évaluation) → le focus n'est pas retombé sur `<body>` (§11.40 tient en ligne). Ordre des mesures écrit sur place : les commandes de réponse n'existent QU'APRÈS « Terminer » — le sujet se compose sur papier, et les compter avant, c'est mesurer une absence qui EST le dessin. **ET LE THÈME (§11.146)** : la préférence du système est suivie (sombre `rgb(17,16,15)`, clair `rgb(247,247,244)`), **aucun flash** (une seule teinte peinte, relevée à chaque rafraîchissement), et la commande est atteignable à 390px via « Menu et réglages » — ce qui ferme l'aveu du carnet du jour 8 (« le second réfuteur est mort avant de rapporter »). **Trois instabilités corrigées dans l'instrument lui-même** : un 502 du RELAIS pris pour un défaut du produit (chaque adresse fautive est re-demandée avant d'accuser), un délai fixe au lieu d'une attente, et le tampon de commit lu dans un DOM en flux plutôt que dans le HTML servi. Trois passages consécutifs à zéro échec. **ET LA CONFRONTATION D'UNE MISCONCEPTION (§11.147)** — la promesse centrale : ce que lit celui qui se TROMPE. Témoin `LIMCONT-7`, distracteur « 2,1 » : l'erreur nommée, sa cause donnée, la bonne façon de regarder montrée. Le distracteur se reconnaît à SON TEXTE, jamais à sa lettre (le choix écrit « D » se rend en position A — le §11.121 vu en ligne), et on cherche SANS APOSTROPHE, le produit appliquant la typographie française là où le corpus écrit une apostrophe droite. | Le temps et la géométrie passent par le relais : les millisecondes mesurées ne sont PAS celles d'un élève marocain. La production reste hors de portée et humainement gardée. Tout ce qui demande un compte connecté |
| `web/scripts/preferences-secours.mjs` | **LES DEUX PRÉFÉRENCES D'AFFICHAGE APRÈS UN RENDU DE SECOURS.** Le thème (`.dark`) et la taille du texte (`--font-scale`) vivent sur `<html>`, posés avant la peinture par le script en ligne du layout — et par personne d'autre : `ThemeToggle` et `FontSizeStepper` ne font que LIRE au montage. Or `<html>` est rendu par React, et le serveur le rend toujours SANS les deux. Tant que l'hydratation réussit, React n'y touche pas ; dès qu'elle échoue — un désaccord serveur/navigateur, une exception rattrapée par `error.tsx` —, React jette le HTML du serveur, refait un rendu client complet, réapplique les attributs déclarés du layout, et **les deux préférences disparaissent**. L'élève ne voit AUCUNE erreur : la page marche, elle est juste repassée en clair, avec le texte agrandi redevenu petit. Mesuré ROUGE sur les deux axes contre l'artefact déployé (`node scripts/preferences-secours.mjs https://bac-pink.vercel.app`), VERT après `GardePreferences.tsx`. **Elle provoque le vrai chemin sans aucune route d'essai dans le produit** : elle intercepte le HTML servi d'une vraie page et y change un texte que React compare à sa charge RSC. **QUATRE VERDICTS** (ADR 0034) : ROUGE, VERTE, MUETTE (l'injection n'a provoqué aucun secours — la porte n'a rien éprouvé, et sort en erreur plutôt qu'en vert), TÉMOIN (un chargement normal doit garder les deux, sinon la mesure ne veut rien dire). **Elle est revenue MUETTE à son premier passage**, et c'était juste : elle n'écoutait que la console et l'anglais, alors qu'un build de production LÈVE le désaccord, minifié (« Minified React error #418 »). §11.149 | Elle ne mesure qu'UNE page (`/`) et qu'un seul déclencheur de secours. Elle ne dit pas combien de désaccords d'hydratation le produit porte réellement — seulement ce qui arrive QUAND il y en a un. Son essai rouge ne sabote que l'axe de la taille du texte : l'axe du thème n'est pas neutralisable de la même façon (la garde retombe sur la préférence système, qui donne la bonne réponse), et reste couvert par la seule mesure datée contre l'artefact déployé **SECOND AXE : LA PRÉFÉRENCE HOSTILE (§11.169, 2026-09-21).** La table `{small, base, large}` est un LITTÉRAL D'OBJET : `m["toString"]` n'y est pas `undefined` mais une FONCTION, donc vraie, donc le garde-fou `if (s && m[s])` la laissait passer — `--font-scale` recevait « function toString() { [native code] } ». Cinq clés héritées faisaient cela (`toString`, `constructor`, `__proto__`, `valueOf`, `hasOwnProperty`) ; les dix autres valeurs hostiles essayées (vide, « 999 », « LARGE », 100 000 caractères, du JSON) étaient refusées proprement. **Conséquence visible : aucune** — CSS juge la valeur invalide et la jette, la page rend au pixel près comme sans préférence (42 890 éléments, même distribution de tailles, 0 erreur). Défaut LATENT, corrigé parce qu'il est faux. L'axe est volontairement LARGE — `--font-scale` est vide ou un nombre, quelle que soit la valeur stockée — car une porte écrite contre les cinq clés connues serait aveugle à la sixième. Éprouvé rouge des DEUX côtés, le script d'avant peinture (`layout.tsx`) et le chemin React (`GardePreferences.tsx`) : sans le second essai, l'axe aurait pu ne surveiller qu'un des deux chemins. |
| `web/scripts/desaccords-hydratation.mjs` | **COMBIEN DE PAGES DÉSACCORDENT À L'HYDRATATION, ET LESQUELLES.** La porte soeur (`preferences-secours`) garde ce qu'un désaccord COÛTE ; celle-ci compte ceux que le produit porte VRAIMENT. Deux questions, et les confondre ferait lire un vert sur la première comme une réponse à la seconde. Charge les **118 routes prérendues** du build, une par une, sur un `next start` local, et écoute les trois codes du secours (#418 l'hydratation a échoué, #423 la racine bascule en rendu client, #425 le texte ne correspond pas) — sur `pageerror` autant que sur la console, un build de production ne rédigeant pas ces messages mais les levant minifiés. **Mesuré : 0 désaccord sur 118, trois passages identiques**, et l'essai rouge montre le balayage reconnaissant un désaccord fabriqué sur la seule page d'accueil — sans quoi ce zéro ne vaudrait rien. **DEUXIÈME FORME gardée dans la même boucle** : une page qui ne s'hydrate JAMAIS (`__bacVivant` absent à 25 s) est pire qu'un désaccord, et un balayage qui ne cherche que des désaccords la laisserait passer en vert. **Elle attend l'ÉVÉNEMENT, pas la montre** : le drapeau d'hydratation que le produit pose lui-même, et non un délai fixe — un délai fixe avait rendu deux verdicts opposés dans la même journée. ~60 s pour tout le site. §11.150 | Les routes DYNAMIQUES non prérendues n'y sont pas, ni aucun état atteint par un clic : une page peut s'hydrater proprement puis désaccorder après une interaction, et ce balayage ne le verrait pas. Elle mesure un `next start` local, pas l'artefact déployé |
| `web/scripts/trois-moteurs.mjs` | **LE PRODUIT DANS LES TROIS MOTEURS DE RENDU.** Tout ce que ce dépôt a jamais mesuré l'a été dans Chromium : les 279 contrôles de `dom-truth`, les 258 figures aux pixels, le zoom à 400 %, les balayages téléphone. Un élève qui ouvre le site sur l'iPhone d'un grand frère lit du WebKit ; sur un Firefox Android, du Gecko. **Aucun des deux n'avait jamais été ouvert** — et le produit repose sur cinq endroits où les moteurs divergent historiquement : KaTeX, les colonnes en `ch`, `content-visibility` pour les chapitres repliés, l'en-tête collant, et le script de thème avant peinture. Compare un VECTEUR de faits objectifs sur 5 pages × 3 moteurs, à 390×844, thème système sombre. **ET L'ÉPREUVE JUSQU'AU CORRIGÉ (§11.161)** — la surface la plus lourde du produit, et la seule dont l'INTERACTION n'avait jamais quitté Chromium : « Terminer » rend des centaines de formules d'un coup côté client. Mesuré identique **au caractère près** dans les trois moteurs : 22 779 caractères de sujet, 28 551 de corrigé, 489 formules, 111 commandes d'auto-évaluation, ~2,6 s pour « Terminer ». **Le compte armé est `textContent`, pas `innerText`** : `innerText` est par définition le texte TEL QUE RENDU, donc il porte les retours à la ligne de chaque moteur — 23 459 / 22 496 / 22 989 sur le même sujet, 4 % d'écart sur un DOM rigoureusement identique. L'armer aurait fait crier la mise en page. **L'axe KaTeX a été refait après coup (§11.157)** : compter les formules ne suffit pas, puisqu'une formule rendue dans une police de SECOURS compte quand même pour une. Éprouvé en bloquant réellement les polices KaTeX — la largeur cumulée ne bouge que de **+1,0 %** (noyée dans le bruit de mise en page, qui vaut 7 % entre moteurs à 390 px par la seule barre de défilement) et le nombre de familles DÉCLARÉES reste 20. Seul le nombre de familles réellement **CHARGÉES** bouge, 2 → 0 : c'est la seule des trois qui est armée, et elle a son propre essai rouge (`--essai-rouge-katex`). **Mesuré : aucune divergence sur les 8 classes armées**, trois passages identiques — 1 051 formules KaTeX rendues au même compte dans les trois, 0 erreur de formule, thème avant peinture appliqué partout, aucun chapitre replié qui peigne. C'est une PARITÉ, pas une correction : une valeur identique partout ne dit pas qu'elle est bonne, seulement qu'elle est la même. **Son essai rouge prive WebKit de son JavaScript** et exige la divergence sur `hydratee` — et il a rapporté un fait de plus, vérifié en le lisant : la veille d'hydratation (§11.29) pose bien son lien « Recharger » dans WebKit aussi, en PREMIER du document. **HORS CI, et c'est un choix écrit** : les deux moteurs ne sont pas dans l'image, et WebKit refuse de démarrer sans une installation apt (gstreamer, enchant, woff2, x264) — les commandes sont dans l'en-tête du script. §11.151 | **Le WebKit de Playwright sous Linux n'est PAS Safari sur iOS** : autre portage, autres polices système, et une barre de défilement CLASSIQUE de 10 px qui ramène le viewport de 390 à 380 et fabrique 5 px de défilement horizontal — la barre, pas le produit (mesurée et affichée pour qu'on ne la relise pas comme un défaut). Ce que fait un vrai iPhone, dont la barre est en surimpression, reste hors de portée. Cinq pages, un seul gabarit, un seul thème ; ni les figures aux pixels ni le clavier ne sont rejoués dans les trois moteurs |
| `web/scripts/figures-trois-moteurs.mjs` | **LE CORPUS DE FIGURES DANS LES TROIS MOTEURS.** Les 257 SVG ont été réglés, étiquette par étiquette, contre les métriques de texte de CHROMIUM — `figure-preview` annonce « déborde : 0 cas », dans Chromium. Or la largeur d'un texte dépend du moteur qui le compose, et un texte hors du `viewBox` est COUPÉ : l'élève lit « vitess » au lieu de « vitesse ». **Mesuré : 5 figures ne débordaient que dans Firefox** (4 corrigées, 1 en dette owner). **Elle pose EXACTEMENT la question de la porte armée** — `boiteRacine` reprise mot pour mot, tolérance 1 px, les mêmes trois bords. Premier jet : `getBBox()` brut, marge 0,5 px, bord haut en plus — il annonçait 3 figures débordantes dans les trois moteurs là où la CI annonce 0, et c'était l'instrument qui avait tort (un texte dans un `<g transform>` était comparé à un cadre qui n'est pas le sien). Comparer deux moteurs n'a de sens que si la question est identique — y compris identique à celle que la CI garde. §11.152 | Hors CI (firefox + webkit absents de l'image). Elle ne mesure que le DÉBORDEMENT : ni les chevauchements, ni les tracés qui barrent, ni les pixels, ni le thème sombre ne sont rejoués dans les trois moteurs |
| `web/scripts/marge-etiquettes.mjs` | **COMBIEN DE PLACE RESTE-T-IL À UNE ÉTIQUETTE AVANT QUE LA POLICE LA COUPE.** Née du constat précédent, et plus générale que lui : le défaut n'est pas « Firefox ». Les figures déclarent `font-family="'IBM Plex Sans', system-ui, sans-serif"` et **IBM Plex Sans n'est chargée NULLE PART** — ni dans l'image, ni par l'application (le layout ne charge que Geist et la serif de lecture). Chaque moteur, sur chaque appareil, retombe donc sur une police différente : celle du système de l'élève. Une étiquette réglée au pixel près contre la substitution d'UN moteur est un pari sur la police d'un inconnu. L'instrument mesure la MARGE de chaque texte jusqu'au cadre, en unités ET **en pourcentage de sa propre largeur** — la grandeur qui décide, indépendante du navigateur : 8 % de marge veut dire qu'une police 8 % plus large coupe l'étiquette (mesuré entre deux moteurs sur la même chaîne : **+17 %**). Seuil 15 %, **cliquet à 30 sur 4 108 textes** (34 avant la correction du jour). Elle affiche son TOTAL avant sa liste, qui est tronquée à 30 lignes — une énumération tronquée sans total se lit comme un total (ADR 0036 §4). En CI. §11.152 | Le seuil de 15 % est un choix, pas une loi : il vient d'un écart mesuré entre deux moteurs de ce conteneur, pas d'un inventaire des polices système des téléphones marocains. Elle ne mesure que la marge au CADRE — pas la marge à l'étiquette voisine, qui est la question du chevauchement et relève de `figure-preview`. Et elle ne dit pas si une étiquette coupée serait GRAVE : « V (mL) » amputé de son parenthèse se devine, un chiffre non |
| `web/scripts/stockage-refuse.mjs` | **L'ÉLÈVE DONT LE NAVIGATEUR REFUSE LE STOCKAGE.** Navigation privée, « bloquer les cookies et données de site », appareil d'école verrouillé, navigateur d'opérateur : dans tous ces cas `localStorage` ne rend pas `null`, **il LÈVE** — et il lève à l'ACCÈS, pas seulement à l'écriture. Une lecture non protégée dans un rendu React n'est donc pas une préférence perdue, c'est une page morte. Le produit stocke quatre choses, toutes des préférences (thème, taille de texte, filière, drapeau de veille) et jamais de l'état d'apprentissage (ADR 0025 §2.11) : la question n'est donc pas « l'élève perd-il ses réglages » — oui, et c'est acceptable — mais **la leçon reste-t-elle lisible et répondable**. **TROIS cas, et ils ne lèvent pas au même endroit** : refusé (l'ACCÈS lève), PLEIN (`QuotaExceededError` : seule l'écriture lève, la lecture marche), et le témoin. Parcours mesuré : accueil → leçon → ouvrir les chapitres → répondre → **basculer le thème et agrandir le texte** → épreuve. **Mesuré : identique au témoin sur tous les contrôles** — 28 items atteignables, 348 caractères de retour après une réponse, 23 459 caractères de sujet, 0 exception non rattrapée, la frontière d'erreur ne prend jamais la main. Trois passages identiques. **Elle vérifie d'abord que son propre sabotage a PRIS** (l'accès lève-t-il vraiment ?) : une colonne « refusé » qui n'a rien refusé rendrait un vert parfaitement vide. Et son essai rouge bloque les morceaux de JavaScript : le banc doit rapporter des échecs, sinon ses détecteurs sont décoratifs. En CI. §11.154 | Elle ne visite qu'une leçon et une épreuve, et à un seul gabarit (390 px, où les deux commandes vivent derrière « Menu et réglages » — il faut l'ouvrir, sinon on mesure une absence fabriquée). Et elle ne dit pas ce qu'un élève PERD : la préférence de thème et la taille de texte ne survivent pas à un rechargement, ce qui est le comportement voulu et non un défaut |
| `web/scripts/mouvement-reduit.mjs` | **« RÉDUIRE LES ANIMATIONS » EST-IL RESPECTÉ PARTOUT ?** Le mécanisme existait — `globals.css` écrase les durées à 0,01 ms sous `prefers-reduced-motion`, et `dom-truth` le vérifie **sur une figure, dans une leçon**. C'est la preuve qu'il FONCTIONNE ; ce n'est pas la mesure de ce qu'il ATTEINT (ADR 0031). Balaie les 66 pages dans les deux réglages : **22 182 transitions > 50 ms en réglage normal, 0 sous « reduce »**, 0 animation vivante, 0 page qui bouge encore. Le témoin est obligatoire et armé : si le réglage normal ne montrait aucun mouvement, le zéro ne prouverait rien. **SECOND SENS — les deux voies de mouvement ont des contrats OPPOSÉS, et les deux sont justes** : MotionDiagram retire sa barre de transport (« all steps are visible at once; there is nothing to step through »), MotionStage la GARDE (« Controls still advance; the student still drives the reveal ») et se contente de supprimer l'animation. La voie se lit dans le DÉPÔT — un `*.motion.json` signe MotionStage — et non dans le DOM. Mesuré : 45 pages MotionDiagram (251 barres → 0) et 6 MotionStage (11 barres gardées), contrats tenus des deux côtés. §11.155 | Ne mesure que ce qui est VISIBLE au chargement : une animation déclenchée par un clic (le pas à pas de MotionStage) n'est pas parcourue ici — `dom-truth` garde son instantanéité sur une figure témoin, et cette portée-là reste à un. Un seul gabarit, un seul thème. Et elle ne juge pas si une animation restante serait GÊNANTE : elle compte |
| `web/scripts/calculs-numeriques.mjs` | **LES ÉGALITÉS ENTIÈREMENT NUMÉRIQUES SE VÉRIFIENT-ELLES ?** Une erreur de calcul dans un corrigé est le pire défaut possible : l'élève qui refait le calcul et trouve autre chose conclut que c'est LUI qui se trompe. Rien ne vérifiait cela. Sur **21 938** expressions contenant un « = », **543 sont entièrement numériques** (2,5 %) donc calculables sans rien interpréter ; le reste porte des symboles, et vérifier `v_B^2 = v_A^2 + 2ad` demande de comprendre la physique. **Tout ce qui n'est pas entièrement compris est JETÉ, jamais deviné** : la traduction LaTeX → expression n'accepte au bout que chiffres, opérateurs et parenthèses. **Mesuré : 11 écarts, TOUS expliqués par trois familles structurelles, 0 inexpliqué.** Les familles disent quelque chose du produit : (1) l'arithmétique MODULAIRE — « $2\\times2=0$ » est vrai dans Z/4Z, et c'est le cœur du chapitre ; (2) l'erreur CITÉE pour être réfutée — « Tu as sans doute pris $(-1)^{2023} = 1$. Mais 2023 est impair… » ; (3) le raisonnement par l'ABSURDE — « donc $0 = 1$. Absurde. » **Un tuteur qui confronte les misconceptions et qui démontre contient des égalités fausses par construction** : une porte arithmétique naïve se battrait contre la pédagogie du produit. D'où un cliquet sur les seuls écarts INEXPLIQUÉS. En CI. Essai rouge §11.158 dans la suite rejouable. §11.158 | **Sa faiblesse est écrite** : une vraie erreur qui tomberait à moins de 240 caractères d'un mot comme « erreur », « absurde » ou « tu as » serait classée et absorbée — c'est un filet à grosses mailles, pas une preuve. Elle ne voit rien des 97,5 % d'expressions qui portent une lettre, ni des unités, ni des chiffres significatifs, ni de la physique. Elle ne lit que `$…$` et `$$…$$`, pas les tableaux ni les figures |
| `web/scripts/prose-jumelle.mjs` | **DEUX LEÇONS ÉCRIVENT-ELLES LA MÊME PROSE ?** §11.118 garde les ÉNONCÉS d'items jumeaux ; la prose des leçons n'avait jamais été comparée à elle-même — et c'est là que le copier-coller se loge le plus facilement : 62 leçons écrites en vagues, un gabarit commun, un paragraphe qui « marchait bien » ailleurs. Empreintes de 12 mots sur **281 932 mots**, 1 891 paires. **Mesuré : recouvrement maximum 4,4 %, plus long passage propre à DEUX leçons 41 mots.** Aucune leçon n'est la copie d'une autre. **LE CRITÈRE QUI TRANCHE EST LA DIFFUSION, pas le chapitre** : un gabarit se répète dans BEAUCOUP de leçons (la méthode de dissertation est dans les douze de philosophie, 81 mots), un copier-coller n'existe que dans DEUX. Premier jet : j'exemptais tout passage porté par un chapitre de méthode — l'essai rouge, collé sous « Pour t'entraîner », est resté vert. Une amnistie de chapitre est un trou où un copier-coller se cache. En CI et dans la batterie locale. Essai rouge §11.159. §11.159 | Elle ne compare que les LEÇONS entre elles — ni les items, ni les exercices, ni les épreuves, ni une leçon contre une source extérieure. Un passage réécrit avec des synonymes lui échappe : elle compare des mots, pas du sens. Et un rouge ici se LIT : une citation partagée plus longue (Kant, 47 mots aujourd'hui) le déclencherait légitimement |
| `web/scripts/dollars-apparies.mjs` | **UNE DÉPENDANCE CACHÉE DE QUATRE PORTES ARMÉES.** `validate-content`, `eleve-ruse`, `accents-campagne` et `dom-truth` retirent les maths avec `/\\$[^$]*\\$/g` avant de lire le texte. Ce motif apparie de gauche à droite : tant qu'un champ a un nombre PAIR de « $ », il retire exactement les formules ; **un seul dollar orphelin et il avale tout le passage suivant** — les quatre portes cessent silencieusement de le lire, en restant VERTES. **Mesuré : 212 fichiers, 73 611 champs de texte, 0 impair.** La propriété tient aujourd'hui ; rien ne la tenait. Née de §11.158–159, où le même appariement appliqué à des fichiers markdown ENTIERS masquait un tiers des expressions et 16 473 mots de prose. **Pourquoi la parade des fichiers ne s'applique pas ici** : dans un champ YAML une formule peut légitimement s'écrire sur deux lignes (un bloc plié les rejoint), donc le motif DOIT franchir un saut de ligne — la seule garantie possible est en amont, sur les données. Cliquet à 0, en CI et dans la batterie locale. Essai rouge §11.160. §11.160 | Elle ne regarde que les fichiers YAML de `content/` — pas les `lesson.md`, où l'appariement est une autre question (traitée ligne par ligne dans `prose-jumelle` et `calculs-numeriques`). Elle ne vérifie que la PARITÉ : deux formules collées `$a$$b$` sont paires et passent, alors qu'elles se lisent mal ailleurs |
| `web/scripts/syntaxe-vieux-moteurs.mjs` | **LE JAVASCRIPT LIVRÉ SE PARSE-T-IL SUR LE TÉLÉPHONE D'UN ÉLÈVE ?** Sur Android le moteur se met à jour tout seul ; **sur iPhone il est soudé au système** — un 6s, un 7, un SE de première génération sont bloqués en iOS 15 et ne verront jamais Safari 16.4. Une syntaxe inconnue n'y dégrade pas : elle lève une SyntaxError, le morceau entier meurt, et l'élève regarde une page blanche pendant que la veille d'hydratation lui propose de recharger — ce qui ne changera rien. Rien ne mesurait cela, et le dépôt n'a pas de `browserslist` (le défaut ne retient que des navigateurs de moins de deux ans). **Plancher mesuré : `?.` et `??` (Safari 13.1), `.at(` et `structuredClone` (15.4, API), et surtout le regex LOOKBEHIND — Safari 16.4, mars 2023.** Deux sources : `frenchTypography.ts` (CORRIGÉ le jour même — la lettre de gauche est capturée au lieu d'être regardée derrière, 10 tests verts, 7 chaînes comparées) et `mdast-util-gfm-autolink-literal` tiré par `remark-gfm`, qui transforme une URL nue en lien alors que **le corpus n'en contient aucune** (0 URL, 0 e-mail, pour 113 tableaux GFM indispensables) — décision d'architecture posée en `DECISIONS-EN-ATTENTE §14`. **Elle ignore les COMMENTAIRES** avant de chercher : au premier passage elle a accusé le fichier qu'elle venait de faire corriger, parce que le commentaire cite le motif d'avant (ADR 0036 §3). **Sans build elle garde la SOURCE et le dit** plutôt que de ne rien garder. En CI et dans la batterie. Essai rouge §11.163. §11.163 | **Aucun vieux moteur n'a été exécuté** : la conséquence (page blanche) est déduite des tables de support, pas observée — ce qui est observé, c'est la présence du marqueur dans le paquet livré. Playwright ne fournit que des moteurs récents. Elle ne connaît que dix marqueurs : une syntaxe récente hors liste lui échappe |
| `web/scripts/dette-manipulable.mjs` | **CE QUE LE PRODUIT DOIT ENCORE À L'ÉLÈVE QUI MANIPULE.** La ligne dure de `.claude/CLAUDE.md` (décision ouverte n°4) : un asset généré ne remplace pas un manipulable là où la pédagogie exige la manipulation. Une spec qui prescrit `[[embed:slug]]` demande une chose que l'élève TOUCHE. **Les six substitutions du corpus sont toutes ÉCRITES**, chacune en tête du SVG qui remplace le manipulable, chacune nommant ce qui est perdu (« curseur Δt → ici, DEUX tailles de pas fixes ») — rien n'a été maquillé. Ce qui manquait est un endroit où les COMPTER : chaque dette vivait dans un en-tête que seul son lecteur voit, et `media-manipulable` (§11.129) n'en savait rien. Deux sens : une prescription ni livrée ni remplacée par écrit (franc, 0), et le nombre de substitutions (cliquet, 6). Mesuré : 4 prescriptions, 4 manipulables livrés, 6 substitutions, 0 promesse muette. Registre : `docs/audits/dette-manipulable-2026-09-20.md`. Essais rouges §11.135a/b. §11.135 | Il lit des PRESCRIPTIONS, pas des besoins : une pédagogie qui exige la manipulation sans qu'aucune spec ne l'ait écrite lui est invisible, et les onze notions de SVT n'ont ni spec de ce genre ni embed. Il ne juge pas si le manipulable livré manipule la bonne grandeur |
| `web/scripts/champs-morts.mjs` | **CE QUE LE CORPUS ÉCRIT, CE QUE LE CODE LIT.** `correct_feedback` était écrit sur 1 678 items, dans les 62 notions, et n'apparaissait nulle part dans `web/src` : il voyageait jusqu'au navigateur, sérialisé dans la page, sans jamais s'afficher — et pour 49 items il était le SEUL canal (§11.133). Rien ne comparait les deux listes. Sens franc : un nom de champ vu ≥5 fois dans `content/**.yaml` doit apparaître dans le code (`web/src`, `web/scripts`, `scripts`), snake ou camel. Quatre annotations d'auteur sont permises NOMMÉMENT, avec leur raison — jamais par motif. **La porte s'exclut elle-même de la lecture du code** : son en-tête cite `correct_feedback` pour expliquer sa raison d'être, et la citation suffisait à déclarer le champ « lu » — elle se rendait aveugle au défaut qui l'a fait naître. Mesuré : 876 noms distincts, 73 vus ≥5 fois, 0 mort. Essai rouge §11.134. §11.134 | La correspondance est un simple SOUS-MOT sur tout le code réuni : un champ nommé `note` est réputé lu dès qu'un commentaire contient ce mot — l'erreur va dans le sens sûr (elle SOUS-déclare les morts). Un champ lu par du code mais jamais RENDU à l'écran lui échappe entièrement. Un champ écrit moins de cinq fois |
| `web/scripts/constantes-physiques.mjs` | **LA VALEUR EST-ELLE JUSTE CONTRE LE MONDE ?** `arithmetique-rendue` vérifie que les segments d'une chaîne s'accordent ENTRE EUX, et son en-tête nomme lui-même ce qu'elle ne peut pas voir : « une chaîne dont TOUS les segments sont justes entre eux mais fausse par rapport au monde ». Une célérité écrite $3{,}00\times10^{7}$ donne une arithmétique impeccable et un résultat faux. Deux sens francs : **une constante déclarée fausse** (le symbole ET l'unité doivent être présents — c'est la seule façon de distinguer la célérité `c` du coefficient `c` d'un trinôme : 92 déclarations lues à l'armement, 0 fausse), et **une vitesse supérieure à c affirmée** (1 116 vitesses lues, 3 au-dessus de c, et les trois nomment le piège pour le désamorcer — exemptées par (fichier, valeur), jamais par motif, et un essai rouge le prouve). Essais rouges §11.131a/b/c. §11.131 | Toute déclaration sans `\text{unité}` collée au nombre — **551 couples « symbole = nombre » restent hors champ**, et la porte l'affiche à chaque passage. Les constantes hors table (masses du proton/neutron, F, k, G), trop rares ou trop homonymes. Une valeur juste appliquée à la mauvaise grandeur |
| `web/scripts/wide-measure.mjs` | Le VIDE à 1920 px (la classe d'écran du propriétaire), par thème, sur la page de notion : occupation de la bande, aire du bloc-titre, et les clichés avant/après. **Son en-tête demande explicitement qu'il soit REJOUÉ** après les arbitrages du propriétaire, pour produire la ligne « après » du même tableau — et il ne figurait dans aucun catalogue, donc personne ne pouvait le savoir (§11.123). **REJOUÉ le 2026-09-20** : `node scripts/wide-measure.mjs --apres` (construction faite de HEAD), ligne APRÈS au `fable-day3-ledger` §9 bis, §11.130. Deux correctifs à cette occasion : le drapeau `--apres` (sans lui, chaque relance écrasait `before-*.png` et `measurements.json`, c'est-à-dire le terme auquel se comparer), et trois clés — `cover`, `bandFreeRightPx`, `bandOccupancyWithCoverPct` — parce que `bandVoidRightPx` appelait « vide » la région où M1 pose la couverture depuis le 2026-09-04 (espèce ADR 0033 : la porte exacte sur une question plus étroite que son nom). L'ancienne clé est GARDÉE : elle seule rend les deux lignes comparables. Sonde, pas porte | Les autres largeurs, et tout écran qui n'est pas 1920. Ne juge pas l'esthétique du résultat : il mesure des aires |
| `web/scripts/codemod-tokens.mjs` | **Écrit, il ne mesure pas.** Réécrit les utilitaires Tailwind arbitraires en leurs alias nommés (`text-[var(--color-text-secondary)]` → `text-secondary`), pour que le code ne parle qu'UNE syntaxe de jetons (Phase A). Sa campagne est passée ; il reste pour la prochaine famille d'alias. C'est `token-gate.mjs` qui GARDE la propriété, en CI | Rien — ce n'est pas un instrument de mesure. Il est listé ici parce qu'un script qu'aucun catalogue ne nomme est un script que personne ne retrouve |
| `web/scripts/validate-content.mjs` §11.121 | **LE RENVOI À UN CHOIX PAR SA LETTRE.** Les propositions d'un QCM sont mélangées au rendu (`lib/shuffle.ts`, appelé par `McqItem` et `CheckpointItem`) : la lettre affichée vient de la POSITION dans le tableau déjà mélangé, donc l'identifiant du YAML n'est presque jamais la lettre que l'élève voit. Toute prose qui dit « choix B » est **fausse à l'écran** — ce n'est pas du jargon, c'est un renvoi faux. Mesuré à l'armement : **9 occurrences, 7 notions, 4 matières** — 7 par lettre, 2 par position (« le choix précédent ») — toutes corrigées en nommant le contenu. FRANCHE, deux formes. Essais rouges §11.121 et §11.121 bis. §11.121 | Le renvoi par RANG (« la première réponse »), **cherché et délibérément non gardé** : 18 signalements sur le corpus, zéro vrai — en philosophie c'est la première réponse DU TEXTE, en SVT la première réponse immunitaire. Dix-huit corrections fausses pour aucune vraie (ADR 0034 §9). Ne regarde QUE `items.yaml` et `checkpoints.yaml` : les exercices et la banque ne permutent pas leurs items, y interdire « choix B » serait faux |
| `web/scripts/build-learner-inputs.mjs --verifie` | **LES ARTEFACTS DU MODÈLE APPRENANT SONT-ILS À JOUR ?** Trois fichiers COMMITTÉS que le produit LIT : le plancher par misconception (`learner-model-data.json`) et la carte item→misconception de la fonction edge (`item-misconceptions.{json,ts}`). L'en-tête du générateur disait depuis toujours « REGENERATE WHENEVER items.yaml CHANGE » — une instruction adressée à un humain, que rien n'appliquait, et le script n'était pas en CI. Mesuré le 2026-09-20 : **les trois avaient dérivé**, et `confusion-v-et-v-carre` valait 3 dans l'artefact (plancher atteint, donc ÉVALUABLE) contre 1 dans le corpus. La porte recalcule et NOMME le pire écart, en signalant si le plancher de trois est FRANCHI. §11.113 | Si le contenu est bon. Elle garantit que le produit lit ce que le corpus dit AUJOURD'HUI, pas que ce que le corpus dit soit juste |
| `web/scripts/serveur-frais.mjs` | **LE SERVEUR QU'ON MESURE SERT-IL LE BUILD QUI EST SUR LE DISQUE ?** `next start` lit le manifeste AU DÉMARRAGE et le garde en mémoire : reconstruire pendant qu'il tourne lui fait servir un HTML qui réclame des morceaux remplacés. Le morceau manquant donne un `ChunkLoadError`, l'hydratation échoue (React #423) et React VIDE la page — trait pour trait une régression du produit. Le script prend les morceaux de ROUTE (`/chunks/app/`, les partagés écartés nommément) que le HTML réclame et demande au serveur s'ils existent. **À LANCER AVANT TOUT BALAYAGE NAVIGATEUR.** §11.111 | Si le build lui-même est bon. Il compare le serveur au disque, pas le disque à HEAD — c'est le tampon de build de `dom-truth` qui fait cela (§11.110) |
| `web/scripts/indice-refus.mjs` | L'INDICE DU REFUS — le TROISIÈME tell mesuré, et le plus fiable. Dans **150 items**, exactement un choix refuse de conclure (« on ne peut pas conclure », « impossible à dire sans refaire le calcul ») ; il est la bonne réponse **deux fois**. 99 % de fiabilité d'élimination contre 25 % au hasard, sur **19 notions où le refus n'est JAMAIS la clé**. Motif ANCRÉ au début de la proposition, après retrait d'une amorce courte : « Non : PGCD(4,6)=2 ≠ 1, donc on ne peut pas conclure — contre-exemple : 12 » TRANCHE et n'est donc pas un refus. Cliquet à trois sens : le NOMBRE d'items qui tirent ne monte pas, le nombre d'items où le refus est VRAI ne descend pas, la fiabilité ne remonte pas là où elle a de la marge. §11.103, §11.104 | Si le refus MÉRITE d'être vrai dans tel item. 143 des 148 distracteurs de refus portent un `misconception:` — ce n'est pas un corpus bâclé, c'est un corpus où « je ne peux pas conclure » n'est jamais la réponse, alors que le bac l'évalue (forme indéterminée, données insuffisantes). L'arbitrage est éditorial |
| `web/scripts/eleve-ruse.mjs` | L'UNION DES FICELLES — ce qu'un élève obtient sans avoir rien révisé, en appliquant les quatre tells dans l'ordre (barrer le refus, barrer l'absolu, barrer l'écho du tronc, cocher le plus long). Espérance calculée EXACTEMENT, jamais simulée. **1 974 items · hasard 25,0 % · à la ficelle 31,9 % · témoin 21,5 %.** Le hasard n'est pas une convention : la stratégie ne lit jamais `correct`, donc l'espérance sous clé tirée au sort vaut exactement 1/n. Emploie le MÊME seuil de visibilité que `indice-longueur` (≥ 20 caractères ET ≥ 20 %) — un élève ne compte pas les caractères. Cliquet corpus + par notion. §11.104, §11.107 | CE QUE L'ÉLÈVE FAIT VRAIMENT. C'est un MAJORANT d'un élève parfaitement stratège, pas une statistique d'usage. Et la qualité du distracteur : un item peut être inexploitable et mauvais |
| `web/scripts/essais-rouges.mjs` | **CHAQUE PORTE PEUT-ELLE ENCORE DEVENIR ROUGE ?** — la question qu'aucune porte ne pose sur elle-même. 13 essais inscrits au manifeste (`essais-rouges.manifeste.json`), rejoués à chaque passage : on casse UNE occurrence, on mesure, on restaure octet pour octet. Quatre verdicts — ROUGE (elle voit), AVERTI (verte ET son avertissement APPARAÎT, vérifié contre un motif : §11.71 avertit par dessein), VERTE (**ambigu** — porte aveugle OU essai mal construit, moitié-moitié à l'usage), MUET (le motif n'existe plus, rien cassé donc rien mesuré). Né de §11.104 : trois « portes vérifiées rouge » l'avaient été sur des commandes qui n'avaient jamais tourné. ADR 0034 | Si la porte mesure la BONNE chose. Un essai rouge établit qu'elle crie sur le défaut qu'on lui montre, pas qu'elle couvre la classe entière — c'est `portee-portes` et la lecture du motif qui le disent |
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
| `web/scripts/etroit-sweep.mjs` | 108 pages (62 leçons, 46 autres — compté le 2026-09-24 ; 70 à l'origine) × 3 largeurs de téléphone (320/360/390) : débord horizontal, chapitres dépliés ; **armée en CI** (job `telephone`, §11.193) **Ouvre les 39 épreuves** (2026-09-05) : la liste se lit par `routes-examens.mjs`, et chaque sujet est ouvert en deux clics — « Commencer », puis « Terminer » — sans lesquels l'instrument mesurait le masthead et déclarait la page propre. | La lisibilité. Une page peut ne pas déborder ET rester illisible — c'est ce que la sonde de figures a montré |
| `web/scripts/horsligne-sweep.mjs` | Six scènes de coupure réseau : navigation par chapitre, clic vers une autre leçon, bouton Retour, leçon déjà visitée, réponse à un QCM, retour du réseau. **Ce qui tient tient ; ce qui casse est borné** — voir `docs/audits/hors-ligne.md` | Le réseau qui RAMPE au lieu de mourir (latence + pertes de paquets), et la coupure pendant un enregistrement |
| `web/scripts/polices-de-repli.mjs` | Quels caractères ne sont PAS dessinés par la police du site, et par quoi ils le sont — via `CSS.getPlatformFontsForNode` (protocole DevTools), qui rend les fontes RÉELLEMENT utilisées et le compte de glyphes. Produit l'INVENTAIRE des caractères à couvrir : `ᵉ` (66), l'arabe (~500), les symboles mathématiques écrits en Unicode (~120) | Si le repli se VOIT — l'instrument localise, la capture tranche. Et la fonte de repli MESURÉE est celle de ce conteneur Linux : sur un téléphone ce sera Roboto/Noto ou San Francisco |
| `web/scripts/recherche-navigateur.mjs` | Ce que ⌘F trouve : un mot du chapitre ouvert (témoin), un mot qui n'existe QUE dans un chapitre replié, et le texte du MathML masqué de KaTeX. A montré que **10 chapitres sur 11 sont hors d'atteinte de la recherche** — la moitié « ⌘F » de l'arbitrage des chapitres, enfin mesurée | Firefox et Safari (moteurs de recherche différents), et l'interface ⌘F elle-même : on passe par `window.find()`, qui partage la machinerie mais n'est pas l'UI |
| `web/scripts/typo-francaise.mjs` | La typographie FRANÇAISE dans le texte rendu, chapitres dépliés : apostrophe droite entre deux lettres, espace manquante devant `; : ?`, guillemets mal espacés. Attribue chaque écart au SITE DE RENDU (le chemin des éléments), ce qui dit où corriger. A trouvé ~1 100 écarts hors prose — figures, `\text{}` des formules, titres, libellés du programme. **Unité de mesure : le BLOC, depuis le 2026-09-21 (§11.164).** Elle lisait chaque NŒUD DE TEXTE séparément et annonçait 0 alors que 152 apostrophes droites étaient lisibles sur 50 des 71 pages : « l'**amylase** » pose l'apostrophe en fin de nœud, la lettre suivante dans le nœud d'à côté. Elle partageait l'angle mort du plugin qu'elle surveille. Trois frontières cassent la chaîne : le bloc, un nœud sauté (code, MathML), et chaque formule KaTeX (îlot). 110 pages (62 leçons + 39 épreuves ouvertes et corrigées + accueil, examens, matières, atelier, connexion), zéro écart aujourd'hui ; `--porte` armée, essai rouge de la porte en HANDOFF §11.164. **QUATRIÈME AXE, ET IL VA DANS L'AUTRE SENS (§11.165)** : l'espace insécable EN TROP — une fine posée DANS une formule, lue dans l'annotation TeX que KaTeX conserve, c'est-à-dire dans ce que le moteur a réellement reçu. Une seule direction se triche : appliquer la règle partout rend la première verte et FABRIQUE la seconde, ce qui était littéralement le cas — `frenchTypography` est appelée sur des chaînes brutes à une soixantaine d'endroits, LaTeX compris, et coupait des `\;` entre la contre-oblique et le point-virgule (24 sur 10 pages, 24 avertissements KaTeX à chaque construction). Éprouvé rouge par reconstruction : 1, 1, 2, 1, 2, 3 sur les six premières pages touchées | Le point d'exclamation (factorielle `n!`), les commentaires XML des figures, et le `style` inliné d'une figure (du CSS, pas du français — exclu explicitement) |
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
| `web/scripts/cls-sweep.mjs` | Le saut de mise en page au chargement, réseau libre puis 3G bridé | ~~Le TEMPS de chargement lui-même (LCP, TTFB)~~ — **FERMÉ le 2026-09-21** par `temps-de-chargement.mjs` (§11.175). Ce qui reste : les millisecondes d'un VRAI appareil sur un VRAI réseau |
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
9. **Le déployé, depuis ce conteneur — OUVERT le 2026-09-20 (§11.137).** Le
   constat du 2026-09-06 disait « à refaire depuis une machine libre ». Il n'a
   pas fallu d'autre machine : **le relais ne coupait rien**. Il re-termine TLS
   avec son propre CA, et Chromium ne le connaissait pas — l'erreur est
   `ERR_CERT_AUTHORITY_INVALID`, pas `ERR_CONNECTION_RESET`, et le magasin NSS
   de l'image date de sa construction alors que le CA de la session est écrit à
   chaque démarrage. `deploye-sweep` épingle la clé publique du CA lu sur le
   disque et mesure l'artefact déployé : commit en ligne, attente honnête avant
   hydratation, adresse inconnue, témoin de correctif. **Un diagnostic recopié
   d'une session à l'autre a coûté deux semaines d'angle mort** — il disait
   « coupé » là où il fallait lire « pas de confiance ».
   Ce qui reste sous ce numéro : le TEMPS et la GÉOMÉTRIE, qui passent par le
   relais et ne sont donc pas ceux d'un élève marocain ; et la PRODUCTION, qui
   reste hors de portée et humainement gardée.
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
le 2026-09-11 à 18:53Z, **la CI elle-même** (§11.37 : plus de runner,
cause côté compte ; 230 runs sans vert au 2026-09-21).

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

---

## `web/scripts/essai-rouge.mjs` — casser une porte sans perdre de travail

**Ce qu'il mesure.** Qu'une porte devient bien ROUGE quand on introduit le
défaut qu'elle prétend voir. ADR 0031 : *une porte qui ne peut pas devenir
rouge ne dit pas que tout va bien — elle dit que rien n'a été mesuré.*

**Pourquoi il existe.** La façon évidente de défaire la casse,
`git checkout -- fichier`, **détruit tout ce qui n'est pas committé dans ce
fichier**. Le piège est consigné en HANDOFF §11.97, répété en §11.98, et repris
une **troisième** fois en §11.100. Trois notes n'ont rien empêché ; l'outil est
la réponse à la troisième.

Il copie **hors de l'arbre de travail** (`os.tmpdir()`), casse **une seule**
occurrence (un essai doit isoler un défaut, sinon on ne sait pas lequel la porte
a vu), lance la porte, puis restaure **depuis la copie** — via `finally`, un
`process.on("exit")` et les signaux, donc aussi quand la porte plante ou qu'on
interrompt au clavier. Il vérifie enfin que le fichier est revenu **octet pour
octet** et sort en 3 si ce n'est pas le cas.

```
node scripts/essai-rouge.mjs \
  --fichier ../content/philo/la-violence/items.yaml \
  --de ": le chapitre 1" --vers ": Le chapitre 1" \
  --porte "node scripts/validate-content.mjs --strict content/philo/la-violence"
```

Sortie **0** si la porte est devenue rouge (l'essai réussit quand la porte
échoue), **1** si elle est restée verte — *elle est aveugle au défaut*, **2** si
le motif ne se trouvait pas (rien cassé, donc rien mesuré), **3** si la
restauration est incomplète. `--attendu vert` inverse le sens.

**Vérifié le 2026-09-20**, trois épreuves :
1. §11.100 (capitale en milieu de phrase) → ROUGE, restauré octet pour octet ;
2. §11.99 (chemin de porte cassé) → ROUGE, restauré octet pour octet ;
3. **l'épreuve qui compte** — une sentinelle non committée déposée dans le
   fichier **SURVIT** à l'essai rouge, là où `git checkout --` la **détruit**.
   Le contraste a été rejoué dans les deux sens.

**Quatrième verdict : AMBIGU (2026-09-21, §11.164).** Le pré-contrôle établit
que la commande TOURNE sur l'arbre intact ; il n'établit pas qu'elle tourne
encore **une fois le fichier cassé**. Cas vécu : casser une CONDITION en
`false &&` rend la branche inatteignable, TypeScript cesse de rétrécir le type,
la construction échoue — et la porte ne tourne jamais. Code de sortie non nul,
et l'outil annonçait « ✓ passée ROUGE ». Le rouge venait de `tsc`.

Il suspend donc son verdict quand la sortie porte la marque d'une chaîne
d'outils tombée AVANT la porte — `Failed to compile`, `Type error:`,
`error TS####:`, `Cannot find module`, `ERR_MODULE_NOT_FOUND`, `SyntaxError:`,
`build worker exited` — et dit comment réécrire la sabotage : **viser une
VALEUR, pas une CONDITION**.

Le détecteur avait son propre angle mort : son premier jet ne connaissait que
les deux formulations de *Next* et ne reconnaissait pas `tsc` en direct. Le
motif a été écrit **après** avoir rejoué la sabotage à la main pour lire le
texte exact. Prouvé dans les deux sens : ✗ AMBIGU sur la sabotage qui ne
compile pas, et **aucune suspension à tort sur les 57 essais du manifeste**.

---

## Dernier passage complet des instruments HORS CI — 2026-09-21

Un instrument hors CI ne dit pas tout seul **quand** il a été vrai pour la
dernière fois. Ce tableau le dit. Rejoué sur `HEAD` du jour, build propre,
serveur local.

| instrument | verdict |
|---|---|
| `dom-truth` | 279 contrôles, 0 échec |
| `typo-francaise` | 110 pages — 0 sur les quatre axes |
| `latex-nu` | 110 pages — 0 lu brut, 0 entendu en LaTeX |
| `ancres-uniques` | 62 leçons, 2 189 titres, 0 ancre dupliquée |
| `accents-manquants` | 64 pages — 0 mot désaccentué |
| `formules-rendues` | 101 pages — toutes les formules se rendent |
| `copie-maths` | 4 pages, 2 746 formules, 0 caractère parasite au collage |
| `impression` | encre noire sur papier blanc, thème sombre compris |
| `liens-internes` | 111 pages, 108 cibles, 0 morte |
| `donnees-sweep` | passe |
| `zoom-sweep` | 1280 px : 0 · **360 px avec texte à 200 % : 10** — formules d'énoncé qui dépassent, classe connue et acceptée (§11.38). Le onzième signalement était neuf et a été corrigé le jour même (§11.173) |

**Batterie locale** : tout vert sauf `couverture-diagnostique`, rouge
**délibérément** — c'est la décision owner en attente (111 distracteurs sans
tag, §11.102). **64 essais rouges, tous crient.** Garde anti-dérive : 108
scripts, 103 catalogués, 39 portes + 19 hors champ assumés, `gates.yml` valide
à 56 étapes.

**La CI GitHub, elle, n'a toujours pas de runner** : chaque exécution échoue en
3–5 s sans journal depuis la veille (§11.37). Tout ce qui précède a été mesuré
EN LOCAL ; personne ne doit lire « CI verte » dans cette page.

---

## `web/scripts/figures-id-divergents.mjs` — la première définition gagne, partout

**Ce qu'il mesure.** Une seule condition, et c'est tout le sujet : **même
identifiant, défini DIFFÉREMMENT par deux figures d'une même leçon, et
déréférencé** par `url(#…)` ou `href="#…"`. Deux sur trois ne font pas rouge.

**Pourquoi si étroit.** Les figures sont inlinées : leurs identifiants internes
se retrouvent tous dans le même document et s'y répètent — mesuré sur les
62 leçons rendues, **189 `#step-1`**, plus quelques dégradés et états. C'est
sans effet : `MediaDiagram` masque les étapes en réécrivant le markup de chaque
figure, `StagedFigure` interroge son propre `svgRoot`, jamais le document.
`ancres-uniques` avait tranché : une porte sur « aucun id dupliqué » serait
**rouge sur un fait inoffensif et finirait désarmée**. C'est juste — et cette
porte-ci ne le fait pas.

**Le danger qu'elle garde.** En SVG, `url(#id)` se résout dans TOUT le
document, pas dans la figure : deux définitions du même id, c'est la PREMIÈRE
qui gagne, partout. Tant qu'elles sont identiques, personne ne voit rien — état
vérifié aujourd'hui : les deux `liquid-grad` d'`electrolyse` sont identiques à
l'octet près, et les quatre `r-body-grad` de `rlc-serie` viennent du même
fichier posé quatre fois. Le jour où quelqu'un modifie UNE des deux, la figure
éditée continue de peindre avec l'ancienne, **et rien ne le dit** : ni erreur,
ni avertissement, ni différence de pixels sur la figure qu'on vient de toucher.
C'est un piège pour le prochain auteur, pas un défaut d'aujourd'hui.

**État au 2026-09-21** : `--porte` armée, verte sur **51 notions, 267 figures,
1 078 identifiants**. Node pur — ni build ni navigateur —, donc dans la
batterie locale. Éprouvée **dans les deux sens** : rouge quand un des deux
`liquid-grad` est modifié ; et muette sur les doublons inoffensifs, ce que le
corpus exerce **49 fois** (49 notions sur 51 définissent un `step-N`
différemment d'une figure à l'autre).

---

## `web/scripts/bareme-ferme.mjs` — une copie parfaite vaut 20/20

**Ce qu'il mesure.** Deux choses, et la seconde rattrape l'erreur symétrique de
la première :

1. **Par exercice** — la somme des barèmes de ses questions vaut exactement son
   barème annoncé.
2. **Par épreuve** — une copie tout juste vaut exactement 20,00/20.

**Pourquoi il existe (§11.168).** Le geste tient en une phrase : ouvrir les
39 épreuves, marquer TOUTES les questions « juste », lire la note. Personne ne
l'avait fait. **Deux épreuves sur 39 refusaient le 20/20 à une copie
parfaite** — `spc-2021-rattrapage` à 19,25 et `spc-2010-normale` à 19,75. La
règle de lecture ne retenait que la PREMIÈRE étiquette d'un énoncé groupé
(« a) (0,25 pt) … b) (0,25 pt) … ») : la question valait 1 point, le produit en
comptait 0,25, et le reste n'allait nulle part.

**Il importe la règle du produit, il ne la recopie pas.** `ptsDepuisStem` vit
dans `web/src/lib/bareme.ts` précisément pour ça — une porte qui recopie le
motif vérifie sa propre copie (ADR 0033). Les épreuves sont lues par
`listEpreuves()`, la même fonction que la page.

**Pourquoi DEUX directions.** La règle de lecture a deux façons de se tromper :
oublier une étiquette, ou en compter une de trop (un « (2 points) » écrit en
prose). Le contrôle par exercice voit les deux ; le 20/20 seul ne verrait que
la première.

**Un QUATRIÈME axe : l'étiquette affichée (§11.170).** Le nombre de points écrit
sur un bouton vaut-il celui qui sera compté ? « Partiel » vaut la moitié du
barème, et la moitié d'un quart de point est un huitième : l'affichage arrondi à
deux décimales écrivait « 0,13 » pour 0,125 — **518 questions sur 1 472**. Le
total restait juste ; c'est l'élève qui additionne à la main qui ne retombait
jamais dessus. La porte relit l'étiquette avec le formateur DU PRODUIT
(`formatPoints`, importé) et exige l'égalité exacte.

**Et un TROISIÈME axe : le plafond.** Aucune épreuve ne déclare plus de
20 points. C'est l'angle mort de l'axe 2, créé par sa propre formule : la note
est ramenée sur 20 par règle de trois, donc un barème transcrit trop lourd
(une épreuve de 23 points) rend **quand même** 20,00/20 à une copie parfaite.
Isolé par une sabotage qui gonfle le total ET l'étiquette du même montant, pour
que la fermeture tienne : un seul signalement sort, le plafond. Les deux autres
axes restent verts — ils ne peuvent pas voir ça.

**État au 2026-09-21** : `--porte` armée, verte sur **39 épreuves,
247 exercices, 1 472 questions**. Arithmétique pure — ni build, ni navigateur —
donc DANS la batterie locale, contrairement à `typo-francaise` et `latex-nu`.
Deux essais rouges au manifeste : `§11.168 (a)` (la règle revenue à la première
étiquette → 19,25 et 19,75) et `(b)` (une étiquette du corpus faussée →
20,5/20).

---

## `web/scripts/latex-nu.mjs` — le LaTeX affiché tel quel, et celui qu'on fait dire tout haut

**Ce qu'il mesure.** Deux façons pour un élève de rencontrer du LaTeX qui
n'aurait jamais dû lui parvenir.

**Axe 1 — il le LIT.** Une paire de `$` dont le contenu porte une marque de
commande (`\`, `^`, `_`, `{`, `}`), dans un nœud de texte **hors de toute
formule rendue**. Le filtre sur la marque est délibéré : « 30 $ » n'est pas du
LaTeX.

**Axe 2 — il l'ENTEND.** La même chose dans un `aria-label`, un `alt`, un
`title`, le titre du document ou la méta-description — là où **aucun moteur ne
rendra jamais rien**, et où un lecteur d'écran épelle « u tiret bas accolade
ouvrante n plus un ». Cet axe accepte aussi une séquence `\commande` nue et un
`^{`/`_{`, qui n'ont besoin d'aucun dollar pour être illisibles à voix haute.
Les attributs sont lus sur **tout le document**, pas seulement `<main>` : le
masthead et le pied de page se font annoncer aussi.

**Pourquoi il existe (§11.166).** Sur une page de maths, l'élève lisait
« `Partie II — Le plan complexe $(O;\vec{u},\vec{v})$ : $a=1+i$` » — dollars et
contre-obliques compris. **150 formules brutes sur 26 pages** (7 leçons sur 62,
19 épreuves sur 39), depuis exactement deux sites de rendu. Et la porte
typographie ne le voyait pas : un **second** défaut le masquait (§11.165), la
règle française posant une fine devant le `;` de la formule — ce que cette
porte-là exigeait justement. Corriger le premier a révélé le second. Sans
instrument dédié, rien ne garde la propriété une fois les deux réparés.

**Ce qu'il ne dit pas.** Il ne juge pas la NOTATION parlée. La carte des
descriptions de figures écrit `u_n`, `E_n`, `n²` ; un lecteur d'écran dit « u
tiret bas n », ce qui est imparfait mais c'est la convention de la maison sur
des dizaines d'entrées, et la changer est une décision éditoriale. Seules les
accolades LaTeX, étrangères à cette convention, sont refusées.

**État au 2026-09-21** : `--porte` armée, verte sur **110 pages** (62 leçons +
39 épreuves ouvertes *et* corrigées + 9 pages hors leçon), 0 sur les deux axes.
Hors de la batterie locale pour la même raison que `typo-francaise` : il lui
faut un build et un navigateur.

---

## `web/scripts/portee-portes.mjs` — ce qu'une porte VERTE a réellement regardé

**Ce qu'il mesure.** Une porte peut être verte pour deux raisons opposées :
le corpus est propre, ou **son scan ne tourne sur rien** — un champ que plus
aucun fichier ne porte, un glob qui ne résout plus, une extension renommée.
Les deux impriment le même `✓`. ADR 0031 : *un badge vert dit que rien n'a
échoué, pas que tout a été mesuré.*

Il lance la porte sous couverture V8 (`NODE_V8_COVERAGE`), puis, pour chaque
point d'échec du script, examine la région à compteur zéro qui l'entoure.

```
node scripts/portee-portes.mjs            # défaut : validate-content sur les 62 notions
node scripts/portee-portes.mjs --script scripts/<une-autre-porte> --seuil 30
```

**État au 2026-09-20 :** 73 points d'échec, **0 porte morte**. 39 de portée
> 62, 34 de portée ≤ 62 — et les 34 ont été confrontées une à une à leur
dénominateur : 38 `bank.yaml` → portée 38 · 49 `exercises.yaml` → 49 ·
52 exercices `sourced` → 52 · 10 SVG à bloc `<style>` → 10 · 5 figures
interactives → 5 · 32 bindings → 32 · 1 seul `settleTarget` → 1 · 11 marqueurs
`[[motion:]]` réels → 11 · 4 entrées de dette → 4. **Chaque portée égale sa
population.**

### Deux pièges, tous deux vécus le jour où l'instrument a été écrit

**1. Une portée basse n'est pas un défaut.** Une porte qui ne concerne que les
figures interactives a une portée de 5 parce qu'il n'y a que 5 figures
interactives. Les deux « écarts » que j'ai cru trouver au premier passage
étaient des erreurs de **ma sonde** — un glob `.control.json` là où les
fichiers sont `.interactive.json`, et un marqueur `[[motion:]]` compté alors
qu'il est dans un commentaire HTML. **Vérifie le dénominateur avant d'accuser
la porte.**

**2. La première version de l'instrument était elle-même aveugle.** Elle
remontait jusqu'à la première plage englobante de compteur > 0 et appelait ça
la portée. Quand le scan d'une porte ne tourne pas, cette remontée continue
jusqu'à la boucle `for (const dir of dirs)`, qui tourne 62 fois : l'instrument
annonçait donc **62** pour une porte qui ne regardait **rien**. Découvert en la
tuant exprès avec `essai-rouge.mjs` — l'instrument est resté vert. Corrigé : le
discriminant est la LARGEUR de la région à zéro. Une branche d'échec inerte ne
contient que son `console.error` et son `dirFail++` ; un scan mort laisse une
région bien plus large, qui contient encore une boucle, une lecture de fichier
ou un test d'expression.

### La limite, et pourquoi les deux instruments sont complémentaires

**`portee-portes` ne voit pas une porte dont le scan tourne mais dont le motif
ne reconnaît plus rien.** Vérifié : un `RegExp` rendu introuvable laisse
l'instrument vert, à juste titre — le scan s'exécute. C'est indiscernable d'un
corpus propre sans casser quelque chose exprès.

| | trouve | coût |
|---|---|---|
| `portee-portes.mjs` | la porte dont le **scan ne tourne pas** | automatique, tout le corpus, une commande |
| `essai-rouge.mjs` | la porte dont le scan tourne mais qui **ne reconnaît pas le défaut** | une mutation écrite à la main par porte |

**Aucun des deux ne suffit seul.** Le premier est le balayage bon marché ; le
second est la preuve, porte par porte.

### `indice-longueur.mjs` — seconde direction (2026-09-20)

Le cliquet gardait l'indice **EXPLOITABLE** (avance > 20 caractères ET > 20 %).
Il garde désormais **aussi le taux BRUT** par notion. Les deux sens sont
nécessaires : le corpus affiche **0/1804 exploitable** — vert, et vrai — pour
**42 notions sur 62 au-dessus du hasard et 16 au-dessus de 50 %** en taux brut.
Un seul des deux sens laissait lire « le défaut est traité » là où seul son
caractère visible l'était. Détail et classement : HANDOFF §11.101.

Tolérance du sens brut : au-dessus de 25 % ET au-delà de 12 points de hausse.
Vérifiée ROUGE à 39 et 13 points, VERTE à 7.

**En CI depuis le 2026-09-20.** `portee-portes.mjs` tourne à chaque poussée,
sous le nom « Porte des portes ». Il est bon marché (une exécution de
`validate-content` sous couverture V8) et il garde la classe de défaut qu'aucune
autre porte ne peut voir : une porte dont le scan ne tourne sur rien.

`essai-rouge.mjs` reste **hors CI**, et délibérément : il demande une mutation
écrite à la main pour chaque porte, donc il ne peut pas être automatisé sur
l'ensemble. Il s'emploie au moment où l'on arme une porte, ou quand on soupçonne
qu'une porte verte ne regarde plus rien.


## `web/scripts/temps-de-chargement.mjs` — quand le contenu arrive, et ce qu'on attend

Le dernier angle mort nommé dans la colonne « ne mesure pas » de `cls-sweep` :
TTFB, FCP, LCP, et **l'élément du LCP**, réseau libre puis 3G lent (400 kb/s,
400 ms — les mêmes conditions que `cls-sweep`, pour que les deux se lisent
ensemble). Trois passages par route, **médiane et étendue** : une mesure de
temps sans son étendue ne permet pas de distinguer un défaut d'un bruit
(ADR 0036).

La colonne actionnable est l'élément : un chiffre de LCP dit qu'on attend,
seul l'élément dit CE QU'on attend. Résultat de la première passe
(2026-09-21) : **FCP = LCP sur les huit routes** — le plus gros élément peint
au premier coup de pinceau, ce qu'on attend d'un rendu serveur. Rien à
corriger de ce côté. C'est la colonne TTFB qui a parlé : 5 ms sur l'accueil,
**201 ms sur une leçon** — et le coupable n'était pas le temps mais le POIDS
(3,89 Mo de HTML, §11.175).

**Ce n'est PAS une porte, et ça n'en sera pas une** : un seuil en
millisecondes sur une machine partagée rougirait au hasard, et une porte
instable apprend à ignorer le rouge de toutes les autres (ADR 0036). Les
valeurs absolues sont celles de ce conteneur ; ce qui survit au changement de
machine, c'est le CLASSEMENT entre pages et l'identité de l'élément LCP.

**Second mode, `--corpus`** (§11.177) : le POIDS des 62 leçons, sans
navigateur, trié par ce que l'élève télécharge. De **77 ko à 389 ko** gzip,
médiane 139 ko, corpus 10,35 Mo — un facteur 5, qui suit la densité de
formules et non une erreur de page (charge RSC 50–57 % partout). Piège inscrit
dans le code : le `fetch` de Node décompresse tout seul, donc le premier jet
annonçait gzip == brut ; le mode passe par `curl %{size_download}` et refuse de
tourner sans lui plutôt que d'imprimer un chiffre qui n'est pas celui qu'il
annonce.

## `web/scripts/source-en-double.mjs` — la leçon ne doit pas repartir dans la page

**PORTE, armée en CI (57ᵉ étape).** La moitié d'un document de leçon (53,7 %)
n'est pas le DOM rendu : c'est la charge RSC, ce que l'App Router sérialise
pour hydrater les composants CLIENT. Tout ce qu'on passe en prop à une
frontière client y repart **en plus** du DOM déjà rendu. `MarginRail` et
`ChapterMenuCompact` recevaient `lessonMd` — la leçon entière — pour n'en
tirer qu'une liste de titres : deux frontières, deux copies, 2 × 49 026 o sur
`suites-numeriques` (§11.175).

**Sa première sonde était AVEUGLE, et elle a annoncé 0 sur 62 — lire §11.176
avant de faire confiance à une porte neuve.** Elle cherchait un titre tel
qu'il est ÉCRIT ; le produit sérialise le titre après typographie française
(`Accroche\u202f:`), et sous forme échappée. Une espace d'écart, et la porte
certifiait le contraire de la vérité.

La sonde qui tient cherche les **marqueurs de ligne** (`[[exercise:…]]`,
`[[checkpoint:…]]`, `[[figure:…]]`, `[[motion:…]]`, `[[derivation:…]]`) : de la
syntaxe de SOURCE pure, que le découpeur consomme, qui n'atteint jamais le
DOM, qu'aucun `node` hast ne porte et qu'aucune règle typographique ne touche.
Les trouver, c'est avoir trouvé une copie du `lesson.md` — et rien d'autre.

- **vert** : 62 leçons, 0 marqueur ;
- **rouge** : le document d'avant le correctif porte exactement le DOUBLE des
  marqueurs de sa source (30 pour 15) — 2,0 copies, une par frontière client ;
- `--essai-rouge` intégré : muet sur un document où le marqueur a été consommé,
  criant sur un document qui recopie la source.

**Exemption écrite à côté du motif :** les commentaires XML des figures. Deux
leçons criaient pour un `[[motion:…]]` cité dans l'en-tête d'un SVG inliné, qui
raconte l'histoire de la figure — invisible, jamais rendu, légitime.
`typo-francaise` porte déjà la même exemption.

Pas d'entrée au manifeste des essais rouges, et la raison est écrite en
§11.175 : la sabotage naturelle est un `.tsx`, la porte lit du HTML servi, et
sans reconstruction la sabotage n'atteindrait jamais la porte (ADR 0038, 3ᵉ loi).

**Elle n'était pas armable, et personne ne pouvait le voir (corrigé le
2026-09-22).** Son premier jet prenait `http://localhost:3111` par défaut et
*supposait* qu'un serveur y écoutait déjà — vrai sur la machine où elle a été
écrite, faux en CI, où son étape ne démarre rien. `fetch` aurait rejeté et la
porte serait tombée sur une erreur de CONNEXION : un rouge d'infrastructure
déguisé en verdict produit. Le défaut est resté invisible parce qu'**aucun
runner n'a tourné depuis le 2026-09-11** : une porte armée qui n'a jamais été
lancée n'est pas une porte vérifiée. Elle lève désormais son propre
`next start`, comme `preferences-secours`, et a tourné pour de bon —
62 leçons, 0 marqueur.

---

## `web/scripts/header-manifestes.mjs` — le header offre-t-il ce qu'il MONTRE ?

**PORTE, armée en CI (58ᵉ étape).** Le header porte deux commandes alimentées
par des manifestes calculés **côté serveur** et passés en props : le panneau
« Notions » et la palette ⌘K (notions + épreuves). Quand une page oublie de
les passer, rien ne casse et **rien ne le dit** — `PanneauNotions` renvoie
`null` pour chaque matière dont la liste est vide, donc le bouton ouvre un
panneau de 720 px sur du vide, et la palette s'ouvre sur une liste sans
notions. Une commande offerte qui ne mène nulle part.

C'était le cas de deux pages, et aucune porte ne le voyait :

- **/connexion** — ni notions ni épreuves. La page était un composant CLIENT
  (elle lit `useAuth()`), donc elle ne *pouvait pas* appeler des manifestes
  qui lisent le corpus sur disque. L'en-tête de `palette-epreuves.ts` nommait
  déjà la contrainte ; personne n'avait mesuré ce qu'elle coûtait à l'écran.
  Corrigé en séparant la coquille SERVEUR (`page.tsx`) du formulaire CLIENT
  (`FormulaireConnexion.tsx`) — le découpage que l'en-tête du fichier appelait
  lui-même « a follow-up pass ». Bonus du même geste : la page peut enfin
  exporter une `metadata`, interdite à côté de `"use client"`.
- **/atelier** — notions mais pas d'épreuves : « 2025 » et « rattrapage » ne
  trouvaient rien, exactement le défaut que §11.34 avait corrigé partout
  ailleurs. Cette page monte `SiteHeader` elle-même au lieu de passer par
  `PageShell`, et la seconde prop n'a jamais suivi.

**Ce qu'elle mesure, et comment.** Elle **énumère** les types de page depuis
`src/app/**/page.tsx` — elle ne lit pas une liste écrite à la main. Un type de
page NEUF sans URL concrète dans sa table la fait ROUGIR au lieu d'être sauté
en silence : c'est la direction qui l'empêche d'être contournée en ajoutant
une route. Puis, sur chaque URL, elle fait **ce que ferait l'élève** — ⌘K,
puis clic sur « Notions » — et compte ce qui s'affiche. Pas de lecture de
source, pas d'inspection de props.

- **vert** : 10 types de page sur 10 (les 9 `page.tsx` + le 404), chacun à
  62 notions, 4 matières, 39 épreuves, 3 raccourcis, 4 colonnes ;
- **rouge, mesuré pour de vrai** : les deux défauts historiques remis dans la
  source, **reconstruction comprise** — `/connexion` tombe à 0/0/0 et
  `/atelier` à 0 épreuve, les huit autres restent verts, exit 1. Le rouge
  nomme donc les deux pages fautives et elles seules ;
- `--essai-rouge` intégré, deux directions : sabotage au niveau mesuré (tout
  doit tomber à zéro — sinon l'instrument ne voit pas ce qu'il compte), et
  retrait d'une page de la table (elle doit crier).

**Un défaut de MESURE trouvé en route, et gardé écrit.** Premier jet :
`notions = total des items − épreuves`. Mais la palette porte aussi un groupe
fixe « Aller à » de trois raccourcis, présent **même quand le manifeste est
vide** : `/connexion` cassée annonçait donc « 3 notions » au lieu de 0, et
seules les colonnes épreuves et panneau la faisaient rougir. La condition la
plus directe des trois était désarmée sans que rien ne le dise. Le compteur
compte désormais **par groupe** — une unité fausse noie le signal (ADR 0039).

**Pas d'entrée au manifeste des essais rouges**, pour la raison exacte de
`source-en-double` : `essai-rouge.mjs` casse UN motif dans un fichier SOURCE,
et cette porte lit un DOM rendu — sans reconstruction, la sabotage n'atteindrait
jamais la porte (ADR 0038, 3ᵉ loi). Son rouge se rejoue par son `--essai-rouge`
intégré, qui sabote ce qui est à portée : ce que la porte croit savoir.

**Autonome.** Sans `BASE`, elle lève son propre `next start` et le tue par son
groupe de processus. Sans cela une porte n'est pas armable en CI, où rien
n'écoute d'avance — le défaut exact que `source-en-double` portait en silence
(voir la note de sa section).

---

## `web/scripts/etroit-sweep.mjs` — la porte locale qui a rattrapé ce qu'aucune autre ne voyait

**ARMÉE EN CI depuis §11.193 (2026-09-24), dans le job parallèle `telephone`**
— DECISIONS §16 était suspendue à son coût (un job unique de 50 min) ; le dépôt
public et un job parallèle ont retiré ce coût, seule objection écrite. Elle
mesure 108 pages × 320/360/390 px, chapitres dépliés et les 39 épreuves
ouvertes, sur un fait binaire du document : `scrollWidth > innerWidth`.
Référence inscrite : **0 débord**. Mesurée le 2026-09-24 : **0 débord, 6 min
02 s** en local. **Son essai rouge** (`--essai-rouge`, neuf) pose un bloc de
2 000 px dans trois leçons et l'accueil AVANT la mesure, à 320 px : **4
débords sur 4**, la porte sait rougir — un défaut posé dans le DOM, qui atteint
la mesure elle-même (ADR 0038), pas une attente retournée. **Premier passage
en CI (run 749) : VERT, 0 débord sur 108 × 3 en 3 min 55 s — plus vite que le
conteneur local —, essai rouge 4/4 ; job entier, build compris, 7 min 48 s.**

**Le 2026-09-22 elle a fait seule le travail de toute la batterie.** Un
correctif d'ergonomie clavier — retirer `.prose-lesson p { overflow-x: auto }`,
qui coûte 99 arrêts de tabulation fantômes sur un corrigé (§11.39) — avait été
« prouvé » sûr par quatre mesures convergentes sur 7 970 puis 7 730
paragraphes. `etroit-sweep` l'a fait passer de **0 à 185 débords**, et le
contrôle sur l'arbre revenu en arrière a rendu **0 sur 108 × 3**. La règle
n'est pas inerte : elle contient le MathML caché de KaTeX (`mrow`, `mo`,
3 px hors cadre). Correctif annulé, histoire complète en §11.181.

**Ce qu'aucune autre porte ne voyait :** `dom-truth` mesure le débord à 1 536
et 1 920 px, `zoom-sweep` mesure texte doublé, le build ne mesure rien de
géométrique. La condition gardée ici — **téléphone × texte normal** — est
celle dans laquelle l'élève visé lit, et elle n'était gardée que par un
instrument que personne ne lance automatiquement.

**Piège pour qui voudrait la doubler d'une sonde maison :** forcer
`details.open = true` sur tout le document FABRIQUE un état que le produit ne
montre jamais. Une sonde qui faisait cela a rendu des débords de +298 à
+368 px sur 5 à 7 leçons, stables avec et sans la règle — un chiffre
rassurant qui ne correspondait à rien, là où `etroit-sweep` en trouve zéro sur
le même arbre.

---

## `web/scripts/verdict-qcm.mjs` — l'élève qui répond JUSTE est-il dit juste ?

**PORTE, armée en CI sur le corpus ENTIER — job `qcm`, parallèle (§11.193,
DÉCISIONS §17) ; essai rouge sur six leçons, même build.** Avant : six leçons
seulement, dans le job `gates` (59ᵉ étape), le corpus à la main.
Elle lève la note que `dom-truth` portait depuis longtemps sans que personne
l'atteigne :

> `TODO(post-answer states): the solution <summary> and correctness rows only`
> `exist after answering an item — battery v2 should drive one interaction.`

Personne ne vérifiait l'état **après réponse**. C'est le pire défaut possible
pour ce produit : un élève à qui l'on dit « faux » alors qu'il a juste
n'apprend pas — il perd confiance dans le seul juge qu'il a.

**Comment elle mesure, sans jamais comparer du texte rendu.** Les choix sont
mélangés par `lib/shuffle.ts` (graine = `item.id`). L'instrument rejoue le
MÊME mélange — la copie conforme d'`item-stats.mjs`, celle que `dom-truth`
croise déjà — pour savoir à quelle **position** la bonne réponse atterrit. Il
clique cette position et exige « Bonne réponse. » ; il clique un distracteur
et exige « Réponse incorrecte ». Comparer du texte rendu à du texte source
serait répondre à une autre question : typographie française et KaTeX
réécrivent la chaîne avant de l'écrire (ADR 0039).

- **vert** : 1 481 réponses sur les 62 leçons — chaque bonne réponse dite
  bonne, chaque distracteur dit faux, et **toutes** montrent une explication
  dépliable ;
- **portée VÉRIFIÉE, dans les deux sens** : 1 612 items, 1 481 répondus,
  131 hors de la banque de fin — et **131/131** sont là parce qu'un point
  d'arrêt les surface en ligne (`item_source: clone_of_<id>`), donc aucun
  contenu mort. La porte exige les deux sens : tout absent est un clone, tout
  clone est absent. (Première rédaction : « 131 jamais rendus » — faux, j'avais
  cherché les clones dans `items.yaml` au lieu de `checkpoints.yaml`.) ;
- `--essai-rouge` JOUÉ, pas décrit : il décale de **−1** la position attendue,
  ce qui fait tomber la cible « juste » sur un distracteur ET la cible
  « distracteur » sur la vraie bonne réponse — les DEUX sens crient (4/4 sur
  l'essai). Un décalage de +1 n'aurait éprouvé qu'une moitié de la porte.

**ELLE COUVRE LES DEUX SURFACES DEPUIS §11.185.** Les items de la banque de fin
ET les **points d'arrêt** — les sondes formatives dans le fil de la leçon, ce
que l'élève rencontre EN PREMIER. Ceux-ci n'étaient adressables par aucun
instrument : `McqItem` portait `data-item-id`, `CheckpointItem` ne portait rien,
alors qu'ils partagent le mélange et la ligne de verdict. `data-checkpoint-id`
a été ajouté. Exception écrite : un point d'arrêt n'a jamais de `solution`, donc
pas de repli `<details>` — il révèle le feedback de la ligne correcte
(`revealCorrectFeedback`) ; on exige le verdict, pas le dépliant.
Corpus : **1 481 réponses d'item + 362 de point d'arrêt**, toutes justes ;
essai rouge **72/72** sur les deux surfaces.

Remesuré le 2026-09-24, avec le barreau neuf de calcul intégral (§11.193),
avant d'armer le corpus entier en CI : **1 497 réponses d'item + 364 de point
d'arrêt** sur 62 leçons, VERT ; 1 629 items, 132 hors banque de fin, 132/132
surfacés en point d'arrêt ; **15 min 04 s** en local. Essai rouge sur les six
leçons du job : **177/177** contradictions signalées, 1 min 31 s. **Premier
passage dans le job `qcm` (run 749) : VERT, les mêmes 1 497 + 364 réponses, en
14 min 39 s sur le runner ; essai rouge 177/177 ; job entier 19 min 54 s.**

**Pas d'entrée au manifeste des essais rouges**, même raison : la sabotage
naturelle serait un `.tsx` ou un `.yaml`, et la porte mesure un DOM rendu après
build. Son `--essai-rouge` intégré décale l'attente de −1 et exige que les deux
surfaces crient dans les deux sens — 72/72 sur l'essai.

**DEUX DÉFAUTS DE SONDE trouvés en l'écrivant, tous deux du même genre.**

1. *Le premier `role="status"` n'était pas le verdict.* `ChoiceButton` en pose
   un par choix, EN PLUS de la ligne de verdict : `querySelector` rendait un
   conteneur vide et l'item passait pour muet. Elle lit maintenant **tous** les
   `role="status"` de l'item.
2. *La clé `id` seule est ambiguë.* Neuf ids sont partagés par deux notions
   (`LIB-1..9`, philo/la-liberte et svt/liberation-energie-…, §11.178). Keyée
   sur l'id nu, la carte gardait l'item SVT et mesurait la leçon de philo
   contre la mauvaise attente : **quatre fausses contradictions sur un produit
   correct**. La clé est désormais `notion::id`. §11.178 disait de cette
   collision « latente aujourd'hui, piège demain » — c'est le premier
   instrument qui a essayé d'identifier un item par son id, et il est tombé
   dedans le jour même.

## `web/scripts/scene-orbite.mjs` — la scène 3D de l'orbite dit-elle VRAI ?

**PORTE, armée en CI (vert puis rouge), §11.187, ADR 0041.** La première scène
3D de première partie (pc/chute-mouvements-plans, R10) est un `<canvas>` : ni
texte ni DOM à lire. Aucune des portes existantes ne pouvait voir ce qu'elle
dessine — une scène qui montrerait un satellite géostationnaire en train de
dériver passerait toutes les autres au vert.

**Ce qu'elle mesure, au navigateur (WebGL par SwiftShader, sans carte
graphique), sur le rendu réel d'un `next start` :**

- **rien avant le clic** — `window.__THREE__` indéfini tant que la scène est
  fermée, `186` après. Le manifeste de build ne peut pas le dire : un import
  paresseux y est invisible (ADR 0039) ;
- **les nombres** — pour six rayons (7 000 à 60 000 km), période, altitude,
  vitesse et T²/r³ affichés, recalculés par une SECONDE implémentation de la 3e
  loi aux constantes de la leçon (et non en important `kepler.ts`, qui se
  donnerait raison) ; « T = 24 h » n'est cochée qu'à **42 230 km**, jamais à
  ±10 km ;
- **les pixels, dans les deux sens** — géostationnaire vu du sol : **0,003 %**
  et **0,004 %** de pixels changés entre 0 h, 6 h et 18 h (immobile) ; à
  26 000 km : **0,59 %**, tache d'accent déplacée de **350 px** en 6 h ; au bon
  rayon mais dans le référentiel géocentrique : **0,76 %**, **326 px** — le même
  satellite bouge (CH-KEP-2) ;
- **les paris** — rien ne s'ouvre avant l'engagement (ni temps ni contrôle) ;
  un pari FAUX n'est dit « Réponse incorrecte » qu'une fois la scène avancée à
  6 h ; un pari juste est dit « Bonne réponse. » à 24 h (le 8 complet) ; à
  l'étape 4 les vitesses sont absentes avant le pari, affichées tout de suite
  après ;
- **les étapes** — chacune pose l'état annoncé, n'ouvre que son contrôle une
  fois le pari révélé, et le verdict suit (plan incliné → non ; sens contraire
  → non ; référentiel → v_sol = 0) ;
- **CH-KEP-1** — à l'étape libre, T²/r³ affiché identique sur six rayons, T/r
  distinct sur quatre rayons éloignés ;
- **sans WebGL** — un second navigateur, WebGL coupé : état « sans-webgl »,
  message visible, et la période lue reste juste ;
- le temps ne coule que lancé et tient à la pause ; une course lancée à
  23,5 h s'arrête SEULE à 24 h ; trois flèches → +30 km ;
  le fond du canvas égale `--figure-surface` en clair ET en sombre ; aucune
  erreur console.

Mesuré le 2026-09-23, après révision par les critiques : **37 mesures,
10 familles, VERT** ; `--essai-rouge` (G faussé de 3 %, identiques ↔
différentes, three.js exigé avant le clic, contrôles d'une autre étape,
verdicts de pari inversés, scène exigée sans WebGL) : **6/6 familles
crient**. Quatre verdicts : si WebGL manque au banc, sortie **MUET** (code 3),
jamais verte.

**Pas d'entrée au manifeste des essais rouges**, même raison que
`header-manifestes` et `verdict-qcm` : la sabotage naturelle serait un `.ts`,
et la porte mesure un rendu APRÈS build. Son `--essai-rouge` intégré sabote ce
qui est à sa portée — ce qu'elle croit savoir.

**QUATRE DÉFAUTS DE SONDE, tous à moi** (les deux derniers au passage
d'après révision : T/r jugé sur des rayons à 10 km d'écart, que trois chiffres
significatifs ne séparent pas ; le test clavier parti du maximum du curseur).
Les deux premiers :
1. *Le fond lu au pixel (3, 3)* tombait dans l'arrondi du conteneur
   (`overflow: hidden`) et lisait le fond de la PAGE (245,245,242) au lieu du
   canvas : la sonde mesurait autre chose que ce qu'elle nommait. Elle lit la
   couleur DOMINANTE du canvas.
2. *Un délai fixe de 1,2 s* pour « le temps a avancé » mesurait la lenteur du
   banc : sous rendu logiciel, une image prend ~130 ms. Elle attend que le
   temps AVANCE, sans supposer une horloge.

**NE DIT RIEN DE :** si les étapes ENSEIGNENT (c'est le travail des critiques
pédagogiques et de l'élève) ; la fluidité sur un vrai téléphone (le banc rend en
logiciel, ~7,5 images/s) ; le glisser au doigt (les vues prédéfinies et le
clavier sont gardés, pas le geste) ; l'impression (le panneau est `print:hidden`
— c'est la porte impression qui lit le papier).

    node scripts/scene-orbite.mjs --porte        (lève son propre next start)
    node scripts/scene-orbite.mjs --essai-rouge

**AJOUT DU 2026-09-23 (§11.190) — une famille de plus, `avant-pari`.** La
fiche des trois conditions — ses coches et son verdict — EST la réponse des
paris 1 à 3 : la porte exige qu'elle soit absente avant le pari, absente
pendant que le temps tourne vers la révélation (étape 2 : encore absente à
12 h pour une révélation à 24 h), présente après. Les étapes 2 et 3
affichaient « ✗ … pas géostationnaire » à côté de la question « reste-t-il
au-dessus de P ? ». **44 mesures, 11 familles ; essai rouge 7/7.**

## `web/scripts/scene-sphere.mjs` — la scène « sphère, plan, droite » dit-elle VRAI ?

**PORTE, armée en CI (vert puis rouge), §11.189, ADR 0041.** La deuxième scène
3D de première partie (maths/geometrie-espace, R9), bâtie sur les mêmes pièces
communes que l'orbite (`components/notion/scene/`). Même principe que
`scene-orbite` : le rendu RÉEL, au navigateur, WebGL par SwiftShader.

**Ce qu'elle mesure :**

- **rien avant le clic** — `window.__THREE__` indéfini tant que la scène est
  fermée ;
- **les nombres**, par une SECONDE implémentation (pas d'import de
  `sphere.ts`) — neuf réglages (z, R) : d, r = √(R² − d²), le cas et la case
  cochée des « trois cas » ; l'exemple travaillé de la leçon (z = 0, R = 3)
  affiché tel quel, « √5 ≈ 2,24 » ; la tangence EXACTE sur la grille de 0,1
  (z = 5 : tangent ; 5,1 : vide ; 4,9 : sécant ; R = 1,9 / 2 / 2,1 pour z = 0) ;
- **les pixels d'accent, dans les deux sens** — sécant **1 069 px**, tangent
  **52 px**, vide **0 px** ; vu de dessus, largeur du cercle **249 > 169 >
  79 px** pour d = 0 ; 2 ; 2,8 (≈ proportionnelle à r = 3 ; √5 ; 1,08) ; à la
  même distance, droite **102 px** (deux points) contre plan **1 069 px**
  (un cercle) ;
- **les paris** — rien ne s'ouvre avant l'engagement ; le pari FAUX de la
  misconception de la leçon (√(R² + d²)) est dit « Réponse incorrecte », le
  juste « Bonne réponse. » (pas de temps ici : au choix) ;
- **les étapes** — chacune pose son état et n'ouvre que son contrôle ;
- **aucun LaTeX brut dans le panneau OUVERT** — la porte LaTeX nu ne lit que
  la scène fermée ;
- clavier (deux flèches → z + 0,2), fond = `--figure-surface` en clair ET en
  sombre, état honnête sans WebGL (le rayon lu reste √5 à z = 0), aucune
  erreur console.

Mesuré le 2026-09-23 : **30 mesures, 10 familles, VERT** ; `--essai-rouge` —
dont r recalculé avec **R² + d²**, la misconception même de la leçon :
**7/7 familles crient**.

**LE PREMIER PASSAGE ÉTAIT ROUGE, ET À RAISON — un défaut PRODUIT.** 71 pixels
d'accent seulement pour un cercle bien visible, zéro vu de dessus : la sphère
et le plan, translucides, étaient dessinés APRÈS le cercle et se fondaient
par-dessus lui. L'accent — l'intersection, la seule idée de la scène — était
voilé par ce qu'il intersecte. Corrigé par l'ordre de dessin (marques en
dernier, couleur pure), mesuré de nouveau : 1 069 px.

**NE DIT RIEN DE :** si les étapes enseignent ; la fluidité sur un vrai
téléphone ; le glisser au doigt ; l'impression (panneau `print:hidden`).

    node scripts/scene-sphere.mjs --porte        (lève son propre next start)
    node scripts/scene-sphere.mjs --essai-rouge

**AJOUT DU 2026-09-23 (§11.190) — une famille de plus, `avant-pari`.** Avant
le pari, RIEN ne répond : zéro pixel d'accent (l'intersection n'est pas
dessinée), aucune fiche des trois cas, une description qui décrit l'énoncé
sans l'issue ; le pari posé, les trois apparaissent. Trouvé en relisant la
scène, pas par la porte : l'étape 2 montrait ses deux points et cochait
« deux points » à côté de la question. **34 mesures, 11 familles ; essai
rouge 8/8.**

## `web/scripts/scene-lorentz.mjs` — la particule dans le champ magnétique dit-elle VRAI ?

**PORTE, armée en CI (vert puis rouge), §11.190, ADR 0041.** La troisième
scène 3D de première partie (pc/chute-mouvements-plans, R6), sur les mêmes
pièces communes. Même principe : le rendu RÉEL, WebGL par SwiftShader — et
une chose de plus : la porte LANCE la particule et attend la course en temps
réel (3 ns de vol par seconde). C'est le produit qui avance, pas un curseur
qu'on pousse.

**Ce qu'elle mesure :**

- **rien avant le clic** — `window.__THREE__` indéfini tant que la scène est
  fermée ;
- **les nombres**, par une SECONDE implémentation aux constantes de la leçon
  (|q| = 1,6 × 10⁻¹⁹ C, m = 9,1 × 10⁻³¹ kg) : R et F sur cinq couples (B, v₀) ;
  la déviation sin θ = ℓ / R au couloir sur quatre, dont un demi-tour ;
  l'exemple travaillé tel quel (**R ≈ 5,7 cm, θ ≈ 21°**) ; à 3,0 mT, R < ℓ :
  « demi-tour », pas un angle ;
- **les pixels, le cœur** — le CÔTÉ où la trajectoire s'infléchit, lu sur
  l'image pour les QUATRE couples charge × sens du champ : la tache d'accent
  d'un tour complet se décale du point d'entrée vers le côté de F = q v ∧ B
  (électron ⊗ : **90 px vers le bas** ; positon ⊗ : **91 px vers le haut** ;
  positon ⊙ : **54 px vers le bas** ; électron ⊙ : **55 px vers le haut**) ; et
  le cercle DESSINÉ à 3,0 mT fait **100 px** contre **196 px** à 1,5 mT —
  rapport **0,51**. (Chiffres de la nuit du 2026-09-23, glyphes agrandis
  (§11.192) : leurs anneaux recouvrent un peu plus de trajectoire, ±1 px. Au
  soir, après la marge laissée à la légende au téléphone, qui a réduit
  l'échelle d'environ 7 % : 91 / 92 px ; ±98 / ±58 px et 109 / 212 px avant.
  Le rapport, lui, n'a pas bougé — c'est lui qui est mesuré, pas l'échelle.) ;
- **le glyphe** (§11.192) — vu comme la figure du manuel, le champ ENTRANT se
  lit ⊗ (une croix dans l'anneau) et le SORTANT ⊙ (un point), lus À L'ÉCHELLE
  DE L'ÉCRAN : le produit pose deux repères invisibles (le centre d'un glyphe
  et le bord de son anneau), la sonde mesure en fractions du rayon R —
  l'anneau (24 angles), les bras sur les diagonales entre 0,45 R et 0,65 R, le
  plein du disque central ρ ≤ 0,2 R. À 1280/×1 : ⊗ = bras **95 %**, plein
  **0 %** ; ⊙ = bras **0 %**, plein **100 %** (seuils 75/50 et 35/80 %).
  Deux défauts du PRODUIT la font rougir, elle seule (§11.192) : la tête de
  flèche avec un fond (⊗ lu « ni ⊗ ni ⊙ », plein 100 %), et le glyphe dessiné
  pour le champ opposé (le sortant se lit ⊗) ;
- **la vitesse**, lue PENDANT la course à 10, 35, 60 et 85 % du tour : la même
  à chaque fois, l'angle entre F et v à **90°**, F constante ;
- **les paris** — rien ne s'ouvre avant l'engagement ; le verdict attend la
  fraction de course annoncée (muet à un huitième de tour, dit au quart) ;
- **avant le pari, rien ne répond** — ni fiche, ni étiquette de F (la flèche
  est cachée avec elle), ni issue dans la description ;
- **les étapes** — chacune pose son état (lu dans le descripteur, pas recopié)
  et n'ouvre que son contrôle ; aucun LaTeX brut dans le panneau ouvert ;
- clavier (deux flèches → B + 0,2 mT), fond = `--figure-surface` en clair ET
  en sombre, état honnête sans WebGL (la course révèle quand même le pari),
  aucune erreur console.

Mesuré le 2026-09-23 : **45 mesures, 12 familles, VERT** au premier passage,
et de nouveau au second (un instrument neuf se lance plusieurs fois avant
d'être cru, ADR 0036) ; `--essai-rouge` — dont la misconception même de la
leçon, un rayon qui CROÎTRAIT avec B, et le côté pris sur v ∧ B sans le signe
de q : **9/9 familles crient**. Avec la famille `glyphe` (§11.192) : **46
mesures, 13 familles, VERT deux fois ; 10/10 familles crient**. Durée mesurée
en local : **9 min 20 s par passage** (elle attend ses courses en temps réel).

**NE DIT RIEN DE :** si les étapes enseignent ; la fluidité sur un vrai
téléphone ; le glisser au doigt ; l'impression (panneau `print:hidden`) ; la
vue de biais (seule la vue du manuel est mesurée en pixels).

    node scripts/scene-lorentz.mjs --porte        (lève son propre next start)
    node scripts/scene-lorentz.mjs --essai-rouge

## `web/scripts/scene-vectoriel.mjs` — la scène du produit vectoriel dit-elle VRAI ?

**PORTE, armée en CI (vert puis rouge), §11.191, ADR 0041.** La quatrième
scène 3D de première partie (maths/geometrie-espace, R3), sur les pièces
communes. Le rendu RÉEL, WebGL par SwiftShader.

**Ce qu'elle mesure :**

- **rien avant le clic** ;
- **les nombres**, par une SECONDE implémentation — la formule de la leçon,
  composante par composante — sur sept réglages (θ, ‖v‖, φ, ordre) : les
  coordonnées de u ∧ v, sa norme, l'aire du parallélogramme, et les deux
  produits scalaires u·(u ∧ v) et v·(u ∧ v), lus **0** à chaque fois ; le
  plan incliné de 50° compris (**≈ (0 ; −3,06 ; 2,57)**) ; l'exemple
  travaillé tel quel, **AB ∧ AC = (0 ; 0 ; 4)**, aire(ABC) = 2 ; à 150°, la
  norme 2 et le triangle 1 ;
- **les pixels** — la flèche du produit, seule chose en accent pur : vue de
  côté, **237 px à 90°, 115 px à 30°** (rapport 0,49 — sin 30° = ½), **0 px
  à 0°** ; u ∧ v centré **au-dessus** de v ∧ u (238 contre 313 px) ;
- **les paris** et **avant le pari, rien ne répond** — zéro pixel d'accent,
  aucune fiche, une description sans l'issue, aux cinq étapes ; puis la
  flèche (368 px) et la fiche ;
- **les étapes**, aucun LaTeX brut dans le panneau ouvert, clavier (deux
  flèches → θ + 10°), fond en clair ET en sombre, état honnête sans WebGL
  (AB ∧ AC lu reste (0 ; 0 ; 4)), aucune erreur console.

Mesuré le 2026-09-23 : **38 mesures, 11 familles, VERT** ; `--essai-rouge`
— l'ordre des facteurs ignoré (v ∧ u pris pour u ∧ v) : **8/8 familles
crient**.

**LE PREMIER PASSAGE ÉTAIT ROUGE, ET C'ÉTAIT LA SONDE.** Deux manquements,
deux affichages justes : « (0 ; 0 ; 4) » cherché avec des espaces simples,
affiché avec les espaces fines insécables de la typographie française. La
porte lit désormais le nombre, espaces normalisées — la typographie a sa
propre porte. Un rouge au premier passage est AMBIGU (ADR 0034) : ici, le
test avait tort, pas le produit.

**NE DIT RIEN DE :** si les étapes enseignent ; la vue de biais et la vue de
dessus (seule la vue de côté est mesurée en pixels) ; un vrai téléphone.

    node scripts/scene-vectoriel.mjs --porte        (lève son propre next start)
    node scripts/scene-vectoriel.mjs --essai-rouge

## `web/scripts/scene-revolution.mjs` — la scène du solide de révolution dit-elle VRAI ?

**PORTE, armée en CI (job `scenes`, vert puis rouge), §11.193, ADR 0041.** La
cinquième scène 3D de première partie (maths/calcul-integral, R9 — le volume
de révolution, savoir-faire des deux filières absent du corpus jusque-là), sur
les pièces communes. Le rendu RÉEL, WebGL par SwiftShader.

**Ce qu'elle mesure :**

- **rien avant le clic** — `window.__THREE__` indéfini tant que la scène est
  fermée ;
- **les nombres**, par une SECONDE voie — Simpson sur f², jamais la primitive
  du produit : V = **8π** (√x sur [0 ; 4]), **4π** (le cône), **π** (√(ln x)
  sur [1 ; e]) ; le volume balayé à 180° (la moitié) ; le rayon et l'aire de la
  coupe à x = 0,5 / 1 / 2,25 / 3 / 4 ; πr²h/3 du cône ; 1 u.v. = k³ cm³ pour
  k = 1, 2, 3 ; l'aire de la région, 16/3 ;
- **les pixels, dans les deux sens** — vue LE LONG DE L'AXE, la coupe est un
  cercle (largeur = hauteur à 3 px près) et un DISQUE PLEIN (ses pixels teintés
  remplissent π R² : **100 à 102 %**), du rayon que le produit dit à la même
  profondeur (deux repères invisibles, le centre et le haut du bord : 75,0 px
  contre 74,5 ; 186,5 contre 185,6) ; vue de BIAIS, la même coupe est une
  ellipse (130 × 273 px). Le balayage fait grandir le dessin (0°, 90°, 180°,
  360°). Vue de côté, quatre tranches ont les hauteurs de f en leur milieu :
  rapports **0,38 / 0,65 / 0,85 / 1,00** pour 0,38 / 0,65 / 0,85 / 1,00
  attendus. (« f double, l'aire quadruple » se juge sur les NOMBRES : deux
  coupes ne sont pas à la même distance de l'œil, la perspective grossit la
  plus proche.) ;
- **la frontière SExp** (spec §3.2, B1) — les tranches s'affichent, elles ne
  s'additionnent jamais : aucun « Σ / somme / total » dans le panneau pour
  n = 1, 12, 40, et le volume lu identique pour les trois ;
- **les paris, les étapes, avant le pari rien ne répond** (ni fiche, ni
  lectures, ni pixel d'accent pur ou teinté, ni cube, ni issue dans la
  description) ; aucun LaTeX brut ; clavier (deux flèches → unité 1 → 3 cm) ;
  fond clair ET sombre ; état honnête sans WebGL ; aucune erreur console.

Mesuré le 2026-09-24 : **48 mesures, 12 familles, VERT** ; `--essai-rouge` —
dont la misconception même de la leçon, le rayon non élevé au carré
(V = π ∫ f) : **9/9 familles crient**.

**ET LE PRODUIT, SABOTÉ (ADR 0038).** Retourner les attentes prouve que la porte
SAIT rougir, pas qu'elle voit un défaut réel. Deux défauts posés dans le code du
produit, rebâtis, passés à la porte entière, retirés — les deux formes de la
misconception que la scène doit casser :
- la coupe dessinée en ANNEAU (`solide-revolution.ts`, rayon intérieur 0,8 f) :
  **ROUGE, 2/48, famille `pixels` seule** — rempli à 41 % et 38 % de π R², pour
  un cercle toujours rond et du bon rayon ;
- le volume sans le carré, π ∫ f (`revolution.ts`) : **ROUGE, 8/48, familles
  `nombres` (7) et `frontiere` (1) seules** — 16,76 lu pour 8π ≈ 25,13 ; la
  frontière compare le volume lu au VRAI, d'où son rouge.

**LE PREMIER PASSAGE ÉTAIT ROUGE — SIX FOIS, ET C'ÉTAIT LA SONDE.** Elle jugeait
« teinté d'accent » un pixel dont l'écart au fond allait vers l'accent ; sur
fond clair, n'importe quel gris plus sombre s'y projette (l'accent est sombre) :
le solide gris de l'énoncé comptait 78 366 px « teintés » avant le pari. La
teinte se lit maintenant dans la CHROMINANCE (la couleur moins son gris). Et le
premier essai rouge rendait 8/9 : la famille `frontiere` retournait son
attente ET le volume attendu — deux retournements qui s'annulaient.

**NE DIT RIEN DE :** si les étapes enseignent ; un vrai téléphone ; le glisser
au doigt ; l'impression (panneau `print:hidden`) ; les fonctions `cone` et
`log` en pixels (seule `racine` est mesurée à l'image).

    node scripts/scene-revolution.mjs --porte        (lève son propre next start)
    node scripts/scene-revolution.mjs --essai-rouge
