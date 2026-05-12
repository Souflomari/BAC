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
  // Math — Batch 3-4: to come
  // Physique-Chimie — Batches 5-10: to come
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
