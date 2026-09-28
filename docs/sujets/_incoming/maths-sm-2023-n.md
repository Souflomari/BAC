# Examen national Mathématiques — SM — 2023, session NORMALE (NS 24F) — exercices 1 et 2

> **Fichier d'entrée (`_incoming`) — VÉRIFIÉ le 2026-08-27.** Protocole
> `docs/sujets/maths/README.md`. Les deux exercices ont subi la passe
> adversariale indépendante (re-fetch du scan depuis le HTML de la page
> source, relecture au zoom, re-dérivation complète). Voir
> « Ce que la vérification a trouvé » en fin de fichier.
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

1. **Le symbole $\le$ est rendu par une double virgule « ,, »** — **six**
   occurrences, et non cinq comme l'annonçait la première lecture : exercice 1
   Partie III q2-b (×1) et q2-c (×1) ; exercice 2 q1-c (×2) et q2-a (×2).
   *(Compte rectifié par le vérificateur — l'énumération de la première lecture
   était juste, seul le mot « cinq » était faux.)*

   **Vérifié au zoom (×12 à ×14) : le glyphe est bien une double virgule basse
   « „ », pas un $\le$ mal imprimé** — deux virgules distinctes, descendantes,
   posées sur la ligne de base, de forme identique aux six emplacements et
   nettement différente du point-virgule qui figure sur la même ligne. La forme
   ne porte donc aucune information ; l'adjudication est mathématique.

   **Adjugé $\le$ (et non $<$), preuve par la q2-c :** l'énoncé y affirme
   $|u_n - \alpha| \;?\; \frac{1}{2^n}|\beta - \alpha|$ pour **tout**
   $n \in \mathbb{N}$ ; en $n = 0$ cela donne
   $|u_0 - \alpha| = |\beta - \alpha| = \frac{1}{2^0}|\beta - \alpha|$,
   soit une **égalité**. Un $<$ strict rendrait l'énoncé faux au rang initial de
   la récurrence. Le symbole est donc $\le$. Le glyphe cassé ayant la même forme
   aux six emplacements (contrôlée au zoom, recadrage par recadrage — aucune
   comparaison pixel à pixel n'a été faite, seulement une comparaison visuelle
   à fort grossissement), les six sont des $\le$.
2. **Les lettres ajourées sont cassées.** « $\beta \in$ | |$^+$ » (ex. 1,
   Partie III, q2) est lu $\mathbb{R}^+$ ; « $(S_n)_{n \in\ *}$ » (ex. 2, q2)
   est lu $\mathbb{N}^*$ par cohérence avec la ligne précédente qui écrit
   correctement $n \in \mathbb{N}^*$.

   **$\mathbb{R}^{+}$ confirmé au zoom ×20 : l'exposant est un « + » seul, il
   n'y a pas d'astérisque.** Ce n'est donc pas $\mathbb{R}^{+*}$, et
   $\beta = 0$ est bien un cas admis. Contrôle de robustesse : le glyphe
   astérisque, lui, **s'imprime correctement** ailleurs dans le même scan
   (« $n \in \mathrm{N}^{*}$ » et « $(S_n)_{n\in\ *}$ », ex. 2, p. 3) — son
   absence après le « + » est donc une absence réelle, pas une casse de plus.
   Cohérent avec la q2-a, qui demande $u_n \ge 0$ (et non $u_n > 0$) et dont
   l'initialisation est $u_0 = \beta$.
3. Les $\mathbb{N}$ des quantificateurs de l'exercice 1 Partie III sont, eux,
   **rendus correctement** (« $\forall n \in \mathrm{N}$ ») — le mojibake est
   intermittent, ce qui interdit d'en tirer une règle.

Aucune **valeur numérique** n'est touchée par ces trois familles.

---

## 2023 — session normale — Exercice 1
Source: https://www.alloschool.com/element/142490
Statut: vérifié — re-fetch indépendant + re-dérivation (vérificateur adversarial, 2026-08-27)

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

> **Correction du vérificateur** — exercice 1, passe adversariale du
> 2026-08-27 (re-fetch indépendant + re-dérivation).
>
> **Ce qui était faux : rien dans le corps de l'exercice.** Relecture
> caractère par caractère du scan re-téléchargé (p. 2 pour les Parties I, II
> et l'amorce de III ; p. 3 pour la fin de III) : chaque nombre, indice,
> exposant, borne, quantificateur et intervalle de la transcription
> correspond à ce que le scan porte. Aucune correction à apporter aux
> énoncés.
>
> **Une correction hors corps, dans la note de lecture :** la note annonçait
> « cinq occurrences » du glyphe cassé lu $\le$ ; il y en a **six**
> (III-2b ×1, III-2c ×1, ex. 2 q1-c ×2, ex. 2 q2-a ×2 — l'énumération de la
> première lecture était exacte, seul le total était faux). Compté à l'œil sur
> les recadrages, symbole par symbole.
>
> **Lectures fragiles, adjugées et mesurées :**
> - *Le glyphe « ,, » (III-2b et III-2c).* Recadrage à ×14 sur les pixels
>   $x\!\in\![0{,}43;0{,}52]$, $y\!\in\![0{,}163;0{,}197]$ (q2-b) et
>   $x\!\in\![0{,}49;0{,}60]$, $y\!\in\![0{,}208;0{,}240]$ (q2-c) de la page 3.
>   C'est une **double virgule basse « „ »**, de forme identique aux deux
>   endroits et nettement distincte du point-virgule imprimé sur la même
>   ligne : le glyphe ne porte donc aucune information. Adjugé $\le$ (et non
>   $<$) par la q2-c au rang $n=0$, où l'énoncé devient l'**égalité**
>   $|u_0-\alpha| = |\beta-\alpha| = \tfrac{1}{2^0}|\beta-\alpha|$ — un $<$
>   strict y serait faux. Confirmation indépendante par la q2-b : l'inégalité
>   des accroissements finis appliquée à $F=\tfrac13 f$ donne
>   $|F'| = \tfrac13|f'| \le \tfrac13\cdot\tfrac32 = \tfrac12$, borne
>   **atteinte** en $0$ puisque $f'_d(0) = -\tfrac32$ (II-2c) — donc $\le$.
> - *« $\beta \in$ | |$^{+}$ » (III-2).* Recadrage à ×20 sur
>   $x\!\in\![0{,}245;0{,}320]$, $y\!\in\![0{,}878;0{,}906]$ de la page 2 :
>   l'exposant est un **« + » seul, sans astérisque**. C'est
>   $\mathbb{R}^{+}$, pas $\mathbb{R}^{+*}$ ; $\beta = 0$ est admis. Le glyphe
>   astérisque s'imprimant correctement ailleurs dans le même scan
>   ($n \in \mathrm{N}^{*}$, p. 3), son absence ici est réelle.
> - *Le couple $\tfrac13$ / $3x$.* Vérifié au zoom : la q1 porte bien
>   $f(x) = 3x$ et la relation de récurrence bien $u_{n+1} = \tfrac13 f(u_n)$.
>   Les deux se répondent exactement — $\alpha$ est le point fixe de
>   $F(x) = \tfrac13 f(x)$, ce qui est précisément ce que la q2-b exploite.
>
> **Barèmes relevés dans la marge du scan** (recadrage de la colonne de
> gauche, pages 2 et 3) : I $= 0{,}5+0{,}5+0{,}5 = 1{,}5$ ;
> II $= 0{,}5+0{,}25+0{,}25+0{,}5+0{,}75+0{,}5+0{,}25+0{,}25+0{,}75 = 4{,}0$ ;
> III $= 0{,}5+0{,}5+0{,}5+0{,}5+0{,}25 = 2{,}25$ ; total
> $\mathbf{7{,}75}$ — conforme à l'en-tête « EXERCICE1 :(7.75 points) » et à
> la carte de la p. 1. Recompte confirmé.
>
> **Re-dérivation (l'exercice est résoluble de bout en bout, aucune identité
> imprimée n'est fausse) :**
> - *I-1a.* $\frac{4}{(2+t)^2} \le \frac{1}{1+t} \iff 4(1+t) \le (2+t)^2 \iff 0 \le t^2$ ✔.
>   Et avec $u = \frac{1}{1+t} \in\,]0,1]$ :
>   $\frac{1}{1+t} \le \frac12\left(1+\frac{1}{(1+t)^2}\right) \iff 2u \le 1+u^2 \iff 0 \le (1-u)^2$ ✔.
> - *I-1b.* Intégration de I-1a sur $[0,x]$ :
>   $\int_0^x \frac{4}{(2+t)^2}dt = \frac{2x}{2+x}$ ✔ ;
>   $\int_0^x \frac{dt}{1+t} = \ln(1+x)$ ✔ ;
>   $\frac12\int_0^x\left(1+\frac{1}{(1+t)^2}\right)dt = \frac12\left(x + \frac{x}{1+x}\right) = \frac12\cdot\frac{x^2+2x}{1+x}$
>   ✔ — **exactement** le membre de droite
>   imprimé. L'encadrement de I-1a est taillé pour produire celui de I-1b.
> - *I-2.* L'encadrement de I-1b donne
>   $-\frac{1}{2+x} \le \frac{g(x)-1}{x} \le -\frac{1}{2(1+x)}$, et les deux
>   bornes tendent vers $-\frac12$ ✔.
> - *II-2b.* $\left(\frac{e^{-x}-1}{x}\right)g(x) + \frac{g(x)-1}{x} = \frac{g(x)e^{-x} - g(x) + g(x) - 1}{x} = \frac{f(x)-1}{x}$
>   ✔ (identité
>   exacte, télescopage du terme $g(x)$).
> - *II-2c.* Limite : $(-1)\cdot 1 + \left(-\frac12\right) = -\frac32$, donc
>   $f'_d(0) = -\frac32$ ✔ — valeur cohérente avec la borne $-\frac32$ de II-4.
> - *II-3.* Avec $h(x) = \frac{\ln(1+x)}{x}$ et $f = h\,e^{-x}$ :
>   $f' = e^{-x}(h'-h)$ et
>   $h'-h = \frac{\frac{x}{1+x} - (1+x)\ln(1+x)}{x^2} = \frac{x-(1+x)^2\ln(1+x)}{x^2(1+x)}$
>   ✔ — **exactement** l'expression
>   imprimée.
> - *II-4a.* **Majoration** (le quotient est $<0$) : il faut
>   $\ln(1+x) > \frac{x}{(1+x)^2}$, ce que donne la borne **gauche** de I-1b,
>   puisque
>   $\frac{2x}{2+x} - \frac{x}{(1+x)^2} = \frac{x^2(2x+3)}{(2+x)(1+x)^2} > 0$
>   pour $x>0$ ✔. **Minoration** (le quotient est $>-\frac32$) : il faut
>   $(1+x)^2\ln(1+x) < x + \frac32 x^2(1+x)$, et la borne **droite** de I-1b
>   donne $(1+x)^2\ln(1+x) \le \frac{x(x+2)(1+x)}{2}$, l'écart au majorant
>   valant exactement
>   $x + \frac32 x^2(1+x) - \frac{x(x+2)(1+x)}{2} = x^3 > 0$ ✔. Les deux
>   inégalités sont donc **strictes** pour $x>0$, conformément au scan — et les
>   deux volets sortent directement des deux bornes de I-1b, une chacune.
> - *II-4b.* $0 < e^{-x} < 1$ et $\varphi(x) < 0$ donnent
>   $\varphi(x) < \varphi(x)e^{-x} = f'(x) < 0$ ✔.
> - *III-1.* $\psi = f - 3x$ est continue, $\psi(0) = 1 > 0$,
>   $\psi' = f' - 3 < 0$, $\psi \to -\infty$ : zéro unique $\alpha$ dans
>   $]0,+\infty[$ ✔.
> - *III-2.* a) $f > 0$ sur $[0,+\infty[$ donne $u_n \ge 0$ par récurrence
>   (l'initialisation exige $\beta \ge 0$, d'où l'importance de
>   $\mathbb{R}^{+}$) ✔. b) et c) : voir plus haut ✔. d)
>   $\frac{1}{2^n}|\beta-\alpha| \to 0$ ✔.

---

## 2023 — session normale — Exercice 2
Source: https://www.alloschool.com/element/142490
Statut: vérifié — re-fetch indépendant + re-dérivation (vérificateur adversarial, 2026-08-27)

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

> **Correction du vérificateur** — exercice 2, passe adversariale du
> 2026-08-27 (re-fetch indépendant + re-dérivation).
>
> **Ce qui était faux : rien.** L'exercice 2 tient entier sur la page 3 du
> scan. Relecture caractère par caractère au zoom : énoncé, quantificateurs,
> exposants, bornes de sommation, barèmes — tout correspond. Aucune
> correction à apporter.
>
> **Les deux paires « qui se ressemblent », mesurées séparément** (c'était le
> risque nommé par le transcripteur ; les deux lectures tiennent) :
> - *q1-c, les exposants.* Recadrage à ×6 sur $y\!\in\![0{,}535;0{,}585]$ de
>   la page 3 : la borne **gauche** porte $e^{\frac{2k}{n}}$, la borne
>   **droite** porte $e^{\frac{2(k+1)}{n}}$ — les parenthèses autour de $k+1$
>   sont visibles et sans ambiguïté. Pas d'inversion.
> - *q2-a, les bornes de sommation.* Recadrage à ×7 sur
>   $y\!\in\![0{,}625;0{,}680]$ : la somme **gauche** va de $k=0$ à $n-1$, la
>   somme **droite** de $k=1$ à $n$, et **les deux** portent le même exposant
>   $e^{\frac{2k}{n}}$ (ce n'est pas $2(k+1)/n$ qui réapparaît à droite —
>   c'est le décalage d'indice qui absorbe le $+1$). Vérifié par le calcul :
>   $\sum_{k=0}^{n-1}\sqrt{1+e^{\frac{2(k+1)}{n}}} = \sum_{j=1}^{n}\sqrt{1+e^{\frac{2j}{n}}}$
>   — la q2-a est donc **la
>   sommation littérale de la q1-c**, réécrite par changement d'indice à
>   droite. Les deux paires se répondent exactement.
> - *Les quatre « ,, » (q1-c ×2, q2-a ×2).* Même glyphe cassé qu'à
>   l'exercice 1, vérifié au zoom ×12 : double virgule basse, identique. Lus
>   $\le$ — voir la preuve par le rang $n=0$ de l'exercice 1, III-2c.
>
> **Barèmes relevés dans la marge** (page 3) :
> $0{,}5 + 0{,}25 + 0{,}5 + 0{,}5 + 0{,}5 = \mathbf{2{,}25}$ — conforme à
> l'en-tête « EXERCICE2 : (2.25 points) » et à la carte de la p. 1.
>
> **Re-dérivation (résoluble de bout en bout) :**
> - *q1-a.* TAF appliqué à $x \mapsto e^{x}$, continue sur
>   $\left[\frac{k}{n},\frac{k+1}{n}\right]$ et dérivable sur l'ouvert :
>   $\exists c_k$ intérieur tel que
>   $e^{\frac{k+1}{n}} - e^{\frac{k}{n}} = \left(\frac{k+1}{n}-\frac{k}{n}\right)e^{c_k} = \frac1n e^{c_k}$ ✔.
> - *q1-b.* $M_kM_{k+1} = \sqrt{\left(\frac1n\right)^2 + \left(\frac1n e^{c_k}\right)^2} = \frac1n\sqrt{1+e^{2c_k}}$
>   ✔ — l'écart des abscisses vaut bien $\frac1n$,
>   et l'écart des ordonnées est exactement la quantité de la q1-a.
> - *q1-c.* $\frac{k}{n} < c_k < \frac{k+1}{n}$ et croissance de
>   $t \mapsto \sqrt{1+e^{2t}}$ ✔. (L'encadrement imprimé est large ; le calcul
>   le donne strict — le sujet majore/minore sans chercher la stricte
>   inégalité, ce qui est licite et sans conséquence pour la q2.)
> - *q2-a.* Somme de la q1-c pour $k = 0,\ldots,n-1$, avec le changement
>   d'indice ci-dessus à droite ✔.
> - *q2-b.* Les deux bornes sont les sommes de Riemann de
>   $h(x) = \sqrt{1+e^{2x}}$ (continue sur $[0,1]$) pour la subdivision
>   régulière $x_k = \frac{k}{n}$ : $\frac1n\sum_{k=0}^{n-1}h\!\left(\frac{k}{n}\right)$
>   (points à gauche) et $\frac1n\sum_{k=1}^{n}h\!\left(\frac{k}{n}\right)$
>   (points à droite). Toutes deux tendent vers $\int_0^1 h$ ; encadrement et
>   théorème des gendarmes ✔. Le résultat imprimé est exact.
>
> **Aucune donnée ne manque** : la définition de $M_k$ (q. de tête) fournit
> les deux coordonnées, la q1-a fournit $c_k$, la q1-b la distance, la q1-c
> l'encadrement, la q2-a la sommation. La chaîne est complète.

---

## Classement proposé — **contrôlé** contre l'arborescence réelle

Correspondance vers les slugs `content/maths/`. **Contrôlée par le
vérificateur le 2026-08-27** (`ls content/maths/`) : les **neuf** slugs cités
dans ce fichier existent tous — `fonction-logarithme`, `limites-continuite`,
`derivabilite-etude-fonctions`, `suites-numeriques`, `fonction-exponentielle`,
`calcul-integral`, ainsi que les trois slugs de la note de portée
(`nombres-complexes-2`, `arithmetique`, `structures-algebriques`). Aucun slug
fantôme, aucune faute de frappe.

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

## Ce que la vérification devait trancher en priorité — **tranché**

*(Liste écrite par le transcripteur ; verdict du vérificateur en regard.)*

1. **Les occurrences de « ,, » lues $\le$** — ~~cinq~~ **six** (ex. 1 III-2b,
   III-2c ; ex. 2 1-c ×2, 2-a ×2). **Tranché : $\le$**, aux six emplacements.
   Le glyphe est une double virgule basse sans valeur informative ; la lecture
   est forcée par la q2-c de l'exercice 1, qui est une **égalité** au rang
   $n=0$. Le compte « cinq » était faux et a été rectifié.
2. **Le « $\beta \in$ | |$^+$ »** — **tranché : $\mathbb{R}^{+}$**. Exposant
   « + » seul au zoom ×20, pas d'astérisque ; ce n'est pas $\mathbb{R}^{+*}$,
   et $\beta = 0$ est admis.
3. **Les exposants et bornes de l'exercice 2** — **tranché : la transcription
   est exacte.** Aucune inversion. q1-c : $e^{\frac{2k}{n}}$ à gauche,
   $e^{\frac{2(k+1)}{n}}$ à droite. q2-a : $k=0 \to n-1$ à gauche,
   $k=1 \to n$ à droite, **même exposant $e^{\frac{2k}{n}}$ des deux côtés**.
4. **Le couple $\frac{1}{3}$ / $3x$** — **tranché : les deux se répondent.**
   $\alpha$ est le point fixe de $F = \frac13 f$, ce qu'exploite la q2-b.
5. **La re-dérivation complète** — **faite**, exercice par exercice. Toutes les
   identités imprimées sont vraies ; aucune donnée ne manque.

## Ce que la vérification a trouvé

> ### ⚠️ Cette passe de vérification PRÉCÈDE la règle du 2026-08-27
>
> Une passe ultérieure, sur SM 2025 normale, a découvert qu'AlloSchool peut
> servir depuis son cache CDN **un autre sujet que celui demandé** — et qu'une
> lecture visuelle, la transcription sous les yeux, « retrouve » alors
> l'énoncé attendu sur des pages qui ne le contiennent pas. Le protocole du
> sas exige depuis quatre contrôles (voir `README.md`, section « la lecture
> visuelle seule ne suffit pas ») : année imprimée relue sur **chaque** page,
> recoupement par un instrument **non visuel**, MD5 consignés avec un second
> téléchargement, et contrôle du `<title>` servi.
>
> **Ce que cette passe-ci a effectivement fait**, d'après son propre rapport :
> elle a re-dérivé les URLs d'images depuis le HTML, **contrôlé le `<title>`
> servi** (qui nommait la bonne année et la bonne filière), lu les pages
> comme images avec recadrages, et re-dérivé mathématiquement toutes les
> identités de l'énoncé.
>
> **Ce qu'elle n'a pas fait** : le contrôle de l'année page par page, le
> recoupement non visuel, et les MD5 avec second téléchargement.
>
> Le contrôle du `<title>` est un vrai garde-fou — il vient du HTML, pas de
> l'attente du lecteur — et c'est précisément lui qui a mis la passe SM 2025
> sur la piste. Le risque résiduel est donc **faible mais non nul** : le
> panachage constaté en 2025 touchait les images alors que la page HTML était
> correcte. **À l'arbitrage de l'owner** : re-passer ce sujet sous le
> protocole complet, ou accepter le niveau de preuve ci-dessus.


**Passe adversariale indépendante, 2026-08-27.** Scan re-fetché par le
vérificateur, non repris de la transcription.

### Méthode (ce qui a réellement été fait)

- **Re-fetch et re-dérivation des URLs.** `curl` sur
  `https://www.alloschool.com/element/142490`, extraction des `<img>` du HTML :
  les cinq pages sont `.../assets/documents/course-436/upload-85316/000{1..5}-big.jpg`.
  **Le chemin `course-436/upload-85316` écrit dans la transcription est
  correct** — re-dérivé du HTML, pas recopié. Titre de la page servie :
  « Examen National Mathématiques Sciences Maths 2023 Normale ». Les cinq
  fichiers ont été téléchargés (JPEG 1240×1754) et **lus comme images**.
- **Relecture au zoom.** Recadrages à ×4 à ×20 sur chaque point litigieux
  (glyphes cassés, exposants, bornes de sommation, colonne des barèmes).
- **Re-dérivation mathématique** de toutes les identités que l'énoncé demande
  de « montrer », et contrôle de résolubilité de bout en bout.
- **Contrôle de portée.** Pages 4 et 5 relues : elles ne portent que la fin de
  l'exercice 3, l'exercice 4 et l'exercice 5. **Les exercices 1 et 2 tiennent
  entièrement sur les pages 2 et 3** — la transcription ne laisse rien dehors.

### Défauts trouvés

**Un seul, et il est hors énoncé :**

1. **Le compte « cinq occurrences » du glyphe $\le$ était faux — il y en a
   six.** L'énumération donnée par le transcripteur (III-2b, III-2c, ex. 2 1-c
   ×2, ex. 2 2-a ×2) totalise bien 6. Corrigé dans la note de lecture et dans
   la liste de priorités. **Sans conséquence sur les énoncés**, qui portaient
   déjà les six $\le$ au bon endroit.

**Aucun défaut dans le corps des deux exercices.** C'est un résultat, et il
est dit explicitement : la relecture caractère par caractère du scan
re-téléchargé n'a fait apparaître **aucune** divergence de nombre, d'indice,
d'exposant, de borne, de quantificateur, d'intervalle ni de barème.

### Ce qui a été contrôlé, point par point

| Contrôle | Verdict |
|---|---|
| URLs des images re-dérivées du HTML | ✔ conformes (`course-436/upload-85316`, 5 pages) |
| En-tête p. 1 : NS 24F, 2023 normale, SM (A) et (B) option française, 4 h, coef 9 | ✔ conforme |
| Carte des composantes p. 1 : 7,75 / 2,25 / 3,5 / 3 / 3,5 | ✔ conforme, somme $=20$ |
| Barèmes de marge, ex. 1 (17 relevés : 3 + 9 + 5) | ✔ $1{,}5 + 4{,}0 + 2{,}25 = 7{,}75$ |
| Barèmes de marge, ex. 2 (5 relevés) | ✔ $0{,}5+0{,}25+0{,}5+0{,}5+0{,}5 = 2{,}25$ |
| Les six « ,, » | ✔ lus $\le$, preuve par le rang $n=0$ de III-2c |
| $\beta \in \mathbb{R}^{+}$ (pas $\mathbb{R}^{+*}$) | ✔ exposant « + » seul, ×20 |
| $(S_n)_{n\in\mathbb{N}^{*}}$ | ✔ l'astérisque est imprimé, seul le $\mathbb{N}$ est cassé |
| Exposants ex. 2 q1-c ($2k/n$ vs $2(k+1)/n$) | ✔ non inversés |
| Bornes de sommation ex. 2 q2-a ($k{=}0{\to}n{-}1$ vs $k{=}1{\to}n$) | ✔ non inversées, même exposant des deux côtés |
| $u_{n+1} = \frac13 f(u_n)$ et $f(x) = 3x$ | ✔ appariés |
| Encadrements I-1a, I-1b | ✔ vrais, et I-1b est l'intégrée exacte de I-1a |
| Identité II-2b | ✔ vraie (télescopage) |
| Expression de $f'$ en II-3 | ✔ retrouvée à l'identique |
| Encadrement II-4a (bornes strictes) | ✔ vrai, et déduit directement de I-1b |
| $f'_d(0) = -\frac32$ (II-2c) cohérent avec la borne $-\frac32$ de II-4 | ✔ cohérent |
| Somme de Riemann ex. 2 q2-b | ✔ les deux bornes convergent vers $\int_0^1\sqrt{1+e^{2x}}dx$ |
| Résolubilité de bout en bout, ex. 1 et ex. 2 | ✔ complète, aucune donnée manquante |
| Absence de figure imprimée (ex. 1 q5-b « construire ») | ✔ confirmée sur le scan |
| Portée : rien des ex. 1–2 sur les pages 4–5 | ✔ confirmée |
| Slugs `content/maths/` cités | ✔ les 9 existent |

**Aucune incohérence du sujet officiel n'a été trouvée.** Contrairement à la
campagne rattrapage, il n'y a ici aucune question incalculable, aucune
identité imprimée fausse, aucune donnée manquante. Les deux exercices sont
sains.

### Points restés indécidables

**Aucun.** Les six glyphes cassés sont adjugés par une preuve mathématique
(l'égalité au rang $n=0$), pas par une conjecture de forme ; le
$\mathbb{R}^{+}$ est adjugé par lecture directe au zoom, confirmée par le
fait que l'astérisque s'imprime ailleurs dans le même document.

### Note pour la conversion (hors périmètre de cette passe)

Les identifiants `bk-2023-n-x1` et `bk-2023-n-x2` **sont déjà pris** dans
`content/maths/geometrie-espace/bank.yaml` et
`content/maths/nombres-complexes-1/bank.yaml` — mais par les exercices de
l'épreuve **SExp** 2023 normale (code NS 22F, `element/137482`), pas SM. Ce
n'est **pas** un conflit : `web/src/lib/examens.ts` groupe sur
`source.{filiere, year, session}` (l. 81), les identifiants ne sont uniques
qu'à l'intérieur d'un `bank.yaml`, et ni `fonction-logarithme` ni
`calcul-integral` ne portent aujourd'hui de `bk-2023-n-x1`/`x2`. Le point est
signalé pour que la conversion **renseigne bien `filiere: "SM"`** — c'est le
seul champ qui sépare les deux épreuves de 2023 normale.
