# Format « à choix » — balayage des pages 1 du corpus (2026-08-27)

> **Commission.** `docs/grounding/known-issues.md` **K-0** décrit un défaut de
> `web/src/lib/examens.ts` (il somme tous les `bareme_total` d'un groupe et n'a
> aucune notion d'exercice optionnel), propose trois issues, n'en choisit
> aucune, et nomme le fait qui manque pour trancher : *« SM 2020 est-elle la
> seule épreuve du corpus à ce format ? […] Un balayage des pages 1 des scans
> SM trancherait. »* Ce document est ce balayage, et **rien d'autre** : il
> mesure, il ne tranche pas. L'arbitrage entre les trois issues appartient à
> l'owner.
>
> **Ce qui est mesuré.** Toutes les lignes de `docs/sujets/maths/CENSUS.md`
> §1 (SM) et §1bis (SExp) qui portent un identifiant d'élément AlloSchool,
> normale et rattrapage — plus le recensement comparable de
> `docs/sujets/pc/CENSUS.md` §1, qui existe (24 lignes à élément + 5 lignes
> à `upload-<n>` seul, toutes atteintes). **61 épreuves ouvertes**, page 1 lue
> pour chacune.
>
> **Ce qui n'est pas mesuré.** Les lignes sans identifiant (« non recherché »,
> « non lu », « élément non consigné », « non consigné ») : **47 lignes**,
> recensées comme non couvertes au §4, jamais devinées.

---

## 0. Méthode et contrôles

**Pipeline.** Pour chaque ligne : `GET element/<n>` → `<title>` servi +
`course-<X>/upload-<Y>` re-dérivé de la page (jamais recopié du census) →
`GET .../0001-big.jpg`. Les 5 lignes PC sans élément ont été prises
directement par leur `upload-<n>` (leur provenance est donc plus faible d'un
cran : pas de `<title>` à contrôler — signalé sur chaque ligne concernée).

**Recoupement non visuel.** OCR `tesseract 5` en `fra+ara` sur les 61 pages 1
(les paquets `fra` / `ara` ont été installés pour cette passe ; ils
n'existaient pas dans l'environnement — voir `docs/sujets/maths/INDEX.md` §1
qui note l'absence d'OCR, à corriger). Le tri initial est un `grep`
mécanique sur la couche de texte, pas une lecture : `ou bien`, `au choix`,
`choisir`, `choix`, `أو`, `يختار`, `واحدا`, `اختيار`. **3 pages sortent au
grep français, 0 au grep arabe.** Sur les 3, une est un faux positif
explicité au §2. Les 2 conclusions « À CHOIX » sont ensuite **relues
visuellement** — c'est la conclusion la plus lourde de conséquences, elle a
les deux lectures.

**Contrôle anti-cache CDN** (AlloSchool a déjà servi, sous la bonne URL, les
pages d'un autre sujet — trois sur six) :

| Contrôle | Résultat |
|---|---|
| `<title>` servi cohérent avec filière + année + session | **56 / 56** lignes à élément |
| md5 des 61 pages 1 deux à deux distincts | **61 / 61**, aucun doublon |
| Année relue **sur la page** (OCR ou visuel) | **61 / 61** |
| Mot de session relu sur la page (`الدورة العادية` / `الاستدراكية`) | 43 / 61 (l'OCR arabe du cartouche est irrégulier — un échec de lecture, pas un désaccord : **aucune** session lue ne contredit celle attendue) |
| Code `NS/RS ..F` relu sur la page | 25 / 61 (dont **les 2 épreuves à choix**, lues visuellement : `NS 25` et `RS 25`) |
| Blocs-barème identiques entre deux sujets → diff pixel | 2 paires détectées (`PC 2010 N` / `PC 2011 R` ; `SM 2022 R` / `SM 2023 R`) — **différence réelle de 12 % et 9 % des pixels** : barèmes réutilisés par le ministère, pas pages recyclées par le CDN |

**Sur l'arabe.** Ces sujets sont tous « خيار فرنسية » (option française) : sur
les 8 pages relues visuellement, l'arabe de la page 1 est **confiné au
cartouche ministériel** (matière, filière, durée, coefficient, code) ; les
consignes et le barème n'existent qu'en français. Le grep arabe à zéro hit est
donc corroboré par une raison structurelle, pas seulement par la qualité —
médiocre — de l'OCR arabe.

**Le test arithmétique qui double le grep.** Un format à choix rend
mécaniquement la somme des barèmes imprimés **supérieure à 20** (SM 2020 :
3,5+3,5+3,5+13 = 23,5). J'ai donc recompté la somme imprimée des 61 pages :
**3 sorties de 20 exactement**, et exactement les 3 attendues — les 2 épreuves
à choix, plus un défaut d'impression sans rapport (PC 2014 N, §2). Aucune
épreuve à choix ne peut avoir échappé aux deux filets à la fois.

---

## 1. Le tableau

`format` : **standard** = tous les exercices sont à traiter · **À CHOIX** =
la page 1 impose un choix entre exercices · **non concluant** = contrôle
échoué ou page illisible · **non couvert** = hors du balayage (§4).
`Σ imprimé` = somme des barèmes imprimés page 1. `barème candidat` = ce qu'un
candidat réel peut réellement totaliser.

### 1.1 SM — Sciences Mathématiques A & B (`NS/RS 24F`, 4 h, coef 9)

| Année | Session | Élément | Code lu | Format | Σ imprimé | Barème candidat |
|---:|:--:|:--|:--|:--|--:|--:|
| 2017 | N | `57970` | — | standard | 3,5+3,5+3+10 = **20** | 20 |
| 2018 | N | `65508` | — (retype, sans cartouche) | standard ⚠︎ | 3,5+3+3,5+7,5+2,5 = **20** | 20 |
| 2019 | N | `68482` | `NS24F` | standard | 3,5+3,5+3+10 = **20** | 20 |
| 2019 | R | `94396` | `RS25` | standard | 3,5+3+3,5+10 = **20** | 20 |
| **2020** | **N** | **`109635`** | **`NS 25`** | **À CHOIX** | 3,5+3,5+3,5+13 = **23,5** | **20** |
| **2020** | **R** | **`109639`** | **`RS 25`** | **À CHOIX** | 3,5+3,5+3,5+13 = **23,5** | **20** |
| 2021 | N | `127193` | `NS 24F` | standard | 12+4+4 = **20** | 20 |
| 2021 | R | `127195` | `RS 24F` | standard | 8+4+4+4 = **20** | 20 |
| 2022 | N | `136604` | — | standard | 10+3,5+3+3,5 = **20** | 20 |
| 2022 | R | `136606` | — | standard | 10+3,5+3,5+3 = **20** | 20 |
| 2023 | N | `142490` | — | standard | 7,75+2,25+3,5+3+3,5 = **20** | 20 |
| 2023 | R | `142494` | — | standard | 10+3,5+3,5+3 = **20** | 20 |
| 2024 | N | `145739` | `NS 24F` | standard | 7,5+2,5+3,5+3,5+3 = **20** | 20 |
| 2024 | R | `145741` | `RS25` | standard | 6,5+3,5+3,5+3,5+3 = **20** | 20 |
| 2025 | N | `145783` | `NS-24F` | standard | 10+3,5+3+3,5 = **20** | 20 |
| 2025 | R | `145785` | — | standard | 7,75+2,25+3,5+3+3,5 = **20** | 20 |

⚠︎ **2025 N** : la page 1 servie est une **couverture non numérotée** (le
census le note) ; les consignes sont en **page 2**, c'est elle qui a été lue
et OCRisée (`NS-24F`, `الدورة العادية 2025`).
⚠︎ **2018 N** : le document AlloSchool est un **retype enseignant**, sans
cartouche ministériel et **sans bloc de consignes** — la consigne de choix,
si elle avait existé, aurait été effacée par le retype. Le verdict ne peut
donc pas venir de la consigne ; il vient du barème : les **cinq** exercices
imprimés (pages 1 à 4, toutes ouvertes) somment à **20,00 exactement**, ce
qui ne laisse aucune place à un exercice optionnel. Conclusion mesurée, pas
lue — et conditionnée à la fidélité d'un retype que le census déclare
invérifiable (aucun scan officiel du 2018 N n'existe sur AlloSchool).

### 1.2 SExp — Sciences Expérimentales, SVT + Sc. Physiques (`NS/RS 22F`, 3 h, coef 7)

Anomalie connue et confirmée ici : le `<title>` de tout `course-438` annonce
« Sciences et **Technologies** ». La filière est nommée d'après le cartouche,
qui imprime bien `شعبة العلوم التجريبية` (relu visuellement sur 2020 N).

| Année | Session | Élément | Code lu | Format | Σ imprimé | Barème candidat |
|---:|:--:|:--|:--|:--|--:|--:|
| 2016 | N | `94485` | — | standard | 2,5+3+3+3+8,5 = **20** | 20 |
| 2016 | R | `94502` | `RS22F` | standard | 3+3+3+3+8 = **20** | 20 |
| 2017 | N | `94525` | — | standard | 3+3+3+11 = **20** | 20 |
| 2018 | N | `94699` | `NS 22F` | standard | 3+3+3+11 = **20** | 20 |
| 2019 | N | `68527` | `NS22F` | standard | 3+3+3+11 = **20** | 20 |
| 2019 | R | `106247` | `RS22F` | standard | 3+3+3+11 = **20** | 20 |
| 2020 | N | `109797` | `NS 22F` | standard | 4+5+4+7 = **20** | 20 |
| 2020 | R | `109808` | `RS22F` | standard | 2+5+4+9 = **20** | 20 |
| 2021 | N | `127180` | — | standard | 2+4+5+9 = **20** | 20 |
| 2021 | R | `127185` | `RS22F` | standard | 4+5+3+8 = **20** | 20 |
| 2022 | N | `136586` | — | standard | 3+3+3+2,5+8,5 = **20** | 20 |
| 2022 | R | `136591` | — | standard | 2,5+3+3+3+8,5 = **20** | 20 |
| 2023 | N | `137482` | — | standard | 3+3+3+11 = **20** | 20 |
| 2023 | R | `142250` | — | standard | 3+3+3+3+8 = **20** | 20 |
| 2024 | N | `144505` | `NS 22F` | standard | 3+3+4+2+8 = **20** | 20 |
| 2024 | R | `145811` | `RS 22F` | standard | 3+4+2+11 = **20** | 20 |

### 1.3 SPC — Sciences Physiques (`NS/RS 28F`, 3 h, coef 7)

| Année | Session | Élément / upload | Code lu | Format | Σ imprimé | Barème candidat |
|---:|:--:|:--|:--|:--|--:|--:|
| 2008 | N | `upload-45082` † | — | standard | 7+2+5+6 = **20** | 20 |
| 2009 | N | `upload-45088` † | — | standard | 7+2+5+6 = **20** | 20 |
| 2010 | N | `94443` | — | standard | 7+2+5+6 = **20** | 20 |
| 2011 | R | `94449` | — | standard | 7+2,5+5+5,5 = **20** | 20 |
| 2012 | N | `94452` | — | standard | 7+3+4,5+5,5 = **20** | 20 |
| 2013 | N | `upload-70326` † | — | standard | 7+2,5+4,5+6 = **20** | 20 |
| 2014 | N | `upload-70333` † | `NS 28` | standard ⚠︎ | 7+3+4,5+6 = **20,5** | 20 |
| 2014 | R | `94469` | `RS 28` | standard | 7+2,5+4,5+6 = **20** | 20 |
| 2015 | N | `94472` | — | standard | 7+3+4,5+5,5 = **20** | 20 |
| 2016 | N | `upload-45091` † | — | standard | 7+3+4,5+5,5 = **20** | 20 |
| 2016 | R | `57705` | — | standard | 7+2,5+5+5,5 = **20** | 20 |
| 2017 | N | `57711` | `NS 28F` | standard | 7+2,5+5+5,5 = **20** | 20 |
| 2017 | R | `57717` | `RS28F` | standard | 7+3+4,5+5,5 = **20** | 20 |
| 2018 | N | `57726` | — | standard | 7+2,5+5+5,5 = **20** | 20 |
| 2018 | R | `57732` | — | standard | 7+2,5+4,5+6 = **20** | 20 |
| 2019 | N | `68300` | `NS28F` | standard | 7+3,5+4,5+5 = **20** | 20 |
| 2019 | R | `94419` | `RS28F` | standard | 7+2,5+5+5,5 = **20** | 20 |
| 2020 | N | `109742` | `NS 28F` | standard | 7+3+2,5+5+2,5 = **20** | 20 |
| 2020 | R | `109751` | — | standard | 7+2,75+2,5+5,25+2,5 = **20** | 20 |
| 2021 | N | `127287` | — | standard | 7+3+2,5+4,75+2,75 = **20** | 20 |
| 2021 | R | `127290` | — | standard | 7+2+2,5+5,5+3 = **20** | 20 |
| 2022 | N | `136621` | `NS 28F` | standard | 7+3,5+4,5+5 = **20** | 20 |
| 2022 | R | `136624` | — | standard | 7+3,5+4,5+5 = **20** | 20 |
| 2023 | N | `142476` | — | standard | 7+2,5+5+5,5 = **20** | 20 |
| 2023 | R | `142484` | — | standard | 7+3+4,75+5,25 = **20** | 20 |
| 2024 | N | `145763` | `NS 28F` | standard | 7+2,5+2+3,5+5 = **20** | 20 |
| 2024 | R | `145769` | — | standard | 7+2,5+2+3,5+5 = **20** | 20 |
| 2025 | N | `145796` | `NS28F` | standard ‡ | 7+2,5+5+5,5 = **20** | 20 |
| 2025 | R | `145799` | — | standard | 7+2,5+5+5,5 = **20** | 20 |

† **Sans élément** : le census ne porte que l'`upload-<n>`. Page 1 prise
directement par l'URL d'image ; le contrôle `<title>` n'existe pas pour ces
cinq lignes. Année **et** session relues sur le cartouche pour les cinq.
⚠︎ **2014 N** : voir §2 — défaut d'impression du sujet officiel, sans rapport
avec un format à choix.
‡ **2025 N** : voir §2 — faux positif du grep.

---

## 2. La citation exacte, et les deux non-cas

### 2.1 SM 2020 session **normale** (`element/109635`, `NS 25`, 5 p.) — À CHOIX

Français, page 1 (lu visuellement **et** ressorti tel quel par l'OCR) :

> « Le candidat doit traiter EXERCICE3 et EXERCICE4 et choisir de traiter
> EXERCICE1 **ou bien** EXERCICE2. »
> « Le candidat doit traiter au total trois (3) exercices : »
> « EXERCICE1 qui concerne l'arithmétique **(au choix)**……3.5 points — **ou
> bien** — EXERCICE2 qui concerne les structures algébriques **(au
> choix)**……3.5 points — EXERCICE3 qui concerne les nombres complexes
> **(obligatoire)**……3.5 points — EXERCICE4 qui concerne l'analyse
> **(obligatoire)**……13 points »

Bandeaux en négatif, plus bas sur la même page :

> « Tu choisis de traiter EXERCICE1 ou bien EXERCICE2 »
> « Tu traites obligatoirement EXERCICE3 et EXERCICE4 »
> « EXERCICE1 :(3.5 points/au choix) »
> « (Si tu choisis de traiter EXERCICE1, il ne faut pas traiter EXERCICE2) »

**Arabe** : aucune consigne — l'arabe de la page 1 est le cartouche seul.
**Barème d'un candidat : 3,5 + 3,5 + 13 = 20.**

### 2.2 SM 2020 session **rattrapage** (`element/109639`, `RS 25`, 4 p.) — À CHOIX

**Épreuve non ouverte jusqu'ici** : le census la marque `sourcé-listé`,
« jamais ouvert ». C'est le fait neuf de ce balayage — **K-0 ne la connaissait
pas.** Même format, mêmes notions, même répartition :

> « Le candidat doit traiter EXERCICE3 et EXERCICE4 et choisir de traiter
> EXERCICE1 **ou bien** EXERCICE2. »
> « Le candidat doit traiter au total trois (3) exercices : »
> « EXERCICE1 qui concerne l'arithmétique **(au choix)**……3.5 points — **ou
> bien** — EXERCICE2 qui concerne les structures algébriques **(au
> choix)**……3.5 points — EXERCICE3 qui concerne les nombres complexes
> **(obligatoire)**……3.5 points — EXERCICE4 qui concerne l'analyse
> **(obligatoire)**……13 points »
> « Tu choisis de traiter EXERCICE1 ou bien EXERCICE2 »
> « Tu traites obligatoirement EXERCICE3 et EXERCICE4 »
> « **EXRECICE1** :(3.5points/au choix) »  ← coquille du sujet officiel
> « Si tu choisis de traiter EXERCICE1 il ne faut pas traiter EXERCICE2 »

**Arabe** : aucune consigne.
**Barème d'un candidat : 3,5 + 3,5 + 13 = 20.**
Contrôles : `<title>` = « … Sciences Maths 2020 **Rattrapage** — Sujet » ;
page : `الدورة الاستدراكية 2020`, code `RS 25`, 4 pages numérotées 1/4→4/4 ;
md5 distinct de la session normale ; l'exercice 1 lui-même diffère (2020 R
ouvre sur deux nombres premiers p, q et le théorème de Bézout ; 2020 N ouvre
sur l'équation diophantienne 7x − 13y = 5).

### 2.3 PC 2025 N — **faux positif** du grep, pas un choix

La page 1 porte « Les exercices peuvent être traités **séparément selon le
choix du candidat(e)** ». C'est la consigne d'**ordre de traitement**, pas un
choix d'exercice : les quatre exercices sont tous à traiter et somment à
7+2,5+5+5,5 = 20. Toutes les autres épreuves du corpus disent la même chose
sous une forme qui ne déclenche pas le grep (« selon l'ordre choisi par le
candidat », « suivant l'ordre qui lui convient »). **Aucun exercice optionnel.**

### 2.4 PC 2014 N — **défaut d'impression**, pas un choix

La seule autre page dont les barèmes ne somment pas à 20. La page 1 déclare
« Chimie : (07 points) » et « **Physique : (13 points)** », puis détaille la
physique en `Ondes mécaniques (03) + Electricité (04,5) + Mécanique (06)` =
**13,5**. Le total déclaré est 7 + 13 = 20 ; ce sont les sous-barèmes de la
physique qui débordent de 0,5. **Le barème d'un candidat vaut 20** ; il n'y a
aucun exercice optionnel. À connaître avant toute transcription de ce sujet —
un assembleur qui sommerait les sous-barèmes afficherait 20,5/20.

---

## 3. Le compte

> **2 épreuves à choix sur 61 épreuves examinées** — SM 2020 session normale
> et SM 2020 session rattrapage, toutes deux en Sciences Mathématiques, la
> seule année concernée. **59 sont de format standard** (dont 1, SM 2018 N,
> conclue par le barème et non par la consigne, absente du retype).
> **0 non concluante. 47 lignes du corpus restent non couvertes.**

Détail par filière :

| Filière | Examinées | À CHOIX | Standard | Non concluant | Non couvert |
|---|--:|--:|--:|--:|--:|
| SM (36 sessions attendues) | 16 | **2** | 14 | 0 | 20 |
| SExp (36 attendues) | 16 | 0 | 16 | 0 | 20 |
| SPC (36 attendues) | 29 | 0 | 29 | 0 | 7 |
| **Total (108 attendues)** | **61** | **2** | **59** | **0** | **47** |

Le format à choix est donc, sur ce qui est ouvert : **inexistant hors SM**,
**inexistant en SM hors 2020**, et **présent sur les deux sessions de 2020**.

---

## 4. Ce qui reste non couvert (47 lignes)

Aucune de ces lignes ne porte d'identifiant exploitable dans son census ;
aucune n'a été devinée. Ce sont des trous de sourcing, pas des résultats.

**SM — 20 lignes.** 2008 N·R, 2009 N·R (`non recherché`, hors annonce du hub) ·
2010→2016 **N** (7 lignes `non lu` : scan sur disque avant redémarrage, élément
jamais consigné) · 2010→2016 **R** (7 lignes `non recherché`, sur le hub, élément
non relevé) · 2017 R, 2018 R (`non recherché`).
**C'est le trou qui compte** : SM est la seule filière où le format à choix
existe, et **14 de ses 36 sessions restent fermées**, dont les sept normales
2010–2016. Une passe de relevé d'éléments sur `section/4660` les ouvrirait
toutes (le hub les annonce) ; le coût est un fetch par ligne.

**SExp — 20 lignes.** 2008 N·R (`non recherché`) · 2009→2015 **N** (7 lignes,
retypes AGOUZAL/2BPCF sans élément consigné) · 2009→2015 **R** (7 lignes
`non recherché`) · 2017 R, 2018 R (`non recherché`) · 2025 N et 2025 R
(scan lu en 2026-07 mais **élément non consigné** — il faut le retrouver sur
`section/5321`).

**SPC — 7 lignes.** 2008 R, 2009 R, 2010 R, 2012 R, 2013 R, 2015 R
(`non recherché` — le hub `section/4585` les annonce) · 2011 N
(`non consigné` : couverture lue en v0.3, URL perdue).

---

## 5. Ce que ça coûte au dépôt **aujourd'hui**

Mesuré en lecture seule sur les 35 groupes `source.{filiere, year, session}`
présents dans les `content/*/*/bank.yaml`, avec la règle exacte de
`listEpreuves()` (somme des `bareme_total`, seuils `COMPLETE_MIN = 19,5` et
`LISTEE_MIN = 9,75`).

### 5.1 SM 2020 normale — **déjà sur-comptée, et listée à cause de ça**

| Entrée | Notion | Libellé sujet | `bareme_total` |
|---|---|---|--:|
| `bk-2020-n-x1` | `maths/arithmetique` | Exercice 1 *(au choix)* | 3,5 |
| `bk-2020-n-x2` | `maths/structures-algebriques` | Exercice 2 *(au choix)* | 3,5 |
| `bk-2020-n-x3` | `maths/nombres-complexes-2` | Exercice 3 *(obligatoire)* | 3,5 |
| | | **Total tiré par l'assembleur** | **10,50** |

Le fait, plus dur que ce que K-0 énonçait : **aucun candidat réel n'a jamais
pu totaliser plus de 7,00 points** avec ces trois entrées (un des deux
exercices au choix, plus l'exercice 3). Le dépôt en affiche 10,50.
**Sur-comptage : +3,50.**

Et la conséquence qui n'était pas tracée : **7,00 < 9,75 ≤ 10,50**. Le seuil
`LISTEE_MIN` est exactement dans l'intervalle. **SM 2020 normale n'apparaît
dans Examens blancs que parce qu'elle est sur-comptée** ; à barème honnête,
le même code la retirerait de la liste — c'est-à-dire qu'elle atteindrait
d'elle-même l'issue n° 3 de K-0, sans qu'on ait à la choisir.

Après conversion de l'exercice 4 (analyse, 13 pts), l'assembleur tirerait
**23,50**, `complete = true` (≥ 19,5), et la carte annoncerait 23,50/20.

### 5.2 SM 2020 rattrapage — **pas encore en banque, même piège en attente**

**0 entrée.** Le groupe `('SM','2020','rattrapage')` n'existe pas dans les
`bank.yaml` ; l'épreuve ne coûte donc rien aujourd'hui et n'apparaît nulle
part. Elle porte exactement la même structure (3,5 / 3,5 au choix · 3,5
obligatoire · 13 obligatoire) : toute transcription future la fera entrer
dans le même défaut. Elle **double** la portée de l'arbitrage sans rien
changer à sa nature.

### 5.3 Aucune autre épreuve du dépôt n'est concernée

Les 35 groupes en banque ont été confrontés un à un au tableau du §1 : les
34 autres correspondent tous à des épreuves de format **standard**. Huit
groupes somment en dessous de 20 (SExp 2018 N à 9,00 ; SM 2021 N à 8,00 ;
les cinq SPC anciens entre 1,75 et 7,00 ; SM 2020 N à 10,50) — pour sept
d'entre eux c'est de la **transcription partielle**, pas du sur-comptage :
leurs sommes monteront à 20,00 quand les exercices manquants seront
convertis. **Le seul groupe où la somme ment est SM 2020 normale.**

*Mesure prise le 2026-08-27 à 18:46 UTC. Le corpus bougeait pendant la
passe : une session concurrente a converti SM 2022 normale (de 10,00 à
20,00, 4 entrées) entre ma première lecture et celle-ci. Les deux lectures
donnent le même verdict sur les formats ; seul ce décompte de groupes
partiels est daté.*

---

## 6. Ce que la mesure change pour les trois issues de K-0

Factuel, sans recommandation. Les trois issues sont citées de K-0.

**Le dénominateur du coût est 2, pas « beaucoup », et pas 1.** Le pire cas
imaginé par K-0 — « si le format est courant, l'option 1 devient la seule
raisonnable » — **n'est pas réalisé** : sur 61 épreuves ouvertes, 2 sont
concernées, sur une seule année, dans une seule filière.

**Issue 1 — apprendre l'option au modèle** (champ `groupe_choix` sur `source`,
au plus une entrée comptée par groupe ; touche le schéma de banque, le
validateur et l'assembleur). Son coût d'implémentation est **inchangé** par
cette mesure : il ne dépend pas du nombre d'épreuves. Son bénéfice, lui, est
désormais chiffré : elle débloque **2 épreuves** (dont 1 déjà en banque), soit
2 sur 61 examinées et 2 sur 108 attendues. C'est la seule issue qui rend
convertible l'exercice 4 (13 pts) de chacune des deux.

**Issue 2 — n'en banquer qu'un des deux, et dire lequel et pourquoi dans le
`sourcing.note` de l'autre.** Cette mesure ne change pas son coût de principe
(un exercice vérifié laissé hors corpus) mais elle en **double le volume** :
2 exercices écartés au lieu de 1, si les deux sessions 2020 sont un jour
transcrites. Fait nouveau à verser au dossier : sur SM 2020 normale, cette
issue est **déjà à moitié appliquée à l'envers** — les deux exercices au choix
sont en banque tous les deux (`bk-2020-n-x1` et `bk-2020-n-x2`) ; l'appliquer
signifierait **retirer** une entrée existante, pas seulement en écarter une
future.

**Issue 3 — laisser l'épreuve hors d'Examens blancs, marquée non
assemblable.** Son coût est le plus directement chiffré par cette mesure :
**2 épreuves sur 108**, dont 1 seule est aujourd'hui listée. Fait nouveau :
sur SM 2020 normale, l'effet visible de cette issue serait **nul par rapport
à un affichage honnête** — à 7,00 points réels l'épreuve tombe déjà sous
`LISTEE_MIN` et disparaîtrait de la liste de toute façon. Ce que l'issue 3
coûte réellement, c'est l'exercice 4 de chaque session (13 pts d'analyse,
deux fois), qui ne rejoindrait jamais Examens blancs — mais qui resterait
banquable dans sa notion.

**Un fait qui vaut pour les trois.** Le corpus n'est balayé qu'aux
**deux tiers** (61 / 108). Les 47 lignes du §4 sont majoritairement des
sessions **anciennes** (SM 2010–2016, SExp 2009–2015) ; le format à choix
observé est, lui, **récent et isolé** (2020, les deux sessions). Rien dans ce
qui est ouvert ne suggère une seconde poche, mais **le balayage ne prouve
l'absence que sur ce qu'il a ouvert** — et il n'a pas ouvert les 14 sessions
SM manquantes, qui sont exactement la filière où le format existe.

---

## 7. Opinion — étiquetée comme telle, séparée de la mesure

*Ce qui suit n'est pas un résultat de mesure et n'engage pas les §1 à §6.
L'arbitrage appartient à l'owner.*

Le chiffre 2/61 m'incline vers un ordre d'opérations plutôt que vers une
issue : **fermer les 14 sessions SM non couvertes avant de trancher**, parce
que c'est la seule filière où le format existe et la seule où le balayage est
incomplet ; c'est ~14 fetches et une passe d'OCR, soit très peu au regard
d'une décision de schéma. Si les 14 confirment l'isolement de 2020, l'issue 1
(un champ de schéma pour deux épreuves) me paraît chère au regard de l'issue
3, d'autant que l'affichage honnête de SM 2020 normale la déclasse
spontanément sous le seuil. Si en revanche deux ou trois sessions anciennes
sortent au même format, l'arithmétique s'inverse et l'issue 1 redevient la
seule propre.

Ce que je ne ferais pas, quelle que soit l'issue : **laisser le dépôt dans
son état actuel**. `bk-2020-n-x1` et `bk-2020-n-x2` cohabitent aujourd'hui
dans un total que personne ne peut obtenir, et c'est ce total qui fait
apparaître l'épreuve dans Examens blancs. C'est le seul point où la mesure
constate un affichage faux **maintenant**, indépendamment de toute conversion
future.

---

## Retractions and Corrections

*(section présente même vide — convention du dépôt)*

- **Correction apportée à K-0.** K-0 pose la question « SM 2020 est-elle la
  seule épreuve du corpus à ce format ? ». Réponse mesurée : **non** —
  `SM 2020 rattrapage` (`element/109639`, `RS 25`) porte le même format,
  mot pour mot. K-0 ne pouvait pas le savoir : le census marque cette ligne
  `sourcé-listé`, « jamais ouvert ». À reporter dans K-0 et dans
  `docs/sujets/maths/CENSUS.md` §1 lors de la prochaine réconciliation —
  **non fait ici** : ce document n'écrit qu'un fichier.
- **Rien d'autre n'est retiré.** Le reste de K-0 (mécanique du défaut, calcul
  10,50, calcul 23,5 après conversion) est confirmé entrée par entrée au §5.
