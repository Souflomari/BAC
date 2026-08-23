# Examen national Mathématiques — SM — 2023 session rattrapage (RS 24F) — transcription intégrale

> Fichier d'entrée (`_incoming`) — protocole `docs/sujets/maths/README.md`.
> Provenance sur chaque bloc. Sujet lu sur les 5 pages du scan
> `course-436/upload-85320` (AlloSchool element/142494).
>
> **Entrées vérifiées — passe adversariale du 2026-08-23** : re-fetch
> indépendant de `element/142494`, re-dérivation des chemins d'images depuis le
> HTML (5 pages `0001`–`0005-big.jpg`, 1240×1754 chacune, confirmées) et
> re-lecture de chaque page sur l'image — chaque nombre, indice, exposant,
> borne et barème relu sur le scan, jamais sur le texte transcrit. Les quatre
> exercices ont en outre été **re-dérivés mathématiquement** de bout en bout :
> toutes les questions sont résolubles avec les données transcrites et
> aboutissent à des valeurs cohérentes (détail dans chaque bloc). Barèmes
> recomptés en marge : 10 + 3,5 + 3,5 + 3 = **20**. **Un défaut a été trouvé et
> corrigé** (exercice 2, Partie II, question 1 — domaine du quantificateur lu
> « $(U)$ » alors que le scan porte un tofu blackboard-bold), ainsi qu'**une
> note de lecture rectifiée** (l'étoile de l'exercice 2 Partie I n'est pas
> « illisible » : elle est **absente**, ce qui est une lecture, pas une
> incertitude) et **un classement corrigé** (exercice 2, voir la section
> Classement). Trois **imprécisions du sujet officiel** sont par ailleurs
> signalées sans être « réparées » (bloc de l'exercice 2). Aucun exercice n'est
> écarté ; les mentions *(glyphe à confirmer)* qui subsistent portent toutes
> sur des lettres ajourées détruites par le scan, jamais sur une valeur.
>
> **En-tête administratif du scan (p.1)** : الامتحان الوطني الموحد للبكالوريا —
> المسالك الدولية — الدورة الاستدراكية 2023 — code sujet **RS 24F** — مادة
> الرياضيات — شعبة العلوم الرياضية (أ) و (ب) (خيار فرنسية) — durée **4 h** —
> coefficient **9**.
>
> **Consignes (p.1)** : « La durée de l'épreuve est de 4 heures. L'épreuve
> comporte quatre exercices indépendants. Les exercices peuvent être traités
> selon l'ordre choisi par le candidat. » — « L'exercice1 se rapporte à
> l'analyse (10 pts) ; L'exercice2 se rapporte aux nombres complexes (3.5 pts) ;
> L'exercice3 se rapporte aux structures algébriques (3.5 pts) ; L'exercice4 se
> rapporte à l'arithmétique (3 pts). » — « L'usage de la calculatrice n'est pas
> autorisé. L'usage de la couleur rouge n'est pas autorisé. »
>
> **Note de lecture (mojibake, tout le sujet)** : ce scan substitue les
> blackboard-bold par un assortiment de glyphes cassés (cases tofu « □ »,
> coins « ⌐ », « ⌊ », « ⊔ », « ∏ », barres « ‖ ») selon l'occurrence. La forme
> du glyphe ne porte **aucune information** : la même lettre est rendue par
> deux glyphes différents à deux lignes d'écart. Chaque occurrence est donc
> adjugée par la logique de l'exercice et marquée *(glyphe à confirmer)* dans
> le bloc concerné. Aucune figure (courbe, tableau, arbre) n'est imprimée dans
> ce sujet — les cinq pages sont du texte mathématique seul.
>
> **Ce que la passe adversariale a établi sur ces glyphes (2026-08-23)** — deux
> faits mesurés au pixel, qui rendent plusieurs lectures décidables :
> 1. **Les étoiles survivent au mojibake.** Là où l'exposant $*$ est imprimé,
>    il est parfaitement net à côté du tofu (p. 2 « $\forall n \in$ □$^*$ »,
>    p. 5 « de ⊔$^*$ vers », « $\forall z \in$ ⌊$^*$ »). L'**absence** d'étoile
>    est donc, elle aussi, une lecture — pas une incertitude. C'est ce qui
>    tranche les deux domaines de l'exercice 2 (voir son bloc).
> 2. **Le tofu ne rend jamais un symbole non-blackboard-bold.** Les objets en
>    italique parenthésé du sujet — $(U)$, $(C_n)$, $(S)$ — sont imprimés
>    proprement partout, y compris sur les lignes qui portent un tofu. Un tofu
>    ne peut donc pas être lu comme $(U)$ : c'est nécessairement une lettre
>    ajourée ($\mathbb{N}$, $\mathbb{R}$, $\mathbb{C}$). **Un défaut de la
>    transcription initiale a été corrigé sur ce point** (exercice 2, Partie II,
>    question 1).

---

## 2023 — session rattrapage — Exercice 1
Source: https://www.alloschool.com/element/142494
Statut: vérifié — re-fetch indépendant + re-dérivation (vérificateur adversarial, 2026-08-23)

- Filière / épreuve : Sciences Mathématiques (A) et (B) — شعبة العلوم الرياضية (أ) و (ب) (خيار فرنسية) — Mathématiques, 4 h, coef 9
- Code sujet : RS 24F · Barème de l'exercice : 10 points
- Images lues : `.../course-436/upload-85320/0001-big.jpg` (consignes), `.../course-436/upload-85320/0002-big.jpg`, `.../course-436/upload-85320/0003-big.jpg`
- Pages du scan : 2–3 (sur 5) — consignes p.1

> **Note de lecture (mojibake)** : en Partie II le quantificateur s'écrit
> « $\forall n \in$ □\* » puis « $\forall n \in$ ⌐\* » (deux glyphes différents
> pour le même ensemble) — lu $\mathbb{N}^*$ par l'indexation de la suite
> $(u_n)_{n\geq 1}$ *(glyphe à confirmer)*. Le reste de l'exercice est en
> Unicode exploitable.

**Analyse (fonction $\sqrt{x}\,(\ln x)^n$ : continuité, limites, variations suivant la parité de $n$, point d'inflexion ; suites $u_n = f_n(\beta)$ et $f_n(x_n)=1$ ; calcul intégral et volume de révolution).**

**Partie I**

Pour tout entier naturel **non nul** $n$, on considère la fonction $f_n$ définie sur $I = [0, +\infty[$ par : $f_n(0) = 0$ et $\left(\forall x \in\, ]0, +\infty[\right)$ ; $f_n(x) = \sqrt{x}\,(\ln x)^n$

et soit $(C_n)$ sa courbe représentative dans un repère orthonormé $\left(O; \vec{i}, \vec{j}\right)$

1. a) (0,5) Vérifier que : $\left(\forall x \in\, ]0, +\infty[\right)$ ; $\sqrt{x}\,(\ln x)^n = (2n)^n \left( x^{\frac{1}{2n}} \ln\!\left( x^{\frac{1}{2n}} \right) \right)^n$, en déduire que $f_n$ est continue à droite en $0$
   b) (0,25) Calculer $\displaystyle\lim_{x \to +\infty} f_n(x)$
   c) (0,75) Vérifier que : $\left(\forall x \in\, ]0, +\infty[\right)$ ; $\dfrac{f_n(x)}{x} = (2n)^n \left( \dfrac{\ln\!\left( x^{\frac{1}{2n}} \right)}{x^{\frac{1}{2n}}} \right)^{\!n}$, en déduire $\displaystyle\lim_{x \to +\infty} \dfrac{f_n(x)}{x}$, puis interpréter graphiquement le résultat obtenu.
   d) (0,5) Calculer, suivant la parité de $n$, $\displaystyle\lim_{x \to 0^+} \dfrac{f_n(x)}{x}$ puis interpréter graphiquement le résultat obtenu.
2. a) (0,75) Montrer que $f_n$ est dérivable sur $]0; +\infty[$ et que :
   $\left(\forall x \in\, ]0, +\infty[\right)$ ; $f_n'(x) = \dfrac{1}{2\sqrt{x}}\,(\ln x)^{n-1}\,(2n + \ln x)$
   b) (0,25) Vérifier que : $\forall n \geq 2$, $f_n'(x) = 0$ si et seulement si $(x = 1$ ou $x = e^{-2n})$
   c) (1) Étudier, suivant la parité de $n$, le sens de variation de $f_n$ et donner son tableau de variations.
   d) (0,25) Montrer que si $n$ est impair et $n \geq 3$ alors le point d'abscisse $1$ est un point d'inflexion de $(C_n)$

**Partie II :**

1. Soit $\beta \in\, ]1, e[$ un réel fixé. On considère la suite numérique $(u_n)_{n\geq 1}$ définie par :
   $\left(\forall n \in \mathbb{N}^*\right)$ *(glyphe à confirmer)* ; $u_n = f_n(\beta)$
   a) (0,25) Montrer que : $\left(\forall n \in \mathbb{N}^*\right)$ *(glyphe à confirmer)* ; $0 < u_n < \sqrt{e}$
   b) (0,25) Montrer que la suite $(u_n)_{n\geq 1}$ est décroissante.
   c) (0,25) Déterminer $\displaystyle\lim_{n \to +\infty} u_n$
2. a) (0,5) Montrer que pour tout entier $n$ non nul, il existe un unique réel $x_n \in\, ]1; e[$ tel que : $f_n(x_n) = 1$
   b) (0,75) Montrer que la suite $(x_n)_{n \in \mathbb{N}^*}$ *(glyphe à confirmer)* ainsi définie est croissante, en déduire qu'elle est convergente.
3. On pose : $\ell = \displaystyle\lim_{n \to +\infty} x_n$
   a) (0,5) Montrer que : $1 < \ell \leq e$
   b) (0,25) Montrer que : $\displaystyle\lim_{n \to +\infty} (\ln x_n)^n = \dfrac{1}{\sqrt{\ell}}$
   c) (0,25) Montrer que si $\ell < e$ alors $\displaystyle\lim_{n \to +\infty} n \ln(\ln x_n) = -\infty$
   d) (0,25) En déduire la valeur de $\ell$

**Partie III :**

On pose pour tout $x \in I$, $F(x) = \displaystyle\int_x^1 \left(f_1(t)\right)^2 dt$

1. a) (0,25) Montrer que la fonction $F$ est continue sur $I$
   b) (1) En utilisant une double intégration par parties, montrer que :
   $\left(\forall x \in\, ]0, +\infty[\right)$ ; $F(x) = -\dfrac{x^2}{2}\ln^2(x) + \dfrac{x^2}{2}\ln(x) + \dfrac{1}{4}\left(1 - x^2\right)$
2. a) (0,5) Calculer $\displaystyle\lim_{\substack{x \to 0 \\ x > 0}} F(x)$
   b) (0,25) En déduire la valeur de $F(0)$
   c) (0,5) Calculer, en $\text{cm}^3$, le volume du solide engendré par la rotation d'un tour complet autour de l'axe des abscisses de la portion de la courbe $(C_1)$ relative à l'intervalle $[0,1]$. (On prendra $\left\|\vec{i}\right\| = 1\ \text{cm}$)

> **Re-dérivation (vérificateur adversarial, 2026-08-23)** — l'exercice se
> résout entièrement avec les données transcrites, et chaque identité imprimée
> se vérifie :
> - I-1a : $(2n)^n\big(x^{1/2n}\ln(x^{1/2n})\big)^n = (2n)^n\cdot x^{1/2}\cdot
>   \frac{(\ln x)^n}{(2n)^n} = \sqrt{x}(\ln x)^n$ — identité exacte, exposant
>   $\frac{1}{2n}$ relu au pixel aux quatre occurrences (I-1a et I-1c).
> - I-2a : $f_n' = \frac{1}{2\sqrt x}(\ln x)^n + \frac{n}{\sqrt x}(\ln x)^{n-1}
>   = \frac{1}{2\sqrt x}(\ln x)^{n-1}(2n+\ln x)$ — conforme. La restriction
>   $n \geq 2$ de I-2b est nécessaire et suffisante ($n=1$ ne donne que
>   $x = e^{-2}$), donc $e^{-2n}$ est bien la racine, pas $e^{-2}$.
> - II : $u_{n+1}/u_n = \ln\beta \in\, ]0,1[$ (décroissance), $0 < u_n < \sqrt e$
>   et $u_n \to 0$. $f_n$ étant strictement croissante sur $]1,e[$ de $0$ à
>   $\sqrt e > 1$, $x_n$ existe et est unique ; $f_{n+1}(x_n) = \ln x_n < 1$
>   donne la croissance. II-3 est une **démonstration par l'absurde** cohérente :
>   $n\ln(\ln x_n) = \ln\big((\ln x_n)^n\big) \to \ln(1/\sqrt\ell)$, fini,
>   tandis que $\ell < e$ forcerait $-\infty$ ; d'où $\ell = e$.
> - III : en posant $G(t) = \frac{t^2}{2}\ln^2 t - \frac{t^2}{2}\ln t +
>   \frac{t^2}{4}$ (primitive de $t(\ln t)^2$, obtenue par la double IPP
>   demandée), $F(x) = G(1) - G(x) = -\frac{x^2}{2}\ln^2 x +
>   \frac{x^2}{2}\ln x + \frac14(1-x^2)$ — **exactement** l'expression imprimée,
>   signes et coefficients compris. D'où $F(0^+) = \frac14$, $F(0) = \frac14$
>   et $V = \pi F(0) = \frac{\pi}{4}\ \text{cm}^3$.
> - Barème recompté sur le scan : I $= 4{,}25$ · II $= 3{,}25$ · III $= 2{,}5$
>   $= \mathbf{10}$ points. Conforme à l'annonce de la p. 1.

---

## 2023 — session rattrapage — Exercice 2
Source: https://www.alloschool.com/element/142494
Statut: vérifié — re-fetch indépendant + re-dérivation (vérificateur adversarial, 2026-08-23)

- Filière / épreuve : Sciences Mathématiques (A) et (B) — شعبة العلوم الرياضية (أ) و (ب) (خيار فرنسية) — Mathématiques, 4 h, coef 9
- Code sujet : RS 24F · Barème de l'exercice : 3,5 points
- Images lues : `.../course-436/upload-85320/0003-big.jpg` (Partie I), `.../course-436/upload-85320/0004-big.jpg` (Partie II)
- Pages du scan : 3–4 (sur 5) — consignes p.1

> **Note de lecture (mojibake) — révisée par la passe adversariale** : le
> domaine du système est rendu par trois glyphes différents selon l'occurrence
> — « ⌊ $^2_+$ » (énoncé), « ∏ $^2_+$ » (Q1), « ⌐ $^2_+$ » (Q2) — tous porteurs
> du même indice $+$ et du même exposant $2$ : lus
> $\left(\mathbb{R}_+\right)^2$ par la présence de $\sqrt{x}$ et $\sqrt{y}$
> *(glyphe à confirmer)*. **Correction de la note initiale** : celle-ci disait
> « l'étoile éventuelle $\mathbb{R}_+^*$ n'est pas lisible ». Contrôle au pixel
> (agrandissement ×7 des trois occurrences) : **aucune étoile n'est imprimée**,
> et les étoiles de ce scan survivent au mojibake là où elles existent (p. 2 et
> p. 5). Le sujet pose donc bien le système dans $\mathbb{R}_+^2$ — voir le
> signalement d'imprécision ci-dessous.
>
> **Défaut corrigé en Partie II (question 1)** : la transcription initiale
> lisait « $\left(\forall z \in (U)\right)$ ». Le scan (p. 4, agrandissement
> ×12) porte « $\forall z \in$ ⊔ » — un **tofu blackboard-bold nu**, sans
> parenthèses et sans étoile, alors que $(U)$ est imprimé proprement, en
> italique parenthésé, deux lignes plus haut sur la même page (« le cercle
> $(U)$ ») et trois fois dans les questions 2-a, 2-b et 2-c. La lecture « $(U)$ »
> était **déduite du texte environnant, pas du dessin du glyphe** — et elle
> rendait la question vide de contenu : tout $z \in (U)$ vérifie $|z| = 1$ par
> définition du cercle, il n'y aurait rien à démontrer, et l'équivalence ne
> pourrait plus servir d'outil aux questions 2-a/b/c, qui l'appliquent à des
> quotients. Le domaine adjugé est $\mathbb{C}$ (module et conjugué ⇒
> complexes) *(glyphe à confirmer)*.

**Nombres complexes (Partie I : système non linéaire ramené à une équation du second degré en $z = \sqrt{x} + i\sqrt{y}$ ; Partie II : cercle unité, points $A, B, C$, cordes parallèles et perpendiculaires, $p = \frac{bc}{a}$).**

**Les parties I et II peuvent être traitées indépendamment.**

**PARTIE I :**

On considère dans $\left(\mathbb{R}_+\right)^2$ *(glyphe à confirmer)* le système suivant : $(S) : \begin{cases} \sqrt{x}\left(1 + \dfrac{1}{x+y}\right) = \dfrac{12}{5} \\[2mm] \sqrt{y}\left(1 - \dfrac{1}{x+y}\right) = \dfrac{4}{5} \end{cases}$

1. Soit $(x, y) \in \left(\mathbb{R}_+\right)^2$ *(glyphe à confirmer)* une solution du système $(S)$. On pose : $z = \sqrt{x} + i\sqrt{y}$
   a) (0,25) Montrer que : $z + \dfrac{1}{z} = \dfrac{12}{5} + \dfrac{4}{5}i$
   b) (0,75) Montrer que : $z^2 - \left(\dfrac{12}{5} + \dfrac{4}{5}i\right)z + 1 = 0$, en déduire les valeurs possibles de $z$
   ( On remarque que : $\dfrac{28}{25} + \dfrac{96}{25}i = \left(\dfrac{2}{5}(4 + 3i)\right)^2$ )
   c) (0,25) En déduire les valeurs du couple $(x, y)$
2. (0,5) Résoudre dans $\left(\mathbb{R}_+\right)^2$ *(glyphe à confirmer)* le système $(S)$

**PARTIE II :**

Le plan complexe est rapporté à un repère orthonormé direct $\left(O; \vec{u}, \vec{v}\right)$

Soit $(U)$ le cercle de centre $O$ et de rayon $1$ et $A(a)$, $B(b)$ et $C(c)$ trois points du cercle $(U)$ deux à deux distincts.

1. (0,25) Montrer que : $\left(\forall z \in \mathbb{C}\right)$ *(glyphe à confirmer — tofu nu sur le scan ; ce n'est pas $(U)$, voir la note de lecture)* ; $|z| = 1 \iff \bar{z} = \dfrac{1}{z}$
2. a) (0,5) La droite passant par $A$ et parallèle à $(BC)$ coupe le cercle $(U)$ au point $P(p)$
   Montrer que : $p = \dfrac{bc}{a}$
   b) (0,5) La droite passant par $A$ et perpendiculaire à $(BC)$ coupe le cercle $(U)$ au point $Q(q)$. Montrer que : $q = -p$
   c) (0,5) La droite passant par $C$ et parallèle à $(AB)$ coupe le cercle $(U)$ au point $R(r)$
   Montrer que les deux droites $(PR)$ et $(OB)$ sont perpendiculaires.

> **Re-dérivation (vérificateur adversarial, 2026-08-23)** — l'exercice tient :
> - Partie I : $z + \frac1z = \sqrt x\left(1+\frac{1}{x+y}\right) +
>   i\sqrt y\left(1-\frac{1}{x+y}\right)$ (car $\frac1z = \frac{\bar z}{x+y}$),
>   d'où le second membre $\frac{12}{5}+\frac45 i$. Le discriminant vaut
>   $\left(\frac{12}{5}+\frac45 i\right)^2 - 4 = \frac{28}{25}+\frac{96}{25}i$
>   — **exactement** l'indication imprimée, et
>   $\left(\frac25(4+3i)\right)^2 = \frac{4}{25}(7+24i) = \frac{28}{25}+\frac{96}{25}i$.
>   Racines : $z = 2+i$ et $z = \frac{2-i}{5}$ ; seule la première a une partie
>   imaginaire $\geq 0$ compatible avec $z = \sqrt x + i\sqrt y$, d'où
>   $(x,y) = (4,1)$, qui vérifie bien $(S)$ : $2\cdot\frac65 = \frac{12}{5}$ et
>   $1\cdot\frac45 = \frac45$. Les cinq fractions du système ont été relues au
>   pixel ($\frac{12}{5}$, $\frac45$, $\frac{28}{25}$, $\frac{96}{25}$,
>   $\frac25(4+3i)$) : conformes.
> - Partie II : $ap = bc$ et $cr = ab$ (cordes parallèles du cercle unité),
>   $aq = -bc$ ; puis $\frac{p-r}{b} = \frac ca - \frac ac = w - \bar w$ avec
>   $|w| = 1$, imaginaire pur : $(PR) \perp (OB)$. Cohérent.
> - Barème recompté sur le scan : I $= 1{,}75$ · II $= 1{,}75$ $= \mathbf{3{,}5}$.

> **Imprécisions du SUJET OFFICIEL — signalées, non « réparées »** (règle du
> protocole : on ne corrige pas un sujet officiel, on documente son défaut) :
> 1. **Partie I** : le système est posé dans $\mathbb{R}_+^2$ (aucune étoile
>    imprimée, vérifié au pixel) alors que le terme $\frac{1}{x+y}$ exige
>    $(x,y) \neq (0,0)$. Le domaine strict serait $\mathbb{R}_+^2 \setminus
>    \{(0,0)\}$. Sans conséquence sur la réponse — l'unique solution est
>    $(4,1)$ — mais une conversion en exercice ne doit pas présenter
>    $\mathbb{R}_+^2$ comme un domaine de définition valide.
> 2. **Partie II, question 1** : le quantificateur porte un tofu **sans
>    étoile**, alors que l'équivalence $|z| = 1 \iff \bar z = \frac1z$ suppose
>    $z \neq 0$. Beaucoup d'éditions de ce sujet écrivent $\mathbb{C}^*$ ; le
>    scan, lui, ne porte pas l'étoile. Lecture retenue : ce qui est imprimé
>    ($\mathbb{C}$), avec le défaut signalé ici.
> 3. **Partie II, question 2-c** : la droite $(PR)$ n'existe pas lorsque
>    $a = -c$ (points $A$ et $C$ diamétralement opposés), car alors
>    $p = \frac{bc}{a} = -b = \frac{ab}{c} = r$. L'énoncé n'exclut que le fait
>    que $A$, $B$, $C$ soient « deux à deux distincts », ce qui n'écarte pas ce
>    cas dégénéré. À exclure explicitement dans toute conversion.

---

## 2023 — session rattrapage — Exercice 3
Source: https://www.alloschool.com/element/142494
Statut: vérifié — re-fetch indépendant + re-dérivation (vérificateur adversarial, 2026-08-23)

- Filière / épreuve : Sciences Mathématiques (A) et (B) — شعبة العلوم الرياضية (أ) و (ب) (خيار فرنسية) — Mathématiques, 4 h, coef 9
- Code sujet : RS 24F · Barème de l'exercice : 3,5 points
- Images lues : `.../course-436/upload-85320/0004-big.jpg` (énoncé et Q1–Q4 début), `.../course-436/upload-85320/0005-big.jpg` (Q4-a à Q5)
- Pages du scan : 4–5 (sur 5) — consignes p.1

> **Note de lecture (mojibake)** : les blackboard-bold de cet exercice sont
> presque tous rendus en glyphes cassés (« ⌐ », « □ », « ⌊ », « ⌐ », « ‖ »,
> « $^-$ », etc.), différents d'une occurrence à l'autre. Adjudication par la
> logique de l'exercice, chaque lecture marquée *(glyphe à confirmer)* :
> $M_3(\mathbb{R})$ (anneau des matrices réelles $3\times 3$) ; $(a,b,c) \in
> \mathbb{R}^3$ (les coefficients de $M(a,b,c)$) ; l'ensemble d'arrivée
> $\mathbb{R} \times \mathbb{C}$ (forcé par $\varphi(M(a,b,c)) = (a,\ b+ci)$ :
> première composante réelle, seconde complexe) ; $z \in \mathbb{C}$ (partie
> réelle $\operatorname{Re}(z)$, partie imaginaire $\operatorname{Im}(z)$) ;
> $x \in \mathbb{R}$ (première composante de la loi $T$) ; $\mathbb{C}^*$
> (domaine de $\psi$, muni de $\times$).

**Structures algébriques (sous-groupe de matrices de $M_3(\mathbb{R})$, homomorphismes $\varphi$ et $\psi$, lois $*$ et $T$ sur $\mathbb{R} \times \mathbb{C}$, groupe commutatif, corps commutatif $(G, *, T)$).**

On rappelle que $\left(M_3(\mathbb{R})\ \text{(glyphe à confirmer)}, +, \times\right)$ est un anneau unitaire et non commutatif d'unité $I = \begin{pmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{pmatrix}$. Soit $E = \left\{ M(a,b,c) = \begin{pmatrix} a & 0 & 0 \\ 0 & b & -c \\ 0 & c & b \end{pmatrix} \ /\ (a,b,c) \in \mathbb{R}^3\ \text{(glyphe à confirmer)} \right\}$

1. (0,25) Montrer que $E$ est un sous-groupe de $\left(M_3(\mathbb{R})\ \text{(glyphe à confirmer)}, +\right)$
2. On munit l'ensemble $\mathbb{R} \times \mathbb{C}$ *(glyphe à confirmer)* de la loi de composition interne $*$ définie par :
   $\forall \left((x, z), (x', z')\right) \in \left(\mathbb{R} \times \mathbb{C}\right)^2$ *(glyphe à confirmer)* ; $(x, z) * (x', z') = (x + x',\ z + z')$ et on considère l'application $\varphi$ définie de $E$ vers $\mathbb{R} \times \mathbb{C}$ *(glyphe à confirmer)* par :
   $\forall (a, b, c) \in \mathbb{R}^3$ *(glyphe à confirmer)*, $\varphi\left(M(a,b,c)\right) = (a,\ b + ci)$
   a) (0,5) Montrer que $\varphi$ est un homomorphisme de $(E, +)$ vers $\left(\mathbb{R} \times \mathbb{C}, *\right)$ *(glyphe à confirmer)* et que $\varphi(E) = \mathbb{R} \times \mathbb{C}$ *(glyphe à confirmer)*
   b) (0,25) En déduire que $\left(\mathbb{R} \times \mathbb{C}, *\right)$ *(glyphe à confirmer)* est un groupe commutatif.
3. On munit $\mathbb{R} \times \mathbb{C}$ *(glyphe à confirmer)* de la loi de composition interne $T$ définie par :
   $\forall \left((x, z), (x', z')\right) \in \left(\mathbb{R} \times \mathbb{C}\right)^2$ *(glyphe à confirmer)* ; $(x, z)\, T\, (x', z') = \left(x \operatorname{Re}(z') + x' \operatorname{Re}(z),\ zz'\right)$
   ( $\operatorname{Re}(z)$ désigne la partie réelle du nombre complexe $z$ )
   a) (0,25) Montrer que $T$ est commutative.
   b) (0,25) Vérifier que $(0, 1)$ est l'élément neutre de $T$ dans $\mathbb{R} \times \mathbb{C}$ *(glyphe à confirmer)*
   c) (0,5) Vérifier que $\forall x \in \mathbb{R}$ *(glyphe à confirmer)*, $(1, i)\, T\, (x, -i) = (0, 1)$ ; en déduire que $T$ est non associative dans $\mathbb{R} \times \mathbb{C}$ *(glyphe à confirmer)*
4. Soit $G = \left\{ \left(\operatorname{Im}(z),\ z\right) \ /\ z \in \mathbb{C}\ \text{(glyphe à confirmer)} \right\}$
   ( $\operatorname{Im}(z)$ désigne la partie imaginaire du nombre complexe $z$ )
   a) (0,25) Montrer que $G$ est un sous-groupe de $\left(\mathbb{R} \times \mathbb{C}, *\right)$ *(glyphe à confirmer)*
   (On remarque que $\left(-\operatorname{Im}(z), -z\right)$ est le symétrique de $\left(\operatorname{Im}(z), z\right)$ pour la loi $*$ )
   b) (0,25) Soit $\psi$ l'application définie de $\mathbb{C}^*$ *(glyphe à confirmer)* vers $\mathbb{R} \times \mathbb{C}$ *(glyphe à confirmer)* par : $\forall z \in \mathbb{C}^*$ *(glyphe à confirmer)* ; $\psi(z) = \left(\operatorname{Im}(z),\ z\right)$
   Montrer que $\psi$ est un homomorphisme de $\left(\mathbb{C}^*, \times\right)$ *(glyphe à confirmer)* vers $\left(\mathbb{R} \times \mathbb{C}, T\right)$ *(glyphe à confirmer)*
   c) (0,5) En déduire que $\left(G - \{(0,0)\},\ T\right)$ est un groupe commutatif.
5. (0,5) Montrer que $\left(G, *, T\right)$ est un corps commutatif.

> **Re-dérivation (vérificateur adversarial, 2026-08-23)** — l'exercice est
> cohérent et chaque vérification demandée aboutit :
> - Matrice de $E$ relue au pixel (agrandissement ×3,2) : lignes
>   $(a,0,0)$ / $(0,b,-c)$ / $(0,c,b)$ — le $-c$ est bien en ligne 2 colonne 3.
>   C'est la représentation matricielle usuelle de $\mathbb{R} \times \mathbb{C}$,
>   ce qui confirme l'adjudication des glyphes de l'ensemble d'arrivée de
>   $\varphi$.
> - Q3-b : $(x,z)\,T\,(0,1) = (x\operatorname{Re}(1) + 0\cdot\operatorname{Re}(z),\ z) = (x,z)$ — $(0,1)$ est
>   bien neutre.
> - Q3-c : $(1,i)\,T\,(x,-i) = (1\cdot\operatorname{Re}(-i) + x\cdot\operatorname{Re}(i),\ i\cdot(-i)) = (0,1)$
>   pour **tout** $x$ réel — d'où une infinité de « symétriques » d'un même
>   élément, incompatible avec l'associativité. La question tient.
> - Q4-b : $\psi(z)\,T\,\psi(z') = (\operatorname{Im}(z)\operatorname{Re}(z') + \operatorname{Im}(z')\operatorname{Re}(z),\ zz')
>   = (\operatorname{Im}(zz'),\ zz') = \psi(zz')$ — homomorphisme confirmé, et
>   $\psi(\mathbb{C}^*) = G - \{(0,0)\}$, ce qui donne Q4-c.
> - Q5 : $G$ est stable pour $*$ et $T$ et $\psi$ transporte la structure de
>   $\mathbb{C}$ ; $(G,*,T)$ est bien un corps commutatif. La définition de $G$
>   sur $\mathbb{C}$ tout entier (et non $\mathbb{C}^*$) est requise par Q4-c,
>   qui retranche $(0,0)$ : l'adjudication du glyphe est confirmée par cette
>   contrainte interne.
> - Barème recompté sur le scan : $0{,}25 + 0{,}5 + 0{,}25 + 0{,}25 + 0{,}25 +
>   0{,}5 + 0{,}25 + 0{,}25 + 0{,}5 + 0{,}5 = \mathbf{3{,}5}$.

---

## 2023 — session rattrapage — Exercice 4
Source: https://www.alloschool.com/element/142494
Statut: vérifié — re-fetch indépendant + re-dérivation (vérificateur adversarial, 2026-08-23)

- Filière / épreuve : Sciences Mathématiques (A) et (B) — شعبة العلوم الرياضية (أ) و (ب) (خيار فرنسية) — Mathématiques, 4 h, coef 9
- Code sujet : RS 24F · Barème de l'exercice : 3 points
- Images lues : `.../course-436/upload-85320/0005-big.jpg` (énoncé complet), `.../course-436/upload-85320/0001-big.jpg` (page de consignes)
- Pages du scan : 5 (sur 5) — consignes p.1

> **Note de lecture** : aucun glyphe à adjuger — cet exercice ne fait
> intervenir aucun blackboard-bold ; les congruences $\equiv$ et les
> modules $[q]$, $[p]$ sont imprimés proprement.

**Arithmétique (somme géométrique $S = 1 + p + p^2 + \ldots + p^{p-1}$, petit théorème de Fermat, théorème de Bézout, $q \equiv 1\ [p]$).**

Soit $p$ un nombre premier impair. On pose : $S = 1 + p + p^2 + p^3 + \ldots + p^{p-1}$

Soit $q$ un nombre premier qui divise $S$.

1. a) (0,5) Montrer que $p$ et $q$ sont premiers entre eux.
   b) (0,25) En déduire que : $p^{q-1} \equiv 1\ [q]$
   c) (0,5) Vérifier que : $p^p - 1 = (p-1)S$, en déduire que : $p^p \equiv 1\ [q]$
2. On suppose que $p$ et $q-1$ sont premiers entre eux.
   a) (0,75) En utilisant le théorème de Bézout, montrer que : $p \equiv 1\ [q]$
   b) (0,25) En déduire que $S \equiv 1\ [q]$
3. (0,75) Montrer que : $q \equiv 1\ [p]$

> **Re-dérivation (vérificateur adversarial, 2026-08-23)** — l'exercice est un
> raisonnement par l'absurde en deux temps, entièrement cohérent :
> - Q1-a : $S = 1 + p(1 + p + \ldots + p^{p-2}) \equiv 1\ [p]$, donc $p \nmid S$ ;
>   comme $q \mid S$, $q \neq p$, et deux premiers distincts sont premiers entre
>   eux.
> - Q1-c : $(p-1)S = (p-1)(1 + p + \ldots + p^{p-1}) = p^p - 1$ (somme
>   géométrique télescopée) — identité exacte ; $q \mid S \Rightarrow q \mid p^p-1$.
> - Q2-a : Bézout donne $up + v(q-1) = 1$, d'où
>   $p = (p^p)^u (p^{q-1})^v \equiv 1\ [q]$.
> - Q2-b : $S$ a $p$ termes, tous $\equiv 1\ [q]$, donc $S \equiv p \equiv 1\ [q]$.
>   **Combiné à $q \mid S$, cela donne $q \mid 1$ : absurde.** L'hypothèse de la
>   question 2 (« $p$ et $q-1$ premiers entre eux ») est donc intenable — c'est
>   le ressort de la question 3.
> - Q3 : $p$ étant premier, $\operatorname{pgcd}(p, q-1) \in \{1, p\}$ ; le cas $1$
>   vient d'être écarté, donc $p \mid q-1$, c'est-à-dire $q \equiv 1\ [p]$.
> - Barème recompté sur le scan : $0{,}5 + 0{,}25 + 0{,}5 + 0{,}75 + 0{,}25 +
>   0{,}75 = \mathbf{3}$.

---

## Classement

Correspondance avec les slugs `content/maths/` (convention README §4 : le
problème d'analyse va sous le slug dominant, les autres slugs portent un
cross-list). **Contrôlé par la passe adversariale du 2026-08-23** : les huit
slugs cités existent bien sous `content/maths/` (vérifiés un à un). Une
correction a été apportée — voir la note sous la table.

| Exercice | Barème | Slug(s) cible(s) |
|----------|--------|------------------|
| Exercice 1 (analyse, 10 pts) | 10 pts | **`fonction-logarithme`** (dominant : $f_n(x) = \sqrt{x}\,(\ln x)^n$) · cross-list : `limites-continuite` (Partie I-1), `derivabilite-etude-fonctions` (Partie I-2 : dérivée, variations, inflexion ; Partie II-2a : unicité de $x_n$), `suites-numeriques` (Partie II : $(u_n)$ et $(x_n)$), `calcul-integral` (Partie III : double IPP, volume de révolution) |
| Exercice 2 (nombres complexes, 3,5 pts) | 3,5 pts | **`nombres-complexes-2`** (dominant : Partie II — cercle unité, $\bar z = 1/z$, cordes parallèles/perpendiculaires, configuration $p = bc/a$ ; c'est le slug SM de la table §4) · cross-list : **`nombres-complexes-1`** (Partie I — équation du second degré **à coefficients complexes**, discriminant, forme algébrique) |
| Exercice 3 (structures algébriques, 3,5 pts) | 3,5 pts | **`structures-algebriques`** (sous-groupe, homomorphismes, groupe commutatif, corps) |
| Exercice 4 (arithmétique, 3 pts) | 3 pts | **`arithmetique`** (Fermat, Bézout, congruences) |

**Correction du classement (2026-08-23).** L'exercice 2 était classé sous le
seul slug `nombres-complexes-2`, avec pour justification « système ramené au
second degré en $z$ ». Or `content/maths/nombres-complexes-2/lesson.md` exclut
**explicitement** ce contenu de son périmètre (note de validation en fin de
leçon : « Les équations du second degré à coefficients complexes […] ne sont
volontairement PAS traitées ici »), tandis que `nombres-complexes-1` le traite
en entier (section « Résoudre une équation du second degré dans $\mathbb{C}$ »,
discriminant donné par l'énoncé, relations somme/produit). Un élève envoyé sur
`nombres-complexes-2` pour préparer la Partie I n'y trouverait pas la méthode
demandée. Le cross-list `nombres-complexes-1` est donc ajouté ; le slug
dominant reste `nombres-complexes-2`, conformément à la table §4 du README
(filière SM) et parce que la Partie II — qui pèse le même barème (1,75 contre
1,75) — relève bien de ses configurations géométriques.

Les cross-lists de l'exercice 1 ont été recontrôlés question par question et
tiennent : `limites-continuite` (I-1a continuité à droite, I-1b/c/d limites),
`derivabilite-etude-fonctions` (I-2 dérivée, variations, inflexion ; II-2a
existence et unicité par stricte monotonie), `suites-numeriques` (II-1 et II-2
$(u_n)$ et $(x_n)$), `calcul-integral` (III double IPP et volume de
révolution). Le slug dominant `fonction-logarithme` est confirmé : le ressort
de tout l'exercice est la croissance comparée $\ln u / u \to 0$, mobilisée
via la réécriture imposée en I-1a/I-1c.
