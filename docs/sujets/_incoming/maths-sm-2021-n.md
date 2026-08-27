# Examen national Mathématiques — SM — 2021, session NORMALE (NS 24F) — exercice 1

> **Fichier d'entrée (`_incoming`) — NON VÉRIFIÉ.
> NON CLEARÉ POUR CONVERSION.** Protocole `docs/sujets/_incoming/README.md`
> et `docs/sujets/maths/README.md`.
>
> **Ceci est une TRANSCRIPTION, pas une vérification.** Elle a été faite le
> **2026-08-27** par un transcripteur qui a exécuté les **quatre contrôles de
> provenance** exigés depuis l'incident de cache CDN (§ « Provenance et les
> quatre contrôles » ci-dessous), puis relu le scan au zoom. Il ne s'est pas
> auto-validé et n'a pas le droit de le faire : la **passe de vérification est
> INDÉPENDANTE**, elle re-télécharge le scan elle-même, ne relit jamais le
> texte transcrit à la place de l'image, et n'a pas encore eu lieu.
>
> Tant qu'elle n'a pas laissé sa trace, **aucun bloc de ce fichier ne peut
> devenir une entrée de `content/maths/*/bank.yaml`**.
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

**Un point de typographie, à ne pas « corriger » :** la valeur approchée de la
Partie III q1-b est imprimée **avec un point décimal** — « $< 1.47$ » — et non
avec la virgule française. Vérifié au zoom ×11 : le séparateur est un point
carré posé sur la ligne de base. Le reste du sujet n'a aucun autre nombre
décimal. **Transcrit tel quel.**

---

## 2021 — session normale — Exercice 1
Source: https://www.alloschool.com/element/127193
Statut: **NON VÉRIFIÉ** — transcrit le 2026-08-27 (transcripteur ; quatre contrôles de provenance passés, vérification indépendante non faite)

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
