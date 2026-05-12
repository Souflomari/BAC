// Phase 2 encoder: topic-coherent Bac exam papers for the 32 SMB chapters.
//
// Same structure as json_encode_exam_papers_sma.dart but targeted at the
// SMB curriculum (unprefixed skill codes: arithmetic_seq, limit_calc, etc.).
// SMB is one notch lower in mathematical sophistication than SMA — fewer
// algebraic gymnastics per sub-part, more emphasis on direct application.
//
// Output: backend/supabase/migrations/031_exam_papers_smb.sql

import 'dart:convert';
import 'dart:io';

// ============================================================================
// Builders (same as SMA encoder)
// ============================================================================

Map<String, dynamic> _step(
  String textFr, {
  String? latex,
  String? widgetSlug,
  Map<String, dynamic>? widgetConfig,
  String? mistakeFr,
  String? tipFr,
}) =>
    {
      'text_fr': textFr,
      if (latex != null) 'latex': latex,
      if (widgetSlug != null) 'widget_slug': widgetSlug,
      if (widgetConfig != null) 'widget_config': widgetConfig,
      if (mistakeFr != null) 'mistake_fr': mistakeFr,
      if (tipFr != null) 'tip_fr': tipFr,
    };

Map<String, dynamic> _sol(
  List<Map<String, dynamic>> steps, {
  String? finalAnswerFr,
  String? methodFr,
}) =>
    {
      'steps': steps,
      if (finalAnswerFr != null) 'final_answer_fr': finalAnswerFr,
      if (methodFr != null) 'method_fr': methodFr,
    };

Map<String, dynamic> _q(int number, String stemFr, int points,
        Map<String, dynamic> solution) =>
    {'number': number, 'stem_fr': stemFr, 'points': points, 'solution': solution};

Map<String, dynamic> _qSubs(int number, String stemFr, int points,
        List<Map<String, dynamic>> subparts) =>
    {'number': number, 'stem_fr': stemFr, 'points': points, 'subparts': subparts};

Map<String, dynamic> _sub(
        String letter, String stemFr, int points, Map<String, dynamic> solution) =>
    {'letter': letter, 'stem_fr': stemFr, 'points': points, 'solution': solution};

Map<String, dynamic> _ex(
  int number,
  String titleFr,
  int points,
  String preambleFr,
  List<Map<String, dynamic>> questions, {
  String? widgetSlug,
  Map<String, dynamic>? widgetConfig,
}) =>
    {
      'number': number,
      'title_fr': titleFr,
      'points': points,
      'preamble_fr': preambleFr,
      if (widgetSlug != null) 'widget_slug': widgetSlug,
      if (widgetConfig != null) 'widget_config': widgetConfig,
      'questions': questions,
    };

Map<String, dynamic> _paper({
  required String titleFr,
  required String subtitleFr,
  required int durationMinutes,
  required int totalPoints,
  String? introFr,
  required List<Map<String, dynamic>> exercices,
}) =>
    {
      'version': 1,
      'title_fr': titleFr,
      'subtitle_fr': subtitleFr,
      'duration_minutes': durationMinutes,
      'total_points': totalPoints,
      if (introFr != null) 'intro_fr': introFr,
      'exercices': exercices,
    };

// ============================================================================
// SMB Papers — math
// ============================================================================

Map<String, dynamic> _paperArithmeticSeq() => _paper(
      titleFr: 'Épreuve type — Suites arithmétiques',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Suites arithmétiques : raison, terme général \$u_n = u_0 + nr\$, somme par Gauss \$S = (n+1)(u_0 + u_n)/2\$.",
      exercices: [
        _ex(
          1,
          'Identifier et calculer',
          5,
          "On considère la suite \$(u_n)\$ telle que \$u_0 = 3\$ et \$u_{n+1} = u_n + 5\$.",
          [
            _q(
              1,
              "Justifier que \$(u_n)\$ est arithmétique et donner sa raison.",
              2,
              _sol([
                _step(
                  "Par définition d'une suite arithmétique : \$u_{n+1} - u_n = r\$ constant. Ici \$u_{n+1} - u_n = (u_n + 5) - u_n = 5\$.",
                ),
                _step(
                  "La différence entre deux termes consécutifs est **constante et vaut 5**. Donc \$(u_n)\$ est arithmétique de **raison \$r = 5\$**.",
                ),
              ], finalAnswerFr: r"$r = 5$"),
            ),
            _q(
              2,
              "Donner l'expression de \$u_n\$ en fonction de \$n\$.",
              1,
              _sol([
                _step(
                  "**Terme général** : \$u_n = u_0 + nr = 3 + 5n\$.",
                ),
              ], finalAnswerFr: r"$u_n = 3 + 5n$"),
            ),
            _q(
              3,
              "Calculer \$u_{10}\$, \$u_{20}\$ et \$u_{50}\$.",
              2,
              _sol([
                _step(
                  "Application directe : \$u_{10} = 3 + 50 = 53\$.",
                ),
                _step(
                  "\$u_{20} = 3 + 100 = 103\$ ; \$u_{50} = 3 + 250 = 253\$.",
                  tipFr:
                      "L'expression explicite permet de calculer n'importe quel terme directement, sans énumérer les précédents.",
                ),
              ], finalAnswerFr: r"$u_{10} = 53$, $u_{20} = 103$, $u_{50} = 253$"),
            ),
          ],
        ),
        _ex(
          2,
          'Sommes',
          5,
          "On utilise la suite \$(u_n)\$ de l'Exercice 1.",
          [
            _q(
              1,
              "Calculer la somme \$S = u_0 + u_1 + \\dots + u_{10}\$ (11 termes).",
              3,
              _sol([
                _step(
                  "**Formule de Gauss** : \$S = (\\text{nombre de termes}) \\times \\dfrac{\\text{premier} + \\text{dernier}}{2}\$.",
                ),
                _step(
                  "Ici 11 termes, \$u_0 = 3\$, \$u_{10} = 53\$. Donc \$S = 11 \\times (3 + 53)/2 = 11 \\times 28 = 308\$.",
                ),
              ], finalAnswerFr: r"$S = 308$"),
            ),
            _q(
              2,
              "Calculer \$1 + 2 + 3 + \\dots + 100\$.",
              2,
              _sol([
                _step(
                  "Suite arithmétique de premier terme 1, raison 1, 100 termes.",
                ),
                _step(
                  "**Formule** : \$S_{100} = 100 \\times (1 + 100)/2 = 5050\$. Anecdote : Gauss l'aurait calculée à l'âge de 9 ans, à la surprise de son instituteur.",
                ),
              ], finalAnswerFr: r"$S = 5050$"),
            ),
          ],
        ),
        _ex(
          3,
          'Sens de variation',
          5,
          "Soit \$(v_n)\$ arithmétique de premier terme \$v_0 = 100\$ et raison \$r = -3\$.",
          [
            _q(
              1,
              "Donner l'expression de \$v_n\$ et étudier le sens de variation.",
              3,
              _sol([
                _step(
                  "\$v_n = 100 - 3n\$. Calcul : \$v_{n+1} - v_n = -3 < 0\$. La suite est **strictement décroissante**.",
                ),
                _step(
                  "**Règle générale** : suite arithmétique avec \$r > 0\$ → croissante ; \$r < 0\$ → décroissante ; \$r = 0\$ → constante.",
                ),
              ], finalAnswerFr: r"$v_n = 100 - 3n$, décroissante"),
            ),
            _q(
              2,
              "À partir de quel rang \$n\$ a-t-on \$v_n < 0\$ ?",
              2,
              _sol([
                _step(
                  "\$v_n < 0 \\iff 100 - 3n < 0 \\iff n > 100/3 \\approx 33{,}3\$.",
                ),
                _step(
                  "Donc à partir de \$n = 34\$ : \$v_{34} = 100 - 102 = -2 < 0\$ ✓. Avant : \$v_{33} = 100 - 99 = 1 > 0\$.",
                ),
              ], finalAnswerFr: r"$n \ge 34$"),
            ),
          ],
        ),
        _ex(
          4,
          'Problème — escaliers',
          5,
          "Un escalier comporte 50 marches. La première marche a une hauteur de 18 cm. Chaque marche suivante est 0,2 cm plus haute que la précédente.",
          [
            _q(
              1,
              "Quelle est la hauteur de la 25ème marche ?",
              2,
              _sol([
                _step(
                  "Suite arithmétique de \$u_1 = 18\$, \$r = 0{,}2\$. Terme général : \$u_n = u_1 + (n-1) r = 18 + 0{,}2(n-1)\$.",
                ),
                _step(
                  "Pour la 25ème marche : \$u_{25} = 18 + 0{,}2 \\times 24 = 18 + 4{,}8 = 22{,}8\\,cm\$.",
                ),
              ], finalAnswerFr: r"$u_{25} = 22{,}8$ cm"),
            ),
            _q(
              2,
              "Quelle est la hauteur totale de l'escalier ?",
              3,
              _sol([
                _step(
                  "Hauteur totale = somme de toutes les hauteurs. \$u_{50} = 18 + 0{,}2 \\times 49 = 27{,}8\\,cm\$.",
                ),
                _step(
                  "Somme : \$H = 50 \\times (18 + 27{,}8)/2 = 50 \\times 22{,}9 = 1145\\,cm = 11{,}45\\,m\$.",
                ),
                _step(
                  "Vérification : si toutes les marches faisaient 22,9 cm (la moyenne), la hauteur serait \$50 \\times 22{,}9 = 1145\\,cm\$ ✓.",
                ),
              ], finalAnswerFr: r"$H = 11{,}45$ m"),
            ),
          ],
        ),
      ],
    );

// ============================================================================
// Registry & main
// ============================================================================

Map<String, dynamic> _paperGeometricSeq() => _paper(
      titleFr: 'Épreuve type — Suites géométriques',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Suites géométriques : raison \$q\$, terme général \$u_n = u_0 q^n\$, somme \$S = u_0 (1 - q^{n+1})/(1-q)\$, limites selon \$|q|\$.",
      exercices: [
        _ex(
          1,
          'Identification',
          5,
          "Soit \$(u_n)\$ telle que \$u_0 = 2\$ et \$u_{n+1} = 3 u_n\$.",
          [
            _q(
              1,
              "Montrer que \$(u_n)\$ est géométrique et donner la raison.",
              2,
              _sol([
                _step(
                  "Définition d'une suite géométrique : \$u_{n+1}/u_n = q\$ constant. Ici \$u_{n+1}/u_n = 3\$.",
                ),
                _step(
                  "Donc \$(u_n)\$ est géométrique de **raison \$q = 3\$** (multiplication par 3 à chaque étape).",
                ),
              ], finalAnswerFr: r"$q = 3$"),
            ),
            _q(
              2,
              "Donner \$u_n\$ en fonction de \$n\$ et calculer \$u_5\$, \$u_{10}\$.",
              3,
              _sol([
                _step(
                  "Terme général : \$u_n = u_0 q^n = 2 \\cdot 3^n\$.",
                ),
                _step(
                  "\$u_5 = 2 \\times 243 = 486\$ ; \$u_{10} = 2 \\times 59049 = 118098\$.",
                  tipFr:
                      "Croissance exponentielle pour \$|q| > 1\$ — chaque terme est \$q\$ fois le précédent.",
                ),
              ], finalAnswerFr: r"$u_n = 2 \cdot 3^n$, $u_5 = 486$, $u_{10} = 118098$"),
            ),
          ],
        ),
        _ex(
          2,
          'Sommes',
          5,
          "Avec la suite \$u_n = 2 \\cdot 3^n\$.",
          [
            _q(
              1,
              "Calculer \$S = u_0 + u_1 + \\dots + u_5\$ (6 termes).",
              3,
              _sol([
                _step(
                  "**Formule** : \$S = u_0 \\dfrac{1 - q^{n+1}}{1 - q}\$ pour \$n+1\$ termes.",
                ),
                _step(
                  "Ici 6 termes, \$u_0 = 2\$, \$q = 3\$. \$S = 2 \\dfrac{1 - 3^6}{1 - 3} = 2 \\dfrac{1 - 729}{-2} = 2 \\times 364 = 728\$.",
                ),
              ], finalAnswerFr: r"$S = 728$"),
            ),
            _q(
              2,
              "Limite de la somme infinie \$1 + 1/2 + 1/4 + 1/8 + \\dots\$",
              2,
              _sol([
                _step(
                  "Suite géométrique \$u_0 = 1\$, \$q = 1/2\$, \$|q| < 1\$ → somme infinie converge.",
                ),
                _step(
                  "Formule : \$S_\\infty = u_0/(1 - q) = 1/(1 - 1/2) = 2\$.",
                  tipFr:
                      "Pour \$|q| < 1\$, \$q^n \\to 0\$ et \$S_n \\to u_0/(1-q)\$ — c'est le paradoxe de Zénon résolu.",
                ),
              ], finalAnswerFr: r"$S_\infty = 2$"),
            ),
          ],
        ),
        _ex(
          3,
          'Comportement à l\'infini',
          5,
          "Étudier la limite de la suite \$(u_n)\$ selon la valeur de \$q\$ pour \$u_n = u_0 q^n\$ avec \$u_0 > 0\$.",
          [
            _q(
              1,
              "Donner la limite \$\\lim u_n\$ selon les 4 cas : \$q > 1\$, \$q = 1\$, \$|q| < 1\$, \$q \\le -1\$.",
              5,
              _sol([
                _step(
                  "**\$q > 1\$** : \$q^n \\to +\\infty\$, donc \$u_n \\to +\\infty\$. Croissance exponentielle.",
                ),
                _step(
                  "**\$q = 1\$** : \$u_n = u_0\$ constant. Limite : \$u_0\$.",
                ),
                _step(
                  "**\$|q| < 1\$** (c-à-d \$-1 < q < 1\$) : \$q^n \\to 0\$, donc \$u_n \\to 0\$. Décroissance vers 0.",
                ),
                _step(
                  "**\$q = -1\$** : \$u_n\$ alterne \$\\pm u_0\$ → **pas de limite**.",
                ),
                _step(
                  "**\$q < -1\$** : oscillations divergentes (\$|u_n| \\to +\\infty\$ avec alternance de signe) → **pas de limite**.",
                  tipFr:
                      "Mémo : la limite d'une suite géométrique dépend uniquement de la position de \$q\$ par rapport à 1 et -1.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          4,
          'Application — capital à intérêts composés',
          5,
          "Un capital \$C_0 = 1000\\,€\$ est placé à un taux annuel de 5%. Soit \$C_n\$ le capital après \$n\$ ans.",
          [
            _q(
              1,
              "Justifier que \$(C_n)\$ est géométrique. Donner sa raison.",
              2,
              _sol([
                _step(
                  "Chaque année, le capital est multiplié par \$1{,}05\$ (capital initial + 5% d'intérêts). Donc \$C_{n+1} = 1{,}05 \\times C_n\$.",
                ),
                _step(
                  "Géométrique de raison \$q = 1{,}05\$.",
                ),
              ], finalAnswerFr: r"$q = 1{,}05$"),
            ),
            _q(
              2,
              "Calculer \$C_{10}\$ et \$C_{30}\$.",
              2,
              _sol([
                _step(
                  "\$C_n = C_0 \\times 1{,}05^n = 1000 \\times 1{,}05^n\$.",
                ),
                _step(
                  "\$C_{10} = 1000 \\times 1{,}629 \\approx 1629\\,€\$ ; \$C_{30} = 1000 \\times 4{,}322 \\approx 4322\\,€\$.",
                ),
                _step(
                  "**Insight** : en 30 ans à 5%, le capital plus que quadruple. C'est le pouvoir des intérêts composés (vs intérêts simples qui donneraient 1000 + 30×50 = 2500 €).",
                ),
              ], finalAnswerFr: r"$C_{10} \approx 1629$ €, $C_{30} \approx 4322$ €"),
            ),
            _q(
              3,
              "Après combien d'années le capital aura-t-il doublé ?",
              1,
              _sol([
                _step(
                  "Résoudre \$1{,}05^n = 2 \\iff n = \\ln 2/\\ln 1{,}05 \\approx 0{,}693/0{,}0488 \\approx 14{,}2\\,\\text{ans}\$.",
                ),
                _step(
                  "Donc le capital double en environ **14 ans** au taux de 5%. Règle approximative : 'doublement = 72/taux %' (ici 72/5 = 14,4, très proche).",
                  tipFr:
                      "La 'règle de 72' est très utilisée en finance : à taux r% par an, doublement en ~72/r années.",
                ),
              ], finalAnswerFr: r"$n \approx 14$ ans"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperSeqConvergence() => _paper(
      titleFr: 'Épreuve type — Convergence des suites',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Convergence, limite, théorème des gendarmes, monotonie + bornes, opérations sur les limites.",
      exercices: [
        _ex(
          1,
          'Limites usuelles',
          5,
          "Calculer les limites suivantes.",
          [
            _q(
              1,
              "\$\\lim_{n \\to \\infty} 1/n\$, \$1/n^2\$, \$1/\\sqrt{n}\$.",
              2,
              _sol([
                _step(
                  "**Règle générale** : pour tout \$\\alpha > 0\$, \$\\lim 1/n^\\alpha = 0\$.",
                ),
                _step(
                  "Application : les 3 limites valent **0**. Plus \$\\alpha\$ est grand, plus la décroissance est rapide.",
                ),
              ], finalAnswerFr: r"Toutes valent 0"),
            ),
            _q(
              2,
              "\$\\lim_{n \\to \\infty} \\dfrac{2n + 1}{n + 3}\$.",
              2,
              _sol([
                _step(
                  "Forme \$\\infty/\\infty\$. Diviser haut et bas par \$n\$ : \$\\dfrac{2 + 1/n}{1 + 3/n} \\to \\dfrac{2}{1} = 2\$.",
                ),
                _step(
                  "**Règle** : pour un quotient de polynômes de même degré, limite = rapport des coefficients dominants.",
                ),
              ], finalAnswerFr: r"$\lim = 2$"),
            ),
            _q(
              3,
              "\$\\lim_{n \\to \\infty} \\sqrt{n+1} - \\sqrt{n}\$.",
              1,
              _sol([
                _step(
                  "Forme \$\\infty - \\infty\$. **Astuce de la quantité conjuguée** : multiplier par \$(\\sqrt{n+1} + \\sqrt{n})/(\\sqrt{n+1} + \\sqrt{n})\$.",
                ),
                _step(
                  "\$\\sqrt{n+1} - \\sqrt{n} = \\dfrac{(n+1) - n}{\\sqrt{n+1} + \\sqrt{n}} = \\dfrac{1}{\\sqrt{n+1} + \\sqrt{n}} \\to 0\$.",
                ),
              ], finalAnswerFr: r"$\lim = 0$"),
            ),
          ],
        ),
        _ex(
          2,
          'Théorème des gendarmes',
          5,
          "Soit \$u_n = \\dfrac{\\sin(n)}{n}\$ pour \$n \\ge 1\$.",
          [
            _q(
              1,
              "Encadrer \$u_n\$.",
              2,
              _sol([
                _step(
                  "\$-1 \\le \\sin(n) \\le 1\$. Diviser par \$n > 0\$ : \$-1/n \\le \\sin(n)/n \\le 1/n\$.",
                ),
              ], finalAnswerFr: r"$-1/n \le u_n \le 1/n$"),
            ),
            _q(
              2,
              "En déduire la limite.",
              3,
              _sol([
                _step(
                  "\$\\lim -1/n = 0\$ et \$\\lim 1/n = 0\$.",
                ),
                _step(
                  "Par le **théorème des gendarmes**, \$u_n\$ est encadrée par deux suites qui tendent toutes deux vers 0, donc \$\\lim u_n = 0\$.",
                  tipFr:
                      "Note : \$\\sin(n)\$ n'a PAS de limite, mais \$\\sin(n)/n\$ converge grâce à la décroissance de \$1/n\$.",
                ),
              ], finalAnswerFr: r"$\lim u_n = 0$"),
            ),
          ],
        ),
        _ex(
          3,
          'Convergence par monotonie',
          5,
          "Soit \$(u_n)\$ définie par \$u_0 = 1\$ et \$u_{n+1} = \\sqrt{2 + u_n}\$.",
          [
            _qSubs(
              1,
              "Étude de \$(u_n)\$.",
              4,
              [
                _sub(
                  'a',
                  "Montrer par récurrence que \$1 \\le u_n \\le 2\$.",
                  2,
                  _sol([
                    _step(
                      "**Initialisation** : \$u_0 = 1\$ vérifie \$1 \\le 1 \\le 2\$ ✓.",
                    ),
                    _step(
                      "**Hérédité** : si \$1 \\le u_n \\le 2\$, alors \$3 \\le 2 + u_n \\le 4\$, donc \$\\sqrt 3 \\le \\sqrt{2 + u_n} \\le 2\$. Comme \$\\sqrt 3 > 1\$ : \$1 \\le u_{n+1} \\le 2\$ ✓.",
                    ),
                    _step(
                      "Conclusion : pour tout \$n\$, \$1 \\le u_n \\le 2\$. La suite est **bornée**.",
                    ),
                  ]),
                ),
                _sub(
                  'b',
                  "Montrer que \$(u_n)\$ est croissante.",
                  2,
                  _sol([
                    _step(
                      "On veut \$u_{n+1} \\ge u_n\$, soit \$\\sqrt{2 + u_n} \\ge u_n\$. Élever au carré (tous positifs) : \$2 + u_n \\ge u_n^2 \\iff u_n^2 - u_n - 2 \\le 0 \\iff (u_n - 2)(u_n + 1) \\le 0\$.",
                    ),
                    _step(
                      "Sur \$[1, 2]\$ : \$u_n - 2 \\le 0\$ et \$u_n + 1 > 0\$ → produit \$\\le 0\$ ✓. Donc \$u_{n+1} \\ge u_n\$ : croissante.",
                    ),
                  ]),
                ),
              ],
            ),
            _q(
              2,
              "En déduire que \$(u_n)\$ converge. Calculer sa limite.",
              1,
              _sol([
                _step(
                  "Suite croissante et majorée (par 2) → **convergente** par théorème de la limite monotone.",
                ),
                _step(
                  "Limite \$L\$ : passage à la limite dans \$u_{n+1} = \\sqrt{2 + u_n}\$ donne \$L = \\sqrt{2 + L}\$. Carré : \$L^2 = L + 2 \\iff (L-2)(L+1) = 0\$. Avec \$L \\in [1, 2]\$ : \$L = 2\$.",
                ),
              ], finalAnswerFr: r"$L = 2$"),
            ),
          ],
        ),
        _ex(
          4,
          'Opérations sur les limites',
          5,
          "Soient \$u_n = (n^2 + 1)/n\$ et \$v_n = (3n - 1)/(n + 2)\$. Calculer \$\\lim u_n\$, \$\\lim v_n\$, \$\\lim u_n + v_n\$, \$\\lim u_n v_n\$.",
          [
            _q(
              1,
              "Calculer chaque limite.",
              5,
              _sol([
                _step(
                  "\$u_n = n + 1/n \\to +\\infty\$.",
                ),
                _step(
                  "\$v_n = (3n - 1)/(n + 2) \\to 3\$ (mêmes degrés, rapport des dominants).",
                ),
                _step(
                  "**Somme** : \$\\lim (u_n + v_n) = +\\infty + 3 = +\\infty\$.",
                ),
                _step(
                  "**Produit** : \$\\lim (u_n v_n) = +\\infty \\times 3 = +\\infty\$.",
                  tipFr:
                      "Opérations sur les limites : (+\\infty) + fini = +\\infty ; (+\\infty) × fini > 0 = +\\infty ; (+\\infty) × 0 ou (+\\infty) - (+\\infty) = formes indéterminées (cas à étudier).",
                ),
              ],
                  finalAnswerFr:
                      r"$\lim u_n = +\infty$, $\lim v_n = 3$, somme et produit $= +\infty$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperLimitDefSmb() => _paper(
      titleFr: 'Épreuve type — Limites de fonctions',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Limite en un point, à l'infini, formes indéterminées, factorisation, quantités conjuguées.",
      exercices: [
        _ex(
          1,
          'Calcul direct',
          4,
          "Calculer les limites suivantes.",
          [
            _q(
              1,
              "\$\\lim_{x \\to 1}(x^2 + 3x - 2)\$.",
              1,
              _sol([
                _step(
                  "Polynôme continu partout. Substitution directe : \$1 + 3 - 2 = 2\$.",
                ),
              ], finalAnswerFr: r"$\lim = 2$"),
            ),
            _q(
              2,
              "\$\\lim_{x \\to 0} \\dfrac{x^2 - 4}{x - 2}\$.",
              1,
              _sol([
                _step(
                  "Substitution directe possible : \$(0 - 4)/(0 - 2) = -4/-2 = 2\$.",
                ),
              ], finalAnswerFr: r"$\lim = 2$"),
            ),
            _q(
              3,
              "\$\\lim_{x \\to 2} \\dfrac{x^2 - 4}{x - 2}\$.",
              2,
              _sol([
                _step(
                  "Forme \$0/0\$ — factoriser : \$x^2 - 4 = (x-2)(x+2)\$. Donc \$\\dfrac{x^2-4}{x-2} = x + 2\$ pour \$x \\ne 2\$.",
                ),
                _step(
                  "\$\\lim_{x \\to 2}(x+2) = 4\$.",
                ),
              ], finalAnswerFr: r"$\lim = 4$"),
            ),
          ],
        ),
        _ex(
          2,
          'Limites à l\'infini',
          5,
          "Calculer ces limites.",
          [
            _q(
              1,
              "\$\\lim_{x \\to +\\infty} \\dfrac{3x^2 - x}{x^2 + 5}\$.",
              2,
              _sol([
                _step(
                  "Quotient de polynômes de **même degré 2**. Rapport des coefficients dominants : \$3/1 = 3\$.",
                ),
              ], finalAnswerFr: r"$\lim = 3$"),
            ),
            _q(
              2,
              "\$\\lim_{x \\to +\\infty} \\dfrac{x + 1}{x^2}\$.",
              1,
              _sol([
                _step(
                  "Numérateur degré 1, dénominateur degré 2 — dénominateur l'emporte. Limite = 0.",
                ),
              ], finalAnswerFr: r"$\lim = 0$"),
            ),
            _q(
              3,
              "\$\\lim_{x \\to +\\infty} \\dfrac{x^3 + 1}{x}\$.",
              1,
              _sol([
                _step(
                  "Numérateur degré 3, dénominateur degré 1 — numérateur l'emporte. \$\\dfrac{x^3 + 1}{x} = x^2 + 1/x \\to +\\infty\$.",
                ),
              ], finalAnswerFr: r"$\lim = +\infty$"),
            ),
            _q(
              4,
              "\$\\lim_{x \\to -\\infty}\\sqrt{x^2 + 1} + x\$.",
              1,
              _sol([
                _step(
                  "Forme \$+\\infty - \\infty\$. Quantité conjuguée : multiplier par \$(\\sqrt{x^2+1} - x)/(\\sqrt{x^2+1} - x)\$.",
                ),
                _step(
                  "On obtient \$\\dfrac{1}{\\sqrt{x^2+1} - x}\$. Pour \$x \\to -\\infty\$, \$-x \\to +\\infty\$, donc dénominateur \$\\to +\\infty\$, fraction \$\\to 0\$.",
                ),
              ], finalAnswerFr: r"$\lim = 0$"),
            ),
          ],
        ),
        _ex(
          3,
          'Limites latérales',
          5,
          "On considère \$f(x) = \\dfrac{1}{x}\$.",
          [
            _q(
              1,
              "Calculer \$\\lim_{x \\to 0^+} f\$ et \$\\lim_{x \\to 0^-} f\$.",
              3,
              _sol([
                _step(
                  "\$x \\to 0^+\$ : \$x > 0\$ très petit, donc \$1/x \\to +\\infty\$.",
                ),
                _step(
                  "\$x \\to 0^-\$ : \$x < 0\$ très petit, donc \$1/x \\to -\\infty\$.",
                ),
                _step(
                  "Limites latérales différentes → **pas de limite en 0**. La courbe a une asymptote verticale en \$x = 0\$.",
                ),
              ],
                  finalAnswerFr:
                      r"$\lim_{0^+} = +\infty$, $\lim_{0^-} = -\infty$"),
            ),
            _q(
              2,
              "Calculer \$\\lim_{x \\to \\pm\\infty} f(x)\$.",
              2,
              _sol([
                _step(
                  "À \$\\pm\\infty\$ : \$1/x \\to 0\$. La courbe a une asymptote horizontale \$y = 0\$.",
                ),
                _step(
                  "**Résumé** : la courbe de \$1/x\$ a deux branches (hyperbole), avec asymptotes \$y = 0\$ et \$x = 0\$.",
                ),
              ], finalAnswerFr: r"$\lim = 0$ aux deux bornes"),
            ),
          ],
        ),
        _ex(
          4,
          'Asymptote oblique',
          6,
          "Soit \$f(x) = \\dfrac{x^2 + 1}{x - 1}\$ définie sur \$\\mathbb{R} \\setminus \\{1\\}\$.",
          [
            _q(
              1,
              "Effectuer la division euclidienne et écrire \$f(x) = ax + b + \\dfrac{c}{x - 1}\$.",
              3,
              _sol([
                _step(
                  "Division : \$x^2 + 1 = (x - 1) \\cdot x + (x + 1) = (x - 1)(x + 1) + 2\$.",
                ),
                _step(
                  "Donc \$f(x) = x + 1 + \\dfrac{2}{x - 1}\$.",
                ),
              ], finalAnswerFr: r"$f(x) = x + 1 + \dfrac{2}{x-1}$"),
            ),
            _q(
              2,
              "En déduire l'asymptote oblique de la courbe en \$\\pm\\infty\$.",
              3,
              _sol([
                _step(
                  "Quand \$x \\to \\pm\\infty\$ : \$\\dfrac{2}{x-1} \\to 0\$, donc \$f(x) - (x + 1) \\to 0\$.",
                ),
                _step(
                  "La courbe \$y = f(x)\$ admet la droite \$y = x + 1\$ pour **asymptote oblique** en \$\\pm\\infty\$.",
                  tipFr:
                      "Asymptote oblique : on prend la partie polynômiale après division euclidienne. Le reste tend vers 0.",
                ),
              ], finalAnswerFr: r"$y = x + 1$ asymptote oblique"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperLimitCalcSmb() => _paper(
      titleFr: 'Épreuve type — Calcul de limites avancé',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Techniques avancées : factorisation, conjugué, taux d'accroissement, croissances comparées \$\\ln/\\exp/x^n\$.",
      exercices: [
        _ex(
          1,
          'Formes 0/0 par factorisation',
          5,
          "Calculer les limites.",
          [
            _q(
              1,
              "\$\\lim_{x \\to 3} \\dfrac{x^2 - 9}{x - 3}\$.",
              2,
              _sol([
                _step(
                  "Forme \$0/0\$. Factoriser : \$x^2 - 9 = (x-3)(x+3)\$.",
                ),
                _step(
                  "\$\\dfrac{(x-3)(x+3)}{x-3} = x + 3 \\to 6\$ quand \$x \\to 3\$.",
                ),
              ], finalAnswerFr: r"$\lim = 6$"),
            ),
            _q(
              2,
              "\$\\lim_{x \\to 1} \\dfrac{x^3 - 1}{x^2 - 1}\$.",
              3,
              _sol([
                _step(
                  "Forme \$0/0\$. Numérateur : \$x^3 - 1 = (x-1)(x^2 + x + 1)\$. Dénominateur : \$x^2 - 1 = (x-1)(x+1)\$.",
                ),
                _step(
                  "Fraction : \$\\dfrac{(x-1)(x^2+x+1)}{(x-1)(x+1)} = \\dfrac{x^2+x+1}{x+1}\$ (pour \$x \\ne 1\$).",
                ),
                _step(
                  "Limite en 1 : \$\\dfrac{3}{2} = 1{,}5\$.",
                ),
              ], finalAnswerFr: r"$\lim = 3/2$"),
            ),
          ],
        ),
        _ex(
          2,
          'Quantité conjuguée',
          5,
          "Calculer.",
          [
            _q(
              1,
              "\$\\lim_{x \\to 0} \\dfrac{\\sqrt{1 + x} - 1}{x}\$.",
              3,
              _sol([
                _step(
                  "Forme \$0/0\$. Multiplier haut et bas par la quantité conjuguée \$\\sqrt{1+x} + 1\$.",
                ),
                _step(
                  "\$\\dfrac{(\\sqrt{1+x} - 1)(\\sqrt{1+x} + 1)}{x(\\sqrt{1+x} + 1)} = \\dfrac{(1+x) - 1}{x(\\sqrt{1+x} + 1)} = \\dfrac{x}{x(\\sqrt{1+x} + 1)} = \\dfrac{1}{\\sqrt{1+x} + 1}\$.",
                ),
                _step(
                  "Limite en 0 : \$\\dfrac{1}{1 + 1} = 1/2\$.",
                  tipFr:
                      "La quantité conjuguée \$a - b\$ multipliée par \$a + b\$ donne \$a^2 - b^2\$ — fait disparaître les racines carrées.",
                ),
              ], finalAnswerFr: r"$\lim = 1/2$"),
            ),
            _q(
              2,
              "\$\\lim_{x \\to +\\infty}\\sqrt{x^2 + x} - x\$.",
              2,
              _sol([
                _step(
                  "Forme \$\\infty - \\infty\$. Conjuguée : multiplier par \$(\\sqrt{x^2+x} + x)/(\\sqrt{x^2+x} + x)\$.",
                ),
                _step(
                  "Numérateur : \$x^2 + x - x^2 = x\$. Dénominateur : \$\\sqrt{x^2+x} + x \\sim 2x\$ à l'infini.",
                ),
                _step(
                  "Donc fraction \$\\sim x/(2x) = 1/2\$. Limite = \$1/2\$.",
                ),
              ], finalAnswerFr: r"$\lim = 1/2$"),
            ),
          ],
        ),
        _ex(
          3,
          'Taux d\'accroissement',
          5,
          "Reconnaître un taux d'accroissement pour calculer.",
          [
            _q(
              1,
              "\$\\lim_{x \\to 0} \\dfrac{\\sin x}{x}\$.",
              2,
              _sol([
                _step(
                  "C'est \$\\dfrac{\\sin x - \\sin 0}{x - 0}\$ = taux d'accroissement de \$\\sin\$ entre 0 et \$x\$. Limite = \$\\sin'(0) = \\cos 0 = 1\$.",
                ),
                _step(
                  "**Limite usuelle** : \$\\lim_{x \\to 0} \\dfrac{\\sin x}{x} = 1\$. À mémoriser absolument.",
                ),
              ], finalAnswerFr: r"$\lim = 1$"),
            ),
            _q(
              2,
              "\$\\lim_{x \\to 0} \\dfrac{e^x - 1}{x}\$.",
              2,
              _sol([
                _step(
                  "Taux d'accroissement de \$\\exp\$ en 0 : limite = \$\\exp'(0) = e^0 = 1\$.",
                  tipFr:
                      "Limites usuelles : \$\\lim_{0} \\dfrac{\\sin x}{x} = 1\$, \$\\lim_{0} \\dfrac{e^x - 1}{x} = 1\$, \$\\lim_{0} \\dfrac{\\ln(1+x)}{x} = 1\$.",
                ),
              ], finalAnswerFr: r"$\lim = 1$"),
            ),
            _q(
              3,
              "\$\\lim_{x \\to 0} \\dfrac{\\ln(1 + x)}{x}\$.",
              1,
              _sol([
                _step(
                  "Taux d'accroissement de \$\\ln\$ en 1 (avec changement de variable) : \$\\ln(1+x) = \\ln(1+x) - \\ln(1)\$, dérivée en 1 = \$1/1 = 1\$.",
                ),
              ], finalAnswerFr: r"$\lim = 1$"),
            ),
          ],
        ),
        _ex(
          4,
          'Croissances comparées',
          5,
          "Calculer les limites.",
          [
            _q(
              1,
              "\$\\lim_{x \\to +\\infty} \\dfrac{\\ln x}{x}\$ et \$\\dfrac{\\ln x}{x^2}\$.",
              2,
              _sol([
                _step(
                  "**Théorème** : à l'infini, toute puissance positive de \$x\$ l'emporte sur \$\\ln x\$. \$\\lim \\dfrac{\\ln x}{x^\\alpha} = 0\$ pour tout \$\\alpha > 0\$.",
                ),
                _step(
                  "Les deux limites valent **0**.",
                ),
              ], finalAnswerFr: r"$\lim = 0$"),
            ),
            _q(
              2,
              "\$\\lim_{x \\to +\\infty} \\dfrac{e^x}{x^{10}}\$.",
              2,
              _sol([
                _step(
                  "**Théorème** : à l'infini, l'exponentielle l'emporte sur toute puissance. \$\\lim \\dfrac{e^x}{x^n} = +\\infty\$ pour tout \$n\$.",
                ),
                _step(
                  "Donc \$\\lim = +\\infty\$. Hiérarchie : \$\\exp \\gg x^n \\gg \\ln\$ à l'infini.",
                  tipFr:
                      "Cette hiérarchie est universelle — elle décide qui 'gagne' dans les formes indéterminées \$\\infty/\\infty\$ ou \$\\infty \\cdot 0\$.",
                ),
              ], finalAnswerFr: r"$\lim = +\infty$"),
            ),
            _q(
              3,
              "\$\\lim_{x \\to 0^+} x \\ln x\$.",
              1,
              _sol([
                _step(
                  "Forme \$0 \\cdot (-\\infty)\$. Changement de variable \$u = 1/x\$ : \$x \\ln x = (1/u) \\ln(1/u) = -\\ln(u)/u \\to 0\$ quand \$u \\to +\\infty\$.",
                ),
                _step(
                  "Donc \$\\lim_{0^+} x \\ln x = 0\$. Limite usuelle.",
                ),
              ], finalAnswerFr: r"$\lim = 0$"),
            ),
          ],
        ),
      ],
    );

final Map<String, Map<String, dynamic>> _papers = {
  'arithmetic_seq': _paperArithmeticSeq(),
  'geometric_seq': _paperGeometricSeq(),
  'seq_convergence': _paperSeqConvergence(),
  'limit_def': _paperLimitDefSmb(),
  'limit_calc': _paperLimitCalcSmb(),
  // 27 SMB chapters remaining.
};

String _sqlEscape(String s) => s.replaceAll("'", "''");

void main() {
  final buf = StringBuffer();
  buf.writeln(
      '-- Migration 031: topic-coherent exam papers for SMB chapters (Phase 2).');
  buf.writeln('-- Auto-generated by json_encode_exam_papers_smb.dart.');
  buf.writeln(
      '-- Each row UPDATE writes the full multi-exercice paper into skills.exam_paper.');
  buf.writeln('BEGIN;');
  buf.writeln();

  for (final entry in _papers.entries) {
    final code = entry.key;
    final json = jsonEncode(entry.value);
    buf.writeln(
        "UPDATE public.skills SET exam_paper = '${_sqlEscape(json)}'::jsonb WHERE code = '$code';");
  }

  buf.writeln();
  buf.writeln('COMMIT;');

  File('backend/supabase/migrations/031_exam_papers_smb.sql')
      .writeAsStringSync(buf.toString());
  stdout.writeln(
      'Wrote backend/supabase/migrations/031_exam_papers_smb.sql (${_papers.length} papers).');
}
