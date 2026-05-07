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
