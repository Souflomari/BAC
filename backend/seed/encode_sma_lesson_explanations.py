"""Phase 3 SMA encoder: surgically patches sma_*.lesson checkpoint explanations.

Produces backend/supabase/migrations/028_lessons_sma_expanded_solutions.sql
which uses the same _patch_cp PL/pgSQL approach as migration 025/026.

Each expansion is keyed by (skill_code, stem_fr) and replaces the
explanation_fr field with a 250-450 char pedagogical paragraph.

Coverage: all 194 SMA checkpoint questions across 32 sma_* skills + the
4 SMA try-it blocks (sma_limit_def, sma_deriv_definition,
sma_sequences_review, sma_ph_definition).
"""

# Each tuple: (skill_code, stem_fr, expanded_explanation_fr)
CHECKPOINTS = [
    # ----- sma_am_basics -----
    ('sma_am_basics', r'Si $m > 1$ :',
     r"Le coefficient de modulation $m = U_m/U_p$ (rapport amplitude signal modulant / porteuse) doit rester $\le 1$. Si $m > 1$ : **sur-modulation**, l'enveloppe du signal modulé croise zéro et la détection produit une distorsion irrécupérable. **Critère pratique** : régler la station d'émission pour $m \le 0{,}9$ idéalement."),
    ('sma_am_basics', r'Pourquoi utiliser une porteuse haute fréquence ?',
     r"Les ondes audio (20 Hz–20 kHz) ne se propagent pas efficacement dans l'atmosphère et nécessiteraient des antennes gigantesques (longueur d'onde de plusieurs km). On les **transporte** sur une porteuse radio (kHz–MHz) qui se propage bien et permet des antennes de taille raisonnable. **Principe AM** : moduler l'amplitude de la porteuse par le signal audio."),
    ('sma_am_basics', r"Amplitude d'un signal $s(t) = 5 \cos(100 t)$ :",
     r"Pour un signal sinusoïdal $s(t) = A \cos(\omega t + \varphi)$, l'amplitude est le **coefficient devant le cosinus**, soit $A$. Ici $A = 5$ (l'unité dépend du contexte : V, A, etc.). $\omega = 100$ rad/s est la pulsation, à ne pas confondre avec l'amplitude. **Mémo** : amplitude = hauteur max du signal."),
    ('sma_am_basics', r"Le filtre passe-bas après détection d'enveloppe sert à :",
     r"Après détection d'enveloppe, le signal contient encore des résidus haute fréquence de la porteuse $f_c$. Le **filtre passe-bas** ne laisse passer que les composantes basses fréquences (le signal modulant $f_m$, audio) et **élimine $f_c$**. Le résultat est le signal audio reconstitué, prêt pour le haut-parleur."),
    # ----- sma_b_field_basics -----
    ('sma_b_field_basics', r'Sur un fil parcouru par $i$ dans $\vec{B}$, la force est :',
     r"La **force de Laplace** sur un élément de fil est $d\vec{F} = i\,d\vec{\ell} \wedge \vec{B}$. Le **produit vectoriel** rend $\vec{F}$ perpendiculaire à la fois au fil ($d\vec{\ell}$) et à $\vec{B}$. Sa norme est maximale quand le fil est perpendiculaire au champ ($\sin\theta = 1$). Application : moteur électrique, balance de Cotton."),
    ('sma_b_field_basics', r'Si on double $v$, le rayon :',
     r"Pour une charge $q$ en mouvement circulaire dans $\vec{B}$, l'égalité $qvB = mv^2/r$ donne $r = mv/(qB)$ — donc **$r$ proportionnel à $v$**. Doubler la vitesse double le rayon de la trajectoire. La **fréquence cyclotron** $f = qB/(2\pi m)$ ne dépend pas de $v$, seul le rayon change."),
    ('sma_b_field_basics', r'$\vec{u} \wedge \vec{v} = \vec{0}$ si :',
     r"Le produit vectoriel s'annule ssi $\vec{u}$ et $\vec{v}$ sont **parallèles** (ou antiparallèles), c'est-à-dire colinéaires. Justification : $|\vec{u} \wedge \vec{v}| = |\vec{u}||\vec{v}|\sin\theta$, et $\sin\theta = 0$ ssi $\theta = 0$ ou $\pi$. **Cas particulier** : si l'un des vecteurs est nul, le produit est nul aussi."),
    ('sma_b_field_basics', r'Si on double $B$, le rayon :',
     r"De $r = mv/(qB)$, on voit que **$r \propto 1/B$** : doubler $B$ **divise le rayon par deux**. Plus le champ magnétique est fort, plus la trajectoire circulaire est serrée. Application : un spectromètre de masse utilise un $B$ fort pour bien séparer des ions de masses voisines."),
    ('sma_b_field_basics', r'Sur une charge en mouvement dans $\vec{B}$, le travail de la force magnétique est :',
     r"La force magnétique $\vec{F} = q\vec{v} \wedge \vec{B}$ est **toujours perpendiculaire à $\vec{v}$** (par le produit vectoriel). Le travail élémentaire $\vec{F} \cdot d\vec{r} = \vec{F} \cdot \vec{v}\,dt = 0$ — **toujours nul**. Conséquence : la force magnétique **ne change jamais l'énergie cinétique**, seulement la direction du mouvement."),
    ('sma_b_field_basics', r'Une charge au repos dans $\vec{B}$ subit :',
     r"$\vec{F} = q\vec{v} \wedge \vec{B}$ : si $\vec{v} = \vec{0}$, alors $\vec{F} = \vec{0}$. **Une charge immobile ne subit aucune force magnétique**, même dans un champ très fort. Contrairement à la force électrique qui agit sur toute charge, qu'elle bouge ou non."),
    # ----- sma_complex_basics -----
    ('sma_complex_basics', r'Module de $3 + 4i$ :',
     r"**Module** d'un complexe $z = a + bi$ : $|z| = \sqrt{a^2 + b^2}$ — distance à l'origine dans le plan complexe. Pour $3 + 4i$ : $|z| = \sqrt{9 + 16} = \sqrt{25} = 5$. **Astuce** : reconnaître le triplet pythagoricien $(3, 4, 5)$, très courant dans les exercices — mémoriser fait gagner du temps."),
    ('sma_complex_basics', r'$|e^{i\theta}|$ vaut :',
     r"$e^{i\theta} = \cos\theta + i\sin\theta$, donc $|e^{i\theta}| = \sqrt{\cos^2\theta + \sin^2\theta} = \sqrt{1} = 1$. Géométriquement : $e^{i\theta}$ parcourt le **cercle unité** quand $\theta$ varie. C'est la base de la forme exponentielle des complexes : $z = re^{i\theta}$ avec $r = |z|$."),
    ('sma_complex_basics', r'Distance entre $z_1 = 1+i$ et $z_2 = 4+5i$ :',
     r"La distance entre les points d'affixes $z_1$ et $z_2$ est $|z_2 - z_1|$. Calcul : $z_2 - z_1 = (4-1) + (5-1)i = 3 + 4i$. Donc $|z_2 - z_1| = \sqrt{9 + 16} = 5$. **Astuce** : le triplet $(3, 4, 5)$ revient encore — on le retrouve souvent en géométrie complexe."),
    ('sma_complex_basics', r'$\cos(\pi/2) = ?$',
     r"$\cos(\pi/2) = 0$. Valeur fondamentale du cercle trigonométrique : à l'angle $\pi/2$ (= 90°), le point sur le cercle unité est en haut (axe Oy), donc abscisse = $\cos(\pi/2) = 0$. **Mémo** : $\cos$ s'annule en $\pi/2 + k\pi$ pour $k$ entier."),
    ('sma_complex_basics', r'$\sin(\pi) = ?$',
     r"$\sin(\pi) = 0$. À l'angle $\pi$ (= 180°), le point sur le cercle unité est en $(-1, 0)$, donc ordonnée = $\sin(\pi) = 0$. **Mémo** : $\sin$ s'annule en $k\pi$ pour $k$ entier — autres zéros : 0, $\pi$, $2\pi$, etc."),
    ('sma_complex_basics', r'$i^2 = ?$',
     r"Par **définition** du nombre $i$ (unité imaginaire) : $i^2 = -1$. C'est cette propriété qui distingue $\mathbb{C}$ de $\mathbb{R}$ — dans $\mathbb{R}$, aucun carré n'est négatif. **Conséquences** : $i^3 = -i$, $i^4 = 1$, et les puissances de $i$ cyclent par 4 : $1, i, -1, -i, 1, \dots$."),
    ('sma_complex_basics', r'Argument de $z = i$ :',
     r"$z = i$ correspond au point $(0, 1)$ dans le plan complexe — sur l'**axe imaginaire positif**. L'argument est l'angle entre Ox et le vecteur $\vec{Oz}$, donc $\arg(i) = \pi/2$ (= 90°). **Forme exponentielle** : $i = e^{i\pi/2}$. C'est cohérent avec la rotation de 90° qu'incarne la multiplication par $i$."),
    ('sma_complex_basics', r'Conjugué de $3 - 2i$ :',
     r"**Conjugué** : $\overline{a + bi} = a - bi$ (signe imaginaire changé). Pour $3 - 2i$ : $\overline{3 - 2i} = 3 + 2i$. **Propriétés clés** : $z\bar{z} = |z|^2$ (réel positif) ; $\overline{\bar{z}} = z$ ; conjugué d'une somme/produit = somme/produit des conjugués. Sert à simplifier $1/(a+bi)$."),
    # ----- sma_counting -----
    ('sma_counting', r'$X \sim \mathcal{B}(20, 0{,}3)$ : $E(X) = ?$',
     r"Pour une **loi binomiale** $X \sim \mathcal{B}(n, p)$, l'espérance est $E(X) = np$. Application : $E(X) = 20 \times 0{,}3 = 6$. **Interprétation** : sur 20 essais avec 30% de réussite chacun, on s'attend en moyenne à 6 succès. La variance vaut $V(X) = np(1-p) = 4{,}2$, écart-type $\sigma \approx 2{,}05$."),
    ('sma_counting', r'Probabilité d\'obtenir 6 sur un dé équilibré :',
     r"Dé équilibré à 6 faces : chaque face équiprobable, donc $P(\text{obtenir 6}) = 1/6 \approx 0{,}167$. **Définition probabilité uniforme** : $P(A) = \dfrac{\text{cas favorables}}{\text{cas possibles}}$. Valable seulement si toutes les issues sont équiprobables (dé non truqué)."),
    ('sma_counting', r'Nombre d\'anagrammes de MATH :',
     r"« MATH » contient 4 lettres **toutes distinctes**. Le nombre d'arrangements = nombre de permutations = $4! = 24$. **Si certaines lettres se répétaient** (ex : MAMA), il faudrait diviser par les factorielles des répétitions : $4!/(2!2!) = 6$ pour MAMA. Mais ici toutes différentes → simple factorielle."),
    ('sma_counting', r'Choisir 3 personnes parmi 10 :',
     r"On choisit 3 parmi 10 **sans tenir compte de l'ordre** : c'est un **combinaison**, $\binom{10}{3} = \dfrac{10!}{3! \cdot 7!} = \dfrac{10 \cdot 9 \cdot 8}{6} = 120$. **Distinction clé** : combinaison (sans ordre, 120) vs arrangement (avec ordre, $A_{10}^3 = 720$). Si l'ordre comptait, on prendrait $A_{10}^3 = 10 \cdot 9 \cdot 8 = 720$."),
    ('sma_counting', r'$P(A) = 0{,}3$, $P(B) = 0{,}5$, indépendants : $P(A \cap B) = ?$',
     r"$A$ et $B$ **indépendants** : par définition, $P(A \cap B) = P(A) \cdot P(B) = 0{,}3 \times 0{,}5 = 0{,}15$. **Attention** : indépendance ≠ incompatibilité. Indépendant = sans influence ; incompatible = ne peuvent coexister ($P(A\cap B) = 0$). Deux événements peuvent être l'un sans être l'autre."),
    # ----- sma_daniell_cell_basics -----
    ('sma_daniell_cell_basics', r'$Zn \to Zn^{2+} + 2e^-$ est une :',
     r"Cette demi-équation montre que $Zn$ **perd 2 électrons** pour devenir $Zn^{2+}$. **Perte d'électrons = oxydation** (mémo OIL : Oxidation Is Loss). Dans la pile Daniell, l'oxydation du zinc se produit à l'anode (pôle négatif). Les électrons libérés circulent dans le circuit extérieur jusqu'à la cathode."),
    ('sma_daniell_cell_basics', r'L\'électrolyse :',
     r"Une **électrolyse** est l'inverse d'une pile : on **fournit de l'énergie électrique** pour forcer une réaction redox **non spontanée**. Exemple : électrolyse de l'eau (H₂O → H₂ + ½O₂), production d'aluminium. Une pile, à l'inverse, transforme une réaction spontanée en énergie électrique."),
    ('sma_daniell_cell_basics', r'Pile Daniell standard : $\Delta E^\circ$ vaut :',
     r"$\Delta E^\circ = E^\circ_{\text{cathode}} - E^\circ_{\text{anode}} = E^\circ(Cu^{2+}/Cu) - E^\circ(Zn^{2+}/Zn) = 0{,}34 - (-0{,}76) = 1{,}10$ V. C'est la **fem standard** de la pile Daniell — sa tension à vide en conditions standard. **Règle** : la cathode est l'électrode au potentiel le plus élevé."),
    ('sma_daniell_cell_basics', r'Dans la pile Daniell, les électrons circulent :',
     r"Dans le **circuit extérieur** (le fil conducteur), les électrons partent de l'**anode (Zn)** où l'oxydation les libère, vers la **cathode (Cu)** où la réduction les consomme. **Sens conventionnel du courant** : opposé au sens des électrons (de Cu vers Zn dans le circuit extérieur). À l'intérieur, les ions assurent la fermeture du circuit."),
    # ----- sma_deriv_definition -----
    ('sma_deriv_definition', r'Si $f\'(3) = -2$, la tangente en $x = 3$ a pour pente :',
     r"**Définition fondamentale** : $f'(a)$ EST la pente de la tangente à la courbe $y = f(x)$ au point d'abscisse $a$. Donc si $f'(3) = -2$, la tangente en $x = 3$ a pour pente $-2$. Pente négative ⇒ tangente descendante ⇒ $f$ décroissante localement en $x = 3$."),
    ('sma_deriv_definition', r"Quel est le taux d'accroissement de $f(x) = x^2$ entre 1 et 3 ?",
     r"Le **taux d'accroissement** entre $a$ et $b$ : $\tau = \dfrac{f(b) - f(a)}{b - a}$. Application : $\tau = \dfrac{f(3) - f(1)}{3 - 1} = \dfrac{9 - 1}{2} = 4$. C'est la pente de la **corde** entre $(1, 1)$ et $(3, 9)$. La dérivée $f'(a)$ est la limite de ce taux quand $b \to a$."),
    ('sma_deriv_definition', r'Quelle est la dérivée de $f(x) = x^4$ ?',
     r"**Règle des puissances** : $(x^n)' = n x^{n-1}$. Avec $n = 4$ : $(x^4)' = 4 x^3$. **Vérification** : pour $f(x) = x^4 = x \cdot x \cdot x \cdot x$, par la règle du produit étendue, on retrouve bien $4 x^3$. Cette règle est l'une des plus utilisées du programme — à mémoriser."),
    ('sma_deriv_definition', r'Quelle est la dérivée de $g(x) = e^x$ ?',
     r"$(e^x)' = e^x$ — l'exponentielle est **sa propre dérivée**. C'est sa **propriété caractéristique** : unique solution de $f' = f$ avec $f(0) = 1$. Cela explique son omniprésence en physique (désintégration, charge de condensateur, croissance de population) — partout où la vitesse est proportionnelle à la quantité."),
    ('sma_deriv_definition', r"Un point où $f'$ s'annule en changeant de signe est :",
     r"Un point où $f' = 0$ est un **point critique**. Si $f'$ change de signe :  passage de $+$ à $-$ ⇒ **maximum local** ($f$ croît puis décroît) ; passage de $-$ à $+$ ⇒ **minimum local**. **Si $f'$ ne change pas de signe** (ex : $f(x) = x^3$ en 0), c'est un point d'inflexion à tangente horizontale — pas un extremum."),
    ('sma_deriv_definition', r"Si $f'(x) > 0$ sur $]a, b[$, alors $f$ est :",
     r"**Théorème de variation** : $f$ dérivable et $f' > 0$ sur un intervalle ⇒ $f$ **strictement croissante** sur cet intervalle. Pente positive partout = courbe qui monte. Réciproquement, $f' < 0$ ⇒ décroissante ; $f' = 0$ ⇒ constante. Outil clé pour étudier les variations d'une fonction."),
    ('sma_deriv_definition', r'Que vaut la dérivée de $g(x) = \dfrac{1}{x^2 + 1}$ ?',
     r"**Composition** $1/u$ avec $u = x^2 + 1$. **Règle** : $(1/u)' = -u'/u^2$. Calcul : $u' = 2x$, donc $g'(x) = -\dfrac{2x}{(x^2+1)^2}$. **Vérification de signe** : pour $x > 0$, $g' < 0$ (dérivée négative car $g$ est décroissante là) ; pour $x < 0$, $g' > 0$. Cohérent avec la cloche de $g$ centrée en 0."),
    ('sma_deriv_definition', r"Que vaut $h'(x)$ pour $h(x) = -2x^3 + 7$ ?",
     r"**Linéarité** de la dérivation : $(af + bg)' = af' + bg'$. Calcul terme à terme : $(-2x^3)' = -2 \cdot 3x^2 = -6x^2$ ; $(7)' = 0$ (constante). Somme : $h'(x) = -6x^2$. **Remarque** : $h'(x) \le 0$ pour tout $x$, donc $h$ est décroissante sur $\mathbb{R}$ (avec un point critique en 0)."),
    ('sma_deriv_definition', r"La dérivée de $f(x) = x \cdot \sin x$ est :",
     r"**Règle du produit** : $(uv)' = u'v + uv'$. Avec $u = x$ ($u' = 1$) et $v = \sin x$ ($v' = \cos x$) : $f'(x) = 1 \cdot \sin x + x \cdot \cos x = \sin x + x \cos x$. **Erreur classique** : écrire $f' = u' v' = \cos x$, ce qui est **faux** — la dérivée d'un produit n'est PAS le produit des dérivées."),
    ('sma_deriv_definition', r'Une droite de pente 2 passant par $(0, 1)$ a pour équation :',
     r"Forme générale d'une droite : $y = mx + p$ où $m$ est la pente et $p$ l'ordonnée à l'origine (valeur en $x=0$). Ici $m = 2$ et la droite passe par $(0, 1)$, donc $p = 1$. **Équation finale** : $y = 2x + 1$. Vérification : en $x = 0$, $y = 1$ ✓ ; pente = 2 ✓."),
    ('sma_deriv_definition', r"Sur le graphe de $x \mapsto x^2$, la pente de la tangente en $x = 0$ vaut :",
     r"En $x = 0$, la parabole $y = x^2$ admet un **minimum** : la tangente y est **horizontale**, donc de pente 0. **Vérification analytique** : $f'(x) = 2x$, donc $f'(0) = 0$ — cohérent. **Mémo** : à un extremum d'une fonction dérivable, la tangente est toujours horizontale."),
    ('sma_deriv_definition', r"Pour $f(x) = x^2$, le nombre dérivé en 0 vaut :",
     r"Deux approches. (1) Par définition : $f'(0) = \lim_{h \to 0} \dfrac{(0+h)^2 - 0}{h} = \lim_{h \to 0} h = 0$. (2) Directement : $f'(x) = 2x$ (règle des puissances), donc $f'(0) = 0$. **Cohérent** avec la tangente horizontale au minimum de la parabole."),
    # ----- sma_divisibility -----
    ('sma_divisibility', r'$15 \equiv ? \;[4]$',
     r"On cherche le **reste** de la division euclidienne de 15 par 4. Calcul : $15 = 4 \cdot 3 + 3$, donc $15 \equiv 3 \pmod{4}$. **Rappel** : $a \equiv b \pmod{n}$ ssi $a - b$ est multiple de $n$, ou de manière équivalente, $a$ et $b$ ont le même reste modulo $n$. **Mémo** : le reste est toujours dans $[0, n-1]$."),
    ('sma_divisibility', r'17 est-il premier ?',
     r"**17 est premier** : ses seuls diviseurs positifs sont 1 et 17 lui-même. **Test pratique** : pour vérifier si $n$ est premier, il suffit de tester les diviseurs jusqu'à $\sqrt{n}$. Pour 17 : $\sqrt{17} \approx 4{,}1$, on teste 2, 3 : 17/2 non entier, 17/3 non entier. Donc 17 premier."),
    ('sma_divisibility', r'Reste de 25 par 7 :',
     r"Division euclidienne : $25 = 7 \cdot 3 + 4$, donc le reste est 4. On vérifie que $0 \le 4 < 7$ — c'est bien un reste valide. En notation modulo : $25 \equiv 4 \pmod{7}$. Le quotient (3) et le reste (4) sont uniquement déterminés par cette équation."),
    ('sma_divisibility', r'pgcd = 1, on dit :',
     r"Deux entiers $a, b$ tels que $\gcd(a, b) = 1$ sont dits **premiers entre eux** (ou copremiers). **Attention** : être premier entre eux n'implique pas que chacun soit premier. Exemple : 4 et 9 sont premiers entre eux ($\gcd = 1$) mais ni 4 ni 9 ne sont premiers. **Théorème de Bézout** : $a, b$ premiers entre eux ⇔ il existe $u, v$ tels que $au + bv = 1$."),
    # ----- sma_e_field_basics -----
    ('sma_e_field_basics', r'Sur une charge $q < 0$ dans $\vec{E}$, la force est :',
     r"$\vec{F} = q\vec{E}$. Pour $q > 0$, $\vec{F}$ est dans le sens de $\vec{E}$ ; pour **$q < 0$, $\vec{F}$ est opposée à $\vec{E}$**. C'est pourquoi un électron ($q = -e < 0$) dans un champ électrique pointant vers la droite est dévié vers la gauche."),
    ('sma_e_field_basics', r'$U = 100$ V, $d = 0{,}1$ m. $E = ?$',
     r"Pour un champ uniforme entre deux plaques planes parallèles, $E = U/d$. Application : $E = 100/0{,}1 = 1000$ V/m. **Unités** : V/m ou N/C (équivalent). **Direction** : de la plaque + vers la plaque −. Plus $U$ est grand ou plus $d$ est petit, plus $E$ est intense."),
    ('sma_e_field_basics', r'Si on double $U$, la déviation à la sortie :',
     r"La déviation $y$ d'une charge entre les plaques d'un condensateur est proportionnelle à l'accélération $a = qE/m$, donc à $E$, donc à $U$ (puisque $E = U/d$). **Conclusion** : $y \propto U$ — doubler $U$ **double la déviation**. Application : déflexion dans un oscilloscope cathodique."),
    ('sma_e_field_basics', r'Un électron est dévié vers la plaque :',
     r"L'électron porte une charge $q = -e < 0$. La force électrique $\vec{F} = q\vec{E}$ pour $q < 0$ est **opposée à $\vec{E}$**. Or $\vec{E}$ va de la plaque + vers la plaque −. Donc $\vec{F}$ va de − vers +, et **l'électron est attiré par la plaque positive**. **Mémo** : les charges − vont vers le +."),
    # ----- sma_esterification_mechanism -----
    ('sma_esterification_mechanism', r"L'éthanol est :",
     r"L'éthanol a la formule $CH_3-CH_2-OH$, soit $C_2H_6O$. Il appartient à la famille des **alcools** (groupe fonctionnel $-OH$ porté par un carbone tétraédrique non aromatique). C'est un alcool primaire (le carbone porteur de OH a 1 H). Utilisé en estérification pour donner des esters de petite chaîne."),
    ('sma_esterification_mechanism', r'Un catalyseur en estérification :',
     r"Un **catalyseur** (typiquement $H_2SO_4$ concentré) **accélère la réaction sans la déplacer**. Il agit sur la **vitesse uniquement** : on atteint l'équilibre plus rapidement, mais le rendement final est le même (~67% pour mélange équimolaire). Pour augmenter le rendement, il faut déplacer l'équilibre (élimination de l'eau, excès de réactif)."),
    ('sma_esterification_mechanism', r'La saponification est :',
     r"La **saponification** est l'hydrolyse d'un ester en milieu **basique** (ex : NaOH) — réaction inverse de l'estérification mais **totale**. L'ion hydroxyde déprotone l'acide formé en carboxylate, déplaçant l'équilibre vers les produits. Application industrielle majeure : fabrication de savons à partir de corps gras (triglycérides)."),
    ('sma_esterification_mechanism', r"L'estérification est :",
     r"L'estérification (acide + alcool → ester + eau) est **limitée** par un équilibre (rendement plafonné autour de 67% pour mélange équimolaire) et **lente** sans catalyseur (heures à température ambiante). On l'accélère par catalyseur acide ($H_2SO_4$) et on déplace l'équilibre en éliminant l'eau (Dean-Stark)."),
    # ----- sma_exp_basics -----
    ('sma_exp_basics', r'Solution de $e^x = 5$ :',
     r"On applique le logarithme népérien aux deux membres : $\ln(e^x) = \ln 5$, soit $x = \ln 5$ (par bijection $\ln \circ \exp = \text{id}$). **Numériquement** : $\ln 5 \approx 1{,}609$. **Méthode générale** : pour $e^x = a$ (avec $a > 0$), la solution unique est $x = \ln a$."),
    ('sma_exp_basics', r'$\lim_{x \to -\infty} e^x$ :',
     r"Quand $x \to -\infty$, $e^x \to 0$. **Asymptote horizontale** $y = 0$ en $-\infty$. **Intuition** : $e^{-1000} \approx 10^{-434}$, infinitésimal. La fonction reste strictement positive ($e^x > 0$ partout), s'approchant de 0 sans jamais l'atteindre. À l'inverse : $\lim_{x\to+\infty} e^x = +\infty$."),
    ('sma_exp_basics', r'$\lim_{x \to +\infty} \dfrac{e^x}{x^{100}}$ :',
     r"**Théorème des croissances comparées** : à l'infini, l'exponentielle l'emporte sur n'importe quelle puissance. $\lim_{x\to+\infty} \dfrac{e^x}{x^n} = +\infty$ pour tout $n$. Donc $\dfrac{e^x}{x^{100}} \to +\infty$. **Intuition** : $e^x$ croît exponentiellement, $x^{100}$ croît polynomialement — très vite, l'exponentielle écrase tout."),
    ('sma_exp_basics', r"$(e^{-x})'$ vaut :",
     r"Composition de $e^u$ avec $u = -x$. **Règle** : $(e^u)' = u' \cdot e^u$. Ici $u' = -1$, donc $(e^{-x})' = -e^{-x}$. **Mémo** : la dérivée garde l'exponentielle et multiplie par la dérivée de l'exposant. Cela explique pourquoi $e^{-x}$ est décroissante (dérivée négative)."),
    ('sma_exp_basics', r'$e^{-2}$ vaut :',
     r"$e^{-a} = 1/e^a$ — l'exposant négatif transforme en inverse. Donc $e^{-2} = 1/e^2 \approx 1/7{,}389 \approx 0{,}135$. **Plus généralement** : pour tout $a$, $e^{-a} \cdot e^a = e^0 = 1$, ce qui définit l'inverse. Cette propriété rend les calculs avec exposants négatifs simples."),
    ('sma_exp_basics', r'$e^x$ est :',
     r"$e^x > 0$ pour **tout** $x \in \mathbb{R}$ — l'exponentielle ne s'annule jamais et est toujours positive. C'est une **propriété fondamentale** : utile pour résoudre des équations (on peut diviser par $e^x$ sans souci) et pour étudier des inéquations (les inégalités se conservent en multipliant par $e^x$)."),
    ('sma_exp_basics', r'$\ln(e^x) = ?$',
     r"$\ln(e^x) = x$ pour tout $x \in \mathbb{R}$. C'est la **bijection** : $\ln$ et $\exp$ sont **fonctions réciproques** l'une de l'autre, donc leur composition est l'identité. De même $e^{\ln x} = x$ pour $x > 0$. **Application** : pour résoudre $e^x = a$, on prend $\ln$ : $x = \ln a$."),
    ('sma_exp_basics', r'$2^3 \cdot 2^4$ vaut :',
     r"**Règle des exposants** : $a^m \cdot a^n = a^{m+n}$ — quand on multiplie deux puissances de **même base**, on additionne les exposants. Application : $2^3 \cdot 2^4 = 2^{3+4} = 2^7 = 128$. **Vérification directe** : $2^3 = 8$, $2^4 = 16$, $8 \times 16 = 128$ ✓."),
    # ----- sma_forced_oscillations -----
    ('sma_forced_oscillations', r'Plus $Q$ est grand :',
     r"Le **facteur de qualité** $Q = L\omega_0/R$ caractérise la sélectivité d'un circuit RLC. Plus $Q$ est grand, **plus la résonance est aiguë** : pic étroit, hauteur élevée, faible bande passante $\Delta\omega = \omega_0/Q$. À l'inverse, $Q$ faible = pic large et plat, peu sélectif."),
    ('sma_forced_oscillations', r'Pour sélectionner une station radio, on cherche :',
     r"Pour séparer deux stations radio voisines en fréquence, il faut un circuit **très sélectif** — donc une **résonance aiguë**, c'est-à-dire $Q$ grand. Le circuit ne laisse passer que les fréquences proches de $\omega_0$ ; les stations voisines sont fortement atténuées. **Mémo** : tuner radio = circuit RLC à fort $Q$, ajustable via $C$ variable."),
    ('sma_forced_oscillations', r'L\'impédance $Z$ est minimale quand :',
     r"L'impédance d'un RLC série est $Z = \sqrt{R^2 + (L\omega - 1/(C\omega))^2}$. À la **pulsation propre $\omega = \omega_0 = 1/\sqrt{LC}$**, le terme $L\omega - 1/(C\omega)$ s'annule — il reste $Z = R$ (minimum). Le courant est alors **maximal**. C'est la **résonance d'intensité**."),
    ('sma_forced_oscillations', r'Pulsation propre d\'un LC : $\omega_0 = ?$',
     r"Pour un circuit LC idéal (sans résistance), la **pulsation propre** est $\omega_0 = \dfrac{1}{\sqrt{LC}}$ (rad/s). Période : $T_0 = 2\pi\sqrt{LC}$. **Analogie mécanique** : $L$ = inertie (masse), $C$ = inverse de la raideur. Un circuit LC est l'équivalent électrique d'un oscillateur harmonique mécanique."),
    # ----- sma_kinetic_potential -----
    ('sma_kinetic_potential', r'Unité d\'énergie SI :',
     r"L'unité SI de l'énergie est le **joule (J)** : $1\,\text{J} = 1\,\text{N} \cdot \text{m} = 1\,\text{kg} \cdot \text{m}^2/\text{s}^2$. Autres unités courantes : calorie (1 cal ≈ 4,18 J), électron-volt (1 eV ≈ 1,6 × 10⁻¹⁹ J en physique des particules), kWh (1 kWh = 3,6 × 10⁶ J en énergie domestique)."),
    ('sma_kinetic_potential', r'Si on double $v$, $E_c$ :',
     r"$E_c = \dfrac{1}{2} m v^2$ — proportionnelle au **carré** de la vitesse. Doubler $v$ **quadruple** $E_c$ ($\times 4$). Application : un véhicule à 100 km/h a 4× l'énergie d'un véhicule à 50 km/h, d'où la croissance rapide de la distance de freinage. Cette relation quadratique est cruciale pour la sécurité routière."),
    ('sma_kinetic_potential', r'Sans frottement, $E_m$ :',
     r"En l'absence de frottement (ou autres forces non conservatives), l'**énergie mécanique** $E_m = E_c + E_p$ se **conserve** : pas de dissipation, $E_m$ = constante. C'est le **principe de conservation** en mécanique. Avec frottements : $E_m$ diminue, l'énergie est dissipée en chaleur."),
    ('sma_kinetic_potential', r"Au point le plus haut d'un pendule, $E_c$ est :",
     r"Au point le plus haut d'un pendule, la vitesse est **nulle** (la masse change de sens). Donc $E_c = \dfrac{1}{2} m \cdot 0^2 = 0$ — **toute l'énergie est en $E_p$ gravitationnelle**. Au point le plus bas (passage par la verticale), c'est l'inverse : $E_p$ minimum, $E_c$ maximum. La somme $E_m$ est constante."),
    # ----- sma_limit_def -----
    ('sma_limit_def', r'Que vaut $\lim_{x \to +\infty} \dfrac{1}{x}$ ?',
     r"Quand $x \to +\infty$, le numérateur 1 reste fixe et le dénominateur $x$ devient arbitrairement grand. Une fraction « constante / quelque chose qui tend vers $\infty$ » tend vers 0. **Limite = 0**. C'est l'archétype de la décroissance vers 0 à l'infini, fondement des asymptotes horizontales."),
    ('sma_limit_def', r'Vers quoi tend $\dfrac{2x+1}{x+3}$ quand $x \to +\infty$ ?',
     r"Forme indéterminée $\infty/\infty$. **Astuce** : factoriser $x$ haut et bas. $\dfrac{2x+1}{x+3} = \dfrac{x(2 + 1/x)}{x(1 + 3/x)} = \dfrac{2 + 1/x}{1 + 3/x} \to \dfrac{2}{1} = 2$. **Règle rapide** : pour un quotient de polynômes de **même degré** à l'infini, la limite est le rapport des coefficients dominants."),
    ('sma_limit_def', r'Quelle est $\displaystyle\lim_{x\to 4} \dfrac{x^2 - 16}{x-4}$ ?',
     r"Substitution en $x = 4$ : numérateur $0$, dénominateur $0$, **forme indéterminée $0/0$**. On factorise via l'identité $a^2 - b^2 = (a-b)(a+b)$ : $x^2 - 16 = (x-4)(x+4)$. Le facteur $(x-4)$ se simplifie, il reste $\lim_{x\to 4}(x+4) = 8$. **Pattern** : $0/0 \Rightarrow$ chercher une factorisation cachée."),
    ('sma_limit_def', r'Quelle est $\displaystyle\lim_{x\to +\infty} \dfrac{3x+1}{x+5}$ ?',
     r"Quotient de polynômes de **même degré** à l'infini → la limite est le **rapport des coefficients dominants**. $\dfrac{3x+1}{x+5} \to \dfrac{3}{1} = 3$. **Démonstration formelle** : factoriser $x$ haut et bas, $\dfrac{3 + 1/x}{1 + 5/x} \to 3$. **Règle générale** : numérateur degré > dénominateur ⇒ $\pm\infty$ ; égal ⇒ rapport ; <  ⇒ 0."),
    ('sma_limit_def', r'Que vaut $\displaystyle\lim_{x\to 0^+} \dfrac{1}{x}$ ?',
     r"Limite **à droite** de 0 ($x \to 0$ avec $x > 0$). Le dénominateur tend vers 0 par valeurs positives, $1/x$ devient arbitrairement grand et positif → $+\infty$. **Attention au signe** : à gauche, $\lim_{x\to 0^-} 1/x = -\infty$. La limite globale **n'existe pas** car les limites latérales diffèrent."),
    ('sma_limit_def', r'Et $\displaystyle\lim_{x\to +\infty} \dfrac{x^2+1}{x+2}$ ?',
     r"Quotient avec **degré numérateur (2) > degré dénominateur (1)** : le numérateur l'emporte, la limite est $\pm\infty$. Pour le signe : factoriser $x$ haut ($\dfrac{x(x + 1/x)}{x(1 + 2/x)} = \dfrac{x + 1/x}{1 + 2/x}$), on voit que numérateur $\to +\infty$ et dénominateur $\to 1$, donc **limite = $+\infty$**."),
    ('sma_limit_def', r'Une fonction $f$ telle que $\lim_{x\to 2} f(x) = 5$ et $f(2) = 5$ est :',
     r"C'est exactement la **définition de la continuité en 2** : la limite égale la valeur. Trois conditions équivalentes : (1) $f$ définie en 2, (2) la limite existe en 2, (3) la limite = $f(2)$. Géométriquement : on trace la courbe en passant par le point $(2, 5)$ sans lever le crayon."),
    ('sma_limit_def', r'Le TVI permet de :',
     r"Le **théorème des valeurs intermédiaires** garantit l'**existence** d'une solution sans donner sa valeur. Si $f$ continue sur $[a,b]$ et $k$ entre $f(a)$ et $f(b)$, alors $\exists c \in [a,b] : f(c) = k$. Théorème d'**existence pure**. Corollaire le plus utilisé : $f(a)f(b) < 0$ ⇒ $f$ s'annule au moins une fois entre $a$ et $b$."),
    ('sma_limit_def', r'Soit $g$ continue sur $[0,1]$, avec $g(0) = 3$ et $g(1) = -2$. Le TVI garantit qu\'il existe $c \in [0,1]$ tel que :',
     r"Le TVI s'applique aux valeurs **entre** $g(0) = 3$ et $g(1) = -2$, soit $[-2, 3]$. **0 est dans cet intervalle** ($-2 < 0 < 3$), donc $\exists c \in ]0,1[ : g(c) = 0$. Les valeurs 5, $-3$, 4 sont **en dehors** de $[-2, 3]$ — le TVI ne dit rien d'elles dans ce cas."),
    ('sma_limit_def', r'Que vaut $\lim_{x \to 0} x^2$ ?',
     r"$x \mapsto x^2$ est **polynômiale** donc continue sur $\mathbb{R}$. Pour une fonction continue, $\lim_{x \to a} f(x) = f(a)$ — substitution directe. Application : $\lim_{x \to 0} x^2 = 0^2 = 0$. **Toujours essayer la substitution directe avant les techniques avancées** — souvent ça suffit."),
    ('sma_limit_def', r'Simplifie $\dfrac{2x^2 - 8}{x - 2}$ pour $x \ne 2$.',
     r"Factoriser le numérateur : $2x^2 - 8 = 2(x^2 - 4) = 2(x-2)(x+2)$ via l'identité $a^2 - b^2$. La fraction devient $\dfrac{2(x-2)(x+2)}{x-2} = 2(x+2) = 2x + 4$ (légitime car $x \ne 2$, donc $x - 2 \ne 0$). **Application** : ce type de simplification sert à lever des formes indéterminées $0/0$."),
    ('sma_limit_def', r"Quel est l'ensemble de définition de $f(x) = \dfrac{1}{x-1}$ ?",
     r"Une fraction n'est définie que si son dénominateur est non nul. Ici $x - 1 = 0 \iff x = 1$. Donc $f$ est définie pour tout $x \ne 1$, soit **$\mathbb{R} \setminus \{1\}$** ou $]-\infty, 1[\,\cup\,]1, +\infty[$. **Toujours vérifier l'ensemble de définition** avant tout calcul de limite ou de dérivée."),
    ('sma_limit_def', r'Factorise $x^2 - 9$.',
     r"C'est une **différence de carrés** : $x^2 - 9 = x^2 - 3^2$. Identité remarquable $a^2 - b^2 = (a-b)(a+b)$ avec $a = x$ et $b = 3$. **Résultat** : $x^2 - 9 = (x-3)(x+3)$. Vérification par développement : $(x-3)(x+3) = x^2 + 3x - 3x - 9 = x^2 - 9$ ✓. Cette factorisation est partout en calcul de limites."),
    # ----- sma_ln_basics -----
    ('sma_ln_basics', r'Que vaut $\ln(e^3)$ ?',
     r"Par la propriété de **bijection** : $\ln(e^x) = x$ pour tout $x \in \mathbb{R}$. Donc $\ln(e^3) = 3$. **Justification** : $\ln$ et $\exp$ sont fonctions réciproques, leur composition est l'identité. **Remarque** : le résultat est un nombre simple, sans logarithme — c'est l'intérêt de cette propriété pour simplifier les expressions."),
    ('sma_ln_basics', r'Combien vaut $e^0$ ?',
     r"$e^0 = 1$. **Plus généralement** : pour toute base $a > 0$, $a^0 = 1$. C'est la convention standard des puissances, cohérente avec la règle $a^{m-n} = a^m/a^n$ qui pour $m = n$ donne $a^0 = 1$. Application : $e^0$ apparaît souvent dans les solutions d'équations différentielles à $t = 0$."),
    ('sma_ln_basics', r'Si $e^x = 1$, alors $x$ vaut :',
     r"Application de $\ln$ aux deux membres : $x = \ln 1 = 0$. **Cohérent** : $e^0 = 1$ par définition de l'exponentielle. **Plus généralement** : $\ln 1 = 0$ est l'unique solution de $e^x = 1$, parce que $\exp$ est une bijection strictement croissante."),
    ('sma_ln_basics', r'$\ln(2x)$ s\'écrit aussi :',
     r"**Propriété fondamentale** du logarithme : $\ln(ab) = \ln a + \ln b$ (transforme produit en somme, pour $a, b > 0$). Application : $\ln(2x) = \ln 2 + \ln x$. **Erreur classique** : écrire $\ln(2x) = 2\ln x$ — **faux**, ça c'est $\ln(x^2)$. La règle $\ln(x^n) = n \ln x$ s'applique aux puissances, pas aux coefficients."),
    ('sma_ln_basics', r'Si $\ln x = 2$, alors $x$ vaut :',
     r"On applique $\exp$ aux deux membres : $e^{\ln x} = e^2$, soit $x = e^2 \approx 7{,}389$. **Bijection** : $\ln x = 2 \iff x = e^2$. **Méthode générale** : pour résoudre $\ln x = a$, prendre $x = e^a$ (avec $x > 0$ requis car $\ln$ n'est définie que sur $]0, +\infty[$)."),
    ('sma_ln_basics', r'$(\ln(x^2))\'$ vaut :',
     r"**Composition** : $(\ln u)' = u'/u$ avec $u = x^2$. Calcul : $u' = 2x$, donc $(\ln(x^2))' = \dfrac{2x}{x^2} = \dfrac{2}{x}$. **Vérification alternative** : $\ln(x^2) = 2\ln|x|$, dont la dérivée est $2 \cdot 1/x = 2/x$ ✓. Cohérent."),
    ('sma_ln_basics', r'Solution de $\ln x = 1$ :',
     r"Par définition même : $\ln e = 1$. Donc $\ln x = 1 \iff x = e \approx 2{,}718$. **Méthode générale** : pour $\ln x = a$, prendre $x = e^a$. **Remarque** : $e$ est défini précisément comme le réel tel que $\ln e = 1$ — c'est la base naturelle des logarithmes."),
    ('sma_ln_basics', r'$\lim_{x \to +\infty} \dfrac{\ln x}{x^2}$ vaut :',
     r"**Théorème des croissances comparées** : à l'infini, toute puissance positive de $x$ l'emporte sur $\ln x$. $\lim_{x\to+\infty} \dfrac{\ln x}{x^\alpha} = 0$ pour tout $\alpha > 0$. Application : $\dfrac{\ln x}{x^2} \to 0$. **Hiérarchie de croissance** : exponentielle $\gg$ puissance $\gg$ logarithme."),
    ('sma_ln_basics', r'Domaine de $\ln(x^2 - 4)$ ?',
     r"Le logarithme népérien n'est défini que pour les arguments **strictement positifs**. Condition : $x^2 - 4 > 0 \iff x^2 > 4 \iff |x| > 2 \iff x \in ]-\infty, -2[ \cup ]2, +\infty[$. **Erreur classique** : prendre $x \ne \pm 2$ (qui n'autorise que la non-annulation). Ici il faut **strictement positif**, pas juste non nul."),
    # ----- sma_newton_laws -----
    ('sma_newton_laws', r'Un objet en MRU parcourt 100 m en 4 s. Sa vitesse est :',
     r"**MRU** = Mouvement Rectiligne Uniforme : vitesse constante. Formule : $v = d/t = 100/4 = 25$ m/s. Conversion : $25 \text{ m/s} \times 3{,}6 = 90$ km/h. **Cohérence** : en MRU, l'accélération est nulle, le déplacement est proportionnel au temps."),
    ('sma_newton_laws', r"Un vecteur $\vec{F}$ a une norme de 10 N et fait un angle de 60° avec l'axe Ox. Sa composante $F_x$ vaut :",
     r"**Projection** d'un vecteur sur l'axe Ox : $F_x = F \cos\theta = 10 \cdot \cos 60° = 10 \times 0{,}5 = 5$ N. **Mémo** : $\cos 60° = 1/2$, $\sin 60° = \sqrt{3}/2$. La composante $F_y = F \sin 60° = 10 \cdot \sqrt{3}/2 \approx 8{,}66$ N. Le module est conservé : $\sqrt{F_x^2 + F_y^2} = 10$ N ✓."),
    ('sma_newton_laws', r'Une accélération constante de $2$ m/s² signifie que :',
     r"**Définition** : l'accélération est la variation de vitesse par unité de temps. $a = 2$ m/s² signifie que la vitesse **augmente de 2 m/s à chaque seconde**. À $t = 0$ avec $v_0 = 0$, à $t = 1$ s, $v = 2$ m/s ; à $t = 5$ s, $v = 10$ m/s. Pour $g \approx 9{,}8$ m/s², la vitesse en chute libre augmente de ~10 m/s par seconde."),
    ('sma_newton_laws', r'Un mobile a pour position $x(t) = 3t^2 + 5$. Sa vitesse à $t=2$s vaut :',
     r"**Définition** : $v(t) = dx/dt$ — dérivée de la position. Calcul : $v(t) = (3t^2 + 5)' = 6t$. À $t = 2$ s : $v(2) = 12$ m/s. **Vérification** : à $t = 0$, vitesse = 0 (le mobile démarre du repos). Accélération $a(t) = v'(t) = 6$ m/s² constante — c'est un MRUA."),
    ('sma_newton_laws', r'Un objet en mouvement à vitesse constante en ligne droite est soumis à :',
     r"**1ère loi de Newton (principe d'inertie)** : MRU ⇔ $\sum \vec{F} = \vec{0}$. Cela ne signifie PAS « aucune force », mais que la **résultante** est nulle. Plusieurs forces peuvent s'exercer (ex : une voiture à vitesse constante a moteur + frottements + poids + réaction du sol — somme nulle)."),
    ('sma_newton_laws', r'Si $\Sigma \vec{F} = 10\,\vec{i}$ N s\'applique à un objet de $m = 2$ kg, son accélération vaut :',
     r"**RFD (2ème loi de Newton)** : $\sum \vec{F} = m \vec{a}$, donc $\vec{a} = \dfrac{\sum \vec{F}}{m} = \dfrac{10}{2} \vec{i} = 5\,\vec{i}$ m/s². L'accélération est dans le sens de la force résultante. **Unités** : N/kg = m/s² ✓."),
    ('sma_newton_laws', r'Un livre posé sur une table. La réaction de la table sur le livre :',
     r"**3ème loi de Newton** : la table exerce sur le livre une force $\vec{R}$, qui est la réaction à la force que le livre exerce sur la table. Sur le livre, deux forces agissent : son **poids** $\vec{P}$ (vers le bas) et **$\vec{R}$** (vers le haut). À l'équilibre (livre immobile), $\vec{P} + \vec{R} = \vec{0}$ — c'est la 1ère loi. **Attention** : $\vec{R}$ et $\vec{P}$ ne sont PAS un couple action/réaction (ils s'exercent sur le même objet)."),
    ('sma_newton_laws', r'Distance parcourue dans le même cas ($v_0=0$, $a=2$ m/s², $t=5$ s) :',
     r"**Équation du MRUA** : $x(t) = x_0 + v_0 t + \dfrac{1}{2} a t^2$. Avec $x_0 = 0$, $v_0 = 0$ : $x = \dfrac{1}{2} a t^2 = \dfrac{1}{2} \times 2 \times 25 = 25$ m. **Vérification** : la vitesse moyenne sur $[0, 5]$ s est $v_\text{moy} = (0 + 10)/2 = 5$ m/s, donc distance = $5 \times 5 = 25$ m ✓."),
    ('sma_newton_laws', r'Un mobile en MRUV part de $v_0 = 0$ avec $a = 2$ m/s². Sa vitesse à $t = 5$ s vaut :',
     r"**Équation du MRUV (MRUA)** : $v(t) = v_0 + at$. Application : $v(5) = 0 + 2 \times 5 = 10$ m/s. À chaque seconde, la vitesse augmente de 2 m/s. **Cohérence dimensionnelle** : m/s² × s = m/s ✓."),
    # ----- sma_nuclear_radioactivity -----
    ('sma_nuclear_radioactivity', r'$^{14}_6 C$ contient :',
     r"Notation $^A_Z X$ : $Z$ = numéro atomique = nombre de **protons** ; $A$ = nombre de masse = nombre de **nucléons** (protons + neutrons). Pour $^{14}_6 C$ : 6 protons, $14 - 6 = 8$ neutrons. Total nucléons = 14. **Note** : le nombre d'électrons (dans l'atome neutre) = nombre de protons = 6."),
    ('sma_nuclear_radioactivity', r"La fission libère de l'énergie pour les noyaux :",
     r"L'énergie de liaison par nucléon est maximale autour du **fer** ($^{56}$Fe). Les noyaux **plus lourds** que le fer libèrent de l'énergie en se cassant (**fission**, ex : uranium-235 dans les réacteurs). Les noyaux **plus légers** libèrent de l'énergie en fusionnant (**fusion**, ex : hydrogène dans les étoiles)."),
    ('sma_nuclear_radioactivity', r'Au bout de $2 t_{1/2}$, il reste :',
     r"**Demi-vie $t_{1/2}$** : durée pour que la quantité initiale soit divisée par 2. Au bout de $2 t_{1/2}$, on divise deux fois par 2, soit par 4. **Reste $1/4$** de la quantité initiale. Au bout de $n t_{1/2}$ : reste $1/2^n$. Application : carbone-14 a $t_{1/2} \approx 5730$ ans, utilisé pour la datation."),
    ('sma_nuclear_radioactivity', r'Conservation : $A_{père} = A_{fils} + A_{particule}$. Vrai ou faux ?',
     r"**Vrai**. Lors d'une désintégration, **deux conservations** : (1) nombre de nucléons $A$ (ce qui inclut $A_{\text{père}} = A_{\text{fils}} + A_{\text{particule}}$) ; (2) nombre de charges $Z$ (de même $Z_{\text{père}} = Z_{\text{fils}} + Z_{\text{particule}}$). Ces deux lois permettent d'identifier le noyau fils dans toute désintégration $\alpha$, $\beta^-$, $\beta^+$."),
    # ----- sma_ode_first_order -----
    ('sma_ode_first_order', r'$y\' = -y + 2$ avec $y(0) = 5$ : $y(x) = ?$',
     r"**EDO linéaire d'ordre 1** : solution = solution générale homogène + solution particulière. Homogène $y' = -y$ → $y_h = Ce^{-x}$. Particulière (constante) $y_p = 2$ (vérifie $0 = -2 + 2$ ✓). Solution générale : $y = Ce^{-x} + 2$. CI : $y(0) = C + 2 = 5$ → $C = 3$. **Solution** : $y(x) = 3e^{-x} + 2$."),
    ('sma_ode_first_order', r'Décroissance radioactive obéit à :',
     r"La loi de désintégration radioactive : $\dfrac{dN}{dt} = -\lambda N$ — la vitesse de disparition est proportionnelle au nombre de noyaux présents. Forme $y' = ay$ avec $a < 0$ (typiquement $a = -\lambda$, où $\lambda > 0$ est la constante radioactive). **Solution** : $N(t) = N_0 e^{-\lambda t}$ — décroissance exponentielle, demi-vie $t_{1/2} = \ln 2/\lambda$."),
    ('sma_ode_first_order', r'Période propre de $y\'\' + 4y = 0$ :',
     r"Forme oscillateur harmonique $y'' + \omega^2 y = 0$ avec $\omega^2 = 4$, donc $\omega = 2$ rad/s. **Période** : $T = 2\pi/\omega = 2\pi/2 = \pi$ s. **Solutions** : $y(x) = A\cos(2x) + B\sin(2x)$ — oscillations sinusoïdales de période $\pi$."),
    ('sma_ode_first_order', r'Pour $y\'\' + 9y = 0$, $\omega$ vaut :',
     r"Identification avec $y'' + \omega^2 y = 0$ : $\omega^2 = 9$, donc $\omega = 3$ rad/s (on prend la racine positive — $\omega$ représente une pulsation, par convention positive). Période $T = 2\pi/3$ s. Fréquence $f = \omega/(2\pi) = 3/(2\pi)$ Hz."),
    ('sma_ode_first_order', r'Primitive de $3x^2$ :',
     r"Règle des puissances : $\int x^n\,dx = \dfrac{x^{n+1}}{n+1} + C$. Avec $n = 2$ et le coefficient 3 : $\int 3x^2\,dx = 3 \cdot \dfrac{x^3}{3} + C = x^3 + C$. **Toujours penser à la constante d'intégration $C$** — elle est libre, et toute primitive est définie à une constante près."),
    ('sma_ode_first_order', r'Solution générale de $y\' = 3y$ :',
     r"Forme $y' = ay$ avec $a = 3$. **Solution générale** : $y(x) = Ce^{3x}$, $C \in \mathbb{R}$. La constante $C$ est déterminée par une condition initiale (ex : $y(0) = y_0$ donne $C = y_0$). **Croissance exponentielle** car $a > 0$ — modélise croissance bactérienne, intérêts composés en temps continu, etc."),
    # ----- sma_pendulum_simple -----
    ('sma_pendulum_simple', r'Si on double $m$, $T_0$ :',
     r"Pour un **pendule simple** (de longueur $L$, masse $m$ au bout d'un fil), la période est $T_0 = 2\pi\sqrt{L/g}$ — **indépendante de la masse**. Doubler $m$ ne change rien à $T_0$. **Pour un pendule pesant** ou un système masse-ressort, la formule est $T = 2\pi\sqrt{m/k}$ et $T \propto \sqrt{m}$ — doubler $m$ multiplie $T$ par $\sqrt 2$."),
    ('sma_pendulum_simple', r'Si $\omega_0 = 2$ rad/s, $T_0 = ?$',
     r"Relation période/pulsation : $T_0 = 2\pi/\omega_0 = 2\pi/2 = \pi \approx 3{,}14$ s. **Mémo** : la période est l'inverse de la fréquence, multipliée par $2\pi$ pour la pulsation. Application : un pendule de période 1 s a $\omega_0 = 2\pi$ rad/s."),
    ('sma_pendulum_simple', r'Si on double $L$, $T_0$ :',
     r"Pour un pendule simple : $T_0 = 2\pi\sqrt{L/g}$, donc **$T_0 \propto \sqrt{L}$**. Doubler $L$ multiplie $T_0$ par $\sqrt{2} \approx 1{,}41$. Pour quadrupler $T_0$, il faudrait multiplier $L$ par 16. **Application historique** : Galilée a découvert l'isochronisme du pendule en observant un lustre de cathédrale."),
    ('sma_pendulum_simple', r"Au passage par la position d'équilibre, $E_c$ est :",
     r"Au passage par l'équilibre, le pendule a sa **vitesse maximale** (les forces de rappel l'ont accéléré pendant la descente). Donc **$E_c$ est maximale** et **$E_p$ minimale** (= 0 si on prend l'équilibre comme référence). À l'extrémité d'oscillation : inverse, $E_c = 0$, $E_p$ maximale. La somme $E_m$ est constante (sans frottement)."),
    # ----- sma_periodic_waves -----
    ('sma_periodic_waves', r'Si $f = 50$ Hz, $T = ?$',
     r"**Relation période-fréquence** : $T = 1/f$. Application : $T = 1/50 = 0{,}02$ s = 20 ms. **Unités** : Hz = 1/s, donc T en s. C'est la fréquence du courant alternatif en Europe (la lumière vacille à 100 Hz, deux fois par cycle)."),
    ('sma_periodic_waves', r'Une onde périodique a :',
     r"Une onde périodique est **doublement périodique** : (1) en **temps** au point fixe (période $T$, on voit la même chose toutes les $T$ secondes) ; (2) en **espace** à un instant fixe (longueur d'onde $\lambda$, on voit la même chose tous les $\lambda$ mètres). Relation : $\lambda = vT$ ou $v = \lambda f$."),
    ('sma_periodic_waves', r'$\lambda = 2$ m, $v = 8$ m/s, alors $f = ?$',
     r"**Relation fondamentale des ondes** : $v = \lambda f$, donc $f = v/\lambda = 8/2 = 4$ Hz. **Vérification dimensionnelle** : (m/s)/m = 1/s = Hz ✓. Période : $T = 1/f = 0{,}25$ s."),
    ('sma_periodic_waves', r'Diffraction notable quand $a$ est :',
     r"Critère de **diffraction** : observable quand la dimension $a$ de l'ouverture (ou obstacle) est **comparable à $\lambda$**. L'écart angulaire $\theta \sim \lambda/a$ : $a \sim \lambda$ → diffraction nette ; $a \gg \lambda$ → propagation rectiligne, pas de diffraction visible. **Exemple** : son derrière un mur (λ ~ 1 m), oui ; lumière (λ ~ 500 nm), non."),
    ('sma_periodic_waves', r'Si on double $\lambda$, l\'interfrange :',
     r"**Interfrange** dans une figure d'interférences : $i = \dfrac{\lambda D}{a}$ ($D$ = distance écran-fentes, $a$ = espacement entre fentes). $i$ est **proportionnel à $\lambda$** : doubler $\lambda$ double $i$. **Application** : avec lumière rouge (λ ~ 700 nm) on a un interfrange ~1,5× celui d'une lumière violette (λ ~ 450 nm) à montage identique."),
    # ----- sma_ph_definition -----
    ('sma_ph_definition', r'Une solution avec $\text{pH} = 9$ est :',
     r"**Échelle de pH** : pH < 7 = acide, pH = 7 = neutre, pH > 7 = basique. pH = 9 > 7 → **solution basique**. À pH = 9, $[H_3O^+] = 10^{-9}$ mol/L (faible) et $[OH^-] = 10^{-5}$ mol/L (plus élevé). Exemples de solutions à pH ~ 9 : eau de mer, certains savons doux."),
    ('sma_ph_definition', r'Plus le $\text{pK}_a$ est petit :',
     r"Relation : $\text{pK}_a = -\log K_a$. **pKa petit ⟺ $K_a$ grand ⟺ équilibre AH ⇌ A⁻ + H₃O⁺ très déplacé vers la droite ⟺ acide fort** (ou plus dissocié). À l'inverse, pKa grand = acide faible. **Repères** : HCl pKa ≈ -7 (très fort), acide acétique pKa ≈ 4,75 (faible), eau pKa = 14 (extrêmement faible)."),
    ('sma_ph_definition', r"Pour un acide faible AH dissous dans l'eau :",
     r"Définition d'un **acide faible** : sa dissociation $AH + H_2O \rightleftharpoons A^- + H_3O^+$ est **partielle** — l'équilibre coexiste avec des molécules AH non dissociées. À l'opposé, un acide fort se dissocie quasi totalement. **Conséquence** : pH d'un acide faible > pH d'un acide fort à même concentration."),
    ('sma_ph_definition', r'Pour un couple AH/A⁻ avec pKa = 6, à pH = 8 :',
     r"**Règle de prédominance** : $\text{pH} > \text{pK}_a$ → la **base** $A^-$ domine ; pH < pKa → l'acide AH domine. À pH = 8 et pKa = 6 : pH > pKa, donc $A^-$ majoritaire. **Quantitativement** (Henderson-Hasselbalch) : $\log([A^-]/[AH]) = \text{pH} - \text{pK}_a = 2$, soit ratio 100:1."),
    ('sma_ph_definition', r'À pH = pKa exactement :',
     r"À **pH = pKa**, on est à la **frontière** de prédominance. L'équation de Henderson-Hasselbalch donne $\log([A^-]/[AH]) = 0$, soit $[A^-] = [AH]$ — concentrations égales. C'est le **point de demi-équivalence** d'un dosage acide-base, utilisé pour mesurer le pKa expérimentalement."),
    ('sma_ph_definition', r"Dans l'eau pure à 25°C, $[\text{H}_3\text{O}^+]$ vaut :",
     r"L'eau pure subit une autoprotolyse : $2H_2O \rightleftharpoons H_3O^+ + OH^-$. **Produit ionique** : $K_e = [H_3O^+][OH^-] = 10^{-14}$ à 25°C. Par symétrie ($[H_3O^+] = [OH^-]$), on a $[H_3O^+]^2 = 10^{-14}$, donc $[H_3O^+] = 10^{-7}$ mol/L. **D'où** : pH de l'eau pure = 7 (neutre)."),
    ('sma_ph_definition', r'Si $[\text{H}_3\text{O}^+] = 10^{-3}$ mol/L, alors $[\text{OH}^-]$ vaut :',
     r"**Produit ionique de l'eau** à 25°C : $[H_3O^+][OH^-] = K_e = 10^{-14}$. Donc $[OH^-] = K_e / [H_3O^+] = 10^{-14}/10^{-3} = 10^{-11}$ mol/L. **Cohérence** : pH = 3 (acide), pOH = 11 (basique faible), et pH + pOH = 14."),
    ('sma_ph_definition', r"Si le pH d'une solution est 4, $[\text{H}_3\text{O}^+]$ vaut :",
     r"Définition : $\text{pH} = -\log_{10}[H_3O^+]$, donc $[H_3O^+] = 10^{-\text{pH}} = 10^{-4}$ mol/L. **Mémo** : « pH = exposant changé de signe ». Solution à pH = 4 = légèrement acide (jus de tomate, vinaigre dilué)."),
    ('sma_ph_definition', r'Si on dilue dix fois une solution acide forte initialement à pH = 3, le nouveau pH vaut environ :',
     r"Pour un **acide fort**, dilution × 10 → $[H_3O^+]$ divisée par 10 → pH augmente de 1. Donc pH passe de 3 à environ 4. **Limite** : à très grande dilution, pH tend vers 7 (eau pure) — l'autoprotolyse de l'eau prend le relais. Pour un acide faible, la relation est différente (le pH augmente moins)."),
    # ----- sma_primitives -----
    ('sma_primitives', r'$\int_0^1 2x\,dx$ :',
     r"Primitive de $2x$ : $x^2$ (vérification : $(x^2)' = 2x$ ✓). **Newton-Leibniz** : $\int_0^1 2x\,dx = [x^2]_0^1 = 1 - 0 = 1$. **Vérification géométrique** : $y = 2x$ entre 0 et 1 forme un triangle de base 1 et hauteur 2, aire = $\dfrac{1}{2} \times 1 \times 2 = 1$ ✓."),
    ('sma_primitives', r'$(x^2)\' = ?$',
     r"**Règle des puissances** : $(x^n)' = n x^{n-1}$. Avec $n = 2$ : $(x^2)' = 2x$. **Vérification par taux d'accroissement** : $\dfrac{(x+h)^2 - x^2}{h} = \dfrac{2xh + h^2}{h} = 2x + h \to 2x$ quand $h \to 0$ ✓."),
    ('sma_primitives', r'$(\sin x)\' = ?$',
     r"$(\sin x)' = \cos x$. **Astuce mnémotechnique** : sin → cos (sans signe), cos → -sin (avec signe). Géométriquement : la pente de $\sin$ en 0 vaut 1 (= $\cos 0$), s'annule en $\pi/2$ (= $\cos(\pi/2) = 0$), devient $-1$ en $\pi$. Tout cohérent avec la courbe."),
    ('sma_primitives', r'Primitive de $2x$ :',
     r"$\int 2x\,dx = x^2 + C$. **Vérification** : $(x^2)' = 2x$ ✓. **Erreur classique** : oublier la constante $C$ — toute primitive est définie à une constante près. Si la question demande **une** primitive (pas la), prendre $C = 0$ donne $x^2$."),
    ('sma_primitives', r'Primitive de $1/x$ sur $]0,+\infty[$ :',
     r"$(\ln x)' = 1/x$ pour $x > 0$, donc $\int \dfrac{1}{x}\,dx = \ln x + C$ sur $]0, +\infty[$. **Sur $\mathbb{R}^*$** : la primitive est $\ln|x| + C$ (valeur absolue). **Cas particulier important** : $1/x$ n'admet pas de primitive sous forme polynomiale — c'est le logarithme qui prend le relais."),
    ('sma_primitives', r'$\int_0^\pi \sin x\,dx$ :',
     r"Primitive de $\sin x$ : $-\cos x$ (vérification : $(-\cos x)' = \sin x$ ✓). **Newton-Leibniz** : $\int_0^\pi \sin x\,dx = [-\cos x]_0^\pi = -\cos\pi + \cos 0 = -(-1) + 1 = 2$. **Géométrique** : c'est l'aire d'une demi-arche de sinus, pas trivialement calculable sans intégration."),
    ('sma_primitives', r"Pour intégrer $x \sin x$, le bon choix de $u$ dans l'IPP est :",
     r"**Intégration par parties (IPP)** : $\int u\,v'\,dx = uv - \int u'v\,dx$. Stratégie LIATE : choisir $u$ qui se simplifie en se dérivant. Ici : $u = x$ (dérivée 1, plus simple), $v' = \sin x$ ($v = -\cos x$). **Application** : $\int x\sin x\,dx = -x\cos x + \int \cos x\,dx = -x\cos x + \sin x + C$."),
    # ----- sma_projectile_motion -----
    ('sma_projectile_motion', r'Sur un objet en chute libre, la seule force est :',
     r"**Chute libre** = mouvement sous l'effet du **seul poids** $\vec{P} = m\vec{g}$. On néglige les frottements de l'air (sinon ce n'est plus chute libre). Conséquence : accélération constante $\vec{a} = \vec{g}$ (vers le bas, $g \approx 9{,}81$ m/s²), indépendante de la masse — c'est l'expérience de Galilée."),
    ('sma_projectile_motion', r"Sans frottement, le mouvement horizontal d'un projectile est :",
     r"Sans frottement, **aucune force horizontale** ne s'exerce sur le projectile (le poids est purement vertical). Donc $a_x = 0$ et **$v_x$ reste constant** — c'est un MRU horizontal. Le mouvement vertical, lui, est uniformément accéléré ($a_y = -g$). On parle de mouvement parabolique."),
    ('sma_projectile_motion', r'À $t = 1$s, vitesse en chute libre depuis repos ($g = 10$ m/s²) :',
     r"Chute libre depuis repos : $v(t) = g t$ (intégration de $a = g$). À $t = 1$ s avec $g = 10$ m/s² : $v = 10$ m/s. **Cohérence** : à $t = 2$ s, $v = 20$ m/s ; à $t = 5$ s, $v = 50$ m/s. La vitesse augmente linéairement avec le temps."),
    ('sma_projectile_motion', r'Sur le sommet de la trajectoire, $v_y$ vaut :',
     r"Au sommet de la trajectoire d'un projectile, la composante verticale **$v_y = 0$** : c'est le moment où le projectile arrête de monter et commence à redescendre. La composante horizontale $v_x$, elle, reste inchangée (pas de force horizontale). **Application** : pour atteindre la portée maximale, l'angle de tir optimal sans frottements est 45°."),
    # ----- sma_qr_k -----
    ('sma_qr_k', r'Pour augmenter le rendement, on peut :',
     r"Pour augmenter le rendement d'une réaction $aA + bB \rightleftharpoons cC + dD$, il faut **déplacer l'équilibre vers les produits** (loi de Le Chatelier). Méthodes : (1) **éliminer C ou D** au fur et à mesure (fait baisser $Q_r$, le système réagit dans le sens direct pour réajuster) ; (2) ajouter A ou B en excès ; (3) ajuster température si exo/endothermique."),
    ('sma_qr_k', r'K dépend de :',
     r"La constante d'équilibre $K$ (à ne pas confondre avec $Q_r$) **ne dépend que de la température** pour une réaction donnée. Elle est indépendante des concentrations initiales, du volume, de la pression (en solution diluée), et des catalyseurs. Si T change, $K$ change selon la loi de Van't Hoff. **À T fixée, $K$ est une constante**."),
    ('sma_qr_k', r'K grand ⟹ équilibre :',
     r"$K = \dfrac{[C]^c[D]^d}{[A]^a[B]^b}$ à l'équilibre. **K grand** signifie numérateur grand, dénominateur petit → **les produits dominent** à l'équilibre, la réaction est très avancée dans le sens direct (quasi-totale si $K \gg 10^4$). **K petit** : réactifs dominent, peu de réaction."),
    ('sma_qr_k', r'$K = 10$, à un moment $Q_r = 50$. Le système évolue :',
     r"**Critère d'évolution** : si $Q_r > K$, trop de produits par rapport à l'équilibre → la réaction évolue dans le **sens inverse** (consomme C, D ; reforme A, B) jusqu'à ce que $Q_r$ baisse à $K$. Inversement, $Q_r < K$ → sens direct. Ici $Q_r = 50 > K = 10$, donc **sens inverse**."),
    # ----- sma_rc_charge_discharge -----
    ('sma_rc_charge_discharge', r'Si $C = 100\,\mu F$ porte $q = 10^{-3}$ C, $u_C = ?$',
     r"Relation **charge-tension** d'un condensateur : $q = C u$, donc $u = q/C$. Application : $u = 10^{-3}/(100 \times 10^{-6}) = 10^{-3}/10^{-4} = 10$ V. **Unités** : C/F = V ✓ (puisque 1 F = 1 C/V)."),
    ('sma_rc_charge_discharge', r'À $t = \tau$, $u_C$ vaut environ :',
     r"En décharge d'un condensateur, $u_C(t) = E e^{-t/\tau}$. À $t = \tau$ : $u_C(\tau) = E e^{-1} \approx 0{,}37 E$ — il reste **37%** de la tension initiale (équivalent : 63% perdus). Mémo : $e^{-1} \approx 0{,}37$, $e^{-2} \approx 0{,}14$, $e^{-3} \approx 0{,}05$. À $5\tau$, plus de 99% perdus."),
    ('sma_rc_charge_discharge', r'$C = 100\,\mu F$, $u_C = 10$ V. $E_C = ?$',
     r"**Énergie stockée dans un condensateur** : $E_C = \dfrac{1}{2} C u^2$. Application : $E_C = 0{,}5 \times 100 \times 10^{-6} \times 100 = 5 \times 10^{-3}$ J = 5 mJ. **Analogie** avec énergie cinétique $\frac{1}{2}mv^2$ : la charge joue le rôle d'une vitesse électrique."),
    ('sma_rc_charge_discharge', r'À $t = \tau$, $u_C$ vaut environ :',
     r"En **charge** d'un condensateur, $u_C(t) = E(1 - e^{-t/\tau})$. À $t = \tau$ : $u_C(\tau) = E(1 - e^{-1}) \approx 0{,}63 E$ — chargé à **63%**. À $t = 5\tau$, chargé à plus de 99% — on considère le régime établi."),
    ('sma_rc_charge_discharge', r'Si on double $R$, $\tau$ :',
     r"**Constante de temps** RC : $\tau = RC$. Doubler $R$ → **double $\tau$** (charge/décharge plus lente). De même, doubler $C$ double aussi $\tau$. **Mémo** : $\tau$ proportionnel au produit. Pour réduire $\tau$ d'un facteur 2, on peut diminuer R ou C de moitié."),
    # ----- sma_reaction_speed -----
    ('sma_reaction_speed', r'Un catalyseur :',
     r"**Définition d'un catalyseur** : substance qui **accélère une réaction sans être consommée** (régénérée à la fin). Il abaisse l'énergie d'activation, **n'affecte pas l'équilibre** (ni $K$ ni le rendement final), seulement la vitesse pour l'atteindre. Exemple : platine dans un pot catalytique, enzymes en biologie."),
    ('sma_reaction_speed', r'Vitesse de réaction : unité SI ?',
     r"La **vitesse de réaction** est $v = -\dfrac{1}{\nu_A} \dfrac{d[A]}{dt}$ — variation de concentration par unité de temps. Unité SI : **mol·L⁻¹·s⁻¹** (concentration/temps). Souvent on utilise mol·L⁻¹·min⁻¹ en pratique pour des réactions plus lentes."),
    ('sma_reaction_speed', r'La cinétique étudie :',
     r"La **cinétique chimique** étudie la **vitesse** des réactions chimiques (vs. la thermodynamique, qui étudie les états d'équilibre et les rendements). Questions cinétiques : combien de temps faut-il pour atteindre l'équilibre ? Quelle température/concentration accélère ? Quel mécanisme microscopique ?"),
    ('sma_reaction_speed', r'Pour une cinétique d\'ordre 1, $t_{1/2}$ dépend :',
     r"**Cinétique d'ordre 1** : $-d[A]/dt = k[A]$, solution $[A](t) = [A]_0 e^{-kt}$. La demi-vie $t_{1/2} = \ln 2/k$ — **indépendante de la concentration initiale** (caractéristique unique de l'ordre 1). C'est pour cela qu'on parle de demi-vie en radioactivité (ordre 1) ou en pharmacocinétique."),
    ('sma_reaction_speed', r'Augmenter la température :',
     r"Augmenter la **température** augmente l'énergie cinétique des molécules → plus de chocs, et plus de chocs **efficaces** (énergie > énergie d'activation). **Loi d'Arrhenius** : $k = A e^{-E_a/(RT)}$ — la constante de vitesse augmente exponentiellement avec T. Règle empirique : +10 °C ≈ vitesse × 2 à 4."),
    # ----- sma_reversible_basics -----
    ('sma_reversible_basics', r'Si $Q_r < K$ :',
     r"**Critère d'évolution** : $Q_r$ représente l'état actuel, $K$ l'état d'équilibre. Si $Q_r < K$ : trop de réactifs → la réaction évolue dans le **sens direct** (consomme A, B ; produit C, D) jusqu'à ce que $Q_r$ remonte à $K$. C'est la loi d'évolution spontanée d'un système chimique."),
    ('sma_reversible_basics', r'Une réaction réversible :',
     r"Une **réaction réversible** peut s'effectuer dans les deux sens : $aA + bB \rightleftharpoons cC + dD$. Notation : double flèche. À l'équilibre, les deux réactions (directe et inverse) ont **même vitesse** — l'équilibre est **dynamique** (les molécules continuent à réagir, mais les concentrations restent stables)."),
    ('sma_reversible_basics', r'Quand la réaction directe est aussi rapide que l\'inverse :',
     r"L'**équilibre dynamique** est atteint quand $v_{\text{directe}} = v_{\text{inverse}}$. Conséquence : les concentrations restent constantes au cours du temps — l'équilibre est **macroscopiquement stable** (mais dynamique au niveau microscopique). C'est le critère d'équilibre cinétique, équivalent à $Q_r = K$."),
    ('sma_reversible_basics', r"À l'équilibre, les concentrations :",
     r"À l'équilibre chimique, les concentrations de tous les réactifs et produits **restent stables** au cours du temps (équilibre macroscopique). Au niveau microscopique, les réactions directe et inverse continuent à même vitesse — c'est un **équilibre dynamique**. La condition mathématique : $Q_r = K$."),
    # ----- sma_rl_establishment -----
    ('sma_rl_establishment', r'$L = 0{,}1$ H, $di/dt = 5$ A/s. $u_L = ?$',
     r"**Tension aux bornes d'une bobine** : $u_L = L\,di/dt$. Application : $u_L = 0{,}1 \times 5 = 0{,}5$ V. **Unités** : H × A/s = V ✓. **Sens conventionnel** : la bobine **s'oppose** à la variation de courant — la tension induite est en phase avec $di/dt$ par cette définition."),
    ('sma_rl_establishment', r"À l'ouverture, le courant :",
     r"Lors de l'**ouverture du circuit RL**, la bobine **s'oppose à la variation brusque** du courant (loi de Lenz). Le courant ne tombe pas instantanément à 0 mais décroît exponentiellement : $i(t) = I_0 e^{-t/\tau}$ avec $\tau = L/R$. **Phénomène** : on peut observer une étincelle aux contacts (surtension inductive)."),
    ('sma_rl_establishment', r'$L = 0{,}5$ H, $i = 2$ A. $E_L = ?$',
     r"**Énergie stockée dans une bobine** : $E_L = \dfrac{1}{2} L i^2$. Application : $E_L = 0{,}5 \times 0{,}5 \times 2^2 = 0{,}5 \times 0{,}5 \times 4 = 1$ J. **Analogie mécanique** : $E_L$ joue le rôle de l'énergie cinétique $\frac{1}{2}mv^2$, le courant comme une vitesse, l'inductance comme une masse."),
    ('sma_rl_establishment', r'À $t = \tau$, $i$ vaut environ :',
     r"Lors de l'**établissement du courant** dans un RL : $i(t) = I_0 (1 - e^{-t/\tau})$. À $t = \tau$ : $i(\tau) = I_0(1 - e^{-1}) \approx 0{,}63 I_0$ — le courant a atteint **63%** de sa valeur finale. À $5\tau$, plus de 99% — on considère que le régime permanent est établi."),
    ('sma_rl_establishment', r'Si on double $L$, $\tau$ :',
     r"**Constante de temps** d'un circuit RL : $\tau = L/R$. Doubler $L$ → **double $\tau$** (établissement plus lent). À l'inverse, doubler $R$ divise $\tau$ par 2. **Mémo** : grand $\tau$ = inertie magnétique forte = bobine large + résistance faible."),
    # ----- sma_rlc_regimes -----
    ('sma_rlc_regimes', r"Pour qu'un RLC pseudo-périodique s'amortisse plus vite, il faut :",
     r"En régime **pseudo-périodique** (faiblement amorti), l'amplitude décroît selon $e^{-t/\tau}$ avec $\tau = 2L/R$. **Pour amortir plus vite**, il faut $\tau$ plus petit, donc **augmenter $R$** (ou diminuer $L$). Trop fort : on bascule en régime apériodique (sans oscillation), passant par un régime critique."),
    ('sma_rlc_regimes', r'Si on **double** $L$ tout en gardant $C$, comment évolue la période propre $T_0$ ?',
     r"**Période propre** $T_0 = 2\pi\sqrt{LC}$ — proportionnelle à $\sqrt{LC}$. Doubler $L$ multiplie $T_0$ par $\sqrt{2} \approx 1{,}41$. Pour doubler $T_0$, il faudrait quadrupler $L$. **Cohérence dimensionnelle** : T = $\sqrt{H \cdot F} = \sqrt{V s/A \cdot As/V} = \sqrt{s^2}$ = s ✓."),
    ('sma_rlc_regimes', r'Si $R \to 0$ (très peu d\'amortissement), le régime devient :',
     r"Sans résistance ($R = 0$), l'oscillation est **sinusoïdale pure non amortie** de pulsation propre $\omega_0 = 1/\sqrt{LC}$ — c'est l'**oscillateur harmonique idéal LC**. L'énergie oscille entre la bobine ($\frac{1}{2}Li^2$) et le condensateur ($\frac{1}{2}Cu^2$) sans dissipation. **Cas réel** : $R \ne 0$ toujours, donc oscillations finissent par s'amortir."),
    ('sma_rlc_regimes', r'Régime sans oscillation, retour rapide à zéro :',
     r"Le **régime critique** est exactement le seuil où l'oscillation disparaît : retour à zéro le plus rapide possible **sans dépassement** ni oscillation. Condition : $R = 2\sqrt{L/C}$. Au-delà : régime apériodique (lent). En deçà : pseudo-périodique (oscillant). Application : amortisseurs de voiture conçus en régime critique pour confort optimal."),
    ('sma_rlc_regimes', r"L'analogie mécanique RLC ↔ masse-ressort avec frottement : qu'est-ce qui correspond au coefficient de frottement $f$ ?",
     r"**Analogie électromécanique** : $L \leftrightarrow m$ (inertie), $1/C \leftrightarrow k$ (raideur), **$R \leftrightarrow f$ (frottement)**, $i \leftrightarrow v$ (vitesse), $q \leftrightarrow x$ (position). Comme $f$ dissipe l'énergie cinétique en chaleur, $R$ dissipe l'énergie électrique par effet Joule. Cette analogie permet de transposer méthodes mécaniques aux circuits."),
    ('sma_rlc_regimes', r'L\'équation $L \ddot q + R \dot q + q/C = 0$ est :',
     r"**EDO linéaire d'ordre 2 à coefficients constants, sans second membre (homogène/régime libre)**. Coefficients $L, R, 1/C$ tous constants. Forme canonique du RLC série en régime libre. **Solutions** dépendent du discriminant $\Delta = R^2 - 4L/C$ : $\Delta < 0$ pseudo-périodique, $\Delta = 0$ critique, $\Delta > 0$ apériodique."),
    ('sma_rlc_regimes', r'Une bobine $L = 0{,}1$ H. Si $di/dt = 4$ A/s, sa tension vaut :',
     r"Tension d'une bobine : $u_L = L\,di/dt = 0{,}1 \times 4 = 0{,}4$ V. **Unités** : H × A/s = V ✓. La bobine s'oppose à la variation : si le courant augmente, $u_L > 0$ ; s'il diminue, $u_L < 0$ (loi de Lenz)."),
    ('sma_rlc_regimes', r'Un condensateur de capacité $C = 10\,\mu F$ porte la charge $q = 5\times 10^{-5}$ C. Sa tension vaut :',
     r"**Loi du condensateur** : $u = q/C$. Application : $u = 5 \times 10^{-5} / (10 \times 10^{-6}) = 5$ V. **Unités** : C/F = V ✓. À retenir : $\mu F \times V = \mu C$ — pratique pour estimations rapides."),
    # ----- sma_sequences_review -----
    ('sma_sequences_review', r'Si $u_{n+1} = \frac{u_n + 6}{2}$ converge vers $L$, alors $L$ vaut :',
     r"**Méthode du point fixe** : si $(u_n)$ converge vers $L$ et que $u_{n+1} = f(u_n)$ avec $f$ continue, alors $L = f(L)$. Ici : $L = (L+6)/2$, soit $2L = L + 6$, donc $L = 6$. **Vérification** : $f(6) = (6+6)/2 = 6$ ✓ — c'est bien un point fixe."),
    ('sma_sequences_review', r'Une suite croissante et majorée :',
     r"**Théorème de la convergence monotone** : toute suite croissante et majorée **converge** vers une limite finie (≤ majorant). De même, toute suite décroissante et minorée converge. C'est le théorème central pour démontrer la convergence des suites récurrentes — pas besoin de calculer la limite, l'existence suffit."),
    ('sma_sequences_review', r'Soit $(u_n)$ définie par $u_n = 2n + 1$. Que vaut $u_3$ ?',
     r"Substitution directe dans la formule explicite : $u_3 = 2 \times 3 + 1 = 7$. **Pas besoin de calculer $u_0, u_1, u_2$** d'abord — la formule explicite donne directement le terme. C'est la suite arithmétique de premier terme $u_0 = 1$ et raison $r = 2$."),
    ('sma_sequences_review', r'Soit $(v_n)$ définie par $v_0 = 1$ et $v_{n+1} = 3 v_n$. Que vaut $v_2$ ?',
     r"**Suite récurrente géométrique** : $v_{n+1} = 3 v_n$, raison $q = 3$. Calcul terme à terme : $v_1 = 3 v_0 = 3$, puis $v_2 = 3 v_1 = 9$. **Vérification par formule explicite** : $v_n = v_0 \cdot q^n = 1 \cdot 3^n$, donc $v_2 = 9$ ✓."),
    ('sma_sequences_review', r'Soit $(u_n)$ arithmétique, $u_0 = 7$, $u_5 = 22$. Quelle est la raison ?',
     r"**Formule explicite** d'une suite arithmétique : $u_n = u_0 + n r$. Application : $u_5 = u_0 + 5r$, soit $22 = 7 + 5r$, donc $5r = 15$, donc $r = 3$. **Vérification** : $u_5 = 7 + 5 \times 3 = 22$ ✓."),
    ('sma_sequences_review', r'Soit $(v_n)$ géométrique de raison $q = 2$, $v_0 = 5$. $v_3$ ?',
     r"**Formule explicite** d'une suite géométrique : $v_n = v_0 \cdot q^n$. Application : $v_3 = 5 \cdot 2^3 = 5 \cdot 8 = 40$. **Vérification par récurrence** : $v_1 = 10, v_2 = 20, v_3 = 40$ ✓ — chaque terme double."),
    ('sma_sequences_review', r'Que vaut $\lim_{n\to+\infty} \left(\frac{1}{2}\right)^n$ ?',
     r"Suite géométrique de raison $q = 1/2$, donc $|q| < 1$. **Règle** : $|q| < 1 \Rightarrow q^n \to 0$. La suite tend vers 0 : $\lim (1/2)^n = 0$. **Intuition** : on divise par 2 à chaque étape, on devient infiniment petit. Décroissance exponentielle vers 0."),
    ('sma_sequences_review', r'La suite $u_n = (-1)^n$ :',
     r"$(-1)^n$ vaut alternativement 1 (si $n$ pair) et $-1$ (si $n$ impair). La suite **oscille** entre ces deux valeurs sans se stabiliser → **pas de limite**. **Cas général** : $q^n$ pour $q \le -1$ n'a pas de limite (oscillations divergentes pour $q < -1$, oscillations bornées pour $q = -1$)."),
    ('sma_sequences_review', r'$\lim_{n\to+\infty} \dfrac{n^2 + 1}{n+5}$ vaut :',
     r"Quotient de polynômes : numérateur de **degré 2**, dénominateur de **degré 1**. Le numérateur l'emporte → **limite $+\infty$**. **Démonstration formelle** : factoriser $n^2$ haut, $n$ bas : $\dfrac{n^2(1 + 1/n^2)}{n(1 + 5/n)} = n \cdot \dfrac{1 + 1/n^2}{1 + 5/n} \to +\infty \cdot 1 = +\infty$."),
    # ----- sma_titration_curve -----
    ('sma_titration_curve', r'Le saut brusque sur la courbe pH = f(V) localise :',
     r"Le **saut brusque de pH** sur la courbe de dosage signale le passage de l'excès d'acide (avant l'équivalence) à l'excès de base (après) — c'est l'**équivalence**, où les quantités stoechiométriques sont en présence. Le volume correspondant $V_{\text{éq}}$ permet de calculer la concentration inconnue."),
    ('sma_titration_curve', r"Pour un dosage acide fort / base forte, le pH à l'équivalence vaut :",
     r"À l'équivalence d'un dosage **acide fort + base forte** (HCl + NaOH par exemple), il ne reste que le sel formé (NaCl) dans l'eau — sel **neutre** (ni acide ni basique). Donc **pH = 7** (à 25°C). **Indicateur adapté** : BBT (zone 6,0–7,6) ou phénolphtaléine (saut très net)."),
    ('sma_titration_curve', r"Pour un dosage acide faible / base forte, le pH d'équivalence est :",
     r"À l'équivalence d'un dosage **acide faible + base forte**, il reste la base conjuguée du faible ($A^-$) en solution. Cette base conjuguée donne un pH **basique** (> 7). Exemple : dosage acide acétique + NaOH → équivalence à pH ≈ 8,8. **Indicateur adapté** : phénolphtaléine (zone 8,2–10)."),
    ('sma_titration_curve', r'La méthode la plus fiable pour un saut peu marqué (acide très faible) est :',
     r"Pour un saut peu visible à l'œil, la méthode la plus fiable est la **méthode des dérivées** : tracer $dpH/dV$ qui présente un **maximum bien défini à l'équivalence** même quand le saut visuel est peu marqué. Méthode **quantitative**, plus précise que l'œil. Outil disponible sur la plupart des pH-mètres modernes."),
    ('sma_titration_curve', r"Pour doser HCl par NaOH, l'indicateur le plus adapté est :",
     r"Acide fort + base forte → pH d'équivalence = 7. **BBT** (Bleu de Bromothymol, zone 6,0–7,6) est centré sur 7 — idéal. **Phénolphtaléine** (8,2–10) fonctionne aussi en pratique grâce au saut très brutal qui balaie sa zone de virage. **Hélianthine** (3,1–4,4) virerait trop tôt — inadaptée."),
    ('sma_titration_curve', r"L'hélianthine est adaptée aux dosages où le pH d'équivalence vaut :",
     r"L'**hélianthine** a une zone de virage **3,1–4,4** — adaptée aux pH d'équivalence autour de 4. Cas typique : dosage **base faible + acide fort** (l'équivalence donne pH acide). Exemple : dosage NH₃ + HCl → équivalence à pH ≈ 5,1, hélianthine convient bien."),
    ('sma_titration_curve', r"Si on dose 20 mL d'un acide à 0,1 mol/L par une base à 0,05 mol/L, le volume à l'équivalence vaut :",
     r"À l'équivalence : $C_a V_a = C_b V_{b,\text{éq}}$ (1:1 pour acide/base monovalents). Donc $V_{b,\text{éq}} = \dfrac{C_a V_a}{C_b} = \dfrac{0{,}1 \times 20}{0{,}05} = \dfrac{2}{0{,}05} = 40$ mL. **Cohérent** : la base est moitié moins concentrée, il en faut deux fois plus en volume."),
    # ----- sma_vectors_3d -----
    ('sma_vectors_3d', r'Si $\vec{u} \cdot \vec{v} = 0$ :',
     r"**Critère d'orthogonalité** : $\vec{u} \cdot \vec{v} = 0 \iff \vec{u} \perp \vec{v}$ (vecteurs perpendiculaires) ou l'un des deux est nul. **Justification** : $\vec{u} \cdot \vec{v} = |\vec{u}||\vec{v}|\cos\theta$, qui s'annule ssi $\cos\theta = 0$, soit $\theta = \pi/2$ (vecteurs perpendiculaires)."),
    ('sma_vectors_3d', r'Vecteur normal au plan $2x + y - z = 5$ :',
     r"Pour un plan d'équation $ax + by + cz = d$, un **vecteur normal** est $\vec{n} = (a, b, c)$ — c'est-à-dire les **coefficients de $x, y, z$**. Ici : $\vec{n} = (2, 1, -1)$. Tout vecteur colinéaire à $\vec{n}$ est aussi normal au plan ($2\vec{n}$, $-\vec{n}$, etc.)."),
    ('sma_vectors_3d', r'$d(O, x+y+z=3)$ :',
     r"**Distance d'un point à un plan** : $d(M_0, \mathcal{P}) = \dfrac{|ax_0 + by_0 + cz_0 - d|}{\sqrt{a^2+b^2+c^2}}$. Ici $O = (0,0,0)$, plan $x+y+z = 3$ ($a=b=c=1, d=3$) : $d = \dfrac{|0+0+0-3|}{\sqrt{3}} = \dfrac{3}{\sqrt{3}} = \sqrt{3}$."),
    ('sma_vectors_3d', r'$\vec{AB}$ pour $A(1,2,3)$ et $B(4,6,3)$ :',
     r"**Coordonnées du vecteur $\vec{AB}$** : $\vec{AB} = B - A = (4-1, 6-2, 3-3) = (3, 4, 0)$. **Norme** : $\|\vec{AB}\| = \sqrt{9 + 16 + 0} = 5$. **Direction** : dans le plan $z = 3$ (pas de variation en $z$)."),
    ('sma_vectors_3d', r'$\vec{u} \wedge \vec{v}$ est :',
     r"**Propriété fondamentale du produit vectoriel** : $\vec{u} \wedge \vec{v}$ est un vecteur **perpendiculaire à $\vec{u}$ et à $\vec{v}$**, de norme $|\vec{u}||\vec{v}|\sin\theta$, et de sens donné par la règle de la main droite. **Application** : trouver une normale à un plan défini par deux vecteurs, force de Laplace, moments cinétiques."),
    # ----- sma_wave_basics -----
    ('sma_wave_basics', r'Une onde sonore est :',
     r"Une **onde sonore** est une onde **longitudinale** : les compressions et raréfactions du milieu (air, eau...) se font **dans la direction de propagation**. Contrairement aux ondes transversales (corde vibrante, lumière) où les oscillations sont perpendiculaires. **Vitesse** : ~340 m/s dans l'air à 20°C, ~1500 m/s dans l'eau, ~5000 m/s dans l'acier."),
    ('sma_wave_basics', r'Si $y_A(t) = \sin(\omega t)$ et le retard est $\tau$, alors :',
     r"Une onde se propage avec un **retard temporel** $\tau$ entre la source A et un point M plus loin : $y_M(t) = y_A(t - \tau)$. Application : $y_M(t) = \sin(\omega(t - \tau)) = \sin(\omega t - \omega\tau)$ — l'onde reproduit le mouvement de A avec un décalage. $\tau = d/v$ où $d$ est la distance et $v$ la célérité."),
    ('sma_wave_basics', r'Le son va plus vite dans :',
     r"Plus le milieu est **dense et rigide**, plus la **célérité du son est grande**. Eau (1500 m/s) > air (340 m/s) ; acier (5000 m/s) > eau. **Pas de son dans le vide** : il faut un milieu matériel pour propager les compressions/raréfactions. Différent de la lumière (onde EM, se propage dans le vide)."),
    ('sma_wave_basics', r'Une onde transporte :',
     r"Une onde transporte de l'**énergie** (et de l'information), pas de la **matière**. Le milieu vibre **sur place** (mouvement local des particules), mais l'énergie progresse à la célérité $v$. **Exemple** : un bouchon flottant sur l'eau monte et descend mais ne se déplace pas latéralement avec les vagues."),
    ('sma_wave_basics', r"Une vague à la surface de l'eau est :",
     r"Une **vague de surface** combine mouvement vertical (montée/descente) et mouvement horizontal (avance/recul) — c'est une onde **mixte** (à la fois transversale et longitudinale). Les particules d'eau décrivent en réalité des **trajectoires circulaires** près de la surface, plus aplaties en profondeur."),
]

TRYITS = [
    # ----- sma_limit_def -----
    ('sma_limit_def',
     r"Détermine $\displaystyle\lim_{x\to 1} \dfrac{x^2 - 1}{x - 1}$.",
     r"Substitution directe en $x = 1$ : numérateur $1 - 1 = 0$, dénominateur $1 - 1 = 0$. **Forme indéterminée $\frac{0}{0}$** — signal qu'il faut factoriser. Pense à l'identité remarquable $a^2 - b^2 = (a-b)(a+b)$.",
     r"Substitution directe en $x = 1$ : numérateur $1^2 - 1 = 0$, dénominateur $1 - 1 = 0$. **Forme indéterminée $\frac{0}{0}$** — c'est le signal qu'il faut factoriser. On utilise l'identité remarquable $a^2 - b^2 = (a-b)(a+b)$ avec $a = x, b = 1$ : $x^2 - 1 = (x-1)(x+1)$. La fraction se réécrit $\dfrac{(x-1)(x+1)}{x-1}$. Le facteur $(x-1)$ se simplifie au numérateur et au dénominateur — **légitime** parce qu'on étudie la limite *quand* $x \to 1$, donc avec $x \ne 1$. Il reste $\lim_{x \to 1}(x+1) = 2$. **Pattern à retenir** : forme $\frac{0}{0}$ ⇒ chercher une factorisation cachée."),
    # ----- sma_deriv_definition -----
    ('sma_deriv_definition',
     r"Dérive $f(x) = (2x+1)^3$.",
     r"C'est une **composition** : applique la règle de dérivation des fonctions composées. Pose $v(x) = 2x + 1$ et utilise $(v^3)' = 3 v^2 \cdot v'$ — n'oublie pas de multiplier par la dérivée de $v$.",
     r"On reconnaît une **composition** $f = u \circ v$ avec $v(x) = 2x + 1$ et $u(t) = t^3$. **Règle de la chaîne** : $f'(x) = u'(v(x)) \cdot v'(x)$. Calcul : $u'(t) = 3 t^2$, donc $u'(v(x)) = 3 (2x+1)^2$. Et $v'(x) = 2$. **Multiplication** : $f'(x) = 3 (2x+1)^2 \cdot 2 = 6 (2x+1)^2$. **Erreur classique** : oublier le $\times 2$ (la dérivée de l'argument intérieur) et écrire $f'(x) = 3(2x+1)^2$ — incorrect. La règle de la chaîne EXIGE de multiplier par $v'$."),
    # ----- sma_sequences_review -----
    ('sma_sequences_review',
     r"Soit $(v_n)$ définie par $v_0 = 4$ et $v_{n+1} = \frac{v_n}{2} + 1$. Trouve son point fixe.",
     r"Le **point fixe** $L$ d'une suite récurrente $v_{n+1} = f(v_n)$ vérifie $L = f(L)$. Pose donc $L = L/2 + 1$ et résous l'équation linéaire en $L$.",
     r"**Méthode du point fixe** : si $(v_n)$ converge vers $L$ et que $f$ est continue, alors $L = f(L)$. Ici $f(v) = v/2 + 1$, donc on résout $L = L/2 + 1$. **Calcul** : $L - L/2 = 1$, soit $L/2 = 1$, donc $L = 2$. **Vérification** : $f(2) = 2/2 + 1 = 2$ ✓ — c'est bien un point fixe. **Note** : pour conclure que la suite converge vers 2, il faut encore montrer monotonie + bornes. Ici on peut prouver que $|v_{n+1} - 2| = |v_n - 2|/2$, donc l'écart au point fixe est divisé par 2 à chaque étape — convergence garantie."),
    # ----- sma_ph_definition -----
    ('sma_ph_definition',
     r"Pour l'acide nitreux $\text{HNO}_2/\text{NO}_2^-$ (pKa = 3,4), à pH = 4, quelle forme prédomine ?",
     r"Compare le pH de la solution au pKa du couple. **Règle** : si pH > pKa, la base prédomine ; si pH < pKa, l'acide prédomine. Quantitativement, le rapport $[\text{base}]/[\text{acide}] = 10^{\text{pH}-\text{pK}_a}$.",
     r"**Règle de prédominance** : pH > pKa → la **base conjuguée** prédomine ; pH < pKa → l'acide prédomine. Ici pH = 4 et pKa = 3,4, donc **pH > pKa de 0,6 unité** : la base $\text{NO}_2^-$ prédomine. **Quantitativement** (Henderson-Hasselbalch) : $\log\dfrac{[\text{NO}_2^-]}{[\text{HNO}_2]} = \text{pH} - \text{pK}_a = 0{,}6$, donc le ratio $[\text{NO}_2^-]/[\text{HNO}_2] = 10^{0{,}6} \approx 4$. Il y a environ 4 fois plus de base que d'acide. **Cohérent** : à pH = pKa exactement, ratio = 1 (les deux formes égales) ; au-delà, la base domine progressivement."),
]

print(f"{len(CHECKPOINTS)} checkpoints, {len(TRYITS)} try-its authored.")


def _esc(s: str) -> str:
    return s.replace("'", "''")


def emit_migration() -> str:
    out = []
    out.append("-- Migration 028: corrected SMA lesson checkpoint and try-it expansions.")
    out.append("-- Targets actual sma_* skill codes (migration 025 used wrong unprefixed codes,")
    out.append("-- so its SMA portion was a no-op; this migration delivers the SMA half).")
    out.append("-- Auto-generated by encode_sma_lesson_explanations.py.")
    out.append("BEGIN;")
    out.append("")
    out.append("CREATE OR REPLACE FUNCTION public._patch_cp_sma2(")
    out.append("    p_skill_code TEXT,")
    out.append("    p_stem_fr TEXT,")
    out.append("    p_new_explanation TEXT")
    out.append(") RETURNS BOOLEAN AS $$")
    out.append("DECLARE")
    out.append("    v_lesson JSONB;")
    out.append("    v_section_idx INT;")
    out.append("    v_block_idx INT;")
    out.append("    v_question_idx INT;")
    out.append("    v_block JSONB;")
    out.append("    v_questions JSONB;")
    out.append("    v_question JSONB;")
    out.append("    v_found BOOLEAN := FALSE;")
    out.append("    v_n_sections INT;")
    out.append("    v_n_blocks INT;")
    out.append("    v_n_questions INT;")
    out.append("BEGIN")
    out.append("    SELECT lesson INTO v_lesson FROM public.skills WHERE code = p_skill_code;")
    out.append("    IF v_lesson IS NULL OR v_lesson->'sections' IS NULL THEN RETURN FALSE; END IF;")
    out.append("    v_n_sections := jsonb_array_length(v_lesson->'sections');")
    out.append("    FOR v_section_idx IN 0..(v_n_sections - 1) LOOP")
    out.append("        IF v_lesson->'sections'->v_section_idx->'blocks' IS NULL THEN CONTINUE; END IF;")
    out.append("        v_n_blocks := jsonb_array_length(v_lesson->'sections'->v_section_idx->'blocks');")
    out.append("        FOR v_block_idx IN 0..(v_n_blocks - 1) LOOP")
    out.append("            v_block := v_lesson->'sections'->v_section_idx->'blocks'->v_block_idx;")
    out.append("            IF v_block->>'kind' <> 'checkpoint' THEN CONTINUE; END IF;")
    out.append("            v_questions := v_block->'questions';")
    out.append("            IF v_questions IS NULL THEN CONTINUE; END IF;")
    out.append("            v_n_questions := jsonb_array_length(v_questions);")
    out.append("            FOR v_question_idx IN 0..(v_n_questions - 1) LOOP")
    out.append("                v_question := v_questions->v_question_idx;")
    out.append("                IF v_question->>'stem_fr' = p_stem_fr THEN")
    out.append("                    v_lesson := jsonb_set(")
    out.append("                        v_lesson,")
    out.append("                        ARRAY['sections', v_section_idx::text, 'blocks', v_block_idx::text, 'questions', v_question_idx::text, 'explanation_fr'],")
    out.append("                        to_jsonb(p_new_explanation)")
    out.append("                    );")
    out.append("                    v_found := TRUE;")
    out.append("                END IF;")
    out.append("            END LOOP;")
    out.append("        END LOOP;")
    out.append("    END LOOP;")
    out.append("    IF v_found THEN")
    out.append("        UPDATE public.skills SET lesson = v_lesson WHERE code = p_skill_code;")
    out.append("    END IF;")
    out.append("    RETURN v_found;")
    out.append("END;")
    out.append("$$ LANGUAGE plpgsql;")
    out.append("")
    out.append("CREATE OR REPLACE FUNCTION public._patch_tryit_sma2(")
    out.append("    p_skill_code TEXT,")
    out.append("    p_problem_fr TEXT,")
    out.append("    p_new_hint TEXT,")
    out.append("    p_new_solution TEXT")
    out.append(") RETURNS BOOLEAN AS $$")
    out.append("DECLARE")
    out.append("    v_lesson JSONB;")
    out.append("    v_section_idx INT;")
    out.append("    v_block_idx INT;")
    out.append("    v_block JSONB;")
    out.append("    v_found BOOLEAN := FALSE;")
    out.append("    v_n_sections INT;")
    out.append("    v_n_blocks INT;")
    out.append("BEGIN")
    out.append("    SELECT lesson INTO v_lesson FROM public.skills WHERE code = p_skill_code;")
    out.append("    IF v_lesson IS NULL OR v_lesson->'sections' IS NULL THEN RETURN FALSE; END IF;")
    out.append("    v_n_sections := jsonb_array_length(v_lesson->'sections');")
    out.append("    FOR v_section_idx IN 0..(v_n_sections - 1) LOOP")
    out.append("        IF v_lesson->'sections'->v_section_idx->'blocks' IS NULL THEN CONTINUE; END IF;")
    out.append("        v_n_blocks := jsonb_array_length(v_lesson->'sections'->v_section_idx->'blocks');")
    out.append("        FOR v_block_idx IN 0..(v_n_blocks - 1) LOOP")
    out.append("            v_block := v_lesson->'sections'->v_section_idx->'blocks'->v_block_idx;")
    out.append("            IF v_block->>'kind' <> 'try_it' THEN CONTINUE; END IF;")
    out.append("            IF v_block->>'problem_fr' = p_problem_fr THEN")
    out.append("                v_lesson := jsonb_set(v_lesson,")
    out.append("                    ARRAY['sections', v_section_idx::text, 'blocks', v_block_idx::text, 'hint_fr'],")
    out.append("                    to_jsonb(p_new_hint));")
    out.append("                v_lesson := jsonb_set(v_lesson,")
    out.append("                    ARRAY['sections', v_section_idx::text, 'blocks', v_block_idx::text, 'solution_fr'],")
    out.append("                    to_jsonb(p_new_solution));")
    out.append("                v_found := TRUE;")
    out.append("            END IF;")
    out.append("        END LOOP;")
    out.append("    END LOOP;")
    out.append("    IF v_found THEN")
    out.append("        UPDATE public.skills SET lesson = v_lesson WHERE code = p_skill_code;")
    out.append("    END IF;")
    out.append("    RETURN v_found;")
    out.append("END;")
    out.append("$$ LANGUAGE plpgsql;")
    out.append("")
    for skill, problem, hint, solution in TRYITS:
        out.append(
            f"SELECT public._patch_tryit_sma2('{_esc(skill)}', '{_esc(problem)}', '{_esc(hint)}', '{_esc(solution)}');"
        )
    out.append("")
    for skill, stem, exp in CHECKPOINTS:
        out.append(
            f"SELECT public._patch_cp_sma2('{_esc(skill)}', '{_esc(stem)}', '{_esc(exp)}');"
        )
    out.append("")
    out.append("DROP FUNCTION public._patch_cp_sma2(TEXT, TEXT, TEXT);")
    out.append("DROP FUNCTION public._patch_tryit_sma2(TEXT, TEXT, TEXT, TEXT);")
    out.append("")
    out.append("COMMIT;")
    return "\n".join(out)


sql = emit_migration()
with open("backend/supabase/migrations/028_lessons_sma_expanded_solutions.sql", "w", encoding="utf-8") as f:
    f.write(sql)
print(f"Wrote backend/supabase/migrations/028_lessons_sma_expanded_solutions.sql "
      f"({len(CHECKPOINTS)} checkpoints, {len(TRYITS)} try-its)")
