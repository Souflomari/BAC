# Examen national Mathématiques — SM — 2025, session NORMALE (NS 24F) — exercice 1

> **Fichier d'entrée (`_incoming`) — exercice 1 VÉRIFIÉ le 2026-08-27.**
> Protocole `docs/sujets/maths/README.md`. La passe adversariale indépendante
> (re-fetch du scan + re-dérivation) a eu lieu : voir `Statut:` plus bas et la
> section **« Ce que la vérification a trouvé »** en fin de fichier. Verdict :
> **transcription fidèle, aucune divergence sur l'énoncé**. Deux arbitrages
> owner restent ouverts avant conversion (slug dominant / partitionnement, et
> réutilisation du pontage `arctan` existant).
>
> ⚠ **Lire d'abord l'alerte « fetch empoisonné »** en fin d'en-tête : cette
> source a servi le sujet d'une **autre année** au premier téléchargement.
>
> **Portée volontairement partielle.** Ce fichier ne transcrit que
> l'**exercice 1** (le problème d'analyse, 10 pts). Les exercices 2
> (nombres complexes), 3 (arithmétique) et 4 (structures algébriques) sont
> **déjà en banque** — `bk-2025-n-x2` de `nombres-complexes-2`,
> `bk-2025-n-x3` de `arithmetique`, `bk-2025-n-x4` de
> `structures-algebriques` — et ne doivent surtout pas être reconvertis :
> l'assemblage d'épreuves (`web/src/lib/examens.ts`) somme les
> `bareme_total`, un doublon fausserait le /20.

## Pourquoi ce sujet

L'épreuve **SM 2025 session normale** est assemblée à **10,00/20** dans
Examens blancs. Cet exercice vaut exactement les 10 points qui manquent.
Troisième pièce du gisement SM, après 2023 N et 2024 N transcrits en parallèle.

## En-tête du scan (relu)

- الامتحان الوطني الموحد للبكالوريا — **الدورة العادية 2025**
- Code sujet **NS - 24F** · مادة : الرياضيات
- شعبة العلوم الرياضية (أ) و (ب) (خيار فرنسية) — **Sciences Mathématiques A et B, option française**
- Durée **4 h** · coefficient **9**
- Source : https://www.alloschool.com/element/145783
- Images : `.../course-436/upload-87482/000{1..6}-big.jpg` (**6 fichiers**) —
  chemin **re-dérivé du HTML** par le vérificateur et confirmé. Empreintes MD5
  des six pages authentiques, à comparer avant toute relecture (voir l'alerte
  « fetch empoisonné » ci-dessous) :
  `0001` `1540741fd5259d81798ff3affbd17aaf` ·
  `0002` `07b0b8cbf5338ad7867506836ff02604` ·
  `0003` `1b4991811d66436a282a449608fcb01d` ·
  `0004` `14afb162b17bae35fb4079b29795a35d` ·
  `0005` `4a05b9d2f478e31657a5990827e90000` ·
  `0006` `5fcf9452782f5640cf12bfba7a4c2f0f`

> **⚠ ALERTE VÉRIFICATEUR — le fetch de cette source peut renvoyer un AUTRE
> sujet.** Découvert pendant cette passe. Le **premier** fetch de
> `element/145783` a renvoyé, depuis le cache CDN d'AlloSchool, la page du
> sujet **SM 2022 session normale** : `<title>` et `<h1>` « … 2022 Normale »,
> PDF `…-2022-normale-sujet.pdf`, images `course-436/upload-84506/000{1..5}`
> (5 fichiers, `0006` → HTTP 404). Le même incident a touché les **images** :
> `upload-87482/0001`, `0002` et `0003` ont d'abord été servies avec le
> **contenu 2022** (pages à mojibake, exercice en $\ln(1+x)$, $F(x)=\int_x^1
> f(t)\,dt$, EXERCICE2 en $j=e^{i2\pi/3}$), alors que `0004`–`0006` étaient
> correctes. Un re-téléchargement a rendu les six pages 2025, **stables**
> (deux téléchargements successifs identiques, et 8 fetches consécutifs du
> HTML renvoyant tous « 2025 Normale »).
>
> **Conséquence de méthode :** un vérificateur qui fetche **une seule fois**
> et ne recoupe pas peut relire, en toute bonne foi, le sujet d'une **autre
> année** — c'est exactement le mode d'échec « un fichier entier qui décrivait
> un autre sujet » du registre projet. **Contrôler systématiquement l'année
> imprimée dans le bandeau de chaque page** (et, ici, les MD5 ci-dessus)
> avant de lire quoi que ce soit.

**Deux particularités de pagination, à ne pas prendre pour des erreurs :**

1. Le scan compte **six fichiers image** mais la pagination interne annonce
   « 1/5 », « 2/5 », etc. Le **premier fichier est une page de couverture**
   (armoiries, « الدورة العادية 2025 » en rouge, code NS 24F) qui ne porte
   pas de numéro de page. Les consignes sont donc sur le **fichier 2**, qui
   se numérote lui-même « 1/5 ». **Décalage constant de un** entre numéro de
   fichier et numéro de page imprimé.
2. L'organisme émetteur imprimé change par rapport aux années précédentes :
   « المركز الوطني للامتحانات المدرسية وتقييم التعلمات » au lieu de
   « المركز الوطني للتقويم والامتحانات ». Relevé, sans conséquence.

**Consignes (fichier 2, transcrites) :** « La durée de l'épreuve est de 4
heures. — L'épreuve comporte **quatre** exercices indépendants. — Les exercices
peuvent être traités selon l'ordre choisi par le candidat. » Puis la carte des
composantes :

| Exercice | Domaine | Barème |
|---|---|---|
| 1 | analyse | **10 pts** |
| 2 | nombres complexes | 3,5 pts |
| 3 | arithmétique | 3 pts |
| 4 | structures algébriques | 3,5 pts |

Somme : $10+3{,}5+3+3{,}5 = \mathbf{20}$ ✔

**À noter :** ce sujet ne comporte que **quatre** exercices, là où 2023 N et
2024 N en comptaient cinq (deux volets d'analyse au lieu d'un). L'analyse y
est donc concentrée en un seul problème de 10 points.

« L'usage de la calculatrice n'est pas autorisé. L'usage de la couleur rouge
n'est pas autorisé. »

## NOTE DE LECTURE — pas de mojibake sur ce scan

Comme le sujet 2024 et contrairement aux deux sujets 2023, ce scan rend
**correctement** les lettres ajourées ($\mathbb{R}$, $\mathbb{N}$,
$\mathbb{N}^*$, $\mathbb{C}$) et le symbole $\le$. Aucune adjudication de
glyphe n'a été nécessaire. **CONFIRMÉ par le vérificateur** au zoom ×2 sur la
page 2/5 authentique : $\mathbb{R}$, $\forall$, $\in$, $\le$ et $\cong$ sont
tous rendus proprement. À noter, comme contre-épreuve involontaire : les pages
**2022** servies par erreur au premier fetch (voir l'alerte plus haut), elles,
sont **massivement mojibakées** ($\forall\to$ `"`, $\in\to$ `Î`, $\mathbb{N}\to$
`¥`, $\le\to$ `£`, $\to\ \to$ `®`) — ce qui confirme au passage que le mojibake
est une propriété du **fichier source**, pas du pipeline de lecture.

---

## 2025 — session normale — Exercice 1
Source: https://www.alloschool.com/element/145783
Statut: vérifié — re-fetch indépendant + re-dérivation (vérificateur adversarial, 2026-08-27)

> **Correction du vérificateur.** Sur le **corps de l'énoncé, aucune
> divergence** : les trois parties, les 23 questions, tous les quantificateurs,
> bornes, indices et exposants, et les douze marques de barème de la marge
> correspondent caractère pour caractère au scan. Les sept points signalés
> comme fragiles sont **tous confirmés tels que transcrits**. Trois éléments
> ont malgré tout été corrigés ou requalifiés :
>
> 1. **Séparateur décimal — normalisation non signalée (corrigée en note).**
>    Le scan imprime les décimales avec un **point** : barème `0.25` / `0.5` /
>    `1`, valeurs approchées `≅ 0.30` et `≅ 0.27`, carte des composantes
>    `(3.5 pts)` / `(3 pts)`. La transcription les rend partout avec une
>    **virgule** française ($0{,}25$, $0{,}30$, $3{,}5$). C'est sémantiquement
>    neutre et conforme à l'usage du dépôt, donc la virgule est **conservée** —
>    mais la divergence est nommée ici plutôt que lissée, parce qu'elle porte
>    sur des glyphes réellement imprimés. Mesure : lecture au zoom ×4 des deux
>    valeurs de I-3 et de la colonne de marge des pages 2/5 et 3/5.
> 2. **`arctan` — la lacune est réelle, mais le précédent existe déjà.** Le
>    point 2 de la liste ci-dessous dit qu'`arctan` n'a « aucun rung dans le
>    corpus ». **Exact et vérifié** (grep : aucune occurrence dans
>    `content/maths/*/lesson.md` ni dans aucun `items.yaml`). Mais il est
>    **inexact d'en conclure qu'il n'y a pas de précédent** : `bk-2024-r-x2`
>    dans `content/maths/calcul-integral/bank.yaml` **ponte déjà `arctan` au
>    point d'usage** — et les sommes de Riemann avec — et les SCOPE NOTES en
>    tête de ce fichier documentent la lacune avec une mention
>    « ARBITRAGE OWNER ». La conversion doit **réutiliser ce pontage**, pas en
>    inventer un second. Détail au § final.
> 3. **Source instable — voir l'alerte en tête de fichier.** Le premier fetch
>    de `element/145783` a renvoyé le sujet **2022**, images comprises. Rien
>    n'en a découlé dans la transcription (qui est fidèle au sujet 2025), mais
>    l'en-tête porte désormais les MD5 des six pages authentiques.

- Filière / épreuve : Sciences Mathématiques (A) et (B), option française — Mathématiques, 4 h, coef 9
- Code sujet : NS - 24F · Barème de l'exercice : **10 points**
- Recompte question par question, relevé dans la marge du scan :
  Partie I $= 0{,}25+0{,}25+0{,}5+0{,}5+0{,}5+1+0{,}5+0{,}5+0{,}25+0{,}25+0{,}5+0{,}25 = 5{,}25$ ·
  Partie II $= 0{,}5+0{,}5+0{,}25+0{,}5+0{,}5+0{,}5+0{,}5+0{,}25 = 3{,}5$ ·
  Partie III $= 0{,}25+0{,}5+0{,}5 = 1{,}25$ —
  total $5{,}25+3{,}5+1{,}25 = \mathbf{10}$ ✔ conforme à la carte des composantes
- Images lues : fichiers `0003-big.jpg` (pagination « 2/5 » : Partie I et début de la Partie II) et `0004-big.jpg` (pagination « 3/5 » : fin de la Partie II et Partie III) — **décalage de pagination confirmé par le vérificateur**, voir § final
- Aucune figure n'est imprimée : la question 3 de la Partie I demande au candidat de **représenter** la courbe.

**EXERCICE 1 (10 points)**

On considère la fonction numérique $f$ définie sur $\mathbb{R}$ par : $f(x) = \dfrac{e^{x}}{e^{2x} + e}$

et soit $(\Gamma)$ sa courbe représentative dans un repère **orthogonal** $(O\,;\vec{i}, \vec{j})$.

**Partie I**

1. **a)** *(0,25)* Montrer que : $(\forall x \in \mathbb{R})\ ;\quad f(1-x) = f(x)$

   **b)** *(0,25)* Interpréter graphiquement le résultat obtenu.

   **c)** *(0,5)* Calculer $\displaystyle\lim_{x \to -\infty} f(x)$ puis en déduire $\displaystyle\lim_{x \to +\infty} f(x)$

   **d)** *(0,5)* Interpréter graphiquement les deux résultats obtenus.

2. **a)** *(0,5)* Montrer que : $(\forall x \in \mathbb{R})\ ;\quad f'(x) = f(x)\,\dfrac{1 - e^{2x-1}}{1 + e^{2x-1}}$

   **b)** *(1)* Donner les variations de $f$ puis en déduire que :

   $$(\forall x \in \mathbb{R})\ ;\qquad 0 < f(x) < \frac{1}{2}$$

3. *(0,5)* Représenter graphiquement la courbe $(\Gamma)$.

   *(On prendra $\|\vec{i}\| = 1\,cm$, $\|\vec{j}\| = 2\,cm$ et $\dfrac{1}{2\sqrt{e}} \cong 0{,}30$ et $\dfrac{1}{1+e} \cong 0{,}27$)*

4. **a)** *(0,5)* Montrer que : $\displaystyle\int_0^{\frac{1}{2}} f(x)\,dx = \int_{\frac{1}{2}}^{1} f(x)\,dx$

   **b)** *(0,25)* En déduire que $\displaystyle\int_0^{1} f(x)\,dx = 2\int_0^{\frac{1}{2}} f(x)\,dx$

5. **a)** *(0,25)* En effectuant le changement de variables : $t = e^{x}$, montrer que :

   $$\int_0^{\frac{1}{2}} f(x)\,dx = \int_1^{\sqrt{e}} \frac{dt}{t^2 + e}$$

   **b)** *(0,5)* Montrer que : $\displaystyle\int_0^{\frac{1}{2}} f(x)\,dx = \dfrac{1}{\sqrt{e}}\left(\arctan\left(\sqrt{e}\right) - \dfrac{\pi}{4}\right)$

   **c)** *(0,25)* En déduire l'aire, en $\text{cm}^2$, du domaine plan délimité par $(\Gamma)$, les droites d'équations respectives : $x = 0$, $x = 1$ et $y = 0$

**Partie II**

On considère la suite $(u_n)_{n \in \mathbb{N}}$ définie par : $u_0 \in\, \left]0\,;\dfrac{1}{2}\right[$ et $(\forall n \in \mathbb{N})\ ;\quad u_{n+1} = f(u_n)$

1. *(0,5)* En utilisant le résultat de la question I.2-a), montrer que :

   $$(\forall x \in \mathbb{R})\ ;\quad |f'(x)| \le f(x)$$

2. **a)** *(0,5)* Montrer que : $\left(\forall x \in \left[0\,;\dfrac{1}{2}\right]\right)\ ;\quad 0 \le f'(x) < \dfrac{1}{2}$

   **b)** *(0,25)* Montrer que la fonction $g : x \mapsto g(x) = f(x) - x$ est strictement décroissante sur $\mathbb{R}$

   **c)** *(0,5)* En déduire qu'il existe un unique réel $\alpha \in\, \left]0\,;\dfrac{1}{2}\right[$ tel que : $f(\alpha) = \alpha$

3. **a)** *(0,5)* Montrer que : $(\forall n \in \mathbb{N})\ ;\quad 0 < u_n < \dfrac{1}{2}$

   **b)** *(0,5)* Montrer que : $(\forall n \in \mathbb{N})\ ;\quad |u_{n+1} - \alpha| \le \dfrac{1}{2}|u_n - \alpha|$

   **c)** *(0,5)* Montrer par récurrence que : $(\forall n \in \mathbb{N})\ ;\quad |u_n - \alpha| \le \left(\dfrac{1}{2}\right)^{n+1}$

   **d)** *(0,25)* En déduire que la suite $(u_n)_{n \in \mathbb{N}}$ converge vers $\alpha$

**Partie III**

On considère la suite numérique $(S_n)_{n \in \mathbb{N}}$ définie par :

$$(\forall n \in \mathbb{N}^{*})\ ;\qquad S_n = \frac{1}{n(n+1)}\sum_{k=1}^{k=n} \frac{k}{e^{\frac{k}{n}} + e^{\frac{n-k}{n}}}$$

1. **a)** *(0,25)* Vérifier que : $(\forall n \in \mathbb{N}^{*})\ ;\quad S_n = \dfrac{1}{n+1}\displaystyle\sum_{k=1}^{k=n} \dfrac{k}{n}\,f\!\left(\dfrac{k}{n}\right)$

   **b)** *(0,5)* Montrer que : $\displaystyle\int_0^{1} x\,f(x)\,dx = \int_0^{\frac{1}{2}} f(x)\,dx$

   *(On pourra effectuer le changement de variables : $t = 1 - x$)*

2. *(0,5)* Montrer que la suite $(S_n)_{n \in \mathbb{N}}$ est convergente et déterminer sa limite.

---

## Classement — **arbitré par le vérificateur**

Correspondance vers les slugs `content/maths/`. **Contrôlée contre
l'arborescence réelle** (`ls content/maths/`, 14 dossiers) : les cinq slugs
cités ci-dessous — `fonction-exponentielle`, `limites-continuite`,
`derivabilite-etude-fonctions`, `calcul-integral`, `suites-numeriques` —
**existent tous**, de même que les trois slugs cités en tête de fichier pour
les exercices 2/3/4 (`nombres-complexes-2`, `arithmetique`,
`structures-algebriques`). Aucun slug fantôme.

| Exercice | Barème | Slug proposé |
|---|---|---|
| Exercice 1 | 10 pts | **`fonction-exponentielle`** (dominant : $f(x)=e^x/(e^{2x}+e)$, et la symétrie $f(1-x)=f(x)$ comme la dérivée sont des faits de l'exponentielle) · cross-lists : `limites-continuite` (Partie I-1c/1d), `derivabilite-etude-fonctions` (Partie I-2, Partie II-2), `calcul-integral` (Partie I-4/5, Partie III-1b), `suites-numeriques` (Parties II-3 et III) |

### L'arbitrage du slug dominant — **tranché : `fonction-exponentielle`**

Le vérificateur tranche, et voici la mesure sur laquelle il tranche. Attribution
des 10 points question par question, chaque question versée à la notion dont
elle mobilise réellement l'outil :

| Bloc | Questions | Points |
|---|---|---|
| Étude de la fonction exponentielle (symétrie, limites, dérivée, variations, tracé) | I-1a→1d, I-2a, I-2b, I-3 | **3,5** |
| Suites (récurrence, contraction, convergence, somme de Riemann) | II-3a→3d, III-1a, III-2 | 2,5 |
| Calcul intégral (relation de Chasles/symétrie, changement de variable, primitive, aire) | I-4a, I-4b, I-5a→5c, III-1b | 2,25 |
| Dérivabilité / étude (majoration $|f'|\le f$, TAF, TVI, point fixe) | II-1, II-2a→2c | 1,75 |

**`fonction-exponentielle` est le plus gros bloc unique (3,5/10)** et c'est
aussi l'identité de l'exercice : $f$ *est* une fonction exponentielle, la
symétrie $f(1-x)=f(x)$, l'expression de $f'$ via $e^{2x-1}$ et le maximum
$\frac{1}{2\sqrt e}$ sont tous des faits d'exponentielle. C'est le slug
dominant.

**Mais deux réserves, qui sont des arbitrages owner et non des lectures :**

1. **Aucun bloc n'atteint la moitié** — l'exercice est authentiquement
   composite. Le précédent `bk-2022-n-x4` (partitionné entre deux banques)
   montre que le dépôt sait découper un gros exercice. À 10 points pour une
   seule carte, **le partitionnement mérite d'être considéré** ; c'est une
   décision de produit, pas de transcription.
2. **Les deux outils les plus durs de l'exercice — la primitive $\arctan$ et la
   somme de Riemann — appartiennent à `calcul-integral`**, et y sont *déjà*
   pontés par `bk-2024-r-x2`. Quel que soit le slug dominant retenu, la
   conversion doit **réutiliser ce pontage existant**. Si l'owner préfère
   regrouper les deux exercices SM « Riemann + arctan » au même endroit,
   `calcul-integral` devient le choix défendable — au prix de loger sous une
   leçon calibrée SExp un exercice dont 3,5 points sont de l'exponentielle pure.

## Ce que la vérification devait trancher en priorité (liste du transcripteur)

*Conservée telle quelle comme trace de ce qui avait été signalé. Le verdict
point par point est dans la section suivante.*

1. **L'exposant $2x-1$** de la dérivée en I-2a : le scan porte
   $\dfrac{1-e^{2x-1}}{1+e^{2x-1}}$. Vérifier que ce n'est pas $2x+1$ — c'est
   la question qui porte toute la Partie I et une bonne part de la Partie II
   (elle est rappelée nommément en II-1).
2. **L'apparition de $\arctan$** en I-5b. Cette fonction est **spécifique à la
   filière SM** et n'a, à ma connaissance, aucun rung dans le corpus. Vérifier
   la lecture, puis signaler la lacune : si l'exercice est converti, il faudra
   ponter $\arctan$ au point d'usage — comme le corpus le fait déjà pour Rolle
   et le théorème des accroissements finis.
3. **Les deux valeurs approchées données en I-3** : $\frac{1}{2\sqrt e} \cong 0{,}30$
   et $\frac{1}{1+e} \cong 0{,}27$. Recalculer : $\frac{1}{2\sqrt e} = 0{,}3033$
   et $\frac{1}{1+e} = 0{,}2689$ — cohérent, mais à confirmer au zoom (le
   symbole est bien $\cong$ et non $=$).
4. **L'exposant $n+1$** de la majoration en II-3c : le scan porte
   $\left(\frac12\right)^{n+1}$ **sans facteur** $|u_0 - \alpha|$, là où les
   sujets 2023 N et 2024 N écrivent tous deux une majoration **avec** le
   facteur initial. C'est une différence réelle entre les trois sujets, et
   elle est logique ici puisque $|u_0-\alpha| < \frac12$ — mais elle mérite
   une relecture attentive, c'est exactement le genre d'endroit où un
   transcripteur normalise sans s'en rendre compte.
5. **La double sommation de la Partie III** : le dénominateur porte
   $e^{\frac{k}{n}} + e^{\frac{n-k}{n}}$ — vérifier l'exposant $\frac{n-k}{n}$
   du second terme, et le facteur $\frac{1}{n(n+1)}$ devant la somme, qui
   devient $\frac{1}{n+1}$ après réécriture en 1-a.
6. **Le recompte du barème**, dans la marge, partie par partie.
7. **La re-dérivation mathématique complète.** Points à refaire absolument :
   la symétrie $f(1-x)=f(x)$ (I-1a) ; l'expression de $f'$ (I-2a) ;
   l'inégalité $|f'(x)| \le f(x)$ (II-1), qui découle de I-2a par
   $\left|\frac{1-u}{1+u}\right| \le 1$ ; la réécriture de $S_n$ (III-1a) ; et
   le changement de variable $t = 1-x$ de III-1b, dont le résultat doit se
   recouper avec I-4a.

---

## Ce que la vérification a trouvé

**Passe adversariale indépendante, 2026-08-27.** Second lecteur, mandat de
chercher l'erreur. Scan **re-fetché et relu par le vérificateur**, jamais par
relecture du texte transcrit.

### Ce qui a été re-fetché, et comment

- `curl` sur `https://www.alloschool.com/element/145783`, URLs d'images
  **re-dérivées du HTML** (motif `course-<X>/upload-<Y>/000k-big.jpg`), six
  fichiers téléchargés, MD5 relevés (en tête de fichier).
- **Trois instruments croisés sur chaque point critique**, précisément parce
  que la lecture visuelle seule s'est révélée faillible (voir l'incident
  ci-dessous) : (1) lecture visuelle des pages en bandes à ×2 ; (2) **zoom ×4**
  sur chaque formule fragile ; (3) **OCR (`tesseract`)** page entière et par
  découpe, comme contrôle mécanique indépendant de l'œil ; (4) pour les
  identités, **re-dérivation symbolique + vérification numérique** en Python.

### L'incident de fetch — le défaut le plus important trouvé par cette passe

Il ne porte pas sur la transcription mais sur la **source**, et il a failli
produire une fausse validation :

- Le **premier** fetch de `element/145783` a renvoyé le sujet **SM 2022 N**
  (`<title>`/`<h1>` « 2022 Normale », PDF `…-2022-normale-sujet.pdf`, images
  `upload-84506`, 5 fichiers). Les images `upload-87482/0001`–`0003` ont
  elles aussi été servies avec le **contenu 2022**.
- Sur ces pages 2022 servies à la place des pages 2025, une lecture visuelle a
  d'abord « retrouvé » l'énoncé 2025 attendu — c'est-à-dire **le texte de la
  transcription, pas celui du scan**. C'est l'OCR qui a cassé l'illusion, en
  rendant un exercice en $\ln(1+x)$ et $F(x)=\int_x^1 f(t)\,dt$ truffé de
  mojibake. Re-téléchargement → six pages 2025, stables et cohérentes.
- **Leçon de méthode, à porter au protocole :** relire un scan en ayant la
  transcription sous les yeux expose à confirmer ce qu'on s'attend à voir. Le
  garde-fou qui a fonctionné est un **instrument non visuel (OCR)** et le
  **contrôle de l'année imprimée sur chaque page**. Les MD5 sont désormais au
  dossier pour rendre l'incident détectable en une commande.

### Le décalage de pagination — **CONFIRMÉ**

C'était le premier point à trancher, tout le reste en dépendant. Vérifié en
découpant le cartouche « الصفحة » des cinq pages numérotées et en les lisant
côte à côte :

| Fichier | Pagination imprimée | Contenu |
|---|---|---|
| `0001` | **aucune** (couverture) | armoiries, الدورة العادية 2025 (rouge), **NS · 24F** |
| `0002` | 1/5 | CONSIGNES + carte des composantes |
| `0003` | 2/5 | **EXERCICE1 : Partie I complète + Partie II jusqu'à 2-a)** |
| `0004` | 3/5 | **fin Partie II (2-b→3-d) + Partie III** puis EXERCICE2 |
| `0005` | 4/5 | EXERCICE2, Partie II |
| `0006` | 5/5 | EXERCICE4 |

**Décalage constant de un confirmé.** L'exercice 1 est bien sur `0003` et
`0004`. En-tête confirmé sur la couverture authentique : **NS · 24F**, الدورة
**العادية** 2025, شعبة العلوم الرياضية (أ) و (ب) (خيار فرنسية), 4 h, coef 9, et
l'organisme **المركز الوطني للامتحانات المدرسية وتقييم التعلمات** — la
particularité n° 2 de l'en-tête est exacte. Consignes confirmées :
**quatre** exercices, 10 + 3.5 + 3 + 3.5 = 20.

### Les sept points fragiles — verdict

1. **Exposant $2x-1$ (I-2a) — CONFIRMÉ, et doublement.** Zoom ×4 : les deux
   occurrences portent sans ambiguïté $e^{2x-1}$ (signe moins net au
   numérateur *et* au dénominateur) ; l'OCR rend `2x—1`. **Et la vérification
   numérique tranche seule** : avec $2x-1$ l'écart à $f'$ est $2{,}8\times
   10^{-11}$ (plancher de la différence finie), avec $2x+1$ il est de
   $0{,}259$. La lecture $2x+1$ est **réfutée**, pas seulement écartée.
2. **`arctan` (I-5b) — CONFIRMÉ.** Zoom ×4 sur la page authentique :
   $\int_0^{1/2} f = \frac{1}{\sqrt e}\left(\arctan(\sqrt e)-\frac{\pi}{4}\right)$,
   « arctan » en romain. **Contrôle corpus fait (grep) :** aucune occurrence
   d'`arctan` dans `content/maths/*/lesson.md` ni dans aucun `items.yaml` — la
   lacune affirmée par le transcripteur est **réelle**. Mais elle est **déjà
   documentée et déjà pontée** ailleurs : `content/maths/calcul-integral/bank.yaml`
   porte, en tête, une SCOPE NOTE « ARCTAN — ABSENT DU CORPUS ENTIER » avec
   arbitrage owner, et l'entrée `bk-2024-r-x2` énonce au point d'usage
   $(\arctan x)' = \frac{1}{1+x^2}$ et $\arctan(1)=\frac{\pi}{4}$. **La
   conversion doit réutiliser ce pontage, pas en créer un second.**
3. **Valeurs approchées de I-3 — CONFIRMÉES**, symbole compris. Le scan porte
   bien $\cong$ (tilde sur égal) et **non** $=$. Recalcul :
   $\frac{1}{2\sqrt e} = 0{,}303265\ldots \to 0{,}30$ ✔ et
   $\frac{1}{1+e} = 0{,}268941\ldots \to 0{,}27$ ✔. Les deux valeurs ne sont
   pas décoratives : $\frac{1}{2\sqrt e} = f(\tfrac12)$ est le **maximum** de
   $f$ et $\frac{1}{1+e} = f(0) = f(1)$ les **deux extrémités** — de quoi
   placer le tracé. Cohérence interne parfaite.
4. **Majoration de II-3c — CONFIRMÉE telle que transcrite.** Zoom ×4 : le scan
   porte $\left(\frac12\right)^{n+1}$ **sans** facteur $|u_0-\alpha|$, l'OCR
   le corrobore. Le transcripteur avait raison de se méfier, et raison sur le
   fond : **la différence avec 2023 N et 2024 N est réelle**, et elle est
   licite ici parce que $u_0$ et $\alpha$ vivent tous deux dans
   $\left]0;\frac12\right[$, donc $|u_0-\alpha| < \frac12$ amorce la récurrence.
   Vérifié numériquement sur 40 rangs.
5. **Partie III — CONFIRMÉE.** Dénominateur $e^{\frac kn} + e^{\frac{n-k}{n}}$
   et facteur $\frac{1}{n(n+1)}$ lus au zoom et à l'OCR.
6. **Barème — RECOMPTÉ sur le scan**, marque par marque, colonne de marge des
   pages 2/5 et 3/5 : Partie I $0{,}25{+}0{,}25{+}0{,}5{+}0{,}5{+}0{,}5{+}1{+}0{,}5{+}0{,}5{+}0{,}25{+}0{,}25{+}0{,}5{+}0{,}25 = 5{,}25$ ·
   Partie II $= 3{,}5$ · Partie III $= 1{,}25$ · **total 10** ✔. Identique à la
   transcription, et conforme à la carte des composantes.
7. **Re-dérivation mathématique — FAITE** (section suivante).

### La re-dérivation : l'exercice est sain et entièrement soluble

Chaque identité imprimée a été refaite à la main puis contrôlée numériquement.

- **I-1a** $f(1-x)=f(x)$ : tombe par calcul direct —
  $f(1-x)=\frac{e^{1-x}}{e^{2-2x}+e}=\frac{e^{-x}}{e^{1-2x}+1}$, puis
  multiplication haut et bas par $e^{2x}$ donne $\frac{e^x}{e+e^{2x}}$. Écart
  numérique max $2{,}8\times10^{-17}$. Interprétation : $(\Gamma)$ symétrique
  par rapport à la droite $x=\frac12$ — ce qui **fonde** I-1c (« en déduire »)
  et I-4a.
- **I-2a** : avec $e^{2x-1}=\frac{e^{2x}}{e}$, le facteur imprimé vaut
  $\frac{e-e^{2x}}{e+e^{2x}}$, et le quotient donne
  $f'(x)=\frac{e^x(e-e^{2x})}{(e^{2x}+e)^2}$ — exactement la dérivée. ✔
- **I-2b** : $f' > 0 \iff x<\frac12$ ; maximum $f(\frac12)=\frac{1}{2\sqrt e}
  \approx 0{,}3033 < \frac12$, d'où $0<f(x)<\frac12$ **strict**. ✔
- **I-4a/4b, I-5a** : $t=e^x$ envoie bien $\int_0^{1/2} f$ sur
  $\int_1^{\sqrt e}\frac{dt}{t^2+e}$. ✔
- **I-5b** : $\int\frac{dt}{t^2+e} = \frac{1}{\sqrt e}\arctan\frac{t}{\sqrt e}$
  donne $\frac{1}{\sqrt e}\left(\frac{\pi}{4}-\arctan\frac{1}{\sqrt e}\right)$,
  **égal** à la forme imprimée par $\arctan u + \arctan\frac1u = \frac{\pi}{2}$.
  L'énoncé est correct, sous une écriture non immédiate. Numériquement :
  $0{,}14568292642022637$ (quadrature) contre $0{,}14568292642022393$
  (forme fermée), écart $2{,}4\times10^{-15}$. ✔
- **I-5c** : le repère est **orthogonal** non normé ($\|\vec i\|=1$ cm,
  $\|\vec j\|=2$ cm), donc l'unité d'aire vaut $2\ \text{cm}^2$ et l'aire est
  $\frac{4}{\sqrt e}\left(\arctan\sqrt e-\frac{\pi}{4}\right)\approx
  0{,}583\ \text{cm}^2$. Le mot « orthogonal » est donc **porteur**, pas
  accidentel — à ne pas « corriger » en orthonormé.
- **II-1** : $|f'| \le f$ découle de I-2a par
  $\left|\frac{1-u}{1+u}\right|\le 1$ pour $u>0$, exactement comme annoncé. ✔
- **II-2b/2c** : $g'=f'-1<0$ car $f'<\frac12$ ; $g(0)=\frac{1}{1+e}>0$ et
  $g(\frac12)=\frac{1}{2\sqrt e}-\frac12<0$, d'où $\alpha$ unique
  $\approx 0{,}29713 \in \left]0;\frac12\right[$. ✔
- **III-1a** : $\frac{n-k}{n}=1-\frac kn$, et
  $f\!\left(\frac kn\right)=\frac{1}{e^{k/n}+e^{1-k/n}}$ — l'identité est
  **exacte** (écart max $1{,}1\times10^{-16}$), et le $\frac1n$ absorbé dans
  $\frac kn$ transforme bien $\frac{1}{n(n+1)}$ en $\frac{1}{n+1}$. ✔
- **III-1b** : $t=1-x$ donne $I=\int_0^1 f - I$, donc
  $I=\frac12\int_0^1 f = \int_0^{1/2} f$ **en se recoupant avec I-4b**, comme
  attendu. ✔
- **III-2** : $S_n=\frac{n}{n+1}T_n$ avec $T_n$ somme de Riemann de
  $\int_0^1 x f(x)dx$ ; limite $=\frac{1}{\sqrt e}\left(\arctan\sqrt
  e-\frac{\pi}{4}\right)\approx 0{,}145683$. Contrôle : $S_{200000} =
  0{,}14568287$. ✔ L'exercice **boucle** : I-5b → III-1b → III-2.

**Verdict : aucune incohérence du sujet officiel.** Toutes les identités
imprimées sont vraies, aucune donnée ne manque, et l'énoncé est intégralement
soluble avec les seuls résultats qu'il fait démontrer en amont.

### Menues particularités du sujet officiel — relevées, non « réparées »

- **$(S_n)_{n\in\mathbb{N}}$ contre $\forall n\in\mathbb{N}^*$.** Le sujet
  écrit l'indice de la suite $n\in\mathbb{N}$ (ligne de définition *et*
  question 2) alors que la formule n'a de sens que pour $n\ge 1$ et est
  quantifiée sur $\mathbb{N}^*$. Coquille de l'énoncé officiel, **reproduite
  fidèlement** par la transcription. À ne pas corriger silencieusement en
  conversion.
- Le barème de I-1c est imprimé « 0. 5 » (espace parasite). Sans conséquence.

### Points restés indécidables

**Aucun.** Chaque élément de l'exercice 1 a été tranché par au moins deux
instruments concordants. Deux limites de périmètre, en revanche, à assumer
explicitement :

- Les **exercices 2, 3 et 4 n'ont pas été audités** — hors périmètre de ce
  fichier, et déjà en banque.
- La conformité des entrées de banque `bk-2025-n-x2/x3/x4` au scan **n'a pas
  été contrôlée** par cette passe.

### Verdict

**Transcription fidèle.** Zéro divergence sur l'énoncé, le barème et l'en-tête.
Le fichier est bon pour la conversion, sous les deux réserves d'arbitrage owner
déjà nommées : le **slug dominant / partitionnement** (§ Classement) et le
**pontage d'`arctan`**, qui doit réutiliser celui de `bk-2024-r-x2`.
