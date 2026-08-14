# scene_class: Explication
# bank_entry: bk-2025-n-x2
# title: Équation à paramètre α, perpendicularités et cocyclicité
# notion: nombres-complexes-2
# session: 2025-normale-sm
# bareme: 3.5 points

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))
sys.path.insert(0, str(Path(__file__).resolve().parents[3] / "animations"))

import numpy as np
from manim import (
    Arc,
    Axes,
    Circle,
    Create,
    Dot,
    FadeIn,
    FadeOut,
    Line,
    MathTex,
    RightAngle,
    SurroundingRectangle,
    Text,
    VGroup,
    Write,
    DOWN,
    LEFT,
    ORIGIN,
    RIGHT,
    UP,
    UR,
    DL,
    UL,
    DR,
)

from bac_scene import BacScene
from bac_style import (
    BAC_ACCENT,
    BAC_ACCENT_STRONG,
    BAC_ERROR,
    BAC_INK,
    BAC_INK_MUTED,
    BAC_INK_SOFT,
    BAC_SUCCESS,
)

# ── Palette sémantique ────────────────────────────────────────────────
COL_TITLE = BAC_ACCENT_STRONG
COL_MATH = BAC_INK
COL_EMPH = BAC_ACCENT
COL_WARN = BAC_ERROR
COL_SUCCESS = BAC_SUCCESS

# ── Textes narratifs ──────────────────────────────────────────────────
NARRATION = {
    "titre": "Baccalauréat National 2025, Session Normale, Sciences Mathématiques. Exercice deux : équation à paramètre alpha, perpendicularités et cocyclicité.",
    "intro": "L'exercice résout une équation du second degré exponentielle, puis démontre par les quotients d'affixes une série d'orthogonalités et la cocyclicité de quatre points.",
    "q1a": "Question 1a : Calcul du discriminant Delta alpha en reconnaissant l'identité remarquable 1 moins 2i au carré.",
    "q1b": "Question 1b : Détermination des solutions a et b puis tri par comparaison des modules 2 puissance alpha et 2 puissance alpha plus 1.",
    "q2": "Question 2 : Simplification du quotient b sur a égal à 2i, imaginaire pur constant indépendant de alpha.",
    "q3a": "Question 3a : Calcul du quotient h sur b moins a égal à moins lambda sur lambda carré plus 1 fois i, prouvant l'orthogonalité de OH et AB.",
    "q3b": "Question 3b : Calcul de h moins a sur b moins a égal à 1 sur lambda carré plus 1, réel prouvant l'alignement des points H, A et B.",
    "q4a": "Question 4a : Simplification du rapport des affixes des milieux n sur m moins a donnant directement moins lambda i.",
    "q4b": "Question 4b : En déduire la perpendicularité des droites OJ et AI et l'égalité des distances OJ égal valeur absolue de lambda fois AI.",
    "q4c": "Question 4c : Par le théorème du triangle rectangle inscrit, K et H voient le segment IJ sous un angle droit : K, I, H et J sont donc cocycliques.",
    "q4d": "Question 4d : Calcul de n moins m sur a prouvant la perpendicularité des droites IJ et OA.",
    "bilan": "Synthèse de l'exercice : discriminant exponentiel, projections orthogonales et cocyclicité par angles droits.",
}


class Explication(BacScene):
    def construct(self):
        # ── Titre & Introduction ──────────────────────────────────────
        self.chapitre_titre()
        self.chapitre_intro()

        # ── Partie I : Équation (E_alpha) ─────────────────────────────
        self.chapitre_q1a()
        self.chapitre_q1b()
        self.chapitre_q2()

        # ── Partie II : Droite (AB) et projeté H ───────────────────────
        self.chapitre_q3a()
        self.chapitre_q3b()

        # ── Partie II (suite) : Milieux I, J, point K et cocyclicité ──
        self.chapitre_q4a()
        self.chapitre_q4b()
        self.chapitre_q4c()
        self.chapitre_q4d()

        # ── Bilan ──────────────────────────────────────────────────────
        self.chapitre_fin()

    # ── Titre ─────────────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("01-titre")
        titre = Text(
            "Bac 2025 — Session Normale (SM)",
            font_size=28,
            color=COL_TITLE,
            weight="BOLD",
        )
        soustitre = Text(
            "Exercice 2 : Équation à paramètre α, orthogonalités et cocyclicité",
            font_size=18,
            color=COL_MATH,
        )
        badge = Text("3,5 points", font_size=16, color=COL_EMPH)
        grp = VGroup(titre, soustitre, badge).arrange(DOWN, buff=0.25)
        grp.move_to(ORIGIN)

        narration = Text(NARRATION["titre"], font_size=16, color=BAC_INK_SOFT)
        narration.to_edge(DOWN, buff=0.3)

        self.play(FadeIn(grp, shift=UP * 0.3), FadeIn(narration))
        self.pose(1.5)
        self.play(FadeOut(grp), FadeOut(narration))

    # ── Introduction ──────────────────────────────────────────────────
    def chapitre_intro(self):
        self.etape("02-intro")
        self.titre_zone = Text(
            "Plan de résolution · Nombres Complexes",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        plan = VGroup(
            Text(
                "1. Partie I : Équation (E_α), discriminant Δ_α et solutions a, b avec b/a = 2i",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "2. Partie II : Point H (1/h = 1/a + 1/b), perpendicularité (OH) ⊥ (AB) et alignement H, A, B",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "3. Milieux I et J : rapport n/(m-a) = -2i et orthogonalité (OJ) ⊥ (AI)",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "4. Cocyclicité de K, I, H, J sur le cercle de diamètre [IJ] et (IJ) ⊥ (OA)",
                font_size=16,
                color=COL_MATH,
            ),
        ).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        plan.next_to(self.titre_zone, DOWN, buff=0.4, aligned_edge=LEFT)

        narration = Text(NARRATION["intro"], font_size=16, color=BAC_INK_SOFT)
        narration.to_edge(DOWN, buff=0.3)

        self.play(Write(self.titre_zone), FadeIn(plan, shift=RIGHT * 0.2), FadeIn(narration))
        self.pose(1.8)
        self.play(FadeOut(self.titre_zone), FadeOut(plan), FadeOut(narration))

    # ── Question 1.a ──────────────────────────────────────────────────
    def chapitre_q1a(self):
        self.etape("03-q1a-discriminant")
        self.titre_zone = Text(
            "Partie I — Question 1.a (0,25 pt)",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Vérifier que le discriminant de (E_α) est Δ_α = [2^α e^(iα) (1 - 2i)]^2.",
            font_size=16,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q1a"], font_size=16, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        eq1 = MathTex(
            r"\Delta_\alpha = \big[2^\alpha e^{i\alpha}(1+2i)\big]^2 - 4(1)\big(i\,2^{2\alpha+1}e^{i2\alpha}\big)",
            font_size=24,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"\Delta_\alpha = 2^{2\alpha}e^{i2\alpha}\Big[(1+2i)^2 - 4i\times2\Big] = 2^{2\alpha}e^{i2\alpha}\big[(1+4i-4) - 8i\big]",
            font_size=23,
            color=COL_MATH,
        )
        eq3 = MathTex(
            r"\Delta_\alpha = 2^{2\alpha}e^{i2\alpha}(-3 - 4i) \quad \text{et} \quad (1-2i)^2 = 1 - 4i - 4 = -3-4i",
            font_size=23,
            color=COL_EMPH,
        )
        eq4 = MathTex(
            r"\Delta_\alpha = \big[2^\alpha e^{i\alpha}(1 - 2i)\big]^2",
            font_size=26,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3, eq4).arrange(DOWN, buff=0.22, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.25, aligned_edge=LEFT)

        cadre = SurroundingRectangle(eq4, color=COL_SUCCESS, buff=0.12)

        self.play(Write(eq1))
        self.play(Write(eq2))
        self.play(Write(eq3))
        self.play(Write(eq4), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Question 1.b ──────────────────────────────────────────────────
    def chapitre_q1b(self):
        self.etape("04-q1b-racines")
        self.titre_zone = Text(
            "Partie I — Question 1.b (0,5 pt)",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "En déduire les deux solutions a et b de (E_α) avec |a| < |b|.",
            font_size=16,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q1b"], font_size=16, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        eq1 = MathTex(
            r"z = \frac{2^\alpha e^{i\alpha}(1+2i) \pm 2^\alpha e^{i\alpha}(1-2i)}{2} = 2^\alpha e^{i\alpha}\,\frac{(1+2i)\pm(1-2i)}{2}",
            font_size=23,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"\text{Signe } + :\; z = 2^\alpha e^{i\alpha} \qquad \text{Signe } - :\; z = 2^\alpha e^{i\alpha}(2i) = 2^{\alpha+1} e^{i\left(\alpha+\frac{\pi}{2}\right)}",
            font_size=23,
            color=COL_MATH,
        )
        eq3 = MathTex(
            r"|2^\alpha e^{i\alpha}| = 2^\alpha < 2^{\alpha+1} = \left|2^{\alpha+1} e^{i(\alpha+\pi/2)}\right| \quad (\forall \alpha \in \mathbb{R})",
            font_size=23,
            color=COL_EMPH,
        )
        eq4 = MathTex(
            r"a = 2^\alpha e^{i\alpha} \quad \text{et} \quad b = 2^{\alpha+1} e^{i\left(\alpha+\frac{\pi}{2}\right)}",
            font_size=25,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3, eq4).arrange(DOWN, buff=0.22, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.22, aligned_edge=LEFT)

        cadre = SurroundingRectangle(eq4, color=COL_SUCCESS, buff=0.12)

        self.play(Write(eq1))
        self.play(Write(eq2))
        self.play(Write(eq3))
        self.play(Write(eq4), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Question 2 ────────────────────────────────────────────────────
    def chapitre_q2(self):
        self.etape("05-q2-rapport-imaginaire")
        self.titre_zone = Text(
            "Partie I — Question 2 (0,25 pt)",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Vérifier que b / a est un imaginaire pur.",
            font_size=16,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q2"], font_size=16, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        eq1 = MathTex(
            r"\frac{b}{a} = \frac{2^{\alpha+1} e^{i(\alpha+\pi/2)}}{2^\alpha e^{i\alpha}} = 2\,e^{i\pi/2}",
            font_size=25,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"2\,e^{i\pi/2} = 2i",
            font_size=26,
            color=COL_EMPH,
        )
        eq3 = MathTex(
            r"\frac{b}{a} = 2i \in i\mathbb{R}^* \quad (\text{imaginaire pur constant, indépendant de } \alpha)",
            font_size=24,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.3, aligned_edge=LEFT)

        cadre = SurroundingRectangle(eq3, color=COL_SUCCESS, buff=0.12)

        self.play(Write(eq1))
        self.play(Write(eq2))
        self.play(Write(eq3), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Question 3.a ──────────────────────────────────────────────────
    def chapitre_q3a(self):
        self.etape("06-q3a-perpendicularite-OH-AB")
        self.titre_zone = Text(
            "Partie II — Question 3.a (0,5 pt)",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Montrer que h / (b - a) = -[λ / (λ^2 + 1)] i puis que (OH) ⊥ (AB).",
            font_size=16,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q3a"], font_size=16, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        # Colonne de calculs à gauche
        eq1 = MathTex(
            r"\frac{1}{h} = \frac{1}{a} + \frac{1}{b} = \frac{a+b}{ab} \implies h = \frac{ab}{a+b}",
            font_size=22,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"\frac{h}{b-a} = \frac{ab}{(a+b)(b-a)} = \frac{ab}{b^2-a^2}",
            font_size=22,
            color=COL_MATH,
        )
        eq3 = MathTex(
            r"b = \lambda i a \implies ab = \lambda i a^2 \quad \text{et} \quad b^2 - a^2 = -a^2(\lambda^2+1)",
            font_size=22,
            color=COL_MATH,
        )
        eq4 = MathTex(
            r"\frac{h}{b-a} = \frac{\lambda i a^2}{-a^2(\lambda^2+1)} = -\left(\frac{\lambda}{\lambda^2+1}\right)i",
            font_size=23,
            color=COL_EMPH,
        )
        eq5 = MathTex(
            r"\frac{h}{b-a} \in i\mathbb{R}^* \implies (OH) \perp (AB)",
            font_size=24,
            color=COL_SUCCESS,
        )

        calc_grp = VGroup(eq1, eq2, eq3, eq4, eq5).arrange(DOWN, buff=0.18, aligned_edge=LEFT)
        calc_grp.next_to(enonce, DOWN, buff=0.2, aligned_edge=LEFT)

        cadre = SurroundingRectangle(eq5, color=COL_SUCCESS, buff=0.12)

        # Figure géométrique à droite (triangle OAB rectangle en O avec b/a = 2i, et hauteur OH)
        axes = Axes(
            x_range=[-0.5, 2.5, 1],
            y_range=[-0.5, 3.0, 1],
            x_length=4.0,
            y_length=3.5,
            axis_config={"color": BAC_INK_SOFT, "stroke_width": 1.2, "include_ticks": True},
            tips=False,
        ).to_edge(RIGHT, buff=0.8).shift(DOWN * 0.3)

        self.play(Create(axes))
        labels_axes = self.graduations(axes, x_vals=[1, 2], y_vals=[1, 2])

        p_O = axes.c2p(0, 0)
        p_A = axes.c2p(1.5, 0)
        p_B = axes.c2p(0, 2.4)
        # H est le projeté orthogonal de O sur (AB) : h = ab/(a+b)
        # Avec a = 1.5, b = 2.4 i : h = (1.5*2.4i)/(1.5+2.4i) = 3.6i(1.5-2.4i)/(1.5^2+2.4^2)
        # Re(h) = 3.6*2.4 / (2.25+5.76) = 8.64 / 8.01 = 1.078
        # Im(h) = 3.6*1.5 / 8.01 = 5.4 / 8.01 = 0.674
        p_H = axes.c2p(1.08, 0.67)

        seg_OA = Line(p_O, p_A, color=COL_MATH, stroke_width=2)
        seg_OB = Line(p_O, p_B, color=COL_MATH, stroke_width=2)
        seg_AB = Line(p_A, p_B, color=COL_MATH, stroke_width=2)
        seg_OH = Line(p_O, p_H, color=COL_WARN, stroke_width=2.5)

        dot_O = Dot(p_O, color=COL_MATH, radius=0.06)
        lbl_O = MathTex("O", font_size=16, color=COL_MATH).next_to(dot_O, DL, buff=0.08)

        dot_A = Dot(p_A, color=COL_MATH, radius=0.06)
        lbl_A = MathTex("A(a)", font_size=16, color=COL_MATH).next_to(dot_A, DR, buff=0.08)

        dot_B = Dot(p_B, color=COL_MATH, radius=0.06)
        lbl_B = MathTex("B(b)", font_size=16, color=COL_MATH).next_to(dot_B, UL, buff=0.08)

        dot_H = Dot(p_H, color=COL_WARN, radius=0.06)
        lbl_H = MathTex("H(h)", font_size=16, color=COL_WARN).next_to(dot_H, UR, buff=0.08)

        self.play(
            Create(seg_OA), Create(seg_OB), Create(seg_AB), Create(seg_OH),
            FadeIn(dot_O), FadeIn(lbl_O),
            FadeIn(dot_A), FadeIn(lbl_A),
            FadeIn(dot_B), FadeIn(lbl_B),
            FadeIn(dot_H), FadeIn(lbl_H),
        )

        self.play(Write(eq1))
        self.play(Write(eq2))
        self.play(Write(eq3))
        self.play(Write(eq4))
        self.play(Write(eq5), Create(cadre))
        self.pose(1.5)

        fig_grp = VGroup(axes, labels_axes, seg_OA, seg_OB, seg_AB, seg_OH, dot_O, lbl_O, dot_A, lbl_A, dot_B, lbl_B, dot_H, lbl_H)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(calc_grp), FadeOut(cadre), FadeOut(fig_grp), FadeOut(narration))

    # ── Question 3.b ──────────────────────────────────────────────────
    def chapitre_q3b(self):
        self.etape("07-q3b-alignement-H-A-B")
        self.titre_zone = Text(
            "Partie II — Question 3.b (0,5 pt)",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Montrer que (h - a) / (b - a) = 1 / (λ^2 + 1) puis en déduire que H, A, B sont alignés.",
            font_size=16,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q3b"], font_size=16, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        eq1 = MathTex(
            r"h - a = \frac{ab}{a+b} - a = \frac{ab - a(a+b)}{a+b} = \frac{-a^2}{a+b}",
            font_size=24,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"\frac{h-a}{b-a} = \frac{-a^2}{(a+b)(b-a)} = \frac{-a^2}{b^2-a^2}",
            font_size=24,
            color=COL_MATH,
        )
        eq3 = MathTex(
            r"\text{Or } b^2 - a^2 = -a^2(\lambda^2+1) \implies \frac{h-a}{b-a} = \frac{-a^2}{-a^2(\lambda^2+1)} = \frac{1}{\lambda^2+1}",
            font_size=24,
            color=COL_EMPH,
        )
        eq4 = MathTex(
            r"\frac{h-a}{b-a} \in \mathbb{R} \implies H,\, A,\, B \text{ sont alignés}",
            font_size=25,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3, eq4).arrange(DOWN, buff=0.22, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.25, aligned_edge=LEFT)

        cadre = SurroundingRectangle(eq4, color=COL_SUCCESS, buff=0.12)

        self.play(Write(eq1))
        self.play(Write(eq2))
        self.play(Write(eq3))
        self.play(Write(eq4), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Question 4.a ──────────────────────────────────────────────────
    def chapitre_q4a(self):
        self.etape("08-q4a-rapport-n-m-a")
        self.titre_zone = Text(
            "Partie II — Question 4.a (0,5 pt)",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Soient I(m) milieu de [OH] et J(n) milieu de [HB]. Montrer que n / (m - a) = -λ i.",
            font_size=16,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q4a"], font_size=16, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        eq1 = MathTex(
            r"m = \frac{h}{2} \quad \text{et} \quad n = \frac{h+b}{2}",
            font_size=24,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"n = \frac{\frac{ab}{a+b}+b}{2} = \frac{b(2a+b)}{2(a+b)} \qquad m-a = \frac{\frac{ab}{a+b}-2a}{2} = \frac{-a(2a+b)}{2(a+b)}",
            font_size=23,
            color=COL_MATH,
        )
        eq3 = MathTex(
            r"\frac{n}{m-a} = \frac{b(2a+b)}{-a(2a+b)} = -\frac{b}{a}",
            font_size=24,
            color=COL_EMPH,
        )
        eq4 = MathTex(
            r"\frac{n}{m-a} = -\lambda i",
            font_size=26,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3, eq4).arrange(DOWN, buff=0.22, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.22, aligned_edge=LEFT)

        cadre = SurroundingRectangle(eq4, color=COL_SUCCESS, buff=0.12)

        self.play(Write(eq1))
        self.play(Write(eq2))
        self.play(Write(eq3))
        self.play(Write(eq4), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Question 4.b ──────────────────────────────────────────────────
    def chapitre_q4b(self):
        self.etape("09-q4b-perpendicularite-OJ-AI")
        self.titre_zone = Text(
            "Partie II — Question 4.b (0,5 pt)",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "En déduire que (OJ) ⊥ (AI) et que OJ = |λ| AI.",
            font_size=16,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q4b"], font_size=16, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        eq1 = MathTex(
            r"\frac{n - 0}{m - a} = \frac{\mathrm{aff}(\vec{OJ})}{\mathrm{aff}(\vec{AI})} = -\lambda i",
            font_size=24,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"\frac{\mathrm{aff}(\vec{OJ})}{\mathrm{aff}(\vec{AI})} \in i\mathbb{R}^* \implies (OJ) \perp (AI)",
            font_size=24,
            color=COL_SUCCESS,
        )
        eq3 = MathTex(
            r"\left|\frac{n}{m-a}\right| = |-\lambda i| = |\lambda| \implies \frac{OJ}{AI} = |\lambda| \implies OJ = |\lambda|\,AI",
            font_size=24,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.3, aligned_edge=LEFT)

        cadre1 = SurroundingRectangle(eq2, color=COL_SUCCESS, buff=0.12)
        cadre2 = SurroundingRectangle(eq3, color=COL_SUCCESS, buff=0.12)

        self.play(Write(eq1))
        self.play(Write(eq2), Create(cadre1))
        self.play(Write(eq3), Create(cadre2))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre1), FadeOut(cadre2), FadeOut(narration))

    # ── Question 4.c ──────────────────────────────────────────────────
    def chapitre_q4c(self):
        self.etape("10-q4c-cocyclicite")
        self.titre_zone = Text(
            "Partie II — Question 4.c (0,25 pt)",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Soit K = (OJ) ∩ (AI). Montrer que K, I, H et J sont cocycliques.",
            font_size=16,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q4c"], font_size=16, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        # Colonne de raisonnement à gauche
        eq1 = MathTex(
            r"K \in (AI) \text{ et } K \in (OJ) \implies (KI) \perp (KJ) \implies \widehat{IKJ} = \frac{\pi}{2}",
            font_size=22,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"\text{Théorème du cercle circonscrit : } K \text{ appartient au cercle de diamètre } [IJ]",
            font_size=21,
            color=COL_EMPH,
        )
        eq3 = MathTex(
            r"\frac{m-h}{n-h} = \frac{-h/2}{(b-h)/2} = \dots = -\frac{a}{b} = \frac{i}{\lambda} \implies \widehat{IHJ} = \frac{\pi}{2}",
            font_size=21,
            color=COL_MATH,
        )
        eq4 = MathTex(
            r"H \text{ appartient aussi au cercle de diamètre } [IJ]",
            font_size=21,
            color=COL_EMPH,
        )
        eq5 = MathTex(
            r"K,\, I,\, H,\, J \text{ sont cocycliques (sur le cercle de diamètre } [IJ]\text{)}",
            font_size=23,
            color=COL_SUCCESS,
        )

        calc_grp = VGroup(eq1, eq2, eq3, eq4, eq5).arrange(DOWN, buff=0.18, aligned_edge=LEFT)
        calc_grp.next_to(enonce, DOWN, buff=0.2, aligned_edge=LEFT)

        cadre = SurroundingRectangle(eq5, color=COL_SUCCESS, buff=0.12)

        # Figure géométrique à droite (cercle de diamètre [IJ] passant par K et H)
        axes = Axes(
            x_range=[-0.2, 1.8, 1],
            y_range=[-0.2, 2.2, 1],
            x_length=4.2,
            y_length=3.5,
            axis_config={"color": BAC_INK_SOFT, "stroke_width": 1.2, "include_ticks": True},
            tips=False,
        ).to_edge(RIGHT, buff=0.8).shift(DOWN * 0.3)

        self.play(Create(axes))
        labels_axes = self.graduations(axes, x_vals=[1], y_vals=[1, 2])

        # Points
        p_I = axes.c2p(0.54, 0.34) # Milieu de [OH]
        p_H = axes.c2p(1.08, 0.67) # H
        p_J = axes.c2p(0.54, 1.54) # Milieu de [HB] avec B=(0, 2.4)
        p_K = axes.c2p(0.38, 1.08) # Intersection (OJ) et (AI)

        # Centre et rayon du diamètre [IJ]
        center_IJ = (p_I + p_J) / 2
        r_IJ = np.linalg.norm(p_J - p_I) / 2
        cercle = Circle(radius=r_IJ, color=COL_SUCCESS, stroke_width=2.5).move_to(center_IJ)

        dot_I = Dot(p_I, color=COL_EMPH, radius=0.06)
        lbl_I = MathTex("I", font_size=16, color=COL_EMPH).next_to(dot_I, DOWN, buff=0.06)

        dot_J = Dot(p_J, color=COL_EMPH, radius=0.06)
        lbl_J = MathTex("J", font_size=16, color=COL_EMPH).next_to(dot_J, UP, buff=0.06)

        dot_H = Dot(p_H, color=COL_WARN, radius=0.06)
        lbl_H = MathTex("H", font_size=16, color=COL_WARN).next_to(dot_H, RIGHT, buff=0.06)

        dot_K = Dot(p_K, color=COL_TITLE, radius=0.06)
        lbl_K = MathTex("K", font_size=16, color=COL_TITLE).next_to(dot_K, LEFT, buff=0.06)

        seg_IJ = Line(p_I, p_J, color=BAC_INK_SOFT, stroke_width=1.5, stroke_opacity=0.7)

        self.play(
            Create(cercle), Create(seg_IJ),
            FadeIn(dot_I), FadeIn(lbl_I),
            FadeIn(dot_J), FadeIn(lbl_J),
            FadeIn(dot_H), FadeIn(lbl_H),
            FadeIn(dot_K), FadeIn(lbl_K),
        )

        self.play(Write(eq1))
        self.play(Write(eq2))
        self.play(Write(eq3))
        self.play(Write(eq4))
        self.play(Write(eq5), Create(cadre))
        self.pose(1.5)

        fig_grp = VGroup(axes, labels_axes, cercle, seg_IJ, dot_I, lbl_I, dot_J, lbl_J, dot_H, lbl_H, dot_K, lbl_K)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(calc_grp), FadeOut(cadre), FadeOut(fig_grp), FadeOut(narration))

    # ── Question 4.d ──────────────────────────────────────────────────
    def chapitre_q4d(self):
        self.etape("11-q4d-perpendicularite-IJ-OA")
        self.titre_zone = Text(
            "Partie II — Question 4.d (0,25 pt)",
            font_size=20,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.4).to_edge(LEFT, buff=0.6)

        enonce = Text(
            "Montrer que les droites (IJ) et (OA) sont perpendiculaires.",
            font_size=16,
            color=BAC_INK_SOFT,
        ).next_to(self.titre_zone, DOWN, aligned_edge=LEFT, buff=0.2)

        narration = Text(NARRATION["q4d"], font_size=16, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)
        self.play(Write(self.titre_zone), FadeIn(enonce), FadeIn(narration))

        eq1 = MathTex(
            r"n - m = \frac{h+b}{2} - \frac{h}{2} = \frac{b}{2}",
            font_size=25,
            color=COL_MATH,
        )
        eq2 = MathTex(
            r"\frac{n - m}{a - 0} = \frac{b/2}{a} = \frac{1}{2}\,\frac{b}{a} = \frac{1}{2}(\lambda i) = \frac{\lambda}{2} i",
            font_size=24,
            color=COL_MATH,
        )
        eq3 = MathTex(
            r"\frac{\mathrm{aff}(\vec{IJ})}{\mathrm{aff}(\vec{OA})} = \frac{\lambda}{2} i \in i\mathbb{R}^* \implies (IJ) \perp (OA)",
            font_size=25,
            color=COL_SUCCESS,
        )

        grp = VGroup(eq1, eq2, eq3).arrange(DOWN, buff=0.25, aligned_edge=LEFT)
        grp.next_to(enonce, DOWN, buff=0.3, aligned_edge=LEFT)

        cadre = SurroundingRectangle(eq3, color=COL_SUCCESS, buff=0.12)

        self.play(Write(eq1))
        self.play(Write(eq2))
        self.play(Write(eq3), Create(cadre))
        self.pose(1.5)
        self.play(FadeOut(self.titre_zone), FadeOut(enonce), FadeOut(grp), FadeOut(cadre), FadeOut(narration))

    # ── Bilan ──────────────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("12-bilan")
        titre = Text(
            "Bilan de l'exercice — Bac 2025 (SM)",
            font_size=24,
            color=COL_TITLE,
            weight="BOLD",
        ).to_edge(UP, buff=0.6)

        points = VGroup(
            Text(
                "• Équation : Δ_α = [2^α e^(iα) (1-2i)]^2  =>  a = 2^α e^(iα) et b = 2^(α+1) e^(i(α+π/2))",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "• Rapport b/a = 2i (imaginaire pur indépendant de α)",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "• Point H (1/h = 1/a + 1/b) : (OH) ⊥ (AB) et H ∈ (AB) (projeté orthogonal de O sur (AB))",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "• Milieux I et J : n/(m-a) = -2i  =>  (OJ) ⊥ (AI) et OJ = 2 AI",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "• Cocyclicité : K et H voient [IJ] sous un angle droit  =>  K, I, H, J cocycliques",
                font_size=16,
                color=COL_MATH,
            ),
            Text(
                "• Orthogonalité (IJ) ⊥ (OA) : (n-m)/a = i (imaginaire pur)",
                font_size=16,
                color=COL_TITLE,
            ),
        ).arrange(DOWN, buff=0.25, aligned_edge=LEFT).next_to(titre, DOWN, buff=0.35, aligned_edge=LEFT).to_edge(LEFT, buff=0.8)

        cadre = SurroundingRectangle(points, color=COL_TITLE, buff=0.18)

        narration = Text(NARRATION["bilan"], font_size=16, color=BAC_INK_SOFT).to_edge(DOWN, buff=0.3)

        self.play(Write(titre), FadeIn(points), Create(cadre), FadeIn(narration))
        self.pose(2.0)
        self.play(FadeOut(titre), FadeOut(points), FadeOut(cadre), FadeOut(narration))
