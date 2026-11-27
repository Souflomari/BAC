# 02 — Comprendre en profondeur

**Objet :** ce qui fait qu'un élève *comprend* (et reste dans le flow) — les meilleures sources de compréhension profonde, ce que dit la recherche sur l'apprentissage, un **format de notion v3** concret pour nos leçons, et une **banque d'accroches historiques vérifiées** pour le programme de 2ème Bac (SM / PC / SVT).
**Statut :** rapport de recherche (2026-10-21). Aucune décision prise ici : ce document propose ; le propriétaire tranche (VISION → RULES → agents).
**Déclencheur :** le test de l'élève-propriétaire : leçons trop denses comme pages, pas assez pédagogiques, pas assez visuelles ; visuels pas-à-pas trop rapides (3 à 5 étapes) ; trop de technique (« trop de maths simples ») et pas assez d'idées ; envie de profondeur, de flow et de petites touches d'histoire « à la Paramath ».
**Méthode :** lecture de trois leçons du dépôt + mesures (commandes en annexe A) ; recherche web (sites, articles, méta-analyses — URL à chaque affirmation) ; vérification des faits historiques sur source (Wikipédia en/fr lue, MacTutor, articles) — les faits non confirmés sont **marqués comme tels**.

---

## 0. Résumé (ce qu'il faut changer, et pourquoi)

1. **Le défaut central n'est pas la longueur, c'est l'ordre.** Nos leçons suivent l'ordre *logique* (définition → propriété → démonstration → exemple). La compréhension suit l'ordre *pédagogique* (problème → intuition → nom → preuve → technique). 3Blue1Brown le dit en une phrase (« the best pedagogical order of ideas is often very different from the correct logical order ») et ParaMaths en fait son programme : « d'où vient une idée, pourquoi elle marche, ce qu'elle a changé ».
2. **Mesuré dans le dépôt :** 50 leçons, en moyenne ≈ 6 200 mots (LaTeX compris) et ≈ 6 points d'arrêt par leçon. Cela fait un geste de l'élève tous les ≈ 1 000 mots. La leçon logarithme compte 72 équations en bloc pour 3 figures.
3. **Les visuels sont « trop rapides » par manque d'étapes, pas par minutage.** Le lecteur avance déjà au rythme de l'élève. Mais sur 255 figures découpées en étapes, 162 (64 %) n'en ont que 3, et 243 (95 %) en ont 5 ou moins. Chaque étape ajoute une couche entière. Chez Mayer & Chandler, une explication de 2 min 30 était coupée en **16 segments** de 8 à 10 s, lancés par l'élève (d ≈ 0,98 en transfert). **Cible proposée :** 8 à 16 étapes pour une figure-clé, un seul changement par étape, 1 à 3 paris intégrés, transitions de 1 à 2,5 s.
4. **Format v3 : chaque notion devient un arc en 7 temps.** Énigme (un vrai problème, souvent historique) → pari → construction visuelle lente (du concret au symbole) → le nom arrive *après* l'idée → le pourquoi, raconté → la technique, en exemples commentés puis estompés → retour sur l'énigme.
5. **Battements de 2 à 4 min** (≤ 250 mots et un visuel), avec un geste de l'élève toutes les 3 à 5 min. Des questions glissées dans une vidéo de cours divisent par deux la distraction (≈ 40 % → 20 %, Szpunar 2013).
6. **L'histoire porte la notion, elle ne la décore pas.** Trois emplacements, ≤ 90 s chacun, et toujours *le problème que la notion résout*. Un détail séduisant mais hors-sujet nuit à l'apprentissage (g ≈ −0,33). La banque (§5) contient **≈ 110 entrées et ≈ 150 faits sourcés** sur les 50 notions, avec une liste de « légendes à ne pas raconter comme vraies ».
7. **La technique sort du corps de la leçon.** Un exemple commenté par méthode (le raisonnement de l'expert à voix haute), le calcul replié et dépliable. Le reste va vers la pratique : exemples à compléter, puis exercices espacés et entrelacés (Renkl & Atkinson ; Rohrer : 61 % contre 38 % un mois après).
8. **Physique et SVT : affronter le mauvais modèle.** Une vidéo qui expose la bonne réponse proprement n'apprend presque rien, alors qu'une vidéo qui met en scène la conception erronée donne d ≈ 0,8 (Muller 2008). Une démonstration regardée sans prédiction préalable n'apprend rien de plus que pas de démonstration du tout (Crouch 2004).
9. **Un tuteur IA aide quand il guide pas à pas et retient la réponse** (Kestin 2025 : effet de 0,73 à 1,3 σ en physique). Il nuit quand il donne la réponse : −17 % à l'examen sans IA pour « GPT Base » (Bastani 2025).
10. **Flow de 1 à 2 h :** 3 ou 4 blocs de 20 à 25 min, une seule chose à l'écran, rappel espacé en ouverture, pratique entrelacée en clôture, pause proposée seulement à une frontière d'acte. **Exemple le plus parlant :** l'accroche des complexes (« x² = −1 n'a pas de solution, inventons-en une ») est historiquement fausse. C'est la cubique de Bombelli (1572), dont la solution *réelle* 4 passait par √−121, qui a forcé les imaginaires. C'est exactement le « pourquoi » que l'élève réclame.

---

## 1. Le diagnostic, mesuré sur trois leçons

### 1.1 Ce qui va déjà bien (à garder)

- **Le pari d'ouverture existe.** Le jalon `cp-r0-predict` est présent dans 62 notions sur 62 (ADR 0039), et les trois leçons lues demandent une prise de position avant l'explication : L(1) et L(a/b) dans le logarithme ; le vieux noyau contre le neuf dans la décroissance ; s'arrêter ou inventer dans les complexes. C'est exactement « predict-then-reveal ».
- **L'accroche de la décroissance radioactive est excellente.** Elle part du compteur Geiger irrégulier et de la tension « hasard individuel / loi collective exacte ». Elle montre que l'équipe sait écrire une énigme.
- **Le contrat de lecture calme est le bon.** Avancement au rythme de l'élève, aucune lecture automatique (`StagedFigure.tsx`, `MotionStage.tsx` : « learner-paced, never autoplay »). La recherche le confirme (§3.1). **Le problème n'est pas là.**

### 1.2 Ce qui ne va pas

| Constat | Mesure (annexe A) | Pourquoi ça bloque la compréhension |
|---|---|---|
| **Ordre logique, pas pédagogique.** R1 du logarithme : « Définition. La fonction ln est l'unique primitive de 1/t… ». L'aire sous 1/t vient *après*, comme « image concrète ». | ln : 72 équations en bloc, 14 « exemples travaillés », 3 figures | Le nom arrive avant le besoin (Desmos : *« Create a need »* ; ADEPT : l'exemple avant le nom). L'élève reçoit un décret, pas une découverte. |
| **La technique occupe l'écran.** R2 du logarithme enchaîne quatre démonstrations (inverse, quotient, puissance, racine) en lignes de calcul affichées une à une. | maths : 1 047 équations en bloc sur 14 leçons | C'est le « trop de maths simples ». Les gestes mécaniques prennent la place ; l'idée (pourquoi un produit devient une somme) tient en un paragraphe. |
| **Visuels en peu d'étapes.** `ln-aire-sous-courbe` a 4 étapes : repère → courbe → aire x > 1 → aire x < 1. Le « pourquoi » de ln(ab) = ln a + ln b n'est jamais *montré*. | 255 figures : 162 à 3 étapes, 64 à 4, 17 à 5, 10 à 2, 2 à 6 ou plus | Une étape = une couche entière. L'élève n'a pas le temps de voir *ce qui change*. Mayer découpe 2 min 30 en 16 segments. |
| **Animations brèves.** Les verbes d'animation durent 0,35 à 0,9 s (`MotionStage.tsx`, VERB_DEFAULTS). La motion `population-aleatoire` saute de t = 0 à t = t½ en un fondu de 0,6 s. | 10 motions : 3 à 3 temps, 6 à 4, 1 à 5 | L'idée-clé (le hasard, une désintégration à la fois) est *dite* en légende, pas *vue*. Principe d'appréhension : l'animation doit être assez lente pour être perçue (Tversky 2002). |
| **Gestes de l'élève espacés.** | ≈ 6 200 mots et ≈ 6,3 points d'arrêt par leçon en moyenne | Un geste tous les ≈ 1 000 mots de prose mathématique, soit souvent plus de 8 à 10 min. La recherche vise 3 à 5 min (§3.5). |
| **Histoire absente ou réduite à des noms de théorèmes.** « Newton » apparaît 69 fois (lois de Newton), « Rolle » 22, « Krebs » 16. Napier n'apparaît pas dans la leçon ln ; Becquerel une seule fois dans tout le corpus ; Curie, Libby, Bombelli, Cardan jamais. | grep sur `content/*/*/lesson.md` | Les noms sont des étiquettes, pas des histoires. Le « qui, quel problème, quel obstacle » manque. |
| **Une accroche historiquement fausse.** Complexes R0 : « il a fallu inventer i pour x² = −1 ». Historiquement, x² = −1 était simplement déclaré impossible. C'est la formule de Cardan sur x³ = 15x + 4, de solution réelle 4, qui passait par √−121 et a *forcé* Bombelli (1572) à calculer avec ces nombres. | `nombres-complexes-1/lesson.md` l. 5–31 | On rate le plus beau « pourquoi » du programme, celui que Veritasium et ParaMaths racontent. Le récit faux (« les maths inventent des nombres par caprice ») est justement celui qui rend les complexes arbitraires. |

### 1.3 Les trois leçons, en une phrase chacune

- **`fonction-logarithme`** — Bonne accroche (les tables de calcul), puis bascule en manuel. L'idée historique et visuelle qui *explique* la définition est absente : Grégoire de Saint-Vincent et de Sarasa (avant 1649) ont vu que l'aire sous l'hyperbole y = 1/x vérifie A(xy) = A(x) + A(y). La leçon pose cette aire comme décret ; elle pourrait la montrer comme découverte.
- **`decroissance-radioactive`** — Meilleure accroche du lot. Mais aucune histoire (Becquerel et ses plaques un jour nuageux, Rutherford qui invente le mot « demi-vie », Libby qui teste sa méthode sur les tombes de Djéser et Snéfrou). La simulation du hasard tient en 4 temps et saute l'essentiel.
- **`nombres-complexes-1`** — Construction propre de ℂ, mais sur un récit inexact. La géométrie (multiplier par i = tourner d'un quart de tour, l'idée qui donne tout son sens) n'arrive qu'en R5, après 500 lignes de calcul algébrique.

---

## 2. Les sources de compréhension profonde

### 2.0 Ce qu'est Paramath (vérifié)

« Paramath » est **ParaMaths**, le projet de **Nicolas Masset**, professeur de mathématiques formé à l'agrégation, indépendant en Vendée ([paramaths.fr](https://paramaths.fr/) ; article [Ludomag, 12/10/2026](https://www.ludomag.com/2026/10/12/paramaths-tout-le-programme-de-maths-de-la-6e-a-la-prepa-en-acces-libre/)). Le projet a trois volets.

1. **La chaîne de vulgarisation [@Paramaths_off](https://www.youtube.com/@Paramaths_off)** — « Les maths racontées : d'où vient une idée, pourquoi elle marche, ce qu'elle a changé. Pour ceux qui veulent comprendre avant d'appliquer. » (page d'accueil du site). C'est très probablement ce que l'élève aime. Les épisodes récents et leurs vues, relevés sur la chaîne le 2026-10-21 :
   - *On vous a appris les nombres complexes sans jamais vous dire ce qu'ils sont* — 13:18, ≈ 569 k vues en ≈ 1 mois ;
   - *Une bille qui roule suffit pour comprendre les intégrales* — 16:54, ≈ 360 k vues en 3 semaines ;
   - *Ça vient d'où, le logarithme ?* — 18:52, ≈ 159 k vues en 2 semaines ;
   - *On vous a appris les développements limités sans jamais vous dire pourquoi* — 16:18 ;
   - *Personne ne vous a expliqué la formule d'Euler* — 16:44 ;
   - plus anciens : *Des dominos suffisent pour comprendre la récurrence*, *Comment comprendre FACILEMENT les dérivées* (≈ 1 M de vues), *Pourquoi 2,718 est le meilleur nombre ?*, *Mais c'est quoi, une fonction ?*

   Au total : 85 110 abonnés sur les deux chaînes, 2,7 M de vues cumulées.
2. **Le site** — 246 chapitres de la 6e à la prépa, 714 fiches corrigées, chaque chapitre en *cours / méthodes / exercices corrigés / devoir surveillé*. Gratuit, sans compte. Le chapitre écrit reste classique : une question en tête de section, des analogies (dominos, gendarmes), des figures SVG statiques, pas d'histoire ([exemple](https://paramaths.fr/ressources/terminale-spe-maths/suites-limites-recurrence)).
3. **L'app (alpha)** ([paramaths.fr/app](https://paramaths.fr/app)) — « Face à un exercice difficile, savoir par où commencer. » La boucle :
   - l'essentiel du chapitre sur une page, avec des **figures manipulables** (bouger a, b, c sur la parabole et voir les trois écritures suivre) ;
   - une fiche par méthode (quand s'en servir, les gestes, un exemple) ;
   - les exercices sur papier, avec des indices un par un ;
   - une auto-évaluation honnête (seul / avec aide / pas réussi) ;
   - des sujets type examen qui **ne nomment pas la méthode**.

   Choix assumés : pas de chatbot, pas de points, de badges ni de séries.

**Limite de cette analyse :** YouTube a bloqué l'accès automatique aux vidéos et aux transcriptions (captcha / LOGIN_REQUIRED). Ce qui suit sur ParaMaths s'appuie sur les titres, les durées, la description de la chaîne et le site, **pas sur le visionnage**. Le propriétaire devrait noter, en regardant 2 ou 3 épisodes, les moments précis qui l'ont accroché. C'est la donnée la plus précieuse de ce chantier.

**Ce qui crée la compréhension chez ParaMaths (inféré, à confirmer au visionnage) :**

- **Le titre nomme le manque :** « on vous a appris X *sans jamais vous dire* Y ». Il promet le *pourquoi* que l'école a sauté. C'est l'information manquante de Loewenstein (§3.13), formulée pour un lycéen.
- **Un objet concret unique porte toute la notion :** la bille qui roule pour l'intégrale, les dominos pour la récurrence. C'est le concret avant l'abstrait (§3.12).
- **La genèse de l'idée** (« d'où il vient ») avant l'outil.
- **L'animation au service d'une seule idée par vidéo.**
- **Le format long (13 à 19 min) fonctionne en vidéo choisie.** Il ne se transpose pas tel quel en leçon (§2.4).
- **La séparation explicite entre comprendre (chaîne vulgarisation) et rédiger (chaîne Training).** C'est notre problème : nos leçons mélangent les deux, et la rédaction mange la compréhension.

### 2.1 Sources francophones

| Source | Ce qui crée la compréhension et l'engagement | Ce qui ne se transpose pas |
|---|---|---|
| **ParaMaths** ([chaîne](https://www.youtube.com/@Paramaths_off), [site](https://paramaths.fr/)) | Voir §2.0 : la genèse, le titre qui nomme le manque, l'objet concret, la séparation compréhension / technique. | La vidéo de 15 min sans geste de l'élève ; la voix et la personne de l'auteur. |
| **Science Étonnante** (David Louapre) ([chaîne](https://www.youtube.com/@ScienceEtonnante)) | Une question surprenante d'abord, puis une construction progressive jusqu'à l'équation, sans la fuir. L'histoire des idées sert à motiver. | La densité (des sujets de niveau licence) ; le rythme d'une seule traite. |
| **Micmaths** (Mickaël Launay) ([chaîne](https://www.youtube.com/@Micmaths)) | Manipulation physique (papier, objets), jeu et énigme. Le « grand roman des maths » raconte les idées comme une épopée humaine. | Sujets récréatifs souvent hors programme. |
| **El Jj** ([chaîne](https://www.youtube.com/@ElJj)) | Humour, problèmes concrets et absurdes qui cachent des maths sérieuses ; on cherche *avec* lui. | L'humour à haute densité, contraire au calme voulu par VISION. |
| **Science4All** (Lê Nguyên Hoang) ([chaîne](https://www.youtube.com/@Science4All)) | Les fondements (probabilités bayésiennes, infini) pris au sérieux ; l'argumentation explicite. | Le ton d'essai et la profondeur philosophique, au-delà du bac. |
| **ScienceClic** ([chaîne](https://www.youtube.com/@ScienceClic)) | Physique (relativité, mécanique) par **animations géométriques lentes**, où chaque mouvement porte l'idée. Le modèle le plus proche d'un « visuel pas-à-pas » réussi en physique. | Production 3D coûteuse ; sujets hors programme. |
| **Passe-Science** ([chaîne](https://www.youtube.com/@Passescience)) | Raisonnement physique patient, au tableau, avec les fausses pistes explorées. | Durée, absence d'interaction. |
| **DirtyBiology** (Léo Grasset) ([chaîne](https://www.youtube.com/@DirtyBiology)) | Biologie racontée par l'énigme et l'absurde (« pourquoi… ? »). | Ton, digressions séduisantes. |
| **Yvan Monka / Maths et tiques** ([chaîne](https://www.youtube.com/@YMONKA), [site](https://www.maths-et-tiques.fr/)) | Une compétence par vidéo, très courte, au tableau, explicite. Encadrés d'histoire en tête de nombreux cours écrits. Référence de la *méthode*. | C'est le « comment », pas le « pourquoi » : c'est précisément ce que l'élève trouve trop mécanique. Les encadrés d'histoire sont décoratifs (§3.13). |

### 2.2 Sources anglophones et outils interactifs

| Source | Ce qui crée la compréhension | Ce qui ne se transpose pas |
|---|---|---|
| **3Blue1Brown** (Grant Sanderson) ([chaîne](https://www.youtube.com/@3blue1brown), [à propos](https://www.3blue1brown.com/about)) | Le « pourquoi » visuel construit lentement, un objet géométrique à la fois. Ses principes publiés : *« the best pedagogical order of ideas is often very different from the correct logical order of ideas »* ; *« Every movement on the screen should be deliberate, with an identifiable purpose »* ; le concret avant le général ; ouvrir par l'exercice-clé. Pauses explicites où le spectateur doit réfléchir. | Des mois de production par vidéo (outil Manim) ; un format de 20 à 30 min passif. Ce qui se transpose, ce sont les **principes** et la **grammaire visuelle**, pas le format. |
| **Mathologer** ([chaîne](https://www.youtube.com/@Mathologer)) | Preuves visuelles « qui se voient », avec les étapes dessinées une à une ; un défi au spectateur. | Sujets olympiques ; longueur. |
| **Numberphile** ([chaîne](https://www.youtube.com/@numberphile)) | L'enthousiasme d'un mathématicien réel, papier brun et feutre ; la surprise. | Les digressions, qui sont des détails séduisants pour un élève de bac. |
| **Veritasium** (Derek Muller) ([chaîne](https://www.youtube.com/@veritasium)) | (1) Récit historique de bout en bout, par exemple [*How Imaginary Numbers Were Invented*](https://www.youtube.com/watch?v=cUzklzVXJwo) (2021, ≈ 23 min) : de del Ferro et Tartaglia à Cardan et Bombelli. (2) **Sa thèse de doctorat** : une vidéo « claire » qui expose la bonne physique n'apprend presque rien ; une vidéo qui met en scène la conception erronée en dialogue produit de forts gains (§3.10). | Production ; durée ; quelques sujets sensationnels. |
| **MinutePhysics** ([chaîne](https://www.youtube.com/@minutephysics)) | Une idée, 2 à 5 min, dessin à main levée, rien de superflu. | Trop rapide pour apprendre : c'est un *déclencheur* de curiosité, pas une leçon. |
| **Kurzgesagt** ([chaîne](https://www.youtube.com/@kurzgesagt)) | Visualisation splendide de mécanismes (par exemple le système immunitaire) ; métaphores fortes. | Le niveau de finition ; le risque que la beauté passe pour la vérité ; peu d'interaction. |
| **PBS Space Time** ([chaîne](https://www.youtube.com/@pbsspacetime)) | Le sérieux conceptuel sans équations cachées. | Niveau universitaire, rythme dense. |
| **HHMI BioInteractive** ([chaîne](https://www.youtube.com/@BioInteractive), [site](https://www.biointeractive.org/)) | Animations scientifiquement relues, « click & learn », données réelles d'expériences. Très proche des besoins de SVT (génétique, immunologie, évolution). | En anglais ; programme américain. |
| **Amoeba Sisters** ([chaîne](https://www.youtube.com/@amoebasisters)) | Biologie avec une métaphore par mécanisme, courte. | Ton enfantin pour un bachelier. |
| **Khan Academy** ([site](https://www.khanacademy.org/)) | Maîtrise par compétence ; pratique immédiate ; vidéos courtes au tableau. Khanmigo : tuteur IA socratique. | Les vidéos sont surtout procédurales. Pour Khanmigo, l'essai randomisé indépendant mesure un effet *faible* (≈ 0,06–0,08 σ sur l'année ; [NBER w35620](https://www.nber.org/papers/w35620)). Sal Khan reconnaît que la première version « did not change student learning as much as many of us hoped » ([blog Khan Academy](https://blog.khanacademy.org/?p=21314)). |
| **Brilliant** ([site](https://brilliant.org/)) | « Learn by doing » : chaque écran demande un geste (glisser, prédire, choisir) avant d'expliquer ; leçons de 5 à 15 min. | La ludification ; l'allégation « 6× plus efficace » n'est pas sourcée. |
| **BetterExplained** (Kalid Azad) ([ADEPT](https://betterexplained.com/articles/adept-method/)) | La méthode ADEPT dans cet ordre : **A**nalogy → **D**iagram → **E**xample → **P**lain-English → **T**echnical. Le technique vient **en dernier**. « Blurry to sharp » : d'abord flou et juste, puis précis. | Peu d'exercices. |
| **Explorable Explanations** (Bret Victor, [essai du 10/03/2011](https://worrydream.com/ExplorableExplanations/) ; Nicky Case, [explorabl.es](https://explorabl.es/), [ncase.me](https://ncase.me/)) | Le texte comme lieu où l'on *teste* les affirmations : documents réactifs, exemples explorables (« makes the abstract concrete, and allows the reader to develop an intuition »). Point clé : l'interactivité est **tissée dans l'explication, guidée par l'auteur**, pas un bac à sable. | Coût de fabrication de chaque pièce. |
| **Seeing Theory** (Brown, [site](https://seeing-theory.brown.edu/)) | Probabilités et statistiques par visualisations manipulables (D3), trois visualisations par chapitre. | Archivé ; peu d'exercices. |
| **Distill** ([annonce de pause, 2021](https://distill.pub/2021/distill-hiatus/)) | L'étalon de l'article explicatif interactif. **Leçon négative précieuse :** la revue s'est arrêtée parce que « the primary bottleneck is the amount of effort it takes to produce these articles » (plus de 50 h d'aide éditoriale par article). | Pour nous : il faut une **grammaire visuelle réutilisable** et des gabarits, sinon le format v3 ne passera pas à l'échelle de 50 notions. |
| **PhET** (U. Colorado ; Wieman, Adams & Perkins, [*Science* 2008](https://doi.org/10.1126/science.1161948)) | Simulations à « échafaudage implicite » : le guidage passe par ce que l'outil permet, contraint et renvoie, pas par des consignes ([Podolefsky, Moore & Perkins, arXiv 1306.6544](https://arxiv.org/abs/1306.6544)). L'élève pose ses propres questions. | Exploration libre longue ; il faut l'encadrer par un pari et une question (§4). |
| **Desmos / GeoGebra** ([guide Desmos](https://blog.desmos.com/articles/desmos-guide-to-building-great-digital-math-2021/), [GeoGebra](https://www.geogebra.org/)) | Les principes Desmos : « Create opportunities for students to be right and wrong in different, interesting ways » ; « Give feedback that attaches meaning to student thinking » ; **« Create a need »** ; l'informel avant le formel. | Conçu pour la classe avec un enseignant. |

### 2.3 Sources arabophones et marocaines

| Source | Ce qui marche | Ce qui ne se transpose pas |
|---|---|---|
| **Al Daheeh / الدحيح** (Ahmed El-Ghandour) ([chaîne](https://www.youtube.com/@Da7ee7), [Wikipédia](https://en.wikipedia.org/wiki/Ahmed_El-Ghandour)) | Le modèle arabophone du **récit scientifique** : science, histoire et humour, narration continue ; ≈ 2,4 à 2,5 M d'abonnés sur sa chaîne actuelle, plus de 250 M de vues à l'époque AJ+. Il montre que le récit tient un public arabophone. | Montage rapide, humour dense, dialecte égyptien : l'inverse du « calme » de VISION. On garde l'arc narratif, pas le rythme. |
| **AlloSchool** ([alloschool.com](https://www.alloschool.com/)) | Contenu « conforme au Programme Officiel », examens nationaux et régionaux corrigés, en arabe, français et anglais ; Premium vidéo à partir de 100 DH par an. Alignement parfait sur l'**examen**. | Approche résumé → exercices → corrigé. Aucune construction d'idée. |
| **Kezakoo** (depuis 2013) ([Le360, 12/2023](https://fr.le360.ma/societe/greve-des-enseignants-prives-de-cours-les-eleves-se-tournent-vers-lapprentissage-en-ligne_KKN7NE6XDZDSFDCKCRN2WV52Z4/)) | Vidéos pour le lycée en arabe et en français ; 177 000 inscrits en oct.–nov. 2023, ≈ 500 000 utilisateurs par an selon le fondateur ; 100 à 300 DH par mois. | Format vidéo-cours classique. |
| **TelmidTICE** (ministère) ([telmidtice.men.gov.ma](https://telmidtice.men.gov.ma/)) | Plateforme publique gratuite ; ≈ 12 500 ressources (≈ 11 000 leçons), plus de 500 sujets d'examen (Le360, fin 2023). | Ressources hétérogènes, peu interactives. |
| **Moutamadris.ma** ([moutamadris.ma](https://moutamadris.ma/)) | Portail de cours, résumés, devoirs et examens ; accès aux notes Massar. À ne pas confondre avec l'espace élève officiel Moutamadris / Massar, qui sert aux notes et non aux cours. | Agrégateur de PDF. |
| **YouTube bac marocain** (professeurs, en darija, arabe et français) | Langue de l'élève, cadre de référence de l'examen, méthode de rédaction attendue. | **Non vérifié :** je n'ai pas trouvé de classement fiable des chaînes marocaines de 2ème bac (les listes trouvées concernent surtout le bac algérien). L'écosystème observé est dominé par les corrections d'examens et les résumés, c'est-à-dire le « comment ». **Question ouverte pour le propriétaire :** quelles 2 ou 3 chaînes marocaines les élèves utilisent-ils vraiment, et une glose en darija serait-elle bienvenue ? |

### 2.4 Synthèse : les ingrédients communs, et ce qui ne passe pas dans une app

**Les huit ingrédients qui reviennent chez tous les bons :**

1. **Une question avant la réponse** (Paramaths, 3B1B, Science Étonnante, Brilliant).
2. **Le concret avant l'abstrait,** un seul objet porteur (bille, dominos, hyperbole, dés).
3. **La genèse : le problème réel ou historique qui a forcé l'idée** (Paramaths, Veritasium, Micmaths).
4. **Le visuel construit lentement, chaque mouvement ayant un but** (3B1B, ScienceClic, Mathologer).
5. **La surprise ou le paradoxe,** qui crée l'écart d'information (Veritasium, Numberphile, El Jj).
6. **Le geste de l'apprenant** (Brilliant, Explorables, PhET, Desmos), là où la vidéo ne peut pas aller.
7. **Le mauvais modèle mis en scène** (thèse de Muller / Veritasium).
8. **Le nom et le formalisme en dernier** (ADEPT, Desmos « informal before formal »).

**Ce qui ne passe pas dans une app de révision :**

- **La durée passive.** L'engagement médian sur les vidéos de MOOC plafonne à ≈ 6 min quelle que soit la longueur ([Guo, Kim & Rubin 2014](https://doi.org/10.1145/2556325.2566239)). Les vidéos de 15 min de ParaMaths réussissent parce qu'elles sont *choisies*, pas imposées.
- **La personnalité et l'humour,** qui sont des détails séduisants dans un contexte d'examen.
- **Le coût de production unitaire** (Distill, 3B1B) : il faut des gabarits.
- **L'absence de pratique et de rédaction.** Une vidéo ne vérifie rien ; c'est notre avantage.

---

## 3. Ce que dit la science de l'apprentissage

Chaque principe est présenté avec le résultat, la preuve, ce que cela implique pour nous et ses limites.

### 3.1 Segmentation et rythme laissé à l'élève — directement « trop rapide »

- **Résultat.** Une explication animée coupée en segments signifiants, chacun lancé par l'élève, est mieux comprise que la même en continu. Dans l'étude-type, une animation narrée de ≈ 2 min 30 sur la formation de l'éclair était coupée en **16 segments** d'une à deux phrases et de 8 à 10 s d'animation, avec un bouton « Continuer ». Le groupe segmenté réussit mieux le test de transfert, et la synthèse de Mayer rapporte d ≈ 0,98 ([Mayer & Chandler 2001, *J. Educ. Psych.* 93(2)](https://doi.org/10.1037/0022-0663.93.2.390) ; [Mayer, *Segmenting principle*, Cambridge](https://www.cambridge.org/core/books/multimedia-learning/segmenting-principle/37240877DDA0362355ADB39936027982)).
- **Méta-analyse.** 56 études, 88 comparaisons : effet significatif, faible à moyen, sur la rétention et le transfert. La segmentation **réduit la charge cognitive** et allonge le temps d'étude ([Rey et al. 2019, *Educ. Psych. Rev.* 31](https://doi.org/10.1007/s10648-018-9456-4)).
- **Le mécanisme** tient en deux choses : le *temps* entre les segments pour traiter l'information, et le *découpage aux frontières naturelles* des événements ([Spanjers, van Gog & van Merriënboer 2010](https://doi.org/10.1007/s10648-010-9135-6)).
- **Contrôle par l'élève.** Pouvoir mettre en pause ou rejouer réduit la charge et améliore le test ([Hasler, Kersten & Sweller 2007](https://doi.org/10.1002/acp.1345)) ; une vidéo interactive (ralentir, revenir) aide à apprendre un geste ([Schwan & Riempp 2004](https://doi.org/10.1016/j.learninstruc.2004.06.005)).
- **Pour nous.** Notre contrôle est déjà bon : rythme de l'élève, Précédent et Suivant. **Ce qui manque, c'est la granularité.** Une figure-clé doit avoir **8 à 16 étapes d'un seul changement**. Une étape doit pouvoir être **rejouée**.
- **Limite.** L'effet est plus fort quand le matériel est complexe, rapide et neuf pour l'élève. Pour une figure simple (lire un repère), 3 étapes suffisent.

### 3.2 L'animation n'aide que si elle est perceptible et porteuse

- **Résultat.** Animation contre image fixe : d ≈ 0,37 en moyenne, et d ≈ 0,40 quand l'animation *représente* le phénomène plutôt que de décorer ([Höffler & Leutner 2007](https://doi.org/10.1016/j.learninstruc.2007.09.013)).
- **Deux principes.** La *congruence* : le changement visuel doit correspondre au changement conceptuel. L'*appréhension* : l'animation doit être assez lente et simple pour être perçue ([Tversky, Morrison & Bétrancourt 2002](https://doi.org/10.1006/ijhc.2002.1017)).
- **Pour nous.** Le changement porteur doit durer **1,2 à 2,5 s** (nos 0,35 à 0,9 s conviennent au décor, pas à l'idée). La légende dit **où regarder** (signalisation, [Schneider et al. 2018](https://doi.org/10.1016/j.edurev.2017.11.001)), pas ce que l'image montre déjà. Quand l'idée est « comment ça varie », un **curseur** (scrubber) vaut mieux que des étapes.

### 3.3 Charge cognitive, pré-entraînement, cohérence

- **Mémoire de travail.** Elle est limitée pour les éléments nouveaux et quasi illimitée pour ce qui est déjà en mémoire à long terme ([Sweller, van Merriënboer & Paas 2019](https://doi.org/10.1007/s10648-019-09465-5)).
- **Pré-entraînement.** Donner le nom et le rôle des pièces *avant* la chaîne causale améliore la compréhension ([Mayer, Mathias & Wetzell 2002](https://doi.org/10.1037/1076-898X.8.3.147)). Pour nous : un mini-battement « les acteurs » (noyau, Z, N ; ou u, u', 1/t) avant la séquence animée.
- **Détails séduisants.** Un détail intéressant mais non pertinent nuit à l'apprentissage ([Harp & Mayer 1998](https://doi.org/10.1037/0022-0663.90.3.414) ; méta-analyse [Rey 2012](https://doi.org/10.1016/j.edurev.2012.05.003) ; Sundararajan & Adesope 2020, g ≈ −0,33). **C'est la règle qui gouverne l'histoire** (§4.6).

### 3.4 Exemples commentés, estompage, inversion d'expertise

- **Résultat.** Étudier des exemples résolus améliore la performance en mathématiques : effet modéré, ≈ +18 rangs de centile ([Barbieri et al. 2023](https://doi.org/10.1007/s10648-023-09745-1)). La transition idéale *estompe* progressivement les étapes fournies ([Renkl & Atkinson 2003](https://doi.org/10.1207/S15326985EP3801_3)).
- **Inversion d'expertise.** Ce qui aide le débutant gêne l'avancé ([Kalyuga et al. 2003](https://doi.org/10.1207/S15326985EP3801_4)).
- **Pour nous.** Garder la pensée d'expert à voix haute (déjà dans VISION et dans nos « Ce qu'on cherche et pourquoi ce geste »). Mais **un seul exemple commenté par méthode dans la leçon** ; les suivants deviennent des *exemples à compléter*, puis des exercices. Le calcul ligne à ligne est **replié** (« déplier le calcul ») pour qui en a besoin.

### 3.5 Récupération active, questions intercalées

- **Résultat.** Se tester bat relire ([Roediger & Karpicke 2006](https://doi.org/10.1111/j.1467-9280.2006.01693.x)). Méta-analyse : g ≈ 0,61 ([Adesope, Trevisan & Sundararajan 2017](https://doi.org/10.3102/0034654316689306)). C'est l'une des deux techniques jugées d'« utilité élevée » par [Dunlosky et al. 2013](https://doi.org/10.1177/1529100612453266).
- **Questions intercalées.** Glissées dans un cours vidéo de 21 min, elles réduisent la distraction de ≈ 40 % à ≈ 20 %, triplent la prise de notes et améliorent l'apprentissage du dernier segment ([Szpunar, Khan & Schacter 2013, *PNAS*](https://doi.org/10.1073/pnas.1221764110)). La réplication sur 40 min est plus nuancée.
- **Pour nous.** Un geste toutes les **3 à 5 min**, et non toutes les ≈ 1 000 mots.

### 3.6 Espacement

- **Résultat.** L'intervalle optimal entre deux révisions croît avec le délai de rétention visé ; il vaut grossièrement 10 à 20 % de ce délai pour les délais courts, moins pour les délais longs ([Cepeda et al. 2008](https://doi.org/10.1111/j.1467-9280.2008.02209.x)).
- **Pour nous.** Le rappel en ouverture de session porte sur J−1, J−3, J−7, J−21… C'est la mécanique de la « banque », pas celle de la leçon.

### 3.7 Entrelacement

- **Résultat.** Mélanger les types de problèmes oblige à **choisir la méthode**, ce que teste le bac. Essai randomisé en classe : 61 % contre 38 % à un test surprise un mois après (d ≈ 0,83 ; [Rohrer, Dedrick, Hartwig & Cheung 2020, *J. Educ. Psych.* 112](https://doi.org/10.1037/edu0000367)) ; voir aussi [Rohrer, Dedrick & Stershic 2015](https://doi.org/10.1037/edu0000001).
- **Pour nous.** La fin de session et l'échelle « bac » sont entrelacées, comme le font les sujets type examen de ParaMaths qui ne nomment pas la méthode.

### 3.8 Auto-explication et interrogation élaborative

- **Résultat.** Les bons élèves s'expliquent les exemples ([Chi et al. 1989](https://doi.org/10.1207/s15516709cog1302_1)). Inciter à s'expliquer : g ≈ 0,55 sur 69 effets ([Bisra et al. 2018](https://doi.org/10.1007/s10648-018-9434-x)). L'interrogation élaborative (« pourquoi est-ce vrai ? ») est d'utilité « modérée » selon Dunlosky 2013.
- **Pour nous.** Après un geste d'expert, demander « pourquoi ce geste ? » sous forme de choix argumentés (trois justifications dont une juste). Cela vise la *sélection de méthode* (VISION).

### 3.9 Prédire puis révéler, pré-test, échec productif

- **Démonstrations en physique.** Les élèves qui regardent passivement n'en comprennent pas mieux le concept que ceux qui ne l'ont pas vue ; ceux qui **prédisent d'abord** comprennent significativement mieux ([Crouch, Fagen, Callan & Mazur 2004](https://doi.org/10.1119/1.1707018)).
- **Pré-test.** Une tentative ratée *avant* l'étude améliore l'apprentissage ([Richland, Kornell & Kao 2009](https://doi.org/10.1037/a0016496) ; [Kornell, Hays & Bjork 2009](https://doi.org/10.1037/a0015729)).
- **Échec productif.** Chercher avant d'être instruit, puis être instruit, donne g ≈ 0,36 sur 53 études, et jusqu'à 0,58 quand les principes sont respectés. L'effet **s'inverse chez les plus jeunes** ([Kapur 2008](https://doi.org/10.1080/07370000802212669) ; [Sinha & Kapur 2021, *RER* 91(5)](https://doi.org/10.3102/00346543211019105)).
- **Pour nous.** Le pari d'ouverture est juste ; il faut **le multiplier dans les visuels** (1 à 3 paris par figure-clé) et lui donner une conséquence : la révélation répond explicitement aux paris faux.

### 3.10 Affronter le mauvais modèle

- **Résultat.** Dans la thèse de D. Muller (Veritasium, Sydney 2008), une vidéo d'exposé claire n'améliorait pas les scores (les élèves la trouvaient pourtant « claire »). Les versions *réfutation* et *dialogue* (un élève exprime la conception erronée, le professeur la démonte) donnent d ≈ 0,79 et 0,83 contre l'exposé, avec le plus grand bénéfice pour les élèves faibles ([Muller, Bewes, Sharma & Reimann 2008, *JCAL* 24](https://doi.org/10.1111/j.1365-2729.2007.00248.x) ; [résumé](https://openjournals.library.sydney.edu.au/IISME/article/view/6345)). Le sentiment de clarté est un **faux signal**.
- **Pour nous.** En physique-chimie et en SVT, chaque notion nomme et met en scène **la** conception erronée : « gros noyau = instable », « un noyau vieux est plus près de sa fin », « la force est dans le sens du mouvement ». C'est déjà la doctrine de VISION ; il faut l'outiller dans le format.

### 3.11 Double codage

- **Résultat.** Le verbal et l'imagé sont deux systèmes ; les relier renforce la mémoire ([Clark & Paivio 1991](https://doi.org/10.1007/BF01320076)).
- **Pour nous.** Chaque idée-clé a **son image** : une seule, reprise à l'identique partout où l'idée revient (aire sous 1/t pour ln, quart de tour pour i, escalier des demi-vies).

### 3.12 Du concret au symbole (« concreteness fading »)

- **Résultat.** Commencer concret, passer par une représentation schématique, finir symbolique bat l'abstrait d'emblée comme le concret seul ([Fyfe, McNeil, Son & Goldstone 2014](https://doi.org/10.1007/s10648-014-9249-3)).
- **Pour nous.** L'ordre « dés → barres → N(t) = N₀e^{−λt} » ; « bille qui roule → aire → ∫ » ; « tables de Napier → aire sous 1/t → ln ».

### 3.13 Curiosité, écart d'information, récit

- **Écart d'information.** La curiosité naît d'un écart perçu entre ce qu'on sait et ce qu'on voudrait savoir ([Loewenstein 1994](https://doi.org/10.1037/0033-2909.116.1.75)).
- **Mémoire.** La curiosité active les circuits de récompense et améliore la mémorisation ([Kang et al. 2009](https://doi.org/10.1111/j.1467-9280.2009.02402.x)), y compris pour l'information *incidente* apprise dans un état de curiosité ([Gruber, Gelman & Ranganath 2014, *Neuron*](https://doi.org/10.1016/j.neuron.2014.08.060)).
- **Récit.** Le récit est « psychologiquement privilégié » : mieux compris, mieux retenu ([Willingham 2004, *American Educator*](https://www.aft.org/periodical/american-educator/summer-2004/ask-cognitive-scientist)). Sur 209 élèves de 12 à 14 ans, des textes de sciences intégrant l'information-clé dans le *récit de la découverte* (Galilée, Curie) ont été mieux retenus, surtout à long terme ([Arya & Maul 2012, *J. Educ. Psych.* 104(4)](https://doi.org/10.1037/a0028108)).
- **Prudence.** Une méta-analyse récente juge les preuves sur le récit en sciences **non concluantes** ([2024, ResearchGate](https://www.researchgate.net/publication/384420142_Impact_of_Narrative_versus_Expository_Instruction_in_Science_Education_on_Recall_Understanding_and_Transfer_A_Meta-Analysis)).
- **Pour nous.** Le récit fonctionne quand **la science est dans l'histoire** (le problème, l'obstacle, l'expérience). Il nuit quand il est une anecdote à côté (§3.3). D'où la règle du §4.6.

### 3.14 Maîtrise, tutorat, et ce qu'il faut croire du « 2 sigma »

- **Le chiffre fondateur et sa révision.** Bloom rapportait +2 σ pour le tutorat individuel avec maîtrise ([Bloom 1984](https://doi.org/10.3102/0013189X013006004)). Les méta-analyses ultérieures sont plus sobres :
  - apprentissage par maîtrise ≈ 0,5 σ ([Kulik, Kulik & Bangert-Drowns 1990](https://doi.org/10.3102/00346543060002265)) ;
  - tutorat humain ≈ 0,79 σ, tuteurs informatiques « pas à pas » ≈ 0,76 σ ([VanLehn 2011](https://doi.org/10.1080/00461520.2011.611369)) ;
  - tutorat en école ≈ 0,37 σ en moyenne ([Nickow, Oreopoulos & Quan 2020](https://doi.org/10.3386/w27476)).

  Pour lire ces tailles d'effet : [Kraft 2020](https://doi.org/10.3102/0013189X20912798).
- **Pour nous.** Viser la maîtrise : on ne passe pas à la suite sans le battement précédent. Le ressort décisif du tutorat, c'est la **granularité pas à pas avec retour**, pas la magie d'un humain.

### 3.15 Tuteurs IA : les essais 2024–2025

| Étude | Dispositif | Résultat | Leçon pour nous |
|---|---|---|---|
| [Kestin et al. 2025, *Sci. Rep.* 15:17458](https://doi.org/10.1038/s41598-025-97652-6) (Harvard, physique, n = 194, plan croisé) | Tuteur GPT-4 conçu sur la recherche : guidage séquentiel, une partie de problème à la fois, solutions pré-écrites, gestion de la charge, rythme de l'élève | Gain médian plus de deux fois supérieur à l'apprentissage actif en classe ; effet 0,73 à 1,3 σ (régression quantile) ; 49 min médianes contre ≈ 60 ; plus d'engagement | Le tuteur marche **parce qu'il est scénarisé pas à pas sur un contenu pré-écrit et vérifié**. C'est notre architecture. |
| [Bastani et al. 2025, *PNAS* 122(26)](https://doi.org/10.1073/pnas.2422633122) (Turquie, ≈ 1 000 lycéens, maths) | « GPT Base » (type ChatGPT) contre « GPT Tutor » (indices, pas de réponse) | Entraînement : +48 % et +127 %. **Examen sans IA : −17 % pour GPT Base**, ≈ 0 pour GPT Tutor ([Wharton](https://knowledge.wharton.upenn.edu/article/without-guardrails-generative-ai-can-harm-education)) | Donner la réponse sert de béquille et fait perdre l'apprentissage. « Tentative d'abord » est non négociable. |
| [De Simone et al. 2025, Banque mondiale WPS 11125](https://doi.org/10.1596/1813-9450-11125) (Nigeria, 800 élèves, 6 semaines) | Copilot (GPT-4) après l'école, 12 séances de 90 min, avec enseignants | +0,31 σ global ; +0,23 σ en anglais ; ≈ 1,5 à 2 ans de scolarité « habituelle » | Effet réel dans un contexte proche du nôtre (pays à revenu intermédiaire, encadrement). |
| [Henkel et al. 2024 (Rori, Ghana)](https://arxiv.org/abs/2402.09809) | Tuteur de maths sur WhatsApp, 2 × 30 min par semaine pendant 8 mois | +0,37 σ ; ≈ 5 $ par élève | Le format léger et régulier compte autant que l'IA. |
| [Wang et al. 2024 (Tutor CoPilot)](https://www.povertyactionlab.org/evaluation/human-ai-cooperation-improve-tutoring-united-states) | L'IA conseille des tuteurs *humains* en temps réel | +4 points de maîtrise, +9 pour les tuteurs les moins bien notés ; plus de questions de sondage, moins de félicitations génériques | La valeur de l'IA tient à la **pédagogie qu'elle impose** (questionner plutôt que dire). |
| [Khanmigo, essai indépendant (NBER w35620)](https://www.nber.org/papers/w35620) | Remédiation en collège, Tennessee | ≈ 0,06 à 0,08 σ par an, comparable à Khan Academy sans IA | Un chatbot générique greffé sur une pratique ne transforme rien à lui seul. |

### 3.16 Flow, attention, durée

- **Résultat.** L'engagement des lycéens est maximal quand le défi *et* la compétence sont élevés, et quand l'activité est pertinente et sous leur contrôle ([Shernoff et al. 2003](https://doi.org/10.1521/scpq.18.2.158.21860)). L'engagement médian en vidéo de MOOC est au plus ≈ 6 min, quelle que soit la longueur ; au-delà de 9 min, les élèves s'arrêtent souvent avant la moitié (Guo 2014).
- **Pour nous.** Une longue session (VISION) faite de **courts battements actifs**. La difficulté est calibrée en continu (l'échelle de VISION), et rien n'interrompt un acte en cours.

---

## 4. Patrons de conception : proposition de « format de notion v3 »

Ce format **complète** l'anatomie existante (R0 accroche → R1… → R6 « Pour t'entraîner », cadre v2). Il ne la remplace pas. Il change l'*ordre interne*, le *grain* et la *place de la technique*.

### 4.1 Les unités et leurs durées

| Unité | Durée cible | Contenu | Se termine par |
|---|---|---|---|
| **Notion** | 45 à 90 min au premier passage | 4 à 7 actes | Retour sur l'énigme et entrée dans l'échelle d'exercices |
| **Acte** (≈ nos chapitres Rn) | 10 à 20 min | 3 à 6 battements, une seule grande idée | 2 ou 3 questions de **récupération sur l'acte précédent** |
| **Battement** | 2 à 4 min | Une idée ; ≤ ≈ 250 mots de prose ; au plus **un** visuel principal | **Un geste de l'élève** : pari, choix, valeur, « pourquoi ce geste ? » |
| **Étape visuelle** | 5 à 15 s de lecture | **Un seul** changement ; légende ≤ 25 mots qui dit où regarder | Bouton Suivant ; Rejouer l'étape |

### 4.2 L'arc d'une notion en 7 temps

1. **L'énigme** (2 à 4 min). Un vrai problème que la notion résout : historique (Napier et ses multiplications, Bombelli et sa racine de −121, Becquerel et son ciel couvert) ou concret (la bille qui roule). Jamais une définition.
2. **Le pari** (≈ 30 s). Prise de position engagée ; existe déjà (`cp-r0-predict`).
3. **La construction** (2 à 4 battements). Du concret au schéma, avec **la figure-clé de 8 à 16 étapes** (§4.3). L'élève voit l'idée *se produire*.
4. **Le nom** (1 battement). La définition formelle arrive comme la **réponse** à ce qu'on vient de voir (« cette aire, on l'appelle ln »), plus jamais comme un décret.
5. **Le pourquoi** (1 ou 2 battements). La preuve racontée : une phrase qui dit ce qu'elle va montrer, l'idée-clé, puis le calcul **replié** (dépliable).
6. **La technique** (pratique). *Un* exemple commenté (pensée d'expert à voix haute) dans la leçon ; ensuite des exemples à compléter → exercices → bac → variantes, dans l'échelle existante, avec estompage.
7. **Le retour** (≈ 1 min). L'énigme est résolue ; « ce que ça a changé » (une phrase d'histoire, §4.6) ; ce qu'on emporte (une phrase et l'image-clé).

### 4.3 Règles des visuels pas à pas

1. **Figure-clé** (celle qui porte l'idée de la notion) : **8 à 16 étapes**. Figures de lecture (repère, tableau) : 3 à 5 étapes suffisent.
2. **Un changement par étape.** Si la légende contient « et », c'est deux étapes.
3. **Durée du changement porteur : 1,2 à 2,5 s.** Le décor reste à 0,4 s. Pas de mouvement sans but (« Every movement… deliberate », 3B1B).
4. **1 à 3 étapes « pari ».** L'image s'arrête ; l'élève clique où ira la courbe, choisit plus / moins / égal, ou estime une valeur ; puis la révélation, qui **répond** au pari.
5. **Rejouer l'étape** et Précédent, toujours. Jamais de lecture automatique (déjà le cas).
6. **Pré-entraînement.** Une étape 0 qui nomme les acteurs avant la séquence causale.
7. **Curseur plutôt qu'étapes** quand l'idée est une variation continue (faire glisser x et voir l'aire, faire glisser t et voir N(t)). C'est le patron Desmos / ParaMaths app.
8. **Une image par idée,** reprise à l'identique quand l'idée revient (double codage).
9. **La légende signale,** elle ne paraphrase pas : « regarde la largeur doubler pendant que la hauteur se divise par deux », et non « l'aire est égale ».

**Exemple — la figure-clé de ln en 12 étapes** (au lieu des 4 actuelles) :

1. La courbe y = 1/t.
2. Le repère ; t = 1 marqué.
3. L'aire de 1 à 2 teintée.
4. L'aire de 2 à 4 teintée.
5. **Pari : plus grande, plus petite ou égale à la précédente ?**
6. La bande [2,4] s'étire horizontalement ×½ et verticalement ×2 et se pose exactement sur [1,2].
7. « Égales. »
8. L'aire de 4 à 8, même geste.
9. **Pari : l'aire de 1 à 8 ?** (réponse : 3 fois celle de 1 à 2)
10. Généralisation : A(1 → 2ⁿ) = n · A(1 → 2) ; × devient +.
11. La même chose pour n'importe quel facteur a : A(ab) = A(a) + A(b).
12. « Cette fonction-aire, c'est ln ». Mention : Saint-Vincent et de Sarasa l'ont vu avant 1649.

### 4.4 Vérifier la compréhension toutes les 3 à 5 minutes

| Type | Quand | Forme | Ce que ça mesure |
|---|---|---|---|
| **Micro** | Fin de battement | 1 clic ou 1 valeur | Suivi immédiat |
| **Pari** | Avant une révélation (texte ou visuel) | Choix ou position sur la figure | Modèle mental ; active la curiosité |
| **Pourquoi** | Après un geste d'expert | Trois justifications, une juste ; ou phrase libre courte | Sélection de méthode (auto-explication) |
| **Récupération** | Début d'acte (sur l'acte précédent) et ouverture de session (J−1, J−3, J−7…) | 2 ou 3 questions | Mémoire ; espacement |
| **Diagnostic** | Fin d'acte | Distracteurs = conceptions erronées nommées | *Quelle* conception tourne (VISION « It knows the student ») |

Une erreur sur un pari **ne bloque pas** : la révélation est faite pour elle. Une erreur sur une question de diagnostic ouvre un **battement de remédiation** ciblé sur la conception détectée.

### 4.5 Où va la technique (« trop de maths simples »)

- **Dans la leçon :** *un* exemple commenté par méthode. Les lignes de calcul élémentaires sont **repliées** (« déplier le calcul ») ; à l'écran, le *choix* (pourquoi ce geste) l'emporte sur l'*exécution*.
- **Dans la pratique :** exemples à compléter, puis exercices, du facile au bac. L'estompage suit la maîtrise mesurée.
- **Les propriétés en série** (comme R2 du logarithme, quatre démonstrations à la suite) deviennent **une** démonstration racontée (le produit), puis un battement-défi : « Trouve toi-même ln(1/a) à partir de ln(ab) ». La pratique fait le reste.

### 4.6 Tisser l'histoire sans ralentir

1. **Trois emplacements au plus.**
   - **Ouverture** (≤ 90 s) : le problème qui a forcé l'idée.
   - **Le moment où ça a coincé** (≤ 60 s), au milieu : l'obstacle des savants (Berkeley et ses « fantômes de quantités disparues », Poisson qui croit réfuter Fresnel). Il coïncide souvent avec la conception erronée de l'élève.
   - **Ce que ça a changé** (≤ 45 s), à la fin.
2. **Budget ≈ 5 % du temps de la notion.**
3. **Test du porteur :** si l'on retire le récit, l'élève perd-il un *pourquoi* ? Si non, couper (détail séduisant, §3.3).
4. **La science est dans l'histoire,** pas à côté : on raconte le problème, l'obstacle et l'expérience, pas la biographie (Arya & Maul 2012).
5. **Une source obligatoire** par accroche (URL dans le brief), avec un statut *vérifié* ou *légende*. Les légendes peuvent se raconter **comme légendes**, ce qui est en soi une leçon d'esprit critique.
6. **Le patrimoine local quand il est vrai et porteur :**
   - al-Karaji et la récurrence ;
   - Ibn al-Haytham et l'intégrale du paraboloïde, ou la vision ;
   - Ibn Mun'im (Marrakech) et le dénombrement ;
   - Ibn al-Bannā' (Marrakech, Fès) et les coefficients binomiaux ;
   - al-Rāzī et la variole ;
   - Agadir 1960 et Al Haouz 2023 pour la tectonique.

### 4.7 Le flow sur une à deux heures

- **Structure de session :** 5 min de rappel espacé, puis 2 ou 3 actes de 20 à 25 min, puis 10 min d'entrelacement façon bac, puis l'écran « ce que tu as gagné » (engagement en bordure, VISION).
- **Rien n'interrompt un acte ;** la pause est *proposée* seulement à une frontière d'acte. Le flow met 15 à 20 min à s'installer (VISION).
- **Le défi suit la compétence** (Shernoff) : un pari raté → un battement plus concret ; un pari réussi vite → on saute l'étape de consolidation.
- **Une seule chose à l'écran ;** les visuels se replient après usage (la page n'est pas un mur).
- **Alternance de modalités motivée par le contenu,** pas par l'horloge (VISION) : lecture → visuel → geste → lecture.

### 4.8 Trois notions réécrites en v3 (esquisses)

**Logarithme** (`content/maths/fonction-logarithme`)
- **Énigme :** Napier, 20 ans de calcul, et sa préface : « nothing… so troublesome to mathematical practice… than the multiplications, divisions… of great numbers ».
- **Pari :** L(1) ? (garder `cp-r0-predict`).
- **Construction :**
  1. deux suites côte à côte, arithmétique et géométrique : additionner en haut, c'est multiplier en bas (l'idée de Napier) ;
  2. la figure-clé aire sous 1/t en 12 étapes (§4.3).
- **Nom :** ln = primitive de 1/t nulle en 1, la réponse à ce qu'on a vu.
- **Pourquoi :** la preuve de ln(ax) = ln a + ln x racontée en 3 lignes, calcul replié.
- **Technique :** un exemple commenté (ln(u)' = u'/u) ; le reste en pratique.
- **Retour :** Kepler dédie ses Éphémérides de 1620 à Napier ; la règle à calcul jusqu'aux années 1970 ; le pH (lien avec les acides-bases en PC).

**Décroissance radioactive** (`content/pc/decroissance-radioactive`)
- **Énigme :** Becquerel, les 26 et 27 février 1896, ciel couvert. Les plaques restent dans un tiroir ; développées le 1er mars, elles montrent des ombres aussi nettes qu'au soleil.
- **Pari :** le vieux noyau contre le neuf (garder).
- **Construction :**
  1. 100 dés à l'écran ; un « tic » = chaque dé est lancé, les 6 disparaissent ;
  2. l'élève appuie lui-même 1 fois, puis 5 fois ;
  3. **pari** sur le nombre restant après 10 tics ;
  4. le graphe se construit **point par point** ;
  5. l'escalier des demi-vies apparaît ;
  6. N(t) = N₀e^{−λt}.

  C'est du concret au symbole, avec la conception « l'âge use le noyau » mise en scène puis réfutée.
- **Nom :** λ, t½ (mot forgé par Rutherford en 1907).
- **Retour :** Libby, décembre 1949. Testée sur du bois des tombes de Djéser et Snéfrou, d'âge historique connu (≈ 2625 ± 75 av. J.-C.), la méthode donne ≈ 2800 ± 250 av. J.-C. Prix Nobel en 1960.

**Nombres complexes** (`content/maths/nombres-complexes-1`)
- **Énigme :** x³ = 15x + 4 a la solution évidente x = 4 (64 = 60 + 4). La formule de Cardan (1545) donne pourtant ∛(2 + √−121) + ∛(2 − √−121).
- **Pari :** la formule est-elle fausse ?
- **Construction :** Bombelli (1572) ose calculer avec √−1 « comme avec une lettre » : (2 + i)³ = 2 + 11i, donc la somme vaut (2 + i) + (2 − i) = 4. *Le détour par l'impossible ramène au réel.* Puis Wessel (1797) et Argand (1806) : multiplier par i = tourner d'un quart de tour (figure-clé de 10 étapes : 1 → i → −1 → −i → 1).
- **Nom :** ℂ, forme algébrique, comme outil déjà justifié.
- **Retour :** Descartes les avait appelés « imaginaires » par dérision (1637) ; ils servent aujourd'hui à l'électricité alternative et à la mécanique quantique.

### 4.9 Propriétés mesurables (candidates de portes, non implémentées)

Dans l'esprit des ADR 0031 / 0034 (une porte doit pouvoir rougir), voici des propriétés que le format v3 rend mesurables :

- **Densité de gestes :** mots de prose (LaTeX exclu) entre deux marqueurs interactifs ≤ ≈ 600 (≈ 3 à 4 min).
- **Grain des figures-clés :** ≥ 8 étapes pour toute figure marquée `"role": "cle"` ; une seule figure-clé par acte.
- **Paris visuels :** ≥ 1 étape `"pari": true` par figure-clé.
- **Ordre :** dans un acte, le premier bloc `**Définition.**` n'apparaît pas avant un visuel ou un pari.
- **Histoire :** chaque notion déclare ≥ 1 accroche avec `source:` (URL) et `statut: vérifié|légende` ; ≤ 3 accroches.

Ces portes ne doivent être armées qu'après décision du propriétaire, et chacune avec son essai rouge (ADR 0034).

---

## 5. Banque d'accroches historiques (programme de 2ème Bac)

**Mode d'emploi :** ① = ouverture (le problème), ② = le moment où ça a coincé, ③ = ce que ça a changé. **[V]** = vérifié sur la source citée (lue) ; **[S]** = source secondaire, à reformuler prudemment ; **[L]** = légende, à raconter comme telle. Les slugs renvoient aux dossiers `content/`.

### 5.1 Mathématiques

**Limites et continuité** (`limites-continuite`)
- ① **Zénon d'Élée** (Ve s. av. J.-C.) : Achille ne rattrape jamais la tortue, car il doit d'abord atteindre où elle était, puis où elle est allée… Une infinité d'étapes, et pourtant un temps fini. *C'est exactement une limite.* [V] [Zeno's paradoxes](https://en.wikipedia.org/wiki/Zeno%27s_paradoxes)
- ② **George Berkeley, 1734, *The Analyst*** : le calcul de Newton marche, mais ses infinitésimaux sont des « ghosts of departed quantities ». Personne ne savait dire ce qu'est un « infiniment petit ». La définition par les limites répond à cette attaque. [V] [George Berkeley](https://en.wikipedia.org/wiki/George_Berkeley)
- ② **Bolzano (1817), puis Cauchy (*Cours d'analyse*, 1821)** démontrent le théorème des valeurs intermédiaires, qui « semblait évident ». **Weierstrass**, longtemps simple professeur de lycée (Deutsch Krone, puis Braunsberg), formalise l'ε–δ. [V] [IVT](https://en.wikipedia.org/wiki/Intermediate_value_theorem), [Weierstrass](https://en.wikipedia.org/wiki/Karl_Weierstrass)
- ③ **Hermite à Stieltjes, 1893**, devant les fonctions continues sans dérivée : « Je me détourne avec effroi et horreur de cette plaie lamentable des fonctions continues qui n'ont pas de dérivées ». Continuité et dérivabilité, ce n'est pas pareil. [S] (Cohen & Istas 2013, [doi:10.1007/978-3-642-36739-7_1](https://dx.doi.org/10.1007/978-3-642-36739-7_1))

**Dérivation, étude de fonctions** (`derivabilite-etude-fonctions`)
- ① **Fermat, vers 1636** : la méthode d'« adégalité » pour trouver maxima, minima et tangentes, une génération avant le calcul différentiel. [V] [Adequality](https://en.wikipedia.org/wiki/Adequality)
- ② **Newton et Leibniz**, chacun de son côté. Leibniz publie le premier (*Nova Methodus*, 1684) ; la querelle de priorité culmine en 1712. [V] [Leibniz–Newton controversy](https://en.wikipedia.org/wiki/Leibniz%E2%80%93Newton_calculus_controversy)
- ② Ironie : **Michel Rolle** (théorème de 1691) fut l'un des plus virulents critiques du calcul infinitésimal, « collection d'ingénieux sophismes », avant de changer d'avis. Son théorème est aujourd'hui indispensable à ce même calcul. [V] [Michel Rolle](https://en.wikipedia.org/wiki/Michel_Rolle)

**Fonction logarithme** (`fonction-logarithme`)
- ① **John Napier, 1614**, *Mirifici Logarithmorum Canonis Descriptio* : **20 ans** de calculs de tables. Sa préface : rien n'est « so troublesome to mathematical practice… than the multiplications, divisions, square and cubical extractions of great numbers ». [V] [Descriptio](https://en.wikipedia.org/wiki/Mirifici_Logarithmorum_Canonis_Descriptio), [MacTutor Napier](https://mathshistory.st-andrews.ac.uk/Biographies/Napier/)
- ② **Grégoire de Saint-Vincent et A. A. de Sarasa, avant 1649** : l'aire sous l'hyperbole y = 1/x vérifie A(xy) = A(x) + A(y). On parle alors du « logarithme hyperbolique ». *C'est la définition de la leçon, vue un siècle avant d'être enseignée.* [V] [Natural logarithm, History](https://en.wikipedia.org/wiki/Natural_logarithm), [Saint-Vincent](https://en.wikipedia.org/wiki/Gr%C3%A9goire_de_Saint-Vincent)
- ③ **Briggs fait Londres–Édimbourg en 1615** pour rencontrer Napier ; ils conviennent ensemble que log 1 = 0. **Kepler dédie ses Éphémérides de 1620 à Napier.** [V] (même sources). L'anecdote du quart d'heure de silence admiratif est rapportée de seconde main (Lilly). [S]
- ③ « En abrégeant les calculs, [les logarithmes] ont doublé la vie des astronomes », phrase attribuée à **Laplace** via Eves (1969). [S] [MacTutor, citations de Laplace](https://mathshistory.st-andrews.ac.uk/Quotations/Laplace.html)

**Fonction exponentielle** (`fonction-exponentielle`)
- ① **Jacob Bernoulli, 1683**, problème des intérêts composés : capitaliser de plus en plus souvent fait-il fortune ? Non, on plafonne à un nombre entre 2,5 et 3, c'est e. [V] [e (mathematical constant)](https://en.wikipedia.org/wiki/E_(mathematical_constant))
- ② **Euler** utilise la lettre e dès 1727 ou 1728, dans un manuscrit **sur le tir des canons** ; puis dans une lettre à Goldbach (1731) ; première impression dans *Mechanica* (1736). [V] (même source)
- ③ Lien avec la PC : décroissance radioactive, charge RC, refroidissement de Newton (voir ci-dessous).

**Suites numériques** (`suites-numeriques`)
- ① **Malthus, 1798** : la population croîtrait en progression *géométrique* (doubler tous les 25 ans), la nourriture en progression *arithmétique*, donc la famine. *L'opposition arithmétique / géométrique du programme, comme argument politique.* [V] [Essay on the Principle of Population](https://en.wikipedia.org/wiki/An_Essay_on_the_Principle_of_Population)
- ① **Fibonacci, 1202**, *Liber Abaci* : le problème des lapins. La suite apparaît déjà vers 200 av. J.-C. chez **Pingala**, pour compter les mètres poétiques sanskrits. [V] [Fibonacci sequence](https://en.wikipedia.org/wiki/Fibonacci_sequence)
- ② **Récurrence : al-Karaji (vers l'an 1000)** prouve n = 1, puis 2, puis 3… jusqu'à 5, et dit qu'on peut continuer indéfiniment. C'est un pas majeur vers l'induction (MacTutor) ; **Pascal** la formalise en 1654. [V] [MacTutor al-Karaji](https://mathshistory.st-andrews.ac.uk/Biographies/Al-Karaji/), [Mathematical induction](https://en.wikipedia.org/wiki/Mathematical_induction)
- [L] **Gauss et la somme 1 + … + 100** : histoire largement embellie au fil des siècles ([Hayes, *American Scientist* 2006](https://www.americanscientist.org/node/870)). À raconter comme légende.

**Nombres complexes** (`nombres-complexes-1`, `nombres-complexes-2`)
- ① **Le duel Tartaglia–Fior, 1535.** Del Ferro avait gardé secrète sa méthode pour les cubiques et ne l'avait confiée qu'à son élève Fior. Tartaglia gagne le défi ; **Cardan** publie la formule générale dans *Ars Magna* (1545). [V] [Cubic equation](https://en.wikipedia.org/wiki/Cubic_equation), [MacTutor Bombelli](https://mathshistory.st-andrews.ac.uk/Biographies/Bombelli/)
- ② **Bombelli, *L'Algebra*, 1572** : la formule donne des racines de nombres négatifs alors que la solution est réelle (x³ = 15x + 4, solution 4). Il calcule avec ces nombres et retrouve la vraie solution. Il avoue : « cela me parut plus sophistique que vrai ». [V] (MacTutor ; le calcul (2 + i)³ = 2 + 11i se vérifie en classe)
- ② **Descartes, 1637**, *La Géométrie* : le mot « imaginaires », par dérision. [S] [Imaginary number](https://en.wikipedia.org/wiki/Imaginary_number)
- ③ **Caspar Wessel**, arpenteur danois, présente en 1797 l'interprétation géométrique ; ignorée près d'un siècle car écrite en danois. **Argand**, gérant d'une librairie à Paris, la republie à compte d'auteur en 1806. [V] [Wessel](https://en.wikipedia.org/wiki/Caspar_Wessel), [Argand](https://en.wikipedia.org/wiki/Jean-Robert_Argand)
- ③ **Euler, 1748**, *Introductio* : e^{ix} = cos x + i sin x ; Cotes l'avait approchée en 1714. [V] [Euler's formula](https://en.wikipedia.org/wiki/Euler%27s_formula)

**Calcul intégral** (`calcul-integral`)
- ① **Archimède** (IIIe s. av. J.-C.), *Quadrature de la parabole* : l'aire d'un segment de parabole vaut 4/3 du triangle inscrit, via 1 + 1/4 + 1/16 + … (méthode d'exhaustion). [V] [Quadrature of the Parabola](https://en.wikipedia.org/wiki/Quadrature_of_the_Parabola)
- ② Détail saisissant : *La Méthode* d'Archimède a été **grattée et recouverte d'un texte religieux en 1229**. Le savant Heiberg la photographie en 1906 et la publie en 1915 (le palimpseste d'Archimède). [V] [Archimedes Palimpsest](https://en.wikipedia.org/wiki/Archimedes_Palimpsest)
- ② **Ibn al-Haytham (vers l'an 1000)** trouve la formule de la somme des puissances 4es pour calculer le **volume d'un paraboloïde** : une intégration avant la lettre. [V] [Ibn al-Haytham](https://en.wikipedia.org/wiki/Ibn_al-Haytham)
- ③ **Leibniz invente le symbole ∫ en 1675**, un S long pour *summa* (une somme d'une infinité de petits termes) ; publié en 1686. [V] [Integral symbol](https://en.wikipedia.org/wiki/Integral_symbol). **Riemann** définit l'intégrale moderne dans son habilitation (1854, publiée en 1868). [V] [Riemann integral](https://en.wikipedia.org/wiki/Riemann_integral)

**Équations différentielles** (`equations-differentielles`)
- ① **Newton, 1701**, publie *anonymement* « Scala graduum caloris » : un corps refroidit d'autant plus vite qu'il est plus chaud que l'air, d'où y' = −k(y − T). [V] [Newton's law of cooling](https://en.wikipedia.org/wiki/Newton%27s_law_of_cooling)
- ② **y'' + ω²y = 0 dans un circuit :** Kelvin prédit en 1853 que la décharge d'une bouteille de Leyde dans une bobine *oscille* ; Feddersen photographie l'étincelle oscillante au miroir tournant en 1857. [V] [LC circuit](https://en.wikipedia.org/wiki/LC_circuit)
- ③ La datation au carbone 14 (voir PC) est y' = −λy appliquée au temps profond.

**Probabilités** (`probabilites-conditionnelles`)
- ① **Le problème des partis, 1654** : comment partager équitablement la mise d'un jeu interrompu ? Posé à Pascal par le chevalier de Méré (Antoine Gombaud) ; la correspondance Pascal–Fermat fonde les probabilités. Pacioli (1494) avait proposé une règle absurde. [V] [Problem of points](https://en.wikipedia.org/wiki/Problem_of_points)
- ② **Le paradoxe des dés de Méré** : parier sur au moins un 6 en 4 lancers gagne, parier sur au moins un double-6 en 24 lancers perd, alors que « 4/6 = 24/36 ». [S] [York, histoire de la statistique](https://york.ac.uk/depts/maths/histstat/pascal.htm)
- ② **Monty Hall, 1990** : ≈ 10 000 lecteurs, dont près de 1 000 docteurs, écrivent au magazine *Parade* que Marilyn vos Savant se trompe ; elle avait raison. *C'est la probabilité conditionnelle contre l'intuition.* [V] [Monty Hall problem](https://en.wikipedia.org/wiki/Monty_Hall_problem)
- ③ **Bayes** ne publie jamais son théorème ; son ami Richard Price le présente à la Royal Society en 1763, après sa mort. [V] [Thomas Bayes](https://en.wikipedia.org/wiki/Thomas_Bayes)

**Dénombrement** (`denombrement`)
- ① **Ibn Mun'im** (mort en 1228, enseigne à **Marrakech**), *Fiqh al-ḥisāb* : premier traité à consacrer un chapitre entier à la combinatoire, avec un triangle arithmétique et le comptage des « mots » possibles. [S] [Ahmad ibn Munim al-Abdari](https://en.wikipedia.org/wiki/Ahmad_ibn_Munim_al-Abdari), [Muslim Heritage](https://muslimheritage.com/people/scholars/ibn-munim/)
- ② **Ibn al-Bannā' al-Marrākushī** (1256–1321, Marrakech et Fès) donne la formule des combinaisons C(p, k) = p(p−1)…(p−k+1)/k!. [V] [MacTutor](https://mathshistory.st-andrews.ac.uk/Biographies/Al-Banna/)
- ③ Le « triangle de Pascal » était connu bien avant Pascal : commentaires de Pingala, al-Karaji, **Khayyam** (en Iran, « triangle de Khayyam »), Yang Hui. [V] [Pascal's triangle](https://en.wikipedia.org/wiki/Pascal%27s_triangle)

**Arithmétique** (`arithmetique`)
- ① **Euclide** (vers 300 av. J.-C.) : l'algorithme d'Euclide est l'un des plus anciens algorithmes encore en usage ; l'infinité des nombres premiers est au Livre IX, proposition 20. [V] [Euclidean algorithm](https://en.wikipedia.org/wiki/Euclidean_algorithm), [Euclid's theorem](https://en.wikipedia.org/wiki/Euclid%27s_theorem)
- ② **Fermat, lettre à Frénicle du 18 octobre 1640** : il énonce le petit théorème et ajoute qu'il enverrait la démonstration « si je n'appréhendois d'être trop long ». Euler la publie en 1736. [V] [Fermat's little theorem](https://en.wikipedia.org/wiki/Fermat%27s_little_theorem)
- ② L'« identité de Bézout » pour les entiers est due à **Bachet de Méziriac (1624)**. [V] [Bézout's identity](https://en.wikipedia.org/wiki/B%C3%A9zout%27s_identity)
- ③ **RSA, 1977** (Rivest, Shamir, Adleman) : la sécurité de nos paiements repose sur Fermat et Euler. Clifford Cocks l'avait trouvé en secret au GCHQ dès 1973. [V] [RSA](https://en.wikipedia.org/wiki/RSA_cryptosystem)

**Structures algébriques** (`structures-algebriques`)
- ① Pourquoi n'y a-t-il pas de formule pour le degré 5 ? Ruffini (1799, incomplet) et **Abel (1824)** prouvent l'impossibilité ; **Galois** comprend *pourquoi*, avec les groupes, et meurt en duel en 1832 à 20 ans. [V] [Abel–Ruffini](https://en.wikipedia.org/wiki/Abel%E2%80%93Ruffini_theorem), [Galois](https://en.wikipedia.org/wiki/%C3%89variste_Galois)
- ③ **Hamilton, 16 octobre 1843** : en marchant, il trouve i² = j² = k² = ijk = −1 et le *grave* sur une pierre du pont de Broom (Dublin) ; une plaque y est toujours. Une structure où ab ≠ ba. [V] [Broom Bridge](https://en.wikipedia.org/wiki/Broom_Bridge)

**Géométrie dans l'espace** (`geometrie-espace`)
- ① **1637** : Descartes publie la géométrie par coordonnées (*La Géométrie*) ; **Fermat** l'avait trouvée de son côté sans publier. [V] [Cartesian coordinate system](https://en.wikipedia.org/wiki/Cartesian_coordinate_system). [L] La mouche au plafond de Descartes n'est pas sourcée.
- ③ Les vecteurs, produits scalaire et vectoriel, sont nés des quaternions de Hamilton, simplifiés par **Gibbs et Heaviside**, puis codifiés dans *Vector Analysis* (1901). [V] [Vector calculus](https://en.wikipedia.org/wiki/Vector_calculus). **Grassmann** (1844) avait tout vu, sans être reconnu ; il se tourne vers la linguistique. [V] [Grassmann](https://en.wikipedia.org/wiki/Hermann_Grassmann)

### 5.2 Physique-chimie

**Ondes mécaniques progressives et périodiques** (`ondes-mecaniques-progressives`, `ondes-mecaniques-periodiques`)
- ① **Académie des sciences, 1738** : des tirs de canon chronométrés donnent 332 m/s à 0 °C, à 1 % près de la valeur moderne. [V] [Speed of sound](https://en.wikipedia.org/wiki/Speed_of_sound)
- ② **Colladon et Sturm, lac Léman, 1826** : un levier fait sonner une cloche *sous l'eau* et allume de la poudre *au-dessus* ; on chronomètre l'écart entre l'éclair et le son. C'est la première vitesse du son dans l'eau. [V] (même source), [Colladon](https://en.wikipedia.org/wiki/Jean-Daniel_Colladon)
- ③ **1er novembre 1755** : le séisme de Lisbonne et son tsunami frappent aussi le Maroc (environ 10 000 morts de plus, selon certaines sources). [V] [1755 Lisbon earthquake](https://en.wikipedia.org/wiki/1755_Lisbon_earthquake). **Mohorovičić (1909)** lit dans les ondes d'un séisme croate la frontière croûte–manteau ; **Inge Lehmann (1936)** y découvre le noyau interne. [V] [Mohorovičić](https://en.wikipedia.org/wiki/Andrija_Mohorovi%C4%8Di%C4%87), [Lehmann](https://en.wikipedia.org/wiki/Inge_Lehmann)

**Propagation de la lumière, diffraction** (`propagation-onde-lumineuse`)
- ① **Ibn al-Haytham**, *Kitāb al-Manāẓir* (≈ 1011–1021) : contre Euclide et Ptolémée, la vision vient de la lumière qui *entre* dans l'œil ; il décrit la chambre noire. [V] [Book of Optics](https://en.wikipedia.org/wiki/Book_of_Optics)
- ② **Fresnel contre Poisson, 1818–1819** : partisan des corpuscules, Poisson croit réfuter la théorie ondulatoire de Fresnel. Elle prédirait un *point brillant au centre de l'ombre* d'un disque, ce qui lui paraît absurde. **Arago fait l'expérience : le point est là.** [V] [Arago spot](https://en.wikipedia.org/wiki/Arago_spot)
- ③ **Rømer, 1676** : les éclipses de Io prennent du retard quand la Terre s'éloigne de Jupiter ; la lumière met ≈ 22 min pour traverser l'orbite terrestre. **Fizeau, 1849** : une roue dentée entre Suresnes et Montmartre (8 633 m). [V] [Rømer](https://en.wikipedia.org/wiki/R%C3%B8mer%27s_determination_of_the_speed_of_light), [Fizeau](https://en.wikipedia.org/wiki/Fizeau%27s_measurement_of_the_speed_of_light_in_air). Young, l'homme des fentes, a aussi aidé à déchiffrer la pierre de Rosette. [V] [Thomas Young](https://en.wikipedia.org/wiki/Thomas_Young_(scientist))

**Ondes électromagnétiques, modulation** (`ondes-em-modulation`)
- ① **Hertz, 1886–1887** : des étincelles d'une bobine en font jaillir dans une autre, à distance ; ce sont les ondes de Maxwell. Interrogé sur les applications : « It's of no use whatsoever… ». [V] [Heinrich Hertz](https://en.wikipedia.org/wiki/Heinrich_Hertz)
- ③ **Marconi, 1901**, première liaison radio transatlantique ; Nobel 1909 avec Braun. [V] [Marconi](https://en.wikipedia.org/wiki/Guglielmo_Marconi). [L] La « première émission musicale » de Fessenden (Noël 1906) est une affirmation tardive mal documentée. [V] [Fessenden](https://en.wikipedia.org/wiki/Reginald_Fessenden)

**Décroissance radioactive ; noyaux, masse, énergie** (`decroissance-radioactive`, `noyaux-masse-energie`)
- ① **Becquerel, 26–27 février 1896** : il croit que l'uranium n'émet qu'après exposition au soleil. Le ciel est couvert, les plaques restent dans un placard. Développées le 1er mars, elles montrent des ombres **aussi nettes qu'au soleil**. [V] [Henri Becquerel](https://en.wikipedia.org/wiki/Henri_Becquerel)
- ② **Rutherford** constate qu'un échantillon met toujours le même temps à perdre la moitié de son activité ; il forge le terme « demi-vie » (half-life period, 1907). [V] [Half-life](https://en.wikipedia.org/wiki/Half-life), [Rutherford](https://en.wikipedia.org/wiki/Ernest_Rutherford). Le mot « isotope » (« même place ») est proposé à Soddy en 1913 par une médecin écrivaine, **Margaret Todd**. [V] [Isotope](https://en.wikipedia.org/wiki/Isotope)
- ③ **Libby, 1949** : pour tester la datation au carbone 14, il mesure du bois des tombes des pharaons **Djéser et Snéfrou** (≈ 2625 ± 75 av. J.-C.) et trouve ≈ 2800 ± 250 av. J.-C. Nobel de chimie en 1960. [V] [Radiocarbon dating](https://en.wikipedia.org/wiki/Radiocarbon_dating)
- ③ **Meitner et Frisch, fin décembre 1938**, interprètent l'expérience de Hahn et nomment la « fission » (*Nature*, février 1939). Hahn reçoit seul le Nobel 1944 ; Meitner avait été nommée 49 fois. [V] [Lise Meitner](https://en.wikipedia.org/wiki/Lise_Meitner). [S] Les carnets de Marie Curie seraient encore radioactifs et conservés dans des boîtes plombées à la BnF ([CSMonitor 2011](https://www.csmonitor.com/Innovation/Horizons/2011/1107/Marie-Curie-Why-her-papers-are-still-radioactive)).

**Dipôles RC, RL, RLC** (`rc-charge`, `dipole-rl`, `rlc-serie`)
- ① **La bouteille de Leyde, 1745–1746**, premier condensateur. Musschenbroek à Réaumur : « Tout à coup ma main droite fut frappée avec tant de violence, que j'eus tout le corps ébranlé comme d'un coup de foudre. » [V] [Bouteille de Leyde (fr)](https://fr.wikipedia.org/wiki/Bouteille_de_Leyde). En 1746, l'abbé **Nollet** fait passer la décharge par environ 200 moines reliés par des fils de fer sur ≈ 1,6 km. [V] [Nollet](https://en.wikipedia.org/wiki/Jean-Antoine_Nollet)
- ② **Faraday, 1831**, induction : ancien apprenti relieur sans formation universitaire. **Henry** découvre l'auto-induction de son côté (d'où l'unité, le henry). [V] [Faraday](https://en.wikipedia.org/wiki/Michael_Faraday), [Henry](https://en.wikipedia.org/wiki/Joseph_Henry)
- ③ **Kelvin (1853)** prédit l'oscillation de la décharge dans une bobine ; **Feddersen (1857)** la photographie ; c'est le RLC. [V] [LC circuit](https://en.wikipedia.org/wiki/LC_circuit)

**Lois de Newton, chute, mouvements plans, satellites** (`lois-de-newton`, `chute-mouvements-plans`, `atome-mecanique-newton`)
- [L] → [V] **La tour de Pise de Galilée** est probablement une expérience de pensée (récit tardif de Viviani). En revanche, **Stevin et de Groot ont vraiment lâché deux boules de plomb** du clocher de Delft, et l'ont publié en 1586. [V] [Leaning Tower experiment](https://en.wikipedia.org/wiki/Galileo%27s_Leaning_Tower_of_Pisa_experiment)
- ② **Apollo 15, 2 août 1971**, fin de la dernière sortie : David Scott lâche un marteau de 1,32 kg et une plume de faucon de 0,03 kg ; ils touchent le sol ensemble, « as Galileo had concluded ». [V] [NASA NSSDC](https://nssdc.gsfc.nasa.gov/planetary/lunar/apollo_15_feather_drop.html)
- ① **Halley, août 1684**, va demander à Newton à Cambridge quelle orbite produit une attraction en 1/r². Newton a déjà résolu le problème sans le publier ; Halley l'encourage et finance en partie les *Principia* (1687). [V] [Edmond Halley](https://en.wikipedia.org/wiki/Edmond_Halley). Le **canon de Newton** (qui tire assez vite ne retombe jamais) vient de *De mundi systemate*, publié en 1728. [V] [Newton's cannonball](https://en.wikipedia.org/wiki/Newton%27s_cannonball)
- ③ **Arthur C. Clarke, *Wireless World*, octobre 1945** : des satellites géostationnaires à ≈ 36 000 km pour relayer les télécommunications. L'UAI appelle cette orbite « orbite de Clarke ». [V] [Arthur C. Clarke](https://en.wikipedia.org/wiki/Arthur_C._Clarke). Lien marocain : **Mohammed VI-A**, satellite d'observation de la Terre lancé le 8 novembre 2017 par Vega depuis Kourou. [V] [Mohammed VI-A](https://en.wikipedia.org/wiki/Mohammed_VI-A). Bonne question d'élève : pourquoi un satellite d'observation fine n'est-il pas géostationnaire ?
- ② **Kepler, *Astronomia nova*, 1609** : l'orbite de Mars est une ellipse, tirée des données de Tycho Brahe. [V] [Kepler's laws](https://en.wikipedia.org/wiki/Kepler%27s_laws_of_planetary_motion)

**Systèmes oscillants ; rotation** (`systemes-oscillants`, `rotation-axe-fixe`)
- ① **Galilée, 1581**, étudiant en médecine, chronomètre au pouls un lustre qui se balance à la cathédrale de Pise : grande ou petite amplitude, même durée (récit de Viviani). [V] [Galileo](https://en.wikipedia.org/wiki/Galileo_Galilei)
- ② **Hooke publie sa loi en 1676 sous forme d'anagramme latine** pour garder la priorité, et la dévoile en 1678 : *ut tensio, sic vis* (« telle extension, telle force »). [V] [Hooke's law](https://en.wikipedia.org/wiki/Hooke%27s_law)
- ③ **Richer, Cayenne, 1671–1673** : le pendule battant la seconde doit y être raccourci de 1,25 ligne par rapport à Paris. Newton en déduit que la Terre est renflée à l'équateur. [V] [Jean Richer](https://en.wikipedia.org/wiki/Jean_Richer). **Huygens** brevète l'horloge à pendule en 1657, l'horloge la plus précise pendant près de 300 ans. [V] [Huygens](https://en.wikipedia.org/wiki/Christiaan_Huygens). **Foucault, 1851** : un pendule prouve que la Terre tourne. [V] [Foucault pendulum](https://en.wikipedia.org/wiki/Foucault_pendulum)

**Atome et quantification** (`atome-mecanique-newton`)
- ① **Balmer, 1885**, professeur dans une école de filles à Bâle, à 60 ans, trouve une formule empirique pour les raies de l'hydrogène, sans savoir pourquoi elle marche. [V] [Balmer](https://en.wikipedia.org/wiki/Johann_Jakob_Balmer)
- ② **Rutherford sur les alphas rebondissant sur l'or** : « as if you fired a 15-inch shell at a piece of tissue paper and it came back and hit you ». [V] [Rutherford](https://en.wikipedia.org/wiki/Ernest_Rutherford)
- ③ **Bohr, 1913**, explique la formule de Balmer avec des niveaux quantifiés. [V] [Bohr model](https://en.wikipedia.org/wiki/Bohr_model)

**Cinétique, catalyse** (`transformations-lentes-rapides`, `suivi-temporel-vitesse`, `controle-catalyse`)
- ① **Wilhelmy, 1850** : il suit au polarimètre la transformation du sucre en milieu acide. C'est la première loi de vitesse mesurée. [V] [Ludwig Wilhelmy](https://en.wikipedia.org/wiki/Ludwig_Wilhelmy)
- ② **Döbereiner, 1823** : un briquet où un fil de platine enflamme l'hydrogène sans être consommé ; des centaines de milliers sont vendus dès 1828. **Berzelius** nomme le phénomène « catalyse » en 1835. [V] [Döbereiner](https://en.wikipedia.org/wiki/Johann_Wolfgang_D%C3%B6bereiner), [Catalysis](https://en.wikipedia.org/wiki/Catalysis)
- ③ **Haber, été 1909** : de l'ammoniac tiré de l'air « goutte à goutte », ≈ 125 mL/h ; Mittasch trouve le catalyseur au fer bon marché ; usine d'Oppau en 1913. [V] [Haber process](https://en.wikipedia.org/wiki/Haber_process). Le Français **Sabatier** (Toulouse) obtient le Nobel 1912 pour l'hydrogénation catalysée par les métaux. [V] [Sabatier](https://en.wikipedia.org/wiki/Paul_Sabatier_(chemist))

**Transformations dans les deux sens, équilibre, évolution spontanée** (`transformations-deux-sens`, `etat-equilibre`, `evolution-spontanee`)
- ① **Berthollet**, membre de l'expédition d'Égypte (1798–1801), défend que les réactions sont réversibles. [V] [Berthollet](https://en.wikipedia.org/wiki/Claude_Louis_Berthollet). [S] Le récit classique du natron des lacs égyptiens n'a pas été confirmé ici.
- ② **Guldberg et Waage, 1864**, loi d'action de masse : l'équilibre est *dynamique*, avec deux vitesses égales. Van 't Hoff y arrive seul en 1877. [V] [Law of mass action](https://en.wikipedia.org/wiki/Law_of_mass_action)
- ③ **Le Chatelier, 1884.** [V] [Le Chatelier's principle](https://en.wikipedia.org/wiki/Le_Chatelier%27s_principle)

**Acides et bases** (`reactions-acido-basiques`)
- ① **Sørensen, 1909**, au **laboratoire Carlsberg** (la brasserie) : il invente le pH, d'abord noté « pH• ». [V] [pH](https://en.wikipedia.org/wiki/PH)
- ② **Arrhenius, 1884** : sa thèse sur la dissociation ionique obtient la note la plus faible (quatrième classe, *non sine laude approbatur*). Nobel en 1903, premier lauréat suédois. [V] [Arrhenius (fr)](https://fr.wikipedia.org/wiki/Svante_Arrhenius)
- ③ **Brønsted et Lowry, 1923**, chacun de son côté : l'acide *donne* un proton. [V] [Brønsted–Lowry](https://en.wikipedia.org/wiki/Br%C3%B8nsted%E2%80%93Lowry_acid%E2%80%93base_theory)

**Piles, électrolyse** (`piles`, `electrolyse`)
- ① **Galvani, 1780** : des cuisses de grenouilles mortes se contractent (publié en 1791). **Volta** y voit un effet des deux métaux et décrit sa pile à la Royal Society le **20 mars 1800**. [V] [Galvani](https://en.wikipedia.org/wiki/Luigi_Galvani), [Voltaic pile](https://en.wikipedia.org/wiki/Voltaic_pile)
- ② **Davy, 1807** : avec la pile, il isole le potassium et le sodium par électrolyse, éléments que la chimie ne savait pas séparer. [V] [Humphry Davy](https://en.wikipedia.org/wiki/Humphry_Davy)
- ③ **Hall et Héroult, 1886**, chacun de son côté, **tous deux âgés de 22 ans**, inventent l'électrolyse de l'aluminium. Avant cela, l'aluminium était si précieux qu'on en coiffa le Washington Monument (achevé en 1884–1885). [V] [Hall–Héroult](https://en.wikipedia.org/wiki/Hall%E2%80%93H%C3%A9roult_process), [Aluminium](https://en.wikipedia.org/wiki/Aluminium). **Goodenough**, Nobel 2019 (batteries lithium-ion) à 97 ans, le plus âgé de l'histoire. [V] [Goodenough](https://en.wikipedia.org/wiki/John_B._Goodenough)

**Estérification, hydrolyse, savons** (`esterification-hydrolyse`)
- ① **Berthelot et Péan de Saint-Gilles, 1862**, *Recherches sur les affinités* : l'acide et l'alcool ne réagissent jamais totalement, ils atteignent un équilibre qui dépend des quantités. [S] [Péan de Saint-Gilles](https://en.wikipedia.org/wiki/L%C3%A9on_P%C3%A9an_de_Saint-Gilles). Les « 2/3 » pour un mélange équimolaire se *calculent* avec K = 4, ce qui fait un bon pari d'élève.
- ② **Chevreul** montre (1823) que les graisses sont des esters du glycérol et d'acides gras, ce qui révolutionne savons et bougies ; il vit jusqu'à 102 ans. [V] [Chevreul](https://en.wikipedia.org/wiki/Michel_Eug%C3%A8ne_Chevreul)
- ③ **L'aspirine, 1897** (Hoffmann, ou peut-être Eichengrün, chez Bayer) : un ester de l'acide salicylique, dont l'écorce de saule était utilisée depuis au moins 2 400 ans (papyrus Ebers). **Fischer et Speier** décrivent l'estérification catalysée par l'acide en 1895. [V] [Aspirin](https://en.wikipedia.org/wiki/Aspirin), [Fischer–Speier](https://en.wikipedia.org/wiki/Fischer%E2%80%93Speier_esterification)

### 5.3 SVT

**Libération de l'énergie, respiration, fermentation, muscle** (`liberation-energie-matiere-organique`)
- ① **Lavoisier et Laplace, 1783** : un cobaye dans un calorimètre à glace. La chaleur dégagée est comparée au CO₂ produit, d'où « la respiration est donc une combustion, à la vérité fort lente » (phrase attribuée). [S] [Calorimetry](https://en.wikipedia.org/wiki/Calorimetry), [ISBC, histoire](https://isbc.biocalorimetry.org/history/)
- ② **Pasteur, 1861** : des micro-organismes vivent et fermentent **sans oxygène libre**, d'où la formule « la fermentation… c'est la vie sans air » (*Études sur la bière*, 1876, formulation variable). [S] **Buchner, 1897** : du « jus » de levure *sans cellule* fermente encore le sucre, la chimie sans la vie ; Nobel 1907. [V] [Eduard Buchner](https://en.wikipedia.org/wiki/Eduard_Buchner)
- ② **Krebs, juin 1937** : *Nature* refuse sa lettre sur le cycle de l'acide citrique (manque de place) ; elle paraît dans *Enzymologia*. Nobel en 1953. [S] [The Scientist](https://www.the-scientist.com/uncategorized/nature-rejects-krebss-paper-1937-43452). **Peter Mitchell** propose la chimiosmose (1961), jugée hérétique ; il poursuit dans un laboratoire privé, Glynn House (Cornouailles) ; Nobel 1978. [V] [Peter D. Mitchell](https://en.wikipedia.org/wiki/Peter_D._Mitchell)
- ③ **1954** : deux équipes (A. Huxley et Niedergerke ; H. Huxley et Hanson, deux Huxley sans lien de parenté) proposent indépendamment le **glissement des filaments** du muscle. [V] [Sliding filament theory](https://en.wikipedia.org/wiki/Sliding_filament_theory). **Lipmann** invente la notation « ~ » de la liaison riche en énergie de l'ATP. [V] [Fritz Lipmann](https://en.wikipedia.org/wiki/Fritz_Lipmann)

**Rôle des enzymes** (`role-enzymes`)
- ① **Payen et Persoz, 1833** (Paris) : la diastase, première enzyme isolée. **Kühne** forge le mot « enzyme » en 1878. [V] [Payen](https://en.wikipedia.org/wiki/Anselme_Payen), [Kühne](https://en.wikipedia.org/wiki/Wilhelm_K%C3%BChne)
- ② **Fischer, 1894** : la « clé et la serrure ». **Koshland, 1958** : l'ajustement induit. [V] [Enzyme / Lock and key](https://en.wikipedia.org/wiki/Enzyme)
- ③ **Sumner, 1926** cristallise l'uréase et prouve qu'une enzyme est une protéine. Il avait perdu le bras gauche à 17 ans, et ses collègues jugeaient le projet impossible. Nobel 1946. [V] [James B. Sumner](https://en.wikipedia.org/wiki/James_B._Sumner). **Michaelis et Menten (1913)** prolongent l'équation du Français **Victor Henri (1902)**. [V] [Michaelis–Menten](https://en.wikipedia.org/wiki/Michaelis%E2%80%93Menten_kinetics)

**Transmission des caractères, génétique humaine** (`transmission-caracteres`, `genetique-humaine`)
- ① **Mendel**, de 1856 à 1863, cultive ≈ 28 000 plantes, surtout des pois. Il présente ses résultats à Brno les 8 février et 8 mars 1865, publie en 1866, puis personne n'y prête attention pendant 34 ans. En 1900, **de Vries, Correns et Tschermak** le redécouvrent chacun de leur côté. [V] [Gregor Mendel](https://en.wikipedia.org/wiki/Gregor_Mendel)
- ② **Sturtevant, 1911**, étudiant dans la « salle des mouches » de Morgan : « I went home, and spent most of the night (to the neglect of my undergraduate homework) in producing the first chromosome map » (publiée en 1913). [V] [Encyclopedia.com](https://www.encyclopedia.com/people/history/historians-miscellaneous-biographies/ah-sturtevant), [Sturtevant](https://en.wikipedia.org/wiki/Alfred_Sturtevant)
- ② **Garrod, 1902** : l'alcaptonurie est plus fréquente chez les enfants de cousins germains, d'où l'« erreur innée du métabolisme ». C'est la génétique humaine appliquée aux familles. [V] [Archibald Garrod](https://en.wikipedia.org/wiki/Archibald_Garrod)
- ③ **Trisomie 21, 1959** : découverte attribuée à Lejeune ; **Marthe Gautier**, qui avait préparé les lames, en revendiquera le crédit. [V] [Marthe Gautier](https://en.wikipedia.org/wiki/Marthe_Gautier). **L'hémophilie de la reine Victoria** : l'analyse des restes des Romanov montre que c'était l'hémophilie B. [V] [Haemophilia in European royalty](https://en.wikipedia.org/wiki/Haemophilia_in_European_royalty). **Miescher, 1869**, isole l'ADN (« nucléine ») à partir du pus de bandages d'hôpital. [V] [Miescher](https://en.wikipedia.org/wiki/Friedrich_Miescher). **Hershey et Chase (1952)** séparent virus et bactéries… au mixeur. [V] [Hershey–Chase](https://en.wikipedia.org/wiki/Hershey%E2%80%93Chase_experiment)

**Génétique des populations** (`genetique-populations`)
- ① **Hardy, 1908** : un mathématicien « pur », fier de l'inutilité de ses travaux, résout en une page le problème que lui pose son partenaire de **cricket**, le généticien Punnett. Weinberg y arrive seul la même année. [V] [G. H. Hardy](https://en.wikipedia.org/wiki/G._H._Hardy), [Hardy–Weinberg](https://en.wikipedia.org/wiki/Hardy%E2%80%93Weinberg_principle)
- ② **La phalène du bouleau** : la forme sombre explose à Manchester dès 1848 avec la suie industrielle. Tutt (1896) y voit la sélection naturelle ; Kettlewell la teste de 1953 à 1956. [V] [Peppered moth](https://en.wikipedia.org/wiki/Peppered_moth_evolution)
- ③ **Pingelap, typhon de 1775** : ≈ 20 survivants, dont un porteur. Quatre générations plus tard, 2,7 % des habitants sont totalement daltoniens (achromatopsie), aujourd'hui ≈ 10 %. C'est l'**effet fondateur** par excellence. [V] [Pingelap](https://en.wikipedia.org/wiki/Pingelap). **Drépanocytose et paludisme (1954)** : les porteurs sont protégés, d'où la persistance de l'allèle. [V] [Sickle cell disease](https://en.wikipedia.org/wiki/Sickle_cell_disease)

**Immunologie : soi et non-soi, moyens de défense, dysfonctionnements** (`soi-non-soi`, `moyens-de-defense`, `dysfonctionnements-immunitaires`)
- ① **al-Rāzī (vers 900)** : parmi les premiers médecins à distinguer cliniquement la variole de la rougeole. [V] [Abu Bakr al-Razi](https://en.wikipedia.org/wiki/Abu_Bakr_al-Razi)
- ① **Lady Mary Wortley Montagu** observe la variolisation à Constantinople et la promeut en Grande-Bretagne. **Jenner, 14 mai 1796** : il inocule James Phipps (8 ans) avec la vaccine prise sur la main de la trayeuse Sarah Nelmes, contaminée par la vache Blossom, dont la peau est toujours accrochée à St George's à Londres. [V] [Montagu](https://en.wikipedia.org/wiki/Lady_Mary_Wortley_Montagu), [Jenner](https://en.wikipedia.org/wiki/Edward_Jenner)
- ② **Metchnikoff, 1882, Messine** : sur des larves d'étoile de mer, il découvre la phagocytose. [V] [Metchnikoff](https://en.wikipedia.org/wiki/%C3%89lie_Metchnikoff). **Behring et Kitasato, 1890** : le sérum d'un animal immunisé protège un autre animal (antitoxines). Behring reçoit le premier Nobel de médecine (1901). [V] [Behring](https://en.wikipedia.org/wiki/Emil_von_Behring)
- ② [L] → [V] **Le choléra des poules de Pasteur (1879)** : la culture « oubliée pendant les vacances » est une version simplifiée. Ses carnets parlent d'un retour retardé (mariage de sa fille, santé), et ce vaccin s'est révélé ensuite peu fiable. [V] [Louis Pasteur](https://en.wikipedia.org/wiki/Louis_Pasteur). Une belle leçon : l'histoire réelle est plus intéressante que la légende.
- ③ **Soi et non-soi :** Landsteiner découvre les groupes A, B, O en 1901 (Nobel 1930) [V] [Landsteiner](https://en.wikipedia.org/wiki/Karl_Landsteiner). **Murray, 23 décembre 1954** : première greffe de rein réussie, entre les **jumeaux identiques** Herrick, sans rejet puisque le « soi » est le même (Nobel 1990) [V] [Joseph Murray](https://en.wikipedia.org/wiki/Joseph_Murray). **Burnet (1957)**, sélection clonale [V] [Clonal selection](https://en.wikipedia.org/wiki/Clonal_selection) ; **Medawar**, tolérance acquise, Nobel 1960 avec Burnet [V] [Medawar](https://en.wikipedia.org/wiki/Peter_Medawar).
- ③ **Dysfonctionnements :** **Richet et Portier, 1901–1902**, embarqués sur le *Princesse Alice II* du prince Albert Ier de Monaco pour étudier les toxines de méduses, découvrent l'**anaphylaxie** : une deuxième dose, minime, tue. Nobel 1913. [V] [Anaphylaxis](https://en.wikipedia.org/wiki/Anaphylaxis), [Richet](https://en.wikipedia.org/wiki/Charles_Richet). **Barré-Sinoussi, 1983**, à l'Institut Pasteur : isolement du VIH (Nobel 2008). [V] [Barré-Sinoussi](https://en.wikipedia.org/wiki/Fran%C3%A7oise_Barr%C3%A9-Sinoussi). La variole, ≈ 300 millions de morts au XXe siècle, est déclarée **éradiquée en 1980**. [V] [Smallpox](https://en.wikipedia.org/wiki/Smallpox)

**Géologie : tectonique, chaînes de montagnes, granitisation et métamorphisme** (`theorie-tectonique-plaques`, `chaines-de-montagnes`, `granitisation-deformation`)
- ① **Wegener, 1912** : les continents dérivent. Rejeté faute de mécanisme, il meurt au Groenland en novembre 1930. [V] [Alfred Wegener](https://en.wikipedia.org/wiki/Alfred_Wegener)
- ② **Marie Tharp, 1952** : en alignant des profils d'échosondeur, elle trouve une vallée de rift au milieu de la dorsale atlantique. Heezen balaie d'abord sa découverte comme des « trucs de fille ». [V] [Marie Tharp (fr)](https://fr.wikipedia.org/wiki/Marie_Tharp). **Hess**, commandant d'un navire de guerre, laisse tourner l'échosondeur pendant la guerre, ce qui le mène à *History of Ocean Basins* (1962) et à l'expansion océanique. [V] [Harry Hess](https://en.wikipedia.org/wiki/Harry_Hammond_Hess). **Morley, 1963** : ses lettres sur les bandes magnétiques symétriques sont refusées par *Nature* et *JGR* ; Vine et Matthews publient en septembre. [V] [Vine–Matthews–Morley](https://en.wikipedia.org/wiki/Vine%E2%80%93Matthews%E2%80%93Morley_hypothesis)
- ② **Granitisation : Hutton, été 1785, Glen Tilt** : des filons de granite *recoupent* les schistes. Le granite a donc été fondu, et il est plus jeune, contre les « neptunistes » qui le croyaient précipité de l'eau. [V] [James Hutton](https://en.wikipedia.org/wiki/James_Hutton). **Barrow (1893)** cartographie les zones de métamorphisme par minéraux index dans les Highlands. [V] [George Barrow](https://en.wikipedia.org/wiki/George_Barrow_(geologist)). Les ophiolites se reconnaissent à la « trinité de Steinmann » : serpentine, diabase, radiolarite. [V] [Ophiolite](https://en.wikipedia.org/wiki/Ophiolite)
- ③ **Le Maroc comme terrain :**
  - l'**ophiolite de Bou Azzer** (Anti-Atlas), ≈ 760 millions d'années, compte parmi les plus anciennes du monde, une vieille suture de subduction [S] ([Archimer/Ifremer](https://archimer.ifremer.fr/doc/00636/74780/)) ;
  - le **Haut Atlas** est né en partie de la convergence Afrique–Europe ; le Toubkal culmine à 4 167 m [V] ([Atlas Mountains](https://en.wikipedia.org/wiki/Atlas_Mountains)) ;
  - **Agadir, 29 février 1960** : Mw 5,8, peu profond, 12 000 à 15 000 morts, environ un tiers de la ville [V] ([1960 Agadir earthquake](https://en.wikipedia.org/wiki/1960_Agadir_earthquake)) ;
  - **Al Haouz, 8 septembre 2023** : Mw 6,8 à 6,9 selon les agences, 2 960 morts [V] ([2023 Marrakesh–Safi earthquake](https://en.wikipedia.org/wiki/2023_Marrakesh%E2%80%93Safi_earthquake)).

  À traiter avec tact (deuils récents), mais c'est la tectonique vécue par les élèves.

### 5.4 Légendes et formulations à ne pas présenter comme des faits

| Récit répandu | Ce qui est établi | Usage conseillé |
|---|---|---|
| Galilée lâche des boules du haut de la tour de Pise | Récit tardif de Viviani ; probablement une expérience de pensée. Stevin et de Groot l'ont fait à Delft (1586). | Raconter Delft ; citer Pise comme légende. |
| Gauss, 7 ans, somme 1 + … + 100 | Histoire très embellie (Hayes 2006). | « On raconte que… » |
| La mouche au plafond de Descartes | Non sourcé. | Ne pas utiliser. |
| Pasteur et la culture « oubliée pendant les vacances » | Carnets : retour retardé ; vaccin peu fiable. | Raconter la version des carnets. |
| Musschenbroek : « pas pour le royaume de France » | Non confirmé ici ; la lettre du « coup de foudre » est, elle, citée. | Utiliser la citation vérifiée. |
| Laplace : « doublé la vie des astronomes » | Attribution secondaire (Eves 1969). | « Attribué à Laplace ». |
| Fessenden, première radio musicale (Noël 1906) | Affirmation tardive, mal documentée. | Ne pas présenter comme fait. |
| Berthollet et les lacs de natron | Non confirmé ici. | Rester sur « Berthollet défend la réversibilité ». |
| « On a inventé i pour résoudre x² = −1 » | Faux historiquement : la cubique de Bombelli a forcé i. | **Corriger l'accroche de `nombres-complexes-1`.** |
| Briggs et Napier, un quart d'heure de silence | Récit de seconde main (Lilly). | « Selon un témoin… » |

---

## 6. Risques et garde-fous

- **Le coût.** 50 notions × une figure-clé de 8 à 16 étapes × quelques paris, c'est le problème de Distill. Il faut donc une **grammaire visuelle réutilisable** (étirement d'aire, escalier de demi-vies, rotation de quart de tour, population de dés) et des **gabarits de battement**. Commencer par 3 notions pilotes (logarithme, décroissance, complexes 1), mesurer, puis étendre.
- **L'histoire décorative.** Elle est appliquée par le test du porteur et le budget de 5 % (§4.6) ; la recherche est formelle sur les détails séduisants.
- **Le calme contre le spectacle.** VISION interdit le théâtre de l'engagement. Les paris et les animations lentes *sont* calmes : le contrôle reste à l'élève, sans minuteur ni récompense.
- **La perte de la rédaction bac.** La technique ne disparaît pas, elle *migre* vers la pratique estompée et l'échelle bac. La séparation compréhension / rédaction de ParaMaths en est le modèle.
- **Le sentiment de clarté.** Un élève peut trouver un exposé « clair » et n'avoir rien appris (Muller). Les portes et les tests doivent mesurer la **réussite aux questions de diagnostic**, pas l'appréciation.

---

## 7. Sources

### Leçons et code du dépôt (lus)
- `content/maths/fonction-logarithme/lesson.md`, `content/pc/decroissance-radioactive/lesson.md`, `content/maths/nombres-complexes-1/lesson.md`
- `content/*/*/media/*.stages.json`, `content/*/*/media/*.motion.json`
- `web/src/components/notion/StagedFigure.tsx`, `MotionStage.tsx`, `ExplicationPlayer.tsx`
- `docs/product/VISION.md`

### ParaMaths
- https://paramaths.fr/ · https://paramaths.fr/app · https://paramaths.fr/methode · https://paramaths.fr/ressources/terminale-spe-maths/suites-limites-recurrence
- https://www.youtube.com/@Paramaths_off · https://www.youtube.com/watch?v=6ji7l1xQfmo · https://www.youtube.com/watch?v=TRVdwiY6JPw · https://www.youtube.com/watch?v=Ga15bRV9hN4
- https://www.ludomag.com/2026/10/12/paramaths-tout-le-programme-de-maths-de-la-6e-a-la-prepa-en-acces-libre/

### Autres sources de compréhension
- 3Blue1Brown https://www.3blue1brown.com/about · https://www.youtube.com/@3blue1brown
- Mathologer https://www.youtube.com/@Mathologer · Numberphile https://www.youtube.com/@numberphile
- Veritasium https://www.youtube.com/@veritasium · https://www.youtube.com/watch?v=cUzklzVXJwo
- MinutePhysics https://www.youtube.com/@minutephysics · Kurzgesagt https://www.youtube.com/@kurzgesagt · PBS Space Time https://www.youtube.com/@pbsspacetime
- Science Étonnante https://www.youtube.com/@ScienceEtonnante · Micmaths https://www.youtube.com/@Micmaths · El Jj https://www.youtube.com/@ElJj · Science4All https://www.youtube.com/@Science4All · ScienceClic https://www.youtube.com/@ScienceClic · Passe-Science https://www.youtube.com/@Passescience · DirtyBiology https://www.youtube.com/@DirtyBiology · Yvan Monka https://www.youtube.com/@YMONKA · https://www.maths-et-tiques.fr/
- HHMI BioInteractive https://www.biointeractive.org/ · Amoeba Sisters https://www.youtube.com/@amoebasisters
- Khan Academy https://www.khanacademy.org/ · https://blog.khanacademy.org/?p=21314 · NBER w35620 https://www.nber.org/papers/w35620
- Brilliant https://brilliant.org/ · BetterExplained ADEPT https://betterexplained.com/articles/adept-method/
- Bret Victor https://worrydream.com/ExplorableExplanations/ · Nicky Case https://ncase.me/ · https://explorabl.es/
- Seeing Theory https://seeing-theory.brown.edu/ · Distill https://distill.pub/2021/distill-hiatus/
- PhET https://phet.colorado.edu/ · Wieman et al. 2008 https://doi.org/10.1126/science.1161948 · Podolefsky et al. https://arxiv.org/abs/1306.6544
- Desmos https://blog.desmos.com/articles/desmos-guide-to-building-great-digital-math-2021/ · GeoGebra https://www.geogebra.org/
- Al Daheeh https://www.youtube.com/@Da7ee7 · https://en.wikipedia.org/wiki/Ahmed_El-Ghandour
- AlloSchool https://www.alloschool.com/ · Moutamadris.ma https://moutamadris.ma/ · TelmidTICE https://telmidtice.men.gov.ma/ · Kezakoo / TelmidTICE (Le360) https://fr.le360.ma/societe/greve-des-enseignants-prives-de-cours-les-eleves-se-tournent-vers-lapprentissage-en-ligne_KKN7NE6XDZDSFDCKCRN2WV52Z4/

### Science de l'apprentissage
- Adesope, Trevisan & Sundararajan 2017 — https://doi.org/10.3102/0034654316689306
- Arya & Maul 2012 — https://doi.org/10.1037/a0028108
- Barbieri et al. 2023 — https://doi.org/10.1007/s10648-023-09745-1
- Bastani et al. 2025 (PNAS) — https://doi.org/10.1073/pnas.2422633122 · Wharton : https://knowledge.wharton.upenn.edu/article/without-guardrails-generative-ai-can-harm-education
- Bisra et al. 2018 — https://doi.org/10.1007/s10648-018-9434-x
- Bloom 1984 — https://doi.org/10.3102/0013189X013006004
- Cepeda et al. 2008 — https://doi.org/10.1111/j.1467-9280.2008.02209.x
- Chi et al. 1989 — https://doi.org/10.1207/s15516709cog1302_1
- Clark & Paivio 1991 — https://doi.org/10.1007/BF01320076
- Crouch, Fagen, Callan & Mazur 2004 — https://doi.org/10.1119/1.1707018
- De Simone et al. 2025 (Banque mondiale) — https://doi.org/10.1596/1813-9450-11125 · https://blogs.worldbank.org/en/education/From-chalkboards-to-chatbots-in-Nigeria
- Dunlosky et al. 2013 — https://doi.org/10.1177/1529100612453266
- Fyfe, McNeil, Son & Goldstone 2014 — https://doi.org/10.1007/s10648-014-9249-3
- Gruber, Gelman & Ranganath 2014 — https://doi.org/10.1016/j.neuron.2014.08.060
- Guo, Kim & Rubin 2014 — https://doi.org/10.1145/2556325.2566239 · PDF : https://www.cs.rochester.edu/hci/pubs/pdfs/edX-MOOC-video-production-and-engagement_LAS-2014.pdf
- Harp & Mayer 1998 — https://doi.org/10.1037/0022-0663.90.3.414
- Hasler, Kersten & Sweller 2007 — https://doi.org/10.1002/acp.1345
- Henkel et al. 2024 (Rori) — https://arxiv.org/abs/2402.09809
- Höffler & Leutner 2007 — https://doi.org/10.1016/j.learninstruc.2007.09.013
- Kalyuga et al. 2003 — https://doi.org/10.1207/S15326985EP3801_4
- Kang et al. 2009 — https://doi.org/10.1111/j.1467-9280.2009.02402.x
- Kapur 2008 — https://doi.org/10.1080/07370000802212669
- Kestin et al. 2025 — https://doi.org/10.1038/s41598-025-97652-6 · https://pmc.ncbi.nlm.nih.gov/articles/PMC12179260/
- Kornell, Hays & Bjork 2009 — https://doi.org/10.1037/a0015729
- Kraft 2020 — https://doi.org/10.3102/0013189X20912798
- Kulik, Kulik & Bangert-Drowns 1990 — https://doi.org/10.3102/00346543060002265
- Loewenstein 1994 — https://doi.org/10.1037/0033-2909.116.1.75
- Mayer & Chandler 2001 — https://doi.org/10.1037/0022-0663.93.2.390 · chapitre *Segmenting principle* : https://www.cambridge.org/core/books/multimedia-learning/segmenting-principle/37240877DDA0362355ADB39936027982
- Mayer, Mathias & Wetzell 2002 — https://doi.org/10.1037/1076-898X.8.3.147
- Méta-analyse récit / exposé (2024) — https://www.researchgate.net/publication/384420142
- Muller, Bewes, Sharma & Reimann 2008 — https://doi.org/10.1111/j.1365-2729.2007.00248.x · https://openjournals.library.sydney.edu.au/IISME/article/view/6345
- Nickow, Oreopoulos & Quan 2020 — https://doi.org/10.3386/w27476
- Rey 2012 — https://doi.org/10.1016/j.edurev.2012.05.003
- Rey et al. 2019 — https://doi.org/10.1007/s10648-018-9456-4
- Renkl & Atkinson 2003 — https://doi.org/10.1207/S15326985EP3801_3
- Richland, Kornell & Kao 2009 — https://doi.org/10.1037/a0016496
- Roediger & Karpicke 2006 — https://doi.org/10.1111/j.1467-9280.2006.01693.x
- Rohrer, Dedrick & Stershic 2015 — https://doi.org/10.1037/edu0000001
- Rohrer, Dedrick, Hartwig & Cheung 2020 — https://doi.org/10.1037/edu0000367
- Schneider et al. 2018 — https://doi.org/10.1016/j.edurev.2017.11.001
- Schwan & Riempp 2004 — https://doi.org/10.1016/j.learninstruc.2004.06.005
- Shernoff et al. 2003 — https://doi.org/10.1521/scpq.18.2.158.21860
- Sinha & Kapur 2021 — https://doi.org/10.3102/00346543211019105
- Spanjers, van Gog & van Merriënboer 2010 — https://doi.org/10.1007/s10648-010-9135-6
- Sweller, van Merriënboer & Paas 2019 — https://doi.org/10.1007/s10648-019-09465-5
- Szpunar, Khan & Schacter 2013 — https://doi.org/10.1073/pnas.1221764110
- Tutor CoPilot (J-PAL) — https://www.povertyactionlab.org/evaluation/human-ai-cooperation-improve-tutoring-united-states
- Tversky, Morrison & Bétrancourt 2002 — https://doi.org/10.1006/ijhc.2002.1017
- VanLehn 2011 — https://doi.org/10.1080/00461520.2011.611369
- Willingham 2004 — https://www.aft.org/periodical/american-educator/summer-2004/ask-cognitive-scientist

### Histoire
Les sources sont citées en ligne au §5, une URL par accroche. Sources principales : Wikipédia (en/fr, pages lues et extraits vérifiés), MacTutor (St Andrews), la NASA, *The Scientist*, *American Scientist*, CSMonitor, Archimer/Ifremer.

---

## Annexe A — Commandes de mesure (reproductibles depuis la racine du dépôt)

```bash
# Distribution du nombre d'étapes des figures stagées (255 fichiers)
for f in $(find content -name "*.stages.json"); do
  python3 -c "import json; print(len(json.load(open('$f'))['stages']))"
done | sort -n | uniq -c
#  → 10 × 2 · 162 × 3 · 64 × 4 · 17 × 5 · 1 × 6 · 1 × 7

# Nombre de temps des motions (10 fichiers)
for f in $(find content -name "*.motion.json"); do
  python3 -c "import json; print(len(json.load(open('$f'))['beats']))"
done | sort -n | uniq -c
#  → 3 × 3 · 6 × 4 · 1 × 5

# Mots, points d'arrêt, visuels par leçon (50 leçons ; mots LaTeX compris)
for f in content/{maths,pc,svt}/*/lesson.md; do
  echo "$(wc -w < $f) $(grep -c '\[\[checkpoint' $f) \
$(grep -c '\[\[figure\|\[\[motion\|\[\[embed\|\[\[interactive\|\[\[scene' $f) $f"
done | awk '{s+=$1;c+=$2;g+=$3;n++} END {print s/n, c/n, g/n, n}'
#  → ≈ 6193 mots · ≈ 6,3 points d'arrêt · ≈ 6,2 visuels · 50 leçons

# Équations en bloc et exemples travaillés (leçons lues)
grep -c '^\$\$' content/maths/fonction-logarithme/lesson.md      # → 72
grep -ci 'exemple travaillé' content/maths/fonction-logarithme/lesson.md   # → 14
grep -c '^\$\$' content/maths/*/lesson.md | awk -F: '{s+=$2} END {print s}'   # → 1047

# Durées d'animation par défaut
grep -n "duration" web/src/components/notion/MotionStage.tsx | head
#  → draw 0.6 · trace 0.9 · fill 0.6 · assemble 0.5 · fade 0.45 · morph 0.7 (s)

# Noms historiques cités dans les leçons
grep -ohiE "\b(Napier|Becquerel|Curie|Libby|Bombelli|Cardan|Newton|Rolle|Krebs)\b" \
  content/*/*/lesson.md | sort | uniq -c | sort -rn
```
