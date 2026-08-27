# Examen national Mathématiques — SM — 2024, session NORMALE (NS 24F) — exercices 1 et 2

> **Fichier d'entrée (`_incoming`) — VÉRIFIÉ le 2026-08-27.** Protocole
> `docs/sujets/maths/README.md`. La passe adversariale indépendante a eu lieu :
> le scan a été **re-fetché et relu** par un second lecteur (URLs d'images
> re-dérivées depuis le HTML, pages téléchargées, images lues au zoom), et
> chaque « montrer que » a été **re-dérivé** à la main. Les deux exercices
> portent `Statut: vérifié`. Trouvailles, méthode et verdict : section
> **« Ce que la vérification a trouvé »** en fin de fichier — à lire avant
> conversion, elle contient une **incohérence du sujet officiel** sur la
> numérotation des exercices 4 et 5.
>
> **Portée volontairement partielle.** Ce fichier ne transcrit que les
> **exercices 1 et 2** (les deux volets d'analyse). Les exercices 3
> (nombres complexes), 4 (arithmétique) et 5 (structures algébriques) sont
> **déjà en banque** — `bk-2024-n-x3` de `nombres-complexes-2`,
> `bk-2024-n-x5` de `arithmetique`, `bk-2024-n-x4` de
> `structures-algebriques` — et ne doivent surtout pas être reconvertis :
> l'assemblage d'épreuves (`web/src/lib/examens.ts`) somme les
> `bareme_total`, un doublon fausserait le /20.

## Pourquoi ce sujet

L'épreuve **SM 2024 session normale** est assemblée à **10,00/20** dans
Examens blancs : les trois exercices « algèbre » y sont, les deux exercices
d'analyse n'y sont pas. Même diagnostic que SM 2023 normale, transcrit en
parallèle : c'est le motif de toutes les épreuves SM de session normale du
corpus.

## En-tête du scan (p. 1/5, relue)

- الامتحان الوطني الموحد للبكالوريا — **الدورة العادية 2024**
- Code sujet **NS 24F** · مادة : الرياضيات
- شعبة العلوم الرياضية (أ) و (ب) (خيار فرنسية) — **Sciences Mathématiques A et B, option française**
- Durée **4 h** · coefficient **9**
- Marqueur « α » imprimé en haut à droite de chaque page.
- Source : https://www.alloschool.com/element/145739
- Images : `.../course-436/upload-87447/000{1..5}-big.jpg` (5 pages)

**Consignes (p. 1, transcrites) :** « La durée de l'épreuve est de 4 heures. —
L'épreuve comporte cinq exercices indépendants. — Les exercices peuvent être
traités selon l'ordre choisi par le candidat. » Puis la carte des composantes,
**reproduite dans l'ordre exact où la page 1 l'imprime** :

| Rang d'impression p. 1 | Libellé imprimé p. 1 | Domaine | Barème |
|---|---|---|---|
| 1er | « L'EXERCICE1 » | analyse | **7,5 pts** |
| 2e | « L'EXERCICE2 » | analyse | **2,5 pts** |
| 3e | « L'EXERCICE3 » | nombres complexes | 3,5 pts |
| 4e | « L'**EXERCICE5** » | structures algébriques | 3,5 pts |
| 5e | « L'**EXERCICE4** » | arithmétique | 3 pts |

Somme : $7{,}5+2{,}5+3{,}5+3{,}5+3 = \mathbf{20}$ ✔

**Détail de transcription à conserver :** la page 1 énumère bien les
composantes dans l'ordre **1, 2, 3, 5, 4** — la ligne « L'EXERCICE5 » est
imprimée *avant* la ligne « L'EXERCICE4 ». Ce n'est pas une erreur de lecture :
c'est ainsi que le scan est imprimé.

> **Correction du vérificateur — en-tête (p. 1) contre corps du sujet.**
> La transcription concluait : « Le corps du sujet, lui, suit l'ordre 1, 2, 3,
> 4, 5 », ce qui laisse croire à un simple caprice de mise en page de la
> couverture. **C'est une lecture trop douce, et le risque est réel.** Le
> désaccord ne porte pas sur l'*ordre des lignes* mais sur **les numéros
> eux-mêmes** : pour les exercices 4 et 5, la page 1 et le corps du sujet
> n'attribuent pas le même numéro au même exercice.
>
> | Domaine (et son barème) | Numéro annoncé p. 1 | Numéro imprimé dans le corps |
> |---|---|---|
> | structures algébriques — loi $T$ sur $\mathbb{C}\times\mathbb{C}^{*}$ (3,5 pts) | EXERCICE**5** | EXERCICE**4** (p. 4) |
> | arithmétique — Fermat, $2024^{192}\,x \equiv 3\ [221]$ (3 pts) | EXERCICE**4** | EXERCICE**5** (p. 5) |
>
> **Comment c'est mesuré.** Re-lecture des cinq pages du scan re-fetché. La
> page 4 imprime en toutes lettres « **EXERCICE4 : (3.5 points)** » au-dessus
> de « On considère dans $\mathbb{C}\times\mathbb{C}^{*}$ la loi de
> composition interne $T$ » ; la page 5 imprime « **EXERCICE5 :( 3 points)** »
> au-dessus de « Soient $p$ et $q$ deux nombres premiers distincts ». Les
> barèmes de marge confirment l'appariement : $0{,}5+0{,}25+0{,}5+0{,}25+0{,}5
> +0{,}5+0{,}5+0{,}5 = 3{,}5$ pour l'exercice de structures (p. 4) et
> $1+0{,}5+0{,}5+1 = 3$ pour l'exercice d'arithmétique (p. 5).
>
> **C'est une incohérence du sujet officiel NS 24F, pas une erreur de
> transcription.** Elle n'est donc pas « réparée » ici : la carte ci-dessus
> reste imprimée telle que la page 1 la porte, et cette note dit où elle
> ment. Le total /20 n'en souffre pas — les couples domaine↔barème sont
> corrects des deux côtés, seuls les numéros sont croisés.
>
> **Conséquence pratique pour la conversion.** La banque suit la numérotation
> **du corps**, et a raison de le faire : `bk-2024-n-x4` est bien dans
> `content/maths/structures-algebriques/bank.yaml` (« loi interne T sur
> C×C\* ») et `bk-2024-n-x5` bien dans `content/maths/arithmetique/bank.yaml`
> (« Fermat […] résolution modulo 221 ») — les deux vérifiés à la lecture des
> `bank.yaml`. Le cartouche en tête de ce fichier est donc **juste**.
> Quiconque convertira plus tard ne doit **pas** se fier à la colonne
> « numéro » de la carte de la page 1.

« L'usage de la calculatrice n'est pas autorisé. L'usage de la couleur rouge
n'est pas autorisé. »

## NOTE DE LECTURE — pas de mojibake sur ce scan — **CONFIRMÉ**

Contrairement au sujet **2023** (normale comme rattrapage), ce scan rend
**correctement** les lettres ajourées ($\mathbb{N}$, $\mathbb{N}^*$,
$\mathbb{C}$) et le symbole $\le$. Aucune adjudication de glyphe n'a été
nécessaire, et aucune n'est à confirmer. C'est un fait à vérifier, pas à
supposer : le vérificateur doit le confirmer plutôt que de l'hériter.

> **Confirmation du vérificateur.** Vérifié au zoom ×2 (recadrages LANCZOS sur
> les pages 2 à 5 du scan re-fetché), glyphe par glyphe :
> $\mathbb{N}$ (ex. 1 q8-a/b/c, p. 3), $\mathbb{N}^{*}$ (ex. 2 q2, p. 3),
> $\mathbb{C}$ et $\mathbb{C}^{*}$ (ex. 3 et ex. 4 du corps, p. 3 et 4),
> $\mathbb{R}$ et $\mathbb{R}^{*}$ (ex. 4 du corps q5, p. 4), $\mathbb{Z}$
> (ex. 5 du corps q2, p. 5), et le symbole $\le$ (ex. 1 q5-a et q5-d p. 2,
> q8-a et q8-b p. 3). **Tous nets, tous corrects, aucun caractère de
> substitution.** L'affirmation de la transcription est confirmée — il n'y a
> aucune adjudication de glyphe à porter sur ce sujet.

---

## 2024 — session normale — Exercice 1
Source: https://www.alloschool.com/element/145739
Statut: vérifié — re-fetch indépendant + re-dérivation (vérificateur adversarial, 2026-08-27)

- Filière / épreuve : Sciences Mathématiques (A) et (B), option française — Mathématiques, 4 h, coef 9
- Code sujet : NS 24F · Barème de l'exercice : **7,5 points**
- Recompte question par question, relevé dans la marge du scan :
  $0{,}5+0{,}5$ (q1, q2) $+\ 0{,}25+0{,}5+0{,}25$ (q3) $+\ 0{,}5+0{,}5$ (q4)
  $+\ 0{,}5+0{,}5+0{,}5+0{,}5$ (q5) $+\ 0{,}25+0{,}5$ (q6) $+\ 0{,}5$ (q7)
  $+\ 0{,}5+0{,}5+0{,}25$ (q8) $= \mathbf{7{,}5}$ ✔ conforme à la carte de la p. 1
- Images lues : `.../0002-big.jpg` (q1 à q8, début), `.../0003-big.jpg` (fin de q8)
- Pages du scan : 2 et 3 (sur 5)
- Aucune figure n'est imprimée : la question 6-b demande au candidat de **tracer** la courbe.

**EXERCICE 1 (7,5 points)**

Soit $f$ la fonction numérique définie sur l'intervalle $[1, +\infty[$ par :

$$f(1) = \frac{1}{2} \qquad \text{et pour tout } x \in\, ]1, +\infty[\ ,\qquad f(x) = \frac{\ln(x)}{x^2 - 1}$$

Soit $(C)$ la courbe représentative de la fonction $f$ dans un repère orthogonal $(O, \vec{i}, \vec{j})$.

1. *(0,5)* Montrer que $f$ est continue à droite en $1$.

2. *(0,5)* Calculer $\displaystyle\lim_{x \to +\infty} f(x)$ puis interpréter graphiquement le résultat obtenu.

3. **a)** *(0,25)* Soit $x \in\, ]1, +\infty[$. En posant $t = (x-1)^2$, vérifier que : $\dfrac{1 - x + \ln(x)}{(x-1)^2} = \dfrac{-\sqrt{t} + \ln(1+\sqrt{t})}{t}$

   **b)** *(0,5)* Montrer que $\left(\forall t \in\, ]0, +\infty[\right)$, $\quad -\dfrac{1}{2} < \dfrac{-\sqrt{t} + \ln\left(1+\sqrt{t}\right)}{t} < \dfrac{-1}{2(1+\sqrt{t})}$

   *(On pourra utiliser le théorème des accroissements finis sur l'intervalle $[0\,;t]$)*

   **c)** *(0,25)* En déduire que : $\displaystyle\lim_{x \to 1^{+}} \dfrac{1 - x + \ln(x)}{(x-1)^2} = -\dfrac{1}{2}$

4. **a)** *(0,5)* Montrer que : $\forall x \in\, ]1, +\infty[\ ,\quad \dfrac{f(x) - \dfrac{1}{2}}{x - 1} = -\dfrac{\ln(x)}{x-1} \times \dfrac{1}{2(x+1)} + \dfrac{\ln(x) - x + 1}{2(x-1)^2}$

   **b)** *(0,5)* En déduire que $f$ est dérivable à droite en $1$ puis interpréter graphiquement le résultat obtenu.

5. Pour tout $x \in [1, +\infty[$ on pose $I(x) = \displaystyle\int_1^x \frac{t^2-1}{t^3}\,dt$ et $J(x) = \displaystyle\int_1^x \frac{t^2-1}{t^2}\,dt$

   **a)** *(0,5)* Montrer que : $\forall x \in [1, +\infty[$, $\ 0 \le I(x) \le J(x)$

   **b)** *(0,5)* Montrer que pour tout $x \in [1, +\infty[$, $\ I(x) = \ln(x) - \dfrac{x^2-1}{2x^2}$ et $J(x) = \dfrac{(x-1)^2}{x}$

   **c)** *(0,5)* Montrer que : $\forall x \in\, ]1, +\infty[$, $\ f'(x) = \dfrac{-2}{(x+1)^2} \times \dfrac{I(x)}{J(x)}$

   **d)** *(0,5)* En déduire que : $\forall x \in\, ]1, +\infty[$, $\ -\dfrac{1}{2} \le f'(x) \le 0$

6. **a)** *(0,25)* Dresser le tableau de variations de la fonction $f$.

   **b)** *(0,5)* Tracer la courbe $(C)$. *(On prendra $\|\vec{i}\| = 1\ \text{cm}$ et $\|\vec{j}\| = 2\ \text{cm}$)*

7. *(0,5)* Montrer que l'équation $f(x) = x - 1$ admet une unique solution $a$ dans $]1,2[$.

8. Soit $(a_n)_{n \in \mathbb{N}}$ la suite numérique définie par :

   $$a_0 \in [1, +\infty[ \qquad \text{et} \qquad \text{pour tout } n \in \mathbb{N},\quad a_{n+1} = 1 + f(a_n)$$

   **a)** *(0,5)* Montrer que : $(\forall n \in \mathbb{N})$, $\ |a_{n+1} - a| \le \dfrac{1}{2}|a_n - a|$

   **b)** *(0,5)* Montrer par récurrence que : $(\forall n \in \mathbb{N})$, $\ |a_n - a| \le \left(\dfrac{1}{2}\right)^n |a_0 - a|$

   **c)** *(0,25)* En déduire que la suite $(a_n)_{n \in \mathbb{N}}$ est convergente.

> **Correction du vérificateur — Exercice 1.**
>
> **1. Une seule divergence de caractère, corrigée ci-dessus (q7).** La
> transcription écrivait l'intervalle de la question 7 $]1\,;2[$, avec un
> point-virgule. **Le scan porte $]1,2[$, avec une virgule** (p. 2, dernière
> ligne avant la question 8, lue au zoom ×2). Corrigé dans le corps. Le sujet
> n'est pas uniforme sur ce point et c'est bien lui qui décide : il emploie la
> **virgule** dans $[1,+\infty[$, $]1,+\infty[$, $]0,+\infty[$ et $]1,2[$,
> mais le **point-virgule** dans l'indication du TAF $[0\,;t]$ (q3-b) et dans
> tout l'exercice 2 ($[0\,;1]$, $[0\,;\beta]$). La transcription avait raison
> partout ailleurs ; seul $]1,2[$ était sur-normalisé.
>
> **2. Les six autres points « fragiles » sont confirmés sans réserve**, au
> zoom ×2 sur recadrages de `0002-big.jpg` et `0003-big.jpg` :
>
> - **q3-b — la parenthèse.** Le membre de droite est bien
>   $\dfrac{-1}{2(1+\sqrt{t})}$ : une **unique** barre de fraction, le $-1$
>   seul au numérateur, et $2(1+\sqrt t)$ entier au dénominateur. Ce n'est
>   **pas** $\frac{-1}{2}(1+\sqrt t)$. Preuve indépendante par le calcul : voir
>   le point 3 ci-dessous, la re-dérivation par le TAF **produit exactement**
>   cette borne, et la lecture concurrente serait numériquement fausse (en
>   $t=1$ elle donnerait $-1$, alors que la quantité encadrée vaut
>   $-1+\ln 2 \approx -0{,}307$).
> - **q4-a — l'identité longue.** Signe à signe, dénominateur à
>   dénominateur : $\dfrac{f(x)-\frac12}{x-1} = -\dfrac{\ln(x)}{x-1}\times
>   \dfrac{1}{2(x+1)} + \dfrac{\ln(x)-x+1}{2(x-1)^{2}}$. Les trois
>   dénominateurs $x-1$, $2(x+1)$, $2(x-1)^2$ sont conformes, le signe $-$ du
>   premier terme et le $+$ de liaison aussi. **Rien à corriger.**
> - **q5 — pas d'inversion.** $I(x)$ a bien $t^{3}$ au dénominateur et $J(x)$
>   bien $t^{2}$, sur les deux intégrales adjacentes de la même ligne.
> - **q6-b — les échelles.** $\|\vec i\| = 1\,$cm et $\|\vec j\| = 2\,$cm,
>   dans cet ordre, repère **orthogonal** (et non orthonormé) : conforme.
> - **Le barème de marge**, relevé colonne par colonne sur un recadrage de la
>   seule marge : p. 2 → q1 0,5 · q2 0,5 · q3-a 0,25 · q3-b 0,5 · q3-c 0,25 ·
>   q4-a 0,5 · q4-b 0,5 · q5-a 0,5 · q5-b 0,5 · q5-c 0,5 · q5-d 0,5 ·
>   q6-a 0,25 · q6-b 0,5 · q7 0,5 (sous-total 6,25) ; p. 3 → q8-a 0,5 ·
>   q8-b 0,5 · q8-c 0,25 (sous-total 1,25). **Total 7,5** ✔ conforme à la
>   carte de la page 1 et au titre imprimé « EXERCICE1 :( 7.5 points) ».
> - **Le reste de l'énoncé** (définition de $f$, $f(1)=\frac12$, repère
>   orthogonal, q1, q2, q3-a, q3-c, q4-b, q5-a à q5-d, q6-a, q8-a à q8-c) est
>   conforme au scan, caractère par caractère.
>
> **3. Re-dérivation — l'exercice est résoluble de bout en bout, et toute
> identité imprimée est vraie.**
>
> - **q3-a.** Pour $x>1$, $t=(x-1)^2 \Rightarrow \sqrt t = x-1$ donc
>   $x = 1+\sqrt t$ ; le numérateur $1-x+\ln x$ devient $-\sqrt t +
>   \ln(1+\sqrt t)$ et le dénominateur $(x-1)^2$ vaut $t$. Identité **exacte**.
> - **q3-b (par le TAF, comme l'indication le suggère).** Poser
>   $\varphi(u) = -\sqrt u + \ln(1+\sqrt u)$ sur $[0\,;t]$, avec
>   $\varphi(0)=0$. Alors
>   $\varphi'(u) = \frac{1}{2\sqrt u}\left(-1+\frac{1}{1+\sqrt u}\right)
>   = \frac{1}{2\sqrt u}\cdot\frac{-\sqrt u}{1+\sqrt u}
>   = \dfrac{-1}{2(1+\sqrt u)}$.
>   Le TAF sur $[0\,;t]$ donne un $c \in\,]0,t[$ tel que
>   $\frac{-\sqrt t + \ln(1+\sqrt t)}{t} = \varphi'(c) =
>   \frac{-1}{2(1+\sqrt c)}$, et $0<c<t$ entraîne
>   $-\frac12 < \frac{-1}{2(1+\sqrt c)} < \frac{-1}{2(1+\sqrt t)}$.
>   **L'encadrement imprimé est reproduit à l'identique** — ce qui confirme la
>   lecture de la parenthèse par une voie entièrement indépendante de l'œil.
>   Contrôles numériques concordants en $t=0{,}01$, $1$, $9$ et $10^4$.
> - **q3-c.** Les deux bornes tendent vers $-\frac12$ quand $t\to 0^{+}$, et
>   $x\to 1^{+} \Rightarrow t=(x-1)^2\to 0^{+}$ : encadrement, limite
>   $-\frac12$. ✔
> - **q4-a.** Réduction au dénominateur commun $2(x-1)^2(x+1)$ : le membre de
>   gauche vaut $\frac{2\ln x - x^2+1}{2(x-1)^2(x+1)}$ ; le membre de droite a
>   pour numérateur $-\ln(x)(x-1) + (\ln x - x + 1)(x+1) = 2\ln x - x^2 + 1$.
>   **Identité exacte.**
> - **q4-b.** Par q4-a : le premier terme tend vers $-1\times\frac14$, le
>   second vaut $\frac12\cdot\frac{1-x+\ln x}{(x-1)^2} \to \frac12\times
>   (-\frac12) = -\frac14$ par q3-c. Donc $f'_d(1) = -\frac12$ : demi-tangente
>   en $A\!\left(1;\frac12\right)$ de coefficient directeur $-\frac12$. ✔
> - **q5-a.** Pour $t\ge 1$ : $t^3 \ge t^2 > 0$ et $t^2-1\ge 0$, donc
>   $0 \le \frac{t^2-1}{t^3} \le \frac{t^2-1}{t^2}$ ; intégration de $1$ à
>   $x\ge 1$. ✔
> - **q5-b.** $I(x)=\int_1^x\!\left(\frac1t - \frac1{t^3}\right)dt =
>   \left[\ln t + \frac{1}{2t^2}\right]_1^x = \ln x + \frac{1}{2x^2} -
>   \frac12 = \ln x - \frac{x^2-1}{2x^2}$ ✔ ;
>   $J(x)=\int_1^x\!\left(1-\frac1{t^2}\right)dt = \left[t+\frac1t\right]_1^x
>   = x + \frac1x - 2 = \frac{(x-1)^2}{x}$ ✔. **Les deux expressions imprimées
>   sont exactes.**
> - **q5-c.** $f'(x) = \dfrac{(x^2-1)-2x^2\ln x}{x\,(x^2-1)^2}$ par dérivation
>   directe. Et $\dfrac{-2}{(x+1)^2}\times\dfrac{I(x)}{J(x)} =
>   \dfrac{-2}{(x+1)^2}\times\dfrac{2x^2\ln x - x^2+1}{2x(x-1)^2}
>   = \dfrac{(x^2-1)-2x^2\ln x}{x(x-1)^2(x+1)^2}$, et
>   $(x-1)^2(x+1)^2=(x^2-1)^2$. **Les deux membres coïncident.**
> - **q5-d.** q5-a donne $0 \le \frac{I(x)}{J(x)} \le 1$ (avec $J(x)>0$ pour
>   $x>1$), donc $-\frac{2}{(x+1)^2} \le f'(x) \le 0$ ; et $x>1
>   \Rightarrow (x+1)^2>4 \Rightarrow -\frac12 < -\frac{2}{(x+1)^2}$. ✔
> - **q6, q7.** $f$ décroissante de $f(1)=\frac12$ vers $0$ ; $g(x)=f(x)-x+1$
>   vérifie $g(1)=\frac12>0$, $g(2)=\frac{\ln 2}{3}-1 \approx -0{,}769<0$ et
>   $g' = f'-1 \le -1 < 0$ : racine unique $a \in\,]1,2[$. ✔
> - **q8.** $a$ est point fixe de $x\mapsto 1+f(x)$ ; $a_n \ge 1$ pour tout $n$
>   (car $f\ge 0$ sur $[1,+\infty[$), et $|f'|\le\frac12$ par q5-d donne
>   l'inégalité des accroissements finis demandée, puis la récurrence, puis
>   $a_n \to a$. ✔
>
> **Aucune donnée ne manque et aucune identité imprimée n'est fausse** :
> l'exercice 1 est intégralement résoluble avec les seules données transcrites.

---

## 2024 — session normale — Exercice 2
Source: https://www.alloschool.com/element/145739
Statut: vérifié — re-fetch indépendant + re-dérivation (vérificateur adversarial, 2026-08-27)

- Filière / épreuve : Sciences Mathématiques (A) et (B), option française — Mathématiques, 4 h, coef 9
- Code sujet : NS 24F · Barème de l'exercice : **2,5 points**
- Recompte question par question, relevé dans la marge du scan :
  $0{,}5+0{,}5+0{,}5+0{,}5+0{,}5 = \mathbf{2{,}5}$ ✔
- Images lues : `.../0003-big.jpg`
- Page du scan : 3 (sur 5)
- Aucune figure n'est imprimée.

**EXERCICE 2 (2,5 points)**

Soit $F$ la fonction numérique définie sur l'intervalle $[0\,;1]$ par : $F(x) = \displaystyle\int_0^x e^{t^2}\,dt$

1. **a)** *(0,5)* Montrer que $F$ est continue, strictement croissante sur $[0\,;1]$.

   **b)** *(0,5)* En déduire que $F$ est une bijection de $[0\,;1]$ vers $[0\,;\beta]$ avec $\beta = \displaystyle\int_0^1 e^{t^2}\,dt$

2. On note $F^{-1}$ la bijection réciproque de $F$.

   Pour tout $n \in \mathbb{N}^{*}$, on pose : $S_n = \dfrac{1}{n}\displaystyle\sum_{k=1}^{k=n} F^{-1}\!\left(\dfrac{k}{n}\beta\right)$

   **a)** *(0,5)* Montrer que la suite $(S_n)_{n \in \mathbb{N}^{*}}$ est convergente de limite $\ell = \dfrac{1}{\beta}\displaystyle\int_0^{\beta} F^{-1}(t)\,dt$

   **b)** *(0,5)* Montrer que $\ell = \dfrac{1}{\beta}\displaystyle\int_0^1 u\,e^{u^2}\,du$

   *(On pourra effectuer le changement de variable $u = F^{-1}(t)$)*

   **c)** *(0,5)* En déduire que : $\ell = \dfrac{e-1}{2\beta}$

> **Correction du vérificateur — Exercice 2. Aucune divergence.**
>
> **1. Transcription conforme au scan, caractère par caractère** (p. 3,
> `0003-big.jpg`, zoom ×2 sur trois recadrages). Contrôlés explicitement :
>
> - $F(x)=\displaystyle\int_0^x e^{t^2}dt$ sur $[0\,;1]$ — l'exposant est bien
>   $t^{2}$, la borne haute bien $x$ ;
> - $\beta = \displaystyle\int_0^1 e^{t^2}dt$, et l'arrivée de la bijection est
>   bien $[0\,;\beta]$ ;
> - **q2 — la somme, point nommé comme fragile.** Les bornes sont bien écrites
>   $k=1$ (dessous) et $k=n$ (dessus), et **le $\beta$ est bien à l'intérieur
>   de $F^{-1}$**, en facteur de $\frac{k}{n}$ :
>   $S_n = \frac1n\sum_{k=1}^{k=n} F^{-1}\!\left(\frac{k}{n}\beta\right)$. Le
>   facteur $\frac1n$ est bien devant le $\sum$, hors de $F^{-1}$ ;
> - l'indexation $(S_n)_{n\in\mathbb{N}^{*}}$ et « Pour tout
>   $n \in \mathbb{N}^{*}$ » ;
> - $\ell = \frac{1}{\beta}\int_0^{\beta} F^{-1}(t)\,dt$, puis
>   $\ell = \frac{1}{\beta}\int_0^1 u\,e^{u^2}du$, puis
>   $\ell = \frac{e-1}{2\beta}$ ;
> - l'indication « changement de variable $u = F^{-1}(t)$ » ;
> - **le barème de marge** : $0{,}5$ (q1-a) $+\,0{,}5$ (q1-b) $+\,0{,}5$
>   (q2-a) $+\,0{,}5$ (q2-b) $+\,0{,}5$ (q2-c) $= \mathbf{2{,}5}$ ✔ conforme
>   au titre imprimé « EXERCICE2 :( 2.5 points) » et à la carte de la p. 1.
>
> **2. Re-dérivation — chaque résultat imprimé est vrai.**
>
> - **q1-a.** $t\mapsto e^{t^2}$ est continue sur $[0\,;1]$, donc $F$ y est de
>   classe $C^{1}$ avec $F'(x)=e^{x^2}>0$ : continue et strictement
>   croissante. ✔
> - **q1-b.** Continue et strictement croissante sur $[0\,;1]$, donc bijection
>   de $[0\,;1]$ sur $[F(0)\,;F(1)] = [0\,;\beta]$. ✔
> - **q2-a.** $F^{-1}$ est continue sur $[0\,;\beta]$, donc
>   $u\mapsto F^{-1}(u\beta)$ l'est sur $[0\,;1]$ ; $S_n$ en est la somme de
>   Riemann à pas $\frac1n$, d'où $S_n \to \int_0^1 F^{-1}(u\beta)\,du$, et le
>   changement $t=u\beta$ ($dt=\beta\,du$) donne
>   $\ell = \frac{1}{\beta}\int_0^{\beta}F^{-1}(t)\,dt$. **Conforme à
>   l'imprimé.** ✔
> - **q2-b.** $u=F^{-1}(t) \iff t=F(u)$, $dt = F'(u)\,du = e^{u^2}du$ ; les
>   bornes $t=0 \mapsto u=0$ et $t=\beta \mapsto u=1$. D'où
>   $\int_0^{\beta}F^{-1}(t)\,dt = \int_0^1 u\,e^{u^2}du$ et
>   $\ell = \frac1\beta\int_0^1 u\,e^{u^2}du$. ✔
> - **q2-c.** $\int_0^1 u\,e^{u^2}du = \left[\frac12 e^{u^2}\right]_0^1
>   = \frac{e-1}{2}$, donc $\ell = \dfrac{e-1}{2\beta}$. **Le résultat final
>   imprimé est exact.** ✔
>
> **Aucune donnée ne manque** : l'exercice 2 est résoluble de bout en bout
> avec les seules données transcrites, et la chaîne q1-a → q1-b → q2-a → q2-b
> → q2-c se referme sans trou.

---

## Classement proposé — **slugs contrôlés contre l'arborescence réelle**

Correspondance vers les slugs `content/maths/`. La transcription notait cette
table « non contrôlée contre l'arborescence réelle ». **Elle l'est désormais :**
`ls content/maths/` a été exécuté et **les neuf slugs cités dans ce fichier
existent tous** — `fonction-logarithme`, `limites-continuite`,
`derivabilite-etude-fonctions`, `calcul-integral`, `suites-numeriques`,
`fonction-exponentielle` (table ci-dessous), plus `nombres-complexes-2`,
`arithmetique` et `structures-algebriques` (cartouche d'en-tête). Aucun slug
inventé, aucun slug manquant. Les deux documents cités plus bas —
`docs/audits/lesson-completeness-docket.md` et `docs/sujets/maths/README.md` —
existent également.

| Exercice | Barème | Slug proposé |
|---|---|---|
| Exercice 1 | 7,5 pts | **`fonction-logarithme`** (dominant : $f(x)=\ln x/(x^2-1)$, et tout l'exercice tourne autour du comportement de $\ln$ près de $1$) · cross-lists : `limites-continuite` (q1, q2, q3-c), `derivabilite-etude-fonctions` (q3-b par le TAF, q4, q5-c/d, q6, q7), `calcul-integral` (q5 tout entière), `suites-numeriques` (q8) |
| Exercice 2 | 2,5 pts | **`calcul-integral`** (dominant : intégrale à borne variable, bijection réciproque, somme de Riemann, changement de variable) · cross-lists : `derivabilite-etude-fonctions` (la bijection réciproque de q1-b et q2), `suites-numeriques` (la convergence de $(S_n)$), `fonction-exponentielle` (l'intégrande) |

**Deux points d'attention pour le classement :**

1. L'exercice 1 **q3-b invoque nommément le théorème des accroissements
   finis**, et l'énoncé le suggère explicitement. Le docket de complétude
   (`docs/audits/lesson-completeness-docket.md`, catégorie C) note que Rolle et
   le TAF sont **spécifiques SM** et volontairement non promus au rang de rung
   dans `derivabilite-etude-fonctions`. Ce sujet étant SM, l'usage est
   légitime — il faudra le ponter au point d'usage dans le `reasoning`, comme
   le corpus le fait déjà ailleurs, et non le supposer acquis.
2. L'exercice 2 mobilise la **dérivée / l'intégrale d'une bijection
   réciproque**, outil dont le rung existe depuis la passe du 2026-08-22 dans
   `derivabilite-etude-fonctions` (docket A6, section « Fonction réciproque :
   la même courbe, lue dans l'autre sens » et « La dérivée de la réciproque en
   un point »). Le pont est donc disponible, ce qui n'était pas le cas avant.

## Ce que la vérification devra trancher en priorité

1. **Le sens des inégalités de q3-b** : le scan porte
   $-\frac12 < \cdots < \frac{-1}{2(1+\sqrt t)}$. Vérifier que le membre de
   droite est bien $\frac{-1}{2(1+\sqrt{t})}$ et non $\frac{-1}{2}(1+\sqrt t)$ —
   la position de la parenthèse change tout, et les deux se ressemblent au
   rendu.
2. **L'identité de q4-a**, longue et à trois termes : chaque signe, chaque
   dénominateur ($x-1$ contre $2(x+1)$ contre $2(x-1)^2$) est à relire au zoom.
   C'est l'endroit du sujet où une erreur de transcription serait la plus
   coûteuse et la moins visible.
3. **Les deux intégrales de q5** : $I$ a $t^3$ au dénominateur, $J$ a $t^2$.
   Une inversion casserait tout l'exercice, et les deux lignes sont adjacentes.
4. **Les échelles de q6-b** : $\|\vec i\| = 1$ cm et $\|\vec j\| = 2$ cm — le
   repère est **orthogonal**, pas orthonormé, et les deux échelles diffèrent.
5. **La somme de q2 de l'exercice 2** : les bornes sont écrites $k=1$ à $k=n$
   (et non $0$ à $n-1$), et l'argument est $\frac{k}{n}\beta$ — vérifier que le
   $\beta$ est bien à l'intérieur de $F^{-1}$.
6. **Le recompte des barèmes** des deux exercices, dans la marge.
7. **La re-dérivation mathématique complète** : chaque identité que l'énoncé
   demande de « montrer » ou de « vérifier » doit se vérifier réellement. En
   particulier l'expression de $I(x)$ et $J(x)$ en q5-b, celle de $f'(x)$ en
   q5-c, et le résultat final $\ell = \frac{e-1}{2\beta}$ de l'exercice 2.

---

## Ce que la vérification a trouvé

*Passe adversariale indépendante, 2026-08-27. Second lecteur, mandaté pour
chercher les erreurs et non pour confirmer.*

### Méthode (ce qui a réellement été fait)

1. **Re-fetch indépendant.** `curl -s https://www.alloschool.com/element/145739`,
   puis extraction des URLs d'images **depuis le HTML** par motif
   `course-<X>/upload-<Y>/000k-big.jpg` — sans faire confiance aux chemins
   écrits dans la transcription. Les URLs re-dérivées sont
   `https://www.alloschool.com/assets/documents/course-436/upload-87447/000{1..5}-big.jpg`,
   **5 pages** : identiques à ce que la transcription annonçait (ligne
   « Images »). Le `<title>` de la page confirme l'identité du document —
   « Examen National Mathématiques Sciences Maths 2024 Normale - Sujet ».
2. **Téléchargement** des 5 pages dans un dossier temporaire, puis **lecture
   des images elles-mêmes** (jamais relecture du texte transcrit).
3. **Zoom.** 13 recadrages ré-échantillonnés ×2 (LANCZOS) sur les zones
   critiques : q3-a/b, q4-a, q5, q5-c/d, q6-b/q7, q8, en-tête d'ex. 1, ex. 2
   en entier, $S_n$, les trois expressions de $\ell$, et **les colonnes de
   marge seules** des pages 2 et 3 pour le barème.
4. **Re-dérivation** de chaque « montrer que » / « vérifier que » des deux
   exercices, faite à la main et non héritée de la transcription.

### Défaut substantiel trouvé : 1

**L'en-tête de la page 1 et le corps du sujet ne s'accordent pas sur les
numéros des exercices 4 et 5** — et la transcription présentait ce conflit
comme un simple ordre d'énumération inhabituel (« Le corps du sujet, lui, suit
l'ordre 1, 2, 3, 4, 5 »), ce qui était rassurant à tort.

- Page 1 : « L'EXERCICE**5** se rapporte aux structures algébriques (3.5 pts) »
  et « L'EXERCICE**4** se rapporte à l'arithmétique (3 pts) ».
- Corps : page 4 = « **EXERCICE4** : (3.5 points) », loi $T$ sur
  $\mathbb{C}\times\mathbb{C}^{*}$ ; page 5 = « **EXERCICE5** :( 3 points) »,
  arithmétique (Fermat, $2024^{192}x \equiv 3\ [221]$).

C'est donc bien **les numéros qui sont croisés**, pas seulement l'ordre des
lignes. **Incohérence du sujet officiel NS 24F** : documentée dans le bloc de
correction de l'en-tête, **non « réparée »**. Sans effet sur le /20 (les
couples domaine↔barème sont justes des deux côtés) ; effet réel en revanche
sur toute conversion qui se fierait à la carte de la page 1. La banque suit la
numérotation **du corps** et a raison — vérifié dans les `bank.yaml` :
`bk-2024-n-x4` ↔ `structures-algebriques`, `bk-2024-n-x5` ↔ `arithmetique`,
`bk-2024-n-x3` ↔ `nombres-complexes-2`. Le cartouche d'en-tête de ce fichier
est juste.

### Défaut de fidélité trouvé : 1 (mineur, corrigé)

**q7 de l'exercice 1** : la transcription écrivait $]1\,;2[$ (point-virgule),
**le scan porte $]1,2[$ (virgule)**. Corrigé dans le corps. Le sujet mélange
les deux séparateurs et c'est lui qui décide : virgule dans $[1,+\infty[$,
$]1,+\infty[$, $]0,+\infty[$, $]1,2[$ ; point-virgule dans $[0\,;t]$ (q3-b) et
dans tout l'exercice 2. Partout ailleurs la transcription était fidèle.

### Normalisations relevées, laissées telles quelles (ce ne sont pas des erreurs)

- Le scan écrit les barèmes avec un **point décimal** — « (7.5 points) »,
  « (2.5 points) », marge « 0.5 », « 0.25 ». La transcription les rend en
  virgule francophone (« 7,5 pts », « 0,5 »). Convention de fichier assumée,
  sans ambiguïté de valeur. Signalé pour mémoire.
- Le scan imprime les titres sans espace et avec une ponctuation bancale —
  « **EXERCICE1** :( 7.5 points) ». La transcription régularise en
  « EXERCICE 1 (7,5 points) ». Cosmétique.

### Les deux affirmations à contrôler

1. **« Ce scan ne présente AUCUN mojibake » — CONFIRMÉE.** Vérifié au zoom,
   glyphe par glyphe : $\mathbb{N}$, $\mathbb{N}^{*}$, $\mathbb{C}$,
   $\mathbb{C}^{*}$, $\mathbb{R}$, $\mathbb{R}^{*}$, $\mathbb{Z}$ et $\le$
   sont tous rendus correctement sur les pages 2 à 5. Aucune adjudication de
   glyphe n'est à porter sur ce sujet, contrairement aux sujets 2023.
2. **« La page 1 énumère les composantes dans l'ordre 1, 2, 3, 5, 4 » —
   CONFIRMÉE quant à la lecture, mais son interprétation était fausse.**
   L'ordre imprimé est bien 1, 2, 3, 5, 4 : ce n'est pas une erreur de
   lecture. Mais ce n'est pas non plus un simple caprice d'ordre — voir le
   défaut substantiel ci-dessus.

### Les sept points « fragiles » nommés par le transcripteur

| # | Point | Verdict |
|---|---|---|
| 1 | q3-b : $\frac{-1}{2(1+\sqrt t)}$ ou $\frac{-1}{2}(1+\sqrt t)$ ? | **$\frac{-1}{2(1+\sqrt t)}$ — transcription juste.** Barre de fraction unique au zoom ; et la re-dérivation par le TAF produit exactement cette borne ($\varphi'(u) = \frac{-1}{2(1+\sqrt u)}$), la lecture concurrente étant numériquement fausse. |
| 2 | q4-a : l'identité à trois termes | **Juste, signe à signe et dénominateur à dénominateur.** Re-vérifiée algébriquement : les deux membres se réduisent à $\frac{2\ln x - x^2+1}{2(x-1)^2(x+1)}$. |
| 3 | q5 : $t^3$ pour $I$, $t^2$ pour $J$ | **Aucune inversion.** Conforme. |
| 4 | q6-b : $\|\vec i\|=1$ cm, $\|\vec j\|=2$ cm, repère orthogonal | **Conforme**, dans cet ordre. |
| 5 | Ex. 2 q2 : bornes $k=1..n$, $\beta$ à l'intérieur de $F^{-1}$ | **Conforme.** $\frac1n$ hors du $\sum$, $\beta$ en facteur de $\frac kn$ **dans** $F^{-1}$. |
| 6 | Recompte des barèmes de marge | **Conforme.** Ex. 1 : $6{,}25$ (p. 2) $+\,1{,}25$ (p. 3) $= 7{,}5$. Ex. 2 : $5\times 0{,}5 = 2{,}5$. |
| 7 | Re-dérivation mathématique complète | **Toutes les identités imprimées sont vraies.** Voir les deux blocs de correction : q3-a, q3-b (TAF), q3-c, q4-a, q4-b, q5-a→d, q6, q7, q8 ; et ex. 2 q1-a→q2-c, jusqu'à $\ell = \frac{e-1}{2\beta}$ **confirmé**. |

### Résolubilité

**Les deux exercices sont résolubles de bout en bout avec les seules données
transcrites.** Aucune donnée manquante, aucune identité imprimée fausse,
aucune question incalculable. Chaque question s'appuie sur des résultats
effectivement établis en amont dans le même exercice (q3-c ← q3-a+q3-b ;
q4-b ← q3-c+q4-a ; q5-c ← q5-b ; q5-d ← q5-a+q5-c ; q6/q7 ← q5-d ;
q8 ← q5-d+q7 ; ex. 2 q2-c ← q2-b ← q2-a ← q1-b).

### Classement

Contrôlé : les neuf slugs `content/maths/` cités dans ce fichier existent
tous. Les deux documents référencés (`docs/audits/lesson-completeness-docket.md`,
`docs/sujets/maths/README.md`) existent également. Rien à corriger.

### Points restés indécidables

**Aucun.** Toutes les zones nommées comme fragiles ont été tranchées au zoom,
et sept d'entre elles ont en outre été confirmées par une voie indépendante
(la re-dérivation). Aucune lecture n'est laissée « à confirmer ».

### Verdict

| Exercice | Verdict |
|---|---|
| **Exercice 1** (7,5 pts) | **vérifié.** Une divergence de caractère trouvée et corrigée (q7 : $]1\,;2[ \to\ ]1,2[$). Tout le reste conforme ; toutes les identités re-dérivées et vraies. |
| **Exercice 2** (2,5 pts) | **vérifié.** **Aucune divergence** avec le scan. Toutes les identités re-dérivées et vraies, jusqu'au $\ell = \frac{e-1}{2\beta}$ final. |
| **En-tête / carte p. 1** | **corrigé** — le conflit de numérotation p. 1 ↔ corps sur les exercices 4 et 5 est désormais documenté comme incohérence du sujet officiel. |

Les exercices 1 et 2 peuvent passer à la conversion. Rappel du cadre : **ne
pas reconvertir** les exercices 3, 4 et 5 du corps, déjà en banque.
