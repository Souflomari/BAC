# 10 — Vidéo, mouvement et pilotage par l’élève

## Synthèse

Sur quatorze sources vidéo examinées couvrant notre programme, huit ont pu être visionnées intégralement image par image (3Blue1Brown en MP4 natif, quatre épisodes CrashCourse, deux extraits NOVA et une leçon Illustrative Mathematics sur PBS LearningMedia, plus notre propre vidéo Manim `bk-2019-n-x1`), tandis que six flux hébergés sur YouTube ou protégés par pare-feu ont été bloqués depuis notre IP cloud (« je n’ai pas pu voir »). Le constat est net : une bonne vidéo scientifique ne gagne jamais par son décor ni son montage, mais aux rares secondes où **deux représentations bougent ensemble** (vecteur vitesse collé à la position chez 3Blue1Brown, raccourcissement d’échelle en continu, séparation physique des homologues). À l’inverse, notre parcours complet des neuf leçons `/pilote/<nom>` à `1280 × 800` et `390 × 844` révèle que les six nouvelles leçons v3 sont immobiles sur **71 % à 88 % de leurs étapes** (`51 / 58` sur `dipole-rc`, `49 / 59` sur `transmission`), avec des tunnels de 9 à 13 étapes devant la même figure figée. Pour un téléphone moyen et un forfait mobile marocain prépayé, la réponse n’est pas d’alourdir le produit avec des fichiers `.mp4` passifs (notre propre `full.mp4` pèse 2,5 Mo pour n’afficher que du texte sans aucune figure 3D), mais d’enrichir nos scènes SVG paramétriques (~3,5 Ko chacune, 10,4 Ko pour les trois maquettes réunies) pour que l’élève pilote lui-même les mécanismes continus, comme le montrent les trois maquettes livrées sous `/pilote/maquettes`.

### Les 5 changements qui auraient le plus d’effet

1. **Coupler enfin circuit et courbes dans `dipole-rc`** (parties 04 à 07, où 51 étapes sur 58 sont aujourd’hui sans séquence animée) : montrer simultanément l’arrivée des charges sur A et B, l’extinction du courant $i(t)$ et la montée de $u_C(t)$ (maquette 2).
2. **Rendre la mécanique cellulaire lisible dans `meiose`** (étapes 14 à 29) : distinguer visuellement deux chromatides sœurs unies par un centromère intact, tracer le fuseau et la plaque équatoriale (absente à l’étape 18 alors que le texte dit « Les paires sont sur la plaque » sous un sous-titre resté à « Prophase I »), et comparer côte à côte les deux orientations équiprobables (maquette 1).
3. **Décomposer l’escalier de `suites` en deux gestes visibles et lui opposer un cas divergent** (étapes 10 à 14 et 28 à 33) : montée verticale vers $\mathcal{C}_f$, rabattement horizontal vers $y = x$, chute sur l’axe et jauge d’écart $|u_n - \ell|$ en régime convergent puis divergent (maquette 3).
4. **Abandonner la voie vidéo Manim pour les corrections écrites** (`web/public/explications/maths/geometrie-espace/bk-2019-n-x1/full.mp4` : 2,5 Mo et 1 min 45 s pour écrire des lignes d’algèbre sur la moitié gauche de l’écran en laissant la moitié droite vide), que `.deriv` dans `web/src/components/pilote/noyau.js` réalise déjà en 2 Ko de KaTeX net et interactif.
5. **Casser tout tunnel de plus de 5 étapes sur une scène immobile** (règle à ajouter à la relecture visuelle continue des leçons v3), en particulier dans `transmission` (25 étapes sur 29 devant `echiquier`), `dipole-rc` (11 étapes devant `courbe`) et `exponentielle` (12 étapes devant `miroir`).

---

## Partie 1 — Regarder, puis dire ce qui marche

### 1.1. Douze vidéos du programme chez sept producteurs (et un témoin interne)

**Note de méthode et d’honnêteté.** Depuis la machine virtuelle Linux cloud de cet environnement, toute lecture d’un flux hébergé sur `youtube.com` ou `youtube-nocookie.com` renvoie l’écran anti-robot *« Sign in to confirm you’re not a bot »* (`readyState: 0`), qu’il est interdit de contourner. Conformément à la consigne, chaque vidéo dans ce cas porte la mention exacte **« je n’ai pas pu voir »**, sans rien inventer. En revanche, les vidéos distribuées nativement en HTML5/MP4 sans barrière sur `3blue1brown.com` et sur `pbslearningmedia.org` (co-producteur officiel de CrashCourse et diffuseur de NOVA et d’Illustrative Mathematics) ont été visionnées de bout en bout, image par image, avec leurs sous-titres horodatés.

#### A. Vidéos visionnées intégralement

##### 1. 3Blue1Brown — *Exponentielle et dynamique $y' = k\,y$* (`e^(iπ) in 3.14 minutes, using dynamics`)
- **Adresse** : `https://www.3blue1brown.com/lessons/eulers-formula-dynamically/` (séquences MP4 natives `1_img.mp4`, `2_img.mp4`, `-0.5_img.mp4`, `rotate_anim.mp4` ; sur `https://www.3blue1brown.com/lessons/eulers-number/`, seules les figures SVG natives ont pu être lues, le lecteur YouTube `m2MIpDrF7Es` étant bloqué).
- **1. Trois moments où l’on comprend** :
  - `1_img.mp4` à `00:02`–`00:06` : sur la droite graduée $[0 ; 9]$, le vecteur bleu « Position » ($e^t$) pousse sa propre pointe, à laquelle est attaché le vecteur vert « Velocity » de **même longueur** ; on voit physiquement pourquoi grandir fait accélérer.
  - `1_img.mp4` à `00:07`–`00:11` (et `2_img.mp4` à `00:04` et `00:09`) : quand la flèche verte sort du cadre à $e^{1,64} \approx 5,14$, la droite graduée dézoome continûment vers $25, 50, 75$ puis $200, 400, 800$ sans coupe.
  - `-0.5_img.mp4` à `00:00`–`00:08` : le facteur $-0,5$ (« Flip and squish » encadré en jaune) retourne le vecteur vitesse vers $0$ ; plus le point approche de $0$ ($0,88 \to 0,54 \to 0,12$), plus la flèche verte rétrécit, rendant l’asymptote évidente sans calcul.
- **2. Apport propre du mouvement** : le couplage instantané position $\leftrightarrow$ vitesse et le changement continu d’échelle, impossibles à saisir sur deux schémas statiques séparés.
- **3. Rythme** : une seule idée par clip de 8 à 12 s ; la voix pose la règle avant que le compteur numérique ne s’emballe, suivie de 1,5 s de respiration musicale pendant le dézoom.
- **4. Ce qui distrait** : presque rien sur fond noir ; seul le champ dense de vecteurs colorés de `rotate_anim.mp4` (`00:01`–`00:05`) charge un peu l’arrière-plan derrière l’étiquette $e^{i\cdot 1,08}$.
- **5. Ce que la vidéo ne fait pas et que nos leçons font** : le spectateur ne prédit pas le sens du vecteur pour $k = -0,5$ avant de le voir et ne manipule pas $k$ lui-même.

##### 2. CrashCourse Biology #13 (Hank Green) — *Méiose* (`Meiosis: Where the Sex Starts`, 11 min 42 s)
- **Adresse** : `https://www.pbslearningmedia.org/resource/c65df616-fffc-461b-8d70-c13bc4bc4c1a/meiosis-where-the-sex-starts-crash-course-biology-13/`
- **1. Trois moments où l’on comprend** :
  - `02:29`–`02:35` : les 23 paires de chromosomes homologues dessinées par taille décroissante, chaque paire associant deux exemplaires portant les mêmes gènes aux mêmes loci.
  - `05:19`–`05:46` : gros plan sur un bivalent en prophase I où deux chromatides non sœurs (violette et bleue) se croisent et échangent physiquement un segment coloré (*crossover*).
  - `08:06`–`08:24` : passage continu de la métaphase I (paires côte à côte) à l’anaphase I et la télophase I (étirement puis étranglement de la cellule jaune en deux cellules haploïdes).
- **2. Apport propre du mouvement** : conserver l’identité visuelle du segment échangé à travers les deux divisions successives jusqu’aux quatre cellules finales.
- **3. Rythme** : très rapide (~180 mots/min), pratiquement aucune pause entre deux phases ; la voix devance parfois l’animation d’une demi-phrase.
- **4. Ce qui distrait** : l’humour permanent et les coupes face-caméra (`01:05` et `06:56` : clone « John » incrusté sur fond blanc ; `09:52` : quatre déguisements à perruques découpés en bandes verticales en pleine explication de la méiose II).
- **5. Ce que la vidéo ne fait pas et que nos leçons font** : elle ne demande jamais à l’élève si l’anaphase I sépare les homologues ou les chromatides sœurs (le piège n° 1 du bac), et ne montre pas le basculement équiprobable d’une paire sur la plaque.

##### 3. CrashCourse Biology #9 (Hank Green) — *Lois de Mendel* (`Heredity`, 10 min 17 s)
- **Adresse** : `https://www.pbslearningmedia.org/resource/0780890c-f38e-4956-aa8a-89ddd10d6379/heredity-crash-course-biology-9/`
- **1. Trois moments où l’on comprend** :
  - `04:41`–`04:55` : deux oreilles illustrées (« Mom ear » rose / « Dad ear » verte) envoient chacune une pastille d’allèle (`WET` / `DRY`) vers l’enfant.
  - `06:00`–`06:45` : généalogie animée montrant comment un parent hétérozygote `Ww` et un parent homozygote récessif `ww` transmettent un seul allèle chacun par des flèches convergentes.
  - `07:18`–`07:35` : remplissage progressif d’un échiquier de Punnett $2 \times 2$ où les pastilles violettes (`W`) et vertes (`w`) glissent depuis les bords vers les quatre cases pour faire apparaître les proportions $50\,\% / 50\,\%$.
- **2. Apport propre du mouvement** : le glissement des gamètes depuis les en-têtes de lignes et de colonnes vers l’intérieur de chaque case montre d’où vient chaque génotype, au lieu de livrer un tableau déjà rempli.
- **3. Rythme** : soutenu (blocs d’idées de 45 à 60 s entrecoupés de dialogues joués).
- **4. Ce qui distrait** : sketch joué avec son frère (`00:19`, `05:27`, `06:53` : *« if we’re going to do Punnett Squares, I’m leaving! »*) et digression finale sur les cotons-tiges (`09:47`).
- **5. Ce que la vidéo ne fait pas et que nos leçons font** : l’élève ne remplit aucune case de l’échiquier et n’est pas confronté au cas d’un gène létal ($2/3$ au lieu de $3/4$).

##### 4. CrashCourse Biology #11 (Hank Green) — *Expression génétique* (`DNA Transcription and Translation`, 14 min 07 s)
- **Adresse** : `https://www.pbslearningmedia.org/resource/ec22b125-6182-43dc-8aca-8278f5411f66/dna-transcription-and-translation-crash-course-biology-11/`
- **1. Trois moments où l’on comprend** :
  - `03:05`–`03:18` : ouverture locale de la double hélice d’ADN dessinée au trait sur fond sombre, isolant l’unité de transcription.
  - `03:55`–`04:15` et `04:56`–`05:25` : appariement base par base (`A-U`, `C-G`, `T-A`, `G-C`) pendant que l’ARN polymérase ouvre l’ADN devant elle et le referme derrière elle.
  - `09:03`–`10:15` : l’ARNm défile cran par cran (trois bases à la fois) dans le ribosome vert tandis que les ARNt violets entrent par leur anticodon et empilent `MET`, `LEU`, `ARG` en chaîne polypeptidique.
- **2. Apport propre du mouvement** : la translation pas à pas de trois nucléotides (*cadre de lecture*) rend immédiatement sensible pourquoi un décalage d’une base fausse toute la suite.
- **3. Rythme** : l’animation du ribosome (`09:00`–`10:27`, 87 s) ralentit enfin le débit et laisse l’image conduire la voix.
- **4. Ce qui distrait** : un bandeau défilant contenant les 189 819 lettres du nom chimique de la titine court en bas de l’écran pendant **toute** la vidéo (`00:26` à `13:41`) — cas d’école de détail séducteur qui parasite la lecture visuelle — ainsi que l’analogie filée du *Hot Pocket* (`01:19`–`02:49`).
- **5. Ce que la vidéo ne fait pas et que nos leçons font** : dans notre pilote `/pilote/expression-genetique`, l’élève choisit lui-même l’ARNt complémentaire au ribosome et teste l’effet d’une mutation dans l’atelier.

##### 5. CrashCourse Physics #30 (Shini Somara) — *Condensateur* (`Voltage & Capacitors`, 10 min 04 s)
- **Adresse** : `https://www.pbslearningmedia.org/resource/voltage-crash-course-physics/voltage-crash-course-physics/`
- **1. Trois moments où l’on comprend** :
  - `04:00`–`04:18` : entre deux armatures parallèles chargées `+` et `−`, les flèches vertes du champ $\vec{E}$ et les lignes équipotentielles jaunes orthogonales s’installent dans l’espace 3D.
  - `05:44`–`06:05` : connexion d’une pile aux bornes du condensateur montrant le transfert de charges d’une plaque à l’autre tout en conservant une charge nette globale nulle.
  - `07:45`–`08:10` : insertion d’un diélectrique entre les plaques ; les dipôles moléculaires s’orientent et créent un champ opposé qui réduit le champ résultant et permet de stocker davantage de charges.
- **2. Apport propre du mouvement** : le pivotement collectif des dipôles du diélectrique et l’affaiblissement simultané des flèches de champ entre les plaques.
- **3. Rythme** : trop morcelé ; plus de la moitié des 10 minutes est occupée par le plan studio face-caméra (`00:18`–`01:55`, `04:43`, `05:58`–`07:14`), reléguant le circuit lui-même à de courtes incrustations.
- **4. Ce qui distrait** : l’étagère de décor très chargée derrière la présentatrice (ampoules suspendues, Rubik’s cube, maquettes, verrerie) et les fonds dégradés multicolores (`03:27`, `08:29`) qui nuisent au contraste des formules.
- **5. Ce que la vidéo ne fait pas et que nos leçons font** : elle ne trace jamais le régime transitoire $u_C(t)$ et $i(t)$ en direct pendant la charge et ne fait pas vérifier la loi des mailles à l’élève.

##### 6. NOVA / PBS (`Hunting the Elements`) — *Radioactivité et demi-vie* (`Radioactive Decay of Carbon-14`, 03 min 05 s)
- **Adresse** : `https://www.pbslearningmedia.org/resource/nvhe.sci.chemistry.decay/radioactive-decay-of-carbon-14/`
- **1. Trois moments où l’on comprend** :
  - `00:28`–`00:52` : comparaison 3D du noyau stable de carbone 12 (6 protons rouges, 6 neutrons argentés) puis ajout d’un 7e et d’un 8e neutron pour former le carbone 14 instable qui vibre.
  - `02:13`–`02:24` : dans le noyau de $^{14}_{6}\text{C}$, un neutron vire au rouge (proton) en éjectant un électron, pendant que la case périodique en arrière-plan glisse de `6 C` à `7 N` ($\beta^-$).
  - `02:34`–`02:42` : nuage de noyaux de carbone 14 dont la moitié exactement bascule en azote 14 au passage d’une demi-vie.
- **2. Apport propre du mouvement** : relier dans le même plan l’événement microscopique aléatoire (transmutation d’un nucléon) au glissement de numéro atomique $Z \to Z+1$ et à la loi statistique globale.
- **3. Rythme** : deux séquences d’animation très efficaces de 25 s chacune, séparées par une minute entière de reportage extérieur.
- **4. Ce qui distrait** : 60 s de plans de 4×4, de marche au bord du lac Mono et de souches d’arbres (`01:03`–`02:01`) accompagnés d’une nappe sonore dramatique.
- **5. Ce que la vidéo ne fait pas et que nos leçons font** : dans `/pilote/radioactivite`, l’élève lance lui-même les cent dés pour éprouver pourquoi l’imprévisibilité individuelle produit une exponentielle régulière.

##### 7. NOVA / PBS (`Hunting the Elements`) — *Fission et réaction en chaîne* (`A Fission Chain Reaction`, 02 min 44 s)
- **Adresse** : `https://www.pbslearningmedia.org/resource/nvhe.sci.chemistry.fission/a-fission-chain-reaction/`
- **1. Trois moments où l’on comprend** :
  - `00:46`–`00:59` : schéma animé d’un neutron libre frappant $^{235}\text{U}$, qui s’allonge en $^{236}\text{U}$ instable puis éclate en $^{141}\text{Ba}$, $^{92}\text{Kr}$ et trois neutrons rapides.
  - `01:34`–`01:55` : correspondance terme à terme entre le modèle concret (100 tapettes à souris armées de balles de ping-pong sous cloche) et l’animation nucléaire (`1 neutron -> 3 -> 9`).
  - `02:14`–`02:29` : ralenti de la réaction en chaîne déclenchée par une seule balle lâchée par le haut : l’avalanche complète dure moins de deux secondes.
- **2. Apport propre du mouvement** : l’emballement temporel d’une multiplication géométrique dans l’espace réel (une image fixe de tapettes déclenchées ne montre pas la causalité en cascade).
- **3. Rythme** : montage tendu et efficace (préparation concrète $\to$ modèle atomique $\to$ déclenchement réel au ralenti).
- **4. Ce qui distrait** : calembour *« gone fission »* (`01:18`) et décor d’aérodrome militaire avec bombardier B-52 en arrière-plan (`01:06`, `01:58`).
- **5. Ce que la vidéo ne fait pas et que nos leçons font** : aucun bilan de masse $\Delta m$ ni calcul d’énergie libérée en MeV (cœur des sujets du bac marocain dans `/pilote/noyaux`).

##### 8. Illustrative Mathematics / PBS — *Croissance exponentielle et quotients successifs* (`Comparing Quadratic and Exponential Functions`, 26 min 46 s)
- **Adresse** : `https://www.pbslearningmedia.org/resource/im20-math-ep4-64/comparing-quadratic-and-exponential-functions/`
- **1. Trois moments où l’on comprend** :
  - `12:32`–`14:13` : l’enseignante trace au feutre rouge les accolades `× 2` entre les lignes successives du tableau ($1, 2, 4, 8, 16 \dots 256$) face aux figures géométriques qui doublent.
  - `20:54`–`23:01` : placement point par point de $p(x) = 6x^2$ (rose) et $q(x) = 3^x$ (bleu) sur le même repère : $6x^2$ domine de $x = 1$ à $x = 4$ ($96 > 81$), puis $3^x$ la dépasse dès $x = 5$ ($243 > 150$) et s’envole hors cadre à $x = 6$ ($729$ contre $216$).
  - `23:21`–`24:18` : calcul écrit des quotients successifs de $6x^2$ ($\times 4$, puis $\times 2,25$, puis $\times 1,78$ qui s’essoufflent vers $1$) face au facteur constant $\times 3$ de l’exponentielle.
- **2. Apport propre du mouvement** : le geste d’écriture au tableau relie chaque accolade `× 3` ou `× 1,78` à la hauteur du point placé juste à droite.
- **3. Rythme** : lent et scolaire (~125 mots/min), étiré sur près de 27 minutes.
- **4. Ce qui distrait (et révèle la limite de la vidéo)** : six **compteurs à rebours muets** incrustés à l’écran (`04:10` pendant 25 s, `07:31`, `09:12` pendant 33 s, `10:52` pendant 51 s, `19:14` pendant 1 min 21 s, `25:55`) où l’enseignante attend en silence devant la caméra sans savoir si l’élève a fini en 8 secondes ou s’il est bloqué.
- **5. Ce que la vidéo ne fait pas et que nos leçons font** : attendre réellement le clic de l’élève (ni trop tôt, ni trop tard) et diagnostiquer son erreur précise.

##### Témoin interne du dépôt — *Explication vidéo Manim* (`bk-2019-n-x1/full.mp4`, 01 min 45 s, 2,5 Mo)
- **Adresse locale** : `web/public/explications/maths/geometrie-espace/bk-2019-n-x1/full.mp4`
- **Observation directe (`00:00` à `01:44`)** : bien qu’il s’agisse d’un sujet de **géométrie dans l’espace** (plan $(ABC)$ et sphère $(S)$), **la moitié droite de l’écran reste intégralement vide pendant les 105 secondes**. La vidéo se contente de faire apparaître ligne par ligne des puces de calcul algébrique à gauche (`00:06` données, `00:20` produit vectoriel, `00:36` équation du plan, `00:52` complétion des carrés, `01:09` distance, `01:21` conclusion, `01:36` bilan), avec un léger chevauchement transitoire des caractères pendant l’écriture (`00:11`, `00:56`). C’est exactement ce que `.deriv` dans `web/src/components/pilote/noyau.js` accomplit en 2 Ko de KaTeX net, sélectionnable et piloté au clic.

#### B. Producteurs demandés dont le flux vidéo n’a pas pu être vu depuis l’environnement cloud

| Producteur | Notion visée et adresse vérifiée | Constat d’accès |
|---|---|---|
| **Kurzgesagt** | Énergie nucléaire : `https://www.youtube.com/watch?v=pVbLlnmxIbY` et `https://www.youtube.com/watch?v=EhAemz1v7dQ` | **Je n’ai pas pu voir** : hébergé uniquement sur YouTube, bloqué sur l’IP cloud par *« Sign in to confirm you’re not a bot »*. |
| **Veritasium** | Radioactivité : `https://www.youtube.com/watch?v=sehKAccM8p0` (*Radiation vs Radioactive Atoms*) | **Je n’ai pas pu voir** : même blocage anti-robot YouTube sur l’IP cloud. |
| **Khan Academy** | Méiose : `https://fr.khanacademy.org/science/biology/cellular-molecular-biology/meiosis/v/phases-of-meiosis-i` (`youtube-nocookie.com/embed/NTWlhJ0fJMk`) | **Je n’ai pas pu voir le flux vidéo** : la page Khan Academy charge, mais le lecteur embarqué est YouTube (même blocage). |
| **Chaîne francophone de lycée (Yvan Monka)** | Suites récurrentes (escalier) : `https://www.youtube.com/watch?v=LDRx7aS9JsA` (10 min 57 s) | **Je n’ai pas pu voir le flux vidéo** : hébergé sur YouTube (même blocage). |
| **Chaîne / sites marocains de 2e Bac BIOF** | **Noureddine Physique** : `https://www.youtube.com/watch?v=67fcnqyLJ1o` (*Dipôle RC*, 17 min 35 s) et `https://www.youtube.com/watch?v=19802wryS34` (*Décroissance radioactive*, 46 min 25 s) · **Kezakoo** : `https://www.kezakoo.com/unit/2bac/spc/evolution-des-systemes-electriques/` · **AlloSchool** : `https://www.alloschool.com/element/120589` | **Je n’ai pas pu voir** : blocage anti-robot YouTube pour Noureddine Physique ; `HTTP 403 Accès refusé` depuis l’IP cloud sur Kezakoo ; contenu verrouillé « Premium » sur AlloSchool. |

---

### 1.2. Parcours intégral de nos neuf leçons (`/pilote/<nom>`) à `1280 × 800` et `390 × 844`

Les neuf leçons ont été parcourues de la première à la dernière étape dans Chromium aux deux formats, en déroulant chaque dérivation et en commettant d’abord une erreur sur chaque question pour observer le pire cas d’encombrement vertical.

| Leçon (`/pilote/<nom>`) | Étapes | Étapes sans animation ni contrôle | Plus long tunnel sur la même scène | Où l’élève décroche à `1280 × 800` | Où l’élève décroche à `390 × 844` |
|---|---:|---:|---|---|---|
| `logarithme` | 62 | 29 (47 %) | `hyper` : 12 étapes (`19`→`30`) | **Étape 27–30 (`hyper`)** : 12 étapes consécutives sur l’hyperbole $1/x$ finissent par figer l’œil avant la dérivée (`33:derivee`, 822 px). | Très fluide ; seul le début (`2`→`4`) enchaîne 3 écrans passifs avant le premier vrai geste sur la table (`8:pick`). |
| `exponentielle` | 58 | **46 (79 %)** | `miroir` : 12 (`9`→`20`), `expo` : 11 (`23`→`33`) | **Étapes 23–33 (`expo`)** : 11 étapes algébriques devant la même courbe exponentielle quasi immobile ; seulement 3 manipulations sur toute la leçon (plus aucune après l’étape 10 !). | **Étapes 41–46 (`preuve-tangente`, `preuve-course`, `retour-limite`)** : 1 403 à 1 496 px de hauteur de page après erreur sous une scène haute de 42 vh qui ne bouge plus. |
| `suites` | 53 | **42 (79 %)** | `toile` : 11 (`16`→`26`) et 9 (`41`→`49`) | **Étape 10 (`escalier`) puis 16–26 (`toile`)** : à l’étape 10, la bissectrice $y = x$ et $u_0$ en gris très pâle se confondent avec le quadrillé ; de 16 à 26 (la récurrence), la scène reste statique pendant 11 étapes. | **Étape 18 (`heredite`, 1 493 px) et 46 (`bac-2`, 1 496 px)** : long défilement algébrique sous une figure figée ; plus aucune manipulation après `14:u0-curseur`. |
| `radioactivite` | 59 | 40 (68 %) | `loi` : 6 (`28`→`33`) | **Étapes 35–40 (`loi` / `ln2`)** : après l’excellente manipulation des 100 dés (`15`→`20`), la partie « Les grandeurs » aligne des formules sur une courbe figée (`38:ln2` déborde à 851 px). | **Étape 38 (`ln2`, 1 395 px)** : dérivation + retour d’erreur obligent à défiler sous la scène collée. |
| `noyaux` | 59 | **42 (71 %)** | `calcul` : 5 (`9`→`13`) | **Étapes 9–13 (`einstein` → `calcul`, 980 px)** et **32–35 (`bilan-masse`, `deux-routes`)** : la scène n’est qu’un panneau d’équations qui répète le script de droite au lieu de montrer physiquement la séparation et la recombinaison des nucléons. | **Étapes 32 (`bilan-masse`, 1 509 px) et 41 (`fission-bilan`, 1 498 px)** : double lecture d’équations (en haut dans le SVG, en bas dans `.deriv`). |
| `dipole-rc` | 58 | **51 (88 %)** | `courbe` : 11 (`25`→`35`), `circuit` : 9 (`1`→`9`) | **Étapes 25–35 (`verif` → `curseurs`)** : **88 % de la leçon est dépourvue de séquence animée** ; le circuit (étapes 1–9) et la courbe $u_C(t)$ (étapes 25–35) ne sont jamais montrés ensemble, et les repères gris pâle (`tangente`, `2τ`, `86 %` à `32:cinq-tau`) sont à peine lisibles. | **Étapes 25 (`verif`, 1 542 px) et 41 (`energie-etablir`, 1 524 px)** : 4 lignes de dérivation sous une courbe immobile. |
| `expression-genetique` | 57 | **22 (39 %)** | `transl` : 7 (`31`→`37`), `atelier` : 7 (`40`→`46`) | **La meilleure tenue de rythme des neuf leçons** (5 vraies manipulations réparties jusqu’à l’étape 53, 0 débordement à 1280 ni à 390 px). Léger creux uniquement aux étapes passives d’ouverture `2`→`5` (`proteine` → `gene`). | Aucun décrochage mesuré (`0` étape > 1 350 px) : le découpage court répond bien au format téléphone. |
| `meiose` | 58 | **42 (72 %)** | `meiose` : 13 (`7`→`19`) | **Étape 18 (`anaphase1`)** : incohérence texte/scène frappante — le script annonce *« Les paires sont sur la plaque. Que va séparer l’anaphase I ? »* alors que le sous-titre affiche encore **« Prophase I »**, sans plaque équatoriale ni fuseau, et que les 8 chromatides sont empilées comme 8 bâtons horizontaux parallèles où l’élève ne distingue plus deux chromatides sœurs d’une paire d’homologues. | **Étape 29 (`orientation`)** : la scène en haut affiche déjà les 4 cellules finales (`AD B`, `ad b`) au lieu de montrer l’alignement aléatoire sur la plaque dont parle Sutton, et la ligne *« Types de gamètes obtenus »* est coupée par la barre collée du bas. |
| `transmission` | 59 | **49 (83 %)** | `echiquier` : 11 (`2`→`12`) puis 9 (`14`→`22`) | **Étapes 14–22 (`echiquier`)** : 25 des 29 premières étapes restent devant le même échiquier statique ; la liaison génétique et le crossing-over sont traités comme de purs tableaux de nombres sans rappel visuel des chromosomes qui portent les allèles. | **Étape 28 (`demarche`, 1 490 px)** : étape longue sur téléphone au terme de vingt minutes passées devant des grilles rectangulaires. |

---

### 1.3. Dix procédés visuels transposables (classés par coût de production et par apport)

| Rang | Procédé visuel observé | Coût | Apport | Où l’appliquer précisément dans nos leçons |
|---:|---|---|---|---|
| **1** | **Encadrement et pointage direct dans l’équation vers l’objet géométrique** (*signaling* 3Blue1Brown, `1_img.mp4` `00:01`) | Faible | Très fort | **`exponentielle`, étape 25 (`expo` / dérivée $e^x$)** : relier par un trait fin le terme $f(x_0)$ de l’équation de la tangente à la hauteur verticale sur la courbe et la sous-tangente constante de longueur $1$. |
| **2** | **Décomposition d’une itération en deux temps distincts (verticale $\to$ rabattement horizontal $\to$ chute sur l’axe)** | Faible | Très fort | **`suites`, étape 10 (`escalier`)** : remplacer le tracé uniforme par les deux temps articulés + jauge d’écart $|u_n - \ell|$, puis opposer un cas divergent à **`32:sans-point-fixe`** (démontré en maquette 3). |
| **3** | **Glissement animé des gamètes depuis les bords vers les cases de l’échiquier** (CrashCourse #9, `07:23`) | Faible | Fort | **`transmission`, étape 10 (`echiquier`) et étape 26 (`f2-16`)** : faire descendre et glisser les allèles parentaux dans une case choisie par l’élève avant d’afficher le génotype réuni. |
| **4** | **Accolades multiplicatives en direct le long d’une table ou d’un axe** (Illustrative Math, `13:47` et `23:46`) | Faible | Fort | **`logarithme`, étape 4 (`add`) et étape 8 (`pick`)** : animer simultanément l’arc `+` sur la ligne des exposants et l’arc `×` sur la ligne des puissances quand l’élève clique deux colonnes. |
| **5** | **Raccourcissement / dézoom continu des axes sans coupure de plan** (3Blue1Brown, `1_img.mp4` `00:07` et `2_img.mp4` `00:09`) | Moyen | Très fort | **`exponentielle`, étape 43 (`preuve-course`, croissance comparée $e^x / x$)** : dézoomer continûment la fenêtre quand $x$ passe de $2$ à $10$ pour faire voir l’écrasement de la droite $y = x$ par $e^x$. |
| **6** | **Vue couplée « schéma physique + chronogrammes synchronisés par un curseur commun »** | Moyen | Très fort | **`dipole-rc`, étape 17 (`pas`) et étapes 25–34 (`courbe`)** : unir le circuit (charges sur A/B + flèche $i(t)$) et les courbes $u_C(t)$, $i(t)$ pilotées par le même curseur $t/\tau$ (démontré en maquette 2). |
| **7** | **Chromosomes bichromatidiens à centromère explicite + fuseau + bascule d’orientation comparée** (CrashCourse #13, `08:06` + Sutton) | Moyen | Très fort | **`meiose`, étape 18 (`anaphase1`) et étape 29 (`orientation`)** : remplacer les 8 bâtons parallèles par 4 vrais chromosomes bichromatidiens tirés par leurs centromères de part et d’autre de la plaque, avec bascule directe Cas 1 / Cas 2 (démontré en maquette 1). |
| **8** | **Transmutation interne d’un nucléon couplée au déplacement dans le diagramme $(N, Z)$** (NOVA Decay, `02:14`) | Moyen | Fort | **`radioactivite`, étape 9 (désintégration $\beta^-$ / $\alpha$)** : faire basculer un neutron en proton dans le zoom du noyau au moment exact où le point saute d’une case en diagonale $(N-1, Z+1)$ sur la carte $(N, Z)$. |
| **9** | **Séparation puis recombinaison physique des nucléons avec pesée énergétique** | Moyen | Fort | **`noyaux`, étape 16 (`calc-dm`) et étape 35 (`deux-routes`)** : au lieu d’empiler du texte dans la scène `calcul`, écarter les nucléons du noyau sur un plateau puis les réassembler pour visualiser $\Delta m$ et $E_{\text{lib}}$. |
| **10** | **Avance cran par cran d’un cadre de lecture mécanique** (CrashCourse #11, `09:03`–`10:15`) | Moyen | Fort | **`expression-genetique`, étape 41 (`atelier`)** : lors d’une délétion ou insertion d’un nucléotide, faire glisser physiquement tous les crochets de triplets situés à droite de la mutation pour montrer le décalage du cadre de lecture avant la traduction. |

---

## Partie 2 — Ce que nous avons produit (`/pilote/maquettes`)

### Choix du support : SVG paramétrique piloté en direct plutôt que vidéo ou séquence d’images

Les trois maquettes sont isolées dans `web/src/app/pilote/maquettes/page.tsx` et `web/src/components/pilote/maquettes/` sans toucher à aucune leçon existante ni à `web/src/components/pilote/noyau.js`. Nous avons retenu le **SVG codé à état déterministe `etat(u)`** (animé par `requestAnimationFrame` sans rebond) pour quatre raisons vérifiables :
1. **L’élève pilote vraiment** : lecture, pause, pas-à-pas, bascule de régime et curseur continu aller-retour sur toute la chronologie, ce qui est impossible avec une vidéo générée et lourd avec une séquence d’images.
2. **Netteté et jetons natifs** : vectoriel à toute densité de pixels (`viewBox="0 0 760 500"` avec corps $\ge 23$ unités, soit $\ge 10,8\text{ px}$ réels même sur un téléphone de `390 px`), bascule instantanée entre thème clair (`#FAFAF7` / `#FFFFFC`) et thème sombre (`#121210` / `#1A1A17`), un seul accent rouge (`--color-signal`).
3. **Poids dérisoire** : `~3,5 Ko` compressés par maquette (`10,4 Ko` pour les trois maquettes réunies) contre `2,5 Mo` pour une seule vidéo Manim de 1 min 45 s.
4. **Accessibilité native** : avec `prefers-reduced-motion: reduce`, toute transition continue cède la place à des sauts francs entre paliers pédagogiques sans perte d’information.

### Bilan des trois maquettes et coût d’industrialisation à 100 scènes

| Maquette | Ce qui est montré et garanti scientifiquement | Temps passé | Ce qu’il faudrait pour en produire 100 |
|---|---|---:|---|
| **`meiose`** (`web/src/components/pilote/maquettes/MaquetteMeiose.tsx`) | Cellule $2n = 4$ (grande paire $A/a$, petite paire $B/b$) : 4 vrais chromosomes bichromatidiens (2 chromatides sœurs jointes par un centromère unique), dissolution de l’enveloppe nucléaire, appariement en 2 bivalents, alignement des centromères **de part et d’autre** du plan équatorial avec fibres du fuseau, séparation réductionnelle sans clivage des centromères vers 2 cellules $n = 2$ $(A, B)$ et $(a, b)$, puis bascule équiprobable de la petite paire donnant $(A, b)$ et $(a, B)$. *Précision affichée : sans crossing-over pour isoler le brassage interchromosomique.* | **35 min** | **~18 h d’outillage + ~15 min/scène** : extraire 6 primitives SVG biologiques paramétrées (`chromosome`, `bivalent`, `fuseau`, `celluleEnDivision`, `complexeEnzymatique`, `arbrePedigree`) et un script Playwright qui capture automatiquement les 6 paliers à `1280` et `390 px` en vérifiant l’absence de collision de boîtes englobantes (`getBBox()`). |
| **`dipole-rc`** (`web/src/components/pilote/maquettes/MaquetteDipoleRc.tsx`) | Valeurs exactes ($E = 6,0\text{ V}$, $R = 1,0\text{ k}\Omega$, $C = 100\text{ }\mu\text{F}$, $\tau = 0,10\text{ s}$, $I_0 = 6,0\text{ mA}$) : fermeture de $K$, porteurs circulant **uniquement dans les conducteurs métalliques** (jamais à travers le diélectrique) à vitesse proportionnelle à $i(t) = I_0 e^{-t/\tau}$, accumulation simultanée de $+q$ et $-q$ sur $A$ et $B$, flèche $i(t)$ qui s’éteint pendant que $u_C(t)$ grandit, et double chronogramme $u_C(t)$ / $i(t)$ lié par un curseur commun vérifiant $u_C + u_R = E$. | **40 min** | **~20 h d’outillage + ~12 min/scène** : un composant générique `<SystemeCouple schema={…} lois={[uC, i]} />` couvrant d’un coup dipôles RC, RL, oscillations RLC (3 régimes), décroissance $N(t)/a(t)$, chute avec frottement $v(t)/a(t)$ et suivi cinétique/conductimétrique $x(t)$. |
| **`suites`** (`web/src/components/pilote/maquettes/MaquetteSuites.tsx`) | Repère strictement orthonormé sur $[0 ; 6,2]^2$ autour du même point fixe $\ell = 3$ : (1) $f(x) = 0,5x + 1,5$ ($|f'(3)| = 0,5 < 1$, marches qui se resserrent vers $\ell$ avec $u_0 < \ell$ ou $u_0 > \ell$) ; (2) $g(x) = 1,75x - 2,25$ ($|g'(3)| = 1,75 > 1$, marches qui s’éloignent de $\ell$). Chaque marche décompose la verticale vers la courbe et l’horizontale vers $y = x$, projette $u_n$ sur l’axe et met à jour les barres d’écart $|u_n - 3|$. | **30 min** | **~10 h d’outillage + ~5 min/scène** : un moteur déclaratif unique de repère mathématique (`courbes`, `droites`, `escalier`, `tangente`, `aireIntegrale`, `asymptote`) alimenté par de simples fiches de paramètres vérifiées par `pilotes-exercices.mjs`. |

---

## Partie 3 — Trancher

### 3.1. Faut-il de vraies vidéos dans le produit, ou seulement des animations qui répondent à l’élève ? Quel budget poids au Maroc ?

**Tranché : pas de fichiers vidéo dans le cœur des leçons ni pour les corrigés de calcul ; des animations vectorielles pilotées par l’élève partout, et au plus de très courtes capsules d’expériences réelles en option.**

- **La preuve par notre propre dépôt** : `web/public/explications/maths/geometrie-espace/bk-2019-n-x1/full.mp4` pèse **2,5 Mo** (et ses 9 segments totalisent **2,7 Mo** supplémentaires) uniquement pour afficher du texte algébrique sans figure 3D ni interaction. À l’échelle de 300 exercices corrigés, cette voie pèserait près d’**1 Go** de vidéos statiques impossibles à corriger sans tout re-rendre.
- **Réalité matérielle et réseau d’un élève marocain moyen** :
  - *Téléphone moyen* : Android d’entrée/milieu de gamme (3 à 4 Go de RAM, processeur octocœur modeste, écran `360` à `390 px` de large). Décoder plusieurs flux vidéo ou empiler des canevas lourds vide la batterie et fait planter l’onglet, alors qu’un SVG de 150 nœuds tourne à 60 i/s sans chauffer.
  - *Connexion moyenne* : hors fibre domestique des grands centres urbains, l’élève travaille souvent en 4G partagée ou 3G+/4G instable le soir (`2 à 8 Mb/s` réels, latence `50 à 120 ms`), et très fréquemment sur **recharge prépayée (*Pass Internet* de 1 à 5 Go entre 10 et 50 DH)**.
  - *Budget poids cible* : **$\le 250\text{ Ko}$ par leçon complète** (script + scènes SVG + exercices générés), soit **4 000 leçons ou séances dans 1 Go**, chargement en moins d’une seconde même à `2 Mb/s`.
- **La seule exception où une vraie vidéo se justifie** : montrer un **phénomène expérimental réel que le dessin ne prouve pas** (écran d’oscilloscope réel en TP de RC/RLC, traces alpha dans une chambre à brouillard, fuseau réel en microscopie de méiose), sous forme de boucle muette WebM/MP4 480p de 5 à 10 s, **$\le 800\text{ Ko}$**, chargée **uniquement au clic** (`preload="none"`), jamais en lecture automatique.

### 3.2. Une voix apporte-t-elle quelque chose, et laquelle ?

**Oui, mais uniquement sur téléphone pendant qu’une scène bouge, et jamais avec la voix synthétique du navigateur.**

- **Où la voix aide vraiment** : sur un écran `390 × 844`, l’élève ne peut pas regarder simultanément les chromosomes se séparer en haut de l’écran et lire trois phrases en bas (principe de modalité de Mayer : l’œil regarde le mouvement pendant que l’oreille reçoit la phrase courte qui le guide). En revanche, sur une dérivation algébrique (`.deriv`) ou un énoncé de QCM, lire à voix haute le texte déjà affiché ralentit l’élève et nuit à la concentration (effet de redondance).
- **Quelle voix** :
  1. **Retirer ou remplacer l’usage actuel de `speechSynthesis` du navigateur** : sur Android et Windows, la voix système française est métallique, hache les indices mathématiques ($u_{n+1}$, $^{14}_{6}\text{C}$) et brise immédiatement le calme du produit.
  2. **Si l’on ajoute une voix plus tard (après le lancement, conformément à `docs/product/VISION.md`)** : une **vraie voix humaine francophone posée** (ou une voix neuronale pré-générée et relue phonétiquement sur chaque formule, débit ~140–150 mots/min, ton de professeur particulier calme sans emphase publicitaire), encodée en Opus `24 kb/s` (~180 Ko par minute, **téléchargée uniquement si l’élève active « Voix »**), et limitée aux étapes d’explication visuelle.

### 3.3. Que peut faire Antigravity en continu pour la qualité (relecture visuelle de chaque leçon) ?

Conformément à `docs/revue-externe/MANDAT-LECONS.md`, voici la boucle de contrôle qualité visuel que je peux exécuter systématiquement sur chaque leçon v3 produite par Claude, sans alourdir la chaîne d’écriture :

1. **Parcours navigateur pire-cas aux 4 configurations (`1280 × 800` et `390 × 844`, clair et sombre)** : cliquer deux mauvaises réponses à chaque question, dérouler toutes les dérivations, ouvrir chaque fiche `.mot`, et relever toute étape qui dépasse l’écran ou se coupe sous la barre collée (comme l’étape 29 de `meiose` à `390 × 844`).
2. **Contrôle de cohérence sémantique « texte $\leftrightarrow$ scène »** (invisible pour les scripts automatiques) : vérifier à chaque étape que le titre, le sous-titre, les objets mis en rouge signal et l’état géométrique montrent bien ce que dit la phrase de droite (ex. corriger le sous-titre « Prophase I » et l’absence de plaque à l’étape 18 de `meiose`, ou les étiquettes fantômes quasi invisibles à l’étape 32 de `dipole-rc` et à l’étape 10 de `suites`).
3. **Détection des tunnels statiques et de la lisibilité téléphone** : signaler toute série de plus de 5 étapes sans changement significatif de scène et tout texte SVG dont la hauteur rendue descend sous `10 px` réels à `390 px` de large.
4. **Correction directe par petites PR isolées** sur les seuls fichiers `*-scenes-*.js` et `*.css` (une PR par leçon avec captures avant / après, contrôles `pilotes-regles`, `pilotes-parcours`, `token-gate` et `verif-commit.sh` verts), laissant à Claude les plans, le texte pédagogique et la fusion finale.
