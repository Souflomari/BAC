# Examen national Mathématiques — SM — 2023, session NORMALE (NS 24F) — exercices 1 et 2

> **Fichier d'entrée (`_incoming`) — NON VÉRIFIÉ.** Protocole
> `docs/sujets/maths/README.md`. Rien d'ici ne peut devenir une entrée de
> banque avant qu'un vérificateur **indépendant, qui re-fetche le scan
> lui-même**, ait marqué chaque exercice `Statut: vérifié`.
>
> **Portée volontairement partielle.** Ce fichier ne transcrit que les
> **exercices 1 et 2** (les deux volets d'analyse). Les exercices 3
> (nombres complexes), 4 (arithmétique) et 5 (structures algébriques) sont
> **déjà en banque** — respectivement `bk-2023-n-x3` de
> `nombres-complexes-2`, `bk-2023-n-x4` de `arithmetique`, `bk-2023-n-x5`
> de `structures-algebriques` — et ne doivent surtout pas être reconvertis :
> l'assemblage d'épreuves (`web/src/lib/examens.ts`) somme les
> `bareme_total`, un doublon fausserait le /20.

## Pourquoi ce sujet

L'épreuve **SM 2023 session normale** est assemblée à **10,00/20** dans
Examens blancs : les trois exercices « algèbre » y sont, les deux exercices
d'analyse n'y sont pas. Ce sont eux, et eux seuls, qui manquent. Cinq autres
épreuves SM de session normale sont dans exactement le même cas — c'est le
gisement le plus rentable du corpus, et celui-ci en est le pilote.

## En-tête du scan (p. 1/5, relue)

- الامتحان الوطني الموحد للبكالوريا — المسالك الدولية — **الدورة العادية 2023**
- Code sujet **NS 24F** · مادة : الرياضيات
- شعبة العلوم الرياضية (أ) و (ب) (خيار فرنسية) — **Sciences Mathématiques A et B, option française**
- Durée **4 h** · coefficient **9**
- Source : https://www.alloschool.com/element/142490
- Images : `.../course-436/upload-85316/000{1..5}-big.jpg` (5 pages)

**Consignes (p. 1, transcrites) :** « La durée de l'épreuve est de 4 heures. —
L'épreuve comporte cinq exercices indépendants. — Les exercices peuvent être
traités selon l'ordre choisi par le candidat. » Puis la carte des composantes :

| Exercice | Domaine | Barème |
|---|---|---|
| 1 | analyse | **7,75 pts** |
| 2 | analyse | **2,25 pts** |
| 3 | nombres complexes | 3,5 pts |
| 4 | arithmétique | 3 pts |
| 5 | structures algébriques | 3,5 pts |

Somme : $7{,}75+2{,}25+3{,}5+3+3{,}5 = \mathbf{20}$ ✔

« L'usage de la calculatrice n'est pas autorisé. L'usage de la couleur rouge
n'est pas autorisé. »

## ⚠️ NOTE DE LECTURE — mojibake, et comment il a été adjugé

Ce scan appartient à la même famille que le rattrapage 2023 : il rend mal
certains symboles. **La forme du glyphe cassé ne porte aucune information** ;
chaque occurrence est adjugée par la logique de l'exercice et signalée ici.
Trois familles, toutes rencontrées :

1. **Le symbole $\le$ est rendu par une double virgule « ,, »** dans plusieurs
   inégalités (exercice 1 Partie III questions 2-b et 2-c ; exercice 2
   questions 1-c et 2-a). Adjugé $\le$ : ce sont des majorations, et une
   virgule n'a aucun sens à cet endroit d'une formule. **À reconfirmer au zoom
   par le vérificateur** — c'est la lecture la plus lourde de conséquence du
   fichier, puisqu'elle porte la structure même des questions.
2. **Les lettres ajourées sont cassées.** « $\beta \in$ | |$^+$ » (ex. 1,
   Partie III, q2) est lu $\mathbb{R}^+$ ; « $(S_n)_{n \in\ *}$ » (ex. 2, q2)
   est lu $\mathbb{N}^*$ par cohérence avec la ligne précédente qui écrit
   correctement $n \in \mathbb{N}^*$.
3. Les $\mathbb{N}$ des quantificateurs de l'exercice 1 Partie III sont, eux,
   **rendus correctement** (« $\forall n \in \mathrm{N}$ ») — le mojibake est
   intermittent, ce qui interdit d'en tirer une règle.

Aucune **valeur numérique** n'est touchée par ces trois familles.

---

## 2023 — session normale — Exercice 1
Source: https://www.alloschool.com/element/142490
Statut: **transcrit (NON vérifié)** — première lecture, 2026-08-23. En attente
d'une passe adversariale indépendante avec re-fetch du scan.

- Filière / épreuve : Sciences Mathématiques (A) et (B), option française — Mathématiques, 4 h, coef 9
- Code sujet : NS 24F · Barème de l'exercice : **7,75 points**
- Recompte question par question, relevé dans la marge du scan :
  Partie I $= 0{,}5+0{,}5+0{,}5 = 1{,}5$ ·
  Partie II $= 0{,}5+0{,}25+0{,}25+0{,}5+0{,}75+0{,}5+0{,}25+0{,}25+0{,}75 = 4{,}0$ ·
  Partie III $= 0{,}5+0{,}5+0{,}5+0{,}5+0{,}25 = 2{,}25$ —
  total $1{,}5+4{,}0+2{,}25 = \mathbf{7{,}75}$ ✔ conforme à la carte de la p. 1
- Images lues : `.../0002-big.jpg` (Parties I, II et début de III), `.../0003-big.jpg` (fin de la Partie III)
- Pages du scan : 2 et 3 (sur 5)
- Aucune figure n'est imprimée : la question 5-b demande au candidat de **construire** la courbe, elle ne lui en donne aucune.

**EXERCICE 1 (7,75 points)**

**Partie I**

1. **a)** *(0,5)* Montrer que : $\forall t \in [0, +\infty[\ ;\quad \dfrac{4}{(2+t)^2} \le \dfrac{1}{1+t} \le \dfrac{1}{2}\left(1 + \dfrac{1}{(1+t)^2}\right)$

   **b)** *(0,5)* En déduire que : $\forall x \in [0, +\infty[\ ;\quad \dfrac{2x}{2+x} \le \ln(1+x) \le \dfrac{1}{2}\left(\dfrac{x^2+2x}{1+x}\right)$

2. *(0,5)* Soit $g$ la fonction numérique de la variable réelle $x$ définie sur $]0, +\infty[$ par :

   $$g(x) = \frac{\ln(1+x)}{x}$$

   Montrer que : $\displaystyle\lim_{\substack{x \to 0 \\ x > 0}} \frac{g(x) - 1}{x} = \frac{-1}{2}$

**Partie II**

Soit $f$ la fonction numérique de la variable réelle $x$ définie sur $[0, +\infty[$ par :

$$f(0) = 1 \qquad \text{et} \qquad \forall x \in\, ]0, +\infty[\ ;\quad f(x) = g(x)\,e^{-x}$$

On note $(C)$ sa courbe représentative dans un repère orthonormé $(O, \vec{i}, \vec{j})$.

1. *(0,5)* Calculer $\displaystyle\lim_{x \to +\infty} f(x)$ puis interpréter graphiquement le résultat obtenu.

2. **a)** *(0,25)* Montrer que $f$ est continue à droite en $0$.

   **b)** *(0,25)* Vérifier que : $\forall x \in\, ]0, +\infty[\ ;\quad \dfrac{f(x)-1}{x} = \left(\dfrac{e^{-x}-1}{x}\right)g(x) + \left(\dfrac{g(x)-1}{x}\right)$

   **c)** *(0,5)* En déduire que $f$ est dérivable à droite en $0$ et déterminer $f'_d(0)$.

3. *(0,75)* Montrer que $f$ est dérivable sur $]0, +\infty[$ puis que :

   $$\forall x \in\, ]0, +\infty[\ ;\quad f'(x) = \frac{x - (1+x)^2\ln(1+x)}{x^2(1+x)}\,e^{-x}$$

4. **a)** *(0,5)* Montrer que : $\forall x \in\, ]0, +\infty[\ ;\quad -\dfrac{3}{2} < \dfrac{x - (1+x)^2\ln(1+x)}{x^2(1+x)} < 0$

   **b)** *(0,25)* En déduire que : $\forall x \in\, ]0, +\infty[\ ;\quad -\dfrac{3}{2} < f'(x) < 0$

5. **a)** *(0,25)* Dresser le tableau de variations de $f$.

   **b)** *(0,75)* Construire la courbe $(C)$ en faisant apparaître la demi-tangente à droite au point d'abscisse $0$. (On prendra $\|\vec{i}\| = 2\ \text{cm}$.)

**Partie III**

1. *(0,5)* Montrer que l'équation d'inconnue $x$ : $f(x) = 3x$, admet une unique solution $\alpha$ dans $]0, +\infty[$.

2. Soient $\beta \in \mathbb{R}^{+}$ *(glyphe cassé — voir note de lecture)* et $(u_n)_{n \in \mathbb{N}}$ la suite numérique définie par :

   $$u_0 = \beta \qquad \text{et} \qquad \forall n \in \mathbb{N}\ ;\quad u_{n+1} = \frac{1}{3}\,f(u_n)$$

   **a)** *(0,5)* Montrer que : $\forall n \in \mathbb{N}\ ;\ u_n \ge 0$

   **b)** *(0,5)* Montrer que : $\forall n \in \mathbb{N}\ ;\ |u_{n+1} - \alpha| \le \dfrac{1}{2}|u_n - \alpha|$ *(le $\le$ est rendu « ,, » par le scan — voir note de lecture)*

   **c)** *(0,5)* Montrer par récurrence que : $\forall n \in \mathbb{N}\ ;\ |u_n - \alpha| \le \dfrac{1}{2^n}|\beta - \alpha|$ *(idem)*

   **d)** *(0,25)* En déduire que la suite $(u_n)_{n \in \mathbb{N}}$ converge vers $\alpha$.

---

## 2023 — session normale — Exercice 2
Source: https://www.alloschool.com/element/142490
Statut: **transcrit (NON vérifié)** — première lecture, 2026-08-23. En attente
d'une passe adversariale indépendante avec re-fetch du scan.

- Filière / épreuve : Sciences Mathématiques (A) et (B), option française — Mathématiques, 4 h, coef 9
- Code sujet : NS 24F · Barème de l'exercice : **2,25 points**
- Recompte question par question, relevé dans la marge du scan :
  $0{,}5 + 0{,}25 + 0{,}5 + 0{,}5 + 0{,}5 = \mathbf{2{,}25}$ ✔
- Images lues : `.../0003-big.jpg`
- Page du scan : 3 (sur 5)
- Aucune figure n'est imprimée.

**EXERCICE 2 (2,25 points)**

On considère la fonction numérique : $x \mapsto e^{x}$ et soit $(\Gamma)$ sa courbe représentative dans un repère orthonormé $(O, \vec{i}, \vec{j})$.

Pour tout $n \in \mathbb{N}^{*}$ et pour tout $k \in \{0\,;1\,;\ldots\,;n\}$, on note $M_k$ le point de la courbe $(\Gamma)$ de coordonnées $\left(\dfrac{k}{n}\ ;\ e^{\frac{k}{n}}\right)$.

1. **a)** *(0,5)* Montrer que : $\forall k \in \{0\,;1\,;\ldots\,;(n-1)\}\ \ \exists c_k \in\, \left]\dfrac{k}{n}\,;\dfrac{k+1}{n}\right[$ tel que : $e^{\frac{k+1}{n}} - e^{\frac{k}{n}} = \dfrac{1}{n}\,e^{c_k}$

   **b)** *(0,25)* Montrer que : $\forall k \in \{0\,;1\,;\ldots\,;(n-1)\}\ ;\quad M_kM_{k+1} = \dfrac{1}{n}\sqrt{1 + e^{2c_k}}$

   ($M_kM_{k+1}$ désigne la distance de $M_k$ à $M_{k+1}$)

   **c)** *(0,5)* En déduire que : $\forall k \in \{0\,;1\,;\ldots\,;(n-1)\}\ ;\quad \dfrac{1}{n}\sqrt{1 + e^{\frac{2k}{n}}} \le M_kM_{k+1} \le \dfrac{1}{n}\sqrt{1 + e^{\frac{2(k+1)}{n}}}$ *(les deux $\le$ sont rendus « ,, » par le scan — voir note de lecture)*

2. Soit $(S_n)_{n \in \mathbb{N}^{*}}$ *(glyphe cassé — voir note de lecture)* la suite numérique définie par : $\forall n \in \mathbb{N}^{*}\ ;\quad S_n = \displaystyle\sum_{k=0}^{n-1} M_kM_{k+1}$

   **a)** *(0,5)* Vérifier que : $\forall n \in \mathbb{N}^{*}\ ;\quad \dfrac{1}{n}\displaystyle\sum_{k=0}^{n-1}\sqrt{1 + e^{\frac{2k}{n}}} \le S_n \le \dfrac{1}{n}\displaystyle\sum_{k=1}^{n}\sqrt{1 + e^{\frac{2k}{n}}}$ *(idem)*

   **b)** *(0,5)* En déduire que : $\displaystyle\lim_{n \to +\infty} S_n = \int_0^1 \sqrt{1 + e^{2x}}\ dx$

---

## Classement proposé (à confirmer par le vérificateur)

Correspondance vers les slugs `content/maths/`. **Non contrôlée contre
l'arborescence réelle par cette passe** — le vérificateur doit le faire.

| Exercice | Barème | Slug proposé |
|---|---|---|
| Exercice 1 | 7,75 pts | **`fonction-logarithme`** (dominant : tout l'exercice tourne autour de $g(x)=\ln(1+x)/x$ et de son encadrement) · cross-lists : `limites-continuite` (Partie I-2, Partie II-1/2a), `derivabilite-etude-fonctions` (Partie II-2c/3/4/5), `suites-numeriques` (Partie III-2), `fonction-exponentielle` (le facteur $e^{-x}$ de $f$) |
| Exercice 2 | 2,25 pts | **`calcul-integral`** (dominant : l'exercice construit une somme de Riemann et conclut sur une intégrale) · cross-lists : `derivabilite-etude-fonctions` (le théorème des accroissements finis porte la question 1-a), `suites-numeriques` (l'encadrement et le passage à la limite) |

**Point d'attention pour le classement de l'exercice 2 :** la question 1-a est
une application directe du **théorème des accroissements finis** à
$x \mapsto e^x$ sur $\left[\frac{k}{n}, \frac{k+1}{n}\right]$. Le docket de
complétude (`docs/audits/lesson-completeness-docket.md`, catégorie C) note que
Rolle et le TAF sont **spécifiques SM** et volontairement non promus au rang de
rung dans `derivabilite-etude-fonctions`. Ce sujet étant SM, l'usage est
légitime — mais il faudra le ponter au point d'usage dans le `reasoning`, comme
le corpus le fait déjà ailleurs, et non le supposer acquis.

## Ce que la vérification devra trancher en priorité

1. **Les cinq occurrences de « ,, » lues $\le$** (ex. 1 III-2b, III-2c ; ex. 2
   1-c ×2, 2-a ×2). C'est la lecture la plus structurante du fichier.
2. **Le « $\beta \in$ | |$^+$ »** de l'exercice 1, lu $\mathbb{R}^{+}$. Vérifier
   qu'il ne s'agit pas de $\mathbb{R}^{+*}$ — la différence compte, puisque
   $\beta = 0$ est alors un cas limite de la suite.
3. **Les exposants de l'exercice 2**, au zoom : $e^{\frac{2k}{n}}$ contre
   $e^{\frac{2(k+1)}{n}}$ en 1-c, et les bornes de sommation $k=0 \to n-1$
   contre $k=1 \to n$ en 2-a. Ce sont deux paires qui se ressemblent et dont
   l'inversion casserait l'encadrement.
4. **Le facteur $\frac{1}{3}$** de la relation de récurrence $u_{n+1} = \frac13 f(u_n)$,
   et le $3x$ de l'équation $f(x) = 3x$ — les deux doivent se répondre.
5. **La re-dérivation mathématique complète**, exercice par exercice, comme la
   campagne rattrapage l'a fait : chaque identité imprimée doit se vérifier.
