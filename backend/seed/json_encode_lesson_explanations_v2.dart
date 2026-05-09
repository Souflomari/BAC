// Phase 3 encoder: surgical expansion of LessonV2 checkpoint explanations and
// try-it solutions. Emits two migrations (025 SMA, 026 SMB) that patch only
// the explanation_fr / hint_fr / solution_fr fields inside skills.lesson via
// PL/pgSQL helper functions — without re-emitting the full lesson JSONB.
//
// Authoring rubric (per plan):
//   * checkpoint explanation_fr: 300-500 chars, name the rule, walk the calc,
//     flag the trap if relevant.
//   * try_it hint_fr: ~250 chars, restate + nudge.
//   * try_it solution_fr: ~600-800 chars, full worked solution.
//
// Output:
//   backend/supabase/migrations/025_lessons_sma_expanded_solutions.sql
//   backend/supabase/migrations/026_lessons_smb_expanded_solutions.sql

import 'dart:convert';
import 'dart:io';

class _Cp {
  final String skill;
  final String stem;
  final String expanded;
  const _Cp(this.skill, this.stem, this.expanded);
}

class _Ti {
  final String skill;
  final String problem;
  final String hint;
  final String solution;
  const _Ti(this.skill, this.problem, this.hint, this.solution);
}

// --------------------------------------------------------------------------
// SMA expansions
// --------------------------------------------------------------------------

const List<_Ti> _smaTryIts = [
  _Ti(
    'arithmetic_seq',
    r"Calcule $2 + 5 + 8 + \dots + 50$ (raison 3, partant de 2).",
    r"On a une suite arithmétique de premier terme 2 et raison 3. La somme $u_p + u_{p+1} + \dots + u_n$ vaut (nombre de termes) × (premier + dernier) / 2. Première étape : trouver combien de termes la somme contient. Le terme général est $u_n = 2 + 3n$ (avec $u_0 = 2$). Trouve le rang $n$ tel que $u_n = 50$, ajoute 1 pour le nombre de termes, puis applique la formule.",
    r"On reconnaît la somme d'une suite arithmétique de premier terme $u_0 = 2$ et de raison $r = 3$. Le terme général est $u_n = u_0 + n r = 2 + 3n$. On cherche $n$ tel que $u_n = 50$ : $2 + 3n = 50$, donc $3n = 48$, donc $n = 16$. **Attention** : le rang 16 correspond au 17ème terme (les rangs commencent à 0). On a donc 17 termes en tout. La formule de Gauss donne $S = (\text{nb termes}) \times \dfrac{\text{premier} + \text{dernier}}{2} = 17 \times \dfrac{2 + 50}{2} = 17 \times 26 = 442$. **Vérification rapide** : la moyenne (2+50)/2 = 26, multipliée par le nombre de termes 17 = 442. Cohérent.",
  ),
  _Ti(
    'limit_calc',
    r"Calcule $\lim_{x\to 1} \dfrac{x^2 - 1}{x - 1}$.",
    r"On commence toujours par tenter la substitution directe. Ici, $x = 1$ donne numérateur $1 - 1 = 0$ et dénominateur $1 - 1 = 0$ : forme indéterminée $0/0$. **Cette forme est presque toujours le signe d'une factorisation cachée** — numérateur et dénominateur ont une racine commune $x = 1$. Pense à l'identité remarquable $a^2 - b^2 = (a-b)(a+b)$.",
    r"Substitution directe en $x = 1$ : numérateur $1^2 - 1 = 0$, dénominateur $1 - 1 = 0$. **Forme indéterminée $\frac{0}{0}$** — c'est le signal qu'il faut factoriser. On utilise l'identité remarquable $a^2 - b^2 = (a-b)(a+b)$ avec $a = x$ et $b = 1$ : $x^2 - 1 = (x-1)(x+1)$. La fraction se réécrit $\dfrac{(x-1)(x+1)}{x-1}$. Le facteur $(x-1)$ se simplifie au numérateur et au dénominateur — c'est légitime parce qu'on étudie la limite *quand* $x \to 1$, donc avec $x \ne 1$, donc $x - 1 \ne 0$. Il reste $\lim_{x \to 1}(x+1) = 1 + 1 = 2$. Le résultat 2 est aussi la valeur de la dérivée de $x^2$ en $x = 1$ — ce taux d'accroissement est l'archétype de la définition de la dérivée.",
  ),
  _Ti(
    'tvi',
    r"Montre que $\cos(x) = x$ admet une solution dans $[0, \pi/2]$.",
    r"L'astuce classique : ramène l'équation à la forme $g(x) = 0$ en posant $g(x) = \cos(x) - x$. Une solution de $\cos(x) = x$ est alors un zéro de $g$. Pour appliquer le TVI, vérifie que $g$ est continue sur $[0, \pi/2]$ (oui : différence de fonctions continues), puis évalue $g$ aux bornes pour montrer un changement de signe.",
    r"On pose $g(x) = \cos(x) - x$, ainsi $\cos(x) = x \iff g(x) = 0$. Étape 1 : $g$ est **continue** sur $[0, \pi/2]$ comme différence de deux fonctions continues ($\cos$ et l'identité). Étape 2 : on évalue aux bornes. $g(0) = \cos(0) - 0 = 1 - 0 = 1 > 0$. $g(\pi/2) = \cos(\pi/2) - \pi/2 = 0 - \pi/2 \approx -1{,}57 < 0$. Étape 3 : 0 est compris entre $g(\pi/2) < 0$ et $g(0) > 0$. **Par le théorème des valeurs intermédiaires**, il existe au moins un $c \in ]0, \pi/2[$ tel que $g(c) = 0$, c'est-à-dire $\cos(c) = c$. Le TVI prouve l'existence sans donner la valeur ; numériquement, $c \approx 0{,}739$. **Astuce mémo** : pour toute équation $f(x) = a$, transforme en $f(x) - a = 0$, puis cherche un changement de signe.",
  ),
  _Ti(
    'deriv_apps',
    r"Étudie les variations de $f(x) = x^3 - 3x$ sur $\mathbb{R}$.",
    r"Le plan standard pour étudier les variations d'une fonction : (1) calculer $f'(x)$, (2) résoudre $f'(x) = 0$ pour trouver les points critiques, (3) faire un tableau de signes de $f'$, (4) déduire les variations de $f$. Ici $f$ est un polynôme de degré 3, donc $f'$ sera un polynôme de degré 2 — facile à factoriser.",
    r"**Étape 1 — Calcul de $f'$** : $f(x) = x^3 - 3x$, donc $f'(x) = 3x^2 - 3 = 3(x^2 - 1) = 3(x-1)(x+1)$. **Étape 2 — Points critiques** : $f'(x) = 0 \iff x = -1$ ou $x = 1$. Ce sont les candidats extrema. **Étape 3 — Tableau de signes** : le coefficient dominant de $f'$ est positif, donc $f'$ est positive en dehors des racines et négative entre elles. Sur $]-\infty, -1[$ : $f' > 0$ → $f$ croît. Sur $]-1, 1[$ : $f' < 0$ → $f$ décroît. Sur $]1, +\infty[$ : $f' > 0$ → $f$ croît. **Étape 4 — Conclusion** : $f$ admet un **maximum local** en $x = -1$ avec $f(-1) = -1 + 3 = 2$, et un **minimum local** en $x = 1$ avec $f(1) = 1 - 3 = -2$. La courbe a la forme caractéristique en S des polynômes de degré 3 à coefficient dominant positif.",
  ),
  _Ti(
    'definite_integral',
    r"Calcule $\int_0^1 (3x^2 + 2x)\,dx$.",
    r"Une intégrale définie d'un polynôme se calcule en deux temps : trouver une primitive $F$, puis appliquer la formule de Newton-Leibniz $F(b) - F(a)$. Pour $x^n$, la primitive est $x^{n+1}/(n+1)$. Linéarité de l'intégrale : $\int (f + g) = \int f + \int g$, et $\int k f = k \int f$.",
    r"**Étape 1 — Primitive** : on cherche $F$ telle que $F'(x) = 3x^2 + 2x$. Par linéarité, on intègre terme à terme. Pour $3x^2$ : primitive $3 \cdot x^3/3 = x^3$. Pour $2x$ : primitive $2 \cdot x^2/2 = x^2$. Donc $F(x) = x^3 + x^2$. **On peut vérifier en dérivant** : $F'(x) = 3x^2 + 2x$ ✓. **Étape 2 — Newton-Leibniz** : $\int_0^1 (3x^2 + 2x)\,dx = F(1) - F(0) = (1^3 + 1^2) - (0^3 + 0^2) = 2 - 0 = 2$. **Vérification dimensionnelle** : c'est une aire sous une courbe positive sur $[0, 1]$, donc le résultat doit être positif et de l'ordre de grandeur de la hauteur moyenne (≈ 2,5) fois la largeur (1). On obtient 2 — cohérent.",
  ),
];

const List<_Cp> _smaCheckpoints = [
  // arithmetic_seq
  _Cp('arithmetic_seq', r"Si $u_n = 2n+1$, que vaut $u_3$ ?",
      r"Pour calculer $u_3$, on remplace simplement $n$ par 3 dans la formule explicite : $u_3 = 2 \times 3 + 1 = 6 + 1 = 7$. **Attention au piège** : la formule donne directement le terme — pas besoin de calculer $u_0, u_1, u_2$ d'abord. Pour une formule explicite $u_n = an + b$, c'est un calcul direct."),
  _Cp('arithmetic_seq', r"Quelle est la raison de la suite $5, 9, 13, 17$ ?",
      r"Une suite est arithmétique si la **différence entre deux termes consécutifs** est constante. On vérifie : $9 - 5 = 4$, $13 - 9 = 4$, $17 - 13 = 4$. La différence est bien constante et vaut 4 — c'est la raison. **Le piège classique** : confondre la valeur du premier terme (5) avec la raison (4). La raison décrit la *progression*, pas la *position*."),
  _Cp('arithmetic_seq', r"Si $u_0 = 2$ et $r = 3$, que vaut $u_{10}$ ?",
      r"Pour une suite arithmétique de premier terme $u_0$ et raison $r$, le terme général est $u_n = u_0 + n r$ — chaque terme s'obtient en partant de $u_0$ et en ajoutant $r$ exactement $n$ fois. Application : $u_{10} = 2 + 10 \times 3 = 2 + 30 = 32$. **Attention** : c'est $n r$, pas $(n-1) r$ — la formule part de $u_0$, pas de $u_1$."),
  _Cp('arithmetic_seq', r"Somme de $1 + 2 + \dots + 10$ ?",
      r"C'est la somme des entiers de 1 à 10, qu'on calcule par la **formule de Gauss** : $1 + 2 + \dots + n = \dfrac{n(n+1)}{2}$. Application avec $n = 10$ : $S = \dfrac{10 \times 11}{2} = 55$. La formule générale pour une somme arithmétique : (nombre de termes) × (premier + dernier) / 2 — ici $10 \times (1+10)/2 = 55$. Les deux formes donnent le même résultat."),
  // geometric_seq
  _Cp('geometric_seq', r"Dans $2, 6, 18, 54$, on multiplie chaque terme par :",
      r"Une suite est géométrique si le **rapport entre deux termes consécutifs** est constant — ce rapport est la raison $q$. On calcule : $6/2 = 3$, $18/6 = 3$, $54/18 = 3$. La raison est $q = 3$. **Piège** : ne pas confondre raison géométrique (multiplication) et raison arithmétique (addition). Ici 6 - 2 = 4, mais cette différence n'est pas constante (18 - 6 = 12), donc la suite n'est pas arithmétique."),
  _Cp('geometric_seq', r"Quelle est la raison de $8, 4, 2, 1, 0{,}5$ ?",
      r"On calcule le rapport entre termes consécutifs : $4/8 = 1/2$, $2/4 = 1/2$, $1/2 = 1/2$, $0{,}5/1 = 1/2$. Le rapport est constant et vaut $1/2$ : la suite est géométrique de raison $q = 1/2$. **Équivalent** : on divise par 2, ce qui revient à multiplier par $1/2$. Avec $|q| < 1$, la suite est strictement décroissante vers 0."),
  _Cp('geometric_seq', r"$u_0 = 1$, $q = 3$. Que vaut $u_4$ ?",
      r"Pour une suite géométrique : $u_n = u_0 \cdot q^n$. On part de $u_0 = 1$ et on multiplie par $q = 3$ exactement $n = 4$ fois. Application : $u_4 = 1 \cdot 3^4 = 81$. **Piège classique** : confondre $q^n$ et $n q$. Pour les suites géométriques c'est toujours une **puissance** $q^n$, pas un produit. On peut vérifier en énumérant : $u_0 = 1, u_1 = 3, u_2 = 9, u_3 = 27, u_4 = 81$."),
  _Cp('geometric_seq', r"Que vaut $1 + 1/2 + 1/4 + \dots$ (somme infinie, $|q|<1$) ?",
      r"Pour une suite géométrique de raison $|q| < 1$, la **somme infinie** converge vers $\dfrac{u_0}{1 - q}$. Ici $u_0 = 1$ et $q = 1/2$, donc $S = \dfrac{1}{1 - 1/2} = \dfrac{1}{1/2} = 2$. **Intuition** : chaque terme ajoute la moitié de ce qui restait à atteindre 2 — paradoxe de Zénon. C'est cohérent avec une vérification : $1 + 0{,}5 + 0{,}25 + 0{,}125 + \dots$ s'approche de 2 sans jamais le dépasser."),
  // seq_convergence
  _Cp('seq_convergence', r"$\lim 1/n^2$ vaut :",
      r"Quand $n \to +\infty$, $n^2 \to +\infty$ encore plus vite. Une fraction de la forme « constante / quelque chose qui tend vers $+\infty$ » tend toujours vers 0. Donc $\lim_{n \to \infty} 1/n^2 = 0$. **Plus généralement** : pour tout $\alpha > 0$, $\lim 1/n^\alpha = 0$. Cette convergence est le pilier des théorèmes de comparaison."),
  _Cp('seq_convergence', r"$\lim (0{,}5)^n$ vaut :",
      r"C'est une suite géométrique de raison $q = 0{,}5$. Comme $|q| < 1$, on a $q^n \to 0$ quand $n \to +\infty$ — chaque terme vaut la moitié du précédent, donc tend exponentiellement vers 0. **Règle générale** : $q^n \to 0$ ssi $|q| < 1$, $q^n \to +\infty$ si $q > 1$, $q^n = 1$ si $q = 1$, et $q^n$ oscille (n'a pas de limite) si $q \le -1$."),
  _Cp('seq_convergence', r"$\lim 2^n$ vaut :",
      r"C'est une suite géométrique de raison $q = 2 > 1$. Quand on multiplie par 2 à chaque étape, la suite **diverge vers $+\infty$** — la croissance est exponentielle. $\lim 2^n = +\infty$. Pour comparaison : $2^{10} = 1024$, $2^{20} \approx 10^6$, $2^{30} \approx 10^9$. Cette croissance bat n'importe quel polynôme à long terme."),
  _Cp('seq_convergence', r"Le théorème des gendarmes sert à :",
      r"Le **théorème des gendarmes** (ou d'encadrement) sert à démontrer une convergence par encadrement : si pour tout $n$, $a_n \le u_n \le b_n$ avec $\lim a_n = \lim b_n = \ell$, alors $\lim u_n = \ell$. **Application typique** : encadrer $u_n = \sin(n)/n$ par $-1/n \le u_n \le 1/n$, qui tendent tous deux vers 0, donc $u_n \to 0$. Le théorème ne *calcule* pas la limite : il *prouve* qu'elle existe et la donne via les gardiens."),
  // seq_recursive
  _Cp('seq_recursive', r"Si $f$ est continue et $u_n \to \ell$, alors :",
      r"Si $u_{n+1} = f(u_n)$ avec $f$ continue et $u_n \to \ell$, on peut **passer à la limite des deux côtés** : $u_{n+1} \to \ell$ aussi (car c'est la même suite décalée), et $f(u_n) \to f(\ell)$ par continuité de $f$. On obtient l'équation $\ell = f(\ell)$. **Méthode standard** : pour trouver les limites possibles d'une suite récurrente, on résout l'équation des points fixes $\ell = f(\ell)$. Mais attention : cela suppose que la limite existe — il faut le démontrer séparément (par monotonie + bornes par exemple)."),
  _Cp('seq_recursive', r"Pour conclure à la convergence d'une suite récurrente, on cherche typiquement à montrer qu'elle est :",
      r"Le théorème de la **limite monotone** : toute suite **monotone et bornée** converge. Concrètement, si on montre que $(u_n)$ est croissante et majorée (ou décroissante et minorée), elle converge vers une limite finie. Combiné à l'équation des points fixes $\ell = f(\ell)$, cela donne la valeur. **Sans monotonie ni bornes, on ne peut rien conclure** — la suite peut osciller, diverger, etc. C'est l'outil principal pour les suites récurrentes en Bac."),
  // seq_adjacent
  _Cp('seq_adjacent', r"Si $(u_n)$ croissante, $(v_n)$ décroissante et $v_n - u_n \to 0$, alors :",
      r"C'est exactement le **théorème des suites adjacentes** : deux suites $(u_n)$ croissante et $(v_n)$ décroissante telles que $v_n - u_n \to 0$ convergent toutes les deux vers la **même limite**. Géométriquement, l'intervalle $[u_n, v_n]$ se rétrécit autour d'un point unique. Application classique : encadrement de $\pi$ par les périmètres de polygones inscrit/circonscrit. **Attention** : il faut bien la condition $v_n - u_n \to 0$ — sans elle, les suites peuvent converger vers des limites différentes."),
  // limit_def
  _Cp('limit_def', r"$\lim_{x\to 0} x^2 = ?$",
      r"La fonction $x \mapsto x^2$ est polynômiale, donc continue en tout point de $\mathbb{R}$. Quand une fonction est continue en un point $a$, sa limite y vaut simplement $f(a)$ — la substitution directe est valide. Application : $\lim_{x \to 0} x^2 = 0^2 = 0$. **Toujours essayer la substitution directe avant de chercher des techniques avancées** — souvent ça marche."),
  _Cp('limit_def', r"$\lim_{x\to +\infty} \frac{1}{x} = ?$",
      r"Quand $x$ tend vers $+\infty$, le numérateur 1 reste fixe alors que le dénominateur $x$ devient arbitrairement grand. Une fraction de la forme « constante / quelque chose qui tend vers l'infini » tend toujours vers 0. Cette limite est l'archétype de la décroissance vers zéro à l'infini, et fonde toute la théorie des asymptotes horizontales."),
  // limit_calc
  _Cp('limit_calc', r"$\lim_{x\to 4} \frac{x^2-16}{x-4} = ?$",
      r"Substitution directe en $x = 4$ : numérateur $16 - 16 = 0$, dénominateur $4 - 4 = 0$, **forme indéterminée $0/0$**. On factorise via l'identité remarquable $a^2 - b^2 = (a-b)(a+b)$ : $x^2 - 16 = (x-4)(x+4)$. La fraction se réécrit $\dfrac{(x-4)(x+4)}{x-4}$. Le facteur $(x-4)$ se simplifie (légitime puisque $x \ne 4$ dans la limite), il reste $\lim_{x \to 4}(x+4) = 8$. **Pattern à retenir** : forme $0/0 \Rightarrow$ chercher une factorisation cachée."),
  _Cp('limit_calc', r"$\lim_{x\to +\infty} \frac{3x+1}{x+5} = ?$",
      r"Quand $x \to +\infty$, numérateur et dénominateur tendent vers $+\infty$ — forme indéterminée $\infty/\infty$. **Astuce standard** : factoriser $x$ au plus haut degré au numérateur et au dénominateur. $\dfrac{3x+1}{x+5} = \dfrac{x(3 + 1/x)}{x(1 + 5/x)} = \dfrac{3 + 1/x}{1 + 5/x}$. Quand $x \to +\infty$, $1/x \to 0$ et $5/x \to 0$, donc la fraction tend vers $3/1 = 3$. **Règle rapide** : pour un quotient de polynômes de même degré à l'infini, la limite est le rapport des coefficients dominants."),
  _Cp('limit_calc', r"$\lim_{x\to 0^+} \frac{1}{x} = ?$",
      r"Quand $x \to 0$ par valeurs positives ($x > 0$ très petit), le dénominateur $x$ tend vers 0 par valeurs positives, et $1/x$ devient arbitrairement grand et positif. Donc $\lim_{x \to 0^+} 1/x = +\infty$. **Attention au signe de la limite latérale** : $\lim_{x \to 0^-} 1/x = -\infty$ (car $x$ tend vers 0 par valeurs négatives). Pour $1/x$ en 0, la limite globale **n'existe pas** — les limites à gauche et à droite diffèrent."),
  // continuity
  _Cp('continuity', r"Une fonction $f$ est continue en $a$ ssi :",
      r"Définition formelle : $f$ est **continue en $a$** ssi $\lim_{x \to a} f(x) = f(a)$. Cela exige trois choses simultanément : (1) $f$ est définie en $a$, (2) la limite $\lim_{x \to a} f(x)$ existe, (3) cette limite égale $f(a)$. Géométriquement : on peut tracer la courbe en passant par $a$ sans lever le crayon. **Les trois conditions sont nécessaires** — il existe des fonctions définies en $a$ avec une limite, mais où la limite ne vaut pas $f(a)$ : elles sont alors discontinues en $a$."),
  // tvi
  _Cp('tvi', r"Le TVI permet de :",
      r"Le **théorème des valeurs intermédiaires** garantit l'**existence** d'une solution sans donner sa valeur. Si $f$ est continue sur $[a, b]$ et $k$ est une valeur entre $f(a)$ et $f(b)$, alors il existe au moins un $c \in [a, b]$ tel que $f(c) = k$. Pour calculer $c$ exactement, il faut résoudre l'équation. **C'est un théorème d'existence pure** — son corollaire le plus utilisé : si $f(a) f(b) < 0$, alors $f$ s'annule au moins une fois entre $a$ et $b$."),
  _Cp('tvi', r"$f$ continue sur $[0,1]$, $f(0) = 3$, $f(1) = -2$. Le TVI garantit qu'il existe $c$ tel que :",
      r"On vérifie d'abord la continuité (donnée). Le TVI s'applique aux valeurs comprises **entre** $f(0) = 3$ et $f(1) = -2$, c'est-à-dire dans l'intervalle $[-2, 3]$. Parmi les options : 5 et $-3$ et $4$ sont en dehors, mais **0 est dedans** ($-2 < 0 < 3$). Donc le TVI garantit l'existence d'un $c \in ]0, 1[$ tel que $f(c) = 0$. **Idée à retenir** : le TVI ne dit rien des valeurs hors de l'intervalle des bornes."),
  // deriv_basic
  _Cp('deriv_basic', r"$f'(a)$ représente géométriquement :",
      r"Géométriquement, $f'(a)$ est la **pente de la tangente** à la courbe $y = f(x)$ au point d'abscisse $a$. Mathématiquement, c'est la limite du taux d'accroissement $\dfrac{f(a+h) - f(a)}{h}$ quand $h \to 0$ — c'est-à-dire la pente d'une corde infiniment courte, qui devient la tangente à la limite. **Interprétation physique** : si $f(t)$ est une position, $f'(t)$ est la vitesse instantanée."),
  _Cp('deriv_basic', r"$f(x) = x^2$. Que vaut $f'(3)$ ?",
      r"Pour $f(x) = x^2$, on applique la règle des puissances $(x^n)' = n x^{n-1}$ avec $n = 2$ : $f'(x) = 2x$. En $x = 3$ : $f'(3) = 2 \cdot 3 = 6$. Cela signifie qu'au point $(3, 9)$ de la parabole, la tangente a une pente de 6 — son équation est $y = 6(x - 3) + 9 = 6x - 9$. **À mémoriser** : $(x^n)' = n x^{n-1}$ est l'une des règles les plus utilisées."),
  _Cp('deriv_basic', r"$f(x) = 5x + 1$. Que vaut $f'(2)$ ?",
      r"Une fonction affine $f(x) = ax + b$ a une dérivée constante $f'(x) = a$ partout. Géométriquement, c'est cohérent : la courbe est elle-même une droite, donc la tangente coïncide avec la courbe et a la même pente partout — $a$, le coefficient directeur. Pour $f(x) = 5x + 1$, $f'(x) = 5$ pour tout $x$, donc $f'(2) = 5$. **Pas de calcul à faire** : la dérivée d'une affine ne dépend pas du point."),
  // deriv_rules
  _Cp('deriv_rules', r"$(uv)' = ?$",
      r"La **règle du produit** dit que la dérivée d'un produit de fonctions $u(x) v(x)$ est $u' v + u v'$ — pas $u' v'$ (erreur classique). Démonstration intuitive : la variation du rectangle $u \times v$ vient de la variation de $u$ multipliée par $v$, plus la variation de $v$ multipliée par $u$. Application typique : $(x \cdot e^x)' = 1 \cdot e^x + x \cdot e^x = (1 + x) e^x$."),
  _Cp('deriv_rules', r"$(u/v)' = ?$",
      r"La **règle du quotient** : $\left(\dfrac{u}{v}\right)' = \dfrac{u' v - u v'}{v^2}$. **L'ordre dans le numérateur compte** : c'est $u' v - u v'$, pas $u v' - u' v$ — inverser donne le mauvais signe. Le dénominateur est toujours $v^2$ (carré). Application typique : $\left(\dfrac{1}{x}\right)' = \dfrac{0 \cdot x - 1 \cdot 1}{x^2} = -\dfrac{1}{x^2}$ — cohérent avec la règle des puissances $(x^{-1})' = -x^{-2}$."),
  _Cp('deriv_rules', r"$(\sin x)' = ?$",
      r"$(\sin x)' = \cos x$. Cette dérivée est l'une des fondamentales du programme. **Astuce mnémotechnique** : sin → cos (sans signe), cos → -sin (avec signe). Géométriquement : la pente de $\sin$ en 0 vaut 1 (= $\cos 0$), elle s'annule en $\pi/2$ (= $\cos(\pi/2) = 0$), devient $-1$ en $\pi$ (= $\cos \pi = -1$). Tout cohérent."),
  _Cp('deriv_rules', r"$(e^x)' = ?$",
      r"$(e^x)' = e^x$ — la fonction exponentielle est sa propre dérivée. **C'est sa propriété caractéristique** : elle est l'unique solution de $f' = f$ avec $f(0) = 1$. Cela explique son omniprésence en physique (lois de désintégration, charge de condensateur, croissance de population) — partout où la vitesse est proportionnelle à la quantité présente, on tombe sur l'exponentielle."),
  // deriv_apps
  _Cp('deriv_apps', r"Si $f'(x) > 0$ sur un intervalle, $f$ est :",
      r"**Théorème de variation** : si $f$ est dérivable sur un intervalle $I$ et $f' > 0$ sur $I$, alors $f$ est **strictement croissante** sur $I$. Intuition : pente positive partout = la courbe monte. Réciproquement, $f' < 0$ ⇒ $f$ décroissante ; $f' = 0$ ⇒ $f$ constante. C'est l'outil clé pour étudier les variations : on calcule $f'$, on étudie son signe, on en déduit les variations de $f$."),
  _Cp('deriv_apps', r"Un extremum local de $f$ se trouve typiquement où :",
      r"**Théorème de Fermat** : un extremum local d'une fonction dérivable est un point où $f'(x) = 0$ — appelé point critique. Géométriquement, la tangente y est horizontale. **Attention** : la réciproque est fausse : $f'(x) = 0$ n'implique pas un extremum (exemple : $f(x) = x^3$ en 0, où $f'(0) = 0$ mais c'est un point d'inflexion, pas un extremum). Pour confirmer un extremum, étudier le signe de $f'$ autour du point."),
  // primitives
  _Cp('primitives', r"Une primitive de $x^2$ est :",
      r"Pour primitiver $x^n$, on applique la règle inverse de la dérivée : $\int x^n\,dx = \dfrac{x^{n+1}}{n+1} + C$. Avec $n = 2$ : primitive de $x^2$ = $\dfrac{x^3}{3} + C$. **Vérification** : dériver $x^3/3$ donne bien $3x^2/3 = x^2$ ✓. La constante $C$ est libre — toute primitive est définie à une constante près. Si la question demande *une* primitive (pas *la* primitive), la plus simple est avec $C = 0$ : $x^3/3$."),
  _Cp('primitives', r"Une primitive de $\cos x$ est :",
      r"Une primitive de $\cos x$ est $\sin x$ (à une constante près). **Vérification** : $(\sin x)' = \cos x$ ✓. Attention au piège du signe : la dérivée de $\cos x$ est $-\sin x$ (avec signe), mais la primitive de $\cos x$ est $+\sin x$ (sans signe). Le signe n'apparaît que dans la dérivée de cosinus, pas dans la primitive. Mémo : sin↔cos sans signe, cos↔-sin avec signe."),
  // definite_integral
  _Cp('definite_integral', r"$\int_a^b f(x) dx$ représente :",
      r"Géométriquement, $\int_a^b f(x)\,dx$ représente l'**aire signée** entre la courbe $y = f(x)$ et l'axe des abscisses, sur l'intervalle $[a, b]$. Aire **positive** quand $f > 0$ (courbe au-dessus de l'axe), **négative** quand $f < 0$ (courbe au-dessous). C'est *l'aire algébrique* — pas l'aire géométrique stricte qui serait toujours positive. Pour une vraie aire géométrique, intégrer $|f(x)|$."),
  _Cp('definite_integral', r"$\int_a^b f = -\int_b^a f$. Vrai ou faux ?",
      r"**Vrai**. Inverser les bornes d'une intégrale change le signe : $\int_a^b f = -\int_b^a f$. Cette propriété est cohérente avec la convention que $\int_a^a f = 0$ et avec la relation de Chasles. Conséquence pratique : si on calcule $F(b) - F(a)$ pour $\int_a^b$, alors $\int_b^a$ donne $F(a) - F(b)$ — le signe opposé."),
  _Cp('definite_integral', r"$\int_0^2 x\,dx = ?$",
      r"On cherche une primitive de $x$ : c'est $x^2/2$. Par Newton-Leibniz : $\int_0^2 x\,dx = \left[\dfrac{x^2}{2}\right]_0^2 = \dfrac{4}{2} - 0 = 2$. **Vérification géométrique** : la courbe $y = x$ entre 0 et 2 est un triangle rectangle de base 2 et hauteur 2, donc aire = $2 \times 2 / 2 = 2$ ✓. Cohérent."),
  // integral_apps
  _Cp('integral_apps', r"L'aire entre $y = x^2$ et $y = 0$ sur $[0,1]$ vaut :",
      r"L'aire est $\int_0^1 x^2 dx = \left[\dfrac{x^3}{3}\right]_0^1 = \dfrac{1}{3} - 0 = \dfrac{1}{3}$. **Vérification d'ordre de grandeur** : sur $[0, 1]$, $x^2$ varie de 0 à 1 ; l'aire moyenne sous la courbe est environ $1/3$ — cohérent avec la formule $\int x^n = x^{n+1}/(n+1)$ qui donne précisément $1/(n+1)$ pour les bornes 0 et 1."),
  _Cp('integral_apps', r"Une valeur moyenne de $f$ sur $[a,b]$ est :",
      r"La **valeur moyenne** d'une fonction continue sur $[a, b]$ est $\bar{f} = \dfrac{1}{b - a} \int_a^b f(x)\,dx$. Géométriquement, c'est la hauteur d'un rectangle de largeur $b - a$ qui aurait la même aire que sous la courbe. Application : si $f(t)$ est une vitesse instantanée, $\bar{f}$ est la vitesse moyenne. **Théorème de la moyenne** : il existe $c \in [a, b]$ tel que $f(c) = \bar{f}$ — la fonction prend sa moyenne au moins une fois si elle est continue."),
];

// Continued in additional batches below — split for readability.
const List<_Cp> _smaCheckpoints2 = [
  // prob_basic
  _Cp('prob_basic', r"On lance un dé à 6 faces. Probabilité d'obtenir un 3 ?",
      r"Sur un dé équilibré à 6 faces, chaque face a une probabilité égale d'apparaître. Il y a 1 face « 3 » sur 6 faces possibles, donc $P(\text{3}) = 1/6$. **Définition probabilité uniforme** : $P(A) = \dfrac{\text{nombre de cas favorables}}{\text{nombre de cas possibles}}$. Cette formule s'applique uniquement quand toutes les issues sont équiprobables — c'est le cas pour un dé non truqué."),
  _Cp('prob_basic', r"Si $P(A) = 0{,}3$, alors $P(\bar{A}) = ?$",
      r"L'événement $\bar{A}$ (le **contraire** de $A$) regroupe toutes les issues où $A$ ne se produit pas. Comme $A$ et $\bar{A}$ couvrent toutes les possibilités sans se chevaucher : $P(A) + P(\bar{A}) = 1$. Donc $P(\bar{A}) = 1 - 0{,}3 = 0{,}7$. **Astuce** : passer au complémentaire est souvent plus simple que de calculer $P(A)$ directement (« probabilité d'au moins un » → calculer « probabilité d'aucun » et soustraire de 1)."),
  _Cp('prob_basic', r"$P(A \cup B) = ?$ (général)",
      r"La **formule d'inclusion-exclusion** : $P(A \cup B) = P(A) + P(B) - P(A \cap B)$. On retire $P(A \cap B)$ pour ne pas compter deux fois les issues où $A$ et $B$ se produisent en même temps. **Cas particulier** : si $A$ et $B$ sont incompatibles ($A \cap B = \emptyset$), alors $P(A \cup B) = P(A) + P(B)$. **Erreur classique** : oublier le terme $-P(A \cap B)$ et obtenir une probabilité $> 1$."),
  // conditional_prob
  _Cp('conditional_prob', r"$P(A | B) = ?$",
      r"La **probabilité conditionnelle** de $A$ sachant $B$ est $P(A | B) = \dfrac{P(A \cap B)}{P(B)}$ (avec $P(B) > 0$). Intuition : on se restreint à l'univers où $B$ s'est réalisé, et on regarde quelle fraction de cet univers correspond à $A \cap B$. **Formule des probabilités composées** (réécriture) : $P(A \cap B) = P(B) \cdot P(A | B)$ — utile quand on connaît la probabilité conditionnelle."),
  _Cp('conditional_prob', r"$A$ et $B$ sont indépendants ssi :",
      r"Deux événements sont **indépendants** ssi $P(A \cap B) = P(A) \cdot P(B)$ — la probabilité de l'intersection est le produit des probabilités. De manière équivalente : $P(A | B) = P(A)$ (la connaissance de $B$ ne change pas la probabilité de $A$). **Indépendance n'est pas incompatibilité** : indépendant = sans influence ; incompatible = ne peuvent coexister. Deux événements peuvent être l'un sans être l'autre."),
  // random_variables
  _Cp('random_variables', r"L'espérance $E(X)$ représente :",
      r"L'**espérance** $E(X)$ d'une variable aléatoire $X$ est la **valeur moyenne** qu'on obtiendrait en répétant l'expérience un grand nombre de fois — c'est la moyenne pondérée par les probabilités. Pour une v.a. discrète : $E(X) = \sum x_i \cdot P(X = x_i)$. **Interprétation** : si on parie sur $X$, on s'attend (en moyenne) à $E(X)$. Exemple : pour un dé équilibré à 6 faces, $E(X) = (1+2+3+4+5+6)/6 = 3{,}5$."),
  _Cp('random_variables', r"$V(X) = ?$ en fonction de $E(X)$",
      r"La **variance** mesure la dispersion autour de l'espérance : $V(X) = E((X - E(X))^2)$, ou de manière équivalente (formule de König) : $V(X) = E(X^2) - (E(X))^2$. La forme $E(X^2) - E(X)^2$ est souvent plus facile à calculer en pratique. **L'écart-type** $\sigma = \sqrt{V(X)}$ est l'unité de mesure de la dispersion (mêmes unités que $X$). Une variance nulle signifie que $X$ est constante ; plus elle est grande, plus $X$ est dispersée."),
  // complex_basics
  _Cp('complex_basics', r"$i^2 = ?$",
      r"Par **définition** du nombre $i$ (unité imaginaire), $i^2 = -1$. C'est cette propriété qui distingue $\mathbb{C}$ de $\mathbb{R}$ — dans $\mathbb{R}$, aucun nombre au carré ne donne un négatif. **Conséquences** : $i^3 = i^2 \cdot i = -i$ ; $i^4 = (i^2)^2 = 1$ ; les puissances de $i$ cyclent par 4 : $1, i, -1, -i, 1, i, \dots$. Cette cyclicité est très utile pour simplifier $i^n$ pour de grandes valeurs de $n$."),
  _Cp('complex_basics', r"$|3 + 4i| = ?$",
      r"Le **module** d'un complexe $z = a + bi$ est $|z| = \sqrt{a^2 + b^2}$ — c'est la distance à l'origine dans le plan complexe. Pour $3 + 4i$ : $|z| = \sqrt{9 + 16} = \sqrt{25} = 5$. **Astuce** : reconnaître le triplet pythagoricien (3, 4, 5) — ce sont des nombres très courants dans les exercices, mémoriser $|3+4i| = 5$ fait gagner du temps."),
  _Cp('complex_basics', r"Conjugué de $2 - 3i$ ?",
      r"Le **conjugué** de $z = a + bi$ est $\bar{z} = a - bi$ — on change le signe de la partie imaginaire seulement. Donc $\overline{2 - 3i} = 2 + 3i$. **Propriétés clés** : $z \cdot \bar{z} = a^2 + b^2 = |z|^2$ (réel positif) ; $\overline{\bar{z}} = z$ ; le conjugué transforme une division en multiplication, d'où la technique « multiplier par le conjugué » pour simplifier $\dfrac{1}{a+bi}$."),
  // complex_trig
  _Cp('complex_trig', r"Forme trigonométrique de $1 + i$ ?",
      r"Pour mettre sous forme trigonométrique $z = r(\cos\theta + i\sin\theta)$, on calcule module et argument. Module : $|1 + i| = \sqrt{1 + 1} = \sqrt{2}$. Argument : $\tan\theta = 1/1 = 1$ avec $z$ dans le quadrant 1 (parties réelle et imaginaire positives), donc $\theta = \pi/4$. Forme : $1 + i = \sqrt{2}(\cos(\pi/4) + i\sin(\pi/4)) = \sqrt{2} e^{i\pi/4}$."),
  _Cp('complex_trig', r"Avec $z = re^{i\theta}$, $z^n = ?$",
      r"**Formule de Moivre** : $z^n = r^n e^{in\theta}$. Multiplier les complexes en forme exponentielle revient à **multiplier les modules et additionner les arguments** ; donc élever à la puissance $n$ multiplie l'argument par $n$. Application typique : $(1+i)^4 = (\sqrt{2})^4 e^{i\pi} = 4 \cdot (-1) = -4$ (calcul instantané vs développement laborieux)."),
  // complex_geometry
  _Cp('complex_geometry', r"Le module $|z_B - z_A|$ représente :",
      r"$|z_B - z_A|$ est la **distance** entre les points $A$ et $B$ d'affixes $z_A$ et $z_B$ dans le plan complexe. C'est une simple application du module comme distance à l'origine, appliquée au vecteur $\vec{AB}$ d'affixe $z_B - z_A$. **Application** : pour montrer que trois points sont alignés, équidistants, ou forment un triangle particulier, calculer les modules $|z_B - z_A|$, $|z_C - z_B|$, etc."),
  _Cp('complex_geometry', r"$\arg(z_B - z_A)$ représente :",
      r"$\arg(z_B - z_A)$ est l'**angle** que forme le vecteur $\vec{AB}$ avec l'axe réel positif (axe Ox), mesuré dans le sens trigonométrique. Couplé au module $|z_B - z_A|$, cela donne les coordonnées polaires du vecteur $\vec{AB}$. **Application** : un triangle est équilatéral ssi les trois côtés ont même longueur (modules égaux) et les angles correspondent."),
  // ode_first_order
  _Cp('ode_first_order', r"Solution générale de $y' = ky$ ?",
      r"L'équation $y' = ky$ (croissance/décroissance proportionnelle) a pour solution générale $y(x) = C e^{kx}$ avec $C \in \mathbb{R}$. **Démonstration intuitive** : si la dérivée est proportionnelle à la fonction, on tombe naturellement sur l'exponentielle (qui est sa propre dérivée à un facteur près). $C$ est déterminée par une condition initiale (ex : $y(0) = y_0$ donne $C = y_0$). Modélise désintégration radioactive ($k < 0$), croissance bactérienne ($k > 0$), etc."),
  _Cp('ode_first_order', r"Solution de $y' + 2y = 0$, $y(0) = 5$ ?",
      r"L'équation $y' + 2y = 0$ se réécrit $y' = -2y$, donc solution générale $y(x) = C e^{-2x}$. Condition initiale : $y(0) = C e^0 = C = 5$. Donc $y(x) = 5 e^{-2x}$. **Vérification** : $y'(x) = -10 e^{-2x} = -2 \cdot 5 e^{-2x} = -2 y$ ✓. La fonction décroît exponentiellement de 5 vers 0."),
  // ode_second_order
  _Cp('ode_second_order', r"$y'' + \omega^2 y = 0$ a pour solutions :",
      r"L'équation $y'' + \omega^2 y = 0$ (oscillateur harmonique non amorti) a pour solution générale $y(x) = A \cos(\omega x) + B \sin(\omega x)$ avec $A, B \in \mathbb{R}$. **Vérification** : $(\cos\omega x)'' = -\omega^2 \cos\omega x$, donc $\cos\omega x$ vérifie l'équation ✓. Cette équation modélise le pendule simple (petites oscillations), un ressort idéal, un circuit LC, etc. La pulsation $\omega$ détermine la période $T = 2\pi/\omega$."),
  // kinematics
  _Cp('kinematics', r"L'accélération est la dérivée de :",
      r"L'**accélération** $a(t)$ est la dérivée de la **vitesse** $v(t)$ par rapport au temps : $a = dv/dt$. C'est aussi la **dérivée seconde** de la position : $a = d^2x/dt^2$. Mémo : position $\xrightarrow{d/dt}$ vitesse $\xrightarrow{d/dt}$ accélération. Inversement : on intègre l'accélération pour retrouver la vitesse, puis encore une fois pour la position."),
  _Cp('kinematics', r"En MRUA, $v(t) = ?$",
      r"Mouvement Rectiligne Uniformément Accéléré (MRUA) : accélération constante $a$. Par intégration : $v(t) = v_0 + a t$, où $v_0$ est la vitesse initiale. **Cohérence avec la dérivée** : $dv/dt = a$ ✓. Position : $x(t) = x_0 + v_0 t + \dfrac{1}{2} a t^2$ — équation de la chute libre, du démarrage d'une voiture, etc. À $g = 9{,}8 \text{ m/s}^2$, en chute libre la vitesse augmente d'environ 10 m/s par seconde."),
  // newtons_laws
  _Cp('newtons_laws', r"$\sum \vec{F} = ?$ (2ème loi de Newton)",
      r"**Deuxième loi de Newton** : $\sum \vec{F} = m \vec{a}$ — la somme vectorielle des forces appliquées à un objet égale sa masse fois son accélération. C'est l'équation fondamentale de la dynamique. **Conséquences** : si $\sum \vec{F} = \vec{0}$, alors $\vec{a} = \vec{0}$ (équilibre dynamique) ; si une force unique $F$ est appliquée, $a = F/m$ — accélération inversement proportionnelle à la masse."),
  _Cp('newtons_laws', r"Principe d'inertie (1ère loi) :",
      r"**Première loi de Newton** (principe d'inertie) : un objet sur lequel s'exerce une somme de forces nulle est en mouvement rectiligne uniforme (MRU) ou au repos. Inversement, tout changement de vitesse (en module ou en direction) implique une force non nulle. **Conséquence pratique** : un objet en mouvement n'a pas besoin d'une force pour continuer à se déplacer — c'est l'inertie qui le maintient. Idée révolutionnaire d'Aristote à Newton."),
  // energy
  _Cp('energy', r"Énergie cinétique $E_c = ?$",
      r"L'**énergie cinétique** d'un objet en mouvement est $E_c = \dfrac{1}{2} m v^2$ — proportionnelle à la masse et au **carré** de la vitesse (pas à la vitesse linéaire !). Doubler la vitesse quadruple l'énergie cinétique. **Unités** : kg·(m/s)² = J (joule). Application : un véhicule à 100 km/h a 4× l'énergie d'un véhicule à 50 km/h — d'où la distance de freinage qui croît rapidement avec la vitesse."),
  _Cp('energy', r"Théorème de l'énergie cinétique :",
      r"$\Delta E_c = W_{\text{forces}}$ — la **variation de l'énergie cinétique** d'un objet égale la **somme des travaux** des forces appliquées entre les deux instants. C'est un théorème puissant : il convertit un problème dynamique (forces, accélérations) en un problème énergétique (scalaire, plus simple). **Application typique** : calculer la vitesse d'un objet en bas d'un toboggan sans résoudre l'équation de mouvement complète."),
  // wave_properties
  _Cp('wave_properties', r"$v = \lambda f$ relie :",
      r"La relation fondamentale des ondes : **vitesse = longueur d'onde × fréquence**. $v$ en m/s, $\lambda$ en m, $f$ en Hz (1/s). Cette équation est universelle — vrai pour ondes mécaniques (corde, son), électromagnétiques (lumière), de matière (de Broglie). **Application** : pour la lumière dans le vide, $v = c \approx 3 \times 10^8$ m/s, donc une couleur de longueur d'onde $\lambda = 500$ nm a une fréquence $f = c/\lambda = 6 \times 10^{14}$ Hz."),
  // sound_light
  _Cp('sound_light', r"La diffraction est observable quand :",
      r"La **diffraction** (déviation des ondes derrière un obstacle) est observable quand la dimension de l'ouverture/obstacle est de l'ordre de la longueur d'onde $\lambda$. **Critère** : largeur $a \lesssim \lambda$ → diffraction nette ; $a \gg \lambda$ → propagation rectiligne. Application : on entend le son derrière un mur (λ ~ 1 m, comparable aux objets) mais on ne voit pas (λ ~ 500 nm, beaucoup plus petit)."),
  // rc_rl_circuits
  _Cp('rc_rl_circuits', r"Constante de temps d'un circuit RC : $\tau = ?$",
      r"Pour un circuit RC série, la **constante de temps** est $\tau = RC$ (en secondes, avec $R$ en Ω et $C$ en F). Elle caractérise la rapidité de la charge/décharge : à $t = \tau$, le condensateur est chargé à 63% ($1 - e^{-1}$) ; à $t = 5\tau$, à plus de 99% — on considère le régime établi. **Mémo** : $\tau$ grand = charge lente ; $\tau$ petit = charge rapide. Pour un circuit RL, $\tau = L/R$."),
  // rlc_oscillations
  _Cp('rlc_oscillations', r"Pulsation propre LC : $\omega_0 = ?$",
      r"Pour un circuit LC idéal (sans résistance), la **pulsation propre** est $\omega_0 = \dfrac{1}{\sqrt{LC}}$ (en rad/s). La période d'oscillation est $T_0 = 2\pi/\omega_0 = 2\pi\sqrt{LC}$. **Analogie mécanique** : $L$ joue le rôle de la masse (inertie), $C$ celui de l'inverse de la raideur ($1/k$) — un circuit LC est l'équivalent électrique d'un oscillateur harmonique mécanique. Avec une résistance $R$ ajoutée, les oscillations s'amortissent (analogue d'un amortisseur)."),
  // acid_base
  _Cp('acid_base', r"$pH = -\log_{10}([H_3O^+])$. Si $[H_3O^+] = 10^{-3}$ mol/L, $pH = ?$",
      r"$pH = -\log_{10}(10^{-3}) = -(-3) = 3$. **Mémo** : $pH$ = exposant changé de signe de la concentration en ions hydronium, exprimée comme puissance de 10. Solution acide ($pH < 7$) : forte concentration en $H_3O^+$ ; basique ($pH > 7$) : faible concentration. **Échelle log** : $\Delta pH = 1$ correspond à un facteur 10 sur $[H_3O^+]$."),
  _Cp('acid_base', r"Une solution avec $pH = 13$ est :",
      r"$pH = 13 > 7$ : la solution est **basique** (concentration en $H_3O^+$ très faible : $10^{-13}$ mol/L). $pH$ proche de 14 (la limite haute en solution aqueuse) → solution **fortement basique**. Exemples : soude concentrée, lessive, ammoniaque. À l'inverse : $pH \le 1$ = fortement acide (acide chlorhydrique, jus gastrique). $pH = 7$ = neutre (eau pure à 25°C)."),
  // redox
  _Cp('redox', r"Une oxydation est :",
      r"Une **oxydation** est une **perte d'électrons** par une espèce. Notation : $\text{Red} \to \text{Ox} + n e^-$. **Mémo OIL RIG** : Oxidation Is Loss (of electrons), Reduction Is Gain. Exemple : $Zn \to Zn^{2+} + 2 e^-$ (oxydation du zinc). À l'inverse : réduction = gain d'électrons. Les deux se produisent simultanément dans une réaction redox — l'un cède, l'autre prend."),
  _Cp('redox', r"Dans une pile, l'anode est le siège de :",
      r"À l'**anode** d'une pile, c'est l'**oxydation** qui a lieu — l'espèce y perd des électrons, qui partent dans le circuit extérieur. Anode = pôle **négatif** d'une pile (par convention électrique, c'est de là que sortent les électrons). Mémo : Anode → ox**A**ydation ; **C**athode → ré**du**ction. À la cathode (pôle positif), les électrons arrivent et réduisent une espèce."),
];

// --------------------------------------------------------------------------
// SMB expansions
// --------------------------------------------------------------------------

const List<_Ti> _smbTryIts = [
  _Ti(
    'arithmetic_seq',
    r"Calcule $2 + 5 + 8 + \dots + 50$ (raison 3, partant de 2).",
    r"On a une suite arithmétique de premier terme 2 et raison 3. La somme $u_p + u_{p+1} + \dots + u_n$ vaut (nombre de termes) × (premier + dernier) / 2. Première étape : trouver combien de termes la somme contient. Le terme général est $u_n = 2 + 3n$ (avec $u_0 = 2$). Trouve le rang $n$ tel que $u_n = 50$, ajoute 1 pour le nombre de termes, puis applique la formule.",
    r"On reconnaît la somme d'une suite arithmétique de premier terme $u_0 = 2$ et de raison $r = 3$. Le terme général est $u_n = u_0 + n r = 2 + 3n$. On cherche $n$ tel que $u_n = 50$ : $2 + 3n = 50$, donc $3n = 48$, donc $n = 16$. **Attention** : le rang 16 correspond au 17ème terme (les rangs commencent à 0). On a donc 17 termes en tout. La formule de Gauss donne $S = (\text{nb termes}) \times \dfrac{\text{premier} + \text{dernier}}{2} = 17 \times \dfrac{2 + 50}{2} = 17 \times 26 = 442$.",
  ),
  _Ti(
    'limit_calc',
    r"Calcule $\lim_{x\to 1} \dfrac{x^2 - 1}{x - 1}$.",
    r"Substitution directe : $1^2 - 1 = 0$ et $1 - 1 = 0$, forme indéterminée $0/0$. **Cette forme appelle une factorisation cachée** — numérateur et dénominateur ont une racine commune en $x = 1$. Pense à l'identité remarquable $a^2 - b^2 = (a-b)(a+b)$.",
    r"En $x = 1$ : numérateur $1 - 1 = 0$, dénominateur $1 - 1 = 0$, forme **$0/0$**. On factorise via l'identité remarquable $a^2 - b^2 = (a-b)(a+b)$ : $x^2 - 1 = (x-1)(x+1)$. La fraction se réécrit $\dfrac{(x-1)(x+1)}{x-1}$. Le facteur $(x-1)$ se simplifie (légitime car $x \ne 1$ dans la limite). Il reste $\lim_{x\to 1}(x+1) = 1 + 1 = 2$. **Pattern à retenir** : forme $0/0 \Rightarrow$ chercher une factorisation cachée. Le résultat 2 est aussi la dérivée de $x^2$ en 1.",
  ),
  _Ti(
    'tvi',
    r"Montre que $\cos(x) = x$ admet une solution dans $[0, \pi/2]$.",
    r"Astuce classique : ramène à la forme $g(x) = 0$ en posant $g(x) = \cos(x) - x$. Vérifie ensuite que $g$ est continue et change de signe entre les bornes pour appliquer le TVI.",
    r"On pose $g(x) = \cos(x) - x$ ; les solutions de $\cos(x) = x$ sont les zéros de $g$. **Étape 1 — Continuité** : $g$ est continue sur $[0, \pi/2]$ comme différence de fonctions continues. **Étape 2 — Évaluation aux bornes** : $g(0) = 1 - 0 = 1 > 0$. $g(\pi/2) = 0 - \pi/2 \approx -1{,}57 < 0$. **Étape 3 — TVI** : 0 est compris entre $g(\pi/2)$ et $g(0)$, donc il existe $c \in ]0, \pi/2[$ tel que $g(c) = 0$, c'est-à-dire $\cos(c) = c$. Numériquement, $c \approx 0{,}739$.",
  ),
  _Ti(
    'integral_apps',
    r"Calcule l'aire entre la courbe $y = x^2$ et l'axe Ox sur $[0, 2]$.",
    r"L'aire est l'intégrale définie de $f(x) = x^2$ entre 0 et 2. Trouve d'abord une primitive de $x^2$, puis applique Newton-Leibniz.",
    r"L'aire cherchée est $A = \int_0^2 x^2\,dx$. **Primitive** : $\int x^2\,dx = \dfrac{x^3}{3}$. **Newton-Leibniz** : $A = \left[\dfrac{x^3}{3}\right]_0^2 = \dfrac{8}{3} - 0 = \dfrac{8}{3} \approx 2{,}67$. **Vérification ordre de grandeur** : sur $[0, 2]$, $x^2$ varie de 0 à 4 ; l'aire moyenne d'un rectangle de hauteur ~2 et largeur 2 serait 4, mais la courbe est concave vers le haut donc l'aire est inférieure. $8/3 \approx 2{,}67$ — cohérent.",
  ),
];

const List<_Cp> _smbCheckpoints = [
  // arithmetic_seq
  _Cp('arithmetic_seq', r"Si $u_n = 2n+1$, que vaut $u_3$ ?",
      r"Pour calculer $u_3$, on remplace $n$ par 3 dans la formule : $u_3 = 2 \times 3 + 1 = 7$. **Attention au piège** : la formule donne directement le terme — pas besoin de calculer $u_0, u_1, u_2$ d'abord pour une formule explicite $u_n = an + b$."),
  _Cp('arithmetic_seq', r"Quelle est la raison de la suite $5, 9, 13, 17$ ?",
      r"Une suite est arithmétique si la **différence entre termes consécutifs** est constante. Vérification : $9-5 = 4$, $13-9 = 4$, $17-13 = 4$. La raison est $r = 4$. **Piège classique** : confondre le premier terme (5) avec la raison (4) — la raison est l'écart, pas la valeur de départ."),
  _Cp('arithmetic_seq', r"Si $u_0 = 2$ et $r = 3$, que vaut $u_{10}$ ?",
      r"Terme général d'une suite arithmétique : $u_n = u_0 + n r$. Application : $u_{10} = 2 + 10 \times 3 = 32$. **Attention** : c'est $n r$, pas $(n-1) r$ — la formule part de $u_0$. Si on partait de $u_1$, la formule serait $u_n = u_1 + (n-1) r$."),
  _Cp('arithmetic_seq', r"Somme de $1 + 2 + \dots + 10$ ?",
      r"**Formule de Gauss** : $1 + 2 + \dots + n = \dfrac{n(n+1)}{2}$. Avec $n = 10$ : $S = \dfrac{10 \times 11}{2} = 55$. Forme générale d'une somme arithmétique : (nombre de termes) × (premier + dernier) / 2. Ici : $10 \times (1+10)/2 = 55$ ✓."),
  // geometric_seq
  _Cp('geometric_seq', r"Dans $2, 6, 18, 54$, on multiplie chaque terme par :",
      r"Suite géométrique : le **rapport entre termes consécutifs** est constant. Calcul : $6/2 = 3$, $18/6 = 3$, $54/18 = 3$. Raison $q = 3$. **Piège** : ne pas confondre raison géométrique (multiplication) et raison arithmétique (addition)."),
  _Cp('geometric_seq', r"Quelle est la raison de $8, 4, 2, 1, 0{,}5$ ?",
      r"Calcul du rapport : $4/8 = 1/2$, $2/4 = 1/2$, etc. Raison $q = 1/2$ — équivalent à diviser par 2. Avec $0 < q < 1$ et $u_0 > 0$, la suite est strictement décroissante vers 0."),
  _Cp('geometric_seq', r"$u_0 = 1$, $q = 3$. Que vaut $u_4$ ?",
      r"Terme général d'une suite géométrique : $u_n = u_0 \cdot q^n$. On part de $u_0 = 1$ et on multiplie par $q = 3$ exactement 4 fois : $u_4 = 1 \cdot 3^4 = 81$. **Vérification** par énumération : $u_0 = 1, u_1 = 3, u_2 = 9, u_3 = 27, u_4 = 81$ ✓."),
  _Cp('geometric_seq', r"Que vaut $1 + 1/2 + 1/4 + \dots$ (somme infinie, $|q|<1$) ?",
      r"**Somme infinie d'une suite géométrique** avec $|q| < 1$ : $S = \dfrac{u_0}{1 - q}$. Ici $u_0 = 1$, $q = 1/2$ : $S = \dfrac{1}{1 - 1/2} = 2$. **Intuition** : chaque terme ajoute la moitié de ce qui restait — paradoxe de Zénon résolu."),
  // seq_convergence
  _Cp('seq_convergence', r"$\lim 1/n^2$ vaut :",
      r"Quand $n \to +\infty$, $n^2 \to +\infty$ encore plus vite. Une fraction « constante / quelque chose qui tend vers $+\infty$ » tend vers 0. **Plus généralement** : pour tout $\alpha > 0$, $\lim 1/n^\alpha = 0$. Pilier des théorèmes de comparaison."),
  _Cp('seq_convergence', r"$\lim (0{,}5)^n$ vaut :",
      r"Suite géométrique de raison $|q| = 0{,}5 < 1$, donc $q^n \to 0$. **Règle générale** : $q^n \to 0$ ssi $|q| < 1$ ; $\to +\infty$ si $q > 1$ ; $= 1$ si $q = 1$ ; pas de limite si $q \le -1$ (oscillations)."),
  _Cp('seq_convergence', r"$\lim 2^n$ vaut :",
      r"Suite géométrique de raison $q = 2 > 1$, croissance exponentielle, $\lim 2^n = +\infty$. Comparaison : $2^{10} = 1024$, $2^{20} \approx 10^6$, $2^{30} \approx 10^9$. Cette croissance bat tout polynôme à long terme."),
  _Cp('seq_convergence', r"Le théorème des gendarmes sert à :",
      r"**Théorème des gendarmes** : si $a_n \le u_n \le b_n$ et $\lim a_n = \lim b_n = \ell$, alors $\lim u_n = \ell$. Permet de prouver une convergence par encadrement. Application : encadrer $\sin(n)/n$ par $\pm 1/n \to 0$, donc $u_n \to 0$. Le théorème prouve l'existence de la limite, pas sa valeur (donnée par les gardiens)."),
  // seq_recursive
  _Cp('seq_recursive', r"Si $f$ est continue et $u_n \to \ell$, alors :",
      r"Si $u_{n+1} = f(u_n)$ avec $f$ continue, on passe à la limite : $\ell = f(\ell)$ — équation des points fixes. **Méthode standard** pour trouver les limites d'une suite récurrente. Mais attention : cela suppose que la limite existe — il faut le démontrer séparément (monotonie + bornes)."),
  _Cp('seq_recursive', r"Pour conclure à la convergence d'une suite récurrente, on cherche typiquement à montrer qu'elle est :",
      r"**Théorème de la limite monotone** : toute suite monotone et bornée converge. Croissante + majorée → converge ; décroissante + minorée → converge. C'est l'outil principal pour les suites récurrentes en Bac. Sans monotonie ni bornes, on ne peut rien conclure."),
  // seq_adjacent
  _Cp('seq_adjacent', r"Si $(u_n)$ croissante, $(v_n)$ décroissante et $v_n - u_n \to 0$, alors :",
      r"**Théorème des suites adjacentes** : convergence vers la même limite. L'intervalle $[u_n, v_n]$ se rétrécit autour d'un point unique. Application classique : encadrement de $\pi$ par périmètres polygonaux. **Condition essentielle** : $v_n - u_n \to 0$ — sans elle, les limites peuvent différer."),
  // limit_def
  _Cp('limit_def', r"$\lim_{x\to 0} x^2 = ?$",
      r"$x \mapsto x^2$ est polynômiale donc continue partout. Pour une fonction continue, la limite en $a$ vaut $f(a)$. Donc $\lim_{x\to 0} x^2 = 0^2 = 0$. **Toujours essayer la substitution directe avant les techniques avancées** — souvent ça suffit."),
  _Cp('limit_def', r"$\lim_{x\to +\infty} \frac{1}{x} = ?$",
      r"Numérateur fixe, dénominateur $x \to +\infty$. Une fraction « constante / quelque chose qui tend vers $\infty$ » tend vers 0. Cette limite est l'archétype de la décroissance vers 0 à l'infini, fondement des asymptotes horizontales."),
  // limit_calc
  _Cp('limit_calc', r"$\lim_{x\to 4} \frac{x^2-16}{x-4} = ?$",
      r"Substitution en $x = 4$ : $0/0$, forme indéterminée. Factorise via $a^2 - b^2 = (a-b)(a+b)$ : $x^2 - 16 = (x-4)(x+4)$. La fraction se réduit à $x + 4$ (légitime car $x \ne 4$). Limite : $4 + 4 = 8$. **Pattern** : forme $0/0$ → factorisation cachée."),
  _Cp('limit_calc', r"$\lim_{x\to +\infty} \frac{3x+1}{x+5} = ?$",
      r"Forme $\infty/\infty$. **Astuce** : factoriser $x$ haut et bas. $\dfrac{3x+1}{x+5} = \dfrac{3 + 1/x}{1 + 5/x} \to \dfrac{3}{1} = 3$. **Règle rapide** : pour un quotient de polynômes de même degré à l'infini, la limite est le rapport des coefficients dominants."),
  _Cp('limit_calc', r"$\lim_{x\to 0^+} \frac{1}{x} = ?$",
      r"Limite **à droite** ($x \to 0$ avec $x > 0$). Le dénominateur tend vers 0 par valeurs positives, donc $1/x \to +\infty$. **Attention au signe** : la limite à gauche $\lim_{x\to 0^-} 1/x = -\infty$. La limite globale n'existe pas car les limites latérales diffèrent."),
  // continuity
  _Cp('continuity', r"Une fonction $f$ est continue en $a$ ssi :",
      r"Définition formelle : **continuité en $a$** ssi $\lim_{x \to a} f(x) = f(a)$. Trois conditions : (1) $f$ définie en $a$, (2) la limite existe, (3) la limite vaut $f(a)$. Géométriquement : on trace la courbe en passant par $a$ sans lever le crayon."),
  // tvi
  _Cp('tvi', r"Le TVI permet de :",
      r"**TVI** garantit l'**existence** d'une solution sans donner sa valeur. Si $f$ continue sur $[a,b]$ et $k$ entre $f(a)$ et $f(b)$, alors $\exists c \in [a,b] : f(c) = k$. Théorème d'existence pure. **Corollaire le plus utilisé** : $f(a) f(b) < 0$ ⇒ $f$ s'annule au moins une fois entre $a$ et $b$."),
  _Cp('tvi', r"$f$ continue sur $[0,1]$, $f(0) = 3$, $f(1) = -2$. Le TVI garantit qu'il existe $c$ tel que :",
      r"Le TVI s'applique aux valeurs **entre** $f(0) = 3$ et $f(1) = -2$, c'est-à-dire dans $[-2, 3]$. **0 est dans cet intervalle**, donc $\exists c \in ]0, 1[ : f(c) = 0$. Les autres valeurs (5, $-3$, 4) sont en dehors — le TVI ne dit rien d'elles."),
  // deriv_basic
  _Cp('deriv_basic', r"$f'(a)$ représente géométriquement :",
      r"$f'(a)$ est la **pente de la tangente** à la courbe $y = f(x)$ au point $a$. Mathématiquement : limite du taux d'accroissement $\dfrac{f(a+h) - f(a)}{h}$ quand $h \to 0$. **Interprétation physique** : si $f(t)$ est une position, $f'(t)$ est la vitesse instantanée."),
  _Cp('deriv_basic', r"$f(x) = x^2$. Que vaut $f'(3)$ ?",
      r"Règle des puissances $(x^n)' = n x^{n-1}$ avec $n = 2$ : $f'(x) = 2x$. En $x = 3$ : $f'(3) = 6$. La tangente au point $(3, 9)$ a pour équation $y = 6(x-3) + 9 = 6x - 9$."),
  _Cp('deriv_basic', r"$f(x) = 5x + 1$. Que vaut $f'(2)$ ?",
      r"**Dérivée d'une affine** $f(x) = ax + b$ : $f'(x) = a$ partout (constante). La courbe est une droite, donc tangente = courbe = même pente partout. Pour $f(x) = 5x + 1$ : $f'(2) = 5$. Pas de calcul à faire — la valeur ne dépend pas du point."),
  // deriv_rules
  _Cp('deriv_rules', r"$(uv)' = ?$",
      r"**Règle du produit** : $(uv)' = u'v + uv'$ — pas $u'v'$ (erreur classique). Démonstration intuitive : la variation du rectangle $u \times v$ vient de la variation de $u$ × $v$, plus celle de $v$ × $u$. Application : $(x e^x)' = e^x + x e^x = (1+x) e^x$."),
  _Cp('deriv_rules', r"$(u/v)' = ?$",
      r"**Règle du quotient** : $(u/v)' = \dfrac{u'v - uv'}{v^2}$. **L'ordre dans le numérateur compte** ($u'v - uv'$, pas l'inverse). Dénominateur toujours $v^2$. Application : $(1/x)' = \dfrac{0 \cdot x - 1 \cdot 1}{x^2} = -1/x^2$ ✓ cohérent avec $(x^{-1})' = -x^{-2}$."),
  _Cp('deriv_rules', r"$(\sin x)' = ?$",
      r"$(\sin x)' = \cos x$. **Astuce mnémotechnique** : sin → cos (sans signe), cos → -sin (avec signe). Pente de $\sin$ en 0 = 1 ($= \cos 0$), s'annule en $\pi/2$, devient $-1$ en $\pi$. Cohérent avec la courbe."),
  _Cp('deriv_rules', r"$(e^x)' = ?$",
      r"$(e^x)' = e^x$ — l'exponentielle est sa propre dérivée. **Propriété caractéristique** : unique solution de $f' = f$ avec $f(0) = 1$. Explique son omniprésence en physique (désintégration, charge de condensateur, croissance) : partout où la vitesse est proportionnelle à la quantité, on tombe sur l'exponentielle."),
  // deriv_apps
  _Cp('deriv_apps', r"Si $f'(x) > 0$ sur un intervalle, $f$ est :",
      r"**Théorème** : $f$ dérivable et $f' > 0$ sur $I$ ⇒ $f$ strictement croissante sur $I$. Pente positive = courbe qui monte. Réciproquement $f' < 0$ ⇒ décroissante, $f' = 0$ ⇒ constante. C'est l'outil clé pour étudier les variations."),
  _Cp('deriv_apps', r"Un extremum local de $f$ se trouve typiquement où :",
      r"**Théorème de Fermat** : un extremum local d'une fonction dérivable est un point où $f'(x) = 0$ — point critique, tangente horizontale. **Réciproque fausse** : $f'(x) = 0$ n'implique pas un extremum (ex : $x^3$ en 0 — point d'inflexion, pas extremum). Pour confirmer, étudier le signe de $f'$ autour."),
  // primitives
  _Cp('primitives', r"Une primitive de $x^2$ est :",
      r"Règle : $\int x^n\,dx = \dfrac{x^{n+1}}{n+1} + C$. Avec $n = 2$ : $\int x^2 = \dfrac{x^3}{3} + C$. **Vérification** : $(x^3/3)' = x^2$ ✓. Toute primitive est définie à une constante près. Pour *une* primitive (pas la), prendre $C = 0$."),
  _Cp('primitives', r"Une primitive de $\cos x$ est :",
      r"Primitive de $\cos x$ = $\sin x$ (à constante près). **Vérification** : $(\sin x)' = \cos x$ ✓. **Piège du signe** : la dérivée de $\cos$ est $-\sin$ (avec signe), mais la primitive de $\cos$ est $+\sin$ (sans signe). Le signe n'apparaît que dans la dérivée du cosinus."),
  // definite_integral
  _Cp('definite_integral', r"$\int_a^b f(x) dx$ représente :",
      r"$\int_a^b f$ = **aire signée** entre la courbe $y = f(x)$ et l'axe Ox sur $[a, b]$. Aire positive si $f > 0$ (courbe au-dessus), négative si $f < 0$. **Aire algébrique**, pas l'aire géométrique stricte. Pour la vraie aire, intégrer $|f(x)|$."),
  _Cp('definite_integral', r"$\int_a^b f = -\int_b^a f$. Vrai ou faux ?",
      r"**Vrai**. Inverser les bornes change le signe : $\int_a^b f = -\int_b^a f$. Cohérent avec $\int_a^a f = 0$ et la relation de Chasles. Si $\int_a^b f = F(b) - F(a)$, alors $\int_b^a f = F(a) - F(b)$ — signe opposé."),
  _Cp('definite_integral', r"$\int_0^2 x\,dx = ?$",
      r"Primitive de $x$ = $x^2/2$. Newton-Leibniz : $\int_0^2 x\,dx = [x^2/2]_0^2 = 2 - 0 = 2$. **Vérification géométrique** : $y = x$ entre 0 et 2 = triangle rectangle, base 2, hauteur 2, aire = $2 \times 2 / 2 = 2$ ✓."),
  // integral_apps
  _Cp('integral_apps', r"L'aire entre $y = x^2$ et $y = 0$ sur $[0,1]$ vaut :",
      r"Aire = $\int_0^1 x^2\,dx = [x^3/3]_0^1 = 1/3$. **Vérification ordre de grandeur** : sur $[0,1]$, $x^2$ varie de 0 à 1, aire ~ 1/3 — cohérent avec $\int_0^1 x^n = 1/(n+1)$."),
  _Cp('integral_apps', r"Une valeur moyenne de $f$ sur $[a,b]$ est :",
      r"**Valeur moyenne** : $\bar{f} = \dfrac{1}{b-a} \int_a^b f$ — hauteur d'un rectangle de largeur $b-a$ ayant même aire que sous la courbe. Si $f(t)$ = vitesse, $\bar{f}$ = vitesse moyenne. **Théorème de la moyenne** : $\exists c \in [a,b] : f(c) = \bar{f}$ (pour $f$ continue)."),
  // prob_basic
  _Cp('prob_basic', r"On lance un dé à 6 faces. Probabilité d'obtenir un 3 ?",
      r"Dé équilibré : chaque face équiprobable, probabilité $1/6$. **Définition probabilité uniforme** : $P(A) = \dfrac{\text{cas favorables}}{\text{cas possibles}}$. Valable seulement quand toutes les issues sont équiprobables (dé non truqué)."),
  _Cp('prob_basic', r"Si $P(A) = 0{,}3$, alors $P(\bar{A}) = ?$",
      r"$P(A) + P(\bar{A}) = 1$ (l'un ou l'autre se produit toujours). Donc $P(\bar{A}) = 1 - 0{,}3 = 0{,}7$. **Astuce** : passer au complémentaire est souvent plus simple — pour « au moins un », calculer « aucun » et soustraire."),
  _Cp('prob_basic', r"$P(A \cup B) = ?$ (général)",
      r"**Inclusion-exclusion** : $P(A \cup B) = P(A) + P(B) - P(A \cap B)$. On retire $P(A \cap B)$ pour ne pas compter deux fois les issues communes. **Cas particulier** : si $A, B$ incompatibles ($A \cap B = \emptyset$), $P(A \cup B) = P(A) + P(B)$. Erreur classique : oublier le terme négatif et obtenir $P > 1$."),
  // conditional_prob
  _Cp('conditional_prob', r"$P(A | B) = ?$",
      r"**Probabilité conditionnelle** : $P(A|B) = \dfrac{P(A \cap B)}{P(B)}$ (pour $P(B) > 0$). On se restreint à l'univers où $B$ s'est réalisé. **Réécriture** : $P(A \cap B) = P(B) \cdot P(A|B)$ — utile pour les arbres pondérés."),
  _Cp('conditional_prob', r"$A$ et $B$ sont indépendants ssi :",
      r"$A, B$ **indépendants** ⇔ $P(A \cap B) = P(A) \cdot P(B)$, ou équivalent $P(A|B) = P(A)$. **Indépendance ≠ incompatibilité** : indépendant = sans influence ; incompatible = ne peuvent coexister. Deux notions distinctes."),
  // random_variables
  _Cp('random_variables', r"L'espérance $E(X)$ représente :",
      r"**Espérance** = valeur moyenne sur un grand nombre d'expériences. Pour discrète : $E(X) = \sum x_i P(X = x_i)$. Si on parie sur $X$, $E(X)$ est l'espéré gain. **Exemple** : dé 6 faces, $E = (1+2+3+4+5+6)/6 = 3{,}5$."),
  _Cp('random_variables', r"$V(X) = ?$ en fonction de $E(X)$",
      r"**Variance** = mesure de dispersion. Formule de König : $V(X) = E(X^2) - (E(X))^2$. Plus pratique en pratique que $E((X - E(X))^2)$. **Écart-type** $\sigma = \sqrt{V}$ a les mêmes unités que $X$. $V = 0$ ⇔ $X$ constante."),
  // complex_basics
  _Cp('complex_basics', r"$i^2 = ?$",
      r"Définition : $i^2 = -1$. C'est ce qui distingue $\mathbb{C}$ de $\mathbb{R}$. **Conséquences** : $i^3 = -i$, $i^4 = 1$, cycle de période 4 : $1, i, -1, -i, 1, \dots$. Très utile pour simplifier $i^n$ quand $n$ est grand."),
  _Cp('complex_basics', r"$|3 + 4i| = ?$",
      r"**Module** : $|a + bi| = \sqrt{a^2 + b^2}$ = distance à l'origine. Pour $3 + 4i$ : $|z| = \sqrt{9 + 16} = \sqrt{25} = 5$. **Astuce** : reconnaître le triplet pythagoricien $(3, 4, 5)$ — courant dans les exercices."),
  _Cp('complex_basics', r"Conjugué de $2 - 3i$ ?",
      r"**Conjugué** : $\overline{a + bi} = a - bi$ (signe imaginaire changé). $\overline{2 - 3i} = 2 + 3i$. **Propriétés** : $z \bar{z} = a^2 + b^2 = |z|^2$ (réel positif) ; $\overline{\bar{z}} = z$. Sert à simplifier $1/(a+bi)$ par multiplication par le conjugué."),
  // complex_trig
  _Cp('complex_trig', r"Forme trigonométrique de $1 + i$ ?",
      r"Module : $|1+i| = \sqrt{2}$. Argument : $\tan\theta = 1$, $z$ en quadrant 1, donc $\theta = \pi/4$. Forme : $1 + i = \sqrt{2}(\cos(\pi/4) + i\sin(\pi/4)) = \sqrt{2} e^{i\pi/4}$."),
  _Cp('complex_trig', r"Avec $z = re^{i\theta}$, $z^n = ?$",
      r"**Formule de Moivre** : $z^n = r^n e^{in\theta}$. Multiplier les modules, additionner les arguments. **Application typique** : $(1+i)^4 = (\sqrt{2})^4 e^{i\pi} = 4 \times (-1) = -4$ — calcul instantané vs développement laborieux."),
  // complex_geometry
  _Cp('complex_geometry', r"Le module $|z_B - z_A|$ représente :",
      r"$|z_B - z_A|$ = **distance** entre les points $A, B$ d'affixes $z_A, z_B$. C'est le module appliqué au vecteur $\vec{AB}$ d'affixe $z_B - z_A$. **Application** : alignement, équidistance, identification de triangles particuliers — calculer des modules."),
  _Cp('complex_geometry', r"$\arg(z_B - z_A)$ représente :",
      r"$\arg(z_B - z_A)$ = **angle** du vecteur $\vec{AB}$ avec l'axe Ox, sens trigonométrique. Avec le module, donne les coordonnées polaires de $\vec{AB}$. **Application** : identifier triangles équilatéraux, rectangles, etc."),
  // ode_first_order
  _Cp('ode_first_order', r"Solution générale de $y' = ky$ ?",
      r"$y' = ky$ → solution générale $y(x) = C e^{kx}$, $C \in \mathbb{R}$. Naturellement exponentielle : la dérivée proportionnelle à la fonction caractérise $\exp$. $C$ déterminée par condition initiale. Modélise désintégration ($k<0$), croissance ($k>0$)."),
  _Cp('ode_first_order', r"Solution de $y' + 2y = 0$, $y(0) = 5$ ?",
      r"$y' + 2y = 0 \iff y' = -2y$. Solution générale : $y = C e^{-2x}$. Condition $y(0) = C = 5$. Donc $y(x) = 5 e^{-2x}$. **Vérification** : $y' = -10 e^{-2x} = -2y$ ✓."),
  // ode_second_order
  _Cp('ode_second_order', r"$y'' + \omega^2 y = 0$ a pour solutions :",
      r"**Oscillateur harmonique** : $y(x) = A\cos(\omega x) + B\sin(\omega x)$. **Vérification** : $(\cos\omega x)'' = -\omega^2 \cos\omega x$ ✓. Modélise pendule (petites oscillations), ressort idéal, circuit LC. Pulsation $\omega$ → période $T = 2\pi/\omega$."),
  // kinematics
  _Cp('kinematics', r"L'accélération est la dérivée de :",
      r"**Accélération** $a(t) = dv/dt$ = dérivée de la vitesse. Aussi : dérivée seconde de la position, $a = d^2x/dt^2$. Mémo : position $\to$ vitesse $\to$ accélération (dériver). Inversement : intégrer $a$ → $v$ → $x$."),
  _Cp('kinematics', r"En MRUA, $v(t) = ?$",
      r"**MRUA** = Mouvement Rectiligne Uniformément Accéléré, $a$ = constante. Par intégration : $v(t) = v_0 + at$. Position : $x(t) = x_0 + v_0 t + \dfrac{1}{2} a t^2$. Application : chute libre ($g \approx 9{,}8$ m/s², la vitesse augmente d'environ 10 m/s par seconde)."),
  // newtons_laws
  _Cp('newtons_laws', r"$\sum \vec{F} = ?$ (2ème loi de Newton)",
      r"**2ème loi de Newton** : $\sum \vec{F} = m \vec{a}$. Somme vectorielle des forces = masse × accélération. Équation fondamentale de la dynamique. Si $\sum \vec{F} = \vec{0}$ → équilibre dynamique ($\vec{a} = 0$, MRU) ; si une force unique $F$ → $a = F/m$."),
  _Cp('newtons_laws', r"Principe d'inertie (1ère loi) :",
      r"**1ère loi (inertie)** : $\sum \vec{F} = \vec{0}$ → mouvement rectiligne uniforme ou repos. Tout changement de vitesse ⇒ force non nulle. **Conséquence** : pas besoin de force pour maintenir un mouvement, c'est l'inertie qui le fait — révolution conceptuelle d'Aristote à Newton."),
  // energy
  _Cp('energy', r"Énergie cinétique $E_c = ?$",
      r"$E_c = \dfrac{1}{2} m v^2$ — proportionnelle à $v^2$ (pas $v$ !). Doubler la vitesse quadruple $E_c$. Unité : J (joule). **Application** : véhicule à 100 km/h a 4× l'énergie d'un à 50 km/h — d'où la croissance rapide de la distance de freinage."),
  _Cp('energy', r"Théorème de l'énergie cinétique :",
      r"$\Delta E_c = W_{\text{forces}}$ — variation d'énergie cinétique = somme des travaux des forces. Convertit un problème dynamique en un problème énergétique scalaire (plus simple). **Application** : calculer la vitesse en bas d'un toboggan sans résoudre l'équation de mouvement."),
  // wave_properties
  _Cp('wave_properties', r"$v = \lambda f$ relie :",
      r"**Relation fondamentale des ondes** : vitesse = longueur d'onde × fréquence. Universelle (mécaniques, électromagnétiques, matière). Pour la lumière dans le vide : $v = c \approx 3 \times 10^8$ m/s. Une couleur de $\lambda = 500$ nm a $f = c/\lambda = 6 \times 10^{14}$ Hz."),
  // sound_light
  _Cp('sound_light', r"La diffraction est observable quand :",
      r"**Diffraction** observable quand l'ouverture/obstacle a une dimension de l'ordre de $\lambda$. Critère : $a \lesssim \lambda$ → diffraction nette. **Exemple** : on entend le son derrière un mur ($\lambda \sim 1$ m) mais on ne voit pas ($\lambda \sim 500$ nm, beaucoup plus petit que le mur)."),
  // rc_rl_circuits
  _Cp('rc_rl_circuits', r"Constante de temps d'un circuit RC : $\tau = ?$",
      r"$\tau = RC$ (s, avec R en Ω, C en F). À $t = \tau$, condensateur chargé à 63% ($1 - e^{-1}$) ; à $5\tau$, plus de 99% — régime établi. **Mémo** : $\tau$ grand = lent, $\tau$ petit = rapide. Pour RL : $\tau = L/R$."),
  // rlc_oscillations
  _Cp('rlc_oscillations', r"Pulsation propre LC : $\omega_0 = ?$",
      r"$\omega_0 = \dfrac{1}{\sqrt{LC}}$. Période $T_0 = 2\pi\sqrt{LC}$. **Analogie mécanique** : $L$ = masse (inertie), $C$ = inverse de la raideur. LC = oscillateur harmonique électrique. Avec résistance, oscillations amorties."),
  // acid_base
  _Cp('acid_base', r"$pH = -\log_{10}([H_3O^+])$. Si $[H_3O^+] = 10^{-3}$ mol/L, $pH = ?$",
      r"$pH = -\log_{10}(10^{-3}) = 3$. **Mémo** : pH = exposant changé de signe. Acide ($pH < 7$) : forte $[H_3O^+]$. Basique ($pH > 7$) : faible. **Échelle log** : $\Delta pH = 1$ ⇔ facteur 10 sur $[H_3O^+]$."),
  _Cp('acid_base', r"Une solution avec $pH = 13$ est :",
      r"$pH = 13 > 7$ : **fortement basique** (proche de 14, la limite haute). $[H_3O^+] = 10^{-13}$ mol/L. Exemples : soude concentrée, lessive. À l'inverse : $pH \le 1$ = fortement acide. $pH = 7$ = neutre."),
  // redox
  _Cp('redox', r"Une oxydation est :",
      r"**Oxydation** = perte d'électrons. Notation : $Red \to Ox + ne^-$. **Mémo OIL RIG** : Oxidation Is Loss, Reduction Is Gain. Exemple : $Zn \to Zn^{2+} + 2e^-$. Réduction = gain. Les deux simultanément dans une réaction redox."),
  _Cp('redox', r"Dans une pile, l'anode est le siège de :",
      r"À l'**anode** (pôle **négatif** d'une pile) : **oxydation**. L'espèce y perd des électrons qui partent dans le circuit. **Mémo** : Anode → ox**A**ydation ; **C**athode → ré**du**ction. À la cathode (pôle +), arrivée des électrons et réduction."),
];

// --------------------------------------------------------------------------
// SQL emission
// --------------------------------------------------------------------------

String _sqlEscape(String s) => s.replaceAll("'", "''");

String _emitMigration({
  required String migrationNumber,
  required String filiere,
  required String tableSuffix,
  required List<_Cp> checkpoints,
  required List<_Ti> tryIts,
}) {
  final buf = StringBuffer();
  buf.writeln('-- Migration $migrationNumber: expanded checkpoint explanations and try-it solutions for $filiere lessons.');
  buf.writeln('-- Auto-generated by json_encode_lesson_explanations_v2.dart.');
  buf.writeln('-- Surgically patches skills.lesson JSONB without re-emitting the full lesson.');
  buf.writeln('BEGIN;');
  buf.writeln();

  // Helper functions, suffixed per migration to avoid collision.
  buf.writeln('CREATE OR REPLACE FUNCTION public._patch_cp_$tableSuffix(');
  buf.writeln('    p_skill_code TEXT,');
  buf.writeln('    p_stem_fr TEXT,');
  buf.writeln('    p_new_explanation TEXT');
  buf.writeln(') RETURNS BOOLEAN AS \$\$');
  buf.writeln('DECLARE');
  buf.writeln('    v_lesson JSONB;');
  buf.writeln('    v_section_idx INT;');
  buf.writeln('    v_block_idx INT;');
  buf.writeln('    v_question_idx INT;');
  buf.writeln('    v_block JSONB;');
  buf.writeln('    v_questions JSONB;');
  buf.writeln('    v_question JSONB;');
  buf.writeln('    v_found BOOLEAN := FALSE;');
  buf.writeln('    v_n_sections INT;');
  buf.writeln('    v_n_blocks INT;');
  buf.writeln('    v_n_questions INT;');
  buf.writeln('BEGIN');
  buf.writeln('    SELECT lesson INTO v_lesson FROM public.skills WHERE code = p_skill_code;');
  buf.writeln('    IF v_lesson IS NULL OR v_lesson->\'sections\' IS NULL THEN RETURN FALSE; END IF;');
  buf.writeln('    v_n_sections := jsonb_array_length(v_lesson->\'sections\');');
  buf.writeln('    FOR v_section_idx IN 0..(v_n_sections - 1) LOOP');
  buf.writeln('        IF v_lesson->\'sections\'->v_section_idx->\'blocks\' IS NULL THEN CONTINUE; END IF;');
  buf.writeln('        v_n_blocks := jsonb_array_length(v_lesson->\'sections\'->v_section_idx->\'blocks\');');
  buf.writeln('        FOR v_block_idx IN 0..(v_n_blocks - 1) LOOP');
  buf.writeln('            v_block := v_lesson->\'sections\'->v_section_idx->\'blocks\'->v_block_idx;');
  buf.writeln('            IF v_block->>\'kind\' <> \'checkpoint\' THEN CONTINUE; END IF;');
  buf.writeln('            v_questions := v_block->\'questions\';');
  buf.writeln('            IF v_questions IS NULL THEN CONTINUE; END IF;');
  buf.writeln('            v_n_questions := jsonb_array_length(v_questions);');
  buf.writeln('            FOR v_question_idx IN 0..(v_n_questions - 1) LOOP');
  buf.writeln('                v_question := v_questions->v_question_idx;');
  buf.writeln('                IF v_question->>\'stem_fr\' = p_stem_fr THEN');
  buf.writeln('                    v_lesson := jsonb_set(');
  buf.writeln('                        v_lesson,');
  buf.writeln('                        ARRAY[\'sections\', v_section_idx::text, \'blocks\', v_block_idx::text, \'questions\', v_question_idx::text, \'explanation_fr\'],');
  buf.writeln('                        to_jsonb(p_new_explanation)');
  buf.writeln('                    );');
  buf.writeln('                    v_found := TRUE;');
  buf.writeln('                END IF;');
  buf.writeln('            END LOOP;');
  buf.writeln('        END LOOP;');
  buf.writeln('    END LOOP;');
  buf.writeln('    IF v_found THEN');
  buf.writeln('        UPDATE public.skills SET lesson = v_lesson WHERE code = p_skill_code;');
  buf.writeln('    END IF;');
  buf.writeln('    RETURN v_found;');
  buf.writeln('END;');
  buf.writeln('\$\$ LANGUAGE plpgsql;');
  buf.writeln();

  buf.writeln('CREATE OR REPLACE FUNCTION public._patch_tryit_$tableSuffix(');
  buf.writeln('    p_skill_code TEXT,');
  buf.writeln('    p_problem_fr TEXT,');
  buf.writeln('    p_new_hint TEXT,');
  buf.writeln('    p_new_solution TEXT');
  buf.writeln(') RETURNS BOOLEAN AS \$\$');
  buf.writeln('DECLARE');
  buf.writeln('    v_lesson JSONB;');
  buf.writeln('    v_section_idx INT;');
  buf.writeln('    v_block_idx INT;');
  buf.writeln('    v_block JSONB;');
  buf.writeln('    v_found BOOLEAN := FALSE;');
  buf.writeln('    v_n_sections INT;');
  buf.writeln('    v_n_blocks INT;');
  buf.writeln('BEGIN');
  buf.writeln('    SELECT lesson INTO v_lesson FROM public.skills WHERE code = p_skill_code;');
  buf.writeln('    IF v_lesson IS NULL OR v_lesson->\'sections\' IS NULL THEN RETURN FALSE; END IF;');
  buf.writeln('    v_n_sections := jsonb_array_length(v_lesson->\'sections\');');
  buf.writeln('    FOR v_section_idx IN 0..(v_n_sections - 1) LOOP');
  buf.writeln('        IF v_lesson->\'sections\'->v_section_idx->\'blocks\' IS NULL THEN CONTINUE; END IF;');
  buf.writeln('        v_n_blocks := jsonb_array_length(v_lesson->\'sections\'->v_section_idx->\'blocks\');');
  buf.writeln('        FOR v_block_idx IN 0..(v_n_blocks - 1) LOOP');
  buf.writeln('            v_block := v_lesson->\'sections\'->v_section_idx->\'blocks\'->v_block_idx;');
  buf.writeln('            IF v_block->>\'kind\' <> \'try_it\' THEN CONTINUE; END IF;');
  buf.writeln('            IF v_block->>\'problem_fr\' = p_problem_fr THEN');
  buf.writeln('                v_lesson := jsonb_set(');
  buf.writeln('                    v_lesson,');
  buf.writeln('                    ARRAY[\'sections\', v_section_idx::text, \'blocks\', v_block_idx::text, \'hint_fr\'],');
  buf.writeln('                    to_jsonb(p_new_hint)');
  buf.writeln('                );');
  buf.writeln('                v_lesson := jsonb_set(');
  buf.writeln('                    v_lesson,');
  buf.writeln('                    ARRAY[\'sections\', v_section_idx::text, \'blocks\', v_block_idx::text, \'solution_fr\'],');
  buf.writeln('                    to_jsonb(p_new_solution)');
  buf.writeln('                );');
  buf.writeln('                v_found := TRUE;');
  buf.writeln('            END IF;');
  buf.writeln('        END LOOP;');
  buf.writeln('    END LOOP;');
  buf.writeln('    IF v_found THEN');
  buf.writeln('        UPDATE public.skills SET lesson = v_lesson WHERE code = p_skill_code;');
  buf.writeln('    END IF;');
  buf.writeln('    RETURN v_found;');
  buf.writeln('END;');
  buf.writeln('\$\$ LANGUAGE plpgsql;');
  buf.writeln();

  // Try-it calls
  for (final t in tryIts) {
    buf.writeln(
        "SELECT public._patch_tryit_$tableSuffix('${_sqlEscape(t.skill)}', '${_sqlEscape(t.problem)}', '${_sqlEscape(t.hint)}', '${_sqlEscape(t.solution)}');");
  }
  buf.writeln();

  // Checkpoint calls
  for (final c in checkpoints) {
    buf.writeln(
        "SELECT public._patch_cp_$tableSuffix('${_sqlEscape(c.skill)}', '${_sqlEscape(c.stem)}', '${_sqlEscape(c.expanded)}');");
  }
  buf.writeln();

  // Cleanup
  buf.writeln('DROP FUNCTION public._patch_cp_$tableSuffix(TEXT, TEXT, TEXT);');
  buf.writeln('DROP FUNCTION public._patch_tryit_$tableSuffix(TEXT, TEXT, TEXT, TEXT);');
  buf.writeln();

  buf.writeln('COMMIT;');
  return buf.toString();
}

void main() {
  final smaCheckpointsAll = [..._smaCheckpoints, ..._smaCheckpoints2];
  final smaSql = _emitMigration(
    migrationNumber: '025',
    filiere: 'SMA',
    tableSuffix: 'sma',
    checkpoints: smaCheckpointsAll,
    tryIts: _smaTryIts,
  );
  File('backend/supabase/migrations/025_lessons_sma_expanded_solutions.sql')
      .writeAsStringSync(smaSql);
  stdout.writeln(
      'Wrote backend/supabase/migrations/025_lessons_sma_expanded_solutions.sql '
      '(${smaCheckpointsAll.length} checkpoints, ${_smaTryIts.length} try-its).');

  final smbSql = _emitMigration(
    migrationNumber: '026',
    filiere: 'SMB',
    tableSuffix: 'smb',
    checkpoints: _smbCheckpoints,
    tryIts: _smbTryIts,
  );
  File('backend/supabase/migrations/026_lessons_smb_expanded_solutions.sql')
      .writeAsStringSync(smbSql);
  stdout.writeln(
      'Wrote backend/supabase/migrations/026_lessons_smb_expanded_solutions.sql '
      '(${_smbCheckpoints.length} checkpoints, ${_smbTryIts.length} try-its).');
}
