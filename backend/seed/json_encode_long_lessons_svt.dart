// Phase 4.3 encoder: long-form (v2) lessons for the 25 SVT chapters.
//
// Mirrors json_encode_long_lessons_pc.dart structure. Math (5) and Physique-
// Chimie (8) lessons are simplified versions of PC equivalents. Bio/geo (12)
// is NOVEL authoring — flagged for SME review.
//
// Output: backend/supabase/migrations/037_long_lessons_svt.sql

import 'dart:convert';
import 'dart:io';

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
// SVT Math (5 chapters) — lighter than PC
// ============================================================================

Map<String, dynamic> _svtArithGeomSeq() => _lesson(
      titleFr: 'Suites arithmétiques et géométriques',
      subtitleFr: 'Raison additive ou multiplicative, formules.',
      sections: [
        _section(kind: 'concept', titleFr: 'Définitions', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _p("**Arithmétique** : on ajoute toujours la même raison \$r\$. **Géométrique** : on multiplie toujours par la même raison \$q\$."),
          _f("u_n = u_0 + n r \\quad \\text{(arithm.)}, \\qquad u_n = u_0 \\cdot q^n \\quad \\text{(géom.)}", "Termes généraux."),
          _f("S_\\text{arithm} = (n+1) \\frac{u_0 + u_n}{2}, \\qquad S_\\text{géom} = u_0 \\frac{1 - q^{n+1}}{1-q}", "Sommes."),
          _example(
            title: "Croissance bactérienne",
            problem: "Une colonie double toutes les heures, départ 100 bactéries. Effectif à t=5h ?",
            steps: ["Géométrique \$q=2\$, \$u_0 = 100\$.", "\$u_5 = 100 \\cdot 32 = 3200\$ bactéries."],
            answer: "3200 bactéries.",
          ),
          _checkpoint("Suites", [
            _q(stem: "Raison de \$3, 7, 11, 15\$ :", choices: ['2', '3', '4', '5'], correct: 2, explanation: "Différence constante 4."),
            _q(stem: "\$u_0=1\$, \$q=3\$, alors \$u_4\$ :", choices: ['12', '27', '81', '243'], correct: 2, explanation: "\$1 \\cdot 3^4 = 81\$."),
            _q(stem: "Somme \$1+2+\\dots+20\$ :", choices: ['100', '200', '210', '400'], correct: 2, explanation: "\$20 \\times 21/2 = 210\$."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _svtLimitCalc() => _lesson(
      titleFr: 'Calcul de limites',
      subtitleFr: 'Substitution, factorisation, infini.',
      sections: [
        _section(kind: 'concept', titleFr: 'Méthodes', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("**Substitution directe** si \$f\$ continue. Si on tombe sur \$0/0\$, factoriser et simplifier."),
          _p("**À l'infini** : pour un quotient de polynômes, regarder le rapport des termes dominants."),
          _f("\\lim_{x \\to +\\infty} \\frac{e^x}{x^n} = +\\infty, \\quad \\lim_{x \\to +\\infty} \\frac{\\ln x}{x} = 0", "Croissances comparées (à mémoriser)."),
          _example(
            title: "Forme 0/0",
            problem: "\$\\lim_{x \\to 2} (x^2 - 4)/(x - 2)\$",
            steps: ["Factoriser : \$(x-2)(x+2)/(x-2) = x+2\$.", "Limite = \$2+2 = 4\$."],
            answer: "4.",
          ),
          _checkpoint("Limites", [
            _q(stem: "\$\\lim_{x \\to 0} \\sin x/x\$ :", choices: ['0', '1', 'π', '∞'], correct: 1, explanation: "Limite usuelle."),
            _q(stem: "\$\\lim_{x \\to +\\infty} 1/x^2\$ :", choices: ['0', '1', '∞', "n'existe pas"], correct: 0, explanation: "\$1/x^\\alpha \\to 0\$ pour \$\\alpha > 0\$."),
            _q(stem: "\$\\lim_{x \\to +\\infty} (3x^2)/(x^2+1)\$ :", choices: ['0', '1', '3', '∞'], correct: 2, explanation: "Coeff dominants."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _svtDerivApps() => _lesson(
      titleFr: 'Dérivation et applications',
      subtitleFr: 'Règles, variations, extrema.',
      sections: [
        _section(kind: 'concept', titleFr: 'Règles de dérivation', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _f("(x^n)' = n x^{n-1}, \\quad (\\sqrt x)' = \\frac{1}{2\\sqrt x}, \\quad (\\sin x)' = \\cos x, \\quad (e^x)' = e^x, \\quad (\\ln x)' = 1/x", "Dérivées usuelles."),
          _f("(uv)' = u'v + uv', \\quad (u/v)' = (u'v - uv')/v^2, \\quad (f \\circ g)'(x) = f'(g(x)) g'(x)", "Produit, quotient, composition."),
        ]),
        _section(kind: 'concept', titleFr: 'Variations et extrema', eyebrowFr: 'APPLICATIONS', estimatedMinutes: '4', blocks: [
          _p("Le **signe de \$f'\$** donne le sens de variation : \$f' > 0\$ → croissante, \$f' < 0\$ → décroissante."),
          _p("Aux **extrema locaux**, \$f' = 0\$ (tangente horizontale)."),
          _checkpoint("Dérivation", [
            _q(stem: "Dérivée de \$3x^2 - x + 5\$ :", choices: ['\$6x\$', '\$6x - 1\$', '\$3x - 1\$', '\$6x + 5\$'], correct: 1, explanation: "Linéarité, \$(x^2)' = 2x\$."),
            _q(stem: "Si \$f' > 0\$, \$f\$ est :", choices: ['constante', 'croissante', 'décroissante', 'maximale'], correct: 1, explanation: "Dérivée positive → croissance."),
            _q(stem: "À un max local : \$f'(x_0) = ?\$", choices: ['1', '0', '∞', 'indéfini'], correct: 1, explanation: "Tangente horizontale."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _svtExpLnCombined() => _lesson(
      titleFr: 'Fonctions exponentielle et logarithme',
      subtitleFr: 'Propriétés algébriques, croissances comparées.',
      sections: [
        _section(kind: 'concept', titleFr: 'Définitions et propriétés', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("\$\\exp(x) = e^x\$ est définie sur \$\\mathbb{R}\$, à valeurs dans \$]0, +\\infty[\$. **Réciproque** : \$\\ln\$, définie sur \$]0, +\\infty[\$."),
          _f("e^a \\cdot e^b = e^{a+b}, \\quad \\ln(ab) = \\ln a + \\ln b, \\quad \\ln(e^x) = x", "Propriétés clés."),
          _f("(e^x)' = e^x, \\quad (\\ln x)' = 1/x", "Dérivées."),
          _f("\\lim_{x \\to +\\infty} e^x/x = +\\infty, \\quad \\lim_{x \\to +\\infty} \\ln x/x = 0", "Croissances comparées."),
        ]),
        _section(kind: 'concept', titleFr: 'Application en SVT — décroissance', eyebrowFr: 'APPLICATION', estimatedMinutes: '4', blocks: [
          _p("**Modèle exponentiel** : utilisé pour la radioactivité, la pharmacocinétique, la décroissance d'une population de bactéries dans un milieu hostile."),
          _f("N(t) = N_0 e^{-\\lambda t}", "Décroissance exponentielle, demi-vie \$t_{1/2} = \\ln 2/\\lambda\$."),
          _checkpoint("Exp et ln", [
            _q(stem: "\$\\ln(e^2)\$ vaut :", choices: ['0', '1', '2', '\$e^2\$'], correct: 2, explanation: "\$\\ln(e^x) = x\$."),
            _q(stem: "\$e^0\$ vaut :", choices: ['0', '1', '\$e\$', '∞'], correct: 1, explanation: "Définition."),
            _q(stem: "Demi-vie d'une décroissance \$N_0 e^{-\\lambda t}\$ :", choices: ['\$1/\\lambda\$', '\$\\ln 2/\\lambda\$', '\$\\lambda \\ln 2\$', '\$2\\lambda\$'], correct: 1, explanation: "\$t_{1/2} = \\ln 2/\\lambda\$."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _svtIntegralBasics() => _lesson(
      titleFr: 'Primitives et intégrales (bases)',
      subtitleFr: 'Définition, calcul, aires.',
      sections: [
        _section(kind: 'concept', titleFr: 'Primitives et intégrale', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("\$F\$ est primitive de \$f\$ si \$F' = f\$. Deux primitives diffèrent d'une constante."),
          _f("\\int_a^b f(x)\\,dx = F(b) - F(a)", "**Newton-Leibniz**."),
          _f("\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C, \\quad \\int e^x\\,dx = e^x + C, \\quad \\int 1/x\\,dx = \\ln|x| + C", "Primitives usuelles."),
          _example(
            title: "Calcul d'aire",
            problem: "Aire sous \$y = x^2\$ entre 0 et 3.",
            steps: ["\$\\int_0^3 x^2\\,dx = [x^3/3]_0^3 = 9\$."],
            answer: "9.",
          ),
          _checkpoint("Intégrales", [
            _q(stem: "Primitive de \$2x\$ :", choices: ['\$2\$', '\$x^2\$', '\$x\$', '\$2 x^2\$'], correct: 1, explanation: "\$(x^2)' = 2x\$."),
            _q(stem: "\$\\int_0^1 1\\,dx\$ vaut :", choices: ['0', '1', 'x', 'C'], correct: 1, explanation: "Aire d'un rectangle 1×1."),
            _q(stem: "\$\\int_1^e 1/x\\,dx\$ :", choices: ['0', '1', '\$e\$', '\$e-1\$'], correct: 1, explanation: "\$[\\ln x]_1^e = 1\$."),
          ]),
        ]),
      ],
    );

// ============================================================================
// SVT Physique-Chimie (8 chapters)
// ============================================================================

Map<String, dynamic> _svtNewtonApps() => _lesson(
      titleFr: 'Lois de Newton et applications',
      subtitleFr: 'Inertie, F = ma, action-réaction.',
      sections: [
        _section(kind: 'concept', titleFr: 'Les trois lois', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("**1ère loi (inertie)** : un objet isolé est au repos ou en MRU."),
          _f("\\sum \\vec F = m \\vec a", "**2ème loi** : force totale = masse × accélération."),
          _p("**3ème loi (action-réaction)** : forces toujours par paires opposées."),
          _example(
            title: "Plan incliné",
            problem: "Bloc 5 kg sur plan à 30° (sans frottement). Accélération ? (g=10)",
            steps: ["Selon le plan : \$m a = m g \\sin 30°\$.", "\$a = g \\sin 30° = 5\\,\\text{m/s}^2\$."],
            answer: "5 m/s².",
          ),
          _checkpoint("Newton", [
            _q(stem: "Si \$\\sum \\vec F = \\vec 0\$, l'objet :", choices: ['accélère', 'repos ou MRU', 'tombe', 'tourne'], correct: 1, explanation: "1ère loi."),
            _q(stem: "Force = ?", choices: ['\$m v\$', '\$m a\$', '\$m g\$', '\$m h\$'], correct: 1, explanation: "2ème loi."),
            _q(stem: "Unité de la force :", choices: ['\$\\text{kg}\$', '\$\\text{N}\$', '\$\\text{J}\$', '\$\\text{W}\$'], correct: 1, explanation: "Newton."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _svtEnergy() => _lesson(
      titleFr: 'Énergie mécanique',
      subtitleFr: 'Cinétique, potentielle, conservation.',
      sections: [
        _section(kind: 'concept', titleFr: 'Formes et conservation', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _f("E_c = \\frac{1}{2} m v^2, \\quad E_p = m g h, \\quad E_m = E_c + E_p", "Énergies."),
          _p("**Sans frottement** : \$E_m\$ est **conservée**. Avec frottements : \$E_m\$ diminue (chaleur)."),
          _example(
            title: "Chute libre",
            problem: "Pierre lâchée d'une hauteur \$h\$. Vitesse en bas ?",
            steps: ["Conservation : \$mgh = \\frac{1}{2} m v^2 \\iff v = \\sqrt{2 g h}\$."],
            answer: "\$v = \\sqrt{2 g h}\$.",
          ),
          _checkpoint("Énergie", [
            _q(stem: "\$E_c\$ d'un objet 2 kg à 5 m/s :", choices: ['5 J', '10 J', '25 J', '50 J'], correct: 2, explanation: "\$(1/2)(2)(25) = 25\$."),
            _q(stem: "Sans frottement, \$E_m\$ :", choices: ['augmente', 'décroît', 'constante', '= 0'], correct: 2, explanation: "Conservation."),
            _q(stem: "Vitesse au sol pour h=5m, g=10 :", choices: ['10 m/s', '\$\\sqrt{100}\$=10 m/s', '50 m/s', '5 m/s'], correct: 0, explanation: "\$v = \\sqrt{2 \\cdot 10 \\cdot 5} = 10\$."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _svtWaves() => _lesson(
      titleFr: 'Ondes mécaniques et lumineuses',
      subtitleFr: 'Propagation, célérité, longueur d\'onde.',
      sections: [
        _section(kind: 'concept', titleFr: 'Grandeurs', eyebrowFr: 'CONCEPT', estimatedMinutes: '4', blocks: [
          _p("Une **onde** transporte de l'énergie sans transporter de matière. **Transversale** (corde) ou **longitudinale** (son)."),
          _f("\\lambda = v T = v/f", "Relation fondamentale."),
          _p("Le **son** se propage dans tout milieu matériel (gaz, liquide, solide). La **lumière** se propage aussi dans le vide (c = 3×10⁸ m/s)."),
          _checkpoint("Ondes", [
            _q(stem: "Relation longueur d'onde / fréquence :", choices: ['\$\\lambda = vf\$', '\$\\lambda = v/f\$', '\$\\lambda = f/v\$', '\$\\lambda = v - f\$'], correct: 1, explanation: "\$\\lambda = v T = v/f\$."),
            _q(stem: "Le son est :", choices: ['transversal', 'longitudinal', 'EM', 'optique'], correct: 1, explanation: "Compressions/raréfactions."),
            _q(stem: "Célérité de la lumière dans le vide :", choices: ['340 m/s', '\$3 \\times 10^8\$ m/s', '\$1500\$ m/s', "\$10^{10}\$ m/s"], correct: 1, explanation: "Constante c."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _svtRadioactivityBasics() => _lesson(
      titleFr: 'Radioactivité et datation',
      subtitleFr: 'Désintégrations, demi-vie, datation par C14.',
      sections: [
        _section(kind: 'concept', titleFr: 'Désintégrations', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("Un noyau radioactif se désintègre en émettant : \$\\alpha\$ (noyau d'hélium), \$\\beta^-\$ (électron), \$\\beta^+\$ (positron), ou \$\\gamma\$ (photon)."),
          _p("**Lois de conservation** : nombre de masse \$A\$ et numéro atomique \$Z\$ totaux préservés."),
          _f("N(t) = N_0 e^{-\\lambda t}, \\quad t_{1/2} = \\ln 2/\\lambda", "Loi de décroissance et demi-vie."),
          _example(
            title: "Datation au C14",
            problem: "Échantillon à 12,5% de l'activité initiale. Âge ? (t½ = 5730 ans)",
            steps: ["\$1/8 = 1/2^3\$ → 3 demi-vies écoulées.", "Âge = 3 × 5730 = 17 190 ans."],
            answer: "≈ 17 200 ans.",
          ),
          _checkpoint("Radioactivité", [
            _q(stem: "Émission alpha = particule :", choices: ['\$^1_1H\$', '\$^4_2He\$', '\$^0_{-1}e\$', '\$\\gamma\$'], correct: 1, explanation: "Noyau d'hélium-4."),
            _q(stem: "Après 2 demi-vies, il reste :", choices: ['1/2', '1/4', '1/8', '0'], correct: 1, explanation: "\$N_0/2^2 = N_0/4\$."),
            _q(stem: "Demi-vie en fonction de \$\\lambda\$ :", choices: ['\$1/\\lambda\$', '\$\\ln 2/\\lambda\$', '\$\\lambda^2\$', '\$2\\lambda\$'], correct: 1, explanation: "\$t_{1/2} = \\ln 2/\\lambda\$."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _svtRcCircuit() => _lesson(
      titleFr: 'Dipôle RC',
      subtitleFr: 'Charge et décharge d\'un condensateur.',
      sections: [
        _section(kind: 'concept', titleFr: 'Charge et décharge', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("Un condensateur stocke de la charge électrique. Associé à une résistance \$R\$, son régime transitoire est **exponentiel**."),
          _f("\\tau = R C, \\quad u_C^\\text{charge}(t) = E(1 - e^{-t/\\tau}), \\quad u_C^\\text{décharge}(t) = U_0 e^{-t/\\tau}", "Constante de temps et solutions."),
          _f("E_C = \\frac{1}{2} C u_C^2", "Énergie stockée."),
          _checkpoint("Dipôle RC", [
            _q(stem: "Constante de temps :", choices: ['\$R + C\$', '\$R/C\$', '\$RC\$', '\$1/(RC)\$'], correct: 2, explanation: "\$\\tau = RC\$ (en secondes)."),
            _q(stem: "À \$t = 5\\tau\$, le condensateur est chargé à :", choices: ['50%', '63%', '95%', '>99%'], correct: 3, explanation: "Régime établi."),
            _q(stem: "Énergie d'un condensateur :", choices: ['\$CU\$', '\$CU^2\$', '\$(1/2) CU^2\$', '\$U/C\$'], correct: 2, explanation: "Formule standard."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _svtPh() => _lesson(
      titleFr: 'pH et solutions',
      subtitleFr: 'Acides, bases, autoprotolyse de l\'eau.',
      sections: [
        _section(kind: 'concept', titleFr: 'pH et acidité', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _f("pH = -\\log[\\text{H}_3\\text{O}^+], \\quad K_e = [\\text{H}_3\\text{O}^+][\\text{OH}^-] = 10^{-14} \\,(25°C)", "Définition et autoprotolyse."),
          _p("**Acide** : pH < 7 (\$[\\text{H}_3\\text{O}^+] > [\\text{OH}^-]\$). **Basique** : pH > 7. **Neutre** : pH = 7 à 25°C."),
          _p("**Acide fort** : totalement dissocié → \$pH = -\\log C\$. **Acide faible** : équilibre, pKa caractéristique."),
          _checkpoint("pH", [
            _q(stem: "pH d'une solution d'acide fort à 0,01 mol/L :", choices: ['1', '2', '7', '12'], correct: 1, explanation: "\$-\\log 10^{-2} = 2\$."),
            _q(stem: "pH d'une solution neutre :", choices: ['0', '7', '10', '14'], correct: 1, explanation: "À 25°C."),
            _q(stem: "Si \$pH = 9\$, \$[\\text{OH}^-]\$ vaut :", choices: ['\$10^{-9}\$', '\$10^{-5}\$', '\$10^{-14}\$', '\$9\$'], correct: 1, explanation: "\$[\\text{H}_3\\text{O}^+] = 10^{-9}\$, \$[\\text{OH}^-] = 10^{-5}\$."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _svtRedoxBasics() => _lesson(
      titleFr: 'Oxydoréduction et piles',
      subtitleFr: 'Couples redox, transferts d\'électrons.',
      sections: [
        _section(kind: 'concept', titleFr: 'Couples et demi-équations', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("**Oxydation** : perte d'électrons. **Réduction** : gain d'électrons. Couples notés \$Ox/Red\$."),
          _f("\\text{Cu}^{2+} + 2 e^- \\to \\text{Cu}, \\quad \\text{Zn} \\to \\text{Zn}^{2+} + 2 e^-", "Demi-équations (Cu²⁺/Cu et Zn²⁺/Zn)."),
          _p("**Pile** : 2 demi-piles reliées par un pont salin. Oxydation à l'anode (-), réduction à la cathode (+)."),
          _f("Q = I \\cdot t = n_e \\cdot F, \\quad F = 96\\,500\\,\\text{C/mol}", "Quantité d'électricité (Faraday)."),
          _checkpoint("Redox", [
            _q(stem: "Oxydation = ?", choices: ['gain e⁻', 'perte e⁻', 'gain H⁺', 'perte H⁺'], correct: 1, explanation: "Définition."),
            _q(stem: "À l'anode d'une pile :", choices: ['réduction', 'oxydation', 'rien', 'décomposition'], correct: 1, explanation: "An-Ox."),
            _q(stem: "fem de la pile Daniell :", choices: ['0,1 V', '1,1 V', '11 V', '0 V'], correct: 1, explanation: "Cu - Zn = 0,34 - (-0,76) = 1,10 V."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _svtOrganicBasics() => _lesson(
      titleFr: 'Chimie organique — esters',
      subtitleFr: 'Estérification, hydrolyse, saponification.',
      sections: [
        _section(kind: 'concept', titleFr: 'Esters et leur formation', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _f("\\text{R-COOH} + \\text{R'-OH} \\rightleftharpoons \\text{R-COO-R'} + \\text{H}_2\\text{O}", "Estérification (sens →) / hydrolyse (sens ←)."),
          _p("**Lente, limitée, athermique** (K ≈ 4). On peut déplacer l'équilibre : excès de réactif, ou élimination d'eau."),
          _p("**Saponification** : ester + base forte → carboxylate + alcool, **totale**. Procédé industriel pour les savons."),
          _p("**Importance biologique** : les **triglycérides** (graisses) sont des **triesters** d'acides gras et de glycérol."),
          _checkpoint("Esters", [
            _q(stem: "Estérification :", choices: ['rapide', 'lente et limitée', 'totale', 'exothermique forte'], correct: 1, explanation: "Caractéristiques."),
            _q(stem: "Saponification = ester + ?", choices: ['eau', 'acide', 'base forte', 'sucre'], correct: 2, explanation: "Réaction totale."),
            _q(stem: "Effet de T sur estérification (équilibre) :", choices: ['favorise', 'défavorise', 'aucun (athermique)', 'annule'], correct: 2, explanation: "ΔH ≈ 0."),
          ]),
        ]),
      ],
    );

// ============================================================================
// SVT bio/geo (12 chapters) — NOVEL authoring, flagged for SME review
// ============================================================================

Map<String, dynamic> _svtGenetiqueHumaine() => _lesson(
      titleFr: 'Génétique humaine — lois de Mendel',
      subtitleFr: 'Monohybridisme, dihybridisme, hérédité.',
      sections: [
        _section(kind: 'concept', titleFr: 'Vocabulaire et 1ère loi', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("**Gène** : segment d'ADN codant un caractère. **Allèles** : versions d'un même gène (ex : couleur des yeux bleus/marrons). **Génotype** : ensemble des allèles. **Phénotype** : caractère observable."),
          _p("Un individu est **homozygote** si ses deux allèles sont identiques (AA ou aa), **hétérozygote** sinon (Aa). L'allèle **dominant** s'exprime même chez l'hétérozygote ; le **récessif** ne s'exprime que chez l'homozygote."),
          _p("**1ère loi de Mendel (uniformité)** : croisement entre deux lignées pures → F1 100% **hétérozygote**, phénotype dominant uniforme."),
        ]),
        _section(kind: 'concept', titleFr: '2ème loi et 3ème loi', eyebrowFr: 'LOIS', estimatedMinutes: '5', blocks: [
          _p("**2ème loi (ségrégation)** : croisement F1 × F1 → F2 phénotypiquement **3:1** (3 dominants pour 1 récessif). Génotypique : 1 AA : 2 Aa : 1 aa."),
          _p("**3ème loi (assortiment indépendant)** : pour deux gènes sur **chromosomes différents**, en F2 dihybride : **9:3:3:1** (dominant×dominant : dominant×récessif : récessif×dominant : récessif×récessif)."),
          _example(
            title: "Monohybridisme",
            problem: "Croisement AA × aa. Proportions en F2 ?",
            steps: ["F1 : 100% Aa (phénotype dominant).", "F2 (Aa × Aa) : 1 AA : 2 Aa : 1 aa → phénotypes 3 dominants : 1 récessif."],
            answer: "3:1 phénotypique.",
          ),
          _checkpoint("Mendel", [
            _q(stem: "F1 d'un croisement AA × aa :", choices: ['AA', 'aa', 'Aa', 'mélangé'], correct: 2, explanation: "Tous hétérozygotes."),
            _q(stem: "Ratio phénotypique F2 monohybride :", choices: ['1:1', '3:1', '9:3:3:1', '1:2:1'], correct: 1, explanation: "2ème loi."),
            _q(stem: "Ratio F2 dihybride (gènes indépendants) :", choices: ['1:1', '3:1', '9:3:3:1', '1:2:1'], correct: 2, explanation: "3ème loi."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _svtGenetiquePopulations() => _lesson(
      titleFr: 'Génétique des populations — Hardy-Weinberg',
      subtitleFr: 'Fréquences alléliques, équilibre génétique.',
      sections: [
        _section(kind: 'concept', titleFr: 'Loi de Hardy-Weinberg', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("Pour un gène à 2 allèles \$A\$ et \$a\$ de fréquences \$p\$ et \$q\$ (avec \$p + q = 1\$), les fréquences génotypiques à l'équilibre sont :"),
          _f("f(AA) = p^2, \\quad f(Aa) = 2pq, \\quad f(aa) = q^2", "Loi de Hardy-Weinberg."),
          _callout('warning', 'Conditions de validité',
              "Population grande, pas de sélection, pas de mutation, pas de migration, accouplement au hasard. Toute déviation indique une force évolutive à l'œuvre."),
        ]),
        _section(kind: 'concept', titleFr: 'Calculs', eyebrowFr: 'EXEMPLES', estimatedMinutes: '4', blocks: [
          _example(
            title: "Allèle récessif",
            problem: "Dans une population, 4% des individus sont \$aa\$. Fréquence de \$a\$ ?",
            steps: ["\$f(aa) = q^2 = 0{,}04\$ → \$q = 0{,}2\$.", "Fréquence de \$A\$ : \$p = 0{,}8\$.", "Hétérozygotes : \$2 p q = 0{,}32 = 32\\%\$."],
            answer: "\$q = 0{,}2\$.",
          ),
          _checkpoint("Hardy-Weinberg", [
            _q(stem: "Si \$p = 0{,}5\$, fréquence des hétérozygotes :", choices: ['0,25', '0,5', '0,75', '1'], correct: 1, explanation: "\$2 \\times 0{,}5 \\times 0{,}5 = 0{,}5\$."),
            _q(stem: "\$f(AA) + f(Aa) + f(aa)\$ vaut :", choices: ['p', 'q', '1', 'pq'], correct: 2, explanation: "Total des fréquences."),
            _q(stem: "Une dérive génétique violerait :", choices: ['pas de sélection', 'population grande', 'panmixie', 'pas de migration'], correct: 1, explanation: "Dérive = effet hasard, fort en petite pop."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _svtDiversificationGenetique() => _lesson(
      titleFr: 'Diversification génétique — méiose et brassage',
      subtitleFr: 'Méiose, brassages interchromosomique et intrachromosomique.',
      sections: [
        _section(kind: 'concept', titleFr: 'Méiose', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("La **méiose** est une double division cellulaire qui produit **4 gamètes haploïdes (n)** à partir d'une cellule diploïde (2n). Étapes : prophase I (appariement des chromosomes homologues), métaphase I, anaphase I (séparation des homologues), puis méiose II (comme une mitose)."),
          _p("Le **brassage interchromosomique** se produit en métaphase/anaphase I : chaque paire d'homologues s'oriente **au hasard**. Pour \$n\$ paires, on obtient \$2^n\$ combinaisons (chez l'homme, \$n=23\$ → \$2^{23} \\approx 8 \\times 10^6\$ combinaisons)."),
        ]),
        _section(kind: 'concept', titleFr: 'Brassage intrachromosomique et fécondation', eyebrowFr: 'COMBINAISONS', estimatedMinutes: '4', blocks: [
          _p("Le **brassage intrachromosomique** (crossing-over) se produit en prophase I : les chromatides homologues échangent des fragments. Génère de nouvelles combinaisons d'allèles sur le même chromosome."),
          _p("**Fécondation** : combine au hasard 1 gamète femelle parmi \$2^{23}\$ avec 1 gamète mâle parmi \$2^{23}\$ → \$2^{46} \\approx 7 \\times 10^{13}\$ combinaisons. Plus le crossing-over → diversité quasi-infinie."),
          _checkpoint("Diversification", [
            _q(stem: "La méiose produit :", choices: ['2 cellules 2n', '2 cellules n', '4 cellules n', '4 cellules 2n'], correct: 2, explanation: "4 gamètes haploïdes."),
            _q(stem: "Brassage interchromosomique se produit :", choices: ['prophase I', 'anaphase I', 'prophase II', 'télophase II'], correct: 1, explanation: "Séparation aléatoire des homologues."),
            _q(stem: "Crossing-over (intrachromosomique) :", choices: ['prophase I', 'anaphase I', 'métaphase II', 'mitose'], correct: 0, explanation: "Appariement et échange en prophase I."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _svtEvolution() => _lesson(
      titleFr: 'Mécanismes de l\'évolution',
      subtitleFr: 'Sélection naturelle, dérive, mutations, spéciation.',
      sections: [
        _section(kind: 'concept', titleFr: 'Forces évolutives', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("**Mutations** : modifications aléatoires de l'ADN. **Source ultime** de la variation génétique (rare mais inéluctable)."),
          _p("**Sélection naturelle** (Darwin) : les individus les mieux adaptés à leur environnement survivent et se reproduisent davantage → leurs allèles sont sur-représentés à la génération suivante. C'est **non aléatoire**."),
          _p("**Dérive génétique** : variation aléatoire des fréquences alléliques due à l'échantillonnage à chaque génération. Effet majeur dans les **petites populations**."),
          _p("**Migration** (flux génique) : échange d'allèles entre populations."),
        ]),
        _section(kind: 'concept', titleFr: 'Spéciation', eyebrowFr: 'NOUVELLES ESPÈCES', estimatedMinutes: '5', blocks: [
          _p("La **spéciation** est l'émergence d'une nouvelle espèce. Le critère le plus utilisé : **isolement reproductif** (deux populations ne peuvent plus produire de descendants fertiles)."),
          _p("**Modes** : (1) **allopatrique** (séparation géographique → divergence indépendante), (2) **sympatrique** (au sein d'une même zone, par spécialisation écologique ou polyploïdie)."),
          _callout('insight', 'Exemple emblématique',
              "Les pinsons des Galápagos (Darwin) : 13 espèces dérivées d'un ancêtre commun, différenciées par la forme du bec selon l'alimentation disponible sur chaque île."),
          _checkpoint("Évolution", [
            _q(stem: "Source ultime de la variation génétique :", choices: ['sélection', 'mutations', 'reproduction', 'environnement'], correct: 1, explanation: "Seules les mutations créent de nouveaux allèles."),
            _q(stem: "La dérive génétique est :", choices: ['déterministe', 'aléatoire', 'sélective', 'environnementale'], correct: 1, explanation: "Effet du hasard à petite échelle."),
            _q(stem: "Spéciation allopatrique implique :", choices: ['mutations', 'séparation géographique', 'polyploïdie', 'rien'], correct: 1, explanation: "Isolement par barrière géo."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _svtCommunicationNerveuse() => _lesson(
      titleFr: 'Communication nerveuse',
      subtitleFr: 'Neurone, potentiel d\'action, synapse.',
      sections: [
        _section(kind: 'concept', titleFr: 'Le neurone et le PA', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("Un **neurone** est composé d'un corps cellulaire (soma), de dendrites (entrée d'information) et d'un axone (sortie). Long de quelques µm à plus de 1 m."),
          _p("**Au repos** : différence de potentiel transmembranaire d'environ \$-70\\,\\text{mV}\$ (intérieur négatif). Maintenue par la pompe Na⁺/K⁺ et les canaux ioniques."),
          _p("**Potentiel d'action (PA)** : inversion brusque de polarité (de -70 à environ +40 mV) qui se propage le long de l'axone. **Loi du tout ou rien** : déclenché si stimulation atteint un seuil, sinon rien."),
          _p("**Codage de l'information** : par la **fréquence** des PA (et non leur amplitude, fixe). Plus le stimulus est fort, plus la fréquence est élevée."),
        ]),
        _section(kind: 'concept', titleFr: 'La synapse', eyebrowFr: 'TRANSMISSION', estimatedMinutes: '4', blocks: [
          _p("À la jonction entre deux neurones (ou neurone-effecteur), la **synapse** transmet l'information. Le PA présynaptique provoque la libération de **neurotransmetteurs** (acétylcholine, dopamine, GABA...) dans la fente synaptique."),
          _p("Les neurotransmetteurs se fixent sur des récepteurs postsynaptiques → nouveau PA ou inhibition selon le type."),
          _callout('insight', 'Vitesse de propagation',
              "Sans gaine de myéline : ~1 m/s. Avec myéline (propagation saltatoire de nœud en nœud de Ranvier) : jusqu'à 100 m/s. Sclérose en plaques = perte de myéline → ralentissement neuronal."),
          _checkpoint("Communication nerveuse", [
            _q(stem: "Potentiel de repos d'un neurone :", choices: ['+70 mV', '0 mV', '-70 mV', '+40 mV'], correct: 2, explanation: "Intérieur négatif."),
            _q(stem: "Codage de l'intensité du stimulus :", choices: ['amplitude du PA', 'durée du PA', 'fréquence des PA', 'forme du PA'], correct: 2, explanation: "Loi du tout ou rien."),
            _q(stem: "À la synapse, transmission par :", choices: ['électricité directe', 'neurotransmetteurs', 'ondes', 'aucun'], correct: 1, explanation: "Synapse chimique."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _svtCommunicationHormonale() => _lesson(
      titleFr: 'Communication hormonale',
      subtitleFr: 'Glandes endocrines, régulation, rétrocontrôle.',
      sections: [
        _section(kind: 'concept', titleFr: 'Hormones et glandes', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("Une **hormone** est une molécule sécrétée par une **glande endocrine** dans le sang, qui agit sur des **cellules-cibles** distantes possédant des récepteurs spécifiques."),
          _p("**Glandes principales** : hypothalamus, hypophyse (cheffe d'orchestre), thyroïde (thyroxine — métabolisme), surrénales (adrénaline, cortisol — stress), pancréas (insuline/glucagon — glycémie), gonades (testostérone/œstrogènes — reproduction)."),
        ]),
        _section(kind: 'concept', titleFr: 'Régulation par rétrocontrôle', eyebrowFr: 'BOUCLE', estimatedMinutes: '5', blocks: [
          _p("**Rétrocontrôle négatif** : la sortie d'un système inhibe son entrée → stabilisation. Exemple : la glycémie augmente → insuline sécrétée → glycémie baisse → insuline diminue."),
          _p("**Axe hypothalamo-hypophyso-cible** : l'hypothalamus libère des neurohormones qui agissent sur l'hypophyse, qui libère des hormones agissant sur des glandes cibles (thyroïde, surrénales, gonades). La cible exerce un rétrocontrôle sur l'hypothalamus/hypophyse."),
          _example(
            title: "Régulation glycémique",
            problem: "Glycémie haute. Mécanisme de régulation ?",
            steps: ["Pancréas (cellules β) détecte la hausse → libère de l'**insuline**.", "L'insuline fait entrer le glucose dans les cellules (foie, muscle) → glycémie baisse.", "La baisse → réduction de l'insuline. Rétrocontrôle négatif."],
            answer: "Insuline → diminution de glycémie.",
          ),
          _checkpoint("Hormones", [
            _q(stem: "L'insuline est sécrétée par :", choices: ['foie', 'pancréas', 'thyroïde', 'surrénales'], correct: 1, explanation: "Cellules β des îlots de Langerhans."),
            _q(stem: "Rétrocontrôle négatif :", choices: ['amplifie', 'stabilise', 'inverse', 'détruit'], correct: 1, explanation: "Sortie inhibe l'entrée."),
            _q(stem: "Le diabète de type 1 est dû à :", choices: ['excès d\'insuline', 'manque d\'insuline', 'manque de glucose', 'excès de glucagon'], correct: 1, explanation: "Cellules β détruites → pas d'insuline."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _svtImmunite() => _lesson(
      titleFr: 'Immunité innée et acquise',
      subtitleFr: 'Défense de l\'organisme, vaccination.',
      sections: [
        _section(kind: 'concept', titleFr: 'Deux lignes de défense', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("**Immunité innée** (immédiate, non-spécifique) : barrières (peau, muqueuses), réaction inflammatoire, phagocytes (macrophages, neutrophiles), système du complément. Réagit en quelques heures, sans mémoire."),
          _p("**Immunité acquise** (différée, spécifique) : intervient si l'innée ne suffit pas. Deux voies :"),
          _p("- **Humorale (LB)** : les lymphocytes B produisent des **anticorps** spécifiques qui neutralisent les antigènes.\n- **Cellulaire (LT)** : les lymphocytes T cytotoxiques détruisent les cellules infectées."),
        ]),
        _section(kind: 'concept', titleFr: 'Mémoire et vaccination', eyebrowFr: 'PROTECTION', estimatedMinutes: '5', blocks: [
          _p("Après une première rencontre avec un antigène, des **cellules mémoire** persistent. Lors d'un second contact, la réponse est **plus rapide et plus intense** → protection."),
          _p("**Vaccination** : on injecte un antigène atténué ou inactivé → réponse immunitaire **sans la maladie** → mémoire. À la rencontre réelle du pathogène, l'organisme est protégé."),
          _callout('warning', 'VIH et immunité',
              "Le VIH attaque les LT4 auxiliaires (chefs d'orchestre de la réponse immunitaire). À terme, le système immunitaire s'effondre → SIDA → infections opportunistes."),
          _checkpoint("Immunité", [
            _q(stem: "L'immunité innée est :", choices: ['lente', 'spécifique', 'rapide non-spécifique', 'avec mémoire'], correct: 2, explanation: "Première ligne de défense."),
            _q(stem: "Les anticorps sont produits par :", choices: ['LT', 'LB', 'macrophages', 'érythrocytes'], correct: 1, explanation: "Lymphocytes B (plasmocytes)."),
            _q(stem: "La vaccination crée :", choices: ['immunité innée', 'mémoire immunitaire', 'inflammation', 'allergie'], correct: 1, explanation: "Préparer la réponse secondaire."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _svtTectoniquePlaques() => _lesson(
      titleFr: 'Tectonique des plaques',
      subtitleFr: 'Lithosphère, frontières de plaques, dorsales et subduction.',
      sections: [
        _section(kind: 'concept', titleFr: 'Plaques et mouvements', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("La **lithosphère** (croûte + manteau supérieur, environ 100 km d'épaisseur) est fragmentée en une douzaine de **plaques tectoniques** qui se déplacent sur l'**asthénosphère** (manteau ductile)."),
          _p("**Vitesse** : 1 à 10 cm/an typiquement. Mesurable par GPS et magnétisme."),
          _p("**Trois types de frontières** :"),
          _p("- **Divergente (dorsale océanique)** : les plaques s'écartent, le magma remonte → **nouvelle croûte océanique** se forme (Atlantique).\n- **Convergente (subduction)** : une plaque plonge sous l'autre → fosses océaniques, volcans, séismes profonds (chaîne andine).\n- **Transformante** : glissement latéral, sans création ni destruction de croûte (faille de San Andreas)."),
        ]),
        _section(kind: 'concept', titleFr: 'Preuves et conséquences', eyebrowFr: 'OBSERVATIONS', estimatedMinutes: '4', blocks: [
          _p("**Preuves de la dérive** : (1) **paléomagnétisme** (bandes magnétiques symétriques de part et d'autre des dorsales), (2) datation des croûtes (jeunes près des dorsales, plus vieilles loin), (3) **fossiles communs** sur des continents séparés (Mesosaurus en Afrique/Amérique du Sud)."),
          _p("**Conséquences** : séismes (frontières actives), volcanisme (subductions et dorsales), formation des chaînes de montagnes (collisions : Himalaya = Inde + Asie)."),
          _checkpoint("Tectonique", [
            _q(stem: "Couche solide sur laquelle reposent les plaques :", choices: ['noyau', 'asthénosphère', 'croûte', 'lithosphère'], correct: 1, explanation: "Manteau ductile."),
            _q(stem: "À une dorsale océanique :", choices: ['les plaques convergent', 'les plaques divergent', 'glissement', 'aucun mouvement'], correct: 1, explanation: "Création de croûte."),
            _q(stem: "Vitesse typique d'une plaque :", choices: ['1-10 cm/an', '1-10 m/an', '1 m/s', '1 cm/s'], correct: 0, explanation: "Vitesse géologique lente."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _svtGeochronologie() => _lesson(
      titleFr: 'Géochronologie',
      subtitleFr: 'Datation absolue et relative.',
      sections: [
        _section(kind: 'concept', titleFr: 'Datation absolue', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("**Datation par radioactivité** : un isotope radioactif (chronomètre) se désintègre selon \$N(t) = N_0 e^{-\\lambda t}\$. En mesurant le rapport isotope-père / isotope-fils, on déduit l'âge."),
          _p("**Couples utilisés selon l'âge** :"),
          _p("- **Carbone 14** (\$t_{1/2} = 5730\$ ans) : matière organique, archéologie jusqu'à ~50 000 ans.\n- **Potassium-Argon** (\$t_{1/2} = 1{,}25 \\times 10^9\$ ans) : roches volcaniques, millions d'années.\n- **Uranium-Plomb** (\$t_{1/2} = 4{,}5 \\times 10^9\$ ans) : roches anciennes, jusqu'à l'âge de la Terre (4,57 Ga)."),
          _f("t = \\frac{1}{\\lambda} \\ln\\frac{N_0}{N} = \\frac{t_{1/2}}{\\ln 2} \\ln\\frac{N_0}{N}", "Formule de datation."),
        ]),
        _section(kind: 'concept', titleFr: 'Datation relative', eyebrowFr: 'PRINCIPES', estimatedMinutes: '4', blocks: [
          _p("Sans valeur d'âge mais en relatif (avant/après) :"),
          _p("- **Superposition** : dans une série non perturbée, les couches inférieures sont les plus anciennes.\n- **Recoupement** : une formation qui en recoupe une autre est postérieure.\n- **Identité paléontologique** : deux couches contenant les mêmes fossiles 'stratigraphiques' sont contemporaines."),
          _example(
            title: "Datation au C14",
            problem: "Échantillon à 25% de l'activité initiale. Âge ? (t½ = 5730)",
            steps: ["\$1/4 = 1/2^2\$ → 2 demi-vies.", "Âge = 2 × 5730 = 11 460 ans."],
            answer: "≈ 11 500 ans.",
          ),
          _checkpoint("Géochronologie", [
            _q(stem: "Couple radioactif pour l'archéologie (jusqu'à 50 000 ans) :", choices: ['U-Pb', 'K-Ar', 'C14', 'Rb-Sr'], correct: 2, explanation: "Demi-vie 5730 ans."),
            _q(stem: "Principe de superposition dit que :", choices: ['les couches inférieures sont récentes', 'les couches inférieures sont anciennes', 'tout est contemporain', 'rien'], correct: 1, explanation: "Empilement chronologique."),
            _q(stem: "Âge de la Terre :", choices: ['4,57 milliards d\'années', '6000 ans', '1 million d\'années', '13 milliards d\'années'], correct: 0, explanation: "Datation U-Pb sur météorites."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _svtMetamorphisme() => _lesson(
      titleFr: 'Métamorphisme',
      subtitleFr: 'Transformation des roches sous P et T.',
      sections: [
        _section(kind: 'concept', titleFr: 'Conditions et causes', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("Le **métamorphisme** transforme une roche **à l'état solide** sous l'effet d'une augmentation de **pression** et/ou **température** (sans fusion ; au-delà, on parle de magmatisme)."),
          _p("**Domaines de P-T** :"),
          _p("- **Métamorphisme de contact** : forte T, faible P, autour des intrusions magmatiques.\n- **Métamorphisme régional** : grandes échelles, lors des collisions tectoniques (P et T élevées).\n- **Métamorphisme de subduction** : forte P, T modérée (HP-BT, ex. éclogites).\n- **Métamorphisme de dorsale** : P et T modérées."),
        ]),
        _section(kind: 'concept', titleFr: 'Faciès et minéraux indicateurs', eyebrowFr: 'INDICATEURS', estimatedMinutes: '4', blocks: [
          _p("Les **faciès métamorphiques** (schiste vert, amphibolite, granulite, éclogite, schiste bleu) correspondent à des domaines P-T précis. Chaque faciès a des **minéraux index** caractéristiques."),
          _p("**Lecture inverse** : la présence d'un minéral particulier dans une roche permet de déduire les conditions P-T qu'elle a subies — donc l'histoire tectonique."),
          _callout('insight', 'Cycle métamorphique',
              "Une roche subduite peut atteindre les conditions éclogite (>700 MPa, ~500°C), puis remonter (exhumation). Les éclogites de surface racontent une plongée passée à grande profondeur."),
          _checkpoint("Métamorphisme", [
            _q(stem: "Métamorphisme = transformation :", choices: ['par fusion', 'à l\'état solide', 'sous l\'eau seulement', 'par érosion'], correct: 1, explanation: "Sans atteindre la fusion."),
            _q(stem: "Métamorphisme de subduction est :", choices: ['HP-HT', 'BP-HT', 'HP-BT', 'BP-BT'], correct: 2, explanation: "Forte pression, T modérée."),
            _q(stem: "Les minéraux d'une roche métamorphique permettent de :", choices: ['dater', 'identifier P-T subies', 'mesurer densité', 'rien'], correct: 1, explanation: "Reconstitution thermobarométrique."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _svtEnergieCellulaire() => _lesson(
      titleFr: 'Énergie cellulaire — respiration et photosynthèse',
      subtitleFr: 'Métabolisme énergétique, ATP.',
      sections: [
        _section(kind: 'concept', titleFr: 'Photosynthèse', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("La **photosynthèse** transforme l'énergie lumineuse en énergie chimique (glucides). Lieu : **chloroplastes** des cellules végétales."),
          _f("6\\,\\text{CO}_2 + 6\\,\\text{H}_2\\text{O} + \\text{lumière} \\to \\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\,\\text{O}_2", "Bilan."),
          _p("Deux phases : (1) **phase claire** (thylakoïdes) — la lumière dissocie l'eau et produit ATP + NADPH + O₂. (2) **phase sombre / cycle de Calvin** (stroma) — utilise ATP et NADPH pour réduire CO₂ en glucose."),
        ]),
        _section(kind: 'concept', titleFr: 'Respiration cellulaire', eyebrowFr: 'INVERSE', estimatedMinutes: '5', blocks: [
          _f("\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\,\\text{O}_2 \\to 6\\,\\text{CO}_2 + 6\\,\\text{H}_2\\text{O} + \\text{ATP}", "Bilan inverse de la photosynthèse, dans les cellules animales et végétales."),
          _p("Trois étapes :"),
          _p("- **Glycolyse** (cytoplasme) : glucose → 2 pyruvate + 2 ATP + 2 NADH.\n- **Cycle de Krebs** (matrice mitochondriale) : pyruvate → CO₂ + NADH + FADH₂.\n- **Chaîne respiratoire** (membrane interne mitochondrie) : O₂ accepte les électrons, gradient de protons produit l'ATP (chimiosmose). **Bilan ~36 ATP par glucose**."),
          _checkpoint("Énergie cellulaire", [
            _q(stem: "La photosynthèse a lieu dans :", choices: ['mitochondries', 'chloroplastes', 'noyau', 'ribosomes'], correct: 1, explanation: "Organite spécialisé."),
            _q(stem: "Produit de la respiration cellulaire :", choices: ['O₂', 'glucose', 'ATP', 'lumière'], correct: 2, explanation: "Énergie utilisable par la cellule."),
            _q(stem: "Bilan ATP par glucose respiré :", choices: ['2', '~36', '100', '1000'], correct: 1, explanation: "Glycolyse (2) + Krebs + chaîne respiratoire."),
          ]),
        ]),
      ],
    );

Map<String, dynamic> _svtEcosystemes() => _lesson(
      titleFr: 'Écosystèmes et flux d\'énergie',
      subtitleFr: 'Producteurs, consommateurs, réseaux trophiques.',
      sections: [
        _section(kind: 'concept', titleFr: 'Niveaux trophiques', eyebrowFr: 'CONCEPT', estimatedMinutes: '5', blocks: [
          _p("Un **écosystème** est l'ensemble d'une **biocénose** (communauté d'êtres vivants) et de son **biotope** (milieu physique). L'énergie y circule depuis le soleil."),
          _p("**Niveaux trophiques** :"),
          _p("- **Producteurs (autotrophes)** : plantes, algues — captent l'énergie solaire par photosynthèse.\n- **Consommateurs primaires** (herbivores) : mangent les producteurs.\n- **Consommateurs secondaires** (carnivores I) : mangent les herbivores. Puis tertiaires, etc.\n- **Décomposeurs** : champignons, bactéries — recyclent la matière morte."),
        ]),
        _section(kind: 'concept', titleFr: 'Flux d\'énergie et cycles', eyebrowFr: 'TRANSFERTS', estimatedMinutes: '4', blocks: [
          _callout('insight', 'Règle des 10%',
              "À chaque transfert trophique, seuls ~10% de l'énergie sont transmis au niveau supérieur — le reste est dissipé en chaleur (respiration, métabolisme). C'est pourquoi les pyramides écologiques sont étroites au sommet."),
          _p("**Cycles biogéochimiques** : la matière (C, N, P, eau) est **recyclée** entre les organismes vivants et le biotope. L'énergie, elle, est **perdue** à chaque étape (entropie)."),
          _checkpoint("Écosystèmes", [
            _q(stem: "Producteurs primaires d'un écosystème terrestre :", choices: ['herbivores', 'plantes vertes', 'champignons', 'carnivores'], correct: 1, explanation: "Photosynthèse → matière organique."),
            _q(stem: "Pourcentage d'énergie transmise par niveau trophique :", choices: ['~10%', '~50%', '~90%', '~100%'], correct: 0, explanation: "Règle des 10%."),
            _q(stem: "Les décomposeurs :", choices: ['mangent les producteurs', 'recyclent la matière morte', 'photosynthèse', 'rien'], correct: 1, explanation: "Bouclent les cycles biogéochimiques."),
          ]),
        ]),
      ],
    );

// ============================================================================
// Registry & main
// ============================================================================

final Map<String, Map<String, dynamic>> _chapters = {
  // Math (5)
  'svt_arith_geom_seq': _svtArithGeomSeq(),
  'svt_limit_calc': _svtLimitCalc(),
  'svt_deriv_apps': _svtDerivApps(),
  'svt_exp_ln_combined': _svtExpLnCombined(),
  'svt_integral_basics': _svtIntegralBasics(),
  // Physique-Chimie (8)
  'svt_newton_apps': _svtNewtonApps(),
  'svt_energy': _svtEnergy(),
  'svt_waves': _svtWaves(),
  'svt_radioactivity_basics': _svtRadioactivityBasics(),
  'svt_rc_circuit': _svtRcCircuit(),
  'svt_ph': _svtPh(),
  'svt_redox_basics': _svtRedoxBasics(),
  'svt_organic_basics': _svtOrganicBasics(),
  // SVT bio/geo (12) — NOVEL, flag for SME review
  'svt_genetique_humaine': _svtGenetiqueHumaine(),
  'svt_genetique_populations': _svtGenetiquePopulations(),
  'svt_diversification_genetique': _svtDiversificationGenetique(),
  'svt_evolution': _svtEvolution(),
  'svt_communication_nerveuse': _svtCommunicationNerveuse(),
  'svt_communication_hormonale': _svtCommunicationHormonale(),
  'svt_immunite': _svtImmunite(),
  'svt_tectonique_plaques': _svtTectoniquePlaques(),
  'svt_geochronologie': _svtGeochronologie(),
  'svt_metamorphisme': _svtMetamorphisme(),
  'svt_energie_cellulaire': _svtEnergieCellulaire(),
  'svt_ecosystemes': _svtEcosystemes(),
};

void main() {
  final out = StringBuffer();
  out.writeln('-- Migration 037: full v2 lessons for the 25 SVT chapters (Phase 4.3).');
  out.writeln('-- Auto-generated by backend/seed/json_encode_long_lessons_svt.dart.');
  out.writeln('-- Math (5) and PC (8) lessons are simplified versions of PC equivalents.');
  out.writeln('-- Bio/geo (12) is NOVEL authoring — REQUIRES SME REVIEW before ship-quality.');
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

  File('backend/supabase/migrations/037_long_lessons_svt.sql')
      .writeAsStringSync(out.toString());
  stdout.writeln(
      'Wrote backend/supabase/migrations/037_long_lessons_svt.sql (${_chapters.length} chapters).');
}
