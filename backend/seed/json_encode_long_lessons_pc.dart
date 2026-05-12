// Phase 3.3 encoder: long-form (v2) lessons for the 31 PC chapters.
//
// Mirrors json_encode_long_lessons_smb.dart structure. Replaces the stub
// lessons created by migration 032 (which contained only an intro paragraph)
// with full LessonV2 content: prerequisite → concept → example → checkpoint.
//
// Depth: matches SMB lessons (lighter than SMA — less abstract proof, gentler
// checkpoint difficulty). Each lesson has 2-3 sections, paragraphs/formulas/
// examples, and one final checkpoint of 3 mcq questions.
//
// Output: backend/supabase/migrations/033_long_lessons_pc.sql
// Run: dart backend/seed/json_encode_long_lessons_pc.dart

import 'dart:convert';
import 'dart:io';

// ============================================================================
// Builders
// ============================================================================

Map<String, dynamic> _lesson({
  required String titleFr,
  String? subtitleFr,
  required List<Map<String, dynamic>> sections,
}) =>
    {
      'version': 2,
      'title_fr': titleFr,
      if (subtitleFr != null) 'subtitle_fr': subtitleFr,
      'sections': sections,
    };

Map<String, dynamic> _section({
  required String kind,
  required String titleFr,
  String? eyebrowFr,
  required String estimatedMinutes,
  required List<Map<String, dynamic>> blocks,
}) =>
    {
      'kind': kind,
      'title_fr': titleFr,
      if (eyebrowFr != null) 'eyebrow_fr': eyebrowFr,
      'estimated_minutes': estimatedMinutes,
      'blocks': blocks,
    };

Map<String, dynamic> _p(String md) => {'kind': 'paragraph', 'md': md};
Map<String, dynamic> _f(String latex, [String? caption]) =>
    {'kind': 'formula', 'latex': latex, if (caption != null) 'caption_fr': caption};
Map<String, dynamic> _callout(String tone, String title, String body) =>
    {'kind': 'callout', 'tone': tone, 'title_fr': title, 'body_fr': body};
Map<String, dynamic> _example({
  required String title,
  required String problem,
  required List<String> steps,
  String? answer,
}) =>
    {
      'kind': 'example',
      'title_fr': title,
      'problem_fr': problem,
      'steps_fr': steps,
      if (answer != null) 'answer_fr': answer,
    };
Map<String, dynamic> _checkpoint(String title, List<Map<String, dynamic>> qs) =>
    {'kind': 'checkpoint', 'title_fr': title, 'questions': qs};
Map<String, dynamic> _q({
  required String stem,
  required List<String> choices,
  required int correct,
  required String explanation,
}) =>
    {
      'stem_fr': stem,
      'choices_fr': choices,
      'correct_index': correct,
      'explanation_fr': explanation,
    };

// ============================================================================
// PC Math lessons (15 chapters)
// ============================================================================

Map<String, dynamic> _pcArithmeticGeomSeq() => _lesson(
      titleFr: 'Suites arithmétiques et géométriques',
      subtitleFr: 'Raison additive ou multiplicative, terme général, sommes.',
      sections: [
        _section(kind: 'concept', titleFr: 'Suites arithmétiques', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _p("Une suite est **arithmétique** si l'on passe d'un terme au suivant en **ajoutant** toujours le même nombre \$r\$ (la **raison**)."),
          _f("u_{n+1} = u_n + r \\qquad u_n = u_0 + n r", "Définitions par récurrence et explicite."),
          _f("S_n = (n+1) \\cdot \\frac{u_0 + u_n}{2}", "Somme de Gauss : (nombre de termes) × (premier + dernier) / 2."),
          _example(
            title: "Identifier et sommer",
            problem: "Calcule \$1 + 2 + 3 + \\dots + 100\$.",
            steps: [
              "Suite arithmétique \$u_n = n+1\$ avec \$u_0=1\$, \$u_{99}=100\$, raison \$r=1\$.",
              "100 termes : \$S = 100 \\times (1+100)/2 = 5050\$.",
            ],
            answer: "\$S = 5050\$.",
          ),
        ]),
        _section(kind: 'concept', titleFr: 'Suites géométriques', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _p("Une suite est **géométrique** si l'on passe d'un terme au suivant en **multipliant** par un même nombre \$q\$ (la **raison**)."),
          _f("u_{n+1} = u_n \\cdot q \\qquad u_n = u_0 \\cdot q^n", "Définitions."),
          _f("S_n = u_0 \\cdot \\frac{1 - q^{n+1}}{1 - q} \\quad (q \\ne 1)", "Somme géométrique."),
          _callout('insight', 'Comportement à l\'infini',
              "Si \$|q| < 1\$ : \$u_n \\to 0\$. Si \$q > 1\$ : \$u_n \\to +\\infty\$. Si \$q \\le -1\$ : oscille (pas de limite)."),
          _checkpoint("Suites arithmétiques et géométriques", [
            _q(stem: "Raison de la suite \$5, 9, 13, 17, \\dots\$ ?", choices: ['3', '4', '5', '9'], correct: 1, explanation: "\$9 - 5 = 4\$ (différence constante)."),
            _q(stem: "\$u_0 = 2\$, \$q = 3\$. Que vaut \$u_3\$ ?", choices: ['27', '54', '81', '162'], correct: 1, explanation: "\$u_3 = 2 \\cdot 3^3 = 54\$."),
            _q(stem: "Somme \$1+2+\\dots+50\$ ?", choices: ['1225', '1275', '2550', '2500'], correct: 1, explanation: "\$50 \\times 51/2 = 1275\$."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcSeqConvergence() => _lesson(
      titleFr: 'Convergence des suites',
      subtitleFr: 'Limite, théorème des gendarmes, monotonie + bornes.',
      sections: [
        _section(kind: 'concept', titleFr: 'Définition de la limite', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _p("Une suite \$(u_n)\$ **converge vers** \$\\ell\$ si \$u_n\$ se rapproche autant qu'on veut de \$\\ell\$ pour \$n\$ grand. Si la limite est \$\\pm\\infty\$ ou n'existe pas, la suite **diverge**."),
          _f("\\lim_{n \\to +\\infty} \\frac{1}{n^\\alpha} = 0 \\quad (\\alpha > 0)", "Suite de référence : \$1/n, 1/n^2, 1/\\sqrt n\$ tendent vers 0."),
          _f("\\lim q^n = 0 \\text{ si } |q| < 1, \\quad = +\\infty \\text{ si } q > 1", "Suite géométrique."),
        ]),
        _section(kind: 'concept', titleFr: 'Théorèmes utiles', eyebrowFr: 'THÉORÈMES', estimatedMinutes: '5', blocks: [
          _p("**Théorème des gendarmes** : si \$a_n \\le u_n \\le b_n\$ avec \$a_n, b_n \\to \\ell\$, alors \$u_n \\to \\ell\$."),
          _p("**Théorème de la limite monotone** : toute suite croissante majorée (ou décroissante minorée) **converge**."),
          _example(
            title: "Gendarmes",
            problem: "Calcule \$\\lim \\dfrac{\\sin n}{n}\$.",
            steps: [
              "\$-1 \\le \\sin n \\le 1\$, donc \$-1/n \\le \\sin n / n \\le 1/n\$.",
              "Les bornes tendent vers 0 → par gendarmes, limite = 0.",
            ],
            answer: "0.",
          ),
          _checkpoint("Convergence", [
            _q(stem: "\$\\lim_{n \\to \\infty} 1/n^2\$ vaut :", choices: ['0', '1', '∞', "n'existe pas"], correct: 0, explanation: "\$1/n^\\alpha \\to 0\$ pour tout \$\\alpha > 0\$."),
            _q(stem: "\$\\lim (1/2)^n\$ vaut :", choices: ['0', '1/2', '1', '∞'], correct: 0, explanation: "\$|q| < 1\$ → \$q^n \\to 0\$."),
            _q(stem: "Une suite croissante majorée :", choices: ['diverge', 'oscille', 'converge', 'tend vers 0'], correct: 2, explanation: "Théorème de la limite monotone."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcSeqRecursive() => _lesson(
      titleFr: 'Suites récurrentes',
      subtitleFr: 'Point fixe, suites arithmético-géométriques.',
      sections: [
        _section(kind: 'concept', titleFr: 'Récurrence \$u_{n+1} = f(u_n)\$', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("Une suite **récurrente** est définie par \$u_0\$ et une relation \$u_{n+1} = f(u_n)\$. Le calcul donne \$u_0, u_1, u_2, \\dots\$ de proche en proche."),
          _p("Un **point fixe** \$\\ell\$ vérifie \$\\ell = f(\\ell)\$. Si la suite converge, sa limite est un point fixe — mais l'existence d'un point fixe ne suffit pas à prouver la convergence."),
          _callout('warning', 'Stratégie standard',
              "Pour étudier la convergence : (1) trouver le(s) point(s) fixe(s), (2) montrer monotonie + bornes par récurrence, (3) conclure par le théorème de la limite monotone."),
        ]),
        _section(kind: 'concept', titleFr: 'Arithmético-géométrique', eyebrowFr: 'ASTUCE', estimatedMinutes: '4', blocks: [
          _p("Pour \$u_{n+1} = a u_n + b\$ avec \$a \\ne 1\$ : trouver le point fixe \$\\ell = b/(1-a)\$, puis poser \$v_n = u_n - \\ell\$. Alors \$(v_n)\$ est **géométrique** de raison \$a\$."),
          _example(
            title: "Méthode du point fixe",
            problem: "Soit \$u_0 = 0\$ et \$u_{n+1} = 3 u_n - 4\$. Donner \$u_n\$ explicite.",
            steps: [
              "Point fixe : \$\\ell = 3\\ell - 4 \\Rightarrow \\ell = 2\$.",
              "Poser \$v_n = u_n - 2\$. Alors \$v_{n+1} = 3 v_n\$, géométrique de raison 3.",
              "\$v_0 = -2\$ → \$v_n = -2 \\cdot 3^n\$ → \$u_n = 2 - 2 \\cdot 3^n\$.",
            ],
            answer: "\$u_n = 2 - 2 \\cdot 3^n\$.",
          ),
          _checkpoint("Suites récurrentes", [
            _q(stem: "Point fixe de \$f(x) = (x+6)/2\$ :", choices: ['2', '4', '6', '8'], correct: 2, explanation: "\$\\ell = (\\ell + 6)/2 \\iff \\ell = 6\$."),
            _q(stem: "Pour \$u_{n+1} = 2 u_n + 3\$, \$\\ell = ?\$", choices: ['-3', '-1', '0', '3'], correct: 0, explanation: "\$\\ell = 2\\ell + 3 \\iff \\ell = -3\$."),
            _q(stem: "Si \$u_n\$ croissante et majorée alors :", choices: ['diverge', 'converge', 'oscille', 'rien'], correct: 1, explanation: "Théorème de la limite monotone."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcLimitCalc() => _lesson(
      titleFr: 'Calcul de limites',
      subtitleFr: 'Substitution, factorisation, quantité conjuguée, croissances comparées.',
      sections: [
        _section(kind: 'concept', titleFr: 'Méthodes de calcul', eyebrowFr: 'MÉTHODES', estimatedMinutes: '5', blocks: [
          _p("**1. Substitution directe** : si \$f\$ est continue en \$a\$, alors \$\\lim_{x \\to a} f(x) = f(a)\$. À tenter en premier."),
          _p("**2. Forme \$0/0\$ avec polynômes** : factoriser par \$(x - a)\$ et simplifier."),
          _p("**3. Forme \$\\infty - \\infty\$ avec racines** : multiplier par la quantité conjuguée."),
          _p("**4. Quotient de polynômes à l'infini** : limite = rapport des coefficients dominants si même degré."),
          _f("\\lim_{x \\to +\\infty} \\frac{e^x}{x^n} = +\\infty, \\quad \\lim_{x \\to +\\infty} \\frac{\\ln x}{x^\\alpha} = 0", "**Croissances comparées** : \$\\exp \\gg x^n \\gg \\ln\$."),
        ]),
        _section(kind: 'example_walkthrough', titleFr: 'Exemples', eyebrowFr: 'EXEMPLES', estimatedMinutes: '5', blocks: [
          _example(
            title: "Forme 0/0",
            problem: "Calcule \$\\lim_{x \\to 2} \\dfrac{x^2 - 4}{x - 2}\$.",
            steps: [
              "Forme \$0/0\$. Factoriser : \$x^2 - 4 = (x-2)(x+2)\$.",
              "\$(x-2)(x+2)/(x-2) = x + 2\$ pour \$x \\ne 2\$.",
              "\$\\lim = 2 + 2 = 4\$.",
            ],
            answer: "4.",
          ),
          _example(
            title: "Conjuguée",
            problem: "Calcule \$\\lim_{x \\to 0} \\dfrac{\\sqrt{1+x} - 1}{x}\$.",
            steps: [
              "Multiplier haut et bas par \$\\sqrt{1+x} + 1\$.",
              "Numérateur devient \$(1+x) - 1 = x\$. Donc fraction = \$1/(\\sqrt{1+x} + 1)\$.",
              "Limite en 0 : \$1/(1+1) = 1/2\$.",
            ],
            answer: "1/2.",
          ),
          _checkpoint("Limites", [
            _q(stem: "\$\\lim_{x \\to 1} \\dfrac{x^2 - 1}{x - 1}\$ vaut :", choices: ['0', '1', '2', "n'existe pas"], correct: 2, explanation: "\$(x-1)(x+1)/(x-1) = x + 1 \\to 2\$."),
            _q(stem: "\$\\lim_{x \\to +\\infty} e^x/x^{100}\$ vaut :", choices: ['0', '1', '∞', '100'], correct: 2, explanation: "Croissances comparées : exp l'emporte."),
            _q(stem: "\$\\lim_{x \\to +\\infty} (3x^2+x)/(x^2+5)\$ :", choices: ['0', '1', '3', '∞'], correct: 2, explanation: "Quotient même degré → coeff dominants : 3/1 = 3."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcContinuityTvi() => _lesson(
      titleFr: 'Continuité et théorème des valeurs intermédiaires',
      subtitleFr: 'Définition, prolongement, TVI, dichotomie.',
      sections: [
        _section(kind: 'concept', titleFr: 'Continuité', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _p("Une fonction \$f\$ est **continue en \$a\$** si \$\\lim_{x \\to a} f(x) = f(a)\$. Elle est continue **sur \$I\$** si elle l'est en tout point de \$I\$."),
          _p("Les fonctions usuelles (polynômes, rationnelles sur leur domaine, \$\\sqrt{\\cdot}\$, \$\\sin\$, \$\\cos\$, \$\\exp\$, \$\\ln\$) sont continues sur leur ensemble de définition. Somme/produit/composée de continues = continue."),
          _p("Si \$f\$ n'est pas définie en \$a\$ mais \$\\lim_{x \\to a} f(x) = \\ell\$ existe, on peut **prolonger** \$f\$ par continuité en posant \$\\tilde f(a) = \\ell\$."),
        ]),
        _section(kind: 'concept', titleFr: 'Théorème des valeurs intermédiaires', eyebrowFr: 'TVI', estimatedMinutes: '5', blocks: [
          _f("f \\text{ continue sur } [a,b], \\, k \\text{ entre } f(a) \\text{ et } f(b) \\Rightarrow \\exists c \\in [a,b] : f(c) = k", "Énoncé."),
          _p("**Corollaire (existence d'une racine)** : si \$f\$ continue, \$f(a) \\cdot f(b) < 0\$, alors \$\\exists c \\in ]a, b[ : f(c) = 0\$."),
          _p("**Unicité** : si en plus \$f\$ est **strictement monotone** sur \$[a, b]\$, la racine est unique."),
          _example(
            title: "Application TVI",
            problem: "Montrer que \$x^3 + 2x - 5 = 0\$ a une racine unique dans \$[1, 2]\$.",
            steps: [
              "\$f(x) = x^3 + 2x - 5\$ continue. \$f(1) = -2 < 0\$, \$f(2) = 7 > 0\$ → TVI donne une racine.",
              "\$f'(x) = 3 x^2 + 2 > 0\$ partout → \$f\$ strictement croissante → racine unique.",
            ],
            answer: "Racine unique dans \$]1, 2[\$.",
          ),
          _checkpoint("Continuité et TVI", [
            _q(stem: "\$f\$ continue, \$f(0) = -1\$, \$f(1) = 3\$. TVI garantit :", choices: ["\$f(c) = 0\$ pour un \$c \\in [0,1]\$", "\$f\$ strictement croissante", "\$f(c) = 5\$", "rien"], correct: 0, explanation: "0 est entre -1 et 3 → TVI."),
            _q(stem: "Quotient (x²-9)/(x-3) en x=3 :", choices: ['continu', 'discontinu, non prolongeable', 'prolongeable par 6', 'prolongeable par 0'], correct: 2, explanation: "Limite = 3+3 = 6 → prolongeable."),
            _q(stem: "Pour montrer l'unicité d'une racine, on utilise :", choices: ['TVI seul', 'monotonie stricte', 'continuité seule', 'rien'], correct: 1, explanation: "TVI donne existence, monotonie donne unicité."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcDerivRules() => _lesson(
      titleFr: 'Règles de dérivation',
      subtitleFr: 'Linéarité, produit, quotient, composition.',
      sections: [
        _section(kind: 'concept', titleFr: 'Définition et dérivées usuelles', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _p("La **dérivée** de \$f\$ en \$a\$ est \$f'(a) = \\lim_{h \\to 0} (f(a+h) - f(a))/h\$ (taux d'accroissement). C'est la pente de la tangente au point \$(a, f(a))\$."),
          _f("(x^n)' = n x^{n-1}, \\quad (\\sqrt x)' = \\frac{1}{2 \\sqrt x}, \\quad (\\sin x)' = \\cos x", "Dérivées de référence."),
          _f("(\\cos x)' = -\\sin x, \\quad (e^x)' = e^x, \\quad (\\ln x)' = \\frac{1}{x}", "Suite."),
        ]),
        _section(kind: 'concept', titleFr: 'Règles de calcul', eyebrowFr: 'RÈGLES', estimatedMinutes: '5', blocks: [
          _f("(u + v)' = u' + v', \\quad (k u)' = k u'", "Linéarité."),
          _f("(uv)' = u' v + u v', \\quad (u/v)' = \\frac{u' v - u v'}{v^2}", "Produit et quotient."),
          _f("(f \\circ g)'(x) = f'(g(x)) \\cdot g'(x)", "**Composition** (règle de la chaîne)."),
          _example(
            title: "Combiner les règles",
            problem: "Dériver \$f(x) = (3x+1)^4\$.",
            steps: [
              "Composition : \$u^4\$ avec \$u = 3x + 1\$, donc \$u' = 3\$.",
              "\$f'(x) = 4 u^3 \\cdot u' = 4 (3x+1)^3 \\cdot 3 = 12 (3x+1)^3\$.",
            ],
            answer: "\$f'(x) = 12(3x+1)^3\$.",
          ),
          _checkpoint("Dérivation", [
            _q(stem: "Dérivée de \$x^3\$ :", choices: ['\$3x\$', '\$3x^2\$', '\$x^2\$', '\$x^4/4\$'], correct: 1, explanation: "\$(x^n)' = n x^{n-1}\$."),
            _q(stem: "Dérivée de \$\\sin x\$ :", choices: ['\$\\sin x\$', '\$\\cos x\$', '\$-\\sin x\$', '\$-\\cos x\$'], correct: 1, explanation: "\$(\\sin)' = \\cos\$."),
            _q(stem: "Dérivée de \$x e^x\$ :", choices: ['\$e^x\$', '\$x e^x\$', '\$(1+x) e^x\$', '\$x^2 e^x\$'], correct: 2, explanation: "Produit : \$1 \\cdot e^x + x \\cdot e^x = (1+x)e^x\$."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcDerivApps() => _lesson(
      titleFr: 'Applications de la dérivation',
      subtitleFr: 'Variations, extrema, optimisation.',
      sections: [
        _section(kind: 'concept', titleFr: 'Sens de variation', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _p("Le signe de la **dérivée** donne le sens de variation : \$f' > 0\$ → \$f\$ strictement croissante ; \$f' < 0\$ → strictement décroissante."),
          _p("À un **extremum local** (max ou min) d'une fonction dérivable, la tangente est horizontale → \$f'\$ s'annule en changeant de signe."),
          _callout('insight', 'Recette d\'étude',
              "Calculer \$f'\$, étudier son signe, dresser le tableau de variations, identifier les extrema."),
        ]),
        _section(kind: 'concept', titleFr: 'Optimisation et inégalités', eyebrowFr: 'APPLICATIONS', estimatedMinutes: '5', blocks: [
          _p("**Problème d'optimisation** : on exprime la grandeur à optimiser comme \$f(x)\$, on dérive, on trouve les points critiques \$f'(x) = 0\$, on identifie le max/min via le signe de \$f'\$."),
          _p("**Démontrer une inégalité** \$g \\le h\$ : étudier la différence \$h - g\$ et montrer qu'elle est positive (souvent en analysant son extremum)."),
          _example(
            title: "Boîte à volume maximal",
            problem: "Une feuille de carton 30×30 cm. On découpe un carré de côté \$x\$ à chaque coin et on plie. Trouver \$x\$ qui maximise le volume \$V = x(30-2x)^2\$.",
            steps: [
              "\$V'(x) = (30-2x)^2 - 4x(30-2x) = (30-2x)(30-6x)\$.",
              "Racines : \$x = 5\$ et \$x = 15\$ (exclu). Sur \$]0, 5[\$ : \$V' > 0\$ ; au-delà : \$V' < 0\$.",
              "Max en \$x = 5\$, volume \$V(5) = 5 \\times 20^2 = 2000\\,\\text{cm}^3\$.",
            ],
            answer: "\$x = 5\$ cm.",
          ),
          _checkpoint("Applications", [
            _q(stem: "À un max local d'une fonction dérivable :", choices: ["\$f' = 0\$", "\$f = 0\$", "\$f' > 0\$", "\$f'' = 0\$"], correct: 0, explanation: "Tangente horizontale → dérivée nulle."),
            _q(stem: "Si \$f' > 0\$ sur \$I\$ alors \$f\$ est :", choices: ['constante', 'décroissante', 'croissante', 'maximale'], correct: 2, explanation: "Dérivée positive ⇒ fonction croissante."),
            _q(stem: "Pour montrer \$g \\le h\$ on étudie :", choices: ['\$g+h\$', '\$g \\cdot h\$', '\$h - g\$', '\$g/h\$'], correct: 2, explanation: "On montre que la différence est positive."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcLnFunction() => _lesson(
      titleFr: 'Fonction logarithme népérien',
      subtitleFr: 'Propriétés algébriques, dérivée, équations.',
      sections: [
        _section(kind: 'concept', titleFr: 'Définition et propriétés', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _p("La fonction \$\\ln\$ est définie sur \$]0, +\\infty[\$. Elle est l'**inverse** de l'exponentielle : \$\\ln(e^x) = x\$ et \$e^{\\ln x} = x\$ (pour \$x > 0\$)."),
          _f("\\ln 1 = 0, \\quad \\ln e = 1, \\quad \\lim_{x \\to 0^+} \\ln x = -\\infty, \\quad \\lim_{x \\to +\\infty} \\ln x = +\\infty", "Valeurs et limites."),
          _f("\\ln(ab) = \\ln a + \\ln b, \\quad \\ln(a/b) = \\ln a - \\ln b, \\quad \\ln(a^n) = n \\ln a", "**Propriétés algébriques** fondamentales."),
        ]),
        _section(kind: 'concept', titleFr: 'Dérivée et équations', eyebrowFr: 'OUTILS', estimatedMinutes: '4', blocks: [
          _f("(\\ln x)' = \\frac{1}{x}, \\quad (\\ln u)' = \\frac{u'}{u}", "Dérivée et composition."),
          _p("**Injectivité** : \$\\ln u = \\ln v \\iff u = v\$ (avec \$u, v > 0\$). C'est ce qui permet de résoudre les équations logarithmiques."),
          _f("\\ln x \\le x - 1 \\quad \\text{(égalité en } x=1\\text{)}", "Inégalité classique, démontrée par étude de \$f(x) = x - 1 - \\ln x\$."),
          _example(
            title: "Équation logarithmique",
            problem: "Résous \$\\ln(2x - 1) = \\ln(x + 3)\$.",
            steps: [
              "Domaine : \$2x - 1 > 0\$ et \$x + 3 > 0\$ → \$x > 1/2\$.",
              "Par injectivité : \$2x - 1 = x + 3 \\iff x = 4\$. \$x = 4 > 1/2\$ ✓.",
            ],
            answer: "\$S = \\{4\\}\$.",
          ),
          _checkpoint("Logarithme", [
            _q(stem: "\$\\ln(e^3)\$ vaut :", choices: ['\$1/3\$', '\$3\$', '\$e\$', '\$e^3\$'], correct: 1, explanation: "\$\\ln(e^x) = x\$."),
            _q(stem: "Dérivée de \$\\ln(x^2 + 1)\$ :", choices: ['\$1/(x^2+1)\$', '\$2x/(x^2+1)\$', '\$\\ln(2x)\$', '\$2x\$'], correct: 1, explanation: "\$u'/u\$ avec \$u = x^2+1\$, \$u' = 2x\$."),
            _q(stem: "\$\\ln(2) + \\ln(3) - \\ln(6)\$ vaut :", choices: ['0', '1', '\$\\ln(6)\$', '\$\\ln(36)\$'], correct: 0, explanation: "\$\\ln(2 \\cdot 3/6) = \\ln 1 = 0\$."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcExpFunction() => _lesson(
      titleFr: 'Fonction exponentielle',
      subtitleFr: 'Propriétés, croissances comparées, équations différentielles.',
      sections: [
        _section(kind: 'concept', titleFr: 'Propriétés', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _p("La fonction \$\\exp(x) = e^x\$ est définie sur \$\\mathbb{R}\$, à valeurs dans \$]0, +\\infty[\$. **Strictement croissante**, dérivée égale à elle-même."),
          _f("e^0 = 1, \\quad e^1 = e \\approx 2{,}718, \\quad (e^x)' = e^x, \\quad e^x > 0 \\,\\forall x", "Valeurs et propriété d'auto-dérivation."),
          _f("e^a \\cdot e^b = e^{a+b}, \\quad e^a/e^b = e^{a-b}, \\quad (e^a)^n = e^{na}", "Propriétés algébriques."),
          _f("\\lim_{x \\to -\\infty} e^x = 0, \\quad \\lim_{x \\to +\\infty} e^x = +\\infty", "Limites."),
        ]),
        _section(kind: 'concept', titleFr: 'Croissances comparées', eyebrowFr: 'THÉORÈME', estimatedMinutes: '4', blocks: [
          _f("\\lim_{x \\to +\\infty} \\frac{e^x}{x^n} = +\\infty, \\quad \\lim_{x \\to +\\infty} x^n e^{-x} = 0", "L'exponentielle l'emporte sur toute puissance."),
          _callout('insight', 'Hiérarchie',
              "À l'infini : \$\\exp \\gg x^n \\gg \\ln\$. Cette hiérarchie tranche les formes indéterminées."),
          _example(
            title: "Résoudre \$e^{2x} - 3 e^x + 2 = 0\$",
            problem: "Trouve les solutions réelles.",
            steps: [
              "Poser \$X = e^x\$, \$X > 0\$. \$X^2 - 3X + 2 = 0\$, racines \$X = 1\$ et \$X = 2\$.",
              "\$e^x = 1 \\iff x = 0\$ ; \$e^x = 2 \\iff x = \\ln 2\$.",
            ],
            answer: "\$S = \\{0,\\, \\ln 2\\}\$.",
          ),
          _checkpoint("Exponentielle", [
            _q(stem: "\$e^x \\cdot e^{-x}\$ vaut :", choices: ['0', '1', '\$e\$', '\$e^{x^2}\$'], correct: 1, explanation: "\$e^{x-x} = e^0 = 1\$."),
            _q(stem: "\$\\lim_{x \\to -\\infty} e^x\$ vaut :", choices: ['\$-\\infty\$', '0', '1', '\$+\\infty\$'], correct: 1, explanation: "L'exponentielle tend vers 0 en \$-\\infty\$."),
            _q(stem: "Dérivée de \$x e^x\$ :", choices: ['\$e^x\$', '\$(1+x) e^x\$', '\$e^x/x\$', '\$x^2 e^x\$'], correct: 1, explanation: "Produit : \$1 \\cdot e^x + x \\cdot e^x = (1+x)e^x\$."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcPrimitives() => _lesson(
      titleFr: 'Primitives',
      subtitleFr: 'Fonction dont la dérivée est donnée, à constante près.',
      sections: [
        _section(kind: 'concept', titleFr: 'Définition', eyebrowFr: 'CONCEPT', estimatedMinutes: '3', blocks: [
          _p("\$F\$ est une **primitive** de \$f\$ sur \$I\$ si \$F'(x) = f(x)\$ pour tout \$x \\in I\$. Deux primitives diffèrent d'une **constante**."),
          _p("Une condition supplémentaire (\$F(x_0) = y_0\$) fixe la constante de manière unique."),
        ]),
        _section(kind: 'concept', titleFr: 'Primitives usuelles et formes reconnaissables', eyebrowFr: 'CATALOGUE', estimatedMinutes: '5', blocks: [
          _f("\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C \\,(n \\ne -1), \\quad \\int \\frac{1}{x}\\,dx = \\ln|x| + C", "Puissances et inverse."),
          _f("\\int e^x\\,dx = e^x + C, \\quad \\int \\sin x\\,dx = -\\cos x + C, \\quad \\int \\cos x\\,dx = \\sin x + C", "Fonctions trigonométriques et exponentielles."),
          _f("\\int u'(x) u(x)^n\\,dx = \\frac{u^{n+1}}{n+1} + C, \\quad \\int \\frac{u'}{u}\\,dx = \\ln|u| + C, \\quad \\int u' e^u\\,dx = e^u + C", "**Formes reconnaissables**."),
          _example(
            title: "Forme \$u'/u\$",
            problem: "Trouver une primitive de \$f(x) = 2x/(x^2 + 1)\$.",
            steps: [
              "Reconnaître \$u'/u\$ avec \$u = x^2 + 1\$, \$u' = 2x\$.",
              "Primitive : \$\\ln(x^2 + 1) + C\$ (valeur absolue inutile car \$u > 0\$).",
            ],
            answer: "\$F(x) = \\ln(x^2 + 1) + C\$.",
          ),
          _checkpoint("Primitives", [
            _q(stem: "Primitive de \$x^3\$ :", choices: ['\$3 x^2\$', '\$x^4/4\$', '\$x^3/3\$', '\$x^2\$'], correct: 1, explanation: "\$\\int x^n dx = x^{n+1}/(n+1)\$."),
            _q(stem: "Primitive de \$1/x\$ sur \$]0, +\\infty[\$ :", choices: ['\$\\ln x\$', '\$1/x^2\$', '\$-1/x^2\$', '\$x\$'], correct: 0, explanation: "Primitive de \$1/x\$ = \$\\ln|x|\$."),
            _q(stem: "Primitive de \$e^{2x}\$ :", choices: ['\$e^{2x}\$', '\$2 e^{2x}\$', '\$e^{2x}/2\$', '\$e^x\$'], correct: 2, explanation: "Diviser par 2 pour compenser la dérivation interne."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcIntegralCalc() => _lesson(
      titleFr: 'Calcul intégral',
      subtitleFr: 'Intégrale définie, propriétés, aires.',
      sections: [
        _section(kind: 'concept', titleFr: 'Définition par primitive', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _f("\\int_a^b f(x)\\,dx = F(b) - F(a) \\quad \\text{où } F' = f", "**Newton-Leibniz** : intégrale = différence de primitives."),
          _p("Géométriquement, \$\\int_a^b f\$ est l'**aire algébrique** sous la courbe entre \$a\$ et \$b\$ (positive au-dessus de l'axe, négative en-dessous)."),
        ]),
        _section(kind: 'concept', titleFr: 'Propriétés', eyebrowFr: 'PROPRIÉTÉS', estimatedMinutes: '4', blocks: [
          _f("\\int_a^b (\\alpha f + \\beta g) = \\alpha \\int_a^b f + \\beta \\int_a^b g", "Linéarité."),
          _f("\\int_a^c f = \\int_a^b f + \\int_b^c f", "**Relation de Chasles**."),
          _f("\\int_a^b f = -\\int_b^a f, \\quad f \\ge 0 \\Rightarrow \\int_a^b f \\ge 0", "Inversion des bornes et positivité."),
          _example(
            title: "Aire entre deux courbes",
            problem: "Aire entre \$y = x^2\$ et \$y = x\$ sur \$[0, 1]\$.",
            steps: [
              "Sur \$[0, 1]\$, \$x \\ge x^2\$. Aire \$= \\int_0^1 (x - x^2)\\,dx\$.",
              "\$[x^2/2 - x^3/3]_0^1 = 1/2 - 1/3 = 1/6\$.",
            ],
            answer: "\$A = 1/6\$.",
          ),
          _checkpoint("Calcul intégral", [
            _q(stem: "\$\\int_0^1 x^2\\,dx\$ vaut :", choices: ['1/2', '1/3', '1/4', '1'], correct: 1, explanation: "\$[x^3/3]_0^1 = 1/3\$."),
            _q(stem: "\$\\int_1^e 1/x\\,dx\$ vaut :", choices: ['0', '1', '\$e\$', '\$e - 1\$'], correct: 1, explanation: "\$[\\ln x]_1^e = 1 - 0 = 1\$."),
            _q(stem: "Si \$\\int_0^3 f = 7\$ et \$\\int_3^5 f = 2\$ alors \$\\int_0^5 f\$ vaut :", choices: ['5', '7', '9', '14'], correct: 2, explanation: "Chasles : 7 + 2 = 9."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcComplexAlgebra() => _lesson(
      titleFr: 'Nombres complexes — forme algébrique',
      subtitleFr: 'Définition, opérations, conjugué, module.',
      sections: [
        _section(kind: 'concept', titleFr: 'Forme algébrique', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _p("Un nombre complexe s'écrit \$z = a + bi\$ avec \$a, b \\in \\mathbb{R}\$ et \$i^2 = -1\$. \$a\$ est la **partie réelle**, \$b\$ la **partie imaginaire**."),
          _f("z + z' = (a + a') + (b + b')i, \\quad z \\cdot z' = (aa' - bb') + (ab' + a'b)i", "Opérations."),
          _f("\\bar z = a - bi, \\quad |z| = \\sqrt{a^2 + b^2}, \\quad z \\bar z = |z|^2", "Conjugué, module, identité fondamentale."),
        ]),
        _section(kind: 'concept', titleFr: 'Inverse et équations', eyebrowFr: 'TECHNIQUES', estimatedMinutes: '5', blocks: [
          _p("Pour calculer \$1/z\$ ou \$z'/z\$ : **multiplier par le conjugué** du dénominateur pour rendre celui-ci réel."),
          _f("\\frac{1}{z} = \\frac{\\bar z}{|z|^2}, \\quad \\frac{z'}{z} = \\frac{z' \\bar z}{|z|^2}", "Formules."),
          _p("**Équation du 2nd degré** à coefficients réels : si \$\\Delta < 0\$, deux racines complexes conjuguées \$z = (-b \\pm i\\sqrt{-\\Delta})/(2a)\$."),
          _example(
            title: "Équation \$z^2 + 4z + 13 = 0\$",
            problem: "Résoudre dans \$\\mathbb{C}\$.",
            steps: [
              "\$\\Delta = 16 - 52 = -36\$. \$\\sqrt{-\\Delta} = 6i\$.",
              "\$z = (-4 \\pm 6i)/2 = -2 \\pm 3i\$.",
            ],
            answer: "\$S = \\{-2 + 3i, -2 - 3i\\}\$.",
          ),
          _checkpoint("Complexes (algèbre)", [
            _q(stem: "\$i^2\$ vaut :", choices: ['0', '1', '-1', '\$i\$'], correct: 2, explanation: "Définition de \$i\$."),
            _q(stem: "Module de \$3 + 4i\$ :", choices: ['3', '4', '5', '7'], correct: 2, explanation: "\$\\sqrt{9 + 16} = 5\$."),
            _q(stem: "Conjugué de \$2 - 3i\$ :", choices: ['\$2 + 3i\$', '\$-2 + 3i\$', '\$3 + 2i\$', '\$-2 - 3i\$'], correct: 0, explanation: "On change le signe de la partie imaginaire."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcComplexTrig() => _lesson(
      titleFr: 'Forme trigonométrique et formule de Moivre',
      subtitleFr: 'Exponentielle complexe, racines n-ièmes.',
      sections: [
        _section(kind: 'concept', titleFr: 'Forme exponentielle', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _f("z = r(\\cos\\theta + i \\sin\\theta) = r e^{i\\theta}, \\quad r = |z|, \\quad \\theta = \\arg z", "Module-argument, et notation exponentielle."),
          _p("Pour passer de \$z = a + bi\$ à la forme exp : calculer \$r = |z|\$, puis \$\\theta\$ via \$\\cos\\theta = a/r\$ et \$\\sin\\theta = b/r\$ (les deux pour lever l'ambiguïté)."),
          _callout('insight', 'Identité d\'Euler',
              "\$e^{i\\pi} + 1 = 0\$ relie 5 constantes fondamentales (\$e, i, \\pi, 1, 0\$)."),
        ]),
        _section(kind: 'concept', titleFr: 'Moivre et racines n-ièmes', eyebrowFr: 'OUTILS', estimatedMinutes: '5', blocks: [
          _f("(r e^{i\\theta})^n = r^n e^{i n \\theta}", "**Formule de Moivre** — élève au rang \$n\$."),
          _p("Les racines n-ièmes d'un complexe \$z_0 = r_0 e^{i\\theta_0}\$ sont \$z_k = r_0^{1/n} e^{i(\\theta_0 + 2k\\pi)/n}\$ pour \$k = 0, 1, \\dots, n-1\$. Géométriquement : sommets d'un polygone régulier."),
          _example(
            title: "Racines cubiques de l'unité",
            problem: "Résoudre \$z^3 = 1\$.",
            steps: [
              "\$1 = e^{i \\cdot 0}\$. Racines : \$z_k = e^{i 2k\\pi/3}\$, \$k = 0, 1, 2\$.",
              "\$z_0 = 1\$, \$z_1 = -1/2 + i\\sqrt 3/2\$, \$z_2 = -1/2 - i\\sqrt 3/2\$. Triangle équilatéral.",
            ],
            answer: "3 racines (1 et deux conjuguées).",
          ),
          _checkpoint("Forme trigonométrique", [
            _q(stem: "\$|e^{i\\theta}|\$ vaut :", choices: ['0', '1', '\$\\theta\$', "\$e^\\theta\$"], correct: 1, explanation: "Module 1 sur le cercle unité."),
            _q(stem: "\$(1+i)^2\$ vaut :", choices: ['0', '\$2i\$', '\$1 + 2i\$', '\$2 + i\$'], correct: 1, explanation: "Développer : \$1 + 2i + i^2 = 2i\$."),
            _q(stem: "Nombre de racines n-ièmes d'un complexe non nul :", choices: ['1', '2', '\$n\$', 'infinité'], correct: 2, explanation: "\$n\$ racines distinctes sur le cercle."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcOdeFirstOrder() => _lesson(
      titleFr: 'Équations différentielles du 1er ordre',
      subtitleFr: '\$y\' = ay\$ et \$y\' = ay + b\$.',
      sections: [
        _section(kind: 'concept', titleFr: 'EDO homogène', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _f("y' = a y \\Rightarrow y(x) = C e^{a x}, \\quad C \\in \\mathbb{R}", "**Solution générale**. Une condition initiale \$y(x_0) = y_0\$ fixe \$C\$."),
          _p("Modélise : croissance/décroissance exponentielle (population, radioactivité, intérêts composés)."),
        ]),
        _section(kind: 'concept', titleFr: 'EDO avec second membre', eyebrowFr: 'PRINCIPE', estimatedMinutes: '5', blocks: [
          _f("y' = a y + b \\Rightarrow y(x) = C e^{a x} + y_p, \\quad y_p = -b/a", "**Superposition** : solution = homogène + particulière constante."),
          _p("La solution tend vers \$y_p\$ quand \$x \\to +\\infty\$ (si \$a < 0\$) — c'est l'**équilibre**."),
          _example(
            title: "Refroidissement",
            problem: "\$T'(t) = -k(T - T_0)\$ avec \$T(0) = T_i\$. Solution ?",
            steps: [
              "Poser \$\\theta = T - T_0\$. Alors \$\\theta' = -k\\theta\$ (homogène).",
              "Solution : \$\\theta(t) = (T_i - T_0) e^{-k t}\$, donc \$T(t) = T_0 + (T_i - T_0) e^{-k t}\$.",
            ],
            answer: "\$T \\to T_0\$ exponentiellement.",
          ),
          _checkpoint("EDO 1er ordre", [
            _q(stem: "Solution de \$y' = 3y\$ avec \$y(0) = 2\$ :", choices: ["\$3 e^{2x}\$", "\$2 e^{3x}\$", "\$2 + 3x\$", "\$2 e^{-3x}\$"], correct: 1, explanation: "\$y = C e^{3x}\$, CI : \$C = 2\$."),
            _q(stem: "Pour \$y' = -2y + 10\$, solution particulière constante :", choices: ['0', '2', '5', '10'], correct: 2, explanation: "\$y_p = -10/(-2) = 5\$."),
            _q(stem: "Demi-vie d'une décroissance \$y' = -\\lambda y\$ :", choices: ["\$1/\\lambda\$", "\$\\ln 2/\\lambda\$", "\$\\lambda \\ln 2\$", "\$2\\lambda\$"], correct: 1, explanation: "\$y_0/2 = y_0 e^{-\\lambda t} \\iff t = \\ln 2/\\lambda\$."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcProbBinomial() => _lesson(
      titleFr: 'Loi binomiale',
      subtitleFr: 'Schéma de Bernoulli, formule, espérance, variance.',
      sections: [
        _section(kind: 'concept', titleFr: 'Schéma de Bernoulli', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _p("Un **schéma de Bernoulli** : \$n\$ essais identiques, indépendants, à 2 issues (succès de proba \$p\$, échec de proba \$1-p\$). \$X\$ = nombre de succès."),
          _f("X \\sim \\mathcal B(n, p) \\Rightarrow P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}", "Loi binomiale."),
          _f("E(X) = n p, \\quad V(X) = n p (1-p), \\quad \\sigma = \\sqrt{V(X)}", "Espérance et variance."),
        ]),
        _section(kind: 'example_walkthrough', titleFr: 'Exemple QCM', eyebrowFr: 'EXEMPLE', estimatedMinutes: '4', blocks: [
          _example(
            title: "QCM aléatoire",
            problem: "20 questions, 4 réponses dont 1 correcte, réponses au hasard. Espérance du score ?",
            steps: [
              "Modèle : \$X \\sim \\mathcal B(20, 1/4)\$ (chaque question = Bernoulli indépendant).",
              "\$E(X) = np = 20 \\times 0{,}25 = 5\$. \$\\sigma = \\sqrt{20 \\times 0{,}25 \\times 0{,}75} \\approx 1{,}94\$.",
              "Score moyen attendu : 5/20, écart-type ~2 → typiquement entre 3 et 7.",
            ],
            answer: "\$E = 5\$, \$\\sigma \\approx 1{,}94\$.",
          ),
          _checkpoint("Loi binomiale", [
            _q(stem: "\$E(X)\$ pour \$X \\sim \\mathcal B(10, 0{,}3)\$ :", choices: ['1', '3', '7', '30'], correct: 1, explanation: "\$E = np = 3\$."),
            _q(stem: "\$P(X = 0)\$ pour \$X \\sim \\mathcal B(n, p)\$ :", choices: ["\$p\$", "\$(1-p)^n\$", "\$n p\$", '0'], correct: 1, explanation: "\$\\binom{n}{0} p^0 (1-p)^n = (1-p)^n\$."),
            _q(stem: "Variance de \$\\mathcal B(n, p)\$ :", choices: ["\$np\$", "\$n p (1-p)\$", "\$p (1-p)\$", "\$n^2 p\$"], correct: 1, explanation: "Formule binomiale."),
          ]),
        ]),
      ],
    );

// ============================================================================
// PC Physique-Chimie lessons (16 chapters)
// ============================================================================

Map<String, dynamic> _pcNewtonLaws() => _lesson(
      titleFr: 'Lois de Newton',
      subtitleFr: 'Inertie, \$\\vec F = m\\vec a\$, action-réaction.',
      sections: [
        _section(kind: 'concept', titleFr: 'Les trois lois', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("**1ère loi (inertie)** : un point matériel isolé est en mouvement rectiligne uniforme (ou au repos). Référentiel galiléen requis."),
          _f("\\sum \\vec F_\\text{ext} = m \\vec a", "**2ème loi** : la somme des forces extérieures = masse × accélération."),
          _p("**3ème loi (action-réaction)** : si A exerce \$\\vec F\$ sur B, alors B exerce \$-\\vec F\$ sur A (mêmes droite, mêmes intensités, sens opposés)."),
        ]),
        _section(kind: 'concept', titleFr: 'Applications', eyebrowFr: 'CAS CLASSIQUES', estimatedMinutes: '5', blocks: [
          _p("**Équilibre statique** : \$\\sum \\vec F = \\vec 0\$. On projette sur les axes."),
          _p("**Plan incliné** : composante du poids \$mg \\sin\\alpha\$ tire le bloc vers le bas. Critère de glissement : \$\\tan\\alpha > \\mu_s\$."),
          _p("**Mouvement circulaire uniforme** : force centripète \$F = m v^2 / r\$ vers le centre."),
          _example(
            title: "Plan incliné sans frottement",
            problem: "Bloc 10 kg sur plan à 30°, \$g = 10\\,\\text{m/s}^2\$. Accélération ?",
            steps: [
              "Forces : poids et réaction normale. Selon le plan : \$m a = m g \\sin\\alpha\$.",
              "\$a = g \\sin 30° = 10 \\times 0{,}5 = 5\\,\\text{m/s}^2\$.",
            ],
            answer: "\$a = 5\\,\\text{m/s}^2\$.",
          ),
          _checkpoint("Newton", [
            _q(stem: "Unité de la force :", choices: ['\$\\text{kg/m}\$', '\$\\text{N} = \\text{kg}\\cdot\\text{m/s}^2\$', '\$\\text{J}\$', '\$\\text{W}\$'], correct: 1, explanation: "Définition : \$F = m a\$ donne kg·m/s² = N."),
            _q(stem: "Si \$\\sum \\vec F = \\vec 0\$, l'objet :", choices: ['accélère', 'est au repos ou MRU', 'tourne', 'tombe'], correct: 1, explanation: "Première loi de Newton."),
            _q(stem: "Force centripète à vitesse \$v\$, rayon \$r\$, masse \$m\$ :", choices: ["\$m v r\$", "\$m v^2/r\$", "\$m v/r\$", "\$m r/v^2\$"], correct: 1, explanation: "\$F_c = m v^2/r\$ vers le centre."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcProjectile() => _lesson(
      titleFr: 'Mouvement d\'un projectile',
      subtitleFr: 'Chute libre, tir parabolique.',
      sections: [
        _section(kind: 'concept', titleFr: 'Équations horaires', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("Un projectile soumis à la seule gravité a deux composantes **indépendantes** : horizontale (MRU) et verticale (MRUA avec accélération \$-g\$)."),
          _f("x(t) = v_0 \\cos\\alpha \\cdot t, \\quad y(t) = v_0 \\sin\\alpha \\cdot t - \\frac{1}{2} g t^2", "Équations horaires."),
          _f("y(x) = x \\tan\\alpha - \\frac{g x^2}{2 v_0^2 \\cos^2\\alpha}", "Équation cartésienne : **parabole**."),
        ]),
        _section(kind: 'concept', titleFr: 'Portée et hauteur', eyebrowFr: 'FORMULES', estimatedMinutes: '4', blocks: [
          _f("x_p = \\frac{v_0^2 \\sin(2\\alpha)}{g}, \\quad h_\\text{max} = \\frac{v_0^2 \\sin^2\\alpha}{2g}", "Portée et hauteur maximale."),
          _callout('insight', 'Portée maximale',
              "Pour \$v_0\$ donnée, la portée est max quand \$\\sin(2\\alpha) = 1 \\iff \\alpha = 45°\$. Au-delà ou en deçà, elle diminue symétriquement."),
          _example(
            title: "Chute libre",
            problem: "Pierre lâchée d'une falaise. Touche le sol après 3 s. Hauteur ? (g = 10)",
            steps: [
              "Chute libre : \$h = (1/2) g t^2 = 0{,}5 \\times 10 \\times 9 = 45\\,\\text{m}\$.",
              "Vitesse à l'impact : \$v = g t = 30\\,\\text{m/s}\$.",
            ],
            answer: "\$h = 45\$ m.",
          ),
          _checkpoint("Projectile", [
            _q(stem: "Angle de portée maximale dans le vide :", choices: ['30°', '45°', '60°', '90°'], correct: 1, explanation: "\$\\sin(2\\alpha)\$ max pour \$\\alpha = 45°\$."),
            _q(stem: "Composante horizontale d'un tir à \$v_0\$, angle \$\\alpha\$ :", choices: ["\$v_0\$", "\$v_0 \\sin\\alpha\$", "\$v_0 \\cos\\alpha\$", "\$g t\$"], correct: 2, explanation: "Projection horizontale."),
            _q(stem: "Hauteur après chute de 2 s (g=10) :", choices: ['10 m', '20 m', '40 m', '100 m'], correct: 1, explanation: "\$h = 0{,}5 \\times 10 \\times 4 = 20\$."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcEnergyMechanical() => _lesson(
      titleFr: 'Énergie mécanique',
      subtitleFr: 'Cinétique, potentielle, conservation.',
      sections: [
        _section(kind: 'concept', titleFr: 'Formes d\'énergie', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _f("E_c = \\frac{1}{2} m v^2, \\quad E_p = m g h, \\quad E_{pe} = \\frac{1}{2} k x^2", "Cinétique, potentielle pesanteur, potentielle élastique."),
          _f("E_m = E_c + E_p", "**Énergie mécanique** = somme des deux."),
        ]),
        _section(kind: 'concept', titleFr: 'Conservation et TEC', eyebrowFr: 'LOIS', estimatedMinutes: '5', blocks: [
          _p("**Sans frottement** : \$E_m\$ est conservée. Avec frottements : \$\\Delta E_m = W_\\text{frot} < 0\$."),
          _f("\\Delta E_c = \\sum W_\\text{ext}", "**Théorème de l'énergie cinétique** : la variation d'\$E_c\$ = somme des travaux."),
          _example(
            title: "Toboggan sans frottement",
            problem: "Enfant lâché du haut d'un toboggan de 4 m. Vitesse en bas ? (g=10)",
            steps: [
              "Conservation : \$m g h = (1/2) m v^2 \\Rightarrow v = \\sqrt{2 g h}\$.",
              "\$v = \\sqrt{80} \\approx 8{,}94\\,\\text{m/s}\$. Indépendant de la masse !",
            ],
            answer: "\$\\approx 8{,}94\$ m/s.",
          ),
          _checkpoint("Énergie", [
            _q(stem: "\$E_c\$ d'un objet 2 kg à 10 m/s :", choices: ['10 J', '50 J', '100 J', '200 J'], correct: 2, explanation: "\$(1/2)(2)(100) = 100\$ J."),
            _q(stem: "Sans frottement, \$E_m\$ :", choices: ['augmente', 'décroît', 'est constante', 'tend vers 0'], correct: 2, explanation: "Conservation."),
            _q(stem: "Théorème de l'énergie cinétique :", choices: ["\$\\Delta E_c = m g h\$", "\$\\Delta E_c = \\sum W\$", "\$\\Delta E_c = 0\$", "\$E_c = E_p\$"], correct: 1, explanation: "Variation d'\$E_c\$ = somme des travaux."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcPendulum() => _lesson(
      titleFr: 'Pendule pesant et élastique',
      subtitleFr: 'Oscillateur harmonique, période propre.',
      sections: [
        _section(kind: 'concept', titleFr: 'Pendule simple', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _p("Une masse au bout d'un fil de longueur \$L\$, écartée d'un petit angle \$\\theta_0\$ et lâchée, oscille."),
          _f("\\theta'' + \\frac{g}{L} \\theta = 0 \\quad (\\text{petits angles})", "Équation différentielle (approximation \$\\sin\\theta \\approx \\theta\$)."),
          _f("T_0 = 2\\pi \\sqrt{L/g}", "**Période** — indépendante de l'amplitude (isochronisme) et de la masse."),
        ]),
        _section(kind: 'concept', titleFr: 'Pendule élastique (ressort-masse)', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _f("x'' + \\frac{k}{m} x = 0 \\Rightarrow T_0 = 2\\pi \\sqrt{m/k}", "Équation et période."),
          _f("\\omega_0 = \\sqrt{k/m} \\text{ (élastique) ou } \\sqrt{g/L} \\text{ (simple)}", "Pulsation propre."),
          _example(
            title: "Période d'un pendule simple",
            problem: "Longueur \$L = 1\\,\\text{m}\$, \$g = 9{,}81\\,\\text{m/s}^2\$. Période ?",
            steps: [
              "\$T_0 = 2\\pi \\sqrt{1/9{,}81} \\approx 2{,}01\\,\\text{s}\$.",
              "Un pendule de 1 m bat la seconde (aller-retour ≈ 2 s).",
            ],
            answer: "\$T_0 \\approx 2\\,\\text{s}\$.",
          ),
          _checkpoint("Pendule", [
            _q(stem: "Période d'un pendule simple \$L\$, \$g\$ :", choices: ["\$\\sqrt{L/g}\$", "\$2\\pi \\sqrt{L/g}\$", "\$2\\pi L/g\$", "\$L g\$"], correct: 1, explanation: "Formule fondamentale."),
            _q(stem: "La période dépend-elle de la masse pour un pendule simple ?", choices: ['oui', 'non', 'parfois', "selon l'angle"], correct: 1, explanation: "La masse se simplifie dans l'équation."),
            _q(stem: "Pulsation propre d'un ressort \$k, m\$ :", choices: ["\$k/m\$", "\$\\sqrt{m/k}\$", "\$\\sqrt{k/m}\$", "\$k m\$"], correct: 2, explanation: "\$\\omega_0 = \\sqrt{k/m}\$."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcRcCircuit() => _lesson(
      titleFr: 'Dipôle RC',
      subtitleFr: 'Charge et décharge d\'un condensateur.',
      sections: [
        _section(kind: 'concept', titleFr: 'Charge', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _p("Quand on ferme un interrupteur dans un circuit \$E, R, C\$, le condensateur se charge progressivement (\$u_C\$ augmente)."),
          _f("\\tau \\frac{du_C}{dt} + u_C = E, \\quad u_C(t) = E (1 - e^{-t/\\tau}), \\quad \\tau = R C", "EDO et solution. \$\\tau\$ = **constante de temps**."),
          _callout('insight', 'Règle du 5τ',
              "À \$t = 3\\tau\$, \$u_C \\approx 95\\%\\,E\$ ; à \$5\\tau\$, plus de 99% — régime considéré établi."),
        ]),
        _section(kind: 'concept', titleFr: 'Décharge et énergie', eyebrowFr: 'DÉCHARGE', estimatedMinutes: '4', blocks: [
          _f("u_C(t) = U_0 e^{-t/\\tau}", "Décharge : exponentielle décroissante."),
          _f("E_C = \\frac{1}{2} C u_C^2", "Énergie stockée dans le condensateur."),
          _example(
            title: "Charge d'un condensateur",
            problem: "\$E = 12\\,\\text{V}\$, \$R = 1\\,\\text{k}\\Omega\$, \$C = 100\\,\\mu\\text{F}\$. Calculer \$\\tau\$.",
            steps: [
              "\$\\tau = RC = 10^3 \\times 10^{-4} = 0{,}1\\,\\text{s} = 100\\,\\text{ms}\$.",
              "Régime établi vers \$5\\tau = 500\\,\\text{ms}\$.",
            ],
            answer: "\$\\tau = 100\\,\\text{ms}\$.",
          ),
          _checkpoint("Dipôle RC", [
            _q(stem: "Constante de temps RC :", choices: ["\$R + C\$", "\$R/C\$", "\$R C\$", "\$1/(R C)\$"], correct: 2, explanation: "\$\\tau = R C\$ (dimensions s)."),
            _q(stem: "À \$t = \\tau\$, \$u_C\$ vaut :", choices: ['\$E/e\$', '\$E(1 - 1/e)\\approx 0{,}63 E\$', '\$E\$', '\$E/2\$'], correct: 1, explanation: "\$u_C(\\tau) = E(1 - e^{-1})\$."),
            _q(stem: "Énergie d'un condensateur chargé à \$U\$ :", choices: ["\$C U\$", "\$C U^2\$", "\$(1/2) C U^2\$", "\$U/C\$"], correct: 2, explanation: "\$E = \\frac{1}{2} C U^2\$."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcRlCircuit() => _lesson(
      titleFr: 'Dipôle RL',
      subtitleFr: 'Bobine, établissement et rupture du courant.',
      sections: [
        _section(kind: 'concept', titleFr: 'Établissement du courant', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _p("Une bobine s'oppose aux variations rapides de courant — elle réagit comme un 'volant d'inertie' électrique."),
          _f("L \\frac{di}{dt} + R i = E, \\quad i(t) = \\frac{E}{R}(1 - e^{-t/\\tau}), \\quad \\tau = L/R", "EDO et solution."),
          _f("u_L = L \\frac{di}{dt} = E e^{-t/\\tau}", "Tension aux bornes de la bobine — max à \$t=0\$, nulle à l'infini."),
        ]),
        _section(kind: 'concept', titleFr: 'Énergie et symétrie avec RC', eyebrowFr: 'ANALOGIES', estimatedMinutes: '4', blocks: [
          _f("E_L = \\frac{1}{2} L i^2", "Énergie magnétique stockée."),
          _p("Analogie complète RC ↔ RL : \$u_C\$ joue le rôle de \$i\$, \$Q\$ joue celui de \$\\Phi\$ (flux magnétique). Mêmes formes d'équations, mêmes comportements transitoires."),
          _checkpoint("Dipôle RL", [
            _q(stem: "Constante de temps RL :", choices: ["\$R/L\$", "\$L R\$", "\$L/R\$", "\$1/(L R)\$"], correct: 2, explanation: "\$\\tau = L/R\$."),
            _q(stem: "À \$t = 0\$ (fermeture), \$u_L\$ vaut :", choices: ['0', '\$E\$', '\$E/2\$', '\$\\infty\$'], correct: 1, explanation: "La bobine absorbe toute la tension initialement."),
            _q(stem: "Énergie magnétique d'une bobine parcourue par \$I\$ :", choices: ["\$L I\$", "\$L I^2\$", "\$(1/2) L I^2\$", "\$I/L\$"], correct: 2, explanation: "\$E_L = \\frac{1}{2} L i^2\$."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcRlcOscillations() => _lesson(
      titleFr: 'Oscillations RLC libres',
      subtitleFr: 'LC idéal, trois régimes, pulsation propre.',
      sections: [
        _section(kind: 'concept', titleFr: 'Circuit LC idéal', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _f("L \\ddot u_C + \\frac{1}{C} q = 0 \\Rightarrow u_C'' + \\omega_0^2 u_C = 0, \\quad \\omega_0 = \\frac{1}{\\sqrt{LC}}", "Équation et pulsation propre."),
          _p("Solution sinusoïdale : oscillations harmoniques non amorties. L'énergie échange continuellement entre le condensateur (électrique) et la bobine (magnétique)."),
          _f("T_0 = 2\\pi \\sqrt{LC}", "Période propre."),
        ]),
        _section(kind: 'concept', titleFr: 'RLC réel — trois régimes', eyebrowFr: 'RÉGIMES', estimatedMinutes: '5', blocks: [
          _p("Avec une résistance \$R\$, l'amplitude décroît exponentiellement. Trois cas selon \$R\$ vs résistance critique \$R_c = 2\\sqrt{L/C}\$ :"),
          _p("- **Pseudo-périodique** (\$R < R_c\$) : oscillations amorties."),
          _p("- **Critique** (\$R = R_c\$) : retour le plus rapide sans oscillation."),
          _p("- **Apériodique** (\$R > R_c\$) : retour lent sans oscillation."),
          _checkpoint("RLC", [
            _q(stem: "Pulsation propre LC :", choices: ["\$L C\$", "\$\\sqrt{LC}\$", "\$1/\\sqrt{LC}\$", "\$1/(LC)\$"], correct: 2, explanation: "\$\\omega_0 = 1/\\sqrt{LC}\$."),
            _q(stem: "Résistance critique :", choices: ["\$\\sqrt{L C}\$", "\$2 \\sqrt{L/C}\$", "\$L/C\$", "\$L C / 2\$"], correct: 1, explanation: "\$R_c = 2\\sqrt{L/C}\$."),
            _q(stem: "Pour \$R < R_c\$, le régime est :", choices: ['pseudo-périodique', 'critique', 'apériodique', 'instable'], correct: 0, explanation: "Oscillations amorties."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcMechanicalWaves() => _lesson(
      titleFr: 'Ondes mécaniques',
      subtitleFr: 'Célérité, longueur d\'onde, types d\'ondes.',
      sections: [
        _section(kind: 'concept', titleFr: 'Définition et grandeurs', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _p("Une **onde mécanique** est la propagation d'une perturbation dans un milieu matériel **sans transport de matière**. Seule l'énergie se propage."),
          _f("\\lambda = v T = v/f", "Relation fondamentale entre **longueur d'onde**, célérité et fréquence."),
          _p("**Transversale** : oscillation perpendiculaire à la direction (ex. corde). **Longitudinale** : parallèle (ex. son)."),
        ]),
        _section(kind: 'concept', titleFr: 'Retard et déphasage', eyebrowFr: 'PROPRIÉTÉS', estimatedMinutes: '4', blocks: [
          _f("\\tau = d/v, \\quad \\Delta\\varphi = 2\\pi f \\tau = 2\\pi d/\\lambda", "**Retard** temporel et **déphasage** spatial."),
          _p("Deux points sont **en phase** si \$d = n\\lambda\$ (n entier), en **opposition** de phase si \$d = (n + 1/2)\\lambda\$."),
          _checkpoint("Ondes", [
            _q(stem: "Relation \$\\lambda, v, f\$ :", choices: ["\$\\lambda = v f\$", "\$\\lambda = v/f\$", "\$\\lambda = f/v\$", "\$\\lambda = v + f\$"], correct: 1, explanation: "\$\\lambda = v T = v/f\$."),
            _q(stem: "Le son est :", choices: ['transversal', 'longitudinal', 'les deux', 'aucun'], correct: 1, explanation: "Compressions/raréfactions dans la direction du son."),
            _q(stem: "Célérité du son dans l'air (20°C) :", choices: ['30 m/s', '340 m/s', '3000 m/s', '300000 km/s'], correct: 1, explanation: "Valeur classique à connaître."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcDiffractionInterference() => _lesson(
      titleFr: 'Diffraction et interférences',
      subtitleFr: 'Comportement ondulatoire de la lumière.',
      sections: [
        _section(kind: 'concept', titleFr: 'Diffraction', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _p("La **diffraction** est l'étalement d'une onde traversant une ouverture (ou contournant un obstacle) de taille comparable à \$\\lambda\$."),
          _f("\\theta \\approx \\lambda/a", "Demi-angle d'ouverture pour une fente de largeur \$a\$."),
          _callout('insight', 'Plus la fente est étroite, plus la tache est large',
              "Contre-intuitif mais essentiel — c'est pourquoi les objectifs photo doivent avoir une grande ouverture pour être nets."),
        ]),
        _section(kind: 'concept', titleFr: 'Interférences (Young)', eyebrowFr: 'INTERFÉRENCES', estimatedMinutes: '4', blocks: [
          _f("i = \\lambda D / a", "**Interfrange** : distance entre deux franges brillantes dans le dispositif de Young (\$D\$ distance fentes-écran, \$a\$ écart entre fentes)."),
          _p("Conditions : sources **cohérentes** (même longueur d'onde, déphasage constant). En pratique : une source unique séparée en deux."),
          _checkpoint("Diffraction et interférences", [
            _q(stem: "Pour observer la diffraction, la fente doit être :", choices: ["\$a \\gg \\lambda\$", "\$a \\approx \\lambda\$", "\$a = 0\$", "infinie"], correct: 1, explanation: "Diffraction notable quand \$a \\sim \\lambda\$."),
            _q(stem: "Interfrange \$i = \\lambda D / a\$. Si on augmente \$\\lambda\$ :", choices: ['i diminue', 'i augmente', 'i constant', "i s'annule"], correct: 1, explanation: "\$i \\propto \\lambda\$."),
            _q(stem: "Les interférences exigent des sources :", choices: ['différentes', 'incohérentes', 'cohérentes', 'lumineuses'], correct: 2, explanation: "Cohérence (même \$\\lambda\$, déphasage constant)."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcAmModulation() => _lesson(
      titleFr: 'Modulation d\'amplitude (AM)',
      subtitleFr: 'Porteuse, signal informatif, démodulation par enveloppe.',
      sections: [
        _section(kind: 'concept', titleFr: 'Principe', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("La radio AM module l'**amplitude** d'une porteuse haute fréquence \$f_p\$ par un signal basse fréquence \$s(t)\$ (voix, musique)."),
          _f("u(t) = [A + s(t)] \\cos(2\\pi f_p t)", "Signal modulé : enveloppe \$A + s(t)\$, porteuse \$\\cos(\\dots)\$."),
          _f("m = S_\\text{max}/A < 1", "**Taux de modulation**. Si \$m > 1\$ : surmodulation → distorsion."),
        ]),
        _section(kind: 'concept', titleFr: 'Démodulation par détection d\'enveloppe', eyebrowFr: 'CIRCUIT', estimatedMinutes: '5', blocks: [
          _p("Un démodulateur AM = **diode** (redresse) + **RC passe-bas** (lisse). Condition sur \$\\tau = RC\$ :"),
          _f("T_p \\ll \\tau \\ll T_s", "Où \$T_p\$ = période porteuse, \$T_s\$ = période signal."),
          _callout('warning', 'Choix de \$\\tau\$',
              "Si \$\\tau\$ trop petit : ondulation HF résiduelle. Si trop grand : enveloppe lissée et perdue."),
          _checkpoint("AM", [
            _q(stem: "Pour une bonne modulation, \$m\$ doit être :", choices: ['< 0', '< 1', '> 1', '= 1'], correct: 1, explanation: "Sinon surmodulation."),
            _q(stem: "Le démodulateur AM contient :", choices: ['une bobine', 'une diode + RC', 'un transformateur', 'un transistor seul'], correct: 1, explanation: "Détection d'enveloppe = diode + filtre RC."),
            _q(stem: "Si \$f_p = 100\\,\\text{kHz}\$ et \$f_s = 1\\,\\text{kHz}\$, \$\\tau\$ raisonnable :", choices: ['1 ns', '10 µs à 100 µs', '1 s', '1 ms'], correct: 1, explanation: "Entre \$T_p = 10\\,\\mu s\$ et \$T_s = 1\\,ms\$."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcRadioactivity() => _lesson(
      titleFr: 'Radioactivité',
      subtitleFr: 'Désintégrations, loi de décroissance, demi-vie.',
      sections: [
        _section(kind: 'concept', titleFr: 'Types de désintégrations', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("Un noyau \$^A_Z X\$ instable se désintègre spontanément. Lois de conservation : \$A\$ et \$Z\$ totaux conservés."),
          _f("\\alpha : \\,^A_Z X \\to \\,^{A-4}_{Z-2} Y + \\,^4_2 \\text{He}", "Émission d'un noyau d'hélium."),
          _f("\\beta^- : \\,^A_Z X \\to \\,^A_{Z+1} Y + \\,^0_{-1} e", "Un neutron → proton + électron."),
          _f("\\beta^+ : \\,^A_Z X \\to \\,^A_{Z-1} Y + \\,^0_{+1} e", "Un proton → neutron + positron."),
        ]),
        _section(kind: 'concept', titleFr: 'Loi de décroissance', eyebrowFr: 'LOI', estimatedMinutes: '5', blocks: [
          _f("N(t) = N_0 e^{-\\lambda t}, \\quad A(t) = \\lambda N(t)", "Nombre de noyaux et activité (Bq = désint./s)."),
          _f("t_{1/2} = \\frac{\\ln 2}{\\lambda}", "**Demi-vie** : temps pour que \$N\$ soit divisée par 2."),
          _example(
            title: "Datation au C14",
            problem: "Un échantillon contient 25% de l'activité d'origine. Âge ? (t½ = 5730 ans)",
            steps: [
              "\$A/A_0 = 1/4 = 1/2^2\$ → 2 demi-vies se sont écoulées.",
              "Âge = \$2 \\times 5730 = 11\\,460\\,\\text{ans}\$.",
            ],
            answer: "≈ 11 460 ans.",
          ),
          _checkpoint("Radioactivité", [
            _q(stem: "Émission \$\\alpha\$ = particule \$^4_2\\text{He}\$. Conservation :", choices: ["A et Z séparément", "A seulement", "Z seulement", "ni A ni Z"], correct: 0, explanation: "Lois de Soddy."),
            _q(stem: "Demi-vie en fonction de \$\\lambda\$ :", choices: ["\$1/\\lambda\$", "\$\\ln 2/\\lambda\$", "\$\\lambda \\ln 2\$", "\$2\\lambda\$"], correct: 1, explanation: "\$t_{1/2} = \\ln 2/\\lambda\$."),
            _q(stem: "Après 3 demi-vies, il reste :", choices: ['1/3', '1/6', '1/8', '1/9'], correct: 2, explanation: "\$N/N_0 = 1/2^3 = 1/8\$."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcReactionSpeed() => _lesson(
      titleFr: 'Vitesse de réaction',
      subtitleFr: 'Cinétique chimique, facteurs, temps de demi-réaction.',
      sections: [
        _section(kind: 'concept', titleFr: 'Vitesse et facteurs', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _f("v = \\frac{1}{V} \\frac{d\\xi}{dt} = -\\frac{1}{\\nu_R} \\frac{d[R]}{dt}", "**Vitesse volumique** de réaction (\$\\nu_R\$ = coeff stoechio du réactif)."),
          _p("**Facteurs cinétiques** : température (T ↑ → v ↑, règle des 10°C qui doublent v), concentration (plus de chocs), catalyseur (réduit \$E_a\$), surface (réactifs solides)."),
        ]),
        _section(kind: 'concept', titleFr: 'Cinétique d\'ordre 1', eyebrowFr: 'LOI', estimatedMinutes: '5', blocks: [
          _f("v = k [R] \\Rightarrow [R](t) = [R]_0 e^{-k t}, \\quad t_{1/2} = \\ln 2/k", "Loi d'ordre 1 — structure identique à la radioactivité."),
          _callout('insight', '\$t_{1/2}\$ indépendant de \$[R]_0\$',
              "Pour une réaction d'ordre 1, le temps de demi-réaction est constant. C'est le marqueur expérimental de l'ordre 1."),
          _checkpoint("Vitesse de réaction", [
            _q(stem: "Effet d'augmenter T de 10°C (règle empirique) :", choices: ['v constant', 'v doublé', 'v divisé', 'v annulé'], correct: 1, explanation: "Règle de van't Hoff."),
            _q(stem: "Un catalyseur :", choices: ['change l\'équilibre', 'modifie K', 'baisse \$E_a\$', 'consomme le réactif'], correct: 2, explanation: "Diminue l'énergie d'activation."),
            _q(stem: "\$t_{1/2}\$ pour \$k = 0{,}1\\,\\text{s}^{-1}\$ (ordre 1) :", choices: ['1 s', '~7 s', '10 s', '100 s'], correct: 1, explanation: "\$\\ln 2/0{,}1 \\approx 6{,}93\\,\\text{s}\$."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcPhCalculation() => _lesson(
      titleFr: 'pH et acides-bases',
      subtitleFr: 'Définition, acide fort/faible, pKa.',
      sections: [
        _section(kind: 'concept', titleFr: 'Définitions et autoprotolyse', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _f("pH = -\\log[\\text{H}_3\\text{O}^+], \\quad K_e = [\\text{H}_3\\text{O}^+][\\text{OH}^-] = 10^{-14} \\,(25°C)", "Définition du pH et produit ionique de l'eau."),
          _p("Solution **acide** : pH < 7 (\$[\\text{H}_3\\text{O}^+] > [\\text{OH}^-]\$). Solution **basique** : pH > 7. Neutre : pH = 7."),
        ]),
        _section(kind: 'concept', titleFr: 'Acides forts et faibles', eyebrowFr: 'CLASSIFICATION', estimatedMinutes: '5', blocks: [
          _p("**Acide fort** (HCl, HNO₃) : totalement dissocié → \$[\\text{H}_3\\text{O}^+] = C\$, \$pH = -\\log C\$."),
          _p("**Acide faible** (CH₃COOH) : partiellement dissocié. Équilibre régi par \$K_a\$ (ou pKa = \$-\\log K_a\$)."),
          _f("pH \\approx \\frac{1}{2}(pKa - \\log C_0)", "Formule simplifiée pour un acide faible peu dissocié."),
          _f("pH = pKa + \\log\\frac{[A^-]}{[HA]}", "**Henderson-Hasselbalch** — clé des tampons."),
          _checkpoint("pH", [
            _q(stem: "pH d'une solution d'acide fort \$C = 0{,}01\\,\\text{mol/L}\$ :", choices: ['1', '2', '7', '12'], correct: 1, explanation: "\$-\\log 0{,}01 = 2\$."),
            _q(stem: "À 25°C, pH + pOH vaut :", choices: ['7', '10', '14', '\$2 \\log 10\$'], correct: 2, explanation: "\$K_e = 10^{-14}\$."),
            _q(stem: "Pour pH = pKa, on a :", choices: ["[HA] = [A^-]", "[HA] = 0", "[A^-] = 0", "[HA] = [H_3O^+]"], correct: 0, explanation: "Henderson-Hasselbalch : \$\\log 1 = 0\$."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcTitration() => _lesson(
      titleFr: 'Titrage acide-base',
      subtitleFr: 'Équivalence, indicateurs, courbe pH-V.',
      sections: [
        _section(kind: 'concept', titleFr: 'Équivalence', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _f("C_a V_a = C_b V_b^\\text{eq}", "À l'équivalence : moles d'acide = moles de base ajoutées (réaction 1:1)."),
          _p("**Avant l'équivalence** : excès d'acide → pH bas. **À l'équivalence** : sel en solution (pH = 7 pour fort+fort, > 7 pour faible+fort). **Après** : excès de base → pH > 7."),
        ]),
        _section(kind: 'concept', titleFr: 'Indicateurs et exploitation', eyebrowFr: 'PRATIQUE', estimatedMinutes: '5', blocks: [
          _p("**Indicateurs courants** : Hélianthine (3,1–4,4), BBT (6,0–7,6), Phénolphtaléine (8,2–10)."),
          _p("**Choix** : la zone de virage doit contenir le pH d'équivalence. Fort+fort → BBT. Faible+fort → phénolphtaléine."),
          _callout('insight', 'Demi-équivalence',
              "Pour un acide faible : à \$V_b = V_b^\\text{eq}/2\$, \$[HA] = [A^-]\$ → \$pH = pKa\$. C'est la méthode standard de mesure du pKa."),
          _checkpoint("Titrage", [
            _q(stem: "À l'équivalence d'un titrage fort+fort, pH :", choices: ['< 7', '= 7', '> 7', 'imprévisible'], correct: 1, explanation: "Sel neutre."),
            _q(stem: "À la demi-équivalence d'un acide faible :", choices: ['pH = 7', 'pH = 0', 'pH = pKa', 'pH = -log C'], correct: 2, explanation: "Henderson-Hasselbalch avec \$[HA] = [A^-]\$."),
            _q(stem: "Indicateur le plus adapté pour HCl + NaOH :", choices: ['hélianthine', 'BBT', 'phénolphtaléine', 'aucun'], correct: 1, explanation: "Équivalence à pH = 7 ; BBT (6–7,6) idéal."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcEsterification() => _lesson(
      titleFr: 'Estérification et hydrolyse',
      subtitleFr: 'Équilibre, déplacement, saponification.',
      sections: [
        _section(kind: 'concept', titleFr: 'Réaction et équilibre', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _f("\\text{R-COOH} + \\text{R'-OH} \\rightleftharpoons \\text{R-COO-R'} + \\text{H}_2\\text{O}", "Estérification (sens direct) / hydrolyse (sens inverse)."),
          _p("Caractéristiques : **lente**, **limitée** (K ≈ 4), **athermique** (\$\\Delta H \\approx 0\$ → T ne déplace pas l'équilibre, mais accélère la cinétique)."),
        ]),
        _section(kind: 'concept', titleFr: 'Déplacement et saponification', eyebrowFr: 'AMÉLIORATIONS', estimatedMinutes: '5', blocks: [
          _p("**Déplacer l'équilibre** : excès d'un réactif (Le Chatelier), ou éliminer l'eau par distillation."),
          _p("**Saponification** : ester + base forte → carboxylate + alcool, **totale** (le carboxylate est très stable, K très grand). Procédé industriel pour les savons."),
          _example(
            title: "Mélange 1+1 mol, K = 4",
            problem: "Taux d'avancement final ?",
            steps: [
              "Tableau : \$n_a = n_\\text{al} = 1 - \\xi\$, \$n_e = n_w = \\xi\$.",
              "\$K = \\xi^2/(1-\\xi)^2 = 4 \\iff \\xi/(1-\\xi) = 2 \\iff \\xi = 2/3\$.",
            ],
            answer: "67% d'avancement.",
          ),
          _checkpoint("Estérification", [
            _q(stem: "La réaction d'estérification est :", choices: ['rapide et totale', 'lente et limitée', 'instantanée', 'exothermique forte'], correct: 1, explanation: "Caractéristiques principales."),
            _q(stem: "Effet d'augmenter T sur l'équilibre estérification :", choices: ['aucun (athermique)', 'favorise', 'défavorise', 'rend totale'], correct: 0, explanation: "\$\\Delta H \\approx 0\$."),
            _q(stem: "Saponification = ester + :", choices: ['eau', 'acide fort', 'base forte', 'alcool'], correct: 2, explanation: "Réaction totale donnant carboxylate."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _pcDaniellCell() => _lesson(
      titleFr: 'Pile Daniell et oxydoréduction',
      subtitleFr: 'Demi-équations, fem, quantité de charge.',
      sections: [
        _section(kind: 'concept', titleFr: 'Fonctionnement', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("Pile Daniell : électrode Zn dans \$\\text{ZnSO}_4\$, électrode Cu dans \$\\text{CuSO}_4\$, pont salin."),
          _f("\\text{Anode (-) : } \\text{Zn} \\to \\text{Zn}^{2+} + 2 e^-", "Oxydation."),
          _f("\\text{Cathode (+) : } \\text{Cu}^{2+} + 2 e^- \\to \\text{Cu}", "Réduction."),
          _f("\\text{Bilan : } \\text{Zn} + \\text{Cu}^{2+} \\to \\text{Zn}^{2+} + \\text{Cu}", "Réaction globale ; fem ≈ 1,10 V."),
        ]),
        _section(kind: 'concept', titleFr: 'Quantité de charge', eyebrowFr: 'CALCULS', estimatedMinutes: '4', blocks: [
          _f("Q = I \\cdot t = n_e \\cdot F, \\quad F \\approx 96\\,500\\,\\text{C/mol}", "**Constante de Faraday**."),
          _p("Le **pont salin** maintient l'électroneutralité : cations migrent vers la cathode, anions vers l'anode. Sans pont, la pile ne fonctionne pas."),
          _checkpoint("Pile Daniell", [
            _q(stem: "À l'anode d'une pile :", choices: ['réduction', 'oxydation', 'rien', 'le métal se dépose'], correct: 1, explanation: "L'anode est le siège de l'oxydation (mnémonique : An-Ox)."),
            _q(stem: "fem théorique de la pile Daniell :", choices: ['0,1 V', '1,1 V', '11 V', '110 V'], correct: 1, explanation: "\$E° = 0{,}34 - (-0{,}76) = 1{,}10\\,\\text{V}\$."),
            _q(stem: "Charge écoulée pour 1 mol d'électrons :", choices: ['96 500 C', '1 C', '1 A', '96 500 J'], correct: 0, explanation: "Constante de Faraday."),
          ]),
        ]),
      ],
    );

// ============================================================================
// Registry & main
// ============================================================================

final Map<String, Map<String, dynamic>> _chapters = {
  // Math (15)
  'pc_arithmetic_geom_seq': _pcArithmeticGeomSeq(),
  'pc_seq_convergence': _pcSeqConvergence(),
  'pc_seq_recursive': _pcSeqRecursive(),
  'pc_limit_calc': _pcLimitCalc(),
  'pc_continuity_tvi': _pcContinuityTvi(),
  'pc_deriv_rules': _pcDerivRules(),
  'pc_deriv_apps': _pcDerivApps(),
  'pc_ln_function': _pcLnFunction(),
  'pc_exp_function': _pcExpFunction(),
  'pc_primitives': _pcPrimitives(),
  'pc_integral_calc': _pcIntegralCalc(),
  'pc_complex_algebra': _pcComplexAlgebra(),
  'pc_complex_trig': _pcComplexTrig(),
  'pc_ode_first_order': _pcOdeFirstOrder(),
  'pc_prob_binomial': _pcProbBinomial(),
  // Physique-Chimie (16)
  'pc_newton_laws': _pcNewtonLaws(),
  'pc_projectile': _pcProjectile(),
  'pc_energy_mechanical': _pcEnergyMechanical(),
  'pc_pendulum': _pcPendulum(),
  'pc_rc_circuit': _pcRcCircuit(),
  'pc_rl_circuit': _pcRlCircuit(),
  'pc_rlc_oscillations': _pcRlcOscillations(),
  'pc_mechanical_waves': _pcMechanicalWaves(),
  'pc_diffraction_interference': _pcDiffractionInterference(),
  'pc_am_modulation': _pcAmModulation(),
  'pc_radioactivity': _pcRadioactivity(),
  'pc_reaction_speed': _pcReactionSpeed(),
  'pc_ph_calculation': _pcPhCalculation(),
  'pc_titration': _pcTitration(),
  'pc_esterification': _pcEsterification(),
  'pc_daniell_cell': _pcDaniellCell(),
};

void main() {
  final out = StringBuffer();
  out.writeln('-- Migration 033: full v2 lessons for the 31 PC chapters (Phase 3.3).');
  out.writeln('-- Auto-generated by backend/seed/json_encode_long_lessons_pc.dart.');
  out.writeln('-- Replaces stub lessons from migration 032 with full LessonV2 content.');
  out.writeln('-- Idempotent: re-running rewrites the same JSON.');
  out.writeln('BEGIN;');
  out.writeln();

  for (final entry in _chapters.entries) {
    final code = entry.key;
    final lesson = entry.value;
    final json = jsonEncode(lesson);
    final escaped = json.replaceAll("'", "''");
    out.writeln(
        "UPDATE public.skills SET lesson = '$escaped'::jsonb WHERE code = '$code';");
  }

  out.writeln();
  out.writeln('COMMIT;');

  File('backend/supabase/migrations/033_long_lessons_pc.sql')
      .writeAsStringSync(out.toString());
  stdout.writeln(
      'Wrote backend/supabase/migrations/033_long_lessons_pc.sql (${_chapters.length} chapters).');
}
