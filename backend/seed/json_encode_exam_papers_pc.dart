// Phase 3.4 encoder: topic-coherent Bac exam papers for the 31 PC chapters.
//
// Mirrors json_encode_exam_papers_smb.dart structure. PC (Sciences Physiques)
// is one notch lower than SMA in mathematical sophistication, comparable to
// SMB in depth. Many PC chapters have direct equivalents in SMB which we adapt
// (e.g. pc_seq_convergence ≈ SMB seq_convergence). A handful are
// PC-exclusive (pc_am_modulation, pc_radioactivity, pc_pendulum) and authored
// from scratch.
//
// Output: backend/supabase/migrations/034_exam_papers_pc.sql

import 'dart:convert';
import 'dart:io';

// ============================================================================
// Builders
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
// PC Papers — math (15 chapters)
// ============================================================================

// pc_arithmetic_geom_seq — combines arithmetic + geometric suites in one paper
Map<String, dynamic> _paperArithmeticGeomSeq() => _paper(
      titleFr: 'Épreuve type — Suites arithmétiques et géométriques',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Suites arithmétiques (raison \$r\$ par addition, \$u_n = u_0 + nr\$) et géométriques (raison \$q\$ par multiplication, \$u_n = u_0 q^n\$). Sommes : Gauss pour les arithmétiques, \$u_0 (1-q^{n+1})/(1-q)\$ pour les géométriques.",
      exercices: [
        _ex(
          1,
          'Identification arithmétique',
          5,
          "Soit \$(u_n)\$ définie par \$u_0 = 2\$ et \$u_{n+1} = u_n + 4\$.",
          [
            _q(
              1,
              "Justifier que \$(u_n)\$ est arithmétique et donner sa raison.",
              2,
              _sol([
                _step(
                  "Par définition : \$(u_n)\$ arithmétique \$\\iff u_{n+1} - u_n = r\$ constant. Ici \$u_{n+1} - u_n = (u_n + 4) - u_n = 4\$.",
                ),
                _step(
                  "La différence est **constante et vaut 4**, indépendante de \$n\$. Donc \$(u_n)\$ est arithmétique de **raison \$r = 4\$**.",
                ),
              ], finalAnswerFr: r"$r = 4$"),
            ),
            _q(
              2,
              "Donner \$u_n\$ en fonction de \$n\$ puis calculer \$u_{20}\$.",
              2,
              _sol([
                _step(
                  "**Terme général arithmétique** : \$u_n = u_0 + nr = 2 + 4n\$.",
                ),
                _step(
                  "\$u_{20} = 2 + 4 \\times 20 = 82\$.",
                  tipFr:
                      "L'expression explicite \$u_n = u_0 + nr\$ permet d'accéder à n'importe quel terme sans énumérer les précédents.",
                ),
              ], finalAnswerFr: r"$u_n = 2 + 4n$, $u_{20} = 82$"),
            ),
            _q(
              3,
              "Calculer la somme \$S = u_0 + u_1 + \\dots + u_{20}\$ (21 termes).",
              1,
              _sol([
                _step(
                  "**Formule de Gauss** : \$S = \\text{(nb termes)} \\times \\dfrac{\\text{premier} + \\text{dernier}}{2}\$.",
                ),
                _step(
                  "\$S = 21 \\times (u_0 + u_{20})/2 = 21 \\times (2 + 82)/2 = 21 \\times 42 = 882\$.",
                ),
              ], finalAnswerFr: r"$S = 882$"),
            ),
          ],
        ),
        _ex(
          2,
          'Identification géométrique',
          5,
          "Soit \$(v_n)\$ définie par \$v_0 = 3\$ et \$v_{n+1} = 2 v_n\$.",
          [
            _q(
              1,
              "Montrer que \$(v_n)\$ est géométrique et préciser sa raison.",
              2,
              _sol([
                _step(
                  "\$(v_n)\$ géométrique \$\\iff v_{n+1}/v_n = q\$ constant (avec \$v_n \\ne 0\$). Ici \$v_{n+1}/v_n = 2 v_n / v_n = 2\$.",
                ),
                _step(
                  "Donc \$(v_n)\$ est géométrique de **raison \$q = 2\$**.",
                  mistakeFr:
                      "Ne pas confondre arithmétique (différence constante) et géométrique (rapport constant) — le doublement, triplement, etc. est géométrique.",
                ),
              ], finalAnswerFr: r"$q = 2$"),
            ),
            _q(
              2,
              "Donner \$v_n\$ en fonction de \$n\$ et calculer \$v_{10}\$.",
              1,
              _sol([
                _step(
                  "**Terme général géométrique** : \$v_n = v_0 q^n = 3 \\cdot 2^n\$.",
                ),
                _step(
                  "\$v_{10} = 3 \\times 1024 = 3072\$.",
                ),
              ], finalAnswerFr: r"$v_n = 3 \cdot 2^n$, $v_{10} = 3072$"),
            ),
            _q(
              3,
              "Calculer \$S = v_0 + v_1 + \\dots + v_{10}\$.",
              2,
              _sol([
                _step(
                  "**Formule géométrique** : \$S = v_0 \\dfrac{1 - q^{n+1}}{1 - q}\$ pour \$n+1\$ termes (\$q \\ne 1\$).",
                ),
                _step(
                  "Ici 11 termes (\$v_0\$ à \$v_{10}\$), \$v_0 = 3\$, \$q = 2\$. \$S = 3 \\cdot \\dfrac{1 - 2^{11}}{1 - 2} = 3 \\cdot \\dfrac{1 - 2048}{-1} = 3 \\times 2047 = 6141\$.",
                ),
              ], finalAnswerFr: r"$S = 6141$"),
            ),
          ],
        ),
        _ex(
          3,
          'Sens de variation et limites',
          5,
          "Étudier le comportement à l'infini selon la nature et les paramètres de la suite.",
          [
            _qSubs(
              1,
              "Suites arithmétiques.",
              2,
              [
                _sub(
                  'a',
                  "Donner le sens de variation d'une suite arithmétique selon le signe de \$r\$.",
                  1,
                  _sol([
                    _step(
                      "\$u_{n+1} - u_n = r\$. Donc : \$r > 0\$ → strictement croissante ; \$r < 0\$ → strictement décroissante ; \$r = 0\$ → constante.",
                    ),
                  ]),
                ),
                _sub(
                  'b',
                  "Donner \$\\lim u_n\$ selon le signe de \$r\$.",
                  1,
                  _sol([
                    _step(
                      "\$r > 0\$ : \$u_n \\to +\\infty\$. \$r < 0\$ : \$u_n \\to -\\infty\$. \$r = 0\$ : suite constante, limite \$= u_0\$.",
                    ),
                  ], finalAnswerFr: r"Limite $= \pm\infty$ sauf si $r = 0$"),
                ),
              ],
            ),
            _qSubs(
              2,
              "Suites géométriques (\$u_0 > 0\$).",
              3,
              [
                _sub(
                  'a',
                  "Sens de variation selon \$q\$.",
                  1,
                  _sol([
                    _step(
                      "\$u_{n+1} - u_n = u_n(q - 1)\$. Avec \$u_0 > 0\$ et \$q > 0\$ : \$q > 1\$ → croissante, \$0 < q < 1\$ → décroissante.",
                    ),
                    _step(
                      "Si \$q < 0\$, les termes alternent de signe — pas de monotonie.",
                    ),
                  ]),
                ),
                _sub(
                  'b',
                  "Limites selon \$q\$.",
                  2,
                  _sol([
                    _step(
                      "**\$q > 1\$** : \$q^n \\to +\\infty\$ donc \$u_n \\to +\\infty\$.",
                    ),
                    _step(
                      "**\$q = 1\$** : suite constante, limite \$= u_0\$.",
                    ),
                    _step(
                      "**\$|q| < 1\$** : \$q^n \\to 0\$ donc \$u_n \\to 0\$.",
                    ),
                    _step(
                      "**\$q \\le -1\$** : la suite oscille (pas de limite).",
                      tipFr:
                          "Mémo : pour les géométriques, seule la position de \$q\$ par rapport à \$\\pm 1\$ détermine le comportement asymptotique.",
                    ),
                  ]),
                ),
              ],
            ),
          ],
        ),
        _ex(
          4,
          'Application — capital à intérêts composés',
          5,
          "Un capital \$C_0 = 5000\\,\\text{DH}\$ est placé à 4% d'intérêts composés annuels. Soit \$C_n\$ le capital après \$n\$ années.",
          [
            _q(
              1,
              "Exprimer \$C_{n+1}\$ en fonction de \$C_n\$ et identifier la nature de la suite.",
              2,
              _sol([
                _step(
                  "Chaque année, le capital est multiplié par \$1{,}04\$ (capital initial + 4% d'intérêt). Donc \$C_{n+1} = 1{,}04 \\cdot C_n\$.",
                ),
                _step(
                  "\$(C_n)\$ est **géométrique** de raison \$q = 1{,}04\$ et de premier terme \$C_0 = 5000\$.",
                ),
              ], finalAnswerFr: r"Géométrique, $q = 1{,}04$"),
            ),
            _q(
              2,
              "Calculer \$C_{10}\$ et \$C_{20}\$.",
              2,
              _sol([
                _step(
                  "\$C_n = 5000 \\times 1{,}04^n\$. \$1{,}04^{10} \\approx 1{,}4802\$ → \$C_{10} \\approx 7401\\,\\text{DH}\$.",
                ),
                _step(
                  "\$1{,}04^{20} \\approx 2{,}1911\$ → \$C_{20} \\approx 10\\,956\\,\\text{DH}\$.",
                  tipFr:
                      "Règle de 72 : à 4%, doublement en environ \$72/4 = 18\$ ans. Cohérent avec \$C_{20} \\approx 2 C_0\$.",
                ),
              ], finalAnswerFr: r"$C_{10} \approx 7401$ DH, $C_{20} \approx 10\,956$ DH"),
            ),
            _q(
              3,
              "Au bout de combien d'années le capital aura-t-il triplé ?",
              1,
              _sol([
                _step(
                  "Résoudre \$1{,}04^n = 3 \\iff n \\ln(1{,}04) = \\ln 3 \\iff n = \\ln 3 / \\ln(1{,}04) \\approx 1{,}0986 / 0{,}0392 \\approx 28\\,\\text{ans}\$.",
                ),
              ], finalAnswerFr: r"$n \approx 28$ ans"),
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
          "Convergence, théorème des gendarmes, théorème de la limite monotone, opérations sur les limites.",
      exercices: [
        _ex(
          1,
          'Limites usuelles',
          5,
          "Calculer les limites suivantes.",
          [
            _q(
              1,
              "\$\\lim_{n \\to \\infty} 1/n\$, \$\\lim 1/n^2\$, \$\\lim 1/\\sqrt{n}\$.",
              2,
              _sol([
                _step(
                  "**Règle générale** : pour tout \$\\alpha > 0\$, \$\\lim_{n \\to \\infty} 1/n^\\alpha = 0\$ (avec \$\\sqrt n = n^{1/2}\$).",
                ),
                _step(
                  "Les trois limites valent donc **0**. Plus \$\\alpha\$ est grand, plus la décroissance est rapide.",
                ),
              ], finalAnswerFr: r"Toutes valent 0"),
            ),
            _q(
              2,
              "\$\\lim_{n \\to \\infty} \\dfrac{3n^2 + n + 1}{n^2 - 2}\$.",
              2,
              _sol([
                _step(
                  "Forme \$\\infty/\\infty\$ : on **factorise le terme dominant** (ici \$n^2\$) en haut et en bas.",
                ),
                _step(
                  "\$\\dfrac{3n^2 + n + 1}{n^2 - 2} = \\dfrac{n^2(3 + 1/n + 1/n^2)}{n^2(1 - 2/n^2)} = \\dfrac{3 + 1/n + 1/n^2}{1 - 2/n^2} \\to \\dfrac{3}{1} = 3\$.",
                ),
                _step(
                  "**Règle** : pour un quotient de polynômes de même degré, la limite est le rapport des coefficients dominants.",
                ),
              ], finalAnswerFr: r"$\lim = 3$"),
            ),
            _q(
              3,
              "\$\\lim_{n \\to \\infty} \\sqrt{n+1} - \\sqrt{n}\$.",
              1,
              _sol([
                _step(
                  "Forme indéterminée \$\\infty - \\infty\$. **Astuce de la quantité conjuguée** : multiplier par \$\\dfrac{\\sqrt{n+1} + \\sqrt{n}}{\\sqrt{n+1} + \\sqrt{n}}\$.",
                ),
                _step(
                  "\$\\sqrt{n+1} - \\sqrt{n} = \\dfrac{(n+1) - n}{\\sqrt{n+1} + \\sqrt{n}} = \\dfrac{1}{\\sqrt{n+1} + \\sqrt{n}} \\to 0\$.",
                  mistakeFr:
                      "Ne pas conclure que \$\\sqrt{n+1} - \\sqrt{n} \\to \\infty - \\infty = 0\$ : cette 'soustraction' n'a pas de sens, il faut lever l'indétermination.",
                ),
              ], finalAnswerFr: r"$\lim = 0$"),
            ),
          ],
        ),
        _ex(
          2,
          'Théorème des gendarmes',
          5,
          "Soit \$u_n = \\dfrac{\\cos(n)}{n}\$ pour \$n \\ge 1\$.",
          [
            _q(
              1,
              "Encadrer \$u_n\$.",
              2,
              _sol([
                _step(
                  "Pour tout \$n\$, \$-1 \\le \\cos(n) \\le 1\$. Comme \$n > 0\$, on divise par \$n\$ sans changer le sens : \$-1/n \\le \\cos(n)/n \\le 1/n\$.",
                ),
              ], finalAnswerFr: r"$-1/n \le u_n \le 1/n$"),
            ),
            _q(
              2,
              "En déduire \$\\lim u_n\$.",
              3,
              _sol([
                _step(
                  "Les deux bornes \$-1/n\$ et \$1/n\$ tendent vers 0 quand \$n \\to \\infty\$.",
                ),
                _step(
                  "Par le **théorème des gendarmes**, \$u_n\$ est encadrée par deux suites convergeant vers la même limite 0. Donc \$\\lim u_n = 0\$.",
                  tipFr:
                      "\$\\cos(n)\$ n'a pas de limite (oscille entre -1 et 1), mais \$\\cos(n)/n\$ converge grâce à la décroissance dominante de \$1/n\$.",
                ),
              ], finalAnswerFr: r"$\lim u_n = 0$"),
            ),
          ],
        ),
        _ex(
          3,
          'Théorème de la limite monotone',
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
                  "Montrer par récurrence que \$0 \\le u_n \\le 2\$.",
                  2,
                  _sol([
                    _step(
                      "**Init** : \$u_0 = 1 \\in [0, 2]\$ ✓.",
                    ),
                    _step(
                      "**Hérédité** : si \$0 \\le u_n \\le 2\$, alors \$2 \\le 2 + u_n \\le 4\$, donc \$\\sqrt 2 \\le u_{n+1} \\le 2\$. Comme \$\\sqrt 2 \\approx 1{,}41 > 0\$, on a bien \$0 \\le u_{n+1} \\le 2\$.",
                    ),
                  ]),
                ),
                _sub(
                  'b',
                  "Montrer que \$(u_n)\$ est croissante.",
                  1,
                  _sol([
                    _step(
                      "Étude de signe : \$u_{n+1}^2 - u_n^2 = (2 + u_n) - u_n^2 = -(u_n - 2)(u_n + 1)\$. Sur \$[0, 2]\$, \$(u_n - 2) \\le 0\$ et \$(u_n + 1) > 0\$, donc \$u_{n+1}^2 - u_n^2 \\ge 0\$.",
                    ),
                    _step(
                      "Comme \$u_n, u_{n+1} \\ge 0\$, ceci entraîne \$u_{n+1} \\ge u_n\$. La suite est croissante.",
                    ),
                  ]),
                ),
                _sub(
                  'c',
                  "Conclure sur la convergence et calculer la limite.",
                  1,
                  _sol([
                    _step(
                      "(\$u_n\$) est croissante et majorée par 2 → par le **théorème de la limite monotone**, elle converge vers une limite \$L \\le 2\$.",
                    ),
                    _step(
                      "\$L\$ vérifie \$L = \\sqrt{2 + L}\$ (passage à la limite). Élever au carré : \$L^2 = 2 + L \\iff L^2 - L - 2 = 0 \\iff (L-2)(L+1) = 0\$, donc \$L = 2\$ (puisque \$L \\ge 0\$).",
                    ),
                  ], finalAnswerFr: r"$L = 2$"),
                ),
              ],
            ),
          ],
        ),
        _ex(
          4,
          'Opérations sur les limites',
          5,
          "Calculer ou justifier l'absence de limite pour les suites suivantes.",
          [
            _q(
              1,
              "\$u_n = (-1)^n\$.",
              2,
              _sol([
                _step(
                  "\$u_n\$ vaut alternativement \$+1\$ (\$n\$ pair) et \$-1\$ (\$n\$ impair). Elle prend deux valeurs distinctes à l'infini.",
                ),
                _step(
                  "Donc \$(u_n)\$ **n'a pas de limite** (la suite des termes pairs converge vers 1, celle des impairs vers -1 — limites différentes → divergence).",
                ),
              ], finalAnswerFr: r"Pas de limite"),
            ),
            _q(
              2,
              "\$v_n = n - n^2\$.",
              1,
              _sol([
                _step(
                  "Forme \$\\infty - \\infty\$. Factoriser : \$v_n = n(1 - n) = -n(n - 1)\$.",
                ),
                _step(
                  "Quand \$n \\to \\infty\$, \$n(n-1) \\to +\\infty\$ donc \$v_n \\to -\\infty\$.",
                ),
              ], finalAnswerFr: r"$\lim v_n = -\infty$"),
            ),
            _q(
              3,
              "\$w_n = \\dfrac{(-1)^n}{n} + 3\$.",
              2,
              _sol([
                _step(
                  "\$(-1)^n / n\$ est encadrée par \$-1/n\$ et \$1/n\$, donc tend vers 0 (gendarmes).",
                ),
                _step(
                  "Par somme des limites : \$\\lim w_n = 0 + 3 = 3\$.",
                ),
              ], finalAnswerFr: r"$\lim w_n = 3$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperSeqRecursive() => _paper(
      titleFr: 'Épreuve type — Suites récurrentes',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Suites définies par \$u_{n+1} = f(u_n)\$, points fixes, suites arithmético-géométriques, convergence par monotonie + bornes.",
      exercices: [
        _ex(
          1,
          'Récurrence affine simple',
          5,
          "Soit \$(u_n)\$ définie par \$u_0 = 0\$ et \$u_{n+1} = \\dfrac{u_n + 6}{2}\$.",
          [
            _q(
              1,
              "Calculer \$u_1, u_2, u_3\$ et conjecturer le comportement.",
              2,
              _sol([
                _step(
                  "\$u_1 = (0 + 6)/2 = 3\$. \$u_2 = (3 + 6)/2 = 4{,}5\$. \$u_3 = (4{,}5 + 6)/2 = 5{,}25\$.",
                ),
                _step(
                  "La suite semble **croître et se stabiliser autour de 6** : 0, 3, 4.5, 5.25, 5.625, ...",
                ),
              ], finalAnswerFr: r"Conjecture : croissante, limite $\approx 6$"),
            ),
            _q(
              2,
              "Trouver le point fixe de \$f(x) = (x+6)/2\$ et le comparer à la conjecture.",
              2,
              _sol([
                _step(
                  "**Point fixe** : \$L = f(L) \\iff L = (L + 6)/2 \\iff 2L = L + 6 \\iff L = 6\$. ✓ avec la conjecture.",
                ),
                _step(
                  "Le point fixe est un **candidat-limite** ; pour conclure rigoureusement, il faut prouver la convergence (monotonie + bornes).",
                  mistakeFr:
                      "Trouver le point fixe ne prouve pas la convergence : certaines suites n'atteignent jamais leur point fixe (ex. \$u_{n+1} = 2 u_n - 6\$ avec \$u_0 = 0\$ diverge bien que 6 soit un point fixe).",
                ),
              ], finalAnswerFr: r"$L = 6$"),
            ),
            _q(
              3,
              "Montrer que \$(u_n)\$ est croissante et majorée par 6, puis conclure.",
              1,
              _sol([
                _step(
                  "**Majoration** par récurrence : si \$u_n \\le 6\$, alors \$u_{n+1} = (u_n + 6)/2 \\le (6 + 6)/2 = 6\$. Init OK avec \$u_0 = 0 \\le 6\$.",
                ),
                _step(
                  "**Croissance** : \$u_{n+1} - u_n = (u_n + 6)/2 - u_n = (6 - u_n)/2 > 0\$ tant que \$u_n < 6\$.",
                ),
                _step(
                  "Croissante + majorée → converge vers le point fixe \$L = 6\$.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          2,
          'Récurrence non linéaire',
          5,
          "Soit \$(u_n)\$ telle que \$u_0 = 1\$ et \$u_{n+1} = \\sqrt{3 u_n + 4}\$.",
          [
            _qSubs(
              1,
              "Étude complète.",
              4,
              [
                _sub(
                  'a',
                  "Trouver le(s) point(s) fixe(s).",
                  1,
                  _sol([
                    _step(
                      "\$L = \\sqrt{3L + 4} \\Rightarrow L^2 = 3L + 4 \\Rightarrow L^2 - 3L - 4 = 0\$.",
                    ),
                    _step(
                      "Discriminant : \$9 + 16 = 25\$. Racines : \$L = (3 + 5)/2 = 4\$ ou \$L = (3 - 5)/2 = -1\$. La racine carrée étant positive, \$L \\ge 0\$, donc \$L = 4\$.",
                    ),
                  ], finalAnswerFr: r"$L = 4$"),
                ),
                _sub(
                  'b',
                  "Montrer par récurrence que \$1 \\le u_n \\le 4\$.",
                  2,
                  _sol([
                    _step(
                      "Init : \$u_0 = 1 \\in [1, 4]\$ ✓.",
                    ),
                    _step(
                      "Hérédité : si \$1 \\le u_n \\le 4\$, alors \$7 \\le 3 u_n + 4 \\le 16\$, donc \$\\sqrt 7 \\le u_{n+1} \\le 4\$. Comme \$\\sqrt 7 \\approx 2{,}65 > 1\$, on a bien \$1 \\le u_{n+1} \\le 4\$.",
                    ),
                  ]),
                ),
                _sub(
                  'c',
                  "Conclure sur la convergence.",
                  1,
                  _sol([
                    _step(
                      "Étude de signe : \$u_{n+1}^2 - u_n^2 = (3 u_n + 4) - u_n^2 = -(u_n - 4)(u_n + 1)\$. Sur \$[1, 4]\$, \$(u_n - 4) \\le 0\$ et \$(u_n + 1) > 0\$ → \$u_{n+1}^2 \\ge u_n^2\$ → \$u_{n+1} \\ge u_n\$ (les termes étant positifs).",
                    ),
                    _step(
                      "Croissante + majorée par 4 → converge. La limite vérifie l'équation du point fixe → \$L = 4\$.",
                    ),
                  ], finalAnswerFr: r"$\lim u_n = 4$"),
                ),
              ],
            ),
            _q(
              2,
              "Combien d'itérations pour atteindre \$|u_n - 4| < 10^{-3}\$ ?",
              1,
              _sol([
                _step(
                  "Calcul itératif : \$u_0 = 1\$ (err = 3), \$u_1 = \\sqrt 7 \\approx 2{,}65\$ (err ≈ 1.35), \$u_2 \\approx \\sqrt{11{,}95} \\approx 3{,}46\$ (err ≈ 0.54), \$u_3 \\approx \\sqrt{14{,}37} \\approx 3{,}79\$ (err ≈ 0.21), \$u_4 \\approx 3{,}92\$, \$u_5 \\approx 3{,}97\$, \$u_6 \\approx 3{,}99\$, \$u_7 \\approx 3{,}996\$ (err ≈ 4×10⁻³), \$u_8 \\approx 3{,}998\$ (err ≈ 1.5×10⁻³), \$u_9\\approx 3{,}9994\$ (err < 10⁻³).",
                ),
                _step(
                  "Donc dès \$n = 9\$, la précision est atteinte.",
                ),
              ], finalAnswerFr: r"$n \approx 9$"),
            ),
          ],
        ),
        _ex(
          3,
          'Suite arithmético-géométrique',
          5,
          "Soit \$(u_n)\$ avec \$u_0 = 1\$ et \$u_{n+1} = 3 u_n - 4\$.",
          [
            _q(
              1,
              "Trouver le point fixe \$\\ell\$ de \$f(x) = 3x - 4\$.",
              1,
              _sol([
                _step(
                  "\$\\ell = 3 \\ell - 4 \\iff 2 \\ell = 4 \\iff \\ell = 2\$.",
                ),
              ], finalAnswerFr: r"$\ell = 2$"),
            ),
            _q(
              2,
              "Poser \$v_n = u_n - \\ell\$. Montrer que \$(v_n)\$ est géométrique et donner sa raison.",
              2,
              _sol([
                _step(
                  "\$v_{n+1} = u_{n+1} - 2 = (3 u_n - 4) - 2 = 3 u_n - 6 = 3(u_n - 2) = 3 v_n\$.",
                ),
                _step(
                  "Donc \$(v_n)\$ est **géométrique de raison \$q = 3\$**.",
                  tipFr:
                      "**Astuce arithmético-géométrique** : pour \$u_{n+1} = a u_n + b\$ avec \$a \\ne 1\$, le changement de variable \$v_n = u_n - \\ell\$ (où \$\\ell\$ est le point fixe \$\\ell = b/(1-a)\$) rend la suite géométrique pure.",
                ),
              ], finalAnswerFr: r"Géométrique, $q = 3$"),
            ),
            _q(
              3,
              "Déterminer l'expression explicite de \$u_n\$ et sa limite.",
              2,
              _sol([
                _step(
                  "\$v_0 = u_0 - 2 = -1\$. Donc \$v_n = v_0 q^n = -3^n\$.",
                ),
                _step(
                  "Et \$u_n = v_n + 2 = 2 - 3^n\$.",
                ),
                _step(
                  "Vérification : \$u_0 = 2 - 1 = 1\$ ✓. \$u_1 = 2 - 3 = -1\$ ; formule \$3(1) - 4 = -1\$ ✓.",
                ),
                _step(
                  "Quand \$n \\to \\infty\$, \$3^n \\to +\\infty\$ donc \$u_n \\to -\\infty\$. La suite **diverge** ; le point fixe 2 est **répulsif** (\$|q| > 1\$).",
                ),
              ], finalAnswerFr: r"$u_n = 2 - 3^n$, $\lim = -\infty$"),
            ),
          ],
        ),
        _ex(
          4,
          'Application — modèle démographique',
          5,
          "Dans une cuve de production, la population de bactéries triple chaque heure mais 200 bactéries sont prélevées pour analyse. À \$t = 0\$, on a 500 bactéries.",
          [
            _q(
              1,
              "Modéliser la population \$P_n\$ après \$n\$ heures.",
              1,
              _sol([
                _step(
                  "\$P_0 = 500\$. Chaque heure : triplement (\$\\times 3\$) puis prélèvement (\$-200\$). Donc \$P_{n+1} = 3 P_n - 200\$.",
                ),
              ], finalAnswerFr: r"$P_{n+1} = 3 P_n - 200$, $P_0 = 500$"),
            ),
            _q(
              2,
              "Déterminer l'expression explicite \$P_n\$.",
              3,
              _sol([
                _step(
                  "Point fixe : \$\\ell = 3 \\ell - 200 \\iff 2\\ell = 200 \\iff \\ell = 100\$.",
                ),
                _step(
                  "Posons \$Q_n = P_n - 100\$. Alors \$Q_{n+1} = P_{n+1} - 100 = 3 P_n - 200 - 100 = 3(P_n - 100) = 3 Q_n\$.",
                ),
                _step(
                  "\$(Q_n)\$ géométrique de raison 3, \$Q_0 = 500 - 100 = 400\$. Donc \$Q_n = 400 \\cdot 3^n\$ et **\$P_n = 100 + 400 \\cdot 3^n\$**.",
                ),
              ], finalAnswerFr: r"$P_n = 100 + 400 \cdot 3^n$"),
            ),
            _q(
              3,
              "Calculer \$P_5\$ et conclure sur le comportement à long terme.",
              1,
              _sol([
                _step(
                  "\$P_5 = 100 + 400 \\cdot 3^5 = 100 + 400 \\times 243 = 100 + 97\\,200 = 97\\,300\$ bactéries.",
                ),
                _step(
                  "Quand \$n \\to \\infty\$, \$3^n \\to +\\infty\$ donc \$P_n \\to +\\infty\$ : la population **explose exponentiellement** malgré les prélèvements, car la croissance interne (\$\\times 3\$) domine largement la décroissance externe (\$-200\$).",
                ),
              ], finalAnswerFr: r"$P_5 = 97\,300$, explose"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperLimitCalc() => _paper(
      titleFr: 'Épreuve type — Calcul de limites',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Limites en un point et à l'infini, formes indéterminées, factorisation, quantités conjuguées, croissances comparées.",
      exercices: [
        _ex(
          1,
          'Limites par calcul direct',
          5,
          "Calculer les limites suivantes en justifiant la méthode.",
          [
            _q(
              1,
              "\$\\lim_{x \\to 2}(x^3 - 2x^2 + 1)\$.",
              1,
              _sol([
                _step(
                  "Polynôme continu sur \$\\mathbb{R}\$ → substitution directe : \$8 - 8 + 1 = 1\$.",
                ),
              ], finalAnswerFr: r"$\lim = 1$"),
            ),
            _q(
              2,
              "\$\\lim_{x \\to 3} \\dfrac{x^2 - 9}{x - 3}\$.",
              2,
              _sol([
                _step(
                  "Forme \$0/0\$ (numérateur et dénominateur s'annulent en 3). Factoriser : \$x^2 - 9 = (x-3)(x+3)\$.",
                ),
                _step(
                  "\$\\dfrac{(x-3)(x+3)}{x-3} = x + 3 \\to 6\$ quand \$x \\to 3\$.",
                  tipFr:
                      "Forme \$0/0\$ avec polynômes : factoriser par \$(x - a)\$ pour faire apparaître une simplification.",
                ),
              ], finalAnswerFr: r"$\lim = 6$"),
            ),
            _q(
              3,
              "\$\\lim_{x \\to 1} \\dfrac{x^3 - 1}{x^2 - 1}\$.",
              2,
              _sol([
                _step(
                  "Forme \$0/0\$. \$x^3 - 1 = (x-1)(x^2 + x + 1)\$ ; \$x^2 - 1 = (x-1)(x+1)\$.",
                ),
                _step(
                  "Fraction : \$\\dfrac{x^2 + x + 1}{x + 1}\$ pour \$x \\ne 1\$.",
                ),
                _step(
                  "Limite en 1 : \$\\dfrac{1 + 1 + 1}{1 + 1} = \\dfrac{3}{2}\$.",
                ),
              ], finalAnswerFr: r"$\lim = 3/2$"),
            ),
          ],
        ),
        _ex(
          2,
          'Quantité conjuguée',
          5,
          "Calculer ces limites par la technique du conjugué.",
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
                  "\$\\dfrac{(\\sqrt{1+x} - 1)(\\sqrt{1+x} + 1)}{x(\\sqrt{1+x} + 1)} = \\dfrac{(1 + x) - 1}{x(\\sqrt{1+x} + 1)} = \\dfrac{x}{x(\\sqrt{1+x} + 1)} = \\dfrac{1}{\\sqrt{1+x} + 1}\$.",
                ),
                _step(
                  "Limite en 0 : \$\\dfrac{1}{\\sqrt 1 + 1} = \\dfrac{1}{2}\$.",
                  tipFr:
                      "Multiplier par le conjugué \$(a + b)\$ d'une expression \$(a - b)\$ donne \$a^2 - b^2\$ — fait disparaître les racines.",
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
                  "Numérateur : \$(x^2 + x) - x^2 = x\$. Dénominateur : \$\\sqrt{x^2 + x} + x\$. Pour \$x \\to +\\infty\$, \$\\sqrt{x^2 + x} \\sim x\$, donc dénominateur \$\\sim 2x\$.",
                ),
                _step(
                  "Limite : \$\\dfrac{x}{2x} = \\dfrac{1}{2}\$.",
                ),
              ], finalAnswerFr: r"$\lim = 1/2$"),
            ),
          ],
        ),
        _ex(
          3,
          'Limites à l\'infini et croissances comparées',
          5,
          "Étudier le comportement asymptotique.",
          [
            _q(
              1,
              "\$\\lim_{x \\to +\\infty} \\dfrac{3x^2 - x + 1}{x^2 + 2}\$.",
              2,
              _sol([
                _step(
                  "Quotient de polynômes de **même degré 2**. Factoriser \$x^2\$ en haut et en bas : \$\\dfrac{x^2(3 - 1/x + 1/x^2)}{x^2(1 + 2/x^2)} \\to \\dfrac{3}{1} = 3\$.",
                ),
                _step(
                  "**Règle pratique** : pour un quotient de polynômes de même degré, limite = rapport des coefficients dominants.",
                ),
              ], finalAnswerFr: r"$\lim = 3$"),
            ),
            _q(
              2,
              "\$\\lim_{x \\to +\\infty} \\dfrac{\\ln x}{x}\$ et \$\\lim_{x \\to +\\infty} \\dfrac{e^x}{x^{10}}\$.",
              2,
              _sol([
                _step(
                  "**Croissances comparées** : à l'infini, l'exponentielle l'emporte sur toute puissance, qui l'emporte sur \$\\ln\$.",
                ),
                _step(
                  "Donc \$\\lim \\dfrac{\\ln x}{x} = 0\$ et \$\\lim \\dfrac{e^x}{x^{10}} = +\\infty\$.",
                  tipFr:
                      "Hiérarchie universelle : \$e^x \\gg x^n \\gg \\ln x\$ à l'infini. Elle décide qui 'gagne' dans toute forme indéterminée \$\\infty/\\infty\$.",
                ),
              ], finalAnswerFr: r"$0$ et $+\infty$"),
            ),
            _q(
              3,
              "\$\\lim_{x \\to 0^+} x \\ln x\$.",
              1,
              _sol([
                _step(
                  "Forme \$0 \\cdot (-\\infty)\$. Changement de variable \$u = 1/x\$ (\$u \\to +\\infty\$ quand \$x \\to 0^+\$) : \$x \\ln x = (1/u) \\ln(1/u) = -\\ln u / u \\to 0\$ par croissances comparées.",
                ),
              ], finalAnswerFr: r"$\lim = 0$"),
            ),
          ],
        ),
        _ex(
          4,
          'Asymptotes',
          5,
          "Soit \$f(x) = \\dfrac{x^2 + 1}{x - 1}\$ définie sur \$\\mathbb{R} \\setminus \\{1\\}\$.",
          [
            _q(
              1,
              "Calculer les limites de \$f\$ en \$1^+\$, \$1^-\$, \$+\\infty\$, \$-\\infty\$.",
              2,
              _sol([
                _step(
                  "En 1 : numérateur \$\\to 2 > 0\$, dénominateur \$\\to 0\$. Signe à droite : \$x - 1 > 0\$ → \$f \\to +\\infty\$. Signe à gauche : \$x - 1 < 0\$ → \$f \\to -\\infty\$.",
                ),
                _step(
                  "À \$\\pm \\infty\$ : numérateur degré 2, dénominateur degré 1 → \$f \\to \\pm \\infty\$ (numérateur l'emporte).",
                ),
              ], finalAnswerFr: r"$\pm\infty$ en 1; $\pm\infty$ à $\pm\infty$"),
            ),
            _q(
              2,
              "Effectuer la division euclidienne pour écrire \$f(x) = ax + b + c/(x-1)\$.",
              2,
              _sol([
                _step(
                  "Division : \$x^2 + 1 = (x - 1)(x + 1) + 2\$ (car \$(x-1)(x+1) = x^2 - 1\$ et reste = \$1 - (-1) = 2\$).",
                ),
                _step(
                  "Donc \$f(x) = x + 1 + \\dfrac{2}{x - 1}\$.",
                ),
              ], finalAnswerFr: r"$f(x) = x + 1 + 2/(x-1)$"),
            ),
            _q(
              3,
              "En déduire l'asymptote oblique en \$\\pm\\infty\$.",
              1,
              _sol([
                _step(
                  "Quand \$x \\to \\pm\\infty\$, \$\\dfrac{2}{x-1} \\to 0\$, donc \$f(x) - (x + 1) \\to 0\$.",
                ),
                _step(
                  "La droite \$y = x + 1\$ est **asymptote oblique** à la courbe de \$f\$ en \$\\pm\\infty\$.",
                  tipFr:
                      "Asymptote oblique : la partie polynômiale après division euclidienne donne l'équation de l'asymptote. Le reste tend vers 0.",
                ),
              ], finalAnswerFr: r"$y = x + 1$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperContinuityTvi() => _paper(
      titleFr: 'Épreuve type — Continuité et théorème des valeurs intermédiaires',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Continuité (\$\\lim_a f = f(a)\$), prolongement par continuité, TVI (\$f\$ continue sur \$[a,b]\$ + signes opposés → racine).",
      exercices: [
        _ex(
          1,
          'Continuité par morceaux',
          5,
          "Soit \$f(x) = \\begin{cases} x^2 + 1 & \\text{si } x \\le 1 \\\\ ax + b & \\text{si } x > 1 \\end{cases}\$.",
          [
            _q(
              1,
              "Déterminer \$a, b\$ pour que \$f\$ soit continue et dérivable en \$x = 1\$.",
              4,
              _sol([
                _step(
                  "**Continuité en 1** : \$\\lim_{1^-} f = 1^2 + 1 = 2\$ et \$f(1) = 2\$. Limite à droite : \$\\lim_{1^+} ax + b = a + b\$. Égalité : \$a + b = 2\$.",
                ),
                _step(
                  "**Dérivabilité en 1** : les dérivées à gauche et à droite doivent coïncider. À gauche : \$f'(x) = 2x\$ donc \$f'_g(1) = 2\$. À droite : \$f'(x) = a\$, donc \$a = 2\$.",
                ),
                _step(
                  "Avec \$a = 2\$ et \$a + b = 2\$ : \$b = 0\$. Donc \$f(x) = 2x\$ pour \$x > 1\$.",
                  tipFr:
                      "Pour 'recoller' deux morceaux avec dérivabilité, deux conditions : (1) mêmes valeurs (continuité), (2) mêmes pentes (dérivabilité).",
                ),
              ], finalAnswerFr: r"$a = 2$, $b = 0$"),
            ),
            _q(
              2,
              "Avec ces valeurs, vérifier la continuité et la dérivabilité.",
              1,
              _sol([
                _step(
                  "\$\\lim_{1^-} f = 2\$, \$\\lim_{1^+} f = 2 \\cdot 1 + 0 = 2\$, \$f(1) = 2\$ ✓ continue. \$f'_g(1) = 2\$, \$f'_d(1) = 2\$ ✓ dérivable.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          2,
          'Prolongement par continuité',
          5,
          "Étudier la possibilité de prolonger par continuité.",
          [
            _q(
              1,
              "\$f(x) = \\dfrac{x^2 - 4}{x - 2}\$ en \$x = 2\$.",
              3,
              _sol([
                _step(
                  "\$f\$ n'est pas définie en 2 (dénominateur s'annule). Calcul de la limite : \$\\dfrac{x^2 - 4}{x - 2} = \\dfrac{(x-2)(x+2)}{x - 2} = x + 2\$ pour \$x \\ne 2\$.",
                ),
                _step(
                  "\$\\lim_{x \\to 2} f(x) = 4\$ existe et est finie.",
                ),
                _step(
                  "**Prolongement par continuité** : \$\\tilde f(2) = 4\$. La fonction prolongée est simplement \$x + 2\$ partout, continue sur \$\\mathbb{R}\$.",
                  tipFr:
                      "Discontinuité 'apparente' (forme \$0/0\$) → prolongeable. Discontinuité 'essentielle' (limites infinies ou limites latérales différentes) → non-prolongeable.",
                ),
              ], finalAnswerFr: r"$\tilde f(2) = 4$"),
            ),
            _q(
              2,
              "\$g(x) = \\dfrac{1}{x^2}\$ en \$x = 0\$.",
              2,
              _sol([
                _step(
                  "\$\\lim_{x \\to 0} 1/x^2 = +\\infty\$ (des deux côtés). Pas de limite finie.",
                ),
                _step(
                  "**Impossible** de prolonger par continuité — la discontinuité est essentielle (asymptote verticale).",
                ),
              ], finalAnswerFr: r"Non prolongeable"),
            ),
          ],
        ),
        _ex(
          3,
          'TVI — existence et unicité',
          5,
          "Soit \$f(x) = x^3 + 2x - 5\$.",
          [
            _qSubs(
              1,
              "Étude de l'équation \$f(x) = 0\$.",
              4,
              [
                _sub(
                  'a',
                  "Justifier que l'équation admet au moins une solution dans \$[1, 2]\$.",
                  2,
                  _sol([
                    _step(
                      "\$f\$ est polynômiale → **continue sur \$\\mathbb{R}\$**, en particulier sur \$[1, 2]\$.",
                    ),
                    _step(
                      "\$f(1) = 1 + 2 - 5 = -2 < 0\$ et \$f(2) = 8 + 4 - 5 = 7 > 0\$. Signes opposés → par **TVI**, \$\\exists \\alpha \\in [1, 2] : f(\\alpha) = 0\$.",
                    ),
                  ], finalAnswerFr: r"$\exists \alpha \in [1, 2]$"),
                ),
                _sub(
                  'b',
                  "Montrer l'unicité.",
                  1,
                  _sol([
                    _step(
                      "\$f'(x) = 3x^2 + 2 > 0\$ pour tout \$x\$ (somme de positifs). Donc \$f\$ est **strictement croissante** sur \$\\mathbb{R}\$ → la solution est unique.",
                    ),
                  ]),
                ),
                _sub(
                  'c',
                  "Donner un encadrement à \$10^{-1}\$ près.",
                  1,
                  _sol([
                    _step(
                      "\$f(1{,}3) = 2{,}197 + 2{,}6 - 5 = -0{,}203 < 0\$. \$f(1{,}4) = 2{,}744 + 2{,}8 - 5 = 0{,}544 > 0\$. Donc \$\\alpha \\in ]1{,}3,\\, 1{,}4[\$.",
                    ),
                  ], finalAnswerFr: r"$\alpha \in ]1{,}3,\, 1{,}4[$"),
                ),
              ],
            ),
          ],
        ),
        _ex(
          4,
          'Équation transcendante',
          5,
          "Soit \$g(x) = e^x + x - 3\$.",
          [
            _q(
              1,
              "Montrer que \$g(x) = 0\$ admet une unique solution \$\\alpha\$ dans \$\\mathbb{R}\$.",
              3,
              _sol([
                _step(
                  "**Existence** : \$g\$ est continue (somme de continues). \$g(0) = 1 + 0 - 3 = -2 < 0\$ ; \$g(1) = e + 1 - 3 \\approx 0{,}72 > 0\$. TVI sur \$[0, 1]\$ → solution.",
                ),
                _step(
                  "**Unicité** : \$g'(x) = e^x + 1 > 0\$ partout → \$g\$ strictement croissante → solution unique.",
                ),
                _step(
                  "**Domaine global** : \$\\lim_{-\\infty} g = 0 - \\infty - 3 = -\\infty\$ ; \$\\lim_{+\\infty} g = +\\infty\$. \$g\$ atteint toute valeur réelle, l'unique solution est dans \$\\mathbb{R}\$.",
                ),
              ], finalAnswerFr: r"$\exists ! \alpha \approx 0{,}79$"),
            ),
            _q(
              2,
              "Donner un encadrement de \$\\alpha\$ à \$10^{-2}\$ près par dichotomie.",
              2,
              _sol([
                _step(
                  "On part de \$[0, 1]\$. Milieu \$0{,}5\$ : \$g(0{,}5) = e^{0{,}5} + 0{,}5 - 3 \\approx 1{,}649 - 2{,}5 = -0{,}851 < 0\$ → \$\\alpha \\in ]0{,}5, 1[\$.",
                ),
                _step(
                  "Milieu \$0{,}75\$ : \$g(0{,}75) \\approx 2{,}117 + 0{,}75 - 3 = -0{,}133 < 0\$ → \$\\alpha \\in ]0{,}75, 1[\$.",
                ),
                _step(
                  "Milieu \$0{,}875\$ : \$g(0{,}875) \\approx 2{,}399 + 0{,}875 - 3 = 0{,}274 > 0\$ → \$\\alpha \\in ]0{,}75, 0{,}875[\$. Milieu \$0{,}8125\$ : \$g \\approx 2{,}253 + 0{,}8125 - 3 = 0{,}066 > 0\$ → \$\\alpha \\in ]0{,}75, 0{,}8125[\$. Encore quelques étapes : \$\\alpha \\approx 0{,}79\$.",
                  tipFr:
                      "**Dichotomie** : précision divisée par 2 à chaque étape. Pour \$10^{-2}\$ partant de longueur 1, il faut environ 7 itérations.",
                ),
              ], finalAnswerFr: r"$\alpha \approx 0{,}79$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperDerivRules() => _paper(
      titleFr: 'Épreuve type — Règles de dérivation',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Linéarité, produit \$(uv)' = u'v + uv'\$, quotient \$(u/v)' = (u'v - uv')/v^2\$, composition \$(f \\circ g)' = (f' \\circ g) \\cdot g'\$.",
      exercices: [
        _ex(
          1,
          'Dérivées usuelles et linéarité',
          5,
          "Calculer la dérivée de chaque fonction.",
          [
            _q(
              1,
              "\$f(x) = 3x^4 - 2x^3 + 5x - 7\$.",
              1,
              _sol([
                _step(
                  "Linéarité — dériver terme à terme : \$f'(x) = 12 x^3 - 6 x^2 + 5\$.",
                ),
              ], finalAnswerFr: r"$f'(x) = 12x^3 - 6x^2 + 5$"),
            ),
            _q(
              2,
              "\$g(x) = \\dfrac{2}{x^3} + 4 \\sqrt x\$ (sur \$]0, +\\infty[\$).",
              2,
              _sol([
                _step(
                  "Réécrire en puissances : \$g(x) = 2 x^{-3} + 4 x^{1/2}\$.",
                ),
                _step(
                  "\$g'(x) = 2 \\cdot (-3) x^{-4} + 4 \\cdot (1/2) x^{-1/2} = -\\dfrac{6}{x^4} + \\dfrac{2}{\\sqrt x}\$.",
                ),
              ], finalAnswerFr: r"$g'(x) = -6/x^4 + 2/\sqrt x$"),
            ),
            _q(
              3,
              "\$h(x) = \\cos x + 2 \\sin x\$.",
              2,
              _sol([
                _step(
                  "\$(\\cos x)' = -\\sin x\$ et \$(\\sin x)' = \\cos x\$. Linéarité : \$h'(x) = -\\sin x + 2 \\cos x\$.",
                ),
              ], finalAnswerFr: r"$h'(x) = -\sin x + 2\cos x$"),
            ),
          ],
        ),
        _ex(
          2,
          'Produit et quotient',
          5,
          "Appliquer les règles \$(uv)'\$ et \$(u/v)'\$.",
          [
            _q(
              1,
              "\$f(x) = x \\sin x\$.",
              1,
              _sol([
                _step(
                  "**Produit** : \$u = x\$, \$u' = 1\$ ; \$v = \\sin x\$, \$v' = \\cos x\$.",
                ),
                _step(
                  "\$f'(x) = 1 \\cdot \\sin x + x \\cdot \\cos x = \\sin x + x \\cos x\$.",
                ),
              ], finalAnswerFr: r"$f'(x) = \sin x + x \cos x$"),
            ),
            _q(
              2,
              "\$g(x) = (x^2 + 1)(2x - 3)\$.",
              2,
              _sol([
                _step(
                  "\$g'(x) = 2x \\cdot (2x - 3) + (x^2 + 1) \\cdot 2 = 4x^2 - 6x + 2x^2 + 2 = 6x^2 - 6x + 2\$.",
                ),
                _step(
                  "Vérification (développer \$g\$ puis dériver) : \$g(x) = 2x^3 - 3x^2 + 2x - 3\$, \$g'(x) = 6x^2 - 6x + 2\$ ✓.",
                ),
              ], finalAnswerFr: r"$g'(x) = 6x^2 - 6x + 2$"),
            ),
            _q(
              3,
              "\$h(x) = \\dfrac{x}{x^2 + 1}\$.",
              2,
              _sol([
                _step(
                  "**Quotient** : \$u = x\$, \$u' = 1\$ ; \$v = x^2 + 1\$, \$v' = 2x\$.",
                ),
                _step(
                  "\$(u/v)' = (u'v - uv')/v^2 = \\dfrac{1 \\cdot (x^2 + 1) - x \\cdot 2x}{(x^2 + 1)^2} = \\dfrac{x^2 + 1 - 2x^2}{(x^2+1)^2} = \\dfrac{1 - x^2}{(x^2+1)^2}\$.",
                  mistakeFr:
                      "Ne pas oublier le signe **moins** au milieu : \$u'v - uv'\$ (et pas \$u'v + uv'\$).",
                ),
              ], finalAnswerFr: r"$h'(x) = (1 - x^2)/(x^2+1)^2$"),
            ),
          ],
        ),
        _ex(
          3,
          'Composition (règle de la chaîne)',
          5,
          "Appliquer \$(f \\circ g)' = (f' \\circ g) \\cdot g'\$.",
          [
            _q(
              1,
              "\$f(x) = (3x + 1)^4\$.",
              2,
              _sol([
                _step(
                  "Composition \$u^4\$ avec \$u(x) = 3x + 1\$. Règle : \$(u^n)' = n u^{n-1} u'\$.",
                ),
                _step(
                  "\$u' = 3\$, donc \$f'(x) = 4 (3x + 1)^3 \\cdot 3 = 12(3x + 1)^3\$.",
                  mistakeFr:
                      "Erreur fréquente : oublier le \$\\times u' = \\times 3\$. La dérivée de l'intérieur est essentielle.",
                ),
              ], finalAnswerFr: r"$f'(x) = 12(3x+1)^3$"),
            ),
            _q(
              2,
              "\$g(x) = \\sqrt{x^2 + 1}\$.",
              2,
              _sol([
                _step(
                  "Composition \$\\sqrt u\$ avec \$u = x^2 + 1\$. Règle : \$(\\sqrt u)' = u' / (2 \\sqrt u)\$.",
                ),
                _step(
                  "\$u' = 2x\$, donc \$g'(x) = \\dfrac{2x}{2\\sqrt{x^2 + 1}} = \\dfrac{x}{\\sqrt{x^2 + 1}}\$.",
                ),
              ], finalAnswerFr: r"$g'(x) = x/\sqrt{x^2+1}$"),
            ),
            _q(
              3,
              "\$h(x) = \\sin(2x + \\pi/3)\$.",
              1,
              _sol([
                _step(
                  "Composition \$\\sin u\$ avec \$u = 2x + \\pi/3\$. \$u' = 2\$.",
                ),
                _step(
                  "\$h'(x) = \\cos(2x + \\pi/3) \\cdot 2 = 2 \\cos(2x + \\pi/3)\$.",
                ),
              ], finalAnswerFr: r"$h'(x) = 2 \cos(2x + \pi/3)$"),
            ),
          ],
        ),
        _ex(
          4,
          'Tangentes',
          5,
          "Soit \$f(x) = x^3 - 3x^2 + 2\$.",
          [
            _q(
              1,
              "Donner l'équation de la tangente \$T\$ à la courbe en \$x_0 = 1\$.",
              3,
              _sol([
                _step(
                  "Équation de la tangente : \$y = f'(x_0)(x - x_0) + f(x_0)\$.",
                ),
                _step(
                  "\$f(1) = 1 - 3 + 2 = 0\$. \$f'(x) = 3x^2 - 6x\$, donc \$f'(1) = 3 - 6 = -3\$.",
                ),
                _step(
                  "Donc \$T : y = -3(x - 1) + 0 = -3x + 3\$.",
                ),
              ], finalAnswerFr: r"$T : y = -3x + 3$"),
            ),
            _q(
              2,
              "En quels points la tangente est-elle horizontale ?",
              2,
              _sol([
                _step(
                  "Tangente horizontale \$\\iff\$ pente nulle \$\\iff f'(x) = 0 \\iff 3x^2 - 6x = 0 \\iff 3x(x - 2) = 0\$.",
                ),
                _step(
                  "Solutions : \$x = 0\$ (\$f(0) = 2\$) et \$x = 2\$ (\$f(2) = 8 - 12 + 2 = -2\$). Tangentes horizontales aux points \$(0, 2)\$ et \$(2, -2)\$.",
                  tipFr:
                      "Les tangentes horizontales correspondent aux **extrema locaux** ; ici \$f(0) = 2\$ est un max local et \$f(2) = -2\$ un min local.",
                ),
              ], finalAnswerFr: r"$(0, 2)$ et $(2, -2)$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperDerivApps() => _paper(
      titleFr: 'Épreuve type — Applications de la dérivation',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Étude de variations, extrema, optimisation, démonstration d'inégalités via étude de fonction.",
      exercices: [
        _ex(
          1,
          'Étude de variations',
          5,
          "Soit \$f(x) = x^3 - 3x + 1\$ définie sur \$\\mathbb{R}\$.",
          [
            _q(
              1,
              "Calculer \$f'(x)\$, étudier son signe et dresser le tableau de variations.",
              3,
              _sol([
                _step(
                  "\$f'(x) = 3x^2 - 3 = 3(x^2 - 1) = 3(x - 1)(x + 1)\$.",
                ),
                _step(
                  "Signe de \$f'\$ : \$f'(x) > 0\$ sur \$]-\\infty, -1[\$ ; \$f'(x) < 0\$ sur \$]-1, 1[\$ ; \$f'(x) > 0\$ sur \$]1, +\\infty[\$.",
                ),
                _step(
                  "Variations : \$f\$ **croissante** sur \$]-\\infty, -1]\$, **décroissante** sur \$[-1, 1]\$, **croissante** sur \$[1, +\\infty[\$.",
                ),
              ], finalAnswerFr: r"Max local en $-1$, min local en $1$"),
            ),
            _q(
              2,
              "Donner les extrema locaux et leurs valeurs.",
              2,
              _sol([
                _step(
                  "**Maximum local** en \$x = -1\$ : \$f(-1) = -1 + 3 + 1 = 3\$.",
                ),
                _step(
                  "**Minimum local** en \$x = 1\$ : \$f(1) = 1 - 3 + 1 = -1\$.",
                  tipFr:
                      "À un extremum local d'une fonction dérivable : la tangente est horizontale, donc \$f'\$ s'annule en changeant de signe.",
                ),
              ], finalAnswerFr: r"$f(-1) = 3$, $f(1) = -1$"),
            ),
          ],
        ),
        _ex(
          2,
          'Optimisation — boîte à volume maximal',
          5,
          "Une feuille de carton carrée de côté 30 cm. On découpe un carré de côté \$x\$ à chaque coin, puis on plie pour former une boîte sans couvercle. Volume : \$V(x) = x(30 - 2x)^2\$ pour \$0 < x < 15\$.",
          [
            _q(
              1,
              "Calculer \$V'(x)\$ et trouver la valeur de \$x\$ qui maximise \$V\$.",
              4,
              _sol([
                _step(
                  "**Produit** : \$V'(x) = 1 \\cdot (30 - 2x)^2 + x \\cdot 2(30 - 2x)(-2) = (30 - 2x)^2 - 4x(30 - 2x)\$.",
                ),
                _step(
                  "Factoriser par \$(30 - 2x)\$ : \$V'(x) = (30 - 2x)[(30 - 2x) - 4x] = (30 - 2x)(30 - 6x) = 12(15 - x)(5 - x)\$.",
                ),
                _step(
                  "Racines : \$x = 5\$ et \$x = 15\$ (exclu). Sur \$]0, 5[\$ : \$V'(0) = 12 \\cdot 15 \\cdot 5 = 900 > 0\$. Sur \$]5, 15[\$ : \$V'(10) = 12 \\cdot 5 \\cdot (-5) = -300 < 0\$. \$V'\$ s'annule en \$x = 5\$ en changeant de signe → **maximum**.",
                ),
                _step(
                  "Volume maximum : \$V(5) = 5 \\cdot 20^2 = 5 \\cdot 400 = 2000\\,\\text{cm}^3 = 2\\,\\text{L}\$.",
                  tipFr:
                      "Recette d'optimisation : (1) exprimer la grandeur à optimiser, (2) délimiter le domaine, (3) dériver, (4) trouver les points critiques, (5) vérifier le signe de la dérivée.",
                ),
              ], finalAnswerFr: r"$x = 5$ cm, $V_{\max} = 2000$ cm³"),
            ),
          ],
        ),
        _ex(
          3,
          'Inégalité par étude de fonction',
          5,
          "Démontrer que pour tout \$x > 0\$, \$\\ln(1 + x) < x\$.",
          [
            _qSubs(
              1,
              "Étude de la fonction \$f(x) = x - \\ln(1 + x)\$.",
              4,
              [
                _sub(
                  'a',
                  "Donner le domaine de \$f\$ et calculer \$f(0)\$.",
                  1,
                  _sol([
                    _step(
                      "\$\\ln(1 + x)\$ définie pour \$1 + x > 0 \\iff x > -1\$. Domaine : \$]-1, +\\infty[\$.",
                    ),
                    _step(
                      "\$f(0) = 0 - \\ln 1 = 0\$.",
                    ),
                  ]),
                ),
                _sub(
                  'b',
                  "Calculer \$f'(x)\$ et étudier son signe sur \$]0, +\\infty[\$.",
                  2,
                  _sol([
                    _step(
                      "\$f'(x) = 1 - \\dfrac{1}{1 + x} = \\dfrac{(1 + x) - 1}{1 + x} = \\dfrac{x}{1 + x}\$.",
                    ),
                    _step(
                      "Sur \$]0, +\\infty[\$ : \$x > 0\$ et \$1 + x > 0\$, donc \$f'(x) > 0\$.",
                    ),
                  ]),
                ),
                _sub(
                  'c',
                  "Conclure.",
                  1,
                  _sol([
                    _step(
                      "\$f\$ est strictement croissante sur \$[0, +\\infty[\$ avec \$f(0) = 0\$. Donc pour \$x > 0\$, \$f(x) > 0 \\iff x - \\ln(1 + x) > 0 \\iff \\ln(1 + x) < x\$ ✓.",
                      tipFr:
                          "Pour démontrer une inégalité \$g(x) < h(x)\$, étudier la fonction différence \$h - g\$ et montrer qu'elle est positive.",
                    ),
                  ]),
                ),
              ],
            ),
          ],
        ),
        _ex(
          4,
          'Étude complète',
          5,
          "Soit \$f(x) = \\dfrac{x^2 - 1}{x}\$ définie sur \$\\mathbb{R}^*\$.",
          [
            _qSubs(
              1,
              "Étude complète.",
              5,
              [
                _sub(
                  'a',
                  "Calculer \$f'(x)\$ et étudier son signe.",
                  2,
                  _sol([
                    _step(
                      "Réécrire : \$f(x) = x - 1/x\$. Donc \$f'(x) = 1 + 1/x^2\$.",
                    ),
                    _step(
                      "\$f'(x) = 1 + 1/x^2 > 0\$ partout sur \$\\mathbb{R}^*\$ → \$f\$ **strictement croissante** sur chacun de ses intervalles \$]-\\infty, 0[\$ et \$]0, +\\infty[\$.",
                    ),
                  ], finalAnswerFr: r"$f$ strictement croissante sur $\mathbb{R}^*$"),
                ),
                _sub(
                  'b',
                  "Calculer les limites aux bornes.",
                  2,
                  _sol([
                    _step(
                      "À \$\\pm \\infty\$ : \$f(x) = x - 1/x \\to \\pm \\infty\$ (terme dominant \$x\$).",
                    ),
                    _step(
                      "En \$0^+\$ : \$f(x) = x - 1/x \\to 0 - (+\\infty) = -\\infty\$. En \$0^-\$ : \$-1/x \\to +\\infty\$, donc \$f \\to +\\infty\$.",
                    ),
                  ]),
                ),
                _sub(
                  'c',
                  "Donner les asymptotes.",
                  1,
                  _sol([
                    _step(
                      "**Verticale** : \$x = 0\$ (limites infinies).",
                    ),
                    _step(
                      "**Oblique** en \$\\pm \\infty\$ : \$f(x) - x = -1/x \\to 0\$, donc la droite \$y = x\$ est asymptote oblique.",
                      tipFr:
                          "Asymptote oblique \$y = ax + b\$ \$\\iff f(x) - (ax + b) \\to 0\$ en \$\\pm\\infty\$.",
                    ),
                  ], finalAnswerFr: r"V: $x = 0$; O: $y = x$"),
                ),
              ],
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperLnFunction() => _paper(
      titleFr: 'Épreuve type — Fonction logarithme népérien',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Fonction \$\\ln\$ définie sur \$]0, +\\infty[\$, \$\\ln 1 = 0\$, \$\\ln e = 1\$. Propriétés : \$\\ln(ab) = \\ln a + \\ln b\$, \$(\\ln u)' = u'/u\$.",
      exercices: [
        _ex(
          1,
          'Propriétés algébriques et équations',
          5,
          "Rappel : \$\\ln(ab) = \\ln a + \\ln b\$, \$\\ln(a/b) = \\ln a - \\ln b\$, \$\\ln(a^n) = n \\ln a\$ pour \$a, b > 0\$.",
          [
            _q(
              1,
              "Simplifier \$A = \\ln 8 + \\ln 3 - 2 \\ln 2 - \\ln 6\$.",
              2,
              _sol([
                _step(
                  "Réécrire : \$2 \\ln 2 = \\ln 4\$ et regrouper. \$A = \\ln 8 - \\ln 4 + \\ln 3 - \\ln 6 = \\ln(8/4) + \\ln(3/6) = \\ln 2 + \\ln(1/2)\$.",
                ),
                _step(
                  "\$\\ln(1/2) = -\\ln 2\$, donc \$A = \\ln 2 - \\ln 2 = 0\$.",
                  tipFr:
                      "Regrouper les \$\\ln\$ par somme/différence avant de calculer numériquement — souvent tout se simplifie.",
                ),
              ], finalAnswerFr: r"$A = 0$"),
            ),
            _q(
              2,
              "Résoudre dans \$\\mathbb{R}\$ : \$\\ln(2x - 1) = \\ln(x + 3)\$.",
              2,
              _sol([
                _step(
                  "**Domaine** : \$2x - 1 > 0\$ et \$x + 3 > 0\$, soit \$x > 1/2\$ (plus restrictif).",
                ),
                _step(
                  "Par injectivité de \$\\ln\$ : \$\\ln u = \\ln v \\iff u = v\$. \$2x - 1 = x + 3 \\iff x = 4\$.",
                ),
                _step(
                  "\$x = 4 > 1/2\$ ✓ → \$S = \\{4\\}\$.",
                  mistakeFr:
                      "Toujours vérifier les conditions d'existence avant d'utiliser l'injectivité — une solution 'algébrique' peut être hors-domaine.",
                ),
              ], finalAnswerFr: r"$S = \{4\}$"),
            ),
            _q(
              3,
              "Résoudre \$\\ln(x^2 - 1) = \\ln 3 + \\ln(x + 1)\$.",
              1,
              _sol([
                _step(
                  "**Domaine** : \$x^2 - 1 > 0 \\iff x < -1\$ ou \$x > 1\$ ; \$x + 1 > 0 \\iff x > -1\$. Intersection : \$x > 1\$.",
                ),
                _step(
                  "Équation : \$\\ln(x^2 - 1) - \\ln(x + 1) = \\ln 3 \\iff \\ln\\left(\\dfrac{x^2 - 1}{x + 1}\\right) = \\ln 3 \\iff \\ln(x - 1) = \\ln 3\$ (car \$(x^2-1)/(x+1) = x - 1\$).",
                ),
                _step(
                  "Donc \$x - 1 = 3 \\iff x = 4 > 1\$ ✓. \$S = \\{4\\}\$.",
                ),
              ], finalAnswerFr: r"$S = \{4\}$"),
            ),
          ],
        ),
        _ex(
          2,
          'Dérivation et étude',
          5,
          "Soit \$f(x) = x - \\ln x\$ sur \$]0, +\\infty[\$.",
          [
            _qSubs(
              1,
              "Étude de \$f\$.",
              4,
              [
                _sub(
                  'a',
                  "Calculer \$f'(x)\$ et étudier son signe.",
                  2,
                  _sol([
                    _step(
                      "\$f'(x) = 1 - 1/x = \\dfrac{x - 1}{x}\$.",
                    ),
                    _step(
                      "Sur \$]0, +\\infty[\$ : \$x > 0\$ → signe de \$f'\$ = signe de \$x - 1\$. \$f' < 0\$ sur \$]0, 1[\$, \$f' > 0\$ sur \$]1, +\\infty[\$, \$f'(1) = 0\$.",
                    ),
                  ], finalAnswerFr: r"$f'(x) = (x-1)/x$"),
                ),
                _sub(
                  'b',
                  "Tableau de variations et minimum.",
                  1,
                  _sol([
                    _step(
                      "\$f\$ décroît sur \$]0, 1]\$, croît sur \$[1, +\\infty[\$. **Minimum global** en \$x = 1\$ : \$f(1) = 1 - \\ln 1 = 1\$.",
                    ),
                    _step(
                      "**Conséquence** : pour tout \$x > 0\$, \$f(x) \\ge 1 \\iff x - \\ln x \\ge 1 \\iff \\ln x \\le x - 1\$. Inégalité classique.",
                      tipFr:
                          "L'inégalité \$\\ln x \\le x - 1\$ (égalité en 1) est très utile pour borner \$\\ln\$ par un polynôme.",
                    ),
                  ], finalAnswerFr: r"Min $f(1) = 1$; $\ln x \le x - 1$"),
                ),
                _sub(
                  'c',
                  "Limites aux bornes.",
                  1,
                  _sol([
                    _step(
                      "En \$0^+\$ : \$\\ln x \\to -\\infty\$ donc \$f(x) = x - \\ln x \\to 0 - (-\\infty) = +\\infty\$.",
                    ),
                    _step(
                      "En \$+\\infty\$ : factoriser \$f(x) = x(1 - \\ln x / x)\$. Par croissances comparées, \$\\ln x / x \\to 0\$, donc \$f(x) \\to +\\infty\$.",
                    ),
                  ], finalAnswerFr: r"$+\infty$ aux deux bornes"),
                ),
              ],
            ),
          ],
        ),
        _ex(
          3,
          'Composition',
          5,
          "Soit \$g(x) = \\ln(x^2 + 1)\$ sur \$\\mathbb{R}\$.",
          [
            _q(
              1,
              "Justifier le domaine.",
              1,
              _sol([
                _step(
                  "\$x^2 + 1 \\ge 1 > 0\$ pour tout \$x \\in \\mathbb{R}\$, donc \$\\ln(x^2 + 1)\$ est défini partout. \$\\mathcal D_g = \\mathbb{R}\$.",
                ),
              ]),
            ),
            _q(
              2,
              "Calculer \$g'(x)\$ et étudier les variations.",
              2,
              _sol([
                _step(
                  "**Règle** : \$(\\ln u)' = u'/u\$. Ici \$u = x^2 + 1\$, \$u' = 2x\$.",
                ),
                _step(
                  "\$g'(x) = \\dfrac{2x}{x^2 + 1}\$. Dénominateur \$> 0\$, donc signe = signe de \$2x\$.",
                ),
                _step(
                  "\$g\$ décroît sur \$]-\\infty, 0]\$, croît sur \$[0, +\\infty[\$. **Minimum** en \$x = 0\$ : \$g(0) = \\ln 1 = 0\$.",
                ),
              ], finalAnswerFr: r"$g'(x) = 2x/(x^2+1)$; min $g(0) = 0$"),
            ),
            _q(
              3,
              "Limites en \$\\pm\\infty\$.",
              2,
              _sol([
                _step(
                  "Quand \$x \\to \\pm\\infty\$, \$x^2 + 1 \\to +\\infty\$ et \$\\ln t \\to +\\infty\$ quand \$t \\to +\\infty\$.",
                ),
                _step(
                  "Par composition : \$\\lim_{\\pm\\infty} g = +\\infty\$.",
                  tipFr:
                      "\$g\$ est paire (\$g(-x) = g(x)\$) — mêmes valeurs et mêmes limites en \$\\pm\\infty\$.",
                ),
              ], finalAnswerFr: r"$\lim = +\infty$ aux deux bornes"),
            ),
          ],
        ),
        _ex(
          4,
          'Inégalité',
          5,
          "Démontrer pour tout \$x > 0\$ : \$\\ln(1 + x) \\le x\$.",
          [
            _q(
              1,
              "Étudier la fonction \$h(x) = x - \\ln(1 + x)\$ sur \$]-1, +\\infty[\$.",
              4,
              _sol([
                _step(
                  "\$h(0) = 0 - \\ln 1 = 0\$.",
                ),
                _step(
                  "\$h'(x) = 1 - \\dfrac{1}{1 + x} = \\dfrac{x}{1 + x}\$.",
                ),
                _step(
                  "Sur \$]0, +\\infty[\$ : \$x > 0\$ et \$1 + x > 0\$ → \$h'(x) > 0\$. \$h\$ strictement croissante.",
                ),
                _step(
                  "Donc pour \$x > 0\$ : \$h(x) > h(0) = 0 \\iff x - \\ln(1+x) > 0 \\iff \\ln(1 + x) < x\$ ✓.",
                  tipFr:
                      "Stratégie classique : pour montrer \$f < g\$ sur \$I\$, étudier \$g - f\$ et montrer qu'elle est strictement positive.",
                ),
              ], finalAnswerFr: r"$\ln(1+x) < x$ pour $x > 0$"),
            ),
            _q(
              2,
              "Application : encadrer \$\\ln 2\$.",
              1,
              _sol([
                _step(
                  "Avec \$x = 1\$ : \$\\ln 2 < 1\$. On peut aussi montrer \$\\ln(1+x) \\ge x - x^2/2\$ pour \$x \\ge 0\$, ce qui donne \$\\ln 2 \\ge 1/2\$. Encadrement \$1/2 < \\ln 2 < 1\$. Valeur exacte \$\\ln 2 \\approx 0{,}693\$.",
                ),
              ], finalAnswerFr: r"$0{,}5 < \ln 2 < 1$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperExpFunction() => _paper(
      titleFr: 'Épreuve type — Fonction exponentielle',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Fonction \$\\exp(x) = e^x\$ : \$(e^x)' = e^x\$, \$e^x > 0\$ partout, \$e^0 = 1\$. Croissances comparées \$e^x \\gg x^n\$.",
      exercices: [
        _ex(
          1,
          'Propriétés algébriques',
          5,
          "Rappel : \$e^a \\cdot e^b = e^{a+b}\$, \$e^a/e^b = e^{a-b}\$, \$(e^a)^n = e^{na}\$, \$e^{-a} = 1/e^a\$.",
          [
            _q(
              1,
              "Simplifier \$A = \\dfrac{e^3 \\cdot e^{-1}}{e^4}\$.",
              1,
              _sol([
                _step(
                  "Numérateur : \$e^3 \\cdot e^{-1} = e^{3-1} = e^2\$.",
                ),
                _step(
                  "Quotient : \$e^2 / e^4 = e^{2-4} = e^{-2}\$.",
                ),
              ], finalAnswerFr: r"$A = e^{-2}$"),
            ),
            _q(
              2,
              "Résoudre \$e^{2x} - 3 e^x + 2 = 0\$.",
              3,
              _sol([
                _step(
                  "**Astuce** : poser \$X = e^x\$ (\$X > 0\$). \$e^{2x} = X^2\$, l'équation devient \$X^2 - 3X + 2 = 0\$.",
                ),
                _step(
                  "Discriminant : \$\\Delta = 9 - 8 = 1\$. Racines : \$X = 2\$ ou \$X = 1\$. Les deux sont positives ✓.",
                ),
                _step(
                  "Retour à \$x\$ : \$e^x = 2 \\iff x = \\ln 2\$ ; \$e^x = 1 \\iff x = 0\$. \$S = \\{0, \\ln 2\\}\$.",
                  tipFr:
                      "Pour une équation polynomiale en \$e^x\$, substituer \$X = e^x\$ ramène à un polynôme classique.",
                ),
              ], finalAnswerFr: r"$S = \{0, \ln 2\}$"),
            ),
            _q(
              3,
              "Résoudre \$e^x \\ge 5\$.",
              1,
              _sol([
                _step(
                  "\$\\ln\$ étant strictement croissante, on applique \$\\ln\$ aux deux membres : \$e^x \\ge 5 \\iff x \\ge \\ln 5 \\approx 1{,}609\$.",
                ),
              ], finalAnswerFr: r"$x \ge \ln 5$"),
            ),
          ],
        ),
        _ex(
          2,
          'Étude de \$f(x) = x e^{-x}\$',
          5,
          "Soit \$f(x) = x e^{-x}\$ sur \$\\mathbb{R}\$.",
          [
            _q(
              1,
              "Calculer \$f'(x)\$ et étudier son signe.",
              2,
              _sol([
                _step(
                  "**Produit** : \$u = x\$ (\$u' = 1\$), \$v = e^{-x}\$ (\$v' = -e^{-x}\$).",
                ),
                _step(
                  "\$f'(x) = 1 \\cdot e^{-x} + x \\cdot (-e^{-x}) = e^{-x}(1 - x)\$.",
                ),
                _step(
                  "\$e^{-x} > 0\$ toujours → signe de \$f'\$ = signe de \$1 - x\$. \$f' > 0\$ sur \$]-\\infty, 1[\$, \$f' < 0\$ sur \$]1, +\\infty[\$.",
                ),
              ], finalAnswerFr: r"$f'(x) = e^{-x}(1 - x)$"),
            ),
            _q(
              2,
              "Tableau de variations et extremum.",
              1,
              _sol([
                _step(
                  "\$f\$ croît sur \$]-\\infty, 1]\$, décroît sur \$[1, +\\infty[\$. **Maximum global** en \$x = 1\$ : \$f(1) = 1 \\cdot e^{-1} = 1/e \\approx 0{,}368\$.",
                ),
              ], finalAnswerFr: r"Max $f(1) = 1/e$"),
            ),
            _q(
              3,
              "Limites en \$\\pm\\infty\$.",
              2,
              _sol([
                _step(
                  "En \$-\\infty\$ : \$x \\to -\\infty\$ et \$e^{-x} \\to +\\infty\$ — produit (négatif) × (positif) → \$f \\to -\\infty\$.",
                ),
                _step(
                  "En \$+\\infty\$ : \$f(x) = x/e^x\$. Par croissances comparées, \$\\lim x/e^x = 0\$. Donc \$f \\to 0\$.",
                  tipFr:
                      "**Croissances comparées** : \$\\lim_{x \\to +\\infty} x^n/e^x = 0\$ pour tout \$n\$. L'exponentielle domine toute puissance.",
                ),
              ], finalAnswerFr: r"$-\infty$ et $0$"),
            ),
          ],
        ),
        _ex(
          3,
          'Limites et croissances comparées',
          5,
          "Calculer les limites suivantes.",
          [
            _q(
              1,
              "\$\\lim_{x \\to +\\infty} \\dfrac{e^x}{x^3}\$.",
              1,
              _sol([
                _step(
                  "Croissances comparées : \$\\lim e^x / x^n = +\\infty\$. Donc limite = \$+\\infty\$.",
                ),
              ], finalAnswerFr: r"$+\infty$"),
            ),
            _q(
              2,
              "\$\\lim_{x \\to +\\infty} x^2 e^{-x}\$.",
              2,
              _sol([
                _step(
                  "Réécrire : \$x^2 e^{-x} = x^2/e^x\$. Forme \$\\infty/\\infty\$.",
                ),
                _step(
                  "Par croissances comparées : \$\\lim x^2/e^x = 0\$. Donc limite = 0.",
                ),
              ], finalAnswerFr: r"$\lim = 0$"),
            ),
            _q(
              3,
              "\$\\lim_{x \\to 0} \\dfrac{e^x - 1}{x}\$.",
              2,
              _sol([
                _step(
                  "Forme \$0/0\$. Reconnaître le **taux d'accroissement** de \$\\exp\$ en 0 : \$\\dfrac{e^x - e^0}{x - 0}\$. Sa limite quand \$x \\to 0\$ est \$\\exp'(0) = e^0 = 1\$.",
                  tipFr:
                      "**Limites usuelles** : \$\\lim_0 (e^x - 1)/x = 1\$, \$\\lim_0 \\sin x/x = 1\$, \$\\lim_0 \\ln(1+x)/x = 1\$.",
                ),
              ], finalAnswerFr: r"$\lim = 1$"),
            ),
          ],
        ),
        _ex(
          4,
          'Modèle de décroissance — radioactivité',
          5,
          "Une quantité \$Q(t)\$ vérifie \$Q(t) = Q_0 e^{-\\lambda t}\$ avec \$Q_0 = 100\$ et \$Q(2) = 60\$.",
          [
            _q(
              1,
              "Calculer la constante \$\\lambda\$.",
              2,
              _sol([
                _step(
                  "\$Q(2) = 100 e^{-2\\lambda} = 60 \\iff e^{-2\\lambda} = 0{,}6\$.",
                ),
                _step(
                  "Appliquer \$\\ln\$ : \$-2\\lambda = \\ln(0{,}6)\$, donc \$\\lambda = -\\ln(0{,}6)/2 = \\ln(5/3)/2 \\approx 0{,}255\$.",
                ),
              ], finalAnswerFr: r"$\lambda \approx 0{,}255$"),
            ),
            _q(
              2,
              "Déterminer la demi-vie \$t_{1/2}\$.",
              2,
              _sol([
                _step(
                  "\$Q(t_{1/2}) = Q_0/2 \\iff e^{-\\lambda t_{1/2}} = 1/2 \\iff -\\lambda t_{1/2} = -\\ln 2 \\iff t_{1/2} = \\ln 2 / \\lambda\$.",
                ),
                _step(
                  "Avec \$\\lambda \\approx 0{,}255\$ : \$t_{1/2} \\approx 0{,}693/0{,}255 \\approx 2{,}72\$.",
                  tipFr:
                      "**Formule fondamentale** : \$t_{1/2} = \\ln 2 / \\lambda\$. Indépendante de \$Q_0\$ — caractéristique du matériau.",
                ),
              ], finalAnswerFr: r"$t_{1/2} \approx 2{,}72$"),
            ),
            _q(
              3,
              "Calculer \$\\lim_{t \\to +\\infty} Q(t)\$ et interpréter.",
              1,
              _sol([
                _step(
                  "Quand \$t \\to +\\infty\$, \$-\\lambda t \\to -\\infty\$, \$e^{-\\lambda t} \\to 0^+\$. Donc \$Q(t) \\to 0\$.",
                ),
                _step(
                  "**Interprétation** : décroissance asymptotique — il reste toujours un peu de matière. Cohérent avec la radioactivité.",
                ),
              ], finalAnswerFr: r"$\lim Q = 0$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperPrimitives() => _paper(
      titleFr: 'Épreuve type — Primitives',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Primitive : fonction \$F\$ telle que \$F' = f\$. Unicité à une constante près. Primitives usuelles + formes \$u'/u\$, \$u' u^n\$, \$u' e^u\$.",
      exercices: [
        _ex(
          1,
          'Primitives usuelles',
          5,
          "Donner une primitive de chaque fonction sur le domaine indiqué.",
          [
            _q(
              1,
              "\$f(x) = x^3 - 4x + 2\$ sur \$\\mathbb{R}\$.",
              1,
              _sol([
                _step(
                  "Linéarité et primitive de \$x^n\$ = \$x^{n+1}/(n+1)\$ (pour \$n \\ne -1\$).",
                ),
                _step(
                  "\$F(x) = \\dfrac{x^4}{4} - 2 x^2 + 2 x + C\$. Vérif : \$F'(x) = x^3 - 4x + 2\$ ✓.",
                ),
              ], finalAnswerFr: r"$F(x) = x^4/4 - 2x^2 + 2x + C$"),
            ),
            _q(
              2,
              "\$g(x) = 1/x^2\$ sur \$]0, +\\infty[\$.",
              1,
              _sol([
                _step(
                  "\$g(x) = x^{-2}\$, primitive \$x^{-1}/(-1) = -1/x\$. \$G(x) = -1/x + C\$.",
                ),
              ], finalAnswerFr: r"$G(x) = -1/x + C$"),
            ),
            _q(
              3,
              "\$h(x) = \\sin(2x) + \\cos(3x)\$ sur \$\\mathbb{R}\$.",
              2,
              _sol([
                _step(
                  "Pour \$\\sin(ax)\$, primitive \$-\\cos(ax)/a\$. Pour \$\\cos(ax)\$, primitive \$\\sin(ax)/a\$.",
                ),
                _step(
                  "\$H(x) = -\\cos(2x)/2 + \\sin(3x)/3 + C\$. Vérif : \$H'(x) = \\sin(2x) \\cdot 1 + \\cos(3x) \\cdot 1\$ ✓.",
                  tipFr:
                      "Le facteur \$1/a\$ compense la dérivation interne — sans lui, la dérivée serait \$a\\sin(ax)\$ au lieu de \$\\sin(ax)\$.",
                ),
              ], finalAnswerFr: r"$H(x) = -\cos(2x)/2 + \sin(3x)/3 + C$"),
            ),
            _q(
              4,
              "\$k(x) = e^{3x + 1}\$ sur \$\\mathbb{R}\$.",
              1,
              _sol([
                _step(
                  "Primitive de \$e^{ax + b}\$ : \$e^{ax+b}/a\$. \$K(x) = e^{3x+1}/3 + C\$.",
                ),
              ], finalAnswerFr: r"$K(x) = e^{3x+1}/3 + C$"),
            ),
          ],
        ),
        _ex(
          2,
          'Primitive avec condition',
          5,
          "Soit \$f(x) = 3 x^2 - 6x + 5\$.",
          [
            _q(
              1,
              "Donner la forme générale des primitives.",
              1,
              _sol([
                _step(
                  "\$F(x) = x^3 - 3 x^2 + 5x + C\$ (où \$C \\in \\mathbb{R}\$).",
                ),
              ], finalAnswerFr: r"$F(x) = x^3 - 3x^2 + 5x + C$"),
            ),
            _q(
              2,
              "Trouver la primitive \$F\$ vérifiant \$F(1) = 0\$.",
              2,
              _sol([
                _step(
                  "Condition : \$F(1) = 1 - 3 + 5 + C = 3 + C = 0 \\Rightarrow C = -3\$.",
                ),
                _step(
                  "Donc \$F(x) = x^3 - 3 x^2 + 5x - 3\$. Vérification : \$F(1) = 1 - 3 + 5 - 3 = 0\$ ✓.",
                  tipFr:
                      "Toute primitive a une **constante d'intégration libre**, fixée par une condition initiale (souvent \$F(x_0) = y_0\$).",
                ),
              ], finalAnswerFr: r"$F(x) = x^3 - 3x^2 + 5x - 3$"),
            ),
            _q(
              3,
              "Combien y a-t-il de primitives de \$f\$ ?",
              2,
              _sol([
                _step(
                  "Il y a une **infinité** de primitives, toutes différant d'une constante (la 'constante d'intégration'). Une condition \$F(x_0) = y_0\$ en sélectionne exactement une.",
                ),
                _step(
                  "Mathématiquement : si \$F_1\$ et \$F_2\$ sont primitives de \$f\$ alors \$(F_1 - F_2)' = 0\$ donc \$F_1 - F_2 = \\text{const}\$.",
                ),
              ], finalAnswerFr: r"Infinité, à constante près"),
            ),
          ],
        ),
        _ex(
          3,
          'Formes reconnaissables',
          5,
          "Calculer les primitives en reconnaissant \$u'/u\$, \$u' u^n\$ ou \$u' e^u\$.",
          [
            _q(
              1,
              "\$\\int \\dfrac{2x}{x^2 + 1}\\,dx\$.",
              2,
              _sol([
                _step(
                  "Forme \$u'/u\$ avec \$u = x^2 + 1\$ (et \$u' = 2x\$). Primitive : \$\\ln|u| + C\$.",
                ),
                _step(
                  "Comme \$x^2 + 1 > 0\$, on omet la valeur absolue : \$\\ln(x^2 + 1) + C\$.",
                ),
              ], finalAnswerFr: r"$\ln(x^2+1) + C$"),
            ),
            _q(
              2,
              "\$\\int (2x + 1)^5\\,dx\$.",
              2,
              _sol([
                _step(
                  "Forme \$u' u^n\$ avec \$u = 2x + 1\$, \$u' = 2\$. Le facteur 2 manque — multiplier-diviser par 2.",
                ),
                _step(
                  "\$(2x + 1)^5 = \\dfrac{1}{2} \\cdot 2 (2x+1)^5\$. Primitive : \$\\dfrac{1}{2} \\cdot \\dfrac{(2x+1)^6}{6} = \\dfrac{(2x+1)^6}{12} + C\$.",
                ),
              ], finalAnswerFr: r"$(2x+1)^6/12 + C$"),
            ),
            _q(
              3,
              "\$\\int x e^{x^2}\\,dx\$.",
              1,
              _sol([
                _step(
                  "Forme \$u' e^u\$ avec \$u = x^2\$, \$u' = 2x\$. Facteur 2 manquant : \$x e^{x^2} = \\dfrac{1}{2} \\cdot 2x \\cdot e^{x^2}\$.",
                ),
                _step(
                  "Primitive : \$\\dfrac{1}{2} e^{x^2} + C\$. Vérif : \$\\dfrac{d}{dx}\\left(\\frac{1}{2} e^{x^2}\\right) = \\dfrac{1}{2} \\cdot 2x e^{x^2} = x e^{x^2}\$ ✓.",
                  tipFr:
                      "Pour \$u' e^u\$, la primitive est simplement \$e^u\$. Si le coefficient ne colle pas, ajuster par multiplication-division.",
                ),
              ], finalAnswerFr: r"$e^{x^2}/2 + C$"),
            ),
          ],
        ),
        _ex(
          4,
          'Intégration par parties (introduction)',
          5,
          "On rappelle : \$\\int u v' = [u v] - \\int u' v\$.",
          [
            _q(
              1,
              "Calculer \$\\int x \\cos x\\,dx\$.",
              3,
              _sol([
                _step(
                  "**Choix** : \$u = x\$ (devient simple en dérivant) et \$v' = \\cos x\$ (donc \$v = \\sin x\$).",
                ),
                _step(
                  "Application : \$\\int x \\cos x\\,dx = x \\sin x - \\int 1 \\cdot \\sin x\\,dx = x \\sin x + \\cos x + C\$.",
                ),
                _step(
                  "Vérification : \$(x \\sin x + \\cos x)' = \\sin x + x \\cos x - \\sin x = x \\cos x\$ ✓.",
                ),
              ], finalAnswerFr: r"$x \sin x + \cos x + C$"),
            ),
            _q(
              2,
              "Calculer \$\\int \\ln x\\,dx\$ par IPP.",
              2,
              _sol([
                _step(
                  "Astuce : \$\\ln x = 1 \\cdot \\ln x\$. Poser \$u = \\ln x\$ (\$u' = 1/x\$) et \$v' = 1\$ (\$v = x\$).",
                ),
                _step(
                  "\$\\int \\ln x\\,dx = x \\ln x - \\int (1/x) \\cdot x\\,dx = x \\ln x - \\int 1\\,dx = x \\ln x - x + C\$.",
                  tipFr:
                      "**Astuce célèbre** : pour intégrer \$\\ln\$, l'écrire \$1 \\cdot \\ln\$ et faire une IPP.",
                ),
              ], finalAnswerFr: r"$x \ln x - x + C$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperIntegralCalc() => _paper(
      titleFr: 'Épreuve type — Calcul intégral',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Intégrale définie via Newton-Leibniz : \$\\int_a^b f = F(b) - F(a)\$. Propriétés : linéarité, Chasles, positivité. Aires et valeur moyenne.",
      exercices: [
        _ex(
          1,
          'Calculs directs',
          5,
          "Calculer les intégrales.",
          [
            _q(
              1,
              "\$\\int_0^2 (x^2 + 1)\\,dx\$.",
              2,
              _sol([
                _step(
                  "Primitive : \$F(x) = x^3/3 + x\$.",
                ),
                _step(
                  "\$\\int_0^2 = F(2) - F(0) = (8/3 + 2) - 0 = 8/3 + 6/3 = 14/3\$.",
                ),
              ], finalAnswerFr: r"$14/3$"),
            ),
            _q(
              2,
              "\$\\int_1^e \\dfrac{dx}{x}\$.",
              1,
              _sol([
                _step(
                  "Primitive : \$\\ln x\$. \$\\int = \\ln e - \\ln 1 = 1 - 0 = 1\$.",
                  tipFr:
                      "**Définition historique de \$e\$** : \$\\int_1^e dt/t = 1\$. \$e\$ est le réel dont le logarithme népérien vaut 1.",
                ),
              ], finalAnswerFr: r"$\int = 1$"),
            ),
            _q(
              3,
              "\$\\int_0^\\pi \\sin x\\,dx\$.",
              1,
              _sol([
                _step(
                  "Primitive : \$-\\cos x\$. \$\\int = -\\cos\\pi - (-\\cos 0) = 1 + 1 = 2\$.",
                ),
              ], finalAnswerFr: r"$\int = 2$"),
            ),
            _q(
              4,
              "\$\\int_0^1 e^x\\,dx\$.",
              1,
              _sol([
                _step(
                  "Primitive : \$e^x\$. \$\\int = e^1 - e^0 = e - 1 \\approx 1{,}718\$.",
                ),
              ], finalAnswerFr: r"$\int = e - 1$"),
            ),
          ],
        ),
        _ex(
          2,
          'Propriétés (Chasles, linéarité)',
          5,
          "Utiliser les propriétés.",
          [
            _q(
              1,
              "Sachant \$\\int_0^3 f = 7\$ et \$\\int_3^5 f = 2\$, calculer \$\\int_0^5 f\$.",
              1,
              _sol([
                _step(
                  "**Relation de Chasles** : \$\\int_a^c = \\int_a^b + \\int_b^c\$. Donc \$\\int_0^5 = 7 + 2 = 9\$.",
                ),
              ], finalAnswerFr: r"$\int = 9$"),
            ),
            _q(
              2,
              "Sachant \$\\int_0^1 f = 5\$ et \$\\int_0^1 g = 3\$, calculer \$\\int_0^1 (2f - 3g)\$.",
              2,
              _sol([
                _step(
                  "**Linéarité** : \$\\int (\\alpha f + \\beta g) = \\alpha \\int f + \\beta \\int g\$.",
                ),
                _step(
                  "\$\\int_0^1 (2f - 3g) = 2 \\cdot 5 - 3 \\cdot 3 = 10 - 9 = 1\$.",
                ),
              ], finalAnswerFr: r"$\int = 1$"),
            ),
            _q(
              3,
              "Si \$\\int_2^5 f = 4\$, calculer \$\\int_5^2 f\$.",
              1,
              _sol([
                _step(
                  "\$\\int_a^b = -\\int_b^a\$. Donc \$\\int_5^2 f = -4\$.",
                ),
              ], finalAnswerFr: r"$-4$"),
            ),
            _q(
              4,
              "Positivité : si \$f \\ge 0\$ et \$f\$ continue non identiquement nulle sur \$[a, b]\$, que dire de \$\\int_a^b f\$ ?",
              1,
              _sol([
                _step(
                  "\$\\int_a^b f > 0\$ strictement. La continuité + positivité non triviale garantit une aire strictement positive.",
                ),
              ], finalAnswerFr: r"$\int > 0$"),
            ),
          ],
        ),
        _ex(
          3,
          'Aire entre deux courbes',
          5,
          "Soient \$f(x) = x^2 + 1\$ et \$g(x) = x + 3\$.",
          [
            _q(
              1,
              "Trouver les points d'intersection.",
              2,
              _sol([
                _step(
                  "\$f(x) = g(x) \\iff x^2 + 1 = x + 3 \\iff x^2 - x - 2 = 0 \\iff (x - 2)(x + 1) = 0\$.",
                ),
                _step(
                  "Solutions : \$x = -1\$ et \$x = 2\$. Points : \$(-1, 2)\$ et \$(2, 5)\$.",
                ),
              ], finalAnswerFr: r"$x = -1$ et $x = 2$"),
            ),
            _q(
              2,
              "Calculer l'aire du domaine entre les deux courbes.",
              3,
              _sol([
                _step(
                  "Sur \$[-1, 2]\$, on compare : à \$x = 0\$, \$f(0) = 1\$ et \$g(0) = 3\$ → \$g \\ge f\$ sur l'intervalle.",
                ),
                _step(
                  "\$A = \\int_{-1}^{2} (g - f)\\,dx = \\int_{-1}^{2} (x + 3 - x^2 - 1)\\,dx = \\int_{-1}^{2} (-x^2 + x + 2)\\,dx\$.",
                ),
                _step(
                  "Primitive : \$-x^3/3 + x^2/2 + 2x\$. En 2 : \$-8/3 + 2 + 4 = -8/3 + 6 = 10/3\$. En -1 : \$1/3 + 1/2 - 2 = 2/6 + 3/6 - 12/6 = -7/6\$.",
                ),
                _step(
                  "Différence : \$10/3 - (-7/6) = 20/6 + 7/6 = 27/6 = 9/2\$.",
                  tipFr:
                      "**Aire entre deux courbes** : \$\\int_a^b |f - g|\\,dx\$. En pratique, identifier laquelle est au-dessus puis ne pas mettre la valeur absolue.",
                ),
              ], finalAnswerFr: r"$A = 9/2$"),
            ),
          ],
        ),
        _ex(
          4,
          'Valeur moyenne',
          5,
          "Valeur moyenne : \$\\bar f = \\dfrac{1}{b - a} \\int_a^b f\$.",
          [
            _q(
              1,
              "Calculer la valeur moyenne de \$f(x) = x^2\$ sur \$[0, 2]\$.",
              2,
              _sol([
                _step(
                  "\$\\int_0^2 x^2\\,dx = [x^3/3]_0^2 = 8/3\$.",
                ),
                _step(
                  "\$\\bar f = \\dfrac{1}{2 - 0} \\cdot \\dfrac{8}{3} = \\dfrac{4}{3}\$.",
                ),
                _step(
                  "**Interprétation** : si on remplaçait \$f\$ par sa moyenne constante \$4/3\$ sur \$[0, 2]\$, l'aire totale serait identique : \$(4/3) \\times 2 = 8/3\$ ✓.",
                ),
              ], finalAnswerFr: r"$\bar f = 4/3$"),
            ),
            _q(
              2,
              "Théorème de la moyenne : trouver \$c \\in [0, 2]\$ tel que \$f(c) = \\bar f\$.",
              2,
              _sol([
                _step(
                  "On cherche \$c^2 = 4/3\$, soit \$c = \\pm 2/\\sqrt 3\$. La valeur dans \$[0, 2]\$ : \$c = 2/\\sqrt 3 \\approx 1{,}155\$.",
                ),
                _step(
                  "**Théorème de la moyenne** : si \$f\$ est continue sur \$[a, b]\$, il existe \$c \\in [a, b]\$ tel que \$f(c) = \\bar f\$. Conséquence du TVI.",
                  tipFr:
                      "Ce théorème garantit l'existence du point — utile pour les démonstrations, même si on ne sait pas calculer \$c\$ explicitement.",
                ),
              ], finalAnswerFr: r"$c = 2/\sqrt 3$"),
            ),
            _q(
              3,
              "Application physique : un mobile a vitesse \$v(t) = 3 t^2\$ m/s sur \$[0, 4]\$ secondes. Distance parcourue ?",
              1,
              _sol([
                _step(
                  "Distance = \$\\int_0^4 v(t)\\,dt = \\int_0^4 3 t^2\\,dt = [t^3]_0^4 = 64\$ m.",
                ),
                _step(
                  "Vérification : vitesse moyenne = \$64/4 = 16\$ m/s. \$\\bar v = (1/4) \\int_0^4 3t^2 = 64/4 = 16\$ ✓.",
                ),
              ], finalAnswerFr: r"$d = 64$ m"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperComplexAlgebra() => _paper(
      titleFr: 'Épreuve type — Nombres complexes (forme algébrique)',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Forme algébrique \$z = a + bi\$ avec \$i^2 = -1\$. Module \$|z| = \\sqrt{a^2 + b^2}\$, conjugué \$\\bar z = a - bi\$, \$z \\bar z = |z|^2\$.",
      exercices: [
        _ex(
          1,
          'Opérations algébriques',
          5,
          "Soit \$z_1 = 2 + 3i\$ et \$z_2 = 1 - i\$.",
          [
            _q(
              1,
              "Calculer \$z_1 + z_2\$, \$z_1 \\cdot z_2\$, \$z_1/z_2\$.",
              4,
              _sol([
                _step(
                  "**Somme** : \$(2 + 1) + (3 - 1)i = 3 + 2i\$.",
                ),
                _step(
                  "**Produit** : \$(2 + 3i)(1 - i) = 2 - 2i + 3i - 3i^2 = 2 + i + 3 = 5 + i\$ (utiliser \$i^2 = -1\$).",
                ),
                _step(
                  "**Quotient** : multiplier numérateur et dénominateur par le conjugué \$\\bar z_2 = 1 + i\$.",
                ),
                _step(
                  "\$\\dfrac{2 + 3i}{1 - i} = \\dfrac{(2 + 3i)(1 + i)}{(1 - i)(1 + i)} = \\dfrac{2 + 2i + 3i + 3i^2}{1 + 1} = \\dfrac{-1 + 5i}{2} = -\\dfrac{1}{2} + \\dfrac{5}{2} i\$.",
                  tipFr:
                      "Pour diviser deux complexes, toujours multiplier par le conjugué du dénominateur — ça rationalise (résultat avec dénominateur réel).",
                ),
              ], finalAnswerFr: r"$3+2i$, $5+i$, $-1/2 + 5i/2$"),
            ),
            _q(
              2,
              "Calculer \$|z_1|\$ et \$|z_2|\$.",
              1,
              _sol([
                _step(
                  "\$|z_1| = \\sqrt{2^2 + 3^2} = \\sqrt{13}\$. \$|z_2| = \\sqrt{1 + 1} = \\sqrt 2\$.",
                ),
              ], finalAnswerFr: r"$\sqrt{13}$ et $\sqrt 2$"),
            ),
          ],
        ),
        _ex(
          2,
          'Conjugué',
          5,
          "Pour \$z = a + bi\$, le conjugué est \$\\bar z = a - bi\$.",
          [
            _q(
              1,
              "Démontrer \$z + \\bar z = 2 \\text{Re}(z)\$ et \$z - \\bar z = 2i \\text{Im}(z)\$.",
              2,
              _sol([
                _step(
                  "\$z + \\bar z = (a + bi) + (a - bi) = 2a = 2 \\text{Re}(z)\$.",
                ),
                _step(
                  "\$z - \\bar z = (a + bi) - (a - bi) = 2bi = 2i \\text{Im}(z)\$.",
                ),
                _step(
                  "**Conséquences** : \$z \\in \\mathbb{R} \\iff z = \\bar z\$ ; \$z\$ imaginaire pur \$\\iff z = -\\bar z\$.",
                ),
              ]),
            ),
            _q(
              2,
              "Montrer que \$z \\bar z = |z|^2\$.",
              1,
              _sol([
                _step(
                  "\$z \\bar z = (a + bi)(a - bi) = a^2 - (bi)^2 = a^2 + b^2 = |z|^2\$.",
                  tipFr:
                      "Cette identité fondamentale justifie la technique 'multiplier par le conjugué' pour rationaliser \$1/z\$.",
                ),
              ], finalAnswerFr: r"$z \bar z = |z|^2 \in \mathbb{R}^+$"),
            ),
            _q(
              3,
              "Calculer \$1/z\$ pour \$z = 3 - 4i\$.",
              2,
              _sol([
                _step(
                  "\$1/z = \\dfrac{\\bar z}{z \\bar z} = \\dfrac{3 + 4i}{|z|^2} = \\dfrac{3 + 4i}{9 + 16} = \\dfrac{3 + 4i}{25} = \\dfrac{3}{25} + \\dfrac{4}{25} i\$.",
                ),
                _step(
                  "Vérification : \$z \\cdot (1/z) = (3 - 4i)(3/25 + 4i/25) = (9 + 12i - 12i + 16)/25 = 25/25 = 1\$ ✓.",
                ),
              ], finalAnswerFr: r"$1/z = 3/25 + 4i/25$"),
            ),
          ],
        ),
        _ex(
          3,
          'Équation du second degré',
          5,
          "Résoudre \$(E) : z^2 + 4z + 13 = 0\$ dans \$\\mathbb{C}\$.",
          [
            _q(
              1,
              "Calculer le discriminant.",
              1,
              _sol([
                _step(
                  "\$\\Delta = b^2 - 4ac = 16 - 52 = -36\$. \$\\Delta < 0\$ → deux racines complexes conjuguées.",
                ),
              ], finalAnswerFr: r"$\Delta = -36$"),
            ),
            _q(
              2,
              "Résoudre.",
              3,
              _sol([
                _step(
                  "Pour \$\\Delta < 0\$ : racines \$z = \\dfrac{-b \\pm i\\sqrt{-\\Delta}}{2a}\$. Ici \$\\sqrt{-\\Delta} = \\sqrt{36} = 6\$.",
                ),
                _step(
                  "\$z = \\dfrac{-4 \\pm 6i}{2} = -2 \\pm 3i\$.",
                ),
                _step(
                  "\$S = \\{-2 + 3i,\\, -2 - 3i\\}\$ — racines conjuguées.",
                  tipFr:
                      "Pour un trinôme à coefficients **réels**, les racines complexes vont toujours par paire de conjugués.",
                ),
              ], finalAnswerFr: r"$S = \{-2 \pm 3i\}$"),
            ),
            _q(
              3,
              "Vérification par Viète.",
              1,
              _sol([
                _step(
                  "Somme \$z_1 + z_2 = (-2 + 3i) + (-2 - 3i) = -4 = -b/a\$ ✓. Produit \$z_1 z_2 = (-2)^2 - (3i)^2 = 4 + 9 = 13 = c/a\$ ✓.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          4,
          'Module et argument',
          5,
          "Soit \$z = -1 + i \\sqrt 3\$.",
          [
            _q(
              1,
              "Calculer \$|z|\$.",
              1,
              _sol([
                _step(
                  "\$|z| = \\sqrt{(-1)^2 + (\\sqrt 3)^2} = \\sqrt{1 + 3} = 2\$.",
                ),
              ], finalAnswerFr: r"$|z| = 2$"),
            ),
            _q(
              2,
              "Déterminer un argument \$\\theta\$ de \$z\$ (à \$2\\pi\$ près).",
              3,
              _sol([
                _step(
                  "\$\\cos\\theta = \\text{Re}(z)/|z| = -1/2\$. \$\\sin\\theta = \\text{Im}(z)/|z| = \\sqrt 3/2\$.",
                ),
                _step(
                  "Re < 0 et Im > 0 → \$z\$ dans le **2ème quadrant**. Les valeurs \$\\cos\\theta = -1/2\$ et \$\\sin\\theta = \\sqrt 3/2\$ correspondent à \$\\theta = 2\\pi/3\$.",
                ),
                _step(
                  "Donc \$\\arg z = 2\\pi/3\$ (à \$2\\pi\$ près).",
                  mistakeFr:
                      "Une seule équation (\$\\cos\\theta\$ ou \$\\sin\\theta\$) ne suffit pas — il faut les deux pour identifier le quadrant et donc l'angle sans ambiguïté.",
                ),
              ], finalAnswerFr: r"$\arg z = 2\pi/3$"),
            ),
            _q(
              3,
              "Représenter \$z\$ dans le plan complexe.",
              1,
              _sol([
                _step(
                  "Point d'affixe \$z\$ : coordonnées \$(-1, \\sqrt 3) \\approx (-1, 1{,}73)\$. Sur le cercle de rayon 2 centré en O, dans le 2ème quadrant.",
                ),
              ]),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperComplexTrig() => _paper(
      titleFr: 'Épreuve type — Forme trigonométrique et formule de Moivre',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Forme trigonométrique \$z = r(\\cos\\theta + i\\sin\\theta)\$, forme exponentielle \$z = r e^{i\\theta}\$, formule de Moivre \$(e^{i\\theta})^n = e^{in\\theta}\$, racines n-ièmes.",
      exercices: [
        _ex(
          1,
          'Passage à la forme exponentielle',
          5,
          "Mettre chaque complexe sous forme exponentielle.",
          [
            _q(
              1,
              "\$z = 1 + i\$.",
              2,
              _sol([
                _step(
                  "\$|z| = \\sqrt 2\$. \$\\cos\\theta = 1/\\sqrt 2\$, \$\\sin\\theta = 1/\\sqrt 2\$ → \$\\theta = \\pi/4\$.",
                ),
                _step(
                  "Forme exponentielle : \$z = \\sqrt 2\\, e^{i\\pi/4}\$.",
                ),
              ], finalAnswerFr: r"$z = \sqrt 2\, e^{i\pi/4}$"),
            ),
            _q(
              2,
              "\$z = -2\$.",
              1,
              _sol([
                _step(
                  "\$|z| = 2\$, \$\\arg z = \\pi\$ (axe réel négatif). Donc \$z = 2 e^{i\\pi}\$.",
                ),
                _step(
                  "**Identité d'Euler** : \$e^{i\\pi} = -1\$, soit \$e^{i\\pi} + 1 = 0\$ — souvent appelée la plus belle formule des mathématiques.",
                ),
              ], finalAnswerFr: r"$z = 2 e^{i\pi}$"),
            ),
            _q(
              3,
              "\$z = i\$.",
              1,
              _sol([
                _step(
                  "\$|z| = 1\$, \$\\arg z = \\pi/2\$ → \$z = e^{i\\pi/2}\$.",
                ),
                _step(
                  "Cohérent avec \$i^2 = e^{i\\pi} = -1\$ ✓.",
                ),
              ], finalAnswerFr: r"$z = e^{i\pi/2}$"),
            ),
            _q(
              4,
              "\$z = -\\sqrt 3 + i\$.",
              1,
              _sol([
                _step(
                  "\$|z| = \\sqrt{3 + 1} = 2\$. \$\\cos\\theta = -\\sqrt 3/2\$, \$\\sin\\theta = 1/2\$ → \$\\theta = 5\\pi/6\$.",
                ),
                _step(
                  "\$z = 2 e^{i 5\\pi/6}\$.",
                ),
              ], finalAnswerFr: r"$z = 2 e^{i 5\pi/6}$"),
            ),
          ],
        ),
        _ex(
          2,
          'Formule de Moivre',
          5,
          "Utiliser \$(e^{i\\theta})^n = e^{i n\\theta}\$.",
          [
            _q(
              1,
              "Calculer \$(1 + i)^{10}\$.",
              3,
              _sol([
                _step(
                  "\$1 + i = \\sqrt 2\\, e^{i\\pi/4}\$.",
                ),
                _step(
                  "\$(1 + i)^{10} = (\\sqrt 2)^{10} \\cdot e^{i \\cdot 10\\pi/4} = 2^5 \\cdot e^{i 5\\pi/2} = 32 \\cdot e^{i\\pi/2}\$ (car \$5\\pi/2 = 2\\pi + \\pi/2\$).",
                ),
                _step(
                  "\$e^{i\\pi/2} = i\$. Donc \$(1+i)^{10} = 32 i\$.",
                  tipFr:
                      "Pour des puissances élevées, la forme exponentielle est beaucoup plus rapide que le développement binomial.",
                ),
              ], finalAnswerFr: r"$(1+i)^{10} = 32i$"),
            ),
            _q(
              2,
              "Établir l'identité \$\\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta\$.",
              2,
              _sol([
                _step(
                  "\$e^{i 2\\theta} = (e^{i\\theta})^2 = (\\cos\\theta + i\\sin\\theta)^2 = \\cos^2\\theta + 2i\\sin\\theta\\cos\\theta + (i\\sin\\theta)^2\$.",
                ),
                _step(
                  "\$(i\\sin\\theta)^2 = -\\sin^2\\theta\$. Donc \$e^{i 2\\theta} = (\\cos^2\\theta - \\sin^2\\theta) + 2i\\sin\\theta\\cos\\theta\$.",
                ),
                _step(
                  "Identifier parties réelle et imaginaire : \$\\cos(2\\theta) = \\cos^2\\theta - \\sin^2\\theta\$ et \$\\sin(2\\theta) = 2\\sin\\theta\\cos\\theta\$.",
                  tipFr:
                      "Les identités trigonométriques classiques sont des conséquences directes de Moivre — pas besoin de les mémoriser séparément.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          3,
          'Racines n-ièmes',
          5,
          "Résoudre \$z^3 = 1\$ dans \$\\mathbb{C}\$.",
          [
            _q(
              1,
              "Trouver les 3 racines cubiques de l'unité.",
              4,
              _sol([
                _step(
                  "\$1 = e^{i \\cdot 0}\$. Cherchons \$z = r e^{i\\theta}\$ avec \$r^3 = 1\$ et \$3\\theta \\equiv 0 \\pmod{2\\pi}\$.",
                ),
                _step(
                  "\$r = 1\$ (réel positif), \$\\theta = 2k\\pi/3\$ pour \$k = 0, 1, 2\$.",
                ),
                _step(
                  "\$z_0 = e^{i \\cdot 0} = 1\$ ; \$z_1 = e^{i 2\\pi/3} = -1/2 + i\\sqrt 3/2\$ ; \$z_2 = e^{i 4\\pi/3} = -1/2 - i\\sqrt 3/2\$.",
                ),
                _step(
                  "**Géométriquement** : les 3 racines forment un **triangle équilatéral** inscrit dans le cercle unité, sommets espacés de \$2\\pi/3\$.",
                  tipFr:
                      "Les \$n\$ racines n-ièmes de l'unité forment un polygone régulier à \$n\$ sommets sur le cercle unité, espacés de \$2\\pi/n\$.",
                ),
              ], finalAnswerFr: r"$\{1,\, -1/2 \pm i\sqrt 3/2\}$"),
            ),
            _q(
              2,
              "Vérifier que la somme des 3 racines vaut 0.",
              1,
              _sol([
                _step(
                  "Somme : \$1 + (-1/2 + i\\sqrt 3/2) + (-1/2 - i\\sqrt 3/2) = 1 - 1 + 0 = 0\$ ✓.",
                ),
                _step(
                  "Cohérent avec Viète : pour \$z^3 - 1 = 0\$, somme des racines = \$-(\\text{coeff de }z^2)/(\\text{coeff dominant}) = -0/1 = 0\$.",
                ),
              ]),
            ),
          ],
        ),
        _ex(
          4,
          'Application — équation \$z^n = a\$',
          5,
          "Résoudre \$z^4 = -16\$.",
          [
            _q(
              1,
              "Mettre \$-16\$ sous forme exponentielle.",
              1,
              _sol([
                _step(
                  "\$-16 = 16 \\cdot (-1) = 16 e^{i\\pi}\$.",
                ),
              ], finalAnswerFr: r"$-16 = 16 e^{i\pi}$"),
            ),
            _q(
              2,
              "Trouver les 4 racines.",
              4,
              _sol([
                _step(
                  "\$z = r e^{i\\theta}\$ avec \$r^4 = 16\$ et \$4\\theta \\equiv \\pi \\pmod{2\\pi}\$.",
                ),
                _step(
                  "\$r = 2\$ (réelle positive). \$\\theta = \\pi/4 + k\\pi/2\$ pour \$k = 0, 1, 2, 3\$ : \$\\theta = \\pi/4, 3\\pi/4, 5\\pi/4, 7\\pi/4\$.",
                ),
                _step(
                  "Racines : \$z_k = 2 e^{i(\\pi/4 + k\\pi/2)}\$. En forme algébrique : \$z_0 = \\sqrt 2(1 + i)\$, \$z_1 = \\sqrt 2(-1 + i)\$, \$z_2 = \\sqrt 2(-1 - i)\$, \$z_3 = \\sqrt 2(1 - i)\$.",
                ),
                _step(
                  "Vérification : \$z_0^4 = (\\sqrt 2(1+i))^4 = (\\sqrt 2)^4 (1+i)^4 = 4 \\cdot (2i)^2 = 4 \\cdot (-4) = -16\$ ✓.",
                  tipFr:
                      "**Méthode générale** pour \$z^n = a\$ avec \$a = |a| e^{i\\alpha}\$ : \$n\$ racines \$z_k = |a|^{1/n} e^{i(\\alpha + 2k\\pi)/n}\$.",
                ),
              ], finalAnswerFr: r"$z_k = 2 e^{i(\pi/4 + k\pi/2)}$, $k=0..3$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperOdeFirstOrder() => _paper(
      titleFr: 'Épreuve type — Équations différentielles du 1er ordre',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "EDO \$y' = ay\$ → \$y = C e^{ax}\$. EDO \$y' = ay + b\$ → solution = homogène + particulière. Applications : refroidissement, charge RC, désintégration.",
      exercices: [
        _ex(
          1,
          'EDO homogène',
          5,
          "Soit \$(E) : y' = 3y\$.",
          [
            _q(
              1,
              "Donner la solution générale.",
              2,
              _sol([
                _step(
                  "**Théorème** : la solution générale de \$y' = ay\$ est \$y(x) = C e^{ax}\$, \$C \\in \\mathbb{R}\$.",
                ),
                _step(
                  "Ici \$a = 3\$ : \$y(x) = C e^{3x}\$.",
                ),
              ], finalAnswerFr: r"$y(x) = C e^{3x}$"),
            ),
            _q(
              2,
              "Solution vérifiant \$y(0) = 2\$.",
              2,
              _sol([
                _step(
                  "\$y(0) = C = 2\$. Donc \$y(x) = 2 e^{3x}\$.",
                ),
              ], finalAnswerFr: r"$y(x) = 2 e^{3x}$"),
            ),
            _q(
              3,
              "À quel instant \$y\$ atteint-elle 100 ?",
              1,
              _sol([
                _step(
                  "\$2 e^{3x} = 100 \\iff e^{3x} = 50 \\iff x = \\dfrac{\\ln 50}{3} \\approx 1{,}30\$.",
                ),
              ], finalAnswerFr: r"$x \approx 1{,}30$"),
            ),
          ],
        ),
        _ex(
          2,
          'EDO avec second membre constant',
          5,
          "Soit \$(E) : y' = -2y + 10\$.",
          [
            _q(
              1,
              "Trouver une solution particulière constante \$y_p\$.",
              1,
              _sol([
                _step(
                  "\$y_p\$ constante → \$y_p' = 0\$. \$0 = -2 y_p + 10 \\iff y_p = 5\$.",
                ),
              ], finalAnswerFr: r"$y_p = 5$"),
            ),
            _q(
              2,
              "Solution générale de l'équation homogène \$y' = -2y\$.",
              1,
              _sol([
                _step(
                  "\$y_h(x) = C e^{-2x}\$.",
                ),
              ], finalAnswerFr: r"$y_h = C e^{-2x}$"),
            ),
            _q(
              3,
              "Donner la solution générale de \$(E)\$, puis la solution avec \$y(0) = 8\$.",
              3,
              _sol([
                _step(
                  "**Principe de superposition** : \$y = y_h + y_p = C e^{-2x} + 5\$.",
                ),
                _step(
                  "\$y(0) = C + 5 = 8 \\iff C = 3\$. Donc \$y(x) = 3 e^{-2x} + 5\$.",
                ),
                _step(
                  "**Comportement asymptotique** : \$\\lim_{+\\infty} y = 5\$ — la solution tend vers l'équilibre \$y_p\$. Le terme transitoire \$3 e^{-2x}\$ s'atténue.",
                  tipFr:
                      "Pour une EDO linéaire à coeffs constants, la solution = transitoire (terme en \$e^{at}\$) + régime permanent (solution particulière).",
                ),
              ], finalAnswerFr: r"$y(x) = 3 e^{-2x} + 5$"),
            ),
          ],
        ),
        _ex(
          3,
          'Loi de Newton — refroidissement',
          5,
          "Un café à 80°C est posé dans une pièce à 20°C. La température \$T(t)\$ vérifie \$T'(t) = -k(T - 20)\$ avec \$k > 0\$.",
          [
            _q(
              1,
              "Résoudre l'EDO avec \$T(0) = 80\$.",
              3,
              _sol([
                _step(
                  "Poser \$\\theta = T - 20\$ (écart à l'ambiance). \$\\theta' = T' = -k(T - 20) = -k\\theta\$.",
                ),
                _step(
                  "Solution : \$\\theta(t) = C e^{-kt}\$. Condition initiale : \$\\theta(0) = T(0) - 20 = 60 = C\$.",
                ),
                _step(
                  "Retour à T : \$T(t) = 20 + 60 e^{-kt}\$.",
                ),
              ], finalAnswerFr: r"$T(t) = 20 + 60 e^{-kt}$"),
            ),
            _q(
              2,
              "Si \$T(5) = 50\$°C, déterminer \$k\$ et la 'demi-vie thermique'.",
              2,
              _sol([
                _step(
                  "\$T(5) = 50 \\iff 20 + 60 e^{-5k} = 50 \\iff e^{-5k} = 1/2 \\iff -5k = -\\ln 2 \\iff k = \\dfrac{\\ln 2}{5} \\approx 0{,}139\\,\\text{min}^{-1}\$.",
                ),
                _step(
                  "Demi-vie thermique : \$t_{1/2} = \\ln 2 / k = 5\$ minutes. L'écart à l'ambiance est divisé par 2 toutes les 5 min.",
                  tipFr:
                      "**Loi de Newton du refroidissement** : structure identique à la désintégration radioactive et à la décharge RC (toutes des cinétiques d'ordre 1).",
                ),
              ], finalAnswerFr: r"$k \approx 0{,}139$/min"),
            ),
          ],
        ),
        _ex(
          4,
          'Désintégration radioactive',
          5,
          "Le nombre de noyaux \$N(t)\$ d'un isotope vérifie \$N'(t) = -\\lambda N(t)\$. À \$t = 0\$, \$N_0 = 10^{12}\$ noyaux ; demi-vie 8 jours.",
          [
            _q(
              1,
              "Donner l'expression de \$N(t)\$.",
              2,
              _sol([
                _step(
                  "EDO de référence \$N' = -\\lambda N\$ → \$N(t) = N_0 e^{-\\lambda t} = 10^{12} e^{-\\lambda t}\$.",
                ),
                _step(
                  "Demi-vie \$t_{1/2}\$ : \$N(t_{1/2}) = N_0/2 \\iff e^{-\\lambda t_{1/2}} = 1/2 \\iff \\lambda = \\ln 2 / t_{1/2}\$.",
                ),
                _step(
                  "Avec \$t_{1/2} = 8\$ jours : \$\\lambda = \\ln 2 / 8 \\approx 0{,}0866\\,\\text{jour}^{-1}\$.",
                ),
              ], finalAnswerFr: r"$N(t) = 10^{12} e^{-\lambda t}$, $\lambda = \ln 2/8$"),
            ),
            _q(
              2,
              "Au bout de combien de temps reste-t-il 1% des noyaux initiaux ?",
              2,
              _sol([
                _step(
                  "\$N(t)/N_0 = 0{,}01 \\iff e^{-\\lambda t} = 0{,}01 \\iff t = -\\ln(0{,}01)/\\lambda = \\ln 100 / \\lambda\$.",
                ),
                _step(
                  "\$\\ln 100 \\approx 4{,}605\$. \$t \\approx 4{,}605 / 0{,}0866 \\approx 53\\,\\text{jours}\$, soit environ 6,6 demi-vies (\\(53/8\\)).",
                ),
                _step(
                  "**Vérification** : après \$n\$ demi-vies, il reste \$1/2^n\$ ; \$1/2^7 \\approx 0{,}008\$, ce qui est cohérent avec ≈ 1% à \$n \\approx 6{,}6\$.",
                  tipFr:
                      "**Règle de chiffre** : il reste 1% après ≈ 7 demi-vies (\$1/2^7 = 1/128 \\approx 0{,}8\\%\$). Utile pour estimer rapidement.",
                ),
              ], finalAnswerFr: r"$t \approx 53$ jours"),
            ),
            _q(
              3,
              "Calculer \$\\lim_{t \\to +\\infty} N(t)\$ et interpréter.",
              1,
              _sol([
                _step(
                  "\$\\lim_{+\\infty} e^{-\\lambda t} = 0\$ donc \$\\lim N(t) = 0\$. La désintégration est asymptotiquement complète mais ne touche jamais 0 mathématiquement.",
                ),
              ], finalAnswerFr: r"$\lim N = 0$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperProbBinomial() => _paper(
      titleFr: 'Épreuve type — Loi binomiale',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Schéma de Bernoulli (n essais identiques indépendants à 2 issues, succès \$p\$), loi binomiale \$\\mathcal B(n, p)\$. Espérance \$E = np\$, variance \$V = np(1-p)\$.",
      exercices: [
        _ex(
          1,
          'Schéma de Bernoulli',
          5,
          "Un examen comporte 20 QCM, chacune à 4 réponses dont 1 correcte. Un candidat répond au hasard. Soit X = nombre de bonnes réponses.",
          [
            _q(
              1,
              "Justifier que \$X \\sim \\mathcal B(n, p)\$ et préciser \$n, p\$.",
              2,
              _sol([
                _step(
                  "**Schéma de Bernoulli** : \$n\$ essais identiques, indépendants, à 2 issues 'succès/échec', succès de probabilité \$p\$ constante.",
                ),
                _step(
                  "Ici : \$n = 20\$ questions, indépendantes, succès = 'bonne réponse' avec \$p = 1/4\$. Donc \$X \\sim \\mathcal B(20, 1/4)\$.",
                ),
              ], finalAnswerFr: r"$X \sim \mathcal B(20, 1/4)$"),
            ),
            _q(
              2,
              "Calculer \$E(X)\$ et \$V(X)\$.",
              2,
              _sol([
                _step(
                  "**Formules binomiales** : \$E(X) = np\$, \$V(X) = np(1-p)\$.",
                ),
                _step(
                  "\$E(X) = 20 \\times 1/4 = 5\$. \$V(X) = 20 \\times 1/4 \\times 3/4 = 15/4 = 3{,}75\$. \$\\sigma = \\sqrt V \\approx 1{,}94\$.",
                ),
                _step(
                  "**Interprétation** : en répondant au hasard, on attend en moyenne 5/20 (= 25% = \$p\$). La plupart des candidats au hasard obtiennent entre \$E - 2\\sigma \\approx 1\$ et \$E + 2\\sigma \\approx 9\$ bonnes réponses.",
                ),
              ], finalAnswerFr: r"$E = 5$, $V = 3{,}75$"),
            ),
            _q(
              3,
              "Calculer \$P(X = 10)\$.",
              1,
              _sol([
                _step(
                  "**Formule** : \$P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}\$.",
                ),
                _step(
                  "\$P(X = 10) = \\binom{20}{10} (1/4)^{10} (3/4)^{10} \\approx 184756 \\times 9{,}54 \\cdot 10^{-7} \\times 0{,}0563 \\approx 0{,}0099 \\approx 1\\%\$.",
                ),
              ], finalAnswerFr: r"$P(X = 10) \approx 1\%$"),
            ),
          ],
        ),
        _ex(
          2,
          'Bernoulli somme = binomiale',
          5,
          "Soient \$X_1, \\ldots, X_n\$ des Bernoulli indépendantes de paramètre \$p\$.",
          [
            _q(
              1,
              "Que vaut \$S = X_1 + X_2 + \\dots + X_n\$ en termes de loi ?",
              3,
              _sol([
                _step(
                  "Chaque \$X_i\$ vaut 0 ou 1, avec \$P(X_i = 1) = p\$. La somme \$S\$ compte le nombre de '1' parmi les \$n\$ tirages.",
                ),
                _step(
                  "C'est **exactement la définition** d'une variable binomiale : \$S \\sim \\mathcal B(n, p)\$.",
                ),
                _step(
                  "**Conséquence immédiate** : \$E(S) = \\sum E(X_i) = n \\cdot p\$ (linéarité). \$V(S) = \\sum V(X_i) = n \\cdot p(1-p)\$ (indépendance).",
                  tipFr:
                      "La binomiale n'est rien d'autre qu'une somme de \$n\$ Bernoulli. Cette décomposition permet de retrouver les formules d'espérance/variance sans calcul direct.",
                ),
              ], finalAnswerFr: r"$S \sim \mathcal B(n, p)$"),
            ),
            _q(
              2,
              "Application : on tire 50 cartes **avec remise** dans un jeu de 52. Espérance du nombre d'as obtenus.",
              2,
              _sol([
                _step(
                  "Chaque tirage = Bernoulli avec \$p = 4/52 = 1/13\$ (4 as parmi 52 cartes).",
                ),
                _step(
                  "Nombre d'as = somme de 50 Bernoulli indépendantes → \$\\mathcal B(50, 1/13)\$. Espérance : \$E = np = 50/13 \\approx 3{,}85\$.",
                  mistakeFr:
                      "Sans remise, les tirages ne seraient plus indépendants (\$p\$ changerait à chaque tirage). La binomiale s'applique seulement avec remise.",
                ),
              ], finalAnswerFr: r"$E \approx 3{,}85$ as"),
            ),
          ],
        ),
        _ex(
          3,
          'Probabilités cumulées',
          5,
          "Dans une usine, 2% des pièces sont défectueuses. On contrôle un lot de 100 pièces. Soit \$D\$ le nombre de défectueuses.",
          [
            _q(
              1,
              "Justifier \$D \\sim \\mathcal B(100,\\, 0{,}02)\$ et calculer \$E(D)\$, \$\\sigma(D)\$.",
              2,
              _sol([
                _step(
                  "Modèle : chaque pièce est indépendamment défectueuse avec proba 0,02. Le contrôle = 100 tirages indépendants.",
                ),
                _step(
                  "\$E(D) = 100 \\times 0{,}02 = 2\$. \$V(D) = 100 \\times 0{,}02 \\times 0{,}98 = 1{,}96\$, \$\\sigma \\approx 1{,}40\$.",
                ),
              ], finalAnswerFr: r"$E = 2$, $\sigma \approx 1{,}40$"),
            ),
            _q(
              2,
              "Calculer \$P(D = 0)\$ — probabilité qu'aucune pièce ne soit défectueuse.",
              2,
              _sol([
                _step(
                  "\$P(D = 0) = \\binom{100}{0} \\cdot 0{,}02^0 \\cdot 0{,}98^{100} = 0{,}98^{100}\$.",
                ),
                _step(
                  "\$0{,}98^{100} = e^{100 \\ln 0{,}98} \\approx e^{100 \\times (-0{,}0202)} = e^{-2{,}02} \\approx 0{,}133\$.",
                ),
                _step(
                  "Donc \$P(D = 0) \\approx 13\\%\$. Plutôt faible — un lot 'parfait' est rare avec un taux de défaut de 2%.",
                ),
              ], finalAnswerFr: r"$P(D=0) \approx 0{,}133$"),
            ),
            _q(
              3,
              "Calculer \$P(D \\le 1)\$ — au plus 1 défectueuse.",
              1,
              _sol([
                _step(
                  "\$P(D \\le 1) = P(D = 0) + P(D = 1)\$. \$P(D = 1) = \\binom{100}{1} \\cdot 0{,}02 \\cdot 0{,}98^{99} = 100 \\times 0{,}02 \\times 0{,}98^{99}\$.",
                ),
                _step(
                  "\$0{,}98^{99} \\approx 0{,}136\$. Donc \$P(D = 1) \\approx 2 \\times 0{,}136 = 0{,}271\$. Total : \$P(D \\le 1) \\approx 0{,}133 + 0{,}271 = 0{,}404\$.",
                ),
              ], finalAnswerFr: r"$P(D \le 1) \approx 0{,}40$"),
            ),
          ],
        ),
        _ex(
          4,
          'Espérance de jeu',
          5,
          "Un jeu : on gagne 10 DH avec proba 0,1 ; 2 DH avec proba 0,4 ; on perd 3 DH avec proba 0,5.",
          [
            _q(
              1,
              "Calculer l'espérance de gain par partie.",
              3,
              _sol([
                _step(
                  "Soit \$G\$ le gain (positif ou négatif). \$E(G) = \\sum g \\cdot P(G = g)\$.",
                ),
                _step(
                  "\$E(G) = 10 \\times 0{,}1 + 2 \\times 0{,}4 + (-3) \\times 0{,}5 = 1 + 0{,}8 - 1{,}5 = 0{,}3\\,\\text{DH}\$.",
                ),
                _step(
                  "Jeu **favorable** (espérance > 0). Sur le long terme, on gagne en moyenne 0,30 DH par partie.",
                ),
              ], finalAnswerFr: r"$E(G) = 0{,}30$ DH"),
            ),
            _q(
              2,
              "Quel doit être le coût d'entrée \$c\$ pour un jeu équitable ?",
              2,
              _sol([
                _step(
                  "**Jeu équitable** : espérance du gain net \$G - c\$ nulle, soit \$E(G) - c = 0 \\iff c = E(G) = 0{,}30\$ DH.",
                ),
                _step(
                  "En pratique, un casino fixerait \$c > 0{,}30\$ pour avoir une espérance favorable à la maison — c'est leur marge.",
                  tipFr:
                      "Loi des grands nombres : sur un grand nombre de parties, la moyenne empirique converge vers \$E(G)\$ — d'où l'importance de cette grandeur pour évaluer un jeu.",
                ),
              ], finalAnswerFr: r"$c = 0{,}30$ DH"),
            ),
          ],
        ),
      ],
    );

// ============================================================================
// Registry & main
// ============================================================================

final Map<String, Map<String, dynamic>> _papers = {
  // Math — Batch 1: sequences
  'pc_arithmetic_geom_seq': _paperArithmeticGeomSeq(),
  'pc_seq_convergence': _paperSeqConvergence(),
  'pc_seq_recursive': _paperSeqRecursive(),
  // Math — Batch 2: limits, continuity, derivation
  'pc_limit_calc': _paperLimitCalc(),
  'pc_continuity_tvi': _paperContinuityTvi(),
  'pc_deriv_rules': _paperDerivRules(),
  'pc_deriv_apps': _paperDerivApps(),
  // Math — Batch 3: ln/exp, primitives, integrals
  'pc_ln_function': _paperLnFunction(),
  'pc_exp_function': _paperExpFunction(),
  'pc_primitives': _paperPrimitives(),
  'pc_integral_calc': _paperIntegralCalc(),
  // Math — Batch 4: complex algebra, complex trig, ODE, binomial
  'pc_complex_algebra': _paperComplexAlgebra(),
  'pc_complex_trig': _paperComplexTrig(),
  'pc_ode_first_order': _paperOdeFirstOrder(),
  'pc_prob_binomial': _paperProbBinomial(),
  // Math COMPLETE (15/15). Physique-Chimie — Batches 5-10: to come
};

String _sqlEscape(String s) => s.replaceAll("'", "''");

void main() {
  final buf = StringBuffer();
  buf.writeln(
      '-- Migration 034: topic-coherent exam papers for PC chapters (Phase 3.4).');
  buf.writeln('-- Auto-generated by json_encode_exam_papers_pc.dart.');
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

  File('backend/supabase/migrations/034_exam_papers_pc.sql')
      .writeAsStringSync(buf.toString());
  stdout.writeln(
      'Wrote backend/supabase/migrations/034_exam_papers_pc.sql (${_papers.length} papers).');
}
