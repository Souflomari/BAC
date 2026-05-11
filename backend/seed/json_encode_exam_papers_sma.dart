// Phase 1 encoder: topic-coherent Bac exam papers for the 32 SMA chapters.
//
// Each chapter (skill code) gets ONE full Bac-style paper:
//   - 4-5 exercices (numbered)
//   - Each exercice has a preamble (énoncé) + numbered questions
//   - Each question optionally has lettered subparts (a, b, c)
//   - Every question/subpart has a fully-worked multi-step solution
//
// The paper is TOPIC-COHERENT — all exercices revolve around the chapter's
// topic, but explore different angles (forme indéterminée, comparaison,
// limite à l'infini, applications). Mirrors real Bac structure but stays
// pedagogically focused on the one chapter.
//
// Output: backend/supabase/migrations/030_exam_papers_sma.sql
//
// Authoring conventions (per the run rubric):
//   * Energy in the énoncé: concrete scenario, named functions, explicit
//     domains. NOT generic "soit f une fonction".
//   * Solution steps: 300-500 chars each, name the technique → state what
//     blocks naïve substitution → justify the choice → walk the calc →
//     conclude. Same depth as the 023/024 expansion run.
//   * Sub-parts naturally chained: (a) introduces, (b) builds on (a), etc.
//   * Each paper: ~20 points total over 4-5 exercices, ~90 minutes.

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

Map<String, dynamic> _q(
  int number,
  String stemFr,
  int points,
  Map<String, dynamic> solution,
) =>
    {
      'number': number,
      'stem_fr': stemFr,
      'points': points,
      'solution': solution,
    };

Map<String, dynamic> _qSubs(
  int number,
  String stemFr,
  int points,
  List<Map<String, dynamic>> subparts,
) =>
    {
      'number': number,
      'stem_fr': stemFr,
      'points': points,
      'subparts': subparts,
    };

Map<String, dynamic> _sub(
  String letter,
  String stemFr,
  int points,
  Map<String, dynamic> solution,
) =>
    {
      'letter': letter,
      'stem_fr': stemFr,
      'points': points,
      'solution': solution,
    };

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
// Papers (one function per SMA chapter, called from main)
// ============================================================================

Map<String, dynamic> _paperLimitDef() => _paper(
      titleFr: 'Épreuve type — Limites et continuité',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Cette épreuve mobilise les techniques essentielles du chapitre **Limites et continuité** : substitution directe, levée des formes indéterminées \$\\frac{0}{0}\$ et \$\\frac{\\infty}{\\infty}\$, théorème des gendarmes, théorème des valeurs intermédiaires. Pense à toujours **tenter la substitution directe avant** toute manipulation.",
      exercices: [
        _ex(
          1,
          'Calcul de limites — formes indéterminées',
          5,
          "On considère la fonction \$f\$ définie sur \$\\mathbb{R} \\setminus \\{2\\}\$ par \$f(x) = \\dfrac{x^2 - 4}{x - 2}\$ et la fonction \$g\$ définie sur \$\\mathbb{R} \\setminus \\{1\\}\$ par \$g(x) = \\dfrac{x^3 - 1}{x - 1}\$.",
          [
            _q(
              1,
              "Calculer \$\\displaystyle\\lim_{x \\to 2} f(x)\$.",
              2,
              _sol([
                _step(
                  "On tente la substitution directe en \$x = 2\$ : le numérateur vaut \$4 - 4 = 0\$, le dénominateur vaut \$2 - 2 = 0\$. On obtient la forme indéterminée \$\\frac{0}{0}\$, signal classique qu'une factorisation cachée existe : numérateur et dénominateur ont une racine commune en \$x = 2\$.",
                ),
                _step(
                  "On factorise le numérateur via l'identité remarquable \$a^2 - b^2 = (a-b)(a+b)\$ avec \$a = x, b = 2\$ : \$x^2 - 4 = (x-2)(x+2)\$. La fraction devient \$f(x) = \\dfrac{(x-2)(x+2)}{x-2}\$.",
                  latex: r"x^2 - 4 = (x-2)(x+2)",
                ),
                _step(
                  "Le facteur \$(x-2)\$ se simplifie au numérateur et au dénominateur — opération légitime car on étudie la limite **quand** \$x \\to 2\$, donc \$x \\ne 2\$ et \$x - 2 \\ne 0\$. Il reste \$f(x) = x + 2\$ pour tout \$x \\ne 2\$, fonction polynômiale continue en 2.",
                  tipFr:
                      "Lever un \$\\frac{0}{0}\$ revient toujours à factoriser le facteur qui fait s'annuler simultanément haut et bas.",
                ),
                _step(
                  "Par continuité de la fonction simplifiée en \$x = 2\$, on obtient \$\\lim_{x \\to 2} f(x) = 2 + 2 = 4\$.",
                ),
              ], finalAnswerFr: r"$\lim_{x \to 2} f(x) = 4$"),
            ),
            _qSubs(
              2,
              "Étudier \$\\displaystyle\\lim_{x \\to 1} g(x)\$ par deux méthodes.",
              3,
              [
                _sub(
                  'a',
                  "Calculer la limite en factorisant \$x^3 - 1\$.",
                  1,
                  _sol([
                    _step(
                      "On utilise l'identité \$a^3 - b^3 = (a-b)(a^2 + ab + b^2)\$ avec \$a = x, b = 1\$ : \$x^3 - 1 = (x-1)(x^2 + x + 1)\$. Donc \$g(x) = \\dfrac{(x-1)(x^2+x+1)}{x-1} = x^2 + x + 1\$ pour \$x \\ne 1\$.",
                      latex: r"x^3 - 1 = (x-1)(x^2+x+1)",
                    ),
                    _step(
                      "Par continuité du polynôme \$x^2 + x + 1\$ en \$x = 1\$, on obtient \$\\lim_{x \\to 1} g(x) = 1 + 1 + 1 = 3\$.",
                    ),
                  ], finalAnswerFr: r"$\lim_{x \to 1} g(x) = 3$"),
                ),
                _sub(
                  'b',
                  "Retrouver le même résultat en reconnaissant un taux d'accroissement.",
                  2,
                  _sol([
                    _step(
                      "On reconnaît la forme \$\\dfrac{x^3 - 1^3}{x - 1} = \\dfrac{h(x) - h(1)}{x - 1}\$ avec \$h(x) = x^3\$. Cette expression est exactement le **taux d'accroissement** de \$h\$ entre \$1\$ et \$x\$.",
                    ),
                    _step(
                      "Par définition de la dérivée : \$\\lim_{x \\to 1} \\dfrac{h(x) - h(1)}{x - 1} = h'(1)\$. Or \$h'(x) = 3x^2\$, donc \$h'(1) = 3\$.",
                      tipFr:
                          "Reconnaître un taux d'accroissement permet de calculer une limite \$\\frac{0}{0}\$ sans factoriser explicitement.",
                    ),
                    _step(
                      "On retrouve \$\\lim_{x \\to 1} g(x) = 3\$, en cohérence avec la méthode (a).",
                    ),
                  ], finalAnswerFr: r"$\lim_{x \to 1} g(x) = h'(1) = 3$"),
                ),
              ],
            ),
          ],
        ),
        _ex(
          2,
          'Limites à l\'infini — comparaison des degrés',
          5,
          "On considère la fonction rationnelle \$h\$ définie sur \$\\mathbb{R} \\setminus \\{-5\\}\$ par \$h(x) = \\dfrac{3x^2 + 2x - 1}{x + 5}\$. On cherche à comprendre son comportement asymptotique.",
          [
            _qSubs(
              1,
              "Limites à l'infini.",
              3,
              [
                _sub(
                  'a',
                  "Calculer \$\\displaystyle\\lim_{x \\to +\\infty} h(x)\$.",
                  1,
                  _sol([
                    _step(
                      "Quand \$x \\to +\\infty\$, numérateur et dénominateur tendent tous deux vers \$+\\infty\$ : forme indéterminée \$\\frac{\\infty}{\\infty}\$.",
                    ),
                    _step(
                      "**Méthode standard** : factoriser \$x\$ à la plus haute puissance haut et bas. Au numérateur, on factorise \$x^2\$ ; au dénominateur, \$x\$. \$h(x) = \\dfrac{x^2(3 + 2/x - 1/x^2)}{x(1 + 5/x)} = x \\cdot \\dfrac{3 + 2/x - 1/x^2}{1 + 5/x}\$.",
                    ),
                    _step(
                      "Quand \$x \\to +\\infty\$, les termes en \$1/x\$ et \$1/x^2\$ tendent vers 0. Le quotient \$\\dfrac{3 + 0 - 0}{1 + 0} = 3\$. Multiplié par \$x \\to +\\infty\$, on obtient \$h(x) \\to +\\infty\$.",
                      tipFr:
                          "Quand le degré du numérateur dépasse celui du dénominateur, la limite est \$\\pm\\infty\$ selon le signe.",
                    ),
                  ], finalAnswerFr: r"$\lim_{x \to +\infty} h(x) = +\infty$"),
                ),
                _sub(
                  'b',
                  "En déduire \$\\displaystyle\\lim_{x \\to -\\infty} h(x)\$.",
                  2,
                  _sol([
                    _step(
                      "Même factorisation : \$h(x) = x \\cdot \\dfrac{3 + 2/x - 1/x^2}{1 + 5/x}\$.",
                    ),
                    _step(
                      "Quand \$x \\to -\\infty\$, le quotient des termes en \$1/x\$ tend toujours vers \$3/1 = 3 > 0\$ (le quotient ne dépend que des termes dominants, qui dominent à \$\\pm\\infty\$).",
                    ),
                    _step(
                      "Le facteur \$x \\to -\\infty\$ multiplié par un nombre positif donne \$-\\infty\$. Donc \$\\lim_{x \\to -\\infty} h(x) = -\\infty\$.",
                      mistakeFr:
                          "Ne pas oublier que pour un polynôme de degré 2 dominant, **le signe à \$-\\infty\$ dépend du coefficient dominant** : ici 3 > 0, donc \$+\\infty\$ — sauf qu'on a divisé par \$x+5\$, qui change le signe global à \$-\\infty\$ comparé à \$+\\infty\$.",
                    ),
                  ], finalAnswerFr: r"$\lim_{x \to -\infty} h(x) = -\infty$"),
                ),
              ],
            ),
            _qSubs(
              2,
              "Limite en \$x = -5\$ (point exclu du domaine).",
              2,
              [
                _sub(
                  'a',
                  "Calculer \$\\displaystyle\\lim_{x \\to -5^+} h(x)\$.",
                  1,
                  _sol([
                    _step(
                      "En \$x = -5\$, le numérateur vaut \$3(25) + 2(-5) - 1 = 75 - 10 - 1 = 64 \\ne 0\$. Le dénominateur s'annule. Forme \$\\frac{64}{0}\$ — pas une forme indéterminée, c'est une **limite infinie**.",
                    ),
                    _step(
                      "Étudions le signe de \$x + 5\$ près de \$-5\$ : pour \$x > -5\$ (limite à droite), \$x + 5 > 0\$.",
                    ),
                    _step(
                      "Le rapport \$\\frac{64}{0^+}\$ tend vers \$+\\infty\$. Donc \$\\lim_{x \\to -5^+} h(x) = +\\infty\$.",
                    ),
                  ], finalAnswerFr: r"$\lim_{x \to -5^+} h(x) = +\infty$"),
                ),
                _sub(
                  'b',
                  "En déduire \$\\displaystyle\\lim_{x \\to -5^-} h(x)\$.",
                  1,
                  _sol([
                    _step(
                      "Pour \$x < -5\$ (limite à gauche), \$x + 5 < 0\$, donc le dénominateur tend vers \$0^-\$.",
                    ),
                    _step(
                      "Le numérateur reste près de 64 (positif). Le rapport \$\\frac{64}{0^-}\$ tend vers \$-\\infty\$.",
                      tipFr:
                          "Une asymptote verticale en \$x = a\$ donne typiquement deux limites latérales infinies de signes opposés.",
                    ),
                  ], finalAnswerFr: r"$\lim_{x \to -5^-} h(x) = -\infty$"),
                ),
              ],
            ),
          ],
        ),
        _ex(
          3,
          'Théorème des gendarmes',
          5,
          "Soit \$u\$ la fonction définie sur \$\\mathbb{R}^*\$ par \$u(x) = x \\sin\\left(\\dfrac{1}{x}\\right)\$.",
          [
            _q(
              1,
              "Justifier que pour tout \$x \\ne 0\$, on a \$-|x| \\le u(x) \\le |x|\$.",
              2,
              _sol([
                _step(
                  "Pour tout réel \$y\$, on sait que \$-1 \\le \\sin(y) \\le 1\$. Appliqué à \$y = 1/x\$ : \$-1 \\le \\sin(1/x) \\le 1\$.",
                ),
                _step(
                  "On multiplie cet encadrement par \$x\$, mais **attention au sens des inégalités** : si \$x > 0\$, on garde le sens ; si \$x < 0\$, on inverse. Pour traiter les deux cas en même temps, on multiplie par \$|x|\$ et on utilise \$|x \\sin(1/x)| \\le |x|\$.",
                  tipFr:
                      "Quand on encadre \$x \\cdot f(x)\$ avec \$f\$ bornée, on passe par les valeurs absolues pour éviter le piège du signe.",
                ),
                _step(
                  "On en déduit \$|u(x)| \\le |x|\$, équivalent à \$-|x| \\le u(x) \\le |x|\$ pour tout \$x \\ne 0\$.",
                ),
              ], finalAnswerFr: r"$-|x| \le u(x) \le |x|$"),
            ),
            _q(
              2,
              "En déduire \$\\displaystyle\\lim_{x \\to 0} u(x)\$.",
              3,
              _sol([
                _step(
                  "Quand \$x \\to 0\$, \$|x| \\to 0\$ également. Donc les deux 'gendarmes' \$-|x|\$ et \$|x|\$ tendent tous deux vers 0.",
                ),
                _step(
                  "**Théorème des gendarmes (ou d'encadrement)** : si pour tout \$x\$ proche de \$a\$, \$\\varphi(x) \\le u(x) \\le \\psi(x)\$ avec \$\\lim_{x \\to a} \\varphi = \\lim_{x \\to a} \\psi = L\$, alors \$\\lim_{x \\to a} u = L\$.",
                ),
                _step(
                  "Application : encadrée entre deux fonctions tendant vers 0, la fonction \$u\$ admet aussi 0 pour limite. \$\\lim_{x \\to 0} x \\sin(1/x) = 0\$.",
                  mistakeFr:
                      "On ne peut **pas** dire que \$\\lim_{x\\to 0} \\sin(1/x)\$ existe (elle n'existe pas — oscillations infinies). Le théorème des gendarmes permet justement de conclure pour le produit même quand un des facteurs n'a pas de limite.",
                ),
              ], finalAnswerFr: r"$\lim_{x \to 0} x \sin(1/x) = 0$"),
            ),
          ],
        ),
        _ex(
          4,
          'Théorème des valeurs intermédiaires',
          5,
          "On considère la fonction \$p\$ définie sur \$\\mathbb{R}\$ par \$p(x) = x^3 + x - 1\$.",
          [
            _q(
              1,
              "Montrer que \$p\$ est continue sur \$\\mathbb{R}\$ et calculer \$p(0)\$ et \$p(1)\$.",
              2,
              _sol([
                _step(
                  "\$p\$ est une fonction polynômiale, donc **continue sur \$\\mathbb{R}\$** par les théorèmes généraux (somme de monômes, eux-mêmes continus partout).",
                ),
                _step(
                  "Calcul : \$p(0) = 0 + 0 - 1 = -1\$. \$p(1) = 1 + 1 - 1 = 1\$.",
                ),
                _step(
                  "On observe que \$p(0) = -1 < 0\$ et \$p(1) = 1 > 0\$. Le signe de \$p\$ change donc entre 0 et 1 — ce qui prépare une application du TVI.",
                ),
              ], finalAnswerFr: r"$p(0) = -1$, $p(1) = 1$"),
            ),
            _q(
              2,
              "Démontrer que l'équation \$p(x) = 0\$ admet au moins une solution dans \$]0, 1[\$.",
              3,
              _sol([
                _step(
                  "**Théorème des valeurs intermédiaires (TVI)** : si \$f\$ est continue sur un intervalle \$[a, b]\$ et si \$k\$ est compris entre \$f(a)\$ et \$f(b)\$, alors il existe \$c \\in [a, b]\$ tel que \$f(c) = k\$.",
                ),
                _step(
                  "Application à \$p\$ sur \$[0, 1]\$ : \$p\$ est continue (Q1), \$p(0) = -1\$, \$p(1) = 1\$. La valeur 0 est comprise entre \$-1\$ et 1.",
                ),
                _step(
                  "Par le TVI, il existe \$c \\in ]0, 1[\$ (intervalle ouvert car \$p(0) \\ne 0\$ et \$p(1) \\ne 0\$) tel que \$p(c) = 0\$.",
                  tipFr:
                      "Le TVI prouve l'**existence** sans donner la valeur. Numériquement, \$c \\approx 0,6823\$ ici.",
                ),
                _step(
                  "**Unicité** (bonus) : \$p'(x) = 3x^2 + 1 > 0\$ pour tout \$x\$, donc \$p\$ est strictement croissante. La solution est donc **unique** dans \$\\mathbb{R}\$.",
                ),
              ], finalAnswerFr: r"$\exists ! c \in ]0, 1[ : p(c) = 0$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperDerivDefinition() => _paper(
      titleFr: 'Épreuve type — Dérivabilité',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Cette épreuve mobilise la **définition** de la dérivée (taux d'accroissement), les **règles** de dérivation (somme, produit, quotient, chaîne), et leur **application** à l'étude des variations + tangentes.",
      exercices: [
        _ex(
          1,
          'Définition par taux d\'accroissement',
          5,
          "Soit la fonction \$f\$ définie sur \$\\mathbb{R}\$ par \$f(x) = x^2 + 3x\$.",
          [
            _q(
              1,
              "Calculer le taux d'accroissement de \$f\$ entre \$1\$ et \$1 + h\$ (avec \$h \\ne 0\$).",
              2,
              _sol([
                _step(
                  "Par définition, le taux d'accroissement entre \$a\$ et \$a + h\$ est \$\\tau_h = \\dfrac{f(a+h) - f(a)}{h}\$.",
                ),
                _step(
                  "Ici \$a = 1\$. On calcule \$f(1+h) = (1+h)^2 + 3(1+h) = 1 + 2h + h^2 + 3 + 3h = h^2 + 5h + 4\$. Et \$f(1) = 1 + 3 = 4\$.",
                ),
                _step(
                  "Différence : \$f(1+h) - f(1) = h^2 + 5h + 4 - 4 = h^2 + 5h = h(h + 5)\$.",
                ),
                _step(
                  "Taux d'accroissement : \$\\tau_h = \\dfrac{h(h+5)}{h} = h + 5\$ (pour \$h \\ne 0\$).",
                  tipFr:
                      "Le facteur \$h\$ doit toujours se simplifier pour pouvoir passer à la limite — sinon on obtient \$\\frac{0}{0}\$.",
                ),
              ], finalAnswerFr: r"$\tau_h = h + 5$"),
            ),
            _q(
              2,
              "En déduire \$f'(1)\$ en utilisant la définition.",
              2,
              _sol([
                _step(
                  "**Définition** : \$f'(a) = \\lim_{h \\to 0} \\dfrac{f(a+h) - f(a)}{h}\$.",
                ),
                _step(
                  "Appliquée à \$a = 1\$ : \$f'(1) = \\lim_{h \\to 0}(h + 5)\$. La fonction \$h \\mapsto h + 5\$ est continue en 0.",
                ),
                _step(
                  "Donc \$f'(1) = 0 + 5 = 5\$. Géométriquement, la tangente à la parabole en \$(1, 4)\$ a une pente de 5.",
                ),
              ], finalAnswerFr: r"$f'(1) = 5$"),
            ),
            _q(
              3,
              "Vérifier ce résultat en utilisant les règles usuelles de dérivation.",
              1,
              _sol([
                _step(
                  "Par linéarité et la règle des puissances : \$f'(x) = (x^2)' + (3x)' = 2x + 3\$.",
                ),
                _step(
                  "En \$x = 1\$ : \$f'(1) = 2 + 3 = 5\$. Cohérent avec le calcul direct.",
                  tipFr:
                      "Les règles usuelles sont des raccourcis ; la définition par taux d'accroissement reste valable et utile dans les cas non standards.",
                ),
              ], finalAnswerFr: r"$f'(1) = 5$"),
            ),
          ],
        ),
        _ex(
          2,
          'Règles de dérivation — produit, quotient, chaîne',
          6,
          "On considère trois fonctions : \$g(x) = x \\sin(x)\$, \$h(x) = \\dfrac{x^2 + 1}{x - 2}\$ et \$k(x) = (2x + 1)^3\$.",
          [
            _q(
              1,
              "Calculer \$g'(x)\$.",
              2,
              _sol([
                _step(
                  "**Règle du produit** : \$(uv)' = u'v + uv'\$. Avec \$u(x) = x\$ et \$v(x) = \\sin(x)\$ : \$u'(x) = 1\$, \$v'(x) = \\cos(x)\$.",
                ),
                _step(
                  "Application : \$g'(x) = 1 \\cdot \\sin(x) + x \\cdot \\cos(x) = \\sin(x) + x\\cos(x)\$.",
                  mistakeFr:
                      "Erreur classique : écrire \$g'(x) = \\cos(x)\$ en dérivant terme à terme — **faux** : le produit n'est pas la composition.",
                ),
              ], finalAnswerFr: r"$g'(x) = \sin(x) + x\cos(x)$"),
            ),
            _q(
              2,
              "Calculer \$h'(x)\$ pour \$x \\ne 2\$.",
              2,
              _sol([
                _step(
                  "**Règle du quotient** : \$\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}\$. Avec \$u = x^2 + 1\$ (donc \$u' = 2x\$) et \$v = x - 2\$ (donc \$v' = 1\$).",
                ),
                _step(
                  "Numérateur : \$u'v - uv' = 2x(x-2) - (x^2+1) \\cdot 1 = 2x^2 - 4x - x^2 - 1 = x^2 - 4x - 1\$.",
                ),
                _step(
                  "Dénominateur : \$v^2 = (x-2)^2\$. Donc \$h'(x) = \\dfrac{x^2 - 4x - 1}{(x-2)^2}\$.",
                  tipFr:
                      "L'ordre dans le numérateur compte : c'est toujours \$u'v - uv'\$, pas \$uv' - u'v\$ — inverser donne le mauvais signe.",
                ),
              ],
                  finalAnswerFr:
                      r"$h'(x) = \dfrac{x^2 - 4x - 1}{(x-2)^2}$"),
            ),
            _q(
              3,
              "Calculer \$k'(x)\$.",
              2,
              _sol([
                _step(
                  "**Règle de la chaîne** (composition) : \$(f \\circ g)' = (f' \\circ g) \\cdot g'\$. Ici \$k(x) = u(x)^3\$ avec \$u(x) = 2x + 1\$.",
                ),
                _step(
                  "On dérive l'extérieur : \$(t^3)' = 3t^2\$, donc la dérivée de l'extérieur évaluée en \$u(x)\$ est \$3 u(x)^2 = 3(2x+1)^2\$.",
                ),
                _step(
                  "On multiplie par la dérivée de l'intérieur : \$u'(x) = 2\$. Donc \$k'(x) = 3(2x+1)^2 \\cdot 2 = 6(2x+1)^2\$.",
                  mistakeFr:
                      "Erreur classique : oublier le \$\\times 2\$ (la dérivée de l'argument intérieur) et écrire \$k'(x) = 3(2x+1)^2\$ — **faux**.",
                ),
              ], finalAnswerFr: r"$k'(x) = 6(2x+1)^2$"),
            ),
          ],
        ),
        _ex(
          3,
          'Étude des variations — application',
          5,
          "Soit la fonction \$f\$ définie sur \$\\mathbb{R}\$ par \$f(x) = x^3 - 3x^2 + 2\$.",
          [
            _qSubs(
              1,
              "Étude de \$f\$.",
              4,
              [
                _sub(
                  'a',
                  "Calculer \$f'(x)\$ et résoudre \$f'(x) = 0\$.",
                  2,
                  _sol([
                    _step(
                      "\$f'(x) = 3x^2 - 6x = 3x(x - 2)\$. C'est un polynôme de degré 2.",
                    ),
                    _step(
                      "\$f'(x) = 0 \\iff 3x(x-2) = 0 \\iff x = 0 \\text{ ou } x = 2\$. Les **points critiques** sont 0 et 2.",
                    ),
                  ],
                      finalAnswerFr:
                          r"$f'(x) = 3x(x-2)$, racines : $x = 0$ et $x = 2$"),
                ),
                _sub(
                  'b',
                  "Établir le tableau de variations de \$f\$.",
                  2,
                  _sol([
                    _step(
                      "Le signe de \$f'(x) = 3x(x-2)\$ : le coefficient dominant est positif. \$f'\$ est positive en dehors des racines (entre lesquelles elle est négative).",
                    ),
                    _step(
                      "Sur \$]-\\infty, 0[\$ : \$f' > 0\$ → \$f\$ **croissante**. Sur \$]0, 2[\$ : \$f' < 0\$ → \$f\$ **décroissante**. Sur \$]2, +\\infty[\$ : \$f' > 0\$ → \$f\$ **croissante**.",
                    ),
                    _step(
                      "**Extrema** : maximum local en \$x = 0\$ avec \$f(0) = 2\$. Minimum local en \$x = 2\$ avec \$f(2) = 8 - 12 + 2 = -2\$.",
                      tipFr:
                          "Un point critique avec changement de signe de \$f'\$ de + à - est un maximum ; de - à + est un minimum.",
                    ),
                  ],
                      finalAnswerFr:
                          r"Max local $f(0) = 2$ ; Min local $f(2) = -2$"),
                ),
              ],
            ),
            _q(
              2,
              "Donner l'équation de la tangente à la courbe en \$x = 1\$.",
              1,
              _sol([
                _step(
                  "**Équation de la tangente** en \$x = a\$ : \$y = f(a) + f'(a)(x - a)\$.",
                ),
                _step(
                  "Calcul : \$f(1) = 1 - 3 + 2 = 0\$. \$f'(1) = 3(1)(1-2) = -3\$.",
                ),
                _step(
                  "Donc l'équation est \$y = 0 + (-3)(x - 1) = -3x + 3\$.",
                ),
              ], finalAnswerFr: r"$y = -3x + 3$"),
            ),
          ],
        ),
        _ex(
          4,
          'Application — optimisation',
          4,
          "Un rectangle a un périmètre fixe de 40 cm. On note \$x\$ sa largeur (en cm), avec \$0 < x < 20\$. Sa longueur est alors \$\\ell = 20 - x\$.",
          [
            _q(
              1,
              "Exprimer l'aire \$A(x)\$ du rectangle en fonction de \$x\$.",
              1,
              _sol([
                _step(
                  "Aire = largeur × longueur : \$A(x) = x \\cdot (20 - x) = 20x - x^2\$.",
                ),
                _step(
                  "Cette fonction est définie pour \$x \\in ]0, 20[\$ (largeur strictement positive et inférieure au demi-périmètre).",
                ),
              ], finalAnswerFr: r"$A(x) = 20x - x^2$"),
            ),
            _q(
              2,
              "Étudier le sens de variation de \$A\$ et déterminer la valeur de \$x\$ pour laquelle l'aire est maximale.",
              3,
              _sol([
                _step(
                  "On dérive : \$A'(x) = 20 - 2x\$. Le signe : \$A'(x) > 0 \\iff x < 10\$.",
                ),
                _step(
                  "Tableau de variations : sur \$]0, 10[\$, \$A' > 0\$ donc \$A\$ **croissante**. Sur \$]10, 20[\$, \$A' < 0\$ donc \$A\$ **décroissante**.",
                ),
                _step(
                  "Le **maximum** est atteint en \$x = 10\$ avec \$A(10) = 200 - 100 = 100\$ cm². Le rectangle optimal est donc le **carré** de côté 10 cm.",
                  tipFr:
                      "Résultat classique : à périmètre fixé, le rectangle d'aire maximale est le carré.",
                ),
              ],
                  finalAnswerFr:
                      r"Aire max = 100 cm² atteinte en $x = 10$ cm (carré)"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperSequencesReview() => _paper(
      titleFr: 'Épreuve type — Suites numériques',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Suites arithmétiques, géométriques, récurrentes, convergence par monotonie + bornes, point fixe. Pense à toujours **conjecturer** la limite, puis la prouver via le théorème de la limite monotone.",
      exercices: [
        _ex(
          1,
          'Suites arithmétiques et géométriques',
          5,
          "On considère deux suites : \$(u_n)\$ arithmétique de premier terme \$u_0 = 2\$ et raison \$r = 3\$ ; \$(v_n)\$ géométrique de premier terme \$v_0 = 1\$ et raison \$q = 2\$.",
          [
            _q(
              1,
              "Donner les expressions explicites de \$u_n\$ et \$v_n\$.",
              2,
              _sol([
                _step(
                  "**Suite arithmétique** : \$u_n = u_0 + nr\$. Application : \$u_n = 2 + 3n\$.",
                  latex: r"u_n = u_0 + nr",
                ),
                _step(
                  "**Suite géométrique** : \$v_n = v_0 \\cdot q^n\$. Application : \$v_n = 1 \\cdot 2^n = 2^n\$.",
                  latex: r"v_n = v_0 \cdot q^n",
                ),
              ],
                  finalAnswerFr:
                      r"$u_n = 2 + 3n$, $v_n = 2^n$"),
            ),
            _q(
              2,
              "Calculer la somme \$S = u_0 + u_1 + \\dots + u_{10}\$.",
              2,
              _sol([
                _step(
                  "**Somme arithmétique** : \$S = (n+1) \\cdot \\dfrac{u_0 + u_n}{2}\$ où \$n\$ est l'indice du dernier terme.",
                ),
                _step(
                  "Ici on somme de \$u_0\$ à \$u_{10}\$, soit **11 termes**. \$u_{10} = 2 + 30 = 32\$.",
                ),
                _step(
                  "Donc \$S = 11 \\cdot \\dfrac{2 + 32}{2} = 11 \\cdot 17 = 187\$.",
                  tipFr:
                      "(nombre de termes) × (premier + dernier) / 2 — la formule de Gauss en pratique.",
                ),
              ], finalAnswerFr: r"$S = 187$"),
            ),
            _q(
              3,
              "Calculer la somme \$T = v_0 + v_1 + \\dots + v_5\$.",
              1,
              _sol([
                _step(
                  "**Somme géométrique** : \$T = v_0 \\cdot \\dfrac{1 - q^{n+1}}{1 - q}\$ pour \$n+1\$ termes.",
                ),
                _step(
                  "Ici 6 termes, \$q = 2\$, \$v_0 = 1\$. \$T = 1 \\cdot \\dfrac{1 - 2^6}{1 - 2} = \\dfrac{-63}{-1} = 63\$.",
                ),
              ], finalAnswerFr: r"$T = 63$"),
            ),
          ],
        ),
        _ex(
          2,
          'Suite récurrente — convergence par monotonie',
          6,
          "On définit la suite \$(w_n)\$ par \$w_0 = 0\$ et \$w_{n+1} = \\sqrt{w_n + 2}\$ pour tout \$n \\in \\mathbb{N}\$.",
          [
            _qSubs(
              1,
              "Étude de \$(w_n)\$.",
              4,
              [
                _sub(
                  'a',
                  "Montrer par récurrence que \$0 \\le w_n \\le 2\$ pour tout \$n\$.",
                  2,
                  _sol([
                    _step(
                      "**Initialisation** : \$w_0 = 0\$, donc \$0 \\le w_0 \\le 2\$. La propriété est vraie au rang 0.",
                    ),
                    _step(
                      "**Hérédité** : on suppose \$0 \\le w_n \\le 2\$ pour un certain \$n\$. Alors \$2 \\le w_n + 2 \\le 4\$, donc \$\\sqrt{2} \\le \\sqrt{w_n + 2} \\le 2\$ (la racine est croissante).",
                    ),
                    _step(
                      "Or \$\\sqrt{2} \\ge 0\$, donc \$0 \\le \\sqrt{2} \\le w_{n+1} \\le 2\$. La propriété est vraie au rang \$n+1\$.",
                    ),
                    _step(
                      "**Conclusion** : par récurrence, pour tout \$n \\in \\mathbb{N}\$, \$0 \\le w_n \\le 2\$. La suite est **bornée**.",
                    ),
                  ], finalAnswerFr: r"$0 \le w_n \le 2$ pour tout $n$"),
                ),
                _sub(
                  'b',
                  "Montrer que \$(w_n)\$ est croissante.",
                  2,
                  _sol([
                    _step(
                      "On veut montrer \$w_{n+1} - w_n \\ge 0\$. Calculons \$w_{n+1} - w_n = \\sqrt{w_n + 2} - w_n\$.",
                    ),
                    _step(
                      "**Astuce** : on étudie le signe de \$\\sqrt{w_n + 2} - w_n\$. Comme les deux sont positifs (Q1a), on peut comparer les carrés : \$\\sqrt{w_n + 2} \\ge w_n \\iff w_n + 2 \\ge w_n^2 \\iff w_n^2 - w_n - 2 \\le 0\$.",
                    ),
                    _step(
                      "\$w_n^2 - w_n - 2 = (w_n - 2)(w_n + 1)\$. Sur \$[0, 2]\$, \$w_n - 2 \\le 0\$ et \$w_n + 1 > 0\$, donc le produit est \$\\le 0\$.",
                    ),
                    _step(
                      "Donc \$w_{n+1} \\ge w_n\$ pour tout \$n\$ : la suite est **croissante**.",
                      tipFr:
                          "Pour comparer deux positifs, élever au carré conserve l'ordre.",
                    ),
                  ], finalAnswerFr: r"$(w_n)$ est croissante"),
                ),
              ],
            ),
            _q(
              2,
              "En déduire que \$(w_n)\$ converge et calculer sa limite.",
              2,
              _sol([
                _step(
                  "\$(w_n)\$ est **croissante** (Q1b) et **majorée** par 2 (Q1a). Par le **théorème de la limite monotone**, elle converge vers une limite finie \$L \\in [0, 2]\$.",
                ),
                _step(
                  "Par continuité de \$f(x) = \\sqrt{x + 2}\$, on passe à la limite dans la relation \$w_{n+1} = f(w_n)\$ : \$L = \\sqrt{L + 2}\$.",
                ),
                _step(
                  "On résout : \$L^2 = L + 2 \\iff L^2 - L - 2 = 0 \\iff (L-2)(L+1) = 0\$. Donc \$L = 2\$ ou \$L = -1\$. Comme \$L \\in [0, 2]\$, on retient \$L = 2\$.",
                ),
              ], finalAnswerFr: r"$\lim_{n \to \infty} w_n = 2$"),
            ),
          ],
        ),
        _ex(
          3,
          'Sommes — paradoxe de Zénon',
          4,
          "Soit la suite \$(s_n)\$ définie par \$s_n = \\sum_{k=0}^{n} \\dfrac{1}{2^k} = 1 + \\dfrac{1}{2} + \\dfrac{1}{4} + \\dots + \\dfrac{1}{2^n}\$.",
          [
            _q(
              1,
              "Calculer \$s_n\$ en fonction de \$n\$.",
              2,
              _sol([
                _step(
                  "C'est une **somme géométrique** de raison \$q = 1/2\$ et premier terme 1. Il y a \$n+1\$ termes.",
                ),
                _step(
                  "Formule : \$s_n = 1 \\cdot \\dfrac{1 - (1/2)^{n+1}}{1 - 1/2} = \\dfrac{1 - (1/2)^{n+1}}{1/2} = 2(1 - (1/2)^{n+1}) = 2 - (1/2)^n\$.",
                  latex: r"s_n = 2 - \frac{1}{2^n}",
                ),
              ], finalAnswerFr: r"$s_n = 2 - (1/2)^n$"),
            ),
            _q(
              2,
              "Calculer \$\\lim_{n \\to +\\infty} s_n\$ et interpréter.",
              2,
              _sol([
                _step(
                  "Quand \$n \\to +\\infty\$, \$(1/2)^n \\to 0\$ car \$|q| = 1/2 < 1\$.",
                ),
                _step(
                  "Donc \$s_n \\to 2 - 0 = 2\$. La somme infinie \$1 + 1/2 + 1/4 + \\dots = 2\$.",
                ),
                _step(
                  "**Interprétation (Zénon)** : à chaque étape on parcourt la moitié de la distance restante. Bien qu'il faille une infinité d'étapes, la somme totale est finie et vaut 2. C'est le paradoxe résolu par la convergence des séries géométriques.",
                  tipFr:
                      "Pour \$|q| < 1\$ : somme infinie \$= u_0 / (1 - q)\$ — ici \$1 / (1 - 1/2) = 2\$.",
                ),
              ], finalAnswerFr: r"$\lim s_n = 2$"),
            ),
          ],
        ),
        _ex(
          4,
          'Suite adjacente — encadrement de e',
          5,
          "On considère les suites \$(a_n)\$ et \$(b_n)\$ définies pour \$n \\ge 1\$ par \$a_n = \\left(1 + \\dfrac{1}{n}\\right)^n\$ et \$b_n = \\left(1 + \\dfrac{1}{n}\\right)^{n+1}\$.",
          [
            _q(
              1,
              "Calculer \$a_1, a_2, a_5\$ et \$b_1, b_2, b_5\$ (3 chiffres significatifs).",
              2,
              _sol([
                _step(
                  "\$a_1 = 2^1 = 2\$. \$a_2 = (1{,}5)^2 = 2{,}25\$. \$a_5 = (1{,}2)^5 \\approx 2{,}488\$.",
                ),
                _step(
                  "\$b_1 = 2^2 = 4\$. \$b_2 = (1{,}5)^3 = 3{,}375\$. \$b_5 = (1{,}2)^6 \\approx 2{,}986\$.",
                ),
                _step(
                  "On observe que \$(a_n)\$ croît vers une limite, \$(b_n)\$ décroît vers la même limite. L'encadrement \$a_n \\le e \\le b_n\$ se resserre.",
                ),
              ]),
            ),
            _q(
              2,
              "Sachant que \$(a_n)\$ est croissante, \$(b_n)\$ décroissante, et \$b_n - a_n \\to 0\$, conclure sur leur limite commune.",
              3,
              _sol([
                _step(
                  "**Théorème des suites adjacentes** : si \$(a_n)\$ croissante, \$(b_n)\$ décroissante, et \$b_n - a_n \\to 0\$, alors \$(a_n)\$ et \$(b_n)\$ **convergent vers la même limite**.",
                ),
                _step(
                  "Cette limite commune est le **nombre d'Euler** \$e \\approx 2{,}71828\$. C'est l'une des définitions classiques de \$e\$.",
                ),
                _step(
                  "On peut en déduire un encadrement explicite : pour tout \$n \\ge 1\$, \$a_n \\le e \\le b_n\$. Cela permet d'approximer \$e\$ avec autant de précision qu'on veut en prenant \$n\$ grand.",
                  tipFr:
                          "Le théorème des suites adjacentes prouve l'existence et l'unicité de la limite ; il faut une information extérieure pour identifier sa valeur (ici, \$e\$).",
                ),
              ], finalAnswerFr: r"$\lim a_n = \lim b_n = e \approx 2{,}71828$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperLnBasics() => _paper(
      titleFr: 'Épreuve type — Fonction logarithme népérien',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Cette épreuve mobilise la **fonction \$\\ln\$** : propriétés algébriques, dérivation, limites, résolution d'équations et étude de fonctions composées. Rappel : \$\\ln\$ est définie sur \$]0, +\\infty[\$, \$\\ln(1) = 0\$, \$\\ln(e) = 1\$, \$\\ln(ab) = \\ln a + \\ln b\$.",
      exercices: [
        _ex(
          1,
          'Propriétés algébriques',
          4,
          "On rappelle : \$\\ln(ab) = \\ln a + \\ln b\$, \$\\ln(a/b) = \\ln a - \\ln b\$, \$\\ln(a^n) = n \\ln a\$ pour \$a, b > 0\$.",
          [
            _q(
              1,
              "Simplifier l'expression \$A = \\ln(8) + \\ln(3) - 2\\ln(2) - \\ln(6)\$.",
              2,
              _sol([
                _step(
                  "On utilise \$2\\ln(2) = \\ln(2^2) = \\ln(4)\$ et \$\\ln(8) = \\ln(2^3) = 3\\ln(2)\$. Mais réécrivons plutôt tout en termes de logarithmes simples.",
                ),
                _step(
                  "\$A = \\ln(8) - \\ln(4) + \\ln(3) - \\ln(6) = \\ln(8/4) + \\ln(3/6) = \\ln(2) + \\ln(1/2)\$.",
                ),
                _step(
                  "Or \$\\ln(1/2) = -\\ln(2)\$. Donc \$A = \\ln(2) - \\ln(2) = 0\$.",
                  tipFr:
                      "Regrouper les ln en somme/différence avant de calculer simplifie souvent les expressions logarithmiques.",
                ),
              ], finalAnswerFr: r"$A = 0$"),
            ),
            _q(
              2,
              "Résoudre dans \$\\mathbb{R}\$ : \$\\ln(2x - 1) = \\ln(x + 3)\$.",
              2,
              _sol([
                _step(
                  "**Domaine** : il faut \$2x - 1 > 0\$ et \$x + 3 > 0\$, c'est-à-dire \$x > 1/2\$ (la condition la plus restrictive).",
                ),
                _step(
                  "Par injectivité de \$\\ln\$ (strictement croissante) : \$\\ln(u) = \\ln(v) \\iff u = v\$. Donc \$2x - 1 = x + 3 \\iff x = 4\$.",
                ),
                _step(
                  "Vérification du domaine : \$x = 4 > 1/2\$ ✓. Donc \$S = \\{4\\}\$.",
                  mistakeFr:
                      "Toujours vérifier les conditions d'existence \$u > 0\$ et \$v > 0\$ avant d'utiliser l'injectivité.",
                ),
              ], finalAnswerFr: r"$x = 4$"),
            ),
          ],
        ),
        _ex(
          2,
          'Dérivation et étude de fonction',
          6,
          "Soit la fonction \$f\$ définie sur \$]0, +\\infty[\$ par \$f(x) = x - \\ln(x)\$.",
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
                      "Par linéarité : \$f'(x) = 1 - (\\ln x)' = 1 - 1/x = \\dfrac{x - 1}{x}\$.",
                    ),
                    _step(
                      "Sur \$]0, +\\infty[\$, \$x > 0\$ donc le signe de \$f'\$ est celui de \$x - 1\$. Sur \$]0, 1[\$ : \$f' < 0\$. Sur \$]1, +\\infty[\$ : \$f' > 0\$. \$f' = 0\$ en \$x = 1\$.",
                    ),
                  ],
                      finalAnswerFr:
                          r"$f'(x) = \frac{x-1}{x}$, négative sur $]0, 1[$, positive sur $]1, +\infty[$"),
                ),
                _sub(
                  'b',
                  "En déduire le tableau de variations et l'extremum.",
                  2,
                  _sol([
                    _step(
                      "Sur \$]0, 1[\$ : \$f\$ décroissante. Sur \$]1, +\\infty[\$ : \$f\$ croissante. Donc \$f\$ admet un **minimum global** en \$x = 1\$.",
                    ),
                    _step(
                      "Valeur du minimum : \$f(1) = 1 - \\ln(1) = 1 - 0 = 1\$.",
                    ),
                    _step(
                      "**Conséquence importante** : pour tout \$x > 0\$, \$f(x) \\ge 1\$, soit \$x \\ge 1 + \\ln(x)\$ ou \$\\ln(x) \\le x - 1\$. C'est une inégalité de référence en analyse.",
                      tipFr:
                          "L'inégalité \$\\ln(x) \\le x - 1\$ (avec égalité ssi \$x = 1\$) est très utile pour borner \$\\ln\$ par un polynôme.",
                    ),
                  ],
                      finalAnswerFr:
                          r"Min global $f(1) = 1$ ; $\ln x \le x - 1$"),
                ),
              ],
            ),
            _q(
              2,
              "Calculer \$\\lim_{x \\to 0^+} f(x)\$ et \$\\lim_{x \\to +\\infty} f(x)\$.",
              2,
              _sol([
                _step(
                  "**Limite en \$0^+\$** : \$x \\to 0\$ et \$\\ln(x) \\to -\\infty\$. Donc \$f(x) = x - \\ln(x) \\to 0 - (-\\infty) = +\\infty\$.",
                ),
                _step(
                  "**Limite en \$+\\infty\$** : on a \$f(x) = x - \\ln(x) = x(1 - \\ln(x)/x)\$. Par croissances comparées, \$\\ln(x)/x \\to 0\$. Donc \$1 - \\ln(x)/x \\to 1\$ et \$f(x) \\to +\\infty\$.",
                  tipFr:
                      "**Croissances comparées** : à l'infini, toute puissance positive de \$x\$ l'emporte sur \$\\ln(x)\$.",
                ),
              ],
                  finalAnswerFr:
                      r"$\lim_{x \to 0^+} f = +\infty$, $\lim_{x \to +\infty} f = +\infty$"),
            ),
          ],
        ),
        _ex(
          3,
          'Équation logarithmique',
          5,
          "On cherche à résoudre dans \$\\mathbb{R}\$ l'équation \$(E) : \\ln(x^2 - 1) = \\ln(3) + \\ln(x + 1)\$.",
          [
            _q(
              1,
              "Déterminer le domaine de définition.",
              2,
              _sol([
                _step(
                  "Conditions : \$x^2 - 1 > 0\$ et \$x + 1 > 0\$.",
                ),
                _step(
                  "\$x^2 - 1 > 0 \\iff (x-1)(x+1) > 0 \\iff x < -1\$ ou \$x > 1\$. \$x + 1 > 0 \\iff x > -1\$.",
                ),
                _step(
                  "Intersection : \$x > 1\$. Le domaine de \$(E)\$ est \$]1, +\\infty[\$.",
                  mistakeFr:
                      "Ne pas oublier d'intersecter les domaines de chaque \$\\ln\$ — la condition la plus restrictive l'emporte.",
                ),
              ], finalAnswerFr: r"$\mathcal{D} = ]1, +\infty[$"),
            ),
            _q(
              2,
              "Résoudre \$(E)\$.",
              3,
              _sol([
                _step(
                  "On regroupe : \$\\ln(x^2 - 1) - \\ln(x + 1) = \\ln(3)\$, soit \$\\ln\\left(\\dfrac{x^2 - 1}{x + 1}\\right) = \\ln(3)\$.",
                ),
                _step(
                  "Factorise : \$\\dfrac{(x-1)(x+1)}{x+1} = x - 1\$. L'équation devient \$\\ln(x - 1) = \\ln(3)\$.",
                ),
                _step(
                  "Par injectivité : \$x - 1 = 3 \\iff x = 4\$.",
                ),
                _step(
                  "Vérification du domaine : \$x = 4 > 1\$ ✓. Donc \$S = \\{4\\}\$.",
                ),
              ], finalAnswerFr: r"$S = \{4\}$"),
            ),
          ],
        ),
        _ex(
          4,
          r"Composition — étude de $g(x) = \ln(x^2 + 1)$",
          5,
          "Soit \$g(x) = \\ln(x^2 + 1)\$ définie sur \$\\mathbb{R}\$.",
          [
            _q(
              1,
              "Justifier que \$g\$ est définie sur \$\\mathbb{R}\$.",
              1,
              _sol([
                _step(
                  "Pour tout \$x \\in \\mathbb{R}\$, \$x^2 + 1 \\ge 1 > 0\$. Donc \$\\ln(x^2 + 1)\$ est défini partout.",
                ),
              ], finalAnswerFr: r"$\mathcal{D}_g = \mathbb{R}$"),
            ),
            _q(
              2,
              "Calculer \$g'(x)\$ et étudier les variations de \$g\$.",
              2,
              _sol([
                _step(
                  "**Composition** \$\\ln \\circ u\$ avec \$u(x) = x^2 + 1\$. Règle : \$(\\ln u)' = u'/u\$.",
                ),
                _step(
                  "\$u'(x) = 2x\$, donc \$g'(x) = \\dfrac{2x}{x^2 + 1}\$.",
                ),
                _step(
                  "Le dénominateur \$x^2 + 1 > 0\$ partout. Le signe de \$g'\$ est donc celui de \$2x\$ : \$g' < 0\$ sur \$]-\\infty, 0[\$ (g décroissante), \$g' > 0\$ sur \$]0, +\\infty[\$ (g croissante). Minimum en \$x = 0\$, \$g(0) = \\ln(1) = 0\$.",
                ),
              ], finalAnswerFr: r"$g'(x) = \frac{2x}{x^2+1}$ ; min en 0, $g(0) = 0$"),
            ),
            _q(
              3,
              "Calculer \$\\lim_{x \\to \\pm\\infty} g(x)\$.",
              2,
              _sol([
                _step(
                  "Quand \$x \\to +\\infty\$ ou \$-\\infty\$, \$x^2 + 1 \\to +\\infty\$. Et \$\\ln(t) \\to +\\infty\$ quand \$t \\to +\\infty\$.",
                ),
                _step(
                  "Par composition des limites : \$g(x) = \\ln(x^2 + 1) \\to +\\infty\$ quand \$x \\to \\pm\\infty\$.",
                  tipFr:
                          "Une fonction paire (\$g(-x) = g(x)\$ ici) a même limite à \$-\\infty\$ et à \$+\\infty\$.",
                ),
              ],
                  finalAnswerFr:
                      r"$\lim_{x \to \pm\infty} g(x) = +\infty$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperExpBasics() => _paper(
      titleFr: 'Épreuve type — Fonction exponentielle',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Cette épreuve teste la maîtrise de **\$\\exp = e^x\$** : propriétés algébriques, croissances comparées, équations exponentielles, étude de fonctions. Rappel : \$e^x > 0\$ partout, \$(e^x)' = e^x\$, \$e^0 = 1\$.",
      exercices: [
        _ex(
          1,
          'Propriétés algébriques',
          4,
          "Rappels : \$e^a \\cdot e^b = e^{a+b}\$, \$e^a / e^b = e^{a-b}\$, \$(e^a)^n = e^{na}\$, \$e^{-a} = 1/e^a\$.",
          [
            _q(
              1,
              "Simplifier \$A = \\dfrac{e^3 \\cdot e^{-1}}{e^4}\$.",
              1,
              _sol([
                _step(
                  "Numérateur : \$e^3 \\cdot e^{-1} = e^{3 + (-1)} = e^2\$.",
                ),
                _step(
                  "Quotient : \$\\dfrac{e^2}{e^4} = e^{2-4} = e^{-2}\$.",
                ),
              ], finalAnswerFr: r"$A = e^{-2}$"),
            ),
            _q(
              2,
              "Résoudre dans \$\\mathbb{R}\$ : \$e^{2x} - 3 e^x + 2 = 0\$.",
              3,
              _sol([
                _step(
                  "**Astuce** : poser \$X = e^x\$ (avec contrainte \$X > 0\$). Comme \$e^{2x} = (e^x)^2 = X^2\$, l'équation devient \$X^2 - 3X + 2 = 0\$.",
                ),
                _step(
                  "Discriminant : \$\\Delta = 9 - 8 = 1\$. Racines : \$X = (3 \\pm 1)/2\$, soit \$X = 2\$ ou \$X = 1\$. Les deux racines sont positives, donc compatibles.",
                ),
                _step(
                  "Cas 1 : \$e^x = 2 \\iff x = \\ln(2)\$. Cas 2 : \$e^x = 1 \\iff x = 0\$. Donc \$S = \\{0, \\ln(2)\\}\$.",
                  tipFr:
                          "Une équation polynomiale en \$e^x\$ se résout par substitution \$X = e^x\$, puis on revient à \$x\$.",
                ),
              ], finalAnswerFr: r"$S = \{0, \ln 2\}$"),
            ),
          ],
        ),
        _ex(
          2,
          'Étude de fonction — exponentielle décroissante',
          5,
          "Soit la fonction \$f\$ définie sur \$\\mathbb{R}\$ par \$f(x) = x e^{-x}\$.",
          [
            _q(
              1,
              "Calculer \$f'(x)\$ et étudier son signe.",
              2,
              _sol([
                _step(
                  "**Règle du produit** : \$(uv)' = u'v + uv'\$. Avec \$u(x) = x\$ (donc \$u' = 1\$) et \$v(x) = e^{-x}\$ (donc \$v' = -e^{-x}\$).",
                ),
                _step(
                  "\$f'(x) = 1 \\cdot e^{-x} + x \\cdot (-e^{-x}) = e^{-x}(1 - x)\$.",
                ),
                _step(
                  "Comme \$e^{-x} > 0\$ pour tout \$x\$, le signe de \$f'\$ est celui de \$1 - x\$. Donc \$f' > 0\$ sur \$]-\\infty, 1[\$, \$f' < 0\$ sur \$]1, +\\infty[\$.",
                ),
              ], finalAnswerFr: r"$f'(x) = e^{-x}(1 - x)$"),
            ),
            _q(
              2,
              "Déduire les variations de \$f\$ et son extremum.",
              1,
              _sol([
                _step(
                  "Sur \$]-\\infty, 1[\$ : \$f' > 0\$, \$f\$ croissante. Sur \$]1, +\\infty[\$ : \$f' < 0\$, \$f\$ décroissante. **Maximum** en \$x = 1\$ avec \$f(1) = 1 \\cdot e^{-1} = 1/e\$.",
                ),
              ], finalAnswerFr: r"Max global $f(1) = 1/e \approx 0{,}368$"),
            ),
            _q(
              3,
              "Calculer les limites de \$f\$ aux bornes.",
              2,
              _sol([
                _step(
                  "**En \$-\\infty\$** : \$x \\to -\\infty\$ et \$e^{-x} \\to +\\infty\$. Produit \$x \\cdot e^{-x}\$ → forme indéterminée \$(-\\infty) \\cdot (+\\infty) = -\\infty\$.",
                ),
                _step(
                  "Plus précisément, on a \$x \\to -\\infty\$ négatif × \$e^{-x} \\to +\\infty\$ positif → produit \$\\to -\\infty\$. Donc \$\\lim_{x \\to -\\infty} f = -\\infty\$.",
                ),
                _step(
                  "**En \$+\\infty\$** : \$x \\to +\\infty\$ et \$e^{-x} \\to 0^+\$. Forme indéterminée \$\\infty \\cdot 0\$. Réécrire : \$f(x) = x/e^x\$. Par croissances comparées, \$e^x\$ l'emporte sur \$x\$, donc \$x/e^x \\to 0\$. \$\\lim_{x \\to +\\infty} f = 0\$.",
                  tipFr:
                          "**Croissances comparées** : \$\\lim_{x \\to +\\infty} \\dfrac{x^n}{e^x} = 0\$ pour tout \$n\$.",
                ),
              ],
                  finalAnswerFr:
                      r"$\lim_{x \to -\infty} f = -\infty$, $\lim_{x \to +\infty} f = 0$"),
            ),
          ],
        ),
        _ex(
          3,
          'Croissances comparées',
          5,
          "On considère les fonctions \$u(x) = \\dfrac{e^x}{x^3}\$ et \$v(x) = x^2 e^{-x}\$.",
          [
            _q(
              1,
              "Calculer \$\\lim_{x \\to +\\infty} u(x)\$.",
              2,
              _sol([
                _step(
                  "Quand \$x \\to +\\infty\$, numérateur \$e^x \\to +\\infty\$ et dénominateur \$x^3 \\to +\\infty\$. Forme \$\\infty/\\infty\$.",
                ),
                _step(
                  "**Théorème des croissances comparées** : à l'infini, l'exponentielle l'emporte sur toute puissance positive. \$\\lim_{x \\to +\\infty} \\dfrac{e^x}{x^n} = +\\infty\$ pour tout \$n > 0\$.",
                  tipFr:
                          "Hiérarchie de croissance : exponentielle \$\\gg\$ puissance \$\\gg\$ logarithme.",
                ),
                _step(
                  "Application : \$\\lim u(x) = +\\infty\$.",
                ),
              ], finalAnswerFr: r"$\lim u = +\infty$"),
            ),
            _q(
              2,
              "Calculer \$\\lim_{x \\to +\\infty} v(x)\$.",
              2,
              _sol([
                _step(
                  "\$v(x) = x^2 e^{-x} = \\dfrac{x^2}{e^x}\$.",
                ),
                _step(
                  "Par croissances comparées (l'exponentielle l'emporte) : \$\\lim_{x \\to +\\infty} \\dfrac{x^2}{e^x} = 0\$.",
                ),
                _step(
                  "Donc \$\\lim v(x) = 0\$. La courbe a une asymptote horizontale \$y = 0\$ en \$+\\infty\$.",
                ),
              ], finalAnswerFr: r"$\lim v = 0$"),
            ),
            _q(
              3,
              "Calculer \$\\lim_{x \\to 0} \\dfrac{e^x - 1}{x}\$.",
              1,
              _sol([
                _step(
                  "Substitution directe : numérateur \$e^0 - 1 = 0\$, dénominateur 0. Forme \$\\frac{0}{0}\$.",
                ),
                _step(
                  "**Reconnaître un taux d'accroissement** : \$\\dfrac{e^x - e^0}{x - 0}\$ est le taux d'accroissement de \$\\exp\$ entre 0 et \$x\$. Sa limite quand \$x \\to 0\$ est \$\\exp'(0) = e^0 = 1\$.",
                  tipFr:
                          "Limite usuelle : \$\\lim_{x \\to 0} \\dfrac{e^x - 1}{x} = 1\$.",
                ),
              ], finalAnswerFr: r"$\lim = 1$"),
            ),
          ],
        ),
        _ex(
          4,
          'Application — modèle de décroissance',
          6,
          "Une quantité \$Q(t)\$ vérifie \$Q(t) = Q_0 e^{-\\lambda t}\$ avec \$Q_0 = 100\$ et \$\\lambda > 0\$. On sait que \$Q(2) = 60\$.",
          [
            _q(
              1,
              "Calculer \$\\lambda\$.",
              2,
              _sol([
                _step(
                  "On a \$Q(2) = 100 e^{-2\\lambda} = 60\$, soit \$e^{-2\\lambda} = 0{,}6\$.",
                ),
                _step(
                  "On applique \$\\ln\$ aux deux membres : \$-2\\lambda = \\ln(0{,}6)\$, soit \$\\lambda = -\\ln(0{,}6)/2 = \\ln(5/3)/2\$.",
                ),
                _step(
                  "Numériquement : \$\\lambda \\approx \\ln(1{,}667)/2 \\approx 0{,}511/2 \\approx 0{,}255\$.",
                ),
              ],
                  finalAnswerFr:
                      r"$\lambda = \frac{\ln(5/3)}{2} \approx 0{,}255$"),
            ),
            _q(
              2,
              "À quel instant \$t_*\$ a-t-on \$Q(t) = Q_0 / 2\$ (demi-vie) ?",
              2,
              _sol([
                _step(
                  "\$Q(t_*) = Q_0/2 \\iff e^{-\\lambda t_*} = 1/2 \\iff -\\lambda t_* = \\ln(1/2) = -\\ln(2)\$.",
                ),
                _step(
                  "Donc \$t_* = \\ln(2)/\\lambda\$. Avec \$\\lambda \\approx 0{,}255\$ : \$t_* \\approx 0{,}693/0{,}255 \\approx 2{,}72\$.",
                ),
                _step(
                  "**Demi-vie** : indépendante de \$Q_0\$, ne dépend que de \$\\lambda\$. Vrai pour toute décroissance exponentielle (radioactivité, pharmacocinétique).",
                  tipFr:
                          "Demi-vie : \$t_{1/2} = \\ln(2)/\\lambda\$. À retenir pour les exercices de radioactivité.",
                ),
              ], finalAnswerFr: r"$t_* = \ln(2)/\lambda \approx 2{,}72$"),
            ),
            _q(
              3,
              "Calculer \$\\lim_{t \\to +\\infty} Q(t)\$ et interpréter.",
              2,
              _sol([
                _step(
                  "Quand \$t \\to +\\infty\$, \$-\\lambda t \\to -\\infty\$ et \$e^{-\\lambda t} \\to 0^+\$. Donc \$Q(t) \\to 0^+\$.",
                ),
                _step(
                  "**Interprétation** : la quantité s'épuise asymptotiquement, sans jamais s'annuler complètement (la décroissance exponentielle ne touche jamais zéro). C'est cohérent avec la radioactivité : il reste toujours un peu de matière originale, même après très longtemps.",
                ),
              ], finalAnswerFr: r"$\lim_{t \to +\infty} Q(t) = 0$"),
            ),
          ],
        ),
      ],
    );

Map<String, dynamic> _paperPrimitives() => _paper(
      titleFr: 'Épreuve type — Primitives et intégrales',
      subtitleFr: '4 exercices · 1h30 · sur 20 points',
      durationMinutes: 90,
      totalPoints: 20,
      introFr:
          "Cette épreuve mobilise le **calcul de primitives** (puissances, \$\\ln\$, \$\\exp\$, trigo), les **intégrales définies** via Newton-Leibniz, et l'**intégration par parties (IPP)**.",
      exercices: [
        _ex(
          1,
          'Primitives usuelles',
          4,
          "Donner une primitive sur l'intervalle indiqué.",
          [
            _q(
              1,
              "Primitive de \$f(x) = 3x^2 - 2x + 5\$ sur \$\\mathbb{R}\$.",
              1,
              _sol([
                _step(
                  "Linéarité de l'intégration : on intègre terme à terme. Règle des puissances : \$\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1}\$.",
                ),
                _step(
                  "\$\\int 3x^2\\,dx = x^3\$ ; \$\\int -2x\\,dx = -x^2\$ ; \$\\int 5\\,dx = 5x\$. Donc \$F(x) = x^3 - x^2 + 5x + C\$.",
                  tipFr:
                          "Toujours ajouter \$+ C\$ — la primitive est définie à une constante près.",
                ),
              ], finalAnswerFr: r"$F(x) = x^3 - x^2 + 5x + C$"),
            ),
            _q(
              2,
              "Primitive de \$g(x) = \\dfrac{1}{x}\$ sur \$]0, +\\infty[\$.",
              1,
              _sol([
                _step(
                  "Par définition même, \$(\\ln x)' = 1/x\$ sur \$]0, +\\infty[\$. Donc une primitive est \$\\ln(x) + C\$.",
                ),
                _step(
                  "Sur \$\\mathbb{R}^*\$ entier (en incluant les négatifs), la primitive est \$\\ln|x| + C\$.",
                ),
              ], finalAnswerFr: r"$G(x) = \ln(x) + C$"),
            ),
            _q(
              3,
              "Primitive de \$h(x) = \\cos(2x)\$ sur \$\\mathbb{R}\$.",
              1,
              _sol([
                _step(
                  "**Composition** : on cherche \$H\$ telle que \$H'(x) = \\cos(2x)\$. Essayer \$H(x) = \\dfrac{1}{2}\\sin(2x)\$.",
                ),
                _step(
                  "Vérification : \$H'(x) = \\dfrac{1}{2} \\cdot 2\\cos(2x) = \\cos(2x)\$ ✓. Donc \$H(x) = \\dfrac{1}{2}\\sin(2x) + C\$.",
                  mistakeFr:
                          "Oublier le facteur \$\\dfrac{1}{2}\$ qui compense le 2 de la dérivée de \$\\sin(2x)\$.",
                ),
              ], finalAnswerFr: r"$H(x) = \frac{1}{2}\sin(2x) + C$"),
            ),
            _q(
              4,
              "Primitive de \$k(x) = e^{-3x}\$ sur \$\\mathbb{R}\$.",
              1,
              _sol([
                _step(
                  "Pour \$e^{ax}\$, primitive \$\\dfrac{1}{a} e^{ax}\$. Ici \$a = -3\$ : \$K(x) = -\\dfrac{1}{3} e^{-3x} + C\$.",
                ),
                _step(
                  "Vérification : \$K'(x) = -\\dfrac{1}{3} \\cdot (-3) e^{-3x} = e^{-3x}\$ ✓.",
                ),
              ], finalAnswerFr: r"$K(x) = -\frac{1}{3} e^{-3x} + C$"),
            ),
          ],
        ),
        _ex(
          2,
          'Intégrales définies — Newton-Leibniz',
          5,
          "Calculer les intégrales suivantes.",
          [
            _q(
              1,
              "\$\\displaystyle\\int_0^1 (3x^2 + 2x)\\,dx\$.",
              2,
              _sol([
                _step(
                  "Primitive : \$F(x) = x^3 + x^2\$. Vérification : \$F'(x) = 3x^2 + 2x\$ ✓.",
                ),
                _step(
                  "Newton-Leibniz : \$\\int_0^1 = F(1) - F(0) = (1 + 1) - 0 = 2\$.",
                ),
              ], finalAnswerFr: r"$\int_0^1 = 2$"),
            ),
            _q(
              2,
              "\$\\displaystyle\\int_1^e \\dfrac{1}{x}\\,dx\$.",
              1,
              _sol([
                _step(
                  "Primitive : \$\\ln(x)\$. \$\\int_1^e = \\ln(e) - \\ln(1) = 1 - 0 = 1\$.",
                  tipFr:
                          "\$\\int_1^e \\dfrac{1}{x}\\,dx = 1\$ est l'intégrale définitionnelle de \$e\$ : c'est le \$x\$ tel que l'aire vaut 1.",
                ),
              ], finalAnswerFr: r"$= 1$"),
            ),
            _q(
              3,
              "\$\\displaystyle\\int_0^{\\pi/2} \\sin(x)\\,dx\$.",
              1,
              _sol([
                _step(
                  "Primitive : \$-\\cos(x)\$. \$\\int_0^{\\pi/2} = -\\cos(\\pi/2) + \\cos(0) = 0 + 1 = 1\$.",
                ),
              ], finalAnswerFr: r"$= 1$"),
            ),
            _q(
              4,
              "\$\\displaystyle\\int_0^1 x e^x\\,dx\$ (intégration par parties).",
              1,
              _sol([
                _step(
                  "**IPP** : \$\\int u v'\\,dx = [uv] - \\int u' v\\,dx\$. Choix : \$u = x\$ (devient \$u' = 1\$, plus simple) ; \$v' = e^x\$ (donc \$v = e^x\$).",
                ),
                _step(
                  "\$\\int_0^1 x e^x\\,dx = [x e^x]_0^1 - \\int_0^1 e^x\\,dx = (1 \\cdot e - 0) - [e^x]_0^1 = e - (e - 1) = 1\$.",
                ),
              ], finalAnswerFr: r"$= 1$"),
            ),
          ],
        ),
        _ex(
          3,
          'Calcul d\'aire',
          5,
          "Soit la courbe d'équation \$y = x^2\$ et la droite \$y = 2x\$ sur \$[0, 2]\$.",
          [
            _q(
              1,
              "Déterminer les points d'intersection de la courbe et la droite.",
              2,
              _sol([
                _step(
                  "Égalité : \$x^2 = 2x \\iff x^2 - 2x = 0 \\iff x(x - 2) = 0\$.",
                ),
                _step(
                  "Solutions : \$x = 0\$ ou \$x = 2\$. Points : \$(0, 0)\$ et \$(2, 4)\$.",
                ),
              ], finalAnswerFr: r"$(0, 0)$ et $(2, 4)$"),
            ),
            _q(
              2,
              "Sur \$[0, 2]\$, déterminer laquelle des deux courbes est au-dessus, puis calculer l'aire \$\\mathcal{A}\$ comprise entre les deux.",
              3,
              _sol([
                _step(
                  "Tester un point intermédiaire, par exemple \$x = 1\$ : \$x^2 = 1\$, \$2x = 2\$. Donc \$2x \\ge x^2\$ sur \$[0, 2]\$ — la droite est au-dessus.",
                ),
                _step(
                  "**Aire entre deux courbes** : \$\\mathcal{A} = \\int_a^b (f_{\\text{sup}} - f_{\\text{inf}})\\,dx = \\int_0^2 (2x - x^2)\\,dx\$.",
                ),
                _step(
                  "Primitive de \$2x - x^2\$ : \$x^2 - x^3/3\$. Newton-Leibniz : \$\\mathcal{A} = [x^2 - x^3/3]_0^2 = (4 - 8/3) - 0 = 12/3 - 8/3 = 4/3\$.",
                ),
                _step(
                  "Donc \$\\mathcal{A} = 4/3\$ unités d'aire \$\\approx 1{,}33\$.",
                  tipFr:
                          "Toujours identifier laquelle des courbes est au-dessus avant d'intégrer — sinon le résultat est négatif et faux.",
                ),
              ], finalAnswerFr: r"$\mathcal{A} = 4/3$"),
            ),
          ],
        ),
        _ex(
          4,
          'IPP — produit polynôme × ln',
          6,
          "On veut calculer \$I = \\displaystyle\\int_1^e x \\ln(x)\\,dx\$.",
          [
            _qSubs(
              1,
              "Application de l'IPP.",
              4,
              [
                _sub(
                  'a',
                  "Choisir \$u\$ et \$v'\$ judicieusement.",
                  1,
                  _sol([
                    _step(
                      "**Stratégie LIATE** : choisir comme \$u\$ la fonction qui se *simplifie* en se dérivant. Ici \$\\ln(x)\$ devient \$1/x\$ (plus simple polynomialement), tandis que \$x\$ devient \$1\$ (encore plus simple) mais resterait en \$x^2/2\$ après intégration (compliqué).",
                    ),
                    _step(
                      "Donc : \$u = \\ln(x)\$ (devient \$u' = 1/x\$) ; \$v' = x\$ (devient \$v = x^2/2\$).",
                    ),
                  ], finalAnswerFr: r"$u = \ln(x)$, $v' = x$"),
                ),
                _sub(
                  'b',
                  "Appliquer la formule \$\\int u v' = [uv] - \\int u' v\$ et calculer \$I\$.",
                  3,
                  _sol([
                    _step(
                      "Formule : \$I = [\\ln(x) \\cdot x^2/2]_1^e - \\int_1^e \\dfrac{1}{x} \\cdot \\dfrac{x^2}{2}\\,dx\$.",
                    ),
                    _step(
                      "Terme de bord : \$[\\ln(x) \\cdot x^2/2]_1^e = (\\ln(e) \\cdot e^2/2) - (\\ln(1) \\cdot 1/2) = e^2/2 - 0 = e^2/2\$.",
                    ),
                    _step(
                      "Intégrale résiduelle : \$\\int_1^e \\dfrac{x}{2}\\,dx = \\left[\\dfrac{x^2}{4}\\right]_1^e = e^2/4 - 1/4\$.",
                    ),
                    _step(
                      "Donc \$I = e^2/2 - (e^2/4 - 1/4) = e^2/2 - e^2/4 + 1/4 = e^2/4 + 1/4 = (e^2 + 1)/4\$.",
                    ),
                    _step(
                      "Numériquement : \$I \\approx (7{,}389 + 1)/4 \\approx 2{,}10\$.",
                      tipFr:
                              "Vérification d'ordre de grandeur : sur \$[1, e]\$ (largeur \$\\approx 1{,}72\$), \$x \\ln(x)\$ varie de 0 à \$e \\cdot 1 = e \\approx 2{,}72\$. Aire moyenne \$\\sim 1{,}5\$, sur largeur 1,7, donne \$\\sim 2{,}5\$ — cohérent.",
                    ),
                  ],
                      finalAnswerFr:
                              r"$I = (e^2 + 1)/4 \approx 2{,}10$"),
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

/// Map from skill code → paper JSON. The encoder writes one UPDATE row per
/// entry. Skill codes that don't yet have a hand-authored paper are omitted
/// and stay NULL in the database (the renderer skips the section in that case).
final Map<String, Map<String, dynamic>> _papers = {
  'sma_limit_def': _paperLimitDef(),
  'sma_deriv_definition': _paperDerivDefinition(),
  'sma_sequences_review': _paperSequencesReview(),
  'sma_ln_basics': _paperLnBasics(),
  'sma_exp_basics': _paperExpBasics(),
  'sma_primitives': _paperPrimitives(),
  // Other 26 SMA chapters appended in subsequent encoder edits.
};

String _sqlEscape(String s) => s.replaceAll("'", "''");

void main() {
  final buf = StringBuffer();
  buf.writeln(
      '-- Migration 030: topic-coherent exam papers for SMA chapters (Phase 1).');
  buf.writeln('-- Auto-generated by json_encode_exam_papers_sma.dart.');
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

  File('backend/supabase/migrations/030_exam_papers_sma.sql')
      .writeAsStringSync(buf.toString());
  stdout.writeln(
      'Wrote backend/supabase/migrations/030_exam_papers_sma.sql (${_papers.length} papers).');
}
