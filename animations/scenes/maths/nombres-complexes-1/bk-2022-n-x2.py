"""Explication animée v4 — Bac 2022 SN (SExp), Exercice 2 : nombres complexes.

Source de vérité : content/maths/nombres-complexes-1/bank.yaml,
entrée bk-2022-n-x2 (vérifiée, AlloSchool NS22F, Exercice 2, 3 points).
a = -1 - i√3, b = -1 + i√3 (b = conjugué de a), d = -2, c = -4 (D et C
sont RÉELS, sur l'axe des réels).

Sept questions, un même fil : 1) translation de vecteur OA (D = t(B)) ;
2) rotation de centre D — pas O — d'angle 2π/3 (C = R(B)) ; 3) forme
trigonométrique du quotient (b-c)/(a-c) ; 4) déduction par relecture
(pas de recalcul) ; 5) équation d'un cercle, M sur deux cercles à la
fois ; 6) z + z̄ à partir du module et du conjugué ; 7) unicité du point
d'intersection — qui se révèle être exactement le point C déjà placé.

Standard v4 = DESIGN.md : règle du zéro implicite (chaque geste
algébrique = une étape), couche de sens avant chaque calcul (vecteur
qui glisse pour la translation, arc de trajectoire + angle dessiné pour
la rotation décentrée, cercle = distance fixe au centre), signaling
dans la formule, zones d'écran dures.

Rendu : ../../render.sh scenes/maths/nombres-complexes-1/bk-2022-n-x2.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[3]))

import numpy as np
from manim import (
    Angle,
    Arc,
    Circle,
    ComplexPlane,
    Create,
    DashedLine,
    Dot,
    FadeIn,
    FadeOut,
    Line,
    MathTex,
    MoveAlongPath,
    SurroundingRectangle,
    Text,
    VGroup,
    Write,
    DOWN,
    LEFT,
    RIGHT,
    UP,
    PI,
)

from bac_scene import BacScene
from bac_style import (
    BAC_ACCENT,
    BAC_ACCENT_LIGHT,
    BAC_ACCENT_STRONG,
    BAC_BORDER,
    BAC_INK,
    BAC_INK_MUTED,
    BAC_INK_SOFT,
    BAC_SUCCESS,
    BAC_WARNING,
)

# Identité visuelle stable des QUATRE points de la figure (DESIGN.md
# §2) : A sarcelle, B or (couple conjugué, couleurs contrastées pour
# que le miroir se voie), D gris (réel, sur l'axe), C vert (conclusion).
COL_PT_A, COL_PT_B = BAC_ACCENT, BAC_WARNING
COL_PT_D, COL_PT_C = BAC_INK_MUTED, BAC_SUCCESS

NARRATION = {
    "titre": "Exercice deux du bac deux mille vingt-deux, session normale, "
    "sciences expérimentales : nombres complexes, sur trois points. Une "
    "translation, une rotation, un quotient trigonométrique, et deux "
    "cercles qui se touchent en un seul point.",
    "intro": "On donne deux points, A et B, d'affixes conjuguées l'une de "
    "l'autre, et une translation t de vecteur OA, déjà nommée dans "
    "l'énoncé.",
    "plan": "On place A et B dans le plan complexe : B est le reflet de A "
    "dans l'axe réel, puisque son affixe en est le conjugué.",
    "q1": "Question un. Une translation ajoute l'affixe du vecteur : D est "
    "l'image de B par t, de vecteur OA. On vérifie que d vaut moins deux.",
    "q2": "Question deux. Une rotation de centre D, pas O cette fois, "
    "multiplie l'écart au centre par e puissance i thêta. On vérifie que "
    "c vaut moins quatre.",
    "q3": "Question trois. On calcule le quotient de deux différences "
    "d'affixes et on l'écrit sous forme trigonométrique, avec la règle du "
    "module et de l'argument d'un quotient.",
    "q4": "Question quatre. On ne recalcule rien : on relit les questions "
    "deux et trois pour déduire une égalité entre deux quotients.",
    "q5": "Question cinq. Un point M appartient à deux cercles à la fois. "
    "L'équation d'un cercle, c'est une distance fixe au centre : on "
    "traduit cette appartenance en une égalité de modules.",
    "q6": "Question six. On combine module et conjugué pour prouver que z "
    "plus z barre vaut moins huit.",
    "q7": "Question sept. Deux conditions sur x et y ne laissent qu'une "
    "seule solution : les deux cercles se touchent en un unique point, "
    "qui se trouve être exactement le point C déjà placé.",
}

A_AFF = complex(-1, -np.sqrt(3))
B_AFF = complex(-1, np.sqrt(3))
D_AFF = complex(-2, 0)
C_AFF = complex(-4, 0)


class Explication(BacScene):
    def construct(self):
        self.chapitre_titre()
        self.chapitre_intro()
        plan, a_dot, a_lbl, b_dot, b_lbl = self.chapitre_plan()
        d_dot, d_lbl = self.chapitre_q1(plan, a_dot, b_dot)
        c_dot, c_lbl = self.chapitre_q2(plan, b_dot, d_dot, d_lbl)
        self.chapitre_q3(plan, a_dot, b_dot, c_dot)
        self.chapitre_q4()
        gamma, gamma_p = self.chapitre_q5(plan, d_dot)
        self.chapitre_q6()
        self.chapitre_q7(plan, c_dot, c_lbl, gamma, gamma_p)
        self.chapitre_fin()

    # ── Ouverture ──────────────────────────────────────────────────
    def chapitre_titre(self):
        self.etape("titre")
        self.carte_titre(
            "BAC 2022 · SESSION NORMALE · SCIENCES EXP.",
            "Nombres complexes",
            "Exercice 2 — 3 points · sujet officiel NS22F",
        )

    # ── Les données de l'énoncé ─────────────────────────────────────
    def chapitre_intro(self):
        self.etape("intro-donnees")
        entete = Text(
            "On considère les points A et B d'affixes respectives :",
            font_size=28,
        ).shift(2.1 * UP)
        aff_a = MathTex(r"a = -1 - i\sqrt{3}", font_size=40, color=COL_PT_A)
        aff_b = MathTex(r"b = -1 + i\sqrt{3}", font_size=40, color=COL_PT_B)
        ligne = VGroup(aff_a, aff_b).arrange(RIGHT, buff=1.6).next_to(
            entete, DOWN, buff=0.7
        )
        trans = Text(
            "Et t, la translation de vecteur OA.", font_size=26, color=BAC_INK_SOFT,
        ).next_to(ligne, DOWN, buff=0.6)
        self.play(Write(entete), run_time=1.2)
        self.play(FadeIn(ligne, shift=0.2 * UP), run_time=1.2)
        self.play(FadeIn(trans, shift=0.15 * UP), run_time=0.8)
        self.legende(
            "Deux points, deux affixes — et une translation déjà nommée.",
            "On les retrouvera question après question.",
        )
        self.pose(3.0)
        self.efface_legende()
        self.play(FadeOut(VGroup(entete, ligne, trans)))

    # ── Le plan complexe : A et B, couple conjugué ──────────────────
    def chapitre_plan(self):
        self.etape("plan-axes")
        plan = ComplexPlane(
            x_range=[-5, 5, 2],
            y_range=[-5, 5, 2],
            x_length=5.6,
            y_length=5.6,
            background_line_style={
                "stroke_color": BAC_BORDER,
                "stroke_width": 1,
                "stroke_opacity": 0.8,
            },
            axis_config={
                "stroke_color": BAC_INK_MUTED,
                "stroke_width": 2,
                "include_ticks": False,
                "include_tip": False,
            },
        ).shift(3.6 * RIGHT + 0.35 * UP)
        o_lbl = MathTex("O", font_size=30, color=BAC_INK_SOFT).next_to(
            plan.n2p(0), DOWN + LEFT, buff=0.12
        )
        re_lbl = Text("axe réel", font_size=18, color=BAC_INK_MUTED).next_to(
            plan.n2p(4.4), UP, buff=0.12
        )
        im_lbl = Text("axe imaginaire", font_size=18, color=BAC_INK_MUTED).next_to(
            plan.n2p(3.5j), RIGHT, buff=0.16
        )
        self.play(Create(plan, run_time=2.2), FadeIn(o_lbl))
        self.play(FadeIn(re_lbl), FadeIn(im_lbl))
        self._graduations(plan, [-4, 2, 4], [-4, -2, 2, 4])
        self.legende(
            "Le plan complexe : horizontal = partie réelle,",
            "vertical = partie imaginaire. Chaque affixe, un point.",
        )
        self.pose(3.0)

        self.etape("plan-A")
        guide_x = DashedLine(plan.n2p(0), plan.n2p(-1), color=COL_PT_A, stroke_width=3)
        guide_y = DashedLine(plan.n2p(-1), plan.n2p(A_AFF), color=COL_PT_A, stroke_width=3)
        a_dot = Dot(plan.n2p(A_AFF), color=COL_PT_A, radius=0.08)
        # A est juste à GAUCHE de l'axe imaginaire : étiquette à gauche,
        # sinon l'axe la traverse (défaut d'audit).
        a_lbl = MathTex("A(a)", font_size=34, color=COL_PT_A).next_to(
            a_dot, LEFT, buff=0.14
        )
        self.play(Create(guide_x))
        self.play(Create(guide_y))
        self.play(FadeIn(a_dot, scale=1.6), Write(a_lbl))
        self.legende(
            "Pour a = −1 − i√3 : un pas vers la GAUCHE, puis un peu",
            "plus d'un pas et demi vers le BAS (−√3 ≈ −1,73).",
        )
        self.pose(3.2)
        self.play(FadeOut(guide_x), FadeOut(guide_y))

        self.etape("plan-B")
        b_dot = Dot(plan.n2p(B_AFF), color=COL_PT_B, radius=0.08)
        b_lbl = MathTex("B(b)", font_size=34, color=COL_PT_B).next_to(
            b_dot, LEFT, buff=0.14
        )
        sym = DashedLine(
            plan.n2p(A_AFF), plan.n2p(B_AFF), color=BAC_INK_MUTED, stroke_width=2
        )
        self.play(FadeIn(b_dot, scale=1.6), Write(b_lbl), Create(sym))
        self.legende(
            "b = −1 + i√3 : le REFLET de a dans l'axe réel. Même partie",
            "réelle, partie imaginaire opposée — B est le miroir de A.",
        )
        self.pose(3.2)
        self.play(FadeOut(sym), FadeOut(VGroup(re_lbl, im_lbl)))
        self.efface_legende()
        return plan, a_dot, a_lbl, b_dot, b_lbl

    # ── Q1 : la translation ─────────────────────────────────────────
    def chapitre_q1(self, plan, a_dot, b_dot):
        badge = self.bandeau_question("1)", "0,5 pt")
        self.ardoise()
        origine = plan.n2p(0)

        self.etape("q1-enonce")
        but = MathTex(
            r"D = t(B), \quad \text{Vérifier que } d = -2", font_size=38
        )
        self.ecrit(but)
        self.legende(
            "t est la translation de vecteur OA. D est l'image de B",
            "par t : on veut vérifier que son affixe d vaut −2.",
        )
        self.pose(3.2)

        self.etape("q1-outil-translation")
        outil = MathTex(r"t:\ z \longmapsto z + a", font_size=40)
        self.ecrit(outil, buff=0.55)
        cadre = SurroundingRectangle(outil, color=BAC_ACCENT, buff=0.2, corner_radius=0.1)
        vec = Line(origine, plan.n2p(A_AFF), color=COL_PT_A, stroke_width=3).add_tip(
            tip_width=0.16, tip_length=0.16
        )
        self.play(Create(cadre), Create(vec))
        self.legende(
            "Translater par le vecteur OA, c'est AJOUTER l'affixe a.",
            "Le vecteur tracé porte cette addition.",
        )
        self.pose(3.4)

        self.etape("q1-translater")
        vec2 = vec.copy().set_color(BAC_ACCENT_LIGHT)
        decalage = plan.n2p(B_AFF) - plan.n2p(0)
        self.play(vec2.animate.shift(decalage), run_time=2.6)
        d_dot = Dot(plan.n2p(B_AFF), color=COL_PT_D, radius=0.08)
        self.add(d_dot)
        self.play(d_dot.animate.move_to(plan.n2p(D_AFF)), run_time=1.8)
        eq1 = MathTex(r"d = b + a", font_size=42)
        self.ecrit(eq1, buff=0.55)
        self.legende(
            "Le MÊME vecteur OA, recopié à partir de B — B glisse",
            "le long de ce rail jusqu'à D. Translater, c'est ajouter a.",
        )
        self.pose(3.4)

        self.etape("q1-substituer")
        eq2 = MathTex(r"d = (-1+i\sqrt{3}) + (-1-i\sqrt{3})", font_size=38)
        self.ecrit(eq2, buff=0.5)
        self.legende("On remplace b et a par leurs valeurs, terme à terme.")
        self.pose(2.8)

        self.etape("q1-conclusion")
        eq3 = MathTex(r"d = -2", font_size=46, color=BAC_ACCENT_STRONG)
        self.ecrit(eq3, buff=0.55)
        d_lbl = MathTex("D(d)", font_size=34, color=COL_PT_D).next_to(
            d_dot, DOWN, buff=0.15
        )
        self.play(Write(d_lbl))
        self.legende(
            "Les parties imaginaires s'annulent : il reste −1−1 = −2.",
            "d = −2 — vérifié. D est RÉEL : il vit sur l'axe horizontal.",
        )
        self.pose(3.4)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, cadre, vec, vec2)))
        return d_dot, d_lbl

    # ── Q2 : la rotation, de centre D (pas O) ────────────────────────
    def chapitre_q2(self, plan, b_dot, d_dot, d_lbl):
        badge = self.bandeau_question("2)", "0,5 pt")
        self.ardoise()
        d_pos = plan.n2p(D_AFF)

        self.etape("q2-enonce")
        txt = Text("R : rotation de centre D et d'angle 2π/3.", font_size=26)
        self.ecrit(txt)
        but = MathTex(r"C = R(B), \quad \text{Montrer que } c = -4", font_size=38)
        self.ecrit(but, buff=0.5)
        self.legende(
            "R tourne autour de D, pas de O — un nouveau centre.",
            "C est l'image de B par R.",
        )
        self.pose(3.4)

        self.etape("q2-sens-rotation")
        self.nettoie(garder=1)
        rayon = float(np.linalg.norm(plan.n2p(B_AFF) - d_pos))
        angle_b = float(np.angle(B_AFF - D_AFF))
        arc = Arc(
            radius=rayon, start_angle=angle_b, angle=2 * PI / 3,
            arc_center=d_pos, color=BAC_ACCENT_LIGHT, stroke_width=3,
        )
        c_dot = Dot(plan.n2p(B_AFF), color=COL_PT_C, radius=0.08)
        self.play(Create(arc, run_time=3.2), MoveAlongPath(c_dot, arc, run_time=3.2))
        outil = MathTex(r"z' - \omega = e^{i\theta}(z-\omega)", font_size=36)
        self.ecrit(outil, buff=0.6)
        self.legende(
            "Que SIGNIFIE une rotation de centre D ? On retranche D,",
            "on tourne d'un angle θ, on rajoute D. Le rayon DB = DC",
            "ne change pas — regarde l'arc.",
        )
        self.pose(3.8)

        self.etape("q2-angle")
        db_r = Line(d_pos, plan.n2p(B_AFF), color=BAC_WARNING, stroke_width=3)
        dc_r = Line(d_pos, plan.n2p(C_AFF), color=BAC_WARNING, stroke_width=3)
        ang = Angle(db_r, dc_r, radius=0.55, other_angle=False, color=BAC_ACCENT, stroke_width=3)
        milieu = ang.point_from_proportion(0.5)
        direction = (milieu - d_pos) / np.linalg.norm(milieu - d_pos)
        ang_lbl = MathTex(r"\tfrac{2\pi}{3}", font_size=26, color=BAC_ACCENT).move_to(
            milieu + 0.42 * direction
        )
        self.play(Create(db_r), Create(dc_r))
        self.play(Create(ang), FadeIn(ang_lbl))
        self.legende(
            "Le voici, l'angle de la rotation : entre DB et DC,",
            "exactement 2π/3 — la même distance DB = DC des deux côtés.",
        )
        self.pose(3.6)

        self.etape("q2-calcul-b-moins-d")
        self.nettoie(garder=1)
        m1 = MathTex(r"b - d = (-1+i\sqrt{3}) - (-2) = 1 + i\sqrt{3}", font_size=34)
        self.ecrit(m1, buff=0.55)
        self.legende("On calcule d'abord b moins d, le vecteur de départ.")
        self.pose(2.8)

        self.etape("q2-calcul-exponentielle")
        m2 = MathTex(
            r"e^{i\frac{2\pi}{3}} = \cos\dfrac{2\pi}{3} + i\sin\dfrac{2\pi}{3}"
            r" = -\dfrac12 + \dfrac{\sqrt{3}}{2}\,i",
            font_size=32,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "Le facteur de rotation, à l'angle donné 2π/3 :",
            "valeurs remarquables, −1/2 et √3/2.",
        )
        self.pose(3.2)

        self.etape("q2-calcul-produit")
        m3 = MathTex(
            r"c - d = \left(-\dfrac12+\dfrac{\sqrt{3}}{2}\,i\right)(1+i\sqrt{3}) = -2",
            font_size=30,
        )
        self.ecrit(m3, buff=0.5)
        self.legende(
            "On développe ce produit, on remplace i² par −1 :",
            "les parties imaginaires s'annulent, il reste −2.",
        )
        self.pose(3.2)

        self.etape("q2-conclusion")
        m4 = MathTex(r"c = d - 2 = -4", font_size=46, color=BAC_ACCENT_STRONG)
        self.ecrit(m4, buff=0.55)
        c_lbl = MathTex("C(c)", font_size=34, color=COL_PT_C).next_to(
            c_dot, DOWN + LEFT, buff=0.12
        )
        self.play(Write(c_lbl))
        self.legende(
            "On rajoute d = −2 : c = −4. C est réel lui aussi,",
            "plus loin sur l'axe — vérifié.",
        )
        self.pose(3.2)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, arc, db_r, dc_r, ang, ang_lbl)))
        return c_dot, c_lbl

    # ── Q3 : forme trigonométrique d'un quotient ─────────────────────
    def chapitre_q3(self, plan, a_dot, b_dot, c_dot):
        badge = self.bandeau_question("3)", "0,5 pt")
        self.ardoise()

        self.etape("q3-enonce")
        but = MathTex(
            r"\text{Forme trigonométrique de}\ \dfrac{b-c}{a-c}", font_size=38
        )
        self.ecrit(but)
        self.legende(
            "On combine deux différences d'affixes en un quotient,",
            "et on cherche sa forme trigonométrique.",
        )
        self.pose(3.0)

        self.etape("q3-sens-vecteurs")
        c_pos = plan.n2p(C_AFF)
        vec_ca = Line(c_pos, plan.n2p(A_AFF), color=COL_PT_A, stroke_width=3).add_tip(
            tip_width=0.14, tip_length=0.14
        )
        vec_cb = Line(c_pos, plan.n2p(B_AFF), color=COL_PT_B, stroke_width=3).add_tip(
            tip_width=0.14, tip_length=0.14
        )
        lbl_ca = MathTex(r"\overrightarrow{CA}", font_size=24, color=COL_PT_A).next_to(
            vec_ca.get_center(), DOWN, buff=0.12
        )
        lbl_cb = MathTex(r"\overrightarrow{CB}", font_size=24, color=COL_PT_B).next_to(
            vec_cb.get_center(), UP, buff=0.12
        )
        self.play(Create(vec_ca), Create(vec_cb))
        self.play(FadeIn(lbl_ca), FadeIn(lbl_cb))
        self.legende(
            "b − c et a − c sont les affixes des vecteurs CB et CA.",
            "Leur quotient a un module et un argument à calculer.",
        )
        self.pose(3.4)
        self.play(FadeOut(VGroup(vec_ca, vec_cb, lbl_ca, lbl_cb)))

        self.etape("q3-calcul-differences")
        m1 = MathTex(r"b-c = (-1+i\sqrt{3})-(-4) = 3+i\sqrt{3}", font_size=34)
        self.ecrit(m1, buff=0.5)
        m2 = MathTex(r"a-c = (-1-i\sqrt{3})-(-4) = 3-i\sqrt{3}", font_size=34)
        self.ecrit(m2, buff=0.4)
        self.legende("On calcule séparément les deux différences.")
        self.pose(3.0)

        self.etape("q3-sens-quotient")
        regle = MathTex(
            r"\left|\dfrac{z}{z'}\right| = \dfrac{|z|}{|z'|}"
            r"\qquad \arg\dfrac{z}{z'} = \arg z - \arg z'",
            font_size=30,
        )
        self.ecrit(regle, buff=0.55)
        cadre_regle = self.encadre()
        self.legende(
            "L'outil : module d'un quotient = quotient des modules ;",
            "argument d'un quotient = DIFFÉRENCE des arguments.",
        )
        self.pose(3.6)

        self.etape("q3-calcul-modules")
        m3 = MathTex(
            r"|b-c| = \sqrt{3^2+3} = 2\sqrt{3}, \qquad |a-c| = \sqrt{3^2+3} = 2\sqrt{3}",
            font_size=28,
        )
        self.ecrit(m3, buff=0.5)
        self.legende("Les deux modules valent 2√3 — ils sont égaux.")
        self.pose(3.0)

        self.etape("q3-calcul-arguments")
        m4 = MathTex(
            r"\arg(b-c) = \dfrac{\pi}{6}, \qquad \arg(a-c) = -\dfrac{\pi}{6}",
            font_size=32,
        )
        self.ecrit(m4, buff=0.5)
        self.legende(
            "Valeurs remarquables lues sur cos et sin :",
            "π/6 pour b − c, son opposé −π/6 pour a − c.",
        )
        self.pose(3.4)

        self.etape("q3-calcul-quotient")
        m5 = MathTex(
            r"\left|\dfrac{b-c}{a-c}\right| = \dfrac{2\sqrt{3}}{2\sqrt{3}} = 1,"
            r"\ \ \arg\dfrac{b-c}{a-c} = \dfrac{\pi}{6}-\left(-\dfrac{\pi}{6}\right) = \dfrac{\pi}{3}",
            font_size=24,
        )
        self.ecrit(m5, buff=0.5)
        self.legende("Module 1, argument π/6 moins moins π/6, soit π/3.")
        self.pose(3.2)

        self.etape("q3-conclusion")
        concl = MathTex(
            r"\dfrac{b-c}{a-c} = \cos\dfrac{\pi}{3} + i\sin\dfrac{\pi}{3} = e^{i\pi/3}",
            font_size=40, color=BAC_ACCENT_STRONG,
        )
        self.ecrit(concl, buff=0.55)
        self.encadre(couleur=BAC_WARNING, buff=0.15)
        self.legende(
            "La forme trigonométrique demandée. On la retient :",
            "elle sert telle quelle à la question suivante.",
        )
        self.pose(3.4)
        self.efface_legende()
        self.nettoie()  # emporte lignes ET cadres fusionnés (encadre)
        self.play(FadeOut(badge))

    # ── Q4 : déduction par relecture, pas par recalcul ───────────────
    def chapitre_q4(self):
        badge = self.bandeau_question("4)", "0,5 pt")
        self.ardoise()

        self.etape("q4-enonce")
        but = MathTex(
            r"\left(\dfrac{b-c}{a-c}\right)^2 \overset{?}{=} \dfrac{c-d}{b-d}",
            font_size=38,
        )
        self.ecrit(but)
        self.legende(
            "On ne recalcule rien : on RELIT ce qu'on a déjà démontré",
            "aux questions 2 et 3.",
        )
        self.pose(3.4)

        self.etape("q4-carre")
        m1 = MathTex(
            r"\left(\dfrac{b-c}{a-c}\right)^2 = \left(e^{i\pi/3}\right)^2 = e^{i2\pi/3}",
            font_size=38,
        )
        self.ecrit(m1, buff=0.55)
        self.legende(
            "La question 3 donne (b−c)/(a−c) = e^(iπ/3) : au carré,",
            "l'argument DOUBLE — on obtient e^(i2π/3).",
        )
        self.pose(3.4)

        self.etape("q4-relecture")
        m2 = MathTex(
            r"c-d = e^{i2\pi/3}(b-d) \implies \dfrac{c-d}{b-d} = e^{i2\pi/3}",
            font_size=36,
        )
        self.ecrit(m2, buff=0.55)
        self.legende(
            "C'est exactement la relation de rotation de la question 2,",
            "relue sous forme de quotient (b ≠ d).",
        )
        self.pose(3.4)

        self.etape("q4-conclusion")
        concl = MathTex(
            r"\left(\dfrac{b-c}{a-c}\right)^2 = e^{i2\pi/3} = \dfrac{c-d}{b-d}",
            font_size=38, color=BAC_SUCCESS,
        )
        self.ecrit(concl, buff=0.55)
        self.legende(
            "Les deux membres valent le même nombre e^(i2π/3) :",
            "l'égalité est déduite — 0,5 point.",
        )
        self.pose(3.6)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))

    # ── Q5 : équation d'un cercle, deux appartenances à la fois ─────
    def chapitre_q5(self, plan, d_dot):
        badge = self.bandeau_question("5)", "0,25 pt")
        self.ardoise()

        self.etape("q5-enonce")
        txt1 = Text("(Γ) : centre D, rayon 2.  (Γ') : centre O, rayon 4.", font_size=24)
        txt2 = Text("M, d'affixe z, appartient aux deux cercles.", font_size=24)
        grp = VGroup(txt1, txt2).arrange(DOWN, aligned_edge=LEFT, buff=0.15)
        self.ecrit(grp)
        but = MathTex(r"\text{Vérifier que } |z+2| = 2", font_size=38)
        self.ecrit(but, buff=0.5)
        r_unit = float(np.linalg.norm(plan.n2p(1) - plan.n2p(0)))
        gamma = Circle(radius=2 * r_unit, color=BAC_ACCENT_LIGHT, stroke_width=2.5).move_to(
            plan.n2p(D_AFF)
        )
        gamma_p = Circle(radius=4 * r_unit, color=BAC_WARNING, stroke_width=2.5).move_to(
            plan.n2p(0)
        )
        self.play(Create(gamma, run_time=1.6))
        self.play(Create(gamma_p, run_time=2.0))
        self.legende(
            "Deux cercles : (Γ) autour de D, (Γ') autour de O. M vit",
            "sur les deux à la fois — on traduit ça en équations.",
        )
        self.pose(3.6)

        self.etape("q5-sens-cercle")
        m_aff = D_AFF + 2 * complex(np.cos(2.5), np.sin(2.5))
        m_dot = Dot(plan.n2p(m_aff), color=BAC_INK_SOFT, radius=0.06)
        m_lbl = MathTex("M", font_size=28, color=BAC_INK_SOFT).next_to(m_dot, UP, buff=0.08)
        rayon_seg = Line(
            plan.n2p(D_AFF), plan.n2p(m_aff), color=BAC_ACCENT_LIGHT, stroke_width=3
        )
        self.play(FadeIn(m_dot, scale=1.6), Write(m_lbl), Create(rayon_seg))
        self.legende(
            "Que SIGNIFIE l'équation d'un cercle ? |z − ω| = rayon :",
            "TOUS les points à distance fixe du centre ω.",
        )
        self.pose(3.6)
        self.play(FadeOut(VGroup(m_dot, m_lbl, rayon_seg)))

        self.etape("q5-calcul")
        m1 = MathTex(
            r"M \in (\Gamma) \iff |z-d| = 2 \iff |z-(-2)| = 2 \iff |z+2| = 2",
            font_size=28,
        )
        self.ecrit(m1, buff=0.5)
        self.legende(
            "d = −2 : on remplace, et le signe se retourne. |z+2| = 2",
            "— vérifié, 0,25 point.",
        )
        self.pose(3.4)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(badge))
        return gamma, gamma_p

    # ── Q6 : z + z̄ à partir du module et du conjugué ─────────────────
    def chapitre_q6(self):
        badge = self.bandeau_question("6)", "0,5 pt")
        self.ardoise()

        self.etape("q6-enonce")
        rappel = MathTex(
            r"|z+2| = 2 \ \ (\Gamma), \qquad |z| = 4 \ \ (\Gamma')", font_size=34
        )
        self.ecrit(rappel)
        but = MathTex(r"\text{Prouver que } z + \bar{z} = -8", font_size=38)
        self.ecrit(but, buff=0.5)
        self.legende(
            "M est aussi sur (Γ') : |z| = 4, gratuit. On combine",
            "les deux informations pour prouver z + z̄ = −8.",
        )
        self.pose(3.6)

        self.etape("q6-outil-module-carre")
        outil = MathTex(r"|Z|^2 = Z\,\bar{Z}", font_size=34, color=BAC_INK_SOFT)
        outil.to_edge(RIGHT, buff=1.6).shift(1.0 * UP)
        cadre = SurroundingRectangle(outil, color=BAC_BORDER, buff=0.15, corner_radius=0.08)
        self.play(FadeIn(outil), Create(cadre))
        m1 = MathTex(
            r"|z+2|^2 = (z+2)(\bar z+2) = z\bar z + 2z+2\bar z+4",
            font_size=30,
        )
        self.ecrit(m1, buff=0.55)
        self.legende(
            "Outil : Z fois Z barre égale |Z| au carré. On développe",
            "(z+2) fois son conjugué.",
        )
        self.pose(3.6)

        self.etape("q6-substituer")
        m2 = MathTex(r"|z+2|^2 = |z|^2 + 2(z+\bar z)+4 = 2^2 = 4", font_size=30)
        self.ecrit(m2, buff=0.5)
        m3 = MathTex(r"16 + 2(z+\bar z) + 4 = 4", font_size=32)
        self.ecrit(m3, buff=0.4)
        self.legende("z fois z̄ redevient |z|² = 16 ; le carré du rayon vaut 4.")
        self.pose(3.4)

        self.etape("q6-conclusion")
        concl = MathTex(r"z+\bar z = -8", font_size=46, color=BAC_ACCENT_STRONG)
        self.ecrit(concl, buff=0.55)
        self.legende("On isole : z + z̄ = −8. 0,5 point.")
        self.pose(3.0)
        self.efface_legende()
        self.nettoie()
        self.play(FadeOut(VGroup(badge, cadre, outil)))

    # ── Q7 : unicité — le point retrouvé est C ───────────────────────
    def chapitre_q7(self, plan, c_dot, c_lbl, gamma, gamma_p):
        badge = self.bandeau_question("7)", "0,25 pt")
        self.ardoise()

        self.etape("q7-x")
        but = Text("Un seul point peut vérifier les deux cercles à la fois.", font_size=24)
        self.ecrit(but)
        m1 = MathTex(
            r"z+\bar z = -8,\ \ z = x+iy \implies 2x=-8 \implies x=-4", font_size=32
        )
        self.ecrit(m1, buff=0.5)
        self.legende("z + z̄ = 2× partie réelle. On pose z = x + iy : x = −4.")
        self.pose(3.4)

        self.etape("q7-y")
        m2 = MathTex(
            r"|z| = 4 \implies x^2+y^2=16 \implies 16+y^2=16 \implies y=0",
            font_size=30,
        )
        self.ecrit(m2, buff=0.5)
        self.legende(
            "On reporte x = −4 dans |z| = 4 : y = 0, un seul couple",
            "possible.",
        )
        self.pose(3.4)

        self.etape("q7-conclusion")
        concl = MathTex(r"z = -4", font_size=48, color=BAC_ACCENT_STRONG)
        self.ecrit(concl, buff=0.6)
        self.play(
            gamma.animate.set_color(BAC_SUCCESS),
            gamma_p.animate.set_color(BAC_SUCCESS),
            run_time=1.0,
        )
        cadre = self.entoure(c_dot, BAC_WARNING, buff=0.18)
        self.legende(
            "Un point unique, d'affixe −4 — EXACTEMENT le point C",
            "déjà placé. Les cercles se touchent en ce seul point.",
        )
        self.pose(4.0)
        self.efface_legende()
        self.play(*[FadeOut(m) for m in self.mobjects])

    # ── Fermeture ─────────────────────────────────────────────────
    def chapitre_fin(self):
        self.etape("bilan")
        bilan = VGroup(
            Text("Ce qu'il faut retenir", font_size=34, color=BAC_INK),
            Text("• Translation de vecteur OA : on ADDITIONNE l'affixe a.",
                 font_size=24, color=BAC_INK_SOFT),
            Text("• Rotation de centre Ω : z' − ω = e^(iθ)(z − ω).",
                 font_size=24, color=BAC_INK_SOFT),
            Text("• Module d'un quotient = quotient des modules ; argument",
                 font_size=24, color=BAC_INK_SOFT),
            Text("  d'un quotient = différence des arguments.",
                 font_size=24, color=BAC_INK_SOFT),
            Text("• Équation d'un cercle de centre ω, rayon r : |z − ω| = r.",
                 font_size=24, color=BAC_INK_SOFT),
            Text("• z + z̄ = 2 × la partie réelle de z.",
                 font_size=24, color=BAC_INK_SOFT),
            Text("3 points — sujet réel, valeurs exactes du scan officiel.",
                 font_size=22, color=BAC_INK_MUTED),
        ).arrange(DOWN, aligned_edge=LEFT, buff=0.32)
        self.play(FadeIn(bilan, shift=0.2 * UP))
        self.pose(5.0)
        self.play(FadeOut(bilan))
        if self._badge_etape is not None:
            self.remove(self._badge_etape)
