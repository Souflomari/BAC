// Pattern-authored exam questions for SMB papers (migration 021).
// Step schema: text, points, widget_slug?, widget_config?, mistake?, tip?
// Run: dart backend/seed/json_encode_exam_questions.dart

import "dart:convert";
import "dart:io";

void main(List<String> args) {
  final out = StringBuffer();
  out.writeln("-- Migration 021: rich exam questions for SMB papers.");
  out.writeln("BEGIN;");
  out.writeln();
  out.writeln("DO \$\$");
  out.writeln("DECLARE");
  for (final code in _skillRefs) {
    out.writeln("  s_${code.replaceAll('-', '_')} UUID;");
  }
  out.writeln("BEGIN");
  for (final code in _skillRefs) {
    final v = code.replaceAll('-', '_');
    out.writeln("  SELECT id INTO s_$v FROM public.skills WHERE code = '$code' LIMIT 1;");
  }
  out.writeln();

  var seq = 1;
  for (final paper in _papers) {
    out.writeln("  -- ===== ${paper.label} =====");
    for (var qi = 0; qi < paper.questions.length; qi++) {
      final q = paper.questions[qi];
      final id = "c1b2c3d4-eeee-0000-0000-${seq.toRadixString(16).padLeft(12, '0')}";
      seq++;
      final qJson = jsonEncode(q.question).replaceAll("'", "''");
      final aJson = jsonEncode(q.answer).replaceAll("'", "''");
      final skillVar = q.skillCode == null ? "NULL" : "s_${q.skillCode!.replaceAll('-', '_')}";
      final tagsLit = q.tags.map((t) => "'$t'").join(',');
      out.writeln("  INSERT INTO public.exam_questions (id, exam_id, skill_id, question_number, question, answer, item_type, difficulty_level, points, tags, is_active, created_at)");
      out.writeln("  VALUES ('$id', '${paper.examUuid}', $skillVar, ${qi + 1}, '$qJson'::jsonb, '$aJson'::jsonb, '${q.itemType}', ${q.difficulty}, ${q.points}, ARRAY[$tagsLit]::TEXT[], TRUE, NOW())");
      out.writeln("  ON CONFLICT (id) DO NOTHING;");
    }
    out.writeln();
  }

  out.writeln("END \$\$;");
  out.writeln("COMMIT;");

  final output = args.isNotEmpty ? args[0] : "backend/supabase/migrations/021_exam_questions_rich.sql";
  File(output).writeAsStringSync(out.toString());
  stdout.writeln("Wrote $output (${seq - 1} questions across ${_papers.length} papers).");
}

class _Step {
  final String text;
  final int points;
  final String? widgetSlug;
  final Map<String, dynamic>? widgetConfig;
  final String? mistake;
  final String? tip;
  const _Step({required this.text, this.points = 0, this.widgetSlug, this.widgetConfig, this.mistake, this.tip});

  Map<String, dynamic> toJson() => {
        "text": text,
        if (points > 0) "points": points,
        if (widgetSlug != null) "widget_slug": widgetSlug,
        if (widgetConfig != null) "widget_config": widgetConfig,
        if (mistake != null) "mistake": mistake,
        if (tip != null) "tip": tip,
      };
}

class _Question {
  final String? skillCode;
  final String itemType;
  final int difficulty;
  final int points;
  final List<String> tags;
  final Map<String, dynamic> question;
  final Map<String, dynamic> answer;
  const _Question({required this.skillCode, required this.itemType, required this.difficulty, required this.points, required this.tags, required this.question, required this.answer});
}

class _Paper {
  final String label;
  final String examUuid;
  final List<_Question> questions;
  const _Paper({required this.label, required this.examUuid, required this.questions});
}

_Question _ms(String stem, String skill, List<_Step> steps, {String? finalAnswer, String? gradingNotes, List<String> commonMistakes = const [], List<String> tips = const [], int difficulty = 3}) {
  final total = steps.fold<int>(0, (s, st) => s + st.points);
  return _Question(
    skillCode: skill,
    itemType: "multi_step",
    difficulty: difficulty,
    points: total == 0 ? 5 : total,
    tags: const ["rich_solution", "patterned"],
    question: {"stem": stem, "latex": true, "item_type": "multi_step"},
    answer: {
      "steps": steps.map((s) => s.toJson()).toList(),
      if (finalAnswer != null) "final_answer": finalAnswer,
      if (gradingNotes != null) "grading_notes": gradingNotes,
      if (commonMistakes.isNotEmpty) "common_mistakes": commonMistakes,
      if (tips.isNotEmpty) "tips": tips,
    },
  );
}

_Question _mcq(String stem, String skill, List<String> choices, int correct, List<_Step> steps, {int difficulty = 2, int points = 4}) =>
    _Question(
      skillCode: skill,
      itemType: "mcq",
      difficulty: difficulty,
      points: points,
      tags: const ["rich_solution", "mcq", "patterned"],
      question: {"stem": stem, "choices": choices, "correct_index": correct, "latex": true, "item_type": "mcq"},
      answer: {
        "steps": steps.map((s) => s.toJson()).toList(),
        "final_answer": "${String.fromCharCode(65 + correct)} - ${choices[correct]}",
      },
    );

_Question _num(String stem, String skill, num correct, List<_Step> steps, {num tolerance = 0, String? finalAnswer, int difficulty = 2, int points = 4}) =>
    _Question(
      skillCode: skill,
      itemType: "numeric",
      difficulty: difficulty,
      points: points,
      tags: const ["rich_solution", "numeric", "patterned"],
      question: {"stem": stem, "correct_value": correct, "tolerance": tolerance, "latex": true, "item_type": "numeric"},
      answer: {
        "steps": steps.map((s) => s.toJson()).toList(),
        "final_answer": finalAnswer ?? "$correct",
      },
    );

const _skillRefs = <String>[
  "arithmetic_seq", "geometric_seq", "seq_convergence", "seq_recursive",
  "limit_calc", "continuity", "tvi", "deriv_apps", "deriv_rules",
  "primitives", "definite_integral", "integral_apps",
  "prob_basic", "conditional_prob", "random_variables",
  "complex_basics", "complex_trig", "ode_first_order",
  "kinematics", "newtons_laws", "energy", "wave_properties",
  "sound_light", "rc_rl_circuits", "rlc_oscillations", "acid_base", "redox",
];

final List<_Paper> _papers = [
  _Paper(label: "SMB Math 2024 normale", examUuid: "a1b2c3d4-bbbb-0000-0000-000000000001", questions: [
    _ms(
      r"Soit $(u_n)$ definie par $u_0 = 1$ et $u_{n+1} = \dfrac{u_n + 3}{2}$. Etudier la convergence et calculer la limite.",
      "seq_recursive",
      [
        _Step(text: r"**Stabilite.** Par recurrence, $(u_n) \in [0, 3]$ pour tout $n$.", points: 2,
            widgetSlug: "recurrence_solver", widgetConfig: {"function": "(x + 3) / 2", "u0": 1.0, "iterations": 8}),
        _Step(text: r"**Monotonie.** $u_1 = 2 > u_0 = 1$. Si $u_n \le u_{n+1}$ alors $f(u_n) \le f(u_{n+1})$ : croissante.", points: 2,
            tip: r"On le prouve par recurrence."),
        _Step(text: r"**Convergence.** Croissante et majoree par 3, donc converge.", points: 2),
        _Step(text: r"**Limite.** $\ell = \dfrac{\ell + 3}{2} \Leftrightarrow \ell = 3$.", points: 2,
            mistake: r"Oublier la continuite de f pour passer a la limite."),
      ],
      finalAnswer: r"$(u_n)$ converge vers $\ell = 3$.",
      gradingNotes: r"Stabilite (2) + monotonie (2) + theoreme (2) + point fixe (2).",
    ),
    _num(r"$\displaystyle\lim_{x \to +\infty} \dfrac{2x^2 + 3x - 1}{x^2 - 4} = ?$", "limit_calc", 2, [
      _Step(text: r"Forme indeterminee $\dfrac{\infty}{\infty}$.", points: 1),
      _Step(text: r"Diviser par $x^2$ : $\dfrac{2 + 3/x - 1/x^2}{1 - 4/x^2}$.", points: 2),
      _Step(text: r"Limite $= 2$.", points: 2),
    ], points: 5),
    _num(r"$\displaystyle\int_0^1 (3x^2 + 2x) \, dx = ?$", "definite_integral", 2, [
      _Step(text: r"Primitive : $F(x) = x^3 + x^2$.", points: 2),
      _Step(text: r"$F(1) - F(0) = 2$.", points: 2,
          widgetSlug: "area_curve", widgetConfig: {"function": "3*x*x + 2*x", "a": 0.0, "b": 1.0}),
    ], finalAnswer: "2"),
    _ms(r"Etudier les variations de $f(x) = x^3 - 3x^2 + 4$ sur $\mathbb{R}$.", "deriv_apps", [
      _Step(text: r"$f'(x) = 3x^2 - 6x = 3x(x-2)$.", points: 2),
      _Step(text: r"Tableau de signes : positif sur $]-\infty, 0[ \cup ]2, +\infty[$, negatif sur $]0, 2[$.", points: 2,
          widgetSlug: "sign_table", widgetConfig: {"function": "3*x*(x-2)"}),
      _Step(text: r"Croissante sur $]-\infty, 0]$, decroissante sur $[0, 2]$, croissante sur $[2, +\infty[$.", points: 2),
      _Step(text: r"Max local en $0$ : $f(0)=4$. Min local en $2$ : $f(2)=0$.", points: 1),
    ], finalAnswer: r"Variations alternees, extrema en 0 et 2.", commonMistakes: [r"Confondre signe de $f'$ et signe de $f$."]),
    _mcq(r"Module de $z = 1 + i\sqrt{3}$ ?", "complex_basics", ["1", r"$\sqrt{3}$", "2", "4"], 2, [
      _Step(text: r"$|z|^2 = 1 + 3 = 4$.", points: 2),
      _Step(text: r"$|z| = 2$.", points: 1,
          widgetSlug: "complex_plane", widgetConfig: {"real": 1.0, "imaginary": 1.732}),
    ], difficulty: 1, points: 3),
    _ms(r"Resoudre $\sqrt{2x+1} = x - 1$ dans $\mathbb{R}$.", "continuity", [
      _Step(text: r"Conditions : $x \ge 1$.", points: 2,
          mistake: r"Oublier $x - 1 \ge 0$ avant le carre."),
      _Step(text: r"Au carre : $2x + 1 = x^2 - 2x + 1$.", points: 2),
      _Step(text: r"$x^2 - 4x = 0 \Leftrightarrow x = 0$ ou $x = 4$.", points: 2),
      _Step(text: r"$x = 0$ rejete. $x = 4$ verifie.", points: 2),
    ], finalAnswer: r"$x = 4$"),
    _ms(r"Resoudre $y' = -2y$, $y(0) = 5$.", "ode_first_order", [
      _Step(text: r"$y(x) = K e^{-2x}$.", points: 2),
      _Step(text: r"$K = 5$.", points: 1),
      _Step(text: r"$y(x) = 5 e^{-2x}$.", points: 2,
          widgetSlug: "diff_eq_solver", widgetConfig: {"a": -2.0, "b": 0.0, "y0": 5.0}),
    ], finalAnswer: r"$y(x) = 5 e^{-2x}$", difficulty: 2),
    _ms(r"Urne 4R + 6N. Tirage 2 sans remise. P(2 R) ?", "conditional_prob", [
      _Step(text: r"$P(R_1) = 4/10 = 2/5$.", points: 1),
      _Step(text: r"$P(R_2 | R_1) = 3/9 = 1/3$.", points: 2),
      _Step(text: r"$P = \dfrac{2}{15}$.", points: 2),
    ], finalAnswer: r"$\dfrac{2}{15}$", difficulty: 2),
    _num(r"$S = 1 + 2 + 4 + ... + 2^{10} = ?$", "geometric_seq", 2047, [
      _Step(text: r"Geometrique $q = 2$, 11 termes.", points: 1),
      _Step(text: r"$S = \dfrac{1 - 2^{11}}{1 - 2} = 2047$.", points: 3),
    ]),
    _ms(r"Montrer que $f(x) = x^3 + x - 5$ s'annule exactement une fois sur $\mathbb{R}$.", "tvi", [
      _Step(text: r"$f$ continue.", points: 1),
      _Step(text: r"$f'(x) = 3x^2 + 1 > 0$ : strictement croissante.", points: 2),
      _Step(text: r"$f(1) = -3$, $f(2) = 5$. Par TVI, annulation sur $]1, 2[$.", points: 2),
      _Step(text: r"Unicite par stricte croissance.", points: 2),
    ], finalAnswer: r"Une seule racine, dans $]1, 2[$."),
  ]),

  _Paper(label: "SMB Math 2024 rattrapage", examUuid: "a1b2c3d4-bbbb-0000-0000-000000000002", questions: [
    _num(r"$\displaystyle\lim_{x \to 0} \dfrac{\sin(3x)}{x} = ?$", "limit_calc", 3, [
      _Step(text: r"Forme $0/0$. Avec $\lim_{u \to 0} \dfrac{\sin u}{u} = 1$.", points: 2),
      _Step(text: r"$\dfrac{\sin(3x)}{x} = 3 \cdot \dfrac{\sin(3x)}{3x} \to 3$.", points: 2),
    ]),
    _ms(r"$f(x) = \dfrac{x^2 - 1}{x + 2}$. $f'(x)$ et tangente en $x=1$.", "deriv_rules", [
      _Step(text: r"Quotient : $f'(x) = \dfrac{x^2 + 4x + 1}{(x+2)^2}$.", points: 3),
      _Step(text: r"$f(1) = 0$, $f'(1) = \dfrac{2}{3}$.", points: 2),
      _Step(text: r"Tangente : $y = \dfrac{2}{3}(x - 1)$.", points: 2),
    ], finalAnswer: r"$y = \dfrac{2x - 2}{3}$"),
    _num(r"$\displaystyle\int_1^e \dfrac{\ln x}{x} dx = ?$", "definite_integral", 0.5, [
      _Step(text: r"Primitive : $\dfrac{(\ln x)^2}{2}$.", points: 3),
      _Step(text: r"$\dfrac{1}{2} - 0 = \dfrac{1}{2}$.", points: 2),
    ], tolerance: 0.001, finalAnswer: r"$\dfrac{1}{2}$", difficulty: 3, points: 5),
    _mcq(r"$z = e^{i\pi/3}$. $z^6 = ?$", "complex_trig", ["-1", "1", r"$i$", "0"], 1, [
      _Step(text: r"$z^6 = e^{i \cdot 2\pi} = 1$.", points: 3),
    ], difficulty: 2, points: 3),
    _ms(r"$X \in \{0,1,2\}$ avec $P(0)=0{,}3$, $P(1)=0{,}5$, $P(2)=0{,}2$. $E(X)$ et $V(X)$ ?", "random_variables", [
      _Step(text: r"$E(X) = 0{,}9$.", points: 2),
      _Step(text: r"$E(X^2) = 1{,}3$.", points: 2),
      _Step(text: r"$V(X) = 1{,}3 - 0{,}81 = 0{,}49$.", points: 2),
    ], finalAnswer: r"$E(X) = 0{,}9$, $V(X) = 0{,}49$.", difficulty: 2),
    _ms(r"$(u_n)$ arithmetique, $u_0 = 5$, $r = 3$. $u_{20}$ et $S_{20}$ ?", "arithmetic_seq", [
      _Step(text: r"$u_{20} = 5 + 60 = 65$.", points: 2),
      _Step(text: r"$S_{20} = 21 \cdot \dfrac{5 + 65}{2} = 735$.", points: 3),
    ], finalAnswer: r"$u_{20} = 65$, $S_{20} = 735$.", difficulty: 1),
    _ms(r"$f$ continue sur $[0,4]$, $f(0) = -3$, $f(4) = 5$.", "tvi", [
      _Step(text: r"Par TVI, $\exists c \in ]0,4[$ tel que $f(c) = 0$.", points: 3),
      _Step(text: r"Pour tout $k \in [-3, 5]$, idem.", points: 2),
    ], finalAnswer: r"$f$ s'annule au moins une fois.", difficulty: 1),
    _num(r"$f'(x) = 6x - 4$, $f(0) = 2$. $f(3) = ?$", "primitives", 17, [
      _Step(text: r"$F(x) = 3x^2 - 4x + C$, $C = 2$.", points: 2),
      _Step(text: r"$f(3) = 27 - 12 + 2 = 17$.", points: 2),
    ]),
    _mcq(r"Solutions de $y' = 3y$ ?", "ode_first_order", [r"$3x + K$", r"$K e^{3x}$", r"$3 e^x$", r"$K x^3$"], 1, [
      _Step(text: r"$y' = ay$ donne $y = K e^{ax}$.", points: 3),
    ], difficulty: 1, points: 3),
    _ms(r"$f(x) = (x-1)e^x$. $f'$ et son signe ?", "deriv_rules", [
      _Step(text: r"$f'(x) = x e^x$.", points: 3),
      _Step(text: r"Signe = signe de $x$. Min en 0 : $f(0) = -1$.", points: 3),
    ], finalAnswer: r"$f'(x) = x e^x$, min en 0.", difficulty: 2),
  ]),

  _Paper(label: "SMB Math 2023 normale", examUuid: "a1b2c3d4-bbbb-0000-0000-000000000003", questions: [
    _ms(r"$(v_n)$ geometrique, $v_0 = 100$, $q = 0{,}9$. Limite et somme infinie.", "geometric_seq", [
      _Step(text: r"$v_n \to 0$ car $|q| < 1$.", points: 2),
      _Step(text: r"$S = \dfrac{100}{0{,}1} = 1000$.", points: 3),
    ], finalAnswer: r"Limite 0, somme 1000.", difficulty: 2),
    _num(r"$\displaystyle\lim_{x \to 1} \dfrac{x^3 - 1}{x - 1} = ?$", "limit_calc", 3, [
      _Step(text: r"$x^3 - 1 = (x-1)(x^2+x+1)$.", points: 2),
      _Step(text: r"Limite = 3.", points: 2),
    ]),
    _ms(r"$f(x) = \ln(x^2 + 1)$. $f'(x)$ et $\int_0^1 f'(x) dx$ ?", "deriv_rules", [
      _Step(text: r"$f'(x) = \dfrac{2x}{x^2+1}$.", points: 2),
      _Step(text: r"$\int_0^1 f' = f(1) - f(0) = \ln 2$.", points: 3),
    ], finalAnswer: r"$\ln 2$", difficulty: 2),
    _ms(r"$z_1 = 1+i$, $z_2 = 1-i$. $z_1 z_2$, $z_1 + z_2$, $|z_1|$ ?", "complex_basics", [
      _Step(text: r"$z_1 z_2 = 1 - i^2 = 2$.", points: 2),
      _Step(text: r"$z_1 + z_2 = 2$.", points: 1),
      _Step(text: r"$|z_1| = \sqrt{2}$.", points: 2),
    ], finalAnswer: r"$z_1 z_2 = 2$, $|z_1| = \sqrt{2}$.", difficulty: 1),
    _num(r"2 des. P(somme = 7) ?", "prob_basic", 0.1667, [
      _Step(text: r"6 issues favorables sur 36.", points: 2),
      _Step(text: r"$P = 1/6$.", points: 2),
    ], tolerance: 0.001, finalAnswer: r"$1/6$"),
    _ms(r"$\int_1^2 \dfrac{1}{x} dx$ et interpretation.", "integral_apps", [
      _Step(text: r"$\int_1^2 \dfrac{1}{x} dx = \ln 2$.", points: 3,
          widgetSlug: "area_curve", widgetConfig: {"function": "1/x", "a": 1.0, "b": 2.0}),
      _Step(text: r"Aire entre $y = 1/x$ et l'axe Ox sur $[1, 2]$.", points: 2),
    ], finalAnswer: r"$\ln 2$", difficulty: 2),
    _ms(r"Resoudre $y'' + 4y = 0$, $y(0) = 1$, $y'(0) = 0$.", "ode_first_order", [
      _Step(text: r"$y = A\cos(2x) + B\sin(2x)$.", points: 2),
      _Step(text: r"$y(0) = A = 1$, $y'(0) = 2B = 0$.", points: 3),
      _Step(text: r"$y(x) = \cos(2x)$.", points: 2),
    ], finalAnswer: r"$\cos(2x)$"),
    _mcq(r"Une primitive de $\sin(2x)$ ?", "primitives", [r"$\cos(2x)$", r"$-\cos(2x)$", r"$-\dfrac{\cos(2x)}{2}$", r"$\dfrac{\cos(2x)}{2}$"], 2, [
      _Step(text: r"$-\dfrac{\cos(2x)}{2} + C$.", points: 3),
    ], difficulty: 2, points: 3),
    _ms(r"$(u_n)$ croissante, majoree par 5.", "seq_convergence", [
      _Step(text: r"Theoreme de la limite monotone : converge.", points: 2),
      _Step(text: r"Limite $\ell \le 5$.", points: 2),
    ], finalAnswer: r"Converge vers $\ell \le 5$.", difficulty: 1),
    _ms(r"PGCD(84, 60) par Euclide et Bezout.", "arithmetic_seq", [
      _Step(text: r"$84 = 60 + 24$, $60 = 2 \cdot 24 + 12$, $24 = 2 \cdot 12$. PGCD = 12.", points: 3,
          widgetSlug: "euclid_visualizer", widgetConfig: {"a": 84, "b": 60}),
      _Step(text: r"$12 = 60 \cdot 3 - 84 \cdot 2$.", points: 3),
    ], finalAnswer: r"PGCD = 12, Bezout : $84(-2) + 60(3) = 12$.", difficulty: 4),
  ]),

  _Paper(label: "SMB Math 2023 rattrapage", examUuid: "a1b2c3d4-bbbb-0000-0000-000000000004", questions: [
    _num(r"$\lim_{x \to +\infty} \dfrac{e^x - 1}{e^x + 1} = ?$", "limit_calc", 1, [
      _Step(text: r"Diviser par $e^x$ : $\dfrac{1 - e^{-x}}{1 + e^{-x}}$.", points: 2),
      _Step(text: r"Limite = 1.", points: 1),
    ], points: 3),
    _ms(r"$f(x) = x e^{-x}$. Etude.", "deriv_apps", [
      _Step(text: r"$f'(x) = (1 - x)e^{-x}$.", points: 2),
      _Step(text: r"Max en $x = 1$, $f(1) = 1/e$.", points: 2),
      _Step(text: r"$f(-\infty) = -\infty$, $f(+\infty) = 0$.", points: 2),
    ], finalAnswer: r"Max en 1, asymptote $y=0$."),
    _num(r"$\int_0^{\pi/2} \cos x \, dx = ?$", "definite_integral", 1, [
      _Step(text: r"$[\sin x]_0^{\pi/2} = 1$.", points: 3),
    ], difficulty: 1, points: 3),
    _ms(r"$z = \dfrac{1+i}{1-i}$. Forme algebrique ?", "complex_basics", [
      _Step(text: r"Multiplier par $\dfrac{1+i}{1+i}$ : $z = \dfrac{(1+i)^2}{2} = \dfrac{2i}{2} = i$.", points: 4),
    ], finalAnswer: r"$z = i$", difficulty: 2),
    _mcq(r"$A, B$ independants, $P(A) = 0{,}4$, $P(B) = 0{,}3$. $P(A \cap B) = ?$", "conditional_prob", ["0,7", "0,12", "0,1", "0"], 1, [
      _Step(text: r"$P(A \cap B) = 0{,}4 \cdot 0{,}3 = 0{,}12$.", points: 3),
    ], difficulty: 1, points: 3),
    _num(r"$1 + 1/2 + 1/4 + ... = ?$", "geometric_seq", 2, [
      _Step(text: r"$S = \dfrac{1}{1 - 1/2} = 2$.", points: 3),
    ], difficulty: 1, points: 3),
    _ms(r"$f(x) = x^4 - 4x^3$. Points d'inflexion ?", "deriv_apps", [
      _Step(text: r"$f''(x) = 12x(x - 2)$.", points: 2),
      _Step(text: r"Changements en 0 et 2. Inflexions : $(0, 0)$ et $(2, -16)$.", points: 4),
    ], finalAnswer: r"$(0, 0)$ et $(2, -16)$."),
    _ms(r"$y' + 3y = 6$, $y(0) = 0$.", "ode_first_order", [
      _Step(text: r"$y = K e^{-3x} + 2$.", points: 2),
      _Step(text: r"$K = -2$, $y = 2(1 - e^{-3x})$.", points: 3),
    ], finalAnswer: r"$y = 2(1 - e^{-3x})$", difficulty: 2),
    _num(r"$|3 - 4i|^2 = ?$", "complex_basics", 25, [
      _Step(text: r"$9 + 16 = 25$.", points: 2),
    ], difficulty: 1, points: 2),
    _ms(r"$u_n = \dfrac{2n+1}{n+1}$. Limite et monotonie.", "seq_convergence", [
      _Step(text: r"$u_n = 2 - \dfrac{1}{n+1} \to 2$.", points: 3),
      _Step(text: r"Croissante.", points: 3),
    ], finalAnswer: r"Croissante, limite 2.", difficulty: 2),
  ]),

  _Paper(label: "SMB PC 2024 normale", examUuid: "a1b2c3d4-bbbb-0000-0000-000000000005", questions: [
    _ms(r"Projectile : $v_0 = 20$ m/s, $30°$, $g = 10$. Portee et $h_{max}$ ?", "kinematics", [
      _Step(text: r"$v_{0x} \approx 17{,}32$, $v_{0y} = 10$.", points: 2),
      _Step(text: r"$h_{max} = 5$ m.", points: 3,
          widgetSlug: "projectile", widgetConfig: {"v0": 20.0, "angle": 30.0}),
      _Step(text: r"Portee $\approx 34{,}64$ m.", points: 3),
    ], finalAnswer: r"$h_{max} = 5$ m, $R \approx 34{,}64$ m.", commonMistakes: [r"Oublier $T = 2 t_h$."]),
    _num(r"$F$ pour $a = 2{,}5$ m/s² sur $m = 4$ kg ?", "newtons_laws", 10, [
      _Step(text: r"$F = ma = 10$ N.", points: 3),
    ], difficulty: 1, points: 3),
    _ms(r"Condensateur 100 µF, $R = 10$ kΩ, $E = 12$ V. $\tau$ et $u_C(\tau)$ ?", "rc_rl_circuits", [
      _Step(text: r"$\tau = 1$ s.", points: 2),
      _Step(text: r"$u_C(\tau) \approx 7{,}59$ V.", points: 3,
          widgetSlug: "capacitor_charge", widgetConfig: {"R": 10000.0, "C": 0.0001, "E": 12.0}),
      _Step(text: r"99% a $5\tau = 5$ s.", points: 2),
    ], finalAnswer: r"$\tau = 1$ s, $u_C(\tau) \approx 7{,}59$ V."),
    _num(r"Onde $f = 500$ Hz, $v = 340$ m/s. $\lambda$ ?", "wave_properties", 0.68, [
      _Step(text: r"$\lambda = v/f = 0{,}68$ m.", points: 3),
    ], tolerance: 0.005, difficulty: 1, points: 3),
    _ms(r"Titrage 20 mL HCl par NaOH 0,1 mol/L. $V_E = 15$ mL. $C_a$ ?", "acid_base", [
      _Step(text: r"$n(HCl) = n(NaOH)$ a l'equivalence.", points: 1),
      _Step(text: r"$C_a = 0{,}075$ mol/L.", points: 3,
          widgetSlug: "titration_simulator", widgetConfig: {"cAcid": 0.075, "cBase": 0.1, "vAcid": 20.0}),
    ], finalAnswer: r"$C_a = 0{,}075$ mol/L", difficulty: 2),
    _ms(r"Bille 0,5 kg lachee de $h = 2$ m, $g = 10$. Vitesse au sol ?", "energy", [
      _Step(text: r"$\dfrac{1}{2}mv^2 = mgh$.", points: 2),
      _Step(text: r"$v = \sqrt{40} \approx 6{,}32$ m/s.", points: 3),
    ], finalAnswer: r"$v \approx 6{,}32$ m/s", difficulty: 2),
    _num(r"pH pour $[H_3O^+] = 5 \cdot 10^{-3}$ ?", "acid_base", 2.3, [
      _Step(text: r"$pH = -\log(5 \cdot 10^{-3}) \approx 2{,}3$.", points: 3),
    ], tolerance: 0.05, difficulty: 1, points: 3),
    _mcq(r"Anode pile Daniell ?", "redox", [r"$Cu^{2+} + 2e^- \to Cu$", r"$Zn \to Zn^{2+} + 2e^-$", r"$Zn^{2+} + 2e^- \to Zn$", r"$Cu \to Cu^{2+} + 2e^-$"], 1, [
      _Step(text: r"Anode = oxydation.", points: 1),
      _Step(text: r"$Zn \to Zn^{2+} + 2e^-$.", points: 2,
          widgetSlug: "daniell_cell", widgetConfig: {}),
    ], difficulty: 2, points: 3),
    _ms(r"RLC : $L = 0{,}5$ H, $C = 50$ µF, $R = 20$ Ω. $T_0$ et regime ?", "rlc_oscillations", [
      _Step(text: r"$T_0 = 2\pi\sqrt{LC} \approx 31{,}4$ ms.", points: 3,
          widgetSlug: "rlc", widgetConfig: {"R": 20.0, "L": 0.5, "C": 0.00005}),
      _Step(text: r"$R_c = 200$ Ω, $R < R_c$ : pseudo-periodique.", points: 3),
    ], finalAnswer: r"$T_0 \approx 31{,}4$ ms, pseudo-periodique."),
    _num(r"Rayon a 45° air vers eau ($n = 1{,}33$). $i_2$ ?", "sound_light", 32.1, [
      _Step(text: r"Snell : $\sin i_2 = \sin 45 / 1{,}33 \approx 0{,}532$.", points: 2),
      _Step(text: r"$i_2 \approx 32{,}1°$.", points: 2,
          widgetSlug: "refraction_simulator", widgetConfig: {"n1": 1.0, "n2": 1.33, "angle": 45.0}),
    ], tolerance: 0.5, difficulty: 2, points: 4),
  ]),

  _Paper(label: "SMB PC 2024 rattrapage", examUuid: "a1b2c3d4-bbbb-0000-0000-000000000006", questions: [
    _ms(r"Solide 3 kg sur plan a 25°, $\mu = 0{,}2$. $a$ ?", "newtons_laws", [
      _Step(text: r"PFD : $a = g(\sin\alpha - \mu\cos\alpha)$.", points: 2),
      _Step(text: r"$a \approx 2{,}41$ m/s².", points: 4,
          widgetSlug: "force_diagram", widgetConfig: {"mass": 3.0, "angle": 25.0, "friction": 0.2}),
    ], finalAnswer: r"$\approx 2{,}41$ m/s²"),
    _num(r"$T_{1/2} = 5$ ans. Apres 15 ans, fraction restante ?", "wave_properties", 0.125, [
      _Step(text: r"$15 / 5 = 3$ demi-vies, $1/8$.", points: 3),
    ], tolerance: 0.001, difficulty: 2, points: 3),
    _ms(r"$L = 1$ H, $C = 10$ µF. $f_0$ ?", "rlc_oscillations", [
      _Step(text: r"$f_0 = \dfrac{1}{2\pi\sqrt{LC}} \approx 50{,}3$ Hz.", points: 4),
    ], finalAnswer: r"$\approx 50{,}3$ Hz", difficulty: 2),
    _ms(r"Fil 50 cm, $I = 2$ A, $B = 0{,}3$ T perpendiculaire. Force ?", "newtons_laws", [
      _Step(text: r"$F = BIL = 0{,}3$ N.", points: 3,
          widgetSlug: "b_field_uniform", widgetConfig: {"B": 0.3, "I": 2.0}),
    ], finalAnswer: r"$0{,}3$ N", difficulty: 2),
    _mcq(r"Augmenter le rendement d'esterification ?", "redox", ["Catalyseur", "Diminuer T", "Eliminer l'eau", "Diluer"], 2, [
      _Step(text: r"Catalyseur : vitesse seulement.", points: 1),
      _Step(text: r"Eliminer l'eau deplace l'equilibre.", points: 2,
          widgetSlug: "esterification_animator", widgetConfig: {}),
    ], difficulty: 2, points: 3),
    _num(r"$[H_3O^+]$ pour pH = 5,3 ?", "acid_base", 5.0e-6, [
      _Step(text: r"$[H_3O^+] = 10^{-5{,}3} \approx 5 \cdot 10^{-6}$ mol/L.", points: 3),
    ], tolerance: 1e-7, difficulty: 2, points: 3),
    _ms(r"Pendule $T = 2$ s, $g = 9{,}81$. $L$ ?", "energy", [
      _Step(text: r"$L = \dfrac{g T^2}{4\pi^2} \approx 0{,}994$ m.", points: 3,
          widgetSlug: "pendulum_lab", widgetConfig: {"length": 1.0}),
    ], finalAnswer: r"$\approx 0{,}994$ m", difficulty: 2),
    _ms(r"Onde $f = 50$ Hz, $v = 200$ m/s. $\lambda$ ?", "wave_properties", [
      _Step(text: r"$\lambda = 4$ m.", points: 3,
          widgetSlug: "wave", widgetConfig: {"frequency": 50.0, "velocity": 200.0}),
    ], finalAnswer: r"$\lambda = 4$ m", difficulty: 2),
    _num(r"$L = 200$ mH, $R = 50$ Ω. $\tau$ ?", "rc_rl_circuits", 0.004, [
      _Step(text: r"$\tau = L/R = 4$ ms.", points: 3),
    ], tolerance: 0.0001, difficulty: 1, points: 3),
    _mcq(r"$Q_r > K$ : evolution ?", "redox", ["sens direct", "equilibre", "sens inverse", "oscille"], 2, [
      _Step(text: r"Pour baisser $Q_r$ vers $K$ : sens inverse.", points: 2,
          widgetSlug: "equilibrium_qr_k", widgetConfig: {}),
    ], difficulty: 2, points: 2),
  ]),

  _Paper(label: "SMB PC 2023 normale", examUuid: "a1b2c3d4-bbbb-0000-0000-000000000007", questions: [
    _ms(r"Mobile 5 kg, repos, $a = 3$ m/s². Distance en 4 s ?", "kinematics", [
      _Step(text: r"$x = \dfrac{1}{2}at^2 = 24$ m.", points: 3),
    ], finalAnswer: r"$24$ m", difficulty: 1),
    _num(r"Vitesse a $t = 4$ s ?", "kinematics", 12, [
      _Step(text: r"$v = at = 12$ m/s.", points: 2),
    ], difficulty: 1, points: 2),
    _ms(r"Force 10 N sur 2 kg sur 5 m. $\Delta E_c$ ?", "energy", [
      _Step(text: r"$W = F \cdot d = 50$ J.", points: 2),
      _Step(text: r"Theoreme de l'energie cinetique : $\Delta E_c = 50$ J.", points: 2),
    ], finalAnswer: r"$50$ J", difficulty: 2),
    _ms(r"Condensateur 220 µF a 20 V. Energie ?", "rc_rl_circuits", [
      _Step(text: r"$E = \dfrac{1}{2}CU^2 = 0{,}044$ J = 44 mJ.", points: 3),
    ], finalAnswer: r"$44$ mJ", difficulty: 2),
    _num(r"Solution diluee 10x a partir de pH=3 (acide fort). pH ?", "acid_base", 4, [
      _Step(text: r"Dilution 10x : pH augmente de 1.", points: 2,
          widgetSlug: "acid_base_ph", widgetConfig: {"pH": 4.0}),
      _Step(text: r"pH = 4.", points: 1),
    ], difficulty: 2, points: 3),
    _mcq(r"$K$ depend de :", "redox", ["concentrations", "volume", "temperature", "pression"], 2, [
      _Step(text: r"K depend de T uniquement.", points: 2),
    ], difficulty: 1, points: 2),
    _ms(r"C-14, $T_{1/2} = 5730$ ans. Reste apres 17190 ans ?", "wave_properties", [
      _Step(text: r"3 demi-vies, $1/8 = 12{,}5\%$.", points: 3),
    ], finalAnswer: r"$12{,}5\%$", difficulty: 2),
    _num(r"fem Daniell ?", "redox", 1.10, [
      _Step(text: r"$\Delta E^\circ = 0{,}34 - (-0{,}76) = 1{,}10$ V.", points: 2),
    ], tolerance: 0.01, difficulty: 1, points: 2),
    _ms(r"Diffraction : fente 0,1 mm, $\lambda = 600$ nm. Demi-angle ?", "sound_light", [
      _Step(text: r"$\theta \approx \lambda/a = 6 \cdot 10^{-3}$ rad $\approx 0{,}34°$.", points: 4),
    ], finalAnswer: r"$\approx 6$ mrad", difficulty: 3),
    _ms(r"$A + B \rightleftharpoons C$, $K = 4$, $[A]=[B]=0{,}5$. $[C]$ ?", "redox", [
      _Step(text: r"$K = [C]/([A][B]) \Rightarrow [C] = 1$ mol/L.", points: 3),
    ], finalAnswer: r"$1$ mol/L", difficulty: 2),
  ]),

  _Paper(label: "SMB PC 2023 rattrapage", examUuid: "a1b2c3d4-bbbb-0000-0000-000000000008", questions: [
    _ms(r"Projectile vertical $v_0 = 30$ m/s, $g = 10$. $h_{max}$ ?", "kinematics", [
      _Step(text: r"$h_{max} = v_0^2/(2g) = 45$ m.", points: 3),
    ], finalAnswer: r"$45$ m", difficulty: 1),
    _num(r"Ressort $k = 200$ N/m, $m = 2$ kg. $T$ ?", "energy", 0.628, [
      _Step(text: r"$T = 2\pi\sqrt{m/k} \approx 0{,}628$ s.", points: 3),
    ], tolerance: 0.01, difficulty: 2, points: 3),
    _ms(r"Plaques 5 mm, $U = 100$ V. Force sur un electron ?", "newtons_laws", [
      _Step(text: r"$E = U/d = 20000$ V/m.", points: 2),
      _Step(text: r"$F = eE \approx 3{,}2 \cdot 10^{-15}$ N.", points: 3,
          widgetSlug: "e_field_uniform", widgetConfig: {"voltage": 100.0, "distance": 0.005}),
    ], finalAnswer: r"$\approx 3{,}2 \cdot 10^{-15}$ N"),
    _num(r"$T = 2$ ms. Frequence ?", "wave_properties", 500, [
      _Step(text: r"$f = 1/T = 500$ Hz.", points: 2),
    ], difficulty: 1, points: 2),
    _mcq(r"Charge a 99% en :", "rc_rl_circuits", [r"$\tau$", r"$2\tau$", r"$3\tau$", r"$5\tau$"], 3, [
      _Step(text: r"$1 - e^{-5} \approx 0{,}993$.", points: 2),
    ], difficulty: 1, points: 2),
    _ms(r"NaOH 0,01 mol/L. pH ?", "acid_base", [
      _Step(text: r"$[OH^-] = 0{,}01$, $[H_3O^+] = 10^{-12}$.", points: 2),
      _Step(text: r"pH = 12.", points: 2),
    ], finalAnswer: r"$pH = 12$", difficulty: 2),
    _ms(r"Pile $Cu//Ag$. fem ? ($E_{Ag} = 0{,}80$, $E_{Cu} = 0{,}34$)", "redox", [
      _Step(text: r"$\Delta E = 0{,}80 - 0{,}34 = 0{,}46$ V.", points: 3),
    ], finalAnswer: r"$0{,}46$ V", difficulty: 2),
    _num(r"$L = 50$ mH, reactance 31,4 Ω. $f$ ?", "rlc_oscillations", 100, [
      _Step(text: r"$f = X_L/(2\pi L) \approx 100$ Hz.", points: 3),
    ], tolerance: 1, difficulty: 2, points: 3),
    _mcq(r"$2H_2 + O_2 \to 2H_2O$. Oxydant ?", "redox", [r"$H_2$", r"$O_2$", r"$H_2O$", "aucun"], 1, [
      _Step(text: r"$O_2$ gagne des electrons.", points: 2),
    ], difficulty: 1, points: 2),
    _ms(r"Oscillation A = 5 cm, T = 0,2 s. $v_{max}$ ?", "wave_properties", [
      _Step(text: r"$v_{max} = A \cdot 2\pi/T \approx 1{,}57$ m/s.", points: 3),
    ], finalAnswer: r"$\approx 1{,}57$ m/s", difficulty: 2),
  ]),
];
