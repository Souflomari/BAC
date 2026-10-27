# Audit des pilotes v2 et plan de la V3

> 2026-10-27. Le propriétaire n'a pas le temps de relire la v2 : on l'audite nous-mêmes, puis on fait
> une V3 qui intègre l'audit, les remarques croisées entre matières et des exercices générés. Le
> propriétaire relit **une fois**, la V3.
>
> Les numéros d'étape renvoient au compteur de la v2 (maths 51 étapes, physique 56, SVT 58).

## 1. Comment l'audit a été fait

Trois relecteurs indépendants ont lu le texte intégral des trois pilotes, leur source, le noyau
commun, la bible, le référentiel officiel et les sujets transcrits :

- **pédagogie** : est-ce que la leçon enseigne (ordre, paris, conceptions erronées, rythme) ;
- **interface** : 108 captures d'ordinateur, 16 de téléphone, 16 en thème sombre ;
- **fidélité au bac** : périmètre, notations, exactitude scientifique et historique.

Puis je les ai vérifiés moi-même (§2). Les rapports bruts restent dans l'historique de la séance ;
ce document en garde la synthèse et les décisions.

## 2. Ma vérification

**Confirmé sur pièce :**

- les options des « Vérifie » ne sont jamais mélangées (`noyau.js`, `pariHTML`) : la bonne réponse
  est la n°1 aux 6 questions de maths et à 8 des 9 de physique ;
- l'étape `e` des maths n'a pas de `need` : on la passe sans avoir trouvé e, alors que l'étape
  suivante et le quiz s'en servent ;
- le débordement des dérivations (physique 31 : la question est coupée en haut du panneau) et la
  surimpression des étiquettes (maths 27 : « aire × 1,00 » sous « point : hauteur 0,33 »), vus sur
  les captures ;
- « cinquante ans plus tard » (maths 23) : faux, 1614 → 1647 fait 33 ans ;
- le logarithme décimal est une capacité de la filière sciences expérimentales (`sexp 1.2.18`) ;
  le cadre SM ne le nomme pas, mais ne l'exclut pas non plus (`sm 1.3.9`, `1.3.12`). On ne
  l'affirme donc pas « hors programme SM » ;
- l'expression génétique n'est pas au cadre SM-A (`svt-sma`) : elle concerne SVT et PC.

**Corrigé dans les rapports :**

- **Rutherford (physique 27-28).** Un relecteur doutait des valeurs 0,23 à 118 s et 0,018 à 360 s.
  Elles sont exactes : c'est le tableau III de l'article (*Phil. Mag.* 49, 1900, différence de
  potentiel 100 V), transcrit par l'université Le Moyne (Giunta, *Classic Chemistry*). On garde.
- **Becquerel (physique 4).** « En mai 1896, des sels qui ne luisent pas » n'est pas sûr : les
  sels non phosphorescents apparaissent dans les notes de mars, l'uranium métal en mai. On écrit
  « au printemps 1896 », qui est exact dans les deux cas.

## 3. Les constats retenus

Gravité : **B** bloquant (à corriger avant toute relecture), **I** important, **A** amélioration.

### 3.1 Communs aux trois pilotes

| # | Constat | V3 |
|---|---|---|
| B | Bonne réponse devinable : options jamais mélangées. | Le noyau mélange les options de chaque question à chaque séance (touches 1-2-3 suivent l'ordre affiché). Une question peut garder son ordre (`fixe`) quand les options sont ordonnées (des durées, des pourcentages). |
| B | Dérivations longues : la question est coupée en haut, la fin coupée en bas (physique 26, 31, 32, 36, 39, 44 ; SVT 25 ; fins maths 51 et physique 56). | Panneau plus large, cartes anciennes compactées, bords adoucis, écrans de fin allégés. |
| I | La bonne option est montrée dès la première erreur. | Un second essai : à la première erreur, un indice qui nomme l'erreur sans donner la réponse ; la réponse après. |
| I | Couleurs des choix : le pari choisi est rouge comme une erreur ; un pari « juste » vire au vert ; options non choisies trop pâles (≈ 2,8:1). | Choix = encre ; juste = vert + ✓ ; faux = rouge + ✗ ; un pari n'est jamais noté en couleur ; options non choisies en texte secondaire. |
| I | Trop de rouge (6 à 9 objets rouges par écran). | Au plus 2 objets rouges par scène ; cartes de calcul à barre d'encre sauf la dernière ; étiquettes de date en contour ; soulignement des mots en encre. |
| I | Texte trop étroit (≈ 30 caractères par ligne), coupures dans « demi- / vie », « 2 × 2 / × 2 ». | Colonne de texte ≈ 400 px, taille unique 18-19 px, espaces et traits d'union insécables. |
| I | La SVT rétrécit son texte sur les étapes chargées (20 → 16,5 px). | Une seule taille partout ; le débordement se règle par la mise en page. |
| I | Noms de parties tronqués dans la barre (« La rè… », « Form… », « Messa… »). | Noms courts (≤ 9 lettres), les mêmes mots que le titre de la partie ; libellé toujours entier. |
| I | Formules composées deux fois dans deux polices (scène et panneau), exposants Unicode minuscules. | Les formules vivent dans le panneau (KaTeX) ; la scène montre un résultat, sans exposant Unicode. |
| I | Téléphone : « Suivant » sous la ligne de flottaison ; scène coupée. | Barre Retour / Suivant collée en bas de l'écran ; scène collée en haut pendant la lecture. |
| I | Thème sombre : blanc pur sur noir, aplats invisibles, « Suivant » éblouissant. | Dans les pilotes : encre adoucie, aplats renforcés, bouton principal adouci (jetons existants mélangés, pas de nouvelle couleur). |
| I | Étiquettes qui chevauchent les courbes. | Un halo de fond sous le texte des scènes. |
| I | Chaque pilote enseigne bien, mais les structures divergent (énigme, « ce qu'il faut savoir », retour à l'énigme, « Au bac » n'existent pas partout). | Structure commune (§4.1). |
| I | Des « Vérifie » testent le souvenir d'une phrase, pas son application. | Chaque « Vérifie » est une application ; ses mauvaises options sont des erreurs nommées. |
| I | Séances de 30 à 40 minutes d'un bloc. | 45 à 55 étapes, une pause proposée au milieu. |
| I | Filières absentes. | Affichées sous le titre : maths SM · PC · SVT ; physique SM · PC · SVT ; SVT : SVT · PC. |
| A | Vocabulaire interne visible (« PILOTE », « pas branché dans ce pilote »). | Retirés ; « Pourquoi ce format » devient « Mode d'emploi ». Les exercices existent désormais : la fin de chaque leçon y mène. |
| A | Le début du texte saute d'une étape à l'autre (étapes de texte centrées). | Position de départ fixe pour les étapes de texte. |

### 3.2 Maths — fonction logarithme

| # | Constat | V3 |
|---|---|---|
| B | e n'est pas enseigné à tous (étape 41 sautable ; l'étape 42 et le quiz s'en servent). | L'étape bloque tant que e n'est pas trouvé, avec « Montre-moi » après quelques essais ; e ≈ 2,718 et ln e = 1 sont dits à tous. |
| B | La séance ne couvre qu'une capacité sur quatre (le calcul) ; le profil promet un exercice d'étude de fonction. | La séance gagne ce qui se lit sur la courbe : domaine, signe, croissance, ln a = ln b ⇔ a = b, ln a < ln b ⇔ a < b, et un exemple de bac (équation avec conditions d'existence). Les limites, (ln u)′ et l'étude complète forment une **séance 2 « ln comme fonction »**, annoncée honnêtement (§4.4). |
| I | Le lien pas ↔ aire est dit, pas montré (pas de 1 % ≈ 100 × aire : 70 ↔ 0,69, 110 ↔ 1,10…). | Une étape met les pas de l'élève à côté des aires, avec un pari. |
| I | Domaine et signe passés en aparté. | Une étape « à gauche de 1 » : ln ½ = −ln 2 par les aires, puis pourquoi x ≤ 0 est exclu. |
| I | Quatre règles démontrées à la suite, une seule question ; le piège ln(a + b) découvert en échouant au quiz. | Un pari par règle (ln 8 = 3 ln 2 ou (ln 2)³ ?) ; l'erreur ln(1 + 1) = ln 1 + ln 1 = 0 mise en scène avant le quiz. |
| I | Six étapes sans geste de réflexion (34-39), sur la partie la plus dure. | Un « pourquoi » au milieu (la bande gagnée vaut h × 1/x, h × x ou h ?). |
| I | Pas d'exemple de bac commenté, pas de retour à l'énigme. | « Au bac » : ln(x − 1) + ln(x + 1) = ln 3 (premier geste ? puis ligne à ligne) ; retour au produit 2 718 281 × 3 141 592. |
| A | « Cinquante ans plus tard » ; Stifel (1544) avant Napier ; ]0 ; +∞[ au lieu de ]0,+∞[ des sujets ; log₂ hors programme ; ln(aⁿ) sans domaine de n ; « comme au bac » pour un quiz qui ne l'est pas ; 8 fiches de mots seulement. | Tout corrigé ; fiches ajoutées (tangente, tend vers, ensemble de définition, exposant…). |
| I (interface) | Étapes 7 et 11 : « 4 → pas 2   8 → pas 3 » se lit « pas 28 ». Étapes 26-27 : étiquettes superposées. Étape 31 : les deux morceaux d'aire de la même couleur. | Corrigé. |

### 3.3 Physique — décroissance radioactive

| # | Constat | V3 |
|---|---|---|
| B | Il manque ce qui ouvre chaque exercice du bac : ᴬ_Z X, α / β⁻ / β⁺ / γ, lois de conservation (Soddy), écrire une équation, diagramme (N, Z), choisir un radioélément. | Une partie « Écrire la désintégration » après l'énigme ; le choix du radioélément dans la datation. |
| B | La formule repose sur exp et ln, que l'élève n'a souvent pas vus (le nucléaire vient avant en maths). | On part de « un sixième de ce qui reste » : ΔN = −λ N Δt, d'où dN/dt = −λN ; un détour juste-à-temps sur exp (sautable) ; on vérifie que N₀e^(−λt) est solution. L'écart λ ≈ 0,182 ≠ 1/6 est expliqué. |
| I | La tangente qui donne τ est affirmée, τ / t½ jamais confrontés, tangente de la même couleur que la courbe. | Une étape justifie la tangente ; un « Vérifie » : à t = τ il reste 37 %, 50 % ou 63 % ? |
| I | L'énigme de départ est close à l'étape 7 ; la fin ne revient pas au début. | Énigme : le gaz de Rutherford perd la moitié en une minute, l'uranium de Becquerel émet encore autant aujourd'hui. Pourquoi ? Réponse en fin de leçon. |
| I | Thermoluminescence (hors programme) à la place du choix du radioélément. | Jebel Irhoud reste l'accroche ; la question devient : C-14, K-40 ou tritium ? |
| I | Le calcul de N₀ = (m/M)·N_A est caché dans une raison de ligne. | Une saisie numérique. |
| A | Activité notée A (les sujets écrivent a(t), et A est le nombre de masse) ; « un électron expulsé : c'est le rayonnement » (particule β⁻ ≠ rayonnement γ) ; demi-vie sans définition au format bac ; 11 500 au lieu de 11 460 ; « radon 222 : sujet du bac 2019 » ; « les noyaux d'uranium » (ce sont aussi ses descendants). | Tout corrigé. |
| I (interface) | 14 étapes débordent ; étape 15 : 8 étiquettes en 5 tailles ; « Lancer les dés » gris pâle (≈ 2,3:1). | Corrigé. |

### 3.4 SVT — du gène à la protéine

| # | Constat | V3 |
|---|---|---|
| B | Le vocabulaire noté au bac n'apparaît jamais : nucléotide, triplet, liaison peptidique, initiation / élongation / terminaison, codon d'initiation. L'élève écrit « une lettre a changé » et perd le point. | Les mots du bac partout, « lettre » seulement pour présenter l'idée. |
| I | « Un chromosome est une seule molécule d'ADN » : faux pour un chromosome dupliqué (deux chromatides) ; un chromosome, c'est ADN + protéines ; 46 seulement dans une cellule 2n. | Corrigé. |
| I | Il manque les étapes de la traduction, les sites P et A, la liaison peptidique, le schéma de synthèse (2.2.3, 2.2.4) ; la structure de l'ARNm (ribose). | Phases nommées là où elles se passent ; une étape « schéma » ; ARN vs ADN comparés. |
| I | Étape 25 : la notation c(c(N)), deux lignes au lieu de trois. | Trois lignes alignées : brin non transcrit, brin transcrit, ARNm. |
| I | Numérotation des codons incohérente (depuis AUG ici, depuis Val là). | Une convention, dite une fois, celle des sujets : on compte les triplets depuis le premier montré. |
| A | Ingram (1957) crédité de « 146 » et « n° 6 » (connus en 1959-61) ; « l'ADN ne quitte jamais le noyau » ; la chaîne mature commence par Val ; « partie codante du gène » ; brins non nommés dans l'atelier ; pari de l'étape 13 éventé ; distracteurs 5′/3′ incohérents (26, 55) ; conceptions erronées jamais affrontées (« le ribosome fabrique les acides aminés », « mutation = maladie ») ; l'insertion jamais utilisée. | Tout corrigé. |
| I (interface) | Texte qui rétrécit ; mots écrits dans la police des maths ; ribosome collé au bord. | Corrigé. |

**À garder** (cités par les trois relecteurs) : la table et le dé d'aire, les règles à calcul, la
bande étirée ; les dés et le tic par tic, les mesures de Rutherford avec un pari, « l'expression
littérale d'abord » ; l'atelier de mutation, la partie « Au bac » de la SVT ; les retours qui
nomment l'erreur.

## 4. Plan de la V3

### 4.1 La structure commune

| Partie | Contenu |
|---|---|
| Ce qu'il faut savoir | 2 à 4 étapes en images ; un « Vérifie » permet de les sauter. |
| L'énigme | 3 à 5 étapes, 1 ou 2 paris, pas encore de réponse. |
| Les actes | 6 à 9 étapes chacun : phrase-pont, figure qui change d'une chose à la fois, le nom, le rappel juste-à-temps si besoin, l'erreur classique mise en pari, un « Vérifie ». |
| La formule ou la méthode | au plus 5 lignes, dont une choisie par l'élève. |
| Retour à l'énigme | la réponse, et ce que ça a changé. |
| Au bac | un exercice commenté : « premier geste ? », la solution ligne à ligne, la rédaction attendue. |
| Bilan | trois questions sur les erreurs qui coûtent des points, puis le profil et le lien vers les exercices. |

Règles : jamais plus de 5 étapes sans un geste qui fait réfléchir ; une fiche à la première
apparition de tout mot ou notation qui n'est pas du collège ; un pari reçoit sa réponse ; l'histoire
sert une expérience à prédire, pas une anecdote ; on cite la consigne officielle quand elle existe.

### 4.2 Le noyau (une fois pour les trois)

Mélange des options, second essai, états de choix (encre / ✓ / ✗), taille de texte unique, colonne
de texte plus large, cartes de calcul compactées, bords adoucis, rouge limité, halo sous le texte des
scènes, barre de navigation collée en bas sur téléphone, thème sombre adouci, filières sous le
titre, lien vers les exercices, plus de vocabulaire interne.

### 4.3 Les exercices

Une page par pilote (`/pilote/<notion>/exercices`). Chaque exercice est un gabarit : les nombres
sont tirés au hasard (graine reproductible), la réponse est calculée par le code, jamais saisie à la
main ; chaque mauvaise réponse prévue a son explication. Un vérificateur rejoue 300 tirages de
chaque gabarit dans la CI. Conventions des sujets : constantes prises dans l'énoncé, a(t),
intervalles avec une virgule, « nucléotide » et « triplet ». Un exercice n'interroge que ce que la
séance enseigne ; ceux de la séance 2 des maths sont rangés à part et annoncés comme tels.

| Notion | Exercices |
|---|---|
| Logarithme | ln d'un produit / quotient / puissance ; simplifier (ln √a, ln(1/aʳ), ln eᵖ) ; vrai ou faux sur les règles ; signe et domaine ; équations avec conditions d'existence ; inéquations ; logarithme décimal (PC, SVT). Séance 2 : limites, dérivée, tangente, étude. |
| Radioactivité | composition de ᴬ_Z X ; compléter une équation et nommer la désintégration ; fraction restante après n demi-vies ; t½ → λ (unités) ; N₀ depuis m, M, N_A puis a₀ ; instant d'un seuil ; noyaux désintégrés entre deux dates ; datation au carbone 14 ; choisir le radioélément ; un exercice complet au format bac. |
| Expression génétique | brin non transcrit → ARNm ; brin transcrit → ARNm ; ARNm → chaîne d'acides aminés ; anticodon → acide aminé ; type et effet d'une mutation ; délétion ou insertion → nouvelle chaîne ; phases de la traduction ; un exercice complet au format 2026. |

### 4.4 Ce qui est reporté, et pourquoi

- **La séance 2 des maths** (limites, (ln u)′, primitives de u′/u, étude complète) : c'est une
  seconde leçon de 45 à 55 étapes. La construire maintenant doublerait la relecture des maths. Elle
  sera faite au même format si la V3 est validée ; ses exercices sont déjà prêts, rangés à part.
- **Une composition de scène propre au téléphone** : les étiquettes y tombent à 6-8 px (scène
  réduite à 0,4). La V3 colle la scène et la navigation ; recomposer chaque scène pour le téléphone
  est un chantier à part.
- **Le thème sombre de toute l'application** : la V3 adoucit les pilotes seulement ; changer les
  jetons sombres globaux est une décision qui dépasse les pilotes.
- **Le mode concentration** (masquer l'en-tête du site pendant une leçon) : à décider avec le
  reste de la navigation.
