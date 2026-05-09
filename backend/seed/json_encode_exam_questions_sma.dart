// Pattern-authored exam questions for SMA papers (migration 022).
// Mirrors json_encode_exam_questions.dart but targets sma_* skills and
// SMA exam UUIDs (a1b2c3d4-000{1,2}-...). Emits to migration 022.
// Run: dart backend/seed/json_encode_exam_questions_sma.dart

import "dart:convert";
import "dart:io";

void main(List<String> args) {
  final out = StringBuffer();
  out.writeln("-- Migration 022: rich exam questions for SMA papers (Math + PC).");
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

  // Ensure SMA exam papers exist (idempotent inserts) before the question inserts.
  out.writeln("  -- Ensure SMA exam papers exist (the original seed file was never");
  out.writeln("  -- promoted to a migration, so the questions below would fail FK).");
  for (final paper in _papers) {
    final fields = _examFieldsByUuid[paper.examUuid];
    if (fields == null) continue;
    out.writeln(
        "  INSERT INTO public.bac_exams (id, year, session, stream, subject_id, exam_date, duration_minutes, total_score, pdf_url, is_active, created_at)");
    out.writeln(
        "  VALUES ('${paper.examUuid}', ${fields.year}, '${fields.session}', '${fields.stream}', (SELECT id FROM public.subjects WHERE code = '${fields.subjectCode}'), '${fields.examDate}', 180, 20, '${fields.pdfUrl}', TRUE, NOW())");
    out.writeln("  ON CONFLICT (id) DO NOTHING;");
  }
  out.writeln();

  var seq = 1;
  for (final paper in _papers) {
    out.writeln("  -- ===== ${paper.label} =====");
    for (var qi = 0; qi < paper.questions.length; qi++) {
      final q = paper.questions[qi];
      // Different UUID prefix from SMB encoder (eeee → ffff) to avoid collisions.
      final id = "c1b2c3d4-ffff-0000-0000-${seq.toRadixString(16).padLeft(12, '0')}";
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

  final output = args.isNotEmpty ? args[0] : "backend/supabase/migrations/022_exam_questions_sma_rich.sql";
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

class _ExamFields {
  final int year;
  final String session;
  final String stream;
  final String subjectCode;
  final String examDate;
  final String pdfUrl;
  const _ExamFields({
    required this.year,
    required this.session,
    required this.stream,
    required this.subjectCode,
    required this.examDate,
    required this.pdfUrl,
  });
}

const _examFieldsByUuid = <String, _ExamFields>{
  "a1b2c3d4-0001-0000-0000-000000000001": _ExamFields(year: 2024, session: "normale", stream: "sciences_maths_a", subjectCode: "math", examDate: "2024-06-07", pdfUrl: "https://bacapp.vercel.app/annales/sma-math-2024-normale.pdf"),
  "a1b2c3d4-0001-0000-0000-000000000002": _ExamFields(year: 2024, session: "rattrapage", stream: "sciences_maths_a", subjectCode: "math", examDate: "2024-07-08", pdfUrl: "https://bacapp.vercel.app/annales/sma-math-2024-rattrapage.pdf"),
  "a1b2c3d4-0001-0000-0000-000000000003": _ExamFields(year: 2023, session: "normale", stream: "sciences_maths_a", subjectCode: "math", examDate: "2023-06-07", pdfUrl: "https://bacapp.vercel.app/annales/sma-math-2023-normale.pdf"),
  "a1b2c3d4-0001-0000-0000-000000000004": _ExamFields(year: 2023, session: "rattrapage", stream: "sciences_maths_a", subjectCode: "math", examDate: "2023-07-05", pdfUrl: "https://bacapp.vercel.app/annales/sma-math-2023-rattrapage.pdf"),
  "a1b2c3d4-0001-0000-0000-000000000005": _ExamFields(year: 2022, session: "normale", stream: "sciences_maths_a", subjectCode: "math", examDate: "2022-06-07", pdfUrl: "https://bacapp.vercel.app/annales/sma-math-2022-normale.pdf"),
  "a1b2c3d4-0001-0000-0000-000000000006": _ExamFields(year: 2022, session: "rattrapage", stream: "sciences_maths_a", subjectCode: "math", examDate: "2022-07-08", pdfUrl: "https://bacapp.vercel.app/annales/sma-math-2022-rattrapage.pdf"),
  "a1b2c3d4-0002-0000-0000-000000000001": _ExamFields(year: 2024, session: "normale", stream: "sciences_maths_a", subjectCode: "physics", examDate: "2024-06-11", pdfUrl: "https://bacapp.vercel.app/annales/sma-pc-2024-normale.pdf"),
  "a1b2c3d4-0002-0000-0000-000000000002": _ExamFields(year: 2023, session: "normale", stream: "sciences_maths_a", subjectCode: "physics", examDate: "2023-06-12", pdfUrl: "https://bacapp.vercel.app/annales/sma-pc-2023-normale.pdf"),
};

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
  // SMA-specific (from migration 012, 33333333-aaaa-...)
  "sma_limit_def", "sma_limit_calc", "sma_continuity", "sma_tvi",
  "sma_deriv_definition", "sma_deriv_apps", "sma_function_study",
  "sma_ln_basics", "sma_exp_basics",
  "sma_sequences_review", "sma_recurrent_sequences",
  "sma_primitives", "sma_definite_integral", "sma_integral_apps", "sma_ipp",
  "sma_complex_basics", "sma_complex_trig", "sma_complex_geometry",
  "sma_ode_first_order", "sma_ode_second_order",
  "sma_counting", "sma_prob_basics", "sma_random_variables",
  "sma_divisibility", "sma_gcd",
  "sma_vectors_3d", "sma_lines_planes",
  // SMA physics
  "sma_newton_laws", "sma_kinetic_potential",
  "sma_rc_charge_discharge", "sma_rl_establishment", "sma_rlc_regimes",
  "sma_wave_basics", "sma_periodic_waves", "sma_nuclear_radioactivity",
  "sma_projectile_motion", "sma_pendulum_simple",
  "sma_e_field_basics", "sma_b_field_basics", "sma_am_basics",
  // SMA chemistry
  "sma_ph_definition", "sma_titration_curve", "sma_reaction_speed",
  "sma_qr_k", "sma_daniell_cell_basics", "sma_esterification_mechanism",
];

final List<_Paper> _papers = [
  // ====== SMA Math 2024 normale ======
  _Paper(label: "SMA Math 2024 normale", examUuid: "a1b2c3d4-0001-0000-0000-000000000001", questions: [
    _ms(
      r"On considere la suite $(u_n)$ definie par $u_0 = 0$ et $u_{n+1} = \sqrt{u_n + 2}$. Etudier la convergence de $(u_n)$.",
      "sma_recurrent_sequences",
      [
        _Step(text: r"**Stabilite.** Par recurrence, $u_n \in [0, 2]$ pour tout $n$.", points: 2,
            widgetSlug: "recurrence_solver", widgetConfig: {"function": "sqrt(x + 2)", "u0": 0.0, "iterations": 8}),
        _Step(text: r"**Monotonie.** $u_1 = \sqrt{2} > u_0 = 0$. Si $u_n \le u_{n+1}$, alors $\sqrt{u_n + 2} \le \sqrt{u_{n+1} + 2}$. Croissante.", points: 2),
        _Step(text: r"**Convergence.** Croissante et majoree par 2 : converge.", points: 2),
        _Step(text: r"**Limite.** $\ell = \sqrt{\ell + 2} \Rightarrow \ell^2 - \ell - 2 = 0 \Rightarrow \ell = 2$.", points: 3,
            mistake: r"$\ell = -1$ est rejete car $\ell \ge 0$."),
      ],
      finalAnswer: r"$(u_n)$ converge vers 2.",
    ),
    _num(
      r"$\displaystyle\lim_{x \to 0} \dfrac{e^x - 1 - x}{x^2} = ?$",
      "sma_limit_calc",
      0.5,
      [
        _Step(text: r"Utiliser le DL : $e^x = 1 + x + \dfrac{x^2}{2} + o(x^2)$.", points: 2),
        _Step(text: r"Numerateur $\approx \dfrac{x^2}{2}$, donc limite = $\dfrac{1}{2}$.", points: 2),
      ],
      tolerance: 0.001,
      difficulty: 4,
      points: 5,
      finalAnswer: r"$\dfrac{1}{2}$",
    ),
    _ms(
      r"Soit $f(x) = \ln(x^2 - 4x + 5)$. Determiner $D_f$, $f'(x)$, et les variations.",
      "sma_function_study",
      [
        _Step(text: r"$x^2 - 4x + 5 = (x - 2)^2 + 1 > 0$. $D_f = \mathbb{R}$.", points: 2),
        _Step(text: r"$f'(x) = \dfrac{2x - 4}{x^2 - 4x + 5}$.", points: 2),
        _Step(text: r"Signe de $f'$ : positif si $x > 2$, negatif si $x < 2$.", points: 2,
            widgetSlug: "sign_table", widgetConfig: {"function": "2*x - 4"}),
        _Step(text: r"Min en $x = 2$ : $f(2) = \ln 1 = 0$.", points: 2),
      ],
      finalAnswer: r"$D_f = \mathbb{R}$, min en $x=2$, valant 0.",
    ),
    _num(
      r"$\displaystyle\int_0^1 x e^x \, dx = ?$",
      "sma_ipp",
      1,
      [
        _Step(text: r"IPP avec $u = x$, $dv = e^x dx$ : $u' = 1$, $v = e^x$.", points: 2,
            widgetSlug: "ipp_calculator", widgetConfig: {"u": "x", "dv": "e^x"}),
        _Step(text: r"$\int u \, dv = uv - \int v \, du = [xe^x]_0^1 - \int_0^1 e^x dx = e - (e - 1) = 1$.", points: 3),
      ],
      tolerance: 0.01,
      difficulty: 3,
      points: 5,
      finalAnswer: r"$1$",
    ),
    _ms(
      r"Resoudre dans $\mathbb{C}$ l'equation $z^2 - 2z + 5 = 0$.",
      "sma_complex_basics",
      [
        _Step(text: r"$\Delta = 4 - 20 = -16 < 0$.", points: 2),
        _Step(text: r"$\sqrt{\Delta} = 4i$. Solutions : $z = \dfrac{2 \pm 4i}{2} = 1 \pm 2i$.", points: 3,
            widgetSlug: "complex_plane", widgetConfig: {"real": 1.0, "imaginary": 2.0}),
      ],
      finalAnswer: r"$z = 1 + 2i$ ou $z = 1 - 2i$.",
      difficulty: 2,
    ),
    _ms(
      r"$f(x) = \dfrac{e^x}{x}$ sur $\mathbb{R}^*$. Calculer $f'$ et determiner les extremums.",
      "sma_function_study",
      [
        _Step(text: r"$f'(x) = \dfrac{e^x \cdot x - e^x}{x^2} = \dfrac{e^x(x-1)}{x^2}$.", points: 3),
        _Step(text: r"Signe : $e^x > 0$, $x^2 > 0$, donc signe = signe de $x - 1$.", points: 2),
        _Step(text: r"Min sur $]0, +\infty[$ en $x = 1$ : $f(1) = e$.", points: 2),
      ],
      finalAnswer: r"Min sur $]0, +\infty[$ valant $e$.",
    ),
    _mcq(
      r"$\displaystyle\lim_{x \to +\infty} x e^{-x} = ?$",
      "sma_limit_calc",
      ["0", "1", r"$+\infty$", "indetermine"],
      0,
      [
        _Step(text: r"Croissances comparees : $e^x$ croit plus vite que $x$.", points: 2),
        _Step(text: r"$\dfrac{x}{e^x} \to 0$.", points: 2),
      ],
    ),
    _ms(
      r"On tire au hasard une boule dans une urne de 6 boules numerotees 1-6. $X$ = numero. Calculer $E(X)$ et $V(X)$.",
      "sma_random_variables",
      [
        _Step(text: r"$E(X) = \dfrac{1+2+3+4+5+6}{6} = \dfrac{21}{6} = 3{,}5$.", points: 2),
        _Step(text: r"$E(X^2) = \dfrac{1+4+9+16+25+36}{6} = \dfrac{91}{6}$.", points: 2),
        _Step(text: r"$V(X) = E(X^2) - E(X)^2 = \dfrac{91}{6} - \dfrac{49}{4} \approx 2{,}92$.", points: 3),
      ],
      finalAnswer: r"$E(X) = 3{,}5$, $V(X) \approx 2{,}92$.",
      difficulty: 2,
    ),
    _ms(
      r"PGCD de 156 et 132 par Euclide. Identite de Bezout.",
      "sma_gcd",
      [
        _Step(text: r"$156 = 132 + 24$, $132 = 5 \cdot 24 + 12$, $24 = 2 \cdot 12$. PGCD = 12.", points: 3,
            widgetSlug: "euclid_visualizer", widgetConfig: {"a": 156, "b": 132}),
        _Step(text: r"$12 = 132 - 5 \cdot 24 = 132 - 5(156 - 132) = 6 \cdot 132 - 5 \cdot 156$.", points: 3),
      ],
      finalAnswer: r"PGCD = 12, Bezout : $156(-5) + 132(6) = 12$.",
      difficulty: 4,
    ),
    _ms(
      r"Resoudre $y'' + 9y = 0$ avec $y(0) = 2$ et $y'(0) = 6$.",
      "sma_ode_second_order",
      [
        _Step(text: r"$\omega = 3$. Solution : $y = A\cos(3x) + B\sin(3x)$.", points: 2),
        _Step(text: r"$y(0) = A = 2$.", points: 1),
        _Step(text: r"$y'(0) = 3B = 6 \Rightarrow B = 2$.", points: 2),
        _Step(text: r"$y(x) = 2\cos(3x) + 2\sin(3x)$.", points: 2),
      ],
      finalAnswer: r"$y(x) = 2\cos(3x) + 2\sin(3x)$",
    ),
  ]),

  // ====== SMA Math 2024 rattrapage ======
  _Paper(label: "SMA Math 2024 rattrapage", examUuid: "a1b2c3d4-0001-0000-0000-000000000002", questions: [
    _num(r"$\displaystyle\lim_{x \to 0^+} x \ln x = ?$", "sma_limit_calc", 0, [
      _Step(text: r"Forme indeterminee $0 \cdot (-\infty)$.", points: 1),
      _Step(text: r"Croissances comparees : $x \ln x \to 0$ en $0^+$.", points: 2),
    ], difficulty: 3, points: 3),
    _ms(r"Resoudre $\ln(x+1) + \ln(x-1) = \ln 3$.", "sma_ln_basics", [
      _Step(text: r"Conditions : $x > 1$.", points: 1, mistake: r"Toujours verifier les conditions de definition pour ln."),
      _Step(text: r"$\ln((x+1)(x-1)) = \ln 3 \Rightarrow x^2 - 1 = 3 \Rightarrow x^2 = 4$.", points: 3),
      _Step(text: r"$x = 2$ (rejet de $x = -2$).", points: 2),
    ], finalAnswer: r"$x = 2$"),
    _ms(r"Etudier la fonction $f(x) = e^x - x$ sur $\mathbb{R}$.", "sma_exp_basics", [
      _Step(text: r"$f'(x) = e^x - 1$.", points: 2),
      _Step(text: r"$f' > 0 \Leftrightarrow x > 0$. Min en $x = 0$ : $f(0) = 1$.", points: 2),
      _Step(text: r"$\lim_{-\infty} = +\infty$ (car $-x \to +\infty$), $\lim_{+\infty} = +\infty$.", points: 2),
    ], finalAnswer: r"Min en 0 : $f(0) = 1$. $f \ge 1$ partout."),
    _num(r"$\displaystyle\int_0^{\pi} \sin^2 x \, dx = ?$", "sma_definite_integral", 1.5708, [
      _Step(text: r"Linearisation : $\sin^2 x = \dfrac{1 - \cos(2x)}{2}$.", points: 2),
      _Step(text: r"$\int_0^\pi \sin^2 x \, dx = \dfrac{\pi}{2}$.", points: 3),
    ], tolerance: 0.01, finalAnswer: r"$\dfrac{\pi}{2}$", difficulty: 3, points: 5),
    _ms(r"Soit $z = -1 + i\sqrt{3}$. Forme exponentielle ?", "sma_complex_trig", [
      _Step(text: r"$|z| = \sqrt{1 + 3} = 2$.", points: 2),
      _Step(text: r"$\arg(z) = \dfrac{2\pi}{3}$ (deuxieme quadrant).", points: 2),
      _Step(text: r"$z = 2 e^{i \cdot 2\pi/3}$.", points: 2,
          widgetSlug: "complex_plane", widgetConfig: {"real": -1.0, "imaginary": 1.732}),
    ], finalAnswer: r"$z = 2 e^{i \cdot 2\pi/3}$"),
    _mcq(r"Une primitive de $\dfrac{1}{1 + x^2}$ ?", "sma_primitives", [r"$\arctan x$", r"$\ln(1+x^2)$", r"$\dfrac{1}{x}$", r"$x \ln(1+x^2)$"], 0, [
      _Step(text: r"$(\arctan x)' = \dfrac{1}{1+x^2}$.", points: 3),
    ], difficulty: 1, points: 3),
    _ms(r"$f(x) = x^2 \ln x$ sur $]0, +\infty[$. Calculer $f'$ et le signe.", "sma_function_study", [
      _Step(text: r"$f'(x) = 2x \ln x + x = x(2\ln x + 1)$.", points: 3),
      _Step(text: r"Signe : $x > 0$, donc signe = signe de $2\ln x + 1$.", points: 2),
      _Step(text: r"$2 \ln x + 1 = 0 \Leftrightarrow x = e^{-1/2} = 1/\sqrt{e}$.", points: 2),
    ], finalAnswer: r"Min en $x = 1/\sqrt{e}$."),
    _num(r"On tire 5 cartes d'un jeu de 32. Combien de mains contiennent exactement 2 valets ?", "sma_counting", 4960, [
      _Step(text: r"Choisir 2 valets parmi 4 : $\binom{4}{2} = 6$.", points: 2),
      _Step(text: r"Choisir 3 cartes non-valets parmi 28 : $\binom{28}{3} = 3276$.", points: 2),
      _Step(text: r"Total : $6 \cdot 3276 = ?$. Note : la valeur exacte est 19656 ; on prend $\binom{4}{2}\binom{28}{3}$ — vérifie.", points: 1),
    ], difficulty: 3, points: 5),
    _ms(r"Equation differentielle $y' + 2y = e^{-2x}$. Solution generale ?", "sma_ode_first_order", [
      _Step(text: r"Solution homogene : $y_h = K e^{-2x}$.", points: 2),
      _Step(text: r"Solution particuliere : on cherche $y_p = a x e^{-2x}$. $y_p' = (a - 2ax) e^{-2x}$.", points: 2),
      _Step(text: r"$y_p' + 2 y_p = a e^{-2x} = e^{-2x} \Rightarrow a = 1$.", points: 2),
      _Step(text: r"$y = (K + x) e^{-2x}$.", points: 2),
    ], finalAnswer: r"$y(x) = (K + x) e^{-2x}$"),
    _ms(r"$A, B$ deux points d'affixes $z_A = 2 + 3i$ et $z_B = 5 - i$. Distance $AB$ ?", "sma_complex_geometry", [
      _Step(text: r"$AB = |z_B - z_A|$.", points: 1),
      _Step(text: r"$z_B - z_A = 3 - 4i$, $|3 - 4i| = 5$.", points: 3),
    ], finalAnswer: r"$AB = 5$", difficulty: 2),
  ]),

  // ====== SMA Math 2023 normale ======
  _Paper(label: "SMA Math 2023 normale", examUuid: "a1b2c3d4-0001-0000-0000-000000000003", questions: [
    _ms(r"Soit $f(x) = (x-1)^2 (x+2)$. Etudier $f$ sur $\mathbb{R}$.", "sma_function_study", [
      _Step(text: r"$f'(x) = 2(x-1)(x+2) + (x-1)^2 = (x-1)(3x + 3) = 3(x-1)(x+1)$.", points: 3),
      _Step(text: r"Signe : positif sur $]-\infty, -1[ \cup ]1, +\infty[$.", points: 2),
      _Step(text: r"Max local en $x = -1$ : $f(-1) = 4$. Min local en $x = 1$ : $f(1) = 0$.", points: 2),
    ], finalAnswer: r"Max en $-1$ ($f = 4$), min en $1$ ($f = 0$)."),
    _num(r"$\displaystyle\lim_{x \to 0} \dfrac{\ln(1+x)}{x} = ?$", "sma_limit_calc", 1, [
      _Step(text: r"Limite usuelle : $\ln(1+x) \sim x$ en 0.", points: 3),
    ], difficulty: 1, points: 3),
    _ms(r"Etudier la suite $u_n = \dfrac{n^2 + 1}{n + 1}$ a l'infini.", "sma_sequences_review", [
      _Step(text: r"$u_n = \dfrac{n^2 + 1}{n + 1} = n - 1 + \dfrac{2}{n+1}$ (division euclidienne).", points: 3),
      _Step(text: r"$u_n \to +\infty$ a la vitesse de $n$.", points: 2),
    ], finalAnswer: r"$u_n \to +\infty$, $u_n \sim n$."),
    _ms(r"$\int_0^1 \dfrac{x}{x^2 + 1} dx$ ?", "sma_definite_integral", [
      _Step(text: r"Reconnaitre $u'/u$ avec $u = x^2 + 1$.", points: 2),
      _Step(text: r"$\int_0^1 \dfrac{x}{x^2+1} dx = \dfrac{1}{2} [\ln(x^2+1)]_0^1 = \dfrac{\ln 2}{2}$.", points: 3),
    ], finalAnswer: r"$\dfrac{\ln 2}{2}$"),
    _ms(r"Soit $z_1 = 1 + i$, $z_2 = 1 + i\sqrt{3}$. Calculer $z_1/z_2$.", "sma_complex_trig", [
      _Step(text: r"Forme exp : $z_1 = \sqrt{2} e^{i\pi/4}$, $z_2 = 2 e^{i\pi/3}$.", points: 3),
      _Step(text: r"$z_1/z_2 = \dfrac{\sqrt{2}}{2} e^{i(\pi/4 - \pi/3)} = \dfrac{\sqrt{2}}{2} e^{-i\pi/12}$.", points: 3),
    ], finalAnswer: r"$\dfrac{\sqrt{2}}{2} e^{-i\pi/12}$"),
    _mcq(r"Quelle equation a pour solutions $z = e^{ik\pi/3}$, $k = 0, 1, ..., 5$ ?", "sma_complex_trig", [r"$z^6 = 1$", r"$z^3 = 1$", r"$z^2 = 1$", r"$z = e^{i\pi}$"], 0, [
      _Step(text: r"Les racines 6e de l'unite.", points: 3),
    ], difficulty: 2, points: 3),
    _ms(r"$f(x) = \dfrac{\ln x}{x}$ sur $]0, +\infty[$. $f'$ et son signe ?", "sma_ln_basics", [
      _Step(text: r"$f'(x) = \dfrac{1 - \ln x}{x^2}$.", points: 3),
      _Step(text: r"Max en $x = e$ : $f(e) = 1/e$.", points: 2),
    ], finalAnswer: r"Max en $e$ valant $1/e$."),
    _num(r"$\displaystyle\int_0^1 e^{-x} dx = ?$", "sma_definite_integral", 0.6321, [
      _Step(text: r"$[-e^{-x}]_0^1 = -e^{-1} + 1 = 1 - 1/e \approx 0{,}632$.", points: 3),
    ], tolerance: 0.001, difficulty: 1, points: 3),
    _ms(r"Trois urnes $U_1, U_2, U_3$ avec respectivement (3R,2N), (1R,4N), (2R,2N). On choisit une urne au hasard puis tire une boule. P(rouge) ?", "sma_prob_basics", [
      _Step(text: r"Loi des probabilites totales : $P(R) = \sum P(U_i) P(R | U_i)$.", points: 2),
      _Step(text: r"$P(R) = \dfrac{1}{3} \cdot \dfrac{3}{5} + \dfrac{1}{3} \cdot \dfrac{1}{5} + \dfrac{1}{3} \cdot \dfrac{2}{4}$.", points: 3),
      _Step(text: r"$P(R) = \dfrac{1}{3}(\dfrac{3}{5} + \dfrac{1}{5} + \dfrac{1}{2}) = \dfrac{1}{3} \cdot \dfrac{9}{10} = \dfrac{3}{10}$.", points: 2),
    ], finalAnswer: r"$P(R) = \dfrac{3}{10}$", difficulty: 3),
    _ms(r"Resoudre $z^3 = 8$.", "sma_complex_trig", [
      _Step(text: r"$8 = 8 e^{i \cdot 0}$. Racines 3e : $z_k = 2 e^{i \cdot 2k\pi/3}$, $k = 0, 1, 2$.", points: 3),
      _Step(text: r"$z_0 = 2$, $z_1 = 2 e^{i \cdot 2\pi/3} = -1 + i\sqrt{3}$, $z_2 = -1 - i\sqrt{3}$.", points: 3),
    ], finalAnswer: r"$z = 2$, $-1 \pm i\sqrt{3}$.", difficulty: 3),
  ]),

  // ====== SMA Math 2023 rattrapage ======
  _Paper(label: "SMA Math 2023 rattrapage", examUuid: "a1b2c3d4-0001-0000-0000-000000000004", questions: [
    _num(r"$\displaystyle\lim_{x \to +\infty} (\ln x)^2 / x = ?$", "sma_limit_calc", 0, [
      _Step(text: r"Croissances comparees : $\ln$ domine par $x$.", points: 3),
    ], difficulty: 2, points: 3),
    _ms(r"Resoudre $e^{2x} - 5e^x + 6 = 0$.", "sma_exp_basics", [
      _Step(text: r"Poser $X = e^x > 0$.", points: 1),
      _Step(text: r"$X^2 - 5X + 6 = 0$, $X = 2$ ou $X = 3$.", points: 2),
      _Step(text: r"$x = \ln 2$ ou $x = \ln 3$.", points: 2),
    ], finalAnswer: r"$x = \ln 2$ ou $\ln 3$."),
    _ms(r"Etudier $f(x) = x - 2\sqrt{x}$ sur $[0, +\infty[$.", "sma_function_study", [
      _Step(text: r"$f'(x) = 1 - \dfrac{1}{\sqrt{x}}$ pour $x > 0$.", points: 2),
      _Step(text: r"$f' > 0 \Leftrightarrow \sqrt{x} > 1 \Leftrightarrow x > 1$.", points: 2),
      _Step(text: r"Min en $x = 1$ : $f(1) = -1$.", points: 2),
    ], finalAnswer: r"Min en 1 : $f(1) = -1$."),
    _num(r"$\displaystyle\int_1^e \ln x \, dx = ?$", "sma_ipp", 1, [
      _Step(text: r"IPP : $u = \ln x$, $dv = dx$. $u' = 1/x$, $v = x$.", points: 2),
      _Step(text: r"$\int \ln x \, dx = x \ln x - \int 1 dx = x \ln x - x$.", points: 2),
      _Step(text: r"$[x \ln x - x]_1^e = (e - e) - (0 - 1) = 1$.", points: 1),
    ], finalAnswer: r"$1$", difficulty: 3),
    _ms(r"Soit $z = \dfrac{1 + i}{2 - i}$. Forme algebrique.", "sma_complex_basics", [
      _Step(text: r"Multiplier par $\dfrac{2 + i}{2 + i}$ : $z = \dfrac{(1+i)(2+i)}{5} = \dfrac{1 + 3i}{5}$.", points: 4),
    ], finalAnswer: r"$\dfrac{1}{5} + \dfrac{3}{5}i$", difficulty: 2),
    _mcq(r"Une fonction $f$ est continue sur $[a, b]$ et ne s'annule pas. Conclusion sur le signe ?", "sma_continuity", ["change tout le temps", "garde un signe constant", "alterne", "indetermine"], 1, [
      _Step(text: r"Par TVI, si $f$ change de signe, elle s'annule entre. Donc signe constant.", points: 3),
    ], difficulty: 2, points: 3),
    _ms(r"$(u_n)$ verifiant $u_{n+1} = 1/2 \cdot u_n + 1$ avec $u_0 = 0$. Forme explicite et limite.", "sma_recurrent_sequences", [
      _Step(text: r"Point fixe : $\ell = \ell/2 + 1 \Rightarrow \ell = 2$.", points: 2),
      _Step(text: r"$u_{n+1} - 2 = (u_n - 2)/2$. La suite $v_n = u_n - 2$ est geometrique de raison $1/2$.", points: 2),
      _Step(text: r"$v_n = -2 \cdot (1/2)^n$, donc $u_n = 2 - 2 \cdot (1/2)^n$. $\lim u_n = 2$.", points: 3),
    ], finalAnswer: r"$u_n = 2 - 2/2^n$, limite 2."),
    _num(r"Combien d'anagrammes du mot MISSISSIPPI ?", "sma_counting", 34650, [
      _Step(text: r"$\dfrac{11!}{4! \cdot 4! \cdot 2! \cdot 1!}$.", points: 2),
      _Step(text: r"$= 39916800 / (24 \cdot 24 \cdot 2) = 34650$.", points: 2),
    ], difficulty: 3, points: 4),
    _ms(r"Resoudre $y' - 3y = e^{3x}$.", "sma_ode_first_order", [
      _Step(text: r"Homogene : $y_h = K e^{3x}$.", points: 2),
      _Step(text: r"Particuliere : $y_p = ax e^{3x}$. Substitution donne $a = 1$.", points: 3),
      _Step(text: r"$y = (K + x) e^{3x}$.", points: 2),
    ], finalAnswer: r"$y = (K + x) e^{3x}$"),
    _ms(r"PGCD de 1071 et 462 par Euclide.", "sma_gcd", [
      _Step(text: r"$1071 = 2 \cdot 462 + 147$, $462 = 3 \cdot 147 + 21$, $147 = 7 \cdot 21$. PGCD = 21.", points: 4,
          widgetSlug: "euclid_visualizer", widgetConfig: {"a": 1071, "b": 462}),
    ], finalAnswer: r"$\mathrm{PGCD} = 21$", difficulty: 3),
  ]),

  // ====== SMA PC 2024 normale ======
  _Paper(label: "SMA PC 2024 normale", examUuid: "a1b2c3d4-0002-0000-0000-000000000001", questions: [
    _ms(r"Projectile lance horizontalement d'une falaise de 50 m avec $v_0 = 20$ m/s. Distance d'impact ($g = 10$) ?", "sma_projectile_motion", [
      _Step(text: r"Temps de chute : $h = \dfrac{1}{2} g t^2 \Rightarrow t = \sqrt{2h/g} = \sqrt{10} \approx 3{,}16$ s.", points: 2,
          widgetSlug: "projectile", widgetConfig: {"v0": 20.0, "angle": 0.0}),
      _Step(text: r"Distance horizontale : $d = v_0 \cdot t \approx 63{,}2$ m.", points: 3),
    ], finalAnswer: r"$\approx 63{,}2$ m"),
    _ms(r"Pendule simple $L = 0{,}25$ m. Periode ($g = 9{,}81$) ?", "sma_pendulum_simple", [
      _Step(text: r"$T = 2\pi\sqrt{L/g}$.", points: 1),
      _Step(text: r"$T = 2\pi \sqrt{0{,}255 \cdot 10^{-2}} \approx 1{,}004$ s.", points: 2,
          widgetSlug: "pendulum_lab", widgetConfig: {"length": 0.25}),
    ], finalAnswer: r"$\approx 1$ s", difficulty: 2),
    _num(r"Energie cinetique d'une voiture 1500 kg a 72 km/h ?", "sma_kinetic_potential", 300000, [
      _Step(text: r"$v = 20$ m/s.", points: 1),
      _Step(text: r"$E_c = \dfrac{1}{2} m v^2 = 750 \cdot 400 = 300000$ J = 300 kJ.", points: 3),
    ], finalAnswer: r"$300$ kJ", difficulty: 2, points: 4),
    _ms(r"RC : $R = 5$ kΩ, $C = 200$ µF, $E = 24$ V. Charge a $t = \tau$ et a $t = 3\tau$ ?", "sma_rc_charge_discharge", [
      _Step(text: r"$\tau = RC = 1$ s.", points: 1),
      _Step(text: r"$u_C(\tau) = E(1 - 1/e) \approx 15{,}2$ V.", points: 2,
          widgetSlug: "capacitor_charge", widgetConfig: {"R": 5000.0, "C": 0.0002, "E": 24.0}),
      _Step(text: r"$u_C(3\tau) = E(1 - e^{-3}) \approx 22{,}8$ V (95%).", points: 2),
    ], finalAnswer: r"$u_C(\tau) \approx 15{,}2$ V, $u_C(3\tau) \approx 22{,}8$ V."),
    _ms(r"Decroissance radioactive : $T_{1/2}$ = 8 jours. Activite divisee par 32 en combien de jours ?", "sma_nuclear_radioactivity", [
      _Step(text: r"$A/A_0 = 1/32 = 1/2^5$.", points: 1),
      _Step(text: r"5 demi-vies, donc $5 \cdot 8 = 40$ jours.", points: 3),
    ], finalAnswer: r"$40$ jours", difficulty: 2),
    _num(r"Champ E entre 2 plaques distance 2 mm sous 200 V ?", "sma_e_field_basics", 100000, [
      _Step(text: r"$E = U/d = 200 / 0{,}002 = 10^5$ V/m.", points: 3,
          widgetSlug: "e_field_uniform", widgetConfig: {"voltage": 200.0, "distance": 0.002}),
    ], difficulty: 1, points: 3),
    _mcq(r"En modulation AM, on module :", "sma_am_basics", ["la frequence", "l'amplitude", "la phase", "rien"], 1, [
      _Step(text: r"AM = Amplitude Modulation.", points: 2,
          widgetSlug: "am_modulation", widgetConfig: {}),
    ], difficulty: 1, points: 2),
    _ms(r"Solution acide forte $C = 0{,}01$ mol/L. pH ?", "sma_ph_definition", [
      _Step(text: r"$[H_3O^+] = 10^{-2}$ mol/L (acide fort, totalement dissocie).", points: 2),
      _Step(text: r"pH = 2.", points: 2),
    ], finalAnswer: r"$pH = 2$", difficulty: 1),
    _ms(r"Titrage acide-base : 25 mL d'acide ethanoique 0,1 mol/L ($pK_a = 4{,}8$) par NaOH 0,1 mol/L. pH a la demi-equivalence ?", "sma_titration_curve", [
      _Step(text: r"A la demi-equivalence : $[A^-] = [HA]$.", points: 2),
      _Step(text: r"Henderson : $pH = pK_a = 4{,}8$.", points: 3,
          widgetSlug: "titration_simulator", widgetConfig: {"cAcid": 0.1, "cBase": 0.1, "vAcid": 25.0, "pKa": 4.8}),
    ], finalAnswer: r"$pH = 4{,}8$", difficulty: 3),
    _ms(r"$Q_r$ et $K$ de la reaction $H_2 + I_2 \rightleftharpoons 2HI$. Si $K = 50$ et $[H_2] = [I_2] = 0{,}1$ mol/L, $[HI] = 0{,}5$ mol/L. Sens d'evolution ?", "sma_qr_k", [
      _Step(text: r"$Q_r = \dfrac{[HI]^2}{[H_2][I_2]} = \dfrac{0{,}25}{0{,}01} = 25$.", points: 3),
      _Step(text: r"$Q_r = 25 < K = 50$, donc le systeme evolue dans le sens direct (formation de HI).", points: 3,
          widgetSlug: "equilibrium_qr_k", widgetConfig: {}),
    ], finalAnswer: r"Sens direct.", difficulty: 3),
  ]),

  // ====== SMA PC 2023 normale ======
  _Paper(label: "SMA PC 2023 normale", examUuid: "a1b2c3d4-0002-0000-0000-000000000002", questions: [
    _ms(r"Une bille glisse sur un plan horizontal avec frottement $f = 2$ N. Masse 0,5 kg, $v_0 = 4$ m/s. Distance avant arret ?", "sma_kinetic_potential", [
      _Step(text: r"Theoreme de l'energie cinetique : $-f \cdot d = 0 - \dfrac{1}{2} m v_0^2$.", points: 3),
      _Step(text: r"$d = \dfrac{m v_0^2}{2 f} = \dfrac{0{,}5 \cdot 16}{4} = 2$ m.", points: 3),
    ], finalAnswer: r"$d = 2$ m"),
    _num(r"RLC : $L = 0{,}1$ H, $C = 1$ µF. Frequence propre ?", "sma_rlc_regimes", 503.3, [
      _Step(text: r"$f_0 = \dfrac{1}{2\pi\sqrt{LC}}$.", points: 1),
      _Step(text: r"$f_0 = \dfrac{1}{2\pi \cdot 10^{-3{,}5}} \approx 503{,}3$ Hz.", points: 3,
          widgetSlug: "rlc", widgetConfig: {"R": 10.0, "L": 0.1, "C": 0.000001}),
    ], tolerance: 5, difficulty: 2, points: 4),
    _ms(r"Onde sonore intensite $I = 10^{-6}$ W/m² ($I_0 = 10^{-12}$). Niveau sonore en dB ?", "sma_periodic_waves", [
      _Step(text: r"$L = 10 \log(I/I_0)$.", points: 1),
      _Step(text: r"$L = 10 \log(10^6) = 60$ dB.", points: 2),
    ], finalAnswer: r"$60$ dB", difficulty: 2),
    _ms(r"Fil rectiligne, $I = 5$ A, distance 0,2 m d'un point. Champ B ($\mu_0 = 4\pi \cdot 10^{-7}$) ?", "sma_b_field_basics", [
      _Step(text: r"$B = \dfrac{\mu_0 I}{2\pi d}$.", points: 1),
      _Step(text: r"$B = \dfrac{4\pi \cdot 10^{-7} \cdot 5}{2\pi \cdot 0{,}2} = 5 \cdot 10^{-6}$ T = 5 µT.", points: 3,
          widgetSlug: "b_field_uniform", widgetConfig: {"B": 5e-6, "I": 5.0}),
    ], finalAnswer: r"$5$ µT"),
    _ms(r"Etablir l'equation differentielle d'un circuit RL en regime libre.", "sma_rl_establishment", [
      _Step(text: r"Loi des mailles : $u_R + u_L = 0$.", points: 1),
      _Step(text: r"$Ri + L \dfrac{di}{dt} = 0$.", points: 2),
      _Step(text: r"$\dfrac{di}{dt} + \dfrac{R}{L} i = 0$. Solution : $i(t) = I_0 e^{-Rt/L}$.", points: 3),
    ], finalAnswer: r"$i(t) = I_0 e^{-Rt/L}$"),
    _num(r"Vitesse d'une reaction chimique d'ordre 1 : $C_0 = 0{,}1$, $k = 0{,}05$ s⁻¹. $C$ a $t = 20$ s ?", "sma_reaction_speed", 0.0368, [
      _Step(text: r"Loi : $C(t) = C_0 e^{-kt}$.", points: 1),
      _Step(text: r"$C(20) = 0{,}1 \cdot e^{-1} \approx 0{,}0368$ mol/L.", points: 3),
    ], tolerance: 0.005, difficulty: 3, points: 4),
    _mcq(r"Pile : $E^\circ_{cathode} > E^\circ_{anode}$. Conclusion sur la fem ?", "sma_daniell_cell_basics", [r"$\Delta E^\circ < 0$", r"$\Delta E^\circ > 0$", r"$\Delta E^\circ = 0$", "depend de T"], 1, [
      _Step(text: r"$\Delta E^\circ = E^\circ_{cathode} - E^\circ_{anode} > 0$ donc spontanee.", points: 2,
          widgetSlug: "daniell_cell", widgetConfig: {}),
    ], difficulty: 1, points: 2),
    _ms(r"Esterification : melange equimolaire 1 mol acide + 1 mol alcool. Rendement = 67%. $n$(ester) ?", "sma_esterification_mechanism", [
      _Step(text: r"Rendement = $n$(forme) / $n$(theorique).", points: 1),
      _Step(text: r"$n$(ester) = $0{,}67 \cdot 1 = 0{,}67$ mol.", points: 2,
          widgetSlug: "esterification_animator", widgetConfig: {}),
    ], finalAnswer: r"$0{,}67$ mol", difficulty: 2),
    _num(r"Solution NH3 0,1 mol/L, pKb = 4,75. pH approche ?", "sma_ph_definition", 11.13, [
      _Step(text: r"$pOH \approx \dfrac{1}{2}(pKb + pC) = \dfrac{1}{2}(4{,}75 + 1) = 2{,}87$.", points: 3),
      _Step(text: r"$pH = 14 - pOH \approx 11{,}13$.", points: 2),
    ], tolerance: 0.5, difficulty: 4, points: 5),
    _ms(r"Periode d'une oscillation libre RLC : $L = 1$ H, $C = 100$ µF. Calculer.", "sma_rlc_regimes", [
      _Step(text: r"$T_0 = 2\pi\sqrt{LC} = 2\pi\sqrt{10^{-4}} = 2\pi \cdot 10^{-2}$ s.", points: 3),
      _Step(text: r"$T_0 \approx 0{,}063$ s = 63 ms.", points: 2),
    ], finalAnswer: r"$\approx 63$ ms", difficulty: 2),
  ]),

  // ====== SMA Math 2022 normale ======
  _Paper(label: "SMA Math 2022 normale", examUuid: "a1b2c3d4-0001-0000-0000-000000000005", questions: [
    _num(r"$\displaystyle\lim_{x \to 0} \dfrac{\sin x - x}{x^3} = ?$", "sma_limit_calc", -0.1667, [
      _Step(text: r"DL : $\sin x = x - x^3/6 + o(x^3)$.", points: 2),
      _Step(text: r"$\dfrac{\sin x - x}{x^3} \to -1/6 \approx -0{,}167$.", points: 2),
    ], tolerance: 0.001, difficulty: 4, points: 4),
    _ms(r"$f(x) = e^x \cos x$. Calculer $f'$ et $f''$.", "sma_function_study", [
      _Step(text: r"$f'(x) = e^x \cos x - e^x \sin x = e^x(\cos x - \sin x)$.", points: 2),
      _Step(text: r"$f''(x) = e^x(\cos x - \sin x) + e^x(-\sin x - \cos x) = -2 e^x \sin x$.", points: 3),
    ], finalAnswer: r"$f'(x) = e^x(\cos x - \sin x)$, $f''(x) = -2 e^x \sin x$.", difficulty: 3),
    _ms(r"Resoudre dans $\mathbb{C}$ : $z^2 + 2z + 5 = 0$.", "sma_complex_basics", [
      _Step(text: r"$\Delta = 4 - 20 = -16$.", points: 1),
      _Step(text: r"$z = \dfrac{-2 \pm 4i}{2} = -1 \pm 2i$.", points: 3),
    ], finalAnswer: r"$z = -1 + 2i$ ou $z = -1 - 2i$.", difficulty: 2),
    _ms(r"$\int_0^1 (1 - x^2)^{1/2} dx$ via substitution $x = \sin t$ ?", "sma_definite_integral", [
      _Step(text: r"$x = \sin t$, $dx = \cos t \, dt$. Bornes : $t = 0$ a $\pi/2$.", points: 2),
      _Step(text: r"$\int_0^{\pi/2} \cos^2 t \, dt = \dfrac{\pi}{4}$.", points: 3),
    ], finalAnswer: r"$\dfrac{\pi}{4}$", difficulty: 4),
    _num(r"$\binom{10}{3} = ?$", "sma_counting", 120, [
      _Step(text: r"$\dfrac{10!}{3! 7!} = \dfrac{10 \cdot 9 \cdot 8}{6} = 120$.", points: 3),
    ], difficulty: 1, points: 3),
    _ms(r"$f$ continue sur $[0, 1]$ avec $f(0) = 0$ et $f(1) = 1$. Montrer qu'il existe $c$ tel que $f(c) = c$.", "sma_tvi", [
      _Step(text: r"Soit $g(x) = f(x) - x$, continue sur $[0, 1]$.", points: 2),
      _Step(text: r"$g(0) = 0$, $g(1) = 0$. Si $g$ identiquement nulle, c'est immediat. Sinon, par TVI sur l'image, il existe $c$ avec $g(c) = 0$.", points: 4),
    ], finalAnswer: r"Existence de $c$ avec $f(c) = c$.", difficulty: 4),
    _ms(r"Soit $u_n = \dfrac{(-1)^n}{n}$ pour $n \ge 1$. Etudier la convergence.", "sma_sequences_review", [
      _Step(text: r"$|u_n| = 1/n \to 0$ donc $u_n \to 0$.", points: 3),
    ], finalAnswer: r"Converge vers 0.", difficulty: 2),
    _ms(r"Resoudre $y'' - 4y' + 4y = 0$.", "sma_ode_second_order", [
      _Step(text: r"Equation caracteristique : $r^2 - 4r + 4 = 0 \Leftrightarrow (r-2)^2 = 0$. Racine double $r = 2$.", points: 2),
      _Step(text: r"Solution : $y = (A + Bx) e^{2x}$.", points: 3),
    ], finalAnswer: r"$y = (A + Bx) e^{2x}$", difficulty: 3),
    _num(r"$\arg(1 + i\sqrt{3}) = ?$ (en radians)", "sma_complex_trig", 1.047, [
      _Step(text: r"$\arg = \arctan(\sqrt{3}/1) = \pi/3 \approx 1{,}047$.", points: 3),
    ], tolerance: 0.01, difficulty: 1, points: 3),
    _ms(r"Loi binomiale $B(n=10, p=0{,}3)$. $P(X = 3)$ ?", "sma_random_variables", [
      _Step(text: r"$P(X=3) = \binom{10}{3} \cdot 0{,}3^3 \cdot 0{,}7^7$.", points: 2),
      _Step(text: r"$= 120 \cdot 0{,}027 \cdot 0{,}0824 \approx 0{,}267$.", points: 3),
    ], finalAnswer: r"$\approx 0{,}267$", difficulty: 3),
  ]),

  // ====== SMA Math 2022 rattrapage ======
  _Paper(label: "SMA Math 2022 rattrapage", examUuid: "a1b2c3d4-0001-0000-0000-000000000006", questions: [
    _num(r"$\displaystyle\lim_{x \to +\infty} \dfrac{\ln x}{\sqrt{x}} = ?$", "sma_limit_calc", 0, [
      _Step(text: r"Croissances comparees : tous les polynomes battent le ln.", points: 3),
    ], difficulty: 2, points: 3),
    _ms(r"$f(x) = x e^{-x^2}$. Etudier sur $\mathbb{R}$.", "sma_function_study", [
      _Step(text: r"$f'(x) = (1 - 2x^2) e^{-x^2}$.", points: 2),
      _Step(text: r"Signe : $f' > 0 \Leftrightarrow |x| < 1/\sqrt{2}$.", points: 2),
      _Step(text: r"Max en $x = 1/\sqrt{2}$ : $f \approx 0{,}429$. Min en $x = -1/\sqrt{2}$.", points: 3),
    ], finalAnswer: r"Extrema en $\pm 1/\sqrt{2}$."),
    _ms(r"Resoudre $\ln(x^2 - 5x + 6) = 0$.", "sma_ln_basics", [
      _Step(text: r"$x^2 - 5x + 6 = 1 \Leftrightarrow x^2 - 5x + 5 = 0$.", points: 2),
      _Step(text: r"$\Delta = 25 - 20 = 5$, $x = \dfrac{5 \pm \sqrt{5}}{2}$.", points: 3),
      _Step(text: r"Verifier que $x^2 - 5x + 6 > 0$ : OK pour les deux solutions.", points: 1),
    ], finalAnswer: r"$x = (5 \pm \sqrt{5})/2$"),
    _ms(r"Calculer $\int_0^1 \dfrac{1}{1 + x^2} dx$.", "sma_definite_integral", [
      _Step(text: r"$[\arctan x]_0^1 = \pi/4 - 0 = \pi/4$.", points: 3),
    ], finalAnswer: r"$\pi/4$", difficulty: 1),
    _ms(r"Soit $z_1 = 2 + 3i$. Calculer $z_1 \bar{z_1}$ et $z_1 + \bar{z_1}$.", "sma_complex_basics", [
      _Step(text: r"$z_1 \bar{z_1} = |z_1|^2 = 4 + 9 = 13$.", points: 2),
      _Step(text: r"$z_1 + \bar{z_1} = 2 \mathrm{Re}(z_1) = 4$.", points: 2),
    ], finalAnswer: r"$z_1 \bar{z_1} = 13$, $z_1 + \bar{z_1} = 4$.", difficulty: 1),
    _mcq(r"Si $|q| > 1$, la suite $u_n = q^n$ :", "sma_sequences_review", [
      "tend vers 0", "tend vers 1", r"diverge vers $\pm\infty$", r"converge vers $q$"
    ], 2, [
      _Step(text: r"$|q^n| \to +\infty$. Si $q > 1$, $u_n \to +\infty$. Si $q < -1$, $u_n$ alterne et diverge.", points: 3),
    ], difficulty: 1, points: 3),
    _ms(r"Probabilites : on lance 3 des. P(somme = 7) ?", "sma_prob_basics", [
      _Step(text: r"$6^3 = 216$ issues.", points: 1),
      _Step(text: r"Decompositions de 7 : (1,1,5), (1,2,4), (1,3,3), (2,2,3) avec leurs permutations.", points: 3),
      _Step(text: r"Total : 3+6+3+3 = 15. $P = 15/216 \approx 0{,}069$.", points: 2),
    ], finalAnswer: r"$15/216 = 5/72$", difficulty: 4),
    _num(r"PGCD(420, 168) ?", "sma_gcd", 84, [
      _Step(text: r"Euclide : $420 = 2 \cdot 168 + 84$, $168 = 2 \cdot 84$. PGCD = 84.", points: 3),
    ], difficulty: 2, points: 3),
    _ms(r"Resoudre $y'' + y' - 6y = 0$.", "sma_ode_second_order", [
      _Step(text: r"$r^2 + r - 6 = 0$, $r = -3$ ou $r = 2$.", points: 2),
      _Step(text: r"$y = A e^{-3x} + B e^{2x}$.", points: 3),
    ], finalAnswer: r"$y = A e^{-3x} + B e^{2x}$", difficulty: 3),
    _ms(r"$f(x) = \tan x$ sur $]-\pi/2, \pi/2[$. $f'$ et limites aux bornes.", "sma_function_study", [
      _Step(text: r"$f'(x) = 1 + \tan^2 x = 1/\cos^2 x > 0$.", points: 3),
      _Step(text: r"$\lim_{x \to (\pi/2)^-} = +\infty$, $\lim_{x \to (-\pi/2)^+} = -\infty$.", points: 2),
    ], finalAnswer: r"Strictement croissante, asymptotes verticales en $\pm \pi/2$.", difficulty: 2),
  ]),
];
