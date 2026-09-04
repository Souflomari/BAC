# CENSUS — Examens nationaux PC (2ème Bac, SPC/BIOF), 2008–2025, sessions N + R

> **Phase B1 du plan `docs/pipeline/mastery-push-plan.md` (Lane B).** Carte de
> ce qui existe et où, décomposé en exercices mappés sur les 25 slugs de
> `content/pc/`. Ce document est un **recensement**, pas une transcription
> (la transcription = B2, protocole `README.md` §3).
>
> **Honnêteté de cette passe (2026-07-24).** La session de recherche B1 a été
> interrompue par un redémarrage d'infrastructure après ~15 h ; les résultats
> de recherche web non consignés ont été **perdus**. Ce census converge donc
> sur ce qui est **vérifiable depuis le dépôt** (INDEX.md v0.3 + les 29
> entrées vérifiées des fichiers `<slug>.md`). Tout le reste porte un
> marqueur honnête : `non recherché` (jamais atteint dans ce qui a survécu),
> `(?)` (mapping incertain), `carte non consignée` (couverture lue en v0.3
> mais relevé d'exercices non écrit dans INDEX). **Aucune ligne n'est
> inventée.** Aucun sujet n'est marqué `introuvable` : les seuls trous
> restants n'ont pas été cherchés (ou le résultat de la recherche est perdu),
> ce qui n'est pas la même chose qu'une recherche réelle infructueuse.

**Légende statut** ·
`sourcé-confirmé` = URL connue **et** scan ouvert (en-tête/couverture lu, filière SPC confirmée) ·
`sourcé-listé` = URL `element/<n>` relevée sur le hub AlloSchool, page jamais ouverte ·
`non consigné` = trace de lecture en v0.3 mais URL absente de nos notes ·
`non recherché` = jamais atteint.

**Patterns d'URL (AlloSchool, source primaire — INDEX §2)** ·
page sujet : `https://www.alloschool.com/element/<ID>` ·
images de scan : `https://www.alloschool.com/assets/documents/course-422/upload-<ID>/000k-big.jpg` ·
hub : `https://www.alloschool.com/section/4585` (annonce 2008→2025, N+R, complet).

---

## 1. Table par session (36 sujets attendus)

| Année | Session | Code | Source (element / upload, pages) | Statut |
|------:|:-------:|:----:|----------------------------------|--------|
| 2008 | N | — | `upload-45082` (6 p.) | sourcé-confirmé |
| 2008 | R | — | — | non recherché |
| 2009 | N | — | `upload-45088` (8 p.) | sourcé-confirmé |
| 2009 | R | — | — | non recherché |
| 2010 | N | NS28 | `element/94443` · `upload-70311` (6 p.) | **décomposé + VÉRIFIÉ** (2026-08-28) | PDF *born-digital*. **9 défauts du sujet officiel** — dont la tangente dessinée qui n'est PAS la tangente de la courbe (13,1 ms contre 12,4 ms, 5,5 % d'écart, et elle porte une question) ; « 1 μF = 10⁻¹² F » ; les électrodes A et B jamais nommées sur la figure qu'une question interroge. **⚠️ RÉFUTE UNE VALEUR PUBLIÉE** : $t_{1/2} \approx$ **13 min** contre les ≈ 20 min de `bk-2010-n-x1`, par mesure au pixel PUIS par un corrigé (`element/39366`, arabophone, non officiel). ~~Doublon d'élément : `94444`~~ — **RECTIFIÉ le 2026-08-28 : ce n'est pas un doublon**, c'est l'exemplaire `course-423` (Sciences Physiques) du cross-listing normal à trois cours. Je l'avais étiqueté « doublon » avant de comprendre la structure. Corrigés SPC : la série n'en a qu'à partir de **2016** |
| 2010 | R | **RS28** *(établi par l'original arabe, absent du document français)* | `element/57723` · jumeaux MD5-identiques ; **original arabe + corrigé : `element/39367` / `39368` (cours arabophone `course-311`)** | **décomposé + VÉRIFIÉ** (2026-09-03) | SUJET ENTIER transcrit ET vérifié par passe adversariale indépendante — 8/8 MD5 identiques sur une troisième fenêtre de temps, barème recompté par deux chemins NEUFS (OCR intégral, puis couche de texte de l'original arabe : 30 valeurs identiques une à une), six figures re-mesurées **au tracé vectoriel** de l'original et non au pixel du scan. **30/30 questions résolubles, aucune erreur de transcription.** Le trou du § 10 est comblé : **confrontation phrase à phrase à l'arabe**, 15 divergences de traduction relevées dont **3 touchent le sens** — « hydroxyde » pour hydroxyle, le symbole τ supprimé (τ′ se retrouve sans antécédent), et « établir » pour « écris », **consigne renforcée par la traduction**. Un défaut **inventé** par la transcription a été supprimé (L8). **Deux défauts du sujet MINISTÉRIEL ajoutés** : les figures 5 et 6 sont dessinées à des rapports F_p/f_s incompatibles (≈8 contre ≈20, et le ≈8 viole le critère F_p ≥ 10·f_s que le sujet fait lui-même énoncer) ; le trait de balayage de la figure 6 n'est pas sur l'axe de symétrie. Le corrigé arabe, **témoin et non arbitre**, corrobore 16 re-dérivations mais commet lui-même une erreur d'arithmétique de +1,2 % sur M_M : Chimie 7 (aspirine synthèse 3,75 + aspirine/eau 3,25) · Ex1 fibre optique 3 · Ex2 élec 4,5 (LC 3 + modulation 1,5) · Ex3 Mars 5,5 = **20,00**, 30 questions. **⚠️ LE DOCUMENT FRANÇAIS N'EST PAS L'ÉDITION MINISTÉRIELLE** : traduction professorale signée (OUSBANE & EL AAMRANI), cartouche « المسالك الدولية » anachronique (cadre 2014+), aucun code d'examen imprimé. **L'original arabe ET son corrigé ont été trouvés** — barème confronté 30/30, quatre défauts requalifiés par cette confrontation. **Question d'anatomie ouverte** : la physique est imprimée « Exercice 1/2/3 » et la chimie sans numéro — position contre libellé, arbitrage owner avant conversion (§ 7.1 du sas) |
| 2011 | N | NS28 | `element/94445`/`94446`/`94447` · `upload-70313`/`70314`/`70315` (7 p.) | **décomposé + VÉRIFIÉ + CONVERTI** (2026-08-29, 6 entrées `bk-2011-n-x1…x4b` = 20,00 — 35ᵉ épreuve complète ; garde S1 implémentée dans x1 : aucune valeur absolue de ΔP tirée de la figure, bloc ⛔ déclaré au fil du texte élève) | PDF **hybride** Nitro Pro (figures bitmap 130–176 dpi, frère exact de 2011 R — même re-fabrication du 2020-03-09 à 26 s près). Chimie 7 · nucléaire 3 · élec 4,5 · méca 5,5 = 20, **27 questions, barème confirmé par QUATRE chaînes**. **⚠️ Défaut de fond S1** : le plateau de la figure 1 de chimie (≈ 740 hPa mesuré) contredit les données imprimées (≈ 227 hPa attendus, facteur 3,26 ; courbe tracée avec x_max = nᵢ(H₃O⁺) = 0,03 mol) ; t½ reste résoluble (≈ 42 min). **Corrigé non officiel** (auteur : forum SVT d'Asilah, servi par DEUX agrégateurs indépendants — TelmidTice et talamidi.com, MD5 identiques) : 27/27 valeurs concordantes, **mais** il imprime une demi-équation non équilibrée, corrige un défaut en silence et **ne voit pas S1** — excellent témoin de valeurs, pas un arbitre. **S1 CONFIRMÉ par la vérification** (plateau 736,9 ± 2 hPa contre 227,4 attendus, facteur 3,24, mécanisme validé à <1 %) ; garde de conversion : aucune valeur absolue de ΔP ne doit être tirée de la figure |
| 2011 | R | RS28 | `element/94449` (+ jumeaux `94448`/`94450`, PDF byte-identiques) · `upload-70317` (7 p.) | **décomposé + VÉRIFIÉ** (2026-08-28) | PDF **hybride** — couche de texte native mais **figures en bitmap 141–196 dpi** (premier des cinq PC dans ce cas ; toute lecture graphique est plafonnée par le pixel, chiffré figure par figure). Chimie 7 · Ondes 2,5 · Élec 5 · Méca 5,5 = 20. **⚠️ La divergence « 05 / 05,5 » est TRANCHÉE** : c'est la p. 6 qui est fautive (voir `rotation-axe-fixe.md`). **Aucun corrigé n'existe.** 40 occurrences de défauts sur 32 types |
| 2012 | N | NS28 | `element/94452` · `course-422/upload-70320` (6 p.) | **décomposé + VÉRIFIÉ** (2026-08-28) | PDF natif Nitro Pro. Barème refait par deux chemins. **Défaut du sujet officiel : les DEUX couples étiquetés `pKA1`**, ce qui rend une question formellement insoluble — la banque le corrigeait déjà en silence, correction désormais **déclarée** dans `transformations-deux-sens`. Une lecture de la transcription corrigée : E_C(0) n'est **pas** 17,5 mJ mais 18,5–19,5, et la valeur est déclarée **NON LISIBLE** |
| 2012 | R | **RS28** *(imprimé au cartouche, OCR 6/6 pages)* | `element/94454`·**`94455`**·`94456` (jumeaux MD5-identiques) ; **original arabe + corrigé : `39377` / `39378`** | **décomposé, vérification INTERROMPUE** (2026-09-03) | SUJET ENTIER transcrit (`_incoming/pc-2012-r.md`) ; **une passe adversariale a écrit 14 sections complètes puis a été tuée avant de conclure** — aucun bloc ne porte encore `Statut: vérifié`, donc le fichier N'EST PAS clearé pour conversion. Ce qui est acquis : 4 contrôles + 3 instruments refaits (tous PASS), barème 20,00 par trois chemins, **F1 confirmé par trois témoins**, F2–F5 confirmés, courbe x(t) re-mesurée par deux chaînes, deux erreurs de plus qu'annoncé dans le corrigé. **Le piège d'extraction de 2013 R a été testé ici et NE SE PRÉSENTE PAS** — c'est un défaut du PDF de 2013, pas une propriété de la série : Chimie 7 (électrolyse CuBr₂ 3 + cinétique d'hydrolyse 4) · Ondes 2,5 (diffraction) · Élec 5 (circuit LC 3 + réception AM 2) · Méca 5,5 (Kepler, Jupiter et Io) = **20,00**, 31 questions, barème par TROIS chemins concordants. **⚠️ L'ÉDITION FRANÇAISE EST MINISTÉRIELLE — l'inverse de 2010 R** : code `RS28` au cartouche, formule d'époque « الموضوع (الترجمة الفرنسية) » et non le cadre 2014+, pieds de page VIDES à 300 dpi (aucun crédit de traducteur), barème miroir exact de l'arabe. **Conséquence de méthode : la catégorie « artefact de traduction » ne s'applique pas ici — les écarts FR/AR sont des défauts de l'édition OFFICIELLE.** **Défaut grave F1** : « les deux parties **1 et 2** permettent la démodulation » là où l'arabe écrit deux fois **2 et 3**, ce que le corrigé ET la figure confirment — la question porte sur la mauvaise partie (arbitrage owner). Plus F2 (« figure 2 » contre un schéma intitulé Figure 1), F3 (« Mars » dans un exercice sur Jupiter), F4/F5 (noms amputés), 27 fautes, 4 défauts de notation. **Corrigé arabe = témoin inédit** (rien à traduire avant 2016) : 26 concordances pleines, et **il a tort sur la vitesse volumique** (il divise par le volume d'ester au lieu du volume total, facteur 3,33) |
| 2013 | N | — | `upload-70326` (7 p.) | sourcé-confirmé |
| 2013 | R | **RS28** *(imprimé, identique à celui de l'original arabe)* | **`element/94461`** · jumeaux `94460`/`94462` — *résolus par fetch, le CENSUS ne les connaissait pas* ; **original arabe + corrigé : `39382` / `39383`** | **décomposé + VÉRIFIÉ** (2026-09-03) — passe adversariale indépendante, **7 blocs sur 7 `Statut: vérifié`**, 33/33 questions résolubles sous trois gardes. Barème par **cinq chemins** (dont un OCR de la seule colonne de marge, jeu de caractères restreint aux chiffres) : 20,00 chaque fois. **E_m TRANCHÉ à 22,7 mJ contre les 25 du corrigé, et par un argument que la transcription n'avait pas** : l'énoncé impose sinθ≈θ, donc le potentiel harmonique, qui donne 22,725 mJ — à **0,013 %** des 22,728 mesurés au tracé vectoriel. Le dessin EST la courbe calculée ; 25 mJ est à **68 σ**, et le propre dessin annoté du corrigé le réfute (sa ligne « E_m = 25 » passe au-dessus de la parabole). **Défaut F2 ajouté** : la tangente (T) est tracée 5,6 % sous la dérivée réelle et ne touche jamais la courbe — même classe que le défaut déjà compté sur PC 2010 N. **Les 25 coquilles tiennent, aucune à supprimer** (une première dans le sas) et 9 manquées ajoutées, dont « A quel des trois régimes » DANS une consigne notée. **Le corrigé a 4 défauts de RAISONNEMENT** (dont un q tombé d'une réponse encadrée). **Le piège d'extraction est EXPLIQUÉ** : le PDF embarque deux copies de Times New Roman que l'extracteur nomme identiquement — « 0,5 » et « 5,0 » sortent avec la même police à la même taille, **aucun filtre ne peut les trier**. Audit exhaustif : aucun chiffre du fichier ne repose sur la seule couche arabe | SUJET ENTIER transcrit (`_incoming/pc-2013-r.md`, **NON vérifié**) : Chimie 7 (électrolyse NiCl₂ 2 + acide méthanoïque 2,25 + estérification 2,75) · nucléaire 2,5 (iode 131, Fukushima) · élec 5 (RL 2,25 + RLC 2,75) · méca 5,5 (pendule pesant) = **20,00**, 33 questions, **33/33 résolubles**, barème par trois chemins (33/33 identiques entre éditions). **Édition française MINISTÉRIELLE** — les trois indices qui avaient confondu 2010 R sont tous négatifs : pied de page vide sur 6/6 au rendu 300 dpi, libellé d'époque du CNEE, et surtout le **code RS28 imprimé, identique à l'arabe** (un traducteur privé n'a pas de code d'examen). **PIÈGE NEUF, à porter au protocole : les CHIFFRES de la couche de texte arabe sont faux et PLAUSIBLES** — « الشكل 1 » s'extrait « الشكل 3 » ; barème, légendes et dates ont dû être relus au rendu. **Défaut du sujet F1** (les deux éditions) : l'amortissement de la figure 4 correspond à R ≈ 50 Ω contre les 208,4 Ω du circuit, facteur 4,2 — aucune question insoluble, garde de conversion posée. **Corrigé arabe, témoin inédit : 31 concordances sur 33, et sur les deux divergences le dessin lui donne tort** (E_m = 25 mJ contre 22,7 mesuré par deux chaînes — et il se contredit lui-même en lisant 10 mJ en 2θm/3, ce qui impose 22,5) |
| 2014 | N | — | `upload-70333` (7 p.) | sourcé-confirmé |
| 2014 | R | — | `element/94469` · `upload-70336` (7 p.) | sourcé-confirmé |
| 2015 | N | NS28 | `element/94472` · `upload-70340` (7 p.) ; **exemplaire correctement libellé `94474`** | **décomposé + VÉRIFIÉ** (2026-08-28) | 27/27 questions re-dérivées, 26 résolubles. **Défaut du sujet officiel rendant la q. 2-3 insoluble** : `ρ = 0;78 g.L⁻¹` (point-virgule + unité fausse d'un facteur 1000 → rendement 8 846 % au lieu de 75 %). 25 coquilles distinctes. **Aucun corrigé officiel** (la série SPC n'en a qu'à partir de 2016) |
| 2015 | R | RS 28 | `element/94476` · `course-422/upload-70343` (7 p.) ; jumeaux `94475`/`94477` | **décomposé + VÉRIFIÉ + CONVERTI** (2026-08-29, 8 entrées `bk-2015-r-x1…x4b` = 20,00 — 36ᵉ épreuve complète ; F1–F4 déclarés en blocs CORRECTION ASSUMÉE/DÉFAUT DU SUJET : Pb rétabli contre le « Po » imprimé dans x2b, labels de x4b disant la position réelle contre le double « Première partie », renvoi de figure reformulé contre « en fonction du temps », arbitrage barème 0,5→2-2 appliqué dans x1b) | SUJET ENTIER transcrit et vérifié par passe adversariale (re-fetch de zéro, barème 34/34 recompté par deux chemins dont un sans PDF, cinq figures re-mesurées au pixel — E(0)=1,6 mJ confirmé contre la lecture 1,2) : Ex1 chimie 7 (dosage 4 + phéromone 3) · Ex2 QCM 3 (ondes 1,5 + nucléaire 1,5) · Ex3 élec 4,5 (RL 2 + RLC 2,5) · Ex4 méca 5,5 (skieur 3 + torsion 2,5) = 20, **34 questions, toutes résolubles**. **Défauts du sujet officiel F1–F4 confirmés** (Po pour le plomb ; « Première partie » ×2 dans l'Ex4 ; « en fonction du temps » contre l'axe θ(rad) ; barème 2-2 décalé d'une ligne, arbitrage 0,5→2-2 endossé). **Corrigé non officiel svt-assilah (t1887) : page 1 atteinte via thumbnail, 7/7 concordances sur le bloc 1** (`corppcr15.pdf`) ; pages 2+ refusées en anonyme — plafond de preuve blocs 2–8 : deux chaînes concordantes |
| 2016 | N | — | `upload-45091` (8 p.) | sourcé-confirmé |
| 2016 | R | — | `element/57705` · `upload-45097` (7 p.) | sourcé-confirmé |
| 2017 | N | NS28F | `element/57711` (+ jumeaux `57710`/`57712`, PDF byte-identiques) · `upload-45103` (8 p.) ; **corrigé `57713`-`57715`** | **décomposé + VÉRIFIÉ** (2026-08-28) | PDF natif pdfFactory, figures vectorielles. Ex I 7 · Ex II 2,5 · Ex III 5 · Ex IV 5,5 = 20. **⚠️ RÉFUTE `bk-2017-n-x3` ET le sommet r-bac, à 66 σ** : $F_p$ publié à 2 kHz, mesuré à **1 003 ± 15 Hz** par sept méthodes. Dans le sommet, la valeur est dans l'**ÉNONCÉ**, donnée comme une lecture de figure. **56 coquilles sur 24 types** ; question 1.1 p. 3 **tronquée** ; plan incliné dessiné à 9,24° pour α = 23°. **CONVERTI** le 2026-08-28 : 7 entrées (x1/x1b/x1c · x2 · x3b · x4/x4b), épreuve à **20,00/20**, et la conversion **fonde la banque d'`aspects-energetiques`**. **Piège d'accès consigné** : les JPG sont sous `assets/documents/`, pas `assets/courses/` — le mauvais chemin rend 8 fichiers ASCII de 14 octets |
| 2017 | R | — | `element/57717` | sourcé-listé |
| 2018 | N | NS28F | `element/57726` · `upload-45118` (8 p.) | sourcé-confirmé |
| 2018 | R | — | `element/57732` | sourcé-listé |
| 2019 | N | NS28F | `element/68300` · `upload-54757` (7 p.) | sourcé-confirmé |
| 2019 | R | — | `element/94419` | sourcé-listé |
| 2020 | N | NS28F | `element/109742` · `upload-80870` (7 p.) | sourcé-confirmé |
| 2020 | R | — | `element/109751` | sourcé-listé |
| 2021 | N | NS28F | `element/127287` · `upload-84195` (8 p.) | sourcé-confirmé |
| 2021 | R | — | `element/127290` | sourcé-listé |
| 2022 | N | NS 28F | `element/136621` · `upload-84516` (8 p.) | sourcé-confirmé |
| 2022 | R | — | `element/136624` | sourcé-listé |
| 2023 | N | — | `element/142476` · `upload-85304` (6 p.) | sourcé-confirmé |
| 2023 | R | — | `element/142484` | sourcé-listé |
| 2024 | N | — | `element/145763` · `upload-87465` (6 p.) | sourcé-confirmé |
| 2024 | R | — | `element/145769` | sourcé-listé |
| 2025 | N | NS28F | `element/145796` · `upload-87489` (6 p.) | sourcé-confirmé |
| 2025 | R | — | `element/145799` | sourcé-listé |

**Bilan (recompté ligne à ligne le 2026-09-03) : 32/36 sourcés** — 8
`décomposé` + 15 `sourcé-confirmé` + 9 `sourcé-listé` — et **4 `non
recherché`** : les rattrapages 2008, 2009, 2012 et 2013, que le hub
AlloSchool annonce et qu'un fetch chacun résoudrait. *(2010 R, 2011 N et
2015 R sont sortis du non-recherché pendant la vague SPC 2 : transcrits
intégralement tous les trois ; 2011 N et 2015 R vérifiés ET convertis,
2010 R en attente de passe adversariale.)*

Corrigés (non recensés en détail ici) : `element/<n>` connus pour ~~2017~~
**2016**–2024 N+R (INDEX §2) ; **2025 : corrigés non publiés** au sourcing
2026-07. *(Année de départ rectifiée le 2026-09-03 : `57702`/`57708`
existent bien pour 2016, recomptés élément par élément — voir
`docs/audits/gisement-arabophone.md` § 1.)*

> **UN SECOND GISEMENT DE CORRIGÉS EXISTE, et il couvre 2008–2015** —
> c'est-à-dire précisément les années où la série francophone n'en a
> aucun. Le cours arabophone **`course-311`** publie **34 paires sujet +
> corrigé de 2008 à 2024, N et R, sans un seul trou** ; c'est un cours
> propre, pas un miroir (aucun de ses 68 éléments n'est cross-listé).
> Inventaire complet et identifiants dans
> `docs/audits/gisement-arabophone.md`.
>
> **La réserve qui compte, et elle est sévère :** un corrigé arabe et son
> homologue français ne font PAS toujours deux témoins. De **2016 à
> 2019**, deux mains distinctes signent les deux éditions. Mais de **2020
> à 2024**, une SEULE main signe les deux — même auteur, souvent le même
> jour, même pagination, le français mot pour mot la traduction de
> l'arabe. Pour ces années-là, croire tenir deux témoins indépendants
> serait une erreur de méthode exactement du type que K-8 décrit.

---

## 2. Décomposition par sujet (exercices → slugs)

Mappings issus des entrées **vérifiées** de la banque (fichiers `<slug>.md`)
et des **couvertures p.1** relevées dans INDEX. `(?)` = mapping de couverture
non confirmé par lecture des pages intérieures.

### Sujets à carte complète (7)

**2017 N (NS28F)** — 4 exercices
| Ex | Sujet | Slug(s) |
|----|-------|---------|
| I | Pile Al-Cu + réactions de l'acide butanoïque | `piles` + `reactions-acido-basiques` (?) |
| II | Onde mécanique à la surface de l'eau | `ondes-mecaniques-periodiques` (?) |
| III | Dipôle RL (échelon) + modulation d'amplitude | `dipole-rl` + `ondes-em-modulation` ✓ |
| IV | Skieur avec frottements + pendule de torsion (énergétique) | `lois-de-newton` (?) + `aspects-energetiques` (?)/`systemes-oscillants` (?) |

**2018 N (NS28F)** — 4 exercices
| Ex | Sujet | Slug(s) |
|----|-------|---------|
| I | Électrolyse PbBr₂ + acide lactique (dosage, estérification) | `electrolyse` ✓ (2026-08-06) + `reactions-acido-basiques` ✓ (2026-08-06) + `esterification-hydrolyse` ✓ (cross `controle-catalyse`) |
| II | Onde ultrasonore (célérité, retard) | `ondes-mecaniques-progressives` ✓ |
| III | Condensateur (charge/décharge) + RLC série | `rc-charge` ✓ (I-1 + I-2 complets, 2026-08-06) + `rlc-serie` ✓ |
| IV | Chute verticale d'une bille + oscillateur solide-ressort | `chute-mouvements-plans` + `systemes-oscillants` ✓ (cross `aspects-energetiques` ✓) |

**2019 N (NS28F)** — 4 exercices
| Ex | Sujet | Slug(s) |
|----|-------|---------|
| I | Électrolyse ZnI₂ + conductimétrie acide benzoïque | `electrolyse` ✓ + `reactions-acido-basiques` ✓ (cross `etat-equilibre`) |
| II | Onde à la cuve + radon 222 | `ondes-mecaniques-periodiques` ✓ + `decroissance-radioactive` ✓ (cross `noyaux-masse-energie`) |
| III | Charge/décharge condensateur + oscillations LC | `rc-charge` ✓ + `rlc-serie` ✓ |
| IV | Plan incliné (2ème loi) + tremplin/projectile | `lois-de-newton` ✓ + `chute-mouvements-plans` |
 
**2020 N (NS28F)** — 5 exercices
| Ex | Sujet | Slug(s) |
|----|-------|---------|
| I | Dosage ammoniac + pile argent-chrome | `reactions-acido-basiques` ✓ + `piles` ✓ (cross `evolution-spontanee`) |
| II | Propagation des ondes (QCM + cuve) | `ondes-mecaniques-periodiques` ✓ (transcrit non vérifié 2026-08-06 ; cross `ondes-mecaniques-progressives`) |
| III | Polonium 210 (masse-énergie + décroissance) | `noyaux-masse-energie` ✓ (cross `decroissance-radioactive`) |
| IV | Dipôle RL (échelon) + RLC (amortissement, entretien) | `dipole-rl` ✓ + `rlc-serie` (lu p.5–6, transcription à ajouter) |
| V | Chute verticale bille, liquide visqueux (Euler) | `chute-mouvements-plans` ✓ |

**2021 N (NS28F)** — 5 exercices
| Ex | Sujet | Slug(s) |
|----|-------|---------|
| I | Cinétique saponification + dosage acide carboxylique | `suivi-temporel-vitesse` ✓ (cross `transformations-lentes-rapides`) + `reactions-acido-basiques` ✓ |
| II | Dispersion prisme + diffraction | `propagation-onde-lumineuse` ✓ |
| III | Plutonium 238 (décroissance, activité) | `decroissance-radioactive` ✓ |
| IV | RC (échelon) + LC + modulation d'amplitude | `rc-charge` + `rlc-serie` + `ondes-em-modulation` — **transcrit (non vérifié) 2026-08-06** (p.5–7, 3 entrées, README §3) |
| V | Mouvement d'un parachutiste | `chute-mouvements-plans` |

**2025 N (NS28F)** — 4 exercices, barème 7+2,5+5+5,5 = 20 (couverture p.1)
| Ex | Sujet | Slug(s) |
|----|-------|---------|
| I | Dosage hydrogénosulfite de sodium + suivi cinétique estérification (température/catalyseur) | `reactions-acido-basiques` ✓ (P1, cross `etat-equilibre`) + `controle-catalyse` ✓ (P2, déjà vérifié, cross `suivi-temporel-vitesse`) |
| II | Désintégration du cadmium 107 | `decroissance-radioactive` ✓ (cross `noyaux-masse-energie` pour Q3-3) |
| III | Charge (générateur de courant) + décharge dans dipôle RL (pseudopériodique) + sélection/démodulation AM | `rc-charge` ✓ (P1) + `rlc-serie` ✓ (P2, précédent : même intitulé que 2020 N Ex IV-II) + `ondes-em-modulation` ✓ (P3) |
| IV | Satellite artificiel (gravitation, 3ᵉ loi de Kepler) + oscillateur solide-ressort | `chute-mouvements-plans` ✓ (P1 — **pas** `atome-mecanique-newton`, voir note de routage dans ce fichier) + `systemes-oscillants` ✓ (P2, cross `aspects-energetiques`) |

**Transcrit (non vérifié) le 2026-08-06 : 6 nouvelles entrées** (Ex I-P1, Ex II,
Ex III-P1, Ex III-P2, Ex IV-P1, Ex IV-P2) + 3 notes de cross-list
(`etat-equilibre`, `noyaux-masse-energie`, `aspects-energetiques`) + 1 note de
cross-list vers une entrée déjà existante (`suivi-temporel-vitesse` →
`controle-catalyse`). Ex I-P2 (`controle-catalyse`) était déjà `vérifié`
depuis la passe v0.3 (2026-07-14), non retouché.

**2024 N (NS28F)** — 5 exercices, barème 7+2,5+2+3,5+5 = 20 (couverture p.1,
`element/145763` · `upload-87465`, 6 p. ; en-tête image confirmé SPC/BIOF,
NS28F — le résumé HTML d'AlloSchool annonce à tort « Sciences Mathématiques
B », README §3)
| Ex | Sujet | Slug(s) |
|----|-------|---------|
| 1 | Suivi temporel dégradation vitamine C (P1) + dosage pH-métrique vitamine C (P2) | `suivi-temporel-vitesse` ✓ (P1) + `reactions-acido-basiques` ✓ (P2, cross `etat-equilibre`) |
| 2 | Propagation d'un signal à la surface de l'eau | `ondes-mecaniques-progressives` ✓ |
| 3 | Désintégration de l'iridium 192 | `decroissance-radioactive` ✓ (pas de volet masse-énergie cette fois) |
| 4 | Décharge d'un condensateur dans un dipôle RL (P1) + réponse d'un dipôle RL à un échelon (P2) | `rlc-serie` ✓ (P1, précédent : même intitulé que 2020 N Ex IV-II / 2025 N Ex III-P2) + `dipole-rl` ✓ (P2) |
| 5 | Chute verticale d'une bille dans un liquide (P1) + mouvement d'un système mécanique : plan incliné + poulie (P2) | `chute-mouvements-plans` ✓ (P1) + `rotation-axe-fixe` ✓ (P2, précédent : même montage que 2011 R) |

**Transcrit (non vérifié) le 2026-08-06 : 8 nouvelles entrées** (Ex1-P1,
Ex1-P2, Ex2, Ex3, Ex4-P1, Ex4-P2, Ex5-P1, Ex5-P2) + 1 note de cross-list
(`etat-equilibre`, depuis Ex1-P2 Q5-4) + correction du header
`rotation-axe-fixe.md` (l'entrée 2011 R n'est plus l'unique annale dédiée
de ce thème). **2024 N passe à carte complète (2026-08-06).**

**2023 N (NS28F)** — 4 exercices, barème 7+2,5+5+5,5 = 20 (couverture p.1,
`element/142476` · `upload-85304`, 6 p. ; en-tête image confirmé SPC/BIOF,
NS 28F — le résumé HTML d'AlloSchool annonce à tort « Sciences
Mathématiques B », README §3)
| Ex | Sujet | Slug(s) |
|----|-------|---------|
| 1 | Réactions de l'acide éthanoïque (eau §1, ion méthanoate §2, méthanol §3) | `etat-equilibre` ✓ (§1) + `reactions-acido-basiques` ✓ (§2) + `esterification-hydrolyse` ✓ (§3, cross `controle-catalyse`, `suivi-temporel-vitesse`) |
| 2 | Transformations nucléaires du tritium (désintégration §1, fusion §2) | `decroissance-radioactive` ✓ (§1) + `noyaux-masse-energie` ✓ (§2) |
| 3 | Dipôle RL échelon (§1) + circuit LC (§2) + modulation d'amplitude (§3) | `dipole-rl` ✓ (§1) + `rlc-serie` ✓ (§2) + `ondes-em-modulation` ✓ (§3) |
| 4 | Chute d'une balle (Partie I) + mouvement d'une balançoire, pendule pesant (Partie II) | `chute-mouvements-plans` ✓ (P1) + `systemes-oscillants` ✓ (P2, cross `aspects-energetiques`) |

**Transcrit (non vérifié) le 2026-08-06 : 10 nouvelles entrées** (Ex1-§1,
Ex1-§2, Ex1-§3, Ex2-§1, Ex2-§2, Ex3-§1, Ex3-§2, Ex3-§3, Ex4-PI, Ex4-PII) +
4 notes de cross-list (`etat-equilibre`↔`reactions-acido-basiques`,
`controle-catalyse`, `suivi-temporel-vitesse`, `aspects-energetiques`). Sujet
sans aucune entrée préexistante avant cette passe. **2023 N passe à carte
complète (2026-08-06).**

**2022 N (NS 28F)** — 4 exercices, barème 7+3,5+4,5+5 = 20 (couverture p.1,
`element/136621` · `upload-84516`, 8 p. ; en-tête image confirmé SPC/BIOF,
NS 28F — le résumé HTML d'AlloSchool annonce à tort « Sciences
Mathématiques B », README §3)
| Ex | Sujet | Slug(s) |
|----|-------|---------|
| 1 | Chromage d'une plaque d'acier par électrolyse (P1) + propriétés d'une solution aqueuse d'acide propanoïque, dosage inclus (P2) | `electrolyse` ✓ (P1) + `reactions-acido-basiques` ✓ (P2, cross `etat-equilibre`) |
| 2 | Propagation des ondes sonores dans l'air, mesure de retard (P1) + désintégration de l'iode 131 (P2) | `ondes-mecaniques-progressives` ✓ (P1) + `decroissance-radioactive` ✓ (P2, cross `noyaux-masse-energie`) |
| 3 | Réponse d'un dipôle RC à un échelon de tension (1) + oscillations libres dans un circuit RLC série (2) | `rc-charge` ✓ (§1) + `rlc-serie` ✓ (§2) |
| 4 | Chute d'une bille dans un liquide visqueux, huile de ricin (P1) + mouvement d'un satellite artificiel (P2) | `chute-mouvements-plans` ✓ (P1 et P2 — satellite classé ici et **pas** sous `atome-mecanique-newton`, même raisonnement que 2025 N Ex IV-P1, voir note de routage dans `chute-mouvements-plans.md`) |

**Transcrit (non vérifié) le 2026-08-06 : 8 nouvelles entrées** (Ex1-P1,
Ex1-P2, Ex2-P1, Ex2-P2, Ex3-§1, Ex3-§2, Ex4-P1, Ex4-P2) + 2 notes de
cross-list (`etat-equilibre`, `noyaux-masse-energie`) + 1 addendum à la
« Note de routage » de `chute-mouvements-plans.md` (satellite artificiel,
précédent 2022 N ajouté). Sujet sans aucune entrée préexistante avant cette
passe. **2022 N passe à carte complète (2026-08-06).**

### Sujets à carte partielle (4) — seul l'exercice transcrit est consigné

| Sujet | Exercice consigné | Slug(s) | Reste du sujet |
|-------|-------------------|---------|----------------|
| 2010 N (NS28) | Chimie P1 : saponification, suivi conductimétrique, t½ | `transformations-lentes-rapides` ✓ (cross `suivi-temporel-vitesse` (?)) | carte non consignée — contenu à transcrire |
| 2012 N (NS28) | Chimie P1 : acide éthanoïque + ammoniac (réaction limitée) + estérification linalol ; Chimie P2 : pile Cu-Zn, K, sens spontané | `transformations-deux-sens` ✓ (cross `esterification-hydrolyse` (?)) ; `evolution-spontanee` ✓ (cross `piles` (?)) | **PHYSIQUE TRANSCRITE** le 2026-08-27 (`_incoming/pc-2012-n.md`, NON vérifiée) : nucléaire 3,0 → `decroissance-radioactive` (2,0) + `noyaux-masse-energie` (1,0) · électricité 4,5 → `dipole-rl` (2,5) + `rlc-serie` (2,0) · mécanique 5,5 → `chute-mouvements-plans`. 21 questions, 13,00 pts recomptés par DEUX chemins (coordonnées de la couche PDF + relecture des marges). Cartouche : 7 + 13 = 20 ✔ |
| 2015 N (NS28) | Ex 1 (Chimie), 2e partie : acide benzoïque/eau — τ, Qr,éq, pKA | `etat-equilibre` ✓ (cross `reactions-acido-basiques` (?)) | carte non consignée — à transcrire |
| 2011 R (RS28) | Mécanique, 1ère situation : grue/poulie — R.F.D. rotation, J∆ | `rotation-axe-fixe` ✓ | carte non consignée — à transcrire |

**2025 N (NS28F) est passé à carte complète (2026-08-06)** — voir la table
ci-dessus (§ Sujets à carte complète).

### Sujets sans carte (18 sourcés + 7 hors atteinte)

- **Couverture lue en v0.3, carte non consignée (relevé perdu)** : 2008 N,
  2009 N, 2013 N, 2014 N, 2016 N, 2014 R, 2016 R —
  `contenu à transcrire` (une lecture de couverture chacun suffit pour la
  carte ; pipeline JPG→Read, bases `upload-` connues). **2024 N, 2023 N et
  2022 N en sont sortis (2026-08-06) : carte complète, voir § Sujets à carte
  complète.**
- **Sourcé-listé, jamais ouvert** : 2017 R, 2018 R, 2019 R, 2020 R, 2021 R,
  2022 R, 2023 R, 2024 R, 2025 R — `contenu à transcrire` (confirmer
  l'en-tête SPC à l'ouverture).
- **Non recherché — mais désormais LOCALISÉS, sujet ET corrigé** (prospection
  du 2026-09-03, `docs/audits/gisement-arabophone.md` § 4) :

  | Session | Sujet | Corrigé | Note |
  |---|---|---|---|
  | 2008 R | `element/39357` | `39358` | contrôle anti-cache tenu sur 1 page / 6 seulement |
  | 2009 R | `element/39362` | `39363` | **fax numérisé, sans couche de texte** — inexploitable sans OCR ; pour cette seule session, le français reste la meilleure source |
  | 2012 R | `element/39377` | `39378` | code `RS28` lu sur 5 pages / 6, barème de couverture relevé |
  | 2013 R | `element/39382` | `39383` | idem 5/6 |

  Ce ne sont plus des lignes vides : ce sont quatre candidats de
  transcription avec leur source et leur témoin déjà identifiés.
  *(2010 R, 2011 N, 2011 R et 2015 R sont sortis de cette liste
  auparavant : tous transcrits, et trois d'entre eux convertis — voir
  leurs lignes du § 1.)*
- **Gisement de corrigés pré-2016 identifié (2026-09-03)** : le cours
  arabophone **`course-311`** publie l'original arabe ET son corrigé pour
  2010 N (`element/39366`) et 2010 R (`39367`/`39368`) — alors que la série
  SPC francophone n'a de corrigés qu'à partir de 2016. Les rattrapages
  arabes voisins (2011 R, 2012 R…) y ont probablement leurs paires aussi :
  c'est la piste à tirer pour les lignes `non recherché` ci-dessus.

---

## 3. Rollup par notion (le chiffre qui pilote les vagues B2)

`Dédiés` = exercices/parties mappés fermes (transcrit ✓ ou titre de
couverture univoque). `Cross/(?)` = cross-lists + mappings incertains.

| Slug | Dédiés | Cross/(?) | Années-sessions (dédiés puis cross/?) |
|------|:-----:|:--------:|----------------------------------------|
| `rlc-serie` | 8 | 0 | 2018 N, 2019 N, 2020 N, 2021 N, 2022 N, 2023 N, 2024 N, 2025 N |
| `chute-mouvements-plans` | 8 | 0 | 2018 N, 2019 N, 2020 N, 2021 N, 2022 N, 2023 N, 2024 N, 2025 N |
| `rc-charge` | 5 | 0 | 2018 N, 2019 N, 2021 N, 2022 N, 2025 N |
| `reactions-acido-basiques` | 8 | 3 | 2019 N, 2020 N, 2021 N, 2018 N, 2022 N, 2023 N, 2024 N, 2025 N · (?) 2015 N, 2017 N |
| `decroissance-radioactive` | 6 | 1 | 2019 N, 2021 N, 2022 N, 2023 N, 2024 N, 2025 N · cross 2020 N |
| `dipole-rl` | 4 | 0 | 2017 N, 2020 N, 2023 N, 2024 N |
| `ondes-em-modulation` | 4 | 0 | 2017 N, 2021 N, 2023 N, 2025 N |
| `piles` | 2 | 1 | 2017 N, 2020 N · (?) 2012 N |
| `electrolyse` | 3 | 0 | 2018 N, 2019 N, 2022 N |
| `ondes-mecaniques-periodiques` | 1 | 2 | 2019 N · (?) 2017 N, 2020 N |
| `ondes-mecaniques-progressives` | 3 | 1 | 2018 N, 2022 N, 2024 N · (?) 2020 N |
| `propagation-onde-lumineuse` | 1 | 0 | 2021 N |
| `noyaux-masse-energie` | 2 | 3 | 2020 N, 2023 N · cross 2019 N, 2022 N, 2025 N |
| `lois-de-newton` | 1 | 1 | 2019 N · (?) 2017 N |
| `rotation-axe-fixe` | 2 | 0 | 2011 R, 2024 N (même type de montage : poulie/cylindre + R.F.D. rotation) |
| `systemes-oscillants` | 3 | 1 | 2018 N, 2023 N, 2025 N · (?) 2017 N |
| `suivi-temporel-vitesse` | 2 | 4 | 2021 N, 2024 N · (?) 2010 N, 2025 N · cross 2025 N (via `controle-catalyse`), 2023 N (via `esterification-hydrolyse`) |
| `transformations-lentes-rapides` | 1 | 1 | 2010 N · cross 2021 N |
| `controle-catalyse` | 1 | 2 | 2025 N · cross 2018 N, 2023 N |
| `transformations-deux-sens` | 1 | 0 | 2012 N |
| `etat-equilibre` | 2 | 6 | 2015 N, 2023 N · cross 2019/2020/2021 N, 2022 N, 2024 N, 2025 N |
| `evolution-spontanee` | 1 | 1 | 2012 N · cross 2020 N |
| `esterification-hydrolyse` | 2 | 2 | 2018 N, 2023 N · (?) 2012 N, 2025 N |
| `aspects-energetiques` | 0 | 4 | cross 2018 N, 2023 N, 2025 N · (?) 2017 N (pendule torsion — entrée autonome cible) |
| `atome-mecanique-newton` | 0 | 0 | **NON SOURCÉ** — absent des 21 couvertures lues 2008–2025 (candidat ship `unsourced`) ; 2025 N Ex IV-P1 (satellite) confirmé **hors périmètre**, classé `chute-mouvements-plans` (voir note de routage) |

---

## 4. Résumé de couverture — honnête

- **Sujets sourcés : 29/36** (20 confirmés scan-en-main, 9 listés non
  ouverts) ; 1 `non consigné` (2011 N) ; 6 `non recherché` (R 2008–2015 hors
  2011/2014). Aucun `introuvable` avéré : les trous restants n'ont pas fait
  l'objet d'une recherche qui ait survécu au redémarrage.
- **Exercices énumérés : ≈ 27** (22 sur les 5 cartes complètes 2017–2021 N
  + 5 exercices/parties consignés sur les 5 cartes partielles). Sur les
  ~125 attendus (Lane B sizing) : **≈ 22 % énuméré** — 26 sujets sur 36
  restent sans carte d'exercices.
- **Banque transcrite existante : 29 entrées, toutes `vérifié`**
  (23 passe v0.2 vérifiées 2026-07-11 + 6 passe v0.3 vérifiées 2026-07-14).
  **Ce chiffre est antérieur aux passes du 2026-08-06** (2021 N Ex IV
  `rc-charge`/`rlc-serie`/`ondes-em-modulation`, puis le comblement des trous
  de 2018 N sur `electrolyse`/`reactions-acido-basiques`/`rc-charge` — voir
  `INDEX.md` §4 pour le détail à jour) ; non recompté ici pour ne pas
  fabriquer un total non ré-audité.
- **Notions rares (0–2 dédiés)** : `atome-mecanique-newton` (0 — probable
  `unsourced`), `aspects-energetiques` (0 dédié, cross seulement),
  `rotation-axe-fixe` (1, uniquement en rattrapage), et 14 autres slugs à
  1 dédié. Seuls 4 slugs atteignent ≥ 3. **Le rollup actuel reflète la
  couverture de nos lectures, pas la fréquence réelle au bac** — les slugs
  « chaque année » (RC/RLC, ondes, nucléaire, acide-base) monteront
  mécaniquement quand les 26 cartes manquantes seront relevées.
- **Trous systématiques** : (1) les **rattrapages** — 3 couvertures lues sur
  18, 9 URLs listées jamais ouvertes, 6 jamais cherchés ; (2) l'anomalie
  **2011 N** (INDEX v0.3 revendique 18 couvertures normales lues mais aucune
  URL 2011 N n'est consignée — à re-résoudre) ; (3) les **corrigés 2025**
  non publiés au dernier sourcing. (Les normales 2022–2024, autrefois
  sourcées mais sans carte, sont désormais **toutes trois** à carte
  complète — 2024 N et 2023 N le 2026-08-06, 2022 N la même date, voir §7.)
- **Prochain incrément B1 (avant B2)** : ~35 fetchs suffisent — re-résoudre
  2011 N + 6 rattrapages manquants, ouvrir les 9 R listés, lire les 19
  couvertures sans carte — pour porter l'énumération à ~100 % des sujets
  atteignables.

## 5. Passe 2026-08-06 — harvest complet du 2025 N (NS28F)

**2025 N est passé de carte partielle (1 exercice/partie) à carte
complète : 6 nouvelles entrées `transcrit (non vérifié)` + 4 notes de
cross-list**, sur les 4 exercices/20 points du sujet (barème 7+2,5+5+5,5
recoupé et conforme à la couverture p.1). Détail dans `README.md` §4 (chaque
fichier `<slug>.md`) et dans la table « Sujets à carte complète » ci-dessus.
Point notable : l'exercice IV-Partie 1 (satellite artificiel) a été classé
sous `chute-mouvements-plans` et **pas** sous `atome-mecanique-newton`
malgré une consigne de routage générale qui aurait pu suggérer ce dernier —
`atome-mecanique-newton` reste `unsourced`, décision verrouillée
(`content/pc/atome-mecanique-newton/exercises.yaml`) réaffirmée, pas
contournée ; voir la note de routage dans `chute-mouvements-plans.md` et la
note symétrique dans `atome-mecanique-newton.md`.

## 6. Passe 2026-08-06 — harvest complet du 2023 N (NS28F)

**2023 N est passé de « couverture lue en v0.3, carte non consignée » à
carte complète : 10 nouvelles entrées `transcrit (non vérifié)` + 4 notes
de cross-list**, sur les 4 exercices/20 points du sujet (barème
$7+2{,}5+5+5{,}5=20$ recoupé et conforme à la couverture p.1). Détail dans
`README.md` §4 (chaque fichier `<slug>.md`) et dans la table « Sujets à
carte complète » ci-dessus. Points notables :
- l'exercice 1 (« réactions de l'acide éthanoïque ») a été **partitionné en
  trois notions distinctes** (chaque §-partie à son fichier) : §1
  (acide + eau, sans dosage) → `etat-equilibre.md`, suivant le précédent
  2015 N ; §2 (réaction entre deux couples acide/base, $K_{A1}/K_{A2}$) →
  `reactions-acido-basiques.md`, un cas non encore rencontré dans la
  banque ; §3 (estérification) → `esterification-hydrolyse.md` ;
- l'exercice 2 (« transformations nucléaires du tritium ») a été
  partitionné entre `decroissance-radioactive.md` (§1, désintégration) et
  `noyaux-masse-energie.md` (§2, fusion), sur les deux sous-parties
  explicitement titrées du scan ;
- l'exercice 4-Partie II (« balançoire ») a été classé sous
  `systemes-oscillants.md` (pendule pesant) et **pas** sous
  `rotation-axe-fixe.md`, ce dernier restant réservé aux exercices de type
  poulie/grue (R.F.D. en rotation pure autour d'un axe fixe, sans
  oscillation).
- l'en-tête du scan a été lu directement au pixel et confirme sans
  ambiguïté la filière Sciences Physiques (SPC), BIOF, option française —
  le résumé HTML d'AlloSchool pour `element/142476` annonce à tort « 2ème
  BAC Sciences Mathématiques B » (même piège de fidélité que 2018 N et
  2024 N, README §3).

## 7. Passe 2026-08-06 — harvest complet du 2022 N (NS 28F)

**2022 N est passé de « couverture lue en v0.3, carte non consignée » à
carte complète : 8 nouvelles entrées `transcrit (non vérifié)` + 2 notes
de cross-list**, sur les 4 exercices/20 points du sujet (barème
$7+3{,}5+4{,}5+5=20$ recoupé et conforme à la couverture p.1). Détail dans
`README.md` §4 (chaque fichier `<slug>.md`) et dans la table « Sujets à
carte complète » ci-dessus. Points notables :
- l'exercice 1 (« chromage d'une plaque d'acier par électrolyse » +
  « propriétés d'une solution aqueuse d'acide propanoïque ») a été
  partitionné entre `electrolyse.md` (Partie 1) et
  `reactions-acido-basiques.md` (Partie 2, réaction acide/eau **et** dosage
  pH-métrique regroupés dans la même entrée, comme pour le précédent
  2025 N Ex I-P1) ;
- l'exercice 2 (« ondes sonores » + « désintégration de l'iode 131 ») a été
  partitionné entre `ondes-mecaniques-progressives.md` (Partie 1 — mesure
  de retard/célérité, sans longueur d'onde imposée, classement conforme à
  la note de classement en tête de ce fichier) et
  `decroissance-radioactive.md` (Partie 2, cross `noyaux-masse-energie`
  pour la question d'énergie libérée) ;
- l'exercice 3 (« RC » + « RLC série ») a été partitionné entre
  `rc-charge.md` (section 1) et `rlc-serie.md` (section 2), sur le même
  montage (figure 1) — précédent direct : 2018 N Ex III et 2019 N Ex III ;
- l'exercice 4 (« chute d'une bille dans un liquide visqueux » +
  « mouvement d'un satellite artificiel ») a été transcrit **intégralement
  dans `chute-mouvements-plans.md`** (Partie 1 et Partie 2) : la Partie 2
  (satellite) suit le même raisonnement de routage que 2025 N Ex IV-P1
  (**pas** `atome-mecanique-newton.md` — voir la « Note de routage », dont
  l'en-tête a été complété avec ce nouveau précédent) ;
- l'en-tête du scan a été lu directement au pixel et confirme sans
  ambiguïté la filière Sciences Physiques (SPC), BIOF, option française
  (« شعبة العلوم التجريبية: مسلك العلوم الفيزيائية - خيار فرنسية », NS 28F,
  3 h, coef 7) — le résumé HTML d'AlloSchool pour `element/136621` annonce
  à tort « Sciences Mathématiques B » (même piège de fidélité que 2018 N,
  2023 N et 2024 N, README §3).
