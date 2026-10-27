# Le gisement arabophone — prospection de `course-311`

> **Ce que ce document EST.** Une **prospection de sources**, faite le
> 2026-09-03. Elle établit ce que le cours arabophone AlloSchool
> `course-311` publie réellement, ce que ce gisement recoupe de notre
> corpus SPC, et ce qu'il dit — ou ne dit pas — des trois valeurs
> publiées en litige (HANDOFF § 6.5) et de la fiche **K-8**.
>
> **Ce qu'il N'EST PAS.** Une transcription. Rien n'a été transcrit
> intégralement, rien n'a été converti, aucun `bank.yaml`, aucun
> `CENSUS.md`, aucun `exercises.yaml` n'a été touché.
>
> **La règle qui gouverne tout ce qui suit** (K-8) : *un corrigé est un
> **TÉMOIN DE VALEURS**, jamais un arbitre.* Ce document rapporte ce que
> les témoins disent, leur qualité, et leur **degré d'indépendance**
> vis-à-vis de la source déjà utilisée. Deux témoins qui descendent du
> même document ne font qu'un témoin — et ce document nomme les cas où
> c'est exactement ce qui se passe.

---

## 0. Les contrôles appliqués, et ce qu'ils ont donné

Le protocole anti-CDN du sas (`docs/sujets/_incoming/README.md`) exige
quatre contrôles sur tout document dont on tire une affirmation. Voici
ce qu'ils donnent sur cette passe.

| # | Contrôle | Ce qui a été fait | Résultat |
|---|---|---|---|
| 1 | **Année / code lus sur la page même** | Cartouche relu dans la **couche de texte** de chaque sujet cité | `NS28` (2010 N), `NS 28` (2017 N, 4 pages), `NS28` (2019 N), `RS28` (2012 R, 2013 R). 2008 R porte « الدورة الاستدراكية 2008 » sur sa couverture. **2009 R : couche de texte VIDE** — voir la réserve § 4 |
| 2 | **Recoupement par un instrument NON visuel** | Toutes les valeurs citées ici viennent de l'**extraction de la couche de texte** ou de la **géométrie vectorielle** du PDF. Aucune affirmation de ce document ne repose sur une lecture d'image | tenu sur 100 % des affirmations |
| 3 | **MD5 + second téléchargement** | Les **14 PDF dont ce document tire une valeur** (§ 3 et § 4) téléchargés deux fois, séparément | **14/14 MD5 identiques.** Bonus : le corrigé français `element/57714` re-téléchargé aujourd'hui rend `7b49e6d421adf8b8be254212478cce2b`, **exactement le MD5 consigné par la passe du 2026-08-28** — le CDN est stable sur ce chemin à un an d'intervalle |
| 4 | **`<title>` servi** | Comparé au libellé du hub pour **les 68 éléments** de la section | **68/68 concordants, zéro écart.** Et chaque page `element/` ne cite qu'**un seul** cours (`course-311`) : pas de cross-listing |

**Le périmètre du contrôle 3, dit exactement.** Le double téléchargement
couvre les 14 documents dont ce rapport **tire une valeur ou une
citation**. Les autres fichiers ouverts pendant la passe — les 34
corrigés arabes et 16 corrigés français du § 2.2, les 34 paires de
sujets du profil de dégradation § 5.2 — n'ont été téléchargés **qu'une
fois**. Ce qu'on en tire n'est jamais une valeur physique : ce sont des
**métadonnées** (auteur, producteur, date, pagination) et des
**comptages structurels** (primitives vectorielles, pixels, longueur de
la couche de texte). Un panachage de cache y produirait du bruit
visible, pas une valeur fausse — mais la réserve est nommée plutôt que
tue.

**Une seconde réserve, d'emblée.** Le contrôle 1 est fait sur la couche de
texte, qui a ses propres artefacts en écriture arabe : sur PC 2013 R
l'extracteur rend l'année **« 3102 »** et le total de physique **« 33 »**
— chiffres inversés par le sens RTL, exactement le piège d'OCR déjà
consigné pour SM 2021 (`docs/sujets/maths/CENSUS.md`). **Ce sont des
artefacts d'extraction, pas des défauts du document.** Ils sont
signalés ici pour qu'aucune passe future ne les prenne pour des
discordances d'année.

---

## 1. Ce que `course-311` est

**`course-311` est un cours propre, pas un miroir.** Trois preuves
mécaniques, toutes issues du HTML servi :

1. **Il a son propre espace d'assets.** Les 68 PDF et tous les JPG de sa
   section d'examens vivent sous `assets/documents/course-311/…`, avec
   des noms translittérés propres au cours
   (`alfiziaa-oalkimiaa-alom-fiziaiia-<année>-<session>-<موضوع|تصحيح>-N.pdf`).
   Aucun n'est emprunté à `course-421/422/423`.
2. **Aucun de ses 68 éléments n'est cross-listé.** Chaque page
   `element/` ne référence qu'un cours. C'est l'inverse du piège des
   exemplaires jumeaux côté francophone, où le même sujet SPC est servi
   sous trois cours (`421` SM-A, `422` SM-B, `423` Sc. Physiques) avec
   des PDF byte-identiques.
3. **Ce n'est pas un dépôt d'annales, c'est un cours complet.** 40
   sections, 1 111 éléments : programme pédagogique, fiches, **26
   chapitres de leçons** (ondes, nucléaire, RC/RL/RLC, cinétique,
   acide-base, Newton, oscillateurs, piles, électrolyse, estérification…),
   **quatre sections de devoirs** (فروض, 1er et 2nd semestre, SM et SP
   séparés), une section d'exercices non corrigés, **et deux sections
   d'examens nationaux**.

- **Titre servi** : `الفيزياء والكيمياء: الثانية باك علوم فيزيائية`
  (« Physique-Chimie : 2ème Bac Sciences Physiques »).
- **URL** : `https://www.alloschool.com/course/alfiziaa-oalkimiaa-althania-bak-alom-fiziaiia`

### 1.1 Les deux sections d'examens

| Section | Titre | Filière | Éléments | Couverture |
|---|---|---|---:|---|
| **3332** | `الموحدات مع التصحيح (العلوم الفيزيائية)` | **Sciences Physiques (SPC) — notre série** | **68** | 2008→2024, N+R, **sujet ET corrigé pour chacune** |
| 3331 | `الموحدات مع التصحيح (العلوم الرياضية)` | PC pour Sciences Maths — *hors périmètre du CENSUS SPC* | 67 | 2008→2024, N+R ; il manque le seul corrigé de 2023 R |

Le nom des sections le dit littéralement : **« الموحدات مع التصحيح »** =
« les épreuves nationales **avec le corrigé** ».

### 1.2 L'inventaire de la section 3332 — 34 paires, sans trou

68 éléments = **34 sujets + 34 corrigés**, une paire par session, sans
aucune lacune de 2008 à 2024. `الموضوع` = le sujet ; `التصحيح` = le
corrigé.

| Année | N — sujet | N — corrigé | R — sujet | R — corrigé |
|---:|---|---|---|---|
| 2008 | `39355` | `39356` | `39357` | `39358` |
| 2009 | `39360` | `39361` | `39362` | `39363` |
| 2010 | `39365` | **`39366`** | **`39367`** | **`39368`** |
| 2011 | `39370` | `39371` | `39372` | `39373` |
| 2012 | `39375` | `39376` | `39377` | `39378` |
| 2013 | `39380` | `39381` | `39382` | `39383` |
| 2014 | `39385` | `39386` | `39387` | `39388` |
| 2015 | `39390` | `39391` | `39392` | `39393` |
| 2016 | `39395` | `39396` | `39397` | `39398` |
| 2017 | `39400` | `39401` | `39402` | `39403` |
| 2018 | `45512` | `45509` | `45518` | `45515` |
| 2019 | `68292` | `68295` | `94402` | `94405` |
| 2020 | `109734` | `109737` | `109746` | `109752` |
| 2021 | `142352` | `142355` | `142358` | `142361` |
| 2022 | `142803` | `142806` | `142370` | `142373` |
| 2023 | `142388` | `142393` | `142812` | `142815` |
| 2024 | `147672` | `147675` | `147678` | `147681` |
| **2025** | — | — | — | — |

*(En gras : les trois éléments déjà connus du dépôt. Les 65 autres sont
neufs.)*

**`course-311` s'arrête à 2024.** Il ne publie **rien** pour 2025 — ni
sujet, ni corrigé. C'est sa limite la plus dure, et elle a une
conséquence directe sur K-8 (§ 5).

### 1.3 Ce que la série FRANÇAISE offre en face — recompté élément par élément

La section francophone `4585` (« Examens Nationaux (SPC) », servie sous
`course-422`) porte **54 éléments**, et leur décompte est sans ambiguïté :

- **2008 → 2015, N+R (16 sessions) : sujet seul, AUCUN corrigé.**
- **2016 → 2024, N+R (18 sessions) : sujet + corrigé.**
- **2025, N+R (2 sessions) : sujet seul, aucun corrigé.**

16 + (18 × 2) + 2 = 54 ✔

> **Une précision au CENSUS, au passage.** Le CENSUS note « corrigés
> connus pour **2017**–2024 N+R ». Le compte réel commence à **2016** :
> `57702` (2016 N) et `57708` (2016 R) existent. La formule employée
> ailleurs dans le CENSUS — « la série SPC n'en a qu'à partir de
> **2016** » — est la bonne. *(Constat de prospection ; aucune
> modification du CENSUS n'a été faite, ce n'est pas le périmètre de
> cette passe.)*

---

## 2. La couverture croisée avec notre corpus

Pour chacune des 36 lignes du CENSUS SPC : ce que notre corpus en a
fait, et ce que le gisement arabophone offre en face.

**Légende de la colonne « ce que le gisement apporte » ·**
🟢 **corrigé INÉDIT** — la série française n'en a aucun ·
🔵 **2ᵉ corrigé, auteur DIFFÉRENT** — deux témoins réels (établi § 2.2) ·
🟠 **même corrigé en deux langues** — un seul témoin, pas deux (§ 2.2) ·
⚫ **rien** — hors de portée du gisement.

| Année | Sess. | État dans notre corpus (CENSUS) | AR sujet | AR corrigé | Corrigé FR ? | Ce que le gisement apporte |
|---:|:---:|---|:---:|:---:|:---:|---|
| 2008 | N | sourcé-confirmé | `39355` | `39356` | non | 🟢 |
| 2008 | R | **non recherché** | `39357` | `39358` | non | 🟢 + sujet |
| 2009 | N | sourcé-confirmé | `39360` | `39361` | non | 🟢 |
| 2009 | R | **non recherché** | `39362` | `39363` | non | 🟢 + sujet |
| 2010 | N | décomposé + VÉRIFIÉ | `39365` | `39366` | non | 🟢 *(déjà exploité)* |
| 2010 | R | décomposé (non vérifié) | `39367` | `39368` | non | 🟢 *(déjà exploité)* |
| 2011 | N | déc. + VÉRIFIÉ + CONVERTI | `39370` | `39371` | non | 🟢 |
| 2011 | R | décomposé + VÉRIFIÉ | `39372` | `39373` | non | 🟢 — *et le fichier note « aucun corrigé n'existe »* |
| 2012 | N | décomposé + VÉRIFIÉ | `39375` | `39376` | non | 🟢 |
| 2012 | R | **non recherché** | `39377` | `39378` | non | 🟢 + sujet |
| 2013 | N | sourcé-confirmé | `39380` | `39381` | non | 🟢 |
| 2013 | R | **non recherché** | `39382` | `39383` | non | 🟢 + sujet |
| 2014 | N | sourcé-confirmé | `39385` | `39386` | non | 🟢 |
| 2014 | R | sourcé-confirmé | `39387` | `39388` | non | 🟢 |
| 2015 | N | décomposé + VÉRIFIÉ | `39390` | `39391` | non | 🟢 — *le fichier note « aucun corrigé officiel »* |
| 2015 | R | déc. + VÉRIFIÉ + CONVERTI | `39392` | `39393` | non | 🟢 — *le plafond de preuve « blocs 2–8 » peut être relevé* |
| 2016 | N | sourcé-confirmé | `39395` | `39396` | `57702` | 🔵 |
| 2016 | R | sourcé-confirmé | `39397` | `39398` | `57708` | 🔵 |
| 2017 | N | déc. + VÉRIFIÉ + CONVERTI | `39400` | `39401` | `57714` | 🔵 **← litige F_p, § 3.2** |
| 2017 | R | sourcé-listé | `39402` | `39403` | `57720` | 🔵 |
| 2018 | N | sourcé-confirmé | `45512` | `45509` | `57729` | 🔵 |
| 2018 | R | sourcé-listé | `45518` | `45515` | `57735` | 🔵 |
| 2019 | N | sourcé-confirmé | `68292` | `68295` | `68303` | 🔵 **← litige sin 10°, § 3.3** |
| 2019 | R | sourcé-listé | `94402` | `94405` | `94422` | 🔵 |
| 2020 | N | sourcé-confirmé | `109734` | `109737` | `109745` | 🟠 |
| 2020 | R | sourcé-listé | `109746` | `109752` | `109757` | 🟠 |
| 2021 | N | sourcé-confirmé | `142352` | `142355` | `136826` | 🟠 |
| 2021 | R | sourcé-listé | `142358` | `142361` | `136829` | 🟠 |
| 2022 | N | sourcé-confirmé | `142803` | `142806` | `136832` | 🟠 *(mais source moins dégradée, § 5.2)* |
| 2022 | R | sourcé-listé | `142370` | `142373` | `136835` | 🟠 *(mais source moins dégradée, § 5.2)* |
| 2023 | N | sourcé-confirmé | `142388` | `142393` | `142479` | 🟠 |
| 2023 | R | sourcé-listé | `142812` | `142815` | `142487` | 🟠 |
| 2024 | N | sourcé-confirmé | `147672` | `147675` | `145766` | 🟠 |
| 2024 | R | sourcé-listé | `147678` | `147681` | `145772` | 🟠 |
| **2025** | **N** | sourcé-confirmé | — | — | **non** | ⚫ **rien, nulle part** |
| **2025** | **R** | sourcé-listé | — | — | **non** | ⚫ **rien, nulle part** |

### 2.1 La réponse d'un coup d'œil

> **Pour quelles épreuves converties disposons-nous désormais d'un
> témoin indépendant que nous n'avions pas ?**

- **16 sessions gagnent un corrigé INÉDIT** (2008–2015, N+R) — dont
  **deux étaient déjà exploitées** (2010 N et 2010 R) et **quatre
  épreuves de notre banque en dépendent** : PC 2011 N (convertie, 6
  entrées), PC 2011 R (vérifiée), PC 2012 N (vérifiée), PC 2015 N
  (vérifiée), PC 2015 R (convertie, 8 entrées). **Trois de leurs
  fichiers de vérification écrivent noir sur blanc qu'aucun corrigé
  n'existe** — pour 2011 R (« Aucun corrigé n'existe »), 2015 N
  (« Aucun corrigé officiel ») et 2015 R (plafond de preuve limité aux
  blocs 1). **Cette affirmation est aujourd'hui fausse** : le corrigé
  existe, en arabe, sous `39373`, `39391` et `39393`.
- **8 sessions gagnent un SECOND corrigé d'une AUTRE main** (2016 N/R,
  2017 N/R, 2018 N/R, 2019 N/R) — deux témoins réels.
- **10 sessions ne gagnent qu'une TRADUCTION** (2020 → 2024, N+R) : le
  corrigé arabe et le corrigé français y sont **le même corrigé du même
  auteur en deux éditions de langue**. Un témoin, pas deux. C'est établi,
  pas supposé — § 2.2.
- **2 sessions ne gagnent rien** : 2025 N et 2025 R. Ni le gisement ni
  la série française n'ont de corrigé pour 2025.

### 2.2 Combien de témoins, vraiment ? — l'indépendance MESURÉE

C'est le contrôle que K-8 impose et que ce document ne pouvait pas se
dispenser de faire : *deux témoins qui descendent du même document ne
font qu'un témoin.* Les **34 corrigés arabes** ont donc été téléchargés
et leurs métadonnées confrontées à celles du corrigé **français** de la
même session.

**Premier résultat, sur les 34 corrigés arabes seuls.** Ils ne sont pas
34 plumes : on compte **8 chaînes d'auteur distinctes plus 9 fichiers
sans auteur**, et les blocs sont contigus dans le temps —
`Kammah` en signe **10** (2014 N → 2018 R), un bloc anonyme *Foxit
Reader* en couvre **9** (2009 R → 2014 R, tous créés entre août 2014 et
juin 2015), `lenovo` **4**, `www.svt-assilah.com` **3**, `cnee` **3**.
*(Point positif au passage : **34/34 ont une couche de texte
exploitable** — aucun n'est un scan muet.)*

**Second résultat, et c'est le décisif.** Confrontation AR ↔ FR sur les
18 sessions où les deux existent :

| Session | corrigé AR (auteur · créé · p.) | corrigé FR (auteur · créé · p.) | Verdict |
|---|---|---|---|
| 2016 N | Kammah · 2016-06-11 · 8 | KACHICHE Mustapha · 2018-09-04 · 9 | 🔵 **deux mains** |
| 2016 R | Kammah · 2017-02-09 · 10 | KACHICHE Mustapha · 2018-09-04 · 6 | 🔵 **deux mains** |
| 2017 N | Kammah · 2017-06-12 · 12 | KACHICHE Mustapha · 2017-08-30 · 6 | 🔵 **deux mains** |
| 2017 R | Kammah · 2017-07-18 · 11 | KACHICHE Mustapha · 2017-08-30 · 6 | 🔵 **deux mains** |
| 2018 N | Kammah · 2018-06-08 · 6 | KACHICHE Mustapha · 2018-06-22 · 8 | 🔵 **deux mains** |
| 2018 R | Kammah · 2018-09-07 · 10 | KACHICHE Mustapha · 2018-08-26 · 8 | 🔵 **deux mains** |
| 2019 N | COMPAQ / *Prof. Ahmed chajraoui* · 2019-06-15 · 8 | *(sans auteur)* Foxit · 2019-06-14 · 6 | 🔵 **deux mains** |
| 2019 R | marwane · 2019-07-06 · 3 | **kammah** · 2019-10-06 · 7 | 🔵 **deux mains** *(les rôles s'inversent)* |
| 2020 N | lenovo · 2020-08-21 · 9 | **lenovo · 2020-08-21** · 10 | 🟠 même main, **même jour** |
| 2020 R | svt-assilah · 2020-09-13 · 10 | **svt-assilah · 2020-09-13 · 10** | 🟠 même main, même jour, même pagination |
| 2021 N | svt-assilah · 2021-06-11 · 9 | **svt-assilah · 2021-06-11** · 8 | 🟠 même main, même jour |
| 2021 R | svt-assilah · 2021-08-07 · 10 | **svt-assilah · 2021-08-07 · 10** | 🟠 **prouvé sur le contenu** |
| 2022 N | lenovo · 2022-07-04 · 9 | **lenovo · 2022-07-04** · 10 | 🟠 même main, même jour |
| 2022 R | lenovo · 2022-07-20 · 9 | lenovo · 2022-08-22 · 10 | 🟠 même main |
| 2023 N | lenovo · 2023-06-21 · 10 | **lenovo · 2023-06-21 · 10** | 🟠 **prouvé sur le contenu** |
| 2023 R | cnee · 2023-06-11 · 4 | cnee · 2023-06-21 · 4 | 🟠 même main |
| 2024 N | cnee · 2024-05-01 · 4 | cnee · 2024-04-18 · 4 | 🟠 même main |
| 2024 R | cnee · 2024-05-03 · 4 | **cnee · 2024-05-03 · 4** | 🟠 **prouvé sur le contenu** |

**« Prouvé sur le contenu »** veut dire que les deux fichiers ont été
ouverts et comparés, pas seulement leurs métadonnées. Sur 2021 R,
2023 N et 2024 R : **même nombre de pages, même découpage, mêmes
équations dans le même ordre, la version française étant mot pour mot la
traduction de l'arabe**. Sur 2021 R, les deux portent en outre le
filigrane `www.svt-assilah.com` **dans le corps du texte**.

> **La coupure est nette et elle est datée : 2016 → 2019, deux mains ;
> 2020 → 2024, une seule main en deux langues.** Autrement dit, à partir
> de 2020, AlloSchool sert la même correction deux fois. **Le gisement
> n'y ajoute aucun témoin.**

*Réserve honnête sur la moitié 🟠 :* `lenovo` et `cnee` sont des noms
d'utilisateur Windows génériques — deux professeurs différents peuvent
les porter. La conclusion ne repose donc pas sur eux seuls, mais sur la
**conjonction** auteur + producteur + date de création au jour près +
pagination, et sur les **trois comparaisons de contenu** faites
directement. Les cinq sessions où seules les métadonnées concordent
(2022 R, 2023 R, 2024 N, et les deux de 2020) sont marquées « même
main » sans le mot « prouvé ».

---

## 3. Ce que le gisement dit des trois valeurs en litige

**Rappel de la discipline.** Aucun de ces trois dossiers n'est
« résolu » ici. Ce qui suit est un relevé de témoins, avec leur niveau
de preuve et leur degré d'indépendance.

### 3.1 PC 2010 N — le temps de demi-réaction $t_{1/2}$

**Le litige.** La banque (`bk-2010-n-x1`, `pc/transformations-lentes-rapides`)
affiche $t_{1/2} \approx 20$ min, valeur que son propre bloc
« SOURCING GAP » déclarait **reprise du sommet r-bac et jamais
re-dérivée**. Une mesure au pixel du 2026-08-27 donne **12,53 min**.
C'est le cas d'**héritage** archétypal de K-8 : les deux endroits du
dépôt sont cohérents entre eux *et faux ensemble*.

#### Témoin 1 — le corrigé arabe `element/39366`. **CONFIRMÉ DE MES PROPRES YEUX.**

Extraction de la couche de texte, **page 2**. Le corrigé pose d'abord la
définition, puis calcule le seuil, puis lit le graphe. Verbatim (l'arabe
est translittéré en note ; les formules sont celles du PDF) :

> `- إيجاد 𝑡1⁄2 : زمن نصف التفاعل`
> *(« Trouver $t_{1/2}$ : le temps de demi-réaction »)*
>
> `حسب تعريف زمن نصف التفاعل : 𝑥(𝑡1⁄2) = 𝑥𝑚𝑎𝑥/2`
> `حسب الجدول الوصفي التقدم الأقصى هو : 𝑥𝑚𝑎𝑥 = 2.10−3 𝑚𝑜𝑙`
> `ومنه : 𝑥(𝑡1⁄2) = 2.10−3/2 = 10−3 𝑚𝑜𝑙`
> `𝐺(𝑡1⁄2) = −0,72. 𝑥(𝑡1⁄2) + 2,5.10−3`
> `ت.ع : 𝐺(𝑡1⁄2) = −0,72 × 10−3 + 2,5.10−3 = 1,78.10−3 𝑆`
> `أي : 𝐺 = 1,78 𝑚𝑆`
>
> **`باستعمال المبيان 𝐺 = 𝑓(𝑡) : نجد 𝒕𝟏⁄𝟐 ≃ 𝟏𝟑 𝒎𝒏`**
> *(« En utilisant le graphe $G = f(t)$ : on trouve $t_{1/2} \simeq$
> **13 min** » — en gras dans le PDF.)*

**Le corrigé concorde avec la mesure au pixel et réfute les 20 min.**
Provenance du témoin : PDF `…-2010-aldora-alaadia-altshih-3.pdf`, MD5
`eae3f07d749c2f30bda206c210197ae0`, 9 pages, Microsoft Word 2013,
auteur **`Kammah`**, créé le 2015-09-20. **Corrigé de professeur, non
officiel** — même classe de source que celui de 2010 R.

#### Témoin 2 — NEUF : la polyligne vectorielle de l'ORIGINAL ARABE `element/39365`

C'est le geste que K-8 demande — *« re-mesurer les valeurs graphiques
sur la source la moins dégradée »* — et il produit ici un résultat que
la passe de 2026-08 ne pouvait pas produire.

**Le fait matériel qui rend la mesure meilleure, et non seulement
répétée :**

| | figure 1 (le graphe $G = f(t)$) | couche de texte |
|---|---|---|
| **Édition française** (`element/94443`, `course-422`) | **image PNG 754 × 515 px placée en 206 dpi** | les graduations d'axe **ne sont pas** dans le texte |
| **Original arabe** (`element/39365`, `course-311`) | **géométrie vectorielle — ZÉRO image sur la page** | `0 10 20 … 90 t(min)` et `0,5 1 1,5 2 2,5 G(mS)` **sont dans la couche de texte** |

La française est une **re-fabrication Nitro Pro du 2020-03-09** ; l'arabe
est le document d'origine (**pdfFactory Pro 2.23, Windows XP French,
`creationDate 2010-06-20`**, titre interne `s1def` — exactement le
frère de `s2def`/2010-07-03 déjà identifié pour 2010 R).

**La mesure**, entièrement non visuelle :

1. **Calibration sur la grille du document**, pas sur les étiquettes :
   les traits gras de la grille tombent tous les 13,92 pt en $x$ et
   14,2 pt en $y$ ; ils coïncident au centième près avec les centres des
   étiquettes de texte. Origine $t=0$ à $x = 55{,}20$ ;
   $t = 90$ à $x = 305{,}76$ → **2,784 pt/min**. $G = 0$ à
   $y = 747{,}16$ ; $G = 2{,}5$ à $y = 604{,}60$ → **57,02 pt/mS**.
2. **Le seuil $G(t_{1/2}) = 1{,}78$ mS est dérivable du sujet seul**, sans
   le corrigé : la relation $G = -0{,}72\,x + 2{,}5{\cdot}10^{-3}$ est
   **imprimée dans l'énoncé** (question 1.3), et $x_{max} = 2{\cdot}10^{-3}$ mol
   se lit sur le tableau d'avancement. D'où
   $G_\infty = 1{,}06$ mS et $G(t_{1/2}) = (2{,}5 + 1{,}06)/2 = 1{,}78$ mS.
   *Contrôle de cohérence interne : la polyligne démarre à
   $G = 2{,}487$ mS pour $t = 0$, à 0,5 % de la valeur 2,5 imprimée.*
3. **Le franchissement du seuil sur la polyligne** : sommets successifs à
   $(t = 12{,}41\ \mathrm{min},\ G = 1{,}785\ \mathrm{mS})$ et
   $(t = 13{,}53,\ G = 1{,}751)$. Interpolation linéaire :

   $$t_{1/2} = 12{,}41 + \frac{1{,}785-1{,}780}{1{,}785-1{,}751}\times 1{,}12 = \boxed{12{,}6\ \text{min}}$$

4. **Contre-épreuve directe des 20 min** : la polyligne passe par
   $G = 1{,}553$ mS à $t = 20{,}95$ min — très en dessous du seuil de
   1,78. **La valeur 20 min est incompatible avec le dessin de
   l'original**, sans qu'aucune interpolation soit nécessaire pour le
   voir.

#### Bilan de preuve pour $t_{1/2}$

| Chaîne | Instrument | Document | Valeur |
|---|---|---|---|
| A (2026-08-27) | mesure au pixel | bitmap 206 dpi, édition **française** | **12,53 min** |
| B (2026-08-28) | lecture humaine du graphe | corrigé arabe `39366`, auteur *Kammah*, 2015 | **≈ 13 min** |
| C (**neuve, 2026-09-03**) | géométrie vectorielle + seuil dérivé de l'énoncé | **original arabe** `39365`, 2010 | **12,6 min** |

**Ce que ça vaut, honnêtement.** Les chaînes A et C mesurent **très
probablement le même dessin** : les deux éditions descendent de la même
composition ministérielle, et rien ne prouve que le dessin ait été
retracé. **A et C ne font donc qu'UN témoin du dessin, mesuré deux
fois** — mais C le mesure sur une source strictement moins dégradée (du
vectoriel contre un bitmap 206 dpi), ce qui écarte la classe de doute
« l'écart vient du rendu ». **B est un témoin réellement distinct** : un
humain, cinq ans plus tard, lisant le même graphe et écrivant 13.

**Trois chaînes, aucune ne donne 20. Aucune décision n'est prise ici** —
c'est un arbitrage owner (HANDOFF § 6.5). Ce que cette passe ajoute au
dossier : la valeur ≈ 13 tient **sur la source la moins dégradée
atteignable**, et non plus seulement sur un bitmap.

---

### 3.2 PC 2017 N — la fréquence de la porteuse $F_p$

**Le litige.** `bk-2017-n-x3` **et le sommet de leçon r-bac** publient
$F_p = 2$ kHz ; sept méthodes de mesure donnent $1\,003 \pm 15$ Hz —
**66 σ**. Le cas est le plus grave des trois parce que la valeur est
dans l'**ÉNONCÉ** du sommet r-bac, donnée à l'élève comme une lecture de
figure que la figure contredit.

**La question posée à cette prospection** : 2017 étant postérieur à
2016, un corrigé français existe déjà (`element/57714`) — le gisement
offre-t-il un **SECOND témoin indépendant** ?

#### D'abord : est-ce le même sujet ?

Oui, établi sur la couverture de l'original arabe (`element/39400`),
couche de texte, page 1 : code **`NS 28`**, `الدورة العادية 2017`, coef 7,
3 h, et les quatre exercices avec leur barème — **7 · 2,5 · 5 · 5,5 = 20** :

> `التمرين الأول (7 نقط)` : pile aluminium-cuivre · réactions de l'acide
> butanoïque — `التمرين الثاني (2,5 نقط)` : propagation d'une onde
> mécanique à la surface de l'eau — `التمرين الثالث (5 نقط)` : réponse
> d'un dipôle RL à un échelon de tension · **تضمين الوسع** (modulation
> d'amplitude) — `التمرين الرابع (5,5 نقط)` : mouvement d'un skieur avec
> frottements · étude énergétique d'un pendule de torsion.

Correspondance exacte avec la carte CENSUS de 2017 N. *(Le français
porte `NS28F`, l'arabe `NS 28` : même épreuve, deux éditions de langue.)*

#### Le second témoin : OUI, et il est indépendant

Le corrigé arabe **`element/39401`**, page 8, écrit textuellement :

> `2.1- قيمة التردد 𝐹𝑃 للتوتر الحامل :`
> *(« Valeur de la fréquence $F_P$ de la tension porteuse »)*
>
> **`10𝑇𝑃 = 10𝑚𝑠 ⟹ 𝑇𝑃 = 1𝑚𝑠 ⟹ 𝐹𝑃 = 1/𝑇𝑃 ⟹ 𝐹𝑃 = 1/10⁻³ ⟹ 𝑭𝑷 = 𝟏𝟎𝟎𝟎 𝑯𝒛`**
>
> `𝑇𝑆 = 10𝑚𝑠 ⟹ 𝑓𝑆 = 1/(10.10⁻³) ⟹ 𝒇𝑺 = 𝟏𝟎𝟎 𝑯𝒛`

**L'indépendance est établie par la provenance, pas supposée :**

| | corrigé **français** `57714` | corrigé **arabe** `39401` |
|---|---|---|
| MD5 | `7b49e6d421adf8b8be254212478cce2b` | `52e93c9a47a3fa2e97bcfa3b472c19bd` |
| Auteur | **KACHICHE Mustapha** (`BacCor17SP1_KACH`) | **Kammah** |
| Producteur | PDFCreator 2.3.0.103 | Microsoft® Word 2013 |
| Créé le | **2017-08-30** | **2017-06-12** |
| Pages | 6 | 12 |

**Le corrigé arabe précède le corrigé français de deux mois et demi.**
Il ne peut donc pas en dériver. Ce sont **deux témoins, pas un**.

#### Et un troisième instrument, neuf : la polyligne de l'original arabe

La figure 4 (la tension modulée $u_S(t)$) est **vectorielle** dans
l'original arabe, avec ses graduations dans la couche de texte
(`uS(V)`, `t(ms)`, repères **5** et **15**). Mesure sur la polyligne —
1 291 segments, calibration par les seuls repères imprimés 5 ms et
15 ms :

- **45 franchissements de zéro** entre $t = 0{,}052$ ms et
  $t = 22{,}371$ ms ;
- régression linéaire de l'indice de franchissement sur le temps :
  demi-période **0,50716 ms**, résidu σ = **11,8 μs** (max 23,7 μs) ;
- d'où $T_p = 1{,}0143$ ms → $\boxed{F_p = 986\ \mathrm{Hz}}$.

**Contrôle d'échelle indépendant du comptage**, refait sur ce document :
les minima d'enveloppe tombent dans les fenêtres $t \approx 4{,}75$ ms et
$t \approx 14{,}25$–$15{,}25$ ms — **exactement sur les deux repères
imprimés 5 et 15**, ce qui reproduit sur un document distinct le
contrôle que la passe du 2026-08-28 avait fait sur l'édition française.

> **Ce que cette mesure vaut, et ce qu'elle ne vaut pas.** Contrairement
> au cas 2010 N, **l'édition arabe de 2017 N n'est PAS moins dégradée** :
> les deux sont des pdfFactory Pro 1.64 avec des figures vectorielles
> (3 285 primitives côté arabe, 3 998 côté français). C'est donc un
> **instrument indépendant sur un document distinct**, pas une meilleure
> règle. Et comme les deux éditions descendent très probablement de la
> même composition, la mesure de 986 Hz et celle de $1\,003 \pm 15$ Hz
> **ne sont pas deux témoins du dessin** : ce sont deux lectures du même
> dessin. Ce qui reste entièrement solide, c'est l'écart au facteur 2.

#### Bilan de preuve pour $F_p$

| Témoin / instrument | Valeur | Statut |
|---|---|---|
| `bk-2017-n-x3` **et** sommet r-bac | **2 000 Hz** | valeur publiée, en litige |
| Sept mesures, passe 2026-08-28 (édition FR) | $1\,003 \pm 15$ Hz | déjà au dossier |
| Corrigé **français** `57714` (KACHICHE, août 2017) | **1 000 Hz** | déjà au dossier |
| **Corrigé arabe `39401` (Kammah, juin 2017)** | **1 000 Hz** | **NEUF — témoin réellement indépendant** |
| **Polyligne de l'original arabe `39400`** | **986 Hz** | **NEUF — instrument indépendant, même dessin** |

**Ce que ça change.** Le dossier passait de « une mesure + un corrigé »
à **deux corrigés d'auteurs distincts, dont l'arabe précède le français
de deux mois et demi**, plus une seconde mesure géométrique sur un
document distinct. Les quatre convergent dans une bande de ±1,5 % autour
de 1 kHz ; 2 kHz reste à un facteur 2. **Aucune valeur n'est corrigée
ici** — mais le témoignage humain, qui était unique, est maintenant
double et non chaînable.

---

### 3.3 PC 2019 N — les deux réponses, 532 N contre 525 N

**Le litige.** Le sommet r-bac de `pc/lois-de-newton` fournit
« on prendra $\sin 10° \approx 0{,}17$ » et publie **532 N** ;
`bk-2019-n-x…` garde $\sin 10° = 0{,}1736$ et publie **525 N**. HANDOFF
§ 6.5 le pose ainsi : *« deux réponses publiées coexistent pour une
seule question, et la donnée arrondie est absente de la transcription
vérifiée du sujet »*.

Il y a donc **deux questions distinctes**, et le gisement instruit les
deux.

#### Question A — l'arrondi 0,17 est-il dans le sujet officiel ?

**Réponse : non.** L'original arabe `element/68292`, page 5, code
**`NS28`**, `الدورة العادية 2019`,
`التمرين الرابع` (« étude du mouvement du centre d'inertie d'un système
mécanique » : saut en longueur à moto). La liste des données y est
**close et exhaustive** :

> `معطيات :`
> `- شدة الثقالة : g = 10 m.s⁻²  ؛`
> `- الزاوية β : β = 10°  ؛`
> `- كتلة المجموعة (S) : m = 190 kg .`

**Trois données, pas quatre. Aucun $\sin 10°$ pré-arrondi.** La
transcription vérifiée avait raison, et l'original arabe le confirme
sur la source la moins dégradée disponible pour cette session.

#### Question B — que calculent les corrigés ?

**Deux corrigés, deux langues, tous deux avec le sinus exact.**

Corrigé **arabe** `element/68295`, page 6, signé en pied de page
`Prof. Ahmed chajraoui` :

> `3. استنتاج الشدة F للقوة . (0,5ن)`
> `لدينا : 𝑎_G = F/m − g.sin β`
> `إذن : F = m(𝑎_G − g.sin β)`
> **`ث.ع : 𝐹 = 190.(4,5 − 10.sin10) = 525,1 N`**

*(`ث.ع` = تطبيق عددي = application numérique.)*

Corrigé **français** `element/68303`, page 5 :

> `3. D'après le résultat de la question 1 : m.g.sin β + F = m.a_G`
> `⟹ F = m.[a_G − g.sin β] ⟹ F = 190.[4,5 − 10 × sin10] ⟹`
> **`F = 525,07 N`**

**L'indépendance :**

| | corrigé **français** `68303` | corrigé **arabe** `68295` |
|---|---|---|
| MD5 | `75615e53f3eab0537368c7f3d7799a56` | `7dd6540fa163cebde2c1558e11e5727e` |
| Auteur / producteur | Foxit Reader PDF Printer 9.5.0 | **Prof. Ahmed chajraoui**, MS Office Word 2007 |
| Créé le | **2019-06-14** | **2019-06-15** |
| Valeur imprimée | **525,07 N** | **525,1 N** |

Créés à **un jour d'intervalle**, dans deux langues, par deux chaînes
d'outils différentes, et **ils n'impriment pas le même nombre de
décimales** — 525,07 contre 525,1. Deux arithmétiques indépendantes qui
tombent au même endroit, pas une copie.

#### Bilan de preuve pour PC 2019

- **La donnée arrondie $\sin 10° \approx 0{,}17$ n'est PAS dans le sujet
  officiel** (établi sur l'original arabe, couche de texte, liste de
  données close). C'est une **addition éditoriale du sommet r-bac**.
- **Deux corrigés indépendants calculent avec le sinus exact et
  publient 525 N.** Aucun des deux ne mentionne 0,17.
- **Le corrigé français `68303` existait depuis 2019 et n'avait jamais
  été consulté sur cette question** — le CENSUS classe 2019 N
  `sourcé-confirmé`, jamais décomposé. C'est donc **deux témoins neufs
  pour le dépôt**, dont un qui n'a rien à voir avec le gisement
  arabophone et qui était à portée de main depuis le début.

**Ce que ça ne fait PAS.** Ça ne tranche pas la question pédagogique.
HANDOFF § 6.5 la formule bien : les deux textes donnent des conseils
défendables, et un élève peut tenir les deux. Ce qui est établi ici,
c'est seulement **d'où vient l'arrondi** (du sommet, pas du ministère) et
**ce que font les correcteurs** (le sinus exact, 525 N). L'arbitrage —
harmoniser sur 525, ou garder l'arrondi comme exercice de vigilance
numérique en le déclarant comme tel — reste entier et reste à l'owner.

---

## 4. Les quatre lignes `non recherché` — les candidats

Les quatre rattrapages que le CENSUS marque `non recherché` (2008 R,
2009 R, 2012 R, 2013 R) sont **tous les quatre couverts par le
gisement, sujet ET corrigé**. Voici ce que la couverture de chaque sujet
donne, lue dans la couche de texte.

| Session | Sujet | Corrigé | Contrôle année/code | Ce que la couverture annonce |
|---|---|---|---|---|
| **2008 R** | `element/39357` | `element/39358` | « الدورة الاستدراكية **2008** », filière SPC, coef 7, 3 h, sur la couverture. **Pas de code RS** (l'édition ne le porte pas) | Chimie **7 pts** : étude du vinaigre commercial (`دراسة الخل التجاري`) — acide éthanoïque, conductimétrie. 6 p. |
| **2009 R** | `element/39362` | `element/39363` | ⚠️ **couche de texte VIDE** — le PDF est un **fax numérisé** (`Télécopie pleine page`, PrimoPDF, auteur `kachiche`, 2009-07-02) | **non lisible sans OCR** — voir la réserve ci-dessous |
| **2012 R** | `element/39377` | `element/39378` | **`RS28`** + année **2012** sur **5 pages sur 6** | Chimie **7** : électrolyse d'une solution de bromure de cuivre II · étude cinétique de l'hydrolyse d'un ester — Physique **13** : ondes **2,5** (diffraction) · électricité **5** (circuit LC idéal ; réception d'une onde modulée en amplitude et démodulation) · mécanique **5,5** (lois de Kepler, trajectoire circulaire). 6 p. |
| **2013 R** | `element/39382` | `element/39383` | **`RS28`** + année sur **5 pages sur 6** *(rendue « 3102 » par l'extracteur — artefact RTL, § 0)* | Chimie **7** : électrolyse d'une solution de chlorure de nickel II (**2**) · réaction de l'acide méthanoïque avec l'eau et préparation du méthanoate d'éthyle (**5**) — Physique **13** : nucléaire **2,5** (contamination radioactive d'un aliment lors de l'accident de Fukushima) · électricité **5** (détermination des deux caractéristiques d'une bobine et son usage dans un circuit oscillant) · mécanique **5,5** (mouvement du pendule pesant). 6 p. |

**Tous les MD5 sont stables sur deux téléchargements** (§ 0).

**Trois réserves, nommées :**

1. **2009 R n'est pas exploitable en l'état.** Son PDF est un fax
   numérisé sans couche de texte : la ligne CENSUS ne peut pas passer de
   `non recherché` à `sourcé-confirmé` sur cette seule prospection — il
   faudra une passe OCR ou une lecture d'image pour confirmer l'en-tête.
   *Fait à noter au passage : l'édition **française** de 2009 R
   (`element/94426`) est, elle, un Nitro Pro avec 12 k de texte — pour
   **cette seule session**, c'est le français qui est la meilleure
   source.*
2. **2008 R et 2009 R ne portent aucun code d'examen** dans le texte
   servi. Le code `RS28` n'apparaît qu'à partir de 2012 dans ce
   gisement.
3. **Les dates de création des PDF sont antérieures aux sessions**
   (2012 R composé le 2012-05-16, 2013 R le 2013-05-10, 2017 N le
   2017-05-04 — pour des épreuves de juin/juillet). Le motif est
   régulier, donc probablement une date de composition de la chaîne de
   production. **Aucune conclusion n'en est tirée ici** ; c'est noté
   pour que la prochaine passe ne s'en étonne pas.

---

## 5. Ce que ça change pour K-8 — honnêtement

K-8 chiffre l'exposition à **89 entrées sur 187** dont le raisonnement
s'appuie sur une lecture de figure. La fiche est explicite sur ce qui la
fermerait : *« re-mesurer les valeurs graphiques sur la source la moins
dégradée, sujet par sujet »* — et sur le fait qu'aucune porte
automatique interne au dépôt n'y arrivera.

Le gisement offre deux choses différentes, et **il faut les compter
séparément parce qu'elles n'ont pas la même valeur** : des **témoins**
(des corrigés) et une **meilleure règle** (un original moins dégradé).
Le résultat est asymétrique, et pas dans le sens qu'on espérait.

### 5.1 Le décompte des 89, par portée du gisement

Répartition des 89 entrées de `lectures-graphiques.md`, comptée ligne à
ligne :

| Catégorie | Entrées | Ce que le gisement leur apporte |
|---|---:|---|
| SPC **2017 N, 2018 N, 2019 N** | **11** | 🔵 un **SECOND témoin réel**, d'une autre main que le corrigé français (§ 2.2) |
| SPC **2020 → 2024** | **54** | 🟠 **rien de neuf comme témoin** — le corrigé arabe est la traduction du corrigé français, même auteur |
| SPC **2010 N** (`bk-2010-n-x1`) | **1** | 🟢 le corrigé **inédit** — *et c'est le seul cas déjà avéré de K-8, déjà exploité* |
| SPC **2025** (N : 5, R : 7) | **12** | ⚫ **RIEN.** `course-311` s'arrête à 2024 ; la série française n'a pas de corrigé 2025 non plus |
| **Maths** (SM 10, SExp 1) | **11** | ⚫ hors périmètre — `course-311` est un cours de physique-chimie |
| **Total** | **89** | |

Le décompte honnête, donc :

- **12 entrées sur 89 gagnent un témoin qu'elles n'avaient pas** : les
  11 de 2017 N / 2018 N / 2019 N (un second correcteur, d'une autre
  main), plus `bk-2010-n-x1` (un premier correcteur là où il n'y en avait
  aucun).
- **54 entrées gagnent une traduction**, pas un témoin. Pour elles, le
  corrigé arabe et le corrigé français sont le même document ; s'il se
  trompe, il se trompe dans les deux langues, et **le mode d'échec
  « héritage » que K-8 décrit n'est pas plus détectable qu'avant**.
- **23 entrées restent hors de portée** : 12 en SPC 2025, 11 en maths.

**C'est très en dessous de ce que l'inventaire brut laissait espérer.**
Le comptage naïf — « 66 des 89 tombent sur des sessions que le gisement
couvre » — est vrai et **trompeur** : il compte des documents, pas des
témoins. Après le contrôle d'indépendance du § 2.2, il n'en reste que
12.

**Les 12 entrées de 2025 sont le point dur, et il faut le dire net.**
Elles appartiennent à des épreuves complètes affichées à l'élève, et
**aucun corrigé n'existe pour elles nulle part sur AlloSchool**, dans
aucune des deux langues. Pour ces douze-là, la seule voie qui reste est
celle que K-8 décrit : la re-mesure. Aucune prospection ne les
atteindra.

### 5.2 La meilleure règle — et pourquoi elle sert beaucoup moins qu'espéré

L'hypothèse de départ était : *« un original arabe est moins dégradé
qu'une traduction française »*. **Elle a été mesurée, pas supposée** —
en profilant les 34 sujets des deux séries (nombre de primitives
vectorielles, nombre et surface des images matricielles, taille de la
couche de texte). Voici le résultat, et il coupe en deux.

**Là où c'est spectaculairement vrai — 2010 → 2015 (12 sessions).**
Sur **11 des 12**, l'édition française est une **re-fabrication Nitro
Pro** : 154 à 354 primitives vectorielles seulement, et **24 à 42
images matricielles totalisant 3,4 à 4,6 Mpx**. L'édition arabe est,
elle, la **composition d'origine** (pdfFactory Pro / Word) :
**1 474 à 158 850 primitives vectorielles**, images résiduelles 0,03 à
2,74 Mpx. Autrement dit : **côté français les figures sont des bitmaps,
côté arabe ce sont des courbes.** Le cas 2010 N mesuré au § 3.1 (PNG
206 dpi contre vectoriel pur) n'est pas une exception — c'est le régime
de toute la décennie.

*La douzième est 2010 R, et elle est pire encore côté français :* un
**scan intégral** (0 primitive vectorielle, 60,9 Mpx, aucune couche de
texte) contre 5 612 primitives côté arabe. Ce qui **corrobore
mécaniquement** ce que la passe du 2026-08-29 avait établi autrement —
le document français de 2010 R n'est pas l'édition ministérielle mais
une traduction professorale numérisée.

**Là où c'est faux — 2016 → 2024, c'est-à-dire là où vivent 65 des 89
entrées.** Sur ces années, les deux éditions ont le **même producteur**
et des comptes vectoriels qui coïncident à quelques unités près :

| Session | AR primitives vect. | FR primitives vect. | Lecture |
|---|---:|---:|---|
| 2019 N | 2 157 | 2 156 | **même composition** |
| 2019 R | 2 779 | 2 773 | même composition |
| 2020 N | 2 091 | 2 092 | même composition |
| 2020 R | 1 581 | 1 586 | même composition |
| 2024 N | 1 972 | 1 971 | même composition |
| 2024 R | 2 531 | 2 535 | même composition |
| 2017 N | 3 285 | 3 998 | comparable (même pdfFactory 1.64) |

**Pour ces sessions, l'arabe et le français portent le MÊME dessin,
composé par la même chaîne.** Re-mesurer sur l'arabe n'apporte
strictement rien de plus que re-mesurer sur le français. C'est le fait
le plus important de cette section, et c'est celui qui déçoit.

**Trois exceptions, et elles comptent :**

- **SPC 2022 normale** — le sujet **français est un scan** (0 primitive
  vectorielle, 17,4 Mpx, **couche de texte VIDE**) là où l'arabe est
  intégralement vectoriel (3 458 primitives, 16 k de texte). **7 entrées
  K-8 vivent sur cette session** et gagnent une source franchement
  meilleure.
- **SPC 2022 rattrapage** — arabe 13 804 primitives contre 2 989 côté
  français. **6 entrées K-8** concernées.
- **SPC 2021 N et R** — **les deux éditions sont des scans**
  (Adobe Scan / KONICA MINOLTA, 3 à 65 Mpx, texte quasi nul). Le
  gisement n'améliore rien ; c'est le régime le plus dégradé des deux
  séries. **15 entrées K-8** y vivent (8 en N, 7 en R) et restent
  plafonnées par le pixel dans les deux langues.

### 5.3 Le verdict, en une phrase par ligne

- **K-8 n'est pas fermée, et ce gisement ne la fermera pas.** Elle
  demande une **campagne de re-mesure** ; ceci est une prospection de
  sources.
- **Le gain en témoins est de 12 entrées sur 89**, pas de 66. La
  différence entre les deux chiffres est tout l'objet du contrôle
  d'indépendance du § 2.2 — et c'est le résultat le plus utile de cette
  passe, parce qu'il **empêche une campagne future de croire qu'elle
  recoupe alors qu'elle relit**.
- **13 entrées** (SPC 2022 N et R) gagnent, elles, quelque chose de
  réel et d'un autre ordre : une **source matériellement moins
  dégradée** (§ 5.2). Pour 2022 N en particulier, le sujet français est
  un scan sans couche de texte et l'arabe est du vectoriel.
- **1 entrée** (`bk-2010-n-x1`) gagne un corrigé inédit — déjà exploité,
  et confirmé de mes propres yeux ici (§ 3.1).
- **54 entrées ne gagnent qu'une traduction** de ce qu'elles avaient
  déjà. Ce n'est pas rien — un texte arabe peut lever une ambiguïté de
  traduction — mais **ce n'est pas un recoupement**.
- **23 entrées restent hors d'atteinte** : 12 en SPC 2025 (aucun corrigé
  n'existe, dans aucune langue), 11 en maths (hors de ce cours).
- **Et un gain qui n'est pas dans les 89, et qui est peut-être le plus
  net de tous** : cinq épreuves **déjà vérifiées ou converties** —
  PC 2011 N, 2011 R, 2012 N, 2015 N, 2015 R — ont un corrigé qu'elles
  croyaient inexistant. **Trois de leurs fichiers de vérification
  affirment par écrit qu'il n'y en a pas** (« Aucun corrigé n'existe »,
  « Aucun corrigé officiel », et le plafond de preuve de 2015 R limité
  aux blocs 1). Ces affirmations sont désormais fausses. Là, le témoin
  est **inédit** et **son indépendance n'a pas à être discutée** : il
  n'existe rien en face de quoi il pourrait être une traduction.

---

## 6. Ce que cette prospection n'a PAS fait

Nommé, pour que rien ne passe pour acquis.

1. **Aucun fichier du dépôt n'a été modifié**, hors celui-ci. Pas de
   `bank.yaml`, pas de `CENSUS.md`, pas d'`exercises.yaml`, pas de
   `known-issues.md`, pas de commit, pas de push.
2. **Aucun litige n'est tranché.** Les trois valeurs (t½ 2010, F_p 2017,
   F 2019) restent **exactement** où HANDOFF § 6.5 les laisse : à
   l'arbitrage de l'owner. Ce document ajoute des témoins et de la
   provenance ; il ne décide rien.
3. **Aucune transcription.** Aucun des 34 sujets ni des 34 corrigés n'a
   été transcrit. Ce qui est cité l'est en fragments, pour établir un
   fait précis, jamais pour tenir lieu de source.
4. **Aucune lecture phrase à phrase de l'arabe.** Les affirmations
   portent sur des **valeurs, des codes, des barèmes, des titres
   d'exercice et de la géométrie** — c'est-à-dire ce qu'une couche de
   texte et une polyligne établissent sans interprétation. Le corps des
   énoncés n'a pas été lu ligne à ligne. *(C'est la même réserve que
   celle déjà portée par `pc-2010-r.md` § 9.)*
5. **La qualité des corrigés n'a pas été jaugée** — sauf sur les trois
   questions litigieuses. Le précédent de PC 2011 N est le rappel qui
   vaut : un corrigé peut être excellent sur les valeurs et **imprimer
   une demi-équation non équilibrée, corriger un défaut en silence et
   être aveugle au défaut de fond du sujet**. Les 31 corrigés non
   ouverts ici sont des **candidats témoins**, pas des témoins
   qualifiés. *(Et un signal d'alerte à porter au dossier : les corrigés
   `cnee` de 2023 R, 2024 N et 2024 R ne font que **4 pages** pour une
   épreuve de 20 points — contre 8 à 12 ailleurs. Une couverture aussi
   maigre ne peut pas être un témoin de valeurs sur toutes les
   questions.)*
6. **L'indépendance, elle, A été contrôlée** — c'était la réserve la
   plus dangereuse et elle est levée au § 2.2, sur les 34 corrigés
   arabes et les 18 corrigés français en regard. Le résultat a **divisé
   par cinq** le gain apparent (12 entrées au lieu de 66). Ce qui reste
   ouvert est plus étroit : pour **cinq** sessions 🟠 (2020 N, 2020 R,
   2022 R, 2023 R, 2024 N) la conclusion « une seule main » repose sur
   la conjonction des métadonnées et **pas** sur une comparaison de
   contenu. Trois comparaisons de contenu ont été faites (2021 R,
   2023 N, 2024 R) et les trois ont confirmé. Refaire les cinq autres
   coûterait quelques minutes.
7. **Le profil de dégradation (§ 5.2) est structurel, pas figure par
   figure.** Il compte les primitives vectorielles et les pixels du
   **document entier**. Il dit correctement « cette édition porte ses
   figures en vectoriel et celle-là en bitmap » ; il ne dit **pas** que
   telle figure précise est meilleure ici que là. La comparaison
   figure-à-figure n'a été faite que sur **deux** cas : la figure 1 de
   2010 N (§ 3.1) et la figure 4 de 2017 N (§ 3.2).
8. **La section 3331 n'a pas été prospectée.** Elle porte 67 éléments de
   PC pour la filière Sciences Mathématiques — épreuves différentes,
   hors du CENSUS SPC. Elle pourrait intéresser un autre dossier ; elle
   n'a pas été ouverte.
9. **Les 11 entrées de maths de K-8 n'ont reçu aucune attention.**
   `course-311` est un cours de physique-chimie. S'il existe un
   gisement arabophone équivalent pour les maths, il n'a pas été
   cherché.
10. **2025 n'a pas été cherché ailleurs.** Le constat « aucun corrigé
    2025 nulle part » vaut **pour AlloSchool** — les deux séries y ont
    été énumérées élément par élément. Aucun autre agrégateur
    (TelmidTice, talamidi, svt-assilah, taalime…) n'a été interrogé
    dans cette passe, alors que le corpus a déjà tiré des corrigés de
    trois d'entre eux.
11. **Le contrôle « année sur CHAQUE page » n'est pas plein partout.**
    Il est tenu sur 5/6 pages pour 2012 R et 2013 R, sur 4 pages pour
    2017 N, mais sur **1/6 pour 2008 R** et **0/6 pour 2009 R** (couche
    de texte vide). Un panachage de cache sur ces deux-là ne serait pas
    détecté par les contrôles effectués.
