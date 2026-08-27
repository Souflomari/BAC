# Examen national Mathématiques — SM — 2021, session NORMALE (NS 24F) — exercice 1

> **Fichier d'entrée (`_incoming`) — VÉRIFIÉ.
> CLEARÉ POUR CONVERSION**, sous les deux réserves de classement nommées
> plus bas. Protocole `docs/sujets/_incoming/README.md` et
> `docs/sujets/maths/README.md`.
>
> **Deux passes, dans l'ordre.** *Transcription* le **2026-08-27**, puis
> *vérification adversariale INDÉPENDANTE* le **2026-08-27** — scan
> re-téléchargé de zéro, texte transcrit jamais relu à la place de l'image,
> **les quatre contrôles anti-CDN refaits en entier** plus deux instruments
> que la transcription n'avait pas ouverts. Le détail, les preuves et le
> verdict des dix points du docket sont en
> **§ `Ce que la vérification a trouvé`** (fin de fichier).
>
> **Résultat : la transcription de l'énoncé est FIDÈLE — zéro divergence sur
> les 24 questions, sur le barème et sur l'en-tête. Le SUJET OFFICIEL ne
> présente aucun défaut.** Les 24 questions ont été re-dérivées une par une.
>
> **Ce que la vérification a corrigé au transcripteur** (aucun ne touche le
> corps de l'énoncé) :
> 1. le **mécanisme** du « + » de $u_{n+1}$ — conclusion juste, diagnostic
>    faux : le pixel de croisement est *intact*, et c'est le
>    **sous-échantillonnage 300 → 150 dpi d'AlloSchool** qui casse le glyphe,
>    pas la numérisation du sujet. **Prouvé** sur la couche bitonale **300 dpi**
>    embarquée dans le PDF, où le « + » est parfait ;
> 2. les marques de marge sont imprimées **`0.5` avec un POINT** — la
>    transcription les francise en `0,5` 24 fois, alors qu'elle préserve
>    explicitement le point de « 1.47 » ;
> 3. l'artefact d'OCR « 2024 » frappe les pages **1, 2 et 3**, non les seules
>    pages 2 et 3 ;
> 4. le précédent SM 2025 N invoqué dans l'arbitrage de slug dit
>    « plus gros bloc **ET** identité » — une conjonction, pas une hiérarchie.
>
> **Aucune valeur n'est restée illisible.**
>
> **Portée volontairement partielle.** Ce fichier ne transcrit que
> l'**exercice 1** (le problème d'analyse, 12 pts). Les exercices 2 (nombres
> complexes, 4 pts) et 3 (arithmétique, 4 pts) sont **déjà en banque** —
> `bk-2021-n-x2` de `nombres-complexes-2` et `bk-2021-n-x3` de `arithmetique`,
> `bareme_total: 4` chacun, relu dans les deux `bank.yaml` — et ne doivent
> surtout pas être reconvertis : l'assemblage d'épreuves
> (`web/src/lib/examens.ts`) somme les `bareme_total`, un doublon fausserait
> le /20.

## Pourquoi ce sujet

L'épreuve **SM 2021 session normale** est assemblée à **8,00/20** dans Examens
blancs — et non à 10,00/20 comme les cinq autres SM normales, parce que ce
sujet-ci n'a que **trois** exercices et que son volet d'analyse pèse **12
points** au lieu de 10. Les deux exercices d'algèbre (4 + 4) sont en banque ;
c'est l'exercice 1 qui manque, et il vaut exactement les 12 points manquants.

## ⚖️ Ce que ce fichier tranche dans le recensement

`docs/sujets/maths/CENSUS.md` porte, pour 2021 N, la ligne
« Problème analyse **(12)** → (?) contenu à transcrire », et le chiffre 12 y
était **inféré** par soustraction (20 − 4 − 4), pas lu. Il portait donc un
« (?) » dans la colonne de composition.

**Tranché sur le scan : les 12 points sont IMPRIMÉS, pas déduits.** La page 1
porte en toutes lettres « - L'exercice1 se rapporte à l'analyse
……………….…(12 pts) ». L'hypothèse « 8 + 12 = 20 » est confirmée par lecture
directe, et non plus par arithmétique. Le « (?) » du CENSUS peut tomber.

**Les deux autres notes du CENSUS sont également confirmées sur la page 1 :**

- « **3 exercices seulement** » → **CONFIRMÉ.** La page 1 imprime
  « - L'épreuve comporte 3 exercices indépendants. » et n'énumère que trois
  lignes de barème. C'est bien atypique pour un sujet SM (2022 N, 2023 N,
  2024 N et 2025 N en comptent quatre ou cinq).
- « **pas de structures algébriques** » → **CONFIRMÉ.** Les trois domaines
  imprimés sont analyse, nombres complexes, arithmétique. Aucun exercice de
  structures algébriques dans ce sujet. (2021 N est, avec 2011 N, l'un des
  deux millésimes que le CENSUS signale comme atypiques — période COVID.)

---

## Provenance et les quatre contrôles

- **Source (page élément)** : https://www.alloschool.com/element/127193
- **PDF servi par cette page** :
  `https://www.alloschool.com/assets/documents/course-436/examen-national-mathematiques-sciences-maths-2021-normale-sujet-2.pdf`
- **Images de pages** :
  `https://www.alloschool.com/assets/documents/course-436/upload-84150/000{1..4}-big.jpg`
  — **4 pages**, et non 5 comme les millésimes 2022→2025.
- **Code sujet lu sur le scan** : **NS 24F** (cartouche p. 1, confirmé par OCR
  ciblé sur le seul cadre du code → `NS 24F`). Conforme au CENSUS.
- **Format des fichiers** : `file *.jpg` → *JPEG image data, JFIF standard
  1.01, density 150x150, baseline, precision 8, **1240x1752**, components 1*
  (niveaux de gris). Aucune page de redirection déguisée (piège de procédure
  n° 1 du README) : les quatre pèsent entre 319 ko et 410 ko.

### Contrôle 1 — l'année imprimée, relue sur CHAQUE page

Le cartouche d'en-tête porte l'année sur les quatre pages. Relue une par une,
au zoom, **et** recoupée par OCR chiffres-seuls sur le recadrage du seul
millésime (×10 à ×12) :

| Page | Lecture visuelle du cartouche | OCR chiffres-seuls du recadrage |
|---|---|---|
| 1/4 | « الدورة العادية **2021** » (bloc-titre) | `2021` |
| 2/4 | « … الدورة العادية **2021** – الموضوع » | `2021` |
| 3/4 | « … الدورة العادية **2021** – الموضوع » | `2021` |
| 4/4 | « … الدورة العادية **2021** – الموضوع » | `2021` |

**Aucun panachage.** Les quatre pages portent la même année, le même code
`NS 24F` et la même mention de filière.

⚠️ **Un piège rencontré, à consigner pour le prochain agent.** L'OCR de la
**bande d'en-tête entière** (texte arabe compris, avec un tesseract qui n'a que
le pack `eng`) rend l'année des pages 2 et 3 comme « **2024** ». C'est un
artefact de l'OCR sur du contexte arabe, pas une lecture du scan : dès que le
recadrage est **restreint aux quatre chiffres** et passé en
`--psm 7 -c tessedit_char_whitelist=0123456789`, les trois pages rendent
`2021`, et la lecture visuelle à ×3 est sans ambiguïté (voir la ligne complète
citée ci-dessus). **Ne pas conclure à un panachage sur la foi de l'OCR pleine
page.**

> 🔎 **VÉRIFICATION (2026-08-27) — portée corrigée.** L'artefact est réel et
> a été reproduit, mais il frappe les pages **1, 2 ET 3** (seule la page 4
> rend `2021` en pleine page), et non les seules pages 2 et 3. Le remède est
> inchangé. Les quatre millésimes ont été re-lus visuellement **et** par OCR
> chiffres-seuls en trois modes `--psm` : **`2021` douze fois sur douze**.
> Détail en § `Ce que la vérification a trouvé`.

### Contrôle 2 — recoupement par instrument NON VISUEL

Trois instruments, aucun ne passant par l'attente du lecteur :

1. **OCR intégral des 4 pages** (`tesseract --psm 6`). Le texte rendu est
   celui d'un sujet SM 2021 à trois exercices : la page 1 rend
   « L'épreuve comporte 3 exercices indépendants », « L'exercicel se rapporte
   4 Panalyse ..............2.:e0s000e(12 pts) », « L'exercice2 se rapporte aux
   nombres complexes..........(4 pts) », « L'exercice3 se rapporte a
   ’arithmeétique .................(4 pts) » ; la page 2 rend
   « EXERCICE1 : (12 points) » et la fonction ; la page 3 rend
   « EXERCICE2 : (4 points) » ; la page 4 rend « EXERCICES : (4 points) »
   (lire *EXERCICE3*) puis « FIN ».
2. **Métadonnées du PDF, lues par PyMuPDF** — elles ne sont pas rendues à
   l'écran et ne peuvent donc pas être « retrouvées » par lecture visuelle :
   `title: KM_287-20210614091408` · `creator: KM_287` ·
   `producer: KONICA MINOLTA bizhub 287` ·
   `creationDate: D:20210614091408Z`, soit **le 14 juin 2021** — la fenêtre
   exacte de la session normale du bac marocain 2021. Le PDF n'a **aucune
   couche de texte** (4 pages, `get_text()` vide, 10/26/11/12 images par
   page) : c'est un scan pur, ce qui explique qu'il faille passer par l'OCR.
3. **Une date interne au contenu lui-même** : l'exercice 3 (arithmétique,
   hors portée de ce fichier) demande de montrer que
   $x \equiv 527\ [\mathbf{2021}]$ — le module est l'année du sujet. Une page
   servie depuis un autre millésime ne pourrait pas porter ce module.

**Aucun de ces trois instruments ne contredit l'attente ; aucun sujet
étranger n'apparaît.** L'incident de cache CDN de SM 2025 N ne se reproduit
pas ici.

### Contrôle 3 — MD5 consignés, et second téléchargement

Deux téléchargements successifs, avec deux User-Agents différents et
`Cache-Control: no-cache` au second :

| Fichier | Octets | MD5 (passe 1) | MD5 (passe 2) |
|---|---|---|---|
| `upload-84150/0001-big.jpg` | 319 443 | `1b2212c8282cdbb4bfba85d6027777b9` | **identique** |
| `upload-84150/0002-big.jpg` | 394 636 | `9c55ac2206d31c2256886ae8a18e0103` | **identique** |
| `upload-84150/0003-big.jpg` | 409 943 | `70e9357822840a94b11f0e66bb275a98` | **identique** |
| `upload-84150/0004-big.jpg` | 387 719 | `227d5a6fc0afc2d994b6756527d778be` | **identique** |
| `…-2021-normale-sujet-2.pdf` | 216 956 | `b2687f97bdcad6c1471aaeebdfac5cd7` | **identique** |

`cmp` octet à octet entre les deux passes : **les cinq fichiers sont
identiques**. Ce que sert le CDN est stable sur la fenêtre observée. *(Ces
MD5 sont donnés pour que la passe de vérification puisse comparer ses propres
téléchargements aux miens — pas pour la dispenser de re-télécharger.)*

### Contrôle 4 — le `<title>` et l'URL du PDF servis par le serveur

- `<title>` servi par `element/127193` :
  **« Examen National Mathématiques Sciences Maths 2021 Normale - Sujet - AlloSchool »**
  → nomme la bonne **année** (2021), la bonne **filière** (Sciences Maths), la
  bonne **session** (Normale) et la bonne **nature** (Sujet, pas corrigé).
- URL du PDF lié par cette même page :
  `…/examen-national-mathematiques-sciences-maths-2021-normale-sujet-2.pdf`
  → même quadruple concordance, indépendamment du `<title>`.
- Chemin des images : `course-436/upload-84150/`. À noter que
  `course-436` est **le même dossier de cours** que SM 2023 N
  (`upload-85316`), ce qui est cohérent : c'est le cours « SM — examens
  nationaux ». Le `upload-` diffère, comme attendu.

**VERDICT DES QUATRE CONTRÔLES : les quatre passent.** La transcription
pouvait être écrite.

---

## Cartouche de la page 1 — relu

Bloc-titre (arabe), relu au zoom ×1,6 :

- الامتحان الوطني الموحد للبكالوريا
- المسالك الدولية
- **الدورة العادية 2021**
- – الموضوع –
- Numérotation de page : **1 / 4**
- Code sujet : **NS 24F**
- المادة : **الرياضيات** (Mathématiques)
- مدة الإنجاز : **4h** — durée **4 heures**
- المعامل : **9** — coefficient **9**
- الشعبة أو المسلك : **شعبة العلوم الرياضية (أ) و (ب) (خيار فرنسية)** —
  *Sciences Mathématiques (A) et (B), option française*
- Organisme (bloc de droite, tampon) : « المركز الوطني للتقويم والامتحانات »
- Une bande imprimée « SSSSSSSSSSSSSSSSSSSS » figure à gauche du code — c'est
  un gabarit de code-barres non rempli, présent sur les autres millésimes
  aussi ; ce n'est pas du texte utile.

**Consignes (p. 1, transcrites mot pour mot) :**

> - La durée de l'épreuve est de 4 heures.
> - L'épreuve comporte 3 exercices indépendants.
> - Les exercices peuvent être traités selon l'ordre choisi par le candidat.

**Répartition des barèmes, TELLE QU'IMPRIMÉE sur la page 1 :**

> - L'exercice1 se rapporte à l'analyse ……………….…**(12 pts)**
> - L'exercice2 se rapporte aux nombres complexes……….**(4 pts)**
> - L'exercice3 se rapporte à l'arithmétique …………........**(4 pts)**

| Exercice | Domaine (imprimé p. 1) | Barème imprimé |
|---|---|---|
| 1 | analyse | **12 pts** |
| 2 | nombres complexes | 4 pts |
| 3 | arithmétique | 4 pts |

Somme : $12 + 4 + 4 = \mathbf{20}$ ✔

Bloc de bas de page 1, encadré :

> L'usage de la calculatrice n'est pas autorisé
> L'usage de la couleur rouge n'est pas autorisé

Le titre d'exercice imprimé en tête du corps (p. 2) redit le barème :
**« EXERCICE1 : (12 points) »** — concordant avec la page 1. *(Contraste avec
SM 2024 N, où la page 1 et le corps se contredisaient sur la numérotation.)*

---

## NOTE DE LECTURE — scan PROPRE, une seule anomalie de rastérisation

**Ce scan n'a AUCUNE substitution de police.** Il n'appartient ni à la famille
2022 N (substitution massive, police Symbol rendue par une latine) ni à la
famille 2023 N (mojibake intermittent). Contrôlé glyphe par glyphe au zoom :

| Glyphe | Rendu sur ce scan | Contrôle |
|---|---|---|
| $\mathbb{R}$, $\mathbb{N}$, $\mathbb{C}$ (lettres ajourées) | **corrects** partout | zoom ×4 à ×7 ; « $\forall n \in \mathbb{N}$ » et « définie sur $\mathbb{R}$ » lisibles tels quels |
| $\le$ | **correct** — chevron + barre horizontale distincts | ×8 à ×13 sur les 4 occurrences (I-2b, II-1b, II-2a, II-2b, III-4a) |
| $\ge$ | **correct** | ×4 sur « $n \ge 1$ », « $n \ge 2$ », « $(u_n)_{n\ge0}$ », « $(x_n)_{n\ge2}$ » |
| $<$, $>$ | **corrects**, nettement distincts du $\le$ | ×11 à ×13 sur III-1b et III-3a |
| $\alpha$, $\Delta$, $\infty$, $\vec{\ }$, $\|\cdot\|$ | **corrects** | ×7 à ×14 |
| $\ne$ | **correct** (ex. 2, « $a+b \ne c$ ») | ×2 |

**La seule anomalie, et elle est localisée :** dans la ligne de définition de
la suite (Partie II), l'indice de $u_{n+1}$ se présente **au premier coup
d'œil comme $u_{n\div 1}$** — le signe « + » y ressemble à un « ÷ ».

**Diagnostic, établi au zoom ×22 en interpolation NEAREST (donc pixel par
pixel, sans lissage) :** le glyphe porte bien une **barre horizontale avec un
segment vertical au-dessus ET un segment vertical en dessous, alignés sur la
même abscisse**. C'est un « + » dont **le pixel de croisement** a été perdu à
la numérisation (indice de petit corps, scan à 150 dpi). Un vrai « ÷ » aurait
deux **points** ronds détachés, pas deux segments verticaux alignés.
**Confirmation croisée :** deux lignes plus bas, la question II-2a écrit
$|u_{n+1} - \alpha|$ avec un « + » **parfaitement formé** — même variable, même
indice, corps légèrement plus grand, croisement intact. Et mathématiquement,
$u_{n\div1}$ n'a aucun sens.

**Lecture retenue : $u_{n+1} = f_0(u_n)$.** C'est un artefact de rastérisation,
pas une substitution de police. *(À reconfirmer en vérification — c'est le
seul caractère de tout l'énoncé qui a demandé une adjudication.)*

> 🔎 **VÉRIFICATION (2026-08-27) — conclusion CONFIRMÉE, diagnostic CORRIGÉ,
> et le point est désormais PROUVÉ.** Le « + » est juste. Mais le pixel de
> croisement **n'est pas perdu** : il est intact (ligne 1374, colonne 583,
> pleine encre) ; ce qui manque, ce sont les deux pixels *adjacents* à la
> barre, et ils sont à blanc papier franc, pas en gris atténué. **La cause
> n'est pas la numérisation du sujet mais le sous-échantillonnage 300 → 150
> dpi qu'AlloSchool applique pour produire les JPG servis** : dans la
> **couche bitonale 300 dpi embarquée dans le PDF**, le fût du « + » est
> **continu et traverse la barre, sans le moindre trou**. Le sujet officiel
> est impeccable ici. Matrices de pixels et démonstration en
> § `Ce que la vérification a trouvé`, point 1.

**Un point de typographie, à ne pas « corriger » :** la valeur approchée de la
Partie III q1-b est imprimée **avec un point décimal** — « $< 1.47$ » — et non
avec la virgule française. Vérifié au zoom ×11 : le séparateur est un point
carré posé sur la ligne de base. Le reste du sujet n'a aucun autre nombre
décimal. **Transcrit tel quel.**

> 🔎 **VÉRIFICATION (2026-08-27) — juste pour « 1.47 », mais incomplet.**
> Le point de « 1.47 » est confirmé (mesuré : 7 px de haut, base sur la ligne
> de base, **aucune descendante** — une virgule descendrait de 5 à 7 px).
> Seulement, **« le reste du sujet n'a aucun autre nombre décimal » est
> inexact** : les **24 marques de la colonne de marge** en sont, et elles
> portent **le même point** — le scan imprime `0.5`, que ce fichier francise
> en `0,5` vingt-quatre fois. Écart mineur et sans effet sur la conversion,
> mais relevé parce qu'il contredit la règle que ce paragraphe pose lui-même.

---

## 2021 — session normale — Exercice 1
Source: https://www.alloschool.com/element/127193
Statut: **vérifié** — re-fetch indépendant + re-dérivation des 24 questions + couche 300 dpi du PDF (vérificateur adversarial, 2026-08-27 ; quatre contrôles anti-CDN refaits, zéro divergence sur l'énoncé)

- Filière / épreuve : Sciences Mathématiques (A) et (B), option française — Mathématiques, 4 h, coef 9
- Code sujet : NS 24F · Barème de l'exercice : **12 points** (imprimé p. 1 *et* en tête du corps p. 2)
- Images lues : `…/upload-84150/0002-big.jpg` (Partie I entière, Partie II jusqu'à q2-a) et `…/0003-big.jpg` (Partie II q2-b et q2-c, Partie III entière)
- Pages du scan : **2 et 3** (sur 4). L'exercice 2 démarre au bas de la page 3.
- **Aucune figure n'est imprimée.** La question I-4 demande au candidat de *construire* les deux courbes ; il ne lui en est donné aucune. Aucune table de valeurs non plus.

### Recompte du barème, question par question, relevé dans la marge du scan

Chaque question porte **0,5** dans la colonne de gauche. Aucune n'en porte
d'autre : la colonne a été recadrée séparément du corps et relue à ×4 sur les
deux pages, précisément pour ne pas confondre un `0,25` ou un `0,75` avec un
`0,5`.

| Partie | Questions cotées | Détail | Sous-total |
|---|---|---|---|
| I | 10 | $0{,}5 \times 10$ | **5,0** |
| II | 5 | $0{,}5 \times 5$ | **2,5** |
| III | 9 | $0{,}5 \times 9$ | **4,5** |

Total : $5{,}0 + 2{,}5 + 4{,}5 = \mathbf{12{,}0}$ — **24 questions cotées à 0,5**.

✔ **Le recompte retombe exactement sur les 12 points du cartouche.** Aucun
écart à signaler entre la marge, le titre d'exercice et la page 1.

*Deux lignes de l'énoncé ne sont PAS cotées et ne doivent pas être comptées
comme des questions : le préambule « 5- Pour tout réel $t>0$, on pose $A(t)$… »
(dont seuls les sous-points a) et b) portent 0,5) et la ligne
« (On distinguera les deux cas : $n=0$ et $n\ge1$) », qui est une consigne
rattachée à I-2c.*

---

**EXERCICE 1 (12 points)**

Pour tout entier naturel $n$, on considère la fonction $f_n$ définie sur $\mathbb{R}$ par :

$f_n(x) = \dfrac{-2e^x}{1+e^x} + nx$

Soit $(C_n)$ sa courbe représentative dans un repère orthonormé $(O,\vec{i},\vec{j})$.

(On prendra $\|\vec{i}\| = \|\vec{j}\| = 1cm$)

**Partie I :**

1. **a)** *(0,5)* Calculer $\lim\limits_{x \to +\infty}\big(f_n(x) - nx + 2\big)$ puis interpréter graphiquement le résultat obtenu.

   **b)** *(0,5)* Montrer que la courbe $(C_n)$ admet, en $-\infty$, une asymptote $(\Delta_n)$ dont on déterminera une équation cartésienne.

2. **a)** *(0,5)* Montrer que la fonction $f_n$ est dérivable sur $\mathbb{R}$ et que : $(\forall x \in \mathbb{R})\ ;\quad f_n'(x) = \dfrac{-2e^x}{(1+e^x)^2} + n$

   **b)** *(0,5)* Montrer que : $(\forall x \in \mathbb{R})\ ;\quad \dfrac{4e^x}{(1+e^x)^2} \le 1$

   **c)** *(0,5)* En déduire le sens de variation de la fonction $f_n$ sur $\mathbb{R}$

   (On distinguera les deux cas : $n=0$ et $n \ge 1$)

3. **a)** *(0,5)* Déterminer l'équation de la tangente à la courbe $(C_n)$ au point $I$ d'abscisse $0$

   **b)** *(0,5)* Montrer que le point $I$ est le seul point d'inflexion de la courbe $(C_n)$

4. *(0,5)* Représenter graphiquement dans le même repère, les deux courbes $(C_0)$ et $(C_2)$.

5. Pour tout réel $t>0$, on pose $A(t)$ l'aire du domaine plan limité par $(C_n)$ et les droites d'équations respectives : $y = nx - 2$, $x = 0$ et $x = t$

   **a)** *(0,5)* Calculer $A(t)$ pour tout $t>0$

   **b)** *(0,5)* Calculer $\lim\limits_{t \to +\infty} A(t)$

**Partie II :**

On considère la suite $(u_n)_{n \ge 0}$ définie par :

$u_0 = 0$ et $(\forall n \in \mathbb{N})\ ;\quad u_{n+1} = f_0(u_n)$

1. **a)** *(0,5)* Montrer que l'équation $f_0(x) = x$ admet une unique solution $\alpha$ dans $\mathbb{R}$

   **b)** *(0,5)* Montrer que : $(\forall x \in \mathbb{R})\ ;\quad \big|f_0{}'(x)\big| \le \dfrac{1}{2}$

2. **a)** *(0,5)* Montrer que : $(\forall n \in \mathbb{N})\ ;\quad |u_{n+1} - \alpha| \le \dfrac{1}{2}|u_n - \alpha|$

   **b)** *(0,5)* En déduire que : $(\forall n \in \mathbb{N})\ ;\quad |u_n - \alpha| \le \left(\dfrac{1}{2}\right)^{n}|\alpha|$

   **c)** *(0,5)* Montrer que la suite $(u_n)_{n \ge 0}$ converge vers $\alpha$

**Partie III :**

On suppose dans cette partie que $n \ge 2$

1. **a)** *(0,5)* Montrer que pour tout entier $n \ge 2$, il existe un unique réel $x_n$ solution de l'équation $f_n(x) = 0$

   **b)** *(0,5)* Montrer que pour tout entier $n \ge 2$, $0 < x_n < 1$

   (On prendra $\dfrac{2e}{1+e} < 1.47$)

2. **a)** *(0,5)* Montrer que pour tout entier $n \ge 2$, $f_{n+1}(x_n) > 0$

   **b)** *(0,5)* En déduire que la suite $(x_n)_{n \ge 2}$ est strictement décroissante.

   **c)** *(0,5)* Montrer que la suite $(x_n)_{n \ge 2}$ est convergente.

3. **a)** *(0,5)* Montrer que pour tout entier $n \ge 2$, $\dfrac{1}{n} < x_n < \dfrac{1}{n}\left(\dfrac{2e}{1+e}\right)$

   **b)** *(0,5)* En déduire $\lim\limits_{n \to +\infty} x_n$, puis montrer que $\lim\limits_{n \to +\infty} n x_n = 1$

4. **a)** *(0,5)* Montrer que pour tout entier $n \ge 2$, on a : $x_n \le x_2$

   **b)** *(0,5)* En déduire $\lim\limits_{n \to +\infty} (x_n)^{n}$

*(Fin de l'exercice 1. L'exercice 2 — nombres complexes, 4 pts — commence au
bas de la page 3 et sort de la portée de ce fichier.)*

---

## Contrôles de cohérence faits par le transcripteur

Ces re-dérivations ne remplacent PAS la vérification ; elles servent
uniquement à détecter une faute de transcription qui rendrait l'énoncé
insoluble. **Toutes retombent juste**, ce qui est un argument de plus pour la
fidélité de la lecture — mais pas une preuve.

- **I-2a** — dérivée : $\frac{d}{dx}\left(\frac{-2e^x}{1+e^x}\right) = \frac{-2e^x(1+e^x) + 2e^x \cdot e^x}{(1+e^x)^2} = \frac{-2e^x}{(1+e^x)^2}$, d'où $f_n'(x) = \frac{-2e^x}{(1+e^x)^2} + n$. ✔ conforme au scan.
- **I-2b** — $(1+e^x)^2 - 4e^x = (1-e^x)^2 \ge 0$, donc $\frac{4e^x}{(1+e^x)^2} \le 1$, avec **égalité en $x=0$**. C'est ce qui impose $\le$ et interdit $<$ : la lecture du symbole est confirmée par sa conséquence.
- **I-2c** — de I-2b, $\frac{2e^x}{(1+e^x)^2} \le \frac12$ : pour $n=0$, $f_0' < 0$ (strictement, sauf annulation nulle part) donc $f_0$ décroissante ; pour $n \ge 1$, $f_n' \ge 1 - \frac12 > 0$ donc croissante. ✔ la distinction de cas demandée est exactement celle-là.
- **I-1a** — $f_n(x) - nx + 2 = \frac{-2e^x}{1+e^x} + 2 = \frac{2}{1+e^x} \to 0$ en $+\infty$ : asymptote **$y = nx-2$** en $+\infty$. ✔ et c'est bien la droite reprise en I-5.
- **I-1b** — $f_n(x) - nx = \frac{-2e^x}{1+e^x} \to 0$ en $-\infty$ : $(\Delta_n)\ :\ y = nx$. ✔
- **I-3** — $f_n(0) = -1$, $f_n'(0) = n - \frac12$, tangente $y = (n-\tfrac12)x - 1$ ; $f_n''(x) = \frac{-2e^x(1-e^x)}{(1+e^x)^3}$ s'annule **en changeant de signe** uniquement en $x=0$ : $I$ est bien le seul point d'inflexion. ✔
- **I-5** — $A(t) = \int_0^t \frac{2}{1+e^x}\,dx = 2t - 2\ln(1+e^t) + 2\ln 2$ (en cm²), et $\lim_{t\to+\infty} A(t) = 2\ln 2$ : **limite finie**, la question a un sens. ✔
- **II-1b** — $|f_0'(x)| = \frac{2e^x}{(1+e^x)^2} \le \frac12$ est exactement I-2b divisé par 2. ✔ l'enchaînement Partie I → Partie II est cohérent.
- **II-2b** — $u_0 = 0$ donne $|u_0 - \alpha| = |\alpha|$ : la majoration $\left(\frac12\right)^n|\alpha|$ est le facteur initial, pas une constante parachutée. ✔ *(Noter la différence avec SM 2025 N, dont la majoration analogue est sans facteur initial — les deux sujets ne se normalisent pas l'un sur l'autre.)*
- **III-2a** — $f_n(x_n) = 0$ donne $f_{n+1}(x_n) = f_n(x_n) + x_n = x_n > 0$ par III-1b. ✔ D'où la décroissance stricte de III-2b.
- **III-3a** — $f_n(x_n)=0 \iff n x_n = \frac{2e^{x_n}}{1+e^{x_n}}$ ; sur $]0,1[$ ce quotient vit dans $\left]1,\ \frac{2e}{1+e}\right[$, d'où l'encadrement imprimé. ✔ Et $\frac{2e}{1+e} = 1{,}4621\ldots < 1{,}47$ : **la valeur approchée du sujet est juste et strictement majorante**, ce qui valide à la fois le « 1.47 » et le sens « $<$ ».
- **III-3b** — $x_n \to 0$ par encadrement, puis $n x_n = \frac{2e^{x_n}}{1+e^{x_n}} \to \frac{2}{2} = 1$. ✔
- **III-4** — $x_n \le x_2 < 1$ donne $0 < (x_n)^n \le (x_2)^n \to 0$. ✔

**Aucune incohérence détectée dans l'énoncé officiel.** Contrairement à SM
2024 N (numéros croisés en page 1) et à SM 2017 N (un `;` litigieux), ce sujet
ne présente, à ce stade, aucun défaut propre.

---

## Classement proposé vers `content/maths/`

> 🔎 **VÉRIFICATION (2026-08-27) — la proposition ci-dessous est SUPERSÉDÉE.**
> Le classement a été tranché : voir
> **§ `⚖️ Le classement — ce que la vérification tranche`** en fin de fichier.
> En résumé : `suites-numeriques` **si une seule carte** (mesuré à **7,0/12**,
> non 5,0 — la Partie III est *un* objet, la suite implicite, et ne se
> découpe pas par outil), et **le précédent SM 2025 N ne s'y oppose pas** :
> relu dans la banque, il dit « plus gros bloc **ET** identité », une
> conjonction, jamais une hiérarchie qui ferait gagner l'identité contre une
> mesure plus grande. La question *une carte ou deux* reste, elle, un
> arbitrage owner — avec un fait nouveau : **aucune carte SM du dépôt ne
> dépasse 10 points**, vérifié sur les 14 banques.

**Contrôle d'existence fait.** `ls content/maths/` a été exécuté et rend
**14 dossiers** : `arithmetique`, `calcul-integral`, `denombrement`,
`derivabilite-etude-fonctions`, `equations-differentielles`,
`fonction-exponentielle`, `fonction-logarithme`, `geometrie-espace`,
`limites-continuite`, `nombres-complexes-1`, `nombres-complexes-2`,
`probabilites-conditionnelles`, `structures-algebriques`, `suites-numeriques`.
**Les cinq slugs cités ci-dessous existent tous**, de même que les deux slugs
cités en tête de fichier pour les exercices 2 et 3 (`nombres-complexes-2`,
`arithmetique`). **Aucun slug inventé.**

### La mesure — attribution des 12 points question par question

Chaque question est versée à la notion dont elle mobilise réellement l'outil.

| Bloc | Questions | Points |
|---|---|---|
| Étude d'une fonction bâtie sur $e^x$ (limites, asymptotes, dérivée, variations, tangente, point d'inflexion, tracé) | I-1a, I-1b, I-2a, I-2b, I-2c, I-3a, I-3b, I-4 | **4,0** |
| Suites — suite récurrente $u_{n+1}=f_0(u_n)$ (point fixe, contraction, convergence) | II-1a, II-1b, II-2a, II-2b, II-2c | **2,5** |
| Suites — suite implicite $(x_n)$ (monotonie, convergence, $\lim x_n$, $\lim nx_n$, $\lim (x_n)^n$) | III-2b, III-2c, III-3b, III-4a, III-4b | **2,5** |
| Existence et encadrement par TVI, étude de signe | III-1a, III-1b, III-2a, III-3a | **2,0** |
| Calcul intégral (aire entre la courbe et son asymptote) | I-5a, I-5b | **1,0** |

Somme : $4{,}0 + 2{,}5 + 2{,}5 + 2{,}0 + 1{,}0 = \mathbf{12{,}0}$ ✔

### Proposition

| Exercice | Barème | Slug dominant proposé | Cross-lists |
|---|---|---|---|
| Exercice 1 | 12 pts | **`suites-numeriques`** | `fonction-exponentielle` (Partie I) · `limites-continuite` (TVI et encadrements de la Partie III) · `calcul-integral` (I-5) · `derivabilite-etude-fonctions` (I-2, I-3) |

### ⚠️ L'arbitrage n'est PAS tranché — et je dis pourquoi

**La mesure dit `suites-numeriques` (5,0/12), l'identité dit
`fonction-exponentielle` (4,0/12).** Je propose le premier parce que c'est ce
que la mesure donne, mais je refuse de présenter ce choix comme évident. Les
deux arguments, en clair, pour que le vérificateur ou l'owner tranche :

- **Pour `suites-numeriques` :** c'est le plus gros total (5,0 contre 4,0), et
  **deux parties sur trois** de l'exercice (II et III, soit 7,0 points au
  total en comptant leurs questions de TVI) sont des études de suites. Le
  slug est par ailleurs pauvre côté SM — le CENSUS lui compte **1** entrée SM,
  contre 20 SExp.
- **Pour `fonction-exponentielle` :** les 5,0 points « suites » sont **scindés
  en deux suites indépendantes** ($u_n$ et $x_n$) qui n'ont rien à voir l'une
  avec l'autre ; aucun bloc *contigu* n'atteint 4,0 sauf la Partie I. Et
  $f_n$ *est* une fonction exponentielle : toutes les autres parties sont
  bâties dessus. C'est exactement le raisonnement qui a fait retenir
  `fonction-exponentielle` pour **SM 2025 N** avec seulement 3,5/10 — retenir
  autre chose ici créerait une incohérence de traitement entre deux sujets
  très voisins. Ce slug ne compte lui aussi qu'**1** entrée SM.

**Troisième option à considérer, et elle est sérieuse :** à **12 points pour
une seule carte** — le plus gros exercice unique du corpus SM, devant les 13
points de 2020 N qui sont déjà signalés comme un problème structurel —
**le partitionnement mérite d'être examiné**. Le précédent `bk-2022-n-x4`
montre que le dépôt sait découper un gros exercice entre deux banques ; la
règle de répartition du README (« le barème est réparti, jamais dupliqué »)
s'applique alors telle quelle, et la découpe naturelle est nette :
**Partie I → `fonction-exponentielle` (5,0, y compris l'aire)** et
**Parties II + III → `suites-numeriques` (7,0)**. C'est une décision de
produit, pas de transcription : je la signale, je ne la prends pas.

---

## Ce que la vérification devra trancher EN PRIORITÉ

> 🔎 **Les dix points ont été soldés le 2026-08-27** — un par un, avec preuve,
> en § `Ce que la vérification a trouvé`. Le docket ci-dessous est conservé
> tel qu'écrit par le transcripteur, comme énoncé du problème.

Par ordre décroissant de coût si c'est faux.

1. **Le « + » de l'indice $u_{n+1}$ dans la ligne de définition de la suite
   (Partie II, p. 2).** C'est **le seul caractère du fichier qui a demandé une
   adjudication**. Il se présente comme un « ÷ » ; je l'ai lu « + » sur trois
   arguments (segments verticaux alignés au-dessus et au-dessous de la barre
   au zoom ×22 NEAREST ; « + » intact sur le même symbole deux lignes plus
   bas en II-2a ; absence de sens mathématique de l'alternative). **À
   reconfirmer indépendamment, sans lire ce paragraphe d'abord.**
2. **Le point décimal de « $\frac{2e}{1+e} < 1.47$ » (III-1b).** Point et non
   virgule — je l'ai transcrit tel quel plutôt que de le franciser. Confirmer
   que le scan porte bien un point, **et** que le nombre est bien `1.47` et
   non `1,47` ni `1.42` : le `4` et le `7` sont en petit corps.
3. **Les indices de la question I-4 : $(C_0)$ et $(C_2)$.** Lus à ×10 et
   sans ambiguïté, mais l'OCR pleine page les rend tous deux comme « (C,) » —
   donc aucun recoupement non visuel n'existe sur ce point. Un `(C_1)` au lieu
   de `(C_0)` changerait complètement la question (c'est précisément le
   couple $n=0$ / $n\ge1$ de la distinction de cas de I-2c qui est illustré).
4. **Les quatre relations d'ordre STRICTES de la Partie III** — $0 < x_n < 1$
   (III-1b), $\frac1n < x_n < \frac1n\left(\frac{2e}{1+e}\right)$ (III-3a),
   $f_{n+1}(x_n) > 0$ (III-2a) — **face au $\le$ de III-4a**
   ($x_n \le x_2$). Le sujet mélange les deux sens dans la même partie ; c'est
   exactement le motif qui a coûté cher sur SM 2017 N. J'ai vérifié chaque
   symbole séparément au zoom (le $\le$ de III-4a porte une barre horizontale
   nette, les autres non), mais c'est à refaire.
5. **L'exposant $n$ de III-4b : $\lim (x_n)^{n}$**, et **l'exposant $n$ de
   II-2b : $\left(\frac12\right)^{n}$**. Deux exposants en très petit corps,
   tous deux porteurs de toute la question. Vérifier qu'il ne s'agit pas de
   $n+1$ ni de $2$. *(La comparaison avec SM 2025 N est instructive : là-bas
   la majoration analogue porte $\left(\frac12\right)^{n+1}$ **sans** facteur
   initial ; ici elle porte $\left(\frac12\right)^{n}$ **avec** $|\alpha|$. Les
   deux sujets diffèrent réellement — ne pas normaliser l'un sur l'autre.)*
6. **Le signe « $-$ » du numérateur $\dfrac{-2e^x}{1+e^x}$**, dans la
   définition de $f_n$ **et** dans celle de $f_n'$ (I-2a). Tout l'exercice en
   dépend, et un « − » unaire en tête de fraction est typographiquement fragile.
   *(Contrôle par conséquence disponible : sans le signe, $f_0$ serait
   croissante et la distinction de cas de I-2c n'aurait pas lieu d'être.)*
7. **Le « 4 » du numérateur de I-2b** ($\frac{4e^x}{(1+e^x)^2} \le 1$) face au
   « 2 » de I-2a. Un `2` lu à la place du `4` casserait le lien I-2b → II-1b.
8. **Le recompte du barème dans la marge**, indépendamment du mien : 24
   questions à 0,5 = 12,0. La colonne de gauche doit être recadrée **seule**,
   sans le corps du texte — c'est ce qui empêche de confondre un `0,25` avec
   un `0,5` par contamination de la ligne voisine.
9. **La composition de la page 1** : 3 exercices, 12 + 4 + 4. Ce fichier
   tranche un « (?) » du CENSUS ; si la vérification lit autre chose, c'est
   le CENSUS **et** ce fichier qu'il faut corriger, pas l'un des deux.
10. **Les quatre contrôles de provenance, refaits de zéro.** Les MD5 du
    tableau ci-dessus sont fournis pour comparaison, **pas** pour dispenser du
    re-téléchargement. Rappel de l'incident : sous l'URL du bon élément, le CDN
    d'AlloSchool a déjà servi trois pages sur six d'un autre millésime, et une
    lecture visuelle avec la transcription sous les yeux a « retrouvé » les
    énoncés attendus sur des pages qui ne les contenaient pas.

### Points restés indécidables à l'issue de la transcription

**Aucun.** Chaque caractère de l'énoncé a été lu ; le seul qui ait demandé une
adjudication (le « + » du point 1) l'a été par trois mesures convergentes, et
il est signalé comme tel plutôt que dissimulé. Aucune valeur n'est déclarée
illisible.

> 🔎 **VÉRIFICATION (2026-08-27) — confirmé.** La passe indépendante n'a laissé
> elle non plus **aucune valeur illisible**, et l'unique adjudication a été
> refaite puis **prouvée** sur une source de résolution double.

### Écarts avec le recensement — pour mémoire

| Point | CENSUS | Ce fichier (lu sur le scan) | Verdict |
|---|---|---|---|
| Barème de l'analyse | 12 **(?)**, inféré | **12**, imprimé p. 1 | **concorde** — le « (?) » peut tomber |
| Nombre d'exercices | « 3 exercices seulement » | 3, imprimé p. 1 | **concorde** |
| Structures algébriques | « pas de structures algébriques » | absentes | **concorde** |
| Code sujet | NS24F | **NS 24F**, lu p. 1 (avec espace) | **concorde** |
| Nombre de pages | non renseigné | **4 pages** (`upload-84150`) | à ajouter au CENSUS |
| `upload-` | non renseigné | **`upload-84150`**, `course-436` | à ajouter au CENSUS |

**Aucun écart à signaler.** Le CENSUS avait raison sur les trois points qu'il
annonçait ; il lui manquait seulement la confirmation du 12 et les
identifiants d'images.

---

## Ce que la vérification a trouvé

> **Passe adversariale INDÉPENDANTE — 2026-08-27** (date réelle, `date -u` :
> *Thu Aug 27 18:09:11 UTC 2026*). Le scan a été **re-téléchargé de zéro** ;
> le texte transcrit n'a jamais été relu à la place de l'image. Les quatre
> contrôles anti-CDN ont été refaits **en entier**, et **deux instruments que
> la transcription n'avait pas ouverts** ont été ajoutés — dont l'un
> (§ « la couche bitonale 300 dpi ») tranche à lui seul le point n°1 du
> docket, celui qui coûtait le plus cher.
>
> **Verdict : la transcription de l'énoncé est FIDÈLE. Zéro divergence sur
> l'énoncé, sur le barème et sur l'en-tête.** Trois écarts mineurs sont
> relevés plus bas — un de fidélité typographique (les `0,5` de la marge),
> deux de *diagnostic* dans les notes du transcripteur (le mécanisme du
> « + » cassé, et la portée de l'artefact d'OCR « 2024 »). Aucun ne touche
> le corps de l'énoncé.

### Les quatre contrôles anti-CDN — **les quatre ont été faits**, aucun sauté

| Contrôle | Fait ? | Comment, par moi |
|---|---|---|
| 1 — année imprimée sur **chaque** page | ✅ **fait** | lecture ×6 à ×8 des 4 cartouches **+** OCR chiffres-seuls sur recadrage restreint, en 3 modes `--psm` |
| 2 — recoupement **non visuel** | ✅ **fait** | **six** instruments distincts (détail ci-dessous), dont deux inédits |
| 3 — MD5 + **second** téléchargement | ✅ **fait** | 2 passes, 2 User-Agents, `Cache-Control: no-cache` + URL cache-bustée, `cmp` octet à octet |
| 4 — `<title>` et URL servis | ✅ **fait** | `element/127193` re-fetché, `<title>`, `<meta description>`, URL du PDF et chemin d'images extraits du HTML servi |

**Contrôle 1 — l'année, page par page.** Les quatre cartouches ont été
recadrés et relus séparément, puis l'OCR a été relancé sur le **seul** groupe
de quatre chiffres, avec `-c tessedit_char_whitelist=0123456789` et en
`--psm 7`, `8` **et** `13` (douze lectures au total) :

| Page | Numérotation lue | Code lu | Lecture visuelle du millésime | OCR chiffres-seuls (psm 7 / 8 / 13) |
|---|---|---|---|---|
| 1/4 | **1 / 4** | `NS 24F` | **2021** (×8) | `2021` / `2021` / `2021` |
| 2/4 | **2 / 4** | `NS 24F` | **2021** (×6) | `2021` / `2021` / `2021` |
| 3/4 | **3 / 4** | `NS 24F` | **2021** (×6) | `2021` / `2021` / `2021` |
| 4/4 | **4 / 4** | `NS 24F` | **2021** (×6) | `2021` / `2021` / `2021` |

**Aucun panachage. Les quatre pages sont du même sujet, même année, même
code, même mention de filière** (« شعبة العلوم الرياضية (أ) و (ب) (خيار فرنسية) »).

⚠️ **Correction à la note du transcripteur sur l'artefact « 2024 ».** Le piège
existe et je l'ai reproduit — mais **sa portée est plus large que ce que le
fichier annonçait**. Le transcripteur écrit que l'OCR pleine page rend l'année
« 2024 » **sur les pages 2 et 3**. Dans ma passe (`tesseract --psm 6`, pack
`eng` seul), l'artefact frappe **les pages 1, 2 ET 3** — la page 1 rend
« Ea 2024 Agclall 5 gall » — et **seule la page 4 rend `2021`** en pleine page.
Trois pages sur quatre, donc, et non deux. Le remède est bien celui qu'il
décrit (restreindre le recadrage aux quatre chiffres), mais un agent qui
attend l'artefact sur 2 pages et le trouve sur 3 pourrait conclure à une
contamination. **Il n'y en a pas : c'est le même artefact, une page de plus.**

**Contrôle 2 — six instruments non visuels, dont deux inédits.**

1. **OCR intégral des 4 pages** (`--psm 6`) : rend un sujet SM à **trois**
   exercices — p. 1 « L'épreuve comporte 3 exercices indépendants » et les
   trois lignes de barème ; p. 2 « EXERCICE1 : (12 points) » ; p. 3
   « EXERCICE2 : (4 points) » ; p. 4 « EXERCICES : (4 points) » (*lire
   EXERCICE3*) puis « FIN ». Aucun sujet étranger n'apparaît.
2. **Métadonnées du PDF** (PyMuPDF, invisibles à l'écran donc non
   « retrouvables » par lecture) : `title: KM_287-20210614091408` ·
   `creator: KM_287` · `producer: KONICA MINOLTA bizhub 287` ·
   `creationDate: D:20210614091408Z` → **14 juin 2021**, la fenêtre de la
   session normale 2021. `get_text()` vide sur les 4 pages (scan pur) ;
   **10 / 26 / 11 / 12 images par page** — identique à ce que rapporte la
   transcription.
3. **Ancre de date interne au contenu** : l'OCR de la page 4 rend
   « b) En déduire que: x = 527 **[2021]** » — le module de l'exercice 3 est
   l'année du sujet. Une page servie depuis un autre millésime ne pourrait
   pas la porter.
4. **⭐ INÉDIT — corrélation pixel PDF ↔ JPG, avec matrice de contrôle
   croisé.** Le PDF et les JPG sont servis par **deux chemins d'actifs
   différents**. J'ai rendu les 4 pages du PDF à 150 dpi et corrélé chacune
   avec chacun des 4 JPG servis. La matrice est **diagonale** :

   | | JPG 1 | JPG 2 | JPG 3 | JPG 4 |
   |---|---|---|---|---|
   | **PDF p.1** | **0,944** | 0,040 | 0,034 | 0,035 |
   | **PDF p.2** | 0,037 | **0,893** | 0,130 | 0,104 |
   | **PDF p.3** | 0,038 | 0,141 | **0,889** | 0,157 |
   | **PDF p.4** | 0,045 | 0,111 | 0,165 | **0,891** |

   Chaque image servie correspond à la page de même rang du PDF, et à aucune
   autre. **C'est exactement le contrôle qui aurait cassé l'incident SM 2025
   en une commande** : un JPG substitué depuis un autre millésime aurait
   donné une diagonale effondrée.
5. **⭐ INÉDIT — la couche bitonale 300 dpi embarquée dans le PDF** (voir la
   section dédiée ci-dessous). Elle porte le corps de l'énoncé au **double**
   de la résolution des JPG servis, et c'est elle qui tranche le point 1.
6. **Métrologie de la colonne de marge**, calibrée sur le scan lui-même
   (voir point 8 du docket) — une mesure de largeur en pixels, sans lecture.

**Aucun des six ne contredit l'attente ; aucun sujet étranger n'apparaît.**

**Contrôle 3 — MD5, deux téléchargements.** Passe 1 (UA Chrome) et passe 2
(UA `curl-verif/2.0`, `Cache-Control: no-cache`, `Pragma: no-cache`, URL
cache-bustée). Mes empreintes, **calculées sur mes propres fichiers** :

| Fichier | Octets | MD5 (ma passe 1) | MD5 (ma passe 2) | `cmp` | = transcription ? |
|---|---|---|---|---|---|
| `upload-84150/0001-big.jpg` | 319 443 | `1b2212c8282cdbb4bfba85d6027777b9` | identique | ✔ | **oui** |
| `upload-84150/0002-big.jpg` | 394 636 | `9c55ac2206d31c2256886ae8a18e0103` | identique | ✔ | **oui** |
| `upload-84150/0003-big.jpg` | 409 943 | `70e9357822840a94b11f0e66bb275a98` | identique | ✔ | **oui** |
| `upload-84150/0004-big.jpg` | 387 719 | `227d5a6fc0afc2d994b6756527d778be` | identique | ✔ | **oui** |
| `…-2021-normale-sujet-2.pdf` | 216 956 | `b2687f97bdcad6c1471aaeebdfac5cd7` | identique | ✔ | **oui** |

`file` : *JPEG, JFIF 1.01, density 150×150, baseline, precision 8,
**1240×1752**, components 1* — niveaux de gris, conforme. **Les cinq
empreintes recalculées coïncident avec celles de la transcription.**

**Contrôle 4 — ce que le serveur sert.**
`<title>` : **« Examen National Mathématiques Sciences Maths 2021 Normale -
Sujet - AlloSchool »**. `<meta name="description">` : « … 2021 Normale -
Sujet, Examens Nationaux, Mathématiques 2ème BAC Sciences Mathématiques B
BIOF ». URL du PDF lié :
`…/examen-national-mathematiques-sciences-maths-2021-normale-sujet-2.pdf`.
Images : `course-436/upload-84150/000{1..4}` — **quatre pages, et quatre
seulement** (le HTML n'en liste pas d'autres). Année, filière, session,
nature : quadruple concordance, sur trois canaux indépendants.
*(Vérifié au passage : `course-436` est bien le dossier de cours SM — le
CENSUS l'atteste ligne 70, et SM 2017 N, 2022 N, 2023 N y logent aussi.)*

### ⭐ La couche bitonale 300 dpi — l'instrument que la transcription n'avait pas ouvert

Le PDF servi est un scan Konica en **MRC** (masque + fond). Sous le fond JPEG
pleine page, chaque page embarque une **couche masque bitonale** qui porte le
corps de l'énoncé :

| Page PDF | xref | Dimensions | Placement (pt) | Résolution effective |
|---|---|---|---|---|
| 2 | 35 | **2120 × 2668** | (36,5 · 119,3) → (545,3 · 759,6) | **300 dpi** |
| 3 | 87 | **1944 × 2856** | (36,5 · 80,9) → (503,0 · 766,4) | **300 dpi** |
| 4 | 117 | 2128 × 2508 | (30,7 · 42,5) → (541,4 · 644,4) | 300 dpi |

**Les JPG servis par AlloSchool sont à 150 dpi : la source porte le double.**
Tout l'énoncé de l'exercice 1 a donc été relu une seconde fois à 300 dpi, sur
une image **extraite du PDF**, c'est-à-dire par un chemin d'actif différent de
celui des JPG. *(Réserve honnête : le partage MRC met les `=`, les `−`, les
barres de fraction, certains `≤` et les `ℝ` dans l'AUTRE couche — ils sont
absents du masque et présents dans le composite 150 dpi. Ne pas conclure à un
signe manquant en lisant le masque seul ; je l'ai vérifié pour chacun sur le
composite.)*

### Les dix points du docket, soldés un par un

#### Point 1 — le « + » de l'indice $u_{n+1}$ · **ADJUGÉ « + », et cette fois PROUVÉ**

L'adjudication du transcripteur est **confirmée**, mais je l'ai refaite sans
la reprendre, et **son diagnostic du mécanisme est inexact**.

*Ce que montrent les pixels du JPG 150 dpi* (`0002-big.jpg`, matrice de
niveaux de gris brute, seuil ~128 ; le scan est quasi bi-niveau : toutes les
valeurs sont soit ≈ 43-45, soit ≈ 253-255) :

```
col      578 579 580 581 582 583 584 585 586 587
1371                          43                    ← fût, 1 px
1372                          44
1373                         254                    ← BLANC PUR (pas de gris)
1374          43  44  45  44  44  44  44  45        ← barre, 8 px
1375                          43  44
1376                         254                    ← BLANC PUR
1377                          43
1378                          45
```

Le transcripteur conclut à « un “+” dont **le pixel de croisement** a été
perdu ». **C'est faux : le pixel de croisement est intact** (ligne 1374,
colonne 583 = 44, pleine encre). Ce qui manque, ce sont les **deux pixels
immédiatement au-dessus et au-dessous de la barre** (lignes 1373 et 1376), et
ils sont à **254 — blanc papier franc, pas un gris atténué**.

*L'argument géométrique, qui tient sans le 300 dpi.* Comparaison avec le « + »
intact de II-2a, sur la même page, même corps :

| Mesure | glyphe litigieux (ligne de définition) | « + » de référence (II-2a) |
|---|---|---|
| hauteur totale du glyphe | **8 lignes** (1371→1378) | **8 lignes** (1556→1563) |
| largeur de la barre | **8 px** | **8 px** |
| abscisse du fût, depuis le bord gauche de la barre | **+3** | **+3** |
| lignes d'encre au-dessus de la barre | **3** | **3** |
| lignes d'encre au-dessous | **4** | **4** |
| largeur du fût | **1 px** | **1 px** |

Boîte identique, barre identique, fût à la même abscisse relative, même
répartition 3/4. Et **l'hypothèse « ÷ » est réfutée par deux mesures** :
(a) l'encre de la ligne 1375 **touche la barre** — un point de division ne
touche jamais la barre, il en est séparé des deux côtés ;
(b) le fût fait **1 px de large sur 2 de haut** — c'est un fragment de trait,
pas un point (un point de « ÷ » à ce corps serait un pâté d'au moins 2×2,
aussi large que haut).

*La preuve, enfin, par la source.* Le même glyphe, lu dans la **couche
bitonale 300 dpi du PDF** (`p2_body300`, xref 35), ligne de définition :

```
2245  ....................##.............
2246  ....................##.............
2247  ....................##.............
2248  ....................##.............
2249  .....................#.............
2250  .....................#.............
2251  ..............#########.####.......   ← barre
2252  .............################......   ← barre
2253  .............################......   ← barre
2254  ....................###............
2255  .....................#.............
2256  .....................#.............
2257  ....................##.............
2258  ....................##.............
2259  ....................##.............
2260  ....................##.............
```

**Le fût est CONTINU de la ligne 2245 à la ligne 2260 et traverse la barre.
Aucun trou, nulle part. C'est un « + » sans le moindre défaut.**

**Conclusion.** L'énoncé officiel n'a **aucune anomalie** ici : la source est
propre. Le « ÷ » apparent est **un artefact du sous-échantillonnage 300 → 150
dpi effectué par AlloSchool pour produire les JPG servis** — pas un défaut du
sujet, pas une substitution de police, et pas « un pixel de croisement
perdu ». **Lecture retenue, définitivement : $u_{n+1} = f_0(u_n)$.**
*(Corroboration logique : $u_{n\div1}$ n'a pas de sens, et II-2a majore
$|u_{n+1}-\alpha|$ — le même terme, écrit avec un « + » parfait.)*

#### Point 2 — « $\frac{2e}{1+e} < 1.47$ » · **point décimal CONFIRMÉ, valeur CONFIRMÉE**

Lu à **×14** sur le composite 150 dpi et à **×7** sur la couche 300 dpi : le
séparateur est un point posé sur la ligne de base. Mesure au pixel, sur la
couche 300 dpi — le glyphe séparateur occupe les lignes 755→761 et les
colonnes 1022→1028, soit **7 px de haut, 7 px de large**, et son **bas coïncide
exactement avec la ligne de base** des chiffres « 1 », « 4 », « 7 » (ligne
761). **Rien en dessous de 761.** Une virgule, à ce corps, descendrait de 5 à
7 px sous la ligne de base : il n'y a pas de descendante. → **point décimal,
pas virgule.**

Les chiffres : **`1` `.` `4` `7`**, sans ambiguïté à ×14. Ni `1,47`, ni `1.42`.

**La valeur est juste, et le sens de l'inégalité aussi** :
$\frac{2e}{1+e} = \frac{5{,}436563\ldots}{3{,}718281\ldots} = 1{,}462117\ldots < 1{,}47$ ✔
*(Contrôle par conséquence : `1.42` serait FAUX — $1{,}4621 > 1{,}42$ — donc la
lecture `1.47` est corroborée par la mathématique elle-même.)*
Et l'indication sert exactement à III-1b : $f_n(1) = n - \frac{2e}{1+e} > 0$
dès que $n \ge 2$.

**Transcrit tel quel : correct. À NE PAS franciser à la conversion.**

#### Point 3 — les indices $(C_0)$ et $(C_2)$ de I-4 · **CONFIRMÉS, et un recoupement non visuel EXISTE**

Le transcripteur écrit qu'« aucun recoupement non visuel n'existe sur ce
point » parce que l'OCR pleine page rend les deux comme « (C,) ». **Il en
existe un**, et je l'ai fait : en isolant **chaque indice seul**, en
l'agrandissant ×16 et en le bordant de blanc (ce qui débloque tesseract sur
les glyphes minuscules), avec `tessedit_char_whitelist=0123456789` :

| Indice isolé | boîte (page 2) | psm 10 | psm 8 | psm 7 | psm 13 |
|---|---|---|---|---|---|
| premier | (934, 1044)–(952, 1063) | **`0`** | **`0`** | **`0`** | **`0`** |
| second | (1012, 1045)–(1029, 1064) | **`2`** | **`2`** | **`2`** | **`2`** |

Plus la lecture visuelle à ×10 (le `0` est un ovale fermé, le `2` un deux
franc) et à 300 dpi. **$(C_0)$ et $(C_2)$ — quatre modes OCR concordants et
deux lectures d'image.** Corroboration par le sens : c'est le couple
$n=0$ / $n\ge1$ de la distinction de cas de I-2c que le tracé illustre.

#### Point 4 — les relations d'ordre de la Partie III · **CONFIRMÉES, le mélange est RÉEL**

Le sujet mélange bien strict et non-strict dans la même partie. Chaque signe
a été relu **isolément**, et les deux familles ont été départagées **au
niveau du pixel** sur la couche 300 dpi :

| Question | Signe transcrit | Lecture image | Preuve pixel |
|---|---|---|---|
| III-1b | $0 < x_n < 1$ | **`<` strict ×2** | chevron seul |
| III-2a | $f_{n+1}(x_n) > 0$ | **`>` strict** | chevron seul |
| III-3a | $\frac1n < x_n < \frac1n(\frac{2e}{1+e})$ | **`<` strict ×2** | chevron lignes 1181→1207, **lignes 1208+ vides — aucune sous-barre** |
| III-4a | $x_n \le x_2$ | **`≤` non strict** | chevron lignes 1398→1424 **+ barre horizontale pleine lignes 1427→1430** |
| partout | $n \ge 2$ | **`≥`** | chevron + sous-barre |

La différence est **structurelle et mesurable**, pas une impression : le `≤`
de III-4a porte une barre de 28 px sous son chevron, le `<` de III-3a n'a
strictement rien sous le sien.

**Et la mathématique impose exactement ce mélange** — c'est la corroboration
la plus forte : la suite $(x_n)_{n\ge2}$ est **strictement** décroissante
(III-2b), donc pour $n \ge 2$ on a $x_n \le x_2$ **avec égalité en $n=2$**,
qui est dans le domaine. Un `<` serait **faux**. Le `≤` de III-4a est
obligatoire, et il est indispensable à III-4b
($0 < (x_n)^n \le (x_2)^n \to 0$).

*Contrôlé aussi hors Partie III : le `≤` de I-2b et celui de II-1b sont bien
des `≤` (chevron + barre), et I-2b **exige** le `≤` — l'égalité a lieu en
$x=0$, donc un `<` y serait faux.*

#### Point 5 — les deux exposants $n$ · **CONFIRMÉS tous les deux**

Relus sur la couche **300 dpi**, où ils sont parfaitement nets :

- **II-2b** : $|u_n - \alpha| \le \left(\frac{1}{2}\right)^{\!n}|\alpha|$ —
  l'exposant est un **`n` italique**, et le facteur $|\alpha|$ est bien là.
  Ni `n+1`, ni `2`.
- **III-4b** : $\lim\limits_{n\to+\infty}(x_n)^{\!n}$ — exposant **`n`
  italique**, indice de limite `n→+∞` présent (lu sur le composite 150 dpi,
  ×6, la sous-ligne étant dans l'autre couche MRC).

**Corroboration par re-dérivation** : $u_0 = 0$ donne $|u_0-\alpha|=|\alpha|$,
donc la majoration $\left(\frac12\right)^n|\alpha|$ est exactement le terme
initial propagé — pas une constante parachutée. Et l'avertissement du
transcripteur tient : **SM 2025 N porte $\left(\frac12\right)^{n+1}$ SANS
facteur initial ; ici c'est $\left(\frac12\right)^{n}$ AVEC $|\alpha|$. Les
deux sujets diffèrent réellement — ne pas normaliser l'un sur l'autre.**

#### Point 6 — le signe « $-$ » du numérateur · **CONFIRMÉ aux deux endroits**

Lu à **×6** sur le composite et sur la couche 300 dpi :

- définition : $f_n(x) = \dfrac{-2e^x}{1+e^x} + nx$ — le `−` unaire est franc,
  le `+ nx` est un « + » au croisement intact ;
- dérivée (I-2a) : $f_n'(x) = \dfrac{-2e^x}{(1+e^x)^2} + n$ — même `−`, même
  `+`.

**Corroboration par re-dérivation :**
$\left(\frac{-2e^x}{1+e^x}\right)' = \frac{-2e^x(1+e^x)+2e^x\cdot e^x}{(1+e^x)^2} = \frac{-2e^x}{(1+e^x)^2}$ ✔ —
le scan et le calcul coïncident au signe près de chaque terme. Et sans le
signe, $f_0$ serait croissante et la distinction de cas de I-2c n'aurait pas
lieu d'être : **le sujet ne se tiendrait pas.**

#### Point 7 — le « 4 » de I-2b face au « 2 » de I-2a · **CONFIRMÉ**

Lu à **×8** : $\dfrac{4e^x}{(1+e^x)^2} \le 1$ — c'est un **4**, à barre
oblique et fût vertical, nettement distinct du **2** de $-2e^x$ deux lignes
plus haut. Confirmé aussi sur la couche 300 dpi.

**Corroboration par re-dérivation :**
$(1+e^x)^2 - 4e^x = 1 - 2e^x + e^{2x} = (1-e^x)^2 \ge 0$ — **l'identité ne
marche qu'avec 4**. Avec un 2, l'inégalité $\frac{2e^x}{(1+e^x)^2}\le 1$ serait
vraie mais triviale et le pontage I-2b → II-1b
($|f_0'| = \frac12\cdot\frac{4e^x}{(1+e^x)^2} \le \frac12$) s'effondrerait.
**Le « 4 » est confirmé par sa conséquence autant que par sa forme.**

#### Point 8 — le recompte du barème · **CONFIRMÉ : 24 × 0,5 = 12,0** — et une métrologie qui tranche

La colonne de marge a été **isolée entre ses deux filets verticaux**
(mesurés : filets à $x \approx 46$–$48$ et $x \approx 142$–$145$ ; colonne
utile $x \in [60,138]$), puis segmentée automatiquement par profil d'encre —
**sans le corps du texte**, donc sans contamination possible par la ligne
voisine.

| Page | Marques détectées | Dont exercice 1 | Reste |
|---|---|---|---|
| 2 | **13** | **13** (Partie I ×10 + II-1a, II-1b, II-2a) | — |
| 3 | **13** | **11** (II-2b, II-2c + Partie III ×9) | 2 → exercice 2 |

**Total exercice 1 : 24 marques.** La frontière est certaine : « EXERCICE2 :
(4 points) » est imprimé juste après III-4b, lu sur l'image.

**Et voici la mesure qui ferme le point — une métrologie, pas une lecture.**
Chaque marque a été mesurée en largeur d'encre. **Calibration prise sur le
scan lui-même**, page 4, où l'exercice 3 porte de vrais `0.25` et `0.75` :

| Valeur | Où | Largeur d'encre mesurée |
|---|---|---|
| `0.25` | p. 4, ex. 3 Partie I q1 | **44 px** |
| `0.75` | p. 4, ex. 3 Partie I q2 | **44 px** |
| `0.5` | p. 4, huit occurrences | **30–32 px** |
| `1` | p. 4, ex. 2 q2-a | **7 px** |
| **les 24 marques de l'exercice 1** | p. 2 et p. 3 | **30 à 32 px — toutes** |

Une valeur à quatre glyphes mesure 44 px sur ce scan ; **aucune des 24
marques ne dépasse 32**. Il est donc **matériellement impossible** qu'une
`0,25` ou une `0,75` se cache dans l'exercice 1. L'OCR marque par marque
(deux modes) rend `0.5`, `.5` ou `05` sur les 26 marques des pages 2-3, et
jamais autre chose.

$$\text{I} = 0{,}5\times10 = 5{,}0 \quad\cdot\quad \text{II} = 0{,}5\times5 = 2{,}5 \quad\cdot\quad \text{III} = 0{,}5\times9 = 4{,}5 \quad\Rightarrow\quad \mathbf{12{,}0}$$

**Le recompte indépendant retombe exactement sur le barème imprimé.** La
répartition par partie annoncée par la transcription est juste elle aussi.

*Confirmé au passage : les lignes non cotées ne sont pas des questions —
« 5- Pour tout réel $t>0$… » (seuls a) et b) portent 0,5), « (On distinguera
les deux cas…) », les deux « (On prendra …) », les intitulés de Partie et les
deux lignes d'introduction de suite. Le transcripteur n'en cite que deux ;
elles sont en réalité **six**, mais son propos visait les seules lignes
susceptibles d'être **prises pour une question numérotée**, et sur ce
périmètre restreint son compte est bon.*

#### Point 9 — la composition de la page 1 · **CONFIRMÉE : 3 exercices, 12 + 4 + 4**

Page 1 relue à ×2 et ×10, **et** recoupée par l'OCR pleine page :

> - La durée de l'épreuve est de 4 heures.
> - L'épreuve comporte **3** exercices indépendants.
> - Les exercices peuvent être traités selon l'ordre choisi par le candidat.
>
> - L'exercice1 se rapporte à l'analyse ……………….…**(12 pts)**
> - L'exercice2 se rapporte aux nombres complexes……….**(4 pts)**
> - L'exercice3 se rapporte à l'arithmétique …………........**(4 pts)**

$12+4+4=\mathbf{20}$ ✔ · Le « (12 pts) » a été recadré seul et relu à **×10**
(sans ambiguïté), **et** l'OCR pleine page le rend indépendamment `(12 pts)`.
Trois lignes de barème, pas quatre. Cartouche : 4 h, **coef 9**, `NS 24F`,
Sciences Mathématiques (A) et (B) option française. Bas de page : « L'usage
de la calculatrice n'est pas autorisé / L'usage de la couleur rouge n'est pas
autorisé ». Titre du corps p. 2 : **« EXERCICE1 : (12 points) »** — concordant.

**Le « (?) » du CENSUS tombe, et le CENSUS n'a pas à être corrigé** : ses
trois annonces (3 exercices, 12 pts, pas de structures algébriques) sont
toutes confirmées.

#### Point 10 — les quatre contrôles de provenance refaits de zéro · **FAITS, tous les quatre**

Détail au § « Les quatre contrôles anti-CDN » ci-dessus. Re-téléchargement
complet, empreintes recalculées sur mes propres fichiers, et **deux
instruments supplémentaires** (matrice PDF↔JPG, couche 300 dpi) qui n'étaient
pas dans la transcription. **L'incident de cache CDN de SM 2025 N ne se
reproduit pas ici** — et cette fois la démonstration ne repose pas seulement
sur la stabilité de deux téléchargements, mais sur une **concordance
inter-actifs** (le PDF et les JPG, servis par deux chemins, portent les mêmes
quatre pages).

### Écarts trouvés — je ne les lisse pas

1. **⚠️ FIDÉLITÉ TYPOGRAPHIQUE — les marques de marge sont imprimées `0.5`
   (POINT), la transcription écrit `0,5` (VIRGULE), 24 fois.**
   Mesuré, pas estimé : sur la couche 300 dpi, le séparateur d'une marque
   occupe les lignes 508→514 pour une base à 514 — **7 px de haut, 6 de
   large, aucune descendante**. C'est un point, la même forme que celui de
   `1.47`. L'OCR marque par marque rend `0.5`, jamais `0,5`.
   **Ce qui rend l'écart notable, c'est l'incohérence de traitement** : le
   transcripteur consacre un paragraphe entier à préserver le point de
   « 1.47 » (« Transcrit tel quel », « à ne pas corriger ») — puis francise
   silencieusement les 24 marques de la marge, qui portent le même glyphe.
   **Impact réel : nul pour la conversion** (les marques deviennent des
   valeurs numériques de points, pas des chaînes). Signalé pour l'exactitude
   du dossier, pas comme un blocage.

2. **⚠️ DIAGNOSTIC INEXACT — le mécanisme du « + » cassé (point 1).**
   Conclusion juste (« + »), mécanisme faux : le pixel de croisement n'est
   pas perdu, il est intact ; ce sont les deux pixels adjacents à la barre
   qui manquent, et la cause est le **sous-échantillonnage 300 → 150 dpi**
   d'AlloSchool, **pas la numérisation du sujet**. La source PDF est
   **impeccable** à cet endroit. Corrigé et prouvé ci-dessus.

3. **⚠️ PORTÉE SOUS-ÉVALUÉE — l'artefact d'OCR « 2024 ».**
   Annoncé sur les pages 2 et 3 ; il frappe en réalité les pages **1, 2 et 3**
   (page 4 exceptée). Corrigé ci-dessus, avec le remède inchangé.

4. **RAISONNEMENT À CORRIGER — l'usage du précédent SM 2025 dans l'arbitrage
   de slug.** Voir la section de classement ci-dessous : le précédent, relu
   dans `content/maths/fonction-exponentielle/bank.yaml`, ne dit pas ce que
   la transcription lui fait dire.

**Rien d'autre.** L'énoncé lui-même — les 24 questions, chaque signe, chaque
exposant, chaque indice — est transcrit **fidèlement**, ligne pour ligne.
Contrôlés en plus et conformes : le `;` séparateur de I-2b et II-1b (c'est un
point-virgule, point + virgule superposés, lu à ×12 — pas une virgule), le
« $y = nx - 2$ » de I-5 (l'OCR pleine page le rend « ny », c'est un artefact :
l'image et la couche 300 dpi portent bien **`nx`**), et l'absence totale de
figure imprimée.

### Défauts du SUJET OFFICIEL

**AUCUN.** Contrairement à SM 2024 N (numéros 4 et 5 croisés entre la page 1
et le corps) et à SM 2017 N (un `;` litigieux authentifié au niveau de
l'octet), ce sujet ne présente **aucune incohérence propre** :

- page 1, titre de corps et colonne de marge **concordent** sur les 12 points ;
- la numérotation des questions est continue et sans doublon ;
- les symboles sont typographiquement corrects **dans la source** (le seul
  glyphe litigieux est un artefact du rendu 150 dpi d'AlloSchool, pas du
  sujet) ;
- **aucune substitution de police, aucun mojibake** — vérifié sur $\mathbb{R}$,
  $\mathbb{N}$, $\mathbb{C}$, $\le$, $\ge$, $<$, $>$, $\ne$, $\alpha$,
  $\Delta$, $\infty$, $\vec{\ }$, $\|\cdot\|$ ;
- et la chaîne logique est complète : I-2b alimente I-2c **et** II-1b ;
  III-1b alimente III-2a ; III-2b alimente III-4a ; III-4a alimente III-4b ;
  III-3a alimente III-3b. **Rien ne manque au candidat.**

### Re-dérivation mathématique — les 24 questions refaites

Faite **indépendamment**, sur l'énoncé lu à l'image, sans regarder les
contrôles du transcripteur. **Tout retombe.**

| Question | Résultat re-dérivé | Verdict |
|---|---|---|
| I-1a | $f_n(x)-nx+2 = \frac{2}{1+e^x} \to 0$ → asymptote $y=nx-2$ en $+\infty$ | ✔ et c'est la droite reprise en I-5 |
| I-1b | $f_n(x)-nx = \frac{-2e^x}{1+e^x}\to 0$ → $(\Delta_n): y=nx$ | ✔ |
| I-2a | $f_n'(x)=\frac{-2e^x}{(1+e^x)^2}+n$ | ✔ signe à signe |
| I-2b | $(1+e^x)^2-4e^x=(1-e^x)^2\ge0$, **égalité en $x=0$** | ✔ **impose le $\le$** |
| I-2c | $n=0$ : $f_0'<0$ partout · $n\ge1$ : $f_n'\ge\frac12>0$ | ✔ la distinction de cas est exactement celle-là |
| I-3a | $f_n(0)=-1$, $f_n'(0)=n-\frac12$ → $y=(n-\frac12)x-1$ | ✔ |
| I-3b | $f_n''(x)=\frac{2e^x(e^x-1)}{(1+e^x)^3}$ s'annule **en changeant de signe** au seul $x=0$ | ✔ $I$ unique, et pour **tout** $n$ |
| I-4 | $(C_0)$ décroissante, $(C_2)$ croissante | ✔ illustre I-2c |
| I-5a | $A(t)=\int_0^t\frac{2}{1+e^x}dx = 2\ln2-2\ln(1+e^{-t})$ (cm²) | ✔ écart $f_n-(nx-2)=\frac{2}{1+e^x}>0$, aire bien définie |
| I-5b | $\lim_{t\to+\infty}A(t)=2\ln 2$ | ✔ **finie**, la question a un sens |
| II-1a | $g=f_0-\mathrm{id}$ strictement décroissante, $+\infty\to-\infty$ → $\alpha$ unique | ✔ |
| II-1b | $|f_0'|=\frac12\cdot\frac{4e^x}{(1+e^x)^2}\le\frac12$ | ✔ **c'est I-2b divisé par 2** |
| II-2a | inégalité des accroissements finis | ✔ |
| II-2b | récurrence, $|u_0-\alpha|=|\alpha|$ car $u_0=0$ | ✔ le facteur initial est justifié |
| II-2c | $(\frac12)^n\to0$ | ✔ |
| III-1a | $f_n$ ($n\ge2$) strictement croissante, $-\infty\to+\infty$ → $x_n$ unique | ✔ |
| III-1b | $f_n(0)=-1<0$ · $f_n(1)=n-\frac{2e}{1+e}>0$ car $\frac{2e}{1+e}<1{,}47\le2\le n$ | ✔ **c'est l'emploi exact de l'indication** |
| III-2a | $f_{n+1}(x)=f_n(x)+x$ donc $f_{n+1}(x_n)=x_n>0$ | ✔ |
| III-2b | $f_{n+1}$ croissante et $f_{n+1}(x_{n+1})=0<f_{n+1}(x_n)$ | ✔ décroissance **stricte** |
| III-2c | décroissante et minorée par 0 | ✔ |
| III-3a | $nx_n=\frac{2e^{x_n}}{1+e^{x_n}}\in\left]1,\frac{2e}{1+e}\right[$ sur $]0,1[$ | ✔ **les deux `<` stricts sont obligatoires** |
| III-3b | $x_n\to0$ par encadrement, puis $nx_n=\frac{2e^{x_n}}{1+e^{x_n}}\to\frac22=1$ | ✔ |
| III-4a | stricte décroissance depuis $n=2$, **égalité en $n=2$** | ✔ **impose le $\le$, un `<` serait FAUX** |
| III-4b | $0<(x_n)^n\le(x_2)^n\to0$ car $x_2<1$ | ✔ et **III-4a en est la clé** |

**Aucune identité fausse, aucun énoncé insoluble, aucune question orpheline.**

### Verdict de la passe

| | |
|---|---|
| **Provenance** | ✅ les quatre contrôles anti-CDN **faits**, + 2 instruments inédits |
| **Fidélité de l'énoncé** | ✅ **zéro divergence** sur les 24 questions |
| **Barème** | ✅ 24 × 0,5 = **12,0**, recompté par métrologie calibrée |
| **En-tête / composition** | ✅ 3 exercices, 12 + 4 + 4 = 20, `NS 24F`, 4 pages |
| **Mathématique** | ✅ 24 questions re-dérivées, tout retombe |
| **Défauts du sujet officiel** | ✅ **aucun** |
| **Écarts relevés** | 3 mineurs (1 typographique, 2 de diagnostic), **aucun bloquant** |
| **Points laissés illisibles** | **aucun** |
| **CLEARÉ POUR CONVERSION** | ✅ **OUI**, sous les deux réserves de classement ci-dessous |

### Deux réserves à porter à la conversion — ce ne sont pas des lectures

1. **`0.5` et non `0,5`** dans la marge du scan : si la conversion recopie
   littéralement les annotations de barème, préserver le point comme pour
   « 1.47 ». Si elle les transforme en valeurs numériques (cas attendu),
   l'écart est sans effet.
2. **L'identifiant `bk-2021-n-x1` est DÉJÀ PRIS** dans
   `content/maths/limites-continuite/bank.yaml` — par un exercice de filière
   **SExp** (2021 N, Exercice 1, 2 pts). C'est la leçon **K-7** du dépôt
   (« un `entry_id` de banque n'identifie rien tout seul ») en situation. La
   nouvelle entrée SM devra donc **impérativement** porter
   `filiere: "SM"`, et ne pas être logée dans `limites-continuite` sans
   traiter la collision. *(Dans `suites-numeriques` et
   `fonction-exponentielle`, `bk-2021-n-x1` est libre — vérifié entrée par
   entrée sur les 14 banques : les seules entrées `bk-2021-n-*` existantes
   sont `x1` SExp/limites-continuite, `x2` SM/nombres-complexes-2, `x2`
   SExp/suites-numeriques, `x3` SM/arithmetique, `x3` SExp/nombres-complexes-1,
   `x4` SExp/fonction-logarithme.)*

*Vérifié aussi, contre le dépôt* : les 14 dossiers de `content/maths/`
existent bien et les cinq slugs cités sont tous réels ; `bk-2021-n-x2`
(`nombres-complexes-2`) et `bk-2021-n-x3` (`arithmetique`) portent tous deux
`filiere: "SM"`, `bareme_total: 4`, `NS 24F` — **la mise en garde du fichier
contre une reconversion de ces deux exercices est fondée**.

---

## ⚖️ Le classement — ce que la vérification tranche, et ce qu'elle laisse à l'owner

**Je tranche une des deux questions, et je dis pourquoi je laisse l'autre.**

### Ce que je tranche : SI une seule carte, alors `suites-numeriques` — pas `fonction-exponentielle`

Le transcripteur proposait `suites-numeriques` tout en refusant d'assumer le
choix, son principal argument contraire étant le précédent SM 2025 N. **Ce
précédent, je suis allé le lire dans la banque, et il ne dit pas ce qu'on lui
fait dire.**

`content/maths/fonction-exponentielle/bank.yaml`, NOTE ÉDITORIALE
`bk-2025-n-x1`, écrit textuellement :

> « `fonction-exponentielle` est le plus gros bloc unique (3,5/10) **ET**
> l'identité de l'exercice »

C'est une conjonction, pas une hiérarchie. À SM 2025, l'exponentielle était
**simultanément** la mesure la plus haute (3,5 contre 2,5 pour les suites) et
l'identité de l'objet. **Le précédent n'a jamais fait gagner l'identité
CONTRE une mesure plus grande** — la situation ne s'y est pas présentée.
Ici elle se présente, et la règle telle qu'elle est écrite (« le plus gros
bloc unique ») désigne les suites. **Retenir `fonction-exponentielle` ici ne
serait pas cohérent avec SM 2025 : ce serait l'inverser.**

**Et la mesure n'est pas serrée** — je la refais, en versant chaque question à
l'objet qu'elle étudie plutôt qu'à l'outil qu'elle emploie :

| Bloc | Questions | Points |
|---|---|---|
| **Suites** — récurrente $u_{n+1}=f_0(u_n)$ (Partie II entière) | II-1a→II-2c | **2,5** |
| **Suites** — implicite $x_n$ solution de $f_n(x)=0$ (Partie III entière) | III-1a→III-4b | **4,5** |
| Fonction exponentielle — étude de $f_n$ (limites, asymptotes, dérivée, variations, tangente, inflexion, tracé) | I-1a→I-4 | **4,0** |
| Calcul intégral — aire entre la courbe et son asymptote | I-5a, I-5b | **1,0** |

$$2{,}5+4{,}5+4{,}0+1{,}0 = \mathbf{12{,}0}\ ✔ \qquad\Rightarrow\qquad \texttt{suites-numeriques} = \mathbf{7{,}0/12}$$

**Là où je m'écarte du transcripteur :** il détache 2,0 points de la Partie III
(III-1a, III-1b, III-2a, III-3a) vers « TVI et encadrements », ce qui ramène
les suites à 5,0 et rend l'arbitrage serré. **Cette découpe atomise un objet
unique.** La Partie III est le type canonique de la **suite implicite** : ses
questions d'existence (III-1a) et de localisation (III-1b) ne sont pas des
questions de continuité autonomes, ce sont **l'acte de définition de $x_n$** —
sans elles la suite n'existe pas. Découper au tour de main employé plutôt
qu'à l'objet étudié reviendrait, symétriquement, à verser I-2a à
`derivabilite-etude-fonctions` et I-1a à `limites-continuite`, ce qui viderait
aussi le bloc exponentielle. **Le TVI reste honoré en cross-list, pas en
mesure.**

À 7,0 contre 4,0 — **58 % du barème, et les deux Parties sur trois qui portent
la difficulté** — il n'y a plus d'arbitrage à rendre : `suites-numeriques`
gagne sur la mesure **et** sur la règle du précédent. Cross-lists inchangées et
justes : `fonction-exponentielle` (Partie I) · `limites-continuite` (TVI et
encadrements) · `calcul-integral` (I-5) · `derivabilite-etude-fonctions`
(I-2, I-3).

### Ce que je NE tranche pas : une carte ou deux — **arbitrage owner, et je le recommande**

Ce n'est pas une question de lecture, c'est une décision de produit, et elle
mérite d'être posée nettement parce que **le fait objectif est nouveau** :

> **À 12 points, cet exercice serait la plus grosse carte du corpus SM — de
> 20 % au-dessus du maximum actuel.** Vérifié entrée par entrée sur les 14
> banques : **aucune carte SM ne dépasse 10 points**. Les quatre plus grosses
> sont `bk-2025-n-x1` (10), `bk-2023-r-x1` (10), `bk-2019-n-x4` (10),
> `bk-2017-n-x4` (10). Une carte de **12 points et 24 questions** serait sans
> précédent dans le dépôt.

Le précédent de partition est réel et je l'ai vérifié : `bk-2022-n-x4` (SExp)
est effectivement scindé en **deux** cartes — `calcul-integral`
(`bareme_total: 1,5`, label « Exercice 4 — partie “calcul intégral” ») et
`equations-differentielles` (`bareme_total: 1`, label « Exercice 4 —
Équations différentielles ») — soit 2,5 réparti, **jamais dupliqué**, avec un
`exercise_label` distinct par carte. Le mécanisme existe, il est éprouvé, et
`lib/examens.ts` somme correctement.

**La découpe naturelle est nette et sans reste :**

| Carte | Contenu | Barème | Slug |
|---|---|---|---|
| A | **Partie I** — étude de $f_n$ + aire | **5,0** | `fonction-exponentielle` |
| B | **Parties II + III** — les deux suites | **7,0** | `suites-numeriques` |

$5{,}0 + 7{,}0 = 12{,}0$ ✔ — et la coupure tombe sur une frontière imprimée
du sujet (« Partie II : »), pas sur un découpage inventé.

**Ma recommandation, sans la prendre à la place de l'owner :** partitionner.
Une carte de 12 points fait travailler l'élève une heure sans point de sortie,
et les deux moitiés sont pédagogiquement disjointes (une étude de fonction
exponentielle d'un côté, deux suites de l'autre). **Si l'owner préfère une
carte unique, alors c'est `suites-numeriques` — tranché ci-dessus, sans
réserve.**

