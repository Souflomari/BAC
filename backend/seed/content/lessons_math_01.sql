-- ============================================================
-- Math lesson content (Sciences Maths): theory, formulas, examples per skill
-- Covers first 12 skills: sequences, limits, continuity, derivatives
-- Uses dollar-quoting for JSONB values containing LaTeX
-- ============================================================

-- 1. Suites arithmetiques
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Suites arithmetiques",
      "body_fr": "Une suite $(u_n)$ est arithmetique s'il existe un reel $r$ (appele raison) tel que pour tout $n \\in \\mathbb{N}$ :\n$$u_{n+1} = u_n + r$$\n\nProprietes :\n- Si $r > 0$ la suite est strictement croissante\n- Si $r < 0$ la suite est strictement decroissante\n- Si $r = 0$ la suite est constante\n\nLe terme general s'exprime en fonction du premier terme :\n$$u_n = u_0 + nr$$\n\nOu plus generalement, a partir d'un terme quelconque $u_p$ :\n$$u_n = u_p + (n - p)r$$\n\nPour trois termes consecutifs $u_{n-1}, u_n, u_{n+1}$ d'une suite arithmetique, on a :\n$$u_n = \\frac{u_{n-1} + u_{n+1}}{2}$$\nChaque terme est la moyenne arithmetique de ses voisins."
    },
    {
      "type": "formula",
      "title_fr": "Formules des suites arithmetiques",
      "body_fr": "Terme general :\n$$u_n = u_0 + n r$$\n\nSomme des $(n+1)$ premiers termes (de $u_0$ a $u_n$) :\n$$S_n = \\sum_{k=0}^{n} u_k = \\frac{(n+1)(u_0 + u_n)}{2}$$\n\nCas particulier — somme des $n$ premiers entiers :\n$$1 + 2 + 3 + \\cdots + n = \\frac{n(n+1)}{2}$$\n\nFormule alternative avec la raison :\n$$S_n = (n+1) u_0 + \\frac{n(n+1)}{2} r$$\n\nNombre de termes entre $u_p$ et $u_n$ : il y a $(n - p + 1)$ termes, et leur somme vaut :\n$$\\sum_{k=p}^{n} u_k = \\frac{(n - p + 1)(u_p + u_n)}{2}$$"
    },
    {
      "type": "example",
      "title_fr": "Exercice : terme general et somme",
      "body_fr": "Soit $(u_n)$ une suite arithmetique telle que $u_3 = 11$ et $u_7 = 23$.\n\n1) Determiner la raison $r$ :\n$$u_7 - u_3 = (7 - 3)r \\Rightarrow 23 - 11 = 4r \\Rightarrow r = 3$$\n\n2) Determiner $u_0$ :\n$$u_3 = u_0 + 3r \\Rightarrow 11 = u_0 + 9 \\Rightarrow u_0 = 2$$\n\n3) Terme general :\n$$u_n = 2 + 3n$$\n\n4) Calculer $S = u_0 + u_1 + \\cdots + u_{20}$ :\n$$u_{20} = 2 + 3 \\times 20 = 62$$\n$$S = \\frac{21 \\times (2 + 62)}{2} = \\frac{21 \\times 64}{2} = 672$$"
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000001';

-- 2. Suites geometriques
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Suites geometriques",
      "body_fr": "Une suite $(u_n)$ est geometrique s'il existe un reel $q \\neq 0$ (appele raison) tel que pour tout $n \\in \\mathbb{N}$ :\n$$u_{n+1} = q \\cdot u_n$$\n\nOn suppose $u_0 \\neq 0$. Le terme general est :\n$$u_n = u_0 \\cdot q^n$$\n\nSens de variation (pour $u_0 > 0$) :\n- Si $q > 1$ : la suite est strictement croissante\n- Si $0 < q < 1$ : la suite est strictement decroissante\n- Si $q < 0$ : la suite n'est pas monotone (les termes alternent de signe)\n\nPour trois termes consecutifs non nuls $u_{n-1}, u_n, u_{n+1}$ :\n$$u_n^2 = u_{n-1} \\cdot u_{n+1}$$\nChaque terme est la moyenne geometrique de ses voisins."
    },
    {
      "type": "formula",
      "title_fr": "Formules des suites geometriques",
      "body_fr": "Terme general :\n$$u_n = u_0 \\cdot q^n$$\n\nSomme des $(n+1)$ premiers termes (pour $q \\neq 1$) :\n$$S_n = \\sum_{k=0}^{n} u_k = u_0 \\cdot \\frac{1 - q^{n+1}}{1 - q}$$\n\nCas $u_0 = 1$ — somme geometrique :\n$$1 + q + q^2 + \\cdots + q^n = \\frac{1 - q^{n+1}}{1 - q}$$\n\nLimite de la suite $(q^n)$ :\n- Si $|q| < 1$ : $\\lim_{n \\to +\\infty} q^n = 0$\n- Si $q > 1$ : $\\lim_{n \\to +\\infty} q^n = +\\infty$\n- Si $q = 1$ : $q^n = 1$ pour tout $n$\n- Si $q \\leq -1$ : la suite $(q^n)$ diverge (pas de limite)"
    },
    {
      "type": "example",
      "title_fr": "Exercice : somme d'une serie geometrique",
      "body_fr": "Soit $(u_n)$ une suite geometrique de premier terme $u_0 = 3$ et de raison $q = 2$.\n\n1) Terme general : $u_n = 3 \\times 2^n$\n\n2) Calculer $S = u_0 + u_1 + \\cdots + u_9$ :\n$$S = u_0 \\cdot \\frac{1 - q^{10}}{1 - q} = 3 \\times \\frac{1 - 2^{10}}{1 - 2}$$\n$$S = 3 \\times \\frac{1 - 1024}{-1} = 3 \\times 1023 = 3069$$\n\n3) Soit $(v_n)$ de raison $q = \\frac{1}{3}$ et $v_0 = 27$.\nAlors $\\lim_{n \\to +\\infty} v_n = 0$ car $|q| < 1$.\n\nSomme a l'infini :\n$$\\sum_{k=0}^{+\\infty} v_k = \\frac{v_0}{1 - q} = \\frac{27}{1 - \\frac{1}{3}} = \\frac{27}{\\frac{2}{3}} = \\frac{81}{2} = 40{,}5$$"
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000002';

-- 3. Convergence des suites
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Convergence des suites",
      "body_fr": "Une suite $(u_n)$ converge vers un reel $\\ell$ si :\n$$\\forall \\varepsilon > 0, \\; \\exists N \\in \\mathbb{N}, \\; \\forall n \\geq N : |u_n - \\ell| < \\varepsilon$$\n\nOn ecrit $\\lim_{n \\to +\\infty} u_n = \\ell$.\n\nResultats fondamentaux :\n- Toute suite croissante et majoree converge\n- Toute suite decroissante et minoree converge\n- Toute suite monotone et bornee converge\n\nTheoremes de comparaison :\n- Theoreme des gendarmes : si $v_n \\leq u_n \\leq w_n$ et $\\lim v_n = \\lim w_n = \\ell$, alors $\\lim u_n = \\ell$\n- Si $u_n \\leq v_n$ et $\\lim u_n = +\\infty$, alors $\\lim v_n = +\\infty$"
    },
    {
      "type": "formula",
      "title_fr": "Criteres de convergence",
      "body_fr": "Limites de reference :\n$$\\lim_{n \\to +\\infty} \\frac{1}{n^\\alpha} = 0 \\quad (\\alpha > 0)$$\n$$\\lim_{n \\to +\\infty} q^n = 0 \\quad (|q| < 1)$$\n$$\\lim_{n \\to +\\infty} \\frac{a^n}{n!} = 0 \\quad (a \\in \\mathbb{R})$$\n$$\\lim_{n \\to +\\infty} \\frac{n!}{n^n} = 0$$\n\nCroissances comparees (pour $a > 1$) :\n$$\\lim_{n \\to +\\infty} \\frac{(\\ln n)^\\beta}{n^\\alpha} = 0 \\quad (\\alpha > 0)$$\n$$\\lim_{n \\to +\\infty} \\frac{n^\\alpha}{a^n} = 0$$\n\nFormes indeterminees : $+\\infty - \\infty$, $\\frac{\\infty}{\\infty}$, $0 \\times \\infty$, $\\frac{0}{0}$, $1^\\infty$, $0^0$, $\\infty^0$"
    },
    {
      "type": "example",
      "title_fr": "Exercice : prouver la convergence",
      "body_fr": "Soit $(u_n)$ definie par $u_n = \\frac{2n + 3}{n + 1}$.\n\n1) Monotonie : calculons $u_{n+1} - u_n$ :\n$$u_{n+1} - u_n = \\frac{2n+5}{n+2} - \\frac{2n+3}{n+1}$$\n$$= \\frac{(2n+5)(n+1) - (2n+3)(n+2)}{(n+2)(n+1)}$$\n$$= \\frac{2n^2 + 7n + 5 - 2n^2 - 7n - 6}{(n+2)(n+1)} = \\frac{-1}{(n+2)(n+1)} < 0$$\nDonc $(u_n)$ est decroissante.\n\n2) Minoration : $u_n = \\frac{2n+3}{n+1} = 2 + \\frac{1}{n+1} > 2$ pour tout $n$.\n\n3) $(u_n)$ est decroissante et minoree par $2$, donc elle converge.\nDe plus : $\\lim_{n \\to +\\infty} u_n = \\lim_{n \\to +\\infty} \\frac{2 + \\frac{3}{n}}{1 + \\frac{1}{n}} = 2$."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000003';

-- 4. Suites recurrentes
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Suites recurrentes $u_{n+1} = f(u_n)$",
      "body_fr": "Une suite recurrente est definie par :\n- Un premier terme $u_0$\n- Une relation de recurrence $u_{n+1} = f(u_n)$\n\nEtude d'une telle suite :\n1) Chercher les points fixes de $f$ : resoudre $f(x) = x$. Si $(u_n)$ converge vers $\\ell$, alors $\\ell$ est un point fixe de $f$.\n\n2) Etude graphique : on trace $y = f(x)$ et $y = x$, puis on construit l'escalier ou la spirale a partir de $u_0$.\n\n3) Monotonie : montrer que $(u_n)$ est monotone en etudiant le signe de $u_{n+1} - u_n = f(u_n) - u_n$.\n\n4) Bornes : montrer que $(u_n)$ reste dans un intervalle stable $I$ tel que $f(I) \\subset I$."
    },
    {
      "type": "formula",
      "title_fr": "Methode du point fixe",
      "body_fr": "Si $\\ell$ est un point fixe de $f$, c'est-a-dire $f(\\ell) = \\ell$, et si :\n$$|f'(\\ell)| < 1$$\nalors le point fixe est attractif : toute suite $(u_n)$ definie par $u_{n+1} = f(u_n)$ avec $u_0$ assez proche de $\\ell$ converge vers $\\ell$.\n\nSi $|f'(\\ell)| > 1$, le point fixe est repulsif.\n\nMethode pour prouver la convergence :\n- Montrer que $(u_n)$ est monotone\n- Montrer que $(u_n)$ est bornee\n- Conclure par le theoreme des suites monotones bornees\n- La limite $\\ell$ verifie $f(\\ell) = \\ell$\n\nAutre technique : si $|u_{n+1} - \\ell| \\leq k |u_n - \\ell|$ avec $0 < k < 1$, alors $|u_n - \\ell| \\leq k^n |u_0 - \\ell| \\to 0$."
    },
    {
      "type": "example",
      "title_fr": "Exercice : etude d'une suite recurrente",
      "body_fr": "Soit $(u_n)$ definie par $u_0 = 1$ et $u_{n+1} = \\sqrt{2 + u_n}$.\n\n1) Points fixes : $\\ell = \\sqrt{2 + \\ell}$ donne $\\ell^2 = 2 + \\ell$, soit $\\ell^2 - \\ell - 2 = 0$.\n$$(\\ell - 2)(\\ell + 1) = 0$$\nDonc $\\ell = 2$ (on ecarte $\\ell = -1$ car $u_n \\geq 0$).\n\n2) Montrons que $0 \\leq u_n \\leq 2$ pour tout $n$ par recurrence :\n- $u_0 = 1 \\in [0, 2]$ ✓\n- Si $u_n \\in [0, 2]$ alors $u_{n+1} = \\sqrt{2 + u_n} \\in [\\sqrt{2}, 2] \\subset [0, 2]$ ✓\n\n3) Monotonie : $u_{n+1} - u_n = \\sqrt{2 + u_n} - u_n$. Posons $g(x) = \\sqrt{2+x} - x$. Pour $x \\in [0, 2]$, $g(x) \\geq 0$ (car $g(2) = 0$ et $g$ decroissante). Donc $(u_n)$ est croissante.\n\n4) $(u_n)$ est croissante et majoree par $2$ : elle converge vers $\\ell = 2$."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000004';

-- 5. Suites adjacentes
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Suites adjacentes",
      "body_fr": "Deux suites $(u_n)$ et $(v_n)$ sont adjacentes si :\n1. L'une est croissante et l'autre est decroissante\n2. $\\lim_{n \\to +\\infty} (v_n - u_n) = 0$\n\nTheoreme des suites adjacentes :\nSi $(u_n)$ et $(v_n)$ sont adjacentes, alors elles convergent vers une meme limite $\\ell$, et pour tout $n$ :\n$$u_n \\leq \\ell \\leq v_n$$\n(si $u_n$ est croissante et $v_n$ decroissante)\n\nCe theoreme est particulierement utile pour :\n- Encadrer une limite\n- Prouver l'existence d'une limite commune\n- Approcher un nombre irrationnel (comme $e$ ou $\\pi$)"
    },
    {
      "type": "formula",
      "title_fr": "Conditions et verification",
      "body_fr": "Pour montrer que $(u_n)$ et $(v_n)$ sont adjacentes, il faut verifier :\n\n1. $(u_n)$ est croissante : $u_{n+1} - u_n \\geq 0$ pour tout $n$\n2. $(v_n)$ est decroissante : $v_{n+1} - v_n \\leq 0$ pour tout $n$\n3. $\\lim_{n \\to +\\infty} (v_n - u_n) = 0$\n\nRemarques :\n- On a toujours $u_n \\leq v_n$ pour tout $n$ (consequence des hypotheses)\n- L'encadrement $u_n \\leq \\ell \\leq v_n$ fournit une precision $|\\ell - u_n| \\leq v_n - u_n$\n\nVariante utile : si $(u_n)$ croissante, $(v_n)$ decroissante, et $v_n - u_n = \\frac{C}{q^n}$ avec $q > 1$, alors $v_n - u_n \\to 0$ et les suites sont adjacentes."
    },
    {
      "type": "example",
      "title_fr": "Exercice : prouver que deux suites sont adjacentes",
      "body_fr": "Soient les suites definies par :\n$$u_n = \\sum_{k=0}^{n} \\frac{1}{k!} \\quad \\text{et} \\quad v_n = u_n + \\frac{1}{n \\cdot n!}$$\n\n1) $(u_n)$ est croissante : $u_{n+1} - u_n = \\frac{1}{(n+1)!} > 0$ ✓\n\n2) $(v_n)$ est decroissante : on montre que $v_{n+1} - v_n < 0$ :\n$$v_{n+1} - v_n = \\frac{1}{(n+1)!} + \\frac{1}{(n+1)(n+1)!} - \\frac{1}{n \\cdot n!}$$\n$$= \\frac{1}{(n+1)!}\\left(1 + \\frac{1}{n+1}\\right) - \\frac{1}{n \\cdot n!}$$\nOn verifie que cette expression est negative pour $n \\geq 1$. ✓\n\n3) $v_n - u_n = \\frac{1}{n \\cdot n!} \\to 0$ quand $n \\to +\\infty$ ✓\n\nConclusion : $(u_n)$ et $(v_n)$ sont adjacentes. Leur limite commune est $e = \\sum_{k=0}^{+\\infty} \\frac{1}{k!}$."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000005';

-- 6. Notion de limite
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Notion de limite d'une fonction",
      "body_fr": "Soit $f$ une fonction definie au voisinage de $a$ (sauf peut-etre en $a$).\n\nLimite finie en un point : $\\lim_{x \\to a} f(x) = \\ell$ signifie que $f(x)$ peut etre rendue aussi proche de $\\ell$ que l'on veut, pourvu que $x$ soit assez proche de $a$.\n\nLimite infinie en un point : $\\lim_{x \\to a} f(x) = +\\infty$ signifie que $f(x)$ devient arbitrairement grand quand $x$ s'approche de $a$.\n\nLimite a l'infini : $\\lim_{x \\to +\\infty} f(x) = \\ell$ signifie que $f(x)$ se rapproche de $\\ell$ quand $x$ devient tres grand.\n\nLimites a gauche et a droite :\n- $\\lim_{x \\to a^-} f(x)$ : limite quand $x$ tend vers $a$ par valeurs inferieures\n- $\\lim_{x \\to a^+} f(x)$ : limite quand $x$ tend vers $a$ par valeurs superieures\n\nSi ces deux limites existent et sont egales, alors $\\lim_{x \\to a} f(x)$ existe."
    },
    {
      "type": "formula",
      "title_fr": "Notations et formes indeterminees",
      "body_fr": "Operations sur les limites (quand elles ont un sens) :\n$$\\lim (f + g) = \\lim f + \\lim g$$\n$$\\lim (f \\cdot g) = \\lim f \\cdot \\lim g$$\n$$\\lim \\frac{f}{g} = \\frac{\\lim f}{\\lim g} \\quad (\\lim g \\neq 0)$$\n\nFormes indeterminees (FI) — le resultat ne peut pas etre deduit directement :\n$$\\frac{0}{0} \\quad ; \\quad \\frac{\\infty}{\\infty} \\quad ; \\quad 0 \\times \\infty$$\n$$+\\infty - \\infty \\quad ; \\quad 1^{\\infty} \\quad ; \\quad 0^0 \\quad ; \\quad \\infty^0$$\n\nAsymptotes :\n- Asymptote horizontale $y = \\ell$ si $\\lim_{x \\to \\pm\\infty} f(x) = \\ell$\n- Asymptote verticale $x = a$ si $\\lim_{x \\to a} f(x) = \\pm\\infty$\n- Asymptote oblique $y = ax + b$ si $\\lim_{x \\to \\pm\\infty} [f(x) - (ax+b)] = 0$"
    },
    {
      "type": "example",
      "title_fr": "Exercice : evaluer une limite",
      "body_fr": "Calculer $\\lim_{x \\to +\\infty} \\frac{3x^2 - x + 1}{2x^2 + 5}$.\n\nC'est une FI du type $\\frac{\\infty}{\\infty}$.\n\nOn factorise par le terme de plus haut degre :\n$$\\frac{3x^2 - x + 1}{2x^2 + 5} = \\frac{x^2(3 - \\frac{1}{x} + \\frac{1}{x^2})}{x^2(2 + \\frac{5}{x^2})} = \\frac{3 - \\frac{1}{x} + \\frac{1}{x^2}}{2 + \\frac{5}{x^2}}$$\n\nQuand $x \\to +\\infty$ : $\\frac{1}{x} \\to 0$ et $\\frac{1}{x^2} \\to 0$, donc :\n$$\\lim_{x \\to +\\infty} \\frac{3x^2 - x + 1}{2x^2 + 5} = \\frac{3}{2}$$\n\nLa droite $y = \\frac{3}{2}$ est asymptote horizontale en $+\\infty$."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000006';

-- 7. Calcul de limites
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Techniques de calcul de limites",
      "body_fr": "Pour lever une forme indeterminee, on utilise les techniques suivantes :\n\n1) Factorisation : extraire le terme dominant\n$$\\lim_{x \\to +\\infty} \\frac{P(x)}{Q(x)} = \\lim_{x \\to +\\infty} \\frac{a_n x^n}{b_m x^m}$$\n\n2) Quantite conjuguee : pour les formes $\\infty - \\infty$ avec des racines\n$$\\sqrt{A} - \\sqrt{B} = \\frac{A - B}{\\sqrt{A} + \\sqrt{B}}$$\n\n3) Changement de variable : poser $t = \\frac{1}{x}$ quand $x \\to \\pm\\infty$, ou $h = x - a$ quand $x \\to a$\n\n4) Regle de L'Hopital : si $\\frac{f(x)}{g(x)}$ est de la forme $\\frac{0}{0}$ ou $\\frac{\\infty}{\\infty}$ :\n$$\\lim_{x \\to a} \\frac{f(x)}{g(x)} = \\lim_{x \\to a} \\frac{f'(x)}{g'(x)}$$\n(si cette derniere limite existe)"
    },
    {
      "type": "formula",
      "title_fr": "Limites classiques a connaitre",
      "body_fr": "Limites fondamentales :\n$$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$$\n$$\\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2} = \\frac{1}{2}$$\n$$\\lim_{x \\to 0} \\frac{\\tan x}{x} = 1$$\n$$\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1$$\n$$\\lim_{x \\to 0} \\frac{\\ln(1 + x)}{x} = 1$$\n\nCroissances comparees :\n$$\\lim_{x \\to +\\infty} \\frac{e^x}{x^n} = +\\infty \\quad (n \\in \\mathbb{N})$$\n$$\\lim_{x \\to +\\infty} \\frac{(\\ln x)^n}{x} = 0 \\quad (n \\in \\mathbb{N}^*)$$\n$$\\lim_{x \\to 0^+} x \\ln x = 0$$\n$$\\lim_{x \\to 0^+} x^n \\ln x = 0 \\quad (n > 0)$$"
    },
    {
      "type": "example",
      "title_fr": "Exercice : lever des formes indeterminees",
      "body_fr": "1) Forme $\\frac{0}{0}$ — limite classique :\n$$\\lim_{x \\to 0} \\frac{\\sin(3x)}{x} = \\lim_{x \\to 0} 3 \\cdot \\frac{\\sin(3x)}{3x} = 3 \\times 1 = 3$$\n\n2) Forme $\\infty - \\infty$ — quantite conjuguee :\n$$\\lim_{x \\to +\\infty} (\\sqrt{x^2 + x} - x) = \\lim_{x \\to +\\infty} \\frac{x^2 + x - x^2}{\\sqrt{x^2 + x} + x}$$\n$$= \\lim_{x \\to +\\infty} \\frac{x}{x(\\sqrt{1 + \\frac{1}{x}} + 1)} = \\frac{1}{1 + 1} = \\frac{1}{2}$$\n\n3) Forme $\\frac{0}{0}$ — L'Hopital :\n$$\\lim_{x \\to 0} \\frac{e^x - 1 - x}{x^2} = \\lim_{x \\to 0} \\frac{e^x - 1}{2x} = \\lim_{x \\to 0} \\frac{e^x}{2} = \\frac{1}{2}$$"
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000007';

-- 8. Continuite
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Continuite d'une fonction",
      "body_fr": "Une fonction $f$ est continue en un point $a$ de son domaine de definition si :\n$$\\lim_{x \\to a} f(x) = f(a)$$\n\nCette condition se decompose en trois parties :\n1. $f(a)$ existe (f est definie en $a$)\n2. $\\lim_{x \\to a} f(x)$ existe\n3. Cette limite est egale a $f(a)$\n\nContinuite a droite : $\\lim_{x \\to a^+} f(x) = f(a)$\nContinuite a gauche : $\\lim_{x \\to a^-} f(x) = f(a)$\n\n$f$ est continue en $a$ si et seulement si elle est continue a gauche et a droite en $a$.\n\nContinuite sur un intervalle $[a, b]$ : $f$ est continue en tout point de $]a, b[$, continue a droite en $a$ et continue a gauche en $b$.\n\nFonctions continues classiques : polynomes, fractions rationnelles (sur leur domaine), $\\sin$, $\\cos$, $\\exp$, $\\ln$, $\\sqrt{}$, et leurs composees."
    },
    {
      "type": "formula",
      "title_fr": "Proprietes des fonctions continues",
      "body_fr": "Operrations conservant la continuite :\n- Somme, produit, quotient (si denominateur non nul) de fonctions continues\n- Composee de fonctions continues\n- Valeur absolue d'une fonction continue\n\nProlongement par continuite : si $\\lim_{x \\to a} f(x) = \\ell$ existe et $f$ n'est pas definie en $a$, on definit :\n$$\\tilde{f}(x) = \\begin{cases} f(x) & \\text{si } x \\neq a \\\\ \\ell & \\text{si } x = a \\end{cases}$$\n\nImage d'un intervalle : si $f$ est continue sur $[a, b]$, alors $f([a, b])$ est un intervalle.\n\nTheoremes fondamentaux :\n- Theoreme des valeurs intermediaires (TVI)\n- Theoreme des bornes atteintes : $f$ continue sur $[a,b]$ atteint ses bornes"
    },
    {
      "type": "example",
      "title_fr": "Exercice : etude de continuite",
      "body_fr": "Soit $f$ definie par :\n$$f(x) = \\begin{cases} \\frac{\\sin x}{x} & \\text{si } x \\neq 0 \\\\ 1 & \\text{si } x = 0 \\end{cases}$$\n\nMontrons que $f$ est continue en $0$ :\n\n1) $f(0) = 1$ ✓ ($f$ est definie en $0$)\n\n2) $\\lim_{x \\to 0} f(x) = \\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ ✓ (limite classique)\n\n3) $\\lim_{x \\to 0} f(x) = 1 = f(0)$ ✓\n\nDonc $f$ est continue en $0$.\n\nContre-exemple : $g(x) = \\begin{cases} \\frac{x^2 - 1}{x - 1} & \\text{si } x \\neq 1 \\\\ 3 & \\text{si } x = 1 \\end{cases}$\n\n$\\lim_{x \\to 1} g(x) = \\lim_{x \\to 1} \\frac{(x-1)(x+1)}{x-1} = \\lim_{x \\to 1}(x+1) = 2 \\neq 3 = g(1)$\n\nDonc $g$ n'est pas continue en $1$."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000008';

-- 9. Theoreme des valeurs intermediaires
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Theoreme des valeurs intermediaires",
      "body_fr": "Theoreme des valeurs intermediaires (TVI) :\nSi $f$ est continue sur un intervalle $[a, b]$ et si $k$ est un reel compris entre $f(a)$ et $f(b)$, alors il existe au moins un reel $c \\in [a, b]$ tel que $f(c) = k$.\n\nCas particulier (theoreme de Bolzano) :\nSi $f$ est continue sur $[a, b]$ et si $f(a) \\cdot f(b) < 0$ (les valeurs sont de signes contraires), alors l'equation $f(x) = 0$ admet au moins une solution dans $]a, b[$.\n\nTheoreme de la bijection :\nSi $f$ est continue et strictement monotone sur un intervalle $I$, alors $f$ realise une bijection de $I$ sur $f(I) = J$, et la fonction reciproque $f^{-1}$ est continue et strictement monotone de meme sens sur $J$.\n\nConsequence : si $f$ est continue et strictement monotone sur $[a, b]$, alors pour tout $k$ entre $f(a)$ et $f(b)$, l'equation $f(x) = k$ admet une unique solution dans $[a, b]$."
    },
    {
      "type": "formula",
      "title_fr": "Conditions d'application du TVI",
      "body_fr": "Pour appliquer le TVI, verifier :\n1. $f$ est continue sur $[a, b]$\n2. $k$ est compris entre $f(a)$ et $f(b)$ : $\\min(f(a), f(b)) \\leq k \\leq \\max(f(a), f(b))$\n\nConclusion : $\\exists c \\in [a, b], \\; f(c) = k$\n\nPour l'unicite, ajouter :\n3. $f$ est strictement monotone sur $[a, b]$\n\nConclusion renforcee : $\\exists! c \\in [a, b], \\; f(c) = k$\n\nMethode de dichotomie : pour approcher $c$ :\n- Calculer $f\\left(\\frac{a+b}{2}\\right)$\n- Determiner dans quelle moitie se trouve $c$\n- Repeter pour affiner l'encadrement\n- Apres $n$ iterations, la precision est $\\frac{b-a}{2^n}$"
    },
    {
      "type": "example",
      "title_fr": "Exercice : montrer qu'une equation a une solution",
      "body_fr": "Montrer que l'equation $x^3 + x - 1 = 0$ admet une unique solution dans $[0, 1]$.\n\nPosons $f(x) = x^3 + x - 1$.\n\n1) $f$ est continue sur $[0, 1]$ (fonction polynomiale).\n\n2) Valeurs aux bornes :\n$$f(0) = 0 + 0 - 1 = -1 < 0$$\n$$f(1) = 1 + 1 - 1 = 1 > 0$$\n\n3) $f(0) \\times f(1) = -1 < 0$ : $f$ change de signe.\nD'apres le TVI, il existe $c \\in ]0, 1[$ tel que $f(c) = 0$.\n\n4) Unicite : $f'(x) = 3x^2 + 1 > 0$ pour tout $x$.\nDonc $f$ est strictement croissante sur $\\mathbb{R}$, en particulier sur $[0, 1]$.\nLa solution est donc unique.\n\nEncadrement par dichotomie :\n$f(0{,}5) = 0{,}125 + 0{,}5 - 1 = -0{,}375 < 0$\n$f(0{,}75) = 0{,}422 + 0{,}75 - 1 = 0{,}172 > 0$\nDonc $c \\in ]0{,}5 \\; ; \\; 0{,}75[$."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000009';

-- 10. Derivees de base
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Definition et interpretation de la derivee",
      "body_fr": "La derivee de $f$ en un point $a$ est definie par la limite (si elle existe) :\n$$f'(a) = \\lim_{h \\to 0} \\frac{f(a + h) - f(a)}{h} = \\lim_{x \\to a} \\frac{f(x) - f(a)}{x - a}$$\n\nSi cette limite existe, on dit que $f$ est derivable en $a$.\n\nInterpretation geometrique :\n- Le rapport $\\frac{f(x) - f(a)}{x - a}$ est la pente de la secante passant par $(a, f(a))$ et $(x, f(x))$\n- $f'(a)$ est la pente de la tangente a la courbe au point $(a, f(a))$\n\nEquation de la tangente en $a$ :\n$$y = f'(a)(x - a) + f(a)$$\n\nLien derivabilite/continuite :\n- Si $f$ est derivable en $a$, alors $f$ est continue en $a$\n- La reciproque est fausse : $x \\mapsto |x|$ est continue en $0$ mais pas derivable en $0$"
    },
    {
      "type": "formula",
      "title_fr": "Tableau des derivees de base",
      "body_fr": "Fonctions de reference :\n$$\\frac{d}{dx}(c) = 0 \\quad (c \\in \\mathbb{R})$$\n$$\\frac{d}{dx}(x^n) = nx^{n-1} \\quad (n \\in \\mathbb{Z})$$\n$$\\frac{d}{dx}(\\sqrt{x}) = \\frac{1}{2\\sqrt{x}}$$\n$$\\frac{d}{dx}(\\sin x) = \\cos x$$\n$$\\frac{d}{dx}(\\cos x) = -\\sin x$$\n$$\\frac{d}{dx}(\\tan x) = 1 + \\tan^2 x = \\frac{1}{\\cos^2 x}$$\n$$\\frac{d}{dx}(e^x) = e^x$$\n$$\\frac{d}{dx}(\\ln x) = \\frac{1}{x} \\quad (x > 0)$$\n$$\\frac{d}{dx}(\\frac{1}{x}) = -\\frac{1}{x^2}$$"
    },
    {
      "type": "example",
      "title_fr": "Exercice : calculer une derivee par la definition",
      "body_fr": "Calculer $f'(1)$ pour $f(x) = x^2 + 3x$ en utilisant la definition.\n\n$$f'(1) = \\lim_{h \\to 0} \\frac{f(1 + h) - f(1)}{h}$$\n\nCalculons :\n$$f(1) = 1 + 3 = 4$$\n$$f(1+h) = (1+h)^2 + 3(1+h) = 1 + 2h + h^2 + 3 + 3h = 4 + 5h + h^2$$\n\nDonc :\n$$\\frac{f(1+h) - f(1)}{h} = \\frac{4 + 5h + h^2 - 4}{h} = \\frac{5h + h^2}{h} = 5 + h$$\n\nEn passant a la limite :\n$$f'(1) = \\lim_{h \\to 0} (5 + h) = 5$$\n\nVerification avec la formule : $f'(x) = 2x + 3$, donc $f'(1) = 2 + 3 = 5$ ✓\n\nLa tangente en $x = 1$ est : $y = 5(x - 1) + 4 = 5x - 1$."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000010';

-- 11. Regles de derivation
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Regles de derivation",
      "body_fr": "Soient $f$ et $g$ deux fonctions derivables et $\\lambda$ un reel.\n\nLinearite :\n$$(f + g)' = f' + g' \\quad ; \\quad (\\lambda f)' = \\lambda f'$$\n\nDerivee d'un produit :\n$$(f \\cdot g)' = f' \\cdot g + f \\cdot g'$$\n\nDerivee d'un quotient (la ou $g \\neq 0$) :\n$$\\left(\\frac{f}{g}\\right)' = \\frac{f' \\cdot g - f \\cdot g'}{g^2}$$\n\nDerivee d'une composee (regle de la chaine) :\n$$(f \\circ g)'(x) = g'(x) \\cdot f'(g(x))$$\n\nOu de maniere equivalente, si $y = f(u)$ et $u = g(x)$ :\n$$\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}$$\n\nDerivee de la reciproque : si $f$ est bijective et derivable, et $f'(a) \\neq 0$ :\n$$(f^{-1})'(b) = \\frac{1}{f'(a)} \\quad \\text{ou } b = f(a)$$"
    },
    {
      "type": "formula",
      "title_fr": "Derivees composees courantes",
      "body_fr": "Soit $u = u(x)$ une fonction derivable :\n\n$$\\frac{d}{dx}[u^n] = n \\cdot u' \\cdot u^{n-1}$$\n$$\\frac{d}{dx}[\\sqrt{u}] = \\frac{u'}{2\\sqrt{u}}$$\n$$\\frac{d}{dx}\\left[\\frac{1}{u}\\right] = -\\frac{u'}{u^2}$$\n$$\\frac{d}{dx}[e^u] = u' \\cdot e^u$$\n$$\\frac{d}{dx}[\\ln u] = \\frac{u'}{u} \\quad (u > 0)$$\n$$\\frac{d}{dx}[\\sin u] = u' \\cos u$$\n$$\\frac{d}{dx}[\\cos u] = -u' \\sin u$$\n\nDerivee $n$-ieme d'un produit (formule de Leibniz) :\n$$(fg)^{(n)} = \\sum_{k=0}^{n} \\binom{n}{k} f^{(k)} g^{(n-k)}$$"
    },
    {
      "type": "example",
      "title_fr": "Exercice : derivations complexes",
      "body_fr": "1) Deriver $f(x) = x^2 e^{3x}$ (produit + composee) :\n$$f'(x) = 2x \\cdot e^{3x} + x^2 \\cdot 3e^{3x} = e^{3x}(2x + 3x^2)$$\n$$f'(x) = x e^{3x}(2 + 3x)$$\n\n2) Deriver $g(x) = \\frac{\\ln x}{x^2}$ (quotient) :\n$$g'(x) = \\frac{\\frac{1}{x} \\cdot x^2 - \\ln x \\cdot 2x}{x^4} = \\frac{x - 2x\\ln x}{x^4}$$\n$$g'(x) = \\frac{1 - 2\\ln x}{x^3}$$\n\n3) Deriver $h(x) = \\sin^3(2x)$ (composee double) :\nOn pose $u = \\sin(2x)$, donc $h = u^3$.\n$$h'(x) = 3u^2 \\cdot u' = 3\\sin^2(2x) \\cdot 2\\cos(2x)$$\n$$h'(x) = 6\\sin^2(2x)\\cos(2x)$$"
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000011';

-- 12. Applications de la derivee (tangente, extrema)
UPDATE public.skills SET lesson = $lesson$
{
  "cards": [
    {
      "type": "theory",
      "title_fr": "Applications de la derivee",
      "body_fr": "1) Equation de la tangente en un point $a$ :\n$$y = f'(a)(x - a) + f(a)$$\n\n2) Sens de variation :\n- Si $f'(x) > 0$ sur un intervalle $I$, alors $f$ est strictement croissante sur $I$\n- Si $f'(x) < 0$ sur un intervalle $I$, alors $f$ est strictement decroissante sur $I$\n- Si $f'(x) = 0$ sur un intervalle $I$, alors $f$ est constante sur $I$\n\n3) Extrema locaux :\n- Si $f'$ change de signe en $a$ (de $+$ a $-$), alors $f$ admet un maximum local en $a$\n- Si $f'$ change de signe en $a$ (de $-$ a $+$), alors $f$ admet un minimum local en $a$\n\n4) Condition necessaire : si $f$ admet un extremum en $a$ et si $f$ est derivable en $a$, alors $f'(a) = 0$. Attention : la reciproque est fausse ($f(x) = x^3$ en $0$)."
    },
    {
      "type": "formula",
      "title_fr": "Etude de fonction — methode",
      "body_fr": "Etapes d'une etude complete de fonction :\n\n1. Domaine de definition $D_f$\n2. Parite / periodicite (pour reduire le domaine d'etude)\n3. Limites aux bornes du domaine → asymptotes\n4. Derivee $f'(x)$ et son signe → tableau de variations\n5. Extrema : valeurs de $f$ aux points ou $f'$ s'annule en changeant de signe\n6. Points particuliers ($f(0)$, intersections avec les axes)\n7. Trace de la courbe\n\nTangente horizontale : si $f'(a) = 0$, la tangente en $a$ est $y = f(a)$ (droite horizontale).\n\nPosition relative courbe/tangente :\nLe signe de $f(x) - [f'(a)(x-a) + f(a)]$ determine si la courbe est au-dessus ou en dessous de la tangente. Cela est lie a la convexite ($f'' > 0$ : convexe, $f'' < 0$ : concave)."
    },
    {
      "type": "example",
      "title_fr": "Exercice : etude complete de fonction",
      "body_fr": "Etudier $f(x) = x^3 - 3x + 2$ sur $\\mathbb{R}$.\n\n1) $D_f = \\mathbb{R}$ (polynome).\n\n2) Limites : $\\lim_{x \\to -\\infty} f(x) = -\\infty$ et $\\lim_{x \\to +\\infty} f(x) = +\\infty$.\n\n3) Derivee : $f'(x) = 3x^2 - 3 = 3(x^2 - 1) = 3(x-1)(x+1)$\n- $f'(x) = 0 \\Leftrightarrow x = -1$ ou $x = 1$\n- $f'(x) > 0$ sur $]-\\infty, -1[ \\cup ]1, +\\infty[$\n- $f'(x) < 0$ sur $]-1, 1[$\n\n4) Tableau de variations :\n- $f(-1) = -1 + 3 + 2 = 4$ (maximum local)\n- $f(1) = 1 - 3 + 2 = 0$ (minimum local)\n\n5) Tangentes horizontales :\n- En $x = -1$ : $y = 4$\n- En $x = 1$ : $y = 0$\n\n6) $f(0) = 2$, $f(1) = 0$ donc $(1, 0)$ est sur l'axe des abscisses."
    }
  ]
}
$lesson$
WHERE id = '33333333-0000-0000-0000-000000000012';
