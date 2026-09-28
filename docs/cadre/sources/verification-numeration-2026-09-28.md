# Vérification ciblée — « systèmes de numération » en 2 Bac SM (Maroc)

> **Statut : PROPOSITION / rapport de vérification.** Ce document ne modifie aucune
> frontière. Il répond à deux questions étroites posées sur l'ajout du 2026-09-27 à
> `docs/cadre/curriculum/maths-sm.yaml` (chapitre `arithmetique_z`, capacités 2.1.4 /
> 2.1.5 / 2.1.6 tirées d'une **seule** source secondaire, `README-maths.md:140-142`).
> Comme tout ce que produit cette voie, il reste non autoritatif tant que les trois
> portes ne sont pas passées (relecture longue Gemini, `research-challenger`,
> validation humaine).
>
> Date : 2026-09-28 · Périmètre d'écriture : ce fichier uniquement.

---

## 0. Méthode et limites d'outillage — à lire avant les verdicts

**Ce que j'ai pu faire.** Recherche web, récupération de pages HTML, extraction de
texte de PDF via un lecteur tiers (`r.jina.ai`), et — point décisif — **lecture
visuelle de pages de documents** quand l'hébergeur expose les pages en image
(vignettes Scribd `html.scribdassets.com`, BookReader d'archive.org).

**Ce que je n'ai pas pu faire.** Aucun Bash ; `pdftoppm` absent, donc **aucun PDF ne
peut être rendu localement**. Les PDF ne sont donc lisibles que par extraction de
texte, ou par image lorsqu'un tiers en héberge une.

**Limite structurelle, et elle porte directement sur la Q2 :**
**l'extraction de texte d'un PDF ne peut PAS révéler une barre de sur-lignement
(vinculum).** Un `\overline{…}` est un *trait dessiné*, pas un caractère : il est
invisible dans le flux de texte. Toute affirmation de notation faite à partir d'un
texte extrait est donc structurellement incomplète.

**Pire — et c'est un résultat en soi :** les résumés produits par le lecteur tiers
**ont FABRIQUÉ des parenthèses** qui ne sont pas dans les documents. Deux cas
mesurés le même jour :

| Document | Ce que le résumé automatique a rendu | Ce que la PAGE montre / ce que le texte BRUT contient |
|---|---|---|
| Atmani Najib, cours 2BAC SM BIOF | « (2987)₁₀ », « (21455)₆ », « (6432)₇ », « (54)₈ » | Texte **brut** du résumé du même auteur, même exemple : `6432 54`, `2534 631` — **aucune parenthèse dans le flux** |
| Moustaoui Mohamed, 2 Bac SM (archive.org) | « (q_k q_{k-1} … q_0)_b », « (3254)₁₀ = (6266)₈ » | Page 10 **vue en image** : `15 = ` $\overline{17}_{(8)}$ , `131 = ` $\overline{203}_{(8)}$ — **sur-lignement, et parenthèses autour de la BASE seulement** |

→ **Règle à retenir pour le cadre : aucune notation ne doit être inscrite dans une
frontière sur la foi d'un texte extrait ou d'un résumé de lecteur. Seule une page
VUE fait foi.** Les deux formes citées ci-dessus en colonne « résumé » sont fausses.

**Sur le cadre officiel.** Le PDF officiel que le dépôt référence
(`alloschool.com/assets/documents/course-436/cadre-de-reference-de-l-examen-national-maths-sciences-mathematiques.pdf`)
a été **re-testé aujourd'hui** au travers du lecteur tiers : 8 pages, **aucun texte
récupéré**. La contrainte de provenance écrite dans `README-maths.md:23-48` est donc
**confirmée une fois de plus** : pas de `cadre p.N` possible pour les maths.
**Je n'ai récupéré le texte d'aucun document officiel MEN/CNEEO** (ni cadre de
référence, ni Orientations pédagogiques 2007). C'est le principal manque de ce
rapport, et il est intentionnellement laissé visible.

**URL demandées mais non lisibles** (dites telles quelles, sans deviner leur contenu) :
`profyahya.com/orientations-pedagogiques-…-2bac/` (404 à travers notre proxy, y compris
via lecteur) · `studocu.com/*` (challenge Cloudflare) · `fr.scribd.com/document/628335850`
en page HTML (erreur de chargement JS — mais **ses images de page, elles, ont été lues**)
· `scribd.com/document/850285759` (cadre 2025 option FR, toujours protégé).

---

## 1. Q1 — Existence de « systèmes de numération » au programme SM

### Verdict

**CONFIRMÉ pour le TOPIC, sur sources multiples et indépendantes de `pdfmath.com`.
NON confirmé contre un texte officiel** (aucun n'a pu être lu en texte).
**Un point reste ambigu et est signalé, pas tranché : la répartition 1 Bac SM / 2 Bac SM.**

Confiance :
- que le sujet « écriture d'un entier dans une base / opérations dans une base » soit
  **enseigné et documenté comme matière SM marocaine** : **ÉLEVÉE** (7 sources, dont 3 vues en image ou en texte brut) ;
- qu'il relève du programme de **2ème** année Bac SM plutôt que de la 1ère : **MOYENNE**
  (toutes les sources qui nomment un seul niveau nomment la 2ème ; mais le même document
  circule aux deux niveaux — voir §1.3) ;
- que les **libellés verbatim** 2.1.4/2.1.5/2.1.6 soient ceux du cadre : **INCHANGÉE**.
  Cette vérification corrobore le **sujet**, pas le **mot à mot** ; la source unique
  (`pdfmath`) reste la seule à donner ces libellés.

### 1.1 Sources indépendantes trouvées (≥ 1 était demandée ; 7 sont listées)

**(A) Moustaoui Mohamed — « الحسابيات » (Arithmétique), 11 p. — VU EN IMAGE.**
En-tête de la page 1, verbatim : **« الحسابيات »** puis **« الثانية سلك بكالوريا علوم رياضية »**
(= *2ème année du cycle baccalauréat, sciences mathématiques*). Pied de page :
`http://arabmaths.ift.fr` · `Moustaoui Mohamed`.
- Page 8, titre de section verbatim : **« III- نظمات العد »** puis « 1- نشاط تمهيدي »
  — placé immédiatement après la résolution de `ax + by = c` dans ℤ², donc **à
  l'intérieur du chapitre d'arithmétique**.
- Pages 9-10 : définition de la base (« أساس نظمة عد هو عدد الأرقام التي تستعمل لتمثيل
  الأعداد الصحيحة الطبيعية »), existence et unicité de l'écriture, exemples en base 2,
  8, 12, méthode pratique de conversion par divisions successives.
- URLs : item `https://archive.org/details/arithmitique` ·
  PDF `https://archive.org/download/arithmitique/arithmitique.pdf` ·
  images de page lues :
  `https://ia800805.us.archive.org/BookReader/BookReaderImages.php?id=arithmitique&itemPath=%2F0%2Fitems%2Farithmitique&server=ia800805.us.archive.org&page=n7_w1200.jpg`
  (et `n8`, `n9`, `n0`).

**(B) AlloSchool — cours « Mathématiques 2ème BAC Sciences Mathématiques A BIOF »,
chapitre « Arithmétique » — TEXTE BRUT.**
Document « Arithmétique - Résumé de cours 2 », `https://www.alloschool.com/element/58534`,
fichier `https://www.alloschool.com/assets/documents/course-435/arithmetique-resume-de-cours-2-1.pdf`.
Niveau imprimé dans le document : **« 2ème Bac Sm »**. Extrait **brut** :

```
IX. La numération

Soit x un entier nature supérieur ou égal à 2. Tout entier b de In peut s'écrire sous la forme :
..... .. 0111 axaxaxab nnnn
Où
   1-n0, ;)n0, i(et 0  in aa
On écrit :
.... :)1( (x) 011 aaaab nn
Et on dit que l'écriture (1) est l'écriture du nombre b dans le système de numération de base x .
```

(le désordre des caractères est l'artefact d'extraction habituel ; la phrase en clair est
lisible mot pour mot). **C'est la source la plus directement pertinente : elle est publiée
par AlloSchool *dans* le chapitre Arithmétique du cours 2ème BAC SM A BIOF.**

**(C) Atmani Najib — cours « L'ARITHMETIQUE », niveau imprimé « 2BAC SM BIOF ».**
`https://moutamadris.ma/wp-content/uploads/2022/06/cours-Arithmetique-2bac-biof-Sciences-Mathematiques-2.pdf`
Titre de section relevé par le lecteur : **« III) SYSTEMES DE NUMERATION »**, avec
sous-parties opérations dans une base et changement de base.
*(Relevé par lecteur, non vu en page ; le titre de section est fiable, les notations
rendues par ce même lecteur ne le sont pas — cf. §0.)*

**(D) Atmani Najib — résumé, « 2BAC SM » — TEXTE BRUT.**
`https://moutamadris.ma/wp-content/uploads/2022/06/resume-Arithmetique-2bac-biof-Sciences-Mathematiques-1.pdf`
Extrait **brut**, verbatim :

```
P) SYSTEMES DE NUMERATION
1) Soit 𝑏 un entier naturel tel que: 𝑏 > 1
Chaque entier naturel non nul 𝑛 s'écrit d'une façon unique de la forme : …
Cette écriture s'appelle l'écriture de l'entier 𝑛 dans la base 𝑏
Remarques :
1) On peut effectuer la somme dans une base donnée 𝑏 par deux façons différentes : …
2) Le produit : Il est préférable d'effectuer le produit en utilisant le calcul direct avec le retenu …
3) Pour effectuer des opérations dans différentes bases on développe les deux nombres dans la base 10 ;
   on effectue L'opération et on écrit le résultat dans la base demandée.
Exemple : effectuer dans la base 9  … 6432 … 54 …
```

Ce bloc couvre **exactement** les trois capacités contestées : écrire dans une base
(2.1.4), **additionner / multiplier** dans une base (2.1.5), et l'usage opératoire
(2.1.6). C'est la corroboration la plus littérale que j'aie obtenue.

**(E) al3abkari-pro.com (marocain, français) — « 2 BAC SCIENCES MATHS BIOF : cours et
résumés d'arithmétiques, sciences mathématiques A et B biof ».**
`https://www.al3abkari-pro.com/2019/12/2-bac-sciences-maths-biof-cours-de_27.html`
Sommaire du cours cité verbatim : « 1 Premiers concepts, 2 Division euclidienne et
conséquences, 3 Congruences, 4 Equations diophantiennes, 5 Corrigé des exercices », dont
**« 2.1 Division euclidienne et décomposition en base b »**.

**(F) 9rayti.com (arabe) — chapitre « الحسابيات في z », niveau « الثانية باكالوريا علوم رياضية ».**
`https://www.9rayti.com/doros/chapitre/الحسابيات-في-z`
Sous-thème listé : **« نظمات العد »**, avec le détail « تعريف، مقارنة عددين ممثلين في نفس
النظمة، تغيير أساس نظمة عد، مصاديق قابلية القسمة على بعض الأعداد في نظمة العد العشري »
(définition ; comparaison de deux nombres écrits dans la même base ; changement de base ;
critères de divisibilité). **Ce détail recouvre 2.1.5 (comparer) explicitement.**

**(G) albostane.com (arabe) — « درس الحسابيات في المجموعة Z — الثانية سلك الباكالوريا علوم رياضية ».**
`https://www.albostane.com/درس-الرياضيات-الحسابيات-في-المجموعة-z/`
Plan verbatim : « يتضمن الفقرات التالية: قابلية القسمة في z. القسمة الاقليدية في z. الموافقة
بترديد n. القاسم المشترك الأكبر. الأعداد الأولية فيما بينها. المضاعف المشترك الأصغر. الأعداد
الأولية. **نظمات العد.** » — la numération **clôt** le plan du chapitre.

**(H) med4math.blogspot.com (arabe) — « ملخص درس حسابيات في Z ثانية باك علوم رياضية ».**
`https://med4math.blogspot.com/2015/12/aritmitique-2bac-sm.html`
Plan verbatim : « الدرس يشتمل على: تذكير، الموافقة بترديد n، المجموعة Z/nZ، إنسجام الموافقة
بترديد n مع الضرب والجمع، الأعداد الأولية فيما بينها، الأعداد الأولية في بينها في مجموعها،
**نظمات العد** ».

**(I) Source déjà citée, re-lue pour mémoire, NON indépendante :** `pdfmath.com/cours/bacsm-2026-sm/`
confirme bien les neuf capacités 2.1.1→2.1.9 et que **2.1.4, 2.1.5, 2.1.6** portent la
numération ; la page déclare reproduire le « Cadre de référence de l'examen national du
baccalauréat — options internationales, option français », **CNEEO 2025**, session BAC 2026.

### 1.2 Contre-indications honnêtes (sources qui n'aident PAS la thèse)

- **« Progression pédagogique 2BAC SM - 2025 »** (Prof Fayssal / elboutkhili →
  `fayssalmaths.com`) : l'arithmétique y occupe les semaines 6-8 du 2e semestre
  (5+2 h, 6+1 h) **sans aucun sous-thème détaillé**. Ne confirme ni n'infirme.
- **« Résumé 16 : Arithmétique dans Z », deuxième bac sciences maths** (collection FMATHS,
  `s3dad1825ccd91218.jimcontent.com/…/Résumé--Arithmétique-2bac-SM - PUB.pdf`) : l'extraction
  de texte **ne fait apparaître aucune section numération** (divisibilité, Euclide,
  congruences, classes, premiers, PGCD/PPCM, Bézout, Gauss). **La couverture du sujet
  n'est donc pas universelle dans le matériel 2 Bac SM** — c'est cohérent avec le fait
  que notre propre corpus ne la couvrait pas, et ça n'invalide pas les 7 sources ci-dessus.
- **AlloSchool, TOC du cours 2ème BAC SM A BIOF** : aucun chapitre ni titre de document ne
  porte le mot « numération » — le sujet est **à l'intérieur** du chapitre « Arithmétique »,
  jamais en titre. Un scan par titres passerait donc à côté. *(Mode de défaut connu,
  ADR 0036 : chercher une chose sous une seule de ses formes.)*

### 1.3 Le point 1 Bac SM vs 2 Bac SM — réponse précise, et ce qui reste ambigu

**Fait mesuré :** le cursus SM marocain porte un chapitre d'arithmétique **aux DEUX
niveaux**, et AlloSchool les distingue :
- 1er BAC SM BIOF → chapitre **« Arithmétique dans Z »**, `alloschool.com/section/4675` ;
- 2ème BAC SM A BIOF → chapitre **« Arithmétique »**, `alloschool.com/section/4720`.

**Fait mesuré, et c'est lui qui tranche l'essentiel :** le **même résumé d'auteur** est
publié aux deux niveaux, sous deux fichiers distincts, **avec le seul pied de page changé** :
- `…/course-437/arithmetique-dans-z-resume-de-cours-2.pdf` → pied « **1ère Bac Sm** » ;
- `…/course-435/arithmetique-resume-de-cours-2-1.pdf` → pied « **2ème Bac Sm** ».

**Les deux contiennent la section « IX. La numération »**, avec la même phrase
(« …l'écriture du nombre b dans le système de numération de base x »). J'ai lu la version
« 1ère Bac Sm » **en image** (miroir Scribd `html.scribdassets.com/4u7gopqyoapk2sc/images/2-83ee272329.jpg`,
document `fr.scribd.com/document/628335850/arithmetique-dans-z-resume-de-cours-2`) et la
version « 2ème Bac Sm » **en texte brut** ; le contenu est le même.

**Conclusion sur ce point :**
- **Le sujet n'est PAS « en 1ère année à la place de la 2ème ».** Il est présent dans du
  matériel explicitement 2 Bac SM chez **six** auteurs/sites différents (A, B, C, D, E, F,
  G, H ci-dessus), dont un document publié par AlloSchool *dans* le chapitre Arithmétique
  du cours 2ème BAC SM A BIOF.
- **Mais** il est aussi présent dans du matériel étiqueté 1ère Bac SM, et le même document
  circule aux deux niveaux. **[INFÉRÉ]** L'explication la plus simple est une reprise /
  extension entre les deux années (la 1ère Bac SM voit l'arithmétique dans ℤ, la 2ème la
  reprend avec congruences, ℤ/nℤ, Bézout, Gauss, et la numération). **Je n'ai aucun texte
  officiel pour l'établir : c'est une inférence, pas une lecture.**
- **À TRANCHER PAR L'HUMAIN, pas par le silence :** si le cadre d'examen national
  2 Bac SM liste bien 2.1.4/2.1.5/2.1.6 (ce que `pdfmath` affirme et que rien ici ne
  contredit), alors la numération est **évaluable au national** quel que soit l'année où
  elle est enseignée — ce qui est la seule chose qui compte pour notre frontière. Le
  découpage pédagogique 1 Bac / 2 Bac, lui, reste **non établi**.

---

## 2. Q2 — Comment le matériel SM marocain écrit un nombre en base b

### Verdict

**Ce qui est établi (sur pages VUES) :** le matériel marocain écrit la chaîne de chiffres
**sous une barre de sur-lignement (vinculum)**, la base étant portée par un **petit index
placé immédiatement après**. **La forme `(a_n⋯a_0)_b` — parenthèses autour des CHIFFRES —
n'est attestée dans AUCUNE des sources marocaines que j'ai pu voir.** (Elle n'apparaît que
dans les *résumés fabriqués par le lecteur automatique* — cf. §0.)

**Ce qui n'est PAS établi : la place de l'index.** Les sources marocaines **divergent** :
indice en **exposant parenthésé** chez l'un, en **indice parenthésé** chez l'autre.
**Sur les 3 sources retenues : 1 exposant parenthésé · 1 indice parenthésé · 1 index nu
(placement indéterminable). Aucune majorité. Je ne peux pas dire laquelle est « plus
courante » au Maroc — et je ne l'invente pas.**

Confiance : **ÉLEVÉE** sur « vinculum + index adjacent, jamais de parenthèses autour des
chiffres ». **FAIBLE** sur la variante dominante.

### Source 1 — français, 2ème Bac Sm — **PAGE VUE**

- Document : « Arithmétique — Résumé de cours », section **« IX. La numération »**,
  pied de page « **1ère Bac Sm** · Arithmétique · Cours: Cr1-Fr · Page : 2/2 »,
  daté 24/08/2017 (tél. 0649113323).
  **Le même document est publié par AlloSchool avec le pied « 2ème Bac Sm » dans le
  chapitre Arithmétique du cours 2ème BAC SM A BIOF** (`element/58534`,
  `…/course-435/arithmetique-resume-de-cours-2-1.pdf`) ; Studocu le catalogue d'ailleurs
  comme « Résumé de Cours: Arithmétique pour 2ème Bac SM (Cr1-Fr) ».
- Image lue : `https://html.scribdassets.com/4u7gopqyoapk2sc/images/2-83ee272329.jpg`
  (page 2/2 du document `fr.scribd.com/document/628335850/arithmetique-dans-z-resume-de-cours-2`).
- **Forme exacte vue sur la page :**

  $$b=\overline{a_n a_{n-1}\ldots a_1 a_0}^{\,(x)}$$

  — barre de sur-lignement sur toute la chaîne de chiffres, **index `(x)` parenthésé, placé
  en EXPOSANT** juste après. La lettre de base est `x`, pas `b` (car `b` désigne le nombre).
- Phrase verbatim de la page : « **Et on dit que l'écriture (1) est l'écriture du nombre b
  dans le système de numération de base x.** »
- Contexte verbatim de la page : « *Soit x un entier nature supérieur ou égal à 2. Tout
  entier b de In peut s'écrire sous la forme :* $b=a_n x^n + a_{n-1}x^{n-1}+\ldots+a_1x+a_0$ ,
  *Où* $a_n\neq 0$ *et* $a_i \in [0,\,n-1]$ ». *(La page porte bien `[0, n-1]` ; c'est une
  coquille de l'auteur — ce devrait être `[0, x-1]`. Signalé pour ne pas la recopier.)*

### Source 2 — arabe, الثانية سلك بكالوريا علوم رياضية — **PAGE VUE**

- Document : Moustaoui Mohamed, « الحسابيات », page 10 (`arabmaths.ift.fr`, item archive.org
  `arithmitique`). Image lue : `…BookReaderImages.php?id=arithmitique&…&page=n9_w1200.jpg`.
- Phrase verbatim de la page : « نحتاج الى رمز b و نمثل العدد n في نظمة العد ذات الأساس b بكتابة »
  suivie de :

  $$n=\overline{q_k q_{k-1}\ldots q_0}_{(b)}$$

  — barre de sur-lignement, **index `(b)` parenthésé, placé en INDICE**.
- Exemples verbatim de la même page :
  `15 = 1×8 + 7` → $15=\overline{17}_{(8)}$ ;
  `131 = 2×8² + 0×8 + 3` → $131=\overline{203}_{(8)}$ ;
  en binaire, `8` et `15` sont notés $\overline{1000}$ et $\overline{1111}$ (sur-lignement
  seul, base donnée par la phrase) ;
  et la conclusion générale : « إذا كان $r_k \neq 0$ فان $n=\overline{r_k r_{k-1}\ldots r_1 r_0}$ ».
- **Langue : arabe.** Niveau imprimé en page 1 : « الثانية سلك بكالوريا علوم رياضية » (2 Bac SM).

### Source 3 — français, 2BAC SM BIOF — **TEXTE BRUT seulement, forme partiellement déterminable**

- Documents : Atmani Najib, cours et résumé (moutamadris.ma, URLs en §1.1 C et D).
- Ce que le **flux de texte brut** montre, et rien de plus : dans toute la section
  « SYSTEMES DE NUMERATION », **aucune parenthèse n'apparaît** autour des chaînes de
  chiffres ni autour de l'index de base. Les exemples sortent en
  `… 7 7 2534 631 …` (somme de `2534` et `631` en base 7), `… 7 8 6432 54 …` (produit
  `6432` base 7 × `54` base 8), résultat demandé « dans la base 9 ».
- **Conclusion prudente :** cet auteur écrit la base **sans parenthèses**, donc la forme
  est $\overline{a_n\cdots a_0}^{\,b}$ **ou** $\overline{a_n\cdots a_0}_{\,b}$. **Je ne peux
  déterminer ni la position verticale de l'index ni la présence du vinculum par extraction
  de texte** (§0). Je ne tranche pas.

### Décompte et recommandation

| Forme | Sources marocaines SM attestées | Preuve |
|---|---|---|
| $\overline{a_n\cdots a_0}^{(b)}$ (exposant parenthésé) | 1 — résumé « Cr1-Fr », publié en 1ère **et** 2ème Bac Sm | page vue |
| $\overline{a_n\cdots a_0}_{(b)}$ (indice parenthésé) | 1 — Moustaoui Mohamed, 2 Bac SM (arabe) | page vue |
| $\overline{a_n\cdots a_0}^{b}$ / $_b$ (index nu) | 1 — Atmani Najib, 2BAC SM BIOF | texte brut, position non déterminée |
| $(a_n\cdots a_0)_b$ (parenthèses autour des chiffres) | **0** | — |

**Recommandation (à valider, non imposée) :** ne **pas** figer une forme unique dans le
cadre. Si une forme doit être choisie pour nos leçons, $\overline{a_n\cdots a_0}^{(b)}$ est
celle qui est attestée **dans le chapitre Arithmétique du cours 2ème BAC SM A BIOF publié
par AlloSchool** — mais tout item doit **accepter la variante en indice**, et la leçon
devrait montrer les deux, parce qu'un élève marocain peut avoir rencontré l'une ou l'autre.
Ce qu'il faut en revanche **exclure fermement**, c'est la forme à parenthèses autour des
chiffres : elle n'est attestée nulle part côté marocain, et les deux fois où elle est
apparue dans cette enquête, c'était une **fabrication de l'outil de lecture**.

---

## 3. Ce que ce rapport change — et ne change pas — pour `maths-sm.yaml`

**Ne change pas.** Les trois capacités 2.1.4/2.1.5/2.1.6 restent, **pour leur libellé
verbatim**, adossées à une source secondaire unique (`pdfmath`). Aucune provenance
`cadre p.N` n'est possible. La ligne `programme` ajoutée le 2026-09-27 et son
`savoir_faire` restent **`research-consensus` pour le sujet / `derived` pour la granularité** —
rien ici ne les promeut.

**Change.** Le **risque « la source unique a halluciné un chapitre entier »** est écarté :
sept sources marocaines indépendantes, dont trois lues en page ou en texte brut, enseignent
le sujet, et l'une d'elles est publiée **dans le chapitre Arithmétique du cours 2ème BAC SM
A BIOF**. Le contenu des trois capacités (écrire / additionner-multiplier-comparer /
utiliser) est **littéralement** couvert par le matériel (source D pour l'addition et le
produit, source F pour la comparaison).

**Trois choses à porter devant l'humain :**
1. **Ambiguïté de niveau non tranchée** — 1 Bac SM et 2 Bac SM portent tous deux de
   l'arithmétique, le même résumé circule aux deux niveaux avec la numération dedans, et
   aucun texte officiel n'a pu être lu. À arbitrer, ou à laisser explicitement ouvert dans
   `_question_ouverte_owner`.
2. **Notation non uniforme** — ne pas coder en dur une seule écriture dans les items.
3. **Le mode de défaut découvert en chemin** (résumés d'outil qui fabriquent des
   parenthèses ; sujet invisible parce qu'il n'est jamais en TITRE de chapitre) mérite
   d'être connu au-delà de cette passe : c'est la même famille qu'ADR 0036 (« une chose
   n'est prouvée absente que si l'on a énuméré ses FORMES ») et qu'ADR 0039 (« ce n'est pas
   la chose cherchée qui change de forme, c'est le PRODUIT qui la réécrit »).

---

## 4. Journal des accès (pour rejouabilité)

Lues avec succès, en page image : `html.scribdassets.com/4u7gopqyoapk2sc/images/1-…jpg` et
`…/2-…jpg` · `ia800805.us.archive.org/BookReader/BookReaderImages.php?id=arithmitique…page=n0|n7|n8|n9_w1200.jpg`
· `html.scribdassets.com/22z2va69s099899e/images/1-…png` et `…/3-…png`.
Lues en texte : `alloschool.com/assets/documents/course-435/arithmetique-resume-de-cours-2-1.pdf`
· `moutamadris.ma/…/cours-Arithmetique-2bac-biof-Sciences-Mathematiques-2.pdf`
· `moutamadris.ma/…/resume-Arithmetique-2bac-biof-Sciences-Mathematiques-1.pdf`
· `archive.org/download/arithmitique/arithmitique_djvu.txt`
· pages HTML AlloSchool (courses + sections 4657/4675/4720/722), 9rayti, albostane, med4math,
al3abkari-pro, pdfmath, fayssalmaths.
Échecs déclarés : cadre officiel `course-436/...pdf` (scan, 0 texte) · profyahya.com (404)
· studocu (Cloudflare) · scribd HTML direct · `bestcours.net` (domaine détourné, sans rapport).
