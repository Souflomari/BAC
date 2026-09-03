# `_incoming` — le sas des transcriptions non vérifiées

> **Ce dossier n'est PAS une source.** Rien de ce qu'il contient ne peut
> devenir une entrée de banque (`content/*/bank.yaml`) tant que la
> vérification adversariale n'a pas eu lieu et n'a pas laissé sa trace
> dans le `Statut:` de chaque exercice.

## Pourquoi ce sas existe

La campagne de rattrapage (2026-08-22) a lancé la chaîne complète
**transcription → vérification adversariale → conversion**. La chaîne a
été interrompue en vol par l'épuisement des crédits : les transcripteurs
ont livré, les vérificateurs sont morts avant de commencer. Plutôt que
de mélanger du transcrit-non-vérifié aux fichiers de
`docs/sujets/{pc,maths}/` — où chaque entrée porte un statut vérifié et
sert de source à une banque —, tout attend ici.

## La règle (non négociable)

La fidélité de transcription est le risque n°1 documenté du projet, et
la vérification indépendante a déjà payé plusieurs fois : période
confondue avec une flèche de calibration, hélicoptère qui était un
avion sur la photo, amplitudes de modulation inversées, valeur
contaminée par la ligne du dessus. Aucune de ces erreurs n'était
visible sans re-lire le scan.

Donc :

1. Un exercice ne quitte `_incoming` que marqué
   `Statut: vérifié — <méthode>` par un vérificateur **qui a re-fetché
   le scan lui-même**, jamais par relecture du texte transcrit.
2. La vérification re-décrit les figures **depuis l'image**, jamais
   depuis l'énoncé — c'est la classe de défauts la plus fréquente.
3. Un point indécidable reste `(lecture à confirmer)`. Un exercice
   illisible est **écarté**, jamais complété d'imagination.
4. Le déplacement vers `docs/sujets/<matière>/<notion>.md` et la
   conversion en banque se font **après**, jamais en même temps.

## État au 2026-08-27 — LA CHAÎNE EST BOUCLÉE

**Les sept sujets sont vérifiés ET convertis.** Les 30 exercices des sept
fichiers portent un `Statut: vérifié — re-fetch indépendant + re-dérivation`,
et chacun de leurs blocs a trouvé sa banque.

| Sujet | Blocs convertis | Assemblé dans Examens blancs |
|---|---|---|
| `pc-spc-2021-r.md` | 8 | **20,00/20 — complet** |
| `pc-spc-2022-r.md` | 9 | **20,00/20 — complet** |
| `pc-spc-2023-r.md` | 8 | **20,00/20 — complet** |
| `pc-spc-2024-r.md` | 8 | **20,00/20 — complet** |
| `pc-spc-2025-r.md` | 8 | **20,00/20 — complet** |
| `maths-sm-2023-r.md` | 4 | **20,00/20 — complet** |
| `maths-sm-2024-r.md` | 5 | **20,00/20 — complet** |

**Sept épreuves de rattrapage sur sept s'assemblent en entier.** Avant la
campagne, le corpus n'en comptait **aucune** : toutes les banques étaient en
session normale. Le corpus est passé de 12 à 18 épreuves complètes.

### La règle de répartition qui a tenu tout du long

Un exercice de bac se répartit souvent sur plusieurs notions. `lib/examens.ts`
**somme les `bareme_total`** pour reconstituer le /20 : dupliquer un exercice
sur ses notions cross-listées fausserait chaque total. La règle appliquée sans
exception :

- le barème est **réparti**, jamais dupliqué — les parties d'un même exercice
  vont chacune dans leur notion, et la somme retombe sur le barème imprimé ;
- un cross-list qui ne pèserait qu'une demi-question **ne devient pas une
  entrée** : ce serait un orphelin illisible. Il est honoré dans le
  `reasoning`, qui nomme le domaine et renvoie à sa leçon ;
- chaque décision de ce type est écrite en `NOTE ÉDITORIALE` en tête de
  l'entrée, avec sa raison, et laissée à l'arbitrage de l'owner.

Chaque total a été recompté question par question contre le scan, et le
recompte est consigné dans le `sourcing.note`. Les sept retombent juste.

### Ce que la vérification a réellement trouvé

Le détail est dans `JOURNAL-VERIFICATION.md` et dans le bloc de chaque
exercice. Les trois plus coûteux, à garder en mémoire parce qu'ils
définissent les classes de défauts à chasser :

1. **Un fichier entier décrivait un autre sujet.** `pc-spc-2024-r.md`
   contenait le rattrapage 2023, habillé d'un faux avertissement
   « discordance d'année » reposant sur une lecture d'en-tête arabe
   fausse. Le fichier a été entièrement réécrit. L'avertissement de
   provenance est reconduit dans le `sourcing.note` de **chaque** entrée
   issue de ce sujet, pour que la trace survive à la conversion.
2. **Des figures décrites depuis le TEXTE et non depuis le dessin.**
   Une cote de terrain qui partait du mauvais point (PC 2023 R, ex. 4),
   un minimum de sinusoïde placé à 0,2 s alors qu'il est à 0,138 s
   (idem), un trait intérieur de quadrillage pris pour le bord du cadre
   (PC 2022 R, ex. 2). Chacune portait une question entière.
3. **Deux défauts dans le SUJET OFFICIEL lui-même**, documentés et non
   « réparés » : l'échelle des ordonnées de la figure 4 du rattrapage
   2024 est incompatible d'un facteur ≈ 60 avec les données de l'énoncé
   (sans conséquence sur le résultat demandé, mais aucune valeur
   d'intensité ne doit en être tirée), et une courbe de dosage 2021 non
   cohérente avec le pK_A.

Le sujet **maths SM 2024 rattrapage** est le seul des sept où la passe
adversariale n'a trouvé **aucun défaut** : ni d'énoncé, ni de
transcription, ni de lecture laissée en suspens.

## La deuxième vague : les problèmes d'analyse SM (2026-08-27)

La campagne rattrapage bouclée, un second gisement est ouvert dans ce même
sas. Le diagnostic tient en une phrase : **les six épreuves SM de session
normale du corpus sont toutes assemblées à 10,00/20**, parce que leurs trois
exercices d'algèbre sont en banque et que leur volet d'ANALYSE n'y est pas.
Une épreuve SM consacre la moitié de son barème à l'analyse ; c'est
exactement la moitié qui manque.

### La vague MATHS (SM et SExp) — close

**Sept sujets, sept vérifiés, sept convertis.** État au 2026-08-27 :

| Fichier | Ce qui est transcrit | Barème | Vérification |
|---|---|---|---|
| `maths-sm-2022-n.md` | exercice 1 (problème unique) | 10 | **vérifiée** — un défaut dans la table de glyphes, corps de l'énoncé juste |
| `maths-sm-2023-n.md` | exercices 1 et 2 | 7,75 + 2,25 | **vérifiée** — aucun défaut dans les énoncés *(passe antérieure à la règle du 2026-08-27, voir la note de portée du fichier)* |
| `maths-sm-2024-n.md` | exercices 1 et 2 | 7,5 + 2,5 | **vérifiée** — un défaut du SUJET OFFICIEL (numéros 4 et 5 croisés entre la p. 1 et le corps) *(idem)* |
| `maths-sm-2025-n.md` | exercice 1 (problème unique) | 10 | **vérifiée** — aucun défaut ; c'est cette passe qui a découvert l'incident de cache CDN |
| `maths-sm-2017-n.md` | exercice 4 (problème unique) | 10 | **vérifiée EN DEUX PASSES, clearée** — la seconde a soldé les 5 points ouverts en trouvant la clé de décodage (chaque point de code lu comme un code **Adobe Symbol** retombe sur le symbole attendu, sur 10 codes indépendants) ; 3 défauts du sujet officiel documentés, dont un ℕ **physiquement absent** du PDF |
| `maths-sm-2021-n.md` | exercice 1 (problème unique) | 12 | **VÉRIFIÉ, clearé, CONVERTI** (partitionné 5,0 + 7,0) — 4 contrôles anti-CDN + 2 instruments inédits (matrice de corrélation PDF↔JPG, couche 300 dpi) ; **aucun défaut du sujet officiel** ; le « + » que la transcription croyait amputé est intact, c'est le sous-échantillonnage d'AlloSchool |
| `maths-sexp-2018-n.md` | problème (SExp) | 11 | **VÉRIFIÉ, clearé, CONVERTI** (fonde la banque de `derivabilite-etude-fonctions`) — 4 contrôles + 2 ajoutés (corrigé officiel `NR 22F`, PDF source) ; 12 points du docket soldés. L'anomalie de `<title>` est **arbitrée PASS** : 54/54 des éléments de `course-438` la portent, `course-436` nomme correctement sa filière, et quatre éléments servent un `0001-big.jpg` byte-identique — le fichier servi EST le bon sujet. **Réserve nommée** : le symbole de II-5 est une reconstruction éditoriale (≈), pas une lecture |

### La vague PHYSIQUE-CHIMIE — ouverte

Les cinq épreuves SPC incomplètes du corpus, toutes `sourcé-confirmé`. Elles
demandent 13 à 18 points chacune : un ordre de grandeur au-dessus de la vague
maths, où il ne manquait qu'un problème par épreuve.

| Fichier | Ce qui est transcrit | Barème | Vérification |
|---|---|---|---|
| `pc-2012-n.md` | **la PHYSIQUE** de SPC 2012 N (nucléaire 3 · électricité 4,5 · mécanique 5,5) | 13 | **VÉRIFIÉ, clearé** (2026-08-28) — barème refait par DEUX chemins, aucune divergence. Les (a)/(b) de la fig. 4 **confirmés**, et par la physique en plus de la mesure. **Une lecture de la transcription corrigée** : « la courbe part de 17,5 mJ » est faux (intersection masquée par l'axe) — E_C(0) ≈ 18,5–19,5, valeur déclarée NON LISIBLE. **Défaut du sujet officiel : les deux couples étiquetés `pKA1`**, ce qui rend une question insoluble |
| `pc-2015-n.md` | 8 blocs : électrolyse · estérification · ondes+astate (QCM) · RC · modulation · balle de golf · oscillateur | 17,75 | **VÉRIFIÉ, clearé** (2026-08-28), **une condition nommée**. 27/27 questions re-dérivées (le transcripteur en avait fait 6) ; 26 résolubles. **Défaut du sujet officiel** : `ρ = 0;78 g.L⁻¹` — point-virgule ET unité fausse d'un facteur 1000, ce qui rend la **question 2-3 insoluble** telle qu'imprimée (rendement **8 846 %** au lieu de 75,00 %). Décision owner avant de convertir CETTE question ; précédent maison applicable (PC 2012, correction déclarée). **25 coquilles distinctes** (pas 17). Étiquettes de courbes confirmées par la chaîne refaite de zéro, **plus le contrôle en sens inverse** |
| `pc-2017-n.md` | 7 blocs : pile Al-Cu · acide butanoïque · estérification · QCM ondes · dipôle RL · skieur · pendule de torsion | 18,25 | **VÉRIFIÉ, clearé, CONVERTI** (2026-08-28), 31/32 questions re-dérivées. **⚠️ RÉFUTE UNE VALEUR PUBLIÉE, à 66 σ** : $F_p = 1\,003 \pm 15$ Hz par **sept** méthodes (dont une sans échelle et une sans le PDF) contre les 2 kHz de `bk-2017-n-x3` **et du sommet r-bac** — où la valeur est dans l'**ÉNONCÉ**, donnée comme une lecture de figure. **56 coquilles sur 24 types** (pas 46/25), et **un « défaut du sujet » inventé par la transcription a été SUPPRIMÉ**. Aucune question insoluble. Bloc 7 tranché vers `aspects-energetiques` — **CONVERTI le 2026-08-28, sa banque est fondée** (contrôle préalable : sans risque (la garde dom-truth « rail == disque » est épinglée sur le seul témoin `pc/reactions-acido-basiques` ; `lib/examens.ts` lit les banques génériquement ; et `derivabilite-etude-fonctions` a été fondée la veille et rend correctement) |
| `pc-2015-r.md` | **SUJET ENTIER** (2ᵉ intégrale) — dosage · phéromone · 2 QCM · RL · RLC · skieur · torsion | 20,00 | **✅ CONVERTI** (2026-08-29, 8 entrées `bk-2015-r-*` = 20,00, F1–F4 déclarés) — après **✅ VÉRIFIÉ** même jour — passe adversariale indépendante : re-fetch de zéro, barème 34/34 par deux chemins du vérificateur, cinq figures re-mesurées au pixel (E(0)=1,6 mJ confirmé), couche de texte recensée caractère par caractère, **page 1 du corrigé svt-assilah atteinte : 7/7 concordances bloc 1**. Défauts du sujet F1–F4 confirmés ; aucune erreur de transcription. 8 blocs `Statut: vérifié`, clearés pour conversion. *Le fichier avait survécu à un kill de plafond ; intégrité contrôlée avant commit* |
| `pc-2011-n.md` | **SUJET ENTIER** (première intégrale : zéro entrée préexistante) — chimie · nucléaire · électricité · mécanique | 20,00 | **✅ CONVERTI** (2026-08-29, 6 entrées `bk-2011-n-*` = 20,00, garde S1 en place ; conversion en deux temps, coupée par un kill de limite entre x1b et x2) — après **VÉRIFIÉ, clearé** même jour — **S1 CONFIRMÉ dans les deux sens** (736,9 ± 2 hPa mesurés contre 227,4 dérivés ; mécanisme validé à <1 % ; t½ ≈ 42 min reste résoluble), barème par **quatre chaînes**, 34/34 défauts confirmés + 1 manqué ajouté (registre à 35), **zéro inventé**. Corrigé jaugé : témoin de valeurs, pas arbitre (demi-équation non équilibrée, corrige en silence, aveugle à S1). **Garde de conversion : aucune valeur absolue de ΔP depuis la figure** |
| `pc-2011-r.md` | 6 blocs : acide méthanoïque · pile Ni-Zn · ondes · RC · RLC · oscillateur | 17,75 | **VÉRIFIÉ, clearé** (2026-08-28) — 32/32 barèmes recomptés, 10 figures re-mesurées sur les bitmaps natifs, **sans corrigé** : deux chaînes de mesure concordantes sont le plafond de preuve. **Un argument de la transcription réfuté, sa conclusion tenue** (sept sous-groupes contigus refont 2,25 — l'exclusion tient par les marges par question). pK_a corrigé à **3,74**. Le **L = 780 m** est réel (axe `t(s)` pixel-vérifié) |
| `pc-2010-n.md` | chimie 2ᵉ partie · nucléaire · électricité · mécanique | 15,75 | **VÉRIFIÉ, clearé** (2026-08-28) — barème identique, 27/27 questions re-dérivées. **⚠️ LA BANQUE A TORT, TRANCHÉ** : $t_{1/2} \approx$ **13 min** (12,6–13,0) contre les ≈ 20 min de `bk-2010-n-x1`, par mesure au pixel PUIS par un corrigé trouvé après coup. **NEUF défauts du sujet officiel** (pas sept) — dont la tangente dessinée qui n'est pas la tangente de la courbe (5,5 % d'écart, elle porte une question) |

| `pc-2010-r.md` | **SUJET ENTIER** (3ᵉ intégrale) — aspirine (synthèse) · aspirine + eau · fibre optique · circuit LC · modulation · planète Mars | 20,00 | **⚠️ NON VÉRIFIÉ** (2026-08-29) — en attente de passe adversariale. **FAIT DE PROVENANCE MAJEUR** : le document français servi par AlloSchool n'est **PAS l'édition ministérielle** — chaque page porte « *Traduction : Pr. Hassan OUSBANE & Pr. Abdelaziz EL AAMRANI* », le cartouche imprime un cadre « المسالك الدولية » créé en 2014+ (anachronique pour 2010) et **aucun code d'examen**. **L'original arabe A ÉTÉ TROUVÉ, et son corrigé avec** (cours arabophone `course-311`, éléments `39367`/`39368`) : barème confronté 30/30, code réel **RS28** établi, quatre défauts requalifiés. Confrontation à l'arabe **partielle** (valeurs, barème, titres, figures — pas de lecture phrase à phrase). **Une question d'architecture posée à l'owner** : les identifiants suivent-ils la POSITION sur la copie (chimie = x1, la physique décalée) ou le LIBELLÉ imprimé (« Exercice 1 » = les ondes) ? Le précédent 2011 R dit position ; la gate refuse un id contredisant son libellé — deux issues rédigées, **aucune choisie** |

**Vague SPC 2 (les trois sujets à zéro entrée) : CLOSE côté transcription.**
SPC 2011 N et SPC 2015 R sont **vérifiés ET convertis** (20,00 chacun,
35ᵉ et 36ᵉ épreuves complètes) ; SPC 2010 R est **transcrit, non vérifié**
— sa passe adversariale et son arbitrage d'anatomie restent à faire.

**La règle d'exclusion vaut pour les cinq** : chacune porte DÉJÀ une entrée en
banque. Retranscrire la même partie ferait dépasser 20 — c'est le mode d'échec
que la garde dom-truth « aucune épreuve au-dessus de 20 » attrape désormais,
mais il vaut mieux ne pas l'y envoyer.

**SM 2020 est le sixième, et il est SUSPENDU** — pas oublié. Son format à
choix n'est pas représentable par l'assembleur d'épreuves ; voir
`docs/grounding/known-issues.md` **K-0**, qui pose trois issues possibles et
n'en choisit aucune. Le transcrire avant l'arbitrage produirait une épreuve à
23,5/20.

Ce que les quatre passes ont trouvé, en une ligne : **aucun défaut de valeur,
de borne, d'exposant ou de barème dans aucun des quatre énoncés.** Les trois
défauts réels étaient ailleurs — dans une table de glyphes, dans la page 1 du
sujet officiel, et dans le cache d'AlloSchool.

Chacun recompté question par question contre la marge du scan, et chacun
retombe exactement sur les 10 points qui manquent à son épreuve.

**Portée partielle assumée.** Aucun de ces fichiers ne transcrit les
exercices d'algèbre du même sujet : ils sont déjà en banque, et l'assemblage
d'épreuves somme les `bareme_total` — les reconvertir fausserait le /20. La
portée est dite en tête de chaque fichier pour qu'elle ne passe pas pour un
oubli.

### Ce que cette vague a appris sur les scans

Les quatre sujets ne se ressemblent pas du tout côté fidélité, et c'est le
renseignement le plus utile pour la suite :

- **2024 N et 2025 N : scans propres.** Lettres ajourées et symbole $\le$
  rendus correctement, aucune adjudication de glyphe nécessaire.
- **2023 N : mojibake intermittent.** Le symbole $\le$ y est rendu par une
  double virgule à cinq endroits, et les lettres ajourées cassent par
  intervalles — la même lettre rendue par deux glyphes différents à deux
  lignes d'écart. Chaque occurrence adjugée par la logique, jamais par la
  forme du glyphe.
- **2022 N : substitution de police MASSIVE**, systématique et non
  intermittente. Aucun symbole mathématique non alphabétique ne s'y lit pour
  ce qu'il montre. Le fichier porte une **table de correspondance complète**,
  glyphe par glyphe. Sa vérification a **identifié la substitution** au lieu
  de la deviner : c'est la police **Symbol** rendue au même code par une
  police latine, et **dix-sept glyphes concordent** avec cette hypothèse. Une
  fois la table de codes établie, chaque glyphe se lit par décodage et non par
  ressemblance.

  **Une ligne de ma table était fausse, et c'était la plus contradictoire :**
  j'y donnais le symbole de la partie E pour un « D latin, pas $\Delta$ »,
  alors que la ligne suivante lisait le même glyphe rendu comme $\Delta$.
  Le scan porte bien $\Delta_k$. Établi par trois mesures indépendantes —
  Symbol 0x44 $= \Delta$ ; le glyphe indexé est **romain droit** au milieu de
  variables italiques, signature d'un caractère substitué ; et il est
  **identique au pixel** au discriminant de l'exercice 2 (19×20 px tous les
  deux, écart moyen 0,09/255).

  **Et une deuxième correction, qui porte sur la méthode.** J'avais écrit
  qu'un « l » de « ln » était *absorbé* par une parenthèse extensible, et
  j'avais adjugé la lecture par une conséquence vérifiable — $F(1)$ doit
  valoir $0$, et une seule lecture le donne. La lecture était juste ; **le
  diagnostic était faux** : au zoom ×8 le « l » est présent et parfaitement
  lisible, simplement superposé au fragment de parenthèse. La leçon n'est pas
  celle que je croyais tirer, et elle est meilleure : **un contrôle par
  conséquence valide une lecture sans exiger qu'on ait compris pourquoi le
  glyphe est illisible.** Il faut le faire même quand on croit avoir tout
  compris — et surtout, ne pas confondre « j'ai trouvé la bonne réponse » avec
  « j'ai compris ce que je regardais ».

### Deux lacunes signalées AVANT conversion, et non pendant

- **`arctan`** apparaît dans le sujet 2025 N. Fonction spécifique à la filière
  SM, sans rung nulle part dans le corpus. Si l'exercice est converti, il
  faudra la ponter au point d'usage — comme le corpus le fait déjà pour Rolle
  et le théorème des accroissements finis.
- **Le théorème des accroissements finis** est invoqué nommément par les
  sujets 2023 N et 2024 N. Le docket de complétude le classe en catégorie C
  (spécifique SM, volontairement non promu au rang de rung) : l'usage est
  légitime, mais il devra être ponté et non supposé acquis.

### Reste de la vague

`SM 2017 N` (`element/57970`, code **NS25** et non NS24F) et `SM 2020 N`
(`element/109635`, que le CENSUS signale comme un **format à CHOIX** —
exercice 1 OU exercice 2 — à contrôler avant toute transcription).

---

## ⚠️ RÈGLE DE VÉRIFICATION AJOUTÉE LE 2026-08-27 — la lecture visuelle seule ne suffit pas

**C'est la trouvaille la plus importante de la campagne SM, et c'est un
vérificateur qui l'a faite sur lui-même.**

En vérifiant SM 2025 normale, il a demandé `element/145783` à AlloSchool et
reçu, depuis le cache CDN, le sujet **SM 2022 normale** — titre « 2022
Normale », PDF `…-2022-normale-sujet.pdf`, images `upload-84506`. L'incident a
touché les images elles-mêmes : `upload-87482/0001–0003` ont été servies avec
le **contenu 2022**, `0004–0006` avec le bon.

**Et sa première lecture visuelle a « retrouvé » l'énoncé 2025 attendu sur ces
pages 2022.** Il a confirmé, à tort, trois des points fragiles à partir de
pages qui ne les contenaient pas. Ce n'est pas de la négligence : c'est le
biais de confirmation dans son expression la plus pure — **une lecture
visuelle, la transcription sous les yeux, confirme ce qu'elle s'attend à
voir**. Seul un instrument non visuel a cassé l'illusion : un passage à l'OCR,
qui a rendu un exercice en $\ln(1+x)$ truffé de mojibake là où le lecteur
croyait lire du $e^x/(e^{2x}+e)$.

C'est exactement le mode d'échec « un fichier entier décrivait un autre
sujet » déjà au registre du projet — celui qui avait coûté la réécriture
complète de `pc-spc-2024-r.md`. **Il se déclenche sans que personne fasse
d'erreur.**

### Ce qu'une passe de vérification doit faire, désormais

1. **Contrôler l'année imprimée sur CHAQUE page**, pas seulement sur la
   première. Le cartouche d'en-tête la porte à chaque fois. Un jeu de pages
   panaché — trois d'une année, trois d'une autre — ne se voit pas autrement.
2. **Recouper par un instrument non visuel.** OCR (`tesseract`), extraction de
   texte, ou re-dérivation numérique d'une identité de l'énoncé : n'importe
   quoi qui ne passe pas par l'attente du lecteur. C'est ce qui a sauvé cette
   passe.
3. **Consigner les MD5** des fichiers réellement lus, et re-télécharger une
   seconde fois pour vérifier la stabilité de ce que sert le CDN.
4. **Contrôler le `<title>` et l'URL du PDF** servis par la page `element/`,
   pas seulement les chemins d'images.

Un « vérifié » obtenu par lecture visuelle seule, transcription sous les yeux,
n'est pas un « vérifié ». Il faut au moins un contrôle qui ignore ce que le
lecteur espère trouver.

### Deux instruments trouvés après coup — à préférer quand le PDF est joignable

La passe SM 2021 (2026-08-27) en a ouvert deux que les quatre exigences
ci-dessus ne nommaient pas. Le premier vaut d'être essayé **en premier** :

- **La matrice de corrélation PDF ↔ JPG.** Les pages servies en images et les
  pages du PDF lié doivent se correspondre une à une. Corréler chaque JPG avec
  chaque page du PDF donne une matrice dont la diagonale doit dominer :
  mesuré sur SM 2021, diagonale 0,89–0,94 contre 0,03–0,17 hors diagonale.
  **Un panachage de cache y saute aux yeux en une commande** — c'est
  exactement le contrôle qui aurait cassé l'incident SM 2025 immédiatement,
  au lieu d'un OCR page par page.

- **La source la moins dégradée que porte le PDF.** AlloSchool sert ses images
  en 150 dpi ; le PDF lié fait presque toujours mieux, mais *comment* dépend du
  sujet, et il faut regarder avant de choisir :
  — s'il embarque une numérisation, elle est souvent en **300 dpi bitonal**,
    soit le double de résolution (cas SM 2021) ;
  — s'il s'agit d'un **document natif avec une vraie couche de texte** (cas
    PC 2012, produit sous Nitro Pro), c'est encore mieux : on le rend
    **vectoriellement** à la résolution qu'on veut et on extrait les figures en
    natif. Sur ce sujet, **aucun caractère n'a eu à être deviné.**
  Le réflexe est donc : ouvrir le PDF et regarder ce qu'il est, avant de
  supposer que c'est un scan. Quand un glyphe est litigieux,
  c'est là qu'il faut aller avant de conclure : sur SM 2021, un « + » que la
  transcription croyait amputé (« pixel de croisement sauté ») s'y révèle
  **continu et intact**. Le trou n'était pas dans le sujet — il venait du
  sous-échantillonnage 300 → 150 d'AlloSchool.

Ce second point porte une leçon plus large que le glyphe : **un défaut
apparent du sujet peut être un artefact de la chaîne de diffusion.** Avant
d'écrire « défaut du sujet officiel », il faut avoir regardé la source la
moins dégradée qu'on puisse atteindre.

- **Les trois exemplaires parallèles (PC seulement) — trouvé le 2026-08-28.**
  AlloSchool sert **chaque sujet de physique-chimie sous TROIS cours** :
  `course-421` (SM-A), `course-422` (SM-B) et `course-423` (Sciences
  Physiques). Les trois PDF sont **byte-identiques** (MD5 unique), et leurs
  JPG le sont aussi d'un `upload-` à l'autre.

  **Comparer les MD5 des trois exemplaires est donc un contrôle de cache très
  fort, en une commande** : un panachage n'affecterait pas les trois de la
  même façon. À préférer, quand les trois existent, à un OCR page par page.

  **Et ça corrige une erreur que cette campagne répétait.** Plusieurs fichiers
  disent que le conteneur « annonce à tort Sciences Mathématiques B » pour un
  sujet SPC. **Ce n'est pas une anomalie** : c'est un cross-listing normal, et
  l'exemplaire correctement libellé existe (pour 2015 N, `element/94474`). Il
  n'y a rien à arbitrer — seulement à ne plus le signaler comme suspect.

---

## Trois pièges de procédure payés le 2026-08-27, à ne pas repayer

Ces trois-là n'ont rien à voir avec les mathématiques ou la physique. Ils
viennent de la mécanique du travail, et chacun a coûté quelque chose.

### 1. Des scans qui n'en sont pas — vérifier `file *.jpg`

Un vérificateur a téléchargé les cinq pages d'un scan et obtenu cinq
« JPEG » de **288 octets**. C'étaient des pages HTML de redirection 301
(forme `index.ph%70`). Un `curl` naïf les enregistre sans broncher, et
l'outil de lecture d'images échoue ensuite sans dire pourquoi.

**La parade :** refetcher avec `-L` et un User-Agent de navigateur, puis
**contrôler systématiquement `file *.jpg`**. Un fichier de quelques centaines
d'octets n'est jamais une page de scan. Ce contrôle coûte une seconde et
évite de conclure « le scan est illisible » alors qu'il n'a jamais été
téléchargé.

### 2. Ne jamais committer un fichier qu'un agent est en train d'écrire

Un commit a été passé au milieu d'une passe de vérification, sur le fichier
que le vérificateur éditait. Résultat : la version publiée portait sept
formules mathématiques coupées sur plusieurs lignes, laissant **seize lignes
avec un `$` non apparié**. Le vérificateur a corrigé après coup, mais la
version fautive existe dans l'historique.

**La parade :** avant tout `git add`, vérifier qu'aucun agent ne travaille sur
le chemin visé. Et ne jamais utiliser `git add -A` — nommer les chemins, ce
que ce projet avait déjà appris à ses dépens lors de la campagne rattrapage.

### 3. Une date fausse dans un enregistrement de provenance

C'est le plus instructif, parce que c'est un vérificateur qui a **refusé une
consigne** pour l'éviter. La consigne de vérification lui demandait de dater
sa passe du 2026-08-23 ; il l'a datée du 2026-08-27, date réelle, en disant
qu'inscrire une fausse date dans un enregistrement de provenance était
contraire à l'esprit de la tâche.

Il avait raison, et le problème était plus large que sa passe : cette session
a commencé le 2026-08-23 puis repris le 2026-08-27 après une interruption, et
tout le travail de la seconde moitié portait par inadvertance la date de la
première. **Soixante-sept lignes de provenance étaient datées faux** — dans le
docket de complétude, dans BANK-SPEC, dans les fichiers de ce sas, et dans
trois notes éditoriales de banques. Elles ont été corrigées en distinguant
deux cas :

- une date qui **cite** une passe de vérification du rattrapage, réellement
  faite le 2026-08-23 → conservée ;
- une date qui **enregistre le travail de la seconde moitié de session** →
  portée au 2026-08-27.

**La parade :** ne jamais coder une date en dur dans une consigne d'agent.
Écrire « date du jour » et laisser l'agent la lire. Une date est une donnée
de provenance au même titre qu'un numéro de page ou une URL — un projet dont
le risque n°1 est la fidélité ne peut pas se permettre de l'approximer.

---

## Ce qui reste à moissonner

Les sessions de rattrapage n'avaient jamais été moissonnées : elles
doublent le gisement d'épreuves réelles disponibles, et sept sujets ne
sont qu'un début. Les identifiants de source (AlloSchool) recensés pour
la suite — SExp maths 2018→2025, et PC/SM au-delà des sept ci-dessus —
sont dans l'historique de la campagne et se re-recensent en une passe si
besoin.
