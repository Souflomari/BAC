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

**Six sujets transcrits, cinq vérifiés.** État au 2026-08-27 :

| Fichier | Ce qui est transcrit | Barème | Vérification |
|---|---|---|---|
| `maths-sm-2022-n.md` | exercice 1 (problème unique) | 10 | **vérifiée** — un défaut dans la table de glyphes, corps de l'énoncé juste |
| `maths-sm-2023-n.md` | exercices 1 et 2 | 7,75 + 2,25 | **vérifiée** — aucun défaut dans les énoncés *(passe antérieure à la règle du 2026-08-27, voir la note de portée du fichier)* |
| `maths-sm-2024-n.md` | exercices 1 et 2 | 7,5 + 2,5 | **vérifiée** — un défaut du SUJET OFFICIEL (numéros 4 et 5 croisés entre la p. 1 et le corps) *(idem)* |
| `maths-sm-2025-n.md` | exercice 1 (problème unique) | 10 | **vérifiée** — aucun défaut ; c'est cette passe qui a découvert l'incident de cache CDN |
| `maths-sm-2017-n.md` | exercice 4 (problème unique) | 10 | **vérifiée EN DEUX PASSES, clearée** — la seconde a soldé les 5 points ouverts en trouvant la clé de décodage (chaque point de code lu comme un code **Adobe Symbol** retombe sur le symbole attendu, sur 10 codes indépendants) ; 3 défauts du sujet officiel documentés, dont un ℕ **physiquement absent** du PDF |
| `maths-sm-2021-n.md` | exercice 1 (problème unique) | 12 | **NON VÉRIFIÉ** — transcrit sous les 4 contrôles de provenance ; vérification indépendante à faire |

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
