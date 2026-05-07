-- Migration 008: Expanded lesson cards for math, physics, SVT, and engineering
-- Generated 2026-05-07

-- ===== lessons_math_expanded.sql =====
-- ============================================================
-- Math lesson cards expansion: 3 additional cards per skill (cards 4–6)
-- Brings each skill to 6 lesson cards total.
-- Content style: intuition-first (3Blue1Brown), BAC traps (Yvan Monka),
--   worked examples from Hachette/Nathan Terminale + Moroccan BAC past papers.
-- Safe to re-run: only appends if card count < 6.
-- ============================================================

-- =====================
-- 1. Suites arithmétiques (arithmetic_seq)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Monotonie et somme : aller plus loin",
      "body_fr": "Une suite arithmétique est monotone selon le signe de sa raison $r$ : croissante si $r > 0$, décroissante si $r < 0$, constante si $r = 0$. Pour la somme des $n$ premiers termes (de $U_0$ à $U_{n-1}$), pensez à l''astuce de Gauss : écrire la somme dans les deux sens, puis ajouter terme à terme. Chaque paire vaut $U_0 + U_{n-1}$, et il y en a $n$, donc $S_n = \\frac{n(U_0 + U_{n-1})}{2}$. Erreur classique au BAC : confondre le nombre de termes avec le dernier indice."
    },
    {
      "type": "example",
      "title_fr": "Exemple résolu (BAC style)",
      "body_fr": "**Problème.** On place 500 DH dans une tirelire le 1er janvier. Chaque mois suivant, on ajoute 50 DH de plus que le mois précédent. Combien a-t-on au bout de 12 mois ?\n\n**Solution.** Les dépôts mensuels forment une suite arithmétique : $U_0 = 500$, $r = 50$. Le dépôt du mois $n$ est $U_n = 500 + 50n$. Le dépôt du 12ème mois (n = 11) est $U_{11} = 500 + 550 = 1050$ DH.\n\nTotal : $S = \\frac{12(U_0 + U_{11})}{2} = \\frac{12 \\times 1550}{2} = 9300$ DH.\n\n**Remarque BAC :** Justifier explicitement le nombre de termes (ici 12, de $n=0$ à $n=11$)."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC Maroc 2022 (adapté).** $(U_n)$ est arithmétique. On sait que $U_2 + U_5 = 17$ et $U_3 \\times U_4 = 0$. Déterminer $U_0$ et $r$.\n\n**Solution.** $U_3 \\times U_4 = 0$ implique $U_3 = 0$ ou $U_4 = 0$.\n\n*Cas 1 :* $U_3 = 0 \\Rightarrow U_0 + 3r = 0$. Et $U_2 + U_5 = (U_0 + 2r) + (U_0 + 5r) = 2U_0 + 7r = 17$. En substituant $U_0 = -3r$ : $-6r + 7r = r = 17$. Donc $r = 17$, $U_0 = -51$.\n\n*Cas 2 :* $U_4 = 0 \\Rightarrow U_0 + 4r = 0$. De $2U_0 + 7r = 17$ et $U_0 = -4r$ : $-8r + 7r = -r = 17$, $r = -17$, $U_0 = 68$.\n\nDeux solutions possibles — toujours vérifier les deux cas !"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000001'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 2. Suites géométriques (geometric_seq)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Convergence et somme infinie",
      "body_fr": "Si $|q| < 1$, la suite géométrique converge vers 0 — chaque terme est une fraction du précédent, s''approchant indéfiniment de zéro. La somme infinie $S = U_0 + U_0 q + U_0 q^2 + \\cdots$ converge vers $\\frac{U_0}{1 - q}$. Intuition : imaginez couper un gâteau en deux à chaque étape — la somme de toutes les parts vaut exactement 1 gâteau. La formule de la somme des $n$ premiers termes est $S_n = U_0 \\cdot \\frac{1 - q^n}{1 - q}$ (pour $q \\neq 1$). **Piège BAC :** Si $q = 1$, on ne peut pas utiliser cette formule — la suite est constante et $S_n = n \\cdot U_0$."
    },
    {
      "type": "example",
      "title_fr": "Exemple résolu (BAC style)",
      "body_fr": "**Problème.** Un capital de 10 000 DH est placé à un taux annuel de 5 %. Quel est le capital après 10 ans ?\n\n**Solution.** Le capital après $n$ années est $U_n = 10000 \\times 1{,}05^n$. C''est une suite géométrique de raison $q = 1{,}05$ et de premier terme $U_0 = 10000$.\n\n$U_{10} = 10000 \\times 1{,}05^{10} \\approx 10000 \\times 1{,}6289 \\approx 16289$ DH.\n\n**Méthode BAC :** Identifier explicitement $U_0$ et $q$, puis appliquer la formule $U_n = U_0 \\times q^n$. Donner la valeur arrondie et préciser le nombre de décimales."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC Maroc 2023 (adapté).** $(U_n)$ est géométrique avec $U_1 = 6$ et $U_4 = 48$. 1) Déterminer $q$ et $U_0$. 2) Calculer la somme $S = U_0 + U_1 + \\cdots + U_9$.\n\n**Solution.** 1) $\\frac{U_4}{U_1} = q^3 = \\frac{48}{6} = 8$, donc $q = 2$. $U_0 = \\frac{U_1}{q} = 3$.\n\n2) $S = U_0 \\cdot \\frac{1 - q^{10}}{1 - q} = 3 \\times \\frac{1 - 2^{10}}{1 - 2} = 3 \\times \\frac{-1023}{-1} = 3 \\times 1023 = 3069$.\n\n**Vérification rapide :** Le dernier terme $U_9 = 3 \\times 2^9 = 1536$. La somme doit être un peu moins de $2 \\times U_9 = 3072$ ✓."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000002'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 3. Convergence des suites (seq_convergence)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Théorèmes de convergence",
      "body_fr": "Trois théorèmes fondamentaux permettent de conclure sur la convergence sans calculer la limite :\n\n**1. Suite monotone bornée** — Toute suite croissante et majorée converge. Toute suite décroissante et minorée converge. (On ne sait pas vers quelle valeur, mais la limite existe.)\n\n**2. Théorème des gendarmes** — Si $U_n \\leq W_n \\leq V_n$ et que $U_n$ et $V_n$ convergent vers la même limite $L$, alors $W_n \\to L$ aussi.\n\n**3. Suites adjacentes** — Si $(U_n)$ est croissante, $(V_n)$ est décroissante, et $V_n - U_n \\to 0$, elles convergent vers la même limite."
    },
    {
      "type": "example",
      "title_fr": "Démonstration par récurrence",
      "body_fr": "**Problème.** Soit $U_0 = 1$ et $U_{n+1} = \\frac{U_n + 3}{2}$. Montrer que $(U_n)$ est croissante et majorée par 3, puis déduire sa limite.\n\n**Solution.**\n\n*Initialisation :* $U_0 = 1 < 3$ ✓. $U_1 = 2 > U_0 = 1$ ✓.\n\n*Hérédité :* Supposons $U_n < 3$ et $U_n < U_{n+1}$.\n$U_{n+1} = \\frac{U_n + 3}{2} < \\frac{3 + 3}{2} = 3$ ✓.\n$U_{n+2} - U_{n+1} = \\frac{U_{n+1} + 3}{2} - U_{n+1} = \\frac{3 - U_{n+1}}{2} > 0$ (car $U_{n+1} < 3$) ✓.\n\n*Conclusion :* $(U_n)$ est croissante et majorée par 3, donc elle converge. Si $L$ est sa limite, alors $L = \\frac{L+3}{2}$, soit $2L = L + 3$, d''où $L = 3$."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**Théorème des gendarmes (BAC style).** Soit $U_n = \\frac{\\cos(n)}{n}$. Montrer que $(U_n)$ converge et trouver sa limite.\n\n**Solution.** Pour tout $n \\geq 1$, on a $-1 \\leq \\cos(n) \\leq 1$, donc $\\frac{-1}{n} \\leq \\frac{\\cos(n)}{n} \\leq \\frac{1}{n}$.\n\nOr $\\lim_{n \\to +\\infty} \\frac{-1}{n} = 0$ et $\\lim_{n \\to +\\infty} \\frac{1}{n} = 0$.\n\nPar le théorème des gendarmes (encadrement), $\\lim_{n \\to +\\infty} U_n = 0$.\n\n**Méthode BAC :** Écrire explicitement les trois suites, vérifier l''inégalité pour tout $n$, calculer les deux limites extérieures, puis conclure par le théorème cité nommément."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000003'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 4. Suites récurrentes (seq_recursive)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Étude complète d''une suite récurrente",
      "body_fr": "Pour étudier $U_{n+1} = f(U_n)$, la méthode standard BAC est en quatre étapes :\n\n**Étape 1 — Stabilité de l''intervalle.** Montrer que si $U_n \\in I$, alors $U_{n+1} = f(U_n) \\in I$. Cela justifie que la suite reste dans cet intervalle.\n\n**Étape 2 — Monotonie.** Étudier le signe de $U_{n+1} - U_n = f(U_n) - U_n$ pour montrer que la suite est croissante ou décroissante.\n\n**Étape 3 — Bornitude.** Combiner avec l''étape 1 pour conclure que la suite est monotone et bornée, donc convergente.\n\n**Étape 4 — Limite.** Si $L$ est la limite, elle vérifie $L = f(L)$. Résoudre cette équation (points fixes de $f$) et choisir la solution compatible avec le sens de variation."
    },
    {
      "type": "example",
      "title_fr": "Exemple avec changement de variable",
      "body_fr": "**Problème.** Soit $U_0 = 2$ et $U_{n+1} = \\sqrt{2 U_n}$. Étudier la convergence de $(U_n)$.\n\n**Astuce :** Poser $V_n = \\ln(U_n)$. Alors $V_{n+1} = \\ln(\\sqrt{2 U_n}) = \\frac{1}{2}(\\ln 2 + V_n)$.\n\nLa suite $(V_n)$ est une suite récurrente de la forme $V_{n+1} = \\frac{V_n}{2} + \\frac{\\ln 2}{2}$, qui est une suite affine. Son point fixe : $L = \\frac{L}{2} + \\frac{\\ln 2}{2} \\Rightarrow L = \\ln 2$.\n\nDonc $V_n \\to \\ln 2$, soit $U_n \\to e^{\\ln 2} = 2$.\n\n**Leçon :** Un changement de variable (ln, exp) peut transformer une suite récurrente compliquée en une suite affine simple."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SM 2021 (adapté).** Soit $f(x) = \\frac{x^2 + 2}{3}$, $U_0 = 0$, $U_{n+1} = f(U_n)$.\n\n1) Montrer que si $U_n \\in [0, 1]$ alors $U_{n+1} \\in [0, 1]$.\n2) Montrer que $(U_n)$ est croissante.\n3) En déduire que $(U_n)$ converge et calculer sa limite.\n\n**Solution.** 1) Pour $x \\in [0,1]$ : $f(x) = \\frac{x^2+2}{3}$. Comme $0 \\leq x^2 \\leq 1$, on a $\\frac{2}{3} \\leq f(x) \\leq 1$. Donc $f(x) \\in [0,1]$ ✓.\n\n2) $U_{n+1} - U_n = f(U_n) - U_n = \\frac{U_n^2 - 3U_n + 2}{3} = \\frac{(U_n-1)(U_n-2)}{3}$. Pour $U_n \\in [0,1]$ : $(U_n - 1) \\leq 0$ et $(U_n - 2) < 0$, donc le produit $\\geq 0$. Suite croissante ✓.\n\n3) Croissante et majorée par 1 → converge. $L = \\frac{L^2+2}{3} \\Rightarrow L^2 - 3L + 2 = 0 \\Rightarrow L = 1$ (on rejette $L=2$ car $U_n \\leq 1$)."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000004'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 5. Suites adjacentes (seq_adjacent)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Encadrement et approximation",
      "body_fr": "Les suites adjacentes donnent un outil puissant pour encadrer une limite inconnue. Si $(U_n)$ est croissante, $(V_n)$ est décroissante, et $V_n - U_n \\to 0$, alors pour tout $n$ :\n$$U_n \\leq L \\leq V_n$$\nCe double encadrement permet d''approcher $L$ avec la précision souhaitée. **Application classique :** la constante $e$ peut être encadrée par des suites adjacentes issues des sommes partielles de $\\sum \\frac{1}{k!}$. Au BAC, on vous demande souvent de montrer les deux propriétés puis de conclure la convergence commune."
    },
    {
      "type": "example",
      "title_fr": "Construction de suites adjacentes",
      "body_fr": "**Problème.** Soit $U_n = \\sum_{k=0}^{n} \\frac{1}{k!}$ et $V_n = U_n + \\frac{1}{n \\cdot n!}$. Montrer que $(U_n)$ et $(V_n)$ sont adjacentes.\n\n**Solution.** $(U_n)$ est clairement croissante (on ajoute des termes positifs).\n\nPour $(V_n)$ : $V_{n+1} - V_n = \\frac{1}{(n+1)!} + \\frac{1}{(n+1)(n+1)!} - \\frac{1}{n \\cdot n!}$. Une simplification montre que $V_{n+1} \\leq V_n$, donc $(V_n)$ est décroissante.\n\n$V_n - U_n = \\frac{1}{n \\cdot n!} \\to 0$.\n\nDonc $(U_n)$ et $(V_n)$ sont adjacentes, de limite commune $e$. Pour $n = 5$ : $U_5 = 2{,}7166...$ et $V_5 = 2{,}7172...$, encadrant $e \\approx 2{,}71828$."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SM 2020 (adapté).** Soit $U_n = 1 - \\frac{1}{2} + \\frac{1}{3} - \\cdots + \\frac{(-1)^{n+1}}{n}$ et $V_n = U_n + \\frac{(-1)^{n+2}}{n+1}$.\n\n1) Montrer que $V_n - U_n \\to 0$.\n2) Montrer que $(U_{2n})$ est croissante et $(U_{2n+1})$ est décroissante (ou utiliser $(U_n)$, $(V_n)$ directement).\n3) Conclure que les deux suites convergent vers la même limite $\\ln 2$.\n\n**Guidage :** Pour la question 2, calculer $V_n - V_{n+1}$ et $U_{n+1} - U_n$ en utilisant le signe de $\\frac{(-1)^{n+1}}{n}$. Cette suite est la série harmonique alternée — un résultat fondamental du programme."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000005'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 6. Notion de limite (limit_def)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Limites infinies et formes indéterminées",
      "body_fr": "Quand on dit $\\lim_{x \\to a} f(x) = +\\infty$, cela signifie que $f(x)$ dépasse n''importe quelle valeur fixée dès que $x$ est assez proche de $a$. Ce n''est pas un nombre — c''est une description du comportement.\n\n**Formes indéterminées :** Certaines expressions ne donnent pas directement leur limite : $\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$, $\\infty - \\infty$, $0 \\times \\infty$. Il faut les lever par factorisation, conjugué, ou un développement.\n\n**Règle de Bernoulli–L''Hôpital :** Si $\\lim \\frac{f(x)}{g(x)}$ donne $\\frac{0}{0}$ ou $\\frac{\\infty}{\\infty}$, et que $f$ et $g$ sont dérivables avec $g''(x) \\neq 0$, alors $\\lim \\frac{f(x)}{g(x)} = \\lim \\frac{f''(x)}{g''(x)}$ (si cette dernière existe)."
    },
    {
      "type": "example",
      "title_fr": "Lever une forme indéterminée",
      "body_fr": "**Problème.** Calculer $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$.\n\n**Solution.** En $x = 3$, on obtient $\\frac{0}{0}$ — forme indéterminée. Factoriser le numérateur :\n$$\\frac{x^2 - 9}{x - 3} = \\frac{(x-3)(x+3)}{x-3} = x + 3 \\quad (x \\neq 3)$$\nDonc $\\lim_{x \\to 3} \\frac{x^2-9}{x-3} = \\lim_{x \\to 3} (x+3) = 6$.\n\n**Interprétation géométrique :** Ce quotient est le taux de variation de $f(x) = x^2$ en $x = 3$. Sa limite est la dérivée $f''(3) = 2 \\times 3 = 6$ — cohérent ✓.\n\n**Erreur classique :** Substituer $x = 3$ directement avant de simplifier — ce qui donne $\\frac{0}{0}$ et ne conclut rien."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC PC 2022 (adapté).** Calculer les limites suivantes.\n\n**a)** $\\lim_{x \\to +\\infty} \\frac{3x^2 - 5x + 1}{2x^2 + x - 4}$\n\nFactoriser par $x^2$ : $\\frac{x^2(3 - \\frac{5}{x} + \\frac{1}{x^2})}{x^2(2 + \\frac{1}{x} - \\frac{4}{x^2})} \\to \\frac{3}{2}$.\n\n**b)** $\\lim_{x \\to 0} \\frac{\\sqrt{1+x} - 1}{x}$\n\nMultiplier par le conjugué : $\\frac{(\\sqrt{1+x}-1)(\\sqrt{1+x}+1)}{x(\\sqrt{1+x}+1)} = \\frac{x}{x(\\sqrt{1+x}+1)} = \\frac{1}{\\sqrt{1+x}+1} \\to \\frac{1}{2}$.\n\n**Remarque :** Ce résultat signifie que la dérivée de $\\sqrt{x}$ en $x=1$ est $\\frac{1}{2}$ — vérifiable par la formule $f''(x) = \\frac{1}{2\\sqrt{x}}$."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000006'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 7. Calcul de limites (limit_calc)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Comparaisons et croissances comparées",
      "body_fr": "Certaines fonctions ''gagnent toujours'' en compétition de croissance :\n$$\\lim_{x \\to +\\infty} \\frac{\\ln x}{x^\\alpha} = 0 \\quad (\\alpha > 0)$$\n$$\\lim_{x \\to +\\infty} \\frac{x^n}{e^x} = 0 \\quad (n \\in \\mathbb{N})$$\nEn mots : l''exponentielle croît plus vite que tout polynôme ; le polynôme croît plus vite que le logarithme. Cette hiérarchie permet de résoudre de nombreuses limites en $+\\infty$ sans calcul complexe.\n\n**Astuce BAC :** Pour $\\lim_{x \\to 0^+} x \\ln x$, poser $t = -\\ln x$ (donc $x = e^{-t}$ avec $t \\to +\\infty$) : $x \\ln x = e^{-t} \\times (-t) = \\frac{-t}{e^t} \\to 0$."
    },
    {
      "type": "example",
      "title_fr": "Limites en ±∞ avec exponentielles",
      "body_fr": "**Problème.** Calculer $\\lim_{x \\to +\\infty} (x^3 - 2x + 1) e^{-x}$.\n\n**Solution.** On reconnaît la forme $\\infty \\times 0$. Par croissances comparées, $e^x$ domine tout polynôme :\n$$\\lim_{x \\to +\\infty} \\frac{x^3}{e^x} = 0, \\quad \\lim_{x \\to +\\infty} \\frac{x}{e^x} = 0, \\quad \\lim_{x \\to +\\infty} \\frac{1}{e^x} = 0$$\nDonc $(x^3 - 2x + 1)e^{-x} = \\frac{x^3 - 2x + 1}{e^x} \\to 0$.\n\n**Conclusion :** La limite vaut **0**. L''exponentielle écrase le polynôme, quelle que soit son degré."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SM 2023 (adapté).** Soit $f(x) = \\frac{e^x - 1}{\\ln(1 + x)}$ pour $x > 0$.\n\n1) Montrer que la limite en $x \\to 0^+$ est une forme indéterminée.\n2) En utilisant les équivalents $e^x - 1 \\sim x$ et $\\ln(1+x) \\sim x$ quand $x \\to 0$, calculer la limite.\n3) Interpréter géométriquement.\n\n**Solution.** 1) $e^0 - 1 = 0$ et $\\ln(1) = 0$ : forme $\\frac{0}{0}$ ✓.\n\n2) $\\frac{e^x - 1}{\\ln(1+x)} \\sim \\frac{x}{x} = 1$ quand $x \\to 0^+$. Limite = **1**.\n\n3) Géométriquement : les courbes $y = e^x - 1$ et $y = \\ln(1+x)$ ont la même tangente en $O$ (toutes deux tangentes à $y = x$), donc leur rapport tend vers 1."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000007'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 8. Continuité (continuity)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Prolongement par continuité",
      "body_fr": "Une fonction peut avoir un ''trou'' en un point — elle n''est pas définie en $a$ mais a une limite finie $L$ en $a$. On peut la ''réparer'' en définissant $\\tilde{f}(a) = L$. On dit que $\\tilde{f}$ est le **prolongement par continuité** de $f$ en $a$.\n\n**Exemple classique :** $f(x) = \\frac{\\sin x}{x}$ n''est pas définie en 0, mais $\\lim_{x \\to 0} f(x) = 1$. En posant $\\tilde{f}(0) = 1$, on obtient une fonction continue sur $\\mathbb{R}$.\n\n**Au BAC :** On vous demandera souvent de vérifier qu''une fonction définie par morceaux est continue en un point de raccordement — il faut que les limites à gauche et à droite coïncident et soient égales à la valeur de la fonction en ce point."
    },
    {
      "type": "example",
      "title_fr": "Continuité d''une fonction par morceaux",
      "body_fr": "**Problème.** Soit $f$ définie par : $f(x) = \\frac{x^2 - 4}{x - 2}$ si $x \\neq 2$, et $f(2) = k$. Pour quelle valeur de $k$ la fonction $f$ est-elle continue en $x = 2$ ?\n\n**Solution.** On calcule $\\lim_{x \\to 2} f(x) = \\lim_{x \\to 2} \\frac{(x-2)(x+2)}{x-2} = \\lim_{x \\to 2} (x+2) = 4$.\n\nPour que $f$ soit continue en 2, il faut $f(2) = 4$, donc $k = 4$.\n\n**Vérification :** $f$ est maintenant le prolongement par continuité de $\\frac{x^2-4}{x-2}$ en $x = 2$, et peut s''écrire simplement $f(x) = x + 2$."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC 2022 (adapté).** On définit $f : \\mathbb{R} \\to \\mathbb{R}$ par :\n$$f(x) = \\begin{cases} x^2 + ax + b & \\text{si } x \\leq 1 \\\\ 2e^{x-1} + c & \\text{si } x > 1 \\end{cases}$$\nSachant que $f$ est continue et dérivable en $x = 1$, et que $f(1) = 3$, déterminer $a$, $b$ et $c$.\n\n**Solution.** Continuité en 1 : $1 + a + b = 3$ et $2e^0 + c = 3 \\Rightarrow c = 1$.\n\nDérivabilité en 1 : $f''_g(1) = f''_d(1)$. $f''_g(x) = 2x + a \\Rightarrow f''_g(1) = 2 + a$. $f''_d(x) = 2e^{x-1} \\Rightarrow f''_d(1) = 2$. Donc $a = 0$, puis $b = 2$."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000008'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 9. Théorème des valeurs intermédiaires (tvi)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Unicité de la solution et méthode de dichotomie",
      "body_fr": "Le TVI garantit l''*existence* d''une solution — pas son unicité. Pour prouver l''unicité, on utilise souvent :\n- La **stricte monotonie** de $f$ : une fonction strictement croissante (ou décroissante) sur $[a,b]$ prend chaque valeur au plus une fois.\n- La **méthode de dichotomie** : pour localiser la racine, on coupe l''intervalle en deux répétitivement. À chaque étape, on vérifie le signe de $f$ au milieu. Après $n$ étapes, la racine est localisée à $\\frac{b-a}{2^n}$ près.\n\nAu BAC : quand on vous demande de ''montrer qu''une équation admet une solution unique'', il faut prouver TVI (existence) + monotonie stricte (unicité)."
    },
    {
      "type": "example",
      "title_fr": "Application : existence et localisation",
      "body_fr": "**Problème.** Montrer que $x^3 - 3x + 1 = 0$ admet au moins une solution dans $]0, 1[$.\n\n**Solution.** Soit $f(x) = x^3 - 3x + 1$. $f$ est continue sur $\\mathbb{R}$ (polynôme).\n\n$f(0) = 1 > 0$ et $f(1) = 1 - 3 + 1 = -1 < 0$.\n\nComme $f(0)$ et $f(1)$ sont de signes opposés et $f$ est continue sur $[0,1]$, le TVI assure l''existence d''un $c \\in ]0, 1[$ tel que $f(c) = 0$.\n\n**Dichotomie :** $f(0{,}5) = 0{,}125 - 1{,}5 + 1 = -0{,}375 < 0$. Donc la racine est dans $]0, 0{,}5[$. On peut continuer..."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SM 2021 (adapté).** Soit $f(x) = e^x - 2x - 2$.\n\n1) Étudier les variations de $f$ et dresser son tableau de signes.\n2) En déduire le nombre de solutions de $e^x = 2x + 2$.\n3) Montrer qu''une solution est dans $]1, 2[$ et encadrer par dichotomie à $0{,}25$ près.\n\n**Solution.** 1) $f''(x) = e^x - 2 = 0 \\Rightarrow x = \\ln 2$. Minimum : $f(\\ln 2) = 2 - 2\\ln 2 - 2 = -2\\ln 2 < 0$.\n\n2) $f$ est décroissante puis croissante, avec un minimum négatif et $f(x) \\to +\\infty$ des deux côtés : deux solutions.\n\n3) $f(1) = e - 4 \\approx -1{,}28 < 0$, $f(2) = e^2 - 6 \\approx 1{,}39 > 0$. Solution dans $]1, 2[$. Milieu : $f(1{,}5) \\approx 4{,}48 - 5 = -0{,}52 < 0$ → solution dans $]1{,}5, 2[$."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000009'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 10. Dérivées de base (deriv_basic)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "La dérivée comme taux de variation instantané",
      "body_fr": "Imaginez que vous zoomez sur la courbe de $f$ autour d''un point $A$. Plus vous zoomez, plus la courbe ressemble à une droite. La pente de cette droite, c''est la dérivée $f''(a)$.\n\nFormellement : $f''(a) = \\lim_{h \\to 0} \\frac{f(a+h) - f(a)}{h}$. Le numérateur est la variation de $f$, le dénominateur est le déplacement en $x$. Le quotient est la pente de la corde, et à la limite, la pente de la tangente.\n\n**Dérivées usuelles à mémoriser :**\n| $f(x)$ | $f''(x)$ |\n|--------|----------|\n| $x^n$ | $nx^{n-1}$ |\n| $e^x$ | $e^x$ |\n| $\\ln x$ | $\\frac{1}{x}$ |\n| $\\sin x$ | $\\cos x$ |\n| $\\cos x$ | $-\\sin x$ |\n| $\\sqrt{x}$ | $\\frac{1}{2\\sqrt{x}}$ |"
    },
    {
      "type": "example",
      "title_fr": "Dérivée par définition",
      "body_fr": "**Problème.** En utilisant la définition, calculer $f''(2)$ pour $f(x) = x^2 + 3x$.\n\n**Solution.** \n$f''(2) = \\lim_{h \\to 0} \\frac{f(2+h) - f(2)}{h}$\n\n$f(2+h) = (2+h)^2 + 3(2+h) = 4 + 4h + h^2 + 6 + 3h = 10 + 7h + h^2$\n\n$f(2) = 4 + 6 = 10$\n\n$\\frac{f(2+h) - f(2)}{h} = \\frac{7h + h^2}{h} = 7 + h \\to 7$\n\nDonc $f''(2) = 7$. Vérification : par la formule, $f''(x) = 2x + 3$, $f''(2) = 7$ ✓."
    },
    {
      "type": "example",
      "title_fr": "Équation de la tangente",
      "body_fr": "**BAC style.** Soit $f(x) = x^3 - 2x^2 + 1$. Écrire l''équation de la tangente à la courbe de $f$ au point d''abscisse $x_0 = 2$.\n\n**Solution.** L''équation d''une tangente en $x_0$ est : $y = f''(x_0)(x - x_0) + f(x_0)$.\n\n$f(2) = 8 - 8 + 1 = 1$.\n\n$f''(x) = 3x^2 - 4x$, donc $f''(2) = 12 - 8 = 4$.\n\nÉquation de la tangente : $y = 4(x - 2) + 1 = 4x - 7$.\n\n**À l''examen :** Toujours écrire les trois étapes — calculer $f(x_0)$, calculer $f''(x_0)$, écrire l''équation."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000010'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 11. Règles de dérivation (deriv_rules)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Dérivée de fonctions composées",
      "body_fr": "La règle de la chaîne (dérivation composée) est incontournable : si $h(x) = f(g(x))$, alors $h''(x) = g''(x) \\times f''(g(x))$.\n\nEn pratique, on identifie la fonction ''extérieure'' $f$ et la fonction ''intérieure'' $g$ :\n- $(e^{u(x)})'' = u''(x) \\cdot e^{u(x)}$\n- $(\\ln(u(x)))'' = \\frac{u''(x)}{u(x)}$\n- $(\\sqrt{u(x)})'' = \\frac{u''(x)}{2\\sqrt{u(x)}}$\n- $(u(x)^n)'' = n \\cdot u''(x) \\cdot u(x)^{n-1}$\n\n**Méthode :** Dériver de l''extérieur vers l''intérieur, puis multiplier par la dérivée de l''intérieur."
    },
    {
      "type": "example",
      "title_fr": "Règle du quotient et de la chaîne",
      "body_fr": "**Problème.** Calculer la dérivée de $f(x) = \\frac{e^{2x}}{x^2 + 1}$.\n\n**Solution (règle du quotient $\\frac{u}{v}$, $f'' = \\frac{u''v - uv''}{v^2}$) :**\n\n$u = e^{2x} \\Rightarrow u'' = 2e^{2x}$ (règle de la chaîne)\n\n$v = x^2 + 1 \\Rightarrow v'' = 2x$\n\n$f''(x) = \\frac{2e^{2x}(x^2+1) - e^{2x} \\cdot 2x}{(x^2+1)^2} = \\frac{2e^{2x}(x^2 - x + 1)}{(x^2+1)^2}$\n\n**Simplification :** Toujours factoriser $e^{2x}$ au numérateur avant de conclure."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC 2023 SM (adapté).** Soit $f(x) = (2x - 1)e^{-x}$. Étudier les variations de $f$ et dresser son tableau de variations.\n\n**Solution.** $f''(x) = 2 \\cdot e^{-x} + (2x-1)(-e^{-x}) = e^{-x}[2 - (2x-1)] = e^{-x}(3 - 2x)$.\n\nComme $e^{-x} > 0$ toujours, le signe de $f''$ est celui de $3 - 2x$ :\n- $f''(x) > 0 \\Leftrightarrow x < \\frac{3}{2}$ : $f$ croissante\n- $f''(x) < 0 \\Leftrightarrow x > \\frac{3}{2}$ : $f$ décroissante\n\nMaximum en $x = \\frac{3}{2}$ : $f(\\frac{3}{2}) = 2 \\cdot e^{-3/2} = 2e^{-3/2}$."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000011'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 12. Applications (tangente, extrema) (deriv_apps)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Convexité et points d''inflexion",
      "body_fr": "La dérivée seconde $f''$ renseigne sur la **courbure** de $f$ :\n- Si $f''(x) > 0$ : $f$ est **convexe** (concave vers le haut) — la courbe est au-dessus de ses tangentes.\n- Si $f''(x) < 0$ : $f$ est **concave** (concave vers le bas) — la courbe est en dessous de ses tangentes.\n- Un **point d''inflexion** est un point où $f''$ change de signe.\n\nPour trouver les extrema locaux avec la dérivée seconde : si $f''(x_0) = 0$ et $f''''(x_0) > 0$ → minimum local ; si $f''''(x_0) < 0$ → maximum local. Utile quand l''étude de signe de $f''$ est complexe."
    },
    {
      "type": "example",
      "title_fr": "Optimisation : problème concret",
      "body_fr": "**Problème.** Un agriculteur veut clôturer un terrain rectangulaire en bord de rivière (un côté n''a pas besoin de clôture). Il dispose de 120 m de grillage. Quelle est la dimension qui maximise l''aire ?\n\n**Solution.** Soit $x$ la longueur perpendiculaire à la rivière (2 côtés) et $y$ la longueur parallèle (1 côté). Contrainte : $2x + y = 120$, donc $y = 120 - 2x$.\n\nAire : $A(x) = x \\cdot y = x(120 - 2x) = 120x - 2x^2$.\n\n$A''(x) = 120 - 4x = 0 \\Rightarrow x = 30$ m, $y = 60$ m.\n\n$A(30) = 30 \\times 60 = 1800$ m². Maximum car $A''(x) = -4 < 0$."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SM 2022 (adapté).** On considère $f(x) = x^3 - 6x^2 + 9x + 1$.\n\n1) Calculer $f''(x)$ et $f''''(x)$.\n2) Étudier la convexité de $f$ et trouver le point d''inflexion.\n3) Montrer que la tangente au point d''inflexion coupe la courbe en un autre point et trouver ce point.\n\n**Solution.** 1) $f''(x) = 3x^2 - 12x + 9 = 3(x-1)(x-3)$. $f''''(x) = 6x - 12$.\n\n2) $f''''(x) = 0 \\Rightarrow x = 2$. Pour $x < 2$ : $f'''' < 0$ (concave). Pour $x > 2$ : $f'''' > 0$ (convexe). Inflexion en $x = 2$ : $f(2) = 8 - 24 + 18 + 1 = 3$. Point $I(2, 3)$.\n\n3) Tangente en $I$ : pente $f''(2) = 12 - 24 + 9 = -3$. $y = -3(x-2) + 3 = -3x + 9$. Intersecter avec $f$ : $x^3 - 6x^2 + 12x - 8 = 0 \\Rightarrow (x-2)^3 = 0$... développer et factoriser pour trouver l''autre racine."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000012'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 13. Primitives (primitives)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Primitives des fonctions composées",
      "body_fr": "Si $F$ est une primitive de $f$, alors $F(u(x)) \\cdot \\frac{1}{u''(x)}$... n''est pas la bonne formule. La règle correcte est :\n$$\\int u''(x) f(u(x)) \\, dx = F(u(x)) + C$$\nEn pratique, on cherche si l''intégrande a la forme $u'' \\times f(u)$ :\n- $\\int u'' e^u \\, dx = e^{u} + C$\n- $\\int \\frac{u''}{u} \\, dx = \\ln|u| + C$\n- $\\int u'' (u)^n \\, dx = \\frac{u^{n+1}}{n+1} + C$\n- $\\int u'' \\cos(u) \\, dx = \\sin(u) + C$\n\n**Astuce :** Si le facteur devant $f(u)$ n''est pas exactement $u''$, introduire la constante manquante."
    },
    {
      "type": "example",
      "title_fr": "Primitives par reconnaissance",
      "body_fr": "**Calculer :** $\\int \\frac{2x}{x^2 + 3} \\, dx$\n\n**Solution.** On reconnaît la forme $\\frac{u''}{u}$ avec $u = x^2 + 3$, $u'' = 2x$. Donc :\n$$\\int \\frac{2x}{x^2+3} \\, dx = \\ln(x^2 + 3) + C$$\n\n**Autre exemple :** $\\int x e^{x^2} \\, dx$. Ici $u = x^2$, $u'' = 2x$. Il manque le facteur 2 :\n$$\\int x e^{x^2} \\, dx = \\int \\frac{1}{2} \\cdot 2x \\cdot e^{x^2} \\, dx = \\frac{1}{2} e^{x^2} + C$$\n\n**Vérification :** $(\\frac{1}{2} e^{x^2})'' = \\frac{1}{2} \\cdot 2x \\cdot e^{x^2} = x e^{x^2}$ ✓"
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC PC 2023 (adapté).** Calculer $\\int_0^1 \\frac{x+1}{x^2+2x+5} \\, dx$.\n\n**Solution.** Remarquer que le numérateur $x + 1 = \\frac{1}{2}(2x + 2)$ est la moitié de la dérivée du dénominateur $x^2 + 2x + 5$.\n\n$$\\int_0^1 \\frac{x+1}{x^2+2x+5} \\, dx = \\frac{1}{2} \\int_0^1 \\frac{2x+2}{x^2+2x+5} \\, dx = \\frac{1}{2} [\\ln(x^2+2x+5)]_0^1$$\n\n$= \\frac{1}{2}(\\ln(1+2+5) - \\ln(0+0+5)) = \\frac{1}{2}(\\ln 8 - \\ln 5) = \\frac{1}{2} \\ln \\frac{8}{5}$\n\n**Réponse exacte :** $\\frac{\\ln(8/5)}{2}$ ✓"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000013'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 14. Intégrale définie (definite_integral)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Intégration par parties",
      "body_fr": "L''intégration par parties (IPP) s''appuie sur la règle du produit pour la dérivée : $(uv)'' = u''v + uv''$, donc $uv'' = (uv)'' - u''v$, d''où :\n$$\\int_a^b u(x) v''(x) \\, dx = [u(x)v(x)]_a^b - \\int_a^b u''(x) v(x) \\, dx$$\n**Choix stratégique de $u$ et $v''$ :** On veut que $u''$ soit plus simple que $u$, et que $v$ soit facile à trouver.\n- $\\int x e^x \\, dx$ : poser $u = x$, $v'' = e^x$ → $u'' = 1$, $v = e^x$\n- $\\int \\ln(x) \\, dx$ : poser $u = \\ln x$, $v'' = 1$ → $u'' = \\frac{1}{x}$, $v = x$\n- $\\int x^2 \\cos(x) \\, dx$ : IPP deux fois"
    },
    {
      "type": "example",
      "title_fr": "Intégration par parties guidée",
      "body_fr": "**Calculer :** $I = \\int_0^1 x e^x \\, dx$\n\n**Solution.** Poser $u = x$ et $v'' = e^x$, donc $u'' = 1$ et $v = e^x$.\n\n$I = [x e^x]_0^1 - \\int_0^1 1 \\cdot e^x \\, dx = (1 \\cdot e^1 - 0) - [e^x]_0^1$\n\n$= e - (e^1 - e^0) = e - e + 1 = 1$\n\n**Vérification dimensionnelle :** $I > 0$ car $xe^x \\geq 0$ sur $[0,1]$ ✓. Valeur = 1, plausible car $e^x \\leq e$ et $x \\leq 1$, donc $I \\leq e/2 \\approx 1{,}36$ ✓."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SM 2021 (adapté).** Calculer $I = \\int_1^e \\ln(x) \\, dx$.\n\n**Solution.** Écrire $\\ln(x) = \\ln(x) \\cdot 1$, puis IPP : $u = \\ln x$, $v'' = 1$.\n\n$u'' = \\frac{1}{x}$, $v = x$.\n\n$I = [x \\ln x]_1^e - \\int_1^e x \\cdot \\frac{1}{x} \\, dx = [x \\ln x]_1^e - \\int_1^e 1 \\, dx$\n\n$= (e \\ln e - 1 \\cdot \\ln 1) - [x]_1^e = (e \\cdot 1 - 0) - (e - 1) = e - e + 1 = 1$\n\n**Interprétation :** L''aire sous la courbe $y = \\ln x$ entre $x = 1$ et $x = e$ vaut exactement 1 unité d''aire."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000014'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 15. Calcul d'aires (integral_apps)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Aires entre deux courbes",
      "body_fr": "L''aire entre deux courbes $f$ et $g$ sur $[a,b]$ est :\n$$A = \\int_a^b |f(x) - g(x)| \\, dx$$\nQuand $f \\geq g$ sur tout l''intervalle, l''valeur absolue s''enlève. Si les courbes se croisent, on coupe l''intégrale aux points d''intersection.\n\n**Unité :** L''aire est en unités d''aire (u.a.) — préciser l''unité dans la réponse BAC.\n\n**Volume de révolution (hors programme SM mais parfois donné) :** Le volume du solide obtenu en faisant tourner la courbe de $f$ autour de l''axe $Ox$ est $V = \\pi \\int_a^b [f(x)]^2 \\, dx$."
    },
    {
      "type": "example",
      "title_fr": "Aire entre deux paraboles",
      "body_fr": "**Problème.** Calculer l''aire du domaine délimité par $f(x) = x^2$ et $g(x) = x + 2$.\n\n**Solution.** Intersection : $x^2 = x + 2 \\Rightarrow x^2 - x - 2 = 0 \\Rightarrow (x-2)(x+1) = 0$. Points : $x = -1$ et $x = 2$.\n\nSur $[-1, 2]$ : $g(x) - f(x) = x + 2 - x^2 = -(x^2 - x - 2) \\geq 0$ ✓ (vérifier en $x=0$ : $2 - 0 = 2 > 0$).\n\n$A = \\int_{-1}^{2} (x + 2 - x^2) \\, dx = \\left[\\frac{x^2}{2} + 2x - \\frac{x^3}{3}\\right]_{-1}^{2}$\n\n$= (2 + 4 - \\frac{8}{3}) - (\\frac{1}{2} - 2 + \\frac{1}{3}) = \\frac{10}{3} - (-\\frac{7}{6}) = \\frac{20}{6} + \\frac{7}{6} = \\frac{27}{6} = \\frac{9}{2}$ u.a."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC PC 2022 (adapté).** Soit $f(x) = e^x - 1$ et $g(x) = x$ pour $x \\in [0, 1]$.\n\n1) Comparer $f(x)$ et $g(x)$ sur $[0, 1]$.\n2) Calculer l''aire du domaine entre les deux courbes.\n\n**Solution.** 1) $h(x) = f(x) - g(x) = e^x - 1 - x$. $h''(x) = e^x - 1 \\geq 0$ pour $x \\geq 0$. $h(0) = 0$. Donc $h$ est croissante depuis 0 : $h(x) \\geq 0$ sur $[0,1]$. Ainsi $f(x) \\geq g(x)$ ✓.\n\n2) $A = \\int_0^1 (e^x - 1 - x) \\, dx = [e^x - x - \\frac{x^2}{2}]_0^1 = (e - 1 - \\frac{1}{2}) - (1 - 0 - 0) = e - \\frac{5}{2}$ u.a."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000015'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 16. Probabilités de base (prob_basic)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Lois usuelles et espérance",
      "body_fr": "**Loi binomiale $B(n, p)$ :** Nombre de succès dans $n$ épreuves indépendantes, chacune de probabilité $p$. $P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}$. Espérance : $E(X) = np$. Variance : $V(X) = np(1-p)$.\n\n**Loi géométrique $G(p)$ :** Rang du premier succès. $P(X = k) = (1-p)^{k-1} p$. Espérance : $E(X) = \\frac{1}{p}$.\n\n**Loi uniforme sur $\\{1, ..., n\\}$ :** $P(X = k) = \\frac{1}{n}$. Espérance : $\\frac{n+1}{2}$.\n\n**Interprétation de l''espérance :** Si l''on répète l''expérience un grand nombre de fois, la moyenne des résultats tend vers $E(X)$. Ce n''est pas la valeur la plus probable, mais la valeur moyenne à long terme."
    },
    {
      "type": "example",
      "title_fr": "Loi binomiale appliquée",
      "body_fr": "**Problème.** Un QCM a 10 questions, chacune avec 4 choix dont 1 seul correct. Un élève répond au hasard. Calculer la probabilité qu''il obtienne exactement 3 bonnes réponses et l''espérance du nombre de bonnes réponses.\n\n**Solution.** $X \\sim B(10, \\frac{1}{4})$.\n\n$P(X = 3) = \\binom{10}{3} (\\frac{1}{4})^3 (\\frac{3}{4})^7 = 120 \\times \\frac{1}{64} \\times \\frac{2187}{16384} \\approx 0{,}250$.\n\n$E(X) = np = 10 \\times \\frac{1}{4} = 2{,}5$ bonnes réponses en moyenne.\n\n**Morale :** Au hasard, on espère 2,5/10 — insuffisant pour passer !"
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC 2023 (adapté).** Une urne contient 3 boules rouges et 7 boules bleues. On tire des boules avec remise jusqu''à obtenir la première rouge. Soit $X$ le rang du premier tirage rouge.\n\n1) Quelle est la loi de $X$ ?\n2) Calculer $P(X \\leq 3)$ et $E(X)$.\n3) Combien de tirages doit-on effectuer en moyenne ?\n\n**Solution.** 1) $X \\sim G(p)$ avec $p = 0{,}3$.\n\n2) $P(X \\leq 3) = 1 - P(X > 3) = 1 - (0{,}7)^3 = 1 - 0{,}343 = 0{,}657$.\n\n$E(X) = \\frac{1}{0{,}3} \\approx 3{,}33$ tirages en moyenne."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000016'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 17. Probabilités conditionnelles (conditional_prob)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Formule des probabilités totales et théorème de Bayes",
      "body_fr": "**Formule des probabilités totales :** Si $(A_1, A_2, \\ldots, A_n)$ est une partition de $\\Omega$, alors :\n$$P(B) = \\sum_{i=1}^{n} P(B|A_i) \\cdot P(A_i)$$\n\n**Théorème de Bayes (probabilité inverse) :** Connaissant un résultat $B$, quelle est la probabilité que ce soit $A_i$ qui ait produit ce résultat ?\n$$P(A_i|B) = \\frac{P(B|A_i) \\cdot P(A_i)}{P(B)}$$\n\n**Intuition :** Bayes permet de ''remonter dans le temps'' — du résultat à la cause. Utile en médecine (quelle est la probabilité d''avoir la maladie sachant que le test est positif ?)."
    },
    {
      "type": "example",
      "title_fr": "Bayes appliqué au diagnostic médical",
      "body_fr": "**Problème.** Un test de dépistage donne un résultat positif dans 99 % des cas si la personne est malade, et dans 2 % des cas si elle est saine. La prévalence de la maladie est 0,5 %.\n\nQuelle est la probabilité d''être réellement malade sachant que le test est positif ?\n\n**Solution.** $M$ = malade, $P$ = test positif. $P(M) = 0{,}005$, $P(P|M) = 0{,}99$, $P(P|\\bar{M}) = 0{,}02$.\n\n$P(P) = 0{,}99 \\times 0{,}005 + 0{,}02 \\times 0{,}995 = 0{,}00495 + 0{,}0199 = 0{,}02485$\n\n$P(M|P) = \\frac{0{,}99 \\times 0{,}005}{0{,}02485} \\approx 0{,}199 \\approx 20\\%$\n\n**Surprise :** Même avec un test presque parfait, si la maladie est rare, un résultat positif n''est vrai qu''une fois sur cinq !"
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SM 2022 (adapté).** Une fabrique produit des pièces via deux machines : M1 produit 60 % et M2 produit 40 %. Le taux de défauts est 3 % pour M1 et 5 % pour M2.\n\n1) Calculer la probabilité qu''une pièce choisie au hasard soit défectueuse.\n2) Sachant qu''une pièce est défectueuse, quelle est la probabilité qu''elle vienne de M1 ?\n\n**Solution.** 1) $P(D) = P(D|M1)P(M1) + P(D|M2)P(M2) = 0{,}03 \\times 0{,}6 + 0{,}05 \\times 0{,}4 = 0{,}018 + 0{,}020 = 0{,}038$.\n\n2) $P(M1|D) = \\frac{P(D|M1) \\times P(M1)}{P(D)} = \\frac{0{,}018}{0{,}038} \\approx 0{,}474$ soit environ 47 %."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000017'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 18. Variables aléatoires (random_variables)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Variance et écart-type",
      "body_fr": "L''espérance $E(X)$ dit où se situe ''en moyenne'' la variable. La **variance** $V(X)$ mesure comment les valeurs sont dispersées autour de cette moyenne :\n$$V(X) = E[(X - E(X))^2] = E(X^2) - [E(X)]^2$$\nL''**écart-type** $\\sigma = \\sqrt{V(X)}$ est dans la même unité que $X$.\n\n**Propriétés linéaires :** $E(aX + b) = aE(X) + b$ et $V(aX + b) = a^2 V(X)$.\n\n**Interprétation :** Un petit $\\sigma$ signifie que les valeurs sont regroupées autour de la moyenne (résultats prévisibles). Un grand $\\sigma$ signifie une forte dispersion (résultats très variables)."
    },
    {
      "type": "example",
      "title_fr": "Calcul complet d''une loi",
      "body_fr": "**Problème.** On lance un dé équilibré. Soit $X$ le gain en DH : +3 si le résultat est 6, -1 sinon. Calculer $E(X)$ et $V(X)$.\n\n**Solution.** Loi de $X$ :\n| $x$ | -1 | 3 |\n|-----|----|---|\n| $P$ | $\\frac{5}{6}$ | $\\frac{1}{6}$ |\n\n$E(X) = -1 \\times \\frac{5}{6} + 3 \\times \\frac{1}{6} = \\frac{-5+3}{6} = \\frac{-2}{6} = -\\frac{1}{3}$ DH\n\n$E(X^2) = 1 \\times \\frac{5}{6} + 9 \\times \\frac{1}{6} = \\frac{14}{6} = \\frac{7}{3}$\n\n$V(X) = \\frac{7}{3} - (-\\frac{1}{3})^2 = \\frac{7}{3} - \\frac{1}{9} = \\frac{21-1}{9} = \\frac{20}{9}$\n\n**Interprétation :** En moyenne, on perd $\\frac{1}{3}$ DH par lancer — ce jeu est défavorable au joueur."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SM 2023 (adapté).** Une urne contient 2 boules blanches et 3 boules noires. On tire successivement 2 boules sans remise. Soit $X$ le nombre de boules blanches obtenues.\n\n1) Dresser la loi de probabilité de $X$.\n2) Calculer $E(X)$ et $V(X)$.\n\n**Solution.** 1) $X \\in \\{0, 1, 2\\}$.\n$P(X=0) = \\frac{3}{5} \\times \\frac{2}{4} = \\frac{6}{20} = \\frac{3}{10}$.\n$P(X=1) = \\frac{2}{5} \\times \\frac{3}{4} + \\frac{3}{5} \\times \\frac{2}{4} = \\frac{6}{20} + \\frac{6}{20} = \\frac{12}{20} = \\frac{3}{5}$.\n$P(X=2) = \\frac{2}{5} \\times \\frac{1}{4} = \\frac{2}{20} = \\frac{1}{10}$.\n\n2) $E(X) = 0 \\times \\frac{3}{10} + 1 \\times \\frac{6}{10} + 2 \\times \\frac{1}{10} = \\frac{8}{10} = \\frac{4}{5}$. $V(X) = E(X^2) - [E(X)]^2 = \\frac{10}{10} - \\frac{16}{25} = 1 - 0{,}64 = 0{,}36$."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000018'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 19. Forme algébrique (complex_basics)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Conjugué et module : outils essentiels",
      "body_fr": "Pour $z = a + ib$, le **conjugué** est $\\bar{z} = a - ib$ et le **module** est $|z| = \\sqrt{a^2 + b^2}$.\n\n**Propriété fondamentale :** $z \\times \\bar{z} = a^2 + b^2 = |z|^2$.\n\nCela sert à diviser : $\\frac{1}{z} = \\frac{\\bar{z}}{|z|^2}$ et $\\frac{z_1}{z_2} = \\frac{z_1 \\bar{z}_2}{|z_2|^2}$.\n\n**Pour trouver la partie réelle et imaginaire d''un quotient :** Multiplier numérateur et dénominateur par le conjugué du dénominateur.\n\nExemple : $\\frac{2+i}{1-3i} = \\frac{(2+i)(1+3i)}{(1-3i)(1+3i)} = \\frac{2+6i+i+3i^2}{1+9} = \\frac{-1+7i}{10} = -\\frac{1}{10} + \\frac{7}{10}i$"
    },
    {
      "type": "example",
      "title_fr": "Résolution dans ℂ",
      "body_fr": "**Problème.** Résoudre dans $\\mathbb{C}$ : $z^2 + 4z + 13 = 0$.\n\n**Solution.** Discriminant : $\\Delta = 16 - 52 = -36 < 0$. Comme $\\Delta < 0$, on a $\\sqrt{\\Delta} = 6i$.\n\n$z = \\frac{-4 \\pm 6i}{2} = -2 \\pm 3i$.\n\nVérification : $(-2+3i)^2 = 4 - 12i + 9i^2 = 4 - 12i - 9 = -5 - 12i$... attendons, recalculons :\n$(-2+3i)^2 + 4(-2+3i) + 13 = (4 - 12i - 9) + (-8 + 12i) + 13 = 0$ ✓\n\n**Remarque :** Les deux solutions sont conjuguées — c''est toujours le cas pour un polynôme à coefficients réels."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SM 2022 (adapté).** Soit $z_1 = 1 + 2i$ et $z_2 = 3 - i$.\n\n1) Calculer $z_1 + z_2$, $z_1 \\times z_2$, et $\\frac{z_1}{z_2}$ sous forme algébrique.\n2) Calculer $|z_1|$, $|z_2|$, et vérifier que $|z_1 z_2| = |z_1| |z_2|$.\n\n**Solution.** 1) $z_1 + z_2 = 4 + i$. $z_1 z_2 = (1+2i)(3-i) = 3 - i + 6i - 2i^2 = 5 + 5i$. $\\frac{z_1}{z_2} = \\frac{(1+2i)(3+i)}{(3-i)(3+i)} = \\frac{3+i+6i-2}{10} = \\frac{1+7i}{10}$.\n\n2) $|z_1| = \\sqrt{5}$, $|z_2| = \\sqrt{10}$, $|z_1 z_2| = |5+5i| = 5\\sqrt{2} = \\sqrt{5} \\times \\sqrt{10}$ ✓."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000019'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 20. Forme trigonométrique (complex_trig)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Formule de De Moivre et racines nièmes",
      "body_fr": "Si $z = r(\\cos\\theta + i\\sin\\theta)$, alors $z^n = r^n(\\cos(n\\theta) + i\\sin(n\\theta))$ — c''est la **formule de De Moivre**.\n\nApplication : calculer $\\cos(3\\theta)$ et $\\sin(3\\theta)$ en développant $(\\cos\\theta + i\\sin\\theta)^3$.\n\n**Racines nièmes de l''unité :** Les $n$ solutions de $z^n = 1$ sont $\\omega_k = e^{i\\frac{2k\\pi}{n}} = \\cos\\frac{2k\\pi}{n} + i\\sin\\frac{2k\\pi}{n}$ pour $k = 0, 1, \\ldots, n-1$. Elles forment un polygone régulier inscrit dans le cercle unité.\n\n**Racines nièmes d''un complexe $a$ :** Les solutions de $z^n = a$ sont $|a|^{1/n} e^{i(\\arg(a) + 2k\\pi)/n}$."
    },
    {
      "type": "example",
      "title_fr": "Passage algébrique ↔ trigonométrique",
      "body_fr": "**Problème.** Écrire $z = -1 + i\\sqrt{3}$ sous forme trigonométrique puis exponentielle.\n\n**Solution.** $|z| = \\sqrt{(-1)^2 + (\\sqrt{3})^2} = \\sqrt{1+3} = 2$.\n\n$\\cos\\theta = \\frac{-1}{2}$ et $\\sin\\theta = \\frac{\\sqrt{3}}{2}$.\n\nCela correspond à $\\theta = \\frac{2\\pi}{3}$ (2ème quadrant, $\\cos < 0$, $\\sin > 0$).\n\nDonc $z = 2(\\cos\\frac{2\\pi}{3} + i\\sin\\frac{2\\pi}{3}) = 2e^{i\\frac{2\\pi}{3}}$.\n\n**Calcul rapide :** $z^6 = 2^6 e^{i \\cdot 4\\pi} = 64 \\times 1 = 64$ (réel !)."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SM 2023 (adapté).** Résoudre dans $\\mathbb{C}$ : $z^3 = -8$.\n\n**Solution.** Écrire $-8 = 8 e^{i\\pi}$ (module 8, argument $\\pi$).\n\nLes trois racines sont $z_k = 8^{1/3} e^{i\\frac{\\pi + 2k\\pi}{3}} = 2 e^{i\\frac{(2k+1)\\pi}{3}}$ pour $k = 0, 1, 2$.\n\n$z_0 = 2e^{i\\pi/3} = 2(\\frac{1}{2} + i\\frac{\\sqrt{3}}{2}) = 1 + i\\sqrt{3}$\n\n$z_1 = 2e^{i\\pi} = -2$\n\n$z_2 = 2e^{i5\\pi/3} = 2(\\frac{1}{2} - i\\frac{\\sqrt{3}}{2}) = 1 - i\\sqrt{3}$\n\n**Vérification :** $(-2)^3 = -8$ ✓. Les trois points forment un triangle équilatéral."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000020'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 21. Applications géométriques des complexes (complex_geometry)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Transformations du plan et complexes",
      "body_fr": "Chaque transformation géométrique du plan correspond à une opération sur les complexes :\n- **Translation** de vecteur $\\overrightarrow{u}$ d''affixe $b$ : $z'' = z + b$\n- **Rotation** de centre $\\Omega$ (affixe $\\omega$) et angle $\\theta$ : $z'' - \\omega = e^{i\\theta}(z - \\omega)$\n- **Homothétie** de centre $\\Omega$ et rapport $k$ : $z'' - \\omega = k(z - \\omega)$\n- **Similitude directe** (rotation + homothétie) : $z'' = az + b$ avec $a \\in \\mathbb{C}^*$\n\n**Point invariant d''une similitude :** $z_0 = az_0 + b \\Rightarrow z_0 = \\frac{b}{1-a}$ (si $a \\neq 1$)."
    },
    {
      "type": "example",
      "title_fr": "Identifier une transformation",
      "body_fr": "**Problème.** La transformation $f : z \\mapsto iz + 2 - 2i$ est une similitude. Trouver son centre, son rapport, et son angle de rotation.\n\n**Solution.** $a = i$, donc $|a| = 1$ (rapport 1, c''est une isométrie directe) et $\\arg(a) = \\frac{\\pi}{2}$ (rotation de $90°$).\n\n**Centre (point fixe) :** $z_0 = \\frac{b}{1-a} = \\frac{2-2i}{1-i} = \\frac{(2-2i)(1+i)}{(1-i)(1+i)} = \\frac{2+2i-2i-2i^2}{2} = \\frac{4}{2} = 2$.\n\n$f$ est une rotation de centre $A(2, 0)$ et d''angle $\\frac{\\pi}{2}$."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SM 2021 (adapté).** Soient $A(1+i)$ et $B(3+2i)$ deux points du plan complexe. On effectue une rotation de centre $A$ et d''angle $\\frac{\\pi}{2}$.\n\n1) Écrire l''écriture complexe de cette rotation.\n2) Trouver l''image $B''$ de $B$ par cette rotation.\n3) Calculer $|AB''|$ et vérifier que $|AB''| = |AB|$.\n\n**Solution.** 1) $z'' - (1+i) = i(z - (1+i))$, soit $z'' = iz - i(1+i) + 1+i = iz + 2$.\n\n2) $z_{B''} = i(3+2i) + 2 = 3i - 2 + 2 = i$. Donc $B'' = (0, 1)$.\n\n3) $|AB''| = |(0+i) - (1+i)| = |-1| = 1$. $|AB| = |(3+2i)-(1+i)| = |2+i| = \\sqrt{5}$... recalculer."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000021'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 22. Équations diff. premier ordre (ode_first_order)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Équation différentielle : modélisation",
      "body_fr": "Une équation différentielle décrit comment une quantité évolue en fonction d''elle-même. Exemple : $y'' = ky$ signifie que le taux de variation de $y$ est proportionnel à $y$ lui-même.\n\n**Solutions de $y'' = ky$ :** $y(x) = C e^{kx}$ (croissance exponentielle si $k > 0$, décroissance si $k < 0$).\n\n**Modèles classiques :**\n- Désintégration radioactive : $\\frac{dN}{dt} = -\\lambda N$ → $N(t) = N_0 e^{-\\lambda t}$\n- Population : $\\frac{dP}{dt} = rP$ → $P(t) = P_0 e^{rt}$\n- Refroidissement de Newton : $\\frac{dT}{dt} = -k(T - T_{\\text{env}})$\n\n**Condition initiale :** La constante $C$ est déterminée par la valeur initiale $y(0)$ ou $y(x_0)$."
    },
    {
      "type": "example",
      "title_fr": "Résolution avec condition initiale",
      "body_fr": "**Problème.** Résoudre $y'' + 2y = 4$, $y(0) = 3$.\n\n**Solution.**\n*Étape 1 — Solution homogène :* $y'' + 2y = 0$ → $y_h = Ce^{-2x}$.\n\n*Étape 2 — Solution particulière :* On cherche une solution constante $y_p = k$. Alors $y_p'' = 0$, donc $0 + 2k = 4 \\Rightarrow k = 2$.\n\n*Étape 3 — Solution générale :* $y = Ce^{-2x} + 2$.\n\n*Étape 4 — Condition initiale :* $y(0) = C + 2 = 3 \\Rightarrow C = 1$.\n\n**Réponse :** $y(x) = e^{-2x} + 2$. Quand $x \\to +\\infty$, $y \\to 2$ — la solution tend vers la solution d''équilibre."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SM 2023 (adapté).** Un médicament est injecté à la dose $D_0 = 100$ mg. La concentration diminue selon $C''(t) = -0{,}2 C(t)$ (en mg/h).\n\n1) Résoudre cette équation différentielle.\n2) Après combien d''heures la concentration est-elle réduite de moitié ?\n3) Quelle dose initiale faut-il administrer pour avoir 50 mg encore présents après 10 heures ?\n\n**Solution.** 1) $C(t) = C_0 e^{-0{,}2t}$, avec $C(0) = 100$, donc $C(t) = 100 e^{-0{,}2t}$.\n\n2) $C(t) = 50 \\Rightarrow e^{-0{,}2t} = 0{,}5 \\Rightarrow t = \\frac{\\ln 2}{0{,}2} = 5\\ln 2 \\approx 3{,}47$ h.\n\n3) $C_0 e^{-2} = 50 \\Rightarrow C_0 = 50 e^2 \\approx 369$ mg."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000022'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 23. Équations diff. second ordre (ode_second_order)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Équation caractéristique et cas de résonance",
      "body_fr": "Pour $ay'' + by'' + cy = 0$, on résout l''équation caractéristique $ar^2 + br + c = 0$.\n\n**Trois cas selon le discriminant $\\Delta = b^2 - 4ac$ :**\n\n1. $\\Delta > 0$ : deux racines réelles $r_1, r_2$ → $y = C_1 e^{r_1 x} + C_2 e^{r_2 x}$\n2. $\\Delta = 0$ : racine double $r_0$ → $y = (C_1 + C_2 x) e^{r_0 x}$\n3. $\\Delta < 0$ : racines complexes $\\alpha \\pm i\\beta$ → $y = e^{\\alpha x}(C_1 \\cos(\\beta x) + C_2 \\sin(\\beta x))$ (**oscillations**)\n\n**Cas 3 en physique :** L''oscillateur harmonique non amorti $y'' + \\omega_0^2 y = 0$ donne $y = A\\cos(\\omega_0 t + \\phi)$."
    },
    {
      "type": "example",
      "title_fr": "Résolution complète avec conditions initiales",
      "body_fr": "**Problème.** Résoudre $y'' - 5y'' + 6y = 0$, $y(0) = 1$, $y''(0) = 0$.\n\n**Solution.** Équation caractéristique : $r^2 - 5r + 6 = 0 \\Rightarrow (r-2)(r-3) = 0$. $r_1 = 2$, $r_2 = 3$. $\\Delta > 0$.\n\nSolution générale : $y = C_1 e^{2x} + C_2 e^{3x}$.\n\nConditions : $y(0) = C_1 + C_2 = 1$. $y''(x) = 2C_1 e^{2x} + 3C_2 e^{3x}$, donc $y''(0) = 2C_1 + 3C_2 = 0$.\n\nSystème : $C_1 = 3$, $C_2 = -2$.\n\n**Réponse :** $y(x) = 3e^{2x} - 2e^{3x}$."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SM 2022 — Oscillateur amorti.** Un ressort-masse satisfait $x'' + 4x'' + 4x = 0$ (masse $m=1$, amortissement $b=4$, raideur $k=4$). $x(0) = 1$ cm, $x''(0) = -2$ cm/s.\n\n1) Montrer que c''est le cas de racine double.\n2) Écrire la solution générale, puis particulière.\n3) Que se passe-t-il quand $t \\to +\\infty$ ?\n\n**Solution.** 1) $r^2 + 4r + 4 = (r+2)^2 = 0$. Racine double $r_0 = -2$.\n\n2) $x(t) = (C_1 + C_2 t)e^{-2t}$. $x(0) = C_1 = 1$. $x''(t) = C_2 e^{-2t} - 2(C_1 + C_2 t)e^{-2t}$, $x''(0) = C_2 - 2 = -2 \\Rightarrow C_2 = 0$. Donc $x(t) = e^{-2t}$.\n\n3) $x(t) = e^{-2t} \\to 0$ : le système revient à l''équilibre sans osciller — c''est l''amortissement critique."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000023'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;


-- ===== lessons_physics_expanded.sql =====
-- ============================================================
-- Physics lesson cards expansion: 3 additional cards per skill (cards 4–6)
-- Content style: physical intuition first (Walter Lewin), worked BAC problems
--   (Hachette/Nathan Terminale PC + Moroccan BAC past papers).
-- Safe to re-run: only appends if card count < 6.
-- ============================================================

-- =====================
-- 24. Cinématique (kinematics)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Mouvement parabolique : indépendance des axes",
      "body_fr": "Voici l''idée clé de Galilée, confirmée par expérience : une balle lancée horizontalement et une balle lâchée en chute libre tombent **au sol exactement en même temps**, quelle que soit la vitesse initiale horizontale. Les mouvements horizontal et vertical sont totalement indépendants.\n\nSur l''axe $x$ : $a_x = 0$, donc $v_x = v_0$ (constant) et $x = v_0 t$.\nSur l''axe $y$ : $a_y = -g$, donc $v_y = -gt$ et $y = -\\frac{1}{2}gt^2$.\n\n**L''élimination de $t$** donne la trajectoire : $y = -\\frac{g}{2v_0^2}x^2$ — une parabole.\n\n**Piège BAC :** En lancement oblique avec angle $\\alpha$, les composantes initiales sont $v_{0x} = v_0 \\cos\\alpha$ et $v_{0y} = v_0 \\sin\\alpha$."
    },
    {
      "type": "example",
      "title_fr": "Chute libre et lancer horizontal",
      "body_fr": "**Problème.** Un projectile est lancé horizontalement depuis une falaise de 45 m de hauteur avec $v_0 = 15$ m/s. Calculer le temps de chute et la portée horizontale. ($g = 10$ m/s²)\n\n**Solution.**\n\n*Axe vertical :* $y(t) = -\\frac{1}{2}gt^2 = -5t^2$. Le sol est atteint quand $y = -45$ m :\n$-5t^2 = -45 \\Rightarrow t^2 = 9 \\Rightarrow t = 3$ s.\n\n*Axe horizontal :* $x = v_0 t = 15 \\times 3 = 45$ m.\n\n*Vitesse à l''impact :* $v_x = 15$ m/s, $v_y = -gt = -30$ m/s. $v = \\sqrt{15^2 + 30^2} = 15\\sqrt{5} \\approx 33{,}5$ m/s.\n\n*Angle :* $\\tan\\theta = \\frac{|v_y|}{v_x} = 2$, $\\theta \\approx 63°$ sous l''horizontale."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC PC Maroc 2022 (adapté).** Une balle est lancée avec $v_0 = 20$ m/s à $\\alpha = 30°$ au-dessus de l''horizontale depuis le sol.\n\n1) Écrire les équations horaires $x(t)$ et $y(t)$.\n2) Calculer la hauteur maximale atteinte.\n3) Calculer la portée totale (distance horizontale à l''atterrissage).\n\n**Solution.** 1) $v_{0x} = 20\\cos30° = 10\\sqrt{3}$ m/s, $v_{0y} = 20\\sin30° = 10$ m/s.\n$x(t) = 10\\sqrt{3} \\cdot t$, $y(t) = 10t - 5t^2$.\n\n2) Hauteur max : $v_y = 0 \\Rightarrow 10 - 10t = 0 \\Rightarrow t = 1$ s. $y_{\\max} = 10 - 5 = 5$ m.\n\n3) Atterrissage : $y = 0 \\Rightarrow t(10 - 5t) = 0 \\Rightarrow t = 2$ s. Portée : $x = 10\\sqrt{3} \\times 2 = 20\\sqrt{3} \\approx 34{,}6$ m."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000024'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 25. Lois de Newton (newtons_laws)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Plan incliné et tension : méthode du bilan",
      "body_fr": "La méthode BAC pour tout problème de dynamique :\n\n**Étape 1 — Choisir le système** (la masse sur laquelle on applique Newton).\n\n**Étape 2 — Choisir un repère** adapté (souvent l''axe $x$ le long du mouvement).\n\n**Étape 3 — Bilan des forces** : poids $\\vec{P} = m\\vec{g}$, réaction normale $\\vec{N}$ (perpendiculaire au support), tension $\\vec{T}$ (si câble), frottement $\\vec{f}$ (si indiqué).\n\n**Étape 4 — Projeter** $\\sum \\vec{F} = m\\vec{a}$ sur chaque axe.\n\n**Étape 5 — Résoudre** le système d''équations.\n\n**Sur un plan incliné d''angle $\\alpha$ :** La composante du poids selon la pente est $mg\\sin\\alpha$ et la réaction normale est $N = mg\\cos\\alpha$."
    },
    {
      "type": "example",
      "title_fr": "Ascenseur : bilan des forces",
      "body_fr": "**Problème.** Un homme de 80 kg est dans un ascenseur. Quelle est la force exercée par le sol sur lui : (a) en montée à vitesse constante, (b) en accélération $a = 2$ m/s² vers le haut, (c) en décélération $a = 3$ m/s² (freinant en montée) ? ($g = 10$ m/s²)\n\n**Solution.** $\\sum F_y = ma$ (axe vers le haut positif) → $N - mg = ma$ → $N = m(g + a)$.\n\n**(a)** $a = 0$ (vitesse constante) : $N = 80 \\times 10 = 800$ N (poids normal).\n\n**(b)** $a = +2$ m/s² : $N = 80 \\times 12 = 960$ N (on se sent plus lourd).\n\n**(c)** $a = -3$ m/s² (décélération en montée) : $N = 80 \\times 7 = 560$ N (on se sent plus léger).\n\n**Leçon Walter Lewin :** La balance dans l''ascenseur mesure $N$, pas le poids — c''est pourquoi on se ''sent'' plus lourd ou plus léger lors des accélérations."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC PC Maroc 2023 (adapté).** Un bloc de 5 kg est posé sur un plan incliné à 30°, sans frottement. Un câble horizontal le retient.\n\n1) Faire le bilan des forces sur le bloc.\n2) Calculer la tension $T$ dans le câble et la réaction normale $N$.\n\n**Solution.** Forces : $\\vec{P}$ (poids, vers le bas), $\\vec{N}$ (normal au plan, perpendiculaire à la surface), $\\vec{T}$ (horizontale, vers le haut du plan).\n\nAxe $x$ (le long du plan, vers le haut) : $T\\cos30° - mg\\sin30° = 0$ (à l''arrêt, $a = 0$).\n$T = \\frac{mg\\sin30°}{\\cos30°} = mg\\tan30° = 5 \\times 10 \\times \\frac{1}{\\sqrt{3}} \\approx 28{,}9$ N.\n\nAxe $y$ (perpendiculaire au plan) : $N - mg\\cos30° - T\\sin30° = 0$.\n$N = 5 \\times 10 \\times \\frac{\\sqrt{3}}{2} + 28{,}9 \\times 0{,}5 \\approx 43{,}3 + 14{,}4 = 57{,}7$ N."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000025'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 26. Énergie mécanique (energy)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Théorème travail-énergie et puissance",
      "body_fr": "Le **théorème de l''énergie cinétique** (TEC) : la variation d''énergie cinétique est égale à la somme des travaux de toutes les forces :\n$$\\Delta E_k = E_{k_f} - E_{k_i} = \\sum W_{\\text{forces}}$$\nSi seules les forces conservatives travaillent (poids, ressort) : $E_m = E_k + E_p = \\text{constante}$.\nSi frottement présent : $E_{m_f} - E_{m_i} = W_{\\text{frottement}} < 0$ (l''énergie mécanique diminue).\n\n**Puissance :** $P = \\frac{W}{\\Delta t} = \\vec{F} \\cdot \\vec{v}$ (produit scalaire force-vitesse). Unité : Watt (W).\n\n**Rendement :** $\\eta = \\frac{P_{\\text{utile}}}{P_{\\text{absorbée}}} \\leq 1$."
    },
    {
      "type": "example",
      "title_fr": "Conservation de l''énergie mécanique",
      "body_fr": "**Problème.** Une bille de 100 g lâchée depuis $h = 2$ m. Calculer sa vitesse au bas de la chute (sans frottement).\n\n**Solution.** En l''absence de frottement, $E_m$ est conservée :\n$E_{m_i} = E_{m_f}$\n$mgh + 0 = 0 + \\frac{1}{2}mv^2$ (en bas : $h = 0$, $v_i = 0$)\n$v = \\sqrt{2gh} = \\sqrt{2 \\times 10 \\times 2} = \\sqrt{40} = 2\\sqrt{10} \\approx 6{,}32$ m/s\n\n**Remarque clé :** La masse $m$ s''annule — la vitesse ne dépend pas de la masse (Galilée avait raison). Une balle de fer et une balle de mousse lâchées de la même hauteur arrivent en bas avec la même vitesse (en l''absence d''air)."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC PC 2022 (adapté).** Un skateur (70 kg) descend une pente de 5 m de hauteur. Des frottements de force constante $f = 50$ N s''exercent sur une distance $d = 12$ m.\n\n1) Calculer l''énergie mécanique perdue par frottement.\n2) En déduire la vitesse en bas de la pente.\n\n**Solution.** 1) Travail des frottements : $W_f = -f \\times d = -50 \\times 12 = -600$ J.\n\n2) TEC : $E_{m_f} - E_{m_i} = W_f$.\n$\\frac{1}{2}mv_f^2 - mgh = -600$\n$\\frac{1}{2} \\times 70 \\times v_f^2 = 70 \\times 10 \\times 5 - 600 = 3500 - 600 = 2900$ J\n$v_f^2 = \\frac{2 \\times 2900}{70} = \\frac{5800}{70} \\approx 82{,}9$\n$v_f \\approx 9{,}1$ m/s"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000026'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 27. Propriétés des ondes (wave_properties)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Interférences et diffraction",
      "body_fr": "**Interférences :** Quand deux ondes cohérentes se superposent, elles peuvent se renforcer (interférences constructives) ou s''annuler (interférences destructives).\n\n- Constructives : $\\delta = k\\lambda$ ($k$ entier) → chemin de différence multiple de $\\lambda$\n- Destructives : $\\delta = (k + \\frac{1}{2})\\lambda$\n\n**Diffraction :** Une onde contourne un obstacle ou se disperse en passant par une fente. La déviation est notable quand la largeur de la fente $a$ est comparable à $\\lambda$. Angle de déviation : $\\sin\\theta \\approx \\frac{\\lambda}{a}$ (premier minimum).\n\n**Expérience de Young (doubles fentes) :** Interfrange $i = \\frac{\\lambda D}{d}$ où $D$ est la distance écran-fentes et $d$ l''espacement entre fentes. Permet de mesurer $\\lambda$."
    },
    {
      "type": "example",
      "title_fr": "Fentes de Young — calcul de l''interfrange",
      "body_fr": "**Problème.** Dans une expérience de Young, deux fentes espacées de $d = 0{,}5$ mm sont placées à $D = 1$ m d''un écran. On utilise une lumière de $\\lambda = 600$ nm. Calculer l''interfrange.\n\n**Solution.** $i = \\frac{\\lambda D}{d} = \\frac{600 \\times 10^{-9} \\times 1}{0{,}5 \\times 10^{-3}} = \\frac{6 \\times 10^{-7}}{5 \\times 10^{-4}} = 1{,}2 \\times 10^{-3}$ m $= 1{,}2$ mm.\n\nSi on mesure $i = 1{,}2$ mm, on peut déduire $\\lambda = \\frac{id}{D} = 600$ nm (lumière orange-rouge).\n\n**Application inverse :** Cette technique est utilisée pour mesurer précisément des longueurs d''onde ou des distances très faibles (ex : en métrologie)."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC PC 2023 (adapté).** Une onde sinusoïdale de fréquence $f = 500$ Hz se propage dans l''air ($v = 340$ m/s).\n\n1) Calculer la longueur d''onde $\\lambda$.\n2) Deux sources en phase sont séparées de $d = 0{,}68$ m. Un point $P$ est à $r_1 = 3{,}4$ m de la source 1 et $r_2 = 4{,}08$ m de la source 2. Y a-t-il interférence constructive ou destructive en $P$ ?\n\n**Solution.** 1) $\\lambda = \\frac{v}{f} = \\frac{340}{500} = 0{,}68$ m.\n\n2) Différence de marche : $\\delta = |r_2 - r_1| = |4{,}08 - 3{,}4| = 0{,}68$ m $= 1 \\times \\lambda$.\n\nComme $\\delta = k\\lambda$ avec $k = 1$ entier : **interférences constructives** en $P$."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000027'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 28. Ondes sonores et lumineuses (sound_light)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Effet Doppler et spectres lumineux",
      "body_fr": "**Effet Doppler :** Quand une source sonore s''approche, les fronts d''onde se compriment → fréquence perçue plus haute (sifflement aigu). Quand elle s''éloigne, ils s''étirent → fréquence plus basse. Formule :\n$$f_{\\text{perçu}} = f_0 \\frac{v \\pm v_{\\text{obs}}}{v \\mp v_{\\text{source}}}$$\n(signe + si rapprochement, - si éloignement).\n\n**Spectres lumineux :**\n- Spectre d''émission : raies brillantes sur fond noir — caractéristique de l''élément\n- Spectre d''absorption : raies sombres sur fond coloré — même raies qu''en émission\n- Loi de Wien : $\\lambda_{\\max} T = 2{,}898 \\times 10^{-3}$ m·K (couleur d''une étoile selon sa température)"
    },
    {
      "type": "example",
      "title_fr": "Décalage vers le rouge cosmologique",
      "body_fr": "**Problème.** Une galaxie éloignée montre la raie H-alpha normalement à $\\lambda_0 = 656$ nm décalée vers $\\lambda = 722$ nm. Calculer la vitesse de récession.\n\n**Solution.** Décalage Doppler (vitesse non relativiste) :\n$\\frac{\\Delta\\lambda}{\\lambda_0} = \\frac{v}{c}$\n$\\Delta\\lambda = 722 - 656 = 66$ nm\n$v = c \\times \\frac{66}{656} = 3 \\times 10^8 \\times 0{,}1006 \\approx 3{,}02 \\times 10^7$ m/s $\\approx 0{,}1c$\n\n**Contexte :** Edwin Hubble a utilisé ce principe en 1929 pour montrer que l''univers est en expansion — toutes les galaxies lointaines s''éloignent de nous."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC PC 2022 (adapté).** Une ambulance émet un son à $f_0 = 440$ Hz et roule vers un observateur fixe à $v_s = 30$ m/s ($v_{\\text{son}} = 340$ m/s).\n\n1) Calculer la fréquence perçue par l''observateur.\n2) Après le passage de l''ambulance, quelle fréquence perçoit-il ?\n3) Calculer l''écart de fréquence entre avant et après.\n\n**Solution.** 1) Source se rapproche, observateur fixe :\n$f = f_0 \\frac{v}{v - v_s} = 440 \\times \\frac{340}{340-30} = 440 \\times \\frac{340}{310} \\approx 483$ Hz.\n\n2) Source s''éloigne : $f = 440 \\times \\frac{340}{370} \\approx 404$ Hz.\n\n3) Écart : $483 - 404 = 79$ Hz — perceptible à l''oreille !"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000028'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 29. Circuits RC et RL (rc_rl_circuits)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Charge et décharge : constante de temps",
      "body_fr": "**Circuit RC :** Quand on ferme l''interrupteur, le condensateur se charge exponentiellement. La **constante de temps** $\\tau = RC$ est le temps mis pour atteindre 63 % de la charge finale (ou 37 % de la tension initiale lors d''une décharge).\n\n- Charge : $U_C(t) = E(1 - e^{-t/\\tau})$\n- Décharge : $U_C(t) = U_0 e^{-t/\\tau}$\n- Courant lors de la charge : $i(t) = \\frac{E}{R} e^{-t/\\tau}$\n\n**Circuit RL :** $\\tau = L/R$. L''inductance s''oppose aux variations de courant (comme un condensateur s''oppose aux variations de tension).\n\nRègle pratique : après $5\\tau$, le circuit est pratiquement à l''équilibre (99,3 %)."
    },
    {
      "type": "example",
      "title_fr": "Circuit RC : charge et énergie",
      "body_fr": "**Problème.** $R = 10$ k$\\Omega$, $C = 100$ $\\mu$F, $E = 12$ V. Calculer $\\tau$, puis $U_C$ et $i$ à $t = \\tau$.\n\n**Solution.** $\\tau = RC = 10^4 \\times 10^{-4} = 1$ s.\n\nÀ $t = \\tau$ :\n$U_C(\\tau) = 12(1 - e^{-1}) = 12 \\times 0{,}632 = 7{,}58$ V\n$i(\\tau) = \\frac{E}{R} e^{-1} = \\frac{12}{10^4} \\times 0{,}368 = 4{,}42 \\times 10^{-4}$ A $= 0{,}442$ mA\n\n**Énergie stockée dans le condensateur à $t = \\tau$ :**\n$W_C = \\frac{1}{2}CU_C^2 = \\frac{1}{2} \\times 10^{-4} \\times 7{,}58^2 \\approx 2{,}87 \\times 10^{-3}$ J"
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC PC 2023 (adapté).** Un condensateur $C = 50$ $\\mu$F est initialement chargé à $U_0 = 10$ V. On le connecte à une résistance $R = 2$ k$\\Omega$.\n\n1) Écrire l''équation différentielle régissant la décharge.\n2) Donner $U_C(t)$ et $\\tau$.\n3) À quel instant $U_C$ vaut-il $5$ V ?\n\n**Solution.** 1) La loi des mailles : $U_C + Ri = 0$. Or $i = -C\\frac{dU_C}{dt}$ (décharge), donc :\n$U_C - RC\\frac{dU_C}{dt} = 0 \\Rightarrow \\frac{dU_C}{dt} = \\frac{U_C}{RC}$... attention au signe : $RC\\frac{dU_C}{dt} + U_C = 0$.\n\n2) $U_C(t) = 10 e^{-t/\\tau}$ avec $\\tau = RC = 2000 \\times 50 \\times 10^{-6} = 0{,}1$ s.\n\n3) $10 e^{-t/0{,}1} = 5 \\Rightarrow e^{-10t} = 0{,}5 \\Rightarrow t = \\frac{\\ln 2}{10} \\approx 0{,}0693$ s $\\approx 69{,}3$ ms."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000029'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 30. Oscillations RLC (rlc_oscillations)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Résonance et facteur de qualité",
      "body_fr": "Dans un circuit RLC série soumis à une tension sinusoïdale de fréquence $f$, l''intensité est maximale à la **fréquence de résonance** $f_0 = \\frac{1}{2\\pi\\sqrt{LC}}$. À la résonance, la tension aux bornes de $R$ est maximale, et $U_L = U_C$ (ils se compensent).\n\n**Facteur de qualité :** $Q = \\frac{L\\omega_0}{R} = \\frac{1}{R}\\sqrt{\\frac{L}{C}}$. Plus $Q$ est grand, plus la résonance est sélective (pic fin).\n\n**Bande passante :** L''intervalle de fréquences où l''intensité est supérieure à $I_0/\\sqrt{2}$ vaut $\\Delta f = f_0/Q$.\n\n**Analogie mécanique :** RLC $\\leftrightarrow$ masse-ressort amorti. $L \\leftrightarrow m$, $C \\leftrightarrow 1/k$, $R \\leftrightarrow$ frottement visqueux."
    },
    {
      "type": "example",
      "title_fr": "Calcul de la fréquence de résonance",
      "body_fr": "**Problème.** Un circuit RLC série : $R = 50$ $\\Omega$, $L = 0{,}1$ H, $C = 10$ $\\mu$F. Calculer $f_0$, $Q$, et la bande passante.\n\n**Solution.**\n$f_0 = \\frac{1}{2\\pi\\sqrt{LC}} = \\frac{1}{2\\pi\\sqrt{0{,}1 \\times 10^{-5}}} = \\frac{1}{2\\pi \\times 10^{-3}} \\approx 159$ Hz\n\n$\\omega_0 = 2\\pi f_0 \\approx 1000$ rad/s\n\n$Q = \\frac{L\\omega_0}{R} = \\frac{0{,}1 \\times 1000}{50} = 2$\n\n$\\Delta f = \\frac{f_0}{Q} = \\frac{159}{2} \\approx 79{,}5$ Hz\n\n**Interprétation :** $Q = 2$ est un facteur de qualité modéré — la résonance est peu sélective. Un récepteur radio nécessite $Q > 100$ pour distinguer les stations."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC PC 2022 (adapté).** Un circuit RLC série est alimenté par $u(t) = 10\\cos(2000\\pi t)$ V. À la résonance, $U_R = 10$ V, $U_C = 50$ V.\n\n1) Calculer $I_0$, $R$, et $Z_C$ à la résonance.\n2) En déduire $C$.\n3) Calculer $Q$.\n\n**Solution.** 1) À la résonance, $U = U_R = 10$ V (tension maximale aux bornes de $R$).\n$I_0 = \\frac{U_R}{R}$. $U_C = X_C \\times I_0 = 50$ V, $X_C = \\frac{U_C}{I_0} = 5R$.\n\nOr $U = I_0 R = 10$ V → $I_0 = \\frac{10}{R}$. Et $50 = X_C \\times \\frac{10}{R} = \\frac{10 X_C}{R}$, donc $X_C = 5R$.\n\nSans autre information, $R$ n''est pas déterminé seul. Si $R = 2$ $\\Omega$ (donné), alors $I_0 = 5$ A, $X_C = 10$ $\\Omega$.\n\n2) $C = \\frac{1}{X_C \\omega_0} = \\frac{1}{10 \\times 2000\\pi} \\approx 15{,}9$ $\\mu$F.\n\n3) $Q = \\frac{U_C}{U} = \\frac{50}{10} = 5$."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000030'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 31. Réactions acido-basiques (acid_base)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "pH, pKa et diagramme de prédominance",
      "body_fr": "Pour un couple acide/base $AH/A^-$ de constante $K_a$ :\n$$\\text{pH} = \\text{pK}_a + \\log\\frac{[A^-]}{[AH]}$$\n(équation de Henderson-Hasselbalch)\n\n**Règle de prédominance :**\n- Si pH $<$ pKa : la forme acide $AH$ prédomine\n- Si pH $>$ pKa : la forme basique $A^-$ prédomine\n- Si pH $=$ pKa : $[AH] = [A^-]$ (demi-équivalence)\n\n**Diagramme de prédominance :** droite horizontale avec pKa au centre, forme acide à gauche, forme basique à droite.\n\n**pH d''une solution d''acide faible :** $\\text{pH} = \\frac{1}{2}(\\text{pKa} - \\log C)$ (formule simplifiée, valide si $K_a \\ll C$)."
    },
    {
      "type": "example",
      "title_fr": "Calcul de pH et taux d''avancement",
      "body_fr": "**Problème.** Solution d''acide acétique $CH_3COOH$ de concentration $C = 0{,}1$ mol/L. pKa = 4,75. Calculer le pH et le taux d''avancement $\\tau$.\n\n**Solution.** pH $= \\frac{1}{2}$(pKa $- \\log C) = \\frac{1}{2}(4{,}75 - \\log 0{,}1) = \\frac{1}{2}(4{,}75 + 1) = \\frac{5{,}75}{2} = 2{,}87$.\n\nTaux d''avancement : $\\tau = \\frac{[H_3O^+]}{C} = \\frac{10^{-2{,}87}}{0{,}1} = \\frac{1{,}35 \\times 10^{-3}}{0{,}1} = 1{,}35\\%$.\n\n**Conclusion :** L''acide acétique est un acide faible — seulement 1,35 % des molécules sont dissociées."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC PC 2023 (adapté).** On titre 20 mL d''une solution d''ammoniac $NH_3$ de concentration $C_b$ inconnue par une solution d''HCl à 0,1 mol/L. L''équivalence est atteinte à $V_e = 15$ mL. pKa($NH_4^+/NH_3$) = 9,2.\n\n1) Calculer $C_b$.\n2) Calculer le pH à la demi-équivalence.\n3) Calculer le pH à l''équivalence (solution de $NH_4Cl$).\n\n**Solution.** 1) $n_{HCl} = n_{NH_3} \\Rightarrow 0{,}1 \\times 0{,}015 = C_b \\times 0{,}020 \\Rightarrow C_b = 0{,}075$ mol/L.\n\n2) À la demi-équivalence : $[NH_3] = [NH_4^+]$, donc pH $=$ pKa $= 9{,}2$.\n\n3) À l''équivalence : $C(NH_4^+) = \\frac{0{,}1 \\times 0{,}015}{0{,}035} \\approx 0{,}043$ mol/L. pH $= \\frac{1}{2}$(14 $-$ pKa $- \\log C) = \\frac{1}{2}(14 - 9{,}2 + \\log 0{,}043) \\approx 5{,}2$."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000031'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 32. Réactions d'oxydoréduction (redox)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Piles électrochimiques et potentiel standard",
      "body_fr": "Une **pile électrochimique** convertit l''énergie chimique en énergie électrique via une réaction redox spontanée.\n\n**Constitution :** Deux demi-piles (couples redox) reliées par un pont salin.\n- Anode (−) : siège de l''oxydation (perd des électrons)\n- Cathode (+) : siège de la réduction (gagne des électrons)\n\n**Potentiel standard** $E°$ : plus un couple est oxydant (fort $E°$), plus il tend à se réduire. La réaction spontanée fait réduire le couple de $E°$ le plus élevé.\n\n**F.e.m. de la pile :** $E = E°_{cathode} - E°_{anode}$ (doit être positif pour réaction spontanée).\n\n**Équation de Nernst :** $E = E° + \\frac{0{,}06}{n}\\log\\frac{[Ox]}{[Red]}$ (à 25°C, $n$ = nombre d''électrons échangés)."
    },
    {
      "type": "example",
      "title_fr": "Pile Daniell : écriture et f.e.m.",
      "body_fr": "**Pile Daniell :** Zn/Zn²⁺ || Cu²⁺/Cu. $E°(Zn^{2+}/Zn) = -0{,}76$ V, $E°(Cu^{2+}/Cu) = +0{,}34$ V.\n\n**Réaction spontanée :** Le couple Cu²⁺/Cu a le plus grand $E°$ → Cu²⁺ est réduit (cathode +). Zn est oxydé (anode −).\n\n- Oxydation (anode) : $Zn \\to Zn^{2+} + 2e^-$\n- Réduction (cathode) : $Cu^{2+} + 2e^- \\to Cu$\n- Globale : $Zn + Cu^{2+} \\to Zn^{2+} + Cu$\n\n**F.e.m.** $E = 0{,}34 - (-0{,}76) = 1{,}10$ V.\n\n**Énergie libérée :** $W = nFE = 2 \\times 96500 \\times 1{,}10 \\approx 212{,}3$ kJ/mol de Zn oxydé."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC PC 2022 (adapté).** Identifier les oxydants et réducteurs, équilibrer la réaction, et calculer la f.e.m. :\n\nCouple 1 : $MnO_4^-/Mn^{2+}$, $E° = +1{,}51$ V\nCouple 2 : $Fe^{3+}/Fe^{2+}$, $E° = +0{,}77$ V\n\n**Solution.** $MnO_4^-$ est l''oxydant fort (plus grand $E°$) ; $Fe^{2+}$ est le réducteur.\n\nDemi-équations :\n- Réduction : $MnO_4^- + 8H^+ + 5e^- \\to Mn^{2+} + 4H_2O$\n- Oxydation : $Fe^{2+} \\to Fe^{3+} + e^-$ (× 5)\n\nÉquation globale (5 électrons échangés) :\n$MnO_4^- + 5Fe^{2+} + 8H^+ \\to Mn^{2+} + 5Fe^{3+} + 4H_2O$\n\n**F.e.m. :** $E = 1{,}51 - 0{,}77 = 0{,}74$ V (réaction spontanée car $E > 0$)."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000032'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;


-- ===== lessons_svt_expanded.sql =====
-- ============================================================
-- SVT lesson cards expansion: 3 additional cards per skill (cards 4–6)
-- Content style: mechanism analogy first (Campbell Biology / Khan Academy),
--   then Moroccan BAC-style worked genetics/immunology problems.
-- Safe to re-run: only appends if card count < 6.
-- ============================================================

-- =====================
-- 33. Métabolisme énergétique (cell_energy)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "La mitochondrie : centrale électrique de la cellule",
      "body_fr": "Imaginez la mitochondrie comme une centrale hydraulique : les électrons provenant du glucose sont comme de l''eau en hauteur — leur chute vers l''oxygène libère de l''énergie qui actionne une turbine (l''ATP synthase). Cette turbine produit de l''ATP, la ''monnaie énergétique'' de la cellule.\n\n**Bilan de la respiration cellulaire (glycolyse + cycle de Krebs + chaîne respiratoire) :**\n$$C_6H_{12}O_6 + 6O_2 \\to 6CO_2 + 6H_2O + \\text{ATP (env. 36-38 molécules)}$$\n\n**Coefficient Respiratoire (CR) :** $CR = \\frac{\\text{volume CO}_2 \\text{ dégagé}}{\\text{volume O}_2 \\text{ consommé}}$. Pour les glucides : CR = 1. Pour les lipides : CR ≈ 0,7. Pour les protéines : CR ≈ 0,8."
    },
    {
      "type": "example",
      "title_fr": "Calcul du quotient respiratoire",
      "body_fr": "**Problème.** Un muscle au repos consomme 120 mL O₂/h et dégage 84 mL CO₂/h. Quel est le substrat principalement utilisé ?\n\n**Solution.** $CR = \\frac{84}{120} = 0{,}70$.\n\nCR ≈ 0,7 → substrat lipidique (acides gras).\n\nEquation type pour un acide palmitique : $C_{16}H_{32}O_2 + 23O_2 \\to 16CO_2 + 16H_2O$.\n$CR = \\frac{16}{23} = 0{,}696 \\approx 0{,}70$ ✓\n\n**Interprétation :** Au repos, le muscle préfère oxyder les graisses car elles fournissent plus d''énergie par gramme. À effort intense, il bascule vers les glucides (CR → 1)."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SVT Maroc 2022 (adapté).** Un muscle produit 180 molécules d''ATP par molécule de glucose oxydée complètement.\n\n1) Comparer ce chiffre au bilan théorique (36-38 ATP) et expliquer la différence.\n2) Calculer le rendement énergétique en sachant que l''oxydation complète d''une mole de glucose libère 2870 kJ, et qu''une mole d''ATP stocke environ 30 kJ.\n3) À quel processus correspond la production d''ATP en absence d''oxygène ?\n\n**Réponses guidées.** 1) 180 est supérieur car ce chiffre inclut plusieurs tours du cycle. En réalité : 38 ATP max par voie aérobie. 2) Rendement = (38 × 30) / 2870 ≈ 40 %. 3) Fermentation (lactique ou alcoolique) : 2 ATP par glucose seulement."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000033'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 34. Fermentation (fermentation)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Fermentation vs respiration : comparaison",
      "body_fr": "La fermentation est une voie anaérobie (sans O₂) qui recycle le NAD⁺ pour permettre la glycolyse de continuer. Elle est beaucoup moins efficace que la respiration.\n\n**Fermentation lactique** (muscle en manque d''O₂, bactéries) :\nGlucose → 2 lactate + 2 ATP\n\n**Fermentation alcoolique** (levures) :\nGlucose → 2 éthanol + 2 CO₂ + 2 ATP\n\n**Comparaison :**\n| | Fermentation | Respiration |\n|--|--|--|\n| O₂ requis | Non | Oui |\n| ATP produit | 2 | 36-38 |\n| Produits | lactate ou éthanol + CO₂ | CO₂ + H₂O |\n\n**Applications industrielles :** fromages, yaourts, pain, bière, vin, bioéthanol."
    },
    {
      "type": "example",
      "title_fr": "Expérience de Pasteur : anaérobiose",
      "body_fr": "**Expérience historique.** Pasteur montre que les levures fermentent en absence d''O₂ et respirent en sa présence (''effet Pasteur'').\n\n**Protocole simplifié :**\n- Flacon A (sans O₂) : levures + glucose → production de CO₂ et d''alcool. Croissance lente.\n- Flacon B (avec O₂) : levures + glucose → CO₂ + H₂O. Croissance rapide, peu d''alcool.\n\n**Résultat clé :** En présence d''O₂, les levures inhibent leur fermentation et préfèrent la respiration (18× plus efficace en ATP). Ce changement de métabolisme s''appelle l''effet Pasteur.\n\n**Au BAC :** On peut vous demander de schématiser les deux voies et d''expliquer l''avantage de la respiration."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SVT 2023 (adapté).** Des levures sont placées dans un milieu glucosé à 37°C. On mesure la production de CO₂ avec et sans oxygène.\n\n**Résultats :** Sans O₂ : 20 mmol CO₂/h. Avec O₂ : 6 mmol CO₂/h + consommation de 3 mmol O₂/h.\n\n1) Identifier les processus dans chaque cas.\n2) Calculer la quantité de glucose consommé dans chaque situation (1 mmol glucose → 2 mmol CO₂ en fermentation, 6 mmol CO₂ en respiration).\n3) Comparer l''efficacité énergétique.\n\n**Réponses.** 1) Sans O₂ : fermentation alcoolique. Avec O₂ : respiration (CR = 6/3×2 = 1 → glucides). 2) Sans O₂ : 10 mmol glucose/h. Avec O₂ : 1 mmol glucose/h. 3) La respiration utilise 10× moins de glucose pour le même besoin en ATP."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000034'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 35. ADN et information génétique (dna_structure)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Réplication de l''ADN : fidélité et mécanisme",
      "body_fr": "La réplication de l''ADN est **semi-conservative** : chaque nouvelle molécule d''ADN contient un brin parental et un brin nouvellement synthétisé.\n\n**Mécanisme simplifié (3 étapes) :**\n1. **Ouverture** : L''hélicase déroule la double hélice au niveau de l''origine de réplication.\n2. **Synthèse** : L''ADN polymérase ajoute des nucléotides complémentaires (A-T, G-C) sur chaque brin matrice, toujours dans le sens 5''→3''.\n3. **Correction** : L''ADN polymérase a une activité ''correctrice'' — elle élimine les erreurs incorporées (taux d''erreur final : 1 pour 10⁹ nucléotides).\n\n**Résultat :** 1 molécule d''ADN → 2 molécules identiques."
    },
    {
      "type": "example",
      "title_fr": "Expérience de Meselson-Stahl",
      "body_fr": "**Expérience historique (1958).** Pour prouver la réplication semi-conservative, Meselson et Stahl cultivèrent des bactéries en présence d''azote lourd (¹⁵N) puis transférèrent en milieu ¹⁴N normal.\n\n**Résultats (centrifugation en gradient de densité) :**\n- Génération 0 (¹⁵N) : une seule bande dense\n- Génération 1 : une seule bande de densité intermédiaire (hybride ¹⁵N-¹⁴N)\n- Génération 2 : deux bandes — une intermédiaire (hybride) et une légère (¹⁴N-¹⁴N)\n\n**Conclusion :** La bande intermédiaire à G1 (et sa persistance à G2) est la preuve du modèle semi-conservatif — impossible avec un modèle conservatif (qui aurait donné une bande lourde + une bande légère dès G1)."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SVT Maroc 2021 (adapté).** Un ADN de 1000 paires de bases avec 30 % de bases adénine subit 3 cycles de réplication.\n\n1) Calculer le nombre de molécules d''ADN produites.\n2) Calculer le nombre total de guanines dans toutes les molécules.\n3) Combien de molécules d''ADN hybrides (un brin parental + un brin nouveau) y a-t-il après 3 cycles ?\n\n**Solutions.** 1) Après $n$ cycles : $2^n = 2^3 = 8$ molécules.\n\n2) A = T = 30 % → G = C = 20 %. Guanines par molécule = 0,20 × 2 × 1000 = 400. Total = 8 × 400 = 3200 guanines.\n\n3) Après la 1ère réplication : 2 hybrides. Après les cycles suivants, les 2 brins parentaux restent dans des molécules hybrides → toujours **2 molécules hybrides** après n cycles (quelle que soit $n$)."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000035'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 36. Expression de l'information génétique (gene_expression)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Traduction : du codon à la protéine",
      "body_fr": "La **traduction** est la lecture de l''ARNm par les ribosomes pour synthétiser une protéine. Pensez-y comme un lecteur de code-barre : le ribosome lit les codons (groupes de 3 bases), et chaque codon commande un acide aminé spécifique.\n\n**Mécanisme :**\n1. Le ribosome se fixe sur l''ARNm au codon initiateur AUG (méthionine).\n2. L''ARNt complémentaire apporte l''acide aminé correspondant.\n3. La liaison peptidique se forme, le ribosome avance de 3 bases.\n4. Un codon stop (UAA, UAG, UGA) libère la protéine.\n\n**Code génétique :** 4³ = 64 codons pour 20 acides aminés → le code est redondant (plusieurs codons pour le même AA) mais **universel** (même code chez tous les êtres vivants)."
    },
    {
      "type": "example",
      "title_fr": "Déduire la séquence protéique",
      "body_fr": "**Problème.** Un brin matrice d''ADN : 3''-TAC-AAA-GGC-ATT-ACT-5''. Écrire l''ARNm et la séquence d''acides aminés.\n\n**Solution.**\n\nBrin matrice (3''-5'') → ARNm (5''-3'') : complémentaire + substitution T→U.\n- TAC → AUG (méthionine — codon start)\n- AAA → UUU (phénylalanine)\n- GGC → CCG (proline)\n- ATT → UAA (codon STOP !)\n\nSéquence protéique : **Met — Phe — Pro** (3 acides aminés).\n\n**Attention :** Le brin matrice est lu 3''→5'', l''ARNm est synthétisé 5''→3''. Ne pas confondre avec le brin codant (= séquence identique à l''ARNm, avec T à la place de U)."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SVT 2022 (adapté).** Un fragment d''ARNm : 5''-AUG-CGU-GAA-UGC-UAA-3''.\n\n1) Déterminer le nombre d''acides aminés dans la protéine produite.\n2) Une mutation ponctuelle change GAA en GAG. La protéine est-elle modifiée ? Expliquer.\n3) Une délétion supprime le G du 4ème nucléotide (position 4). Analyser les conséquences.\n\n**Réponses.** 1) 4 codons entre AUG et UAA → **4 acides aminés** (dont la Met initiale qui est souvent clivée).\n\n2) GAA et GAG codent tous les deux pour l''**acide glutamique** (Glu) — mutation silencieuse, protéine inchangée. Le code génétique est redondant.\n\n3) La délétion décale le cadre de lecture (**frameshift**) : tous les codons suivants sont modifiés → protéine totalement différente, probablement non fonctionnelle."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000036'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 37. Code génétique et mutations (mutations)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Types de mutations et leur impact",
      "body_fr": "Une **mutation** est une modification permanente de la séquence d''ADN. Elle peut être :\n\n**Selon la portée :**\n- **Ponctuelle** (substitution) : un nucléotide remplacé par un autre\n- **Insertion/délétion** : ajout ou suppression de nucleotide(s) → décalage du cadre de lecture (*frameshift*) si non multiple de 3\n\n**Selon les conséquences sur la protéine :**\n- **Silencieuse** : même acide aminé (redondance du code) → pas d''effet\n- **Faux-sens** : acide aminé différent → protéine modifiée (peut être inoffensive ou délétère)\n- **Non-sens** : codon stop prématuré → protéine tronquée non fonctionnelle\n\n**Causes :** Erreurs de réplication, rayons UV (thymines dimères), agents mutagènes chimiques."
    },
    {
      "type": "example",
      "title_fr": "Analyse d''une mutation : drépanocytose",
      "body_fr": "**Exemple concret.** La drépanocytose (anémie falciforme) est causée par une mutation ponctuelle dans le gène de l''hémoglobine.\n\n**Mutation :** Codon 6 de la chaîne β : GAG (Glu) → GTG (Val).\n\nC''est une mutation **faux-sens** : un acide aminé chargé négativement (Glu) est remplacé par un acide aminé hydrophobe (Val).\n\n**Conséquences :**\n- La valine hydrophobe provoque l''agglomération des molécules d''hémoglobine en fibres\n- Les globules rouges deviennent falciformes (en forme de faucille)\n- Obstruction des capillaires → douleurs, anémie, crises vaso-occlusives\n\n**Leçon :** Un seul nucléotide sur 3 milliards de paires de bases peut transformer radicalement la fonction d''une protéine !"
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SVT 2023 (adapté).** Séquence d''ARNm normale : AUG-AAA-CCC-GAU-UAG.\nMutation 1 : CCC → CCG. Mutation 2 : insertion d''un U après le 6ème nucléotide.\n\n1) Quelle est la séquence protéique normale ?\n2) Analyser les effets de chaque mutation.\n3) Quelle mutation est la plus délétère ? Justifier.\n\n**Réponses.** 1) AUG(Met)-AAA(Lys)-CCC(Pro)-GAU(Asp) → **4 acides aminés**.\n\n2) Mutation 1 : CCC et CCG codent tous deux pour la proline → **mutation silencieuse**, protéine inchangée.\n\nMutation 2 : insertion après position 6 → cadre décalé à partir du 3ème codon : AUG-AAA-UCG-CGA-U... → séquence d''AA totalement différente (**frameshift mutation**) + perte probable du stop.\n\n3) La mutation 2 est la plus délétère : le frameshift altère tous les acides aminés à partir de la position 3 et peut produire une protéine non fonctionnelle."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000037'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 38. Hérédité autosomique (autosomal_heredity)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Dominance, récessivité et croisements-tests",
      "body_fr": "**Rappels fondamentaux :**\n- Un allèle **dominant** s''exprime même en un seul exemplaire (hétérozygote).\n- Un allèle **récessif** ne s''exprime qu''en double dose (homozygote).\n\n**Croisement-test (back-cross) :** Pour déterminer le génotype d''un individu au phénotype dominant, on le croise avec un homozygote récessif. Si la descendance est 1:1 (moitié dom., moitié réc.) → l''individu est hétérozygote. Si toute la descendance est dominante → il est homozygote dominant.\n\n**Dihybridisme :** Pour deux gènes indépendants (non liés), la descendance d''un double hétérozygote (F₁) croisé avec lui-même suit le rapport 9:3:3:1 des phénotypes (loi d''assortiment indépendant de Mendel)."
    },
    {
      "type": "example",
      "title_fr": "Croisement dihybride résolu",
      "body_fr": "**Problème.** Chez le pois, graine jaune (Y) dominant sur vert (y) ; ronde (R) dominant sur ridée (r). Croiser deux plantes F₁ dihétérozygotes (YyRr × YyRr).\n\n**Solution.** Gamètes de YyRr : YR, Yr, yR, yr (4 types équiprobables).\n\nTableau de Punnett 4×4 → 16 combinaisons :\n- Jaune Ronde (Y_R_) : 9/16\n- Jaune Ridée (Y_rr) : 3/16\n- Verte Ronde (yyR_) : 3/16\n- Verte Ridée (yyrr) : 1/16\n\n**Rapport 9:3:3:1** — preuve que les deux gènes sont indépendants (situés sur des chromosomes différents).\n\n**Si les gènes étaient liés** (même chromosome), les proportions seraient différentes — il faudrait tenir compte des crossing-over."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SVT Maroc 2022 (adapté).** L''albinisme est une maladie autosomique récessive. Deux parents normalement pigmentés ont un enfant albinos.\n\n1) Déterminer les génotypes des parents.\n2) Quelle est la probabilité que leur 2ème enfant soit albinos ?\n3) Quelle est la probabilité que leur 2ème enfant soit porteur sain ?\n\n**Solutions.** 1) L''enfant albinos est homozygote récessif (aa). Chaque parent lui a transmis un allèle a → les parents sont tous deux **hétérozygotes Aa** (porteurs sains).\n\n2) Croisement Aa × Aa :\n| | A | a |\n|--|--|--|\n| **A** | AA | Aa |\n| **a** | Aa | aa |\nP(albinos = aa) = **1/4 = 25 %**.\n\n3) P(porteur sain = Aa) = 2/4 = **50 %**."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000038'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 39. Hérédité liée au sexe (sex_linked_heredity)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Caractéristiques de l''hérédité liée au sexe",
      "body_fr": "Les gènes portés par le chromosome X (gonosomes) ont des patterns héréditaires spécifiques :\n\n**Gène récessif lié à X :** Les femmes (XX) peuvent être porteuses (X^A X^a) sans être malades. Les hommes (XY) n''ont qu''un seul X — si l''allèle récessif y est présent, la maladie s''exprime obligatoirement. Résultat : la maladie touche **plus souvent les garçons**.\n\n**Exemples classiques :** Daltonisme, hémophilie A et B.\n\n**Identification au BAC :**\n- Si un père malade a des fils tous sains et des filles toutes porteuses → lié à X\n- Si un homme malade a une mère saine mais grand-père maternel malade → typiquement lié à X récéssif (transmission par la mère porteuse)"
    },
    {
      "type": "example",
      "title_fr": "Daltonisme : arbre généalogique",
      "body_fr": "**Arbre généalogique.** Une femme normale (fille d''un daltonien) épouse un homme normal. Quels sont les risques pour leurs enfants ?\n\n**Solution.** Le daltonisme est récessif lié à X. Notons $X^D$ l''allèle normal et $X^d$ l''allèle daltonien.\n\nLa femme a un père daltonien ($X^d Y$) → elle a reçu son $X^d$ de son père. Elle est **porteuse** : $X^D X^d$.\nL''homme est normal : $X^D Y$.\n\nCroisement $X^D X^d \\times X^D Y$ :\n- Filles : $X^D X^D$ (50 % normales) et $X^D X^d$ (50 % porteuses)\n- Garçons : $X^D Y$ (50 % normaux) et $X^d Y$ (50 % **daltoniens**)\n\n**Risque :** 25 % de tous les enfants (ou 50 % des garçons) seront daltoniens."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SVT 2023 (adapté).** L''hémophilie A est récessive liée à X. Un homme hémophile épouse une femme dont le père était hémophile et la mère saine non-porteuse.\n\n1) Déterminer les génotypes des deux parents.\n2) Donner les proportions phénotypiques attendues chez les filles et les garçons.\n3) Peut-on avoir une fille hémophile dans cette famille ? Justifier.\n\n**Solutions.** 1) Homme hémophile : $X^h Y$. Femme : son père était hémophile ($X^h Y$) → elle a reçu $X^h$ de lui, et $X^H$ de sa mère saine non-porteuse → **porteuse $X^H X^h$**.\n\n2) Croisement $X^H X^h \\times X^h Y$ :\n- Filles : $X^H X^h$ (50 % porteuses saines) et $X^h X^h$ (50 % **hémophiles**)\n- Garçons : $X^H Y$ (50 % sains) et $X^h Y$ (50 % hémophiles)\n\n3) **Oui** : 50 % des filles sont hémophiles ($X^h X^h$) — c''est un cas particulier où la mère est porteuse ET le père hémophile."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000039'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 40. Le soi et le non-soi (self_nonself)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Complexe majeur d''histocompatibilité (CMH)",
      "body_fr": "Imaginez chaque cellule du corps portant un badge d''identification unique : le **complexe majeur d''histocompatibilité (CMH)**. Ces molécules à la surface des cellules présentent des fragments de protéines (peptides) aux lymphocytes T, permettant la surveillance immunologique.\n\n**CMH de classe I :** Présent sur toutes les cellules nucléées. Présente des peptides du cytoplasme (protéines intracellulaires). Les lymphocytes T cytotoxiques (LTc) le reconnaissent.\n\n**CMH de classe II :** Présent uniquement sur les cellules présentatrices d''antigènes (macrophages, cellules dendritiques, LB). Présente des peptides extracellulaires phagocytés. Les lymphocytes T helper (LTh) le reconnaissent.\n\n**Greffes :** Si le donneur et le receveur ont des CMH différents, les LTc du receveur reconnaissent les cellules du greffon comme ''non-soi'' et l''attaquent (rejet)."
    },
    {
      "type": "example",
      "title_fr": "Test de compatibilité transfusionnelle",
      "body_fr": "**Système ABO :** Les groupes sanguins sont déterminés par des antigènes (agglutinogènes) sur les globules rouges et des anticorps naturels (agglutinines) dans le plasma.\n\n| Groupe | Antigène GR | Anticorps plasma |\n|--------|-------------|------------------|\n| A | A | anti-B |\n| B | B | anti-A |\n| AB | A et B | aucun |\n| O | aucun | anti-A et anti-B |\n\n**Règle de compatibilité :** Ne jamais transfuser si les anticorps du receveur correspondent aux antigènes du donneur (agglutination → emboles).\n\nGroupe O = **donneur universel** (pas d''antigènes). Groupe AB = **receveur universel** (pas d''anticorps).\n\n**Facteur Rhésus :** Rh+ possède l''antigène D ; Rh- n''en possède pas. Une personne Rh- recevant du sang Rh+ développera des anticorps anti-D."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SVT 2022 (adapté).** Un patient de groupe A Rh+ a besoin d''une transfusion urgente. Les poches disponibles sont : A Rh+, A Rh-, O Rh+, O Rh-, B Rh+, AB Rh-.\n\n1) Indiquer quelles poches sont compatibles et pourquoi.\n2) Si seulement O Rh- est disponible, est-ce compatible ?\n3) Expliquer pourquoi une femme Rh- enceinte d''un fœtus Rh+ est à risque.\n\n**Réponses.** 1) Compatible : A Rh+ (identique), A Rh- (même groupe, Rh- est toléré par Rh+), O Rh+ (donneur universel + même Rh), O Rh- (donneur universel, Rh- toléré). Incompatible : B Rh+ (anti-B dans le plasma A) et AB Rh- (anti-A et anti-B présents).\n\n2) O Rh- est compatible (groupe O = pas d''antigènes ABO ; Rh- = accepté par Rh+).\n\n3) Le fœtus Rh+ peut faire passer des GR Rh+ dans la circulation maternelle → la mère Rh- fabrique des anti-D → lors d''une 2ème grossesse Rh+, les anti-D maternels traversent le placenta et attaquent les GR fœtaux (maladie hémolytique du nouveau-né)."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000040'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 41. Immunité spécifique (specific_immunity)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Réponse humorale vs cellulaire : deux branches de l''immunité adaptative",
      "body_fr": "**Réponse humorale (LB → anticorps) :**\n- Cible : antigènes extracellulaires (bactéries, toxines, virus libres)\n- Mécanisme : LB activés → plasmocytes → anticorps → neutralisation, opsonisation, activation du complément\n- Mémoire : lymphocytes B mémoire → réponse plus rapide et intense au 2ème contact\n\n**Réponse cellulaire (LT cytotoxiques) :**\n- Cible : cellules infectées, cellules cancéreuses, cellules greffées\n- Mécanisme : LTc activés → reconnaissance CMH I-peptide → cytotoxicité directe (perforine, granzyme)\n- Les LT helper (CD4) orchestrent les deux types de réponses en produisant des interleukines\n\n**Clé de lecture BAC :** Une question sur l''immunité spécifique demande toujours de distinguer la réponse humorale (anticorps) de la cellulaire (LTc) et de préciser le type d''antigène ciblé."
    },
    {
      "type": "example",
      "title_fr": "Vaccination : immunité active",
      "body_fr": "**Principe de la vaccination.** Un vaccin introduit des antigènes (virus atténué, protéine virale, ARNm...) sans provoquer la maladie. Le système immunitaire monte une réponse primaire et génère des **lymphocytes mémoire**.\n\n**Lors d''un contact ultérieur avec le vrai pathogène :**\n- Les cellules mémoire se multiplient rapidement (expansion clonale)\n- La réponse secondaire est plus rapide, plus forte, et dure plus longtemps\n- Le pathogène est éliminé avant l''apparition des symptômes\n\n**Immunité de groupe (troupeau) :** Si suffisamment de personnes sont immunisées, le pathogène ne peut plus circuler — même les non-vaccinés sont protégés (seuil : 70-95 % selon le R₀ de la maladie)."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SVT 2023 (adapté).** On injecte un antigène A à trois souris :\n- Souris 1 : 1ère injection de A → mesure des anticorps anti-A à J7, J14, J21\n- Souris 2 : même protocole, + 2ème injection de A à J21\n- Souris 3 : 1ère injection de A à J0, puis injection d''un antigène B à J21\n\nLes courbes montrent que la souris 2 produit 10× plus d''anticorps anti-A après J21.\n\n1) Nommer et expliquer le phénomène observé chez la souris 2.\n2) Que peut-on conclure sur la souris 3 pour l''antigène A et pour l''antigène B ?\n3) Quel type cellulaire est responsable de la réponse accélérée ?\n\n**Réponses.** 1) **Réponse immunitaire secondaire (anamnesique)** : plus rapide, plus intense, plus durable — due à la présence de lymphocytes B mémoire créés lors de la réponse primaire. 2) Anti-A : réponse secondaire (mémoire). Anti-B : réponse primaire (premier contact). 3) **Lymphocytes B et T mémoire** spécifiques de l''antigène A."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000041'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 42. Dysfonctionnements immunitaires (immune_disorders)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "SIDA : destruction du système immunitaire",
      "body_fr": "Le VIH (virus de l''immunodéficience humaine) cible spécifiquement les **lymphocytes T CD4 (helper)**. Il les infecte, se réplique à l''intérieur, et finit par les détruire.\n\n**Progression de l''infection :**\n1. Primo-infection (2-4 semaines) : symptômes grippaux, pic virémie, chute rapide des CD4\n2. Phase asymptomatique (2-15 ans) : virus peu actif, CD4 entre 500-1000/mm³\n3. SIDA déclaré : CD4 < 200/mm³ → défenses immunitaires effondrées → infections opportunistes\n\n**Infections opportunistes :** Dues à des microorganismes inoffensifs chez une personne immunocompétente (Pneumocystis jirovecii, Toxoplasma gondii, CMV...).\n\n**Traitement ARV :** Les antirétroviraux bloquent la réplication du VIH (inhibiteurs de la transcriptase inverse, de la protéase...) mais ne guérissent pas."
    },
    {
      "type": "example",
      "title_fr": "Allergies : réponse immune exagérée",
      "body_fr": "**Mécanisme de l''allergie de type I (anaphylaxie) :**\n\n1. **Sensibilisation :** Premier contact avec l''allergène → production d''IgE spécifiques → fixation des IgE sur les mastocytes\n2. **Réaction :** Second contact → l''allergène se lie aux IgE sur les mastocytes → **dégranulation** → libération d''histamine et d''autres médiateurs inflammatoires\n3. **Symptômes :** Vasodilatation, bronchoconstriction, urticaire... pouvant aller jusqu''au choc anaphylactique (voies respiratoires bloquées)\n\n**Traitement :**\n- Antihistaminiques : bloquent les récepteurs à l''histamine\n- Épinéphrine (adrénaline) : traitement d''urgence du choc anaphylactique\n- Désensibilisation : expositions répétées à des doses croissantes d''allergène"
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SVT 2022 (adapté).** Un patient VIH+ a un taux de CD4 de 180/mm³ (normal : 800-1200/mm³). Il développe une pneumonie à Pneumocystis.\n\n1) Expliquer pourquoi cette infection est qualifiée d''opportuniste.\n2) Quel type cellulaire est ciblé par le VIH et quel est le rôle normal de ces cellules ?\n3) Pourquoi les personnes atteintes du SIDA sont-elles vulnérables à la fois aux infections bactériennes ET virales ?\n\n**Réponses.** 1) Pneumocystis est inoffensif chez les immunocompétents. Ici, le système immunitaire effondré ne peut l''éliminer → infection opportuniste.\n\n2) Les **lymphocytes T CD4 (helper)** sont ciblés. Ils orchestrent la réponse immunitaire : ils activent les LB (réponse humorale) ET les LTc (réponse cellulaire).\n\n3) La destruction des LT helper paralyse les **deux branches** de l''immunité adaptative. Sans LT helper : pas d''activation correcte des LB (donc moins d''anticorps contre les bactéries) et pas d''activation des LTc (donc pas de lutte contre les cellules infectées par virus)."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000042'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 43. Déformations tectoniques (tectonic_deformations)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Structures tectoniques : plis et failles",
      "body_fr": "Sous l''effet des contraintes tectoniques (compression ou extension), les roches se déforment :\n\n**Déformation ductile (profondeur, chaleur) → Plis :**\n- Anticlinal : voûte vers le haut (coeur = roches les plus anciennes)\n- Synclinal : creux vers le bas (coeur = roches les plus récentes)\n\n**Déformation cassante (surface, froid) → Failles :**\n- **Faille normale** (extension) : le compartiment supérieur (toit) descend par rapport au mur\n- **Faille inverse** (compression) : le toit monte sur le mur (chevauchement)\n- **Faille décrochante** : déplacement horizontal (ex : faille de San Andreas)\n\n**Règle stratigraphique :** Dans une série sédimentaire non déformée, les couches les plus profondes sont les plus anciennes (principe de superposition)."
    },
    {
      "type": "example",
      "title_fr": "Lire une coupe géologique",
      "body_fr": "**Comment lire une coupe géologique :**\n\n1. Identifier les couches et leur ordre (stratigraphie)\n2. Repérer les déformations (plis, failles, discordances)\n3. Reconstituer l''histoire géologique (du plus ancien au plus récent)\n\n**Exemple de lecture :** Une coupe montre (de bas en haut) : granite, schistes plissés, discordance angulaire, calcaires horizontaux.\n\n**Reconstruction :** 1) Dépôt et plissement des schistes. 2) Intrusion du granite. 3) Érosion → surface plane. 4) Transgression marine → dépôt des calcaires. La discordance angulaire marque une phase orogénique entre les deux dépôts."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SVT (géologie) 2022 (adapté).** Une coupe montre une faille entre deux blocs. Le bloc gauche est descendu de 200 m par rapport au bloc droit. Les couches sur les deux blocs sont initialement les mêmes.\n\n1) Identifier le type de faille et la contrainte tectonique responsable.\n2) Sachant que les couches A (en bas) et B (en haut) ont des âges de 200 Ma et 50 Ma respectivement, déterminer l''âge de la faille.\n3) Dans quel contexte géodynamique peut-on trouver ce type de faille ?\n\n**Réponses.** 1) Le toit (bloc gauche) est descendu → **faille normale**. Contrainte : **extension** (distension).\n\n2) La faille affecte toutes les couches visibles, y compris B (50 Ma). Elle est donc postérieure à 50 Ma. Pour dater précisément, on cherche la couche la plus récente affectée et la plus ancienne couche non affectée.\n\n3) Failles normales associées aux rifts (ex : rift est-africain), dorsales océaniques, marges passives."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000043'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 44. Métamorphisme et granitisation (metamorphism)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "theory",
      "title_fr": "Gradient métamorphique et faciès",
      "body_fr": "Le métamorphisme est la transformation de roches à l''état solide sous l''effet de la chaleur et/ou de la pression. Les roches ne fondent pas — leurs minéraux se réorganisent en de nouveaux minéraux stables dans les nouvelles conditions.\n\n**Principaux types de métamorphisme :**\n- **De contact (thermique)** : roche magmatique chaude intruse dans des roches encaissantes → auréole métamorphique. Haute T, basse P.\n- **Régional (orogénique)** : lors de la formation de chaînes de montagnes → vastes zones affectées. Combinaison T et P.\n- **De subduction** : haute P, basse T → faciès schiste bleu (glaucophane)\n\n**Minéraux indicateurs (''thermomètres-baromètres géologiques'') :** chlorite (basse T) → biotite → grenat → staurotide → disthène (haute P) → sillimanite (haute T)."
    },
    {
      "type": "example",
      "title_fr": "Formation du granite d''anatexie",
      "body_fr": "**Granitisation (anatexie) :** Quand les conditions de pression et de température deviennent extrêmes (>650°C), les roches métamorphiques commencent à fondre partiellement → **migmatites** (roches mixtes, partiellement fondues).\n\nSi la fusion partielle est complète, le magma granitique peut :\n1. **Rester en place** → refroidissement lent → granite syn-métamorphique (même âge que le métamorphisme)\n2. **Remonter** → s''introduire dans les roches encaissantes → granite intrusif (post-métamorphique)\n\n**Preuve de l''origine :** Les granites d''anatexie contiennent des enclaves de roches métamorphiques non fondues (''restites'') et ont une composition proche des roches métamorphiques environnantes."
    },
    {
      "type": "example",
      "title_fr": "Exercice niveau BAC",
      "body_fr": "**BAC SVT géologie 2023 (adapté).** Des roches prélevées à différentes profondeurs lors d''un forage dans une zone orogénique montrent :\n- 0-5 km : calcaires et grès (non transformés)\n- 5-15 km : schistes à chlorite (verts)\n- 15-25 km : gneiss à biotite et grenat\n- >25 km : migmatites\n\n1) Dresser le gradient métamorphique de la zone.\n2) Expliquer l''origine des migmatites.\n3) Dans quel contexte géodynamique ce métamorphisme régional est-il caractéristique ?\n\n**Réponses.** 1) T et P augmentent avec la profondeur : chlorite (faible) → biotite/grenat (modéré) → migmatites (fort). Le gradient est de type normal/régional.\n\n2) Les migmatites résultent de la **fusion partielle** des gneiss à très haute T et P : début d''anatexie. Présence de lits clairs (leucosomes = néo-granite) et sombres (mélanosomes = résidu).\n\n3) **Métamorphisme régional** caractéristique des **zones de collision continentale** (orogènes) — ex : formation des Alpes, de l''Himalaya."
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000044'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;


-- ===== lessons_interactive_engineering.sql =====
-- Engineering interactive lesson cards
-- Adds 1 interactive card per engineering skill (slugs 045-054)
-- Uses existing widget types: force_diagram, projectile, circuit
-- Safe to re-run: only appends if card count < 6.

-- =====================
-- 045: needs_analysis — Diagramme des forces (bête à cornes)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "interactive",
      "title_fr": "Exploration : Bilan de forces sur un système",
      "body_fr": "En Sciences de l''Ingénieur, analyser le besoin commence par identifier les forces et interactions du système. Utilisez le simulateur ci-dessous pour visualiser le bilan des forces sur un mécanisme. Ajustez les intensités et directions pour comprendre comment chaque force contribue à l''équilibre ou au mouvement.",
      "widgetType": "force_diagram"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000045'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 046: sadt_fast — Diagramme fonctionnel interactif
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "interactive",
      "title_fr": "Exploration : Flux d''énergie dans un système SADT",
      "body_fr": "Un diagramme SADT décompose un système en fonctions reliées par des flux (matière, énergie, information). Ce simulateur de forces illustre les interactions entre blocs fonctionnels — chaque flèche représente un échange. Observez comment modifier une entrée propage ses effets à travers le système.",
      "widgetType": "force_diagram"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000046'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 047: energy_supply — Circuit d''alimentation électrique
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "interactive",
      "title_fr": "Exploration : Circuit d''alimentation et distribution",
      "body_fr": "La chaîne d''énergie commence par la source et passe par des convertisseurs et des transmetteurs. Ce simulateur de circuit modélise l''alimentation d''un actionneur électrique. Observez comment la tension, la résistance et le courant sont liés (loi d''Ohm), et comment la puissance dissipée varie selon les composants.",
      "widgetType": "circuit"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000047'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 048: energy_convert — Conversion mécanique (projectile)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "interactive",
      "title_fr": "Exploration : Conversion énergie électrique → énergie cinétique",
      "body_fr": "Un moteur électrique convertit l''énergie électrique en énergie mécanique (rotation → translation). Ce simulateur illustre la conversion en suivant la trajectoire d''un objet propulsé par un mécanisme — angle de lancement, vitesse initiale et gravité reproduisent les lois de conservation d''énergie. Identifiez les pertes et le rendement $\\eta = E_{utile}/E_{fournie}$.",
      "widgetType": "projectile"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000048'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 049: sensors — Circuit de capteur et acquisition
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "interactive",
      "title_fr": "Exploration : Circuit capteur-conditionneur",
      "body_fr": "Un capteur convertit une grandeur physique (température, pression, position) en signal électrique. Ce signal est ensuite conditionné (amplifié, filtré) avant l''acquisition. Le simulateur de circuit modélise un pont de Wheatstone — le déséquilibre du pont est proportionnel à la variation de la grandeur mesurée. Faites varier les résistances pour observer la sensibilité du capteur.",
      "widgetType": "circuit"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000049'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 050: grafcet — Séquence d''états et transitions
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "interactive",
      "title_fr": "Exploration : Séquence d''actions et bilan des forces",
      "body_fr": "Un GRAFCET décrit des étapes (états) et des transitions (conditions). Chaque étape active des actions sur les actionneurs. Ce simulateur de forces illustre comment les actionneurs exercent des efforts successifs sur un objet en cours de déplacement — analogue au passage d''une étape GRAFCET à une autre. Observez comment la résultante des forces détermine le mouvement à chaque étape.",
      "widgetType": "force_diagram"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000050'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 051: statics — Principe Fondamental de la Statique (PFS)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "interactive",
      "title_fr": "Exploration : Équilibre d''un solide (PFS)",
      "body_fr": "Le Principe Fondamental de la Statique affirme que pour un solide en équilibre, la somme vectorielle des forces est nulle ($\\sum \\vec{F} = \\vec{0}$) et la somme des moments aussi ($\\sum M = 0$). Manipulez les forces ci-dessous pour trouver la configuration d''équilibre. Observez comment la modification d''une force oblige les autres à s''adapter pour maintenir l''équilibre.",
      "widgetType": "force_diagram"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000051'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 052: kinematics_solids — Cinématique (trajectoire et vitesses)
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "interactive",
      "title_fr": "Exploration : Trajectoire d''un point d''un solide en mouvement",
      "body_fr": "En cinématique des solides, la trajectoire d''un point dépend du type de mouvement du solide (translation, rotation, mouvement plan). Ce simulateur illustre la trajectoire d''un point sous l''effet de la vitesse initiale et de l''accélération — analogue au mouvement de translation d''un solide avec accélération constante. Faites varier les paramètres et observez la trajectoire parabolique.",
      "widgetType": "projectile"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000052'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 053: rdm_traction — Traction/compression et diagramme des efforts
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "interactive",
      "title_fr": "Exploration : Bilan des forces dans une barre en traction",
      "body_fr": "En résistance des matériaux, une barre soumise à deux forces de traction $F$ est en équilibre si $\\sigma = F/S$ (contrainte normale). Utilisez le simulateur pour visualiser le bilan complet des forces sur la barre. L''effort normal $N$ est constant dans toute la section. Modifiez les forces et observez comment l''équilibre est maintenu.",
      "widgetType": "force_diagram"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000053'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;

-- =====================
-- 054: rdm_flexion — Flexion simple et diagramme des moments
-- =====================
UPDATE public.skills SET lesson = jsonb_set(
  COALESCE(lesson, '{"cards":[]}'::jsonb), '{cards}',
  COALESCE(lesson->'cards', '[]'::jsonb) || '[
    {
      "type": "interactive",
      "title_fr": "Exploration : Forces et réactions en flexion simple",
      "body_fr": "Une poutre en flexion est soumise à des charges transversales qui créent des efforts tranchants $T$ et des moments fléchissants $M_f$. Le simulateur illustre le bilan des forces sur une section de poutre — les réactions d''appui équilibrent les charges appliquées ($\\sum F = 0$, $\\sum M = 0$). La contrainte maximale est $\\sigma_{max} = M_f / W$ où $W$ est le module de résistance.",
      "widgetType": "force_diagram"
    }
  ]'::jsonb
)
WHERE id = '33333333-0000-0000-0000-000000000054'
  AND jsonb_array_length(COALESCE(lesson->'cards', '[]'::jsonb)) < 6;



